-- Query demand change: recent 28d vs previous 28d.
WITH q AS (
  SELECT
    LOWER(TRIM(REGEXP_REPLACE(query, r'\s+', ' '))) AS query_norm,
    IF(data_date >= DATE_SUB(CURRENT_DATE(), INTERVAL 28 DAY), 'recent', 'prior') AS period,
    SUM(impressions) AS impressions,
    SUM(clicks) AS clicks
  FROM `YOUR_PROJECT.searchconsole.searchdata_site_impression`
  WHERE data_date BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 56 DAY) AND DATE_SUB(CURRENT_DATE(), INTERVAL 1 DAY)
    AND LOWER(search_type)='web'
    AND IFNULL(is_anonymized_query,FALSE)=FALSE
    AND query IS NOT NULL
  GROUP BY query_norm, period
), p AS (
  SELECT query_norm,
    SUM(IF(period='recent',impressions,0)) recent_impressions,
    SUM(IF(period='prior',impressions,0)) prior_impressions,
    SUM(IF(period='recent',clicks,0)) recent_clicks,
    SUM(IF(period='prior',clicks,0)) prior_clicks
  FROM q GROUP BY query_norm
)
SELECT *,
  SAFE_DIVIDE(recent_impressions-prior_impressions,NULLIF(prior_impressions,0)) AS impression_growth,
  SAFE_DIVIDE(recent_clicks-prior_clicks,NULLIF(prior_clicks,0)) AS click_growth
FROM p
WHERE recent_impressions >= 50
ORDER BY impression_growth DESC, recent_impressions DESC;
