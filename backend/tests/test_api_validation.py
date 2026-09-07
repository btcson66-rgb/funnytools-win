"""FastAPI 層：只驗證錯誤路徑、驗證行為、CORS 與錯誤訊息外洩，不改動 production 行為。

全部透過 TestClient 走 in-process ASGI 呼叫，不會連線到任何線上服務。
"""

from __future__ import annotations

import json

import pytest

import app as app_module

from conftest import make_image, make_pdf

FILE_ENDPOINTS = [
    ("/api/pdf/to-word", "file"),
    ("/api/pdf/table-preview", "file"),
    ("/api/pdf/table-to-excel", "file"),
    ("/api/image/to-dxf", "file"),
    ("/api/pdf/compress", "file"),
]


# ---------------------------------------------------------------------- /health


def test_health_returns_ok_and_version(client):
    r = client.get("/health")
    assert r.status_code == 200
    assert r.json() == {
        "ok": True,
        "version": app_module.VERSION,
        "revision": app_module.REVISION,
    }


def test_health_revision_defaults_to_unknown_when_build_arg_missing(monkeypatch):
    """手動 build 忘記傳 GIT_REVISION 不能讓服務起不來，只會回 unknown。"""
    monkeypatch.delenv("FUNNYTOOLS_REVISION", raising=False)
    assert app_module._read_revision() == "unknown"
    monkeypatch.setenv("FUNNYTOOLS_REVISION", "   ")
    assert app_module._read_revision() == "unknown"


@pytest.mark.parametrize(
    ("raw", "expected"),
    [
        ("edf8bee0d67e178aa626f6143835d00191533687", "edf8bee0d67e178aa626f6143835d00191533687"),
        ("v1.1.0-edf8bee", "v1.1.0-edf8bee"),
        # 誤傳本機路徑／憑證時不得被 /health 原樣回吐
        ("C:\\Users\\owner\\funnytools", "CUsersownerfunnytools"),
        ("token=super secret!!", "tokensupersecret"),
        ("!!!", "unknown"),
        ("a" * 200, "a" * 40),
    ],
)
def test_health_revision_is_sanitized(monkeypatch, raw, expected):
    monkeypatch.setenv("FUNNYTOOLS_REVISION", raw)
    assert app_module._read_revision() == expected


# ------------------------------------------------------------------------ CORS


def test_cors_echoes_only_allowlisted_origins(client):
    r = client.get("/health", headers={"Origin": "https://funnytools.win"})
    assert r.headers["access-control-allow-origin"] == "https://funnytools.win"


@pytest.mark.parametrize(
    "origin",
    [
        "https://evil.example",
        "https://funnytools.win.evil.example",
        "http://funnytools.win",  # 明文 http 不在清單內
        "null",
    ],
)
def test_cors_does_not_echo_untrusted_origins(client, origin):
    r = client.get("/health", headers={"Origin": origin})
    assert r.status_code == 200
    assert "access-control-allow-origin" not in r.headers


def test_cors_preflight_advertises_post_and_the_stats_header(client):
    r = client.options(
        "/api/pdf/table-preview",
        headers={
            "Origin": "https://funnytools.win",
            "Access-Control-Request-Method": "POST",
            "Access-Control-Request-Headers": "content-type",
        },
    )
    assert r.status_code == 200
    assert r.headers["access-control-allow-origin"] == "https://funnytools.win"
    assert "POST" in r.headers.get("access-control-allow-methods", "")


def test_cors_preflight_is_refused_for_an_untrusted_origin(client):
    r = client.options(
        "/api/pdf/table-preview",
        headers={
            "Origin": "https://evil.example",
            "Access-Control-Request-Method": "POST",
        },
    )
    assert "access-control-allow-origin" not in r.headers


def test_default_allowlist_covers_production_and_still_ships_localhost(client):
    """現況記錄：FUNNYTOOLS_ALLOWED_ORIGINS 未設定時，預設值已含 production 網域，
    但同時把兩個 localhost dev 來源帶進 production allowlist。"""
    assert "https://funnytools.win" in app_module.ALLOWED_ORIGINS
    assert "https://www.funnytools.win" in app_module.ALLOWED_ORIGINS
    assert "http://localhost:3000" in app_module.ALLOWED_ORIGINS
    assert "http://localhost:5173" in app_module.ALLOWED_ORIGINS


def test_cors_never_allows_credentials(client):
    """allow_credentials=False：即使 origin 過關也不會帶 cookie/Authorization。"""
    r = client.get("/health", headers={"Origin": "https://funnytools.win"})
    assert "access-control-allow-credentials" not in r.headers


