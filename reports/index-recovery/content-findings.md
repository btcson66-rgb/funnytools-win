# Content Findings

Similarity is deterministic TF-IDF cosine over extracted `<main>` text after removing scripts, styles, navigation, header/footer, SVG, and marked affiliate/value-review modules. Locales are compared separately; translated pages are not treated as duplicates.

- Eligible pages compared: 712.
- Pairs at similarity >= 0.80: 406.
- Exact pairs: 0; 0.90-1.00: 15; 0.80-0.899: 391.
- Cannibalization candidates: 2055.

No MERGE, RETIRE, DELETE, or mass NOINDEX was executed. Candidates are review-only because textual similarity is not proof of same search intent.

The value score is transparent triage (intent, main-content uniqueness, utility, internal support, search usefulness, depth, trust), not a Google ranking prediction. Tool pages receive functional-utility credit; word count does not dominate the score. Medium-similarity pairs remain review-only and do not create a MERGE classification.
