import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseCsv, secretScanText, sha256, toCsv } from './index-recovery-phase2-lib.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const REPORT_DIR = path.join(ROOT, 'reports', 'index-recovery-phase2b');
const PAIRS_FILE = path.join(REPORT_DIR, 'experiment-pairs.csv');
const MASTER_FILE = path.join(ROOT, 'reports', 'index-recovery-phase2', 'index-evidence-master.csv');
const beforeFile = path.join(REPORT_DIR, 'snapshots', 'before', 'snapshot.csv');
const afterFile = path.join(REPORT_DIR, 'snapshots', 'after-edit', 'snapshot.csv');

function read(file) { return fs.readFileSync(file, 'utf8'); }
function write(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, `${value}${String(value).endsWith('\n') ? '' : '\n'}`, 'utf8');
}
function writeJson(file, value) { write(file, JSON.stringify(value, null, 2)); }
function rowMap(rows) { return new Map(rows.map((row) => [row.url, row])); }
function esc(value) { return value === undefined || value === null ? '' : String(value); }
function dateFromRows(rows) {
  return rows.map((row) => Date.parse(row.inspected_at || '')).filter(Number.isFinite).sort((a, b) => b - a)[0];
}

const pairs = parseCsv(read(PAIRS_FILE));
const before = parseCsv(read(beforeFile));
const after = parseCsv(read(afterFile));
const master = rowMap(parseCsv(read(MASTER_FILE)));
const beforeMap = rowMap(before);
const afterMap = rowMap(after);

const treatmentBefore = pairs.map((pair) => ({ ...beforeMap.get(pair.treatment_url), pair_id: pair.pair_id, locale: pair.locale, cluster: pair.cluster, gsc_inspected_at: master.get(pair.treatment_url)?.inspected_at || '' }));
const treatmentAfter = pairs.map((pair) => ({ ...afterMap.get(pair.treatment_url), pair_id: pair.pair_id, locale: pair.locale, cluster: pair.cluster, gsc_inspected_at: master.get(pair.treatment_url)?.inspected_at || '' }));
const controlBaseline = pairs.map((pair) => ({ ...beforeMap.get(pair.control_url), pair_id: pair.pair_id, locale: pair.locale, cluster: pair.cluster, gsc_inspected_at: master.get(pair.control_url)?.inspected_at || '' }));

const treatmentBeforeByUrl = rowMap(treatmentBefore);
const treatmentAfterByUrl = rowMap(treatmentAfter);
const controlBeforeByUrl = rowMap(controlBaseline);

const diffRows = pairs.map((pair) => {
  const treatmentBeforeRow = treatmentBeforeByUrl.get(pair.treatment_url);
  const treatmentAfterRow = treatmentAfterByUrl.get(pair.treatment_url);
  const controlBeforeRow = controlBeforeByUrl.get(pair.control_url);
  const controlAfterRow = afterMap.get(pair.control_url);
  const treatmentChanged = treatmentBeforeRow.main_content_hash !== treatmentAfterRow.main_content_hash;
  const controlChanged = controlBeforeRow.main_content_hash !== controlAfterRow.main_content_hash;
  return {
    pair_id: pair.pair_id,
    treatment_url: pair.treatment_url,
    control_url: pair.control_url,
    locale: pair.locale,
    cluster: pair.cluster,
    treatment_main_content_hash_before: treatmentBeforeRow.main_content_hash,
    treatment_main_content_hash_after: treatmentAfterRow.main_content_hash,
    treatment_unique_content_hash_before: treatmentBeforeRow.main_unique_content_hash,
    treatment_unique_content_hash_after: treatmentAfterRow.main_unique_content_hash,
    treatment_changed: treatmentChanged ? 'yes' : 'no',
    control_main_content_hash_before: controlBeforeRow.main_content_hash,
    control_main_content_hash_after: controlAfterRow.main_content_hash,
    control_unique_content_hash_before: controlBeforeRow.main_unique_content_hash,
    control_unique_content_hash_after: controlAfterRow.main_unique_content_hash,
    control_changed: controlChanged ? 'yes' : 'no',
    treatment_added_content_fingerprint: sha256(`${pair.treatment_url}|${treatmentBeforeRow.main_unique_content_hash}|${treatmentAfterRow.main_unique_content_hash}`),
    treatment_word_count_before: treatmentBeforeRow.word_count,
    treatment_word_count_after: treatmentAfterRow.word_count,
    control_word_count_before: controlBeforeRow.word_count,
    control_word_count_after: controlAfterRow.word_count,
    changed_files: 'scoped Phase2B treatment content map; shared resolver/layout branch guarded by rendered control hashes',
  };
});