# ------------------------------------------------------- 缺欄位 / 空檔 / 型別


@pytest.mark.parametrize("path,field", FILE_ENDPOINTS)
def test_missing_file_field_returns_422_with_a_location_pointer(client, path, field):
    r = client.post(path, data={})
    assert r.status_code == 422
    detail = r.json()["detail"]
    assert detail[0]["type"] == "missing"
    assert detail[0]["loc"] == ["body", field]


@pytest.mark.parametrize("path,field", FILE_ENDPOINTS)
def test_empty_file_upload_returns_400_naming_the_client_filename(client, path, field):
    r = client.post(path, files={field: ("blank.pdf", b"", "application/pdf")})
    assert r.status_code == 400
    assert r.json()["detail"] == "blank.pdf is empty"


def test_batch_endpoint_rejects_an_empty_file_member(client):
    r = client.post(
        "/api/images/compress-batch",
        files=[("files", ("blank.png", b"", "image/png"))],
    )
    assert r.status_code == 400
    assert "is empty" in r.json()["detail"]


def test_batch_endpoint_rejects_more_than_100_files(client):
    tiny = make_image(width=4, height=4, fmt="PNG")
    files = [("files", (f"{i}.png", tiny, "image/png")) for i in range(101)]
    r = client.post("/api/images/compress-batch", files=files)
    assert r.status_code == 400
    assert r.json()["detail"] == "Maximum 100 images per batch"


def test_non_integer_form_field_returns_422_not_500(client):
    r = client.post(
        "/api/images/compress-batch",
        files=[("files", ("a.png", make_image(fmt="PNG"), "image/png"))],
        data={"quality": "not-a-number"},
    )
    assert r.status_code == 422
    assert r.json()["detail"][0]["type"] == "int_parsing"


# ---------------------------------------------- 內容型別驗證（不是看副檔名）


@pytest.mark.parametrize("path", ["/api/pdf/to-word", "/api/pdf/table-preview", "/api/pdf/compress"])
def test_pdf_endpoints_validate_content_not_the_declared_mime(client, path):
    """副檔名 .pdf、Content-Type application/pdf，內容卻是 PNG → 必須 400。"""
    r = client.post(
        path,
        files={"file": ("real.pdf", make_image(fmt="PNG"), "application/pdf")},
    )
    assert r.status_code == 400
    assert r.json()["detail"] == "The uploaded file is not a readable PDF"


def test_image_endpoints_validate_content_not_the_declared_mime(client):
    r = client.post(
        "/api/images/compress-batch",
        files=[("files", ("real.jpg", make_pdf(["x"]), "image/jpeg"))],
    )
    assert r.status_code == 400
    assert "is not a valid image" in r.json()["detail"]


def test_dxf_endpoint_rejects_a_pdf_disguised_as_png(client):
    r = client.post(
        "/api/image/to-dxf",
        files={"file": ("real.png", make_pdf(["x"]), "image/png")},
    )
    assert r.status_code == 400
    assert "not a valid image" in r.json()["detail"]


# --------------------------------------------------------- 參數 allowlist


@pytest.mark.parametrize("preset", ["lossy", "LOSSLESS ", "../../etc", "'; DROP TABLE--"])
def test_pdf_compress_rejects_presets_off_the_allowlist(client, preset, simple_pdf):
    r = client.post(
        "/api/pdf/compress",
        files={"file": ("a.pdf", simple_pdf, "application/pdf")},
        data={"preset": preset},
    )
    assert r.status_code == 400
    assert r.json()["detail"] == "preset must be lossless, balanced, or strong"


@pytest.mark.parametrize("units", ["km", "'; DROP--", "../mm"])
def test_dxf_rejects_units_off_the_allowlist(client, units, png_bytes):
    r = client.post(
        "/api/image/to-dxf",
        files={"file": ("a.png", png_bytes, "image/png")},
        data={"units": units},
    )
    assert r.status_code == 400
    assert r.json()["detail"] == "units must be unitless, inch, mm, cm, or m"


