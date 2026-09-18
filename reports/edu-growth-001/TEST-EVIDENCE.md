# Test Evidence

## T+0 results

- `npm run build`: PASS; 1,182 pages; no scheduled candidate route emitted.
- `npm run typecheck`: PASS.
- `npm run lint`: PASS.
- `npm test`: PASS; 182/182 tests, including the full build.
- Focused calculator, registry, and sitemap tests: 22/22 PASS.
- `npm run seo:check`: PASS; 717 unique sitemap URLs; no collapsed-lastmod failure.
- `npm run edu-growth:check`: PASS with `NO_DUE_PAGES`, dueCount 0, selectedCount 0.
- `npm run preflight`: PASS; build 1,182 pages; sitemap 717 URLs; editorial, collapse, language, AdSense, content value, multilingual AEO, French AEO, analytics, PWA, security, and OG audits all passed.

## Test files

- `tests/education-growth-tools.test.mjs`: five formula engines and edge cases.
- `tests/sitemap-hash-normalization.test.mjs`: migration, live-map recovery, scheduled first-lastmod and normalization invariants.
- `tests/tool-registry-contract-split05.test.mjs`: registry/widget/content parity.

## Remaining release evidence

PR CI, Pages deployment readback, and post-2026-09-25 public URL smoke remain release gates.
