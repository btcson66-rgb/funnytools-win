import {
  appendFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from 'node:fs';
import { dirname, join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import {
  evaluateHealthPolicy,
  summarizeHealthPolicy,
} from './health-policy.mjs';

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)));
const taskName = 'TASK09C1_CLOUD_HEALTH_CADENCE';

function ensureDir(path) {
  mkdirSync(path, { recursive: true });
  return path;
}

function resultPath(dataDir) {
  return join(dataDir, 'health', 'automation-result.json');
}

function writeResult(dataDir, result) {
  const path = resultPath(dataDir);
  ensureDir(dirname(path));
  writeFileSync(path, `${JSON.stringify(result, null, 2)}\n`, 'utf8');
  return path;
}

function issueSummary(issue) {
  return `- ${issue.site ?? 'unknown'} | \`${issue.code ?? 'unknown'}\` | ${issue.message ?? ''}`;
}

function siteCell(value, fallback = 'unknown') {
  if (value === undefined || value === null || value === '') return fallback;
  return String(value).replaceAll('|', '\\|');
}

function writeStepSummary(snapshot, policy) {
  const path = process.env.GITHUB_STEP_SUMMARY;
  if (!path) return;

  const lines = [
    '# Fable Four-Site Health',
    '',
    `- Decision: **${policy.decision}**`,
    `- Sites: **${Array.isArray(snapshot?.sites) ? snapshot.sites.length : 0}**`,
    `- Critical/page count: **${policy.counts.page}**`,
    `- Observe count: **${policy.counts.observe}**`,
    '',
    '| Site | HTTP | Source identity | Deployment evidence | Deployment freshness | Critical | Warning |',
    '| --- | ---: | --- | --- | --- | ---: | ---: |',
  ];

  for (const site of snapshot?.sites ?? []) {
    const http = site.home?.status ?? site.primary?.status ?? 'unknown';
    const source = site.sourceIdentity?.state ?? site.evidence?.sourceIdentity ?? 'UNKNOWN';
    const deployment = site.deploymentIdentity?.evidence ?? site.evidence?.deploymentIdentity ?? 'UNKNOWN';
    const freshness = site.deploymentIdentity?.freshness?.state ?? 'UNKNOWN';
    lines.push(`| ${siteCell(site.id)} | ${siteCell(http)} | ${siteCell(source)} | ${siteCell(deployment)} | ${siteCell(freshness)} | ${siteCell(site.status?.critical ?? 0)} | ${siteCell(site.status?.warning ?? 0)} |`);
  }

  if (policy.decision === 'PAGE') {
    lines.push('', '## Action required', '');
    for (const issue of policy.pageIssues) lines.push(issueSummary(issue));
  } else if (policy.observeIssues.length) {
    lines.push('', '## Observations', '');
    for (const issue of policy.observeIssues) lines.push(issueSummary(issue));
  }

  appendFileSync(path, `${lines.join('\n')}\n`, 'utf8');
}

function infrastructureResult({ dataDir, generatedAt, snapshotPath, siteCount = 0, reason, healthCheckExitCode = null, validationErrors = [] }) {
  return {
    task: taskName,
    decision: 'INFRA_FAILURE',
    exitCode: 3,
    generatedAt,
    snapshotPath,
    siteCount,
    counts: { page: 0, observe: 0 },
    pageIssues: [],
    observeIssues: [],
    validationErrors: [...validationErrors, reason].filter(Boolean),
    healthCheckExitCode,
    automationResultPath: dataDir ? resultPath(dataDir) : null,
  };
}

function run() {
  const dataDir = process.env.FABLE_HEALTH_DATA_DIR;
  const vaultDir = process.env.FABLE_HEALTH_VAULT_DIR;
  const generatedAt = new Date().toISOString();

  if (!dataDir || !vaultDir) {
    console.error('[health-monitor] INFRA_FAILURE: FABLE_HEALTH_DATA_DIR and FABLE_HEALTH_VAULT_DIR are required');
    process.exitCode = 3;
    return;
  }

  const snapshotPath = join(dataDir, 'health', 'latest-status.json');
  const child = spawnSync(process.execPath, [join(rootDir, 'health-check.mjs')], {
    cwd: rootDir,
    env: { ...process.env },
    stdio: 'inherit',
    timeout: 15 * 60 * 1000,
  });

  if (child.error || child.status !== 0) {
    const result = infrastructureResult({
      dataDir,
      generatedAt,
      snapshotPath,
      reason: child.error?.message ?? `health-check-exit:${child.status ?? 'signal'}`,
      healthCheckExitCode: child.status,
    });
    writeResult(dataDir, result);
    writeStepSummary({ sites: [] }, result);
    console.error(`[health-monitor] INFRA_FAILURE: ${result.validationErrors.join('; ')}`);
    process.exitCode = 3;
    return;
  }

  if (!existsSync(snapshotPath)) {
    const result = infrastructureResult({
      dataDir,
      generatedAt,
      snapshotPath,
      reason: 'snapshot-missing',
      healthCheckExitCode: child.status,
    });
    writeResult(dataDir, result);
    writeStepSummary({ sites: [] }, result);
    console.error('[health-monitor] INFRA_FAILURE: snapshot-missing');
    process.exitCode = 3;
    return;
  }

  let snapshot;
  try {
    snapshot = JSON.parse(readFileSync(snapshotPath, 'utf8'));
  } catch (error) {
    const result = infrastructureResult({
      dataDir,
      generatedAt,
      snapshotPath,
      reason: `snapshot-invalid-json:${error.message}`,
      healthCheckExitCode: child.status,
    });
    writeResult(dataDir, result);
    writeStepSummary({ sites: [] }, result);
    console.error(`[health-monitor] INFRA_FAILURE: ${result.validationErrors.join('; ')}`);
    process.exitCode = 3;
    return;
  }

  let policy;
  try {
    policy = evaluateHealthPolicy(snapshot);
  } catch (error) {
    const result = infrastructureResult({
      dataDir,
      generatedAt,
      snapshotPath,
      siteCount: Array.isArray(snapshot?.sites) ? snapshot.sites.length : 0,
      reason: `policy-evaluator-crash:${error.message}`,
      healthCheckExitCode: child.status,
    });
    writeResult(dataDir, result);
    writeStepSummary(snapshot, result);
    console.error(`[health-monitor] INFRA_FAILURE: ${result.validationErrors.join('; ')}`);
    process.exitCode = 3;
    return;
  }

  const result = {
    task: taskName,
    ...summarizeHealthPolicy(snapshot, policy),
    generatedAt: snapshot.generatedAt ?? generatedAt,
    snapshotPath,
    automationResultPath: resultPath(dataDir),
  };
  writeResult(dataDir, result);
  writeStepSummary(snapshot, policy);
  console.log(`[health-monitor] decision=${policy.decision} sites=${result.siteCount} page=${policy.counts.page} observe=${policy.counts.observe}`);
  process.exitCode = policy.exitCode;
}

run();
