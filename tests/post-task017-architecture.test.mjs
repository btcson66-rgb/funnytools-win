import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
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

function canonical(html) {
  return html.match(/<link rel="canonical" href="([^"]+)"/)?.[1] ?? null;
}

function visibleDate(html) {
  return html.match(/<p class="guide-date"[^>]*>[\s\S]*?<time datetime="(\d{4}-\d{2}-\d{2})"[^>]*>\1<\/time>/)?.[1] ?? null;
}

function sitemapHas(file, route) {
  const xml = readFileSync(join(dist, file), 'utf8');
  return xml.includes(`https://funnytools.win${route}`);
}

test('restored workflows build as WebPage routes with self canonicals and sitemap entries', () => {
  for (const route of [
    '/workflows/qr-barcode-publishing-toolkit/',
    '/workflows/grade-gpa-check-toolkit/',
    '/workflows/verify-tool-result/',
  ]) {
    const html = readRoute(route);
    const types = jsonLd(html).map((item) => item['@type']);
    assert.equal(canonical(html), `https://funnytools.win${route}`);
    assert.ok(types.includes('WebPage'), `${route} missing WebPage schema`);
    assert.ok(types.includes('BreadcrumbList'), `${route} missing BreadcrumbList schema`);
    assert.ok(!types.includes('Article'), `${route} must not be emitted as Article`);
    assert.ok(sitemapHas('sitemap-workflows.xml', route), `${route} missing from workflow sitemap`);
  }
});

test('guide page kind and category are data-driven', () => {
  const cases = [
    ['/guides/qr-barcode/', 'QR Code 與條碼', 'CollectionPage'],
    ['/guides/grades-gpa/', '成績與 GPA', 'CollectionPage'],
    ['/guides/text-writing/', '文字與寫作', 'CollectionPage'],
    ['/guides/compress-pdf-to-upload-limit/', 'PDF 文件', 'Article'],
    ['/guides/compress-image-to-upload-limit/', '圖片與檔案', 'Article'],
    ['/guides/secure-random-vs-math-random-guide/', '隨機與安全', 'Article'],
    ['/guides/t-score-calculator-guide/', '教育統計', 'Article'],
  ];

  for (const [route, category, schemaType] of cases) {
    const html = readRoute(route);
    const types = jsonLd(html).map((item) => item['@type']);
    assert.match(html, new RegExp(`<p class="eyebrow"[^>]*>[^<]*${category}`), `${route} category is not visible`);
    assert.ok(types.includes(schemaType), `${route} missing ${schemaType}`);
    if (schemaType === 'CollectionPage') assert.ok(!types.includes('Article'), `${route} hub emitted Article`);
  }
});

test('released expansion guides emit Article schema when their source omits pageKind', () => {
  for (const route of [
    '/guides/qr-code-before-print-testing-guide/',
    '/en/guides/qr-code-before-print-testing-guide/',
  ]) {
    const types = jsonLd(readRoute(route)).map((item) => item['@type']);
    assert.ok(types.includes('Article'), `${route} missing Article schema`);
  }
});

test('guide visible date, Article dateModified, and sitemap lastmod share the page source', () => {
  const cases = [
    ['/guides/t-score-calculator-guide/', '2026-06-25'],
    ['/guides/qr-code-not-scanning-print-guide/', '2026-08-27'],
  ];
  const sitemap = readFileSync(join(dist, 'sitemap-guides.xml'), 'utf8');
  for (const [route, expectedDate] of cases) {
    const html = readRoute(route);
    const article = jsonLd(html).find((item) => item['@type'] === 'Article');
    const entry = sitemap.match(new RegExp(`<loc>https://funnytools\\.win${route.replaceAll('/', '\\/')}</loc>[\\s\\S]*?<lastmod>([^<]+)</lastmod>`));
    assert.equal(visibleDate(html), expectedDate);
    assert.equal(article?.dateModified, expectedDate);
    assert.equal(entry?.[1], expectedDate);
  }
});

test('new workflows have detected inbound internal links', () => {
  const targets = new Map([
    ['/workflows/qr-barcode-publishing-toolkit/', false],
    ['/workflows/grade-gpa-check-toolkit/', false],
    ['/workflows/verify-tool-result/', false],
  ]);
  function visit(directory) {
    for (const name of readdirSync(directory, { withFileTypes: true })) {
      const file = join(directory, name.name);
      if (name.isDirectory()) visit(file);
      else if (name.name.endsWith('.html')) {
        const html = readFileSync(file, 'utf8');
        for (const route of targets.keys()) if (html.includes(`href="${route}"`)) targets.set(route, true);
      }
    }
  }
  visit(dist);
  for (const [route, found] of targets) assert.equal(found, true, `${route} is orphaned`);
});

test('locale registry records missing English guides without fake English alternates', () => {
  const registry = JSON.parse(readFileSync(join(root, 'src/i18n/expansion-routes.json'), 'utf8'));
  const cases = [
    ['/guides/file-size-units-guide/', '/es/guias/kb-mb-gb-tb-conversion/'],
    ['/guides/multiplication-fact-fluency-guide/', '/es/guias/fluidez-tablas-multiplicar/'],
    ['/guides/password-strength-basics-guide/', '/es/guias/contrasena-segura-fuerte/'],
  ];
  for (const [zhRoute, esRoute] of cases) {
    const route = registry.routes.find((entry) => entry.paths.zh === zhRoute);
    assert.deepEqual(route?.missingLocales, ['en']);
    assert.equal(route?.paths.en, undefined);
    for (const pageRoute of [zhRoute, esRoute]) {
      const html = readRoute(pageRoute);
      assert.doesNotMatch(html, /<link rel="alternate" hreflang="en"/);
      assert.match(html, /<link rel="alternate" hreflang="zh-TW"/);
      assert.match(html, /<link rel="alternate" hreflang="es"/);
      assert.match(html, /<link rel="alternate" hreflang="x-default"/);
    }
  }
});
