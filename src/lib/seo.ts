import { SITE, type Locale } from '../config/site';
import type { Category } from '../data/categories';
import type { ToolMeta } from '../data/tools';
import { absoluteUrl, altLinks, assetPath, localePath, toolUrl } from './url';
import pkg from '../../package.json';

interface ToolContentForSeo {
  name: string;
  short: string;
  seoTitle?: string;
  seoDescription: string;
  keywords: string[];
}

function endSentence(value: string, locale: Locale): string {
  const trimmed = value.trim();
  return /[。！？.!?]$/.test(trimmed) ? trimmed : `${trimmed}${locale === 'zh' ? '。' : '.'}`;
}

function cleanSentenceFragment(value: string, locale: Locale): string {
  if (locale === 'zh') return value;
  return value.replace(/\s+\b(?:and|or|with|for|to|from|of|in|on|by|as|the|a|an)$/i, '');
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
  return `${conciseTitle} - FreeTools`;
}

export function toolSeoDescription(lang: Locale, content: ToolContentForSeo, localOnly = false): string {
  if (lang === 'zh') {
    const usage = localOnly
      ? `本工具可免費使用且不需註冊，輸入內容與檔案均在瀏覽器本機處理，不會主動上傳至 ${SITE.name.zh} 伺服器。`
      : '本工具可免費使用且不需註冊；若操作需要網路傳輸，頁面會清楚說明資料處理方式與使用限制。';
    const purpose = endSentence(truncateText(content.seoDescription || content.short, 150 - [...usage].length - 1, lang), lang);
    return `${purpose} ${usage}`;
  }

  const usage = localOnly
    ? 'Free, no registration. Inputs and files stay in your browser and are not uploaded to FreeTools servers.'
    : 'Free, no registration. Any required network transfer and related limitations are clearly explained on the page.';
  const purpose = endSentence(cleanSentenceFragment(truncateText(content.seoDescription || content.short, 150 - usage.length - 2, lang), lang), lang);
  return `${purpose} ${usage}`;
}

export function categorySeoDescription(lang: Locale, category: Category): string {
  const purpose = endSentence(category.description[lang], lang);

  if (lang === 'zh') {
    return `${purpose} 集中整理可免費使用、不需註冊的實用工具，開啟頁面即可操作；輸入內容以瀏覽器本機處理為主，適合手機與電腦使用。`;
  }

  const usage = 'Free, no registration, with local browser processing on mobile and desktop.';
  const concisePurpose = endSentence(cleanSentenceFragment(truncateText(category.description[lang], 150 - usage.length - 2, lang), lang), lang);
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
    name: SITE.name[lang],
    alternateName: 'FreeTools Online Toolbox',
    url: absoluteUrl(localePath(lang)),
    description: lang === 'zh'
      ? 'FreeTools 是一個免費線上工具箱，提供 PDF、圖片、文字、QR Code、隨機、時間、金錢、教學與統計工具。免安裝、免註冊，手機與電腦都能使用。'
      : 'FreeTools is a free online toolbox with browser-based tools for PDF, images, text, QR codes, random picks, time, money, teachers and more.',
    inLanguage: SITE.hreflang[lang],
    potentialAction: {
      '@type': 'SearchAction',
      target: `${absoluteUrl(localePath(lang, 'tools'))}?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function organizationJsonLd(lang: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name[lang],
    alternateName: 'FreeTools Online Toolbox',
    url: absoluteUrl('/'),
    description: 'FreeTools is the free online toolbox published at funnytools.win.',
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
  const applicationCategoryByCategory: Record<string, string> = {
    draw: 'DesignApplication',
    image: 'MultimediaApplication',
    money: 'FinanceApplication',
    pdf: 'ProductivityApplication',
    personality: 'EntertainmentApplication',
    random: 'UtilitiesApplication',
    statistics: 'EducationalApplication',
    study: 'EducationalApplication',
    text: 'ProductivityApplication',
    time: 'ProductivityApplication',
  };
  const applicationCategory = applicationCategoryByCategory[category.id] ?? 'UtilitiesApplication';
  const publisher = {
    '@type': 'Organization',
    name: SITE.name[lang],
    url: absoluteUrl(localePath(lang)),
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: content.name,
    url: absoluteUrl(toolUrl(lang, tool.slug)),
    description: toolSeoDescription(lang, content, tool.privacyLevel === 'local-only'),
    applicationCategory,
    operatingSystem: 'Any',
    browserRequirements: 'Requires a modern web browser with JavaScript enabled.',
    inLanguage: SITE.hreflang[lang],
    keywords: content.keywords.join(', '),
    softwareVersion: pkg.version,
    ...(tool.updated ? { dateModified: tool.updated } : {}),
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    provider: publisher,
    publisher,
    author: publisher,
  };
}

export function defaultOgImage(): string {
  return absoluteUrl(assetPath('assets', 'og-default.jpg'));
}
