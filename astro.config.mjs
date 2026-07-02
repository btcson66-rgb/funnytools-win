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
  },
});
