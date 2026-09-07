# Download Gate 遷移報告（task-02 reliability）

- 分支：`claude/task-02-funnytools-reliability`
- 日期：2026-09-07
- 環境限制：對外網路封鎖 `funnytools.win` 與 `api.funnytools.win`（proxy 403）。
  **本報告沒有做任何線上驗證**，所有結論只來自原始碼與本機 `npm run build` 產物。

---

## 1. 一句話總結

把 email download gate 從 3 個「真的在瀏覽器本機跑」的工具（`image-compressor`、
`qr-code-generator`、`merge-pdf`）拿掉，改掛到 5 個「本來就會把檔案上傳」的轉檔工具
（`bulk-image-compressor`、`pdf-to-word`、`pdf-table-to-excel`、`image-to-dxf`、
`pdf-compressor`），並把這 5 個工具的隱私文案改成同時揭露「轉換上傳」與「寄送上傳」兩段。
測試從 14 紅 61 綠變成 **76 全綠**，且新斷言是防止復發的護欄，不是放寬條件。

---

## 2. 程式改動

### 2.1 三個本機工具移除 gate

| 檔案 | 改動 |
|---|---|
| `src/components/tools/ImageCompressor.astro` | 移除 `requestGatedDownload` import；下載按鈕改為 `downloadButton.addEventListener('click', localDownload)`；順手移除因此變成死變數的 `outputBlob`（原本只餵給 gate 的 `getFile()`） |
| `src/components/tools/QrCodeGenerator.astro` | 移除 import；把原本的 `localDownload()` 直接改名成 `download()`（`[data-download]` 的既有 handler），刪掉中間那層 gate 包裝 |
| `src/components/tools/MergePdf.astro` | 移除 import；`merge()` 成功後直接 `downloadPdf(bytes, filename); setStatus(labels.downloaded);`（就是原本 gate 的 `fallback`）；同步更新 `setBusy()` 裡提到 gate 面板的註解 |

這三個工具的文案**完全沒有改動**——移除 gate 後它們的「不上傳」宣稱重新變成真的。

### 2.2 `ConversionApiTool.astro` 加上 gate

```js
downloadButton?.addEventListener('click', () => {
  // Only offer the email download gate once a conversion actually
  // produced a file; on an error state there is nothing to deliver.
  if (!outputBlob) return;
  const blob = outputBlob;
  const filename = outputName;
  const directDownload = () => downloadBlob(blob, filename);
  requestGatedDownload({
    tool: mode,
    anchor: root.querySelector('.actions'),
    getFile: () => ({ blob, filename }),
    fallback: directDownload,
  });
});
```

- `getFile()` 回傳的是**轉檔後的產出 blob 與檔名**（元件既有的 `outputBlob` / `outputName`）。
- `fallback` 是原本那一行 `downloadBlob(outputBlob, outputName)`，端點連不上／伺服器錯誤／
  伺服器回 `delivery: 'local'` 三種情況都會走它，使用者拿得到檔案。
- 只有 `outputBlob` 存在時才觸發：`run()` 在錯誤路徑會 `clearOutput()` 並讓下載鍵維持
  `disabled`，加上這裡的 `if (!outputBlob) return;` 雙重保險，錯誤狀態不會叫出 gate。
- `tool` 傳的是 `mode`（＝ slug），所以 GA4 的 `tool_id` 仍然分得出是哪一個轉檔工具。

### 2.3 gate 設定改成只注入給有用到的工具（**這是 dist 實證的關鍵**）

原本 `src/layouts/ToolLayout.astro` 只要 `SITE.features.downloadGate === true`
就在**每一個工具頁**注入 `data-download-gate-config`。若不改，三個本機工具的頁面即使
元件已經不呼叫 gate，HTML 裡仍然會留著設定標籤。

- 新增 `src/lib/downloadGateTools.ts`：`DOWNLOAD_GATE_SLUGS`（5 個 slug）＋ `usesDownloadGate(slug)`，
  作為「哪些工具走 gate」的單一事實來源。
- `ToolLayout.astro`：
  ```ts
  const downloadGateConfig = SITE.features.downloadGate && usesDownloadGate(tool.slug)
    ? JSON.stringify({ lang, labels: ui.downloadGate })
    : null;
  ```

