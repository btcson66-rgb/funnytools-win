# 後端安全與資源邊界稽核

- 稽核日期：2026-09-06
- 稽核對象：`backend/app.py`、`backend/services/*.py`、`backend/Dockerfile`、`backend/requirements.txt`
- 稽核方式：**讀碼 + 本機實測**。稽核容器對外封鎖 `funnytools.win` / `api.funnytools.win`，**本次未對 production 做任何請求，更沒有做任何壓力測試**。所有「實測」都是在本機以合成資料執行（Python 3.11.15 + `requirements-test.txt`）。
- 本機與 production 的差異：本機 Python **3.11.15**，`Dockerfile:1` 用 **3.12-slim**。本報告中的行為結論皆為語言層通用行為，不涉及 3.11/3.12 差異；但本機**沒有 tesseract**，OCR 的實際執行行為無法驗證（見 S-04、S-14）。

## 風險評級定義

| 級別 | 定義 |
|------|------|
| **P0** | 單一低成本請求即可讓服務對所有使用者失去回應，或造成資料/資產損失 |
| **P1** | 需要少量請求或特定條件，即可顯著劣化服務或耗盡資源 |
| **P2** | 資訊揭露、錯誤處理不一致、可維護性風險；不會直接打掛服務 |
| **OK** | 檢查過且防護足夠，記錄下來避免日後重複稽核 |

## 總表

> **狀態更新（2026-09-06，同日）**：S-01 與 S-02 兩個 P0 **已修正**，詳見
> `backend-p0-fixes.md`（含前後量測與新的 503 失敗語意）。本報告以下內容保留
> **稽核當下（修正前）** 的原始記述，作為問題的完整證據紀錄；已修正的兩項在標題
> 上另標註 ✅。其餘 P1／P2 **全部未修**，敘述仍然成立。

| 編號 | 項目 | 評級 |
|------|------|------|
| S-01 | 重運算在 `async def` 內同步執行，阻塞事件迴圈 | **P0** ✅ 已修 |
| S-02 | PDF→PNG 渲染路徑沒有任何尺寸上限（pixel bomb） | **P0** ✅ 已修 |
| S-03 | 上傳大小上限在 body 完全收下之後才檢查 | **P1** |
| S-04 | 單一請求沒有總逾時上限（最壞 45 分鐘） | **P1** |
| S-05 | `/api/pdf/export-tables` 的列數／body 大小無上限 | **P1** |
| S-06 | 批次記憶體上限設計（80MB 單檔 / 120MB 批次 × 2 worker） | **P1** |
| S-07 | 上傳大小上限本身（單檔 / 批次 / 檔數） | **OK** |
| S-08 | MIME / 檔案型別驗證（看內容而非副檔名） | **OK** |
| S-09 | Path traversal（`safe_stem()`、ZIP entry、輸出檔名） | **OK** |
| S-10 | 暫存檔清理 | **OK** |
| S-11 | `/openapi.json` 在 docs 關閉時仍公開 | **P2** |
| S-12 | 例外訊息外洩（內部路徑／堆疊） | **P2** |
| S-13 | CORS allowlist | **P2** |
| S-14 | `subprocess.TimeoutExpired` 被回報成 500 而非 408 | **P2** |
| S-15 | 非 dict 的 table 造成 500（應為 400） | **P2** |
| S-16 | 空字串 Form 欄位靜默套用預設值，繞過 allowlist | **P2** |
| S-17 | 座標推欄 fallback 會把散文誤判為表格 | **P2** |
| S-18 | XLSX 輸出未消毒 `=` 開頭儲存格（公式注入） | **P2** |
| S-19 | 傳遞依賴未鎖版（starlette / pydantic / lxml…） | **P2** |
| S-20 | zip / docx / xlsx 輸出完整性 | **OK** |
| S-21 | OCR 語言 allowlist（進 subprocess argv 前的唯一防線） | **OK** |
| S-22 | PDF 頁數上限 / 加密 PDF / 數位簽章 | **OK** |

---

# P0

## S-01　重運算在 `async def` 內同步執行，阻塞整個 worker 的事件迴圈 ✅ 已修

> **已於 2026-09-06 修正**：7 個 handler 的同步呼叫改走 `run_in_threadpool`，
> 並加上有界併發閘（預設每 worker 2 個，滿載回 503 + `Retry-After`）。
> 修正後 `/health` 在重負載下的最差延遲從 **17,324.7 ms 降到 33.3 ms（520 倍）**。
> 完整實作、量測與新的 503 語意見 `backend-p0-fixes.md`。以下為修正前的原始記述。

**現況（修正前）**
`app.py` 的 6 個轉檔 handler 全部宣告為 `async def`，卻在裡面直接呼叫同步、CPU-bound 的函式，沒有 `run_in_threadpool` / `asyncio.to_thread` / `run_in_executor`：

