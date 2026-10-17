import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  normalCdf, tScoreFrom, rawScoreForT, rawScoreForZ, roundHalfUp, describeData, percentileRankMidpoint, countBelowAndEqual, parseNumbers,
  weightedMean, gradeSummary,
  rankPercentile, maxRankForTopPercent, independentTTest, formatApaP, tTwoTailedP, tCritical,
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
  assert.match(flat, /最後審核：<time datetime="2026-10-17">2026-10-17<\/time>/);
  assert.match(page, /"dateModified":"2026-10-17"/);
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

// ---------------------------------------------------------------- P2 batch 3: class rank percentage (班排)
test('class rank worked examples on the page are reproduced by the calculator function', () => {
  const ex1 = rankPercentile(6, 40);
  close(ex1.pr, 86.25); close(ex1.topPercent, 15); assert.equal(ex1.ahead, 5); assert.equal(ex1.behind, 34);
  // example 2: top 10% of 45 students
  assert.equal(maxRankForTopPercent(45, 10), 4);
  assert.equal((100 * 4 / 45).toFixed(2), '8.89'); assert.equal((100 * 5 / 45).toFixed(2), '11.11');
  assert.equal(rankPercentile(4, 45).pr.toFixed(2), '92.22'); assert.equal(rankPercentile(5, 45).pr.toFixed(2), '90.00');
  assert.equal(rankPercentile(5, 45).topPercent.toFixed(2), '11.11');
  // example 3: whole school
  const school = rankPercentile(90, 480);
  close(school.topPercent, 18.75); assert.equal(school.pr.toFixed(2), '81.35'); assert.equal(rankPercentile(6, 480).topPercent, 1.25);
  // ties: three students share 6th place of 40
  const tie = rankPercentile(6, 40, 3);
  assert.equal(tie.behind, 32); close(tie.pr, 83.75); close(tie.topPercent, 15); assert.equal(rankPercentile(39, 40, 3), null);
  // boundaries and invalid input
  close(rankPercentile(1, 40).pr, 98.75); close(rankPercentile(1, 40).topPercent, 2.5);
  close(rankPercentile(40, 40).pr, 1.25); close(rankPercentile(40, 40).topPercent, 100);
  for (const bad of [[0, 40], [41, 40], [6.5, 40], [6, 0], [6, 40, 0], [6, 40, 1.5], [-1, 40]]) assert.equal(rankPercentile(...bad), null, bad.join(','));
  // PR = 100 - top% + 50/N for every rank when nobody ties
  for (const n of [30, 40, 45, 480]) for (let r = 1; r <= n; r += 1) close(rankPercentile(r, n).pr, 100 - 100 * r / n + 50 / n, 1e-9);
  // agrees with the percentile-rank function when counts are given directly (the Excel example)
  const quiz = [95, 90, 90, 85, 80, 80, 80, 70, 65, 50];
  const c = countBelowAndEqual(quiz, 80);
  close(percentileRankMidpoint(c.below, c.equal, c.total), 45); close(rankPercentile(5, 10, 3).pr, 45); close(rankPercentile(1, 10).pr, 95);
  close((10 - 5 + 0.5) / 10 * 100, 55); // the no-tie Excel formula is wrong for the tied student
});

test('maxRankForTopPercent floors exactly and ignores binary noise', () => {
  assert.equal(maxRankForTopPercent(30, 10), 3); assert.equal(maxRankForTopPercent(40, 10), 4); assert.equal(maxRankForTopPercent(35, 10), 3);
  assert.equal(maxRankForTopPercent(100, 0.07), 0); assert.equal(maxRankForTopPercent(100, 0.07 * 100), 7);
  assert.equal(maxRankForTopPercent(700, 0.57), 3); assert.equal(maxRankForTopPercent(1000, 0.29), 2); assert.equal(maxRankForTopPercent(300, 1.1), 3);
  assert.equal(maxRankForTopPercent(40, 100), 40);
  for (const bad of [[0, 10], [40.5, 10], [40, 0], [40, -5], [40, 100.1], [40, Number.NaN]]) assert.equal(maxRankForTopPercent(...bad), null);
});

