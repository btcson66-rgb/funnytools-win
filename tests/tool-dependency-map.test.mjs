// Locks the tool -> widget/component -> backend-dependency mapping so that a
// future tool addition cannot silently skip widget/content registration, and
// cannot silently start uploading files (Conversion API, or the download-gate
// email path) without being added to the locked slug lists below.
//
// Background (verified against source, see reports/task-02-reliability/):
// - `tools.ts` currently has 83 live tools (not 84 -- see
//   frontend-tool-classification.md for how the "84" figure was checked and
//   found to overcount by one).
// - 5 slugs render `ConversionApiTool`, which always uploads the file to the
//   Conversion API (BACKEND_DEPENDENT).
// - The email download gate (`requestGatedDownload()`, which uploads the
//   generated output file and an email address to `SITE.downloadGateEndpoint`
//   on a second origin) sits on three browser-local tools by deliberate
//   product decision (image-compressor, merge-pdf, qr-code-generator). The
//   assertions below keep that set frozen: the gate must not spread to more
//   tools, and must never be added on top of the Conversion API upload.

import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { test } from 'node:test';

const toolsSrc = readFileSync(new URL('../src/data/tools.ts', import.meta.url), 'utf8');
const widgetsSrc = readFileSync(new URL('../src/lib/toolWidgets.ts', import.meta.url), 'utf8');
const contentSrc = readFileSync(new URL('../src/lib/toolContent.ts', import.meta.url), 'utf8');

// --- Parse live tool slugs directly from tools.ts (string-aware brace scan) ---
// A plain brace-count parse breaks on tools whose `icon` value itself contains
// '{' or '}' (e.g. json-formatter's icon is the literal string '{}'), so this
// walks the source char-by-char and ignores braces while inside a string.
function parseLiveToolSlugs(src) {
  const marker = 'export const tools: ToolMeta[] = [';
  const startIdx = src.indexOf(marker);
  assert.ok(startIdx >= 0, 'could not find the `tools` array literal in tools.ts');
  const arrStart = startIdx + marker.length - 1;

  let depth = 0;
  let objStart = -1;
  let inStr = false;
  let strCh = '';
  const objects = [];

  for (let i = arrStart; i < src.length; i += 1) {
    const c = src[i];
    const prev = src[i - 1];
    if (inStr) {
      if (c === strCh && prev !== '\\') inStr = false;
      continue;
    }
    if (c === "'" || c === '"') {
      inStr = true;
      strCh = c;
      continue;
    }
    if (c === '{') {
      if (depth === 0) objStart = i;
      depth += 1;
    } else if (c === '}') {
      depth -= 1;
      if (depth === 0) objects.push(src.slice(objStart, i + 1));
    } else if (c === ']' && depth === 0) {
      break;
    }
  }

  return objects
    .map((obj) => {
      const slugMatch = obj.match(/slug:\s*'([^']+)'/);
      const statusMatch = obj.match(/status:\s*'(live|planned)'/);
      const privacyMatch = obj.match(/privacyLevel:\s*'([^']+)'/);
      return {
        slug: slugMatch?.[1],
        status: statusMatch?.[1],
        privacyLevel: privacyMatch?.[1],
      };
    })
    .filter((t) => t.status === 'live');
}

const liveTools = parseLiveToolSlugs(toolsSrc);

test('tools.ts parses to at least one live tool (sanity check on the parser itself)', () => {
  assert.ok(liveTools.length > 0, 'parser found zero live tools -- it is almost certainly broken, not the data');
  const slugs = liveTools.map((t) => t.slug);
  assert.equal(new Set(slugs).size, slugs.length, 'duplicate slug found among live tools');
});

// --- Parse widgetBySlug from toolWidgets.ts (slug -> imported component name) ---
function parseWidgetMap(src) {
  const objMatch = src.match(/export const widgetBySlug = \{([\s\S]*?)\n\} as const;/);
  assert.ok(objMatch, 'could not find widgetBySlug object literal in toolWidgets.ts');
  const body = objMatch[1];
  const map = {};
  for (const line of body.split('\n')) {
    const m = line.match(/^\s*(?:'([^']+)'|([A-Za-z0-9_]+)):\s*([A-Za-z0-9_]+),?\s*$/);
    if (m) map[m[1] || m[2]] = m[3];
  }
  return map;
}

const widgetMap = parseWidgetMap(widgetsSrc);

// --- Parse contentBySlug from toolContent.ts (slug -> imported content name) ---
function parseContentMap(src) {
  const objMatch = src.match(/export const contentBySlug = \{([\s\S]*?)\n\} satisfies/);
  assert.ok(objMatch, 'could not find contentBySlug object literal in toolContent.ts');
  const body = objMatch[1];
  const map = {};
  for (const line of body.split('\n')) {
    const m = line.match(/^\s*(?:'([^']+)'|([A-Za-z0-9_]+)):\s*([A-Za-z0-9_]+),?\s*$/);
    if (m) map[m[1] || m[2]] = m[3];
  }
  return map;
}

const contentMap = parseContentMap(contentSrc);

test('every live tool has a registered widget component', () => {
  const missing = liveTools.filter((t) => !widgetMap[t.slug]).map((t) => t.slug);
  assert.deepEqual(missing, [], `live tools with no entry in widgetBySlug: ${missing.join(', ')}`);
});

test('every live tool has registered i18n content', () => {
  const missing = liveTools.filter((t) => !contentMap[t.slug]).map((t) => t.slug);
  assert.deepEqual(missing, [], `live tools with no entry in contentBySlug: ${missing.join(', ')}`);
});

