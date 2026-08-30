from __future__ import annotations

import io
from dataclasses import dataclass

import cv2
import ezdxf
import numpy as np
from PIL import Image, ImageOps, UnidentifiedImageError

from .common import ensure_image_dimensions, ensure_under_limit


@dataclass
class DxfStats:
    contours_seen: int
    polylines_written: int
    vertices_written: int
    scale_units_per_pixel: float
    units: str


UNITS = {
    "unitless": 0,
    "inch": 1,
    "mm": 4,
    "cm": 5,
    "m": 6,
}


def image_to_dxf(
    image_bytes: bytes,
    filename: str = "drawing.png",
    threshold: int = 180,
    invert: bool = False,
    blur: int = 3,
    epsilon_ratio: float = 0.0025,
    min_area: float = 20.0,
    units_per_pixel: float | None = None,
    calibration_pixel_distance: float | None = None,
    calibration_real_distance: float | None = None,
    units: str = "unitless",
) -> tuple[bytes, DxfStats]:
    ensure_under_limit(image_bytes, filename)
    threshold = max(0, min(255, int(threshold)))
    if units not in UNITS:
        raise ValueError("units must be unitless, inch, mm, cm, or m")
    if epsilon_ratio < 0 or epsilon_ratio > 0.1:
        raise ValueError("epsilon_ratio must be between 0 and 0.1")
    if min_area < 0:
        raise ValueError("min_area must be >= 0")

    try:
        with Image.open(io.BytesIO(image_bytes)) as opened:
            ensure_image_dimensions(opened.width, opened.height)
            pil = ImageOps.exif_transpose(opened).convert("L")
            gray = np.array(pil)
    except UnidentifiedImageError as exc:
        raise ValueError("Uploaded file is not a valid image") from exc

    if blur and blur > 1:
        k = max(1, min(31, int(blur)))
        if k % 2 == 0:
            k += 1
        gray = cv2.GaussianBlur(gray, (k, k), 0)

    mode = cv2.THRESH_BINARY if invert else cv2.THRESH_BINARY_INV
    _, binary = cv2.threshold(gray, threshold, 255, mode)
    contours, _ = cv2.findContours(binary, cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE)

    if units_per_pixel is not None:
        scale = float(units_per_pixel)
        if scale <= 0:
            raise ValueError("units_per_pixel must be positive")
    elif calibration_pixel_distance is not None or calibration_real_distance is not None:
        if not calibration_pixel_distance or not calibration_real_distance:
            raise ValueError("Both calibration distances are required")
        if calibration_pixel_distance <= 0 or calibration_real_distance <= 0:
            raise ValueError("Calibration distances must be positive")
        scale = float(calibration_real_distance) / float(calibration_pixel_distance)
    else:
        scale = 1.0

    doc = ezdxf.new("R2010")
    doc.header["$INSUNITS"] = UNITS[units]
    msp = doc.modelspace()
    vertices = 0
    written = 0
    height_px = gray.shape[0]

    for contour in contours:
        area = abs(cv2.contourArea(contour))
        if area < min_area:
            continue
        perimeter = cv2.arcLength(contour, True)
        eps = max(0.1, perimeter * float(epsilon_ratio))
        approx = cv2.approxPolyDP(contour, eps, True)
        pts = approx.reshape(-1, 2)
        if len(pts) < 2:
            continue
        xy = [(float(x) * scale, float(height_px - y) * scale) for x, y in pts]
        msp.add_lwpolyline(xy, close=True)
        vertices += len(xy)
        written += 1

    if written == 0:
        raise ValueError("No vectorizable contours were detected; adjust threshold or minimum area")

    text = io.StringIO()
    doc.write(text)
    out = text.getvalue().encode("utf-8")
    return out, DxfStats(
        contours_seen=len(contours),
        polylines_written=written,
        vertices_written=vertices,
        scale_units_per_pixel=scale,
        units=units,
    )
