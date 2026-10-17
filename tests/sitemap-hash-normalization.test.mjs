import assert from 'node:assert/strict';
import { join } from 'node:path';
import test from 'node:test';

import { contentHashForPage, lastmodForPage, sitemapContentHashVersion } from '../scripts/seo-indexing-utils.mjs';

const fixtureFile = join(process.cwd(), 'package.json');

test('sitemap hash migration preserves an evidence-backed lastmod date', () => {
  const result = lastmodForPage(
    { route: '/workflows/example/', file: fixtureFile, html: '<main><h1>Stable content</h1></main>' },
    { hash: 'old-hash', hashVersion: 8, lastmod: '2026-09-04' },
    '2026-09-18',
    'update',
  );
  assert.equal(result.lastmod, '2026-09-04');
  assert.equal(result.hashVersion, sitemapContentHashVersion);
});

test('a URL recovered from the live sitemap preserves its remote date during migration', () => {
  const result = lastmodForPage(
    { route: '/tools/recovered-tool/', file: fixtureFile, html: '<main><h1>Recovered content</h1></main>' },
    { lastmod: '2026-09-03' },
    '2026-09-18',
    'update',
  );
  assert.equal(result.lastmod, '2026-09-03');
  assert.equal(result.hashVersion, sitemapContentHashVersion);
});

test('a scheduled first-seen education URL uses its planned publication date', () => {
  const result = lastmodForPage(
    { route: '/tools/standard-error-of-measurement-calculator/', file: fixtureFile, html: '<main><h1>SEM</h1></main>' },
    undefined,
    '2026-09-18',
    'update',
  );
  assert.equal(result.lastmod, '2026-09-25');
});

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

test('social preview image metadata does not change sitemap content hash', () => {
  const page = '<main><h1>Reader-facing content</h1></main>';
  const genericPreview = '<meta property="og:image" content="https://funnytools.win/og-default.png"><meta property="og:image:alt" content="FunnyTools">';
  const topicPreview = '<meta property="og:image" content="https://funnytools.win/og/zh-pdf.png"><meta property="og:image:alt" content="PDF 合併 · PDF 工具">';

  assert.equal(
    contentHashForPage({ file: fixtureFile, html: `${page}${genericPreview}` }),
    contentHashForPage({ file: fixtureFile, html: `${page}${topicPreview}` }),
  );
});

test('Amazon affiliate CSP hosts do not change sitemap content hash', () => {
  const page = '<meta http-equiv="Content-Security-Policy" content="img-src self">';
  const affiliateCsp = '<meta http-equiv="Content-Security-Policy" content="img-src self https://m.media-amazon.com https://images-na.ssl-images-amazon.com https://images.amazon.com">';

  assert.equal(
    contentHashForPage({ file: fixtureFile, html: affiliateCsp }),
    contentHashForPage({ file: fixtureFile, html: page }),
  );
});

test('affiliate shelf shell, runtime, and component CSS do not change sitemap content hash', () => {
  const page = '<style>.reader-content{color: black}</style><main><h1>Reader-facing content</h1></main>';
  const affiliatePage = '<style>.reader-content{color: black}.affiliate-shelf[data-astro-cid-test]{display:grid}@media(prefers-reduced-motion:no-preference){.affiliate-shelf[data-astro-cid-test]:not([hidden]){animation:affiliate-shelf-in .32s ease-out both}@keyframes affiliate-shelf-in{0%{opacity:0}to{opacity:1}}}</style><main><h1>Reader-facing content</h1></main><section class="affiliate-shelf" data-affiliate-shelf hidden></section><script src="/support-products.js?v=20260901-affiliate-shelf" defer></script>';

  assert.equal(
    contentHashForPage({ file: fixtureFile, html: affiliatePage }),
    contentHashForPage({ file: fixtureFile, html: page }),
  );
});

test('CSS of a component the page does not render (shared inline stylesheet) does not change sitemap content hash', () => {
  // Astro inlines one stylesheet containing every component's scoped CSS into every page. P2 batch 6: adding
  // .gift-* rules for the random-name-picker moved the hash of all ten tool pages.
  const page = '<main><h1>Reader-facing content</h1></main>';
  const before = `<style>.a[data-astro-cid-aaaa]{color:red}</style>${page}`;
  const after = `<style>.a[data-astro-cid-aaaa]{color:red}.gift-note[data-astro-cid-ere64hzr]{margin:8px 0 0}</style>${page}`;

  assert.equal(
    contentHashForPage({ file: fixtureFile, html: after }),
    contentHashForPage({ file: fixtureFile, html: before }),
  );
});

test('a real edit to reader-facing text still changes the sitemap content hash', () => {
  const style = '<style>.a{color:red}</style>';
  assert.notEqual(
    contentHashForPage({ file: fixtureFile, html: `${style}<main><h1>Reader-facing content</h1></main>` }),
    contentHashForPage({ file: fixtureFile, html: `${style}<main><h1>Reader-facing content, edited</h1></main>` }),
  );
});

test('two pages built from different checkouts hash the same when only unrelated CSS and the release version differ', () => {
  const body = '<main><h1>Z 分數</h1><p>z=(X−M)÷SD</p></main>';
  const oldBuild = `<style>.x{a:b}</style><script type="application/ld+json">{"softwareVersion":"5.153.0"}</script>${body}<p class="fineprint">&copy; 2026 FunnyTools · v5.153.0</p>`;
  const newBuild = `<style>.x{a:b}.gift-hide{grid-column:1 / -1}</style><script type="application/ld+json">{"softwareVersion":"5.154.0"}</script>${body}<p class="fineprint">&copy; 2026 FunnyTools · v5.154.0</p>`;
  assert.equal(
    contentHashForPage({ file: fixtureFile, html: newBuild }),
    contentHashForPage({ file: fixtureFile, html: oldBuild }),
  );
});

test('the date-derived "newest tool" badge does not change sitemap content hash', () => {
  const card = '<div class="tool-card"><a href="/tools/x/">X</a>';
  assert.equal(
    contentHashForPage({ file: fixtureFile, html: `${card}<span class="badge" data-new-badge data-astro-cid-abc>最新工具</span></div>` }),
    contentHashForPage({ file: fixtureFile, html: `${card}</div>` }),
  );
});
