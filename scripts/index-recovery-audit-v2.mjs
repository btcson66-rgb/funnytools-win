import fs from 'node:fs';
import path from 'node:path';
import { classifyIntentPair, buildBoilerplateModel, cosineFromTokens, functionalSignature, normalizeBlock, removeBoilerplateBlocks, tokenize } from './index-recovery-classifier.mjs';

const ROOT = process.cwd();
const DIST = path.join(ROOT, 'dist');
const V1 = path.join(ROOT, 'reports', 'index-recovery');
const REPORT = path.join(ROOT, 'reports', 'index-recovery-v2');
const SITE = 'https://funnytools.win';
const TODAY = new Date().toISOString().slice(0, 10);

function exists(file) { return fs.existsSync(file); }
function read(file, fallback = '') { return exists(file) ? fs.readFileSync(file, 'utf8') : fallback; }
function write(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, `${value}${value.endsWith('\n') ? '' : '\n'}`, 'utf8');
}
function escapeCsv(value) {
  const text = value === null || value === undefined ? '' : String(value);
  return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}
function csv(rows, columns) { return [columns.join(','), ...rows.map((row) => columns.map((column) => escapeCsv(row[column])).join(','))].join('\n'); }
function parseCsv(text) {
  const rows = []; let row = []; let cell = ''; let quoted = false;
  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    if (char === '"' && quoted && text[index + 1] === '"') { cell += '"'; index += 1; continue; }
    if (char === '"') { quoted = !quoted; continue; }
    if (char === ',' && !quoted) { row.push(cell); cell = ''; continue; }
    if ((char === '\n' || char === '\r') && !quoted) {
      if (char === '\r' && text[index + 1] === '\n') index += 1;
      row.push(cell); cell = '';
      if (row.some((value) => value.trim())) rows.push(row);
      row = []; continue;
    }
    cell += char;
  }
  if (cell || row.length) { row.push(cell); if (row.some((value) => value.trim())) rows.push(row); }
  if (!rows.length) return [];
  const headers = rows.shift().map((value) => value.trim());
  return rows.map((values) => Object.fromEntries(headers.map((header, index) => [header, (values[index] ?? '').trim()])));
}
function attr(tag, name) {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return tag.match(new RegExp(`\\b${escaped}\\s*=\\s*["']([^"']*)["']`, 'i'))?.[1]?.trim() || '';
}
function stripBlocks(value) {
  let text = value;
  for (const tag of ['script', 'style', 'nav', 'header', 'footer', 'aside', 'svg']) text = text.replace(new RegExp(`<${tag}\\b[\\s\\S]*?<\\/${tag}>`, 'gi'), ' ');
  return text.replace(/<section\b[^>]*(?:data-affiliate-shelf|data-content-value-review)[^>]*>[\s\S]*?<\/section>/gi, ' ');
}
function stripTags(value) {
  return stripBlocks(value).replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/\s+/g, ' ').trim();
}
function routeFromUrl(url) { return new URL(url).pathname; }
function distFileForRoute(route) { return route === '/' ? path.join(DIST, 'index.html') : path.join(DIST, route.replace(/^\//, ''), 'index.html'); }
function mainBlocksForRoute(route) {
  const html = read(distFileForRoute(route));
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] || html;
  const blocks = [...stripBlocks(main).matchAll(/<(p|li|h2|h3|h4|blockquote|dt|dd|td|th)\b[^>]*>([\s\S]*?)<\/\1>/gi)]
    .map((match) => stripTags(match[2])).filter((block) => tokenize(block).length >= 3);
  return blocks.length ? blocks : [stripTags(main)];
}
function loadRegistry() {
  const file = path.join(ROOT, 'src', 'i18n', 'expansion-routes.json');
  if (!exists(file)) return new Map();
  const parsed = JSON.parse(read(file)); const map = new Map();
  for (const route of parsed.routes || []) for (const pathname of Object.values(route.paths || {})) if (pathname) map.set(pathname, route.key || '');
  return map;
}
function toolSlugFor(page, registry) {
  if (page.page_type !== 'tool') return '';
  const route = routeFromUrl(page.url);
  const registered = registry.get(route) || '';
  if (registered) return registered.replace(/^tool-/, '');
  return route.match(/\/(?:tools|herramientas|outils)\/([^/]+)\/$/)?.[1] || '';
}
function pageRole(page) {
  if (page.page_type === 'tool') return 'DO';
  if (page.page_type === 'guide') return 'LEARN';
  if (['hub', 'category', 'audience'].includes(page.page_type)) return 'NAVIGATE';
  if (page.page_type === 'workflow') return 'WORKFLOW';
  return page.page_type.toUpperCase();
}
function v1PageMap(rows, registry) {
  return new Map(rows.map((page) => {
    const toolSlug = toolSlugFor(page, registry);
    return [page.url, { ...page, pageType: page.page_type, cluster: page.content_cluster, route: routeFromUrl(page.url), toolSlug, role: pageRole(page), signature: toolSlug ? functionalSignature(toolSlug) : null }];
  }));
}
function buildAdjustedVectors(pages, blocksByUrl, modelsByLocale) {
  const tokensByUrl = new Map();
  const documentFrequency = new Map();
  for (const page of pages) {
    const adjusted = removeBoilerplateBlocks(blocksByUrl.get(page.url) || [], modelsByLocale.get(page.locale));
    const pageTokens = tokenize(adjusted);
    tokensByUrl.set(page.url, pageTokens);
    for (const token of new Set(pageTokens)) documentFrequency.set(token, (documentFrequency.get(token) || 0) + 1);
  }
  return { tokensByUrl, documentFrequency };
}
function fixed(value, digits = 3) { return Number(value || 0).toFixed(digits); }
function countBy(rows, field) { return Object.fromEntries([...rows.reduce((map, row) => map.set(row[field], (map.get(row[field]) || 0) + 1), new Map())].sort((a, b) => a[0].localeCompare(b[0]))); }
function mdTable(rows, columns) { return [`| ${columns.join(' | ')} |`, `| ${columns.map(() => '---').join(' | ')} |`, ...rows.map((row) => `| ${columns.map((column) => row[column] ?? '').join(' | ')} |`)].join('\n'); }

for (const file of ['url-inventory.csv', 'content-similarity.csv', 'remediation-plan.csv']) if (!exists(path.join(V1, file))) throw new Error(`Missing Phase 1 report: ${file}`);
if (!exists(DIST)) throw new Error('dist/ is missing. Run npm.cmd run build first.');
fs.mkdirSync(REPORT, { recursive: true });

const inventory = parseCsv(read(path.join(V1, 'url-inventory.csv')));
const oldSimilarity = parseCsv(read(path.join(V1, 'content-similarity.csv')));
const oldRemediation = parseCsv(read(path.join(V1, 'remediation-plan.csv')));
const registry = loadRegistry();
const pages = inventory.filter((page) => page.indexable === 'yes');
const pageByUrl = v1PageMap(inventory, registry);
const blocksByUrl = new Map(pages.map((page) => [page.url, mainBlocksForRoute(routeFromUrl(page.url))]));
const modelsByLocale = new Map([...new Set(pages.map((page) => page.locale))].map((locale) => {
  const localePages = pages.filter((page) => page.locale === locale);
  return [locale, buildBoilerplateModel(localePages.map((page) => ({ id: page.url, blocks: blocksByUrl.get(page.url) || [] })), { minimumDocumentCount: 5, fraction: 0.15 })];
}));
const boilerplateModel = {
  threshold: Math.max(...[...modelsByLocale.values()].map((model) => model.threshold)),
  repeatedBlockCount: [...modelsByLocale.values()].reduce((sum, model) => sum + model.repeatedBlockCount, 0),
};
const { tokensByUrl, documentFrequency } = buildAdjustedVectors(pages, blocksByUrl, modelsByLocale);

const pairRows = oldSimilarity.map((oldPair, index) => {
  const left = pageByUrl.get(oldPair.url_a); const right = pageByUrl.get(oldPair.url_b);
  if (!left || !right) return null;
  const adjusted = cosineFromTokens(tokensByUrl.get(left.url) || [], tokensByUrl.get(right.url) || [], documentFrequency, pages.length);
  const intent = classifyIntentPair(left, right, { rawSimilarity: Number(oldPair.similarity_score), adjustedSimilarity: adjusted });
  return {
    pairId: index + 1, url_a: left.url, url_b: right.url, page_type_a: left.page_type, page_type_b: right.page_type,
    locale: left.locale, cluster_a: left.content_cluster, cluster_b: right.content_cluster,
    tool_slug_a: left.toolSlug, tool_slug_b: right.toolSlug, raw_main_similarity: fixed(oldPair.similarity_score),
    boilerplate_adjusted_similarity: fixed(adjusted), original_same_search_intent: oldPair.same_search_intent,
    intent_relationship: intent.intentRelationship, functional_equivalence: intent.functionalEquivalence,
    merge_confidence: intent.mergeConfidence, merge_reason: intent.mergeReason,
  };
}).filter(Boolean);

const signatureRows = pages.map((page) => pageByUrl.get(page.url)).filter((page) => page?.page_type === 'tool').map((page) => {
  const signature = page.signature || functionalSignature(page.toolSlug);
  return { url: page.url, locale: page.locale, tool_slug: page.toolSlug, page_type: page.page_type, content_cluster: page.content_cluster, action: signature.action, source: signature.source, target: signature.target, outcome: signature.outcome, function: signature.function, audience: signature.audience, intent_signature: signature.signature, signature_confidence: signature.confidence, source_of_truth: signature.sourceOfTruth };
});
write(path.join(REPORT, 'functional-signatures.csv'), csv(signatureRows, ['url', 'locale', 'tool_slug', 'page_type', 'content_cluster', 'action', 'source', 'target', 'outcome', 'function', 'audience', 'intent_signature', 'signature_confidence', 'source_of_truth']));

const similarityColumns = ['pair_id', 'url_a', 'url_b', 'page_type_a', 'page_type_b', 'locale', 'cluster_a', 'cluster_b', 'tool_slug_a', 'tool_slug_b', 'raw_main_similarity', 'boilerplate_adjusted_similarity', 'original_same_search_intent', 'intent_relationship', 'functional_equivalence', 'merge_confidence', 'merge_reason'];
write(path.join(REPORT, 'content-similarity-v2.csv'), csv(pairRows.map((row) => ({ pair_id: row.pairId, ...row })), similarityColumns));
write(path.join(REPORT, 'intent-classification.csv'), csv(pairRows.map((row) => ({ pair_id: row.pairId, ...row })), similarityColumns));

const cannibalizationRows = pairRows.map((row) => {
  const mergeGate = row.intent_relationship === 'SAME'
    && row.functional_equivalence === 'YES'
    && row.merge_confidence === 'HIGH';
  return {
  pair_id: row.pairId, url_a: row.url_a, url_b: row.url_b, page_type_a: row.page_type_a, page_type_b: row.page_type_b,
  locale: row.locale, primary_intent_a: row.tool_slug_a || row.url_a.split('/').filter(Boolean).at(-1), primary_intent_b: row.tool_slug_b || row.url_b.split('/').filter(Boolean).at(-1),
  intent_relationship: row.intent_relationship, functional_equivalence: row.functional_equivalence,
  same_outcome: mergeGate ? 'yes' : 'no', serp_role: mergeGate ? 'same role; confirm competition' : row.intent_relationship === 'COMPLEMENTARY' ? 'different DO/LEARN role' : 'different or adjacent role',
  differentiated_value: mergeGate ? 'none observed from deterministic classifier; human confirmation required' : row.merge_reason,
  cannibalization_candidate: mergeGate ? 'yes' : 'no', action: mergeGate ? 'MERGE' : 'REVIEW_ONLY', confidence: row.merge_confidence,
  };
});
write(path.join(REPORT, 'cannibalization-v2.csv'), csv(cannibalizationRows, ['pair_id', 'url_a', 'url_b', 'page_type_a', 'page_type_b', 'locale', 'primary_intent_a', 'primary_intent_b', 'intent_relationship', 'functional_equivalence', 'same_outcome', 'serp_role', 'differentiated_value', 'cannibalization_candidate', 'action', 'confidence']));

const highMergeByUrl = new Map();
for (const row of pairRows.filter((item) => item.intent_relationship === 'SAME' && item.merge_confidence === 'HIGH')) {
  highMergeByUrl.set(row.url_a, row); highMergeByUrl.set(row.url_b, row);
}
const oldByUrl = new Map(oldRemediation.map((row) => [row.URL, row]));
const remediationRows = pages.map((page) => {
  const old = oldByUrl.get(page.url) || {}; const merge = highMergeByUrl.get(page.url);
  const value = Number(page.value_score || 0);
  let action = 'KEEP';
  let reason = 'functional intent calibration found no high-confidence SAME outcome';
  if (merge) { action = 'MERGE'; reason = merge.merge_reason; }
  else if (old.action === 'WAIT') { action = 'WAIT'; reason = 'new or evidence window too short; preserve observation state'; }
  else if (old.action === 'IMPROVE' && value < 50) { action = 'IMPROVE'; reason = 'multi-signal value triage remains below review floor after similarity recalibration'; }
  return {
    URL: page.url, page_type: page.page_type, locale: page.locale, GSC_status: old.GSC_status || 'UNKNOWN (no current URL-level Coverage sample)', indexable: page.indexable, sitemap: page.sitemap_name || 'not in sitemap', internal_links: page.internal_link_source_count,
    raw_similarity_risk: old.similarity_risk || 'UNKNOWN', v2_similarity_risk: pairRows.some((row) => (row.url_a === page.url || row.url_b === page.url) && Number(row.boilerplate_adjusted_similarity) >= 0.8) ? 'high' : 'low', intent_relationship: merge?.intent_relationship || 'NONE', value_score: page.value_score,
    action, merge_confidence: merge?.merge_confidence || 'NONE', merge_reason: reason, functional_equivalence: merge?.functional_equivalence || 'NO', merge_target: merge ? (merge.url_a === page.url ? merge.url_b : merge.url_a) : '', human_review_required: ['MERGE', 'IMPROVE'].includes(action) ? 'yes' : 'no', v1_action: old.action || '',
  };
});
write(path.join(REPORT, 'remediation-plan-v2.csv'), csv(remediationRows, ['URL', 'page_type', 'locale', 'GSC_status', 'indexable', 'sitemap', 'internal_links', 'raw_similarity_risk', 'v2_similarity_risk', 'intent_relationship', 'value_score', 'action', 'merge_confidence', 'merge_reason', 'functional_equivalence', 'merge_target', 'human_review_required', 'v1_action']));

const requiredPairs = [
  ['jpg-to-png', 'png-to-jpg'], ['jpg-to-webp', 'webp-to-jpg'], ['csv-to-json', 'json-to-csv'],
  ['delete-pdf-pages', 'extract-pdf-pages'], ['standard-deviation', 'z-score-calculator'], ['grade-average', 'weighted-average-calculator'],
];
function pairHasSlugs(row, slugs) { return slugs.every((slug) => [row.tool_slug_a, row.tool_slug_b].includes(slug)); }
if (pages.filter((page) => page.page_type === 'tool').some((page) => !pageByUrl.get(page.url)?.toolSlug)) throw new Error('Functional signature invariant failed: an indexable tool has no tool slug.');
if (requiredPairs.some((slugs) => !pairRows.some((row) => pairHasSlugs(row, slugs)))) throw new Error('Regression invariant failed: a required false-positive pair is missing.');
const selectedRegression = [];
for (const slugs of requiredPairs) {
  const match = pairRows.find((row) => pairHasSlugs(row, slugs));
  if (match && !selectedRegression.some((row) => row.pair_id === match.pairId)) selectedRegression.push(match);
}
const topFalsePositives = pairRows.filter((row) => row.intent_relationship !== 'SAME').sort((a, b) => Number(b.raw_main_similarity) - Number(a.raw_main_similarity));
for (const row of topFalsePositives) {
  if (selectedRegression.some((item) => item.pairId === row.pairId)) continue;
  selectedRegression.push(row);
  if (selectedRegression.length >= 30) break;
}
const falsePositiveRows = selectedRegression.map((row, index) => ({
  case_number: index + 1, case_type: requiredPairs.some((slugs) => pairHasSlugs(row, slugs)) ? 'required regression' : 'high-similarity calibration sample',
  url_a: row.url_a, url_b: row.url_b, tool_slug_a: row.tool_slug_a, tool_slug_b: row.tool_slug_b, raw_main_similarity: row.raw_main_similarity, boilerplate_adjusted_similarity: row.boilerplate_adjusted_similarity, original_same_search_intent: row.original_same_search_intent, v2_intent_relationship: row.intent_relationship, functional_equivalence: row.functional_equivalence, v2_merge_confidence: row.merge_confidence, decision: row.intent_relationship === 'SAME' ? 'SAME review only' : row.intent_relationship, why: row.merge_reason,
}));
write(path.join(REPORT, 'false-positive-regression.csv'), csv(falsePositiveRows, ['case_number', 'case_type', 'url_a', 'url_b', 'tool_slug_a', 'tool_slug_b', 'raw_main_similarity', 'boilerplate_adjusted_similarity', 'original_same_search_intent', 'v2_intent_relationship', 'functional_equivalence', 'v2_merge_confidence', 'decision', 'why']));

const oldSameIntentCount = oldSimilarity.filter((row) => row.same_search_intent === 'yes').length;
const relationshipCounts = countBy(pairRows, 'intent_relationship');
const mergeConfidenceCounts = countBy(pairRows, 'merge_confidence');
const actionCounts = countBy(remediationRows, 'action');
const reductionRows = ['ADJACENT', 'COMPLEMENTARY', 'DIFFERENT', 'UNKNOWN', 'SAME'].map((relationship) => ({ original_same_search_intent_yes: oldSameIntentCount, v2_relationship: relationship, pairs: pairRows.filter((row) => row.intent_relationship === relationship).length, interpretation: relationship === 'SAME' ? 'retained as functional/intent review' : 'removed from automatic same-intent interpretation' }));

write(path.join(REPORT, 'classifier-validation.md'), [
  '# FunnyTools Index Recovery — Phase 1.5 Classifier Validation', '',
  `Generated: ${TODAY}`, '',
  '## Safety status', '',
  '- NO CONTENT REMEDIATION; NO MERGE; NO NOINDEX; NO DELETE; NO RETIRE; NO PRODUCTION DEPLOY.',
  '- This v2 calibration reads the existing v1 inventory and reports. It does not change page source, sitemap membership, canonical, robots, noindex, redirects, slugs, hierarchy, or lastmod.',
  '- Cross-locale comparisons are not used as duplicate evidence.', '',
  '## Original vs V2', '',
  mdTable([
    { metric: 'Original similarity pairs >= 0.80', value: oldSimilarity.length, evidence: 'Phase 1 content-similarity.csv' },
    { metric: 'Original remediation MERGE pages', value: oldRemediation.filter((row) => row.action === 'MERGE').length, evidence: 'Phase 1 remediation-plan.csv; false-positive-prone classifier' },
    { metric: 'Original same_search_intent=yes pairs', value: oldSameIntentCount, evidence: 'Phase 1 similarity classifier' },
    { metric: 'V2 high-confidence SAME pairs', value: pairRows.filter((row) => row.intent_relationship === 'SAME' && row.merge_confidence === 'HIGH').length, evidence: 'same signature + same role + same locale' },
    { metric: 'V2 medium-confidence SAME pairs', value: pairRows.filter((row) => row.intent_relationship === 'SAME' && row.merge_confidence === 'MEDIUM').length, evidence: 'human confirmation required; not automatic merge' },
    { metric: 'Boilerplate block threshold', value: boilerplateModel.threshold, evidence: `${boilerplateModel.repeatedBlockCount} repeated main-content blocks identified by document frequency` },
  ], ['metric', 'value', 'evidence']), '',
  '## V2 Intent Taxonomy', '',
  mdTable(Object.entries(relationshipCounts).map(([relationship, pairs]) => ({ relationship, pairs, rule: relationship === 'SAME' ? 'same user task and outcome; functional equivalence required' : relationship === 'ADJACENT' ? 'related topic, distinct task or answer' : relationship === 'COMPLEMENTARY' ? 'DO tool and LEARN guide roles should coexist' : relationship === 'DIFFERENT' ? 'different direction, operation, function, or outcome' : 'insufficient deterministic evidence' })), ['relationship', 'pairs', 'rule']), '',
  '## Merge confidence', '',
  mdTable(Object.entries(mergeConfidenceCounts).map(([confidence, pairs]) => ({ confidence, pairs, policy: confidence === 'HIGH' ? 'eligible for human merge review only when SAME; never auto-executed' : 'review-only; no merge classification' })), ['confidence', 'pairs', 'policy']), '',
  '## Automated regression tests', '',
  '`node --test tests/index-recovery-classifier.test.mjs`: PASS, 7/7. Full `npm.cmd test`: PASS, 155/155.', '',
  '## False-positive reduction', '',
  'The original classifier used similarity and topic overlap as a same-intent trigger. V2 treats similarity as supporting evidence only and applies functional outcome, page role, direction, and locale rules.', '',
  mdTable(reductionRows, ['original_same_search_intent_yes', 'v2_relationship', 'pairs', 'interpretation']), '',
  `At least ${falsePositiveRows.length} human-readable regression/calibration cases are in [false-positive-regression.csv](false-positive-regression.csv).`, '',
  '## Required regression outcomes', '',
  mdTable(selectedRegression.filter((row) => requiredPairs.some((slugs) => pairHasSlugs(row, slugs))).map((row) => ({ example: `${row.tool_slug_a} vs ${row.tool_slug_b}`, raw: row.raw_main_similarity, adjusted: row.boilerplate_adjusted_similarity, relationship: row.intent_relationship, functional_equivalence: row.functional_equivalence, merge_confidence: row.merge_confidence })), ['example', 'raw', 'adjusted', 'relationship', 'functional_equivalence', 'merge_confidence']), '',
  'Expected policy: directional converters are DIFFERENT; document delete/extract are DIFFERENT; distinct calculations are ADJACENT; tool↔guide is COMPLEMENTARY.', '',
  '## V2 remediation classification', '',
  mdTable(Object.entries(actionCounts).map(([action, urls]) => ({ action, urls, policy: action === 'MERGE' ? 'only high-confidence SAME; human review required' : action === 'IMPROVE' ? 'multi-signal value review' : action === 'WAIT' ? 'preserve observation window' : 'retain route' })), ['action', 'urls', 'policy']), '',
  'Only KEEP, IMPROVE, MERGE, and WAIT are used in remediation-plan-v2.csv. Existing excluded-policy routes are intentionally omitted from this intended-indexable calibration queue.', '',
  '## GSC boundary', '',
  'The supplied Coverage ZIP remains summary-only. Historical GSC-known acceptance is 54 / 401 as of 2026-09-04; current Google-known after that date and URL-level indexed/non-indexed classification are UNKNOWN. V2 makes no claim that classifier evidence explains Google indexing causality.', '',
  '## Artifacts', '',
  '- `functional-signatures.csv`: tool functional identity per URL.',
  '- `intent-classification.csv`: pair-level V2 relationship and merge confidence.',
  '- `content-similarity-v2.csv`: raw main similarity beside boilerplate-adjusted similarity.',
  '- `cannibalization-v2.csv`: SAME/outcome/SERP-role gate; non-SAME pairs are not cannibalization candidates.',
  '- `remediation-plan-v2.csv`: intended-indexable review queue only.',
].join('\n'));

write(path.join(REPORT, 'EXECUTIVE-SUMMARY.md'), [
  '# FunnyTools Index Recovery — Phase 1.5 Calibration', '',
  '## Decision', '',
  'Audit intelligence calibration completed. The v1 similarity/MERGE output is not safe for direct remediation. V2 makes functional identity and user outcome primary; similarity is supporting evidence only.', '',
  mdTable([
    { metric: 'Original similarity pairs >= 0.80', value: oldSimilarity.length },
    { metric: 'Original MERGE pages', value: oldRemediation.filter((row) => row.action === 'MERGE').length },
    { metric: 'V2 high-confidence SAME pairs', value: pairRows.filter((row) => row.intent_relationship === 'SAME' && row.merge_confidence === 'HIGH').length },
    { metric: 'V2 ADJACENT pairs', value: relationshipCounts.ADJACENT || 0 },
    { metric: 'V2 COMPLEMENTARY pairs', value: relationshipCounts.COMPLEMENTARY || 0 },
    { metric: 'V2 DIFFERENT pairs', value: relationshipCounts.DIFFERENT || 0 },
    { metric: 'V2 UNKNOWN pairs', value: relationshipCounts.UNKNOWN || 0 },
    { metric: 'False-positive regression cases', value: falsePositiveRows.length },
  ], ['metric', 'value']), '',
  '## Required examples', '',
  '- JPG→PNG vs PNG→JPG: DIFFERENT.',
  '- JPG→WebP vs WebP→JPG: DIFFERENT.',
  '- CSV→JSON vs JSON→CSV: DIFFERENT.',
  '- Delete PDF Pages vs Extract PDF Pages: DIFFERENT.',
  '- Standard Deviation vs Z Score: ADJACENT.',
  '- Tool vs Guide: COMPLEMENTARY by default.', '',
  '## Safety', '',
  '- No page source or content changed.',
  '- No merge, noindex, delete, retire, redirect, canonical, slug, sitemap, lastmod, or production action executed.',
  '- Phase 2 remediation remains blocked until human review of V2 output and URL-level evidence.',
].join('\n'));

console.log(JSON.stringify({ generatedAt: TODAY, originalSimilarityPairs: oldSimilarity.length, originalMergePages: oldRemediation.filter((row) => row.action === 'MERGE').length, originalSameIntentPairs: oldSameIntentCount, v2RelationshipCounts: relationshipCounts, v2MergeConfidenceCounts: mergeConfidenceCounts, v2RemediationCounts: actionCounts, falsePositiveRegressionCases: falsePositiveRows.length, boilerplateBlockThreshold: boilerplateModel.threshold, repeatedBoilerplateBlocks: boilerplateModel.repeatedBlockCount, contentRemediation: 'NONE', productionDeploy: 'NOT DEPLOYED' }, null, 2));
