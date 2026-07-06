import type { LocalizedToolContent, ToolContent } from './_types';

const disclaimer = {
  zh: '本工具供教學與初步估算，不取代正式統計軟體或專業判斷。使用結果撰寫研究報告前，請確認資料、研究設計與分析假設。',
  en: 'This tool is for teaching and preliminary estimates. It does not replace formal statistical software or professional judgment. Verify the data, research design, and assumptions before reporting results.',
};

const privacy = {
  zh: '所有輸入與計算都在你的瀏覽器內完成，不會上傳到 FunnyTools 免費線上工具箱。',
  en: 'All input and calculations stay in your browser and are not uploaded to FunnyTools.',
};

function content(zh: ToolContent, en: ToolContent): LocalizedToolContent {
  return { zh, en };
}

export const percentileRankContent = content(
  {
    name: 'PR 百分等級計算器', short: '依低於與同分人數計算百分等級（PR）。',
    long: '輸入低於該分數的人數、同分人數與總人數，以中點法估算百分等級。PR 表示該分數在參照群體中的相對位置，不等於答對百分比。',
    seoTitle: 'PR 百分等級計算器｜Percentile Rank 線上估算', seoDescription: '輸入低於、同分與總人數，使用中點法計算 PR 百分等級，附公式、教育應用與研究報告提示。',
    keywords: ['PR值計算', '百分等級', 'percentile rank', '教育統計'],
    instructions: ['輸入分數低於受測者的人數。', '輸入與受測者同分的人數（包含受測者本人）。', '輸入參照群體總人數後按下計算。'],
    examples: ['說明學生在班級或年級中的相對位置。', '比較不同測驗分數在各自參照群體中的表現。', '協助解讀常模參照測驗結果。'],
    formula: { expression: 'PR = 100 × (B + 0.5E) / N', explanation: 'B 為低於該分數的人數，E 為同分人數，N 為總人數。0.5E 是同分群體的中點修正。' },
    educationApplication: 'PR 適合呈現常模參照下的相對表現，例如 PR 75 約表示表現高於參照群體中的 75%。不同常模、群體或時間點的 PR 不宜直接視為完全等值。',
    reportTip: '可寫成：「該生在本次參照群體中的百分等級為 PR = 75.0。」同時交代參照群體、人數與 PR 的計算方式。',
    faq: [{ q: 'PR 80 是考 80 分嗎？', a: '不是。PR 80 表示相對位置約高於 80% 的參照群體，與原始得分 80 分是不同概念。' }, { q: '同分人數要包含本人嗎？', a: '要。本工具的 E 是取得相同分數的總人數，包含正在計算的受測者。' }, { q: '可以用班級人數計算嗎？', a: '可以，但結果只代表該班級內的相對位置，不能直接當成全校或全國常模。' }],
    labels: { below: '低於該分數的人數（B）', equal: '同分人數（E）', total: '總人數（N）', calculate: '計算 PR', result: '百分等級', invalid: '請確認人數為有效整數，且 B + E 不超過總人數。' }, disclaimer: disclaimer.zh, privacyNote: privacy.zh,
  },
  {
    name: 'Percentile Rank Calculator', short: 'Calculate percentile rank from counts below and equal to a score.',
    long: 'Enter the number of scores below, the number tied, and the reference-group size to estimate percentile rank with the midpoint method. Percentile rank describes relative standing, not percent correct.',
    seoTitle: 'Percentile Rank Calc | Formula & Education Guide', seoDescription: 'Calculate percentile rank using counts below, tied scores, and group size, with formula and reporting guidance.',
    keywords: ['percentile rank calculator', 'PR calculator', 'education statistics'],
    instructions: ['Enter the number of people scoring below the target score.', 'Enter everyone tied at that score, including the target person.', 'Enter the full reference-group size and calculate.'],
    examples: ['Describe relative standing within a class or cohort.', 'Compare scores against their respective norm groups.', 'Interpret norm-referenced assessment results.'],
    formula: { expression: 'PR = 100 × (B + 0.5E) / N', explanation: 'B is the count below, E is the count tied, and N is the reference-group size. The 0.5E term places ties at their midpoint.' },
    educationApplication: 'Percentile rank is useful for norm-referenced interpretation. A PR of 75 means the score is around or above 75% of the reference group. Results depend on the selected norm group.',
    reportTip: 'Example: “The student’s percentile rank within this reference group was PR = 75.0.” Identify the reference group, sample size, and calculation method.',
    faq: [{ q: 'Does PR 80 mean a score of 80?', a: 'No. PR 80 is a relative position; it is not the raw score or percent correct.' }, { q: 'Does the tied count include the target person?', a: 'Yes. E should include everyone with the same score, including the target person.' }, { q: 'Can I use class size as N?', a: 'Yes, but the result then describes only that class and should not be treated as a school-wide or national norm.' }],
    labels: { below: 'Number below (B)', equal: 'Number tied (E)', total: 'Total group size (N)', calculate: 'Calculate PR', result: 'Percentile rank', invalid: 'Use valid whole-number counts and make sure B + E does not exceed N.' }, disclaimer: disclaimer.en, privacyNote: privacy.en,
  },
);