- `app.py:99` `async def api_compress_batch` → `app.py:108` `compress_batch(...)`（PIL 解碼＋編碼，最多 100 張）
- `app.py:133` `async def api_pdf_to_word` → `app.py:141` `pdf_to_docx(...)`（pdfplumber ＋ pdfium 渲染 ＋ tesseract）
- `app.py:178` `async def api_table_preview` → `app.py:186` `extract_tables(...)`
- `app.py:199` `async def api_table_to_excel` → `app.py:207` `pdf_tables_to_xlsx(...)`
- `app.py:245` `async def api_image_to_dxf` → `app.py:259` `image_to_dxf(...)`（OpenCV）
- `app.py:285` `async def api_pdf_compress` → `app.py:291` `compress_pdf(...)`

FastAPI 的規則是：宣告成 `def` 的 handler 會被丟到 threadpool，宣告成 `async def` 的則**直接在事件迴圈上跑**。這裡全部選了 `async def`，等於把 CPU-bound 工作放在事件迴圈上。
`Dockerfile:33` 只開 `--workers 2`。

**實測證據（本機 uvicorn，127.0.0.1:8899，`--workers 1`）**

```
/health latency while IDLE:                              1.0 ms
/health latency while ONE heavy request is in flight: 3583.2 ms
  -> slowdown factor: 3595x
heavy request payload size: 1300 bytes
```

一個 **1,300 bytes** 的上傳，就讓同一 worker 上的 `/health` 卡了 **3.58 秒**（3595 倍劣化）。

**風險：P0**
- 只要 2 個併發的重請求，就能讓 production 的兩個 worker 同時卡死，**整個 API（含 `/health`）對所有使用者失去回應**。這不需要惡意攻擊——兩個使用者同時轉一份大 PDF 就會發生。
- `Dockerfile:30-31` 的 `HEALTHCHECK` 用 `timeout=5s`、`retries=3`。事件迴圈被卡住超過 15 秒，容器會被判定 unhealthy 並可能被重啟——重啟又會中斷當下所有轉檔請求，形成迴圈。
- 這與 `backend-endpoint-map.md` §4 記錄的 smoke 失敗（連續 24 次 `/health` 回 502/530）**症狀完全相容**。相關不等於因果，需在能連上 production 的環境確認。

**建議修法（未實作，屬於行為變更，超出本次稽核授權）**
把 6 個 handler 從 `async def` 改成 `def`（FastAPI 會自動送進 threadpool），或保留 `async def` 但用 `await run_in_threadpool(...)` 包住 service 呼叫。同時把 `--workers` 提高並在前面加請求排隊/併發上限。

**測試**：`tests/test_resource_boundaries.py::test_all_heavy_handlers_are_async_def_calling_blocking_code_known_gap`

---

## S-02　PDF→PNG 渲染路徑沒有任何尺寸上限（pixel bomb）✅ 已修

> **已於 2026-09-06 修正**：`pdf_render.py` 在 `page.render()` 之前套用既有的
> `ensure_image_dimensions`（沿用 `MAX_IMAGE_PIXELS`，數值未動）。原本會渲染
> 3,735 萬像素的 1.3KB 測試檔，現在 **0.08 秒回 400**。
> 附帶處理：pdfium 不是 thread-safe，已加鎖序列化。見 `backend-p0-fixes.md`。
> ⚠️ 行為改變：超過約 22×22 英吋的頁面在 OCR 路徑下現在會被拒絕。
> 以下為修正前的原始記述。

**現況（修正前）**
圖片端點都有守門：
- `services/images.py:60` → `ensure_image_dimensions(opened.width, opened.height)`
- `services/image_dxf.py:56` → `ensure_image_dimensions(...)`

上限是 `services/common.py:15` 的 `MAX_IMAGE_PIXELS = 25,000,000`。

但 **`services/pdf_render.py` 從頭到尾沒有呼叫 `ensure_image_dimensions`**（全檔只有 19 行）。`pdf_render.py:9` 寫死 `dpi: int = 220`，`pdf_render.py:13` 直接 `page.render(scale=dpi/72.0)`，PDF 頁面多大就渲染多大。

這條路徑的兩個入口：
- `services/pdf_word.py:141`　`png = render_pdf_page_png(pdf_bytes, i, dpi=220)`
- `services/pdf_table.py:107`　`png = render_pdf_page_png(pdf_bytes, page_index, dpi=250)`

**實測證據（本機）**

```
huge-MediaBox PDF file size: 1329 bytes
page size (pt): 14400.0 14400.0
render at dpi=220 -> 44000 x 44000 = 1936000000 pixels
BGRA bitmap bytes ~ 7.744 GB
MAX_IMAGE_PIXELS = 25000000 | ratio pdf-render/limit = 77.44
pdf_render.py mentions ensure_image_dimensions: False
```

實際跑一個「大但安全」的尺寸驗證守門確實不存在（**沒有實際執行 7.7GB 的渲染，那會直接打死稽核容器**；44000×44000 是由實測到的 pdfium 頁面尺寸 × 寫死的 dpi=220 算出來的，不是估算填充）：

