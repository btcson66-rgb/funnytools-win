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

test('English task guides remain available but are noindex under the T2 convergence policy', async () => {
  for (const slug of slugs) {
    const html = await readFile(join(root, 'dist', 'en', 'guides', slug, 'index.html'), 'utf8');
    assert.match(html, /<meta[^>]+name="robots"[^>]+content="noindex,follow"/i, `${slug} must be noindex,follow`);
    assert.match(html, new RegExp(`<link rel="canonical" href="https://funnytools\\.win/en/guides/${slug}/"`));
    assert.doesNotMatch(html, /rel="alternate" hreflang=/i);
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
