import { execFileSync } from 'node:child_process';
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { createSign } from 'node:crypto';
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
  const metaTags = [...html.matchAll(/<meta\b[^>]*>/gi)].map((match) => match[0]);
  const linkTags = [...html.matchAll(/<link\b[^>]*>/gi)].map((match) => match[0]);
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
  if (pathname.startsWith('/en/')) return 'en';
  if (/^\/tools\/[^/]+\/$/.test(normalized)) return 'tools';
  if (normalized === '/guides/' || /^\/guides\/[^/]+\/$/.test(normalized)) return 'guides';
  if (normalized === '/workflows/' || /^\/workflows\/[^/]+\/$/.test(normalized)) return 'workflows';
  if (/^\/blog\/[^/]+\/$/.test(normalized)) return 'faq';
  return 'guides';
}

export function sitemapFileForType(type) {
  return {
    tools: 'sitemap-tools.xml',
    guides: 'sitemap-guides.xml',
    examples: 'sitemap-examples.xml',
    templates: 'sitemap-templates.xml',
    workflows: 'sitemap-workflows.xml',
    faq: 'sitemap-faq.xml',
    en: 'sitemap-en.xml',
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
    : ['sitemap-tools.xml', 'sitemap-guides.xml', 'sitemap-examples.xml', 'sitemap-templates.xml', 'sitemap-workflows.xml', 'sitemap-faq.xml', 'sitemap-en.xml'].map((name) => join(baseDir, name));
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

function gitDateForPath(path) {
  if (gitDateCache.has(path)) return gitDateCache.get(path);
  let value = '';
  try {
    value = execFileSync('git', ['log', '-1', '--format=%cs', '--', path], {
      cwd: rootDir,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
  } catch {
    value = '';
  }
  gitDateCache.set(path, value);
  return value;
}

export function sourceCandidatesForRoute(route) {
  const clean = route.replace(/^\/en\//, '/');
  const parts = clean.split('/').filter(Boolean);
  if (parts[0] === 'tools' && parts[1]) {
    return [
      'src/data/tools.ts',
      `src/i18n/tools/${parts[1]}.ts`,
      'src/i18n/tools/content-enhancements.ts',
      'src/pages/[...locale]/tools/[slug].astro',
    ];
  }
  if (parts[0] === 'category' && parts[1]) {
    return [
      'src/data/categories.ts',
      'src/data/categoryContent.ts',
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
      'src/pages/[...locale]/guides/index.astro',
      'src/pages/[...locale]/guides/[slug].astro',
    ];
  }
  if (parts[0] === 'workflows') {
    return [
      'src/data/workflows.ts',
      'src/data/seoGuides.ts',
      'src/pages/[...locale]/workflows/index.astro',
      'src/pages/[...locale]/workflows/[slug].astro',
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

export function lastmodForPage(page, previousLastmod = '') {
  const dates = sourceCandidatesForRoute(page.route)
    .filter((candidate) => existsSync(join(rootDir, candidate)))
    .map(gitDateForPath)
    .filter(Boolean)
    .sort();
  if (dates.length) return dates.at(-1);
  if (/^\d{4}-\d{2}-\d{2}$/.test(previousLastmod)) return previousLastmod;
  return statSync(page.file).mtime.toISOString().slice(0, 10);
}

export function urlSetXml(entries) {
  const rows = entries.map((entry) => [
    '  <url>',
    `    <loc>${escapeXml(entry.loc)}</loc>`,
    `    <lastmod>${escapeXml(entry.lastmod)}</lastmod>`,
    '  </url>',
  ].join('\n')).join('\n');
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
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
  return null;
}

export async function googleAccessToken(scope = 'https://www.googleapis.com/auth/webmasters') {
  const credentials = getServiceAccountCredentials();
  if (!credentials?.client_email || !credentials?.private_key) {
    throw new Error('Missing GSC service account credentials.');
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
