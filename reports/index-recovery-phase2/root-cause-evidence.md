# Root-Cause Evidence — Phase 2A

Snapshot timestamp: 2026-09-13T08:50:22.844Z.

Confidence describes the strength of the current URL-level observation, not causal proof. `CONFIRMED` means the API directly returned the condition; it does not mean the condition caused indexing outcomes.

## 1. Google crawl recency or absence of recrawl remains an observation-window signal

- Confidence: **HIGH**
- Observed URLs: 399
- Evidence: 399 URL(s) have no lastCrawlTime; 51 have a crawl after 2026-08-22; 30 have a crawl dated 2026-08-21/22.
- Limitation: URL Inspection cannot reconstruct the August 21–22 historical state; current last crawl only shows what Google has reported now.

## 2. Crawled-not-indexed is associated with boilerplate-adjusted similarity

- Confidence: **MEDIUM**
- Observed URLs: 83
- Evidence: 83 crawled-not-indexed URL(s) have max adjusted similarity >= 0.80; indexed comparison rate is 75.00% versus 26.95%.
- Limitation: Similarity is supporting evidence only and does not prove duplicate content, cannibalization, or causality.

## 3. Current robots, noindex, fetch, or redirect errors are technical blockers

- Confidence: **CONFIRMED**
- Observed URLs: 1
- Evidence: 1 URL(s) returned a blocked/error classification with preserved robots/indexing/fetch fields.
- Limitation: Current production HTTP 200 and current indexed-version inspection are separate observations; this does not reconstruct an older crawl.

## 4. Google-selected canonical differs from the inspected URL

- Confidence: **REJECTED**
- Observed URLs: 0
- Evidence: No current non-self Google canonical observed.
- Limitation: A canonical difference is direct evidence of Google selection, not proof of why Google selected it or of a content cause.

## 5. Weak discovery support combines empty API referrers with low local internal links

- Confidence: **REJECTED**
- Observed URLs: 0
- Evidence: 0 URL(s) meet the conservative local condition of zero API referring URLs and at most five local internal links.
- Limitation: The API says referringUrls is not exhaustive; this is a candidate signal, not an orphan determination.

## 2026-08-22 collapse re-evaluation

- Last crawl dated 2026-08-21 or 2026-08-22: 30 URL(s).
- Re-crawled after 2026-08-22: 51 URL(s).
- Never crawled in the current snapshot: 399 URL(s).
- Historical Google canonical change: UNKNOWN; one current URL Inspection snapshot cannot prove a change over time.
- Historical status on August 21–22: UNKNOWN; URL Inspection does not provide a historical replay.

## Rejected inference boundaries

- No single signal is treated as cause. No content, canonical, noindex, redirect, sitemap, or URL action is authorized by this report.
