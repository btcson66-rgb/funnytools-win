import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { googleAccessToken, fetchJson } from './seo-indexing-utils.mjs';
import {
  URL_STATUS,
  classifyUrlStatus,
  crawlAgeDays,
  crawlRecencyBucket,
  escapeCsv,
  formatNumber,
  isReusableRecord,
  localeGroup,
  mean,
  median,
  normalizeUrl,
  parseCsv,
  resultToEvidenceRow,
  safeErrorMessage,
  secretScanText,
  sha256,
  toCsv,
} from './index-recovery-phase2-lib.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DEFAULT_DATA_DIR = path.join(ROOT, 'reports', 'index-recovery-phase2');
const DEFAULT_INVENTORY = path.join(ROOT, 'reports', 'index-recovery', 'url-inventory.csv');
const INSPECTION_ENDPOINT = 'https://searchconsole.googleapis.com/v1/urlInspection/index:inspect';
const SITES_ENDPOINT = 'https://www.googleapis.com/webmasters/v3/sites';
const SEARCH_ANALYTICS_ENDPOINT = 'https://www.googleapis.com/webmasters/v3/sites';
const EXPECTED_URL_COUNT = 712;
const DEFAULT_CONCURRENCY = 3;
const DEFAULT_MIN_INTERVAL_MS = 400;
const DEFAULT_MAX_RETRIES = 4;
const PHASE2_V2_DIR = path.join(ROOT, 'reports', 'index-recovery-v2');
const TODAY = new Date().toISOString().slice(0, 10);
const OBSERVED_AT = new Date().toISOString();

function hasFlag(flag) { return process.argv.includes(flag); }
function argValue(name, fallback) {
  const index = process.argv.indexOf(name);
  return index >= 0 && process.argv[index + 1] ? process.argv[index + 1] : fallback;
}
function read(file, fallback = '') { return fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : fallback; }
function write(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, `${value}${String(value).endsWith('\n') ? '' : '\n'}`, 'utf8');
}
function writeJson(file, value) { write(file, JSON.stringify(value, null, 2)); }
function writeJsonAtomic(file, value) {
  const temporary = `${file}.${process.pid}.tmp`;
  writeJson(temporary, value);
  fs.renameSync(temporary, file);
}
function sleep(milliseconds) { return new Promise((resolve) => setTimeout(resolve, milliseconds)); }
function number(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}
function pathFor(url) {
  try { return new URL(url).pathname || '/'; } catch { return ''; }
}
function languageCode(locale) {
  return { 'zh-TW': 'zh-TW', en: 'en-US', es: 'es-ES', fr: 'fr-FR' }[locale] || 'en-US';
}
function dateDaysBefore(dateText, days) {
  const date = new Date(`${dateText}T00:00:00.000Z`);
  date.setUTCDate(date.getUTCDate() - days);
  return date.toISOString().slice(0, 10);
}
function ageFromDate(dateText) {
  if (!dateText) return null;
  const parsed = Date.parse(`${dateText}T00:00:00Z`);
  const observed = Date.parse(OBSERVED_AT);
  return Number.isFinite(parsed) ? Math.max(0, Math.floor((observed - parsed) / 86400000)) : null;
}
function array(value) { return Array.isArray(value) ? value : []; }
function firstUrlSegment(url) { return pathFor(url).split('/').filter(Boolean).at(-1) || ''; }
function pageTypeLabel(type) { return type === 'other' ? 'other-legitimate' : type; }
function pageUrlPath(url) { return pathFor(url).replace(/\/$/, '') || '/'; }

const DATA_DIR = path.resolve(argValue('--data-dir', DEFAULT_DATA_DIR));
const INVENTORY_FILE = path.resolve(argValue('--inventory', DEFAULT_INVENTORY));
const PROPERTY = argValue('--property', 'sc-domain:funnytools.win');
const CONCURRENCY = Math.max(1, Math.min(4, Number(argValue('--concurrency', DEFAULT_CONCURRENCY)) || DEFAULT_CONCURRENCY));
const MIN_INTERVAL_MS = Math.max(300, Number(argValue('--min-interval-ms', DEFAULT_MIN_INTERVAL_MS)) || DEFAULT_MIN_INTERVAL_MS);
const MAX_RETRIES = Math.max(0, Math.min(6, Number(argValue('--max-retries', DEFAULT_MAX_RETRIES)) || DEFAULT_MAX_RETRIES));
const REFRESH_ERRORS = hasFlag('--refresh-errors');

fs.mkdirSync(path.join(DATA_DIR, 'raw'), { recursive: true });
const RAW_FILE = path.join(DATA_DIR, 'raw', 'gsc-url-inspection-raw.jsonl');
const CHECKPOINT_FILE = path.join(DATA_DIR, 'gsc-url-inspection-checkpoint.json');
const PROPERTY_FILE = path.join(DATA_DIR, 'gsc-property-access.json');

if (!fs.existsSync(INVENTORY_FILE)) throw new Error(`Missing inventory: ${INVENTORY_FILE}`);
const inventory = parseCsv(read(INVENTORY_FILE));
const intendedPages = inventory.filter((row) => row.indexable === 'yes').sort((left, right) => left.url.localeCompare(right.url));
if (intendedPages.length !== EXPECTED_URL_COUNT) {
  throw new Error(`Expected ${EXPECTED_URL_COUNT} intended-indexable URLs, found ${intendedPages.length}. Refusing to create a misleading snapshot.`);
}
const urls = intendedPages.map((row) => row.url);
const inventoryHash = sha256(urls.join('\n'));

function loadRawCache() {
  const cache = new Map();
  if (!fs.existsSync(RAW_FILE)) return cache;
  for (const line of read(RAW_FILE).split(/\r?\n/).filter(Boolean)) {
    try {
      const record = JSON.parse(line);
      if (record.url) cache.set(record.url, record);
    } catch { /* preserve append-only evidence and skip only a malformed line */ }
  }
  return cache;
}

function appendRaw(record) {
  fs.appendFileSync(RAW_FILE, `${JSON.stringify(record)}\n`, 'utf8');
}

const rawCache = loadRawCache();
const cachedSuccessful = urls.filter((url) => isReusableRecord(rawCache.get(url), { refreshErrors: false })
  && rawCache.get(url).api_status === 200).length;
const checkpoint = {
  schema_version: 1,
  task: 'FUNNYTOOLS_INDEX_RECOVERY_PHASE2A',
  property: PROPERTY,
  inventory_file: path.relative(ROOT, INVENTORY_FILE),
  inventory_sha256: inventoryHash,
  total_urls: urls.length,
  observed_at: OBSERVED_AT,
  updated_at: OBSERVED_AT,
  request_policy: { concurrency: CONCURRENCY, minimum_interval_ms: MIN_INTERVAL_MS, max_retries: MAX_RETRIES, retryable_statuses: [0, 429, '5xx'] },
  cache_policy: { successful_results_reused: true, terminal_4xx_reused: !REFRESH_ERRORS, refresh_errors: REFRESH_ERRORS },
  completed_urls: [],
  successful_urls: [],
  failed_urls: [],
};

