# FunnyTools Index Recovery — Final Status

## Current Funnel

| metric | value |
| --- | --- |
| Built | 1171 |
| Production reachable | 712 live sitemap URLs |
| Intended indexable | 712 |
| Sitemap | 712 |
| Google known | 401 (GSC chart latest 2026-09-04; URL sample unavailable) |
| Crawled-not-indexed | 269 (GSC summary; URL sample unavailable) |
| Indexed | 54 (GSC chart latest 2026-09-04; URL sample unavailable) |

Acceptance rate: 13.5% summary-derived (54 / 401); URL-level acceptance and type/locale/cluster acceptance are UNKNOWN.

## Main Root Causes

1. **Confirmed — GSC coverage discontinuity:** 306 indexed / 79 not indexed on 2026-08-21 became 63 / 334 on 2026-08-22.
2. **High confidence operational candidate — GSC submission identity failure:** the 2026-08-18 SEO indexing run failed because its service account could access only `sc-domain:worthcalc.win`; deployment itself succeeded. This may affect submission/discovery freshness, but causation for the GSC collapse is not proven.
3. **Ruled out locally/currently — sitemap/canonical structural defect:** 712/712 sitemap URLs pass local indexability checks; current live readback passed all 712 sitemap URLs.
4. **Unknown — quality/intent:** the Coverage ZIP has no URL examples, so Crawled-not-indexed cannot be clustered by type, locale, template, batch, similarity, or depth.
5. **Possible — GSC reprocessing/reporting lag:** timing alone cannot distinguish platform classification from site change.

## Crawled-not-indexed Breakdown

Current URL-level breakdown: **UNKNOWN / NOT AVAILABLE**. The export contains summary rows only. The repository’s 19-row URL Inspection file is historical 2026-09-04 supplemental evidence and is not aggregated as current Coverage truth.

The latest supplied summary categories are shown below; they are not URL-level examples and should not be interpreted as page-type, locale, or cluster evidence.

| category | urls |
| --- | --- |
| Page with redirect | 39 |
| Alternate page with proper canonical | 5 |
| Excluded by noindex | 31 |
| Not found (404) | 3 |
| Crawled - currently not indexed | 269 |

## Remediation

The tables below are deterministic review classifications, not commands. No row was executed automatically.

### Intended-indexable review queue

| action | urls |
| --- | --- |
| IMPROVE | 113 |
| KEEP | 330 |
| MERGE | 158 |
| WAIT | 111 |

### Existing excluded-policy inventory

| action | urls |
| --- | --- |
| NOINDEX | 124 |
| RETIRE | 335 |

## Technical Changes Actually Applied

- Added a reproducible `npm run audit:index-recovery` inventory/report generator and committed the evidence reports on this branch.
- No production site URL, canonical, robots, noindex, redirect, slug, lastmod, or content change was applied.

## Changes NOT Applied

- No mass merge, retire, delete, noindex, canonical migration, slug change, hierarchy change, or new indexable SEO page.
- No Indexing API or bulk Request Indexing was used.

## Validation

- Static build and existing SEO gates passed before the report run; final command results are recorded in `validation-report.md`.
- Production: 200 live verified; deployment: **NOT DEPLOYED**.

## Git

- Branch: `codex/funnytools-index-recovery-audit-20260913`
- Commits / PR: populated at closeout after artifact validation.

## Decision

Audit complete with conservative remediation. No high-confidence site technical defect was found that justified changing production. Human review is required for all content-value, merge, retire, and noindex candidates.
