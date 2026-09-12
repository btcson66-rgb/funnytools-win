const FAILURE_STATES = new Set(['failure', 'error']);

export function normalizeSha(value) {
  const sha = String(value ?? '').trim().toLowerCase();
  return /^[0-9a-f]{7,64}$/.test(sha) ? sha : null;
}

export function minutesSince(iso, nowMs = Date.now()) {
  if (!iso) return null;
  const timestamp = Date.parse(iso);
  if (!Number.isFinite(timestamp)) return null;
  return Math.max(0, (nowMs - timestamp) / 60_000);
}

export function pathMatchesSourceScope(
  filePath,
  scope = { mode: 'all-main' },
) {
  const file = String(filePath ?? '').replace(/\\/g, '/');

  if (!file) return false;
  if (!scope || scope.mode === 'all-main') return true;
  if (scope.mode !== 'paths') return false;

  if ((scope.exactPaths ?? []).includes(file)) {
    return true;
  }

  return (scope.pathPrefixes ?? [])
    .some((prefix) => file.startsWith(String(prefix)));
}

export function relevantChangedFiles(
  files = [],
  scope = { mode: 'all-main' },
) {
  return files
    .map((item) =>
      typeof item === 'string'
        ? item
        : item?.filename
    )
    .filter(Boolean)
    .filter((file) =>
      pathMatchesSourceScope(file, scope)
    );
}

export function evaluateDeploymentFreshness({
  sourceSha,
  sourceCommittedAt,
  deploymentSha,
  latestAttemptSha = null,
  latestAttemptState = null,
  sourceScope = { mode: 'all-main' },
  compare = null,
  graceMinutes = 45,
  nowMs = Date.now(),
}) {
  const source = normalizeSha(sourceSha);
  const deployed = normalizeSha(deploymentSha);
  const attempt = normalizeSha(latestAttemptSha);

  const attemptState =
    String(latestAttemptState ?? '').toLowerCase();

  const sourceAgeMinutes =
    minutesSince(sourceCommittedAt, nowMs);

  if (!source) {
    return {
      state: 'UNKNOWN_SOURCE',
      severity: null,
      relevantFiles: [],
      sourceAgeMinutes,
    };
  }

  if (
    attempt === source
    && FAILURE_STATES.has(attemptState)
  ) {
    return {
      state: 'FAILED_CURRENT_SOURCE',
      severity: 'warning',
      relevantFiles: [],
      sourceAgeMinutes,
    };
  }

  if (!deployed) {
    return {
      state: 'UNKNOWN_DEPLOYMENT',
      severity: null,
      relevantFiles: [],
      sourceAgeMinutes,
    };
  }

  if (deployed === source) {
    return {
      state: 'CURRENT',
      severity: null,
      relevantFiles: [],
      sourceAgeMinutes,
    };
  }

  const relation = compare?.status ?? null;

  if (!relation) {
    return {
      state: 'UNKNOWN_RELATION',
      severity: null,
      relevantFiles: [],
      sourceAgeMinutes,
    };
  }

  if (
    relation === 'behind'
    || relation === 'diverged'
  ) {
    return {
      state: 'DEPLOYMENT_AHEAD_OR_DIVERGED',
      severity: 'warning',
      relevantFiles: [],
      sourceAgeMinutes,
    };
  }

  if (relation === 'identical') {
    return {
      state: 'CURRENT',
      severity: null,
      relevantFiles: [],
      sourceAgeMinutes,
    };
  }

  if (relation !== 'ahead') {
    return {
      state: 'UNKNOWN_RELATION',
      severity: null,
      relevantFiles: [],
      sourceAgeMinutes,
    };
  }

  let relevantFiles = [];

  if (sourceScope?.mode === 'paths') {
    if (compare?.complete !== true) {
      return {
        state: 'UNKNOWN_SCOPE',
        severity: null,
        relevantFiles: [],
        sourceAgeMinutes,
      };
    }

    relevantFiles = relevantChangedFiles(
      compare.files ?? [],
      sourceScope,
    );

    if (relevantFiles.length === 0) {
      return {
        state: 'CURRENT_FOR_SCOPE',
        severity: null,
        relevantFiles,
        sourceAgeMinutes,
      };
    }
  }

  if (sourceAgeMinutes === null) {
    return {
      state: 'PENDING_UNKNOWN_AGE',
      severity: null,
      relevantFiles,
      sourceAgeMinutes,
    };
  }

  if (
    sourceAgeMinutes
    <= Number(graceMinutes ?? 45)
  ) {
    return {
      state: 'PENDING',
      severity: null,
      relevantFiles,
      sourceAgeMinutes,
    };
  }

  return {
    state: 'STALE_RELEVANT',
    severity: 'warning',
    relevantFiles,
    sourceAgeMinutes,
  };
}

