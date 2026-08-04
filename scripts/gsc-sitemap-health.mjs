import {
  fetchJson,
  googleAccessToken,
} from './seo-indexing-utils.mjs';

const gscSiteUrl = 'sc-domain:funnytools.win';

try {
  const token = await googleAccessToken('https://www.googleapis.com/auth/webmasters.readonly');
  const endpoint = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(gscSiteUrl)}/sitemaps`;
  const { response, json } = await fetchJson(endpoint, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) {
    throw new Error(`GSC sitemaps.list failed: ${response.status} ${JSON.stringify(json).slice(0, 500)}`);
  }

  const rows = (json?.sitemap ?? [])
    .map((entry) => ({
      path: entry.path ?? '',
      lastSubmitted: entry.lastSubmitted ?? '',
      lastDownloaded: entry.lastDownloaded ?? '',
      isPending: entry.isPending ?? '',
      warnings: entry.warnings ?? '',
      errors: entry.errors ?? '',
    }))
    .sort((a, b) => a.path.localeCompare(b.path));

  console.log(['path', 'lastSubmitted', 'lastDownloaded', 'isPending', 'warnings', 'errors'].join('\t'));
  for (const row of rows) {
    console.log([
      row.path,
      row.lastSubmitted,
      row.lastDownloaded,
      row.isPending,
      row.warnings,
      row.errors,
    ].join('\t'));
  }
} catch (error) {
  console.error(`[gsc-sitemap-health] failed: ${error.message}`);
  process.exitCode = 1;
}
