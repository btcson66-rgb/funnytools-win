#!/usr/bin/env node
// Reads the AdSense account's alerts, per-site review state and policy issues.
//
// Why this exists: until now the only way to learn that AdSense had flagged
// something — a policy violation, a site knocked out of review, an account
// warning — was for a human to remember to open the console. A policy action
// stops revenue immediately, so "someone notices eventually" is the wrong
// detection mechanism for the company's main income source.
//
// Auth: the AdSense Management API does NOT support service accounts (it is
// user-scoped data), so this reuses the ops desktop OAuth client that already
// authorizes as zxc851558@gmail.com for Search Console and GA4. That is the
// same Google account the AdSense account belongs to, so no second client is
// needed — the scope just has to be present on the refresh token. Re-run
//   node scripts/fable-ops-authorize.mjs
// once after this ships to add adsense.readonly to the existing grant.
//
// Read-only by design. The API can dismiss alerts and mutate settings under the
// full `adsense` scope; this deliberately asks for `adsense.readonly` only, so
// an automation bug can never touch the revenue account's configuration.
//
// Usage: node scripts/adsense-status.mjs [--json]
// Exit:  0 = ran successfully (findings, if any, are in the report)
//        1 = the script itself failed (auth, network, unexpected API error)
//        2 = setup incomplete (no credentials, or the token lacks the scope)

import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)));
const TOKEN_DIR = join(rootDir, 'api token');
const CLIENT_FILE = join(TOKEN_DIR, 'fable-ops-oauth-client.json');
const TOKEN_FILE = join(TOKEN_DIR, 'fable-ops-token.json');
const API = 'https://adsense.googleapis.com/v2';

const jsonOnly = process.argv.includes('--json');
const log = (...args) => { if (!jsonOnly) console.log(...args); };

/** Exit 2 rather than 1: nothing is broken, the one-time setup just is not done. */
function setupNeeded(message) {
  console.error(`AdSense 狀態檢查尚未啟用：${message}`);
  process.exit(2);
}

async function accessToken() {
  if (!existsSync(CLIENT_FILE) || !existsSync(TOKEN_FILE)) {
    setupNeeded(`找不到 ${CLIENT_FILE} 或 ${TOKEN_FILE}，請先跑 node scripts/fable-ops-authorize.mjs`);
  }
  const raw = JSON.parse(readFileSync(CLIENT_FILE, 'utf8'));
  const client = raw.installed || raw.web || raw;
  const { refresh_token: refreshToken } = JSON.parse(readFileSync(TOKEN_FILE, 'utf8'));
  const resp = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: client.client_id,
      client_secret: client.client_secret,
    }),
  });
  if (!resp.ok) {
    throw new Error(`OAuth refresh 失敗：${resp.status} ${(await resp.text()).slice(0, 300)}`);
  }
  return (await resp.json()).access_token;
}

async function api(token, path) {
  const resp = await fetch(`${API}/${path}`, { headers: { authorization: `Bearer ${token}` } });
  const body = await resp.text();
  if (resp.status === 403 && /ACCESS_TOKEN_SCOPE_INSUFFICIENT|insufficient/i.test(body)) {
    setupNeeded('目前的 refresh token 沒有 adsense.readonly 權限，請重跑 node scripts/fable-ops-authorize.mjs 重新授權');
  }
  if (resp.status === 403 && /SERVICE_DISABLED|has not been used/i.test(body)) {
    setupNeeded('Google Cloud 專案尚未啟用 AdSense Management API，請到 Cloud Console 啟用後再試');
  }
  if (!resp.ok) throw new Error(`AdSense API ${path} 回 ${resp.status}：${body.slice(0, 300)}`);
  return JSON.parse(body || '{}');
}

const token = await accessToken();

// Resolve the account rather than hardcoding it: if the publisher ID ever moves
// again, a wrong hardcoded value would silently report on nothing.
const { accounts = [] } = await api(token, 'accounts');
if (accounts.length === 0) setupNeeded('這個 Google 帳號底下沒有任何 AdSense 帳戶');
const account = accounts[0];
if (accounts.length > 1) {
  log(`注意：此 Google 帳號有 ${accounts.length} 個 AdSense 帳戶，本次讀取 ${account.name}`);
}

const [alerts, sites, policyIssues] = await Promise.all([
  api(token, `${account.name}/alerts`).then((r) => r.alerts ?? []),
  api(token, `${account.name}/sites`).then((r) => r.sites ?? []),
  api(token, `${account.name}/policyIssues`).then((r) => r.policyIssues ?? []),
]);

const snapshot = {
  checkedAt: new Date().toISOString(),
  account: { name: account.name, displayName: account.displayName, state: account.state },
  alerts,
  sites,
  policyIssues,
};

const dataDir = join(rootDir, 'reports', 'data', 'adsense');
mkdirSync(dataDir, { recursive: true });
writeFileSync(join(dataDir, 'latest-status.json'), `${JSON.stringify(snapshot, null, 2)}\n`);

if (jsonOnly) {
  console.log(JSON.stringify(snapshot, null, 2));
  process.exit(0);
}

log(`AdSense 帳戶：${account.displayName ?? account.name}（${account.name}）`);
if (account.state) log(`帳戶狀態：${account.state}`);

log(`\n網站（${sites.length}）`);
if (sites.length === 0) {
  log('  無——後台尚未新增任何網站');
}
for (const site of sites) {
  // REQUIRES_REVIEW / GETTING_READY / READY / NEEDS_ATTENTION
  log(`  ${site.domain ?? site.name}：${site.state ?? '狀態未知'}${site.autoAdsEnabled ? '（自動廣告開啟）' : ''}`);
}

log(`\n帳戶警示（${alerts.length}）`);
if (alerts.length === 0) log('  無');
for (const alert of alerts) {
  log(`  [${alert.severity ?? 'UNKNOWN'}] ${alert.message ?? alert.type ?? alert.name}`);
}

log(`\n政策問題（${policyIssues.length}）`);
if (policyIssues.length === 0) log('  無');
for (const issue of policyIssues) {
  const topics = (issue.policyTopics ?? []).map((t) => t.topic ?? t.type).filter(Boolean).join('、');
  log(`  [${issue.action ?? '未指明處置'}] ${issue.entityType ?? ''} ${issue.uri ?? issue.site ?? ''}`);
  if (topics) log(`      違規項目：${topics}`);
  if (issue.warningEscalationDate) {
    const d = issue.warningEscalationDate;
    log(`      升級為停播日期：${d.year}-${String(d.month).padStart(2, '0')}-${String(d.day).padStart(2, '0')}`);
  }
}

const needsAttention = sites.filter((s) => s.state === 'NEEDS_ATTENTION');
const severeAlerts = alerts.filter((a) => a.severity === 'SEVERE');
log('');
if (policyIssues.length > 0 || severeAlerts.length > 0 || needsAttention.length > 0) {
  log('需要處理：');
  if (policyIssues.length > 0) log(`  - ${policyIssues.length} 項政策問題`);
  if (severeAlerts.length > 0) log(`  - ${severeAlerts.length} 則嚴重警示`);
  if (needsAttention.length > 0) log(`  - ${needsAttention.length} 個網站狀態為 NEEDS_ATTENTION`);
} else {
  log('沒有政策問題、嚴重警示或需要注意的網站。');
}
log(`\n快照已寫入 ${join(dataDir, 'latest-status.json')}`);
