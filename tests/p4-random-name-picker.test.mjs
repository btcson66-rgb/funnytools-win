import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  rejectionLimit, secureRandomInt, parseEntries, findDuplicates, shuffle, draw,
  groupSizes, groupCountForSize, splitIntoGroups, chance,
} from '../src/lib/randomPicker.ts';

const html = (route) => readFileSync(new URL(`../dist${route}index.html`, import.meta.url), 'utf8');
const close = (actual, expected, eps = 1e-12) => assert.ok(Math.abs(actual - expected) < eps, `${actual} !~ ${expected}`);

/** Enumerate every sequence of random choices a function can make; each leaf is one equally likely outcome. */
function enumerate(run) {
  const outcomes = [];
  const walk = (prefix) => {
    let step = 0;
    let branch = null;
    const result = run((max) => {
      if (step < prefix.length) return prefix[step++];
      if (branch === null) branch = max;
      step += 1;
      return 0;
    });
    if (branch === null) outcomes.push(result);
    else for (let value = 0; value < branch; value += 1) walk([...prefix, value]);
  };
  walk([]);
  return outcomes;
}

test('secureRandomInt discards the biased tail of the 32-bit range, then takes the remainder', () => {
  const feed = (...words) => { let index = 0; return (target) => { target[0] = words[index++]; }; };
  // max 3: limit = floor(2^32 / 3) * 3 = 4294967295, so the word 4294967295 must be rejected
  assert.equal(rejectionLimit(3), 4294967295);
  assert.equal(secureRandomInt(3, feed(4294967295, 7)), 1);
  assert.equal(secureRandomInt(3, feed(4294967294)), 4294967294 % 3);
  assert.equal(secureRandomInt(1, feed(123456)), 0);
  assert.throws(() => secureRandomInt(0, feed(1)), RangeError);
  assert.throws(() => secureRandomInt(2.5, feed(1)), RangeError);
  // every accepted word range is an exact multiple of max, so every residue is equally likely
  for (let max = 1; max <= 500; max += 1) {
    const limit = rejectionLimit(max);
    assert.equal(limit % max, 0, `max ${max}`);
    assert.ok(2 ** 32 - limit < max, `max ${max}`);
  }
});

test('secureRandomInt works with the platform crypto source and stays in range', () => {
  for (const max of [1, 2, 3, 30, 1000]) {
    for (let index = 0; index < 200; index += 1) {
      const value = secureRandomInt(max);
      assert.ok(Number.isInteger(value) && value >= 0 && value < max);
    }
  }
});

test('list parsing: lines, tabs, full-width spaces, blank lines, comma mode, duplicates are kept', () => {
  assert.deepEqual(parseEntries('01\n02\r\n\n  03  \r04'), ['01', '02', '03', '04']);
  assert.deepEqual(parseEntries('05\t林怡君\n06\t王小明'), ['05 林怡君', '06 王小明']);
  assert.deepEqual(parseEntries('　王小明　\n陳大文'), ['王小明', '陳大文']);
  assert.deepEqual(parseEntries('王小明、陳大文，林怡君; Mia；Leo', 'comma'), ['王小明', '陳大文', '林怡君', 'Mia', 'Leo']);
  assert.deepEqual(parseEntries('Smith, John\nLee', 'line'), ['Smith, John', 'Lee']);
  assert.deepEqual(parseEntries('Smith, John', 'comma'), ['Smith', 'John']);
  assert.deepEqual(parseEntries('王小明\n王小明\n陳大文'), ['王小明', '王小明', '陳大文']);
  assert.deepEqual(findDuplicates(['王小明', '王小明', '陳大文', 'A', 'A', 'A']), [{ name: '王小明', count: 2 }, { name: 'A', count: 3 }]);
  assert.deepEqual(parseEntries(''), []);
});

test('Fisher-Yates: enumerating every random choice reaches each ordering exactly once (3 and 4 items)', () => {
  for (const [items, factorial] of [[['a', 'b', 'c'], 6], [['a', 'b', 'c', 'd'], 24]]) {
    const outcomes = enumerate((randomInt) => shuffle(items, randomInt).join(''));
    assert.equal(outcomes.length, factorial);
    assert.equal(new Set(outcomes).size, factorial);
    for (const outcome of outcomes) assert.deepEqual([...outcome].sort(), items);
  }
  // 10! on the page
  assert.equal([...Array(10).keys()].reduce((product, index) => product * (index + 1), 1), 3628800);
});

