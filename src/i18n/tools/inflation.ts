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
  disclaimer?: string;
  privacyNote?: string;
}

export default {
  zh: {
    name: '通膨購買力試算',
    short: '估算通膨對未來購買力的影響。',
    long: '通膨試算器用金額、年通膨率與年數估算未來成本或購買力。公式：未來成本 = 金額 × (1 + 年通膨率)^年數；未來購買力 = 金額 ÷ (1 + 年通膨率)^年數。',
    seoTitle: '通膨計算器｜購買力與未來成本試算',
    seoDescription: '輸入金額、年通膨率與年數，估算未來成本、未來購買力或過去年份等值金額。',
    keywords: ['通膨計算器', '購買力', 'inflation calculator', 'future value'],
    instructions: [
      '輸入目前金額、年通膨率與年數。',
      '選擇要估算未來成本、未來購買力或過去等值金額。',
      '查看調整後金額、差額與使用公式。',
      '複製摘要以便放入筆記或規劃表。',
    ],
    examples: [
      '估算現在 10,000 元在 5 年後大約需要多少才買得到同樣商品。',
      '查看固定預算在未來通膨後的購買力。',
      '把過去價格換算成接近現在或未來的等值金額。',
    ],
    formula: {
      expression: '未來成本 = 金額 × (1 + 年通膨率)^年數；未來購買力／過去等值 = 金額 ÷ (1 + 年通膨率)^年數',
      explanation: '年通膨率由使用者自行輸入，工具假設整段期間維持固定，不會自動讀取主計機關 CPI 或特定商品價格。負值代表通縮假設。',
    },
    faq: [
      {
        q: '試算結果準確嗎？',
        a: '公式會依輸入值計算，但固定通膨率只是簡化假設；不同商品、地區與年份的實際漲幅不會完全相同。',
      },
      {
        q: '可以作為正式財務決策依據嗎？',
        a: '不可以。結果適合做情境比較，正式預算、投資或退休規劃應搭配官方統計、實際報價與專業評估。',
      },
      {
        q: '為什麼實際金額可能不同？',
        a: '整體 CPI 不等於個別商品價格，匯率、供需、稅費、地區與消費組合也會造成差異。',
      },
      {
        q: '利率、稅率或費用改變時怎麼辦？',
        a: '請依最新官方統計或你的情境更新年通膨率後重新試算；若期間變化很大，可分成數段使用不同假設。',
      },
      {
        q: '年通膨率可以是負數嗎？',
        a: '可以。負值代表通縮假設，公式仍會照輸入值計算。',
      },
      {
        q: '這會使用官方 CPI 資料嗎？',
        a: '不會。工具只依你輸入的固定年率計算，不會連線取得資料。',
      },
      {
        q: '結果是投資建議嗎？',
        a: '不是。這只是數學估算，實際物價與匯率、稅費、商品差異都可能不同。',
      },
    ],
    labels: {
      amount: '金額',
      annualRate: '年通膨率 (%)',
      years: '年數',
      mode: '試算模式',
      futureCost: '未來成本',
      futureBuyingPower: '未來購買力',
      pastEquivalent: '過去等值',
      calculate: '試算',
      copy: '複製結果',
      reset: '重設',
      adjustedAmount: '調整後金額',
      change: '差額',
      formula: '使用公式',
      invalidInput: '請輸入有效數字，年數不可小於 0。',
      copied: '已複製',
    },
    disclaimer: '本工具試算結果僅供參考，不構成投資、稅務、法律、貸款或財務建議。實際金額、利率、稅率、費用與還款條件，請以銀行、政府機關、雇主或專業人士提供的正式資料為準。工具使用使用者輸入的固定年通膨率，不代表官方物價指數。',
    privacyNote: '金額與通膨率只在你的瀏覽器中計算，不會上傳。',
  },
  en: {
    name: 'Inflation Calculator',
    short: 'Estimate how inflation changes future purchasing power.',
    long: 'Inflation Calculator estimates future cost or purchasing power from an amount, annual inflation rate, and years. Formula: future cost = amount × (1 + annual rate)^years; future purchasing power = amount ÷ (1 + annual rate)^years.',
    seoTitle: 'Inflation Calculator | Purchasing power and future cost',
    seoDescription: 'Enter amount, annual inflation rate, and years to estimate future cost, future purchasing power, or a past equivalent amount.',
    keywords: ['inflation calculator', 'purchasing power calculator', 'future cost', 'inflation estimate'],
    instructions: [
      'Enter the current amount, annual inflation rate, and number of years.',
      'Choose future cost, future purchasing power, or past equivalent mode.',
      'Review the adjusted amount, difference, and formula used.',
      'Copy the summary for notes or planning sheets.',
    ],
    examples: [
      'Estimate what 10,000 today may need to become in 5 years to buy the same goods.',
      'Check the future purchasing power of a fixed budget.',
      'Convert a past price into an approximate equivalent under a fixed inflation assumption.',
    ],
    formula: {
      expression: 'Future cost = amount × (1 + annual inflation rate)^years; buying power / past equivalent = amount ÷ (1 + annual inflation rate)^years',
      explanation: 'The annual inflation rate is user-entered and assumed constant. The tool does not fetch official CPI or product prices; a negative rate represents a deflation assumption.',
    },
    faq: [
      {
        q: 'How accurate is the estimate?',
        a: 'The formula follows the inputs, but a constant inflation rate is a simplification. Actual changes vary by product, region, and year.',
      },
      {
        q: 'Can I use it as the basis for a formal financial decision?',
        a: 'No. Use it for scenario comparison, and combine official statistics, actual prices, and professional assessment for budgeting, investing, or retirement decisions.',
      },
      {
        q: 'Why can the actual amount differ?',
        a: 'Headline CPI is not the same as an individual product price; exchange rates, supply, demand, taxes, fees, location, and personal spending mix also matter.',
      },
      {
        q: 'What should I do when rates, taxes, or fees change?',
        a: 'Update the annual inflation assumption using current official data or your scenario. For large changes over time, calculate separate periods with different assumptions.',
      },
      {
        q: 'Can the annual inflation rate be negative?',
        a: 'Yes. A negative value represents a deflation assumption, and the same formula is applied.',
      },
      {
        q: 'Does this use official CPI data?',
        a: 'No. It only uses the fixed annual rate you enter and does not fetch external data.',
      },
      {
        q: 'Is this investment advice?',
        a: 'No. It is a math estimate. Real prices, exchange rates, taxes, fees, and product differences can vary.',
      },
    ],
    labels: {
      amount: 'Amount',
      annualRate: 'Annual inflation rate (%)',
      years: 'Years',
      mode: 'Mode',
      futureCost: 'Future cost',
      futureBuyingPower: 'Future purchasing power',
      pastEquivalent: 'Past equivalent',
      calculate: 'Calculate',
      copy: 'Copy result',
      reset: 'Reset',
      adjustedAmount: 'Adjusted amount',
      change: 'Difference',
      formula: 'Formula used',
      invalidInput: 'Enter valid numbers; years cannot be below 0.',
      copied: 'Copied',
    },
    disclaimer: 'Results are for reference only and do not constitute investment, tax, legal, lending, or financial advice. Confirm actual amounts, rates, taxes, fees, and repayment terms with banks, government agencies, employers, or qualified professionals. The tool uses a user-entered fixed inflation rate and does not represent official CPI.',
    privacyNote: 'Amount and inflation inputs are calculated locally in your browser and are not uploaded.',
  },
} satisfies Record<'zh' | 'en', ToolContent>;

