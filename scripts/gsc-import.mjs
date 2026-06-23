import { existsSync, readFileSync } from 'node:fs';
import Papa from 'papaparse';

const [input] = process.argv.slice(2);

if (!input || !existsSync(input)) {
  console.error('Usage: node scripts/gsc-import.mjs path/to/gsc.csv');
  console.error('Required columns: query,page,clicks,impressions,ctr,position,date');
  process.exit(1);
}

const csv = readFileSync(input, 'utf8');
const parsed = Papa.parse(csv, {
  header: true,
  skipEmptyLines: true,
  transformHeader: (header) => header.trim().toLowerCase(),
});

if (parsed.errors.length) {
  console.error(parsed.errors.map((error) => error.message).join('\n'));
  process.exit(1);
}

const required = ['query', 'page', 'clicks', 'impressions', 'ctr', 'position', 'date'];
const missing = required.filter((column) => !parsed.meta.fields?.includes(column));
if (missing.length) {
  console.error(`Missing required columns: ${missing.join(', ')}`);
  process.exit(1);
}

function number(value) {
  const cleaned = String(value ?? '').replace('%', '').trim();
  const parsedNumber = Number(cleaned);
  return Number.isFinite(parsedNumber) ? parsedNumber : 0;
}

function ctr(value) {
  const raw = String(value ?? '').trim();
  const n = number(raw);
  if (raw.includes('%')) return n / 100;
  return n > 1 ? n / 100 : n;
}

const rows = parsed.data.map((row) => ({
  query: String(row.query ?? '').trim(),
  page: String(row.page ?? '').trim(),
  clicks: number(row.clicks),
  impressions: number(row.impressions),
  ctr: ctr(row.ctr),
  position: number(row.position),
  date: String(row.date ?? '').trim(),
})).filter((row) => row.query && row.page);

const quickWins = rows
  .filter((row) => row.position >= 4 && row.position <= 20 && row.impressions >= 50)
  .sort((a, b) => a.position - b.position || b.impressions - a.impressions)
  .slice(0, 30);

const lowCtr = rows
  .filter((row) => row.impressions >= 100 && row.ctr < 0.02 && row.position <= 15)
  .sort((a, b) => b.impressions - a.impressions)
  .slice(0, 30);

const byPage = new Map();
for (const row of rows) {
  const item = byPage.get(row.page) ?? {
    page: row.page,
    clicks: 0,
    impressions: 0,
    weightedPosition: 0,
    queries: new Set(),
  };
  item.clicks += row.clicks;
  item.impressions += row.impressions;
  item.weightedPosition += row.position * row.impressions;
  item.queries.add(row.query);
  byPage.set(row.page, item);
}

const pageOpportunities = [...byPage.values()]
  .map((item) => ({
    ...item,
    avgPosition: item.impressions ? item.weightedPosition / item.impressions : 0,
    ctr: item.impressions ? item.clicks / item.impressions : 0,
    queryCount: item.queries.size,
  }))
  .filter((item) => item.impressions >= 200)
  .sort((a, b) => b.impressions - a.impressions)
  .slice(0, 30);

function table(items, columns) {
  if (!items.length) return '_No rows matched this report._';
  const header = `| ${columns.map((column) => column.label).join(' | ')} |`;
  const divider = `| ${columns.map(() => '---').join(' | ')} |`;
  const body = items.map((item) => `| ${columns.map((column) => column.value(item)).join(' | ')} |`);
  return [header, divider, ...body].join('\n');
}

console.log(`# GSC Opportunity Report\n`);
console.log(`Rows imported: ${rows.length}\n`);
console.log('## Quick Wins\n');
console.log(table(quickWins, [
  { label: 'Query', value: (r) => r.query.replaceAll('|', '\\|') },
  { label: 'Page', value: (r) => r.page },
  { label: 'Clicks', value: (r) => r.clicks },
  { label: 'Impressions', value: (r) => r.impressions },
  { label: 'CTR', value: (r) => `${(r.ctr * 100).toFixed(2)}%` },
  { label: 'Position', value: (r) => r.position.toFixed(1) },
]));
console.log('\n## High Impression, Low CTR\n');
console.log(table(lowCtr, [
  { label: 'Query', value: (r) => r.query.replaceAll('|', '\\|') },
  { label: 'Page', value: (r) => r.page },
  { label: 'Impressions', value: (r) => r.impressions },
  { label: 'CTR', value: (r) => `${(r.ctr * 100).toFixed(2)}%` },
  { label: 'Position', value: (r) => r.position.toFixed(1) },
  { label: 'Next Action', value: () => 'Rewrite title/meta to match query intent; add visible answer near H1.' },
]));
console.log('\n## Page Opportunities\n');
console.log(table(pageOpportunities, [
  { label: 'Page', value: (r) => r.page },
  { label: 'Clicks', value: (r) => r.clicks },
  { label: 'Impressions', value: (r) => r.impressions },
  { label: 'CTR', value: (r) => `${(r.ctr * 100).toFixed(2)}%` },
  { label: 'Avg Position', value: (r) => r.avgPosition.toFixed(1) },
  { label: 'Queries', value: (r) => r.queryCount },
]));
