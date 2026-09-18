# SERP Gap Analysis

研究日期：2026-09-18。以下是公開搜尋結果的方向性觀察，不是流量或排名承諾；搜尋結果會隨地區、時間與個人化變化。

## Query observations

| Query intent | SERP examples | Observed opportunity | FunnyTools response |
|---|---|---|---|
| standard error of measurement calculator | PaperSurvey SEM calculator；Calculator Academy SEM calculator | 競品多提供直接公式輸入，但常把 SEM、平均數標準誤與區間解讀混在一起 | 先做窄而正確的 SD + reliability → SEM；明確說明不是 SEMean，補充信賴區間半寬與測量限制 |
| Spearman-Brown calculator reliability | University of Connecticut reliability guide；心理計量教材 | 需求同時包含正向預測與反推 target reliability；公式解釋與假設是差異點 | 同一工具提供 forward/inverse，標明長度倍數、題目品質與試測限制 |
| learning gain calculator normalized gain | PhysPort normalized gain guidance；ERIC learning-gain research | 公式容易被當作 effect size 或因果效果；aggregation 與 ceiling/zero denominator 是教育情境痛點 | 回傳 raw、相對前測變化、normalized gain，對零分母、天花板與下降分數給明確提醒 |
| Cohen kappa calculator inter-rater agreement | Crosstabs；Statistics.tools | 多數頁面強調 2×2/矩陣輸入與公式；高 raw agreement 與 κ 解讀差異是教育研究常見誤讀 | 首波提供兩評分者二分類 2×2 表，顯示 observed/expected agreement 與 prevalence/marginal caveat |
| weighted rubric score calculator | Cornell rubric guidance；University of Kansas rubric guidance | 使用者實際需求是不同滿分、權重與可追溯結果；單純加總會誤導 | 提供逐規準比例、權重總和與加權百分比；不宣稱替使用者設計有效 rubric |

## Research sources

- ETS, *Standard Error of Measurement*: https://www.ets.org/Media/Research/pdf/RM-18-01.pdf
- University of Connecticut, *Instrument reliability*: https://researchbasics.education.uconn.edu/instrument_reliability/
- PhysPort, *Normalized gain*: https://www.physport.org/recommendations/Entry.cfm?ID=93334
- Penn State, *Cohen kappa*: https://online.stat.psu.edu/stat509/lesson/18/18.7
- NIST, *Kappa statistic*: https://www.itl.nist.gov/div898/software/dataplot/refman2/auxillar/kappa.htm
- Cornell University, *Rubrics*: https://teaching.cornell.edu/teaching-resources/assessment-evaluation/rubrics

## Decision

先發布五個 calculator/tool pairs，不新增同義 guide 或低資訊 landing page。distractor analysis 與 CBM progress monitoring 保留 backlog，待資料矩陣/觀察序列與解讀規則完成後再決定。
