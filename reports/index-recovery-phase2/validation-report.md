# FunnyTools Phase 2A Validation Report

Generated: 2026-09-13; inspection snapshot: 2026-09-13T08:50:22.844Z.

## Evidence collection

- Required property: sc-domain:funnytools.win; sites.list HTTP 200; permission: siteOwner.
- Inventory: 712 intended-indexable URLs; inventory SHA-256: 363fae3ebbe1a67826739e3184148fcd9cc93165714e48039783cc273666cf59.
- URL Inspection API endpoint: https://searchconsole.googleapis.com/v1/urlInspection/index:inspect; live inspection was not requested.
- API-successful URL responses: 712/712; failed/unknown API responses: 0.
- Raw JSONL latest cache records: 712; successful cache hits this run: 712; new API calls this run: 0.
- Request policy: concurrency 3, minimum interval 400 ms (<=200 requests/minute), exponential backoff for 429/5xx/network errors.

## Derived artifacts

- Master join rows: 712; gsc-url-inspection rows: 712.
- Core tool rows: 83; Tier 1 rows: 40.
- Phase 2B proposals: treatment 25; control 25; execution NOT EXECUTED.
- Search Analytics windows: 28d=200/46 rows; 90d=200/187 rows.

## Secret safety

- Raw/API-derived output scan: PASS.
- No access token, refresh token, private key, client secret, cookie, or Authorization header is written to reports or raw responses.

## Change control

- Page source/content changes: NONE.
- SEO surface changes (canonical, robots, noindex, sitemap, slug, hreflang, lastmod): NONE.
- Production deploy: NOT DEPLOYED.
