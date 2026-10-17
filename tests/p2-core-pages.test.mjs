import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  normalCdf, tScoreFrom, rawScoreForT, rawScoreForZ, roundHalfUp, describeData, percentileRankMidpoint, countBelowAndEqual, parseNumbers,
  weightedMean, gradeSummary,
} from '../src/lib/educationStats.ts';

const close = (actual, expected, eps = 1e-9) => assert.ok(Math.abs(actual - expected) < eps, `${actual} !~ ${expected}`);
const html = (route) => readFileSync(new URL(`../dist${route}index.html`, import.meta.url), 'utf8');

test('normalCdf matches published standard normal values', () => {
  close(normalCdf(0), 0.5);
  close(normalCdf(1), 0.8413447460685429, 1e-12);
  close(normalCdf(1.2), 0.8849303297782918, 1e-12);
  close(normalCdf(2), 0.9772498680518208, 1e-12);
  close(normalCdf(-1), 0.15865525393145707, 1e-12);
  close(normalCdf(3), 0.9986501019683699, 1e-12);
});

test('T score worked examples on the page are reproduced by the calculator function', () => {
  const ex1 = tScoreFrom({ score: 82, mean: 70, sd: 10 });
  close(ex1.z, 1.2); close(ex1.t, 62); close(ex1.normalPr, 88.4930329778, 1e-9);
  const math = tScoreFrom({ score: 68, mean: 52, sd: 16 });
  close(math.z, 1); close(math.t, 60); close(math.normalPr, 84.1344746069, 1e-9);
  const english = tScoreFrom({ score: 85, mean: 80, sd: 10 });
  close(english.z, 0.5); close(english.t, 55);
  const science = tScoreFrom({ score: 55, mean: 62, sd: 8 });
  close(science.z, -0.875); close(science.t, 41.25);
  close(rawScoreForT(60, 70, 10), 80);
  assert.equal(tScoreFrom({ score: 80, mean: 70, sd: 0 }), null);
  assert.equal(tScoreFrom({ score: 80, mean: 70, sd: -1 }), null);
  assert.equal(tScoreFrom({ z: 1.2 }).t, 62);
});

test('Excel example: STDEV.P versus STDEV.S changes T for 80 points', () => {
  const stats = describeData([52, 58, 61, 65, 68, 70, 72, 75, 80, 89]);
  close(stats.mean, 69);
  close(stats.sdPopulation, 10.285912696499, 1e-9);
  close(stats.sdSample, 10.842303978194, 1e-9);
  close(tScoreFrom({ score: 80, mean: stats.mean, sd: stats.sdPopulation }).t, 60.6942381533, 1e-9);
  close(tScoreFrom({ score: 80, mean: stats.mean, sd: stats.sdSample }).t, 60.1454451214, 1e-9);
});

test('T score page: byline, review date, schema and PR table are rendered', () => {
  const page = html('/tools/t-score-calculator/');
  const flat = page.replace(/ data-astro-cid-[a-z0-9]+/g, '');
  assert.match(flat, /作者：<a href="\/about\/" rel="author">Benson Lai<\/a>/);
  assert.match(flat, /最後審核：<time datetime="2026-10-16">2026-10-16<\/time>/);
  assert.match(page, /"dateModified":"2026-10-16"/);
  assert.match(page, /"@type":"WebApplication"/);
  assert.match(page, /"@type":"BreadcrumbList"/);
  assert.doesNotMatch(page, /"@type":"(FAQPage|HowTo)"/);
  for (const [t, pr] of [[30, '2.28'], [40, '15.87'], [60, '84.13'], [70, '97.72'], [80, '99.87']]) {
    assert.match(flat, new RegExp(`<th scope="row">T = ${t}</th><td>[^<]*</td><td>${pr.replace('.', '\\.')}</td>`));
  }
  for (const href of ['/tools/z-score-calculator/', '/tools/percentile-rank-calculator/', '/tools/standard-deviation/']) {
    assert.ok(page.includes(`href="${href}"`), href);
  }
});

