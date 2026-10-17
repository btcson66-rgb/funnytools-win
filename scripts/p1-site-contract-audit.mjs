// P1 (2026-10-15) site contract audit.
//
// The site was narrowed to a Taiwan student/teacher grade-statistics tool site. This audit
// keeps that shape from drifting back. It reads the built dist/ only and fails when:
//   - the sitemap is not exactly the INDEXABLE_PATHS set (src/lib/indexPolicy.ts);
//   - an indexable page is not self-canonical, is noindex, or lacks the FunnyTools brand;
//   - a statistics tool page / the education-statistics hub lacks the Benson Lai byline or Person author;
//   - any page emits FAQPage or HowTo structured data;
//   - a removed section (es/fr, blog, workflows, for, shop, ...) is built, other than the
//     registered redirect stubs in src/data/removedRedirects.ts (max 30);
//   - an es/fr/de/hi hreflang alternate is emitted anywhere;
//   - the old multi-topic brand strings come back.
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const root = process.cwd();
const dist = join(root, 'dist');
const origin = 'https://funnytools.win';
const failures = [];
const fail = (message) => failures.push(message);

if (!existsSync(dist)) {
  console.error('dist/ is missing. Run npm run build first.');
  process.exit(1);
}

function walk(dir, output = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, output);
    else output.push(full);
  }
  return output;
}

function routeOf(file) {
  const rel = relative(dist, file).split(sep).join('/');
  if (rel === 'index.html') return '/';
  return rel.endsWith('/index.html') ? `/${rel.slice(0, -'index.html'.length)}` : `/${rel}`;
}