`SITE.features.downloadGate` 仍是 `true`（未改），`backend/`、`.github/` 未改，
CSP 的 `connect-src` 已含 `https://roomfeng.win`（newsletter 也用），不需改動。

### 2.4 `src/lib/downloadGate.client.ts`：兩個為了讓文案成立而必要的修改

> ⚠️ 這兩點**超出交辦清單**，但不做的話第 3 節要求的文案寫不出真話。詳見第 6 節。

1. **加入「不用寄送，直接下載檔案」按鈕**。原本面板只有 email 表單，
   `fallback` 只在請求失敗時才會被呼叫——換句話說**不想給 email 的使用者根本拿不到檔案**。
   新按鈕不發任何請求（不送 email、不送檔案），直接呼叫 `request.fallback()` 並收起面板，
   GA4 沿用既有事件 `gate_fallback_local`，`reason: 'user_skipped'`（**沒有新增 GA4 事件名稱**）。
2. **移除「記得 email 就自動送出」的行為**。原本 `requestGatedDownload()` 在 localStorage
   有 `ft_gate_email` 時會隱藏表單並**直接把新的產出檔案送出去**（`downloadGate.client.ts` 舊版第 295 行起）。
   現在記住的 email 只用來**預填**表單，每次下載都要使用者自己按一次「寄給我」。
   連帶移除已無用的 `clearEmail()` 與 `changeEmail` 標籤，改為新標籤 `skip`（zh/en 皆補上）。

`MAX_EMAIL_FILE_BYTES = 5MB` 的限制沒有動：>5MB 的產出不會被夾帶到 gate 請求裡
（email 仍會送出），伺服器通常會回 local delivery，於是走 `fallback` 直接下載。

---

## 3. 新的隱私文案全文（`src/i18n/tools/conversion-api-tools.ts` 的 `privacy`）

這一個字串同時是 5 個轉檔工具的 `privacyNote`，也是它們 FAQ「檔案會留在伺服器嗎？／
Are my files retained?」的答案。

### 3.1 修改前

- zh：`檔案只為轉換而上傳，於請求期間暫時處理，完成後不會刻意保留。請勿上傳不必要的個人或機密資料。`
- en：`Files are uploaded only for conversion, processed temporarily, and not intentionally retained after the request completes. Do not upload unnecessary personal or confidential data.`

### 3.2 修改後（全文）

**zh**

> 檔案會上傳到 FunnyTools Conversion API 進行轉換，於請求期間暫時處理，完成後不會刻意保留。下載時若選擇把成品寄到信箱，產出檔案與你填寫的 email 會再送到寄送服務（roomfeng.win）並用於新工具通知；選擇直接下載則不會有第二次上傳。請勿上傳不必要的個人或機密資料。

**en**

> Files are uploaded to the FunnyTools Conversion API for conversion, processed temporarily, and not intentionally retained after the request completes. If you choose to have the result emailed to you, the output file and the address you type are then sent to the delivery service on roomfeng.win and used for new-tool updates; choosing the plain download instead sends nothing further. Do not upload unnecessary personal or confidential data.

### 3.3 每一句的依據（沒有寫超過證據的東西）

| 句子 | 依據 |
|---|---|
| 上傳到 Conversion API 轉換 | `src/lib/funnytools-api.ts` + `ConversionApiTool.astro`（`apiBase` 預設 `https://api.funnytools.win`） |
| 「於請求期間暫時處理，完成後不會刻意保留」 | **沿用原文案的既有措辭**，未加強。後端 `backend/services/*.py` 是記憶體內處理，但我沒有保留政策的書面證據，所以維持這個有保留餘地的講法 |
| 選擇寄送時，產出檔案 + email 會送到 roomfeng.win | `downloadGate.client.ts` 的 `submitGate()`：`formData.set('file', file.blob, ...)` + `formData.set('email', ...)` POST 到 `SITE.downloadGateEndpoint = https://roomfeng.win/api/download-gate` |
| 「並用於新工具通知」 | `ui.downloadGate.desc` / `privacyNote` 本來就寫了會用於新工具通知 |
| 「選擇直接下載則不會有第二次上傳」 | 2.4 新增的 skip 按鈕：純本機 `fallback()`，**不發任何請求** |

**刻意沒有寫的**：對 roomfeng.win 寄送服務的任何保留期限宣稱（例如「立即刪除」）——
我在這個 repo 裡找不到 `roomfeng.win/api/download-gate` 的實作，無從佐證。

