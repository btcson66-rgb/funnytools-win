import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import vm from 'node:vm';

const breakSource = readFileSync(new URL('../src/components/tools/BreakReminder.astro', import.meta.url), 'utf8');
const chartSource = readFileSync(new URL('../src/components/tools/ChartMaker.astro', import.meta.url), 'utf8');
const conversionSource = readFileSync(new URL('../src/components/tools/ConversionApiTool.astro', import.meta.url), 'utf8');
const breakScript = breakSource.match(/<script>\s*([\s\S]*?)\s*<\/script>/)?.[1];
const chartScript = chartSource.match(/<script>\s*([\s\S]*?)\s*<\/script>/)?.[1];
assert.ok(breakScript && chartScript, 'Split 03 client scripts should be present');

class FakeElement {
  constructor(tagName = 'div') {
    this.tagName = tagName.toUpperCase();
    this.children = [];
    this.parentNode = null;
    this.attributes = new Map();
    this.listeners = new Map();
    this.textContent = '';
    this.value = '';
    this.hidden = false;
    this.disabled = false;
    this.className = '';
    this.type = '';
    this.onclick = null;
    this.placeholder = '';
    this.setCount = 0;
    this.classList = {
      add: (...names) => { this.className = [...new Set(`${this.className} ${names.join(' ')}`.trim().split(/\s+/))].join(' '); },
      remove: (...names) => { this.className = this.className.split(/\s+/).filter((name) => name && !names.includes(name)).join(' '); },
    };
  }

  set textContent(value) {
    this._textContent = String(value ?? '');
    this.setCount = (this.setCount || 0) + 1;
  }

  get textContent() {
    return this._textContent;
  }

  get innerHTML() {
    return this._innerHTML || '';
  }

  set innerHTML(value) {
    this._innerHTML = String(value ?? '');
  }

  get firstElementChild() {
    return this.children[0] ?? null;
  }

  append(...nodes) {
    nodes.forEach((node) => {
      if (!node) return;
      node.parentNode = this;
      this.children.push(node);
    });
  }

  appendChild(node) {
    this.append(node);
    return node;
  }

  replaceChildren(...nodes) {
    this.children = [];
    this.append(...nodes);
  }

  remove() {
    if (!this.parentNode) return;
    this.parentNode.children = this.parentNode.children.filter((child) => child !== this);
    this.parentNode = null;
  }

  setAttribute(name, value) {
    this.attributes.set(name, String(value));
    if (name === 'class') this.className = String(value);
  }

  getAttribute(name) {
    return this.attributes.get(name) ?? null;
  }

  addEventListener(type, listener) {
    this.listeners.set(type, listener);
  }

  dispatch(type) {
    this.listeners.get(type)?.({ currentTarget: this, target: this, preventDefault() {} });
  }

  click() {
    this.onclick?.({ currentTarget: this, target: this, preventDefault() {} });
    this.dispatch('click');
  }

  matchesSimple(selector) {
    selector = selector.trim();
    if (selector === '*') return true;
    if (selector.startsWith('.')) return this.className.split(/\s+/).includes(selector.slice(1));
    const attr = selector.match(/^\[([^=\]]+)(?:=["']?([^\]"']+)["']?)?\]$/);
    if (attr) return this.attributes.has(attr[1]) && (attr[2] == null || this.getAttribute(attr[1]) === attr[2]);
    const tagAttr = selector.match(/^([\w-]+)(\[([^=\]]+)(?:=["']?([^\]"']+)["']?)?\])?$/);
    if (tagAttr) {
      if (this.tagName.toLowerCase() !== tagAttr[1].toLowerCase()) return false;
      return !tagAttr[3] || (this.attributes.has(tagAttr[3]) && (tagAttr[4] == null || this.getAttribute(tagAttr[3]) === tagAttr[4]));
    }
    return false;
  }

  querySelectorAll(selector) {
    const selectors = selector.split(',').map((part) => part.trim()).filter(Boolean);
    const descendants = [];
    const visit = (node) => {
      node.children.forEach((child) => {
        descendants.push(child);
        visit(child);
      });
    };
    visit(this);
    return descendants.filter((node) => selectors.some((part) => {
      const parts = part.split(/\s+/).filter(Boolean);
      if (!parts.length || !node.matchesSimple(parts.at(-1))) return false;
      let ancestor = node.parentNode;
      for (let i = parts.length - 2; i >= 0; i -= 1) {
        while (ancestor && !ancestor.matchesSimple(parts[i])) ancestor = ancestor.parentNode;
        if (!ancestor) return false;
        ancestor = ancestor.parentNode;
      }
      return true;
    }));
  }

  querySelector(selector) {
    return this.querySelectorAll(selector)[0] ?? null;
  }
}

