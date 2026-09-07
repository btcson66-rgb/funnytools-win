# 後端 P0 修正：事件迴圈阻塞與 PDF 渲染像素上限

- 日期：2026-09-06
- 範圍：只修 `backend-safety-audit.md` 的 **S-01（P0-1）** 與 **S-02（P0-2）**。其餘 P1／P2 一律未動。
- 動到的檔案：`backend/app.py`、`backend/services/pdf_render.py`、`backend/tests/test_resource_boundaries.py`、`.gitignore`
- **未 commit、未 push。**

---

## 0. 一頁摘要

| | 修正前 | 修正後 |
|---|---|---|
| `/health` 最差延遲（重負載中，合法工作量） | **17,324.7 ms** | **33.3 ms** |
| 同一個 4 秒窗口內服務掉的 `/health` 數 | 182 次 | 3,817 次 |
| 1.3KB 的 pixel bomb PDF | 進 render，配置 3,735 萬像素 bitmap | **0.08 秒回 400** |
| 14400×14400pt 的 PDF（~7.7GB bitmap） | 無守門 | 配置前即拒絕 |
| 滿載時的第 3 個併發轉檔 | 排隊直到逾時 | **503 + `Retry-After: 5`** |
| 測試 | 319 passed / 2 skipped | **331 passed / 2 skipped / 0 failed** |

成功路徑的回應格式、header、狀態碼**完全未變**；既有上限的數值（80MB／120MB／2500 萬像素／200 頁／30 頁）**一個都沒動**。

---

## 1. P0-2：PDF 渲染的像素上限

### 改了什麼

`backend/services/pdf_render.py`：

```python
def target_bitmap_size(width_pt: float, height_pt: float, dpi: int) -> tuple[int, int]:
    scale = dpi / 72.0
    return math.ceil(width_pt * scale), math.ceil(height_pt * scale)
```

`render_pdf_page_png()` 內，在 `page.render()` **之前**：

```python
width_px, height_px = target_bitmap_size(page.get_width(), page.get_height(), dpi)
if width_px <= 0 or height_px <= 0:
    raise ValueError(f"PDF page {page_index + 1} has an unusable page size and cannot be converted")
try:
    ensure_image_dimensions(width_px, height_px)
except ValueError as exc:
    raise ValueError(f"PDF page {page_index + 1} is too large to convert at {dpi} DPI. {exc}") from exc
```

### 為什麼這樣做

- **沿用既有上限**：直接呼叫 `services.common.ensure_image_dimensions`，用的就是圖片端點那套 `MAX_IMAGE_PIXELS = 25,000,000`。`pdf_render.py` 內沒有任何自訂常數、沒有寫死任何門檻（有測試把關：`test_render_guard_uses_the_shared_pixel_limit_and_does_not_redefine_it`）。
- **擋在配置之前**：守門的位置必須早於 `page.render()`，否則記憶體已經吃下去了。有測試用「濾掉註解後的原始碼」比對兩者的先後位置（`test_pdf_render_path_now_guards_dimensions_before_rendering`）。
- **估算必須準**：`math.ceil` 是刻意選的——實測 pdfium 對 200／800／2000pt 三種頁面配置的 bitmap 尺寸與 `target_bitmap_size()` 的預測**完全一致**（`test_target_bitmap_size_matches_what_pdfium_actually_allocates`）。用 `int()` 會低估，守門就會漏。
- **訊息可讀且不外洩**：實際訊息是
  `PDF page 1 is too large to convert at 220 DPI. Image exceeds the 25,000,000-pixel safety limit (44000×44000 = 1,936,000,000 pixels)`
  ——含頁碼、DPI、實際尺寸、上限，但沒有任何路徑、堆疊或模組名（`test_render_rejection_message_leaks_no_internal_detail` 逐項檢查 `/home/`、`/app/`、`site-packages`、`Traceback`、`backend`、`pdf_render` 等字樣）。
- **確認轉成 4xx 而非 5xx**：`ValueError` → `_http_error()` → **400**。已用真實 HTTP 請求驗證（`test_ocr_auto_mode_now_returns_400_fast_instead_of_rendering`），不是靠推論。

### 前後行為

