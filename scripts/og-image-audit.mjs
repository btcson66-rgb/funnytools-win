import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const publicDir = `${root}/public`;
const distDir = `${root}/dist`;
const sitemapFiles = ['sitemap-en.xml', 'sitemap-es.xml', 'sitemap-fr.xml', 'sitemap-guides.xml', 'sitemap-tools.xml', 'sitemap-workflows.xml', 'sitemap.xml'];
const routes = new Set();
for (const file of sitemapFiles) {
  const xml = await readFile(`${publicDir}/${file}`, 'utf8');
  for (const match of xml.matchAll(/<loc>https:\/\/funnytools\.win([^<]+)<\/loc>/g)) {
    const path = match[1];
    if (!path.includes('sitemap')) routes.add(path);
  }
}

const failures = [];
const imageCounts = new Map();
const imageHashes = new Set();
const dimensions = new Map();

function routeFile(route) {
  return join(distDir, route.replace(/^\/+/, ''), route.endsWith('/') ? 'index.html' : '');
}

function pngMetadata(buffer) {
  if (buffer.length < 24 || buffer.toString('ascii', 1, 4) !== 'PNG') return null;
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}

for (const route of routes) {
  const htmlPath = routeFile(route);
  if (!existsSync(htmlPath)) {
    failures.push(`${route}: missing built HTML`);
    continue;
  }
  const html = await readFile(htmlPath, 'utf8');
  const og = html.match(/<meta property="og:image" content="([^"]+)"/i)?.[1];
  const twitter = html.match(/<meta name="twitter:image" content="([^"]+)"/i)?.[1];
  const ogAlt = html.match(/<meta property="og:image:alt" content="([^"]+)"/i)?.[1];
  const twitterAlt = html.match(/<meta name="twitter:image:alt" content="([^"]+)"/i)?.[1];
  if (!og || !twitter) {
    failures.push(`${route}: missing OG/Twitter image`);
    continue;
  }
  if (og !== twitter) failures.push(`${route}: OG/Twitter image mismatch`);
  if (!ogAlt || !twitterAlt) failures.push(`${route}: missing OG/Twitter image alt`);
  else if (ogAlt !== twitterAlt) failures.push(`${route}: OG/Twitter image alt mismatch`);
  const declaredWidth = html.match(/<meta property="og:image:width" content="(\d+)"/i)?.[1];
  const declaredHeight = html.match(/<meta property="og:image:height" content="(\d+)"/i)?.[1];
  if (declaredWidth !== '1200' || declaredHeight !== '630') failures.push(`${route}: OG metadata must declare 1200x630`);
  imageCounts.set(og, (imageCounts.get(og) ?? 0) + 1);
  const pathname = new URL(og).pathname;
  const assetPath = join(publicDir, pathname.replace(/^\/+/, ''));
  if (!existsSync(assetPath)) {
    failures.push(`${route}: image asset missing (${pathname})`);
    continue;
  }
  const bytes = await readFile(assetPath);
  const meta = pngMetadata(bytes);
  if (!meta || meta.width !== 1200 || meta.height !== 630) {
    failures.push(`${route}: image must be a 1200x630 PNG (${pathname})`);
    continue;
  }
  dimensions.set(`${meta.width}x${meta.height}`, (dimensions.get(`${meta.width}x${meta.height}`) ?? 0) + 1);
  imageHashes.add(createHash('sha256').update(bytes).digest('hex'));
}

const toolRoutes = [...routes].filter((route) => /^\/(?:en\/)?tools\/[^/]+\//.test(route));
const defaultToolRoutes = [];
for (const route of toolRoutes) {
  const htmlPath = routeFile(route);
  if (existsSync(htmlPath) && /<meta property="og:image" content="https:\/\/funnytools\.win\/og-default\.png"/i.test(await readFile(htmlPath, 'utf8'))) {
    defaultToolRoutes.push(route);
  }
}
if (imageHashes.size < 2) failures.push('All indexable routes resolve to one image hash.');
if (defaultToolRoutes.length > 0) failures.push(`Tool routes still use the generic OG image: ${defaultToolRoutes.length}`);

console.log(JSON.stringify({
  routes: routes.size,
  toolRoutes: toolRoutes.length,
  uniqueImageUrls: imageCounts.size,
  uniqueImageHashes: imageHashes.size,
  dimensions: Object.fromEntries(dimensions),
  imageCounts: Object.fromEntries(imageCounts),
  failures,
}, null, 2));

if (failures.length) process.exit(1);
