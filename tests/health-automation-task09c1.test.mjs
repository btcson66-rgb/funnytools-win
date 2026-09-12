import assert from 'node:assert/strict';
import { existsSync, mkdtempSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import {
  classifyHealthIssue,
  evaluateHealthPolicy,
  summarizeHealthPolicy,
  validateHealthSnapshot,
} from '../scripts/health-policy.mjs';

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));

function snapshot(issues = [], overrides = {}) {
  return {
    schemaVersion: 4,
    generatedAt: '2026-09-12T00:00:00.000Z',
    sites: ['funnytools', 'roomfeng', 'worthcalc', 'familyboard'].map((id) => ({
      id,
      status: { critical: 0, warning: 0, info: 0 },
      home: { status: 200 },
      sourceIdentity: { state: 'VERIFIED' },
      deploymentIdentity: { evidence: 'VERIFIED', freshness: { state: 'CURRENT' } },
    })),
    issues,
    ...overrides,
  };
}

function issue(site, code, severity = 'warning', message = code) {
  return { site, code, severity, message };
}

test('healthy snapshot is PASS with exit 0', () => {
  const result = evaluateHealthPolicy(snapshot());
  assert.equal(result.decision, 'PASS');
  assert.equal(result.exitCode, 0);
});

test('FamilyBoard AdSense NEEDS_ATTENTION is OBSERVE', () => {
  const result = evaluateHealthPolicy(snapshot([issue('familyboard', 'familyboard-adsense-site-state')]));
  assert.equal(result.decision, 'OBSERVE');
  assert.equal(result.exitCode, 0);
});

test('WorthCalc slow response is OBSERVE', () => {
  const result = evaluateHealthPolicy(snapshot([issue('worthcalc', 'worthcalc-home-slow')]));
  assert.equal(result.decision, 'OBSERVE');
  assert.equal(result.exitCode, 0);
});

test('network suspect is OBSERVE', () => {
  const result = evaluateHealthPolicy(snapshot([issue('roomfeng', 'roomfeng-network_suspect')]));
  assert.equal(result.decision, 'OBSERVE');
  assert.equal(result.exitCode, 0);
});

test('deployment stale warning is PAGE', () => {
  const result = evaluateHealthPolicy(snapshot([issue('funnytools', 'funnytools-deployment-stale-relevant')]));
  assert.equal(result.decision, 'PAGE');
  assert.equal(result.exitCode, 2);
});

test('deployment current-source-failed warning is PAGE', () => {
  const result = evaluateHealthPolicy(snapshot([issue('familyboard', 'familyboard-deployment-current-source-failed')]));
  assert.equal(result.decision, 'PAGE');
  assert.equal(result.exitCode, 2);
});

test('deployment ahead-or-diverged warning is PAGE', () => {
  const result = evaluateHealthPolicy(snapshot([issue('roomfeng', 'roomfeng-deployment-ahead-or-diverged')]));
  assert.equal(result.decision, 'PAGE');
  assert.equal(result.exitCode, 2);
});

test('generic critical issue is PAGE', () => {
  const result = evaluateHealthPolicy(snapshot([issue('funnytools', 'funnytools-home-http-error', 'critical')]));
  assert.equal(result.decision, 'PAGE');
  assert.equal(result.exitCode, 2);
});

test('private-app telemetry leak is PAGE', () => {
  const result = evaluateHealthPolicy(snapshot([issue('familyboard', 'familyboard-private-app-en-analytics-unexpected', 'critical')]));
  assert.equal(result.decision, 'PAGE');
  assert.equal(result.exitCode, 2);
});

test('sitemap collapse is PAGE', () => {
  const result = evaluateHealthPolicy(snapshot([issue('worthcalc', 'worthcalc-sitemap-count-collapse', 'critical')]));
  assert.equal(result.decision, 'PAGE');
  assert.equal(result.exitCode, 2);
});

test('source identity NO_ACCESS remains OBSERVE', () => {
  const result = evaluateHealthPolicy(snapshot([issue('roomfeng', 'roomfeng-source-identity-no-access', 'info')]));
  assert.equal(result.decision, 'OBSERVE');
  assert.equal(result.exitCode, 0);
});

test('unsupported schema is INFRA_FAILURE', () => {
  const result = evaluateHealthPolicy(snapshot([], { schemaVersion: 3 }));
  assert.equal(result.decision, 'INFRA_FAILURE');
  assert.equal(result.exitCode, 3);
  assert.ok(result.validationErrors.includes('unsupported-schema:3'));
});

test('missing sites is INFRA_FAILURE', () => {
  const result = evaluateHealthPolicy({ schemaVersion: 4, issues: [] });
  assert.equal(result.decision, 'INFRA_FAILURE');
  assert.equal(result.exitCode, 3);
  assert.ok(result.validationErrors.includes('sites-not-array'));
});

test('missing issues is INFRA_FAILURE', () => {
  const result = evaluateHealthPolicy({ schemaVersion: 4, sites: [{}] });
  assert.equal(result.decision, 'INFRA_FAILURE');
  assert.equal(result.exitCode, 3);
  assert.ok(result.validationErrors.includes('issues-not-array'));
});

test('mutation: AdSense warning changed to critical pages', () => {
  const result = evaluateHealthPolicy(snapshot([issue('familyboard', 'familyboard-adsense-site-state', 'critical')]));
  assert.equal(result.decision, 'PAGE');
  assert.equal(result.exitCode, 2);
});

test('mutation: adding stale deployment warning pages', () => {
  const result = evaluateHealthPolicy(snapshot([issue('familyboard', 'familyboard-deployment-stale-relevant')]));
  assert.equal(result.decision, 'PAGE');
  assert.equal(result.exitCode, 2);
});

