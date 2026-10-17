import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { derangementCount, drawDerangement, factorial, isDerangement, secureRandomInt } from '../src/lib/randomPicker.ts';

// P2 batch 5 (2026-10-17): gift-exchange mode ("nobody draws themselves") of /tools/random-name-picker/.
// Every number printed on the page is re-derived here from first principles (brute force over all permutations,
// exhaustive enumeration of the random choices the code can make, exact fractions).

const html = (route) => readFileSync(new URL(`../dist${route}index.html`, import.meta.url), 'utf8');
const flatten = (page) => page.replace(/ data-astro-cid-[a-z0-9]+/g, '');

function permutations(n) {
  const out = [];
  const walk = (prefix, rest) => {
    if (!rest.length) { out.push(prefix); return; }
    rest.forEach((item, index) => walk([...prefix, item], [...rest.slice(0, index), ...rest.slice(index + 1)]));
  };
  walk([], Array.from({ length: n }, (_, index) => index));
  return out;
}
const derangementsOf = (n) => permutations(n).filter((perm) => perm.every((value, index) => value !== index));

/** Cycle lengths of a permutation, sorted descending. */
function cycleType(perm) {
  const seen = new Set();
  const lengths = [];
  perm.forEach((_, start) => {
    if (seen.has(start)) return;
    let length = 0;
    for (let at = start; !seen.has(at); at = perm[at]) { seen.add(at); length += 1; }
    lengths.push(length);
  });
  return lengths.sort((a, b) => b - a).join('+');
}

/**
 * Enumerate every sequence of random choices `run` can make. Each leaf is returned with the number of
 * choice sequences it consumed, so callers can weigh leaves by their exact probability.
 */
function enumerateLeaves(run) {
  const leaves = [];
  const walk = (prefix) => {
    let step = 0;
    let branch = null;
    const result = run((max) => {
      if (step < prefix.length) return prefix[step++];
      if (branch === null) branch = max;
      step += 1;
      return 0;
    });
    if (branch === null) leaves.push(result);
    else for (let value = 0; value < branch; value += 1) walk([...prefix, value]);
  };
  walk([]);
  return leaves;
}

test('brute force: number of "nobody draws themselves" assignments is 1, 0, 1, 2, 9, 44, 265, 1854, 14833 and matches the recurrence', () => {
  const expected = [1n, 0n, 1n, 2n, 9n, 44n, 265n, 1854n, 14833n];
  for (let n = 0; n <= 8; n += 1) {
    assert.equal(BigInt(derangementsOf(n).length), expected[n], `n=${n} (brute force over ${factorial(n)} permutations)`);
    assert.equal(derangementCount(n), expected[n], `n=${n} (recurrence)`);
  }
  assert.equal(derangementCount(10), 1334961n);
  assert.equal(factorial(10), 3628800n);
  // D(n) is the integer nearest to n!/e (Wikipedia, Derangement)
  for (let n = 1; n <= 12; n += 1) assert.equal(Math.round(Number(factorial(n)) / Math.E), Number(derangementCount(n)));
  assert.throws(() => derangementCount(-1), RangeError);
});

test('table on the page: share of shuffles that are valid, n = 2, 3, 4, 5, 6, 10, and the 1/e limit', () => {
  const percent = (n) => (Number(derangementCount(n)) / Number(factorial(n)) * 100).toFixed(2);
  assert.deepEqual([2, 3, 4, 5, 6, 10].map(percent), ['50.00', '33.33', '37.50', '36.67', '36.81', '36.79']);
  assert.equal((100 / Math.E).toFixed(2), '36.79');
  // average number of shuffles = n!/D(n) -> e, about 2.7
  for (const n of [3, 4, 5, 6, 10, 30]) {
    const rounds = Number(factorial(n) * 10000n / derangementCount(n)) / 10000;
    assert.ok(rounds > 2.66 && rounds < 3.01, `n=${n}: ${rounds}`);
  }
});

