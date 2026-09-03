import { join } from 'node:path';
import {
  filterSubmitCandidates,
  googleAccessToken,
  gscPriorityUrlsPath,
  missingGscCredentialVars,
  priorityUrlsPath,
  readPriorityUrls,
  reportsDir,
  resolveGscSiteUrl,
  siteUrl,
  writeJson,
  writeText,
} from './seo-indexing-utils.mjs';

// 2026-07-25 CEO 審查（gsc-secrets 稽核修正）：舊版遇到「Missing GSC」錯誤時故意
// 不設 process.exitCode，讓憑證缺失的 weekly-inspection run 看起來是綠的。這是
// 紅線第 6 條要禁止的靜默跳過——已改成缺憑證一律 exitCode=1。

const priorityUrls = readPriorityUrls(gscPriorityUrlsPath, priorityUrlsPath);
const { submitted: urls, skipped } = filterSubmitCandidates(priorityUrls);
const report = {
  generatedAt: new Date().toISOString(),
  siteUrl,
  // Resolved Search Console property identifier actually used in the API
  // calls below (e.g. `sc-domain:funnytools.win`). Not the same as `siteUrl`
  // above, which is just the configured site origin for human reference.
  gscSiteUrl: null,
  inspected: [],
  skipped,
  errors: [],
  manualActions: [],
};

function permissionGuidance(status, property, url) {
  if (status === 401) {
    return `Manual action: verify the Google OAuth refresh token or service-account credential in the GitHub Actions secrets, then rerun inspection for ${url}.`;
  }
  if (status === 403) {
    return `Manual action: verify that the credential has Owner or Full user access to the Search Console property ${property || '(unresolved)'} and that ${url} belongs to that property.`;
  }
  return '';
}

try {
  const token = await googleAccessToken();
  const gscSiteUrl = await resolveGscSiteUrl(token);
  report.gscSiteUrl = gscSiteUrl;
  for (const url of urls) {
    try {
      const response = await fetch('https://searchconsole.googleapis.com/v1/urlInspection/index:inspect', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({
          inspectionUrl: url,
          siteUrl: gscSiteUrl,
          languageCode: 'zh-TW',
        }),
      });
      const data = await response.json().catch(() => ({}));
      const result = data.inspectionResult?.indexStatusResult ?? {};
      if (!response.ok) {
        const message = data.error?.message ?? 'URL Inspection request failed';
        const guidance = permissionGuidance(response.status, report.gscSiteUrl, url);
        if (guidance) report.manualActions.push(guidance);
        report.errors.push({ url, status: response.status, property: report.gscSiteUrl, message: `${message} (property=${report.gscSiteUrl ?? '(unresolved)'})${guidance ? ` ${guidance}` : ''}` });
        continue;
      }
      report.inspected.push({
        url,
        googleKnown: Boolean(result.verdict || result.coverageState || result.indexingState),
        indexed: result.verdict === 'PASS',
        verdict: result.verdict ?? '',
        coverageState: result.coverageState ?? '',
        pageFetchState: result.pageFetchState ?? '',
        crawledAs: result.crawledAs ?? '',
        crawlState: result.lastCrawlTime ? `Last crawled ${result.lastCrawlTime}` : (result.coverageState ?? ''),
        indexingState: result.indexingState ?? '',
        canonicalState: {
          googleCanonical: result.googleCanonical ?? '',
          userCanonical: result.userCanonical ?? '',
        },
        robotsState: result.robotsTxtState ?? '',
        sitemapDiscovery: result.sitemap ? result.sitemap.join(', ') : '',
      });
    } catch (error) {
      report.errors.push({ url, message: error.message });
    }
  }
} catch (error) {
  const isMissingCredentials = /Missing GSC/.test(error.message);
  const message = isMissingCredentials
    ? `${error.message} Missing: ${missingGscCredentialVars().join(', ')}. Set these as GitHub Actions repo secrets (see Company Vault/10_Web_Department/2026-07-25-gsc-secrets-handoff.md).`
    : error.message;
  report.errors.push({ url: '*', message });
  if (isMissingCredentials) report.manualActions.push('Manual action: set the named GSC GitHub Actions secrets and ensure the Google identity has Owner or Full access to sc-domain:funnytools.win.');
}

report.manualActions = [...new Set(report.manualActions)];

const md = [
  '# Weekly Indexing Report',
  '',
  `Generated: ${report.generatedAt}`,
  `Site URL: ${siteUrl}`,
  `Search Console property: ${report.gscSiteUrl ?? '(not resolved)'}`,
  '',
  `- Priority URLs configured: ${priorityUrls.length}`,
  `- Inspected: ${report.inspected.length}`,
  `- Skipped before inspection: ${report.skipped.length}`,
  `- Errors: ${report.errors.length}`,
  '',
  '## URL Inspection Results',
  '',
  report.inspected.length
    ? report.inspected.map((item) => [
      `### ${item.url}`,
      `- Google knows URL: ${item.googleKnown ? 'yes' : 'no'}`,
      `- Indexed: ${item.indexed ? 'yes' : 'no'}`,
      `- Coverage: ${item.coverageState || 'unknown'}`,
      `- Fetch: ${item.pageFetchState || 'unknown'}; Crawler: ${item.crawledAs || 'unknown'}`,
      `- Crawl status: ${item.crawlState || 'unknown'}`,
      `- Indexing status: ${item.indexingState || item.verdict || 'unknown'}`,
      `- Canonical: Google=${item.canonicalState.googleCanonical || 'unknown'}; User=${item.canonicalState.userCanonical || 'unknown'}`,
      `- Robots: ${item.robotsState || 'unknown'}`,
      `- Sitemap discovery: ${item.sitemapDiscovery || 'unknown'}`,
    ].join('\n')).join('\n\n')
    : '- None',
  '',
  '## Errors',
  '',
  report.errors.length ? report.errors.map((item) => `- ${item.url} - ${item.status ?? ''} ${item.message}`).join('\n') : '- None',
  '',
  '## Manual actions',
  '',
  report.manualActions.length ? report.manualActions.map((item) => `- ${item}`).join('\n') : '- None',
  '',
  '## Skipped URLs',
  '',
  report.skipped.length ? report.skipped.map((item) => `- ${item.url} - ${item.reason}`).join('\n') : '- None',
  '',
].join('\n');

writeJson(join(reportsDir, 'gsc-url-inspection-report.json'), report);
writeText(join(reportsDir, 'weekly-indexing-report.md'), md);
console.log(JSON.stringify({
  inspected: report.inspected.length,
  skipped: report.skipped.length,
  errors: report.errors.length,
}, null, 2));

if (report.errors.length) {
  process.exitCode = 1;
}