export const zScoreContent = content(
  {
    name: 'Z 分數計算器', short: '將原始分數轉換為相對於平均數的標準分數。', long: '輸入個人原始分數、群體平均數與標準差，計算該分數距離平均數多少個標準差。正值高於平均，負值低於平均。',
    seoTitle: 'Z 分數計算器｜標準分數公式與解讀', seoDescription: '輸入原始分數、平均數與標準差，線上計算 Z 分數並取得教育應用與 APA 報告提示。', keywords: ['Z分數', '標準分數', 'z score calculator', '教育統計'],
    instructions: ['輸入欲轉換的原始分數 X。', '輸入參照群體平均數與標準差。', '按下計算並依正負號與絕對值解讀相對位置。'], examples: ['比較不同科目或量尺的相對表現。', '檢視某分數距離班級平均數多遠。', '作為 T 分數或其他標準分數轉換的中間值。'],
    formula: { expression: 'z = (X − M) / SD', explanation: 'X 為原始分數，M 為平均數，SD 為標準差；SD 必須大於 0。' }, educationApplication: 'Z 分數將不同量尺轉成共同的標準差單位，但不會自動使資料符合常態分配。解讀極端分數時仍需檢查分配形狀與樣本大小。', reportTip: '可寫成：「該生原始分數為 X = 82，在班級分布中為 z = 1.20。」建議同時報告平均數 M 與標準差 SD。',
    faq: [{ q: 'Z 分數為 0 代表什麼？', a: '代表原始分數剛好等於所輸入的平均數。' }, { q: 'Z 分數可以是負數嗎？', a: '可以。負值表示原始分數低於平均數。' }, { q: '這會把資料變成常態分配嗎？', a: '不會。標準化只改變中心與尺度，不改變原始分配形狀。' }],
    labels: { score: '原始分數（X）', mean: '平均數（M）', sd: '標準差（SD）', calculate: '計算 Z 分數', result: 'Z 分數', invalid: '請輸入有效數字，且標準差必須大於 0。' }, disclaimer: disclaimer.zh, privacyNote: privacy.zh,
  },
  {
    name: 'Z Score Calculator', short: 'Convert a raw score into standard deviations from the mean.', long: 'Enter a raw score, reference mean, and standard deviation to calculate how many standard deviations the score lies above or below the mean.',
    seoTitle: 'Z Score Calculator | Formula and Interpretation', seoDescription: 'Calculate a z score from a raw score, mean, and standard deviation, with education and APA reporting guidance.', keywords: ['z score calculator', 'standard score', 'education statistics'],
    instructions: ['Enter the raw score X.', 'Enter the reference-group mean and standard deviation.', 'Calculate and interpret the sign and magnitude.'], examples: ['Compare relative performance across different scales.', 'Describe distance from a class mean.', 'Prepare a value for T-score or other standard-score conversion.'],
    formula: { expression: 'z = (X − M) / SD', explanation: 'X is the raw score, M is the mean, and SD is the standard deviation. SD must be greater than zero.' }, educationApplication: 'Z scores place different scales in standard-deviation units, but standardization does not make a non-normal distribution normal. Check distribution shape and sample size when interpreting extremes.', reportTip: 'Example: “The student scored X = 82, corresponding to z = 1.20 in the class distribution.” Also report M and SD.',
    faq: [{ q: 'What does z = 0 mean?', a: 'The raw score equals the entered mean.' }, { q: 'Can a z score be negative?', a: 'Yes. A negative z score lies below the mean.' }, { q: 'Does this make data normally distributed?', a: 'No. Standardization changes center and scale, not distribution shape.' }],
    labels: { score: 'Raw score (X)', mean: 'Mean (M)', sd: 'Standard deviation (SD)', calculate: 'Calculate z score', result: 'Z score', invalid: 'Enter valid numbers and use a standard deviation greater than zero.' }, disclaimer: disclaimer.en, privacyNote: privacy.en,
  },
);

