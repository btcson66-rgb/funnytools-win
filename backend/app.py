from __future__ import annotations

import io
import json
import os
import threading
from contextlib import contextmanager
from typing import Annotated

from fastapi import Body, FastAPI, File, Form, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, StreamingResponse
from starlette.concurrency import run_in_threadpool

from services.common import MAX_BATCH_TOTAL_MB, MAX_SINGLE_UPLOAD_MB
from services.image_dxf import image_to_dxf
from services.images import ImageJob, compress_batch
from services.pdf_compress import compress_pdf
from services.pdf_table import extract_tables, pdf_tables_to_xlsx, tables_to_xlsx
from services.pdf_word import pdf_to_docx

VERSION = "1.1.0"


def _read_revision() -> str:
    """建置時傳入的 git commit SHA，用來辨識線上跑的到底是哪一版程式。

    production image 是手動 build 的，沒有這個標記就無法從外部確認容器裡是哪個
    commit。值只會出現在 /health，所以在這裡做白名單過濾，避免有人在 build 時
    誤傳本機路徑或憑證進來被 API 原樣回吐。
    """
    raw = os.environ.get("FUNNYTOOLS_REVISION", "").strip()
    if not raw:
        return "unknown"
    cleaned = "".join(ch for ch in raw if ch.isalnum() or ch in "-_.")[:40]
    return cleaned or "unknown"


REVISION = _read_revision()
DEFAULT_ORIGINS = (
    "https://funnytools.win,https://www.funnytools.win,"
    "http://localhost:3000,http://localhost:5173"
)
ALLOWED_ORIGINS = [
    item.strip()
    for item in os.environ.get("FUNNYTOOLS_ALLOWED_ORIGINS", DEFAULT_ORIGINS).split(",")
    if item.strip()
]

# 每個 worker 行程同時執行的轉檔數上限。轉檔工作跑在 threadpool，anyio 預設給 40 條
# 執行緒——若不設閘，40 個大型任務會同時吃記憶體並直接 OOM。這個閘的目的是把記憶體
# 峰值變成可計算的值，而不是讓它隨流量無限成長。
# 總併發 = uvicorn worker 數 × 這個值（Dockerfile 是 --workers 2，預設值 2 → 全機 4）。
MAX_CONCURRENT_JOBS = max(1, int(os.environ.get("FUNNYTOOLS_MAX_CONCURRENT_JOBS", "2")))
BUSY_RETRY_AFTER_SECONDS = os.environ.get("FUNNYTOOLS_BUSY_RETRY_AFTER", "5")

app = FastAPI(
    title="Funnytools Conversion API",
    version=VERSION,
    docs_url="/docs" if os.environ.get("FUNNYTOOLS_ENABLE_DOCS", "0") == "1" else None,
    redoc_url=None,
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=False,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type", "Accept"],
    expose_headers=["Content-Disposition", "X-Funnytools-Stats"],
)


_job_lock = threading.Lock()
_active_jobs = 0


@contextmanager
def _job_slot():
    """有界併發閘。

    閘滿時立刻丟 503（帶 Retry-After），**不排隊**——排隊只會讓所有人一起逾時，
    而且會把記憶體壓力往後堆。呼叫端必須把這個 context manager 放在 handler 的
    try/except 之外，否則 HTTPException 會被 _http_error() 誤判成 500。

    /health 刻意不經過這個閘：它必須在滿載時仍然可回應，Docker HEALTHCHECK 與
    smoke 的 readiness 輪詢都依賴它。
    """
    global _active_jobs
    with _job_lock:
        if _active_jobs >= MAX_CONCURRENT_JOBS:
            raise HTTPException(
                status_code=503,
                detail="The conversion service is busy. Please retry in a few seconds.",
                headers={"Retry-After": BUSY_RETRY_AFTER_SECONDS},
            )
        _active_jobs += 1
    try:
        yield
    finally:
        with _job_lock:
            _active_jobs -= 1


def _http_error(exc: Exception) -> HTTPException:
    if isinstance(exc, (ValueError, TypeError)):
        return HTTPException(status_code=400, detail=str(exc))
    if isinstance(exc, TimeoutError):
        return HTTPException(status_code=408, detail="Processing timed out")
    return HTTPException(status_code=500, detail="Conversion failed")


