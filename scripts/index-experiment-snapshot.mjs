import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { googleAccessToken, fetchJson } from './seo-indexing-utils.mjs';
import {
  classifyUrlStatus,
  crawlAgeDays,
  crawlRecencyBucket,
  escapeCsv,
  parseCsv,
  resultToEvidenceRow,
  safeErrorMessage,
  secretScanText,
  sha256,
  toCsv,
} from './index-recovery-phase2-lib.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const REPORT_DIR = path.join(ROOT, 'reports', 'index-recovery-phase2b');
const PAIRS_FILE = path.join(REPORT_DIR, 'experiment-pairs.csv');
const MASTER_FILE = path.join(ROOT, 'reports', 'index-recovery-phase2', 'index-evidence-master.csv');
const INSPECTION_ENDPOINT = 'https://searchconsole.googleapis.com/v1/urlInspection/index:inspect';
const PROPERTY = process.env.FUNNYTOOLS_GSC_PROPERTY?.trim() || 'sc-domain:funnytools.win';

function argValue(name, fallback = '') {
  const index = process.argv.indexOf(name);
  return index >= 0 && process.argv[index + 1] ? process.argv[index + 1] : fallback;
}
function hasFlag(name) { return process.argv.includes(name); }
function read(file) { return fs.readFileSync(file, 'utf8'); }
function write(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, `${value}${String(value).endsWith('\n') ? '' : '\n'}`, 'utf8');
}
function writeJson(file, value) { write(file, JSON.stringify(value, null, 2)); }
function number(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}
function languageCode(locale) { return { 'zh-TW': 'zh-TW', en: 'en-US', es: 'es-ES', fr: 'fr-FR' }[locale] || 'en-US'; }
function pagePath(url) {
  const pathname = new URL(url).pathname || '/';
  const clean = pathname.replace(/^\/+|\/+$/g, '');
  return path.join(ROOT, 'dist', clean, 'index.html');
}
function normalizeHtml(value) {
  return value.replace(/\r\n/g, '\n').replace(/>\s+</g, '><').trim();
}
function mainHtml(html) {
  return html.match(/<main\b[\s\S]*?<\/main>/i)?.[0] || html;
}
function htmlText(html) {
  return html
    .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}
function uniqueMainText(main) {
  return htmlText(main
    .replace(/<nav\b[\s\S]*?<\/nav>/gi, ' ')
    .replace(/<header\b[\s\S]*?<\/header>/gi, ' ')
    .replace(/<footer\b[\s\S]*?<\/footer>/gi, ' '));
}
function titleFrom(html) { return html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim() || ''; }
function h1From(html) { return html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1] ? htmlText(html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)[1]) : ''; }
function descriptionFrom(html) { return html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i)?.[1] || ''; }
function localPageMetrics(url, evidence) {
  const file = pagePath(url);
  if (!fs.existsSync(file)) throw new Error(`Missing rendered page for ${url}: ${file}`);
  const html = read(file);
  const main = mainHtml(html);
  const unique = uniqueMainText(main);
  const wordCount = unique ? unique.split(/\s+/).length : 0;
  return {
    rendered_path: path.relative(ROOT, file).replaceAll('\\', '/'),
    main_content_hash: sha256(normalizeHtml(main)),
    main_unique_content_hash: sha256(unique),
    word_count: wordCount,
    token_count: Array.from(unique).filter((char) => !/\s/.test(char)).length,
    title: titleFrom(html),
    h1: h1From(html),
    description: descriptionFrom(html),
    sitemap_lastmod: evidence?.sitemap_lastmod || '',
    internal_link_count: evidence?.internal_link_count || '',
    crawl_depth: evidence?.crawl_depth || '',
    main_content_excerpt: unique.slice(0, 180).trim(),
  };
}

function loadPairs() {
  if (!fs.existsSync(PAIRS_FILE)) throw new Error('Missing experiment-pairs.csv; run npm.cmd run audit:index-recovery:phase2b first.');
  const pairs = parseCsv(read(PAIRS_FILE));
  const urls = [];
  for (const pair of pairs) {
    for (const cohort of ['treatment', 'control']) {
      const url = pair[`${cohort}_url`];
      if (url && !urls.includes(url)) urls.push(url);
    }
  }
  return { pairs, urls };
}

function loadEvidence() {
  return new Map(parseCsv(read(MASTER_FILE)).map((row) => [row.url, row]));
}

function cohortForUrl(pairs, url) {
  for (const pair of pairs) {
    if (pair.treatment_url === url) return { pair_id: pair.pair_id, cohort: 'treatment', locale: pair.locale, cluster: pair.cluster };
    if (pair.control_url === url) return { pair_id: pair.pair_id, cohort: 'control', locale: pair.locale, cluster: pair.cluster };
  }
  return { pair_id: '', cohort: '', locale: '', cluster: '' };
}

