# 瀏覽器能力偵測稽核（任務書 §13）

日期：2026-09-07
稽核者：前端相容性與無障礙稽核員（task-02-funnytools-reliability）
分支：`claude/task-02-funnytools-reliability`

## 環境限制聲明（必讀）

容器對外網路**封鎖 `funnytools.win` 與 `api.funnytools.win`**（proxy 403）。本報告**沒有、也無法**開過任何線上頁面或呼叫過線上 API。以下所有結論都只來自：

1. `src/` 原始碼逐行閱讀（widget 邏輯、`src/lib/funnytools-api.ts`、`public/sw.js`、`public/install-prompt.js`）。
2. 本機 `npm ci` + `npm run build` 產出的 `dist/`（1171 個頁面，實際建置成功，見下方各項的 `dist/_astro` 證據）。
3. 對建置產物的靜態掃描（`grep`／自寫小腳本），不涉及任何瀏覽器渲染或網路請求。

任何「使用者實際會看到什麼」的陳述，都是**對這份程式碼做決定性的邏輯推演**（不是機率性猜測、不是實測）——例如「後端回傳非 JSON 時一定會走 catch 分支」是程式碼保證的行為，但「線上這次 530 事故的根因是什麼」不在本報告範圍內，也无法在此驗證。無法用程式碼證明的地方，一律寫「無法驗證」，不做估算。

**與同批次其它稽核的關係**：`reports/task-02-reliability/frontend-backend-dependency.md`（同一 task 家族的另一位稽核者，2026-09-06）已經對 §13 的「後端相依工具 API 錯誤 UI」做過非常詳盡的逐行分析，結論與本報告 A.2 節完全一致（同一段程式碼，各自獨立驗證）。本報告在 A.2 引用該報告的結論做交叉確認，重點放在 A.1（本機工具能力偵測，該報告未涵蓋）與 A.3（離線／PWA，該報告未涵蓋）兩塊全新範圍。

---

## A.1 本機工具的瀏覽器能力偵測

### 方法

對 `src/components/tools/*.astro`（69 個檔案，`widgetBySlug` 對應到 68 個不重複元件、83 個上線工具槽位）逐一 `grep` 下列 API 字面字串，並人工檢視每個命中的上下文是否有能力偵測與退場路徑：`OffscreenCanvas`、`showSaveFilePicker`/`showOpenFilePicker`/`showDirectoryPicker`（File System Access）、`structuredClone`、`navigator.clipboard`、`navigator.share`、`createImageBitmap`、`navigator.storage`/`getDirectory`（OPFS）、`WebAssembly`、`new Worker(`、`canvas.toBlob`/`toDataURL`（含 WebP 編碼）。

### 摘要表

| API | 使用檔案數 | 有能力偵測／退場路徑？ | 風險 |
|---|---|---|---|
| `navigator.clipboard.writeText` | 43 個檔案 | **不一致**：39 個有 try/catch 或 `.catch()`；4 個完全沒有 | 🟡 中 |
| `navigator.clipboard.write`（圖片，`ClipboardItem`） | 1 個（QrCodeGenerator） | **有**，且是全站唯一正確示範 | 🟢 無 |
| `createImageBitmap` | 1 個（ImageFormatConverter，jpg-to-webp/webp-to-jpg） | **沒有**能力偵測；靠通用 try/catch 兜底 | 🟡 中 |
| `canvas.toBlob(..., 'image/webp', ...)` | 2 個槽位（jpg-to-webp、webp-to-jpg，同一元件） | **沒有**驗證輸出真的是 WebP | 🟢低（現代瀏覽器實務風險小） |
| 圖片轉 DXF 校正用 `<canvas>` 點擊 | 1 個（image-to-dxf） | 見 A.1.4，屬鍵盤能力偵測範疇的相關問題 | 🟠 中高（歸類進 mobile-a11y 報告，此處僅記錄） |
| `OffscreenCanvas` | 0 | 未使用 | N/A |
| File System Access（`showSaveFilePicker` 等） | 0 | 未使用（下載一律走 `<a download>`，相容性遠優於 File System Access API） | N/A（不是缺口，是穩健的選擇） |
| `navigator.share`（Web Share） | 0 | 未使用 | N/A |
| OPFS（`navigator.storage.getDirectory`） | 0 | 未使用 | N/A |
| `structuredClone` | 0 | 未使用 | N/A |
| `new Worker(...)`（站方自建 Worker） | 0（pdfjs-dist 內部自建 worker 不算站方程式碼） | 未使用 | N/A |
| WebAssembly（站方程式碼直接呼叫） | 0（pdfjs-dist/pdf-lib 內部可能用到，對外不可見） | N/A | N/A |