def test_empty_form_value_silently_falls_back_to_the_declared_default(client, simple_pdf):
    """現況記錄（FastAPI 行為，非本專案的 bug）：Form 欄位送空字串會被當成「沒送」，
    直接套用宣告的預設值，而不是走 allowlist 驗證。

    這裡的預設值（preset=balanced、units=unitless）都是安全值，所以目前無害；
    但代表 allowlist 對「空字串」是繞得過去的，日後若把預設值改成非安全值就會出事。
    """
    r = client.post(
        "/api/pdf/compress",
        files={"file": ("a.pdf", simple_pdf, "application/pdf")},
        data={"preset": ""},
    )
    assert r.status_code == 200
    assert json.loads(r.headers["x-funnytools-stats"])["preset"] == "balanced"


@pytest.mark.parametrize("lang", ["jpn", "eng+jpn", "eng; rm -rf /", "../../etc/passwd"])
def test_ocr_lang_allowlist_is_enforced_before_any_subprocess(client, lang, simple_pdf):
    """OCR 語言會進 tesseract 的 argv，必須在呼叫前就被擋掉。"""
    r = client.post(
        "/api/pdf/to-word",
        files={"file": ("a.pdf", simple_pdf, "application/pdf")},
        data={"ocr_mode": "off", "ocr_lang": lang},
    )
    assert r.status_code == 400
    assert "Unsupported OCR language" in r.json()["detail"]


@pytest.mark.parametrize("mode", ["Auto", "on", "1", "forced"])
def test_ocr_mode_allowlist_is_enforced(client, mode, simple_pdf):
    r = client.post(
        "/api/pdf/to-word",
        files={"file": ("a.pdf", simple_pdf, "application/pdf")},
        data={"ocr_mode": mode},
    )
    assert r.status_code == 400
    assert "ocr_mode must be auto, force, or off" in r.json()["detail"]


@pytest.mark.parametrize("pages", ["1,,3", "abc", "0", "-2"])
def test_invalid_page_selector_returns_400(client, pages, simple_pdf):
    r = client.post(
        "/api/pdf/table-preview",
        files={"file": ("a.pdf", simple_pdf, "application/pdf")},
        data={"pages": pages, "ocr_mode": "off"},
    )
    assert r.status_code == 400


def test_out_of_range_page_returns_400(client, simple_pdf):
    r = client.post(
        "/api/pdf/table-preview",
        files={"file": ("a.pdf", simple_pdf, "application/pdf")},
        data={"pages": "99", "ocr_mode": "off"},
    )
    assert r.status_code == 400
    assert r.json()["detail"] == "Requested page 99 does not exist"


@pytest.mark.parametrize(
    "field,value",
    [("epsilon_ratio", "-0.1"), ("epsilon_ratio", "0.5"), ("min_area", "-1")],
)
def test_dxf_numeric_bounds_are_enforced(client, png_bytes, field, value):
    r = client.post(
        "/api/image/to-dxf",
        files={"file": ("a.png", png_bytes, "image/png")},
        data={field: value},
    )
    assert r.status_code == 400


def test_dxf_rejects_non_positive_scale(client, png_bytes):
    r = client.post(
        "/api/image/to-dxf",
        files={"file": ("a.png", png_bytes, "image/png")},
        data={"units_per_pixel": "0"},
    )
    assert r.status_code == 400
    assert "units_per_pixel must be positive" in r.json()["detail"]


def test_dxf_requires_both_calibration_distances_together(client, png_bytes):
    r = client.post(
        "/api/image/to-dxf",
        files={"file": ("a.png", png_bytes, "image/png")},
        data={"calibration_pixel_distance": "10"},
    )
    assert r.status_code == 400
    assert "Both calibration distances are required" in r.json()["detail"]


# ------------------------------------------------------ /api/pdf/export-tables


def test_export_tables_rejects_a_non_list_tables_field(client):
    r = client.post("/api/pdf/export-tables", json={"tables": "nope"})
    assert r.status_code == 400
    assert r.json()["detail"] == "tables must be a list"


def test_export_tables_caps_the_table_count(client):
    payload = {"tables": [{"page": 1, "table": 1, "rows": [["a"]]}] * 101}
    r = client.post("/api/pdf/export-tables", json=payload)
    assert r.status_code == 400
    assert r.json()["detail"] == "Maximum 100 edited tables per export"


def test_export_tables_rejects_a_non_list_row(client):
    r = client.post(
        "/api/pdf/export-tables",
        json={"tables": [{"page": 1, "table": 1, "rows": ["a"]}]},
    )
    assert r.status_code == 400
    assert r.json()["detail"] == "Each table row must be a list"


