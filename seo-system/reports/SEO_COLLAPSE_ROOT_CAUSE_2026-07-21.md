---
date: 2026-07-21
site: https://funnytools.win
status: deployed_monitoring
---

# FunnyTools SEO 搜尋曝光斷崖調查與修復報告

## 1. Executive Summary

已找到與 2026-06-28 斷崖時間高度吻合的主因組合，但 Google 不提供單站降權的內部分類，因此信心等級為 **Highly likely**，不是可宣稱為直接證實的 Confirmed。

主要根因是：Google 的 **June 2026 spam update** 於台灣時間 6/25 起推出、約 6/27 01:00 完成；FunnyTools 同一窗口正在進行大規模品牌、metadata、內容與 sitemap 變動。Google 官方紀錄顯示該更新全球、全語言生效，6/26 10:00 PDT 完成；GSC 則在 6/27 尚有 138 曝光、6/28 立即降至 13。當時站內已有 302 個可索引頁、108 個 blog URL，之後又在數日內增加大量模板化文章／指南，6/29 一度達 534 個可索引頁。7/2 專案已把 95 篇文章 noindex 並退役，這與後續品質修復方向一致。

同時存在兩個次要技術／流程問題：GSC 匯出仍包含多個 `http://` URL；目前非 www HTTP 深層 URL 已是單次 301，但 `http://www` 首頁仍是兩次轉址。另一本機 preflight 原本在 sitemap 重生前檢查，會拿 254 URLs 的過期 public sitemap 通過，而 GitHub Actions 部署後才生成 264 URLs。這個檢查盲點已修正為先重生 sitemap，再執行 crawlability 與 collapse audit。

目前 264 個正式 sitemap URL 已完整爬取：全部直接 200、自我 canonical、無 noindex 衝突；核心 HTTP 深層頁均單次 301 至相同路徑 HTTPS。未發現 robots 封鎖、X-Robots-Tag noindex、canonical 指首頁、sitemap 內 3xx/4xx、主要內容僅靠 hydration 才出現或正式站部署落後。

本次修復能移除可控制的技術阻塞與監控盲點，但不能保證排名立即恢復。Google 需要重新爬取、重新評估網站品質與合併 HTTP/HTTPS 訊號，應以 7、14、28 天窗口觀察。

官方證據：

- Google Search Status Dashboard：<https://status.search.google.com/incidents/YUX1peHev5a4fkxLDiUQ>
- Cloudflare Single Redirect（保留 path/query）：<https://developers.cloudflare.com/rules/url-forwarding/examples/redirect-all-different-hostname/>

## 2. Timeline

| 日期（台北） | 事件 | 與斷崖的關係 |
|---|---|---|
| 2026-06-21～06-27 | GSC：每日曝光 71、93、141、144、135、134、138；排名由 31.4 改善至 13.8 | 斷崖前基準 |
| 2026-06-22 | `6476c6f` 全站 title/description 改善 | 大範圍 metadata 變更 |
| 2026-06-23 | `0e8751f` 新增 12 篇文章與內容擴充；後續 bilingual blog／pillar／內鏈 | 可索引規模快速成長 |
| 2026-06-25 | `29d6c5d` FunnyTools → FreeTools；105 個檔案、3,418 insertions／1,061 deletions | 全站品牌與 SERP 標題訊號更換 |
| 2026-06-25 | `3652b52` SEO indexing automation；當時 sitemap 302 URLs，其中 blog 108 | spam update 期間已有大量文章 URL |
| 2026-06-25～06-27（台北） | Google June 2026 spam update 全球推出並完成 | 與斷崖高度吻合 |
| 2026-06-26 | `d9a5e20` 新增 guide/workflow engine；sitemap 至少 344 URLs | 站點結構與內容規模再變動 |
| 2026-06-26 | `333639e` 匯入 18 篇 SEO blog；`7909d7e` 新增 audience/workflow landing pages | 大量新增內容 |
| 2026-06-27 | GSC 138 曝光、5 點擊、排名 13.8 | 最後正常日 |
| 2026-06-28 | GSC 13 曝光、0 點擊 | 斷崖起點（-90.6% 日比） |
| 2026-06-28 | `1b30c09` 重新發布 sitemap index，6 children 縮為 4；分類 URL 被重新分組而非刪除 | 時間吻合，但無核心 URL 消失證據 |
| 2026-06-29 | `7d1d4e9` 可索引頁 454；`8b01c81` 可索引頁 534、100 篇 blog | 在已觸發重評估後繼續擴張 |
| 2026-07-02 | `77b565e` 95 篇 blog noindex；`15f73be` 退役 95 篇並導向 guides/tools/workflows | 品質止血，但搜尋恢復有延遲 |
| 2026-07-03 | `3f0b332` FreeTools → FunnyTools | 品牌訊號再次更換 |
| 2026-07-21 | 本次完整 local/live audit；718 build pages、264 可索引、264 sitemap URLs | 目前技術基準建立 |

