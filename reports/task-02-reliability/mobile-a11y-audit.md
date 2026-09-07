# 行動裝置與無障礙稽核（任務書 §14）

日期：2026-09-07
稽核者：前端相容性與無障礙稽核員（task-02-funnytools-reliability）
分支：`claude/task-02-funnytools-reliability`

## 誠實聲明：這份報告裡「實測」與「推斷」的界線

**沒有使用 Playwright，也沒有使用任何瀏覽器自動化工具**（本容器沒有安裝 Chrome/Chromium——`which google-chrome chromium chromium-browser` 三個都找不到，就算想沿用既有的 `scripts/ui-dark-audit.mjs`（透過 CDP 遠端控制真的 Chrome）也無法在這個環境執行，這不是「選擇不用」，是物理上跑不動）。因此：

- **沒有任何一項結論來自「打開瀏覽器在 375px 寬度下實際看畫面」或「用鍵盤/螢幕閱讀器實機操作」**。
- 所有結論都來自：(1) `src/components/tools/*.astro` 原始碼逐行閱讀（HTML 結構、`<script>` 邏輯）、(2) `src/styles/global.css` 的 CSS 規則（`@media` 斷點、`min-height`、色彩變數）、(3) `npm run build` 產出的 `dist/**/index.html` 實際結構。
- 凡是「CSS 說會在 375px 下變成單欄／按鈕會變成 44px」這類陳述，標記為**「CSS 推斷，未實機驗證」**；凡是「這個 canvas 沒有 `tabindex`，所以鍵盤 Tab 不會停在上面」這類陳述，是**程式碼結構的決定性事實**（不是推斷，是讀碼得到的確定結論），兩者在下文會分開標註。
- 色彩對比只算了 CSS 變數的十六進位色碼算出的 WCAG 對比比值（公式驗證過），**不是用真的螢幕/色彩管理去量測**，且沒有考慮作業系統層級的深色模式強制轉換、瀏覽器縮放等因素。

## 為什麼挑這幾個代表性工具（任務書明文要求：不要逐語系/逐工具重複測，不要引入 Playwright）

83 個上線工具對應 68 個不重複的 widget 元件（`src/lib/toolWidgets.ts`）。任務書指定 5 個代表性群組，各挑 1-2 個，優先挑「元件邏輯最複雜、最可能暴露問題」的代表，而不是隨機挑：

| 群組 | 挑選的工具 | 為什麼挑這個 |
|---|---|---|
| 純表單計算機 | **compound-interest**（`CompoundInterest.astro`） | 有 SVG 圖表輸出、`aria-live` 結果區、toast，是這個群組裡欄位最多、輸出型態最豐富的代表 |
| 純表單計算機 | **gpa-calculator**（`GpaCalculator.astro`） | 這個群組裡少數會「動態新增/刪除列」的計算機，用來對照下面「表格編輯型」群組同樣是動態列、卻標籤處理方式不同的情形 |
| 檔案上傳型（本機） | **merge-pdf**（`MergePdf.astro`） | 上傳＋排序＋分析＋合併，是本機檔案類工具裡狀態機最複雜的一個 |
| 檔案上傳型（後端相依） | **bulk-image-compressor / pdf-to-word / pdf-table-to-excel / image-to-dxf / pdf-compressor**（共用 `ConversionApiTool.astro`） | 5 個上線工具槽位共用同一個元件，一次稽核涵蓋全部 5 個；也是任務書 §7/§13 點名要看的後端相依工具 |
| Canvas 繪圖型 | **sketchpad**（`Sketchpad.astro`） | 最單純的自由繪圖（pointer-only 互動的典型代表） |
| Canvas 繪圖型 | **cad-2d**（`Cad2dBoard.astro`） | 同群組裡複雜度最高（`role="toolbar"`、`aria-pressed`、動態數字輸入框），用來對照「繪圖工具是否『天生做不到鍵盤操作』」這個假設是否站得住腳 |
| 表格編輯型 | **bar-chart-maker / pie-chart-maker**（共用 `ChartMaker.astro`） | 動態新增列＋畫面上有「標籤/數值」欄位標題列，是最典型的「動態表格列」UI |
| QR/影像輸出型 | **qr-code-generator**（`QrCodeGenerator.astro`） | 圖片剪貼簿（`ClipboardItem`）與能力偵測的正確示範也在這裡 |
| QR/影像輸出型 | **barcode-generator**（`BarcodeGenerator.astro`） | SVG 輸出＋多種下載格式，補足 QR 群組沒有的「格式選擇」互動 |

