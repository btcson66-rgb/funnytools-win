from __future__ import annotations

import io
import math
import threading

import pypdfium2 as pdfium
from PIL import Image

from .common import ensure_image_dimensions

# PDFium 本身不是 thread-safe——pypdfium2 的說明明載 "PDFium is inherently not
# thread-safe"，套件內部也沒有任何鎖。轉檔工作移進 threadpool 之後，同一個 worker
# 行程內可能有多個請求同時走到這裡，因此所有 pdfium 呼叫都必須序列化。
# 全後端只有這條路徑用到 pdfium；pdfplumber / pypdf / Pillow / OpenCV 不受此鎖影響。
_PDFIUM_LOCK = threading.Lock()


def target_bitmap_size(width_pt: float, height_pt: float, dpi: int) -> tuple[int, int]:
    """算出 pdfium 會配置的 bitmap 尺寸（向上取整），供渲染前的尺寸守門使用。"""
    scale = dpi / 72.0
    return math.ceil(width_pt * scale), math.ceil(height_pt * scale)


def render_pdf_page_png(pdf_bytes: bytes, page_index: int, dpi: int = 220) -> bytes:
    with _PDFIUM_LOCK:
        pdf = pdfium.PdfDocument(pdf_bytes)
        try:
            page = pdf[page_index]
            width_px, height_px = target_bitmap_size(page.get_width(), page.get_height(), dpi)

            # 尺寸守門必須發生在 page.render() 配置 bitmap 之前——擋在渲染之後就沒有
            # 意義（記憶體已經吃下去了）。上限沿用圖片端點那一套
            # （services.common.MAX_IMAGE_PIXELS），這裡不另立標準、也不改它的數值。
            if width_px <= 0 or height_px <= 0:
                raise ValueError(
                    f"PDF page {page_index + 1} has an unusable page size and cannot be converted"
                )
            try:
                ensure_image_dimensions(width_px, height_px)
            except ValueError as exc:
                raise ValueError(
                    f"PDF page {page_index + 1} is too large to convert at {dpi} DPI. {exc}"
                ) from exc

            bitmap = page.render(scale=dpi / 72.0, rotation=0)
            pil = bitmap.to_pil().convert("RGB")
            out = io.BytesIO()
            pil.save(out, "PNG", optimize=True)
            return out.getvalue()
        finally:
            pdf.close()
