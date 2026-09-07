"""資源耗盡與逾時邊界。

這些測試把稽核報告裡的 P0/P1 發現「釘」成可執行的證據：
每一項都是本機實測，不對線上服務做任何壓力測試。
"""

from __future__ import annotations

import inspect
import io
import subprocess
import time

import pytest

import app as app_module
from app import _http_error, _read_upload_limited
from services import common, pdf_render

from conftest import make_pdf

MB = 1024 * 1024


def _code_only(module) -> str:
    """回傳模組原始碼中「去掉整行註解」的版本。

    多個測試要斷言「某段程式碼出現在另一段之前」，若不濾掉註解，說明文字裡提到的
    函式名稱會讓 index() 指到錯誤的位置。
    """
    lines = [
        line for line in inspect.getsource(module).splitlines()
        if not line.lstrip().startswith("#")
    ]
    return "\n".join(lines)


class FakeUpload:
    """最小的 UploadFile 替身，只需要 filename 與 async read(size)。"""

    def __init__(self, data: bytes, filename: str = "a.bin"):
        self._buf = io.BytesIO(data)
        self.filename = filename

    async def read(self, size: int = -1) -> bytes:
        return self._buf.read(size)


# --------------------------------------------- _read_upload_limited（串流上限）


def run_async(coro):
    import asyncio

    return asyncio.run(coro)


def test_read_upload_limited_accepts_exactly_the_limit():
    data = b"x" * (2 * MB)
    assert run_async(_read_upload_limited(FakeUpload(data), max_mb=2)) == data


def test_read_upload_limited_rejects_one_byte_over_the_limit():
    with pytest.raises(ValueError, match="exceeds the 2 MB upload limit"):
        run_async(_read_upload_limited(FakeUpload(b"x" * (2 * MB + 1)), max_mb=2))


def test_read_upload_limited_rejects_an_empty_stream():
    with pytest.raises(ValueError, match="is empty"):
        run_async(_read_upload_limited(FakeUpload(b"")))


def test_read_upload_limited_buffers_the_whole_file_in_memory_known_gap():
    """現況記錄：檢查是「邊讀邊累加」，但通過檢查後整份檔案都留在 RSS。

    單檔上限 80MB、批次 120MB，worker=2 → 光是原始 bytes 最壞情境就 240MB，
    還沒算解碼後的點陣圖。這是設計上的記憶體上限，寫下來讓容量規劃有依據。
    """
    src = inspect.getsource(_read_upload_limited)
    assert 'chunks.append(chunk)' in src
    assert 'b"".join(chunks)' in src
    assert common.MAX_SINGLE_UPLOAD_MB == 80
    assert common.MAX_BATCH_TOTAL_MB == 120


# ------------------------------------- 上傳上限的執行時機（先落地，後檢查）


def test_upload_limit_is_enforced_only_after_the_body_is_fully_received_known_gap(client):
    """P1：app.py 的大小上限發生在 handler 內，starlette 早就把整個 body 收完了。

    starlette 的 max_part_size(1MB) 只管「非檔案」欄位；檔案 part 走
    SpooledTemporaryFile(max_size=1MB)，超過 1MB 就寫進磁碟，且沒有任何上限。
    下面用一個遠大於 1MB 的檔案 part 證明它確實被完整收下並交給 handler
    （回 400「不是可讀的 PDF」＝ handler 真的拿到了這 3MB）。
    """
    junk = b"X" * (3 * MB)
    r = client.post(
        "/api/pdf/compress",
        files={"file": ("big.pdf", junk, "application/pdf")},
        data={"preset": "balanced"},
    )
    assert r.status_code == 400
    assert r.json()["detail"] == "The uploaded file is not a readable PDF"


