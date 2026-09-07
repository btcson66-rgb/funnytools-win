# 隱私宣稱一致性稽核（任務書 §8）

日期：2026-09-06
**這是本次稽核最重要的一份報告。** 容器封鎖了 funnytools.win／api.funnytools.win，以下全部來自程式碼與已 `npm run build` 產出的 `dist/` 實際 HTML，**沒有開過任何線上頁面**。

## 先講清楚：任務書的假設有一部分不成立，範圍需要擴大

交辦時的框架是「工具內頁文案已經正確（5 個 BACKEND_DEPENDENT 工具），風險只在分類頁／指南／首頁的概括文案」。逐一讀完程式碼後，這個假設**只對五個 BACKEND_DEPENDENT 工具本身成立**，但同時發現**另外 3 個工具（`image-compressor`、`qr-code-generator`、`merge-pdf`，即 `frontend-tool-classification.md` 第 3 節的 MIXED 分類）的「工具內頁」本身就有不實隱私宣稱**——而且問題不只在文案，還牽連到**整站共用元件會自動渲染的徽章與 SEO meta description**。這是本次稽核意外挖到、且影響範圍最廣的一個發現，放在第 1 節先講。

## 1.〔最嚴重〕`privacyLevel: 'local-only'` 錯誤標記，連鎖影響工具自己的頁面、徽章與 SEO meta description

### 根因

`src/data/tools.ts` 裡 `image-compressor`、`qr-code-generator`、`merge-pdf` 三個工具的 `privacyLevel` 都寫 `'local-only'`（分別在第 618、694、728 行附近），但這三個工具的「下載」動作都會呼叫 `requestGatedDownload()`，把產出檔案上傳到 `SITE.downloadGateEndpoint`（`https://roomfeng.win/api/download-gate`，另一個產品站的網域）——完整機制見 `frontend-tool-classification.md` 第 3 節。這個欄位錯誤本身只是一行資料，但它被下面 4 個地方直接拿來決定要不要顯示「保證本機、不上傳」的訊息：

| 檔案:行 | 這行程式碼做什麼 | 對這 3 個工具的實際後果 |
|---|---|---|
| `src/components/ToolCard.astro:46` | `{tool.privacyLevel === 'local-only' && <span class="privacy-badge ...">{ui.privacyBadge}</span>}` | **每一張工具卡片**（首頁、分類頁、`/tools`、`find-tools`、`education-statistics`、`workflows/[slug]`、`for/[audience]`、`guides/[slug]`、`RelatedTools` 相關工具區塊——只要有引用 `ToolCard` 的 7 種頁面模板）都會顯示 🔒 徽章，見下 |
| `src/layouts/ToolLayout.astro:81` | 同樣的判斷式，顯示同一顆徽章，但這次是在**工具自己的頁面標題旁邊** | 這 3 個工具自己的頁面標題旁邊也有 🔒 徽章 |
| `src/layouts/ToolLayout.astro:274` | `{tool.privacyLevel === 'local-only' && <p class="privacy-highlight">{ui.privacy.localOnly}</p>}` | 這 3 個工具自己的頁面內文直接印出 `ui.privacy.localOnly` 這句話（見下） |
| `src/layouts/ToolLayout.astro:40` → `src/lib/seo.ts:52-66,208` | `toolSeoDescription(lang, content, tool.privacyLevel === 'local-only')` | 這 3 個工具自己頁面的 **`<meta name="description">` 與 JSON-LD schema 的 `description` 欄位**都會被附加一段本機保證的句子 |
| `src/components/VerificationBlock.astro:35` | `{tool.privacyLevel === 'local-only' && <a href=.../methodology/browser-local-processing/>{copy.local}</a>}` | 這 3 個工具的頁面會出現一個連到「瀏覽器本機處理是什麼」方法論頁的連結，暗示這 3 個工具也適用那篇文章描述的本機保證 |

