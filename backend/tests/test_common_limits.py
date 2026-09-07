"""services/common.py 的純邏輯邊界測試。"""

from __future__ import annotations

import pytest

from services import common
from services.common import (
    MAX_BATCH_TOTAL_MB,
    MAX_IMAGE_PIXELS,
    MAX_PDF_PAGES,
    MAX_SINGLE_UPLOAD_MB,
    ensure_batch_under_limit,
    ensure_image_dimensions,
    ensure_under_limit,
    open_pdf_reader,
    validate_ocr_lang,
)

from conftest import make_pdf

MB = 1024 * 1024


# ---------------------------------------------------------------- ensure_under_limit


def test_ensure_under_limit_accepts_exactly_the_limit():
    """邊界值：剛好等於上限必須通過（程式碼用的是 > 而非 >=）。"""
    ensure_under_limit(b"x" * (2 * MB), "a.bin", max_mb=2)


def test_ensure_under_limit_rejects_one_byte_over():
    with pytest.raises(ValueError, match="exceeds the 2 MB upload limit"):
        ensure_under_limit(b"x" * (2 * MB + 1), "a.bin", max_mb=2)


def test_ensure_under_limit_rejects_empty_before_size_check():
    with pytest.raises(ValueError, match="is empty"):
        ensure_under_limit(b"", "a.bin")


def test_ensure_under_limit_missing_filename_falls_back_to_generic_word():
    with pytest.raises(ValueError, match="^file is empty$"):
        ensure_under_limit(b"", "")


def test_ensure_under_limit_error_message_only_echoes_the_client_filename():
    """例外訊息不得含有伺服器路徑；只會回傳使用者自己送來的檔名。"""
    with pytest.raises(ValueError) as excinfo:
        ensure_under_limit(b"x" * (MB + 1), "report.pdf", max_mb=1)
    message = str(excinfo.value)
    assert "report.pdf" in message
    assert "/" not in message and "\\" not in message


def test_default_single_limit_matches_documented_80mb():
    assert MAX_SINGLE_UPLOAD_MB == 80
    assert MAX_BATCH_TOTAL_MB == 120


# ---------------------------------------------------------- ensure_batch_under_limit


def test_ensure_batch_under_limit_accepts_empty_iterable():
    """現況記錄：空批次在此函式不會被擋，擋批次為空是 app 層 _read_batch_limited 的責任。"""
    ensure_batch_under_limit([])


def test_ensure_batch_under_limit_rejects_a_single_oversized_member():
    items = [("ok.png", b"x" * 10), ("huge.png", b"x" * ((MAX_SINGLE_UPLOAD_MB + 1) * MB))]
    with pytest.raises(ValueError, match="huge.png exceeds"):
        ensure_batch_under_limit(items)


def test_ensure_batch_under_limit_rejects_total_over_batch_cap():
    chunk = b"x" * (MAX_SINGLE_UPLOAD_MB * MB)
    count = MAX_BATCH_TOTAL_MB // MAX_SINGLE_UPLOAD_MB + 2
    items = [(f"f{i}.png", chunk) for i in range(count)]
    with pytest.raises(ValueError, match="Batch exceeds"):
        ensure_batch_under_limit(items)


def test_ensure_batch_under_limit_rejects_empty_member():
    with pytest.raises(ValueError, match="blank.png is empty"):
        ensure_batch_under_limit([("ok.png", b"x"), ("blank.png", b"")])


# ------------------------------------------------------------ ensure_image_dimensions


@pytest.mark.parametrize("width,height", [(0, 10), (10, 0), (0, 0), (-1, 10), (10, -5)])
def test_ensure_image_dimensions_rejects_non_positive(width, height):
    with pytest.raises(ValueError, match="invalid dimensions"):
        ensure_image_dimensions(width, height)


def test_ensure_image_dimensions_accepts_exactly_the_pixel_cap():
    ensure_image_dimensions(MAX_IMAGE_PIXELS, 1)


def test_ensure_image_dimensions_rejects_one_pixel_over_the_cap():
    with pytest.raises(ValueError, match="pixel safety limit"):
        ensure_image_dimensions(MAX_IMAGE_PIXELS + 1, 1)


def test_ensure_image_dimensions_catches_pixel_bomb_geometry():
    """小檔案宣告 50000x50000 的 pixel bomb 必須在解碼前就被擋下。"""
    with pytest.raises(ValueError, match="pixel safety limit"):
        ensure_image_dimensions(50_000, 50_000)


# --------------------------------------------------------------- validate_ocr_lang


@pytest.mark.parametrize("lang", ["eng", "chi_tra", "eng+chi_tra", "chi_tra+eng"])
def test_validate_ocr_lang_accepts_allowlist(lang):
    assert validate_ocr_lang(lang) == lang


@pytest.mark.parametrize(
    "lang",
    [
        "jpn",
        "eng+jpn",
        "",  # 空字串會被代換成 eng，見下一個測試
        "eng;rm -rf /",
        "../../etc/passwd",
        "eng -c tessedit_char_whitelist=x",
        "ENG",
        " eng ",
    ],
)
def test_validate_ocr_lang_rejects_everything_off_the_allowlist(lang):
    """OCR 語言直接進 subprocess 的 argv，allowlist 是唯一防線。"""
    if lang == "":
        assert validate_ocr_lang(lang) == "eng"
        return
    if lang == " eng ":
        assert validate_ocr_lang(lang) == "eng"  # strip() 後仍在 allowlist
        return
    with pytest.raises(ValueError, match="Unsupported OCR language"):
        validate_ocr_lang(lang)


def test_validate_ocr_lang_treats_none_as_eng():
    assert validate_ocr_lang(None) == "eng"


# ---------------------------------------------------------------- open_pdf_reader


def test_open_pdf_reader_accepts_a_synthetic_pdf(simple_pdf):
    reader = open_pdf_reader(simple_pdf, "doc.pdf")
    assert len(reader.pages) == 1


def test_open_pdf_reader_rejects_non_pdf_bytes():
    with pytest.raises(ValueError, match="not a readable PDF"):
        open_pdf_reader(b"this is definitely not a pdf" * 10, "doc.pdf")


def test_open_pdf_reader_rejects_empty_upload():
    with pytest.raises(ValueError, match="is empty"):
        open_pdf_reader(b"", "doc.pdf")


def test_open_pdf_reader_rejects_page_count_over_the_cap(monkeypatch):
    """不實際造 201 頁（太慢）；改為壓低上限來驗證比較邏輯本身。"""
    monkeypatch.setattr(common, "MAX_PDF_PAGES", 2)
    pdf = make_pdf(["page"], pages=3)
    with pytest.raises(ValueError, match="page safety limit"):
        open_pdf_reader(pdf, "doc.pdf")


def test_open_pdf_reader_accepts_exactly_the_page_cap(monkeypatch):
    monkeypatch.setattr(common, "MAX_PDF_PAGES", 3)
    reader = open_pdf_reader(make_pdf(["page"], pages=3), "doc.pdf")
    assert len(reader.pages) == 3


def test_default_pdf_page_cap_is_200():
    assert MAX_PDF_PAGES == 200
