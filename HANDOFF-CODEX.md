# FunnyTools SEO 優化任務交接書（給 Codex 指揮者）

> 產生日期：2026-07-02
> 交接來源：Claude Code 雲端 session（分支 `claude/funnytools-optimization-review-tr685u`）
> 用途：在本機開新對話，由該對話指揮 Codex 依本文件執行。執行前先讀完「三、關鍵地雷」。
> **2026-07-02 更新**：P0-1/P0-2/P2-1 已完成；原 P1-1/P1-2/P1-3/P2-2 因下方「重大發現」作廢，改為全站 blog 下架 + 斷鏈。詳見「六、blog 重建計畫」。

---

## 一、目前狀態（已完成、已推送到分支，尚未合併 main）

分支 `claude/funnytools-optimization-review-tr685u`，在 `22e869f`（首輪全站優化）之上新增：

- 效能：首頁 158KB→114KB、hover 預載、ToolLayout MutationObserver 修復、廣告位預留高度防 CLS、SW 快取上限 120 筆
- 深色模式：約 80 處硬編碼白底改為主題變數（畫布類工具白底刻意保留，見「關鍵地雷」）
- 工具卡片：`<a>` 包 `<button>` 無效 HTML 改為 div + stretched link
- SEO：Consent Mode v2、sitemap lastmod 改真實內容日期、WebApplication 加 dateModified、移除 meta keywords、`/llms.txt`、robots.txt 明列 AI 爬蟲
- **P0-1**：5 篇行銷類錯位文章（`sitemap-checklist-guide` 等）轉址到 `/blog/`，從 usefulBlogPosts 移除
- **P0-2**：清理 `importedEducationBlogPosts.ts`／`importedSeoBlogPosts.ts`／`seoResourcePosts.ts`／`blogPosts.ts` 的 `rawBlogPosts`，共減約 3MB 死碼
- **重大發現與全站 blog 下架**（取代原 P1-1/P1-2/P1-3/P2-2，見第六節）：
  - 發現全部 95 篇 usefulBlogPosts 是同一個損壞模板產出的填充內容（同一組詞組固定重複 171 次、零實質資訊），而 `seoGuides.ts`（13 篇）與 `workflows.ts`（7 個）已獨立驗證是真材實料（公式、實際數字範例、可查證 FAQ）
  - 全部 95 篇文章從 build 移除（`usefulArticleSources` 清空），95 個 slug 加入 `blogRedirects.ts`，依主題轉址到對應的 `/guides/`、`/workflows/` 或 `/tools/` 頁面
  - 斷鏈：ToolLayout 相關教學文章區塊、首頁 en 版文章連結、Nav 教學文章連結、education-statistics 教學文章分類區塊全部移除或改指向 guides
  - 收斂 64 筆既有轉址的二次跳轉鏈（原本 A→已下架 blog slug→guides，改成 A→guides 直達）
  - `sitemap-examples.xml`／`sitemap-templates.xml`／`sitemap-faq.xml` 是恆空的死路由，一併移除
  - `/blog/` 列表頁改為「內容已整併到 guides」極簡通知頁 + noindex
- **P2-1**：`image-compressor`／`merge-pdf`／`teacher-exam-score-converter` 三個工具頁重寫 title/description
- 驗證：每個 commit 都跑過 `npm run build && npm run content:audit && npm run preflight`，全綠

**第一步：本機先 `git fetch origin && git checkout claude/funnytools-optimization-review-tr685u`，在這個分支上繼續。**

---

## 二、研究結論摘要（2025-2026 最新規則，已查證）

