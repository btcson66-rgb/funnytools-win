Implemented all 12 planned tools and flipped them live.

Updated registries: `src/data/tools.ts`, `src/lib/toolWidgets.ts`, `src/lib/toolContent.ts`.

Created 24 files: one `src/i18n/tools/<slug>.ts` and one `src/components/tools/<Name>.astro` for each tool.

| Tool | assetType | embedPotential |
|---|---:|---:|
| `business-days` | `calculator` | `high` |
| `break-reminder` | `tool` | `medium` |
| `remove-empty-lines` | `tool` | `high` |
| `remove-duplicate-lines` | `tool` | `high` |
| `sort-lines` | `tool` | `high` |
| `net-salary` | `calculator` | `medium` |
| `overtime-pay` | `calculator` | `medium` |
| `inflation` | `calculator` | `high` |
| `work-personality-test` | `quiz` | `low` |
| `stress-level-test` | `quiz` | `low` |
| `seating-chart` | `generator` | `medium` |
| `group-generator` | `tool` | `high` |

Verification:
- `npm run build` passed with zero errors.
- Registry check: `45` total tools, `45` live, `0` planned.
- Built HTML count: `194` pages, up from the stated `150` by `44` pages: `24` tool pages plus `20` new embed pages.
- No new npm dependencies, no route edits, no monetization flags changed.
- Deviations: none.