export const tScoreContent = content(
  {
    name: 'T 分數計算器', short: '將 Z 分數轉換為平均 50、標準差 10 的 T 分數。', long: '輸入 Z 分數即可轉換為常用的 T 分數量尺。T 分數通常以 50 為平均數、10 為標準差，方便學生、老師或教甄備考者用同一參照群體比較相對位置。',
    seoTitle: 'T 分數計算器｜Z 分數轉 T 分數', seoDescription: '使用 T = 50 + 10z 將 Z 分數轉為 T 分數，附公式、教育應用與報告提示。', keywords: ['T分數', 'Z分數轉換', '標準分數'],
    contentSections: [
      {
        heading: 'T 分數是什麼',
        paragraphs: [
          'T 分數是一種由 Z 分數線性轉換而來的標準分數，常見設定是平均數 50、標準差 10。它保留「高於或低於平均多少個標準差」的資訊，但用較容易閱讀的數字呈現。',
          '公式是 T = 50 + 10 × z；z = 0 會得到 T = 50，z = 1 會得到 T = 60，z = -1 會得到 T = 40。',
          '在台灣，學生與老師常會在心理與教育測驗、班級成績分析、教師甄試或標準分數報表中看到 T 分數。實際採用的常模、方向與換算規則仍要以測驗手冊、學校規定或正式簡章為準。',
        ],
        items: [
          '範例：某次測驗原始分數 82 分，參照群體平均數 70、標準差 10，先算 z = (82 − 70) / 10 = 1.2。',
          '再代入 T = 50 + 10 × 1.2，得到 T = 62，表示比該參照群體平均高 1.2 個標準差。',
        ],
      },
    ],
    instructions: ['確認你手上的數值是 Z 分數；若只有原始分數，先用平均數與標準差算出 Z 分數。', '把 Z 分數輸入欄位，按下「轉換為 T 分數」。', '用平均 50、標準差 10 的量尺解讀結果；50 約為參照群體平均。', '正式報告或考試資料請再核對常模來源與轉換規則。'], examples: ['轉換心理與教育測驗的標準分數。', '以較直觀的正數量尺呈現相對表現。', '在使用相同常模時比較不同測驗結果。'],
    formula: { expression: 'T = 50 + 10z', explanation: '此線性轉換使 z = 0 對應 T = 50，每增加 1 個標準差，T 分數增加 10。' }, educationApplication: 'T 分數常用於心理與教育測驗，但必須確認測驗手冊採用的 T 分數定義與常模。有些領域使用不同方向或不同轉換規則。', reportTip: '可寫成：「依平均數 50、標準差 10 的 T 分數量尺轉換後，個案得分為 T = 62.0。」並交代原始 z 值或常模來源。',
    faq: [
      { q: 'T 分數是什麼？', a: 'T 分數是由 Z 分數轉換而來的標準分數，常見量尺平均數為 50、標準差為 10。它用來描述某個分數在參照群體中的相對位置，而不是原始得分。' },
      { q: 'T 分數 50 代表什麼？', a: '在 T = 50 + 10z 的量尺下，T 分數 50 代表 z = 0，也就是剛好等於參照群體平均數。高於 50 通常表示高於平均，低於 50 通常表示低於平均。' },
      { q: 'T 分數越高越好嗎？', a: '不一定，要看測驗或指標定義。有些測驗高分代表能力或表現較高，但也有量表高分代表症狀、風險或需求較高，解讀時要看測驗說明。' },
      { q: 'T 分數是滿分 100 或百分比嗎？', a: '不是。T 分數是標準分數量尺，不是百分制成績，也不是答對百分比。T 分數可能高於 100 或低於 0，只是一般常見資料不一定會出現這麼極端的值。' },
      { q: '沒有 Z 分數可以算 T 分數嗎？', a: '若只有原始分數，必須先知道同一參照群體的平均數與標準差，先算 z = (X − M) / SD。沒有平均數、標準差或常模來源時，無法正確換算 T 分數。' },
      { q: 'T 分數和 PR 百分等級可以直接換算嗎？', a: '一般不能直接換算，因為 PR 需要知道分數在參照群體中的累積位置。若假設常態分配且常模相同，可以用統計表或軟體估算近似 PR，但正式報告仍應使用原始常模或官方轉換表。' },
    ],
    labels: { z: 'Z 分數', calculate: '轉換為 T 分數', result: 'T 分數', invalid: '請輸入有效的 Z 分數。' }, disclaimer: disclaimer.zh, privacyNote: privacy.zh,
  },
  {
    name: 'T Score Calculator', short: 'Convert a z score to a T score with mean 50 and SD 10.', long: 'Enter a z score to convert it to the commonly used T-score scale, centered at 50 with a standard deviation of 10. The scale helps students, teachers, and exam candidates read relative standing within the same reference group.',
    seoTitle: 'T Score Calculator | Convert Z Score to T Score', seoDescription: 'Convert a z score with T = 50 + 10z and review education and reporting guidance.', keywords: ['T score calculator', 'z to T score', 'standard score'],
    contentSections: [
      {
        heading: 'What a T score means',
        paragraphs: [
          'A T score is a standard score created by linearly transforming a z score. The common scale uses a mean of 50 and a standard deviation of 10, so it keeps the relative-position meaning of z while using easier numbers.',
          'The formula is T = 50 + 10 × z. A z score of 0 becomes T = 50, z = 1 becomes T = 60, and z = -1 becomes T = 40.',
          'Students and teachers may see T scores in educational tests, psychology reports, standardized score tables, and teacher-exam preparation. Always confirm the relevant norm group, direction, and conversion rule from the test manual or official notice.',
        ],
        items: [
          'Example: if a raw score is 82, the reference mean is 70, and the standard deviation is 10, then z = (82 − 70) / 10 = 1.2.',
          'Using T = 50 + 10 × 1.2 gives T = 62, meaning the score is 1.2 standard deviations above that reference-group mean.',
        ],
      },
    ],
    instructions: ['Confirm that the value you have is a z score, or calculate z first from a raw score, mean, and standard deviation.', 'Enter the z score and run the conversion.', 'Read the result on a mean-50, SD-10 scale; 50 is the reference-group mean.', 'For formal reporting, recheck the norm source and conversion rule.'], examples: ['Convert psychological or educational standard scores.', 'Present relative standing on a mostly positive scale.', 'Compare tests that use the same norming basis.'],
    formula: { expression: 'T = 50 + 10z', explanation: 'This linear transformation maps z = 0 to T = 50; each standard deviation changes T by 10.' }, educationApplication: 'T scores are common in psychological and educational testing. Confirm the test manual’s definition and norms because some fields use different directions or conversions.', reportTip: 'Example: “On the T-score scale (M = 50, SD = 10), the score was T = 62.0.” State the original z score or norm source.',
    faq: [
      { q: 'What is a T score?', a: 'A T score is a standard score converted from a z score, commonly using a mean of 50 and a standard deviation of 10. It describes relative position within a reference group, not the raw score itself.' },
      { q: 'What does T = 50 mean?', a: 'With T = 50 + 10z, T = 50 means z = 0. The score is exactly at the reference-group mean on that scale.' },
      { q: 'Is a higher T score always better?', a: 'Not always. In some tests a higher T score means higher performance, while in other scales it can mean higher symptoms, risk, or need, so the test definition matters.' },
      { q: 'Is a T score a percentage or a score out of 100?', a: 'No. A T score is a standard-score scale, not percent correct or a 0 to 100 grade. It can theoretically go above 100 or below 0 for extreme z scores.' },
      { q: 'Can I calculate T without a z score?', a: 'If you only have a raw score, you first need the matching reference mean and standard deviation to calculate z = (X − M) / SD. Without the mean, SD, or norm source, the T score cannot be calculated correctly.' },
      { q: 'Can T score and percentile rank be converted directly?', a: 'Usually not directly, because percentile rank depends on the cumulative position in a reference distribution. Under a normal-distribution assumption with the same norm group, an approximate percentile can be estimated, but formal reports should use the official norm table.' },
    ],
    labels: { z: 'Z score', calculate: 'Convert to T score', result: 'T score', invalid: 'Enter a valid z score.' }, disclaimer: disclaimer.en, privacyNote: privacy.en,
  },
);