**方法論註記**：上表「未使用」的項目不是「沒查到」，是逐檔 `grep` 後**確認 0 命中**（見附錄指令），所以能明確排除「有用但沒做偵測」的可能。

### A.1.1 `navigator.clipboard.writeText`：43 個檔案裡有 4 個完全沒有失敗處理（中風險）

正確示範（`AgeCalculator.astro:219-231`）：

```js
root.querySelector('[data-copy]')?.addEventListener('click', async () => {
  if (!latestText) calculate();
  if (!latestText) return;
  try {
    await navigator.clipboard.writeText(latestText);
    toast.hidden = false;
    window.setTimeout(() => { toast.hidden = true; }, 1500);
  } catch {
    window.prompt(labels.copyResult, latestText);   // 退場路徑：跳出可手動複製的對話框
  }
});
```

以下 4 個檔案的「複製」按鈕呼叫 `navigator.clipboard.writeText(...)` **沒有 try/catch，也沒有 `.catch()`**：

| 檔案 | 行號 | 現況 |
|---|---|---|
| `src/components/tools/MarkdownPreviewer.astro` | 36 | `root.querySelector('[data-copy]')?.addEventListener('click',()=>navigator.clipboard.writeText(preview.innerHTML));` |
| `src/components/tools/TimestampConverter.astro` | 48 | `root.querySelector('[data-copy]')?.addEventListener('click', async () => { ... await navigator.clipboard.writeText(iso); });` |
| `src/components/tools/DataConverter.astro` | 114 | `root.querySelector('[data-copy]')?.addEventListener('click',()=>output.value&&navigator.clipboard.writeText(output.value));`（csv-to-json / json-to-csv 共用） |
| `src/components/tools/UuidGenerator.astro` | 36 | `root.querySelector('[data-copy]')?.addEventListener('click', () => output.value && navigator.clipboard.writeText(output.value));` |

**Clipboard API 何時會失敗**（MDN/規格已知情境，非本報告臆測）：非安全上下文（`http://` 而非 `https://`／`localhost`）、使用者拒絕剪貼簿權限、部分瀏覽器（尤其部分行動瀏覽器內嵌 WebView）完全不支援 `navigator.clipboard`。在這 4 個檔案裡，一旦發生：

- 點擊「複製」**沒有任何反應**——沒有 toast、沒有錯誤訊息、沒有 fallback 對話框。
- 瀏覽器 console 會留下一個 unhandled promise rejection，但**一般使用者看不到 console**。
- 使用者只會覺得「這個按鈕壞了」，且完全不知道還能用 Ctrl+C／手動選取文字這種替代方法，因為連提示都沒有。

`TimestampConverter.astro` 額外比其它三個更差：連**成功時的回饋都沒有**（沒有 toast，見下方 mobile-a11y 報告的重複發現）——也就是說這個按鈕無論成功或失敗，使用者體感上都是「按了沒反應」，唯一差別是資料有沒有真的進剪貼簿。

**已驗證的例外**：`QrCodeGenerator.astro:192-208` 的圖片剪貼簿（`navigator.clipboard.write` + `ClipboardItem`）是全站唯一正確處理能力偵測的地方——`if (!navigator.clipboard || typeof ClipboardItem === 'undefined') { showToast(labels.copyUnsupported); return; }`，再包一層 try/catch，失敗一樣有 `labels.copyUnsupported` 提示。這證明「怎麼做對」在這個 codebase 裡已經有現成範本，只是沒有套用到另外 4 個檔案。

