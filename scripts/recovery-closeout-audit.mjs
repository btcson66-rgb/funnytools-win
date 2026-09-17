import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  analyzeItemFromCounts,
  calculateKr20,
  calculateRequiredFinalGrade,
  parseNumericRows,
} from '../src/lib/education-recovery.ts';
import {
  builtPages,
  isIndexablePage,
  readCurrentSitemapEntries,
  readJson,
  writeJson,
} from './seo-indexing-utils.mjs';
import { extractVisibleMain, findEditorialLeakage } from './editorial-leakage-audit.mjs';

const root = process.cwd();
const reportDir = join(root, 'reports', 'recovery-closeout-002');
const fail = (condition, message) => { if (!condition) failures.push(message); };
const failures = [];
const baselineUrls = readFileSync(join(reportDir, 'baseline-sitemap-urls.txt'), 'utf8').split(/\r?\n/).filter(Boolean);
const currentEntries = readCurrentSitemapEntries();
const currentUrls = [...new Set(currentEntries.map((entry) => entry.loc))].sort();
const pages = builtPages();
const indexable = pages.filter(isIndexablePage);
const protectedData = readJson(join(root, 'reports', 'education-recovery-001', 'protected-urls.json'), { urls: [] });
const phaseData = readJson(join(root, 'reports', 'education-recovery-001', 'phase2b-protection-before.json'), { urls: [] });
const expectedTools = [
  '/tools/final-grade-needed-calculator/',
  '/tools/item-analysis-calculator/',
  '/tools/kr20-reliability-calculator/',
];
const toolUrls = currentEntries.filter((entry) => entry.sitemap === 'sitemap-tools.xml').map((entry) => new URL(entry.loc).pathname);
const guideHtmlPath = join(root, 'dist', 'guides', 'final-exam-score-needed-guide', 'index.html');
const finalToolHtmlPath = join(root, 'dist', 'tools', 'final-grade-needed-calculator', 'index.html');
const hubHtmlPath = join(root, 'dist', 'education-statistics', 'index.html');
const guideHtml = existsSync(guideHtmlPath) ? readFileSync(guideHtmlPath, 'utf8') : '';
const finalToolHtml = existsSync(finalToolHtmlPath) ? readFileSync(finalToolHtmlPath, 'utf8') : '';
const hubHtml = existsSync(hubHtmlPath) ? readFileSync(hubHtmlPath, 'utf8') : '';
const visible = (html) => extractVisibleMain(html);
const leakage = currentEntries.flatMap((entry) => {
  const page = pages.find((candidate) => candidate.loc === entry.loc);
  const text = visible(page?.html ?? '');
  return findEditorialLeakage(text).map((pattern) => ({ url: entry.loc, pattern }));
});

fail(currentUrls.length === 717, `sitemap URL count is ${currentUrls.length}, expected 717`);
fail(JSON.stringify(currentUrls) === JSON.stringify([...baselineUrls].sort()), 'sitemap URL surface differs from closeout baseline');
fail(pages.length === 1182, `built HTML count is ${pages.length}, expected 1182`);
fail(indexable.length === 717, `indexable page count is ${indexable.length}, expected 717`);
fail(protectedData.urls.length === 94, `protected URL count is ${protectedData.urls.length}, expected 94`);
fail(phaseData.urls.length === 40, `Phase 2B count is ${phaseData.urls.length}, expected 40`);
fail(expectedTools.every((route) => toolUrls.includes(route)), 'one or more of the three education tools is missing');
fail(expectedTools.every((route) => !toolUrls.includes(`/en${route}`)), 'an unexpected English clone of an education tool exists');
fail(leakage.length === 0, `editorial leakage found: ${JSON.stringify(leakage)}`);
fail(!/目前沒有專門|FunnyTools有專門反推工具嗎？目前沒有/.test(visible(guideHtml)), 'stale final-grade guide statement remains');
fail(guideHtml.includes('/tools/final-grade-needed-calculator/'), 'guide-to-calculator link missing');
fail(finalToolHtml.includes('/guides/final-exam-score-needed-guide/'), 'calculator-to-guide link missing');
fail(/成績、試題分析與研究工具/.test(hubHtml.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? ''), 'rendered education-statistics title is stale');