**涵蓋率**：以上共 9 個不重複元件、對應 14 個上線工具槽位。

- 元件層級：9 / 68 ≈ **13.2%**
- 工具槽位層級：14 / 83 ≈ **16.9%**（`ConversionApiTool` 一個元件涵蓋 5 個槽位、`ChartMaker` 一個元件涵蓋 2 個槽位，讓槽位涵蓋率高於元件涵蓋率）

**額外的全站掃描（不算進「代表性樣本」，但涵蓋率是 100%）**：以下幾項結構特徵用 `grep`／自寫腳本對**全部 69 個 `.astro` 檔案**做了窮舉掃描，不受代表性樣本大小限制，結果附在下方對應小節：
- 是否有 click 事件掛在裸 `<div>`/`<span>` 而非按鈕上（0 個違規，見 §鍵盤可操作性）
- `[data-error]` 元素是否都有 `role="alert"`（0 個違規）
- `aria-describedby` / `aria-invalid` 使用率（0 個檔案使用，見 §表單標籤與錯誤關聯）
- 是否有任何 `aria-live` 的檔案清單（11 個檔案完全沒有 `aria-live`，逐一人工分類見下）
- `navigator.clipboard.writeText` 是否有失敗處理（見 `browser-capability-audit.md` A.1.1，同樣是全站掃描）

---

## 1. 鍵盤可操作性（Tab 順序、focus 可見、按鈕不是只有 div 綁 click）

### 1.1 全站掃描：click 事件是否掛在裸 div/span 上 —— **實測（自動化，非推斷）**

寫了一個小腳本（邏輯已收進 `tests/a11y-structure.test.mjs` 的第一個測試）：解析每個 `.astro` 檔案的 HTML 樣板＋`<script>`，找出所有 `document.querySelector('[data-x]')?.addEventListener('click', ...)` 的呼叫，再回頭確認 `data-x` 這個屬性實際掛在哪個標籤上（含 `innerHTML`/模板字串動態產生的列）。

**結果：全部 69 個檔案、共約 140 處 click 綁定，0 個掛在非互動標籤（div/span/p/li 等）上。** 每一個 click 目標最終都能追溯到 `<button>` 元素（唯一例外是 `ConversionApiTool.astro:331` 的校正畫布 `click`，掛在 `<canvas>` 上，這不是「用 div 假裝按鈕」，而是「canvas 本身就需要滑鼠/觸控座標」，另外在 §4 討論其鍵盤替代方案缺席的問題）。這是全站**一致且正確**的實作習慣，值得肯定。

### 1.2 焦點可見性 —— **CSS 讀碼，非推斷**（全域規則，非逐頁實測）

`src/styles/global.css:633-638`：

```css
input:focus, textarea:focus, button:focus-visible, a:focus-visible {
  outline: 3px solid rgba(62, 99, 221, 0.24);
  outline-offset: 2px;
}
```

全檔案搜尋 `outline:\s*none` / `outline:\s*0`：**0 命中**（`src/styles/global.css` 與全部 `.astro` 檔案）。也就是說沒有任何規則會把瀏覽器原生或這條全域規則的 focus 外框拿掉。`.tool-card__link:focus-visible::after`（`global.css:390-392`）、`.favorite-toggle:focus-visible`（`:2167-2169`）等元件層級規則都是**疊加**額外樣式，不是移除。**結論：沒有發現「移除 focus 外框」的常見反模式**——但這是讀 CSS 規則得到的結論，沒有實機用鍵盤 Tab 過一遍畫面確認視覺上是否真的明顯可見（例如外框顏色在某些背景下對比是否足夠，見下方對比小節）。

### 1.3 Canvas 繪圖型的鍵盤可及性（誠實記錄「天生限制」與「本可避免的缺口」的差別）

