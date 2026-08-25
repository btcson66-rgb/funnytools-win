# BUILD SPEC — Free Tools Hub / 免費工具箱 (Phase 1)

> Authoritative build instruction. Implement EXACTLY this. Do not invent extra
> features, do not add tools beyond those listed as `live`. Keep everything
> static, zero-backend, zero paid APIs, mobile-first.

## 0. Project identity & deploy

- Brand: `免費工具箱` (zh-TW) / `Free Tools Hub` (en)
- Stack: **Astro** (static output), TypeScript, **no UI framework** (vanilla JS in
  per-tool `<script>` islands). No Tailwind — plain CSS in `src/styles/global.css`.
- Deploy target: GitHub Pages **project site** → `https://btcson66-rgb.github.io/freetools/`
  - `astro.config.mjs`: `site: 'https://btcson66-rgb.github.io'`, `base: '/freetools'`,
    `output: 'static'`, `trailingSlash: 'always'`, `build: { format: 'directory' }`.
- All internal links MUST be built from `import.meta.env.BASE_URL` (never hardcode
  `/freetools/`) so the site can move to root or a subdomain by changing one config.
- Node 24 / npm 11 are installed. Use `npm install` (not pnpm/yarn).

## 1. Information architecture

Bilingual subdirectory routing, both locales fully prefixed:

```
/                      -> language redirect page (JS: navigator.language; <noscript> links both)
/zh/                   -> zh-TW homepage
/en/                   -> en homepage
/zh/tools/             -> all-tools / category overview (zh)
/en/tools/
/zh/category/<cat>/    -> category page (zh)
/en/category/<cat>/
/zh/tools/<slug>/      -> individual tool page (zh)
/en/tools/<slug>/
/zh/about/  /contact/  /privacy/  /terms/  /disclaimer/   (and /en/ equivalents)
/sitemap.xml           -> custom endpoint with hreflang alternates
/robots.txt            -> static (public/)
```

Locales: `zh` (lang attr `zh-Hant`, hreflang `zh-TW`) and `en` (lang attr `en`,
hreflang `en`). Use dynamic `[lang]` route segments with `getStaticPaths()` over
`['zh','en']` — do NOT use a separate folder per language. Everything is generated
from the data files in §3.

## 2. File structure to create (inside `_tools_hub/`)

```
_tools_hub/
  package.json            # deps: astro (latest). devDeps: typescript. scripts: dev/build/preview
  astro.config.mjs
  tsconfig.json           # extends astro/tsconfigs/strict
  .gitignore              # node_modules, dist, .astro
  public/
    robots.txt
    .nojekyll
    assets/               # (leave empty placeholder file .gitkeep; OG image added later)
  src/
    config/site.ts        # SITE config object (see §3.1)
    data/
      categories.ts       # 7 categories (see §3.2)
      tools.ts            # tool registry (see §3.3)
    i18n/
      ui.ts               # shared UI strings per locale (see §3.4)
      tools/
        random-number-picker.ts
        pomodoro-timer.ts
        word-counter.ts
      pages.ts            # homepage + legal page copy per locale (see §3.5)
    lib/
      url.ts              # helpers: localePath(lang, ...segments), toolUrl, categoryUrl, altLinks
      seo.ts              # buildHreflang(), jsonLd helpers
    layouts/
      BaseLayout.astro    # <html><head> SEO + nav + footer + slot
      ToolLayout.astro    # standard tool page chrome (uses BaseLayout)
      PageLayout.astro    # legal/simple content pages (uses BaseLayout)
    components/
      Nav.astro
      Footer.astro
      LangSwitch.astro
      Breadcrumb.astro
      ToolCard.astro
      AdSlot.astro        # renders nothing when SITE.adsenseEnabled === false
      ShareButtons.astro  # copy-link / LINE / Facebook / X
      Faq.astro           # renders <dl> + injects FAQPage JSON-LD
      RelatedTools.astro
      tools/
        RandomNumberPicker.astro
        PomodoroTimer.astro
        WordCounter.astro
    pages/
      index.astro                       # root lang redirect
      [lang]/index.astro                # homepage
      [lang]/tools/index.astro          # all tools overview
      [lang]/category/[category].astro  # category page
      [lang]/tools/[slug].astro         # individual tool (maps slug -> widget component)
      [lang]/about.astro
      [lang]/contact.astro
      [lang]/privacy.astro
      [lang]/terms.astro
      [lang]/disclaimer.astro
      sitemap.xml.ts                    # custom sitemap endpoint
    styles/global.css
  .github/workflows/deploy.yml          # build + deploy to Pages
```

