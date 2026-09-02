-- Recent 28 days vs preceding 28 days. Diagnose; do not auto-refresh.
WITH base AS (
  SELECT
    url,
    CASE
      WHEN data_date BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 28 DAY) AND DATE_SUB(CURRENT_DATE(), INTERVAL 1 DAY) THEN 'recent'
      WHEN data_date BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 56 DAY) AND DATE_SUB(CURRENT_DATE(), INTERVAL 29 DAY) THEN 'prior'
    END AS period,
    SUM(impressions) AS impressions,
    SUM(clicks) AS clicks,
    SUM(sum_position) AS sum_position
  FROM `YOUR_PROJECT.searchconsole.searchdata_url_impression`
  WHERE data_date BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 56 DAY) AND DATE_SUB(CURRENT_DATE(), INTERVAL 1 DAY)
    AND LOWER(search_type) = 'web'
  GROUP BY url, period
), pivoted AS (
  SELECT
    url,
    SUM(IF(period='recent', impressions, 0)) AS recent_impressions,
    SUM(IF(period='prior', impressions, 0)) AS prior_impressions,
    SUM(IF(period='recent', clicks, 0)) AS recent_clicks,
    SUM(IF(period='prior', clicks, 0)) AS prior_clicks,
    SUM(IF(period='recent', sum_position, 0)) AS recent_sum_position,
    SUM(IF(period='prior', sum_position, 0)) AS prior_sum_position
  FROM base GROUP BY url
)
SELECT
  *,
  SAFE_DIVIDE(recent_clicks, recent_impressions) AS recent_ctr,
  SAFE_DIVIDE(prior_clicks, prior_impressions) AS prior_ctr,
  SAFE_DIVIDE(recent_sum_position, recent_impressions) + 1 AS recent_avg_position,
  SAFE_DIVIDE(prior_sum_position, prior_impressions) + 1 AS prior_avg_position,
  SAFE_DIVIDE(recent_clicks - prior_clicks, NULLIF(prior_clicks, 0)) AS click_change_rate,
  SAFE_DIVIDE(recent_impressions - prior_impressions, NULLIF(prior_impressions, 0)) AS impression_change_rate
FROM pivoted
WHERE recent_impressions + prior_impressions >= 100
ORDER BY click_change_rate ASC;
