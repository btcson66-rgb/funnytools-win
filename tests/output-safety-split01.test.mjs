import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { copyTextWithFallback } from '../src/lib/clipboard-fallback.ts';
import { createOwnedObjectUrl } from '../src/lib/owned-object-url.ts';
import { safeOutputBaseName } from '../src/lib/safe-output-filename.ts';

const readSource = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('clipboard fallback handles success, denial, and a missing API', async () => {
  let promptCalls = 0;
  const prompt = (message, value) => {
    promptCalls += 1;
    assert.equal(message, 'Copy result');
    assert.equal(value, 'payload');
    return null;
  };

  const copied = [];
  assert.equal(await copyTextWithFallback('payload', 'Copy result', {
    clipboard: { writeText: async (value) => copied.push(value) },
    prompt,
  }), 'clipboard');
  assert.deepEqual(copied, ['payload']);
  assert.equal(promptCalls, 0);

  assert.equal(await copyTextWithFallback('payload', 'Copy result', {
    clipboard: { writeText: async () => { throw new Error('denied'); } },
    prompt,
  }), 'prompt');
  assert.equal(await copyTextWithFallback('payload', 'Copy result', { clipboard: null, prompt }), 'prompt');
  assert.equal(promptCalls, 2);
});

test('JSON to CSV defaults formula escaping on when the locale has no checkbox', async () => {
  const source = await readSource('src/components/tools/DataConverter.astro');
  assert.match(source, /const formulaeControl = root\.querySelector\('\[data-escape-formulae\]'\)/);
  assert.match(source, /escapeFormulae: formulaeControl \? formulaeControl\.checked : true/);
  assert.match(source, /copyTextWithFallback\(output\.value/);
});

test('the four affected clipboard tools use the shared fallback', async () => {
  const paths = [
    'src/components/tools/DataConverter.astro',
    'src/components/tools/MarkdownPreviewer.astro',
    'src/components/tools/TimestampConverter.astro',
    'src/components/tools/UuidGenerator.astro',
  ];
  for (const path of paths) {
    const source = await readSource(path);
    assert.match(source, /copyTextWithFallback/);
    assert.doesNotMatch(source, /navigator\.clipboard\.writeText/);
  }
});

test('output filename sanitizer preserves Unicode, spaces, and multi-dot stems', () => {
  const cases = [
    ['旅行 2026.09.png', '旅行 2026.09'],
    ['résumé.final.png', 'résumé.final'],
    ['..\\..\\報表 最終版.png', '報表 最終版'],
    ['bad:name?.png', 'bad-name-'],
    ['CON.png', 'image'],
    ['con.final.png', 'image'],
    ['...png', 'image'],
    ['', 'image'],
  ];
  for (const [input, expected] of cases) assert.equal(safeOutputBaseName(input), expected, input);
  assert.ok(!/[<>:"/\\|?*\u0000-\u001f]/.test(safeOutputBaseName('safe name.png')));
  assert.ok(safeOutputBaseName('a'.repeat(200) + '.png').length <= 120);
});

test('image conversion uses the Unicode-safe filename helper', async () => {
  const source = await readSource('src/components/tools/ImageFormatConverter.astro');
  assert.match(source, /import \{ safeOutputBaseName \}/);
  assert.match(source, /safeOutputBaseName\(file\.name\)/);
  assert.doesNotMatch(source, /file\.name\.replace\(\/\\\.[^/]+/);
});

test('image-to-DXF calibration owns and tears down each object URL', async () => {
  const source = await readSource('src/components/tools/ConversionApiTool.astro');
  assert.match(source, /createOwnedObjectUrl/);
  assert.match(source, /let calibrationObjectUrl = null/);
  assert.match(source, /const releaseCalibrationImage = \(\) =>/);
  assert.match(source, /calibrationUrlLease\.release\(\)/);
  assert.match(source, /calibrationUrlLease\.replace\(file\)/);
  assert.match(source, /releaseCalibrationImage\(\);/);
  assert.match(source, /window\.addEventListener\('beforeunload', releaseCalibrationImage\)/);
  assert.match(source, /window\.addEventListener\('pagehide', releaseCalibrationImage\)/);
});

test('owned object URL lease passes replacement and 100-file stress contracts', () => {
  const live = new Set();
  const revoked = [];
  let next = 0;
  const lease = createOwnedObjectUrl({
    create: () => {
      const url = `blob:test-${++next}`;
      live.add(url);
      return url;
    },
    revoke: (url) => {
      revoked.push(url);
      live.delete(url);
    },
  });

  for (let index = 0; index < 100; index += 1) {
    lease.replace({ index });
    assert.equal(live.size, 1, `live URLs after replacement ${index}`);
  }
  assert.equal(revoked.length, 99);
  lease.release();
  assert.equal(live.size, 0);
  assert.equal(revoked.length, 100);
  lease.release();
  assert.equal(revoked.length, 100, 'release is idempotent');
});
