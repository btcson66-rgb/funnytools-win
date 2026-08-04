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

const DAY_MS = 24 * 60 * 60 * 1000;
const COOLDOWN_DAYS = 7;
const COOLDOWN_MS = COOLDOWN_DAYS * DAY_MS;
const STUCK_DAYS = 14;
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
  let cooldownCount = 0;
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

    const lastSubmittedAt = parsedDate(before.lastSubmitted);
    const msSinceLastSubmit = lastSubmittedAt ? now - lastSubmittedAt : null;
    if (lastSubmittedAt && msSinceLastSubmit >= 0 && msSinceLastSubmit < COOLDOWN_MS) {
      cooldownCount += 1;
      report.entries.push({
        ...before,
        action: 'skipped_cooldown',
        message: `Last submitted ${(msSinceLastSubmit / DAY_MS).toFixed(1)} days ago; next eligible ${new Date(lastSubmittedAt.getTime() + COOLDOWN_MS).toISOString()}.`,
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
      message: lastSubmittedAt
        ? `Submitted after ${(msSinceLastSubmit / DAY_MS).toFixed(1)} days.`
        : 'Submitted with no prior submission on record.',
    });
  }

  report.alerts = [...new Set(report.alerts)];
  if (report.alerts.length) {
    report.status = 'stuck_pending';
    report.message = report.alerts.join(' ');
    process.exitCode = 1;
  } else if (failureCount) {
    report.status = 'failed';
    report.message = `${failureCount} sitemap path(s) failed; see the per-path entries.`;
  } else if (submittedCount) {
    report.status = 'submitted';
    report.message = `Submitted ${submittedCount} sitemap path(s); ${cooldownCount} path(s) remained inside the ${COOLDOWN_DAYS}-day cooldown.`;
  } else {
    report.status = 'skipped_cooldown';
    report.message = `All ${cooldownCount} sitemap path(s) remain inside the ${COOLDOWN_DAYS}-day cooldown.`;
  }
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