export const weightedAverageContent = content(
  {
    name: '加權平均計算器', short: '依各項數值與權重計算加權平均。', long: '逐列輸入數值與正數權重，工具會計算權重總和、加權總和與加權平均。權重可使用比例、百分比或學分，只要各列單位一致即可。',
    seoTitle: '加權平均計算器｜分數、權重與公式', seoDescription: '免費計算數值與權重的加權平均，支援多列輸入並附教育應用與報告提示。', keywords: ['加權平均', '權重計算', 'weighted average calculator'],
    instructions: ['每列輸入一個數值與對應權重。', '需要時新增或移除列。', '按下計算取得權重總和與加權平均。'], examples: ['依作業、期中與期末比例估算總成績。', '依學分計算課程平均。', '整合多位評分者或多項指標。'],
    formula: { expression: 'x̄w = Σ(wᵢxᵢ) / Σwᵢ', explanation: 'xᵢ 是第 i 個數值，wᵢ 是其正數權重。權重不必加總為 1 或 100，但必須使用一致單位。' }, educationApplication: '加權平均適合各評量項目比重不同的情境。設定權重前應先確認評分規準，並避免把缺漏成績在未說明下當作 0。', reportTip: '可寫成：「總成績依作業 30%、期中 30% 與期末 40% 加權計算，加權平均為 84.6 分。」清楚列出各權重。',
    faq: [{ q: '權重一定要加總為 100 嗎？', a: '不用。只要權重皆為正數且單位一致，公式會除以權重總和。' }, { q: '可以使用學分當權重嗎？', a: '可以，例如以各科學分作為權重計算學期平均。' }, { q: '空白列如何處理？', a: '空白或無效列會被忽略；權重為 0 或負數的列不會納入。' }],
    labels: { value: '數值', weight: '權重', add: '新增一列', remove: '移除', calculate: '計算加權平均', result: '加權平均', weightTotal: '權重總和', weightedSum: '加權總和', invalid: '請至少輸入一列有效數值與大於 0 的權重。' }, disclaimer: disclaimer.zh, privacyNote: privacy.zh,
  },
  {
    name: 'Weighted Average Calculator', short: 'Calculate a weighted mean from values and weights.', long: 'Enter values and positive weights to calculate the weight total, weighted sum, and weighted average. Weights may be proportions, percentages, or credits as long as units are consistent.',
    seoTitle: 'Weighted Avg Calculator | Values, Weights & Formula', seoDescription: 'Calculate a weighted average from multiple values and weights with education and reporting guidance.', keywords: ['weighted average calculator', 'weighted mean', 'grade weights'],
    instructions: ['Enter one value and its weight per row.', 'Add or remove rows as needed.', 'Calculate the weight total and weighted mean.'], examples: ['Combine assignments, midterms, and finals.', 'Calculate a credit-weighted course average.', 'Combine ratings or indicators with different importance.'],
    formula: { expression: 'x̄w = Σ(wᵢxᵢ) / Σwᵢ', explanation: 'xᵢ is each value and wᵢ is its positive weight. Weights need not total 1 or 100, but units must be consistent.' }, educationApplication: 'Use weighted means when assessment components have different importance. Define weights from an explicit grading policy and do not silently treat missing work as zero.', reportTip: 'Example: “The final score was weighted as assignments 30%, midterm 30%, and final exam 40%, yielding a weighted mean of 84.6.”',
    faq: [{ q: 'Must weights total 100?', a: 'No. The formula divides by the weight total; just use consistent positive units.' }, { q: 'Can credits be weights?', a: 'Yes. Course credits can weight a semester average.' }, { q: 'What happens to blank rows?', a: 'Blank or invalid rows are ignored, as are rows with zero or negative weights.' }],
    labels: { value: 'Value', weight: 'Weight', add: 'Add row', remove: 'Remove', calculate: 'Calculate weighted average', result: 'Weighted average', weightTotal: 'Weight total', weightedSum: 'Weighted sum', invalid: 'Enter at least one valid value with a weight greater than zero.' }, disclaimer: disclaimer.en, privacyNote: privacy.en,
  },
);

