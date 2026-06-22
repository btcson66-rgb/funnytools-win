# v0.3.7 - Combined analytics reporting

Date: 2026-06-22

## What changed

- Added a repeatable GA4, Search Console, and Cloudflare report command.
- Added sanitized JSON and Markdown analytics snapshots under `reports/analytics/`.
- Kept generated traffic snapshots out of the public Git repository.
- Updated the project version to 0.3.7.

The previous release remains available at Git tag `v0.3.6`.

## Commands

```powershell
npm.cmd run report:analytics
npm.cmd run preflight
```
