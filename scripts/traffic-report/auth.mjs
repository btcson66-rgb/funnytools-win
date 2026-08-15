// 2026-08-16：改為優先使用備援帳號 zxc851558@gmail.com 的 user OAuth refresh token。
// 舊服務帳號 fable-gsc-reader 雖然能取 token，卻無法被加進 GSC／GA4 的使用者清單
// （GSC 回「找不到電子郵件」、GA4 回「這個電子郵件與 Google 帳戶不符」），
// 所以實際上只讀得到 worthcalc 一站。服務帳號保留為 fallback。
// 憑證產生方式見 scripts/fable-ops-authorize.mjs。
import { createSign } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { config } from './config.mjs';

const SECRET_DIR = join(dirname(dirname(dirname(fileURLToPath(import.meta.url)))), 'api token');
const OAUTH_CLIENT_PATH = join(SECRET_DIR, 'fable-ops-oauth-client.json');
const OAUTH_TOKEN_PATH = join(SECRET_DIR, 'fable-ops-token.json');

const base64Url = (v) => Buffer.from(v).toString('base64url');

const hasUserOAuth = () => existsSync(OAUTH_CLIENT_PATH) && existsSync(OAUTH_TOKEN_PATH);

async function userOAuthToken() {
  const raw = JSON.parse(readFileSync(OAUTH_CLIENT_PATH, 'utf8'));
  const client = raw.installed || raw.web || raw;
  const { refresh_token: refreshToken } = JSON.parse(readFileSync(OAUTH_TOKEN_PATH, 'utf8'));
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
  if (!resp.ok) throw new Error(`user OAuth refresh failed: ${resp.status} ${(await resp.text()).slice(0, 200)}`);
  return (await resp.json()).access_token;
}

async function serviceAccountToken() {
  const sa = config.serviceAccount;
  const now = Math.floor(Date.now() / 1000);
  const header = base64Url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claims = base64Url(JSON.stringify({
    iss: sa.client_email,
    scope: 'https://www.googleapis.com/auth/analytics.readonly https://www.googleapis.com/auth/webmasters.readonly',
    aud: sa.token_uri,
    iat: now,
    exp: now + 3600,
  }));
  const signer = createSign('RSA-SHA256');
  signer.update(`${header}.${claims}`);
  signer.end();
  const assertion = `${header}.${claims}.${signer.sign(sa.private_key, 'base64url')}`;

  const resp = await fetch(sa.token_uri, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion,
    }),
  });
  if (!resp.ok) throw new Error(`Google auth failed: ${resp.status} ${await resp.text()}`);
  const data = await resp.json();
  return data.access_token;
}

export async function getGoogleAccessToken() {
  if (hasUserOAuth()) {
    try {
      return await userOAuthToken();
    } catch (error) {
      process.emitWarning(`user OAuth 失效，改用服務帳號：${error.message}`);
    }
  }
  return serviceAccountToken();
}