export const classRankContent = content(
  {
    name: '排名百分比計算器', short: '依班級名次與總人數估算排名百分等級。', long: '輸入名次（第 1 名為最佳）與班級總人數，以名次區間中點估算百分等級，並顯示大約位於前百分之多少。',
    seoTitle: '班級排名百分比計算器｜名次轉 PR', seoDescription: '依班級名次和總人數估算百分等級與前百分比，附公式與教育應用說明。', keywords: ['排名百分比', '班級名次', 'class rank percentile'],
    contentSections: [
      {
        heading: '速答：班級名次怎麼換成百分等級',
        paragraphs: [
          '排名百分比可用 PR = 100 × (N − r + 0.5) / N 估算；例如 40 人班第 6 名，PR = 86.3，約位於前 15%，表示這個名次高於班內多數參照群體。',
        ],
      },
    ],
    instructions: ['輸入班級名次，第 1 名代表最高。', '輸入班級或參照群體總人數。', '計算百分等級與前百分比。'], examples: ['將班級名次轉為較容易跨班理解的相對位置。', '初步說明升學資料中的班排比例。', '追蹤同一參照群體內的相對變化。'],
    formula: { expression: 'PR = 100 × (N − r + 0.5) / N', explanation: 'r 為名次（1 最佳），N 為總人數；0.5 是將單一名次放在其百分區間中點的修正。前百分比則以 100 × r / N 粗估。' }, educationApplication: '排名百分比會受班級規模與群體組成影響。申請或正式認證若有指定算法，應以該單位規則為準，尤其要確認同名次的處理方式。', reportTip: '可寫成：「該生在 40 人班級中排名第 6，依中點法估算 PR = 86.3。」並註明這是班內相對位置。',
    faq: [{ q: '第 1 名為什麼不是 PR 100？', a: '中點法將每個名次放在所代表區間的中點，因此有限群體的最高名次會略低於 100。' }, { q: '同名次怎麼處理？', a: '本簡易工具未納入同名次人數；正式用途請依學校或申請單位規則。' }, { q: '前 10% 和 PR 90 一樣嗎？', a: '概念接近但算法與四捨五入可能不同，正式門檻應以規定為準。' }],
    labels: { rank: '目前名次（r）', total: '總人數（N）', calculate: '計算排名百分比', result: '百分等級（PR）', top: '約位於前百分比', invalid: '名次與總人數必須是正整數，且名次不可超過總人數。' }, disclaimer: disclaimer.zh, privacyNote: privacy.zh,
  },
  {
    name: 'Class Rank Percentile Calculator', short: 'Estimate class-rank percentile from rank and class size.', long: 'Enter rank (1 is best) and class size to estimate percentile rank using a rank-interval midpoint, plus a rough top-percent figure.',
    seoTitle: 'Class Rank Calculator | Rank to Percentile', seoDescription: 'Convert class rank and class size to an estimated percentile rank and top percentage.', keywords: ['class rank percentile calculator', 'rank percentage', 'education statistics'],
    contentSections: [
      {
        heading: 'Quick answer: convert class rank to percentile',
        paragraphs: [
          'Class-rank percentile can be estimated with PR = 100 × (N − r + 0.5) / N; for example, rank 6 in a class of 40 gives PR = 86.3 and an approximate top 15% position.',
        ],
      },
    ],
    instructions: ['Enter the rank, with 1 as the highest.', 'Enter the class or reference-group size.', 'Calculate percentile rank and top percentage.'], examples: ['Express class rank as a relative position.', 'Interpret rank information in application records.', 'Track relative change within the same cohort.'],
    formula: { expression: 'PR = 100 × (N − r + 0.5) / N', explanation: 'r is rank (1 is best), N is group size, and 0.5 places each rank at the midpoint of its percentile interval. Top percent is approximated by 100 × r / N.' }, educationApplication: 'Class-rank percentages depend on cohort size and composition. For admissions or certification, follow the official method, especially its treatment of tied ranks.', reportTip: 'Example: “The student ranked 6th in a class of 40, corresponding to an estimated PR = 86.3 using the midpoint method.”',
    faq: [{ q: 'Why is first place not PR 100?', a: 'The midpoint method locates each rank at the center of its interval, so the top rank in a finite group falls just below 100.' }, { q: 'How are tied ranks handled?', a: 'This simple tool does not model ties. Follow the school or receiving organization’s rule for formal use.' }, { q: 'Is top 10% exactly the same as PR 90?', a: 'They are related, but formulas and rounding can differ. Use the stated official threshold.' }],
    labels: { rank: 'Rank (r)', total: 'Class size (N)', calculate: 'Calculate rank percentile', result: 'Percentile rank (PR)', top: 'Approximate top percentage', invalid: 'Rank and class size must be positive whole numbers, and rank cannot exceed class size.' }, disclaimer: disclaimer.en, privacyNote: privacy.en,
  },
);