## 3. Root Cause Matrix

| 根因 | 證據 | 反證／限制 | 時間吻合 | 影響 | 嚴重度 | 信心 | 可立即修復 | 風險 |
|---|---|---|---|---|---|---|---|---|
| Spam update 對大量／模板化內容與劇烈站點變動重新評估 | 官方更新 6/24 09:00～6/26 10:00 PDT；GSC 6/28 斷崖；站內已有 108 blog、302 可索引頁並快速升至 534 | Google 不公開單站分類 | 極高 | 全站 | Critical | Highly likely | 只能持續改善品質並等待重評估 | 不可用更多內容「沖淡」 |
| 同期品牌與 metadata 反覆更換 | 6/25 FunnyTools→FreeTools、7/3 改回；GA4 同時保留多個 FreeTools/FunnyTools 首頁 title | 單純品牌變更通常不致 -94% | 高 | 全站 | High | Possible / contributing | 已恢復 FunnyTools；本次不再批改 title | 再改會重置學習訊號 |
| HTTP/HTTPS 訊號分裂 | GSC 有 `http://` 深層 URL；7 個 HTTP page rows | 現況非 www HTTP 深層 URL 均單次 301，站內 HTTP 連結為 0 | 中 | 部分頁 | Medium | Possible / contributing | Cloudflare 合併 www 兩跳；GSC 等待合併 | 錯誤規則可造成 loop |
| Sitemap／部署不一致 | 6/23 曾出現本機已修、live 落後；本機 preflight 原讀 254、live 為 264 | 現況 live 264 全部直接 200；6/28 分組變動未證明核心 URL 遺失 | 中 | Crawl discovery | Medium | Confirmed 流程缺口；Unlikely 為主因 | 已修 preflight 順序與 audit | 低 |
| robots/noindex 誤擋 | 已全面檢查 | robots Allow `/`；264 sitemap URL 無 noindex；454 noindex 為 embed、redirect stub、404／alias 等預期頁 | 低 | 無 | Low | Ruled out | 無需修 | 不應移除合理 noindex |
| Canonical/hreflang 錯誤 | 完整 sitemap crawl 與建置檢查 | 264/264 自我 canonical；正式 HTTPS host；hreflang 僅輸出真實對應頁 | 低 | 無 | Low | Ruled out | 無需修 | 不要廣泛重寫 |
| 建置／hydration／軟 404 | 718 靜態頁成功；核心頁有 title、H1、主要內容；sitemap URL 直接 200 | 仍應由 GSC Coverage 觀察 Google 判定的 soft 404 | 低 | 無明顯 | Low | Unlikely | 監控 | 低 |
| 純 Google 演算法、與本站變更無關 | 官方 spam update 時間吻合 | 本站同時有大量高風險變更，不能視為外部因素獨立發生 | 高 | 全站 | High | Unlikely（獨立原因） | 不適用 | 不能藉此忽略站內品質 |

## 4. GSC 熱門頁面對照（匯出期間 2026-06-21～07-18）

以下 status/canonical/sitemap/indexable 為 2026-07-21 現況；GSC 數值是匯出期間聚合，不能推定每個 HTTP URL 在斷崖後仍持續曝光。

