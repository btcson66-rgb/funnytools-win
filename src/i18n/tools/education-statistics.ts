import type { LocalizedToolContent, ToolContent } from './_types';

const disclaimer = {
  zh: '本工具供教學與初步估算，不取代正式統計軟體或專業判斷。使用結果撰寫研究報告前，請確認資料、研究設計與分析假設。',
  en: 'This tool is for teaching and preliminary estimates. It does not replace formal statistical software or professional judgment. Verify the data, research design, and assumptions before reporting results.',
};

const privacy = {
  zh: '所有輸入與計算都在你的瀏覽器內完成，不會上傳到 FunnyTools。',
  en: 'All input and calculations stay in your browser and are not uploaded to FunnyTools.',
};

function content(zh: ToolContent, en: ToolContent): LocalizedToolContent {
  return { zh, en };
}

export const normalizedScoreContent = content(
  {
    name: '常態化分數轉換工具', short: '將原始分數線性轉換到指定平均數與標準差。', long: '先將原始分數換算成 Z 分數，再映射到你指定的目標平均數與標準差。這是線性標準化，不會把偏態資料「變成常態分配」。',
    seoTitle: '常態化分數轉換工具｜原始分數轉標準分數', seoDescription: '設定原始與目標平均數、標準差，線性轉換分數並查看 Z 分數與公式。', keywords: ['常態化分數', '標準分數轉換', 'normalized score converter'],
    instructions: ['輸入原始分數、原群體平均數與標準差。', '設定目標量尺的平均數與標準差。', '計算 Z 分數與轉換後分數。'], examples: ['將不同測驗結果轉到共同量尺。', '模擬平均 50、標準差 10 的分數。', '教學示範線性標準化的效果。'],
    formula: { expression: 'z = (X − M) / SD；Y = Mₜ + z × SDₜ', explanation: '先取得原始量尺的 z，再用目標平均數 Mₜ 與目標標準差 SDₜ 轉成新分數 Y。兩個標準差都必須大於 0。' }, educationApplication: '此工具適合教學與同一參照架構下的分數轉換。不同測驗若測量內容、信度或常模不同，即使轉到相同量尺也不代表可完全互換。', reportTip: '可寫成：「原始分數依原量尺 M = 70、SD = 8 標準化後，再轉換至 M = 50、SD = 10 的量尺。」並報告轉換後分數。',
    faq: [{ q: '這是真正的常態化嗎？', a: '這是線性標準化，不會改變分配形狀。百分位常態化等非線性程序需要完整分布資料。' }, { q: '可以轉成 T 分數嗎？', a: '可以，將目標平均數設為 50、目標標準差設為 10。' }, { q: '轉換後可以超過目標平均數很多嗎？', a: '可以。線性轉換沒有固定上下限，極端原始 z 值會得到極端目標分數。' }],
    labels: { score: '原始分數（X）', mean: '原平均數（M）', sd: '原標準差（SD）', targetMean: '目標平均數', targetSd: '目標標準差', calculate: '轉換分數', result: '轉換後分數', zResult: '對應 Z 分數', originalOffset: '原始差距（X − M）', targetOffset: '目標量尺差距（Z × SDₜ）', scaleFactor: '縮放係數（SDₜ ÷ SD）', invalid: '請輸入有效數字，且原標準差與目標標準差都必須大於 0。' }, disclaimer: disclaimer.zh, privacyNote: privacy.zh,
  },
  {
    name: 'Normalized Score Converter', short: 'Linearly convert a raw score to a target mean and standard deviation.', long: 'Standardize a raw score to z, then map it to a target mean and standard deviation. This is a linear standard-score conversion; it does not make a skewed distribution normal.',
    seoTitle: 'Normalized Score Converter | Standard Score Tool', seoDescription: 'Convert a raw score to a target mean and standard deviation, with z score, formula, and reporting guidance.', keywords: ['normalized score converter', 'standard score transformation', 'linear standardization'],
    instructions: ['Enter the raw score, original mean, and original SD.', 'Set the target mean and target SD.', 'Calculate z and the converted score.'], examples: ['Place different test results on a common scale.', 'Model a mean-50, SD-10 score.', 'Teach the effect of linear standardization.'],
    formula: { expression: 'z = (X − M) / SD; Y = Mₜ + z × SDₜ', explanation: 'First compute z on the original scale, then use target mean Mₜ and target SD SDₜ to obtain Y. Both SDs must be positive.' }, educationApplication: 'Useful for teaching and transformations under a shared reference framework. Scores from tests with different constructs, reliability, or norms are not automatically interchangeable after rescaling.', reportTip: 'Example: “Scores were standardized using the original M = 70 and SD = 8, then transformed to a scale with M = 50 and SD = 10.” Report the converted value.',
    faq: [{ q: 'Does this normalize the distribution?', a: 'It performs linear standardization and does not change distribution shape. Percentile-based normalizing requires the full distribution.' }, { q: 'Can this produce T scores?', a: 'Yes. Set target mean to 50 and target SD to 10.' }, { q: 'Can converted scores be extreme?', a: 'Yes. A linear transformation has no fixed bounds.' }],
    labels: { score: 'Raw score (X)', mean: 'Original mean (M)', sd: 'Original SD', targetMean: 'Target mean', targetSd: 'Target SD', calculate: 'Convert score', result: 'Converted score', zResult: 'Corresponding z score', originalOffset: 'Original deviation (X − M)', targetOffset: 'Target-scale deviation (z × SDₜ)', scaleFactor: 'Scale factor (SDₜ ÷ SD)', invalid: 'Enter valid numbers and use positive original and target standard deviations.' }, disclaimer: disclaimer.en, privacyNote: privacy.en,
  },
);

