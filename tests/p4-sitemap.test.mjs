import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { INDEXABLE_PATHS } from '../src/lib/indexPolicy.ts';

const dist = new URL('../dist/', import.meta.url).pathname;
const origin = 'https://funnytools.win';
const locs = (xml, tag) => [...xml.matchAll(new RegExp(`<${tag}>[\\s\\S]*?<loc>([^<]+)</loc>[\\s\\S]*?</${tag}>`, 'g'))].map((m) => m[1]);
const stubSource = readFileSync(new URL('../src/data/removedRedirects.ts', import.meta.url), 'utf8');
const stubs = [...stubSource.matchAll(/\{\s*from:\s*'([^']+)',\s*to:\s*'([^']+)'\s*\}/g)].map((m) => m[1]);

test('built sitemaps: every URL is in exactly one file, 18 unique URLs, stubs are absent', () => {
  const index = readFileSync(join(dist, 'sitemap.xml'), 'utf8');
  const children = locs(index, 'sitemap');
  assert.deepEqual(children, [`${origin}/sitemap-tools.xml`, `${origin}/sitemap-pages.xml`]);
  const files = readdirSync(dist).filter((name) => /^sitemap-.*\.xml$/.test(name)).sort();
  assert.deepEqual(files, ['sitemap-pages.xml', 'sitemap-tools.xml'], 'no stray sitemap files are built');
  const seen = new Map();
  for (const name of files) {
    for (const url of locs(readFileSync(join(dist, name), 'utf8'), 'url')) {
      assert.ok(!seen.has(url), `${url} in both ${seen.get(url)} and ${name}`);
      seen.set(url, name);
    }
  }
  assert.equal(seen.size, 18);
  assert.deepEqual(new Set(seen.keys()), new Set(INDEXABLE_PATHS.map((path) => `${origin}${path}`)));
  for (const from of stubs) assert.ok(!seen.has(`${origin}${from}`), `stub ${from} must not be in a sitemap`);
  assert.equal(seen.get(`${origin}/`), 'sitemap-pages.xml');
  assert.equal(seen.get(`${origin}/tools/random-name-picker/`), 'sitemap-tools.xml');
  assert.ok(!existsSync(join(dist, 'sitemap-guides.xml')));
});

test('robots.txt lists the index and exactly the child sitemaps that exist', () => {
  const robots = readFileSync(new URL('../public/robots.txt', import.meta.url), 'utf8');
  assert.deepEqual([...robots.matchAll(/^Sitemap:\s*(\S+)$/gm)].map((m) => m[1]), [`${origin}/sitemap.xml`, `${origin}/sitemap-tools.xml`, `${origin}/sitemap-pages.xml`]);
  assert.equal(readFileSync(join(dist, 'robots.txt'), 'utf8').replace(/\r\n/g, '\n').trim(), robots.replace(/\r\n/g, '\n').trim());
});
