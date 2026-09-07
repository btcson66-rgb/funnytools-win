import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const analytics = readFileSync(new URL('../src/lib/affiliateAnalytics.ts', import.meta.url), 'utf8');
const baseLayout = readFileSync(new URL('../src/layouts/BaseLayout.astro', import.meta.url), 'utf8');
const embedLayout = readFileSync(new URL('../src/layouts/EmbedLayout.astro', import.meta.url), 'utf8');
const shelfScript = readFileSync(new URL('../public/support-products.js', import.meta.url), 'utf8');

test('FunnyTools affiliate events keep Amazon tracking metadata separate from GA destination', async () => {
  assert.match(analytics, /affiliate_tracking_id\?: string/);
  assert.doesNotMatch(analytics, /\btracking_id\?: string/);
  assert.match(analytics, /affiliate_tracking_id/);
  assert.doesNotMatch(analytics, /\btracking_id\b/);
  assert.match(analytics, /send_to: AFFILIATE_GA_ID/);
  assert.match(analytics, /VALID_AFFILIATE_GA_ID/);
assert.match(shelfScript, /affiliate_tracking_id: link\.dataset\.affiliateTrackingId/);
assert.match(shelfScript, /affiliate_tracking_id: batchTrackingId\(items\.map\(\(item\) => item\.tracking_id\)\)/);
assert.match(shelfScript, /grid\.querySelectorAll\('\.affiliate-product-card'\)/);
assert.doesNotMatch(shelfScript, /(?:^|[,{}]\s*)tracking_id\s*:/);
  for (const layout of [baseLayout, embedLayout]) {
    assert.match(layout, /affiliateMeasurementId/);
    assert.match(layout, /gtag\('config', affiliateMeasurementId, \{ send_page_view: false \}\)/);
  }
  const { trackAffiliateClick } = await import('../src/lib/affiliateAnalytics.ts');
  const events = [];
  const previousWindow = globalThis.window;
  const previousDebug = console.debug;
  console.debug = () => {};
  globalThis.window = {
    location: { hostname: 'funnytools.win', pathname: '/en/tools/demo/', search: '?ga_debug=1' },
    gtag: (...args) => events.push(args),
  };
  trackAffiliateClick({
    placement: 'tool_result', surface_type: 'tool', affiliate_network: 'amazon',
    affiliate_site: 'funnytools', affiliate_placement: 'tool_result',
    affiliate_tracking_id: 'funnytools-20', locale: 'en', page_type: 'tool',
    amazon_content_mode: 'text_only', batch_id: 'amazon-master-20260907',
    product_id: 'B000000000', product_category: 'office', card_position: 1,
  });
  assert.deepEqual(events, [[
    'event', 'affiliate_click', {
      site_name: 'funnytools', placement: 'tool_result', surface_type: 'tool',
      affiliate_network: 'amazon', batch_id: 'amazon-master-20260907',
      affiliate_site: 'funnytools', affiliate_placement: 'tool_result',
      affiliate_tracking_id: 'funnytools-20', locale: 'en', page_type: 'tool',
      amazon_content_mode: 'text_only', product_id: 'B000000000',
      product_category: 'office', card_position: 1, debug_mode: true,
      send_to: 'G-Q78WN8NZ0R',
    },
  ]]);
  assert.equal(Object.prototype.hasOwnProperty.call(events[0][2], 'tracking_id'), false);
  globalThis.window = previousWindow;
  console.debug = previousDebug;
});