export const teacherExamContent = content(
  {
    name: '教師甄試成績轉換模擬器', short: '依筆試、口試與試教權重模擬加權總成績。', long: '輸入筆試、口試與試教成績及各自權重，模擬加權總分。各縣市、學校與年度規則可能不同，請以主辦單位公告為準。',
    seoTitle: '教甄成績計算器｜免費試算筆試口試試教加權分數', seoDescription: '免費教師甄試成績計算器，輸入筆試、口試、試教分數與權重，立即算出加權總成績與名次參考。', keywords: ['教師甄試成績', '教甄分數計算', '教師甄試加權'],
    instructions: ['輸入筆試、口試與試教分數。', '依當年度主辦單位公告填入各項權重。', '確認權重總和後計算模擬總成績。'], examples: ['比較不同複試表現對總成績的影響。', '依公告權重設定準備目標。', '進行情境模擬，不作為正式錄取判定。'],
    formula: { expression: '總成績 = Σ(各項成績 × 各項權重) / Σ權重', explanation: '本工具使用一般加權平均。若簡章另有門檻、倍率、原始分數轉換、加分或四捨五入規則，必須另外套用。' }, educationApplication: '可用於備考情境分析，例如估算筆試固定時試教提升 5 分對總成績的影響。正式結果仍須依主辦單位簡章、最低門檻及同分比序規則。', reportTip: '若用於備考紀錄，可寫成：「依筆試 40%、試教 40%、口試 20% 模擬，加權總成績為 82.4。」這不是正式 APA 統計結果，應註明為情境估算。',
    faq: [{ q: '權重一定要照預設值嗎？', a: '不用。請依你報考年度與主辦單位公告修改。' }, { q: '有處理加分或最低門檻嗎？', a: '沒有。本工具只做一般加權平均，特殊規則需另行判斷。' }, { q: '可以拿來預測錄取嗎？', a: '不建議。缺額、競爭者分布、門檻與比序都會影響結果。' }],
    labels: { written: '筆試成績', writtenWeight: '筆試權重', interview: '口試成績', interviewWeight: '口試權重', teaching: '試教成績', teachingWeight: '試教權重', calculate: '模擬加權總成績', result: '模擬總成績', weightTotal: '權重總和', breakdown: '計算明細', preset403030: '套用 40/30/30 範例', autoNormalize: '自動正規化權重', copyResult: '複製結果', copied: '已複製', weightWarning: '權重總和不是 100%。請修正權重，或使用自動正規化。', invalid: '請輸入有效成績與非負權重，且至少一項權重大於 0。' }, disclaimer: disclaimer.zh, privacyNote: privacy.zh,
  },
  {
    name: 'Teacher Exam Score Converter', short: 'Simulate a weighted teacher-exam total from written, interview, and teaching scores.', long: 'Enter component scores and weights to simulate a weighted teacher-recruitment exam result. Official rules vary by authority and year; always follow the current announcement.',
    seoTitle: 'Free Teacher Exam Score Calculator | Weighted Total', seoDescription: 'Calculate your weighted teacher exam total for free. Enter written, interview, and teaching-demo scores and weights instantly.', keywords: ['teacher exam score converter', 'teacher recruitment score', 'weighted exam score'],
    instructions: ['Enter the written, interview, and teaching scores.', 'Set weights from the official current rules.', 'Check the weight total and calculate the simulation.'], examples: ['Compare how component scores affect the total.', 'Set preparation targets from announced weights.', 'Run scenarios without treating them as admission predictions.'],
    formula: { expression: 'Total = Σ(component score × component weight) / Σweights', explanation: 'This is a general weighted mean. Apply official cutoffs, multipliers, score transformations, bonus points, and rounding separately.' }, educationApplication: 'Useful for scenario analysis, such as estimating how a five-point teaching-demonstration increase affects the total. Official outcomes depend on current rules, thresholds, and tie-breaking.', reportTip: 'For a preparation record: “Using weights of 40% written, 40% teaching, and 20% interview, the simulated total was 82.4.” Label it as a scenario estimate, not an APA inferential result.',
    faq: [{ q: 'Must I use the default weights?', a: 'No. Replace them with the official weights for your authority and year.' }, { q: 'Does this include bonus points or cutoffs?', a: 'No. It performs only a general weighted average.' }, { q: 'Can it predict selection?', a: 'No. Vacancies, competitor scores, cutoffs, and tie-breaking also matter.' }],
    labels: { written: 'Written score', writtenWeight: 'Written weight', interview: 'Interview score', interviewWeight: 'Interview weight', teaching: 'Teaching demo score', teachingWeight: 'Teaching weight', calculate: 'Simulate weighted total', result: 'Simulated total', weightTotal: 'Weight total', breakdown: 'Calculation breakdown', preset403030: 'Use 40/30/30 example', autoNormalize: 'Auto-normalize weights', copyResult: 'Copy result', copied: 'Copied', weightWarning: 'Weights do not total 100%. Adjust them or use auto-normalize.', invalid: 'Enter valid scores and nonnegative weights, with at least one positive weight.' }, disclaimer: disclaimer.en, privacyNote: privacy.en,
  },
);

