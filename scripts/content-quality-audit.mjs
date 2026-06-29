import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const rootDir = process.cwd();
const distDir = join(rootDir, 'dist');
const usefulPostsPath = join(rootDir, 'src/data/usefulBlogPosts.ts');
const redirectsPath = join(rootDir, 'src/data/blogRedirects.ts');
const reportsDir = join(rootDir, 'reports');
const seoReportsDir = join(rootDir, 'seo-system/reports');

function parseGeneratedArray(file, constName) {
  const text = readFileSync(file, 'utf8');
  const start = text.indexOf(`const ${constName}`);
  if (start === -1) throw new Error(`Cannot find ${constName} in ${relative(rootDir, file)}`);
  const assignmentStart = text.indexOf('=', start);
  const arrayStart = text.indexOf('[', assignmentStart);
  if (arrayStart === -1) throw new Error(`Cannot find ${constName} array in ${relative(rootDir, file)}`);

  let depth = 0;
  let inString = false;
  let escapeNext = false;
  for (let index = arrayStart; index < text.length; index += 1) {
    const char = text[index];
    if (escapeNext) {
      escapeNext = false;
      continue;
    }
    if (char === '\\') {
      escapeNext = true;
      continue;
    }
    if (char === '"') {
      inString = !inString;
      continue;
    }
    if (inString) continue;
    if (char === '[') depth += 1;
    if (char === ']') {
      depth -= 1;
      if (depth === 0) return JSON.parse(text.slice(arrayStart, index + 1));
    }
  }

  throw new Error(`Cannot parse ${constName} in ${relative(rootDir, file)}`);
}

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

function stripHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[^;\s]+;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function stripMarkdown(markdown) {
  return markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]+`/g, ' ')
    .replace(/!\[[^\]]*]\([^)]+\)/g, ' ')
    .replace(/\[[^\]]+]\([^)]+\)/g, ' ')
    .replace(/^#{1,6}\s+/gm, ' ')
    .replace(/^[-*+]\s+/gm, ' ')
    .replace(/[>*_~|]/g, ' ');
}

function locsFromXml(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) =>
    match[1]
      .replaceAll('&amp;', '&')
      .replaceAll('&lt;', '<')
      .replaceAll('&gt;', '>')
      .replaceAll('&quot;', '"')
      .replaceAll('&apos;', "'"),
  );
}

function duplicates(items, field) {
  const seen = new Map();
  for (const item of items) {
    const value = item[field]?.trim();
    if (!value) continue;
    seen.set(value, [...(seen.get(value) ?? []), item.slug]);
  }
  return [...seen.entries()]
    .filter(([, slugs]) => slugs.length > 1)
    .map(([value, slugs]) => ({ value, slugs }));
}

const farmPatterns = [
  /^T\s*分數\s*(35|40|45|50|55|60|65|70|75|80)\s*(代表|是什麼|怎麼看|如何解讀)/,
  /^Z\s*分數\s*-?\d+(\.\d+)?\s*(代表|是什麼|怎麼看|如何解讀)/,
  /^PR\s*\d+\s*(代表|是什麼|怎麼看|如何解讀)/,
  /教師甄試.*筆試\s*\d+%.*口試\s*\d+%.*試教\s*\d+%/,
  /權重\s*\d+.*成績.*\d+%.*排名.*\d+/,
];

const repeatedPhraseStopTerms = [
  'FunnyTools',
  'funnytools',
  '工具網站',
  '線上工具',
  'wordcounter',
  'qrcodegenerator',
  'mergepdf',
  'imagestopdf',
  'compresspdf',
  'base64encoder',
  'base64decoder',
  'randomwheel',
  'countdowntimer',
  'randomgroupgenerator',
  'randomstudentpicker',
];

const repeatedPhraseGenericTerms = [
  '工具',
  '資料',
  '檔案',
  '內容',
  '流程',
  '結果',
  '使用',
  '整理',
  '確認',
  '檢查',
  '格式',
  '操作',
  '輸出',
  '輸入',
  '版本',
  '分享',
  '交付',
  '需要',
  '可以',
  '如果',
  '時候',
  '方式',
  '問題',
  '相關',
  'PDF',
  '圖片',
  '文字',
  '網址',
  '分數',
  '時間',
  '名單',
];

function normalizeForPhraseScan(value, post) {
  const toolNames = post.toolSlugs.flatMap((slug) => [
    slug,
    slug.replaceAll('-', ''),
    slug.replaceAll('-', ' '),
  ]);
  let text = stripMarkdown(value)
    .replace(/[A-Za-z0-9_-]+/g, ' ')
    .replace(/[，。！？、；：「」『』（）()［］【】《》〈〉,.!?;:'"[\]{}<>/\\|+=*&^%$#@~`…—–-]/g, '')
    .replace(/\s+/g, '');

  for (const term of [...repeatedPhraseStopTerms, ...toolNames, post.slug, post.categoryLabel]) {
    if (!term) continue;
    text = text.replaceAll(term.replace(/\s+/g, ''), '');
  }
  return text;
}

