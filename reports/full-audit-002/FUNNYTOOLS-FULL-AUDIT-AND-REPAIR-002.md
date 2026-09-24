# FUNNYTOOLS-FULL-AUDIT-AND-REPAIR-002

日期：2026-09-24
RESULT：**PARTIAL**（候選修復與指定本機驗收通過；尚未 merge／deploy，完整 86 工具功能操作矩陣未逐工具執行）

## 身分與範圍

- Baseline main / production SHA：`c5b7bb0592994fab3547577409d7cff940b4b9aa`；最近成功 Pages deploy 使用同 SHA。
- Final SHA：以本修復 Draft PR 最新 head 為準；尚非 production SHA。
- 保持 T2 index policy 不變：sitemap 20 URL、build 1,192 route、indexable 20、noindex 1,172（含 redirect stubs）、redirect stubs 338。
- 未新增 SEO 頁、未改 GA4／affiliate ID、未送 Request Indexing、未 merge／deploy。

## BEFORE → AFTER

`BEFORE` 是 production 的 sitemap index、兩個 child sitemap 及 20/20 URL 逐一 HTTP 爬測；`AFTER` 是最終候選 `dist` 的本機 HTTP 逐一爬測。明細見同資料夾 CSV／JSON／MD。

| 指標 | BEFORE production | AFTER candidate |
| --- | ---: | ---: |
| sitemap URL／逐頁已爬 | 20／20 | 20／20 |
| HTTP 200／3xx／4xx／5xx | 20／0／0／0 | 20／0／0／0 |
| sitemap child | 2 | 2 |
| built route／noindex route | 1,192／1,172 | 1,192／1,172 |
| sitemap path 無 build | 0 | 0 |
| broken internal link | 0 | 0 |
| sitemap 頁跨語連結 | 0 | 0 |
| 重複 title／canonical | 0／0 | 0／0 |
| 可見版本 | 全數 `v5.147.1` | 全數 `v5.147.1` |

20 個 URL 的 title、description、H1、canonical、robots、hreflang、`html lang` 與 BEFORE 相同；無新索引、斷鏈、canonical 或 hreflang regression。首頁、英文與西法文 noindex 頁的修復不會反映在 20 頁 sitemap 差異表中。版本 drift：**NOT REPRODUCED／NO CHANGE**。

## 修復與驗證

- 英文首頁 ToolCard 改用目前 `lang`；資料名稱、卡片文字與工具 URL 隨語系呈現。首頁、共用 Nav 桌面／手機、Footer、category／guide／tool breadcrumb 使用現有 `localePath`／`categoryUrl`，不再把英文頁默默導回繁中。
- 全站 1,191 個 `index.html`、41,485 條同站內鏈接受 locale link audit；跨語連結 2,235 條中 1,792 條為語言切換、368 條為明示的繁中揭露頁、75 條為明示的法文頁至繁中支援頁；非預期違規 0。英文與西文支援區改連當地版本，法文無對應頁時明示繁中目的地。
- PDF 表格工具有三個不同操作：預覽、匯出已編輯 XLSX、下載完成 XLSX；按鈕文案與啟用時機在瀏覽器模擬 API 中驗證。
- 明定 canonical tool 三種資料流 `LOCAL_ONLY`、`LOCAL_PROCESSING_GATED_OUTPUT`、`CONVERSION_API`，並對全部 live canonical route 作唯一分類與隱私中繼資料比對。Conversion API 的檔案上傳揭露及三個本機處理／郵件交付工具的揭露維持不變；圖片轉 DXF 新增非圖片 MIME 的前端拒絕。
- Playwright：38/38 case PASS。86 個繁中 canonical tool route、83 個有英文版本的 route 通過 HTTP、渲染、單一 H1、語系、自指 canonical、可聚焦控制項、手機可見及無 fatal page error；其餘 3 個英文 route 在產品資料中不可用，標為 `NOT_AVAILABLE_IN_LOCALE`。這是全量 mount／基本互動矩陣，不是宣稱 86 個工具每一項計算結果皆已驗證。
- 三個 download-gated 工具在 mock 郵件端點下測到本地產物、錯誤與正確 email、記住／更換 email、端點失聯本地 fallback、過大郵件附件省略與本地下載。五個 Conversion API 工具各測成功、錯誤 MIME、API error、網路失敗、413 過大回應、取消與重複點擊抑制；PDF 表格另測 preview→edit/export→download。
- 真實本機 Conversion API `npm run test:api` PASS：health、CORS、批次圖片 ZIP、DOCX、表格預覽／XLSX、DXF、PDF 壓縮及 invalid input；API 身分 `NOT_ASSERTED`，不宣稱 production 後端隨此 PR 改版。
- `npm test` 192/192 PASS、`npm run preflight` PASS、`npm run audit:locale-quality` PASS（但舊稽核列出 20 個 switcher review item，無 exit failure）、`npm run audit:lang-switch` PASS、`npm run audit:indexation` 20/20 且 finding 0；preflight 內的 editorial/security/analytics/PWA/content-value/seo:check 均 PASS；`npm run typecheck` PASS。
- Global Nav IA：保留 T2 教育統計導覽架構，**INTENTIONAL／NOT CHANGED**；非教育工具頁仍有工具頁分類 breadcrumb 與相關工具。未為視覺偏好破壞索引復原內鏈。

## 問題 A–H

- A. `/en/` ToolCard 仍顯示中文？**否**。
- B. 英文 Nav 桌面／手機／Footer 仍默默跳繁中？**否**。
- C. PDF Table → Excel 仍有兩顆相同 Export？**否**。
- D. 三種資料流與 Privacy/UI 一致？**候選版 contract PASS；真實 email 服務僅 mock，未做購買／交付外部驗證**。
- E. 五個 Conversion API 功能 smoke PASS？**是：mock UI E2E 及真實本機 API integration 均 PASS**。
- F. 三個 gated-download tools PASS？**mock 端點及本地 fallback E2E PASS；真實郵件交付未驗證**。
- G. 全 sitemap 是否逐 URL crawl？**是：BEFORE 20/20，AFTER 20/20**。
- H. 新增 broken link／canonical／hreflang regression？**未發現**。

未宣稱正式站已修復；production readback 需待合併與合規 release 後再做。`PARTIAL` 只代表交付狀態與非高風險工具尚未逐項輸入／結果斷言，不代表上述已執行驗收失敗。
