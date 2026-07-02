import { marked } from 'marked';
import type { BlogPost } from './blogPosts';
import { getToolBySlug } from './tools';

type UsefulArticleSource = {
  slug: string;
  title: string;
  description: string;
  summary: string;
  published: string;
  updated: string;
  categorySlug: string;
  categoryLabel: string;
  toolSlugs: string[];
  relatedArticleSlugs: string[];
  contentMarkdown: string;
  faq: { question: string; answer: string }[];
};

const usefulArticleSources: UsefulArticleSource[] = [
];

function toolLabel(slug: string): string {
  return getToolBySlug(slug)?.name.zh ?? slug.split('-').map((part) => part ? part[0].toUpperCase() + part.slice(1) : part).join(' ');
}

const toolSlugAliases: Record<string, string> = {
  'average-calculator': 'grade-average',
  'base64-decoder': 'base64',
  'base64-encoder': 'base64',
  'compress-pdf': 'pdf-compressor',
  'csv-viewer': 'csv-to-json',
  'date-calculator': 'date-difference',
  'final-grade-calculator': 'grade-average',
  'html-preview': 'markdown-previewer',
  'image-cropper': 'image-crop',
  'json-validator': 'json-formatter',
  'line-break-remover': 'remove-empty-lines',
  'markdown-to-html': 'markdown-previewer',
  'random-number-generator': 'random-number-picker',
  'reorder-pdf': 'pdf-page-reorder',
  'slug-generator': 'url-encoder',
  'text-cleaner': 'remove-empty-lines',
  'time-zone-converter': 'timestamp-converter',
  'unit-converter': 'percentage-calculator',
  'url-decoder': 'url-encoder',
  'utm-builder': 'url-encoder',
  'webp-to-png': 'webp-to-jpg',
  'yes-no-generator': 'this-or-that',
};

const categorySlugAliases: Record<string, string> = {
  calculator: 'money',
  developer: 'text',
  marketing: 'text',
  security: 'text',
};

function liveToolSlug(slug: string): string | undefined {
  const normalized = toolSlugAliases[slug] ?? slug;
  return getToolBySlug(normalized)?.status === 'live' ? normalized : undefined;
}

function categorySlug(slug: string): string {
  return categorySlugAliases[slug] ?? slug;
}

export const usefulBlogPosts: BlogPost[] = usefulArticleSources.map((post) => ({
  slug: post.slug,
  locales: ['zh'],
  title: { zh: post.title, en: post.title },
  description: { zh: post.description, en: post.description },
  summary: { zh: post.summary, en: post.summary },
  published: post.published,
  updated: post.updated,
  categorySlug: categorySlug(post.categorySlug),
  categoryLabel: { zh: post.categoryLabel, en: post.categoryLabel },
  relatedArticleSlugs: post.relatedArticleSlugs,
  toolLinks: [...new Set(post.toolSlugs.map(liveToolSlug).filter((slug): slug is string => Boolean(slug)))].map((slug) => ({
    slug,
    label: { zh: toolLabel(slug), en: toolLabel(slug) },
    note: { zh: '開啟這個流程會用到的相關工具。', en: 'Open the related tool for this workflow.' },
  })),
  sections: [],
  contentHtml: { zh: marked.parse(post.contentMarkdown) as string, en: marked.parse(post.contentMarkdown) as string },
  faq: post.faq.map((item) => ({
    question: { zh: item.question, en: item.question },
    answer: { zh: item.answer, en: item.answer },
  })),
}));

export function getUsefulArticlesForTool(toolSlug: string): BlogPost[] {
  return usefulBlogPosts.filter((post) => post.toolLinks.some((tool) => tool.slug === toolSlug));
}
