import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';
import {
  deploymentFreshnessIssue,
  diffDeploymentIdentity,
  evaluateDeploymentFreshness,
  normalizeCloudflarePagesProject,
  normalizeGithubPagesDeployment,
  normalizeSha,
  normalizeWorkflowDeployment,
  pathMatchesSourceScope,
  relevantChangedFiles,
} from '../scripts/deployment-identity.mjs';

const source = 'abcdef1234567';
const deployed = '1234567abcdef';
const old = '7654321abcdef';
const now = Date.parse('2026-09-12T12:00:00Z');

test('normalizes valid SHA and rejects malformed values', () => {
  assert.equal(normalizeSha(`  ${source.toUpperCase()}  `), source);
  assert.equal(normalizeSha('not-a-sha'), null);
  assert.equal(normalizeSha(''), null);
});

test('exact source and deployment are CURRENT with no severity', () => {
  const result = evaluateDeploymentFreshness({
    sourceSha: source,
    sourceCommittedAt: '2026-09-12T10:00:00Z',
    deploymentSha: source,
    nowMs: now,
  });
  assert.equal(result.state, 'CURRENT');
  assert.equal(result.severity, null);
});

test('all-main lag within grace is PENDING info', () => {
  const result = evaluateDeploymentFreshness({
    sourceSha: source,
    sourceCommittedAt: '2026-09-12T11:50:00Z',
    deploymentSha: deployed,
    compare: { status: 'ahead' },
    nowMs: now,
  });
  assert.equal(result.state, 'PENDING');
  assert.equal(result.severity, null);
  assert.equal(deploymentFreshnessIssue(result).code, 'deployment-pending');
});

test('all-main lag after grace is STALE_RELEVANT warning', () => {
  const result = evaluateDeploymentFreshness({
    sourceSha: source,
    sourceCommittedAt: '2026-09-12T09:00:00Z',
    deploymentSha: deployed,
    compare: { status: 'ahead' },
    nowMs: now,
  });
  assert.equal(result.state, 'STALE_RELEVANT');
  assert.equal(result.severity, 'warning');
  assert.equal(deploymentFreshnessIssue(result).code, 'deployment-stale-relevant');
});

test('current source failed attempt is FAILED_CURRENT_SOURCE warning', () => {
  const result = evaluateDeploymentFreshness({
    sourceSha: source,
    sourceCommittedAt: '2026-09-12T11:00:00Z',
    deploymentSha: deployed,
    latestAttemptSha: source,
    latestAttemptState: 'failure',
    nowMs: now,
  });
  assert.equal(result.state, 'FAILED_CURRENT_SOURCE');
  assert.equal(result.severity, 'warning');
});

test('diverged deployment is DEPLOYMENT_AHEAD_OR_DIVERGED', () => {
  const result = evaluateDeploymentFreshness({
    sourceSha: source,
    sourceCommittedAt: '2026-09-12T11:00:00Z',
    deploymentSha: deployed,
    compare: { status: 'diverged' },
    nowMs: now,
  });
  assert.equal(result.state, 'DEPLOYMENT_AHEAD_OR_DIVERGED');
  assert.equal(result.severity, 'warning');
});

test('missing compare relation is UNKNOWN_RELATION, not stale', () => {
  const result = evaluateDeploymentFreshness({
    sourceSha: source,
    sourceCommittedAt: '2026-09-12T09:00:00Z',
    deploymentSha: deployed,
    nowMs: now,
  });
  assert.equal(result.state, 'UNKNOWN_RELATION');
  assert.equal(result.severity, null);
  assert.equal(deploymentFreshnessIssue(result).code, 'deployment-relation-unknown');
});

test('missing deployment identity is UNKNOWN_DEPLOYMENT', () => {
  const result = evaluateDeploymentFreshness({ sourceSha: source, deploymentSha: null, nowMs: now });
  assert.equal(result.state, 'UNKNOWN_DEPLOYMENT');
  assert.equal(result.severity, null);
});

test('missing source identity is UNKNOWN_SOURCE', () => {
  const result = evaluateDeploymentFreshness({ sourceSha: null, deploymentSha: source, nowMs: now });
  assert.equal(result.state, 'UNKNOWN_SOURCE');
});

test('WorthCalc irrelevant README lag is CURRENT_FOR_SCOPE', () => {
  const result = evaluateDeploymentFreshness({
    sourceSha: source,
    sourceCommittedAt: '2026-09-12T09:00:00Z',
    deploymentSha: deployed,
    sourceScope: { mode: 'paths', pathPrefixes: ['sites/worth-it-tools/'], exactPaths: ['.github/workflows/deploy-worthcalc.yml'] },
    compare: { status: 'ahead', complete: true, files: [{ filename: 'README.md' }] },
    nowMs: now,
  });
  assert.equal(result.state, 'CURRENT_FOR_SCOPE');
  assert.deepEqual(result.relevantFiles, []);
});

test('WorthCalc relevant page lag is STALE_RELEVANT', () => {
  const result = evaluateDeploymentFreshness({
    sourceSha: source,
    sourceCommittedAt: '2026-09-12T09:00:00Z',
    deploymentSha: deployed,
    sourceScope: { mode: 'paths', pathPrefixes: ['sites/worth-it-tools/'], exactPaths: ['.github/workflows/deploy-worthcalc.yml'] },
    compare: { status: 'ahead', complete: true, files: [{ filename: 'sites/worth-it-tools/src/pages/index.astro' }] },
    nowMs: now,
  });
  assert.equal(result.state, 'STALE_RELEVANT');
  assert.deepEqual(result.relevantFiles, ['sites/worth-it-tools/src/pages/index.astro']);
});

