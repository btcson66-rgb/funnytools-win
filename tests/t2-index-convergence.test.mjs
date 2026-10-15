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

test('sitemap contains exactly the 20 education-statistics URLs (P1: merge-pdf moved out)', () => {
  const urls = sitemapUrls();
  assert.equal(urls.length, 20);
  assert.equal(new Set(urls).size, 20);
  assert.equal(urls.includes(`${origin}/tools/merge-pdf/`), false);
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
    '/tools/merge-pdf/',
    '/tools/',
    '/en/',
    '/en/tools/',
    '/en/tools/merge-pdf/',
    '/en/tools/grade-average/',
    '/en/guides/t-score-calculator-guide/',
  ];
  for (const pathname of excluded) {
    const html = htmlForPath(pathname);
    const robots = attr(html, /<meta\b[^>]*name=["']robots["'][^>]*>/i, 'content');
    assert.equal(robots, 'noindex,follow', pathname);
    assert.equal(sitemap.has(`${origin}${pathname}`), false, pathname);
  }
});

// The only noindex page the homepage may link to is the single "other tools" page,
// reachable from the footer so existing direct visitors can still find the general tools.
const ALLOWED_NOINDEX_HOME_LINKS = new Set(['/tools/']);

test('homepage links only to retained internal pages (plus the footer link to the other-tools page)', () => {
  const html = htmlForPath('/');
  const excludedLinks = [...html.matchAll(/<a\b[^>]*href=["']([^"']+)["']/gi)]
    .map((match) => match[1])
    .filter((href) => {
      const url = new URL(href, origin);
      const path = normalizeIndexPath(url.pathname);
      return url.origin === origin && !INDEXABLE_PATHS.includes(path) && !ALLOWED_NOINDEX_HOME_LINKS.has(path);
    });
  assert.deepEqual(excludedLinks, []);
});
