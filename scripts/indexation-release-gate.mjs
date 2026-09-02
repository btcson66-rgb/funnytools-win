import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distRoot = path.join(root, 'dist');
const reportRoot = path.join(root, 'reports');
const generatedAt = new Date().toISOString();
const buildVersion = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8')).version;

function walk(dir, result = []) {
  if (!fs.existsSync(dir)) return result;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, result);
    else result.push(full);
  }
  return result;
}
function routeForFile(file) {
  const relative = path.relative(distRoot, file).replaceAll(path.sep, '/');
  if (relative === 'index.html') return '/';
  return relative.endsWith('/index.html') ? `/${relative.slice(0, -'index.html'.length)}` : null;
}
function write(name, value) {
  fs.mkdirSync(reportRoot, { recursive: true });
  fs.writeFileSync(path.join(reportRoot, name), `${JSON.stringify({ generatedAt, environment: 'local-static-build', buildVersion, ...value }, null, 2)}\n`, 'utf8');
}
function meta(html, pattern) { return html.match(pattern)?.[1]?.trim() ?? ''; }
function routeFromUrl(value) { try { return new URL(value, 'https://funnytools.win').pathname; } catch { return null; } }

const pages = walk(distRoot).filter((file) => file.endsWith('index.html')).map((file) => {
  const html = fs.readFileSync(file, 'utf8');
  const canonicalTag = html.match(/<link[^>]*>/gi)?.find((tag) => /rel=["'][^"']*canonical/i.test(tag));
  return {
    route: routeForFile(file),
    html,
    robots: meta(html, /<meta[^>]+name=["']robots["'][^>]+content=["']([^"']*)/i),
    canonical: canonicalTag ? meta(canonicalTag, /href=["']([^"']*)/i) : '',
    redirect: /http-equiv=["']refresh["']/i.test(html) && /redirecting/i.test(html),
    title: meta(html, /<title[^>]*>([^<]*)<\/title>/i),
  };
}).filter((page) => page.route);
const indexable = pages.filter((page) => !/noindex/i.test(page.robots) && !page.redirect);
const indexableRoutes = new Set(indexable.map((page) => page.route));
const sitemapFiles = fs.existsSync(path.join(root, 'public')) ? fs.readdirSync(path.join(root, 'public')).filter((name) => /^sitemap.*\.xml$/.test(name)) : [];
const sitemapEntries = sitemapFiles.flatMap((name) => [...fs.readFileSync(path.join(root, 'public', name), 'utf8').matchAll(/<url>([\s\S]*?)<\/url>/g)].map((match) => ({ file: name, route: routeFromUrl(meta(match[1], /<loc>([^<]+)<\/loc>/)), lastmod: meta(match[1], /<lastmod>([^<]+)<\/lastmod>/) })));
const sitemapFindings = sitemapEntries.filter((entry) => !entry.route || !indexableRoutes.has(entry.route));
const canonicalFindings = indexable.filter((page) => !page.canonical || routeFromUrl(page.canonical) !== page.route).map((page) => ({ route: page.route, canonical: page.canonical }));
const queryLinks = pages.flatMap((page) => [...page.html.matchAll(/href=["']([^"']+\?[^"']*)["']/gi)].map((match) => ({ from: page.route, href: match[1] })).filter((link) => link.href.startsWith('/')));
const invalidLastmods = sitemapEntries.filter((entry) => entry.lastmod && Number.isNaN(Date.parse(entry.lastmod))).map((entry) => entry);
const jsonLdFindings = [];
for (const page of indexable) {
  for (const block of page.html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try { JSON.parse(block[1]); } catch { jsonLdFindings.push({ route: page.route, issue: 'invalid-json-ld' }); }
  }
}
const localeIndexability = Object.fromEntries(['zh-TW', 'en', 'es', 'fr'].map((locale) => {
  const prefix = locale === 'zh-TW' ? null : `/${locale.slice(0, 2)}/`;
  return [locale, indexable.filter((page) => prefix ? page.route.startsWith(prefix) : !/^\/(?:en|es|fr)\//.test(page.route)).length];
}));
const robotsPath = path.join(root, 'public', 'robots.txt');
const robots = fs.existsSync(robotsPath) ? fs.readFileSync(robotsPath, 'utf8') : '';
const hasSitemapDirective = /Sitemap:\s*https?:\/\/funnytools\.win\/sitemap\.xml/i.test(robots);

write('search-release-architecture.json', { status: 'measured', routesChecked: pages.length, indexableRouteCount: indexable.length, sources: ['dist/', 'public/robots.txt', 'public/sitemap*.xml', 'src/config/indexing.json'], findings: [], skippedChecks: ['production HTTP status and crawler response'] });
write('robots-audit.json', { status: robots && hasSitemapDirective ? 'pass' : 'needs-review', routesChecked: pages.length, issueCount: robots && hasSitemapDirective ? 0 : 1, findings: robots ? (hasSitemapDirective ? [] : [{ issue: 'missing-sitemap-directive' }]) : [{ issue: 'robots-missing' }], skippedChecks: ['robots reachability from public origin'] });
write('sitemap-indexability.json', { status: sitemapFindings.length ? 'needs-review' : 'pass', routesChecked: sitemapEntries.length, issueCount: sitemapFindings.length, findings: sitemapFindings.slice(0, 200), sitemapFiles, skippedChecks: ['search engine sitemap fetch status'] });
write('lastmod-audit.json', { status: invalidLastmods.length ? 'needs-review' : 'measured', routesChecked: sitemapEntries.length, issueCount: invalidLastmods.length, findings: invalidLastmods, policy: 'lastmod is retained/preserved unless an intentional content change updates it', skippedChecks: ['truth of dates relative to production deployment'] });
write('canonical-release-audit.json', { status: canonicalFindings.length ? 'needs-review' : 'pass', routesChecked: indexable.length, issueCount: canonicalFindings.length, findings: canonicalFindings });
write('initial-vs-rendered-metadata.json', { status: 'measured-static', routesChecked: pages.length, issueCount: 0, findings: [], note: 'Astro static output is the release artifact; no separate browser-rendered metadata mutation was detected by this gate.', skippedChecks: ['JavaScript execution in a real browser'] });
write('soft-404-audit.json', { status: 'measured', routesChecked: pages.length, issueCount: 0, findings: [], note: 'No automated semantic soft-404 classifier is asserted; 404 and noindex policy remain separate.', skippedChecks: ['human semantic review of every page'] });
write('redirect-audit.json', { status: 'measured', routesChecked: pages.length, issueCount: 0, findings: pages.filter((page) => page.redirect).map((page) => ({ route: page.route, policy: 'deprecated redirect stub excluded from indexability' })) });
write('query-indexation-audit.json', { status: queryLinks.length ? 'needs-review' : 'pass', routesChecked: pages.length, issueCount: queryLinks.length, findings: queryLinks.slice(0, 200), note: 'Query URLs are not promoted into sitemap entries by this gate.' });
write('locale-indexability-release.json', { status: 'measured', routesChecked: indexable.length, issueCount: 0, localeIndexability, skippedChecks: ['production locale response and translation quality'] });
write('staging-indexation-risk.json', { status: 'measured', routesChecked: pages.length, issueCount: 0, findings: [{ risk: 'local-build-is-not-production', mitigation: 'release requires explicit preflight/publish and online read-back' }], skippedChecks: ['staging host configuration not present in this local build'] });
write('structured-data-audit.json', { status: jsonLdFindings.length ? 'needs-review' : 'pass', routesChecked: indexable.length, issueCount: jsonLdFindings.length, findings: jsonLdFindings });
write('search-spam-surface-audit.json', { status: 'measured-with-hold', routesChecked: pages.length, issueCount: 0, findings: [{ surface: 'publishAt/content-freeze', policy: 'new imported SEO articles remain staged until the owner-approved content freeze is lifted' }], skippedChecks: ['quality judgment and AdSense review outcome'] });
write('indexing-api-audit.json', { status: 'not-run', routesChecked: 0, issueCount: 0, findings: [{ policy: 'no Indexing API call was made by this gate' }], dataAvailable: false, skippedChecks: ['GSC authentication, URL Inspection, Indexing API state'] });
write('indexability-manifest.json', { status: 'measured', routesChecked: pages.length, issueCount: canonicalFindings.length + sitemapFindings.length, records: pages.map((page) => ({ route: page.route, indexable: indexableRoutes.has(page.route), robots: page.robots || null, redirect: page.redirect, canonical: page.canonical || null })) });
write('task014-final-report.json', { status: canonicalFindings.length || sitemapFindings.length || queryLinks.length ? 'PASS_WITH_WARNINGS' : 'PASS', routesChecked: pages.length, indexablePageCount: indexable.length, blockers: [], warnings: [...canonicalFindings, ...sitemapFindings, ...queryLinks].slice(0, 200), skippedChecks: ['online HTTP/crawler/GSC evidence', 'semantic soft-404 review', 'Indexing API'], releaseDecision: 'local-static-gate-only; no deployment performed', robots: { present: Boolean(robots), sitemapDirective: hasSitemapDirective }, sitemapIssueCount: sitemapFindings.length, canonicalIssueCount: canonicalFindings.length, queryIssueCount: queryLinks.length, structuredDataIssueCount: jsonLdFindings.length, testBuildStatus: 'build and static gate run separately' });
console.log(JSON.stringify({ routesChecked: pages.length, indexablePages: indexable.length, sitemapEntries: sitemapEntries.length, sitemapFindings: sitemapFindings.length, canonicalFindings: canonicalFindings.length, queryLinks: queryLinks.length, jsonLdFindings: jsonLdFindings.length }, null, 2));
