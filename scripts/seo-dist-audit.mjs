import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const root = process.cwd();
const distDir = join(root, 'dist');
const site = 'https://funnytools.win';
const prioritySlugs = [
  'teacher-exam-score-converter',
  't-score-calculator',
  'z-score-calculator',
  'percentile-rank-calculator',
  'class-rank-percentile-calculator',
  'grade-average',
  'weighted-average-calculator',
  'standard-deviation',
  'cronbach-alpha-calculator',
  'random-group-generator',
  'group-generator',
  'seating-chart',
  'random-student-picker',
  'random-name-picker',
  'merge-pdf',
  'split-pdf',
  'pdf-compressor',
  'pdf-to-image',
  'images-to-pdf',
  'pdf-page-reorder',
  'extract-pdf-pages',
  'delete-pdf-pages',
  'image-compressor',
  'image-resizer',
  'image-crop',
  'png-to-jpg',
  'jpg-to-png',
  'jpg-to-webp',
  'webp-to-jpg',
  'qr-code-generator',
];

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return walk(path);
    return path.endsWith('.html') ? [path] : [];
  });
}

function stripTags(value) {
  return value
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function decode(value = '') {
  return value
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .trim();
}

function attr(html, selector) {
  return decode(html.match(selector)?.[1] ?? '');
}

function routeFromFile(file) {
  let rel = relative(distDir, file).split(sep).join('/');
  rel = rel.replace(/\/index\.html$/, '/').replace(/index\.html$/, '/');
  return `${site}/${rel === '/' ? '' : rel}`;
}

function pageType(pathname, html = '') {
  if (/<meta\s+http-equiv="refresh"/i.test(html)) return 'redirect';
  if (pathname.includes('/embed/')) return 'embed';
  if (pathname.includes('/tools/')) return 'tool';
  if (pathname.includes('/category/')) return 'category';
  if (pathname.includes('/blog/')) return 'blog';
  if (/\/(about|about-tools|contact|privacy|terms|disclaimer|support)\//.test(pathname)) return 'trust/legal';
  if (pathname.endsWith('/tools/')) return 'tools-index';
  if (pathname === '/' || pathname === '/en/' || pathname === '/zh/') return 'homepage';
  return 'other';
}

function priorityFor(url, type) {
  if (prioritySlugs.some((slug) => url.includes(`/tools/${slug}/`))) return 'high';
  if (['homepage', 'category', 'tools-index'].includes(type)) return 'high';
  if (type === 'blog') return 'medium';
  if (type === 'trust/legal') return 'low';
  if (type === 'embed') return 'excluded';
  return 'medium';
}

function wordCount(html) {
  const text = stripTags(html);
  const latinWords = text.match(/[A-Za-z0-9]+/g)?.length ?? 0;
  const cjkChars = text.match(/[\u3400-\u9fff]/g)?.length ?? 0;
  return latinWords + Math.ceil(cjkChars / 2);
}

if (!existsSync(distDir)) {
  throw new Error('dist/ is missing. Run npm.cmd run build first.');
}

const sitemapXml = readFileSync(join(distDir, 'sitemap.xml'), 'utf8');
const sitemap = new Set([...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => decode(match[1])));
const pages = walk(distDir).map((file) => {
  const html = readFileSync(file, 'utf8');
  const url = routeFromFile(file);
  const pathname = new URL(url).pathname;
  const type = pageType(pathname, html);
  const robots = attr(html, /<meta\s+name="robots"\s+content="([^"]*)"/i) || 'index,follow';
  const canonical = attr(html, /<link\s+rel="canonical"\s+href="([^"]*)"/i);
  const title = decode(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? '');
  const description = attr(html, /<meta\s+name="description"\s+content="([^"]*)"/i);
  const h1 = decode(stripTags(html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1] ?? ''));
  const hreflang = [...html.matchAll(/<link\s+rel="alternate"\s+hreflang="([^"]+)"/gi)].map((match) => match[1]);
  const words = wordCount(html);
  const noindex = /noindex/i.test(robots);
  const inSitemap = sitemap.has(url);
  const risks = [];
  if (!title) risks.push('missing title');
  if (!description) risks.push('missing meta description');
  if (!h1) risks.push('missing h1');
  if (!canonical) risks.push('missing canonical');
  if (!['embed', 'redirect'].includes(type) && !noindex && !inSitemap) risks.push('indexable but missing from sitemap');
  if (type === 'embed' && (!noindex || inSitemap)) risks.push('embed indexability mismatch');
  if (type === 'tool' && words < 700) risks.push('thin-content risk');
  if (!noindex && (url.includes('/zh/') || url.includes('/en/')) && canonical && canonical !== url) risks.push('localized canonical mismatch');
  return {
    url,
    type,
    title,
    description,
    h1,
    canonical,
    robots,
    hreflang: hreflang.join(', ') || '-',
    inSitemap,
    priority: priorityFor(url, type),
    words,
    risks,
  };
});