test('draw: no-repeat respects used positions, counts and error cases; with-replacement ignores them', () => {
  const zero = () => 0;
  const first = draw({ size: 30, count: 3, withReplacement: false }, secureRandomInt);
  assert.ok(first.ok);
  assert.equal(new Set(first.picks).size, 3);
  assert.ok(first.picks.every((position) => position >= 0 && position < 30));

  // draw everyone in rounds of 3: ten rounds cover all 30 positions exactly once, then the list is empty
  const used = new Set();
  for (let round = 0; round < 10; round += 1) {
    const result = draw({ size: 30, count: 3, withReplacement: false, used }, secureRandomInt);
    assert.ok(result.ok);
    for (const position of result.picks) { assert.ok(!used.has(position)); used.add(position); }
  }
  assert.equal(used.size, 30);
  assert.deepEqual(draw({ size: 30, count: 1, withReplacement: false, used }, secureRandomInt), { ok: false, error: 'empty', available: 0 });

  assert.deepEqual(draw({ size: 5, count: 4, withReplacement: false, used: new Set([0, 1]) }, secureRandomInt), { ok: false, error: 'not-enough', available: 3 });
  assert.deepEqual(draw({ size: 5, count: 0, withReplacement: false }, secureRandomInt), { ok: false, error: 'invalid-count', available: 5 });
  assert.deepEqual(draw({ size: 5, count: 1.5, withReplacement: true }, secureRandomInt), { ok: false, error: 'invalid-count', available: 5 });
  assert.deepEqual(draw({ size: 0, count: 1, withReplacement: false }, secureRandomInt), { ok: false, error: 'empty', available: 0 });

  // with replacement: used positions are ignored, picks may repeat, and count may exceed the list size
  const repeated = draw({ size: 3, count: 8, withReplacement: true, used: new Set([0, 1, 2]) }, zero);
  assert.deepEqual(repeated, { ok: true, picks: [0, 0, 0, 0, 0, 0, 0, 0] });
});

test('duplicate names stay separate candidates because draws return positions', () => {
  const list = ['王小明', '王小明', '陳大文'];
  const result = draw({ size: list.length, count: 3, withReplacement: false }, secureRandomInt);
  assert.ok(result.ok);
  assert.deepEqual([...result.picks].sort(), [0, 1, 2]);
  assert.deepEqual(result.picks.map((position) => list[position]).sort(), ['王小明', '王小明', '陳大文']);
});

test('group sizes on the page: 30/6, 31/6, 38 per 4, 25 per 4', () => {
  assert.deepEqual(groupSizes(30, 6), [5, 5, 5, 5, 5, 5]);
  assert.deepEqual(groupSizes(31, 6), [6, 5, 5, 5, 5, 5]);
  assert.equal(groupCountForSize(38, 4), 10);
  assert.deepEqual(groupSizes(38, 10), [4, 4, 4, 4, 4, 4, 4, 4, 3, 3]);
  assert.equal(groupCountForSize(25, 4), 7);
  assert.deepEqual(groupSizes(25, 7), [4, 4, 4, 4, 3, 3, 3]);
  for (let people = 1; people <= 60; people += 1) {
    for (let groups = 1; groups <= people; groups += 1) {
      const sizes = groupSizes(people, groups);
      assert.equal(sizes.reduce((sum, value) => sum + value, 0), people);
      assert.ok(Math.max(...sizes) - Math.min(...sizes) <= 1);
      assert.deepEqual(sizes, [...sizes].sort((a, b) => b - a));
    }
  }
});

test('splitIntoGroups covers every position once and reports errors', () => {
  const result = splitIntoGroups(31, 6, secureRandomInt);
  assert.ok(result.ok);
  assert.deepEqual(result.sizes, [6, 5, 5, 5, 5, 5]);
  assert.deepEqual(result.groups.map((group) => group.length), result.sizes);
  assert.deepEqual(result.groups.flat().sort((a, b) => a - b), [...Array(31).keys()]);
  assert.deepEqual(splitIntoGroups(0, 3, secureRandomInt), { ok: false, error: 'empty' });
  assert.deepEqual(splitIntoGroups(5, 0, secureRandomInt), { ok: false, error: 'invalid-number' });
  assert.deepEqual(splitIntoGroups(5, 2.5, secureRandomInt), { ok: false, error: 'invalid-number' });
  assert.deepEqual(splitIntoGroups(5, 6, secureRandomInt), { ok: false, error: 'too-many-groups' });
});