let token;
try {
  token = await googleAccessToken('https://www.googleapis.com/auth/webmasters.readonly');
} catch (error) {
  const blocker = [
    '# GSC-AUTH-BLOCKER', '',
    `Generated: ${TODAY}`, '',
    '## Current credential identity', '',
    '- OAuth token exchange failed; the credential identity could not be verified without exposing credentials.',
    `- Error: ${String(error.message || error).replace(/[\r\n]+/g, ' ').slice(0, 500)}`, '',
    '## Accessible properties', '',
    '- UNKNOWN because the sites.list request could not be authenticated.', '',
    '## Required property', '',
    `- ${PROPERTY}`, '',
    '## Exact next human action', '',
    '- Refresh the configured Fable Ops Google OAuth credential, then rerun `npm.cmd run gsc:inspect-index`.', '',
    'URL Inspection API subtask: STOPPED.',
  ].join('\n');
  write(path.join(DATA_DIR, 'GSC-AUTH-BLOCKER.md'), blocker);
  throw error;
}

const siteList = await fetchJson(SITES_ENDPOINT, { headers: { Authorization: `Bearer ${token}` } });
const properties = array(siteList.json?.siteEntry).map((entry) => ({ siteUrl: entry.siteUrl || '', permissionLevel: entry.permissionLevel || '' }));
writeJson(PROPERTY_FILE, {
  task: 'FUNNYTOOLS_INDEX_RECOVERY_PHASE2A',
  checked_at: OBSERVED_AT,
  endpoint: SITES_ENDPOINT,
  http_status: siteList.response.status,
  required_property: PROPERTY,
  properties,
  required_property_present: properties.some((entry) => entry.siteUrl === PROPERTY),
});
if (!siteList.response.ok || !properties.some((entry) => entry.siteUrl === PROPERTY)) {
  const blocker = [
    '# GSC-AUTH-BLOCKER', '',
    `Generated: ${TODAY}`, '',
    '## Current credential identity', '',
    '- The configured OAuth credential authenticated to sites.list, but the required FunnyTools property was not available.', '',
    '## Accessible properties', '',
    ...properties.map((entry) => `- ${entry.siteUrl} (${entry.permissionLevel || 'permission not returned'})`), '',
    '## Required property', '',
    `- ${PROPERTY}`, '',
    '## Exact missing permission', '',
    '- The credential has no access to the required property, or sites.list returned an unusable response.', '',
    '## Exact next human action', '',
    '- Grant the existing credential read access or higher to sc-domain:funnytools.win in Search Console, then rerun this command. Do not substitute another site property.', '',
    'URL Inspection API subtask: STOPPED.',
  ].join('\n');
  write(path.join(DATA_DIR, 'GSC-AUTH-BLOCKER.md'), blocker);
  throw new Error(`Required Search Console property unavailable: ${PROPERTY}`);
}

let nextRequestAt = 0;
let limiterTail = Promise.resolve();
async function acquireRequestSlot() {
  let release;
  const ticket = new Promise((resolve) => { release = resolve; });
  const previous = limiterTail;
  limiterTail = previous.then(async () => {
    const waitMs = Math.max(0, nextRequestAt - Date.now());
    if (waitMs) await sleep(waitMs);
    nextRequestAt = Date.now() + MIN_INTERVAL_MS;
    release();
  }).catch(() => release());
  await ticket;
}

async function inspectOne(url, locale) {
  let lastRecord = null;
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt += 1) {
    try {
      await acquireRequestSlot();
      const response = await fetchJson(INSPECTION_ENDPOINT, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ inspectionUrl: url, siteUrl: PROPERTY, languageCode: languageCode(locale) }),
      });
      const apiError = response.response.ok ? '' : safeErrorMessage(response.json, `${response.response.status} ${response.response.statusText}`);
      lastRecord = { url, inspected_at: new Date().toISOString(), api_status: response.response.status, api_error: apiError, response: response.json || null };
      if (response.response.ok || ![429, 500, 501, 502, 503, 504].includes(response.response.status)) return lastRecord;
      if (attempt < MAX_RETRIES) await sleep(1000 * (2 ** attempt));
    } catch (error) {
      lastRecord = { url, inspected_at: new Date().toISOString(), api_status: 0, api_error: String(error.message || error).replace(/[\r\n]+/g, ' ').slice(0, 500), response: null };
      if (attempt < MAX_RETRIES) await sleep(1000 * (2 ** attempt));
    }
  }
  return lastRecord;
}

const completed = new Set();
const successful = new Set();
const failed = new Set();
let cacheHits = 0;
let apiCalls = 0;
let cursor = 0;
const updateCheckpoint = () => writeJsonAtomic(CHECKPOINT_FILE, {
  ...checkpoint,
  updated_at: new Date().toISOString(),
  completed_urls: [...completed].sort(),
  successful_urls: [...successful].sort(),
  failed_urls: [...failed].sort(),
  progress: { completed: completed.size, remaining: urls.length - completed.size, cache_hits: cacheHits, api_calls: apiCalls },
});

async function worker() {
  while (true) {
    const index = cursor;
    cursor += 1;
    if (index >= intendedPages.length) return;
    const page = intendedPages[index];
    const cached = rawCache.get(page.url);
    let record;
    if (isReusableRecord(cached, { refreshErrors: REFRESH_ERRORS })) {
      record = cached;
      cacheHits += 1;
    } else {
      record = await inspectOne(page.url, page.locale);
      apiCalls += 1;
      appendRaw(record);
      rawCache.set(page.url, record);
    }
    completed.add(page.url);
    if (record.api_status === 200 && record.response?.inspectionResult) successful.add(page.url);
    else failed.add(page.url);
    updateCheckpoint();
    if (completed.size % 25 === 0 || completed.size === intendedPages.length) {
      console.log(JSON.stringify({ progress: completed.size, total: intendedPages.length, cacheHits, apiCalls, failed: failed.size }));
    }
  }
}

await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));
updateCheckpoint();

const gscRows = intendedPages.map((page) => resultToEvidenceRow({
  url: page.url,
  inspectedAt: rawCache.get(page.url)?.inspected_at || OBSERVED_AT,
  apiStatus: rawCache.get(page.url)?.api_status ?? '',
  response: rawCache.get(page.url)?.response || null,
  apiError: rawCache.get(page.url)?.api_error || '',
}));

