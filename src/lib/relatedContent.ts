import type { Locale } from '../config/site';
import { allBlogPosts } from '../data/allBlogPosts';
import { liveTools, type ToolMeta } from '../data/tools';
import { getGuidesForTool } from '../data/seoGuides';
import { getWorkflowsForTool } from '../data/workflows';
import { isPostAvailableInLocale, viewBlogPost } from '../data/blogPosts';

export interface RelatedContentSet {
  tools: ToolMeta[];
  articles: ReturnType<typeof viewBlogPost>[];
  hubs: { id: string; href: string; label: string }[];
  workflows: ReturnType<typeof getWorkflowsForTool>;
  guides: ReturnType<typeof getGuidesForTool>;
}

export function getRelatedContentForTool(tool: ToolMeta, lang: Locale, limit = 6): RelatedContentSet {
  const manualTools = (tool.relatedTools ?? [])
    .map((slug) => liveTools.find((candidate) => candidate.slug === slug))
    .filter((candidate): candidate is ToolMeta => candidate !== undefined && candidate.slug !== tool.slug);
  const categoryTools = liveTools.filter((candidate) =>
    candidate.slug !== tool.slug
    && candidate.category === tool.category
    && !manualTools.some((manual) => manual.slug === candidate.slug),
  );
  const fallbackTools = liveTools.filter((candidate) =>
    candidate.slug !== tool.slug
    && !manualTools.some((manual) => manual.slug === candidate.slug)
    && !categoryTools.some((sameCategory) => sameCategory.slug === candidate.slug),
  );

  const articles = allBlogPosts
    .filter((post) => isPostAvailableInLocale(post, lang))
    .filter((post) => post.toolLinks.some((link) => link.slug === tool.slug))
    .slice(0, limit)
    .map((post) => viewBlogPost(post, lang));

  return {
    tools: [...manualTools, ...categoryTools, ...fallbackTools].slice(0, limit),
    articles,
    hubs: [
      { id: 'tools', href: lang === 'zh' ? '/tools/' : '/en/tools/', label: lang === 'zh' ? '工具總覽' : 'All tools' },
      { id: tool.category, href: lang === 'zh' ? `/category/${tool.category}/` : `/en/category/${tool.category}/`, label: tool.category },
      { id: 'education-statistics', href: lang === 'zh' ? '/education-statistics/' : '/en/education-statistics/', label: lang === 'zh' ? '教育與統計' : 'Education statistics' },
    ],
    workflows: getWorkflowsForTool(tool.slug, lang).slice(0, limit),
    guides: getGuidesForTool(tool.slug, lang).slice(0, limit),
  };
}
