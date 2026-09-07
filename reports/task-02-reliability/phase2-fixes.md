# 第二階段稽核紅燈修復紀錄（七項機械性缺陷）

- 分支：`claude/task-02-funnytools-reliability`
- 起點：`53c9619`（`node --test tests/*.test.mjs` = 220 則 / 211 綠 / 9 紅）
- 完成後：**220 則 / 216 綠 / 4 紅**
- 未 commit、未 push；只改 `src/`，未動 `backend/`、`.github/`、route/canonical/hreflang、
  GA4/affiliate schema，也沒有升級任何依賴。
- **沒有放寬、刪除或跳過任何斷言。** 兩則仍紅的測試是「測試本身寫錯」，理由見 §8。

## 環境限制聲明

對外網路封鎖 `funnytools.win` 與 `api.funnytools.win`（proxy 403），
因此本報告**沒有任何線上驗證**，所有證據都來自原始碼與本機 `npm run build` 產物（`dist/`）。

---

## 1. §4 json-to-csv 公式逸出控制項在 zh/en 沒有渲染

**根因（兩層，跟原判斷不同）**

`DataConverter.astro` 的 `escapeFormulae` 預設值在上一輪已經改成
`root.querySelector('[data-escape-formulae]')?.checked ?? true`，所以 zh/en 的**保護本身已經生效**；
缺的是控制項本身。但 `escapeFormulaeLabel` 只在 `es-tools-14.ts` / `fr-tools-14.ts` 有文案，
**而且**整個選項區塊被包在 `{labels.delimiterLabel && (...)}` 裡——zh/en 的 json-to-csv 連
`delimiterLabel` 都沒有，所以就算補上 `escapeFormulaeLabel`，區塊仍然不會渲染。

**修法**

- `src/components/tools/DataConverter.astro`：把外層條件從 `labels.delimiterLabel` 改成
  「四個選項標籤任一存在」，並把分隔符號 `<label>` 自己包進 `{labels.delimiterLabel && ...}`；
  格線類別改成 `labels.delimiterLabel ? 'form-grid two-col' : 'form-grid'`。
  es/fr 仍然是原本的兩欄版面（分隔符號選單＋三個 checkbox），完全沒有變動。
- `src/i18n/tools/new-utility-tools.ts`：`dataConfig()` 只在 `json-to-csv` 方向補上
  `escapeFormulaeLabel: { zh: '保護看起來像公式的儲存格', en: 'Protect cells that look like formulas' }`
  （語氣比照 es/fr 的 `Proteger celdas que parecen fórmulas`；`csv-to-json` 走 `Papa.parse`
  用不到這個選項，因此不加，與 es/fr 的既有分工一致）。

**驗證（dist 產物 grep）**

```
$ grep -o 'data-escape-formulae[^>]*' dist/tools/json-to-csv/index.html \
    dist/en/tools/json-to-csv/index.html \
    dist/es/herramientas/convertir-json-a-csv/index.html \
    dist/fr/outils/convertir-json-en-csv/index.html
dist/tools/json-to-csv/index.html:data-escape-formulae type="checkbox" checked data-astro-cid-o4fsnvci
dist/en/tools/json-to-csv/index.html:data-escape-formulae type="checkbox" checked data-astro-cid-o4fsnvci
dist/es/herramientas/convertir-json-a-csv/index.html:data-escape-formulae type="checkbox" checked data-astro-cid-o4fsnvci
dist/fr/outils/convertir-json-en-csv/index.html:data-escape-formulae type="checkbox" checked data-astro-cid-o4fsnvci
```

四個上線頁都有控制項，且都是 `checked`（預設開啟）。
es/fr 版面沒有回歸：`grep -c 'form-grid two-col'` 在
`convertir-json-a-csv` / `convertir-json-en-csv` / `convertir-csv-a-json` 皆為 1。

**測試仍紅** —— 原因不在原始碼，見 §8.1。

---

## 2. §5 ConversionApiTool 校正圖 object URL 沒有 revoke

**根因**：`image-to-dxf` 每次選檔都 `calibrationImage.src = URL.createObjectURL(file)`，
整個元件沒有任何 `revokeObjectURL`，`clear()` 也只是把 `calibrationImage` 設成 `null`，
每換一張圖就洩漏一份完整影像記憶體到分頁關閉為止。

**修法**（`src/components/tools/ConversionApiTool.astro`）

- 新增 `calibrationObjectUrl` 狀態與 `releaseCalibrationObjectUrl()`。
- `change` handler 改成：先釋放前一張 → `createObjectURL` → 在 `onload` **與** `onerror`
  裡釋放（`release()` 會確認釋放的是同一個 URL，避免快速連續換檔時誤殺新的那份）。
- `clear()` 一併呼叫 `releaseCalibrationObjectUrl()`。

