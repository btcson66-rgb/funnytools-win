import { execFileSync } from 'node:child_process';
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { createHash, createSign } from 'node:crypto';
import { dirname, join, relative } from 'node:path';

export const rootDir = process.cwd();
export const distDir = join(rootDir, 'dist');
export const publicDir = join(rootDir, 'public');
export const scriptsDir = join(rootDir, 'scripts');
export const reportsDir = join(rootDir, 'reports');
export const siteOrigin = 'https://funnytools.win';
export const siteUrl = `${siteOrigin}/`;
export const sitemapIndexUrl = `${siteOrigin}/sitemap.xml`;
export const statePath = join(reportsDir, 'seo-indexing-state.json');
export const currentStatePath = join(reportsDir, 'current-sitemap-state.json');
export const changedUrlsPath = join(reportsDir, 'changed-urls.json');
export const priorityUrlsPath = join(scriptsDir, 'bing-priority-urls.txt');
export const gscPriorityUrlsPath = join(scriptsDir, 'gsc-priority-urls.txt');
export const indexingConfigPath = join(rootDir, 'src', 'config', 'indexing.json');
export const sitemapLastmodPath = join(rootDir, 'data', 'sitemap-lastmod.json');
// Bumped to 4 on 2026-08-16 when the shared footer's contact address joined the volatile set.
// Bumped to 3 the same day when the analytics bootstrap joined it.
// lastmodForPage treats a version change as a map migration: stored dates carry
// forward once against the new hash, so normalizing the hash never itself becomes
// a site-wide lastmod bump.
export const sitemapContentHashVersion = 6;
export const indexingConfig = readJson(indexingConfigPath, { EN_NOINDEX: false }) ?? { EN_NOINDEX: false };
export const enNoindex = indexingConfig.EN_NOINDEX === true;
export const expansionRouteRegistry = readJson(
  join(rootDir, 'src', 'i18n', 'expansion-routes.json'),
  { routes: [] },
) ?? { routes: [] };
export const expectedSitemapFiles = [
  'sitemap-tools.xml',
  'sitemap-guides.xml',
  'sitemap-workflows.xml',
  ...(!enNoindex ? ['sitemap-en.xml'] : []),
  'sitemap-es.xml',
  'sitemap-fr.xml',
];

export function ensureDir(dir) {
  mkdirSync(dir, { recursive: true });
}

export function readText(file) {
  return readFileSync(file, 'utf8');
}

export function writeText(file, value) {
  ensureDir(dirname(file));
  writeFileSync(file, value);
}

export function writeJson(file, value) {
  writeText(file, `${JSON.stringify(value, null, 2)}\n`);
}

export function readJson(file, fallback = null) {
  if (!existsSync(file)) return fallback;
  try {
    return JSON.parse(readText(file));
  } catch {
    return fallback;
  }
}

export function walk(dir, predicate, output = []) {
  if (!existsSync(dir)) return output;
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stats = statSync(full);
    if (stats.isDirectory()) {
      walk(full, predicate, output);
    } else if (predicate(full)) {
      output.push(full);
    }
  }
  return output;
}

export function routeFromHtml(file) {
  const rel = relative(distDir, file).replaceAll('\\', '/');
  if (rel === 'index.html') return '/';
  if (rel === '404.html' || rel.endsWith('/404.html')) return '/404/';
  if (rel.endsWith('/index.html')) return `/${rel.slice(0, -'index.html'.length)}`;
  return `/${rel.replace(/\.html$/, '/')}`;
}

export function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function decodeXml(value) {
  return String(value)
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");
}

export function attr(tag, name) {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return tag.match(new RegExp(`${escaped}\\s*=\\s*["']([^"']*)["']`, 'i'))?.[1]?.trim() ?? '';
}

export function parseTags(block, tagName) {
  return [...String(block).matchAll(new RegExp(`<${tagName}>([\\s\\S]*?)<\\/${tagName}>`, 'g'))]
    .map((match) => decodeXml(match[1].trim()));
}

export function normalizeSitemapUrl(value) {
  let parsed;
  try {
    parsed = new URL(value, siteOrigin);
  } catch {
    return null;
  }
  parsed.hash = '';
  if (parsed.origin !== siteOrigin) return null;
  if (parsed.search) return null;
  if (!parsed.pathname.endsWith('/')) parsed.pathname = `${parsed.pathname}/`;
  return parsed.href;
}

export function urlPath(url) {
  return new URL(url).pathname;
}

export function isExcludedPath(pathname) {
  const lower = pathname.toLowerCase();
  const parts = lower.split('/').filter(Boolean);
  return (
    lower.includes('/embed/') ||
    lower.includes('/api/') ||
    lower === '/404/' ||
    parts.includes('404') ||
    parts.includes('test') ||
    parts.includes('tests') ||
    parts.includes('dev') ||
    parts.includes('staging')
  );
}

