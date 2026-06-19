import type { Locale } from '../../config/site';

export interface ToolPageCase {
  title: string;
  description: string;
}

export interface ToolContent {
  name: string;
  short: string;
  long: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  instructions: string[];
  examples: string[];
  caseStudies?: ToolPageCase[];
  faq: { q: string; a: string }[];
  labels: Record<string, string>;
  formula?: {
    expression: string;
    explanation: string;
  };
  educationApplication?: string;
  reportTip?: string;
  disclaimer?: string;
  privacyNote?: string;
}

export type LocalizedToolContent = Record<Locale, ToolContent>;
