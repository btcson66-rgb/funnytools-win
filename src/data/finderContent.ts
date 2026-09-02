import { marked } from 'marked';

const sources = import.meta.glob('../content/finder/**/*.md', { eager: true, query: '?raw', import: 'default' }) as Record<string, string>;

function parseBody(source: string): string {
  const lines = source.replace(/^\uFEFF/, '').split(/\r?\n/);
  const end = lines.findIndex((line, index) => index > 0 && line.trim() === '---');
  const body = lines[0]?.trim() === '---' && end >= 0 ? lines.slice(end + 1).join('\n').trim() : source;
  return body.replace(/^# .*?(?:\r?\n){1,2}/, '').trim();
}

export const finderContentHtml = marked.parse(parseBody(Object.values(sources)[0] ?? '')) as string;