---

## 4. 與 gate 無關的事實錯誤修正

### 4.1 `src/content/seo-guides/task-003/01-compress-pdf-to-upload-limit.md`

（任務描述寫的是 `task-004/`，實際檔案在 `task-003/`，即測試鎖定的同一份。）

線上 `/tools/pdf-compressor/` 走 `ConversionApiTool` → 上傳到 Conversion API；
後端 `backend/services/common.py:13` 是 `FUNNYTOOLS_MAX_UPLOAD_MB = 80`；
`backend/services/pdf_compress.py:12-13` 的 `balanced`（max_dimension 1800 / quality 82）
與 `strong`（1200 / 72）**會重新壓縮並縮小點陣圖片**，只有 `lossless` 不動圖片。

| # | 位置 | 原文（錯） | 改為 |
|---|---|---|---|
| 1 | 速答框 | 「目前做的是**瀏覽器本機 PDF 結構重新整理，不會重新採樣圖片…**」 | 改成上傳到 Conversion API，並說明 Lossless／Balanced／Strong 三種模式的差別 |
| 2 | 第四節條列 | 「在瀏覽器本機處理」 | 「由瀏覽器把檔案上傳到 FunnyTools Conversion API 處理」 |
| 3 | 第四節條列 | 「**不會降低內嵌圖片解析度**」 | 「**Lossless 模式不改動內嵌圖片；Balanced（預設）與 Strong 會重新壓縮並縮小過大的點陣圖片**」（見下方「額外修正」） |
| 4 | 第四節條列 | 「單檔輸入上限為 **40MB**」 | 「單檔輸入上限為 **80MB**」 |
| 5 | 第四節條列 | （無） | 補一行「偵測到數位簽署 PDF 會直接拒絕處理」（`pdf_has_signature`，與工具頁 `signatureNote` 一致） |
| 6 | 第十三節標題與內文 | 「超過 FunnyTools 40MB 上限」／「會阻止超過 40MB 的輸入」 | 80MB |
| 7 | 第十三節結語 | 「瀏覽器本機工具並不適合所有數百 MB 文件」 | 「線上轉換服務並不適合所有數百 MB 文件」 |
| 8 | 第十四節 | 「本機 PDF 工具通常需要…」把記憶體瓶頸套在壓縮工具上 | 改為明講「合併、拆分、擷取頁面」才是本機工具，壓縮工具的瓶頸是上傳頻寬與等待時間 |
| 9 | FAQ「可以保證壓到 10MB 嗎」 | 「工具做的是結構最佳化，不會重採樣圖片」 | 依三種模式改寫 |
| 10 | FAQ「一定會變糊嗎」 | 「FunnyTools 目前不降低內嵌圖片解析度」 | 依三種模式改寫 |
| 11 | FAQ「超過 40MB 怎麼辦」 | 40MB | 80MB |
| 12 | 頁面 CTA | 「你的 PDF 低於 40MB…做本機結構最佳化」 | 「低於 80MB…用 Lossless 模式做結構最佳化」 |

保留未動：`og_title` 與第五節的「40MB → 10MB」——那是**舉例的壓縮比例**，不是上限宣稱。
沒有新增頁面、沒有動 `slug` / `canonical` / 內部連結、沒有做 SEO 擴張。

**額外修正說明（第 3、9、10 項）**：交辦只列了「本機處理」與「上限數字」兩項，
但同一份指南裡「不會降低內嵌圖片解析度」對 Balanced（預設模式！）與 Strong 是假的。
把前兩項改對、卻把第三個假宣稱留在旁邊，等於明知故犯，所以一併更正。

### 4.2 `src/components/tools/PdfCompressor.astro` —— **沒有刪除，因為它不是死元件**

稽核說它「未被任何地方引用」。整個 repo grep 的結果是**有兩個線上路由在用它**：

