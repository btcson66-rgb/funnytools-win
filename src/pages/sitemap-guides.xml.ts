import type { APIRoute } from 'astro';
import { defaultGuideEntries, sitemapUrlSet } from '../lib/sitemap';

export const GET: APIRoute = () => new Response(sitemapUrlSet(defaultGuideEntries()), {
  headers: {
    'Content-Type': 'application/xml; charset=utf-8',
  },
});