## 3. Data contracts (TypeScript)

### 3.1 `src/config/site.ts`
```ts
export type Locale = 'zh' | 'en';
export const SITE = {
  url: 'https://btcson66-rgb.github.io',
  // base path WITHOUT trailing slash; keep in sync with astro.config base
  basePath: '/freetools',
  locales: ['zh', 'en'] as Locale[],
  defaultLocale: 'zh' as Locale,
  name: { zh: '免費工具箱', en: 'Free Tools Hub' },
  tagline: {
    zh: '免費線上工具大全，打開網頁即可使用，免下載 App。',
    en: 'Free online tools for everyday use. No installation required.',
  },
  adsenseClient: 'ca-pub-9117672212804270',
  adsenseEnabled: false, // Phase 1: AdSense components present but OFF
  email: 'btcson66@gmail.com',
  htmlLang: { zh: 'zh-Hant', en: 'en' } as Record<Locale,string>,
  hreflang: { zh: 'zh-TW', en: 'en' } as Record<Locale,string>,
};
```

### 3.2 `src/data/categories.ts`
7 categories, each `{ id, icon, name:{zh,en}, description:{zh,en} }`. Use these ids/icons:
- `money` 💰 — Money & Salary / 薪資與金錢
- `time` ⏱️ — Work & Time / 工作與時間
- `random` 🎲 — Random / 隨機工具
- `text` ✍️ — Text & Writing / 文字與寫作
- `image` 🖼️ — Image & File / 圖片與檔案
- `fun` 🎭 — Personality & Fun / 趣味測驗
- `study` 🎓 — Student & Teacher / 學生與老師

Provide a short bilingual description for each (1 sentence) matching the prompt's
category positioning.

### 3.3 `src/data/tools.ts`
```ts
export interface ToolMeta {
  slug: string;          // also the URL segment, e.g. 'random-number-picker'
  category: string;      // category id
  icon: string;          // emoji
  status: 'live' | 'planned';
  featured?: boolean;    // show in homepage "popular"
  isNew?: boolean;       // show in homepage "newest"
  updated?: string;      // 'YYYY-MM-DD', live tools only
}
```
Populate the FULL catalogue so homepage/category pages show the long-term vision,
but mark only these THREE as `status:'live'` (build real pages); everything else
`status:'planned'` (rendered as a non-clickable "coming soon" tile, excluded from
sitemap):

LIVE (build now):
- `random-number-picker`  category:`random` icon:🔢 featured isNew updated:2026-06-16
- `pomodoro-timer`         category:`time`   icon:🍅 featured isNew updated:2026-06-16
- `word-counter`           category:`text`   icon:📝 featured isNew updated:2026-06-16

PLANNED (data only, no page) — include a sensible spread so each category has entries.
Use the prompt's tool lists. At minimum add these slugs as planned:
random: `random-name-picker`,`random-group-generator`,`dice-roller`,`random-wheel`,`password-generator`,`color-generator`,`what-to-eat`,`this-or-that`
time: `countdown-timer`,`stopwatch`,`date-difference`,`age-calculator`,`business-days`,`break-reminder`
text: `character-counter`,`case-converter`,`remove-empty-lines`,`remove-duplicate-lines`,`sort-lines`,`json-formatter`,`base64`,`url-encoder`
money: `net-salary`,`overtime-pay`,`mortgage-payment`,`compound-interest`,`savings-goal`,`inflation`
image: `image-compressor`,`image-resizer`,`png-to-jpg`,`qr-code-generator`
fun: `mbti-test`,`love-type-test`,`work-personality-test`,`stress-level-test`
study: `random-student-picker`,`seating-chart`,`group-generator`,`grade-average`,`gpa-calculator`

