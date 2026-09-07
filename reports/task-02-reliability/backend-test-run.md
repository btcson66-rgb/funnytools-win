# 後端單元測試：建置與實際執行結果

> **狀態更新（2026-09-06，同日）**：本報告記錄的是**稽核階段**的測試建置與執行結果
> （319 passed / 2 skipped，321 個測試）。之後兩個 P0 已修正，測試套件也隨之更新為
> **331 passed / 2 skipped / 0 failed（333 個測試）**——修正後的完整輸出、缺口測試
> 如何轉成回歸保護，見 `backend-p0-fixes.md` §5。
> 本報告以下內容保留稽核當下的原始記述，未回填修正後的數字。
> §4「因環境限制沒有驗證到的部分」與 §5「任務書假設不符之處」在修正後**仍然全部成立**。

- 日期：2026-09-06
- 新增內容：`backend/tests/`（1 個 conftest + 9 個測試檔）、`backend/pytest.ini`
- **未修改任何既有後端程式碼**，也未修改 `src/`、`tests/`、`.github/`

---

## 1. 執行環境

| 項目 | 本機（稽核容器） | production（`backend/Dockerfile`） | 差異影響 |
|------|-----------------|-----------------------------------|---------|
| Python | **3.11.15** | **3.12-slim**（`Dockerfile:1`） | 本報告的結論都是語言層通用行為，但**未在 3.12 上覆核** |
| tesseract | ❌ 未安裝 | ✅ `tesseract-ocr` + `-eng` + `-chi-tra`（`Dockerfile:8-10`） | OCR 路徑本機無法執行，見 §4 |
| ghostscript | ❌ 未安裝 | ❌ 未安裝 | **不需要**——見 §5 的任務書修正 |
| 依賴 | `backend/requirements-test.txt` 全數安裝成功 | `requirements.txt` | — |
| 對外網路 | `funnytools.win` / `api.funnytools.win` **被封鎖** | — | **本次未對線上服務發出任何請求** |

依賴安裝（`pip install -r requirements-test.txt`，exit 0）實際裝到的版本：
```
Pillow-12.3.0 ezdxf-1.4.4 fastapi-0.128.2 httpx-0.28.1 numpy-2.3.5
opencv-python-headless-4.13.0.92 openpyxl-3.1.5 pdfminer.six-20251230
pdfplumber-0.11.9 pypdf-5.9.0 pypdfium2-5.8.0 pytest-9.0.2
python-docx-1.2.0 python-multipart-0.0.29 reportlab-4.4.9
starlette-0.50.0 pydantic-2.13.5 uvicorn-0.48.0
```
`requirements.txt` 鎖版的 12 個直接依賴全部裝到指定版本；`starlette` / `pydantic` 等傳遞依賴未鎖版（見安全稽核 S-19）。

---

## 2. 執行指令

```bash
cd backend
python -m venv .venv
.venv/bin/pip install -r requirements-test.txt
.venv/bin/python -m pytest
```

`backend/pytest.ini` 已設好 `pythonpath = .`（`app.py` 用的是 `from services.common import ...`，需要把 `backend/` 本身放進 `sys.path`），因此不需要額外的環境變數。`tests/conftest.py` 另外做了一次 `sys.path` 插入，讓 `pytest tests/xxx.py` 從其他工作目錄呼叫也能運作。

常用變體：
```bash
.venv/bin/python -m pytest -m "not slow"     # 跳過 2 個各數秒的渲染測試
.venv/bin/python -m pytest -v --durations=10 # 逐項列出 + 耗時排行
```

---

## 3. 實際執行輸出

### 3.1 完整執行（原樣貼上）