def test_non_file_form_fields_are_capped_at_1mb_by_starlette(client, simple_pdf):
    """對照組：非檔案欄位有 1MB 上限，所以 pages 這種欄位不會無限膨脹。"""
    r = client.post(
        "/api/pdf/table-preview",
        files={"file": ("a.pdf", simple_pdf, "application/pdf")},
        data={"pages": "1," * 700_000},
    )
    assert r.status_code == 400
    assert "Part exceeded maximum size" in r.json()["detail"]


def test_file_part_count_ceiling_belongs_to_starlette_not_the_app_known_gap():
    """現況記錄：app 的「最多 100 張」是在 starlette 收完之後才檢查；
    starlette 自己的上限是 max_files=1000（FastAPI 用預設值呼叫 request.form()）。
    也就是說第 101~1000 個檔案仍會先被完整寫入磁碟，才收到 400。"""
    from starlette.requests import Request

    sig = inspect.signature(Request.form)
    assert sig.parameters["max_files"].default == 1000
    fastapi_src = inspect.getsource(__import__("fastapi.routing", fromlist=["x"]))
    assert "await request.form()" in fastapi_src  # 沒有傳任何自訂上限


# ------------------------------------------- PDF 渲染的像素上限（P0-2 修正後）
#
# 這一組原本是「斷言缺口現況」的測試（`_known_gap`）。P0-2 修好之後，它們已改成
# 斷言「修好後的正確行為」，從缺口記錄轉為回歸保護：任何人把 pdf_render.py 的
# 尺寸守門拿掉或搬到 render() 之後，這裡就會紅。


def test_pdf_render_path_now_guards_dimensions_before_rendering():
    """回歸保護（原 test_pdf_render_path_has_no_dimension_guard_known_gap）。

    守門必須沿用 services.common.ensure_image_dimensions（不另立上限），
    而且必須出現在 page.render() 之前——擋在渲染之後就沒有意義。
    """
    src = inspect.getsource(pdf_render)
    assert "ensure_image_dimensions" in src

    # 只看真正的程式碼，把註解與 docstring 濾掉——否則會被說明文字誤導。
    code = _code_only(pdf_render)
    guard_at = code.index("ensure_image_dimensions(width_px, height_px)")
    render_at = code.index("bitmap = page.render(")
    assert guard_at < render_at, "尺寸守門必須在 page.render() 配置 bitmap 之前"

    # 圖片路徑本來就有守門，維持不變
    assert "ensure_image_dimensions" in inspect.getsource(
        __import__("services.images", fromlist=["x"])
    )
    assert "ensure_image_dimensions" in inspect.getsource(
        __import__("services.image_dxf", fromlist=["x"])
    )


def test_render_guard_uses_the_shared_pixel_limit_and_does_not_redefine_it():
    """守門用的是既有的 MAX_IMAGE_PIXELS，數值未被更動，也沒有另立第二套上限。"""
    code = _code_only(pdf_render)
    assert "MAX_IMAGE_PIXELS =" not in code, "不得在 pdf_render.py 內自訂上限常數"
    assert "25000000" not in code and "25_000_000" not in code, "不得寫死自己的門檻"
    assert "from .common import ensure_image_dimensions" in code

    # 既有上限的數值一個都不能被動到
    assert common.MAX_IMAGE_PIXELS == 25_000_000
    assert common.MAX_SINGLE_UPLOAD_MB == 80
    assert common.MAX_BATCH_TOTAL_MB == 120
    assert common.MAX_PDF_PAGES == 200
    assert common.MAX_OCR_PAGES == 30


def test_target_bitmap_size_matches_what_pdfium_actually_allocates():
    """守門的估算必須和 pdfium 真正配置的尺寸一致，否則守門會失準。"""
    import pypdfium2 as pdfium

    for page_pt in (200, 800, 2000):
        tiny = make_pdf(None, page_size=(page_pt, page_pt))
        predicted = pdf_render.target_bitmap_size(page_pt, page_pt, 220)

        doc = pdfium.PdfDocument(tiny)
        try:
            bitmap = doc[0].render(scale=220 / 72.0, rotation=0)
            actual = (bitmap.width, bitmap.height)
        finally:
            doc.close()

        assert predicted == actual, f"{page_pt}pt: 估算 {predicted} vs 實際 {actual}"


