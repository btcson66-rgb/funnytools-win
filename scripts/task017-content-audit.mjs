import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceRoot = path.join(root, 'src/content/seo-guides/task-017');
const workflowRoot = path.join(root, 'src/content/seo-workflows/task-017');
const distRoot = path.join(root, 'dist');
const reportPath = path.join(root, 'reports/task017-content-audit.json');
const buildVersion = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8')).version;
const generatedAt = new Date().toISOString();
const files = fs.existsSync(sourceRoot) ? fs.readdirSync(sourceRoot).filter((name) => name.endsWith('.md')).sort() : [];
const workflowFiles = fs.existsSync(workflowRoot) ? fs.readdirSync(workflowRoot).filter((name) => name.endsWith('.md')).sort() : [];
function readFrontmatter(file) {
  const source = fs.readFileSync(file, 'utf8');
  const header = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const values = {};
  for (const line of (header?.[1] ?? '').split(/\r?\n/)) { const match = line.match(/^([A-Za-z_][A-Za-z0-9_]*):\s*["']?(.+?)["']?$/); if (match) values[match[1]] = match[2]; }
  return { source, values };
}
const pages = files.map((name) => ({ name, ...readFrontmatter(path.join(sourceRoot, name)) }));
const workflows = workflowFiles.map((name) => ({ name, ...readFrontmatter(path.join(workflowRoot, name)) }));
const routes = [...pages, ...workflows].map((page) => page.values.slug).filter(Boolean);
const duplicateRoutes = [...new Set(routes.filter((route, index) => routes.indexOf(route) !== index))];
const builtRoutes = fs.existsSync(distRoot) ? fs.readdirSync(distRoot, { recursive: true }).filter((file) => String(file).endsWith('index.html')).map((file) => `/${String(file).replaceAll('\\', '/').replace(/index\.html$/, '')}`) : [];
const stagedNotBuilt = routes.filter((route) => !builtRoutes.includes(route));
const sourceLinks = pages.flatMap((page) => [...page.source.matchAll(/\]\((\/[^)#?]+\/?)(?:#[^)]*)?\)/g)].map((match) => ({ source: page.name, route: match[1] })));
const builtToolLinks = sourceLinks.filter((link) => /\/tools\//.test(link.route) && builtRoutes.includes(link.route));
const missingToolLinks = sourceLinks.filter((link) => /\/tools\//.test(link.route) && !builtRoutes.includes(link.route));
const titles = pages.map((page) => page.values.seo_title).filter(Boolean);
const metas = pages.map((page) => page.values.meta_description).filter(Boolean);
const duplicate = (values) => [...new Set(values.filter((value, index) => values.indexOf(value) !== index))];
const report = { generatedAt, environment: 'local-source-and-static-build', buildVersion, status: missingToolLinks.length || duplicate(titles).length || duplicate(metas).length ? 'needs-review' : 'verified-with-freeze-hold', sourceGuideCount: pages.length, sourceWorkflowCount: workflows.length, expectedNewUrls: 13, sourceRoutes: routes, duplicateRoutes, stagedNotBuilt, builtTask017RouteCount: routes.length - stagedNotBuilt.length, builtToolLinks: builtToolLinks.length, missingToolLinks, duplicateTitles: duplicate(titles), duplicateMetaDescriptions: duplicate(metas), contentFreeze: { freezeDate: '2026-08-01', defaultTask17PublishDate: '2026-08-31', publicRelease: 'held-until-owner-approved-freeze-lift' }, skippedChecks: ['human editorial accuracy review', 'online 200/index/sitemap read-back', 'GSC/AdSense outcome', 'browser rendering after freeze lift'] };
fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
console.log(JSON.stringify({ sourceGuideCount: pages.length, sourceWorkflowCount: workflows.length, expectedNewUrls: 13, builtTask017RouteCount: report.builtTask017RouteCount, missingToolLinks: missingToolLinks.length, contentFreeze: report.contentFreeze.publicRelease }, null, 2));
