import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';

import { resolveSitemapOutcome } from '../scripts/gsc-sitemap-outcome.mjs';

const root = new URL('..', import.meta.url);

// 這組測試守的是一條規則：卡住的 sitemap 必須讓提交步驟失敗。
// roomfeng 的同一段邏輯曾經因為重構漏掉退出碼而回歸成靜默跳過
//（CLAUDE.md 風險紅線第 6 條），funnytools 這邊是同樣的寫法。

test('卡住的 sitemap 讓步驟失敗，而不是靜默回報成功', () => {
  const outcome = resolveSitemapOutcome({ registeredCount: 7, alertCount: 7 });
  assert.equal(outcome.status, 'registered_pending');
  assert.equal(outcome.exitCode, 1);
  assert.match(outcome.message, /Failing the step/);
});

test('有新提交但同時有卡住的項目，仍然要失敗', () => {
  const outcome = resolveSitemapOutcome({ submittedCount: 1, registeredCount: 6, alertCount: 2 });
  assert.equal(outcome.status, 'submitted');
  assert.equal(outcome.exitCode, 1);
});

test('有新提交且沒有卡住，成功', () => {
  const outcome = resolveSitemapOutcome({ submittedCount: 2, registeredCount: 5 });
  assert.equal(outcome.status, 'submitted');
  assert.equal(outcome.exitCode, 0);
});

test('全部已註冊且沒有卡住，成功', () => {
  const outcome = resolveSitemapOutcome({ registeredCount: 7 });
  assert.equal(outcome.status, 'already_registered');
  assert.equal(outcome.exitCode, 0);
});

test('有路徑失敗時，失敗優先於其他判定', () => {
  const outcome = resolveSitemapOutcome({ failureCount: 1, submittedCount: 3, alertCount: 4 });
  assert.equal(outcome.status, 'failed');
  assert.equal(outcome.exitCode, 1);
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
