export type WeightMode = 'percent' | 'fraction';

export interface CompletedAssessment {
  name?: string;
  rawScore: number;
  maxScore: number;
  weight: number;
}

export interface FinalGradeInput {
  target: number;
  earnedWeightedPoints?: number;
  remainingWeight: number;
  remainingMaxScore?: number;
  completedRows?: CompletedAssessment[];
  mode?: WeightMode;
}

export interface FinalGradeResult {
  required: number;
  status: 'ok' | 'already-met' | 'impossible' | 'invalid';
  normalized: boolean;
  target: number;
  earnedWeightedPoints: number;
  completedWeight: number;
  remainingWeight: number;
  totalWeight: number;
  warning?: string;
}

const finite = (...values: number[]) => values.every(Number.isFinite);

export function parseRequiredNumber(raw: unknown): number | null {
  if (typeof raw === 'number') return Number.isFinite(raw) ? raw : null;
  if (typeof raw !== 'string' || raw.trim() === '') return null;
  const value = Number(raw.trim());
  return Number.isFinite(value) ? value : null;
}

function invalidFinalGrade(input: Partial<FinalGradeResult> = {}): FinalGradeResult {
  return {
    required: Number.NaN,
    status: 'invalid',
    normalized: false,
    target: Number.NaN,
    earnedWeightedPoints: Number.NaN,
    completedWeight: Number.NaN,
    remainingWeight: Number.NaN,
    totalWeight: Number.NaN,
    ...input,
  };
}

export function calculateRequiredFinalGradeFromRows(input: {
  target: number;
  completedRows: CompletedAssessment[];
  remainingWeight: number;
  remainingMaxScore: number;
}): FinalGradeResult {
  const { target, completedRows, remainingWeight, remainingMaxScore } = input;
  if (!finite(target, remainingWeight, remainingMaxScore) || target < 0 || target > 100 || remainingWeight <= 0 || remainingWeight > 100 || remainingMaxScore <= 0 || completedRows.length === 0) {
    return invalidFinalGrade({ target, remainingWeight });
  }
  if (completedRows.some((row) => !finite(row.rawScore, row.maxScore, row.weight) || row.maxScore <= 0 || row.rawScore < 0 || row.rawScore > row.maxScore || row.weight < 0 || row.weight > 100)) {
    return invalidFinalGrade({ target, remainingWeight });
  }
  const completedWeight = completedRows.reduce((sum, row) => sum + row.weight, 0);
  const totalWeight = completedWeight + remainingWeight;
  if (completedWeight > 100 || totalWeight > 100) {
    return invalidFinalGrade({ target, remainingWeight, completedWeight, totalWeight });
  }
  const earnedWeightedPoints = completedRows.reduce((sum, row) => sum + (row.rawScore / row.maxScore) * row.weight, 0);
  const requiredFraction = (target - earnedWeightedPoints) / remainingWeight;
  const required = requiredFraction * remainingMaxScore;
  const status = requiredFraction <= 0 ? 'already-met' : requiredFraction > 1 ? 'impossible' : 'ok';
  return {
    required,
    status,
    normalized: true,
    target,
    earnedWeightedPoints,
    completedWeight,
    remainingWeight,
    totalWeight,
    ...(totalWeight < 100 ? { warning: '目前輸入的評量權重合計未達 100%，可能還有未列入的評量項目。' } : {}),
  };
}

export function calculateRequiredFinalGrade(input: FinalGradeInput): FinalGradeResult {
  if (!finite(input.target, input.remainingWeight)) return invalidFinalGrade();
  if (input.completedRows) {
    const remainingMaxScore = input.remainingMaxScore;
    if (typeof remainingMaxScore !== 'number' || !Number.isFinite(remainingMaxScore)) return invalidFinalGrade({ target: input.target, remainingWeight: input.remainingWeight });
    return calculateRequiredFinalGradeFromRows({
      target: input.target,
      completedRows: input.completedRows,
      remainingWeight: input.remainingWeight,
      remainingMaxScore,
    });
  }
  const earnedWeightedPoints = input.earnedWeightedPoints;
  if (typeof earnedWeightedPoints !== 'number' || !Number.isFinite(earnedWeightedPoints)) return invalidFinalGrade({ target: input.target, remainingWeight: input.remainingWeight });
  const mode = input.mode ?? 'percent';
  const divisor = mode === 'fraction' ? 1 : 100;
  const target = mode === 'fraction' ? input.target : input.target / 100;
  const earned = mode === 'fraction' ? earnedWeightedPoints : earnedWeightedPoints / 100;
  const remaining = mode === 'fraction' ? input.remainingWeight : input.remainingWeight / 100;
  if (remaining <= 0 || target < 0 || target > 1 || earned < 0) {
    return invalidFinalGrade({ target: input.target, earnedWeightedPoints, remainingWeight: input.remainingWeight });
  }
  const required = (target - earned) / remaining;
  const result = required * divisor;
  const status = required <= 0 ? 'already-met' : required > 1 ? 'impossible' : 'ok';
  return {
    required: result,
    status,
    normalized: false,
    target: input.target,
    earnedWeightedPoints,
    completedWeight: Number.NaN,
    remainingWeight: input.remainingWeight,
    totalWeight: Number.NaN,
  };
}

