# Conversion API 後端可靠度：發現與修正

- 日期：2026-09-07
- 範圍：`backend/`
- 方法：只讀原始碼 + 本機執行與量測。稽核環境對外封鎖 `api.funnytools.win`，
  **本次稽核未對 production 送出任何請求**。線上狀態的敘述來源另行標註。

---

## 1. 觸發原因

`conversion-api-smoke.yml` 對 production 的排程 smoke 間歇紅燈，錯誤是 Cloudflare 530
（邊緣連不到來源），而不是端點斷言失敗。同一個 commit 在 09-04 綠、09-05/09-06 紅，
所以問題在 production runtime，不在測試或前端。

## 2. 根因（本機可重現）

`app.py` 的所有轉檔 handler 都宣告成 `async def`，但直接呼叫同步的 CPU-bound 函式。
在 asyncio 下，這會把**整個 worker 行程的事件迴圈**卡住直到轉檔結束——包括 `/health`。

致因鏈：

```
轉檔請求進來
  → 同步 CPU 工作在事件迴圈上執行
  → 同一 worker 的 /health 無法回應
  → Docker HEALTHCHECK（timeout 5s、retries 3）連續失敗
  → 容器被標成 unhealthy
  → Cloudflare 邊緣拿不到來源回應 → 530
  → 轉檔結束、事件迴圈恢復 → 服務自行復原（所以是間歇性的）
```

量測（本機，工作負載刻意選成修正前後都合法的請求）：

| 指標 | 修正前 | 修正後 |
|---|---|---|
| `/health` 中位數延遲（重負載中） | 2.7 ms | 1.0 ms |
| `/health` **最差**延遲（重負載中） | **17,324.7 ms** | **33.3 ms** |

最差延遲 17 秒遠超過 HEALTHCHECK 的 5 秒 timeout，這就是容器被標 unhealthy 的機制。

另外發現一個放大器：`pdf_render.py` 在 `page.render()` 之前沒有像素上限，
一個 1.3 KB 的惡意 PDF 就能讓單一請求燒掉一秒以上 CPU 並配置上百 MB 點陣圖。
修正後同一個檔案 0.07–0.12 秒回 400。

## 3. 修正

| # | 修正 | 檔案 |
|---|---|---|
| 1 | CPU-bound 轉檔改走 `run_in_threadpool`，事件迴圈不再被佔用 | `app.py` |
| 2 | 有界併發閘 `_job_slot()`，滿載回 503 + `Retry-After`，**不排隊** | `app.py` |
| 3 | 閘放在 handler 的 `try` **之外**——放在裡面會被 `except Exception` 轉成 500 | `app.py` |
| 4 | `/health` 刻意不進閘、不做 I/O，滿載時仍必須可回應 | `app.py` |
| 5 | `page.render()` 前先擋像素上限 | `services/pdf_render.py` |
| 6 | pdfium 非 thread-safe，移入 threadpool 後用行程內鎖序列化 | `services/pdf_render.py` |
| 7 | XLSX 儲存格 `=` 開頭會被 openpyxl 當公式，強制轉回字串 | `services/pdf_table.py` |
| 8 | `/health` 回 `revision`（build 時傳入的 git SHA），可從外部確認線上版本 | `app.py`、`Dockerfile` |

`MAX_CONCURRENT_JOBS` 預設 2（每 worker）。production 是 `--workers 2`，
所以全機同時轉檔上限約 4。以擁有者的機器（16 CPU / ~15.5 GiB Docker 記憶體）而言
這是**保守的預設值，不是容量認證**——沒有真實 peak-memory profile，需要調再調。

滿載時 `/health` 實測：中位數 5.9 ms、最差 15.5 ms、20 次全部成功。

## 4. 測試

`backend/tests/` 為本次新建，涵蓋端點驗證、資源邊界、併發閘、錯誤路徑。
`.github/workflows/backend-tests.yml` 在 `backend/**` 有變動時執行，
並安裝與 Dockerfile 相同的 tesseract 套件，讓 OCR 路徑實際被跑到。

本機（已裝 tesseract）：**343 passed, 0 skipped**。

## 5. 尚未證明的事

- **不能宣稱線上已修好。** 這些修正尚未部署。
  Production 目前跑的 image 建於 2026-08-30，`/health` 回 `version 1.0.0`，
  容器內原始碼沒有 `run_in_threadpool`、沒有 `MAX_CONCURRENT_JOBS`、沒有像素上限。
- 擁有者在 2026-09-07 20:58 (Asia/Taipei) 對 production `/health` 取樣 5 次全部 200
  （873 / 325 / 502 / 524 / 492 ms）。這只代表**取樣當下健康**，
  不代表間歇性問題消失——歷史上排程 smoke 就是間歇紅。
- 本機移除的是一個**已證實可重現**的致因，是否為線上 530 的**唯一**致因未經證實。
  部署後要觀察 `conversion-api-smoke.yml` 是否穩定轉綠；若仍紅，另有致因。
- 部署步驟與驗證／回滾見 `backend/BACKEND_DEPLOY_RUNBOOK.md`。

## 6. smoke 未涵蓋的路徑（後續）

排程 smoke 目前只跑 `ocr_mode=off`，且 production profile 會再縮減參數：

- `POST /api/pdf/to-word`：只跑 `ocr_mode=off`、`include_images=false`
- `POST /api/pdf/table-preview` / `table-to-excel`：只跑 `ocr_mode=off`
- `POST /api/image/to-dxf`：不含校準參數
- `POST /api/pdf/compress`：只跑 `balanced`，跳過 `lossless` / `strong`
- `POST /api/pdf/table-to-excel`：前端沒有任何呼叫者（`funnytools-api.ts` 有函式但無人使用）

OCR 路徑在 production 完全沒有 smoke 覆蓋。這是既有缺口，本次未擴張 smoke
（線上不得做負載測試），列為後續。
