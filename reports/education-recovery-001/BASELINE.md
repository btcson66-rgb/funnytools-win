# FUNNYTOOLS-EDU-RECOVERY-001 基線

> 基線時間：2026-09-17（Asia/Taipei）

> 本基線建立於任何本工作單修改前。數值來自 `origin/main` 工作分支的本機 build、sitemap、source audit，以及已存在的 GSC/URL Inspection evidence；沒有以估算填補缺失資料。

## Repository / release

| 項目 | 值 |
|---|---|
| 工作分支 | `luna/funnytools-education-recovery-001-20260917` |
| 起始 source commit | `0d1dd45231c8de32fd87e61dc9ea18c8a9ae9209` (`origin/main`) |
| 本機 checkout 的舊 `main` | `16270ef9881d51b9246a4e6ec06fa219c5387fa4` (`v5.140.1`)，落後 origin/main 2 commits |
| package version | `5.140.1` |
| production | `https://funnytools.win/` |
| branch 起始狀態 | clean；未覆蓋本機 `main` |

## Local build and index surface

Build 使用 `npm.cmd run build`，結果 PASS，`1173 page(s) built`。

| 指標 | 基線值 | 判讀方式 |
|---|---:|---|
| built HTML pages | 1173 | `dist/**/*.html` |
| sitemap URL count | 714 | 生成後所有 leaf sitemap 的 unique `<url><loc>` |
| locally indexable sitemap URLs | 714 | sitemap route 存在、無 meta robots `noindex` |
| sitemap canonical missing | 0 | 714/714 對應頁均有 canonical |
| sitemap canonical mismatch | 0 | canonical 均為該頁 HTTPS self-canonical |
| sitemap/noindex conflict | 0 | 714 sitemap pages 均無 noindex |
| built noindex HTML | 359 | 全 build route，包含既有 redirect/stub/support 類頁；不可直接視為 pruning 候選 |
| redirect-like refresh pages | 334 | build HTML 中含既有 meta refresh；需與 noindex/redirect architecture 一起解讀 |
| live tools | 83 | `src/data/tools.ts`: `TOOL_COUNT=83` |

### Locale counts in sitemap

| locale | URLs |
|---|---:|
| zh-TW / default paths | 309 |
| en | 191 |
| es | 139 |
| fr | 75 |

### Sitemap lastmod distribution

| lastmod | URLs |
|---|---:|
| 2026-09-14 | 2 |
| 2026-09-10 | 12 |
| 2026-09-07 | 1 |
| 2026-09-04 | 46 |
| 2026-09-03 | 222 |
| 2026-09-02 | 63 |
| 2026-08-30 | 2 |
| 2026-08-27 | 104 |
| 2026-08-01 | 7 |
| 2026-07-31 | 5 |
| 2026-07-30 | 8 |
| 2026-07-29 | 161 |
| 2026-07-28 | 31 |
| 2026-07-27 | 1 |
| 2026-07-26 | 1 |
| 2026-07-25 | 1 |
| 2026-07-24 | 2 |
| 2026-07-23 | 2 |
| 2026-07-22 | 2 |
| 2026-07-21 | 2 |
| 2026-07-20 | 2 |
| 2026-07-19 | 2 |
| 2026-07-18 | 2 |
| 2026-07-17 | 2 |
| 2026-07-02 | 1 |
| 2026-06-26 | 11 |
| 2026-06-25 | 17 |
| 2026-06-17 | 2 |

## Existing evidence

### Phase 2B

Source: `reports/index-recovery-phase2b/experiment-manifest.json`, `experiment-pairs.csv`, `control-baseline.csv`, `validation-report.md`.

| 項目 | 基線值 |
|---|---|
| experiment | `FUNNYTOOLS_INDEX_RECOVERY_PHASE2B` |
| treatment / control | 20 / 20 |
| locale split | zh-TW 5 / en 5 / es 5 / fr 5 |
| phase2b source commit | `b0b5368ff3dc0e340a0efbb284c02fb5f2983dc2` |
| recorded merge commit | `ea5cd4ca5d7daa4ed7383ae5f083382d98d8a4ae` |
| current manifest deployment status | `PENDING_PRODUCTION_RELEASE` |
| control hash guard | PASS in source evidence |
| treatment unique fingerprints | 20/20 in source evidence |
| current production post-deploy transition | UNKNOWN / not yet observed |
| this recovery confound | NOT YET APPLIED; sitewide IA changes will be recorded separately |

Phase 2B 的 40 個 URL 在本工作中視為 immutable protected cohort：不改 slug、canonical、index directive、redirect、schema intent 或 tool-specific main content。

### GSC / URL Inspection

| snapshot | indexed | crawled-not-indexed | unknown | 備註 |
|---|---:|---:|---:|---|
| Phase 2A URL-level inspection, 2026-09-13 | 4 | 308 | 399 | 712 intended-indexable 的 URL-level evidence |
| 2026-09-04 historical GSC summary | 54 | 269 | 132 | 401 Google-known；summary-derived，不能取代 URL-level snapshot |

GSC 現況的完整即時值未在本次 baseline 重新取得，因此未以空值或推測補成 current truth。既有 evidence 的 search exposure cliff（2026-06-21～06-27 與 2026-06-28～07-04）及 index coverage discontinuity（2026-08-21/22）保留為 correlation evidence，不宣稱 spam penalty 因果。

### Production smoke at baseline

2026-09-17 readback：homepage、`/education-statistics/`、`/guides/`、指定 protected education URLs、`/tools/`、`/sitemap.xml`、`/robots.txt` 均取得 HTTP 200；抽查頁面 canonical 均為 HTTPS self-canonical，未見 robots meta noindex。完整 post-deploy smoke 尚未執行，故記為 `BASELINE_PASS_ONLY`，不是本次 recovery 的 deployment proof。

## Baseline decision boundary

- 目前沒有把任何 URL 自動分類為 delete、404、redirect 或 noindex。
- 既有 functional tools 原則上 KEEP_INDEXABLE；pruning 必須有 row-level evidence。
- 新教育 indexable tool 上限為 3，且只建立 zh-TW 正式版本。
- 任何 protected URL、Phase 2B hash/canonical/indexability gate 失敗，都應阻止 release。
