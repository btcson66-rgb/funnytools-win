import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const dist = join(root, 'dist');
const errors = [];
const warnings = [];

const read = (path) => readFileSync(path, 'utf8');
const text = (html) => html
  .replace(/<script[\s\S]*?<\/script>/gi, ' ')
  .replace(/<style[\s\S]*?<\/style>/gi, ' ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&(?:nbsp|amp|lt|gt|quot|#\d+);/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();
const match = (html, pattern) => html.match(pattern)?.[1]?.trim() ?? '';
const localFileForPath = (pathname) => {
  const decoded = decodeURIComponent(pathname);
  if (decoded === '/') return join(dist, 'index.html');
  const relative = decoded.replace(/^\//, '');
  return join(dist, relative.endsWith('/') ? relative : `${relative}/`, 'index.html');
};
const decodeXml = (value) => value
  .replace(/&amp;/g, '&')
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"')
  .replace(/&apos;/g, "'");
const locsFromXml = (xml) => [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((item) => decodeXml(item[1]));
const sitemapUrls = (xml) => {
  if (!/<sitemapindex\b/i.test(xml)) return locsFromXml(xml).map((item) => new URL(item));
  return locsFromXml(xml).flatMap((loc) => {
    const childPath = join(dist, new URL(loc).pathname.replace(/^\//, ''));
    if (!existsSync(childPath)) {
      errors.push(`Sitemap 子檔不存在：${new URL(loc).pathname}`);
      return [];
    }
    return locsFromXml(read(childPath)).map((item) => new URL(item));
  });
};
const htmlFilesUnder = (directory) => {
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return htmlFilesUnder(path);
    return entry.isFile() && entry.name.endsWith('.html') ? [path] : [];
  });
};

if (!existsSync(dist)) {
  errors.push('找不到 dist，請先執行 npm run build。');
}

const adsPath = join(dist, 'ads.txt');
if (!existsSync(adsPath)) {
  errors.push('缺少 dist/ads.txt。');
} else {
  const ads = read(adsPath).trim();
  const expected = 'google.com, pub-7052036786750044, DIRECT, f08c47fec0942fa0';
  if (ads !== expected) errors.push('ads.txt 的 Google 發布商資料不正確。');
}

const sitemapPath = join(dist, 'sitemap.xml');
if (!existsSync(sitemapPath)) {
  errors.push('缺少 sitemap.xml。');
} else {
  const sitemap = read(sitemapPath);
  const urls = sitemapUrls(sitemap);
  const internalLinkErrors = new Set();
  const titles = new Map();
  const descriptions = new Map();

  for (const url of urls) {
    const relative = url.pathname === '/'
      ? 'index.html'
      : join(url.pathname.replace(/^\//, ''), 'index.html');
    const file = join(dist, relative);

    if (!existsSync(file)) {
      errors.push(`Sitemap 頁面不存在：${url.pathname}`);
      continue;
    }

    const html = read(file);
    const markup = html
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ');
    const visible = text(match(html, /<main[^>]*>([\s\S]*?)<\/main>/i));
    const title = text(match(html, /<title[^>]*>([\s\S]*?)<\/title>/i));
    const description = match(html, /<meta\s+name="description"\s+content="([^"]*)"/i);
    const canonical = match(html, /<link\s+rel="canonical"\s+href="([^"]*)"/i);
    const h1Count = [...markup.matchAll(/<h1[\s>]/gi)].length;
    const headings = [...markup.matchAll(/<h([1-6])[\s>]/gi)].map((item) => Number(item[1]));
    const images = [...markup.matchAll(/<img\b[^>]*>/gi)].map((item) => item[0]);

    if (!title) errors.push(`缺少 title：${url.pathname}`);
    if (!description) errors.push(`缺少 meta description：${url.pathname}`);
    if (!canonical) errors.push(`缺少 canonical：${url.pathname}`);
    if (canonical && canonical !== url.href) errors.push(`canonical 不一致：${url.pathname} -> ${canonical}`);
    if ([...title].length > 65) errors.push(`title 超過 65 字元：${url.pathname} (${[...title].length})`);
    if ([...description].length < 70) errors.push(`meta description 少於 70 字元：${url.pathname} (${[...description].length})`);
    if ([...description].length > 165) errors.push(`meta description 超過 165 字元：${url.pathname} (${[...description].length})`);
    if (h1Count !== 1) errors.push(`H1 數量不是 1：${url.pathname} (${h1Count})`);
    if (headings.some((level, index) => index > 0 && level > headings[index - 1] + 1)) {
      errors.push(`標題層級跳級：${url.pathname}`);
    }
    if (images.some((image) => !/\salt=(?:"[^"]+"|'[^']+')/i.test(image))) {
      errors.push(`圖片缺少非空 alt：${url.pathname}`);
    }
    for (const required of ['og:title', 'og:description', 'og:url', 'og:image']) {
      if (!new RegExp(`<meta\\s+property="${required}"\\s+content="[^"]+"`, 'i').test(html)) {
        errors.push(`缺少 ${required}：${url.pathname}`);
      }
    }
    for (const required of ['twitter:card', 'twitter:title', 'twitter:description', 'twitter:image']) {
      if (!new RegExp(`<meta\\s+name="${required}"\\s+content="[^"]+"`, 'i').test(html)) {
        errors.push(`缺少 ${required}：${url.pathname}`);
      }
    }
    if (!/pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js/.test(html)) {
      errors.push(`缺少 AdSense 審核程式：${url.pathname}`);
    }
    if (/尚未完成|建置中|coming soon|under construction/i.test(visible)) {
      errors.push(`出現未完成內容：${url.pathname}`);
    }
    if (/<div\s+class="ad-slot"/i.test(html)) {
      errors.push(`審核期間出現可見廣告預留區：${url.pathname}`);
    }
    if (/^\/tools\/[^/]+\/$/.test(url.pathname) && visible.length < 700) {
      errors.push(`工具頁內容少於 700 字元：${url.pathname} (${visible.length})`);
    }
    if (/^\/en\/tools\/[^/]+\/$/.test(url.pathname)) {
      const wordCount = visible.match(/[A-Za-z0-9]+(?:['’-][A-Za-z0-9]+)*/g)?.length ?? 0;
      if (wordCount < 400) errors.push(`英文工具頁內容少於 400 詞：${url.pathname} (${wordCount})`);
    }
    if (/^\/(?:en\/)?category\//.test(url.pathname) && visible.length < 500) {
      errors.push(`分類頁內容少於 500 字元：${url.pathname} (${visible.length})`);
    }

    for (const hrefMatch of markup.matchAll(/<a\b[^>]*\shref=(?:"([^"]+)"|'([^']+)')[^>]*>/gi)) {
      const href = hrefMatch[1] ?? hrefMatch[2];
      if (!href || href.startsWith('#') || /^(?:mailto|tel|javascript|data):/i.test(href)) continue;
      try {
        const target = new URL(href, url);
        if (target.origin !== url.origin) continue;
        const targetFile = localFileForPath(target.pathname);
        if (!existsSync(targetFile)) internalLinkErrors.add(`${url.pathname} -> ${target.pathname}`);
      } catch {
        internalLinkErrors.add(`${url.pathname} -> ${href}`);
      }
    }

    const duplicates = titles.get(title) ?? [];
    duplicates.push(url.pathname);
    titles.set(title, duplicates);
    const duplicateDescriptions = descriptions.get(description) ?? [];
    duplicateDescriptions.push(url.pathname);
    descriptions.set(description, duplicateDescriptions);
  }

  for (const [title, paths] of titles) {
    if (title && paths.length > 1) errors.push(`重複 title「${title}」：${paths.join(', ')}`);
  }
  for (const [description, paths] of descriptions) {
    if (description && paths.length > 1) errors.push(`重複 description「${description}」：${paths.join(', ')}`);
  }
  for (const brokenLink of internalLinkErrors) errors.push(`內部死連結：${brokenLink}`);

  if (urls.length < 100) warnings.push(`Sitemap 只有 ${urls.length} 個 URL，請確認是否誤刪頁面。`);
  console.log(`已檢查 sitemap：${urls.length} 個可索引 URL`);
}

// Sitemap audits only see indexable URLs. Review every built noindex page too,
// including 404.html and retired routes, because those pages must not request ads.
for (const file of htmlFilesUnder(dist)) {
  const html = read(file);
  const isNoindex = /<meta\b[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html)
    || /<meta\b[^>]*content=["'][^"']*noindex[^"']*["'][^>]*name=["']robots["']/i.test(html);
  const loadsAdsense = /pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js|\badsbygoogle\b|data-ad-slot=/i.test(html);
  if (isNoindex && loadsAdsense) {
    errors.push(`noindex 頁仍載入 AdSense：${file.slice(dist.length).replaceAll('\\', '/')}`);
  }
}

const privacyPath = join(dist, 'privacy', 'index.html');
if (existsSync(privacyPath)) {
  const privacy = text(read(privacyPath));
  for (const required of ['已申請 Google AdSense', 'Cookie', '本機', '第三方服務', '個人化或非個人化廣告', '手動廣告版位仍維持關閉']) {
    if (!privacy.includes(required)) errors.push(`隱私權政策缺少必要揭露：${required}`);
  }
} else {
  errors.push('缺少繁體中文隱私權政策頁。');
}

for (const [path, minimumLength] of [['about', 500], ['contact', 450], ['disclaimer', 450]]) {
  const file = join(dist, path, 'index.html');
  if (!existsSync(file)) {
    errors.push(`缺少信任頁：/${path}/`);
    continue;
  }
  const visible = text(match(read(file), /<main[^>]*>([\s\S]*?)<\/main>/i));
  if (visible.length < minimumLength) errors.push(`信任頁內容過薄：/${path}/ (${visible.length})`);
}

for (const warning of warnings) console.warn(`警告：${warning}`);
if (errors.length) {
  for (const error of errors) console.error(`錯誤：${error}`);
  process.exitCode = 1;
} else {
  console.log('AdSense 申請前檢查通過。');
}