export function parseNumericRows(raw: string): number[][] {
  if (typeof raw !== 'string' || raw.trim() === '') return [];
  return raw.split(/\r?\n/).map((line) => {
    if (line.trim() === '') return [Number.NaN];
    const cells = /[,;]/.test(line) ? line.split(/[,;]/).map((cell) => cell.trim()) : line.trim().split(/\s+/);
    return cells.map((cell) => cell === '' ? Number.NaN : Number(cell));
  });
}

export interface ItemAnalysisResult {
  n: number;
  p: number;
  pHigh: number;
  pLow: number;
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
    n, p, pHigh, pLow, difficulty: classifyItemDifficulty(p), discrimination: pHigh - pLow,
    upperCount: Math.round(pHigh * upperSize), lowerCount: Math.round(pLow * lowerSize),
    upperSize, lowerSize,
  };
}

export interface ItemAnalysisCountInput {
  totalCorrect: number;
  totalN: number;
  highCorrect: number;
  highN: number;
  lowCorrect: number;
  lowN: number;
}

export function analyzeItemFromCounts(input: ItemAnalysisCountInput): ItemAnalysisResult | null {
  const values = Object.values(input);
  if (!values.every(Number.isFinite) || ![input.totalN, input.highN, input.lowN].every(Number.isInteger) || input.totalN <= 0 || input.highN <= 0 || input.lowN <= 0) return null;
  if (![input.totalCorrect, input.highCorrect, input.lowCorrect].every(Number.isInteger)) return null;
  if (input.totalCorrect < 0 || input.totalCorrect > input.totalN || input.highCorrect < 0 || input.highCorrect > input.highN || input.lowCorrect < 0 || input.lowCorrect > input.lowN) return null;
  const p = input.totalCorrect / input.totalN;
  const pHigh = input.highCorrect / input.highN;
  const pLow = input.lowCorrect / input.lowN;
  return {
    ...analyzeItem(p, pHigh, pLow, input.totalN),
    upperCount: input.highCorrect,
    lowerCount: input.lowCorrect,
    upperSize: input.highN,
    lowerSize: input.lowN,
  };
}

export function analyzeBulkItems(matrix: number[][]): ItemAnalysisResult[] {
  if (matrix.length < 2 || matrix[0]?.length < 2 || matrix.some((row) => row.length !== matrix[0].length || row.some((value) => value !== 0 && value !== 1))) return [];
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
    return { n, p, pHigh: upperCount / groupSize, pLow: lowerCount / groupSize, difficulty: classifyItemDifficulty(p), discrimination: (upperCount - lowerCount) / groupSize, upperCount, lowerCount, upperSize: groupSize, lowerSize: groupSize };
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
  if (matrix.length < 2 || matrix[0]?.length < 2 || matrix.some((row) => row.length !== matrix[0].length || row.some((value) => value !== 0 && value !== 1))) {
    return { value: Number.NaN, sumPQ: Number.NaN, respondents: matrix.length, items: 0, variance: Number.NaN, status: 'invalid' };
  }
  const respondents = matrix.length;
  const items = matrix[0].length;
  const itemP = Array.from({ length: items }, (_, item) => matrix.reduce((sum, row) => sum + row[item], 0) / respondents);
  const totals = matrix.map((row) => row.reduce((sum, value) => sum + value, 0));
  const mean = totals.reduce((sum, value) => sum + value, 0) / respondents;
  const variance = totals.reduce((sum, value) => sum + (value - mean) ** 2, 0) / (respondents - 1);
  const sumPQ = itemP.reduce((sum, p) => sum + p * (1 - p), 0);
  const value = variance === 0 ? Number.NaN : (items / (items - 1)) * (1 - sumPQ / variance);
  return { value, sumPQ, respondents, items, variance, status: Number.isFinite(value) ? 'ok' : 'invalid' };
}
