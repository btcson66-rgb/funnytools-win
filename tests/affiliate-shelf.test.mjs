import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const catalog = JSON.parse(readFileSync('public/data/support-products.json', 'utf8'));
const shelf = readFileSync('src/components/AffiliateProductShelf.astro', 'utf8');
const runtime = readFileSync('public/support-products.js', 'utf8');

test('affiliate catalog has a usable multi-platform pool without fabricated prices', () => {
  const active = catalog.filter((item) => item.status === 'active' || item.enabled === true);
  assert.ok(active.length >= 40, `expected at least 40 active products, got ${active.length}`);
  assert.ok(active.some((item) => item.platform === 'shopee'));
  assert.ok(active.some((item) => item.platform === 'coupang'));
  assert.equal(new Set(active.map((item) => item.id)).size, active.length);
  assert.ok(active.every((item) => /^https:\/\//.test(item.affiliateUrl)));
  assert.ok(active.every((item) => !('price' in item) || typeof item.price === 'string'));
});

test('tool shelf is result-gated and exposes the required disclosure and controls', () => {
  assert.match(shelf, /data-affiliate-shelf/);
  assert.match(shelf, /data-affiliate-initial-limit=.*4/);
  assert.match(shelf, /❤️ 這個工具有幫上忙嗎？/);
  assert.match(shelf, /部分連結為分潤連結/);
  assert.match(shelf, /data-affiliate-expand/);
  assert.match(shelf, /data-affiliate-refresh/);
  assert.match(shelf, /data-affiliate-support-link/);
});

test('runtime records affiliate interactions and uses safe external links', () => {
  for (const eventName of [
    'affiliate_shelf_view',
    'affiliate_product_click',
    'affiliate_refresh',
    'affiliate_expand',
    'affiliate_support_page_click',
  ]) assert.match(runtime, new RegExp(eventName));
  assert.match(runtime, /link\.rel = 'sponsored nofollow noopener'/);
  assert.match(runtime, /link\.target = '_blank'/);
  assert.match(runtime, /查看目前價格/);
  assert.match(runtime, /sessionStorage/);
});
