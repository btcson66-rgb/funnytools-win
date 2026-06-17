# TASK: Add a new "PDF Tools" category with 6 fully-working client-side PDF tools

You are working IN-PLACE on the existing, working Astro static site at the current working
directory (`_tools_hub/`). It currently has 45 live tools across 7 categories and a clean
`npm run build`. This task ADDS a new `pdf` category and 6 new live PDF tools.
**DO NOT rewrite anything. DO NOT break the existing build. ADDITIVE only.**

Read `README.md` first — it documents the exact "Add A New Tool" workflow (8 steps). Follow it precisely.

## Why / privacy model
All processing happens 100% locally in the browser with `pdf-lib`. The user's files are NEVER
uploaded — this is the core selling point and MUST be stated in every PDF tool's `privacyNote`
(zh + en). This matches the site's existing "在瀏覽器本機處理，不上傳檔案" promise.

## New dependency (the ONLY allowed new dep)
- Add `"pdf-lib": "^1.17.1"` to `dependencies` in `package.json`, then run `npm install` so
  `package-lock.json` updates and the build can resolve it.
- Load it LAZILY inside each widget's client script via dynamic import, EXACTLY like
  `QrCodeGenerator.astro` loads `qrcode`:
  ```js
  const mod = await import('pdf-lib');
  const { PDFDocument, degrees } = mod;
  ```
  Do NOT import pdf-lib at the top of the `.astro` frontmatter (keep it client-only / lazy so
  the JS only loads when the user acts).
- NO other new dependencies. No backend, DB, paid API, analytics, or ad scripts.

## New category (add to `src/data/categories.ts`)
```ts
{
  id: 'pdf',
  icon: '📄',
  name: { zh: 'PDF 工具', en: 'PDF Tools' },
  description: {
    zh: '在瀏覽器本機合併、分割、旋轉與整理 PDF，檔案完全不上傳。',
    en: 'Merge, split, rotate, and organize PDF files locally in your browser — nothing is uploaded.',
  },
},
```
Place it right after the `image` category entry.

## The 6 PDF tools to implement (slug — icon — what it does)
1. `merge-pdf` — 🔗 — Select multiple PDF files, reorder them (move up/down or by listed order),
   merge into a single PDF, download. Show the chosen files as a reorderable list with page counts.
2. `split-pdf` — ✂️ — Upload one PDF; split by (a) every page into separate single-page PDFs OR
   (b) custom page ranges like `1-3, 5, 8-10`. Output: a download per resulting file (or a single
   range file when one range). Show total page count after load.
3. `images-to-pdf` — 🖼️ — Select multiple JPG/PNG images (reorderable), choose page size
   (A4 / Letter / Fit-to-image) and orientation, combine into one PDF, download. Use
   `embedJpg`/`embedPng` from pdf-lib; detect type by file MIME/extension.
4. `rotate-pdf` — 🔄 — Upload one PDF; rotate all pages or a chosen page range by 90 / 180 / 270
   degrees (clockwise); download the rotated PDF. Use pdf-lib `page.setRotation(degrees(n))`
   (add to any existing rotation).
5. `delete-pdf-pages` — 🗑️ — Upload one PDF; enter pages to remove (e.g. `2, 5-7`); produce a new
   PDF without those pages; download. Guard against deleting all pages.
6. `extract-pdf-pages` — 📑 — Upload one PDF; enter pages to KEEP (e.g. `1, 3-5`); produce a new PDF
   with only those pages in the given order; download.

## Per-tool workflow — do ALL of the README steps for EACH tool
1. `src/data/tools.ts`: add a `ToolMeta` entry with:
   - `slug`, `category: 'pdf'`, `icon` (as above), `status: 'live'`,
   - `assetType: 'tool'`, `searchIntent: 'high'`, `shareIntent: 'low'`,
   - `embedPotential: 'low'` (PDF tools require local file input — keep them OFF the embed system),
   - `maintenanceRisk: 'low'`, `monetizationTags: ['adsense', 'affiliate']`,
   - `featured: true`, `isNew: true`, `updated: '2026-06-16'`,
   - bilingual `name` and `short` (zh + en), natural copy.
2. `src/i18n/tools/<slug>.ts`: FULL bilingual `ToolContent` (zh + en), matching the exact shape of
   existing files (e.g. `src/i18n/tools/image-compressor.ts` / `qr-code-generator.ts`):
   `name, short, long, seoTitle, seoDescription, keywords[], instructions[], examples[] (>=3 real
   use cases), faq[] (3-5 Q&A), labels{} (EVERY UI string the widget renders), privacyNote (REQUIRED
   for all 6 — state files never leave the browser)`. NO English-only stubs — both languages complete
   and natural. SEO titles like `合併 PDF 工具｜免費線上 Merge PDF` / `Merge PDF | Free online tool`.
3. `src/components/tools/<PascalCaseName>.astro`: self-contained vanilla-JS widget (NO UI framework).
   - Receive `labels: Record<string,string>` via `Astro.props` and pass to the script via
     `data-labels={JSON.stringify(labels)}`, EXACTLY like existing widgets (see `Base64Tool.astro`,
     `QrCodeGenerator.astro`, `ImageCompressor.astro`).
   - All visible text MUST come from `labels` — no hardcoded UI strings.
   - Use `<input type="file" accept="application/pdf">` (or `image/*` for images-to-pdf;
     `multiple` for merge & images-to-pdf).
   - Lazy-load pdf-lib via `await import('pdf-lib')` only when the user clicks the action button.
   - Trigger downloads from a Blob: `new Blob([bytes], { type: 'application/pdf' })` →
     `URL.createObjectURL` → temporary `<a download>` → `revokeObjectURL`.
   - Robust UX: a visible processing/working state, a `data-error` element (role="alert", hidden by
     default) for invalid input (no file, bad page range, corrupt PDF caught in try/catch), and a
     Reset button to clear state.
   - Parse page-range strings (`1-3, 5, 8-10`) defensively; clamp to valid pages; show an error on
     invalid/empty ranges. Pages are 1-indexed in the UI, 0-indexed for pdf-lib.
   - Mobile-friendly; reuse existing CSS classes/conventions (`tool-widget card`, `actions`, `btn`,
     `btn go`, `btn ghost`, `form-error`, `toast`) — match the look of existing widgets.
4. Register the widget import + `widgetBySlug` entry in `src/lib/toolWidgets.ts`.
5. Register the content import + `contentBySlug` entry in `src/lib/toolContent.ts`.
   (Both maps are required — see README steps 6 and 7. The build will fail a tool that is `live`
   but missing from either map, so double-check all 6 are in BOTH files.)

## HARD CONSTRAINTS
- ADDITIVE only. Do not modify or remove existing tools, routes, layouts, or the embed system
  beyond adding the new entries/registrations.
- Keep ALL monetization OFF — do NOT change `adsenseEnabled` or any `SITE.features` flag.
- Only new dep allowed: `pdf-lib`. No analytics/ads/backend.
- Bilingual parity for EVERY new string (zh + en). Every PDF tool MUST have a `privacyNote`.
- Keep `embedPotential: 'low'` for all 6 so no embed pages are generated for file-input tools.

## FINISH
1. Run `npm run build` — it MUST pass with ZERO errors.
2. Confirm: 51 total live tools, a new `pdf` category, and the HTML page count grew by the new
   canonical tool pages (6 tools × number of locales, plus category pages). No embed pages for PDF
   tools (embedPotential low).
3. Output a concise summary: each new tool (slug, assetType, files created), the new total tool
   count, the new total built-page count, the pdf-lib version added, and any deviations.
