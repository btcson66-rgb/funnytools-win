/**
 * Keep editorial production notes out of user-facing Markdown.
 *
 * Content files are intentionally rich working documents, but headings such
 * as "頁面 CTA" and "圖卡與 ALT" are publishing notes rather than reader
 * content.  Sanitising at the shared Markdown boundary prevents one missed
 * file from leaking those notes into a rendered route.
 */

const internalParagraphPattern = /\b(?:codex|claude)\b|\btask[- ]?\d{3}\b|internal brief|content brief|editorial brief|task package|package number|implementation note|developer note|agent instruction|編輯備註|內容要求|發布要求|本頁應做到|這篇應包含|每篇都應做到/iu;
const editorialHeadingPattern = /^(?:頁面\s*cta(?:\s*文案)?|cta|主要\s*cta|次要\s*cta|圖卡(?:文案)?(?:與|及|、|\/)\s*alt|圖片[／/]圖卡文字與\s*alt|圖卡文案與\s*alt|圖卡與\s*alt)$/iu;
const editorialLinePattern = /^(?:\s*(?:主要|次要|主)?\s*\bcta\b\s*[：:]|\s*(?:主要|次要)\s*按鈕\s*[：:]|\s*\balt\b\s*[：:]|\s*圖片\s+\balt\b\s*[：:])/iu;

function rewriteInternalParagraph(paragraph: string): string {
  if (!internalParagraphPattern.test(paragraph)) return paragraph;
  return paragraph
    .replace(/\bCodex\b/giu, '網站功能')
    .replace(/\bClaude\b/giu, '內容審閱工具')
    .replace(/\bTask[- ]?\d{3}\b/giu, '本指南')
    .replace(/\brepository\b/giu, '網站目前版本')
    .replace(/上架時(需|應)/gu, '使用前$1')
    .replace(/日後確認網站目前版本新增/gu, '日後新增')
    .replace(/偷偷新增未測試的/gu, '使用未測試的')
    .replace(/應要求/gu, '請確認')
    .replace(/必須先讀程式確認/gu, '請先確認實際功能')
    .replace(/不得在這篇文章、CTA 或 SEO metadata 中寫/gu, '本頁不會宣稱');
}

function headingLevel(line: string): number | undefined {
  const match = line.match(/^(#{1,6})\s+/);
  return match ? match[1].length : undefined;
}

function isEditorialHeading(line: string): boolean {
  const level = headingLevel(line);
  if (level === undefined) return false;
  const title = line.replace(/^#{1,6}\s+/, '').trim().replace(/[：:]$/, '');
  return editorialHeadingPattern.test(title);
}

/** Remove publishing-note sections and internal implementation paragraphs. */
export function sanitizePublicMarkdown(markdown: string): string {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const output: string[] = [];
  let editorialMode: 'cta' | 'image' | undefined;

  for (const line of lines) {
    const level = headingLevel(line);
    if (level !== undefined) editorialMode = undefined;
    if (isEditorialHeading(line)) {
      const title = line.replace(/^#{1,6}\s+/, '').trim();
      const imageSection = /alt|圖卡|圖片/i.test(title);
      editorialMode = imageSection ? 'image' : 'cta';
      output.push(`${'#'.repeat(level ?? 2)} ${imageSection ? '重點速記' : '下一步'}`);
      continue;
    }
    if (editorialMode === 'cta' && editorialLinePattern.test(line)) continue;
    if (editorialMode === 'image') {
      if (/^\s*\balt\b\s*[：:]/iu.test(line)) continue;
      if (/^\s*圖卡標題\s*[：:]/u.test(line)) {
        output.push(line.replace(/^\s*圖卡標題\s*[：:]/u, '重點：'));
        continue;
      }
      if (/^\s*三工具\s*[：:]/u.test(line)) {
        output.push(line.replace(/^\s*三工具\s*[：:]/u, '可比較的三個面向：'));
        continue;
      }
      if (/^\s*警語\s*[：:]/u.test(line)) {
        output.push(line.replace(/^\s*警語\s*[：:]/u, '注意：'));
        continue;
      }
      if (/^\s*圖卡\s*[：:]/u.test(line)) {
        output.push(line.replace(/^\s*圖卡\s*[：:]/u, '重點：'));
        continue;
      }
    }
    output.push(line);
  }

  // Remove whole paragraphs containing implementation directions.  Keeping
  // paragraph boundaries intact avoids joining unrelated sentences together.
  const paragraphs = output.join('\n').split(/\n{2,}/);
  const clean = paragraphs
    .map(rewriteInternalParagraph)
    .map((paragraph) => paragraph
      .split('\n')
      .filter((line) => !editorialLinePattern.test(line))
      .join('\n'))
    .filter((paragraph) => paragraph.trim().length > 0);

  return clean.join('\n\n').trim();
}