`ui.privacyBadge`（`src/i18n/ui.ts:55,258`）＝`'🔒 本機處理'` / `'🔒 Local only'`；`ui.privacy.localOnly`（`src/i18n/ui.ts:98,301`）＝**`'🔒 此工具完全在您的瀏覽器本機執行，不會將任何資料上傳到伺服器。'`** / `'🔒 This tool runs entirely in your browser. No data is uploaded to any server.'`——這是全站唯一一句「絕對」措辭，而且是**共用元件自動渲染**，不是某個人手寫在這 3 個工具頁上的。

### 已用實際 build 產物驗證（不是紙上談兵）

跑過 `npm ci && npm run build`，直接讀 `dist/tools/image-compressor/index.html`、`dist/tools/qr-code-generator/index.html`、`dist/tools/merge-pdf/index.html`：三個檔案都**確實**含有逐字的 `此工具完全在您的瀏覽器本機執行，不會將任何資料上傳到伺服器。` 與 `🔒 本機處理`；三個檔案的 `<meta name="description">` 也都確實含有「...全程在瀏覽器本機處理，不上傳、不外流。...輸入內容與檔案均在瀏覽器本機處理，不會主動上傳至 FunnyTools 免費線上工具箱 伺服器。」這段組合句。這不是理論推導，是目前 `npm run build` 會真的產出的正式頁面內容。

### 諷刺的地方：站上自己的方法論文件已經寫了不該這樣做的規則

`src/content/methodology/task-011/04-browser-local-processing.md` 第六節「Email寄送是例外」原文：

> 如果使用者主動選：寄到信箱。就一定需要：網路服務。...因此工具頁若有 Email 功能：**不能仍用模糊的「所有資料永不離開裝置」**。要把：本機處理階段／使用者主動寄送階段，分開説明。

以及第十二節「公開資料處理標籤」：

> Task 011 建議每個工具標準化：Processing / Storage / Network exceptions / Local persistence 分開標示。**不要全站一個「🔒 Local」圖示卻沒有細節。**

這兩段幾乎是逐字描述了現在 `ToolCard`／`ToolLayout` 對這 3 個工具正在做的事——文件已經寫明這是反模式，但實作沒有跟上（`downloadGate` 功能應該是在這 3 個工具被標記 `local-only` **之後**才加上去的，`privacyLevel` 沒有跟著更新）。可以對照的正確做法就在同一個檔案裡：5 個 BACKEND_DEPENDENT 工具的 `privacyLevel` 是 `'anonymous-api'`，`ToolLayout.astro:41,273,280` 會改顯示 `ui.privacy.anonymousApiHeading`（「隱私與暫時處理」）而不是這句絕對保證——這個機制本身是對的，只是這 3 個 MIXED 工具沒有被歸進去。

### 建議改法（最小改動）

不是本次任務範圍（`src/` 不能動），但供決策參考：最小改動是幫 `privacyLevel` 的型別加一個 `'mixed'`（目前 `src/data/tools.ts:6` 的 `PrivacyLevel` 型別只有 `'local-only' | 'anonymous-api' | 'requires-account'` 三種），把這 3 個工具改標成新值，並讓 `ToolCard`／`ToolLayout`／`seo.ts`／`VerificationBlock` 的判斷式改成「`=== 'local-only'`」才顯示保證徽章，`'mixed'` 則顯示類似 `anonymous-api` 的「隱私與暫時處理」措辭（可以沿用方法論文件建議的「本機運算 + 下載時可選擇寄送信箱」分開說明）。這樣一次改資料欄位就能同時修好徽章、頁面內文、SEO 描述、方法論連結四個地方，不用逐一改文案。

---

## 2. 逐項問題清單（檔案:行 / 目前措辭 / 為什麼不實 / 建議改法）

以下每一筆都已用 `tests/privacy-claim-consistency.test.mjs` 對應的斷言跑過，紅燈結果附在 `frontend-test-run.md`。