function localRows(pairs, evidence) {
  return loadPairs().urls.map((url) => {
    const meta = cohortForUrl(pairs, url);
    const current = evidence.get(url) || {};
    return {
      snapshot_stage: argValue('--stage', 'local'),
      snapshot_label: argValue('--label', argValue('--stage', 'local')),
      snapshot_at: new Date().toISOString(),
      ...meta,
      url,
      google_status: current.google_status || current.verdict || 'PRE_DEPLOYMENT_BASELINE',
      google_known: current.google_known || '',
      google_crawled: current.google_crawled || '',
      google_indexed: current.google_indexed || '',
      coverage_state: current.coverage_state || '',
      indexing_state: current.indexing_state || '',
      robots_txt_state: current.robots_txt_state || '',
      page_fetch_state: current.page_fetch_state || '',
      last_crawl_time: current.last_crawl_time || '',
      inspection_result_link: current.inspection_result_link || '',
      google_canonical: current.google_canonical || '',
      user_canonical: current.user_canonical || '',
      canonical_category: current.canonical_category || '',
      ...localPageMetrics(url, current),
    };
  });
}

function loadRaw(file) {
  const cache = new Map();
  if (!fs.existsSync(file)) return cache;
  for (const line of read(file).split(/\r?\n/).filter(Boolean)) {
    try { const record = JSON.parse(line); if (record.url) cache.set(record.url, record); } catch { /* keep the raw log append-only */ }
  }
  return cache;
}
function appendRaw(file, record) { fs.appendFileSync(file, `${JSON.stringify(record)}\n`, 'utf8'); }
function sleep(ms) { return new Promise((resolve) => setTimeout(resolve, ms)); }

async function fetchInspections(pairs, evidence, outDir) {
  const rawFile = path.join(outDir, 'raw.jsonl');
  const cache = loadRaw(rawFile);
  const urls = loadPairs().urls;
  const rows = [];
  let token;
  try {
    token = await googleAccessToken('https://www.googleapis.com/auth/webmasters.readonly');
  } catch (error) {
    writeJson(path.join(outDir, 'GSC-AUTH-BLOCKER.json'), {
      status: 'BLOCKED',
      reason: 'OAuth token exchange failed; no credential material was written.',
      error: safeErrorMessage({ message: error.message || String(error) }),
      next_action: 'Refresh the configured read-only Search Console credential, then rerun the same snapshot command.',
    });
    throw error;
  }
  for (const url of urls) {
    let record = cache.get(url);
    if (!record || record.api_status !== 200 || !record.response?.inspectionResult || hasFlag('--refresh-errors')) {
      const meta = cohortForUrl(pairs, url);
      const request = await fetchJson(INSPECTION_ENDPOINT, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ inspectionUrl: url, siteUrl: PROPERTY, languageCode: languageCode(meta.locale) }),
      });
      record = { url, inspected_at: new Date().toISOString(), api_status: request.response.status, api_error: request.response.ok ? '' : safeErrorMessage(request.json), response: request.json || null };
      appendRaw(rawFile, record);
      await sleep(400);
    }
    const inspection = record.response?.inspectionResult?.indexStatusResult || null;
    const apiError = record.api_error || '';
    const result = resultToEvidenceRow({ url, inspectedAt: record.inspected_at, apiStatus: record.api_status, response: record.response, apiError });
    const meta = cohortForUrl(pairs, url);
    const current = evidence.get(url) || {};
    rows.push({
      snapshot_stage: 'gsc_observation',
      snapshot_label: argValue('--label', 'observation'),
      snapshot_at: new Date().toISOString(),
      ...meta,
      ...result,
      ...localPageMetrics(url, current),
      prior_sitemap_lastmod: current.sitemap_lastmod || '',
      prior_internal_link_count: current.internal_link_count || '',
      prior_crawl_depth: current.crawl_depth || '',
      api_observation_status: inspection?.verdict || '',
    });
  }
  return rows;
}

const stage = argValue('--stage', 'local');
const label = argValue('--label', stage);
const outDir = path.join(REPORT_DIR, 'snapshots', label);
fs.mkdirSync(outDir, { recursive: true });
const { pairs } = loadPairs();
const evidence = loadEvidence();
let rows;
if (stage === 'day7' || stage === 'day14' || stage === 'day21' || stage === 'gsc') {
  rows = await fetchInspections(pairs, evidence, outDir);
} else {
  rows = localRows(pairs, evidence);
}

const columns = Object.keys(rows[0] || {});
write(path.join(outDir, 'snapshot.csv'), toCsv(rows, columns));
writeJson(path.join(outDir, 'snapshot-meta.json'), {
  schema_version: 1,
  task: 'FUNNYTOOLS_INDEX_RECOVERY_PHASE2B',
  label,
  stage,
  property: stage === 'day7' || stage === 'day14' || stage === 'day21' || stage === 'gsc' ? PROPERTY : 'not queried for local snapshot',
  urls: rows.length,
  cache_policy: 'Within a label, successful URL Inspection responses are reused; use --refresh-errors only to retry non-success records.',
  background_execution: 'none; this command runs only when explicitly invoked.',
});

const secretText = read(path.join(outDir, 'snapshot.csv')) + read(path.join(outDir, 'snapshot-meta.json'));
if (secretScanText(secretText)) throw new Error('Secret-like material detected in snapshot output');
console.log(JSON.stringify({ stage, label, urls: rows.length, output: path.relative(ROOT, outDir).replaceAll('\\', '/') }, null, 2));
