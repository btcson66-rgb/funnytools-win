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
// Search Console 的 sitemap 資源沒有獨立的「擷取失敗」旗標。GSC 網頁介面顯示
// 「無法擷取 / Couldn't fetch」、類型「未知」的那一筆，API 讀回來是：
//   isPending: true, lastDownloaded: null, errors: "0", warnings: "0"
// 所以 `lastDownloaded == null` 同時涵蓋「還沒輪到」與「Google 抓了但失敗」，
// 只能靠距離上次提交多久來區分。兩天寬限是為了不誤報剛送出去的那一筆。
const NEVER_FETCHED_AFTER_DAYS = 2;
// 一筆已註冊但從未被成功下載的 sitemap，每隔這麼多天重送一次 PUT。
//
// 在此之前這支腳本只要 GSC 回報已註冊就直接跳過 PUT，於是 funnytools 的 7 筆
// sitemap 自 2026-09-03（sitemap.xml 為 09-17）之後再也沒有送出過任何一次提交，
// 狀態就這樣凍在無法擷取。重新提交是 Google 對 Couldn't fetch 的官方處理方式，
// 而這支腳本把它變成只有人工 --force 才做得到。
//
// 為什麼要有間隔：每次 push 都 PUT 一樣是錯的，那會讓 lastSubmitted 永遠是
// 「剛剛」，抹掉「已註冊」與「剛提交」的區別，也讓 never-fetched 判定永遠不成立。
const RESUBMIT_AFTER_DAYS = 7;
const forceSubmit = process.argv.includes('--force');
const sitemapArgIndex = process.argv.findIndex((arg) => arg === '--sitemap-url');
const requestedSitemap = process.argv.find((arg) => arg.startsWith('--sitemap-url='))?.slice('--sitemap-url='.length)
  ?? (sitemapArgIndex >= 0 ? process.argv[sitemapArgIndex + 1] : null);
if (requestedSitemap && requestedSitemap !== sitemapIndexUrl) {
  throw new Error(`Controlled sitemap selection only permits the root sitemap: ${sitemapIndexUrl}`);
}
const sitemapUrls = requestedSitemap ? [sitemapIndexUrl] : [
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

function submittedBefore(entry, days, now) {
  const lastSubmitted = parsedDate(entry.lastSubmitted);
  return Boolean(lastSubmitted) && now - lastSubmitted > days * DAY_MS;
}

/** 已在 Search Console 註冊，但 Google 從未回報下載過。 */
function isStuck(entry, now = new Date()) {
  return entry.isPending === true
    && !entry.lastDownloaded
    && submittedBefore(entry, NEVER_FETCHED_AFTER_DAYS, now);
}

/**
 * 該不該重送一次 PUT，讓 Google 重試。
 * 已經成功下載過的項目永遠不重送；沒有可解析的送出時間也不重送，避免無限 PUT。
 */
function needsResubmission(entry, now = new Date()) {
  return !entry.lastDownloaded && submittedBefore(entry, RESUBMIT_AFTER_DAYS, now);
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
      report.alerts.push(`NEVER FETCHED: Search Console has never reported a download for ${before.path} (submitted ${before.lastSubmitted}); its web UI shows this as 無法擷取 / Couldn't fetch.`);
    }

    // A registered sitemap does not need another PUT on every deployment. Repeated PUTs
    // do not make Google download a pending sitemap and they erase the useful distinction
    // between "registered" and "newly submitted". --force remains an explicit operator action.
    const resubmitting = getResponse.ok && needsResubmission(before, now);
    if (getResponse.ok && !forceSubmit && !resubmitting) {
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
      report.alerts.push(`NEVER FETCHED: Search Console has never reported a download for ${after.path} (submitted ${after.lastSubmitted}); its web UI shows this as 無法擷取 / Couldn't fetch.`);
    }
    report.entries.push({
      ...after,
      action: 'submitted',
      message: forceSubmit
        ? 'Submitted because --force was explicitly requested.'
        : resubmitting
          ? `Re-submitted because Search Console has never reported a download (previous submission ${before.lastSubmitted}).`
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
  // 從未被擷取的 sitemap 不再讓這一步失敗（理由見 gsc-sitemap-outcome.mjs 檔頭），
  // 但也不能就這樣消失在一大片 JSON 裡：印到 stderr，GitHub Actions 會獨立標出來。
  for (const alert of report.alerts) console.error(alert);
  if (outcome.stuck) {
    console.error(
      'NOTE: never-fetched sitemaps do not fail this step. They are re-submitted on a '
      + `${RESUBMIT_AFTER_DAYS}-day cadence, and the standing alert belongs to the daily four-site health monitor.`,
    );
  }
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
