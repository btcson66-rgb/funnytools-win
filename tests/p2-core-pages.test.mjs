import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  normalCdf, tScoreFrom, rawScoreForT, describeData,
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
