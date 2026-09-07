# 後端相依工具的必要條件檢查（任務書 §7 後半 / §13）

日期：2026-09-06
範圍：5 個 BACKEND_DEPENDENT 工具（`bulk-image-compressor`、`pdf-to-word`、`pdf-table-to-excel`、`image-to-dxf`、`pdf-compressor`），全部共用同一個元件 `src/components/tools/ConversionApiTool.astro` 與同一支 client `src/lib/funnytools-api.ts`，所以下面的檢查結果對 5 個工具都成立（差異只在各自呼叫哪個 API 函式，已在括號標出）。

**重要提醒**：容器封鎖了 `funnytools.win` / `api.funnytools.win`，以下全部結論來自靜態讀碼與邏輯推演，**沒有、也無法實際打線上 API 驗證**。任務書提到「目前線上 smoke 遇到的 HTTP 530」是既有事實，我只驗證了「如果收到 530，程式碼會怎麼處理」，沒有也不能重現那次 530 本身。

## 1. API 錯誤狀態的 UI 表現：4xx / 5xx / 網路失敗

**結論：三種情況目前走的是同一條程式路徑，顯示的文字不是統一的「失敗了」，而是直接把底層錯誤字串（可能是英文技術字串）塞進錯誤欄，缺乏依錯誤類型分流的訊息。**

證據鏈：

1. `src/lib/funnytools-api.ts:311-318` 的 `readApiError()`：
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
   - 後端若回傳 JSON 且帶 `detail` 欄位（4xx 情境常見，例如檔案格式錯誤）→ 顯示後端寫的那句話（品質取決於後端，前端無法保證是中文或使用者看得懂）。
   - 後端回傳非 JSON（例如 Cloudflare/反向代理攔截後回的 HTML 錯誤頁，530 就是這種）→ `res.json()` 丟例外，被 catch 住，退回 **`HTTP ${res.status}`** 這個純數字代碼字串，例如 `"HTTP 530"`、`"HTTP 502"`。這行字**直接**變成使用者看到的錯誤訊息（見下方第 3 點）。
2. `src/components/tools/ConversionApiTool.astro:268-271`（`fetchBlob`）與 `:274-281`（`fetchBlobWithStats`）：`!res.ok` 時一律 `throw new Error(await readApiError(res))`，不分 4xx／5xx。
3. `ConversionApiTool.astro:219-238`（`run()` 函式）：
   ```js
   } catch (caught) {
     if (currentRun === runSerial && caught?.name !== 'AbortError') {
       setError(caught instanceof PageSelectionError ? labels.invalidPages : caught instanceof Error ? caught.message : labels.failed);
       setStatus('');
     }
   }
   ```
   - `caught.message` 就是上面 `readApiError()` 回傳的字串（或瀏覽器原生 `fetch` 失敗訊息，見下）。`labels.failed`（例如「圖片壓縮失敗。」/`Image compression failed.`，`src/i18n/tools/conversion-api-tools.ts:33,59` 等）**只有在 `caught` 完全不是 `Error` 實例時才會用到**，在目前的程式路徑下（`readApiError` 保證回字串、`new Error(str)` 一定是 `Error`）幾乎不會被觸發到，所以「只有一句 generic failed」這個假設不成立——實況反而是**永遠顯示某個具體字串，但那個字串的可讀性完全不受控**。
4. 網路完全打不通（DNS 失敗、CORS 被擋、對方直接斷線）：`fetch()` 本身會 reject，丟出瀏覽器原生的 `TypeError`（Chrome 是 `"Failed to fetch"`，Firefox 是 `"NetworkError when attempting to fetch resource."`）。這個 `TypeError` 也是 `Error` 的實例，所以一樣會被 `caught.message` 顯示出來——**是英文技術字串，不會被站上的中/英 i18n 系統翻譯**，中文介面上會突然跳出一句英文。

小結：4xx／5xx／網路失敗**目前沒有分流的使用者訊息**，全部共用「把 `caught.message` 直接印出來」這一條路徑；差別只在於這個 `message` 的內容是「後端寫的話」「`HTTP xxx`」還是「瀏覽器原生英文錯誤」，三者對使用者的可理解程度天差地遠，但程式完全沒有區分處理。

## 2. Timeout / AbortController