async function querySearchAnalytics(days) {
  const endDate = dateDaysBefore(TODAY, 3);
  const startDate = dateDaysBefore(endDate, days - 1);
  const endpoint = `${SEARCH_ANALYTICS_ENDPOINT}/${encodeURIComponent(PROPERTY)}/searchAnalytics/query`;
  const rows = [];
  let startRow = 0;
  let paginationComplete = true;
  let apiStatus = 200;
  let apiError = '';
  try {
    while (startRow < 50000) {
      const response = await fetchJson(endpoint, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ startDate, endDate, dimensions: ['page'], rowLimit: 25000, startRow }),
      });
      apiStatus = response.response.status;
      if (!response.response.ok) {
        apiError = safeErrorMessage(response.json, `${response.response.status} ${response.response.statusText}`);
        paginationComplete = false;
        break;
      }
      const pageRows = array(response.json?.rows);
      rows.push(...pageRows);
      if (pageRows.length < 25000) break;
      startRow += pageRows.length;
    }
    if (startRow >= 50000) paginationComplete = false;
  } catch (error) {
    apiStatus = 0;
    apiError = String(error.message || error).replace(/[\r\n]+/g, ' ').slice(0, 500);
    paginationComplete = false;
  }
  return { days, startDate, endDate, endpoint, apiStatus, apiError, paginationComplete, rows };
}

const searchAnalytics = {
  observed_at: OBSERVED_AT,
  property: PROPERTY,
  note: 'Search Analytics is supporting evidence only; an absent page row does not prove that the URL is not indexed.',
  windows: [await querySearchAnalytics(28), await querySearchAnalytics(90)],
};
writeJson(path.join(DATA_DIR, 'search-analytics-page.json'), searchAnalytics);

function analyticsMap(window) {
  return new Map(window.rows.map((row) => [normalizeUrl(row.keys?.[0] || ''), row]));
}
const analytics28 = analyticsMap(searchAnalytics.windows[0]);
const analytics90 = analyticsMap(searchAnalytics.windows[1]);
function analyticsValue(map, url, field) {
  const row = map.get(normalizeUrl(url));
  return row && row[field] !== undefined ? row[field] : '';
}

const v2Signatures = fs.existsSync(path.join(PHASE2_V2_DIR, 'functional-signatures.csv'))
  ? parseCsv(read(path.join(PHASE2_V2_DIR, 'functional-signatures.csv'))) : [];
const v2Similarity = fs.existsSync(path.join(PHASE2_V2_DIR, 'content-similarity-v2.csv'))
  ? parseCsv(read(path.join(PHASE2_V2_DIR, 'content-similarity-v2.csv'))) : [];
const v2Remediation = fs.existsSync(path.join(PHASE2_V2_DIR, 'remediation-plan-v2.csv'))
  ? parseCsv(read(path.join(PHASE2_V2_DIR, 'remediation-plan-v2.csv'))) : [];
const signatureByUrl = new Map(v2Signatures.map((row) => [normalizeUrl(row.url), row]));
const remediationByUrl = new Map(v2Remediation.map((row) => [normalizeUrl(row.URL), row]));
const similarityByUrl = new Map();
for (const pair of v2Similarity) {
  for (const [url, other] of [[pair.url_a, pair.url_b], [pair.url_b, pair.url_a]]) {
    const key = normalizeUrl(url);
    const list = similarityByUrl.get(key) || [];
    list.push({ ...pair, other });
    similarityByUrl.set(key, list);
  }
}

const inventoryByUrl = new Map(intendedPages.map((page) => [normalizeUrl(page.url), page]));
const evidenceByUrl = new Map(gscRows.map((row) => [normalizeUrl(row.url), row]));
function similaritySummary(url) {
  const pairs = similarityByUrl.get(normalizeUrl(url)) || [];
  const relationships = [...new Set(pairs.map((pair) => pair.intent_relationship).filter(Boolean))].sort();
  const maxRaw = Math.max(0, ...pairs.map((pair) => number(pair.raw_main_similarity) || 0));
  const maxAdjusted = Math.max(0, ...pairs.map((pair) => number(pair.boilerplate_adjusted_similarity) || 0));
  return { pairs, relationships, maxRaw, maxAdjusted };
}
function mainUniqueRatio(page) {
  const total = number(page.word_count);
  const main = number(page.main_content_word_count);
  return total && main !== null ? Math.min(1, Math.max(0, main / total)) : null;
}
function googleCanonicalTarget(row) { return row.google_canonical || ''; }

const masterRows = intendedPages.map((page) => {
  const evidence = evidenceByUrl.get(normalizeUrl(page.url));
  const signature = signatureByUrl.get(normalizeUrl(page.url));
  const similarity = similaritySummary(page.url);
  const remediation = remediationByUrl.get(normalizeUrl(page.url));
  const lastmodAge = ageFromDate(page.sitemap_lastmod);
  const crawlAge = number(evidence.last_crawl_age_days);
  const localLinks = number(page.internal_link_count);
  const weakDiscovery = evidence.referring_url_count === 0 && localLinks !== null && localLinks <= 5 ? 'yes' : 'no';
  return {
    ...page,
    locale_group: localeGroup(page.locale),
    sitemap: page.sitemap_name || '',
    sitemap_lastmod: page.sitemap_lastmod || '',
    sitemap_lastmod_age_days: lastmodAge,
    unique_content_ratio: mainUniqueRatio(page),
    tool_slug: signature?.tool_slug || '',
    functional_signature: signature?.intent_signature || '',
    signature_confidence: signature?.signature_confidence || '',
    similarity_pair_count: similarity.pairs.length,
    max_raw_similarity: similarity.maxRaw || '',
    max_boilerplate_adjusted_similarity: similarity.maxAdjusted || '',
    intent_relationships: similarity.relationships.join('; '),
    v2_action: remediation?.action || '',
    v2_similarity_risk: remediation?.v2_similarity_risk || '',
    value_score: page.value_score || '',
    google_status: evidence.url_status,
    google_known: evidence.google_known,
    google_crawled: evidence.google_crawled,
    google_indexed: evidence.google_indexed,
    inspected_at: evidence.inspected_at,
    inspection_result_link: evidence.inspection_result_link,
    verdict: evidence.verdict,
    coverage_state: evidence.coverage_state,
    robots_txt_state: evidence.robots_txt_state,
    indexing_state: evidence.indexing_state,
    last_crawl_time: evidence.last_crawl_time,
    last_crawl_age_days: crawlAge,
    crawl_recency_bucket: evidence.crawl_recency_bucket,
    page_fetch_state: evidence.page_fetch_state,
    google_canonical: googleCanonicalTarget(evidence),
    user_canonical: evidence.user_canonical,
    canonical_category: evidence.canonical_category,
    crawled_as: evidence.crawled_as,
    sitemap_count: evidence.sitemap_count,
    sitemap_urls: evidence.sitemap_urls,
    referring_url_count: evidence.referring_url_count,
    referring_urls: evidence.referring_urls,
    weak_discovery_support: weakDiscovery,
    rich_results_available: evidence.rich_results_available,
    api_error: evidence.api_error,
    api_status: evidence.api_status,
    search_28_clicks: analyticsValue(analytics28, page.url, 'clicks'),
    search_28_impressions: analyticsValue(analytics28, page.url, 'impressions'),
    search_28_ctr: analyticsValue(analytics28, page.url, 'ctr'),
    search_28_position: analyticsValue(analytics28, page.url, 'position'),
    search_90_clicks: analyticsValue(analytics90, page.url, 'clicks'),
    search_90_impressions: analyticsValue(analytics90, page.url, 'impressions'),
    search_90_ctr: analyticsValue(analytics90, page.url, 'ctr'),
    search_90_position: analyticsValue(analytics90, page.url, 'position'),
  };
});

