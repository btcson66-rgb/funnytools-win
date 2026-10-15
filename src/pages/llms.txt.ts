import type { APIRoute } from 'astro';
import { SITE } from '../config/site';
import { getToolBySlug } from '../data/tools';
import { seoGuides } from '../data/seoGuides';
import { INDEXABLE_TOOL_SLUGS } from '../lib/indexPolicy';
import { absoluteUrl, localePath, toolUrl } from '../lib/url';

// llms.txt: a concise, Markdown-formatted site guide for AI crawlers and
// answer engines (https://llmstxt.org/). It lists only the pages the site
// wants to be found for: the education-statistics tools and the retained guide.
export const GET: APIRoute = () => {
  const lines: string[] = [
    `# ${SITE.name.zh} (funnytools.win)`,
    '',
    `> ${SITE.tagline.zh}`,
    `> ${SITE.tagline.en}`,
    '',
    `- 站長 / Owner: ${SITE.author.name} (${absoluteUrl(SITE.author.aboutPath)})`,
    '- 所有工具免費、免註冊；輸入的成績只在瀏覽器本機計算，不會上傳到伺服器。',
    '- All tools are free with no sign-up; scores you enter are calculated in your browser and are not uploaded.',
    '',
    '## 成績統計工具 / Grade and statistics tools',
    '',
  ];

  for (const slug of INDEXABLE_TOOL_SLUGS) {
    const tool = getToolBySlug(slug);
    if (!tool || tool.status !== 'live') continue;
    lines.push(`- [${tool.name.zh}](${absoluteUrl(toolUrl('zh', tool.slug))}): ${tool.short.zh}`);
  }
  lines.push('');

  if (seoGuides.length > 0) {
    lines.push('## 使用指南 / Guides', '');
    for (const guide of seoGuides) {
      lines.push(`- [${guide.title.zh}](${absoluteUrl(localePath('zh', 'guides', guide.slug))})`);
    }
    lines.push('');
  }

  lines.push(
    '## 重要頁面 / Key pages',
    '',
    `- [教育統計中心 / Education statistics](${absoluteUrl(localePath('zh', 'education-statistics'))})`,
    `- [關於站長 / About](${absoluteUrl(localePath('zh', 'about'))})`,
    `- [隱私權政策 / Privacy](${absoluteUrl(localePath('zh', 'privacy'))})`,
    '',
  );

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
