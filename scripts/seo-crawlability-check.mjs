import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = process.cwd();
const distDir = join(root, 'dist');
const robotsPath = join(distDir, 'robots.txt');
const sitemapPath = join(distDir, 'sitemap.xml');
const siteOrigin = 'https://funnytools.win';
const expectedRobots = [
  'User-agent: *',
  'Allow: /',
  '',
  'Sitemap: https://funnytools.win/sitemap.xml',
].join('\n');

const failures = [];
const warnings = [];

function fail(message) {
  failures.push(message);
}

function warn(message) {
  warnings.push(message);
}

function normalizeNewlines(value) {
  return value.replace(/\r\n/g, '\n').trim();
}

function walk(dir, predicate, output = []) {
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

function routeFromHtml(file) {
  const rel = relative(distDir, file).replaceAll('\\', '/');
  if (rel === 'index.html') return '/';
  if (rel.endsWith('/index.html')) return `/${rel.slice(0, -'index.html'.length)}`;
  return `/${rel.replace(/\.html$/, '/')}`;
}

function attr(tag, name) {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return tag.match(new RegExp(`${escaped}\\s*=\\s*["']([^"']*)["']`, 'i'))?.[1]?.trim() ?? '';
}

function decodeXml(value) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");
}

function parseTag(block, tagName) {
  const matches = [...block.matchAll(new RegExp(`<${tagName}>([\\s\\S]*?)<\\/${tagName}>`, 'g'))].map((match) => decodeXml(match[1].trim()));
  return matches;
}

function validateRobots() {
  if (!existsSync(robotsPath)) {
    fail('dist/robots.txt is missing. Run npm.cmd run build before seo:check.');
    return;
  }

  const robots = normalizeNewlines(readFileSync(robotsPath, 'utf8'));
  if (robots !== expectedRobots) fail('dist/robots.txt does not match the expected crawl-allowing content.');
  if (!/^User-agent:\s*\*$/im.test(robots)) fail('robots.txt missing User-agent: *.');
  if (!/^Allow:\s*\/$/im.test(robots)) fail('robots.txt missing Allow: /.');
  if (/^Disallow:\s*\/\s*$/im.test(robots)) fail('robots.txt blocks all crawling with Disallow: /.');
  if (!/^Sitemap:\s*https:\/\/funnytools\.win\/sitemap\.xml$/im.test(robots)) fail('robots.txt missing the expected sitemap URL.');
}

