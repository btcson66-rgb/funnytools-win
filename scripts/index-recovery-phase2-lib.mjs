import { createHash } from 'node:crypto';

export const URL_STATUS = Object.freeze({
  INDEXED: 'Indexed',
  CRAWLED_NOT_INDEXED: 'Crawled Not Indexed',
  DISCOVERED_NOT_INDEXED: 'Discovered Not Indexed',
  CANONICALIZED_ELSEWHERE: 'Canonicalized Elsewhere',
  BLOCKED_OR_ERROR: 'Blocked/Error',
  UNKNOWN: 'Unknown',
});

export function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = '';
  let quoted = false;
  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    if (char === '"' && quoted && text[index + 1] === '"') { cell += '"'; index += 1; continue; }
    if (char === '"') { quoted = !quoted; continue; }
    if (char === ',' && !quoted) { row.push(cell); cell = ''; continue; }
    if ((char === '\n' || char === '\r') && !quoted) {
      if (char === '\r' && text[index + 1] === '\n') index += 1;
      row.push(cell); cell = '';
      if (row.some((value) => value.trim())) rows.push(row);
      row = [];
      continue;
    }
    cell += char;
  }
  if (cell || row.length) { row.push(cell); if (row.some((value) => value.trim())) rows.push(row); }
  if (!rows.length) return [];
  const headers = rows.shift().map((value) => value.trim());
  return rows.map((values) => Object.fromEntries(headers.map((header, index) => [header, (values[index] ?? '').trim()])));
}