| URL | 點擊 | 曝光 | CTR | 排名 | 現況 | Canonical | Sitemap／可索引 | 判斷 |
|---|---:|---:|---:|---:|---|---|---|---|
| `/tools/t-score-calculator/` | 17 | 151 | 11.26% | 8.25 | 200 | 自我 HTTPS | 是／是 | 核心保護頁，未改 URL |
| `/` | 9 | 73 | 12.33% | 6.16 | 200 | 自我 HTTPS | 是／是 | 正常 |
| `/about/` | 7 | 61 | 11.48% | 4.23 | 200 | 自我 HTTPS | 是／是 | 正常 |
| `/tools/class-rank-percentile-calculator/` | 3 | 35 | 8.57% | 10.69 | 200 | 自我 HTTPS | 是／是 | 正常 |
| `/en/` | 2 | 62 | 3.23% | 5.02 | 200 | 自我 HTTPS | 是／是 | 正常 |
| `/tools/random-name-picker/` | 2 | 55 | 3.64% | 7.25 | 200 | 自我 HTTPS | 是／是 | 核心保護頁 |
| `/tools/grade-average/` | 1 | 152 | 0.66% | 7.86 | 200 | 自我 HTTPS | 是／是 | 核心保護頁；本次不改文案 |
| `/en/tools/this-or-that/` | 1 | 28 | 3.57% | 16.04 | 200 | 自我 HTTPS | 是／是 | 正常 |
| `http://.../weighted-average-calculator/` | 1 | 19 | 5.26% | 14.95 | 301→同路徑 HTTPS | HTTPS | HTTPS 版是／是 | 舊 HTTP 索引殘留，等待合併 |
| `/tools/teacher-exam-score-converter/` | 1 | 18 | 5.56% | 4.56 | 200 | 自我 HTTPS | 是／是 | 核心保護頁 |
| `/tools/business-days/` | 1 | 8 | 12.5% | 4.25 | 200 | 自我 HTTPS | 是／是 | 正常 |
| `/guides/teacher-exam-weighted-score-guide/` | 1 | 8 | 12.5% | 9.62 | 200 | 自我 HTTPS | 是／是 | 正常 |
| `/en/tools/cad-2d/` | 0 | 211 | 0% | 54.55 | 200 | 自我 HTTPS | 是／是 | 排名問題，不是 crawl blocker |
| `/guides/t-score-calculator-guide/` | 0 | 41 | 0% | 8.27 | 200 | 自我 HTTPS | 是／是 | 高潛力，保留 URL |
| `/terms/` | 0 | 40 | 0% | 5.55 | 200 | 自我 HTTPS | 是／是 | 正常 |

### 為何 Google 還會曝光 HTTP URL

GSC 的頁面表是期間聚合，HTTP URL 可能在早期曾被發現或短暫回應 200，也可能由外部舊連結、瀏覽器歷史或 Google 舊索引保留。現況 sitemap、canonical、hreflang、JSON-LD、OG 與建置 HTML 均未發現內部 `http://funnytools.win` 來源；非 www HTTP 深層路徑是單次 301。持續保持 301、自我 HTTPS canonical 與 HTTPS-only sitemap，Google 才能逐步合併訊號；不應把所有 HTTP URL 導回首頁。

## 5. Files Changed

| 檔案 | 原因 |
|---|---|
| `scripts/seo-collapse-audit.mjs` | 新增可重複的 local/live 崩跌 audit：全 sitemap URL、canonical、noindex、HTTP 301、內部 HTTP 連結、local/live parity、10% 閾值 |
| `seo-system/baselines/seo-collapse-baseline.json` | 固定 718 build／264 indexable／264 sitemap 基準 |
| `package.json` | 新增 `audit:seo-collapse`、`audit:seo-collapse:live`；preflight 改為先生成 sitemap 再稽核 |
| `config/company.json` | 每日健康檢查加入高曝光核心頁、HTTPS redirect 與 sitemap -10% 警戒設定 |
| `health-check.mjs` | 每日檢查 HTTP→HTTPS、sitemap 數量斷崖與核心 canonical 變更 |
| `public/sitemap*.xml` | 由現行生成器重新同步 264 URL，使 repo／local preflight／deploy 一致 |
| `src/data/seoGuides.ts`、`src/pages/[...locale]/shop.astro` | 修正首次完整 preflight 揭露的 5 個近期頁面 metadata 長度超標；未更動高曝光核心頁正文 |
| `seo-system/reports/seo-collapse-audit.{md,json}` | 本次可機讀與快速閱讀的 audit 證據 |
| 本檔 | 完整根因、驗證、人工操作與觀察計畫 |

