import type { APIRoute } from 'astro';
import { absoluteUrl } from '../lib/url';
import { defaultGuideEntries, defaultPageEntries, defaultToolEntries, escapeXml, sitemapLastmod } from '../lib/sitemap';

// A child sitemap is listed only while it has URLs (an empty urlset is never published).
const childSitemaps = [
  { path: '/sitemap-tools.xml', count: defaultToolEntries().length },
  { path: '/sitemap-pages.xml', count: defaultPageEntries().length },
  { path: '/sitemap-guides.xml', count: defaultGuideEntries().length },
].filter((item) => item.count > 0);

export const GET: APIRoute = () => {
  const entries = childSitemaps
    .map((item) => [
      '  <sitemap>',
      `    <loc>${escapeXml(absoluteUrl(item.path))}</loc>`,
      `    <lastmod>${sitemapLastmod()}</lastmod>`,
      '  </sitemap>',
    ].join('\n'))
    .join('\n');

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    entries,
    '</sitemapindex>',
    '',
  ].join('\n');

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
