import { existsSync, copyFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  builtPages,
  changedUrlsPath,
  classifyUrl,
  currentState,
  currentStatePath,
  diffEntries,
  distDir,
  enNoindex,
  ensureDefaultPriorityFiles,
  ensureDir,
  isIndexablePage,
  lastmodForPage,
  parseTags,
  previousState,
  publicDir,
  readJson,
  reportsDir,
  sitemapContentHashVersion,
  sitemapLastmodPath,
  sitemapIndexUrl,
  sitemapFileForType,
  sitemapIndexXml,
  urlSetXml,
  writeJson,
  writeText,
} from './seo-indexing-utils.mjs';

async function fetchRemoteSitemapEntries() {
  try {
    const response = await fetch(sitemapIndexUrl, {
      headers: { 'User-Agent': 'FunnyTools SEO indexing automation' },
    });
    if (!response.ok) return [];
    const xml = await response.text();
    const childLocs = /<sitemapindex\b/i.test(xml)
      ? [...xml.matchAll(/<sitemap>([\s\S]*?)<\/sitemap>/g)].map((match) => parseTags(match[1], 'loc')[0]).filter(Boolean)
      : [];
    const urlsetXmls = childLocs.length
      ? await Promise.all(childLocs.map(async (loc) => {
        const child = await fetch(loc, { headers: { 'User-Agent': 'FunnyTools SEO indexing automation' } });
        return child.ok ? child.text() : '';
      }))
      : [xml];
    return urlsetXmls.flatMap((item) => [...item.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((match) => ({
      loc: parseTags(match[1], 'loc')[0] ?? '',
      lastmod: parseTags(match[1], 'lastmod')[0] ?? '',
    }))).filter((entry) => entry.loc);
  } catch {
    return [];
  }
}

function resolveLastmodMode() {
  const explicitMode = process.env.SITEMAP_LASTMOD_MODE?.trim().toLowerCase();
  const mode = explicitMode || (process.env.CI !== undefined ? 'preserve' : 'update');
  if (!['preserve', 'update'].includes(mode)) {
    console.error(
      `Invalid SITEMAP_LASTMOD_MODE=${JSON.stringify(process.env.SITEMAP_LASTMOD_MODE)}. `
      + 'Expected "preserve" or "update".',
    );
    process.exit(1);
  }
  return {
    mode,
    source: explicitMode ? 'SITEMAP_LASTMOD_MODE' : process.env.CI !== undefined ? 'CI' : 'local-default',
  };
}

if (!existsSync(distDir)) {
  console.error('dist/ is missing. Run npm run build before generating deployment sitemaps.');
  process.exit(1);
}

ensureDir(publicDir);
ensureDir(reportsDir);
ensureDefaultPriorityFiles();

const storedLastmods = readJson(sitemapLastmodPath, {}) ?? {};
const nextLastmods = {};
const today = new Date().toISOString().slice(0, 10);
const lastmodMode = resolveLastmodMode();
const hashDriftUrls = [];

const groups = new Map([
  ['tools', []],
  ['guides', []],
  ['workflows', []],
  ['en', []],
  ['es', []],
  ['fr', []],
]);
const excluded = [];

for (const page of builtPages()) {
  if (!isIndexablePage(page)) {
    excluded.push({
      url: page.loc,
      reason: page.noindex ? 'noindex' : page.canonical && page.canonical !== page.loc ? 'canonical-not-self' : 'excluded-or-missing-canonical',
    });
    continue;
  }
  const type = classifyUrl(page.loc);
  const storedLastmod = Object.hasOwn(storedLastmods, page.loc)
    ? storedLastmods[page.loc]
    : undefined;
  const resolvedLastmod = lastmodForPage(page, storedLastmod, today, lastmodMode.mode);
  if (storedLastmod !== undefined && storedLastmod?.hash !== resolvedLastmod.hash) {
    hashDriftUrls.push(page.loc);
  }
  nextLastmods[page.loc] = {
    hash: resolvedLastmod.hash,
    hashVersion: resolvedLastmod.hashVersion,
    lastmod: resolvedLastmod.lastmod,
  };
  groups.get(type).push({
    loc: page.loc,
    lastmod: resolvedLastmod.lastmod,
  });
}

if (lastmodMode.mode === 'update') {
  writeJson(
    sitemapLastmodPath,
    Object.fromEntries(Object.entries(nextLastmods).sort(([a], [b]) => a.localeCompare(b))),
  );
}

const children = [];
const allEntries = [];
// All indexable URLs across every group, so urlSetXml can emit hreflang
// alternates only for pages whose locale counterpart really exists.
const allIndexableUrls = new Set([...groups.values()].flat().map((entry) => entry.loc));
for (const [type, entries] of groups) {
  entries.sort((a, b) => a.loc.localeCompare(b.loc));
  const file = sitemapFileForType(type);
  const entriesWithSitemap = entries.map((entry) => ({ ...entry, sitemap: file }));
  allEntries.push(...entriesWithSitemap);
  const latest = entries.map((entry) => entry.lastmod).filter(Boolean).sort().at(-1) ?? '';
  if (!(type === 'en' && enNoindex)) {
    children.push({ file, lastmod: latest });
  }
  const xml = urlSetXml(entries, allIndexableUrls);
  writeText(join(publicDir, file), xml);
  writeText(join(distDir, file), xml);
}

const indexXml = sitemapIndexXml(children);
writeText(join(publicDir, 'sitemap.xml'), indexXml);
writeText(join(distDir, 'sitemap.xml'), indexXml);

for (const file of ['robots.txt', 'CNAME']) {
  const source = join(publicDir, file);
  const target = join(distDir, file);
  if (existsSync(source)) copyFileSync(source, target);
}

const key = process.env.INDEXNOW_KEY?.trim();
if (key) {
  const keyFile = `${key}.txt`;
  writeText(join(publicDir, keyFile), key);
  writeText(join(distDir, keyFile), key);
}

const remoteEntries = await fetchRemoteSitemapEntries();
const previousForDiff = remoteEntries.length
  ? { urls: Object.fromEntries(remoteEntries.map((entry) => [entry.loc, { lastmod: entry.lastmod }])) }
  : previousState();
const diff = diffEntries(allEntries, previousForDiff);
const snapshot = currentState(allEntries);
writeJson(currentStatePath, snapshot);
writeJson(changedUrlsPath, {
  generatedAt: new Date().toISOString(),
  baseline: remoteEntries.length ? 'live-sitemap' : 'local-state',
  added: diff.added,
  modified: diff.modified,
  changed: [...new Set([...diff.added, ...diff.modified])],
});

const summary = {
  sitemapIndex: 'public/sitemap.xml',
  lastmodMode: lastmodMode.mode,
  lastmodModeSource: lastmodMode.source,
  contentHashVersion: sitemapContentHashVersion,
  storedHashDrift: {
    count: hashDriftUrls.length,
    examples: hashDriftUrls.slice(0, 5),
  },
  totalUrls: allEntries.length,
  bySitemap: Object.fromEntries([...groups].map(([type, entries]) => [sitemapFileForType(type), entries.length])),
  changed: {
    added: diff.added.length,
    modified: diff.modified.length,
  },
  diffBaseline: remoteEntries.length ? 'live-sitemap' : 'local-state',
  excludedCount: excluded.length,
  excludedSample: excluded.slice(0, 20),
  indexNowKeyFile: key ? 'created-from-INDEXNOW_KEY' : 'not-created-missing-INDEXNOW_KEY',
};

writeJson(join(reportsDir, 'sitemap-generation-report.json'), summary);
console.log(
  `[sitemap:lastmod] mode=${lastmodMode.mode} source=${lastmodMode.source}; `
  + `stored hash drift=${hashDriftUrls.length} URL(s).`,
);
if (hashDriftUrls.length) {
  console.log(`[sitemap:lastmod] first ${Math.min(hashDriftUrls.length, 5)} drift example(s):`);
  for (const url of hashDriftUrls.slice(0, 5)) console.log(`  - ${url}`);
}
console.log(JSON.stringify(summary, null, 2));
