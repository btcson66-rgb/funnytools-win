import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';
import {
  classifySourceIdentity,
  diffSourceIdentity,
  evaluateContractProbe,
  evaluateJsonHealth,
  summarizeKnownBaselines,
} from '../scripts/health-contracts.mjs';

const privateProbe = {
  id: 'private-app-en',
  expectStatus: 200,
  expectNoindex: true,
  expectAnalytics: false,
  expectAdsense: false,
  forbidPatterns: ['googletagmanager.com/gtag/js', 'adsbygoogle', 'doubleclick.net'],
};

test('FamilyBoard private app passes the noindex and telemetry-free contract', () => {
  assert.deepEqual(evaluateContractProbe(privateProbe, {
    status: 200,
    noindex: true,
    analytics: false,
    adsense: false,
    body: '<html><meta name="robots" content="noindex">private app</html>',
  }), []);
});

test('FamilyBoard private app GA4 leak is critical', () => {
  const issues = evaluateContractProbe(privateProbe, { status: 200, noindex: true, analytics: true, adsense: false, body: 'gtag' });
  assert.equal(issues[0].severity, 'critical');
  assert.equal(issues[0].code, 'private-app-en-analytics-unexpected');
});

test('FamilyBoard private app AdSense leak is critical', () => {
  const issues = evaluateContractProbe(privateProbe, { status: 200, noindex: true, analytics: false, adsense: true, body: 'adsbygoogle' });
  assert.equal(issues[0].severity, 'critical');
  assert.equal(issues[0].code, 'private-app-en-adsense-unexpected');
});

test('FamilyBoard private app losing noindex is critical', () => {
  const issues = evaluateContractProbe(privateProbe, { status: 200, noindex: false, analytics: false, adsense: false, body: '' });
  assert.equal(issues[0].severity, 'critical');
  assert.equal(issues[0].code, 'private-app-en-noindex-mismatch');
});

test('FamilyBoard forbidden telemetry token is a critical synthetic mutation', () => {
  const issues = evaluateContractProbe(privateProbe, { status: 200, noindex: true, analytics: false, adsense: false, body: '<script src="https://www.googletagmanager.com/gtag/js?id=G-TEST"></script>' });
  assert.equal(issues.some((issue) => issue.code === 'private-app-en-forbidden-pattern'), true);
  assert.equal(issues.every((issue) => issue.severity === 'critical'), true);
});

test('FunnyTools API health accepts arbitrary version and revision when ok is true', () => {
  assert.deepEqual(evaluateJsonHealth({ id: 'conversion-api', expectStatus: 200, expectJson: { ok: true } }, {
    status: 200,
    json: { ok: true, version: 'future', revision: 'abc123' },
  }), []);
});

test('FunnyTools API ok=false is critical', () => {
  const issues = evaluateJsonHealth({ id: 'conversion-api', expectStatus: 200, expectJson: { ok: true } }, { status: 200, json: { ok: false } });
  assert.equal(issues[0].severity, 'critical');
  assert.equal(issues[0].code, 'conversion-api-ok-mismatch');
});

test('Source identity 200 with a SHA is COMPLETE', () => {
  assert.deepEqual(classifySourceIdentity({ status: 200, sha: 'abc1234' }), { state: 'COMPLETE', mainSha: 'abc1234' });
});

test('Source identity 403 is NO_ACCESS without a health failure', () => {
  assert.deepEqual(classifySourceIdentity({ status: 403 }), { state: 'NO_ACCESS', mainSha: null });
});

test('Source main advance is an informational change event', () => {
  assert.deepEqual(diffSourceIdentity('aaa', 'bbb'), { changed: true, type: 'SOURCE_MAIN_ADVANCED', severity: 'info', from: 'aaa', to: 'bbb' });
});

test('Unchanged or incomplete source identity creates no change event', () => {
  assert.equal(diffSourceIdentity('aaa', 'aaa').changed, false);
  assert.equal(diffSourceIdentity(null, 'bbb').changed, false);
});

test('Known baselines remain separate from active health issues', () => {
  const result = summarizeKnownBaselines([
    { id: 'A', site: 'funnytools', state: 'KNOWN_DEBT', severity: 'info', description: 'one' },
    { id: 'B', site: 'funnytools', state: 'KNOWN_ARCHITECTURE_RISK', severity: 'info', description: 'two' },
  ]);
  assert.equal(result.length, 2);
  assert.equal(result.every((item) => item.severity === 'info'), true);
});

test('Task09A config has four sites and two FamilyBoard private probes', async () => {
  const config = JSON.parse(await readFile(new URL('../config/company.json', import.meta.url), 'utf8'));
  assert.deepEqual(config.sites.map((site) => site.id), ['funnytools', 'roomfeng', 'worthcalc', 'familyboard']);
  assert.equal(config.sites.find((site) => site.id === 'funnytools').services[0].id, 'conversion-api');
  assert.equal(config.sites.find((site) => site.id === 'familyboard').contractProbes.length, 2);
});

