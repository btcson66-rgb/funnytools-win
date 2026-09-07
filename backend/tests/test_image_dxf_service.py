"""services/image_dxf.py — 參數邊界、比例尺推導與 DXF 輸出完整性。"""

from __future__ import annotations

import io

import pytest

from services import common
from services.image_dxf import UNITS, image_to_dxf

from conftest import make_image, make_pdf


def drawing(width: int = 200, height: int = 160) -> bytes:
    """白底黑方塊，保證至少有一條可向量化的輪廓。"""
    return make_image(width=width, height=height, fmt="PNG", color="white")


# ------------------------------------------------------------------ 參數驗證


@pytest.mark.parametrize("units", sorted(UNITS))
def test_every_documented_unit_is_accepted(units):
    out, stats = image_to_dxf(drawing(), "a.png", units=units)
    assert stats.units == units
    assert b"SECTION" in out


@pytest.mark.parametrize("units", ["km", "ft", "", "MM", "../mm", "inch; rm -rf /"])
def test_units_outside_the_allowlist_are_rejected(units):
    with pytest.raises(ValueError, match="units must be unitless, inch, mm, cm, or m"):
        image_to_dxf(drawing(), "a.png", units=units)


@pytest.mark.parametrize("epsilon", [-0.0001, -1, 0.1001, 1.0, 100])
def test_epsilon_ratio_is_bounded_to_zero_through_zero_point_one(epsilon):
    with pytest.raises(ValueError, match="epsilon_ratio must be between 0 and 0.1"):
        image_to_dxf(drawing(), "a.png", epsilon_ratio=epsilon)


@pytest.mark.parametrize("epsilon", [0.0, 0.1])
def test_epsilon_ratio_boundaries_are_inclusive(epsilon):
    out, _ = image_to_dxf(drawing(), "a.png", epsilon_ratio=epsilon)
    assert b"SECTION" in out


def test_negative_min_area_is_rejected():
    with pytest.raises(ValueError, match="min_area must be >= 0"):
        image_to_dxf(drawing(), "a.png", min_area=-1)


@pytest.mark.parametrize("threshold", [-500, 0, 255, 9999])
def test_threshold_is_clamped_rather_than_rejected(threshold):
    """現況記錄：threshold 走 clamp(0,255)，任何整數都不會 400。"""
    out, _ = image_to_dxf(drawing(), "a.png", threshold=threshold, min_area=0)
    assert b"SECTION" in out


def test_rejects_bytes_that_are_not_an_image():
    with pytest.raises(ValueError, match="not a valid image"):
        image_to_dxf(make_pdf(["x"]), "a.png")


def test_rejects_an_empty_upload():
    with pytest.raises(ValueError, match="is empty"):
        image_to_dxf(b"", "a.png")


def test_rejects_a_pixel_bomb_before_decoding(monkeypatch):
    monkeypatch.setattr(common, "MAX_IMAGE_PIXELS", 100)
    with pytest.raises(ValueError, match="pixel safety limit"):
        image_to_dxf(drawing(300, 300), "a.png")


# ------------------------------------------------------------------- 比例尺


def test_default_scale_is_one_unit_per_pixel():
    _, stats = image_to_dxf(drawing(), "a.png")
    assert stats.scale_units_per_pixel == 1.0


def test_explicit_units_per_pixel_wins_over_calibration():
    _, stats = image_to_dxf(
        drawing(),
        "a.png",
        units_per_pixel=0.25,
        calibration_pixel_distance=100,
        calibration_real_distance=999,
    )
    assert stats.scale_units_per_pixel == 0.25


@pytest.mark.parametrize("value", [0, -1, -0.5])
def test_non_positive_units_per_pixel_is_rejected(value):
    with pytest.raises(ValueError, match="units_per_pixel must be positive"):
        image_to_dxf(drawing(), "a.png", units_per_pixel=value)


def test_calibration_derives_the_scale_as_real_over_pixels():
    _, stats = image_to_dxf(
        drawing(), "a.png", calibration_pixel_distance=200, calibration_real_distance=50
    )
    assert stats.scale_units_per_pixel == pytest.approx(0.25)


@pytest.mark.parametrize(
    "px,real",
    [(100, None), (None, 100), (0, 100), (100, 0), (-5, 10), (10, -5)],
)
def test_calibration_requires_two_positive_distances(px, real):
    with pytest.raises(ValueError, match="calibration|Calibration"):
        image_to_dxf(
            drawing(),
            "a.png",
            calibration_pixel_distance=px,
            calibration_real_distance=real,
        )


# ---------------------------------------------------------- 輸出完整性


def test_output_is_a_parsable_r2010_dxf_with_the_declared_insunits():
    import ezdxf

    out, stats = image_to_dxf(drawing(), "a.png", units="mm")
    doc = ezdxf.read(io.StringIO(out.decode("utf-8")))
    assert doc.header["$INSUNITS"] == UNITS["mm"]
    polylines = list(doc.modelspace().query("LWPOLYLINE"))
    assert len(polylines) == stats.polylines_written >= 1
    assert stats.vertices_written >= 2 * stats.polylines_written


def test_no_detectable_contour_returns_a_clear_400_message():
    """全白圖沒有輪廓；必須回可行動的訊息，而不是產出空 DXF。"""
    blank = make_image(width=10, height=10, fmt="PNG", color="white")
    with pytest.raises(ValueError, match="No vectorizable contours were detected"):
        image_to_dxf(blank, "a.png", min_area=1e9)


def test_min_area_filters_small_contours_out():
    _, keep = image_to_dxf(drawing(), "a.png", min_area=0)
    with pytest.raises(ValueError, match="No vectorizable contours"):
        image_to_dxf(drawing(), "a.png", min_area=1e9)
    assert keep.polylines_written >= 1


def test_stats_never_report_more_polylines_than_contours_seen():
    _, stats = image_to_dxf(drawing(), "a.png", min_area=0)
    assert stats.polylines_written <= stats.contours_seen
