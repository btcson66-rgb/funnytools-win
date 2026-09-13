const EXPLICIT_SIGNATURES = new Map([
  ['jpg-to-png', { action: 'convert', source: 'jpg', target: 'png', outcome: 'png-file', function: 'image-format-conversion' }],
  ['png-to-jpg', { action: 'convert', source: 'png', target: 'jpg', outcome: 'jpg-file', function: 'image-format-conversion' }],
  ['jpg-to-webp', { action: 'convert', source: 'jpg', target: 'webp', outcome: 'webp-file', function: 'image-format-conversion' }],
  ['webp-to-jpg', { action: 'convert', source: 'webp', target: 'jpg', outcome: 'jpg-file', function: 'image-format-conversion' }],
  ['csv-to-json', { action: 'convert', source: 'csv', target: 'json', outcome: 'json-data', function: 'data-format-conversion' }],
  ['json-to-csv', { action: 'convert', source: 'json', target: 'csv', outcome: 'csv-data', function: 'data-format-conversion' }],
  ['delete-pdf-pages', { action: 'delete', source: 'pdf', target: 'pdf', outcome: 'remove-selected-pages', function: 'pdf-page-editing' }],
  ['extract-pdf-pages', { action: 'extract', source: 'pdf', target: 'pdf', outcome: 'new-document-from-selected-pages', function: 'pdf-page-editing' }],
  ['standard-deviation', { action: 'calculate', source: 'raw-scores', target: 'summary-statistics', outcome: 'mean-variance-standard-deviation', function: 'descriptive-statistics' }],
  ['z-score-calculator', { action: 'calculate', source: 'score-and-distribution', target: 'standardized-score', outcome: 'z-score', function: 'score-standardization' }],
  ['grade-average', { action: 'calculate', source: 'grades', target: 'average-grade', outcome: 'grade-average', function: 'grade-calculation' }],
  ['weighted-average-calculator', { action: 'calculate', source: 'values-and-weights', target: 'weighted-result', outcome: 'weighted-average', function: 'weighted-calculation' }],
  ['t-score-calculator', { action: 'calculate', source: 'z-score', target: 'standardized-score', outcome: 't-score', function: 'score-standardization' }],
  ['percentile-rank-calculator', { action: 'calculate', source: 'score-and-distribution', target: 'rank', outcome: 'percentile-rank', function: 'rank-calculation' }],
  ['normalized-score-converter', { action: 'convert', source: 'raw-score-and-target-scale', target: 'standardized-score', outcome: 'normalized-score', function: 'score-standardization' }],
  ['merge-pdf', { action: 'merge', source: 'pdf-files', target: 'pdf', outcome: 'combined-document', function: 'pdf-document-assembly' }],
  ['split-pdf', { action: 'split', source: 'pdf', target: 'pdf-files', outcome: 'separate-documents', function: 'pdf-document-assembly' }],
  ['pdf-page-reorder', { action: 'reorder', source: 'pdf', target: 'pdf', outcome: 'reordered-document', function: 'pdf-page-editing' }],
  ['pdf-to-image', { action: 'convert', source: 'pdf', target: 'image', outcome: 'image-files', function: 'pdf-rendering' }],
  ['pdf-to-word', { action: 'convert', source: 'pdf', target: 'word', outcome: 'word-document', function: 'document-conversion' }],
  ['pdf-table-to-excel', { action: 'convert', source: 'pdf-table', target: 'excel', outcome: 'spreadsheet-data', function: 'table-extraction' }],
]);

const ACTION_RULES = [
  ['delete', 'delete'], ['extract', 'extract'], ['merge', 'merge'], ['split', 'split'],
  ['reorder', 'reorder'], ['rotate', 'transform'], ['resize', 'transform'], ['crop', 'transform'],
  ['compress', 'compress'], ['counter', 'count'], ['sort', 'sort'], ['remove', 'remove'],
  ['format', 'format'], ['preview', 'preview'], ['interpret', 'interpret'],
  ['generator', 'generate'], ['picker', 'select'], ['roller', 'generate'], ['wheel', 'select'],
  ['maker', 'create'], ['flowchart', 'create'], ['sketchpad', 'create'], ['calculator', 'calculate'],
  ['average', 'calculate'], ['score', 'calculate'], ['grade', 'calculate'], ['salary', 'calculate'],
];

function slugWords(slug) {
  return String(slug || '').toLocaleLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
}