```
2000x2000pt page rendered WITHOUT any dimension check -> (6112, 6112)
= 37356544 px; over MAX_IMAGE_PIXELS? True ; png bytes: 123522
; render seconds: 3.30 ; source PDF bytes: 1327
```

**1,327 bytes 的上傳 → 3,735 萬像素的渲染**，是圖片端點上限的 1.5 倍，完全沒有被擋。

**觸發門檻極低——不需要 `ocr_mode=force`**
`services/pdf_word.py:136`：
```python
use_ocr = ocr_mode == "force" or (ocr_mode == "auto" and len(extracted) < 20)
```
`ocr_mode` 預設就是 `"auto"`（`app.py:135`）。空白頁或掃描頁抽不到文字 → 自動走 OCR → 先渲染。而且 `pdf_word.py:141` 的渲染發生在 `pdf_word.py:142` 呼叫 tesseract **之前**，所以就算系統沒有 tesseract，昂貴的渲染也已經做完了。

實測（TestClient，本機無 tesseract，兩者最後都 500）：
```
page 200x200pt,   upload 1298B -> HTTP 500 in 0.16s
page 2000x2000pt, upload 1300B -> HTTP 500 in 7.53s
```
上傳大小幾乎相同，耗時差 47 倍，差異全部來自沒有守門的渲染。

**風險：P0**
- 一個 1.3KB 的 PDF 可以要求後端配置約 7.7GB 的點陣圖 → OOM → container 被 kill → 全站 5 個工具同時掛掉。
- `MAX_PDF_PAGES = 200`、`MAX_OCR_PAGES = 30`，所以同一份檔案還能重複 30 次。
- **掃描 PDF 正是這兩個工具的主力使用情境**，不是邊緣案例。

**建議修法（未實作）**
在 `render_pdf_page_png` 內先讀 `page.get_width()/get_height()`，算出目標像素數後呼叫 `ensure_image_dimensions`，超限就降 dpi 或直接回 400。

**測試**：
- `test_pdf_render_path_has_no_dimension_guard_known_gap`
- `test_a_tiny_pdf_can_declare_a_page_that_renders_far_over_the_pixel_cap`
- `test_a_tiny_pdf_actually_renders_past_the_pixel_cap`（`slow` 標記）
- `test_ocr_auto_mode_reaches_the_render_before_checking_for_tesseract`（`slow` 標記）

---

# P1

## S-03　上傳大小上限在整個 body 收下之後才生效

**現況**
`app.py:58-73` 的 `_read_upload_limited()` 是**串流式**檢查（每 1MB chunk 累加後比對），寫得很正確。但它在 **handler 內**才被呼叫（`app.py:107/140/185/206/258/290`），而此時 starlette 早就把整個 multipart body 解析完了。

starlette 0.50.0 `formparsers.py` 的實際行為（已讀原始碼確認）：
- `formparsers.py:160-167` `on_part_data`：`max_part_size`（1MB）**只套用在非檔案 part**（`if self._current_part.file is None`）
- 檔案 part 走 `formparsers.py:209` `SpooledTemporaryFile(max_size=self.spool_max_size)`，`spool_max_size = 1MB` → 超過 1MB 就**寫進磁碟**，且**沒有任何大小上限**
- `fastapi/routing.py:295` 呼叫 `await request.form()`，**沒有傳任何自訂上限**，所以吃 starlette 預設 `max_files=1000` / `max_fields=1000`

**實測證據**
```
5 MB junk part -> HTTP 400 in 0.38s : {"detail":"The uploaded file is not a readable PDF"}
   (400「不是可讀的 PDF」證明整份 5MB 確實被收下並交給了 handler)
~1.4MB 'pages' 欄位 -> HTTP 400 : {"detail":"Part exceeded maximum size of 1024KB."}
   (對照組：非檔案欄位確實有 1MB 上限)
```

**風險：P1**
- 攻擊者送任意大小的 multipart body（例如 10GB），會在 app 的 80MB 檢查跑到之前就被完整寫入容器暫存檔案系統 → 磁碟耗盡。
- 批次端點的「最多 100 張」（`app.py:79-80`）也是事後檢查：第 101～1000 個檔案仍會先被完整落地，才回 400。
- Cloudflare 免費方案有 100MB request 上限，可能吸收掉一部分——但 repo 內看不到 `api.funnytools.win` 的 Cloudflare 設定，**本容器無法驗證，不做假設**。

**建議修法（未實作）**
在 ASGI middleware 層檢查 `Content-Length`，超過上限直接 413；並在反向代理（Cloudflare / 前置 nginx）設 `client_max_body_size`。

**測試**：`test_upload_limit_is_enforced_only_after_the_body_is_fully_received_known_gap`、`test_non_file_form_fields_are_capped_at_1mb_by_starlette`、`test_file_part_count_ceiling_belongs_to_starlette_not_the_app_known_gap`

---

## S-04　單一請求沒有總逾時上限

