import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const productPage = readFileSync(path.join(root, 'src/pages/en/aac-implementation-ledger/index.astro'), 'utf8');
const freeTool = readFileSync(path.join(root, 'src/pages/en/tools/aac-generalization-matrix.astro'), 'utf8');

test('PRODUCT-010 routes and assets exist', () => {
  assert.match(productPage, /data-product-page="product-010"/);
  assert.match(freeTool, /data-tool-page="product-010-free-tool"/);
  assert.ok(existsSync(path.join(root, 'public/assets/product-010/01-payhip-hero.png')));
  assert.ok(existsSync(path.join(root, 'public/assets/product-010/22-vertical-no-subscription.png')));
});

test('PRODUCT-010 product page uses the required funnel copy and safe events', () => {
  assert.match(productPage, /<h1[^>]*>AAC Implementation Ledger<\/h1>/);
  assert.match(productPage, /Track communication,?<br \/>not just accuracy\./);
  assert.match(productPage, /product_010_view/);
  assert.match(productPage, /product_010_marketplace_click/);
  assert.match(productPage, /product_010_free_to_paid_click/);
  assert.ok(productPage.includes('https://payhip.com/b/0iqnT'));
  assert.doesNotMatch(productPage, /student code.*data-product-event|functionName.*__ft_track/i);
});

test('PRODUCT-010 free tool is anonymous and never transmits observation values', () => {
  assert.match(freeTool, /Communication function × setting/);
  assert.match(freeTool, /product_010_free_tool_view/);
  assert.match(freeTool, /product_010_free_tool_complete/);
  assert.doesNotMatch(freeTool, /fetch\(|XMLHttpRequest|sendBeacon/i);
  assert.doesNotMatch(freeTool, /track\([^\n]*(functionName|setting|partner|independence)/i);
});