test('class rank page: defaults, byline, schema, rank table, official quotes and sources are rendered', () => {
  const page = html('/tools/class-rank-percentile-calculator/');
  const flat = page.replace(/ data-astro-cid-[a-z0-9]+/g, '');
  assert.match(flat, /<h1[^>]*>班排百分比計算器<\/h1>/);
  assert.match(flat, /data-field="rank"[^>]*value="6"/); assert.match(flat, /data-field="total"[^>]*value="40"/); assert.match(flat, /data-field="tied"[^>]*value="1"/);
  assert.match(flat, /作者：<a href="\/about\/" rel="author">Benson Lai<\/a>/);
  assert.match(flat, /最後審核：<time datetime="2026-10-17">2026-10-17<\/time>/);
  assert.match(page, /"dateModified":"2026-10-17"/);
  assert.match(page, /"@type":"WebApplication"/); assert.match(page, /"@type":"BreadcrumbList"/);
  assert.doesNotMatch(page, /"@type":"(FAQPage|HowTo)"/); assert.doesNotMatch(page, /noindex/);
  assert.match(flat, /<th scope="row">45 人<\/th><td>第 2 名<\/td><td>第 4 名<\/td><td>第 9 名<\/td><td>第 13 名<\/td><td>第 22 名<\/td>/);
  for (const href of ['/tools/percentile-rank-calculator/', '/tools/t-score-calculator/', '/tools/standard-deviation/']) assert.ok(page.includes(`href="${href}"`), href);
  for (const host of ['cac.edu.tw/star115/appform_1.php', 'cac.edu.tw/apply115/appform_1.php', 'pedia.cloud.edu.tw', 'support.microsoft.com']) assert.ok(page.includes(host), host);
  for (const h2 of ['班排是什麼意思', '班排百分比怎麼算', '名次對照表', '班排、校排、PR 差在哪', '申請入學脈絡', '同名次', 'Excel', '常見錯誤']) assert.ok(flat.includes(h2), h2);
  // official wording quoted from the 115 star-recommendation rules
  for (const quote of ['全校排名百分比符合大學規定', '大學得就前百分之 20、前百分之 30、前百分之 40、前百分之 50，擇一訂定全校統一標準', '由百分比小者優先分發']) assert.ok(flat.includes(quote), quote);
  assert.ok(flat.includes('查核日期 2026-10-17'));
  assert.ok(flat.includes('=(COUNTIF($A$2:$A$11,&quot;&lt;&quot;&amp;A6)+COUNTIF($A$2:$A$11,A6)/2)/COUNT($A$2:$A$11)*100'));
  const en = html('/en/tools/class-rank-percentile-calculator/');
  assert.match(en, /"dateModified":"2026-10-17"/);
});

// ---------------------------------------------------------------- P2 batch 3: independent-samples t test
const tCase = (n1, mean1, sd1, n2, mean2, sd2) => ({ n1, mean1, sd1, n2, mean2, sd2 });
const sleepA = [0.7, -1.6, -0.2, -1.2, -0.1, 3.4, 3.7, 0.8, 0.0, 2.0]; // R datasets::sleep, group 1
const sleepB = [1.9, 0.8, 1.1, 0.1, -0.1, 4.4, 5.5, 1.6, 4.6, 3.4]; // R datasets::sleep, group 2
const fromRaw = (a, b) => { const x = describeData(a); const y = describeData(b); return tCase(a.length, x.mean, x.sdSample, b.length, y.mean, y.sdSample); };