| 輸入 | 修正前 | 修正後 |
|------|--------|--------|
| A4（595×842pt）→ 1819×2573 = 468 萬像素 | 正常渲染 | **正常渲染，位元組完全相同** |
| 2000×2000pt → 6112×6112 = 3,735 萬像素 | 渲染成功（耗時 3.3s） | 400 `too large to convert` |
| 14400×14400pt → 44000×44000 ≈ 7.7GB | 無守門（OOM 風險） | 400，配置前拒絕 |
| 0 尺寸頁面 | 未定義 | 400 `unusable page size` |

### ⚠️ 必須讓你知道的行為改變

**超過約 22×22 英吋的頁面，在 220 DPI 下現在會被拒絕。**

換算：25,000,000 像素 ÷ (220/72)² ≈ 2,678,000 pt²，正方形頁面邊長上限約 1,636pt ≈ 22.7 英吋。

- A4／Letter／A3 等一般文件：**完全不受影響**（A3 是 842×1191pt，遠低於門檻）。
- 受影響的是大幅面圖紙（A0 海報、工程圖）走 **OCR 路徑** 的情況。這類頁面修正前會配置 300MB 以上的 bitmap。
- 這是刻意的取捨：與圖片端點（同樣拒絕 2500 萬像素以上）保持一致。**若你認為大幅面 OCR 是要保留的使用情境，替代做法是「超限時自動降 DPI」而不是拒絕**——那是行為變更，需要你拍板，我沒有自行決定。

非 OCR 路徑（一般有文字的 PDF 轉 Word／表格）**完全不經過渲染**，不受此限制影響。

### 順帶處理：pdfium 不是 thread-safe

把工作移進 threadpool 之後，同一個 worker 行程內可能有多個請求同時呼叫 pdfium。pypdfium2 的套件說明明載 **"PDFium is inherently not thread-safe"**，且整個套件內部搜不到任何 `threading`。

因此 `pdf_render.py` 加了一個模組層級的 `_PDFIUM_LOCK`，序列化所有 pdfium 呼叫。已確認全後端只有這一個檔案用到 pdfium（`test_pdfium_access_is_serialised_because_pdfium_is_not_thread_safe` 對其他 5 個 service 模組斷言不含 `pdfium`）。

**代價**：同一 worker 內的頁面渲染會序列化。pdfplumber／pypdf／Pillow／OpenCV 的工作不受影響，仍可平行。這是為了正確性必須付的成本——**這個風險是我自己的修正引入的，不修就會變成偶發的記憶體損毀，比原本的問題更難查。**

---

## 2. P0-1：把同步工作移出事件迴圈 + 有界併發閘

### 改了什麼

**(a) 7 個 handler 的同步轉檔呼叫全部改走 threadpool**（`backend/app.py`）：

```python
out, stats = await run_in_threadpool(
    compress_pdf, data, file.filename or "document.pdf", preset=preset
)
```

涵蓋 `compress_batch`、`pdf_to_docx`、`extract_tables`、`pdf_tables_to_xlsx`、`tables_to_xlsx`、`image_to_dxf`、`compress_pdf`。
`run_in_threadpool` 來自**已安裝的 starlette**（`starlette.concurrency`），未新增任何依賴。

> 註：稽核報告原本列 6 個重運算 handler（不含 `export-tables`）。這次把 `export-tables` 也一併納入——S-05 已經證明它是不折不扣的 CPU 消耗點（兩萬列 1.34 秒），沒有理由讓它留在事件迴圈上。

**(b) 有界併發閘**：

```python
MAX_CONCURRENT_JOBS = max(1, int(os.environ.get("FUNNYTOOLS_MAX_CONCURRENT_JOBS", "2")))
BUSY_RETRY_AFTER_SECONDS = os.environ.get("FUNNYTOOLS_BUSY_RETRY_AFTER", "5")

@contextmanager
def _job_slot():
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
```

每個 handler 的結構是 **`with _job_slot():` 在外、`try:` 在內**。

### 為什麼一定要有閘（不能只包 threadpool）

只用 `run_in_threadpool` 是半套：anyio 預設給 40 條執行緒，等於允許 40 個轉檔同時進行。以稽核 S-06 算過的單一任務峰值（單檔 80MB 原始 + 解碼後點陣圖，可達 200MB 以上）計算，40 × 200MB = **8GB／worker**，直接 OOM——記憶體維度反而比修正前更糟。閘的作用是把記憶體峰值變成**可計算的常數**。

