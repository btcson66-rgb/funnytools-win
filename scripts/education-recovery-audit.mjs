import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { extractVisibleMain, findEditorialLeakage } from './editorial-leakage-audit.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const REPORT = path.join(ROOT, 'reports', 'education-recovery-001');
const MASTER = path.join(ROOT, 'reports', 'index-recovery-phase2', 'index-evidence-master.csv');
const PAIRS = path.join(ROOT, 'reports', 'index-recovery-phase2b', 'experiment-pairs.csv');
const EXPECTED_NEW_TOOLS = [
  'final-grade-needed-calculator',
  'item-analysis-calculator',
  'kr20-reliability-calculator',
];
const ALLOWED_LASTMOD_ROUTES = new Set([
  '/', '/tools/', '/education-statistics/', '/guides/', '/category/statistics/',
  ...EXPECTED_NEW_TOOLS.map((slug) => `/tools/${slug}/`),
  '/en/', '/en/tools/', '/en/education-statistics/', '/en/guides/', '/en/category/statistics/',
  '/guides/final-exam-score-needed-guide/', '/en/guides/final-exam-score-needed-guide/',
]);

function read(file) { return fs.readFileSync(file, 'utf8'); }
function write(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, `${value.endsWith('\n') ? value : `${value}\n`}`, 'utf8');
}
function writeJson(file, value) { write(file, JSON.stringify(value, null, 2)); }

function parseCsv(input) {
  const rows = [];
  let row = [], cell = '', quoted = false;
  const pushCell = () => { row.push(cell); cell = ''; };
  const pushRow = () => {
    pushCell();
    if (row.some((value) => value !== '')) rows.push(row);
    row = [];
  };
  for (let i = 0; i < input.length; i += 1) {
    const char = input[i];
    if (quoted) {
      if (char === '"' && input[i + 1] === '"') { cell += '"'; i += 1; }
      else if (char === '"') quoted = false;
      else cell += char;
    } else if (char === '"' && cell === '') quoted = true;
    else if (char === ',') pushCell();
    else if (char === '\n') pushRow();
    else if (char !== '\r') cell += char;
  }
  if (cell !== '' || row.length) pushRow();
  const [header, ...data] = rows;
  return data.map((values) => Object.fromEntries(header.map((key, index) => [key, values[index] ?? ''])));
}

function csvCell(value) {
  const text = String(value ?? '');
  return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}