test('mutation: only slow response never pages', () => {
  const result = evaluateHealthPolicy(snapshot([issue('worthcalc', 'worthcalc-home-slow')]));
  assert.notEqual(result.decision, 'PAGE');
  assert.equal(result.exitCode, 0);
});

test('policy summary is machine-readable and contains issue projections', () => {
  const sourceIssue = issue('roomfeng', 'roomfeng-source-identity-no-access', 'info', 'provider unavailable');
  const current = snapshot([sourceIssue]);
  const policy = evaluateHealthPolicy(current);
  const summary = summarizeHealthPolicy(current, policy);
  assert.deepEqual(summary.counts, { page: 0, observe: 1 });
  assert.equal(summary.siteCount, 4);
  assert.equal(summary.observeIssues[0].message, 'provider unavailable');
});

test('health policy validator reports non-object snapshots', () => {
  assert.deepEqual(validateHealthSnapshot(null), ['snapshot-not-object']);
});

test('health-policy helper is pure and has no runtime side-effect imports', () => {
  const source = readFileSync(join(repoRoot, 'scripts', 'health-policy.mjs'), 'utf8');
  for (const forbidden of ['fetch', 'node:fs', 'child_process', 'process.exit', 'process.env', 'webhook', 'GitHub API']) {
    assert.equal(source.toLowerCase().includes(forbidden.toLowerCase()), false, `forbidden token: ${forbidden}`);
  }
});

test('workflow has six-hour cadence, manual dispatch, isolation and artifact retention', () => {
  const source = readFileSync(join(repoRoot, '.github', 'workflows', 'health-monitor.yml'), 'utf8');
  for (const required of ['schedule:', "cron: '17 */6 * * *'", 'workflow_dispatch:', 'FABLE_HEALTH_SKIP_LOCAL_REPO', 'upload-artifact@v4', 'retention-days: 14', 'timeout-minutes: 20']) {
    assert.ok(source.includes(required), `missing workflow contract: ${required}`);
  }
});

test('workflow is read-only and has no notification or deployment mutation', () => {
  const source = readFileSync(join(repoRoot, '.github', 'workflows', 'health-monitor.yml'), 'utf8').toLowerCase();
  for (const forbidden of ['issues: write', 'contents: write', 'pages: write', 'deployments: write', 'wrangler', 'deploy-pages', 'webhook', 'discord', 'git push', 'github_token:']) {
    assert.equal(source.includes(forbidden), false, `forbidden workflow token: ${forbidden}`);
  }
  assert.ok(source.includes('contents: read'));
});

function runNode(script, env, timeout = 240_000) {
  return spawnSync(process.execPath, [script], {
    cwd: repoRoot,
    env,
    encoding: 'utf8',
    timeout,
  });
}

test('health-check cloud context skips local repo without git false warnings', { timeout: 300_000 }, () => {
  const base = mkdtempSync(join(tmpdir(), 'task09c1-local-'));
  const env = {
    ...process.env,
    FABLE_HEALTH_VAULT_DIR: join(base, 'vault'),
    FABLE_HEALTH_DATA_DIR: join(base, 'data'),
    FABLE_HEALTH_SKIP_LOCAL_REPO: '1',
  };
  const result = runNode('health-check.mjs', env);
  assert.equal(result.status, 0, result.stderr);
  const snapshotPath = join(base, 'data', 'health', 'latest-status.json');
  const current = JSON.parse(readFileSync(snapshotPath, 'utf8'));
  assert.equal(current.schemaVersion, 4);
  assert.equal(current.local.skipped, true);
  assert.equal(current.local.repo, null);
  assert.equal(current.issues.some((item) => item.code.endsWith('repo-not-main') || item.code.endsWith('repo-git-error')), false);
  const report = readFileSync(join(base, 'vault', '01_Daily_Reports', 'Long', `${current.date}.md`), 'utf8');
  assert.ok(report.includes('本機 repo：SKIPPED（cloud monitoring context）'));
  assert.equal(report.includes('branch: ?'), false);
});

test('runner cloud simulation writes isolated artifacts and exits 0', { timeout: 360_000 }, () => {
  const base = mkdtempSync(join(tmpdir(), 'task09c1-runner-'));
  const env = {
    ...process.env,
    FABLE_HEALTH_VAULT_DIR: join(base, 'vault'),
    FABLE_HEALTH_DATA_DIR: join(base, 'data'),
    FABLE_HEALTH_SKIP_LOCAL_REPO: '1',
  };
  const result = runNode(join('scripts', 'run-health-monitor.mjs'), env);
  assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
  const snapshotPath = join(base, 'data', 'health', 'latest-status.json');
  const automationPath = join(base, 'data', 'health', 'automation-result.json');
  assert.equal(existsSync(snapshotPath), true);
  assert.equal(existsSync(automationPath), true);
  assert.equal(existsSync(join(base, 'vault', '01_Daily_Reports', 'Long')), true);
  const current = JSON.parse(readFileSync(snapshotPath, 'utf8'));
  const automation = JSON.parse(readFileSync(automationPath, 'utf8'));
  assert.equal(current.schemaVersion, 4);
  assert.equal(current.sites.length, 4);
  assert.equal(current.local.skipped, true);
  assert.ok(['PASS', 'OBSERVE'].includes(automation.decision));
  assert.equal(automation.exitCode, 0);
  assert.equal(automation.siteCount, 4);
});

test('runner refuses to run without both isolated directories', () => {
  const env = { ...process.env };
  delete env.FABLE_HEALTH_DATA_DIR;
  delete env.FABLE_HEALTH_VAULT_DIR;
  const result = runNode(join('scripts', 'run-health-monitor.mjs'), env, 30_000);
  assert.equal(result.status, 3);
});
