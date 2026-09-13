# Validation Report

Generated: 2026-09-13

| check | result | evidence |
| --- | --- | --- |
| npm.cmd run build | PASS | 1171 HTML files in dist/ |
| npm.cmd run seo:check | PASS | 712 unique sitemap URLs; no failures |
| npm.cmd run seo:validate | PASS | 0 failures; 0 duplicate URLs |
| npm.cmd run audit:indexation | PASS | 712 indexable; 0 sitemap/canonical/query/JSON-LD findings |
| npm.cmd run audit:seo-collapse | PASS | local build gate; no failures |
| npm.cmd run audit:seo-collapse:live | PASS | 712/712 live sitemap URLs; no failures |
| npm.cmd run audit:index-recovery | PASS | 1171 built; 712 intended indexable; 712 sitemap; current Coverage URL sample unavailable |
| npm.cmd run lint | PASS | ESLint completed without errors |
| npm.cmd run typecheck | PASS | tsc --noEmit completed without errors |
| npm.cmd test | PASS | 148 tests passed; 0 failed |
| SITEMAP_LASTMOD_MODE=preserve npm.cmd run preflight | PASS | all preflight stages passed; 712 sitemap URLs; no failures |
| npm.cmd run preflight (default local refresh) | OBSERVED EXISTING FAILURE | refresh collapsed 83 tool URLs to one lastmod and triggered the guard; generated files restored; no threshold lowered |
| Production deploy | NOT DEPLOYED | branch + PR only |

No validation threshold was lowered. The broad live crawler result is bounded to the existing audit’s recorded sitemap readback; arbitrary non-sitemap routes remain outside the production reachability count. The live audit also reported a non-blocking `www` HTTP two-redirect warning; it was not changed in this audit.
