import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  escapeCsv,
  parseCsv,
  secretScanText,
  toCsv,
  URL_STATUS,
} from './index-recovery-phase2-lib.mjs';

const rootDir = process.cwd();
const evidencePath = join(rootDir, 'reports', 'index-recovery-phase2', 'index-evidence-master.csv');
const outputDir = join(rootDir, 'reports', 'index-recovery-phase2b');
const locales = ['zh-TW', 'en', 'es', 'fr'];
const technicalBlocker = 'https://funnytools.win/en/tools/image-compressor/';

const hardEligible = (row) => row.page_type === 'tool'
  && row.google_status === URL_STATUS.CRAWLED_NOT_INDEXED
  && /200/.test(row.production_status || '')
  && row.page_fetch_state === 'SUCCESSFUL'
  && row.robots_txt_state === 'ALLOWED'
  && row.indexing_state === 'INDEXING_ALLOWED'
  && row.canonical_category === 'SELF_MATCH'
  && row.url !== technicalBlocker
  && locales.includes(row.locale)
  && row.tool_slug;

function number(value, fallback = null) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function impressionBucket(row) {
  const value = number(row.search_28_impressions, number(row.search_90_impressions, 0));
  if (value > 10) return '10+';
  if (value > 0) return '1-10';
  return '0';
}

function utilityFamily(row) {
  const slug = row.tool_slug;
  const cluster = row.content_cluster;
  if (cluster === 'pdf' || /pdf/.test(slug)) return 'pdf';
  if (cluster === 'image' || /image|jpg|png|webp|barcode|qr/.test(slug)) return 'image';
  if (cluster === 'statistics' || /calculator|score|average|deviation|percentile|cronbach|gpa|spss/.test(slug)) return 'calculator';
  if (cluster === 'money' || /interest|mortgage|salary|inflation|savings|overtime/.test(slug)) return 'calculator';
  if (cluster === 'time' || /date|time|reminder|pomodoro|business-days|stopwatch/.test(slug)) return 'time';
  if (cluster === 'draw' || /chart|flow|sketch|cad/.test(slug)) return 'draw';
  if (cluster === 'random' || /random|dice|wheel|picker|generator|this-or-that|what-to-eat/.test(slug)) return 'random';
  return 'text';
}

function similarityRisk(a, b) {
  const risk = [a.v2_similarity_risk, b.v2_similarity_risk]
    .map((value) => String(value || '').toLowerCase());
  if (risk.includes('high')) return { points: 0, label: 'high-risk-marker' };
  const similarity = Math.max(
    number(a.max_boilerplate_adjusted_similarity, 0),
    number(b.max_boilerplate_adjusted_similarity, 0),
  );
  if (similarity >= 0.9) return { points: 0, label: `high-similarity-${similarity.toFixed(3)}` };
  if (similarity >= 0.82) return { points: 2, label: `moderate-similarity-${similarity.toFixed(3)}` };
  return { points: 5, label: similarity ? `low-similarity-${similarity.toFixed(3)}` : 'similarity-not-recorded' };
}

function scorePair(treatment, control) {
  const ageDelta = Math.abs(number(treatment.last_crawl_age_days, 999) - number(control.last_crawl_age_days, 999));
  const linkDelta = Math.abs(number(treatment.internal_link_count, 999) - number(control.internal_link_count, 999));
  const depthMatch = treatment.crawl_depth && control.crawl_depth && treatment.crawl_depth === control.crawl_depth;
  const treatmentBucket = impressionBucket(treatment);
  const controlBucket = impressionBucket(control);
  const impressionPoints = treatmentBucket === controlBucket ? 8 : (Math.abs(['0', '1-10', '10+'].indexOf(treatmentBucket) - ['0', '1-10', '10+'].indexOf(controlBucket)) === 1 ? 4 : 0);
  const similarity = similarityRisk(treatment, control);
  const agePoints = ageDelta <= 7 ? 15 : ageDelta <= 14 ? 10 : ageDelta <= 21 ? 5 : 0;
  const linkPoints = linkDelta <= 5 ? 12 : linkDelta <= 10 ? 8 : linkDelta <= 20 ? 4 : 0;
  const utilityPoints = utilityFamily(treatment) === utilityFamily(control) ? 7 : 2;
  const score = 20 + 10 + 15 + agePoints + linkPoints + (depthMatch ? 8 : 0) + impressionPoints + similarity.points + utilityPoints;
  const reason = [
    `same locale ${treatment.locale}`,
    'same page_type tool',
    `same cluster ${treatment.content_cluster}`,
    `crawl age delta ${ageDelta}d (${agePoints}/15)`,
    `internal links delta ${linkDelta} (${linkPoints}/12)`,
    `crawl depth ${depthMatch ? 'matched' : 'different'}`,
    `impression bucket ${treatmentBucket}/${controlBucket} (${impressionPoints}/8)`,
    `similarity ${similarity.label} (${similarity.points}/5)`,
    `utility family ${utilityFamily(treatment)}/${utilityFamily(control)} (${utilityPoints}/7)`,
  ].join('; ');
  return { score, reason, ageDelta, linkDelta, treatmentBucket, controlBucket };
}

