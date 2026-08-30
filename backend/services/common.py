from __future__ import annotations

import io
import os
import shutil
import subprocess
import tempfile
from pathlib import Path
from typing import Iterable

from pypdf import PdfReader

MAX_SINGLE_UPLOAD_MB = int(os.environ.get("FUNNYTOOLS_MAX_UPLOAD_MB", "80"))
MAX_BATCH_TOTAL_MB = int(os.environ.get("FUNNYTOOLS_MAX_BATCH_MB", "120"))
MAX_IMAGE_PIXELS = int(os.environ.get("FUNNYTOOLS_MAX_IMAGE_PIXELS", "25000000"))
MAX_PDF_PAGES = int(os.environ.get("FUNNYTOOLS_MAX_PDF_PAGES", "200"))
MAX_OCR_PAGES = int(os.environ.get("FUNNYTOOLS_MAX_OCR_PAGES", "30"))
DEFAULT_OCR_LANGS = {"eng", "chi_tra", "eng+chi_tra", "chi_tra+eng"}


def ensure_under_limit(data: bytes, filename: str, max_mb: int = MAX_SINGLE_UPLOAD_MB) -> None:
    if not data:
        raise ValueError(f"{filename or 'file'} is empty")
    if len(data) > max_mb * 1024 * 1024:
        raise ValueError(f"{filename or 'file'} exceeds the {max_mb} MB upload limit")


def ensure_batch_under_limit(items: Iterable[tuple[str, bytes]]) -> None:
    total = 0
    for filename, data in items:
        ensure_under_limit(data, filename)
        total += len(data)
    if total > MAX_BATCH_TOTAL_MB * 1024 * 1024:
        raise ValueError(f"Batch exceeds the {MAX_BATCH_TOTAL_MB} MB total upload limit")


def ensure_image_dimensions(width: int, height: int) -> None:
    if width <= 0 or height <= 0:
        raise ValueError("Image has invalid dimensions")
    if width * height > MAX_IMAGE_PIXELS:
        raise ValueError(
            f"Image exceeds the {MAX_IMAGE_PIXELS:,}-pixel safety limit "
            f"({width}×{height} = {width * height:,} pixels)"
        )


def safe_stem(filename: str) -> str:
    # Remove both POSIX and Windows path components, then keep Unicode letters/numbers.
    basename = (filename or "file").replace("\\", "/").split("/")[-1]
    stem = Path(basename).stem
    cleaned = "".join(c if (c.isalnum() or c in "-_.") else "_" for c in stem).strip("._")
    return cleaned[:120] or "file"


def tempdir(prefix: str = "funnytools-"):
    return tempfile.TemporaryDirectory(prefix=prefix)


def which_required(binary: str) -> str:
    path = shutil.which(binary)
    if not path:
        raise RuntimeError(f"Required system binary not found: {binary}")
    return path


def validate_ocr_lang(lang: str) -> str:
    requested = (lang or "eng").strip()
    if requested not in DEFAULT_OCR_LANGS:
        raise ValueError(
            "Unsupported OCR language. Allowed: eng, chi_tra, eng+chi_tra, chi_tra+eng"
        )
    return requested


def run_tesseract_png(png_bytes: bytes, lang: str, output_format: str = "txt", psm: int = 6) -> bytes:
    lang = validate_ocr_lang(lang)
    tesseract = which_required("tesseract")
    with tempdir("funnytools-ocr-") as d:
        image_path = Path(d) / "page.png"
        image_path.write_bytes(png_bytes)
        cmd = [tesseract, str(image_path), "stdout", "-l", lang, "--psm", str(psm)]
        if output_format == "tsv":
            cmd.append("tsv")
        elif output_format != "txt":
            raise ValueError("Unsupported OCR output format")
        proc = subprocess.run(
            cmd,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            check=False,
            timeout=90,
        )
        if proc.returncode != 0:
            stderr = proc.stderr.decode("utf-8", errors="replace").strip()
            raise RuntimeError(stderr or "Tesseract OCR failed")
        return proc.stdout


def open_pdf_reader(pdf_bytes: bytes, filename: str = "document.pdf") -> PdfReader:
    ensure_under_limit(pdf_bytes, filename)
    try:
        reader = PdfReader(io.BytesIO(pdf_bytes), strict=False)
    except Exception as exc:
        raise ValueError("The uploaded file is not a readable PDF") from exc
    if reader.is_encrypted:
        raise ValueError("Encrypted or password-protected PDFs are not supported")
    if len(reader.pages) == 0:
        raise ValueError("PDF contains no pages")
    if len(reader.pages) > MAX_PDF_PAGES:
        raise ValueError(f"PDF exceeds the {MAX_PDF_PAGES}-page safety limit")
    return reader


def pdf_has_signature(reader: PdfReader) -> bool:
    try:
        fields = reader.get_fields() or {}
    except Exception:
        return False
    for field in fields.values():
        try:
            if str(field.get("/FT", "")) == "/Sig":
                return True
        except Exception:
            continue
    return False
