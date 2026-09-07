"""services/pdf_word.py 與 services/pdf_compress.py 的驗證與輸出完整性。

需要 tesseract 的 OCR 路徑統一以 needs_tesseract 標記，本機沒有就 skip，
不會假裝通過。
"""

from __future__ import annotations

import io
import zipfile

import pytest
from pypdf import PdfReader

from services.pdf_compress import PRESETS, compress_pdf
from services.pdf_word import _add_editable_text, _line_groups, pdf_to_docx

from conftest import make_pdf, requires_tesseract


# ------------------------------------------------------------------ _line_groups


def w(text: str, x0: float, top: float) -> dict:
    return {"text": text, "x0": x0, "x1": x0 + 30, "top": top, "size": 11}


def test_line_groups_merges_words_within_tolerance_and_sorts_by_x():
    rows = _line_groups([w("b", 200, 100), w("a", 50, 102), w("c", 50, 400)])
    assert [[x["text"] for x in row] for row in rows] == [["a", "b"], ["c"]]


def test_line_groups_splits_rows_beyond_tolerance():
    assert len(_line_groups([w("a", 50, 100), w("b", 50, 105)])) == 2  # 5 > 3.5


def test_line_groups_handles_missing_coordinate_keys():
    """extract_words 偶爾缺欄位；程式碼用 .get(...,0) 兜底，不能炸。"""
    rows = _line_groups([{"text": "a"}, {"text": "b"}])
    assert len(rows) == 1


def test_line_groups_on_empty_input():
    assert _line_groups([]) == []


# -------------------------------------------------------------------- pdf_to_docx


@pytest.mark.parametrize("mode", ["Auto", "on", "", "1", "OFF"])
def test_pdf_to_docx_rejects_ocr_modes_off_the_allowlist(simple_pdf, mode):
    with pytest.raises(ValueError, match="ocr_mode must be auto, force, or off"):
        pdf_to_docx(simple_pdf, "a.pdf", ocr_mode=mode)


def test_pdf_to_docx_rejects_an_unsupported_ocr_language(simple_pdf):
    with pytest.raises(ValueError, match="Unsupported OCR language"):
        pdf_to_docx(simple_pdf, "a.pdf", ocr_mode="off", ocr_lang="deu")


def test_pdf_to_docx_rejects_a_non_pdf(simple_pdf):
    with pytest.raises(ValueError, match="not a readable PDF"):
        pdf_to_docx(b"definitely not a pdf" * 20, "a.pdf", ocr_mode="off")


def test_pdf_to_docx_produces_a_valid_ooxml_package(simple_pdf):
    out, stats = pdf_to_docx(simple_pdf, "a.pdf", ocr_mode="off", include_images=False)
    assert out[:2] == b"PK"
    with zipfile.ZipFile(io.BytesIO(out)) as zf:
        assert zf.testzip() is None
        names = zf.namelist()
        assert "word/document.xml" in names
        assert "[Content_Types].xml" in names
        document = zf.read("word/document.xml").decode("utf-8")
    # _add_editable_text 是「一個字一個 run」，所以 XML 裡不會有連續的 "Hello world"，
    # 每個字都是獨立的 <w:t>。production smoke 也是用 /Widget[\s\S]*A/ 這種寫法。
    assert "<w:t>Hello</w:t>" in document
    assert "<w:t>world,</w:t>" in document
    assert "<w:t>extractable</w:t>" in document
    assert stats == {"pages": 1, "ocr_pages": 0, "text_pages": 1, "images_added": 0}


def test_pdf_to_docx_counts_every_page(simple_pdf):
    pdf = make_pdf(["line one of text on this page"], pages=3)
    _, stats = pdf_to_docx(pdf, "a.pdf", ocr_mode="off", include_images=False)
    assert stats["pages"] == 3
    assert stats["text_pages"] == 3


def test_pdf_to_docx_with_ocr_off_never_shells_out(monkeypatch):
    """ocr_mode=off 時，即使頁面完全空白也不能呼叫 tesseract。"""
    import services.pdf_word as pw

    def explode(*args, **kwargs):  # pragma: no cover
        raise AssertionError("ocr_mode=off 不應該呼叫 OCR")

    monkeypatch.setattr(pw, "run_tesseract_png", explode)
    monkeypatch.setattr(pw, "render_pdf_page_png", explode)

    out, stats = pdf_to_docx(make_pdf(None), "blank.pdf", ocr_mode="off")
    assert stats["ocr_pages"] == 0
    assert out[:2] == b"PK"