function treatmentPriority(row) {
  const impressions = number(row.search_28_impressions, number(row.search_90_impressions, 0));
  const age = number(row.last_crawl_age_days, 999);
  const ageBand = age >= 14 && age <= 45 ? 2 : age < 7 ? 0 : 1;
  const action = row.v2_action === 'KEEP' ? 2 : row.v2_action === 'IMPROVE' ? 1 : 0;
  const utility = ['calculator', 'pdf', 'image', 'random', 'time', 'draw', 'text'].includes(utilityFamily(row)) ? 1 : 0;
  return [impressions > 10 ? 2 : impressions > 0 ? 1 : 0, ageBand, utility, action];
}

function comparePriority(a, b) {
  const pa = treatmentPriority(a);
  const pb = treatmentPriority(b);
  for (let index = 0; index < pa.length; index += 1) {
    if (pa[index] !== pb[index]) return pb[index] - pa[index];
  }
  return a.url.localeCompare(b.url);
}

const rows = parseCsv(readFileSync(evidencePath, 'utf8')).filter(hardEligible);
const selected = [];
const audit = [];

for (const locale of locales) {
  const pool = rows.filter((row) => row.locale === locale);
  const pairs = [];
  for (const treatment of pool) {
    for (const control of pool) {
      if (treatment.url === control.url || treatment.content_cluster !== control.content_cluster) continue;
      const score = scorePair(treatment, control);
      audit.push({
        locale,
        treatment_url: treatment.url,
        control_url: control.url,
        cluster: treatment.content_cluster,
        score: score.score,
        qualifies: score.score >= 80 ? 'yes' : 'no',
        reason: score.reason,
      });
      if (score.score >= 80) pairs.push({ treatment, control, score });
    }
  }
  pairs.sort((a, b) => comparePriority(a.treatment, b.treatment) || b.score.score - a.score.score || a.control.url.localeCompare(b.control.url));
  const used = new Set();
  let count = 0;
  for (const pair of pairs) {
    if (count >= 5 || used.has(pair.treatment.url) || used.has(pair.control.url)) continue;
    used.add(pair.treatment.url);
    used.add(pair.control.url);
    selected.push({ pair_id: `P2B-${String(selected.length + 1).padStart(2, '0')}`, ...pair });
    count += 1;
  }
  if (count !== 5) {
    throw new Error(`Could not select exactly 5 disjoint pairs for ${locale}; selected ${count}`);
  }
}

selected.sort((a, b) => a.treatment.locale.localeCompare(b.treatment.locale) || a.pair_id.localeCompare(b.pair_id));
selected.forEach((pair, index) => { pair.pair_id = `P2B-${String(index + 1).padStart(2, '0')}`; });

const pairColumns = [
  'pair_id', 'treatment_url', 'control_url', 'locale', 'cluster', 'treatment_tool_slug', 'control_tool_slug',
  'treatment_google_status', 'control_google_status', 'treatment_last_crawl_time', 'control_last_crawl_time',
  'treatment_last_crawl_age_days', 'control_last_crawl_age_days', 'treatment_internal_link_count', 'control_internal_link_count',
  'treatment_crawl_depth', 'control_crawl_depth', 'treatment_impression_bucket', 'control_impression_bucket',
  'treatment_search_28_impressions', 'control_search_28_impressions', 'match_score', 'match_reason',
];
const pairRows = selected.map(({ pair_id, treatment, control, score }) => ({
  pair_id,
  treatment_url: treatment.url,
  control_url: control.url,
  locale: treatment.locale,
  cluster: treatment.content_cluster,
  treatment_tool_slug: treatment.tool_slug,
  control_tool_slug: control.tool_slug,
  treatment_google_status: treatment.google_status,
  control_google_status: control.google_status,
  treatment_last_crawl_time: treatment.last_crawl_time,
  control_last_crawl_time: control.last_crawl_time,
  treatment_last_crawl_age_days: treatment.last_crawl_age_days,
  control_last_crawl_age_days: control.last_crawl_age_days,
  treatment_internal_link_count: treatment.internal_link_count,
  control_internal_link_count: control.internal_link_count,
  treatment_crawl_depth: treatment.crawl_depth,
  control_crawl_depth: control.crawl_depth,
  treatment_impression_bucket: score.treatmentBucket,
  control_impression_bucket: score.controlBucket,
  treatment_search_28_impressions: treatment.search_28_impressions,
  control_search_28_impressions: control.search_28_impressions,
  match_score: score.score,
  match_reason: score.reason,
}));

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, 'experiment-pairs.csv'), toCsv(pairRows, pairColumns) + '\n');
writeFileSync(join(outputDir, 'matching-candidate-audit.csv'), toCsv(audit, ['locale', 'treatment_url', 'control_url', 'cluster', 'score', 'qualifies', 'reason']) + '\n');

const secretText = readFileSync(join(outputDir, 'experiment-pairs.csv'), 'utf8') + readFileSync(join(outputDir, 'matching-candidate-audit.csv'), 'utf8');
if (secretScanText(secretText)) throw new Error('Secret-like material detected in matcher output');

console.log(JSON.stringify({
  eligibleRows: rows.length,
  pairs: pairRows.length,
  localeCounts: Object.fromEntries(locales.map((locale) => [locale, pairRows.filter((row) => row.locale === locale).length])),
  minScore: Math.min(...pairRows.map((row) => Number(row.match_score))),
  output: 'reports/index-recovery-phase2b/experiment-pairs.csv',
}, null, 2));
