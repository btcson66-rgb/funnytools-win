import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';

const dist = join(process.cwd(), 'dist');
const conversionAsset = readdirSync(join(dist, '_astro'))
  .filter((file) => file.endsWith('.js'))
  .map((file) => readFileSync(join(dist, '_astro', file), 'utf8'))
  .find((source) => source.includes('api.funnytools.win'));
const slugs = [
  'bulk-image-compressor',
  'pdf-to-word',
  'pdf-table-to-excel',
  'image-to-dxf',
  'pdf-compressor',
];

test('production build contains every conversion API tool in zh and en', () => {
  for (const slug of slugs) {
    for (const prefix of ['', 'en/']) {
      const file = join(dist, prefix, 'tools', slug, 'index.html');
      assert.ok(existsSync(file), `missing built route: ${prefix}tools/${slug}/`);
      const html = readFileSync(file, 'utf8');
      assert.match(html, /data-conversion-tool/, `missing conversion tool widget in ${file}`);
      assert.match(html, /Privacy &amp; temporary processing|隱私與暫時處理/, `missing API privacy copy in ${file}`);
      assert.doesNotMatch(html, /input is not actively uploaded|輸入內容不會主動上傳/, `misleading local-only copy in ${file}`);
    }
  }
  assert.ok(conversionAsset, 'missing conversion API endpoint in built widget asset');
});

test('production build keeps the existing local image compressor route distinct', () => {
  const file = join(dist, 'tools', 'image-compressor', 'index.html');
  assert.ok(existsSync(file), 'missing existing local image compressor route');
  assert.doesNotMatch(readFileSync(file, 'utf8'), /bulk-image-compressor/);
});

test('conversion labels expose localized clear and bulk result actions', async () => {
  const { readFile } = await import('node:fs/promises');
  const labels = await readFile(new URL('../src/i18n/tools/conversion-api-tools.ts', import.meta.url), 'utf8');
  assert.equal((labels.match(/clear: '清除'/g) || []).length, 5);
  assert.equal((labels.match(/clear: 'Clear'/g) || []).length, 5);
  assert.match(labels, /remove: '移除'/);
  assert.match(labels, /remove: 'Remove'/);
  assert.match(labels, /savedPercent: '節省比例'/);
  assert.match(labels, /savedPercent: 'Saved %'/);
});
