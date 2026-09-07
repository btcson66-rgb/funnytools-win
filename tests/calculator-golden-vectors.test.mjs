/**
 * 黃金向量測試 — funnytools.win 計算機正確性稽核（任務書 §10）
 *
 * ── 方法論（重要）────────────────────────────────────────────────────────
 * 1. 期望值一律「獨立推導」：來自教科書公式、標準定義、可手算的簡單案例，
 *    或本檔內另行實作的、與production演算法不同路徑的參考實作
 *    （例如：t 分配用 Simpson 數值積分，而非 production 的不完全 Beta 連分數；
 *      星期用 Sakamoto 演算法，而非 JS Date；復活節用 Computus 演算法）。
 *    **絕不以「跑一次現有程式碼的輸出」當作期望值。**
 * 2. production 的計算邏輯寫在 .astro 的 inline <script> 內，無法 import。
 *    取用方式：把該段運算式「逐字轉錄」成本檔的純函式，並以
 *    `SOURCE_ANCHORS` 對原始檔做子字串比對，確保轉錄沒有漂移、
 *    且原始碼一旦被改動，錨點測試會立刻紅燈。
 * 3. 已確認的缺陷，測試**維持紅燈**，不得把期望值改成程式現在的輸出。
 *    紅燈項目以 `[RED:Pn]` 標示於測試名稱。
 */

import { readFileSync } from 'node:fs';
import test from 'node:test';
import assert from 'node:assert/strict';

const component = (name) => readFileSync(`src/components/tools/${name}.astro`, 'utf8');

/* ══════════════════════════════════════════════════════════════════════════
   第 0 節：來源錨點 — 保證下方轉錄的運算式仍與 production 一致
   ══════════════════════════════════════════════════════════════════════════ */

const SOURCE_ANCHORS = [
  ['CompoundInterest', 'const monthlyRate = rate === 0 ? 0 : Math.pow(1 + rate / compounds, compounds / 12) - 1;'],
  ['CompoundInterest', 'balance = balance * (1 + monthlyRate) + monthly;'],
  ['CompoundInterest', 'const contributed = principal + monthly * years * 12;'],
  ['MortgagePayment', 'monthlyRate === 0 ? loan / months : loan * monthlyRate / (1 - Math.pow(1 + monthlyRate, -months));'],
  ['MortgagePayment', 'const monthlyRate = annualRate / 12;'],
  ['SavingsGoal', 'return annual === 0 ? 0 : Math.pow(1 + annual, 1 / 12) - 1;'],
  ['SavingsGoal', 'required = (target - current * Math.pow(1 + rate, months)) * rate / (Math.pow(1 + rate, months) - 1);'],
  ['SavingsGoal', 'balance = balance * (1 + rate) + monthly;'],
  ['InflationCalculator', 'const factor = Math.pow(1 + rate, years);'],
  ['InflationCalculator', 'adjusted = amount / factor;'],
  ['NetSalary', 'const deductions = values.gross * totalRate + values.other;'],
  ['NetSalary', 'const income = values.gross + values.allowance;'],
  ['OvertimePay', 'const weekday = values.hourly * values.weekdayHours * values.weekdayMultiplier;'],
  ['PercentageCalculator', "result.textContent = fmt((a / 100) * b);"],
  ['PercentageCalculator', 'const change = ((b - a) / Math.abs(a)) * 100;'],
  ['PercentageCalculator', 'const word = change > 0 ? labels.increase : change < 0 ? labels.decrease : labels.noChange;'],
  ['StandardDeviation', 'const varp = sqDiff / n;'],
  ['StandardDeviation', 'const vars = n > 1 ? sqDiff / (n - 1) : NaN;'],
  ['StandardDeviation', '.split(/[\\s,]+/)'],
  ['EducationStatisticsCalculator', 'format(100 * (below + 0.5 * equal) / total, 2)'],
  ['EducationStatisticsCalculator', 'const z = (score - mean) / sd;'],
  ['EducationStatisticsCalculator', 'format(50 + 10 * z, 2)'],
  ['EducationStatisticsCalculator', 'format(100 * (total - rank + 0.5) / total, 2)'],
  ['EducationStatisticsCalculator', 'format(targetMean + z * targetSd, 3)'],
  ['EducationStatisticsCalculator', 'const alpha = columnCount / (columnCount - 1) * (1 - itemVarianceSum / totalVariance);'],
  ['EducationStatisticsCalculator', 'const v1 = sd1 ** 2 / n1, v2 = sd2 ** 2 / n2;'],
  ['EducationStatisticsCalculator', 'const df = (v1 + v2) ** 2 / (v1 ** 2 / (n1 - 1) + v2 ** 2 / (n2 - 1));'],
  ['EducationStatisticsCalculator', 'const p = regularizedBeta(df / (df + t ** 2), df / 2, 0.5);'],
  ['EducationStatisticsCalculator', 'const hedgesCorrection = 1 - 3 / (4 * pooledDf - 1);'],
  ['GpaCalculator', 'totalPoints += credits * points[grade];'],
  ['GradeAverage', 'const average = count ? sum / count : null;'],
  ['DateDifference', 'const endExclusive = includeEnd ? addDays(end, 1) : end;'],
  ['DateDifference', 'const approxMonths = totalDays / 30.4375;'],
  ['BusinessDays', 'if (!(skipWeekends && isWeekend) && !isHoliday) businessDays += 1;'],
  ['AgeCalculator', 'const heartbeats = daysLived * 1440 * 70;'],
  ['TimestampConverter', "const mode = unit.value === 'auto' ? (Math.abs(value) < 100000000000 ? 'seconds' : 'milliseconds') : unit.value;"],
];

test('GV-000 來源錨點：所有轉錄的運算式仍存在於 production 原始碼', () => {
  const missing = [];
  for (const [file, snippet] of SOURCE_ANCHORS) {
    if (!component(file).includes(snippet)) missing.push(`${file}.astro :: ${snippet}`);
  }
  assert.deepEqual(missing, [], `轉錄與原始碼已漂移，本檔的比對結論失效：\n${missing.join('\n')}`);
});

/* ══════════════════════════════════════════════════════════════════════════
   第 1 節：獨立參考實作（與 production 演算法不同路徑）
   ══════════════════════════════════════════════════════════════════════════ */

/** Sakamoto 演算法：0=星期日。不使用 JS Date。 */
function dowSakamoto(y, m, d) {
  const t = [0, 3, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4];
  const yy = m < 3 ? y - 1 : y;
  return (yy + Math.floor(yy / 4) - Math.floor(yy / 100) + Math.floor(yy / 400) + t[m - 1] + d) % 7;
}

/** Howard Hinnant days_from_civil：西元曆日期 → 自 1970-01-01 起的天數。不使用 JS Date。 */
function daysFromCivil(y0, m, d) {
  const y = y0 - (m <= 2 ? 1 : 0);
  const era = Math.floor(y / 400);
  const yoe = y - era * 400;
  const doy = Math.floor((153 * (m + (m > 2 ? -3 : 9)) + 2) / 5) + d - 1;
  const doe = yoe * 365 + Math.floor(yoe / 4) - Math.floor(yoe / 100) + doy;
  return era * 146097 + doe - 719468;
}

/** Howard Hinnant civil_from_days：反向轉換。不使用 JS Date。 */
function civilFromDays(z0) {
  const z = z0 + 719468;
  const era = Math.floor(z / 146097);
  const doe = z - era * 146097;
  const yoe = Math.floor((doe - Math.floor(doe / 1460) + Math.floor(doe / 36524) - Math.floor(doe / 146096)) / 365);
  const y = yoe + era * 400;
  const doy = doe - (365 * yoe + Math.floor(yoe / 4) - Math.floor(yoe / 100));
  const mp = Math.floor((5 * doy + 2) / 153);
  const d = doy - Math.floor((153 * mp + 2) / 5) + 1;
  const m = mp + (mp < 10 ? 3 : -9);
  return [y + (m <= 2 ? 1 : 0), m, d];
}

/** Meeus/Jones/Butcher Computus：格里曆復活節日期（權威演算法）。 */
function easterGregorian(year) {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return [year, month, day];
}

/** Numerical Recipes gammln（與 production 的 Lanczos g=7 係數組不同）。 */
function lnGammaNR(x) {
  const cof = [76.18009172947146, -86.50532032941677, 24.01409824083091,
    -1.231739572450155, 0.1208650973866179e-2, -0.5395239384953e-5];
  let y = x;
  let tmp = x + 5.5;
  tmp -= (x + 0.5) * Math.log(tmp);
  let ser = 1.000000000190015;
  for (let j = 0; j < 6; j += 1) { y += 1; ser += cof[j] / y; }
  return -tmp + Math.log(2.5066282746310005 * ser / x);
}

/** Student t 機率密度。 */
function tPdf(t, df) {
  return Math.exp(lnGammaNR((df + 1) / 2) - lnGammaNR(df / 2))
    / Math.sqrt(df * Math.PI) * Math.pow(1 + (t * t) / df, -(df + 1) / 2);
}

/**
 * 雙尾 p：以 Simpson 複合法對 t 密度在 [-|t|, |t|] 數值積分後取補數。
 * 與 production 的「不完全 Beta 連分數」完全不同路徑。
 * 校準：本函式反解出的 df=18 臨界值為 2.10092…，與標準 t 分配表的
 * t(.975, 18) = 2.101 相符；df=10 為 2.22814，表值 2.228 相符。
 */
function tTwoTailedP(t, df, panels = 20000) {
  const a = Math.abs(t);
  if (a === 0) return 1;
  const n = panels % 2 === 0 ? panels : panels + 1;
  const h = (2 * a) / n;
  let s = tPdf(-a, df) + tPdf(a, df);
  for (let i = 1; i < n; i += 1) s += (i % 2 ? 4 : 2) * tPdf(-a + i * h, df);
  return 1 - (s * h) / 3;
}

/** 由上面的獨立 p 反解雙尾 .05 臨界 t。 */
function tCriticalTwoTailed05(df) {
  let lo = 0;
  let hi = 20;
  for (let i = 0; i < 80; i += 1) {
    const mid = (lo + hi) / 2;
    if (tTwoTailedP(mid, df) > 0.05) lo = mid; else hi = mid;
  }
  return (lo + hi) / 2;
}

function close(actual, expected, tol, message) {
  const diff = Math.abs(actual - expected);
  const scale = Math.max(1, Math.abs(expected));
  assert.ok(diff / scale <= tol,
    `${message}\n  期望 ${expected}\n  實際 ${actual}\n  相對誤差 ${diff / scale}（容忍 ${tol}）`);
}

/* ══════════════════════════════════════════════════════════════════════════
   第 2 節：自 .astro inline script 逐字轉錄的 production 邏輯
   ══════════════════════════════════════════════════════════════════════════ */

const ERR = Symbol('invalidInput');

/* ── CompoundInterest.astro ─────────────────────────────────────────────── */
function compoundInterest({ principal, monthly, rate, years, compounds }) {
  if (
    [principal, monthly, rate, years, compounds].some((value) => !Number.isFinite(value))
    || principal < 0 || monthly < 0 || rate < 0 || rate > 1
    || !Number.isInteger(years) || years < 1 || years > 100
    || ![1, 4, 12, 365].includes(compounds)
  ) return ERR;
  const monthlyRate = rate === 0 ? 0 : Math.pow(1 + rate / compounds, compounds / 12) - 1;
  let balance = principal;
  const yearly = [];
  for (let month = 1; month <= years * 12; month += 1) {
    balance = balance * (1 + monthlyRate) + monthly;
    if (month % 12 === 0) yearly.push({ year: month / 12, balance });
  }
  const contributed = principal + monthly * years * 12;
  return { balance, contributed, interest: balance - contributed, yearly, monthlyRate };
}
/** money()：Intl 顯示前先 Math.round，等同顯示整數。 */
const money0 = (value) => Math.round(value);

/* ── MortgagePayment.astro ─────────────────────────────────────────────── */
function mortgage({ loan, annualRate, years }) {
  if (
    ![loan, annualRate, years].every(Number.isFinite)
    || loan <= 0 || annualRate < 0 || annualRate > 1
    || !Number.isInteger(years) || years < 1 || years > 100
  ) return ERR;
  const months = years * 12;
  const monthlyRate = annualRate / 12;
  const monthlyPayment = monthlyRate === 0
    ? loan / months
    : loan * monthlyRate / (1 - Math.pow(1 + monthlyRate, -months));
  const total = monthlyPayment * months;
  return { monthlyPayment, total, interest: total - loan, months, monthlyRate };
}

/* ── SavingsGoal.astro ─────────────────────────────────────────────────── */
const savingsMonthlyRate = (annualPercent) => {
  const annual = annualPercent / 100;
  return annual === 0 ? 0 : Math.pow(1 + annual, 1 / 12) - 1;
};
function savingsTimeMode({ target, current, annualRate, monthly }) {
  const rate = savingsMonthlyRate(annualRate);
  if (target <= 0 || current < 0 || annualRate < 0 || annualRate > 100) return ERR;
  if (current >= target) return { reached: true };
  if (!Number.isFinite(monthly) || monthly < 0) return ERR;
  let balance = current;
  let month = 0;
  while (balance < target && month < 1200) {
    balance = balance * (1 + rate) + monthly;
    month += 1;
    if (monthly === 0 && rate === 0) break;
  }
  return balance < target ? { impossible: true } : { months: month, balance };
}
function savingsMonthlyMode({ target, current, annualRate, months }) {
  const rate = savingsMonthlyRate(annualRate);
  if (target <= 0 || current < 0 || annualRate < 0 || annualRate > 100) return ERR;
  if (current >= target) return { reached: true };
  if (!Number.isInteger(months) || months < 1 || months > 1200) return ERR;
  let required;
  if (rate === 0) required = (target - current) / months;
  else required = (target - current * Math.pow(1 + rate, months)) * rate / (Math.pow(1 + rate, months) - 1);
  required = Math.max(0, required);
  return { required };
}