| # | 檔案:行 | 目前措辭 | 為什麼不實 | 建議改法（最小改動） |
|---|---|---|---|---|
| 1 | `src/i18n/tools/image-compressor.ts:131` (zh) | 「圖片壓縮在瀏覽器本機完成。**本站不會接收、儲存或上傳你選擇的圖片檔**。」 | 下載按鈕會呼叫 `requestGatedDownload()`，把壓縮後的圖片檔上傳到 `roomfeng.win/api/download-gate`（見第 1 節） | 拆成兩句：「壓縮運算在瀏覽器本機完成」＋「下載時如果選擇『寄到信箱』，檔案會連同 email 一起送出」，呼應同一產品的 email 下載閘門文案（`src/i18n/ui.ts` 的 `downloadGate.privacyNote`）已有的誠實寫法 |
| 2 | `src/i18n/tools/image-compressor.ts:260` (en) | "Image compression runs locally in your browser. **This site does not receive, store, or upload the image file you choose.**" | 同上 | 同上，英文版 |
| 3 | `src/i18n/tools/image-compressor.ts:9` (zh seoDescription) | 「...全程在瀏覽器本機處理，**不上傳、不外流**。」 | 同上，且此欄位會直接出現在 `<meta name="description">`（已在 `dist/tools/image-compressor/index.html` 驗證） | 拿掉「不上傳、不外流」，改成中性描述（不需要提隱私，其他 LOCAL_ONLY 工具的 seoDescription 也多半不特別強調） |
| 4 | `src/i18n/tools/image-compressor.ts:138` (en seoDescription) | "...keep files private — **nothing is uploaded**." | 同上 | 同上 |
| 5 | `src/i18n/tools/merge-pdf.ts:174` (zh) | 「所有 PDF 都只在你的瀏覽器本機處理，**檔案不會離開瀏覽器，也不會上傳到本站或第三方伺服器**。」 | 下載按鈕呼叫 `requestGatedDownload()`；「第三方伺服器」這個措辭尤其精準地被打臉，因為 `downloadGateEndpoint` 剛好就是另一個網域（`roomfeng.win`） | 同 #1 的拆句建議 |
| 6 | `src/i18n/tools/merge-pdf.ts:311` (en) | "All PDFs are processed locally in your browser. **Files never leave the browser and are never uploaded to this site or a third-party server.**" | 同上 | 同上 |
| 7 | `src/i18n/tools/merge-pdf.ts:27` (zh seoDescription) | 「...全程在瀏覽器本機處理，**不需要安裝也不用上傳**。」 | 同上，已在 `<meta name="description">` 驗證 | 拿掉「不用上傳」 |
| 8 | `src/i18n/tools/merge-pdf.ts:181` (en seoDescription) | "...**Files are never uploaded.**" | 同上 | 同上 |
| 9 | `src/i18n/tools/qr-code-generator.ts:121` (zh) | 「QR Code 內容在瀏覽器內產生。**本站不會接收、儲存或上傳你輸入的文字或網址。**」 | 下載按鈕（產生的 PNG）呼叫 `requestGatedDownload()` | 同 #1 拆句建議 |
| 10 | `src/i18n/tools/qr-code-generator.ts:241` (en) | "QR code generation runs locally in your browser. **This site does not receive, store, or upload the text or URL you enter.**" | 同上 | 同上 |
| 11 | `src/data/categoryContent.ts:575-576`（image 分類 `toolBlurbs['image-compressor']`） | 「...圖片不會上傳到伺服器。」／"...**images never leave your browser.**" | 同 #1，且這是分類頁上該工具卡片的說明文字，觸及面比工具內頁更廣 | 拿掉絕對用語，改成中性描述（跟其他同分類工具卡片的寫法一致即可，不用特別強調隱私） |
| 12 | `src/data/categoryContent.ts:692-693`（pdf 分類 `toolBlurbs['merge-pdf']`） | 「...整理報告、合約附件或掃描文件時很方便，**檔案全程不離開瀏覽器**。」／"Combine multiple PDFs in your chosen order into one file — **all locally, with nothing uploaded.**" | 這是**全站措辭最絕對、最具體**的一句（「全程」「nothing uploaded」），而且直接違反 #5/#6 | 同 #11 |
| 13 | `src/data/categoryContent.ts:509`（image 分類 intro 第 3 段） | 「...**因為所有處理都在本機完成**，即使是含個人資訊或尚未公開的圖片也能安心使用，無需擔心檔案外流。」 | 同一個分類頁的 `metaDescription`（:501-502）與 FAQ（:558）都正確寫了「批次壓縮與圖片轉 DXF 會暫時送到 Conversion API」，這句 intro 卻自我矛盾地說「所有處理」；而且這句話所在的分類頁本身就列出 `bulk-image-compressor`（BACKEND_DEPENDENT）與 `image-compressor`（MIXED） | 拿掉「所有」，改成呼應同頁 FAQ 已經有的「多數工具在本機處理，批次壓縮與圖片轉 DXF 除外」寫法，前後一致即可 |
| 14 | `src/data/categoryContent.ts:744`（draw 分類 intro 第 3 段） | 「...**所有繪製都在瀏覽器本機完成**，免註冊也免安裝。」 | 這個分類（`draw`）的 `category` 欄位涵蓋 `image-to-dxf`（`tools.ts` 裡 `image-to-dxf` 的 `category: 'draw'`），是 BACKEND_DEPENDENT，但這個分類頁完全沒有像 image／pdf 分類那樣在 metaDescription／FAQ 提到「圖片轉 DXF 會上傳」的但書——這是 3 個受影響分類裡唯一沒有任何一句話揭露的 | 加一句但書（可仿照 image/pdf 分類 FAQ 的寫法：「圖片轉 DXF 會暫時上傳到 Conversion API」），或至少把「所有」拿掉 |
| 15 | `src/data/categoryContent.ts:789,798`（draw 分類 FAQ「作品會自動儲存到雲端嗎？」） | 「不會，**繪製都在本機進行**，請記得自行匯出保存。」／"No, **drawing happens locally**, so remember to export and save." | 問題原意是問「雲端自動儲存」，答案卻用「都在本機進行」把 image-to-dxf 也含括進去；嚴重度較低（原問題本來就不是問上傳處理），但措辭仍不精確 | 可留著回答「雲端儲存」的部分，但避免用「都」這種涵蓋全部工具的字 |

