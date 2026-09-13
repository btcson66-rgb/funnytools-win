import test from 'node:test';
import assert from 'node:assert/strict';
import { buildBoilerplateModel, classifyIntentPair, functionalSignature, normalizeBlock, removeBoilerplateBlocks } from '../scripts/index-recovery-classifier.mjs';

function tool(slug, cluster = 'general', locale = 'en') {
  return { pageType: 'tool', page_type: 'tool', toolSlug: slug, locale, cluster, content_cluster: cluster, signature: functionalSignature(slug) };
}
function guide(slug, cluster = 'statistics', locale = 'en') {
  return { pageType: 'guide', page_type: 'guide', route: `/en/guides/${slug}/`, locale, cluster, content_cluster: cluster };
}

test('directional converters are DIFFERENT even with high text similarity', () => {
  const left = functionalSignature('jpg-to-png');
  const right = functionalSignature('png-to-jpg');
  assert.equal(left.source, 'jpg');
  assert.equal(left.target, 'png');
  assert.equal(right.source, 'png');
  assert.equal(right.target, 'jpg');
  assert.equal(classifyIntentPair(tool('jpg-to-png', 'image'), tool('png-to-jpg', 'image'), { rawSimilarity: 0.99, adjustedSimilarity: 0.99 }).intentRelationship, 'DIFFERENT');
});

test('JPG/WebP and CSV/JSON reverse directions are DIFFERENT', () => {
  assert.equal(classifyIntentPair(tool('jpg-to-webp', 'image'), tool('webp-to-jpg', 'image'), { rawSimilarity: 0.95 }).intentRelationship, 'DIFFERENT');
  assert.equal(classifyIntentPair(tool('csv-to-json', 'text'), tool('json-to-csv', 'text'), { rawSimilarity: 0.95 }).intentRelationship, 'DIFFERENT');
});

test('delete and extract PDF pages have different functional outcomes', () => {
  const deleted = functionalSignature('delete-pdf-pages');
  const extracted = functionalSignature('extract-pdf-pages');
  assert.notEqual(deleted.outcome, extracted.outcome);
  const result = classifyIntentPair(tool('delete-pdf-pages', 'pdf'), tool('extract-pdf-pages', 'pdf'), { rawSimilarity: 0.93, adjustedSimilarity: 0.80 });
  assert.equal(result.intentRelationship, 'DIFFERENT');
  assert.equal(result.functionalEquivalence, 'NO');
});

test('related calculations are ADJACENT rather than merge candidates', () => {
  assert.equal(classifyIntentPair(tool('standard-deviation', 'statistics'), tool('z-score-calculator', 'statistics'), { rawSimilarity: 0.91 }).intentRelationship, 'ADJACENT');
  assert.equal(classifyIntentPair(tool('grade-average', 'statistics'), tool('weighted-average-calculator', 'statistics'), { rawSimilarity: 0.91 }).intentRelationship, 'ADJACENT');
});

test('tool and guide are COMPLEMENTARY by default', () => {
  const result = classifyIntentPair(tool('t-score-calculator', 'statistics'), guide('t-score-calculator-guide'), { rawSimilarity: 0.94, adjustedSimilarity: 0.90 });
  assert.equal(result.intentRelationship, 'COMPLEMENTARY');
  assert.equal(result.mergeConfidence, 'LOW');
});

test('identical functional signatures are the only high-confidence SAME tool pair', () => {
  const result = classifyIntentPair(tool('jpg-to-png', 'image'), tool('jpg-to-png', 'image'), { rawSimilarity: 0.99, adjustedSimilarity: 0.99 });
  assert.equal(result.intentRelationship, 'SAME');
  assert.equal(result.functionalEquivalence, 'YES');
  assert.equal(result.mergeConfidence, 'HIGH');
});

test('block-level boilerplate model removes repeated main-content blocks only', () => {
  const repeated = 'Runs in your browser and the original file stays on your device for privacy.';
  const model = buildBoilerplateModel([
    { id: 'a', blocks: [repeated, 'A unique JPG to PNG conversion explanation with a distinct output.'] },
    { id: 'b', blocks: [repeated, 'A unique PNG to JPG conversion explanation with a distinct output.'] },
    { id: 'c', blocks: [repeated, 'A unique CSV to JSON conversion explanation with a distinct output.'] },
  ], { minimumDocumentCount: 3, fraction: 0.5 });
  assert.ok(model.repeatedBlocks.has(normalizeBlock(repeated)));
  assert.equal(removeBoilerplateBlocks([repeated, 'Keep this unique task explanation.'], model), 'Keep this unique task explanation.');
});
