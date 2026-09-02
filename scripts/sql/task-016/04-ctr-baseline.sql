-- FunnyTools own CTR curve by device + position bucket.
WITH rows AS (
  SELECT
    device,
    url,
    query,
    SUM(impressions) AS impressions,
    SUM(clicks) AS clicks,
    SAFE_DIVIDE(SUM(sum_position), SUM(impressions)) + 1.0 AS avg_position
  FROM `YOUR_PROJECT.searchconsole.searchdata_url_impression`
  WHERE data_date BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 56 DAY) AND DATE_SUB(CURRENT_DATE(), INTERVAL 1 DAY)
    AND LOWER(search_type)='web'
    AND IFNULL(is_anonymized_query,FALSE)=FALSE
    AND query IS NOT NULL
  GROUP BY device,url,query
), bucketed AS (
  SELECT *, CASE
    WHEN avg_position < 1.5 THEN '1'
    WHEN avg_position < 2.5 THEN '2'
    WHEN avg_position < 3.5 THEN '3'
    WHEN avg_position < 5.5 THEN '4-5'
    WHEN avg_position < 10.5 THEN '6-10'
    WHEN avg_position < 20.5 THEN '11-20'
    WHEN avg_position < 50.5 THEN '21-50'
    ELSE '50+'
  END AS position_bucket
  FROM rows
)
SELECT
  device,
  position_bucket,
  SUM(impressions) AS impressions,
  SUM(clicks) AS clicks,
  SAFE_DIVIDE(SUM(clicks),SUM(impressions)) AS weighted_ctr,
  APPROX_QUANTILES(SAFE_DIVIDE(clicks,impressions), 100)[OFFSET(50)] AS median_row_ctr,
  COUNT(*) AS row_count,
  MIN(avg_position) AS min_avg_position_in_bucket
FROM bucketed
GROUP BY device, position_bucket
HAVING SUM(impressions) >= 500
ORDER BY device, min_avg_position_in_bucket;
