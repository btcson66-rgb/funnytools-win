# FunnyTools Affiliate GA4 追蹤

## Destination

- Property: Btcson Affiliate Network
- Web stream: Btcson Affiliate Network
- Stream ID: `15689413334`
- Affiliate Measurement ID: `G-Q78WN8NZ0R`
- Build override: `PUBLIC_AFFILIATE_GA_ID`; production fallback remains the contract ID above.
- Existing FunnyTools GA4 destinations remain unchanged: `G-SV027MPXK4` and `G-SJ90CBM9ZV`.

The existing gtag loader is loaded once. The affiliate destination is not configured as a GA4 page-view destination; affiliate events use `send_to`, so the affiliate stream does not receive an automatic page view from the shared head. The isolation fix removes the legacy affiliate `config` call while preserving both existing GA destinations.

## Event contract

| Event | Required fields | Current FunnyTools trigger |
| --- | --- | --- |
| `affiliate_module_view` | `site_name`, `placement`, `surface_type`, `affiliate_network`, `batch_id` | A real result/article/support shelf is revealed |
| `affiliate_item_view` | Above plus `product_id`, `product_category`, `card_position` | Card is at least 50% visible |
| `affiliate_click` | Above plus product fields | Native affiliate anchor click |
| `affiliate_refresh` | Module fields | User presses 換一批商品 |
| `affiliate_close` | Module fields plus `close_method` | Reserved for a real closeable Popup; no such FunnyTools UI currently exists |

The product adapter accepts the current catalog fields (`id`, `title`, `platform`, `affiliateUrl`, `category`) and records `catalog-legacy:<rotation>` as `batch_id` until the catalog adds a source batch field. No PII, custom client/session IDs, URL dimensions, or revenue events are sent.
For a mixed-platform module, the module-level `affiliate_network` is `mixed`; item and click events retain the exact card platform.

## Naming and site context

`getAffiliateSiteName()` maps `funnytools.win` and `www.funnytools.win` to `funnytools`, the other two company domains to their site names, and local/unknown hosts to `development`. FunnyTools placements are `result_card`, `article_inline`, and `support_page`; surface types are `tool`, `article`, and `support`.

## Debug, consent, and duplicate protection

Append `?ga_debug=1` to a page. Events add `debug_mode: true` and print `[Affiliate GA4]` with the event and payload. Existing FunnyTools Consent Mode remains authoritative; the helper never writes cookies or waits for analytics before navigation. Module and item views are deduplicated per page/context/item batch; rapid click/refresh/close repeats are suppressed briefly. `IntersectionObserver` is disconnected before a shelf rerender and on `pagehide`.

## Adding a placement and testing

Map a real UI to an existing placement and surface type, add the standard data attributes, and call the matching helper; do not invent placement names or create a new product URL per site. Test normal, new-tab, Ctrl/Cmd-click, mobile, missing `window.gtag`, blocked script, failed analytics requests, debug payloads, refresh, and rerender/remount behavior. The anchor must remain a normal native link in every case.

## Four-site shared destination

The shared destination is Btcson Affiliate Network, stream ID `15689413334`, measurement ID `G-Q78WN8NZ0R`. The same event names and parameter names are used by `funnytools`, `roomfeng`, `worthcalc`, and `familyboard`; each site preserves its existing GA4 destination. RoomFeng maps support/article/product cards to `support_page`/`support`, `article_inline`/`article`, and `product_card`/`tool`; WorthCalc keeps its empty product pool empty; FamilyBoard keeps affiliate recommendations outside the private app. See each site's local adapter for its approved network and real UI surfaces.

## Production readback (2026-09-03)

- Existing public version: `v5.136.1` (`main` at `c585bac`); the affiliate shelf and `affiliate_click` request are live.
- Smoke URL: `https://funnytools.win/support/?ga_debug=1`.
- Browser Network captured `affiliate_click` to `G-Q78WN8NZ0R` with `site_name=funnytools`, `placement=support_page`, `surface_type=support`, `affiliate_network=shopee`, `batch_id=catalog-legacy:2`, `product_id=shopee-24126902985`, `product_category=general`, and `card_position=1`.
- The v5.136.1 run still emitted `page_view` to `G-Q78WN8NZ0R`; this is the pre-release observation that the isolation fix addresses, not evidence of GA4 backend ingestion.
- The release gate also required a sitemap generator fix: the shared Affiliate analytics bridge had been counted as page content, producing the false sitewide hash drift and collapsed lastmod output. The corrected baseline and final production readback are recorded in the release incident log.
