import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = process.cwd();
const distDir = join(root, 'dist');
const seoDir = join(root, 'seo-system');
const reportsDir = join(seoDir, 'reports');
const gscDir = join(seoDir, 'gsc');
const keywordsPath = join(seoDir, 'keywords', 'tools-keywords.json');
const expansionRoutesPath = join(root, 'src', 'i18n', 'expansion-routes.json');

mkdirSync(reportsDir, { recursive: true });

function walk(dir, predicate, output = []) {
  if (!existsSync(dir)) return output;
  for (const entry of readdirSync(dir)) {
    if (['node_modules', '.git', '.astro', 'backup'].includes(entry)) continue;
    const full = join(dir, entry);
    const stats = statSync(full);
    if (stats.isDirectory()) {
      walk(full, predicate, output);
    } else if (predicate(full)) {
      output.push(full);
    }
  }
  return output;
}

function stripTags(value) {
  return value.replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function hasMojibake(value) {
  return /\?{3,}|�|銝|嚗|摰|餈|鈭|蝣|瘙|撱|�/.test(value);
}

function attr(tag, name) {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = tag.match(new RegExp(`${escaped}\\s*=\\s*["']([^"']*)["']`, 'i'));
  return match?.[1]?.trim() || '';
}

function markdownList(items) {
  return items.length ? items.map((item) => `- ${item}`).join('\n') : '- None';
}

function decodeXml(value) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");
}

function sitemapLocsFromDist() {
  const indexPath = join(distDir, 'sitemap.xml');
  if (!existsSync(indexPath)) return [];

  const sitemap = readFileSync(indexPath, 'utf8');
  if (!/<sitemapindex\b/i.test(sitemap)) {
    return [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => decodeXml(m[1]));
  }

  const childLocs = [...sitemap.matchAll(/<sitemap>[\s\S]*?<loc>(.*?)<\/loc>[\s\S]*?<\/sitemap>/g)].map((m) => decodeXml(m[1]));
  return childLocs.flatMap((loc) => {
    let parsed;
    try {
      parsed = new URL(loc);
    } catch {
      return [];
    }
    if (parsed.hostname !== 'funnytools.win') return [];
    const childPath = join(distDir, parsed.pathname.replace(/^\/+/, ''));
    if (!existsSync(childPath)) return [];
    const child = readFileSync(childPath, 'utf8');
    return [...child.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => decodeXml(m[1]));
  });
}

function routeFromFile(file) {
  const rel = relative(distDir, file).replaceAll('\\', '/');
  if (rel.endsWith('/index.html')) return `/${rel.slice(0, -'index.html'.length)}`;
  if (rel === 'index.html') return '/';
  return `/${rel.replace(/\.html$/, '/')}`;
}

