import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const read = (relative) => fs.readFileSync(path.join(root, relative), 'utf8');
const readDist = (relative) => read(path.join('dist', relative));

const products = [
  ['PRODUCT-001', 'US$12.99', 'quhS0', 'ikgpjk'],
  ['PRODUCT-002', 'US$17.99', '4hgtL', 'nwadqz'],
  ['PRODUCT-003', 'US$19', 'tVdur', 'spgrvp'],
  ['PRODUCT-004', 'US$19', 'v7mjB', null],
  ['PRODUCT-005', 'US$19', 'NDfro', 'xbsnpk'],
];

test('TASK10 FunnyTools registry keeps stable IDs, prices, and live checkout references', () => {
  const registry = read('src/data/decision-products.ts');
  for (const [id, price, payhipId, gumroadId] of products) {
    assert.match(registry, new RegExp(`id: '${id}'`));
    assert.match(registry, new RegExp(`price: '${price.replace('$', '\\$')}'`));
    assert.match(registry, new RegExp(`link=${payhipId}`));
    if (gumroadId) assert.match(registry, new RegExp(`product=${gumroadId}`));
  }
  const p4Block = registry.split("id: 'PRODUCT-004'")[1].split("id: 'PRODUCT-005'")[0];
  assert.match(p4Block, /providers: \{[\s\S]*?payhip:/);
  assert.doesNotMatch(p4Block, /gumroad:/);
});

test('TASK10 FunnyTools built surfaces expose metadata, paid boundary, and unified events', () => {
  for (const page of ['shop/index.html', 'en/shop/index.html']) {
    const html = readDist(page);
    for (const [id] of products) assert.match(html, new RegExp(id));
    for (const event of ['product_cta_view', 'product_cta_click', 'product_checkout_click']) assert.match(html, new RegExp(event));
    assert.match(html, /FunnyTools browser tools remain free|FunnyTools 的瀏覽器工具維持免費/);
  }

  for (const page of ['wedding-seating-conflict-solver/index.html', 'en/wedding-seating-conflict-solver/index.html']) {
    const html = readDist(page);
    assert.match(html, /Wedding Seating Conflict Solver/);
    assert.match(html, /rel="canonical"/);
    assert.match(html, /robots/);
    assert.match(html, /SoftwareApplication/);
    assert.match(html, /price[^\n]{0,80}19/);
    assert.match(html, /payhip\.com\/buy\?s=1&amp;link=v7mjB/);
    assert.match(html, /product_cta_view/);
    assert.match(html, /product_cta_click/);
    assert.match(html, /product_checkout_click/);
    assert.match(html, /free Seating Chart|免費 Seating Chart/);
    assert.match(html, /cover-real-app/);
  }
});