test('probabilities quoted on the page are reproduced with exact integer arithmetic', () => {
  close(chance.inDistinctPicks(30, 3), 0.1);
  // at least once with replacement, 30 people, 3 picks: 1 - 29^3 / 30^3
  assert.equal(29 ** 3, 24389); assert.equal(30 ** 3, 27000);
  close(chance.atLeastOnceWithReplacement(30, 3), 1 - 24389 / 27000);
  assert.equal((1 - 24389 / 27000).toFixed(4), '0.0967');
  // someone appears twice: 1 - 30*29*28 / 30^3
  assert.equal(30 * 29 * 28, 24360);
  close(chance.someoneRepeats(30, 3), 1 - 24360 / 27000);
  assert.equal((24360 / 27000 * 100).toFixed(2), '90.22');
  assert.equal(((1 - 24360 / 27000) * 100).toFixed(2), '9.78');
  assert.equal((chance.someoneRepeats(30, 5) * 100).toFixed(2), '29.63');
  assert.equal((chance.someoneRepeats(30, 10) * 100).toFixed(2), '81.54');
  // sequential single draws without replacement: every position wins with probability exactly 1/30
  for (let position = 1; position <= 30; position += 1) {
    let numerator = 1n; let denominator = 1n;
    for (let before = 1; before < position; before += 1) { numerator *= BigInt(30 - before); denominator *= BigInt(30 - before + 1); }
    denominator *= BigInt(30 - position + 1); // then this person must win among those still in
    assert.equal(numerator * 30n, denominator, `position ${position}`);
  }
  // and if the first person is seen to lose, the second person's chance becomes 1/29
  close(1 / 29, 0.034482758620689655);
  assert.equal((1 / 30 * 100).toFixed(2), '3.33');
});

test('random-name-picker page: tool first, defaults reproduce the examples, schema, byline, headings, sources', () => {
  const page = html('/tools/random-name-picker/');
  const flat = page.replace(/ data-astro-cid-[a-z0-9]+/g, '');
  assert.match(flat, /<h1[^>]*>線上抽籤點名工具<\/h1>/);
  assert.ok(flat.indexOf('data-random-name-tool') < flat.indexOf('名單怎麼貼'), 'tool comes before the explanations');
  // defaults: 30 seat numbers, pick 3, no repeat, 6 groups
  const textarea = flat.match(/<textarea[^>]*data-names[^>]*>([\s\S]*?)<\/textarea>/)?.[1] ?? '';
  assert.deepEqual(textarea.split('\n'), Array.from({ length: 30 }, (_, index) => String(index + 1).padStart(2, '0')));
  assert.match(flat, /data-count[^>]*value="3"/);
  assert.match(flat, /<option value="no" selected>不重複/);
  assert.match(flat, /data-group-number[^>]*value="6"/);
  assert.match(flat, /作者：<a href="\/about\/" rel="author">Benson Lai<\/a>/);
  assert.match(flat, /最後審核：<time datetime="2026-10-17">2026-10-17<\/time>/);
  assert.match(page, /"dateModified":"2026-10-17"/);
  assert.match(page, /"@type":"WebApplication"/); assert.match(page, /"@type":"BreadcrumbList"/);
  assert.doesNotMatch(page, /"@type":"(FAQPage|HowTo)"/); assert.doesNotMatch(page, /noindex/);
  assert.match(page, /<link rel="canonical" href="https:\/\/funnytools\.win\/tools\/random-name-picker\/"/);
  for (const h2 of ['名單怎麼貼', '抽籤不重複與可重複', '隨機分組', '排報告順序', '亂數怎麼來', '抽籤順序會影響中籤機率嗎', 'Excel', '常見錯誤']) assert.ok(flat.includes(h2), h2);
  for (const number of ['9.67%', '9.78%', '29.63%', '81.54%', '6、5、5、5、5、5', '4、4、4、4、3、3、3', '3,628,800', '465']) assert.ok(flat.includes(number), number);
  for (const host of ['www.w3.org', 'developer.mozilla.org', 'en.wikipedia.org', 'support.microsoft.com', 'support.google.com']) assert.ok(page.includes(host), host);
  assert.ok(flat.includes('查核日期 2026-10-17'));
  assert.ok(flat.includes('沒有對各瀏覽器的亂數來源做獨立的統計檢定'));
  for (const href of ['/tools/grade-average/', '/tools/weighted-average-calculator/']) assert.ok(page.includes(`href="${href}"`), href);
  assert.doesNotMatch(flat, /公平地|公平抽出|絕對公平/);
  // formulas shown on the page
  for (const formula of ['=INDEX(A2:A31,RANDBETWEEN(1,ROWS(A2:A31)))', '=RANK(B2,$B$2:$B$31)', '=MOD(C2-1,6)+1', '=SORTBY(A2:A31,RANDARRAY(COUNTA(A2:A31)))']) assert.ok(flat.includes(formula.replace(/&/g, '&#38;')) || flat.includes(formula), formula);
});

test('random-name-picker widget uses the shared module and has no animation or Math.random()', () => {
  const source = readFileSync(new URL('../src/components/tools/RandomNamePicker.astro', import.meta.url), 'utf8');
  assert.ok(source.includes("from '../../lib/randomPicker'"));
  assert.ok(source.includes('secureRandomInt'));
  assert.ok(!source.includes('Math.random'));
  assert.ok(!source.includes('setInterval'));
  const lib = readFileSync(new URL('../src/lib/randomPicker.ts', import.meta.url), 'utf8');
  assert.ok(!lib.includes('Math.random('));
  assert.ok(lib.includes('getRandomValues'));
});
