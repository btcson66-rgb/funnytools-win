# 後端端點盤點（funnytools.win Conversion API）

- 稽核日期：2026-09-06
- 稽核範圍：`backend/app.py`、`backend/services/*.py`、`src/lib/toolWidgets.ts`、`src/lib/funnytools-api.ts`、`src/components/tools/ConversionApiTool.astro`、`tests/conversion-api-integration.api.mjs`
- 稽核方式：**只讀原始碼 + 本機執行**。稽核容器對外封鎖 `funnytools.win` / `api.funnytools.win`（proxy 回 403 CONNECT），**本次未對線上服務發出任何請求**，所有關於 production 的敘述只來自 repo 原始碼與 GitHub Actions 歷史 log。

---

## 1. 端點清單（以 `backend/app.py` 為準）

實際核對結果：**8 個 route**（7 個轉檔 API + 1 個 `/health`）。與任務書列的清單一致，未發現遺漏或多餘端點。

| # | Method | 路徑 | app.py 行號 | handler |
|---|--------|------|------------|---------|
| 1 | GET | `/health` | 93-95 | `health` |
| 2 | POST | `/api/images/compress-batch` | 98-129 | `api_compress_batch` |
| 3 | POST | `/api/pdf/to-word` | 132-157 | `api_pdf_to_word` |
| 4 | POST | `/api/pdf/table-preview` | 177-195 | `api_table_preview` |
| 5 | POST | `/api/pdf/table-to-excel` | 198-223 | `api_table_to_excel` |
| 6 | POST | `/api/pdf/export-tables` | 226-241 | `api_export_tables` |
| 7 | POST | `/api/image/to-dxf` | 244-281 | `api_image_to_dxf` |
| 8 | POST | `/api/pdf/compress` | 284-301 | `api_pdf_compress` |

另有 FastAPI 內建的 `/openapi.json`（見安全稽核 S-11）。`/docs`、`/redoc` 預設關閉（`app.py:33-34`，`FUNNYTOOLS_ENABLE_DOCS=0`）。

---

## 2. 端點 → 前端工具 slug → service 實作 → smoke 涵蓋

前端對應關係來源：`src/lib/toolWidgets.ts:140-144` 把 5 個 slug 指向 `ConversionApiTool.astro`；該元件再依 `mode`（= slug）分派到 `src/lib/funnytools-api.ts` 的呼叫函式（`ConversionApiTool.astro:321-339`）。

| 端點 | 前端工具 slug | 前端呼叫函式 | service 實作檔 | smoke 涵蓋 |
|------|--------------|-------------|---------------|-----------|
| `GET /health` | （無 UI） | `waitForOrigin()` 就緒輪詢 | `app.py:93` | ✅ 有（`tests/conversion-api-integration.api.mjs:146-151`，含 CORS header 斷言） |
| `POST /api/images/compress-batch` | `bulk-image-compressor` | `compressImagesWithStats()` | `services/images.py`（`compress_batch` / `compress_one`） | ✅ 有（L165-183：ZIP 結構、JPEG magic、manifest CSV、`X-Funnytools-Stats`） |
| `POST /api/pdf/to-word` | `pdf-to-word` | `pdfToWord()` | `services/pdf_word.py`（+ `pdf_render.py`、`common.run_tesseract_png`） | ⚠️ 部分（L185-195：只跑 `ocr_mode=off`；production profile 再砍成只跑 `include_images=false`） |
| `POST /api/pdf/table-preview` | `pdf-table-to-excel`（按「轉換」） | `previewPdfTables()` | `services/pdf_table.py`（`extract_tables`） | ⚠️ 部分（L197-204、L243-248：只跑 `ocr_mode=off`） |
| `POST /api/pdf/table-to-excel` | **無 UI 呼叫者** | `pdfTablesToExcel()`（`funnytools-api.ts:162-183`，無人呼叫） | `services/pdf_table.py`（`pdf_tables_to_xlsx`） | ⚠️ 部分（L210-218：只跑 `ocr_mode=off`） |
| `POST /api/pdf/export-tables` | `pdf-table-to-excel`（按「匯出」） | `exportEditedTables()` | `services/pdf_table.py`（`tables_to_xlsx`） | ✅ 有（L206-208） |
| `POST /api/image/to-dxf` | `image-to-dxf` | `imageToDxf()` | `services/image_dxf.py` | ⚠️ 部分（L220-230：不含校準參數 `units_per_pixel` / `calibration_*`） |
| `POST /api/pdf/compress` | `pdf-compressor` | `compressPdf()` | `services/pdf_compress.py` | ⚠️ 部分（L232-241：production profile 只跑 `balanced`，跳過 `lossless` / `strong`） |