function isGenericPhrase(phrase) {
  if (!/[\u4e00-\u9fff]/.test(phrase)) return true;
  if (phrase.length < 8) return true;
  if (/^[的了是在和與或及把讓由以而就才再先後前中內外上下載入出到對於]+$/.test(phrase)) return true;
  const stripped = repeatedPhraseGenericTerms.reduce((current, term) => current.replaceAll(term, ''), phrase);
  return stripped.length <= 2;
}

function repeatedPhraseWarnings(posts) {
  const phraseArticles = new Map();
  for (const post of posts) {
    const faqText = (post.faq ?? []).map((item) => `${item.question} ${item.answer}`).join(' ');
    const text = normalizeForPhraseScan(`${post.description} ${post.summary} ${post.contentMarkdown} ${faqText}`, post);
    const perPost = new Set();
    for (let size = 8; size <= 16; size += 1) {
      for (let index = 0; index <= text.length - size; index += 1) {
        const phrase = text.slice(index, index + size);
        if (isGenericPhrase(phrase)) continue;
        perPost.add(phrase);
      }
    }
    for (const phrase of perPost) {
      if (!phraseArticles.has(phrase)) phraseArticles.set(phrase, new Set());
      phraseArticles.get(phrase).add(post.slug);
    }
  }

  return [...phraseArticles.entries()]
    .map(([fragment, slugs]) => ({
      fragment,
      articleCount: slugs.size,
      sampleSlugs: [...slugs].slice(0, 8),
    }))
    .filter((item) => item.articleCount >= 10)
    .sort((a, b) => b.articleCount - a.articleCount || b.fragment.length - a.fragment.length || a.fragment.localeCompare(b.fragment))
    .slice(0, 20);
}

function markdownTable(rows) {
  if (!rows.length) return 'No repeated phrase warnings.\n';
  return [
    '| Fragment | Articles | Sample slugs |',
    '| --- | ---: | --- |',
    ...rows.map((row) => `| ${row.fragment} | ${row.articleCount} | ${row.sampleSlugs.join(', ')} |`),
    '',
  ].join('\n');
}

if (!existsSync(distDir)) {
  throw new Error('dist/ is missing. Run npm.cmd run build before npm.cmd run content:audit.');
}

mkdirSync(reportsDir, { recursive: true });
mkdirSync(seoReportsDir, { recursive: true });

const posts = parseGeneratedArray(usefulPostsPath, 'usefulArticleSources');
const redirects = parseGeneratedArray(redirectsPath, 'blogRedirects');
const htmlFiles = walk(distDir).filter((file) => file.endsWith('.html'));
const articlePages = posts.map((post) => {
  const file = join(distDir, 'blog', post.slug, 'index.html');
  const html = existsSync(file) ? readFileSync(file, 'utf8') : '';
  const text = stripHtml(html);
  return {
    slug: post.slug,
    file,
    exists: Boolean(html),
    h1Count: (html.match(/<h1\b/gi) ?? []).length,
    wordCount: text.length,
    farmHits: farmPatterns.filter((pattern) => pattern.test(text)).map((pattern) => pattern.source),
  };
});

const blogSitemapPath = join(distDir, 'sitemap-blog.xml');
const blogSitemapLocs = existsSync(blogSitemapPath) ? locsFromXml(readFileSync(blogSitemapPath, 'utf8')) : [];
const oldRedirectUrlsInSitemap = redirects
  .map((redirect) => `https://funnytools.win/blog/${redirect.slug}/`)
  .filter((url) => blogSitemapLocs.includes(url));
const redirectPages = redirects.map((redirect) => {
  const file = join(distDir, 'blog', redirect.slug, 'index.html');
  const html = existsSync(file) ? readFileSync(file, 'utf8') : '';
  return {
    slug: redirect.slug,
    redirectTo: redirect.redirectTo,
    exists: Boolean(html),
    noindex: /<meta\s+name="robots"\s+content="noindex,\s*follow"/i.test(html),
    refresh: /<meta\s+http-equiv="refresh"/i.test(html),
  };
});