**自動化驗證**：`tests/a11y-structure.test.mjs` 的「every navigator.clipboard.writeText() call has a try/catch or .catch() fallback」測試對全部 43 個檔案做過完整掃描，精確抓出這 4 個檔案，目前為紅燈（見 `reports/task-02-reliability/a11y-test-run.md`）。

### A.1.2 `createImageBitmap`：無顯式能力偵測，靠外層 try/catch 兜底（中風險）

`src/components/tools/ImageFormatConverter.astro`（`jpg-to-webp`、`webp-to-jpg` 共用）第 15 行（單行極長，關鍵片段節錄）：

```js
async function run(){
  const file=fileInput.files?.[0]; if(!file)return;
  ...
  const bitmap=await createImageBitmap(file);   // 沒有 typeof createImageBitmap === 'function' 的前置檢查
  ...
}
fileInput.addEventListener('change',()=>run().catch(()=>{error.textContent=labels.failed;error.hidden=false;}));
quality.addEventListener('input',()=>{qValue.textContent=`${quality.value}%`;run().catch(()=>{});});
root.querySelector('[data-background]')?.addEventListener('input',()=>run().catch(()=>{}));
```

- **選檔案時**（`fileInput` change）：若 `createImageBitmap` 不存在或丟例外，`.catch()` 有接住並顯示 `labels.failed`（「無法處理這張圖片。」）——不是靜默失敗，但訊息沒有解釋「你的瀏覽器可能太舊」，使用者只會覺得這張圖檔壞了，重試多次都會遇到同樣的「失敗」而摸不著頭緒。
- **調整品質滑桿或背景色時**：`.catch(()=>{})` **完全吞掉錯誤**，畫面上什麼都不會發生——但這條路徑只有在「已經成功跑過一次 `run()` 之後」才會被觸發，實務上重複失敗的機率低，列為次要問題。
- `createImageBitmap` 目前所有主流瀏覽器（含 Safari 15+）都支援，實際「完全不支援」的機率很低，但零星的舊版 WebView／精簡瀏覽器仍可能沒有，屆時使用者看到的就是「無法處理這張圖片」而非「你的瀏覽器不支援圖片格式轉換」。

### A.1.3 `canvas.toBlob(..., 'image/webp', ...)`：沒有驗證輸出真的是 WebP（低風險，但值得記錄）

同一段程式碼（`ImageFormatConverter.astro:15`）：

```js
const blob=await new Promise(resolve=>canvas.toBlob(resolve,labels.outputMime,Number(quality.value)/100));
if(!blob){error.textContent=labels.failed;error.hidden=false;return;}
...
fileName=`${file.name.replace(/\.[^.]+$/,'')}.${labels.extension}`;   // 副檔名純粹來自設定，不是 blob.type
```

`labels.outputMime` 對 `jpg-to-webp` 是 `'image/webp'`（見 `src/i18n/tools/new-utility-tools.ts:52` 的 `imageConfig()`）。規格上，若瀏覽器不支援把 canvas 編碼成某個 MIME type，`toBlob` **不會拋錯**，而是回傳它能力範圍內最接近的格式（通常靜默退回 PNG），且 callback 一樣會拿到一個非 null 的 blob——程式碼目前**沒有檢查 `blob.type === labels.outputMime`**，所以如果真的遇到不支援 WebP 編碼的瀏覽器，使用者會下載到一個副檔名是 `.webp`、內容其實是 PNG 的檔案，且介面上顯示「成功」。現代瀏覽器（Chrome/Firefox/Safari 16+）對 WebP 編碼支援已經很普及，這個情境實務發生率低，列為低風險，但因為任務書明確點名「WebP/AVIF 編碼」要檢查，故如實記錄。

### A.1.4 image-to-dxf 校正畫布：點擊是唯一互動方式，沒有鍵盤等價操作（中高風險，詳見 mobile-a11y 報告）

