import type { ToolContent } from './_types';

export default {
  zh: {
    name: '成績平均計算器強化版',
    short: '計算成績總分、簡單平均與加權平均。',
    long: '成績平均計算器可輸入多筆作業、測驗、考試或活動分數，並依需要加入權重。工具會忽略空白或無效列，立即顯示有效項目數、總分、簡單平均與加權平均，適合老師整理成績、學生估算學期表現，或家長快速理解各項分數比例。',
    seoTitle: '成績平均計算器｜免費快速算總分與加權平均',
    seoDescription: '免費成績平均計算器，輸入多筆分數與權重，立即算出總分、簡單平均與加權平均，老師學生皆適用。',
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
      '比較不同評分比例下的加權平均差異。',
    ],
    audience: [
      '需要快速整理作業、小考、期中與期末成績的老師與助教。',
      '想估算目前學期表現，理解哪些項目影響較大的學生。',
      '協助孩子檢視分數結構、但不想手動試算權重的家長。',
      '需要把計算摘要複製到紀錄、訊息或簡報中的教學行政人員。',
    ],
    caseStudies: [
      {
        title: '小考平均整理',
        description: '老師輸入多次小考分數，先查看簡單平均，再把結果複製到課堂紀錄，快速掌握學生近期表現。',
      },
      {
        title: '期末成績估算',
        description: '學生把作業、期中、期末分數分別輸入不同權重，估算目前可能的加權平均，了解後續需要加強的項目。',
      },
      {
        title: '家長會前分數說明',
        description: '導師用計算摘要呈現有效項目、總分與平均，讓家長能看見分數組成，而不是只看到單一總結數字。',
      },
    ],
    notes: [
      '計算結果僅供整理與估算，正式成績仍應以學校、課程或教師公布的評分規則為準。',
      '加權平均只使用同時有有效分數與正數權重的列；沒有有效權重時會顯示尚未輸入有效權重。',
      '工具可複製計算摘要為文字，也可匯出 CSV 表格（含各筆分數、權重與平均），方便用試算表整理；目前沒有 Excel 或圖片檔案匯出。',
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
      {
        q: '權重要輸入百分比嗎？',
        a: '不一定。你可以輸入 1、2、3 這類相對權重，也可以輸入 20、30、50 這類比例數字；工具會依權重總和換算。',
      },
      {
        q: '這個結果可以當作正式成績嗎？',
        a: '不建議直接當作正式成績。請以學校系統、課程規定、教師公告或實際評分表為準。',
      },
    ],
    labels: {
      score: '分數',
      weight: '權重（選填）',
      addRow: '新增一列',
      remove: '移除',
      copy: '複製結果',
      exportCsv: '匯出 CSV',
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
    long: 'Grade Average Calculator accepts multiple homework, quiz, exam, or activity scores with optional weights. It ignores blank or invalid rows and immediately shows valid item count, score sum, simple average, and weighted average. Use it to organize classroom records, estimate term performance, or explain how score categories affect a result.',
    seoTitle: 'Grade Average Calculator | Simple & Weighted Grades',
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
      'Compare how different grading weights affect the weighted average.',
    ],
    audience: [
      'Teachers and assistants organizing assignment, quiz, midterm, and final exam scores.',
      'Students estimating current term performance and understanding weighted categories.',
      'Parents reviewing score structure without manually calculating weighted averages.',
      'School staff who need to copy a short calculation summary into notes or messages.',
    ],
    caseStudies: [
      {
        title: 'Quiz average summary',
        description: 'A teacher enters several quiz scores, checks the simple average, and copies the summary into class records to review recent performance.',
      },
      {
        title: 'Term grade estimate',
        description: 'A student enters homework, midterm, and final exam scores with their weights to estimate a weighted average and see which category matters most.',
      },
      {
        title: 'Parent meeting explanation',
        description: 'A homeroom teacher uses the copied summary to show valid item count, total, and average so parents can understand the score mix more clearly.',
      },
    ],
    notes: [
      'Results are for organization and estimation only; official grades should follow the school, course, or teacher grading policy.',
      'The weighted average uses only rows with both a valid score and a positive weight; without valid weights, the tool shows the no-weight message.',
      'The tool copies a plain-text summary and can export a CSV table (scores, weights, and averages); it does not export Excel or image files.',
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
      {
        q: 'Do weights need to be percentages?',
        a: 'No. You can enter relative weights such as 1, 2, and 3, or percentage-like values such as 20, 30, and 50. The tool calculates by the total weight entered.',
      },
      {
        q: 'Can this result be used as an official grade?',
        a: 'Do not treat it as an official grade by itself. Follow your school system, course policy, teacher notice, or grading sheet.',
      },
    ],
    labels: {
      score: 'Score',
      weight: 'Weight (optional)',
      addRow: 'Add row',
      remove: 'Remove',
      copy: 'Copy result',
      exportCsv: 'Export CSV',
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
