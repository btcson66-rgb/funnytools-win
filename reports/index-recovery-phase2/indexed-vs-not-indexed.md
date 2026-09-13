# Indexed vs Crawled-Not-Indexed

Snapshot: 2026-09-13T08:50:22.844Z. The comparison is descriptive association, not a causal test.

Indexed rows: 4; Crawled-not-indexed rows: 308.

| metric | indexed | crawled_not_indexed |
| --- | --- | --- |
| URLs | 4 | 308 |
| Median internal links | 260.5 | 48 |
| Median crawl depth | 0 | 1 |
| Median main-content words | 2878 | 1328.5 |
| Median unique-content ratio proxy | 0.9946152165547101 | 0.9881743690593248 |
| Median value score | 0 | 0 |
| Median adjusted similarity | 0.8305 | 0.2715 |
| Median last crawl age days | 1 | 26 |
| Rows with search impressions (28d) | 4 | 39 |
| Rows with self canonical | 4 | 306 |

## Page type distribution

| comparison_status | total | google_known | crawled | indexed | crawled_not_indexed | discovered_not_indexed | canonical_problem | blocked_error | unknown | acceptance_rate | median_last_crawl_age_days | mean_last_crawl_age_days |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| indexed | 4 | 4 | 4 | 4 | 0 | 0 | 0 | 0 | 0 | 1 | 1 | 5 |
| crawled-not-indexed | 308 | 308 | 308 | 0 | 308 | 0 | 0 | 0 | 0 | 0 | 26 | 27.814935064935064 |

## Locale distribution

| locale_group | total | google_known | crawled | indexed | crawled_not_indexed | discovered_not_indexed | canonical_problem | blocked_error | unknown | acceptance_rate | median_last_crawl_age_days | mean_last_crawl_age_days |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| zh | 108 | 108 | 108 | 1 | 107 | 0 | 0 | 0 | 0 | 0.0093 | 27 | 27.52777777777778 |
| en | 105 | 105 | 105 | 1 | 104 | 0 | 0 | 0 | 0 | 0.0095 | 26 | 28.523809523809526 |
| es | 64 | 64 | 64 | 1 | 63 | 0 | 0 | 0 | 0 | 0.0156 | 24.5 | 26.578125 |
| fr | 35 | 35 | 35 | 1 | 34 | 0 | 0 | 0 | 0 | 0.0286 | 24 | 26.228571428571428 |

Interpretation rule: differences are associated with current Google acceptance in this snapshot. They do not establish that links, freshness, content length, similarity, or value score caused indexing.