**現況**
整條處理鏈上**唯一**的逾時是 `services/common.py:91` 的 `timeout=90`（tesseract subprocess）。
- `pdf_render.py` 沒有逾時（已 grep 確認全檔沒有 `timeout`）
- pdfplumber / pypdf / Pillow / OpenCV 呼叫都沒有逾時
- uvicorn 沒有設定請求層級的逾時（`Dockerfile:33` 只有 `--workers 2`）

最壞情況：`MAX_OCR_PAGES = 30`（`common.py:17`）× 90 秒 = **2,700 秒（45 分鐘）**，而且這還不含每頁的渲染時間。`pdf_word.py:139-140` 的頁數上限是「做滿 30 頁才擋第 31 頁」，不是「一開始就拒絕」。

**風險：P1**
配合 S-01（事件迴圈阻塞），2 個這樣的請求就能讓 API 失去回應長達 45 分鐘。

**測試**：`test_only_the_ocr_subprocess_has_a_timeout`、`test_worst_case_ocr_wall_clock_has_no_overall_request_cap`

---

## S-05　`/api/pdf/export-tables` 的列數與 body 大小無上限

**現況**
`app.py:227-234` 只檢查了兩件事：`tables` 是 list（L231）、長度 ≤ 100（L232-233）。
- **每個 table 的 `rows` 數量沒有上限**
- **每列的欄數沒有上限**
- **整個 JSON body 沒有大小上限**（`app.py` 全檔沒有任何 `Content-Length` 檢查）

`services/pdf_table.py:222-233` 會逐格 `ws.cell(r, c, ...)` 寫入 openpyxl，再對每一欄重新掃描全部列來算欄寬。

**實測證據**
```
1 table x  1000 rows (request 0.02 MB) -> HTTP 200, 0.02 MB xlsx, 0.18s
1 table x 20000 rows (request 0.51 MB) -> HTTP 200, 0.28 MB xlsx, 1.34s
```
成本隨列數線性成長，完全沒有守門。0.5MB 的請求換到 1.34 秒的**事件迴圈阻塞**（S-01）。放大到允許的 100 個表格，就是數十 MB 的 JSON 換到數分鐘的全 worker 停擺。

**風險：P1**

**測試**：`test_export_tables_row_count_is_unbounded_known_gap`、`test_export_tables_has_no_request_body_size_limit_known_gap`

---

## S-06　批次記憶體上限的設計後果

**現況**
`app.py:70` `data = b"".join(chunks)` — 通過大小檢查後，整份檔案留在 RSS。
`app.py:76-90` `_read_batch_limited()` 會把整批（最多 120MB）全部讀進記憶體成 `list[ImageJob]`，才開始處理。

單 worker 最壞情境（僅原始 bytes，不含解碼後點陣圖）：
- 單檔端點：80MB
- 批次端點：120MB（原始）+ 逐張解碼的點陣圖（每張可達 25M px × 3~4 bytes ≈ 75~100MB）+ 輸出 ZIP buffer

× 2 worker = 至少 240MB 常駐峰值，尖峰更高。

**風險：P1**（與 S-02 的 OOM 風險疊加）。這是設計選擇而非 bug，記錄下來是為了讓容量規劃有依據——但 repo 內看不到 container 的記憶體配額設定，**無法驗證是否足夠**。

**測試**：`test_read_upload_limited_buffers_the_whole_file_in_memory_known_gap`

---

# P2

## S-11　`/openapi.json` 在 docs 關閉時仍然公開

`app.py:33-34` 把 `docs_url` / `redoc_url` 關掉了（`FUNNYTOOLS_ENABLE_DOCS=0`，`Dockerfile:27`），但 **`openapi_url` 沒有一併關掉**。

實測：
```
/docs -> 404 | /openapi.json -> 200
```

完整的端點清單、每個參數的名稱、型別、預設值都可被列舉。**評級 P2**（資訊揭露；這些端點本來就是匿名公開的，沒有洩漏憑證或使用者資料）。修法：`FastAPI(..., openapi_url=None if not enabled else "/openapi.json")`。

**測試**：`test_swagger_ui_is_disabled_by_default`、`test_openapi_schema_is_still_public_even_with_docs_disabled_known_gap`

## S-12　例外訊息外洩

`app.py:46-51` 的 `_http_error()`：
```python
if isinstance(exc, (ValueError, TypeError)):
    return HTTPException(status_code=400, detail=str(exc))   # 原樣回傳
if isinstance(exc, TimeoutError):
    return HTTPException(status_code=408, detail="Processing timed out")
return HTTPException(status_code=500, detail="Conversion failed")  # 一律遮蔽
```

**做得好的部分（OK）**：所有非 `ValueError/TypeError` 的例外（`RuntimeError`、`AttributeError`、tesseract stderr、pypdf 內部錯誤）一律變成固定字串 `"Conversion failed"`，**堆疊與內部路徑不會外流**。實測 5 個端點送壞資料，回應中皆無 `/home/`、`/app/`、`Traceback`、`site-packages`、`app.py` 等字樣。