test('percentile rank worked examples are reproduced by the calculator function', () => {
  close(percentileRankMidpoint(24, 1, 40), 61.25);
  const quiz = [95, 90, 90, 85, 80, 80, 80, 70, 65, 50];
  const pr = (score) => { const c = countBelowAndEqual(quiz, score); return percentileRankMidpoint(c.below, c.equal, c.total); };
  assert.deepEqual(countBelowAndEqual(quiz, 80), { below: 3, equal: 3, total: 10 });
  close(pr(80), 45); close(pr(90), 80); close(pr(85), 65); close(pr(95), 95); close(pr(50), 5);
  close(percentileRankMidpoint(270, 1, 300), 90.1666666667, 1e-9);
  close(percentileRankMidpoint(39, 1, 40), 98.75); close(percentileRankMidpoint(0, 1, 40), 1.25);
  close(percentileRankMidpoint(999, 1, 1000), 99.95);
  assert.equal(percentileRankMidpoint(30, 11, 40), null);
  assert.equal(percentileRankMidpoint(5, 0, 40), null);
  assert.equal(percentileRankMidpoint(5.5, 1, 40), null);
});

test('percentile rank page: byline, schema and sources are rendered', () => {
  const page = html('/tools/percentile-rank-calculator/');
  const flat = page.replace(/ data-astro-cid-[a-z0-9]+/g, '');
  assert.match(flat, /作者：<a href="\/about\/" rel="author">Benson Lai<\/a>/);
  assert.match(flat, /最後審核：<time datetime="2026-10-16">2026-10-16<\/time>/);
  assert.match(page, /"@type":"WebApplication"/);
  assert.doesNotMatch(page, /"@type":"(FAQPage|HowTo)"/);
  assert.match(page, /低於的百分比/);
  for (const href of ['/tools/class-rank-percentile-calculator/', '/tools/t-score-calculator/']) {
    assert.ok(page.includes(`href="${href}"`), href);
  }
  assert.doesNotMatch(page, /會考/);
});

test('standard deviation worked examples are reproduced by the calculator function', () => {
  const ex1 = describeData(parseNumbers('62, 68, 70, 75, 85'));
  assert.equal(ex1.n, 5); close(ex1.mean, 72); close(ex1.sumSquares, 298);
  close(ex1.varPopulation, 59.6); close(ex1.sdPopulation, 7.7201036262, 1e-9);
  close(ex1.varSample, 74.5); close(ex1.sdSample, 8.6313382508, 1e-9);
  const a = describeData([60, 60, 80, 80]); const b = describeData([68, 70, 70, 72]);
  close(a.mean, 70); close(b.mean, 70); close(a.sdPopulation, 10); close(b.varPopulation, 2); close(b.sdPopulation, 1.4142135624, 1e-9);
  const ten = describeData([52, 58, 61, 65, 68, 70, 72, 75, 80, 89]);
  assert.equal(ten.sdPopulation.toFixed(4), '10.2859'); assert.equal(ten.sdSample.toFixed(4), '10.8423');
  const one = describeData([50]);
  assert.equal(one.sdPopulation, 0); assert.ok(Number.isNaN(one.sdSample));
  assert.deepEqual(parseNumbers('3,5 abc 7'), [3, 5, 7]);
  assert.equal(describeData([]), null);
});

test('standard deviation matches published Casio and Microsoft examples', () => {
  const casio = describeData([55, 54, 51, 55, 53, 53, 54, 52]);
  close(casio.mean, 53.375); close(casio.sdPopulation, 1.316956719, 1e-9); close(casio.sdSample, 1.407885953, 1e-9);
  const strength = describeData([1345, 1301, 1368, 1322, 1310, 1370, 1318, 1350, 1303, 1299]);
  close(strength.sdSample, 27.46391572, 1e-8); close(strength.sdPopulation, 26.05455814, 1e-8);
  close(strength.varPopulation, 678.84, 1e-9); close(strength.varSample, 754.27, 5e-3);
});

