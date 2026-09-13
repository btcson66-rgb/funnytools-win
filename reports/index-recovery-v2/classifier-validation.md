# FunnyTools Index Recovery — Phase 1.5 Classifier Validation

Generated: 2026-09-13

## Safety status

- NO CONTENT REMEDIATION; NO MERGE; NO NOINDEX; NO DELETE; NO RETIRE; NO PRODUCTION DEPLOY.
- This v2 calibration reads the existing v1 inventory and reports. It does not change page source, sitemap membership, canonical, robots, noindex, redirects, slugs, hierarchy, or lastmod.
- Cross-locale comparisons are not used as duplicate evidence.

## Original vs V2

| metric | value | evidence |
| --- | --- | --- |
| Original similarity pairs >= 0.80 | 406 | Phase 1 content-similarity.csv |
| Original remediation MERGE pages | 158 | Phase 1 remediation-plan.csv; false-positive-prone classifier |
| Original same_search_intent=yes pairs | 288 | Phase 1 similarity classifier |
| V2 high-confidence SAME pairs | 0 | same signature + same role + same locale |
| V2 medium-confidence SAME pairs | 0 | human confirmation required; not automatic merge |
| Boilerplate block threshold | 47 | 11 repeated main-content blocks identified by document frequency |

## V2 Intent Taxonomy

| relationship | pairs | rule |
| --- | --- | --- |
| ADJACENT | 202 | related topic, distinct task or answer |
| COMPLEMENTARY | 53 | DO tool and LEARN guide roles should coexist |
| DIFFERENT | 65 | different direction, operation, function, or outcome |
| UNKNOWN | 86 | insufficient deterministic evidence |

## Merge confidence

| confidence | pairs | policy |
| --- | --- | --- |
| LOW | 406 | review-only; no merge classification |

## Automated regression tests

`node --test tests/index-recovery-classifier.test.mjs`: PASS, 7/7. Full `npm.cmd test`: PASS, 155/155.

## False-positive reduction

The original classifier used similarity and topic overlap as a same-intent trigger. V2 treats similarity as supporting evidence only and applies functional outcome, page role, direction, and locale rules.

| original_same_search_intent_yes | v2_relationship | pairs | interpretation |
| --- | --- | --- | --- |
| 288 | ADJACENT | 202 | removed from automatic same-intent interpretation |
| 288 | COMPLEMENTARY | 53 | removed from automatic same-intent interpretation |
| 288 | DIFFERENT | 65 | removed from automatic same-intent interpretation |
| 288 | UNKNOWN | 86 | removed from automatic same-intent interpretation |
| 288 | SAME | 0 | retained as functional/intent review |

At least 30 human-readable regression/calibration cases are in [false-positive-regression.csv](false-positive-regression.csv).

## Required regression outcomes

| example | raw | adjusted | relationship | functional_equivalence | merge_confidence |
| --- | --- | --- | --- | --- | --- |
| jpg-to-png vs png-to-jpg | 0.946 | 0.895 | DIFFERENT | NO | LOW |
| jpg-to-webp vs webp-to-jpg | 0.939 | 0.898 | DIFFERENT | NO | LOW |
| csv-to-json vs json-to-csv | 0.910 | 0.827 | DIFFERENT | NO | LOW |
| delete-pdf-pages vs extract-pdf-pages | 0.931 | 0.888 | DIFFERENT | NO | LOW |
| standard-deviation vs z-score-calculator | 0.912 | 0.804 | ADJACENT | NO | LOW |
| grade-average vs weighted-average-calculator | 0.895 | 0.798 | ADJACENT | NO | LOW |
| jpg-to-webp vs webp-to-jpg | 0.898 | 0.839 | DIFFERENT | NO | LOW |
| jpg-to-png vs png-to-jpg | 0.889 | 0.881 | DIFFERENT | NO | LOW |
| delete-pdf-pages vs extract-pdf-pages | 0.887 | 0.803 | DIFFERENT | NO | LOW |
| jpg-to-png vs png-to-jpg | 0.885 | 0.841 | DIFFERENT | NO | LOW |

Expected policy: directional converters are DIFFERENT; document delete/extract are DIFFERENT; distinct calculations are ADJACENT; tool↔guide is COMPLEMENTARY.

## V2 remediation classification

| action | urls | policy |
| --- | --- | --- |
| IMPROVE | 113 | multi-signal value review |
| KEEP | 488 | retain route |
| WAIT | 111 | preserve observation window |

Only KEEP, IMPROVE, MERGE, and WAIT are used in remediation-plan-v2.csv. Existing excluded-policy routes are intentionally omitted from this intended-indexable calibration queue.

## GSC boundary

The supplied Coverage ZIP remains summary-only. Historical GSC-known acceptance is 54 / 401 as of 2026-09-04; current Google-known after that date and URL-level indexed/non-indexed classification are UNKNOWN. V2 makes no claim that classifier evidence explains Google indexing causality.

## Artifacts

- `functional-signatures.csv`: tool functional identity per URL.
- `intent-classification.csv`: pair-level V2 relationship and merge confidence.
- `content-similarity-v2.csv`: raw main similarity beside boilerplate-adjusted similarity.
- `cannibalization-v2.csv`: SAME/outcome/SERP-role gate; non-SAME pairs are not cannibalization candidates.
- `remediation-plan-v2.csv`: intended-indexable review queue only.
