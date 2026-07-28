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
    name: '年齡計算器',
    short: '計算生日到指定日期的年齡、已活天數與下次生日倒數。',
    long: '年齡計算器會根據生日與指定日期，顯示年、月、日形式的年齡、累積生活天數、近似小時數、下次生日倒數、出生星期與趣味心跳估算。適合生日提醒、表單確認、活動資格與個人紀念日規劃。',
    seoTitle: '年齡計算器｜生日、歲數與天數試算',
    seoDescription: '輸入生日即可計算實際年齡、月數、天數、小時、已活天數、下次生日倒數、出生星期與趣味心跳估算。',
    keywords: ['年齡計算器', '生日計算', 'Age Calculator', '下次生日倒數'],
    instructions: [
      '選擇生日日期。',
      '使用今天作為計算基準，或改成自訂日期。',
      '按「計算」查看年齡、已活天數與下次生日倒數。',
      '使用複製結果把摘要貼到筆記或訊息中。',
    ],
    examples: [
      '確認活動或課程報名是否達到指定年齡。',
      '查看自己或家人的下一次生日還有幾天。',
      '計算從出生到今天已經經過多少天與小時。',
      '製作生日卡片或紀念日內容時加入出生星期。',
    ],
    faq: [
      {
        q: '年齡是精確到哪裡？',
        a: '年月日拆解會以日曆日期計算；小時與心跳是用天數推估的近似值。',
      },
      {
        q: '可以用不是今天的日期來計算嗎？',
        a: '可以。修改「計算至」日期，就能查看某一天當下的年齡。',
      },
      {
        q: '心跳估算代表健康數據嗎？',
        a: '不是。它只是以每分鐘 70 次的簡化假設做出的趣味估算。',
      },
      {
        q: '生日資料會被儲存嗎？',
        a: '不會。計算在瀏覽器中完成，工具不會儲存或上傳生日。',
      },
    ],
    labels: {
      birthday: '生日',
      asOf: '計算至',
      calculate: '計算',
      useToday: '使用今天',
      result: '年齡結果',
      years: '歲',
      yearSingular: '歲',
      months: '個月',
      monthSingular: '個月',
      days: '天',
      daySingular: '天',
      hours: '小時',
      daysLived: '已活天數',
      nextBirthday: '距離下次生日',
      bornWeekday: '出生星期',
      heartbeats: '趣味心跳估算',
      copyResult: '複製結果',
      copied: '已複製',
      birthdayError: '請先選擇有效的生日。',
      futureError: '生日不能晚於計算日期。',
      approximate: '約',
    },
    disclaimer: '心跳數與小時數為趣味估算，不應作為醫療或健康判斷依據。',
  },
  en: {
    name: 'Age Calculator',
    short: 'Calculate age, days lived, next birthday, and birthday facts.',
    long: 'Age Calculator uses a birthday and an as-of date to show age in years, months, and days, plus total days lived, approximate hours lived, next birthday countdown, weekday born, and a playful heartbeat estimate. It is useful for birthday planning, eligibility checks, forms, and personal milestones.',
    seoTitle: 'Age Calculator | Birthday, Age and Days Calculator',
    seoDescription: 'Enter a birthday to calculate age in years, months, days, hours, total days lived, next birthday countdown, weekday born, and a fun heartbeat estimate.',
    keywords: ['age calculator', 'birthday calculator', 'days lived', 'next birthday'],
    instructions: [
      'Choose the birthday date.',
      'Keep today as the as-of date or choose a custom date.',
      'Press Calculate to see age, days lived, and next birthday countdown.',
      'Copy the result when you want a clean summary for notes or messages.',
    ],
    examples: [
      'Check whether someone meets an age requirement for an activity or course.',
      'See how many days remain until a family member’s next birthday.',
      'Calculate how many days and approximate hours have passed since birth.',
      'Add the weekday born to birthday cards or milestone notes.',
    ],
    faq: [
      {
        q: 'How exact is the age result?',
        a: 'The years-months-days breakdown uses calendar dates. Hours and heartbeats are approximate estimates based on total days.',
      },
      {
        q: 'Can I calculate age on a date other than today?',
        a: 'Yes. Change the as-of date to see the age on any chosen day.',
      },
      {
        q: 'Is the heartbeat estimate medical information?',
        a: 'No. It is a simple fun estimate using 70 beats per minute, not a health measurement.',
      },
      {
        q: 'Is the birthday stored?',
        a: 'No. The calculation happens in your browser, and the tool does not store or upload the date.',
      },
    ],
    labels: {
      birthday: 'Birthday',
      asOf: 'As of',
      calculate: 'Calculate',
      useToday: 'Use today',
      result: 'Age result',
      years: 'years',
      yearSingular: 'year',
      months: 'months',
      monthSingular: 'month',
      days: 'days',
      daySingular: 'day',
      hours: 'hours',
      daysLived: 'Days lived',
      nextBirthday: 'Days until next birthday',
      bornWeekday: 'Born on',
      heartbeats: 'Fun heartbeat estimate',
      copyResult: 'Copy result',
      copied: 'Copied',
      birthdayError: 'Choose a valid birthday first.',
      futureError: 'Birthday cannot be after the as-of date.',
      approximate: 'Approx.',
    },
    disclaimer: 'Heartbeat and hour counts are playful estimates and should not be used for medical or health decisions.',
  },
} satisfies Record<'zh' | 'en', ToolContent>;

