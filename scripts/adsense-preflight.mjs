import { readFileSync, existsSync } from 'node:fs';
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
  const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((item) => new URL(item[1]));
  const titles = new Map();

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
    const visible = text(match(html, /<main[^>]*>([\s\S]*?)<\/main>/i));
    const title = text(match(html, /<title[^>]*>([\s\S]*?)<\/title>/i));
    const description = match(html, /<meta\s+name="description"\s+content="([^"]*)"/i);
    const canonical = match(html, /<link\s+rel="canonical"\s+href="([^"]*)"/i);

    if (!title) errors.push(`缺少 title：${url.pathname}`);
    if (!description) errors.push(`缺少 meta description：${url.pathname}`);
    if (!canonical) errors.push(`缺少 canonical：${url.pathname}`);
    if (!/<h1[\s>]/i.test(html)) errors.push(`缺少 H1：${url.pathname}`);
    if (!/pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js/.test(html)) {
      errors.push(`缺少 AdSense 審核程式：${url.pathname}`);
    }
    if (/尚未完成|建置中|coming soon|under construction/i.test(visible)) {
      errors.push(`出現未完成內容：${url.pathname}`);
    }
    if (/^\/tools\/[^/]+\/$/.test(url.pathname) && visible.length < 700) {
      errors.push(`工具頁內容少於 700 字元：${url.pathname} (${visible.length})`);
    }
    if (/^\/(?:en\/)?category\//.test(url.pathname) && visible.length < 500) {
      errors.push(`分類頁內容少於 500 字元：${url.pathname} (${visible.length})`);
    }

    const duplicates = titles.get(title) ?? [];
    duplicates.push(url.pathname);
    titles.set(title, duplicates);
  }

  for (const [title, paths] of titles) {
    if (title && paths.length > 1) errors.push(`重複 title「${title}」：${paths.join(', ')}`);
  }

  if (urls.length < 100) warnings.push(`Sitemap 只有 ${urls.length} 個 URL，請確認是否誤刪頁面。`);
  console.log(`已檢查 sitemap：${urls.length} 個可索引 URL`);
}

const privacyPath = join(dist, 'privacy', 'index.html');
if (existsSync(privacyPath)) {
  const privacy = text(read(privacyPath));
  for (const required of ['已申請 Google AdSense', 'Cookie', '本機', '第三方服務']) {
    if (!privacy.includes(required)) errors.push(`隱私權政策缺少必要揭露：${required}`);
  }
} else {
  errors.push('缺少繁體中文隱私權政策頁。');
}

for (const warning of warnings) console.warn(`警告：${warning}`);
if (errors.length) {
  for (const error of errors) console.error(`錯誤：${error}`);
  process.exitCode = 1;
} else {
  console.log('AdSense 申請前檢查通過。');
}
