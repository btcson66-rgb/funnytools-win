export type CalculationError = { status: 'invalid'; message: string };

const invalid = (message: string): CalculationError => ({ status: 'invalid', message });

export function calculateSem(input: { sd: number; reliability: number; z?: number }):
  | (CalculationError)
  | { status: 'ok'; sem: number; halfWidth: number | null } {
  const { sd, reliability, z } = input;
  if (!Number.isFinite(sd) || sd <= 0 || !Number.isFinite(reliability) || reliability < 0 || reliability > 1) {
    return invalid('SD must be positive and reliability must be between 0 and 1.');
  }
  if (z !== undefined && (!Number.isFinite(z) || z <= 0)) return invalid('z must be positive when provided.');
  const sem = sd * Math.sqrt(1 - reliability);
  return { status: 'ok', sem, halfWidth: z === undefined ? null : z * sem };
}

export function calculateSpearmanBrown(input: {
  reliability: number;
  multiplier?: number;
  target?: number;
}): CalculationError | { status: 'forward'; predicted: number } | { status: 'inverse'; requiredMultiplier: number } {
  const { reliability, multiplier, target } = input;
  if (!Number.isFinite(reliability) || reliability <= 0 || reliability >= 1) {
    return invalid('Current reliability must be greater than 0 and less than 1.');
  }
  if (multiplier !== undefined) {
    if (!Number.isFinite(multiplier) || multiplier <= 0) return invalid('The length multiplier must be positive.');
    return { status: 'forward', predicted: (multiplier * reliability) / (1 + (multiplier - 1) * reliability) };
  }
  if (target === undefined || !Number.isFinite(target) || target <= reliability || target >= 1) {
    return invalid('The target reliability must be above current reliability and below 1.');
  }
  return { status: 'inverse', requiredMultiplier: (target * (1 - reliability)) / (reliability * (1 - target)) };
}

export function calculateLearningGain(input: { pre: number; post: number; max: number }):
  | CalculationError
  | { status: 'ok'; raw: number; percent: number | null; normalized: number | null; warning: string } {
  const { pre, post, max } = input;
  if (![pre, post, max].every(Number.isFinite) || max <= 0 || pre < 0 || post < 0 || pre > max || post > max) {
    return invalid('Scores must be within 0 and the maximum score.');
  }
  const raw = post - pre;
  const percent = pre === 0 ? null : raw / pre;
  const normalized = pre === max ? null : raw / (max - pre);
  const warning = post < pre
    ? 'Post-test is lower than pre-test; interpret the negative gain with the assessment context.'
    : pre === max
      ? 'Pre-test equals the maximum, so normalized gain is undefined.'
      : '';
  return { status: 'ok', raw, percent, normalized, warning };
}

export interface WeightedRubricRow {
  score: number;
  max: number;
  weight: number;
}

export function calculateWeightedRubric(rows: WeightedRubricRow[]):
  | CalculationError
  | { status: 'ok'; percentage: number; weightTotal: number; normalized: number[] } {
  if (!rows.length || rows.some((row) =>
    !Number.isFinite(row.score) || !Number.isFinite(row.max) || !Number.isFinite(row.weight)
    || row.max <= 0 || row.weight < 0 || row.score < 0 || row.score > row.max,
  )) return invalid('Each score must be between 0 and its maximum, with a positive maximum and non-negative weight.');
  const weightTotal = rows.reduce((sum, row) => sum + row.weight, 0);
  if (weightTotal <= 0) return invalid('At least one criterion must have a positive weight.');
  const normalized = rows.map((row) => row.score / row.max);
  const percentage = rows.reduce((sum, row, index) => sum + normalized[index] * row.weight, 0) / weightTotal;
  return { status: 'ok', percentage, weightTotal, normalized };
}

export function calculateCohenKappa(input: { a: number; b: number; c: number; d: number }):
  | CalculationError
  | { status: 'ok'; total: number; observed: number; expected: number; kappa: number } {
  const counts = [input.a, input.b, input.c, input.d];
  if (counts.some((value) => !Number.isInteger(value) || value < 0)) return invalid('Counts must be non-negative integers.');
  const [a, b, c, d] = counts;
  const total = a + b + c + d;
  if (total <= 0) return invalid('At least one case is required.');
  const observed = (a + d) / total;
  const expected = (((a + b) * (a + c)) + ((c + d) * (b + d))) / (total * total);
  if (expected >= 1) return invalid('Expected agreement is 1, so kappa is undefined for this table.');
  return { status: 'ok', total, observed, expected, kappa: (observed - expected) / (1 - expected) };
}