/* ── InflationCalculator.astro ─────────────────────────────────────────── */
function inflation({ amount, ratePercent, years, mode }) {
  const rate = ratePercent / 100;
  if (
    ![amount, ratePercent, years].every(Number.isFinite)
    || amount < 0 || ratePercent < -99.99 || ratePercent > 1000
    || !Number.isInteger(years) || years < 0 || years > 200
  ) return ERR;
  const factor = Math.pow(1 + rate, years);
  if (!Number.isFinite(factor) || factor <= 0) return ERR;
  const adjusted = mode === 'futureBuyingPower' ? amount / factor : amount * factor;
  return { adjusted, change: adjusted - amount, factor };
}

/* ── NetSalary.astro ───────────────────────────────────────────────────── */
function netSalary({ gross, allowance, other, laborRate, healthRate, pensionRate, taxRate }) {
  const values = { gross, allowance, other, laborRate, healthRate, pensionRate, taxRate };
  const rateKeys = ['laborRate', 'healthRate', 'pensionRate', 'taxRate'];
  const invalid = Object.values(values).some((value) => !Number.isFinite(value) || value < 0)
    || rateKeys.some((key) => values[key] > 100);
  if (invalid) return ERR;
  const totalRate = (values.laborRate + values.healthRate + values.pensionRate + values.taxRate) / 100;
  const income = values.gross + values.allowance;
  const deductions = values.gross * totalRate + values.other;
  return { income, deductions, net: income - deductions };
}

/* ── OvertimePay.astro ─────────────────────────────────────────────────── */
function overtimePay(v) {
  const multiplierKeys = ['weekdayMultiplier', 'extendedMultiplier', 'restMultiplier', 'holidayMultiplier'];
  const invalid = Object.values(v).some((value) => !Number.isFinite(value) || value < 0)
    || multiplierKeys.some((key) => v[key] > 10);
  if (invalid) return ERR;
  const weekday = v.hourly * v.weekdayHours * v.weekdayMultiplier;
  const extended = v.hourly * v.extendedHours * v.extendedMultiplier;
  const rest = v.hourly * v.restHours * v.restMultiplier;
  const holiday = v.hourly * v.holidayHours * v.holidayMultiplier;
  return { weekday, extended, rest, holiday, total: weekday + extended + rest + holiday };
}

/* ── PercentageCalculator.astro ────────────────────────────────────────── */
const pctFmt = (n) => Number(n.toFixed(4)).toString();
function percentage(mode, a, b) {
  if (!Number.isFinite(a) || !Number.isFinite(b)) return { text: 'invalid' };
  if (mode === 'of') return { text: pctFmt((a / 100) * b), value: (a / 100) * b };
  if (mode === 'ratio') {
    if (b === 0) return { text: 'divideZero' };
    return { text: `${pctFmt((a / b) * 100)}%`, value: (a / b) * 100 };
  }
  if (a === 0) return { text: 'divideZero' };
  const change = ((b - a) / Math.abs(a)) * 100;
  const word = change > 0 ? 'increase' : change < 0 ? 'decrease' : 'noChange';
  return { text: `${pctFmt(Math.abs(change))}% ${word}`, value: change, word };
}

/* ── StandardDeviation.astro ───────────────────────────────────────────── */
const sdFmt = (n) => (!Number.isFinite(n) ? '--' : Number(n.toFixed(4)).toString());
function parseNumbersSd(text) {
  return text.split(/[\s,]+/).filter((token) => token.trim() !== '').map(Number).filter((n) => Number.isFinite(n));
}
function stdev(text) {
  const values = parseNumbersSd(text);
  const n = values.length;
  if (n === 0) return { n: 0 };
  const sum = values.reduce((a, b) => a + b, 0);
  const mean = sum / n;
  const sorted = [...values].sort((a, b) => a - b);
  const median = n % 2 ? sorted[(n - 1) / 2] : (sorted[n / 2 - 1] + sorted[n / 2]) / 2;
  const sqDiff = values.reduce((a, b) => a + (b - mean) ** 2, 0);
  const varp = sqDiff / n;
  const vars = n > 1 ? sqDiff / (n - 1) : NaN;
  const counts = new Map();
  let best = 0;
  values.forEach((v) => { const c = (counts.get(v) || 0) + 1; counts.set(v, c); if (c > best) best = c; });
  const modes = best <= 1 ? null
    : [...counts.entries()].filter(([, c]) => c === best).map(([v]) => v).sort((a, b) => a - b);
  return {
    values, n, sum, mean, median, min: sorted[0], max: sorted[n - 1], range: sorted[n - 1] - sorted[0],
    varp, sdp: Math.sqrt(varp), vars, sds: Math.sqrt(vars), modes,
  };
}

/* ── EducationStatisticsCalculator.astro ───────────────────────────────── */
const eduFormat = (value, digits = 3) => Number(value).toFixed(digits).replace(/\.0+$|(?<=\.\d*[1-9])0+$/g, '');

function percentileRank({ below, equal, total }) {
  if (![below, equal, total].every(Number.isFinite) || ![below, equal, total].every(Number.isInteger)
    || below < 0 || equal < 1 || total < 1 || below + equal > total) return ERR;
  return {
    pr: 100 * (below + 0.5 * equal) / total,
    belowPercent: 100 * below / total,
    tiedPercent: 100 * equal / total,
    abovePercent: 100 * (total - below - equal) / total,
  };
}
function zScore({ score, mean, sd }) {
  if (![score, mean, sd].every(Number.isFinite) || sd <= 0) return ERR;
  return { z: (score - mean) / sd };
}
function tScore(z) {
  if (!Number.isFinite(z)) return ERR;
  return { t: 50 + 10 * z };
}
function classRankPercentile({ rank, total }) {
  if (![rank, total].every(Number.isFinite) || !Number.isInteger(rank) || !Number.isInteger(total)
    || rank < 1 || total < 1 || rank > total) return ERR;
  return {
    pr: 100 * (total - rank + 0.5) / total,
    top: 100 * rank / total,
    peopleAhead: rank - 1,
    peopleBehind: total - rank,
  };
}
function normalizedScore({ score, mean, sd, targetMean, targetSd }) {
  if (![score, mean, sd, targetMean, targetSd].every(Number.isFinite) || sd <= 0 || targetSd <= 0) return ERR;
  const z = (score - mean) / sd;
  return { z, converted: targetMean + z * targetSd, scaleFactor: targetSd / sd };
}
function weightedAverage(rows) {
  if (rows.some((r) => !Number.isFinite(r.value) || !Number.isFinite(r.weight) || r.weight <= 0)) return ERR;
  if (!rows.length) return ERR;
  const weightTotal = rows.reduce((sum, row) => sum + row.weight, 0);
  const weightedSum = rows.reduce((sum, row) => sum + row.value * row.weight, 0);
  return { weightTotal, weightedSum, result: weightedSum / weightTotal };
}
function teacherExam(rows) {
  if (rows.some(({ score, weight }) => ![score, weight].every(Number.isFinite) || weight < 0)
    || !rows.some(({ weight }) => weight > 0)) return ERR;
  const weightTotal = rows.reduce((sum, row) => sum + row.weight, 0);
  return {
    weightTotal,
    total: rows.reduce((sum, row) => sum + row.score * row.weight, 0) / weightTotal,
    warn: Math.abs(weightTotal - 100) > 0.0001,
  };
}
function cronbachParseRow(line) {
  const trimmed = line.trim();
  if (trimmed.includes(';')) return trimmed.split(';').map((cell) => Number(cell.trim().replace(',', '.')));
  if (trimmed.includes('\t')) return trimmed.split('\t').map((cell) => Number(cell.trim().replace(',', '.')));
  if (/\s/.test(trimmed)) return trimmed.split(/\s+/).map((cell) => Number(cell.replace(',', '.')));
  return trimmed.split(',').map((cell) => Number(cell.trim()));
}
function cronbachAlpha(raw) {
  const matrix = raw.trim().split(/\r?\n/).filter((line) => line.trim()).map(cronbachParseRow);
  const columnCount = matrix[0]?.length || 0;
  if (matrix.length < 2 || columnCount < 2
    || matrix.some((row) => row.length !== columnCount || row.some((value) => !Number.isFinite(value)))) return ERR;
  const variance = (values) => {
    const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
    return values.reduce((sum, value) => sum + (value - mean) ** 2, 0) / (values.length - 1);
  };
  const itemVarianceSum = Array.from({ length: columnCount },
    (_, column) => variance(matrix.map((row) => row[column]))).reduce((a, b) => a + b, 0);
  const totals = matrix.map((row) => row.reduce((a, b) => a + b, 0));
  const totalVariance = variance(totals);
  if (!(totalVariance > 0)) return ERR;
  return {
    alpha: columnCount / (columnCount - 1) * (1 - itemVarianceSum / totalVariance),
    respondents: matrix.length, items: columnCount, itemVarianceSum, totalVariance, matrix,
  };
}
// Lanczos + 不完全 Beta 連分數（production 版本，逐字轉錄）
function logGamma(z0) {
  let z = z0;
  const coefficients = [676.5203681218851, -1259.1392167224028, 771.3234287776531, -176.6150291621406,
    12.507343278686905, -0.13857109526572012, 9.984369578019572e-6, 1.5056327351493116e-7];
  if (z < 0.5) return Math.log(Math.PI) - Math.log(Math.sin(Math.PI * z)) - logGamma(1 - z);
  z -= 1;
  let x = 0.9999999999998099;
  coefficients.forEach((coefficient, index) => { x += coefficient / (z + index + 1); });
  const t = z + coefficients.length - 0.5;
  return 0.5 * Math.log(2 * Math.PI) + (z + 0.5) * Math.log(t) - t + Math.log(x);
}
function betaFraction(a, b, x) {
  const maxIterations = 200;
  const epsilon = 3e-12;
  const floor = 1e-30;
  const qab = a + b;
  const qap = a + 1;
  const qam = a - 1;
  let c = 1;
  let d = 1 - qab * x / qap;
  if (Math.abs(d) < floor) d = floor;
  d = 1 / d;
  let h = d;
  for (let m = 1; m <= maxIterations; m += 1) {
    const m2 = 2 * m;
    let aa = m * (b - m) * x / ((qam + m2) * (a + m2));
    d = 1 + aa * d; if (Math.abs(d) < floor) d = floor;
    c = 1 + aa / c; if (Math.abs(c) < floor) c = floor;
    d = 1 / d; h *= d * c;
    aa = -(a + m) * (qab + m) * x / ((a + m2) * (qap + m2));
    d = 1 + aa * d; if (Math.abs(d) < floor) d = floor;
    c = 1 + aa / c; if (Math.abs(c) < floor) c = floor;
    d = 1 / d;
    const delta = d * c;
    h *= delta;
    if (Math.abs(delta - 1) < epsilon) break;
  }
  return h;
}
function regularizedBeta(x, a, b) {
  if (x <= 0) return 0;
  if (x >= 1) return 1;
  const front = Math.exp(logGamma(a + b) - logGamma(a) - logGamma(b) + a * Math.log(x) + b * Math.log(1 - x));
  return x < (a + 1) / (a + b + 2)
    ? front * betaFraction(a, b, x) / a
    : 1 - front * betaFraction(b, a, 1 - x) / b;
}
function welchTTest({ n1, n2, mean1, mean2, sd1, sd2 }) {
  if (![n1, n2, mean1, mean2, sd1, sd2].every(Number.isFinite) || !Number.isInteger(n1) || !Number.isInteger(n2)
    || n1 <= 1 || n2 <= 1 || sd1 <= 0 || sd2 <= 0) return ERR;
  const v1 = sd1 ** 2 / n1;
  const v2 = sd2 ** 2 / n2;
  const difference = mean1 - mean2;
  const standardError = Math.sqrt(v1 + v2);
  const t = difference / standardError;
  const df = (v1 + v2) ** 2 / (v1 ** 2 / (n1 - 1) + v2 ** 2 / (n2 - 1));
  const p = regularizedBeta(df / (df + t ** 2), df / 2, 0.5);
  const criticalT = (() => {
    let lower = 0;
    let upper = 20;
    for (let iteration = 0; iteration < 80; iteration += 1) {
      const middle = (lower + upper) / 2;
      const twoTailedP = regularizedBeta(df / (df + middle ** 2), df / 2, 0.5);
      if (twoTailedP > 0.05) lower = middle; else upper = middle;
    }
    return (lower + upper) / 2;
  })();
  const pooledDf = n1 + n2 - 2;
  const pooledSd = Math.sqrt(((n1 - 1) * sd1 ** 2 + (n2 - 1) * sd2 ** 2) / pooledDf);
  const hedgesCorrection = 1 - 3 / (4 * pooledDf - 1);
  const hedgesG = pooledSd > 0 ? difference / pooledSd * hedgesCorrection : Number.NaN;
  return {
    difference, standardError, t, df, p, criticalT, pooledSd, hedgesG,
    ciLow: difference - criticalT * standardError, ciHigh: difference + criticalT * standardError,
  };
}

