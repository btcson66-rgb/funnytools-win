import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { collectUsedCids, pruneHtml, pruneScopedCss } from '../scripts/prune-scoped-css.mjs';

// P2 batch 7 (2026-10-17): each page's inline <style> carries only the scoped component CSS the page can match.
const used = new Set(['aaaa']);

test('prune: rules that need an absent data-astro-cid are removed, present ones kept', () => {
  const css = '.a[data-astro-cid-aaaa]{color:red}.b[data-astro-cid-bbbb]{color:blue}.g{color:green}';
  const { css: out, removedRules } = pruneScopedCss(css, used);
  assert.equal(out, '.a[data-astro-cid-aaaa]{color:red}.g{color:green}');
  assert.equal(removedRules, 1);
});

test('prune: selector lists drop only the dead selectors; empty @media wrappers go; @keyframes and @font-face stay', () => {
  const css = '.a[data-astro-cid-aaaa],.b[data-astro-cid-bbbb]{margin:0}'
    + '@media(min-width:768px){.b[data-astro-cid-bbbb]{margin:1px}}'
    + '@media(min-width:768px){.a[data-astro-cid-aaaa]{margin:2px}.b[data-astro-cid-bbbb]{margin:3px}}'
    + '@keyframes spin{0%{opacity:0}to{opacity:1}}@font-face{font-family:x;src:url(x.woff2)}';
  const { css: out } = pruneScopedCss(css, used);
  assert.equal(
    out,
    '.a[data-astro-cid-aaaa]{margin:0}@media(min-width:768px){.a[data-astro-cid-aaaa]{margin:2px}}'
      + '@keyframes spin{0%{opacity:0}to{opacity:1}}@font-face{font-family:x;src:url(x.woff2)}',
  );
});

test('prune: a rule needing two cids is dead when either is absent; :not()/:has() with a cid is never pruned', () => {
  const css = '.a[data-astro-cid-aaaa] .b[data-astro-cid-bbbb]{x:1}.c:not(.d[data-astro-cid-bbbb]){x:2}.e:has(.f[data-astro-cid-bbbb]){x:3}';
  const { css: out } = pruneScopedCss(css, used);
  assert.equal(out, '.c:not(.d[data-astro-cid-bbbb]){x:2}.e:has(.f[data-astro-cid-bbbb]){x:3}');
});

test('prune: used cids come from the page markup only, not from its own <style>', () => {
  const html = '<style>.a[data-astro-cid-aaaa]{x:1}.b[data-astro-cid-bbbb]{x:2}</style><div data-astro-cid-aaaa></div>';
  assert.deepEqual([...collectUsedCids(html.replace(/<style[\s\S]*?<\/style>/g, ''))], ['aaaa']);
  assert.equal(pruneHtml(html).html, '<style>.a[data-astro-cid-aaaa]{x:1}</style><div data-astro-cid-aaaa></div>');
});

const toolRoutes = ['class-rank-percentile-calculator', 'grade-average', 'independent-samples-t-test-calculator', 'percentile-rank-calculator', 'random-name-picker', 'standard-deviation', 't-score-calculator', 'teacher-exam-score-converter', 'weighted-average-calculator', 'z-score-calculator'];

test('built tool pages: every scoped rule in the inline CSS has its component on the page, and the CSS stays under budget', () => {
  for (const slug of toolRoutes) {
    const html = readFileSync(new URL(`../dist/tools/${slug}/index.html`, import.meta.url), 'utf8');
    const css = [...html.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1]).join('');
    const usedCids = collectUsedCids(html.replace(/<style\b[^>]*>[\s\S]*?<\/style>/g, ''));
    assert.ok(usedCids.size > 0, `${slug} renders scoped components`);
    const dead = pruneScopedCss(css, usedCids).removedRules;
    assert.equal(dead, 0, `${slug} still carries ${dead} rules for components it does not render`);
    // before this change every tool page carried ~103 KB; the shared global.css alone is ~48 KB
    assert.ok(Buffer.byteLength(css) < 70 * 1024, `${slug} inline CSS is ${Buffer.byteLength(css)} bytes`);
  }
});

test('built pages keep their single inline stylesheet (no extra blocking CSS request)', () => {
  for (const route of ['index.html', 'tools/t-score-calculator/index.html', 'about/index.html']) {
    const html = readFileSync(new URL(`../dist/${route}`, import.meta.url), 'utf8');
    assert.doesNotMatch(html, /<link[^>]+rel=["']stylesheet["']/i, route);
    assert.ok((html.match(/<style\b/g) ?? []).length >= 1, route);
  }
});
