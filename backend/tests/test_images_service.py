"""services/images.py — 格式挑選、尺寸驗證、批次上限、輸出完整性。"""

from __future__ import annotations

import io
import zipfile

import pytest
from PIL import Image

from services import common
from services.images import (
    ImageJob,
    _pick_output_format,
    _validate_resize,
    compress_batch,
    compress_one,
)

from conftest import make_image


# ------------------------------------------------------------ _pick_output_format


@pytest.mark.parametrize(
    "src,requested,expected",
    [
        ("JPEG", "auto", ("JPEG", ".jpg")),
        ("PNG", "auto", ("PNG", ".png")),
        ("WEBP", "auto", ("WEBP", ".webp")),
        ("PNG", "jpeg", ("JPEG", ".jpg")),
        ("JPEG", "PNG", ("PNG", ".png")),  # 大小寫不敏感
        ("JPEG", "WebP", ("WEBP", ".webp")),
    ],
)
def test_pick_output_format(src, requested, expected):
    assert _pick_output_format(src, requested) == expected


@pytest.mark.parametrize("bad", ["gif", "bmp", "tiff", "svg", "", "../png", "jpeg;png"])
def test_pick_output_format_rejects_anything_off_the_allowlist(bad):
    with pytest.raises(ValueError, match="Unsupported output format"):
        _pick_output_format("PNG", bad)


# -------------------------------------------------------------- _validate_resize


@pytest.mark.parametrize(
    "w,h", [(None, None), (1, None), (None, 1), (20000, 20000), (800, 600)]
)
def test_validate_resize_accepts_in_range_values(w, h):
    assert _validate_resize(w, h) == (w, h)


@pytest.mark.parametrize(
    "w,h,name",
    [
        (0, None, "max_width"),
        (-1, None, "max_width"),
        (20001, None, "max_width"),
        (None, 0, "max_height"),
        (None, -5, "max_height"),
        (None, 999999, "max_height"),
    ],
)
def test_validate_resize_rejects_out_of_range_values(w, h, name):
    with pytest.raises(ValueError, match=f"{name} must be between 1 and 20000"):
        _validate_resize(w, h)


# ------------------------------------------------------------------- compress_one


def test_compress_one_clamps_quality_instead_of_raising():
    """現況記錄：quality 用 clamp 而不是驗證，任何整數都不會 400。"""
    for quality in (-999, 0, 1, 100, 10_000):
        name, data, meta = compress_one(
            ImageJob("a.jpg", make_image(fmt="JPEG")), quality=quality
        )
        assert data[:2] == b"\xff\xd8"
        assert meta["output_format"] == "JPEG"


@pytest.mark.parametrize("fmt", ["GIF", "BMP", "TIFF"])
def test_compress_one_rejects_formats_outside_the_input_allowlist(fmt):
    """副檔名說是 .jpg 也沒用——判斷依據是 PIL 解出來的真實格式。"""
    job = ImageJob("looks-like-a.jpg", make_image(fmt=fmt))
    with pytest.raises(ValueError, match="Unsupported image type"):
        compress_one(job)


def test_compress_one_rejects_bytes_that_are_not_an_image():
    job = ImageJob("a.jpg", b"%PDF-1.4 this is a pdf pretending to be a jpeg")
    with pytest.raises(ValueError, match="is not a valid image"):
        compress_one(job)


def test_compress_one_rejects_a_pixel_bomb_before_decoding(monkeypatch):
    """壓低 pixel 上限，確認尺寸檢查發生在解碼前（用 header 的寬高）。"""
    monkeypatch.setattr(common, "MAX_IMAGE_PIXELS", 100)
    job = ImageJob("big.png", make_image(width=200, height=200, fmt="PNG"))
    with pytest.raises(ValueError, match="pixel safety limit"):
        compress_one(job)


def test_compress_one_downscales_but_never_upscales():
    job = ImageJob("a.png", make_image(width=400, height=300, fmt="PNG"))
    _, _, meta = compress_one(job, max_width=100, max_height=100, output_format="png")
    assert meta["original_width"] == 400 and meta["original_height"] == 300
    assert meta["output_width"] <= 100 and meta["output_height"] <= 100

    _, _, meta2 = compress_one(job, max_width=9000, max_height=9000, output_format="png")
    assert meta2["output_width"] == 400 and meta2["output_height"] == 300


def test_compress_one_flattens_alpha_when_targeting_jpeg():
    job = ImageJob("a.png", make_image(fmt="PNG", mode="RGBA"))
    _, data, meta = compress_one(job, output_format="jpeg")
    assert meta["output_format"] == "JPEG"
    with Image.open(io.BytesIO(data)) as im:
        assert im.mode == "RGB"  # JPEG 不支援 alpha，必須先合成白底


def test_compress_one_manifest_arithmetic_is_self_consistent():
    job = ImageJob("a.png", make_image(width=300, height=300, fmt="PNG"))
    _, data, meta = compress_one(job, output_format="png")
    assert meta["input_bytes"] == len(job.data)
    assert meta["output_bytes"] == len(data)
    assert meta["saved_bytes"] == meta["input_bytes"] - meta["output_bytes"]


# ----------------------------------------------------------------- compress_batch


def test_compress_batch_rejects_an_empty_batch():
    with pytest.raises(ValueError, match="No images supplied"):
        compress_batch([])


def test_compress_batch_rejects_more_than_100_images():
    tiny = make_image(width=8, height=8, fmt="PNG")
    jobs = [ImageJob(f"{i}.png", tiny) for i in range(101)]
    with pytest.raises(ValueError, match="Maximum 100 images per batch"):
        compress_batch(jobs)


def test_compress_batch_accepts_exactly_100_images():
    tiny = make_image(width=8, height=8, fmt="PNG")
    jobs = [ImageJob(f"{i}.png", tiny) for i in range(100)]
    zip_bytes, manifest = compress_batch(jobs, output_format="png")
    assert len(manifest) == 100
    with zipfile.ZipFile(io.BytesIO(zip_bytes)) as zf:
        assert len(zf.namelist()) == 101


def test_compress_batch_enforces_the_total_byte_cap(monkeypatch):
    monkeypatch.setattr(common, "MAX_BATCH_TOTAL_MB", 0)
    jobs = [ImageJob("a.png", make_image(fmt="PNG"))]
    with pytest.raises(ValueError, match="Batch exceeds"):
        compress_batch(jobs)


def test_compress_batch_output_zip_is_readable_and_entries_decode():
    jobs = [
        ImageJob("a.png", make_image(fmt="PNG")),
        ImageJob("b.jpg", make_image(fmt="JPEG")),
    ]
    zip_bytes, manifest = compress_batch(jobs)

    with zipfile.ZipFile(io.BytesIO(zip_bytes)) as zf:
        assert zf.testzip() is None  # CRC 全數正確
        for item in manifest:
            payload = zf.read(item["output"])
            assert len(payload) == item["output_bytes"]
            with Image.open(io.BytesIO(payload)) as im:
                im.load()


def test_compress_batch_fails_the_whole_batch_when_one_member_is_corrupt():
    """現況記錄：批次沒有 per-file 錯誤隔離，一張壞圖整批 400。"""
    jobs = [
        ImageJob("good.png", make_image(fmt="PNG")),
        ImageJob("bad.png", b"not an image at all"),
    ]
    with pytest.raises(ValueError, match="is not a valid image"):
        compress_batch(jobs)