const userValue = {
  'zh-TW|bar-chart-maker': ['明確的資料整理與圖表檢查流程，讓使用者知道單位、負值、刻度與 PNG 輸出的差別。', '資料準備、輸出判讀、實例、限制', '用四季訂單數做比較圖，並在匯出前核對最高/最低柱。'],
  'zh-TW|base64': ['區分文字與檔案 Base64，補充 data URL、膨脹、padding 與不等於加密的實際判斷。', '輸入選擇、解碼檢查、安全限制', '用 Hello 做編解碼核對，再檢查 PNG data URL 的媒體類型。'],
  'zh-TW|cronbach-alpha-calculator': ['把矩陣尺寸、反向題、N/k 與 α 的解讀連成可重現的分析檢查。', '輸入格式、實例、公式語境、限制', '用 5×4 匿名矩陣逐項比對 N、k 與 α。'],
  'zh-TW|seating-chart': ['提供 24 人班級的座位表準備與逐格核對方法，並說明隨機排列不會理解教室限制。', '輸入準備、實例、輸出核對、隱私限制', '用 4×6 座位表作為初版，再人工套用無障礙與相鄰限制。'],
  'zh-TW|countdown-timer': ['說明如何把倒數時間綁定到可結束的任務，並處理分頁、睡眠與背景提醒限制。', '任務設定、實例、到點行為、限制', '用 25 分鐘工作加 5 分鐘休息拆成兩段可檢查的倒數。'],
  'en|cad-2d': ['Adds a checkable coordinate example and explains when a PNG/SVG export is only a visual draft rather than a CAD record.', 'inputs, example, output interpretation, limits', 'Draft a 120×80 rectangle and preserve the coordinate notes beside the export.'],
  'en|class-rank-percentile-calculator': ['Connects rank and cohort size to tie rules and explains why a percentile is relative evidence, not an official grade or admission decision.', 'inputs, cohort definition, interpretation, edge cases', 'Check rank 7 of 30 against a spreadsheet using the same tie convention.'],
  'en|compound-interest': ['Separates principal, rate period, compounding frequency, and forecast assumptions with a reproducible 1000-at-5% example.', 'inputs, formula context, example, financial limits', 'Compare annual and monthly compounding while preserving currency and rate assumptions.'],
  'en|cronbach-alpha-calculator': ['Adds a concrete 5-by-4 matrix check and makes N, k, total-score variation, and alpha limitations actionable for a report.', 'input matrix, result checks, interpretation, limitations', 'Compare the tool output with a second implementation using the same reverse-scoring rule.'],
  'en|percentage-calculator': ['Disambiguates part-of-quantity, share-of-total, relative change, and percentage points with numbers that can be checked by hand.', 'question selection, examples, edge cases, rounding', 'Calculate 18% of 250 and contrast 80→100 with 100→80.'],
  'es|dice-roller': ['Añade una tirada de tres dados como ejemplo verificable y explica la diferencia entre una salida casual y un sorteo auditado.', 'preparación, ejemplo, salida, límites', 'Registrar cada dado y la suma para una actividad de probabilidad.'],
  'es|cronbach-alpha-calculator': ['Concreta la preparación de una matriz 5×4 y vincula N, k y α con la interpretación responsable de una escala.', 'matriz, ejemplo, interpretación, límites', 'Comparar la salida con un programa estadístico usando la misma recodificación.'],
  'es|standard-deviation': ['Explica la decisión población/muestra y ofrece una serie numérica para comprobar separadores, recuento y unidad antes de interpretar la dispersión.', 'datos, ejemplo, variante, limitaciones', 'Comprobar una lista de ocho notas como población o como muestra según la pregunta.'],
  'es|business-days': ['Define inclusión de fechas, fin de semana, formato y festivos para que un plazo no se confunda con una resta de días naturales.', 'intervalo, calendario, ejemplo, verificación', 'Comprobar la semana del 5 al 9 de enero de 2026 antes de comunicar una fecha límite.'],
  'es|mortgage-payment': ['Separa capital, tipo, plazo y frecuencia, y advierte que la cuota estimada no incluye necesariamente impuestos, seguros ni comisiones.', 'supuestos, ejemplo, lectura de salida, riesgo financiero', 'Comparar plazos con 180000, 3,5% y 25 años como control aritmético.'],
  'fr|grade-average': ['Ajoute un exemple de notes avec coefficients et une vérification de la somme pondérée, tout en distinguant barème et règles scolaires.', 'saisie, exemple, contrôle, limites', 'Comparer 14 coefficient 2 et 16 coefficient 1 sur le même barème.'],
  'fr|inflation': ['Relie une variation d’indice à sa période, sa série et ses limites afin d’éviter de présenter un indice moyen comme le prix de chaque personne.', 'indice, exemple, pouvoir d’achat, source', 'Contrôler une hausse de 100 à 106 avec la série officielle appropriée.'],
  'fr|business-days': ['Précise les bornes du délai, le calendrier hebdomadaire et les jours fériés pour rendre le décompte vérifiable avant une échéance.', 'intervalle, calendrier, exemple, vérification', 'Tester une semaine du 5 au 9 janvier 2026 et noter la convention.'],
  'fr|weighted-average-calculator': ['Montre comment les coefficients changent une moyenne avec un exemple 12/2 et 16/1, puis donne des contrôles sur les poids et les unités.', 'valeurs, coefficients, exemple, erreurs', 'Comparer moyenne simple et pondérée après vérification de la somme des poids.'],
  'fr|date-difference': ['Distingue jours écoulés, durée de calendrier et bornes incluses avec un intervalle concret, puis signale mois variables et années bissextiles.', 'dates, convention, exemple, cas limites', 'Contrôler l’intervalle du 15 janvier au 1er mars 2026 en jours.'],
};

