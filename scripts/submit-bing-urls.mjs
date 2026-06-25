import { join } from 'node:path';
import {
  changedUrlsPath,
  currentState,
  filterSubmitCandidates,
  previousState,
  priorityUrlsPath,
  readCurrentSitemapEntries,
  readJson,
  readPriorityUrls,
  reportsDir,
  siteUrl,
  statePath,
  writeJson,
  writeText,
} from './seo-indexing-utils.mjs';

const apiKey = process.env.BING_API_KEY?.trim();
const sitemapEntries = readCurrentSitemapEntries();
const previous = previousState();
const changed = readJson(changedUrlsPath, null);
const addedFromState = sitemapEntries.filter((entry) => !previous.urls?.[entry.loc]).map((entry) => entry.loc);
const desired = [
  ...(changed?.changed ?? []),
  ...readPriorityUrls(priorityUrlsPath),
  ...addedFromState,
];
const { submitted: candidateUrls, skipped } = filterSubmitCandidates(desired);

const report = {
  generatedAt: new Date().toISOString(),
  provider: 'Bing URL Submission API',
  siteUrl,
  attempted: 0,
  success: [],
  failed: [],
  skipped,
  quota: null,
};

if (!apiKey) {
  report.skipped.push({ url: '*', reason: 'missing-BING_API_KEY' });
  writeJson(join(reportsDir, 'bing-submission-report.json'), report);
  writeText(join(reportsDir, 'bing-submission-report.md'), '# Bing Submission Report\n\nSkipped: missing `BING_API_KEY`.\n');
  console.log(JSON.stringify(report, null, 2));
  process.exit(0);
}

async function getQuota() {
  try {
    const url = new URL('https://ssl.bing.com/webmaster/api.svc/json/GetUrlSubmissionQuota');
    url.searchParams.set('apikey', apiKey);
    url.searchParams.set('siteUrl', siteUrl);
    const response = await fetch(url);
    const json = await response.json();
    return json?.d ?? json;
  } catch {
    return null;
  }
}

report.quota = await getQuota();
const quotaValue = Number(
  report.quota?.DailyQuota ??
  report.quota?.dailyQuota ??
  report.quota?.RemainingDailyQuota ??
  report.quota?.remainingDailyQuota ??
  process.env.BING_URL_LIMIT ??
  100,
);
const quotaUnavailable = report.quota?.ErrorCode || report.quota?.Message;
const limit = quotaUnavailable
  ? 0
  : Number.isFinite(quotaValue)
    ? Math.max(0, Math.min(quotaValue, 500))
    : 100;
const urls = candidateUrls.slice(0, limit);
for (const url of candidateUrls.slice(limit)) {
  report.skipped.push({ url, reason: 'over-bing-quota-limit' });
}

if (!urls.length) {
  report.skipped.push({
    url: '*',
    reason: limit === 0 ? 'bing-daily-quota-unavailable-or-exhausted' : 'no-new-modified-priority-or-added-urls',
  });
} else {
  try {
    const endpoint = new URL('https://ssl.bing.com/webmaster/api.svc/json/SubmitUrlbatch');
    endpoint.searchParams.set('apikey', apiKey);
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ siteUrl, urlList: urls }),
    });
    const text = await response.text();
    report.attempted = urls.length;
    if (response.ok) {
      report.success = urls;
      writeJson(statePath, currentState(sitemapEntries));
    } else {
      const quotaExceeded = text.includes('exceeded your daily url submission quota');
      if (quotaExceeded) {
        report.skipped.push(...urls.map((url) => ({
          url,
          reason: 'bing-daily-quota-exceeded',
          status: response.status,
        })));
      } else {
        report.failed = urls.map((url) => ({ url, status: response.status, body: text.slice(0, 500) }));
        process.exitCode = 1;
      }
    }
  } catch (error) {
    report.attempted = urls.length;
    report.failed = urls.map((url) => ({ url, error: error.message }));
    process.exitCode = 1;
  }
}

const md = [
  '# Bing Submission Report',
  '',
  `Generated: ${report.generatedAt}`,
  `Site URL: ${report.siteUrl}`,
  '',
  `- Attempted: ${report.attempted}`,
  `- Success: ${report.success.length}`,
  `- Failed: ${report.failed.length}`,
  `- Skipped: ${report.skipped.length}`,
  `- Applied limit: ${limit}`,
  '',
  '## Submitted URLs',
  '',
  report.success.length ? report.success.map((url) => `- ${url}`).join('\n') : '- None',
  '',
  '## Failed URLs',
  '',
  report.failed.length ? report.failed.map((item) => `- ${item.url} - ${item.status ?? item.error}`).join('\n') : '- None',
  '',
  '## Skipped URLs',
  '',
  report.skipped.length ? report.skipped.map((item) => `- ${item.url} - ${item.reason}`).join('\n') : '- None',
  '',
].join('\n');

writeJson(join(reportsDir, 'bing-submission-report.json'), report);
writeText(join(reportsDir, 'bing-submission-report.md'), md);
console.log(JSON.stringify({
  attempted: report.attempted,
  success: report.success.length,
  failed: report.failed.length,
  skipped: report.skipped.length,
  limit,
}, null, 2));
