# 前端可靠度與輸出安全：發現與修正

- 日期：2026-09-07
- 範圍：`src/`（不含後端；後端見 `backend-reliability-findings.md`）
- 方法：只讀原始碼 + 本機 build／測試。稽核環境對外封鎖 `funnytools.win`，
  **未對線上站台發出任何請求**。

---

## 1. 工具相依分類（83 個 live 工具）

| 類別 | 數量 | 說明 |
|---|---|---|
| BACKEND_DEPENDENT | 5 | 把輸入檔上傳到 `api.funnytools.win` 才能運作 |
| MIXED（本機處理 + 下載時上傳） | 3 | 處理在瀏覽器，但下載走 email gate |
| LOCAL | 75 | 完全在瀏覽器內完成 |

BACKEND_DEPENDENT：`bulk-image-compressor`、`pdf-to-word`、`pdf-table-to-excel`、
`image-to-dxf`、`pdf-compressor`。

MIXED：`image-compressor`、`qr-code-generator`、`merge-pdf`。
這三個是刻意的名單蒐集試點（boss directive 2026-07-10，commit `b9b5ee4`）：
工具維持免費，下載時要 email，檔案再由寄送服務寄出。**處理**確實在本機，
但下載時會把 email 與 5 MiB 以內的**產出檔**送到 `roomfeng.win/api/download-gate`。
所以它們不是 `LOCAL_ONLY`。

這兩份名單由 `tests/tool-dependency-map.test.mjs` 鎖定：新增工具若悄悄開始上傳、
或 gate 擴散到其他工具，測試就會紅。

## 2. 隱私宣稱

修正的不實宣稱：

| 位置 | 原文問題 |
|---|---|
| `categoryContent.ts` `image-compressor` blurb | 「圖片不會上傳到伺服器」／「images never leave your browser」——gate 會送出產出檔 |
| `categoryContent.ts` `merge-pdf` blurb | 「檔案全程不離開瀏覽器」／「nothing uploaded」——同上 |
| `ToolLayout` 的 local-only 徽章 | 「不會將任何資料上傳到伺服器」在這三頁是假的 |
| `categoryContent.ts` image／draw 分類前言 | 把整個分類講成本機，但含 `bulk-image-compressor`／`image-to-dxf` |
| `seoGuides.ts` merge-pdf 指南 | 在「不上傳」的文章裡推薦會上傳的 pdf-compressor |
| `seo-guides/task-003/01` | 把 pdf-compressor 描述成本機、上限寫 40MB（實為 80MB） |

徽章改法：`ui.privacy.downloadGated` 只在這三頁取代 `ui.privacy.localOnly`，
其餘 75 個本機工具的文案完全不動。這是刻意的——`ui` 裡任何共用字串的改動都會
重寫全部 83 個工具頁，讓 `sitemap-tools.xml` 的 lastmod 全數塌到同一天，
`npm run audit:seo-collapse` 會擋下來。

`tests/privacy-claim-consistency.test.mjs` 鎖定這些宣稱，紅燈時只能改文案或改程式，
不得放寬斷言。

## 3. 輸出安全

| 修正 | 位置 |
|---|---|
| JSON→CSV 的公式逸出：控制項不存在時預設**開啟**保護（原為 `\|\| false`，靜默關閉） | `DataConverter.astro` |
| `escapeFormulae` 的 label 補上 zh/en，選項區塊在四個語系都會渲染 | `new-utility-tools.ts`、`DataConverter.astro` |
| 校正圖 object URL 未 revoke，每換一張就洩漏一份完整影像記憶體 | `ConversionApiTool.astro` |
| 下載檔名未消毒 | `ImageFormatConverter.astro` |
| Clipboard API 被拒時是未處理的 rejection，使用者零回饋 → 退回 `prompt` | `DataConverter`、`MarkdownPreviewer`、`TimestampConverter`、`UuidGenerator` |