test('independentTTest agrees with SciPy (ttest_ind_from_stats) for Welch and Student', () => {
  // reference values computed with SciPy 1.x: stats.ttest_ind_from_stats(..., equal_var=...) and stats.t.ppf(0.975, df)
  const refs = [
    ['default welch', tCase(30, 78.4, 8.2, 32, 73.1, 9.5), 'welch', { t: 2.355754300413088, df: 59.607972070298864, p: 0.021792916703421525, lo: 0.7991007673064612, hi: 9.800899232693562 }],
    ['default student', tCase(30, 78.4, 8.2, 32, 73.1, 9.5), 'student', { t: 2.344494265529541, df: 60, p: 0.02238066684152906, lo: 0.778095804051353, hi: 9.821904195948669 }],
    ['unequal welch', tCase(12, 75, 15, 48, 68, 6), 'welch', { t: 1.585187847802434, df: 11.89314639624311, p: 0.1391387436292515, lo: -2.6309730154995083, hi: 16.630973015499507 }],
    ['unequal student', tCase(12, 75, 15, 48, 68, 6), 'student', { t: 2.5587974137206806, df: 58, p: 0.013135520268257197, lo: 1.523981338310744, hi: 12.476018661689256 }],
    ['nist student', tCase(249, 20.14458, 6.41470, 79, 30.48101, 6.10771), 'student', { t: -12.620585000444759, df: 326, p: 5.273218316047391e-30, lo: -11.947648737831484, hi: -8.725211262168516 }],
    ['nist welch', tCase(249, 20.14458, 6.41470, 79, 30.48101, 6.10771), 'welch', { t: -12.946267565658848, df: 136.8749900936937, p: 1.5709046154648375e-25, lo: -11.915243780872187, hi: -8.757616219127813 }],
  ];
  for (const [name, input, method, ref] of refs) {
    const r = independentTTest(input, method);
    close(r.t, ref.t, 1e-9); close(r.df, ref.df, 1e-9); close(r.ciLower, ref.lo, 1e-8); close(r.ciUpper, ref.hi, 1e-8);
    assert.ok(Math.abs(r.p - ref.p) <= Math.max(1e-12, ref.p * 1e-7), `${name}: p ${r.p} !~ ${ref.p}`);
  }
});

test('independent t test reproduces NIST AUTO83B and the published R output for the sleep data', () => {
  // NIST/SEMATECH e-Handbook 1.3.5.3 (equal variances): T = -12.62059, sp = 6.34260, df = 326, critical value 1.9673
  const nist = independentTTest(tCase(249, 20.14458, 6.41470, 79, 30.48101, 6.10771), 'student');
  close(nist.t, -12.62059, 5e-5); close(nist.pooledSd, 6.34260, 5e-5); assert.equal(nist.df, 326); close(tCritical(326, 0.05), 1.9673, 5e-5);
  assert.ok(Math.abs(nist.t) > 1.9673);
  // R: t.test(extra ~ group, sleep) -> t = -1.8608, df = 17.776, p-value = 0.07939, CI -3.3654832 0.2054832, means 0.75 / 2.33
  const raw = fromRaw(sleepA, sleepB);
  close(raw.mean1, 0.75, 1e-12); close(raw.mean2, 2.33, 1e-12);
  const welch = independentTTest(raw);
  close(welch.t, -1.8608, 5e-5); close(welch.df, 17.776, 5e-4); close(welch.p, 0.07939, 5e-6); close(welch.ciLower, -3.3654832, 5e-7); close(welch.ciUpper, 0.2054832, 5e-7);
  const student = independentTTest(raw, 'student');
  assert.equal(student.df, 18); close(student.p, 0.07919, 5e-6); close(student.t, welch.t, 1e-12);
  // the page quotes SDs rounded to 3 decimals: 1.789 and 2.002
  const rounded = independentTTest(tCase(10, 0.75, 1.789, 10, 2.33, 2.002));
  assert.equal(rounded.t.toFixed(3), '-1.861'); assert.equal(rounded.df.toFixed(2), '17.78'); assert.equal(rounded.p.toFixed(4), '0.0794');
});