test('standard deviation page: default input, byline, schema, sources and links are rendered', () => {
  const page = html('/tools/standard-deviation/');
  const flat = page.replace(/ data-astro-cid-[a-z0-9]+/g, '');
  assert.match(flat, /<textarea[^>]*data-input[^>]*>62, 68, 70, 75, 85<\/textarea>/);
  assert.match(flat, /作者：<a href="\/about\/" rel="author">Benson Lai<\/a>/);
  assert.match(flat, /最後審核：<time datetime="2026-10-16">2026-10-16<\/time>/);
  assert.match(page, /"@type":"WebApplication"/);
  assert.match(page, /"@type":"BreadcrumbList"/);
  assert.doesNotMatch(page, /"@type":"(FAQPage|HowTo)"/);
  for (const href of ['/tools/z-score-calculator/', '/tools/t-score-calculator/']) {
    assert.ok(page.includes(`href="${href}"`), href);
  }
  assert.ok(page.includes('support.casio.com'));
});

// ---------------------------------------------------------------- P2 batch 2: Z score
test('normalCdf agrees with all 410 entries of the NIST/SEMATECH standard normal table', () => {
  const { rows } = JSON.parse(readFileSync(new URL('./fixtures/nist-normal-table.json', import.meta.url), 'utf8'));
  let checked = 0;
  for (const [row, values] of Object.entries(rows)) {
    values.forEach((published, i) => {
      // NIST prints 5 decimals (area from 0 to z); allow one unit in the last printed digit.
      close(normalCdf(Number(row) + i / 100) - 0.5, published, 1e-5 + 1e-9);
      checked += 1;
    });
  }
  assert.equal(checked, 410);
  // NIST worked examples
  close(normalCdf(1.53), 0.93699, 1e-5); close(normalCdf(-1.53), 0.06301, 1e-5);
  close(normalCdf(0.5) - normalCdf(-1), 0.5328, 1e-4);
  // NIST critical values
  for (const [p, z] of [[0.9, 1.282], [0.95, 1.645], [0.975, 1.96], [0.99, 2.326], [0.995, 2.576]]) close(normalCdf(z), p, 5e-4);
});

test('Z score worked examples on the page are reproduced by the calculator function', () => {
  const ex1 = tScoreFrom({ score: 82, mean: 70, sd: 10 });
  close(ex1.z, 1.2); close(ex1.t, 62); assert.equal(ex1.normalPr.toFixed(2), '88.49'); assert.equal((100 * normalCdf(-ex1.z)).toFixed(2), '11.51');
  const math = tScoreFrom({ score: 85, mean: 70, sd: 15 });
  close(math.z, 1); close(math.t, 60); assert.equal(math.normalPr.toFixed(2), '84.13');
  const english = tScoreFrom({ score: 91, mean: 82, sd: 6 });
  close(english.z, 1.5); close(english.t, 65); assert.equal(english.normalPr.toFixed(2), '93.32');
  const social = tScoreFrom({ score: 55, mean: 68, sd: 10 });
  close(social.z, -1.3); close(social.t, 37); assert.equal(social.normalPr.toFixed(2), '9.68');
  close(rawScoreForZ(2, 64, 12), 88);
  assert.equal(normalCdf(1.23).toFixed(4), '0.8907'); assert.equal(normalCdf(1.3).toFixed(4), '0.9032');
  close(1 - 0.9032, 0.0968, 1e-12);
  // Microsoft documentation examples for STANDARDIZE and NORM.S.DIST
  close(tScoreFrom({ score: 42, mean: 40, sd: 1.5 }).z, 1.33333333, 1e-8);
  close(normalCdf(1.333333), 0.908788726, 1e-9);
  // +-z ranges used in the page table
  for (const [z, pct] of [[1, '68.27'], [1.645, '90.00'], [1.96, '95.00'], [2, '95.45'], [2.576, '99.00'], [3, '99.73']]) {
    assert.equal((100 * (2 * normalCdf(z) - 1)).toFixed(2), pct);
  }
  assert.equal(tScoreFrom({ score: 80, mean: 70, sd: 0 }), null);
});

