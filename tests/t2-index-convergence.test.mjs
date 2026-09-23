import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { INDEXABLE_PATHS, normalizeIndexPath } from '../src/lib/indexPolicy.ts';

const origin = 'https://funnytools.win';

function fileForPath(pathname) {
  return pathname === '/' ? 'dist/index.html' : `dist${pathname}index.html`;
}

function htmlForPath(pathname) {
  return readFileSync(fileForPath(pathname), 'utf8');
}

function attr(html, selector, name) {
  const tag = html.match(selector)?.[0] ?? '';
  return tag.match(new RegExp(`${name}=["']([^"']+)["']`, 'i'))?.[1] ?? '';
}

function sitemapUrls() {
  const index = readFileSync('dist/sitemap.xml', 'utf8');
  const children = [...index.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1]).pathname.slice(1));
  return children.flatMap((child) => {
    const xml = readFileSync(`dist/${child}`, 'utf8');
    return [...xml.matchAll(/<url>[\s\S]*?<loc>([^<]+)<\/loc>[\s\S]*?<\/url>/g)].map((match) => match[1]);
  });
}

test('T2 sitemap contains exactly the 20 retained URLs and no language trees', () => {
  const urls = sitemapUrls();
  assert.equal(urls.length, 20);
  assert.equal(new Set(urls).size, 20);
  assert.deepEqual(new Set(urls), new Set(INDEXABLE_PATHS.map((path) => `${origin}${path}`)));
  assert.equal(urls.some((url) => /\/(?:en|es|fr)\//.test(new URL(url).pathname)), false);
});

test('every retained page is self-canonical and indexable', () => {
  for (const pathname of INDEXABLE_PATHS) {
    const html = htmlForPath(pathname);
    const canonical = attr(html, /<link\b[^>]*rel=["']canonical["'][^>]*>/i, 'href');
    const robots = attr(html, /<meta\b[^>]*name=["']robots["'][^>]*>/i, 'content');
    assert.equal(canonical, `${origin}${pathname}`, pathname);
    assert.doesNotMatch(robots, /noindex/i, pathname);
  }
});

test('representative excluded pages stay available with exact noindex,follow and outside sitemap', () => {
  const sitemap = new Set(sitemapUrls());
  const excluded = [
    '/tools/word-counter/',
    '/guides/z-score-calculator-guide/',
    '/en/',
    '/es/',
    '/fr/',
  ];
  for (const pathname of excluded) {
    const html = htmlForPath(pathname);
    const robots = attr(html, /<meta\b[^>]*name=["']robots["'][^>]*>/i, 'content');
    assert.equal(robots, 'noindex,follow', pathname);
    assert.equal(sitemap.has(`${origin}${pathname}`), false, pathname);
  }
});

test('homepage links only to retained internal pages', () => {
  const html = htmlForPath('/');
  const excludedLinks = [...html.matchAll(/<a\b[^>]*href=["']([^"']+)["']/gi)]
    .map((match) => match[1])
    .filter((href) => {
      const url = new URL(href, origin);
      return url.origin === origin && !INDEXABLE_PATHS.includes(normalizeIndexPath(url.pathname));
    });
  assert.deepEqual(excludedLinks, []);
});