test('independent t test worked examples on the page are reproduced by the calculator function', () => {
  const ex1 = independentTTest(tCase(30, 78.4, 8.2, 32, 73.1, 9.5));
  close(ex1.difference, 5.3, 1e-9);
  assert.equal((8.2 ** 2 / 30).toFixed(4), '2.2413'); assert.equal((9.5 ** 2 / 32).toFixed(4), '2.8203'); assert.equal((8.2 ** 2 / 30 + 9.5 ** 2 / 32).toFixed(4), '5.0616');
  assert.equal(ex1.standardError.toFixed(4), '2.2498'); assert.equal(ex1.t.toFixed(3), '2.356'); assert.equal(ex1.df.toFixed(2), '59.61'); assert.equal(ex1.p.toFixed(4), '0.0218');
  assert.equal(ex1.ciLower.toFixed(2), '0.80'); assert.equal(ex1.ciUpper.toFixed(2), '9.80'); assert.equal(ex1.hedgesG.toFixed(2), '0.59');
  assert.equal(formatApaP(ex1.p), 'p = .022');
  assert.equal((5.0616 ** 2 / ((2.2413 ** 2) / 29 + (2.8203 ** 2) / 31)).toFixed(1), '59.6');
  const ex1s = independentTTest(tCase(30, 78.4, 8.2, 32, 73.1, 9.5), 'student');
  assert.equal(ex1s.pooledSd.toFixed(3), '8.895'); assert.equal(ex1s.standardError.toFixed(4), '2.2606'); assert.equal(ex1s.t.toFixed(3), '2.344'); assert.equal(ex1s.df, 60); assert.equal(ex1s.p.toFixed(4), '0.0224');
  // example 2: very different n and SD -> opposite conclusions
  const ex2 = independentTTest(tCase(12, 75, 15, 48, 68, 6));
  assert.equal(ex2.standardError.toFixed(3), '4.416'); assert.equal(ex2.t.toFixed(3), '1.585'); assert.equal(ex2.df.toFixed(2), '11.89'); assert.equal(ex2.p.toFixed(3), '0.139');
  assert.equal(ex2.ciLower.toFixed(2), '-2.63'); assert.equal(ex2.ciUpper.toFixed(2), '16.63');
  assert.equal((4167 / 58).toFixed(2), '71.84');
  const ex2s = independentTTest(tCase(12, 75, 15, 48, 68, 6), 'student');
  assert.equal(ex2s.standardError.toFixed(3), '2.736'); assert.equal(ex2s.t.toFixed(3), '2.559'); assert.equal(ex2s.df, 58); assert.equal(ex2s.p.toFixed(3), '0.013');
  assert.equal(ex2s.ciLower.toFixed(2), '1.52'); assert.equal(ex2s.ciUpper.toFixed(2), '12.48');
  assert.ok(ex2.p > 0.05 && ex2s.p < 0.05);
  // CI excludes 0 exactly when p < .05
  for (const r of [ex1, ex1s, ex2, ex2s]) assert.equal(r.ciLower > 0 || r.ciUpper < 0, r.p < 0.05);
});

test('Excel example (T.TEST types 2 and 3) matches the values run in LibreOffice Calc', () => {
  const A = [72, 75, 80, 68, 77, 83, 79, 74]; const B = [65, 70, 72, 68, 74, 66, 71, 69, 73];
  const input = fromRaw(A, B);
  assert.equal(input.mean1.toFixed(2), '76.00'); assert.equal(input.sd1.toFixed(2), '4.78'); assert.equal(input.mean2.toFixed(2), '69.78'); assert.equal(input.sd2.toFixed(2), '3.07');
  const welch = independentTTest(input); const student = independentTTest(input, 'student');
  // values returned by =T.TEST(A2:A9,B2:B10,2,3) / (...,2,2) and the manual formulas in LibreOffice Calc (also equal to SciPy ttest_ind)
  close(welch.p, 0.008641638708928, 1e-9); close(student.p, 0.00559279122044389, 1e-9);
  close(welch.difference, 6.22222222222223, 1e-9); close(welch.standardError, 1.9764932514917, 1e-9); close(welch.t, 3.14811205023148, 1e-9); close(welch.df, 11.7046909530479, 1e-9);
  close(student.t, 3.231366802073849, 1e-9); assert.equal(student.df, 15);
  close(welch.pooledSd, 3.96278988891711, 1e-9); close(welch.cohenD, 1.57016203145773, 1e-9); close(welch.hedgesG, 1.49032328409547, 1e-9);
  // T.DIST.2T truncates the fractional df (LibreOffice: .0093) while the exact Welch p is .0086
  close(tTwoTailedP(welch.t, 11), 0.00927333486982205, 1e-9); assert.equal(welch.p.toFixed(4), '0.0086');
  assert.equal(student.p.toFixed(4), '0.0056');
});

