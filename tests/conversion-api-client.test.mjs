import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
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
  assert.doesNotMatch(source, /if \(!isDxf\) return/);
});
