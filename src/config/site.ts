export type Locale = 'zh' | 'en';

export const SITE = {
  url: 'https://funnytools.win',
  // base path WITHOUT trailing slash; keep in sync with astro.config base
  basePath: '',
  locales: ['zh', 'en'] as Locale[],
  defaultLocale: 'zh' as Locale,
  name: { zh: 'FunnyTools 免費線上工具箱', en: 'FunnyTools' },
  tagline: {
    zh: '免費、免註冊、可在瀏覽器本機處理的 PDF、圖片、文字、QR Code、隨機、時間、金錢、教學與統計工具。',
    en: 'Free online toolbox with browser-based tools for PDF, images, text, QR codes, random picks, time, money, teachers and more.',
  },
  ga4MeasurementId: 'G-SV027MPXK4',
  // Legacy fallback for local/preflight builds. Prefer PUBLIC_ADSENSE_CLIENT.
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
  email: 'btcson66@gmail.com',
  htmlLang: { zh: 'zh-Hant', en: 'en' } as Record<Locale, string>,
  hreflang: { zh: 'zh-TW', en: 'en' } as Record<Locale, string>,
};
