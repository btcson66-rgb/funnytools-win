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
    faq: [
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
    disclaimer: '此工具不是官方薪資、稅務或法律計算器。所有保險、稅務、退休與扣繳費率都只是可編輯假設，請以最新法規、公司薪資單或專業意見為準。',
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
    faq: [
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
    disclaimer: 'This is not an official payroll, tax, or legal calculator. Insurance, tax, pension, and withholding rates are editable assumptions only; verify against current regulations, your payslip, or a qualified professional.',
    privacyNote: 'Salary and rate inputs are calculated locally in your browser and are not uploaded.',
  },
} satisfies Record<'zh' | 'en', ToolContent>;

