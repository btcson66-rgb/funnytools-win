#!/usr/bin/env node
// One-time OAuth authorization for the Fable Company Ops desktop client.
//
// Obtains a long-lived refresh token for zxc851558@gmail.com covering Search Console
// and Google Analytics reads. Replaces the fable-gsc-reader service account, which
// Google's user-management systems refuse to resolve (see
// Company Vault/03_Incidents/2026-08-15-btcson66-google-lockout-asset-audit.md).
//
// Usage: node scripts/fable-ops-authorize.mjs
// Writes: "api token/fable-ops-token.json"  (refresh token; never commit)

import fs from 'node:fs';
import http from 'node:http';
import crypto from 'node:crypto';
import path from 'node:path';
import { spawn } from 'node:child_process';

const TOKEN_DIR = path.join(process.cwd(), 'api token');
const CLIENT_FILE = path.join(TOKEN_DIR, 'fable-ops-oauth-client.json');
const TOKEN_FILE = path.join(TOKEN_DIR, 'fable-ops-token.json');

// webmasters (not .readonly) is required because the release pipeline submits sitemaps to
// Search Console; the read-only scope resolves properties but rejects the PUT with
// ACCESS_TOKEN_SCOPE_INSUFFICIENT. Analytics stays read-only — nothing here writes to GA4.
// adsense.readonly (not the full `adsense` scope) lets scripts/adsense-status.mjs
// read account alerts, per-site review state and policy issues. The full scope
// would also allow dismissing alerts and changing settings on the revenue
// account, which nothing here needs. The AdSense Management API does not
// support service accounts, so this user grant is the only way in.
const SCOPES = [
  'https://www.googleapis.com/auth/webmasters',
  'https://www.googleapis.com/auth/analytics.readonly',
  'https://www.googleapis.com/auth/adsense.readonly',
];

function b64url(buf) {
  return Buffer.from(buf).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

const raw = JSON.parse(fs.readFileSync(CLIENT_FILE, 'utf8'));
const client = raw.installed || raw.web || raw;

// PKCE — required for desktop clients.
const verifier = b64url(crypto.randomBytes(32));
const challenge = b64url(crypto.createHash('sha256').update(verifier).digest());
const state = b64url(crypto.randomBytes(16));

const server = http.createServer();
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const port = server.address().port;
const redirectUri = `http://127.0.0.1:${port}/callback`;

const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
authUrl.searchParams.set('client_id', client.client_id);
authUrl.searchParams.set('redirect_uri', redirectUri);
authUrl.searchParams.set('response_type', 'code');
authUrl.searchParams.set('scope', SCOPES.join(' '));
authUrl.searchParams.set('access_type', 'offline');
authUrl.searchParams.set('prompt', 'consent');
authUrl.searchParams.set('code_challenge', challenge);
authUrl.searchParams.set('code_challenge_method', 'S256');
authUrl.searchParams.set('state', state);

// `start` hands the URL to Windows' default browser, which is not necessarily the
// one the Google account is signed in to (Edge is the common default; the ops
// account lives in Chrome). Copying the printed URL into the right browser has
// always worked — the callback listener is on 127.0.0.1, so any local browser
// reaches it — but the auto-opened window made it look like the flow was stuck.
// --browser picks one explicitly, --no-open skips the launch entirely.
const browserArg = process.argv.find((a) => a.startsWith('--browser='))?.slice('--browser='.length);
const skipOpen = process.argv.includes('--no-open');

console.log('請在瀏覽器完成授權（帳號必須是 zxc851558@gmail.com）：');
console.log('');
console.log(authUrl.toString());
console.log('');
console.log('若自動開啟的不是登入該帳號的瀏覽器，直接把上面整條網址複製過去開即可。');

if (!skipOpen) {
  // `start` treats its first quoted argument as a window title, hence the empty
  // string; a named browser goes in that slot's place as the program to run.
  const args = browserArg
    ? ['/c', 'start', browserArg, authUrl.toString()]
    : ['/c', 'start', '', authUrl.toString()];
  spawn('cmd', args, { detached: true, stdio: 'ignore' }).unref();
}

const code = await new Promise((resolve, reject) => {
  const timer = setTimeout(() => reject(new Error('等待授權逾時（5 分鐘）')), 5 * 60 * 1000);
  server.on('request', (req, res) => {
    const url = new URL(req.url, `http://127.0.0.1:${port}`);
    if (url.pathname !== '/callback') {
      res.writeHead(404).end();
      return;
    }
    const err = url.searchParams.get('error');
    const got = url.searchParams.get('code');
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    res.end(`<meta charset="utf-8"><h2>${err ? '授權失敗：' + err : '授權完成，可以關閉這個分頁。'}</h2>`);
    clearTimeout(timer);
    if (err) reject(new Error(err));
    else if (url.searchParams.get('state') !== state) reject(new Error('state 不符，中止'));
    else resolve(got);
  });
});
server.close();

const res = await fetch('https://oauth2.googleapis.com/token', {
  method: 'POST',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    client_id: client.client_id,
    client_secret: client.client_secret,
    redirect_uri: redirectUri,
    code_verifier: verifier,
  }),
});
const tok = await res.json();
if (!res.ok || !tok.refresh_token) {
  console.error(`交換 token 失敗 HTTP ${res.status}: ${tok.error || ''} ${tok.error_description || ''}`);
  process.exit(1);
}

fs.writeFileSync(
  TOKEN_FILE,
  `${JSON.stringify({ refresh_token: tok.refresh_token, scopes: SCOPES, obtained: new Date().toISOString() }, null, 2)}\n`,
  'utf8',
);

// Read back the granted identity so the operator can confirm the right account authorized.
const who = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
  headers: { authorization: `Bearer ${tok.access_token}` },
});
const label = who.ok ? (await who.json()).email || '(未授予 email scope)' : `userinfo HTTP ${who.status}`;

console.log(`已寫入 ${TOKEN_FILE}`);
console.log(`授權帳號：${label}`);
console.log(`授予範圍：${tok.scope}`);
