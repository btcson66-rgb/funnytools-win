import type { ToolContent } from './_types';

export default {
  zh: {
    name: '加班費試算器',
    short: '用時薪、加班時數與倍率估算不同類型的加班費。',
    long: '加班費試算器提供可編輯倍率，讓你用基本時薪、平日加班、延長工時、休息日與假日工時估算加班收入。工具會依照「時薪乘以時數乘以倍率」計算各類別金額與總額，適合做薪資核對前的草稿，但不代表官方法規或公司薪資系統結果。',
    seoTitle: '加班費試算器｜可編輯時薪、時數與倍率',
    seoDescription: '輸入基本時薪、各類加班時數與可編輯倍率，估算平日、延長工時、休息日及假日加班費與合計金額。',
    keywords: ['加班費試算器', 'overtime pay calculator', '加班倍率', '時薪計算'],
    instructions: [
      '輸入基本時薪，作為所有加班類別的計算基礎。',
      '在需要估算的類別填入加班時數，不使用的類別可留 0。',
      '依照所在地法規、契約或公司規則調整每個倍率。',
      '查看各類別加班費與總額，必要時複製摘要給自己留存。',
    ],
    examples: [
      '月底前先估算本月平日加班與休息日加班合計金額。',
      '把公司公告的倍率輸入工具，檢查薪資單上的加班項目。',
      '比較不同班表安排下，加班時數與總加班費的差異。',
      '在與人資或主管溝通前，整理一份可讀的估算摘要。',
    ],
    audience: [
      '按時薪或固定薪資換算時薪後，想先核對加班收入的員工。',
      '需要用不同倍率比較班表安排的排班者或小型團隊管理者。',
      '整理薪資單、工時紀錄或個人財務紀錄的使用者。',
      '想用簡化模型向同事說明加班費計算方式的人。',
    ],
    caseStudies: [
      {
        title: '薪資單初步核對',
        description: '員工把時薪、加班時數與公司公告倍率輸入工具，先找出需要向人資確認的差異項目。',
      },
      {
        title: '班表方案比較',
        description: '排班者用不同加班類別試算，了解平日延長與假日安排對預估成本的影響。',
      },
      {
        title: '工時紀錄整理',
        description: '使用者每週複製一次估算摘要到筆記，月底對照薪資單時更容易追蹤來源。',
      },
    ],
    notes: [
      '預設倍率只是範例，請依照最新法規、勞動契約、公司制度或薪資單規則調整。',
      '實際加班費可能還涉及工時區間、補休、休息日定義、國定假日、上限與稅務扣除。',
      '此工具只做算術估算，不提供法律、勞務或薪資申報建議。',
    ],
    formula: {
      expression: '加班費總額 = Σ（基本時薪 × 各類加班時數 × 該類倍率）',
      explanation: '平日、延長工時、休息日與假日倍率都可自行輸入。預設倍率只是示範，不是即時法規資料；請依所在地最新法規、勞動契約、公司制度或薪資單規則調整。',
    },
    faq: [
      {
        q: '試算結果準確嗎？',
        a: '工具會依輸入的時薪、時數與倍率做算術計算，但不會自動判斷分段工時、補休、假日認定或其他法規條件。',
      },
      {
        q: '可以作為正式財務決策依據嗎？',
        a: '不可以。正式加班費與薪資爭議請以法規、勞動契約、公司薪資制度、人資或專業人士提供的資料為準。',
      },
      {
        q: '為什麼實際金額可能不同？',
        a: '差異可能來自時薪換算方式、分段倍率、工時認定、補休、稅務扣除、公司制度與四捨五入。',
      },
      {
        q: '利率、稅率或費用改變時怎麼辦？',
        a: '本工具主要使用加班倍率；規則或扣除變動時，請依最新正式資料更新倍率，並另外核對稅務與其他扣除。',
      },
      {
        q: '預設倍率是官方規定嗎？',
        a: '不是。預設值只是方便示範的起點，請依照你所在地的現行規定、契約或公司薪資規則修改。',
      },
      {
        q: '可以只計算一種加班嗎？',
        a: '可以。只在需要的類別輸入時數，其他欄位保留 0 即可。',
      },
      {
        q: '固定月薪的人可以使用嗎？',
        a: '可以先依公司或法規認定方式換算時薪，再把時薪輸入工具；正式金額仍應以薪資規則為準。',
      },
      {
        q: '這會處理所有勞動法細節嗎？',
        a: '不會。不同地區可能有分段倍率、補休、假日定義與工時上限，工具只提供簡化估算。',
      },
      {
        q: '為什麼要保留假設說明？',
        a: '因為加班費高度依賴規則與倍率，複製摘要時保留假設，之後核對或詢問會比較清楚。',
      },
    ],
    labels: {
      hourlyRate: '基本時薪',
      weekdayHours: '平日加班時數',
      weekdayMultiplier: '平日倍率',
      extendedHours: '延長工時',
      extendedMultiplier: '延長倍率',
      restHours: '休息日時數',
      restMultiplier: '休息日倍率',
      holidayHours: '假日時數',
      holidayMultiplier: '假日倍率',
      calculate: '計算',
      copy: '複製結果',
      reset: '重設',
      weekdayPay: '平日加班費',
      extendedPay: '延長工時',
      restPay: '休息日',
      holidayPay: '假日',
      totalPay: '加班費總額',
      assumptionNote: '倍率為可編輯假設，請依最新法規、契約或公司薪資規則確認。',
      formula: '公式：加班費 = 時薪 x 時數 x 倍率',
      invalidInput: '請輸入有效且不為負的數字。',
      copied: '已複製',
    },
    disclaimer: '本工具試算結果僅供參考，不構成投資、稅務、法律、貸款或財務建議。實際金額、利率、稅率、費用與還款條件，請以銀行、政府機關、雇主或專業人士提供的正式資料為準。加班倍率為使用者可編輯假設，會因地區、契約、職務與公司制度而異。',
    privacyNote: '時薪與工時資料只會在你的瀏覽器中計算，不會上傳到伺服器。',
  },
  en: {
    name: 'Overtime Pay Calculator',
    short: 'Estimate overtime pay from hours, hourly rate, and editable multipliers.',
    long: 'Overtime Pay Calculator lets you estimate extra pay with editable assumptions. Enter a base hourly rate, overtime hours, and multipliers for weekday, extended, rest-day, or holiday work. The tool calculates each category as hourly rate times hours times multiplier, then sums the total overtime pay. Use it as a payroll-check draft, not as an official labor-law or company payroll result.',
    seoTitle: 'Overtime Pay Calculator | Editable Multiplier Estimate',
    seoDescription: 'Enter hourly wage, overtime hours, and editable multipliers to estimate weekday, extended, rest-day, or holiday overtime pay.',
    keywords: ['overtime pay calculator', 'overtime multiplier', 'hourly pay calculator', 'payroll estimate'],
    instructions: [
      'Enter your base hourly rate.',
      'Fill in overtime hours for the categories you want to estimate and leave unused categories at 0.',
      'Edit each multiplier to match your location, contract, or company payroll rule.',
      'Review category totals and total overtime pay, then copy the summary if needed.',
    ],
    examples: [
      'Estimate this month\'s weekday and rest-day overtime before payroll closes.',
      'Check a payslip by entering the multipliers announced by your company.',
      'Compare how different shift plans change estimated overtime cost.',
      'Prepare a readable calculation summary before asking payroll or a manager.',
    ],
    audience: [
      'Hourly workers, or salaried workers who have a defined hourly-rate conversion.',
      'Schedulers and small-team managers comparing overtime assumptions.',
      'People organizing payslips, timesheets, personal finance records, or reimbursement notes.',
      'Anyone explaining a simplified overtime calculation to coworkers or family.',
    ],
    caseStudies: [
      {
        title: 'Payslip review draft',
        description: 'An employee enters recorded hours and company multipliers to spot items that may need a payroll clarification.',
      },
      {
        title: 'Shift plan comparison',
        description: 'A scheduler compares weekday extension and holiday work to understand how different schedules change estimated labor cost.',
      },
      {
        title: 'Timesheet note trail',
        description: 'A worker copies a weekly estimate into notes so the final month-end payslip is easier to review.',
      },
    ],
    notes: [
      'Default multipliers are examples only; replace them with current regulations, contract terms, company policy, or payslip rules.',
      'Real overtime pay can depend on time bands, compensatory leave, rest-day definitions, holiday rules, caps, taxes, and deductions.',
      'This tool is arithmetic support only and does not provide legal, labor, payroll, or tax advice.',
    ],
    formula: {
      expression: 'Total overtime pay = Σ (base hourly rate × category hours × category multiplier)',
      explanation: 'Weekday, extended, rest-day, and holiday multipliers are user-editable. Defaults are examples, not live legal data; replace them with current regulations, contract terms, employer policy, or payslip rules.',
    },
    faq: [
      {
        q: 'How accurate is the estimate?',
        a: 'The arithmetic follows your hourly rate, hours, and multipliers, but the tool does not determine time bands, compensatory leave, holiday status, or every legal condition.',
      },
      {
        q: 'Can I use it as the basis for a formal financial decision?',
        a: 'No. Formal overtime pay and payroll disputes should rely on regulations, employment contracts, employer payroll records, or qualified professional advice.',
      },
      {
        q: 'Why can the actual amount differ?',
        a: 'Differences can come from hourly-rate conversion, tiered multipliers, recognized hours, compensatory leave, tax deductions, employer policy, and rounding.',
      },
      {
        q: 'What should I do when rates, taxes, or fees change?',
        a: 'This tool mainly uses overtime multipliers. Update them from current formal sources, then review taxes and other deductions separately.',
      },
      {
        q: 'Are the default multipliers official rules?',
        a: 'No. Defaults are sample assumptions only. Edit them to match current regulations, contracts, or company payroll rules.',
      },
      {
        q: 'Can I use only one category?',
        a: 'Yes. Enter hours only for the category you need and leave all other hour fields at 0.',
      },
      {
        q: 'Can salaried employees use it?',
        a: 'Yes, if you first convert salary to the hourly rate required by your policy or local rules. Formal payroll should still follow official rules.',
      },
      {
        q: 'Does this cover every labor-law detail?',
        a: 'No. Local rules may include time bands, rest days, holidays, compensatory leave, and caps. This tool is a simplified estimate.',
      },
      {
        q: 'Why copy the assumption note?',
        a: 'Overtime depends heavily on rules and multipliers, so keeping the assumptions with the result makes later review clearer.',
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
      assumptionNote: 'Rates are editable assumptions. Verify against current regulations, contracts, or payroll rules.',
      formula: 'Formula: overtime pay = hourly rate x hours x multiplier',
      invalidInput: 'Enter valid non-negative numbers.',
      copied: 'Copied',
    },
    disclaimer: 'Results are for reference only and do not constitute investment, tax, legal, lending, or financial advice. Confirm actual amounts, rates, taxes, fees, and repayment terms with banks, government agencies, employers, or qualified professionals. Overtime multipliers are editable assumptions that vary by location, contract, job type, and employer policy.',
    privacyNote: 'Hourly rate and hour inputs are calculated locally in your browser and are not uploaded.',
  },
} satisfies Record<'zh' | 'en', ToolContent>;