```
============================= test session starts ==============================
platform linux -- Python 3.11.15, pytest-9.0.2, pluggy-1.6.0
rootdir: /home/user/funnytools-win/backend
configfile: pytest.ini
testpaths: tests
plugins: anyio-4.15.1
collected 321 items

........................................................................ [ 25%]
........................................................................ [ 51%]
........................................................................ [ 77%]
...ss..........................................................          [100%]

=============================== warnings summary ===============================
starlette/testclient.py:45
  DeprecationWarning: The anyio.abc.BlockingPortal alias is deprecated,
  use anyio.from_thread.BlockingPortal instead.

============================= slowest 10 durations =============================
5.47s call     tests/test_resource_boundaries.py::test_a_tiny_pdf_actually_renders_past_the_pixel_cap
1.62s call     tests/test_resource_boundaries.py::test_ocr_auto_mode_reaches_the_render_before_checking_for_tesseract
1.10s call     tests/test_resource_boundaries.py::test_export_tables_row_count_is_unbounded_known_gap
0.33s call     tests/test_resource_boundaries.py::test_upload_limit_is_enforced_only_after_the_body_is_fully_received_known_gap
0.21s call     tests/test_common_limits.py::test_ensure_batch_under_limit_rejects_a_single_oversized_member
0.08s call     tests/test_api_validation.py::test_batch_endpoint_rejects_more_than_100_files
0.06s call     tests/test_api_validation.py::test_image_endpoints_validate_content_not_the_declared_mime
0.04s call     tests/test_common_limits.py::test_ensure_batch_under_limit_rejects_total_over_batch_cap
0.03s call     tests/test_pdf_word_and_compress.py::test_pdf_to_docx_counts_every_page
0.03s call     tests/test_pdf_word_and_compress.py::test_pdf_to_docx_escapes_control_characters_into_valid_xml

=========================== short test summary info ============================
SKIPPED [1] tests/test_pdf_word_and_compress.py:119: 系統未安裝 tesseract；OCR 路徑無法在本機驗證（production Dockerfile 有安裝）
SKIPPED [1] tests/test_pdf_word_and_compress.py:127: 系統未安裝 tesseract；OCR 路徑無法在本機驗證（production Dockerfile 有安裝）

================== 319 passed, 2 skipped, 1 warning in 10.03s ==================
```

**結果：321 個測試，319 通過、2 skip、0 失敗、0 error。**

唯一的 warning 來自 starlette 自己的 TestClient 對 anyio 的 deprecated alias，與本專案程式碼無關。

### 3.2 各檔案測試數

| 測試檔 | 測試數 | 涵蓋範圍 |
|--------|-------|---------|
| `tests/test_api_validation.py` | 70 | FastAPI 層：CORS、400/422 形狀、內容型別驗證、參數 allowlist、錯誤訊息不外洩、`/openapi.json` 暴露面 |
| `tests/test_image_dxf_service.py` | 42 | DXF：units/epsilon/min_area/threshold 邊界、比例尺與校準推導、DXF 可被 ezdxf 解析 |
| `tests/test_images_service.py` | 39 | 格式挑選、resize 驗證、pixel bomb、批次 100 張／總量上限、ZIP 完整性 |
| `tests/test_common_limits.py` | 37 | `ensure_under_limit`、`ensure_batch_under_limit`、`ensure_image_dimensions`、`validate_ocr_lang`、`open_pdf_reader` |
| `tests/test_pdf_table_service.py` | 36 | 座標推欄邏輯（`_cluster_rows` / `_table_from_words`）、XLSX 輸出、頁碼範圍 |
| `tests/test_pdf_word_and_compress.py` | 32（2 skip） | 行分組、DOCX OOXML 完整性、compress preset、壓縮不變大／頁數不變 |
| `tests/test_safe_stem.py` | 23 | path traversal、Unicode 檔名、超長截斷、ZIP entry 名稱、撞名處理 |
| `tests/test_parse_pages.py` | 22 | 頁碼字串解析邊界（含 Unicode 數字） |
| `tests/test_resource_boundaries.py` | 20 | 上傳串流上限、body 收下時機、pixel bomb、逾時、事件迴圈阻塞、暫存檔清理 |
| **合計** | **321** | |

### 3.3 素材來源

