"""共用 fixture。

所有素材一律用 reportlab / PIL 合成，不引入任何外部檔案，
測試也不會對線上服務發出任何請求（全部走 fastapi TestClient 的 ASGI in-process 呼叫）。
"""

from __future__ import annotations

import io
import shutil
import sys
from pathlib import Path

import pytest

BACKEND_ROOT = Path(__file__).resolve().parent.parent
if str(BACKEND_ROOT) not in sys.path:
    sys.path.insert(0, str(BACKEND_ROOT))

from fastapi.testclient import TestClient  # noqa: E402

import app as app_module  # noqa: E402

HAS_TESSERACT = shutil.which("tesseract") is not None

requires_tesseract = pytest.mark.skipif(
    not HAS_TESSERACT,
    reason="系統未安裝 tesseract；OCR 路徑無法在本機驗證（production Dockerfile 有安裝）",
)


@pytest.fixture(scope="session")
def client() -> TestClient:
    return TestClient(app_module.app)


def make_image(
    width: int = 64,
    height: int = 48,
    fmt: str = "PNG",
    color: str = "white",
    mode: str = "RGB",
) -> bytes:
    from PIL import Image, ImageDraw

    im = Image.new(mode, (width, height), color)
    draw = ImageDraw.Draw(im)
    draw.rectangle([width // 4, height // 4, width // 2, height // 2], fill="black")
    buf = io.BytesIO()
    im.save(buf, format=fmt)
    return buf.getvalue()


def make_pdf(
    lines: list[str] | None = None,
    page_size: tuple[float, float] = (595, 842),
    pages: int = 1,
) -> bytes:
    """用 reportlab 合成 PDF。lines 為 None 時產生完全空白頁（OCR auto 會被觸發）。"""
    from reportlab.pdfgen import canvas

    buf = io.BytesIO()
    c = canvas.Canvas(buf, pagesize=page_size)
    for _ in range(pages):
        if lines:
            y = page_size[1] - 60
            for line in lines:
                c.drawString(50, y, line)
                y -= 18
        c.showPage()
    c.save()
    return buf.getvalue()


def make_table_pdf() -> bytes:
    """欄位對齊的多列文字，用來觸發 pdf_table 的座標推欄 fallback。"""
    from reportlab.pdfgen import canvas

    rows = [
        ("Widget", "A", "10"),
        ("Gadget", "B", "20"),
        ("Doohickey", "C", "30"),
        ("Gizmo", "D", "40"),
    ]
    buf = io.BytesIO()
    c = canvas.Canvas(buf, pagesize=(595, 842))
    y = 700
    for name, code, qty in rows:
        c.drawString(60, y, name)
        c.drawString(240, y, code)
        c.drawString(400, y, qty)
        y -= 24
    c.showPage()
    c.save()
    return buf.getvalue()


@pytest.fixture
def png_bytes() -> bytes:
    return make_image(fmt="PNG")


@pytest.fixture
def jpeg_bytes() -> bytes:
    return make_image(fmt="JPEG")


@pytest.fixture
def simple_pdf() -> bytes:
    return make_pdf(["Hello world, this page has real extractable text in it."])


@pytest.fixture
def table_pdf() -> bytes:
    return make_table_pdf()
