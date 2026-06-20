import { SITE, type Locale } from '../config/site';
import type { Category } from '../data/categories';
import type { ToolMeta } from '../data/tools';
import { absoluteUrl, altLinks, assetPath, localePath, toolUrl } from './url';

interface ToolContentForSeo {
  name: string;
  short: string;
  seoTitle?: string;
  seoDescription: string;
  keywords: string[];
}

function endSentence(value: string): string {
  const trimmed = value.trim();
  return /[。！？.!?]$/.test(trimmed) ? trimmed : `${trimmed}。`;
}

function truncateText(value: string, maxLength: number, locale: Locale): string {
  if ([...value].length <= maxLength) return value;

  const chars = [...value].slice(0, maxLength + 1).join('');
  const breakPattern = locale === 'zh' ? /[，、；。]/g : /[\s,;.!?]/g;
  const breaks = [...chars.matchAll(breakPattern)];
  const lastBreak = breaks.at(-1)?.index ?? maxLength;
  const minimumUsefulLength = locale === 'zh' ? 24 : 36;
  const cutAt = lastBreak >= minimumUsefulLength ? lastBreak : maxLength;
  return [...value].slice(0, cutAt).join('').trim();
}

export function toolSeoTitle(lang: Locale, content: ToolContentForSeo): string {
  const sourceTitle = (content.seoTitle || content.name).replace(/\s+\|\s+/g, '｜');
  const conciseTitle = truncateText(sourceTitle, lang === 'zh' ? 42 : 52, lang);
  return lang === 'zh' ? `${conciseTitle}｜FunnyTools` : `${conciseTitle} | FunnyTools`;
}

export function toolSeoDescription(lang: Locale, content: ToolContentForSeo, localOnly = false): string {
  if (lang === 'zh') {
    const usage = localOnly
      ? '本工具可免費使用且不需註冊，輸入內容與檔案均在瀏覽器本機處理，不會主動上傳至 FunnyTools 伺服器。'
      : '本工具可免費使用且不需註冊；若操作需要網路傳輸，頁面會清楚說明資料處理方式與使用限制。';
    const purpose = endSentence(truncateText(content.seoDescription || content.short, 150 - [...usage].length - 1, lang));
    return `${purpose} ${usage}`;
  }

  const usage = localOnly
    ? 'Free, no registration. Inputs and files stay in your browser and are not uploaded to FunnyTools servers.'
    : 'Free, no registration. Any required network transfer and related limitations are clearly explained on the page.';
  const purpose = endSentence(truncateText(content.seoDescription || content.short, 150 - usage.length - 2, lang));
  return `${purpose} ${usage}`;
}

export function categorySeoDescription(lang: Locale, category: Category): string {
  const purpose = endSentence(category.description[lang]);

  if (lang === 'zh') {
    return `${purpose} 集中整理可免費使用、不需註冊的實用工具，開啟頁面即可操作；輸入內容以瀏覽器本機處理為主，適合手機與電腦使用。`;
  }

  const usage = 'Free, no registration, with local browser processing on mobile and desktop.';
  const concisePurpose = endSentence(truncateText(category.description[lang], 150 - usage.length - 2, lang));
  return `${concisePurpose} ${usage}`;
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
    name: 'FunnyTools',
    alternateName: SITE.name.zh,
    url: absoluteUrl(localePath(lang)),
    description: lang === 'zh'
      ? '免費線上工具箱，提供 PDF、圖片、文字、金錢、時間與教學工具。'
      : SITE.tagline.en,
    inLanguage: SITE.hreflang[lang],
  };
}

export function organizationJsonLd(lang: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'FunnyTools',
    alternateName: SITE.name.zh,
    url: absoluteUrl('/'),
    logo: absoluteUrl(assetPath('favicon.svg')),
    image: defaultOgImage(),
    email: SITE.email,
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

export function webPageJsonLd(lang: Locale, name: string, description: string, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    url: absoluteUrl(path),
    description,
    inLanguage: SITE.hreflang[lang],
  };
}

export function collectionPageJsonLd(lang: Locale, name: string, description: string, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    url: absoluteUrl(path),
    description,
    inLanguage: SITE.hreflang[lang],
  };
}

export function webApplicationJsonLd(
  lang: Locale,
  tool: ToolMeta,
  content: ToolContentForSeo,
  category: Category,
) {
  const applicationCategory = ['study', 'statistics'].includes(category.id)
    ? 'EducationalApplication'
    : category.id === 'money'
      ? 'FinanceApplication'
      : 'UtilitiesApplication';

  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: content.name,
    url: absoluteUrl(toolUrl(lang, tool.slug)),
    description: toolSeoDescription(lang, content, tool.privacyLevel === 'local-only'),
    applicationCategory,
    operatingSystem: 'All',
    browserRequirements: 'Requires a modern web browser with JavaScript enabled.',
    inLanguage: SITE.hreflang[lang],
    keywords: content.keywords.join(', '),
    offers: {
      '@type': 'Offer',
      price: 0,
      priceCurrency: 'TWD',
    },
  };
}

export function defaultOgImage(): string {
  return absoluteUrl(assetPath('assets', 'og-default.jpg'));
}
