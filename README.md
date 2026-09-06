# FreeTools — Free Online Browser Tools

FreeTools is a free online toolbox for everyday tasks.

Website: https://funnytools.win/

FreeTools provides free browser-based tools for PDF files, images, text, QR codes, random selection, time management, money calculators, teacher tools, and education/statistics calculators.

## Popular FreeTools Pages

- Merge PDF: https://funnytools.win/tools/merge-pdf/
- Image Compressor: https://funnytools.win/tools/image-compressor/
- QR Code Generator: https://funnytools.win/tools/qr-code-generator/
- Word Counter: https://funnytools.win/tools/word-counter/
- Random Group Generator: https://funnytools.win/tools/random-group-generator/
- Pomodoro Timer: https://funnytools.win/tools/pomodoro-timer/
- Business Days Calculator: https://funnytools.win/tools/business-days/
- Mortgage Payment Calculator: https://funnytools.win/tools/mortgage-payment/

## Brand Note

FreeTools is available at https://funnytools.win/.  
The domain name is funnytools.win, but the product brand is FreeTools.

---



# FreeTools

FreeTools (https://funnytools.win) is a bilingual Astro static site for small browser-based utilities. It is data-driven. Most tools run entirely in the visitor's browser, but a small set of file-conversion tools depends on an independent backend service — see [Conversion API backend](#conversion-api-backend). Do not assume this repository is backend-free.

## Stack

- Astro static output with `base: '/'` and `trailingSlash: 'always'`, deployed on Cloudflare Pages (production). `.github/workflows/deploy.yml` also builds to GitHub Pages as a secondary/legacy backup target, not the live site.
  - **Unconfirmed (2026-09-06):** this line and `.github/workflows/deploy.yml`'s own header comment ("the origin response path uses GitHub Pages/Fastly") contradict each other about which target actually serves production. Neither has been verified against the live origin. Do not rely on either statement, and do not "fix" one to match the other without checking the live response headers first.
- Vanilla JavaScript inside `.astro` tool widgets.
- `qrcode` for QR code generation.
- No database. Most tools have no server dependency, but five live conversion tools do call a server API (see below). Google AdSense is enabled (`adsenseEnabled: true`) while the site is under review. Set the public build variable `PUBLIC_ADSENSE_CLIENT` to the AdSense client id; `PUBLIC_ADSENSE_ID` is accepted only as a legacy fallback.

## Conversion API backend

The site is not purely static. Five live tools upload the visitor's file to an independent
FastAPI/Uvicorn service and download the converted result:

| Tool slug | Backend endpoint |
|---|---|
| `bulk-image-compressor` | `POST /api/images/compress-batch` |
| `pdf-to-word` | `POST /api/pdf/to-word` |
| `pdf-table-to-excel` | `POST /api/pdf/table-preview`, `POST /api/pdf/table-to-excel`, `POST /api/pdf/export-tables` |
| `image-to-dxf` | `POST /api/image/to-dxf` |
| `pdf-compressor` | `POST /api/pdf/compress` |

- Host: `https://api.funnytools.win` (behind Cloudflare). Source lives in this repo under `backend/`
  (`app.py`, `services/`, `Dockerfile`, `requirements*.txt`).
- Frontend entry points: `src/components/tools/ConversionApiTool.astro` and `src/lib/funnytools-api.ts`;
  the slug-to-widget mapping is in `src/lib/toolWidgets.ts`.
- **The backend has an independent lifecycle and is NOT deployed by any workflow in this repo.**
  `.github/workflows/deploy.yml` only deploys the frontend and says so explicitly. As of 2026-09-06
  the deployment target, restart mechanism, and resource limits for this container are undocumented.
- Availability is monitored by `.github/workflows/conversion-api-smoke.yml` (daily) against production.
  See `tests/conversion-api-integration.api.mjs`. A red run means production, not the test — read the
  error message, which distinguishes "origin not ready" from an endpoint assertion failure.

### Privacy boundary

Tools in the table above **upload the visitor's file to the API**. Copy for them must not claim the file
never leaves the browser. `src/i18n/tools/conversion-api-tools.ts` holds the wording actually used
(uploaded for conversion, processed temporarily, not intentionally retained) — do not strengthen it
beyond what the backend code supports. Every other live tool is browser-local; blanket
"nothing is uploaded" claims on category pages, guides, or the homepage must exclude these five.

## Architecture

- `src/config/site.ts` defines site metadata, locales, legacy `adsenseEnabled`, and v2 feature flags.
- `src/data/tools.ts` is the central `ToolMeta[]` asset registry for live and planned tools.
- `src/data/categories.ts` defines the category taxonomy.
- `src/i18n/tools/<slug>.ts` contains bilingual tool copy, SEO text, labels, FAQ, disclaimer, and optional privacy notes.
- `src/lib/toolWidgets.ts` maps live tool slugs to widget components.
- `src/lib/toolContent.ts` maps live tool slugs to i18n content.
- `src/lib/url.ts` owns route construction, including canonical tool URLs and embed URLs.
- `src/layouts/ToolLayout.astro` renders the full canonical tool page.
- `src/layouts/EmbedLayout.astro` renders minimal noindex iframe pages.

## Add A New Tool

1. Add the tool metadata in `src/data/tools.ts`.
2. Set `status: 'live'` when the tool is ready to publish.
3. Fill the v2 metadata fields: `assetType`, intents, `embedPotential`, `maintenanceRisk`, and `monetizationTags`.
4. Create `src/i18n/tools/<slug>.ts` with both `zh` and `en` content.
5. Create `src/components/tools/<Name>.astro` for the widget.
6. Register the slug in `src/lib/toolWidgets.ts`.
7. Register the slug in `src/lib/toolContent.ts`.
8. Run `npm run build`.

## Embed System

Embeddable tools are selected by `getEmbeddableTools()` in `src/data/tools.ts`, which returns live tools where `embedPotential !== 'low'`.

Embed pages live at:

```text
/<lang>/embed/<slug>/
```

They use `EmbedLayout.astro`, include `robots: noindex,follow`, skip nav/footer/ads/breadcrumbs, and link back to the canonical full tool page. The full tool pages show an iframe snippet through `src/components/EmbedCode.astro` when a tool is embeddable.

Embed routes are intentionally not listed in `src/pages/sitemap.xml.ts`.

## Monetization Flags

AdSense is controlled by the top-level `adsenseEnabled` flag in `src/config/site.ts` (currently `true`, loading the AdSense script under review) and the public build variable `PUBLIC_ADSENSE_CLIENT`. The granular `features` flags below remain off and gate individual slots/integrations:

```ts
features: {
  adsense: false,
  affiliate: false,
  sponsor: false,
  relatedResources: false,
  newsletter: false,
}
```

Manual ad units require both `PUBLIC_ADSENSE_CLIENT` and a non-empty `adSlot` prop on `AdSlot.astro`; empty clients or empty slot ids render no ad markup. Activating affiliate, sponsor, related-resources, or newsletter is a flag flip plus real content configuration.

## Asset Types

`ToolMeta.assetType` reserves the platform taxonomy:

- `tool`: general utility.
- `calculator`: numeric or financial calculator.
- `generator`: generated output such as passwords, colors, or QR codes.
- `quiz`: multi-step assessment or personality-style test.
- `template`: reusable document or workflow template.
- `database`: browsable structured reference data.
- `game`: interactive game asset.
- `widget`: compact embeddable widget.
- `guide`: explanatory or instructional asset.

The current v2 pass wires the metadata only. It does not add new template, database, game, or guide content.