def _stats_header(stats: dict) -> str:
    return json.dumps(stats, separators=(",", ":"), ensure_ascii=True)


async def _read_upload_limited(upload: UploadFile, max_mb: int = MAX_SINGLE_UPLOAD_MB) -> bytes:
    limit = max_mb * 1024 * 1024
    chunks: list[bytes] = []
    total = 0
    while True:
        chunk = await upload.read(1024 * 1024)
        if not chunk:
            break
        total += len(chunk)
        if total > limit:
            raise ValueError(f"{upload.filename or 'file'} exceeds the {max_mb} MB upload limit")
        chunks.append(chunk)
    data = b"".join(chunks)
    if not data:
        raise ValueError(f"{upload.filename or 'file'} is empty")
    return data


async def _read_batch_limited(files: list[UploadFile]) -> list[ImageJob]:
    if not files:
        raise ValueError("No images supplied")
    if len(files) > 100:
        raise ValueError("Maximum 100 images per batch")
    batch_limit = MAX_BATCH_TOTAL_MB * 1024 * 1024
    total = 0
    jobs: list[ImageJob] = []
    for upload in files:
        data = await _read_upload_limited(upload)
        total += len(data)
        if total > batch_limit:
            raise ValueError(f"Batch exceeds the {MAX_BATCH_TOTAL_MB} MB total upload limit")
        jobs.append(ImageJob(upload.filename or "image", data))
    return jobs


@app.get("/health")
def health():
    return {"ok": True, "version": VERSION, "revision": REVISION}


@app.post("/api/images/compress-batch")
async def api_compress_batch(
    files: list[UploadFile] = File(...),
    quality: int = Form(82),
    max_width: int | None = Form(None),
    max_height: int | None = Form(None),
    output_format: str = Form("auto"),
):
    with _job_slot():
        try:
            jobs = await _read_batch_limited(files)
            zip_bytes, manifest = await run_in_threadpool(
                compress_batch,
                jobs,
                quality=quality,
                max_width=max_width,
                max_height=max_height,
                output_format=output_format,
            )
            stats = {
                "files": len(manifest),
                "input_bytes": sum(item["input_bytes"] for item in manifest),
                "output_bytes": sum(item["output_bytes"] for item in manifest),
            }
            return StreamingResponse(
                io.BytesIO(zip_bytes),
                media_type="application/zip",
                headers={
                    "Content-Disposition": 'attachment; filename="compressed-images.zip"',
                    "X-Funnytools-Stats": _stats_header(stats),
                },
            )
        except Exception as exc:
            raise _http_error(exc) from exc


@app.post("/api/pdf/to-word")
async def api_pdf_to_word(
    file: UploadFile = File(...),
    ocr_mode: str = Form("auto"),
    ocr_lang: str = Form("eng"),
    include_images: bool = Form(True),
):
    with _job_slot():
        try:
            data = await _read_upload_limited(file)
            out, stats = await run_in_threadpool(
                pdf_to_docx,
                data,
                file.filename or "document.pdf",
                ocr_mode=ocr_mode,
                ocr_lang=ocr_lang,
                include_images=include_images,
            )
            return StreamingResponse(
                io.BytesIO(out),
                media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                headers={
                    "X-Funnytools-Stats": _stats_header(stats),
                    "Content-Disposition": 'attachment; filename="converted.docx"',
                },
            )
        except Exception as exc:
            raise _http_error(exc) from exc


def _parse_pages(pages: str | None) -> list[int] | None:
    if not pages:
        return None
    result: list[int] = []
    for item in pages.split(","):
        item = item.strip()
        if not item:
            raise ValueError("pages must contain comma-separated positive page numbers")
        if not item.isdigit():
            raise ValueError("pages must contain comma-separated positive page numbers")
        n = int(item)
        if n < 1:
            raise ValueError("Page numbers are 1-based and must be >= 1")
        result.append(n - 1)
    return result or None


