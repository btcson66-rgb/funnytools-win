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

function jsonLdTypes(html, pathname) {
  const types = new Set();
  for (const match of html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      const data = JSON.parse(match[1]);
      const items = Array.isArray(data) ? data : [data];
      for (const item of items) if (item?.['@type']) types.add(item['@type']);
    } catch {
      fail(`${pathname}: données JSON-LD invalides.`);
    }
  }
  return types;
}

const frenchRoutes = registry.routes.filter((route) => route.paths?.fr);
const activeBatchRoutes = registry.routes.filter(
  (route) => route.localeBatches?.[registry.activeLocale] === registry.activeLocaleBatch,
);
if (registry.activeLocale !== 'fr') {
  fail(`activeLocale must be fr during the French publication phase; found ${registry.activeLocale}.`);
}
if (activeBatchRoutes.length < 1 || activeBatchRoutes.length > registry.maxBatchSize) {
  fail(`Active French batch ${registry.activeLocaleBatch} must contain 1-${registry.maxBatchSize} routes; found ${activeBatchRoutes.length}.`);
}
if (activeBatchRoutes.some((route) => !route.paths?.fr)) {
  fail(`Active French batch ${registry.activeLocaleBatch} contains a route without a French path.`);
}

const requiredTermsByKey = {
  home: ['outils en ligne', 'sans inscription', 'navigateur', 'vérifier'],
  'grade-average': ['calcul moyenne notes', 'moyenne pondérée', 'coefficient', 'sur 20'],
  'merge-pdf': ['fusionner pdf', 'sans téléverser', 'navigateur', 'ordre'],
};

for (const route of frenchRoutes) {
  const pathname = route.paths.fr;
  const file = htmlFile(pathname);
  if (!existsSync(file)) {
    fail(`${pathname}: fichier HTML construit introuvable.`);
    continue;
  }

  const html = readFileSync(file, 'utf8');
  const text = plainText(html);
  const lower = text.toLocaleLowerCase('fr');
  const words = text.match(/[\p{L}\p{N}][\p{L}\p{N}’'/-]*/gu)?.length ?? 0;
  const h1 = html.match(/<h1\b/gi)?.length ?? 0;
  const h2 = html.match(/<h2\b/gi)?.length ?? 0;
  const canonical = attr(linkTags(html, 'canonical')[0] ?? '', 'href');
  const alternates = new Map(linkTags(html, 'alternate').map((tag) => [attr(tag, 'hreflang'), attr(tag, 'href')]));
  const robotsNoindex = /<meta\b[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html);
  const types = jsonLdTypes(html, pathname);
  const minimumWords = route.type === 'tool' ? 950 : 800;

  if (!/<html\b[^>]*lang=["']fr["']/i.test(html)) fail(`${pathname}: html lang doit être fr.`);
  if (canonical !== `${siteOrigin}${pathname}`) fail(`${pathname}: canonical incorrect ou absent.`);
  if (robotsNoindex) fail(`${pathname}: la page française publiée contient noindex.`);
  if (h1 !== 1) fail(`${pathname}: un seul H1 attendu, ${h1} trouvé(s).`);
  if (h2 < (route.type === 'tool' ? 9 : 7)) fail(`${pathname}: profondeur AEO insuffisante (${h2} H2).`);
  if (words < minimumWords) fail(`${pathname}: ${words} mots français ; minimum ${minimumWords}.`);
  if (!html.includes('data-native-locale="fr"') || !html.includes('data-editorial-mode="native-search-intent"')) {
    fail(`${pathname}: marqueurs de rédaction française native absents.`);
  }
  if (!types.has('FAQPage')) fail(`${pathname}: FAQPage JSON-LD absent.`);
  if (route.type === 'tool' && (!types.has('WebApplication') || !types.has('HowTo'))) {
    fail(`${pathname}: WebApplication ou HowTo JSON-LD absent.`);
  }
  if (route.type === 'home' && !types.has('WebSite')) fail(`${pathname}: WebSite JSON-LD absent.`);
  if (/(?:Cómo usar|Preguntas frecuentes|Usar la herramienta|What this tool can do|Use cases|Last updated|Move up|Move down)/i.test(text)) {
    fail(`${pathname}: fuite d’interface espagnole ou anglaise détectée.`);
  }
  if (/(?:lorem ipsum|coming soon|under construction|placeholder|contenu à venir)/i.test(text)) {
    fail(`${pathname}: contenu provisoire détecté.`);
  }
  for (const term of requiredTermsByKey[route.key] ?? ['outil', 'navigateur', 'vérifier']) {
    if (!lower.includes(term)) fail(`${pathname}: terme d’intention française manquant : "${term}".`);
  }
  for (const [locale, expectedPath] of Object.entries(route.paths)) {
    const hreflang = locale === 'zh' ? 'zh-TW' : locale;
    if (alternates.get(hreflang) !== `${siteOrigin}${expectedPath}`) {
      fail(`${pathname}: hreflang ${hreflang} absent ou incorrect.`);
    }
  }
  const defaultPath = route.paths.en ?? route.paths.zh;
  if (alternates.get('x-default') !== `${siteOrigin}${defaultPath}`) {
    fail(`${pathname}: x-default incorrect.`);
  }

  pages.push({ key: route.key, path: pathname, words, h2, types: [...types] });
}

for (const route of frenchRoutes) {
  for (const locale of ['zh', 'en', 'es'].filter((candidate) => route.paths[candidate])) {
    const pathname = route.paths[locale];
    const file = htmlFile(pathname);
    if (!existsSync(file)) {
      fail(`${pathname}: page réciproque ${locale} absente.`);
      continue;
    }
    const html = readFileSync(file, 'utf8');
    const alternates = new Map(linkTags(html, 'alternate').map((tag) => [attr(tag, 'hreflang'), attr(tag, 'href')]));
    if (alternates.get('fr') !== `${siteOrigin}${route.paths.fr}`) {
      fail(`${pathname}: hreflang français réciproque absent.`);
    }
  }
}

const sitemapPath = join(publicDir, 'sitemap-fr.xml');
if (!existsSync(sitemapPath)) {
  fail('public/sitemap-fr.xml est absent.');
} else {
  const xml = readFileSync(sitemapPath, 'utf8');
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]).sort();
  const expected = frenchRoutes.map((route) => `${siteOrigin}${route.paths.fr}`).sort();
  if (JSON.stringify(locs) !== JSON.stringify(expected)) {
    fail(`sitemap-fr.xml incorrect : ${expected.length} URL attendues, ${locs.length} trouvées.`);
  }
}

const summary = {
  status: failures.length ? 'FAIL' : 'PASS',
  editorialMode: 'native-search-intent',
  reviewedAt: registry.reviewedAt,
  activeBatch: registry.activeLocaleBatch,
  activeBatchRoutes: activeBatchRoutes.map((route) => route.paths.fr),
  frenchRoutes: pages,
  blockedUntilReviewed: ['hi', 'de'],
  failures,
};

console.log(JSON.stringify(summary, null, 2));
if (failures.length) process.exitCode = 1;
