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
    }
  }
  assert.ok(conversionAsset, 'missing conversion API endpoint in built widget asset');
});

test('production build keeps the existing local image compressor route distinct', () => {
  const file = join(dist, 'tools', 'image-compressor', 'index.html');
  assert.ok(existsSync(file), 'missing existing local image compressor route');
  assert.doesNotMatch(readFileSync(file, 'utf8'), /bulk-image-compressor/);
});