export function isExcludedUrl(url) {
  try {
    const parsed = new URL(url);
    return parsed.hash || parsed.search.includes('utm_') || parsed.search || isExcludedPath(parsed.pathname);
  } catch {
    return true;
  }
}

export function pageMeta(html) {
  const htmlTag = (name) => new RegExp(`<${name}\\b(?:[^"'<>]|"[^"]*"|'[^']*')*>`, 'gi');
  const metaTags = [...html.matchAll(htmlTag('meta'))].map((match) => match[0]);
  const linkTags = [...html.matchAll(htmlTag('link'))].map((match) => match[0]);
  const robots = metaTags.find((tag) => attr(tag, 'name').toLowerCase() === 'robots');
  const description = metaTags.find((tag) => attr(tag, 'name').toLowerCase() === 'description');
  const canonical = linkTags.find((tag) => attr(tag, 'rel').toLowerCase() === 'canonical');
  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.replace(/\s+/g, ' ').trim() ?? '';
  const h1 = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1]?.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim() ?? '';
  return {
    noindex: robots ? /\bnoindex\b/i.test(attr(robots, 'content')) : false,
    canonical: canonical ? attr(canonical, 'href') : '',
    title,
    description: description ? attr(description, 'content') : '',
    h1,
  };
}

export function builtPages() {
  const htmlFiles = walk(distDir, (file) => file.endsWith('.html'));
  return htmlFiles.map((file) => {
    const route = routeFromHtml(file);
    const loc = `${siteOrigin}${route}`;
    const html = readText(file);
    return {
      file,
      route,
      loc,
      html,
      ...pageMeta(html),
    };
  });
}

export function isSelfCanonical(page) {
  return page.canonical === page.loc;
}

export function isIndexablePage(page) {
  return !isExcludedUrl(page.loc) && !page.noindex && Boolean(page.canonical) && isSelfCanonical(page);
}

