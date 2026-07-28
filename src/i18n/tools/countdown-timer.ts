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
    name: '倒數計時器',
    short: '用時間長度或目標日期建立清楚的倒數。',
    long: '倒數計時器支援固定時長與目標日期兩種模式。你可以設定幾分鐘後提醒，也可以倒數到會議、截止日、活動開始或旅程出發時間，時間到時會顯示提示並播放短音效。',
    seoTitle: '倒數計時器｜日期、時間與活動倒數',
    seoDescription: '免費線上倒數計時器，支援時分秒、目標日期時間、開始暫停重設、瀏覽器標題更新、時間到音效與提示。',
    keywords: ['倒數計時器', 'Countdown Timer', '線上計時器', '目標日期倒數'],
    instructions: [
      '選擇「時長」模式輸入小時、分鐘與秒數，或選擇「目標時間」模式指定日期與時間。',
      '按開始後，剩餘時間會顯示在頁面與瀏覽器分頁標題中。',
      '需要中斷時可按暫停，想回到原本設定則按重設。',
      '時間到時，畫面會閃爍並嘗試播放一段短音效。',
    ],
    examples: [
      '設定 10 分鐘倒數，提醒自己休息或回到工作。',
      '倒數到線上會議、課程開始或直播開場。',
      '追蹤烹飪、運動間歇或讀書衝刺的時間。',
      '倒數到專案截止日或活動報名結束時間。',
    ],
    faq: [
      {
        q: '關掉頁面後倒數會繼續嗎？',
        a: '不會。這是瀏覽器內的簡易倒數工具，關閉分頁後計時狀態不會保留。',
      },
      {
        q: '為什麼沒有聽到提示音？',
        a: '部分瀏覽器需要使用者先與頁面互動才允許音效。按過開始後，多數現代瀏覽器都能播放短音效。',
      },
      {
        q: '目標時間模式可以倒數到明天或更遠嗎？',
        a: '可以。只要選擇未來的日期與時間，工具會顯示剩餘天數、時、分、秒。',
      },
      {
        q: '瀏覽器標題會一直被修改嗎？',
        a: '只有倒數執行中會更新標題；暫停、重設或時間到後會回復原本標題。',
      },
    ],
    labels: {
      durationMode: '時長',
      targetMode: '目標時間',
      hours: '時',
      minutes: '分',
      seconds: '秒',
      targetDate: '目標日期與時間',
      start: '開始',
      pause: '暫停',
      reset: '重設',
      timeUp: '時間到！',
      daysAbbr: '天',
      hoursAbbr: '時',
      minsAbbr: '分',
      secsAbbr: '秒',
      durationError: '請輸入大於 0 的時長。',
      targetError: '請選擇未來的目標時間。',
      ready: '準備開始',
      tabTitle: '{time} · 倒數計時器',
    },
  },
  en: {
    name: 'Countdown Timer',
    short: 'Count down by duration or to a target date and time.',
    long: 'Countdown Timer supports both fixed durations and exact target datetimes. Use it for short reminders, meetings, deadlines, events, cooking, workouts, or any moment where a clear browser-based countdown helps.',
    seoTitle: 'Countdown Timer | Duration and Date Countdown',
    seoDescription: 'Use a free online countdown timer with duration mode, target datetime mode, start, pause, reset, title updates, beep, and time-up alert.',
    keywords: ['countdown timer', 'online timer', 'date countdown', 'duration timer'],
    instructions: [
      'Choose Duration mode for hours, minutes, and seconds, or Target mode for a specific date and time.',
      'Press Start. The remaining time also appears in the browser tab title while running.',
      'Pause when you need to stop briefly, or Reset to return to the current setting.',
      'When the countdown reaches zero, the display flashes and the tool plays a short beep when allowed by the browser.',
    ],
    examples: [
      'Run a 10-minute reminder before returning to focused work.',
      'Count down to a meeting, class, livestream, or event opening.',
      'Track cooking, workouts, study sprints, and timed breaks.',
      'Watch the remaining time until a project deadline or registration close.',
    ],
    faq: [
      {
        q: 'Will the countdown keep running after I close the tab?',
        a: 'No. This is a simple browser timer, so the active state is not preserved after closing the page.',
      },
      {
        q: 'Why did I not hear the beep?',
        a: 'Some browsers block audio until you interact with a page. After pressing Start, the short beep should work in most modern browsers.',
      },
      {
        q: 'Can target mode count down to tomorrow or later?',
        a: 'Yes. Choose any future date and time, and the display will include days, hours, minutes, and seconds.',
      },
      {
        q: 'Does the page title stay changed?',
        a: 'Only while the timer is running. It is restored after pause, reset, or time-up.',
      },
    ],
    labels: {
      durationMode: 'Duration',
      targetMode: 'Target datetime',
      hours: 'HH',
      minutes: 'MM',
      seconds: 'SS',
      targetDate: 'Target date and time',
      start: 'Start',
      pause: 'Pause',
      reset: 'Reset',
      timeUp: "Time's up!",
      daysAbbr: 'd',
      hoursAbbr: 'h',
      minsAbbr: 'm',
      secsAbbr: 's',
      durationError: 'Enter a duration greater than zero.',
      targetError: 'Choose a future target time.',
      ready: 'Ready',
      tabTitle: '{time} · Countdown Timer',
    },
  },
} satisfies Record<'zh' | 'en', ToolContent>;