**為什麼在 `onload` revoke 是安全的**：這個 object URL 只餵給 `new Image()`，
`onload` 觸發時影像已經 decode 完成，之後 `drawCalibration()` 的 `ctx.drawImage()`
用的是已解碼的 `HTMLImageElement`，不會再回頭讀 URL。
**這條路徑跟下載無關**——五個轉檔工具的下載一律走 `src/lib/funnytools-api.ts` 的
`downloadBlob()`，它自己建立與 revoke（`setTimeout(..., 1000)`），沒有被動到，
所以不存在「下載還沒開始就 revoke」的風險。

**驗證**：`§5 [RED] ConversionApiTool 的校正圖 object URL 必須被 revoke` 由紅轉綠；
`§7 ConversionApiTool 的下載檔名一律是前端常數` 仍綠（下載路徑沒被影響）。

---

## 3. §6 ImageFormatConverter 沒有清洗使用者檔名

**根因**：13 個用 `file.name` 組下載檔名的工具裡，只有 `ImageFormatConverter.astro`
直接 `file.name.replace(/\.[^.]+$/,'')`——只砍副檔名，路徑分隔符、控制字元、
超長檔名一律原樣塞進 `a.download`。

**修法**：沿用其他 12 個工具**完全相同**的清洗器（`ImageCompressor` / `ImageCrop` /
`ImageResizer` / `MergePdf` … 的 `fileBaseName()` / `safeBaseName()`），沒有另立標準：

```js
function fileBaseName(name){return name.replace(/\.[^.]+$/,'').replace(/[^\w-]+/g,'-').replace(/^-|-$/g,'')||'image';}
```

`fileName` 改成 `` `${fileBaseName(file.name)}.${labels.extension}` ``。

**驗證**：`§6 [RED] 所有用 file.name 組下載檔名的工具都要過濾檔名` 由紅轉綠
（13 個工具全數通過同一條正規式檢查）。

---

## 4. a11y：clipboard.writeText() 沒有失敗處理

**根因**：Clipboard API 在非安全上下文、使用者拒絕權限、或舊瀏覽器上會 reject，
四處呼叫都沒有 `try/catch` 也沒有 `.catch()`，變成未處理的 rejection，使用者看不到任何回饋。

**修法**：四處一律比照 `AgeCalculator.astro` 既有的成功樣板
（`try { await ... } catch { window.prompt(<既有 label>, <文字>) }`），
訊息全部走該工具**既有的 labels 機制**，沒有寫死任何中文或英文字串：

| 檔案 | 退路訊息用的 label | zh / en / es / fr 都存在？ |
|------|------------------|--------------------------|
| `DataConverter.astro` | `labels.copy` | ✅（es `Copiar CSV` / fr `Copier le CSV`） |
| `MarkdownPreviewer.astro` | `labels.copyHtml` | ✅（es `Copiar HTML saneado` / fr `Copier le HTML assaini`） |
| `TimestampConverter.astro` | `labels.copy` | ✅（es `Copiar ISO`） |
| `UuidGenerator.astro` | `labels.copy` | ✅（es `Copiar todos`） |

失敗時彈出 `window.prompt`，把要複製的內容預先選取好讓使用者手動複製——
跟 `AgeCalculator` 的既有行為一致。

**驗證**：`every navigator.clipboard.writeText() call has a try/catch or .catch() fallback`
由紅轉綠（掃描全部 tool widget，0 個未保護）。

---

## 5. a11y：ChartMaker 每列 label/value input 沒有可及名稱

**根因**：`createRow()` 只設 `.placeholder`，而 placeholder 不是可靠的 accessible name
（開始輸入後就消失），視覺欄位標題列 `.chart-rows-head` 又是 `aria-hidden="true"`，
螢幕閱讀器使用者拿不到任何名稱。

**修法**（`src/components/tools/ChartMaker.astro`）

- 新增 `rowFieldName(header, position)`，用**既有 label**（`labels.labelHeader` /
  `labels.valueHeader`）加上列號組成可定位的名稱，例如 zh「標籤 3」「數值 3」、
  en「Label 3」「Value 3」、es「Categoría 3」——沒有新增任何硬寫字串或新 label key
  （bar/pie chart maker 有 zh/en/es/fr 四語系，避免文案缺口）。
- `labelInput.setAttribute('aria-label', ...)`、`valueInput.setAttribute('aria-label', ...)`。
- 新增 `renumberRows()`，在新增列與刪除列之後重新編號，避免刪列後名稱與實際位置對不上。

**驗證**：`ChartMaker per-row label/value inputs expose an accessible name beyond their placeholder`
由紅轉綠。

---

## 6. a11y：pdf-table-to-excel 逐格輸入沒有可及名稱

