import assert from 'node:assert/strict';
import { join } from 'node:path';
import test from 'node:test';

import { contentHashForPage } from '../scripts/seo-indexing-utils.mjs';

const fixtureFile = join(process.cwd(), 'package.json');

test('sitewide Affiliate GA4 bootstrap does not change sitemap content hash', () => {
  const page = '<main><h1>Reader-facing content</h1></main>';
  const affiliateBootstrap = '<script>window.__btcsonAffiliateTrack = function () {};</script>';

  assert.equal(
    contentHashForPage({ file: fixtureFile, html: `${page} ${affiliateBootstrap}` }),
    contentHashForPage({ file: fixtureFile, html: page }),
  );
});

test('sitewide analytics dispatcher routing does not change sitemap content hash', () => {
  const page = '<main><h1>Reader-facing content</h1></main>';
  const oldAnalyticsDispatcher = '<script>window.__ft_track = function () { window.gtag(\'event\', eventName, merged); };</script>';
  const newAnalyticsDispatcher = '<script>window.__ft_track = function () { var destinations = window.__ft_existing_ga_ids; window.gtag(\'event\', eventName, destinations && destinations.length ? Object.assign({}, merged, { send_to: destinations }) : merged); };</script>';

  assert.equal(
    contentHashForPage({ file: fixtureFile, html: `${page} ${newAnalyticsDispatcher}` }),
    contentHashForPage({ file: fixtureFile, html: `${page} ${oldAnalyticsDispatcher}` }),
  );
});

test('shared mobile navigation touch-target CSS does not change sitemap content hash', () => {
  const oldCss = '<style>.theme-toggle,.mobile-menu-toggle{display:inline-grid;width:32px;height:32px;padding:0}</style>';
  const newCss = '<style>.theme-toggle,.mobile-menu-toggle{display:inline-grid;width:44px;min-width:44px;height:44px;min-height:44px;flex:0 0 44px;padding:0}</style>';

  assert.equal(
    contentHashForPage({ file: fixtureFile, html: newCss }),
    contentHashForPage({ file: fixtureFile, html: oldCss }),
  );
});

test('shared mobile navigation brand overflow CSS does not change sitemap content hash', () => {
  const oldCss = '<style>.nav-links{display:none}.mobile-menu-toggle{display:inline-grid}</style>';
  const newCss = '<style>.brand{min-width:0;flex:1 1 auto;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.nav-links{display:none}.mobile-menu-toggle{display:inline-grid}</style>';

  assert.equal(
    contentHashForPage({ file: fixtureFile, html: newCss }),
    contentHashForPage({ file: fixtureFile, html: oldCss }),
  );
});

test('localized tool analytics routing does not change sitemap content hash', () => {
  const oldDispatcher = '<script>analyticsWindow.gtag(\'event\', eventName, payload);</script>';
  const newDispatcher = '<script>analyticsWindow.gtag(\'event\', eventName, { ...payload, ...(analyticsWindow.__ft_existing_ga_ids?.length ? { send_to: analyticsWindow.__ft_existing_ga_ids } : {}), });</script>';

  assert.equal(
    contentHashForPage({ file: fixtureFile, html: newDispatcher }),
    contentHashForPage({ file: fixtureFile, html: oldDispatcher }),
  );
});

test('share analytics routing does not change sitemap content hash', () => {
  const oldShare = '<script>window.gtag(\'event\',\'share\',{method:t,content_type:\'tool_or_page\'});</script>';
  const newShare = '<script>window.gtag(\'event\',\'share\',{method:t,content_type:\'tool_or_page\',send_to:window.__ft_existing_ga_ids});</script>';

  assert.equal(
    contentHashForPage({ file: fixtureFile, html: newShare }),
    contentHashForPage({ file: fixtureFile, html: oldShare }),
  );
});

test('share handler minifier variable renaming does not change sitemap content hash', () => {
  const oldShare = '<script>const r=t=>{typeof window.gtag=="function"&&window.gtag("event","share",{method:t,content_type:"tool_or_page"}),window.__ft_track&&window.__ft_track("share_click",{method:t})};a.querySelectorAll("a[data-share-platform]").forEach(t=>{t.addEventListener("click",()=>{r(t.getAttribute("data-share-platform")||"unknown")})}),e.addEventListener("click",async()=>{try{r("copy")}catch{r("copy_fallback")}})</script>';
  const newShare = oldShare.replaceAll('const r=', 'const n=').replace(/\br\(/g, 'n(');

  assert.equal(
    contentHashForPage({ file: fixtureFile, html: newShare }),
    contentHashForPage({ file: fixtureFile, html: oldShare }),
  );
});