## 3. 全站規模最大、也最具體的一篇問題內容：`merge-pdf-private-guide`

`src/data/seoGuides.ts`（`id: 'merge-pdf-private-guide'`，zh 約在 1399-1441 行，對應的英文翻譯物件在同檔案 ~2887-2924 行）是**一整篇專門教「免上傳合併 PDF」的 SEO 指南文章**，`relatedToolIds: ['merge-pdf', 'split-pdf', 'extract-pdf-pages', 'pdf-compressor']`——同時連到 `merge-pdf`（MIXED，見上）**和 `pdf-compressor`（BACKEND_DEPENDENT，100% 一定會上傳）**。這篇文章：

- 標題／H1／metaTitle 都是「免上傳合併 PDF」「How to merge PDF files without uploading them」。
- FAQ 明確教讀者**怎麼自己驗證**這個宣稱：「開啟工具頁面後切斷網路再操作，能完成就代表處理全在本機。也可以開瀏覽器開發者工具的 Network 分頁,觀察合併時有沒有上傳流量。」／"disconnect from the internet and confirm the merge still works, or open your browser's developer tools Network tab and watch for upload traffic during the merge."——如果真的有技術使用者照做，會**直接在 Network 分頁看到** `merge-pdf` 下載時打去 `roomfeng.win/api/download-gate` 的請求，當場拆穿這篇文章。
- CTA：「用免上傳的合併 PDF 工具處理...**全程檔案不離開你的裝置**。」／"...**your files never leave your device.**"
- example 段落甚至寫「全程斷網測試過，檔案沒有離開筆電。」（這是模擬的使用情境敘述，不是真實測試紀錄，但寫法會讓讀者誤以為是站方實測過的保證）。

