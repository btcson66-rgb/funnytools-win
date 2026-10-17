import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { tScoreFrom } from '../src/lib/educationStats.ts';
import { INDEXABLE_PATHS } from '../src/lib/indexPolicy.ts';

const dist = new URL('../dist/', import.meta.url).pathname;
const html = (route) => readFileSync(join(dist, route.replace(/^\//, ''), 'index.html'), 'utf8');
const flatten = (page) => page.replace(/ data-astro-cid-[a-z0-9]+/g, '');
const close = (actual, expected, eps = 1e-9) => assert.ok(Math.abs(actual - expected) < eps, `${actual} !~ ${expected}`);

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, out); else if (full.endsWith('.html')) out.push(full);
  }
  return out;
}

test('T score page: the worked examples and rounding figures merged from the guide are reproduced', () => {
  // example four: the same 82 in two exams
  const a = tScoreFrom({ score: 82, mean: 70, sd: 8 });
  close(a.z, 1.5); close(a.t, 65);
  const b = tScoreFrom({ score: 82, mean: 78, sd: 6 });
  close(b.z, 2 / 3); close(b.t, 56.6666666667, 1e-9);
  assert.equal(b.t.toFixed(2), '56.67'); assert.equal((a.t - b.t).toFixed(2), '8.33');
  // rounding z first: 0.6667 -> 0.7 gives T = 57 (0.33 away); (82-60)/15 -> 1.5 gives 65 versus 64.67
  assert.equal(50 + 10 * Number(b.z.toFixed(1)), 57); close(57 - b.t, 0.3333333333, 1e-9);
  const c = tScoreFrom({ score: 82, mean: 60, sd: 15 });
  close(c.z, 1.4666666667, 1e-9); assert.equal(c.t.toFixed(2), '64.67'); assert.equal(50 + 10 * Number(c.z.toFixed(1)), 65);
  // the page renders them
  const page = flatten(html('/tools/t-score-calculator/'));
  for (const text of ['算例四', 'T＝50＋10×0.6667＝56.67', '先把 z 四捨五入到一位小數 0.7，T 會變成 57', '完整計算是 64.67', 'T 分數是跟誰比：班級、全校還是全國', 'T 分數要算到小數第幾位', '閱讀與數學的 T 分數是設計成', '平均 T 分數是 51', 'nces.ed.gov/pubs2002/kindergarten/21.asp', '查核日期 2026-10-17']) {
    assert.ok(page.includes(text), text);
  }
  assert.match(page, /最後審核：<time datetime="2026-10-17">2026-10-17<\/time>/);
  assert.ok(page.includes('href="/tools/teacher-exam-score-converter/"'));
});

test('the former guide and statistics category are stubs, outside INDEXABLE_PATHS and unlinked from indexable pages', () => {
  assert.equal(INDEXABLE_PATHS.length, 18);
  assert.ok(!INDEXABLE_PATHS.includes('/guides/t-score-calculator-guide/'));
  assert.ok(!INDEXABLE_PATHS.includes('/category/statistics/'));
  for (const [stub, target] of [['/guides/t-score-calculator-guide/', '/tools/t-score-calculator/'], ['/category/statistics/', '/education-statistics/']]) {
    const page = html(stub);
    assert.match(page, /<meta name="robots" content="noindex,follow"/);
    assert.ok(page.includes(`rel="canonical" href="https://funnytools.win${target}"`));
    assert.ok(page.includes(`http-equiv="refresh" content="0; url=${target}"`));
    assert.ok(!page.includes('"@type"'), 'a stub carries no structured data');
  }
  assert.ok(!existsSync(join(dist, 'en/guides')) && !existsSync(join(dist, 'en/category')));
  // no built page except the stubs themselves may link to the merged-away URLs
  for (const file of walk(dist)) {
    const page = readFileSync(file, 'utf8');
    if (file.endsWith('/guides/t-score-calculator-guide/index.html') || file.endsWith('/category/statistics/index.html')) continue;
    const refs = [...page.matchAll(/href="(\/(?:guides\/t-score-calculator-guide|category\/statistics)\/)"/g)].map((m) => m[1]);
    const stubSource = file.includes('/es/') || file.includes('/fr/');
    assert.deepEqual(stubSource ? [] : refs, [], file);
  }
});

test('education-statistics hub: situations first, one sentence per tool, every retained tool linked once', () => {
  const page = html('/education-statistics/');
  const flat = flatten(page);
  assert.match(flat, /<h1[^>]*>成績統計工具：依你的問題找計算器<\/h1>/);
  assert.match(flat, /作者：<a href="\/about\/" rel="author">Benson Lai<\/a>/);
  assert.match(flat, /最後審核：<time datetime="2026-10-17">2026-10-17<\/time>/);
  for (const h2 of ['我的分數在這群人裡站哪裡', '幾項成績怎麼合成一個數字', '這批資料有多分散、兩組有沒有差異', '課堂上抽人、分組、排順序、交換禮物']) assert.ok(flat.includes(`<h2>${h2}</h2>`), h2);
  const toolPaths = INDEXABLE_PATHS.filter((path) => path.startsWith('/tools/'));
  assert.equal(toolPaths.length, 10);
  for (const path of toolPaths) {
    const count = (flat.match(new RegExp(`class="hub-tool-name" href="${path}"`, 'g')) ?? []).length;
    assert.equal(count, 1, path);
  }
  assert.equal((flat.match(/class="hub-tool-asks"/g) ?? []).length, 10);
  const jsonLd = [...page.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap((m) => JSON.parse(m[1]));
  const collection = jsonLd.find((item) => item['@type'] === 'CollectionPage');
  assert.equal(collection.author['@type'], 'Person'); assert.equal(collection.author.name, 'Benson Lai'); assert.equal(collection.dateModified, '2026-10-17');
  assert.ok(jsonLd.some((item) => item['@type'] === 'BreadcrumbList'));
  assert.ok(!jsonLd.some((item) => ['FAQPage', 'HowTo'].includes(item['@type'])));
  assert.doesNotMatch(page, /noindex/);
  assert.match(page, /<link rel="canonical" href="https:\/\/funnytools\.win\/education-statistics\/"/);
  // the figures quoted in the hub copy match the pages they point to
  assert.ok(flat.includes('40 人') && flat.includes('班排第 6 名'));
});

test('tool-page breadcrumbs and navigation send statistics visitors to the hub', () => {
  const page = flatten(html('/tools/standard-deviation/'));
  assert.ok(page.includes('href="/education-statistics/"'));
  assert.doesNotMatch(page, /href="\/category\/statistics\/"/);
  const nav = page.match(/<header class="site-nav"[\s\S]*?<\/header>/)?.[0] ?? '';
  assert.ok(nav.includes('href="/tools/t-score-calculator/"'));
  assert.doesNotMatch(nav, /guides\/t-score-calculator-guide|category\/statistics/);
});