```
$ grep -rn "tools/PdfCompressor\|PdfCompressor\.astro" . | grep -v node_modules | grep -v ./dist | grep -v ./backup | grep -v ./reports
./src/pages/es/herramientas/comprimir-pdf.astro:2:import PdfCompressor from '../../../components/tools/PdfCompressor.astro';
./src/pages/fr/outils/compresser-pdf.astro:2:import PdfCompressor from '../../../components/tools/PdfCompressor.astro';
./tests/privacy-claim-consistency.test.mjs:235:// src/components/tools/PdfCompressor.astro almost verbatim, including its
./tests/privacy-claim-consistency.test.mjs:258:    `guide states a ${guideLimitMatch[1]}MB single-file limit; ...
```

（後兩筆只是舊測試的註解文字。）而且兩條路由都真的有產物：
`dist/es/herramientas/comprimir-pdf/index.html`、`dist/fr/outils/compresser-pdf/index.html`。

依照交辦的「若有任何引用就不要刪」，**檔案保留**。副作用見第 6 節第 (3) 點。

### 4.3 為了讓測試在「不放寬斷言」的前提下轉綠，額外修的兩處文案

這兩處紅燈**與 download gate 無關**，是稽核清單裡本來就存在、老闆裁決不會自動修好的假宣稱：

| 檔案 | 原文 | 改為 | 為什麼是假的 |
|---|---|---|---|
| `src/data/categoryContent.ts` → `image` 分類 intro（zh 第 3 段） | 「因為所有處理都在本機完成…無需擔心檔案外流。」 | 「這幾個工具在瀏覽器本機完成處理；批次圖片壓縮與圖片轉 DXF 則會把檔案送到 Conversion API，處理含個人資訊或尚未公開的圖片前，請先看工具頁上的處理說明。」 | `image` 分類含 `bulk-image-compressor`（`privacyLevel: 'anonymous-api'`），且**同一段 intro 的第 1 段自己就寫了**「批次壓縮與 DXF 向量化會暫時把檔案送到 Conversion API」——自相矛盾 |
| `src/data/categoryContent.ts` → `draw` 分類 intro（zh 第 3 段） | 「所有繪製都在瀏覽器本機完成，免註冊也免安裝。」 | 「繪圖與圖表製作在瀏覽器本機完成，免註冊也免安裝；同分類的圖片轉 DXF 屬於轉檔工具，會把圖片送到 Conversion API 處理。」 | `draw` 分類含 `image-to-dxf`（`tools.ts:1163`，`anonymous-api`） |

以及 `src/data/seoGuides.ts` 的 `merge-pdf-private-guide`：`merge-pdf` 移除 gate 後
本機宣稱重新成立，但這篇「免上傳」文章的 CTA 把**會上傳的** PDF 壓縮工具也包進
「全程檔案不離開你的裝置」裡：

- zh CTA：`…再用擷取頁面與壓縮工具收尾，全程檔案不離開你的裝置。`
  → `…再用擷取頁面工具收尾，全程檔案不離開你的裝置。`
- en CTA：`Use the no-upload merge tool, with page extraction and compression tools as backup — your files never leave your device.`
  → `Use the no-upload merge tool with page extraction as backup — your files never leave your device.`
- zh FAQ 4：補上「（這個工具會把檔案上傳到 Conversion API 處理）」
- en FAQ 4：補上 `(the compressor uploads your file to the Conversion API)`

`relatedToolIds` **沒有動**（不改內部連結結構）；只是不再讓「不離開裝置」的句子涵蓋它。

---

## 5. 測試改寫（14 紅 → 76 全綠，且斷言變強不變弱）

### 5.1 `tests/privacy-claim-consistency.test.mjs`

- `FORBIDDEN_PATTERNS` **一個字都沒改**（13 條 regex 原樣保留）。
- 刪掉的斷言：針對 `image-compressor.ts` / `merge-pdf.ts` / `qr-code-generator.ts`
  文案與 blurb 的「不得有絕對不上傳宣稱」——因為那些宣稱現在是**真的**。
- 換上的護欄（就是防止復發的那一層）：
  - `ImageCompressor.astro` / `MergePdf.astro` / `QrCodeGenerator.astro`
    **不得含有 `requestGatedDownload`，也不得 import `downloadGate.client`**（三個獨立測試）。
  - 這三個 slug 在 registry 必須是 `privacyLevel: 'local-only'`。
- 新增（把「文案搬家」擋掉）：
  `conversion-api-tools.ts privacy copy discloses BOTH the conversion upload and the email delivery upload`
  ——共用的 `privacy.zh` / `privacy.en` 必須同時出現 `Conversion API`、email 寄送、`roomfeng.win`。
- 擴大範圍：toolBlurbs 的絕對宣稱檢查從「3 個本機工具」改成「**5 個上傳工具**」。
- 保留：`image` / `draw` / `pdf` 分類 intro 的絕對宣稱檢查（原樣，只拿掉標題的 `(currently failing)`）。
- `merge-pdf-private-guide`：改成「本機宣稱可以，但**不得把宣稱套在壓縮工具身上**」
  ——逐一取出條目內所有字串常值，凡是命中 `FORBIDDEN_PATTERNS` 的字串就不得同時出現
  `壓縮`／`compress`；並新增一條斷言要求指南必須揭露壓縮工具會上傳。
- `compress-pdf-to-upload-limit.md` 兩條原樣保留（只拿掉 `(currently failing)`）；
  上限那條仍然是**動態讀 `backend/services/common.py` 的 `FUNNYTOOLS_MAX_UPLOAD_MB` 來比對**，
  不是寫死 80。

### 5.2 `tests/tool-dependency-map.test.mjs`

- 保留：live tool 解析、widget/content 註冊完整性、`widgetBySlug` 無孤兒、
  `EXPECTED_BACKEND_DEPENDENT_SLUGS` 鎖定 5 個、5 個必須是 `anonymous-api`。
- 舊的「MIXED slug 鎖定 3 個」與「MIXED 不得是 local-only」**換成 4 條更嚴的**：
  1. `the email download gate is only wired into ConversionApiTool`
     ——掃描 `src/components/tools/*.astro`，含 `requestGatedDownload` 的元件集合必須**恰好等於** `['ConversionApiTool']`。
  2. `every gated component only serves the BACKEND_DEPENDENT slugs`
     ——這些元件對應到的 slug 集合必須等於那 5 個。
  3. `DOWNLOAD_GATE_SLUGS matches the BACKEND_DEPENDENT slug list`
     ——解析 `src/lib/downloadGateTools.ts` 的清單，必須等於那 5 個。
  4. `ToolLayout only injects the download-gate config for the gated slugs`
     ——`ToolLayout.astro` 必須用 `usesDownloadGate(tool.slug)` 收斂注入範圍。
  5. `the formerly gated tools are browser-local and tagged local-only`。
- 「新增上傳型工具沒登記就紅燈」的效果**被保留且加強**：
  新工具接上 `ConversionApiTool` 卻沒進 `EXPECTED_BACKEND_DEPENDENT_SLUGS` → 第 (2) 條紅；
  沒進 `DOWNLOAD_GATE_SLUGS` → 第 (3) 條紅（而且它的 gate 根本不會被注入）；
  新元件自己去 import gate → 第 (1) 條紅。
- 所有測試名稱裡的 `(currently failing)` 已全部移除（`grep -c "currently failing" tests/` = 0）。

### 5.3 護欄有效性實測（把 gate 加回 ImageCompressor 再跑）

```
=== 回歸護欄驗證：把 gate 加回 ImageCompressor 後 ===
not ok 5 - ImageCompressor.astro (image-compressor) does not route downloads through the upload gate
not ok 23 - the email download gate is only wired into ConversionApiTool
not ok 24 - every gated component only serves the BACKEND_DEPENDENT slugs
not ok 27 - the formerly gated tools are browser-local and tagged local-only
# pass 23
# fail 4
=== 還原後 ===
# pass 27
# fail 0
```

---

## 6. 我判斷需要老闆／派工者拍板的地方

**(1) 沒有「不寄送」選項時，gate 等於扣住使用者的檔案。**
交辦第 3 點要求文案寫「不寄送時不會有第二次上傳」，但改造前的 gate 面板只有 email 表單，
`fallback` 只在請求失敗時才跑——使用者若不給 email 就拿不到檔案，那句話寫不出來。
我因此在面板加了「不用寄送，直接下載檔案」。**這會讓一部分本來會硬填 email 的人不填，
lead 數量可能下降。** 如果老闆要拿掉這個按鈕，那第 3 點的文案就得改成
「下載需要提供 email」，不能寫「不寄送時不會有第二次上傳」。

**(2) 舊的「記住 email 就自動送出」是無同意的二次上傳。**
舊行為是：回訪者一按下載，**新產生的檔案**在沒有任何確認的情況下就被送到 roomfeng.win。
這讓「**選擇**用 email 寄送時」這句話對回訪者是假的，所以我改成只預填、要按一次才送。
若老闆想恢復自動寄送，文案必須改寫成「填過一次 email 後，之後的下載會自動以同一信箱寄送」。

**(3) `pdf-compressor` 在不同語系是兩套不同的工具（既有問題，我沒有動）。**
`/tools/pdf-compressor/`（zh/en）＝ `ConversionApiTool`，上傳、上限 80MB、Balanced 會重壓圖片；
`/es/herramientas/comprimir-pdf/` 與 `/fr/outils/compresser-pdf/` ＝ 本機 `PdfCompressor.astro`，
不上傳、上限 40MB。兩者共用 `routeKey="pdf-compressor"`。稽核把這個元件當成死碼是誤判。
**建議另開任務**決定：把 es/fr 也切到 Conversion API，或明確承認這是兩套實作並讓兩邊文案各自說實話。
我沒有改，因為那會動到 es/fr 路由的工具行為，超出本次授權。

**(4) 對 roomfeng.win 寄送服務的資料保留完全沒有證據。**
`https://roomfeng.win/api/download-gate` 的實作不在這個 repo。新文案只說「會送到寄送服務」，
沒有任何保留期限或刪除承諾。若要對外宣稱保留政策，需要先拿到那支 Pages Function 的實作或書面政策。

**(5) `ui.downloadGate.sentLocal` 的措辭在失敗路徑上不精確（既有問題，未改）。**
端點連不上時會顯示「這個檔案較大，已直接為你下載；**新工具通知會寄到你的信箱**」——
但那次請求根本沒送達，不會有任何通知。屬於既有文案問題，不在本次授權範圍，列此備查。

**(6) `image` / `draw` 分類 intro 與 merge-pdf 指南 CTA 的修正超出交辦清單。**
這 4 個紅燈與 download gate 無關（是 `bulk-image-compressor`、`image-to-dxf`、`pdf-compressor`
造成的既有假宣稱），老闆的裁決不會自動修好它們。要在「不放寬斷言」的前提下讓測試全綠，
只能把文案改對。改動範圍限縮在出錯的那幾句，沒有新增頁面、沒有動 route/canonical/schema。

---

## 7. 驗證輸出（全部為本機真實輸出）

### 7.1 `npm run lint`

```
> funnytools@5.138.2 lint
> eslint "src/**/*.ts"

