import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import content from '../src/i18n/tools/random-name-picker.ts';

// P2 batch 6 (2026-10-17): the gift-exchange reveal button says just "顯示" / "Show"; the giver's name lives in the
// same row (.gift-from) and in the button's aria-label.
const widget = readFileSync(new URL('../src/components/tools/RandomNamePicker.astro', import.meta.url), 'utf8');
const page = readFileSync(new URL('../dist/tools/random-name-picker/index.html', import.meta.url), 'utf8');

function labelsOf(lang) {
  const found = [];
  (function walk(value) {
    if (value && typeof value === 'object') {
      if (typeof value.giftReveal === 'string') found.push(value);
      for (const child of Object.values(value)) walk(child);
    }
  })(content[lang] ?? content);
  return found;
}

for (const [lang, show, hide] of [['zh', '顯示', '隱藏'], ['en', 'Show', 'Hide']]) {
  test(`${lang}: visible button text is short, the accessible name carries the giver and still starts with the visible word`, () => {
    const sets = labelsOf(lang);
    assert.ok(sets.length > 0, 'labels found');
    for (const labels of sets) {
      assert.equal(labels.giftReveal, show);
      assert.equal(labels.giftConceal, hide);
      assert.ok(labels.giftRevealAria.includes('{name}') && labels.giftRevealAria.startsWith(show), labels.giftRevealAria);
      assert.ok(labels.giftConcealAria.includes('{name}') && labels.giftConcealAria.startsWith(hide), labels.giftConcealAria);
    }
  });
}

test('widget: text is the short label, name only in aria-label, and both are updated on toggle', () => {
  assert.ok(widget.includes('button.textContent = labels.giftReveal;'));
  assert.ok(widget.includes("button.setAttribute('aria-label', fill(labels.giftRevealAria, { name: giver }));"));
  assert.ok(widget.includes('button.textContent = show ? labels.giftConceal : labels.giftReveal;'));
  assert.ok(widget.includes('fill(show ? labels.giftConcealAria : labels.giftRevealAria, { name: giver })'));
  assert.ok(!/button\.textContent\s*=\s*fill\(/.test(widget), 'no visible text built from the name any more');
});

test('built page ships the new labels to the widget', () => {
  assert.match(page, /&quot;giftReveal&quot;:&quot;顯示&quot;/);
  assert.match(page, /&quot;giftRevealAria&quot;:&quot;顯示 \{name\} 抽到誰&quot;/);
  assert.doesNotMatch(page, /看 \{name\} 抽到誰/);
});
