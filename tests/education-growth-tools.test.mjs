import assert from 'node:assert/strict';
import test from 'node:test';

import {
  calculateCohenKappa,
  calculateLearningGain,
  calculateSem,
  calculateSpearmanBrown,
  calculateWeightedRubric,
} from '../src/lib/education-growth.ts';

test('SEM uses SD and reliability and distinguishes the optional interval half-width', () => {
  const result = calculateSem({ sd: 10, reliability: 0.84, z: 1.96 });
  assert.equal(result.status, 'ok');
  assert.ok(Math.abs(result.sem - 4) < 1e-12);
  assert.ok(Math.abs(result.halfWidth - 7.84) < 1e-12);
  assert.equal(calculateSem({ sd: 10, reliability: 1 }).status, 'ok');
  assert.equal(calculateSem({ sd: 0, reliability: 0.8 }).status, 'invalid');
});

test('Spearman-Brown supports forward and inverse calculations', () => {
  const forward = calculateSpearmanBrown({ reliability: 0.7, multiplier: 2 });
  assert.equal(forward.status, 'forward');
  assert.ok(Math.abs(forward.predicted - (1.4 / 1.7)) < 1e-12);
  const inverse = calculateSpearmanBrown({ reliability: 0.7, target: 0.8 });
  assert.equal(inverse.status, 'inverse');
  assert.ok(Math.abs(inverse.requiredMultiplier - (0.8 * 0.3) / (0.7 * 0.2)) < 1e-12);
  assert.equal(calculateSpearmanBrown({ reliability: 0.8, target: 0.7 }).status, 'invalid');
});

test('learning gain handles raw, percentage, normalized, and boundary states', () => {
  const result = calculateLearningGain({ pre: 40, post: 70, max: 100 });
  assert.equal(result.status, 'ok');
  assert.equal(result.raw, 30);
  assert.equal(result.percent, 0.75);
  assert.equal(result.normalized, 0.5);
  const zeroPre = calculateLearningGain({ pre: 0, post: 20, max: 100 });
  assert.equal(zeroPre.status, 'ok');
  assert.equal(zeroPre.percent, null);
  assert.equal(calculateLearningGain({ pre: 100, post: 90, max: 100 }).normalized, null);
});

test('weighted rubric normalizes each criterion before applying weights', () => {
  const result = calculateWeightedRubric([
    { score: 4, max: 5, weight: 40 },
    { score: 3, max: 4, weight: 60 },
  ]);
  assert.equal(result.status, 'ok');
  assert.ok(Math.abs(result.percentage - 0.77) < 1e-12);
  assert.equal(result.weightTotal, 100);
  assert.equal(calculateWeightedRubric([{ score: 5, max: 4, weight: 1 }]).status, 'invalid');
});

test('Cohen kappa reports observed and expected agreement from a 2x2 table', () => {
  const result = calculateCohenKappa({ a: 35, b: 5, c: 4, d: 56 });
  assert.equal(result.status, 'ok');
  assert.equal(result.total, 100);
  assert.ok(result.observed > 0.9);
  assert.ok(result.kappa > 0.7);
  assert.equal(calculateCohenKappa({ a: 0, b: 0, c: 0, d: 0 }).status, 'invalid');
});
