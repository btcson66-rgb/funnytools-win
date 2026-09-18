# Quality Audit

日期：2026-09-18（T+0 pre-release）

## Passed checks

- Five approved tool pairs have distinct intents and a local interactive calculator.
- Each pair has two source links in localized content records.
- Each calculator has explicit invalid-input handling and boundary warnings.
- SEM distinguishes standard error of measurement from standard error of the mean.
- Spearman–Brown includes forward and inverse modes and does not promise universal reliability gains.
- Learning gain labels raw, percentage, and normalized measures as descriptive rather than causal/effect-size claims.
- Weighted rubric normalizes criterion maxima and does not judge rubric validity.
- Cohen κ is limited to two raters and a binary 2×2 table and retains prevalence/marginal caveats.
- All new calculations are browser-local and have no raw-data analytics payload.

## Not yet public

All 10 candidate records are `released: false`; 2026-09-18 build produced no candidate routes. This is intentional under the T+0 freeze.

## Review state

All candidate records are `reviewStatus: PASS`, `sourceCount: 2`, and `testStatus: PASS`. The release manifest content hashes remain empty until the scheduled route is actually built; the post-build scheduler gate requires non-empty hashes before deployment.