test('Z score page: default input, byline, schema, Z table, sources and links are rendered', () => {
  const page = html('/tools/z-score-calculator/');
  const flat = page.replace(/ data-astro-cid-[a-z0-9]+/g, '');
  assert.match(flat, /data-field="score"[^>]*value="82"/); assert.match(flat, /data-field="mean"[^>]*value="70"/); assert.match(flat, /data-field="sd"[^>]*value="10"/);
  assert.match(flat, /作者：<a href="\/about\/" rel="author">Benson Lai<\/a>/);
  assert.match(flat, /最後審核：<time datetime="2026-10-17">2026-10-17<\/time>/);
  assert.match(page, /"dateModified":"2026-10-17"/);
  assert.match(page, /"@type":"WebApplication"/); assert.match(page, /"@type":"BreadcrumbList"/);
  assert.doesNotMatch(page, /"@type":"(FAQPage|HowTo)"/);
  assert.match(flat, /<th scope="row">1\.2<\/th><td>0\.8849<\/td><td>0\.8869<\/td><td>0\.8888<\/td><td>0\.8907<\/td>/);
  assert.match(flat, /<th scope="row">z = 1\.96<\/th><td>0\.9750<\/td><td>95\.00%<\/td>/);
  for (const href of ['/tools/t-score-calculator/', '/tools/percentile-rank-calculator/', '/tools/standard-deviation/']) assert.ok(page.includes(`href="${href}"`), href);
  for (const host of ['pedia.cloud.edu.tw', 'itl.nist.gov', 'support.microsoft.com']) assert.ok(page.includes(host), host);
  for (const h2 of ['Z 分數是什麼', 'Z 分數怎麼算', 'Z 分數怎麼看', 'Z 分數查表', 'Z 分數與 T 分數', '常態分配', 'Excel', '常見錯誤']) assert.ok(flat.includes(h2), h2);
});

// ---------------------------------------------------------------- P2 batch 2: weighted average
const hsCourses = [[78, 4], [85, 4], [72, 4], [90, 3], [95, 2]].map(([value, weight]) => ({ value, weight }));

test('roundHalfUp strips binary noise and rounds half away from zero', () => {
  assert.equal(roundHalfUp(82.35, 1), 82.4); assert.equal(roundHalfUp(82.5, 0), 83); assert.equal(roundHalfUp(1.005, 2), 1.01);
  assert.equal(roundHalfUp(-2.5, 0), -3); assert.equal(roundHalfUp(82.3529411764706, 1), 82.4); assert.ok(Number.isNaN(roundHalfUp(Number.NaN, 1)));
});

