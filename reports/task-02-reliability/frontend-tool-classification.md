# 前端工具相依分類（任務書 §6, §7）

日期：2026-09-06
稽核範圍：`/home/user/funnytools-win`，分支 `claude/task-02-funnytools-reliability`
方法：僅讀 repo 原始碼（`src/data/tools.ts`、`src/lib/toolWidgets.ts`、`src/components/tools/*.astro`、`src/lib/*.ts`）。容器已封鎖 funnytools.win 與 api.funnytools.win，**未曾、也無法開啟任何線上頁面或呼叫線上 API**，以下所有結論僅來自程式碼。

## 0. 對背景事實的更正（先講，因為會影響下面整張表）

交辦時給的背景事實寫「`src/data/tools.ts` 有 84 個 `status: 'live'` 的工具」。實際用 Node 直接把 `tools.ts` 當 ESM import 進來算（`node --experimental-strip-types`，等同 `npm test` 的跑法），得到的是 **83** 個，不是 84。

- 用 `grep -c "status: 'live'"` 會數出 84 行沒錯，但用同一個天真的「數大括號配對」腳本去切每個工具物件，會少算一個——因為 `json-formatter` 這個工具的 `icon` 欄位值本身就是字串 `'{}'`（`src/data/tools.ts:449`），對不做字串感知的大括號計數器來說，這行會把深度算亂，導致把兩個相鄰物件誤判成一個。
- 修正後用會辨識字串邊界的計數器重算，或直接用 Node 動態 `import()` 讀出 `tools.ts` 匯出的 `tools` 陣列本身（不靠正規表示式），兩種方法都一致得到 83。
- `src/lib/toolWidgets.ts` 的 `widgetBySlug` 也剛好是 83 筆，與 83 個 live 工具**一一對應、沒有缺漏、也沒有多餘項**（見 `tests/tool-dependency-map.test.mjs` 的鎖定測試）。

以下分類表以實際的 83 筆為準。如果之後有人以「84」為前提做容量規劃或核對，會對不起來，建議之後對外文件也一併更正這個數字。

## 1. 分類方法

對每個 live 工具：
1. 由 `src/lib/toolWidgets.ts` 找出對到的 Astro component。
2. 讀該 component 原始碼，檢查：
   - 有沒有 `fetch(` / `XMLHttpRequest` / `new WebSocket` / `EventSource(` 呼叫外部網址。
   - `<script>`／`await import()` 載入的套件是 npm 套件（會被 Vite 打包進本機 bundle）還是指向外部 CDN 網址的 `<script src="https://...">`。
   - 有沒有透過共用 helper（例如 `src/lib/downloadGate.client.ts`）間接觸發網路請求。
3. 對照 `src/data/tools.ts` 該工具自己標的 `privacyLevel` 欄位，確認註冊資料與程式碼實況是否一致——**這一步挖出了本次稽核最重要的發現，見下方第 3 節**。

分類定義：
- **LOCAL_ONLY**：元件本身與其載入的所有第三方套件都不含任何對外 `fetch`／CDN／表單上傳；使用者輸入與產出的檔案只存在瀏覽器記憶體、`Blob`/`Object URL` 或 `localStorage`。
- **BACKEND_DEPENDENT**：核心功能一定要把使用者檔案送到某個伺服器才能完成（去掉網路就完全不能用）。
- **MIXED**：核心運算在瀏覽器本機完成（斷網也能算出結果），但流程中有一個會把輸出檔案送出瀏覽器的分支（例如下載時的第三方寄送）。
- **UNKNOWN**：讀完程式碼仍無法判斷。**本次 83 個工具全部判得出來，沒有 UNKNOWN 項**——因為每個 component 都只用 npm 套件（Vite 打包進本機 bundle，不是執行期打外部 CDN），且除了 `ConversionApiTool.astro` 與呼叫 `requestGatedDownload()` 的 3 個元件之外，`src/components/tools/*.astro` 全文搜尋 `fetch(`／`XMLHttpRequest`／CDN 網址都是零命中（唯二例外是 `Cad2dBoard.astro` 裡的 SVG XML namespace 字串，以及 `QrCodeGenerator.astro` 裡的 QR Code 內容預設 placeholder 文字，兩者都不是網路請求）。

## 2. 分類統計

