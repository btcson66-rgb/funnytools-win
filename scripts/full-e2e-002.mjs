import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, resolve, sep } from 'node:path';
import { chromium } from 'playwright';
import { PDFDocument } from 'pdf-lib';
import { classifyCanonicalToolDataFlow } from '../src/lib/toolDataFlow.ts';

const dist = resolve('dist');
const out = resolve('reports/full-audit-002/FUNNYTOOLS-E2E-002.json');
const png = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIHWP4z8DwHwAFgAI/ScL/nwAAAABJRU5ErkJggg==', 'base64');
const pdf = await PDFDocument.create();
pdf.addPage([300, 300]).drawText('FunnyTools test PDF', { x: 30, y: 250 });
const pdfBytes = Buffer.from(await pdf.save());
const mime = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain' };
const server = createServer((request, response) => {
  const path = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
  const file = resolve(dist, `.${path}`, path.endsWith('/') ? 'index.html' : '');
  if (!(file === dist || file.startsWith(dist + sep)) || !existsSync(file) || !statSync(file).isFile()) {
    response.writeHead(404); response.end('Not found'); return;
  }
  const ext = file.slice(file.lastIndexOf('.'));
  response.writeHead(200, { 'content-type': `${mime[ext] ?? 'application/octet-stream'}; charset=utf-8` });
  response.end(readFileSync(file));
});
await new Promise((ready) => server.listen(0, '127.0.0.1', ready));
const base = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ acceptDownloads: true });
const page = await context.newPage();
page.setDefaultTimeout(8000);
const report = { base: 'local dist', cases: [], failures: [], matrix: [] };
const record = async (name, run) => {
  try { const detail = await run(); report.cases.push({ name, status: 'PASS', detail: detail ?? '' }); }
  catch (error) { report.cases.push({ name, status: 'FAIL', error: String(error) }); report.failures.push(name); }
};
await page.route('**/*', (route) => {
  if (route.request().url().startsWith(base)) return route.continue();
  return route.abort();
});

await record('English home cards and shared navigation stay English', async () => {
  await page.goto(`${base}/en/`, { waitUntil: 'domcontentloaded' });
  assert.equal(await page.locator('html').getAttribute('lang'), 'en');
  const cards = page.locator('.tool-card');
  assert.ok(await cards.count() >= 8);
  for (const link of await cards.locator('a.tool-card__link').all()) assert.match(await link.getAttribute('href'), /^\/en\/tools\//);
  for (const card of await cards.all()) assert.equal(await card.getAttribute('data-tool-name'), (await card.locator('.tool-card__title').textContent()).trim());
  assert.match(await page.locator('header nav a').first().getAttribute('href'), /^\/en\//);
  assert.ok((await page.locator('footer a[href="/en/privacy/"]').count()) > 0);
  assert.ok(!(await cards.first().innerText()).includes('T 分數計算器'));
  await page.goto(base, { waitUntil: 'domcontentloaded' });
  assert.equal(await page.locator('html').getAttribute('lang'), 'zh-Hant');
  assert.ok((await page.locator('.tool-card').first().innerText()).includes('計算'));
});

const canonicalSlugs = readdirSync(join(dist, 'tools'), { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && existsSync(join(dist, 'tools', entry.name, 'index.html')))
  .map((entry) => entry.name);
const widgetSource = readFileSync('src/lib/toolWidgets.ts', 'utf8');
const widgetBySlug = new Map([...widgetSource.matchAll(/^\s*'?([a-z0-9-]+)'?:\s*([A-Za-z0-9_]+),\s*$/gm)].map((match) => [match[1], match[2]]));
await record('Complete canonical tool route/interaction matrix', async () => {
  assert.ok(canonicalSlugs.length >= 83, `only ${canonicalSlugs.length} tool routes`);
  const failures = [];
  for (const slug of canonicalSlugs) {
    for (const locale of ['zh', 'en']) {
      if (locale === 'en' && !existsSync(join(dist, 'en', 'tools', slug, 'index.html'))) {
        report.matrix.push({ slug, component: widgetBySlug.get(slug) ?? 'dedicated-route', data_flow_class: classifyCanonicalToolDataFlow(slug), locale, status: 'NOT_AVAILABLE_IN_LOCALE' });
        continue;
      }
      const url = `${base}/${locale === 'en' ? 'en/' : ''}tools/${slug}/`;
      const runtimeErrors = [];
      const onPageError = (error) => runtimeErrors.push(String(error));
      page.on('pageerror', onPageError);
      const response = await page.goto(url, { waitUntil: 'domcontentloaded' });
      const h1Count = await page.locator('h1').count();
      const htmlLang = await page.locator('html').getAttribute('lang');
      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
      const controls = page.locator('.tool-interaction input:not([type="hidden"]), .tool-interaction textarea, .tool-interaction button, .tool-interaction select, .tool-interaction [contenteditable="true"]');
      const controlCount = await controls.count();
      let interactionSmoke = false;
      if (controlCount) {
        const focusable = controls.filter({ visible: true }).first();
        if (await focusable.count()) {
          await focusable.focus();
          interactionSmoke = await focusable.evaluate((node) => node === document.activeElement);
        }
      }
      await page.setViewportSize({ width: 390, height: 844 });
      const mobile = controlCount > 0 && await controls.first().isVisible();
      await page.setViewportSize({ width: 1280, height: 900 });
      page.off('pageerror', onPageError);
      const row = { slug, component: widgetBySlug.get(slug) ?? 'dedicated-route', data_flow_class: classifyCanonicalToolDataFlow(slug), locale, http_status: response.status(), render: Boolean(await page.locator('h1').first().textContent()), h1_count: h1Count, html_lang: htmlLang, canonical, interaction_smoke: interactionSmoke, console_fatal: runtimeErrors, mobile };
      report.matrix.push(row);
      if (row.http_status !== 200 || !row.render || row.h1_count !== 1 || row.html_lang !== (locale === 'zh' ? 'zh-Hant' : 'en') || row.canonical !== `https://funnytools.win/${locale === 'en' ? 'en/' : ''}tools/${slug}/` || !row.interaction_smoke || row.console_fatal.length || !row.mobile) failures.push(row);
    }
  }
  assert.deepEqual(failures, []);
  return `${report.matrix.length}/${report.matrix.length} zh/en routes: 200, H1, locale, self-canonical, widget focus, no fatal script error, mobile-visible`;
});

await page.route('**/api/download-gate', async (route) => {
  const body = route.request().postDataBuffer()?.toString('utf8') ?? '';
  assert.match(body, /name="email"/);
  assert.match(body, /name="file"/);
  await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ ok: true, delivery: 'email' }) });
});

