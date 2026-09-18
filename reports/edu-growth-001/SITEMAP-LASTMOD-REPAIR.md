# Sitemap lastmod repair

## Reproduced failure

The pre-repair local generator could classify many unchanged tools/workflows as new or changed when the local hash map was stale. The local map had 712 entries while the current build had 717 indexable URLs. The fallback to page/git/shared-date signals caused tools/workflows to collapse onto the run date.

## Repair

1. Bump `sitemapContentHashVersion` from 8 to 9 as a migration, not a content edit.
2. Fetch live sitemap entries before resolving each page and use the live `lastmod` as a synthetic stored record when the local map lacks that URL.
3. Preserve stored dates when the hash version changes; replace hashes without manufacturing freshness.
4. Read the education campaign schedule so a genuinely first-seen campaign URL uses its explicit `publishAt`, not an arbitrary source commit date.
5. Reuse the same remote snapshot for the diff baseline.

## Evidence

- v9 update output: 717 URLs, 258 hash migrations, 0 same-version hash drift, 0 added, 0 modified against live sitemap.
- `npm run seo:check`: PASS; 717 unique URLs, 28 distinct lastmod values.
- `sitemap-tools.xml`: 6 distinct lastmod values for 86 URLs.
- `sitemap-workflows.xml`: 2 distinct lastmod values for 12 URLs.
- Regression tests cover migration preservation, remote-date fallback, and scheduled first publication date.