Provide bilingual `name` + `short` description for EVERY tool (live and planned) —
put names/shorts in the tool's i18n file for live tools, and for planned tools a
lightweight `name:{zh,en}` + `short:{zh,en}` map is acceptable in `tools.ts` itself
(planned tools have no full content file). Choose a clean way and be consistent.

### 3.4 `src/i18n/ui.ts`
Shared chrome strings per locale: site nav labels, "All tools", "Categories",
"Popular tools", "Newest", "Why use this site", "FAQ", footer link labels
(About/Contact/Privacy/Terms/Disclaimer), button labels (Reset/Copy result/Share/
Clear/Copied!), breadcrumb home label, "Last updated", "Related tools",
"Coming soon", share labels, language switch label, and the home "why us" bullet
points (3-4 each lang: free / no install / mobile-friendly / privacy-first local
compute). Export `t(lang)` returning the locale object.

### 3.5 Per-tool content `src/i18n/tools/<slug>.ts`
Each default-exports `{ zh: ToolContent, en: ToolContent }` where:
```ts
interface ToolContent {
  name: string;
  short: string;        // 1-line, for cards + meta
  long: string;         // intro paragraph under H1
  seoTitle: string;     // <title>
  seoDescription: string;
  keywords: string[];
  instructions: string[];      // "how to use" steps
  examples: string[];          // real use cases
  faq: { q: string; a: string }[];
  labels: Record<string, string>; // tool-specific UI labels (inputs/buttons/results)
  disclaimer?: string;         // optional
}
```
Write GENUINE, non-thin bilingual content for all 3 live tools (the EN version must
be real content, not a translation of the title). FAQ: 3-5 Q&A each.

### 3.5b `src/i18n/pages.ts`
Homepage hero copy + the 5 legal pages' body content (About, Contact, Privacy,
Terms, Disclaimer) per locale. Privacy must state: all tools run locally in the
browser, no data is uploaded, no accounts; mention Google AdSense / cookies in a
forward-looking way (AdSense not yet enabled). Contact lists the email.

## 4. SEO requirements (BaseLayout)

Every page `<head>` must include, built from data:
- `<title>` and `<meta name="description">`
- `<link rel="canonical">` = absolute URL (`SITE.url` + base + path)
- hreflang alternates: one `<link rel="alternate" hreflang>` per locale + an
  `x-default` pointing at the zh (or root). Use `lib/seo.ts` helper.
- Open Graph: type, title, description, url, image (`{base}/assets/og-default.png`
  — file may not exist yet; reference it anyway), site_name, locale.
- `<meta name="twitter:card" content="summary_large_image">` + title/description.
- `<html lang>` = `SITE.htmlLang[lang]`.
- JSON-LD: `WebSite` on homepage; on each tool page `WebApplication`
  (applicationCategory by category) + `BreadcrumbList`. `Faq.astro` injects
  `FAQPage` JSON-LD when FAQ present.
- AdSense `<script>` loader is added ONLY when `SITE.adsenseEnabled === true`
  (so Phase 1 emits none). `AdSlot.astro` renders nothing while disabled.
- Mobile: `<meta name="viewport" ...>`. Content is server-rendered HTML (Astro
  static) — interactive logic is progressive enhancement only.

## 5. Standard tool page structure (ToolLayout)

In order: Breadcrumb → `<h1>` (icon + name) → intro paragraph (`long`) →
**tool interaction area** (the widget component) → AdSlot (disabled) → "How to use"
(instructions) → "Use cases" (examples) → FAQ → ShareButtons → Related tools (same
category, then fallback) → "Last updated" date → optional disclaimer. Every tool
widget exposes Reset/Clear and Copy-result behaviour per §6.

## 6. The 3 live tools — exact behaviour (vanilla JS in each widget's `<script>`)

All widgets: accessible labels, large tap targets, work with keyboard, no external
libs, read their UI strings from the `labels` passed in via `data-*` attributes or
inlined from content (your choice — keep it simple and localized).

### 6.1 RandomNumberPicker (`random-number-picker`, category random)
- Inputs: Min (default 1), Max (default 100), Count/quantity (default 1),
  "Allow duplicates" checkbox (default on), optional "Sort results" checkbox.
- Button: Generate. Also Reset.
- Logic: integer range inclusive. If duplicates off and count > (max-min+1) → show
  localized error and do not generate. Validate min ≤ max, count ≥ 1, integers.