function toCsv(rows, columns) {
  return [columns.join(','), ...rows.map((row) => columns.map((column) => csvCell(row[column])).join(','))].join('\n');
}
function num(value) {
  const parsed = Number(value);
  return value === '' || !Number.isFinite(parsed) ? null : parsed;
}
function sha256(value) { return crypto.createHash('sha256').update(value).digest('hex'); }
function walk(dir, output = []) {
  if (!fs.existsSync(dir)) return output;
  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (fs.statSync(full).isDirectory()) walk(full, output);
    else output.push(full);
  }
  return output;
}
function routeFromFile(file) {
  const relative = path.relative(DIST, file).replaceAll('\\', '/');
  if (relative === 'index.html') return '/';
  if (relative.endsWith('/index.html')) return `/${relative.slice(0, -'index.html'.length)}`;
  return `/${relative.replace(/\.html$/, '/')}`;
}
function fileForRoute(route) {
  const clean = route.replace(/^\/+|\/+$/g, '');
  return path.join(DIST, clean, 'index.html');
}
function mainHtml(html) { return html.match(/<main\b[\s\S]*?<\/main>/i)?.[0] || html; }
function normalizeHtml(html) { return html.replace(/\r\n/g, '\n').replace(/>\s+</g, '><').trim(); }
function robots(html) {
  return html.match(/<meta\b[^>]*name=["']robots["'][^>]*content=["']([^"']*)/i)?.[1]
    ?? html.match(/<meta\b[^>]*content=["']([^"']*)["'][^>]*name=["']robots["']/i)?.[1]
    ?? '';
}
function canonical(html) {
  return html.match(/<link\b[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)/i)?.[1]
    ?? html.match(/<link\b[^>]*href=["']([^"']+)["'][^>]*rel=["']canonical["']/i)?.[1]
    ?? '';
}
function sitemapRecords() {
  const records = [];
  for (const file of walk(DIST).filter((candidate) => /^sitemap[^/]*\.xml$/.test(path.basename(candidate)))) {
    const xml = read(file);
    for (const match of xml.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
      const block = match[1];
      const loc = block.match(/<loc>([^<]+)<\/loc>/)?.[1] ?? '';
      if (!loc) continue;
      records.push({
        url: loc,
        route: new URL(loc).pathname.endsWith('/') ? new URL(loc).pathname : `${new URL(loc).pathname}/`,
        lastmod: block.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1] ?? '',
        file: path.relative(DIST, file).replaceAll('\\', '/'),
      });
    }
  }
  return [...new Map(records.map((record) => [record.route, record])).values()];
}
function localeForRoute(route) {
  if (route === '/en/' || route.startsWith('/en/')) return 'en';
  return 'zh-TW';
}
function pageType(route) {
  if (route === '/') return 'home';
  if (/^\/en\/$/.test(route)) return 'home';
  if (/^\/(?:en\/)?tools\/[^/]+\/$/.test(route)) return 'tool';
  if (/^\/(?:en\/)?guides\/[^/]+\/$/.test(route)) return 'guide';
  if (/^\/(?:en\/)?workflows\/[^/]+\/$/.test(route)) return 'workflow';
  if (/^\/(?:en\/)?category\/[^/]+\/$/.test(route)) return 'category';
  if (/^\/(?:en\/)?for(?:\/[^/]+)?\/$/.test(route)) return 'audience';
  if (/^\/(?:en\/)?methodology(?:\/[^/]+)?\/$/.test(route)) return 'methodology';
  if (/^\/(?:en\/)?(?:about|about-tools|contact|privacy|terms|disclaimer)\/$/.test(route)) return 'legal';
  if (/^\/(?:en\/)?(?:support|shop)\/$/.test(route)) return 'support';
  if (/^\/(?:en\/)?(?:tools|guides|workflows|education-statistics)\/$/.test(route)) return 'hub';
  return 'other-legitimate';
}
function toolSlug(route) { return route.match(/^\/(?:en\/)?tools\/([^/]+)\/$/)?.[1] ?? ''; }
function evidenceMap() {
  if (!fs.existsSync(MASTER)) return new Map();
  return new Map(parseCsv(read(MASTER)).map((row) => [row.url, row]));
}
function phase2Map() {
  const map = new Map();
  for (const row of parseCsv(read(PAIRS))) {
    if (row.treatment_url) map.set(row.treatment_url, { pairId: row.pair_id, cohort: 'treatment' });
    if (row.control_url) map.set(row.control_url, { pairId: row.pair_id, cohort: 'control' });
  }
  return map;
}
function absoluteUrl(route) { return `https://funnytools.win${route}`; }
function evidenceValue(row, key) { return row?.[key] ?? ''; }
function gscProtectedReason(row) {
  const clicks = num(row?.search_90_clicks) ?? num(row?.search_28_clicks);
  const impressions = num(row?.search_90_impressions) ?? num(row?.search_28_impressions);
  const position = num(row?.search_90_position) ?? num(row?.search_28_position);
  const reasons = [];
  if (clicks !== null && clicks > 0) reasons.push(`historical clicks=${clicks}`);
  if (impressions !== null && impressions >= 5 && position !== null && position <= 20) reasons.push(`impressions=${impressions}, position=${position}`);
  return reasons;
}
function protectedSeedRoutes() {
  return new Map([
    ['/', 'FunnyTools homepage'],
    ['/education-statistics/', 'education pillar'],
    ['/tools/t-score-calculator/', 'explicit core education tool'],
    ['/tools/grade-average/', 'explicit core education tool'],
    ['/tools/teacher-exam-score-converter/', 'explicit core education tool'],
    ['/tools/class-rank-percentile-calculator/', 'explicit core education tool'],
    ['/tools/random-name-picker/', 'explicit protected winner'],
    ['/tools/standard-deviation/', 'explicit core education tool'],
    ['/tools/random-student-picker/', 'explicit classroom tool'],
    ['/guides/t-score-calculator-guide/', 'explicit protected guide'],
    ['/guides/teacher-exam-weighted-score-guide/', 'explicit protected guide'],
  ]);
}
function pageInventory(records, evidence, phase2, protectedReasons) {
  const sitemapSet = new Set(records.map((record) => record.route));
  return records.map((record) => {
    const row = evidence.get(record.url) ?? {};
    const file = fileForRoute(record.route);
    const html = fs.existsSync(file) ? read(file) : '';
    const phase = phase2.get(record.url);
    const reasons = protectedReasons.get(record.route) ?? [];
    const type = evidenceValue(row, 'page_type') || pageType(record.route);
    const slug = evidenceValue(row, 'tool_slug') || toolSlug(record.route);
    const clicks = num(row.search_90_clicks) ?? num(row.search_28_clicks);
    const impressions = num(row.search_90_impressions) ?? num(row.search_28_impressions);
    const position = num(row.search_90_position) ?? num(row.search_28_position);
    let decision = 'OBSERVE';
    let reason = 'No destructive decision without row-level evidence.';
    if (reasons.length || phase) {
      decision = 'PROTECT';
      reason = [...reasons, phase ? `Phase 2B ${phase.cohort} ${phase.pairId}` : ''].filter(Boolean).join('; ');
    } else if (type === 'tool') {
      decision = 'KEEP_INDEXABLE';
      reason = 'Functional tool; zero traffic alone is not a pruning reason.';
    } else if (record.route === '/education-statistics/') {
      decision = 'PROTECT';
      reason = 'Education topic pillar.';
    }
    const localRobots = robots(html);
    const localCanonical = canonical(html);
    return {
      url: record.url,
      locale: evidenceValue(row, 'locale') || localeForRoute(record.route),
      page_type: type,
      cluster: evidenceValue(row, 'content_cluster') || (type === 'tool' ? 'tool' : 'UNKNOWN'),
      tool_slug: slug,
      current_status: evidenceValue(row, 'production_status') || (html ? '200 local build' : 'MISSING_BUILD'),
      http_status: html ? '200 local build' : 'UNKNOWN',
      canonical: localCanonical || evidenceValue(row, 'canonical') || 'UNKNOWN',
      robots: localRobots || evidenceValue(row, 'robots') || 'index,follow (implicit)',
      indexable: /noindex/i.test(localRobots) ? 'no' : (html ? 'yes' : 'UNKNOWN'),
      sitemap_present: sitemapSet.has(record.route) ? 'yes' : 'no',
      lastmod: record.lastmod,
      internal_link_count: evidenceValue(row, 'internal_link_count') || 'UNKNOWN',
      crawl_depth: evidenceValue(row, 'crawl_depth') || 'UNKNOWN',
      phase2b_treatment: phase?.cohort === 'treatment' ? 'yes' : 'no',
      phase2b_control: phase?.cohort === 'control' ? 'yes' : 'no',
      historical_gsc_clicks: clicks === null ? 'UNKNOWN' : clicks,
      historical_gsc_impressions: impressions === null ? 'UNKNOWN' : impressions,
      historical_gsc_avg_position: position === null ? 'UNKNOWN' : position,
      last_known_crawl: evidenceValue(row, 'last_crawl_time') || 'UNKNOWN',
      similarity_risk: evidenceValue(row, 'v2_similarity_risk') || evidenceValue(row, 'max_boilerplate_adjusted_similarity') || 'UNKNOWN',
      editorial_leakage: html ? (findEditorialLeakage(extractVisibleMain(html)).join('|') || 'none') : 'UNKNOWN',
      unique_function: type === 'tool' ? 'yes' : 'UNKNOWN',
      unique_search_intent: evidenceValue(row, 'intent_relationships') ? 'measured relationship present' : 'UNKNOWN',
      decision,
      decision_reason: reason,
    };
  });
}
function phaseSnapshot(urls) {
  return urls.map((url) => {
    const route = new URL(url).pathname;
    const file = fileForRoute(route);
    const html = fs.existsSync(file) ? read(file) : '';
    const main = mainHtml(html);
    return {
      url,
      route,
      exists: Boolean(html),
      main_content_hash: html ? sha256(normalizeHtml(main)) : null,
      canonical: html ? canonical(html) : null,
      robots: html ? robots(html) : null,
      noindex: /noindex/i.test(html ? robots(html) : ''),
    };
  });
}
function newToolRouteSet(records) {
  return new Set(records.filter((record) => /^\/tools\/[^/]+\/$/.test(record.route)).map((record) => record.route));
}
function jaccard(left, right) {
  const a = new Set(left.split(/\s+/).filter(Boolean));
  const b = new Set(right.split(/\s+/).filter(Boolean));
  const union = new Set([...a, ...b]);
  if (!union.size) return 1;
  let intersection = 0;
  for (const token of a) if (b.has(token)) intersection += 1;
  return intersection / union.size;
}
function visibleTextForRoute(route) {
  const file = fileForRoute(route);
  return fs.existsSync(file) ? extractVisibleMain(read(file)) : '';
}
function ensureBaseline() {
  const records = sitemapRecords();
  const evidence = evidenceMap();
  const phase2 = phase2Map();
  const reasons = protectedSeedRoutes();
  for (const [url, row] of evidence) {
    const route = new URL(url).pathname.endsWith('/') ? new URL(url).pathname : `${new URL(url).pathname}/`;
    const gscReasons = gscProtectedReason(row);
    if (gscReasons.length) reasons.set(route, [...(reasons.get(route) ?? []), ...gscReasons]);
  }
  for (const [url, meta] of phase2) {
    const route = new URL(url).pathname;
    reasons.set(route, [...(reasons.get(route) ?? []), `Phase 2B ${meta.cohort} ${meta.pairId}`]);
  }
  const protectedUrls = [...reasons.entries()].sort(([left], [right]) => left.localeCompare(right)).map(([route, why]) => ({
    url: absoluteUrl(route), route, reasons: [...new Set(why)], source: route.startsWith('/tools/') || route.startsWith('/guides/') ? 'GSC/core/experiment evidence' : 'hard gate',
  }));
  writeJson(path.join(REPORT, 'protected-urls.json'), {
    schema_version: 1,
    generated_at: new Date().toISOString(),
    evidence_file: 'reports/index-recovery-phase2/index-evidence-master.csv',
    evidence_snapshot: '2026-09-13 URL-level inspection plus historical Search Analytics fields',
    count: protectedUrls.length,
    urls: protectedUrls,
  });
  writeJson(path.join(REPORT, 'baseline-sitemap-urls.json'), records.map((record) => record.route).sort());
  writeJson(path.join(REPORT, 'baseline-sitemap-lastmod.json'), Object.fromEntries(records.map((record) => [record.route, record.lastmod])));
  writeJson(path.join(REPORT, 'phase2b-protection-before.json'), {
    captured_at: new Date().toISOString(),
    source_commit: '0d1dd45231c8de32fd87e61dc9ea18c8a9ae9209',
    urls: phaseSnapshot([...phase2.keys()]),
  });
  const inventory = pageInventory(records, evidence, phase2, reasons);
  const columns = Object.keys(inventory[0]);
  write(path.join(REPORT, 'url-decision-master.csv'), toCsv(inventory, columns));
  write(path.join(REPORT, 'PHASE2B-CONFOUNDING.md'), '# Phase 2B confounding note\n\n自 2026-09-17 起，本次 FunnyTools education recovery 會改變 sitewide homepage、topic-pillar 與 internal-link architecture。因此 Phase 2B treatment/control 後續的 indexed-status 差異只能作為描述性 observation，不能再解讀為完全隔離的純因果實驗。\n');
  return { records, protectedUrls, phase2 };
}
function runAudit() {
  const required = ['protected-urls.json', 'baseline-sitemap-urls.json', 'baseline-sitemap-lastmod.json', 'phase2b-protection-before.json'];
  const missing = required.filter((file) => !fs.existsSync(path.join(REPORT, file)));
  if (missing.length) throw new Error(`Missing baseline artifacts; run with --capture-baseline first: ${missing.join(', ')}`);
  const records = sitemapRecords();
  const recordByRoute = new Map(records.map((record) => [record.route, record]));
  const sitemapSet = new Set(records.map((record) => record.route));
  const protectedData = JSON.parse(read(path.join(REPORT, 'protected-urls.json')));
  const beforeData = JSON.parse(read(path.join(REPORT, 'phase2b-protection-before.json')));
  const failures = [];
  const warnings = [];
  const protectedFindings = [];
  for (const protectedUrl of protectedData.urls) {
    const route = protectedUrl.route;
    const file = fileForRoute(route);
    const html = fs.existsSync(file) ? read(file) : '';
    const expected = absoluteUrl(route);
    const actualCanonical = canonical(html);
    const actualRobots = robots(html);
    const finding = { route, exists: Boolean(html), sitemap: sitemapSet.has(route), canonical: actualCanonical, robots: actualRobots };
    protectedFindings.push(finding);
    if (!html || !sitemapSet.has(route) || /noindex/i.test(actualRobots) || actualCanonical !== expected) {
      failures.push(`Protected URL gate failed: ${route}`);
    }
  }
  const phaseFindings = [];
  for (const before of beforeData.urls) {
    const after = phaseSnapshot([before.url])[0];
    const unchanged = before.exists === after.exists
      && before.main_content_hash === after.main_content_hash
      && before.canonical === after.canonical
      && before.noindex === after.noindex;
    phaseFindings.push({ ...after, before_main_content_hash: before.main_content_hash, unchanged });
    if (!unchanged) failures.push(`Phase 2B protection failed: ${before.url}`);
  }
  const leakage = [];
  for (const record of records) {
    const file = fileForRoute(record.route);
    if (!fs.existsSync(file)) continue;
    const findings = findEditorialLeakage(extractVisibleMain(read(file)));
    if (findings.length) leakage.push({ route: record.route, findings });
  }
  if (leakage.length) failures.push(`Editorial leakage found on ${leakage.length} sitemap route(s).`);
  const baselineRoutes = new Set(JSON.parse(read(path.join(REPORT, 'baseline-sitemap-urls.json'))));
  const currentToolRoutes = newToolRouteSet(records);
  const addedToolRoutes = [...currentToolRoutes].filter((route) => !baselineRoutes.has(route)).sort();
  const unexpectedAdded = addedToolRoutes.filter((route) => !EXPECTED_NEW_TOOLS.some((slug) => route === `/tools/${slug}/`));
  if (addedToolRoutes.length > 3 || unexpectedAdded.length) failures.push(`New indexed tool gate failed: ${addedToolRoutes.join(', ') || 'none'}`);
  for (const slug of EXPECTED_NEW_TOOLS) {
    const zhRoute = `/tools/${slug}/`;
    const enRoute = `/en/tools/${slug}/`;
    if (!sitemapSet.has(zhRoute)) failures.push(`Expected zh-TW new tool missing from sitemap: ${zhRoute}`);
    if (sitemapSet.has(enRoute)) failures.push(`New zh-TW-only tool appeared in English sitemap: ${enRoute}`);
  }
  const baselineLastmod = JSON.parse(read(path.join(REPORT, 'baseline-sitemap-lastmod.json')));
  const lastmodChanges = records.filter((record) => baselineLastmod[record.route] && baselineLastmod[record.route] !== record.lastmod).map((record) => record.route);
  const unexpectedLastmod = lastmodChanges.filter((route) => !ALLOWED_LASTMOD_ROUTES.has(route));
  if (unexpectedLastmod.length) failures.push(`Sitemap lastmod drift outside approved changed routes: ${unexpectedLastmod.join(', ')}`);
  const newTexts = EXPECTED_NEW_TOOLS.map((slug) => ({ slug, route: `/tools/${slug}/`, text: visibleTextForRoute(`/tools/${slug}/`) }));
  for (let i = 0; i < newTexts.length; i += 1) for (let j = i + 1; j < newTexts.length; j += 1) {
    const similarity = jaccard(newTexts[i].text, newTexts[j].text);
    if (similarity >= 0.8) failures.push(`New tool duplicate-content gate failed: ${newTexts[i].slug}/${newTexts[j].slug} Jaccard=${similarity.toFixed(3)}`);
  }
  for (const record of records) {
    const file = fileForRoute(record.route);
    if (!fs.existsSync(file)) { failures.push(`Sitemap route missing build output: ${record.route}`); continue; }
    const html = read(file);
    if (/noindex/i.test(robots(html))) failures.push(`Sitemap route contains noindex: ${record.route}`);
    if (canonical(html) !== absoluteUrl(record.route)) failures.push(`Sitemap self-canonical gate failed: ${record.route}`);
  }
  const report = {
    schema_version: 1,
    generated_at: new Date().toISOString(),
    status: failures.length ? 'FAIL' : 'PASS',
    protected: { count: protectedData.urls.length, failures: protectedFindings.filter((finding) => !finding.exists || !finding.sitemap || /noindex/i.test(finding.robots) || finding.canonical !== absoluteUrl(finding.route)).length },
    phase2b: { count: phaseFindings.length, failures: phaseFindings.filter((finding) => !finding.unchanged).length, confounded_by_sitewide_architecture: true },
    editorial_leakage: { routes: leakage.length, findings: leakage },
    new_indexed_tools: { expected: EXPECTED_NEW_TOOLS, added_routes: addedToolRoutes, unexpected_routes: unexpectedAdded },
    locale_gate: { zh_only_tools_present: EXPECTED_NEW_TOOLS.every((slug) => sitemapSet.has(`/tools/${slug}/`)), english_clones_present: EXPECTED_NEW_TOOLS.filter((slug) => sitemapSet.has(`/en/tools/${slug}/`)) },
    lastmod: { changed_routes: lastmodChanges, unexpected_routes: unexpectedLastmod },
    sitemap: { urls: records.length },
    failures,
    warnings,
  };
  writeJson(path.join(REPORT, 'education-recovery-audit.json'), report);
  write(path.join(REPORT, 'education-recovery-audit.md'), [
    '# Education recovery audit', '', `- Status: **${report.status}**`, `- Sitemap URLs: ${records.length}`, `- Protected URLs: ${protectedData.urls.length}`, `- Phase 2B URLs: ${phaseFindings.length}`, `- Editorial leakage routes: ${leakage.length}`, `- Added indexable tool routes: ${addedToolRoutes.length}`, '', failures.length ? '## Failures\n\n' + failures.map((failure) => `- ${failure}`).join('\n') : '## Result\n\nAll recovery-specific gates passed.', '',
  ].join('\n'));
  console.log(JSON.stringify({ status: report.status, sitemapUrls: records.length, protected: protectedData.urls.length, phase2b: phaseFindings.length, leakage: leakage.length, addedToolRoutes, failures }, null, 2));
  if (failures.length) process.exitCode = 1;
}

if (process.argv.includes('--capture-baseline')) {
  const result = ensureBaseline();
  console.log(JSON.stringify({ captured: true, sitemapUrls: result.records.length, protected: result.protectedUrls.length, phase2b: result.phase2.size }, null, 2));
} else {
  runAudit();
}