const finalGolden = calculateRequiredFinalGrade({ target: 80, completedRows: [{ rawScore: 85, maxScore: 100, weight: 30 }, { rawScore: 78, maxScore: 100, weight: 30 }], remainingWeight: 40, remainingMaxScore: 100 });
const itemGolden = analyzeItemFromCounts({ totalCorrect: 26, totalN: 40, highCorrect: 9, highN: 11, lowCorrect: 5, lowN: 11 });
const krGolden = calculateKr20([[1, 1, 0, 1, 1], [1, 0, 1, 1, 0], [1, 1, 1, 1, 1], [0, 0, 1, 0, 0], [0, 1, 0, 0, 1], [0, 0, 0, 1, 0]]);
fail(Math.abs(finalGolden.required - 77.75) < 1e-9, 'final-grade golden result failed');
fail(Math.abs(itemGolden?.discrimination - (4 / 11)) < 1e-9, 'item-analysis golden result failed');
fail(Math.abs(krGolden.value - 0.6770833333333333) < 1e-9, 'KR-20 golden result failed');
fail(calculateRequiredFinalGrade({ target: Number.NaN, earnedWeightedPoints: 0, remainingWeight: 40 }).status === 'invalid', 'blank final-grade input is not invalid');
fail(analyzeItemFromCounts({ totalCorrect: 0, totalN: 0, highCorrect: 0, highN: 1, lowCorrect: 0, lowN: 1 }) === null, 'blank item-analysis input is not invalid');
fail(calculateKr20(parseNumericRows('1,,0\n1,0,1')).status === 'invalid', 'blank KR-20 cell is not invalid');

const manifestPath = join(root, 'reports', 'indexing-submission-manifest.json');
const manifest = readJson(manifestPath, null);
fail(Array.isArray(manifest?.urls) && manifest.urls.length > 0, 'validated indexing submission manifest has no candidates');
const runDryRun = (script) => JSON.parse(execFileSync(process.execPath, [script, '--dry-run'], { cwd: root, encoding: 'utf8' }));
let indexNowDryRun = null;
let bingDryRun = null;
try { indexNowDryRun = runDryRun('scripts/submit-indexnow.mjs'); } catch (error) { failures.push(`IndexNow dry-run failed: ${error.message}`); }
try { bingDryRun = runDryRun('scripts/submit-bing-urls.mjs'); } catch (error) { failures.push(`Bing dry-run failed: ${error.message}`); }
fail((indexNowDryRun?.attempted ?? 0) > 0, 'IndexNow dry-run attempted is not greater than zero');
fail((bingDryRun?.attempted ?? 0) > 0, 'Bing dry-run attempted is not greater than zero');
fail(indexNowDryRun?.attempted === bingDryRun?.attempted, 'IndexNow/Bing dry-run candidate counts differ');

const report = {
  generatedAt: new Date().toISOString(),
  status: failures.length ? 'FAIL' : 'PASS',
  urlSurface: { current: currentUrls.length, baseline: baselineUrls.length, unchanged: JSON.stringify(currentUrls) === JSON.stringify([...baselineUrls].sort()) },
  builtHtml: pages.length,
  indexable: indexable.length,
  protected: protectedData.urls.length,
  phase2b: phaseData.urls.length,
  educationTools: expectedTools,
  editorialLeakage: leakage,
  staleGuideStatements: 0,
  finalGrade: { required: finalGolden.required, status: finalGolden.status },
  itemAnalysis: itemGolden ? { p: itemGolden.p, pHigh: itemGolden.pHigh, pLow: itemGolden.pLow, discrimination: itemGolden.discrimination } : null,
  kr20: { value: krGolden.value, sumPQ: krGolden.sumPQ, variance: krGolden.variance },
  indexingDryRun: { indexNow: indexNowDryRun, bing: bingDryRun },
  failures,
};
writeJson(join(reportDir, 'closeout-audit.json'), report);
console.log(JSON.stringify(report, null, 2));
if (failures.length) process.exitCode = 1;
