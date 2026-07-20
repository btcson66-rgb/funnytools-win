import { existsSync, readFileSync, readdirSync, statSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)));
const distDir = join(rootDir, 'dist');
const reportsDir = join(rootDir, 'seo-system', 'reports');
const baselinePath = join(rootDir, 'seo-system', 'baselines', 'seo-collapse-baseline.json');
const siteOrigin = 'https://funnytools.win';
const liveMode = process.argv.includes('--live');
const writeReports = !process.argv.includes('--no-write');
const timeoutMs = 12_000;
const concurrency = 4;
const failures = [];
const warnings = [];

const corePaths = [
  '/',
  '/tools/t-score-calculator/',
  '/tools/grade-average/',
  '/tools/teacher-exam-score-converter/',
  '/tools/random-name-picker/',
  '/tools/z-score-calculator/',
  '/tools/merge-pdf/',
  '/tools/image-compressor/',
  '/en/tools/this-or-that/',
  '/guides/t-score-calculator-guide/',
  '/blog/image-compression-quality-guide/',
  '/category/statistics/',
  '/support/',
];

function listFiles(dir, suffix) {
  if (!existsSync(dir)) return [];
  const files = [];
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) files.push(...listFiles(path, suffix));
    else if (path.endsWith(suffix)) files.push(path);
  }
  return files;
}

function attr(tag, name) {
  const match = tag.match(new RegExp(`\\b${name}\\s*=\\s*["']([^"']*)["']`, 'i'));
  return match?.[1]?.trim() ?? '';
}

function headFacts(html) {
  const links = [...html.matchAll(/<link\b[^>]*>/gi)].map((match) => match[0]);
  const metas = [...html.matchAll(/<meta\b[^>]*>/gi)].map((match) => match[0]);
  const canonicalTags = links.filter((tag) => attr(tag, 'rel').toLowerCase() === 'canonical');
  const canonical = canonicalTags[0] ? attr(canonicalTags[0], 'href') : '';
  const robots = metas
    .filter((tag) => attr(tag, 'name').toLowerCase() === 'robots')
    .map((tag) => attr(tag, 'content'))
    .join(', ');
  const hreflang = links
    .filter((tag) => attr(tag, 'rel').toLowerCase() === 'alternate' && attr(tag, 'hreflang'))
    .map((tag) => ({ lang: attr(tag, 'hreflang'), href: attr(tag, 'href') }));
  return {
    canonicalTags: canonicalTags.length,
    canonical,
    robots,
    noindex: /\bnoindex\b/i.test(robots),
    title: html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.replace(/\s+/g, ' ').trim() ?? '',
    h1: html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1]?.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() ?? '',
    hreflang,
  };
}

function routeToFile(url) {
  const pathname = new URL(url).pathname;
  if (pathname === '/') return join(distDir, 'index.html');
  if (pathname.endsWith('/')) return join(distDir, pathname.slice(1), 'index.html');
  return join(distDir, pathname.slice(1));
}

function parseLocs(xml, parentTag) {
  const blocks = [...xml.matchAll(new RegExp(`<${parentTag}>([\\s\\S]*?)<\\/${parentTag}>`, 'gi'))];
  return blocks.map((match) => match[1].match(/<loc>([\s\S]*?)<\/loc>/i)?.[1]?.trim()).filter(Boolean);
}

function localSitemapUrls() {
  const indexPath = join(distDir, 'sitemap.xml');
  if (!existsSync(indexPath)) return [];
  const xml = readFileSync(indexPath, 'utf8');
  const children = parseLocs(xml, 'sitemap');
  const urls = [];
  for (const child of children) {
    const parsed = new URL(child);
    const path = join(distDir, parsed.pathname.slice(1));
    if (!existsSync(path)) {
      failures.push(`Missing child sitemap: ${parsed.pathname}`);
      continue;
    }
    urls.push(...parseLocs(readFileSync(path, 'utf8'), 'url'));
  }
  return urls;
}

