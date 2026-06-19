export type Locale = 'zh' | 'en';

export const SITE = {
  url: 'https://funnytools.win',
  // base path WITHOUT trailing slash; keep in sync with astro.config base
  basePath: '',
  locales: ['zh', 'en'] as Locale[],
  defaultLocale: 'zh' as Locale,
  name: { zh: 'FunnyTools 免費線上工具箱', en: 'FunnyTools' },
  tagline: {
    zh: '免費線上工具大全，打開網頁即可使用，免下載 App。',
    en: 'Free online tools for everyday work, study, files, money, and quick decisions.',
  },
  adsenseClient: 'ca-pub-7052036786750044',
  // Keep enabled while the site is under AdSense review. Visible ad slots remain separately gated below.
  adsenseEnabled: true,
  features: {
    adsense: false,
    affiliate: false,
    sponsor: false,
    relatedResources: false,
    newsletter: false,
  },
  email: 'funnytools.win@gmail.com',
  htmlLang: { zh: 'zh-Hant', en: 'en' } as Record<Locale, string>,
  hreflang: { zh: 'zh-TW', en: 'en' } as Record<Locale, string>,
};