export const normalizedScoreContent = content(
  {
    name: '常態化分數轉換工具', short: '將原始分數線性轉換到指定平均數與標準差。', long: '先將原始分數換算成 Z 分數，再映射到你指定的目標平均數與標準差。這是線性標準化，不會把偏態資料「變成常態分配」。',
    seoTitle: '常態化分數轉換工具｜原始分數轉標準分數', seoDescription: '設定原始與目標平均數、標準差，線性轉換分數並查看 Z 分數與公式。', keywords: ['常態化分數', '標準分數轉換', 'normalized score converter'],
    instructions: ['輸入原始分數、原群體平均數與標準差。', '設定目標量尺的平均數與標準差。', '計算 Z 分數與轉換後分數。'], examples: ['將不同測驗結果轉到共同量尺。', '模擬平均 50、標準差 10 的分數。', '教學示範線性標準化的效果。'],
    formula: { expression: 'z = (X − M) / SD；Y = Mₜ + z × SDₜ', explanation: '先取得原始量尺的 z，再用目標平均數 Mₜ 與目標標準差 SDₜ 轉成新分數 Y。兩個標準差都必須大於 0。' }, educationApplication: '此工具適合教學與同一參照架構下的分數轉換。不同測驗若測量內容、信度或常模不同，即使轉到相同量尺也不代表可完全互換。', reportTip: '可寫成：「原始分數依原量尺 M = 70、SD = 8 標準化後，再轉換至 M = 50、SD = 10 的量尺。」並報告轉換後分數。',
    faq: [{ q: '這是真正的常態化嗎？', a: '這是線性標準化，不會改變分配形狀。百分位常態化等非線性程序需要完整分布資料。' }, { q: '可以轉成 T 分數嗎？', a: '可以，將目標平均數設為 50、目標標準差設為 10。' }, { q: '轉換後可以超過目標平均數很多嗎？', a: '可以。線性轉換沒有固定上下限，極端原始 z 值會得到極端目標分數。' }],
    labels: { score: '原始分數（X）', mean: '原平均數（M）', sd: '原標準差（SD）', targetMean: '目標平均數', targetSd: '目標標準差', calculate: '轉換分數', result: '轉換後分數', zResult: '對應 Z 分數', invalid: '請輸入有效數字，且原標準差與目標標準差都必須大於 0。' }, disclaimer: disclaimer.zh, privacyNote: privacy.zh,
  },
  {
    name: 'Normalized Score Converter', short: 'Linearly convert a raw score to a target mean and standard deviation.', long: 'Standardize a raw score to z, then map it to a target mean and standard deviation. This is a linear standard-score conversion; it does not make a skewed distribution normal.',
    seoTitle: 'Normalized Score Converter | Standard Score Tool', seoDescription: 'Convert a raw score to a target mean and standard deviation, with z score, formula, and reporting guidance.', keywords: ['normalized score converter', 'standard score transformation', 'linear standardization'],
    instructions: ['Enter the raw score, original mean, and original SD.', 'Set the target mean and target SD.', 'Calculate z and the converted score.'], examples: ['Place different test results on a common scale.', 'Model a mean-50, SD-10 score.', 'Teach the effect of linear standardization.'],
    formula: { expression: 'z = (X − M) / SD; Y = Mₜ + z × SDₜ', explanation: 'First compute z on the original scale, then use target mean Mₜ and target SD SDₜ to obtain Y. Both SDs must be positive.' }, educationApplication: 'Useful for teaching and transformations under a shared reference framework. Scores from tests with different constructs, reliability, or norms are not automatically interchangeable after rescaling.', reportTip: 'Example: “Scores were standardized using the original M = 70 and SD = 8, then transformed to a scale with M = 50 and SD = 10.” Report the converted value.',
    faq: [{ q: 'Does this normalize the distribution?', a: 'It performs linear standardization and does not change distribution shape. Percentile-based normalizing requires the full distribution.' }, { q: 'Can this produce T scores?', a: 'Yes. Set target mean to 50 and target SD to 10.' }, { q: 'Can converted scores be extreme?', a: 'Yes. A linear transformation has no fixed bounds.' }],
    labels: { score: 'Raw score (X)', mean: 'Original mean (M)', sd: 'Original SD', targetMean: 'Target mean', targetSd: 'Target SD', calculate: 'Convert score', result: 'Converted score', zResult: 'Corresponding z score', invalid: 'Enter valid numbers and use positive original and target standard deviations.' }, disclaimer: disclaimer.en, privacyNote: privacy.en,
  },
);