class FakeCanvas extends FakeElement {
  constructor() {
    super('canvas');
    this.width = 900;
    this.height = 560;
  }

  getContext() {
    return new Proxy({}, { get: () => () => {} });
  }
}

function element(tagName) {
  return tagName === 'canvas' ? new FakeCanvas() : new FakeElement(tagName);
}

function labelsFor(kind) {
  if (kind === 'chart') return {
    chartType: 'bar', labelHeader: 'Label', valueHeader: 'Value', titleLabel: 'Title', titlePlaceholder: 'Chart title',
    addRow: 'Add row', remove: 'Remove', exportPng: 'Export PNG', canvasLabel: 'Chart', emptyHint: 'Add data', seedLabels: 'One,Two', seedValues: '10,20',
  };
  return {
    ready: 'Ready', focus: 'Focus', breakTime: 'Break time', timeToMove: 'Time for a break', breakDone: 'Break complete', continue: 'Continue', start: 'Start',
    pause: 'Pause', reset: 'Reset', reminders: 'reminders', minutesError: 'Enter valid minutes', intervalMinutes: 'Focus minutes', breakMinutes: 'Break minutes', sound: 'Sound',
  };
}

function makeBreakHarness() {
  const labels = labelsFor('break');
  const root = new FakeElement();
  root.setAttribute('data-labels', JSON.stringify(labels));
  const form = [
    ['[data-interval]', new FakeElement('input')], ['[data-break]', new FakeElement('input')], ['[data-sound]', new FakeElement('input')],
    ['[data-status]', new FakeElement('p')], ['[data-display]', new FakeElement('output')], ['[data-reminders]', new FakeElement('span')],
    ['[data-panel]', new FakeElement('div')], ['[data-start]', new FakeElement('button')], ['[data-pause]', new FakeElement('button')],
    ['[data-reset]', new FakeElement('button')], ['[data-error]', new FakeElement('p')],
  ];
  const bySelector = new Map(form);
  form.forEach(([selector, node]) => {
    const attr = selector.match(/^\[([^\]]+)\]/)?.[1];
    if (attr) node.setAttribute(attr, '');
    root.append(node);
  });
  bySelector.get('[data-interval]').value = '50';
  bySelector.get('[data-break]').value = '5';
  bySelector.get('[data-status]').textContent = labels.ready;
  let intervalCallback;
  const timeoutCallbacks = [];
  let now = 0;
  const context = {
    document: { title: 'Break Reminder', querySelectorAll: (selector) => selector === '[data-break-reminder-tool]' ? [root] : [], documentElement: { lang: 'en' } },
    window: { setInterval: (callback) => { intervalCallback = callback; return 1; }, clearInterval() {}, setTimeout: (callback) => { timeoutCallbacks.push(callback); return 1; } },
    Date: { now: () => now },
    JSON, Math, Number, String,
  };
  vm.runInNewContext(breakScript, context, { filename: 'BreakReminder.astro' });
  return { root, bySelector, labels, context, setNow(value) { now = value; }, tick() { intervalCallback?.(); }, timeoutCallbacks, status: bySelector.get('[data-status]') };
}

test('BreakReminder announces phase changes once while the timer display keeps ticking', () => {
  const harness = makeBreakHarness();
  const { bySelector, setNow, tick, timeoutCallbacks, status, labels } = harness;
  const before = status.setCount;
  bySelector.get('[data-start]').click();
  const afterStart = status.setCount;
  for (let i = 1; i <= 10; i += 1) { setNow(i * 250); tick(); }
  assert.equal(status.setCount, afterStart, 'same focus phase should not repeatedly mutate the live region');
  assert.notEqual(bySelector.get('[data-display]').textContent, '50:00', 'countdown display should continue updating');
  setNow(50 * 60 * 1000 + 1); tick();
  assert.equal(status.textContent, labels.timeToMove);
  const afterBreakTransition = status.setCount;
  setNow(50 * 60 * 1000 + 1001); tick();
  assert.equal(status.setCount, afterBreakTransition, 'break countdown should not repeat the same live announcement');
  timeoutCallbacks.splice(0).forEach((callback) => callback());
  assert.equal(status.textContent, labels.breakTime);
  bySelector.get('[data-reset]').click();
  assert.equal(status.textContent, labels.ready);
  assert.ok(status.setCount > before, 'phase changes should still be announced');
  assert.equal(bySelector.get('[data-pause]').disabled, true);
});

