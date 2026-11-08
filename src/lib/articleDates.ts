/**
 * Real first-publish dates for the pages that carry TechArticle structured data.
 *
 * Each date is the commit date (`git log -S"slug: '<slug>'" --reverse -- src/data/tools.ts`) on which the
 * page's tool entry first existed; the hub date is the first commit of its page file
 * (`git log --reverse -- src/pages/[...locale]/education-statistics/index.astro`). Do not invent dates:
 * a page without a verifiable first-publish date gets no TechArticle datePublished.
 */
export const FIRST_PUBLISHED: Record<string, string> = {
  '/education-statistics/': '2026-06-25',
  '/': '2026-06-17',
  'class-rank-percentile-calculator': '2026-06-19',
  'grade-average': '2026-06-16',
  'independent-samples-t-test-calculator': '2026-06-19',
  'merge-pdf': '2026-06-16',
  'percentile-rank-calculator': '2026-06-19',
  'random-name-picker': '2026-06-16',
  'standard-deviation': '2026-06-19',
  't-score-calculator': '2026-06-19',
  'teacher-exam-score-converter': '2026-06-19',
  'weighted-average-calculator': '2026-06-19',
  'z-score-calculator': '2026-06-19',
};

/** Tool slugs that get TechArticle markup: the indexable statistics tools plus /tools/merge-pdf/. */
export function hasToolTechArticle(slug: string): boolean {
  return Object.prototype.hasOwnProperty.call(FIRST_PUBLISHED, slug) && !slug.startsWith('/');
}
