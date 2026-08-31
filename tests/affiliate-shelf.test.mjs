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

test('teacher shelf can mix Chinese-tagged Shopee products with Coupang products', () => {
  for (const alias of ['教學', '教師', '學習', '辦公', '3c']) assert.match(runtime, new RegExp(alias));
  const teacherPool = catalog.filter((item) => {
    const values = [item.category, ...(item.tags || [])].map((value) => String(value).toLowerCase());
    return ['teacher', 'workspace', 'organization', 'student', '教學', '教師', '學習', '文具', '辦公', '3c']
      .some((alias) => values.includes(alias));
  });
  assert.ok(teacherPool.some((item) => item.platform === 'shopee'));
  assert.ok(teacherPool.some((item) => item.platform === 'coupang'));
});

test('the supplied Shopee batch is present with product-id-matched local images', () => {
  const ids = ['7551917096', '14390324205', '12522669893', '425824580', '1600737374', '5545293087', '13856462576', '42101916833', '1369136090', '44116840342', '1182966411', '7346053241', '22187415132', '49152138417', '24680905556', '9890270463', '26702833231'];
  const byId = new Map(catalog.map((item) => [item.id, item]));
  for (const id of ids) {
    const item = byId.get(`shopee-${id}`);
    assert.ok(item, `missing Shopee product ${id}`);
    assert.equal(item.platform, 'shopee');
    assert.equal(item.imageUrl, `/assets/support-products/shopee-${id}.webp`);
    assert.match(item.affiliateUrl, /^https:\/\/s\.shopee\.tw\//);
  }
});

test('the latest supplied Shopee batch is present with local images and refreshed links', () => {
  const ids = ['40226146238', '24929453599', '29128478566', '40602393612', '23116194206', '27705427792', '26558404522', '41564489188', '51456028166', '29825815039', '40104781068', '28050228633', '28877481202', '19282781205', '25429452735', '49703218547', '29615726704', '27776728635', '28923368118', '56102966901', '44662612548', '27842633319', '25579454125', '22773493067', '22366001289', '3832725335', '14296820642', '14215047952', '5486041835', '17990090102', '62773401', '22277892176', '5162386294', '24484425177', '4244754434', '29113584128', '23987891531', '23222545282', '20480171534', '25067144383', '44251185038', '24126902985'];
  const refreshedLinks = {
    '27705427792': 'https://s.shopee.tw/4VcQcjGkLn',
    '28050228633': 'https://s.shopee.tw/BTRSlXF93',
    '24484425177': 'https://s.shopee.tw/AUtdlktuBP',
    '44251185038': 'https://s.shopee.tw/6L44o69ldi',
  };
  const byId = new Map(catalog.map((item) => [item.id, item]));
  for (const id of ids) {
    const item = byId.get('shopee-' + id);
    assert.ok(item, 'missing latest Shopee product ' + id);
    assert.equal(item.platform, 'shopee');
    assert.equal(item.imageUrl, '/assets/support-products/shopee-' + id + '.webp');
    assert.match(item.affiliateUrl, /^https:\/\/s\.shopee\.tw\//);
  }
  for (const [id, url] of Object.entries(refreshedLinks)) {
    assert.equal(byId.get('shopee-' + id).affiliateUrl, url);
  }
});
