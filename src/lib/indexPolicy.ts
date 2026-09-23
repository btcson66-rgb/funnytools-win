export const INDEXABLE_PATHS = [
  '/',
  '/education-statistics/',
  '/category/statistics/',
  '/guides/t-score-calculator-guide/',
  '/tools/t-score-calculator/',
  '/tools/grade-average/',
  '/tools/class-rank-percentile-calculator/',
  '/tools/percentile-rank-calculator/',
  '/tools/z-score-calculator/',
  '/tools/standard-deviation/',
  '/tools/weighted-average-calculator/',
  '/tools/teacher-exam-score-converter/',
  '/tools/independent-samples-t-test-calculator/',
  '/tools/random-name-picker/',
  '/about/',
  '/contact/',
  '/privacy/',
  '/terms/',
  '/disclaimer/',
  '/support/',
] as const;

export type IndexablePath = (typeof INDEXABLE_PATHS)[number];
const indexablePathSet = new Set<string>(INDEXABLE_PATHS);

export function normalizeIndexPath(value: string): string {
  let pathname = value;
  try {
    pathname = new URL(value, 'https://funnytools.win').pathname;
  } catch {
    pathname = value.split(/[?#]/, 1)[0] ?? '/';
  }
  const normalized = `/${pathname}`.replace(/\/{2,}/g, '/');
  return normalized === '/' ? '/' : `/${normalized.replace(/^\/+|\/+$/g, '')}/`;
}

export function isIndexablePath(value: string): value is IndexablePath {
  return indexablePathSet.has(normalizeIndexPath(value));
}

export const INDEXABLE_TOOL_SLUGS = INDEXABLE_PATHS
  .filter((path) => path.startsWith('/tools/'))
  .map((path) => path.split('/')[2]);
