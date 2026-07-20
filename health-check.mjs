// Fable Company three-site daily health check.
// Writes backward-compatible short/long reports for fable-daily-review.
import {
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from 'node:fs';
import { dirname, join } from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const rootDir = dirname(fileURLToPath(import.meta.url));
const configPath = join(rootDir, 'config', 'company.json');
const config = JSON.parse(readFileSync(configPath, 'utf8'));
const hc = config.healthCheck ?? {};
const sites = normalizeSites(config);
const issues = [];

function normalizeSites(rawConfig) {
  if (Array.isArray(rawConfig.sites) && rawConfig.sites.length > 0) {
    return rawConfig.sites.map((site) => ({
      ...site,
      baseUrl: String(site.baseUrl ?? site.domain ?? '').replace(/\/+$/, ''),
      primaryPath: site.primaryPath ?? '/',
      sitemapPath: site.sitemapPath ?? '/sitemap.xml',
      samplePageCount: Number(site.samplePageCount ?? site.sitemapSampleCount ?? rawConfig.healthCheck?.sitemapSampleCount ?? 6),
      sampleUrls: site.sampleUrls ?? ['/'],
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
      localRepo: rawConfig.site.localRepo,
      primaryPath: '/',
      sitemapPath: '/sitemap.xml',
      samplePageCount: Number(rawConfig.healthCheck?.sitemapSampleCount ?? 6),
      sampleUrls: rawConfig.healthCheck?.sampleUrls ?? ['/'],
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
    'user-agent': hc.userAgent ?? 'FableCompany-HealthCheck/2.0',
    accept: 'text/html,application/xhtml+xml,application/xml,text/xml,text/plain;q=0.9,*/*;q=0.8',
  };
}

function networkErrorKind(error) {
  if (error?.name === 'TimeoutError' || /timeout|aborted/i.test(error?.message ?? '')) return 'timeout';
  if (/ENOTFOUND|EAI_AGAIN|DNS|fetch failed|getaddrinfo/i.test(error?.message ?? '')) return 'dns_or_connectivity';
  if (/ECONNRESET|ECONNREFUSED|ETIMEDOUT|socket|network/i.test(error?.message ?? '')) return 'connection';
  return 'network';
}

async function fetchText(url, label) {
  const attempts = [];
  const maxAttempts = Math.max(1, Number(hc.retryAttempts ?? 3));
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    const started = Date.now();
    try {
      const response = await fetch(url, {
        redirect: 'follow',
        signal: AbortSignal.timeout(Number(hc.timeoutMs ?? 15000)),
        headers: requestHeaders(),
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
  if (!existsSync(previousPath)) return { hasPrevious: false };
  try {
    const previous = JSON.parse(readFileSync(previousPath, 'utf8'));
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
    }
    const prevCodes = new Set((previous.issues ?? []).map((issue) => `${issue.code}:${issue.message}`));
    const currentCodes = new Set(snapshot.issues.map((issue) => `${issue.code}:${issue.message}`));
    return {
      hasPrevious: true,
      previousDate: previous.date,
      newIssues: snapshot.issues.filter((issue) => !prevCodes.has(`${issue.code}:${issue.message}`)),
      resolvedIssues: (previous.issues ?? []).filter((issue) => !currentCodes.has(`${issue.code}:${issue.message}`)),
      persistingIssues: snapshot.issues.filter((issue) => prevCodes.has(`${issue.code}:${issue.message}`)),
    };
  } catch (error) {
    return { hasPrevious: false, error: error.message };
  }
}

function writeReports(snapshot, diff) {
  const date = snapshot.date;
  const vaultDir = config.reporting?.vaultDir ?? join(rootDir, 'reports', 'vault');
  const dataDir = config.reporting?.dataDir ?? join(rootDir, 'reports', 'data');
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
    '## 三站摘要',
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
    `# 每日健康長報告 ${date} — funnytools / roomfeng / worthcalc`,
    '',
    `- 狀態：${icon} ${status}（🔴 ${critical.length}／🟡 ${warning.length}／ℹ️ ${info.length}）`,
    `- 網站：${snapshot.sites.map((site) => site.baseUrl).join('、')}`,
    `- 本機版本（${snapshot.local.site}）：v${snapshot.local.version ?? '?'}｜branch: ${snapshot.local.branch ?? '?'}｜未 commit 檔案：${snapshot.local.uncommittedFiles ?? '?'}`,
    `- 最後 commit：${snapshot.local.lastCommit ?? '?'}`,
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
    longLines.push('');
  }

  longLines.push('## 三站深檢明細', '');
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
    longLines.push('');
    longLines.push('| 頁面 | 來源 | HTTP | layer | ms | noindex 分類 | title | canonical |');
    longLines.push('|------|------|------|-------|----|--------------|-------|-----------|');
    for (const sample of site.samples) {
      longLines.push(`| ${sample.url} | ${sample.source} | ${sample.status} | ${sample.layer} | ${sample.ms} | ${sample.noindexClass ?? 'indexable'} | ${sample.title ? 'yes' : 'no'} | ${sample.canonical ?? 'none'} |`);
    }
    longLines.push('');
  }

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

  const snapshot = {
    date,
    generatedAt: new Date().toISOString(),
    issues,
    local,
    sites: siteResults,
  };
  const dataDir = config.reporting?.dataDir ?? join(rootDir, 'reports', 'data');
  const diff = diffWithPrevious(snapshot, dataDir);
  for (const site of siteResults) site.status = siteStatus(site.id);
  const summary = writeReports(snapshot, diff);

  console.log(`[health-check] status=${summary.status} critical=${summary.critical} warning=${summary.warning} info=${summary.info}`);
  for (const site of siteResults) {
    const status = site.status.critical || site.status.warning ? 'ISSUES' : 'OK';
    console.log(`[health-check] ${site.id}: ${status}; home=${site.home.status}/${site.home.layer}; primary=${site.primary.status}/${site.primary.layer}; sitemapUrls=${site.sitemap.urlCount}; samples=${site.samples.length}`);
  }
}

await main();
