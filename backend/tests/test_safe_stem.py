"""safe_stem() 是輸出檔名與 ZIP entry 名稱的唯一防線，針對 path traversal 逐項驗證。"""

from __future__ import annotations

import io
import zipfile

import pytest

from services.common import safe_stem
from services.images import ImageJob, compress_batch

from conftest import make_image


@pytest.mark.parametrize(
    "malicious",
    [
        "../../etc/passwd",
        "../../../../../../etc/shadow",
        "..\\..\\Windows\\System32\\cmd.exe",
        "/etc/passwd",
        "C:\\Windows\\win.ini",
        "a/b/../c.png",
        "....//....//etc/passwd",
        "dir/sub/file.png",
    ],
)
def test_safe_stem_strips_every_path_component(malicious):
    stem = safe_stem(malicious)
    assert "/" not in stem
    assert "\\" not in stem
    assert not stem.startswith(".")
    assert stem not in ("", ".", "..")


@pytest.mark.parametrize("value", ["..", ".", "", "...", "....jpg", "._.", "__..__"])
def test_safe_stem_never_returns_a_relative_path_token(value):
    """全部由 . 與 _ 組成的檔名 strip 後會變空字串，必須退回 'file'。"""
    assert safe_stem(value) == "file"


def test_safe_stem_preserves_unicode_filenames():
    """繁中／日文檔名是真實流量，不能被整個清成 file。"""
    assert safe_stem("報表2026.xlsx") == "報表2026"
    assert safe_stem("日本語ファイル.png") == "日本語ファイル"


def test_safe_stem_replaces_shell_and_glob_metacharacters():
    assert safe_stem("a;rm -rf b.png") == "a_rm_-rf_b"
    assert safe_stem("$(whoami).png") == "whoami"  # 前後的 _ 會被 strip("._") 去掉
    assert safe_stem("a*b?c|d.png") == "a_b_c_d"


def test_safe_stem_drops_null_byte_and_newline():
    assert "\x00" not in safe_stem("evil\x00.png")
    assert "\n" not in safe_stem("evil\nname.png")


def test_safe_stem_truncates_to_120_characters():
    assert len(safe_stem("a" * 5000 + ".png")) == 120


def test_safe_stem_keeps_a_leading_dash_which_can_look_like_a_cli_flag():
    """現況記錄：'-' 被保留，輸出檔名可能以 '-' 開頭。

    目前不構成漏洞（檔名只寫進 ZIP entry 與 Content-Disposition，沒有進 argv），
    但若日後有人把輸出檔名傳給 subprocess，這裡就是隱患。
    """
    assert safe_stem("-rf.png") == "-rf"


# --------------------------------------------------- ZIP entry 名稱（實際輸出驗證）


def test_batch_zip_entries_contain_no_traversal_sequences():
    jobs = [
        ImageJob("../../etc/passwd.png", make_image(fmt="PNG")),
        ImageJob("..\\..\\win.ini.png", make_image(fmt="PNG")),
        ImageJob("報表.png", make_image(fmt="PNG")),
    ]
    zip_bytes, manifest = compress_batch(jobs, output_format="png")

    with zipfile.ZipFile(io.BytesIO(zip_bytes)) as zf:
        names = zf.namelist()

    assert len(names) == 4  # 3 張圖 + manifest CSV
    for name in names:
        assert not name.startswith("/")
        assert ".." not in name.split("/")[0]
        assert "\\" not in name
        assert "/" not in name.replace("compression-manifest.csv", "")
    assert "passwd.png" in names
    assert "報表.png" in names
    assert all(item["output"] in names for item in manifest)


def test_batch_deduplicates_colliding_output_names():
    """三個不同惡意檔名清洗後會撞名，必須各自留一份而不是互相覆蓋。"""
    jobs = [
        ImageJob("../../a.png", make_image(fmt="PNG")),
        ImageJob("..\\..\\a.png", make_image(fmt="PNG")),
        ImageJob("sub/dir/a.png", make_image(fmt="PNG")),
    ]
    zip_bytes, manifest = compress_batch(jobs, output_format="png")
    with zipfile.ZipFile(io.BytesIO(zip_bytes)) as zf:
        names = [n for n in zf.namelist() if n != "compression-manifest.csv"]

    assert len(names) == 3
    assert len(set(names)) == 3
    assert names[0] == "a.png"
    assert [item["output"] for item in manifest] == names


def test_batch_manifest_csv_is_written_and_utf8_bom_encoded():
    jobs = [ImageJob("報表.png", make_image(fmt="PNG"))]
    zip_bytes, _ = compress_batch(jobs, output_format="png")
    with zipfile.ZipFile(io.BytesIO(zip_bytes)) as zf:
        raw = zf.read("compression-manifest.csv")
    assert raw.startswith(b"\xef\xbb\xbf")  # Excel 需要 BOM 才不會亂碼
    assert "報表.png" in raw.decode("utf-8-sig")
