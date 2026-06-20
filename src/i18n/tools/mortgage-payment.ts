import type { ToolContent } from './_types';

export default {
  zh: {
    name: '房貸月付試算器',
    short: '用貸款金額、年利率與年限快速估算每月房貸。',
    long: '房貸月付試算器適合在看屋、整理預算或比較貸款方案前使用。輸入貸款金額、年利率與還款年限後，工具會用固定利率本息攤還公式估算每月付款、總付款與總利息，方便你先抓出可負擔範圍，再帶著數字向銀行或房貸顧問確認正式條件。',
    seoTitle: '房貸月付試算｜本息平均攤還、總利息計算器',
    seoDescription: '輸入房貸金額、年利率與貸款年限，免費估算本息平均攤還的每月月付、總付款與總利息，方便看屋預算與方案比較。',
    keywords: ['房貸月付試算器', '房貸試算', 'mortgage payment calculator', 'loan payment calculator'],
    capabilities: [
      '依貸款金額、年利率與年限，估算固定利率本息平均攤還的每月付款。',
      '同時顯示整個貸款期間的總付款與總利息，幫助理解長年期成本。',
      '反覆調整金額、利率或年限，比較不同看屋預算與房貸情境。',
    ],
    instructions: [
      '輸入預計貸款金額，不包含已支付的頭期款。',
      '輸入年利率百分比，例如 2.2 代表年利率 2.2%。',
      '輸入還款年限，常見情境可比較 20 年、30 年或其他年期。',
      '查看每月付款、總付款與總利息，必要時複製結果做紀錄。',
    ],
    examples: [
      '看屋前先估算不同貸款金額會造成的月付差距。',
      '比較同一筆貸款在 20 年與 30 年期下的付款壓力。',
      '用不同利率情境評估升息或優惠利率結束後的預算。',
      '整理家庭收支表時，把粗估月付放進固定支出欄位。',
    ],
    audience: [
      '第一次買房，想先知道大概月付是否超出收入負擔的人。',
      '正在比較不同總價、頭期款或貸款年限的看屋族。',
      '需要向家人或共同購屋者說明預算差異的使用者。',
      '整理個人財務、租買比較或長期現金流假設的人。',
    ],
    caseStudies: [
      {
        title: '看屋預算初篩',
        description: '買方把幾個可能的貸款金額輸入工具，先排除月付明顯超過家庭現金流的物件，再安排實際看屋。',
      },
      {
        title: '年限比較',
        description: '同一筆貸款分別用 20 年與 30 年試算，使用者可比較每月壓力、總利息與提前還款討論方向。',
      },
      {
        title: '利率敏感度檢查',
        description: '使用者把利率提高幾個情境，觀察月付變化，避免只用最低優惠利率做過度樂觀的預算。',
      },
    ],
    notes: [
      '結果是固定利率本息攤還估算，不包含寬限期、階梯利率、浮動利率或提前清償規則。',
      '實際房貸通常還會受到手續費、保險、稅費、信用條件與銀行審核影響。',
      '此工具適合做初步比較，不應取代正式貸款合約、銀行試算表或專業建議。',
    ],
    formula: {
      expression: '每月付款 M = P × [r(1 + r)^n] ÷ [(1 + r)^n − 1]；r = 年利率 ÷ 12；n = 年限 × 12',
      explanation: 'P 為貸款本金。工具假設固定年利率與本息平均攤還；貸款金額、利率與年限都由使用者輸入，不會自動取得銀行報價，也不包含寬限期、費用、保險或稅金。利率為 0 時，每月付款為本金除以總月數。',
    },
    faq: [
      {
        q: '試算結果準確嗎？',
        a: '公式會依輸入值估算固定利率本息平均攤還，但實際貸款若有寬限期、浮動利率、階梯利率、費用或不同計息方式，結果會不同。',
      },
      {
        q: '可以作為正式財務決策依據嗎？',
        a: '不可以。貸款額度、核貸、月付與總費用請以銀行審核、正式報價及貸款契約為準。',
      },
      {
        q: '為什麼實際金額可能不同？',
        a: '銀行可能採用不同計息日、利率條件、寬限期、手續費、保險、稅費、信用條件與四捨五入方式。',
      },
      {
        q: '利率、稅率或費用改變時怎麼辦？',
        a: '請用銀行最新年利率重新試算，並把稅費、保險、手續費與其他成本另外加入預算。',
      },
      {
        q: '這個工具使用什麼公式？',
        a: '工具使用固定利率本息攤還公式，把年利率換算成月利率後估算固定月付款。',
      },
      {
        q: '可以用來估算零利率貸款嗎？',
        a: '可以。當年利率輸入 0 時，工具會用貸款金額除以總月數估算平均月付。',
      },
      {
        q: '要輸入年利率還是月利率？',
        a: '請輸入年利率百分比，例如 2.5 代表每年 2.5%，工具會自動換算成月利率。',
      },
      {
        q: '這會包含房屋稅、保險或管理費嗎？',
        a: '不包含。結果只反映貸款本金與利息，其他持有成本需要另外加入你的預算。',
      },
      {
        q: '可以直接拿這個結果申請貸款嗎？',
        a: '不建議。銀行核貸、費用、合約條件與實際利率都可能改變付款金額，請以正式文件為準。',
      },
    ],
    labels: {
      loanAmount: '貸款金額',
      annualRate: '年利率 (%)',
      termYears: '貸款年限',
      calculate: '計算',
      copy: '複製結果',
      monthlyPayment: '每月付款',
      totalPayments: '總付款',
      totalInterest: '總利息',
      invalidInput: '請輸入有效數字，貸款金額與年限需大於 0，利率不可為負數。',
      copied: '已複製',
    },
    disclaimer: '本工具試算結果僅供參考，不構成投資、稅務、法律、貸款或財務建議。實際金額、利率、稅率、費用與還款條件，請以銀行、政府機關、雇主或專業人士提供的正式資料為準。房貸試算假設固定利率本息平均攤還，不代表核貸、報價或契約條件。',
    privacyNote: '貸款金額、利率與年限只會在你的瀏覽器中計算，不會上傳到伺服器。',
  },
  en: {
    name: 'Mortgage Payment Calculator',
    short: 'Estimate monthly mortgage payments from loan amount, rate, and term.',
    long: 'Mortgage Payment Calculator helps you make an early monthly-payment estimate before viewing homes, comparing loan terms, or building a household budget. Enter the loan amount, annual interest rate, and term in years, then the tool applies a fixed-rate amortization formula to estimate monthly payment, total paid, and total interest. Use the result as a planning baseline before checking exact fees, approval rules, and contract terms with a lender.',
    seoTitle: 'Mortgage Payment Calculator | Free Monthly Loan Estimate',
    seoDescription: 'Estimate monthly mortgage payment, total payments, and total interest from loan amount, annual rate, and loan term.',
    keywords: ['mortgage payment calculator', 'loan payment calculator', 'monthly mortgage', 'amortization calculator'],
    instructions: [
      'Enter the loan amount after any down payment you plan to pay.',
      'Enter the annual interest rate as a percentage, such as 6.5.',
      'Enter the repayment term in years and compare common options like 15, 20, or 30 years.',
      'Review monthly payment, total payments, and total interest, then copy the result if useful.',
    ],
    examples: [
      'Compare monthly payments for several home prices before scheduling viewings.',
      'Check how a 20-year term differs from a 30-year term for the same loan.',
      'Model a higher-rate scenario before assuming a promotional rate will last.',
      'Add a rough mortgage line item to a household budget or rent-versus-buy sheet.',
    ],
    audience: [
      'First-time buyers who need a quick sense of monthly affordability.',
      'Home shoppers comparing different prices, down payments, rates, or loan terms.',
      'Couples or families who need a simple number to discuss before contacting lenders.',
      'Budget planners comparing housing costs, debt load, and long-term cash flow.',
    ],
    caseStudies: [
      {
        title: 'Home search budget filter',
        description: 'A buyer tests several loan amounts, removes homes that push the monthly payment above their comfort range, and focuses only on realistic viewings.',
      },
      {
        title: 'Term comparison',
        description: 'A borrower compares 20-year and 30-year terms to see the tradeoff between lower monthly pressure and higher total interest.',
      },
      {
        title: 'Rate sensitivity check',
        description: 'A household raises the interest rate in small steps to understand how payments might change if the final approved rate is higher than expected.',
      },
    ],
    notes: [
      'The estimate assumes a fixed-rate amortizing loan and does not model grace periods, adjustable rates, interest-only periods, or prepayment rules.',
      'Real mortgage costs can also include taxes, insurance, lender fees, closing costs, and local requirements.',
      'Use this as a comparison aid, not as a loan approval, quote, or replacement for lender documentation.',
    ],
    formula: {
      expression: 'Monthly payment M = P × [r(1 + r)^n] ÷ [(1 + r)^n − 1]; r = annual rate ÷ 12; n = years × 12',
      explanation: 'P is principal. The user enters amount, rate, and term; the tool assumes fixed-rate amortization and does not fetch lender quotes or include grace periods, fees, insurance, or taxes. At 0% interest, payment is principal divided by total months.',
    },
    faq: [
      {
        q: 'How accurate is the estimate?',
        a: 'It estimates fixed-rate amortization from your inputs. Grace periods, adjustable or tiered rates, fees, and different interest methods can change the real result.',
      },
      {
        q: 'Can I use it as the basis for a formal financial decision?',
        a: 'No. Loan amount, approval, payment, and total cost must come from lender underwriting, a formal quote, and the loan contract.',
      },
      {
        q: 'Why can the actual amount differ?',
        a: 'Lenders may use different interest dates, rate terms, grace periods, fees, insurance, taxes, credit conditions, and rounding methods.',
      },
      {
        q: 'What should I do when rates, taxes, or fees change?',
        a: 'Recalculate with the lender\'s latest annual rate and add taxes, insurance, fees, and other costs separately to your budget.',
      },
      {
        q: 'What formula is used?',
        a: 'The calculator uses a standard fixed-rate amortization formula and converts the annual rate into a monthly rate.',
      },
      {
        q: 'Can it handle a zero-interest loan?',
        a: 'Yes. If the annual rate is 0, the calculator divides the loan amount by the total number of months.',
      },
      {
        q: 'Should I enter annual or monthly interest rate?',
        a: 'Enter the annual interest rate percentage. The tool converts it internally for the monthly payment calculation.',
      },
      {
        q: 'Does it include taxes, insurance, or HOA fees?',
        a: 'No. It only estimates principal and interest. Add taxes, insurance, fees, and maintenance separately in your budget.',
      },
      {
        q: 'Can I use this result for a loan application?',
        a: 'No. Lender approval, fees, actual rates, and contract terms can change the final payment, so confirm with official documents.',
      },
    ],
    labels: {
      loanAmount: 'Loan amount',
      annualRate: 'Annual rate (%)',
      termYears: 'Term (years)',
      calculate: 'Calculate',
      copy: 'Copy result',
      monthlyPayment: 'Monthly payment',
      totalPayments: 'Total payments',
      totalInterest: 'Total interest',
      invalidInput: 'Enter valid numbers: loan amount and term must be greater than 0, and rate cannot be negative.',
      copied: 'Copied!',
    },
    disclaimer: 'Results are for reference only and do not constitute investment, tax, legal, lending, or financial advice. Confirm actual amounts, rates, taxes, fees, and repayment terms with banks, government agencies, employers, or qualified professionals. This calculator assumes fixed-rate amortization and does not represent approval, a quote, or contract terms.',
    privacyNote: 'Loan amount, rate, and term inputs are calculated locally in your browser and are not uploaded.',
  },
} satisfies Record<'zh' | 'en', ToolContent>;