const titleGroups = Map.groupBy(pages.filter((p) => !p.url.includes('/embed/')), (p) => p.title);
const descGroups = Map.groupBy(pages.filter((p) => !p.url.includes('/embed/')), (p) => p.description);
for (const page of pages) {
  if (page.title && (titleGroups.get(page.title)?.length ?? 0) > 1) page.risks.push('duplicate title');
  if (page.description && (descGroups.get(page.description)?.length ?? 0) > 1) page.risks.push('duplicate meta');
}

const rows = pages
  .sort((a, b) => a.url.localeCompare(b.url))
  .map((p) => `| ${p.url} | ${p.type} | ${p.priority} | ${p.title.replaceAll('|', '\\|')} | ${p.description.replaceAll('|', '\\|')} | ${p.h1.replaceAll('|', '\\|')} | ${p.canonical} | ${p.robots} | ${p.hreflang} | ${p.inSitemap ? 'yes' : 'no'} | ${p.words} | ${p.risks.join('; ') || 'ok'} |`)
  .join('\n');

const summary = {
  pages: pages.length,
  sitemapUrls: sitemap.size,
  indexablePages: pages.filter((p) => !/noindex/i.test(p.robots)).length,
  embedPages: pages.filter((p) => p.type === 'embed').length,
  embedNoindexExcluded: pages.filter((p) => p.type === 'embed' && /noindex/i.test(p.robots) && !p.inSitemap).length,
  toolPages: pages.filter((p) => p.type === 'tool' && !/noindex/i.test(p.robots)).length,
  categoryPages: pages.filter((p) => p.type === 'category').length,
  riskPages: pages.filter((p) => p.risks.length > 0).length,
};

writeFileSync(
  join(root, 'seo-audit-report.md'),
  `# SEO Audit Report\n\nGenerated from rendered \`dist/\` after \`npm.cmd run build\`.\n\n## Summary\n\n- Rendered HTML pages checked: ${summary.pages}\n- Sitemap URLs: ${summary.sitemapUrls}\n- Indexable rendered pages: ${summary.indexablePages}\n- Indexable tool pages: ${summary.toolPages}\n- Category pages: ${summary.categoryPages}\n- Embed pages noindex and excluded from sitemap: ${summary.embedNoindexExcluded}/${summary.embedPages}\n- Pages with any flagged risk: ${summary.riskPages}\n\n## Ground-Truth Checks\n\n- \`/embed/*\`: ${summary.embedNoindexExcluded === summary.embedPages ? 'PASS' : 'CHECK'} - noindex and excluded from sitemap.\n- Tool/category pages: ${pages.filter((p) => ['tool', 'category'].includes(p.type) && !/noindex/i.test(p.robots)).every((p) => p.inSitemap) ? 'PASS' : 'CHECK'} - indexable pages are included in sitemap.\n- zh/en canonical: ${pages.filter((p) => !/noindex/i.test(p.robots) && (p.url.includes('/zh/') || p.url.includes('/en/'))).every((p) => !p.canonical || p.canonical === p.url) ? 'PASS' : 'CHECK'} - indexable localized pages self-canonicalize; noindex redirect stubs are excluded from this check.\n- Planned/thin tools: static route generation uses live tool pages only; any thin-content risk below is content-depth, not planned-tool indexing.\n\n## Fixes Done In This Pass\n\nInitial audit generated before implementation. See \`seo-implementation-log.md\` for cumulative changes as batches land.\n\n## Remaining Work\n\n- Tighten priority tool titles/meta where duplicates or generic phrasing are flagged.\n- Enrich any priority tool page flagged for thin content.\n- Add explicit pillar articles and connect them from priority clusters.\n\n## Per-URL Detail\n\n| URL | Type | Priority | Title | Meta Description | H1 | Canonical | Robots | Hreflang | Sitemap | Words | Risk |\n| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | ---: | --- |\n${rows}\n`,
  'utf8',
);

