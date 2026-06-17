import { SITE, type Locale } from '../config/site';
import type { Category } from '../data/categories';
import type { ToolMeta } from '../data/tools';
import { absoluteUrl, altLinks, assetPath, localePath, toolUrl } from './url';

interface ToolContentForSeo {
  name: string;
  short: string;
  seoDescription: string;
  keywords: string[];
}

export function buildHreflang(segments: string[] = []) {
  const alternates = altLinks(segments);

  return [
    ...alternates.links.map(({ lang, href }) => ({
      hreflang: SITE.hreflang[lang],
      href: absoluteUrl(href),
    })),
    {
      hreflang: 'x-default',
      href: absoluteUrl(alternates.xDefault),
    },
  ];
}

export function websiteJsonLd(lang: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name[lang],
    alternateName: SITE.name[lang === 'zh' ? 'en' : 'zh'],
    url: absoluteUrl(localePath(lang)),
    description: SITE.tagline[lang],
    inLanguage: SITE.hreflang[lang],
  };
}

export function breadcrumbJsonLd(items: { name: string; href: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  };
}

export function webApplicationJsonLd(
  lang: Locale,
  tool: ToolMeta,
  content: ToolContentForSeo,
  category: Category,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: content.name,
    url: absoluteUrl(toolUrl(lang, tool.slug)),
    description: content.seoDescription || content.short,
    applicationCategory: category.name.en,
    operatingSystem: 'Any',
    browserRequirements: 'Requires a modern web browser with JavaScript enabled.',
    inLanguage: SITE.hreflang[lang],
    keywords: content.keywords.join(', '),
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };
}

export function defaultOgImage(): string {
  return absoluteUrl(assetPath('assets', 'og-default.jpg'));
}
