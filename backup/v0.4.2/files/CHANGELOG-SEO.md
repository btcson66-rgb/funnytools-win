# CHANGELOG-SEO

SEO, AdSense credibility, and user retention optimizations for funnytools.win.

## 2026-06-23

### Task 1: Brand Unification
- Verified all source files use consistent brand naming: "FunnyTools 免費線上工具箱" (zh) / "FunnyTools" (en)
- `src/config/site.ts` already correct; no stale "Free Tools Hub" or orphaned "免費工具箱" brand references found

### Task 2: Homepage Popular Tools Reorder
- Reordered `popularSlugs` in `src/pages/[...locale]/index.astro` to prioritize high-value tools
- New order: merge-pdf, image-compressor, qr-code-generator, word-counter, random-group-generator, pomodoro-timer, split-pdf, mortgage-payment, compound-interest, what-to-eat, random-name-picker, json-formatter

### Task 3: ToolCard CTA Button
- Added `<span class="tool-card__cta">` to `src/components/ToolCard.astro` with "立即使用" / "Use Now" text
- Added pill-button styles in `src/styles/global.css`
- Added `toolCardCta` key to `src/i18n/ui.ts`

### Task 4: Nav Accessibility Fix
- Changed mobile nav `aria-label` from `ariaPrimaryNav` to `ariaMobileNav` in `src/components/Nav.astro`
- Added `aria-hidden="true"` attribute synced with `hidden` state via JS toggle
- Added `ariaMobileNav` key to `src/i18n/ui.ts` ("行動版導覽" / "Mobile navigation")

### Task 5: Emoji in SEO Text
- Verified: `<title>`, `<h1>`, and breadcrumb text use `content.name` (no emoji icons)
- Emoji icons (`tool.icon`) only appear in card UI, not in SEO-critical elements

### Task 6–7: Tool Content Enrichment (10 Priority Tools)
- **merge-pdf**: Already fully enriched (audience, caseStudies, notes, faq 6, privacyNote)
- **split-pdf**: Already fully enriched
- **image-compressor**: Already fully enriched
- **qr-code-generator**: Already fully enriched
- **word-counter**: Already fully enriched
- **random-group-generator**: Added privacyNote (zh/en); audience, caseStudies, notes already present
- **random-name-picker**: Added audience (4), caseStudies (3), notes (3), privacyNote, 2 additional FAQ items; fixed local interface → imported from `_types.ts`
- **pomodoro-timer**: Added audience (4), notes (3) for both zh and en; caseStudies, faq, privacyNote already present
- **mortgage-payment**: Already fully enriched
- **compound-interest**: Already fully enriched

### Task 8: 12 New Blog Articles
Added to `src/data/blogPosts.ts`:
1. `mobile-pdf-merge` — 手機怎麼合併 PDF？免安裝 App 的操作方法
2. `pdf-too-large` — PDF 太大不能上傳怎麼辦？實用縮小方法整理
3. `compress-large-images` — 圖片太大怎麼壓縮？品質與大小的平衡指南
4. `png-to-jpg-quality` — PNG 轉 JPG 會失真嗎？格式轉換前該知道的事
5. `free-qr-code-guide` — 如何免費製作 QR Code？從產生到列印的完整流程
6. `threads-word-count` — Threads 文案字數怎麼算？掌握字數限制的實用方法
7. `teacher-random-grouping` — 老師如何快速隨機分組？省時公平的課堂分組方法
8. `seating-chart-guide` — 班級座位表怎麼快速產生？老師與活動主辦的實用方法
9. `mortgage-calculation-guide` — 房貸月付金怎麼算？公式原理與線上試算教學
10. `compound-interest-reading-guide` — 複利計算器怎麼看？搞懂每個數字的意思
11. `image-format-comparison` — 圖片格式差異：JPG、PNG、WebP 怎麼選？
12. `pomodoro-focus-guide` — 線上番茄鐘怎麼用？提升專注力的免費工具教學

Each article includes: title, description, summary, published/updated dates, 2-3 toolLinks, 2-3 sections with subsections, and 3-5 FAQ items.

### Task 9: Structured Data
- **WebSite + SearchAction**: ✅ Homepage (`index.astro`)
- **Organization**: ✅ Homepage (`index.astro`)
- **ItemList (popular tools)**: ✅ Homepage (`index.astro`)
- **FAQPage**: ✅ Homepage, ✅ Tool pages (via `Faq.astro` component), ✅ Blog pages
- **BreadcrumbList**: ✅ Tool pages, category pages, blog pages, support page
- **WebApplication**: ✅ All tool pages via `webApplicationJsonLd()`
- **BlogPosting (Article)**: ✅ Blog pages (`blog/[slug].astro`)

Note: FAQPage JSON-LD on tool pages is handled by the `Faq.astro` component (not in `[slug].astro`) to avoid duplicates.

### Task 10: Sitemap, robots.txt, Canonical, Hreflang
- **robots.txt**: Correct (`Allow: /`, sitemap pointer)
- **sitemap.xml.ts**: Includes all tools, categories, blog posts, legal pages; hreflang alternates for bilingual pages; zh-only entries for blog
- **Canonical**: Set in `BaseLayout.astro` for all pages
- **Hreflang**: Set in `BaseLayout.astro` with `x-default`; blog pages correctly marked zh-only

### Task 11: GA4 Event Tracking
- Created `src/lib/analytics.ts` with `trackEvent(name, params)` utility
- Verified existing comprehensive GA4 tracking in `tools/[slug].astro`:
  - `tool_view`: on page load
  - `tool_started`: on first meaningful interaction (file select, input change, button click)
  - `tool_completed`: when result container updates
  - `result_action` (copy): on copy button click
  - `file_download`: on download/export button click
  - `tool_action`: on primary action button click
  - `tool_error`: on validation/processing error display

### Task 12: Content Quality
- All 12 new blog articles are original, practical, and actionable
- Each article targets a distinct long-tail query different from existing articles
- Tool content enrichment uses specific, non-generic descriptions relevant to each tool's use case
- No thin content pages generated; all additions provide substantive value

### Files Changed
- `src/pages/[...locale]/index.astro` — popularSlugs reorder
- `src/components/ToolCard.astro` — CTA button
- `src/components/Nav.astro` — aria-label fix, aria-hidden sync
- `src/styles/global.css` — CTA button styles
- `src/i18n/ui.ts` — ariaMobileNav, toolCardCta keys
- `src/i18n/tools/random-group-generator.ts` — privacyNote
- `src/i18n/tools/random-name-picker.ts` — audience, caseStudies, notes, privacyNote, FAQ, import fix
- `src/i18n/tools/pomodoro-timer.ts` — audience, notes
- `src/data/blogPosts.ts` — 12 new articles
- `src/lib/analytics.ts` — new trackEvent utility
- `src/pages/[...locale]/tools/[slug].astro` — FAQPage JSON-LD
