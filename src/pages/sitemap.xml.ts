import type { APIRoute } from 'astro';
import { SITE, type Locale } from '../config/site';
import { categories } from '../data/categories';
import { hasLiveTools, liveTools } from '../data/tools';
import { absoluteUrl, localePath } from '../lib/url';

const legalPages = ['about', 'about-tools', 'contact', 'privacy', 'terms', 'disclaimer'];
const buildDate = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Asia/Taipei',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
}).format(new Date());
const mainToolSlugs = new Set(
  liveTools
    .filter((tool) => tool.featured)
    .slice(0, 6)
    .map((tool) => tool.slug),
);

interface SitemapPage {
  segments: string[];
  lastmod: string;
  changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly';
  priority: string;
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
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

function urlEntry(lang: Locale, page: SitemapPage): string {
  const loc = absoluteUrl(localePath(lang, ...page.segments));

  return [
    '<url>',
    `<loc>${escapeXml(loc)}</loc>`,
    `<lastmod>${page.lastmod}</lastmod>`,
    `<changefreq>${page.changefreq}</changefreq>`,
    `<priority>${page.priority}</priority>`,
    alternateLinks(page.segments),
    '</url>',
  ].join('');
}

export const GET: APIRoute = () => {
  const liveCategories = categories.filter((category) => hasLiveTools(category.id));
  const pages: SitemapPage[] = [
    { segments: [], lastmod: buildDate, changefreq: 'daily', priority: '1.0' },
    { segments: ['tools'], lastmod: buildDate, changefreq: 'weekly', priority: '0.9' },
    ...liveCategories.map((category) => ({
      segments: ['category', category.id],
      lastmod: buildDate,
      changefreq: 'weekly' as const,
      priority: '0.7',
    })),
    ...liveTools.map((tool) => ({
      segments: ['tools', tool.slug],
      lastmod: tool.updated ?? buildDate,
      changefreq: 'monthly' as const,
      priority: mainToolSlugs.has(tool.slug) ? '0.8' : '0.6',
    })),
    ...legalPages.map((page) => ({
      segments: [page],
      lastmod: buildDate,
      changefreq: 'yearly' as const,
      priority: '0.3',
    })),
  ];

  const entries = SITE.locales
    .flatMap((lang) => pages.map((page) => urlEntry(lang, page)))
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${entries}</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
