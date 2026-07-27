import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const dist = join(root, 'dist');
const publicDir = join(root, 'public');
const registry = JSON.parse(readFileSync(join(root, 'src', 'i18n', 'expansion-routes.json'), 'utf8'));
const siteOrigin = 'https://funnytools.win';
const failures = [];
const pages = [];

function fail(message) {
  failures.push(message);
}

function htmlFile(pathname) {
  const clean = pathname.replace(/^\/+|\/+$/g, '');
  return clean ? join(dist, clean, 'index.html') : join(dist, 'index.html');
}

function decode(value) {
  return value
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>');
}

function plainText(html) {
  return decode(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<svg[\s\S]*?<\/svg>/gi, ' ')
      .replace(/<[^>]+>/g, ' '),
  ).replace(/\s+/g, ' ').trim();
}

function attr(tag, name) {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return tag.match(new RegExp(`${escaped}\\s*=\\s*["']([^"']*)["']`, 'i'))?.[1] ?? '';
}

function linkTags(html, rel) {
  return [...html.matchAll(/<link\b[^>]*>/gi)]
    .map((match) => match[0])
    .filter((tag) => attr(tag, 'rel').toLowerCase() === rel);
}

function jsonLdTypes(html) {
  const types = new Set();
  for (const match of html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      const data = JSON.parse(match[1]);
      const items = Array.isArray(data) ? data : [data];
      for (const item of items) {
        if (item?.['@type']) types.add(item['@type']);
      }
    } catch {
      fail('A Spanish page contains invalid JSON-LD.');
    }
  }
  return types;
}

const spanishRoutes = registry.routes.filter((route) => route.paths?.es);
const activeBatchRoutes = registry.routes.filter((route) => route.batch === registry.activeBatch);
if (activeBatchRoutes.length !== registry.maxBatchSize) {
  fail(`Active publication batch ${registry.activeBatch} must contain exactly ${registry.maxBatchSize} routes; found ${activeBatchRoutes.length}.`);
}
if (activeBatchRoutes.some((route) => !route.paths?.es)) {
  fail(`Active publication batch ${registry.activeBatch} contains a route without a Spanish path.`);
}

