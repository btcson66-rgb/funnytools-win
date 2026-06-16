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
    name: '加班費計算',
    short: '依時薪與倍率估算加班費。',
    long: '加班費計算器用可編輯時薪、加班時數與倍率估算加班收入。公式：各類加班費 = 時薪 × 該類時數 × 該類倍率，總加班費為各類加總。',
    seoTitle: '加班費計算器｜可編輯倍率的加班收入估算',
    seoDescription: '輸入時薪、不同加班時數與自訂倍率，快速估算平日、延長、休息日或假日加班費。',
    keywords: ['加班費計算', 'overtime pay calculator', '加班倍率', '薪資試算'],
    instructions: [
      '輸入你的基本時薪。',
      '依情境填入不同類別的加班時數。',
      '把倍率調整為你所在地或公司規則適用的數值。',
      '查看各類加班費與總額。',
    ],
    examples: [
      '估算本月平日加班與休息日加班合計。',
      '比較不同倍率規則下的加班收入差異。',
      '用公司公告倍率建立可複製的加班費摘要。',
    ],
    faq: [
      {
        q: '預設倍率是官方規定嗎？',
        a: '不是。預設倍率只是示範假設，請依最新法規、契約或公司薪資規則自行修改。',
      },
      {
        q: '可以處理所有勞動法細節嗎？',
        a: '不可以。各地規則可能包含時段、休息日、例假、補休與上限，本工具只做簡化估算。',
      },
      {
        q: '我可以只填一種類別嗎？',
        a: '可以。未使用的類別保持 0 小時即可。',
      },
    ],
    labels: {
      hourlyRate: '基本時薪',
      weekdayHours: '平日加班時數',
      weekdayMultiplier: '平日倍率',
      extendedHours: '延長時段時數',
      extendedMultiplier: '延長倍率',
      restHours: '休息日時數',
      restMultiplier: '休息日倍率',
      holidayHours: '假日時數',
      holidayMultiplier: '假日倍率',
      calculate: '計算',
      copy: '複製結果',
      reset: '重設',
      weekdayPay: '平日加班費',
      extendedPay: '延長時段',
      restPay: '休息日',
      holidayPay: '假日',
      totalPay: '加班費合計',
      assumptionNote: '費率為可編輯假設，請依最新法規自行確認。',
      formula: '公式：加班費 = 時薪 × 時數 × 倍率',
      invalidInput: '請輸入有效且不小於 0 的數字。',
      copied: '已複製',
    },
    disclaimer: '此工具只提供依使用者輸入倍率產生的估算，不代表官方或法律計算。加班費規則會因地區、契約與工時類型而變動，請以最新法規、公司制度或專業意見為準。',
    privacyNote: '時薪與時數只在你的瀏覽器中計算，不會上傳。',
  },
  en: {
    name: 'Overtime Pay',
    short: 'Calculate overtime pay from hours and rate multipliers.',
    long: 'Overtime Pay estimates extra pay from an editable hourly rate, overtime hours, and multipliers. Formula: pay for each category = hourly rate × hours × multiplier, and total overtime pay is the sum of all categories.',
    seoTitle: 'Overtime Pay Calculator | Editable multiplier estimate',
    seoDescription: 'Enter hourly wage, overtime hours, and editable multipliers to estimate weekday, extended, rest-day, or holiday overtime pay.',
    keywords: ['overtime pay calculator', 'overtime multiplier', 'hourly pay calculator', 'payroll estimate'],
    instructions: [
      'Enter your base hourly rate.',
      'Fill the overtime hours for the categories you want to estimate.',
      'Edit the multipliers to match your location, contract, or payroll rule.',
      'Review category totals and total overtime pay.',
    ],
    examples: [
      'Estimate this month’s weekday and rest-day overtime together.',
      'Compare overtime income under different multiplier assumptions.',
      'Create a copyable summary using multipliers provided by payroll.',
    ],
    faq: [
      {
        q: 'Are the default multipliers official rules?',
        a: 'No. Defaults are sample assumptions only. Edit them to match current regulations, contracts, or company payroll rules.',
      },
      {
        q: 'Does this cover every labor-law detail?',
        a: 'No. Local rules may include time bands, rest days, holidays, compensatory leave, and caps. This tool is a simplified estimate.',
      },
      {
        q: 'Can I use only one category?',
        a: 'Yes. Leave unused categories at 0 hours.',
      },
    ],
    labels: {
      hourlyRate: 'Base hourly rate',
      weekdayHours: 'Weekday overtime hours',
      weekdayMultiplier: 'Weekday multiplier',
      extendedHours: 'Extended hours',
      extendedMultiplier: 'Extended multiplier',
      restHours: 'Rest-day hours',
      restMultiplier: 'Rest-day multiplier',
      holidayHours: 'Holiday hours',
      holidayMultiplier: 'Holiday multiplier',
      calculate: 'Calculate',
      copy: 'Copy result',
      reset: 'Reset',
      weekdayPay: 'Weekday overtime',
      extendedPay: 'Extended hours',
      restPay: 'Rest day',
      holidayPay: 'Holiday',
      totalPay: 'Total overtime pay',
      assumptionNote: 'Rates are editable assumptions - verify against current regulations.',
      formula: 'Formula: overtime pay = hourly rate × hours × multiplier',
      invalidInput: 'Enter valid non-negative numbers.',
      copied: 'Copied',
    },
    disclaimer: 'This tool only estimates from user-entered multipliers and is not an official or legal calculation. Overtime rules vary by location, contract, and work type; verify against current regulations, company policy, or a qualified professional.',
    privacyNote: 'Hourly rate and hour inputs are calculated locally in your browser and are not uploaded.',
  },
} satisfies Record<'zh' | 'en', ToolContent>;

