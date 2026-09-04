import { marked } from 'marked';
import type { Locale } from '../config/site';
import type { SeoPageKind } from './seoContentModels';

export interface TaskSeoGuide {
  task: string;
  pageKind: SeoPageKind;
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

// English editorial passes live in a separate tree so a translated article
// cannot accidentally be parsed as a second Chinese route.  A file is only
// exposed at /en/guides/ when it has its own English copy and metadata.
const englishSources = import.meta.glob('../content/seo-guides-en/**/*.md', {
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

function completeMetaDescription(description: string): string {
  if ([...description].length >= 70) return description;
  return `${description} 本頁補充工具連結、操作步驟與結果複核方向，方便正式使用前逐項核對。`;
}

function sanitizeMetaDescription(description: string): string {
  return description.replaceAll('<', '小於').replaceAll('>', '大於');
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

function sourceForSlug(sourceMap: Record<string, string>, targetSlug: string): string | undefined {
  return Object.entries(sourceMap).find(([path]) => slugFromPath(path) === targetSlug)?.[1];
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
    const pageKind: SeoPageKind = /\/00-[^/]+-hub\.md$/.test(path) ? 'guideHub' : 'guide';
    const bodyWithoutH1 = stripLeadingH1(body);
    const guideLinks = idsFrom(bodyWithoutH1, 'guides').filter((id) => id !== slug);
    const englishSource = sourceForSlug(englishSources, slug);
    const englishDocument = englishSource ? parseDocument(englishSource) : undefined;
    const englishBody = englishDocument ? stripLeadingH1(englishDocument.body) : undefined;
    const englishFrontmatter = englishDocument?.frontmatter;
    const englishSummary = englishFrontmatter?.hero_subtitle
      ?? (englishDocument ? firstParagraph(englishDocument.body) : undefined);
    const englishContent = englishBody ? marked.parse(englishBody) as string : undefined;
    const englishTitle = englishFrontmatter?.card_title ?? englishFrontmatter?.hero_title;
    const englishMetaTitle = englishFrontmatter?.seo_title ?? englishFrontmatter?.hero_title;
    const englishMetaDescription = englishFrontmatter?.meta_description
      ? completeMetaDescription(sanitizeMetaDescription(englishFrontmatter.meta_description))
      : undefined;
    const englishH1 = englishFrontmatter?.hero_title ?? englishFrontmatter?.title;
    const englishCategory = englishFrontmatter?.category;
    const englishSearchIntent = englishFrontmatter?.search_intent;
    const englishKeyword = englishFrontmatter?.primary_keyword;
    const englishProblem = englishDocument ? firstParagraph(englishDocument.body) : undefined;
    const englishAudience = englishFrontmatter?.audience ?? englishSummary;
    const englishCta = englishFrontmatter?.cta;
    const updatedAt = [frontmatter.date_modified, englishFrontmatter?.date_modified, frontmatter.date_published]
      .filter((value): value is string => Boolean(value))
      .sort()
      .at(-1) ?? '2026-08-27';
    return {
      task,
      pageKind,
      id: slug,
      locales: englishDocument ? ['zh', 'en'] : ['zh'],
      slug,
      title: { zh: frontmatter.card_title ?? h1, en: englishTitle ?? frontmatter.card_title ?? h1 },
      metaTitle: { zh: frontmatter.seo_title ?? h1, en: englishMetaTitle ?? frontmatter.seo_title ?? h1 },
      metaDescription: {
        zh: completeMetaDescription(sanitizeMetaDescription(frontmatter.meta_description ?? summary)),
        en: englishMetaDescription ?? completeMetaDescription(sanitizeMetaDescription(frontmatter.meta_description ?? summary)),
      },
      h1: { zh: h1, en: englishH1 ?? h1 },
      category: { zh: frontmatter.category ?? categories[task] ?? 'FunnyTools 指南', en: englishCategory ?? frontmatter.category ?? categories[task] ?? 'FunnyTools guide' },
      priority: 1000 + index,
      searchIntent: { zh: frontmatter.search_intent ?? '問題解決與實作指南', en: englishSearchIntent ?? frontmatter.search_intent ?? 'Problem-solving and practical guide' },
      targetKeywords: [{ zh: frontmatter.primary_keyword ?? h1, en: englishKeyword ?? frontmatter.primary_keyword ?? h1 }],
      relatedToolIds: idsFrom(bodyWithoutH1, 'tools'),
      relatedGuideIds: guideLinks,
      relatedWorkflowIds: idsFrom(bodyWithoutH1, 'workflows'),
      summary: { zh: summary, en: englishSummary ?? summary },
      problem: { zh: firstParagraph(body), en: englishProblem ?? summary },
      whoShouldUse: { zh: summary, en: englishAudience ?? summary },
      explanation: [],
      steps: [],
      example: { zh: '請依頁面中的條件、限制與範例逐項核對。', en: englishFrontmatter?.example ?? 'Check the page conditions, limits, and worked example before relying on the result.' },
      commonMistakes: [],
      faq: [],
      cta: { zh: '可從頁面中的相關工具與延伸指南繼續操作。', en: englishCta ?? 'Continue with the related tools and guides linked on this page.' },
      updatedAt,
      publishAt: task === 'task-017' ? (frontmatter.date_published ?? '2026-08-31') : frontmatter.date_published,
      contentHtml: { zh: marked.parse(bodyWithoutH1) as string, en: englishContent ?? (marked.parse(bodyWithoutH1) as string) },
      noFaqSchema: true,
    } satisfies TaskSeoGuide;
  });
