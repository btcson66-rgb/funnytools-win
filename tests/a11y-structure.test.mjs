// Structural accessibility checks for the tool widgets (task-02-reliability
// browser-capability & mobile/a11y audit, BUILD_SPEC §14).
//
// These tests read source (src/components/tools/*.astro) and, where the
// property can only be observed post-render (does a real <label> end up
// wrapping this <input>?), the production build in dist/. No browser or
// Playwright is used — every check is regex/text based, matching the style
// already used by tests/conversion-api-pages.test.mjs and
// tests/merge-pdf-limits.test.mjs. Run `npm run build` before `node --test`
// (as `npm test` already does) so dist/ exists.
//
// Two of the sweeps below (click targets, error roles) are exhaustive across
// every tool widget and currently pass — they guard against regressions.
// The clipboard sweep and the two targeted table-input checks currently FAIL
// on purpose: they document real gaps found during the audit and should
// only go green once those widgets are fixed, not by loosening the
// assertion.

import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';

const toolsDir = join(process.cwd(), 'src', 'components', 'tools');
const toolFiles = readdirSync(toolsDir).filter((file) => file.endsWith('.astro'));
const dist = join(process.cwd(), 'dist');

function readTool(name) {
  return readFileSync(join(toolsDir, `${name}.astro`), 'utf8');
}

// ---------------------------------------------------------------------------
// 1. No click handler is wired to a bare non-interactive element.
//
// Scans every tool widget's <script> for `[data-x]` selectors immediately
// followed by `.addEventListener('click', ...)`, then looks up what tag
// data-x actually appears on anywhere in the file (the static template, or
// an HTML string built with innerHTML/template literals for dynamically
// added rows). Flags it if that tag is not a real interactive element.
// ---------------------------------------------------------------------------

const NON_INTERACTIVE_TAGS = new Set([
  'div', 'span', 'p', 'li', 'td', 'tr', 'ul', 'ol',
  'section', 'article', 'img', 'figure',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
]);