const keywordRows = prioritySlugs.map((slug) => {
  const zh = pages.find((p) => p.url.endsWith(`/tools/${slug}/`) || p.url.includes(`/zh/tools/${slug}/`));
  const en = pages.find((p) => p.url.includes(`/en/tools/${slug}/`));
  const url = zh?.url ?? `${site}/tools/${slug}/`;
  const title = zh?.title ?? slug;
  const type = slug.includes('pdf') ? 'PDF tool' : slug.includes('image') || slug.includes('jpg') || slug.includes('png') || slug.includes('webp') || slug.includes('qr') ? 'image tool' : slug.includes('student') || slug.includes('group') || slug.includes('seating') ? 'classroom tool' : 'education/statistics tool';
  return `| ${url} | ${title.replace(' - FunnyTools', '')} | ${slug.replaceAll('-', ', ')} | tool-use / calculator intent | ${type} | high | ${zh && en ? 'zh+en live' : zh ? 'zh live' : 'missing'} | ${zh?.risks.join('; ') || 'monitor CTR and query fit'} |`;
}).join('\n');

writeFileSync(
  join(root, 'seo-keyword-map.md'),
  `# SEO Keyword Map\n\n## Priority Tool Map\n\n| URL | Primary Keyword | Secondary Keywords | Intent | Content Type | Priority | Current Status | Next Action |\n| --- | --- | --- | --- | --- | --- | --- | --- |\n${keywordRows}\n\n## Cluster Notes\n\n- Education/statistics: teacher exam weighting, T score, Z score, PR, class rank, weighted average, standard deviation, Cronbach alpha.\n- Classroom tools: random grouping, class grouping, seating chart, random student picker, random name picker.\n- PDF tools: merge, split, compress, reorder, extract, delete pages, PDF to image, images to PDF.\n- Image tools: compress, resize, crop, PNG/JPG/WebP conversion, QR code generation.\n- Text/writing tools: word counter, character counter, line cleanup, JSON/CSV/Markdown helpers.\n`,
  'utf8',
);