- **Sketchpad.astro**：畫布本身（`<canvas data-canvas width="960" height="560" aria-label={labels.canvasLabel}>`，`:30`）只綁定 `pointerdown/pointermove/pointerup/pointercancel`（`:227-230`），**沒有任何鍵盤路徑可以畫圖**。這是自由繪圖工具的**天生限制**（WCAG 對「必要的」手勢/座標輸入互動有例外空間），列為已知限制而非可簡單修復的 bug。清除/復原/下載都是真正的 `<button>`（`:34-36`），鍵盤可達。
- **Cad2dBoard.astro**：反而是全站對 canvas 工具做得最好的示範——`role="toolbar" aria-label={labels.toolbar}`（`:10`）、每個工具切換按鈕都有 `aria-pressed`（`:11-16`，JS 動態更新見 `:325`）、狀態區 `aria-live="polite"`（`:66`）、且有獨立的數字輸入框（長度/角度）可以用鍵盤直接輸入精確數值並綁定 `keydown`（`:1539-1540`）。畫布本身放置圖形仍需要滑鼠/觸控（合理），但這個元件證明「Canvas 繪圖型」在這個 codebase 裡**可以**做到相當程度的鍵盤可操作性，Sketchpad 的簡陋不是技術限制，是取捨。
- **image-to-dxf 的校正畫布**（`ConversionApiTool.astro:64,331`，見 `browser-capability-audit.md` A.1.4）：**這個才是不該有的缺口**——它不是自由繪圖，只是要在圖上標記兩個點，這種「有限座標輸入」原則上可以用鍵盤方向鍵微調或手動輸入座標數值取代，但目前完全沒有替代路徑，也沒有 `tabindex`，Tab 鍵甚至不會停在這個 canvas 上。**風險：中高**——因為這是後端相依工具唯一一步「沒有這個步驟就無法完成轉換」的互動，鍵盤/螢幕閱讀器使用者被完全擋在 image-to-dxf 這個工具外面。

### 1.4 Tab 順序 —— **無法驗證（需要實機/瀏覽器渲染，本環境做不到）**

Tab 順序取決於 DOM 順序與瀏覽器渲染引擎行為，讀原始碼只能確認「沒有奇怪的 `tabindex` 數字」（全檔案搜尋 `tabindex="[1-9]` 之類的正整數 tabindex：0 命中，只有 `tabindex="0"`／`-1"` 這種標準用法會出現，且目前全站幾乎不使用顯式 `tabindex`），無法確認實際跳轉順序是否符合視覺閱讀順序。**這一項誠實標註為「無法驗證」。**

---

## 2. 表單標籤與錯誤關聯

### 2.1 表單標籤（`<label for>` 或 `aria-label`）—— 部分實測（建置產物）＋ 全站讀碼

**建置產物實測**（`tests/a11y-structure.test.mjs` 最後一個測試，對 14 個代表性工具槽位的 `dist/**/index.html` 做的）：解析出每個工具頁 `<section class="tool-widget">` 範圍內的 `<input>/<select>/<textarea>`（排除 `type="hidden"`），檢查是否被 `<label>...</label>` 包住或有 `aria-label`/`aria-labelledby`。**結果：14 個代表性工具槽位、共 46 個表單欄位，0 個未標籤。** 這是對**靜態渲染出來的 HTML**做的實測（不是猜的），但只涵蓋頁面載入當下就存在的欄位，**不包含使用者互動後才用 JS 動態新增的欄位**（例如點「新增列」之後才出現的那些）。

**動態新增欄位是這次稽核發現真正問題的地方**，讀原始碼發現同樣是「動態新增一列輸入框」，這個 codebase 裡有兩種截然不同、品質差很多的寫法：

**正確示範 —— `GpaCalculator.astro:126-143`**（`createRow()`，用 `innerHTML` 模板字串）：

```js
row.innerHTML = `
  <label><span>${labels.course}</span><input data-course type="text" .../></label>
  <label><span>${labels.credits}</span><input data-credits-input type="number" .../></label>
  <label><span>${labels.grade}</span><select data-grade>...</select></label>
  <button class="btn ghost" type="button" data-remove>${labels.remove}</button>
`;
```
每個動態欄位都有自己的 `<label><span>文字</span>...</label>`，視覺上與程式化的名稱一致。

**有問題 —— `ChartMaker.astro:110-129`**（`createRow()`，用 `document.createElement`）：