/* ── GpaCalculator.astro ───────────────────────────────────────────────── */
const GRADE_POINTS_43 = { 'A+': 4.3, A: 4.0, 'A-': 3.7, 'B+': 3.3, B: 3.0, 'B-': 2.7, 'C+': 2.3, C: 2.0, 'C-': 1.7, D: 1.0, F: 0 };
const GRADE_POINTS_40 = { ...GRADE_POINTS_43, 'A+': 4.0 };
function gpa(rows, scale = '4.3') {
  const points = scale === '4.0' ? GRADE_POINTS_40 : GRADE_POINTS_43;
  let totalCredits = 0;
  let totalPoints = 0;
  rows.forEach(({ credits, grade }) => {
    if (!Number.isFinite(credits) || credits <= 0 || !(grade in points)) return;
    totalCredits += credits;
    totalPoints += credits * points[grade];
  });
  return { totalCredits, totalPoints, gpa: totalCredits > 0 ? totalPoints / totalCredits : null };
}

/* ── GradeAverage.astro ────────────────────────────────────────────────── */
function gradeAverage(rows) {
  const valid = rows.filter((row) => row.score !== null && row.score !== undefined);
  const count = valid.length;
  const sum = valid.reduce((total, row) => total + row.score, 0);
  const weightedRows = valid.filter((row) => row.weight !== null && row.weight !== undefined && row.weight > 0);
  const weightTotal = weightedRows.reduce((total, row) => total + row.weight, 0);
  return {
    count,
    sum,
    average: count ? sum / count : null,
    weighted: weightTotal ? weightedRows.reduce((t, r) => t + r.score * r.weight, 0) / weightTotal : null,
  };
}

/* ── 共用日期工具（DateDifference / AgeCalculator / BusinessDays 三檔一致）─ */
const DAY_MS = 86400000;
function utcDate(year, monthIndex, day) {
  const date = new Date(0);
  date.setUTCHours(0, 0, 0, 0);
  date.setUTCFullYear(year, monthIndex, day);
  return date;
}
function dateOnly(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value || '');
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = utcDate(year, month - 1, day);
  if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) return null;
  return date;
}
const dateString = (date) => date.toISOString().slice(0, 10);
function addDays(date, days) {
  const copy = new Date(date);
  copy.setUTCDate(copy.getUTCDate() + days);
  return copy;
}
function addMonths(date, months) {
  const targetIndex = date.getUTCFullYear() * 12 + date.getUTCMonth() + months;
  const targetYear = Math.floor(targetIndex / 12);
  const targetMonth = ((targetIndex % 12) + 12) % 12;
  const lastDay = utcDate(targetYear, targetMonth + 1, 0).getUTCDate();
  return utcDate(targetYear, targetMonth, Math.min(date.getUTCDate(), lastDay));
}
const dayDifference = (start, end) => Math.round((end.getTime() - start.getTime()) / DAY_MS);

/* ── DateDifference.astro ──────────────────────────────────────────────── */
function calendarBreakdown(start, endExclusive) {
  let totalMonths = Math.max(0, (endExclusive.getUTCFullYear() - start.getUTCFullYear()) * 12
    + endExclusive.getUTCMonth() - start.getUTCMonth());
  while (totalMonths > 0 && addMonths(start, totalMonths) > endExclusive) totalMonths -= 1;
  while (addMonths(start, totalMonths + 1) <= endExclusive) totalMonths += 1;
  const cursor = addMonths(start, totalMonths);
  return { years: Math.floor(totalMonths / 12), months: totalMonths % 12, days: dayDifference(cursor, endExclusive) };
}
function weekdayWeekendCounts(start, totalDays) {
  let weekdays = 0;
  let weekends = 0;
  for (let index = 0; index < totalDays; index += 1) {
    const day = addDays(start, index).getUTCDay();
    if (day === 0 || day === 6) weekends += 1; else weekdays += 1;
  }
  return { weekdays, weekends };
}
function dateDifference(startText, endText, includeEnd) {
  const rawStart = dateOnly(startText);
  const rawEnd = dateOnly(endText);
  if (!rawStart || !rawEnd) return ERR;
  let start = rawStart;
  let end = rawEnd;
  if (start > end) [start, end] = [end, start];
  const endExclusive = includeEnd ? addDays(end, 1) : end;
  const totalDays = Math.max(0, dayDifference(start, endExclusive));
  return {
    totalDays,
    wholeWeeks: Math.floor(totalDays / 7),
    remainingDays: totalDays % 7,
    approxMonths: totalDays / 30.4375,
    breakdown: calendarBreakdown(start, endExclusive),
    ...weekdayWeekendCounts(start, totalDays),
  };
}

/* ── BusinessDays.astro ────────────────────────────────────────────────── */
const HOLIDAY_PRESETS = {
  fr2026: ['2026-01-01', '2026-04-06', '2026-05-01', '2026-05-08', '2026-05-14', '2026-05-25',
    '2026-07-14', '2026-08-15', '2026-11-01', '2026-11-11', '2026-12-25'],
  tw2026: ['2026-01-01', '2026-02-16', '2026-02-17', '2026-02-18', '2026-02-19', '2026-02-20',
    '2026-02-27', '2026-04-03', '2026-04-06', '2026-05-01', '2026-06-19', '2026-09-25',
    '2026-09-28', '2026-10-09', '2026-10-26', '2026-12-25'],
};
function businessDays(startText, endText, { includeEnd = true, skipWeekends = true, holidays = [] } = {}) {
  const rawStart = dateOnly(startText);
  const rawEnd = dateOnly(endText);
  if (!rawStart || !rawEnd) return ERR;
  let start = rawStart;
  let end = rawEnd;
  if (start > end) [start, end] = [end, start];
  const endExclusive = includeEnd ? addDays(end, 1) : end;
  const totalDays = Math.max(0, Math.round((endExclusive.getTime() - start.getTime()) / DAY_MS));
  const set = new Set(holidays.filter((line) => dateOnly(line)));
  let weekendDays = 0;
  let holidayDays = 0;
  let business = 0;
  for (let index = 0; index < totalDays; index += 1) {
    const current = addDays(start, index);
    const isWeekend = current.getUTCDay() === 0 || current.getUTCDay() === 6;
    const isHoliday = set.has(dateString(current));
    if (isWeekend) weekendDays += 1;
    if (isHoliday && !(skipWeekends && isWeekend)) holidayDays += 1;
    if (!(skipWeekends && isWeekend) && !isHoliday) business += 1;
  }
  return { businessDays: business, totalDays, weekendDays, holidayDays };
}

/* ── AgeCalculator.astro ───────────────────────────────────────────────── */
function calendarAge(birthday, asOf) {
  let totalMonths = Math.max(0, (asOf.getUTCFullYear() - birthday.getUTCFullYear()) * 12
    + asOf.getUTCMonth() - birthday.getUTCMonth());
  while (totalMonths > 0 && addMonths(birthday, totalMonths) > asOf) totalMonths -= 1;
  while (addMonths(birthday, totalMonths + 1) <= asOf) totalMonths += 1;
  const cursor = addMonths(birthday, totalMonths);
  return { years: Math.floor(totalMonths / 12), months: totalMonths % 12, days: dayDifference(cursor, asOf) };
}
function nextBirthdayDays(birthday, asOf) {
  const birthdayInYear = (year) => {
    const lastDay = utcDate(year, birthday.getUTCMonth() + 1, 0).getUTCDate();
    return utcDate(year, birthday.getUTCMonth(), Math.min(birthday.getUTCDate(), lastDay));
  };
  let next = birthdayInYear(asOf.getUTCFullYear());
  if (next < asOf) next = birthdayInYear(asOf.getUTCFullYear() + 1);
  return dayDifference(asOf, next);
}
function ageCalculator(birthdayText, asOfText) {
  const birthday = dateOnly(birthdayText);
  const asOf = dateOnly(asOfText);
  if (!birthday || !asOf || birthday > asOf) return ERR;
  const daysLived = dayDifference(birthday, asOf);
  return {
    age: calendarAge(birthday, asOf),
    daysLived,
    hoursLived: daysLived * 24,
    heartbeats: daysLived * 1440 * 70,
    nextBirthdayDays: nextBirthdayDays(birthday, asOf),
  };
}

/* ── TimestampConverter.astro ──────────────────────────────────────────── */
function timestampConvert(raw, unitMode = 'auto') {
  const value = Number(raw);
  if (raw === '' || !Number.isFinite(value)) return ERR;
  const mode = unitMode === 'auto' ? (Math.abs(value) < 100000000000 ? 'seconds' : 'milliseconds') : unitMode;
  const date = new Date(mode === 'seconds' ? value * 1000 : value);
  if (Number.isNaN(date.getTime())) return ERR;
  const ms = date.getTime();
  return { mode, iso: date.toISOString(), unixSeconds: Math.floor(ms / 1000), unixMilliseconds: ms };
}

/* ══════════════════════════════════════════════════════════════════════════
   第 3 節：黃金向量
   ══════════════════════════════════════════════════════════════════════════ */

/* ── 3.1 複利計算器（金錢決策・最高風險）─────────────────────────────── */

test('GV-101 複利：可手算案例 — P=10000、月投入 0、年化 12%、月複利、1 年', () => {
  // 推導：教科書複利終值 A = P(1 + r/m)^(mt)。m=12、t=1 → A = 10000 × 1.01^12。
  const r = compoundInterest({ principal: 10000, monthly: 0, rate: 0.12, years: 1, compounds: 12 });
  close(r.balance, 10000 * Math.pow(1 + 0.12 / 12, 12), 1e-12, 'GV-101 終值不符閉式解');
  assert.equal(money0(r.balance), 11268, 'GV-101 顯示值應為 11,268');
  assert.equal(r.contributed, 10000);
  close(r.interest, 1268.250301319698, 1e-9, 'GV-101 利息');
});

test('GV-102 複利：年複利（compounds=1）一年後必須恰為本金 ×(1+r)', () => {
  // 推導：名目年利率 12%、每年複利 1 次 → 一年後 = 10000 × 1.12 = 11200（可心算）。
  // 這條同時驗證 (1+r/m)^(m/12) 的「名目→等效月利率」換算沒有把 r 誤除以 12。
  const r = compoundInterest({ principal: 10000, monthly: 0, rate: 0.12, years: 1, compounds: 1 });
  close(r.balance, 11200, 1e-12, 'GV-102 年複利一年終值');
});

test('GV-103 複利：日複利 365 次、5%、1 年 = P × (1+0.05/365)^365', () => {
  const r = compoundInterest({ principal: 1000, monthly: 0, rate: 0.05, years: 1, compounds: 365 });
  close(r.balance, 1000 * Math.pow(1 + 0.05 / 365, 365), 1e-12, 'GV-103 日複利');
  assert.equal(money0(r.balance), 1051);
});

test('GV-104 複利：期末年金閉式解 — P=0、月投 100、12%/月複利、1 年', () => {
  // 推導：期末年金終值 FV = PMT × ((1+i)^n − 1)/i，i=0.01、n=12。
  const r = compoundInterest({ principal: 0, monthly: 100, rate: 0.12, years: 1, compounds: 12 });
  close(r.balance, 100 * ((Math.pow(1.01, 12) - 1) / 0.01), 1e-9, 'GV-104 年金終值閉式解');
  assert.equal(money0(r.balance), 1268);
});

test('GV-105 複利邊界：利率 0% → 終值 = 本金 + 投入總額，利息恰為 0', () => {
  const r = compoundInterest({ principal: 1000, monthly: 100, rate: 0, years: 2, compounds: 12 });
  assert.equal(r.balance, 3400, 'GV-105 0% 終值應為 1000 + 100×24');
  assert.equal(r.contributed, 3400);
  assert.equal(r.interest, 0, 'GV-105 0% 時利息必須恰為 0');
});

test('GV-106 複利邊界：最短年限 1 年 = 12 期，年限 0／小數／101 一律拒絕', () => {
  const one = compoundInterest({ principal: 0, monthly: 100, rate: 0, years: 1, compounds: 12 });
  assert.equal(one.balance, 1200, 'GV-106 1 年應累積 12 次月投入');
  assert.equal(one.yearly.length, 1);
  assert.equal(compoundInterest({ principal: 0, monthly: 100, rate: 0, years: 0, compounds: 12 }), ERR);
  assert.equal(compoundInterest({ principal: 0, monthly: 100, rate: 0, years: 1.5, compounds: 12 }), ERR);
  assert.equal(compoundInterest({ principal: 0, monthly: 100, rate: 0, years: 101, compounds: 12 }), ERR);
});

test('GV-107 複利：負值與非法複利頻率必須拒絕', () => {
  assert.equal(compoundInterest({ principal: -1, monthly: 0, rate: 0.05, years: 1, compounds: 12 }), ERR);
  assert.equal(compoundInterest({ principal: 0, monthly: -1, rate: 0.05, years: 1, compounds: 12 }), ERR);
  assert.equal(compoundInterest({ principal: 0, monthly: 0, rate: -0.01, years: 1, compounds: 12 }), ERR);
  assert.equal(compoundInterest({ principal: 0, monthly: 0, rate: 1.01, years: 1, compounds: 12 }), ERR);
  assert.equal(compoundInterest({ principal: 0, monthly: 0, rate: 0.05, years: 1, compounds: 6 }), ERR);
});

test('GV-108 複利：極大輸入（100 年、100%、月複利）仍為有限數', () => {
  const r = compoundInterest({ principal: 1e6, monthly: 1e4, rate: 1, years: 100, compounds: 12 });
  assert.ok(Number.isFinite(r.balance) && r.balance > 0, 'GV-108 終值必須有限');
  assert.ok(r.interest > 0);
});