const masterColumns = [
  'url', 'locale', 'locale_group', 'page_type', 'content_cluster', 'sitemap', 'sitemap_lastmod', 'sitemap_lastmod_age_days',
  'production_status', 'indexable', 'internal_link_count', 'internal_link_source_count', 'crawl_depth', 'word_count', 'main_content_word_count',
  'unique_content_ratio', 'value_score', 'title', 'tool_slug', 'functional_signature', 'signature_confidence', 'similarity_pair_count',
  'max_raw_similarity', 'max_boilerplate_adjusted_similarity', 'intent_relationships', 'v2_action', 'v2_similarity_risk',
  'google_status', 'google_known', 'google_crawled', 'google_indexed', 'inspected_at', 'inspection_result_link', 'verdict', 'coverage_state',
  'robots_txt_state', 'indexing_state', 'last_crawl_time', 'last_crawl_age_days', 'crawl_recency_bucket', 'page_fetch_state', 'google_canonical',
  'user_canonical', 'canonical_category', 'crawled_as', 'sitemap_count', 'sitemap_urls', 'referring_url_count', 'referring_urls',
  'weak_discovery_support', 'rich_results_available', 'api_error', 'api_status', 'search_28_clicks', 'search_28_impressions', 'search_28_ctr',
  'search_28_position', 'search_90_clicks', 'search_90_impressions', 'search_90_ctr', 'search_90_position',
];
write(path.join(DATA_DIR, 'gsc-url-inspection.csv'), toCsv(gscRows, [
  'url', 'inspected_at', 'inspection_result_link', 'url_status', 'google_known', 'google_crawled', 'google_indexed', 'verdict',
  'coverage_state', 'robots_txt_state', 'indexing_state', 'last_crawl_time', 'page_fetch_state', 'google_canonical', 'user_canonical',
  'canonical_category', 'crawled_as', 'sitemap_count', 'sitemap_urls', 'referring_url_count', 'referring_urls', 'rich_results_available',
  'api_error', 'api_status', 'last_crawl_age_days', 'crawl_recency_bucket', 'weak_discovery_support',
]));
write(path.join(DATA_DIR, 'index-evidence-master.csv'), toCsv(masterRows, masterColumns));

function statusCount(rows, status) { return rows.filter((row) => (row.google_status || row.url_status) === status).length; }
function countWhere(rows, predicate) { return rows.filter(predicate).length; }
function rate(value, total) { return total ? Number((value / total).toFixed(4)) : null; }
function groupSummary(rows, field, order = []) {
  const groups = new Map();
  for (const row of rows) {
    const key = row[field] || 'unknown';
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(row);
  }
  const keys = [...new Set([...order, ...groups.keys()])].filter((key) => groups.has(key));
  return keys.map((key) => {
    const group = groups.get(key);
    const crawls = group.map((row) => number(row.last_crawl_age_days)).filter((value) => value !== null);
    return {
      [field]: key,
      total: group.length,
      google_known: countWhere(group, (row) => row.google_known === 'yes'),
      crawled: countWhere(group, (row) => row.google_crawled === 'yes'),
      indexed: statusCount(group, URL_STATUS.INDEXED),
      crawled_not_indexed: statusCount(group, URL_STATUS.CRAWLED_NOT_INDEXED),
      discovered_not_indexed: statusCount(group, URL_STATUS.DISCOVERED_NOT_INDEXED),
      canonical_problem: countWhere(group, (row) => ['GOOGLE_SELECTED_OTHER_INTERNAL', 'GOOGLE_SELECTED_EXTERNAL'].includes(row.canonical_category)),
      blocked_error: statusCount(group, URL_STATUS.BLOCKED_OR_ERROR),
      unknown: statusCount(group, URL_STATUS.UNKNOWN),
      acceptance_rate: rate(statusCount(group, URL_STATUS.INDEXED), group.length),
      median_last_crawl_age_days: median(crawls),
      mean_last_crawl_age_days: mean(crawls),
    };
  });
}
const groupColumns = ['total', 'google_known', 'crawled', 'indexed', 'crawled_not_indexed', 'discovered_not_indexed', 'canonical_problem', 'blocked_error', 'unknown', 'acceptance_rate', 'median_last_crawl_age_days', 'mean_last_crawl_age_days'];
const pageTypeSummary = groupSummary(masterRows, 'page_type', ['home', 'hub', 'tool', 'guide', 'workflow', 'category', 'audience', 'methodology', 'other', 'legal', 'support']);
const localeSummary = groupSummary(masterRows, 'locale_group', ['zh', 'en', 'es', 'fr']);
const clusterSummary = groupSummary(masterRows, 'content_cluster', ['image', 'pdf', 'statistics', 'random', 'text', 'time', 'money', 'security', 'drawing', 'draw', 'general']);
write(path.join(DATA_DIR, 'page-type-indexing.csv'), toCsv(pageTypeSummary, ['page_type', ...groupColumns]));
write(path.join(DATA_DIR, 'locale-indexing.csv'), toCsv(localeSummary, ['locale_group', ...groupColumns]));
write(path.join(DATA_DIR, 'cluster-indexing.csv'), toCsv(clusterSummary, ['content_cluster', ...groupColumns]));

const coreTools = masterRows.filter((row) => row.sitemap === 'sitemap-tools.xml');
const toolColumns = ['url', 'tool_slug', 'locale', 'content_cluster', 'functional_signature', 'google_status', 'google_known', 'google_crawled', 'google_indexed', 'coverage_state', 'last_crawl_time', 'google_canonical', 'user_canonical', 'canonical_category', 'internal_link_count', 'crawl_depth', 'value_score', 'search_28_clicks', 'search_28_impressions', 'search_28_position', 'referring_url_count', 'sitemap_count', 'inspection_result_link'];
write(path.join(DATA_DIR, 'tool-index-status.csv'), toCsv(coreTools, toolColumns));

const canonicalColumns = ['url', 'google_status', 'google_canonical', 'user_canonical', 'canonical_category', 'coverage_state', 'tool_slug', 'functional_signature', 'similarity_pair_count', 'max_boilerplate_adjusted_similarity', 'intent_relationships', 'inspection_result_link'];
write(path.join(DATA_DIR, 'canonical-divergence.csv'), toCsv(masterRows, canonicalColumns));
write(path.join(DATA_DIR, 'crawl-recency.csv'), toCsv(masterRows, ['url', 'locale', 'page_type', 'content_cluster', 'google_status', 'last_crawl_time', 'last_crawl_age_days', 'crawl_recency_bucket', 'sitemap_lastmod', 'sitemap_lastmod_age_days', 'page_fetch_state', 'inspection_result_link']));