```js
const labelInput = document.createElement('input');
labelInput.type = 'text';
labelInput.setAttribute('data-label', '');
labelInput.placeholder = labels.labelHeader;   // 只有 placeholder，沒有 aria-label
...
const valueInput = document.createElement('input');
valueInput.type = 'number';
valueInput.setAttribute('data-value', '');
valueInput.placeholder = labels.valueHeader;   // 同樣只有 placeholder
```

而且畫面上原本應該扮演欄位標題的那一列，是刻意隱藏給輔助科技看的：`ChartMaker.astro:15`：

```html
<div class="chart-rows-head" aria-hidden="true">
  <span>{labels.labelHeader}</span>
  <span>{labels.valueHeader}</span>
  <span></span>
</div>
```

`placeholder` **不是**可靠的無障礙名稱來源（WCAG 3.3.2／4.1.2 常見反模式：使用者一開始打字 placeholder 就消失，且不是所有瀏覽器/輔助科技組合都會把 placeholder 當成 accessible name），加上視覺欄位標題被 `aria-hidden="true"` 擋掉——**結果是螢幕閱讀器使用者對每一列的「標籤」與「數值」輸入框完全聽不到任何名稱**，且「移除」按鈕（`:129`，`removeBtn.textContent = labels.remove`）也只有一句通用「移除」文字、沒有標明是移除第幾列，多列同時存在時，螢幕閱讀器使用者聽到的是一串重複、無法分辨彼此的「移除，按鈕」。

**同一個問題也出現在 `ConversionApiTool.astro:279`**（`pdf-table-to-excel` 的可編輯表格，`renderTables()`）：

```js
row.forEach((value, columnIndex) => {
  const td = document.createElement('td');
  const input = document.createElement('input');
  input.value = value;
  input.oninput = () => { table.rows[rowIndex][columnIndex] = input.value; };
  td.append(input);
  ...
});
```

這裡連 `placeholder` 都沒有——每一個表格儲存格的 `<input>` 完全沒有名稱來源。欄位選單（`columnSelect`，`:276`）倒是有正確設定 `aria-label`（`columnSelect.setAttribute('aria-label', labels.columnNumber)`），顯示這個檔案裡「知道怎麼做對」，只是漏了表格儲存格本身。

**已寫成自動化測試**（`tests/a11y-structure.test.mjs`）：ChartMaker 與 ConversionApiTool 這兩個具體案例都各自有一個現在會失敗（紅燈）的測試，斷言要求加上 `aria-label`，不會因為現況沒做就放寬。

### 2.2 錯誤訊息是否與欄位關聯（`aria-describedby`）—— **全站掃描，0/69 使用**

```
grep -rc "aria-describedby" src/components/tools/*.astro   # 全部為 0
grep -rc "aria-invalid" src/components/tools/*.astro       # 全部為 0
```

全站錯誤訊息的固定模式是一個共用的 `<p class="form-error" data-error role="alert" hidden></p>`（前面 §鍵盤可操作性掃描過，全部 69 個檔案裡有 `data-error` 的都正確搭配 `role="alert"`），但**沒有任何一個檔案**把這個錯誤元素透過 `aria-describedby` 關聯回觸發錯誤的那個具體欄位，也沒有在該欄位上加 `aria-invalid="true"`。

**這帶來的實際影響，分兩種情境誠實拆開講**：

- **錯誤發生的當下**：`role="alert"` 本身就是隱含的 assertive live region，發生錯誤時螢幕閱讀器**會**立刻朗讀出錯誤文字（例如「檔案格式不是 PDF，請重新選擇。」）——這部分不算「無聲失敗」，使用者聽得到。
- **錯誤發生之後，使用者重新聚焦到出錯的那個欄位**（例如往回 Tab 到檔案上傳欄位，想再試一次）：因為沒有 `aria-describedby`／`aria-invalid`，螢幕閱讀器只會唸出欄位本身的名稱（例如「選擇 PDF，檔案上傳」），**不會**額外提示「目前狀態：錯誤，原因是……」——使用者必須記得剛剛那句轉瞬即逝的 alert 說了什麼，或重新觸發一次錯誤才能再聽一次。