function auditLocal() {
  if (!existsSync(distDir)) throw new Error('dist/ is missing; run npm.cmd run build first.');
  const htmlFiles = listFiles(distDir, '.html');
  const sitemapUrls = localSitemapUrls();
  const sitemapSet = new Set(sitemapUrls);
  const indexable = [];
  let internalHttpLinks = 0;
  for (const file of htmlFiles) {
    const html = readFileSync(file, 'utf8');
    const facts = headFacts(html);
    internalHttpLinks += [...html.matchAll(/\b(?:href|src|action)\s*=\s*["']http:\/\/funnytools\.win(?:\/[^"']*)?["']/gi)].length;
    if (!facts.noindex && facts.canonical?.startsWith(siteOrigin)) indexable.push(facts.canonical);
  }

  for (const url of sitemapUrls) {
    if (!url.startsWith(`${siteOrigin}/`) && url !== `${siteOrigin}/`) failures.push(`Non-canonical sitemap URL: ${url}`);
    const file = routeToFile(url);
    if (!existsSync(file)) {
      failures.push(`Sitemap URL has no built file: ${url}`);
      continue;
    }
    const facts = headFacts(readFileSync(file, 'utf8'));
    if (facts.canonicalTags !== 1) failures.push(`${url} has ${facts.canonicalTags} canonical tags.`);
    if (facts.canonical !== url) failures.push(`${url} canonical mismatch: ${facts.canonical || '(missing)'}`);
    if (facts.noindex) failures.push(`${url} is both noindex and in sitemap.`);
    if (!facts.title || !facts.h1) failures.push(`${url} is missing rendered title or H1.`);
  }
  if (sitemapUrls.length !== sitemapSet.size) failures.push(`Sitemap has ${sitemapUrls.length - sitemapSet.size} duplicate URL(s).`);
  if (internalHttpLinks) failures.push(`Built HTML contains ${internalHttpLinks} internal http:// link(s).`);
  const orphanIndexable = [...new Set(indexable)].filter((url) => !sitemapSet.has(url));
  if (orphanIndexable.length) failures.push(`${orphanIndexable.length} indexable page(s) are absent from sitemap: ${orphanIndexable.slice(0, 8).join(', ')}`);

  const summary = {
    buildPages: htmlFiles.length,
    indexablePages: new Set(indexable).size,
    sitemapUrls: sitemapUrls.length,
    internalHttpLinks,
    orphanIndexable,
  };
  if (existsSync(baselinePath)) {
    const baseline = JSON.parse(readFileSync(baselinePath, 'utf8'));
    for (const key of ['buildPages', 'indexablePages', 'sitemapUrls']) {
      if (baseline[key] && summary[key] < baseline[key] * 0.9) {
        failures.push(`${key} fell more than 10%: baseline=${baseline[key]}, current=${summary[key]}.`);
      }
    }
  } else {
    warnings.push('SEO collapse baseline is missing.');
  }
  return { ...summary, corePaths };
}

async function fetchWithTimeout(url, redirect = 'follow') {
  try {
    const response = await fetch(url, {
      redirect,
      signal: AbortSignal.timeout(timeoutMs),
      headers: { 'user-agent': 'FunnyTools-SEO-Collapse-Audit/1.0' },
    });
    return { response, body: await response.text() };
  } catch (error) {
    return { error: error.message };
  }
}

async function redirectChain(url, maxHops = 6) {
  const hops = [];
  let current = url;
  for (let index = 0; index <= maxHops; index += 1) {
    const result = await fetchWithTimeout(current, 'manual');
    if (result.error) return { url, hops, error: result.error };
    const location = result.response.headers.get('location');
    hops.push({ url: current, status: result.response.status, location });
    if (!location || ![301, 302, 303, 307, 308].includes(result.response.status)) break;
    current = new URL(location, current).href;
  }
  return { url, hops, finalUrl: hops.at(-1)?.url, finalStatus: hops.at(-1)?.status };
}

async function pooled(items, worker) {
  const output = new Array(items.length);
  let cursor = 0;
  async function run() {
    while (cursor < items.length) {
      const index = cursor++;
      output[index] = await worker(items[index]);
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, run));
  return output;
}

async function liveSitemapUrls() {
  const indexResult = await fetchWithTimeout(`${siteOrigin}/sitemap.xml`);
  if (indexResult.error || indexResult.response.status !== 200) {
    failures.push(`Live sitemap index failed: ${indexResult.error || indexResult.response.status}`);
    return [];
  }
  const children = parseLocs(indexResult.body, 'sitemap');
  const childResults = await pooled(children, async (url) => ({ url, ...(await fetchWithTimeout(url)) }));
  const urls = [];
  for (const item of childResults) {
    if (item.error || item.response.status !== 200) failures.push(`Live child sitemap failed: ${item.url}`);
    else urls.push(...parseLocs(item.body, 'url'));
  }
  return urls;
}

