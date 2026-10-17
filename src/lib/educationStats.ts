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

// ---------------------------------------------------------------------------
// Class rank -> percentile helpers (class-rank-percentile-calculator)
// ---------------------------------------------------------------------------

export interface RankPercentileResult {
  /** Percentile rank by the midpoint method, PR = 100 * (below + 0.5 * tied) / N. */
  pr: number;
  /** 100 * rank / N: the "top x%" figure. */
  topPercent: number;
  /** People ranked strictly better than the tied group. */
  ahead: number;
  /** People ranked strictly worse than the tied group. */
  behind: number;
}

/**
 * `rank` is the shared (competition) rank, e.g. three people tied for 6th all have rank 6 and the next
 * person is 9th. `tied` is how many people share that rank (1 = no tie). Null when the counts are invalid.
 */
export function rankPercentile(rank: number, total: number, tied = 1): RankPercentileResult | null {
  if (![rank, total, tied].every(Number.isInteger)) return null;
  if (rank < 1 || total < 1 || tied < 1 || rank + tied - 1 > total) return null;
  const behind = total - (rank + tied - 1);
  const pr = percentileRankMidpoint(behind, tied, total);
  if (pr === null) return null;
  return { pr, topPercent: (100 * rank) / total, ahead: rank - 1, behind };
}

/** Largest rank r with 100 * r / N <= topPercent (0 when the percentage is smaller than one rank). Null on invalid input. */
export function maxRankForTopPercent(total: number, topPercent: number): number | null {
  if (!Number.isInteger(total) || total < 1 || !Number.isFinite(topPercent) || topPercent <= 0 || topPercent > 100) return null;
  // toPrecision strips binary noise such as 0.07 * 100 = 7.000000000000001 before flooring.
  return Math.floor(Number(((total * topPercent) / 100).toPrecision(12)));
}

// ---------------------------------------------------------------------------
// Independent-samples t test from summary statistics (independent-samples-t-test-calculator)
// ---------------------------------------------------------------------------

function logGamma(z: number): number {
  const coefficients = [676.5203681218851, -1259.1392167224028, 771.3234287776531, -176.6150291621406, 12.507343278686905, -0.13857109526572012, 9.984369578019572e-6, 1.5056327351493116e-7];
  if (z < 0.5) return Math.log(Math.PI) - Math.log(Math.sin(Math.PI * z)) - logGamma(1 - z);
  const zz = z - 1;
  let x = 0.9999999999998099;
  coefficients.forEach((coefficient, index) => { x += coefficient / (zz + index + 1); });
  const t = zz + coefficients.length - 0.5;
  return 0.5 * Math.log(2 * Math.PI) + (zz + 0.5) * Math.log(t) - t + Math.log(x);
}

function betaFraction(a: number, b: number, x: number): number {
  const maxIterations = 200;
  const epsilon = 3e-12;
  const floor = 1e-30;
  const qab = a + b;
  const qap = a + 1;
  const qam = a - 1;
  let c = 1;
  let d = 1 - (qab * x) / qap;
  if (Math.abs(d) < floor) d = floor;
  d = 1 / d;
  let h = d;
  for (let m = 1; m <= maxIterations; m += 1) {
    const m2 = 2 * m;
    let aa = (m * (b - m) * x) / ((qam + m2) * (a + m2));
    d = 1 + aa * d; if (Math.abs(d) < floor) d = floor;
    c = 1 + aa / c; if (Math.abs(c) < floor) c = floor;
    d = 1 / d; h *= d * c;
    aa = (-(a + m) * (qab + m) * x) / ((a + m2) * (qap + m2));
    d = 1 + aa * d; if (Math.abs(d) < floor) d = floor;
    c = 1 + aa / c; if (Math.abs(c) < floor) c = floor;
    d = 1 / d;
    const delta = d * c;
    h *= delta;
    if (Math.abs(delta - 1) < epsilon) break;
  }
  return h;
}