| 分類 | 數量 | 說明 |
|---|---|---|
| LOCAL_ONLY | 75 | 純瀏覽器運算，無任何對外請求 |
| BACKEND_DEPENDENT | 5 | 綁 `ConversionApiTool.astro`，一定會把整份檔案上傳到 `api.funnytools.win` |
| MIXED | 3 | 運算在本機完成，但「下載」動作會把產出檔案上傳到 `SITE.downloadGateEndpoint`（見第 3 節） |
| UNKNOWN | 0 | 無 |
| **合計** | **83** | |

## 3. 重要發現：MIXED 分類（任務書原先沒預期到的第三類）

任務書背景只點名了 5 個 `ConversionApiTool` 工具會上傳檔案。實際逐一讀完全部 83 個 component 後，額外發現 **3 個被 `tools.ts` 標成 `privacyLevel: 'local-only'` 的工具，其「下載」按鈕會把產出檔案上傳到另一個網域**：

- `image-compressor`（`ImageCompressor.astro`）
- `qr-code-generator`（`QrCodeGenerator.astro`）
- `merge-pdf`（`MergePdf.astro`）

機制：`src/lib/downloadGate.client.ts` 是一個「Email 下載閘門」功能——`src/config/site.ts:42` 的 `features.downloadGate: true`（全站啟用）＋ `src/layouts/ToolLayout.astro:53-54` 在每個工具頁都注入設定，所以只要工具呼叫 `requestGatedDownload()`，點下載時就會（在能連上網路的情況下）跳出「把檔案寄到信箱」的面板；使用者按送出後，`submitGate()`（`src/lib/downloadGate.client.ts:124-180`）用 `FormData` 把使用者輸入的 email、工具名稱，以及**產出的檔案本體**（`file.blob`，≤5MB 時，`downloadGate.client.ts:137-139`）一起 `POST` 到 `src/config/site.ts:46` 設定的 `https://roomfeng.win/api/download-gate`（注意：這是**另一個產品站 roomfeng.win 的網域**，不是 `api.funnytools.win`，也不是同一個網站）。只有在這個 fetch 直接拋錯（網路不通）時才會 fallback 回本機直接下載；只要網路通、伺服器有回應（即使伺服器回覆「還是幫你走本機下載」），檔案都已經先被送出去了。

這 3 個工具的核心運算（壓縮圖片、產生 QR Code、合併 PDF）確實是純本機完成（`canvas.toBlob`／`pdf-lib`），這點沒有問題；問題出在**「下載」是目前唯一取得結果的路徑，而下載這一步會上傳檔案**，卻在 `tools.ts` 的 `privacyLevel` 被標成跟其他 75 個真正 100% 本機的工具一樣的 `'local-only'`。這個錯誤標記會連鎖影響到 UI 上好幾個地方，詳見 `frontend-privacy-audit.md` 第 1 節（這是本次稽核認為最需要優先處理的一項）。

`tests/tool-dependency-map.test.mjs` 已把這 3 個 slug 鎖住（`MIXED slug list (download-gate upload path) is locked to the known 3`），未來如果有新工具也接上 `requestGatedDownload()` 卻沒有一併更新這裡，測試會紅燈。

## 4. 額外發現：一個沒有被引用的「死」本機版 PDF 壓縮元件

`src/components/tools/PdfCompressor.astro` 存在於檔案系統中，內容是一個完全本機（`pdf-lib`，無 fetch）、單檔上限硬寫 40MB 的 PDF 壓縮器，但 `src/lib/toolWidgets.ts` 裡 `pdf-compressor` 這個 slug 對到的是 `ConversionApiTool`（第 144 行），不是這個檔案——用 `grep` 確認過，整個 `src/` 沒有任何地方 import `PdfCompressor.astro`。

這強烈暗示：`pdf-compressor` 這個工具原本是本機版，後來換成走 `api.funnytools.win` 的伺服器版，但舊檔案被留下沒刪、而且**至少有一篇 SEO 指南文章的內容還停在舊版本的描述**（40MB 上限、「瀏覽器本機處理」），對應到現在的線上工具已經不準——詳見 `frontend-privacy-audit.md` 第 6 節。這個死檔案本身不影響線上行為（沒被 import 就不會被打包出去），但可以視為之後清理程式碼債的候選項；本次任務範圍內未動 `src/`，只記錄不處理。

## 5. 完整分類表（83 個 live 工具）

