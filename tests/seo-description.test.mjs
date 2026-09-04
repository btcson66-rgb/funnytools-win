import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const seoSource = readFileSync(new URL('../src/lib/seo.ts', import.meta.url), 'utf8');
const baseLayoutSource = readFileSync(new URL('../src/layouts/BaseLayout.astro', import.meta.url), 'utf8');
const cadHtml = readFileSync(new URL('../dist/en/tools/cad-2d/index.html', import.meta.url), 'utf8');

test('shared SEO description helper uses an ellipsis for truncated fragments', () => {
  assert.match(seoSource, /truncateText\(content\.seoDescription \|\| content\.short, 150 - usage\.length - 2, lang, true\)/);
  assert.match(seoSource, /\[。！？.!?…\]\$|[。！？]/);
});

test('rendered CAD metadata is complete and stays within the description budget', () => {
  const description = cadHtml.match(/<meta name="description" content="([^"]+)"/)?.[1] ?? '';
  assert.ok(description);
  assert.ok([...description].length <= 150);
  // The shared helper enforces the 150-character budget and appends the
  // browser-only privacy suffix, so the descriptive source text may be
  // truncated at an ellipsis in the rendered metadata.
  assert.match(description, /^Create simple 2D CAD drawings online with…/);
  assert.match(description, /Free, no registration\. Inputs and files stay in your browser and are not uploaded to FunnyTools servers\.$/);
  assert.doesNotMatch(description, /for simple\.$/);
});

test('shared OG fallback uses the page title for meaningful alt text', () => {
  assert.match(baseLayoutSource, /const ogAlt = ogImageAlt \?\? title;/);
  assert.doesNotMatch(baseLayoutSource, /const ogAlt = ogImageAlt \?\? SITE\.name\[lang\];/);
});

test('tool pages use topic-specific social images', () => {
  assert.match(seoSource, /export function categoryOgImage\(lang: Locale, categoryId: string\)/);
  assert.match(seoSource, /og\/\$\{lang\}-\$\{categoryId\}\.png/);
  const toolLayoutSource = readFileSync(new URL('../src/layouts/ToolLayout.astro', import.meta.url), 'utf8');
  assert.match(toolLayoutSource, /ogImage=\{categoryOgImage\(lang, category\.id\)\}/);
  assert.match(toolLayoutSource, /ogImageAlt=\{`\$\{content\.name\} · \$\{category\.name\[lang\]\}`\}/);
});
