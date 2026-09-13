# Technical Findings

- Built HTML: 1171; routable HTML: 1170.
- Intended indexable: 712; current sitemap: 712; sitemap duplicates: 0.
- Technical error rows: 0.
- Live readback: 200 live verified; 712/712 sitemap URLs were checked by the live audit.
- Local gates already passed: `seo:check`, `seo:validate`, `audit:indexation`, `audit:seo-collapse`, locale quality, multilingual AEO, and language-switch checks.
- The build emits warnings that `src/pages/sitemap*.xml.ts` is skipped because same-named static files exist in `public/`. This is the current intentional static sitemap source; it is recorded for governance review, not changed automatically.
- The live audit reported a non-blocking warning that `http://www.funnytools.win/` uses two redirects. No redirect change was applied.

## Safe remediation decision

No site URL, canonical, robots, noindex, redirect, slug, lastmod, or content change was applied. The current technical ground truth has no high-confidence sitemap/canonical/orphan defect that is safe to change without a narrower URL-level production/GSC evidence chain.

## Proposed INDEX_QUALITY_GATE (review gate, not executed)

A route may enter a staged recovery batch only when all gates below have evidence:
1. Technical: current production readback is direct HTTP 200; self-canonical; no accidental noindex/redirect/embed/404 state; included in exactly one sitemap; no broken internal URL.
2. Intent: the owner records one primary task/query and compares same-locale, same-type main content. A similarity score >= 0.80 is a human-review trigger, not automatic proof for MERGE.
3. Value: the page has a distinct tool utility or evidence-based answer, supported by more than word count alone (intent, uniqueness, utility, links, depth, and trust).
4. Discovery: Tier 1 pages have hub/category support, at least two unique inbound sources where applicable, and crawl depth <= 3; orphan/weak-link cases stay in review.
5. Locale: existing locale-quality, language-switch, canonical, and hreflang checks remain passing; translations are not merged as duplicates.
6. Rollout: no new indexable pages in this recovery; stage at most 20-30 existing routes per batch, observe 14-21 days, and compare URL-level GSC evidence before expanding.
