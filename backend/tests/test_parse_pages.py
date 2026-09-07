"""app._parse_pages() — 頁碼字串解析（1-based 輸入轉 0-based 索引）。"""

from __future__ import annotations

import pytest

from app import _parse_pages


def test_none_and_empty_mean_all_pages():
    assert _parse_pages(None) is None
    assert _parse_pages("") is None


def test_converts_one_based_input_to_zero_based_indices():
    assert _parse_pages("1") == [0]
    assert _parse_pages("1,2,3") == [0, 1, 2]


def test_tolerates_surrounding_whitespace():
    assert _parse_pages(" 1 , 2 ") == [0, 1]


def test_preserves_input_order_and_duplicates():
    """現況記錄：這裡不排序也不去重，去重是 extract_tables 的責任。"""
    assert _parse_pages("3,1,3") == [2, 0, 2]


@pytest.mark.parametrize(
    "value",
    ["abc", "1,,3", "-1", "1.5", "1-3", "1;2", "+1", " ", ",", "1,", "0x1", "\u2160"],
)
def test_rejects_malformed_tokens_with_a_stable_message(value):
    with pytest.raises(ValueError, match="comma-separated positive page numbers"):
        _parse_pages(value)


def test_rejects_page_zero_with_the_one_based_message():
    with pytest.raises(ValueError, match="1-based and must be >= 1"):
        _parse_pages("0")


def test_error_messages_never_leak_a_server_path():
    for value in ["abc", "0", "1,,3"]:
        with pytest.raises(ValueError) as excinfo:
            _parse_pages(value)
        assert "/" not in str(excinfo.value)
        assert "backend" not in str(excinfo.value)


def test_accepts_fullwidth_digits_because_isdigit_is_unicode_aware():
    """現況記錄：全形數字被接受（str.isdigit() 對全形回 True，int() 也吃得下）。

    不算漏洞，但代表輸入正規化不是純 ASCII，寫在這裡避免日後有人誤以為只收 [0-9]。
    """
    assert _parse_pages("１") == [0]
    assert _parse_pages("１,２") == [0, 1]
    assert _parse_pages("١٢٣") == [122]  # 阿拉伯-印度數字 123


def test_superscript_digit_leaks_a_python_internal_message_known_gap():
    """已知缺口（低風險）：'²'.isdigit() 為 True 但 int('²') 會炸。

    守門的 isdigit() 放行後，int() 丟出的原生 ValueError 會被 app 的
    except 直接轉成 400 + str(exc)，client 看到的是
    "invalid literal for int() with base 10: '²'"，而不是預期的驗證訊息。
    這個測試鎖住「目前的實際行為」，修好之後這裡會紅，提醒同步更新。
    """
    with pytest.raises(ValueError) as excinfo:
        _parse_pages("²")
    message = str(excinfo.value)
    assert "invalid literal for int()" in message
    assert "comma-separated positive page numbers" not in message


def test_no_upper_bound_on_the_page_number_itself_known_gap():
    """現況記錄：單一頁碼沒有上限，超大數字會一路帶到 extract_tables 才被擋。

    前端 parsePageSelection() 有 200 頁上限，但後端沒有對應防線，
    直接打 API 的人不受前端限制。
    """
    assert _parse_pages("999999999999999999999") == [999999999999999999998]


def test_no_cap_on_how_many_page_tokens_are_accepted_known_gap():
    """現況記錄：token 數量無上限；唯一的實際限制是 starlette 對非檔案 part 的 1MB 上限。"""
    parsed = _parse_pages(",".join(["1"] * 50_000))
    assert len(parsed) == 50_000
