import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Papa from 'papaparse';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const reportRoot = path.join(root, 'reports');
const generatedAt = new Date().toISOString();
const buildVersion = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8')).version;
const args = process.argv.slice(2);
const inputIndex = args.indexOf('--input');
const inputPath = inputIndex >= 0 ? path.resolve(args[inputIndex + 1] ?? '') : '';
const dataAvailable = Boolean(inputPath && fs.existsSync(inputPath));
const thresholds = { newPageGraceDays: 90, minImpressionsCtr: 100, minImpressionsStriking: 100, strikingDistance: [[4, 10], [11, 20]], decayDrop: 0.3, minImpressionsDecay: 100 };
function write(name, value) { fs.mkdirSync(reportRoot, { recursive: true }); fs.writeFileSync(path.join(reportRoot, name), `${JSON.stringify({ generatedAt, environment: 'local-csv-adapter', buildVersion, dataAvailable, ...value }, null, 2)}\n`, 'utf8'); }
function noData(note = '沒有提供 GSC/CSV 資料；僅建立 pipeline，不填入推測數值。') { return { status: 'no-data', rows: 0, records: [], skippedChecks: [note, 'GSC API/BigQuery credentials and exports were not used'] }; }

let rows = [];
if (dataAvailable) {
  const parsed = Papa.parse(fs.readFileSync(inputPath, 'utf8'), { header: true, skipEmptyLines: true });
  rows = parsed.data.map((row) => ({ ...row, clicks: Number(row.clicks), impressions: Number(row.impressions), avg_position: Number(row.avg_position), page_age_days: Number(row.page_age_days) })).filter((row) => row.page_id && Number.isFinite(row.impressions) && Number.isFinite(row.clicks));
}
const issueRows = dataAvailable ? [] : ['data source unavailable'];
const keyFor = (row) => `${row.page_id}::${row.query}`;
const groups = new Map();
for (const row of rows) { const list = groups.get(keyFor(row)) ?? []; list.push(row); groups.set(keyFor(row), list); }
const recent = (list) => list.filter((row) => row.period === 'recent');
const prior = (list) => list.filter((row) => row.period === 'prior');
const sum = (list, field) => list.reduce((total, row) => total + (Number(row[field]) || 0), 0);
const aggregate = (list) => ({ clicks: sum(list, 'clicks'), impressions: sum(list, 'impressions'), ctr: sum(list, 'impressions') ? sum(list, 'clicks') / sum(list, 'impressions') : null, avgPosition: list.length ? list.reduce((total, row) => total + row.avg_position, 0) / list.length : null });
const matrix = [...groups.entries()].map(([key, list]) => { const current = aggregate(recent(list)); const previous = aggregate(prior(list)); return { key, pageId: list[0].page_id, url: list[0].url, query: list[0].query, locale: list[0].locale, device: list[0].device, pageType: list[0].page_type, pageAgeDays: list[0].page_age_days, recent: current, prior: previous }; });
const observedCtr = matrix.filter((row) => row.recent.impressions >= thresholds.minImpressionsCtr && row.recent.ctr != null).map((row) => row.recent.ctr).sort((a, b) => a - b);
const medianCtr = observedCtr.length ? observedCtr[Math.floor(observedCtr.length / 2)] : null;
const ctrOpportunities = matrix.filter((row) => row.recent.impressions >= thresholds.minImpressionsCtr && medianCtr != null && row.recent.ctr < medianCtr).map((row) => ({ ...row, evidence: 'below this site-build input median; not an external benchmark' }));
const strikingDistance = matrix.filter((row) => row.recent.impressions >= thresholds.minImpressionsStriking && row.recent.avgPosition != null && row.recent.avgPosition >= 4 && row.recent.avgPosition <= 20);
const risingQueries = matrix.filter((row) => row.recent.impressions > row.prior.impressions && row.recent.clicks >= row.prior.clicks).sort((a, b) => b.recent.impressions - a.recent.impressions);
const contentDecay = matrix.filter((row) => row.prior.impressions >= thresholds.minImpressionsDecay && ((row.prior.clicks - row.recent.clicks) / Math.max(row.prior.clicks, 1) >= thresholds.decayDrop || (row.prior.impressions - row.recent.impressions) / row.prior.impressions >= thresholds.decayDrop)).map((row) => ({ ...row, action: 'review-only', reason: 'recent period declined against supplied prior period' }));
const byQuery = new Map();
for (const row of matrix) { const list = byQuery.get(row.query) ?? []; list.push(row); byQuery.set(row.query, list); }
const cannibalization = [...byQuery.entries()].filter(([, list]) => list.length > 1 && sum(list.map((row) => row.recent), 'impressions') >= thresholds.minImpressionsCtr).map(([query, list]) => ({ query, urls: list.map((row) => ({ url: row.url, impressions: row.recent.impressions, share: row.recent.impressions / sum(list.map((candidate) => candidate.recent), 'impressions') })), action: 'candidate-review-only', reason: 'multiple URLs share a query; no automatic merge or redirect' }));
const lifecycleRecommendations = [...ctrOpportunities.map((row) => ({ pageId: row.pageId, query: row.query, recommendation: 'improve', confidence: row.recent.impressions >= 1000 ? 'medium' : 'low', destructive: false })), ...contentDecay.map((row) => ({ pageId: row.pageId, query: row.query, recommendation: 'refresh-review', confidence: 'low', destructive: false }))];
const localePerformance = [...new Set(matrix.map((row) => row.locale))].map((locale) => ({ locale, rows: matrix.filter((row) => row.locale === locale).length, clicks: sum(matrix.filter((row) => row.locale === locale).map((row) => row.recent), 'clicks'), impressions: sum(matrix.filter((row) => row.locale === locale).map((row) => row.recent), 'impressions') }));
const common = dataAvailable ? { status: 'measured-from-supplied-csv', rows: rows.length, skippedChecks: ['API completeness', 'BigQuery history', 'causal attribution'] } : noData();
write('task016-data-architecture.json', dataAvailable ? { status: 'measured', inputPath, rowCount: rows.length, columns: Object.keys(rows[0] ?? {}), stablePageIdField: 'page_id', skippedChecks: ['GSC API/BigQuery adapter execution'] } : noData());
write('gsc-data-source-status.json', dataAvailable ? { status: 'csv-imported', source: inputPath, rowCount: rows.length, findings: [] } : noData());
write('gsc-url-mapping.json', dataAvailable ? { status: 'measured', rows: rows.length, records: [...new Map(rows.map((row) => [row.page_id, { pageId: row.page_id, url: row.url, pageType: row.page_type }])).values()], skippedChecks: ['live URL Inspection'] } : noData());
write('page-query-matrix.json', dataAvailable ? { ...common, records: matrix } : noData());
write('ctr-baseline.json', dataAvailable ? { ...common, baseline: { observedMedianCtr: medianCtr, bucketCount: observedCtr.length }, policy: 'site-observed only; not a generic CTR curve' } : noData());
write('ctr-opportunities.json', dataAvailable ? { ...common, records: ctrOpportunities } : noData());
write('striking-distance.json', dataAvailable ? { ...common, records: strikingDistance, thresholds } : noData());
write('rising-queries.json', dataAvailable ? { ...common, records: risingQueries } : noData());
write('content-decay.json', dataAvailable ? { ...common, records: contentDecay, thresholds } : noData());
write('cannibalization-candidates.json', dataAvailable ? { ...common, records: cannibalization } : noData());
write('page-lifecycle-recommendations.json', dataAvailable ? { ...common, records: lifecycleRecommendations, destructiveActionsExecuted: false } : noData());
write('locale-search-performance.json', dataAvailable ? { ...common, records: localePerformance, skippedChecks: ['locale translation quality'] } : noData());
write('seo-change-log.json', { status: 'measured-no-auto-changes', rows: dataAvailable ? rows.length : 0, records: [], destructiveActionsExecuted: false, skippedChecks: ['external release history not joined'] });
write('monthly-seo-priority-queue.json', dataAvailable ? { ...common, records: lifecycleRecommendations.sort((a, b) => (b.confidence === 'medium') - (a.confidence === 'medium')).slice(0, 100), policy: 'review queue only; no automatic rewrite/merge/delete' } : noData());
write('task016-final-report.json', { status: dataAvailable ? 'measured-review-queue' : 'pipeline-ready-no-data', source: dataAvailable ? inputPath : null, rows: rows.length, reportsGenerated: 15, destructiveActionsExecuted: false, recommendationsAreCandidatesOnly: true, skippedChecks: dataAvailable ? ['production attribution', 'API completeness', 'human review'] : ['GSC CSV/API/BigQuery data', 'all performance metrics', 'human review'], testBuildStatus: 'CSV adapter and report generator executed' });
console.log(JSON.stringify({ dataAvailable, inputPath: dataAvailable ? inputPath : null, rows: rows.length, matrixRows: matrix.length, ctrOpportunities: ctrOpportunities.length, strikingDistance: strikingDistance.length, contentDecay: contentDecay.length, cannibalizationCandidates: cannibalization.length, destructiveActionsExecuted: false }, null, 2));