**結論：有 `AbortController`，但只能「手動取消」，沒有自動 timeout；取消後有一個具體的顯示狀態沒有重置的小 bug。另外，關於「取消不保證後端停止」這件事，站上文案其實有講清楚（這點是好的，值得肯定）。**

- 有 `AbortController`：`ConversionApiTool.astro:219-238`，每次 `run()` 都建立新的 `AbortController`，取消按鈕（`:313`）呼叫 `controller?.abort()`。
- **沒有自動逾時**：整個檔案沒有 `setTimeout` 搭配 `abort()` 的邏輯，如果後端掛住不回應（不是直接斷線，而是連線建立了但一直不回），使用者會看到「處理中…」轉圈**轉到天荒地老**，除非自己按「取消等待」。
- **文案有誠實揭露**（值得肯定的部分）：`ConversionApiTool.astro:92` 固定顯示 `labels.cancelNote`，例如中文「取消會停止瀏覽器等待；已開始的伺服器處理不保證立即停止。」（`conversion-api-tools.ts:33` 等，5 個工具都有這行），英文對應 `"Cancel stops the browser from waiting; it does not guarantee that server CPU work already started stops immediately."`——這行文字**一直顯示**（不是取消後才出現），等於在使用者按下去之前就先講清楚後端可能還在跑，這個誠實揭露做得不錯。
- **但實測邏輯有個具體小 bug**：按下取消後，`run()` 的 catch block 判斷 `caught?.name !== 'AbortError'`（`ConversionApiTool.astro:231`），取消觸發的是 `AbortError`，所以**完全跳過** `setError()` 和 `setStatus('')`；`finally` 只重置忙碌狀態（`setBusy(false)`，按鈕恢復可按），但**沒有任何程式路徑把 `labels.processing`（例如「正在壓縮…」）改掉**。也就是說：使用者按下「取消等待」之後，按鈕恢復正常，但狀態文字仍停留在「正在壓縮…／Compressing…」，沒有變成「已取消」或空白——會讓使用者誤以為工具還在處理，其實已經被中止了。全文（`conversion-api-tools.ts`）也確實找不到任何「已取消／cancelled」的 label 字串，證實站上根本沒有設計「取消完成」這個狀態。

## 3. API 完全不可用時（例如目前線上偶發的 HTTP 530）使用者看到什麼

依第 1 節的程式邏輯精確推演（無法連線驗證，但邏輯是決定性的、非機率性的）：

1. `fetch()` 本身仍會成功拿到一個 HTTP response（530 是 Cloudflare 幫你擋下來回的頁面，不是連線失敗），所以不會走「網路失敗」那條路徑，而是走「`res.ok === false`」這條。
2. Cloudflare 的 530 錯誤頁本體通常是 **HTML**，不是 JSON，所以 `readApiError()` 裡 `await res.json()` 會拋 `SyntaxError`，被 catch 住，回傳字串字面值 **`"HTTP 530"`**。
3. 這個字串會被 `run()` 的 catch block 塞進 `setError()`，最終顯示在 `<p class="form-error" data-error role="alert">`（`ConversionApiTool.astro:90`）裡。
4. **使用者實際看到的畫面**：不是無限轉圈（因為請求最終有回應，不會卡住 pending 狀態），也不是完全空白（有文字出現在紅字錯誤欄），但文字內容就是單獨一行 **`HTTP 530`**——對一般繁體中文使用者來說，這是一串看不懂在講什麼的英數代碼，介面上沒有任何一句話告訴他「伺服器暫時掛了／請稍後再試／這不是你的檔案有問題」。同時按鈕會恢復可按（`setBusy(false)`），使用者可以重試，但不會被引導往「稍後再試」的方向想，比較像是被丟一個原始錯誤碼自己猜。

一句話結論：**API 不可用時不是無限轉圈、也不是空白錯誤，但顯示的是使用者看不懂的原始 HTTP 狀態碼字串（如 `HTTP 530`），沒有對應的人話說明，體驗介於「完全沒有回饋」與「清楚說明」之間，偏向前者。**

## 4. 檔案大小 / 型別在前端有沒有先擋

對照後端實際上限（讀自 `backend/services/common.py`／`backend/Dockerfile`／`backend/.env.example`，供比對用，未修改）：單檔 **80MB**（`MAX_SINGLE_UPLOAD_MB`，`backend/services/common.py:13`）、批次 **120MB**（`MAX_BATCH_TOTAL_MB`，`:14`）、圖片 **2500 萬像素**（`MAX_IMAGE_PIXELS`，`:15`）、PDF **200 頁**（`MAX_PDF_PAGES`，`:16`）、OCR **30 頁**（`MAX_OCR_PAGES`，`:17`）。