export function classifyUrl(url) {
  const pathname = urlPath(url);
  const normalized = pathname.replace(/^\/en\//, '/');
  if (pathname.startsWith('/es/')) return 'es';
  if (pathname.startsWith('/fr/')) return 'fr';
  if (pathname.startsWith('/en/')) return 'en';
  if (/^\/tools\/[^/]+\/$/.test(normalized)) return 'tools';
  if (normalized === '/guides/' || /^\/guides\/[^/]+\/$/.test(normalized)) return 'guides';
  if (normalized === '/workflows/' || /^\/workflows\/[^/]+\/$/.test(normalized)) return 'workflows';
  return 'guides';
}

export function sitemapFileForType(type) {
  return {
    tools: 'sitemap-tools.xml',
    guides: 'sitemap-guides.xml',
    workflows: 'sitemap-workflows.xml',
    en: 'sitemap-en.xml',
    es: 'sitemap-es.xml',
    fr: 'sitemap-fr.xml',
  }[type];
}

export function parseSitemapFile(file) {
  if (!existsSync(file)) return [];
  const xml = readText(file);
  return [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((match) => {
    const block = match[1];
    return {
      loc: parseTags(block, 'loc')[0] ?? '',
      lastmod: parseTags(block, 'lastmod')[0] ?? '',
    };
  }).filter((entry) => entry.loc);
}

export function sitemapIndexChildren(file) {
  if (!existsSync(file)) return [];
  const xml = readText(file);
  return [...xml.matchAll(/<sitemap>([\s\S]*?)<\/sitemap>/g)]
    .map((match) => parseTags(match[1], 'loc')[0] ?? '')
    .filter(Boolean);
}

export function readSitemapEntries(baseDir = publicDir) {
  const indexPath = join(baseDir, 'sitemap.xml');
  const children = sitemapIndexChildren(indexPath);
  const files = children.length
    ? children.map((loc) => join(baseDir, new URL(loc).pathname.replace(/^\/+/, '')))
    : expectedSitemapFiles.map((name) => join(baseDir, name));
  return files.flatMap((file) => parseSitemapFile(file).map((entry) => ({
    ...entry,
    sitemap: relative(baseDir, file).replaceAll('\\', '/'),
  })));
}

export function readCurrentSitemapEntries() {
  const fromPublic = readSitemapEntries(publicDir);
  if (fromPublic.length) return fromPublic;
  return readSitemapEntries(distDir);
}

const gitDateCache = new Map();
const gitBlameCache = new Map();

function gitDateForPath(path) {
  if (gitDateCache.has(path)) return gitDateCache.get(path);
  let value = '';
  try {
    const timestamp = Number(execFileSync('git', ['log', '-1', '--format=%ct', '--', path], {
      cwd: rootDir,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim());
    // Sitemap dates and changed-page dates use UTC consistently. This matters
    // for commits near local midnight, where %cs can report the next local day.
    value = Number.isFinite(timestamp)
      ? new Date(timestamp * 1000).toISOString().slice(0, 10)
      : '';
  } catch {
    value = '';
  }
  gitDateCache.set(path, value);
  return value;
}

function gitBlameForPath(path) {
  if (gitBlameCache.has(path)) return gitBlameCache.get(path);
  let value = [];
  try {
    const output = execFileSync('git', ['blame', '--line-porcelain', '--', path], {
      cwd: rootDir,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
      maxBuffer: 20 * 1024 * 1024,
    });
    let authorTime = '';
    for (const line of output.split(/\r?\n/)) {
      if (line.startsWith('author-time ')) {
        const timestamp = Number(line.slice('author-time '.length));
        authorTime = Number.isFinite(timestamp)
          ? new Date(timestamp * 1000).toISOString().slice(0, 10)
          : '';
      } else if (line.startsWith('\t')) {
        value.push({ text: line.slice(1), date: authorTime });
      }
    }
  } catch {
    value = [];
  }
  gitBlameCache.set(path, value);
  return value;
}

export function sourceCandidatesForRoute(route) {
  if (route.startsWith('/es/') || route.startsWith('/fr/')) {
    const locale = route.split('/').filter(Boolean)[0];
    return [
      'src/i18n/expansion-routes.json',
      `src/i18n/expansion/${locale}.ts`,
      'src/i18n/expansionRoutes.ts',
      'src/layouts/ExpansionLayout.astro',
      'src/layouts/ExpansionToolLayout.astro',
      `src/pages${route === `/${locale}/` ? `/${locale}/index.astro` : route.replace(/\/$/, '.astro')}`,
    ];
  }
  const clean = route.replace(/^\/en\//, '/');
  const parts = clean.split('/').filter(Boolean);
  if (parts[0] === 'tools' && parts[1]) {
    return [
      'src/data/tools.ts',
      `src/i18n/tools/${parts[1]}.ts`,
      'src/i18n/tools/content-enhancements.ts',
      'src/lib/contentValue.ts',
      'src/components/ContentValueReview.astro',
      'src/layouts/ToolLayout.astro',
      'src/pages/[...locale]/tools/[slug].astro',
    ];
  }
  if (parts[0] === 'category' && parts[1]) {
    return [
      'src/data/categories.ts',
      'src/data/categoryContent.ts',
      'src/lib/contentValue.ts',
      'src/components/ContentValueReview.astro',
      'src/pages/[...locale]/category/[category].astro',
    ];
  }
  if (parts[0] === 'blog') {
    return [
      'src/data/usefulBlogPosts.ts',
      'src/data/blogRedirects.ts',
      'src/data/allBlogPosts.ts',
      'src/pages/[...locale]/blog/index.astro',
      'src/pages/[...locale]/blog/[slug].astro',
    ];
  }
  if (parts[0] === 'guides') {
    return [
      'src/data/seoGuides.ts',
      'src/data/workflows.ts',
      'src/lib/contentValue.ts',
      'src/components/ContentValueReview.astro',
      'src/pages/[...locale]/guides/index.astro',
      'src/pages/[...locale]/guides/[slug].astro',
    ];
  }
  if (parts[0] === 'workflows') {
    return [
      'src/data/workflows.ts',
      'src/data/seoGuides.ts',
      'src/lib/contentValue.ts',
      'src/components/ContentValueReview.astro',
      'src/pages/[...locale]/workflows/index.astro',
      'src/pages/[...locale]/workflows/[slug].astro',
    ];
  }
  if (parts[0] === 'for' && parts[1]) {
    return [
      'src/data/audiences.ts',
      'src/lib/contentValue.ts',
      'src/components/ContentValueReview.astro',
      'src/pages/[...locale]/for/[audience].astro',
    ];
  }
  if (parts[0] === 'education-statistics') {
    return [
      'src/pages/[...locale]/education-statistics/index.astro',
      'src/data/tools.ts',
      'src/components/ToolCard.astro',
      'src/components/Faq.astro',
    ];
  }
  const pageName = parts[0] || 'index';
  return [
    'src/i18n/pages.ts',
    `src/pages/[...locale]/${pageName}.astro`,
    pageName === 'index' ? 'src/pages/[...locale]/index.astro' : '',
  ].filter(Boolean);
}

function renderedContentDates(html) {
  return [
    ...[...html.matchAll(/["']dateModified["']\s*:\s*["'](\d{4}-\d{2}-\d{2})["']/g)]
      .map((match) => match[1]),
    html.match(/data-content-value-review[\s\S]*?<time\b[^>]*datetime=["'](\d{4}-\d{2}-\d{2})["']/i)?.[1] ?? '',
  ].filter(Boolean);
}

function routeTokens(route) {
  const pathname = new URL(route, siteOrigin).pathname;
  const parts = pathname.split('/').filter(Boolean);
  const withoutLocale = ['en', 'es', 'fr'].includes(parts[0]) ? parts.slice(1) : parts;
  const slug = withoutLocale.at(-1) ?? '';
  return [...new Set([pathname, pathname.replace(/\/$/, ''), slug].filter((token) => token.length >= 3))];
}

function pageSpecificGitDates(page) {
  const candidates = sourceCandidatesForRoute(page.route)
    .filter((candidate) => existsSync(join(rootDir, candidate)));
  const tokens = routeTokens(page.route);
  const directDates = candidates
    .filter((candidate) => {
      const normalized = candidate.replaceAll('\\', '/');
      const slug = tokens.at(-1);
      return normalized.startsWith('src/pages/es/')
        || normalized.startsWith('src/pages/fr/')
        || (slug && normalized.includes(`/${slug}.`));
    })
    .map(gitDateForPath)
    .filter(Boolean);
  const blamedDates = candidates.flatMap((candidate) =>
    gitBlameForPath(candidate)
      .filter((line) => line.date && tokens.some((token) => line.text.includes(token)))
      .map((line) => line.date),
  );
  return [...new Set([...directDates, ...blamedDates])];
}

function isBuildInstant(value, pageMtimeMs) {
  const parsed = Date.parse(value);
  return Number.isFinite(parsed) && Math.abs(parsed - pageMtimeMs) <= 10 * 60 * 1000;
}

export function stableRenderedHtml(page) {
  const pageMtimeMs = statSync(page.file).mtimeMs;
  let html = page.html ?? readText(page.file);

  // The footer counter is refreshed from analytics during releases. Its numbers
  // are operational telemetry, not a content change to every rendered page.
  html = html.replace(
    /<p\b(?=[^>]*\bclass=["'][^"']*\bsite-stats\b)[^>]*>[\s\S]*?<\/p>/gi,
    '<p data-sitemap-volatile="site-stats"></p>',
  );

  // Release version text appears in the shared footer and would otherwise bump
  // every URL even when that page's meaningful rendered content is unchanged.
  html = html.replace(/(\s\u00b7\s*v)\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.-]+)?/g, '$1<version>');

  // Tool pages also expose the same release number through WebApplication
  // structured data. A release bump is deployment metadata, not a tool edit.
  html = html.replace(
    /(["']softwareVersion["']\s*:\s*["'])\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.-]+)?(["'])/gi,
    '$1<version>$2',
  );

  // Astro content-hashed assets change names when the asset pipeline rebuilds.
  // Keep the logical asset path and extension while ignoring only the hash.
  html = html.replace(/\/_astro\/[^"'()\s<>?#]+/g, (assetUrl) =>
    assetUrl.replace(/([._-])[A-Za-z0-9_-]{8,}(\.(?:css|js|mjs|map|woff2?|ttf|png|jpe?g|webp|avif|svg))$/i, '$1<asset-hash>$2'),
  );

  // Cache-busting parameters are deployment metadata. Other query parameters
  // remain intact because they may carry page meaning.
  html = html.replace(/([?&](?:v|ver|version|cb|cachebust)=)[^&#"'\s<]+/gi, '$1<cache-key>');

  // generatedAt/build-time fields in inline JSON or scripts identify the build,
  // not a page edit. Date-only and full ISO forms are both normalized here.
  html = html.replace(
    /(["'](?:generatedAt|buildTime|buildTimestamp|buildDate)["']\s*:\s*["'])(\d{4}-\d{2}-\d{2}(?:T[^"']+)?)(["'])/gi,
    '$1<build-time>$3',
  );

  // A full ISO instant equal to this HTML file's build time is likewise build
  // metadata. The tight ten-minute comparison avoids stripping publication or
  // review timestamps that describe the content itself.
  html = html.replace(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,9})?Z/g, (value) =>
    isBuildInstant(value, pageMtimeMs) ? '<build-instant>' : value,
  );

  // The contact address in the shared footer is chrome, like the counter and the
  // version beside it. Changing it rewrites every page that renders that footer, and
  // a footer link is not what a reader came for. The same address appearing in body
  // prose — a privacy policy, a support FAQ — is left alone on purpose: there the
  // address is the content, and those pages genuinely did change.
  html = html.replace(/<footer\b[^>]*>[\s\S]*?<\/footer>/gi, (footer) =>
    footer.replace(/mailto:[^"'\s>]+/gi, 'mailto:<footer-contact>')
      .replace(/[\w.+-]+@[\w-]+\.[\w.-]+/g, '<footer-contact>'),
  );

  // The analytics bootstrap sits in the shared layout, so any change to it —
  // a new measurement id, a consent-mode tweak — rewrites the same bytes into
  // all ~500 pages. Telling Google that every page changed on the same day
  // because a tracking tag moved is a false signal, and after the worthcalc
  // impression collapse it is one the company cannot afford to send. Which
  // property receives the hits is not part of what a reader sees.
  html = html.replace(
    /<script\b[^>]*>(?:(?!<\/script>)[\s\S])*?window\.dataLayer(?:(?!<\/script>)[\s\S])*?<\/script>/gi,
    '<script data-sitemap-volatile="analytics-bootstrap"></script>',
  );

  // The Affiliate GA4 bridge is also shared layout chrome. Its minified inline
  // bundle is emitted on every indexable page, but changing the bridge must not
  // make every page look like its reader-facing content changed.
  html = html.replace(
    /\s*<script\b[^>]*>(?:(?!<\/script>)[\s\S])*?window\.__btcsonAffiliateTrack(?:(?!<\/script>)[\s\S])*?<\/script>/gi,
    '',
  );

  return html;
}

export function contentHashForPage(page) {
  return createHash('sha256').update(stableRenderedHtml(page)).digest('hex');
}

export function lastmodForPage(
  page,
  stored = null,
  today = new Date().toISOString().slice(0, 10),
  mode = 'update',
) {
  const hash = contentHashForPage(page);
  const articleDateModified = guideArticleDateModified(page);
  if (articleDateModified) {
    return { hash, lastmod: articleDateModified, hashVersion: sitemapContentHashVersion };
  }
  if (mode === 'preserve' && stored !== null && stored !== undefined) {
    return { hash, lastmod: stored.lastmod, hashVersion: sitemapContentHashVersion };
  }
  if (stored?.hash === hash && /^\d{4}-\d{2}-\d{2}$/.test(stored.lastmod ?? '')) {
    return { hash, lastmod: stored.lastmod, hashVersion: sitemapContentHashVersion };
  }
  // Hash-normalization changes are map migrations, not page edits. Carry the
  // evidence-backed date forward once while replacing the obsolete hash.
  if (stored && stored.hashVersion !== sitemapContentHashVersion) {
    return { hash, lastmod: stored.lastmod, hashVersion: sitemapContentHashVersion };
  }
  if (stored) return { hash, lastmod: today, hashVersion: sitemapContentHashVersion };

  // For a first-seen URL, prefer evidence tied to that route (a direct source
  // file or the blamed data line containing its path/slug). Shared review dates
  // remain a fallback for new URLs, never a reason to re-bump an unchanged URL.
  const pageDates = pageSpecificGitDates(page).sort();
  const contentDates = renderedContentDates(page.html ?? readText(page.file)).sort();
  const signal = pageDates.at(-1) ?? contentDates.at(-1) ?? today;
  return { hash, lastmod: signal > today ? today : signal, hashVersion: sitemapContentHashVersion };
}

function guideArticleDateModified(page) {
  if (!/^\/((?:en\/)?)guides\/[^/]+\/$/.test(page.route ?? '')) return undefined;
  for (const match of page.html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)) {
    try {
      const schema = JSON.parse(match[1]);
      if (schema?.['@type'] === 'Article' && /^\d{4}-\d{2}-\d{2}$/.test(schema.dateModified ?? '')) {
        return schema.dateModified;
      }
    } catch {
      // Ignore unrelated or malformed JSON-LD; the normal lastmod evidence
      // chain below remains the safe fallback for that page.
    }
  }
  return undefined;
}

function registryAlternates(loc) {
  const pathname = new URL(loc).pathname;
  const route = expansionRouteRegistry.routes?.find((item) =>
    Object.values(item.paths ?? {}).includes(pathname),
  );
  if (!route) return [];
  const hreflang = { zh: 'zh-TW', en: 'en', es: 'es', fr: 'fr', de: 'de', hi: 'hi' };
  const links = Object.entries(route.paths ?? {})
    .filter(([, path]) => Boolean(path))
    .map(([locale, path]) => ({
      hreflang: hreflang[locale],
      href: `${siteOrigin}${path}`,
    }));
  if (route.paths?.en) {
    links.push({ hreflang: 'x-default', href: `${siteOrigin}${route.paths.en}` });
  }
  return links;
}

// Legacy zh URLs live at the root and en URLs under /en/. Expansion routes
// use the explicit registry because native-language slugs do not mirror EN.
function alternateLocaleLinks(loc) {
  const registered = registryAlternates(loc);
  if (registered.length) return registered;
  const enPrefix = `${siteOrigin}/en/`;
  if (loc.startsWith(enPrefix) || loc === `${siteOrigin}/en/`) {
    return [
      { hreflang: 'zh-TW', href: `${siteOrigin}/${loc.slice(enPrefix.length)}` },
      { hreflang: 'en', href: loc },
      { hreflang: 'x-default', href: loc },
    ];
  }
  if (loc.startsWith(`${siteOrigin}/`)) {
    const enUrl = `${enPrefix}${loc.slice(siteOrigin.length + 1)}`;
    return [
      { hreflang: 'zh-TW', href: loc },
      { hreflang: 'en', href: enUrl },
      { hreflang: 'x-default', href: enUrl },
    ];
  }
  return [];
}

export function urlSetXml(entries, allIndexableUrls = null) {
  // Only emit hreflang alternates when the counterpart page really exists in
  // the deployed set, so zh-only or en-only pages stay alternate-free.
  const hasAlternates = allIndexableUrls instanceof Set;
  const rows = entries.map((entry) => {
    const lines = [
      '  <url>',
      `    <loc>${escapeXml(entry.loc)}</loc>`,
      `    <lastmod>${escapeXml(entry.lastmod)}</lastmod>`,
    ];
    if (hasAlternates) {
      const alternates = alternateLocaleLinks(entry.loc)
        .filter((link) => link.hreflang === 'x-default' || allIndexableUrls.has(link.href));
      const realAlternates = alternates.filter((link) => link.hreflang !== 'x-default');
      if (realAlternates.length >= 2) {
        lines.push(...alternates.map((link) =>
          `    <xhtml:link rel="alternate" hreflang="${link.hreflang}" href="${escapeXml(link.href)}" />`,
        ));
      }
    }
    lines.push('  </url>');
    return lines.join('\n');
  }).join('\n');
  const xmlnsXhtml = hasAlternates ? ' xmlns:xhtml="http://www.w3.org/1999/xhtml"' : '';
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"${xmlnsXhtml}>`,
    rows,
    '</urlset>',
    '',
  ].join('\n');
}

export function sitemapIndexXml(children) {
  const latest = children.map((child) => child.lastmod).filter(Boolean).sort().at(-1) ?? new Date().toISOString().slice(0, 10);
  const rows = children.map((child) => [
    '  <sitemap>',
    `    <loc>${escapeXml(`${siteOrigin}/${child.file}`)}</loc>`,
    `    <lastmod>${escapeXml(child.lastmod || latest)}</lastmod>`,
    '  </sitemap>',
  ].join('\n')).join('\n');
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    rows,
    '</sitemapindex>',
    '',
  ].join('\n');
}

export function previousState() {
  return readJson(statePath, { urls: {} }) ?? { urls: {} };
}

export function currentState(entries) {
  return {
    generatedAt: new Date().toISOString(),
    urls: Object.fromEntries(entries.map((entry) => [entry.loc, { lastmod: entry.lastmod, sitemap: entry.sitemap }])),
  };
}

export function diffEntries(entries, previous = previousState()) {
  const previousUrls = previous.urls ?? {};
  const added = [];
  const modified = [];
  for (const entry of entries) {
    const old = previousUrls[entry.loc];
    if (!old) added.push(entry.loc);
    else if (old.lastmod !== entry.lastmod) modified.push(entry.loc);
  }
  return { added, modified };
}

export function readPriorityUrls(...files) {
  return [...new Set(files.flatMap((file) => {
    if (!existsSync(file)) return [];
    return readText(file)
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith('#'))
      .map(normalizeSitemapUrl)
      .filter(Boolean);
  }))];
}

export function ensureDefaultPriorityFiles() {
  const defaults = [
    siteOrigin,
    `${siteOrigin}/tools/`,
    `${siteOrigin}/blog/`,
    `${siteOrigin}/category/random/`,
    `${siteOrigin}/category/pdf/`,
    `${siteOrigin}/category/image/`,
    `${siteOrigin}/tools/random-number-picker/`,
    `${siteOrigin}/tools/word-counter/`,
    `${siteOrigin}/tools/qr-code-generator/`,
    `${siteOrigin}/tools/merge-pdf/`,
  ].join('\n');
  if (!existsSync(priorityUrlsPath)) writeText(priorityUrlsPath, `${defaults}\n`);
  if (!existsSync(gscPriorityUrlsPath)) writeText(gscPriorityUrlsPath, `${defaults}\n`);
}

export function filterSubmitCandidates(urls, pages = builtPages()) {
  const byUrl = new Map(pages.map((page) => [page.loc, page]));
  const submitted = [];
  const skipped = [];
  for (const url of [...new Set(urls)]) {
    const normalized = normalizeSitemapUrl(url);
    if (!normalized || isExcludedUrl(normalized)) {
      skipped.push({ url, reason: 'excluded-url' });
      continue;
    }
    const page = byUrl.get(normalized);
    if (!page) {
      skipped.push({ url: normalized, reason: 'not-built-200' });
      continue;
    }
    if (page.noindex) {
      skipped.push({ url: normalized, reason: 'noindex' });
      continue;
    }
    if (!page.canonical || !isSelfCanonical(page)) {
      skipped.push({ url: normalized, reason: 'canonical-not-self' });
      continue;
    }
    submitted.push(normalized);
  }
  return { submitted, skipped };
}

function base64Url(input) {
  return Buffer.from(input).toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

// 2026-08-03：本機憑證檔 fallback。CI 有 GSC_SERVICE_ACCOUNT_JSON secret（2026-07-31 起
// 已設定，Actions 上實際會提交），但本機跑 `npm run release` 時沒有這個環境變數，
// 於是每次發布都印一行 `seo:gsc-sitemaps=fail`。那不是真的壞掉，卻讓「憑證缺失」
// 這個早就修好的問題在營運紀錄裡連續留了好幾週的假警報，一路被抄進週決策包。
// 本機的 service account 檔就在 repo 內（`api token/`，已在 .gitignore，未被追蹤），
// 且實測對 sc-domain:funnytools.win 是 siteFullUser，有提交 sitemap 的權限。
// CI 上這個檔不存在 → 回傳 null → 行為與過去完全相同，不影響 Actions。
const LOCAL_SERVICE_ACCOUNT_FILES = [
  process.env.GSC_SERVICE_ACCOUNT_FILE,
  join(rootDir, 'api token', 'ga4-service-account.json'),
].filter(Boolean);

function readLocalServiceAccountFile() {
  for (const path of LOCAL_SERVICE_ACCOUNT_FILES) {
    if (!existsSync(path)) continue;
    try {
      const parsed = JSON.parse(readFileSync(path, 'utf8'));
      if (parsed?.client_email && parsed?.private_key) {
        return { client_email: parsed.client_email, private_key: parsed.private_key, source: path };
      }
    } catch {
      // 壞掉的憑證檔不吞掉：往下走，最後由 missingGscCredentialVars() 具名回報
    }
  }
  return null;
}

export function getServiceAccountCredentials() {
  if (process.env.GSC_SERVICE_ACCOUNT_JSON) {
    const parsed = JSON.parse(process.env.GSC_SERVICE_ACCOUNT_JSON);
    return {
      client_email: parsed.client_email,
      private_key: parsed.private_key,
    };
  }
  if (process.env.GSC_CLIENT_EMAIL && process.env.GSC_PRIVATE_KEY) {
    return {
      client_email: process.env.GSC_CLIENT_EMAIL,
      private_key: process.env.GSC_PRIVATE_KEY.replace(/\\n/g, '\n'),
    };
  }
  return readLocalServiceAccountFile();
}

// 2026-07-25 CEO 審查（gsc-secrets 稽核修正）：紅線第 6 條要求「腳本壞掉要通知，不得
// 靜默跳過」。缺憑證時必須明確列出缺哪幾個環境變數，讓呼叫端可以據此判斷是否要
// exitCode=1（而不是猜一句籠統訊息）。
export function missingGscCredentialVars() {
  if (process.env.GSC_SERVICE_ACCOUNT_JSON) {
    try {
      const parsed = JSON.parse(process.env.GSC_SERVICE_ACCOUNT_JSON);
      const missingFields = [
        !parsed?.client_email && 'client_email',
        !parsed?.private_key && 'private_key',
      ].filter(Boolean);
      return missingFields.length
        ? [`GSC_SERVICE_ACCOUNT_JSON is set but missing JSON field(s): ${missingFields.join(', ')}`]
        : [];
    } catch {
      return ['GSC_SERVICE_ACCOUNT_JSON is set but is not valid JSON'];
    }
  }
  const missing = [
    !process.env.GSC_CLIENT_EMAIL && 'GSC_CLIENT_EMAIL',
    !process.env.GSC_PRIVATE_KEY && 'GSC_PRIVATE_KEY',
  ].filter(Boolean);
  if (missing.length === 2) {
    return [`GSC_SERVICE_ACCOUNT_JSON (or GSC_CLIENT_EMAIL + GSC_PRIVATE_KEY), or a readable service account file at one of: ${LOCAL_SERVICE_ACCOUNT_FILES.join(', ')}`];
  }
  return missing;
}

// The service account can only see sc-domain:worthcalc.win — Search Console refuses to add
// it to the other two properties at all — so sitemap submission for funnytools has been
// failing with "No Search Console property matches funnytools.win". A user OAuth refresh
// token for the backup account is siteOwner on all three, so prefer it whenever one is
// available. CI reads it from secrets; local runs read the files under "api token".
function userOAuthCredentials() {
  const fromEnv = process.env.FABLE_OPS_OAUTH_CLIENT_JSON && process.env.FABLE_OPS_REFRESH_TOKEN;
  if (fromEnv) {
    try {
      const raw = JSON.parse(process.env.FABLE_OPS_OAUTH_CLIENT_JSON);
      const client = raw.installed || raw.web || raw;
      if (client?.client_id && client?.client_secret) {
        return { ...client, refresh_token: process.env.FABLE_OPS_REFRESH_TOKEN };
      }
    } catch { /* fall through to the file path below */ }
  }
  const clientPath = join(rootDir, 'api token', 'fable-ops-oauth-client.json');
  const tokenPath = join(rootDir, 'api token', 'fable-ops-token.json');
  if (!existsSync(clientPath) || !existsSync(tokenPath)) return null;
  try {
    const raw = JSON.parse(readText(clientPath));
    const client = raw.installed || raw.web || raw;
    const { refresh_token: refreshToken } = JSON.parse(readText(tokenPath));
    if (!client?.client_id || !client?.client_secret || !refreshToken) return null;
    return { ...client, refresh_token: refreshToken };
  } catch {
    return null;
  }
}

export async function googleAccessToken(scope = 'https://www.googleapis.com/auth/webmasters') {
  const oauth = userOAuthCredentials();
  if (oauth) {
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: oauth.refresh_token,
        client_id: oauth.client_id,
        client_secret: oauth.client_secret,
      }),
    });
    const data = await response.json().catch(() => ({}));
    if (response.ok && data.access_token) return data.access_token;
    // An explicitly configured owner OAuth identity must never silently downgrade to a
    // different service account. That fallback hid the real identity drift in CI and made
    // a valid refresh-token failure look like a Search Console property mismatch.
    throw new Error(
      `Configured user OAuth refresh failed (${response.status} ${data.error_description || data.error || 'unknown error'}). `
      + 'Refresh FABLE_OPS_OAUTH_CLIENT_JSON and FABLE_OPS_REFRESH_TOKEN together.',
    );
  }
  const credentials = getServiceAccountCredentials();
  if (!credentials?.client_email || !credentials?.private_key) {
    const missing = missingGscCredentialVars();
    throw new Error(`Missing GSC service account credentials. Set the following environment variable(s)/secret(s): ${missing.join(', ')}.`);
  }
  const now = Math.floor(Date.now() / 1000);
  const header = base64Url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claim = base64Url(JSON.stringify({
    iss: credentials.client_email,
    scope,
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
  }));
  const signature = createSign('RSA-SHA256').update(`${header}.${claim}`).sign(credentials.private_key, 'base64')
    .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  const assertion = `${header}.${claim}.${signature}`;
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion,
    }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(`Google OAuth failed: ${response.status} ${data.error_description || data.error || ''}`.trim());
  }
  return data.access_token;
}

// 2026-08-01（CEO 派工，任務 C）：GSC service account 在 Search Console 裡實際擁有
// 的是 domain property（`sc-domain:funnytools.win`），不是 URL-prefix property
// （`https://funnytools.win/`）。舊版把 `siteUrl`（= siteOrigin + '/'）直接當
// Search Console property 用，sites.list 回來的清單裡根本沒有這個字串，一律
// 403 "User does not have sufficient permission"。這支函式改成先呼叫
// sites.list，依序嘗試 sc-domain 與 URL-prefix 兩種形式，都對不上就明確失敗並把
// 這個 service account 實際可用的 property 清單印進錯誤訊息，避免下次換站/換憑證
// 又踩同一個坑（紅線第 6 條：壞掉要通知，不得靜默跳過或用錯 ID 硬送出去）。
export async function resolveGscSiteUrl(token) {
  const hostname = new URL(siteOrigin).hostname;
  const candidates = [`sc-domain:${hostname}`, `${siteOrigin}/`];
  const { response, json } = await fetchJson('https://www.googleapis.com/webmasters/v3/sites', {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) {
    throw new Error(`Google Search Console sites.list failed: ${response.status} ${JSON.stringify(json).slice(0, 500)}`);
  }
  const available = (json?.siteEntry ?? []).map((entry) => entry.siteUrl);
  const matched = candidates.find((candidate) => available.includes(candidate));
  if (!matched) {
    throw new Error(
      `No Search Console property matches ${hostname}. Tried: ${candidates.join(', ')}. `
      + `Properties this service account can actually access: ${available.length ? available.join(', ') : '(none)'}. `
      + 'Grant the service account access to the right property in Search Console, or fix the expected property id.',
    );
  }
  return matched;
}

export async function fetchJson(url, options = {}) {
  const response = await fetch(url, options);
  const text = await response.text();
  let json = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    json = { raw: text };
  }
  return { response, json, text };
}