@app.post("/api/pdf/table-preview")
async def api_table_preview(
    file: UploadFile = File(...),
    pages: str | None = Form(None),
    ocr_mode: str = Form("auto"),
    ocr_lang: str = Form("eng"),
):
    with _job_slot():
        try:
            data = await _read_upload_limited(file)
            tables, stats = await run_in_threadpool(
                extract_tables,
                data,
                file.filename or "tables.pdf",
                pages=_parse_pages(pages),
                ocr_mode=ocr_mode,
                ocr_lang=ocr_lang,
            )
            return JSONResponse({"stats": stats, "tables": tables})
        except Exception as exc:
            raise _http_error(exc) from exc


@app.post("/api/pdf/table-to-excel")
async def api_table_to_excel(
    file: UploadFile = File(...),
    pages: str | None = Form(None),
    ocr_mode: str = Form("auto"),
    ocr_lang: str = Form("eng"),
):
    with _job_slot():
        try:
            data = await _read_upload_limited(file)
            out, _tables, stats = await run_in_threadpool(
                pdf_tables_to_xlsx,
                data,
                file.filename or "tables.pdf",
                pages=_parse_pages(pages),
                ocr_mode=ocr_mode,
                ocr_lang=ocr_lang,
            )
            return StreamingResponse(
                io.BytesIO(out),
                media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                headers={
                    "X-Funnytools-Stats": _stats_header(stats),
                    "Content-Disposition": 'attachment; filename="pdf-tables.xlsx"',
                },
            )
        except Exception as exc:
            raise _http_error(exc) from exc


@app.post("/api/pdf/export-tables")
async def api_export_tables(payload: Annotated[dict, Body(...)]):
    with _job_slot():
        try:
            tables = payload.get("tables") or []
            if not isinstance(tables, list):
                raise ValueError("tables must be a list")
            if len(tables) > 100:
                raise ValueError("Maximum 100 edited tables per export")
            out = await run_in_threadpool(tables_to_xlsx, tables)
            return StreamingResponse(
                io.BytesIO(out),
                media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                headers={"Content-Disposition": 'attachment; filename="edited-pdf-tables.xlsx"'},
            )
        except Exception as exc:
            raise _http_error(exc) from exc


@app.post("/api/image/to-dxf")
async def api_image_to_dxf(
    file: UploadFile = File(...),
    threshold: int = Form(180),
    invert: bool = Form(False),
    blur: int = Form(3),
    epsilon_ratio: float = Form(0.0025),
    min_area: float = Form(20.0),
    units_per_pixel: float | None = Form(None),
    calibration_pixel_distance: float | None = Form(None),
    calibration_real_distance: float | None = Form(None),
    units: str = Form("unitless"),
):
    with _job_slot():
        try:
            data = await _read_upload_limited(file)
            out, stats = await run_in_threadpool(
                image_to_dxf,
                data,
                file.filename or "drawing.png",
                threshold=threshold,
                invert=invert,
                blur=blur,
                epsilon_ratio=epsilon_ratio,
                min_area=min_area,
                units_per_pixel=units_per_pixel,
                calibration_pixel_distance=calibration_pixel_distance,
                calibration_real_distance=calibration_real_distance,
                units=units,
            )
            return StreamingResponse(
                io.BytesIO(out),
                media_type="application/dxf",
                headers={
                    "X-Funnytools-Stats": _stats_header(stats.__dict__),
                    "Content-Disposition": 'attachment; filename="vectorized.dxf"',
                },
            )
        except Exception as exc:
            raise _http_error(exc) from exc


@app.post("/api/pdf/compress")
async def api_pdf_compress(
    file: UploadFile = File(...),
    preset: str = Form("balanced"),
):
    with _job_slot():
        try:
            data = await _read_upload_limited(file)
            out, stats = await run_in_threadpool(
                compress_pdf, data, file.filename or "document.pdf", preset=preset
            )
            return StreamingResponse(
                io.BytesIO(out),
                media_type="application/pdf",
                headers={
                    "X-Funnytools-Stats": _stats_header(stats),
                    "Content-Disposition": 'attachment; filename="compressed.pdf"',
                },
            )
        except Exception as exc:
            raise _http_error(exc) from exc
