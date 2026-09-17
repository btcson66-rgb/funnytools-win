# FUNNYTOOLS-EDU-RECOVERY-001 部署後觀測基線

狀態：`DEPLOYED_READBACK_PASS_WITH_GSC_SUBMISSION_FAILURE`

本文件只記錄已讀回的部署與搜尋觀測基線，不把部署成功推論成 Google 已恢復索引或流量。

## Deployment

| 項目 | 已讀回值 |
|---|---|
| release version | `v5.141.0` |
| deployed commit | `82f4bcf6d6798de1c151f3fe10a6a170f670e93f` |
| feature merge commit | `e219ca548fbaff142a7413b67a41694b48395578` |
| pre-release rollback tag | `backup/pre-v5.141.0` |
| Pages deployment workflow | SEO indexing automation `35246056150`：build/deploy PASS |
| Pages deploy timestamp | `2026-09-17T16:22:20Z`（Asia/Taipei：2026-09-18 00:22:20） |
| production readback | `2026-09-17T16:24Z`：HTTP/canonical/sitemap/robots/tool interaction PASS |
| production | `https://funnytools.win/` |

同一 push 的 `Deploy Astro site to Pages` run `35246056180` 顯示 cancelled；但同一 release SHA 的 SEO workflow `build_deploy` 已完成 artifact、Pages deploy，故以後者作為本次正式部署 readback。`Deploy Astro` 的 cancelled 狀態保留為事件證據，不隱藏。

## Before / after surface

| 指標 | 修改前 baseline | v5.141.0 部署後 | 證據／備註 |
|---|---:|---:|---|
| built pages | 1,173 | 1,182 | local/CI Astro build output |
| sitemap URLs | 714 | 717 | unique leaf sitemap URLs |
| locally indexable sitemap URLs | 714 | 717 | sitemap route、canonical、noindex audit |
| built noindex HTML | 359 | 361 | build scan；不是 pruning 候選數 |
| redirect-like refresh pages | 334 | 338 | build scan；與 noindex/stub architecture 一起解讀 |
| live tools | 83 | 86 | 僅新增 3 個 zh-TW education tools |
| zh-TW/default sitemap URLs | 309 | 312 | 新增 3 個工具 |
| en sitemap URLs | 191 | 191 | expansion frozen |
| es sitemap URLs | 139 | 139 | expansion frozen |
| fr sitemap URLs | 75 | 75 | expansion frozen |

本次沒有新增 noindex、consolidate 或 redirect decision；既有 functional tools 保持可用。教育頁增量只有：

- `/tools/final-grade-needed-calculator/`
- `/tools/item-analysis-calculator/`
- `/tools/kr20-reliability-calculator/`

## Production smoke

已直接讀回首頁、`/education-statistics/`、`/guides/`、3 個新工具、9 個 protected education URLs、generic PDF/image/text tools，全部 HTTP 200。抽查頁面均為 HTTPS self-canonical、未見 meta `noindex`；新工具為 zh-only，沒有 hreflang clone。`sitemap-tools.xml` 含 3 個新 URL，`robots.txt` HTTP 200 且允許 crawler；HTTP 新工具 URL 以單次 301 轉往 HTTPS。

Production interaction evidence：

- final-grade：輸入 target `80`、earned weighted `48.9`、remaining `40%`，輸出 `77.75%`、狀態「可達成」。
- item analysis：輸入 `p=0.8`、high `0.9`、low `0.5`，輸出 `D=0.4`、高低分組 `11/11`。
- KR-20：6×5 binary matrix 輸出 `KR-20=0.677`、`5` 題、`6` 位受試者、總分變異數 `2.667`、`Σpq=1.222`。

## Search baseline

| snapshot | indexed | crawled-not-indexed | unknown | 備註 |
|---|---:|---:|---:|---|
| Phase 2A URL Inspection, 2026-09-13 | 4 | 308 | 399 | 712 intended-indexable；另有 1 筆 blocked/error |
| post-release current GSC | UNKNOWN | UNKNOWN | UNKNOWN | CI 的 GSC sitemap submit step failed；尚無新的 row-level URL Inspection evidence |

release 本地 GSC readback 為 `registered_pending`，CI 的 `Submit sitemap to Google Search Console` 失敗；IndexNow/Bing steps completed。未使用 Google Indexing API，也未執行 bulk Request Indexing。教育 query impressions/clicks 與 locale post-release performance：`UNKNOWN`，不得由本次部署推算。

## Protected and experiment gates

- Protected URL count：94，education recovery audit PASS。
- Phase 2B：20 treatment + 20 control，40/40 hash、canonical、indexability protection PASS。
- Sitewide education-first IA 變更已造成 global confound；後續 treatment/control 不能再當作完全隔離的因果實驗。

## Observation milestones

以 Asia/Taipei 部署日 2026-09-18 為 T+0：

| milestone | date | required evidence |
|---|---|---|
| T+7 | 2026-09-25 | GSC URL Inspection、教育 query impressions/clicks、priority last crawl |
| T+14 | 2026-10-02 | indexed/CNI transition 與 protected URL readback |
| T+21 | 2026-10-09 | education cluster query and CTR comparison |
| T+28 | 2026-10-16 | recovery decision；仍不得把 correlation 寫成 spam penalty 因果 |

在沒有上述新 evidence 前，本工作單的 SEO recovery outcome 維持 `NOT_YET_EVALUATED`，不是 PASS 的流量或索引承諾。
