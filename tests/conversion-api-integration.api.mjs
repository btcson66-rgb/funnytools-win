import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { inflateRawSync } from 'node:zlib';

const base = (process.env.FUNNYTOOLS_SMOKE_BASE || 'http://127.0.0.1:8000').replace(/\/+$/, '');
const productionSmoke = process.env.FUNNYTOOLS_SMOKE_PROFILE === 'production';
const retryAttempts = productionSmoke ? Math.max(1, Number(process.env.FUNNYTOOLS_SMOKE_RETRIES || 3)) : 1;
const retryDelayMs = Math.max(0, Number(process.env.FUNNYTOOLS_SMOKE_RETRY_DELAY_MS || 15000));
const fixtureDir = join(process.cwd(), 'tests', 'fixtures');
const imageA = await readFile(join(fixtureDir, 'sample-a.jpg'));
const imageB = await readFile(join(fixtureDir, 'sample-b.jpg'));
const pdf = await readFile(join(fixtureDir, 'sample-table.pdf'));

function formFile(bytes, name, type) {
  return new File([bytes], name, { type });
}

function isRetryableStatus(status) {
  return status === 408 || status === 425 || status === 429 || status >= 500;
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function request(url, init) {
  let lastError;
  for (let attempt = 1; attempt <= retryAttempts; attempt += 1) {
    try {
      const response = await fetch(url, init);
      if (!productionSmoke || !isRetryableStatus(response.status) || attempt === retryAttempts) return response;
      lastError = new Error(`temporary HTTP ${response.status}`);
    } catch (error) {
      if (!productionSmoke || attempt === retryAttempts) throw error;
      lastError = error;
    }
    await wait(retryDelayMs);
  }
  throw lastError;
}

async function post(path, form) {
  const response = await request(`${base}${path}`, { method: 'POST', body: form, headers: { Origin: 'https://funnytools.win' } });
  const body = Buffer.from(await response.arrayBuffer());
  assert.equal(response.status, 200, `${path} -> ${response.status}: ${body.toString('utf8').slice(0, 500)}`);
  assert.ok(body.length > 0, `${path} returned an empty body`);
  return { response, body };
}

async function postJson(path, payload) {
  const response = await request(`${base}${path}`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: { Origin: 'https://funnytools.win', 'Content-Type': 'application/json' },
  });
  const body = Buffer.from(await response.arrayBuffer());
  assert.equal(response.status, 200, `${path} -> ${response.status}: ${body.toString('utf8').slice(0, 500)}`);
  assert.ok(body.length > 0, `${path} returned an empty body`);
  return { response, body };
}

function zipEntries(bytes) {
  const eocd = bytes.lastIndexOf(Buffer.from([0x50, 0x4b, 0x05, 0x06]));
  assert.ok(eocd >= 0, 'missing ZIP end-of-central-directory record');
  const count = bytes.readUInt16LE(eocd + 10);
  const centralSize = bytes.readUInt32LE(eocd + 12);
  const centralOffset = bytes.readUInt32LE(eocd + 16);
  assert.ok(centralOffset + centralSize <= bytes.length, 'ZIP central directory is outside the archive');
  const entries = new Map();
  let cursor = centralOffset;
  for (let index = 0; index < count; index += 1) {
    assert.equal(bytes.readUInt32LE(cursor), 0x02014b50, 'invalid ZIP central directory entry');
    const method = bytes.readUInt16LE(cursor + 10);
    const compressedSize = bytes.readUInt32LE(cursor + 20);
    const uncompressedSize = bytes.readUInt32LE(cursor + 24);
    const nameLength = bytes.readUInt16LE(cursor + 28);
    const extraLength = bytes.readUInt16LE(cursor + 30);
    const commentLength = bytes.readUInt16LE(cursor + 32);
    const localOffset = bytes.readUInt32LE(cursor + 42);
    const name = bytes.subarray(cursor + 46, cursor + 46 + nameLength).toString('utf8');
    assert.equal(bytes.readUInt32LE(localOffset), 0x04034b50, `missing local header for ${name}`);
    const localNameLength = bytes.readUInt16LE(localOffset + 26);
    const localExtraLength = bytes.readUInt16LE(localOffset + 28);
    const dataStart = localOffset + 30 + localNameLength + localExtraLength;
    const compressed = bytes.subarray(dataStart, dataStart + compressedSize);
    const value = method === 0 ? compressed : method === 8 ? inflateRawSync(compressed) : null;
    assert.ok(value, `unsupported ZIP compression method ${method}`);
    assert.equal(value.length, uncompressedSize, `ZIP size mismatch for ${name}`);
    entries.set(name, value);
    cursor += 46 + nameLength + extraLength + commentLength;
  }
  return entries;
}

function assertPdf(bytes, label) {
  assert.ok(bytes.subarray(0, 5).toString() === '%PDF-', `${label} is not a PDF`);
}

function assertJpeg(bytes, label) {
  assert.equal(bytes[0], 0xff, `${label} is not JPEG data`);
  assert.equal(bytes[1], 0xd8, `${label} is not JPEG data`);
  assert.equal(bytes.at(-2), 0xff, `${label} is not JPEG data`);
  assert.equal(bytes.at(-1), 0xd9, `${label} is not JPEG data`);
}

const health = await request(`${base}/health`, { headers: { Origin: 'https://funnytools.win' } });
assert.equal(health.status, 200);
assert.equal((await health.json()).ok, true);
assert.equal(health.headers.get('access-control-allow-origin'), 'https://funnytools.win');

