import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = process.cwd();
const distDir = join(root, 'dist');
const reportsDir = join(root, 'reports');
const reportPath = join(reportsDir, 'editorial-leakage-audit.json');

const leakageRules = [
  { id: 'internal-agent', pattern: /\b(?:codex|claude)\b|\btask[- ]?\d{3}\b|internal brief|content brief|editorial brief|task package|package number|implementation note|developer note|agent instruction/iu },
  { id: 'editorial-cta', pattern: /頁面\s*cta|(?:主要|次要|主)?\s*\bcta\b\s*[：:]|(?:主要|次要)\s*按鈕\s*[：:]/iu },
  { id: 'editorial-image-note', pattern: /圖卡(?:文案)?(?:與|及|、|\/)\s*alt|圖片[／/]圖卡文字與\s*alt|(?:圖片\s+)?\balt\b\s*[：:]/iu },
  { id: 'internal-seo-directive', pattern: /SEO strategy|SEO positioning|target keyword|modifier keyword|keyword differentiation|ranking opportunity|keyword cluster|keyword intent|search volume|why this page deserves|why this keyword deserves|Google needs|Google wants|搜尋流量|搜尋曝光|排名策略|關鍵字策略|SEO價值|SEO目的/iu },
];

function walk(dir, output = []) {
  if (!existsSync(dir)) return output;
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, output);
    else output.push(full);
  }
  return output;
}

function routeFromHtml(file) {
  const rel = relative(distDir, file).replaceAll('\\', '/');
  if (rel === 'index.html') return '/';
  if (rel.endsWith('/index.html')) return `/${rel.slice(0, -'index.html'.length)}`;
  return `/${rel.replace(/\.html$/, '/')}`;
}

function decodeEntities(value) {
  return value
    .replace(/&nbsp;/gi, ' ')
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(Number.parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, decimal) => String.fromCodePoint(Number(decimal)))
    .replace(/&amp;/gi, '&').replace(/&lt;/gi, '<').replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"').replace(/&#39;/g, "'");
}

function robotsContent(html) {
  for (const match of html.matchAll(/<meta\b[^>]*>/gi)) {
    const tag = match[0];
    const name = tag.match(/\bname=["']([^"']+)["']/i)?.[1] ?? '';
    if (name.toLowerCase() === 'robots') return tag.match(/\bcontent=["']([^"']*)["']/i)?.[1] ?? '';
  }
  return '';
}

export function extractVisibleMain(html) {
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? html;
  return decodeEntities(main
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<(?:nav|footer)\b[^>]*>[\s\S]*?<\/(?:nav|footer)>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim());
}

export function findEditorialLeakage(text) {
  return leakageRules
    .filter(({ pattern }) => pattern.test(text))
    .map(({ id }) => id);
}

function sitemapUrls() {
  const index = join(distDir, 'sitemap.xml');
  if (!existsSync(index)) throw new Error('dist/sitemap.xml is missing; run npm run build first.');
  const childLocs = [...readFileSync(index, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((match) => match[1].replace('https://funnytools.win', '').replace(/&amp;/g, '&'))
    .filter((path) => path.endsWith('.xml'));
  const urls = [];
  for (const child of childLocs) {
    const file = join(distDir, child.replace(/^\//, ''));
    if (!existsSync(file)) continue;
    for (const match of readFileSync(file, 'utf8').matchAll(/<url>[\s\S]*?<loc>([^<]+)<\/loc>[\s\S]*?<\/url>/g)) {
      const parsed = new URL(match[1]);
      urls.push(parsed.pathname.endsWith('/') ? parsed.pathname : `${parsed.pathname}/`);
    }
  }
  return [...new Set(urls)];
}

export function auditDist() {
  const htmlFiles = walk(distDir).filter((file) => file.endsWith('.html'));
  const routeToFile = new Map(htmlFiles.map((file) => [routeFromHtml(file), file]));
  const urls = sitemapUrls();
  const sitemapSet = new Set(urls);
  const findings = [];
  let indexable = 0;
  for (const file of htmlFiles) {
    const url = routeFromHtml(file);
    const html = readFileSync(file, 'utf8');
    const robots = robotsContent(html);
    const rules = findEditorialLeakage(extractVisibleMain(html));
    if (rules.length) findings.push({ url, rules });
    if (sitemapSet.has(url) && !/\bnoindex\b/i.test(robots)) indexable += 1;
  }
  for (const url of urls) {
    if (!routeToFile.has(url)) {
      findings.push({ url, rules: ['missing-build-route'] });
    }
  }
  return { auditedUrls: urls.length, allBuiltPages: htmlFiles.length, indexableUrls: indexable, findings };
}

if (process.argv[1] && process.argv[1].endsWith('editorial-leakage-audit.mjs')) {
  try {
    const result = auditDist();
    mkdirSync(reportsDir, { recursive: true });
    writeFileSync(reportPath, `${JSON.stringify({ generatedAt: new Date().toISOString(), ...result }, null, 2)}\n`, 'utf8');
    if (result.findings.length) {
      console.error(`Editorial leakage audit failed: ${result.findings.length} URL(s).`);
      for (const finding of result.findings.slice(0, 30)) console.error(`- ${finding.url}: ${finding.rules.join(', ')}`);
      process.exitCode = 1;
    } else {
      console.log(`Editorial leakage audit passed: ${result.indexableUrls} indexable URL(s) checked.`);
    }
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  }
}