### 我選的併發上限與理由

**預設 `FUNNYTOOLS_MAX_CONCURRENT_JOBS = 2`（每個 worker 行程）。**

算式：

```
總併發 = uvicorn worker 數 × 每 worker 上限
       = 2 (Dockerfile:33 --workers 2) × 2
       = 4 個同時進行的轉檔
```

記憶體上界估算（用稽核 S-06 的數字）：

| 項目 | 每個任務 | × 4 |
|------|---------|-----|
| 上傳原始 bytes（單檔上限 80MB；批次 120MB 但那是整批共用） | ~80–120 MB | — |
| 解碼後點陣圖（P0-2 修正後，單張／單頁 ≤ 2500 萬像素） | ~75–100 MB | — |
| 輸出 buffer | ~50 MB | — |
| **合計** | **~250 MB** | **~1 GB** |

選 2 的理由：
1. **保守優先**。容器的記憶體配額不在 repo 內，我無法驗證實際上限，所以取一個在小容器（1–2GB）也活得下來的值。
2. **對照組**：不設閘是 40／worker（80 總併發，8GB＋）；設 1 則完全無法平行、吞吐掉一半。2 是「有平行、記憶體仍可算」的最小值。
3. **可調**：流量成長或確認容器記憶體充足後，調環境變數即可，不需改程式碼。`max(1, ...)` 確保誤設 0 或負數不會讓服務完全停擺。
4. `/health` 不佔名額，所以閘再滿也不影響存活檢查。

### `/health` 保持輕量

`/health` **不進閘、不進 threadpool、不做任何 `await`**，維持原本的同步 `def`，回應內容一字未改。有測試把關（`test_health_is_never_gated_and_stays_synchronous_and_trivial`）。

### 一個容易踩的坑（已用測試鎖住）

`_job_slot()` 丟的是 `HTTPException`，而 `HTTPException` **也是 `Exception`**。若 `with _job_slot():` 被放進 handler 的 `try` 內，`except Exception` 會把它交給 `_http_error()`，**503 就會變成 500「Conversion failed」**。

順序必須是 `with` 在外、`try` 在內。`test_gate_is_entered_outside_the_try_so_503_is_not_masked_as_500` 對全部 7 個 handler 逐一驗證這個順序。

---

## 3. 量測：P0-1 前後對照

方法與原始稽核相同：對本機 uvicorn 送一個耗時的轉檔請求，在它進行中量 `/health` 的延遲，與閒置時比較。
兩台伺服器同時跑：**8898 = 修正前（直接從 `git show HEAD` 取出 `app.py` 與 `pdf_render.py`，已 diff 確認與 HEAD 完全相同）**，**8899 = 修正後**。兩者都是 `--workers 1`、同一個 venv、同一台機器。

### 3.1 主要證據：合法的重工作量（隔離 P0-1）

工作負載刻意選成**修正前後都完全合法**的請求，否則量到的會是 P0-2 的效果：
20 張 1400×1400 的雜訊 PNG 走 `/api/images/compress-batch`（20 < 100 張、117.8MB < 120MB、每張 196 萬像素 < 2500 萬——所有既有上限都沒踩到）。

```
=== BEFORE — 修正前（git HEAD） (http://127.0.0.1:8898) ===
workload: 20 x 1400x1400 PNG, 117.8 MB total
/health latency while IDLE (median of 10):               2.4 ms
/health latency while heavy request in flight (n=182):
    median 2.7 ms | worst 17324.7 ms
  -> median slowdown factor: 1x
heavy request: HTTP 200 in 81.30s, 117.8 MB response

=== AFTER — 修正後 (http://127.0.0.1:8899) ===
workload: 20 x 1400x1400 PNG, 117.8 MB total
/health latency while IDLE (median of 10):               0.8 ms
/health latency while heavy request in flight (n=3817):
    median 1.0 ms | worst 33.3 ms
  -> median slowdown factor: 1x
heavy request: HTTP 200 in 78.54s, 117.8 MB response
```

| 指標 | 修正前 | 修正後 | 改善 |
|------|--------|--------|------|
| `/health` **最差**延遲 | 17,324.7 ms | 33.3 ms | **520 倍** |
| 4 秒窗口內服務掉的 `/health` | 182 次 | 3,817 次 | **21 倍** |
| 重請求本身耗時 | 81.30 s | 78.54 s | 無退化 |

