import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const DIST = path.join(ROOT, 'dist');
const PUBLIC = path.join(ROOT, 'public');

const sitemapFiles = fs
  .readdirSync(PUBLIC)
  .filter((name) => /^sitemap-(?:tools|guides|workflows|pages|en|es)\.xml$/.test(name));
const sitemapXml = sitemapFiles
  .map((name) => fs.readFileSync(path.join(PUBLIC, name), 'utf8'))
  .join('\n');
const urls = [...new Set([...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]))];

function routeType(url) {
  const pathname = new URL(url).pathname;
  if (/\/(?:tools|herramientas)\/[^/]+\/$/.test(pathname)) return 'tool';
  if (/\/guides\/[^/]+\/$/.test(pathname)) return 'guide';
  if (/\/workflows\/[^/]+\/$/.test(pathname)) return 'workflow';
  if (/\/category\/[^/]+\/$/.test(pathname)) return 'category';
  if (/\/for\/[^/]+\/$/.test(pathname)) return 'audience';
  return 'other';
}

// `${type}:${slug}` extraction, matching the routes each contentValue.ts builder covers.
// Used only to look up whether a hand-written override exists for this exact page — see below.
function routeSlug(url, type) {
  const pathname = new URL(url).pathname;
  const patterns = {
    tool: /\/(?:tools|herramientas)\/([^/]+)\/$/,
    guide: /\/guides\/([^/]+)\/$/,
    workflow: /\/workflows\/([^/]+)\/$/,
    category: /\/category\/([^/]+)\/$/,
    audience: /\/for\/([^/]+)\/$/,
  };
  return patterns[type] ? (pathname.match(patterns[type])?.[1] ?? null) : null;
}

// contentValue.ts renders the "contextual verification review" block (data-content-value-review)
// only for pages that have a hand-written override entry — see the remediation note at the top
// of that file. `zh`/`en` tool/guide/workflow/category/audience pages are the only routes driven
// by contentValue.ts (its `Locale` type is `'zh' | 'en'` — `es` pages use an entirely separate,
// pre-existing hand-authored pipeline in `src/i18n/expansion/es*.ts` + `ExpansionToolLayout.astro`
// that always renders its own review block and is out of scope here). Rather than trust the HTML
// alone, parse contentValue.ts's override tables directly so the gate can tell "no block because
// no hand-written content exists yet" apart from "block silently failed to render" in both
// directions, without needing contentValue.ts to expose a runtime manifest.
function extractOverrideKeys(constName) {
  const source = fs.readFileSync(path.join(ROOT, 'src/lib/contentValue.ts'), 'utf8');
  const declaration = new RegExp(`const ${constName}[^=]*=\\s*\\{`).exec(source);
  if (!declaration) return new Set();
  let depth = 1;
  let index = declaration.index + declaration[0].length;
  while (depth > 0 && index < source.length) {
    if (source[index] === '{') depth += 1;
    else if (source[index] === '}') depth -= 1;
    index += 1;
  }
  const body = source.slice(declaration.index + declaration[0].length, index - 1);
  const keys = new Set();
  const keyPattern = /^\s*'([a-z]{2}:[a-zA-Z0-9_-]+)':/gm;
  let match;
  while ((match = keyPattern.exec(body))) keys.add(match[1]);
  return keys;
}

const overrideKeysByType = {
  tool: extractOverrideKeys('toolValueReviewOverrides'),
  guide: extractOverrideKeys('guideValueReviewOverrides'),
  workflow: extractOverrideKeys('workflowValueReviewOverrides'),
  category: extractOverrideKeys('categoryValueReviewOverrides'),
  audience: extractOverrideKeys('audienceValueReviewOverrides'),
};

