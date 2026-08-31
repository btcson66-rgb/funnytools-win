export interface GuideAffiliateConfig {
  affiliateEnabled: boolean;
  affiliateCategory?: string;
  affiliateTags?: string[];
}

/**
 * Article monetization is an explicit allow-list. Missing guides stay off by
 * default, especially statistics and methodology pages where generic products
 * would distract from the educational answer.
 */
export const guideAffiliateConfig: Record<string, GuideAffiliateConfig> = {
  'merge-pdf-private-guide': { affiliateEnabled: true, affiliateCategory: 'office', affiliateTags: ['pdf', 'document', 'printing'] },
  'a4-vs-us-letter-printing-guide': { affiliateEnabled: true, affiliateCategory: 'office', affiliateTags: ['printing', 'document', 'office'] },
  'photos-to-pdf-phone-guide': { affiliateEnabled: true, affiliateCategory: 'office', affiliateTags: ['pdf', 'mobile', 'printing'] },
  'image-compression-email-guide': { affiliateEnabled: true, affiliateCategory: 'computer', affiliateTags: ['image', 'creator', 'computer'] },
  'classroom-random-group-guide': { affiliateEnabled: true, affiliateCategory: 'teacher', affiliateTags: ['teacher', 'classroom', 'office'] },
  'classroom-random-picker-guide': { affiliateEnabled: true, affiliateCategory: 'teacher', affiliateTags: ['teacher', 'classroom', 'office'] },
  'classroom-timer-guide': { affiliateEnabled: true, affiliateCategory: 'teacher', affiliateTags: ['teacher', 'classroom', 'productivity'] },
  'fair-student-grouping-guide': { affiliateEnabled: true, affiliateCategory: 'teacher', affiliateTags: ['teacher', 'classroom', 'student'] },
  'classroom-lottery-tool-guide': { affiliateEnabled: true, affiliateCategory: 'teacher', affiliateTags: ['teacher', 'classroom', 'office'] },
  'qr-code-classroom-guide': { affiliateEnabled: true, affiliateCategory: 'teacher', affiliateTags: ['teacher', 'classroom', 'printing'] },
  'household-physics-demos-guide': { affiliateEnabled: true, affiliateCategory: 'home', affiliateTags: ['home', 'stem', 'teacher'] },
  'word-count-essay-limits-guide': { affiliateEnabled: true, affiliateCategory: 'student', affiliateTags: ['student', 'office', 'writing'] },
};

export const defaultGuideAffiliateConfig: GuideAffiliateConfig = {
  affiliateEnabled: false,
  affiliateCategory: '',
  affiliateTags: [],
};

export function getGuideAffiliateConfig(slug: string): GuideAffiliateConfig {
  return guideAffiliateConfig[slug] ?? defaultGuideAffiliateConfig;
}

function stripTags(value: string): string {
  return value.replace(/<[^>]+>/g, ' ').replace(/&(?:amp|lt|gt|quot|#39);/g, ' ').replace(/\s+/g, ' ').trim();
}

/** Split imported Markdown HTML at a meaningful mid-article heading. */
export function splitGuideContentHtml(html: string): { before: string; after: string } | null {
  const headings = [...html.matchAll(/<h2\b[^>]*>[\s\S]*?<\/h2>/gi)];
  if (headings.length < 2) return null;
  const midpoint = Math.floor(headings.length * 0.4);
  const preferred = headings.find((match, index) => index >= midpoint && /實際|範例|案例|錯誤|下一步|example|worked|case|common|next/i.test(stripTags(match[0])));
  const selected = preferred ?? headings[Math.min(Math.max(midpoint, 1), headings.length - 1)];
  const index = selected.index ?? -1;
  return index > 0 ? { before: html.slice(0, index), after: html.slice(index) } : null;
}