逐項檢查 `ConversionApiTool.astro` 和 `funnytools-api.ts` 全文（用 `.size`／`MB`／`naturalWidth`／`naturalHeight` 等關鍵字搜尋過，見下方逐項）：

| 後端限制 | 前端有沒有先擋 | 證據 |
|---|---|---|
| 單檔 80MB | **沒有** | 全檔案搜尋不到任何 `file.size > ...` 的位元組數比較；`size()` 函式（`:184`）只是把 bytes 轉成「X MB」字串**顯示**用，不是驗證閘門 |
| 批次 120MB（`bulk-image-compressor`） | **沒有** | `setSelectedFiles()`（`:240-250`）只擋「檔案數量」（超過 100 個只留前 100 個，`:245,247`），從未加總所有檔案的位元組數 |
| 圖片 2500 萬像素（`image-to-dxf`） | **沒有** | 只在 `fileInput` change handler 讀圖做「校正用預覽」（`:318`，`new Image()` 讀 `naturalWidth/naturalHeight`），從未拿這兩個值去跟任何像素上限比較 |
| PDF 200 頁 | **部分有，但用途不同** | `funnytools-api.ts:27-51` 的 `parsePageSelection()` 確實會在使用者輸入的頁碼選取字串裡擋「選取頁數 > 200」（`:46`，`too-many-pages`），數字剛好對得上後端的 200 頁上限；但這個檢查**只存在於 `pdf-table-to-excel` 的「頁碼」欄位**（`isTable` 才會渲染這個輸入框，`ConversionApiTool.astro:53`），檢查的是「你選了幾頁要抽」，不是「整份 PDF 有幾頁」——如果使用者上傳一份 500 頁的 PDF 但頁碼欄位留白（等於「全部」），這裡完全不會擋 |
| OCR 30 頁 | **沒有** | 全檔案搜尋不到任何跟 OCR 頁數比對的邏輯，`pdf-to-word` 和 `pdf-table-to-excel` 的 OCR 都無前端頁數預檢 |
| 檔案型別 | **不一致，5 個工具裡有 1 個明顯較弱** | 見下 |

型別檢查細節：
- `pdf-to-word` / `pdf-table-to-excel` / `pdf-compressor`：`requiresPdf` 集合涵蓋（`:167-168`），`isPdfFile()` 檢查 MIME 或副檔名（`:169`），選檔案時若不是 PDF 會立刻擋下並清空 input（`:297-312`）——**有做**。
- `bulk-image-compressor`：`setSelectedFiles()` 用 `file.type.startsWith('image/')` 過濾非圖片檔（`:243,246`）——**有做**。
- `image-to-dxf`：**沒有對應的型別檢查**。`requiresPdf` 集合不含這個 mode，`fileInput` change handler 對它完全沒有 `isPdfFile`-等價的型別驗證（`:297-312` 那段判斷式只在 `requiresPdf` 為真時執行），選檔案唯一的限制只剩 HTML `accept="image/jpeg,image/png,.jpg,.jpeg,.png"` 屬性（`:63`）——這只是檔案選擇對話框的「建議篩選」，使用者選「所有檔案」或用拖曳上傳都能繞過，JS 層完全沒有二次驗證。也就是說，5 個工具裡有 4 個在型別上有 JS 層防線，`image-to-dxf` 沒有，屬於不一致。

## 5. 一句話總結（給 §20 摘要用）

後端相依工具的錯誤處理「有 UI、不算無聲，但訊息品質不可控」：4xx/5xx/網路失敗共用同一條「印出底層錯誤字串」的路徑，API 完全掛掉（如 530）時使用者看到的是看不懂的 `HTTP 530` 而非人話說明；有手動取消但無自動逾時，取消後的狀態文字有個沒清乾淨的殘留 bug；檔案大小與 OCR/圖片像素/PDF 頁數的前端預檢**全部缺席**，只有檔案型別（4/5 個工具）與「選取頁碼字串裡最多 200 個」做了防線，等同讓使用者先完整上傳大檔案才在後端被拒絕，體驗與流量都浪費。