def test_a_tiny_pdf_declaring_a_huge_page_is_rejected_before_any_allocation():
    """P0-2 的核心案例：1.3KB 的 PDF 宣告 14400x14400pt（會是 ~7.7GB 的 bitmap）。

    修正前這會一路衝進 page.render()；現在必須在配置任何 bitmap 之前就丟 ValueError。
    這個測試現在可以安全地跑完整條路徑，正是因為守門有效——修正前它會打死容器。
    """
    tiny = make_pdf(["x"], page_size=(14400, 14400))
    assert len(tiny) < 4096, "來源檔案確實很小"

    width_px, height_px = pdf_render.target_bitmap_size(14400, 14400, 220)
    assert width_px * height_px > 1_900_000_000
    assert width_px * height_px > common.MAX_IMAGE_PIXELS * 75

    started = time.time()
    with pytest.raises(ValueError) as excinfo:
        pdf_render.render_pdf_page_png(tiny, 0, dpi=220)
    elapsed = time.time() - started

    assert elapsed < 1.0, f"必須是即刻拒絕，不是先算再拒絕（實測 {elapsed:.3f}s）"
    message = str(excinfo.value)
    assert "PDF page 1" in message
    assert "too large" in message
    assert "220 DPI" in message
    assert "44000" in message  # 讓使用者看得到究竟多大


def test_render_rejection_message_leaks_no_internal_detail():
    tiny = make_pdf(["x"], page_size=(14400, 14400))
    with pytest.raises(ValueError) as excinfo:
        pdf_render.render_pdf_page_png(tiny, 0, dpi=220)
    message = str(excinfo.value)
    for marker in ("/home/", "/app/", "/usr/", "/tmp/", "site-packages",
                   "Traceback", 'File "', "backend", "pdf_render"):
        assert marker not in message


def test_a_page_just_over_the_cap_is_rejected_and_just_under_still_renders():
    """邊界：守門必須剛好落在 MAX_IMAGE_PIXELS，不能把正常頁面誤殺。

    2000x2000pt = 3735 萬像素（> 2500 萬上限）→ 必須拒絕。
    A4（595x842pt）= 468 萬像素 → 必須照常渲染。
    """
    from PIL import Image

    over = make_pdf(None, page_size=(2000, 2000))
    w, h = pdf_render.target_bitmap_size(2000, 2000, 220)
    assert w * h > common.MAX_IMAGE_PIXELS
    with pytest.raises(ValueError, match="too large to convert"):
        pdf_render.render_pdf_page_png(over, 0, dpi=220)

    a4 = make_pdf(["hello"], page_size=(595, 842))
    w, h = pdf_render.target_bitmap_size(595, 842, 220)
    assert w * h < common.MAX_IMAGE_PIXELS
    png = pdf_render.render_pdf_page_png(a4, 0, dpi=220)
    with Image.open(io.BytesIO(png)) as im:
        assert im.width * im.height == w * h


def test_degenerate_zero_size_page_is_rejected_with_its_own_message():
    """0 尺寸頁面不該講「太大」，要有自己的訊息。"""
    import pypdfium2 as pdfium

    src = inspect.getsource(pdf_render)
    assert "unusable page size" in src
    assert "width_px <= 0 or height_px <= 0" in src
    assert pdf_render.target_bitmap_size(0, 0, 220) == (0, 0)
    assert isinstance(pdfium.PdfDocument, type)  # 確認 import 可用，不實際造畸形 PDF