function markdownTable(rows, columns) {
  return [`| ${columns.join(' | ')} |`, `| ${columns.map(() => '---').join(' | ')} |`, ...rows.map((row) => `| ${columns.map((column) => row[column] ?? '').join(' | ')} |`)].join('\n');
}
function display(value, digits = 2) { return value === null || value === '' || value === undefined ? 'UNKNOWN' : formatNumber(Number(value), digits); }
function currentFunnel() {
  const inspected = gscRows.filter((row) => row.api_status === 200).length;
  return [
    { stage: 'Intended indexable', urls: intendedPages.length, definition: 'Phase 1 inventory indexable=yes' },
    { stage: 'Google inspected successfully', urls: inspected, definition: 'URL Inspection API HTTP 200' },
    { stage: 'Google knows', urls: countWhere(gscRows, (row) => row.google_known === 'yes'), definition: 'coverage_state is not unknown to Google' },
    { stage: 'Google crawled', urls: countWhere(gscRows, (row) => row.google_crawled === 'yes'), definition: 'lastCrawlTime or indexed/crawled status present' },
    { stage: 'Google indexed', urls: statusCount(gscRows, URL_STATUS.INDEXED), definition: 'Indexed status from API response' },
  ];
}
const funnel = currentFunnel();
const statusRows = Object.values(URL_STATUS).map((status) => ({ status, urls: statusCount(gscRows, status), rate: rate(statusCount(gscRows, status), gscRows.length) }));
write(path.join(DATA_DIR, 'current-index-funnel.md'), [
  '# FunnyTools Current URL-Level Google Index Funnel', '',
  `Generated: ${TODAY}; inspection snapshot timestamp: ${OBSERVED_AT}.`, '',
  'The URL Inspection API reports Google indexed-version evidence only. Current production live validation remains a separate Phase 1 fact: 712/712 HTTP 200. These are not mixed.', '',
  markdownTable(funnel, ['stage', 'urls', 'definition']), '',
  '## Mutually exclusive URL status classification', '',
  markdownTable(statusRows, ['status', 'urls', 'rate']), '',
  `Current inspected index acceptance: **${statusCount(gscRows, URL_STATUS.INDEXED)} / ${gscRows.length} = ${display(rate(statusCount(gscRows, URL_STATUS.INDEXED), gscRows.length) * 100, 2)}%**.`, '',
  'The historical 54 indexed / 401 Google-known summary is retained only as a 2026-09-04 historical reference and is not used as the current rate.', '',
  'Search Analytics 28/90-day page rows are supporting evidence only; an absent page row does not prove that a URL is not indexed.',
].join('\n'));

function compareRows(leftRows, rightRows, labelLeft, labelRight) {
  const fields = [
    ['URLs', (rows) => rows.length],
    ['Median internal links', (rows) => median(rows.map((row) => number(row.internal_link_count)).filter((value) => value !== null))],
    ['Median crawl depth', (rows) => median(rows.map((row) => number(row.crawl_depth)).filter((value) => value !== null))],
    ['Median main-content words', (rows) => median(rows.map((row) => number(row.main_content_word_count)).filter((value) => value !== null))],
    ['Median unique-content ratio proxy', (rows) => median(rows.map((row) => number(row.unique_content_ratio)).filter((value) => value !== null))],
    ['Median value score', (rows) => median(rows.map((row) => number(row.value_score)).filter((value) => value !== null))],
    ['Median adjusted similarity', (rows) => median(rows.map((row) => number(row.max_boilerplate_adjusted_similarity)).filter((value) => value !== null))],
    ['Median last crawl age days', (rows) => median(rows.map((row) => number(row.last_crawl_age_days)).filter((value) => value !== null))],
    ['Rows with search impressions (28d)', (rows) => countWhere(rows, (row) => number(row.search_28_impressions) > 0)],
    ['Rows with self canonical', (rows) => countWhere(rows, (row) => row.canonical_category === 'SELF_MATCH')],
  ];
  return fields.map(([metric, fn]) => ({ metric, [labelLeft]: fn(leftRows), [labelRight]: fn(rightRows) }));
}
const indexedRows = masterRows.filter((row) => row.google_status === URL_STATUS.INDEXED);
const crawledNotIndexedRows = masterRows.filter((row) => row.google_status === URL_STATUS.CRAWLED_NOT_INDEXED);
const indexedVsNotIndexed = [
  '# Indexed vs Crawled-Not-Indexed', '',
  `Snapshot: ${OBSERVED_AT}. The comparison is descriptive association, not a causal test.`, '',
  `Indexed rows: ${indexedRows.length}; Crawled-not-indexed rows: ${crawledNotIndexedRows.length}.`, '',
  markdownTable(compareRows(indexedRows, crawledNotIndexedRows, 'indexed', 'crawled_not_indexed'), ['metric', 'indexed', 'crawled_not_indexed']), '',
  '## Page type distribution', '',
  markdownTable(groupSummary([...indexedRows, ...crawledNotIndexedRows].map((row) => ({ ...row, comparison_status: row.google_status === URL_STATUS.INDEXED ? 'indexed' : 'crawled-not-indexed' })), 'comparison_status', ['indexed', 'crawled-not-indexed']), ['comparison_status', ...groupColumns]), '',
  '## Locale distribution', '',
  markdownTable(groupSummary([...indexedRows, ...crawledNotIndexedRows].map((row) => ({ ...row, comparison_status: row.google_status === URL_STATUS.INDEXED ? 'indexed' : 'crawled-not-indexed' })), 'locale_group', ['zh', 'en', 'es', 'fr']), ['locale_group', ...groupColumns]), '',
  'Interpretation rule: differences are associated with current Google acceptance in this snapshot. They do not establish that links, freshness, content length, similarity, or value score caused indexing.',
].join('\n');
write(path.join(DATA_DIR, 'indexed-vs-not-indexed.md'), indexedVsNotIndexed);

