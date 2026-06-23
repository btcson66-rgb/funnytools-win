import keywordData from '../../seo-system/keywords/tools-keywords.json';
import { localizeZhPost, type BlogPost, type RawBlogPost } from './blogPosts';
import { tools as siteTools } from './tools';

interface KeywordTool {
  tool_id: string;
  tool_name_zh: string;
  tool_name_en: string;
  main_keyword_zh: string;
  secondary_keywords_zh: string[];
  search_intents_zh: string[];
  related_tools: string[];
  article_ideas: string[];
  faq_questions: string[];
  category: string;
}

const categoryLabels: Record<string, string> = {
  pdf: 'PDF 工具',
  image: '圖片工具',
  text: '文字工具',
  random: '隨機工具',
  time: '時間工具',
  money: '金錢試算工具',
  statistics: '統計與計算工具',
};

const slugSuffixes: Record<string, string[]> = {
  'merge-pdf': ['mobile-merge', 'application-files', 'page-order-check', 'merge-split-reorder'],
  'pdf-compressor': ['upload-limit', 'resume-file-size', 'why-file-gets-bigger', 'compress-delete-image'],
  'split-pdf': ['extract-pages', 'page-range', 'chapter-files', 'split-or-delete'],
  'image-compressor': ['large-image', 'photo-under-1mb', 'social-upload', 'compress-resize-convert'],
  'png-to-jpg': ['transparent-background', 'reduce-file-size', 'presentation-images', 'png-jpg-webp'],
  'jpg-to-png': ['image-quality', 'transparent-background', 'design-export', 'convert-crop-compress'],
  'qr-code-generator': ['free-qr-code', 'poster-checklist', 'long-url-scan', 'color-contrast'],
  'word-counter': ['threads-length', 'chinese-character-count', 'submission-check', 'meta-description-length'],
  'random-group-generator': ['teacher-classroom', 'event-teams', 'clean-name-list', 'random-vs-rules'],
  'random-name-picker': ['fair-draw', 'duplicate-name-list', 'teacher-picker', 'picker-wheel-dice'],
  'pomodoro-timer': ['twenty-five-minutes', 'study-breaks', 'remote-work', 'pomodoro-vs-timer'],
  'countdown-timer': ['classroom-uses', 'presentation-time', 'event-draw', 'timer-vs-pomodoro'],
  'mortgage-payment': ['monthly-payment', 'rate-change', 'income-ratio', 'mortgage-vs-compound'],
  'compound-interest': ['formula', 'dca-vs-lump-sum', 'annual-return-risk', 'inflation-purchasing-power'],
  'percentage-calculator': ['discount-price', 'buy-one-get-one', 'percentage-change', 'discount-vs-percentage'],
  'date-difference': ['days-between-dates', 'include-start-date', 'event-countdown', 'date-vs-business-days'],
  'timestamp-converter': ['unix-to-date', 'seconds-milliseconds', 'api-time-debug', 'unit-converter-scope'],
  'password-generator': ['secure-password', 'length-vs-complexity', 'unique-passwords', 'password-manager'],
  'color-generator': ['hex-rgb-hsl', 'qr-code-colors', 'presentation-palette', 'color-tools-workflow'],
  'markdown-previewer': ['basic-syntax', 'readme-preview', 'link-list-errors', 'markdown-writing-workflow'],
};

function tools(): KeywordTool[] {
  return (keywordData as { tools: KeywordTool[] }).tools;
}

function toolById(id: string): KeywordTool | undefined {
  return tools().find((tool) => tool.tool_id === id);
}

function relatedLabel(slug: string): string {
  const related = toolById(slug);
  const siteTool = siteTools.find((tool) => tool.slug === slug);
  return related?.tool_name_zh ?? siteTool?.name.zh ?? slug.replaceAll('-', ' ');
}

function articleSlug(tool: KeywordTool, index: number): string {
  return `${tool.tool_id}-${slugSuffixes[tool.tool_id]?.[index] ?? `guide-${index + 1}`}`;
}

function topicText(idea: string): string {
  return idea.replace(/[？?]$/, '');
}

function faqAnswerLead(question: string): string {
  return question.replace(/[？?]$/, '').replace(/嗎$/, '這件事');
}

function summaryFor(tool: KeywordTool, idea: string, index: number): string {
  const intent = tool.search_intents_zh[index % tool.search_intents_zh.length] ?? tool.search_intents_zh[0];
  const secondary = tool.secondary_keywords_zh.slice(0, 3).join('、');
  return `關於「${topicText(idea)}」，重點是先完成「${intent}」，再用 ${tool.tool_name_zh} 處理核心任務。本文整理 ${secondary} 等搜尋情境下可直接操作的步驟、錯誤檢查與相關工具。`;
}

