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
    name: '日期差距計算器',
    short: '計算兩個日期之間的天數、週數、月份與工作日分布。',
    long: '日期差距計算器可以快速比較開始日與結束日，並同時顯示總天數、週數與剩餘天數、約略月份、年月日拆解、平日與週末天數。你也可以切換是否包含結束日期，讓計算更符合請假、專案或旅遊規劃情境。',
    seoTitle: '日期差距計算器｜計算兩日期相差天數',
    seoDescription: '免費計算兩個日期之間的總天數、週數、月份、年月日差距、平日與週末天數，可選擇是否包含結束日期。',
    keywords: ['日期差距', '天數計算', 'Date Difference Calculator', '平日週末計算'],
    instructions: [
      '選擇開始日期與結束日期。',
      '依照需求切換是否包含結束日期。',
      '按「計算」查看天數、週數、月份與年月日拆解。',
      '需要分享或記錄時，使用複製結果按鈕。',
    ],
    examples: [
      '計算專案從啟動日到截止日共有多少天。',
      '估算旅行天數，並確認其中有幾天是週末。',
      '比較兩個紀念日、合約日或活動日之間的差距。',
      '規劃請假時確認區間內的平日與週末數量。',
    ],
    faq: [
      {
        q: '包含結束日期是什麼意思？',
        a: '啟用後，結束日當天也算入總天數。例如 6 月 1 日到 6 月 1 日會算 1 天。',
      },
      {
        q: '月份差距是精確的嗎？',
        a: '工具會同時提供約略月份與日曆年月日拆解。約略月份使用平均月長估算，適合快速參考。',
      },
      {
        q: '平日與週末如何計算？',
        a: '平日是週一到週五，週末是週六與週日；沒有扣除國定假日。',
      },
      {
        q: '可以反向輸入日期嗎？',
        a: '可以。工具會顯示相同的絕對差距，方便比較兩個日期的距離。',
      },
    ],
    labels: {
      startDate: '開始日期',
      endDate: '結束日期',
      calculate: '計算',
      includeEnd: '包含結束日期',
      result: '計算結果',
      totalDays: '總天數',
      weeks: '週',
      weekSingular: '週',
      weekPlural: '週',
      days: '天',
      daySingular: '天',
      dayPlural: '天',
      months: '月',
      monthSingular: '月',
      monthPlural: '月',
      years: '年',
      yearSingular: '年',
      yearPlural: '年',
      weekdays: '平日',
      weekends: '週末',
      copyResult: '複製結果',
      copied: '已複製',
      invalidDate: '請選擇有效的開始與結束日期。',
      approximate: '約略',
      breakdown: '年月日拆解',
    },
  },
  en: {
    name: 'Date Difference Calculator',
    short: 'Calculate days, weeks, months, weekdays, and weekends between dates.',
    long: 'Date Difference Calculator compares a start date and an end date in several practical ways: total days, weeks plus remaining days, approximate months, calendar years-months-days, weekdays, and weekends. Toggle whether the end date should count for planning vacations, deadlines, contracts, and events.',
    seoTitle: 'Date Difference Calculator | Days Between Dates',
    seoDescription: 'Calculate the difference between two dates in total days, weeks, approximate months, years-months-days, weekdays, and weekends.',
    keywords: ['date difference calculator', 'days between dates', 'weekday counter', 'date calculator'],
    instructions: [
      'Choose a start date and an end date.',
      'Toggle Include end date when the final day should count in the range.',
      'Press Calculate to view days, weeks, months, and calendar breakdowns.',
      'Use Copy result when you need to save or share the calculation.',
    ],
    examples: [
      'Count how many days remain between a project kickoff and deadline.',
      'Estimate trip length and see how many weekend days are included.',
      'Compare anniversaries, contract dates, or event dates.',
      'Plan time off by checking weekdays and weekends in the range.',
    ],
    faq: [
      {
        q: 'What does include end date mean?',
        a: 'When enabled, the end date itself is counted. For example, June 1 to June 1 counts as 1 day.',
      },
      {
        q: 'Is the month result exact?',
        a: 'The tool shows both approximate months and a calendar years-months-days breakdown. Approximate months use average month length for quick reference.',
      },
      {
        q: 'How are weekdays and weekends counted?',
        a: 'Weekdays are Monday through Friday, and weekends are Saturday and Sunday. Public holidays are not removed.',
      },
      {
        q: 'Can I enter the later date first?',
        a: 'Yes. The calculator reports the absolute distance between the two dates.',
      },
    ],
    labels: {
      startDate: 'Start date',
      endDate: 'End date',
      calculate: 'Calculate',
      includeEnd: 'Include end date',
      result: 'Result',
      totalDays: 'Total days',
      weeks: 'Weeks',
      weekSingular: 'week',
      weekPlural: 'weeks',
      days: 'Days',
      daySingular: 'day',
      dayPlural: 'days',
      months: 'Months',
      monthSingular: 'month',
      monthPlural: 'months',
      years: 'Years',
      yearSingular: 'year',
      yearPlural: 'years',
      weekdays: 'Weekdays',
      weekends: 'Weekends',
      copyResult: 'Copy result',
      copied: 'Copied',
      invalidDate: 'Choose valid start and end dates.',
      approximate: 'Approx.',
      breakdown: 'Calendar breakdown',
    },
  },
} satisfies Record<'zh' | 'en', ToolContent>;

