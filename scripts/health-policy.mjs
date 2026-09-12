const PAGE_WARNING_SUFFIXES = new Set([
  'deployment-stale-relevant',
  'deployment-current-source-failed',
  'deployment-ahead-or-diverged',
]);

function codeEndsWith(code, suffix) {
  return code === suffix || String(code ?? '').endsWith(`-${suffix}`);
}

export function classifyHealthIssue(issue) {
  const severity = String(issue?.severity ?? '').toLowerCase();
  const code = String(issue?.code ?? '');

  if (severity === 'critical') return 'PAGE';

  if (
    severity === 'warning'
    && [...PAGE_WARNING_SUFFIXES].some((suffix) => codeEndsWith(code, suffix))
  ) {
    return 'PAGE';
  }

  if (severity === 'warning' || severity === 'info') return 'OBSERVE';
  return 'OBSERVE';
}

export function validateHealthSnapshot(snapshot) {
  const errors = [];

  if (!snapshot || typeof snapshot !== 'object') {
    errors.push('snapshot-not-object');
    return errors;
  }

  if (snapshot.schemaVersion !== 4) {
    errors.push(`unsupported-schema:${snapshot.schemaVersion ?? 'missing'}`);
  }

  if (!Array.isArray(snapshot.sites)) {
    errors.push('sites-not-array');
  } else if (snapshot.sites.length === 0) {
    errors.push('sites-empty');
  }

  if (!Array.isArray(snapshot.issues)) errors.push('issues-not-array');
  return errors;
}

export function evaluateHealthPolicy(snapshot) {
  const validationErrors = validateHealthSnapshot(snapshot);

  if (validationErrors.length) {
    return {
      decision: 'INFRA_FAILURE',
      exitCode: 3,
      validationErrors,
      pageIssues: [],
      observeIssues: [],
      counts: { page: 0, observe: 0 },
    };
  }

  const pageIssues = [];
  const observeIssues = [];
  for (const issue of snapshot.issues) {
    if (classifyHealthIssue(issue) === 'PAGE') pageIssues.push(issue);
    else observeIssues.push(issue);
  }

  if (pageIssues.length) {
    return {
      decision: 'PAGE',
      exitCode: 2,
      validationErrors: [],
      pageIssues,
      observeIssues,
      counts: { page: pageIssues.length, observe: observeIssues.length },
    };
  }

  if (observeIssues.length) {
    return {
      decision: 'OBSERVE',
      exitCode: 0,
      validationErrors: [],
      pageIssues: [],
      observeIssues,
      counts: { page: 0, observe: observeIssues.length },
    };
  }

  return {
    decision: 'PASS',
    exitCode: 0,
    validationErrors: [],
    pageIssues: [],
    observeIssues: [],
    counts: { page: 0, observe: 0 },
  };
}

export function summarizeHealthPolicy(snapshot, policy) {
  return {
    schemaVersion: snapshot?.schemaVersion ?? null,
    generatedAt: snapshot?.generatedAt ?? null,
    siteCount: Array.isArray(snapshot?.sites) ? snapshot.sites.length : 0,
    decision: policy.decision,
    exitCode: policy.exitCode,
    counts: policy.counts,
    pageIssues: policy.pageIssues.map((issue) => ({
      site: issue.site ?? null,
      code: issue.code ?? null,
      severity: issue.severity ?? null,
      message: issue.message ?? null,
    })),
    observeIssues: policy.observeIssues.map((issue) => ({
      site: issue.site ?? null,
      code: issue.code ?? null,
      severity: issue.severity ?? null,
      message: issue.message ?? null,
    })),
  };
}
