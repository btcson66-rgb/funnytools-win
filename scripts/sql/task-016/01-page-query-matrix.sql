-- Task016: page × query matrix, recent 28 finalized export days.
-- Replace `YOUR_PROJECT.searchconsole` with the configured project/dataset.
SELECT
  url,
  query,
  device,
  country,
  LOWER(search_type) AS search_type,
  SUM(impressions) AS impressions,
  SUM(clicks) AS clicks,
  SAFE_DIVIDE(SUM(clicks), SUM(impressions)) AS ctr,
  SAFE_DIVIDE(SUM(sum_position), SUM(impressions)) + 1.0 AS avg_position
FROM `YOUR_PROJECT.searchconsole.searchdata_url_impression`
WHERE data_date BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 28 DAY) AND DATE_SUB(CURRENT_DATE(), INTERVAL 1 DAY)
  AND LOWER(search_type) = 'web'
  AND IFNULL(is_anonymized_query, FALSE) = FALSE
  AND query IS NOT NULL
GROUP BY url, query, device, country, search_type
HAVING SUM(impressions) > 0;