`src/components/tools/ConversionApiTool.astro:64`：`<canvas data-calibration hidden></canvas>`（無 `tabindex`、無 `role`、無 `aria-label`），唯一綁定的互動是 `:331` 的 `click` 事件（在圖上依序點兩點做像素↔實際距離校正）。這不是「有沒有偵測能力」的問題，而是**完全沒有鍵盤/螢幕閱讀器可用的替代輸入方式**（例如手動輸入兩點座標）。歸類細節見 `reports/task-02-reliability/mobile-a11y-audit.md` §「檔案上傳型（後端相依）」。

---

## A.2 後端相依工具（5 個）：API 不可用時使用者實際看到什麼字

範圍：`bulk-image-compressor`、`pdf-to-word`、`pdf-table-to-excel`、`image-to-dxf`、`pdf-compressor`，共用 `src/components/tools/ConversionApiTool.astro` 與 `src/lib/funnytools-api.ts`。

**已知現況**（任務指派方提供、視為既有事實）：後端近六次排程冒煙測試四次紅、`/health` 連續 4 分鐘回 HTTP 530。本節只驗證「收到這類回應時，程式碼會怎麼處理」，不重現該次事故本身。

### 錯誤字串從哪裡來：`readApiError()`

`src/lib/funnytools-api.ts:311-318`：

```ts
async function readApiError(res: Response): Promise<string> {
  try {
    const data = (await res.json()) as { detail?: string };
    return data.detail || `HTTP ${res.status}`;
  } catch {
    return `HTTP ${res.status}`;
  }
}
```

`fetchBlob`（`:268-272`）與 `fetchBlobWithStats`（`:274-281`）在 `!res.ok` 時一律 `throw new Error(await readApiError(res))`。

### 錯誤字串怎麼顯示：`ConversionApiTool.astro` 的 `run()`

`ConversionApiTool.astro:231-235`：

```js
} catch (caught) {
  if (currentRun === runSerial && caught?.name !== 'AbortError') {
    setError(caught instanceof PageSelectionError ? labels.invalidPages : caught instanceof Error ? caught.message : labels.failed);
    setStatus('');
  }
}
```

**關鍵事實**：`readApiError()` 永遠回傳一個字串，`new Error(字串)` 永遠是 `Error` 的實例，所以 `caught instanceof Error` 這個分支**幾乎每次都成立**——`labels.failed`（各工具自己的「壓縮失敗。／PDF 轉 Word 失敗。」等 i18n 訊息，例如 `src/i18n/tools/conversion-api-tools.ts:33`）**在目前的程式路徑下幾乎不會被用到**。也就是說，「後端掛掉只會顯示一句通用的失敗訊息」這個假設**不成立**——實況是**一定會顯示某個具體字串，但這個字串的可讀性完全不受控**。

### HTTP 530（現況冒煙測試會遇到的情境）時，這串字串具體是什麼

逐步推演（程式邏輯決定性成立，非機率）：

1. Cloudflare 的 530（origin 連不上）錯誤頁本體是 **HTML**，不是 JSON。
2. `readApiError()` 裡 `await res.json()` 對 HTML 內容解析會拋 `SyntaxError`，被 `catch` 接住，回傳字面值 **`"HTTP 530"`**。
3. 這個字串原封不動變成 `setError()` 的參數，顯示在 `<p class="form-error" data-error role="alert">`（`ConversionApiTool.astro:90`）。

**使用者實際看到的字（逐字）**：

```
HTTP 530
```

沒有前後文、沒有任何一句「伺服器暫時無法使用，請稍後再試」之類的人話說明，也不會被站上的中/英 i18n 系統翻譯（因為它根本不是 i18n 字串，是程式現算出來的字面值）。同一條路徑下：

- 若後端回傳 502（bad gateway，同樣是反向代理層級、非 JSON）→ 顯示 `HTTP 502`。
- 若後端有回應但真的完全斷線／DNS 失敗／CORS 被擋 → `fetch()` 本身 reject，丟出瀏覽器原生 `TypeError`（Chrome「Failed to fetch」、Firefox「NetworkError when attempting to fetch resource.」），這串英文原生錯誤訊息一樣會被 `caught.message` 直接顯示在中文介面上，突兀且不會被翻譯。
- 若後端有回應且回傳合法 JSON `{"detail": "..."}`（常見於 4xx 驗證錯誤）→ 顯示後端寫的那句話，可讀性取決於後端，前端這層無法保證。