test('WorthCalc workflow file is relevant', () => {
  assert.equal(pathMatchesSourceScope('.github\\workflows\\deploy-worthcalc.yml', {
    mode: 'paths',
    exactPaths: ['.github/workflows/deploy-worthcalc.yml'],
  }), true);
});

test('truncated compare produces UNKNOWN_SCOPE for path-scoped site', () => {
  const result = evaluateDeploymentFreshness({
    sourceSha: source,
    sourceCommittedAt: '2026-09-12T09:00:00Z',
    deploymentSha: deployed,
    sourceScope: { mode: 'paths', pathPrefixes: ['sites/worth-it-tools/'] },
    compare: { status: 'ahead', complete: false, files: [] },
    nowMs: now,
  });
  assert.equal(result.state, 'UNKNOWN_SCOPE');
});

test('GitHub Pages successful deployment normalizes as VERIFIED', () => {
  const result = normalizeGithubPagesDeployment({ id: 42, sha: source, ref: 'main', environment: 'github-pages', created_at: '2026-09-12T11:00:00Z' }, {
    state: 'success',
    environment: 'github-pages',
    environment_url: 'https://example.test/',
  });
  assert.equal(result.evidence, 'VERIFIED');
  assert.equal(result.deploymentSha, source);
  assert.equal(result.providerState, 'success');
});

test('GitHub Pages record without success status is PARTIAL', () => {
  const result = normalizeGithubPagesDeployment({ id: 42, sha: source }, null);
  assert.equal(result.evidence, 'PARTIAL');
});

test('Cloudflare canonical deployment requires successful stage for VERIFIED', () => {
  const result = normalizeCloudflarePagesProject({ result: { canonical_deployment: {
    id: 'cf-1',
    environment: 'production',
    url: 'https://abc.pages.dev',
    created_on: '2026-09-12T10:00:00Z',
    deployment_trigger: { metadata: { commit_hash: source, branch: 'main' } },
    latest_stage: { status: 'success' },
  } } });
  assert.equal(result.evidence, 'VERIFIED');
  assert.equal(result.deploymentSha, source);
});

test('Cloudflare canonical deployment without commit hash is PARTIAL', () => {
  const result = normalizeCloudflarePagesProject({ result: { canonical_deployment: {
    id: 'cf-1',
    latest_stage: { status: 'success' },
  } } });
  assert.equal(result.evidence, 'PARTIAL');
  assert.equal(result.deploymentSha, null);
});

test('workflow fallback success is PARTIAL with run SHA', () => {
  const result = normalizeWorkflowDeployment({ run: { id: 99, head_sha: source, head_branch: 'main', conclusion: 'success', html_url: 'https://github.com/run/99' }, job: { conclusion: 'success' } });
  assert.equal(result.evidence, 'PARTIAL');
  assert.equal(result.deploymentSha, source);
});

test('deployment baseline and advance are change events without severity', () => {
  assert.deepEqual(diffDeploymentIdentity(null, { deploymentSha: source }), [{ type: 'DEPLOYMENT_IDENTITY_BASELINE_ESTABLISHED', from: null, to: source }]);
  assert.deepEqual(diffDeploymentIdentity({ deploymentSha: old, evidence: 'VERIFIED', freshness: { state: 'CURRENT' } }, { deploymentSha: source, evidence: 'VERIFIED', freshness: { state: 'CURRENT' } }), [{ type: 'DEPLOYMENT_ADVANCED', from: old, to: source }]);
});

test('schema3 previous snapshot without deployment identity establishes a baseline event', () => {
  const previousSchema3 = { schemaVersion: 3, sites: [{ id: 'funnytools', sourceIdentity: { mainSha: old } }] };
  const prior = previousSchema3.sites.find((site) => site.id === 'funnytools');
  assert.deepEqual(diffDeploymentIdentity(prior.deploymentIdentity, { deploymentSha: source }), [{ type: 'DEPLOYMENT_IDENTITY_BASELINE_ESTABLISHED', from: null, to: source }]);
});

test('relevantChangedFiles accepts GitHub file objects and filters scope', () => {
  assert.deepEqual(relevantChangedFiles([{ filename: 'README.md' }, { filename: 'sites/worth-it-tools/a.ts' }], { mode: 'paths', pathPrefixes: ['sites/worth-it-tools/'] }), ['sites/worth-it-tools/a.ts']);
});

test('four configured sites declare the expected provider topology and grace window', async () => {
  const config = JSON.parse(await readFile(new URL('../config/company.json', import.meta.url), 'utf8'));
  const deployments = Object.fromEntries(config.sites.map((site) => [site.id, site.deployment]));
  assert.equal(deployments.funnytools.provider, 'github-pages');
  assert.equal(deployments.roomfeng.provider, 'cloudflare-pages');
  assert.equal(deployments.worthcalc.provider, 'github-pages');
  assert.equal(deployments.familyboard.provider, 'github-pages');
  assert.deepEqual(deployments.worthcalc.sourceScope.pathPrefixes, ['sites/worth-it-tools/']);
  assert.equal(deployments.roomfeng.cloudflareApiTokenEnv, 'CLOUDFLARE_API_TOKEN');
  assert.ok(config.sites.every((site) => site.deployment.graceMinutes === 45));
});