function stepItems(tool: KeywordTool): string[] {
  return [
    `先確認目標：${tool.search_intents_zh[0]}。`,
    '準備必要資料，移除不需要處理的私人內容或多餘檔案。',
    `開啟 ${tool.tool_name_zh}，依頁面提示完成輸入、設定或檔案選取。`,
    '產生結果後先檢查格式、順序、數值或畫質，不要只看工具成功訊息。',
    `若結果還不符合需求，再使用相關工具交叉處理，例如 ${tool.related_tools.slice(0, 2).map(relatedLabel).join('、')}。`,
  ];
}

function mistakeItems(tool: KeywordTool): string[] {
  return [
    `只搜尋「${tool.main_keyword_zh}」卻沒有確認自己的真正需求，容易選錯工具或多做步驟。`,
    '輸入資料前沒有先備份原始檔，正式提交時就難以回溯。',
    '完成後沒有重新開啟結果檢查，可能漏掉頁面順序、格式、單位或畫質問題。',
    '把工具輸出當成正式審核、金融建議或法律判斷；FunnyTools 只能協助整理與估算，不能取代人工確認。',
  ];
}

function buildPost(tool: KeywordTool, idea: string, index: number): RawBlogPost {
  const slug = articleSlug(tool, index);
  const primaryRelated = tool.related_tools.slice(0, 4);
  const relatedArticleSlugs = tool.article_ideas
    .map((_, ideaIndex) => articleSlug(tool, ideaIndex))
    .filter((candidate) => candidate !== slug)
    .slice(0, 2);
  const summary = summaryFor(tool, idea, index);
  const comparison = index === 3;

  return {
    slug,
    title: idea,
    description: `關於「${topicText(idea)}」的實用教學，使用 ${tool.tool_name_zh} 完成操作，整理快速答案、詳細步驟、常見錯誤、FAQ、隱私提醒與相關工具內連，協助你更快完成實際任務。`,
    summary,
    published: '2026-06-23',
    updated: '2026-06-23',
    categorySlug: tool.category,
    categoryLabel: categoryLabels[tool.category] ?? tool.category,
    relatedArticleSlugs,
    toolLinks: [
      { slug: tool.tool_id, label: tool.tool_name_zh, note: `主要工具：${tool.main_keyword_zh}` },
      ...primaryRelated.map((related) => ({
        slug: related,
        label: relatedLabel(related),
        note: `搭配處理：${relatedLabel(related)}`,
      })),
    ],
    sections: [
      {
        heading: '快速答案',
        paragraphs: [
          summary,
          `如果你只是想快速完成，可以直接開啟 ${tool.tool_name_zh}，依序完成輸入、檢查、下載或複製結果。若這是要送件、上傳或對外分享的內容，最後一定要人工再看一次結果。`,
        ],
      },
      {
        heading: comparison ? '怎麼選對工具與情境？' : '詳細步驟',
        paragraphs: [
          comparison
            ? `${tool.tool_name_zh} 適合處理 ${tool.main_keyword_zh} 這類明確任務；如果需求已經變成格式調整、內容修正或進一步檢查，就應該搭配相關工具，而不是在同一頁反覆嘗試。`
            : '下面流程適合第一次使用的人，也適合把文章當成檢查清單。每一步都保留人工判斷，避免把工具結果直接當成正式答案。',
        ],
        subsections: stepItems(tool).map((step, stepIndex) => ({
          heading: `步驟 ${stepIndex + 1}`,
          paragraphs: [step],
        })),
      },
      {
        heading: '對應工具與內部連結',
        paragraphs: [
          `主要工具是 ${tool.tool_name_zh}，路徑是 /tools/${tool.tool_id}/。如果你想看同類型工具，可以從 /category/${tool.category}/ 進入 ${categoryLabels[tool.category] ?? tool.category} 分類頁。`,
          `延伸工具建議依任務選擇：${primaryRelated.map((related) => `${relatedLabel(related)}（/tools/${related}/）`).join('、')}。這些連結能幫你把同一個工作流做完，而不是停在單一工具頁。`,
        ],
      },
      {
        heading: '常見錯誤',
        paragraphs: mistakeItems(tool),
      },
      {
        heading: '隱私與使用提醒',
        paragraphs: [
          'FunnyTools 的工具頁會盡量採用瀏覽器本機處理。即使如此，處理私人文件、金額、密碼、名單或圖片時，仍建議先移除不必要的敏感內容，並保留原始資料備份。',
          `這篇文章的目的，是讓 ${tool.main_keyword_zh} 相關搜尋者更快找到可操作流程；它不會要求你註冊，也不會建議把私人內容交給不明來源。`,
        ],
      },
    ],
    faq: tool.faq_questions.slice(0, 6).map((question) => ({
      question,
      answer: `${faqAnswerLead(question)}，建議先回到實際任務判斷：你要完成的是 ${tool.search_intents_zh[0]}。若工具頁提供本機處理或限制說明，應先閱讀頁面上的隱私、格式與注意事項，再決定是否下載、複製或送出結果。`,
    })),
  };
}

export const seoResourcePosts: BlogPost[] = tools()
  .flatMap((tool) => tool.article_ideas.map((idea, index) => buildPost(tool, idea, index)))
  .map(localizeZhPost);
