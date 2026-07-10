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
    name: '儲蓄目標計算器',
    short: '估算達成目標需要多久，或反推每月該存多少。',
    long: '儲蓄目標計算器提供兩種模式：估算以固定每月存款多久能達成目標，或在指定月數內反推需要的每月存款。可加入簡化年利率作為成長假設。',
    seoTitle: '儲蓄目標計算器｜達標時間與每月存款試算',
    seoDescription: '輸入目標金額、目前存款、每月存款與年利率假設，估算達標時間，或反推指定月數內需要的每月存款。',
    keywords: ['儲蓄目標', '存錢計算', 'savings goal calculator', 'monthly savings'],
    instructions: [
      '選擇要計算「需要多久」或「每月要存多少」。',
      '輸入目標金額、目前存款與年利率假設。',
      '依模式輸入每月存款或目標月數。',
      '查看結果並可複製摘要。',
    ],
    examples: [
      '估算買電腦、旅行或緊急預備金需要多久。',
      '反推一年內達成目標每月要存多少。',
      '比較不同每月存款金額對達標時間的影響。',
      '把模糊願望轉成更具體的存款節奏。',
    ],
    formula: {
      expression: '每月餘額 = 上月餘額 × (1 + 月利率) + 每月存款；月利率 = (1 + 年利率)^(1/12) − 1',
      explanation: '「需要多久」模式逐月累計至目標；「每月存多少」模式以年金終值公式反推月存款。年利率由使用者輸入並假設全期固定，填 0 可排除利息或投資成長。',
    },
    faq: [
      {
        q: '試算結果準確嗎？',
        a: '工具會依固定月存款、固定年利率與月底存入的簡化模型運算；收入、支出與利率有變動時，實際達標時間會不同。',
      },
      {
        q: '可以作為正式財務決策依據嗎？',
        a: '不可以。請把結果當作規劃起點，重大儲蓄、投資或借貸決策仍應查證正式資料並評估自身風險。',
      },
      {
        q: '為什麼實際金額可能不同？',
        a: '實際結果會受存款日期、利率變動、手續費、稅務、臨時支出、未固定存款與投資波動影響。',
      },
      {
        q: '利率、稅率或費用改變時怎麼辦？',
        a: '請把年利率更新為目前適用的假設後重新試算；稅費目前不會自動扣除，應另行納入目標或每月存款規劃。',
      },
      {
        q: '年利率一定要填嗎？',
        a: '不一定。可以填 0，代表不考慮利息或投資成長。',
      },
      {
        q: '如果目前存款已達目標呢？',
        a: '工具會顯示已達成，不需要額外月數或每月存款。',
      },
      {
        q: '結果準確嗎？',
        a: '它是固定月存款與固定年利率的簡化估算，實際結果會受收入、支出、利率與投資波動影響。',
      },
      {
        q: '可以用目標日期嗎？',
        a: '此工具以目標月數輸入，方便快速反推。你可以把目標日期換算成剩餘月數後填入。',
      },
    ],
    labels: {
      modeTime: '需要多久？',
      modeMonthly: '每月存多少？',
      target: '目標金額',
      current: '目前存款',
      monthlyDeposit: '每月存款',
      annualRate: '年利率 (%)',
      targetMonths: '目標月數',
      calculate: '計算',
      copy: '複製結果',
      resultTitle: '計算結果',
      timeResult: '預估達成時間',
      monthlyResult: '需要每月存款',
      years: '年',
      months: '個月',
      reached: '已達成目標',
      impossible: '在目前條件下無法達成，請增加每月存款或調整目標。',
      invalidInput: '請輸入有效且不為負的數值，目標金額需大於 0。',
      copied: '已複製',
    },
    disclaimer: '本工具試算結果僅供參考，不構成投資、稅務、法律、貸款或財務建議。實際金額、利率、稅率、費用與還款條件，請以銀行、政府機關、雇主或專業人士提供的正式資料為準。年利率為使用者自行輸入的固定假設。',
  },
  en: {
    name: 'Savings Goal Calculator',
    short: 'Estimate how long a goal takes or the monthly savings required.',
    long: 'Savings Goal Calculator has two modes: estimate how long a fixed monthly deposit takes to reach a target, or calculate the monthly deposit needed within a chosen number of months. A simple annual rate can be included as a growth assumption.',
    seoTitle: 'Savings Goal Calculator | How Much to Save Monthly',
    seoDescription: 'See how much to save per month to reach your savings goal.',
    keywords: ['savings goal calculator', 'how much to save per month calculator', 'money saving goal calculator', 'monthly savings', 'how long to save'],
    contentSections: [
      {
        heading: 'How much should I save per month?',
        paragraphs: [
          'The quick version: monthly savings = (target amount − current savings) ÷ months remaining. Saving $6,000 in 12 months with $1,200 already set aside means (6000 − 1200) ÷ 12 = $400 per month.',
          'If your savings earn interest, you can save slightly less each month because growth covers part of the gap. Switch this calculator to "How much per month?" mode, enter your target, current savings, timeframe, and an annual rate, and it solves the exact monthly deposit for you.',
        ],
        items: [
          'No interest? Just divide the remaining amount by the number of months',
          'With interest, the calculator uses the future-value-of-an-annuity formula for an exact figure',
          'Enter 0 as the annual rate for a conservative, growth-free plan',
          'Compare a few timeframes to find a monthly amount that fits your budget',
        ],
      },
    ],
    instructions: [
      'Choose How long or How much per month mode.',
      'Enter target amount, current savings, and annual rate assumption.',
      'Enter monthly deposit or target months depending on the mode.',
      'Review and copy the result summary.',
    ],
    examples: [
      'Estimate when you can afford a computer, trip, or emergency fund.',
      'Find the monthly amount needed to reach a goal in one year.',
      'Compare how different monthly deposits change the timeline.',
      'Turn a broad savings idea into a concrete monthly plan.',
    ],
    formula: {
      expression: 'Monthly balance = prior balance × (1 + monthly rate) + monthly deposit; monthly rate = (1 + annual rate)^(1/12) − 1',
      explanation: 'The time mode compounds month by month; the monthly-deposit mode rearranges the future-value-of-an-annuity formula. The user-entered annual rate is assumed constant, and 0 removes growth from the estimate.',
    },
    faq: [
      {
        q: 'How accurate is the estimate?',
        a: 'It follows a simplified model with fixed monthly deposits, a fixed annual rate, and month-end deposits. Real timing changes when income, spending, or rates vary.',
      },
      {
        q: 'Can I use it as the basis for a formal financial decision?',
        a: 'No. Treat it as a planning starting point and verify formal information and personal risk before major savings, investment, or borrowing decisions.',
      },
      {
        q: 'Why can the actual amount differ?',
        a: 'Deposit timing, changing rates, fees, taxes, irregular contributions, unexpected spending, and market movement can all change the outcome.',
      },
      {
        q: 'What should I do when rates, taxes, or fees change?',
        a: 'Update the annual-rate assumption and recalculate. Taxes and fees are not deducted automatically, so include them separately in the goal or monthly plan.',
      },
      {
        q: 'Do I have to enter an annual rate?',
        a: 'No. Enter 0 when you do not want to assume interest or investment growth.',
      },
      {
        q: 'What if current savings already reach the target?',
        a: 'The calculator reports that the goal is already reached.',
      },
      {
        q: 'Is the result exact?',
        a: 'It is a simplified estimate with fixed deposits and fixed annual rate. Real results can change with income, spending, rates, and market movement.',
      },
      {
        q: 'Can I use a target date?',
        a: 'This widget uses target months for speed. Convert your target date into remaining months and enter that number.',
      },
    ],
    labels: {
      modeTime: 'How long?',
      modeMonthly: 'How much per month?',
      target: 'Target amount',
      current: 'Current savings',
      monthlyDeposit: 'Monthly deposit',
      annualRate: 'Annual rate (%)',
      targetMonths: 'Target months',
      calculate: 'Calculate',
      copy: 'Copy result',
      resultTitle: 'Result',
      timeResult: 'Estimated time',
      monthlyResult: 'Required monthly deposit',
      years: 'yr',
      months: 'mo',
      reached: 'Goal already reached',
      impossible: 'This goal cannot be reached under the current inputs. Increase the monthly deposit or adjust the goal.',
      invalidInput: 'Enter valid non-negative numbers, with target amount greater than 0.',
      copied: 'Copied!',
    },
    disclaimer: 'Results are for reference only and do not constitute investment, tax, legal, lending, or financial advice. Confirm actual amounts, rates, taxes, fees, and repayment terms with banks, government agencies, employers, or qualified professionals. The annual rate is a user-entered fixed assumption.',
  },
} satisfies Record<'zh' | 'en', ToolContent>;
