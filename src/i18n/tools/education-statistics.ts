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
