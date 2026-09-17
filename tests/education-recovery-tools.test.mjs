import test from 'node:test';
import assert from 'node:assert/strict';
import {
  analyzeBulkItems,
  analyzeItem,
  calculateKr20,
  calculateRequiredFinalGrade,
} from '../src/lib/education-recovery.ts';

test('final grade calculation keeps percentage and fraction modes explicit', () => {
  assert.ok(Math.abs(calculateRequiredFinalGrade({ target: 60, earnedWeightedPoints: 42, remainingWeight: 40 }).required - 45) < 1e-9);
  assert.ok(Math.abs(calculateRequiredFinalGrade({ target: 0.6, earnedWeightedPoints: 0.42, remainingWeight: 0.4, mode: 'fraction' }).required - 0.45) < 1e-9);
  assert.equal(calculateRequiredFinalGrade({ target: 60, earnedWeightedPoints: 70, remainingWeight: 30 }).status, 'already-met');
  assert.equal(calculateRequiredFinalGrade({ target: 90, earnedWeightedPoints: 20, remainingWeight: 40 }).status, 'impossible');
});

test('item analysis separates difficulty p from discrimination D', () => {
  const single = analyzeItem(0.65, 0.8, 0.4, 40);
  assert.equal(single.difficulty, 'moderate');
  assert.equal(single.discrimination, 0.4);
  const bulk = analyzeBulkItems([[1, 1], [1, 0], [0, 0], [0, 1]]);
  assert.equal(bulk.length, 2);
  assert.equal(bulk[0].p, 0.5);
  assert.equal(bulk[0].discrimination, 1);
  assert.deepEqual(analyzeBulkItems([[1, 2]]), []);
});

test('KR-20 accepts only a usable binary matrix', () => {
  const result = calculateKr20([[1, 1, 0], [1, 0, 1], [0, 1, 1], [0, 0, 0]]);
  assert.equal(result.status, 'ok');
  assert.equal(result.respondents, 4);
  assert.equal(result.items, 3);
  assert.ok(Number.isFinite(result.sumPQ));
  assert.ok(Number.isFinite(result.value));
  assert.equal(calculateKr20([[1, 2], [0, 1]]).status, 'invalid');
  assert.equal(calculateKr20([[1]]).status, 'invalid');
});
