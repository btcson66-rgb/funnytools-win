import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const DIST = path.join(ROOT, 'dist');
const PUBLIC = path.join(ROOT, 'public');

const sitemapFiles = fs
  .readdirSync(PUBLIC)
  .filter((name) => /^sitemap-(?:tools|guides|workflows|pages|en)\.xml$/.test(name));
const sitemapXml = sitemapFiles
  .map((name) => fs.readFileSync(path.join(PUBLIC, name), 'utf8'))
  .join('\n');
const urls = [...new Set([...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]))];

function routeType(url) {
  const pathname = new URL(url).pathname;
  if (/\/tools\/[^/]+\/$/.test(pathname)) return 'tool';
  if (/\/guides\/[^/]+\/$/.test(pathname)) return 'guide';
  if (/\/workflows\/[^/]+\/$/.test(pathname)) return 'workflow';
  if (/\/category\/[^/]+\/$/.test(pathname)) return 'category';
  if (/\/for\/[^/]+\/$/.test(pathname)) return 'audience';
  return 'other';
}

function outputFile(url) {
  const pathname = new URL(url).pathname;
  return path.join(
    DIST,
    pathname === '/' ? 'index.html' : pathname.replace(/^\//, ''),
    pathname === '/' ? '' : 'index.html',
  );
}

function decodeEntities(value) {
  return value
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>');
}

function plainText(html) {
  return decodeEntities(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<svg[\s\S]*?<\/svg>/gi, ' ')
      .replace(/<[^>]+>/g, ' '),
  )
    .replace(/\s+/g, ' ')
    .trim();
}

function tokenCount(text, lang) {
  if (lang === 'zh') return [...text].filter((char) => /\p{Script=Han}/u.test(char)).length;
  return (text.match(/[A-Za-z0-9][A-Za-z0-9’'/-]*/g) ?? []).length;
}

const minimums = {
  zh: { tool: 1200, guide: 1200, workflow: 1200, category: 1500, audience: 1200, other: 220 },
  en: { tool: 780, guide: 850, workflow: 700, category: 780, audience: 700, other: 220 },
};
const reviewedTypes = new Set(['tool', 'guide', 'workflow', 'category', 'audience']);
const failures = [];
const pages = [];

for (const url of urls) {
  const file = outputFile(url);
  if (!fs.existsSync(file)) {
    failures.push(`${url}: missing built HTML (${file})`);
    continue;
  }

  const html = fs.readFileSync(file, 'utf8');
  const pathname = new URL(url).pathname;
  const lang = pathname.startsWith('/en/') ? 'en' : 'zh';
  const type = routeType(url);
  const mainMatch = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i);
  const mainText = plainText(mainMatch?.[1] ?? html);
  const count = tokenCount(mainText, lang);
  const h1Count = (html.match(/<h1\b/gi) ?? []).length;
  const h2Count = (html.match(/<h2\b/gi) ?? []).length;
  const hasTitle = /<title>[^<]{8,}<\/title>/i.test(html);
  const hasDescription = /<meta\s+name=["']description["']\s+content=["'][^"']{40,}["']/i.test(html)
    || /<meta\s+content=["'][^"']{40,}["']\s+name=["']description["']/i.test(html);
  const canonical = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i)?.[1]
    ?? html.match(/<link\s+href=["']([^"']+)["']\s+rel=["']canonical["']/i)?.[1];
  const noindex = /<meta\s+name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html);
  const reviewed = html.includes('data-content-value-review');

  if (count < minimums[lang][type]) {
    failures.push(`${url}: ${count} ${lang === 'zh' ? 'Han characters' : 'words'}; minimum for ${type} is ${minimums[lang][type]}`);
  }
  if (h1Count !== 1) failures.push(`${url}: expected exactly one H1, found ${h1Count}`);
  if (h2Count < (reviewedTypes.has(type) ? 5 : 1)) failures.push(`${url}: insufficient section structure (${h2Count} H2 headings)`);
  if (!hasTitle) failures.push(`${url}: missing or very short title`);
  if (!hasDescription) failures.push(`${url}: missing or very short meta description`);
  if (canonical !== url) failures.push(`${url}: canonical mismatch (${canonical ?? 'missing'})`);
  if (noindex) failures.push(`${url}: sitemap URL contains noindex`);
  if (reviewedTypes.has(type) && !reviewed) failures.push(`${url}: missing contextual verification review`);

  pages.push({ url, pathname, lang, type, count, h2Count, mainText });
}

function shingles(text, size = 7) {
  const normalized = text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  const result = new Set();
  for (let index = 0; index <= normalized.length - size; index += 1) {
    result.add(normalized.slice(index, index + size).join(' '));
  }
  return result;
}

function jaccard(left, right) {
  if (!left.size || !right.size) return 0;
  let intersection = 0;
  for (const value of left) if (right.has(value)) intersection += 1;
  return intersection / (left.size + right.size - intersection);
}

let maximumSimilarity = { score: 0, left: '', right: '' };
const comparable = pages
  .filter((page) => reviewedTypes.has(page.type))
  .map((page) => ({ ...page, shingles: shingles(page.mainText) }));
for (let leftIndex = 0; leftIndex < comparable.length; leftIndex += 1) {
  for (let rightIndex = leftIndex + 1; rightIndex < comparable.length; rightIndex += 1) {
    const left = comparable[leftIndex];
    const right = comparable[rightIndex];
    if (left.lang !== right.lang || left.type !== right.type) continue;
    const score = jaccard(left.shingles, right.shingles);
    if (score > maximumSimilarity.score) {
      maximumSimilarity = { score, left: left.url, right: right.url };
    }
    if (score >= 0.82) {
      failures.push(`${left.url} and ${right.url}: near-duplicate main content (${score.toFixed(3)})`);
    }
  }
}

const summary = {
  status: failures.length ? 'FAIL' : 'PASS',
  sitemapUrls: urls.length,
  builtPagesAudited: pages.length,
  contextualReviews: pages.filter((page) => reviewedTypes.has(page.type)).length,
  byLocaleAndType: Object.fromEntries(
    ['zh', 'en'].flatMap((lang) =>
      ['tool', 'guide', 'workflow', 'category', 'audience', 'other'].map((type) => {
        const group = pages.filter((page) => page.lang === lang && page.type === type);
        return [
          `${lang}:${type}`,
          {
            pages: group.length,
            minimum: group.length ? Math.min(...group.map((page) => page.count)) : 0,
            median: group.length
              ? [...group.map((page) => page.count)].sort((a, b) => a - b)[Math.floor(group.length / 2)]
              : 0,
          },
        ];
      }),
    ),
  ),
  maximumSameTypeSimilarity: {
    score: Number(maximumSimilarity.score.toFixed(3)),
    left: maximumSimilarity.left,
    right: maximumSimilarity.right,
  },
  failures,
};

console.log(JSON.stringify(summary, null, 2));
if (failures.length) process.exitCode = 1;