LINT_EXIT=0
```

### 7.2 `npm run typecheck`

```
> funnytools@5.138.2 typecheck
> tsc --noEmit --project tsconfig.typecheck.json

TYPECHECK_EXIT=0
```

### 7.3 `npm run build`

```
03:23:46 ✓ Completed in 4.69s.

03:23:46 [build] ✓ Completed in 16.26s.
03:23:46 [build] 1171 page(s) built in 16.52s
03:23:46 [build] Complete!
```

### 7.4 `node --test tests/*.test.mjs`

改動前（基準）：

```
1..75
# tests 75
# suites 0
# pass 61
# fail 14
```

改動後：

```
1..76
# tests 76
# suites 0
# pass 76
# fail 0
# cancelled 0
# skipped 0
# todo 0
# duration_ms 787.951052
```

本次相關的測試逐條：

```
ok 36 - conversion-api-tools.ts (the 5 upload tools) makes no absolute no-upload claim
ok 37 - tools.ts `short` field for the 5 upload tools makes no absolute no-upload claim
ok 38 - categoryContent.ts toolBlurbs for the 5 upload tools make no absolute no-upload claim
ok 39 - conversion-api-tools.ts privacy copy discloses BOTH the conversion upload and the email delivery upload
ok 40 - ImageCompressor.astro (image-compressor) does not route downloads through the upload gate
ok 41 - MergePdf.astro (merge-pdf) does not route downloads through the upload gate
ok 42 - QrCodeGenerator.astro (qr-code-generator) does not route downloads through the upload gate
ok 43 - the browser-local tools are tagged local-only in the registry
ok 44 - categoryContent.ts 'image' category intro makes no unqualified all-local claim
ok 45 - categoryContent.ts 'draw' category intro makes no unqualified all-local claim
ok 46 - categoryContent.ts 'pdf' category intro makes no unqualified all-local claim
ok 47 - merge-pdf-private-guide (zh) keeps its no-upload claim off the uploading compressor
ok 48 - merge-pdf-private-guide (en) keeps its no-upload claim off the uploading compressor
ok 49 - merge-pdf-private-guide links to pdf-compressor and discloses that it uploads
ok 50 - compress-pdf-to-upload-limit.md does not claim PDF Compressor runs locally
ok 51 - compress-pdf-to-upload-limit.md single-file limit matches the live backend limit
ok 70 - BACKEND_DEPENDENT slug list (ConversionApiTool) is locked to the known 5
ok 71 - BACKEND_DEPENDENT slugs are tagged anonymous-api in the registry, not local-only
ok 72 - the email download gate is only wired into ConversionApiTool
ok 73 - every gated component only serves the BACKEND_DEPENDENT slugs
ok 74 - DOWNLOAD_GATE_SLUGS matches the BACKEND_DEPENDENT slug list
ok 75 - ToolLayout only injects the download-gate config for the gated slugs
ok 76 - the formerly gated tools are browser-local and tagged local-only
```

---

## 8. `dist/` 實證（真實 grep 輸出）

### 8.1 三個本機工具的頁面：**不再**含 `data-download-gate-config`

```
$ for f in dist/tools/image-compressor/index.html dist/tools/qr-code-generator/index.html \
           dist/tools/merge-pdf/index.html dist/en/tools/image-compressor/index.html \
           dist/en/tools/qr-code-generator/index.html dist/en/tools/merge-pdf/index.html; do
    printf '%-52s %s\n' "$f" "$(grep -c 'data-download-gate-config' "$f")"; done

dist/tools/image-compressor/index.html               0
dist/tools/qr-code-generator/index.html              0
dist/tools/merge-pdf/index.html                      0
dist/en/tools/image-compressor/index.html            0
dist/en/tools/qr-code-generator/index.html           0
dist/en/tools/merge-pdf/index.html                   0
```

### 8.2 五個轉檔工具的頁面：**有** `data-download-gate-config`

```
dist/tools/bulk-image-compressor/index.html          1
dist/tools/pdf-to-word/index.html                    1
dist/tools/pdf-table-to-excel/index.html             1
dist/tools/image-to-dxf/index.html                   1
dist/tools/pdf-compressor/index.html                 1
dist/en/tools/bulk-image-compressor/index.html       1
dist/en/tools/pdf-to-word/index.html                 1
dist/en/tools/pdf-table-to-excel/index.html          1
dist/en/tools/image-to-dxf/index.html                1
dist/en/tools/pdf-compressor/index.html              1
```

### 8.3 全站 1171 頁中，只有這 10 頁帶 gate 設定

```
$ grep -rl 'data-download-gate-config' dist --include=*.html | sort
dist/en/tools/bulk-image-compressor/index.html
dist/en/tools/image-to-dxf/index.html
dist/en/tools/pdf-compressor/index.html
dist/en/tools/pdf-table-to-excel/index.html
dist/en/tools/pdf-to-word/index.html
dist/tools/bulk-image-compressor/index.html
dist/tools/image-to-dxf/index.html
dist/tools/pdf-compressor/index.html
dist/tools/pdf-table-to-excel/index.html
dist/tools/pdf-to-word/index.html
--- 總數: 10
```

### 8.4 gate 端點只被打包進 ConversionApiTool 的 chunk

```
$ grep -rl 'roomfeng.win/api/download-gate' dist/_astro/
dist/_astro/ConversionApiTool.astro_astro_type_script_index_0_lang.DIMUbzig.js

--- 該 chunk 被哪些頁面載入 ---
dist/en/tools/bulk-image-compressor/index.html
dist/en/tools/image-to-dxf/index.html
dist/en/tools/pdf-compressor/index.html
dist/en/tools/pdf-table-to-excel/index.html
dist/en/tools/pdf-to-word/index.html
dist/tools/bulk-image-compressor/index.html
dist/tools/image-to-dxf/index.html
dist/tools/pdf-compressor/index.html
dist/tools/pdf-table-to-excel/index.html
dist/tools/pdf-to-word/index.html
```

### 8.5 三個本機工具的頁面所載入的所有 JS 都不含 gate

`QrCodeGenerator` 與 `MergePdf` 有自己的 chunk；`ImageCompressor` 因為不再 import 共用模組，
被 Astro 內聯進頁面本身。三者都乾淨：

```
$ f=dist/_astro/QrCodeGenerator.astro_astro_type_script_index_0_lang.bg1dU7sI.js
  grep -c 'download-gate\|ft_gate_email' "$f"      -> 0
$ f=dist/_astro/MergePdf.astro_astro_type_script_index_0_lang.CHUvLN2K.js
  grep -c 'download-gate\|ft_gate_email' "$f"      -> 0

$ for j in $(grep -o '/_astro/[A-Za-z0-9._-]*\.js' dist/tools/image-compressor/index.html | sort -u); do
    printf '%-72s gate_hits=%s\n' "$j" "$(grep -c 'download-gate\|ft_gate_email\|ft-gate' "dist$j")"; done
/_astro/NewsletterSignup.astro_astro_type_script_index_0_lang.DXzacPWd.js gate_hits=0
/_astro/ToolCard.astro_astro_type_script_index_0_lang.BtLx8zij.js        gate_hits=0
/_astro/ToolLayout.astro_astro_type_script_index_0_lang.DNuSGaUc.js      gate_hits=0
/_astro/_slug_.astro_astro_type_script_index_0_lang.Dgrw9Vme.js          gate_hits=0

$ for p in 'data-download-gate-config' 'download-gate' 'ft_gate_email' 'ft-gate' 'roomfeng.win/api'; do
    printf '%-28s %s\n' "$p" "$(grep -c "$p" dist/tools/image-compressor/index.html)"; done
data-download-gate-config    0
download-gate                0
ft_gate_email                0
ft-gate                      0
roomfeng.win/api             1
```

最後那筆 `roomfeng.win/api` 是**電子報表單**，與 download gate 無關（只送 email，不送檔案）：

```
<form class="newsletter-form" method="post" action="https://roomfeng.win/api/newsletter" ...>
```

### 8.6 新隱私文案確實出現在產物

```
$ grep -o '檔案會上傳到 FunnyTools Conversion API[^<]\{0,140\}' dist/tools/pdf-to-word/index.html | head -1
檔案會上傳到 FunnyTools Conversion API 進行轉換，於請求期間暫時處理，完成後不會刻意保留。下載時若選擇把成品寄到信箱，產出檔案與你填…

$ grep -o 'Files are uploaded to the FunnyTools Conversion API[^<]\{0,200\}' dist/en/tools/pdf-to-word/index.html | head -1
Files are uploaded to the FunnyTools Conversion API for conversion, processed temporarily, and not intentionally retained after the request completes. If you choose to have the result emailed to you, the output file and the address you type are then s…
```

gate 設定標籤內含新的 `skip` 標籤：

```
$ grep -o '<script type="application/json" data-download-gate-config>[^<]*' dist/tools/pdf-to-word/index.html
{"lang":"zh","labels":{...,"privacyNote":"我們只用這個 email 寄送檔案與新工具通知，不會外流，可隨時退訂。詳見隱私權政策。","skip":"不用寄送，直接下載檔案"}}

$ grep -o '<script type="application/json" data-download-gate-config>[^<]*' dist/en/tools/pdf-to-word/index.html
{"lang":"en","labels":{...,"privacyNote":"We only use this email to send your file and new-tool updates. Never shared; unsubscribe anytime. See the privacy policy.","skip":"No email — just download the file"}}
```

---

## 9. 改動檔案清單

```
 M src/components/tools/ConversionApiTool.astro
 M src/components/tools/ImageCompressor.astro
 M src/components/tools/MergePdf.astro
 M src/components/tools/QrCodeGenerator.astro
 M src/content/seo-guides/task-003/01-compress-pdf-to-upload-limit.md
 M src/data/categoryContent.ts
 M src/data/seoGuides.ts
 M src/i18n/tools/conversion-api-tools.ts
 M src/i18n/ui.ts
 M src/layouts/ToolLayout.astro
 M src/lib/downloadGate.client.ts
 M tests/privacy-claim-consistency.test.mjs
 M tests/tool-dependency-map.test.mjs
?? src/lib/downloadGateTools.ts
```

未動：`backend/`、`.github/`、`package.json`（未升級任何依賴）、`src/data/tools.ts`
（三個本機工具的 `privacyLevel: 'local-only'` 現在是正確的）、`robots.txt` / sitemap /
canonical / hreflang / GA4 事件名稱 / affiliate schema。**未 commit、未 push。**
