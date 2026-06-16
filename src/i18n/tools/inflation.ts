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
    faq: [
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
    disclaimer: '此工具使用固定年通膨率做簡化估算，不代表官方物價指數、投資建議或財務保證。',
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
    faq: [
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
    disclaimer: 'This tool uses a simplified fixed annual inflation rate and is not official CPI data, investment advice, or a financial guarantee.',
    privacyNote: 'Amount and inflation inputs are calculated locally in your browser and are not uploaded.',
  },
} satisfies Record<'zh' | 'en', ToolContent>;