這篇文章是本次稽核找到**措辭最絕對、教學意圖最明確、連結的工具裡有一個是 100% 一定上傳**的內容，建議優先處理。最小改動：拿掉「免上傳」相關的絕對宣稱與「教你驗證」的段落，或者把 `relatedToolIds` 裡的 `pdf-compressor` 移除（它跟這篇文章的主題完全矛盾），並把 `merge-pdf` 對應的段落改成呼應第 2 節 #5/#6 建議的拆句寫法。

## 4. 另一個獨立問題：內容跟不上工具遷移（不是隱私宣稱，但同樣是「文案與實況不符」）

`src/content/seo-guides/task-003/01-compress-pdf-to-upload-limit.md` 第「四、FunnyTools PDF 壓縮工具真正做什麼？」一節：

> 目前 FunnyTools PDF Compressor 的定位是：**在瀏覽器本機處理**；重新寫入／整理 PDF 結構；...目前單檔輸入上限為 **40MB**。

這段描述**精準對應**到 `frontend-tool-classification.md` 第 4 節提到、目前完全沒被引用的死檔案 `src/components/tools/PdfCompressor.astro`（本機版、`pdf-lib`、硬寫 `file.size>40*1024*1024` 的 40MB 上限）——但線上 `/tools/pdf-compressor/` 實際對應的是 `ConversionApiTool.astro`（BACKEND_DEPENDENT，見 `frontend-tool-classification.md`），後端真實上限是 **80MB**（`backend/services/common.py:13`），不是 40MB。這篇文章的 CTA 直接連到 `/tools/pdf-compressor/`。這不是「隱私」問題（沒人在乎壓縮是不是本機），而是**內容在工具改版後沒有跟著更新**，導致對外公開的技術規格（處理方式、檔案上限）是錯的，一樣建議修正。

## 5. 做得對的地方（避免以偏概全）

- **隱私權政策**（`src/i18n/pages.ts:238-268`）整體措辭審慎：用「預設」「以...為主」等 hedge 字眼，且第 249 行有專門一段誠實描述「檔案寄送功能」（本站的 email 下載閘門）：「如果你在工具中選擇『把檔案寄到信箱』，本站會額外收集你的 email 與所使用的工具名稱...你選擇寄送的結果檔案僅用於當次寄送」——這段本身沒有問題，問題是**工具自己的頁面文案（第 2 節 #1-#10）沒有沿用這個誠實版本**。
- **About 頁與首頁**（`src/i18n/pages.ts:349-350`、`src/pages/[...locale]/index.astro:29,37,43,64,83-92`）用「多數工具」「優先採用」「通常不需要」等 hedge 字，並明確說「有例外，每個例外都會在工具頁另外標示」——這個承諾本身沒問題，只是第 2 節列出的工具頁沒有兌現這個承諾。
- **pdf 分類頁**（`categoryContent.ts:617-729`）的 `metaDescription`／intro／FAQ 全部正確區分「整理工具（本機）」與「PDF 轉 Word／表格轉 Excel／PDF 壓縮（會暫時上傳）」，是 3 個受影響分類裡寫得最好的一個，只有 `toolBlurbs['merge-pdf']` 這一個子項落漏（第 2 節 #12）。
- 5 個 BACKEND_DEPENDENT 工具自己的文案（`src/i18n/tools/conversion-api-tools.ts`）從頭到尾沒有出現任何「不上傳／never leave」措辭，符合交辦背景所述。

## 6. 沒有發明超出證據的宣稱

依任務書要求，本報告沒有替後端捏造「不刻意保留」之類的說法；凡是「後端限制／後端行為」的描述，全部引用自 `backend/services/common.py` 等現有程式碼作為交叉比對，沒有引用任何抓不到的線上資料，也沒有把「無法驗證」的部分寫成確定結論。
