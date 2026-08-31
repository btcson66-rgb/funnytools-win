import pkg from '../../package.json';

export type Locale = 'zh' | 'en';

export const SITE_VERSION = pkg.version;

export const SITE = {
  url: 'https://funnytools.win',
  // base path WITHOUT trailing slash; keep in sync with astro.config base
  basePath: '',
  locales: ['zh', 'en'] as Locale[],
  defaultLocale: 'zh' as Locale,
  name: { zh: 'FunnyTools 免費線上工具箱', en: 'FunnyTools' },
  tagline: {
    zh: '免費、免註冊的 PDF、圖片、文字、QR Code、隨機、時間、金錢、教學與統計工具；多數本機處理，部分轉換使用暫時處理檔案的 API。',
    en: 'Free online tools for PDF, images, text, QR codes, random picks, time, money, teachers and more — mostly browser-based, with selected conversions handled by a temporary-processing API.',
  },
  ga4MeasurementId: 'G-SV027MPXK4',
  // Secondary GA4 tag, added 2026-08-16. The property behind ga4MeasurementId is owned by
  // btcson66@gmail.com, which can no longer be signed into, so its data is being collected
  // into an account nobody can read. This second tag mirrors the same hits into property
  // 550070457 under the backup account, which the company can actually query. The original
  // tag stays in place so the historical property keeps its continuity if access is restored.
  ga4SecondaryMeasurementId: 'G-SJ90CBM9ZV',
  // Legacy fallback for local/preflight builds. Prefer PUBLIC_ADSENSE_CLIENT.
  // 2026-08-24: migrated off the old AdSense account (btcson66). That account's
  // sign-in mailbox is the same btcson66@gmail.com noted above, which can no longer be
  // signed into, so the site is being re-submitted for review under account zxc851558.
  // No workflow sets PUBLIC_ADSENSE_CLIENT, so production actually uses this fallback.
  // Keep it in sync with public/ads.txt and with the expected string in
  // scripts/adsense-preflight.mjs — all three must carry the same publisher ID.
  adsenseClient: 'ca-pub-9117672212804270',
  // Keep enabled while the site is under AdSense review. Visible ad slots remain separately gated below.
  adsenseEnabled: true,
  features: {
    adsense: false,
    affiliate: true,
    sponsor: false,
    relatedResources: false,
    newsletter: true,
    downloadGate: true,
  },
  // Shared Cloudflare Pages Functions (deployed with roomfeng.win) used by all three sites.
  newsletterEndpoint: 'https://roomfeng.win/api/newsletter',
  downloadGateEndpoint: 'https://roomfeng.win/api/download-gate',
  // 2026-08-16: was btcson66@gmail.com. That mailbox can no longer be signed into, so
  // anything a visitor sent there went nowhere. btcson224@gmail.com is reachable.
  email: 'btcson224@gmail.com',
  htmlLang: { zh: 'zh-Hant', en: 'en' } as Record<Locale, string>,
  hreflang: { zh: 'zh-TW', en: 'en' } as Record<Locale, string>,
};
