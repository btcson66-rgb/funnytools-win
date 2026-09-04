import test from 'node:test';
import assert from 'node:assert/strict';
import { extractVisibleMain, findEditorialLeakage } from '../scripts/editorial-leakage-audit.mjs';

test('fails visible Codex editorial instruction', () => {
  const text = extractVisibleMain('<main><p>Codex 不得新增未測試功能。</p></main>');
  assert.deepEqual(findEditorialLeakage(text), ['internal-agent']);
});

test('fails visible CTA and ALT production notes', () => {
  const text = extractVisibleMain('<main><h2>頁面 CTA</h2><p>CTA：開啟工具</p><p>ALT：流程圖</p></main>');
  assert.deepEqual(findEditorialLeakage(text), ['editorial-cta', 'editorial-image-note']);
});

test('allows a legitimate SEO topic explanation', () => {
  const text = extractVisibleMain('<main><p>圖片壓縮會影響載入速度與 SEO，請先確認尺寸與可讀性。</p></main>');
  assert.deepEqual(findEditorialLeakage(text), []);
});

