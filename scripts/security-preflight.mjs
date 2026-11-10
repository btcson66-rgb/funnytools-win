import { readFile, readdir, stat } from 'node:fs/promises';
import { join, relative, resolve, sep } from 'node:path';

const distDir = resolve('dist');
const failures = [];

async function filesIn(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? filesIn(path) : [path];
  }));
  return files.flat();
}

async function requireFile(path) {
  try {
    if (!(await stat(path)).isFile()) throw new Error('not a file');
  } catch {
    failures.push(`missing required file: ${relative(distDir, path)}`);
  }
}

const requiredAssets = [
  'favicon.svg',
  'favicon.ico',
  'apple-touch-icon.png',
  'apple-touch-icon-precomposed.png',
  'apple-touch-icon-120x120.png',
  'apple-touch-icon-120x120-precomposed.png',
];
await Promise.all(requiredAssets.map((name) => requireFile(join(distDir, name))));

const pngSignature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
for (const icon of requiredAssets.filter((name) => name.endsWith('.png') || name.endsWith('.ico'))) {
  const content = await readFile(join(distDir, icon));
  if (!content.subarray(0, pngSignature.length).equals(pngSignature)) {
    failures.push(`${icon}: expected a valid PNG-compatible icon`);
  }
}

const files = await filesIn(distDir);
const htmlFiles = files.filter((file) => file.endsWith('.html'));
const forbiddenOutput = files
  .map((file) => relative(distDir, file).split(sep).join('/'))
  .filter((file) => /(^|\/)(\.env(?:\.|$)|cloudflare api\.txt$|threads api\.txt$)/i.test(file));
for (const file of forbiddenOutput) failures.push(`forbidden sensitive output: ${file}`);

let pagesWithCsp = 0;
let redirectOnlyPages = 0;
for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const match = html.match(/<meta http-equiv="Content-Security-Policy" content="([^"]+)">/i);
  if (!match) {
    const isRedirectOnly = /<meta http-equiv="refresh"/i.test(html) && !/<script\b/i.test(html);
    if (isRedirectOnly) {
      redirectOnlyPages += 1;
      continue;
    }
    failures.push(`${relative(distDir, file)}: missing CSP meta policy and is not a script-free redirect`);
    continue;
  }
  pagesWithCsp += 1;
  for (const directive of ["object-src 'none'", "base-uri 'self'", "form-action 'self'"]) {
    if (!match[1].includes(directive)) failures.push(`${relative(distDir, file)}: CSP missing ${directive}`);
  }
  // Pages that load the AdSense loader also get Google Funding Choices (EEA/UK/CH consent
  // messages), which needs script-src, frame-src and connect-src on its own origin.
  if (html.includes('pagead2.googlesyndication.com/pagead/js/adsbygoogle.js')) {
    for (const directive of ['script-src', 'frame-src', 'connect-src']) {
      const value = match[1].split(';').map((part) => part.trim()).find((part) => part.startsWith(`${directive} `)) ?? '';
      if (!value.split(/\s+/).includes('https://fundingchoicesmessages.google.com')) {
        failures.push(`${relative(distDir, file)}: AdSense page CSP ${directive} missing https://fundingchoicesmessages.google.com`);
      }
    }
  }
  if (match[1].includes("'unsafe-eval'")) failures.push(`${relative(distDir, file)}: CSP allows unsafe-eval`);
}

if (failures.length > 0) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log(`Security audit passed: 4 compatibility icon aliases, ${pagesWithCsp} HTML pages with CSP, ${redirectOnlyPages} script-free redirects, 0 sensitive output files.`);