五個 slug 在 `src/data/tools.ts` 的狀態皆為 `status: 'live'`、`privacyLevel: 'anonymous-api'`（行 1101、1148、1153、1158、1163）。

---

## 3. 沒有被 smoke 涵蓋的東西

### 3.1 端點層級：**0 個完全未涵蓋**

**修正任務書假設**：8 個 route 全部都被 `tests/conversion-api-integration.api.mjs` 打到至少一次。沒有「完全沒被 smoke 碰過」的端點。

但這個結論有兩個重要但書：

1. **daily 排程跑的是 production profile，涵蓋面更窄。**
   `.github/workflows/conversion-api-smoke.yml:34` 設 `FUNNYTOOLS_SMOKE_PROFILE=production`，觸發測試檔裡的兩處縮減：
   - L185：`pdf-to-word` 只跑 `include_images=false`（不驗證圖片嵌入路徑）
   - L232：`pdf/compress` 只跑 `balanced`（不驗證 `lossless`、`strong`）

   完整矩陣（`full` profile）**在 CI 裡沒有任何 workflow 會執行**——`preflight.yml`、`deploy.yml` 都沒有跑 `npm run test:api`（只有 `conversion-api-smoke.yml` 跑，而它固定用 production profile）。所以那些多出來的斷言在自動化流程中等於從未執行。

2. **每天只跑一次。**
   `cron: '17 3 * * *'`（UTC）＋ `workflow_dispatch`。push 不觸發，因此後端 container 的改動不會在部署時被驗證。

### 3.2 參數/路徑層級：4 個實質缺口

| 缺口 | 說明 | 影響 |
|------|------|------|
| **G-1 OCR 路徑完全沒被驗證** | smoke 的每一個 PDF 請求都寫死 `ocr_mode=off`（L189、L200、L213）。`run_tesseract_png()`、`render_pdf_page_png()`、`_ocr_words()`、OCR 頁數上限，以及 Dockerfile 裝的 `tesseract-ocr-chi-tra` 語言包，**沒有任何自動化驗證**。 | 繁中 OCR 掛掉（語言包沒裝、tesseract 版本變動）不會被 smoke 抓到，只會由使用者回報。這是 `pdf-to-word` 與 `pdf-table-to-excel` 兩個工具的主要賣點。 |
| **G-2 `/api/pdf/table-to-excel` 是孤兒端點** | `funnytools-api.ts:162-183` 有 `pdfTablesToExcel()`，但全 repo 沒有任何 UI 呼叫它（已 grep `src/`、`public/`、`data/` 確認，唯一命中處就是它自己的定義）。UI 走的是 preview → 使用者編輯 → export-tables。 | 一個公開端點在維護但沒有使用者。要嘛接回 UI，要嘛下線；現況是白白多養一個攻擊面與一份 smoke 執行成本。 |
| **G-3 DXF 校準參數沒被驗證** | smoke（L220-227）只送 `threshold/invert/blur/epsilon_ratio/min_area/units`，沒送 `units_per_pixel`、`calibration_pixel_distance`、`calibration_real_distance`。但 UI 的畫布校準（`ConversionApiTool.astro:317-318`）主打的就是這條路徑。 | 比例尺算錯（輸出 DXF 尺寸全錯）不會被 smoke 發現，而這對 CAD 使用者是致命錯誤。 |
| **G-4 錯誤路徑只驗證 1 個案例** | smoke 只有 L243-248 一個負向案例（`pages=1,,3` → 400）。而且該請求**沒有帶 `Origin` header**（對比其他請求都有），所以它同時也沒有驗證錯誤回應的 CORS 行為。413/422/500 的形狀、錯誤訊息不外洩，全部沒有 production 驗證。 | 錯誤回應退化（例如某次改動讓 500 洩漏堆疊）不會被 smoke 攔下。 |

