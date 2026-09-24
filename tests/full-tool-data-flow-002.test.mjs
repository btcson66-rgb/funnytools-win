import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const repo = fileURLToPath(new URL('../', import.meta.url));
const { classifyCanonicalToolDataFlow, CONVERSION_API_TOOLS, DOWNLOAD_GATED_TOOLS } = await import('../src/lib/toolDataFlow.ts');
const source = ts.createSourceFile('tools.ts', fs.readFileSync(path.join(repo, 'src/data/tools.ts'), 'utf8'), ts.ScriptTarget.Latest, true);
const declaration = source.statements.flatMap((statement) => ts.isVariableStatement(statement) ? [...statement.declarationList.declarations] : [])
  .find((item) => item.name.getText(source) === 'tools');
assert.ok(declaration && ts.isArrayLiteralExpression(declaration.initializer));
const field = (object, name) => object.properties.find((property) => ts.isPropertyAssignment(property) && property.name.getText(source) === name)?.initializer?.text;
const liveTools = declaration.initializer.elements
  .filter(ts.isObjectLiteralExpression)
  .map((object) => ({ slug: field(object, 'slug'), status: field(object, 'status'), privacyLevel: field(object, 'privacyLevel') }))
  .filter((tool) => tool.status === 'live' && fs.existsSync(path.join(repo, 'dist', 'tools', tool.slug, 'index.html')));

test('every live canonical tool has one data-flow class and a rendered route', () => {
  const seen = new Set();
  const totals = { LOCAL_ONLY: 0, LOCAL_PROCESSING_GATED_OUTPUT: 0, CONVERSION_API: 0 };
  for (const tool of liveTools) {
    assert.ok(!seen.has(tool.slug), `duplicate slug: ${tool.slug}`);
    seen.add(tool.slug);
    const dataFlow = classifyCanonicalToolDataFlow(tool.slug);
    assert.ok(Object.hasOwn(totals, dataFlow), `${tool.slug}: unknown data-flow class`);
    totals[dataFlow]++;
    assert.ok(fs.existsSync(path.join(repo, 'dist', 'tools', tool.slug, 'index.html')), `${tool.slug}: canonical route not built`);
    assert.equal(tool.privacyLevel === 'anonymous-api', dataFlow === 'CONVERSION_API', `${tool.slug}: registry privacy mismatch`);
  }
  assert.deepEqual([...CONVERSION_API_TOOLS].sort(), liveTools.filter((tool) => classifyCanonicalToolDataFlow(tool.slug) === 'CONVERSION_API').map((tool) => tool.slug).sort());
  assert.deepEqual([...DOWNLOAD_GATED_TOOLS].sort(), liveTools.filter((tool) => classifyCanonicalToolDataFlow(tool.slug) === 'LOCAL_PROCESSING_GATED_OUTPUT').map((tool) => tool.slug).sort());
  assert.equal(Object.values(totals).reduce((sum, count) => sum + count, 0), liveTools.length);
  assert.ok(liveTools.length >= 83, `tool registry shrank to ${liveTools.length}`);
});
