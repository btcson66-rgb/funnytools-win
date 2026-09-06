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
// - 3 more slugs render local components (canvas / pdf-lib) but route their
//   *download* button through `requestGatedDownload()`, which uploads the
//   generated file to a different origin (`SITE.downloadGateEndpoint`) unless
//   that request fails (MIXED). This second group is not something the task
//   brief named up front -- it was found by grepping every tool component for
//   `fetch`/upload call sites and is included here because the same
//   "unregistered upload tool" regression risk applies to it.

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

// --- Lock the MIXED slug list (local compute, but download routes through the
// email/download-gate upload path in src/lib/downloadGate.client.ts) ---
// This group was not named in the task brief; it was found by grepping every
// file under src/components/tools/*.astro for `requestGatedDownload` imports.
const toolsDir = new URL('../src/components/tools/', import.meta.url);
const gatedComponents = readdirSync(toolsDir)
  .filter((file) => file.endsWith('.astro'))
  .filter((file) => readFileSync(new URL(file, toolsDir), 'utf8').includes('requestGatedDownload'))
  .map((file) => file.replace(/\.astro$/, ''));

const componentToSlug = Object.fromEntries(
  Object.entries(widgetMap).map(([slug, component]) => [component, slug]),
);

const EXPECTED_MIXED_SLUGS = ['image-compressor', 'merge-pdf', 'qr-code-generator'].sort();

test('MIXED slug list (download-gate upload path) is locked to the known 3', () => {
  const actual = gatedComponents.map((component) => componentToSlug[component]).sort();
  assert.deepEqual(
    actual,
    EXPECTED_MIXED_SLUGS,
    'the set of tool components calling requestGatedDownload() changed -- each one uploads its output file to SITE.downloadGateEndpoint on download; review privacy copy for any new/removed slug before updating this list',
  );
});

test('MIXED tools are NOT tagged local-only in the registry (currently failing -- see privacy audit)', () => {
  // This assertion intentionally documents a real, currently-failing
  // invariant rather than being loosened to pass: all three MIXED tools are
  // tagged privacyLevel: 'local-only' today, even though their download
  // button uploads the output file to a different origin
  // (SITE.downloadGateEndpoint) via requestGatedDownload(). That tag drives a
  // false "never leaves your browser" badge/highlight/SEO description on
  // ToolCard.astro, ToolLayout.astro, and src/lib/seo.ts for exactly these
  // three tools. See reports/task-02-reliability/frontend-privacy-audit.md.
  for (const slug of EXPECTED_MIXED_SLUGS) {
    const tool = liveTools.find((t) => t.slug === slug);
    assert.ok(tool, `expected a live tool entry for ${slug}`);
    assert.notEqual(
      tool.privacyLevel,
      'local-only',
      `${slug} uploads its output file via the download-gate path but is tagged privacyLevel: 'local-only'`,
    );
  }
});