這是全站一致的模式（不是某幾個工具特別差），影響所有有錯誤狀態的工具，風險評級中等（因為 `role="alert"` 有部分補償，不是完全無聲，但缺少持久關聯確實降低了可用性）。

---

## 3. 動態狀態變化的 `aria-live`（處理中／完成／失敗）

全站 69 個檔案裡有 11 個完全沒有出現 `aria-live` 字串，逐一人工檢視分類（不是每個都是 bug，見下表）：

| 檔案 | 分類 | 理由 |
|---|---|---|
| `BreakReminder.astro` | 🟡 **真的缺漏** | `<p class="phase-label" data-status>{labels.ready}</p>`（`:26`）在專注/休息階段切換時更新文字，**沒有** `aria-live` 也沒有 `role="status"`，螢幕閱讀器使用者不會被告知階段已切換。已寫進 `tests/a11y-structure.test.mjs`（目前紅燈）。 |
| `ImageFormatConverter.astro` | 🟡 **真的缺漏（部分）** | 錯誤有 `role="alert"`（沒問題），但整個轉檔過程（`createImageBitmap` → `canvas.toBlob`）**完全沒有「處理中」狀態文字**，不只是缺 `aria-live`，是連視覺上都沒有處理中提示——大圖可能要處理一兩秒，使用者（含一般使用者）在這段時間看不到任何回饋。 |
| `PdfPageReorder.astro` | 🟢 低風險 | 錯誤有 `role="alert"`；頁面重新排序清單（`data-pages`）用上/下移動按鈕直接操作，操作者的焦點就停留在按鈕上，屬於「直接操作結果」，緊接在使用者自己的動作之後，不算典型的無聲更新。 |
| `PercentageCalculator.astro` | 🟢 低風險 | 沒有任何錯誤狀態（純數字輸入＋即時計算，不會出錯），三個計算區塊即時更新結果，屬於「直接操作結果」的即時回饋，不是背景/非同步狀態切換。 |
| `PomodoroTimer.astro` | 🟢 合理不做 | 錯誤有 `role="alert"`；倒數計時本身每秒都在變動文字，若加上 `aria-live` 會變成每秒朗讀一次，對螢幕閱讀器使用者是嚴重干擾，業界對這類「持續跳動的計時器」普遍的做法就是不放進 live region。 |
| `CountdownTimer.astro` | 🟢 合理不做 | 同上，持續跳動的倒數計時。 |
| `TimestampConverter.astro` | 🟡 **真的缺漏** | 錯誤有 `role="alert"`；但 `data-results` 結果區（本地時間/UTC/ISO/Unix 秒/毫秒五個欄位，`:13-19`）在按下「轉換」後才出現/更新，**沒有 `aria-live`**，螢幕閱讀器使用者按下轉換後不會被告知結果已產生——這個檔案同時也是 `browser-capability-audit.md` 提到剪貼簿完全無失敗處理、且連複製成功的 toast 都沒有的那個檔案，是這次稽核裡問題最集中的單一工具。 |
| `UuidGenerator.astro` | 🟢 低風險（可加強） | 錯誤有 `role="alert"`；輸出是 `readonly` 的 `<textarea aria-label={labels.output}>`（`:8`），點「產生」後內容更新，屬於「直接操作結果，且結果就在觸發按鈕旁邊」，可加 `aria-live` 更完善但不算嚴重缺漏。 |
| `MarkdownPreviewer.astro` | 🟢 低風險 | 錯誤有 `role="alert"`；預覽區是使用者打字時即時渲染，即時輸入回饋的常見模式不放 live region 是合理的（否則會隨每個按鍵狂發語音）。 |
| `Sketchpad.astro` | 🟢 合理不做 | 沒有錯誤狀態、沒有非同步處理，繪圖過程本身不適合語音播報。 |
| `ChartMaker.astro` | 🟡 **真的缺漏** | 見上方 §2.1，且 `data-note` 元素（空狀態提示，例如「沒有有效的資料列」）也沒有 `aria-live`，會隨資料增減靜默出現/消失。 |

