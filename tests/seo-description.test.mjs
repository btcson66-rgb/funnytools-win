import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const seoSource = readFileSync(new URL('../src/lib/seo.ts', import.meta.url), 'utf8');
const cadHtml = readFileSync(new URL('../dist/en/tools/cad-2d/index.html', import.meta.url), 'utf8');

test('shared SEO description helper uses an ellipsis for truncated fragments', () => {
  assert.match(seoSource, /truncateText\(content\.seoDescription \|\| content\.short, 150 - usage\.length - 2, lang, true\)/);
  assert.match(seoSource, /\[。！？.!?…\]\$|[。！？]/);
});

test('rendered CAD metadata is complete and stays within the description budget', () => {
  const description = cadHtml.match(/<meta name="description" content="([^"]+)"/)?.[1] ?? '';
  assert.ok(description);
  assert.ok([...description].length <= 150);
  assert.match(description, /^Create 2D CAD sketches; export PNG or SVG\./);
  assert.doesNotMatch(description, /for simple\.$/);
});