export const cronbachAlphaContent = content(
  {
    name: 'Cronbach’s Alpha 計算器', short: '以受試者 × 題目的原始資料估算量表內部一致性。', long: '貼上 CSV 或以空白分隔的作答資料：每列一位受試者、每欄一個題目。工具使用樣本變異數計算 Cronbach’s α，並顯示有效受試者與題目數。',
    seoTitle: 'Cronbach’s Alpha 計算器｜量表信度線上估算', seoDescription: '貼上受試者乘題目的原始資料，估算 Cronbach alpha、有效樣本數與題目數。', keywords: ['Cronbach alpha', '信度分析', '量表內部一致性'],
    instructions: ['先完成反向題重新計分。', '每列貼上一位受試者的所有題目分數，以逗號、Tab 或空白分隔。', '確保每列欄數一致且沒有缺值，再計算 α。'], examples: ['課堂示範內部一致性信度。', '量表前測資料的初步品質檢查。', '在正式軟體分析前快速核對資料格式。'],
    formula: { expression: 'α = k/(k − 1) × [1 − ΣVar(Xᵢ)/Var(ΣXᵢ)]', explanation: 'k 為題目數，Var(Xᵢ) 為各題樣本變異數，Var(ΣXᵢ) 為受試者總分的樣本變異數。至少需 2 題與 2 位有效受試者。' }, educationApplication: 'α 反映特定樣本與題組的內部一致性，不等同單向度、效度或量表品質的全部。結果會受題目數、題目共變與樣本異質性影響，不宜只用固定門檻判斷。', reportTip: '可寫成：「本量表在本樣本中的內部一致性為 Cronbach’s α = .82（k = 8，N = 120）。」正式研究應再使用統計軟體檢查缺值處理、反向題與題目分析。',
    faq: [{ q: '第一列可以放欄位名稱嗎？', a: '目前不行。請只貼數值資料，不要包含標題列或姓名。' }, { q: '反向題會自動處理嗎？', a: '不會。請依量尺範圍先完成反向計分。' }, { q: 'Alpha 越高一定越好嗎？', a: '不一定。過高可能表示題目內容重複，且 α 不能證明量表為單一構念。' }],
    labels: { data: '作答資料（每列一人、每欄一題）', calculate: '計算 Cronbach’s α', result: 'Cronbach’s α', respondents: '有效受試者數（N）', items: '題目數（k）', sample: '範例資料', invalid: '請輸入至少 2 列、2 欄的完整數值資料，且每列欄數必須一致、總分變異數須大於 0。' }, disclaimer: disclaimer.zh, privacyNote: privacy.zh,
  },
  {
    name: 'Cronbach Alpha Calculator', short: 'Estimate internal consistency from respondent-by-item data.', long: 'Paste CSV or whitespace-separated responses with one respondent per row and one item per column. The tool uses sample variances to calculate Cronbach’s alpha.',
    seoTitle: 'Cronbach Alpha Calculator | Internal Consistency', seoDescription: 'Paste respondent-by-item data to estimate Cronbach alpha, sample size, and item count.', keywords: ['Cronbach alpha calculator', 'internal consistency', 'reliability analysis'],
    instructions: ['Reverse-score negatively keyed items first.', 'Paste one respondent per row, separated by commas, tabs, or spaces.', 'Use consistent columns with no missing values, then calculate alpha.'], examples: ['Demonstrate internal consistency in class.', 'Run a preliminary scale-quality check.', 'Verify data shape before formal statistical analysis.'],
    formula: { expression: 'α = k/(k − 1) × [1 − ΣVar(Xᵢ)/Var(ΣXᵢ)]', explanation: 'k is item count, Var(Xᵢ) is each item’s sample variance, and Var(ΣXᵢ) is the sample variance of respondent totals. At least two items and two respondents are required.' }, educationApplication: 'Alpha describes internal consistency for a particular sample and item set. It is not proof of unidimensionality or validity, and depends on item count, covariance, and sample heterogeneity.', reportTip: 'Example: “The scale showed internal consistency of Cronbach’s α = .82 (k = 8, N = 120).” Use formal software to verify missing-data handling, reverse scoring, and item diagnostics.',
    faq: [{ q: 'Can the first row contain headers?', a: 'No. Paste numeric data only, without headers or names.' }, { q: 'Are reverse-keyed items handled automatically?', a: 'No. Reverse-score them according to the response scale first.' }, { q: 'Is higher alpha always better?', a: 'No. Very high alpha may indicate redundant items, and alpha does not establish a single construct.' }],
    labels: { data: 'Responses (one person per row, one item per column)', calculate: 'Calculate Cronbach’s α', result: 'Cronbach’s α', respondents: 'Valid respondents (N)', items: 'Items (k)', sample: 'Example data', invalid: 'Enter complete numeric data with at least 2 rows and 2 columns, consistent column counts, and nonzero total-score variance.' }, disclaimer: disclaimer.en, privacyNote: privacy.en,
  },
);