function validateSitemap() {
  if (!existsSync(sitemapPath)) {
    fail('dist/sitemap.xml is missing. Run npm.cmd run build before seo:check.');
    return;
  }

  const sitemap = readFileSync(sitemapPath, 'utf8');
  if (!sitemap.startsWith('<?xml version="1.0" encoding="UTF-8"?>')) fail('sitemap.xml must start with the XML declaration.');
  if (!/<urlset\s+[^>]*xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9"/.test(sitemap)) fail('sitemap.xml missing urlset sitemap namespace.');
  if (!sitemap.trim().endsWith('</urlset>')) fail('sitemap.xml must end with </urlset>.');
  for (const pattern of [/monthly0\.6https/i, /daily0\.8https/i, /weekly0\.7https/i, /yearly0\.3https/i]) {
    if (pattern.test(sitemap)) fail(`sitemap.xml contains broken concatenated text matching ${pattern}.`);
  }

  const withoutTags = sitemap
    .replace(/^<\?xml[^>]*\?>\s*/i, '')
    .replace(/<\/?urlset\b[^>]*>/gi, '')
    .replace(/<url>[\s\S]*?<\/url>/gi, '')
    .trim();
  if (withoutTags) fail('sitemap.xml contains text outside <url> entries.');

  const urlBlocks = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((match) => match[1]);
  if (!urlBlocks.length) fail('sitemap.xml contains no <url> entries.');

  const htmlFiles = walk(distDir, (file) => file.endsWith('.html'));
  const routeToFile = new Map(htmlFiles.map((file) => [routeFromHtml(file), file]));
  const locs = [];

  urlBlocks.forEach((block, index) => {
    const entryNumber = index + 1;
    const loc = parseTag(block, 'loc');
    const lastmod = parseTag(block, 'lastmod');
    const changefreq = parseTag(block, 'changefreq');
    const priority = parseTag(block, 'priority');

    if (loc.length !== 1) fail(`sitemap entry ${entryNumber} must contain exactly one <loc>.`);
    if (lastmod.length !== 1) fail(`sitemap entry ${entryNumber} must contain exactly one <lastmod>.`);
    if (changefreq.length !== 1) fail(`sitemap entry ${entryNumber} must contain exactly one <changefreq>.`);
    if (priority.length !== 1) fail(`sitemap entry ${entryNumber} must contain exactly one <priority>.`);
    if (lastmod[0] && !/^\d{4}-\d{2}-\d{2}$/.test(lastmod[0])) fail(`sitemap entry ${entryNumber} has invalid lastmod: ${lastmod[0]}.`);
    if (changefreq[0] && !/^(always|hourly|daily|weekly|monthly|yearly|never)$/.test(changefreq[0])) fail(`sitemap entry ${entryNumber} has invalid changefreq: ${changefreq[0]}.`);
    if (priority[0] && !/^(0(\.\d)?|1(\.0)?)$/.test(priority[0])) fail(`sitemap entry ${entryNumber} has invalid priority: ${priority[0]}.`);
    if (!loc[0]) return;

    let parsed;
    try {
      parsed = new URL(loc[0]);
    } catch {
      fail(`sitemap entry ${entryNumber} has an invalid URL: ${loc[0]}.`);
      return;
    }

    locs.push(loc[0]);
    if (parsed.protocol !== 'https:') fail(`${loc[0]} must use HTTPS.`);
    if (parsed.hostname !== 'funnytools.win') fail(`${loc[0]} must use funnytools.win.`);
    if (parsed.search || parsed.hash) fail(`${loc[0]} must not include query strings or fragments.`);
    const nonProductionSegments = parsed.pathname.split('/').filter(Boolean).filter((segment) => ['staging', 'test', 'dev'].includes(segment.toLowerCase()));
    const nonProductionHost = /(^|\.)((staging|test|dev)\.)/i.test(parsed.hostname);
    if (/localhost|127\.0\.0\.1/i.test(loc[0]) || nonProductionHost || nonProductionSegments.length) {
      fail(`${loc[0]} looks like a non-production URL.`);
    }
    if (!routeToFile.has(parsed.pathname)) {
      fail(`${loc[0]} does not map to a built HTML route in dist.`);
      return;
    }

    const html = readFileSync(routeToFile.get(parsed.pathname), 'utf8');
    const metaTags = [...html.matchAll(/<meta\b[^>]*>/gi)].map((match) => match[0]);
    const robots = metaTags.find((tag) => attr(tag, 'name').toLowerCase() === 'robots');
    if (robots && /\bnoindex\b/i.test(attr(robots, 'content'))) fail(`${loc[0]} is listed in the sitemap but has noindex.`);

    const canonicalTag = [...html.matchAll(/<link\b[^>]*>/gi)]
      .map((match) => match[0])
      .find((tag) => attr(tag, 'rel').toLowerCase() === 'canonical');
    const canonical = canonicalTag ? attr(canonicalTag, 'href') : '';
    if (!canonical) fail(`${loc[0]} is missing a canonical link in built HTML.`);
    if (canonical && canonical !== loc[0]) fail(`${loc[0]} canonical mismatch: ${canonical}.`);
  });

  const duplicateLocs = locs.filter((loc, index) => locs.indexOf(loc) !== index);
  if (duplicateLocs.length) fail(`sitemap.xml contains duplicate URLs: ${[...new Set(duplicateLocs)].slice(0, 10).join(', ')}.`);

  const routeSet = new Set(locs.map((loc) => new URL(loc).pathname));
  const inbound = new Map([...routeSet].map((route) => [route, 0]));
  for (const file of htmlFiles) {
    const html = readFileSync(file, 'utf8');
    for (const match of html.matchAll(/<a\b[^>]*>/gi)) {
      const href = attr(match[0], 'href');
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) continue;
      let pathname = '';
      if (href.startsWith('/')) {
        pathname = href.split('#')[0].split('?')[0];
      } else if (href.startsWith(siteOrigin)) {
        pathname = new URL(href).pathname;
      }
      if (inbound.has(pathname)) inbound.set(pathname, inbound.get(pathname) + 1);
    }
  }

  const orphanRoutes = [...inbound.entries()]
    .filter(([route, count]) => count === 0 && route !== '/')
    .map(([route]) => route);
  if (orphanRoutes.length) warn(`Sitemap routes without detected internal inbound links: ${orphanRoutes.slice(0, 20).join(', ')}${orphanRoutes.length > 20 ? '...' : ''}`);

  return {
    urls: locs.length,
    uniqueUrls: new Set(locs).size,
    sample: locs.slice(0, 3),
    orphanRoutes,
  };
}

validateRobots();
const sitemapSummary = validateSitemap() ?? { urls: 0, uniqueUrls: 0, sample: [], orphanRoutes: [] };

const summary = {
  robots: existsSync(robotsPath) ? 'present' : 'missing',
  sitemapUrls: sitemapSummary.urls,
  uniqueSitemapUrls: sitemapSummary.uniqueUrls,
  sampleUrls: sitemapSummary.sample,
  warnings,
  failures,
};

console.log(JSON.stringify(summary, null, 2));

if (failures.length) {
  process.exitCode = 1;
}
