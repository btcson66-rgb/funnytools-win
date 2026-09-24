import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join, relative, resolve, sep } from 'node:path';

const dist = resolve('dist');
const reportDir = resolve('reports/full-audit-002');
const reportOnly = process.argv.includes('--report-only');
const origin = 'https://funnytools.win';

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : entry.name === 'index.html' ? [full] : [];
  });
}

function routeFor(file) {
  const path = relative(dist, file).split(sep).join('/');
  return path === 'index.html' ? '/' : `/${path.slice(0, -'index.html'.length)}`;
}

function localeFor(path) {
  const match = path.match(/^\/(en|es|fr)(?:\/|$)/);
  return match?.[1] ?? 'zh';
}

function attr(tag, name) {
  return tag.match(new RegExp(`(?:^|\\s)${name}=(?:"([^"]*)"|'([^']*)')`, 'i'))?.slice(1).find((value) => value !== undefined) ?? '';
}

function decode(value) {
  return value.replaceAll('&amp;', '&').replaceAll('&#x2F;', '/').replaceAll('&#47;', '/');
}

function strip(value) {
  return value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 120);
}

const files = walk(dist);
const rows = [];
for (const file of files) {
  const html = readFileSync(file, 'utf8');
  const source = routeFor(file);
  const sourceLocale = localeFor(source);
  const indexable = !/<meta\s+name="robots"\s+content="[^"]*noindex/i.test(html);
  const document = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '');
  const tags = [...document.matchAll(/<\/?(?:nav|footer|a)\b[^>]*>/gi)];
  const stack = [];
  for (const match of tags) {
    const tag = match[0];
    const name = tag.match(/^<\/?(\w+)/)?.[1]?.toLowerCase();
    if (tag.startsWith('</')) {
      if (name === 'nav' || name === 'footer') stack.pop();
      continue;
    }
    if (name === 'nav' || name === 'footer') {
      stack.push(name);
      continue;
    }
    if (name !== 'a') continue;
    const href = decode(attr(tag, 'href'));
    if (!href || href.startsWith('#') || /^(?:mailto:|tel:|javascript:)/i.test(href)) continue;
    let target;
    try { target = new URL(href, origin + source); } catch { continue; }
    if (target.origin !== origin) continue;
    const targetLocale = localeFor(target.pathname);
    const context = stack.at(-1) ?? (source === '/' || source === '/en/' ? 'homepage' : 'content');
    const intent = attr(tag, 'data-cross-locale-intent');
    const languageSwitch = /\bdata-language-switch\b/i.test(tag) || Boolean(attr(tag, 'hreflang'));
    const sameLocale = sourceLocale === targetLocale;
    const allowed = sameLocale || languageSwitch || Boolean(intent);
    const enforced = indexable || context === 'nav' || context === 'footer' || source === '/en/';
    const end = document.indexOf('</a>', match.index + tag.length);
    const linkText = end < 0 ? '' : strip(document.slice(match.index + tag.length, end));
    rows.push({
      source_url: origin + source,
      source_locale: sourceLocale,
      target_url: target.href,
      target_locale: targetLocale,
      link_text: linkText,
      context,
      indexable,
      allowed,
      enforced,
      reason: sameLocale ? 'same-locale' : languageSwitch ? 'language-switch' : intent ? `intent:${intent}` : enforced ? 'unintended-cross-locale' : 'noindex-content-review',
    });
  }
}

const violations = rows.filter((row) => row.enforced && !row.allowed);
const review = rows.filter((row) => !row.enforced && !row.allowed);
const crossLocaleRows = rows.filter((row) => row.source_locale !== row.target_locale);
mkdirSync(reportDir, { recursive: true });
writeFileSync(join(reportDir, 'FUNNYTOOLS-LOCALE-LINKS-002.json'), `${JSON.stringify({ checkedPages: files.length, checkedLinks: rows.length, crossLocaleLinks: crossLocaleRows.length, violations, review, rows: crossLocaleRows }, null, 2)}\n`);
const columns = ['source_url', 'source_locale', 'target_url', 'target_locale', 'link_text', 'context', 'indexable', 'allowed', 'enforced', 'reason'];
const csv = [columns.join(','), ...crossLocaleRows.map((row) => columns.map((column) => `"${String(row[column]).replaceAll('"', '""')}"`).join(','))].join('\n');
writeFileSync(join(reportDir, 'FUNNYTOOLS-LOCALE-LINKS-002.csv'), `${csv}\n`);
console.log(JSON.stringify({ checkedPages: files.length, checkedLinks: rows.length, crossLocaleLinks: crossLocaleRows.length, violations: violations.length, review: review.length, examples: violations.slice(0, 20) }, null, 2));
if (violations.length && !reportOnly) process.exitCode = 1;