`評估依據` 欄位：LOCAL_ONLY 一律指向 `src/lib/toolWidgets.ts` 裡該 slug 對到的 component 檔案（該檔案本身無 fetch/CDN，且沒有呼叫 `requestGatedDownload`）；BACKEND_DEPENDENT／MIXED 額外標出關鍵行號。

| slug | 分類 | 元件 | 評估依據 | 後端端點 |
|---|---|---|---|---|
| age-calculator | LOCAL_ONLY | AgeCalculator.astro | 無 fetch/CDN | — |
| apa-7-report-generator | LOCAL_ONLY | Apa7ReportGenerator.astro | 無 fetch/CDN | — |
| bar-chart-maker | LOCAL_ONLY | ChartMaker.astro | 無 fetch/CDN | — |
| barcode-generator | LOCAL_ONLY | BarcodeGenerator.astro | 無 fetch/CDN（`jsbarcode` 為 npm 套件） | — |
| base64 | LOCAL_ONLY | Base64Tool.astro | 無 fetch/CDN | — |
| break-reminder | LOCAL_ONLY | BreakReminder.astro | 無 fetch/CDN | — |
| **bulk-image-compressor** | **BACKEND_DEPENDENT** | ConversionApiTool.astro | `toolWidgets.ts:140`；呼叫 `compressImagesWithStats()`（`funnytools-api.ts:94-112`） | `POST {apiBase}/api/images/compress-batch` |
| business-days | LOCAL_ONLY | BusinessDays.astro | 無 fetch/CDN | — |
| cad-2d | LOCAL_ONLY | Cad2dBoard.astro | 無 fetch/CDN（唯一含 `http://` 字串是 SVG XML namespace，非請求） | — |
| case-converter | LOCAL_ONLY | CaseConverter.astro | 無 fetch/CDN | — |
| character-counter | LOCAL_ONLY | CharacterCounter.astro | 無 fetch/CDN | — |
| class-rank-percentile-calculator | LOCAL_ONLY | EducationStatisticsCalculator.astro | 無 fetch/CDN | — |
| color-generator | LOCAL_ONLY | ColorGenerator.astro | 無 fetch/CDN | — |
| compound-interest | LOCAL_ONLY | CompoundInterest.astro | 無 fetch/CDN | — |
| countdown-timer | LOCAL_ONLY | CountdownTimer.astro | 無 fetch/CDN | — |
| cronbach-alpha-calculator | LOCAL_ONLY | EducationStatisticsCalculator.astro | 無 fetch/CDN | — |
| csv-to-json | LOCAL_ONLY | DataConverter.astro | 無 fetch/CDN（`papaparse` 為 npm 套件） | — |
| date-difference | LOCAL_ONLY | DateDifference.astro | 無 fetch/CDN | — |
| delete-pdf-pages | LOCAL_ONLY | DeletePdfPages.astro | 無 fetch/CDN（`pdf-lib` 為 npm 套件） | — |
| dice-roller | LOCAL_ONLY | DiceRoller.astro | 無 fetch/CDN | — |
| extract-pdf-pages | LOCAL_ONLY | ExtractPdfPages.astro | 無 fetch/CDN（`pdf-lib`） | — |
| flowchart | LOCAL_ONLY | FlowchartMaker.astro | 無 fetch/CDN | — |
| gpa-calculator | LOCAL_ONLY | GpaCalculator.astro | 無 fetch/CDN | — |
| grade-average | LOCAL_ONLY | GradeAverage.astro | 無 fetch/CDN | — |
| group-generator | LOCAL_ONLY | ClassGroupGenerator.astro | 無 fetch/CDN | — |
| **image-compressor** | **MIXED** | ImageCompressor.astro | 壓縮本身用 `canvas.toBlob`（`ImageCompressor.astro:224-231`，無 fetch）；下載按鈕呼叫 `requestGatedDownload()`（`ImageCompressor.astro:125,301`） | 下載時 `POST {downloadGateEndpoint}`（見第 3 節） |
| image-crop | LOCAL_ONLY | ImageCrop.astro | 無 fetch/CDN | — |
| image-resizer | LOCAL_ONLY | ImageResizer.astro | 無 fetch/CDN | — |
| image-rotate-flip | LOCAL_ONLY | ImageRotateFlip.astro | 無 fetch/CDN | — |
| image-to-base64 | LOCAL_ONLY | ImageToBase64.astro | 無 fetch/CDN | — |
| **image-to-dxf** | **BACKEND_DEPENDENT** | ConversionApiTool.astro | `toolWidgets.ts:143`；呼叫 `imageToDxf()`（`funnytools-api.ts:198-235`） | `POST {apiBase}/api/image/to-dxf` |
| images-to-pdf | LOCAL_ONLY | ImagesToPdf.astro | 無 fetch/CDN（`pdf-lib`） | — |
| independent-samples-t-test-calculator | LOCAL_ONLY | EducationStatisticsCalculator.astro | 無 fetch/CDN | — |
| inflation | LOCAL_ONLY | InflationCalculator.astro | 無 fetch/CDN | — |
| jpg-to-png | LOCAL_ONLY | JpgToPng.astro | 無 fetch/CDN | — |
| jpg-to-webp | LOCAL_ONLY | ImageFormatConverter.astro | 無 fetch/CDN | — |
| json-formatter | LOCAL_ONLY | JsonFormatter.astro | 無 fetch/CDN | — |
| json-to-csv | LOCAL_ONLY | DataConverter.astro | 無 fetch/CDN（`papaparse`） | — |
| markdown-previewer | LOCAL_ONLY | MarkdownPreviewer.astro | 無 fetch/CDN | — |
| **merge-pdf** | **MIXED** | MergePdf.astro | 合併本身用 `pdf-lib`（`MergePdf.astro:161-163,282-284`，無 fetch）；下載按鈕呼叫 `requestGatedDownload()`（`MergePdf.astro:99,293`） | 下載時 `POST {downloadGateEndpoint}`（見第 3 節） |
| mortgage-payment | LOCAL_ONLY | MortgagePayment.astro | 無 fetch/CDN | — |
| net-salary | LOCAL_ONLY | NetSalary.astro | 無 fetch/CDN | — |
| normalized-score-converter | LOCAL_ONLY | EducationStatisticsCalculator.astro | 無 fetch/CDN | — |
| overtime-pay | LOCAL_ONLY | OvertimePay.astro | 無 fetch/CDN | — |
| password-generator | LOCAL_ONLY | PasswordGenerator.astro | 無 fetch/CDN | — |
| **pdf-compressor** | **BACKEND_DEPENDENT** | ConversionApiTool.astro | `toolWidgets.ts:144`；呼叫 `compressPdf()`（`funnytools-api.ts:237-251`）。注意：檔案系統另有一個未被引用的本機版 `PdfCompressor.astro`，見第 4 節 | `POST {apiBase}/api/pdf/compress` |
| pdf-page-reorder | LOCAL_ONLY | PdfPageReorder.astro | 無 fetch/CDN（`pdf-lib`） | — |
| **pdf-table-to-excel** | **BACKEND_DEPENDENT** | ConversionApiTool.astro | `toolWidgets.ts:142`；呼叫 `previewPdfTables()` / `pdfTablesToExcel()` / `exportEditedTables()`（`funnytools-api.ts:137-196`） | `POST {apiBase}/api/pdf/table-preview`、`/api/pdf/table-to-excel`、`/api/pdf/export-tables` |
| pdf-to-image | LOCAL_ONLY | PdfToImage.astro | 無 fetch/CDN（`pdfjs-dist` 為 npm 套件，worker 也是本機打包的 `pdf.worker.min.mjs`） | — |
| **pdf-to-word** | **BACKEND_DEPENDENT** | ConversionApiTool.astro | `toolWidgets.ts:141`；呼叫 `pdfToWord()`（`funnytools-api.ts:114-135`） | `POST {apiBase}/api/pdf/to-word` |
| percentage-calculator | LOCAL_ONLY | PercentageCalculator.astro | 無 fetch/CDN | — |
| percentile-rank-calculator | LOCAL_ONLY | EducationStatisticsCalculator.astro | 無 fetch/CDN | — |
| pie-chart-maker | LOCAL_ONLY | ChartMaker.astro | 無 fetch/CDN | — |
| png-to-jpg | LOCAL_ONLY | PngToJpg.astro | 無 fetch/CDN | — |
| pomodoro-timer | LOCAL_ONLY | PomodoroTimer.astro | 無 fetch/CDN | — |
| **qr-code-generator** | **MIXED** | QrCodeGenerator.astro | 產生 QR Code 用 `canvas.toBlob` / `qrcode` npm 套件（`QrCodeGenerator.astro:164,211`，無 fetch）；下載按鈕呼叫 `requestGatedDownload()`（`QrCodeGenerator.astro:114,195`） | 下載時 `POST {downloadGateEndpoint}`（見第 3 節） |
| random-group-generator | LOCAL_ONLY | RandomGroupGenerator.astro | 無 fetch/CDN | — |
| random-name-picker | LOCAL_ONLY | RandomNamePicker.astro | 無 fetch/CDN | — |
| random-number-picker | LOCAL_ONLY | RandomNumberPicker.astro | 無 fetch/CDN | — |
| random-student-picker | LOCAL_ONLY | RandomStudentPicker.astro | 無 fetch/CDN | — |
| random-wheel | LOCAL_ONLY | RandomWheel.astro | 無 fetch/CDN | — |
| remove-duplicate-lines | LOCAL_ONLY | RemoveDuplicateLines.astro | 無 fetch/CDN | — |
| remove-empty-lines | LOCAL_ONLY | RemoveEmptyLines.astro | 無 fetch/CDN | — |
| rotate-pdf | LOCAL_ONLY | RotatePdf.astro | 無 fetch/CDN（`pdf-lib`） | — |
| savings-goal | LOCAL_ONLY | SavingsGoal.astro | 無 fetch/CDN | — |
| seating-chart | LOCAL_ONLY | SeatingChart.astro | 無 fetch/CDN | — |
| sketchpad | LOCAL_ONLY | Sketchpad.astro | 無 fetch/CDN | — |
| sort-lines | LOCAL_ONLY | SortLines.astro | 無 fetch/CDN | — |
| split-pdf | LOCAL_ONLY | SplitPdf.astro | 無 fetch/CDN（`pdf-lib`） | — |
| spss-result-interpreter | LOCAL_ONLY | SpssResultInterpreter.astro | 無 fetch/CDN | — |
| standard-deviation | LOCAL_ONLY | StandardDeviation.astro | 無 fetch/CDN | — |
| stopwatch | LOCAL_ONLY | Stopwatch.astro | 無 fetch/CDN | — |
| t-score-calculator | LOCAL_ONLY | EducationStatisticsCalculator.astro | 無 fetch/CDN | — |
| teacher-exam-score-converter | LOCAL_ONLY | EducationStatisticsCalculator.astro | 無 fetch/CDN | — |
| this-or-that | LOCAL_ONLY | ThisOrThat.astro | 無 fetch/CDN | — |
| timestamp-converter | LOCAL_ONLY | TimestampConverter.astro | 無 fetch/CDN | — |
| url-encoder | LOCAL_ONLY | UrlEncoder.astro | 無 fetch/CDN | — |
| uuid-generator | LOCAL_ONLY | UuidGenerator.astro | 無 fetch/CDN | — |
| webp-to-jpg | LOCAL_ONLY | ImageFormatConverter.astro | 無 fetch/CDN | — |
| weighted-average-calculator | LOCAL_ONLY | EducationStatisticsCalculator.astro | 無 fetch/CDN | — |
| what-to-eat | LOCAL_ONLY | WhatToEat.astro | 無 fetch/CDN | — |
| word-counter | LOCAL_ONLY | WordCounter.astro | 無 fetch/CDN | — |
| z-score-calculator | LOCAL_ONLY | EducationStatisticsCalculator.astro | 無 fetch/CDN | — |

## 6. 與交辦背景事實的核對結果

| 交辦時給的背景事實 | 核對結果 |
|---|---|
| `tools.ts` 有 84 個 `status: 'live'` 工具 | **不符**，實際是 83 個；見第 0 節 |
| `toolWidgets.ts` 對到 `ConversionApiTool` 的只有 5 個 slug（列出的 5 個 slug 名稱） | **相符**，5 個 slug 名稱與內容完全正確 |
| 這 5 個工具會把檔案上傳到 `https://api.funnytools.win` | **相符**，見 `funnytools-api.ts` 各函式的 fetch URL |
| 這 5 個工具自己的文案已經正確，不用重複稽核 | **相符**（`src/i18n/tools/conversion-api-tools.ts` 全文找不到「不上傳/never leave」類措辭，見 `frontend-privacy-audit.md` 開頭與 `tests/privacy-claim-consistency.test.mjs` 的通過項） |
| （背景事實沒提到的部分）除了這 5 個，還有沒有其他工具會上傳檔案？ | **有**，額外發現 3 個 MIXED 工具，見第 3 節 |