function signalRate(rows, predicate) { return rate(countWhere(rows, predicate), rows.length); }
function confidenceForCount(count, total) {
  if (!count) return 'REJECTED';
  if (count >= 20 && total >= 100) return 'HIGH';
  if (count >= 5) return 'MEDIUM';
  return 'LOW';
}
const neverCrawled = masterRows.filter((row) => row.crawl_recency_bucket === 'never crawled');
const afterCollapseCrawled = masterRows.filter((row) => row.last_crawl_time && row.last_crawl_time.slice(0, 10) > '2026-08-22');
const aroundCollapseCrawled = masterRows.filter((row) => row.last_crawl_time && ['2026-08-21', '2026-08-22'].includes(row.last_crawl_time.slice(0, 10)));
const canonicalDivergence = masterRows.filter((row) => ['GOOGLE_SELECTED_OTHER_INTERNAL', 'GOOGLE_SELECTED_EXTERNAL'].includes(row.canonical_category));
const blockedOrError = masterRows.filter((row) => row.google_status === URL_STATUS.BLOCKED_OR_ERROR);
const weakDiscovery = masterRows.filter((row) => row.weak_discovery_support === 'yes');
const highSimilarityNotIndexed = crawledNotIndexedRows.filter((row) => number(row.max_boilerplate_adjusted_similarity) >= 0.8);
const rootSignals = [
  {
    hypothesis: 'Google-selected canonical differs from the inspected URL',
    confidence: confidenceForCount(canonicalDivergence.length, masterRows.length),
    observed_urls: canonicalDivergence.length,
    evidence: canonicalDivergence.length ? `${canonicalDivergence.length} URL(s) have a non-self Google canonical in the current snapshot; inspect internal/external target before any canonical action.` : 'No current non-self Google canonical observed.',
    limitation: 'A canonical difference is direct evidence of Google selection, not proof of why Google selected it or of a content cause.',
  },
  {
    hypothesis: 'Google crawl recency or absence of recrawl remains an observation-window signal',
    confidence: confidenceForCount(neverCrawled.length, masterRows.length),
    observed_urls: neverCrawled.length,
    evidence: `${neverCrawled.length} URL(s) have no lastCrawlTime; ${afterCollapseCrawled.length} have a crawl after 2026-08-22; ${aroundCollapseCrawled.length} have a crawl dated 2026-08-21/22.`,
    limitation: 'URL Inspection cannot reconstruct the August 21–22 historical state; current last crawl only shows what Google has reported now.',
  },
  {
    hypothesis: 'Crawled-not-indexed is associated with boilerplate-adjusted similarity',
    confidence: crawledNotIndexedRows.length && highSimilarityNotIndexed.length ? 'MEDIUM' : 'REJECTED',
    observed_urls: highSimilarityNotIndexed.length,
    evidence: `${highSimilarityNotIndexed.length} crawled-not-indexed URL(s) have max adjusted similarity >= 0.80; indexed comparison rate is ${display(signalRate(indexedRows, (row) => number(row.max_boilerplate_adjusted_similarity) >= 0.8) * 100, 2)}% versus ${display(signalRate(crawledNotIndexedRows, (row) => number(row.max_boilerplate_adjusted_similarity) >= 0.8) * 100, 2)}%.`,
    limitation: 'Similarity is supporting evidence only and does not prove duplicate content, cannibalization, or causality.',
  },
  {
    hypothesis: 'Weak discovery support combines empty API referrers with low local internal links',
    confidence: confidenceForCount(weakDiscovery.length, masterRows.length),
    observed_urls: weakDiscovery.length,
    evidence: `${weakDiscovery.length} URL(s) meet the conservative local condition of zero API referring URLs and at most five local internal links.`,
    limitation: 'The API says referringUrls is not exhaustive; this is a candidate signal, not an orphan determination.',
  },
  {
    hypothesis: 'Current robots, noindex, fetch, or redirect errors are technical blockers',
    confidence: blockedOrError.length ? 'CONFIRMED' : 'REJECTED',
    observed_urls: blockedOrError.length,
    evidence: blockedOrError.length ? `${blockedOrError.length} URL(s) returned a blocked/error classification with preserved robots/indexing/fetch fields.` : 'No URL returned a current blocked/error classification.',
    limitation: 'Current production HTTP 200 and current indexed-version inspection are separate observations; this does not reconstruct an older crawl.',
  },
].sort((left, right) => right.observed_urls - left.observed_urls).slice(0, 5);
write(path.join(DATA_DIR, 'root-cause-evidence.md'), [
  '# Root-Cause Evidence — Phase 2A', '',
  `Snapshot timestamp: ${OBSERVED_AT}.`, '',
  'Confidence describes the strength of the current URL-level observation, not causal proof. `CONFIRMED` means the API directly returned the condition; it does not mean the condition caused indexing outcomes.', '',
  ...rootSignals.map((signal, index) => [
    `## ${index + 1}. ${signal.hypothesis}`,
    '',
    `- Confidence: **${signal.confidence}**`,
    `- Observed URLs: ${signal.observed_urls}`,
    `- Evidence: ${signal.evidence}`,
    `- Limitation: ${signal.limitation}`,
    '',
  ].join('\n')),
  '## 2026-08-22 collapse re-evaluation', '',
  `- Last crawl dated 2026-08-21 or 2026-08-22: ${aroundCollapseCrawled.length} URL(s).`,
  `- Re-crawled after 2026-08-22: ${afterCollapseCrawled.length} URL(s).`,
  `- Never crawled in the current snapshot: ${neverCrawled.length} URL(s).`,
  '- Historical Google canonical change: UNKNOWN; one current URL Inspection snapshot cannot prove a change over time.',
  '- Historical status on August 21–22: UNKNOWN; URL Inspection does not provide a historical replay.', '',
  '## Rejected inference boundaries', '',
  '- No single signal is treated as cause. No content, canonical, noindex, redirect, sitemap, or URL action is authorized by this report.',
].join('\n'));

function opportunityScore(row) {
  const value = number(row.value_score) || 0;
  const links = Math.min(100, number(row.internal_link_count) || 0);
  const impressions = Math.min(100, number(row.search_28_impressions) || 0);
  const typeWeight = { tool: 30, guide: 20, workflow: 18, hub: 16, category: 14, home: 14, audience: 10 }[row.page_type] || 5;
  const stateWeight = row.google_status === URL_STATUS.CRAWLED_NOT_INDEXED ? 20 : 0;
  return Math.round(value + links + impressions + typeWeight + stateWeight);
}
function candidateReason(row) {
  return 'Google crawled-not-indexed; current fetch successful; index allowed; self canonical; production status 200; page-type/internal-link/search-support evidence available; proposal only.';
}
const candidatePool = masterRows.filter((row) => row.google_status === URL_STATUS.CRAWLED_NOT_INDEXED
  && String(row.production_status).includes('200')
  && row.page_fetch_state === 'SUCCESSFUL'
  && row.robots_txt_state === 'ALLOWED'
  && row.indexing_state === 'INDEXING_ALLOWED'
  && row.canonical_category === 'SELF_MATCH'
  && row.indexable === 'yes'
  && row.v2_action !== 'WAIT'
  && !['legal', 'support', 'other'].includes(row.page_type)
)
  .map((row) => ({ ...row, opportunity_score: opportunityScore(row) }))
  .sort((left, right) => right.opportunity_score - left.opportunity_score || left.url.localeCompare(right.url));
