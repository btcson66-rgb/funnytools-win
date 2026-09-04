import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const root = process.cwd();
const slugs = [
  'pdf-upload-failed-troubleshooting',
  'pdf-split-vs-extract-vs-delete',
  'percentage-grade-to-gpa-conversion-guide',
];

test('new English task guides are indexable and self-consistent', async () => {
  for (const slug of slugs) {
    const html = await readFile(join(root, 'dist', 'en', 'guides', slug, 'index.html'), 'utf8');
    assert.doesNotMatch(html, /<meta[^>]+name="robots"[^>]+content="[^"]*noindex/i, `${slug} must be indexable`);
    assert.match(html, new RegExp(`<link rel="canonical" href="https://funnytools\\.win/en/guides/${slug}/"`));
    assert.match(html, new RegExp(`hreflang="zh-TW" href="https://funnytools\\.win/guides/${slug}/"`));
    assert.match(html, new RegExp(`<h1[^>]*>[^<]+</h1>`));
    assert.doesNotMatch(html, /SEO strategy|target keyword|task package|internal brief|Codex|Claude/i);
  }
});

test('inflation calculator distinguishes empty values from numeric zero', async () => {
  const source = await readFile(join(root, 'src', 'components', 'tools', 'InflationCalculator.astro'), 'utf8');
  assert.match(source, /const amountRaw = amountInput\.value\.trim\(\);/);
  assert.match(source, /const rateRaw = rateInput\.value\.trim\(\);/);
  assert.match(source, /const yearsRaw = yearsInput\.value\.trim\(\);/);
  assert.match(source, /!amountRaw[\s\S]*!rateRaw[\s\S]*!yearsRaw/);
});
