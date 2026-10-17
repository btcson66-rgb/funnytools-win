import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import test from 'node:test';

// P1 (2026-10-15): runs scripts/p1-site-contract-audit.mjs against the fresh build so the
// education-statistics site shape (sitemap, canonicals, authorship, removed sections,
// redirect-stub budget, no FAQPage/HowTo) is enforced by `npm test` as well as by preflight.
test('P1 site contract audit passes on the built site', () => {
  const result = spawnSync(process.execPath, ['scripts/p1-site-contract-audit.mjs'], { encoding: 'utf8' });
  assert.equal(result.status, 0, result.stdout + result.stderr);
  const summary = JSON.parse(result.stdout);
  assert.equal(summary.status, 'PASS');
  assert.equal(summary.sitemapUrls, 18);
  assert.ok(summary.redirectStubs <= summary.redirectStubBudget);
});
