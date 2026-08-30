import { marked } from 'marked';
import type { Locale } from '../config/site';

export interface TaskSeoGuide {
  id: string;
  locales: Locale[];
  slug: string;
  title: Record<Locale, string>;
  metaTitle: Record<Locale, string>;
  metaDescription: Record<Locale, string>;
  h1: Record<Locale, string>;
  category: Record<Locale, string>;
  priority: number;
  searchIntent: Record<Locale, string>;
  targetKeywords: Record<Locale, string>[];
  relatedToolIds: string[];
  relatedGuideIds: string[];
  relatedWorkflowIds: string[];
  summary: Record<Locale, string>;
  problem: Record<Locale, string>;
  whoShouldUse: Record<Locale, string>;
  explanation: Record<Locale, string>[];
  steps: Record<Locale, string>[];
  example: Record<Locale, string>;
  commonMistakes: Record<Locale, string>[];
  faq: { question: Record<Locale, string>; answer: Record<Locale, string> }[];
  cta: Record<Locale, string>;
  updatedAt: string;
  publishAt?: string;
  contentHtml: Record<Locale, string>;
  noFaqSchema: true;
}

type RawFrontmatter = Record<string, string>;

const sources = import.meta.glob('../content/seo-guides/**/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

function localize(zh: string): Record<Locale, string> {
  return { zh, en: zh };
}

function valueOf(raw: string): string {
  const value = raw.trim();
  if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
    return value.slice(1, -1);
  }
  return value;
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

function slugFromPath(path: string): string {
  const match = path.match(/\/([^/]+)\.md$/);
  return match?.[1] ?? path;
}

function stripLeadingH1(body: string): string {
  return body.replace(/^# .*?(?:\r?\n){1,2}/, '').trim();
}

function firstParagraph(body: string): string {
  const text = stripLeadingH1(body)
    .split(/\r?\n\s*\r?\n/)
    .map((part) => part.trim())
    .find((part) => part && !part.startsWith('#') && !part.startsWith('>') && !part.startsWith('|'));
  return text?.replace(/[*_`]/g, '').trim() ?? '';
}

function idsFrom(body: string, kind: 'tools' | 'guides' | 'workflows'): string[] {
  const pattern = new RegExp(`/${kind}/([^/#?\\\\)"']+)`, 'g');
  return [...body.matchAll(pattern)]
    .map((match) => match[1].replace(/\/$/, ''))
    .filter((id, index, ids) => ids.indexOf(id) === index);
}

const categories: Record<string, string> = {
  'task-001': '研究統計',
  'task-002': '研究統計',
  'task-003': 'PDF 文件',
  'task-004': '圖片與檔案',
  'task-005': '文字與開發者',
  'task-006': '日期與時間',
  'task-007': '繪圖與視覺化',
  'task-008': '隨機與安全',
  'task-009': 'QR Code 與條碼',
  'task-010': '成績與 GPA',
  'task-017': '文字與寫作',
};

function taskFromPath(path: string): string {
  const match = path.match(/\/task-(\d{3})\//);
  return match ? `task-${match[1]}` : 'task-001';
}

export const importedTaskSeoGuides: TaskSeoGuide[] = Object.entries(sources)
  .sort(([left], [right]) => left.localeCompare(right))
  .map(([path, source], index) => {
    const { frontmatter, body } = parseDocument(source);
    const route = frontmatter.slug ?? `/guides/${slugFromPath(path)}/`;
    const slug = route.split('/').filter(Boolean).at(-1) ?? slugFromPath(path);
    const h1 = frontmatter.hero_title ?? frontmatter.title ?? slugFromPath(path);
    const summary = frontmatter.hero_subtitle ?? firstParagraph(body);
    const task = taskFromPath(path);
    const bodyWithoutH1 = stripLeadingH1(body);
    const guideLinks = idsFrom(bodyWithoutH1, 'guides').filter((id) => id !== slug);
    return {
      id: slug,
      locales: ['zh'],
      slug,
      title: localize(frontmatter.card_title ?? h1),
      metaTitle: localize(frontmatter.seo_title ?? h1),
      metaDescription: localize(frontmatter.meta_description ?? summary),
      h1: localize(h1),
      category: localize(categories[task] ?? 'FunnyTools 指南'),
      priority: 1000 + index,
      searchIntent: localize(frontmatter.search_intent ?? '問題解決與實作指南'),
      targetKeywords: [localize(frontmatter.primary_keyword ?? h1)],
      relatedToolIds: idsFrom(bodyWithoutH1, 'tools'),
      relatedGuideIds: guideLinks,
      relatedWorkflowIds: idsFrom(bodyWithoutH1, 'workflows'),
      summary: localize(summary),
      problem: localize(firstParagraph(body)),
      whoShouldUse: localize(summary),
      explanation: [],
      steps: [],
      example: localize('請依頁面中的條件、限制與範例逐項核對。'),
      commonMistakes: [],
      faq: [],
      cta: localize('可從頁面中的相關工具與延伸指南繼續操作。'),
      updatedAt: frontmatter.date_modified ?? frontmatter.date_published ?? '2026-08-27',
      publishAt: frontmatter.date_published,
      contentHtml: localize(marked.parse(bodyWithoutH1) as string),
      noFaqSchema: true,
    } satisfies TaskSeoGuide;
  });
