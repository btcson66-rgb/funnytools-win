import type { ToolContent } from './_types';

export default {
  zh: {
    name: '複利計算器',
    short: '用本金、每月投入、年化報酬率與年限估算未來金額。',
    long: '複利計算器可用來規劃儲蓄、長期投資或目標基金。輸入初始本金、每月投入、年化報酬率、年限與複利頻率後，工具會估算未來價值、累計投入與利息收益，並用年度圖表呈現成長趨勢。它適合做情境比較，但不代表任何投資保證。',
    seoTitle: '複利計算器｜本金、每月投入與未來價值試算',
    seoDescription: '輸入初始本金、每月投入、年化報酬率、年限與複利頻率，估算未來價值、累計投入與利息收益，並查看年度成長趨勢。',
    keywords: ['複利計算器', 'compound interest calculator', 'future value calculator', '投資試算'],
    capabilities: [
      '用初始本金、每月投入、年化報酬率與年限估算未來價值。',
      '分開顯示累計投入與利息收益，避免把自己投入的金額誤當成報酬。',
      '切換每月、每季、每年或每日複利，並透過年度圖表比較長期情境。',
    ],
    instructions: [
      '輸入初始本金，也就是一開始已經準備好的金額。',
      '輸入每月固定投入金額；如果不追加投入，可填 0。',
      '輸入年化報酬率與投資年限，再選擇複利頻率。',
      '查看未來價值、累計投入、利息收益與年度成長圖。',
    ],
    examples: [
      '估算每月固定存款在十年後可能累積多少。',
      '比較不同每月投入金額對長期目標的影響。',
      '用保守、中性、樂觀報酬率建立三種情境。',
      '向學生或家人示範時間與複利對結果的差異。',
    ],
    audience: [
      '正在建立儲蓄計畫，想知道每月投入是否足夠的人。',
      '希望用簡單數字比較長期投資情境的個人使用者。',
      '需要向家人、學生或客戶說明複利概念的人。',
      '整理退休、教育、旅行或緊急預備金目標的人。',
    ],
    caseStudies: [
      {
        title: '教育基金規劃',
        description: '家長輸入目前準備的本金與每月投入，測試不同年化報酬率下，孩子升學前可能累積的金額。',
      },
      {
        title: '提高月投入比較',
        description: '使用者把每月投入從小額逐步提高，觀察未來價值如何變化，找出現金流可承受的投入區間。',
      },
      {
        title: '報酬率情境表',
        description: '規劃者用保守與樂觀報酬率各試算一次，把結果複製到筆記中，避免只看單一假設。',
      },
    ],
    notes: [
      '月投入採簡化模型，實際入金日期、買入價格與市場波動都會影響結果。',
      '報酬率不等於保證收益，實際投資還可能受到稅費、手續費、匯率與通膨影響。',
      '年度圖表用來觀察趨勢，不應被視為投資建議或對未來績效的承諾。',
    ],
    formula: {
      expression: '每月餘額 Bₘ = Bₘ₋₁ × (1 + i) + 每月投入；i = (1 + 年化報酬率 ÷ 複利次數)^(複利次數 ÷ 12) − 1',
      explanation: '工具逐月計算，並假設每月投入在月底加入；年化報酬率、投入金額、年限與複利頻率都由使用者輸入。報酬率是假設值，不是即時產品利率或保證收益。',
    },
    faq: [
      {
        q: '試算結果準確嗎？',
        a: '工具會依固定報酬率、固定月底投入與所選複利頻率運算；市場波動、實際投入日與產品計息方式不同時，結果會改變。',
      },
      {
        q: '可以作為正式財務決策依據嗎？',
        a: '不可以。結果只適合比較情境，不應取代投資說明書、銀行資料、稅務資料或專業財務評估。',
      },
      {
        q: '為什麼實際金額可能不同？',
        a: '費用、稅務、匯率、通膨、市場漲跌、投入時間、利率變動與複利方式都可能造成差異。',
      },
      {
        q: '利率、稅率或費用改變時怎麼辦？',
        a: '請更新年化報酬率後重新試算，並注意工具不會自動扣除稅金與費用；必要時可用較低報酬率納入成本假設。',
      },
      {
        q: '這是投資建議嗎？',
        a: '不是。工具只是依照你輸入的假設做數學估算，不保證任何投資報酬。',
      },
      {
        q: '每月投入何時加入計算？',
        a: '工具使用簡化的月底投入模型；真實入金日期與市場價格不同時，結果也會不同。',
      },
      {
        q: '複利頻率會影響結果嗎？',
        a: '會。在相同年化報酬率下，複利頻率越高，估算結果通常會略高，但差異取決於利率與年限。',
      },
      {
        q: '如果每月不固定投入怎麼辦？',
        a: '可以用平均每月投入做粗估；若投入時間差很多，建議分段試算後再整理。',
      },
      {
        q: '圖表代表什麼？',
        a: '圖表顯示每年年底估算餘額，幫助你快速看出長期成長趨勢。',
      },
    ],
    labels: {
      principal: '初始本金',
      monthly: '每月投入',
      rate: '年化報酬率 (%)',
      years: '年限',
      compounding: '複利頻率',
      monthlyCompounding: '每月',
      quarterlyCompounding: '每季',
      yearlyCompounding: '每年',
      dailyCompounding: '每日',
      calculate: '計算',
      copy: '複製結果',
      futureValue: '未來價值',
      contributed: '累計投入',
      interest: '利息收益',
      chartTitle: '年度餘額',
      invalidInput: '請輸入有效且不為負的數字，年限需大於 0。',
      copied: '已複製',
    },
    disclaimer: '本工具試算結果僅供參考，不構成投資、稅務、法律、貸款或財務建議。實際金額、利率、稅率、費用與還款條件，請以銀行、政府機關、雇主或專業人士提供的正式資料為準。年化報酬率是使用者輸入的固定假設，不代表保證收益。',
    privacyNote: '本金、投入金額與報酬率只會在你的瀏覽器中計算，不會上傳到伺服器。',
  },
  en: {
    name: 'Compound Interest Calculator',
    short: 'Project future value from principal, monthly deposits, rate, and time.',
    long: 'Compound Interest Calculator helps you model savings, long-term investing, or goal-fund scenarios with simple assumptions. Enter an initial principal, monthly contribution, annual return rate, number of years, and compounding frequency. The tool estimates future value, total contributed, and interest earned, then draws a yearly balance chart so you can compare scenarios. It is useful for planning conversations, but it does not guarantee investment performance.',
    seoTitle: 'Compound Interest Calculator | Free Future Value Tool',
    seoDescription: 'Estimate future value, total contributed, and interest earned from principal, monthly deposits, annual rate, years, and compounding frequency.',
    keywords: ['compound interest calculator', 'future value calculator', 'investment growth calculator', 'savings calculator'],
    instructions: [
      'Enter the initial principal you already have available.',
      'Enter a monthly contribution, or use 0 if you do not plan to add money regularly.',
      'Enter the annual return rate and years, then choose the compounding frequency.',
      'Review future value, total contributed, interest earned, and the yearly balance chart.',
    ],
    examples: [
      'Estimate how much a monthly saving habit could grow over ten years.',
      'Compare how different monthly contributions affect a long-term target.',
      'Create conservative, middle, and optimistic return scenarios.',
      'Demonstrate how time and compounding change the final result.',
    ],
    audience: [
      'People building a savings plan and checking whether their monthly contribution is enough.',
      'Individual investors comparing long-term scenarios with simple assumptions.',
      'Teachers, writers, or advisers explaining the basic mechanics of compounding.',
      'Anyone planning retirement, education, travel, or emergency-fund targets.',
    ],
    caseStudies: [
      {
        title: 'Education fund planning',
        description: 'A parent enters current savings and monthly deposits, then tests several return assumptions to estimate how much might be available before school starts.',
      },
      {
        title: 'Monthly contribution comparison',
        description: 'A saver increases the monthly contribution in steps and watches how future value changes, helping them choose a realistic cash-flow target.',
      },
      {
        title: 'Return scenario notes',
        description: 'A planner copies conservative and optimistic scenarios into notes so the decision is not based on one overly precise assumption.',
      },
    ],
    notes: [
      'Monthly contributions use a simplified model; real deposit dates, purchase prices, and market movement can change the result.',
      'Return rate is an assumption, not a guarantee, and actual outcomes may be affected by taxes, fees, currency movement, and inflation.',
      'The yearly chart is for trend context only and should not be read as investment advice or a promise of future performance.',
    ],
    formula: {
      expression: 'Monthly balance Bₘ = Bₘ₋₁ × (1 + i) + monthly contribution; i = (1 + annual rate ÷ compounds)^(compounds ÷ 12) − 1',
      explanation: 'The tool calculates month by month and assumes contributions arrive at month end. Rate, contribution, years, and compounding are user inputs; the rate is an assumption, not a live product rate or guaranteed return.',
    },
    faq: [
      {
        q: 'How accurate is the estimate?',
        a: 'It follows a fixed return, fixed month-end contribution, and selected compounding frequency. Market movement, actual deposit dates, and product calculation methods can change the result.',
      },
      {
        q: 'Can I use it as the basis for a formal financial decision?',
        a: 'No. Use it to compare scenarios, not as a replacement for product documents, bank information, tax records, or professional financial assessment.',
      },
      {
        q: 'Why can the actual amount differ?',
        a: 'Fees, taxes, exchange rates, inflation, market movement, deposit timing, changing rates, and compounding methods can all affect the outcome.',
      },
      {
        q: 'What should I do when rates, taxes, or fees change?',
        a: 'Update the annual-rate assumption and recalculate. Taxes and fees are not deducted automatically; a lower net rate can be used to model costs approximately.',
      },
      {
        q: 'Is this investment advice?',
        a: 'No. It is a mathematical estimate based on your inputs and does not guarantee any investment return.',
      },
      {
        q: 'When are monthly contributions added?',
        a: 'The calculator uses a simplified month-end contribution model. Real deposit dates and market prices can change results.',
      },
      {
        q: 'Does compounding frequency matter?',
        a: 'Yes. More frequent compounding usually creates a slightly higher effective return for the same annual rate, depending on rate and time.',
      },
      {
        q: 'What if my deposits are irregular?',
        a: 'You can use an average monthly amount for a rough estimate, or run separate scenarios for different phases of the plan.',
      },
      {
        q: 'What does the chart show?',
        a: 'It shows estimated ending balance for each year so you can scan the long-term growth trend.',
      },
    ],
    labels: {
      principal: 'Initial principal',
      monthly: 'Monthly contribution',
      rate: 'Annual rate (%)',
      years: 'Years',
      compounding: 'Compounding',
      monthlyCompounding: 'Monthly',
      quarterlyCompounding: 'Quarterly',
      yearlyCompounding: 'Yearly',
      dailyCompounding: 'Daily',
      calculate: 'Calculate',
      copy: 'Copy result',
      futureValue: 'Future value',
      contributed: 'Total contributed',
      interest: 'Interest earned',
      chartTitle: 'Balance by year',
      invalidInput: 'Enter valid non-negative numbers, with years greater than 0.',
      copied: 'Copied!',
    },
    disclaimer: 'Results are for reference only and do not constitute investment, tax, legal, lending, or financial advice. Confirm actual amounts, rates, taxes, fees, and repayment terms with banks, government agencies, employers, or qualified professionals. The annual return is a user-entered fixed assumption and is not guaranteed.',
    privacyNote: 'Principal, contribution, and rate inputs are calculated locally in your browser and are not uploaded.',
  },
} satisfies Record<'zh' | 'en', ToolContent>;
