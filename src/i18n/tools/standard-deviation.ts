import type { Locale } from '../../config/site';
import type { ToolContent } from './_types';

export default {
  zh: {
    name: '標準差計算器',
    short: '輸入一組數字，計算平均、中位數、變異數與標準差。',
    long: '標準差計算器可貼上或輸入一組數字（以逗號、空格或換行分隔），自動計算個數、總和、平均、中位數、眾數、最小值、最大值、全距，以及母體與樣本的變異數與標準差。所有運算都在你的瀏覽器本機完成，適合作業、報告與快速的資料檢查。',
    seoTitle: '標準差計算器｜平均、變異數與標準差線上計算',
    seoDescription: '免費標準差計算器，輸入一組數字即可計算平均、中位數、眾數、全距、母體與樣本變異數與標準差，瀏覽器本機運算。',
    keywords: ['標準差計算器', '變異數', '平均數', '中位數', 'standard deviation', 'variance calculator'],
    contentSections: [
      {
        heading: '母體、樣本公式與程式精度',
        paragraphs: [
          '程式先計算平均數 x̄，再把每筆資料與平均數的差平方後加總。母體變異數以 n 為分母，樣本變異數以 n−1 為分母；兩者的正平方根分別是母體與樣本標準差。若資料只有 1 筆，母體變異數仍可算為 0，但樣本分母會是 0，因此樣本變異數與樣本標準差顯示「--」，不會硬填成 0。',
          '所有統計量先以瀏覽器數值精度完成運算，顯示時才四捨五入到小數點後最多 4 位，尾端的 0 會省略。輸入可用逗號、空白或換行分隔；無法轉成有限數值的片段會被忽略。由於逗號是分隔符，本工具不把 3,5 解讀成小數 3.5。',
        ],
      },
      {
        heading: '段考成績的完整數字範例',
        paragraphs: [
          '若三位學生的分數是 60、70、80，平均數是 70，離均差平方和為 (60−70)²+(70−70)²+(80−70)²=200。把這三人視為完整班級母體時，母體變異數為 200÷3=66.6667，母體標準差約 8.165；若三人只是從年級抽出的樣本，樣本變異數為 200÷2=100，樣本標準差為 10。選哪一欄取決於資料角色，不是選較小或較好看的數字。',
        ],
      },
      {
        heading: '何時標準差會誤導',
        paragraphs: [
          '標準差會平方離均差，因此一筆輸入錯誤或極端值就可能大幅拉高結果。人數很少、分數呈雙峰、天花板效應明顯，或資料混合不同考卷與不同滿分時，只報一個平均與標準差會掩蓋重要差異；此時應先檢查原始分布、中位數、四分位距與資料來源。標準差也不會自行證明資料是常態分配。',
        ],
      },
      {
        heading: '中位數、眾數與輸入檢查也要一起看',
        paragraphs: [
          '程式會先排序資料求中位數；偶數筆時取中央兩數的平均。眾數只有在最高出現次數大於 1 時才顯示，若有多個值並列最高次數會全部列出。這些統計量能協助發現「平均相同但分布不同」的班級，例如 60、60、80、80 與 68、70、70、72 的平均都是 70，前者的分散程度卻明顯較大。正式使用前也應核對畫面上的有效個數是否等於原始資料筆數。',
        ],
      },
      {
        heading: '把班級標準差接到 T 分數解讀',
        paragraphs: [
          '確認平均數與標準差來自同一參照群體後，才能先算 Z 分數，再轉成平均 50、標準差 10 的 T 分數。',
        ],
        link: {
          prefix: '下一步可使用',
          label: 'T 分數計算器檢查標準分數換算',
          href: '/tools/t-score-calculator/',
          suffix: '；若只有名次與班級人數，則應改用排名百分比方法，不要假設常態分配硬轉。',
        },
      },
    ],
    instructions: [
      '在輸入框貼上或鍵入數字，可用逗號、空格或換行分隔。',
      '工具會自動忽略無法辨識為數字的內容。',
      '結果會即時更新，包含平均、中位數與標準差等統計量。',
      '需要時可複製完整的統計摘要。',
    ],
    examples: [
      '計算一組考試成績的平均與標準差。',
      '檢查實驗或量測數據的離散程度。',
      '比較母體標準差與樣本標準差的差異。',
    ],
    notes: [
      '本工具同時顯示母體與樣本結果，不會替你判定資料究竟是完整母體或抽樣資料。',
      '無效片段會被忽略；正式報告前請核對有效個數，避免把座號、缺值代碼或逗號小數誤當資料。',
      '極端值與長尾分布會強烈影響標準差，必要時應搭配中位數、四分位距、直方圖或原始分數檢查。',
    ],
    formula: {
      expression: 'σ² = Σ(xᵢ−x̄)²/n；s² = Σ(xᵢ−x̄)²/(n−1)；標準差 = √變異數',
      explanation: 'xᵢ 是第 i 筆有效數值，x̄ 是平均數，n 是有效筆數。σ² 與 σ 用於輸入資料就是完整母體時；s² 與 s 是以樣本估計變異時的 n−1 版本。',
    },
    educationApplication: '教師可用標準差描述班級分數是否集中，但它屬於常模參照的資料摘要，不是及格、精熟或待加強的標準參照門檻。向家長說明時，應同時提供平均數、有效人數、滿分與評量內容，避免把「離平均較遠」直接解讀成能力優劣。',
    reportTip: '可寫成：「本班 30 人，本次段考平均 74.2 分，母體標準差 8.6 分。」若這 30 人只是研究母群的一個樣本，則改報樣本標準差並說明抽樣方式。',
    sources: [
      {
        label: 'NIST Engineering Statistics Handbook：Measures of Scale',
        href: 'https://www.itl.nist.gov/div898/handbook/eda/section3/eda356.htm',
        note: '列出樣本變異數與樣本標準差的 n−1 公式，並說明極端尾端會影響標準差；本工具另依程式同時提供母體 n 版本。',
      },
    ],
    faq: [
      { q: '母體標準差與樣本標準差有什麼不同？', a: '母體標準差除以 n，樣本標準差除以 n−1。若你的數字是整個母體就看母體值，若只是抽樣就看樣本值。' },
      { q: '可以輸入小數或負數嗎？', a: '可以，工具支援小數與負數，只要是有效數字都會被納入計算。' },
      { q: '沒有眾數時會顯示什麼？', a: '若每個數字出現次數相同（沒有重複最多者），眾數會顯示為「無」。' },
      { q: '資料會被上傳嗎？', a: '不會，所有計算都在你的瀏覽器本機完成，數字不會送到伺服器。' },
      { q: '可以處理多少筆數字？', a: '一般作業與報告的資料量都沒問題，極大量資料可能受裝置效能影響。' },
    ],
    labels: {
      inputLabel: '輸入數字',
      hint: '用逗號、空格或換行分隔',
      placeholder: '例如：12, 15, 20, 22, 30',
      count: '個數',
      sum: '總和',
      mean: '平均數',
      median: '中位數',
      mode: '眾數',
      min: '最小值',
      max: '最大值',
      range: '全距',
      variancePopulation: '母體變異數',
      stdevPopulation: '母體標準差',
      varianceSample: '樣本變異數',
      stdevSample: '樣本標準差',
      copy: '複製結果',
      copied: '已複製',
      empty: '請輸入至少一個有效數字。',
      modeNone: '無',
    },
    privacyNote: '所有統計運算都在你的瀏覽器本機進行，輸入的數字不會上傳。',
  },
  en: {
    name: 'Standard Deviation Calculator',
    short: 'Compute mean, median, variance, and standard deviation from a set of numbers.',
    long: 'Paste or type a set of numbers separated by commas, spaces, or new lines, and this calculator returns the count, sum, mean, median, mode, min, max, range, plus population and sample variance and standard deviation. Everything runs locally in your browser, which is handy for homework, reports, and quick data checks.',
    seoTitle: 'Standard Deviation Calculator | Mean, Variance & SD',
    seoDescription: 'Free standard deviation calculator: enter numbers to get mean, median, mode, range, population and sample variance and standard deviation, processed locally.',
    keywords: ['standard deviation calculator', 'variance calculator', 'mean median mode', 'population sample standard deviation'],
    instructions: [
      'Paste or type numbers, separated by commas, spaces, or new lines.',
      'Anything that is not a valid number is ignored automatically.',
      'Results update instantly, including mean, median, and standard deviation.',
      'Copy the full summary when you need it.',
    ],
    examples: [
      'Find the mean and standard deviation of a set of exam scores.',
      'Check how spread out experimental or measurement data is.',
      'Compare population versus sample standard deviation.',
    ],
    faq: [
      { q: 'What is the difference between population and sample standard deviation?', a: 'Population SD divides by n; sample SD divides by n−1. Use the population value for a full population and the sample value for a sample.' },
      { q: 'Can I enter decimals or negative numbers?', a: 'Yes, decimals and negatives are supported as long as they are valid numbers.' },
      { q: 'What shows when there is no mode?', a: 'If no value repeats more than the others, the mode shows as "None".' },
      { q: 'Is my data uploaded?', a: 'No, all calculations run locally in your browser and numbers are not sent to a server.' },
      { q: 'How many numbers can it handle?', a: 'Typical homework and report data sets are fine; very large data may depend on your device.' },
    ],
    labels: {
      inputLabel: 'Enter numbers',
      hint: 'Separate with commas, spaces, or new lines',
      placeholder: 'e.g. 12, 15, 20, 22, 30',
      count: 'Count',
      sum: 'Sum',
      mean: 'Mean',
      median: 'Median',
      mode: 'Mode',
      min: 'Min',
      max: 'Max',
      range: 'Range',
      variancePopulation: 'Population variance',
      stdevPopulation: 'Population SD',
      varianceSample: 'Sample variance',
      stdevSample: 'Sample SD',
      copy: 'Copy result',
      copied: 'Copied!',
      empty: 'Enter at least one valid number.',
      modeNone: 'None',
    },
    privacyNote: 'All statistics run locally in your browser; the numbers you enter are not uploaded.',
  },
} satisfies Record<Locale, ToolContent>;