for (const route of spanishRoutes) {
  const pathname = route.paths.es;
  const file = htmlFile(pathname);
  if (!existsSync(file)) {
    fail(`${pathname}: missing built HTML.`);
    continue;
  }
  const html = readFileSync(file, 'utf8');
  const text = plainText(html);
  const words = text.match(/[\p{L}\p{N}][\p{L}\p{N}’'/-]*/gu)?.length ?? 0;
  const h1 = html.match(/<h1\b/gi)?.length ?? 0;
  const h2 = html.match(/<h2\b/gi)?.length ?? 0;
  const canonicalTag = linkTags(html, 'canonical')[0] ?? '';
  const canonical = attr(canonicalTag, 'href');
  const alternateTags = linkTags(html, 'alternate');
  const alternates = new Map(alternateTags.map((tag) => [attr(tag, 'hreflang'), attr(tag, 'href')]));
  const robotsNoindex = /<meta\b[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html);
  const types = jsonLdTypes(html);
  const expectedMinimum = route.type === 'tool' ? 950 : 800;
  const requiredTermsByKey = {
    home: ['herramientas', 'sin registro', 'navegador'],
    'grade-average': ['promedio de notas', 'nota media', 'media ponderada'],
    'merge-pdf': ['unir pdf', 'navegador', 'archivos'],
    'image-compressor': ['comprimir imágenes', 'reducir tamaño', 'navegador'],
    'image-resizer': ['redimensionar imagen', 'cambiar el tamaño', 'píxeles'],
    'png-to-jpg': ['png a jpg', 'transparencia', 'calidad'],
    'jpg-to-png': ['jpg a png', 'transparencia', 'calidad'],
    'qr-code-generator': ['código qr', 'generador', 'comprobar'],
    'split-pdf': ['dividir pdf', 'separar páginas', 'navegador'],
    'tools-index': ['herramientas online', 'sin registro', 'procesamiento local'],
    privacy: ['política de privacidad', 'cookies', 'google analytics'],
    'about-tools': ['procesamiento local', 'navegador', 'comprobar'],
  };
  const requiredTerms = requiredTermsByKey[route.key] ?? ['herramientas', 'navegador', 'comprobar'];

  if (!/<html\b[^>]*lang=["']es["']/i.test(html)) fail(`${pathname}: html lang must be es.`);
  if (canonical !== `${siteOrigin}${pathname}`) fail(`${pathname}: canonical mismatch (${canonical || 'missing'}).`);
  if (robotsNoindex) fail(`${pathname}: published Spanish route contains noindex.`);
  if (h1 !== 1) fail(`${pathname}: expected one H1, found ${h1}.`);
  if (h2 < (route.type === 'tool' ? 9 : 7)) fail(`${pathname}: insufficient AEO section depth (${h2} H2).`);
  if (words < expectedMinimum) fail(`${pathname}: ${words} Spanish words; minimum is ${expectedMinimum}.`);
  if (!html.includes('data-native-locale="es"') || !html.includes('data-editorial-mode="native-search-intent"')) {
    fail(`${pathname}: missing native editorial markers.`);
  }
  if (!types.has('FAQPage')) fail(`${pathname}: missing FAQPage JSON-LD.`);
  if (route.type === 'tool' && (!types.has('WebApplication') || !types.has('HowTo'))) {
    fail(`${pathname}: tool page must include WebApplication and HowTo JSON-LD.`);
  }
  if (route.type === 'home' && !types.has('WebSite')) fail(`${pathname}: homepage missing WebSite JSON-LD.`);
  if (route.key === 'tools-index' && !types.has('CollectionPage')) fail(`${pathname}: tools index missing CollectionPage JSON-LD.`);
  if (route.type === 'page' && route.key !== 'tools-index' && !types.has('WebPage')) {
    fail(`${pathname}: information page missing WebPage JSON-LD.`);
  }
  if (/(?:How to use|What this tool can do|Use cases|Last updated|Privacy & local processing|Add row|Move up|Move down)/i.test(text)) {
    fail(`${pathname}: English UI or template leakage detected.`);
  }
  if (/(?:lorem ipsum|coming soon|under construction|placeholder|contenido pendiente)/i.test(text)) {
    fail(`${pathname}: placeholder or unfinished copy detected.`);
  }
  for (const term of requiredTerms) {
    if (!text.toLocaleLowerCase('es').includes(term)) fail(`${pathname}: missing native intent term "${term}".`);
  }
  for (const [locale, expectedPath] of Object.entries(route.paths)) {
    const hreflang = locale === 'zh' ? 'zh-TW' : locale;
    if (alternates.get(hreflang) !== `${siteOrigin}${expectedPath}`) {
      fail(`${pathname}: missing or incorrect hreflang ${hreflang}.`);
    }
  }
  if (alternates.get('x-default') !== `${siteOrigin}${route.paths.en}`) {
    fail(`${pathname}: x-default must point to the English equivalent.`);
  }

  pages.push({ key: route.key, path: pathname, words, h2, types: [...types] });
}

for (const route of spanishRoutes) {
  for (const locale of ['zh', 'en']) {
    const pathname = route.paths[locale];
    const file = htmlFile(pathname);
    if (!existsSync(file)) {
      fail(`${pathname}: missing reciprocal ${locale} page.`);
      continue;
    }
    const html = readFileSync(file, 'utf8');
    const alternates = new Map(linkTags(html, 'alternate').map((tag) => [attr(tag, 'hreflang'), attr(tag, 'href')]));
    if (alternates.get('es') !== `${siteOrigin}${route.paths.es}`) {
      fail(`${pathname}: missing reciprocal Spanish hreflang.`);
    }
  }
}

const esSitemapPath = join(publicDir, 'sitemap-es.xml');
if (!existsSync(esSitemapPath)) {
  fail('public/sitemap-es.xml is missing.');
} else {
  const xml = readFileSync(esSitemapPath, 'utf8');
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  const expected = spanishRoutes.map((route) => `${siteOrigin}${route.paths.es}`).sort();
  if (JSON.stringify([...locs].sort()) !== JSON.stringify(expected)) {
    fail(`sitemap-es.xml route mismatch: expected ${expected.length}, found ${locs.length}.`);
  }
}

for (const blockedLocale of ['fr', 'de']) {
  const localeDir = join(dist, blockedLocale);
  if (existsSync(localeDir)) fail(`/${blockedLocale}/ must not publish before native editorial review.`);
}

const summary = {
  status: failures.length ? 'FAIL' : 'PASS',
  editorialMode: 'native-search-intent',
  reviewedAt: registry.reviewedAt,
  activeBatch: registry.activeBatch,
  activeBatchRoutes: activeBatchRoutes.map((route) => route.paths.es),
  spanishRoutes: pages,
  blockedUntilReviewed: ['fr', 'de'],
  failures,
};

console.log(JSON.stringify(summary, null, 2));
if (failures.length) process.exitCode = 1;
