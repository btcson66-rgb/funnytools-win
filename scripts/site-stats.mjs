// 拉三站 GA4「開站至今」累積 pageviews / users，寫入
//   src/data/site-stats.json   （build 時由 Footer 內嵌，須 commit）
//   public/data/site-stats.json（部署後供 roomfeng/worthcalc 跨站 fetch）
// 規則：API 抓不到 → 保留上次真實快照並警告，絕不估算填充（公司紅線 #1）。
// 失敗一律 exit 0，不阻擋 release；全部站點都抓不到且無舊檔時不寫檔。
import { createSign } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const secretDir = join(root, 'api token');
const srcOut = join(root, 'src', 'data', 'site-stats.json');
const publicOut = join(root, 'public', 'data', 'site-stats.json');

const SITES = [
  { site: 'funnytools.win', config: 'ga4-config.json' },
  { site: 'roomfeng.win', config: 'roomfeng-ga4-config.json' },
  { site: 'worthcalc.win', config: 'worthcalc-ga4-config.json' },
];

function localDate() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

function loadPrevious() {
  try {
    return JSON.parse(readFileSync(srcOut, 'utf8'));
  } catch {
    return null;
  }
}

async function getAccessToken(serviceAccount) {
  const base64Url = (value) => Buffer.from(value).toString('base64url');
  const now = Math.floor(Date.now() / 1000);
  const header = base64Url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claims = base64Url(JSON.stringify({
    iss: serviceAccount.client_email,
    scope: 'https://www.googleapis.com/auth/analytics.readonly',
    aud: serviceAccount.token_uri,
    iat: now,
    exp: now + 3600,
  }));
  const signer = createSign('RSA-SHA256');
  signer.update(`${header}.${claims}`);
  signer.end();
  const assertion = `${header}.${claims}.${signer.sign(serviceAccount.private_key, 'base64url')}`;
  const response = await fetch(serviceAccount.token_uri, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion }),
  });
  const body = await response.json();
  if (!body.access_token) throw new Error(`token request failed: ${response.status}`);
  return body.access_token;
}

async function fetchTotals(accessToken, propertyId) {
  const response = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`, {
    method: 'POST',
    headers: { authorization: `Bearer ${accessToken}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      dateRanges: [{ startDate: '2020-01-01', endDate: 'today' }],
      metrics: [{ name: 'screenPageViews' }, { name: 'totalUsers' }],
    }),
  });
  const body = await response.json();
  if (!response.ok) throw new Error(`runReport ${response.status}: ${body.error?.message ?? ''}`);
  const values = body.rows?.[0]?.metricValues ?? [];
  const pageviews = Number(values[0]?.value);
  const users = Number(values[1]?.value);
  if (!Number.isFinite(pageviews) || !Number.isFinite(users)) throw new Error('runReport returned no metric rows');
  return { pageviews, users };
}

const previous = loadPrevious();
let stats;
try {
  const serviceAccount = JSON.parse(readFileSync(join(secretDir, 'ga4-service-account.json'), 'utf8'));
  const accessToken = await getAccessToken(serviceAccount);
  const sites = {};
  let fetched = 0;
  for (const { site, config } of SITES) {
    try {
      const cfg = JSON.parse(readFileSync(join(secretDir, config), 'utf8'));
      const propertyId = String(cfg.property_id || '').replace(/^properties\//, '');
      if (!/^\d+$/.test(propertyId)) throw new Error(`missing property_id in ${config}`);
      sites[site] = { ...(await fetchTotals(accessToken, propertyId)), asOf: localDate() };
      fetched += 1;
    } catch (error) {
      const prev = previous?.sites?.[site];
      if (prev) {
        sites[site] = prev;
        console.warn(`[site-stats] ${site}: fetch failed (${error.message}); keeping previous snapshot from ${prev.asOf}`);
      } else {
        console.warn(`[site-stats] ${site}: fetch failed (${error.message}); no previous data, site omitted`);
      }
    }
  }
  if (fetched === 0 && !previous) {
    console.warn('[site-stats] no data fetched and no previous snapshot; nothing written');
    process.exit(0);
  }
  stats = { generated: localDate(), sites };
} catch (error) {
  if (previous) {
    console.warn(`[site-stats] GA4 unreachable (${error.message}); keeping previous snapshot as-is`);
    process.exit(0);
  }
  console.warn(`[site-stats] GA4 unreachable (${error.message}); no previous snapshot, nothing written`);
  process.exit(0);
}

const json = `${JSON.stringify(stats, null, 2)}\n`;
mkdirSync(dirname(srcOut), { recursive: true });
mkdirSync(dirname(publicOut), { recursive: true });
writeFileSync(srcOut, json);
writeFileSync(publicOut, json);
console.log(`[site-stats] updated: ${Object.entries(stats.sites).map(([site, v]) => `${site}=${v.pageviews}pv/${v.users}u`).join(' ')}`);