1. **Helpful Content 是站台級信號**：弱 blog 會拖累強工具頁。**已驗證本站案例正是如此** —— 見第六節。
2. **整併優先於刪除**：主題重疊 >60% → 301 合併到主文；零曝光 + 無外鏈 → noindex 觀察，勿直接刪。**但前提是內容本身有價值**；若內容本身是填充文字，合併只是把問題搬到更少的 URL，無法解決根本問題。
3. **FAQ rich results 已於 2026/5/7 停止顯示**（HowTo 2023 已停、Sitelinks Searchbox 2024/11 退役）。FAQPage schema 保留無妨但別再投資源；轉向 Article/SoftwareApplication schema 完整性（作者、日期）。
4. **llms.txt 無實證效果**（Google 已確認不支援；本站已做，不用再花時間）。真正有效的 GEO：每個 H2 下第一句直接給答案、內容 30 天內有更新、允許 OAI-SearchBot（robots.txt 已允許）。
5. **Discover 資格**：首圖 ≥1200px 寬 + `max-image-preview:large`。**已暫緩**：blog 內容本身尚未有值得推廣的真文章，見第六節先解決內容問題。
6. **GSC 高曝光低 CTR**：曝光 >500 且 CTR <3% 的頁面優先重寫 title/description，一次只改一個變因。已完成 3 頁（P2-1），其餘等 GSC 匯入。
7. **AdSense「低價值內容」拒件主因是資訊冗餘**：留存頁面需 ≥30% 獨特資訊（獨特案例、數據、方法論），不是操作說明複製貼上。**這正是本站 blog 問題的核心** —— 見第六節。
8. **~700 頁完全不用擔心 crawl budget**。
9. **E-E-A-T**：工具頁加「計算原理/公式來源」、統計文章文末附引用來源、全站作者/關於頁。**暫緩**，等 blog 重寫後再做（對填充內容做 E-E-A-T 補強沒有意義）。

---

## 三、關鍵地雷（Codex 動手前必讀）

1. **blog 內容現況**：`usefulBlogPosts.ts` 的 `usefulArticleSources` 目前是**空陣列**（0 篇）。所有舊 95 篇的 slug 都在 `blogRedirects.ts` 裡轉址到對應的 guides/workflows/tools 頁面。若要重寫新文章，**沿用原 slug** 並從 `blogRedirects.ts` 移除對應項目即可自動恢復該 URL。
2. `importedEducationBlogPosts.ts`／`importedSeoBlogPosts.ts`／`seoResourcePosts.ts` 已清空內容（保留檔案與型別），不要重新灌入資料——那批資料就是問題本身。
3. **`scripts/content-quality-audit.mjs` 硬性檢查 usefulBlogPosts 篇數必須恰好等於期望值**（目前 `!== 0`）。新增/移除文章時必須同步更新該檢查。
4. **退役文章的標準做法**：`src/data/blogRedirects.ts`（現有 164 筆），轉址殼頁是 noindex + meta refresh。**新增轉址時務必確認目標不是另一個轉址 slug**（避免二次跳轉鏈——`scripts/verify_no_chains` 邏輯可參考 `reports/` 或重新寫一個快速腳本檢查）。
5. **repo 內沒有真實 GSC 資料**（`seo-gsc-sample.csv` 只有 3 筆示範）。使用者需先從 GSC 匯出 90 天資料，用 `node scripts/gsc-import.mjs <csv>` 匯入後重跑 `npm run seo:audit`。
6. 每次改動後的驗證閘門：`npm run build && npm run content:audit && npm run seo:check && npm run audit:security`（或 `npm run preflight`，注意 preflight 本身**不含** `content:audit`，要分開跑）。
7. 畫布類工具的 `background: #fff` 是功能性的（匯出圖片需白底），**不要**改成變數。
8. Codex 在這個 worktree 裡無法 `git commit`（`.git` 指向 worktree 外的路徑，sandbox 拒絕寫入）。改法或 Claude 自己 `git add`/`commit`，Codex 只需完成程式碼修改並跑完驗證閘門、回報結果。

---

## 四、已完成任務（不用再做）

- **P0-1**：5 篇行銷類錯位文章轉址（commit `f79d3cf`）
- **P0-2**：清理死碼內容檔（commit `6c98e97`）
- **P2-1**：3 個高曝光低 CTR 工具頁重寫（commit `3ed5ee0`）
- **全站 blog 下架與斷鏈**（commit `15f73be`、`809a508`、`37ffaf8`、`1bd4a2d`）：取代原 P1-1/P1-2/P1-3/P2-2

## 五、已作廢任務（原因見第六節）

~~P1-1：主題重疊合併~~、~~P1-2：E-E-A-T 補強~~、~~P1-3：Discover 資格~~、~~P2-2：GEO 答案優先結構~~ —— 這四項的前提都是「blog 文章有真實內容、只是需要整理/強化」，但實際內容是填充文字，這些任務改成無意義。**新任務見第六節「blog 重建計畫」**。

---

## 六、blog 重建計畫（取代已作廢的 P1/P2-2 任務）

