from __future__ import annotations

import csv
import io
import zipfile
from dataclasses import dataclass
from typing import Iterable

from PIL import Image, ImageOps, UnidentifiedImageError

from .common import ensure_batch_under_limit, ensure_image_dimensions, safe_stem

SUPPORTED_INPUT = {"JPEG", "PNG", "WEBP"}
SUPPORTED_OUTPUT = {"auto", "jpeg", "png", "webp"}


@dataclass
class ImageJob:
    filename: str
    data: bytes


def _pick_output_format(src_format: str, output_format: str) -> tuple[str, str]:
    output_format = output_format.lower()
    if output_format not in SUPPORTED_OUTPUT:
        raise ValueError(f"Unsupported output format: {output_format}")
    fmt = src_format.upper() if output_format == "auto" else {
        "jpeg": "JPEG",
        "png": "PNG",
        "webp": "WEBP",
    }[output_format]
    ext = {"JPEG": ".jpg", "PNG": ".png", "WEBP": ".webp"}[fmt]
    return fmt, ext


def _validate_resize(max_width: int | None, max_height: int | None) -> tuple[int | None, int | None]:
    for value, name in ((max_width, "max_width"), (max_height, "max_height")):
        if value is not None and (value < 1 or value > 20000):
            raise ValueError(f"{name} must be between 1 and 20000")
    return max_width, max_height


def compress_one(
    job: ImageJob,
    quality: int = 82,
    max_width: int | None = None,
    max_height: int | None = None,
    output_format: str = "auto",
) -> tuple[str, bytes, dict]:
    quality = max(1, min(100, int(quality)))
    max_width, max_height = _validate_resize(max_width, max_height)

    try:
        with Image.open(io.BytesIO(job.data)) as opened:
            src_format = (opened.format or "").upper()
            if src_format not in SUPPORTED_INPUT:
                raise ValueError(
                    f"Unsupported image type: {job.filename} ({src_format or 'unknown'})"
                )
            ensure_image_dimensions(opened.width, opened.height)
            im = ImageOps.exif_transpose(opened)
            im.load()
    except UnidentifiedImageError as exc:
        raise ValueError(f"{job.filename} is not a valid image") from exc

    original_size = im.size
    if max_width or max_height:
        target_w = max_width or im.width
        target_h = max_height or im.height
        im.thumbnail((target_w, target_h), Image.Resampling.LANCZOS)

    fmt, ext = _pick_output_format(src_format, output_format)

    if fmt == "JPEG":
        if im.mode in ("RGBA", "LA") or (im.mode == "P" and "transparency" in im.info):
            rgba = im.convert("RGBA")
            bg = Image.new("RGB", rgba.size, "white")
            bg.paste(rgba, mask=rgba.getchannel("A"))
            im = bg
        elif im.mode not in ("RGB", "L"):
            im = im.convert("RGB")
    elif fmt == "WEBP" and im.mode not in ("RGB", "RGBA", "L"):
        im = im.convert("RGBA" if "A" in im.getbands() else "RGB")

    out = io.BytesIO()
    save_kwargs: dict = {}
    if fmt == "JPEG":
        save_kwargs.update(quality=quality, optimize=True, progressive=True, subsampling="4:2:0")
    elif fmt == "WEBP":
        save_kwargs.update(quality=quality, method=6)
    elif fmt == "PNG":
        save_kwargs.update(optimize=True, compress_level=9)

    im.save(out, format=fmt, **save_kwargs)
    out_bytes = out.getvalue()
    out_name = safe_stem(job.filename) + ext
    saved = len(job.data) - len(out_bytes)
    ratio = (saved / len(job.data) * 100) if job.data else 0
    meta = {
        "input": job.filename,
        "output": out_name,
        "input_bytes": len(job.data),
        "output_bytes": len(out_bytes),
        "saved_bytes": saved,
        "saved_percent": round(ratio, 2),
        "original_width": original_size[0],
        "original_height": original_size[1],
        "output_width": im.width,
        "output_height": im.height,
        "output_format": fmt,
    }
    return out_name, out_bytes, meta


def compress_batch(
    jobs: Iterable[ImageJob],
    quality: int = 82,
    max_width: int | None = None,
    max_height: int | None = None,
    output_format: str = "auto",
) -> tuple[bytes, list[dict]]:
    jobs = list(jobs)
    if not jobs:
        raise ValueError("No images supplied")
    if len(jobs) > 100:
        raise ValueError("Maximum 100 images per batch")
    ensure_batch_under_limit((job.filename, job.data) for job in jobs)

    zip_buffer = io.BytesIO()
    manifest: list[dict] = []
    used_names: set[str] = set()

    with zipfile.ZipFile(zip_buffer, "w", zipfile.ZIP_DEFLATED) as zf:
        for index, job in enumerate(jobs, start=1):
            out_name, out_bytes, meta = compress_one(
                job,
                quality=quality,
                max_width=max_width,
                max_height=max_height,
                output_format=output_format,
            )
            if out_name in used_names:
                stem, ext = out_name.rsplit(".", 1)
                out_name = f"{stem}_{index}.{ext}"
                meta["output"] = out_name
            used_names.add(out_name)
            zf.writestr(out_name, out_bytes)
            manifest.append(meta)

        csv_buf = io.StringIO()
        writer = csv.DictWriter(csv_buf, fieldnames=list(manifest[0].keys()))
        writer.writeheader()
        writer.writerows(manifest)
        zf.writestr("compression-manifest.csv", csv_buf.getvalue().encode("utf-8-sig"))

    return zip_buffer.getvalue(), manifest