def test_ocr_auto_mode_now_returns_400_fast_instead_of_rendering(client):
    """回歸保護（原 test_ocr_auto_mode_reaches_the_render_before_checking_for_tesseract）。

    預設 ocr_mode=auto + 空白大頁面，修正前會先做完昂貴渲染才失敗（實測 7.53s，
    大頁 vs 小頁差 47 倍）。修正後必須立刻回 4xx，而且大頁與小頁的耗時不再有量級差。
    """
    small = make_pdf(None, page_size=(200, 200))
    large = make_pdf(None, page_size=(2000, 2000))

    def timed(pdf_bytes):
        t0 = time.time()
        r = client.post(
            "/api/pdf/to-word",
            files={"file": ("blank.pdf", pdf_bytes, "application/pdf")},
            data={"ocr_mode": "auto", "ocr_lang": "eng", "include_images": "false"},
        )
        return r, time.time() - t0

    r_small, t_small = timed(small)
    r_large, t_large = timed(large)

    # 大頁面現在是使用者輸入錯誤（4xx），不是伺服器錯誤（5xx）
    assert r_large.status_code == 400, r_large.text[:300]
    assert "too large to convert" in r_large.json()["detail"]
    assert t_large < 1.0, f"必須即刻拒絕，實測 {t_large:.2f}s"

    # 小頁面在本機仍會 500（沒有 tesseract），這是環境限制不是回歸
    assert r_small.status_code in (200, 500)


def test_pdfium_access_is_serialised_because_pdfium_is_not_thread_safe():
    """把工作移進 threadpool 之後新增的必要防護。

    pypdfium2 的套件說明明載 "PDFium is inherently not thread-safe"，套件內部也
    沒有任何鎖（全套件搜不到 threading）。因此 render 路徑必須自己序列化。
    """
    src = inspect.getsource(pdf_render)
    assert "threading.Lock()" in src
    assert "with _PDFIUM_LOCK:" in src
    # 全後端只有這一個檔案用 pdfium，鎖住這裡就夠了
    for module_name in ("services.images", "services.image_dxf", "services.pdf_compress",
                        "services.pdf_word", "services.pdf_table"):
        assert "pdfium" not in inspect.getsource(__import__(module_name, fromlist=["x"]))


# ------------------------------------------------------------ 逾時處理


def test_only_the_ocr_subprocess_has_a_timeout():
    """現況記錄：整條鏈上唯一的逾時是 tesseract 的 timeout=90。"""
    src = inspect.getsource(common.run_tesseract_png)
    assert "timeout=90" in src
    # 渲染、pdfplumber、pypdf、Pillow、opencv 都沒有任何逾時
    assert "timeout" not in inspect.getsource(pdf_render)


def test_subprocess_timeout_is_reported_as_500_not_408_known_gap():
    """P2：_http_error 有 408 分支，但 tesseract 逾時丟的是
    subprocess.TimeoutExpired，它不是 TimeoutError 的子類別，所以永遠走不到 408。

    影響：真正的逾時會被記成 500，而 smoke 的 isRetryableStatus 會把 5xx
    當成暫時性錯誤重試，逾時與真故障在監控上混在一起。
    """
    assert not issubclass(subprocess.TimeoutExpired, TimeoutError)

    timeout_exc = subprocess.TimeoutExpired(cmd=["tesseract"], timeout=90)
    assert _http_error(timeout_exc).status_code == 500
    assert _http_error(timeout_exc).detail == "Conversion failed"

    # 408 分支本身是好的，只是沒有人會丟這種例外
    assert _http_error(TimeoutError()).status_code == 408


def test_worst_case_ocr_wall_clock_has_no_overall_request_cap():
    """P1：單一請求最壞情況 = MAX_OCR_PAGES x tesseract timeout，沒有總量上限。"""
    per_page_timeout = 90
    assert common.MAX_OCR_PAGES == 30
    worst_case_seconds = common.MAX_OCR_PAGES * per_page_timeout
    assert worst_case_seconds == 2700  # 45 分鐘，且不含渲染時間


# --------------------------------------------- 事件迴圈阻塞（並發能力上限）


ALL_JOB_HANDLERS = (
    "api_compress_batch",
    "api_pdf_to_word",
    "api_table_preview",
    "api_table_to_excel",
    "api_export_tables",
    "api_image_to_dxf",
    "api_pdf_compress",
)


