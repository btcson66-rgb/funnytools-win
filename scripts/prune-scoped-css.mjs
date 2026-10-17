// Post-build step: keep, in every page's inline <style>, only the scoped
// component CSS that the page can actually match.
//
// Why this exists: src/lib/toolWidgets.ts imports every tool widget, so Astro
// puts the scoped CSS of all ~75 components into each tool page (verified:
// moving to dynamic import() does not change that, Astro follows dynamic
// importers too). Astro scopes component CSS with a [data-astro-cid-xxxx]
// attribute selector, which can only match an element that carries that
// attribute. If the page's HTML has no element with data-astro-cid-xxxx, every
// rule that requires it is dead for that page. Removing those rules cannot
// change what the page renders.
//
// Deliberately NOT pruned (always kept):
//  - rules with no data-astro-cid selector (global.css, :global(), @font-face,
//    @keyframes, custom properties) - class usage can be driven from JS;
//  - selectors that use :not() / :has() / :is() / :where() together with a cid,
//    because "absent cid" does not prove "never matches" inside those.
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import postcss from 'postcss';

const CID_SELECTOR = /\[data-astro-cid-([a-z0-9]+)\]/g;
const CID_ATTRIBUTE = /\bdata-astro-cid-([a-z0-9]+)\b/g;
const LOGICAL_PSEUDO = /:(?:not|has|is|where|matches)\(/i;
const STYLE_BLOCK = /(<style\b[^>]*>)([\s\S]*?)(<\/style>)/gi;
const PRUNABLE_AT_RULES = /^(?:media|supports|container|layer)$/i;

export function collectUsedCids(htmlWithoutStyles) {
  return new Set([...htmlWithoutStyles.matchAll(CID_ATTRIBUTE)].map((match) => match[1]));
}

export function pruneScopedCss(css, usedCids) {
  const root = postcss.parse(css);
  let removedRules = 0;
  root.walkRules((rule) => {
    const parent = rule.parent;
    if (parent?.type === 'atrule' && /keyframes$/i.test(parent.name)) return;
    const selectors = rule.selectors;
    const kept = selectors.filter((selector) => {
      if (LOGICAL_PSEUDO.test(selector)) return true;
      for (const match of selector.matchAll(CID_SELECTOR)) {
        if (!usedCids.has(match[1])) return false;
      }
      return true;
    });
    if (kept.length === selectors.length) return;
    removedRules += 1;
    if (kept.length === 0) rule.remove();
    else rule.selectors = kept;
  });
  // A @media/@supports wrapper left empty is dead weight; never touch
  // @font-face, @keyframes or anything else.
  root.walkAtRules((atRule) => {
    if (PRUNABLE_AT_RULES.test(atRule.name) && atRule.nodes && atRule.nodes.length === 0) atRule.remove();
  });
  return { css: root.toString(), removedRules };
}

export function pruneHtml(html) {
  const withoutStyles = html.replace(STYLE_BLOCK, '');
  const used = collectUsedCids(withoutStyles);
  let removedRules = 0;
  const next = html.replace(STYLE_BLOCK, (whole, open, css, close) => {
    if (!css.includes('data-astro-cid-')) return whole;
    const result = pruneScopedCss(css, used);
    removedRules += result.removedRules;
    return `${open}${result.css}${close}`;
  });
  return { html: next, removedRules };
}

function* walkHtml(dir) {
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) yield* walkHtml(full);
    else if (entry.endsWith('.html')) yield full;
  }
}

export function pruneDist(distDir) {
  let files = 0;
  let bytesBefore = 0;
  let bytesAfter = 0;
  for (const file of walkHtml(distDir)) {
    const before = readFileSync(file, 'utf8');
    if (!before.includes('data-astro-cid-')) continue;
    const { html, removedRules } = pruneHtml(before);
    if (!removedRules) continue;
    writeFileSync(file, html, 'utf8');
    files += 1;
    bytesBefore += Buffer.byteLength(before);
    bytesAfter += Buffer.byteLength(html);
  }
  return { files, bytesBefore, bytesAfter };
}

export default function pruneScopedCssIntegration() {
  return {
    name: 'fable-prune-scoped-css',
    hooks: {
      'astro:build:done': ({ dir, logger }) => {
        const { files, bytesBefore, bytesAfter } = pruneDist(fileURLToPath(dir));
        logger.info(`pruned unused scoped CSS on ${files} pages (${bytesBefore - bytesAfter} bytes of HTML removed)`);
      },
    },
  };
}
