import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import vm from 'node:vm';

const component = readFileSync(new URL('../src/components/tools/CompoundInterest.astro', import.meta.url), 'utf8');
const script = component.match(/<script>\s*([\s\S]*?)\s*<\/script>/)?.[1];
assert.ok(script, 'CompoundInterest client script should be present');

class FakeElement {
  constructor(value = '') {
    this.value = value;
    this.textContent = '';
    this.hidden = false;
    this.innerHTML = '';
    this.listeners = new Map();
  }

  addEventListener(type, listener) {
    this.listeners.set(type, listener);
  }

  dispatch(type) {
    this.listeners.get(type)?.({ currentTarget: this });
  }
}

function createHarness() {
  const labels = {
    chartTitle: 'Balance by year',
    futureValue: 'Future value',
    contributed: 'Contributed',
    interest: 'Interest',
    invalidInput: 'Invalid input',
    defaultPrincipal: '10000',
    defaultMonthly: '500',
    defaultRate: '5',
    defaultYears: '10',
  };
  const elements = new Map([
    ['[data-principal]', new FakeElement(labels.defaultPrincipal)],
    ['[data-monthly]', new FakeElement(labels.defaultMonthly)],
    ['[data-rate]', new FakeElement(labels.defaultRate)],
    ['[data-years]', new FakeElement(labels.defaultYears)],
    ['[data-compounding]', new FakeElement('12')],
    ['[data-future]', new FakeElement()],
    ['[data-contributed]', new FakeElement()],
    ['[data-interest]', new FakeElement()],
    ['[data-chart]', new FakeElement()],
    ['[data-error]', new FakeElement()],
    ['.toast', new FakeElement()],
    ['[data-calculate]', new FakeElement()],
    ['[data-copy]', new FakeElement()],
  ]);
  const root = {
    getAttribute(name) {
      return name === 'data-labels' ? JSON.stringify(labels) : null;
    },
    querySelector(selector) {
      return elements.get(selector) ?? null;
    },
  };
  const context = {
    document: {
      documentElement: { lang: 'en' },
      querySelectorAll(selector) {
        return selector === '[data-compound-interest-tool]' ? [root] : [];
      },
    },
    window: { setTimeout() {}, prompt() {} },
    navigator: { clipboard: { writeText: async () => {} } },
    Intl,
    JSON,
    Math,
    Number,
    setTimeout() {},
  };
  vm.runInNewContext(script, context, { filename: 'CompoundInterest.astro' });
  return {
    elements,
    setValues({ principal, monthly, rate, years, compounding }) {
      elements.get('[data-principal]').value = String(principal);
      elements.get('[data-monthly]').value = String(monthly);
      elements.get('[data-rate]').value = String(rate);
      elements.get('[data-years]').value = String(years);
      elements.get('[data-compounding]').value = String(compounding);
      elements.get('[data-years]').dispatch('input');
    },
    get chart() {
      return elements.get('[data-chart]').innerHTML;
    },
    get outputs() {
      return {
        future: elements.get('[data-future]').textContent,
        contributed: elements.get('[data-contributed]').textContent,
        interest: elements.get('[data-interest]').textContent,
      };
    },
  };
}

function parseAttributes(tag) {
  return Object.fromEntries([...tag.matchAll(/([a-z][\w:-]*)="([^"]*)"/gi)].map((match) => [match[1], match[2]]));
}

function parseChart(svg) {
  const polyline = svg.match(/<polyline\b[^>]*>/i)?.[0];
  assert.ok(polyline, 'generated SVG should contain a polyline');
  const points = parseAttributes(polyline).points.split(/\s+/).map((point) => point.split(',').map(Number));
  const rects = [...svg.matchAll(/<rect\b[^>]*>/gi)].map((match) => {
    const attrs = parseAttributes(match[0]);
    const x = Number(attrs.x);
    const width = Number(attrs.width);
    return { x, width, center: x + width / 2 };
  });
  assert.equal(rects.length, points.length, 'one bar should represent each line point');
  assert.ok(!/NaN|Infinity/.test(svg), 'generated SVG should not contain non-finite geometry');
  return { points, rects };
}

test('compound-interest SVG bars and line points share the same x geometry', () => {
  const harness = createHarness();
  for (const years of [1, 2, 3, 10, 30, 100]) {
    harness.setValues({ principal: 10000, monthly: 500, rate: 5, years, compounding: 12 });
    const { points, rects } = parseChart(harness.chart);
    const deltas = points.map(([x], index) => Math.abs(x - rects[index].center));
    assert.ok(Math.max(...deltas) <= 0.1, `${years} years max bar/line delta exceeded 0.1px`);
    assert.equal(points[0][0], 40, `${years} years first line point should anchor at x=40`);
    if (years === 1) assert.equal(points.at(-1)[0], 40, 'one-year chart should use the single-point anchor');
    else assert.equal(points.at(-1)[0], 600, `${years} years last line point should anchor at x=600`);
  }
});

test('compound-interest financial outputs remain characterized across edge vectors', () => {
  const vectors = [
    [{ principal: 10000, monthly: 500, rate: 5, years: 10, compounding: 12 }, { future: '94,111', contributed: '70,000', interest: '24,111' }],
    [{ principal: 10000, monthly: 500, rate: 0, years: 10, compounding: 12 }, { future: '70,000', contributed: '70,000', interest: '0' }],
    [{ principal: 10000, monthly: 500, rate: 5, years: 1, compounding: 12 }, { future: '16,651', contributed: '16,000', interest: '651' }],
    [{ principal: 10000, monthly: 500, rate: 5, years: 30, compounding: 12 }, { future: '460,807', contributed: '190,000', interest: '270,807' }],
    [{ principal: 10000, monthly: 500, rate: 5, years: 10, compounding: 1 }, { future: '93,471', contributed: '70,000', interest: '23,471' }],
    [{ principal: 10000, monthly: 500, rate: 5, years: 10, compounding: 4 }, { future: '93,991', contributed: '70,000', interest: '23,991' }],
    [{ principal: 10000, monthly: 500, rate: 5, years: 10, compounding: 365 }, { future: '94,170', contributed: '70,000', interest: '24,170' }],
  ];
  const harness = createHarness();
  for (const [input, expected] of vectors) {
    harness.setValues(input);
    assert.deepEqual(harness.outputs, expected, `financial output changed for ${JSON.stringify(input)}`);
  }
});