async function submitGate(slug, trigger) {
  await page.goto(`${base}/tools/${slug}/`, { waitUntil: 'domcontentloaded' });
  await trigger();
  const panel = page.locator(`.ft-gate[data-gate-tool="${slug}"]`);
  await panel.waitFor({ state: 'visible' });
  const input = panel.locator('input[type=email]');
  await input.fill('not-an-email');
  await panel.locator('button[type=submit]').click();
  assert.ok((await panel.locator('.ft-gate-status').textContent()).length > 0);
  await input.fill('qa@example.com');
  await panel.locator('button[type=submit]').click();
  await panel.locator('.ft-gate-status:not([hidden])').waitFor();
  await page.waitForFunction(() => localStorage.getItem('ft_gate_email') === 'qa@example.com');
  await page.evaluate(() => localStorage.removeItem('ft_gate_email'));
}

await record('QR generator local output then email-delivery gate', async () => {
  await submitGate('qr-code-generator', async () => {
    await page.locator('[data-qr-tool] [data-text]').fill('https://example.com/test');
    await page.locator('[data-qr-tool] [data-download]').click();
  });
});
await record('Image compressor local processing then email-delivery gate', async () => {
  await submitGate('image-compressor', async () => {
    await page.locator('[data-image-compressor-tool] [data-file]').setInputFiles({ name: 'tiny.png', mimeType: 'image/png', buffer: png });
    await page.locator('[data-image-compressor-tool] [data-download]').waitFor({ state: 'visible' });
    await page.locator('[data-image-compressor-tool] [data-download]').click();
  });
});
await record('Merge PDF local processing then email-delivery gate', async () => {
  await submitGate('merge-pdf', async () => {
    await page.locator('[data-merge-pdf-tool] [data-file]').setInputFiles([
      { name: 'one.pdf', mimeType: 'application/pdf', buffer: pdfBytes },
      { name: 'two.pdf', mimeType: 'application/pdf', buffer: pdfBytes },
    ]);
    await page.locator('[data-merge-pdf-tool] [data-merge]').click();
  });
});
await record('Remembered email and change-email control', async () => {
  await page.goto(`${base}/tools/qr-code-generator/`, { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => localStorage.setItem('ft_gate_email', 'remembered@example.com'));
  await page.reload({ waitUntil: 'domcontentloaded' });
  await page.locator('[data-qr-tool] [data-download]').click();
  const panel = page.locator('.ft-gate[data-gate-tool="qr-code-generator"]');
  await panel.locator('.ft-gate-change').waitFor();
  assert.equal(await panel.locator('form').isHidden(), true);
  await panel.locator('.ft-gate-change').click();
  assert.equal(await panel.locator('form').isVisible(), true);
  assert.equal(await page.evaluate(() => localStorage.getItem('ft_gate_email')), null);
});
await page.unroute('**/api/download-gate');
await record('Unreachable email endpoint falls back to local download', async () => {
  await page.goto(`${base}/tools/qr-code-generator/`, { waitUntil: 'domcontentloaded' });
  await page.locator('[data-qr-tool] [data-download]').click();
  const panel = page.locator('.ft-gate[data-gate-tool="qr-code-generator"]');
  await panel.locator('input[type=email]').fill('fallback@example.com');
  const download = page.waitForEvent('download');
  await panel.locator('button[type=submit]').click();
  assert.ok((await download).suggestedFilename().endsWith('.png'));
});
await page.route('**/api/download-gate', async (route) => {
  const body = route.request().postDataBuffer()?.toString('utf8') ?? '';
  assert.doesNotMatch(body, /name="file"/);
  await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ ok: true, delivery: 'local' }) });
});
await record('Oversized gate attachment is omitted and local output stays available', async () => {
  await page.goto(`${base}/tools/qr-code-generator/`, { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => Object.defineProperty(Blob.prototype, 'size', { configurable: true, get: () => 6 * 1024 * 1024 }));
  await page.locator('[data-qr-tool] [data-download]').click();
  const panel = page.locator('.ft-gate[data-gate-tool="qr-code-generator"]');
  await panel.locator('input[type=email]').fill('large@example.com');
  const download = page.waitForEvent('download');
  await panel.locator('button[type=submit]').click();
  assert.ok((await download).suggestedFilename().endsWith('.png'));
});
await page.unroute('**/api/download-gate');

const apiCalls = [];
let apiBehavior = 'success';
await page.route('**/api/**', async (route) => {
  const url = new URL(route.request().url());
  apiCalls.push({ path: url.pathname, body: route.request().postDataBuffer()?.toString('utf8').slice(0, 500) ?? '' });
  if (apiBehavior === 'network') return route.abort('failed');
  if (apiBehavior === 'api-error') return route.fulfill({ status: 400, contentType: 'application/json', body: JSON.stringify({ error: 'invalid test payload' }) });
  if (apiBehavior === 'oversize') return route.fulfill({ status: 413, contentType: 'application/json', body: JSON.stringify({ error: 'test file too large' }) });
  if (apiBehavior === 'pending') {
    await new Promise((done) => setTimeout(done, 900));
    try { await route.fulfill({ status: 200, contentType: 'application/octet-stream', body: Buffer.from('late-output') }); } catch { /* canceled request */ }
    return;
  }
  if (url.pathname.endsWith('/table-preview')) {
    return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ stats: {}, tables: [{ page: 1, table: 1, method: 'test', rows: [['Name', 'Score'], ['A', '5']] }] }) });
  }
  return route.fulfill({ status: 200, contentType: 'application/octet-stream', body: Buffer.from('test-output'), headers: url.pathname.endsWith('compress-batch') ? { 'X-Funnytools-Stats': JSON.stringify({ files: 1, input_bytes: png.length, output_bytes: 11 }) } : {} });
});
for (const [slug, endpoint, file] of [
  ['bulk-image-compressor', '/api/images/compress-batch', { name: 'tiny.png', mimeType: 'image/png', buffer: png }],
  ['pdf-to-word', '/api/pdf/to-word', { name: 'test.pdf', mimeType: 'application/pdf', buffer: pdfBytes }],
  ['pdf-table-to-excel', '/api/pdf/table-preview', { name: 'test.pdf', mimeType: 'application/pdf', buffer: pdfBytes }],
  ['image-to-dxf', '/api/image/to-dxf', { name: 'tiny.png', mimeType: 'image/png', buffer: png }],
  ['pdf-compressor', '/api/pdf/compress', { name: 'test.pdf', mimeType: 'application/pdf', buffer: pdfBytes }],
]) {
  await record(`${slug} Conversion API UI workflow`, async () => {
    await page.goto(`${base}/tools/${slug}/`, { waitUntil: 'domcontentloaded' });
    const widget = page.locator(`[data-conversion-tool][data-mode="${slug}"]`);
    await widget.locator(slug === 'bulk-image-compressor' ? '[data-files]' : '[data-file]').setInputFiles(file);
    const action = widget.locator(slug === 'pdf-table-to-excel' ? '[data-action="preview"]' : '[data-action="convert"]');
    await action.click();
    await page.waitForFunction((path) => window.__dummy === true || document.querySelector('[data-conversion-tool] [data-action="download"]')?.disabled === false || (path.endsWith('table-preview') && document.querySelector('[data-conversion-tool] [data-action="export"]')?.disabled === false), endpoint);
    assert.ok(apiCalls.some((call) => call.path === endpoint), `${endpoint} was not requested`);
    if (slug === 'pdf-table-to-excel') {
      const buttons = await widget.locator('[data-action="preview"], [data-action="export"], [data-action="download"]').allTextContents();
      assert.equal(new Set(buttons.map((value) => value.trim())).size, 3, `table action labels overlap: ${buttons}`);
      await widget.locator('[data-action="export"]').click();
      await widget.locator('[data-action="download"]:not([disabled])').waitFor();
      assert.ok(apiCalls.some((call) => call.path === '/api/pdf/export-tables'));
    }
  });
  await record(`${slug} rejects wrong MIME before API call`, async () => {
    apiBehavior = 'success';
    await page.goto(`${base}/tools/${slug}/`, { waitUntil: 'domcontentloaded' });
    const widget = page.locator(`[data-conversion-tool][data-mode="${slug}"]`);
    const count = apiCalls.length;
    await widget.locator(slug === 'bulk-image-compressor' ? '[data-files]' : '[data-file]').setInputFiles({ name: 'wrong.txt', mimeType: 'text/plain', buffer: Buffer.from('wrong') });
    assert.equal(await widget.locator(slug === 'pdf-table-to-excel' ? '[data-action="preview"]' : '[data-action="convert"]').isDisabled(), true);
    assert.ok(await widget.locator('[data-error]:not([hidden])').count());
    assert.equal(apiCalls.length, count);
  });
  for (const behavior of ['api-error', 'network', 'oversize']) {
    await record(`${slug} handles ${behavior}`, async () => {
      apiBehavior = behavior;
      await page.goto(`${base}/tools/${slug}/`, { waitUntil: 'domcontentloaded' });
      const widget = page.locator(`[data-conversion-tool][data-mode="${slug}"]`);
      await widget.locator(slug === 'bulk-image-compressor' ? '[data-files]' : '[data-file]').setInputFiles(file);
      await widget.locator(slug === 'pdf-table-to-excel' ? '[data-action="preview"]' : '[data-action="convert"]').click();
      await widget.locator('[data-error]:not([hidden])').waitFor();
      assert.equal(await widget.locator('[data-action="download"]').isDisabled(), true);
    });
  }
  await record(`${slug} cancels pending conversion and suppresses duplicate clicks`, async () => {
    apiBehavior = 'pending';
    await page.goto(`${base}/tools/${slug}/`, { waitUntil: 'domcontentloaded' });
    const widget = page.locator(`[data-conversion-tool][data-mode="${slug}"]`);
    await widget.locator(slug === 'bulk-image-compressor' ? '[data-files]' : '[data-file]').setInputFiles(file);
    const action = widget.locator(slug === 'pdf-table-to-excel' ? '[data-action="preview"]' : '[data-action="convert"]');
    const count = apiCalls.length;
    await action.click();
    assert.equal(await action.isDisabled(), true);
    assert.equal(apiCalls.length, count + 1);
    await widget.locator('[data-action="cancel"]').click();
    await widget.locator('[data-action="cancel"]').waitFor({ state: 'hidden' });
    assert.equal(await widget.locator('[data-action="download"]').isDisabled(), true);
  });
  apiBehavior = 'success';
}

await browser.close();
await new Promise((done) => server.close(done));
mkdirSync(resolve('reports/full-audit-002'), { recursive: true });
writeFileSync(out, `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify({ cases: report.cases.length, passed: report.cases.length - report.failures.length, failed: report.failures, matrixRoutes: canonicalSlugs.length, report: out }, null, 2));
if (report.failures.length) process.exitCode = 1;
