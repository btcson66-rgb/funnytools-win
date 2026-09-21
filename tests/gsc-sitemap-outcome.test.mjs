import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';

import { resolveSitemapOutcome } from '../scripts/gsc-sitemap-outcome.mjs';

const root = new URL('..', import.meta.url);

// 這組測試守的是「哪一種問題該擋部署」的邊界。兩條規則不可互換：
//
//   提交失敗（API／授權／PUT 被拒）→ 管線壞了 → 一定紅。這是 CLAUDE.md 風險紅線
//   第 6 條，2026-08-31 roomfeng 曾因重構漏掉 process.exitCode 而真的靜默跳過過。
//
//   sitemap 從未被 Google 擷取 → 真問題，但不是這次 push 造成的，也不是任何一次
//   push 修得好的 → 不擋部署。funnytools 的 6 筆 sitemap 於 2026-09-03 提交，
//   14 天後跨過舊門檻，從 09-17 起每一次 push 都紅在同一行，一次都沒綠過。
//   roomfeng 撞過同一件事、連紅兩週，已於 2026-09-06 改掉；這份是分岔出去沒拿到
//   修正的副本。詳見 gsc-sitemap-outcome.mjs 檔頭。

test('提交失敗一定紅', () => {
  const outcome = resolveSitemapOutcome({ failureCount: 1, submittedCount: 3, alertCount: 4 });
  assert.equal(outcome.status, 'failed');
  assert.equal(outcome.exitCode, 1);
});

test('從未被擷取不擋部署，但狀態、訊息與 stuck 旗標必須保留下來', () => {
  const outcome = resolveSitemapOutcome({ registeredCount: 7, alertCount: 7 });
  assert.equal(outcome.status, 'registered_never_fetched');
  assert.equal(outcome.exitCode, 0);
  assert.equal(outcome.stuck, true);
  // 訊息要明說這條線由誰負責，否則下一個人會以為它被吃掉了。
  assert.match(outcome.message, /health monitor/);
  assert.match(outcome.message, /無法擷取/);
});

test('有新提交但同時有從未被擷取的項目，仍然算成功', () => {
  const outcome = resolveSitemapOutcome({ submittedCount: 1, registeredCount: 6, alertCount: 2 });
  assert.equal(outcome.status, 'submitted');
  assert.equal(outcome.exitCode, 0);
  assert.equal(outcome.stuck, true);
});

test('有新提交且沒有告警，成功', () => {
  const outcome = resolveSitemapOutcome({ submittedCount: 2, registeredCount: 5 });
  assert.equal(outcome.status, 'submitted');
  assert.equal(outcome.exitCode, 0);
  assert.equal(outcome.stuck, false);
});

test('全部已註冊且沒有告警，成功', () => {
  const outcome = resolveSitemapOutcome({ registeredCount: 7 });
  assert.equal(outcome.status, 'already_registered');
  assert.equal(outcome.exitCode, 0);
});

test('沒有任何輸入時不會爆，視為全部已註冊', () => {
  const outcome = resolveSitemapOutcome();
  assert.equal(outcome.status, 'already_registered');
  assert.equal(outcome.exitCode, 0);
});

test('提交腳本確實使用這個純函式，而不是自己再寫一組分支', async () => {
  const script = await readFile(new URL('scripts/gsc-submit-sitemaps.mjs', root), 'utf8');
  assert.match(script, /import \{ resolveSitemapOutcome \}/);
  assert.match(script, /const outcome = resolveSitemapOutcome\(/);
  assert.match(script, /if \(outcome\.exitCode !== 0\) process\.exitCode = outcome\.exitCode;/);
  // 舊的分支寫法不該還留在腳本裡，否則兩份規則會再度分岔。
  assert.doesNotMatch(script, /report\.status = 'registered_pending';/);
});

// 這一條守的是 2026-09-21 修掉的凍結狀態：只要 GSC 回報「已註冊」就永遠不再 PUT，
// funnytools 自 2026-09-03 之後就再也沒有送出過任何一次提交，狀態永遠停在無法擷取。
test('從未被擷取的項目會改走 PUT，而不是直接 continue', async () => {
  const script = await readFile(new URL('scripts/gsc-submit-sitemaps.mjs', root), 'utf8');
  assert.match(script, /const RESUBMIT_AFTER_DAYS = \d+;/);
  assert.match(script, /function needsResubmission\(/);
  assert.match(script, /!forceSubmit && !resubmitting/);
  // 已經下載過的項目永遠不重送，否則每次部署都會 PUT。
  assert.match(script, /return !entry\.lastDownloaded && submittedBefore\(/);
});

test('告警仍然有出口：印到 stderr，不是只留在 JSON 裡', async () => {
  const script = await readFile(new URL('scripts/gsc-submit-sitemaps.mjs', root), 'utf8');
  assert.match(script, /for \(const alert of report\.alerts\) console\.error\(alert\);/);
});
