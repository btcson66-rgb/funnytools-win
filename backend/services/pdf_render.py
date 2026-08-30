from __future__ import annotations

import io

import pypdfium2 as pdfium
from PIL import Image


def render_pdf_page_png(pdf_bytes: bytes, page_index: int, dpi: int = 220) -> bytes:
    pdf = pdfium.PdfDocument(pdf_bytes)
    try:
        page = pdf[page_index]
        bitmap = page.render(scale=dpi / 72.0, rotation=0)
        pil = bitmap.to_pil().convert("RGB")
        out = io.BytesIO()
        pil.save(out, "PNG", optimize=True)
        return out.getvalue()
    finally:
        pdf.close()
