# v0.4.2 - SEO content expansion, accessibility fixes, and QA hardening

Date: 2026-06-23

## What changed

- Reordered homepage popular-tools list to lead with highest-intent tools (PDF merge/split, image compression, QR code, word counter, random grouping, pomodoro, mortgage/compound interest calculators).
- Added a clear CTA ("立即使用" / "Use Now") to `ToolCard.astro` and the matching `ariaPrimaryNav` / `ariaMobileNav` i18n strings.
- Fixed a navigation accessibility bug: the mobile nav previously shared the same `aria-label` as the desktop nav; it now has a distinct label and syncs `aria-hidden` with its `hidden` state on toggle.
- Enriched on-page content for `random-name-picker` and `pomodoro-timer` (audience, case studies, notes, privacy note, additional FAQ items) in both zh and en.
- Added 12 new long-tail blog articles to `src/data/blogPosts.ts` (mobile PDF merge, oversized PDF uploads, image compression, PNG vs JPG quality, free QR codes, Threads word counts, classroom grouping, seating charts, mortgage/compound-interest reading guides, image format comparison, pomodoro focus guide). Total blog post count is now 22.
- Fixed a duplicate `FAQPage` JSON-LD bug: `src/components/Faq.astro` already injects FAQPage structured data, so a second injection added to `src/pages/[...locale]/tools/[slug].astro` was removed.
- Codex-assisted independent QA pass (build, type-check, blog data integrity, i18n array parity, JSON-LD de-duplication, sitemap coverage, built-HTML internal link sweep) found no functional bugs. Cleanup: removed an unused `src/lib/analytics.ts` helper that was never imported (GA4 tracking is already handled by the inline script in `[slug].astro`), and excluded `backup/` from TypeScript's check scope so archived snapshots don't pollute diagnostics.
- `CHANGELOG-SEO.md` documents the full 13-task SEO/AdSense/retention optimization pass this release is part of.

The previous live release is preserved by Git tag `backup-pre-v0.4.2-seo-content-2026-06-23`, pointing to v0.4.1 commit `1a6848c`.

## Verification

```powershell
npm.cmd run build
```

Build output: 478 pages, 0 errors.

## Restore

```powershell
Copy-Item -Recurse -Force backup\v0.4.2\files\* .
npm.cmd run build
```
