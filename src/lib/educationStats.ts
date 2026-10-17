/**
 * Pure calculation helpers shared by the education-statistics widgets
 * (T score, percentile rank, standard deviation) and by the verification tests.
 * Keep this file free of DOM access so Node can import it directly.
 */

const SQRT_2PI = Math.sqrt(2 * Math.PI);

/** Standard normal cumulative distribution function, Phi(z). */
export function normalCdf(z: number): number {
  if (!Number.isFinite(z)) return Number.NaN;
  if (z === 0) return 0.5;
  const x = Math.abs(z);
  if (x > 9) return z > 0 ? 1 : 0;
  // Phi(x) = 1/2 + phi(x) * sum_{n>=0} x^(2n+1) / (1*3*5*...*(2n+1))
  let term = x;
  let sum = x;
  for (let n = 1; n < 400; n += 1) {
    term *= (x * x) / (2 * n + 1);
    sum += term;
    if (term < sum * 1e-17) break;
  }
  const upper = 0.5 + (Math.exp(-0.5 * x * x) / SQRT_2PI) * sum;
  return z > 0 ? upper : 1 - upper;
}

export interface TScoreInput {
  /** Raw score X. Ignored when `z` is a finite number. */
  score?: number;
  mean?: number;
  sd?: number;
  /** Already-standardised score. When finite it takes priority over score/mean/sd. */
  z?: number;
}

export interface TScoreResult {
  z: number;
  /** T = 50 + 10z (linear transformation). */
  t: number;
  /** 100 * Phi(z): percentile rank implied ONLY if the distribution is normal. */
  normalPr: number;
}

/** Returns null when the input cannot be converted (missing values or SD <= 0). */
export function tScoreFrom(input: TScoreInput): TScoreResult | null {
  let z: number;
  if (input.z !== undefined && Number.isFinite(input.z)) {
    z = input.z;
  } else {
    const { score, mean, sd } = input;
    if (score === undefined || mean === undefined || sd === undefined) return null;
    if (![score, mean, sd].every(Number.isFinite) || sd <= 0) return null;
    z = (score - mean) / sd;
  }
  return { z, t: 50 + 10 * z, normalPr: 100 * normalCdf(z) };
}

/** Inverse of the linear conversion: raw score needed to reach a target T. */
export function rawScoreForT(targetT: number, mean: number, sd: number): number {
  return mean + (sd * (targetT - 50)) / 10;
}

/** Percentile rank by the midpoint method: PR = 100 * (B + 0.5E) / N. Null if the counts are invalid. */
export function percentileRankMidpoint(below: number, equal: number, total: number): number | null {
  if (![below, equal, total].every(Number.isInteger)) return null;
  if (below < 0 || equal < 1 || total < 1 || below + equal > total) return null;
  return (100 * (below + 0.5 * equal)) / total;
}

/** Count `below` (strictly lower) and `equal` (same score, including the person) for a score within a data set. */
export function countBelowAndEqual(values: number[], score: number): { below: number; equal: number; total: number } {
  let below = 0;
  let equal = 0;
  for (const value of values) {
    if (value < score) below += 1;
    else if (value === score) equal += 1;
  }
  return { below, equal, total: values.length };
}

export function parseNumbers(text: string): number[] {
  return text
    .split(/[\s,]+/)
    .filter((token) => token.trim() !== '')
    .map(Number)
    .filter((n) => Number.isFinite(n));
}

export interface DescribeResult {
  n: number;
  sum: number;
  mean: number;
  median: number;
  modes: number[] | null;
  min: number;
  max: number;
  range: number;
  /** Sum of squared deviations from the mean. */
  sumSquares: number;
  varPopulation: number;
  sdPopulation: number;
  /** NaN when n = 1 (the n-1 denominator would be 0). */
  varSample: number;
  sdSample: number;
}

export function describeData(values: number[]): DescribeResult | null {
  const n = values.length;
  if (n === 0) return null;
  const sum = values.reduce((a, b) => a + b, 0);
  const mean = sum / n;
  const sorted = [...values].sort((a, b) => a - b);
  const median = n % 2 ? sorted[(n - 1) / 2] : (sorted[n / 2 - 1] + sorted[n / 2]) / 2;
  const min = sorted[0];
  const max = sorted[n - 1];
  const sumSquares = values.reduce((a, b) => a + (b - mean) ** 2, 0);
  const varPopulation = sumSquares / n;
  const varSample = n > 1 ? sumSquares / (n - 1) : Number.NaN;

  const counts = new Map<number, number>();
  let best = 0;
  values.forEach((v) => {
    const c = (counts.get(v) || 0) + 1;
    counts.set(v, c);
    if (c > best) best = c;
  });
  const modes = best <= 1
    ? null
    : [...counts.entries()].filter(([, c]) => c === best).map(([v]) => v).sort((a, b) => a - b);

  return {
    n, sum, mean, median, modes, min, max, range: max - min, sumSquares,
    varPopulation, sdPopulation: Math.sqrt(varPopulation),
    varSample, sdSample: Math.sqrt(varSample),
  };
}

/** Raw score that corresponds to a given z: X = M + z * SD. */
export function rawScoreForZ(z: number, mean: number, sd: number): number {
  return mean + z * sd;
}

/** Round half away from zero to `digits` decimals; strips binary noise first (82.35 -> 82.4, not 82.3). */
export function roundHalfUp(value: number, digits = 0): number {
  if (!Number.isFinite(value)) return Number.NaN;
  const factor = 10 ** digits;
  const scaled = Number((Math.abs(value) * factor).toPrecision(12));
  return (Math.sign(value) * Math.round(scaled)) / factor;
}

export interface WeightedMeanResult {
  count: number;
  weightTotal: number;
  /** Sum of value * weight. */
  weightedSum: number;
  /** Weighted mean = weightedSum / weightTotal. */
  mean: number;
  /** Unweighted mean of the same values, for comparison. */
  simpleMean: number;
}

/** Weighted mean of value/weight pairs. Null when empty or any value is not finite or any weight is not a finite number > 0. */
export function weightedMean(items: { value: number; weight: number }[]): WeightedMeanResult | null {
  if (items.length === 0) return null;
  if (items.some(({ value, weight }) => !Number.isFinite(value) || !Number.isFinite(weight) || weight <= 0)) return null;
  const weightTotal = items.reduce((sum, { weight }) => sum + weight, 0);
  const weightedSum = items.reduce((sum, { value, weight }) => sum + value * weight, 0);
  const simpleMean = items.reduce((sum, { value }) => sum + value, 0) / items.length;
  return { count: items.length, weightTotal, weightedSum, mean: weightedSum / weightTotal, simpleMean };
}

export interface GradeSummary {
  count: number;
  sum: number;
  average: number | null;
  /** Uses only rows that have a valid score AND a weight > 0; null when there is none. */
  weighted: number | null;
}

/** Row rules of the grade-average widget: rows without a valid score are ignored. */
export function gradeSummary(rows: { score: number | null; weight: number | null }[]): GradeSummary {
  const valid = rows.filter((row): row is { score: number; weight: number | null } => row.score !== null && Number.isFinite(row.score));
  const count = valid.length;
  const sum = valid.reduce((total, row) => total + row.score, 0);
  const weightedRows = valid.filter((row) => row.weight !== null && Number.isFinite(row.weight) && row.weight > 0);
  const weightTotal = weightedRows.reduce((total, row) => total + (row.weight as number), 0);
  const weighted = weightTotal
    ? weightedRows.reduce((total, row) => total + row.score * (row.weight as number), 0) / weightTotal
    : null;
  return { count, sum, average: count ? sum / count : null, weighted };
}