**根因**：`renderTables()` 對偵測到的表格每一格都 `document.createElement('input')`，
沒有 `aria-label` / `aria-labelledby` / `<label>`，也沒有任何欄列脈絡，
螢幕閱讀器在幾十格之間只會一律唸「編輯文字」。

**修法**（`src/components/tools/ConversionApiTool.astro`）

- 每格 `input.setAttribute('aria-label', cellName(rowIndex, columnIndex))`，名稱組成為
  `${labels.table.replace('{number}', N)} · ${labels.rowNumber} R · ${labels.columnNumber} C`
  → zh「表格 1 · 列號 2 · 欄號 3」、en「Table 1 · Row number 2 · Column number 3」。
- 每列的「刪除列」按鈕原本每一列名稱都一樣，一併補上帶列號的 `aria-label`
  （比照同檔 `renderFileList()` 既有的 `remove.setAttribute('aria-label', ...)` 寫法）。
- `src/i18n/tools/conversion-api-tools.ts` 補上唯一缺的 label key
  `rowNumber: '列號' / 'Row number'`，放在既有的 `columnNumber` 旁邊。
  pdf-table-to-excel 只有 zh/en 兩個語系（不在 `expansion-routes.json` 的 es/fr 清單裡），
  兩邊都補了，語系 parity 沒有破口（`npm run audit:locale-quality` 全 0 issue）。

**驗證**：`ConversionApiTool pdf-table-to-excel per-cell inputs expose an accessible name`
由紅轉綠。

---

## 7. a11y：BreakReminder 階段狀態沒有 live region

**根因**：`<p class="phase-label" data-status>` 會在工作／休息切換時改文字，
但沒有 `aria-live` 也沒有 `role="status"`，螢幕閱讀器使用者除非剛好把焦點移回去，
否則完全不會被告知階段變化。

**修法**（`src/components/tools/BreakReminder.astro`）

- 標記改成 `<p class="phase-label" data-status role="status" aria-live="polite">`。
- `render()` 每秒都會跑，原本無條件 `status.textContent = ...` 會每秒重建文字節點，
  對 live region 來說可能造成重複朗讀；改成先算出 `nextStatus`，
  **只有內容真的變了才寫回去**。這樣只有階段切換（`labels.focus` /
  `labels.breakTime` / `labels.timeToMove` / `labels.breakDone` / `labels.ready`）
  才會觸發播報。

**測試仍紅** —— 原因不在原始碼，見 §8.2。

---

## 8. 兩則仍然紅的測試：斷言本身寫錯（依指示保持紅燈，未自行改弱）

### 8.1 `§4 [RED] json-to-csv 每個語系的上線頁都必須提供公式逸出防護`

失敗輸出：

```
error: |-
  這些 json-to-csv 頁面沒有公式逸出防護：zh/tools/json-to-csv/index.html
  + [ 'zh/tools/json-to-csv/index.html' ]
  - []
```

**問題**：測試的頁面清單同時列了 `tools/json-to-csv/index.html` 與
`zh/tools/json-to-csv/index.html`，但站台預設語系就是 zh-Hant，
**zh 的上線頁是 `/tools/json-to-csv/`**；`/zh/tools/...` 是舊網址的
canonical + meta refresh **轉址 stub**，本來就不含任何工具元件：

```
$ head -c 300 dist/zh/tools/json-to-csv/index.html
<!DOCTYPE html><!-- 2026-07-25 SEO 稽核（CEO 派工）：拿掉大部分 /zh/* stub 的 noindex，
只留 canonical + meta refresh … --><html lang="zh-Hant"> <head>…
<link rel="canonical" href="https://funnytools.win/tools/json-to-csv/">
<meta http-equiv="refresh" content="0; url=/tools/json-to-csv/">
<title>Redirecting...</title></head> <body> <p>Redirecting to …</p> </body></html>

$ grep -rl "tool-widget" dist/zh/tools/ | head
（無輸出——全站 /zh/tools/* 沒有任何一頁含工具元件）
```

也就是說，這條斷言要求一個轉址 stub 渲染工具控制項，**在目前架構下永遠不可能成立**，
除非把 `/zh/*` stub 改成真頁面（那會直接違反 CLAUDE.md 的 canonical / 轉址設計紅線）。

**建議修法（未執行，等指示）**：把清單裡的 `zh/tools/json-to-csv/index.html` 移除，
或改成「若該路徑是 meta-refresh stub 則跳過」。斷言強度不變（其餘 4 個真實上線頁仍要有防護）。

### 8.2 `BreakReminder phase status announces changes via aria-live or role=status`

失敗輸出：

```
error: 'expected to find the phase-label <p data-status> markup'
  at tests/a11y-structure.test.mjs:183:10
```