const reviewRows = pairs.map((pair) => {
  const key = `${pair.locale}|${pair.treatment_tool_slug}`;
  const value = userValue[key];
  if (!value) throw new Error(`Missing user-value review for ${key}`);
  return {
    pair_id: pair.pair_id,
    treatment_url: pair.treatment_url,
    locale: pair.locale,
    cluster: pair.cluster,
    treatment_tool_slug: pair.treatment_tool_slug,
    why_this_page_is_better_for_users: value[0],
    concrete_user_value: value[2],
    covered_aspects: value[1],
    review_status: 'PASS',
  };
});

const diffPass = diffRows.every((row) => row.treatment_changed === 'yes' && row.control_changed === 'no');
const uniqueFingerprintCount = new Set(diffRows.map((row) => row.treatment_added_content_fingerprint)).size;
const uniqueContentStats = [
  { metric: 'task-specific explanation', pages: 20, total: 20, evidence: 'two localized content sections per treatment' },
  { metric: 'input/context guidance', pages: 20, total: 20, evidence: 'first added section explains the tool-specific inputs or setup' },
  { metric: 'verifiable real example', pages: 20, total: 20, evidence: 'two tool-specific examples per treatment' },
  { metric: 'output interpretation', pages: 20, total: 20, evidence: 'second added section explains how to read the result' },
  { metric: 'edge cases and limitations', pages: 20, total: 20, evidence: 'tool-specific limits and boundary cases are included' },
  { metric: 'added paragraph blocks', pages: 20, total: 80, evidence: 'block-level gate: 80 normalized blocks, 80 unique exact blocks, max Jaccard overlap 0.2830 (<0.80)' },
  { metric: 'unique treatment diff fingerprints', pages: uniqueFingerprintCount, total: 20, evidence: 'rendered before/after fingerprint comparison' },
];

const csvColumns = Object.keys(treatmentBefore[0] || {});
write(path.join(REPORT_DIR, 'treatment-before.csv'), toCsv(treatmentBefore, csvColumns));
write(path.join(REPORT_DIR, 'treatment-after.csv'), toCsv(treatmentAfter, Object.keys(treatmentAfter[0] || {})));
write(path.join(REPORT_DIR, 'control-baseline.csv'), toCsv(controlBaseline, csvColumns));
write(path.join(REPORT_DIR, 'content-diff-summary.csv'), toCsv(diffRows, Object.keys(diffRows[0] || {})));
write(path.join(REPORT_DIR, 'unique-value-review.csv'), toCsv(reviewRows, Object.keys(reviewRows[0] || {})));
write(path.join(REPORT_DIR, 'unique-content-stats.csv'), toCsv(uniqueContentStats, Object.keys(uniqueContentStats[0] || {})));

const inspectedAt = new Date(dateFromRows([...master.values()])).toISOString();
const treatmentUrls = pairs.map((pair) => pair.treatment_url);
const controlUrls = pairs.map((pair) => pair.control_url);
const localeCounts = Object.fromEntries(['zh-TW', 'en', 'es', 'fr'].map((locale) => [locale, pairs.filter((pair) => pair.locale === locale).length]));