test('widgetBySlug has no orphaned entries for tools that are not live', () => {
  const liveSlugSet = new Set(liveTools.map((t) => t.slug));
  const orphaned = Object.keys(widgetMap).filter((slug) => !liveSlugSet.has(slug));
  assert.deepEqual(orphaned, [], `widgetBySlug has entries with no matching live tool: ${orphaned.join(', ')}`);
});

// --- Lock the BACKEND_DEPENDENT slug list (ConversionApiTool consumers) ---
// Every one of these always uploads the whole file to the Conversion API
// (see src/lib/funnytools-api.ts / src/components/tools/ConversionApiTool.astro).
// If this list changes, someone added or removed a tool that fetches an
// external API -- the registry's `privacyLevel` and the tool's own privacy
// copy must be reviewed before this assertion is updated.
const EXPECTED_BACKEND_DEPENDENT_SLUGS = [
  'bulk-image-compressor',
  'image-to-dxf',
  'pdf-compressor',
  'pdf-table-to-excel',
  'pdf-to-word',
].sort();

test('BACKEND_DEPENDENT slug list (ConversionApiTool) is locked to the known 5', () => {
  const actual = Object.entries(widgetMap)
    .filter(([, component]) => component === 'ConversionApiTool')
    .map(([slug]) => slug)
    .sort();
  assert.deepEqual(
    actual,
    EXPECTED_BACKEND_DEPENDENT_SLUGS,
    'the set of slugs wired to ConversionApiTool changed -- review privacyLevel and privacy copy for any new/removed slug before updating this list',
  );
});

test('BACKEND_DEPENDENT slugs are tagged anonymous-api in the registry, not local-only', () => {
  for (const slug of EXPECTED_BACKEND_DEPENDENT_SLUGS) {
    const tool = liveTools.find((t) => t.slug === slug);
    assert.ok(tool, `expected a live tool entry for ${slug}`);
    assert.equal(
      tool.privacyLevel,
      'anonymous-api',
      `${slug} uploads to the Conversion API and must be tagged privacyLevel: 'anonymous-api'`,
    );
  }
});

// --- Lock the download-gate wiring ----------------------------------------
// The download gate is an intentional lead-capture pilot (boss directive
// 2026-07-10, commit b9b5ee4): the tool stays free, and the download button
// asks for an email so the file can be mailed and the address added to the
// new-tool list. It runs on exactly three tools.
//
// What it actually does at download time: POSTs the email and, for outputs up
// to 5 MiB, the generated file to SITE.downloadGateEndpoint on a second origin
// (roomfeng.win). That is a real upload, so two things must stay true and are
// asserted here:
//   1. the pilot does not silently spread to more tools, and
//   2. it is never added to the Conversion API tools, which would give them a
//      SECOND upload hop on top of the conversion upload.
// Their privacy copy is guarded separately in privacy-claim-consistency.test.mjs.
const toolsDir = new URL('../src/components/tools/', import.meta.url);
const gatedComponents = readdirSync(toolsDir)
  .filter((file) => file.endsWith('.astro'))
  .filter((file) => readFileSync(new URL(file, toolsDir), 'utf8').includes('requestGatedDownload'))
  .map((file) => file.replace(/\.astro$/, ''))
  .sort();

const EXPECTED_GATED_SLUGS = ['image-compressor', 'merge-pdf', 'qr-code-generator'].sort();

test('the download gate is wired into exactly the three pilot components', () => {
  assert.deepEqual(
    gatedComponents,
    ['ImageCompressor', 'MergePdf', 'QrCodeGenerator'],
    'the set of components calling requestGatedDownload() changed. The gate uploads the generated file and an email address to a second origin, so adding or removing one is a product decision (lead funnel), not a refactor -- get it agreed before updating this list, and update the tool privacy copy with it',
  );
});

test('the gated slugs are exactly the three pilot tools', () => {
  const gatedSlugs = Object.entries(widgetMap)
    .filter(([, component]) => gatedComponents.includes(component))
    .map(([slug]) => slug)
    .sort();
  assert.deepEqual(gatedSlugs, EXPECTED_GATED_SLUGS, 'the set of slugs whose download button routes through the email gate changed');
});

test('no Conversion API tool routes its download through the gate', () => {
  // These already upload the input file for conversion. Gating their download
  // as well would send the OUTPUT to a second origin too -- two upload hops
  // for one conversion. Keep the two mechanisms separate.
  for (const slug of EXPECTED_BACKEND_DEPENDENT_SLUGS) {
    const component = widgetMap[slug];
    assert.ok(component, `expected a widget component for ${slug}`);
    assert.ok(
      !gatedComponents.includes(component),
      `${slug} uploads its input to the Conversion API and its ${component} download button now also routes through requestGatedDownload(), adding a second upload of the output to SITE.downloadGateEndpoint`,
    );
  }
});

test('the gated tools compute locally and stay tagged local-only', () => {
  // The gate sits on the download step, not the processing step: these three
  // still do their actual work in the browser, which is what local-only tags.
  // The upload that the gate performs is disclosed in the gate's own copy.
  for (const slug of EXPECTED_GATED_SLUGS) {
    const tool = liveTools.find((t) => t.slug === slug);
    assert.ok(tool, `expected a live tool entry for ${slug}`);
    assert.equal(
      tool.privacyLevel,
      'local-only',
      `${slug} processes its input in the browser and must stay tagged privacyLevel: 'local-only'`,
    );
  }
});