export const independentTTestContent = content(
  {
    name: '獨立樣本 t 檢定簡易計算器', short: '用兩組樣本數、平均數與標準差執行 Welch t 檢定。', long: '輸入兩組獨立樣本的 N、平均數與樣本標準差，計算平均差、Welch t 值、近似自由度與雙尾 p 值。Welch 方法不假設兩組變異數相等。',
    seoTitle: '獨立樣本 t 檢定計算器｜Welch t test', seoDescription: '輸入兩組 N、平均數與標準差，計算 Welch 獨立樣本 t 檢定、自由度與雙尾 p 值。', keywords: ['獨立樣本t檢定', 'Welch t test', 't檢定計算器'],
    instructions: ['輸入第一組與第二組的樣本數、平均數、樣本標準差。', '確認兩組為彼此獨立的觀察值。', '計算並同時解讀平均差、t、df 與雙尾 p。'], examples: ['比較兩種教學法的平均成績。', '比較實驗組與對照組的量表平均數。', '用摘要統計量核對正式軟體輸出。'],
    formula: { expression: 't = (M₁ − M₂) / √(s₁²/n₁ + s₂²/n₂)', explanation: '自由度使用 Welch–Satterthwaite 近似；p 值由 t 分配計算。輸入的 s₁、s₂ 應為樣本標準差。' }, educationApplication: '適合兩個互相獨立群體的平均數比較。應檢查觀察值獨立性、離群值與分配情況；小樣本或嚴重偏態時尤其需謹慎。統計顯著不等於教育上的實質重要。', reportTip: 'APA 範例：「A 組（M = 78.4, SD = 8.2）高於 B 組（M = 73.1, SD = 9.5），Welch’s t(59.6) = 2.36, p = .022。」正式報告宜另附信賴區間與效果量。',
    faq: [{ q: '為什麼使用 Welch t 檢定？', a: 'Welch 方法不要求兩組變異數相等，通常比傳統等變異數版本更穩健。' }, { q: '可以輸入母體標準差嗎？', a: '此工具預期輸入各組的樣本標準差。' }, { q: 'p < .05 就代表效果很大嗎？', a: '不代表。p 值與樣本數有關，還需查看平均差、信賴區間與效果量。' }],
    labels: { group1: '第一組', group2: '第二組', n: '樣本數（N）', mean: '平均數（M）', sd: '樣本標準差（SD）', calculate: '執行 Welch t 檢定', difference: '平均差（M₁ − M₂）', result: 't 值', df: '自由度（df）', p: '雙尾 p 值', standardError: '標準誤（SE）', confidenceInterval: '95% 信賴區間', hedgesG: 'Hedges’ g（效果量）', invalid: '兩組樣本數須為大於 1 的整數，標準差須大於 0，其他欄位須為有效數字。' }, disclaimer: disclaimer.zh, privacyNote: privacy.zh,
  },
  {
    name: 'Independent Samples t-test Calculator', short: 'Run a Welch independent-samples t test from summary statistics.', long: 'Enter N, mean, and sample SD for two independent groups to calculate the mean difference, Welch t, approximate degrees of freedom, and two-tailed p value.',
    seoTitle: 'Independent Samples t-test Calculator | Welch t Test', seoDescription: 'Calculate a Welch independent-samples t test from two groups’ sample sizes, means, and standard deviations.', keywords: ['independent samples t test calculator', 'Welch t test', 'two sample t test'],
    instructions: ['Enter sample size, mean, and sample SD for both groups.', 'Confirm observations are independent between groups.', 'Interpret the difference, t, df, and two-tailed p together.'], examples: ['Compare mean scores under two teaching methods.', 'Compare treatment and control group means.', 'Check formal software output from summary statistics.'],
    formula: { expression: 't = (M₁ − M₂) / √(s₁²/n₁ + s₂²/n₂)', explanation: 'Degrees of freedom use the Welch–Satterthwaite approximation; p is calculated from the t distribution. s₁ and s₂ are sample SDs.' }, educationApplication: 'Use for means from two independent groups. Check independence, outliers, and distribution shape, especially with small or heavily skewed samples. Statistical significance is not the same as educational importance.', reportTip: 'APA example: “Group A (M = 78.4, SD = 8.2) scored higher than Group B (M = 73.1, SD = 9.5), Welch’s t(59.6) = 2.36, p = .022.” Formal reports should add a confidence interval and effect size.',
    faq: [{ q: 'Why use Welch’s t test?', a: 'It does not require equal group variances and is generally more robust than the pooled-variance version.' }, { q: 'Can I enter population SDs?', a: 'This calculator expects sample standard deviations.' }, { q: 'Does p < .05 mean a large effect?', a: 'No. p also depends on sample size; inspect the difference, confidence interval, and effect size.' }],
    labels: { group1: 'Group 1', group2: 'Group 2', n: 'Sample size (N)', mean: 'Mean (M)', sd: 'Sample SD', calculate: 'Run Welch t test', difference: 'Mean difference (M₁ − M₂)', result: 't statistic', df: 'Degrees of freedom', p: 'Two-tailed p value', standardError: 'Standard error (SE)', confidenceInterval: '95% confidence interval', hedgesG: 'Hedges’ g (effect size)', invalid: 'Both sample sizes must be whole numbers above 1, SDs must be positive, and all fields must be valid numbers.' }, disclaimer: disclaimer.en, privacyNote: privacy.en,
  },
);
