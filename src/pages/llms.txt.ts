import type { APIRoute } from 'astro';
import { SITE } from '../config/site';
import { categories } from '../data/categories';
import { getToolsByCategory } from '../data/tools';
import { seoGuides } from '../data/seoGuides';
import { workflows } from '../data/workflows';
import { absoluteUrl, localePath, toolUrl } from '../lib/url';

// llms.txt: a concise, Markdown-formatted site guide for AI crawlers and
// answer engines (https://llmstxt.org/).
export const GET: APIRoute = () => {
  const lines: string[] = [
    `# ${SITE.name.zh} (FunnyTools by funnytools.win)`,
    '',
    `> ${SITE.tagline.zh}`,
    `> ${SITE.tagline.en}`,
    '',
    '- 所有工具免費、免註冊；多數工具在瀏覽器本機處理資料，檔案與輸入內容不會上傳到伺服器。',
    '- All tools are free with no sign-up. Most tools process data locally in the browser; files and inputs are not uploaded.',
    `- 中文版（預設）：${absoluteUrl(localePath('zh'))}`,
    `- English version: ${absoluteUrl(localePath('en'))}`,
    '',
  ];

  for (const category of categories) {
    const tools = getToolsByCategory(category.id).filter((tool) => tool.status === 'live');
    if (tools.length === 0) continue;
    lines.push(`## ${category.name.zh} / ${category.name.en}`, '');
    for (const tool of tools) {
      lines.push(`- [${tool.name.zh} / ${tool.name.en}](${absoluteUrl(toolUrl('zh', tool.slug))}): ${tool.short.zh}`);
    }
    lines.push('');
  }

  if (seoGuides.length > 0) {
    lines.push('## 使用指南 / Guides', '');
    for (const guide of seoGuides) {
      lines.push(`- [${guide.title.zh}](${absoluteUrl(localePath('zh', 'guides', guide.slug))})`);
    }
    lines.push('');
  }

  if (workflows.length > 0) {
    lines.push('## 工作流程工具包 / Workflow toolkits', '');
    for (const workflow of workflows) {
      lines.push(`- [${workflow.title.zh}](${absoluteUrl(localePath('zh', 'workflows', workflow.slug))})`);
    }
    lines.push('');
  }

  lines.push(
    '## 重要頁面 / Key pages',
    '',
    `- [所有工具 / All tools](${absoluteUrl(localePath('zh', 'tools'))})`,
    `- [教育統計中心 / Education statistics](${absoluteUrl(localePath('zh', 'education-statistics'))})`,
    `- [關於本站 / About](${absoluteUrl(localePath('zh', 'about'))})`,
    `- [隱私權政策 / Privacy](${absoluteUrl(localePath('zh', 'privacy'))})`,
    '',
  );

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