**剩餘的 P2 問題**：`ValueError` 的訊息原樣外流，包含兩類內容：
1. **使用者自己送的檔名**（`common.py:23/25`：`f"{filename} exceeds..."`）。這是反射輸出，但前端用 `error.textContent = message` 渲染（`ConversionApiTool.astro:175`），**不是 innerHTML，沒有 XSS**。
2. **Python 內建例外的原生訊息**，例如 `"invalid literal for int() with base 10: '²'"`（見 S-14 相關的 `_parse_pages`）與 `tables_to_xlsx` 的 `int(item.get("page"))`。這揭露了實作語言與內部函式，且訊息對使用者無意義。

**測試**：`test_error_responses_never_leak_paths_or_stack_traces`、`test_internal_failures_are_masked_as_a_generic_message`、`test_error_messages_never_leak_a_server_path`

## S-13　CORS allowlist

**修正任務書假設**：任務書寫「預設值只有 localhost」，**與程式碼不符**。

`app.py:20-28` 的實際預設值（`DEFAULT_ORIGINS`）：
```
https://funnytools.win, https://www.funnytools.win,
http://localhost:3000, http://localhost:5173
```

實測 `ALLOWED_ORIGINS`：
```
['https://funnytools.win', 'https://www.funnytools.win', 'http://localhost:3000', 'http://localhost:5173']
```

所以：**`FUNNYTOOLS_ALLOWED_ORIGINS` 若在 production 沒設定，CORS 仍然可以正常運作**——production 網域已經寫死在預設值裡。這不是故障點。

實際的（較小的）問題：
- 兩個 localhost dev 來源被帶進 production allowlist。影響很低：`app.py:39` `allow_credentials=False`，API 完全匿名、沒有 session，所以「本機頁面能呼叫 API」跟「使用者自己直接 curl」風險相同。
- 沒有任何速率限制或 API key——這是設計選擇（匿名工具站），但代表 CORS 不是安全邊界，只是瀏覽器行為控制。

驗證通過的部分（OK）：非 allowlist 的 Origin（`https://evil.example`、`https://funnytools.win.evil.example`、`http://funnytools.win`、`null`）都**不會**拿到 `Access-Control-Allow-Origin`；preflight 也一併拒絕。

**評級 P2**。**依禁止事項，本次未更動任何 CORS 設定值。**

**測試**：`test_cors_*`（6 個）、`test_default_allowlist_covers_production_and_still_ships_localhost`

## S-14　`subprocess.TimeoutExpired` 被回報成 500 而非 408

`app.py:49-50` 有一個 408 分支，但實測：
```
TimeoutExpired MRO: ['TimeoutExpired', 'SubprocessError', 'Exception', 'BaseException', 'object']
issubclass(TimeoutExpired, TimeoutError): False
_http_error(TimeoutExpired) -> 500 Conversion failed
_http_error(TimeoutError)   -> 408
```

`common.py:91` 的 `timeout=90` 觸發時丟的是 `subprocess.TimeoutExpired`，**它不是 `TimeoutError` 的子類別**，所以 408 分支對唯一有逾時的路徑而言是死碼。

**影響（P2，但會污染監控）**：真正的 OCR 逾時會被記成 500。而 smoke 的 `isRetryableStatus()`（`tests/conversion-api-integration.api.mjs:30`）把所有 5xx 當成暫時性錯誤重試——逾時與真故障在監控上混在一起，讓「後端到底怎麼了」更難判斷。

**測試**：`test_subprocess_timeout_is_reported_as_500_not_408_known_gap`

## S-15　非 dict 的 table 造成 500（應為 400）

`app.py:229-234` 只驗證了 `tables` 是 list、長度 ≤ 100，沒有驗證每個元素是 dict。`pdf_table.py:215` 的 `item.get("page", 1)` 對字串會丟 `AttributeError` → 落到 generic handler → 500。

實測：
```
{'tables': ['not-a-dict']} -> 500 {"detail":"Conversion failed"}
```

**影響（P2）**：使用者的輸入錯誤被記成伺服器錯誤，會被 smoke 當成可重試的 5xx，也會虛增錯誤率。

同一組實測還發現兩個相關現況：
```
{'tables': [{'page': 'abc', 'rows': [['a']]}]} -> 400 {"detail":"invalid literal for int() with base 10: 'abc'"}   # 原生訊息外流（見 S-12）
{}                                            -> 200 <binary 4855>                                                # 空 body 回一份 "No tables" 活頁簿，而非 400
```

**測試**：`test_export_tables_maps_a_non_dict_entry_to_500_known_gap`、`test_export_tables_with_no_tables_key_returns_a_placeholder_workbook`、`test_tables_to_xlsx_raises_attribute_error_when_an_entry_is_not_a_dict_known_gap`

## S-16　空字串 Form 欄位靜默套用預設值，繞過 allowlist

FastAPI 0.128.2 `dependencies/utils.py:745-753`：`Form` 欄位收到空字串時視同「沒送」，直接套用宣告的預設值，不走驗證。

實測（含手工組 multipart，確認不是 client 端省略）：
```
preset="" -> 200，stats.preset == "balanced"
units=""  -> 200
```

