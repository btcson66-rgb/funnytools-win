# Backup v0.3.0

Date: 2026-06-19

Minor release consolidating three local worktrees of work (browser-tool expansion,
education & statistics tools, classroom-tool refinements, and AdSense launch infra)
into a single published update. Reviewed by Claude + Codex before push.

## Recovery points

- `v0.2.1` is the previous release tag.
- `v0.3.0` is the tag for this release.

To restore the previous version:

```powershell
git switch --detach v0.2.1
npm.cmd ci
npm.cmd run build
```

To restore this release:

```powershell
git switch --detach v0.3.0
npm.cmd ci
npm.cmd run build
```

## Changes

- **16 new tools** (60 -> 76 live tools):
  - Charts: Bar Chart Maker, Pie Chart Maker (`ChartMaker.astro`)
  - Image: Image Crop, Image Rotate/Flip, Image to Base64
  - Math/stats: Percentage Calculator, Standard Deviation Calculator
  - Education & statistics (shared `EducationStatisticsCalculator.astro`): weighted average,
    class-rank percentile, normalized score converter, teacher exam score converter,
    Cronbach alpha, independent-samples t-test, z-score, t-score, percentile-rank
- **New "Education & Statistics" category** plus a (hidden, empty) `personality` category placeholder.
- **Category content system** (`src/data/categoryContent.ts`): richer category pages with
  intro, use-cases, how-to-choose, FAQ, and per-tool blurbs.
- **AdSense launch**: `public/ads.txt`, AdSense script gated behind `SITE.adsenseEnabled`,
  CSP allowlist for AdSense domains, and a `scripts/adsense-preflight.mjs` audit
  (run via `npm run preflight`).
- **SEO**: sitemap now emits `lastmod` + `changefreq` + `priority`; localized category SEO titles.
- **Refinements** to existing classroom/utility tools (business days, grade average,
  QR code, random group, random student picker, seating chart) and i18n copy.
- `grade-average` moved from the `study` category to the new `statistics` category;
  stale study cross-references cleaned up.

## Merge resolution notes

Consolidated via 3-way merges onto `v0.2.1` (origin/main). Conflicts resolved in:
`sitemap.xml.ts` (kept richer main version), `categories.ts` (kept both new categories),
`[category].astro` (adopted categoryContent design + main's SEO-title fallback),
`tools.ts` relatedTools (by topical relevance), and `grade-average.ts` (shared `_types` import).
Build (`npm run preflight`) passes: 454 pages, 186 indexable URLs, AdSense audit OK.

## Changed files

66 files changed (+6162 / -763). 18 new files. See `git diff v0.2.1 v0.3.0`.

The Git tag `v0.3.0` is the authoritative complete backup.
