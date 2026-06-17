# Backup v0.1.1

Date: 2026-06-17

This backup contains the files changed for the FunnyTools homepage brand, trust, search, SEO, and versioning update.

## Restore

Copy files from `backup/v0.1.1/files/` back to the project root, preserving the same relative paths.

Example:

```powershell
Copy-Item -Recurse -Force backup\v0.1.1\files\* .
```

After restoring, run:

```powershell
npm.cmd run build
```

## Files

- `package.json`
- `package-lock.json`
- `src/config/site.ts`
- `src/i18n/pages.ts`
- `src/i18n/ui.ts`
- `src/pages/[...locale]/index.astro`
- `src/pages/[...locale]/tools/index.astro`
- `src/styles/global.css`
