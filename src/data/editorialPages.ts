import { marked } from 'marked';

export interface EditorialPage {
  slug: string;
  route: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  summary: string;
  updatedAt: string;
  contentHtml: string;
}

const sources = import.meta.glob('../content/methodology/**/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

function frontmatterValue(value: string): string {
  const trimmed = value.trim();
  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function parse(source: string): { data: Record<string, string>; body: string } {
  const lines = source.replace(/^\uFEFF/, '').split(/\r?\n/);
  const end = lines.findIndex((line, index) => index > 0 && line.trim() === '---');
  if (lines[0]?.trim() !== '---' || end < 0) return { data: {}, body: source };
  const data: Record<string, string> = {};
  for (const line of lines.slice(1, end)) {
    const match = line.match(/^([A-Za-z_][A-Za-z0-9_]*):\s*(.*)$/);
    if (match) data[match[1]] = frontmatterValue(match[2]);
  }
  return { data, body: lines.slice(end + 1).join('\n').trim() };
}

function withoutH1(body: string): string {
  return body.replace(/^# .*?(?:\r?\n){1,2}/, '').trim();
}

function firstParagraph(body: string): string {
  return withoutH1(body).split(/\r?\n\s*\r?\n/).map((part) => part.trim()).find((part) => part && !part.startsWith('#')) ?? '';
}

export const editorialPages: EditorialPage[] = Object.entries(sources)
  .sort(([left], [right]) => left.localeCompare(right))
  .map(([path, source]) => {
    const { data, body } = parse(source);
    const route = data.slug ?? '/methodology/';
    const segments = route.split('/').filter(Boolean);
    const pageBody = withoutH1(body);
    const title = data.hero_title ?? data.title ?? segments.at(-1) ?? 'Methodology';
    return {
      slug: segments.slice(1).join('/') || 'index',
      route,
      title: data.card_title ?? title,
      metaTitle: data.seo_title ?? title,
      metaDescription: data.meta_description ?? data.hero_subtitle ?? firstParagraph(body),
      h1: title,
      summary: data.hero_subtitle ?? firstParagraph(body),
      updatedAt: data.date_modified ?? data.date_published ?? '2026-08-27',
      contentHtml: marked.parse(pageBody) as string,
    };
  });

export function getEditorialPage(slug: string): EditorialPage | undefined {
  return editorialPages.find((page) => page.slug === slug);
}
