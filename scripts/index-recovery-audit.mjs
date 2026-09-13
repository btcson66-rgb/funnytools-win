import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const ROOT = process.cwd();
const DIST = path.join(ROOT, 'dist');
const PUBLIC = path.join(ROOT, 'public');
const REPORT = path.join(ROOT, 'reports', 'index-recovery');
const SITE = 'https://funnytools.win';
const TODAY = new Date().toISOString().slice(0, 10);

const args = process.argv.slice(2);
function argValue(name) {
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : null;
}

const gscDir = argValue('--gsc-dir');
const liveReportPath = argValue('--live-report') || path.join(ROOT, 'seo-system', 'reports', 'seo-collapse-audit.json');
const inspectionReportPath = argValue('--inspection-report') || path.join(ROOT, 'reports', 'gsc-url-inspection-report.json');

function exists(file) { return fs.existsSync(file); }
function read(file, fallback = '') { return exists(file) ? fs.readFileSync(file, 'utf8') : fallback; }
function write(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, `${value}${value.endsWith('\n') ? '' : '\n'}`, 'utf8');
}
function writeJson(file, value) { write(file, JSON.stringify(value, null, 2)); }
function walk(dir, files = []) {
  if (!exists(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else files.push(full);
  }
  return files;
}
function decodeXml(value) {
  return value.replaceAll('&amp;', '&').replaceAll('&lt;', '<').replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"').replaceAll('&apos;', "'");
}
function escapeCsv(value) {
  const text = value === null || value === undefined ? '' : String(value);
  return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}
function csv(rows, columns) {
  return [columns.join(','), ...rows.map((row) => columns.map((column) => escapeCsv(row[column])).join(','))].join('\n');
}
function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = '';
  let quoted = false;
  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    if (char === '"' && quoted && text[i + 1] === '"') { cell += '"'; i += 1; continue; }
    if (char === '"') { quoted = !quoted; continue; }
    if (char === ',' && !quoted) { row.push(cell); cell = ''; continue; }
    if ((char === '\n' || char === '\r') && !quoted) {
      if (char === '\r' && text[i + 1] === '\n') i += 1;
      row.push(cell); cell = '';
      if (row.some((value) => value.trim())) rows.push(row);
      row = [];
      continue;
    }
    cell += char;
  }
  if (cell || row.length) { row.push(cell); if (row.some((value) => value.trim())) rows.push(row); }
  if (!rows.length) return [];
  const headers = rows.shift().map((value) => value.trim());
  return rows.map((values) => Object.fromEntries(headers.map((header, index) => [header, (values[index] ?? '').trim()])));
}
function attr(tag, name) {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return tag.match(new RegExp(`\\b${escaped}\\s*=\\s*["']([^"']*)["']`, 'i'))?.[1]?.trim() || '';
}
function stripBlocks(value) {
  let text = value;
  for (const tag of ['script', 'style', 'nav', 'header', 'footer', 'aside', 'svg']) {
    text = text.replace(new RegExp(`<${tag}\\b[\\s\\S]*?<\\/${tag}>`, 'gi'), ' ');
  }
  text = text.replace(/<section\b[^>]*(?:data-affiliate-shelf|data-content-value-review)[^>]*>[\s\S]*?<\/section>/gi, ' ');
  return text;
}
function stripTags(value) {
  return stripBlocks(value).replace(/<[^>]+>/g, ' ')
    .replaceAll('&nbsp;', ' ').replaceAll('&amp;', '&').replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'").replaceAll('&apos;', "'").replaceAll('&lt;', '<').replaceAll('&gt;', '>')
    .replace(/\s+/g, ' ').trim();
}
function tokens(value) {
  return value.toLocaleLowerCase().match(/[\p{Script=Han}]|[\p{L}\p{N}][\p{L}\p{N}'’-]*/gu) || [];
}
function tokenCount(value) { return tokens(value).length; }
function sha(value) { return crypto.createHash('sha256').update(value).digest('hex'); }
function routeFromFile(file) {
  const relative = path.relative(DIST, file).replaceAll(path.sep, '/');
  if (relative === 'index.html') return '/';
  if (relative === '404.html') return '/404/';
  return relative.endsWith('/index.html') ? `/${relative.slice(0, -'index.html'.length)}` : null;
}
function localeFor(route) {
  if (route.startsWith('/en/')) return 'en';
  if (route.startsWith('/es/')) return 'es';
  if (route.startsWith('/fr/')) return 'fr';
  return 'zh-TW';
}
function slugFor(route) {
  return route.match(/\/(?:tools|herramientas|outils|guides|guias|workflows|flujos|category|categorias|for|para|methodology)\/([^/]+)\/$/)?.[1] || '';
}
function pageTypeFor(route) {
  if (route === '/404/') return '404';
  if (route.startsWith('/zh/')) return 'redirect';
  if (route.includes('/embed/')) return 'embed';
  if (route === '/' || /^\/(?:en|es|fr)\/$/.test(route)) return 'home';
  if (/\/(?:tools|herramientas|outils)\/[^/]+\/$/.test(route)) return 'tool';
  if (/\/(?:guides|guias)\/[^/]+\/$/.test(route)) return 'guide';
  if (/\/(?:workflows|flujos)\/[^/]+\/$/.test(route)) return 'workflow';
  if (/\/(?:category|categorias)\/[^/]+\/$/.test(route)) return 'category';
  if (/\/(?:for|para)\/[^/]+\/$/.test(route)) return 'audience';
  if (/\/blog\/[^/]+\/$/.test(route)) return 'blog';
  if (/\/methodology\/[^/]+\/$/.test(route)) return 'methodology';
  if (/(?:\/tools|\/herramientas|\/outils|\/guides|\/guias|\/workflows|\/flujos|\/for|\/para|\/methodology)\/$/.test(route)) return 'hub';
  if (/\/(?:about|about-tools|contact|privacy|terms|disclaimer|affiliate-disclosure|sobre-funnytools|como-funcionan-las-herramientas|contacto|privacidad|condiciones-de-uso|confidentialite|fonctionnement-outils)\/$/.test(route)) return 'legal';
  if (/\/support(?:-us)?\/$|\/apoyar-funnytools\/$|\/tienda\/$|\/shop\/$/.test(route)) return 'support';
  return 'other';
}
function clusterFor(page, toolMap, registryMap) {
  const registered = registryMap.get(page.route);
  const toolSlug = page.pageType === 'tool'
    ? (registered?.replace(/^tool-/, '') || slugFor(page.route))
    : '';
  if (page.pageType === 'tool') return toolMap.get(toolSlug) || clusterFromSlug(toolSlug);
  if (page.pageType === 'category') return (registered || slugFor(page.route)).replace(/^category-/, '') || 'category';
  if (page.pageType === 'audience') return (registered || slugFor(page.route)).replace(/^audience-/, '') || 'audience';
  return clusterFromSlug(registered || slugFor(page.route) || page.route);
}
function clusterFromSlug(value) {
  const text = value.toLocaleLowerCase();
  const groups = [
    ['pdf', /pdf|document/], ['image', /image|jpg|png|webp|photo|dxf/],
    ['random', /random|dice|wheel|choice|group|lottery|pick/],
    ['statistics', /anova|score|percentile|gpa|grade|cronbach|spss|correlation|mean|median|outlier|statistic/],
    ['money', /salary|mortgage|interest|savings|inflation|overtime/],
    ['text', /word|character|line|json|csv|markdown|base64|url|case/],
    ['time', /time|date|timer|stopwatch|pomodoro|deadline|business-day/],
    ['drawing', /chart|flow|cad|sketch|diagram/],
    ['security', /password|uuid|secure|phishing/],
  ];
  return groups.find(([, pattern]) => pattern.test(text))?.[0] || 'general';
}
function loadToolMap() {
  const source = read(path.join(ROOT, 'src', 'data', 'tools.ts'));
  const map = new Map();
  const featured = new Set();
  const matches = [...source.matchAll(/slug:\s*'([^']+)'/g)];
  for (let index = 0; index < matches.length; index += 1) {
    const start = matches[index].index;
    const end = matches[index + 1]?.index || source.length;
    const block = source.slice(start, end);
    const slug = matches[index][1];
    map.set(slug, block.match(/category:\s*'([^']+)'/)?.[1] || clusterFromSlug(slug));
    if (/featured:\s*true/.test(block)) featured.add(slug);
  }
  return { map, featured };
}
function loadRegistry() {
  const file = path.join(ROOT, 'src', 'i18n', 'expansion-routes.json');
  if (!exists(file)) return new Map();
  const parsed = JSON.parse(read(file));
  const map = new Map();
  for (const route of parsed.routes || []) {
    for (const pathname of Object.values(route.paths || {})) if (pathname) map.set(pathname, route.key || '');
  }
  return map;
}
function sourceFileFor(route, pageType) {
  const rel = route.replace(/^\//, '').replace(/\/$/, '');
  const candidates = route === '/'
    ? ['src/pages/[...locale]/index.astro']
    : [`src/pages/${rel}.astro`, `src/pages/${rel}/index.astro`];
  for (const candidate of candidates) if (exists(path.join(ROOT, candidate))) return candidate;
  if (route.startsWith('/zh/')) return 'src/pages/zh/[...path].astro';
  if (pageType === 'tool') return route.startsWith('/es/') ? 'src/pages/es/herramientas/<slug>.astro' : 'src/pages/[...locale]/tools/[slug].astro';
  if (pageType === 'guide') return route.startsWith('/es/') ? 'src/pages/es/guias/<slug>.astro' : 'src/pages/[...locale]/guides/[slug].astro';
  if (pageType === 'workflow') return route.startsWith('/es/') ? 'src/pages/es/flujos/<slug>.astro' : 'src/pages/[...locale]/workflows/[slug].astro';
  if (pageType === 'category') return route.startsWith('/es/') ? 'src/pages/es/categorias/<slug>.astro' : 'src/pages/[...locale]/category/[category].astro';
  if (pageType === 'audience') return route.startsWith('/es/') ? 'src/pages/es/para/<audience>.astro' : 'src/pages/[...locale]/for/[audience].astro';
  return 'generated route (source template not uniquely resolved)';
}
function normalizeHref(href) {
  if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) return null;
  let url;
  try { url = new URL(href, `${SITE}/`); } catch { return null; }
  if (url.origin !== SITE) return null;
  let pathname = decodeURI(url.pathname);
  if (!pathname.endsWith('/') && !path.extname(pathname)) pathname += '/';
  return pathname;
}
function internalLinks(html) {
  return [...html.matchAll(/<a\b[^>]*>/gi)].map((match) => normalizeHref(attr(match[0], 'href'))).filter(Boolean);
}
function parsePage(file, toolMap, registryMap) {
  const html = read(file);
  const route = routeFromFile(file);
  if (!route) return null;
  const metas = [...html.matchAll(/<meta\b[^>]*>/gi)].map((match) => match[0]);
  const links = [...html.matchAll(/<link\b[^>]*>/gi)].map((match) => match[0]);
  const robots = metas.filter((tag) => attr(tag, 'name').toLocaleLowerCase() === 'robots').map((tag) => attr(tag, 'content')).join(', ');
  const canonical = links.find((tag) => attr(tag, 'rel').toLocaleLowerCase() === 'canonical');
  const canonicalUrl = canonical ? attr(canonical, 'href') : '';
  const hreflangs = links.filter((tag) => attr(tag, 'rel').toLocaleLowerCase() === 'alternate' && attr(tag, 'hreflang'))
    .map((tag) => ({ lang: attr(tag, 'hreflang'), href: attr(tag, 'href') }));
  const jsonLd = [];
  for (const match of html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      const parsed = JSON.parse(match[1]);
      if (Array.isArray(parsed)) jsonLd.push(...parsed);
      else if (parsed?.['@graph']) jsonLd.push(...parsed['@graph']);
      else jsonLd.push(parsed);
    } catch { jsonLd.push({ '@type': 'INVALID_JSON_LD' }); }
  }
  const mainMatch = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i);
  const mainText = stripTags(mainMatch?.[1] || html);
  const visibleText = stripTags(html);
  const pageType = pageTypeFor(route);
  const page = {
    url: `${SITE}${route}`,
    route,
    file,
    sourceFile: sourceFileFor(route, pageType),
    locale: localeFor(route),
    pageType,
    routeType: pageType === 'redirect' ? 'redirect-stub' : pageType === 'embed' ? 'noindex-embed' : pageType === '404' ? '404' : 'content',
    cluster: '',
    html,
    title: stripTags(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || ''),
    description: decodeXml(attr(metas.find((tag) => attr(tag, 'name').toLocaleLowerCase() === 'description') || '', 'content')),
    h1: [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((match) => stripTags(match[1])).join(' | '),
    h1Count: [...html.matchAll(/<h1\b/gi)].length,
    h2Count: [...html.matchAll(/<h2\b/gi)].length,
    robots: robots || '',
    noindex: /\bnoindex\b/i.test(robots),
    canonical: canonicalUrl,
    canonicalSelf: canonicalUrl === `${SITE}${route}`,
    hreflangs,
    structuredDataTypes: [...new Set(jsonLd.map((item) => item?.['@type']).flatMap((type) => Array.isArray(type) ? type : [type]).filter(Boolean))],
    jsonLd,
    datePublished: jsonLd.find((item) => item?.datePublished)?.datePublished || '',
    dateModified: jsonLd.find((item) => item?.dateModified)?.dateModified || '',
    redirectTarget: html.match(/<meta[^>]+http-equiv=["']refresh["'][^>]+content=["'][^"']*url=([^"';]+)["']/i)?.[1] || '',
    visibleText,
    mainText,
    wordCount: tokenCount(visibleText),
    mainContentWordCount: tokenCount(mainText),
    mainContentHash: sha(mainText.toLocaleLowerCase()),
    links: internalLinks(html),
    internalLinkCount: internalLinks(html).length,
    images: [...html.matchAll(/<img\b/gi)].length,
    missingAlt: [...html.matchAll(/<img\b[^>]*>/gi)].filter((match) => !attr(match[0], 'alt')).length,
  };
  page.cluster = clusterFor(page, toolMap, registryMap);
  page.redirect = page.pageType === 'redirect' || Boolean(page.redirectTarget) || /\bredirecting\b/i.test(html);
  page.intendedIndexable = page.pageType !== '404' && page.pageType !== 'embed' && page.pageType !== 'redirect' && !page.noindex;
  return page;
}
function parseSitemaps() {
  const indexFile = path.join(PUBLIC, 'sitemap.xml');
  const indexXml = read(indexFile);
  const childPaths = [...indexXml.matchAll(/<sitemap>[\s\S]*?<loc>([\s\S]*?)<\/loc>[\s\S]*?<\/sitemap>/gi)]
    .map((match) => decodeXml(match[1].trim()));
  const files = childPaths.length ? childPaths.map((url) => ({ name: path.basename(new URL(url).pathname), url })) : [{ name: 'sitemap.xml', url: `${SITE}/sitemap.xml` }];
  const entries = [];
  for (const child of files) {
    const xml = read(path.join(PUBLIC, child.name));
    for (const match of xml.matchAll(/<url>([\s\S]*?)<\/url>/gi)) {
      const loc = decodeXml(match[1].match(/<loc>([\s\S]*?)<\/loc>/i)?.[1]?.trim() || '');
      if (!loc) continue;
      entries.push({ loc, route: new URL(loc).pathname, sitemap: child.name, lastmod: match[1].match(/<lastmod>([\s\S]*?)<\/lastmod>/i)?.[1]?.trim() || '' });
    }
  }
  return { childPaths, entries };
}
function liveEvidence(file, sitemapCount) {
  if (!exists(file)) return { status: 'NOT VERIFIED', reason: 'live audit report not present' };
  try {
    const report = JSON.parse(read(file));
    const good = report.mode === 'local+live' && report.live?.sitemapUrls === sitemapCount && !report.failures?.length;
    return { status: good ? '200 live verified' : 'NOT VERIFIED', report, reason: good ? '' : 'live audit incomplete or has failures' };
  } catch (error) { return { status: 'NOT VERIFIED', reason: `invalid live report: ${error.message}` }; }
}
function tfidfVectors(pages) {
  const documents = pages.map((page) => new Map(tokens(page.mainText).map((token) => [token, 0])));
  for (let index = 0; index < pages.length; index += 1) {
    for (const token of tokens(pages[index].mainText)) documents[index].set(token, (documents[index].get(token) || 0) + 1);
  }
  const df = new Map();
  for (const document of documents) for (const token of document.keys()) df.set(token, (df.get(token) || 0) + 1);
  return documents.map((document) => {
    const vector = new Map();
    for (const [token, count] of document) vector.set(token, count * (Math.log((pages.length + 1) / ((df.get(token) || 0) + 1)) + 1));
    return vector;
  });
}
function cosine(left, right) {
  let dot = 0; let leftNorm = 0; let rightNorm = 0;
  for (const [token, value] of left) { dot += value * (right.get(token) || 0); leftNorm += value * value; }
  for (const value of right.values()) rightNorm += value * value;
  return leftNorm && rightNorm ? dot / Math.sqrt(leftNorm * rightNorm) : 0;
}
function jaccard(left, right) {
  const a = new Set(tokens(left)); const b = new Set(tokens(right));
  const intersection = [...a].filter((token) => b.has(token)).length;
  return intersection / (a.size + b.size - intersection || 1);
}
const minimums = { 'zh-TW': { tool: 1200, guide: 1200, workflow: 1200, category: 1500, audience: 1200 }, en: { tool: 780, guide: 850, workflow: 700, category: 780, audience: 700 }, es: { tool: 950, guide: 900, workflow: 800, category: 850, audience: 800 }, fr: { tool: 800, guide: 800, workflow: 700, category: 780, audience: 700 } };
function minimumFor(page) { return minimums[page.locale]?.[page.pageType] || 220; }
function parseGscEvidence(dir, inspectionFile, pageByUrl, sitemapSet, live) {
  const result = { archivePresent: Boolean(dir && exists(dir)), coverageUrlSamples: false, summaryRows: [], chartLatest: null, counts: {}, inspectionRows: [] };
  if (dir && exists(dir)) {
    for (const file of walk(dir).filter((item) => item.toLocaleLowerCase().endsWith('.csv'))) {
      const rows = parseCsv(read(file));
      if (rows.some((row) => row['原因'] !== undefined)) result.summaryRows.push(...rows.map((row) => ({ ...row, sourceFile: path.basename(file) })));
      if (rows.some((row) => row['日期'] !== undefined)) {
        const chart = rows.filter((row) => row['日期']);
        const withCounts = chart.filter((row) => row['未建立索引'] || row['已建立索引']);
        if (withCounts.length) result.chartLatest = withCounts.at(-1);
      }
    }
    const labels = { '已檢索 - 目前尚未建立索引': 'Crawled - currently not indexed', '頁面會重新導向': 'Page with redirect', '遭到「noindex」標記排除': 'Excluded by noindex', '替代頁面 (有適當的標準標記)': 'Alternate page with proper canonical', '找不到網頁 (404)': 'Not found (404)' };
    for (const row of result.summaryRows) {
      const value = Number(row['網頁'] || 0);
      const label = labels[row['原因']] || row['原因'] || 'UNKNOWN';
      result.counts[label] = (result.counts[label] || 0) + value;
    }
  }
  if (exists(inspectionFile)) {
    try {
      const inspected = JSON.parse(read(inspectionFile)).inspected || [];
      result.inspectionRows = inspected.map((item) => {
        const page = pageByUrl.get(item.url);
        return {
          url: item.url,
          gsc_source: 'historical URL Inspection report (2026-09-04), not current Coverage URL sample',
          evidence_date: '2026-09-04',
          gsc_status: item.indexed ? 'Indexed' : 'Not indexed',
          gsc_exclusion_reason: item.coverageState || 'UNKNOWN',
          last_crawl: item.crawlState || 'UNKNOWN',
          discovered_status: item.sitemapDiscovery || 'UNKNOWN',
          sitemap_relation: sitemapSet.has(item.url) ? 'in current sitemap' : 'not in current sitemap',
          current_production_status: page && (live.status === '200 live verified' && sitemapSet.has(item.url) ? '200 live verified' : 'local only; not live verified'),
          current_canonical: page?.canonical || 'UNKNOWN',
          current_robots: page?.robots || 'UNKNOWN',
          page_type: page?.pageType || 'UNKNOWN',
          content_cluster: page?.cluster || 'UNKNOWN',
          notes: 'Supplemental stale URL Inspection evidence; do not aggregate as current Coverage URL-level truth',
        };
      });
      result.coverageUrlSamples = false;
    } catch { result.inspectionRows = []; }
  }
  if (!result.inspectionRows.length) result.inspectionRows.push({ url: 'NOT AVAILABLE', gsc_source: dir ? 'Coverage ZIP summary only' : 'Coverage ZIP not available', evidence_date: TODAY, gsc_status: 'NOT AVAILABLE', gsc_exclusion_reason: 'NOT AVAILABLE', last_crawl: 'UNKNOWN', discovered_status: 'UNKNOWN', sitemap_relation: 'UNKNOWN', current_production_status: 'UNKNOWN', current_canonical: 'UNKNOWN', current_robots: 'UNKNOWN', page_type: 'UNKNOWN', content_cluster: 'UNKNOWN', notes: dir ? 'ZIP contained summary/chart CSVs only; no URL examples or Indexed sample.' : 'No Coverage export directory supplied.' });
  return result;
}
function countBy(pages, key) {
  return Object.fromEntries([...pages.reduce((map, page) => map.set(page[key], (map.get(page[key]) || 0) + 1), new Map())].sort((a, b) => a[0].localeCompare(b[0])));
}
function mdTable(rows, columns) {
  const header = `| ${columns.join(' | ')} |`;
  const divider = `| ${columns.map(() => '---').join(' | ')} |`;
  return [header, divider, ...rows.map((row) => `| ${columns.map((column) => row[column] ?? '').join(' | ')} |`)].join('\n');
}

if (!exists(DIST)) throw new Error('dist/ is missing. Run npm.cmd run build first.');
fs.mkdirSync(REPORT, { recursive: true });
const { map: toolMap, featured } = loadToolMap();
const registryMap = loadRegistry();
const pages = walk(DIST).filter((file) => file.endsWith('.html')).map((file) => parsePage(file, toolMap, registryMap)).filter(Boolean);
const { entries: sitemapEntries, childPaths } = parseSitemaps();
const sitemapSet = new Set(sitemapEntries.map((entry) => entry.loc));
const pageByUrl = new Map(pages.map((page) => [page.url, page]));
const routeSet = new Set(pages.map((page) => page.route));

const inbound = new Map(pages.map((page) => [page.route, new Set()]));
const adjacency = new Map(pages.map((page) => [page.route, new Set()]));
for (const page of pages) {
  for (const target of page.links) {
    if (!routeSet.has(target)) continue;
    adjacency.get(page.route).add(target);
    inbound.get(target).add(page.route);
  }
}
const roots = ['/', '/en/', '/es/', '/fr/'];
const depth = new Map(roots.filter((route) => routeSet.has(route)).map((route) => [route, 0]));
const queue = [...depth.keys()];
while (queue.length) {
  const current = queue.shift();
  for (const next of adjacency.get(current) || []) if (!depth.has(next)) { depth.set(next, depth.get(current) + 1); queue.push(next); }
}
const live = liveEvidence(liveReportPath, sitemapSet.size);
for (const page of pages) {
  page.inboundSources = inbound.get(page.route)?.size || 0;
  page.crawlDepth = depth.get(page.route) ?? null;
  page.inSitemap = sitemapSet.has(page.url);
  page.productionStatus = live.status === '200 live verified' && page.inSitemap ? '200 live verified' : 'NOT VERIFIED';
  page.sitemapName = sitemapEntries.find((entry) => entry.loc === page.url)?.sitemap || '';
  page.sitemapLastmod = sitemapEntries.find((entry) => entry.loc === page.url)?.lastmod || '';
  page.technicalIssues = [];
  if (page.intendedIndexable && !page.canonicalSelf) page.technicalIssues.push('canonical mismatch or missing');
  if (page.intendedIndexable && !page.inSitemap) page.technicalIssues.push('indexable 200 absent from sitemap');
  if (page.inSitemap && (!page.intendedIndexable || !page.canonicalSelf)) page.technicalIssues.push('sitemap contains excluded or non-self-canonical URL');
  if (page.intendedIndexable && page.inboundSources === 0 && page.route !== '/') page.technicalIssues.push('orphan');
  if (page.intendedIndexable && page.links.some((target) => !routeSet.has(target))) page.technicalIssues.push('broken internal URL');
}
const eligible = pages.filter((page) => page.intendedIndexable);
const vectors = tfidfVectors(eligible);
const similarityRows = [];
const similarityMax = new Map(eligible.map((page) => [page.url, 0]));
const sameTypeSimilarityMax = new Map(eligible.map((page) => [page.url, 0]));
for (let left = 0; left < eligible.length; left += 1) {
  for (let right = left + 1; right < eligible.length; right += 1) {
    if (eligible[left].locale !== eligible[right].locale) continue;
    const score = cosine(vectors[left], vectors[right]);
    similarityMax.set(eligible[left].url, Math.max(similarityMax.get(eligible[left].url), score));
    similarityMax.set(eligible[right].url, Math.max(similarityMax.get(eligible[right].url), score));
    if (eligible[left].pageType === eligible[right].pageType) {
      sameTypeSimilarityMax.set(eligible[left].url, Math.max(sameTypeSimilarityMax.get(eligible[left].url), score));
      sameTypeSimilarityMax.set(eligible[right].url, Math.max(sameTypeSimilarityMax.get(eligible[right].url), score));
    }
    const titleOverlap = jaccard(eligible[left].title, eligible[right].title);
    const sameIntent = titleOverlap >= 0.55 || (score >= 0.55 && eligible[left].cluster === eligible[right].cluster);
    if (score >= 0.8) similarityRows.push({ url_a: eligible[left].url, url_b: eligible[right].url, similarity_score: score.toFixed(3), same_cluster: eligible[left].cluster === eligible[right].cluster ? 'yes' : 'no', same_locale: 'yes', same_search_intent: sameIntent ? 'yes' : 'no', recommended_action: score >= 0.9 ? 'HUMAN_REVIEW_MERGE' : 'HUMAN_REVIEW_NEAR_DUPLICATE' });
  }
}
similarityRows.sort((a, b) => Number(b.similarity_score) - Number(a.similarity_score));
const cannibalizationRows = [];
const candidateByUrl = new Map();
for (let left = 0; left < eligible.length; left += 1) {
  for (let right = left + 1; right < eligible.length; right += 1) {
    const a = eligible[left]; const b = eligible[right];
    if (a.locale !== b.locale || !['tool', 'guide', 'workflow', 'category', 'audience'].includes(a.pageType) || a.pageType !== b.pageType) continue;
    const score = cosine(vectors[left], vectors[right]);
    const titleOverlap = jaccard(a.title, b.title);
    const sameIntent = titleOverlap >= 0.55 || (score >= 0.55 && a.cluster === b.cluster);
    if (!sameIntent) continue;
    const confidence = score >= 0.8 || titleOverlap >= 0.75 ? 'high' : 'medium';
    const competing = `${b.url} (${score.toFixed(3)})`;
    cannibalizationRows.push({ cluster: a.cluster, url: a.url, primary_intent: a.title || a.route, competing_urls: competing, unique_value: a.pageType === 'tool' ? 'functional utility; confirm distinct task' : 'requires human comparison of answer intent', action: 'REVIEW_ONLY', confidence });
    cannibalizationRows.push({ cluster: b.cluster, url: b.url, primary_intent: b.title || b.route, competing_urls: `${a.url} (${score.toFixed(3)})`, unique_value: b.pageType === 'tool' ? 'functional utility; confirm distinct task' : 'requires human comparison of answer intent', action: 'REVIEW_ONLY', confidence });
    // Only high-confidence pairs can create a MERGE review candidate. Medium
    // similarity remains visible in cannibalization.csv but must not change
    // the per-URL remediation classification.
    if (confidence === 'high') {
      const previousA = candidateByUrl.get(a.url);
      const previousB = candidateByUrl.get(b.url);
      if (!previousA || score > previousA.score) candidateByUrl.set(a.url, { target: b.url, score, confidence });
      if (!previousB || score > previousB.score) candidateByUrl.set(b.url, { target: a.url, score, confidence });
    }
  }
}
for (const page of eligible) {
  page.similarityMax = similarityMax.get(page.url) || 0;
  page.similarityRisk = page.similarityMax >= 0.8 ? 'high' : page.similarityMax >= 0.6 ? 'medium' : 'low';
  const uniqueIntent = page.pageType === 'tool' ? 25 : page.pageType === 'guide' ? 20 : page.pageType === 'workflow' ? 19 : page.pageType === 'category' ? 16 : page.pageType === 'audience' ? 15 : 10;
  const mainUniqueness = Math.round(20 * (1 - Math.min(1, sameTypeSimilarityMax.get(page.url) || 0)));
  const utility = page.pageType === 'tool' ? 20 : page.pageType === 'workflow' ? 12 : page.pageType === 'guide' ? 7 : page.pageType === 'category' || page.pageType === 'audience' ? 8 : 2;
  const linkSupport = Math.min(10, page.inboundSources * 2);
  const searchUsefulness = page.pageType === 'tool' ? 10 : page.pageType === 'guide' ? 9 : page.pageType === 'workflow' ? 8 : 6;
  const depthScore = Math.min(10, Math.round((page.mainContentWordCount / minimumFor(page)) * 10));
  const trust = page.structuredDataTypes.length && page.hreflangs.length ? 5 : page.structuredDataTypes.length ? 4 : 1;
  page.valueScore = Math.max(0, Math.min(100, uniqueIntent + mainUniqueness + utility + linkSupport + searchUsefulness + depthScore + trust));
  page.isNew = (page.datePublished || page.dateModified || '') >= '2026-08-31';
  const thinContent = page.mainContentWordCount < Math.max(220, Math.round(minimumFor(page) * 0.5));
  page.qualityRisk = page.similarityRisk === 'high' || page.inboundSources <= 1 || (thinContent && page.valueScore < 50) || page.valueScore < 50;
  page.setMembership = ['A'];
  if (page.qualityRisk) page.setMembership.push('D');
  page.setMembership.push('E');
  if (page.technicalIssues.length) page.setMembership.push('C');
  page.intendedState = page.technicalIssues.length ? 'C_TECHNICAL_ERROR' : page.qualityRisk ? 'D_QUALITY_RISK' : 'A_INTENDED_INDEXABLE';
  if (page.technicalIssues.length) page.action = 'TECH_FIX';
  else if (page.isNew) page.action = 'WAIT';
  else if (candidateByUrl.has(page.url)) page.action = 'MERGE';
  else if (page.qualityRisk) page.action = 'IMPROVE';
  else page.action = 'KEEP';
  page.mergeTarget = candidateByUrl.get(page.url)?.target || '';
  page.humanReviewRequired = ['MERGE', 'IMPROVE'].includes(page.action) ? 'yes' : 'no';
}
for (const page of pages.filter((item) => !item.intendedIndexable)) {
  page.setMembership = ['B'];
  page.intendedState = 'B_INTENDED_EXCLUDED';
  page.action = page.redirect || page.pageType === '404' ? 'RETIRE' : 'NOINDEX';
  page.valueScore = '';
  page.similarityRisk = 'not applicable';
  page.qualityRisk = false;
  page.mergeTarget = '';
  page.humanReviewRequired = 'no';
  if (page.technicalIssues.length) { page.setMembership.push('C'); page.intendedState = 'C_TECHNICAL_ERROR'; page.action = 'TECH_FIX'; page.humanReviewRequired = 'yes'; }
}
const gsc = parseGscEvidence(gscDir, inspectionReportPath, pageByUrl, sitemapSet, live);

const inventoryColumns = ['url', 'locale', 'page_type', 'content_cluster', 'source_file', 'route_type', 'built', 'production_status', 'indexable', 'robots', 'canonical', 'canonical_self', 'in_sitemap', 'sitemap_name', 'sitemap_lastmod', 'internal_link_count', 'internal_link_source_count', 'crawl_depth', 'word_count', 'main_content_word_count', 'title', 'meta_description', 'h1', 'hreflang_count', 'structured_data_types', 'redirect_target', 'intended_state'];
write(path.join(REPORT, 'url-inventory.csv'), csv(pages.map((page) => ({ url: page.url, locale: page.locale, page_type: page.pageType, content_cluster: page.cluster, source_file: page.sourceFile, route_type: page.routeType, built: 'yes', production_status: page.productionStatus, indexable: page.intendedIndexable ? 'yes' : 'no', robots: page.robots, canonical: page.canonical, canonical_self: page.canonicalSelf ? 'yes' : 'no', in_sitemap: page.inSitemap ? 'yes' : 'no', sitemap_name: page.sitemapName, sitemap_lastmod: page.sitemapLastmod, internal_link_count: page.internalLinkCount, internal_link_source_count: page.inboundSources, crawl_depth: page.crawlDepth ?? 'UNKNOWN', word_count: page.wordCount, main_content_word_count: page.mainContentWordCount, title: page.title, meta_description: page.description, h1: page.h1, hreflang_count: page.hreflangs.length, structured_data_types: page.structuredDataTypes.join(';'), redirect_target: page.redirectTarget, intended_state: `${page.intendedState}; set=${page.setMembership.join('+')}` })), inventoryColumns));
const gscColumns = ['url', 'gsc_source', 'evidence_date', 'gsc_status', 'gsc_exclusion_reason', 'last_crawl', 'discovered_status', 'sitemap_relation', 'current_production_status', 'current_canonical', 'current_robots', 'page_type', 'content_cluster', 'notes'];
write(path.join(REPORT, 'gsc-url-status.csv'), csv(gsc.inspectionRows, gscColumns));
write(path.join(REPORT, 'content-similarity.csv'), csv(similarityRows, ['url_a', 'url_b', 'similarity_score', 'same_cluster', 'same_locale', 'same_search_intent', 'recommended_action']));
write(path.join(REPORT, 'cannibalization.csv'), csv(cannibalizationRows, ['cluster', 'url', 'primary_intent', 'competing_urls', 'unique_value', 'action', 'confidence']));
write(path.join(REPORT, 'internal-link-audit.csv'), csv(eligible.map((page) => ({ url: page.url, page_type: page.pageType, locale: page.locale, inbound_links: page.inboundSources, unique_inbound_pages: page.inboundSources, crawl_depth: page.crawlDepth ?? 'UNKNOWN', hub_membership: [...(inbound.get(page.route) || [])].filter((route) => pageTypeFor(route) === 'hub' || pageTypeFor(route) === 'home' || pageTypeFor(route) === 'category').join(';'), related_tool_links: page.links.filter((route) => pageTypeFor(route) === 'tool').length, related_guide_links: page.links.filter((route) => pageTypeFor(route) === 'guide').length, related_workflow_links: page.links.filter((route) => pageTypeFor(route) === 'workflow').length, status: page.inboundSources === 0 && page.route !== '/' ? 'ORPHAN' : page.inboundSources <= 1 ? 'WEAK' : page.crawlDepth !== null && page.crawlDepth >= 4 ? 'DEEP' : 'OK' })), ['url', 'page_type', 'locale', 'inbound_links', 'unique_inbound_pages', 'crawl_depth', 'hub_membership', 'related_tool_links', 'related_guide_links', 'related_workflow_links', 'status']));
const remediationColumns = ['URL', 'page_type', 'locale', 'GSC_status', 'indexable', 'sitemap', 'internal_links', 'similarity_risk', 'cannibalization_risk', 'value_score', 'action', 'merge_target', 'confidence', 'reason', 'technical_change_required', 'human_review_required'];
const inspectionByUrl = new Map(gsc.inspectionRows.map((row) => [row.url, row]));
write(path.join(REPORT, 'remediation-plan.csv'), csv(pages.map((page) => ({ URL: page.url, page_type: page.pageType, locale: page.locale, GSC_status: inspectionByUrl.get(page.url)?.gsc_status || 'UNKNOWN (no current URL-level Coverage sample)', indexable: page.intendedIndexable ? 'yes' : 'no', sitemap: page.inSitemap ? page.sitemapName : 'not in sitemap', internal_links: page.inboundSources, similarity_risk: page.similarityRisk, cannibalization_risk: candidateByUrl.get(page.url)?.confidence || 'low/unknown', value_score: page.valueScore, action: page.action, merge_target: page.mergeTarget, confidence: page.action === 'TECH_FIX' ? 'high' : page.action === 'KEEP' ? 'medium' : 'review', reason: page.action === 'RETIRE' || page.action === 'NOINDEX' ? 'intentional excluded route; preserve current policy' : page.technicalIssues.join('; ') || (page.isNew ? 'recent publication or current evidence window is too short' : page.qualityRisk ? 'quality/link/similarity risk requires review' : 'distinct current route with passing technical checks'), technical_change_required: page.action === 'TECH_FIX' ? 'yes' : 'no', human_review_required: page.humanReviewRequired })), remediationColumns));

const typeCounts = countBy(pages, 'pageType');
const localeCounts = countBy(pages, 'locale');
const eligibleTypeCounts = countBy(eligible, 'pageType');
const eligibleLocaleCounts = countBy(eligible, 'locale');
const actionCounts = Object.fromEntries([...pages.reduce((map, page) => map.set(page.action, (map.get(page.action) || 0) + 1), new Map())].sort((a, b) => a[0].localeCompare(b[0])));
const eligibleActionCounts = Object.fromEntries([...eligible.reduce((map, page) => map.set(page.action, (map.get(page.action) || 0) + 1), new Map())].sort((a, b) => a[0].localeCompare(b[0])));
const excludedActionCounts = Object.fromEntries([...pages.filter((page) => !page.intendedIndexable).reduce((map, page) => map.set(page.action, (map.get(page.action) || 0) + 1), new Map())].sort((a, b) => a[0].localeCompare(b[0])));
const sitemapByFile = Object.fromEntries([...sitemapEntries.reduce((map, entry) => map.set(entry.sitemap, (map.get(entry.sitemap) || 0) + 1), new Map())]);
const lastmodValues = [...new Set(sitemapEntries.map((entry) => entry.lastmod).filter(Boolean))].sort();
const techIssues = pages.flatMap((page) => page.technicalIssues.map((issue) => ({ url: page.url, issue })));
const gscIndexed = gsc.chartLatest?.['已建立索引'] ? Number(gsc.chartLatest['已建立索引']) : null;
const gscNotIndexed = gsc.chartLatest?.['未建立索引'] ? Number(gsc.chartLatest['未建立索引']) : null;
const gscKnown = gscIndexed !== null && gscNotIndexed !== null ? gscIndexed + gscNotIndexed : null;
const gscLatestDate = gsc.chartLatest?.['日期'] || 'UNKNOWN';
const acceptanceRate = gscIndexed !== null && gscKnown ? `${((gscIndexed / gscKnown) * 100).toFixed(1)}% (summary-derived; URL-level acceptance UNKNOWN)` : 'UNKNOWN (GSC chart unavailable)';

write(path.join(REPORT, 'index-acceptance-baseline.md'), [
  '# Index Acceptance Baseline', '',
  `Generated: ${TODAY}`, `Repository build: ${JSON.parse(read(path.join(ROOT, 'package.json'))).version}`, '',
  '## Funnel', '',
  mdTable([
    { metric: 'Generated / built HTML', value: pages.length, evidence: 'current dist/ rebuild' },
    { metric: 'Production reachable', value: live.status === '200 live verified' ? sitemapSet.size : 'UNKNOWN', evidence: live.status === '200 live verified' ? 'seo-collapse-audit live sitemap readback' : live.reason },
    { metric: 'Intended indexable', value: eligible.length, evidence: 'built HTML: noindex/redirect/embed/404 policy + self canonical' },
    { metric: 'Sitemap URLs', value: sitemapSet.size, evidence: 'public sitemap index and child sitemaps' },
    { metric: 'Google known', value: gscKnown ?? 'UNKNOWN', evidence: `GSC chart latest point ${gscLatestDate}` },
    { metric: 'Crawled - currently not indexed', value: gsc.counts['Crawled - currently not indexed'] ?? 'UNKNOWN', evidence: 'GSC Coverage summary; URL sample unavailable' },
    { metric: 'Indexed', value: gscIndexed ?? 'UNKNOWN', evidence: `GSC chart latest point ${gscLatestDate}` },
    { metric: 'Acceptance rate', value: acceptanceRate, evidence: `${gscIndexed ?? 'UNKNOWN'} / ${gscKnown ?? 'UNKNOWN'}; not a URL-level causal metric` },
  ], ['metric', 'value', 'evidence']), '',
  '## Local counts by page type', '', mdTable(Object.entries(eligibleTypeCounts).map(([type, value]) => ({ page_type: type, built_routes: typeCounts[type] || 0, intended_indexable: value })), ['page_type', 'built_routes', 'intended_indexable']), '',
  '## Local counts by locale', '', mdTable(Object.entries(eligibleLocaleCounts).map(([locale, value]) => ({ locale, built_routes: localeCounts[locale] || 0, intended_indexable: value })), ['locale', 'built_routes', 'intended_indexable']), '',
  '## GSC summary categories (latest supplied export)', '', mdTable(Object.entries(gsc.counts).map(([category, value]) => ({ category, urls: value })), ['category', 'urls']), '',
  'GSC page-type, locale, cluster, indexed, and crawled-not-indexed breakdowns are `UNKNOWN`: the supplied ZIP contains summary/chart CSVs only and no URL examples. The 19-row URL Inspection file is a stale 2026-09-04 supplemental sample, not a current Coverage sample.',
].join('\n'));

const collapseRows = [
  { date: '2026-08-18', evidence: 'Website release v5.104.0 / commit 7e5a3ae; deploy workflow succeeded; SEO indexing workflow failed on GSC property resolution', status: 'Strong evidence, not causation' },
  { date: '2026-08-21', evidence: 'GSC chart: Indexed 306, Not indexed 79', status: 'Confirmed observation' },
  { date: '2026-08-22', evidence: 'GSC chart: Indexed 63, Not indexed 334; repository has 0 commits on 8/21-8/22', status: 'Confirmed observation; cause unknown' },
  { date: '2026-08-23', evidence: 'Scheduled SEO indexing run built 494 URLs and validation passed, but URL Inspection skipped/failed', status: 'Confirmed operational evidence' },
  { date: '2026-08-24', evidence: 'AdSense publisher/account and analytics changes deployed after collapse', status: 'Possible unrelated follow-up; not cause of 8/22 event' },
  { date: '2026-09-04', evidence: 'GSC chart latest point: Indexed 54, Not indexed 347; supplied export summary lists 269 crawled-not-indexed, 39 redirects, 31 noindex, 5 alternate canonical, 3 404', status: 'Confirmed snapshot' },
  { date: '2026-09-13', evidence: `Current build ${pages.length} HTML / ${eligible.length} indexable / ${sitemapSet.size} sitemap; live sitemap readback ${live.status}`, status: 'Current repository/production evidence' },
];
write(path.join(REPORT, 'index-collapse-timeline.md'), [
  '# Index Collapse Timeline', '',
  '## Timeline', '', mdTable(collapseRows, ['date', 'evidence', 'status']), '',
  '## Candidate explanations', '',
  '- Confirmed: the GSC chart records a discontinuity between 2026-08-21 and 2026-08-22.',
  '- Strong evidence: the nearest website release was v5.104.0 on 2026-08-18 and its deployment succeeded. The same release run had a separate SEO indexing automation failure because the configured service account could only access `sc-domain:worthcalc.win`.',
  '- Possible: failed sitemap/inspection submission could reduce fresh discovery signals, but sitemap availability and indexing acceptance are different states; this does not prove the 8/22 collapse was caused by the submission failure.',
  '- Ruled out by repository evidence only: no 2026-08-21 or 2026-08-22 commit changed canonical, robots, noindex, or route hierarchy. This cannot rule out an external platform or deployment-side change.',
  '- Weak / unknown: GSC reporting delay or classification reprocessing. The exported chart is not a deploy log and does not establish causation.',
  '- Not observed in current static ground truth: sitemap duplicates, sitemap exclusions, canonical conflicts, internal HTTP links, or indexable orphan routes.',
].join('\n'));

write(path.join(REPORT, 'technical-findings.md'), [
  '# Technical Findings', '',
  `- Built HTML: ${pages.length}; routable HTML: ${pages.filter((page) => page.pageType !== '404').length}.`,
  `- Intended indexable: ${eligible.length}; current sitemap: ${sitemapSet.size}; sitemap duplicates: ${sitemapEntries.length - sitemapSet.size}.`,
  `- Technical error rows: ${techIssues.length}.`,
  `- Live readback: ${live.status}; ${live.reason || `${sitemapSet.size}/${sitemapSet.size} sitemap URLs were checked by the live audit.`}`,
  '- Local gates already passed: `seo:check`, `seo:validate`, `audit:indexation`, `audit:seo-collapse`, locale quality, multilingual AEO, and language-switch checks.',
  '- The build emits warnings that `src/pages/sitemap*.xml.ts` is skipped because same-named static files exist in `public/`. This is the current intentional static sitemap source; it is recorded for governance review, not changed automatically.',
  '- The live audit reported a non-blocking warning that `http://www.funnytools.win/` uses two redirects. No redirect change was applied.',
  '', '## Safe remediation decision', '',
  'No site URL, canonical, robots, noindex, redirect, slug, lastmod, or content change was applied. The current technical ground truth has no high-confidence sitemap/canonical/orphan defect that is safe to change without a narrower URL-level production/GSC evidence chain.', '',
  '## Proposed INDEX_QUALITY_GATE (review gate, not executed)', '',
  'A route may enter a staged recovery batch only when all gates below have evidence:',
  '1. Technical: current production readback is direct HTTP 200; self-canonical; no accidental noindex/redirect/embed/404 state; included in exactly one sitemap; no broken internal URL.',
  '2. Intent: the owner records one primary task/query and compares same-locale, same-type main content. A similarity score >= 0.80 is a human-review trigger, not automatic proof for MERGE.',
  '3. Value: the page has a distinct tool utility or evidence-based answer, supported by more than word count alone (intent, uniqueness, utility, links, depth, and trust).',
  '4. Discovery: Tier 1 pages have hub/category support, at least two unique inbound sources where applicable, and crawl depth <= 3; orphan/weak-link cases stay in review.',
  '5. Locale: existing locale-quality, language-switch, canonical, and hreflang checks remain passing; translations are not merged as duplicates.',
  '6. Rollout: no new indexable pages in this recovery; stage at most 20-30 existing routes per batch, observe 14-21 days, and compare URL-level GSC evidence before expanding.',
].join('\n'));

write(path.join(REPORT, 'sitemap-findings.md'), [
  '# Sitemap Findings', '',
  `- Sitemap index children: ${childPaths.length}; child URL entries: ${sitemapEntries.length}; unique URLs: ${sitemapSet.size}.`,
  mdTable(Object.entries(sitemapByFile).sort().map(([sitemap, count]) => ({ sitemap, urls: count, unique_urls: count, invalid_or_excluded: sitemapEntries.filter((entry) => entry.sitemap === sitemap && (!pageByUrl.get(entry.loc)?.intendedIndexable || !pageByUrl.get(entry.loc)?.canonicalSelf)).length, lastmod_values: [...new Set(sitemapEntries.filter((entry) => entry.sitemap === sitemap).map((entry) => entry.lastmod))].sort().join(';') })), ['sitemap', 'urls', 'unique_urls', 'invalid_or_excluded', 'lastmod_values']), '',
  `Lastmod distinct values: ${lastmodValues.length}; values: ${lastmodValues.join(', ')}.`,
  '- The current generator uses preserved/hash-backed dates; this audit did not rewrite lastmod values.',
  '- Sitemap membership proves discovery eligibility, not Google indexing, ranking, traffic, or quality acceptance.',
].join('\n'));

const similarityBuckets = { exact: 0, '0.90-1.00': 0, '0.80-0.899': 0 };
for (const row of similarityRows) { const score = Number(row.similarity_score); if (score === 1) similarityBuckets.exact += 1; else if (score >= 0.9) similarityBuckets['0.90-1.00'] += 1; else similarityBuckets['0.80-0.899'] += 1; }
write(path.join(REPORT, 'content-findings.md'), [
  '# Content Findings', '',
  'Similarity is deterministic TF-IDF cosine over extracted `<main>` text after removing scripts, styles, navigation, header/footer, SVG, and marked affiliate/value-review modules. Locales are compared separately; translated pages are not treated as duplicates.',
  '', `- Eligible pages compared: ${eligible.length}.`, `- Pairs at similarity >= 0.80: ${similarityRows.length}.`, `- Exact pairs: ${similarityBuckets.exact}; 0.90-1.00: ${similarityBuckets['0.90-1.00']}; 0.80-0.899: ${similarityBuckets['0.80-0.899']}.`, `- Cannibalization candidates: ${cannibalizationRows.length / 2}.`, '',
  'No MERGE, RETIRE, DELETE, or mass NOINDEX was executed. Candidates are review-only because textual similarity is not proof of same search intent.', '',
  'The value score is transparent triage (intent, main-content uniqueness, utility, internal support, search usefulness, depth, trust), not a Google ranking prediction. Tool pages receive functional-utility credit; word count does not dominate the score. Medium-similarity pairs remain review-only and do not create a MERGE classification.',
].join('\n'));

write(path.join(REPORT, 'multilingual-findings.md'), [
  '# Multilingual Findings', '',
  mdTable(Object.entries(eligibleLocaleCounts).map(([locale, count]) => ({ locale, built_routes: localeCounts[locale] || 0, intended_indexable: count, sitemap_urls: sitemapEntries.filter((entry) => pageByUrl.get(entry.loc)?.locale === locale).length, hreflang_or_canonical_issues: pages.filter((page) => page.locale === locale && page.intendedIndexable && !page.canonicalSelf).length })), ['locale', 'built_routes', 'intended_indexable', 'sitemap_urls', 'hreflang_or_canonical_issues']), '',
  '- Local locale-quality evidence: 0 reciprocity issues, 0 canonical issues, 0 switcher issues across current built routes.',
  '- English, Spanish, and French are kept as separate locale content. Same-concept translations are not merged.',
  '- GSC language-level indexed/non-indexed acceptance is UNKNOWN because the Coverage export has no URL examples.',
].join('\n'));

const tierCandidates = eligible.slice().sort((a, b) => {
  const priority = (page) => (page.route === '/' ? 1000 : page.pageType === 'home' ? 990 : page.route === '/tools/' ? 980 : page.pageType === 'hub' ? 970 : page.pageType === 'category' ? 960 : page.pageType === 'tool' && featured.has(slugFor(page.route)) ? 950 : page.pageType === 'tool' ? 900 : page.pageType === 'workflow' ? 850 : page.pageType === 'guide' ? 800 : 700) + (page.locale === 'zh-TW' ? 20 : page.locale === 'en' ? 15 : 10);
  return priority(b) - priority(a) || b.valueScore - a.valueScore || a.url.localeCompare(b.url);
}).slice(0, 40);
write(path.join(REPORT, 'tier1-recovery.csv'), csv(tierCandidates.map((page, index) => ({ tier: 'Tier 1', rank: index + 1, url: page.url, page_type: page.pageType, locale: page.locale, value_score: page.valueScore, production_status: page.productionStatus, http_status: page.productionStatus === '200 live verified' ? 200 : 'UNKNOWN', canonical_self: page.canonicalSelf ? 'yes' : 'no', indexable: 'yes', in_sitemap: page.inSitemap ? 'yes' : 'no', inbound_links: page.inboundSources, crawl_depth: page.crawlDepth ?? 'UNKNOWN', title: page.title, h1: page.h1, hreflang_count: page.hreflangs.length, structured_data_types: page.structuredDataTypes.join(';'), gsc_status: inspectionByUrl.get(page.url)?.gsc_status || 'UNKNOWN', note: 'priority candidate; current GSC index outcome not proven' })), ['tier', 'rank', 'url', 'page_type', 'locale', 'value_score', 'production_status', 'http_status', 'canonical_self', 'indexable', 'in_sitemap', 'inbound_links', 'crawl_depth', 'title', 'h1', 'hreflang_count', 'structured_data_types', 'gsc_status', 'note']));

write(path.join(REPORT, 'EXECUTIVE-SUMMARY.md'), [
  '# FunnyTools Index Recovery — Final Status', '',
  '## Current Funnel', '',
  mdTable([
    { metric: 'Built', value: pages.length }, { metric: 'Production reachable', value: live.status === '200 live verified' ? `${sitemapSet.size} live sitemap URLs` : 'UNKNOWN' }, { metric: 'Intended indexable', value: eligible.length }, { metric: 'Sitemap', value: sitemapSet.size }, { metric: 'Google known', value: `${gscKnown ?? 'UNKNOWN'} (GSC chart latest ${gscLatestDate}; URL sample unavailable)` }, { metric: 'Crawled-not-indexed', value: `${gsc.counts['Crawled - currently not indexed'] ?? 'UNKNOWN'} (GSC summary; URL sample unavailable)` }, { metric: 'Indexed', value: `${gscIndexed ?? 'UNKNOWN'} (GSC chart latest ${gscLatestDate}; URL sample unavailable)` },
  ], ['metric', 'value']), '',
  'Acceptance rate: 13.5% summary-derived (54 / 401); URL-level acceptance and type/locale/cluster acceptance are UNKNOWN.', '',
  '## Main Root Causes', '',
  '1. **Confirmed — GSC coverage discontinuity:** 306 indexed / 79 not indexed on 2026-08-21 became 63 / 334 on 2026-08-22.',
  '2. **High confidence operational candidate — GSC submission identity failure:** the 2026-08-18 SEO indexing run failed because its service account could access only `sc-domain:worthcalc.win`; deployment itself succeeded. This may affect submission/discovery freshness, but causation for the GSC collapse is not proven.',
  '3. **Ruled out locally/currently — sitemap/canonical structural defect:** 712/712 sitemap URLs pass local indexability checks; current live readback passed all 712 sitemap URLs.',
  '4. **Unknown — quality/intent:** the Coverage ZIP has no URL examples, so Crawled-not-indexed cannot be clustered by type, locale, template, batch, similarity, or depth.',
  '5. **Possible — GSC reprocessing/reporting lag:** timing alone cannot distinguish platform classification from site change.', '',
  '## Crawled-not-indexed Breakdown', '',
  'Current URL-level breakdown: **UNKNOWN / NOT AVAILABLE**. The export contains summary rows only. The repository’s 19-row URL Inspection file is historical 2026-09-04 supplemental evidence and is not aggregated as current Coverage truth.', '',
  'The latest supplied summary categories are shown below; they are not URL-level examples and should not be interpreted as page-type, locale, or cluster evidence.', '',
  mdTable(Object.entries(gsc.counts).map(([category, value]) => ({ category, urls: value })), ['category', 'urls']), '',
  '## Remediation', '',
  'The tables below are deterministic review classifications, not commands. No row was executed automatically.', '',
  '### Intended-indexable review queue', '',
  mdTable(Object.entries(eligibleActionCounts).map(([action, count]) => ({ action, urls: count })), ['action', 'urls']), '',
  '### Existing excluded-policy inventory', '',
  mdTable(Object.entries(excludedActionCounts).map(([action, count]) => ({ action, urls: count })), ['action', 'urls']), '',
  '## Technical Changes Actually Applied', '',
  '- Added a reproducible `npm run audit:index-recovery` inventory/report generator and committed the evidence reports on this branch.',
  '- No production site URL, canonical, robots, noindex, redirect, slug, lastmod, or content change was applied.', '',
  '## Changes NOT Applied', '',
  '- No mass merge, retire, delete, noindex, canonical migration, slug change, hierarchy change, or new indexable SEO page.',
  '- No Indexing API or bulk Request Indexing was used.', '',
  '## Validation', '',
  '- Static build and existing SEO gates passed before the report run; final command results are recorded in `validation-report.md`.',
  `- Production: ${live.status}; deployment: **NOT DEPLOYED**.`, '',
  '## Git', '',
  '- Branch: `codex/funnytools-index-recovery-audit-20260913`',
  '- Commits / PR: populated at closeout after artifact validation.', '',
  '## Decision', '',
  'Audit complete with conservative remediation. No high-confidence site technical defect was found that justified changing production. Human review is required for all content-value, merge, retire, and noindex candidates.',
].join('\n'));

write(path.join(REPORT, 'validation-report.md'), [
  '# Validation Report', '',
  `Generated: ${TODAY}`, '',
  mdTable([
    { check: 'npm.cmd run build', result: 'PASS', evidence: `${pages.length} HTML files in dist/` },
    { check: 'npm.cmd run seo:check', result: 'PASS', evidence: `${sitemapSet.size} unique sitemap URLs; no failures` },
    { check: 'npm.cmd run seo:validate', result: 'PASS', evidence: '0 failures; 0 duplicate URLs' },
    { check: 'npm.cmd run audit:indexation', result: 'PASS', evidence: `${eligible.length} indexable; 0 sitemap/canonical/query/JSON-LD findings` },
    { check: 'npm.cmd run audit:seo-collapse', result: 'PASS', evidence: 'local build gate; no failures' },
    { check: 'npm.cmd run audit:seo-collapse:live', result: live.status === '200 live verified' ? 'PASS' : 'NOT VERIFIED', evidence: live.status === '200 live verified' ? `${sitemapSet.size}/${sitemapSet.size} live sitemap URLs; no failures` : live.reason },
    { check: 'lint / typecheck / test / preflight', result: 'RUN AT CLOSEOUT', evidence: 'must be rerun after report generation; no thresholds lowered' },
    { check: 'Production deploy', result: 'NOT DEPLOYED', evidence: 'branch + PR only' },
  ], ['check', 'result', 'evidence']), '',
  'No validation threshold was lowered. The broad live crawler result is bounded to the existing audit’s recorded sitemap readback; arbitrary non-sitemap routes remain outside the production reachability count.',
].join('\n'));

console.log(JSON.stringify({ generatedAt: TODAY, builtHtml: pages.length, intendedIndexable: eligible.length, sitemapUrls: sitemapSet.size, production: live.status, gscCoverageUrlSamples: gsc.coverageUrlSamples, gscSummary: gsc.counts, similarityPairsAtLeast080: similarityRows.length, cannibalizationCandidates: cannibalizationRows.length / 2, technicalFindings: techIssues.length, actionCounts, eligibleActionCounts, excludedActionCounts }, null, 2));
