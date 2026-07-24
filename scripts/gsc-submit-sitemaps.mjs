import { join } from 'node:path';
import {
  fetchJson,
  googleAccessToken,
  reportsDir,
  sitemapIndexUrl,
  siteUrl,
  writeJson,
  writeText,
} from './seo-indexing-utils.mjs';

// 2026-07-25 SEO 稽核（CEO 派工）：GSC Sitemaps API 顯示三站 sitemap 長期
// lastDownloaded=NEVER / isPending=true；每次 push main 都重送等於每天重置
// Google 的下載時間線，違反 `04_Knowledge/GSC Sitemap 無法擷取診斷.md` 第 7 點
// 「pending 時不要反覆重送」。改為：先 GET 目前狀態，距上次 lastSubmitted
// 未滿 COOLDOWN_DAYS 天就略過（並在 log 寫明原因與下次可送時間），
// 未曾提交過或已超過冷卻期才真的 PUT 重送。IndexNow / Bing 提交不受影響。
const COOLDOWN_DAYS = 7;
const COOLDOWN_MS = COOLDOWN_DAYS * 24 * 60 * 60 * 1000;

const report = {
  generatedAt: new Date().toISOString(),
  sitemap: sitemapIndexUrl,
  siteUrl,
  status: 'skipped',
  message: '',
};

try {
  const token = await googleAccessToken();
  const endpoint = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/sitemaps/${encodeURIComponent(sitemapIndexUrl)}`;
  const authHeaders = { Authorization: `Bearer ${token}` };

  const { response: getResponse, json: current } = await fetchJson(endpoint, { headers: authHeaders });
  let lastSubmittedAt = null;
  if (getResponse.ok && current?.lastSubmitted) {
    const parsed = new Date(current.lastSubmitted);
    if (!Number.isNaN(parsed.getTime())) lastSubmittedAt = parsed;
  }

  const now = new Date();
  const msSinceLastSubmit = lastSubmittedAt ? now - lastSubmittedAt : null;

  if (lastSubmittedAt && msSinceLastSubmit < COOLDOWN_MS) {
    const nextEligible = new Date(lastSubmittedAt.getTime() + COOLDOWN_MS);
    const daysSince = (msSinceLastSubmit / (24 * 60 * 60 * 1000)).toFixed(1);
    report.status = 'skipped_cooldown';
    report.lastSubmitted = current.lastSubmitted;
    report.isPending = current.isPending ?? null;
    report.lastDownloaded = current.lastDownloaded ?? null;
    report.message = `距上次提交（${current.lastSubmitted}）僅 ${daysSince} 天，未滿 ${COOLDOWN_DAYS} 天冷卻期，略過本次重送。下次可提交時間：${nextEligible.toISOString()}。（見 04_Knowledge/GSC Sitemap 無法擷取診斷.md 第 7 點：pending 時不要反覆重送）`;
  } else {
    const response = await fetch(endpoint, {
      method: 'PUT',
      headers: authHeaders,
    });
    const body = await response.text();
    report.status = response.ok ? 'submitted' : 'failed';
    report.message = response.ok
      ? `Sitemap index submitted to Google Search Console.${lastSubmittedAt ? ` (previous submit ${current.lastSubmitted}, ${(msSinceLastSubmit / (24 * 60 * 60 * 1000)).toFixed(1)} days ago, past ${COOLDOWN_DAYS}-day cooldown)` : ' (no prior submission on record)'}`
      : `${response.status} ${body.slice(0, 500)}`;
    if (!response.ok) process.exitCode = 1;
  }
} catch (error) {
  report.status = /Missing GSC/.test(error.message) ? 'skipped' : 'failed';
  report.message = error.message;
  if (report.status === 'failed') process.exitCode = 1;
}

writeJson(join(reportsDir, 'gsc-sitemap-submit-report.json'), report);
writeText(join(reportsDir, 'gsc-sitemap-submit-report.md'), [
  '# GSC Sitemap Submit Report',
  '',
  `Generated: ${report.generatedAt}`,
  `Sitemap: ${report.sitemap}`,
  `Status: ${report.status}`,
  '',
  report.message,
  '',
].join('\n'));
console.log(JSON.stringify(report, null, 2));
