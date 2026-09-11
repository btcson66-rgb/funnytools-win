const SOURCE_NO_ACCESS_STATUSES = new Set([401, 403, 429]);

function observedBoolean(observation, primary, alias) {
  if (typeof observation?.[primary] === 'boolean') return observation[primary];
  if (typeof observation?.[alias] === 'boolean') return observation[alias];
  return false;
}

export function evaluateContractProbe(probe, observation = {}) {
  const issues = [];
  const id = String(probe?.id ?? 'contract-probe');
  const status = Number(observation.status ?? 0);
  const expectedStatus = Number(probe?.expectStatus ?? 200);
  if (status !== expectedStatus) {
    issues.push({ severity: 'critical', code: `${id}-http-error`, message: `${id} HTTP ${status}; expected ${expectedStatus}` });
    return issues;
  }

  const noindex = Boolean(observation.noindex);
  if (typeof probe?.expectNoindex === 'boolean' && noindex !== probe.expectNoindex) {
    issues.push({ severity: probe.expectNoindex ? 'critical' : 'warning', code: `${id}-noindex-mismatch`, message: `${id} noindex=${noindex}; expected ${probe.expectNoindex}` });
  }
  const analytics = observedBoolean(observation, 'analytics', 'hasAnalytics');
  if (typeof probe?.expectAnalytics === 'boolean' && analytics !== probe.expectAnalytics) {
    const unexpected = probe.expectAnalytics === false && analytics;
    issues.push({ severity: unexpected ? 'critical' : 'warning', code: `${id}-analytics-${unexpected ? 'unexpected' : 'missing'}`, message: `${id} analytics=${analytics}; expected ${probe.expectAnalytics}` });
  }
  const adsense = observedBoolean(observation, 'adsense', 'hasAdsense');
  if (typeof probe?.expectAdsense === 'boolean' && adsense !== probe.expectAdsense) {
    const unexpected = probe.expectAdsense === false && adsense;
    issues.push({ severity: unexpected ? 'critical' : 'warning', code: `${id}-adsense-${unexpected ? 'unexpected' : 'missing'}`, message: `${id} adsense=${adsense}; expected ${probe.expectAdsense}` });
  }
  const body = String(observation.body ?? observation.html ?? '');
  for (const pattern of probe?.forbidPatterns ?? []) {
    const needle = String(pattern);
    if (needle && body.toLowerCase().includes(needle.toLowerCase())) {
      issues.push({ severity: 'critical', code: `${id}-forbidden-pattern`, message: `${id} contains forbidden pattern: ${needle}` });
    }
  }
  return issues;
}

export function evaluateJsonHealth(service, observation = {}) {
  const issues = [];
  const id = String(service?.id ?? 'service');
  const status = Number(observation.status ?? 0);
  const expectedStatus = Number(service?.expectStatus ?? 200);
  if (status !== expectedStatus) {
    issues.push({ severity: 'critical', code: `${id}-http-error`, message: `${id} HTTP ${status}; expected ${expectedStatus}` });
    return issues;
  }
  const json = observation.json ?? {};
  for (const [key, expected] of Object.entries(service?.expectJson ?? {})) {
    if (json?.[key] !== expected) {
      issues.push({ severity: 'critical', code: `${id}-${key}-mismatch`, message: `${id} JSON ${key}=${String(json?.[key])}; expected ${String(expected)}` });
    }
  }
  return issues;
}

export function classifySourceIdentity(observation = {}) {
  const status = Number(observation.status ?? 0);
  const sha = String(observation.sha ?? '').trim();
  if (status === 200 && /^[0-9a-f]{7,64}$/i.test(sha)) return { state: 'COMPLETE', mainSha: sha };
  if (SOURCE_NO_ACCESS_STATUSES.has(status) || observation.rateLimited === true) return { state: 'NO_ACCESS', mainSha: null };
  return { state: 'UNKNOWN', mainSha: null };
}

export function diffSourceIdentity(previousSha, currentSha) {
  const previous = String(previousSha ?? '').trim();
  const current = String(currentSha ?? '').trim();
  if (!previous || !current || previous === current) return { changed: false, type: null, severity: null, from: previous || null, to: current || null };
  return { changed: true, type: 'SOURCE_MAIN_ADVANCED', severity: 'info', from: previous, to: current };
}

export function summarizeKnownBaselines(items = []) {
  return items.map((item) => ({
    id: String(item?.id ?? ''),
    site: String(item?.site ?? ''),
    state: String(item?.state ?? 'KNOWN_DEBT'),
    severity: String(item?.severity ?? 'info'),
    description: String(item?.description ?? ''),
  }));
}