### 重大發現

全部 95 篇 `usefulBlogPosts` 文章的 `contentMarkdown` 由同一個損壞模板產生：每篇文章把自己的標題衍生出的一個方塊詞組（例如「T 分數是什麼的用途」）在全文中**固定重複 171 次**，包裹在通用連接句中，沒有任何公式、範例或真正的解釋。掃描全部 95 篇，171 次重複零例外——不是「有些文章弱」，是整批文章從生成腳本層級就是壞的。

對照組：`src/data/seoGuides.ts`（13 篇）與 `src/data/workflows.ts`（7 個）**已人工抽查確認是真材實料**——有公式（例：`Z = (X - M) / SD；T = 50 + 10Z`）、有實際數字範例（例：`原始分數 82，平均 70、標準差 8 → T = 65`）、有可查證的 FAQ。這兩個資料源沒有問題，不用重寫。

### 已採取的行動

全部 95 篇 noindex（後改為完全下架 + 依主題轉址），細節見第一節。**這是止血動作，不是最終方案** —— `/guides/` 只有 13 篇，涵蓋不到原本的主題廣度（例如 PDF、圖片壓縮、隨堂工具的深度內容目前完全沒有）。

### 重寫品質標準（比照 seoGuides.ts）

新寫的文章必須包含：
- 公式或明確步驟（不是「先...再...」的空話）
- 至少一個帶真實數字的完整範例
- 常見錯誤／注意事項（具體、可操作，不是「請注意」這種空話）
- 3-5 題有實質答案的 FAQ（不是重複問題本身）
- 若引用外部標準（教育部規則、統計方法），附來源

### 第一批候選（10-15 篇，已證實有搜尋量的主題，沿用原 slug 以便重新上架）

依原交接文件「附錄：合併群組」判斷相關性/引用度最高者：

```
T/Z/PR 標準化分數（4）：
  t-score-complete-guide, z-score-standardization-guide,
  percentile-rank-guide, exam-score-normalization-mistakes

教師甄試加權成績（1）：
  teacher-exam-weighted-score-guide

PDF 合併/疑難排解（4）：
  pdf-merge-split-compress-workflow, pdf-too-large-upload-guide,
  pdf-troubleshooting-guide, mobile-pdf-guide

圖片壓縮/格式（3）：
  image-compress-resize-format-guide, jpg-png-webp-difference-guide,
  photo-before-after-compress-guide

課堂隨機工具（1）：
  classroom-random-tools-guide
```

做法：
1. 從 `blogRedirects.ts` 移除該 slug 的轉址項目
2. 在 `usefulBlogPosts.ts` 的 `usefulArticleSources` 加回該 slug 的新文章物件，套用上方品質標準撰寫
3. 更新 `content-quality-audit.mjs` 的期望篇數（0 → N）
4. 若該主題此前已有其他文章轉址到 `/guides/` 的對應頁（例如 `t-score-teacher-exam-*` 系列轉到 `t-score-complete-guide`），確認新文章上線後這些既有轉址仍然正確指向
5. 一篇一個 commit，每篇完成跑驗證閘門

第一批完成、確認品質後，再評估是否要把 `/guides/` 裡對應主題的內容併入 blog 新文（或反過來，把 blog 新文的獨特內容併入 guides），避免兩處各有一半內容的分裂。這個判斷留給重寫時的人工決策，不要自動化處理。

---

## 七、需要使用者本人做的事（Codex 做不了）

1. **決定 blog 重建的資源投入**：全部重寫需要真正的主題知識或研究時間，不是文字生成就能解決
2. **GSC 匯出 90 天成效資料**（涵蓋 /blog/、/guides/、/tools/），`node scripts/gsc-import.mjs <csv>` 匯入 → 這是 P2-2（GEO 改寫）與全面 CTR 重寫的前提
3. **AdSense 後台發布 GDPR 訊息**：填隱私權政策網址 `https://funnytools.win/privacy/`（在「樣式設定」內）+「不同意」選項選「開啟」→ 發布按鈕就會亮
4. **把 `claude/funnytools-optimization-review-tr685u` 合併到 main** 部署這輪優化
5. Cloudflare：對 `/_astro/*` 設 Cache-Control immutable、CSP 改 HTTP header（參考 `reports/cloudflare-security-hardening.md`）