**目前無害**（預設值 `balanced` / `unitless` 都是安全值），但代表 allowlist 對空字串是繞得過去的。若日後有人把某個預設值改成不安全的選項，這條路就會變成漏洞。**評級 P2**，記錄下來備查。

**測試**：`test_empty_form_value_silently_falls_back_to_the_declared_default`

## S-17　座標推欄 fallback 會把散文誤判為表格

`pdf_table.py:41-43` 的註解宣稱「ordinary prose can look like aligned columns... Real two-row bordered tables are normally caught by pdfplumber」，並以此為由只擋 2 列的情況。

但 `pdf_table.py:51` 的 `x_tolerance = max(12.0, typical_height * 0.65)`，一般 10pt 字高時就是固定 **12pt**；而 `pdf_table.py:69` 的 `min_occurrence = max(2, (len(rows) + 1) // 2)` 對 3 列只要求出現 2 列。

實測：一段完全是散文的三行文字（左緣 50/95/143、72/96/137、61/130/158），被推成了 3 欄表格：
```
[['Lorem', 'ipsum', 'dolor'], ['sit', 'amet', 'consectetur'], ['adipiscing', 'elit', 'sed']]
```

**評級 P2**（資料品質，非安全）。影響：`pdf-table-to-excel` 會對純文字 PDF 回傳假表格，使用者拿到無意義的 XLSX。此測試鎖住現況，改進後會變紅提醒同步更新。

**測試**：`test_table_from_words_false_positives_on_incidentally_aligned_prose_known_gap`

## S-18　XLSX 輸出未消毒 `=` 開頭的儲存格

`pdf_table.py:228` `ws.cell(r, c, "" if value is None else str(value))` —— 以 `=`、`+`、`-`、`@` 開頭的字串會原樣寫入。Excel 開啟時可能觸發公式注入提示。

**評級 P2**：此站的資料流是「使用者上傳自己的 PDF → 拿回自己的 XLSX」，沒有跨使用者傳遞，所以實際被利用的路徑很窄。但 `/api/pdf/export-tables` 接受任意 JSON，攻擊者可以構造一份含公式的 XLSX 給別人——這時後端就成了「乾淨來源」的背書。記錄備查。

**測試**：`test_tables_to_xlsx_writes_formula_text_verbatim_known_gap`

## S-19　傳遞依賴未鎖版

`requirements.txt` 鎖了 12 個直接依賴，但下列**執行期關鍵**的傳遞依賴沒有鎖：

```
starlette==0.50.0      <- fastapi 允許 >=0.40.0,<0.51.0（跨 11 個 minor）
pydantic==2.13.5       <- fastapi 允許 >=2.7.0
lxml==6.1.3            <- python-docx 允許 >=3.1.0
cryptography==50.0.1
anyio==4.15.1
et_xmlfile==2.0.0
```

`starlette` 正是 multipart 解析（S-03）與 CORS middleware 的實作者。今天 `docker build` 與上個月 build 出來的行為可能不同，而 `Dockerfile:16` 是 `pip install --no-cache-dir -r requirements.txt`，沒有 lock 檔。

（`pdfminer.six` 不在此列——它被 `pdfplumber==0.11.9` 自己鎖成 `==20251230`，這部分是安全的。）

**評級 P2**（可重現性 / 供應鏈）。建議產出 `requirements.lock`（`pip-compile` 或 `pip freeze`）供 Docker build 使用。

---

# OK（已驗證，防護足夠）

## S-07　上傳大小上限本身

| 端點 | 單檔上限 | 批次上限 | 檔數上限 | 證據 |
|------|---------|---------|---------|------|
| `/api/images/compress-batch` | 80MB／檔（`app.py:85` → `_read_upload_limited`） | 120MB（`app.py:81,87-88`） | 100（`app.py:79-80`），service 層再檢一次（`images.py:125-126`） | ✅ |
| `/api/pdf/to-word` | 80MB（`app.py:140`） | — | 1 | ✅ |
| `/api/pdf/table-preview` | 80MB（`app.py:185`） | — | 1 | ✅ |
| `/api/pdf/table-to-excel` | 80MB（`app.py:206`） | — | 1 | ✅ |
| `/api/image/to-dxf` | 80MB（`app.py:258`）+ service 層 `image_dxf.py:45` 再檢一次 | — | 1 | ✅ |
| `/api/pdf/compress` | 80MB（`app.py:290`）+ `common.py:100` 再檢一次 | — | 1 | ✅ |
| `/api/pdf/export-tables` | **無**（JSON body，見 S-05） | — | 100 表格 | ❌ 見 S-05 |

**7 個檔案端點全部都有套用上限**，而且多數有雙層檢查（app 層 + service 層）。邏輯本身正確：`ensure_under_limit` 用 `>` 而非 `>=`，剛好等於上限會通過；空檔在大小檢查之前先被擋。
唯一的缺陷是**生效時機**（S-03），不是缺少上限。

## S-08　MIME / 檔案型別驗證