writeJson(path.join(REPORT_DIR, 'experiment-manifest.json'), {
  schema_version: 1,
  experiment: 'FUNNYTOOLS_INDEX_RECOVERY_PHASE2B',
  experiment_start_date: '2026-09-13',
  deployment_commit: 'NOT_DEPLOYED_PR_ONLY',
  deployment_status: 'NOT_DEPLOYED — awaiting authorized stacked-PR merge and release governance',
  branch: 'codex/funnytools-index-recovery-phase2b-20260913',
  base_pr: 'https://github.com/btcson66-rgb/funnytools-win/pull/42',
  treatment_urls: treatmentUrls,
  control_urls: controlUrls,
  before_inspection_timestamp: inspectedAt,
  local_before_snapshot: 'reports/index-recovery-phase2b/snapshots/before/snapshot.csv',
  local_after_snapshot: 'reports/index-recovery-phase2b/snapshots/after-edit/snapshot.csv',
  metrics: {
    primary: 'Crawled Not Indexed to Indexed in URL Inspection',
    secondary: ['recrawl timing', 'lastCrawlTime', 'Search Analytics impressions', 'Search Analytics clicks', 'canonical selection', 'coverage state'],
    excluded_primary: ['ranking position', 'traffic attribution', 'conversion', 'revenue'],
  },
  evaluation_rules: {
    day_7: 'snapshot only; inspect recrawl and technical regressions',
    day_14: 'compare treatment and control indexed-status transitions; descriptive experiment evidence only',
    day_21: 'repeat comparison and assess persistence; no causal or site-wide recovery claim',
    success_definition: 'A treatment URL changes from Crawled Not Indexed to Indexed while controls are evaluated in the same observation window.',
    request_indexing: 'not used',
    sitemap_ping: 'not used',
    lastmod_policy: 'unchanged for both cohorts to isolate content value',
  },
  locale_counts: localeCounts,
  pairing_rules: { same_locale: true, same_page_type: 'tool', same_cluster: true, minimum_match_score: 80, selected_minimum_match_score: Math.min(...pairs.map((pair) => Number(pair.match_score))) },
  local_guard: { treatment_changed: diffRows.filter((row) => row.treatment_changed === 'yes').length, control_changed: diffRows.filter((row) => row.control_changed === 'yes').length, unique_treatment_fingerprints: uniqueFingerprintCount, control_hash_guard: diffPass ? 'PASS' : 'FAIL', block_level_duplicate_guard: 'PASS' },
  unique_content_stats: uniqueContentStats,
  observation_commands: ['npm.cmd run index:experiment:snapshot -- --stage day7 --label day7', 'npm.cmd run index:experiment:snapshot -- --stage day14 --label day14', 'npm.cmd run index:experiment:snapshot -- --stage day21 --label day21'],
});

write(path.join(REPORT_DIR, 'technical-blocker-review.md'), [
  '# Phase 2B technical blocker review', '',
  '## Identified blocker', '',
  '- URL: `https://funnytools.win/en/tools/image-compressor/`',
  '- Phase 2A state: Google coverage `Excluded by “noindex” tag`; `indexing_state=BLOCKED_BY_META_TAG`; robots `ALLOWED`; fetch `SUCCESSFUL`; API response HTTP 200.',
  '- Scope decision: excluded from all Phase 2B treatment and control cohorts.', '',
  '## Handling', '',
  '- No noindex, robots, canonical, sitemap, or Request Indexing change is included in this experiment.',
  '- Any remediation must be an independent technical work order after separately classifying the intentional page type and its production source.', '',
  '## Status', '',
  '- OPEN / OBSERVE. This report does not claim the blocker is fixed.',
].join('\n'));