/* ── 3.2 房貸月付試算 ─────────────────────────────────────────────────── */

test('GV-201 房貸：0% 利率 → 月付 = 本金 ÷ 期數（可心算）', () => {
  const r = mortgage({ loan: 120000, annualRate: 0, years: 10 });
  assert.equal(r.monthlyPayment, 1000, 'GV-201 120000 ÷ 120 = 1000');
  assert.equal(r.interest, 0, 'GV-201 0% 時總利息必須為 0');
});

test('GV-202 房貸：教科書向量 200,000 / 年利率 6% / 30 年（兩種等價閉式解交叉驗證）', () => {
  // 推導：等額本息 M = P·i/(1−(1+i)^−n)，代數等價形式 M = P·i(1+i)^n/((1+i)^n−1)。
  // 兩式必須給出同一數字；教科書/銀行試算表公佈值約 1,199.10。
  const r = mortgage({ loan: 200000, annualRate: 0.06, years: 30 });
  const i = 0.06 / 12;
  const n = 360;
  const alt = 200000 * i * Math.pow(1 + i, n) / (Math.pow(1 + i, n) - 1);
  close(r.monthlyPayment, alt, 1e-12, 'GV-202 兩種等價閉式解不一致');
  close(r.monthlyPayment, 1199.1010503055138, 1e-10, 'GV-202 月付金額');
  assert.equal(money0(r.monthlyPayment), 1199);
});

test('GV-203 房貸：攤還閉合檢驗 — 用月付逐月扣款，n 期後餘額必須歸零', () => {
  // 這是與閉式解「路徑完全不同」的獨立驗證：直接模擬本息攤還。
  for (const [loan, rate, years] of [[200000, 0.06, 30], [3000000, 0.022, 30], [500000, 0.001, 5]]) {
    const r = mortgage({ loan, annualRate: rate, years });
    const i = rate / 12;
    let balance = loan;
    for (let m = 0; m < r.months; m += 1) balance = balance * (1 + i) - r.monthlyPayment;
    close(balance, 0, 1e-9 * loan, `GV-203 攤還未歸零（loan=${loan}, rate=${rate}）`);
    assert.ok(Math.abs(balance) < 1e-6, `GV-203 期末餘額 ${balance} 應趨近 0`);
  }
});

test('GV-204 房貸：年利率必須除以 12（而非乘 12 或不換算）', () => {
  // 若程式誤把年利率直接當月利率，12% / 1 年的月付會是 888.49；正確值 888.49 vs 888.49…
  // 用可判別的向量：i = 0.12/12 = 0.01、n = 12、P = 100000 → M = 8884.879…
  const r = mortgage({ loan: 100000, annualRate: 0.12, years: 1 });
  const i = 0.01;
  close(r.monthlyPayment, 100000 * i / (1 - Math.pow(1 + i, -12)), 1e-12, 'GV-204 月利率換算');
  close(r.monthlyPayment, 8884.878867834168, 1e-9, 'GV-204 月付');
  // 對照：若誤用年利率當月利率（i = 0.12），月付會是 16143.7，差距達 1.8 倍
  const wrong = 100000 * 0.12 / (1 - Math.pow(1.12, -12));
  assert.ok(Math.abs(r.monthlyPayment - wrong) > 7000, 'GV-204 必須與「未除以 12」的錯誤結果明顯不同');
});

test('GV-205 房貸：總還款 = 月付 × 期數；總利息 = 總還款 − 本金', () => {
  const r = mortgage({ loan: 3000000, annualRate: 0.022, years: 30 });
  close(r.total, r.monthlyPayment * 360, 0, 'GV-205 總還款定義');
  close(r.interest, r.total - 3000000, 0, 'GV-205 總利息定義');
  assert.ok(r.interest > 0);
});

test('GV-206 房貸邊界：本金 ≤ 0、年限非整數、利率 > 100% 一律拒絕', () => {
  assert.equal(mortgage({ loan: 0, annualRate: 0.02, years: 30 }), ERR);
  assert.equal(mortgage({ loan: -1, annualRate: 0.02, years: 30 }), ERR);
  assert.equal(mortgage({ loan: 100000, annualRate: 0.02, years: 0.5 }), ERR);
  assert.equal(mortgage({ loan: 100000, annualRate: -0.01, years: 30 }), ERR);
  assert.equal(mortgage({ loan: 100000, annualRate: 1.01, years: 30 }), ERR);
});

test('GV-207 房貸：極小利率（0.001%）— 與年金公式的小 i 泰勒展開一致', () => {
  // 獨立推導：(1+i)^-n ≈ 1 - ni + n(n+1)i²/2 → M ≈ (P/n)(1 + (n+1)i/2)。
  // 這條同時證明極小利率下沒有除零或浮點發散。
  const P = 1000000;
  const n = 360;
  const i = 0.00001 / 12;
  const r = mortgage({ loan: P, annualRate: 0.00001, years: 30 });
  close(r.monthlyPayment, (P / n) * (1 + ((n + 1) * i) / 2), 1e-5, 'GV-207 小 i 泰勒展開');
  assert.ok(r.monthlyPayment > P / n, 'GV-207 仍應略高於 0% 情形');
  assert.ok(r.monthlyPayment - P / n < 1, 'GV-207 與 0% 的差距應小於 1 元');
});

/* ── 3.3 儲蓄目標計算器 ───────────────────────────────────────────────── */

test('GV-301 儲蓄：0% 利率、每月存 100、目標 1200 → 恰 12 個月（無 off-by-one）', () => {
  const r = savingsTimeMode({ target: 1200, current: 0, annualRate: 0, monthly: 100 });
  assert.equal(r.months, 12, 'GV-301 應為 12 個月，多一期或少一期都算錯');
});

test('GV-302 儲蓄：0% 利率、指定 24 個月 → 每月 =（目標 − 現有）÷ 24', () => {
  const r = savingsMonthlyMode({ target: 5000, current: 800, annualRate: 0, months: 24 });
  close(r.required, (5000 - 800) / 24, 1e-12, 'GV-302 0% 每月應存');
  close(r.required, 175, 1e-12, 'GV-302 = 4200/24 = 175（可心算）');
});

test('GV-303 儲蓄：有息時採期末年金公式，且與逐月模擬互相驗證', () => {
  // 推導：FV = current(1+i)^n + PMT·((1+i)^n − 1)/i → PMT =（target − current(1+i)^n)·i /((1+i)^n − 1)
  const params = { target: 1000000, current: 100000, annualRate: 5, months: 60 };
  const r = savingsMonthlyMode(params);
  const i = Math.pow(1.05, 1 / 12) - 1;
  // 獨立驗證：用求得的 PMT 逐月模擬，期末餘額必須等於目標
  let balance = params.current;
  for (let m = 0; m < params.months; m += 1) balance = balance * (1 + i) + r.required;
  close(balance, params.target, 1e-9, 'GV-303 逐月模擬未達目標，年金公式有誤');
});

test('GV-304 儲蓄：年利率被視為「有效年利率」（(1+r)^(1/12)−1），非名目 r/12', () => {
  // 依 src/i18n/tools/savings-goal.ts 明載公式：monthly rate = (1 + annual rate)^(1/12) − 1
  close(savingsMonthlyRate(5), Math.pow(1.05, 1 / 12) - 1, 1e-15, 'GV-304 月利率換算');
  // 與「名目 ÷ 12」明顯不同（此差異即報告中的跨工具不一致 F-4）
  assert.ok(Math.abs(savingsMonthlyRate(5) - 0.05 / 12) > 8e-5, 'GV-304 應與 r/12 不同');
  assert.equal(savingsMonthlyRate(0), 0, 'GV-304 0% 必須恰為 0');
});

test('GV-305 儲蓄邊界：已達標、無法達成、與非法輸入', () => {
  assert.deepEqual(savingsTimeMode({ target: 1000, current: 1000, annualRate: 0, monthly: 0 }), { reached: true });
  assert.deepEqual(savingsTimeMode({ target: 1000, current: 0, annualRate: 0, monthly: 0 }), { impossible: true });
  assert.equal(savingsMonthlyMode({ target: 1000, current: 0, annualRate: 0, months: 0 }), ERR);
  assert.equal(savingsMonthlyMode({ target: 1000, current: 0, annualRate: 0, months: 1.5 }), ERR);
  assert.equal(savingsMonthlyMode({ target: 0, current: 0, annualRate: 0, months: 12 }), ERR);
});

test('GV-306 儲蓄：利息已足以達標時每月應存被夾為 0（不得回傳負數）', () => {
  const r = savingsMonthlyMode({ target: 101000, current: 100000, annualRate: 10, months: 12 });
  assert.equal(r.required, 0, 'GV-306 不得要求使用者存負數');
});

/* ── 3.4 通膨購買力 ───────────────────────────────────────────────────── */

test('GV-401 通膨：未來成本 = 金額 ×(1+r)^n（教科書複利）', () => {
  const r = inflation({ amount: 10000, ratePercent: 3, years: 5, mode: 'futureCost' });
  close(r.adjusted, 10000 * Math.pow(1.03, 5), 1e-12, 'GV-401 未來成本');
  close(r.adjusted, 11592.740743, 1e-9, 'GV-401 = 11,592.74');
});

test('GV-402 通膨：未來購買力 = 金額 ÷(1+r)^n，且兩模式互為反函數', () => {
  const fwd = inflation({ amount: 10000, ratePercent: 3, years: 5, mode: 'futureCost' });
  const back = inflation({ amount: fwd.adjusted, ratePercent: 3, years: 5, mode: 'futureBuyingPower' });
  close(back.adjusted, 10000, 1e-12, 'GV-402 來回換算必須回到原值');
  const bp = inflation({ amount: 10000, ratePercent: 3, years: 5, mode: 'futureBuyingPower' });
  close(bp.adjusted, 8626.087843841638, 1e-9, 'GV-402 購買力');
});

test('GV-403 通膨邊界：0 年 → 不變、變化為 0', () => {
  const r = inflation({ amount: 10000, ratePercent: 3, years: 0, mode: 'futureCost' });
  assert.equal(r.factor, 1);
  assert.equal(r.adjusted, 10000);
  assert.equal(r.change, 0);
});

test('GV-404 通膨：負通膨（通縮）−2%、10 年', () => {
  const r = inflation({ amount: 10000, ratePercent: -2, years: 10, mode: 'futureCost' });
  close(r.adjusted, 10000 * Math.pow(0.98, 10), 1e-12, 'GV-404 通縮');
  assert.ok(r.change < 0, 'GV-404 通縮下未來成本應下降');
});

test('GV-405 通膨邊界：−100%、年限非整數、負金額一律拒絕', () => {
  assert.equal(inflation({ amount: 10000, ratePercent: -100, years: 5, mode: 'futureCost' }), ERR);
  assert.equal(inflation({ amount: 10000, ratePercent: 3, years: 5.5, mode: 'futureCost' }), ERR);
  assert.equal(inflation({ amount: -1, ratePercent: 3, years: 5, mode: 'futureCost' }), ERR);
  assert.equal(inflation({ amount: 10000, ratePercent: 1001, years: 5, mode: 'futureCost' }), ERR);
});

/* ── 3.5 實領薪資 ─────────────────────────────────────────────────────── */

test('GV-501 實領薪資：可手算 — 月薪 50000、費率合計 8.95%', () => {
  // 依 src/i18n/tools/net-salary.ts 明載公式：
  // 實領 = 月薪 + 津貼 − 月薪 × 扣除率合計 − 其他扣除
  const r = netSalary({ gross: 50000, allowance: 0, other: 0, laborRate: 2.4, healthRate: 1.55, pensionRate: 0, taxRate: 5 });
  close(r.deductions, 50000 * 0.0895, 1e-9, 'GV-501 扣除合計 = 4475');
  assert.equal(money0(r.deductions), 4475);
  assert.equal(money0(r.net), 45525, 'GV-501 實領 = 50000 − 4475');
});

test('GV-502 實領薪資：津貼計入總收入但不列入扣除基準（符合明載公式）', () => {
  const r = netSalary({ gross: 50000, allowance: 5000, other: 0, laborRate: 2.4, healthRate: 1.55, pensionRate: 0, taxRate: 5 });
  assert.equal(r.income, 55000);
  close(r.deductions, 50000 * 0.0895, 1e-9, 'GV-502 扣除基準必須只用月薪');
  assert.equal(money0(r.net), 50525);
});

test('GV-503 實領薪資邊界：全部 0 → 實領 0；其他扣除直接相減', () => {
  assert.equal(netSalary({ gross: 0, allowance: 0, other: 0, laborRate: 0, healthRate: 0, pensionRate: 0, taxRate: 0 }).net, 0);
  const r = netSalary({ gross: 30000, allowance: 0, other: 1200, laborRate: 0, healthRate: 0, pensionRate: 0, taxRate: 0 });
  assert.equal(r.net, 28800, 'GV-503 30000 − 1200');
});

test('GV-504 實領薪資：負數輸入與單一費率 > 100% 必須拒絕', () => {
  assert.equal(netSalary({ gross: -1, allowance: 0, other: 0, laborRate: 0, healthRate: 0, pensionRate: 0, taxRate: 0 }), ERR);
  assert.equal(netSalary({ gross: 100, allowance: 0, other: 0, laborRate: 101, healthRate: 0, pensionRate: 0, taxRate: 0 }), ERR);
});

