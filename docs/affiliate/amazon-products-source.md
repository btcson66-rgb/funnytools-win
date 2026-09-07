# Amazon Associates product source

The import source supplied for this rollout is:

`C:\Users\User\Downloads\amazon_affiliate_products_master.xlsx`

The permanent master catalogue is `public/data/amazon-products.json`. It contains the 100 FunnyTools rows from the `FUNNYTOOLS` sheet, promoted from the source `candidate` status to the explicit production `active` flag. The runtime never reads the workbook.

Each permanent record keeps only the ASIN, full tagged Special Link, tracking ID, our internal category, our internal description/recommendation text, product ID, target metadata, CTA, priority, status, enabled flag, and weight. Amazon titles, image URLs, availability, prices, ratings, reviews, inventory, discounts, and sales claims are not master-data fields.

Amazon Product Advertising Content is supplied separately by `scripts/amazon-content-lifecycle.mjs --refresh` through Creators API. The generated `public/data/amazon-product-content.json` is ignored by git, contains `fetched_at`, `expires_at`, and a TTL of at most 24 hours, and is consumed only as a build artifact. The refresh job never downloads or stores Amazon images locally; cards use the image URL returned by Creators API. `npm run amazon:preflight`, the deploy workflow, and the normal preflight stop with `blocked_by_amazon_product_content_source` when a fresh complete cache is unavailable.
