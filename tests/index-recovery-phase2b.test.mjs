import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { parseCsv, secretScanText } from '../scripts/index-recovery-phase2-lib.mjs';
import { phase2bExpansionContent, phase2bToolContent } from '../src/i18n/tools/phase2b-treatment-content.ts';

const root = process.cwd();
const reportDir = path.join(root, 'reports', 'index-recovery-phase2b');
const report = (name) => path.join(reportDir, name);
const rows = (name) => parseCsv(fs.readFileSync(report(name), 'utf8'));

test('Phase 2B has exactly 20 hard-matched disjoint pairs', () => {
  const pairs = rows('experiment-pairs.csv');
  assert.equal(pairs.length, 20);
  assert.deepEqual(Object.fromEntries(['zh-TW', 'en', 'es', 'fr'].map((locale) => [locale, pairs.filter((row) => row.locale === locale).length])), {
    'zh-TW': 5, en: 5, es: 5, fr: 5,
  });
  const treatmentUrls = pairs.map((row) => row.treatment_url);
  const controlUrls = pairs.map((row) => row.control_url);
  assert.equal(new Set(treatmentUrls).size, 20);
  assert.equal(new Set(controlUrls).size, 20);
  assert.equal(treatmentUrls.some((url) => controlUrls.includes(url)), false);
  for (const pair of pairs) {
    assert.equal(pair.treatment_google_status, 'Crawled Not Indexed');
    assert.equal(pair.control_google_status, 'Crawled Not Indexed');
    assert.equal(pair.match_score >= 80, true);
    assert.equal(pair.locale === 'zh-TW' ? 'zh-TW' : pair.locale, pair.locale);
    assert.ok(pair.cluster);
    assert.ok(pair.match_reason.includes('same locale'));
    assert.ok(pair.match_reason.includes('same page_type tool'));
    assert.ok(pair.match_reason.includes(`same cluster ${pair.cluster}`));
    assert.ok(!pair.treatment_url.includes('/en/tools/image-compressor/'));
    assert.ok(!pair.control_url.includes('/en/tools/image-compressor/'));
  }
});

test('Phase 2B pairs satisfy Phase 2A hard evidence fields', () => {
  const master = new Map(rows('../index-recovery-phase2/index-evidence-master.csv').map((row) => [row.url, row]));
  for (const pair of rows('experiment-pairs.csv')) {
    for (const url of [pair.treatment_url, pair.control_url]) {
      const row = master.get(url);
      assert.ok(row, `missing Phase 2A evidence for ${url}`);
      assert.equal(row.page_type, 'tool');
      assert.equal(row.google_status, 'Crawled Not Indexed');
      assert.match(row.production_status, /200/);
      assert.equal(row.page_fetch_state, 'SUCCESSFUL');
      assert.equal(row.robots_txt_state, 'ALLOWED');
      assert.equal(row.indexing_state, 'INDEXING_ALLOWED');
      assert.equal(row.canonical_category, 'SELF_MATCH');
    }
  }
});

test('Phase 2B local render guard proves treatment-only changes', () => {
  const diffs = rows('content-diff-summary.csv');
  assert.equal(diffs.length, 20);
  assert.equal(diffs.filter((row) => row.treatment_changed === 'yes').length, 20);
  assert.equal(diffs.filter((row) => row.control_changed === 'yes').length, 0);
  assert.equal(new Set(diffs.map((row) => row.treatment_added_content_fingerprint)).size, 20);
  for (const row of diffs) {
    assert.notEqual(row.treatment_main_content_hash_before, row.treatment_main_content_hash_after);
    assert.equal(row.control_main_content_hash_before, row.control_main_content_hash_after);
    assert.equal(row.control_unique_content_hash_before, row.control_unique_content_hash_after);
  }
});

test('Phase 2B added copy passes the block-level duplicate gate', () => {
  const additions = [
    ...Object.values(phase2bToolContent),
    ...Object.values(phase2bExpansionContent),
  ].flatMap((localeEntries) => Object.values(localeEntries));
  const blocks = additions.flatMap((content) => content.contentSections.flatMap((section) => section.paragraphs));
  const normalize = (value) => value.toLocaleLowerCase().normalize('NFKC').replace(/\s+/gu, ' ').trim();
  const normalizedBlocks = blocks.map(normalize);
  assert.equal(blocks.length, 80);
  assert.equal(new Set(normalizedBlocks).size, 80);

  const tokenSets = normalizedBlocks.map((block) => new Set(block.match(/[\p{L}\p{N}]+/gu) || []));
  let maximumJaccard = 0;
  for (let left = 0; left < tokenSets.length; left += 1) {
    for (let right = left + 1; right < tokenSets.length; right += 1) {
      const union = new Set([...tokenSets[left], ...tokenSets[right]]);
      const intersection = [...tokenSets[left]].filter((token) => tokenSets[right].has(token)).length;
      maximumJaccard = Math.max(maximumJaccard, intersection / Math.max(union.size, 1));
    }
  }
  assert.ok(maximumJaccard < 0.8, `boilerplate-like block overlap: ${maximumJaccard}`);
  const stats = rows('unique-content-stats.csv');
  assert.equal(stats.find((row) => row.metric === 'added paragraph blocks')?.evidence.includes('80 normalized blocks'), true);
});

