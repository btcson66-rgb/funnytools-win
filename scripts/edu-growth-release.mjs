import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

import { builtPages, contentHashForPage, distDir, readJson, reportsDir } from './seo-indexing-utils.mjs';

const rootDir = process.cwd();
const configPath = join(rootDir, 'src', 'config', 'edu-growth-release.json');
const manifestPath = join(reportsDir, 'edu-growth-001', 'release-manifest.json');
const statePath = join(reportsDir, 'edu-growth-001', 'release-state.json');
const config = JSON.parse(readFileSync(configPath, 'utf8'));
const asOf = process.env.EDU_GROWTH_AS_OF?.trim() || new Intl.DateTimeFormat('en-CA', {
  timeZone: config.timezone,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
}).format(new Date());

function writeJson(file, value) {
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`);
}

function candidateContentHash(candidate, pagesByUrl) {
  const page = pagesByUrl.get(`https://funnytools.win${candidate.url}`);
  if (page) return contentHashForPage(page);
  return '';
}

const pagesByUrl = existsSync(distDir)
  ? new Map(builtPages().map((page) => [page.loc, page]))
  : new Map();
const manifest = config.candidates.map((candidate) => ({
  id: candidate.id,
  pairId: candidate.pairId,
  locale: candidate.locale,
  type: candidate.type,
  intent: candidate.intent,
  url: candidate.url,
  publishAt: candidate.publishAt,
  contentHash: candidateContentHash(candidate, pagesByUrl),
  reviewStatus: candidate.reviewStatus,
  sourceCount: candidate.sourceCount,
  testStatus: candidate.testStatus,
  released: candidate.released,
}));
const due = manifest.filter((candidate) => !candidate.released && candidate.publishAt <= asOf);
const pairs = [...new Set(due.map((candidate) => candidate.pairId))]
  .map((pairId) => due.filter((candidate) => candidate.pairId === pairId));
const selected = [];
for (const pair of pairs) {
  if (selected.length + pair.length > config.defaultPagesPerDay) break;
  selected.push(...pair);
}
const qualityFailures = selected.flatMap((candidate) => [
  candidate.reviewStatus === 'PASS' ? null : `${candidate.id}: reviewStatus is not PASS`,
  candidate.sourceCount >= 2 ? null : `${candidate.id}: fewer than two sources`,
  candidate.testStatus === 'PASS' ? null : `${candidate.id}: testStatus is not PASS`,
  candidate.contentHash || !existsSync(distDir) ? null : `${candidate.id}: no built content hash`,
].filter(Boolean));
const status = config.pause || !config.enabled
  ? 'PAUSED'
  : selected.length === 0
    ? 'NO_DUE_PAGES'
    : qualityFailures.length
      ? 'QUALITY_BLOCKED'
      : 'READY';

writeJson(manifestPath, manifest);
writeJson(statePath, {
  campaign: config.campaign,
  asOf,
  status,
  defaultPagesPerDay: config.defaultPagesPerDay,
  maximumPagesPerDay: config.maximumPagesPerDay,
  dueCount: due.length,
  selectedCount: selected.length,
  selectedIds: selected.map((candidate) => candidate.id),
  qualityFailures,
});

console.log(JSON.stringify({ status, asOf, dueCount: due.length, selectedCount: selected.length, qualityFailures }, null, 2));
if (status === 'QUALITY_BLOCKED') process.exit(1);
