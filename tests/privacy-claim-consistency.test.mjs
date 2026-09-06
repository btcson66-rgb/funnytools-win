// Asserts that marketing/SEO copy for the tools that actually upload a file
// (the 5 BACKEND_DEPENDENT ConversionApiTool tools, and the 3 MIXED tools
// whose download button routes through the download-gate upload path) never
// makes an absolute "never leaves your browser / does not upload / not
// uploaded" claim.
//
// This intentionally does NOT scan the whole site: scanning e.g. the
// homepage or the money/text/random/study/statistics category pages for the
// same forbidden phrases would be pointless (those pages correctly use
// hedged wording like "多數/視工具而定/most/some", and none of their tools
// upload anything). Each check below is scoped to exactly the tool or
// category slice the task asked about, so a red result always points at a
// real, specific, quoted piece of copy.
//
// See reports/task-02-reliability/frontend-privacy-audit.md for the full
// list of findings and suggested (minimal) fixes. Per the task brief, red
// results here are NOT to be fixed by loosening the assertions -- they
// document real inconsistencies for a human to decide on.

import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

function read(relPath) {
  return readFileSync(new URL(relPath, import.meta.url), 'utf8');
}

const toolsSrc = read('../src/data/tools.ts');
const categoryContentSrc = read('../src/data/categoryContent.ts');
const seoGuidesSrc = read('../src/data/seoGuides.ts');
const conversionApiToolsSrc = read('../src/i18n/tools/conversion-api-tools.ts');
const imageCompressorSrc = read('../src/i18n/tools/image-compressor.ts');
const mergePdfSrc = read('../src/i18n/tools/merge-pdf.ts');
const qrCodeGeneratorSrc = read('../src/i18n/tools/qr-code-generator.ts');
const compressGuideMd = read('../src/content/seo-guides/task-003/01-compress-pdf-to-upload-limit.md');
const backendCommonPy = read('../backend/services/common.py');

