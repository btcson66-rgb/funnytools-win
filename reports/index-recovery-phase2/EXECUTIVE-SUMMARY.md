# FunnyTools Index Recovery — Phase 2A URL-Level Google Evidence

Snapshot: 2026-09-13T08:50:22.844Z; property: sc-domain:funnytools.win.

## Current URL-Level Funnel

| stage | urls | definition |
| --- | --- | --- |
| Intended indexable | 712 | Phase 1 inventory indexable=yes |
| Google inspected successfully | 712 | URL Inspection API HTTP 200 |
| Google knows | 313 | coverage_state is not unknown to Google |
| Google crawled | 313 | lastCrawlTime or indexed/crawled status present |
| Google indexed | 4 | Indexed status from API response |

| metric | value |
| --- | --- |
| Indexed | 4 |
| Crawled-not-indexed | 308 |
| Discovered-not-indexed | 0 |
| Canonicalized elsewhere | 0 |
| Blocked/error | 1 |
| Unknown | 399 |

Current inspected index acceptance: **4 / 712 = 0.56%**.

Historical 54/401 is retained only as the 2026-09-04 historical GSC summary; it is not the current rate.

## By Type

| type | total | indexed | crawled_not_indexed | discovered_not_indexed | acceptance_rate |
| --- | --- | --- | --- | --- | --- |
| home | 4 | 4 | 0 | 0 | 1 |
| hub | 14 | 0 | 9 | 0 | 0 |
| tool | 316 | 0 | 202 | 0 | 0 |
| guide | 268 | 0 | 21 | 0 | 0 |
| workflow | 25 | 0 | 13 | 0 | 0 |
| category | 27 | 0 | 24 | 0 | 0 |
| audience | 18 | 0 | 15 | 0 | 0 |
| methodology | 9 | 0 | 0 | 0 | 0 |
| other-legitimate | 5 | 0 | 4 | 0 | 0 |
| legal | 20 | 0 | 17 | 0 | 0 |
| support | 6 | 0 | 3 | 0 | 0 |

## By Locale

| locale | total | indexed | crawled_not_indexed | discovered_not_indexed | acceptance_rate | median_last_crawl_age_days | mean_last_crawl_age_days |
| --- | --- | --- | --- | --- | --- | --- | --- |
| zh | 308 | 1 | 107 | 0 | 0.0032 | 0 | 9.652597402597403 |
| en | 190 | 1 | 104 | 0 | 0.0053 | 22 | 16.126315789473683 |
| es | 139 | 1 | 63 | 0 | 0.0072 | 0 | 12.237410071942445 |
| fr | 75 | 1 | 34 | 0 | 0.0133 | 0 | 12.24 |

## Core Tools

83 core tools inventory rows: **83**; indexed 0; crawled-not-indexed 67; discovered-not-indexed 0; other 16.

## Strongest Root-Cause Signals

1. **HIGH** — Google crawl recency or absence of recrawl remains an observation-window signal: 399 URL(s) have no lastCrawlTime; 51 have a crawl after 2026-08-22; 30 have a crawl dated 2026-08-21/22.
2. **MEDIUM** — Crawled-not-indexed is associated with boilerplate-adjusted similarity: 83 crawled-not-indexed URL(s) have max adjusted similarity >= 0.80; indexed comparison rate is 75.00% versus 26.95%.
3. **CONFIRMED** — Current robots, noindex, fetch, or redirect errors are technical blockers: 1 URL(s) returned a blocked/error classification with preserved robots/indexing/fetch fields.
4. **REJECTED** — Google-selected canonical differs from the inspected URL: No current non-self Google canonical observed.
5. **REJECTED** — Weak discovery support combines empty API referrers with low local internal links: 0 URL(s) meet the conservative local condition of zero API referring URLs and at most five local internal links.

These are URL-level observations and associations, not causal claims.

## Google Canonical

| category | urls |
| --- | --- |
| SELF_MATCH | 311 |
| GOOGLE_SELECTED_OTHER_INTERNAL | 0 |
| GOOGLE_SELECTED_EXTERNAL | 0 |
| GOOGLE_CANONICAL_ABSENT | 401 |

A non-self Google canonical is a recommendation signal only; no canonical, redirect, merge, delete, or noindex change was executed.

## Phase 2B Proposal

Treatment: 25; control: 25; **NOT EXECUTED**.

Candidates require human review. Control rows remain untreated for a future 14–21 day comparison.

## Safety

- Content changes: NONE.
- SEO surface changes: NONE.
- Production deploy: NOT DEPLOYED.
- No live inspection was requested; API evidence is indexed-version evidence only.
