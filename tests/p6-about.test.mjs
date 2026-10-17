import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

// P2 batch 6 (2026-10-17): /about/ describes the real review process behind "最後審核" and how to report a mistake.
const flat = (route) => readFileSync(new URL(`../dist${route}index.html`, import.meta.url), 'utf8').replace(/ data-astro-cid-[a-z0-9]+/g, '');
const about = flat('/about/');
const text = about.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, '').replace(/<[^>]+>/g, ' ').replace(/&#39;/g, "'").replace(/\s+/g, ' ');

test('about: the review process is stated step by step and tied to the displayed date', () => {
  for (const phrase of ['「最後審核」日期代表下面這個流程真的做完了', '查核日期', '同一支函式重新算一次', '自動測試', 'lint、型別檢查與測試', '手動改「最後審核」日期', '不是建置時自動產生的']) {
    assert.ok(text.includes(phrase), phrase);
  }
});

test('about: every step is backed by something in the repository', () => {
  const deploy = readFileSync(new URL('../.github/workflows/deploy.yml', import.meta.url), 'utf8');
  for (const step of ['npm run lint', 'npm run typecheck', 'npm test']) assert.ok(deploy.includes(`run: ${step}`), step);
  assert.match(deploy, /deploy:\s*\n\s*needs: build-and-verify/);
  const tools = readFileSync(new URL('../src/data/tools.ts', import.meta.url), 'utf8');
  assert.ok(/reviewedAt:\s*'\d{4}-\d{2}-\d{2}'/.test(tools), 'reviewedAt is a hand-set data field');
});

test('about: corrections link to /contact/ and the page says what to include', () => {
  assert.match(about, /<a href="\/contact\/"[^>]*>\s*<strong>回報頁面錯誤<\/strong>/);
  for (const phrase of ['頁面網址', '你輸入的數字', '預期的結果', '官方文件']) assert.ok(text.includes(phrase), phrase);
});

test('about: no title is attached to Benson Lai, no FAQPage/HowTo, still indexable, T-score guide reference gone', () => {
  assert.doesNotMatch(about, /(教授|博士|老師|講師|工程師|顧問|Dr\.|Professor)\s*Benson Lai|Benson Lai\s*(教授|博士|老師|講師|工程師|顧問)/);
  assert.doesNotMatch(about, /"@type":"(FAQPage|HowTo)"/);
  assert.doesNotMatch(about, /noindex/);
  assert.match(about, /"@type":"AboutPage"/);
  assert.match(about, /rel="canonical" href="https:\/\/funnytools\.win\/about\/"/);
  assert.ok(!text.includes('T 分數指南'));
});