const treatment = candidatePool.slice(0, 25);
const treatmentUrls = new Set(treatment.map((row) => row.url));
const remainingControls = candidatePool.filter((row) => !treatmentUrls.has(row.url));
const controls = [];
for (const treatmentRow of treatment) {
  const match = remainingControls
    .filter((row) => !controls.some((control) => control.url === row.url))
    .map((row) => {
      const typePenalty = row.page_type === treatmentRow.page_type ? 0 : 1000;
      const localePenalty = row.locale === treatmentRow.locale ? 0 : 500;
      const clusterPenalty = row.content_cluster === treatmentRow.content_cluster ? 0 : 250;
      const agePenalty = Math.abs((number(row.last_crawl_age_days) ?? 999) - (number(treatmentRow.last_crawl_age_days) ?? 999));
      const linkPenalty = Math.abs((number(row.internal_link_count) || 0) - (number(treatmentRow.internal_link_count) || 0));
      return { row, distance: typePenalty + localePenalty + clusterPenalty + agePenalty + linkPenalty };
    })
    .sort((left, right) => left.distance - right.distance || left.row.url.localeCompare(right.row.url))[0];
  if (match) controls.push({ ...match.row, matched_treatment_url: treatmentRow.url, match_distance: match.distance });
}
const candidateColumns = ['candidate_status', 'url', 'matched_treatment_url', 'locale', 'page_type', 'content_cluster', 'tool_slug', 'google_status', 'coverage_state', 'page_fetch_state', 'robots_txt_state', 'indexing_state', 'canonical_category', 'last_crawl_time', 'last_crawl_age_days', 'internal_link_count', 'crawl_depth', 'value_score', 'opportunity_score', 'search_28_clicks', 'search_28_impressions', 'search_28_position', 'functional_signature', 'max_boilerplate_adjusted_similarity', 'reason', 'action'];
const candidateOutput = (row, type, matchUrl = '') => ({ ...row, candidate_status: 'PROPOSAL_ONLY', matched_treatment_url: matchUrl, reason: type === 'treatment' ? candidateReason(row) : 'Matched untreated comparison URL under same page type/locale/cluster with similar crawl age and internal-link level.', action: 'NOT_EXECUTED' });
write(path.join(DATA_DIR, 'phase2b-treatment-candidates.csv'), toCsv(treatment.map((row) => candidateOutput(row, 'treatment')), candidateColumns));
write(path.join(DATA_DIR, 'phase2b-control-candidates.csv'), toCsv(controls.map((row) => candidateOutput(row, 'control', row.matched_treatment_url)), candidateColumns));

const forcedTierPaths = ['/', '/tools', '/category/statistics', '/category/image', '/category/pdf', '/category/random', '/category/text', '/category/time', '/category/money'];
const forcedTier = [];
for (const wanted of forcedTierPaths) {
  const match = masterRows.find((row) => pageUrlPath(row.url) === wanted);
  if (match && !forcedTier.some((row) => row.url === match.url)) forcedTier.push(match);
}
const tierPool = masterRows.filter((row) => !forcedTier.some((item) => item.url === row.url)).sort((left, right) => opportunityScore(right) - opportunityScore(left) || left.url.localeCompare(right.url));
const tierRows = [...forcedTier, ...tierPool].slice(0, 40).map((row, index) => ({ ...row, tier_rank: index + 1, selection_reason: forcedTier.some((item) => item.url === row.url) ? 'required homepage/tools hub/important category' : 'high functional/value/internal-link/search-support score', opportunity_score: opportunityScore(row) }));
const tierColumns = ['tier_rank', 'selection_reason', 'url', 'locale', 'page_type', 'content_cluster', 'tool_slug', 'google_status', 'google_known', 'google_crawled', 'google_indexed', 'coverage_state', 'last_crawl_time', 'last_crawl_age_days', 'google_canonical', 'user_canonical', 'canonical_category', 'internal_link_count', 'crawl_depth', 'value_score', 'opportunity_score', 'search_28_clicks', 'search_28_impressions', 'search_28_position', 'inspection_result_link'];
write(path.join(DATA_DIR, 'tier1-index-status.csv'), toCsv(tierRows, tierColumns));

const searchAnalyticsStatus = searchAnalytics.windows.map((window) => ({ window_days: window.days, start_date: window.startDate, end_date: window.endDate, api_status: window.apiStatus, rows: window.rows.length, pagination_complete: window.paginationComplete, api_error: window.apiError }));
const authStatus = { property: PROPERTY, property_present: true, permission_level: properties.find((entry) => entry.siteUrl === PROPERTY)?.permissionLevel || '', sites_list_http_status: siteList.response.status };
const rawLines = fs.existsSync(RAW_FILE) ? read(RAW_FILE).split(/\r?\n/).filter(Boolean) : [];
if (fs.existsSync(RAW_FILE)) fs.copyFileSync(RAW_FILE, path.join(DATA_DIR, 'gsc-url-inspection-raw.jsonl'));
const secretFree = !rawLines.some((line) => secretScanText(line))
  && !secretScanText(read(path.join(DATA_DIR, 'gsc-url-inspection.csv')))
  && !secretScanText(read(path.join(DATA_DIR, 'index-evidence-master.csv')))
  && !secretScanText(read(path.join(DATA_DIR, 'gsc-url-inspection-raw.jsonl')));
write(path.join(DATA_DIR, 'validation-report.md'), [
  '# FunnyTools Phase 2A Validation Report', '',
  `Generated: ${TODAY}; inspection snapshot: ${OBSERVED_AT}.`, '',
  '## Evidence collection', '',
  `- Required property: ${PROPERTY}; sites.list HTTP ${siteList.response.status}; permission: ${authStatus.permission_level || 'not returned'}.`,
  `- Inventory: ${intendedPages.length} intended-indexable URLs; inventory SHA-256: ${inventoryHash}.`,
  `- URL Inspection API endpoint: ${INSPECTION_ENDPOINT}; live inspection was not requested.`,
  `- API-successful URL responses: ${successful.size}/${intendedPages.length}; failed/unknown API responses: ${failed.size}.`,
  `- Raw JSONL latest cache records: ${rawCache.size}; successful cache hits this run: ${cacheHits}; new API calls this run: ${apiCalls}.`,
  `- Request policy: concurrency ${CONCURRENCY}, minimum interval ${MIN_INTERVAL_MS} ms (<=200 requests/minute), exponential backoff for 429/5xx/network errors.`, '',
  '## Derived artifacts', '',
  `- Master join rows: ${masterRows.length}; gsc-url-inspection rows: ${gscRows.length}.`,
  `- Core tool rows: ${coreTools.length}; Tier 1 rows: ${tierRows.length}.`,
  `- Phase 2B proposals: treatment ${treatment.length}; control ${controls.length}; execution ${treatment.length || controls.length ? 'NOT EXECUTED' : 'NONE AVAILABLE'}.`,
  `- Search Analytics windows: ${searchAnalyticsStatus.map((row) => `${row.window_days}d=${row.api_status}/${row.rows} rows`).join('; ')}.`, '',
  '## Secret safety', '',
  `- Raw/API-derived output scan: ${secretFree ? 'PASS' : 'FAIL'}.`,
  '- No access token, refresh token, private key, client secret, cookie, or Authorization header is written to reports or raw responses.', '',
  '## Change control', '',
  '- Page source/content changes: NONE.',
  '- SEO surface changes (canonical, robots, noindex, sitemap, slug, hreflang, lastmod): NONE.',
  '- Production deploy: NOT DEPLOYED.',
].join('\n'));

