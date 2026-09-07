# FunnyTools 可靠度矩陣（任務書 §17）與發布判定（§18）

日期：2026-09-07
分支：`claude/task-02-funnytools-reliability`
基準：83 個 `status: 'live'` 工具（`src/data/tools.ts` 為唯一真實來源）

## 環境限制（貫穿全表，必讀）

本 session 的對外政策**封鎖 `funnytools.win` 與 `api.funnytools.win`**（proxy 回 403 CONNECT）。
因此**全表沒有任何一格是線上實測**。所有結論只來自三種證據：

1. repo 原始碼
2. 本機 `npm run build` 產出的 `dist/`（1,171 頁）
3. GitHub Actions 的歷史 log

凡是需要真實瀏覽器、真實裝置或線上 API 才能確認的項目，一律標記為
**「未驗證」**，不以推斷冒充實測。

## 矩陣（依實作群組，非逐一列出 83 個工具）

| 群組 | 數量 | 路由樣式 | 相依 | Smoke | 準確性 | 無效輸入 | 隱私 | 輸出安全 | 瀏覽器 API | 行動／a11y | 狀態 |
|---|---:|---|---|---|---|---|---|---|---|---|---|
| **轉檔（後端）**<br>`bulk-image-compressor`、`pdf-to-word`、`pdf-table-to-excel`、`image-to-dxf`、`pdf-compressor` | 5 | `/tools/<slug>/`＋`/en/` | BACKEND | ✅ 每日 production smoke 涵蓋全部 7 端點 | n/a | ⚠️ 前端**無**大小預檢；型別 4/5（`image-to-dxf` 缺） | ✅ 已揭露兩段上傳 | ✅ 檔名為前端常數、不信任後端 header | ⚠️ API 不可用時顯示 `HTTP 530` 字面 | ✅ 逐格可及名稱已補 | **CONDITIONAL** |
| **PDF（本機）** | 11 | `/tools/<slug>/` | LOCAL | ❌ 無 | ✅ 既有測試 | ✅ | ✅ | ✅ 檔名已清洗 | ⚠️ `pdf-to-image` 用過也無法離線 | 未驗證（實機） | READY |
| **影像（本機）** | 12 | `/tools/<slug>/` | LOCAL | ❌ 無 | ✅ | ✅ | ✅ gate 已移除，宣稱恢復為真 | ✅ `ImageFormatConverter` 檔名已補清洗 | ⚠️ `createImageBitmap`／WebP 無顯式偵測 | 未驗證（實機） | READY |
| **金錢計算機** | 6 | `/tools/<slug>/` | LOCAL | ❌ 無 | ✅ 黃金向量；修正負基準百分比方向錯誤、實領顯示對帳 | ✅ | ✅ | ✅ | ✅ | ✅ | READY |
| **統計／教育計算機** | 18 | `/tools/<slug>/` | LOCAL | ❌ 無 | ✅ 黃金向量（母體/樣本標準差等已驗） | ✅ | ✅ | ✅ | ✅ | ⚠️ ChartMaker 可及名稱已補 | READY |
| **時間／日期** | 8 | `/tools/<slug>/` | LOCAL | ❌ 無 | ✅ 黃金向量 | ✅ | ✅ | ✅ | ✅ | ✅ BreakReminder live region 已補 | READY |
| **文字／編碼** | 12 | `/tools/<slug>/` | LOCAL | ❌ 無 | ✅ | ✅ | ✅ | ✅ markdown 消毒有效；CSV 公式逸出已修 | ✅ clipboard fallback 已補 | ✅ | READY |
| **隨機／產生器** | 10 | `/tools/<slug>/` | LOCAL | ❌ 無 | ✅ | ✅ | ✅ | ✅ 無使用者輸入進入 `href` | ✅ | ✅ | READY |
| **繪圖／Canvas** | 6 | `/tools/<slug>/` | LOCAL | ❌ 無 | ✅ 複利圖表座標系已修 | ✅ | ✅ | ✅ | ⚠️ `image-to-dxf` 校正畫布**只能用滑鼠點擊，無鍵盤等價操作** | ⚠️ 同左 | CONDITIONAL |

**合計 83。** 群組數量取自 `src/data/tools.ts` 的 category 欄位（`statistics` 14 ＋ `study` 4 合併為統計／教育）。

## 未涵蓋與未驗證項目（誠實清單）

| 項目 | 狀態 | 原因 |
|---|---|---|
| 線上頁面與線上 API 行為 | **未驗證** | 網域被本 session 的對外政策封鎖 |
| 後端 OCR 全路徑 | **未驗證** | 本機無 tesseract；2 則測試以 skip 標注，未假裝通過 |
| 實機行動裝置與螢幕閱讀器 | **未驗證** | 結論由原始碼與 `dist/` 結構推斷，任務書 §14 明示不硬引入 Playwright |
| 對比度 | 部分未驗證 | 僅能從 CSS 變數判斷，未做實際算繪取樣 |
| Excel 實際開檔行為 | **未驗證** | 判定停在「檔案內容確實是／不是公式節點」這一層 |
| 本機工具的 production smoke | **無** | 任務書 §11 未要求；本機工具由單元測試涵蓋 |

## 發布判定（任務書 §18）

### 結論：**BLOCKED**

唯一且充分的理由：

> production conversion API is still truly broken for live backend-dependent tools

`api.funnytools.win` 的來源端在無任何部署活動的情況下會間歇性連續 4 分鐘以上完全連不上
（六次排程取樣四次紅，決定性證據是同一 commit `ea44fdb` 在 09-04 綠、09-05 與 09-06 紅）。
五個線上工具依賴它。詳見 `Company Vault/03_Incidents/2026-09-06-*`。

本次在 repo 內移除了一條**已證實存在、本機可重現、且與線上症狀完全相容**的致因
（事件迴圈阻塞 → HEALTHCHECK 失敗 → 530），但**本 session 無法連線 production，
因此不得宣稱線上已修復**。§16 要求的 (A)「線上服務確實被修復」尚未成立。

### 其他 §18 條件的檢查結果

| 條件 | 結果 | 依據 |
|---|---|---|
| P0 wrong calculation | **已清除** | 負基準百分比方向錯誤已修；黃金向量 117 則全綠 |
| data loss / privacy false claim | **已清除** | download gate 已移出三個本機工具；轉檔工具文案已揭露兩段上傳 |
| unsafe output | **已清除** | CSV 公式逸出、後端 xlsx 公式注入、檔名清洗、object URL 皆已修 |

也就是說：**若線上 conversion API 恢復穩定，判定即可升為 READY_FOR_CURRENT_SCOPE。**
在那之前，前端與後端的高風險路徑本身已通過。

## 解除 BLOCKED 需要的兩件事

1. **老闆提供後端主機位置**（repo 內沒有任何部署該 container 的 workflow 或文件）。
2. **合併本 PR 後觀察線上表現**。`fable-company` 已新增 `api.funnytools.win/health`
   的 30 分鐘存活監控與 Discord 警報，一週後即可用實際可用性數據判定：
   紅燈消失 → 構成 §16 的 (A)；紅燈仍在 → 代表主機層還有第二個致因。