def test_every_heavy_handler_offloads_its_sync_work_to_the_threadpool():
    """回歸保護（原 test_all_heavy_handlers_are_async_def_calling_blocking_code_known_gap）。

    修正前：7 個 handler 都是 async def 卻直接呼叫同步 CPU-bound 函式，
    轉檔期間整個 worker 的事件迴圈被卡住（實測 /health 從 1ms 變 3583ms）。
    修正後：每個同步轉檔呼叫都必須經過 run_in_threadpool。
    """
    code = _code_only(app_module)
    assert "from starlette.concurrency import run_in_threadpool" in code

    for service_call in (
        "compress_batch",
        "pdf_to_docx",
        "extract_tables",
        "pdf_tables_to_xlsx",
        "tables_to_xlsx",
        "image_to_dxf",
        "compress_pdf",
    ):
        assert f"run_in_threadpool(\n                {service_call}," in code \
            or f"run_in_threadpool({service_call}," in code, \
            f"{service_call} 沒有被移出事件迴圈"


def test_every_heavy_handler_is_behind_the_concurrency_gate():
    code = _code_only(app_module)
    for handler in ALL_JOB_HANDLERS:
        body_start = code.index(f"async def {handler}(")
        body = code[body_start:body_start + 1200]
        assert "with _job_slot():" in body, f"{handler} 沒有進併發閘"


def test_health_is_never_gated_and_stays_synchronous_and_trivial():
    """/health 必須在滿載時仍可回應：不進閘、不做任何 I/O、不碰 threadpool。"""
    code = _code_only(app_module)
    health_at = code.index("def health():")
    body = code[health_at:code.index("@app.post", health_at)]
    assert "_job_slot" not in body
    assert "run_in_threadpool" not in body
    assert "await" not in body
    assert 'return {"ok": True, "version": VERSION}' in body


def test_gate_is_entered_outside_the_try_so_503_is_not_masked_as_500():
    """關鍵細節：_job_slot() 丟的是 HTTPException，而 HTTPException 也是 Exception。

    若 `with _job_slot():` 被放進 handler 的 try 內，`except Exception` 會把它交給
    _http_error()，503 就會變成 500「Conversion failed」。順序必須是 with 在外、try 在內。
    """
    code = _code_only(app_module)
    for handler in ALL_JOB_HANDLERS:
        body_start = code.index(f"async def {handler}(")
        body = code[body_start:body_start + 1200]
        gate_at = body.index("with _job_slot():")
        try_at = body.index("try:")
        assert gate_at < try_at, f"{handler}: _job_slot() 必須在 try 之外"


def test_gate_default_is_conservative_and_env_configurable():
    assert app_module.MAX_CONCURRENT_JOBS == 2, "預設每 worker 2 個（Dockerfile 2 workers → 全機 4）"
    code = _code_only(app_module)
    assert 'os.environ.get("FUNNYTOOLS_MAX_CONCURRENT_JOBS", "2")' in code
    assert "max(1, int(" in code, "設成 0 或負數不得讓服務完全無法運作"


def test_gate_returns_503_with_retry_after_and_releases_the_slot(client, monkeypatch):
    """閘滿時必須是 503 + Retry-After（不是 500，也不是排隊等到逾時），
    而且請求結束後名額要還回去。"""
    monkeypatch.setattr(app_module, "MAX_CONCURRENT_JOBS", 1)

    # 佔滿唯一的名額，模擬「另一個轉檔正在進行中」
    with app_module._job_slot():
        r = client.post("/api/pdf/export-tables", json={"tables": []})
        assert r.status_code == 503
        assert r.headers["retry-after"] == "5"
        assert r.json()["detail"] == "The conversion service is busy. Please retry in a few seconds."
        # 500 會被 smoke 當成暫時故障重試並污染錯誤率，503 才是正確語意
        assert r.json()["detail"] != "Conversion failed"

        # /health 在閘滿時仍然必須可用
        assert client.get("/health").status_code == 200

    # 離開 with 之後名額歸還，同一個請求現在應該成功
    assert client.post("/api/pdf/export-tables", json={"tables": []}).status_code == 200


