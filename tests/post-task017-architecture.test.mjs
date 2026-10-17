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
// hubs were removed, and P2 batch 4 (2026-10-17) merged the last guide (t-score-calculator-guide)
// into its tool page. Removed URLs are 404 unless they are one of the registered redirect stubs.
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
    '/en/guides/t-score-calculator-guide/',
    '/en/category/statistics/',
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

test('the former T-score guide and statistics category are redirect stubs to the page that answers the same query', () => {
  const stubSources = readFileSync(join(root, 'src/data/removedRedirects.ts'), 'utf8');
  for (const [from, to] of [['/guides/t-score-calculator-guide/', '/tools/t-score-calculator/'], ['/category/statistics/', '/education-statistics/']]) {
    assert.ok(stubSources.includes(`{ from: '${from}', to: '${to}' }`), `${from} is a registered stub`);
    const html = readRoute(from);
    assert.match(html, /<meta name="robots" content="noindex,follow"/);
    assert.ok(html.includes(`<link rel="canonical" href="https://funnytools.win${to}"`));
    assert.ok(html.includes(`http-equiv="refresh" content="0; url=${to}"`));
  }
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
