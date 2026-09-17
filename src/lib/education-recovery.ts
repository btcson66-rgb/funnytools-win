export type WeightMode = 'percent' | 'fraction';

export interface FinalGradeInput {
  target: number;
  earnedWeightedPoints: number;
  remainingWeight: number;
  mode?: WeightMode;
}

export interface FinalGradeResult {
  required: number;
  status: 'ok' | 'already-met' | 'impossible' | 'invalid';
  normalized: boolean;
}

const finite = (...values: number[]) => values.every(Number.isFinite);

export function calculateRequiredFinalGrade(input: FinalGradeInput): FinalGradeResult {
  const mode = input.mode ?? 'percent';
  if (!finite(input.target, input.earnedWeightedPoints, input.remainingWeight)) {
    return { required: Number.NaN, status: 'invalid', normalized: false };
  }
  const divisor = mode === 'fraction' ? 1 : 100;
  const target = mode === 'fraction' ? input.target : input.target / 100;
  const earned = mode === 'fraction' ? input.earnedWeightedPoints : input.earnedWeightedPoints / 100;
  const remaining = mode === 'fraction' ? input.remainingWeight : input.remainingWeight / 100;
  if (remaining <= 0 || target < 0 || target > 1 || earned < 0) {
    return { required: Number.NaN, status: 'invalid', normalized: false };
  }
  const required = (target - earned) / remaining;
  const result = required * divisor;
  const status = required <= 0 ? 'already-met' : required > 1 ? 'impossible' : 'ok';
  return { required: result, status, normalized: false };
}

export function parseNumericRows(raw: string): number[][] {
  return raw.trim().split(/\r?\n/).filter(Boolean).map((line) => line.split(/[\s,;]+/).map(Number));
}

export interface ItemAnalysisResult {
  n: number;
  p: number;
  difficulty: 'easy' | 'moderate' | 'difficult';
  discrimination: number;
  upperCount: number;
  lowerCount: number;
  upperSize: number;
  lowerSize: number;
}

export function classifyItemDifficulty(p: number): ItemAnalysisResult['difficulty'] {
  if (p >= 0.7) return 'easy';
  if (p >= 0.3) return 'moderate';
  return 'difficult';
}

export function analyzeItem(p: number, pHigh: number, pLow: number, n = 0): ItemAnalysisResult {
  const upperSize = Math.max(0, Math.round(n * 0.27));
  const lowerSize = upperSize;
  return {
    n, p, difficulty: classifyItemDifficulty(p), discrimination: pHigh - pLow,
    upperCount: Math.round(pHigh * upperSize), lowerCount: Math.round(pLow * lowerSize),
    upperSize, lowerSize,
  };
}

export function analyzeBulkItems(matrix: number[][]): ItemAnalysisResult[] {
  if (matrix.length < 2 || matrix.some((row) => row.length !== matrix[0].length || row.some((value) => value !== 0 && value !== 1))) return [];
  const n = matrix.length;
  const itemCount = matrix[0].length;
  const order = matrix.map((row, index) => ({ index, score: row.reduce((sum, value) => sum + value, 0) })).sort((a, b) => b.score - a.score);
  const groupSize = Math.max(1, Math.floor(n * 0.27));
  const upper = order.slice(0, groupSize).map(({ index }) => matrix[index]);
  const lower = order.slice(-groupSize).map(({ index }) => matrix[index]);
  return Array.from({ length: itemCount }, (_, item) => {
    const correct = matrix.reduce((sum, row) => sum + row[item], 0);
    const upperCount = upper.reduce((sum, row) => sum + row[item], 0);
    const lowerCount = lower.reduce((sum, row) => sum + row[item], 0);
    const p = correct / n;
    return { n, p, difficulty: classifyItemDifficulty(p), discrimination: (upperCount - lowerCount) / groupSize, upperCount, lowerCount, upperSize: groupSize, lowerSize: groupSize };
  });
}

export interface Kr20Result {
  value: number;
  sumPQ: number;
  respondents: number;
  items: number;
  variance: number;
  status: 'ok' | 'invalid';
}

export function calculateKr20(matrix: number[][]): Kr20Result {
  if (matrix.length < 2 || matrix.some((row) => row.length !== matrix[0].length || row.some((value) => value !== 0 && value !== 1))) {
    return { value: Number.NaN, sumPQ: Number.NaN, respondents: matrix.length, items: 0, variance: Number.NaN, status: 'invalid' };
  }
  const respondents = matrix.length;
  const items = matrix[0].length;
  if (items < 2) return { value: Number.NaN, sumPQ: Number.NaN, respondents, items, variance: Number.NaN, status: 'invalid' };
  const itemP = Array.from({ length: items }, (_, item) => matrix.reduce((sum, row) => sum + row[item], 0) / respondents);
  const totals = matrix.map((row) => row.reduce((sum, value) => sum + value, 0));
  const mean = totals.reduce((sum, value) => sum + value, 0) / respondents;
  const variance = totals.reduce((sum, value) => sum + (value - mean) ** 2, 0) / (respondents - 1);
  const sumPQ = itemP.reduce((sum, p) => sum + p * (1 - p), 0);
  const value = variance === 0 ? Number.NaN : (items / (items - 1)) * (1 - sumPQ / variance);
  return { value, sumPQ, respondents, items, variance, status: Number.isFinite(value) ? 'ok' : 'invalid' };
}
