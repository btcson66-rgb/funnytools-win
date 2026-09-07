// Asserts that marketing/SEO copy never makes an absolute "never leaves your
// browser / does not upload / not uploaded" claim for a tool that actually
// uploads a file, and that the tools which DO claim to be browser-local stay
// browser-local.
//
// History: before the download-gate migration, `image-compressor`,
// `qr-code-generator` and `merge-pdf` computed locally but routed their
// *download* button through `requestGatedDownload()`, which uploaded the
// generated file plus an email address to `SITE.downloadGateEndpoint`
// (roomfeng.win) -- contradicting their own "runs entirely in your browser"
// copy. The gate now lives on the 5 ConversionApiTool tools, which already
// upload the file for their core function. These three are genuinely local
// again, so their local claims are correct and the guard that keeps them
// correct is "this component must never import the gate again".
//
// This intentionally does NOT scan the whole site: scanning e.g. the
// homepage or the money/text/random/study/statistics category pages for the
// same forbidden phrases would be pointless (those pages correctly use
// hedged wording like "多數/視工具而定/most/some", and none of their tools
// upload anything). Each check below is scoped to exactly the tool or
// category slice that can actually be wrong, so a red result always points
// at a real, specific, quoted piece of copy.
//
// Red results here must never be fixed by loosening an assertion -- fix the
// copy, or fix the code so the copy becomes true.

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
const compressGuideMd = read('../src/content/seo-guides/task-003/01-compress-pdf-to-upload-limit.md');
const backendCommonPy = read('../backend/services/common.py');

// The 5 tools that upload the file as part of their core function. They are
// also the only tools allowed to use the email download gate.
const UPLOAD_SLUGS = [
  'bulk-image-compressor',
  'image-to-dxf',
  'pdf-compressor',
  'pdf-table-to-excel',
  'pdf-to-word',
];

// Tools that compute in the browser and must stay that way. The component
// file is what has to stay gate-free; the copy is allowed to say so.
const LOCAL_TOOLS = [
  { slug: 'image-compressor', component: 'ImageCompressor' },
  { slug: 'merge-pdf', component: 'MergePdf' },
  { slug: 'qr-code-generator', component: 'QrCodeGenerator' },
];

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

function extractStringLiterals(source) {
  return [...source.matchAll(/'((?:[^'\\]|\\.)*)'/g)].map((m) => m[1]);
}

function readToolComponent(componentName) {
  return read(`../src/components/tools/${componentName}.astro`);
}

// --- 1. The tools that really upload: no absolute no-upload claim ----------

test('conversion-api-tools.ts (the 5 upload tools) makes no absolute no-upload claim', () => {
  assertNoForbiddenClaim(conversionApiToolsSrc, 'src/i18n/tools/conversion-api-tools.ts');
});

test('tools.ts `short` field for the 5 upload tools makes no absolute no-upload claim', () => {
  for (const slug of UPLOAD_SLUGS) {
    assertNoForbiddenClaim(extractToolShort(slug), `tools.ts short.* for ${slug}`);
  }
});

test('categoryContent.ts toolBlurbs for the 5 upload tools make no absolute no-upload claim', () => {
  for (const slug of UPLOAD_SLUGS) {
    const blurb = extractToolBlurb(slug);
    if (!blurb) continue; // no dedicated blurb: tools.ts `short` is checked above
    assertNoForbiddenClaim(blurb, `categoryContent.ts toolBlurbs['${slug}']`);
  }
});

// The upload tools now carry the download gate, which sends the *output*
// file and the visitor's email to a second origin. Saying only "files are
// uploaded for conversion" would move the old false claim instead of fixing
// it, so the shared privacy string has to disclose both hops.
test('conversion-api-tools.ts privacy copy discloses BOTH the conversion upload and the email delivery upload', () => {
  // Every tool in this file sets `privacyNote: privacy.zh|privacy.en`, so the
  // shared `privacy` object is the single string pair to check.
  const block = conversionApiToolsSrc.match(/const privacy = \{([\s\S]*?)\n\};/);
  assert.ok(block, 'could not find the shared `privacy` object in conversion-api-tools.ts');
  assert.match(
    conversionApiToolsSrc,
    /privacyNote: privacy\.(zh|en)/,
    'expected the tools in conversion-api-tools.ts to use the shared `privacy` strings as their privacyNote',
  );

  const [zh] = extractField(block[1], 'zh');
  const [en] = extractField(block[1], 'en');
  assert.ok(zh, 'expected a zh string in the shared `privacy` object');
  assert.ok(en, 'expected an en string in the shared `privacy` object');

  assert.match(zh, /Conversion API/, 'zh privacyNote must name the conversion upload');
  assert.match(zh, /寄|email/i, 'zh privacyNote must describe the email delivery path');
  assert.match(zh, /roomfeng\.win/, 'zh privacyNote must name the second origin the output file is sent to');

  assert.match(en, /Conversion API/, 'en privacyNote must name the conversion upload');
  assert.match(en, /email/i, 'en privacyNote must describe the email delivery path');
  assert.match(en, /roomfeng\.win/, 'en privacyNote must name the second origin the output file is sent to');
});

// --- 2. The browser-local tools must stay browser-local --------------------
// This is the anti-regression guard that replaces the old "their copy is
// false" assertions: their copy is true again, and stays true only as long
// as these components never route a download through the upload gate.

for (const { slug, component } of LOCAL_TOOLS) {
  test(`${component}.astro (${slug}) does not route downloads through the upload gate`, () => {
    const src = readToolComponent(component);
    assert.ok(
      !src.includes('requestGatedDownload'),
      `${component}.astro calls requestGatedDownload(), which uploads the generated file and an email address to SITE.downloadGateEndpoint -- this tool's copy claims browser-local processing, so it must download locally`,
    );
    assert.ok(
      !src.includes('downloadGate.client'),
      `${component}.astro imports the download-gate module; a browser-local tool must not depend on it`,
    );
  });
}