test('weighted average worked examples on the page are reproduced by the calculator function', () => {
  const ex1 = weightedMean(hsCourses);
  assert.equal(ex1.weightTotal, 17); assert.equal(ex1.weightedSum, 1400);
  close(ex1.mean, 1400 / 17); assert.equal(ex1.mean.toFixed(4), '82.3529'); assert.equal(roundHalfUp(ex1.mean, 1), 82.4); assert.equal(ex1.simpleMean, 84);
  assert.deepEqual(hsCourses.map(({ value, weight }) => value * weight), [312, 340, 288, 270, 190]);
  const classes = weightedMean([{ value: 70, weight: 40 }, { value: 85, weight: 20 }, { value: 76, weight: 30 }]);
  assert.equal(classes.weightedSum, 6780); assert.equal(classes.weightTotal, 90); assert.equal(classes.mean.toFixed(2), '75.33'); assert.equal(classes.simpleMean, 77);
  // example 3: add a 2-credit course, target 84 -> 98; target 85 -> 107.5 (impossible)
  close((1400 + 2 * 98) / 19, 84); close((85 * 19 - 1400) / 2, 107.5);
  // FAQ example and weights that are not 100
  close(weightedMean([{ value: 78, weight: 4 }, { value: 85, weight: 4 }]).mean, 81.5);
  close(weightedMean([{ value: 80, weight: 1 }, { value: 90, weight: 3 }]).mean, 87.5);
  // equal weights == simple mean
  close(weightedMean([{ value: 60, weight: 2 }, { value: 80, weight: 2 }]).mean, 70);
  // invalid input is rejected instead of skipped
  assert.equal(weightedMean([]), null);
  assert.equal(weightedMean([{ value: 80, weight: 0 }]), null);
  assert.equal(weightedMean([{ value: 80, weight: -1 }, { value: 90, weight: 1 }]), null);
  assert.equal(weightedMean([{ value: Number.NaN, weight: 1 }]), null);
});

test('weighted average page: widget defaults, byline, schema, sources and links are rendered', () => {
  const widgetSource = readFileSync(new URL('../src/components/tools/EducationStatisticsCalculator.astro', import.meta.url), 'utf8');
  assert.ok(widgetSource.includes("[['78', '4'], ['85', '4'], ['72', '4'], ['90', '3'], ['95', '2']]"), 'widget defaults must equal worked example 1');
  const page = html('/tools/weighted-average-calculator/');
  const flat = page.replace(/ data-astro-cid-[a-z0-9]+/g, '');
  assert.match(flat, /作者：<a href="\/about\/" rel="author">Benson Lai<\/a>/);
  assert.match(flat, /最後審核：<time datetime="2026-10-17">2026-10-17<\/time>/);
  assert.match(page, /"dateModified":"2026-10-17"/);
  assert.match(page, /"@type":"WebApplication"/); assert.match(page, /"@type":"BreadcrumbList"/);
  assert.doesNotMatch(page, /"@type":"(FAQPage|HowTo)"/);
  assert.match(flat, /=SUMPRODUCT\(B2:B6,C2:C6\)\/SUM\(C2:C6\)/);
  for (const href of ['/tools/grade-average/', '/tools/standard-deviation/']) assert.ok(page.includes(`href="${href}"`), href);
  for (const host of ['law.moj.gov.tw', 'itl.nist.gov', 'support.microsoft.com']) assert.ok(page.includes(host), host);
  for (const h2 of ['加權平均是什麼', '加權平均怎麼算', '高中學期總平均', '加權平均怎麼看', 'Excel', '常見錯誤']) assert.ok(flat.includes(h2), h2);
  assert.doesNotMatch(page, /加權平均資金成本|流通在外/);
});