未修改：核心頁 URL、title/description、正文、廣告碼、ads.txt、robots 規則、canonical 產生器、hreflang 產生器與 UI。

## 6. Before／After

| 項目 | Before | After |
|---|---|---|
| 本機 preflight sitemap | build 後讀舊 public sitemap，254 URLs 仍可通過 | `build → seo:sitemap → seo:check → audit:seo-collapse`，264 URLs |
| 正式 sitemap | 264 URLs | 264 URLs；全數直接 200、自我 canonical、可索引 |
| build pages | 718 | 718 |
| indexable pages | 264 | 264 |
| 站內 HTTP 連結 | 0 | 0，新增 fail-fast guard |
| 非 www HTTP 深層 URL | 單次 301 | 單次 301，新增 live guard |
| `http://www` | 兩次轉址 | 程式碼無法控制；Cloudflare 待人工合併為一次 |
| sitemap/noindex 衝突 | 0 | 0，新增全量 guard |
| robots | 200，Allow `/`，HTTPS sitemap | 不變 |
| accidental noindex | 未發現 | 264 sitemap URL 全數確認無 noindex |

## 7. Validation Results

| 指令／檢查 | 結果 |
|---|---|
| `git status`, branch, log -30 | 起始 clean；`main` 與 `origin/main` 同步 |
| Git 6/21～7/2 history/diff | 找到品牌、內容、sitemap 與 deploy 高風險時間線 |
| GSC ZIP／GA4 CSV 原始解析 | 成功；GSC cliff 與 HTTP URL、GA4 多品牌 title 均有原始證據 |
| `npm.cmd run build` | PASS；718 pages |
| `npm.cmd run seo:check`（修復前） | PASS 但只檢查 254 sitemap URLs，確認流程盲點 |
| `npm.cmd run seo:sitemap` | PASS；264 URLs（tools 79 / guides 45 / workflows 8 / en 132） |
| `npm.cmd run audit:seo-collapse:live` | PASS；264/264 live pages；0 failure；1 Cloudflare www warning |
| `npm.cmd run preflight` | PASS；首次執行如預期攔下 5 個近期頁面 metadata 長度問題，最小修正後全項通過 |
| `npm.cmd run seo:audit` | 0 critical；2 個非阻擋內鏈提示（png-to-jpg、random-name-picker 各 4/5 個關鍵字相關工具連結），與本次斷崖無因果證據 |
| `npm.cmd run content:audit` | PASS；0 indexable blog URLs、172 redirect stubs、0 duplicate/farm warning |
| `npm.cmd audit --omit=dev --audit-level=high` | 無 high/critical；2 個 Astro/esbuild low/moderate，修復需 breaking Astro 7，與本案無關而不強升 |
| HTTP/HTTPS 20+ 路徑 | 核心非 www HTTP 單次 301；HTTPS 直接 200；www HTTP 兩跳 |
| `npm.cmd run daily-health` | PASS；3 產品站皆正常，FunnyTools sitemap 264、6 個核心 sample 均通過 |

## 8. Deployment Status

- 功能修復版本：`v5.23.1`。
- Commit hash：`003c2b63151e1b3f1f14595da9283c372700f27c`。
- 備份：`D:\Fable company\backups\funnytools-pre-v5.23.1_2026-07-21.zip`；tag `backup/pre-v5.23.1`。
- Push：`main` 與 `v5.23.1` tag 已推送。
- Deploy：GitHub Pages Actions run `29781712405` 成功；SEO indexing automation run `29781712443` 成功，含 sitemap 驗證、IndexNow、Bing 與 GSC sitemap 提交。
- 正式站驗證：發布後 264/264 sitemap URLs 全量 live audit 通過，0 failure；本機 718 build／264 indexable／264 sitemap、0 internal HTTP links、0 orphan indexable。
- 受限項目：Cloudflare token 沒有 Rulesets／Zone Settings 寫入權限，www 單跳規則需 Dashboard 人工設定。