function fileOf(route) {
  return route === '/' ? join(dist, 'index.html') : join(dist, route.replace(/^\//, ''), 'index.html');
}

function attr(tag, name) {
  return tag.match(new RegExp(`\\b${name}\\s*=\\s*["']([^"']*)["']`, 'i'))?.[1] ?? '';
}

function metaRobots(html) {
  return [...html.matchAll(/<meta\b[^>]*>/gi)].map((m) => m[0]).filter((tag) => attr(tag, 'name').toLowerCase() === 'robots').map((tag) => attr(tag, 'content')).join(',');
}

function canonicalOf(html) {
  const tag = [...html.matchAll(/<link\b[^>]*>/gi)].map((m) => m[0]).find((t) => attr(t, 'rel').toLowerCase() === 'canonical');
  return tag ? attr(tag, 'href') : '';
}

function jsonLd(html) {
  const items = [];
  for (const m of html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      const data = JSON.parse(m[1]);
      items.push(...(Array.isArray(data) ? data : [data]));
    } catch {
      items.push({ parseError: true });
    }
  }
  return items;
}

// ---- policy sources ----
const policySource = readFileSync(join(root, 'src/lib/indexPolicy.ts'), 'utf8');
const indexable = [...policySource.slice(0, policySource.indexOf('] as const')).matchAll(/^\s+'(\/[^']*)',$/gm)].map((m) => m[1]);
if (indexable.length === 0) fail('Could not read INDEXABLE_PATHS from src/lib/indexPolicy.ts.');
const indexableSet = new Set(indexable);
if (indexableSet.has('/tools/merge-pdf/')) fail('INDEXABLE_PATHS must not contain /tools/merge-pdf/ (general tools stay noindex).');
const toolSlugs = indexable.filter((p) => p.startsWith('/tools/')).map((p) => p.split('/')[2]);
const authoredRoutes = [...toolSlugs.map((slug) => `/tools/${slug}/`), '/education-statistics/'];

const stubSource = readFileSync(join(root, 'src/data/removedRedirects.ts'), 'utf8');
const stubs = [...stubSource.matchAll(/\{\s*from:\s*'([^']+)',\s*to:\s*'([^']+)'\s*\}/g)].map((m) => ({ from: m[1], to: m[2] }));
const maxStubs = Number(stubSource.match(/MAX_REMOVED_REDIRECTS\s*=\s*(\d+)/)?.[1] ?? 30);
const stubFromSet = new Set(stubs.map((s) => s.from));

// ---- 1. sitemap == INDEXABLE_PATHS ----
const sitemapIndex = readFileSync(join(dist, 'sitemap.xml'), 'utf8');
const sitemapUrls = [];
for (const m of sitemapIndex.matchAll(/<loc>([^<]+)<\/loc>/g)) {
  const child = new URL(m[1]).pathname.slice(1);
  const childFile = join(dist, child);
  if (!existsSync(childFile)) {
    fail(`sitemap index child is missing: ${child}`);
    continue;
  }
  const xml = readFileSync(childFile, 'utf8');
  for (const u of xml.matchAll(/<url>[\s\S]*?<loc>([^<]+)<\/loc>[\s\S]*?<\/url>/g)) sitemapUrls.push(u[1]);
  if (/hreflang="(es|fr|de|hi)"/.test(xml)) fail(`${child} contains a removed-locale hreflang alternate.`);
}
const expectedUrls = new Set(indexable.map((p) => `${origin}${p}`));
if (new Set(sitemapUrls).size !== sitemapUrls.length) fail('Sitemap contains duplicate URLs.');
// P2 batch 4: every sitemap file that is built must be listed in the index (no stray feeds that overlap
// with the listed ones), and no URL may sit in more than one file.
{
  const listed = new Set([...sitemapIndex.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname.slice(1)));
  const owner = new Map();
  for (const name of readdirSync(dist).filter((file) => /^sitemap-[^/]+\.xml$/.test(file))) {
    if (!listed.has(name)) fail(`${name} is built but not listed in sitemap.xml.`);
    const xml = readFileSync(join(dist, name), 'utf8');
    for (const u of xml.matchAll(/<url>[\s\S]*?<loc>([^<]+)<\/loc>[\s\S]*?<\/url>/g)) {
      if (owner.has(u[1])) fail(`${u[1]} appears in both ${owner.get(u[1])} and ${name}.`);
      else owner.set(u[1], name);
    }
  }
  for (const { from } of stubs) if (owner.has(`${origin}${from}`)) fail(`Redirect stub ${from} must not be in a sitemap.`);
}
for (const url of expectedUrls) if (!sitemapUrls.includes(url)) fail(`Sitemap is missing indexable URL: ${url}`);
for (const url of sitemapUrls) if (!expectedUrls.has(url)) fail(`Sitemap contains a URL outside INDEXABLE_PATHS: ${url}`);

// ---- 2/3. indexable pages ----
for (const route of indexable) {
  const file = fileOf(route);
  if (!existsSync(file)) {
    fail(`${route}: indexable page was not built.`);
    continue;
  }
  const html = readFileSync(file, 'utf8');
  if (canonicalOf(html) !== `${origin}${route}`) fail(`${route}: canonical is not self (${canonicalOf(html) || 'missing'}).`);
  if (/noindex/i.test(metaRobots(html))) fail(`${route}: indexable page is noindex.`);
  const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? '';
  if (!title.includes('FunnyTools')) fail(`${route}: <title> lacks the FunnyTools brand.`);
}

for (const route of authoredRoutes) {
  const file = fileOf(route);
  if (!existsSync(file)) continue;
  const html = readFileSync(file, 'utf8');
  const byline = html.match(/<p class="author-byline"[^>]*>[\s\S]*?<\/p>/)?.[0] ?? '';
  if (!byline.includes('Benson Lai') || !byline.includes('href="/about/"') || !/<time datetime="\d{4}-\d{2}-\d{2}"/.test(byline)) {
    fail(`${route}: missing Benson Lai byline with /about/ link and review date.`);
  }
  const person = jsonLd(html).map((item) => item.author).find((author) => author?.['@type'] === 'Person');
  if (!person || person.name !== 'Benson Lai' || person.url !== `${origin}/about/`) fail(`${route}: JSON-LD author must be Person "Benson Lai" -> ${origin}/about/.`);
}

// ---- merge-pdf: kept, but noindex and outside the sitemap ----
{
  const file = fileOf('/tools/merge-pdf/');
  if (!existsSync(file)) fail('/tools/merge-pdf/ must still be built (feature kept for existing visitors).');
  else if (!/noindex/i.test(metaRobots(readFileSync(file, 'utf8')))) fail('/tools/merge-pdf/ must be noindex.');
}

// ---- 4. whole-dist checks ----
const htmlFiles = walk(dist).filter((f) => f.endsWith('.html'));
const removedTopLevel = ['blog', 'workflows', 'for', 'shop', 'find-tools', 'wedding-seating-conflict-solver', 'iep-progress-ledger'];
let stubCount = 0;
for (const file of htmlFiles) {
  const route = routeOf(file);
  const html = readFileSync(file, 'utf8');

  for (const item of jsonLd(html)) {
    if (item.parseError) fail(`${route}: invalid JSON-LD.`);
    const type = item['@type'];
    if (type === 'FAQPage' || type === 'HowTo') fail(`${route}: ${type} structured data must not be emitted.`);
  }
  if (/<link\b[^>]*hreflang=["'](?:es|fr|de|hi)\b/i.test(html)) fail(`${route}: emits a removed-locale hreflang.`);
  const visible = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
  if (/免費線上工具箱|FreeTools\.win|\bFreeTools\b/.test(visible)) fail(`${route}: old brand string found.`);

  const parts = route.split('/').filter(Boolean);
  const section = parts[0] === 'en' ? parts[1] : parts[0];
  const isRegisteredStub = stubFromSet.has(route);
  if (removedTopLevel.includes(section ?? '')) fail(`${route}: belongs to a removed section.`);
  if ((section === 'es' || section === 'fr') && parts[0] !== 'en' && !isRegisteredStub) fail(`${route}: es/fr page is not a registered redirect stub.`);
  if (parts[0] === 'guides' && parts.length >= 2 && !indexableSet.has(route) && !isRegisteredStub) fail(`${route}: removed guide page is still built.`);
  // P2 batch 4: the guide and the statistics category were merged away; only their redirect stubs may be built.
  if (parts[0] === 'en' && parts[1] === 'guides') fail(`${route}: removed guide page is still built.`);
  if (parts[0] === 'category' && !isRegisteredStub) fail(`${route}: removed category page is still built.`);
  if (parts[0] === 'en' && parts[1] === 'category') fail(`${route}: removed category page is still built.`);
}

// ---- 5. redirect stubs ----
if (stubs.length > maxStubs) fail(`There are ${stubs.length} redirect stubs; the budget is ${maxStubs}.`);
for (const { from, to } of stubs) {
  stubCount += 1;
  if (!indexableSet.has(to)) fail(`Stub ${from} targets ${to}, which is not an indexable page.`);
  const file = fileOf(from);
  if (!existsSync(file)) {
    fail(`Stub ${from} was not built.`);
    continue;
  }
  const html = readFileSync(file, 'utf8');
  if (metaRobots(html) !== 'noindex,follow') fail(`Stub ${from} must be noindex,follow.`);
  if (canonicalOf(html) !== `${origin}${to}`) fail(`Stub ${from} canonical must be ${origin}${to}.`);
  if (!html.includes(`http-equiv="refresh" content="0; url=${to}"`)) fail(`Stub ${from} must meta-refresh to ${to}.`);
}

// ---- 6. main navigation and home must not push the general tools ----
{
  const home = readFileSync(fileOf('/'), 'utf8');
  const nav = home.match(/<header class="site-nav"[\s\S]*?<\/header>/)?.[0] ?? '';
  for (const href of [...nav.matchAll(/href="([^"]+)"/g)].map((m) => m[1])) {
    if (href.startsWith('/') && !href.startsWith('//') && !indexableSet.has(href)) fail(`Main navigation links to a non-retained page: ${href}`);
  }
  const heroAndGroups = home.match(/<div class="wrap"[\s\S]*?<\/div>\s*<\/main>/)?.[0] ?? '';
  for (const href of [...heroAndGroups.matchAll(/href="(\/tools\/[^"]+)"/g)].map((m) => m[1])) {
    if (!indexableSet.has(href)) fail(`Homepage main area links to a general tool: ${href}`);
  }
}

const summary = {
  status: failures.length ? 'FAIL' : 'PASS',
  builtHtmlPages: htmlFiles.length,
  indexableRoutes: indexable.length,
  sitemapUrls: sitemapUrls.length,
  redirectStubs: stubCount,
  redirectStubBudget: maxStubs,
  authoredPagesChecked: authoredRoutes.length,
  failures,
};
console.log(JSON.stringify(summary, null, 2));
if (failures.length) process.exit(1);
