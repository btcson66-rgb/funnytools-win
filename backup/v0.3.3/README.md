# v0.3.3 — Clarify deployment target (docs only)

Date: 2026-06-20

## What changed

Documentation-only patch. No source code, build output, or site behaviour is
affected. Clarifies that Cloudflare Pages is the production deployment target
(the domain `funnytools.win` is a Cloudflare-managed domain), and that the
existing GitHub Actions → GitHub Pages workflow is a secondary/legacy backup
deploy target only — kept as-is (not disabled) per explicit request, since
disabling it carries unnecessary risk for no production benefit.

### Files

- `README.md` — Stack section now states Cloudflare Pages is production and
  notes the GitHub Pages workflow is a secondary backup target.
- `.github/workflows/deploy.yml` — added a header comment with the same
  clarification. The workflow itself (jobs, triggers, steps) is unchanged.
- `package.json` / `package-lock.json` — version bumped to 0.3.3.

## Verification

- Diff is comment/doc-only; no `.astro`, `.ts`, or build config files
  touched. `npm run preflight` from v0.3.2 remains valid (build output is
  unaffected by this change); re-run not required but safe to do.

## Restore

```powershell
Copy-Item -Recurse -Force backup\v0.3.3\files\* .
npm.cmd run build
```
