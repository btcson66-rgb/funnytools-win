# Index Collapse Timeline

## Timeline

| date | evidence | status |
| --- | --- | --- |
| 2026-08-18 | Website release v5.104.0 / commit 7e5a3ae; deploy workflow succeeded; SEO indexing workflow failed on GSC property resolution | Strong evidence, not causation |
| 2026-08-21 | GSC chart: Indexed 306, Not indexed 79 | Confirmed observation |
| 2026-08-22 | GSC chart: Indexed 63, Not indexed 334; repository has 0 commits on 8/21-8/22 | Confirmed observation; cause unknown |
| 2026-08-23 | Scheduled SEO indexing run built 494 URLs and validation passed, but URL Inspection skipped/failed | Confirmed operational evidence |
| 2026-08-24 | AdSense publisher/account and analytics changes deployed after collapse | Possible unrelated follow-up; not cause of 8/22 event |
| 2026-09-04 | GSC chart latest point: Indexed 54, Not indexed 347; supplied export summary lists 269 crawled-not-indexed, 39 redirects, 31 noindex, 5 alternate canonical, 3 404 | Confirmed snapshot |
| 2026-09-13 | Current build 1171 HTML / 712 indexable / 712 sitemap; live sitemap readback 200 live verified | Current repository/production evidence |

## Candidate explanations

- Confirmed: the GSC chart records a discontinuity between 2026-08-21 and 2026-08-22.
- Strong evidence: the nearest website release was v5.104.0 on 2026-08-18 and its deployment succeeded. The same release run had a separate SEO indexing automation failure because the configured service account could only access `sc-domain:worthcalc.win`.
- Possible: failed sitemap/inspection submission could reduce fresh discovery signals, but sitemap availability and indexing acceptance are different states; this does not prove the 8/22 collapse was caused by the submission failure.
- Ruled out by repository evidence only: no 2026-08-21 or 2026-08-22 commit changed canonical, robots, noindex, or route hierarchy. This cannot rule out an external platform or deployment-side change.
- Weak / unknown: GSC reporting delay or classification reprocessing. The exported chart is not a deploy log and does not establish causation.
- Not observed in current static ground truth: sitemap duplicates, sitemap exclusions, canonical conflicts, internal HTTP links, or indexable orphan routes.
