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
//   on a second origin) used to sit on three browser-local tools
//   (image-compressor, merge-pdf, qr-code-generator) whose own copy promised
//   nothing was uploaded. It now sits only on the tools that already upload,
//   i.e. exactly the ConversionApiTool consumers, and the assertions below
//   keep it there: a new gated component, or a gated slug missing from
//   `src/lib/downloadGateTools.ts`, turns this file red.

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
// The gate uploads the OUTPUT file plus the visitor's email address to
// SITE.downloadGateEndpoint (a different origin). It may therefore only be
// attached to tools that already upload the file for their core function.
const toolsDir = new URL('../src/components/tools/', import.meta.url);
const gatedComponents = readdirSync(toolsDir)
  .filter((file) => file.endsWith('.astro'))
  .filter((file) => readFileSync(new URL(file, toolsDir), 'utf8').includes('requestGatedDownload'))
  .map((file) => file.replace(/\.astro$/, ''))
  .sort();

test('the email download gate is only wired into ConversionApiTool', () => {
  assert.deepEqual(
    gatedComponents,
    ['ConversionApiTool'],
    'a tool component other than ConversionApiTool calls requestGatedDownload(); that uploads the generated output file and an email address to SITE.downloadGateEndpoint, so it may only be used by tools that already upload the file (and whose privacy copy says so)',
  );
});

test('every gated component only serves the BACKEND_DEPENDENT slugs', () => {
  const gatedSlugs = Object.entries(widgetMap)
    .filter(([, component]) => gatedComponents.includes(component))
    .map(([slug]) => slug)
    .sort();
  assert.deepEqual(
    gatedSlugs,
    EXPECTED_BACKEND_DEPENDENT_SLUGS,
    'the set of slugs whose download button routes through the email gate changed -- review the tool privacy copy for any new/removed slug before updating this list',
  );
});

// --- Lock the layout-level gate switch -------------------------------------
// ToolLayout used to inject the gate config on EVERY tool page, so any
// component that called requestGatedDownload() was live everywhere. The
// config tag is now scoped to src/lib/downloadGateTools.ts.
const downloadGateToolsSrc = readFileSync(new URL('../src/lib/downloadGateTools.ts', import.meta.url), 'utf8');
const toolLayoutSrc = readFileSync(new URL('../src/layouts/ToolLayout.astro', import.meta.url), 'utf8');

test('DOWNLOAD_GATE_SLUGS matches the BACKEND_DEPENDENT slug list', () => {
  const listMatch = downloadGateToolsSrc.match(/export const DOWNLOAD_GATE_SLUGS = \[([\s\S]*?)\] as const;/);
  assert.ok(listMatch, 'could not find DOWNLOAD_GATE_SLUGS in src/lib/downloadGateTools.ts');
  const declared = [...listMatch[1].matchAll(/'([^']+)'/g)].map((m) => m[1]).sort();
  assert.deepEqual(
    declared,
    EXPECTED_BACKEND_DEPENDENT_SLUGS,
    'DOWNLOAD_GATE_SLUGS drifted from the set of tools that already upload their file; a browser-local slug listed here would get an email gate that uploads its output',
  );
});

test('ToolLayout only injects the download-gate config for the gated slugs', () => {
  assert.match(
    toolLayoutSrc,
    /usesDownloadGate\(tool\.slug\)/,
    'ToolLayout must gate the data-download-gate-config script tag on usesDownloadGate(tool.slug); injecting it site-wide re-arms the gate on every tool page',
  );
});

// --- The formerly gated, browser-local tools --------------------------------
// These three compute in the browser and now download in the browser too, so
// their "runs in your browser" copy is accurate. The guard that keeps it
// accurate is component-level (see tests/privacy-claim-consistency.test.mjs)
// plus the registry tag below.
const FORMERLY_GATED_LOCAL_SLUGS = ['image-compressor', 'merge-pdf', 'qr-code-generator'].sort();

test('the formerly gated tools are browser-local and tagged local-only', () => {
  for (const slug of FORMERLY_GATED_LOCAL_SLUGS) {
    const tool = liveTools.find((t) => t.slug === slug);
    assert.ok(tool, `expected a live tool entry for ${slug}`);
    assert.equal(
      tool.privacyLevel,
      'local-only',
      `${slug} computes and downloads entirely in the browser, so it must stay tagged privacyLevel: 'local-only'`,
    );
    const component = widgetMap[slug];
    assert.ok(component, `expected a widget component for ${slug}`);
    assert.ok(
      !gatedComponents.includes(component),
      `${slug} renders ${component}, which calls requestGatedDownload() -- a local-only tool must not upload its output file`,
    );
  }
});