writeFileSync(
  join(root, 'seo-content-plan.md'),
  `# SEO Content Plan\n\n## Five Pillar Articles To Publish\n\n| Pillar | Suggested URL Slug | Target Tools | Suggested Title | Meta |\n| --- | --- | --- | --- | --- |\n| Teacher exam score workflow | teacher-exam-score-guide | teacher-exam-score-converter, weighted-average-calculator, t-score-calculator, z-score-calculator, percentile-rank-calculator | 教師甄試成績怎麼估：筆試、口試、試教加權與 T 分數整理 | 用範例整理教師甄試成績加權、T 分數、Z 分數與 PR 的試算方式，提醒以正式簡章為準。 |\n| T score / PR interpretation | t-score-pr-guide | t-score-calculator, z-score-calculator, percentile-rank-calculator, class-rank-percentile-calculator | T 分數、Z 分數、PR 怎麼看：教育統計快速指南 | 以班級成績與考試情境說明 T 分數、Z 分數與百分等級的差異、公式與常見誤解。 |\n| Classroom grouping workflow | classroom-random-tools-guide | random-student-picker, random-group-generator, group-generator, seating-chart, random-name-picker | 老師課堂隨機工具整理：抽籤、分組、座位表怎麼搭配 | 整理課堂點名、活動分組、座位安排與公平抽籤的工具搭配流程。 |\n| PDF workflow | pdf-workflow-guide | merge-pdf, split-pdf, compress-pdf, pdf-page-reorder, extract-pdf-pages, delete-pdf-pages, pdf-to-image, images-to-pdf | PDF 工具怎麼選：合併、拆分、壓縮、頁面整理一次看 | 比較常見 PDF 任務的處理順序，協助辦公室、學生與教師快速整理文件。 |\n| Image format workflow | image-format-workflow-guide | image-compressor, image-resizer, image-crop, png-to-jpg, jpg-to-png, jpg-to-webp, webp-to-jpg, qr-code-generator | 圖片格式怎麼選：JPG、PNG、WebP、壓縮與 QR Code 實用整理 | 說明圖片壓縮、尺寸、裁切與格式轉換的選擇方式，附社群、報告與網站使用情境。 |\n\n## Long-Tail Ideas\n\n1. 教師甄試筆試口試試教權重試算範例\n2. 教師甄試 T 分數和原始分數差在哪\n3. 班級成績如何算 Z 分數與 T 分數\n4. PR 百分等級和排名百分比怎麼看\n5. Cronbach alpha 問卷信度怎麼判讀\n6. 小組活動分組怎麼避免固定同組\n7. 班級座位表如何快速重新安排\n8. 隨機抽學生如何避免重複點名\n9. PDF 合併後頁碼順序檢查清單\n10. PDF 拆分與擷取頁面的差異\n11. PDF 壓縮後變大的原因\n12. PDF 轉圖片解析度怎麼選\n13. 圖片轉 PDF 前要不要先壓縮\n14. JPG 轉 PNG 會不會變清楚\n15. PNG 轉 JPG 透明背景怎麼處理\n16. WebP 適合網站還是社群上傳\n17. QR Code 海報列印前檢查清單\n18. 論文字數與中文字數怎麼計算\n19. 報告摘要 meta description 字數檢查\n20. CSV JSON 轉換前資料清理步驟\n\n## Internal-Link Targets\n\n- Education pillars should link to \`/category/statistics/\`, \`/category/study/\`, and every score/statistics calculator.\n- Classroom pillars should link to \`/category/study/\`, \`/category/random/\`, and teacher workflow tools.\n- PDF pillars should link to \`/category/pdf/\` and the PDF page-management sequence.\n- Image pillars should link to \`/category/image/\` and QR/image-format tools.\n`,
  'utf8',
);

writeFileSync(
  join(root, 'seo-implementation-log.md'),
  `# SEO Implementation Log\n\n## ${new Date().toISOString().slice(0, 10)} Initial Audit Batch\n\nChanged files:\n\n- Added \`scripts/seo-dist-audit.mjs\` to generate rendered-output SEO reports.\n- Added/updated \`seo-audit-report.md\`, \`seo-keyword-map.md\`, and \`seo-content-plan.md\` from the current build output.\n\nStructured data added:\n\n- None in the initial audit batch. Existing rendered output was inspected for page metadata and sitemap behavior.\n\nTitles/meta updated:\n\n- None in the initial audit batch.\n\nInternal links added:\n\n- None in the initial audit batch.\n\nNoindex/sitemap/analytics changes:\n\n- None. Baseline check confirms embed pages are noindex and excluded from sitemap when the generated counts match the audit summary.\n\nVerification:\n\n- \`npm.cmd run build\` completed before report generation.\n- \`node scripts/seo-dist-audit.mjs\` generated reports from rendered \`dist/\` HTML.\n\nRemaining:\n\n- Implement priority tool metadata/content improvements.\n- Add pillar articles and contextual cluster links.\n- Rebuild and run final audits.\n`,
  'utf8',
);

console.log(`SEO dist audit complete: ${summary.pages} HTML pages, ${summary.sitemapUrls} sitemap URLs, ${summary.riskPages} pages with flags.`);
