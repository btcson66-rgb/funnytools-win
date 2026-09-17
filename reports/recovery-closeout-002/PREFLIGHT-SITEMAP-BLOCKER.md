# Preflight gate record

Command: `npm run preflight`

Result: `BLOCKED_BY_PRE-EXISTING_SITEMAP_CHECK`

The build, lint, typecheck, test, Phase 2B audit, education-recovery audit, editorial-leakage audit, and recovery-closeout audit passed. The preflight chain stops at `npm run seo:check` because the existing committed sitemap artifacts already contain a collapsed child-sitemap `<lastmod>` distribution:

- `sitemap-tools.xml`: 86 URLs share `2026-09-17` as the only `<lastmod>` value.
- `sitemap-workflows.xml`: 12 URLs share `2026-09-17` as the only `<lastmod>` value.

`generate-sitemaps.mjs` also reports 253 stored-hash drifts and would refresh 240 existing URL lastmod values. The closeout task explicitly freezes mass/fake lastmod changes, so these generated artifacts were not staged and no sitemap architecture or lastmod fix was added to this release.

The same `seo:check` failure is reproducible against the pre-existing committed sitemap artifacts at the v5.141.1 baseline. It is recorded here as a release-gate blocker requiring a separately authorized sitemap/lastmod repair, not attributed to FIX-001–FIX-010.