**小結**：11 個「沒有 aria-live」的檔案裡，4 個（BreakReminder、ImageFormatConverter、TimestampConverter、ChartMaker）是真的缺漏，其餘 7 個是合理設計（即時回饋型計算機、持續跳動的計時器、或直接操作結果）。**如果只看「有沒有 aria-live 字串」這個粗略指標會高估問題數量**，這也是為什麼這次沒有把它做成一個粗糙的自動化測試（會有大量假陽性），而是把其中一個最明確、最具代表性的案例（BreakReminder）寫成有針對性的自動化測試，其餘用人工分類寫進報告。

---

## 4. 觸控目標尺寸與 375px 寬度版面（CSS 推斷，未實機測試）

### 4.1 全域觸控目標尺寸基準

`src/styles/global.css`：

- `.btn { min-height: 44px; }`（`:257-261`）——一般按鈕。
- `input, textarea { min-height: 48px; }`（`:622-631`）——全域文字輸入框。
- `select { min-height: 44px; }`（`:1418`），部分元件內再自訂到 48px（例如 `ConversionApiTool.astro:105`、`CompoundInterest.astro:59-68`）。
- `.check-control { min-height: 48px; }`（`ConversionApiTool.astro:106`）——checkbox 列。

44px／48px 都優於 WCAG 2.2 AA「Target Size (Minimum)」的 24×24px 門檻，也接近 AAA 的 44×44px 建議值，**這是良好、一致的全域基準**，代表性樣本裡的按鈕/輸入框（含 ChartMaker、GpaCalculator 動態新增的那些，因為它們是原生 `<input>`/`<button>` 標籤，會自動繼承這條全域規則）都符合。

### 4.2 例外：安裝提示的關閉按鈕明顯偏小

`src/styles/global.css:1693-1732`（`install-prompt.js` 產生的浮動安裝提示卡片）：

```css
.install-prompt button { min-height: 34px; ... }
.install-prompt [data-install-dismiss] { width: 34px; font-size: 20px; line-height: 1; }
```

「×」關閉按鈕是 **34×34px**，比全站其它按鈕的 44px 基準小、也比自己卡片裡的「安裝」按鈕（同樣繼承 34px 高但寬度隨文字撐開，寬度沒問題，高度一樣是 34px）矮。34px 仍高於 WCAG 2.2 AA 的 24px 底線，**不是 WCAG 違規**，但這個卡片是**固定貼在畫面右下角**（`.install-prompt { position: fixed; right: 16px; bottom: 16px; }`，`:1693-1697`），在手機小螢幕上是使用者最容易誤觸周邊系統手勢（如返回手勢、通知欄）的角落位置，比全站其它按鈕矮 10px 在這個特定位置上更容易造成誤觸或點不到，值得列為低風險改進項。

### 4.3 375px 寬度版面推斷（CSS 讀碼，非實機）

檢視全部代表性工具的 `@media (max-width: 760px)` 規則（760px > 375px，所以以下規則在 375px 下必定生效）：

- `ConversionApiTool.astro:128`：`.three-col { grid-template-columns: 1fr; } .actions { display: grid; }`——多欄表單、動作按鈕列在窄螢幕下都收成單欄，按鈕直向排列不會被壓縮。
- `Sketchpad.astro:89-93`、`ChartMaker.astro`（`.chart-rows-head/.chart-row` 用 `grid-template-columns: minmax(0,1.4fr) minmax(0,1fr) auto`，沒有專屬窄螢幕覆寫，但兩欄+一個按鈕在 375px 下用 `minmax(0, ...)` 仍可各自收縮不溢出，只是可能字級擁擠）、`Cad2dBoard.astro:75-77`（`.cad-toolbar { flex-wrap: wrap; }`，多顆工具按鈕在窄螢幕下會自動換行，不會橫向溢出裁切）。
- 表格類輸出（`ConversionApiTool.astro:121`：`.table-card { overflow-x: auto; } .table-card table { min-width: 520px; }`）——表格本身設定最小寬度 520px（大於 375px 螢幕寬），但外層容器有 `overflow-x: auto`，代表**設計上預期窄螢幕會橫向捲動**而非硬擠壓表格,這是合理且常見的表格響應式做法,但也代表 pdf-table-to-excel 在手機上編輯表格會需要橫向滑動,單手操作體驗打折扣（沒有更好的替代方案前,這是可接受的取捨）。
- Viewport meta：`src/layouts/BaseLayout.astro:108`、`EmbedLayout.astro:32` 皆為 `<meta name="viewport" content="width=device-width, initial-scale=1" />`——**沒有** `maximum-scale=1` 或 `user-scalable=no`，代表使用者仍可自由縮放頁面，這是無障礙的加分項（很多網站會誤用 `user-scalable=no` 鎖死縮放,這裡沒有這個反模式）。