## 9. Cloudflare Manual Action

位置：Cloudflare Dashboard → `funnytools.win` → Rules → Redirect Rules → Single Redirects。

建立最高優先序規則：

- Rule name：`canonical-www-to-apex-single-hop`
- Wildcard request URL：`http*://www.funnytools.win/*`
- Target URL：`https://funnytools.win/${1}`
- Status：`301 Permanent Redirect`
- Preserve query string：Enabled

部署後驗證：

```powershell
curl.exe -sS -o NUL -D - "http://www.funnytools.win/tools/t-score-calculator/?utm_source=test"
curl.exe -sS -L -o NUL -w "%{http_code}|%{url_effective}|%{num_redirects}" "http://www.funnytools.win/tools/t-score-calculator/?utm_source=test"
```

預期第一個回應直接為 `301 Location: https://funnytools.win/tools/t-score-calculator/?utm_source=test`；第二個輸出應為 `200|...|1`。若出現 loop、路徑遺失、query 遺失或導向首頁，立即停用該規則。

## 10. GSC Manual Actions

1. Search Console 選 `funnytools.win` domain property → Sitemaps，重新提交且只提交 `https://funnytools.win/sitemap.xml`。
2. URL Inspection 分別檢查並記錄「使用者宣告 canonical」與「Google 選定 canonical」：
   - `https://funnytools.win/`
   - `https://funnytools.win/tools/t-score-calculator/`
   - `https://funnytools.win/tools/grade-average/`
   - `https://funnytools.win/tools/random-name-picker/`
   - `https://funnytools.win/tools/teacher-exam-score-converter/`
3. 只對上述已修復／重要頁按一次「要求建立索引」，不要批量重複送出。
4. Page indexing 檢查：Crawled - currently not indexed、Duplicate、Alternate page、Redirect error、Soft 404。
5. HTTPS report 確認 HTTP URL 數量是否下降；抽查 GSC 匯出中的 weighted-average、support、category/image、z-score、uuid、t-test、image-to-base64 HTTP URL。
6. Manual actions 與 Security issues 頁面確認為零；若有項目，需另開事件處理。
7. 記錄 2026-07-21 為修復基準日，7/28、8/4、8/18 比較。

## 11. Monitoring Plan

### 7 天（2026-07-28）

- 每日曝光是否不再低於 7/1～7/18 中位數。
- 核心 5 頁是否開始被重新爬取；Google canonical 是否為 HTTPS。
- Sitemap 成功讀取數、已發現頁數與錯誤數。
- HTTP URL 曝光占比是否開始下降。
- `npm.cmd run daily-health` 無 sitemap -10%、canonical change、HTTP redirect critical。

### 14 天（2026-08-04）

- 比較 7 日移動平均：曝光、點擊、CTR、平均排名。
- T-score、grade-average、random-name-picker、teacher-exam 的 query/page 表現。
- Crawled - currently not indexed、Duplicate、Soft 404 是否改善。
- 不新增大量內容、不再改品牌／核心 URL／全站 title。

### 28 天（2026-08-18）

- 與 6/21～6/27 基準比較：曝光 856／週、點擊 43／週、平均排名約 16.6。
- 若仍無恢復：匯出新的 GSC Pages + Queries + Dates，按「斷崖前後同一 URL」做 cohort 分析；再檢查是否存在 manual action、Google-selected canonical 分歧或站級品質問題。
- 只有有明確 query/page 證據時，才對少量高潛力頁做內容改善；每次一小批並保留 14～28 天歸因窗口。

## 12. 停止條件核對

- [x] 核心 URL 回應正確。
- [x] 非 www HTTP 深層 URL 單次 301。
- [x] Canonical、sitemap、正式 URL 一致。
- [x] 無 sitemap/noindex 衝突。
- [x] sitemap 內無 3xx/4xx。
- [x] 無 local/live sitemap 數量不一致（生成後均 264）。
- [ ] `http://www` 單跳（Cloudflare 人工操作）。
- [x] 完整 preflight。
- [x] release、部署後 live audit。
