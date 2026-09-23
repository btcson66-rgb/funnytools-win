# Phase 2B supersedence boundary

Status: `SUPERSEDED_PENDING_DEPLOY`

Decision date: 2026-09-23

Superseding change: FunnyTools T2 index convergence (Draft PR #57)

The Phase 2B treatment/control experiment remains active on production while
the T2 change is only a Draft PR. No production cohort state has changed yet.

If T2 is merged and deployed, most Phase 2B treatment and control URLs will be
removed from the sitemap and will emit `noindex,follow`. From that deployment
time onward, treatment/control index transitions are confounded by the global
T2 policy and must not be attributed to the Phase 2B content treatment.

Keep the existing snapshots as historical evidence. Do not report a causal
Phase 2B win or loss from observations taken after T2 deployment. T2 does not
authorize Request Indexing or a manual sitemap ping.
