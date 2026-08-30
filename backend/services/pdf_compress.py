from __future__ import annotations

import io

from PIL import Image
from pypdf import PdfReader, PdfWriter

from .common import open_pdf_reader, pdf_has_signature


PRESETS = {
    "balanced": {"max_dimension": 1800, "quality": 82, "min_image_bytes": 80_000},
    "strong": {"max_dimension": 1200, "quality": 72, "min_image_bytes": 50_000},
}


def _extract_text(reader: PdfReader) -> str:
    parts: list[str] = []
    for page in reader.pages:
        try:
            parts.append(page.extract_text() or "")
        except Exception:
            parts.append("")
    return "\n".join(parts)


def _lossless_writer(reader: PdfReader) -> PdfWriter:
    writer = PdfWriter(clone_from=reader)
    for page in writer.pages:
        try:
            page.compress_content_streams()
        except Exception:
            pass
    try:
        writer.compress_identical_objects(remove_identicals=True, remove_orphans=True)
    except Exception:
        pass
    return writer


def _replace_images(writer: PdfWriter, preset: str) -> dict:
    settings = PRESETS[preset]
    replaced = 0
    skipped_alpha = 0
    skipped_small = 0
    failed = 0

    for page in writer.pages:
        try:
            images = list(page.images)
        except Exception:
            continue
        for image_file in images:
            try:
                if len(image_file.data) < settings["min_image_bytes"]:
                    skipped_small += 1
                    continue
                pil = image_file.image
                if "A" in pil.getbands():
                    skipped_alpha += 1
                    continue
                if pil.mode not in ("RGB", "L"):
                    pil = pil.convert("RGB")
                max_dim = settings["max_dimension"]
                if max(pil.size) > max_dim:
                    ratio = max_dim / max(pil.size)
                    pil = pil.resize(
                        (max(1, round(pil.width * ratio)), max(1, round(pil.height * ratio))),
                        Image.Resampling.LANCZOS,
                    )
                image_file.replace(pil, quality=settings["quality"], optimize=True)
                replaced += 1
            except TypeError:
                # Inline images cannot be replaced by pypdf; leave them unchanged.
                failed += 1
            except Exception:
                failed += 1

    return {
        "images_recompressed": replaced,
        "images_skipped_alpha": skipped_alpha,
        "images_skipped_small": skipped_small,
        "images_failed": failed,
    }


def compress_pdf(
    pdf_bytes: bytes,
    filename: str = "document.pdf",
    preset: str = "balanced",
) -> tuple[bytes, dict]:
    reader = open_pdf_reader(pdf_bytes, filename)
    preset = preset.lower()
    if preset not in {"lossless", "balanced", "strong"}:
        raise ValueError("preset must be lossless, balanced, or strong")
    if pdf_has_signature(reader):
        raise ValueError("Digitally signed PDFs are not compressed because rewriting invalidates signatures")

    before_text = _extract_text(reader)
    writer = _lossless_writer(reader)
    image_stats = {
        "images_recompressed": 0,
        "images_skipped_alpha": 0,
        "images_skipped_small": 0,
        "images_failed": 0,
    }
    if preset in PRESETS:
        image_stats = _replace_images(writer, preset)

    out_buffer = io.BytesIO()
    writer.write(out_buffer)
    candidate = out_buffer.getvalue()

    # A compressor should never make the user's file larger. If optimization expands it,
    # safely return the original bytes instead.
    if len(candidate) >= len(pdf_bytes):
        out = pdf_bytes
        used_original = True
    else:
        out = candidate
        used_original = False

    after_reader = open_pdf_reader(out, filename)
    after_text = _extract_text(after_reader)
    if len(after_reader.pages) != len(reader.pages):
        raise RuntimeError("PDF verification failed: page count changed")

    in_size = len(pdf_bytes)
    out_size = len(out)
    stats = {
        "preset": preset,
        "input_bytes": in_size,
        "output_bytes": out_size,
        "saved_bytes": in_size - out_size,
        "saved_percent": round((in_size - out_size) / in_size * 100, 2),
        "pages": len(after_reader.pages),
        "text_extractable_before": bool(before_text.strip()),
        "text_extractable_after": bool(after_text.strip()),
        "text_character_count_before": len(before_text),
        "text_character_count_after": len(after_text),
        "returned_original_because_candidate_was_larger": used_original,
        **image_stats,
    }
    return out, stats
