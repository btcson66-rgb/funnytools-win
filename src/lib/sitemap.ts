import type { Locale } from '../config/site';
import { INDEXABLE_PATHS } from './indexPolicy';
import { absoluteUrl } from './url';

export interface SitemapPage {
  segments: string[];
  lastmod?: string;
  changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly';
  priority: string;
  alternates?: boolean;
}

export interface SitemapEntry {
  lang: Locale;
  page: SitemapPage;
}

const changedAt = '2026-09-22';

export function escapeXml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

export function sitemapLastmod(page?: SitemapPage): string {
  return page?.lastmod ?? changedAt;
}

function entryForPath(path: string): SitemapEntry {
  const segments = path === '/' ? [] : path.split('/').filter(Boolean);
  return {
    lang: 'zh',
    page: {
      segments,
      lastmod: changedAt,
      changefreq: path === '/' ? 'daily' : path.startsWith('/tools/') ? 'monthly' : 'weekly',
      priority: path === '/' ? '1.0' : path.startsWith('/tools/') ? '0.8' : '0.7',
      alternates: false,
    },
  };
}

export function urlEntry({ page }: SitemapEntry): string {
  const path = page.segments.length ? `/${page.segments.join('/')}/` : '/';
  return [
    '  <url>',
    `    <loc>${escapeXml(absoluteUrl(path))}</loc>`,
    `    <lastmod>${sitemapLastmod(page)}</lastmod>`,
    `    <changefreq>${page.changefreq}</changefreq>`,
    `    <priority>${page.priority}</priority>`,
    '  </url>',
  ].join('\n');
}

export function sitemapUrlSet(entries: SitemapEntry[]): string {
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    entries.map(urlEntry).join('\n'),
    '</urlset>',
    '',
  ].join('\n');
}

const entries = INDEXABLE_PATHS.map(entryForPath);

// P2 batch 4 (2026-10-17): every URL belongs to exactly one of these three sets. Before, the guides set was
// "everything that is not a tool", so the home page, /about/ and the hub were listed in both sitemap-pages.xml
// and sitemap-guides.xml.
const isToolPath = (segments: string[]) => segments[0] === 'tools';
const isGuidePath = (segments: string[]) => segments[0] === 'guides' || segments[0] === 'category';
export const defaultPageEntries = (): SitemapEntry[] => entries.filter(({ page }) => !isToolPath(page.segments) && !isGuidePath(page.segments));
export const defaultToolEntries = (): SitemapEntry[] => entries.filter(({ page }) => isToolPath(page.segments));
export const defaultGuideEntries = (): SitemapEntry[] => entries.filter(({ page }) => isGuidePath(page.segments));
export const guidePages = (): SitemapPage[] => defaultGuideEntries().map(({ page }) => page);
