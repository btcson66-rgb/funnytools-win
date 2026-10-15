import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';

const root = process.cwd();
const dist = join(root, 'dist');

function routeFile(route) {
  return join(dist, route === '/' ? 'index.html' : route.replace(/^\//, ''), route === '/' ? '' : 'index.html');
}

function readRoute(route) {
  const file = routeFile(route);
  assert.ok(existsSync(file), `missing built route: ${route}`);
  return readFileSync(file, 'utf8');
}

function jsonLd(html) {
  return [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    .map((match) => JSON.parse(match[1]));
}

// The visible "last reviewed" date in the author byline of the retained guide.
function bylineDate(html) {
  return html.match(/<p class="author-byline"[^>]*>[\s\S]*?<time datetime="(\d{4}-\d{2}-\d{2})"[^>]*>\1<\/time>/)?.[1] ?? null;
}

// P1 (2026-10-15): the template guide catalogue, workflows and the QR/PDF/random guide
// hubs were removed. Only t-score-calculator-guide remains, and the removed URLs are
// 404 unless they are one of the registered redirect stubs.
test('removed guide and workflow routes are not built (except registered redirect stubs)', () => {
  const stubSources = readFileSync(join(root, 'src/data/removedRedirects.ts'), 'utf8');
  for (const route of [
    '/workflows/qr-barcode-publishing-toolkit/',
    '/workflows/grade-gpa-check-toolkit/',
    '/workflows/verify-tool-result/',
    '/guides/qr-barcode/',
    '/guides/grades-gpa/',
    '/guides/text-writing/',
    '/guides/compress-pdf-to-upload-limit/',
    '/guides/qr-code-before-print-testing-guide/',
    '/en/guides/qr-code-before-print-testing-guide/',
    '/en/guides/z-score-calculator-guide/',
    '/guides/',
    '/workflows/',
    '/for/teachers/',
    '/blog/',
    '/shop/',
    '/wedding-seating-conflict-solver/',
    '/find-tools/',
  ]) {
    assert.equal(existsSync(routeFile(route)), false, `${route} must not be built`);
    assert.equal(stubSources.includes(`from: '${route}'`), false, `${route} must not be a stub`);
  }
});

test('the retained guide is the only guide and emits Article schema with the named author', () => {
  const route = '/guides/t-score-calculator-guide/';
  const html = readRoute(route);
  const items = jsonLd(html);
  const types = items.map((item) => item['@type']);
  assert.match(html, /<p class="eyebrow"[^>]*>[^<]*教育統計/);
  assert.ok(types.includes('Article'));
  assert.ok(types.includes('BreadcrumbList'));
  assert.ok(!types.includes('FAQPage'));
  const article = items.find((item) => item['@type'] === 'Article');
  assert.equal(article.author['@type'], 'Person');
  assert.equal(article.author.name, 'Benson Lai');
  assert.equal(article.author.url, 'https://funnytools.win/about/');
  assert.equal(bylineDate(html), '2026-06-25');
  assert.equal(article.dateModified, '2026-06-25');
});

test('retained guide keeps its source date in the sitemap', () => {
  const route = '/guides/t-score-calculator-guide/';
  const sitemap = readFileSync(join(dist, 'sitemap-guides.xml'), 'utf8');
  const entry = sitemap.match(new RegExp(`<loc>https://funnytools\\.win${route.replaceAll('/', '\\/')}</loc>[\\s\\S]*?<lastmod>([^<]+)</lastmod>`));
  assert.equal(entry?.[1], '2026-06-25');
});

test('route registry only pairs pages that are actually built in zh and en', () => {
  const registry = JSON.parse(readFileSync(join(root, 'src/i18n/expansion-routes.json'), 'utf8'));
  assert.ok(registry.routes.length > 0);
  for (const route of registry.routes) {
    assert.deepEqual(Object.keys(route.paths).filter((locale) => !['zh', 'en'].includes(locale)), [], `${route.key} references a removed locale`);
    for (const path of Object.values(route.paths)) {
      const html = readRoute(path);
      assert.doesNotMatch(html, /http-equiv="refresh"/, `${path} must be a real page, not a redirect stub`);
    }
  }
});