export function escapeCsv(value) {
  const text = value === null || value === undefined ? '' : String(value);
  return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

export function toCsv(rows, columns) {
  return [columns.join(','), ...rows.map((row) => columns.map((column) => escapeCsv(row[column])).join(','))].join('\n');
}

export function sha256(value) {
  return createHash('sha256').update(value).digest('hex');
}

export function normalizeUrl(value) {
  try {
    const url = new URL(value);
    let pathname = url.pathname || '/';
    if (pathname !== '/') pathname = pathname.replace(/\/+$/, '');
    return `${url.protocol.toLowerCase()}//${url.host.toLowerCase()}${pathname}${url.search}`;
  } catch {
    return String(value || '').trim().replace(/\/+$/, '') || '/';
  }
}

export function localeGroup(locale) {
  return locale === 'zh-TW' ? 'zh' : locale || 'unknown';
}

export function safeErrorMessage(errorBody, fallback = '') {
  const message = errorBody?.error?.message || errorBody?.message || errorBody?.error || fallback;
  return String(message || '').replace(/[\r\n]+/g, ' ').slice(0, 500);
}

export function isRetryableStatus(status) {
  return status === 429 || status >= 500 || status === 0;
}

export function isReusableRecord(record, { refreshErrors = false } = {}) {
  if (!record || !record.url) return false;
  if (refreshErrors) return false;
  if (record.api_status === 200 && record.response?.inspectionResult) return true;
  return Number(record.api_status) >= 400 && Number(record.api_status) < 500 && Number(record.api_status) !== 429;
}

function text(value) { return String(value || '').toLocaleLowerCase(); }

export function canonicalCategory(inspectionUrl, googleCanonical) {
  if (!googleCanonical) return 'GOOGLE_CANONICAL_ABSENT';
  const inspected = normalizeUrl(inspectionUrl);
  const google = normalizeUrl(googleCanonical);
  if (google === inspected) return 'SELF_MATCH';
  try {
    return new URL(googleCanonical).hostname.toLocaleLowerCase() === new URL(inspectionUrl).hostname.toLocaleLowerCase()
      ? 'GOOGLE_SELECTED_OTHER_INTERNAL'
      : 'GOOGLE_SELECTED_EXTERNAL';
  } catch {
    return 'UNKNOWN';
  }
}

function hasCanonicalDivergence(inspectionUrl, result) {
  return Boolean(result?.googleCanonical && canonicalCategory(inspectionUrl, result.googleCanonical) !== 'SELF_MATCH');
}

export function classifyUrlStatus(inspectionUrl, result, apiError = '') {
  if (!result) return URL_STATUS.UNKNOWN;
  const coverage = text(result.coverageState);
  const indexing = text(result.indexingState);
  const robots = text(result.robotsTxtState);
  const fetchState = text(result.pageFetchState);
  const verdict = text(result.verdict);

  const indexedCoverage = coverage.includes('submitted and indexed')
    || coverage.includes('已提交並建立索引')
    || coverage.includes('enviada e indexada')
    || coverage.includes('envoyée et indexée')
    || coverage.includes('envoyee et indexee');
  const crawledCoverage = /(crawled|已檢索|已抓取|rastreada|explorée|exploree)/i.test(coverage)
    && /(not indexed|尚未建立索引|sin indexar|non indexée|non indexee)/i.test(coverage);
  const discoveredCoverage = /(discovered|已發現|descubierta|détectée|detectee)/i.test(coverage)
    && /(not indexed|尚未建立索引|sin indexar|non indexée|non indexee)/i.test(coverage);
  const unknownCoverage = coverage.includes('unknown to google')
    || coverage.includes('not known to google')
    || coverage.includes('無法辨識')
    || coverage.includes('no reconoce')
    || coverage.includes('ne reconnaît pas')
    || coverage.includes('ne reconnait pas');
  const fetchError = fetchState
    && !fetchState.includes('unspecified')
    && !fetchState.includes('successful')
    && !fetchState.includes('unknown');

  if (hasCanonicalDivergence(inspectionUrl, result)
    && (coverage.includes('canonical') || indexing.includes('canonical') || verdict === 'neutral' || verdict === 'pass')) {
    return URL_STATUS.CANONICALIZED_ELSEWHERE;
  }
  if (robots.includes('blocked') || robots.includes('error') || indexing.includes('blocked')
    || coverage.includes('blocked') || coverage.includes('noindex') || coverage.includes('無索引') || coverage.includes('no index') || coverage.includes('redirect')
    || fetchError
    || apiError) return URL_STATUS.BLOCKED_OR_ERROR;
  if (indexedCoverage || (verdict === 'pass' && !coverage.includes('not indexed') && !coverage.includes('尚未建立索引') && !coverage.includes('sin indexar') && !coverage.includes('non index'))) {
    return URL_STATUS.INDEXED;
  }
  if (crawledCoverage) return URL_STATUS.CRAWLED_NOT_INDEXED;
  if (discoveredCoverage) return URL_STATUS.DISCOVERED_NOT_INDEXED;
  if (unknownCoverage) return URL_STATUS.UNKNOWN;
  return URL_STATUS.UNKNOWN;
}

export function googleKnown(result) {
  if (!result) return 'UNKNOWN';
  const coverage = text(result.coverageState);
  if (coverage.includes('unknown to google')
    || coverage.includes('not known to google')
    || coverage.includes('無法辨識')
    || coverage.includes('no reconoce')
    || coverage.includes('ne reconnaît pas')
    || coverage.includes('ne reconnait pas')) return 'no';
  return result.coverageState ? 'yes' : 'unknown';
}

export function googleCrawled(result, urlStatus) {
  if (!result) return 'UNKNOWN';
  if (result.lastCrawlTime || urlStatus === URL_STATUS.CRAWLED_NOT_INDEXED || urlStatus === URL_STATUS.INDEXED) return 'yes';
  if (urlStatus === URL_STATUS.DISCOVERED_NOT_INDEXED) return 'no';
  return 'unknown';
}

export function crawlAgeDays(lastCrawlTime, inspectedAt) {
  if (!lastCrawlTime) return null;
  const crawl = Date.parse(lastCrawlTime);
  const inspected = Date.parse(inspectedAt);
  if (!Number.isFinite(crawl) || !Number.isFinite(inspected)) return null;
  return Math.max(0, Math.floor((inspected - crawl) / 86400000));
}

export function crawlRecencyBucket(lastCrawlTime, inspectedAt) {
  const age = crawlAgeDays(lastCrawlTime, inspectedAt);
  if (age === null) return 'never crawled';
  if (age < 7) return '<7 days';
  if (age <= 14) return '7–14 days';
  if (age <= 30) return '15–30 days';
  return '>30 days';
}

export function richResultsAvailability(inspectionResult) {
  const result = inspectionResult?.richResultsResult;
  if (!result) return 'UNKNOWN';
  if (result.verdict === 'PASS' || (result.detectedItems || []).length > 0) return 'YES';
  return 'NO';
}

export function resultToEvidenceRow({ url, inspectedAt, apiStatus, response, apiError = '' }) {
  const inspectionResult = response?.inspectionResult || null;
  const result = inspectionResult?.indexStatusResult || null;
  const urlStatus = classifyUrlStatus(url, result, apiError);
  const googleCanonical = result?.googleCanonical || '';
  const sitemaps = Array.isArray(result?.sitemap) ? result.sitemap : [];
  const referringUrls = Array.isArray(result?.referringUrls) ? result.referringUrls : [];
  return {
    url,
    inspected_at: inspectedAt || '',
    inspection_result_link: inspectionResult?.inspectionResultLink || '',
    url_status: urlStatus,
    google_known: googleKnown(result),
    google_crawled: googleCrawled(result, urlStatus),
    google_indexed: urlStatus === URL_STATUS.INDEXED ? 'yes' : urlStatus === URL_STATUS.UNKNOWN ? 'unknown' : 'no',
    verdict: result?.verdict || '',
    coverage_state: result?.coverageState || '',
    robots_txt_state: result?.robotsTxtState || '',
    indexing_state: result?.indexingState || '',
    last_crawl_time: result?.lastCrawlTime || '',
    page_fetch_state: result?.pageFetchState || '',
    google_canonical: googleCanonical,
    user_canonical: result?.userCanonical || '',
    canonical_category: canonicalCategory(url, googleCanonical),
    crawled_as: result?.crawledAs || '',
    sitemap_count: sitemaps.length,
    sitemap_urls: sitemaps.join('; '),
    referring_url_count: referringUrls.length,
    referring_urls: referringUrls.join('; '),
    rich_results_available: richResultsAvailability(inspectionResult),
    api_error: apiError,
    api_status: apiStatus ?? '',
    last_crawl_age_days: crawlAgeDays(result?.lastCrawlTime, inspectedAt),
    crawl_recency_bucket: crawlRecencyBucket(result?.lastCrawlTime, inspectedAt),
    weak_discovery_support: result && referringUrls.length === 0 ? 'candidate only; compare with local internal links' : 'no',
  };
}

export function median(values) {
  const sorted = values.filter(Number.isFinite).sort((a, b) => a - b);
  if (!sorted.length) return null;
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}

export function mean(values) {
  const valid = values.filter(Number.isFinite);
  return valid.length ? valid.reduce((sum, value) => sum + value, 0) / valid.length : null;
}

export function formatNumber(value, digits = 2) {
  return Number.isFinite(value) ? value.toFixed(digits) : 'UNKNOWN';
}

export function secretScanText(textValue) {
  const value = String(textValue || '');
  return [
    /["']?(?:access|refresh)[_ -]?token["']?\s*[:=]\s*["'][^"']+/i,
    /["']?client[_ -]?secret["']?\s*[:=]\s*["'][^"']+/i,
    /-----BEGIN (?:RSA |EC )?PRIVATE KEY-----/i,
    /authorization\s*:\s*bearer\s+[A-Za-z0-9._~-]{20,}/i,
  ].some((pattern) => pattern.test(value));
}
