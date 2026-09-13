# FunnyTools Index Recovery — Phase 1.5 Calibration

## Decision

Audit intelligence calibration completed. The v1 similarity/MERGE output is not safe for direct remediation. V2 makes functional identity and user outcome primary; similarity is supporting evidence only.

| metric | value |
| --- | --- |
| Original similarity pairs >= 0.80 | 406 |
| Original MERGE pages | 158 |
| V2 high-confidence SAME pairs | 0 |
| V2 ADJACENT pairs | 202 |
| V2 COMPLEMENTARY pairs | 53 |
| V2 DIFFERENT pairs | 65 |
| V2 UNKNOWN pairs | 86 |
| False-positive regression cases | 30 |

## Required examples

- JPG→PNG vs PNG→JPG: DIFFERENT.
- JPG→WebP vs WebP→JPG: DIFFERENT.
- CSV→JSON vs JSON→CSV: DIFFERENT.
- Delete PDF Pages vs Extract PDF Pages: DIFFERENT.
- Standard Deviation vs Z Score: ADJACENT.
- Tool vs Guide: COMPLEMENTARY by default.

## Safety

- No page source or content changed.
- No merge, noindex, delete, retire, redirect, canonical, slug, sitemap, lastmod, or production action executed.
- Phase 2 remediation remains blocked until human review of V2 output and URL-level evidence.
