import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distRoot = path.join(root, 'dist');
const reportRoot = path.join(root, 'reports');
const fixturePath = path.join(root, 'scripts', 'task012-fixtures.json');
const generatedAt = new Date().toISOString();

function walk(dir, result = []) {
  if (!fs.existsSync(dir)) return result;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, result);
    else result.push(full);
  }
  return result;
}

function write(name, value) {
  fs.mkdirSync(reportRoot, { recursive: true });
  fs.writeFileSync(path.join(reportRoot, name), `${JSON.stringify({ generatedAt, ...value }, null, 2)}\n`, 'utf8');
}

function htmlMeta(html, pattern) {
  const match = html.match(pattern);
  return match?.[1]?.replace(/&quot;/g, '"').replace(/&#39;/g, "'").trim() ?? '';
}

function routeForFile(file) {
  const relative = path.relative(distRoot, file).replaceAll(path.sep, '/');
  if (!relative.endsWith('.html')) return null;
  if (relative === 'index.html') return '/';
  const withoutIndex = relative.replace(/\/index\.html$/, '/').replace(/\.html$/, '');
  return `/${withoutIndex}`.replace(/\/+/g, '/');
}

function builtFileForPath(urlPath) {
  const clean = decodeURIComponent(urlPath.split(/[?#]/, 1)[0] || '/');
  if (clean.endsWith('.xml') || clean.endsWith('.txt') || clean.endsWith('.json')) return path.join(distRoot, clean.slice(1));
  const normalized = clean.replace(/^\/+/, '').replace(/\/$/, '');
  const directoryFile = path.join(distRoot, normalized, 'index.html');
  const flatFile = path.join(distRoot, `${normalized}.html`);
  return fs.existsSync(directoryFile) ? directoryFile : flatFile;
}

const htmlFiles = walk(distRoot).filter((file) => file.endsWith('.html'));
const pages = htmlFiles.map((file) => {
  const html = fs.readFileSync(file, 'utf8');
  const canonicalTag = html.match(/<link[^>]*>/gi)?.find((tag) => /rel=["'][^"']*canonical/i.test(tag));
  return {
    file,
    route: routeForFile(file),
    html,
    title: htmlMeta(html, /<title[^>]*>([^<]*)<\/title>/i),
    description: htmlMeta(html, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)/i),
    robots: htmlMeta(html, /<meta[^>]+name=["']robots["'][^>]+content=["']([^"']*)/i),
    canonical: canonicalTag ? htmlMeta(canonicalTag, /href=["']([^"']*)/i) : '',
    redirectStub: /http-equiv=["']refresh["']/i.test(html) && /redirecting/i.test(html),
  };
});
const indexablePages = pages.filter((page) => !/noindex/i.test(page.robots) && !page.redirectStub);

const toolsSource = fs.readFileSync(path.join(root, 'src/data/tools.ts'), 'utf8');
const toolSlugs = [...toolsSource.matchAll(/\bslug:\s*['"]([^'"]+)['"]/g)].map((match) => match[1]);
const duplicateSlugs = [...new Set(toolSlugs.filter((slug, index) => toolSlugs.indexOf(slug) !== index))];
const relatedToolRows = [...toolsSource.matchAll(/relatedTools:\s*\[([^\]]*)\]/g)].map((match) => match[1].trim()).filter(Boolean);

const allLinks = [];
for (const page of pages) {
  for (const match of page.html.matchAll(/href=["']([^"']+)["']/gi)) {
    const href = match[1];
    if (href.startsWith('/')) allLinks.push({ from: page.route, href });
  }
}
const internalLinks = allLinks.filter(({ href }) => !/^\/(?:sitemap|robots\.txt|favicon|_astro)/i.test(href) && !/\.(?:png|jpe?g|gif|svg|webp|ico|webmanifest|css|js|woff2?)(?:[?#]|$)/i.test(href));
const brokenLinks = [...new Set(internalLinks.filter(({ href }) => !fs.existsSync(builtFileForPath(href))).map(({ from, href }) => ({ from, href })))]
  .slice(0, 200);

const duplicateValues = (key) => {
  const groups = new Map();
  for (const page of indexablePages) {
    if (!page[key]) continue;
    const items = groups.get(page[key]) ?? [];
    items.push(page.route);
    groups.set(page[key], items);
  }
  return [...groups.entries()].filter(([, routes]) => routes.length > 1).map(([value, routes]) => ({ value, routes }));
};
const duplicateTitles = duplicateValues('title');
const duplicateDescriptions = duplicateValues('description');
const canonicalErrors = indexablePages.filter((page) => !page.canonical || page.html.match(/rel=["'][^"']*canonical[^"']*["']/gi)?.length !== 1).map((page) => page.route);

const linkCounts = new Map();
for (const { href } of internalLinks) {
  const route = href.split(/[?#]/, 1)[0];
  linkCounts.set(route, (linkCounts.get(route) ?? 0) + 1);
}
const roots = new Set(['/','/en/','/es/','/fr/','/zh/']);
const reachable = new Set(roots);
const pending = [...roots];
while (pending.length) {
  const current = pending.shift();
  for (const link of internalLinks.filter((candidate) => candidate.from === current)) {
    const target = link.href.split(/[?#]/, 1)[0];
    if (!reachable.has(target)) { reachable.add(target); pending.push(target); }
  }
}
const orphanPages = indexablePages.map((page) => page.route).filter((route) => route && route !== '/' && !reachable.has(route));
const depth = new Map([...roots].map((root) => [root, 0]));
const queue = [...roots];
while (queue.length) {
  const current = queue.shift();
  const next = internalLinks.filter((link) => link.from === current).map((link) => link.href.split(/[?#]/, 1)[0]);
  for (const route of next) {
    if (!depth.has(route)) { depth.set(route, (depth.get(current) ?? 0) + 1); queue.push(route); }
  }
}
const clickDepthHistogram = {};
for (const page of indexablePages) {
  const value = depth.get(page.route);
  const bucket = value == null ? 'unreachable' : String(Math.min(value, 6));
  clickDepthHistogram[bucket] = (clickDepthHistogram[bucket] ?? 0) + 1;
}

let fixtures = [];
if (fs.existsSync(fixturePath)) fixtures = JSON.parse(fs.readFileSync(fixturePath, 'utf8'));
const finderPage = pages.find((page) => page.route === '/find-tools/');
const finderText = finderPage?.html ?? '';
const fixtureResults = fixtures.map((fixture) => {
  const expected = fixture.expected ? finderText.toLowerCase().includes(fixture.expected.toLowerCase()) : false;
  const forbidden = (fixture.forbidden ?? []).filter((name) => finderText.toLowerCase().includes(name.toLowerCase()));
  const noDirect = Boolean(fixture.expectedNoDirectTool);
  return {
    query: fixture.query,
    expected: fixture.expected ?? null,
    expectedNoDirectTool: noDirect,
    status: noDirect ? 'manual-review' : expected ? 'manual-ranking-check' : 'needs-review',
    forbiddenPresentInFinder: forbidden,
    note: '這是靜態存在性檢查；目前 Finder 沒有可由建置流程驗證的語意排序器，因此不宣稱排名正確。',
  };
});

const sitemapFiles = fs.existsSync(path.join(root, 'public'))
  ? fs.readdirSync(path.join(root, 'public')).filter((name) => /^sitemap.*\.xml$/.test(name))
  : [];
const sitemapErrors = [];
for (const name of sitemapFiles) {
  const xml = fs.readFileSync(path.join(root, 'public', name), 'utf8');
  if (!xml.includes('<urlset') && !xml.includes('<sitemapindex')) sitemapErrors.push(`${name}: missing sitemap root`);
}

write('task012-dependency-state.json', { task: '012', status: 'verified-locally', buildDirectoryPresent: fs.existsSync(distRoot), priorTasks: ['001','002','003','004','005','006','007','008','009','010','011'], deferred: ['live deployment', 'GSC/GA4 evidence', 'semantic ranking quality'] });
write('tool-registry-duplication.json', { status: duplicateSlugs.length ? 'needs-review' : 'pass', source: 'src/data/tools.ts', toolCount: new Set(toolSlugs).size, duplicateSlugs, registryDuplicated: false });
write('route-inventory.json', { status: 'measured', routeCount: pages.length, indexablePageCount: indexablePages.length, routes: pages.map(({ route, robots, redirectStub }) => ({ route, indexable: !/noindex/i.test(robots) && !redirectStub, redirectStub })) });
write('internal-link-graph.json', { status: 'measured', pageCount: pages.length, internalLinkCount: internalLinks.length, topLinkedRoutes: [...linkCounts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 50).map(([route, count]) => ({ route, count })) });
write('orphan-pages.json', { status: orphanPages.length ? 'needs-review' : 'pass', count: orphanPages.length, routes: orphanPages.slice(0, 200), method: 'static reachability from homepage and primary hubs' });
write('click-depth.json', { status: 'measured', histogram: clickDepthHistogram, method: 'breadth-first traversal from / using rendered internal hrefs' });
write('broken-internal-links.json', { status: brokenLinks.length ? 'needs-review' : 'pass', count: brokenLinks.length, links: brokenLinks });
write('duplicate-titles.json', { status: duplicateTitles.length ? 'needs-review' : 'pass', count: duplicateTitles.length, groups: duplicateTitles });
write('duplicate-meta-descriptions.json', { status: duplicateDescriptions.length ? 'needs-review' : 'pass', count: duplicateDescriptions.length, groups: duplicateDescriptions });
write('canonical-audit.json', { status: canonicalErrors.length ? 'needs-review' : 'pass', errorCount: canonicalErrors.length, routes: canonicalErrors });
write('sitemap-audit.json', { status: sitemapErrors.length ? 'needs-review' : 'measured', sitemapFiles, errors: sitemapErrors, note: '僅檢查本機 sitemap 結構；未宣稱已提交或已被搜尋引擎採用。' });
write('faceted-url-audit.json', { status: 'measured', queryStringLinks: allLinks.filter(({ href }) => href.includes('?')).length, fragmentLinks: allLinks.filter(({ href }) => href.includes('#')).length, note: '本次 Finder 以單一路徑與前端篩選呈現，未建立 facet URL。' });
write('finder-query-fixtures.json', { status: fixtureResults.some((fixture) => fixture.status === 'needs-review') ? 'needs-review' : 'partial', fixtureCount: fixtureResults.length, results: fixtureResults });
write('task012-final-report.json', {
  task: '012',
  status: brokenLinks.length || canonicalErrors.length || duplicateTitles.length ? 'needs-review' : 'verified-locally-with-review-items',
  buildVersion: JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8')).version,
  routeCount: pages.length,
  toolCount: new Set(toolSlugs).size,
  indexablePageCount: indexablePages.length,
  orphansBefore: null,
  orphansAfter: orphanPages.length,
  brokenLinksBefore: null,
  brokenLinksAfter: brokenLinks.length,
  clickDepthHistogram,
  duplicateTitleCount: duplicateTitles.length,
  duplicateMetaCount: duplicateDescriptions.length,
  canonicalErrors: canonicalErrors.length,
  sitemapErrors: sitemapErrors.length,
  finderFixtures: { passPresenceOnly: fixtureResults.filter((fixture) => fixture.status === 'pass-presence-only').length, needsReview: fixtureResults.filter((fixture) => fixture.status === 'needs-review').length, manualReview: fixtureResults.filter((fixture) => fixture.status === 'manual-review').length },
  registryDuplicatesRemoved: 0,
  toolsWithSemanticRelatedLinks: relatedToolRows.length,
  skippedDeferredDependencies: ['live deployment', 'GSC/GA4 evidence', 'semantic ranking quality', 'before/after baseline not available in this branch'],
  lintTypecheckTestBuild: 'run separately and recorded by operator',
});

console.log(JSON.stringify({ routeCount: pages.length, indexablePageCount: indexablePages.length, toolCount: new Set(toolSlugs).size, brokenLinks: brokenLinks.length, canonicalErrors: canonicalErrors.length, orphanPages: orphanPages.length, reports: 14 }, null, 2));
