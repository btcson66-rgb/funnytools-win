import { execFileSync } from 'node:child_process';
import { join } from 'node:path';
import {
  changedUrlsPath,
  filterSubmitCandidates,
  priorityUrlsPath,
  readJson,
  readPriorityUrls,
  reportsDir,
  writeJson,
} from './seo-indexing-utils.mjs';

const changed = readJson(changedUrlsPath, {}) ?? {};
const candidates = [...new Set([
  ...(changed.changed ?? []),
  ...readPriorityUrls(priorityUrlsPath),
])];
const { submitted, skipped } = filterSubmitCandidates(candidates);
const sourceCommit = execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
const manifest = {
  schema_version: 1,
  generatedAt: new Date().toISOString(),
  sourceCommit,
  source: 'validated build artifact; no submit-job rebuild',
  candidateCount: candidates.length,
  validatedCount: submitted.length,
  urls: submitted,
  skipped,
};

writeJson(join(reportsDir, 'indexing-submission-manifest.json'), manifest);
console.log(JSON.stringify({ candidateCount: candidates.length, validatedCount: submitted.length, skipped: skipped.length, sourceCommit }, null, 2));
