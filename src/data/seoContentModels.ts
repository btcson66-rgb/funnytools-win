import type { Locale } from '../config/site';

export type LocalizedText = Record<Locale, string>;
export type SeoPageKind = 'guide' | 'guideHub' | 'workflow';
export type SeoContentType =
  | 'ToolPage'
  | 'GuideArticle'
  | 'ExamplePage'
  | 'TemplatePage'
  | 'FAQPage'
  | 'WorkflowPage'
  | 'GlossaryPage';

export interface SeoContentBase {
  id: string;
  slug: string;
  type: SeoContentType;
  locales: Locale[];
  title: LocalizedText;
  description: LocalizedText;
  h1: LocalizedText;
  canonicalSegments: string[];
  searchIntent: LocalizedText;
  targetKeywords: LocalizedText[];
  relatedToolIds: string[];
  relatedArticleIds: string[];
  relatedHubIds: string[];
  relatedWorkflowIds: string[];
  faq: { question: LocalizedText; answer: LocalizedText }[];
  updatedAt: string;
  indexable: boolean;
  draft?: boolean;
  humanReviewed?: boolean;
}

export interface ToolPageModel extends SeoContentBase {
  type: 'ToolPage';
  toolId: string;
  categoryId: string;
  privacyLevel: 'local-only' | 'no-sensitive-input' | 'public-only';
}

export interface GuideArticleModel extends SeoContentBase {
  type: 'GuideArticle';
  primaryToolId?: string;
  steps: LocalizedText[];
  examples: LocalizedText[];
}

export interface ExamplePageModel extends SeoContentBase {
  type: 'ExamplePage';
  primaryToolId: string;
  sampleInputDescription: LocalizedText;
  sampleOutputDescription: LocalizedText;
}

export interface TemplatePageModel extends SeoContentBase {
  type: 'TemplatePage';
  templateFormat: 'text' | 'spreadsheet' | 'pdf' | 'image' | 'checklist';
  downloadLabel?: LocalizedText;
}

export interface FAQPageModel extends SeoContentBase {
  type: 'FAQPage';
  topicId: string;
  shortAnswer: LocalizedText;
}

export interface WorkflowPageModel extends SeoContentBase {
  type: 'WorkflowPage';
  steps: LocalizedText[];
  recommendedToolIds: string[];
}

export interface GlossaryPageModel extends SeoContentBase {
  type: 'GlossaryPage';
  term: LocalizedText;
  definition: LocalizedText;
  relatedTerms: string[];
}

export type SeoContentModel =
  | ToolPageModel
  | GuideArticleModel
  | ExamplePageModel
  | TemplatePageModel
  | FAQPageModel
  | WorkflowPageModel
  | GlossaryPageModel;

export const seoContentModelQualityFields = [
  'title',
  'description',
  'h1',
  'canonicalSegments',
  'searchIntent',
  'targetKeywords',
  'relatedToolIds',
  'faq',
  'updatedAt',
  'indexable',
] as const;