// ---------------------------------------------------------------- P2 batch 2: semester grade (grade-average)
test('semester grade worked examples on the page are reproduced by the calculator function', () => {
  const ex1 = gradeSummary([{ score: 88, weight: 30 }, { score: 76, weight: 30 }, { score: 84, weight: 40 }]);
  assert.equal(ex1.count, 3); assert.equal(ex1.sum, 248);
  close(ex1.weighted, 82.8); assert.equal(ex1.average.toFixed(2), '82.67'); assert.equal(roundHalfUp(ex1.weighted, 0), 83);
  assert.equal((ex1.weighted - ex1.average).toFixed(2), '0.13');
  assert.deepEqual([88 * 0.3, 76 * 0.3, 84 * 0.4].map((v) => v.toFixed(1)), ['26.4', '22.8', '33.6']);
  // example 2: points-based scheme, both ways
  assert.equal(24 + 27 + 34, 85);
  close(gradeSummary([{ score: 80, weight: 30 }, { score: 90, weight: 30 }, { score: 85, weight: 40 }]).weighted, 85);
  // example 3: score needed on the final (40%)
  close((60 - 88 * 0.3 - 76 * 0.3) / 0.4, 27); close((80 - 88 * 0.3 - 76 * 0.3) / 0.4, 77);
  // same expression as the "plan remaining grade" box: current 82 over 60% completed, target 80
  assert.equal(((80 - 82 * 60 / 100) / (40 / 100)).toFixed(2), '77.00');
  // weight blank or 0: kept in the simple average, dropped from the weighted average
  for (const weight of [null, 0]) {
    const s = gradeSummary([{ score: 88, weight: 30 }, { score: 76, weight: 30 }, { score: 84, weight: 40 }, { score: 70, weight }]);
    assert.equal(s.count, 4); assert.equal(s.sum, 318); assert.equal(s.average, 79.5); close(s.weighted, 82.8);
  }
  // rows without a score are ignored; no weights -> no weighted average
  const blank = gradeSummary([{ score: null, weight: 30 }, { score: 90, weight: null }]);
  assert.equal(blank.count, 1); assert.equal(blank.weighted, null); assert.equal(gradeSummary([]).average, null);
  // rounding rule shown for senior-high subject scores
  assert.equal(roundHalfUp(82.4, 0), 82); assert.equal(roundHalfUp(82.5, 0), 83);
});

test('semester grade page: widget defaults, byline, schema, regulation tables and sources are rendered', () => {
  const widgetSource = readFileSync(new URL('../src/components/tools/GradeAverage.astro', import.meta.url), 'utf8');
  assert.ok(/createRow\('88', '30'\);\s*createRow\('76', '30'\);\s*createRow\('84', '40'\);/.test(widgetSource), 'widget defaults must equal worked example 1');
  const page = html('/tools/grade-average/');
  const flat = page.replace(/ data-astro-cid-[a-z0-9]+/g, '');
  assert.match(flat, /<h1[^>]*>學期成績計算器<\/h1>/);
  assert.match(flat, /作者：<a href="\/about\/" rel="author">Benson Lai<\/a>/);
  assert.match(flat, /最後審核：<time datetime="2026-10-17">2026-10-17<\/time>/);
  assert.match(page, /"dateModified":"2026-10-17"/);
  assert.match(page, /"@type":"WebApplication"/); assert.match(page, /"@type":"BreadcrumbList"/);
  assert.doesNotMatch(page, /"@type":"(FAQPage|HowTo)"/);
  assert.match(flat, /data-current-grade[^>]*value="82"/); assert.match(flat, /data-completed-weight[^>]*value="60"/); assert.match(flat, /data-target-grade[^>]*value="80"/);
  assert.match(flat, /<th scope="row">乙<\/th><td>七十分以上未滿八十分<\/td>/);
  assert.match(flat, /=ROUND\(SUMPRODUCT\(B2:B4,C2:C4\),0\)/);
  for (const href of ['/tools/weighted-average-calculator/']) assert.ok(page.includes(`href="${href}"`), href);
  for (const host of ['law.moj.gov.tw/LawClass/LawAll.aspx?pcode=H0070019', 'law.moj.gov.tw/LawClass/LawAll.aspx?pcode=H0060060', 'support.microsoft.com']) assert.ok(page.includes(host), host);
  for (const h2 of ['學期成績怎麼算', '配分實例', '學期成績會四捨五入嗎', '各學制規定一覽', 'Excel', '常見錯誤']) assert.ok(flat.includes(h2), h2);
  // no invented unified rounding rule: the page must say the rule depends on school level
  assert.match(flat, /國中小：《國民小學及國民中學學生學習評量辦法》全文沒有「四捨五入」或「進位」的規定/);
  assert.match(flat, /依各校規定（未逐校查證）/);
  const en = html('/en/tools/grade-average/');
  assert.match(en, /"dateModified":"2026-10-17"/);
});
