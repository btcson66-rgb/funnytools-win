import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import test from 'node:test';

import {
  URL_STATUS,
  canonicalCategory,
  classifyUrlStatus,
  crawlRecencyBucket,
  googleKnown,
  resultToEvidenceRow,
  secretScanText,
} from '../scripts/index-recovery-phase2-lib.mjs';

const repo = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
const reportDir = path.join(repo, 'reports', 'index-recovery-phase2');
const inspectedUrl = 'https://funnytools.win/tools/example/';

test('URL Inspection status classifier preserves localized Google coverage states', () => {
  assert.equal(classifyUrlStatus(inspectedUrl, { verdict: 'PASS', coverageState: 'Submitted and indexed' }), URL_STATUS.INDEXED);
  assert.equal(classifyUrlStatus(inspectedUrl, { verdict: 'NEUTRAL', coverageState: '已檢索 - 目前尚未建立索引' }), URL_STATUS.CRAWLED_NOT_INDEXED);
  assert.equal(classifyUrlStatus(inspectedUrl, { verdict: 'NEUTRAL', coverageState: '已發現 - 目前尚未建立索引' }), URL_STATUS.DISCOVERED_NOT_INDEXED);
  assert.equal(classifyUrlStatus(inspectedUrl, { verdict: 'NEUTRAL', coverageState: 'URL is unknown to Google' }), URL_STATUS.UNKNOWN);
  assert.equal(classifyUrlStatus(inspectedUrl, { verdict: 'NEUTRAL', coverageState: 'Excluded by ‘noindex’ tag', indexingState: 'BLOCKED_BY_META_TAG' }), URL_STATUS.BLOCKED_OR_ERROR);
  assert.equal(classifyUrlStatus(inspectedUrl, {
    verdict: 'NEUTRAL',
    coverageState: 'Crawled - currently not indexed',
    googleCanonical: 'https://funnytools.win/tools/other/',
  }), URL_STATUS.CANONICALIZED_ELSEWHERE);
  assert.equal(googleKnown({ coverageState: 'Google 無法辨識的網址' }), 'no');
  assert.equal(googleKnown({ coverageState: 'Google ne reconnaît pas cette URL' }), 'no');
});

test('canonical and crawl recency buckets are deterministic', () => {
  assert.equal(canonicalCategory(inspectedUrl, inspectedUrl), 'SELF_MATCH');
  assert.equal(canonicalCategory(inspectedUrl, 'https://funnytools.win/tools/other/'), 'GOOGLE_SELECTED_OTHER_INTERNAL');
  assert.equal(canonicalCategory(inspectedUrl, 'https://example.com/'), 'GOOGLE_SELECTED_EXTERNAL');
  assert.equal(canonicalCategory(inspectedUrl, ''), 'GOOGLE_CANONICAL_ABSENT');
  assert.equal(crawlRecencyBucket('2026-09-12T00:00:00Z', '2026-09-13T00:00:00Z'), '<7 days');
  assert.equal(crawlRecencyBucket('2026-08-01T00:00:00Z', '2026-09-13T00:00:00Z'), '>30 days');
  assert.equal(crawlRecencyBucket('', '2026-09-13T00:00:00Z'), 'never crawled');
});

test('evidence row contains the required URL Inspection fields', () => {
  const row = resultToEvidenceRow({
    url: inspectedUrl,
    inspectedAt: '2026-09-13T00:00:00Z',
    apiStatus: 200,
    response: {
      inspectionResult: {
        inspectionResultLink: 'https://search.google.com/search-console/inspect?id=redacted',
        indexStatusResult: {
          verdict: 'PASS',
          coverageState: 'Submitted and indexed',
          robotsTxtState: 'ALLOWED',
          indexingState: 'INDEXING_ALLOWED',
          lastCrawlTime: '2026-09-12T00:00:00Z',
          pageFetchState: 'SUCCESSFUL',
          googleCanonical: inspectedUrl,
          userCanonical: inspectedUrl,
          crawledAs: 'MOBILE',
          sitemap: ['https://funnytools.win/sitemap-tools.xml'],
          referringUrls: ['https://funnytools.win/tools/'],
        },
      },
    },
  });
  for (const field of [
    'url', 'inspected_at', 'inspection_result_link', 'verdict', 'coverage_state', 'robots_txt_state',
    'indexing_state', 'last_crawl_time', 'page_fetch_state', 'google_canonical', 'user_canonical',
    'crawled_as', 'sitemap_count', 'sitemap_urls', 'referring_url_count', 'referring_urls',
    'rich_results_available', 'api_error', 'api_status',
  ]) assert.ok(Object.hasOwn(row, field), `missing ${field}`);
  assert.equal(row.url_status, URL_STATUS.INDEXED);
  assert.equal(row.sitemap_count, 1);
  assert.equal(row.referring_url_count, 1);
});

test('Phase 2A reports contain one row per intended URL and no secret-valued material', async () => {
  const requiredReports = [
    'EXECUTIVE-SUMMARY.md', 'gsc-url-inspection.csv', 'gsc-url-inspection-raw.jsonl', 'index-evidence-master.csv',
    'current-index-funnel.md', 'page-type-indexing.csv', 'locale-indexing.csv', 'cluster-indexing.csv',
    'tool-index-status.csv', 'canonical-divergence.csv', 'crawl-recency.csv', 'indexed-vs-not-indexed.md',
    'root-cause-evidence.md', 'tier1-index-status.csv', 'phase2b-treatment-candidates.csv',
    'phase2b-control-candidates.csv', 'validation-report.md',
  ];
  for (const report of requiredReports) assert.ok(existsSync(path.join(reportDir, report)), `missing ${report}`);

  const inspectionCsv = await readFile(path.join(reportDir, 'gsc-url-inspection.csv'), 'utf8');
  const inspectionRows = inspectionCsv.trim().split(/\r?\n/);
  assert.equal(inspectionRows.length, 713, 'expected header plus 712 inspection rows');
  assert.equal(new Set(inspectionRows.slice(1).map((line) => line.split(',')[0])).size, 712);

  const rawLines = (await readFile(path.join(reportDir, 'gsc-url-inspection-raw.jsonl'), 'utf8')).trim().split(/\r?\n/);
  assert.equal(rawLines.length, 712);
  assert.equal(new Set(rawLines.map((line) => JSON.parse(line).url)).size, 712);

  for (const report of [...requiredReports, path.join('raw', 'gsc-url-inspection-raw.jsonl')]) {
    const contents = await readFile(path.join(reportDir, report), 'utf8');
    assert.equal(secretScanText(contents), false, `secret-like material found in ${report}`);
  }
});