test('Welch df lies between min(n-1) and n1+n2-2; edge cases and APA p formatting', () => {
  let seed = 12345; const rnd = () => { seed = (seed * 1664525 + 1013904223) % 4294967296; return seed / 4294967296; };
  for (let i = 0; i < 300; i += 1) {
    const n1 = 2 + Math.floor(rnd() * 60); const n2 = 2 + Math.floor(rnd() * 60);
    const r = independentTTest(tCase(n1, 50 + rnd() * 30, 0.5 + rnd() * 20, n2, 50 + rnd() * 30, 0.5 + rnd() * 20));
    assert.ok(r.df >= Math.min(n1 - 1, n2 - 1) - 1e-9 && r.df <= n1 + n2 - 2 + 1e-9, `${n1},${n2},${r.df}`);
    if (Math.abs(r.p - 0.05) > 1e-6) assert.equal(r.ciLower > 0 || r.ciUpper < 0, r.p < 0.05);
  }
  const same = independentTTest(tCase(30, 70, 8, 32, 70, 9));
  assert.equal(same.t, 0); close(same.p, 1, 1e-12); assert.equal(formatApaP(same.p), 'p > .999');
  assert.equal(formatApaP(0.0004), 'p < .001'); assert.equal(formatApaP(0.0216), 'p = .022'); assert.equal(formatApaP(0.05), 'p = .050'); assert.equal(formatApaP(Number.NaN), '');
  for (const bad of [tCase(1, 70, 8, 32, 70, 9), tCase(30, 70, 0, 32, 70, 9), tCase(30, 70, -1, 32, 70, 9), tCase(30.5, 70, 8, 32, 70, 9), tCase(30, Number.NaN, 8, 32, 70, 9)]) assert.equal(independentTTest(bad), null);
  assert.ok(Number.isNaN(tTwoTailedP(1, 0)));
});

test('independent t test page: defaults, method menu, byline, schema, sources and links are rendered', () => {
  const page = html('/tools/independent-samples-t-test-calculator/');
  const flat = page.replace(/ data-astro-cid-[a-z0-9]+/g, '');
  assert.match(flat, /<h1[^>]*>獨立樣本 t 檢定計算器<\/h1>/);
  for (const [key, value] of [['n1', '30'], ['mean1', '78.4'], ['sd1', '8.2'], ['n2', '32'], ['mean2', '73.1'], ['sd2', '9.5']]) assert.match(flat, new RegExp(`data-field="${key}"[^>]*value="${value.replace('.', '\\.')}"`), key);
  assert.match(flat, /<select data-field="method">\s*<option value="welch" selected>[^<]*Welch[^<]*<\/option>\s*<option value="student">/);
  assert.match(flat, /作者：<a href="\/about\/" rel="author">Benson Lai<\/a>/);
  assert.match(flat, /最後審核：<time datetime="2026-10-17">2026-10-17<\/time>/);
  assert.match(page, /"dateModified":"2026-10-17"/);
  assert.match(page, /"@type":"WebApplication"/); assert.match(page, /"@type":"BreadcrumbList"/);
  assert.doesNotMatch(page, /"@type":"(FAQPage|HowTo)"/); assert.doesNotMatch(page, /noindex/);
  assert.match(flat, /=T\.TEST\(A2:A9,B2:B10,2,3\)/); assert.match(flat, /=T\.TEST\(A2:A9,B2:B10,2,2\)/);
  for (const href of ['/tools/standard-deviation/', '/tools/apa-7-report-generator/', '/tools/spss-result-interpreter/']) assert.ok(page.includes(`href="${href}"`), href);
  for (const host of ['itl.nist.gov/div898/handbook/eda/section3/eda353.htm', 'rips-irsp.com', 'apastyle.apa.org', 'support.microsoft.com', 'stat.ethz.ch', 'bioconductor.org']) assert.ok(page.includes(host), host);
  for (const h2 of ['獨立樣本 t 檢定是什麼', '怎麼算', 'Student 與 Welch 差在哪', '自由度與 p 值', 'APA 寫法', 'T.TEST', '用公開資料核對', '常見錯誤']) assert.ok(flat.includes(h2), h2);
  assert.ok(flat.includes('查核日期 2026-10-17'));
  const widgetSource = readFileSync(new URL('../src/components/tools/EducationStatisticsCalculator.astro', import.meta.url), 'utf8');
  assert.ok(widgetSource.includes("import { formatApaP, independentTTest,"), 'widget must use the shared independentTTest()');
  assert.doesNotMatch(widgetSource, /function logGamma|function regularizedBeta/);
  const en = html('/en/tools/independent-samples-t-test-calculator/');
  assert.match(en, /"dateModified":"2026-10-17"/);
});

