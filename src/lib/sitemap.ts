import { SITE, type Locale } from '../config/site';
import { categories } from '../data/categories';
import { hasLiveTools, liveTools } from '../data/tools';
import { allBlogPosts } from '../data/allBlogPosts';
import { audiences } from '../data/audiences';
import { isPostAvailableInLocale } from '../data/blogPosts';
import { seoGuides } from '../data/seoGuides';
import { workflows } from '../data/workflows';
import { absoluteUrl, localePath } from './url';

const legalPages = ['about', 'about-tools', 'contact', 'privacy', 'terms', 'disclaimer'];
// Fallback lastmod: the newest real content date on the site. Using the build
// date here would stamp every build as "modified today", which teaches
// crawlers to ignore lastmod entirely.
const latestContentDate = [
  ...liveTools.map((tool) => tool.updated),
  ...allBlogPosts.map((post) => post.updated),
  ...seoGuides.map((guide) => guide.updatedAt),
  ...workflows.map((workflow) => workflow.updatedAt),
]
  .filter((value): value is string => Boolean(value))
  .sort()
  .at(-1) ?? new Date().toISOString().slice(0, 10);
const mainToolSlugs = new Set(
  liveTools
    .filter((tool) => tool.featured)
    .slice(0, 6)
    .map((tool) => tool.slug),
);

export interface SitemapPage {
  segments: string[];
  lastmod?: string;
  changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly';
  priority: string;
  alternates?: boolean;
}

export interface SitemapEntry {
  lang: Locale;
  page: SitemapPage;
}

export function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function sitemapLastmod(page?: SitemapPage): string {
  return page?.lastmod ?? latestContentDate;
}

function alternateLinks(segments: string[]): string {
  const localeLinks = SITE.locales
    .map((locale) => {
      const href = absoluteUrl(localePath(locale, ...segments));
      return `<xhtml:link rel="alternate" hreflang="${SITE.hreflang[locale]}" href="${escapeXml(href)}" />`;
    })
    .join('');
  const xDefault = absoluteUrl(localePath(SITE.defaultLocale, ...segments));

  return `${localeLinks}<xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(xDefault)}" />`;
}

export function urlEntry({ lang, page }: SitemapEntry): string {
  const loc = absoluteUrl(localePath(lang, ...page.segments));
  const alternates = page.alternates ? `\n    ${alternateLinks(page.segments)}` : '';

  return [
    '  <url>',
    `    <loc>${escapeXml(loc)}</loc>`,
    `    <lastmod>${sitemapLastmod(page)}</lastmod>`,
    `    <changefreq>${page.changefreq}</changefreq>`,
    `    <priority>${page.priority}</priority>${alternates}`,
    '  </url>',
  ].join('\n');
}

export function sitemapUrlSet(entries: SitemapEntry[]): string {
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    entries.map(urlEntry).join('\n'),
    '</urlset>',
    '',
  ].join('\n');
}

function basePages(): SitemapPage[] {
  return [
    { segments: [], changefreq: 'daily', priority: '1.0', alternates: true },
    { segments: ['tools'], changefreq: 'weekly', priority: '0.9', alternates: true },
    { segments: ['education-statistics'], changefreq: 'weekly', priority: '0.8', alternates: true },
    { segments: ['support'], changefreq: 'monthly', priority: '0.3', alternates: true },
    ...legalPages.map((page) => ({
      segments: [page],
      changefreq: 'yearly' as const,
      priority: '0.3',
      alternates: true,
    })),
  ];
}

function categoryPages(): SitemapPage[] {
  return categories.filter((category) => hasLiveTools(category.id)).map((category) => ({
    segments: ['category', category.id],
    changefreq: 'weekly' as const,
    priority: '0.7',
    alternates: true,
  }));
}

function toolPages(): SitemapPage[] {
  return liveTools.map((tool) => ({
    segments: ['tools', tool.slug],
    lastmod: tool.updated,
    changefreq: 'monthly' as const,
    priority: mainToolSlugs.has(tool.slug) ? '0.8' : '0.6',
    alternates: true,
  }));
}

function blogPages(): SitemapPage[] {
  return [
    { segments: ['blog'], lastmod: allBlogPosts[0]?.updated, changefreq: 'weekly', priority: '0.7', alternates: true },
    ...allBlogPosts.map((post) => ({
      segments: ['blog', post.slug],
      lastmod: post.updated,
      changefreq: 'monthly' as const,
      priority: '0.6',
      alternates: isPostAvailableInLocale(post, 'en'),
    })),
  ];
}

function guideArticlePages(): SitemapPage[] {
  const specialPostSlugs = new Set(
    allBlogPosts
      .filter((post) => ['example', 'template', 'faq'].includes(post.categorySlug) || post.categoryLabel?.zh.includes('FAQ'))
      .map((post) => post.slug),
  );

  return blogPages().filter((page) => page.segments.length === 1 || !specialPostSlugs.has(page.segments[1]));
}

