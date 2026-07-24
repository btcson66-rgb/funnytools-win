import { join } from 'node:path';
import {
  fetchJson,
  googleAccessToken,
  missingGscCredentialVars,
  reportsDir,
  sitemapIndexUrl,
  siteUrl,
  writeJson,
  writeText,
} from './seo-indexing-utils.mjs';

// 2026-07-25 SEO 稽核（CEO 派工）：GSC Sitemaps API 顯示三站 sitemap 長期
// lastDownloaded=NEVER / isPending=true。原本以為原因是「每次 push main 都重送、
// 重置 Google 的下載時間線」，加了 7 天冷卻（下方 COOLDOWN_DAYS）。CEO 審查後
// 用 `gh secret list` 查明真正原因：funnytools repo 根本沒有設定
// GSC_SERVICE_ACCOUNT_JSON / GSC_CLIENT_EMAIL / GSC_PRIVATE_KEY 這三個 secret，
// 這支腳本從 CI 建立以來就從未真的執行過 PUT——之前遇到缺憑證會落到下面 catch，
// 舊版把這個情況標成 status:'skipped' 且不設 process.exitCode，等於「腳本壞掉但
// workflow 照樣 success」，違反 CLAUDE.md 紅線第 6 條（壞掉要通知，不得靜默跳過）。
// 現在缺憑證會是 status:'failed' + exitCode 1，log 會列出缺哪幾個環境變數。
// 7 天冷卻本身無害（避免真的有憑證後又被同一問題誤導重送），照舊保留，但它
// 不是這題的根本解方；根本解方是老闆補上 GSC secrets（交接見
// Company Vault/10_Web_Department/2026-07-25-gsc-secrets-handoff.md）。
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
  const isMissingCredentials = /Missing GSC/.test(error.message);
  report.status = 'failed';
  report.message = isMissingCredentials
    ? `${error.message} Missing: ${missingGscCredentialVars().join(', ')}. Set these as GitHub Actions repo secrets (see Company Vault/10_Web_Department/2026-07-25-gsc-secrets-handoff.md) — this is a real outage, not an optional step.`
    : error.message;
  process.exitCode = 1;
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
