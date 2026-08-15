import { config } from './config.mjs';
import { jsonRequest } from './http.mjs';
import { info, error as logError } from './logger.mjs';

function parseRows(report) {
  const dims = report.dimensionHeaders?.map((h) => h.name) || [];
  const mets = report.metricHeaders?.map((h) => h.name) || [];
  return (report.rows || []).map((row) => Object.fromEntries([
    ...dims.map((n, i) => [n, row.dimensionValues[i]?.value || '']),
    ...mets.map((n, i) => [n, Number(row.metricValues[i]?.value || 0)]),
  ]));
}

async function runReport(token, dateRanges, dimensions, metrics, limit = 100, orderBys = []) {
  const url = `https://analyticsdata.googleapis.com/v1beta/properties/${config.ga4PropertyId}:runReport`;
  const resp = await jsonRequest(url, {
    method: 'POST',
    headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      dateRanges,
      dimensions: dimensions.map((n) => ({ name: n })),
      metrics: metrics.map((n) => ({ name: n })),
      limit,
      orderBys,
    }),
  });
  return parseRows(resp);
}

function dateStr(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function taipeiToday(now) {
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
  const taipeiMs = utcMs + 8 * 3600000;
  const tp = new Date(taipeiMs);
  return new Date(tp.getFullYear(), tp.getMonth(), tp.getDate());
}

function buildDateRanges(now) {
  const today = taipeiToday(now);

  const yesterday = new Date(today); yesterday.setDate(today.getDate() - 1);
  const dayBefore = new Date(today); dayBefore.setDate(today.getDate() - 2);

  const last7Start = new Date(today); last7Start.setDate(today.getDate() - 7);
  const prev7Start = new Date(today); prev7Start.setDate(today.getDate() - 14);
  const prev7End = new Date(today); prev7End.setDate(today.getDate() - 8);

  const last28Start = new Date(today); last28Start.setDate(today.getDate() - 28);
  const prev28Start = new Date(today); prev28Start.setDate(today.getDate() - 56);
  const prev28End = new Date(today); prev28End.setDate(today.getDate() - 29);

  return {
    yesterday: { startDate: dateStr(yesterday), endDate: dateStr(yesterday) },
    dayBefore: { startDate: dateStr(dayBefore), endDate: dateStr(dayBefore) },
    last7: { startDate: dateStr(last7Start), endDate: dateStr(yesterday) },
    prev7: { startDate: dateStr(prev7Start), endDate: dateStr(prev7End) },
    last28: { startDate: dateStr(last28Start), endDate: dateStr(yesterday) },
    prev28: { startDate: dateStr(prev28Start), endDate: dateStr(prev28End) },
  };
}

export async function collectGA4(token) {
  info('GA4: starting data collection');
  const now = new Date();
  const ranges = buildDateRanges(now);
  const result = { status: 'ok', ranges, data: {}, errors: {} };

  const coreMetrics = ['activeUsers', 'newUsers', 'sessions', 'engagedSessions',
    'engagementRate', 'averageSessionDuration', 'screenPageViews', 'eventCount'];

  const queries = [
    {
      name: 'yesterday',
      dateRanges: [
        { ...ranges.yesterday, name: 'yesterday' },
        { ...ranges.dayBefore, name: 'dayBefore' },
      ],
      dimensions: [], metrics: coreMetrics,
    },
    {
      name: 'last7',
      dateRanges: [
        { ...ranges.last7, name: 'last7' },
        { ...ranges.prev7, name: 'prev7' },
      ],
      dimensions: [], metrics: coreMetrics,
    },
    {
      name: 'last28',
      dateRanges: [
        { ...ranges.last28, name: 'last28' },
        { ...ranges.prev28, name: 'prev28' },
      ],
      dimensions: [], metrics: coreMetrics,
    },
    {
      name: 'daily',
      dateRanges: [{ ...ranges.last28 }],
      dimensions: ['date'], metrics: coreMetrics, limit: 60,
      orderBys: [{ dimension: { dimensionName: 'date' } }],
    },
    {
      name: 'topPages',
      dateRanges: [{ ...ranges.last7 }],
      dimensions: ['pagePath'],
      metrics: ['screenPageViews', 'activeUsers', 'engagedSessions', 'averageSessionDuration'],
      limit: 30,
      orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
    },
    {
      name: 'topLandingPages',
      dateRanges: [{ ...ranges.last7 }],
      dimensions: ['landingPage'],
      metrics: ['sessions', 'activeUsers', 'engagedSessions', 'averageSessionDuration'],
      limit: 30,
      orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
    },
    {
      name: 'sources',
      dateRanges: [{ ...ranges.last7 }],
      dimensions: ['sessionSourceMedium'],
      metrics: ['sessions', 'activeUsers', 'engagedSessions', 'newUsers'],
      limit: 30,
      orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
    },
    {
      name: 'firstUserSources',
      dateRanges: [{ ...ranges.last7 }],
      dimensions: ['firstUserSourceMedium'],
      metrics: ['activeUsers', 'newUsers', 'sessions'],
      limit: 20,
      orderBys: [{ metric: { metricName: 'activeUsers' }, desc: true }],
    },
    {
      name: 'devices',
      dateRanges: [{ ...ranges.last7 }],
      dimensions: ['deviceCategory'],
      metrics: ['activeUsers', 'sessions', 'engagedSessions'],
      limit: 10,
      orderBys: [{ metric: { metricName: 'activeUsers' }, desc: true }],
    },
    {
      name: 'countries',
      dateRanges: [{ ...ranges.last7 }],
      dimensions: ['country'],
      metrics: ['activeUsers', 'sessions'],
      limit: 20,
      orderBys: [{ metric: { metricName: 'activeUsers' }, desc: true }],
    },
    {
      name: 'events',
      dateRanges: [{ ...ranges.last7 }],
      dimensions: ['eventName'],
      metrics: ['eventCount', 'totalUsers'],
      limit: 50,
      orderBys: [{ metric: { metricName: 'eventCount' }, desc: true }],
    },
  ];

  for (const q of queries) {
    try {
      const rows = await runReport(token, q.dateRanges, q.dimensions, q.metrics, q.limit || 100, q.orderBys || []);
      result.data[q.name] = rows;
      info(`GA4: ${q.name} collected (${rows.length} rows)`);
    } catch (err) {
      result.errors[q.name] = { status: err.status, message: err.body?.error?.message || err.message };
      logError(`GA4: ${q.name} failed: ${err.message}`);
    }
  }

  // status 一開始是樂觀的 'ok'，過去就算每一支查詢都 403 也照樣回 ok，
  // 讓週報把「沒有資料」畫成一片 0。那等於偽造數據，必須依實際成敗收斂。
  const okCount = Object.keys(result.data).length;
  const failCount = Object.keys(result.errors).length;
  if (okCount === 0) {
    const first = Object.values(result.errors)[0];
    result.status = 'error';
    result.message = failCount
      ? `全部 ${failCount} 支 GA4 查詢失敗：${first?.status ?? ''} ${first?.message ?? ''}`.trim()
      : '沒有執行任何 GA4 查詢';
  } else if (failCount > 0) {
    result.status = 'partial';
    result.message = `${failCount}/${okCount + failCount} 支 GA4 查詢失敗`;
  }

  return result;
}