const report = {
  blogArticleCount: posts.length,
  indexableBlogUrlCount: blogSitemapLocs.filter((url) => url.includes('/blog/')).length,
  duplicateTitles: duplicates(posts, 'title'),
  duplicateDescriptions: duplicates(posts, 'description'),
  missingPages: articlePages.filter((page) => !page.exists).map((page) => page.slug),
  invalidH1Pages: articlePages.filter((page) => page.h1Count !== 1).map((page) => ({ slug: page.slug, h1Count: page.h1Count })),
  lowWordCountPages: articlePages.filter((page) => page.wordCount < 700).map((page) => ({ slug: page.slug, wordCount: page.wordCount })),
  farmPatternHits: articlePages.filter((page) => page.farmHits.length).map((page) => ({ slug: page.slug, hits: page.farmHits })),
  repeatedPhraseWarnings: repeatedPhraseWarnings(posts),
  redirectCount: redirects.length,
  invalidRedirectPages: redirectPages.filter((page) => !page.exists || !page.noindex || !page.refresh),
  oldRedirectUrlsInSitemap,
};

const failures = [];
if (report.blogArticleCount !== 100) failures.push(`expected 100 useful posts, got ${report.blogArticleCount}`);
if (report.missingPages.length) failures.push(`missing rendered article pages: ${report.missingPages.slice(0, 10).join(', ')}`);
if (report.duplicateTitles.length) failures.push(`duplicate titles: ${report.duplicateTitles.length}`);
if (report.duplicateDescriptions.length) failures.push(`duplicate descriptions: ${report.duplicateDescriptions.length}`);
if (report.invalidH1Pages.length) failures.push(`invalid H1 count: ${report.invalidH1Pages.slice(0, 10).map((page) => page.slug).join(', ')}`);
if (report.lowWordCountPages.length) failures.push(`low word count pages: ${report.lowWordCountPages.slice(0, 10).map((page) => page.slug).join(', ')}`);
if (report.farmPatternHits.length) failures.push(`farm pattern hits: ${report.farmPatternHits.slice(0, 10).map((page) => page.slug).join(', ')}`);
if (report.invalidRedirectPages.length) failures.push(`invalid redirect pages: ${report.invalidRedirectPages.slice(0, 10).map((page) => page.slug).join(', ')}`);
if (report.oldRedirectUrlsInSitemap.length) failures.push(`redirected old URLs still in sitemap: ${report.oldRedirectUrlsInSitemap.slice(0, 10).join(', ')}`);

writeFileSync(join(reportsDir, 'content-quality-audit.json'), `${JSON.stringify(report, null, 2)}\n`, 'utf8');
writeFileSync(
  join(seoReportsDir, 'content-quality-audit.md'),
  [
    '# Content Quality Audit',
    '',
    `- Useful posts: ${report.blogArticleCount}`,
    `- Sitemap blog URLs: ${report.indexableBlogUrlCount}`,
    `- Redirect stubs: ${report.redirectCount}`,
    `- Duplicate titles: ${report.duplicateTitles.length}`,
    `- Duplicate descriptions: ${report.duplicateDescriptions.length}`,
    `- Farm-pattern hits: ${report.farmPatternHits.length}`,
    `- Old redirect URLs in sitemap: ${report.oldRedirectUrlsInSitemap.length}`,
    `- Repeated phrase warnings: ${report.repeatedPhraseWarnings.length}`,
    '',
    '## Repeated Phrase Warnings',
    '',
    'Fragments are scanned from source article title-adjacent copy, summaries, body markdown, and FAQ. The scanner reports 8-16 character fragments that appear in 10 or more distinct useful articles after removing tool names, site names, title fragments, punctuation, and generic workflow terms.',
    '',
    markdownTable(report.repeatedPhraseWarnings),
    '## Notes',
    '',
    '- Repeated phrase warnings do not fail the audit; they are editorial signals.',
    '- Farm-pattern hits, duplicate titles/descriptions, missing pages, invalid H1s, invalid redirect stubs, and old redirect URLs in the blog sitemap still fail the audit.',
    '',
  ].join('\n'),
  'utf8',
);

console.log(`Content audit: ${report.blogArticleCount} useful posts, ${report.indexableBlogUrlCount} indexable blog URLs, ${report.redirectCount} redirect stubs.`);
console.log(`Repeated phrase warnings: ${report.repeatedPhraseWarnings.length} fragment(s) across 10+ useful posts.`);
if (report.repeatedPhraseWarnings.length) {
  console.log(
    report.repeatedPhraseWarnings
      .slice(0, 5)
      .map((item) => `- ${item.fragment}: ${item.articleCount} posts`)
      .join('\n'),
  );
}
if (failures.length) {
  console.error(`Content audit failed:\n- ${failures.join('\n- ')}`);
  process.exit(1);
}
console.log('Content audit passed: no duplicate titles/descriptions, no farm-pattern hits, no old redirect URLs in sitemap.');
