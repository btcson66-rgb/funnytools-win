# FunnyTools Index Recovery — Phase 2B

## Outcome

- Controlled experiment prepared on branch `codex/funnytools-index-recovery-phase2b-20260913`.
- 20 disjoint tool↔tool pairs: 20 treatment and 20 control; locale counts zh-TW=5, en=5, es=5, fr=5.
- Matching was rebuilt from the Phase 2A evidence master; selected match scores are 90–100.
- Every pair is same locale, same page type, same content cluster, CNI, successful fetch, allowed robots, indexing allowed, self canonical, HTTP 200, and excludes the known technical blocker.
- Treatment content changed on 20 rendered URLs; controls changed on 0 rendered URLs. Control main-content hash guard: PASS.
- Unique treatment diff fingerprints: 20/20; user-value review rows: 20/20 PASS.

- Unique-value coverage: task-specific explanation, inputs/context, examples, output interpretation, and edge cases/limitations are each present on 20/20 treatments.
- Block-level duplicate gate: PASS; 80 added paragraph blocks, 80 unique exact blocks, maximum pairwise token Jaccard overlap 0.2830 (threshold <0.80).

## Evidence boundary

- The local after-edit snapshot proves scoped rendering changes and control stability only.
- Production was not deployed, so no post-deployment index transition is available and no indexing recovery claim is made.
- Phase 2A baseline remains 4 Indexed, 308 Crawled Not Indexed, 1 Blocked/Error, and 399 Unknown across 712 intended-indexable URLs.

## Primary and secondary metrics

- Primary: URL Inspection status transition from Crawled Not Indexed to Indexed.
- Secondary: recrawl timing, lastCrawlTime, impressions, clicks, canonical selection, and coverage state.
- Ranking, traffic, conversion, and revenue are not primary experiment metrics.

## Observation

- Run only when the treatment commit is deployed: `npm.cmd run index:experiment:snapshot -- --stage day7 --label day7`, then day14 and day21.
- The command is cache-aware within each label and has no background execution or automatic Request Indexing.

## Governance

- PR stack remains unmerged. Required order is #40 → main, then #41 retarget/rebase to main, then #42 retarget/rebase to main, then this Phase 2B PR retarget/rebase as appropriate.
- No force-push to main, release, sitemap ping, or production deploy was performed.