export function deploymentFreshnessIssue(
  freshness,
) {
  switch (freshness?.state) {
    case 'FAILED_CURRENT_SOURCE':
      return {
        severity: 'warning',
        code: 'deployment-current-source-failed',
      };

    case 'STALE_RELEVANT':
      return {
        severity: 'warning',
        code: 'deployment-stale-relevant',
      };

    case 'DEPLOYMENT_AHEAD_OR_DIVERGED':
      return {
        severity: 'warning',
        code: 'deployment-ahead-or-diverged',
      };

    case 'PENDING':
      return {
        severity: 'info',
        code: 'deployment-pending',
      };

    case 'PENDING_UNKNOWN_AGE':
      return {
        severity: 'info',
        code: 'deployment-pending-unknown-age',
      };

    case 'UNKNOWN_SCOPE':
      return {
        severity: 'info',
        code: 'deployment-scope-unknown',
      };

    case 'UNKNOWN_RELATION':
      return {
        severity: 'info',
        code: 'deployment-relation-unknown',
      };

    case 'UNKNOWN_DEPLOYMENT':
      return {
        severity: 'info',
        code: 'deployment-identity-unknown',
      };

    default:
      return null;
  }
}

export function normalizeGithubPagesDeployment(
  deployment,
  latestStatus,
) {
  const hasRecord = Boolean(deployment);
  const sha = normalizeSha(deployment?.sha);

  return {
    provider: 'github-pages',

    evidence:
      hasRecord && latestStatus?.state === 'success' && sha
        ? 'VERIFIED'
        : hasRecord
          ? 'PARTIAL'
          : 'UNKNOWN',

    deploymentId: deployment?.id ?? null,
    deploymentSha: sha,
    deploymentRef: deployment?.ref ?? null,

    deploymentCreatedAt:
      deployment?.created_at ?? null,

    providerState:
      latestStatus?.state ?? null,

    environment:
      latestStatus?.environment
      ?? deployment?.environment
      ?? null,

    environmentUrl:
      latestStatus?.environment_url ?? null,
  };
}

export function normalizeCloudflarePagesProject(
  responseJson,
) {
  const deployment =
    responseJson?.result?.canonical_deployment
    ?? null;

  const metadata =
    deployment?.deployment_trigger?.metadata
    ?? {};

  const stage =
    deployment?.latest_stage ?? null;

  const hasRecord = Boolean(deployment);

  const sha =
    normalizeSha(metadata.commit_hash);

  return {
    provider: 'cloudflare-pages',

    evidence:
      hasRecord && sha && stage?.status === 'success'
        ? 'VERIFIED'
        : hasRecord
          ? 'PARTIAL'
          : 'UNKNOWN',

    deploymentId:
      deployment?.id ?? null,

    deploymentSha: sha,

    deploymentRef:
      metadata.branch ?? null,

    deploymentCreatedAt:
      deployment?.created_on ?? null,

    providerState:
      stage?.status ?? null,

    environment:
      deployment?.environment ?? null,

    environmentUrl:
      deployment?.url ?? null,
  };
}

export function normalizeWorkflowDeployment({
  run,
  job = null,
  step = null,
}) {
  const state =
    step?.conclusion
    ?? job?.conclusion
    ?? run?.conclusion
    ?? null;

  const successful = state === 'success';

  return {
    provider: 'github-actions-workflow',

    evidence:
      successful
        ? 'PARTIAL'
        : 'UNKNOWN',

    deploymentId:
      run?.id ?? null,

    deploymentSha:
      successful
        ? normalizeSha(run?.head_sha)
        : null,

    deploymentRef:
      run?.head_branch ?? null,

    deploymentCreatedAt:
      run?.updated_at
      ?? run?.created_at
      ?? null,

    providerState: state,

    environment: null,

    environmentUrl:
      run?.html_url ?? null,
  };
}

export function diffDeploymentIdentity(
  previous,
  current,
) {
  const changes = [];

  if (!current) {
    return changes;
  }

  if (!previous) {
    changes.push({
      type:
        'DEPLOYMENT_IDENTITY_BASELINE_ESTABLISHED',
      from: null,
      to: current.deploymentSha ?? null,
    });

    return changes;
  }

  if (
    (previous.deploymentSha ?? null)
    !==
    (current.deploymentSha ?? null)
  ) {
    changes.push({
      type: 'DEPLOYMENT_ADVANCED',
      from: previous.deploymentSha ?? null,
      to: current.deploymentSha ?? null,
    });
  }

  if (
    (previous.evidence ?? null)
    !==
    (current.evidence ?? null)
  ) {
    changes.push({
      type: 'DEPLOYMENT_EVIDENCE_CHANGED',
      from: previous.evidence ?? null,
      to: current.evidence ?? null,
    });
  }

  if (
    (previous.freshness?.state ?? null)
    !==
    (current.freshness?.state ?? null)
  ) {
    changes.push({
      type: 'DEPLOYMENT_FRESHNESS_CHANGED',
      from:
        previous.freshness?.state ?? null,
      to:
        current.freshness?.state ?? null,
    });
  }

  return changes;
}
