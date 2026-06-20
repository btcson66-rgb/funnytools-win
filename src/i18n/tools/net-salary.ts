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
    name: '實領薪資試算',
    short: '估算扣除項目後的月實領金額。',
    long: '實領薪資試算器用你輸入的月薪、津貼與可編輯扣除率估算實領金額。公式：實領薪資 = 薪資 + 津貼 - 薪資 ×（勞保率 + 健保率 + 勞退自提率 + 扣繳稅率）- 其他固定扣除。',
    seoTitle: '實領薪資試算｜可編輯費率的薪資估算工具',
    seoDescription: '用可自行調整的勞保、健保、退休提撥、扣繳稅率與其他扣除，估算月實領薪資。',
    keywords: ['實領薪資', 'net salary calculator', '薪資試算', 'take home pay'],
    instructions: [
      '輸入月薪與每月固定津貼。',
      '依你的所在地與公司規則調整各項扣除率。',
      '加入其他固定扣除，例如福利金、預扣或自訂項目。',
      '查看總收入、扣除額與估算實領薪資。',
    ],
    examples: [
      '入職前粗估月薪扣除後的可支配收入。',
      '比較不同扣繳或自提比例對實領薪資的影響。',
      '用公司提供的最新費率重算薪資情境。',
    ],
    formula: {
      expression: '實領薪資 = 月薪 + 固定津貼 − 月薪 ×（勞保率 + 健保率 + 勞退自提率 + 扣繳稅率）− 其他固定扣除',
      explanation: '所有費率與固定扣除都由使用者輸入；頁面上的預設值只是示範假設，不是即時官方費率。請依最新政府公告、公司薪資單或人資資料自行調整。',
    },
    faq: [
      {
        q: '試算結果準確嗎？',
        a: '結果會依輸入值與簡化公式正確運算，但不會自動套用個人級距、眷屬、補充保費、免稅項目或公司制度，因此只能作為估算。',
      },
      {
        q: '可以作為正式財務決策依據嗎？',
        a: '不可以。正式薪資、報稅或財務決策請以政府公告、公司薪資單、人資資料或專業人士意見為準。',
      },
      {
        q: '為什麼實際金額可能不同？',
        a: '實際金額可能受到投保級距、扣繳方式、津貼性質、個人稅務狀況、公司制度與四捨五入影響。',
      },
      {
        q: '利率、稅率或費用改變時怎麼辦？',
        a: '請查閱最新官方或公司資料，並在欄位中更新各項費率與固定扣除後重新試算。',
      },
      {
        q: '預設費率是官方最新法規嗎？',
        a: '不是。預設值只是方便試算的假設，所有費率都可以修改，請依最新法規或薪資單確認。',
      },
      {
        q: '可以處理累進所得稅或複雜補助嗎？',
        a: '不可以。此工具使用簡化百分比與固定扣除模型，適合快速估算，不適合作為報稅或法定薪資依據。',
      },
      {
        q: '我的薪資資料會被保存嗎？',
        a: '不會。計算完全在瀏覽器內進行，重新整理後不會保存。',
      },
    ],
    labels: {
      grossSalary: '月薪',
      allowance: '固定津貼',
      laborRate: '勞保扣除率 (%)',
      healthRate: '健保扣除率 (%)',
      pensionRate: '勞退自提率 (%)',
      taxRate: '扣繳稅率 (%)',
      otherDeduction: '其他固定扣除',
      calculate: '試算',
      copy: '複製結果',
      reset: '重設',
      grossIncome: '總收入',
      totalDeductions: '扣除合計',
      netPay: '估算實領',
      assumptionNote: '費率為可編輯假設，請依最新法規自行確認。',
      formula: '公式：實領 = 月薪 + 津貼 - 月薪 × 扣除率合計 - 其他扣除',
      invalidInput: '請輸入有效且不小於 0 的數字。',
      copied: '已複製',
    },
    disclaimer: '本工具試算結果僅供參考，不構成投資、稅務、法律、貸款或財務建議。實際金額、利率、稅率、費用與還款條件，請以銀行、政府機關、雇主或專業人士提供的正式資料為準。所有保險、稅務、退休與扣繳費率都是可編輯假設。',
    privacyNote: '薪資與費率只在你的瀏覽器中計算，不會上傳。',
  },
  en: {
    name: 'Net Salary',
    short: 'Estimate take-home pay after common deductions.',
    long: 'Net Salary estimates monthly take-home pay from salary, allowances, and editable deduction rates. Formula: net salary = salary + allowance - salary × (labor insurance rate + health insurance rate + voluntary pension rate + withholding tax rate) - other fixed deductions.',
    seoTitle: 'Net Salary Calculator | Editable rate take-home pay estimate',
    seoDescription: 'Estimate monthly take-home pay with user-editable labor insurance, health insurance, pension, withholding tax, and fixed deduction assumptions.',
    keywords: ['net salary calculator', 'take home pay calculator', 'salary deductions', 'paycheck estimate'],
    instructions: [
      'Enter monthly salary and fixed monthly allowances.',
      'Edit each deduction rate to match your location and payroll assumptions.',
      'Add any other fixed deductions such as benefits, advances, or custom items.',
      'Review gross income, estimated deductions, and estimated net pay.',
    ],
    examples: [
      'Estimate disposable income before accepting a new salary offer.',
      'Compare how different withholding or pension assumptions affect take-home pay.',
      'Recalculate a salary scenario using rates supplied by payroll or official sources.',
    ],
    formula: {
      expression: 'Net pay = salary + fixed allowance − salary × (labor + health + pension + withholding rates) − other fixed deductions',
      explanation: 'Every rate and fixed deduction is user-entered. Default values are examples, not live official rates; replace them with current government, employer, or payroll figures.',
    },
    faq: [
      {
        q: 'How accurate is the estimate?',
        a: 'The arithmetic follows the displayed inputs and simplified formula, but it does not automatically model personal brackets, dependents, special premiums, exemptions, or employer-specific rules.',
      },
      {
        q: 'Can I use it as the basis for a formal financial decision?',
        a: 'No. Use official government notices, employer payroll records, or qualified professional advice for payroll, tax, or financial decisions.',
      },
      {
        q: 'Why can the actual amount differ?',
        a: 'Actual pay can vary because of insurance brackets, withholding methods, allowance treatment, personal tax circumstances, employer policy, and rounding.',
      },
      {
        q: 'What should I do when rates, taxes, or fees change?',
        a: 'Check current official or employer information, update the editable rates and deductions, and run the estimate again.',
      },
      {
        q: 'Are the default rates official current regulations?',
        a: 'No. Defaults are only convenient assumptions. Every rate is editable, and you should verify current rules or your payslip.',
      },
      {
        q: 'Does this handle progressive income tax or complex benefits?',
        a: 'No. It uses a simplified percentage and fixed deduction model for quick estimates, not tax filing or legal payroll compliance.',
      },
      {
        q: 'Is my salary data stored?',
        a: 'No. Calculations happen in your browser and are not saved after refresh.',
      },
    ],
    labels: {
      grossSalary: 'Monthly salary',
      allowance: 'Fixed allowance',
      laborRate: 'Labor insurance rate (%)',
      healthRate: 'Health insurance rate (%)',
      pensionRate: 'Voluntary pension (self-paid) rate (%)',
      taxRate: 'Withholding tax rate (%)',
      otherDeduction: 'Other fixed deduction',
      calculate: 'Calculate',
      copy: 'Copy result',
      reset: 'Reset',
      grossIncome: 'Gross income',
      totalDeductions: 'Total deductions',
      netPay: 'Estimated net pay',
      assumptionNote: 'Rates are editable assumptions - verify against current regulations.',
      formula: 'Formula: net = salary + allowance - salary × total deduction rate - other deductions',
      invalidInput: 'Enter valid non-negative numbers.',
      copied: 'Copied',
    },
    disclaimer: 'Results are for reference only and do not constitute investment, tax, legal, lending, or financial advice. Confirm actual amounts, rates, taxes, fees, and repayment terms with banks, government agencies, employers, or qualified professionals. Insurance, tax, pension, and withholding rates are editable assumptions.',
    privacyNote: 'Salary and rate inputs are calculated locally in your browser and are not uploaded.',
  },
} satisfies Record<'zh' | 'en', ToolContent>;

