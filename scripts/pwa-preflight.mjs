import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const dist = join(root, 'dist');
const failures = [];

const read = (path) => readFileSync(path, 'utf8');
const mustInclude = (label, source, expected) => {
  if (!source.includes(expected)) failures.push(`${label}: missing ${expected}`);
};
const mustMatch = (label, source, pattern) => {
  if (!pattern.test(source)) failures.push(`${label}: missing ${pattern}`);
};
const mustNotMatch = (label, source, pattern) => {
  if (pattern.test(source)) failures.push(`${label}: unexpected ${pattern}`);
};

if (!existsSync(dist)) {
  failures.push('dist missing; run npm.cmd run build first');
} else {
  const swPath = join(dist, 'sw.js');
  const manifestPath = join(dist, 'manifest.webmanifest');
  const installPromptPath = join(dist, 'install-prompt.js');

  if (!existsSync(swPath)) failures.push('dist/sw.js missing');
  if (!existsSync(manifestPath)) failures.push('dist/manifest.webmanifest missing');
  if (!existsSync(installPromptPath)) failures.push('dist/install-prompt.js missing');

  if (existsSync(swPath)) {
    const sw = read(swPath);
    mustInclude('service worker', sw, 'isGoogleAdOrAnalyticsRequest');
    mustInclude('service worker', sw, 'googlesyndication');
    mustInclude('service worker', sw, 'doubleclick');
    mustInclude('service worker', sw, 'adsbygoogle');
    mustInclude('service worker', sw, 'googletagmanager');
    mustInclude('service worker', sw, 'google-analytics');
    mustInclude('service worker', sw, 'Keep navigations network-first');
    mustNotMatch('service worker', sw, /isDocument\s*\|\|/);
    mustNotMatch('service worker', sw, /cache\.put\(request,\s*copy\)[\s\S]{0,160}return network\.catch/);
  }

  if (existsSync(manifestPath)) {
    const manifest = JSON.parse(read(manifestPath));
    if (manifest.start_url !== '/') failures.push(`manifest: start_url is ${manifest.start_url}`);
    if (manifest.scope !== '/') failures.push(`manifest: scope is ${manifest.scope}`);
    if (manifest.id !== '/') failures.push(`manifest: id is ${manifest.id}`);
    if (manifest.display !== 'standalone') failures.push(`manifest: display is ${manifest.display}`);
  }

  if (existsSync(installPromptPath)) {
    const installPrompt = read(installPromptPath);
    mustInclude('install prompt', installPrompt, "navigator.serviceWorker.register('/sw.js')");
    mustInclude('install prompt', installPrompt, 'dataset.offline');
  }

  const cssPath = join(dist, '_astro');
  if (existsSync(cssPath)) {
    const css = readdirSync(cssPath)
      .filter((name) => name.endsWith('.css'))
      .map((name) => read(join(cssPath, name)))
      .join('\n');
    mustMatch('built css', css, /\[data-offline=(?:"true"|'true'|true)\]\s*\.ad-slot/);
  }

  const homePath = join(dist, 'index.html');
  if (existsSync(homePath)) {
    const home = read(homePath);
    mustInclude('home page', home, 'manifest.webmanifest');
    mustInclude('home page', home, 'install-prompt.js');
    mustInclude('home page', home, 'googletagmanager.com/gtag/js');
    mustInclude('home page', home, "gtag('config'");
    mustInclude('home page', home, 'pagead2.googlesyndication.com/pagead/js/adsbygoogle.js');
  }
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log('PWA audit passed: manifest install scope, SW ad/analytics bypass, network-first navigations, offline ad hiding, and GA4/AdSense tags verified.');