**一句話結論**：API 不可用時**不是無限轉圈、也不是空白錯誤**（`setBusy(false)` 會讓按鈕恢復可按，紅字錯誤欄一定有內容），但顯示的是使用者看不懂的原始技術字串（如 `HTTP 530`），沒有依錯誤類型分流出「這是你的檔案問題」vs「這是我們伺服器的問題，請稍後再試」。此結論與同批次 `reports/task-02-reliability/frontend-backend-dependency.md` 第 1、3 節的獨立分析完全一致。

### 建議訊息（僅供參考，本輪未實作）

- 對 `HTTP 5xx`／`readApiError` 回傳的裸數字字串：顯示「伺服器暫時無法處理，請稍後再試；若持續發生，代表我們這邊的服務有問題，不是你的檔案有誤。」，並可視情況顯示重試按鈕。
- 對 `TypeError`（fetch 本身失敗，通常是使用者離線或網路不通）：顯示「無法連上處理伺服器，請檢查你的網路連線。」——可以搭配 `navigator.onLine` 判斷（見 A.3，這個資訊站上已經在收集，只是目前完全沒用在錯誤訊息上）。
- 對 JSON `detail`（4xx，通常是檔案本身的問題）：維持顯示後端訊息，但確保後端訊息本身有雙語版本（超出前端稽核範圍）。
- 這些分類可以在 `readApiError()`／`run()` 的 catch 分支上，用 `res.status` 區間（`>= 500` vs 網路層 `TypeError` vs 有 `detail` 的 4xx）做三分流，不需要更動 API 回傳格式。

### 交叉確認：取消狀態殘留與前端預檢缺口（沿用同批次稽核，未重複展開）

`reports/task-02-reliability/frontend-backend-dependency.md` §2、§4 已完整記錄以下兩點，本報告獨立複核程式碼後確認一致，不重複貼證據鏈：

- 有 `AbortController` 手動取消，**沒有自動逾時**；按下取消後 `labels.processing`（「正在處理…」）文字**沒有被清掉或改成「已取消」**，是一個具體殘留 bug（`ConversionApiTool.astro:231` 的 `caught?.name !== 'AbortError'` 判斷讓取消完全跳過 `setStatus('')`）。
- 檔案大小（單檔 80MB／批次 120MB）、圖片像素（2500 萬）、OCR 頁數（30 頁）**前端完全沒有預檢**；PDF 200 頁上限只在「選取頁碼字串」擋，沒擋整份 PDF 頁數；`image-to-dxf` 缺少型別檢查（其餘 4 個工具都有）。這些不是能力偵測問題，但同屬「API 不可用/過載時的使用者體驗」範疇，故在此列出交叉引用。

---

## A.3 離線行為（PWA：`sw.js` + `install-prompt.js`）

### 快取策略摘要

`public/sw.js`：

- `install` 事件只預先快取 `APP_SHELL = ['/', '/favicon.svg', '/favicon.ico', '/apple-touch-icon.png', '/manifest.webmanifest']`（`:3-9`）——**只有首頁這一個 document**，沒有任何工具頁。
- `fetch` 事件（`:53-81`）：
  - 排除跨網域、`/api/`、`/data/support-products`、廣告／分析網域（`:31-42`）。
  - `isDocument`（`request.mode === 'navigate'`）：**network-first**，失敗才退回 `cached || caches.match('/')`（`:73-76`）。
  - 其餘資源：`isCacheableAsset` 正規式 `/\.(?:css|js|svg|ico|png|jpg|jpeg|webp|woff2?)$/i`（`:11`）比對成功才會在成功回應後寫入快取（`:64-69`），比對失敗的資源永遠只能走網路，從不進快取。

### 發現 1：離線導覽到「沒被積極快取」的工具頁，會靜默跳回首頁，不是顯示該頁本身（中風險）

因為 `isCacheableAsset` 的正規式**沒有涵蓋 document（沒有副檔名的路由，如 `/tools/word-counter/`）**，也因為 `APP_SHELL` 只放了首頁，所以**任何工具頁的 HTML 本身都不會被快取**——不管使用者之前造訪過幾次。離線時對任何工具頁發出的 navigate 請求：

