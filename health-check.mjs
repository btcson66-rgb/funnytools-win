// Fable Company multi-site daily health and drift check.
// Writes backward-compatible short/long reports for fable-daily-review.
import {
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from 'node:fs';
import { dirname, join } from 'node:path';
import { execFileSync, execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import {
  classifySourceIdentity,
  diffSourceIdentity,
  evaluateContractProbe,
  evaluateJsonHealth,
  summarizeKnownBaselines,
} from './scripts/health-contracts.mjs';
import {
  deploymentFreshnessIssue,
  diffDeploymentIdentity,
  evaluateDeploymentFreshness,
  normalizeCloudflarePagesProject,
  normalizeGithubPagesDeployment,
  normalizeWorkflowDeployment,
} from './scripts/deployment-identity.mjs';

const rootDir = dirname(fileURLToPath(import.meta.url));
const configPath = join(rootDir, 'config', 'company.json');
const config = JSON.parse(readFileSync(configPath, 'utf8'));
const knownBaselinesPath = join(rootDir, 'config', 'health-known-baselines.json');
const knownBaselinesConfig = JSON.parse(readFileSync(knownBaselinesPath, 'utf8'));
const knownBaselines = summarizeKnownBaselines(knownBaselinesConfig.items ?? []);
const hc = config.healthCheck ?? {};
const sites = normalizeSites(config);
const issues = [];

function normalizeSites(rawConfig) {
  if (Array.isArray(rawConfig.sites) && rawConfig.sites.length > 0) {
    return rawConfig.sites.map((site) => ({
      ...site,
      baseUrl: String(site.baseUrl ?? site.domain ?? '').replace(/\/+$/, ''),
      githubRepo: site.githubRepo ? String(site.githubRepo) : null,
      primaryPath: site.primaryPath ?? '/',
      sitemapPath: site.sitemapPath ?? '/sitemap.xml',
      samplePageCount: Number(site.samplePageCount ?? site.sitemapSampleCount ?? rawConfig.healthCheck?.sitemapSampleCount ?? 6),
      sampleUrls: site.sampleUrls ?? ['/'],
      services: Array.isArray(site.services) ? site.services : [],
      contractProbes: Array.isArray(site.contractProbes) ? site.contractProbes : [],
      monitorHttpsRedirect: Boolean(site.monitorHttpsRedirect),
      sitemapDropAlertPercent: Number(site.sitemapDropAlertPercent ?? 10),
      expectations: {
        expectAdsense: Boolean(site.expectations?.expectAdsense ?? site.expectAdsense),
        expectAdsTxt: Boolean(site.expectations?.expectAdsTxt ?? site.expectAdsTxt),
        expectAnalytics: Boolean(site.expectations?.expectAnalytics ?? site.expectAnalytics),
      },
    }));
  }

  if (rawConfig.site) {
    return [{
      id: rawConfig.site.id ?? 'funnytools',
      name: rawConfig.site.name ?? 'FunnyTools',
      baseUrl: String(rawConfig.site.domain ?? '').replace(/\/+$/, ''),
      githubRepo: rawConfig.site.githubRepo ? String(rawConfig.site.githubRepo) : null,
      localRepo: rawConfig.site.localRepo,
      primaryPath: '/',
      sitemapPath: '/sitemap.xml',
      samplePageCount: Number(rawConfig.healthCheck?.sitemapSampleCount ?? 6),
      sampleUrls: rawConfig.healthCheck?.sampleUrls ?? ['/'],
      services: Array.isArray(rawConfig.site.services) ? rawConfig.site.services : [],
      contractProbes: Array.isArray(rawConfig.site.contractProbes) ? rawConfig.site.contractProbes : [],
      expectations: {
        expectAdsense: Boolean(rawConfig.healthCheck?.expectAdsense),
        expectAdsTxt: true,
        expectAnalytics: Boolean(rawConfig.healthCheck?.expectAnalytics),
      },
    }];
  }

  throw new Error('config/company.json must define a non-empty sites array.');
}

function ensureDir(path) {
  mkdirSync(path, { recursive: true });
  return path;
}

function todayStr(tz = config.timezone ?? 'Asia/Taipei') {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: tz,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date());
}

function addIssue(site, severity, code, message, details = {}) {
  issues.push({
    severity,
    code: `${site.id}-${code}`,
    site: site.id,
    message,
    ...details,
  });
}

function severityIcon(severity) {
  if (severity === 'critical') return '🔴';
  if (severity === 'warning') return '🟡';
  return 'ℹ️';
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function backoffMs(attempt) {
  const base = Number(hc.retryBackoffMs ?? 1000);
  return base * 2 ** Math.max(0, attempt - 1);
}

function endpointUrl(site, pathOrUrl) {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  return new URL(pathOrUrl, `${site.baseUrl}/`).href;
}

function requestHeaders() {
  return {
    'user-agent': hc.userAgent ?? 'FableCompany-HealthCheck/3.0',
    accept: 'text/html,application/xhtml+xml,application/xml,text/xml,text/plain;q=0.9,*/*;q=0.8',
  };
}

function githubHeaders() {
  const headers = {
    accept: 'application/vnd.github+json',
    'user-agent': 'FableCompany-HealthCheck/3.0',
  };
  if (process.env.GITHUB_TOKEN) headers.authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  return headers;
}

function networkErrorKind(error) {
  if (error?.name === 'TimeoutError' || /timeout|aborted/i.test(error?.message ?? '')) return 'timeout';
  if (/ENOTFOUND|EAI_AGAIN|DNS|fetch failed|getaddrinfo/i.test(error?.message ?? '')) return 'dns_or_connectivity';
  if (/ECONNRESET|ECONNREFUSED|ETIMEDOUT|socket|network/i.test(error?.message ?? '')) return 'connection';
  return 'network';
}

async function fetchText(url, label, headers = requestHeaders()) {
  const attempts = [];
  const maxAttempts = Math.max(1, Number(hc.retryAttempts ?? 3));
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    const started = Date.now();
    try {
      const response = await fetch(url, {
        redirect: 'follow',
        signal: AbortSignal.timeout(Number(hc.timeoutMs ?? 15000)),
        headers,
      });
      const body = await response.text();
      const result = {
        ok: response.ok,
        layer: 'http',
        label,
        url,
        finalUrl: response.url,
        status: response.status,
        statusText: response.statusText,
        ms: Date.now() - started,
        body,
        attempts: [
          ...attempts,
          { attempt, layer: 'http', status: response.status, ms: Date.now() - started },
        ],
      };
      if (response.ok || ![408, 429, 500, 502, 503, 504].includes(response.status) || attempt === maxAttempts) {
        return result;
      }
      attempts.push({ attempt, layer: 'http', status: response.status, ms: result.ms });
    } catch (error) {
      attempts.push({
        attempt,
        layer: 'network',
        errorKind: networkErrorKind(error),
        error: error?.message ?? String(error),
        ms: Date.now() - started,
      });
      if (attempt === maxAttempts) {
        return {
          ok: false,
          layer: 'network',
          label,
          url,
          finalUrl: null,
          status: 0,
          statusText: '',
          ms: attempts.reduce((sum, item) => sum + item.ms, 0),
          body: '',
          errorKind: attempts.at(-1).errorKind,
          error: attempts.at(-1).error,
          attempts,
        };
      }
    }
    await sleep(backoffMs(attempt));
  }
  throw new Error('unreachable fetch retry state');
}

async function checkRedirectChain(site) {
  const canonical = new URL(site.baseUrl);
  const startUrl = new URL(canonical.href);
  startUrl.protocol = 'http:';
  const hops = [];
  let current = startUrl.href;
  try {
    for (let index = 0; index < 5; index += 1) {
      const response = await fetch(current, {
        redirect: 'manual',
        signal: AbortSignal.timeout(Number(hc.timeoutMs ?? 15000)),
        headers: requestHeaders(),
      });
      const location = response.headers.get('location');
      hops.push({ url: current, status: response.status, location });
      if (!location || ![301, 302, 303, 307, 308].includes(response.status)) break;
      current = new URL(location, current).href;
    }
  } catch (error) {
    addIssue(site, 'warning', 'https-redirect-network', `${site.name} 無法驗證 HTTP → HTTPS：${error.message}`);
    return { startUrl: startUrl.href, hops, error: error.message };
  }
  const final = hops.at(-1);
  if (hops.length !== 2 || hops[0]?.status !== 301 || final?.url !== canonical.href || final?.status !== 200) {
    addIssue(site, 'critical', 'https-redirect-invalid', `${site.name} HTTP 首頁不是單次 301 到同路徑 HTTPS（hops=${hops.length - 1}，final=${final?.url ?? 'none'}，status=${final?.status ?? 0}）`);
  }
  return { startUrl: startUrl.href, hops, finalUrl: final?.url, finalStatus: final?.status };
}

function parseHead(html) {
  const pick = (pattern) => {
    const match = html.match(pattern);
    return match ? decodeHtml(match[1].trim()) : null;
  };
  const metas = [...html.matchAll(/<meta\b[^>]*>/gi)].map((match) => match[0]);
  const metaAttr = (value, attr = 'name') => {
    const tag = metas.find((item) => new RegExp(`${attr}\\s*=\\s*["']${escapeRegExp(value)}["']`, 'i').test(item));
    if (!tag) return null;
    const content = tag.match(/content\s*=\s*["']([^"']*)["']/i);
    return content ? decodeHtml(content[1].trim()) : null;
  };
  const robotsMeta = metaAttr('robots') ?? '';
  return {
    title: pick(/<title[^>]*>([\s\S]*?)<\/title>/i),
    metaDescription: metaAttr('description'),
    canonical: pick(/<link\b[^>]*rel\s*=\s*["']canonical["'][^>]*href\s*=\s*["']([^"']+)["']/i)
      ?? pick(/<link\b[^>]*href\s*=\s*["']([^"']+)["'][^>]*rel\s*=\s*["']canonical["']/i),
    noindex: /noindex/i.test(robotsMeta),
    robotsMeta,
    hasAdsense: /pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js|adsbygoogle|ca-pub-\d+/i.test(html),
    hasAnalytics: /googletagmanager\.com\/gtag\/js|gtag\s*\(|G-[A-Z0-9]{6,}/i.test(html),
    lang: pick(/<html\b[^>]*lang\s*=\s*["']([^"']+)["']/i),
    metaRefresh: /<meta\b[^>]*http-equiv\s*=\s*["']refresh["']/i.test(html),
  };
}

function decodeHtml(text) {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function isSitemapXml(body) {
  return /<\s*(urlset|sitemapindex)\b/i.test(body);
}

function extractLocs(xml) {
  return [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/gi)].map((match) => decodeHtml(match[1].trim()));
}

function classifyNoindex(url, response, head, source) {
  if (!head.noindex) return { class: 'indexable', expected: false };
  const path = new URL(url).pathname;
  const title = head.title ?? '';
  if (response.status === 404 || /404|not found|找不到|不存在/i.test(title)) {
    return { class: 'allowed_404_or_not_found', expected: true };
  }
  if (/\/embed(\/|$)|\/embed-/i.test(path)) {
    return { class: 'allowed_embed', expected: true };
  }
  if (head.metaRefresh || /redirecting|article moved|continue to the site|轉址|重新導向/i.test(title)) {
    return { class: 'allowed_redirect_stub', expected: true };
  }
  if (source === 'sitemap') {
    return { class: 'unexpected_sitemap_noindex', expected: false };
  }
  return { class: 'unexpected_noindex', expected: false };
}

function checkCanonical(site, url, head, label) {
  if (!head.canonical) {
    addIssue(site, 'warning', `${label}-no-canonical`, `${site.name} ${label} 缺少 canonical：${url}`);
    return;
  }
  const canonicalUrl = new URL(head.canonical, site.baseUrl);
  if (canonicalUrl.origin !== new URL(site.baseUrl).origin) {
    addIssue(site, 'warning', `${label}-canonical-host-mismatch`, `${site.name} ${label} canonical 指向非本站網域：${head.canonical}`);
  }
}

function checkNoindex(site, url, response, head, source, label) {
  const classification = classifyNoindex(url, response, head, source);
  if (head.noindex && !classification.expected) {
    addIssue(
      site,
      'critical',
      `${label}-noindex`,
      `${site.name} ${label} 帶有非預期 noindex（${classification.class}）：${url}`,
      { noindexClass: classification.class },
    );
  }
  return classification;
}

function networkSuspect(site, response, label) {
  addIssue(
    site,
    'warning',
    'network_suspect',
    `${site.name} ${label} 連線層失敗，已重試 ${response.attempts.length} 次；暫列網路/DNS/邊緣節點可疑，不直接判定網站掛掉（${response.errorKind}: ${response.error}）`,
    {
      endpoint: response.url,
      failureLayer: 'network',
      attempts: response.attempts,
    },
  );
}

function httpError(site, response, severity, code, message) {
  addIssue(site, severity, code, message, {
    endpoint: response.url,
    failureLayer: 'http',
    status: response.status,
    attempts: response.attempts,
  });
}

function checkLocalRepo() {
  const site = sites.find((item) => item.localRepo) ?? sites[0];
  if (process.env.FABLE_HEALTH_SKIP_LOCAL_REPO === '1') {
    return {
      site: site.id,
      repo: null,
      skipped: true,
      reason: 'FABLE_HEALTH_SKIP_LOCAL_REPO',
      branch: null,
      lastCommit: null,
      uncommittedFiles: 0,
      version: null,
    };
  }
  const repo = site.localRepo ?? rootDir;
  const result = { site: site.id, repo };
  const run = (command) => execSync(command, {
    cwd: repo,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  }).trim();

  try {
    result.branch = run('git rev-parse --abbrev-ref HEAD');
    result.lastCommit = run('git log -1 --format="%h %s (%ci)"');
    const dirty = run('git status --porcelain');
    result.uncommittedFiles = dirty ? dirty.split(/\r?\n/).filter(Boolean).length : 0;
    if (result.branch !== 'main') {
      addIssue(site, 'warning', 'repo-not-main', `${site.name} 本機 repo 目前在 ${result.branch}，不是 main`);
    }
    if (result.uncommittedFiles > 0) {
      addIssue(site, 'info', 'repo-dirty', `${site.name} 本機 repo 有 ${result.uncommittedFiles} 個未 commit 的變更檔案`);
    }
  } catch (error) {
    result.gitError = error.message;
    addIssue(site, 'warning', 'repo-git-error', `${site.name} 無法讀取本機 repo git 狀態：${error.message.split('\n')[0]}`);
  }

  try {
    const packageJson = JSON.parse(readFileSync(join(repo, 'package.json'), 'utf8'));
    result.version = packageJson.version;
  } catch {
    addIssue(site, 'warning', 'repo-no-package', `${site.name} 無法讀取網站 package.json`);
  }
  return result;
}

function recordContractIssues(site, contractIssues) {
  for (const issue of contractIssues) {
    addIssue(site, issue.severity, issue.code, issue.message);
  }
}

async function checkSourceIdentity(site) {
  const result = {
    repo: site.githubRepo,
    branch: 'main',
    state: 'UNKNOWN',
    mainSha: null,
    committedAt: null,
    status: 0,
    observedAt: new Date().toISOString(),
  };
  if (!site.githubRepo) return result;

  const url = `https://api.github.com/repos/${site.githubRepo}/branches/main`;
  const response = await fetchText(url, 'github-source-identity', githubHeaders());
  result.status = response.status;
  if (response.layer === 'http') {
    let json = null;
    try { json = JSON.parse(response.body); } catch { /* classified UNKNOWN below */ }
    const classification = classifySourceIdentity({
      status: response.status,
      sha: json?.commit?.sha,
      rateLimited: response.status === 429,
    });
    Object.assign(result, classification);
    result.committedAt = json?.commit?.commit?.committer?.date
      ?? json?.commit?.commit?.author?.date
      ?? null;
  } else {
    Object.assign(result, classifySourceIdentity({ status: 0 }));
  }
  if (result.state === 'NO_ACCESS') {
    addIssue(site, 'info', 'source-identity-no-access', `${site.name} GitHub main SHA 無法讀取（HTTP ${result.status}），不視為網站故障`);
  } else if (result.state === 'UNKNOWN') {
    addIssue(site, 'info', 'source-identity-unknown', `${site.name} GitHub main SHA 暫時無法分類，不視為網站故障`);
  }
  return result;
}

function deploymentEvidenceState(evidence) {
  if (evidence === 'VERIFIED') return 'COMPLETE';
  if (evidence === 'PARTIAL') return 'PARTIAL';
  if (evidence === 'NO_ACCESS') return 'NO_ACCESS';
  return 'UNKNOWN';
}

async function fetchGithubPagesProvider(site) {
  const deployment = site.deployment ?? {};
  const environment = deployment.environment ?? 'github-pages';
  const url = `https://api.github.com/repos/${site.githubRepo}/deployments?environment=${encodeURIComponent(environment)}&per_page=10`;
  const response = await fetchText(url, 'github-pages-deployments', githubHeaders());
  if (response.layer !== 'http') {
    return { providerApi: 'UNKNOWN', identity: null, latestAttempt: null, response };
  }
  if ([401, 403, 429].includes(response.status)) {
    return { providerApi: 'NO_ACCESS', identity: null, latestAttempt: null, response };
  }
  if (response.status !== 200) {
    return { providerApi: 'UNKNOWN', identity: null, latestAttempt: null, response };
  }

  let deployments;
  try {
    deployments = JSON.parse(response.body);
  } catch {
    return { providerApi: 'UNKNOWN', identity: null, latestAttempt: null, response };
  }
  if (!Array.isArray(deployments)) {
    return { providerApi: 'UNKNOWN', identity: null, latestAttempt: null, response };
  }

  let latestAttempt = null;
  let latestSuccess = null;
  for (const item of deployments.slice(0, 5)) {
    let statuses = [];
    if (item?.statuses_url) {
      const statusResponse = await fetchText(item.statuses_url, 'github-pages-deployment-status', githubHeaders());
      if (statusResponse.layer === 'http' && statusResponse.status === 200) {
        try {
          const parsed = JSON.parse(statusResponse.body);
          if (Array.isArray(parsed)) statuses = parsed;
        } catch { /* malformed status is treated as unavailable */ }
      }
    }
    const status = statuses[0] ?? null;
    if (!latestAttempt) {
      latestAttempt = {
        id: item?.id ?? null,
        sha: item?.sha ?? null,
        state: status?.state ?? null,
        createdAt: item?.created_at ?? null,
      };
    }
    if (!latestSuccess && status?.state === 'success') {
      latestSuccess = normalizeGithubPagesDeployment(item, status);
    }
  }

  const identity = latestSuccess
    ?? (deployments[0]
      ? normalizeGithubPagesDeployment(deployments[0], null)
      : null);
  return {
    providerApi: identity?.evidence === 'VERIFIED'
      ? 'VERIFIED'
      : identity
        ? 'PARTIAL'
        : 'UNKNOWN',
    identity,
    latestAttempt,
    response,
  };
}

async function fetchCloudflareProvider(site) {
  const deployment = site.deployment ?? {};
  const accountId = process.env[deployment.cloudflareAccountIdEnv ?? 'CLOUDFLARE_ACCOUNT_ID'];
  const token = process.env[deployment.cloudflareApiTokenEnv ?? 'CLOUDFLARE_API_TOKEN'];
  if (!accountId || !token) {
    return {
      providerApi: 'NO_ACCESS',
      credentialSource: 'ENV_ABSENT',
      identity: null,
      latestAttempt: null,
    };
  }

  const url = `https://api.cloudflare.com/client/v4/accounts/${encodeURIComponent(accountId)}/pages/projects/${encodeURIComponent(deployment.projectName ?? '')}`;
  const response = await fetchText(url, 'cloudflare-pages-project', {
    ...githubHeaders(),
    authorization: `Bearer ${token}`,
  });
  if (response.layer !== 'http' || [401, 403, 429].includes(response.status)) {
    return {
      providerApi: 'NO_ACCESS',
      credentialSource: 'ENV_PRESENT',
      identity: null,
      latestAttempt: null,
      response,
    };
  }
  if (response.status !== 200) {
    return {
      providerApi: 'UNKNOWN',
      credentialSource: 'ENV_PRESENT',
      identity: null,
      latestAttempt: null,
      response,
    };
  }
  let json;
  try {
    json = JSON.parse(response.body);
  } catch {
    return {
      providerApi: 'UNKNOWN',
      credentialSource: 'ENV_PRESENT',
      identity: null,
      latestAttempt: null,
      response,
    };
  }
  const identity = normalizeCloudflarePagesProject(json);
  return {
    providerApi: identity.evidence,
    credentialSource: 'ENV_PRESENT',
    identity,
    latestAttempt: identity.deploymentId
      ? {
        id: identity.deploymentId,
        sha: identity.deploymentSha,
        state: identity.providerState,
        createdAt: identity.deploymentCreatedAt,
      }
      : null,
    response,
  };
}

async function fetchWorkflowFallback(site) {
  const deployment = site.deployment ?? {};
  const workflowFile = deployment.workflowFile;
  if (!site.githubRepo || !workflowFile) {
    return { identity: null, latestAttempt: null, providerApi: 'UNKNOWN' };
  }
  const url = `https://api.github.com/repos/${site.githubRepo}/actions/workflows/${encodeURIComponent(workflowFile)}/runs?branch=${encodeURIComponent(deployment.productionBranch ?? 'main')}&per_page=10`;
  const response = await fetchText(url, 'github-workflow-deployments', githubHeaders());
  if (response.layer !== 'http' || [401, 403, 429].includes(response.status)) {
    return { identity: null, latestAttempt: null, providerApi: 'NO_ACCESS', response };
  }
  if (response.status !== 200) {
    return { identity: null, latestAttempt: null, providerApi: 'UNKNOWN', response };
  }
  let json;
  try {
    json = JSON.parse(response.body);
  } catch {
    return { identity: null, latestAttempt: null, providerApi: 'UNKNOWN', response };
  }
  const runs = Array.isArray(json?.workflow_runs) ? json.workflow_runs : [];
  let latestAttempt = null;
  for (const run of runs) {
    const jobsUrl = `https://api.github.com/repos/${site.githubRepo}/actions/runs/${run.id}/jobs?per_page=100`;
    const jobsResponse = await fetchText(jobsUrl, 'github-workflow-deploy-jobs', githubHeaders());
    if (jobsResponse.layer !== 'http' || jobsResponse.status !== 200) continue;
    let jobsJson;
    try { jobsJson = JSON.parse(jobsResponse.body); } catch { continue; }
    const jobs = Array.isArray(jobsJson?.jobs) ? jobsJson.jobs : [];
    const job = jobs.find((candidate) =>
      String(candidate?.name ?? '').toLowerCase() === String(deployment.deployJobName ?? 'deploy').toLowerCase());
    if (!job) continue;
    const step = deployment.deployStepName
      ? (job.steps ?? []).find((candidate) =>
        String(candidate?.name ?? '').toLowerCase() === String(deployment.deployStepName).toLowerCase())
      : null;
    const identity = normalizeWorkflowDeployment({ run, job, step });
    if (!latestAttempt) {
      latestAttempt = {
        id: run.id ?? null,
        sha: run.head_sha ?? null,
        state: step?.conclusion ?? job.conclusion ?? run.conclusion ?? null,
        createdAt: run.updated_at ?? run.created_at ?? null,
      };
    }
    if (identity.evidence === 'PARTIAL') {
      return {
        identity,
        latestAttempt,
        providerApi: 'NO_ACCESS',
        run,
        job,
        step,
      };
    }
  }
  return { identity: null, latestAttempt, providerApi: 'UNKNOWN' };
}

async function compareDeploymentToSource(site, deploymentSha, sourceSha) {
  if (!site.githubRepo || !deploymentSha || !sourceSha) return null;
  const url = `https://api.github.com/repos/${site.githubRepo}/compare/${deploymentSha}...${sourceSha}`;
  const response = await fetchText(url, 'github-deployment-compare', githubHeaders());
  if (response.layer !== 'http' || response.status !== 200) return null;
  let json;
  try { json = JSON.parse(response.body); } catch { return null; }
  const files = Array.isArray(json?.files) ? json.files : [];
  return {
    status: json?.status ?? null,
    totalCommits: json?.total_commits ?? null,
    complete: files.length < 300,
    files,
  };
}

async function checkDeploymentIdentity(site, sourceIdentity) {
  const deployment = site.deployment ?? {};
  let providerResult;
  if (deployment.provider === 'cloudflare-pages') {
    providerResult = await fetchCloudflareProvider(site);
  } else {
    providerResult = await fetchGithubPagesProvider(site);
  }

  let fallbackResult = null;
  if (providerResult.providerApi !== 'VERIFIED') {
    fallbackResult = await fetchWorkflowFallback(site);
  }
  const providerIdentity = providerResult.identity;
  const fallbackIdentity = fallbackResult?.identity;
  const selected = providerIdentity?.evidence === 'VERIFIED'
    ? providerIdentity
    : fallbackIdentity?.evidence === 'PARTIAL'
      ? fallbackIdentity
      : providerIdentity;
  const baseIdentity = selected ?? {
    provider: deployment.provider ?? 'unknown',
    evidence: providerResult.providerApi === 'NO_ACCESS' ? 'NO_ACCESS' : 'UNKNOWN',
    deploymentId: null,
    deploymentSha: null,
    deploymentRef: null,
    deploymentCreatedAt: null,
    providerState: null,
    environment: null,
    environmentUrl: null,
  };
  const compare = baseIdentity.deploymentSha
    && sourceIdentity.mainSha
    && baseIdentity.deploymentSha !== sourceIdentity.mainSha
    ? await compareDeploymentToSource(site, baseIdentity.deploymentSha, sourceIdentity.mainSha)
    : null;
  const freshness = evaluateDeploymentFreshness({
    sourceSha: sourceIdentity.mainSha,
    sourceCommittedAt: sourceIdentity.committedAt,
    deploymentSha: baseIdentity.deploymentSha,
    latestAttemptSha: providerResult.latestAttempt?.sha ?? fallbackResult?.latestAttempt?.sha,
    latestAttemptState: providerResult.latestAttempt?.state ?? fallbackResult?.latestAttempt?.state,
    sourceScope: deployment.sourceScope ?? { mode: 'all-main' },
    compare,
    graceMinutes: deployment.graceMinutes ?? 45,
  });
  const freshnessIssue = deploymentFreshnessIssue(freshness);
  if (freshnessIssue) {
    addIssue(site, freshnessIssue.severity, freshnessIssue.code,
      `${site.name} deployment freshness=${freshness.state}（source=${sourceIdentity.mainSha ?? '?'}，deployment=${baseIdentity.deploymentSha ?? '?'}）`,
      { deploymentFreshness: freshness, deploymentEvidence: baseIdentity.evidence });
  }

  return {
    provider: deployment.provider ?? baseIdentity.provider,
    evidence: baseIdentity.evidence,
    deploymentId: baseIdentity.deploymentId,
    deploymentSha: baseIdentity.deploymentSha,
    deploymentRef: baseIdentity.deploymentRef,
    deploymentCreatedAt: baseIdentity.deploymentCreatedAt,
    providerState: baseIdentity.providerState,
    environment: baseIdentity.environment,
    environmentUrl: baseIdentity.environmentUrl,
    providerApi: providerResult.providerApi,
    credentialSource: providerResult.credentialSource ?? null,
    sourceSha: sourceIdentity.mainSha,
    sourceCommittedAt: sourceIdentity.committedAt,
    freshness,
    compare,
    latestAttempt: providerResult.latestAttempt ?? fallbackResult?.latestAttempt ?? null,
    workflowFallback: fallbackResult?.identity
      ? {
        evidence: fallbackResult.identity.evidence,
        deploymentId: fallbackResult.identity.deploymentId,
        deploymentSha: fallbackResult.identity.deploymentSha,
        deploymentRef: fallbackResult.identity.deploymentRef,
        providerState: fallbackResult.identity.providerState,
        deploymentCreatedAt: fallbackResult.identity.deploymentCreatedAt,
        workflowUrl: fallbackResult.run?.html_url ?? null,
        job: fallbackResult.job?.name ?? null,
        step: fallbackResult.step?.name ?? null,
      }
      : {
        evidence: providerResult.providerApi === 'VERIFIED' ? 'NOT_USED' : (fallbackResult?.providerApi ?? 'UNKNOWN'),
      },
    observedAt: new Date().toISOString(),
  };
}

async function checkServices(site) {
  if (!site.services.length) return { items: [], evidence: 'NOT_APPLICABLE' };
  const items = [];
  let complete = true;
  for (const service of site.services) {
    const response = await fetchText(endpointUrl(site, service.url), `service:${service.id}`);
    let json = null;
    if (response.layer === 'http') {
      try { json = JSON.parse(response.body); } catch { json = null; }
    } else {
      complete = false;
    }
    const contractIssues = evaluateJsonHealth(service, { status: response.status, json });
    recordContractIssues(site, contractIssues);
    items.push({
      id: service.id,
      type: service.type,
      url: service.url,
      status: response.status,
      layer: response.layer,
      ok: response.ok,
      jsonOk: json?.ok,
      version: json?.version,
      revision: json?.revision,
      ms: response.ms,
      attempts: response.attempts,
      issues: contractIssues,
    });
  }
  return { items, evidence: complete ? 'COMPLETE' : 'UNKNOWN' };
}

function detectContractAnalytics(html) {
  return /googletagmanager\.com\/gtag\/js|<script\b[^>]+src=["'][^"']*(?:analytics|gtag)[^"']*["']/i.test(html)
    || /(?:^|["'=])G-[A-Z0-9]{6,}(?:["'&\s<])/.test(html);
}

async function checkContractProbes(site) {
  if (!site.contractProbes.length) return { items: [], evidence: 'NOT_APPLICABLE' };
  const items = [];
  let complete = true;
  for (const probe of site.contractProbes) {
    const url = endpointUrl(site, probe.path);
    const response = await fetchText(url, `contract:${probe.id}`);
    if (response.layer !== 'http') complete = false;
    const head = response.layer === 'http' ? parseHead(response.body) : {};
    const contractAnalytics = response.layer === 'http' ? detectContractAnalytics(response.body) : false;
    const contractIssues = evaluateContractProbe(probe, {
      status: response.status,
      noindex: head.noindex,
      analytics: contractAnalytics,
      adsense: head.hasAdsense,
      body: response.body,
    });
    recordContractIssues(site, contractIssues);
    const forbiddenMatches = (probe.forbidPatterns ?? []).filter((pattern) => response.body.toLowerCase().includes(String(pattern).toLowerCase()));
    items.push({
      id: probe.id,
      path: probe.path,
      url,
      status: response.status,
      layer: response.layer,
      noindex: head.noindex ?? null,
      analytics: response.layer === 'http' ? contractAnalytics : null,
      adsense: head.hasAdsense ?? null,
      forbiddenPatternCount: forbiddenMatches.length,
      ms: response.ms,
      attempts: response.attempts,
      issues: contractIssues,
    });
  }
  return { items, evidence: complete ? 'COMPLETE' : 'PARTIAL' };
}

function liveHttpEvidence(live) {
  const responses = [live.home, live.primary, live.adsTxt, live.robots, live.sitemap, ...(live.samples ?? [])];
  return responses.every((response) => response?.layer === 'http') ? 'COMPLETE' : 'UNKNOWN';
}

async function checkHome(site) {
  const homeUrl = endpointUrl(site, '/');
  const response = await fetchText(homeUrl, 'home');
  const result = summarizeResponse(response);
  if (response.layer === 'network') {
    networkSuspect(site, response, '首頁');
    return result;
  }
  if (response.status !== 200) {
    httpError(site, response, 'critical', 'home-http-error', `${site.name} 首頁 HTTP 錯誤：status=${response.status}`);
    return result;
  }

  const head = parseHead(response.body);
  Object.assign(result, head, { htmlBytes: response.body.length });
  if (response.ms > Number(hc.slowResponseMs ?? 4000)) {
    addIssue(site, 'warning', 'home-slow', `${site.name} 首頁回應時間 ${response.ms}ms 超過 ${hc.slowResponseMs}ms`);
  }
  if (!head.title) addIssue(site, 'critical', 'home-no-title', `${site.name} 首頁缺少 <title>`);
  checkCanonical(site, homeUrl, head, 'home');
  checkNoindex(site, homeUrl, response, head, 'home', 'home');
  return result;
}

async function checkPrimaryPage(site, homeResult) {
  const primaryUrl = endpointUrl(site, site.primaryPath);
  if (primaryUrl === endpointUrl(site, '/')) return { ...homeResult, url: primaryUrl, reusedHome: true };

  const response = await fetchText(primaryUrl, 'primary');
  const result = summarizeResponse(response, primaryUrl);
  if (response.layer === 'network') {
    networkSuspect(site, response, `深檢主體頁 ${site.primaryPath}`);
    return result;
  }
  if (response.status !== 200) {
    httpError(site, response, 'critical', 'primary-http-error', `${site.name} 深檢主體頁 ${site.primaryPath} HTTP 錯誤：status=${response.status}`);
    return result;
  }

  const head = parseHead(response.body);
  Object.assign(result, head, { htmlBytes: response.body.length });
  if (!head.title) addIssue(site, 'critical', 'primary-no-title', `${site.name} 深檢主體頁 ${site.primaryPath} 缺少 <title>`);
  if (!head.metaDescription) addIssue(site, 'warning', 'primary-no-description', `${site.name} 深檢主體頁 ${site.primaryPath} 缺少 meta description`);
  checkCanonical(site, primaryUrl, head, 'primary');
  checkNoindex(site, primaryUrl, response, head, 'primary', 'primary');
  return result;
}

async function checkAdsTxt(site) {
  const response = await fetchText(endpointUrl(site, '/ads.txt'), 'ads.txt');
  const result = summarizeResponse(response);
  if (!site.expectations.expectAdsTxt) {
    result.expected = false;
    return result;
  }
  if (response.layer === 'network') {
    networkSuspect(site, response, 'ads.txt');
    return result;
  }
  if (response.status !== 200) {
    httpError(site, response, 'warning', 'ads-txt-http-error', `${site.name} 預期有 ads.txt，但 /ads.txt HTTP ${response.status}`);
    return result;
  }
  result.hasGoogleSeller = /google\.com\s*,\s*pub-\d+/i.test(response.body);
  if (!result.hasGoogleSeller) {
    addIssue(site, 'warning', 'ads-txt-missing-google-seller', `${site.name} ads.txt 可達，但未偵測到 google.com pub-* seller 記錄`);
  }
  return result;
}

async function checkRobots(site) {
  const response = await fetchText(endpointUrl(site, '/robots.txt'), 'robots.txt');
  const result = summarizeResponse(response);
  if (response.layer === 'network') {
    networkSuspect(site, response, 'robots.txt');
    return result;
  }
  if (response.status !== 200) {
    httpError(site, response, 'critical', 'robots-http-error', `${site.name} robots.txt HTTP 錯誤：status=${response.status}`);
    return result;
  }
  result.hasSitemap = /^\s*sitemap\s*:/im.test(response.body);
  result.blocksAll = /user-agent:\s*\*\s*[\r\n]+\s*disallow:\s*\/\s*$/im.test(response.body);
  if (result.blocksAll) addIssue(site, 'critical', 'robots-blocks-all', `${site.name} robots.txt 封鎖所有爬蟲（Disallow: /）`);
  if (!result.hasSitemap) addIssue(site, 'warning', 'robots-no-sitemap', `${site.name} robots.txt 沒有宣告 Sitemap`);
  return result;
}

async function checkSitemap(site) {
  const sitemapUrl = endpointUrl(site, site.sitemapPath);
  const response = await fetchText(sitemapUrl, 'sitemap');
  const result = summarizeResponse(response, sitemapUrl);
  result.path = site.sitemapPath;
  result.urlCount = 0;
  result.sampleSourceUrls = [];
  if (response.layer === 'network') {
    networkSuspect(site, response, `sitemap ${site.sitemapPath}`);
    return result;
  }
  if (response.status !== 200) {
    httpError(site, response, 'critical', 'sitemap-http-error', `${site.name} sitemap ${site.sitemapPath} HTTP 錯誤：status=${response.status}`);
    return result;
  }
  if (!isSitemapXml(response.body)) {
    addIssue(site, 'critical', 'sitemap-not-xml', `${site.name} sitemap ${site.sitemapPath} 回 200 但不是 sitemap XML`);
    result.notXml = true;
    return result;
  }

  result.isIndex = /<\s*sitemapindex\b/i.test(response.body);
  let pageUrls = extractLocs(response.body);
  result.childCount = result.isIndex ? pageUrls.length : 0;
  result.children = result.isIndex ? pageUrls : [];
  if (result.isIndex && pageUrls.length > 0) {
    const childResponses = [];
    const childUrls = [];
    for (const childUrl of pageUrls) {
      const childResponse = await fetchText(childUrl, 'sitemap-child');
      childResponses.push(summarizeResponse(childResponse, childUrl));
      if (childResponse.layer === 'network') {
        networkSuspect(site, childResponse, `子 sitemap ${childUrl}`);
        continue;
      }
      if (childResponse.status !== 200) {
        httpError(site, childResponse, 'critical', 'sitemap-child-http-error', `${site.name} 子 sitemap HTTP ${childResponse.status}：${childUrl}`);
        continue;
      }
      if (!isSitemapXml(childResponse.body)) {
        addIssue(site, 'critical', 'sitemap-child-not-xml', `${site.name} 子 sitemap 不是 XML：${childUrl}`);
        continue;
      }
      childUrls.push(...extractLocs(childResponse.body));
    }
    result.childResponses = childResponses;
    pageUrls = childUrls;
  }
  result.urlCount = pageUrls.length;
  result.sampleSourceUrls = pageUrls;
  if (pageUrls.length === 0) {
    addIssue(site, 'critical', 'sitemap-empty', `${site.name} sitemap 沒有可抽樣 URL：${site.sitemapPath}`);
  }
  return result;
}

async function checkSamplePage(site, url, source) {
  const response = await fetchText(url, 'sample');
  const sample = summarizeResponse(response, url);
  sample.source = source;
  if (response.layer === 'network') {
    networkSuspect(site, response, `抽樣頁 ${url}`);
    sample.noindexClass = 'unknown_network';
    return sample;
  }
  if (response.status !== 200) {
    httpError(site, response, 'critical', 'page-http-error', `${site.name} 抽樣頁 HTTP ${response.status}：${url}`);
    return sample;
  }

  const head = parseHead(response.body);
  Object.assign(sample, {
    title: head.title,
    canonical: head.canonical,
    noindex: head.noindex,
    robotsMeta: head.robotsMeta,
    noindexClass: classifyNoindex(url, response, head, source).class,
  });
  if (!head.title) addIssue(site, 'warning', 'page-no-title', `${site.name} 抽樣頁缺少 title：${url}`);
  checkCanonical(site, url, head, 'page');
  checkNoindex(site, url, response, head, source, 'page');
  return sample;
}

function buildSampleSet(site, sitemapUrls) {
  const samples = new Map();
  const excluded = new Set([
    endpointUrl(site, '/'),
    endpointUrl(site, site.primaryPath),
  ]);
  for (const path of site.sampleUrls ?? []) {
    const url = endpointUrl(site, path);
    if (!excluded.has(url)) samples.set(url, 'config');
  }
  for (const url of sitemapUrls) {
    if (samples.size >= site.samplePageCount) break;
    if (!excluded.has(url) && !samples.has(url)) samples.set(url, 'sitemap');
  }
  return [...samples];
}

async function checkSite(site) {
  const live = {
    id: site.id,
    name: site.name,
    baseUrl: site.baseUrl,
    primaryPath: site.primaryPath,
    sitemapPath: site.sitemapPath,
    expectations: site.expectations,
  };

  live.home = await checkHome(site);
  if (site.monitorHttpsRedirect) live.httpsRedirect = await checkRedirectChain(site);
  live.primary = await checkPrimaryPage(site, live.home);
  if (live.primary.status === 200) {
    if (site.expectations.expectAdsense && !live.primary.hasAdsense) {
      addIssue(site, 'critical', 'no-adsense', `${site.name} 深檢主體頁偵測不到 AdSense 程式碼`);
    }
    if (site.expectations.expectAnalytics && !live.primary.hasAnalytics) {
      addIssue(site, 'warning', 'no-analytics', `${site.name} 深檢主體頁偵測不到 GA4/gtag 追蹤碼`);
    }
  }

  live.adsTxt = await checkAdsTxt(site);
  live.robots = await checkRobots(site);
  live.sitemap = await checkSitemap(site);
  const sampleEntries = buildSampleSet(site, live.sitemap.sampleSourceUrls ?? []);
  live.samples = [];
  for (const [url, source] of sampleEntries) {
    live.samples.push(await checkSamplePage(site, url, source));
  }
  live.sourceIdentity = await checkSourceIdentity(site);
  live.deploymentIdentity = await checkDeploymentIdentity(site, live.sourceIdentity);
  const services = await checkServices(site);
  live.services = services.items;
  const contractProbes = await checkContractProbes(site);
  live.contractProbes = contractProbes.items;
  live.evidence = {
    liveHttp: liveHttpEvidence(live),
    sourceIdentity: live.sourceIdentity.state,
    deploymentIdentity: deploymentEvidenceState(live.deploymentIdentity.evidence),
    serviceHealth: services.evidence,
    contractProbes: contractProbes.evidence,
  };
  live.status = siteStatus(site.id);
  return live;
}

function siteStatus(siteId) {
  const siteIssues = issues.filter((issue) => issue.site === siteId);
  return {
    critical: siteIssues.filter((issue) => issue.severity === 'critical').length,
    warning: siteIssues.filter((issue) => issue.severity === 'warning').length,
    info: siteIssues.filter((issue) => issue.severity === 'info').length,
  };
}

function summarizeResponse(response, url = response.url) {
  const summary = {
    url,
    finalUrl: response.finalUrl,
    status: response.status,
    ms: response.ms,
    layer: response.layer,
    ok: response.ok,
    attempts: response.attempts,
  };
  if (response.layer === 'network') {
    summary.errorKind = response.errorKind;
    summary.error = response.error;
  }
  return summary;
}

function diffWithPrevious(snapshot, dataDir) {
  const previousPath = join(dataDir, 'health', 'latest-status.json');
  if (!existsSync(previousPath)) return { hasPrevious: false, changes: [] };
  try {
    const previous = JSON.parse(readFileSync(previousPath, 'utf8'));
    const changes = [];
    for (const site of snapshot.sites) {
      const prior = previous.sites?.find((item) => item.id === site.id);
      const priorCount = Number(prior?.sitemap?.urlCount ?? 0);
      const currentCount = Number(site.sitemap?.urlCount ?? 0);
      const threshold = Number(sites.find((item) => item.id === site.id)?.sitemapDropAlertPercent ?? 10);
      if (priorCount > 0 && currentCount < priorCount * (1 - threshold / 100)) {
        const drop = ((priorCount - currentCount) / priorCount * 100).toFixed(1);
        addIssue(sites.find((item) => item.id === site.id), 'critical', 'sitemap-count-collapse', `${site.name} sitemap URL 數由 ${priorCount} 降至 ${currentCount}（-${drop}%），超過 ${threshold}% 警戒值`);
      }
      const priorSamples = new Map((prior?.samples ?? []).map((sample) => [sample.url, sample]));
      for (const sample of site.samples ?? []) {
        const old = priorSamples.get(sample.url);
        if (old?.canonical && sample.canonical && old.canonical !== sample.canonical) {
          addIssue(sites.find((item) => item.id === site.id), 'critical', 'core-canonical-changed', `${site.name} 核心頁 canonical 改變：${sample.url}（${old.canonical} → ${sample.canonical}）`);
        }
      }
      const sourceChange = diffSourceIdentity(prior?.sourceIdentity?.mainSha, site.sourceIdentity?.mainSha);
      if (sourceChange.changed) changes.push({ ...sourceChange, site: site.id });
      for (const deploymentChange of diffDeploymentIdentity(prior?.deploymentIdentity, site.deploymentIdentity)) {
        changes.push({ ...deploymentChange, site: site.id });
      }
      const priorServices = new Map((prior?.services ?? []).map((service) => [service.id, service]));
      for (const service of site.services ?? []) {
        const old = priorServices.get(service.id);
        if (old?.revision && service.revision && old.revision !== service.revision && service.status === 200 && service.jsonOk === true) {
          changes.push({
            type: 'SERVICE_REVISION_CHANGED',
            severity: 'info',
            site: site.id,
            service: service.id,
            from: old.revision,
            to: service.revision,
          });
        }
      }
    }
    const prevCodes = new Set((previous.issues ?? []).map((issue) => `${issue.code}:${issue.message}`));
    const currentCodes = new Set(snapshot.issues.map((issue) => `${issue.code}:${issue.message}`));
    return {
      hasPrevious: true,
      previousDate: previous.date,
      changes,
      newIssues: snapshot.issues.filter((issue) => !prevCodes.has(`${issue.code}:${issue.message}`)),
      resolvedIssues: (previous.issues ?? []).filter((issue) => !currentCodes.has(`${issue.code}:${issue.message}`)),
      persistingIssues: snapshot.issues.filter((issue) => prevCodes.has(`${issue.code}:${issue.message}`)),
    };
  } catch (error) {
    return { hasPrevious: false, changes: [], error: error.message };
  }
}

function reportingDirs() {
  return {
    vaultDir: process.env.FABLE_HEALTH_VAULT_DIR || config.reporting?.vaultDir || join(rootDir, 'reports', 'vault'),
    dataDir: process.env.FABLE_HEALTH_DATA_DIR || config.reporting?.dataDir || join(rootDir, 'reports', 'data'),
  };
}

function writeReports(snapshot, diff) {
  const date = snapshot.date;
  const { vaultDir, dataDir } = reportingDirs();
  const critical = issues.filter((issue) => issue.severity === 'critical');
  const warning = issues.filter((issue) => issue.severity === 'warning');
  const info = issues.filter((issue) => issue.severity === 'info');
  const status = critical.length || warning.length ? 'ISSUES' : 'OK';
  const icon = critical.length ? '🔴' : warning.length ? '🟡' : '🟢';

  const shortDir = ensureDir(join(vaultDir, '01_Daily_Reports', 'Short'));
  const shortLines = [
    '---',
    `date: ${date}`,
    `status: ${status}`,
    `critical: ${critical.length}`,
    `warning: ${warning.length}`,
    `info: ${info.length}`,
    `site_version: ${snapshot.local.version ?? 'unknown'}`,
    '---',
    '',
    `# 每日健康短報告 ${date}`,
    '',
    `**狀態：${icon} ${status === 'OK' ? '正常，無需介入' : '發現問題，需要處理'}**`,
    '',
    `## ${snapshot.sites.length}站摘要`,
    '',
    `- 監測站點：${snapshot.sites.length}（含 FamilyBoard）`,
    '',
  ];
  for (const site of snapshot.sites) {
    const siteIcon = site.status.critical ? '🔴' : site.status.warning ? '🟡' : '🟢';
    shortLines.push(`- ${siteIcon} ${site.id}: critical ${site.status.critical} / warning ${site.status.warning} / sitemap ${site.sitemap.urlCount ?? 0} URLs / samples ${site.samples.length}`);
  }
  shortLines.push('');
  if (status === 'ISSUES') {
    shortLines.push('## 問題清單', '');
    for (const issue of [...critical, ...warning]) {
      shortLines.push(`- ${severityIcon(issue.severity)} \`${issue.code}\` ${issue.message}`);
    }
    shortLines.push('');
    const newProblemCount = diff.hasPrevious ? diff.newIssues.filter((issue) => issue.severity !== 'info').length : 0;
    if (newProblemCount > 0) {
      shortLines.push(`> 其中 ${newProblemCount} 個是今天新出現的問題。`);
      shortLines.push('');
    }
  }
  shortLines.push(`詳細內容見：[[../Long/${date}|長報告 ${date}]]`, '');
  const shortReport = shortLines.join('\n');
  writeFileSync(join(shortDir, `${date}.md`), shortReport, 'utf8');
  writeFileSync(join(shortDir, 'latest.md'), shortReport, 'utf8');

  const longDir = ensureDir(join(vaultDir, '01_Daily_Reports', 'Long'));
  const longLines = [
    `# 每日健康長報告 ${date} — ${snapshot.sites.length}站`,
    '',
    `- 狀態：${icon} ${status}（🔴 ${critical.length}／🟡 ${warning.length}／ℹ️ ${info.length}）`,
    `- 網站：${snapshot.sites.map((site) => site.baseUrl).join('、')}`,
    ...(snapshot.local?.skipped
      ? ['- 本機 repo：SKIPPED（cloud monitoring context）']
      : [
        `- 本機版本（${snapshot.local.site}）：v${snapshot.local.version ?? '?'}｜branch: ${snapshot.local.branch ?? '?'}｜未 commit 檔案：${snapshot.local.uncommittedFiles ?? '?'}`,
        `- 最後 commit：${snapshot.local.lastCommit ?? '?'}`,
      ]),
    '',
    '## 問題總覽',
    '',
  ];
  if (issues.length === 0) {
    longLines.push('今日無任何問題。', '');
  } else {
    for (const issue of issues) {
      longLines.push(`- ${severityIcon(issue.severity)} \`${issue.code}\` ${issue.message}`);
    }
    longLines.push('');
  }

  longLines.push('## 與前次相比', '');
  if (!diff.hasPrevious) {
    longLines.push('尚無前一次快照，無法比對。', '');
  } else {
    longLines.push(`比對基準：${diff.previousDate}`, '');
    longLines.push(`- 新增問題：${diff.newIssues.length ? '' : '無'}`);
    for (const issue of diff.newIssues) longLines.push(`  - ${severityIcon(issue.severity)} \`${issue.code}\` ${issue.message}`);
    longLines.push(`- 已解決問題：${diff.resolvedIssues.length ? '' : '無'}`);
    for (const issue of diff.resolvedIssues) longLines.push(`  - ✅ \`${issue.code}\` ${issue.message}`);
    longLines.push(`- 持續存在問題：${diff.persistingIssues.length ? '' : '無'}`);
    for (const issue of diff.persistingIssues) longLines.push(`  - ${severityIcon(issue.severity)} \`${issue.code}\` ${issue.message}`);
    longLines.push(`- 觀察變更：${diff.changes?.length ? '' : '無'}`);
    for (const change of diff.changes ?? []) {
      const label = change.type === 'SOURCE_MAIN_ADVANCED'
        ? `${change.site} main SHA ${change.from} → ${change.to}`
        : change.type === 'SERVICE_REVISION_CHANGED'
          ? `${change.site}/${change.service} revision ${change.from} → ${change.to}`
          : `${change.site} deployment ${change.type} ${change.from ?? 'none'} → ${change.to ?? 'none'}`;
      longLines.push(`  - ℹ️ \`${change.type}\` ${label}`);
    }
    longLines.push('');
  }

  longLines.push(`## ${snapshot.sites.length}站深檢明細`, '');
  for (const site of snapshot.sites) {
    longLines.push(`### ${site.name}（${site.baseUrl}）`, '');
    longLines.push(`- 狀態：critical ${site.status.critical} / warning ${site.status.warning} / info ${site.status.info}`);
    longLines.push(`- 首頁：HTTP ${site.home.status}，${site.home.ms}ms，layer=${site.home.layer}${site.home.error ? `，${site.home.errorKind}: ${site.home.error}` : ''}`);
    longLines.push(`- 深檢主體：${site.primary.url}｜HTTP ${site.primary.status}，${site.primary.ms}ms，title=${site.primary.title ? 'yes' : 'no'}，canonical=${site.primary.canonical ?? 'none'}，noindex=${site.primary.noindex ? 'yes' : 'no'}`);
    longLines.push(`- AdSense script：${site.primary.hasAdsense ? 'detected' : 'not detected'}（expect=${site.expectations.expectAdsense}）`);
    longLines.push(`- GA4/gtag：${site.primary.hasAnalytics ? 'detected' : 'not detected'}（expect=${site.expectations.expectAnalytics}）`);
    longLines.push(`- ads.txt：HTTP ${site.adsTxt.status}（expect=${site.expectations.expectAdsTxt}）${site.adsTxt.hasGoogleSeller ? ' / google seller detected' : ''}`);
    longLines.push(`- robots.txt：HTTP ${site.robots.status}，Sitemap=${site.robots.hasSitemap ? 'yes' : 'no'}`);
    longLines.push(`- sitemap：${site.sitemap.url}｜HTTP ${site.sitemap.status}｜index=${site.sitemap.isIndex ? 'yes' : 'no'}｜URLs=${site.sitemap.urlCount}`);
    longLines.push(`- Source main：${site.sourceIdentity?.mainSha ?? '?'}（${site.sourceIdentity?.state ?? 'UNKNOWN'}）｜committedAt=${site.sourceIdentity?.committedAt ?? '?'}`);
    longLines.push(`- Deployment provider：${site.deploymentIdentity?.provider ?? '?'}｜Evidence=${site.deploymentIdentity?.evidence ?? 'UNKNOWN'}｜Source SHA=${site.deploymentIdentity?.sourceSha ?? '?'}｜Deployment SHA=${site.deploymentIdentity?.deploymentSha ?? '?'}｜Freshness=${site.deploymentIdentity?.freshness?.state ?? 'UNKNOWN'}｜Provider state=${site.deploymentIdentity?.providerState ?? '?'}｜Deployment time=${site.deploymentIdentity?.deploymentCreatedAt ?? '?'}`);
    if (site.deploymentIdentity?.provider === 'cloudflare-pages' && site.deploymentIdentity?.providerApi !== 'VERIFIED') {
      longLines.push(`- Cloudflare provider API：${site.deploymentIdentity?.providerApi ?? 'UNKNOWN'}｜workflow deploy evidence=${site.deploymentIdentity?.workflowFallback?.evidence ?? 'UNKNOWN'}`);
    }
    if (site.deploymentIdentity?.provider === 'github-pages' && site.deploymentIdentity?.providerApi !== 'VERIFIED' && site.deploymentIdentity?.workflowFallback?.evidence === 'PARTIAL') {
      longLines.push(`- GitHub Pages provider API：${site.deploymentIdentity?.providerApi ?? 'UNKNOWN'}｜workflow fallback=PARTIAL`);
    }
    if (site.deploymentIdentity?.freshness?.state === 'CURRENT_FOR_SCOPE') {
      longLines.push('- WorthCalc repo main較新，但 deployment scope內沒有需要重新部署的變更。');
    }
    longLines.push(`- Evidence：liveHttp=${site.evidence?.liveHttp ?? 'UNKNOWN'}｜sourceIdentity=${site.evidence?.sourceIdentity ?? 'UNKNOWN'}｜deploymentIdentity=${site.evidence?.deploymentIdentity ?? 'UNKNOWN'}｜serviceHealth=${site.evidence?.serviceHealth ?? 'NOT_APPLICABLE'}｜contractProbes=${site.evidence?.contractProbes ?? 'NOT_APPLICABLE'}`);
    for (const service of site.services ?? []) {
      longLines.push(`- Service ${service.id}：HTTP ${service.status}｜ok=${service.jsonOk ?? 'unknown'}｜version=${service.version ?? '?'}｜revision=${service.revision ?? '?'}`);
    }
    for (const probe of site.contractProbes ?? []) {
      longLines.push(`- Contract ${probe.id}：HTTP ${probe.status}｜noindex=${probe.noindex ? 'yes' : 'no'}｜analytics=${probe.analytics ? 'yes' : 'no'}｜adsense=${probe.adsense ? 'yes' : 'no'}｜forbidden=${probe.forbiddenPatternCount}｜${probe.issues.length ? 'FAIL' : 'PASS'}`);
    }
    longLines.push('');
    longLines.push('| 頁面 | 來源 | HTTP | layer | ms | noindex 分類 | title | canonical |');
    longLines.push('|------|------|------|-------|----|--------------|-------|-----------|');
    for (const sample of site.samples) {
      longLines.push(`| ${sample.url} | ${sample.source} | ${sample.status} | ${sample.layer} | ${sample.ms} | ${sample.noindexClass ?? 'indexable'} | ${sample.title ? 'yes' : 'no'} | ${sample.canonical ?? 'none'} |`);
    }
    longLines.push('');
  }

  longLines.push('## Known baselines / accepted debt', '');
  for (const baseline of snapshot.knownBaselines ?? []) {
    longLines.push(`- \`${baseline.id}\`｜site=${baseline.site}｜state=${baseline.state}｜severity=${baseline.severity}｜${baseline.description}`);
  }
  longLines.push('');

  longLines.push('## 網路層診斷', '');
  const networkIssues = issues.filter((issue) => issue.code.endsWith('network_suspect'));
  if (networkIssues.length === 0) {
    longLines.push('本次沒有連線層失敗。HTTP 錯誤與站內 SEO 問題已分開列示。', '');
  } else {
    for (const issue of networkIssues) {
      longLines.push(`- \`${issue.code}\` ${issue.message}`);
    }
    longLines.push('');
  }

  longLines.push('## AdSense 帳戶', '');
  if (!snapshot.adsense) {
    longLines.push('本次未取得 AdSense 資料（未設定或檢查失敗，詳見上方問題清單）。', '');
  } else {
    const ad = snapshot.adsense;
    longLines.push(`- 帳戶：${ad.account?.displayName ?? ad.account?.name}（${ad.account?.state ?? '狀態未知'}）`, '');
    longLines.push('| 網站 | 狀態 | 自動廣告 |', '| --- | --- | --- |');
    for (const site of ad.sites ?? []) {
      longLines.push(`| ${site.domain ?? site.name} | ${site.state ?? '?'} | ${site.autoAdsEnabled ? '開啟' : '關閉'} |`);
    }
    longLines.push('');
    longLines.push(`- 帳戶警示：${(ad.alerts ?? []).length} 則｜政策問題：${(ad.policyIssues ?? []).length} 項`, '');
  }

  longLines.push('## 本機 repo 明細', '');
  longLines.push('```json', JSON.stringify(snapshot.local, null, 2), '```', '');
  longLines.push(`> 本報告由 D:\\funnytools\\health-check.mjs 於 ${snapshot.generatedAt} 自動產生。`);
  writeFileSync(join(longDir, `${date}.md`), longLines.join('\n'), 'utf8');

  const healthDir = ensureDir(join(dataDir, 'health'));
  ensureDir(join(healthDir, 'history'));
  writeFileSync(join(healthDir, 'latest-status.json'), `${JSON.stringify(snapshot, null, 2)}\n`, 'utf8');
  writeFileSync(join(healthDir, 'history', `${date}.json`), `${JSON.stringify(snapshot, null, 2)}\n`, 'utf8');
  return { status, critical: critical.length, warning: warning.length, info: info.length };
}

/**
 * Reads AdSense account health via scripts/adsense-status.mjs.
 *
 * Runs it as a child process rather than importing it: the CLI path is the one
 * that has actually been exercised against the live API, and a crash or a hang
 * in it must not be able to take down the whole daily health check. Its exit
 * codes carry the meaning — 0 ran, 2 setup not done, anything else broken.
 *
 * Silence is not an option for a broken checker (CLAUDE.md 紅線第 6 條), so a
 * failure here becomes a visible warning rather than a skipped section.
 */
function checkAdsense() {
  const account = { id: 'adsense' };
  let raw;
  try {
    raw = execFileSync(process.execPath, [join(rootDir, 'scripts', 'adsense-status.mjs'), '--json'], {
      encoding: 'utf8',
      timeout: 60_000,
      stdio: ['ignore', 'pipe', 'pipe'],
    });
  } catch (error) {
    if (error.status === 2) {
      // Not an error: the one-time OAuth grant has not been done on this machine.
      addIssue(account, 'info', 'not-configured', `AdSense 狀態檢查未啟用：${(error.stderr ?? '').trim() || '缺少憑證'}`);
      return null;
    }
    addIssue(account, 'warning', 'checker-failed',
      `AdSense 狀態檢查失敗（exit ${error.status ?? '?'}）：${(error.stderr ?? error.message ?? '').trim().slice(0, 300)}`);
    return null;
  }

  let status;
  try {
    status = JSON.parse(raw);
  } catch {
    addIssue(account, 'warning', 'checker-unparsable', 'AdSense 狀態檢查輸出無法解析為 JSON');
    return null;
  }

  // Map AdSense domains back onto configured site ids so a policy issue lands on
  // the site it belongs to; sites AdSense knows about but this check does not
  // (familyboard) still surface, keyed by their domain.
  const byDomain = new Map();
  for (const site of sites) {
    try { byDomain.set(new URL(site.baseUrl).hostname.replace(/^www\./, ''), site); } catch { /* ignore */ }
  }
  const siteFor = (domain) => byDomain.get(String(domain ?? '').replace(/^www\./, '')) ?? { id: domain || 'adsense' };

  for (const issue of status.policyIssues ?? []) {
    const topics = (issue.policyTopics ?? []).map((t) => t.topic ?? t.type).filter(Boolean).join('、');
    addIssue(siteFor(issue.site ?? issue.uri), 'critical', 'adsense-policy',
      `AdSense 政策問題（${issue.action ?? '未指明處置'}）${issue.uri ? ` 於 ${issue.uri}` : ''}${topics ? `：${topics}` : ''}`);
  }

  for (const alert of status.alerts ?? []) {
    // Only SEVERE is actionable. Google keeps standing WARNING advisories on
    // every publisher account (the Ukraine content policy notice, for one), and
    // promoting those to daily issues would train everyone to ignore the report.
    if (alert.severity !== 'SEVERE') continue;
    addIssue(account, 'warning', 'adsense-alert', `AdSense 嚴重警示：${alert.message ?? alert.type ?? alert.name}`);
  }

  for (const site of status.sites ?? []) {
    if (site.state === 'NEEDS_ATTENTION') {
      addIssue(siteFor(site.domain), 'warning', 'adsense-site-state',
        `AdSense 網站狀態為 NEEDS_ATTENTION：${site.domain}`);
    }
  }

  return status;
}

async function main() {
  const date = todayStr();
  console.log(`[health-check] starting ${date} for ${sites.length} sites`);
  const local = checkLocalRepo();
  const siteResults = [];
  for (const site of sites) {
    if (!site.id || !site.baseUrl) throw new Error(`Invalid site config: ${JSON.stringify(site)}`);
    console.log(`[health-check] checking ${site.id} ${site.baseUrl}`);
    siteResults.push(await checkSite(site));
  }

  console.log('[health-check] checking AdSense account status');
  const adsense = checkAdsense();

  const snapshot = {
    schemaVersion: 4,
    date,
    generatedAt: new Date().toISOString(),
    issues,
    local,
    sites: siteResults,
    adsense,
    knownBaselines,
  };
  const { dataDir } = reportingDirs();
  const diff = diffWithPrevious(snapshot, dataDir);
  snapshot.diff = diff;
  for (const site of siteResults) site.status = siteStatus(site.id);
  const summary = writeReports(snapshot, diff);

  console.log(`[health-check] status=${summary.status} critical=${summary.critical} warning=${summary.warning} info=${summary.info}`);
  for (const site of siteResults) {
    const status = site.status.critical || site.status.warning ? 'ISSUES' : 'OK';
    console.log(`[health-check] ${site.id}: ${status}; home=${site.home.status}/${site.home.layer}; primary=${site.primary.status}/${site.primary.layer}; sitemapUrls=${site.sitemap.urlCount}; samples=${site.samples.length}`);
  }
}

await main();