test('GV-505 實領薪資：費率合計可超過 100%（目前無總額上限，實領為負且無警示）', () => {
  // 這是「缺少上限檢核」的可重現證據；數字本身符合公式，屬 P2 風險而非公式錯誤。
  const r = netSalary({ gross: 1000, allowance: 0, other: 0, laborRate: 30, healthRate: 30, pensionRate: 30, taxRate: 30 });
  close(r.deductions, 1200, 1e-9, 'GV-505 扣除 = 1000 × 120%');
  assert.equal(r.net, -200, 'GV-505 實領為 −200，工具不會攔阻');
});

test('[RED:P2] GV-506 實領薪資：三個顯示數字必須自洽（總收入 − 扣除合計 = 實領）', () => {
  // 推導依據：畫面同時列出「總收入 / 扣除合計 / 估算實領」，三者是同一組帳的三個欄位，
  // 使用者會直接相減核對。但 money() 對三者各自 Math.round，且 Math.round(0.5)=1、
  // Math.round(999.5)=1000，導致顯示值無法對帳。
  // 使用工具本身的預設費率（2.4 / 1.55 / 0 / 5）與月薪 21,000（接近基本工資的常見輸入）。
  // 在 20,000–80,000 每 100 元一階、四組常見費率組合的 2,436 種輸入中，有 120 種（約 5%）出現此落差。
  const r = netSalary({ gross: 21000, allowance: 0, other: 0, laborRate: 2.4, healthRate: 1.55, pensionRate: 0, taxRate: 5 });
  const shownIncome = money0(r.income);
  const shownDeductions = money0(r.deductions);
  const shownNet = money0(r.net);
  assert.equal(shownIncome - shownDeductions, shownNet,
    `GV-506 顯示值無法對帳：${shownIncome} − ${shownDeductions} ≠ ${shownNet}（未捨入值 ${r.income} / ${r.deductions} / ${r.net}）`);
});

/* ── 3.6 加班費 ───────────────────────────────────────────────────────── */

test('GV-601 加班費：可手算 — 時薪 200 × 2 小時 × 1.34 = 536', () => {
  const r = overtimePay({
    hourly: 200, weekdayHours: 2, weekdayMultiplier: 1.34,
    extendedHours: 0, extendedMultiplier: 1.67, restHours: 0, restMultiplier: 2,
    holidayHours: 0, holidayMultiplier: 2,
  });
  close(r.weekday, 536, 1e-9, 'GV-601 平日加班費');
  assert.equal(r.total, r.weekday);
});

test('GV-602 加班費：四類別加總 = 各類別之和', () => {
  const r = overtimePay({
    hourly: 200, weekdayHours: 2, weekdayMultiplier: 1.34,
    extendedHours: 2, extendedMultiplier: 1.67, restHours: 4, restMultiplier: 2,
    holidayHours: 8, holidayMultiplier: 2,
  });
  close(r.weekday, 536, 1e-9);
  close(r.extended, 668, 1e-9, 'GV-602 200×2×1.67');
  close(r.rest, 1600, 1e-9, 'GV-602 200×4×2');
  close(r.holiday, 3200, 1e-9, 'GV-602 200×8×2');
  close(r.total, 536 + 668 + 1600 + 3200, 1e-9, 'GV-602 總額');
});

test('GV-603 加班費：法定倍率 4/3 與 5/3 的精確值（預設 1.34/1.67 為進位後之值）', () => {
  // 依據：勞動基準法第 24 條，平日延長工時前 2 小時「加給 1/3 以上」= 4/3 倍，
  // 再延長「加給 2/3 以上」= 5/3 倍。工具預設用 1.34 / 1.67（進位、對勞工有利）。
  const exact = overtimePay({
    hourly: 200, weekdayHours: 2, weekdayMultiplier: 4 / 3,
    extendedHours: 2, extendedMultiplier: 5 / 3, restHours: 0, restMultiplier: 2,
    holidayHours: 0, holidayMultiplier: 2,
  });
  close(exact.weekday, 400 * 4 / 3, 1e-9, 'GV-603 4/3 倍');
  close(exact.extended, 400 * 5 / 3, 1e-9, 'GV-603 5/3 倍');
  // 預設值與法定精確值的差額（進位造成，屬「時效性/假設」而非計算錯誤）
  const rounded = overtimePay({
    hourly: 200, weekdayHours: 2, weekdayMultiplier: 1.34,
    extendedHours: 2, extendedMultiplier: 1.67, restHours: 0, restMultiplier: 2,
    holidayHours: 0, holidayMultiplier: 2,
  });
  assert.ok(rounded.total > exact.total, 'GV-603 進位後的預設倍率應略高於法定下限');
  assert.ok(rounded.total - exact.total < 6, 'GV-603 差額應在數元之內');
});

test('GV-604 加班費邊界：0 小時、負值、倍率 > 10', () => {
  const zero = overtimePay({
    hourly: 200, weekdayHours: 0, weekdayMultiplier: 1.34, extendedHours: 0, extendedMultiplier: 1.67,
    restHours: 0, restMultiplier: 2, holidayHours: 0, holidayMultiplier: 2,
  });
  assert.equal(zero.total, 0);
  assert.equal(overtimePay({
    hourly: 200, weekdayHours: -1, weekdayMultiplier: 1.34, extendedHours: 0, extendedMultiplier: 1.67,
    restHours: 0, restMultiplier: 2, holidayHours: 0, holidayMultiplier: 2,
  }), ERR);
  assert.equal(overtimePay({
    hourly: 200, weekdayHours: 1, weekdayMultiplier: 10.5, extendedHours: 0, extendedMultiplier: 1.67,
    restHours: 0, restMultiplier: 2, holidayHours: 0, holidayMultiplier: 2,
  }), ERR);
});

test('GV-605 加班費：半小時（0.5）計費正確', () => {
  const r = overtimePay({
    hourly: 183, weekdayHours: 0.5, weekdayMultiplier: 1.34, extendedHours: 0, extendedMultiplier: 1.67,
    restHours: 0, restMultiplier: 2, holidayHours: 0, holidayMultiplier: 2,
  });
  close(r.weekday, 183 * 0.5 * 1.34, 1e-12, 'GV-605 半小時');
  close(r.weekday, 122.61, 1e-9, 'GV-605 = 122.61');
});

/* ── 3.7 百分比計算器 ─────────────────────────────────────────────────── */

test('GV-701 百分比：25% 的 200 = 50（可心算）', () => {
  assert.equal(percentage('of', 25, 200).text, '50');
  assert.equal(percentage('of', 0, 200).text, '0');
  assert.equal(percentage('of', 100, 37).text, '37');
});

test('GV-702 百分比：30 是 120 的 25%（占比基準必須是第二欄）', () => {
  assert.equal(percentage('ratio', 30, 120).text, '25%');
  assert.equal(percentage('ratio', 120, 30).text, '400%', 'GV-702 交換後應為 400%，可辨別基準是否搞反');
});

test('GV-703 百分比變化：80→100 為 +25%，100→80 為 −20%（不對稱可辨別基準）', () => {
  const up = percentage('change', 80, 100);
  assert.equal(up.text, '25% increase');
  const down = percentage('change', 100, 80);
  assert.equal(down.text, '20% decrease', 'GV-703 若基準搞反會得到 25%');
});

test('GV-704 百分比邊界：占比分母 0、變化基準 0 → 錯誤提示', () => {
  assert.equal(percentage('ratio', 10, 0).text, 'divideZero');
  assert.equal(percentage('change', 0, 10).text, 'divideZero');
  assert.equal(percentage('change', 50, 50).text, '0% noChange');
});

test('GV-705 百分比變化：負基準時的增減「方向字」必須反映數值實際變化方向', () => {
  // 推導：由 −80 變成 −100，數值明確變小（例如淨損從 −80 惡化為 −100）。
  // 介面用「增加 / 減少」描述方向（zh: increase=增加, decrease=減少），
  // 因此方向字必須是「減少」。但實作只看 (b−a)/a 的正負，負基準會把符號反轉。
  const worse = percentage('change', -80, -100);
  assert.equal(worse.word, 'decrease',
    `GV-705 由 −80 變 −100 應標示為「減少」，實際標示為「${worse.word}」（輸出：${worse.text}）`);
});

test('GV-706 百分比：浮點顯示 — toFixed(4) 會吸收 0.1+0.2 類誤差，但小於 1e-4 的結果被截為 0', () => {
  assert.equal(percentage('of', 10, 0.3).text, '0.03', 'GV-706 0.1×0.3 的浮點尾數應被吸收');
  assert.equal(percentage('ratio', 0.1, 0.3).text, '33.3333%');
  assert.equal(percentage('of', 1, 0.00001).text, '0', 'GV-706 1e-7 被截為 0（精度損失，P3）');
});

test('GV-707 百分比：非數字輸入回傳 invalid', () => {
  assert.equal(percentage('of', NaN, 200).text, 'invalid');
  assert.equal(percentage('ratio', 10, NaN).text, 'invalid');
});

/* ── 3.8 標準差計算器 ─────────────────────────────────────────────────── */

test('GV-801 標準差：教科書資料集 [2,4,4,4,5,5,7,9]（母體 σ=2、樣本 s=√(32/7)）', () => {
  // 推導：n=8、Σ=40、平均 5、Σ(x−x̄)² = 9+1+1+1+0+0+4+16 = 32。
  // 母體變異數 = 32/8 = 4 → σ = 2；樣本變異數 = 32/7 → s = 2.13809。
  const r = stdev('2 4 4 4 5 5 7 9');
  assert.equal(r.n, 8);
  assert.equal(r.sum, 40);
  assert.equal(r.mean, 5);
  assert.equal(r.varp, 4, 'GV-801 母體變異數必須除以 n');
  assert.equal(r.sdp, 2);
  close(r.vars, 32 / 7, 1e-12, 'GV-801 樣本變異數必須除以 n−1');
  close(r.sds, Math.sqrt(32 / 7), 1e-12);
  assert.equal(sdFmt(r.sds), '2.1381');
});

test('GV-802 標準差：母體與樣本必須是兩個不同的值（不得混用 n 與 n−1）', () => {
  const r = stdev('10, 20, 30, 40');
  // 平均 25、Σ(x−x̄)² = 225+25+25+225 = 500 → 母體 125、樣本 500/3
  assert.equal(r.varp, 125);
  close(r.vars, 500 / 3, 1e-12);
  assert.ok(r.vars > r.varp, 'GV-802 樣本變異數必須大於母體變異數');
});

test('GV-803 標準差邊界：n=1 時樣本標準差未定義（顯示 --），母體為 0', () => {
  const r = stdev('5');
  assert.equal(r.n, 1);
  assert.equal(r.varp, 0);
  assert.equal(r.sdp, 0);
  assert.ok(Number.isNaN(r.vars), 'GV-803 n=1 的樣本變異數必須是 NaN');
  assert.equal(sdFmt(r.vars), '--');
});

test('GV-804 標準差：中位數（奇偶）與眾數（含多眾數、無眾數）', () => {
  assert.equal(stdev('3 1 2').median, 2, 'GV-804 奇數個 → 中間值');
  assert.equal(stdev('4 1 3 2').median, 2.5, 'GV-804 偶數個 → 中間兩值平均');
  assert.deepEqual(stdev('1 1 2 2 3').modes, [1, 2], 'GV-804 雙眾數');
  assert.equal(stdev('1 2 3').modes, null, 'GV-804 無重複值即無眾數');
});

test('GV-805 標準差：全距、最小、最大，含負數', () => {
  const r = stdev('-5, 0, 5');
  assert.equal(r.min, -5);
  assert.equal(r.max, 5);
  assert.equal(r.range, 10);
  assert.equal(r.mean, 0);
  close(r.varp, 50 / 3, 1e-12, 'GV-805 母體變異數 = (25+0+25)/3');
});

test('GV-806 標準差：浮點資料 [0.1, 0.2, 0.3] 的母體變異數 = 1/150', () => {
  // 推導：平均 0.2，Σ(x−x̄)² = 0.01 + 0 + 0.01 = 0.02 → /3 = 1/150 = 0.0066667
  const r = stdev('0.1 0.2 0.3');
  close(r.varp, 1 / 150, 1e-12, 'GV-806 浮點變異數');
  assert.equal(sdFmt(r.varp), '0.0067', 'GV-806 顯示四捨五入到 4 位');
  assert.equal(sdFmt(r.sum), '0.6', 'GV-806 顯示值應吸收 0.1+0.2 的浮點尾數');
});

test('GV-807 標準差：分隔規格 — 逗號/空白/換行皆為分隔符（依工具說明文件）', () => {
  // 期望值來源：src/i18n/tools/standard-deviation.ts 明載
  // 「輸入可用逗號、空白或換行分隔」「由於逗號是分隔符，本工具不把 3,5 解讀成小數 3.5」
  assert.deepEqual(stdev('1,2\n3 4').values, [1, 2, 3, 4]);
  assert.deepEqual(stdev('3,5').values, [3, 5], 'GV-807 3,5 應解析為兩個數而非 3.5');
});

test('GV-808 標準差：千分位逗號會被拆成兩個數（未被文件涵蓋的靜默誤讀風險）', () => {
  // 這是可重現的資料完整性風險：使用者貼上「1,000 2,000 3,000」時，
  // 得到的是 6 個數（1,0,2,0,3,0）而不是 3 個數，且畫面不會有任何警示。
  const r = stdev('1,000 2,000 3,000');
  assert.equal(r.n, 6, 'GV-808 千分位逗號被當成分隔符');
  assert.equal(r.mean, 1, 'GV-808 平均變成 1（使用者預期 2000）');
  assert.ok(r.n !== 3, 'GV-808 已證實與使用者意圖不符 → 見報告 F-2');
});