1. `network` 失敗（離線）。
2. `cached` 是 `undefined`（這個路由的 document 從未被存進 `CACHE_VERSION` 快取）。
3. 退回 `caches.match('/')`——**顯示首頁**，不是使用者原本要看的那個工具頁，也沒有任何「你現在離線，這是快取版首頁」的說明文字。

實務情境：使用者把 `/tools/word-counter/` 加到主畫面（PWA 已安裝，`install-prompt.js` 支援），之後在**離線狀態下重新整理或重新開啟這個捷徑**，畫面會是首頁，不是文字計數工具，且沒有任何提示告訴使用者「因為離線所以看不到原本那頁」。這對「本機工具離線是否還能用」是一個實質的負面答案：**只要牽涉到一次新的 navigate（重新整理／新分頁／從捷徑開啟），本機工具本身可能連載入都做不到**，即使頁面上的 JS 邏輯全部是本機運算、不需要網路。

（若使用者是「頁面已經開著，沒有重新整理，只是持續互動」——這種情況下頁面早就載入完成，JS 執行環境還在記憶體裡，本機工具照常可用，不受這個問題影響。這個發現只影響「離線狀態下的新導覽/重新整理」。）

`scripts/pwa-preflight.mjs`（既有稽核腳本）目前只驗證「離線廣告隱藏規則存在」（`:75`）與 SW 檔案結構關鍵字，**沒有驗證離線導覽到深層頁面的行為**，所以這個缺口過去沒有被既有稽核抓到。

### 發現 2：pdf-to-image 是唯一「用過也無法離線」的本機工具（中風險，本次稽核新發現）

大部分本機工具用到的第三方函式庫是透過動態 `import()` 延遲載入（例如 `import('qrcode')`、`import('marked')`、`import('pdf-lib')`），這些延遲載入的程式碼會被打包成獨立的 `.js` chunk（已用 `npm run build` 實際驗證，例如 `dist/_astro/marked.esm.CoZRdNy7.js`、`dist/_astro/papaparse.min.jbqUg7ph.js`），副檔名 `.js` **有**被 `CACHEABLE_ASSET_RE` 涵蓋，所以只要使用者**成功使用過一次**（線上狀態下觸發過這個 `import()`），該 chunk 就會被寫入 SW 快取，之後離線也能用。

但 `src/components/tools/PdfToImage.astro:9` 這行：

```js
pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/legacy/build/pdf.worker.min.mjs', import.meta.url).toString();
```

實際建置後，這個 worker 腳本產出的檔名是 **`dist/_astro/pdf.worker.min.D39lNQBd.mjs`**（用 `find dist/_astro -iname "*.mjs"` 實際核對過，這是整個 `dist/_astro` 目錄裡**唯一**一個 `.mjs` 檔案，其餘全是 `.js`）。`CACHEABLE_ASSET_RE`（`public/sw.js:11`）是 `/\.(?:css|js|svg|ico|png|jpg|jpeg|webp|woff2?)$/i`——**沒有 `mjs`**。結果是：

- 這個 worker 腳本**永遠不會被 Service Worker 快取**，不管使用者用過 pdf-to-image 幾次。
- 換句話說，`pdf-to-image` 是本站已知範圍內**唯一一個「即使離線前用過、離線後仍然無法運作」的本機工具**——它每次都需要重新從網路抓這個 worker 腳本，抓不到 pdfjs 就無法初始化，整個「PDF 轉圖片」功能失效。
- 這不是設計上刻意的取捨（找不到任何註解或測試提到這點），比較像是正規式沒把 `.mjs` 這個現代 ES module 副檔名考慮進去的疏漏。

### 發現 3：離線狀態偵測已存在，但只用來藏廣告，完全沒有做使用者可見的離線提示（中風險）

`public/install-prompt.js:24-30`：

```js
function syncOnlineState() {
  document.documentElement.dataset.offline = navigator.onLine ? 'false' : 'true';
}
syncOnlineState();
window.addEventListener('online', syncOnlineState);
window.addEventListener('offline', syncOnlineState);
```