def test_pdf_to_docx_escapes_control_characters_into_valid_xml():
    """PDF 文字若含 XML 不合法字元，docx 仍必須是可解析的 OOXML。"""
    out, _ = pdf_to_docx(
        make_pdf(["safe <tag> & \"quoted\" 'text' value"]),
        "a.pdf",
        ocr_mode="off",
        include_images=False,
    )
    import xml.etree.ElementTree as ET

    with zipfile.ZipFile(io.BytesIO(out)) as zf:
        ET.fromstring(zf.read("word/document.xml"))  # 解析失敗會拋例外


@requires_tesseract
def test_pdf_to_docx_force_ocr_end_to_end():
    """只有在系統裝了 tesseract 時才跑；否則整段 OCR 路徑本機無法驗證。"""
    out, stats = pdf_to_docx(make_pdf(None), "blank.pdf", ocr_mode="force", ocr_lang="eng")
    assert stats["ocr_pages"] == 1
    assert out[:2] == b"PK"


@requires_tesseract
def test_pdf_to_docx_enforces_the_ocr_page_cap(monkeypatch):
    from services import pdf_word as pw

    monkeypatch.setattr(pw, "MAX_OCR_PAGES", 1)
    with pytest.raises(ValueError, match="OCR is limited to 1 pages per job"):
        pdf_to_docx(make_pdf(None, pages=3), "blank.pdf", ocr_mode="force")


# ------------------------------------------------------------------- compress_pdf


@pytest.mark.parametrize("preset", ["lossless", "balanced", "strong"])
def test_compress_pdf_accepts_every_documented_preset(simple_pdf, preset):
    out, stats = compress_pdf(simple_pdf, "a.pdf", preset=preset)
    assert out[:5] == b"%PDF-"
    assert stats["preset"] == preset


@pytest.mark.parametrize("preset", ["lossy", "maximum", "LOSSLESS ", "../etc", ""])
def test_compress_pdf_rejects_presets_off_the_allowlist(simple_pdf, preset):
    with pytest.raises(ValueError, match="preset must be lossless, balanced, or strong"):
        compress_pdf(simple_pdf, "a.pdf", preset=preset)


def test_compress_pdf_preset_matching_is_case_insensitive(simple_pdf):
    _, stats = compress_pdf(simple_pdf, "a.pdf", preset="BALANCED")
    assert stats["preset"] == "balanced"


def test_compress_pdf_never_returns_a_larger_file_than_the_input(simple_pdf):
    """壓縮器不得把使用者的檔案變大；變大時要退回原檔。"""
    out, stats = compress_pdf(simple_pdf, "a.pdf", preset="balanced")
    assert len(out) <= len(simple_pdf)
    assert stats["saved_bytes"] >= 0
    if stats["returned_original_because_candidate_was_larger"]:
        assert out == simple_pdf


def test_compress_pdf_preserves_the_page_count_and_extractable_text(simple_pdf):
    out, stats = compress_pdf(simple_pdf, "a.pdf", preset="strong")
    assert stats["pages"] == len(PdfReader(io.BytesIO(simple_pdf)).pages)
    assert stats["text_extractable_before"] is True
    assert stats["text_extractable_after"] is True


def test_compress_pdf_stats_arithmetic_is_self_consistent(simple_pdf):
    _, stats = compress_pdf(simple_pdf, "a.pdf", preset="balanced")
    assert stats["saved_bytes"] == stats["input_bytes"] - stats["output_bytes"]
    assert stats["input_bytes"] == len(simple_pdf)


def test_compress_pdf_rejects_an_unreadable_pdf():
    with pytest.raises(ValueError, match="not a readable PDF"):
        compress_pdf(b"%PDF-1.4 truncated", "a.pdf")


def test_compress_pdf_rejects_an_empty_upload():
    with pytest.raises(ValueError, match="is empty"):
        compress_pdf(b"", "a.pdf")


def test_preset_table_matches_the_documented_allowlist():
    """lossless 沒有影像設定（走純無損），另外兩個才有。"""
    assert set(PRESETS) == {"balanced", "strong"}
    assert PRESETS["strong"]["max_dimension"] < PRESETS["balanced"]["max_dimension"]
    assert PRESETS["strong"]["quality"] < PRESETS["balanced"]["quality"]