export function tokenize(value) {
  return String(value || '').toLocaleLowerCase().match(/[\p{Script=Han}]|[\p{L}\p{N}][\p{L}\p{N}'’-]*/gu) || [];
}

function genericSignature(slug) {
  const normalized = String(slug || '').toLocaleLowerCase();
  const direction = normalized.match(/^(.+)-to-(.+)$/);
  if (direction) {
    const source = direction[1];
    const target = direction[2];
    return { action: 'convert', source, target, outcome: `${target}-output`, function: 'directional-conversion' };
  }
  const action = ACTION_RULES.find(([needle]) => normalized.includes(needle))?.[1] || 'use';
  const words = slugWords(normalized);
  const subject = words.filter((word) => !['online', 'calculator', 'generator', 'maker', 'tool'].includes(word)).join('-') || 'general';
  const outcomes = {
    calculate: 'calculated-result', compress: 'smaller-file', count: 'count', create: 'created-artifact',
    delete: 'edited-output', extract: 'extracted-output', format: 'formatted-output', generate: 'generated-result',
    interpret: 'interpreted-result', merge: 'combined-output', preview: 'preview', remove: 'cleaned-output',
    reorder: 'reordered-output', select: 'selected-result', sort: 'sorted-output', transform: 'transformed-output', use: 'tool-result',
  };
  return { action, source: subject, target: subject, outcome: outcomes[action] || 'tool-result', function: subject };
}

export function functionalSignature(toolSlug, audience = '') {
  const normalized = String(toolSlug || '').toLocaleLowerCase();
  const details = EXPLICIT_SIGNATURES.get(normalized) || genericSignature(normalized);
  const signature = [details.action, details.source, details.target, details.outcome, details.function, audience || 'general'].join('|');
  return {
    toolSlug: normalized,
    action: details.action,
    source: details.source,
    target: details.target,
    outcome: details.outcome,
    function: details.function,
    audience: audience || 'general',
    signature,
    confidence: EXPLICIT_SIGNATURES.has(normalized) ? 'HIGH' : 'MEDIUM',
    sourceOfTruth: EXPLICIT_SIGNATURES.has(normalized) ? 'explicit functional rule' : 'slug-derived fallback',
  };
}

function sameCluster(left, right) {
  return left.cluster && right.cluster && left.cluster === right.cluster;
}

function isConverter(signature) { return signature?.action === 'convert'; }

function topicKey(page) {
  if (page.toolSlug) return page.toolSlug.replace(/-(?:guide|calculator|tool|online)$/g, '');
  return String(page.route || page.url || '').replace(/^https?:\/\/[^/]+/, '').replace(/^\/(?:en|es|fr)\//, '').replace(/\/$/, '').replace(/-guide$/, '');
}

export function classifyIntentPair(left, right, { rawSimilarity = 0, adjustedSimilarity = 0 } = {}) {
  const sameLocale = left.locale === right.locale;
  const sameType = left.pageType === right.pageType;
  const leftSignature = left.signature || (left.toolSlug ? functionalSignature(left.toolSlug, left.audience) : null);
  const rightSignature = right.signature || (right.toolSlug ? functionalSignature(right.toolSlug, right.audience) : null);
  const result = {
    intentRelationship: 'UNKNOWN',
    functionalEquivalence: 'UNKNOWN',
    mergeConfidence: 'LOW',
    mergeReason: 'insufficient deterministic evidence; human review required',
    sameLocale,
    sameType,
    rawSimilarity,
    adjustedSimilarity,
  };
  if (!sameLocale) {
    result.intentRelationship = 'DIFFERENT';
    result.functionalEquivalence = 'NO';
    result.mergeReason = 'cross-locale comparison is not a duplicate decision';
    return result;
  }
  if (left.pageType === 'tool' && right.pageType === 'tool' && leftSignature && rightSignature) {
    if (leftSignature.signature === rightSignature.signature) {
      result.intentRelationship = 'SAME';
      result.functionalEquivalence = 'YES';
      result.mergeConfidence = 'HIGH';
      result.mergeReason = 'same functional signature: same action, inputs, output, and task';
      return result;
    }
    if (isConverter(leftSignature) && isConverter(rightSignature)) {
      result.intentRelationship = 'DIFFERENT';
      result.functionalEquivalence = 'NO';
      result.mergeReason = 'directional converter inputs/outputs differ';
      return result;
    }
    if (new Set(['delete', 'extract', 'merge', 'split', 'reorder']).has(leftSignature.action)
      || new Set(['delete', 'extract', 'merge', 'split', 'reorder']).has(rightSignature.action)) {
      result.intentRelationship = 'DIFFERENT';
      result.functionalEquivalence = 'NO';
      result.mergeReason = 'document operation outcome differs even when source format overlaps';
      return result;
    }
    result.intentRelationship = sameCluster(left, right) ? 'ADJACENT' : 'DIFFERENT';
    result.functionalEquivalence = 'NO';
    result.mergeReason = sameCluster(left, right)
      ? 'related topic but functional input/computation/output differs'
      : 'different functional category';
    return result;
  }
  if ((left.pageType === 'tool' && right.pageType === 'guide') || (left.pageType === 'guide' && right.pageType === 'tool')) {
    result.intentRelationship = 'COMPLEMENTARY';
    result.functionalEquivalence = 'NO';
    result.mergeReason = 'tool is DO intent; guide is LEARN intent; keep both by default';
    return result;
  }
  if (left.pageType === 'guide' && right.pageType === 'guide') {
    if (topicKey(left) === topicKey(right) && adjustedSimilarity >= 0.85) {
      result.intentRelationship = 'SAME';
      result.functionalEquivalence = 'UNKNOWN';
      result.mergeConfidence = 'MEDIUM';
      result.mergeReason = 'same guide topic and highly similar answer; confirm examples and methodology';
      return result;
    }
    result.intentRelationship = sameCluster(left, right) ? 'ADJACENT' : 'DIFFERENT';
    result.functionalEquivalence = 'NO';
    result.mergeReason = sameCluster(left, right) ? 'related learning topics; answer role may differ' : 'different learning topic';
    return result;
  }
  if (left.pageType === right.pageType && ['hub', 'category', 'audience', 'workflow'].includes(left.pageType)) {
    if (topicKey(left) === topicKey(right) && adjustedSimilarity >= 0.9) {
      result.intentRelationship = 'SAME';
      result.mergeConfidence = 'MEDIUM';
      result.mergeReason = 'same hierarchy topic with highly similar page role; verify navigation ownership';
    } else {
      result.intentRelationship = 'ADJACENT';
      result.mergeReason = 'shared hierarchy vocabulary does not prove redundant page role';
    }
    result.functionalEquivalence = 'UNKNOWN';
    return result;
  }
  result.intentRelationship = sameCluster(left, right) ? 'ADJACENT' : 'UNKNOWN';
  result.mergeReason = sameCluster(left, right) ? 'topic-adjacent pages with different page roles' : 'page roles cannot be deterministically compared';
  return result;
}

export function normalizeBlock(value) {
  return tokenize(value).join(' ').trim();
}

export function buildBoilerplateModel(documents, { minimumDocumentCount = 8, fraction = 0.15 } = {}) {
  const threshold = Math.max(minimumDocumentCount, Math.ceil(documents.length * fraction));
  const blockCounts = new Map();
  for (const document of documents) {
    const uniqueBlocks = new Set((document.blocks || []).map(normalizeBlock).filter((block) => block.split(' ').length >= 8));
    for (const block of uniqueBlocks) blockCounts.set(block, (blockCounts.get(block) || 0) + 1);
  }
  const repeatedBlocks = new Set([...blockCounts.entries()].filter(([, count]) => count >= threshold).map(([block]) => block));
  return { threshold, repeatedBlocks, repeatedBlockCount: repeatedBlocks.size };
}

export function removeBoilerplateBlocks(blocks, model) {
  return blocks.filter((block) => !model.repeatedBlocks.has(normalizeBlock(block))).join(' ');
}

export function cosineFromTokens(leftTokens, rightTokens, documentFrequency = null, totalDocuments = 1) {
  const left = new Map(); const right = new Map();
  for (const token of leftTokens) left.set(token, (left.get(token) || 0) + 1);
  for (const token of rightTokens) right.set(token, (right.get(token) || 0) + 1);
  const weight = (token, count) => count * (Math.log((totalDocuments + 1) / ((documentFrequency?.get(token) || 0) + 1)) + 1);
  let dot = 0; let leftNorm = 0; let rightNorm = 0;
  for (const [token, count] of left) { const value = weight(token, count); const other = weight(token, right.get(token) || 0); dot += value * other; leftNorm += value * value; }
  for (const [token, count] of right) { const value = weight(token, count); rightNorm += value * value; }
  return leftNorm && rightNorm ? dot / Math.sqrt(leftNorm * rightNorm) : 0;
}