/* ── 3.9 教育統計：PR / Z / T / 排名 / 常態化 ─────────────────────────── */

test('GV-901 PR：標準百分等級公式 PR = 100(B + 0.5E)/N', () => {
  // 推導：Angoff/古典百分等級定義，同分者取一半計入。B=24、E=1、N=40 → 100×24.5/40 = 61.25
  const r = percentileRank({ below: 24, equal: 1, total: 40 });
  assert.equal(r.pr, 61.25);
  assert.equal(r.belowPercent, 60);
  assert.equal(r.tiedPercent, 2.5);
  assert.equal(r.abovePercent, 37.5);
  close(r.belowPercent + r.tiedPercent + r.abovePercent, 100, 1e-12, 'GV-901 三段百分比必須加總 100');
});

test('GV-902 PR 邊界：全班只有 1 人 → PR = 50；B+E > N 或 E = 0 應拒絕', () => {
  assert.equal(percentileRank({ below: 0, equal: 1, total: 1 }).pr, 50, 'GV-902 單人 PR 為 50');
  assert.equal(percentileRank({ below: 39, equal: 1, total: 40 }).pr, 98.75, 'GV-902 最高分');
  assert.equal(percentileRank({ below: 40, equal: 1, total: 40 }), ERR);
  assert.equal(percentileRank({ below: 0, equal: 0, total: 40 }), ERR);
  assert.equal(percentileRank({ below: -1, equal: 1, total: 40 }), ERR);
  assert.equal(percentileRank({ below: 1.5, equal: 1, total: 40 }), ERR);
});

test('GV-903 Z 分數：z = (X − M)/SD', () => {
  assert.equal(zScore({ score: 82, mean: 70, sd: 10 }).z, 1.2);
  assert.equal(zScore({ score: 70, mean: 70, sd: 10 }).z, 0);
  assert.equal(zScore({ score: 50, mean: 70, sd: 10 }).z, -2);
  assert.equal(zScore({ score: 82, mean: 70, sd: 0 }), ERR, 'GV-903 SD = 0 必須拒絕');
  assert.equal(zScore({ score: 82, mean: 70, sd: -1 }), ERR);
});

test('GV-904 T 分數：McCall T = 50 + 10z（教育測驗標準定義）', () => {
  assert.equal(tScore(1.2).t, 62);
  assert.equal(tScore(0).t, 50, 'GV-904 z=0 必須恰為 50');
  assert.equal(tScore(-2).t, 30);
  assert.equal(tScore(3).t, 80);
  assert.equal(tScore(NaN), ERR);
});

test('GV-905 T 分數與常態化分數轉換必須一致（目標平均 50、目標 SD 10）', () => {
  // 交叉驗證：T 分數就是目標平均 50、目標標準差 10 的線性轉換。
  const z = zScore({ score: 82, mean: 70, sd: 10 }).z;
  const norm = normalizedScore({ score: 82, mean: 70, sd: 10, targetMean: 50, targetSd: 10 });
  assert.equal(norm.converted, tScore(z).t, 'GV-905 兩個工具對同一輸入必須給同一答案');
  assert.equal(norm.converted, 62);
  assert.equal(norm.scaleFactor, 1);
});

test('GV-906 常態化分數：線性轉換 X\' = M\' + z·SD\'（含放大與縮小尺度）', () => {
  const big = normalizedScore({ score: 60, mean: 50, sd: 5, targetMean: 500, targetSd: 100 });
  assert.equal(big.z, 2);
  assert.equal(big.converted, 700, 'GV-906 z=2 在 500/100 尺度上是 700');
  assert.equal(big.scaleFactor, 20);
  assert.equal(normalizedScore({ score: 60, mean: 50, sd: 5, targetMean: 500, targetSd: 0 }), ERR);
});

test('GV-907 排名百分比：PR = 100(N − r + 0.5)/N，且「前百分比」= 100r/N', () => {
  // 推導：名次 r 代表有 (N − r) 人低於你、1 人同分（你自己）→ 套用 PR 公式。
  const r6 = classRankPercentile({ rank: 6, total: 40 });
  assert.equal(r6.pr, 86.25, 'GV-907 100×34.5/40');
  assert.equal(r6.top, 15);
  assert.equal(r6.peopleAhead, 5);
  assert.equal(r6.peopleBehind, 34);
  const first = classRankPercentile({ rank: 1, total: 40 });
  assert.equal(first.pr, 98.75);
  assert.equal(first.top, 2.5);
  const last = classRankPercentile({ rank: 40, total: 40 });
  assert.equal(last.pr, 1.25);
  assert.equal(last.peopleBehind, 0);
});

test('GV-908 排名百分比邊界：名次 > 人數、0 名次、小數名次一律拒絕', () => {
  assert.equal(classRankPercentile({ rank: 41, total: 40 }), ERR);
  assert.equal(classRankPercentile({ rank: 0, total: 40 }), ERR);
  assert.equal(classRankPercentile({ rank: 1.5, total: 40 }), ERR);
  assert.equal(classRankPercentile({ rank: 1, total: 1 }).pr, 50, 'GV-908 單人班級 PR 為 50');
});

test('GV-909 教育統計顯示：format() 去尾零規則不得吃掉有效數字', () => {
  assert.equal(eduFormat(61.25, 2), '61.25');
  assert.equal(eduFormat(50, 2), '50');
  assert.equal(eduFormat(2.5, 3), '2.5');
  assert.equal(eduFormat(100.0, 2), '100');
  assert.equal(eduFormat(1.101, 3), '1.101');
  assert.equal(eduFormat(10.1, 3), '10.1');
  assert.equal(eduFormat(0.5, 3), '0.5');
});

/* ── 3.10 加權平均 / 教甄加權 / 成績平均 / GPA ────────────────────────── */

test('GV-1001 加權平均：Σ(值×權)/Σ權（可心算）', () => {
  const r = weightedAverage([{ value: 80, weight: 30 }, { value: 90, weight: 70 }]);
  assert.equal(r.weightTotal, 100);
  assert.equal(r.weightedSum, 8700);
  assert.equal(r.result, 87);
});

test('GV-1002 加權平均：權重成比例縮放不得改變結果', () => {
  const a = weightedAverage([{ value: 80, weight: 30 }, { value: 90, weight: 70 }]);
  const b = weightedAverage([{ value: 80, weight: 3 }, { value: 90, weight: 7 }]);
  close(b.result, a.result, 1e-12, 'GV-1002 權重比例不變則加權平均不變');
});

test('GV-1003 加權平均邊界：權重 ≤ 0、空列表一律拒絕', () => {
  assert.equal(weightedAverage([{ value: 80, weight: 0 }]), ERR);
  assert.equal(weightedAverage([{ value: 80, weight: -1 }]), ERR);
  assert.equal(weightedAverage([]), ERR);
});

test('GV-1004 教甄加權：80/85/82 搭配 40/40/20 → 82.4（可心算）', () => {
  // 推導：(80×40 + 85×40 + 82×20)/100 = (3200 + 3400 + 1640)/100 = 82.4
  const r = teacherExam([{ score: 80, weight: 40 }, { score: 85, weight: 40 }, { score: 82, weight: 20 }]);
  assert.equal(r.weightTotal, 100);
  close(r.total, 82.4, 1e-12);
  assert.equal(r.warn, false);
});

test('GV-1005 教甄加權：權重不足 100 時仍以實際權重總和為分母，並發出警示', () => {
  const r = teacherExam([{ score: 80, weight: 40 }, { score: 85, weight: 30 }, { score: 82, weight: 20 }]);
  assert.equal(r.weightTotal, 90);
  close(r.total, (80 * 40 + 85 * 30 + 82 * 20) / 90, 1e-12, 'GV-1005 分母必須是 90 而非 100');
  assert.equal(r.warn, true, 'GV-1005 權重不等於 100% 必須警示');
});

test('GV-1006 GPA：4.3 制 — 3 學分 A(4.0) + 3 學分 B+(3.3) = 3.65（可心算）', () => {
  const r = gpa([{ credits: 3, grade: 'A' }, { credits: 3, grade: 'B+' }], '4.3');
  assert.equal(r.totalCredits, 6);
  close(r.totalPoints, 21.9, 1e-12);
  close(r.gpa, 3.65, 1e-12);
  assert.equal(r.gpa.toFixed(2), '3.65');
});

test('GV-1007 GPA：A+ 在 4.3 制為 4.3、4.0 制為 4.0；F 為 0', () => {
  assert.equal(gpa([{ credits: 3, grade: 'A+' }], '4.3').gpa, 4.3);
  assert.equal(gpa([{ credits: 3, grade: 'A+' }], '4.0').gpa, 4.0);
  assert.equal(gpa([{ credits: 3, grade: 'F' }], '4.3').gpa, 0, 'GV-1007 F 應為 0 而非略過');
  assert.equal(gpa([{ credits: 3, grade: 'F' }], '4.3').totalCredits, 3, 'GV-1007 F 的學分仍須計入分母');
});

test('GV-1008 GPA 邊界：0 或負學分、未知等第被略過；全空回傳 null', () => {
  assert.equal(gpa([{ credits: 0, grade: 'A' }], '4.3').gpa, null);
  assert.equal(gpa([{ credits: -3, grade: 'A' }], '4.3').gpa, null);
  assert.equal(gpa([{ credits: 3, grade: 'D+' }], '4.3').gpa, null, 'GV-1008 D+ 不在等第表內（覆蓋度缺口，見報告）');
  assert.equal(gpa([], '4.3').gpa, null);
});

test('GV-1009 成績平均：算術平均與加權平均（可心算）', () => {
  const r = gradeAverage([{ score: 90, weight: 1 }, { score: 85, weight: 1 }]);
  assert.equal(r.count, 2);
  assert.equal(r.sum, 175);
  assert.equal(r.average, 87.5);
  assert.equal(r.weighted, 87.5, 'GV-1009 等權重時加權平均必須等於算術平均');
});

test('GV-1010 成績平均：混合「有權重」與「無權重」列時，無權重列被排除於加權平均', () => {
  // 可重現的落差證據：算術平均含 3 筆，加權平均只含 2 筆，畫面不會提示被排除。
  const r = gradeAverage([{ score: 90, weight: 2 }, { score: 60, weight: 1 }, { score: 100, weight: null }]);
  close(r.average, (90 + 60 + 100) / 3, 1e-12, 'GV-1010 算術平均含全部 3 筆');
  close(r.weighted, (90 * 2 + 60 * 1) / 3, 1e-12, 'GV-1010 加權平均只含 2 筆');
  assert.ok(Math.abs(r.average - r.weighted) > 3, 'GV-1010 兩者差距顯著 → 見報告 F-5');
});

test('GV-1011 成績平均邊界：無有效列 → average 為 null；權重 0 不計入', () => {
  assert.equal(gradeAverage([]).average, null);
  assert.equal(gradeAverage([{ score: 90, weight: 0 }]).weighted, null);
  assert.equal(gradeAverage([{ score: 90, weight: 0 }]).average, 90);
});

test('GV-1012 成績平均／GPA 顯示：toFixed(2) 的二進位半數進位陷阱（非公式錯誤，須知悉）', () => {
  // 1.005 的雙精度實值為 1.00499999999999989…，因此 toFixed(2) 給 "1.00" 而非 "1.01"。
  assert.equal((1.005).toFixed(2), '1.00');
  assert.equal((2.675).toFixed(2), '2.67');
  assert.equal((3.615).toFixed(2), '3.62', '同族輸入不一定同向，取決於二進位實值');
});

/* ── 3.11 Cronbach's α ────────────────────────────────────────────────── */

test('GV-1101 Cronbach α：預設示例可全手算 → α = 4/3 ×(1 − 3.6/10.7) = 0.8847', () => {
  // 手算推導（樣本變異數 n−1）：
  //  題 1: 4,3,5,2,4 → 平均 3.6、Σd² = 5.2 → 變異數 1.3
  //  題 2: 3,3,4,3,4 → 平均 3.4、Σd² = 1.2 → 變異數 0.3
  //  題 3: 4,4,5,2,3 → 平均 3.6、Σd² = 5.2 → 變異數 1.3
  //  題 4: 5,4,5,3,4 → 平均 4.2、Σd² = 2.8 → 變異數 0.7   → Σσ²ᵢ = 3.6
  //  總分: 16,14,19,10,15 → 平均 14.8、Σd² = 42.8 → σ²_T = 10.7
  //  α = k/(k−1)(1 − Σσ²ᵢ/σ²_T) = 4/3 × (1 − 3.6/10.7)
  const r = cronbachAlpha('4,3,4,5\n3,3,4,4\n5,4,5,5\n2,3,2,3\n4,4,3,4');
  assert.equal(r.respondents, 5);
  assert.equal(r.items, 4);
  close(r.itemVarianceSum, 3.6, 1e-12, 'GV-1101 Σ題目變異數');
  close(r.totalVariance, 10.7, 1e-12, 'GV-1101 總分變異數');
  close(r.alpha, (4 / 3) * (1 - 3.6 / 10.7), 1e-12);
  close(r.alpha, 0.8847352024922118, 1e-12);
  assert.equal(eduFormat(r.alpha, 3), '0.885');
});

test('GV-1102 Cronbach α：以「共變數形式」交叉驗證（代數上等價的另一條公式）', () => {
  // α = k·c̄ / (v̄ + (k−1)c̄)，其中 v̄ 為平均題目變異數、c̄ 為平均題間共變數。
  const r = cronbachAlpha('4,3,4,5\n3,3,4,4\n5,4,5,5\n2,3,2,3\n4,4,3,4');
  const k = r.items;
  const vBar = r.itemVarianceSum / k;
  const cBar = (r.totalVariance - r.itemVarianceSum) / (k * (k - 1));
  close(r.alpha, (k * cBar) / (vBar + (k - 1) * cBar), 1e-12, 'GV-1102 兩種等價公式不一致');
});

