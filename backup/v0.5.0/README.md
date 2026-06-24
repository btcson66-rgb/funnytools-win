# v0.5.0 — GA4 Analytics Overhaul & Homepage Engagement Optimization

**Date:** 2026-06-24

## Changes

### GA4 Analytics
- Removed dynamic `document.title` manipulation from PomodoroTimer, CountdownTimer, and BreakReminder to stop polluting GA4 page title reports
- Added `src/lib/analytics.ts` helper module with typed GA4 event functions
- Added `window.__ft_track` global helper for inline scripts
- Wired 9 custom GA4 events: `tool_card_click`, `tool_use_start`, `tool_use_success`, `result_download`, `copy_result`, `share_click`, `support_click`, `language_switch`, `related_tool_click`
- Each event includes `page_path`, `language`, `tool_id`, `tool_name`, `category` parameters
- Added `data-tool-slug` to ToolLayout for cross-referencing

### Homepage Engagement
- Added quick-access hero tools grid (top 6 tools) immediately after hero section
- Reordered homepage sections for better engagement flow
- Added CSS for hero tool cards with hover effects and dark mode support

### SEO Content Expansion
- Enhanced `contentSections` for 9 priority tools: merge-pdf, split-pdf, pdf-compressor, image-compressor, qr-code-generator, word-counter, random-group-generator, seating-chart, pomodoro-timer
- Added/improved keywords, FAQ, and SEO titles for all 9 tools
- Content in both Traditional Chinese and English

## Restore

```powershell
Copy-Item -Recurse -Force backup\v0.5.0\files\* .
npm.cmd run build
```