**驗證的是內容，不是副檔名或 Content-Type**，這點做得正確：
- PDF：`common.py:102` `PdfReader(...)` 解析失敗 → `common.py:104` 回「not a readable PDF」
- 圖片：`images.py:54-59` 用 PIL 解出來的 `opened.format` 比對 `SUPPORTED_INPUT = {"JPEG","PNG","WEBP"}`
- DXF 輸入：`image_dxf.py:55-60` 同樣用 PIL

實測（副檔名與宣告的 Content-Type 都偽裝成正確值）：
```
/api/pdf/compress      + PNG 內容假裝成 a.pdf   -> 400 "The uploaded file is not a readable PDF"
/api/pdf/to-word       + PNG 內容假裝成 a.pdf   -> 400 同上
/api/pdf/table-preview + PNG 內容假裝成 a.pdf   -> 400 同上
/api/images/compress-batch + PDF 內容假裝成 a.jpg -> 400 "a.jpg is not a valid image"
/api/image/to-dxf      + PDF 內容假裝成 a.png   -> 400 "not a valid image"
GIF / BMP / TIFF 檔名改成 .jpg                   -> 400 "Unsupported image type"
```

**評級 OK**。

## S-09　Path traversal

`common.py:47-52` 的 `safe_stem()`：
```python
basename = (filename or "file").replace("\\", "/").split("/")[-1]
stem = Path(basename).stem
cleaned = "".join(c if (c.isalnum() or c in "-_.") else "_" for c in stem).strip("._")
return cleaned[:120] or "file"
```

逐項驗證：
- POSIX 與 Windows 分隔符都先正規化再取 basename → `/` 與 `\` 不可能存活
- allowlist 是 `isalnum() or c in "-_."`，其他一律換 `_`
- `.strip("._")` 讓 `..`、`.`、`....jpg`、`._.`、`__..__` 全部退回 `"file"`
- `[:120]` 截斷，避免超長檔名
- Unicode 保留（`isalnum()` 對 CJK 為 True）——`報表2026.xlsx` → `報表2026`，繁中檔名不會變亂碼

實測輸出：
```
'../../etc/passwd'                 -> 'passwd'
'..\\..\\windows\\system32\\cmd.exe' -> 'cmd'
'....jpg' / '..' / '.' / ''        -> 'file'
'a/b/../c.png'                     -> 'c'
'中文檔名.jpg'                       -> '中文檔名'
'$(whoami).png'                    -> 'whoami'
'a;rm -rf b.png'                   -> 'a_rm_-rf_b'
'a'*300 + '.jpg'                   -> 120 個 a
```

**ZIP entry 名稱**（`images.py:96,147`）唯一來源就是 `safe_stem() + ext`，所以 zip-slip 不成立。撞名處理（`images.py:142-146`）會加序號，不會互相覆蓋——實測三個不同惡意檔名清洗後撞名，三份都完整保留。

**輸出檔名不使用使用者檔名**：所有 `Content-Disposition` 都是伺服器端固定常數（`compressed-images.zip`、`converted.docx`、`pdf-tables.xlsx`、`edited-pdf-tables.xlsx`、`vectorized.dxf`、`compressed.pdf`），因此**沒有 response header injection 面**。實測送 `a\r\nX-Injected: 1.pdf` 作為檔名，回應中沒有出現 `X-Injected` header。

**評級 OK**。唯一的觀察：`-` 被保留，輸出檔名可能以 `-` 開頭。目前無害（檔名不進 argv），但若日後有人把輸出檔名傳給 subprocess，這裡就是隱患，已寫成測試備查。

## S-10　暫存檔清理

**全後端只有一處寫入磁碟**：`common.py:78-80` 的 OCR 暫存 PNG。
```python
with tempdir("funnytools-ocr-") as d:
    image_path = Path(d) / "page.png"
