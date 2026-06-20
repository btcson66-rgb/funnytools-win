# FunnyTools

FunnyTools (https://funnytools.win) is a bilingual Astro static site for small browser-based utilities. It is data-driven and runs without a backend.

## Stack

- Astro static output with `base: '/'` and `trailingSlash: 'always'`, deployed on Cloudflare Pages (production). `.github/workflows/deploy.yml` also builds to GitHub Pages as a secondary/legacy backup target, not the live site.
- Vanilla JavaScript inside `.astro` tool widgets.
- `qrcode` for QR code generation.
- No database or server API. Google AdSense is enabled (`adsenseEnabled: true`, client `ca-pub-7052036786750044`) while the site is under AdSense review.

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

AdSense is controlled by the top-level `adsenseEnabled` flag in `src/config/site.ts` (currently `true`, loading the AdSense script under review). The granular `features` flags below remain off and gate individual slots/integrations:

```ts
features: {
  adsense: false,
  affiliate: false,
  sponsor: false,
  relatedResources: false,
  newsletter: false,
}
```

Activating affiliate, sponsor, related-resources, or newsletter is a flag flip plus real content configuration.

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
