interface ToolContent {
  name: string;
  short: string;
  long: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  instructions: string[];
  examples: string[];
  faq: { q: string; a: string }[];
  labels: Record<string, string>;
  formula?: { expression: string; explanation: string };
  educationApplication?: string;
  reportTip?: string;
  disclaimer?: string;
  privacyNote?: string;
}

export default {
  zh: {
    name: '成績平均計算器強化版',
    short: '計算成績總分、簡單平均與加權平均。',
    long: '成績平均計算器可新增多列分數，每列可選填權重。工具會忽略空白或無效列，並同時計算有效項目數、總分、簡單平均，以及有權重時的加權平均。',
    seoTitle: '成績平均計算器強化版｜簡單平均與加權平均',
    seoDescription: '免費成績平均計算器，可新增多筆分數與權重，計算總分、平均與加權平均。',
    keywords: ['成績平均', '加權平均', '平均計算器', 'grade average'],
    instructions: [
      '輸入每次作業、測驗或考試的分數。',
      '若某些項目需要較高比重，可在權重欄輸入數字。',
      '新增或刪除列後，結果會自動更新。',
      '需要回報時，可複製計算摘要。',
    ],
    examples: [
      '計算多次小考的平均分數。',
      '用權重估算期中、期末與作業合併後的成績。',
      '整理學生個人成績紀錄時快速取得總分與平均。',
    ],
    formula: {
      expression: '簡單平均 = Σxᵢ / n；加權平均 = Σ(wᵢxᵢ) / Σwᵢ',
      explanation: 'xᵢ 為每筆有效成績，n 為有效成績筆數；有填正數權重時，wᵢ 為各成績權重。',
    },
    educationApplication: '可用於形成性評量、平時成績或學期成績的初步整理。若有缺考、補考、加分、最低門檻或特殊四捨五入規則，應先依正式評分規準處理。',
    reportTip: '可寫成：「本次 5 項評量的平均成績為 M = 84.2；依課程配分加權後為 86.0。」若是研究資料，建議另報標準差與有效樣本數。',
    faq: [
      {
        q: '空白列會算進去嗎？',
        a: '不會。沒有有效分數的列會被忽略，不影響平均。',
      },
      {
        q: '只有部分列有權重怎麼算？',
        a: '簡單平均會使用所有有效分數；加權平均只使用同時有有效分數與正數權重的列。',
      },
      {
        q: '分數可以超過 100 嗎？',
        a: '可以。工具不限制分數範圍，方便處理加分、百分制以外或自訂評分。',
      },
    ],
    labels: {
      score: '分數',
      weight: '權重（選填）',
      addRow: '新增一列',
      remove: '移除',
      copy: '複製結果',
      result: '計算結果',
      totalItems: '有效項目',
      sum: '總分',
      average: '簡單平均',
      weightedAverage: '加權平均',
      noWeights: '尚未輸入有效權重',
      noValidRows: '請輸入至少一筆有效分數。',
      copied: '已複製',
    },
    disclaimer: '本工具供教學與初步估算，不取代正式統計軟體或專業判斷。',
  },
  en: {
    name: 'Grade Average Calculator',
    short: 'Calculate simple and weighted averages from grade entries.',
    long: 'Add grade rows with optional weights and calculate total items, score sum, simple average, and weighted average. Empty or invalid rows are ignored so rough grade lists remain easy to work with.',
    seoTitle: 'Grade Average Calculator | Simple and weighted average',
    seoDescription: 'Calculate grade totals, simple averages, and weighted averages from scores and optional weights.',
    keywords: ['grade average calculator', 'weighted average', 'score average', 'average calculator'],
    instructions: [
      'Enter one score per row.',
      'Add a weight when some scores should count more than others.',
      'Add or remove rows as needed; results update automatically.',
      'Copy the summary when you need to share or save the calculation.',
    ],
    examples: [
      'Average several quiz or homework scores.',
      'Estimate a final grade from assignments, midterms, and final exams.',
      'Summarize score records with total, count, and average.',
    ],
    formula: {
      expression: 'Simple mean = Σxᵢ / n; weighted mean = Σ(wᵢxᵢ) / Σwᵢ',
      explanation: 'xᵢ is each valid score, n is the valid-score count, and wᵢ is a positive weight when supplied.',
    },
    educationApplication: 'Use this for preliminary summaries of formative assessments, coursework, or term grades. Apply official policies for missing work, retakes, bonus points, cutoffs, and rounding first.',
    reportTip: 'Example: “The mean across five assessments was M = 84.2; the course-weighted mean was 86.0.” For research data, also report the SD and valid sample size.',
    faq: [
      {
        q: 'Are blank rows included?',
        a: 'No. Rows without a valid score are ignored.',
      },
      {
        q: 'What if only some rows have weights?',
        a: 'The simple average uses all valid scores. The weighted average uses rows that have both a valid score and a positive weight.',
      },
      {
        q: 'Can scores be above 100?',
        a: 'Yes. The tool does not restrict score range, so bonus points and custom grading systems can be entered.',
      },
    ],
    labels: {
      score: 'Score',
      weight: 'Weight (optional)',
      addRow: 'Add row',
      remove: 'Remove',
      copy: 'Copy result',
      result: 'Result',
      totalItems: 'Valid items',
      sum: 'Sum',
      average: 'Simple average',
      weightedAverage: 'Weighted average',
      noWeights: 'No valid weights yet',
      noValidRows: 'Enter at least one valid score.',
      copied: 'Copied!',
    },
    disclaimer: 'This tool is for teaching and preliminary estimates. It does not replace formal statistical software or professional judgment.',
  },
} satisfies Record<'zh' | 'en', ToolContent>;
