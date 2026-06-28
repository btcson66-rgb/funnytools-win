import type { APIRoute } from 'astro';
import { absoluteUrl } from '../lib/url';
import { escapeXml, sitemapLastmod } from '../lib/sitemap';

const childSitemaps = [
  { path: '/sitemap-pages.xml' },
  { path: '/sitemap-tools.xml' },
  { path: '/sitemap-blog.xml' },
  { path: '/sitemap-en.xml' },
];

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