### 3.3 已由本次新增的後端測試補上的部分

`backend/tests/` 已補上 G-3、G-4 的**本機**覆蓋（DXF 校準比例尺、錯誤形狀、CORS、訊息不外洩），詳見 `backend-test-run.md`。
**G-1（OCR）本機無法補**——稽核容器沒有 tesseract，相關測試以 `needs_tesseract` skip 標記，**沒有假裝通過**。
G-2 是架構決策，需使用者拍板。

---

## 4. Smoke 的實際健康狀況（GitHub Actions 歷史）

資料來源：`btcson66-rgb/funnytools-win` 的 `conversion-api-smoke.yml` 執行紀錄（透過 GitHub API 讀取，非線上探測）。

| run | 日期 (UTC) | 結果 | 失敗原因 |
|-----|-----------|------|---------|
| #6 | 2026-09-06 07:55 | ❌ failure | `/health` 連續 24 次回 **HTTP 530**，240 秒 readiness 窗口耗盡 |
| #5 | 2026-09-05 07:41 | ❌ failure | `/health` 連續 24 次回 **HTTP 502**，240 秒窗口耗盡 |
| #4 | 2026-09-04 07:59 | ✅ success | — |
| #3 | 2026-09-03 08:04 | ✅ success | — |
| #2 | 2026-09-02 07:56 | ❌ failure | — |
| #1 | 2026-09-01 08:40 | ❌ failure | — |

**6 次執行 4 次紅（66% 失敗率），且最近兩天連續失敗。**
兩次失敗都不是 API 邏輯錯誤，而是 `ORIGIN NOT READY`：Cloudflare 拿不到後端 origin（502 = bad gateway，530 = origin 完全連不上），代表 **FastAPI container 在該時間點沒有在跑或無法回應**。

> 這裡只能說「smoke 執行當下後端無回應」。後端目前是否正常，本容器無法驗證（網路被封鎖），**不做任何推測**。
> 但可以確定的是：這與安全稽核裡的 **S-01（事件迴圈阻塞）** 完全相容——2 個 worker 都被重運算卡住時，`/health` 與 Docker `HEALTHCHECK`（`Dockerfile:30-31`）都會超時，容器會被判定不健康。相關性不等於因果，需要在能連上 production 的環境進一步確認。
>
> **2026-09-06 更新**：S-01 與 S-02 已修正（見 `backend-p0-fixes.md`）。本機已量到
> `/health` 最差延遲從 17,324.7 ms 降到 33.3 ms。但**仍然不能宣稱線上 530 已解決**
> ——稽核容器連不上 production，能說的只有「移除了一個已證實可在本機重現的致因」。
> 部署後請觀察這個 workflow 是否轉綠；若仍紅，代表另有致因。

---

## 5. 給使用者的行動建議（依重要性）

1. **先確認後端 container 現況**（連續兩天紅）。這是唯一需要立刻人工介入的項目，修正無法代替。
2. ~~修 S-01（把重運算移出事件迴圈）~~ ✅ **已修**（2026-09-06，連同 S-02），見 `backend-p0-fixes.md`。
3. 補 G-1：在 smoke 加一個 `ocr_mode=force`、`ocr_lang=chi_tra` 的小型案例（1 頁即可），把 OCR 路徑納入日常驗證。
4. 決定 G-2：`/api/pdf/table-to-excel` 接回 UI 或下線。
5. 讓 `full` profile 有地方跑（例如後端 container 有改動時在 CI 用本機 container 跑一次），否則多寫的斷言等於沒寫。
