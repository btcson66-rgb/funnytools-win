-- Exact-query multi-URL candidates. This does NOT prove harmful cannibalization.
WITH page_query AS (
  SELECT
    LOWER(TRIM(REGEXP_REPLACE(query, r'\s+', ' '))) AS query_norm,
    url,
    SUM(impressions) AS impressions,
    SUM(clicks) AS clicks,
    SAFE_DIVIDE(SUM(sum_position), SUM(impressions)) + 1.0 AS avg_position
  FROM `YOUR_PROJECT.searchconsole.searchdata_url_impression`
  WHERE data_date BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 28 DAY) AND DATE_SUB(CURRENT_DATE(), INTERVAL 1 DAY)
    AND LOWER(search_type) = 'web'
    AND IFNULL(is_anonymized_query, FALSE) = FALSE
    AND query IS NOT NULL
  GROUP BY query_norm, url
), totals AS (
  SELECT query_norm, SUM(impressions) AS query_impressions, COUNTIF(impressions > 0) AS active_urls
  FROM page_query GROUP BY query_norm
), candidates AS (
  SELECT
    p.query_norm, p.url, p.impressions, p.clicks, p.avg_position,
    t.query_impressions, t.active_urls,
    SAFE_DIVIDE(p.impressions, t.query_impressions) AS impression_share
  FROM page_query p JOIN totals t USING(query_norm)
  WHERE t.active_urls >= 2 AND t.query_impressions >= 100
)
SELECT *
FROM candidates
WHERE impression_share >= 0.15
ORDER BY query_impressions DESC, query_norm, impressions DESC;
