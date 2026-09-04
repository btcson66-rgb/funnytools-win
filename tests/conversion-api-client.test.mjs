import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
  compressImagesWithStats,
  PageSelectionError,
  parsePageSelection,
} from '../src/lib/funnytools-api.ts';

test('page selection parser accepts numbers, ranges, spaces, and de-duplicates in order', () => {
  assert.equal(parsePageSelection(''), undefined);
  assert.deepEqual(parsePageSelection('1'), [1]);
  assert.deepEqual(parsePageSelection('1,2,4'), [1, 2, 4]);
  assert.deepEqual(parsePageSelection('1-3'), [1, 2, 3]);
  assert.deepEqual(parsePageSelection('1, 3-5, 8'), [1, 3, 4, 5, 8]);
  assert.deepEqual(parsePageSelection('5, 3-5, 1'), [1, 3, 4, 5]);
});

test('page selection parser rejects malformed and unsafe input', () => {
  for (const value of ['abc', '1,,3', '0', '-1', '3-1']) {
    assert.throws(() => parsePageSelection(value), PageSelectionError, value);
  }
  assert.throws(() => parsePageSelection('1-201'), (error) => error instanceof PageSelectionError && error.code === 'too-many-pages');
});

test('conversion widget uses browser mode data and localized API error handling', async () => {
  const { readFile } = await import('node:fs/promises');
  const source = await readFile(new URL('../src/components/tools/ConversionApiTool.astro', import.meta.url), 'utf8');
  assert.match(source, /if \(mode !== 'image-to-dxf'\) return/);
  assert.match(source, /parsePageSelection\(root\.querySelector\('\[data-pages\]'\)/);
  assert.match(source, /data-drop-zone/);
  assert.match(source, /compressImagesWithStats/);
  assert.match(source, /data-bulk-saved-percent/);
  assert.match(source, /textContent = labels\.remove/);
  assert.match(source, /const pdfModes = new Set\(\['pdf-to-word', 'pdf-table-to-excel', 'pdf-compressor'\]\)/);
  assert.match(source, /const isPdfFile = \(file\) =>/);
  assert.match(source, /labels\.invalidFile \|\| labels\.noFile/);
  assert.doesNotMatch(source, /innerHTML/);
  assert.doesNotMatch(source, /: 'Clear'/);
  assert.doesNotMatch(source, /if \(!isDxf\) return/);
});

test('batch compression stats preserve the Blob API and tolerate missing metadata', async () => {
  const originalFetch = globalThis.fetch;
  try {
    globalThis.fetch = async () => new Response(new Uint8Array([1, 2, 3]), {
      status: 200,
      headers: { 'X-Funnytools-Stats': '{"files":2,"input_bytes":100,"output_bytes":40}' },
    });
    const result = await compressImagesWithStats('https://api.example.test', [new File(['x'], 'one.jpg', { type: 'image/jpeg' })]);
    assert.equal(result.blob.size, 3);
    assert.deepEqual(result.stats, { files: 2, input_bytes: 100, output_bytes: 40 });

    globalThis.fetch = async () => new Response(new Uint8Array([4]), { status: 200 });
    const withoutHeader = await compressImagesWithStats('https://api.example.test', [new File(['x'], 'one.jpg', { type: 'image/jpeg' })]);
    assert.equal(withoutHeader.blob.size, 1);
    assert.equal(withoutHeader.stats, null);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
