# SEO Crawlability Report

Generated: 2026-06-23

## robots.txt status

Status: passed.

- Source file: `public/robots.txt`
- Built file: `dist/robots.txt`
- Live URL checked: `https://funnytools.win/robots.txt`
- Live status: HTTP 200
- Crawling policy: allows normal crawlers and does not contain `Disallow: /`

## Final robots.txt content

```txt
User-agent: *
Allow: /

Sitemap: https://funnytools.win/sitemap.xml
```

## sitemap.xml status

Status: passed in the local static build.

- Source generator: `src/pages/sitemap.xml.ts`
- Built file: `dist/sitemap.xml`
- Live URL checked: `https://funnytools.win/sitemap.xml`
- Live status: HTTP 200
- Live URL sweep from the fixed local sitemap: 291 checked, 291 returned HTTP 200
- Built XML starts with the XML declaration.
- Built XML includes `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`.
- Built XML ends with `</urlset>`.
- Built XML does not contain broken concatenated text such as `monthly0.6https`, `daily0.8https`, or `weekly0.7https`.

## Number of URLs in sitemap

- Built sitemap URL count: 291
- Unique built sitemap URLs: 291
- Tool URLs: 154
- Category URLs: 18
- Blog URLs: 103
- Legal/info URLs: 12
- English URLs: 94

## Examples of valid sitemap entries

```xml
<url>
  <loc>https://funnytools.win/</loc>
  <lastmod>2026-06-23</lastmod>
  <changefreq>daily</changefreq>
  <priority>1.0</priority>
</url>
```

```xml
<url>
  <loc>https://funnytools.win/tools/random-number-picker/</loc>
  <lastmod>2026-06-20</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
```

```xml
<url>
  <loc>https://funnytools.win/blog/merge-pdf-mobile-merge/</loc>
  <lastmod>2026-06-23</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.6</priority>
</url>
```

## XML validation result

Passed with:

```txt
npm.cmd run build
npm.cmd run seo:check
```

The `seo:check` command verifies:

- `dist/robots.txt` exists.
- `robots.txt` contains `User-agent: *`, `Allow: /`, and `Sitemap: https://funnytools.win/sitemap.xml`.
- `robots.txt` does not block crawling with `Disallow: /`.
- `dist/sitemap.xml` exists.
- Sitemap output starts with the XML declaration, contains `<urlset>`, and ends with `</urlset>`.
- Every `<url>` has exactly one `<loc>`, `<lastmod>`, `<changefreq>`, and `<priority>`.
- Sitemap URLs are absolute HTTPS URLs on `funnytools.win`.
- Sitemap URLs do not include localhost, loopback, staging, test, or dev routes.
- Sitemap URLs map to built HTML routes.
- Sitemap URLs are not `noindex`.
- Sitemap URLs match their page canonical URL.
- The sitemap does not contain known broken concatenated patterns.

## Broken concatenated text

Status: fixed/guarded.

The sitemap generator now writes readable XML with line breaks and explicit tags for every URL entry. The validation command fails if the built sitemap contains broken text patterns such as `monthly0.6https`, `daily0.8https`, or `weekly0.7https`.

## Excluded pages and reasons

- `/404.html`: error page, marked `noindex`.
- `/zh/*`: localized redirect/helper routes, marked `noindex, follow`; canonical public pages are represented by default Traditional Chinese routes and English alternates.
- `/zh/embed/*` and `/en/embed/*`: embeddable widget routes, marked `noindex,follow` and excluded from the sitemap.
- Private/dev/admin/test routes: none found in the built sitemap.
- Localhost/staging URLs: none found in the built sitemap.
- Duplicate URLs: none found in the built sitemap.

## Validation command used

```txt
npm.cmd run build
npm.cmd run seo:check
```

`npm.cmd run preflight` now includes `seo:check` after the build step so sitemap/robots regressions are caught during the normal release verification path.

Note: the full `npm.cmd run preflight` command passed `build`, `seo:check`, and `audit:lang-switch`, then stopped in the existing `audit:adsense` gate because `/en/support/` has a 68-character title and 178-character meta description. That issue is not a robots.txt or sitemap.xml validation failure.

## Google Search Console checklist

- Open `https://funnytools.win/robots.txt`.
- Open `https://funnytools.win/sitemap.xml`.
- Confirm the deployed sitemap displays valid XML.
- Submit or resubmit `https://funnytools.win/sitemap.xml` in Google Search Console.
- Use URL Inspection for the homepage and several important tool pages.
- Request indexing for priority pages if needed.

## Deployment note

As of this report, the live sitemap URL returns HTTP 200 and valid XML, but the current live sitemap still reflects the previously deployed build. Deploy this local build before resubmitting if you want Google Search Console to see the updated readable formatting, complete `<lastmod>` coverage, and 291-URL sitemap.