export const teacherExamContent = content(
  {
    name: '教師甄試成績轉換模擬器', short: '依筆試、口試與試教權重模擬加權總成績。', long: '輸入筆試、口試與試教成績及各自權重，模擬加權總分。各縣市、學校與年度規則可能不同，請以正式簡章為準。',
    seoTitle: '教甄成績計算器｜免費試算筆試口試試教加權分數', seoDescription: '免費教師甄試成績計算器，輸入筆試、口試、試教分數與權重，立即算出加權總成績與名次參考。', keywords: ['教師甄試成績', '教甄分數計算', '教師甄試加權'],
    instructions: ['輸入筆試、口試與試教分數。', '依當年度正式簡章填入各項權重。', '確認權重總和後計算模擬總成績。'], examples: ['比較不同複試表現對總成績的影響。', '依簡章權重設定準備目標。', '進行情境模擬，不作為正式錄取判定。'],
    formula: { expression: '總成績 = Σ(各項成績 × 各項權重) / Σ權重', explanation: '本工具使用一般加權平均。若簡章另有門檻、倍率、原始分數轉換、加分或四捨五入規則，必須另外套用。' }, educationApplication: '可用於備考情境分析，例如估算筆試固定時試教提升 5 分對總成績的影響。正式結果仍須依主辦單位簡章、最低門檻及同分比序規則。', reportTip: '若用於備考紀錄，可寫成：「依筆試 40%、試教 40%、口試 20% 模擬，加權總成績為 82.4。」這不是正式 APA 統計結果，應註明為情境估算。',
    faq: [{ q: '權重一定要照預設值嗎？', a: '不用。請依你報考年度與主辦單位的正式簡章修改。' }, { q: '有處理加分或最低門檻嗎？', a: '沒有。本工具只做一般加權平均，特殊規則需另行判斷。' }, { q: '可以拿來預測錄取嗎？', a: '不建議。缺額、競爭者分布、門檻與比序都會影響結果。' }],
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
    labels: { group1: '第一組', group2: '第二組', n: '樣本數（N）', mean: '平均數（M）', sd: '樣本標準差（SD）', calculate: '執行 Welch t 檢定', difference: '平均差（M₁ − M₂）', result: 't 值', df: '自由度（df）', p: '雙尾 p 值', invalid: '兩組樣本數須為大於 1 的整數，標準差須大於 0，其他欄位須為有效數字。' }, disclaimer: disclaimer.zh, privacyNote: privacy.zh,
  },
  {
    name: 'Independent Samples t-test Calculator', short: 'Run a Welch independent-samples t test from summary statistics.', long: 'Enter N, mean, and sample SD for two independent groups to calculate the mean difference, Welch t, approximate degrees of freedom, and two-tailed p value.',
    seoTitle: 'Independent Samples t-test Calculator | Welch t Test', seoDescription: 'Calculate a Welch independent-samples t test from two groups’ sample sizes, means, and standard deviations.', keywords: ['independent samples t test calculator', 'Welch t test', 'two sample t test'],
    instructions: ['Enter sample size, mean, and sample SD for both groups.', 'Confirm observations are independent between groups.', 'Interpret the difference, t, df, and two-tailed p together.'], examples: ['Compare mean scores under two teaching methods.', 'Compare treatment and control group means.', 'Check formal software output from summary statistics.'],
    formula: { expression: 't = (M₁ − M₂) / √(s₁²/n₁ + s₂²/n₂)', explanation: 'Degrees of freedom use the Welch–Satterthwaite approximation; p is calculated from the t distribution. s₁ and s₂ are sample SDs.' }, educationApplication: 'Use for means from two independent groups. Check independence, outliers, and distribution shape, especially with small or heavily skewed samples. Statistical significance is not the same as educational importance.', reportTip: 'APA example: “Group A (M = 78.4, SD = 8.2) scored higher than Group B (M = 73.1, SD = 9.5), Welch’s t(59.6) = 2.36, p = .022.” Formal reports should add a confidence interval and effect size.',
    faq: [{ q: 'Why use Welch’s t test?', a: 'It does not require equal group variances and is generally more robust than the pooled-variance version.' }, { q: 'Can I enter population SDs?', a: 'This calculator expects sample standard deviations.' }, { q: 'Does p < .05 mean a large effect?', a: 'No. p also depends on sample size; inspect the difference, confidence interval, and effect size.' }],
    labels: { group1: 'Group 1', group2: 'Group 2', n: 'Sample size (N)', mean: 'Mean (M)', sd: 'Sample SD', calculate: 'Run Welch t test', difference: 'Mean difference (M₁ − M₂)', result: 't statistic', df: 'Degrees of freedom', p: 'Two-tailed p value', invalid: 'Both sample sizes must be whole numbers above 1, SDs must be positive, and all fields must be valid numbers.' }, disclaimer: disclaimer.en, privacyNote: privacy.en,
  },
);
