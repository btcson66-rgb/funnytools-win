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

// P1 (2026-10-15): the indexable set is the education-statistics core only.
// General-purpose tools (PDF, image, text, time, money ...) stay available but
// are noindex and outside the sitemap. Do not add paths here without a CEO decision.
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

/** Tool slugs that carry the named-author byline and Person schema. */
const AUTHORED_TOOL_SLUGS = new Set<string>(INDEXABLE_TOOL_SLUGS);
export function isAuthoredToolSlug(slug: string): boolean {
  return AUTHORED_TOOL_SLUGS.has(slug);
}

/** Guide slugs that carry the named-author byline and Person schema. */
const AUTHORED_GUIDE_SLUGS = new Set<string>(['t-score-calculator-guide']);
export function isAuthoredGuideSlug(slug: string): boolean {
  return AUTHORED_GUIDE_SLUGS.has(slug);
}