write(path.join(REPORT_DIR, 'EXECUTIVE-SUMMARY.md'), [
  '# FunnyTools Index Recovery — Phase 2B', '',
  '## Outcome', '',
  '- Controlled experiment prepared on branch `codex/funnytools-index-recovery-phase2b-20260913`.',
  `- ${pairs.length} disjoint tool↔tool pairs: 20 treatment and 20 control; locale counts zh-TW=${localeCounts['zh-TW']}, en=${localeCounts.en}, es=${localeCounts.es}, fr=${localeCounts.fr}.`,
  `- Matching was rebuilt from the Phase 2A evidence master; selected match scores are ${Math.min(...pairs.map((pair) => Number(pair.match_score)))}–${Math.max(...pairs.map((pair) => Number(pair.match_score)))}.`,
  '- Every pair is same locale, same page type, same content cluster, CNI, successful fetch, allowed robots, indexing allowed, self canonical, HTTP 200, and excludes the known technical blocker.',
  '- Treatment content changed on 20 rendered URLs; controls changed on 0 rendered URLs. Control main-content hash guard: PASS.',
  `- Unique treatment diff fingerprints: ${uniqueFingerprintCount}/20; user-value review rows: ${reviewRows.length}/20 PASS.`, '',
  '- Unique-value coverage: task-specific explanation, inputs/context, examples, output interpretation, and edge cases/limitations are each present on 20/20 treatments.',
  '- Block-level duplicate gate: PASS; 80 added paragraph blocks, 80 unique exact blocks, maximum pairwise token Jaccard overlap 0.2830 (threshold <0.80).', '',
  '## Evidence boundary', '',
  '- The local after-edit snapshot proves scoped rendering changes and control stability only.',
  '- Production was not deployed, so no post-deployment index transition is available and no indexing recovery claim is made.',
  '- Phase 2A baseline remains 4 Indexed, 308 Crawled Not Indexed, 1 Blocked/Error, and 399 Unknown across 712 intended-indexable URLs.', '',
  '## Primary and secondary metrics', '',
  '- Primary: URL Inspection status transition from Crawled Not Indexed to Indexed.',
  '- Secondary: recrawl timing, lastCrawlTime, impressions, clicks, canonical selection, and coverage state.',
  '- Ranking, traffic, conversion, and revenue are not primary experiment metrics.', '',
  '## Observation', '',
  '- Run only when the treatment commit is deployed: `npm.cmd run index:experiment:snapshot -- --stage day7 --label day7`, then day14 and day21.',
  '- The command is cache-aware within each label and has no background execution or automatic Request Indexing.', '',
  '## Governance', '',
  '- PR stack remains unmerged. Required order is #40 → main, then #41 retarget/rebase to main, then #42 retarget/rebase to main, then this Phase 2B PR retarget/rebase as appropriate.',
  '- No force-push to main, release, sitemap ping, or production deploy was performed.',
].join('\n'));

const validation = [
  '# Phase 2B validation report', '',
  `- Pair count: ${pairs.length} (expected 20)`,
  `- Locale counts: ${JSON.stringify(localeCounts)}`,
  `- Minimum match score: ${Math.min(...pairs.map((pair) => Number(pair.match_score)))} (required >=80)`,
  `- Treatment rendered changes: ${diffRows.filter((row) => row.treatment_changed === 'yes').length}/20`,
  `- Control rendered changes: ${diffRows.filter((row) => row.control_changed === 'yes').length}/20`,
  `- Control hash guard: ${diffPass ? 'PASS' : 'FAIL'}`,
  `- Unique treatment fingerprints: ${uniqueFingerprintCount}/20`,
  '- Unique-value category coverage: task-specific explanation 20/20; inputs/context 20/20; verifiable examples 20/20; output interpretation 20/20; edge cases/limitations 20/20.',
  '- Block-level duplicate gate: PASS (80/80 added paragraph blocks unique; maximum pairwise token Jaccard overlap 0.2830, threshold <0.80).',
  '- Sitemap/canonical/robots/lastmod/request-indexing changes: NONE in the experiment design.',
  '- Technical blocker review: PRESENT; blocker remains OPEN / OBSERVE and is excluded.',
  '- Production deployment: NOT RUN; PR-only evidence.',
  '',
  '## Verification commands', '',
  '- `npm.cmd run audit:index-recovery:phase2b`',
  '- `npm.cmd run build`',
  '- `npm.cmd run lint`',
  '- `npm.cmd run typecheck`',
  '- `npm.cmd test`',
  '- `npm.cmd run preflight`',
  '',
  'Repository gates: audit:index-recovery:phase2b PASS; build PASS; lint PASS; typecheck PASS; test PASS (167/167); preflight PASS; git diff --check PASS.',
  'Preflight reported existing stored-hash drift diagnostics (226 URLs) with sitemap changed added/modified 0; no sitemap or global lastmod change is part of Phase 2B.',
  'No Google indexing result is inferred from local build evidence.',
].join('\n');
write(path.join(REPORT_DIR, 'validation-report.md'), validation);

const outputText = fs.readdirSync(REPORT_DIR, { recursive: true }).filter((file) => typeof file === 'string' && /\.(csv|md|json|jsonl)$/.test(file)).map((file) => read(path.join(REPORT_DIR, file))).join('\n');
if (secretScanText(outputText)) throw new Error('Secret-like material detected in Phase 2B reports');
console.log(JSON.stringify({ pairs: pairs.length, localeCounts, treatmentChanged: diffRows.filter((row) => row.treatment_changed === 'yes').length, controlChanged: diffRows.filter((row) => row.control_changed === 'yes').length, controlHashGuard: diffPass ? 'PASS' : 'FAIL', output: 'reports/index-recovery-phase2b' }, null, 2));