// `pendingHandwrittenReview` in contentValue.ts is a TEMPORARY, shrinking list (added
// 2026-08-01) of pages that still render the old auto-generated review block instead of a
// hand-written override, so they stay above the word/H2 thresholds below while someone works
// through them in later batches. It is a plain string array per type (not a quoted-object-key
// table like the override tables above), so it needs its own bracket-depth extraction.
function extractPendingKeys(type) {
  const source = fs.readFileSync(path.join(ROOT, 'src/lib/contentValue.ts'), 'utf8');
  const declaration = /const pendingHandwrittenReview[^=]*=\s*\{/.exec(source);
  if (!declaration) return new Set();
  let depth = 1;
  let index = declaration.index + declaration[0].length;
  while (depth > 0 && index < source.length) {
    if (source[index] === '{') depth += 1;
    else if (source[index] === '}') depth -= 1;
    index += 1;
  }
  const body = source.slice(declaration.index + declaration[0].length, index - 1);
  const typeDeclaration = new RegExp(`\\b${type}:\\s*\\[`).exec(body);
  if (!typeDeclaration) return new Set();
  let arrayDepth = 1;
  let arrayIndex = typeDeclaration.index + typeDeclaration[0].length;
  while (arrayDepth > 0 && arrayIndex < body.length) {
    if (body[arrayIndex] === '[') arrayDepth += 1;
    else if (body[arrayIndex] === ']') arrayDepth -= 1;
    arrayIndex += 1;
  }
  const arrayBody = body.slice(typeDeclaration.index + typeDeclaration[0].length, arrayIndex - 1);
  const keys = new Set();
  const keyPattern = /'([a-z]{2}:[a-zA-Z0-9_-]+)'/g;
  let match;
  while ((match = keyPattern.exec(arrayBody))) keys.add(match[1]);
  return keys;
}

const pendingKeysByType = {
  tool: extractPendingKeys('tool'),
  guide: extractPendingKeys('guide'),
  workflow: extractPendingKeys('workflow'),
  category: extractPendingKeys('category'),
  audience: extractPendingKeys('audience'),
};
const pendingTotal = Object.values(pendingKeysByType).reduce((sum, set) => sum + set.size, 0);

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
  return (text.match(/[\p{L}\p{N}][\p{L}\p{N}’'/-]*/gu) ?? []).length;
}

const minimums = {
  zh: { tool: 1200, guide: 1200, workflow: 1200, category: 1500, audience: 1200, other: 220 },
  en: { tool: 780, guide: 850, workflow: 700, category: 780, audience: 700, other: 220 },
  es: { tool: 950, guide: 900, workflow: 800, category: 850, audience: 800, other: 800 },
};
const reviewedTypes = new Set(['tool', 'guide', 'workflow', 'category', 'audience']);
// Task009-011 explicitly require the supplied Workflow source to be used
// verbatim. These three source-bound routes therefore remain below the normal
// editorial-length threshold until their original packs receive a later,
// owner-approved expansion. Do not silently pad them with generated prose.
const sourceBoundRoutes = {
  '/workflows/qr-barcode-publishing-toolkit/': 'Task009 original workflow source is required unchanged',
  '/workflows/grade-gpa-check-toolkit/': 'Task010 original workflow source is required unchanged',
  '/workflows/verify-tool-result/': 'Task011 original workflow source is required unchanged',
};
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
  const lang = pathname.startsWith('/es/') ? 'es' : pathname.startsWith('/en/') ? 'en' : 'zh';
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
  const sourceBoundReason = sourceBoundRoutes[pathname];

  if (!sourceBoundReason && count < minimums[lang][type]) {
    failures.push(`${url}: ${count} ${lang === 'zh' ? 'Han characters' : 'words'}; minimum for ${type} is ${minimums[lang][type]}`);
  }
  if (h1Count !== 1) failures.push(`${url}: expected exactly one H1, found ${h1Count}`);
  if (!sourceBoundReason && h2Count < (reviewedTypes.has(type) ? 5 : 1)) failures.push(`${url}: insufficient section structure (${h2Count} H2 headings)`);
  if (!hasTitle) failures.push(`${url}: missing or very short title`);
  if (!hasDescription) failures.push(`${url}: missing or very short meta description`);
  if (canonical !== url) failures.push(`${url}: canonical mismatch (${canonical ?? 'missing'})`);
  if (noindex) failures.push(`${url}: sitemap URL contains noindex`);
  if (reviewedTypes.has(type) && !sourceBoundReason) {
    if (lang === 'es') {
      // The es tool pipeline (ExpansionToolLayout + i18n/expansion/es*.ts) is a separate,
      // pre-existing, always-hand-written system outside contentValue.ts's scope — keep the
      // original unconditional requirement for it rather than looking it up in overrideKeysByType.
      if (!reviewed) failures.push(`${url}: missing contextual verification review`);
    } else {
      const slug = routeSlug(url, type);
      const key = slug ? `${lang}:${slug}` : null;
      const hasOverride = key ? overrideKeysByType[type]?.has(key) : false;
      const isPending = key ? pendingKeysByType[type]?.has(key) : false;
      const expectReviewed = hasOverride || isPending;
      if (expectReviewed && !reviewed) {
        const reason = hasOverride
          ? 'hand-written override exists in contentValue.ts'
          : 'page is listed in the temporary pendingHandwrittenReview list in contentValue.ts';
        failures.push(`${url}: missing contextual verification review (${reason} but the block did not render)`);
      }
      if (!expectReviewed && reviewed) {
        failures.push(`${url}: unexpected contextual verification review (block rendered but no hand-written override or pendingHandwrittenReview entry is registered in contentValue.ts for this page)`);
      }
      if (hasOverride && isPending) {
        failures.push(`${url}: ${key} has a hand-written override in contentValue.ts AND is still listed in pendingHandwrittenReview — remove it from the pending list now that a real override exists`);
      }
    }
  }

  pages.push({ url, pathname, lang, type, count, h2Count, mainText, reviewed, sourceBoundReason });
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
  reviewablePages: pages.filter((page) => reviewedTypes.has(page.type)).length,
  contextualReviews: pages.filter((page) => reviewedTypes.has(page.type) && page.reviewed).length,
  byLocaleAndType: Object.fromEntries(
    ['zh', 'en', 'es'].flatMap((lang) =>
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
  pendingHandwrittenReview: {
    total: pendingTotal,
    byType: Object.fromEntries(Object.entries(pendingKeysByType).map(([type, set]) => [type, set.size])),
  },
  sourceBoundExceptions: pages
    .filter((page) => page.sourceBoundReason)
    .map(({ url, count, h2Count, sourceBoundReason }) => ({ url, count, h2Count, reason: sourceBoundReason })),
  failures,
};

console.log(JSON.stringify(summary, null, 2));
// Printed unconditionally (pass or fail) so this cannot be missed in a scrollback of a green
// preflight run — the whole point of `pendingHandwrittenReview` being temporary depends on
// someone actually seeing this number shrink over time.
console.log(
  `\n暫時清單剩餘 ${pendingTotal} 頁待手寫（tool ${pendingKeysByType.tool.size} / guide ${pendingKeysByType.guide.size} / workflow ${pendingKeysByType.workflow.size} / category ${pendingKeysByType.category.size} / audience ${pendingKeysByType.audience.size}）`,
);
if (failures.length) process.exitCode = 1;
