import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname.replace(/^\/(.:)/, '$1');
const dist = join(root, 'dist');
const requiredEvents = [
  'tool_view',
  'tool_started',
  'tool_use_started',
  'tool_action',
  'tool_completed',
  'tool_use_completed',
  'result_action',
  'file_download',
  'tool_error',
];
const forbiddenPayloadNames = [
  'input_value',
  'file_name',
  'filename',
  'result_text',
  'error_message',
  'user_input',
  'student_name',
  'student_names',
  'research_data',
];
const analyticsMarkers = ['gtag(', 'dataLayer.push', '__ft_track'];

function toolPages(localePrefix = '') {
  const directory = join(dist, localePrefix, 'tools');
  return readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => join(directory, entry.name, 'index.html'));
}

function contentPages(localePrefix = '') {
  return ['blog', 'guides', 'workflows'].flatMap((section) => {
    const directory = join(dist, localePrefix, section);
    if (!readdirSync(dist, { withFileTypes: true }).some((entry) => entry.name === (localePrefix || section))) return [];
    try {
      return readdirSync(directory, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map((entry) => join(directory, entry.name, 'index.html'));
    } catch {
      return [];
    }
  });
}

function analyticsSnippets(html) {
  const snippets = [];

  for (const marker of analyticsMarkers) {
    let index = html.indexOf(marker);
    while (index !== -1) {
      snippets.push(html.slice(Math.max(0, index - 250), index + 700));
      index = html.indexOf(marker, index + marker.length);
    }
  }

  return snippets.join('\n');
}

const pages = [...toolPages(), ...toolPages('en')];
const contentHtml = [...contentPages(), ...contentPages('en')]
  .map((page) => readFileSync(page, 'utf8'))
  .join('\n');
const failures = [];

for (const page of pages) {
  const html = readFileSync(page, 'utf8');
  const analyticsHtml = analyticsSnippets(html);
  for (const eventName of requiredEvents) {
    if (!html.includes(eventName)) failures.push(`${page}: missing ${eventName}`);
  }
  for (const payloadName of forbiddenPayloadNames) {
    if (analyticsHtml.includes(payloadName)) failures.push(`${page}: forbidden analytics payload ${payloadName}`);
  }
  // Every custom event on this site reaches GA4 through window.gtag. Astro wraps the
  // define:vars GA snippet in an IIFE, so `function gtag(){}` stays local to that block
  // and window.gtag is undefined unless the layout publishes it explicitly. While that
  // was broken, gtag('config') and page_view still worked from inside the IIFE, so GA4
  // looked alive — but every custom event fell back to a bare dataLayer.push that
  // nothing consumes, and this audit still passed because the event names were present
  // in the HTML. Presence of an event name is not proof the call can reach GA4.
  // The negative lookahead matters: `window.gtag === 'function'` appears in the
  // __ft_track guard on every page, so a looser pattern passes on broken output.
  if (!/window\.gtag\s*=(?!=)/.test(html)) {
    failures.push(`${page}: GA snippet never assigns window.gtag, so custom events cannot fire`);
  }
}

const supportHtml = readFileSync(join(dist, 'support', 'index.html'), 'utf8');
const supportScript = readFileSync(join(dist, 'support-products.js'), 'utf8');
if (!supportHtml.includes('G-SV027MPXK4')) failures.push('support page: GA4 measurement ID missing');
if (!supportScript.includes('affiliate_click')) failures.push('support-products.js: affiliate_click missing');

if (!contentHtml.includes('article_cta_click')) {
  failures.push('content pages: article_cta_click missing');
}
if (!contentHtml.includes('hub_click')) {
  failures.push('content pages: hub_click missing');
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log(`Analytics audit passed: ${pages.length} localized tool pages, ${requiredEvents.length} required events, 0 forbidden payload names.`);
