import type { APIRoute, GetStaticPaths } from 'astro';
import { defaultGuideEntries, defaultPageEntries, defaultToolEntries, sitemapUrlSet } from '../lib/sitemap';

// One route for the child sitemaps (sitemap-tools.xml, sitemap-pages.xml, sitemap-guides.xml). A child is built
// only while it has URLs, so an empty urlset is never emitted (sitemap-guides.xml has no guide left since
// P2 batch 4), and every URL is listed in exactly one child (see src/lib/sitemap.ts).
const children = {
  tools: defaultToolEntries,
  pages: defaultPageEntries,
  guides: defaultGuideEntries,
} as const;

export const getStaticPaths = (() => (Object.keys(children) as (keyof typeof children)[])
  .filter((kind) => children[kind]().length > 0)
  .map((kind) => ({ params: { kind } }))) satisfies GetStaticPaths;

export const GET: APIRoute = ({ params }) => {
  const kind = params.kind as keyof typeof children;
  return new Response(sitemapUrlSet(children[kind]()), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