export function guidePages(): SitemapPage[] {
  return [
    { segments: ['guides'], lastmod: seoGuides[0]?.updatedAt, changefreq: 'weekly', priority: '0.7', alternates: true },
    ...seoGuides.map((guide) => ({
      segments: ['guides', guide.slug],
      lastmod: guide.updatedAt,
      changefreq: 'monthly' as const,
      priority: guide.priority <= 2 ? '0.7' : '0.6',
      alternates: guide.locales.includes('en'),
    })),
  ];
}

export function workflowPages(): SitemapPage[] {
  return [
    { segments: ['workflows'], lastmod: workflows[0]?.updatedAt, changefreq: 'weekly', priority: '0.7', alternates: true },
    ...workflows.map((workflow) => ({
      segments: ['workflows', workflow.slug],
      lastmod: workflow.updatedAt,
      changefreq: 'monthly' as const,
      priority: '0.6',
      alternates: workflow.locales.includes('en'),
    })),
  ];
}

export function audiencePages(): SitemapPage[] {
  return [
    { segments: ['for'], changefreq: 'weekly', priority: '0.7', alternates: true },
    ...audiences.map((audience) => ({
      segments: ['for', audience.slug],
      changefreq: 'monthly' as const,
      priority: '0.6',
      alternates: audience.locales.includes('en'),
    })),
  ];
}

export function defaultPageEntries(): SitemapEntry[] {
  return [
    ...basePages(),
    ...categoryPages(),
    ...guidePages(),
    ...workflowPages(),
    ...audiencePages(),
  ].map((page) => ({ lang: 'zh', page }));
}

export function defaultToolEntries(): SitemapEntry[] {
  return toolPages().map((page) => ({ lang: 'zh', page }));
}

export function defaultCategoryEntries(): SitemapEntry[] {
  return categoryPages().map((page) => ({ lang: 'zh', page }));
}

export function defaultBlogEntries(): SitemapEntry[] {
  return blogPages().map((page) => ({ lang: 'zh', page }));
}

export function defaultGuideEntries(): SitemapEntry[] {
  return [
    ...basePages(),
    ...categoryPages(),
    ...audiencePages(),
    ...guideArticlePages(),
    ...guidePages(),
  ].map((page) => ({ lang: 'zh', page }));
}

export function defaultWorkflowEntries(): SitemapEntry[] {
  return workflowPages().map((page) => ({ lang: 'zh', page }));
}

export function defaultExampleEntries(): SitemapEntry[] {
  return allBlogPosts
    .filter((post) => post.categorySlug === 'example')
    .map((post) => ({
      lang: 'zh' as const,
      page: {
        segments: ['blog', post.slug],
        lastmod: post.updated,
        changefreq: 'monthly' as const,
        priority: '0.5',
        alternates: isPostAvailableInLocale(post, 'en'),
      },
    }));
}

export function defaultTemplateEntries(): SitemapEntry[] {
  return allBlogPosts
    .filter((post) => post.categorySlug === 'template')
    .map((post) => ({
      lang: 'zh' as const,
      page: {
        segments: ['blog', post.slug],
        lastmod: post.updated,
        changefreq: 'monthly' as const,
        priority: '0.5',
        alternates: isPostAvailableInLocale(post, 'en'),
      },
    }));
}

export function defaultFaqEntries(): SitemapEntry[] {
  return allBlogPosts
    .filter((post) => post.categoryLabel?.zh.includes('FAQ') || post.categorySlug === 'faq')
    .map((post) => ({
      lang: 'zh' as const,
      page: {
        segments: ['blog', post.slug],
        lastmod: post.updated,
        changefreq: 'monthly' as const,
        priority: '0.5',
        alternates: isPostAvailableInLocale(post, 'en'),
      },
    }));
}

export function englishEntries(): SitemapEntry[] {
  return [
    ...basePages(),
    ...categoryPages(),
    ...toolPages(),
    ...blogPages().filter((page) => page.segments.length === 1 || isPostAvailableInLocale(allBlogPosts.find((post) => post.slug === page.segments[1])!, 'en')),
    ...guidePages().filter((page) => page.segments.length === 1 || seoGuides.find((guide) => guide.slug === page.segments[1])?.locales.includes('en')),
    ...workflowPages().filter((page) => page.segments.length === 1 || workflows.find((workflow) => workflow.slug === page.segments[1])?.locales.includes('en')),
    ...audiencePages().filter((page) => page.segments.length === 1 || audiences.find((audience) => audience.slug === page.segments[1])?.locales.includes('en')),
  ].map((page) => ({ lang: 'en' as const, page }));
}

export function allSitemapEntries(): SitemapEntry[] {
  return [
    ...defaultPageEntries(),
    ...defaultToolEntries(),
    ...defaultBlogEntries(),
    ...defaultGuideEntries(),
    ...defaultWorkflowEntries(),
    ...defaultExampleEntries(),
    ...defaultTemplateEntries(),
    ...defaultFaqEntries(),
    ...englishEntries(),
  ];
}