function makeChartHarness() {
  const labels = labelsFor('chart');
  const root = new FakeElement();
  root.setAttribute('data-labels', JSON.stringify(labels));
  const rows = new FakeElement('div'); rows.setAttribute('data-rows', '');
  const title = new FakeElement('input'); title.setAttribute('data-title', '');
  const canvas = new FakeCanvas(); canvas.setAttribute('data-canvas', '');
  const note = new FakeElement('p'); note.setAttribute('data-note', '');
  const add = new FakeElement('button'); add.setAttribute('data-add', '');
  const download = new FakeElement('button'); download.setAttribute('data-download', '');
  root.append(title, rows, canvas, note, add, download);
  const context = { document: { createElement: element, querySelectorAll: (selector) => selector === '[data-chart-tool]' ? [root] : [] }, HTMLCanvasElement: FakeCanvas, JSON, Math, Number, Intl };
  vm.runInNewContext(chartScript, context, { filename: 'ChartMaker.astro' });
  return { root, rows, add };
}

function chartNames(rows) {
  return rows.querySelectorAll('input').map((input) => input.getAttribute('aria-label'));
}

test('ChartMaker gives dynamic rows locale labels and renumbers after add/remove/recreate', () => {
  const { rows, add } = makeChartHarness();
  assert.deepEqual(chartNames(rows), ['Label 1', 'Value 1', 'Label 2', 'Value 2']);
  add.click();
  assert.deepEqual(chartNames(rows), ['Label 1', 'Value 1', 'Label 2', 'Value 2', 'Label 3', 'Value 3']);
  rows.querySelectorAll('.chart-row')[1].querySelector('button').click();
  assert.deepEqual(chartNames(rows), ['Label 1', 'Value 1', 'Label 2', 'Value 2']);
  rows.querySelectorAll('.chart-row').slice().forEach((row) => row.querySelector('button').click());
  assert.deepEqual(chartNames(rows), ['Label 1', 'Value 1'], 'deleting the last row recreates row 1');
});

const renderTablesSource = conversionSource.slice(conversionSource.indexOf('    function renderTables() {'), conversionSource.indexOf('    function drawCalibration()'));

test('PDF table editor gives unique table-row-column cell names and renumbers after row/column deletion', () => {
  const editor = new FakeElement('div'); editor.setAttribute('data-editor', '');
  const root = new FakeElement('section'); root.append(editor);
  const exportButton = new FakeElement('button');
  const labels = { table: 'Table {number}', deleteTable: 'Delete table', deleteRow: 'Delete row', deleteColumn: 'Delete column', columnNumber: 'Column number', ready: 'Ready', noTables: 'No tables' };
  const tables = [
    { rows: [['a', 'b', 'c', 'd'], ['e', 'f', 'g', 'h'], ['i', 'j', 'k', 'l']] },
    { rows: [['m', 'n', 'o', 'p'], ['q', 'r', 's', 't'], ['u', 'v', 'w', 'x']] },
  ];
  const context = { document: { createElement: element }, root, exportButton, labels, tables };
  vm.runInNewContext(`(function(){${renderTablesSource}; return renderTables;})()`, context, { filename: 'ConversionApiTool.astro' })();
  const cells = () => editor.querySelectorAll('.table-card input');
  const rowButtons = () => editor.querySelectorAll('.table-card button').filter((button) => button.getAttribute('aria-label'));
  const names = cells().map((input) => input.getAttribute('aria-label'));
  assert.equal(new Set(names).size, 24, 'every cell name should be unique');
  assert.ok(names.every((name) => /Table \d+ · Row number \d+ · Column number \d+/.test(name)), names.join(' | '));
  assert.equal(rowButtons().length, 6);
  assert.ok(rowButtons().every((button) => /Delete row: Table \d+ · Row number \d+/.test(button.getAttribute('aria-label'))));
  rowButtons().find((button) => button.getAttribute('aria-label') === 'Delete row: Table 2 · Row number 2').click();
  const table2NamesAfterRowDelete = editor.querySelectorAll('.table-card').at(1).querySelectorAll('input').map((input) => input.getAttribute('aria-label'));
  assert.ok(table2NamesAfterRowDelete.every((name) => !name.includes('Row 3')));
  const table2 = editor.querySelectorAll('.table-card').at(1);
  const select = table2.querySelector('select'); select.value = '1';
  table2.querySelectorAll('button').find((button) => button.textContent === 'Delete column').click();
  const table2AfterColumnDelete = editor.querySelectorAll('.table-card').at(1).querySelectorAll('input').map((input) => input.getAttribute('aria-label'));
  assert.ok(table2AfterColumnDelete.every((name) => !name.includes('Column number 4')));
});

test('Split 03 naming contracts remain locale-derived rather than English-only constants', () => {
  assert.match(chartSource, /rowFieldName\(labels\.labelHeader/);
  assert.match(conversionSource, /labels\.table\.replace\('\{number\}'/);
  assert.match(conversionSource, /labels\.columnNumber\.replace/);
  assert.match(breakSource, /role="status" aria-live="polite"/);
});
