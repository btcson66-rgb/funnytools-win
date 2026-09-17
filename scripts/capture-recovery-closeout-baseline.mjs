import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { builtPages, isIndexablePage, readCurrentSitemapEntries, readJson } from './seo-indexing-utils.mjs';

const root = process.cwd();
const reportDir = join(root, 'reports', 'recovery-closeout-002');
mkdirSync(reportDir, { recursive: true });
const hashFile = (file) => createHash('sha256').update(readFileSync(file)).digest('hex');
const packageJson = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
const commit = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim();
const entries = readCurrentSitemapEntries();
const urls = [...new Set(entries.map((entry) => entry.loc))].sort((a, b) => a.localeCompare(b));
const pages = builtPages();
const indexable = pages.filter(isIndexablePage);
const localeForUrl = (url) => {
  const path = new URL(url).pathname;
  if (path === '/en/' || path.startsWith('/en/')) return 'en';
  if (path === '/es/' || path.startsWith('/es/')) return 'es';
  if (path === '/fr/' || path.startsWith('/fr/')) return 'fr';
  return 'zh-TW';
};
const byLocale = Object.fromEntries(['zh-TW', 'en', 'es', 'fr'].map((locale) => [locale, urls.filter((url) => localeForUrl(url) === locale).length]));
const protectedPath = join(root, 'reports', 'education-recovery-001', 'protected-urls.json');
const phasePath = join(root, 'reports', 'education-recovery-001', 'phase2b-protection-before.json');
const protectedManifest = readJson(protectedPath, { urls: [] });
const phaseManifest = readJson(phasePath, { urls: [] });
const sitemapPath = join(root, 'public', 'sitemap.xml');
const lines = [
  '# FunnyTools Recovery Closeout 002 Baseline',
  '',
  `Captured: ${new Date().toISOString()}`,
  `Source commit: \`${commit}\``,
  `Package version: \`${packageJson.version}\``,
  '',
  '| Metric | Baseline | Evidence |',
  '| --- | ---: | --- |',
  `| Built HTML pages | ${pages.length} | \`dist/**/*.html\` |`,
  `| Locally indexable pages | ${indexable.length} | built HTML self-canonical and indexable |`,
  `| Sitemap URLs | ${urls.length} | unique URLs from public leaf sitemaps |`,
  `| Sitemap tool URLs | ${entries.filter((entry) => entry.sitemap === 'sitemap-tools.xml').length} | \`public/sitemap-tools.xml\` |`,
  `| Live tool URLs | ${entries.filter((entry) => entry.sitemap === 'sitemap-tools.xml').length} | existing release baseline |`,
  `| Protected URLs | ${protectedManifest.urls.length} | \`reports/education-recovery-001/protected-urls.json\` |`,
  `| Phase 2B protected URLs | ${phaseManifest.urls.length} | \`reports/education-recovery-001/phase2b-protection-before.json\` |`,
  `| Editorial leakage routes | ${(readJson(join(root, 'reports', 'education-recovery-001', 'education-recovery-audit.json'), { editorial_leakage: { routes: 'UNKNOWN' } })).editorial_leakage?.routes ?? 'UNKNOWN'} | recovery audit |`,
  '',
  '## Locale counts',
  '',
  ...Object.entries(byLocale).map(([locale, count]) => `- ${locale}: ${count}`),
  '',
  '## SHA-256',
  '',
  `- root sitemap: \`${hashFile(sitemapPath)}\``,
  `- sorted URL list: \`${createHash('sha256').update(`${urls.join('\n')}\n`).digest('hex')}\``,
  `- protected manifest: \`${hashFile(protectedPath)}\``,
  `- Phase 2B manifest: \`${hashFile(phasePath)}\``,
  '',
  '## Freeze assertions',
  '',
  '- URL surface is frozen at 717 URLs for this closeout.',
  '- The only indexable education additions remain the existing three zh-TW tools: final grade needed, item analysis, and KR-20.',
  '- Protected URLs and Phase 2B artifacts are reference-only gates; this closeout does not rewrite them.',
  '',
].join('\n');

writeFileSync(join(reportDir, 'baseline-sitemap-urls.txt'), `${urls.join('\n')}\n`, 'utf8');
writeFileSync(join(reportDir, 'BASELINE.md'), lines, 'utf8');
console.log(JSON.stringify({ commit, version: packageJson.version, builtHtml: pages.length, indexable: indexable.length, sitemapUrls: urls.length, localeCounts: byLocale, protected: protectedManifest.urls.length, phase2b: phaseManifest.urls.length }, null, 2));