// ---------------------------------------------------------------- P2 batch 3: teacher exam score calculator
const examTotal = (rows) => weightedMean(rows.map(([value, weight]) => ({ value, weight }))).mean;

test('teacher exam worked examples on the page are reproduced by the calculator function', () => {
  // example 1: Chinese subject 40/30/30 (written 78, teaching 85, oral 82)
  close(examTotal([[78, 40], [85, 30], [82, 30]]), 81.3, 1e-9);
  assert.deepEqual([78 * 0.4, 85 * 0.3, 82 * 0.3].map((v) => v.toFixed(1)), ['31.2', '25.5', '24.6']);
  // example 2: geography 40/20/40 with the same scores
  close(examTotal([[78, 40], [85, 40], [82, 20]]), 81.6, 1e-9);
  assert.deepEqual([85 * 0.4, 82 * 0.2].map((v) => v.toFixed(1)), ['34.0', '16.4']); close(81.6 - 81.3, 0.3, 1e-9);
  // converting an item that is not out of 100
  close(42 / 50 * 100, 84, 1e-12);
  // example 3: Taipei structure, written weight 0; two demos 30% each equal one 60% item at their average
  close((78 * 0 + 84.5 * 60 + 81 * 40) / (0 + 60 + 40), 83.1, 1e-9); // the widget's own formula accepts weight 0
  close(examTotal([[84.5, 60], [81, 40]]), 83.1, 1e-9); close((85 * 30 + 84 * 30 + 81 * 40) / 100, 83.1, 1e-9);
  assert.deepEqual([85 * 0.3, 84 * 0.3, 81 * 0.4].map((v) => v.toFixed(1)), ['25.5', '25.2', '32.4']);
  // example 4: rounding to two decimals
  const ex4 = examTotal([[79.35, 40], [84.25, 30], [81.5, 30]]);
  close(ex4, 81.465, 1e-9); assert.equal(roundHalfUp(ex4, 2), 81.47); assert.equal(79.35 * 40 + 84.25 * 30 + 81.5 * 30, 8146.5);
  // example 5: reverse the needed teaching score
  close((85 - 78 * 0.4 - 82 * 0.3) / 0.3, 97.3333333333, 1e-9); close((90 - 78 * 0.4 - 82 * 0.3) / 0.3, 114, 1e-9);
  assert.equal(((85 - (78 * 40 + 82 * 30) / 100) / 30 * 100).toFixed(2), '97.33');
  // weights that do not total 100 use the real total as the divisor; 40/30/30 equals 0.4/0.3/0.3
  close(examTotal([[78, 50], [85, 50], [82, 50]]), 81.6666666667, 1e-9); close(examTotal([[78, 0.4], [85, 0.3], [82, 0.3]]), 81.3, 1e-9);
  // T score illustration: demo mean 80 SD 5, oral mean 85 SD 10, weights 60/40
  const T = (score, mean, sd) => tScoreFrom({ score, mean, sd }).t;
  const a = [T(90, 80, 5), T(80, 85, 10)]; const b = [T(84, 80, 5), T(92, 85, 10)];
  assert.deepEqual(a, [70, 45]); assert.deepEqual(b.map((v) => Number(v.toFixed(6))), [58, 57]);
  close(0.6 * 90 + 0.4 * 80, 86); close(0.6 * 84 + 0.4 * 92, 87.2, 1e-9); close(0.6 * a[0] + 0.4 * a[1], 60, 1e-9); close(0.6 * b[0] + 0.4 * b[1], 57.6, 1e-9);
  assert.ok(0.6 * 90 + 0.4 * 80 < 0.6 * 84 + 0.4 * 92 && 0.6 * a[0] + 0.4 * a[1] > 0.6 * b[0] + 0.4 * b[1], 'standardising flips the order');
  close(tScoreFrom({ score: 90, mean: 80, sd: 5 }).z, 2); close(tScoreFrom({ score: 92, mean: 85, sd: 10 }).z, 0.7);
});