test('drawDerangement: exhaustive enumeration gives every valid assignment exactly the same probability (3 and 4 people)', () => {
  for (const n of [3, 4]) {
    const attempts = 3;
    const perAttempt = factorial(n); // each shuffle consumes exactly n! equally likely choice sequences
    const mass = new Map(); // outcome -> weight in units of 1/(n!)^attempts
    for (const leaf of enumerateLeaves((randomInt) => drawDerangement(n, randomInt, attempts))) {
      const key = leaf.ok ? leaf.receivers.join('') : 'gave-up';
      const used = leaf.ok ? leaf.attempts : attempts;
      mass.set(key, (mass.get(key) ?? 0n) + perAttempt ** BigInt(attempts - used));
    }
    const valid = derangementsOf(n).map((perm) => perm.join(''));
    assert.equal(valid.length, n === 3 ? 2 : 9);
    assert.deepEqual([...mass.keys()].filter((key) => key !== 'gave-up').sort(), [...valid].sort(), 'only valid assignments, and all of them, can come out');
    const values = valid.map((key) => mass.get(key));
    assert.equal(new Set(values.map(String)).size, 1, `n=${n}: all ${valid.length} valid assignments have identical probability`);
    const total = perAttempt ** BigInt(attempts);
    const invalidPerAttempt = perAttempt - derangementCount(n);
    assert.equal(mass.get('gave-up'), invalidPerAttempt ** BigInt(attempts), 'mass left after all attempts are rejected');
    assert.equal(values.reduce((a, b) => a + b, 0n) + mass.get('gave-up'), total, 'probabilities add up to 1');
  }
});

test('drawDerangement: sizes below 2, size 2, gave-up, and real randomness for 2 to 40 people', () => {
  assert.deepEqual(drawDerangement(0, secureRandomInt), { ok: false, error: 'too-few' });
  assert.deepEqual(drawDerangement(1, secureRandomInt), { ok: false, error: 'too-few' });
  assert.deepEqual(drawDerangement(2.5, secureRandomInt), { ok: false, error: 'too-few' });
  const two = drawDerangement(2, secureRandomInt);
  assert.ok(two.ok);
  assert.deepEqual(two.receivers, [1, 0]);
  // a random source that never swaps always produces the identity, which is never accepted
  assert.deepEqual(drawDerangement(5, (max) => max - 1, 50), { ok: false, error: 'gave-up' });
  for (let n = 2; n <= 40; n += 1) {
    for (let trial = 0; trial < 60; trial += 1) {
      const result = drawDerangement(n, secureRandomInt);
      assert.ok(result.ok, `n=${n}`);
      assert.deepEqual([...result.receivers].sort((a, b) => a - b), Array.from({ length: n }, (_, index) => index), 'everybody receives exactly one gift');
      assert.ok(isDerangement(result.receivers), 'nobody draws themselves');
    }
  }
  assert.equal(isDerangement([1, 0, 2]), false);
  assert.equal(isDerangement([1, 2, 0]), true);
});

test('limits stated on the page: mutual swaps among the valid assignments (4 people 3 of 9, 5 people 20 of 44)', () => {
  const four = derangementsOf(4).map(cycleType);
  assert.equal(four.length, 9);
  assert.equal(four.filter((type) => type === '4').length, 6);
  assert.equal(four.filter((type) => type === '2+2').length, 3);
  const five = derangementsOf(5).map(cycleType);
  assert.equal(five.length, 44);
  assert.equal(five.filter((type) => type === '5').length, 24);
  assert.equal(five.filter((type) => type === '3+2').length, 20);
  assert.equal((20 / 44 * 100).toFixed(2), '45.45');
  // with 3 people a mutual swap is impossible (the third person would draw themselves)
  assert.deepEqual(derangementsOf(3).map(cycleType), ['3', '3']);
});