`tests/output-safety.test.mjs`（19 則）鎖定這些。
XLSX 公式注入屬後端，斷言在 `backend/tests/`。

## 4. 無障礙

| 修正 | 位置 |
|---|---|
| 狀態文字沒有 live region；順帶避免每秒重寫造成螢幕閱讀器重複朗讀 | `BreakReminder.astro` |
| 資料列輸入框只有 placeholder（開始輸入就消失），補 `aria-label` 含列號 | `ChartMaker.astro` |
| 表格編輯器每一格都叫「編輯文字」，補逐格可及名稱（表格 N · 列 R · 欄 C） | `ConversionApiTool.astro` |

`tests/a11y-structure.test.mjs`（7 則）鎖定結構性條件。

## 5. 計算正確性

`tests/calculator-golden-vectors.test.mjs`（116 則）。期望值來自教科書公式、
標準定義或本檔內另一條路徑的參考實作（t 分配用 Simpson 積分、星期用 Sakamoto），
**不以現有程式輸出當期望值**。

唯一修到計算的是圖表座標：`CompoundInterest` 的長條用 `i/n`、折線用 `i/(n−1)`，
分母不同會逐年拉開，10 年時最後一根差 56px，圖形無法對應資料。長條改用折線的映射。

三種斷言的證據強度已在該檔標示清楚：數學獨立向量（正確性證明）、
不變量測試、來源錨點（只是防漂移的結構守門，**不是**正確性證明）。

## 6. 已知但本輪不動的項目

| 標記 | 內容 |
|---|---|
| `DECISION_NEEDED_NEGATIVE_BASE_PERCENT_CHANGE` | 百分比變化在負基準時，已載明的 `(B−A)÷A` 會讓方向字與數值變化方向相反。改成除以 `\|A\|` 是**新的產品定義**（且會讓已公開的 FAQ 公式失效），不是修 bug。目前以特性化測試釘住現況。 |
| `DECISION_NEEDED_NET_SALARY_DISPLAY_ROUNDING` | 「總收入／扣除合計／估算實領」各自捨入，約 5% 的輸入會差 1 元而無法逐項對帳。要讓畫面完全相加相等，得接受顯示值與真實 net 差 1 元。呈現層 vs 計算層的產品取捨。 |
| `DECISION_NEEDED_IMAGE_TO_DXF_KEYBOARD_EQUIVALENT` | `image-to-dxf` 的校正畫布只能用滑鼠點擊，沒有鍵盤等價操作。需要 UX 設計，不硬做一個品質差的版本。 |
| `DECISION_NEEDED_DOWNLOAD_GATE_WIDGET_COPY` | gate 表單自己的 privacyNote 寫「不會外流／Never shared」（email 實際交給第三方寄信服務，未經查證），且完全沒提到**檔案**也會被送出。改一個字就會重寫全部 83 個工具頁並觸發 lastmod 塌陷守門，須併入本來就會動全站 chrome 的發布。 |
| `IMPLEMENTATION_VARIANCE` | `pdf-compressor` 在 zh/en 走後端、es/fr 走本機 `PdfCompressor.astro`，同一個 routeKey 兩套實作。本輪不統一、不改 route。 |
| `FOLLOWUP_PDF_COMPRESSOR_IMPLEMENTATION_UNIFICATION` | 上一項的後續任務。 |
| `FOLLOWUP_PWA_OFFLINE_TOOL_ROUTING` | 離線時部分工具頁靜默跳首頁（`sw.js` 設計），屬 PWA 行為任務。 |

## 7. 驗證

前端 `npm test`：**221 passed, 0 failed**（含本次新增的 5 個測試檔）。
`npm run lint`、`npm run typecheck`、`npm run build`（1,171 頁）、
`npm run preflight`（含 12 個 audit）全數通過。

未驗證：所有結論都來自原始碼與本機 build，**沒有對線上站台做過任何請求**，
也沒有真實瀏覽器／螢幕閱讀器的人工測試。