**全部合成，沒有引入任何外部檔案**（`tests/conftest.py`）：
- PDF：`reportlab.pdfgen.canvas`（`make_pdf()` 可指定頁面尺寸與頁數，`make_table_pdf()` 產生欄位對齊的三欄文字）
- 圖片：`PIL.Image` + `ImageDraw`（`make_image()` 可指定尺寸、格式、色彩模式）
- 上傳串流：`FakeUpload`（最小的 `UploadFile` 替身）

所有 API 呼叫都走 `fastapi.testclient.TestClient` 的 in-process ASGI 呼叫，**不會產生任何對外網路流量**。

---

## 4. 因環境限制沒有驗證到的部分

### 4.1 明確 skip（2 個，不假裝通過）

```
SKIPPED tests/test_pdf_word_and_compress.py:119
  test_pdf_to_docx_force_ocr_end_to_end
SKIPPED tests/test_pdf_word_and_compress.py:127
  test_pdf_to_docx_enforces_the_ocr_page_cap
理由：系統未安裝 tesseract；OCR 路徑無法在本機驗證（production Dockerfile 有安裝）
```

這兩個測試帶 `@requires_tesseract`（`conftest.py:24-27`，條件是 `shutil.which("tesseract") is None`）。在裝了 tesseract 的環境（例如 production container 或 CI 加裝 `tesseract-ocr`）會自動執行，不需要改程式碼。

### 4.2 完全沒有測試涵蓋的程式碼路徑

| 路徑 | 為何沒測 |
|------|---------|
| `common.run_tesseract_png()` 的實際執行（argv 組裝、`timeout=90` 觸發、stderr 處理、tsv 輸出解析） | 需要 tesseract。**`validate_ocr_lang()` 的 allowlist 有完整測試**（那是進 subprocess 前的唯一防線），但 subprocess 本身沒有 |
| `pdf_table._ocr_words()`（OCR TSV → words 的 conf 過濾與座標換算） | 需要 tesseract |
| `pdf_table.extract_tables()` 的 `needs_ocr` 分支與 `MAX_OCR_PAGES` 上限 | 需要 tesseract |
| `pdf_word.pdf_to_docx()` 的 OCR 分支（`pdf_word.py:138-147`） | 需要 tesseract |
| 繁中 OCR（`chi_tra`）的實際辨識結果 | 需要 tesseract + `tesseract-ocr-chi-tra` 語言包 |
| `pdf_word._add_page_images()`（把 PDF 內嵌圖片放進 DOCX） | reportlab 合成的 PDF 不含內嵌圖片；要測需要更複雜的素材，本次未做 |
| `pdf_compress._replace_images()` 的實際影像重壓（`replaced` / `skipped_alpha` 計數） | 同上，合成 PDF 沒有夠大的內嵌圖片（`min_image_bytes` 門檻 50~80KB） |
| `common.pdf_has_signature()` 的 True 分支 | 需要一份有數位簽章的 PDF，reportlab 無法直接產生 |
| `open_pdf_reader()` 的 `is_encrypted` 分支 | 未合成加密 PDF；程式碼路徑已讀過確認正確，但**未執行驗證** |

### 4.3 環境層面無法驗證的事

- **production 後端目前是否存活**——網路封鎖，只能引用 GitHub Actions 的歷史 log（見 `backend-endpoint-map.md` §4）
- **Python 3.12 上的行為**——本機只有 3.11.15
- **Cloudflare 是否有前置的 body size / rate limit**——設定不在 repo 內
- **S-02 的 7.7GB 渲染是否真的會 OOM**——刻意**沒有實際執行**（會直接打死稽核容器）。已驗證的是「1.3KB 的 PDF 可以宣告 14400×14400pt 的頁面」與「2000pt 頁面確實渲染成 3735 萬像素且沒有守門」；44000×44000 是由**實測到的** pdfium 頁面尺寸 × `pdf_render.py:9` 寫死的 dpi=220 算出來的
- **實際併發下 production 的表現**——依規定未對 production 做任何壓力測試；S-01 的 3595 倍劣化數字來自本機 uvicorn（127.0.0.1:8899）

