import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

import {
  extractArrayObjectFieldsFromFile,
  extractDefaultImportsFromFile,
  extractObjectIdentifierMapFromFile,
  resolveRelativeImport,
} from './helpers/static-ts-registry.mjs';
import {
  CONVERSION_API_TOOLS,
  DOWNLOAD_GATED_TOOLS,
  classifyToolDataFlow,
} from '../src/lib/toolDataFlow.ts';

const sort = (values) => [...values].sort();

const toolRecords = extractArrayObjectFieldsFromFile(
  'src/data/tools.ts',
  'tools',
  ['slug', 'status', 'privacyLevel'],
);
const liveTools = toolRecords.filter(({ status }) => status === 'live');
const liveSlugs = liveTools.map(({ slug }) => slug);
const widgetMap = extractObjectIdentifierMapFromFile(
  'src/lib/toolWidgets.ts',
  'widgetBySlug',
);
const contentMap = extractObjectIdentifierMapFromFile(
  'src/lib/toolContent.ts',
  'contentBySlug',
);
const widgetImports = extractDefaultImportsFromFile('src/lib/toolWidgets.ts');

function componentSource(componentName) {
  const specifier = widgetImports[componentName];
  assert.ok(specifier, `widget ${componentName} must have a default import`);
  const absolutePath = resolveRelativeImport('src/lib/toolWidgets.ts', specifier);
  assert.ok(absolutePath, `widget ${componentName} must use a relative import`);
  return readFileSync(absolutePath, 'utf8');
}

const uniqueComponents = [...new Set(Object.values(widgetMap))];
const gatedComponents = new Set(
  uniqueComponents.filter((component) =>
    /\brequestGatedDownload\s*\(/.test(componentSource(component))),
);
const derivedConversionSlugs = sort(
  Object.entries(widgetMap)
    .filter(([, component]) => component === 'ConversionApiTool')
    .map(([slug]) => slug),
);
const derivedGatedSlugs = sort(
  Object.entries(widgetMap)
    .filter(([, component]) => gatedComponents.has(component))
    .map(([slug]) => slug),
);

test('live tool registry, widgets, and content use the same slug set', () => {
  assert.equal(new Set(liveSlugs).size, liveSlugs.length, 'live tool slugs must be unique');
  assert.deepEqual(sort(Object.keys(widgetMap)), sort(liveSlugs));
  assert.deepEqual(sort(Object.keys(contentMap)), sort(liveSlugs));
});

test('data-flow lists are derived from actual component wiring', () => {
  assert.deepEqual(sort(CONVERSION_API_TOOLS), derivedConversionSlugs);
  assert.deepEqual(sort(DOWNLOAD_GATED_TOOLS), derivedGatedSlugs);
  const overlap = DOWNLOAD_GATED_TOOLS.filter((slug) => CONVERSION_API_TOOLS.includes(slug));
  assert.equal(
    overlap.length,
    0,
    'conversion and gated lists must not overlap',
  );
});

test('privacy metadata agrees with conversion and gated component contracts', () => {
  const bySlug = new Map(liveTools.map((record) => [record.slug, record]));

  for (const slug of derivedConversionSlugs) {
    assert.equal(bySlug.get(slug)?.privacyLevel, 'anonymous-api', `${slug} must be anonymous-api`);
  }
  for (const slug of derivedGatedSlugs) {
    assert.equal(bySlug.get(slug)?.privacyLevel, 'local-only', `${slug} must be local-only`);
  }
  assert.deepEqual(
    sort(liveTools.filter(({ privacyLevel }) => privacyLevel === 'anonymous-api').map(({ slug }) => slug)),
    derivedConversionSlugs,
  );
});

test('classifyToolDataFlow agrees with every live tool registry entry', () => {
  const conversion = new Set(derivedConversionSlugs);
  const gated = new Set(derivedGatedSlugs);

  for (const { slug, privacyLevel } of liveTools) {
    if (conversion.has(slug)) {
      assert.equal(classifyToolDataFlow(slug, 'canonical'), 'BACKEND_INPUT_UPLOAD');
    } else if (gated.has(slug)) {
      assert.equal(classifyToolDataFlow(slug, 'canonical'), 'LOCAL_PROCESSING_GATED_OUTPUT');
    } else if (privacyLevel === 'requires-account') {
      assert.notEqual(classifyToolDataFlow(slug, 'canonical'), 'LOCAL_ONLY');
    } else {
      assert.equal(classifyToolDataFlow(slug, 'canonical'), 'LOCAL_ONLY');
    }
  }
});