async function auditLive(local) {
  const sitemapUrls = await liveSitemapUrls();
  const sitemapSet = new Set(sitemapUrls);
  const pageResults = await pooled(sitemapUrls, async (url) => {
    const result = await fetchWithTimeout(url);
    if (result.error) return { url, error: result.error };
    const facts = headFacts(result.body);
    return { url, status: result.response.status, finalUrl: result.response.url, ...facts };
  });
  for (const page of pageResults) {
    if (page.error) failures.push(`Live fetch failed: ${page.url}: ${page.error}`);
    else if (page.status !== 200 || page.finalUrl !== page.url) failures.push(`Live sitemap URL is not direct 200: ${page.url} -> ${page.status} ${page.finalUrl}`);
    else if (page.canonicalTags !== 1 || page.canonical !== page.url || page.noindex) failures.push(`Live SEO conflict: ${page.url}; canonical=${page.canonical}; noindex=${page.noindex}`);
  }
  if (sitemapUrls.length !== sitemapSet.size) failures.push('Live sitemap contains duplicate URLs.');
  if (local && sitemapSet.size !== local.sitemapUrls) failures.push(`Local/live sitemap count mismatch: local=${local.sitemapUrls}, live=${sitemapSet.size}.`);

  const core = await pooled(corePaths, async (path) => {
    const httpsUrl = new URL(path, `${siteOrigin}/`).href;
    const httpUrl = httpsUrl.replace('https://', 'http://');
    return {
      path,
      https: await redirectChain(httpsUrl),
      http: await redirectChain(httpUrl),
    };
  });
  for (const item of core) {
    if (item.https.hops.length !== 1 || item.https.finalStatus !== 200) failures.push(`HTTPS core URL is not direct 200: ${item.path}`);
    if (item.http.hops.length !== 2 || item.http.hops[0]?.status !== 301 || item.http.finalUrl !== new URL(item.path, `${siteOrigin}/`).href || item.http.finalStatus !== 200) {
      failures.push(`HTTP core URL is not a single 301 to matching HTTPS: ${item.path}`);
    }
  }
  const wwwHttp = await redirectChain('http://www.funnytools.win/');
  if (wwwHttp.hops.length > 2) warnings.push(`www HTTP uses ${wwwHttp.hops.length - 1} redirects; consolidate to one Cloudflare 301.`);
  return { sitemapUrls: sitemapSet.size, pagesChecked: pageResults.length, core, wwwHttp };
}

function renderMarkdown(report) {
  return [
    '# SEO Collapse Audit',
    '',
    `Generated: ${report.generatedAt}`,
    `Mode: ${report.mode}`,
    '',
    `- Build pages: ${report.local.buildPages}`,
    `- Indexable pages: ${report.local.indexablePages}`,
    `- Local sitemap URLs: ${report.local.sitemapUrls}`,
    `- Internal HTTP links: ${report.local.internalHttpLinks}`,
    `- Live sitemap URLs: ${report.live?.sitemapUrls ?? 'not checked'}`,
    '',
    '## Failures',
    '',
    ...(report.failures.length ? report.failures.map((item) => `- ${item}`) : ['- None']),
    '',
    '## Warnings',
    '',
    ...(report.warnings.length ? report.warnings.map((item) => `- ${item}`) : ['- None']),
    '',
  ].join('\n');
}

const local = auditLocal();
const live = liveMode ? await auditLive(local) : null;
const report = {
  generatedAt: new Date().toISOString(),
  mode: liveMode ? 'local+live' : 'local',
  local,
  live,
  failures,
  warnings,
};
if (writeReports) {
  mkdirSync(reportsDir, { recursive: true });
  writeFileSync(join(reportsDir, 'seo-collapse-audit.json'), `${JSON.stringify(report, null, 2)}\n`, 'utf8');
  writeFileSync(join(reportsDir, 'seo-collapse-audit.md'), renderMarkdown(report), 'utf8');
}
console.log(JSON.stringify({ mode: report.mode, local, live: live ? { sitemapUrls: live.sitemapUrls, pagesChecked: live.pagesChecked } : null, failures, warnings }, null, 2));
if (failures.length) process.exit(1);
