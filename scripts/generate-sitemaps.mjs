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
  ensureDefaultPriorityFiles,
  ensureDir,
  isIndexablePage,
  lastmodForPage,
  parseTags,
  previousState,
  publicDir,
  readSitemapEntries,
  reportsDir,
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

if (!existsSync(distDir)) {
  console.error('dist/ is missing. Run npm run build before generating deployment sitemaps.');
  process.exit(1);
}

ensureDir(publicDir);
ensureDir(reportsDir);
ensureDefaultPriorityFiles();

const previousLastmods = new Map(
  [...readSitemapEntries(publicDir), ...readSitemapEntries(distDir)]
    .filter((entry) => entry.loc && entry.lastmod)
    .map((entry) => [entry.loc, entry.lastmod]),
);

const groups = new Map([
  ['pages', []],
  ['tools', []],
  ['categories', []],
  ['blog', []],
  ['guides', []],
  ['en', []],
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
  groups.get(type).push({
    loc: page.loc,
    lastmod: lastmodForPage(page, previousLastmods.get(page.loc)),
  });
}

const children = [];
const allEntries = [];
for (const [type, entries] of groups) {
  entries.sort((a, b) => a.loc.localeCompare(b.loc));
  const file = sitemapFileForType(type);
  const entriesWithSitemap = entries.map((entry) => ({ ...entry, sitemap: file }));
  allEntries.push(...entriesWithSitemap);
  const latest = entries.map((entry) => entry.lastmod).filter(Boolean).sort().at(-1) ?? '';
  children.push({ file, lastmod: latest });
  writeText(join(publicDir, file), urlSetXml(entries));
  writeText(join(distDir, file), urlSetXml(entries));
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
console.log(JSON.stringify(summary, null, 2));