```
`tempdir()`（`common.py:55-56`）回傳 `tempfile.TemporaryDirectory`，`with` 保證**包含例外路徑**（含 `subprocess.TimeoutExpired`、tesseract 非零退出、`ValueError`）都會清乾淨。

其他 6 個 service 檔案全部在記憶體處理（`io.BytesIO`），沒有落地檔需要清理——已用測試對每個模組的原始碼斷言（無 `tempfile`、無裸 `open(`）。

唯一的例外是 S-03 提到的 starlette `SpooledTemporaryFile`，那不在本專案程式碼的控制範圍內，由 starlette 自己在請求結束時關閉。

**評級 OK**。

**測試**：`test_ocr_tempdir_is_created_inside_a_context_manager`、`test_tempdir_helper_returns_a_self_cleaning_directory`、`test_no_other_service_writes_to_disk`

## S-20　zip / docx / xlsx 輸出完整性

| 輸出 | 驗證方式 | 結果 |
|------|---------|------|
| 批次 ZIP | `zipfile.testzip()`（CRC 全檢）+ 每個 entry 用 PIL 重新解碼 + manifest 的 `output_bytes` 與實際長度比對 | ✅ |
| manifest CSV | UTF-8 BOM（`images.py:154` `utf-8-sig`），Excel 開繁中不亂碼 | ✅ |
| DOCX | `zipfile.testzip()`、`word/document.xml` 與 `[Content_Types].xml` 存在、XML 可被 `ElementTree` 解析 | ✅ |
| XLSX | openpyxl 可重新載入、工作表名稱 ≤ 31 字元且不重複、儲存格值正確 | ✅ |
| DXF | `ezdxf.read()` 可解析、`$INSUNITS` 正確、LWPOLYLINE 數量與 stats 一致 | ✅ |
| 壓縮後 PDF | `%PDF-` magic、頁數不變、文字仍可抽取、`saved_bytes` 算術自洽、**永不比原檔大**（`pdf_compress.py:116-121` 會退回原檔） | ✅ |

`pdf_compress.py:123-126` 還會把輸出重新讀一次並比對頁數，不一致就丟 `RuntimeError` —— 這是很好的自我驗證設計。

**評級 OK**。

## S-21　OCR 語言 allowlist

`common.py:66-72` 的 `validate_ocr_lang()` 是 `lang` 進入 tesseract argv（`common.py:81`）前的唯一防線，採 allowlist：
```python
DEFAULT_OCR_LANGS = {"eng", "chi_tra", "eng+chi_tra", "chi_tra+eng"}
```

實測拒絕：`jpn`、`eng+jpn`、`eng;rm -rf /`、`../../etc/passwd`、`eng -c tessedit_char_whitelist=x`、`ENG`（大小寫敏感）。
接受並正規化：`""` → `eng`、`None` → `eng`、`" eng "` → `eng`（strip 後仍在 allowlist）。

而且 `subprocess.run` 用的是 **list 形式的 argv**（`common.py:81-86`），`shell=False`（預設），所以就算 allowlist 被繞過也不會有 shell injection。輸出格式也是 allowlist（`common.py:82-85`：只接受 `txt` / `tsv`）。

**評級 OK**。三個 PDF 端點都在做任何昂貴工作之前就先驗證（`pdf_word.py:117`、`pdf_table.py:139`）。

## S-22　PDF 頁數上限 / 加密 PDF / 數位簽章

`common.py:99-111` 的 `open_pdf_reader()` 依序檢查：
1. `ensure_under_limit`（大小）
2. 解析失敗 → 「not a readable PDF」
3. `reader.is_encrypted` → 拒絕加密／密碼保護的 PDF（`common.py:105-106`）
4. 0 頁 → 拒絕
5. `> MAX_PDF_PAGES`（200）→ 拒絕

`pdf_compress.py:96-97` 另外會擋數位簽章的 PDF（`common.py:114-125` 的 `pdf_has_signature`），理由是重寫會讓簽章失效——這是很細心的正確處理。

**評級 OK**。

---

# 未能驗證的項目（環境限制，不做推測）

| 項目 | 原因 |
|------|------|
| production 後端目前是否存活、實際回應內容 | 稽核容器封鎖 `api.funnytools.win`（proxy 403 CONNECT） |
| OCR 路徑的實際執行行為（tesseract 呼叫、逾時觸發、繁中語言包） | 本機無 tesseract；相關測試以 `needs_tesseract` skip，**未假裝通過** |
| Python 3.12（production）與 3.11（本機）的行為差異 | 本機只有 3.11.15。本報告結論皆為語言層通用行為，但未在 3.12 上覆核 |
| Cloudflare 前面是否有 body size / rate limit / WAF 規則 | 這些設定不在 repo 內，無法讀取 |
| container 的記憶體與磁碟配額 | 部署設定不在 repo 內 |
| S-01 是否為 smoke 失敗的實際成因 | 只能說症狀相容；需在能連上 production 的環境確認 |

---

# 建議處理順序

1. ~~**P0 S-01**（事件迴圈阻塞）~~ ✅ **已修**（2026-09-06）
2. ~~**P0 S-02**（PDF 渲染 pixel bomb）~~ ✅ **已修**（2026-09-06）
3. **P1 S-03 / S-05**——在 middleware 或反向代理補 body size 上限。
4. **P1 S-04**——加請求層級總逾時。
5. P2 群組可併入下次例行維護：S-11（關 `openapi_url`）、S-14（改抓 `subprocess.TimeoutExpired`）、S-15（驗證 table 是 dict）、S-19（產 lock 檔）最便宜。

> **稽核階段**未修改任何 production 程式碼；新增內容只有 `backend/tests/`、
> `backend/pytest.ini` 與報告。
> **後續修正階段**（同日，經指示）動了 `backend/app.py`、`backend/services/pdf_render.py`
> 與 `.gitignore`，只為修 S-01 與 S-02 兩個 P0；沒有新增端點、沒有改成功路徑的回應
> 格式／header／狀態碼、沒有改任何上限數值、沒有改 CORS 設定值、沒有升級依賴、
> 沒有動 `.github/`、`src/`、`tests/`。詳見 `backend-p0-fixes.md`。
