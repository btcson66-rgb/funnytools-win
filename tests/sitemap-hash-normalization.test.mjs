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