這串邏輯**唯一**的消費者是 `src/styles/global.css:1450`：

```css
[data-offline="true"] .ad-slot { display: none; }
```

也就是說，站上**已經**掌握「使用者現在是否離線」這個資訊（`<html data-offline="true">`），但**唯一用途是隱藏 AdSense 廣告**——沒有任何橫幅、提示文字或 UI 元件根據 `data-offline` 顯示「你目前離線，部分功能可能無法使用」。這代表：

- 上述發現 2（pdf-to-image 離線失效）發生時，使用者只會看到工具本身丟出的通用「無法處理」訊息，網站不會主動告訴他「你現在離線，這就是原因」——即使站方程式碼裡其實已經知道使用者離線。
- 這是一個**低成本、高回報**的改進點：`data-offline` 這個 attribute 已經存在，只差在 UI 上加一個提示區塊消費它。

### A.3 小結

| 情境 | 現況 | 風險 |
|---|---|---|
| 已載入頁面，未重新整理，離線後繼續操作本機工具 | 正常（JS 已在記憶體中執行） | 🟢 無 |
| 離線後重新整理／新分頁開啟工具頁（除首頁外） | 靜默顯示首頁，不是原本工具頁，無說明 | 🟡 中 |
| pdf-to-image 離線使用（不論之前是否用過） | 一律失敗（worker `.mjs` 不在快取白名單） | 🟡 中 |
| 後端相依 5 個工具離線使用 | 一律失敗，錯誤訊息與 A.2 的 5xx／網路失敗共用同一條路徑（`TypeError`「Failed to fetch」等），未特別標示「你已離線」 | 🟡 中 |
| 使用者是否離線這件事 | 網站程式碼已經知道，但完全沒有告訴使用者 | 🟡 中（低成本可修） |

---

## 風險總表（A.1–A.3）

| # | 發現 | 位置 | 風險 | 這次稽核性質 |
|---|---|---|---|---|
| 1 | 4 個工具的剪貼簿複製完全沒有失敗處理 | MarkdownPreviewer.astro:36、TimestampConverter.astro:48、DataConverter.astro:114、UuidGenerator.astro:36 | 🟡 中 | 新發現，已寫自動化測試 |
| 2 | `createImageBitmap` 無顯式能力偵測 | ImageFormatConverter.astro:15 | 🟡 中 | 新發現 |
| 3 | WebP 編碼輸出未驗證 `blob.type` | ImageFormatConverter.astro:15 | 🟢 低 | 新發現 |
| 4 | image-to-dxf 校正畫布無鍵盤替代操作 | ConversionApiTool.astro:64,331 | 🟠 中高 | 新發現（詳見 mobile-a11y 報告） |
| 5 | 5 個後端相依工具，API 不可用時顯示裸 HTTP 狀態碼字串 | funnytools-api.ts:311-318、ConversionApiTool.astro:233 | 🟡 中 | 與同批次稽核交叉確認一致 |
| 6 | 取消等待後「處理中」文字沒清掉 | ConversionApiTool.astro:231 | 🟢 低 | 與同批次稽核交叉確認一致 |
| 7 | 離線導覽到工具頁會靜默跳回首頁 | public/sw.js:11,73-76 | 🟡 中 | 新發現 |
| 8 | pdf-to-image 的 worker 腳本 `.mjs` 不在 SW 快取白名單，離線恆失敗 | public/sw.js:11、PdfToImage.astro:9 | 🟡 中 | 新發現 |
| 9 | 已知離線狀態但無使用者可見提示 | install-prompt.js:24-30、global.css:1450 | 🟡 中 | 新發現 |

---

## 附錄：確認「未使用」時跑過的指令（供覆核）

```
grep -rn "OffscreenCanvas\|showSaveFilePicker\|showOpenFilePicker\|showDirectoryPicker\|navigator\.share\b\|navigator\.storage\|StorageManager\|WebAssembly\|new Worker(" src/
grep -rn "structuredClone" src/
```
兩者在 `src/` 下皆為 0 命中（未計入 `node_modules`）。
