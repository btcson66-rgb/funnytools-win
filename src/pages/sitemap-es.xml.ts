import type { APIRoute } from 'astro';
import routeRegistry from '../i18n/expansion-routes.json';
import { absoluteUrl } from '../lib/url';
import { escapeXml } from '../lib/sitemap';

const hreflangByLocale: Record<string, string> = {
  zh: 'zh-TW',
  en: 'en',
  es: 'es',
  fr: 'fr',
  de: 'de',
};

export const GET: APIRoute = () => {
  const rows = routeRegistry.routes
    .filter((route) => route.paths.es)
    .map((route) => {
      const alternates = Object.entries(route.paths)
        .filter(([, path]) => Boolean(path))
        .map(([locale, path]) =>
          `    <xhtml:link rel="alternate" hreflang="${hreflangByLocale[locale]}" href="${escapeXml(absoluteUrl(path))}" />`,
        );
      if (route.paths.en) {
        alternates.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(absoluteUrl(route.paths.en))}" />`);
      }

      return [
        '  <url>',
        `    <loc>${escapeXml(absoluteUrl(route.paths.es))}</loc>`,
        `    <lastmod>${routeRegistry.reviewedAt}</lastmod>`,
        '    <changefreq>monthly</changefreq>',
        `    <priority>${route.type === 'home' ? '0.8' : '0.7'}</priority>`,
        ...alternates,
        '  </url>',
      ].join('\n');
    })
    .join('\n');

  return new Response([
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    rows,
    '</urlset>',
    '',
  ].join('\n'), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
