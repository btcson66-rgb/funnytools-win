# FUNNYTOOLS-EDU-SEO-GROWTH-001 基線

日期：2026-09-18（T+0）

## 任務邊界

- 本階段是教育與測量統計的受控 SEO growth，優先品質、正確性與使用者價值。
- T+0 凍結期不提前發布新 SEO URL；第一個公開排程日為 2026-09-25。
- 只處理 zh-TW（站內 `zh`）與 en；es/fr 不新增教育 campaign 頁面。
- 不做大量 Request Indexing、不宣稱 Google indexing、traffic 或 conversion 成果。

## 目前站點基線

- 原始碼基線：`origin/main` / `80fe5f31`（v5.141.2）。
- 本地 clean build：1,182 個 HTML pages。
- indexable sitemap URL：717；sitemap 分布為 tools 86、guides 214、workflows 12、en 191、es 139、fr 75。
- T+0 公開 URL delta（新 campaign）：0。
- 現有 FunnyTools education/statistics 功能保留；Recovery/Phase2B 保護內容未改寫。

## 搜尋與索引證據狀態

2026-09-13 的 URL Inspection 基線記錄為：intended indexable 712、indexed 4、crawled-not-indexed 308、unknown 399。這是歷史觀測，不是本次新增頁面的因果證據；GSC 新鮮讀取與本 campaign 的 indexed result 仍為 `UNKNOWN / NOT YET EVALUATED`。

## 主要技術問題

原 sitemap lastmod map 只有 712 筆，且 generator 在 hash map 缺 URL 時會退回共用/當日訊號；當共享輸出變更時，tools/workflows 可能被錯誤標成同日。已在本 worktree 以 hash version 9 migration、live sitemap 回讀 fallback 與排程 publishAt 修復，詳見 `SITEMAP-LASTMOD-REPAIR.md`。