function findClickTargets(source) {
  const scriptStart = source.indexOf('<script');
  const script = scriptStart === -1 ? '' : source.slice(scriptStart);

  // Tag lookup covers the WHOLE file (not just the static template) so that
  // rows built with `row.innerHTML = \`<button data-remove>...\`` inside the
  // script are still resolved to their real tag name.
  const tagMap = new Map();
  const tagRe = /<([a-zA-Z][\w-]*)\b([^>]*)>/g;
  let tagMatch;
  while ((tagMatch = tagRe.exec(source))) {
    const tag = tagMatch[1].toLowerCase();
    const attrs = tagMatch[2];
    const dataAttrRe = /data-([\w-]+)/g;
    let dataMatch;
    while ((dataMatch = dataAttrRe.exec(attrs))) {
      if (!tagMap.has(dataMatch[1])) tagMap.set(dataMatch[1], tag);
    }
  }

  const clickRe = /\[data-([\w-]+)\][^)]*\)\s*\??\.addEventListener\(\s*['"]click['"]/g;
  const results = [];
  let clickMatch;
  while ((clickMatch = clickRe.exec(script))) {
    results.push({ dataAttr: clickMatch[1], tag: tagMap.get(clickMatch[1]) });
  }
  return results;
}

test('no tool widget attaches a click handler to a bare div/span/etc. instead of a real control', () => {
  const violations = [];
  for (const file of toolFiles) {
    const source = readFileSync(join(toolsDir, file), 'utf8');
    for (const { dataAttr, tag } of findClickTargets(source)) {
      if (tag && NON_INTERACTIVE_TAGS.has(tag)) {
        violations.push(`${file}: [data-${dataAttr}] click handler is on a <${tag}>, not a button/link/input`);
      }
    }
  }
  assert.deepEqual(violations, [], `found click handlers on non-interactive elements:\n${violations.join('\n')}`);
});

// ---------------------------------------------------------------------------
// 2. Every error region uses role="alert" so assistive tech announces it.
// ---------------------------------------------------------------------------

test('every [data-error] element across all tool widgets has role="alert"', () => {
  const violations = [];
  for (const file of toolFiles) {
    const source = readFileSync(join(toolsDir, file), 'utf8');
    if (!source.includes('data-error')) continue;
    if (!/data-error[^>]*role="alert"|role="alert"[^>]*data-error/.test(source)) {
      violations.push(file);
    }
  }
  assert.deepEqual(violations, [], `[data-error] element missing role="alert" in: ${violations.join(', ')}`);
});

// ---------------------------------------------------------------------------
// 3. navigator.clipboard.writeText() calls must have a failure path.
//
// A rejected clipboard promise (insecure context, permission denied, or the
// API missing entirely) must not disappear silently. This requires either a
// surrounding try/catch or a chained .catch(...).
// ---------------------------------------------------------------------------

function clipboardWriteTextCallsAreGuarded(source) {
  const re = /navigator\.clipboard\.writeText\([^)]*\)/g;
  return [...source.matchAll(re)].every((match) => {
    const after = source.slice(match.index + match[0].length, match.index + match[0].length + 20);
    const before = source.slice(Math.max(0, match.index - 100), match.index);
    return /^\s*\.catch\(/.test(after) || /\btry\s*\{/.test(before);
  });
}

test('every navigator.clipboard.writeText() call has a try/catch or .catch() fallback', () => {
  const failing = [];
  for (const file of toolFiles) {
    const source = readFileSync(join(toolsDir, file), 'utf8');
    if (!source.includes('navigator.clipboard.writeText(')) continue;
    if (!clipboardWriteTextCallsAreGuarded(source)) failing.push(file);
  }
  assert.deepEqual(
    failing,
    [],
    `these widgets call navigator.clipboard.writeText() with no try/catch or .catch(): ${failing.join(', ')}. ` +
    'When the Clipboard API is unsupported/blocked (insecure context, permission denied, older browser) ' +
    'the promise rejects and the user sees nothing (see AgeCalculator.astro for the working try/catch + window.prompt fallback pattern).',
  );
});

// ---------------------------------------------------------------------------
// 4. Dynamically-created table/row inputs still need an accessible name.
//    (targeted checks for two confirmed gaps found during the audit)
// ---------------------------------------------------------------------------

test('ChartMaker per-row label/value inputs expose an accessible name beyond their placeholder', () => {
  const source = readTool('ChartMaker');
  assert.match(source, /labelInput\.placeholder = labels\.labelHeader/, 'expected ChartMaker.astro createRow() to still build labelInput the way this test was written against');
  const hasLabelAria = /labelInput\.(setAttribute\(\s*['"]aria-label['"]|ariaLabel\s*=)/.test(source);
  const hasValueAria = /valueInput\.(setAttribute\(\s*['"]aria-label['"]|ariaLabel\s*=)/.test(source);
  assert.ok(
    hasLabelAria && hasValueAria,
    'ChartMaker.astro creates the per-row label/value <input> elements with only a `.placeholder` ' +
    '(labelInput.placeholder / valueInput.placeholder in createRow()); placeholder text is not a reliable ' +
    'accessible name, and the visual column header row (.chart-rows-head) is aria-hidden="true", so a screen ' +
    'reader user gets no name at all for these fields once they start typing. Add aria-label (or aria-labelledby) ' +
    'to labelInput/valueInput.',
  );
});

test('ConversionApiTool pdf-table-to-excel per-cell inputs expose an accessible name', () => {
  const source = readTool('ConversionApiTool');
  const anchor = 'table.rows.forEach((row, rowIndex)';
  const idx = source.indexOf(anchor);
  assert.notEqual(idx, -1, 'expected renderTables() row-rendering code to exist in ConversionApiTool.astro');
  const block = source.slice(idx, idx + 700);
  assert.match(
    block,
    /aria-label/,
    'the editable table cells built in renderTables() (isTable / pdf-table-to-excel branch) create a bare ' +
    '<input> per cell (table.rows.forEach(...) -> document.createElement(\'input\')) with no aria-label, ' +
    'aria-labelledby, or wrapping <label>, and no visible column/row context is attached to the cell either. ' +
    'A screen reader user editing a detected table hears only "edit text" for every one of dozens of cells.',
  );
});

// ---------------------------------------------------------------------------
// 5. A phase/status message that changes over time needs a live region.
// ---------------------------------------------------------------------------

test('BreakReminder phase status announces changes via aria-live or role=status', () => {
  const source = readTool('BreakReminder');
  assert.match(source, /data-status/, 'expected BreakReminder.astro to still render a [data-status] phase label');
  // 錨點原本把開標籤寫死到 data-status 後立刻結束，於是加了 aria-live／role="status"
  // （正是本測試要求的修法）反而匹配不到，兩個方向都不可能通過。改成允許開標籤帶
  // 其他屬性；下方的斷言強度完全不變，仍要求該元素具備 aria-live 或 role="status"。
  const statusTagMatch = /<p class="phase-label" data-status[^>]*>[^<]*<\/p>/.exec(source);
  assert.ok(statusTagMatch, 'expected to find the phase-label <p data-status> markup');
  assert.match(
    statusTagMatch[0],
    /aria-live=|role="status"/,
    'the phase label (<p class="phase-label" data-status>) that switches between focus/break text as the ' +
    'timer runs has no aria-live or role="status", so a screen reader user is not told when the phase changes ' +
    'unless they happen to move focus back onto it.',
  );
});

// ---------------------------------------------------------------------------
// 6. Representative built pages: every visible form control has a label.
//
// Runs against the production build (npm run build) for the tool pages
// picked as the representative sample in reports/task-02-reliability/
// mobile-a11y-audit.md, scoped to just the tool-widget <section> so
// unrelated site chrome (nav/search) isn't included.
// ---------------------------------------------------------------------------

const REPRESENTATIVE_ROUTES = [
  'tools/compound-interest',
  'tools/gpa-calculator',
  'tools/merge-pdf',
  'tools/bulk-image-compressor',
  'tools/pdf-to-word',
  'tools/pdf-table-to-excel',
  'tools/image-to-dxf',
  'tools/pdf-compressor',
  'tools/sketchpad',
  'tools/cad-2d',
  'tools/bar-chart-maker',
  'tools/pie-chart-maker',
  'tools/qr-code-generator',
  'tools/barcode-generator',
];

function extractWidgetSection(html) {
  const openTagRe = /<section\b[^>]*class="[^"]*\btool-widget\b[^"]*"[^>]*>/;
  const startMatch = openTagRe.exec(html);
  if (!startMatch) return null;
  const start = startMatch.index;
  let depth = 1;
  const sectionTagRe = /<(\/?)section\b[^>]*>/g;
  sectionTagRe.lastIndex = start + startMatch[0].length;
  let end = html.length;
  let tagMatch;
  while ((tagMatch = sectionTagRe.exec(html))) {
    depth += tagMatch[1] === '/' ? -1 : 1;
    if (depth === 0) { end = tagMatch.index + tagMatch[0].length; break; }
  }
  return html.slice(start, end);
}

function labelRanges(section) {
  const ranges = [];
  const re = /<label\b[^>]*>[\s\S]*?<\/label>/g;
  let match;
  while ((match = re.exec(section))) ranges.push([match.index, match.index + match[0].length]);
  return ranges;
}

test('representative tool pages: every rendered input/select/textarea has a label', { skip: !existsSync(dist) ? 'dist/ missing; run npm run build first' : false }, () => {
  const violations = [];
  for (const route of REPRESENTATIVE_ROUTES) {
    const file = join(dist, route, 'index.html');
    if (!existsSync(file)) { violations.push(`${route}: missing dist file (build did not produce this route)`); continue; }
    const html = readFileSync(file, 'utf8');
    const section = extractWidgetSection(html);
    if (!section) { violations.push(`${route}: no <section class="tool-widget"> found`); continue; }
    const ranges = labelRanges(section);
    const inputRe = /<(input|select|textarea)\b([^>]*)>/g;
    let match;
    while ((match = inputRe.exec(section))) {
      const attrs = match[2];
      if (/type\s*=\s*"hidden"/.test(attrs)) continue;
      const hasAria = /aria-label(led-?by)?\s*=/.test(attrs);
      const inLabel = ranges.some(([s, e]) => match.index >= s && match.index < e);
      if (!hasAria && !inLabel) {
        violations.push(`${route}: <${match[1]} ${attrs.slice(0, 60).trim()}...> has no <label> wrapper or aria-label`);
      }
    }
  }
  assert.deepEqual(violations, [], violations.join('\n'));
});