test('Phase 2B content map covers treatments and no controls', () => {
  const pairs = rows('experiment-pairs.csv');
  const treatmentKeys = new Set(pairs.map((row) => `${row.locale}|${row.treatment_tool_slug}`));
  const controlKeys = new Set(pairs.map((row) => `${row.locale}|${row.control_tool_slug}`));
  const mapKeys = new Set([
    ...Object.entries(phase2bToolContent).flatMap(([locale, entries]) => Object.keys(entries).map((slug) => `${locale === 'zh' ? 'zh-TW' : locale}|${slug}`)),
    ...Object.entries(phase2bExpansionContent).flatMap(([locale, entries]) => Object.keys(entries).map((slug) => `${locale}|${slug}`)),
  ]);
  assert.deepEqual(mapKeys, treatmentKeys);
  for (const key of controlKeys) assert.equal(mapKeys.has(key), false, `control entered treatment map: ${key}`);
  for (const entry of [...Object.values(phase2bToolContent), ...Object.values(phase2bExpansionContent)]) {
    for (const content of Object.values(entry)) {
      assert.ok(content.contentSections.length >= 2);
      assert.ok(content.contentSections.every((section) => section.paragraphs.length >= 2));
    }
  }
});

test('Phase 2B treatment copy is present on each intended rendered URL', () => {
  const pairs = rows('experiment-pairs.csv');
  const getAddition = (locale, slug) => locale === 'zh-TW'
    ? phase2bToolContent.zh[slug]
    : locale === 'en' ? phase2bToolContent.en[slug] : phase2bExpansionContent[locale][slug];
  for (const pair of pairs) {
    const addition = getAddition(pair.locale, pair.treatment_tool_slug);
    assert.ok(addition);
    const pathname = new URL(pair.treatment_url).pathname.replace(/^\/+|\/+$/g, '');
    const html = fs.readFileSync(path.join(root, 'dist', pathname, 'index.html'), 'utf8');
    assert.match(html, new RegExp(addition.contentSections[0].paragraphs[0].replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
});

test('Phase 2B reports and manifest are complete and secret-free', () => {
  const manifest = JSON.parse(fs.readFileSync(report('experiment-manifest.json'), 'utf8'));
  assert.equal(manifest.treatment_urls.length, 20);
  assert.equal(manifest.control_urls.length, 20);
  assert.equal(manifest.deployment_commit, 'NOT_DEPLOYED_PR_ONLY');
  assert.equal(manifest.evaluation_rules.request_indexing, 'not used');
  assert.equal(manifest.evaluation_rules.sitemap_ping, 'not used');
  assert.equal(manifest.local_guard.control_hash_guard, 'PASS');
  assert.equal(manifest.local_guard.block_level_duplicate_guard, 'PASS');
  assert.equal(rows('treatment-before.csv').length, 20);
  assert.equal(rows('treatment-after.csv').length, 20);
  assert.equal(rows('control-baseline.csv').length, 20);
  assert.equal(rows('unique-value-review.csv').length, 20);
  assert.equal(rows('unique-value-review.csv').filter((row) => row.review_status === 'PASS').length, 20);
  assert.equal(rows('unique-content-stats.csv').length, 7);
  const files = fs.readdirSync(reportDir, { recursive: true }).filter((file) => typeof file === 'string');
  const reportText = files.filter((file) => /\.(csv|md|json|jsonl)$/.test(file)).map((file) => fs.readFileSync(path.join(reportDir, file), 'utf8')).join('\n');
  assert.equal(secretScanText(reportText), false);
});

test('observation command is explicit, cache-aware, and not a background scheduler', () => {
  const packageJson = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
  assert.equal(packageJson.scripts['index:experiment:snapshot'], 'node scripts/index-experiment-snapshot.mjs');
  const script = fs.readFileSync(path.join(root, 'scripts', 'index-experiment-snapshot.mjs'), 'utf8');
  assert.match(script, /successful URL Inspection responses are reused/);
  assert.match(script, /background_execution: 'none/);
  assert.equal(/setInterval|scheduleJob|node-cron/.test(script), false);
});
