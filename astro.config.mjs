import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://funnytools.win',
  base: '/',
  output: 'static',
  trailingSlash: 'always',
  // Note: Astro's built-in prefetch is intentionally not enabled because it
  // injects its script into every page, including the script-free legacy
  // redirect pages. BaseLayout ships a lightweight hover-prefetch instead.
  build: {
    format: 'directory',
    // 內嵌所有樣式：消除阻塞渲染的 CSS 請求（SEO 流量多為首訪，
    // 慢速行動網路省 2+ RTT；CSP style-src 已含 'unsafe-inline'）
    inlineStylesheets: 'always',
  },
});
