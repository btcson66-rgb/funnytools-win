import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describeData, independentTTest, percentileRankMidpoint, countBelowAndEqual, tScoreFrom, weightedMean } from '../src/lib/educationStats.ts';
import { INDEXABLE_PATHS } from '../src/lib/indexPolicy.ts';
import { FIRST_PUBLISHED } from '../src/lib/articleDates.ts';

const dist = fileURLToPath(new URL('../dist/', import.meta.url));
const html = (route) => readFileSync(join(dist, route.replace(/^\//, ''), 'index.html'), 'utf8');
const flatten = (page) => page.replace(/ data-astro-cid-[a-z0-9]+/g, '');
const jsonLd = (page) => [...page.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap((m) => JSON.parse(m[1]));
const close = (actual, expected, eps) => assert.ok(Math.abs(actual - expected) < eps, `${actual} !~ ${expected}`);

const toolRoutes = INDEXABLE_PATHS.filter((path) => path.startsWith('/tools/'));

test('TechArticle with author and real dates on the hub, home, every indexable tool and merge-pdf', () => {
  const routes = ['/', '/education-statistics/', ...toolRoutes, '/tools/merge-pdf/'];
  assert.equal(routes.length, 13);
  for (const route of routes) {
    const articles = jsonLd(html(route)).filter((item) => item['@type'] === 'TechArticle');
    assert.equal(articles.length, 1, route);
    const [article] = articles;
    assert.match(article.datePublished, /^\d{4}-\d{2}-\d{2}$/, route);
    assert.match(article.dateModified, /^\d{4}-\d{2}-\d{2}$/, route);
    assert.ok(article.dateModified >= article.datePublished, route);
    assert.ok(article.author?.name, route);
    // the existing WebApplication node stays beside it on tool pages
    if (route.startsWith('/tools/')) assert.ok(jsonLd(html(route)).some((item) => item['@type'] === 'WebApplication'), route);
  }
  const slugOf = (route) => route === '/' || route === '/education-statistics/' ? route : route.split('/')[2];
  for (const route of routes) assert.ok(FIRST_PUBLISHED[slugOf(route)], route);
});

test('hub formula table lists the seven measures and links only indexable tools', () => {
  const page = flatten(html('/education-statistics/'));
  const table = page.match(/<table class="hub-table"[\s\S]*?<\/table>/)?.[0] ?? '';
  for (const name of ['Z 分數', 'T 分數', 'PR 值（百分等級）', '標準差', '加權平均', '教甄分數換算', '獨立樣本 t 檢定']) assert.ok(table.includes(name), name);
  for (const fn of ['STANDARDIZE', 'COUNTIF', 'STDEV.P', 'STDEV.S', 'SUMPRODUCT', 'T.TEST']) assert.ok(table.includes(fn), fn);
  for (const href of [...table.matchAll(/<li><a href="([^"]+)"/g)].map((m) => m[1])) assert.ok(INDEXABLE_PATHS.includes(href), href);
});

test('hub worked examples are reproduced with the same functions the tools use', () => {
  const page = flatten(html('/education-statistics/'));
  const math = tScoreFrom({ score: 82, mean: 70, sd: 10 });
  close(math.z, 1.2, 1e-9); close(math.t, 62, 1e-9); close(math.normalPr, 88.5, 0.05);
  const english = tScoreFrom({ score: 76, mean: 64, sd: 8 });
  close(english.z, 1.5, 1e-9); close(english.t, 65, 1e-9); close(english.normalPr, 93.3, 0.05);
  const sd = describeData([72, 85, 68, 90, 75]);
  close(sd.sdPopulation, 8.22, 0.005); close(sd.sdSample, 9.19, 0.005); assert.equal(sd.sumSquares, 338);
  const welch = independentTTest({ n1: 30, mean1: 75, sd1: 10, n2: 28, mean2: 70, sd2: 12 }, 'welch');
  close(welch.standardError, 2.911, 0.0005); close(welch.t, 1.717, 0.0005); close(welch.df, 52.72, 0.005); close(welch.p, 0.092, 0.0005);
  close(welch.ciLower, -0.84, 0.005); close(welch.ciUpper, 10.84, 0.005);
  const student = independentTTest({ n1: 30, mean1: 75, sd1: 10, n2: 28, mean2: 70, sd2: 12 }, 'student');
  close(student.t, 1.728, 0.0005); assert.equal(student.df, 56); close(student.p, 0.089, 0.0005);
  for (const text of ['Z＝(82−70)÷10＝1.20', 'T＝50＋10×1.20＝62', 'Z＝(76−64)÷8＝1.50', '√67.6＝8.22', '√84.5＝9.19', 't＝(75−70)÷2.911＝1.717', 'df＝52.72', 'p＝.092']) assert.ok(page.includes(text), text);
});

test('percentile and weighted-average comparison tables match the formulas', () => {
  const scores = [95, 90, 90, 85, 80, 80, 80, 70, 65, 50];
  const page = flatten(html('/tools/percentile-rank-calculator/'));
  const table = page.match(/<table class="section-table">\s*<caption>10 人小考[\s\S]*?<\/table>/)?.[0] ?? '';
  assert.ok(table, 'comparison table rendered');
  for (const score of new Set(scores)) {
    const { below, equal, total } = countBelowAndEqual(scores, score);
    const cells = [score, below, equal, percentileRankMidpoint(below, equal, total), (100 * below) / total, (100 * (below + equal)) / total].map(String);
    const row = table.match(new RegExp(`<tr><th scope="row">${score}</th>([\\s\\S]*?)</tr>`))?.[1] ?? '';
    const values = [...row.matchAll(/<td>([^<]*)<\/td>/g)].map((m) => m[1]);
    assert.deepEqual([String(score), ...values], cells, `score ${score}`);
  }
  const weighted = weightedMean([{ value: 78, weight: 4 }, { value: 85, weight: 4 }, { value: 72, weight: 4 }, { value: 90, weight: 3 }, { value: 95, weight: 2 }]);
  assert.equal(weighted.weightedSum, 1400); assert.equal(weighted.weightTotal, 17); close(weighted.mean, 82.35, 0.005); assert.equal(weighted.simpleMean, 84);
  const wpage = flatten(html('/tools/weighted-average-calculator/'));
  assert.ok(wpage.includes('<th scope="row">合計</th><td>—</td><td>17</td><td>1400</td>'));
});

test('merge-pdf comparison table is rendered and the page stays noindex outside the whitelist', () => {
  const page = flatten(html('/tools/merge-pdf/'));
  assert.match(page, /<table class="section-table">\s*<caption>本機瀏覽器合併與上傳雲端合併服務的比較/);
  assert.match(page, /name="robots" content="noindex/);
  assert.ok(!INDEXABLE_PATHS.includes('/tools/merge-pdf/'));
});

test('homepage first-screen lookup table links the hub and all ten whitelisted tools with static anchors', () => {
  const page = flatten(html('/'));
  const table = page.match(/<table class="home-ref-table home-lookup-table"[\s\S]*?<\/table>/)?.[0] ?? '';
  assert.ok(table, 'lookup table rendered');
  const hrefs = [...table.matchAll(/<a class="inline-link" href="([^"]+)">([^<]+)<\/a>/g)];
  assert.equal(hrefs.length, 11);
  assert.ok(hrefs.some((m) => m[1] === '/education-statistics/'));
  for (const path of INDEXABLE_PATHS.filter((p) => p.startsWith('/tools/'))) assert.ok(hrefs.some((m) => m[1] === path), path);
  for (const [, , label] of hrefs) assert.ok(label.length >= 6, label);
  assert.match(page, /台灣教育統計與免上傳工具速查表/);
  assert.match(page, /作者：<a href="\/about\/" rel="author">Benson Lai<\/a>/);
  assert.match(page, /<time datetime="2026-11-08">2026-11-08<\/time>/);
  assert.doesNotMatch(page, /href="\/tools\/merge-pdf\/"/);
});
