# SEO Implementation Log

## 2026-06-23 Initial Audit Batch

Changed files:

- Added `scripts/seo-dist-audit.mjs` to generate rendered-output SEO reports.
- Added/updated `seo-audit-report.md`, `seo-keyword-map.md`, and `seo-content-plan.md` from the current build output.

Structured data added:

- None in the initial audit batch. Existing rendered output was inspected for page metadata and sitemap behavior.

Titles/meta updated:

- None in the initial audit batch.

Internal links added:

- None in the initial audit batch.

Noindex/sitemap/analytics changes:

- None. Baseline check confirms embed pages are noindex and excluded from sitemap when the generated counts match the audit summary.

Verification:

- `npm.cmd run build` completed before report generation.
- `node scripts/seo-dist-audit.mjs` generated reports from rendered `dist/` HTML.

## 2026-06-23 Content, Linking, and Final Verification Batch

Changed files:

- Added `scripts/gsc-import.mjs` and `seo-gsc-sample.csv` for importing Search Console CSV exports with columns `query,page,clicks,impressions,ctr,position,date`.
- Updated `src/i18n/tools/content-enhancements.ts` with priority zh/en SEO titles, descriptions, keywords, content sections, examples, limitations, and FAQs for selected education/statistics, classroom, PDF, and image tools.
- Updated `src/data/blogPosts.ts` with 5 Traditional Chinese pillar articles for teacher exam scoring, T/Z/PR interpretation, classroom random tools, PDF workflows, and image format workflows.
- Updated `src/pages/[...locale]/index.astro` with above-the-fold education/statistics and PDF/image/QR tool clusters in both zh and en.
- Updated `src/data/tools.ts` related-tool clusters for teacher exam/statistics, PDF page operations, and image conversion workflows.
- Shortened `src/pages/[...locale]/support.astro` English support metadata to satisfy the AdSense metadata length audit.
- Regenerated root reports: `seo-audit-report.md`, `seo-keyword-map.md`, `seo-content-plan.md`, and this log.
- `npm.cmd run seo:audit` refreshed generated files under `seo-system/reports/`.

Structured data added:

- No duplicate schema builders or AdSense/GA/CSP changes were made.
- The 5 new blog posts use the existing blog page JSON-LD path for Article/BreadcrumbList/FAQPage where visible FAQ content exists.
- Priority tool FAQ content continues to use the existing rendered FAQ/schema path; no fake ratings, reviews, or unsupported claims were added.

Titles/meta updated:

- Added keyword-led zh/en metadata through tool content enhancements for priority tools including teacher exam score converter, T score, Z score, weighted average, standard deviation, Cronbach alpha, group generator, PDF page tools, image crop, PNG/JPG/WebP conversion tools, and related image/PDF utilities.
- Kept zh and en canonical handling separate; no cross-locale canonical changes.
- Lengthened the 5 new pillar article descriptions so sitemap-indexable blog pages meet the AdSense preflight thresholds.

Internal links added:

- Added homepage cluster links to real tool slugs for education/statistics and PDF/image workflows.
- Added `toolLinks` from each pillar article to its target tools.
- Strengthened `relatedTools` for statistics, teacher classroom, PDF, and image clusters using descriptive adjacent tools rather than generic link dumps.

Noindex/sitemap/analytics changes:

- No noindex, sitemap, AdSense, GA4, or CSP logic changes were made.
- Rendered-output audit confirms the build has 564 HTML pages and 296 sitemap URLs.
- Existing `/embed/*` pages remain noindex and excluded from the sitemap.
- The blog system renders these pillar posts as zh-only, so matching English blog posts were not created.

Verification:

- `npm.cmd run build` passed: 564 pages built.
- `node scripts/seo-dist-audit.mjs` passed: 564 HTML pages crawled, 296 sitemap URLs, 343 pages with flags for review/reporting.
- `npm.cmd run audit:adsense` passed: checked 296 indexable sitemap URLs.
- `npm.cmd run audit:lang-switch` passed: 189 links, 0 missing targets.
- `npm.cmd run audit:analytics` passed: 152 localized tool pages, 7 required events, 0 forbidden payload names.
- `npm.cmd run seo:audit` passed with 0 critical issues and 18 warnings.

Remaining:

- The generated audit still lists non-critical flags for ongoing title/meta/thin-content review across the full site.
- Planned/thin tool decisions should be reviewed in the generated keyword map before creating additional long-tail pages.

## 2026-06-23 Bilingual Blog Routing and Pillar Articles

Changed files:

- Updated `src/data/blogPosts.ts` so blog post content normalizes into locale-keyed fields with per-post `locales`; existing zh source text is preserved as raw input, while the five pillar posts now expose `['zh', 'en']`.
- Updated `src/data/seoResourcePosts.ts` so generated SEO resource posts remain zh-only through the same normalized `BlogPost` model.
- Updated `src/pages/[...locale]/blog/index.astro` and `src/pages/[...locale]/blog/[slug].astro` to generate `/en/blog/` plus English article pages only for posts with English content.
- Added blog UI strings to `src/i18n/ui.ts`; zh strings were restored from the previous blog route templates, and English strings were added for the blog index/article chrome.
- Updated `src/pages/sitemap.xml.ts` so the blog index and five bilingual pillar posts have zh/en sitemap entries with alternates, while all remaining posts stay zh-only.
- Updated the English homepage clusters in `src/pages/[...locale]/index.astro` to link to the matching English teacher/statistics and PDF/image pillar articles.

Bilingual posts:

- `teacher-exam-score-guide`
- `t-score-pr-guide`
- `classroom-random-tools-guide`
- `pdf-workflow-guide`
- `image-format-workflow-guide`

Scope notes:

- All other pre-existing blog posts remain `['zh']`; they were not machine-translated.
- Blog index alternates are enabled because `/blog/` and `/en/blog/` both exist.
- Article alternates are enabled only for bilingual posts; zh-only article pages keep `hasAlternates={false}` and do not emit `/en/blog/{slug}/`.
- Canonical URLs remain self-referential per locale. BaseLayout, AdSense, GA4, and CSP core were not changed.