**再次強調**：以上全部是**讀 CSS 規則推斷版面在 375px 下大致會怎麼收合**,不是打開手機或模擬器實際量過像素、量過實際觸控體感。CSS 斷點正確不代表視覺上一定舒適（例如字級擁擠、行高是否足夠都無法只從斷點數字判斷）。

---

## 5. 圖片 `alt`、對比度（CSS 變數推斷）

### 5.1 圖片輸出的替代文字 —— 讀碼確認,涵蓋代表性樣本 100%

| 工具 | 輸出元素 | 替代文字 |
|---|---|---|
| sketchpad | `<canvas aria-label={labels.canvasLabel}>` | `線上繪圖板畫布` / `Online sketchpad canvas`（`src/i18n/tools/sketchpad.ts:58,105`） |
| cad-2d | `<canvas aria-label={labels.canvasLabel}>` | `2D CAD 製圖畫布` / `2D CAD drawing canvas`（`cad-2d.ts:69,213`） |
| bar/pie-chart-maker | `<canvas aria-label={labels.canvasLabel}>` | `長條圖預覽`／`圓餅圖預覽`（`bar-chart-maker.ts:39`、`pie-chart-maker.ts:39`） |
| qr-code-generator | `<canvas role="img" aria-label={labels.canvasAlt}>`（`QrCodeGenerator.astro:43`） | `QR Code 預覽` / `QR code preview`（`qr-code-generator.ts:119,239`） |
| barcode-generator | `<svg role="img" aria-label={labels.previewAlt}>`（`BarcodeGenerator.astro:29`） | `條碼預覽` / `Barcode preview`（`barcode-generator.ts:132,278`） |
| compound-interest | `<svg viewBox="0 0 640 220" role="img" aria-label={labels.chartTitle}>`（`CompoundInterest.astro:53`） | 沿用該計算機的圖表標題文字 |
| ImageFormatConverter（jpg-to-webp 等） | `<img data-source alt={labels.source}>` / `<img data-output alt={labels.output}>`（`:8`） | `原始預覽` / `輸出預覽`（靜態 alt，非空字串） |

代表性樣本裡**沒有發現**缺少 `alt`／`aria-label` 的圖片輸出元素;全部視覺化輸出（canvas/svg/img）都有非空的替代文字,且每個都對應到有意義的雙語 i18n 字串,不是隨便塞一個檔名。

### 5.2 色彩對比 —— 只算 CSS 變數色碼,非螢幕量測

`src/styles/global.css:3-10`（亮色主題 token）：

```css
--ink: #18212f;   --muted: #657186;   --line: #dbe3ee;
--bg: #f7f9fc;    --card: #ffffff;    --brand: #0f8f8c;   --accent: #f26b4f;
```

用 WCAG 相對亮度公式（sRGB → linearize → relative luminance → contrast ratio）實際算出以下組合：

