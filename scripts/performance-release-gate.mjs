import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distRoot = path.join(root, 'dist');
const reportRoot = path.join(root, 'reports');
const generatedAt = new Date().toISOString();
const buildVersion = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8')).version;
function walk(dir, result = []) { if (!fs.existsSync(dir)) return result; for (const entry of fs.readdirSync(dir, { withFileTypes: true })) { const full = path.join(dir, entry.name); entry.isDirectory() ? walk(full, result) : result.push(full); } return result; }
function routeForFile(file) { const relative = path.relative(distRoot, file).replaceAll(path.sep, '/'); if (relative === 'index.html') return '/'; return relative.endsWith('/index.html') ? `/${relative.slice(0, -'index.html'.length)}` : null; }
function write(name, value) { fs.mkdirSync(reportRoot, { recursive: true }); fs.writeFileSync(path.join(reportRoot, name), `${JSON.stringify({ generatedAt, environment: 'local-static-build', buildVersion, ...value }, null, 2)}\n`, 'utf8'); }

const htmlFiles = walk(distRoot).filter((file) => file.endsWith('index.html'));
const pages = htmlFiles.map((file) => ({ route: routeForFile(file), html: fs.readFileSync(file, 'utf8') })).filter((page) => page.route);
const assets = walk(path.join(distRoot, '_astro')).map((file) => ({ file: path.relative(distRoot, file).replaceAll(path.sep, '/'), bytes: fs.statSync(file).size })).sort((a, b) => b.bytes - a.bytes);
const assetBytes = assets.reduce((sum, asset) => sum + asset.bytes, 0);
const routeArchetypes = {
  home: pages.filter((page) => /^\/(?:en\/)?$/.test(page.route)).length,
  tool: pages.filter((page) => /\/tools\//.test(page.route)).length,
  guide: pages.filter((page) => /\/guides\//.test(page.route)).length,
  workflow: pages.filter((page) => /\/workflows\//.test(page.route)).length,
  other: pages.filter((page) => !/\/tools\/|\/guides\/|\/workflows\//.test(page.route)).length,
};
const externalHosts = new Map();
for (const page of pages) for (const match of page.html.matchAll(/(?:src|href)=["'](https?:\/\/[^"']+)/gi)) { try { const host = new URL(match[1]).host; externalHosts.set(host, (externalHosts.get(host) ?? 0) + 1); } catch {} }
const imageTags = pages.flatMap((page) => [...page.html.matchAll(/<img\b[^>]*>/gi)].map((match) => ({ route: page.route, tag: match[0] })));
const fontAssets = assets.filter((asset) => /\.(?:woff2?|ttf|otf)$/i.test(asset.file));
const hashedAssets = assets.filter((asset) => /[-.]([a-f0-9]{8,})\./i.test(asset.file));
const htmlBytes = pages.reduce((sum, page) => sum + Buffer.byteLength(page.html), 0);
const largestAssets = assets.slice(0, 30);
const heavyThreshold = 150 * 1024;
const heavyAssets = assets.filter((asset) => asset.bytes > heavyThreshold);
const swFiles = walk(distRoot).filter((file) => /service-worker|sw\.js$/i.test(file));

write('performance-architecture.json', { status: 'measured', routeCount: pages.length, archetypes: routeArchetypes, fieldDataAvailable: false, labDataAvailable: false, skippedReasons: ['no deployed RUM sample in this local audit', 'Lighthouse CI not run by this gate'] });
write('performance-baseline.json', { status: 'measured-build-only', routeCount: pages.length, measured: { htmlBytes, assetBytes, assetCount: assets.length }, baseline: 'No prior committed performance baseline was available; this is a current-build snapshot.', skippedReasons: ['p75 CWV', 'historical comparison'] });
write('page-archetype-routes.json', { status: 'measured', routeCount: pages.length, archetypes: routeArchetypes, sampleRoutes: Object.fromEntries(Object.entries(routeArchetypes).map(([key]) => [key, pages.filter((page) => key === 'home' ? /^\/(?:en\/)?$/.test(page.route) : key === 'other' ? !/\/tools\/|\/guides\/|\/workflows\//.test(page.route) : page.route.includes(`/${key}s/`)).slice(0, 20).map((page) => page.route)])) });
write('bundle-analysis.json', { status: 'measured', routeCount: pages.length, assetCount: assets.length, totalAssetBytes: assetBytes, largestAssets, heavyAssetCount: heavyAssets.length, skippedReasons: ['runtime network waterfall'] });
write('lighthouse-lab.json', { status: 'not-run', routeCount: 0, runs: [], measuredValues: {}, skippedReasons: ['Lighthouse executable/configuration was not invoked in this local gate'] });
write('rum-web-vitals-status.json', { status: 'not-available', routeCount: pages.length, fieldDataAvailable: false, measuredValues: {}, skippedReasons: ['RUM endpoint/sample data is not part of this repository audit'] });
write('long-task-audit.json', { status: 'not-run', routeCount: pages.length, measuredValues: {}, findings: [], skippedReasons: ['requires browser trace or field INP data'] });
write('heavy-tool-audit.json', { status: heavyAssets.length ? 'needs-review' : 'measured', routeCount: pages.filter((page) => /\/tools\//.test(page.route)).length, thresholdBytes: heavyThreshold, heavyAssets, skippedReasons: ['interaction-time profiling'] });
write('lcp-audit.json', { status: 'build-hints-only', routeCount: pages.length, measuredValues: { pagesWithPreload: pages.filter((page) => /rel=["']preload/i.test(page.html)).length, pagesWithImages: pages.filter((page) => /<img\b/i.test(page.html)).length }, skippedReasons: ['real browser LCP and viewport runs'] });
write('cls-audit.json', { status: 'build-hints-only', routeCount: pages.length, measuredValues: { imagesWithoutExplicitDimensions: imageTags.filter(({ tag }) => !/\b(?:width|height)=/i.test(tag)).length }, skippedReasons: ['layout-shift trace'] });
write('third-party-performance.json', { status: 'measured-inventory', routeCount: pages.length, hosts: [...externalHosts.entries()].sort((a, b) => b[1] - a[1]).map(([host, references]) => ({ host, references })), skippedReasons: ['third-party timing and blocking impact'] });
write('image-performance.json', { status: 'measured-inventory', routeCount: pages.length, imageTagCount: imageTags.length, imagesWithoutExplicitDimensions: imageTags.filter(({ tag }) => !/\b(?:width|height)=/i.test(tag)).length, skippedReasons: ['decoded image bytes and responsive viewport loading'] });
write('font-performance.json', { status: fontAssets.length ? 'measured' : 'no-font-assets', routeCount: pages.length, fontAssets, skippedReasons: ['font-display visual timing'] });
write('network-cache-audit.json', { status: hashedAssets.length ? 'measured-with-review' : 'needs-review', routeCount: pages.length, hashedAssetCount: hashedAssets.length, assetCount: assets.length, skippedReasons: ['production cache headers and CDN behavior'] });
write('service-worker-audit.json', { status: swFiles.length ? 'measured' : 'not-configured', routeCount: pages.length, serviceWorkerFiles: swFiles.map((file) => path.relative(distRoot, file).replaceAll(path.sep, '/')), skippedReasons: ['offline performance not applicable without a service worker'] });
write('performance-summary.json', { status: heavyAssets.length ? 'needs-review' : 'verified-build-inventory', routeCount: pages.length, totalAssetBytes: assetBytes, htmlBytes, largestAssets, fieldDataAvailable: false, labDataAvailable: false, skippedReasons: ['CWV field data', 'Lighthouse lab data', 'browser trace'] });
write('task015-final-report.json', { status: 'PASS_WITH_WARNINGS', routeCount: pages.length, buildVersion, archetypes: routeArchetypes, bundle: { assetCount: assets.length, totalAssetBytes: assetBytes, heavyAssetCount: heavyAssets.length }, fieldDataAvailable: false, labDataAvailable: false, warnings: ['No p75 CWV is claimed.', 'No Lighthouse score is claimed.', ...(heavyAssets.length ? ['Large build assets need route-level review.'] : [])], skippedReasons: ['production RUM', 'Lighthouse CI', 'browser long-task/CLS/LCP trace', 'CDN cache headers'], releaseDecision: 'local performance gate only; no deployment performed' });
console.log(JSON.stringify({ routeCount: pages.length, assetCount: assets.length, totalAssetBytes: assetBytes, heavyAssetCount: heavyAssets.length, fieldDataAvailable: false, labDataAvailable: false }, null, 2));
