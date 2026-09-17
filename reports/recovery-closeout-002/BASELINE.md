# FunnyTools Recovery Closeout 002 Baseline

Captured: 2026-09-17T17:59:12.339Z
Source commit: `c0a539aa8db18ee545a80b4274a7a8841a564bd1`
Package version: `5.141.1`

| Metric | Baseline | Evidence |
| --- | ---: | --- |
| Built HTML pages | 1182 | `dist/**/*.html` |
| Locally indexable pages | 717 | built HTML self-canonical and indexable |
| Sitemap URLs | 717 | unique URLs from public leaf sitemaps |
| Sitemap tool URLs | 86 | `public/sitemap-tools.xml` |
| Live tool URLs | 86 | existing release baseline |
| Protected URLs | 94 | `reports/education-recovery-001/protected-urls.json` |
| Phase 2B protected URLs | 40 | `reports/education-recovery-001/phase2b-protection-before.json` |
| Editorial leakage routes | 0 | recovery audit |

## Locale counts

- zh-TW: 312
- en: 191
- es: 139
- fr: 75

## SHA-256

- root sitemap: `afbd282fe269c5e1f4f0c92f05c42a4cbb7d662632310f0feb64d812f3532ec1`
- sorted URL list: `57efff8039e3ade2dfb7f280426d6b41b0b53df348e77190c73ee3acfcce41c1`
- protected manifest: `01153484646a311db0d410a6fe20d89a8d70306f939b70353e981190541acbd8`
- Phase 2B manifest: `10340c5bdf480693044b269760d1aaf9d2088ecc014fdd56c6865f0aa5ea79d4`

## Freeze assertions

- URL surface is frozen at 717 URLs for this closeout.
- The only indexable education additions remain the existing three zh-TW tools: final grade needed, item analysis, and KR-20.
- Protected URLs and Phase 2B artifacts are reference-only gates; this closeout does not rewrite them.