def test_gate_slot_is_released_even_when_the_conversion_fails(client, monkeypatch):
    """失敗路徑也必須把名額還回去，否則幾次 400 就會把服務鎖死。"""
    monkeypatch.setattr(app_module, "MAX_CONCURRENT_JOBS", 1)

    for _ in range(5):
        r = client.post(
            "/api/pdf/compress",
            files={"file": ("a.pdf", b"not a pdf at all", "application/pdf")},
        )
        assert r.status_code == 400, "應該是輸入錯誤，不是被閘擋住"

    assert app_module._active_jobs == 0, f"名額洩漏：仍有 {app_module._active_jobs} 個未歸還"


def test_gate_counter_returns_to_zero_after_a_successful_conversion(client, simple_pdf):
    r = client.post(
        "/api/pdf/compress",
        files={"file": ("a.pdf", simple_pdf, "application/pdf")},
        data={"preset": "lossless"},
    )
    assert r.status_code == 200
    assert app_module._active_jobs == 0


def test_export_tables_row_count_is_unbounded_known_gap(client):
    """P1（**仍未修**，本次只修兩個 P0）：/api/pdf/export-tables 只限制
    「最多 100 個表格」，每個表格的列數／欄數完全沒有上限，整包 JSON 先進記憶體。

    P0-1 修正後這段工作已移出事件迴圈（不再阻塞 /health），也受併發閘限制，
    但「單一請求可以無上限地吃 CPU 與記憶體」這件事本身沒有改變。
    """
    rows = [[f"r{i}", "b", "c"] for i in range(20_000)]
    payload = {"tables": [{"page": 1, "table": 1, "rows": rows}]}

    started = time.time()
    r = client.post("/api/pdf/export-tables", json=payload)
    elapsed = time.time() - started

    assert r.status_code == 200, "兩萬列完全不會被擋"
    assert len(r.content) > 100_000
    assert elapsed > 0.2, f"單一請求耗時 {elapsed:.2f}s，成本隨列數線性成長且無守門"


def test_export_tables_has_no_request_body_size_limit_known_gap():
    """現況記錄：JSON body 走 Body(...)，app 端沒有任何 Content-Length 檢查。"""
    src = inspect.getsource(app_module)
    assert "content-length" not in src.lower()
    assert "Content-Length" not in src
    # 只有這兩個數量級的守門
    assert "Maximum 100 edited tables per export" in src
    assert "Maximum 100 images per batch" in src


# ------------------------------------------------------------ 暫存檔清理


def test_ocr_tempdir_is_created_inside_a_context_manager():
    """暫存目錄用 with tempdir(...)，例外路徑（含 timeout）也會被清掉。"""
    src = inspect.getsource(common.run_tesseract_png)
    assert "with tempdir(" in src


def test_tempdir_helper_returns_a_self_cleaning_directory():
    import os

    with common.tempdir("funnytools-test-") as d:
        path = d
        assert os.path.isdir(path)
        with open(os.path.join(path, "x.txt"), "w") as fh:
            fh.write("x")
    assert not os.path.exists(path), "離開 with 之後暫存目錄必須消失"


def test_no_other_service_writes_to_disk():
    """除了 OCR 的暫存 PNG，其他服務全部在記憶體處理，沒有需要清理的落地檔。"""
    for module_name in (
        "services.images",
        "services.image_dxf",
        "services.pdf_compress",
        "services.pdf_word",
        "services.pdf_table",
        "services.pdf_render",
    ):
        src = inspect.getsource(__import__(module_name, fromlist=["x"]))
        assert "tempfile" not in src
        assert "open(" not in src.replace("Image.open(", "").replace(
            "pdfplumber.open(", ""
        ).replace("io.open(", "")