// "Never leaves your browser / does not upload / never uploaded" style
// absolute claims, per the task brief's own wording (never leaves your
// browser / 不上傳 / 不會離開你的裝置) plus the close variants actually
// found in this repo's copy.
const FORBIDDEN_PATTERNS = [
  /never leaves? your (browser|device|machine|computer)/i,
  /nothing(?:'s| is)? uploaded/i,
  /not uploaded to (?:any|a|this) (?:server|site)/i,
  /\bnever uploaded\b/i,
  /no data is uploaded to any server/i,
  /does not (?:receive|store|upload)/i,
  /不會(?:主動)?(?:將|把)?(?:任何)?(?:資料|檔案|圖片)?上傳(?:到|至)(?:伺服器|本站|第三方伺服器)/,
  /不(?:會)?離開(?:瀏覽器|你的裝置|裝置)/,
  /不外流/,
  /不(?:用|需要?)上傳/,
  /不經過任何伺服器/,
  /完全在(?:您的|你的)?瀏覽器本機執行/,
  /所有[^，。]{0,10}都在[^，。]{0,10}本機(?:完成|處理|執行)/,
];

function findForbiddenMatches(text) {
  return FORBIDDEN_PATTERNS.map((re) => text.match(re)?.[0]).filter(Boolean);
}

function assertNoForbiddenClaim(text, label) {
  const matches = findForbiddenMatches(text);
  assert.deepEqual(matches, [], `${label} contains an absolute no-upload/never-leaves-browser claim: ${JSON.stringify(matches)}`);
}

// --- Extraction helpers -----------------------------------------------------

function extractToolShort(slug) {
  const idx = toolsSrc.indexOf(`slug: '${slug}'`);
  assert.ok(idx >= 0, `could not find tools.ts entry for ${slug}`);
  const chunk = toolsSrc.slice(idx, idx + 700);
  const m = chunk.match(/short:\s*\{([\s\S]*?)\},/);
  assert.ok(m, `could not find short{} for ${slug} in tools.ts`);
  return m[1];
}

function extractToolBlurb(slug) {
  const re = new RegExp(`'${slug}':\\s*\\{([\\s\\S]*?)\\n\\s*\\},`);
  const m = categoryContentSrc.match(re);
  return m ? m[1] : null; // null means no dedicated blurb -- falls back to tools.ts `short`
}

function extractCategoryBlock(categoryId) {
  const startRe = new RegExp(`\\n  ${categoryId}: \\{\\n`);
  const startMatch = categoryContentSrc.match(startRe);
  assert.ok(startMatch, `could not find category block for '${categoryId}' in categoryContent.ts`);
  const start = startMatch.index + startMatch[0].length;
  const rest = categoryContentSrc.slice(start);
  const nextHeader = rest.match(/\n  \w+: \{\n/);
  const end = nextHeader ? start + nextHeader.index : categoryContentSrc.length;
  return categoryContentSrc.slice(start, end);
}

function extractIntroBlock(categoryBlockText) {
  const m = categoryBlockText.match(/intro:\s*\{([\s\S]*?)\n    \},/);
  assert.ok(m, 'could not find intro{} block in category text');
  return m[1];
}

function extractField(source, field) {
  return [...source.matchAll(new RegExp(`${field}:\\s*'((?:[^'\\\\]|\\\\.)*)'`, 'g'))].map((m) => m[1]);
}

// --- 1. BACKEND_DEPENDENT tools' own copy (conversion-api-tools.ts) --------
// Per the task brief this file is already correct; this is a regression
// lock, not expected to fail.

test('conversion-api-tools.ts (the 5 BACKEND_DEPENDENT tools) makes no absolute no-upload claim', () => {
  assertNoForbiddenClaim(conversionApiToolsSrc, 'src/i18n/tools/conversion-api-tools.ts');
});

test('tools.ts `short` field for the 5 BACKEND_DEPENDENT tools makes no absolute no-upload claim', () => {
  const slugs = ['bulk-image-compressor', 'pdf-to-word', 'pdf-table-to-excel', 'image-to-dxf', 'pdf-compressor'];
  for (const slug of slugs) {
    assertNoForbiddenClaim(extractToolShort(slug), `tools.ts short.* for ${slug}`);
  }
});

// --- 2. MIXED tools' own tool-page copy (privacyNote / seoDescription) ----
// These are expected to currently FAIL: image-compressor.ts and merge-pdf.ts
// both claim the output file is never uploaded, but their download button
// calls requestGatedDownload(), which uploads the file to
// SITE.downloadGateEndpoint unless that request fails.

test('image-compressor.ts privacyNote makes no absolute no-upload claim (currently failing)', () => {
  const notes = extractField(imageCompressorSrc, 'privacyNote');
  assert.ok(notes.length >= 2, 'expected zh and en privacyNote strings in image-compressor.ts');
  for (const note of notes) assertNoForbiddenClaim(note, 'image-compressor.ts privacyNote');
});

test('image-compressor.ts seoDescription makes no absolute no-upload claim (currently failing)', () => {
  const descriptions = extractField(imageCompressorSrc, 'seoDescription');
  assert.ok(descriptions.length >= 2, 'expected zh and en seoDescription strings in image-compressor.ts');
  for (const description of descriptions) assertNoForbiddenClaim(description, 'image-compressor.ts seoDescription');
});

test('merge-pdf.ts privacyNote makes no absolute no-upload claim (currently failing)', () => {
  const notes = extractField(mergePdfSrc, 'privacyNote');
  assert.ok(notes.length >= 2, 'expected zh and en privacyNote strings in merge-pdf.ts');
  for (const note of notes) assertNoForbiddenClaim(note, 'merge-pdf.ts privacyNote');
});

test('merge-pdf.ts seoDescription makes no absolute no-upload claim (currently failing)', () => {
  const descriptions = extractField(mergePdfSrc, 'seoDescription');
  assert.ok(descriptions.length >= 2, 'expected zh and en seoDescription strings in merge-pdf.ts');
  for (const description of descriptions) assertNoForbiddenClaim(description, 'merge-pdf.ts seoDescription');
});

test('qr-code-generator.ts privacyNote/seoDescription make no absolute no-upload claim (currently failing)', () => {
  // qr-code-generator's `seoDescription` is neutral, but its privacyNote
  // ("本站不會接收、儲存或上傳你輸入的文字或網址。") is just as absolute as
  // image-compressor's and merge-pdf's, and just as false: its download
  // button also calls requestGatedDownload(), which uploads the generated
  // PNG to SITE.downloadGateEndpoint.
  for (const field of ['privacyNote', 'seoDescription']) {
    for (const value of extractField(qrCodeGeneratorSrc, field)) {
      assertNoForbiddenClaim(value, `qr-code-generator.ts ${field}`);
    }
  }
});

// --- 3. Category page toolBlurbs for the MIXED tools -----------------------
// Expected to currently FAIL for both.

test("categoryContent.ts toolBlurbs['image-compressor'] makes no absolute no-upload claim (currently failing)", () => {
  const blurb = extractToolBlurb('image-compressor');
  assert.ok(blurb, "expected a toolBlurbs['image-compressor'] entry in categoryContent.ts");
  assertNoForbiddenClaim(blurb, "categoryContent.ts toolBlurbs['image-compressor']");
});

test("categoryContent.ts toolBlurbs['merge-pdf'] makes no absolute no-upload claim (currently failing)", () => {
  const blurb = extractToolBlurb('merge-pdf');
  assert.ok(blurb, "expected a toolBlurbs['merge-pdf'] entry in categoryContent.ts");
  assertNoForbiddenClaim(blurb, "categoryContent.ts toolBlurbs['merge-pdf']");
});

test("categoryContent.ts toolBlurbs['qr-code-generator'] makes no absolute no-upload claim", () => {
  const blurb = extractToolBlurb('qr-code-generator');
  assert.ok(blurb, "expected a toolBlurbs['qr-code-generator'] entry in categoryContent.ts");
  assertNoForbiddenClaim(blurb, "categoryContent.ts toolBlurbs['qr-code-generator']");
});

// --- 4. Category-level intro copy for categories that contain an upload tool
// "image" contains bulk-image-compressor (BACKEND_DEPENDENT) and
// image-compressor (MIXED); "draw" contains image-to-dxf (BACKEND_DEPENDENT).
// Both are expected to currently FAIL (one unqualified "all processing is
// local" sentence each, contradicting the same category's own hedged
// metaDescription/FAQ copy a few lines away).

test("categoryContent.ts 'image' category intro makes no unqualified all-local claim (currently failing)", () => {
  const intro = extractIntroBlock(extractCategoryBlock('image'));
  assertNoForbiddenClaim(intro, "categoryContent.ts image category intro");
});

test("categoryContent.ts 'draw' category intro makes no unqualified all-local claim (currently failing)", () => {
  const intro = extractIntroBlock(extractCategoryBlock('draw'));
  assertNoForbiddenClaim(intro, "categoryContent.ts draw category intro");
});

test("categoryContent.ts 'pdf' category intro makes no unqualified all-local claim", () => {
  // Regression lock: the pdf category's own intro/metaDescription/FAQ are
  // correctly hedged ("視工具而定" / organizers vs. conversion tools) --
  // the pdf category's problem is scoped to the merge-pdf toolBlurb above,
  // not its intro copy.
  const intro = extractIntroBlock(extractCategoryBlock('pdf'));
  assertNoForbiddenClaim(intro, "categoryContent.ts pdf category intro");
});

// --- 5. SEO guide content built entirely around the false claim ------------
// merge-pdf-private-guide (src/data/seoGuides.ts) links to both merge-pdf
// and pdf-compressor and instructs readers to verify the (false) claim by
// disconnecting the network or watching the browser Network tab.

test('merge-pdf-private-guide (zh, seoGuides.ts) makes no absolute no-upload claim (currently failing)', () => {
  const m = seoGuidesSrc.match(/\{\s*\n\s*id: 'merge-pdf-private-guide',[\s\S]*?\n  \},/);
  assert.ok(m, 'could not find the merge-pdf-private-guide entry in seoGuides.ts');
  assertNoForbiddenClaim(m[0], 'seoGuides.ts merge-pdf-private-guide (zh)');
});

test('merge-pdf-private-guide (en translation, seoGuides.ts) makes no absolute no-upload claim (currently failing)', () => {
  const m = seoGuidesSrc.match(/'merge-pdf-private-guide':\s*\{[\s\S]*?\n  \},/);
  assert.ok(m, 'could not find the merge-pdf-private-guide EN translation entry in seoGuides.ts');
  assertNoForbiddenClaim(m[0], 'seoGuides.ts merge-pdf-private-guide (en)');
});

test('merge-pdf-private-guide links to pdf-compressor, which is BACKEND_DEPENDENT (contradicts the guide premise)', () => {
  const m = seoGuidesSrc.match(/\{\s*\n\s*id: 'merge-pdf-private-guide',[\s\S]*?\n  \},/);
  assert.ok(m, 'could not find the merge-pdf-private-guide entry in seoGuides.ts');
  assert.match(m[0], /relatedToolIds:.*'pdf-compressor'/, 'expected relatedToolIds to include pdf-compressor (evidence for the report -- not itself a bug to fix here)');
});

// --- 6. Stale content/seo-guides markdown describing a pre-migration,
// local-only version of pdf-compressor (matches the orphaned, unused
// src/components/tools/PdfCompressor.astro almost verbatim, including its
// 40MB cap -- the live tool is backend-based with an 80MB cap).

test('compress-pdf-to-upload-limit.md does not claim PDF Compressor runs locally (currently failing)', () => {
  const matchedText = compressGuideMd.match(/.{0,20}在瀏覽器本機處理.{0,20}/)?.[0] ?? null;
  assert.equal(
    matchedText,
    null,
    `guide describes the live /tools/pdf-compressor/ as browser-local, but it is wired to ConversionApiTool and uploads to the Conversion API`,
  );
});

test('compress-pdf-to-upload-limit.md single-file limit matches the live backend limit (currently failing)', () => {
  const backendLimitMatch = backendCommonPy.match(/FUNNYTOOLS_MAX_UPLOAD_MB", "(\d+)"/);
  assert.ok(backendLimitMatch, 'could not find MAX_SINGLE_UPLOAD_MB default in backend/services/common.py');
  const backendLimitMb = backendLimitMatch[1];

  const guideLimitMatch = compressGuideMd.match(/單檔輸入上限為\s*\*\*(\d+)MB\*\*/);
  assert.ok(guideLimitMatch, 'could not find the stated single-file limit in the guide');

  assert.equal(
    guideLimitMatch[1],
    backendLimitMb,
    `guide states a ${guideLimitMatch[1]}MB single-file limit; the live backend limit is ${backendLimitMb}MB (the guide's number matches the orphaned local PdfCompressor.astro component's hardcoded 40MB check instead)`,
  );
});