- Output: large result area; multiple numbers comma-separated; Copy button copies
  results. Re-clicking generates a fresh set.

### 6.2 PomodoroTimer (`pomodoro-timer`, category time)
- Settings: Work minutes (default 25), Break minutes (default 5), Long break
  minutes (default 15) after every 4 work sessions (long-break optional but keep it).
- Controls: Start / Pause / Reset. Big MM:SS display. Phase label (Work/Break).
  Completed-session counter.
- On phase end: short beep via Web Audio API, auto-switch phase, increment counter
  when a work session completes. Update `document.title` with remaining time while
  running; restore on stop. Persist settings to localStorage (not timer state).
- No "Copy" needed; provide Reset. Must be robust to rapid start/pause.

### 6.3 WordCounter (`word-counter`, category text)
- Large textarea. Live (on input) stats: characters (with spaces), characters
  (no spaces), words, lines, paragraphs, sentences, estimated reading time.
- CJK-aware word count: count CJK ideographs individually AND latin words; show a
  combined sensible "words" number (document the rule in a small note). Reading time
  ~200 wpm (latin) / 300 cpm (CJK) — pick one clear rule and note it.
- Buttons: Copy stats (copies a formatted summary), Clear (empties textarea).

## 7. Styling (`src/styles/global.css`)

Port the existing PlayBox aesthetic (clean, light, card-based, mobile-first) — same
spirit as the project's current `_viral_site/assets/base.css` + `calc.css`:
CSS variables for ink/muted/line/bg/card/brand + gradient, sticky translucent nav,
`.wrap` max-width ~880px, hero, `.grid`/`.tile` cards (2-col → 1-col under 640px),
`.btn.go` gradient button, `.card`, `.faq` dl, footer, toast for "Copied!",
`.bigresult`/`.resultbox` for tool output, form rows with large inputs. Keep it a
single tidy stylesheet. Light theme only. Buttons large, results prominent and
easy to copy. Must NOT look spammy/content-farm.

## 8. Sitemap & robots

- `public/robots.txt`: `User-agent: *` / `Allow: /` / blank line /
  `Sitemap: https://btcson66-rgb.github.io/freetools/sitemap.xml`.
- `src/pages/sitemap.xml.ts`: emit XML for homepage, /tools/, each category, each
  LIVE tool, and the 5 legal pages — for BOTH locales, each `<url>` carrying
  `<xhtml:link rel="alternate" hreflang>` for zh, en and x-default. Use absolute
  URLs (SITE.url + base). Exclude planned tools.
- `public/.nojekyll` present.

## 9. GitHub Pages workflow (`.github/workflows/deploy.yml`)

Standard Astro→Pages action: trigger on push to `main` + manual dispatch;
permissions pages:write/id-token:write; jobs: build (checkout, setup-node 20+,
`npm ci` || `npm install`, `npm run build`) then deploy via
`actions/upload-pages-artifact` (path `dist`) + `actions/deploy-pages`. Add a top
comment noting the repo's Pages source must be set to "GitHub Actions" and the repo
name must be `freetools` for the `/freetools/` base to match.

## 10. Acceptance (must pass before you report done)

1. `npm install` succeeds.
2. `npm run build` completes with **zero errors**. Fix all type/build errors.
3. `dist/` contains: `index.html`, `zh/index.html`, `en/index.html`,
   `zh/tools/index.html`, `zh/category/random/index.html` (+ en),
   `zh/tools/random-number-picker/index.html`, `pomodoro-timer`, `word-counter`
   (+ all en equivalents), the 5 legal pages × 2 locales, and `sitemap.xml`.
4. No hardcoded `/freetools/` in source (all via BASE_URL/helpers). Grep to confirm.
5. No AdSense `<script>`/`<ins>` emitted in built HTML (adsenseEnabled is false).
   Grep `dist` for `adsbygoogle` → expect zero matches.
6. Every live tool page contains H1, intro, the widget, instructions, examples,
   FAQ (with FAQPage JSON-LD), related tools, last-updated, share buttons.
7. hreflang alternates present in built tool pages (grep `hreflang`).

Report: list of files created, the `npm run build` output tail, and the result of
the §10 grep checks.
```
