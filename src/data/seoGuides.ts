import type { Locale } from '../config/site';
import { CONTENT_REVIEWED_AT } from '../lib/contentValue';

// P1 (2026-10-15) reduced the guide catalogue to one guide. P2 batch 4 (2026-10-17) merged that
// guide (t-score-calculator-guide) into /tools/t-score-calculator/ and turned its URL into a
// redirect stub (src/data/removedRedirects.ts), so the catalogue is now empty. The types and
// helpers stay so a future guide can be added without rebuilding this module.
export type SeoPageKind = 'guide' | 'guideHub';

export type LocalizedText = Record<Locale, string>;

export interface GuideFaq {
  question: LocalizedText;
  answer: LocalizedText;
}

export interface SeoGuide {
  id: string;
  task?: string;
  pageKind?: SeoPageKind;
  locales: Locale[];
  slug: string;
  title: LocalizedText;
  metaTitle: LocalizedText;
  metaDescription: LocalizedText;
  h1: LocalizedText;
  category: LocalizedText;
  priority: number;
  searchIntent: LocalizedText;
  targetKeywords: LocalizedText[];
  relatedToolIds: string[];
  relatedGuideIds: string[];
  relatedWorkflowIds: string[];
  summary: LocalizedText;
  problem: LocalizedText;
  whoShouldUse: LocalizedText;
  explanation: LocalizedText[];
  steps: LocalizedText[];
  formula?: LocalizedText;
  example: LocalizedText;
  commonMistakes: LocalizedText[];
  faq: GuideFaq[];
  cta: LocalizedText;
  updatedAt: string;
  publishAt?: string;
  contentHtml?: LocalizedText;
  noFaqSchema?: boolean;
}

export interface SeoGuideView {
  id: string;
  task?: string;
  pageKind?: SeoPageKind;
  locales: Locale[];
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  category: string;
  priority: number;
  searchIntent: string;
  targetKeywords: string[];
  relatedToolIds: string[];
  relatedGuideIds: string[];
  relatedWorkflowIds: string[];
  summary: string;
  problem: string;
  whoShouldUse: string;
  explanation: string[];
  steps: string[];
  formula?: string;
  example: string;
  commonMistakes: string[];
  faq: { question: string; answer: string }[];
  cta: string;
  updatedAt: string;
  publishAt?: string;
  contentHtml?: string;
  noFaqSchema?: boolean;
}

interface RawSeoGuide {
  id: string;
  pageKind?: SeoPageKind;
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  category: string;
  priority: number;
  searchIntent: string;
  targetKeywords: string[];
  relatedToolIds: string[];
  relatedGuideIds: string[];
  relatedWorkflowIds: string[];
  summary: string;
  problem: string;
  whoShouldUse: string;
  explanation: string[];
  steps: string[];
  formula?: string;
  example: string;
  commonMistakes: string[];
  faq: { question: string; answer: string }[];
  cta: string;
  updatedAt: string;
  publishAt?: string;
}

type EnglishSeoGuideContent = Omit<RawSeoGuide, 'id' | 'slug' | 'priority' | 'relatedToolIds' | 'relatedGuideIds' | 'relatedWorkflowIds' | 'updatedAt'>;

const guideSeoOverrides: Record<string, Partial<Record<'zhMetaDescription' | 'enMetaTitle', string>>> = {};

export const statisticsDisclaimer = {
  zh: '本頁協助計算與報告撰寫，但使用者仍應確認自己的研究設計、假設條件與統計解釋。',
  en: 'This page helps with calculation and reporting, but users should still confirm their research design, assumptions, and statistical interpretation.',
} satisfies LocalizedText;

function text(zh: string, en?: string): LocalizedText {
  return { zh, en: en ?? zh };
}

function completeZhMetaDescription(description: string): string {
  if ([...description].length >= 70) return description;
  return `${description} 本頁補充工具連結、操作步驟、常見錯誤與檢查方向，方便正式使用前快速核對。`;
}

