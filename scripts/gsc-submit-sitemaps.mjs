import { join } from 'node:path';
import {
  expectedSitemapFiles,
  fetchJson,
  googleAccessToken,
  missingGscCredentialVars,
  reportsDir,
  resolveGscSiteUrl,
  sitemapIndexUrl,
  siteUrl,
  writeJson,
  writeText,
} from './seo-indexing-utils.mjs';
import { resolveSitemapOutcome } from './gsc-sitemap-outcome.mjs';

const DAY_MS = 24 * 60 * 60 * 1000;
const STUCK_DAYS = 14;
const forceSubmit = process.argv.includes('--force');
const sitemapUrls = [
  sitemapIndexUrl,
  ...expectedSitemapFiles.map((file) => new URL(file, siteUrl).href),
];

const report = {
  generatedAt: new Date().toISOString(),
  siteUrl,
  gscSiteUrl: null,
  status: 'skipped',
  message: '',
  entries: [],
  alerts: [],
};

function apiSnapshot(requestedPath, current = {}) {
  return {
    path: current.path ?? requestedPath,
    lastSubmitted: current.lastSubmitted ?? null,
    isPending: current.isPending ?? null,
    lastDownloaded: current.lastDownloaded ?? null,
    isSitemapsIndex: current.isSitemapsIndex ?? null,
    warnings: current.warnings ?? null,
    errors: current.errors ?? null,
  };
}

function parsedDate(value) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function isStuck(entry, now = new Date()) {
  const lastSubmitted = parsedDate(entry.lastSubmitted);
  return entry.isPending === true
    && !entry.lastDownloaded
    && lastSubmitted
    && now - lastSubmitted > STUCK_DAYS * DAY_MS;
}

function endpointFor(gscSiteUrl, sitemapPath) {
  return `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(gscSiteUrl)}/sitemaps/${encodeURIComponent(sitemapPath)}`;
}

function markdownCell(value) {
  if (value === null || value === undefined || value === '') return '(none)';
  return String(value).replaceAll('|', '\\|').replace(/\r?\n/g, ' ');
}

try {
  const token = await googleAccessToken();
  const gscSiteUrl = await resolveGscSiteUrl(token);
  report.gscSiteUrl = gscSiteUrl;
  const authHeaders = { Authorization: `Bearer ${token}` };
  const now = new Date();
  let submittedCount = 0;
  let registeredCount = 0;
  let failureCount = 0;

  for (const sitemapPath of sitemapUrls) {
    const endpoint = endpointFor(gscSiteUrl, sitemapPath);
    const { response: getResponse, json: current } = await fetchJson(endpoint, { headers: authHeaders });

    if (!getResponse.ok && getResponse.status !== 404) {
      failureCount += 1;
      report.entries.push({
        ...apiSnapshot(sitemapPath),
        action: 'get_failed',
        message: `GET failed: ${getResponse.status}`,
      });
      process.exitCode = 1;
      continue;
    }

    const before = getResponse.ok ? apiSnapshot(sitemapPath, current) : apiSnapshot(sitemapPath);
    if (isStuck(before, now)) {
      report.alerts.push(`GSC sitemap is stuck pending with no download for more than ${STUCK_DAYS} days: ${before.path}`);
    }

    // A registered sitemap does not need another PUT on every deployment. Repeated PUTs
    // do not make Google download a pending sitemap and they erase the useful distinction
    // between "registered" and "newly submitted". --force remains an explicit operator action.
    if (getResponse.ok && !forceSubmit) {
      registeredCount += 1;
      report.entries.push({
        ...before,
        action: 'already_registered',
        message: 'Already registered in Search Console; read back without resubmitting.',
      });
      continue;
    }

    const putResponse = await fetch(endpoint, { method: 'PUT', headers: authHeaders });
    const putBody = await putResponse.text();
    if (!putResponse.ok) {
      failureCount += 1;
      report.entries.push({
        ...before,
        action: 'submit_failed',
        message: `PUT failed: ${putResponse.status} ${putBody.slice(0, 500)}`.trim(),
      });
      process.exitCode = 1;
      continue;
    }

    // Re-read immediately so the report records Google's state for this exact
    // path after submission instead of treating a successful PUT as sufficient.
    const { response: verifyResponse, json: verified } = await fetchJson(endpoint, { headers: authHeaders });
    if (!verifyResponse.ok) {
      failureCount += 1;
      report.entries.push({
        ...before,
        action: 'verification_failed',
        message: `PUT succeeded but follow-up GET failed: ${verifyResponse.status}`,
      });
      process.exitCode = 1;
      continue;
    }

    submittedCount += 1;
    const after = apiSnapshot(sitemapPath, verified);
    if (isStuck(after, now)) {
      report.alerts.push(`GSC sitemap is stuck pending with no download for more than ${STUCK_DAYS} days: ${after.path}`);
    }
    report.entries.push({
      ...after,
      action: 'submitted',
      message: forceSubmit
        ? 'Submitted because --force was explicitly requested.'
        : 'Submitted because the sitemap was not registered.',
    });
  }

  report.alerts = [...new Set(report.alerts)];
  const outcome = resolveSitemapOutcome({
    failureCount,
    submittedCount,
    registeredCount,
    alertCount: report.alerts.length,
  });
  report.status = outcome.status;
  report.message = outcome.message;
  // 卡住的 sitemap 必須讓這一步失敗，否則警告會被印出來但沒有人看到。
  if (outcome.exitCode !== 0) process.exitCode = outcome.exitCode;
} catch (error) {
  const isMissingCredentials = /Missing GSC/.test(error.message);
  report.status = 'failed';
  report.message = isMissingCredentials
    ? `${error.message} Missing: ${missingGscCredentialVars().join(', ')}. Set these as GitHub Actions repo secrets (see Company Vault/10_Web_Department/2026-07-25-gsc-secrets-handoff.md) -- this is a real outage, not an optional step.`
    : error.message;
  process.exitCode = 1;
}

writeJson(join(reportsDir, 'gsc-sitemap-submit-report.json'), report);
writeText(join(reportsDir, 'gsc-sitemap-submit-report.md'), [
  '# GSC Sitemap Submit Report',
  '',
  `Generated: ${report.generatedAt}`,
  `Search Console property: ${report.gscSiteUrl ?? '(not resolved)'}`,
  `Status: ${report.status}`,
  '',
  report.message,
  '',
  '| Path | Action | Last submitted | Last downloaded | Pending | Index | Warnings | Errors |',
  '| --- | --- | --- | --- | --- | --- | ---: | ---: |',
  ...report.entries.map((entry) =>
    `| ${markdownCell(entry.path)} | ${markdownCell(entry.action)} | ${markdownCell(entry.lastSubmitted)} | ${markdownCell(entry.lastDownloaded)} | ${markdownCell(entry.isPending)} | ${markdownCell(entry.isSitemapsIndex)} | ${markdownCell(entry.warnings)} | ${markdownCell(entry.errors)} |`,
  ),
  '',
  ...(report.alerts.length ? ['## Alerts', '', ...report.alerts.map((alert) => `- ${alert}`), ''] : []),
].join('\n'));
console.log(JSON.stringify(report, null, 2));