test('the "draw in turn and put your own slip back" method is not uniform (3 people 1/3 vs 2/3, 4 people 2/31 to 6/31)', () => {
  const gcd = (a, b) => (b === 0n ? a : gcd(b, a % b));
  const reduce = ([n, d]) => { const g = gcd(n < 0n ? -n : n, d); return [n / g, d / g]; };
  const add = (x, y) => reduce([x[0] * y[1] + y[0] * x[1], x[1] * y[1]]);
  const times = (x, y) => reduce([x[0] * y[0], x[1] * y[1]]);
  function naive(n) {
    // person i draws uniformly from the slips still in the hat that are not their own; if only their own is left, the whole round restarts
    const dist = new Map();
    const walk = (person, remaining, assigned, p) => {
      if (person === n) { const key = assigned.join(''); dist.set(key, add(dist.get(key) ?? [0n, 1n], p)); return; }
      const options = remaining.filter((slip) => slip !== person);
      for (const slip of options) walk(person + 1, remaining.filter((other) => other !== slip), [...assigned, slip], times(p, [1n, BigInt(options.length)]));
    };
    walk(0, Array.from({ length: n }, (_, index) => index), [], [1n, 1n]);
    const accepted = [...dist.values()].reduce(add, [0n, 1n]);
    return new Map([...dist].map(([key, value]) => [key, times(value, [accepted[1], accepted[0]])]));
  }
  const three = naive(3);
  assert.deepEqual([...three], [['120', [1n, 3n]], ['201', [2n, 3n]]]); // A->B->C->A is 1/3, A->C->B->A is 2/3
  const four = naive(4);
  assert.equal(four.size, 9);
  const fractions = [...four.values()].map(([n, d]) => Number(n) / Number(d));
  assert.equal((Math.min(...fractions) * 100).toFixed(2), '6.45');
  assert.equal((Math.max(...fractions) * 100).toFixed(2), '19.35');
  assert.equal([...four.values()].filter(([n, d]) => n * 31n === 2n * d || n * 31n === 6n * d).length, 2);
  assert.equal((100 / 9).toFixed(2), '11.11');
  // the page's method gives each of the 9 exactly 1/9
  assert.equal(new Set(derangementsOf(4).map(() => 1 / 9)).size, 1);
});

test('random-name-picker page: gift-exchange mode is in the widget, the explanation, the numbers and the sources', () => {
  const page = html('/tools/random-name-picker/');
  const flat = flatten(page);
  assert.match(flat, /<input type="radio" name="random-picker-mode" value="gift"/);
  assert.match(flat, /交換禮物（不抽到自己）/);
  assert.match(flat, /data-gift-hide[^>]*checked/);
  assert.match(flat, /<h2[^>]*>交換禮物抽籤：怎麼配對才不會抽到自己<\/h2>/);
  // numbers in the table come from the library
  for (const text of ['1,334,961', '3,628,800', '36.79%', '33.33%', '37.50%', '36.67%', '36.81%', '2/31', '6/31', '6.45%', '19.35%', '11.11%', '45.45%', '1/3', '2/3', 'OEIS A000166']) {
    assert.ok(flat.includes(text), text);
  }
  for (const href of ['https://en.wikipedia.org/wiki/Derangement', 'https://oeis.org/A000166']) assert.ok(page.includes(`href="${href}"`), href);
  assert.ok(flat.includes('查核日期 2026-10-17'));
  assert.match(flat, /<h1[^>]*>線上抽籤點名工具<\/h1>/);
  assert.match(page, /<link rel="canonical" href="https:\/\/funnytools\.win\/tools\/random-name-picker\/"/);
  assert.doesNotMatch(page, /"@type":"(FAQPage|HowTo)"/);
  assert.doesNotMatch(page, /noindex/);
  // the old "this tool cannot do it" warning is gone
  assert.doesNotMatch(flat, /這個工具沒有這項功能/);
});

test('widget source: gift mode uses drawDerangement with the secure random source and no Math.random()', () => {
  const source = readFileSync(new URL('../src/components/tools/RandomNamePicker.astro', import.meta.url), 'utf8');
  assert.ok(source.includes('drawDerangement(list.length, secureRandomInt)'));
  assert.ok(!source.includes('Math.random'));
  const lib = readFileSync(new URL('../src/lib/randomPicker.ts', import.meta.url), 'utf8');
  assert.ok(!lib.includes('Math.random('));
});