const funnelRows = currentFunnel();
const currentAcceptance = rate(statusCount(gscRows, URL_STATUS.INDEXED), gscRows.length);
const byTypeDisplay = pageTypeSummary.map((row) => ({ type: pageTypeLabel(row.page_type), total: row.total, indexed: row.indexed, crawled_not_indexed: row.crawled_not_indexed, discovered_not_indexed: row.discovered_not_indexed, acceptance_rate: row.acceptance_rate }));
const byLocaleDisplay = localeSummary.map((row) => ({ locale: row.locale_group, total: row.total, indexed: row.indexed, crawled_not_indexed: row.crawled_not_indexed, discovered_not_indexed: row.discovered_not_indexed, acceptance_rate: row.acceptance_rate, median_last_crawl_age_days: row.median_last_crawl_age_days, mean_last_crawl_age_days: row.mean_last_crawl_age_days }));
const coreStatus = { total: coreTools.length, indexed: statusCount(coreTools, URL_STATUS.INDEXED), crawled_not_indexed: statusCount(coreTools, URL_STATUS.CRAWLED_NOT_INDEXED), discovered: statusCount(coreTools, URL_STATUS.DISCOVERED_NOT_INDEXED), other: coreTools.length - statusCount(coreTools, URL_STATUS.INDEXED) - statusCount(coreTools, URL_STATUS.CRAWLED_NOT_INDEXED) - statusCount(coreTools, URL_STATUS.DISCOVERED_NOT_INDEXED) };
write(path.join(DATA_DIR, 'EXECUTIVE-SUMMARY.md'), [
  '# FunnyTools Index Recovery — Phase 2A URL-Level Google Evidence', '',
  `Snapshot: ${OBSERVED_AT}; property: ${PROPERTY}.`, '',
  '## Current URL-Level Funnel', '',
  markdownTable(funnelRows, ['stage', 'urls', 'definition']), '',
  markdownTable([{ metric: 'Indexed', value: statusCount(gscRows, URL_STATUS.INDEXED) }, { metric: 'Crawled-not-indexed', value: statusCount(gscRows, URL_STATUS.CRAWLED_NOT_INDEXED) }, { metric: 'Discovered-not-indexed', value: statusCount(gscRows, URL_STATUS.DISCOVERED_NOT_INDEXED) }, { metric: 'Canonicalized elsewhere', value: statusCount(gscRows, URL_STATUS.CANONICALIZED_ELSEWHERE) }, { metric: 'Blocked/error', value: statusCount(gscRows, URL_STATUS.BLOCKED_OR_ERROR) }, { metric: 'Unknown', value: statusCount(gscRows, URL_STATUS.UNKNOWN) }], ['metric', 'value']), '',
  `Current inspected index acceptance: **${statusCount(gscRows, URL_STATUS.INDEXED)} / ${gscRows.length} = ${display(currentAcceptance * 100, 2)}%**.`, '',
  'Historical 54/401 is retained only as the 2026-09-04 historical GSC summary; it is not the current rate.', '',
  '## By Type', '',
  markdownTable(byTypeDisplay, ['type', 'total', 'indexed', 'crawled_not_indexed', 'discovered_not_indexed', 'acceptance_rate']), '',
  '## By Locale', '',
  markdownTable(byLocaleDisplay, ['locale', 'total', 'indexed', 'crawled_not_indexed', 'discovered_not_indexed', 'acceptance_rate', 'median_last_crawl_age_days', 'mean_last_crawl_age_days']), '',
  '## Core Tools', '',
  `83 core tools inventory rows: **${coreStatus.total}**; indexed ${coreStatus.indexed}; crawled-not-indexed ${coreStatus.crawled_not_indexed}; discovered-not-indexed ${coreStatus.discovered}; other ${coreStatus.other}.`, '',
  '## Strongest Root-Cause Signals', '',
  ...rootSignals.map((signal, index) => `${index + 1}. **${signal.confidence}** — ${signal.hypothesis}: ${signal.evidence}`), '',
  'These are URL-level observations and associations, not causal claims.', '',
  '## Google Canonical', '',
  markdownTable([
    { category: 'SELF_MATCH', urls: countWhere(gscRows, (row) => row.canonical_category === 'SELF_MATCH') },
    { category: 'GOOGLE_SELECTED_OTHER_INTERNAL', urls: countWhere(gscRows, (row) => row.canonical_category === 'GOOGLE_SELECTED_OTHER_INTERNAL') },
    { category: 'GOOGLE_SELECTED_EXTERNAL', urls: countWhere(gscRows, (row) => row.canonical_category === 'GOOGLE_SELECTED_EXTERNAL') },
    { category: 'GOOGLE_CANONICAL_ABSENT', urls: countWhere(gscRows, (row) => row.canonical_category === 'GOOGLE_CANONICAL_ABSENT') },
  ], ['category', 'urls']), '',
  'A non-self Google canonical is a recommendation signal only; no canonical, redirect, merge, delete, or noindex change was executed.', '',
  '## Phase 2B Proposal', '',
  `Treatment: ${treatment.length}; control: ${controls.length}; **NOT EXECUTED**.`, '',
  'Candidates require human review. Control rows remain untreated for a future 14–21 day comparison.', '',
  '## Safety', '',
  '- Content changes: NONE.',
  '- SEO surface changes: NONE.',
  '- Production deploy: NOT DEPLOYED.',
  '- No live inspection was requested; API evidence is indexed-version evidence only.',
].join('\n'));

const secretFreeFinal = secretFree && !secretScanText(read(path.join(DATA_DIR, 'EXECUTIVE-SUMMARY.md')));
if (!secretFreeFinal) throw new Error('Secret safety scan failed; refusing successful completion.');
console.log(JSON.stringify({
  generatedAt: TODAY,
  property: PROPERTY,
  intendedIndexable: intendedPages.length,
  apiSuccessful: successful.size,
  apiFailed: failed.size,
  cacheHits,
  apiCalls,
  currentIndexAcceptance: currentAcceptance,
  statusCounts: Object.fromEntries(statusRows.map((row) => [row.status, row.urls])),
  coreTools: coreStatus,
  treatmentCandidates: treatment.length,
  controlCandidates: controls.length,
  rawRecords: rawCache.size,
  secretFree: secretFreeFinal,
  contentChanges: 'NONE',
  seoSurfaceChanges: 'NONE',
  productionDeploy: 'NOT DEPLOYED',
}, null, 2));