test('teacher exam page: defaults, presets, byline, schema, official excerpts and sources are rendered', () => {
  const page = html('/tools/teacher-exam-score-converter/');
  const flat = page.replace(/ data-astro-cid-[a-z0-9]+/g, '');
  assert.match(flat, /<h1[^>]*>教師甄試成績計算器<\/h1>/);
  for (const [key, value] of [['written', '78'], ['writtenWeight', '40'], ['teaching', '85'], ['teachingWeight', '30'], ['interview', '82'], ['interviewWeight', '30']]) assert.match(flat, new RegExp(`data-field="${key}"[^>]*value="${value}"`), key);
  assert.match(flat, /data-preset="hs"[^>]*>套用高中國文科配分 40\/30\/30</); assert.match(flat, /data-preset="tp"[^>]*>套用臺北市複試 60\/40（筆試權重 0）</);
  assert.match(flat, /作者：<a href="\/about\/" rel="author">Benson Lai<\/a>/);
  assert.match(flat, /最後審核：<time datetime="2026-10-17">2026-10-17<\/time>/);
  assert.match(page, /"dateModified":"2026-10-17"/);
  assert.match(page, /"@type":"WebApplication"/); assert.match(page, /"@type":"BreadcrumbList"/);
  assert.doesNotMatch(page, /"@type":"(FAQPage|HowTo)"/); assert.doesNotMatch(page, /noindex/);
  for (const h2 of ['教甄成績怎麼算', '各縣市與各科別的配分不一樣', '初試不算進總成績', 'T 分數', '工具沒有處理的規則', '四捨五入', '目標分', 'Excel', '常見錯誤']) assert.ok(flat.includes(h2), h2);
  // every county rule is delegated to the notice of the year, and quoted wording comes from the notices
  assert.ok(flat.includes('一律以你報考那一年的簡章為準')); assert.ok(flat.includes('以當年度簡章為準'));
  for (const quote of ['並以四捨五入法取至小數點後 2 位數', '成績以原始分數加2%計算', '初試成績僅作為初試通過門檻，不併入複試成績', '教學演示 60%（兩場教學演示各 30%）、口試 40%', '成績以原始分數轉換成常態化標準分數（T 分數）計算', '試教佔總分 60%、口試佔總分 40%']) assert.ok(flat.includes(quote), quote);
  assert.match(flat, /<th scope="row">教育部受託辦理 115 學年度公立高級中等學校教師甄選簡章（國文科，附件 B）<\/th><td>初試筆試 40%；複試口試 30%、試教 30%<\/td>/);
  assert.match(flat, /=SUMPRODUCT\(B2:B4,C2:C4\)\/SUM\(C2:C4\)/); assert.match(flat, /=ROUND\(SUMPRODUCT\(B2:B4,C2:C4\)\/SUM\(C2:C4\),2\)/);
  for (const href of ['/tools/t-score-calculator/', '/tools/weighted-average-calculator/']) assert.ok(page.includes(`href="${href}"`), href);
  for (const host of ['tecs.otecs.ntnu.edu.tw', 'primary.tp.edu.tw', 'www-ws.gov.taipei', 'pedia.cloud.edu.tw', 'itl.nist.gov', 'support.microsoft.com']) assert.ok(page.includes(host), host);
  assert.ok(flat.includes('查核日期 2026-10-17'));
  // the old generated review block mentioned image tools; it must be gone
  assert.doesNotMatch(flat, /圖片檔案|4000 萬像素|旋轉 90 度/);
  const widgetSource = readFileSync(new URL('../src/components/tools/EducationStatisticsCalculator.astro', import.meta.url), 'utf8');
  assert.ok(widgetSource.includes('roundHalfUp(total, 2).toFixed(2)'));
  const en = html('/en/tools/teacher-exam-score-converter/');
  assert.match(en, /"dateModified":"2026-10-17"/);
});
