import { createSign } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const secretDir = join(root, 'api token');
const reportDir = join(root, 'reports', 'analytics');
const serviceAccount = JSON.parse(readFileSync(join(secretDir, 'ga4-service-account.json'), 'utf8'));
const analyticsConfig = JSON.parse(readFileSync(join(secretDir, 'ga4-config.json'), 'utf8'));
const cloudflareConfigText = readFileSync(join(secretDir, 'cloudflare api.txt'), 'utf8');
const cloudflareConfig = Object.fromEntries(
  cloudflareConfigText
    .split(/\r?\n/)
    .map((line) => line.match(/^\s*(token|zone_id|account_id)\s*=\s*(.+?)\s*$/))
    .filter(Boolean)
    .map((match) => [match[1], match[2]]),
);

const propertyId = String(analyticsConfig.property_id || '').replace(/^properties\//, '');
if (!/^\d+$/.test(propertyId)) throw new Error('api token/ga4-config.json must contain a numeric property_id.');
if (!cloudflareConfig.token || !cloudflareConfig.zone_id) throw new Error('Cloudflare token or zone_id is missing.');

const base64Url = (value) => Buffer.from(value).toString('base64url');
const nowSeconds = Math.floor(Date.now() / 1000);
const jwtHeader = base64Url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
const jwtClaims = base64Url(JSON.stringify({
  iss: serviceAccount.client_email,
  scope: 'https://www.googleapis.com/auth/analytics.readonly https://www.googleapis.com/auth/webmasters.readonly',
  aud: serviceAccount.token_uri,
  iat: nowSeconds,
  exp: nowSeconds + 3600,
}));
const signer = createSign('RSA-SHA256');
signer.update(`${jwtHeader}.${jwtClaims}`);
signer.end();
const assertion = `${jwtHeader}.${jwtClaims}.${signer.sign(serviceAccount.private_key, 'base64url')}`;

async function jsonRequest(url, options = {}) {
  const response = await fetch(url, options);
  const text = await response.text();
  let body;
  try { body = text ? JSON.parse(text) : {}; } catch { body = { raw: text.slice(0, 500) }; }
  if (!response.ok) {
    const error = new Error(`${response.status} ${response.statusText}`);
    error.status = response.status;
    error.body = body;
    throw error;
  }
  return body;
}

const tokenResponse = await jsonRequest(serviceAccount.token_uri, {
  method: 'POST',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({
    grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
    assertion,
  }),
});
const googleHeaders = {
  authorization: `Bearer ${tokenResponse.access_token}`,
  'content-type': 'application/json',
};

const ga4Property = await jsonRequest(
  `https://analyticsadmin.googleapis.com/v1beta/properties/${propertyId}`,
  { headers: googleHeaders },
);
const ga4Streams = await jsonRequest(
  `https://analyticsadmin.googleapis.com/v1beta/properties/${propertyId}/dataStreams`,
  { headers: googleHeaders },
);
const ga4WebStream = ga4Streams.dataStreams?.find(({ type }) => type === 'WEB_DATA_STREAM');

function rows(report) {
  const dimensions = report.dimensionHeaders?.map(({ name }) => name) || [];
  const metrics = report.metricHeaders?.map(({ name }) => name) || [];
  return (report.rows || []).map((row) => Object.fromEntries([
    ...dimensions.map((name, index) => [name, row.dimensionValues[index]?.value || '']),
    ...metrics.map((name, index) => [name, Number(row.metricValues[index]?.value || 0)]),
  ]));
}

async function ga4Report(dimensions, metrics, limit = 100, orderBys = []) {
  const response = await jsonRequest(
    `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
    {
      method: 'POST',
      headers: googleHeaders,
      body: JSON.stringify({
        dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
        dimensions: dimensions.map((name) => ({ name })),
        metrics: metrics.map((name) => ({ name })),
        limit,
        orderBys,
      }),
    },
  );
  return { rows: rows(response), metadata: response.metadata || {}, rowCount: response.rowCount || 0 };
}

const ga4 = {};
const ga4Errors = {};
const ga4Queries = {
  daily: [['date'], ['activeUsers', 'newUsers', 'sessions', 'engagedSessions', 'screenPageViews', 'eventCount', 'userEngagementDuration'], 14, [{ dimension: { dimensionName: 'date' } }]],
  pages: [['pagePath'], ['screenPageViews', 'activeUsers', 'eventCount', 'userEngagementDuration'], 30, [{ metric: { metricName: 'screenPageViews' }, desc: true }]],
  sources: [['sessionSourceMedium'], ['sessions', 'activeUsers', 'engagedSessions'], 30, [{ metric: { metricName: 'sessions' }, desc: true }]],
  events: [['eventName'], ['eventCount', 'totalUsers'], 100, [{ metric: { metricName: 'eventCount' }, desc: true }]],
  countries: [['country'], ['activeUsers', 'sessions'], 20, [{ metric: { metricName: 'activeUsers' }, desc: true }]],
  devices: [['deviceCategory'], ['activeUsers', 'sessions', 'engagedSessions'], 10, [{ metric: { metricName: 'activeUsers' }, desc: true }]],
  hours: [['hour'], ['activeUsers', 'sessions', 'screenPageViews'], 24, [{ dimension: { dimensionName: 'hour' } }]],
};
for (const [name, args] of Object.entries(ga4Queries)) {
  try { ga4[name] = await ga4Report(...args); }
  catch (error) { ga4Errors[name] = { status: error.status, message: error.body?.error?.message || error.message }; }
}

let searchConsole;
try {
  const inventory = await jsonRequest('https://www.googleapis.com/webmasters/v3/sites', { headers: googleHeaders });
  const expectedSites = ['sc-domain:funnytools.win', 'https://funnytools.win/'];
  const matchedSite = inventory.siteEntry?.find(({ siteUrl }) => expectedSites.includes(siteUrl));
  if (!matchedSite) {
    searchConsole = {
      status: 'missing_property_access',
      expected: expectedSites,
      available: inventory.siteEntry || [],
    };
  } else {
    const end = new Date(Date.now() - 3 * 86400000);
    const start = new Date(end.getTime() - 27 * 86400000);
    const date = (value) => value.toISOString().slice(0, 10);
    const endpoint = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(matchedSite.siteUrl)}/searchAnalytics/query`;
    const query = async (dimensions, rowLimit = 50) => jsonRequest(endpoint, {
      method: 'POST',
      headers: googleHeaders,
      body: JSON.stringify({ startDate: date(start), endDate: date(end), dimensions, rowLimit }),
    });
    searchConsole = {
      status: 'ok',
      siteUrl: matchedSite.siteUrl,
      window: { startDate: date(start), endDate: date(end) },
      queries: (await query(['query'])).rows || [],
      pages: (await query(['page'])).rows || [],
      daily: (await query(['date'], 100)).rows || [],
    };
  }
} catch (error) {
  searchConsole = { status: 'error', httpStatus: error.status, message: error.body?.error?.message || error.message };
}

const todayUtc = new Date();
todayUtc.setUTCHours(0, 0, 0, 0);
const fromUtc = new Date(todayUtc.getTime() - 7 * 86400000);
const day = (value) => value.toISOString().slice(0, 10);
const cloudflareQuery = `query($zone:String!,$from:Date!,$to:Date!){viewer{zones(filter:{zoneTag:$zone}){httpRequests1dGroups(limit:10,filter:{date_geq:$from,date_lt:$to},orderBy:[date_ASC]){dimensions{date} sum{requests pageViews threats responseStatusMap{edgeResponseStatus requests} countryMap{clientCountryName requests}} uniq{uniques}}}}}`;
const cloudflareResponse = await jsonRequest('https://api.cloudflare.com/client/v4/graphql', {
  method: 'POST',
  headers: { authorization: `Bearer ${cloudflareConfig.token}`, 'content-type': 'application/json' },
  body: JSON.stringify({ query: cloudflareQuery, variables: { zone: cloudflareConfig.zone_id, from: day(fromUtc), to: day(todayUtc) } }),
});
if (cloudflareResponse.errors?.length) throw new Error(cloudflareResponse.errors[0].message);
const cloudflareDaily = (cloudflareResponse.data?.viewer?.zones?.[0]?.httpRequests1dGroups || []).map((entry) => ({
  date: entry.dimensions.date,
  requests: entry.sum.requests,
  pageViews: entry.sum.pageViews,
  dailyUniques: entry.uniq.uniques,
  threats: entry.sum.threats,
  status404: entry.sum.responseStatusMap?.find(({ edgeResponseStatus }) => edgeResponseStatus === 404)?.requests || 0,
  taiwanRequests: entry.sum.countryMap?.find(({ clientCountryName }) => clientCountryName === 'TW')?.requests || 0,
}));

const generatedAt = new Date();
const reportDate = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Taipei', year: 'numeric', month: '2-digit', day: '2-digit' }).format(generatedAt);
const result = {
  generatedAt: generatedAt.toISOString(),
  ga4: {
    propertyId,
    property: {
      displayName: ga4Property.displayName,
      timeZone: ga4Property.timeZone,
      currencyCode: ga4Property.currencyCode,
    },
    webStream: ga4WebStream ? {
      displayName: ga4WebStream.displayName,
      measurementId: ga4WebStream.webStreamData?.measurementId,
      defaultUri: ga4WebStream.webStreamData?.defaultUri,
    } : null,
    ...ga4,
    errors: ga4Errors,
  },
  searchConsole,
  cloudflare: { window: { from: day(fromUtc), toExclusive: day(todayUtc) }, daily: cloudflareDaily },
};

const sum = (items, key) => items.reduce((total, item) => total + Number(item[key] || 0), 0);
const daily = ga4.daily?.rows || [];
const eventRows = ga4.events?.rows || [];
const eventCount = (name) => eventRows.find((row) => row.eventName === name)?.eventCount || 0;
const ratio = (numerator, denominator) => denominator ? `${(100 * numerator / denominator).toFixed(1)}%` : 'n/a';
const sessions = sum(daily, 'sessions');
const views = sum(daily, 'screenPageViews');
const homeViews = ga4.pages?.rows?.find((row) => row.pagePath === '/')?.screenPageViews || 0;
const threadsSessions = (ga4.sources?.rows || [])
  .filter((row) => /threads/i.test(row.sessionSourceMedium))
  .reduce((total, row) => total + row.sessions, 0);
const mobileUsers = ga4.devices?.rows?.find((row) => row.deviceCategory === 'mobile')?.activeUsers || 0;
const deviceUsers = sum(ga4.devices?.rows || [], 'activeUsers');
const table = (items, columns) => [
  `| ${columns.map(([label]) => label).join(' | ')} |`,
  `| ${columns.map(() => '---').join(' | ')} |`,
  ...items.map((item) => `| ${columns.map(([, key]) => item[key] ?? '').join(' | ')} |`),
].join('\n');

const searchConsoleStatusLabels = {
  ok: '正常',
  missing_property_access: '缺少 funnytools.win 資源權限',
  error: 'API 錯誤',
};
const markdown = `# FunnyTools 網站成效分析報告\n\n產生時間：${generatedAt.toISOString()}\n\n## 資料來源狀態\n\n- GA4 資源：${propertyId}（${ga4Property.displayName}）\n- GA4 網頁串流：${ga4WebStream?.displayName || '缺少'} / ${ga4WebStream?.webStreamData?.measurementId || '缺少'} / ${ga4WebStream?.webStreamData?.defaultUri || '缺少'}\n- GA4 時區：${ga4.daily?.metadata?.timeZone || '未知'}\n- Search Console：${searchConsoleStatusLabels[searchConsole.status] || searchConsole.status}\n- Cloudflare 資料區間：${day(fromUtc)} 至 ${day(todayUtc)}（不含結束日，UTC）\n\n## GA4 摘要\n\n- 活躍使用者：${sum(daily, 'activeUsers')}（各日加總，同一使用者跨日可能重複）\n- 工作階段：${sessions}\n- 互動工作階段：${sum(daily, 'engagedSessions')}（${ratio(sum(daily, 'engagedSessions'), sessions)}）\n- 網頁瀏覽：${views}\n- 工具開始次數：${eventCount('tool_started')}\n- 工具完成次數：${eventCount('tool_completed')}\n- 工具完成率：${ratio(eventCount('tool_completed'), eventCount('tool_started'))}\n\n## 目前判讀\n\n- 可歸因到 Threads 的工作階段為 ${threadsSessions}，約占每日工作階段加總的 ${ratio(threadsSessions, sessions)}。GA4 當日歸因資料仍可能處理中，因此此比例應視為方向性訊號。\n- 首頁瀏覽 ${homeViews} 次，占全部瀏覽約 ${ratio(homeViews, views)}。目前流量主要集中在首頁，尚未大量直接進入個別工具頁。\n- 行動裝置活躍使用者 ${mobileUsers}，約占裝置資料列使用者的 ${ratio(mobileUsers, deviceUsers)}。行動版易用性應維持最高優先。\n- 互動工作階段率只有 ${ratio(sum(daily, 'engagedSessions'), sessions)}，目前不能視為健康互動。可能原因包括 Threads 低意圖點擊、停留時間過短、機器流量或當日資料仍在處理。\n- 新增的工具漏斗事件尚未出現在標準 Data API。由於事件剛部署，應在 24–48 小時後重跑報告，再判斷是否有埋碼問題。\n- 搜尋流量目前無法完整評估：GA4 只看到 ${ga4.sources?.rows?.find((row) => row.sessionSourceMedium === 'google / organic')?.sessions || 0} 個 Google 自然搜尋工作階段，而且 service account 尚未取得 funnytools.win 的 Search Console 權限。\n\n### GA4 每日趨勢\n\n${table(daily, [['日期', 'date'], ['使用者', 'activeUsers'], ['工作階段', 'sessions'], ['互動工作階段', 'engagedSessions'], ['瀏覽', 'screenPageViews'], ['事件', 'eventCount']])}\n\n### 熱門頁面\n\n${table((ga4.pages?.rows || []).slice(0, 15), [['路徑', 'pagePath'], ['瀏覽', 'screenPageViews'], ['使用者', 'activeUsers'], ['事件', 'eventCount']])}\n\n### 流量來源\n\n${table((ga4.sources?.rows || []).slice(0, 15), [['來源／媒介', 'sessionSourceMedium'], ['工作階段', 'sessions'], ['使用者', 'activeUsers'], ['互動工作階段', 'engagedSessions']])}\n\n### GA4 事件\n\n${table(eventRows.slice(0, 25), [['事件', 'eventName'], ['次數', 'eventCount'], ['使用者', 'totalUsers']])}\n\n## Cloudflare 每日資料\n\n${table(cloudflareDaily, [['日期', 'date'], ['請求數', 'requests'], ['頁面瀏覽', 'pageViews'], ['當日獨立訪客估計', 'dailyUniques'], ['404', 'status404'], ['台灣請求', 'taiwanRequests']])}\n\n## Search Console\n\n${searchConsole.status === 'ok' ? `網站資源：${searchConsole.siteUrl}\n\n${table(searchConsole.queries.slice(0, 20).map((row) => ({ query: row.keys?.[0], clicks: row.clicks, impressions: row.impressions, ctr: ratio(row.clicks, row.impressions), position: row.position?.toFixed(1) })), [['搜尋字詞', 'query'], ['點擊', 'clicks'], ['曝光', 'impressions'], ['點閱率', 'ctr'], ['平均排名', 'position']])}` : `狀態：${searchConsoleStatusLabels[searchConsole.status] || searchConsole.status}\n\nservice account 仍需取得 funnytools.win 的 Search Console 資源權限。目前可存取的資源：${(searchConsole.available || []).map(({ siteUrl }) => siteUrl).join(', ') || '無'}。`}\n\n## 建議下一步\n\n1. 將 service account 加入 funnytools.win 的 Search Console 資源，權限設為「完整」。\n2. 24–48 小時後再次執行 \`npm.cmd run report:analytics\`，確認新工具漏斗事件。\n3. 每次推播使用獨立 UTM；目前大多數 Threads 流量被歸類為 referral，而不是預期的 social campaign。\n4. 累積七個完整日後，以完成率與錯誤率排序工具，不以瀏覽量單獨決定開發優先順序。\n5. 在互動工作階段與工具完成資料證明哪些內容能帶來實際使用前，不增加推播頻率。\n\n## 判讀限制\n\n- Cloudflare 請求包含靜態資源、機器人、掃描器與 404 雜訊，不能稱為使用者人數。\n- GA4 剛安裝不久，目前資料區間不足以構成長期基準。\n- GA4 每日活躍使用者不能直接相加當成整段期間的不重複使用者。\n- GA4 當日資料仍在處理時，不同歸因維度的總數可能暫時不一致。\n- 未來開發排序應以工具開始、完成與錯誤資料為主，而不是只看頁面瀏覽。\n`;

mkdirSync(reportDir, { recursive: true });
const jsonPath = join(reportDir, `${reportDate}.json`);
const markdownPath = join(reportDir, `${reportDate}.md`);
writeFileSync(jsonPath, `${JSON.stringify(result, null, 2)}\n`, 'utf8');
writeFileSync(markdownPath, markdown, 'utf8');
console.log(JSON.stringify({ jsonPath, markdownPath, ga4Rows: daily.length, searchConsoleStatus: searchConsole.status, cloudflareRows: cloudflareDaily.length }));