| 前景 / 背景 | 對比值 | WCAG AA 一般文字（4.5:1）| 備註 |
|---|---|---|---|
| `--ink` (#18212f) / 白 (#ffffff) | 16.19:1 | ✅ 遠超標準 | 主要內文顏色,標籤（`label { color: var(--muted) }`? 不,是 `--ink` 用在 `.bigresult output` 等） |
| `--ink` / `--bg` (#f7f9fc) | 15.35:1 | ✅ | |
| `--muted` (#657186) / 白 | **4.93:1** | ✅ 剛好過,margin 很小 | 用在 `label { color: var(--muted) }`（`global.css:617`）、各種 `.note`／說明文字,**是全站欄位標籤文字的主要顏色**,4.93:1 雖然通過 4.5:1 門檻,但餘裕只有 0.43,未來若色票微調（例如稍微調亮）很容易掉到不合格,建議列入監控 |
| `--brand` (#0f8f8c) / 白 | 3.94:1 | ❌ 一般文字不合格 / ✅ 大字（3:1） | 在代表性樣本裡查到的用法（`DiceRoller.astro:74`、`RandomNamePicker.astro:46`,均在 `.bigresult output` 抽獎/擲骰結果文字上）字級是 `clamp(1.6rem, 6vw, 2.7rem)` 加 `font-weight:900`（`global.css:708-714`）,最小 1.6rem(25.6px) 已符合 WCAG「大字」門檻（只需 3:1）,**這個特定用法沒有違規**;但若未來有人把 `--brand` 拿去當一般大小的內文顏色,3.94:1 會不合格,值得留意 |
| `--accent` (#f26b4f) / 白 | 3.00:1 | N/A（僅用於邊框） | 代表性樣本與全站搜尋到的用法都只出現在 `border-color`（`BreakReminder.astro:56`、`ConversionApiTool.astro:114` 拖曳中的邊框高亮）,3:1 剛好符合 WCAG 1.4.11「非文字對比」的邊框/UI 元件門檻,沒有查到當文字色使用的案例 |

**結論**：代表性樣本與全站搜尋範圍內,**沒有發現色彩對比不合格的實際用法**（`--brand`/`--accent` 唯一低於 4.5:1 的組合,實際用途都落在各自允許的「大字」或「非文字/邊框」門檻內）;`--muted` 4.93:1 合格但餘裕小,列為觀察項而非現行缺陷。**再次強調：這只是色碼算出來的理論對比值,沒有考慮螢幕實際色彩管理、使用者系統層級的對比度增強設定、深色模式下的等效組合是否同樣安全**（深色模式 token 在 `global.css:1226-1231` 有另一組定義,本次未逐一重算,列為**無法驗證**的部分）。

---

## 6. 風險總表（§14）

| # | 發現 | 位置 | 風險 | 性質 |
|---|---|---|---|---|
| 1 | image-to-dxf 校正畫布無鍵盤替代操作 | `ConversionApiTool.astro:64,331` | 🟠 中高 | 讀碼確定事實 |
| 2 | ChartMaker 動態列輸入只有 placeholder,無 aria-label,欄位標題列對 AT 隱藏 | `ChartMaker.astro:15,113-125` | 🟡 中 | 讀碼確定事實,已寫紅燈測試 |
| 3 | pdf-table-to-excel 表格編輯器每格 input 完全無名稱 | `ConversionApiTool.astro:279` | 🟡 中 | 讀碼確定事實,已寫紅燈測試 |
| 4 | 全站 0 處使用 `aria-describedby`/`aria-invalid`,錯誤與欄位無持久關聯 | 全站 69 檔案 | 🟡 中（`role="alert"` 部分補償) | 讀碼確定事實(窮舉) |
| 5 | BreakReminder 階段狀態無 aria-live/role=status | `BreakReminder.astro:26` | 🟡 中 | 讀碼確定事實,已寫紅燈測試 |
| 6 | ImageFormatConverter/TimestampConverter 處理中或結果區缺少即時回饋 | 見 §3 表格 | 🟡 中 | 讀碼確定事實 |
| 7 | 安裝提示關閉按鈕 34px,小於全站 44px 基準 | `global.css:1693-1732` | 🟢 低（未違反 WCAG 24px 底線) | 讀碼確定事實 |
| 8 | `--muted` 文字對比 4.93:1,餘裕小 | `global.css:4` | 🟢 低（觀察項) | 色碼計算,非螢幕量測 |
| 9 | Tab 順序、深色模式對比、375px 實際體感 | — | 無法評級 | **無法驗證**(需要真實瀏覽器) |

---

## 附錄：本報告在稽核中實際執行過的指令（供覆核，皆在 `/home/user/funnytools-win` 下執行）

```
npm ci && npm run build                      # 產出 dist/,1171 頁成功建置
which google-chrome chromium chromium-browser  # 三者皆無,確認無法沿用 CDP 式的 ui-dark-audit.mjs
grep -rc "aria-describedby" src/components/tools/*.astro
grep -rc "aria-invalid" src/components/tools/*.astro
grep -rln "aria-live" src/components/tools/*.astro   # 反向找出 0 命中的 11 個檔案,逐一人工分類
node --experimental-strip-types --test tests/a11y-structure.test.mjs
```