**為什麼要看「最差」而不是中位數**：這個工作負載有 80 秒的 wall time，其中大部分是 starlette 讀取 117MB body（`await`，會讓出事件迴圈），只有 `compress_batch` 那一段是同步 CPU。所以中位數兩邊都很漂亮，**真正致命的是那一次 17.3 秒的連續阻塞**——`Dockerfile:30-31` 的 `HEALTHCHECK` 是 `--timeout=5s --retries=3`，17.3 秒的阻塞會直接讓一次探測逾時。
「同一窗口服務掉的請求數從 182 變 3,817」是同一件事的獨立佐證：事件迴圈確實空出來了。

### 3.2 原始工作量（1,300 bytes 的 PDF）

這是最初量到「3,583 ms」的那個工作負載。改成**在重請求期間連續取樣**（原本是睡 1 秒後量一次），因為單點取樣會受落點影響——暖機後的行程重請求較快，單一取樣可能整個錯過阻塞窗口。連續取樣 3 次請求：

```
=== BEFORE — 修正前（git HEAD） ===
heavy payload size: 1300 bytes (2000x2000pt 空白頁, ocr_mode=auto 預設值)
/health latency while IDLE (median of 10): 1.0 ms
/health during 3 heavy requests (n=186):
    median 1.0 ms | worst 1019.9 ms
  -> worst-case slowdown factor: 1044x
  heavy request #1: HTTP 500 in 1.11s
  heavy request #2: HTTP 500 in 1.02s
  heavy request #3: HTTP 500 in 1.06s

=== AFTER — 修正後 ===
heavy payload size: 1300 bytes (2000x2000pt 空白頁, ocr_mode=auto 預設值)
/health latency while IDLE (median of 10): 0.9 ms
/health during 3 heavy requests (n=222):
    median 1.0 ms | worst 10.9 ms
  -> worst-case slowdown factor: 12x
  heavy request #1: HTTP 400 in 0.12s
  heavy request #2: HTTP 400 in 0.07s
  heavy request #3: HTTP 400 in 0.08s
```

- 修正前：1.3KB 的上傳讓 `/health` 最差卡 **1,019.9 ms**，每次請求燒掉 1 秒多 CPU 才回 500。
- 修正後：同一個檔案 **0.07–0.12 秒回 400**（P0-2 攔下），`/health` 最差 10.9 ms。

**誠實說明數字差異**：最初報告的是 3,583 ms，這次修正前量到 1,019.9 ms。差異來自量測條件不同——最初是冷行程（pdfium 首次載入）、單點取樣剛好落在渲染中段；這次是暖行程、連續取樣。兩次都證明同一件事（事件迴圈被阻塞到秒級），但**絕對值會隨行程暖機狀態浮動**，所以 §3.1 那個能穩定重現、且隔離掉 P0-2 的量測才是主要證據。

### 3.3 併發閘在真實 uvicorn 下的行為

6 個併發的批次壓縮請求打向修正後的伺服器（1 worker，閘 = 2）：

```
=== 併發閘行為（MAX_CONCURRENT_JOBS 預設 2 / worker，1 worker） ===
  #0: HTTP 503 in   1.16s, Retry-After=5 "The conversion service is busy. Please retry in a few seconds."
  #1: HTTP 200 in  66.53s
  #2: HTTP 503 in   1.14s, Retry-After=5 "The conversion service is busy. Please retry in a few seconds."
  #3: HTTP 503 in   1.11s, Retry-After=5 "The conversion service is busy. Please retry in a few seconds."
  #4: HTTP 200 in  66.76s
  #5: HTTP 503 in   1.15s, Retry-After=5 "The conversion service is busy. Please retry in a few seconds."

成功 2 個 / 503 快速拒絕 4 個 / 其他 0 個
503 的回應時間：max 1.16s（必須是快速拒絕，不是排隊等逾時）
/health 在滿載期間：median 5.9 ms | worst 15.5 ms（n=20，全部成功）
```

- 恰好 2 個進場（= 閘的設定值），4 個被快速拒絕。
- 503 在約 1.15 秒內回覆，**不是排隊等到逾時**。
- **完全滿載期間 `/health` 中位數 5.9 ms、最差 15.5 ms、20 次全部成功**——這正是修正的目的。