function parseHtml(file) {
  const html = readFileSync(file, 'utf8');
  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim() || '';
  const metas = [...html.matchAll(/<meta\b[^>]*>/gi)].map((m) => m[0]);
  const description = metas.find((tag) => attr(tag, 'name').toLowerCase() === 'description');
  const robotsMeta = metas.find((tag) => attr(tag, 'name').toLowerCase() === 'robots');
  const canonical = [...html.matchAll(/<link\b[^>]*>/gi)].map((m) => m[0]).find((tag) => attr(tag, 'rel').toLowerCase() === 'canonical');
  const hreflangs = [...html.matchAll(/<link\b[^>]*>/gi)]
    .map((m) => m[0])
    .filter((tag) => attr(tag, 'rel').toLowerCase() === 'alternate' && attr(tag, 'hreflang'));
  const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) => stripTags(m[1]));
  const anchors = [...html.matchAll(/<a\b[^>]*>/gi)].map((m) => attr(m[0], 'href')).filter(Boolean);
  const internalLinks = anchors.filter((href) => href.startsWith('/') && !href.startsWith('//'));
  const images = [...html.matchAll(/<img\b[^>]*>/gi)].map((m) => m[0]);
  const missingAlt = images.filter((tag) => !attr(tag, 'alt')).length;
  const jsonLd = [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)]
    .map((m) => {
      try {
        return JSON.parse(m[1]);
      } catch {
        return { parseError: true, raw: m[1].slice(0, 80) };
      }
    });
  const schemaTypes = jsonLd.map((item) => item['@type'] || 'Unknown');
  const visibleText = stripTags(html);
  const wordCount = visibleText.match(/[\p{Script=Han}]|\b[\p{L}\p{N}][\p{L}\p{N}'-]*\b/gu)?.length || 0;
  const hasVisibleFaq = /<dt\b|class=["'][^"']*faq|id=["']faq/i.test(html);
  const hasFaqSchema = schemaTypes.includes('FAQPage');

  return {
    file,
    route: routeFromFile(file),
    title,
    description: description ? attr(description, 'content') : '',
    robots: robotsMeta ? attr(robotsMeta, 'content') : '',
    canonical: canonical ? attr(canonical, 'href') : '',
    hreflangs: hreflangs.map((tag) => attr(tag, 'hreflang')),
    h1s,
    internalLinks,
    images: images.length,
    missingAlt,
    jsonLd,
    schemaTypes,
    wordCount,
    hasVisibleFaq,
    hasFaqSchema,
  };
}

function isSeoEligible(page) {
  if (page.route === '/404/') return false;
  if (page.route.includes('/embed/')) return false;
  if (page.route.startsWith('/zh/')) return false;
  if (/\bnoindex\b/i.test(page.robots)) return false;
  return true;
}

function readKeywords() {
  if (!existsSync(keywordsPath)) return { tools: [] };
  return JSON.parse(readFileSync(keywordsPath, 'utf8'));
}

function readExpansionRoutes() {
  if (!existsSync(expansionRoutesPath)) return [];
  return JSON.parse(readFileSync(expansionRoutesPath, 'utf8')).routes ?? [];
}

const expansionRoutes = readExpansionRoutes();
const expansionRouteByPath = new Map(
  expansionRoutes.flatMap((route) => Object.values(route.paths ?? {})
    .filter(Boolean)
    .map((pathname) => [pathname.endsWith('/') ? pathname : `${pathname}/`, route])),
);
const hreflangByLocale = { zh: 'zh-TW', en: 'en', es: 'es', fr: 'fr', de: 'de', hi: 'hi' };

function expectedHreflangs(route) {
  const registered = expansionRouteByPath.get(route);
  if (!registered) return ['zh-TW', 'en', 'x-default'];
  const missing = new Set(registered.missingLocales ?? []);
  const locales = Object.entries(registered.paths ?? {})
    .filter(([locale, pathname]) => Boolean(pathname) && !missing.has(locale))
    .map(([locale]) => hreflangByLocale[locale])
    .filter(Boolean);
  return registered.paths?.en || registered.paths?.zh || locales.length ? [...locales, 'x-default'] : locales;
}

function auditPages(pages) {
  const critical = [];
  const warning = [];
  const suggestion = [];
  const eligiblePages = pages.filter(isSeoEligible);
  const titleMap = new Map();
  const metaMap = new Map();

  for (const page of eligiblePages) {
    if (!page.title) critical.push(`${page.route}: missing <title>.`);
    if (!page.description) critical.push(`${page.route}: missing meta description.`);
    if (page.h1s.length !== 1) critical.push(`${page.route}: expected exactly one H1, found ${page.h1s.length}.`);
    if (!page.canonical) critical.push(`${page.route}: missing canonical.`);
    if (hasMojibake(`${page.title} ${page.description} ${page.h1s.join(' ')} ${stripTags(readFileSync(page.file, 'utf8'))}`)) {
      critical.push(`${page.route}: rendered text appears to contain mojibake or placeholder corruption.`);
    }
    if (!page.jsonLd.length) warning.push(`${page.route}: no JSON-LD schema detected.`);
    if (page.hasFaqSchema && !page.hasVisibleFaq) critical.push(`${page.route}: FAQPage schema exists but visible FAQ was not detected.`);
    if (page.missingAlt > 0) warning.push(`${page.route}: ${page.missingAlt} image(s) missing alt text.`);
    if (page.internalLinks.length < 3) warning.push(`${page.route}: only ${page.internalLinks.length} internal link(s).`);
    if (page.wordCount < 250) warning.push(`${page.route}: low visible text count (${page.wordCount}). Check for thin content or redirect stubs.`);
    if (page.hreflangs.length > 0) {
      for (const required of expectedHreflangs(page.route)) {
        if (!page.hreflangs.includes(required)) warning.push(`${page.route}: hreflang missing ${required}.`);
      }
    }
    if (page.schemaTypes.includes('Unknown')) warning.push(`${page.route}: JSON-LD item missing @type.`);
    if (page.jsonLd.some((item) => item.parseError)) critical.push(`${page.route}: invalid JSON-LD parse error.`);

    if (page.title) titleMap.set(page.title, [...(titleMap.get(page.title) || []), page.route]);
    if (page.description) metaMap.set(page.description, [...(metaMap.get(page.description) || []), page.route]);
  }

  for (const [title, routes] of titleMap) {
    if (routes.length > 1) warning.push(`Duplicate title "${title}": ${routes.join(', ')}`);
  }
  for (const [description, routes] of metaMap) {
    if (routes.length > 1) warning.push(`Duplicate meta description "${description.slice(0, 90)}...": ${routes.join(', ')}`);
  }

  const toolPages = eligiblePages.filter((page) => /\/tools\/[^/]+\/$/.test(page.route));
  const faqToolPages = toolPages.filter((page) => page.hasVisibleFaq).length;
  const schemaToolPages = toolPages.filter((page) => page.schemaTypes.some((type) => ['WebApplication', 'SoftwareApplication'].includes(type))).length;
  suggestion.push(`Scanned ${pages.length} HTML page(s); ${eligiblePages.length} page(s) treated as SEO-eligible, including ${toolPages.length} tool page(s).`);
  suggestion.push(`${faqToolPages}/${toolPages.length} tool page(s) have visible FAQ detected.`);
  suggestion.push(`${schemaToolPages}/${toolPages.length} tool page(s) have WebApplication or SoftwareApplication schema.`);

  return { critical, warning, suggestion };
}

function internalLinkReport(pages, keywords) {
  const critical = [];
  const warning = [];
  const suggestion = [];
  const eligiblePages = pages.filter(isSeoEligible);
  const routeSet = new Set(eligiblePages.map((page) => page.route));
  const inbound = new Map(eligiblePages.map((page) => [page.route, 0]));
  const repeated = [];

  for (const page of eligiblePages) {
    const counts = new Map();
    for (const href of page.internalLinks) {
      const clean = href.split('#')[0].split('?')[0];
      if (inbound.has(clean)) inbound.set(clean, inbound.get(clean) + 1);
      counts.set(clean, (counts.get(clean) || 0) + 1);
      if (clean && clean !== '/' && !routeSet.has(clean) && !clean.includes('.')) {
        warning.push(`${page.route}: internal link target not found in dist: ${clean}`);
      }
    }
    for (const [target, count] of counts) {
      if (count > 8) repeated.push(`${page.route}: ${target} linked ${count} times.`);
    }
  }

  const orphanPages = [...inbound.entries()]
    .filter(([route, count]) => count === 0 && route !== '/' && !route.startsWith('/zh/'))
    .map(([route]) => route);
  const lowInternal = eligiblePages.filter((page) => page.internalLinks.length < 3).map((page) => `${page.route} (${page.internalLinks.length})`);

  const priorityTools = keywords.tools || [];
  for (const item of priorityTools) {
    const route = `/tools/${item.tool_id}/`;
    const page = eligiblePages.find((candidate) => candidate.route === route);
    if (!page) {
      warning.push(`${item.tool_id}: priority keyword has no matching built route at ${route}.`);
      continue;
    }
    const relatedCount = item.related_tools.filter((slug) => page.internalLinks.includes(`/tools/${slug}/`)).length;
    if (relatedCount < 5) warning.push(`${route}: only ${relatedCount}/5 keyword-defined related tools linked in built HTML.`);
  }

  if (orphanPages.length) warning.push(`Potential orphan pages: ${orphanPages.slice(0, 50).join(', ')}${orphanPages.length > 50 ? '...' : ''}`);
  if (lowInternal.length) warning.push(`Pages with fewer than 3 internal links: ${lowInternal.slice(0, 50).join(', ')}${lowInternal.length > 50 ? '...' : ''}`);
  if (repeated.length) suggestion.push(`Over-repeated same-page links: ${repeated.slice(0, 50).join('; ')}${repeated.length > 50 ? '...' : ''}`);
  suggestion.push(`Inbound link map covers ${inbound.size} route(s).`);

  return { critical, warning, suggestion };
}

function technicalReport(pages) {
  const critical = [];
  const warning = [];
  const suggestion = [];
  const eligiblePages = pages.filter(isSeoEligible);
  const robotsPath = join(root, 'public', 'robots.txt');
  const sitemapPath = join(distDir, 'sitemap.xml');

  if (!existsSync(robotsPath)) {
    critical.push('public/robots.txt is missing.');
  } else {
    const robots = readFileSync(robotsPath, 'utf8');
    if (!/User-agent:\s*\*/i.test(robots)) warning.push('robots.txt does not include User-agent: *.');
    if (!/Allow:\s*\//i.test(robots)) warning.push('robots.txt does not explicitly allow /.');
    if (!/Sitemap:\s*https:\/\/funnytools\.win\/sitemap\.xml/i.test(robots)) critical.push('robots.txt missing expected Sitemap: https://funnytools.win/sitemap.xml');
  }

  if (!existsSync(sitemapPath)) {
    critical.push('dist/sitemap.xml is missing. Run npm.cmd run build first.');
  } else {
    const locs = sitemapLocsFromDist();
    const locSet = new Set(locs.map((loc) => new URL(loc).pathname));
    for (const page of eligiblePages) {
      if (!page.route.startsWith('/zh/') && !locSet.has(page.route)) {
        warning.push(`${page.route}: route not found in sitemap loc entries.`);
      }
      if (page.canonical) {
        const canonicalPath = new URL(page.canonical).pathname;
        if (canonicalPath !== page.route && !page.route.startsWith('/zh/')) {
          warning.push(`${page.route}: canonical points to ${canonicalPath}.`);
        }
      }
    }
    suggestion.push(`Sitemap contains ${locs.length} URL(s).`);
  }

  const localized = eligiblePages.filter((page) => !page.route.startsWith('/blog/') && !page.route.startsWith('/support/'));
  const missingAlternates = localized.filter((page) => page.hreflangs.length > 0 && !expectedHreflangs(page.route).every((lang) => page.hreflangs.includes(lang)));
  if (missingAlternates.length) warning.push(`${missingAlternates.length} localized page(s) have incomplete hreflang sets.`);
  suggestion.push(`Canonical present on ${eligiblePages.filter((page) => page.canonical).length}/${eligiblePages.length} SEO-eligible page(s).`);

  return { critical, warning, suggestion };
}

function schemaReport(pages) {
  const critical = [];
  const warning = [];
  const suggestion = [];
  const eligiblePages = pages.filter(isSeoEligible);

  const home = eligiblePages.find((page) => page.route === '/');
  if (home) {
    for (const type of ['WebSite', 'Organization']) {
      if (!home.schemaTypes.includes(type)) critical.push(`Homepage missing ${type} JSON-LD.`);
    }
    const website = home.jsonLd.find((item) => item['@type'] === 'WebSite');
    if (!website?.potentialAction || website.potentialAction['@type'] !== 'SearchAction') {
      critical.push('Homepage WebSite schema missing SearchAction.');
    }
  }

  for (const page of eligiblePages) {
    const isTool = /\/tools\/[^/]+\/$/.test(page.route);
    const isCategory = /\/category\/[^/]+\/$/.test(page.route);
    const isArticle = /\/blog\/[^/]+\/$/.test(page.route);
    if (isTool) {
      if (!page.schemaTypes.some((type) => ['WebApplication', 'SoftwareApplication'].includes(type))) warning.push(`${page.route}: tool page missing WebApplication/SoftwareApplication schema.`);
      if (!page.schemaTypes.includes('BreadcrumbList')) warning.push(`${page.route}: tool page missing BreadcrumbList.`);
      if (page.hasVisibleFaq && !page.schemaTypes.includes('FAQPage')) warning.push(`${page.route}: visible FAQ without FAQPage schema.`);
    }
    if (isCategory) {
      if (!page.schemaTypes.includes('CollectionPage')) warning.push(`${page.route}: category page missing CollectionPage.`);
      if (!page.schemaTypes.includes('BreadcrumbList')) warning.push(`${page.route}: category page missing BreadcrumbList.`);
    }
    if (isArticle) {
      if (!page.schemaTypes.some((type) => ['Article', 'BlogPosting'].includes(type))) warning.push(`${page.route}: article page missing Article/BlogPosting.`);
      if (!page.schemaTypes.includes('BreadcrumbList')) warning.push(`${page.route}: article page missing BreadcrumbList.`);
      if (page.hasVisibleFaq && !page.schemaTypes.includes('FAQPage')) warning.push(`${page.route}: article visible FAQ without FAQPage schema.`);
    }
  }

  suggestion.push(`Parsed ${pages.reduce((sum, page) => sum + page.jsonLd.length, 0)} JSON-LD block(s).`);
  return { critical, warning, suggestion };
}

function parseCsvLine(line) {
  const result = [];
  let current = '';
  let quoted = false;
  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    if (char === '"' && line[i + 1] === '"') {
      current += '"';
      i += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === ',' && !quoted) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current);
  return result.map((value) => value.trim());
}

function readGscRows() {
  const files = walk(gscDir, (file) => file.toLowerCase().endsWith('.csv'));
  const rows = [];
  for (const file of files) {
    const lines = readFileSync(file, 'utf8').split(/\r?\n/).filter((line) => line.trim());
    if (lines.length < 2) continue;
    const headers = parseCsvLine(lines[0]).map((header) => header.toLowerCase());
    for (const line of lines.slice(1)) {
      const values = parseCsvLine(line);
      const row = Object.fromEntries(headers.map((header, index) => [header, values[index] ?? '']));
      rows.push({
        query: row.query || row.queries || '',
        page: row.page || row.pages || '',
        clicks: Number(row.clicks || 0),
        impressions: Number(row.impressions || 0),
        ctr: Number(String(row.ctr || '0').replace('%', '')) / (String(row.ctr || '').includes('%') ? 100 : 1),
        position: Number(row.position || 0),
      });
    }
  }
  return rows;
}

function gscActionPlan(rows, pages, keywords) {
  const actions = [];
  if (!rows.length) {
    return ['No Search Console CSV rows found. Export query/page data into seo-system/gsc/ with columns query,page,clicks,impressions,ctr,position.'];
  }

  const routes = new Set(pages.map((page) => page.route));
  const keywordTexts = (keywords.tools || []).flatMap((tool) => [
    tool.main_keyword_zh,
    ...(tool.secondary_keywords_zh || []),
    ...(tool.article_ideas || []),
  ]);

  for (const row of rows) {
    const path = row.page ? new URL(row.page, 'https://funnytools.win').pathname : '';
    if (row.impressions >= 100 && row.ctr < 0.02) {
      actions.push(`High impressions / low CTR: "${row.query}" on ${path || row.page} (${row.impressions} impressions, ${(row.ctr * 100).toFixed(1)}% CTR). Review title/meta.`);
    }
    if (row.position >= 8 && row.position <= 20) {
      actions.push(`Position 8-20 opportunity: "${row.query}" on ${path || row.page} (avg ${row.position.toFixed(1)}). Add useful content depth and internal links.`);
    }
    if (row.impressions > 0 && row.clicks === 0) {
      actions.push(`Impressions but no clicks: "${row.query}" on ${path || row.page}. Improve title and first paragraph relevance.`);
    }
    const hasMatchingRoute = path && routes.has(path);
    const hasKeywordMatch = keywordTexts.some((text) => text && row.query && text.includes(row.query));
    if (!hasMatchingRoute && !hasKeywordMatch && row.impressions >= 20) {
      actions.push(`Query without clear page: "${row.query}" (${row.impressions} impressions). Consider a reviewed article draft before publishing.`);
    }
  }
  return [...new Set(actions)].slice(0, 200);
}

function articlePlanReport(keywords) {
  const tools = keywords.tools || [];
  const lines = [
    '# Long-Tail Article Draft Plan',
    '',
    `Generated: ${new Date().toISOString()}`,
    '',
    'Status: draft planning only. Do not publish until human_reviewed=true and the quality gate passes.',
    '',
  ];

  for (const tool of tools) {
    lines.push(`## ${tool.tool_name_zh} (${tool.tool_id})`, '');
    const ideas = tool.article_ideas || [];
    ideas.forEach((idea, index) => {
      const articleType = index === ideas.length - 1 ? '比較 / 情境文章' : '長尾教學文章';
      const primaryRelated = tool.related_tools?.[0] || '';
      const secondaryRelated = tool.related_tools?.[1] || '';
      lines.push(`### ${index + 1}. ${idea}`);
      lines.push('');
      lines.push(`- 類型：${articleType}`);
      lines.push(`- 明確 H1：${idea}`);
      lines.push(`- 快速答案：先釐清任務目標與限制，再使用「${tool.tool_name_zh}」完成核心處理；若牽涉檔案、金額或正式資料，完成後必須人工檢查結果。`);
      lines.push(`- 詳細步驟：1. 確認搜尋意圖：${tool.search_intents_zh?.[0] || tool.main_keyword_zh}。2. 準備輸入資料並排除私人或不必要內容。3. 開啟 /tools/${tool.tool_id}/ 完成處理。4. 下載、複製或記錄結果。5. 依情境用相關工具交叉檢查。`);
      lines.push(`- 對應工具 CTA：/tools/${tool.tool_id}/`);
      lines.push(`- 分類內連：/category/${tool.category}/`);
      lines.push(`- 相關工具內連：${[primaryRelated, secondaryRelated].filter(Boolean).map((slug) => `/tools/${slug}/`).join(', ')}`);
      lines.push(`- 常見錯誤：只看結果不檢查輸入；忽略檔案大小、格式或單位限制；把估算或工具輸出當成正式審核結果。`);
      lines.push(`- FAQ 草稿：${(tool.faq_questions || []).slice(0, 5).join('；')}`);
      lines.push('- human_reviewed: false');
      lines.push('');
    });
  }

  return lines.join('\n');
}

function writeReport(name, title, sections) {
  const body = [
    `# ${title}`,
    '',
    `Generated: ${new Date().toISOString()}`,
    '',
    ...sections.flatMap(([heading, items]) => [`## ${heading}`, '', markdownList(items), '']),
  ].join('\n');
  writeFileSync(join(reportsDir, name), body, 'utf8');
}

const htmlFiles = walk(distDir, (file) => file.endsWith('.html'));
const markdownFiles = walk(root, (file) => file.endsWith('.md') && !file.includes(`${join(root, 'seo-system', 'reports')}`));
const pages = htmlFiles.map(parseHtml);
const keywords = readKeywords();

const audit = auditPages(pages);
audit.suggestion.push(`Markdown/source documentation files discovered: ${markdownFiles.length}.`);
writeReport('seo-audit-report.md', 'SEO Audit Report', [
  ['Critical', audit.critical],
  ['Warning', audit.warning],
  ['Suggestion', audit.suggestion],
]);

const links = internalLinkReport(pages, keywords);
writeReport('internal-link-report.md', 'Internal Link Report', [
  ['Critical', links.critical],
  ['Warning', links.warning],
  ['Suggestion', links.suggestion],
]);

const technical = technicalReport(pages);
writeReport('technical-seo-report.md', 'Technical SEO Report', [
  ['Critical', technical.critical],
  ['Warning', technical.warning],
  ['Suggestion', technical.suggestion],
]);

const schema = schemaReport(pages);
writeReport('schema-validation-report.md', 'Schema Validation Report', [
  ['Critical', schema.critical],
  ['Warning', schema.warning],
  ['Suggestion', schema.suggestion],
]);

const gscRows = readGscRows();
writeReport('gsc-action-plan.md', 'GSC Action Plan', [
  ['Critical', []],
  ['Warning', gscActionPlan(gscRows, pages, keywords)],
  ['Suggestion', [`Imported ${gscRows.length} Search Console row(s).`]],
]);

writeFileSync(join(reportsDir, 'long-tail-article-plan.md'), articlePlanReport(keywords), 'utf8');

const summary = {
  pages: pages.length,
  markdownFiles: markdownFiles.length,
  keywordTools: keywords.tools?.length || 0,
  reportsDir: relative(root, reportsDir),
  critical: audit.critical.length + links.critical.length + technical.critical.length + schema.critical.length,
  warning: audit.warning.length + links.warning.length + technical.warning.length + schema.warning.length,
};

console.log(JSON.stringify(summary, null, 2));
