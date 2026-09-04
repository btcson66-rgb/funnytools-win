import { marked } from 'marked';
import type { Locale } from '../config/site';
import type { SeoPageKind } from './seoContentModels';
import type { Workflow } from './workflows';
import { sanitizePublicMarkdown } from '../lib/publicMarkdown';

type RawFrontmatter = Record<string, string>;
const sources = import.meta.glob('../content/seo-workflows/**/*.md', { eager: true, query: '?raw', import: 'default' }) as Record<string, string>;

function valueOf(raw: string): string {
  const value = raw.trim();
  return (value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'")) ? value.slice(1, -1) : value;
}

function completeMetaDescription(description: string): string {
  if ([...description].length >= 70) return description;
  return `${description} 本流程補充推薦工具、操作步驟與結果複核方向，方便正式使用前逐項核對。`;
}
function parseDocument(source: string): { frontmatter: RawFrontmatter; body: string } {
  const lines = source.replace(/^\uFEFF/, '').split(/\r?\n/);
  if (lines[0]?.trim() !== '---') return { frontmatter: {}, body: source };
  const end = lines.findIndex((line, index) => index > 0 && line.trim() === '---');
  if (end < 0) return { frontmatter: {}, body: source };
  const frontmatter: RawFrontmatter = {};
  for (const line of lines.slice(1, end)) {
    const match = line.match(/^([A-Za-z_][A-Za-z0-9_]*):\s*(.*)$/);
    if (match) frontmatter[match[1]] = valueOf(match[2]);
  }
  return { frontmatter, body: lines.slice(end + 1).join('\n').trim() };
}
function localize(zh: string): Record<Locale, string> { return { zh, en: zh }; }
function idsFrom(body: string, kind: 'tools' | 'guides'): string[] {
  const pattern = new RegExp(`/${kind}/([^/#?\\\\)"']+)`, 'g');
  return [...body.matchAll(pattern)].map((match) => match[1].replace(/\/$/, '')).filter((id, index, ids) => ids.indexOf(id) === index);
}
function stripLeadingH1(body: string): string { return body.replace(/^# .*?(?:\r?\n){1,2}/, '').trim(); }

export const importedTaskSeoWorkflows: Workflow[] = Object.entries(sources).sort(([left], [right]) => left.localeCompare(right)).map(([sourcePath, source]) => {
  const { frontmatter, body } = parseDocument(source);
  const route = frontmatter.slug ?? `/${sourcePath.split('/').at(-1)?.replace(/\.md$/, '') ?? 'workflow'}/`;
  const slug = route.split('/').filter(Boolean).at(-1) ?? 'workflow';
  const title = frontmatter.hero_title ?? slug;
  const contentHtml = marked.parse(sanitizePublicMarkdown(stripLeadingH1(body))) as string;
  return {
    pageKind: 'workflow' as SeoPageKind,
    id: slug,
    locales: ['zh'],
    slug,
    title: localize(title),
    metaTitle: localize(frontmatter.seo_title ?? title),
    metaDescription: localize(completeMetaDescription(frontmatter.meta_description ?? frontmatter.hero_subtitle ?? title)),
    h1: localize(title),
    purpose: localize(frontmatter.hero_subtitle ?? title),
    steps: [],
    recommendedToolIds: idsFrom(sanitizePublicMarkdown(body), 'tools'),
    relatedGuideIds: idsFrom(sanitizePublicMarkdown(body), 'guides'),
    faq: [],
    updatedAt: frontmatter.date_modified ?? frontmatter.date_published ?? '2026-08-31',
    publishAt: frontmatter.date_published ?? '2026-08-31',
    contentHtml: localize(contentHtml),
    noFaqSchema: true,
  };
});