> 那 1.15 秒不是排隊：它幾乎全是「把 ~47MB 的 body 傳完」的時間。閘沒辦法在 body 收完之前就拒絕，因為 **S-03（上傳上限在 body 全部收下之後才生效）本次沒有修**。要讓 503 更早回，得先修 S-03。

---

## 4. 新的失敗語意：503（任務書 §16）

### 什麼情況會出現

**只有一種**：某個 worker 行程上已經有 `MAX_CONCURRENT_JOBS`（預設 2）個轉檔在進行中，又來了第 3 個轉檔請求。

- 影響 7 個轉檔端點，**不影響 `/health`**（永遠不進閘）。
- 與輸入內容無關——同一個請求稍後重送就會成功。
- 全機門檻 = worker 數 × 每 worker 上限 = 2 × 2 = **4 個同時轉檔**。

### 回應形狀

```
HTTP/1.1 503 Service Unavailable
Retry-After: 5
Content-Type: application/json

{"detail": "The conversion service is busy. Please retry in a few seconds."}
```

`detail` 沿用既有的錯誤形狀，所以前端 `readApiError()`（`src/lib/funnytools-api.ts:311-318`）已經會把它讀出來當錯誤訊息顯示，**不需要改前端就不會壞掉**。

### 前端該怎麼處理（建議，本次未實作——`src/` 不在允許路徑內）

1. **最小處理（現況即可運作）**：使用者會看到「The conversion service is busy. Please retry in a few seconds.」。可用但沒有在地化。
2. **建議**：在 `funnytools-api.ts` 判斷 `res.status === 503`，改顯示在地化的「伺服器忙碌中，請稍候再試」，並讀 `Retry-After` 做一次自動重試或倒數。
   ⚠️ 注意：`Retry-After` 目前**不在** CORS 的 `expose_headers` 清單內（`app.py:42` 只有 `Content-Disposition`、`X-Funnytools-Stats`），所以瀏覽器 JS **讀不到這個 header**。要讓前端讀它，得把它加進 `expose_headers`——那會改動 CORS 設定，**依邊界規定我沒有動**。目前 `Retry-After` 只對非瀏覽器 client（curl、監控、smoke）有效。

### smoke 會不會踩到

**幾乎不會，而且踩到也不會誤判成故障。**

- smoke 是**循序**執行的，同一時間只有一個請求在飛，自己不會把閘塞滿。
- 只有在 smoke 執行的當下，剛好有 4 個真實使用者的轉檔在進行中，才可能拿到 503。
- 真的踩到時：`isRetryableStatus()`（`tests/conversion-api-integration.api.mjs:30`）把 `status >= 500` 視為可重試，production profile 會重試 3 次、每次間隔 15 秒——足以讓一個轉檔做完並讓出名額。
- **readiness 輪詢完全不受影響**：它只打 `/health`，而 `/health` 永遠不進閘。

**副作用（要記在監控上）**：503 和 500 一樣被 `isRetryableStatus()` 當成 5xx。這代表「服務忙碌」和「服務故障」在 smoke 的重試邏輯裡仍然混在一起（跟稽核 S-14 是同一類問題）。若要分開，得改 `tests/conversion-api-integration.api.mjs`，而那個檔案**依邊界規定不可動**。

---

## 5. 測試

### 5.1 完整執行輸出（原樣貼上）