/** Regularized incomplete beta function I_x(a, b). */
export function regularizedBeta(x: number, a: number, b: number): number {
  if (x <= 0) return 0;
  if (x >= 1) return 1;
  const front = Math.exp(logGamma(a + b) - logGamma(a) - logGamma(b) + a * Math.log(x) + b * Math.log(1 - x));
  return x < (a + 1) / (a + b + 2)
    ? (front * betaFraction(a, b, x)) / a
    : 1 - (front * betaFraction(b, a, 1 - x)) / b;
}

/** Two-tailed p value of Student's t distribution with `df` degrees of freedom (df may be fractional). */
export function tTwoTailedP(t: number, df: number): number {
  if (!Number.isFinite(t) || !Number.isFinite(df) || df <= 0) return Number.NaN;
  return regularizedBeta(df / (df + t * t), df / 2, 0.5);
}

/** Two-tailed critical value: the t >= 0 with P(|T| > t) = alpha. */
export function tCritical(df: number, alpha = 0.05): number {
  let lower = 0;
  let upper = 200;
  for (let iteration = 0; iteration < 100; iteration += 1) {
    const middle = (lower + upper) / 2;
    if (tTwoTailedP(middle, df) > alpha) lower = middle;
    else upper = middle;
  }
  return (lower + upper) / 2;
}

export type TTestMethod = 'welch' | 'student';

export interface TTestInput {
  n1: number; mean1: number; sd1: number;
  n2: number; mean2: number; sd2: number;
}

export interface TTestResult {
  method: TTestMethod;
  difference: number;
  standardError: number;
  t: number;
  df: number;
  /** Two-tailed p value. */
  p: number;
  /** 95% confidence interval of the mean difference (M1 - M2). */
  ciLower: number;
  ciUpper: number;
  pooledSd: number;
  /** Cohen's d with the pooled SD. */
  cohenD: number;
  /** Hedges' g = d * (1 - 3 / (4 * (n1 + n2 - 2) - 1)). */
  hedgesG: number;
}

/**
 * Welch (default) or Student pooled-variance t test from n, mean and SAMPLE standard deviation of each group.
 * Null when n is not an integer above 1, an SD is not above 0, or any input is not finite.
 */
export function independentTTest(input: TTestInput, method: TTestMethod = 'welch'): TTestResult | null {
  const { n1, mean1, sd1, n2, mean2, sd2 } = input;
  if (![n1, mean1, sd1, n2, mean2, sd2].every(Number.isFinite)) return null;
  if (!Number.isInteger(n1) || !Number.isInteger(n2) || n1 <= 1 || n2 <= 1 || sd1 <= 0 || sd2 <= 0) return null;
  const difference = mean1 - mean2;
  const pooledDf = n1 + n2 - 2;
  const pooledSd = Math.sqrt(((n1 - 1) * sd1 ** 2 + (n2 - 1) * sd2 ** 2) / pooledDf);
  let standardError: number;
  let df: number;
  if (method === 'student') {
    standardError = pooledSd * Math.sqrt(1 / n1 + 1 / n2);
    df = pooledDf;
  } else {
    const v1 = sd1 ** 2 / n1;
    const v2 = sd2 ** 2 / n2;
    standardError = Math.sqrt(v1 + v2);
    df = (v1 + v2) ** 2 / (v1 ** 2 / (n1 - 1) + v2 ** 2 / (n2 - 1));
  }
  const t = difference / standardError;
  const p = tTwoTailedP(t, df);
  const critical = tCritical(df, 0.05);
  const cohenD = difference / pooledSd;
  return {
    method, difference, standardError, t, df, p,
    ciLower: difference - critical * standardError,
    ciUpper: difference + critical * standardError,
    pooledSd, cohenD,
    hedgesG: cohenD * (1 - 3 / (4 * pooledDf - 1)),
  };
}

/** APA-style p value text: "p = .022", "p < .001"; no leading zero because p cannot exceed 1. */
export function formatApaP(p: number): string {
  if (!Number.isFinite(p)) return '';
  if (p < 0.001) return 'p < .001';
  if (p >= 0.9995) return 'p > .999';
  return `p = ${p.toFixed(3).replace(/^0/, '')}`;
}
