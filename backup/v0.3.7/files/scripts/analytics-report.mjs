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

const markdown = `# FunnyTools analytics report\n\nGenerated: ${generatedAt.toISOString()}\n\n## Data status\n\n- GA4 property: ${propertyId} (${ga4Property.displayName})\n- GA4 web stream: ${ga4WebStream?.displayName || 'missing'} / ${ga4WebStream?.webStreamData?.measurementId || 'missing'} / ${ga4WebStream?.webStreamData?.defaultUri || 'missing'}\n- GA4 timezone: ${ga4.daily?.metadata?.timeZone || 'unknown'}\n- Search Console: ${searchConsole.status}\n- Cloudflare window: ${day(fromUtc)} to ${day(todayUtc)} (exclusive, UTC)\n\n## GA4 summary\n\n- Active users: ${sum(daily, 'activeUsers')} (daily sum; not deduplicated across days)\n- Sessions: ${sessions}\n- Engaged sessions: ${sum(daily, 'engagedSessions')} (${ratio(sum(daily, 'engagedSessions'), sessions)})\n- Page views: ${views}\n- Tool starts: ${eventCount('tool_started')}\n- Tool completions: ${eventCount('tool_completed')}\n- Completion rate: ${ratio(eventCount('tool_completed'), eventCount('tool_started'))}\n\n## Current findings\n\n- Threads-attributed sessions: ${threadsSessions}, approximately ${ratio(threadsSessions, sessions)} of the daily session total. Because intraday GA4 attribution tables can still be processing, treat this as directional.\n- Homepage views: ${homeViews}, or ${ratio(homeViews, views)} of all views. Current acquisition is concentrated on the homepage rather than deep tool landing pages.\n- Mobile active users: ${mobileUsers}, or ${ratio(mobileUsers, deviceUsers)} of device-row users. Mobile usability should remain the primary design constraint.\n- Engaged-session rate is only ${ratio(sum(daily, 'engagedSessions'), sessions)}. This is too low to interpret as healthy engagement and may reflect low-intent Threads clicks, very short sessions, bot-like traffic, or still-processing intraday data.\n- The new tool funnel events have not appeared in the standard Data API yet. They were deployed recently; rerun after 24-48 hours before diagnosing an implementation failure.\n- Search traffic cannot yet be evaluated: only ${ga4.sources?.rows?.find((row) => row.sessionSourceMedium === 'google / organic')?.sessions || 0} Google organic sessions are visible, and Search Console access for funnytools.win is still missing.\n\n### Daily GA4\n\n${table(daily, [['Date', 'date'], ['Users', 'activeUsers'], ['Sessions', 'sessions'], ['Engaged', 'engagedSessions'], ['Views', 'screenPageViews'], ['Events', 'eventCount']])}\n\n### Top pages\n\n${table((ga4.pages?.rows || []).slice(0, 15), [['Path', 'pagePath'], ['Views', 'screenPageViews'], ['Users', 'activeUsers'], ['Events', 'eventCount']])}\n\n### Sources\n\n${table((ga4.sources?.rows || []).slice(0, 15), [['Source / medium', 'sessionSourceMedium'], ['Sessions', 'sessions'], ['Users', 'activeUsers'], ['Engaged', 'engagedSessions']])}\n\n### Events\n\n${table(eventRows.slice(0, 25), [['Event', 'eventName'], ['Count', 'eventCount'], ['Users', 'totalUsers']])}\n\n## Cloudflare daily\n\n${table(cloudflareDaily, [['Date', 'date'], ['Requests', 'requests'], ['Page views', 'pageViews'], ['Daily uniques', 'dailyUniques'], ['404', 'status404'], ['TW requests', 'taiwanRequests']])}\n\n## Search Console\n\n${searchConsole.status === 'ok' ? `Site: ${searchConsole.siteUrl}\n\n${table(searchConsole.queries.slice(0, 20).map((row) => ({ query: row.keys?.[0], clicks: row.clicks, impressions: row.impressions, ctr: ratio(row.clicks, row.impressions), position: row.position?.toFixed(1) })), [['Query', 'query'], ['Clicks', 'clicks'], ['Impressions', 'impressions'], ['CTR', 'ctr'], ['Position', 'position']])}` : `Status: ${searchConsole.status}\n\nThe service account still needs access to the funnytools.win Search Console property. Available properties: ${(searchConsole.available || []).map(({ siteUrl }) => siteUrl).join(', ') || 'none'}.`}\n\n## Next actions\n\n1. Add the service account as a full user of the funnytools.win Search Console property.\n2. Rerun \`npm.cmd run report:analytics\` after 24-48 hours to verify the new tool funnel events.\n3. Use campaign-specific UTM parameters on every promotion; most current Threads traffic is classified as referral rather than the intended social campaign.\n4. After seven complete days, rank tools by completion rate and error rate, not page views alone.\n5. Do not increase posting frequency until engaged-session and tool-completion data show which topics produce real use.\n\n## Interpretation guardrails\n\n- Cloudflare requests include assets, bots, scanners, and 404 noise; do not call them users.\n- GA4 was installed recently, so the current window is not a stable long-term baseline.\n- GA4 daily active users are not additive unique users across the full period.\n- Intraday GA4 reports can temporarily disagree across attribution dimensions while processing.\n- Use tool starts and completions, not page views alone, to rank future product investment.\n`;

mkdirSync(reportDir, { recursive: true });
const jsonPath = join(reportDir, `${reportDate}.json`);
const markdownPath = join(reportDir, `${reportDate}.md`);
writeFileSync(jsonPath, `${JSON.stringify(result, null, 2)}\n`, 'utf8');
writeFileSync(markdownPath, markdown, 'utf8');
console.log(JSON.stringify({ jsonPath, markdownPath, ga4Rows: daily.length, searchConsoleStatus: searchConsole.status, cloudflareRows: cloudflareDaily.length }));