```
============================= test session starts ==============================
platform linux -- Python 3.11.15, pytest-9.0.2, pluggy-1.6.0
rootdir: /home/user/funnytools-win/backend
configfile: pytest.ini
testpaths: tests
plugins: anyio-4.15.1
collected 333 items

tests/test_api_validation.py ........................................... [ 12%]
...........................                                              [ 21%]
tests/test_common_limits.py .....................................        [ 32%]
tests/test_image_dxf_service.py ........................................ [ 44%]
..                                                                       [ 44%]
tests/test_images_service.py .......................................     [ 56%]
tests/test_parse_pages.py ......................                         [ 63%]
tests/test_pdf_table_service.py ....................................     [ 73%]
tests/test_pdf_word_and_compress.py ...............ss...............     [ 83%]
tests/test_resource_boundaries.py ................................       [ 93%]
tests/test_safe_stem.py .......................                          [100%]

=============================== warnings summary ===============================
starlette/testclient.py:45
  DeprecationWarning: The anyio.abc.BlockingPortal alias is deprecated,
  use anyio.from_thread.BlockingPortal instead.

============================= slowest 8 durations ==============================
0.87s call     tests/test_resource_boundaries.py::test_export_tables_row_count_is_unbounded_known_gap
0.14s call     tests/test_resource_boundaries.py::test_upload_limit_is_enforced_only_after_the_body_is_fully_received_known_gap
0.14s call     tests/test_resource_boundaries.py::test_a_page_just_over_the_cap_is_rejected_and_just_under_still_renders
0.11s call     tests/test_resource_boundaries.py::test_target_bitmap_size_matches_what_pdfium_actually_allocates
0.10s call     tests/test_api_validation.py::test_image_endpoints_validate_content_not_the_declared_mime
0.06s call     tests/test_common_limits.py::test_ensure_batch_under_limit_rejects_a_single_oversized_member
0.06s call     tests/test_resource_boundaries.py::test_ocr_auto_mode_now_returns_400_fast_instead_of_rendering
0.04s call     tests/test_common_limits.py::test_ensure_batch_under_limit_rejects_total_over_batch_cap
=========================== short test summary info ============================
SKIPPED [1] tests/test_pdf_word_and_compress.py:119: 系統未安裝 tesseract；OCR 路徑無法在本機驗證（production Dockerfile 有安裝）
SKIPPED [1] tests/test_pdf_word_and_compress.py:127: 系統未安裝 tesseract；OCR 路徑無法在本機驗證（production Dockerfile 有安裝）
================== 331 passed, 2 skipped, 1 warning in 2.82s ===================
```

**331 passed / 2 skipped / 0 failed**（修正前是 319 passed / 2 skipped）。

skip 的原因未變：本機沒有 tesseract，OCR 端到端路徑仍**無法驗證**，沒有假裝通過。

> 附帶觀察：整套測試從 10.03 秒降到 2.82 秒。原因是 pixel bomb 測試從「真的渲染 3,735 萬像素」變成「即刻拒絕」——這本身就是修正生效的側面證據。

### 5.2 缺口測試的轉換

修正前有 17 個 `_known_gap` 測試。這兩個 P0 影響到其中 **4 個**，全部改成斷言「修好後的正確行為」，並在 docstring 註明是從缺口轉為回歸保護：

| 原本的缺口測試 | 現在 |
|---------------|------|
| `test_pdf_render_path_has_no_dimension_guard_known_gap` | → `test_pdf_render_path_now_guards_dimensions_before_rendering` |
| `test_a_tiny_pdf_actually_renders_past_the_pixel_cap` | → `test_a_page_just_over_the_cap_is_rejected_and_just_under_still_renders` |
| `test_ocr_auto_mode_reaches_the_render_before_checking_for_tesseract` | → `test_ocr_auto_mode_now_returns_400_fast_instead_of_rendering` |
| `test_all_heavy_handlers_are_async_def_calling_blocking_code_known_gap` | → `test_every_heavy_handler_offloads_its_sync_work_to_the_threadpool` |

另外新增 12 個測試（渲染守門邊界、估算準確度、訊息不外洩、pdfium 鎖、閘的 503／Retry-After／名額歸還／設定值／try 順序）。

**其餘 13 個 `_known_gap` 測試維持原樣、仍然全綠**——它們對應的 P1／P2 本次沒有修（S-03 上傳時機、S-05 列數無上限、S-11 openapi、S-14 timeout 分類、S-15 非 dict、S-16 空字串、S-17 誤判表格、S-18 公式注入等）。
`test_export_tables_row_count_is_unbounded_known_gap` 的 docstring 有更新一行：它原本寫「全程佔用事件迴圈」，修正後已不成立，改為「成本隨列數線性成長且無守門」——**斷言本身沒有放寬**，只是把已經不正確的敘述改正。

### 5.3 沒有為了讓數字好看而放寬任何斷言