test('GV-1103 Cronbach α 邊界：兩題完全相同 → α = 1', () => {
  // 手算：題目變異數各 1（Σ=2），總分 2,4,6 → 變異數 4。α = 2/1 ×(1 − 2/4) = 1
  const r = cronbachAlpha('1,1\n2,2\n3,3');
  close(r.alpha, 1, 1e-12, 'GV-1103 完全一致的題目 α 應為 1');
});

test('GV-1104 Cronbach α 邊界：總分變異數為 0 → 拒絕；α 可為負值（公式允許）', () => {
  assert.equal(cronbachAlpha('1,3\n2,2\n3,1'), ERR, 'GV-1104 總分全相同 → 變異數 0，須拒絕');
  const neg = cronbachAlpha('1,3\n2,1\n3,2');
  // 題目變異數 1 與 1（Σ=2）；總分 4,3,5 → 變異數 1 → α = 2 ×(1 − 2/1) = −2
  close(neg.alpha, -2, 1e-12, 'GV-1104 負 α 是合法輸出（表示題目間為負相關）');
});

test('GV-1105 Cronbach α：欄數不一致、非數值、列數不足一律拒絕', () => {
  assert.equal(cronbachAlpha('1,2,3\n1,2'), ERR);
  assert.equal(cronbachAlpha('1,2\nx,2'), ERR);
  assert.equal(cronbachAlpha('1,2'), ERR, 'GV-1105 少於 2 列');
  assert.equal(cronbachAlpha('1\n2\n3'), ERR, 'GV-1105 少於 2 欄');
});

test('GV-1106 Cronbach α：解析器對「小數＋逗號空白」的處理', () => {
  // 「4.5, 3.5」這一列含空白 → 走 /\s+/ 分支 → 每格再把 ',' 換成 '.' → "4.5." → NaN → 拒絕。
  // 這是可重現的解析限制（見報告 F-6），使用者會看到錯誤訊息而非錯誤數字。
  assert.equal(cronbachAlpha('4.5, 3.5\n3.5, 2.5\n5.0, 4.0'), ERR,
    'GV-1106 小數搭配「逗號+空白」目前無法解析');
  // 不含空白的純逗號分隔可正常解析
  assert.notEqual(cronbachAlpha('4.5,3.5\n3.5,2.5\n5.0,4.0'), ERR);
});

/* ── 3.12 獨立樣本 Welch t 檢定 ──────────────────────────────────────── */

const WELCH_BASE = { n1: 10, n2: 10, mean1: 10, mean2: 12, sd1: 2, sd2: 2 };

test('GV-1201 Welch t：等 n 等 SD 時，自由度必須恰為 2n−2（可解析驗證）', () => {
  // 推導：v1 = v2 = s²/n。Welch–Satterthwaite df = (v1+v2)²/(v1²/(n1−1) + v2²/(n2−1))
  //      = (2v)²/(2v²/(n−1)) = 4v²(n−1)/(2v²) = 2(n−1) = 18。
  const r = welchTTest(WELCH_BASE);
  close(r.df, 18, 1e-12, 'GV-1201 Welch df 在等 n 等 SD 下必須恰為 18');
  close(r.standardError, Math.sqrt(0.8), 1e-15, 'GV-1201 SE = √(s²/n + s²/n)');
  close(r.t, -Math.sqrt(5), 1e-12, 'GV-1201 t = −2/√0.8 = −√5');
});

test('GV-1202 Welch t：雙尾 p 值以獨立數值積分交叉驗證（不同演算法路徑）', () => {
  const r = welchTTest(WELCH_BASE);
  const reference = tTwoTailedP(r.t, r.df);
  close(r.p, reference, 1e-8, 'GV-1202 不完全 Beta 與 Simpson 積分結果不一致');
  close(r.p, 0.038249614516, 1e-7, 'GV-1202 p ≈ .0382');
});

test('GV-1203 Welch t：95% 臨界值必須符合標準 t 分配表（df=18 → 2.101）', () => {
  const r = welchTTest(WELCH_BASE);
  close(r.criticalT, 2.101, 5e-4, 'GV-1203 t(.975, 18) 表值為 2.101');
  close(r.criticalT, tCriticalTwoTailed05(18), 1e-6, 'GV-1203 與獨立反解不一致');
});

test('GV-1204 Welch t：95% 信賴區間 = 平均差 ± 臨界值 × SE，且必須包含 0 與否和 p 一致', () => {
  const r = welchTTest(WELCH_BASE);
  close(r.ciLow, -2 - 2.1009220402398565 * Math.sqrt(0.8), 1e-6, 'GV-1204 CI 下界');
  close(r.ciHigh, -2 + 2.1009220402398565 * Math.sqrt(0.8), 1e-6, 'GV-1204 CI 上界');
  assert.ok(r.ciHigh < 0, 'GV-1204 p < .05 時 CI 不得包含 0');
  const ns = welchTTest({ ...WELCH_BASE, mean2: 10.5 });
  assert.ok(ns.p > 0.05 && ns.ciLow < 0 && ns.ciHigh > 0, 'GV-1204 p > .05 時 CI 必須包含 0');
});

test('GV-1205 Welch t：Hedges g = d × J，J = 1 − 3/(4·df_pooled − 1)（Hedges 1981）', () => {
  // 推導：等 n 等 SD → 併組 SD = 2、Cohen d = −2/2 = −1；
  //      df_pooled = 18 → J = 1 − 3/71 = 0.9577465 → g = −0.9577465
  const r = welchTTest(WELCH_BASE);
  close(r.pooledSd, 2, 1e-12, 'GV-1205 併組標準差');
  close(r.hedgesG, -(1 - 3 / 71), 1e-12, 'GV-1205 Hedges g');
  close(r.hedgesG, -0.9577464788732394, 1e-12);
});

test('GV-1206 Welch t：交換兩組 → t 與平均差變號，p / df / 臨界值不變', () => {
  const a = welchTTest(WELCH_BASE);
  const b = welchTTest({ n1: 10, n2: 10, mean1: 12, mean2: 10, sd1: 2, sd2: 2 });
  close(b.t, -a.t, 1e-12, 'GV-1206 t 應變號');
  close(b.difference, -a.difference, 1e-12);
  close(b.p, a.p, 1e-12, 'GV-1206 雙尾 p 不得改變');
  close(b.df, a.df, 1e-12);
});

test('GV-1207 Welch t 邊界：n ≤ 1、SD ≤ 0、非整數 n 一律拒絕；t = 0 時 p = 1', () => {
  assert.equal(welchTTest({ ...WELCH_BASE, n1: 1 }), ERR);
  assert.equal(welchTTest({ ...WELCH_BASE, n1: 10.5 }), ERR);
  assert.equal(welchTTest({ ...WELCH_BASE, sd1: 0 }), ERR);
  assert.equal(welchTTest({ ...WELCH_BASE, sd2: -1 }), ERR);
  const same = welchTTest({ ...WELCH_BASE, mean2: 10 });
  assert.equal(same.t, 0);
  assert.equal(same.p, 1, 'GV-1207 t = 0 的雙尾 p 必須是 1');
});

test('GV-1208 Welch t：不等變異數情境（df 不再是整數）以獨立積分驗證', () => {
  // 預設示例：n=30/32、M=78.4/73.1、SD=8.2/9.5
  const r = welchTTest({ n1: 30, n2: 32, mean1: 78.4, mean2: 73.1, sd1: 8.2, sd2: 9.5 });
  const v1 = 8.2 ** 2 / 30;
  const v2 = 9.5 ** 2 / 32;
  close(r.df, (v1 + v2) ** 2 / (v1 ** 2 / 29 + v2 ** 2 / 31), 1e-12, 'GV-1208 Welch df 閉式');
  close(r.t, (78.4 - 73.1) / Math.sqrt(v1 + v2), 1e-12, 'GV-1208 t 閉式');
  close(r.p, tTwoTailedP(r.t, r.df), 1e-8, 'GV-1208 p 與獨立積分不一致');
  close(r.criticalT, tCriticalTwoTailed05(r.df), 1e-6, 'GV-1208 臨界值與獨立反解不一致');
});

/* ── 3.13 日期差計算 ─────────────────────────────────────────────────── */

test('GV-1301 日期差：同一天 — 含結束日 = 1 天，不含 = 0 天（關鍵 off-by-one）', () => {
  assert.equal(dateDifference('2026-03-10', '2026-03-10', true).totalDays, 1);
  assert.equal(dateDifference('2026-03-10', '2026-03-10', false).totalDays, 0);
});

test('GV-1302 日期差：2024-01-01 → 2024-01-31，不含 30 天／含 31 天', () => {
  assert.equal(dateDifference('2024-01-01', '2024-01-31', false).totalDays, 30);
  assert.equal(dateDifference('2024-01-01', '2024-01-31', true).totalDays, 31);
});

test('GV-1303 日期差：閏年二月 — 2024 為 29 天、2023 為 28 天', () => {
  assert.equal(dateDifference('2024-02-01', '2024-03-01', false).totalDays, 29);
  assert.equal(dateDifference('2023-02-01', '2023-03-01', false).totalDays, 28);
  assert.equal(dateDifference('2100-02-01', '2100-03-01', false).totalDays, 28, 'GV-1303 2100 非閏年');
  assert.equal(dateDifference('2000-02-01', '2000-03-01', false).totalDays, 29, 'GV-1303 2000 是閏年');
});

test('GV-1304 日期差：與獨立曆法演算法（Hinnant days_from_civil）逐一比對', () => {
  const cases = [['2020-01-01', '2026-09-07'], ['1970-01-01', '2000-01-01'], ['1999-12-31', '2000-03-01']];
  for (const [a, b] of cases) {
    const [ay, am, ad] = a.split('-').map(Number);
    const [by, bm, bd] = b.split('-').map(Number);
    const expected = daysFromCivil(by, bm, bd) - daysFromCivil(ay, am, ad);
    assert.equal(dateDifference(a, b, false).totalDays, expected, `GV-1304 ${a} → ${b}`);
  }
});

test('GV-1305 日期差：平日／週末計數必須加總等於總天數，且與 Sakamoto 演算法一致', () => {
  const r = dateDifference('2024-01-01', '2024-01-07', true);
  assert.equal(r.totalDays, 7);
  assert.equal(r.weekdays, 5, 'GV-1305 2024-01-01 為星期一，整週有 5 個平日');
  assert.equal(r.weekends, 2);
  // 獨立驗證（不使用 JS Date）
  let wk = 0;
  let we = 0;
  for (let d = daysFromCivil(2024, 1, 1); d <= daysFromCivil(2024, 1, 7); d += 1) {
    const [Y, M, D] = civilFromDays(d);
    const dw = dowSakamoto(Y, M, D);
    if (dw === 0 || dw === 6) we += 1; else wk += 1;
  }
  assert.equal(r.weekdays, wk);
  assert.equal(r.weekends, we);
  assert.equal(r.weekdays + r.weekends, r.totalDays, 'GV-1305 兩者加總必須等於總天數');
});

test('GV-1306 日期差：年月日拆解 — 整年、跨月尾日', () => {
  assert.deepEqual(dateDifference('2024-01-01', '2025-01-01', false).breakdown, { years: 1, months: 0, days: 0 });
  assert.deepEqual(dateDifference('2024-01-31', '2024-02-29', true).breakdown, { years: 0, months: 1, days: 1 },
    'GV-1306 1/31 + 1 月 → 2/29（月底夾取），再加 1 天到 3/1（含結束日）');
  assert.deepEqual(dateDifference('2026-03-15', '2026-03-14', false).breakdown, { years: 0, months: 0, days: 1 },
    'GV-1306 起訖顛倒時會自動交換');
});

test('GV-1307 日期差：非法日期輸入必須拒絕（含 2 月 30 日這種假日期）', () => {
  assert.equal(dateDifference('2026-02-30', '2026-03-01', false), ERR);
  assert.equal(dateDifference('2026-13-01', '2026-03-01', false), ERR);
  assert.equal(dateDifference('20260101', '2026-03-01', false), ERR);
  assert.equal(dateDifference('', '2026-03-01', false), ERR);
});

test('GV-1308 日期差：約略月數採 365.25/12 = 30.4375（儒略年平均月長）', () => {
  const r = dateDifference('2024-01-01', '2024-12-31', true);
  assert.equal(r.totalDays, 366);
  close(r.approxMonths, 366 / 30.4375, 1e-12, 'GV-1308 約略月數定義');
  close(r.approxMonths, 12.0246, 1e-4);
});

/* ── 3.14 工作日計算 ─────────────────────────────────────────────────── */

test('GV-1401 工作日：2026-01-01 ~ 01-31 含頭尾、跳過週末 → 22 個工作日', () => {
  // 獨立驗證：以 Sakamoto + Hinnant 逐日計數，不使用 JS Date。
  let wk = 0;
  let we = 0;
  for (let d = daysFromCivil(2026, 1, 1); d <= daysFromCivil(2026, 1, 31); d += 1) {
    const [Y, M, D] = civilFromDays(d);
    const dw = dowSakamoto(Y, M, D);
    if (dw === 0 || dw === 6) we += 1; else wk += 1;
  }
  const r = businessDays('2026-01-01', '2026-01-31');
  assert.equal(r.totalDays, 31);
  assert.equal(r.weekendDays, we);
  assert.equal(r.businessDays, wk);
  assert.equal(r.businessDays, 22);
  assert.equal(r.weekendDays, 9);
});