function localizeRawGuide(guide: RawSeoGuide): SeoGuide {
  const translated = englishGuideContent[guide.slug];
  const en: EnglishSeoGuideContent = translated ?? guide;
  const zhMetaDescription = guideSeoOverrides[guide.slug]?.zhMetaDescription ?? guide.metaDescription;

  return {
    ...guide,
    pageKind: guide.pageKind ?? 'guide',
    // A scheduled Chinese article must never break the whole build merely
    // because its English editorial pass is not finished yet. Keep the
    // original article publishable in Chinese, and only expose an English
    // route/hreflang once a real translation exists.
    locales: translated ? ['zh', 'en'] : ['zh'],
    title: text(guide.title, en.title),
    metaTitle: text(guide.metaTitle, guideSeoOverrides[guide.slug]?.enMetaTitle ?? en.metaTitle),
    metaDescription: text(completeZhMetaDescription(zhMetaDescription), en.metaDescription),
    h1: text(guide.h1, en.h1),
    category: text(guide.category, en.category),
    searchIntent: text(guide.searchIntent, en.searchIntent),
    targetKeywords: guide.targetKeywords.map((keyword, index) => text(keyword, en.targetKeywords[index])),
    summary: text(guide.summary, en.summary),
    problem: text(guide.problem, en.problem),
    whoShouldUse: text(guide.whoShouldUse, en.whoShouldUse),
    explanation: guide.explanation.map((paragraph, index) => text(paragraph, en.explanation[index])),
    steps: guide.steps.map((step, index) => text(step, en.steps[index])),
    formula: guide.formula ? text(guide.formula, en.formula) : undefined,
    example: text(guide.example, en.example),
    commonMistakes: guide.commonMistakes.map((mistake, index) => text(mistake, en.commonMistakes[index])),
    faq: guide.faq.map((item, index) => ({
      question: text(item.question, en.faq[index].question),
      answer: text(item.answer, en.faq[index].answer),
    })),
    cta: text(guide.cta, en.cta),
  };
}

export function viewSeoGuide(guide: SeoGuide, lang: Locale): SeoGuideView {
  return {
    ...guide,
    updatedAt: guide.updatedAt ?? CONTENT_REVIEWED_AT,
    title: guide.title[lang],
    metaTitle: guide.metaTitle[lang],
    metaDescription: guide.metaDescription[lang],
    h1: guide.h1[lang],
    category: guide.category[lang],
    searchIntent: guide.searchIntent[lang],
    targetKeywords: guide.targetKeywords.map((keyword) => keyword[lang]),
    summary: guide.summary[lang],
    problem: guide.problem[lang],
    whoShouldUse: guide.whoShouldUse[lang],
    explanation: guide.explanation.map((paragraph) => paragraph[lang]),
    steps: guide.steps.map((step) => step[lang]),
    formula: guide.formula?.[lang],
    example: guide.example[lang],
    commonMistakes: guide.commonMistakes.map((mistake) => mistake[lang]),
    faq: guide.faq.map((item) => ({ question: item.question[lang], answer: item.answer[lang] })),
    cta: guide.cta[lang],
    contentHtml: guide.contentHtml?.[lang],
    noFaqSchema: guide.noFaqSchema,
  };
}

export function guideUpdatedAt(guide: Pick<SeoGuide, 'updatedAt'>): string {
  return guide.updatedAt ?? CONTENT_REVIEWED_AT;
}

export function isSeoGuideAvailableInLocale(guide: SeoGuide, lang: Locale): boolean {
  return guide.locales.includes(lang);
}

const rawSeoGuides: RawSeoGuide[] = [];

const englishGuideContent: Record<string, EnglishSeoGuideContent> = {};

export const seoGuides: SeoGuide[] = rawSeoGuides.map(localizeRawGuide);

export function getSeoGuide(slug: string): SeoGuide | undefined {
  return seoGuides.find((guide) => guide.slug === slug);
}

// Reverse lookup: guides that reference a given tool, available in the locale,
// ordered by priority. Used to surface related guides on tool detail pages.
export function getGuidesForTool(toolSlug: string, lang: Locale): SeoGuideView[] {
  return seoGuides
    .filter((guide) => isSeoGuideAvailableInLocale(guide, lang) && guide.relatedToolIds.includes(toolSlug))
    .sort((a, b) => a.priority - b.priority)
    .map((guide) => viewSeoGuide(guide, lang));
}