---

## 5. 任務書假設與程式碼實況不符之處

| 任務書假設 | 實況 | 證據 |
|-----------|------|------|
| 「subprocess 呼叫如 ghostscript/tesseract」 | **後端完全沒有用 ghostscript**。全 `backend/` 只有**一處** subprocess，就是 `common.py:86` 的 tesseract。PDF 壓縮走的是純 Python 的 pypdf + Pillow（`services/pdf_compress.py`），不呼叫任何外部二進位檔 | `grep -rn "subprocess\|ghostscript\|gs \|qpdf" backend/` 只命中 `common.py` 的 6 行 + 一個 `PRESETS[preset]` 的誤命中 |
| 「`FUNNYTOOLS_ALLOWED_ORIGINS` 預設值只有 localhost」 | **預設值已包含 production 網域**：`https://funnytools.win,https://www.funnytools.win,http://localhost:3000,http://localhost:5173`。所以 production 沒設這個環境變數也**不會**壞掉 | `app.py:20-28`；實測 `ALLOWED_ORIGINS` 印出四筆。詳見安全稽核 S-13 |
| 「找出沒有被 smoke 涵蓋的端點」 | **8 個 route 全部都被 smoke 打到至少一次，沒有完全未涵蓋的端點**。真正的缺口在參數層級（OCR 路徑全部沒測、DXF 校準沒測）與 profile 縮減 | 詳見 `backend-endpoint-map.md` §3 |
| 「`backend/requirements-test.txt` 已備好 pytest 9 / httpx / reportlab」 | ✅ 正確，且三者都能正常安裝運作 | — |

---

## 6. 測試設計原則說明

### 6.1 「已知缺口」測試（17 個，函式名以 `_known_gap` 結尾）

稽核發現的問題**沒有**寫成失敗的測試，也**沒有**用 `xfail` 遮蔽。做法是：**斷言目前的實際行為**，並在 docstring 說明這是缺口、為什麼是缺口、修好之後這個測試會變紅需要同步更新。

理由：
- 測試套件必須是全綠的，否則 CI 沒有訊號價值
- 但缺口必須被記錄在可執行的地方，而不是只寫在報告裡
- 修復時測試變紅，正好成為「這裡被改動了」的提醒

分布：`test_resource_boundaries.py` 8 個、`test_pdf_table_service.py` 4 個、`test_parse_pages.py` 3 個、`test_api_validation.py` 2 個。

### 6.2 沒有為了測試而改 production 行為

- 需要調整上限的測試一律用 `monkeypatch.setattr(common, "MAX_XXX", ...)`，不改原始碼、不依賴環境變數
- 上限值本身另外用獨立測試釘住（例如 `test_default_single_limit_matches_documented_80mb`），避免 monkeypatch 掩蓋了預設值被改動
- 錯誤路徑一律用真實的 HTTP 請求（TestClient）驗證，而不是直接呼叫內部函式後假設 HTTP 對應

### 6.3 測試過程中被自己的測試修正的三個誤判

誠實記錄，避免報告看起來比實際更「一次到位」：

1. `safe_stem("$(whoami).png")` 我原本預期 `_whoami`，實際是 `whoami`——前後的 `_` 會被 `.strip("._")` 去掉。已修正斷言。
2. 阿拉伯-印度數字 `١٢٣` 我原本放在「應被拒絕」清單，實際會被接受（`isdigit()` 為 True 且 `int()` 吃得下）。已移到「Unicode 數字被接受」的現況記錄測試。
3. DOCX 的 `word/document.xml` 裡不會有連續的 `"Hello world"`——`_add_editable_text` 是「一個字一個 `<w:t>` run」。已改成逐字斷言。（production smoke 用 `/Widget[\s\S]*A/` 這種寬鬆正則，正是為了處理同一件事。）

第 1、3 點是我的預期錯誤；第 2 點則順帶記錄了一個真實的輸入正規化現況。