**問題**：這條測試的「錨點」與「斷言」互相矛盾，**在數學上無解**：

```js
const statusTagMatch = /<p class="phase-label" data-status>[^<]*<\/p>/.exec(source);
assert.ok(statusTagMatch, 'expected to find the phase-label <p data-status> markup');
assert.match(statusTagMatch[0], /aria-live=|role="status"/, …);
```

錨點把開標籤寫死成 `<p class="phase-label" data-status>`（後面直接接 `>`），
內容部分是 `[^<]*`（不可含 `<`）。所以：

- 只要在這個 `<p>` 上加 `aria-live` 或 `role="status"`（也就是**正確的修法**），
  開標籤就不再等於那串字面值，`exec` 回傳 `null`，第一個 `assert.ok` 就先炸掉；
- 不加，就過不了第二個 `assert.match`。
- `statusTagMatch[0]` 只涵蓋「固定開標籤 + 純文字內容 + `</p>`」，
  第二條要找的字串**不可能**出現在這個區間裡。

我已經照 §7 把真正的無障礙缺陷修好（`role="status" aria-live="polite"` +
只在文字變動時才更新，避免每秒重播），但依照指示**沒有動測試**，
因此它現在失敗在「錨點漂移」那一行，而不是失敗在無障礙屬性缺失。

**建議修法（未執行，等指示）**：只把錨點放寬成容許額外屬性，
`/<p class="phase-label" data-status[^>]*>[^<]*<\/p>/`，
真正的 `aria-live=|role="status"` 斷言強度完全不變。

### 刻意不碰的兩項（依指示保持紅燈）

- `[RED:P2] GV-506 實領薪資：三個顯示數字必須自洽`
- `[RED:P2] GV-1701 複利圖表：長條與折線必須落在同一個 x 座標系`

---

## 9. 轉錄漂移守門

本輪七項都沒有動到任何計算式，`tests/calculator-golden-vectors.test.mjs` 的來源錨點測試仍綠：

```
$ node --test tests/calculator-golden-vectors.test.mjs
ok 1 - GV-000 來源錨點：所有轉錄的運算式仍存在於 production 原始碼
# tests 117
# pass 115
# fail 2      ← 只剩 GV-506 與 GV-1701
```

---

## 10. 完整驗證輸出

```
$ node --test tests/*.test.mjs
1..220
# tests 220
# suites 0
# pass 216
# fail 4
# cancelled 0
# skipped 0
# todo 0
# duration_ms 1399.020521

$ node --test tests/*.test.mjs | grep '^not ok'
not ok 6   - BreakReminder phase status announces changes via aria-live or role=status   ← §8.2 測試寫錯
not ok 48  - [RED:P2] GV-506 實領薪資：三個顯示數字必須自洽（總收入 − 扣除合計 = 實領）      ← 指示不碰
not ok 132 - [RED:P2] GV-1701 複利圖表：長條與折線必須落在同一個 x 座標系                   ← 指示不碰
not ok 163 - §4 [RED] json-to-csv 每個語系的上線頁都必須提供公式逸出防護                    ← §8.1 測試寫錯
```

```
$ npm run lint
> eslint "src/**/*.ts"
（無輸出＝通過）

$ npm run typecheck
> tsc --noEmit --project tsconfig.typecheck.json
（無輸出＝通過）

$ npm run build
08:38:52 [build] ✓ Completed in 17.17s.
08:38:52 [build] 1171 page(s) built in 17.40s
08:38:52 [build] Complete!
```

額外跑的內容稽核（確認 i18n 改動沒有副作用）：

```
$ npm run audit:editorial-leakage
Editorial leakage audit passed: 712 indexable URL(s) checked.

$ npm run audit:content-value
"failures": []
暫時清單剩餘 0 頁待手寫（tool 0 / guide 0 / workflow 0 / category 0 / audience 0）

$ npm run audit:locale-quality
"reciprocityIssues": 0, "canonicalIssues": 0, "switcherIssues": 0
```

（這三個稽核腳本會覆寫 `reports/*.json`，那些是可重新產生的產物、與本次修復無關，
已 `git checkout -- reports/*.json` 還原，保持 diff 乾淨。）

## 11. 本次改動檔案

```
 M src/components/tools/BreakReminder.astro
 M src/components/tools/ChartMaker.astro
 M src/components/tools/ConversionApiTool.astro
 M src/components/tools/DataConverter.astro
 M src/components/tools/ImageFormatConverter.astro
 M src/components/tools/MarkdownPreviewer.astro
 M src/components/tools/TimestampConverter.astro
 M src/components/tools/UuidGenerator.astro
 M src/i18n/tools/conversion-api-tools.ts
 M src/i18n/tools/new-utility-tools.ts
```

未 commit、未 push。`tests/` 一個字都沒改。
