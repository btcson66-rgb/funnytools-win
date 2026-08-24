// 拉三站 GA4「開站至今」累積 pageviews / users，寫入
//   src/data/site-stats.json   （build 時由 Footer 內嵌，須 commit）
//   public/data/site-stats.json（部署後供 roomfeng/worthcalc 跨站 fetch）
// 規則：API 抓不到 → 保留上次真實快照並警告，絕不估算填充（公司紅線 #1）。
// 失敗一律 exit 0，不阻擋 release；全部站點都抓不到且無舊檔時不寫檔。
//
// 2026-08-24 兩處修正：
//
// 1. 憑證：原本只用 ga4-service-account.json，三站一律回
//    `runReport 403: User does not have sufficient permissions for this property`，
//    於是每次 release 都沿用舊快照，頁尾計數器停在 2026-08-05 近三週。
//    公司其他腳本早已改用 zxc851558 的 user OAuth（見 D:\Fable company\scripts\lib\google-auth.mjs
//    檔頭：服務帳號加不進這些資源是死巷）。這裡改成同一把憑證優先，服務帳號留作 fallback。
//
// 2. funnytools 的資源換過：舊資源 542426131 綁在已鎖死的 btcson66，2026-08-16 起改用
//    550070457，新資源只有 08-16 之後的資料。直接讀新資源會讓「累積瀏覽」從 7,742 掉到 282，
//    那不是比較誠實，是把真實發生過的歷史丟掉。所以改成
//    「凍結的舊資源實測值 + 新資源即時累積」，兩邊都是真的量到的數字，
//    並在輸出裡完整揭露組成與缺口。缺口只會讓數字低估，不會高估。
import { createSign } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const secretDir = join(root, 'api token');
const srcOut = join(root, 'src', 'data', 'site-stats.json');
const publicOut = join(root, 'public', 'data', 'site-stats.json');

const OAUTH_CLIENT_PATH = join(secretDir, 'fable-ops-oauth-client.json');
const OAUTH_TOKEN_PATH = join(secretDir, 'fable-ops-token.json');
const SERVICE_ACCOUNT_PATH = join(secretDir, 'ga4-service-account.json');
const GA4_SCOPE = 'https://www.googleapis.com/auth/analytics.readonly';

// funnytools 舊 GA4 資源 542426131 的最後一次實測值。該資源隨 btcson66 帳號鎖死，
// 已無法再查詢，所以這個數字只會凍結在這裡，不會再更新。
// 2026-08-06 ~ 08-15 這段沒有任何一邊涵蓋（舊資源讀不到、新資源還沒開始收），
// 因此 funnytools 的累積數字是低估的。
const LEGACY = {
  'funnytools.win': {
    pageviews: 7742,
    users: 2852,
    throughDate: '2026-08-05',
    property: '542426131',
    note: '舊資源最後實測值；資源隨 btcson66 鎖死無法再查。2026-08-06~08-15 未計入，故本站累積為低估。',
  },
};

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

const base64Url = (value) => Buffer.from(value).toString('base64url');

// zxc851558 的 user OAuth。三站 GA4 都是管理員，一把憑證覆蓋所有讀取權。
async function getUserAccessToken() {
  const { installed, web } = JSON.parse(readFileSync(OAUTH_CLIENT_PATH, 'utf8'));
  const client = installed ?? web;
  const { refresh_token: refreshToken } = JSON.parse(readFileSync(OAUTH_TOKEN_PATH, 'utf8'));
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: client.client_id,
      client_secret: client.client_secret,
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
  });
  const body = await response.json();
  if (!body.access_token) throw new Error(`user OAuth refresh failed: ${JSON.stringify(body)}`);
  return body.access_token;
}

async function getServiceAccountAccessToken() {
  const serviceAccount = JSON.parse(readFileSync(SERVICE_ACCOUNT_PATH, 'utf8'));
  const now = Math.floor(Date.now() / 1000);
  const header = base64Url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claims = base64Url(JSON.stringify({
    iss: serviceAccount.client_email,
    scope: GA4_SCOPE,
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
  if (!body.access_token) throw new Error(`service account token request failed: ${response.status}`);
  return body.access_token;
}

async function getAccessToken() {
  if (existsSync(OAUTH_CLIENT_PATH) && existsSync(OAUTH_TOKEN_PATH)) {
    try {
      return { token: await getUserAccessToken(), via: 'user-oauth' };
    } catch (error) {
      console.warn(`[site-stats] user OAuth unavailable (${error.message}); falling back to service account`);
    }
  }
  return { token: await getServiceAccountAccessToken(), via: 'service-account' };
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

// 舊資源的凍結值 + 新資源的即時累積。兩邊都是實測，沒有任何推算。
// users 相加無法跨資源去重（同一個人在兩段期間都來過會被算兩次），
// 這一點寫進輸出，不藏起來。
function combineWithLegacy(site, current, propertyId) {
  const legacy = LEGACY[site];
  const entry = {
    pageviews: current.pageviews,
    users: current.users,
    asOf: localDate(),
    property: propertyId,
  };
  if (!legacy) return entry;
  return {
    pageviews: legacy.pageviews + current.pageviews,
    users: legacy.users + current.users,
    asOf: localDate(),
    composition: {
      legacy,
      current: { ...current, property: propertyId },
      caveat: 'pageviews 為兩段實測相加；users 無法跨資源去重，可能重複計算同一人，屬上限值。',
    },
  };
}

const previous = loadPrevious();
let stats;
try {
  const { token: accessToken, via } = await getAccessToken();
  const sites = {};
  let fetched = 0;
  for (const { site, config } of SITES) {
    try {
      const cfg = JSON.parse(readFileSync(join(secretDir, config), 'utf8'));
      const propertyId = String(cfg.property_id || '').replace(/^properties\//, '');
      if (!/^\d+$/.test(propertyId)) throw new Error(`missing property_id in ${config}`);
      sites[site] = combineWithLegacy(site, await fetchTotals(accessToken, propertyId), propertyId);
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
  console.log(`[site-stats] credential: ${via}; ${fetched}/${SITES.length} sites fetched live`);
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