- 4 個受影響的測試是**改成更嚴格的斷言**（原本斷言「沒有守門」，現在斷言「有守門，且在 render 之前，且訊息正確，且不外洩」）。
- 中途我自己寫錯了 2 個測試的判斷機制（用 `src.index("page.render(")` 會命中註解文字、用 `"MAX_IMAGE_PIXELS" not in src` 會命中註解）。**修正的是測試的機制，不是放寬它的意圖**——改成濾掉註解後再比對位置，以及改判「有沒有自訂常數／寫死門檻」。兩者驗的都還是同一件事，而且比原本更精確。

---

## 6. 這個修正**無法**證明的事

寫在最前面：**不能宣稱線上的 530 已經解決。**

| 無法證明的事 | 原因 |
|-------------|------|
| **線上 502／530 已經修好** | 稽核容器封鎖 `api.funnytools.win`（proxy 403 CONNECT）。本次**沒有對 production 送出任何請求**。我能說的只有：**移除了一個已在本機證實可重現的致因**（1.3KB 的上傳造成秒級事件迴圈阻塞）。是否為線上事故的**唯一**致因，未經證實。 |
| **後端 container 目前是否存活** | 同上。GitHub Actions 顯示 09-05、09-06 連續失敗，但那是歷史 log，不是現況。 |
| **實際的記憶體上界** | `MAX_CONCURRENT_JOBS=2` 的記憶體估算是用稽核 S-06 的分析推導的，**沒有實際量測 RSS**。容器的記憶體配額不在 repo 內，無法驗證 1GB 的估算是否落在配額內。 |
| **Python 3.12 上的行為** | 本機只有 3.11.15，production Dockerfile 是 3.12-slim。threadpool、`contextmanager`、`threading.Lock` 都是穩定的標準行為，但**未在 3.12 上覆核**。 |
| **OCR 路徑修正後的端到端行為** | 本機沒有 tesseract。P0-2 的守門在 render 階段，發生在呼叫 tesseract 之前，所以守門本身已驗證；但「守門通過之後 OCR 正常運作」在本機**仍然無法驗證**。 |
| **多 worker 下的實際表現** | 量測用的是 `--workers 1`（為了隔離變因）。production 是 `--workers 2`，總併發 4。**推導是線性的，但未實測。** |
| **pdfium 鎖在高併發下是否足夠** | 已依官方說明加鎖並驗證全後端只有一處用 pdfium，但**沒有做長時間高併發的壓力測試**（依規定也不對 production 做）。 |
| **7.7GB 的 OOM 情境** | 依然**刻意沒有實際執行**。已驗證的是「守門會在配置前拒絕」，不是「不擋就一定 OOM」。 |

### 建議的下一步

1. **先確認後端 container 現況**——這仍然是唯一需要人工介入的項目，修正無法代替。
2. 部署後觀察 `conversion-api-smoke.yml` 是否轉綠。若仍紅，代表 530 另有致因，需要能連上 production 的環境才能繼續查。
3. 部署後量一次實際 RSS，回頭校準 `FUNNYTOOLS_MAX_CONCURRENT_JOBS`。
4. 決定大幅面頁面（>22 英吋）要「拒絕」還是「自動降 DPI」——見 §1 的行為改變。
5. 若要讓前端讀 `Retry-After`，需把它加進 `expose_headers`（本次未動 CORS）。

---

## 7. 邊界遵守情況

| 規定 | 遵守情況 |
|------|---------|
| 不得改成功路徑的回應格式／header／狀態碼 | ✅ 未改。`/health` 回應一字未動；6 個轉檔端點的 media_type、`Content-Disposition`、`X-Funnytools-Stats` 全部原封不動 |
| 不得改既有上限的數值 | ✅ 80MB／120MB／2500 萬／200 頁／30 頁全部未動，並有測試把關（`test_render_guard_uses_the_shared_pixel_limit_and_does_not_redefine_it`） |
| 不得新增端點／功能 | ✅ 路由表未變，仍是 8 個 |
| 不得升級或新增第三方依賴 | ✅ `requirements.txt` 未動。`run_in_threadpool` 來自已安裝的 starlette；`threading`／`math`／`contextlib` 都是標準庫 |
| 不得改 `.github/`、`src/`、`tests/` | ✅ 未動（已用 `git diff` 確認） |
| 不要 commit／push | ✅ 未 commit、未 push |
| 允許路徑 | ✅ 只動了 `backend/**`、`.gitignore`、`reports/task-02-reliability/backend-*.md` |
