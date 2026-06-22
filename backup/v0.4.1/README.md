# v0.4.1 - Dark-mode UI consistency

Date: 2026-06-22

## What changed

- Fixed dark-mode surfaces and contrast for shared secondary buttons, including copy-link and copy-embed controls.
- Fixed support-page sharing, product, disclosure, blog-tool, category-count, CAD status, and character-limit cards.
- Improved active CAD and flowchart control contrast.
- Fixed dynamically generated color-palette controls so Astro styling, minimum target size, and accessible text contrast apply correctly.
- Added a reusable Chrome-based dark-mode UI audit covering white surfaces, control contrast, target size, and horizontal overflow.

The previous live release is preserved by Git tag `backup-pre-v0.4.1-dark-ui-2026-06-22`, pointing to v0.4.0 commit `1a75f15`.

## UI audit coverage

- Desktop 1440px: 199 routes with safe button interactions, 0 failures.
- Tablet 768px: 199 routes, 0 failures.
- Mobile 390px: 199 routes, 0 failures.

## Verification

```powershell
npm.cmd run audit:ui-dark -- http://127.0.0.1:4321 --interactions
npm.cmd run audit:ui-dark -- http://127.0.0.1:4321 --width=768
npm.cmd run audit:ui-dark -- http://127.0.0.1:4321 --width=390
npm.cmd run preflight
```