def test_export_tables_maps_a_non_dict_entry_to_500_known_gap(client):
    """已知缺口：使用者送 ["x"] 是輸入錯誤（應 400），但 AttributeError
    落到 generic handler 變成 500。500 會被 smoke 的 isRetryableStatus 當成
    暫時性錯誤重試，也會污染錯誤率指標。"""
    r = client.post("/api/pdf/export-tables", json={"tables": ["not-a-dict"]})
    assert r.status_code == 500
    assert r.json()["detail"] == "Conversion failed"


def test_export_tables_with_no_tables_key_returns_a_placeholder_workbook(client):
    """現況記錄：完全空的 body 會回 200 + 一份 "No tables" 活頁簿，而不是 400。"""
    r = client.post("/api/pdf/export-tables", json={})
    assert r.status_code == 200
    assert r.content[:2] == b"PK"


# --------------------------------------------------- 例外訊息不得洩漏內部資訊


SERVER_PATH_MARKERS = [
    "/home/", "/app/", "/usr/", "/tmp/", "Traceback", "File \"", "site-packages",
    "services/", "backend/", "app.py", ".venv",
]


def _assert_no_internal_leak(payload: str):
    for marker in SERVER_PATH_MARKERS:
        assert marker not in payload, f"回應洩漏內部資訊：{marker}"


@pytest.mark.parametrize(
    "path,files,data",
    [
        ("/api/pdf/compress", {"file": ("a.pdf", b"garbage" * 50, "application/pdf")}, {}),
        ("/api/pdf/to-word", {"file": ("a.pdf", b"garbage" * 50, "application/pdf")}, {}),
        ("/api/pdf/table-preview", {"file": ("a.pdf", b"garbage" * 50, "application/pdf")}, {}),
        ("/api/pdf/table-to-excel", {"file": ("a.pdf", b"garbage" * 50, "application/pdf")}, {}),
        ("/api/image/to-dxf", {"file": ("a.png", b"garbage" * 50, "image/png")}, {}),
    ],
)
def test_error_responses_never_leak_paths_or_stack_traces(client, path, files, data):
    r = client.post(path, files=files, data=data)
    assert r.status_code == 400
    _assert_no_internal_leak(r.text)


def test_internal_failures_are_masked_as_a_generic_message(client):
    """RuntimeError（例如缺 tesseract、驗證失敗）一律回 500 + 固定字串。"""
    r = client.post("/api/pdf/export-tables", json={"tables": ["not-a-dict"]})
    assert r.json()["detail"] == "Conversion failed"
    _assert_no_internal_leak(r.text)


def test_unhandled_paths_return_404_without_a_stack_trace(client):
    r = client.get("/../../etc/passwd")
    assert r.status_code in (404, 400)
    _assert_no_internal_leak(r.text)


# --------------------------------------------------------- 文件端點暴露面


def test_swagger_ui_is_disabled_by_default(client):
    assert client.get("/docs").status_code == 404
    assert client.get("/redoc").status_code == 404


def test_openapi_schema_is_still_public_even_with_docs_disabled_known_gap(client):
    """已知缺口（資訊揭露，低風險）：FUNNYTOOLS_ENABLE_DOCS=0 只關掉 /docs，
    /openapi.json 仍然公開，完整參數與型別照樣可被列舉。"""
    r = client.get("/openapi.json")
    assert r.status_code == 200
    schema = r.json()
    assert "/api/pdf/compress" in schema["paths"]
    assert "/api/image/to-dxf" in schema["paths"]


# ------------------------------------------------------------ 成功路徑的形狀


def test_stats_header_is_compact_ascii_json(client, simple_pdf):
    r = client.post(
        "/api/pdf/compress",
        files={"file": ("a.pdf", simple_pdf, "application/pdf")},
        data={"preset": "lossless"},
    )
    assert r.status_code == 200
    stats = json.loads(r.headers["x-funnytools-stats"])
    assert stats["input_bytes"] - stats["output_bytes"] == stats["saved_bytes"]
    assert r.headers["x-funnytools-stats"].isascii()
    assert r.content[:5] == b"%PDF-"


def test_content_disposition_filename_is_a_fixed_server_side_constant(client, simple_pdf):
    """輸出檔名不使用使用者檔名，因此不存在 header injection 面。"""
    r = client.post(
        "/api/pdf/compress",
        files={"file": ("a\r\nX-Injected: 1.pdf", simple_pdf, "application/pdf")},
        data={"preset": "lossless"},
    )
    assert r.status_code == 200
    assert r.headers["content-disposition"] == 'attachment; filename="compressed.pdf"'
    assert "x-injected" not in {k.lower() for k in r.headers}
