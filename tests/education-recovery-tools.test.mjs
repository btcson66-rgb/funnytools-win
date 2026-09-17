import test from 'node:test';
import assert from 'node:assert/strict';
import {
  analyzeBulkItems,
  analyzeItem,
  analyzeItemFromCounts,
  calculateKr20,
  calculateRequiredFinalGrade,
  parseNumericRows,
  parseRequiredNumber,
} from '../src/lib/education-recovery.ts';

test('final grade raw-score rows normalize max scores and expose exact cases', () => {
  const input = {
    target: 80,
    completedRows: [
      { name: 'Homework', rawScore: 85, maxScore: 100, weight: 30 },
      { name: 'Midterm', rawScore: 78, maxScore: 100, weight: 30 },
    ],
    remainingWeight: 40,
    remainingMaxScore: 100,
  };
  const achievable = calculateRequiredFinalGrade(input);
  assert.equal(achievable.status, 'ok');
  assert.ok(Math.abs(achievable.required - 77.75) < 1e-9);
  assert.ok(Math.abs(achievable.earnedWeightedPoints - 48.9) < 1e-9);
  assert.equal(achievable.completedWeight, 60);
  assert.equal(achievable.remainingWeight, 40);

  const impossible = calculateRequiredFinalGrade({ ...input, target: 90 });
  assert.ok(Math.abs(impossible.required - 102.75) < 1e-9);
  assert.equal(impossible.status, 'impossible');
  assert.equal(calculateRequiredFinalGrade({ ...input, target: 40 }).status, 'already-met');
  assert.equal(calculateRequiredFinalGrade({ ...input, completedRows: [{ rawScore: 80, maxScore: 100, weight: 70 }], remainingWeight: 40 }).status, 'invalid');
  assert.equal(calculateRequiredFinalGrade({ ...input, completedRows: [{ rawScore: 45, maxScore: 50, weight: 20 }], target: 80, remainingWeight: 80 }).required, 77.5);
});

test('advanced final grade mode remains explicit and blank values are invalid', () => {
  assert.ok(Math.abs(calculateRequiredFinalGrade({ target: 60, earnedWeightedPoints: 42, remainingWeight: 40 }).required - 45) < 1e-9);
  assert.ok(Math.abs(calculateRequiredFinalGrade({ target: 0.6, earnedWeightedPoints: 0.42, remainingWeight: 0.4, mode: 'fraction' }).required - 0.45) < 1e-9);
  assert.equal(calculateRequiredFinalGrade({ target: 60, earnedWeightedPoints: 70, remainingWeight: 30 }).status, 'already-met');
  assert.equal(parseRequiredNumber(''), null);
  assert.equal(parseRequiredNumber('   '), null);
  assert.equal(calculateRequiredFinalGrade({ target: Number.NaN, earnedWeightedPoints: 42, remainingWeight: 40 }).status, 'invalid');
});

test('item analysis count mode calculates 27 percent inputs and permits negative D', () => {
  const result = analyzeItemFromCounts({ totalCorrect: 26, totalN: 40, highCorrect: 9, highN: 11, lowCorrect: 5, lowN: 11 });
  assert.ok(result);
  assert.equal(result.p, 0.65);
  assert.equal(result.pHigh, 9 / 11);
  assert.equal(result.pLow, 5 / 11);
  assert.ok(Math.abs(result.discrimination - (4 / 11)) < 1e-12);
  assert.equal(result.upperSize, 11);
  assert.equal(result.lowerSize, 11);
  const negative = analyzeItemFromCounts({ totalCorrect: 4, totalN: 10, highCorrect: 2, highN: 5, lowCorrect: 4, lowN: 5 });
  assert.ok(negative);
  assert.equal(negative.discrimination, -0.4);
});

test('item analysis rejects invalid counts and retains proportion mode', () => {
  assert.equal(analyzeItemFromCounts({ totalCorrect: 11, totalN: 10, highCorrect: 1, highN: 2, lowCorrect: 1, lowN: 2 }), null);
  assert.equal(analyzeItemFromCounts({ totalCorrect: 1, totalN: 2, highCorrect: 3, highN: 2, lowCorrect: 1, lowN: 2 }), null);
  assert.equal(analyzeItemFromCounts({ totalCorrect: 1, totalN: 2, highCorrect: 1, highN: 2, lowCorrect: 1, lowN: 0 }), null);
  const proportion = analyzeItem(0.65, 0.8, 0.4, 40);
  assert.equal(proportion.difficulty, 'moderate');
  assert.equal(proportion.discrimination, 0.4);
  assert.equal(analyzeBulkItems([[1, 2]]).length, 0);
  assert.equal(analyzeBulkItems([[1], [0]]).length, 0);
  assert.equal(analyzeBulkItems([[1, 0], [0, Number.NaN]]).length, 0);
});

test('KR-20 matches the exact golden matrix and invalid cases', () => {
  const matrix = [
    [1, 1, 0, 1, 1],
    [1, 0, 1, 1, 0],
    [1, 1, 1, 1, 1],
    [0, 0, 1, 0, 0],
    [0, 1, 0, 0, 1],
    [0, 0, 0, 1, 0],
  ];
  const result = calculateKr20(matrix);
  assert.equal(result.status, 'ok');
  assert.equal(result.respondents, 6);
  assert.equal(result.items, 5);
  assert.ok(Math.abs(result.sumPQ - 1.2222222222222223) < 1e-9);
  assert.ok(Math.abs(result.variance - 2.6666666666666665) < 1e-9);
  assert.ok(Math.abs(result.value - 0.6770833333333333) < 1e-9);
  assert.equal(calculateKr20([[1, 0], [0, 1]]).status, 'invalid');
  assert.equal(calculateKr20([[1, 2], [0, 1]]).status, 'invalid');
  assert.equal(calculateKr20([[1], [0]]).status, 'invalid');
  assert.equal(calculateKr20([]).status, 'invalid');
  assert.equal(calculateKr20(parseNumericRows('1,,0\n1,0,1')).status, 'invalid');
});