test('GV-1402 工作日：含／不含結束日的 off-by-one 必須恰差一天', () => {
  const inc = businessDays('2026-01-01', '2026-01-31', { includeEnd: true });
  const exc = businessDays('2026-01-01', '2026-01-31', { includeEnd: false });
  assert.equal(inc.totalDays - exc.totalDays, 1, 'GV-1402 總天數差 1');
  // 2026-01-31 是星期六，因此工作日數不受影響
  assert.equal(dowSakamoto(2026, 1, 31), 6, 'GV-1402 2026-01-31 應為星期六');
  assert.equal(inc.businessDays, exc.businessDays);
  // 換成結束日為平日的情形，工作日數必須差 1
  const incWd = businessDays('2026-01-01', '2026-01-30', { includeEnd: true });
  const excWd = businessDays('2026-01-01', '2026-01-30', { includeEnd: false });
  assert.equal(incWd.businessDays - excWd.businessDays, 1, 'GV-1402 結束日為平日時工作日差 1');
});

test('GV-1403 工作日：單日 — 平日 1、週末 0', () => {
  assert.equal(businessDays('2026-01-01', '2026-01-01').businessDays, 1, 'GV-1403 2026-01-01 為星期四');
  assert.equal(businessDays('2026-01-03', '2026-01-03').businessDays, 0, 'GV-1403 2026-01-03 為星期六');
  assert.equal(businessDays('2026-01-03', '2026-01-03').weekendDays, 1);
});

test('GV-1404 工作日：假日扣除，且落在週末的假日不得重複扣除', () => {
  const withHoliday = businessDays('2026-01-01', '2026-01-31', { holidays: ['2026-01-01'] });
  assert.equal(withHoliday.holidayDays, 1);
  assert.equal(withHoliday.businessDays, 21, 'GV-1404 22 − 1');
  // 2026-01-03 是星期六：跳過週末時不得再算成假日
  const weekendHoliday = businessDays('2026-01-01', '2026-01-31', { holidays: ['2026-01-03'] });
  assert.equal(weekendHoliday.holidayDays, 0, 'GV-1404 週末假日不重複計數');
  assert.equal(weekendHoliday.businessDays, 22, 'GV-1404 工作日不變');
  // 不跳過週末時，週末假日才會被計為假日
  const noSkip = businessDays('2026-01-01', '2026-01-31', { skipWeekends: false, holidays: ['2026-01-03'] });
  assert.equal(noSkip.holidayDays, 1);
  assert.equal(noSkip.businessDays, 30, 'GV-1404 31 天扣 1 假日');
});

test('GV-1405 工作日：不跳過週末時，工作日 + 假日 = 總天數', () => {
  const r = businessDays('2026-01-01', '2026-01-31', { skipWeekends: false, holidays: ['2026-01-01'] });
  assert.equal(r.businessDays + r.holidayDays, r.totalDays);
});

test('GV-1406 工作日：跳過週末時，工作日 + 週末 + 假日 = 總天數', () => {
  const r = businessDays('2026-01-01', '2026-01-31', { holidays: ['2026-01-01', '2026-01-03'] });
  assert.equal(r.businessDays + r.weekendDays + r.holidayDays, r.totalDays,
    'GV-1406 三個顯示欄位必須完整拆分總天數');
});

test('GV-1407 工作日：無效假日字串被忽略、起訖顛倒自動交換', () => {
  const r = businessDays('2026-01-01', '2026-01-31', { holidays: ['not-a-date', '2026-01-01'] });
  assert.equal(r.holidayDays, 1);
  const swapped = businessDays('2026-01-31', '2026-01-01');
  assert.equal(swapped.totalDays, 31);
  assert.equal(swapped.businessDays, 22);
});

test('GV-1408 假日預設檔：法國 2026 的三個「移動節日」必須符合 Computus 推算', () => {
  // 獨立推導：格里曆復活節（Meeus/Jones/Butcher）→ 2026-04-05。
  // 復活節星期一 = +1 日、耶穌升天 = +39 日、聖靈降臨節星期一 = +50 日。
  const [ey, em, ed] = easterGregorian(2026);
  assert.deepEqual([ey, em, ed], [2026, 4, 5], 'GV-1408 2026 年復活節');
  const base = daysFromCivil(ey, em, ed);
  const iso = (offset) => {
    const [Y, M, D] = civilFromDays(base + offset);
    return `${Y}-${String(M).padStart(2, '0')}-${String(D).padStart(2, '0')}`;
  };
  assert.ok(HOLIDAY_PRESETS.fr2026.includes(iso(1)), `GV-1408 復活節星期一 ${iso(1)} 應在預設檔內`);
  assert.ok(HOLIDAY_PRESETS.fr2026.includes(iso(39)), `GV-1408 耶穌升天 ${iso(39)} 應在預設檔內`);
  assert.ok(HOLIDAY_PRESETS.fr2026.includes(iso(50)), `GV-1408 聖靈降臨節星期一 ${iso(50)} 應在預設檔內`);
  assert.equal(HOLIDAY_PRESETS.fr2026.length, 11, 'GV-1408 法國勞動法典 L3133-1 列 11 個國定假日');
});

test('GV-1409 假日預設檔：台灣 2026 預設中，原始碼註解宣稱的星期必須正確', () => {
  // 註解宣稱：2/28 週六、4/4 週六、4/5 週日、10/10 週六、10/25 週日（因此才有補假）。
  // 以 Sakamoto 獨立驗證這些「補假理由」是否成立。
  const names = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  assert.equal(names[dowSakamoto(2026, 2, 28)], 'Sat', 'GV-1409 和平紀念日 2/28');
  assert.equal(names[dowSakamoto(2026, 4, 4)], 'Sat', 'GV-1409 兒童節 4/4');
  assert.equal(names[dowSakamoto(2026, 4, 5)], 'Sun', 'GV-1409 清明節 4/5');
  assert.equal(names[dowSakamoto(2026, 10, 10)], 'Sat', 'GV-1409 國慶日 10/10');
  assert.equal(names[dowSakamoto(2026, 10, 25)], 'Sun', 'GV-1409 臺灣光復節 10/25');
  // 預設檔內每一個日期都必須是平日，否則跳過週末時該筆等同無效
  const weekendEntries = HOLIDAY_PRESETS.tw2026.filter((iso) => {
    const [Y, M, D] = iso.split('-').map(Number);
    const dw = dowSakamoto(Y, M, D);
    return dw === 0 || dw === 6;
  });
  assert.deepEqual(weekendEntries, [], `GV-1409 預設檔含週末日期（跳過週末時無作用）：${weekendEntries.join(', ')}`);
});

/* ── 3.15 年齡計算器 ─────────────────────────────────────────────────── */

test('GV-1501 年齡：可手算 — 2000-03-15 至 2026-09-07 = 26 歲 5 個月 23 天', () => {
  // 推導：2000-03-15 + 26 年 = 2026-03-15；+5 月 = 2026-08-15；
  //      8/15 → 9/7 = (31 − 15) + 7 = 23 天。
  const r = ageCalculator('2000-03-15', '2026-09-07');
  assert.deepEqual(r.age, { years: 26, months: 5, days: 23 });
});

test('GV-1502 年齡：生日當天 = 0 歲 0 月 0 天，距下次生日 0 天', () => {
  const r = ageCalculator('2026-09-07', '2026-09-07');
  assert.deepEqual(r.age, { years: 0, months: 0, days: 0 });
  assert.equal(r.daysLived, 0);
  assert.equal(r.nextBirthdayDays, 0);
});

test('GV-1503 年齡：生日前一天仍是前一歲（經典 off-by-one）', () => {
  assert.deepEqual(ageCalculator('2000-09-08', '2026-09-07').age, { years: 25, months: 11, days: 30 });
  assert.deepEqual(ageCalculator('2000-09-07', '2026-09-07').age, { years: 26, months: 0, days: 0 });
  assert.equal(ageCalculator('2000-09-08', '2026-09-07').nextBirthdayDays, 1);
});

test('GV-1504 年齡：2 月 29 日出生者在平年以 2 月 28 日為生日（夾取至月底）', () => {
  const r = ageCalculator('2000-02-29', '2001-02-28');
  assert.deepEqual(r.age, { years: 1, months: 0, days: 0 });
  assert.equal(r.nextBirthdayDays, 0, 'GV-1504 平年 2/28 即視為生日當天');
  assert.deepEqual(ageCalculator('2000-02-29', '2004-02-29').age, { years: 4, months: 0, days: 0 });
});

test('GV-1505 年齡：已活天數與獨立曆法演算法一致，且未來日期被拒絕', () => {
  const r = ageCalculator('1990-06-15', '2026-09-07');
  assert.equal(r.daysLived, daysFromCivil(2026, 9, 7) - daysFromCivil(1990, 6, 15));
  assert.equal(r.hoursLived, r.daysLived * 24);
  assert.equal(r.heartbeats, r.daysLived * 1440 * 70, 'GV-1505 心跳採 70 bpm 假設（已標示「約」）');
  assert.equal(ageCalculator('2026-09-08', '2026-09-07'), ERR, 'GV-1505 生日晚於基準日必須拒絕');
});

test('GV-1506 年齡：跨閏日的天數計算（2024-02-28 → 2024-03-01 為 2 天）', () => {
  assert.equal(ageCalculator('2024-02-28', '2024-03-01').daysLived, 2);
  assert.equal(ageCalculator('2023-02-28', '2023-03-01').daysLived, 1);
});

/* ── 3.16 時間戳記轉換 ───────────────────────────────────────────────── */

test('GV-1601 時間戳：0 → 1970-01-01T00:00:00.000Z（Unix 紀元定義）', () => {
  const r = timestampConvert('0');
  assert.equal(r.iso, '1970-01-01T00:00:00.000Z');
  assert.equal(r.unixSeconds, 0);
  assert.equal(r.unixMilliseconds, 0);
});

test('GV-1602 時間戳：1700000000 秒 → 2023-11-14T22:13:20Z（以獨立曆法推導）', () => {
  // 推導：1700000000 ÷ 86400 = 19675 天餘 80000 秒；19675 天後為 2023-11-14；
  //      80000 秒 = 22 時 13 分 20 秒。
  const [Y, M, D] = civilFromDays(Math.floor(1700000000 / 86400));
  assert.deepEqual([Y, M, D], [2023, 11, 14]);
  const r = timestampConvert('1700000000');
  assert.equal(r.mode, 'seconds');
  assert.equal(r.iso, '2023-11-14T22:13:20.000Z');
  assert.equal(r.unixSeconds, 1700000000);
});

test('GV-1603 時間戳：auto 判別門檻在 1e11（含 off-by-one 邊界）', () => {
  assert.equal(timestampConvert('99999999999').mode, 'seconds', 'GV-1603 < 1e11 判為秒');
  assert.equal(timestampConvert('100000000000').mode, 'milliseconds', 'GV-1603 ≥ 1e11 判為毫秒');
  const ms = timestampConvert('100000000000');
  assert.equal(ms.iso, '1973-03-03T09:46:40.000Z');
  // 副作用：1973-03-03 之前的毫秒時間戳會被 auto 誤判為秒（已知限制）
  assert.equal(timestampConvert('1000').mode, 'seconds');
  assert.equal(timestampConvert('1000', 'milliseconds').iso, '1970-01-01T00:00:01.000Z');
});

test('GV-1604 時間戳：負值（紀元前）— 秒數採 floor 語意', () => {
  assert.equal(timestampConvert('-86400').iso, '1969-12-31T00:00:00.000Z');
  assert.equal(timestampConvert('-86400').unixSeconds, -86400);
  assert.equal(timestampConvert('-1500', 'milliseconds').unixSeconds, -2,
    'GV-1604 Unix 秒定義為向下取整，−1.5 秒應為 −2');
});

test('GV-1605 時間戳：來回轉換一致，非法輸入被拒絕', () => {
  for (const seconds of [1, 946684800, 2147483647]) {
    assert.equal(timestampConvert(String(seconds)).unixSeconds, seconds, `GV-1605 ${seconds}`);
  }
  assert.equal(timestampConvert(''), ERR);
  assert.equal(timestampConvert('abc'), ERR);
  assert.equal(timestampConvert('1e400'), ERR, 'GV-1605 Infinity 必須拒絕');
});

/* ── 3.17 複利圖表：折線與長條的 x 座標對應 ──────────────────────────── */

test('[RED:P2] GV-1701 複利圖表：長條與折線必須落在同一個 x 座標系', () => {
  // drawChart() 中：長條 x = 36 + (i / n) × 560、折線點 x = 40 + (i /(n − 1)) × 560。
  // 兩者分母不同，同一年的長條與折點會逐年拉開，最後一年可差 60px 以上，
  // 使用者看到的圖形因此無法對應資料點。
  const n = 10;
  const barX = (i) => 36 + (i / Math.max(1, n)) * 560;
  const pointX = (i) => 40 + (i / Math.max(1, n - 1)) * 560;
  // 長條寬 8，故其中心為 x + 4；折線點應落在長條中心上。
  const gaps = Array.from({ length: n }, (_, i) => Math.abs(barX(i) + 4 - pointX(i)));
  const maxGap = Math.max(...gaps);
  assert.ok(maxGap < 1,
    `GV-1701 長條與折線 x 座標最大偏移 ${maxGap.toFixed(1)}px（應為 0），圖表與資料不對應`);
});