const options = await request(`${base}/api/pdf/table-preview`, {
  method: 'OPTIONS',
  headers: {
    Origin: 'https://funnytools.win',
    'Access-Control-Request-Method': 'POST',
    'Access-Control-Request-Headers': 'content-type',
  },
});
assert.equal(options.status, 200);
assert.equal(options.headers.get('access-control-allow-origin'), 'https://funnytools.win');
assert.match(options.headers.get('access-control-allow-methods') || '', /POST/);

const batchForm = new FormData();
batchForm.append('files', formFile(imageA, 'sample-a.jpg', 'image/jpeg'));
batchForm.append('files', formFile(imageB, 'sample-b.jpg', 'image/jpeg'));
batchForm.set('quality', '80');
batchForm.set('max_width', '320');
batchForm.set('max_height', '240');
batchForm.set('output_format', 'jpeg');
const batch = await post('/api/images/compress-batch', batchForm);
const batchStats = JSON.parse(batch.response.headers.get('x-funnytools-stats') || 'null');
assert.ok(batchStats, 'batch response must include X-Funnytools-Stats');
assert.deepEqual(Object.keys(batchStats).sort(), ['files', 'input_bytes', 'output_bytes']);
assert.equal(batchStats.files, 2);
assert.ok(batchStats.input_bytes > 0);
assert.ok(batchStats.output_bytes > 0);
assert.match(batch.response.headers.get('access-control-expose-headers') || '', /X-Funnytools-Stats/);
const batchEntries = zipEntries(batch.body);
assertJpeg(batchEntries.get('sample-a.jpg'), 'sample-a.jpg');
assertJpeg(batchEntries.get('sample-b.jpg'), 'sample-b.jpg');
assert.match(batchEntries.get('compression-manifest.csv').toString('utf8'), /output_bytes/);

for (const includeImages of (productionSmoke ? ['false'] : ['false', 'true'])) {
  const wordForm = new FormData();
  wordForm.append('file', formFile(pdf, 'sample-table.pdf', 'application/pdf'));
  wordForm.set('ocr_mode', 'off');
  wordForm.set('ocr_lang', 'eng');
  wordForm.set('include_images', includeImages);
  const word = await post('/api/pdf/to-word', wordForm);
  const wordEntries = zipEntries(word.body);
  assert.ok(wordEntries.has('word/document.xml'), `DOCX without document.xml (${includeImages})`);
  assert.match(wordEntries.get('word/document.xml').toString('utf8'), /Widget[\s\S]*A/);
}

const previewForm = new FormData();
previewForm.append('file', formFile(pdf, 'sample-table.pdf', 'application/pdf'));
previewForm.set('pages', '1');
previewForm.set('ocr_mode', 'off');
previewForm.set('ocr_lang', 'eng');
const preview = await post('/api/pdf/table-preview', previewForm);
const tables = JSON.parse(preview.body.toString('utf8')).tables;
assert.ok(tables.length > 0, 'table preview returned no tables');

const exportResponse = await postJson('/api/pdf/export-tables', { tables });
const exportEntries = zipEntries(exportResponse.body);
assert.ok(exportEntries.has('xl/workbook.xml'), 'edited-table XLSX is missing xl/workbook.xml');

const excelForm = new FormData();
excelForm.append('file', formFile(pdf, 'sample-table.pdf', 'application/pdf'));
excelForm.set('pages', '1');
excelForm.set('ocr_mode', 'off');
excelForm.set('ocr_lang', 'eng');
const excel = await post('/api/pdf/table-to-excel', excelForm);
const excelEntries = zipEntries(excel.body);
assert.ok(excelEntries.has('xl/workbook.xml'), 'XLSX is missing xl/workbook.xml');
assert.ok(excelEntries.has('[Content_Types].xml'), 'XLSX is missing content types');

const dxfForm = new FormData();
dxfForm.append('file', formFile(imageA, 'sample-a.jpg', 'image/jpeg'));
dxfForm.set('threshold', '180');
dxfForm.set('invert', 'false');
dxfForm.set('blur', '3');
dxfForm.set('epsilon_ratio', '0.0025');
dxfForm.set('min_area', '20');
dxfForm.set('units', 'mm');
const dxf = await post('/api/image/to-dxf', dxfForm);
assert.match(dxf.body.toString('utf8'), /SECTION/);
assert.match(dxf.response.headers.get('content-disposition') || '', /vectorized\.dxf/);

for (const preset of (productionSmoke ? ['balanced'] : ['lossless', 'balanced', 'strong'])) {
  const compressForm = new FormData();
  compressForm.append('file', formFile(pdf, 'sample-table.pdf', 'application/pdf'));
  compressForm.set('preset', preset);
  const compressed = await post('/api/pdf/compress', compressForm);
  assertPdf(compressed.body, `${preset} compressed output`);
  const stats = JSON.parse(compressed.response.headers.get('x-funnytools-stats'));
  assert.equal(stats.input_bytes - stats.output_bytes, stats.saved_bytes);
  assert.equal(stats.pages, 1);
}

const invalidPages = new FormData();
invalidPages.append('file', formFile(pdf, 'sample-table.pdf', 'application/pdf'));
invalidPages.set('pages', '1,,3');
const invalid = await request(`${base}/api/pdf/table-preview`, { method: 'POST', body: invalidPages });
assert.equal(invalid.status, 400);
assert.match((await invalid.json()).detail, /comma-separated positive/);

console.log(JSON.stringify({
  base,
  profile: productionSmoke ? 'production-lightweight' : 'full',
  health: 'PASS',
  cors_options: 'PASS',
  batch_images_zip_and_images: 'PASS',
  docx_ooxml_and_text: 'PASS',
  table_preview_and_xlsx: 'PASS',
  dxf_signature: 'PASS',
  pdf_presets_and_stats: 'PASS',
  invalid_input: 'PASS',
}, null, 2));
