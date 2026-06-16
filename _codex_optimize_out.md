Implemented the optimization brief.

Changed files:
- `src/i18n/pages.ts`
- `src/i18n/ui.ts`
- `src/data/categories.ts`
- `src/pages/[lang]/index.astro`
- `src/pages/[lang]/tools/index.astro`
- `src/components/Footer.astro`
- `src/layouts/BaseLayout.astro`
- `src/styles/global.css`

Key work completed: exact bilingual home/legal copy replaced, new i18n keys wired, homepage stat band and category counts added, all-tools live search/filter added with vanilla JS, footer legal note added, stale image category copy fixed, `twitter:image` meta added, and global visual polish applied.

Verification:
- `npm run build` succeeded with `194 page(s) built` and `Complete!`
- No `ERROR` appeared in the build output
- `rg -n "adsbygoogle" dist` found no matches
- No package/dependency changes and no tool widget/i18n tool files were touched.