test('the browser-local tools are tagged local-only in the registry', () => {
  for (const { slug } of LOCAL_TOOLS) {
    const idx = toolsSrc.indexOf(`slug: '${slug}'`);
    assert.ok(idx >= 0, `could not find tools.ts entry for ${slug}`);
    const chunk = toolsSrc.slice(Math.max(0, idx - 400), idx + 700);
    assert.match(
      chunk,
      /privacyLevel: 'local-only'/,
      `${slug} computes and downloads entirely in the browser and should be tagged privacyLevel: 'local-only'`,
    );
  }
});

// --- 3. Category-level intro copy for categories that contain an upload tool
// "image" contains bulk-image-compressor; "draw" contains image-to-dxf.
// Neither category may claim that everything in it is processed locally.

test("categoryContent.ts 'image' category intro makes no unqualified all-local claim", () => {
  const intro = extractIntroBlock(extractCategoryBlock('image'));
  assertNoForbiddenClaim(intro, 'categoryContent.ts image category intro');
});

test("categoryContent.ts 'draw' category intro makes no unqualified all-local claim", () => {
  const intro = extractIntroBlock(extractCategoryBlock('draw'));
  assertNoForbiddenClaim(intro, 'categoryContent.ts draw category intro');
});

test("categoryContent.ts 'pdf' category intro makes no unqualified all-local claim", () => {
  // Regression lock: the pdf category's own intro/metaDescription/FAQ are
  // correctly hedged ("視工具而定" / organizers vs. conversion tools).
  const intro = extractIntroBlock(extractCategoryBlock('pdf'));
  assertNoForbiddenClaim(intro, 'categoryContent.ts pdf category intro');
});

// --- 4. SEO guide built around the "merge without uploading" promise -------
// merge-pdf is genuinely browser-local, so the guide may make that promise
// for it. What it may NOT do is stretch the promise over the tools it also
// recommends that upload (pdf-compressor).

function guideEntry(pattern, label) {
  const m = seoGuidesSrc.match(pattern);
  assert.ok(m, `could not find the ${label} entry in seoGuides.ts`);
  return m[0];
}

const mergeGuideZh = guideEntry(/\{\s*\n\s*id: 'merge-pdf-private-guide',[\s\S]*?\n  \},/, 'merge-pdf-private-guide (zh)');
const mergeGuideEn = guideEntry(/'merge-pdf-private-guide':\s*\{[\s\S]*?\n  \},/, 'merge-pdf-private-guide (en translation)');

function assertNoLocalClaimAboutCompression(entryText, label) {
  const offenders = extractStringLiterals(entryText)
    .filter((value) => findForbiddenMatches(value).length > 0)
    .filter((value) => /壓縮|compress/i.test(value));
  assert.deepEqual(
    offenders,
    [],
    `${label} attaches a "files never leave your device" claim to the compression tool, which uploads to the Conversion API: ${JSON.stringify(offenders)}`,
  );
}

test('merge-pdf-private-guide (zh) keeps its no-upload claim off the uploading compressor', () => {
  assertNoLocalClaimAboutCompression(mergeGuideZh, 'seoGuides.ts merge-pdf-private-guide (zh)');
});

test('merge-pdf-private-guide (en) keeps its no-upload claim off the uploading compressor', () => {
  assertNoLocalClaimAboutCompression(mergeGuideEn, 'seoGuides.ts merge-pdf-private-guide (en)');
});

test('merge-pdf-private-guide links to pdf-compressor and discloses that it uploads', () => {
  assert.match(mergeGuideZh, /relatedToolIds:.*'pdf-compressor'/, 'expected relatedToolIds to include pdf-compressor');
  assert.match(
    mergeGuideZh,
    /上傳到 Conversion API/,
    'the zh guide recommends the compressor inside a "no upload" article and must say that the compressor uploads',
  );
  assert.match(
    mergeGuideEn,
    /uploads your file to the Conversion API/,
    'the en guide recommends the compressor inside a "no upload" article and must say that the compressor uploads',
  );
});

// --- 5. Stale content/seo-guides markdown describing a pre-migration,
// local-only version of pdf-compressor. The live /tools/pdf-compressor/ is
// wired to ConversionApiTool and uploads to the Conversion API; the local
// 40MB component still exists but only backs the /es/ and /fr/ routes.

test('compress-pdf-to-upload-limit.md does not claim PDF Compressor runs locally', () => {
  const matchedText = compressGuideMd.match(/.{0,20}在瀏覽器本機處理.{0,20}/)?.[0] ?? null;
  assert.equal(
    matchedText,
    null,
    'guide describes the live /tools/pdf-compressor/ as browser-local, but it is wired to ConversionApiTool and uploads to the Conversion API',
  );
});

test('compress-pdf-to-upload-limit.md single-file limit matches the live backend limit', () => {
  const backendLimitMatch = backendCommonPy.match(/FUNNYTOOLS_MAX_UPLOAD_MB", "(\d+)"/);
  assert.ok(backendLimitMatch, 'could not find MAX_SINGLE_UPLOAD_MB default in backend/services/common.py');
  const backendLimitMb = backendLimitMatch[1];

  const guideLimitMatch = compressGuideMd.match(/單檔輸入上限為\s*\*\*(\d+)MB\*\*/);
  assert.ok(guideLimitMatch, 'could not find the stated single-file limit in the guide');

  assert.equal(
    guideLimitMatch[1],
    backendLimitMb,
    `guide states a ${guideLimitMatch[1]}MB single-file limit; the live backend limit is ${backendLimitMb}MB`,
  );
});
