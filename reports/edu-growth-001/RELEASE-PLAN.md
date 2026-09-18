# Release Plan

## Freeze and schedule

- T+0 / 2026-09-18: research, build, test, scheduler and sitemap repair only; new public URL delta must remain 0.
- 2026-09-25: release first pair (SEM zh/en), at most 2 pages.
- 2026-09-26: release Spearman–Brown zh/en, at most 2 pages.
- 2026-09-27: release learning gain zh/en, at most 2 pages.
- 2026-09-28: release weighted rubric zh/en, at most 2 pages.
- 2026-09-29: release Cohen κ zh/en, at most 2 pages.
- 2026-09-25 to 2026-10-16: observation checkpoints T+7, T+14, T+21, T+28; no expansion based on assumptions alone.

## Scheduler contract

`src/config/edu-growth-release.json` is the source of truth. `scripts/edu-growth-release.mjs` only evaluates due candidates and quality fields; it never generates copy. The GitHub Actions scheduler performs no-op when `NO_DUE_PAGES`, and only builds/deploys when the selected pair is due and passes the post-build content-hash gate.

## Daily release gate

1. Determine due pair in Asia/Taipei.
2. Build and verify that only due candidates become public routes.
3. Generate sitemaps in preserve mode; new candidates receive their publishAt first lastmod.
4. Run manifest, sitemap, lint, typecheck, focused calculator tests, and indexable URL validation.
5. Deploy through GitHub Pages; submit changed URLs to IndexNow/Bing only when secrets exist.
6. Verify new URL 200/self canonical/indexable/hreflang/sitemap/contextual links after deployment.

## Stop conditions

- Any protected/Phase2B gate fails.
- A future candidate leaks into dist, sitemap, hreflang, navigation, or related links before publishAt.
- Quality manifest is incomplete or content hash is missing after build.
- sitemap lastmod collapse returns, or GSC/indexing result is being inferred without readback.
