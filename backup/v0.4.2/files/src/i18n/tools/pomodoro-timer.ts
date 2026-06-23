import type { LocalizedToolContent } from './_types';

export default {
  zh: {
    name: '番茄鐘計時器',
    short: '用專注、短休息與長休息循環，建立穩定的工作節奏。',
    long: '這個番茄鐘計時器提供預設 25 分鐘專注、5 分鐘短休息與 15 分鐘長休息，也能依你的工作習慣自行調整。完成每 4 個專注段落後，工具會自動切換到長休息。計時期間瀏覽器分頁標題會顯示剩餘時間，適合寫作、讀書、行政工作、練習與需要避免分心的任務。',
    seoTitle: '番茄鐘計時器｜免費線上 Pomodoro 專注工具',
    seoDescription: '免費線上番茄鐘計時器，可自訂專注、短休息、長休息分鐘數，自動切換階段並在瀏覽器分頁顯示剩餘時間。',
    keywords: ['番茄鐘', 'Pomodoro', '專注計時器', '工作計時器', '讀書計時器'],
    instructions: [
      '確認專注、短休息與長休息的分鐘數；預設值可直接用於標準番茄鐘流程。',
      '按下開始後進入目前階段，瀏覽器分頁標題會同步顯示剩餘時間。',
      '需要暫停時按下暫停，想重新計算目前階段時按下重設。',
      '每完成 4 個專注階段後，系統會自動安排長休息。',
      '你調整過的分鐘數會保存在同一個瀏覽器中，下次開啟可繼續使用。',
    ],
    examples: [
      '寫文章、企劃或程式時，把大型任務拆成 25 分鐘專注段落。',
      '讀書或準備考試時，用短休息降低疲勞並維持節奏。',
      '批次處理 Email、報表或行政事項，避免一直切換任務。',
      '練習語言、樂器或技能時，用固定時間追蹤練習量。',
      '長時間用電腦工作時，用休息階段提醒自己伸展、喝水或離開螢幕。',
    ],
    audience: [
      '需要把大型任務拆成可管理段落的自由工作者、寫手與設計師。',
      '準備考試或長時間讀書，想維持穩定節奏並避免疲勞的學生。',
      '經常被 Email、訊息打斷，想用固定區段專心處理批次工作的上班族。',
      '練習語言、樂器或程式，想用計時追蹤練習量的自學者。',
    ],
    notes: [
      '番茄鐘是一般時間管理技巧，效果因人而異；若你有注意力或焦慮相關困擾，請諮詢專業人士。',
      '計時器在瀏覽器分頁中運作，關閉或重整頁面後倒數狀態會結束，但自訂分鐘數會保留。',
      '長時間使用電腦時，建議在休息階段離開螢幕、伸展或補充水分。',
    ],
    caseStudies: [
      {
        title: '寫作衝刺',
        description: '作者設定 25 分鐘專心撰寫初稿，5 分鐘整理筆記與休息，連續 4 輪後用長休息重新規劃下一段。',
      },
      {
        title: '考前複習',
        description: '學生把章節拆成多個番茄鐘，每輪只處理一個小主題，休息時間不碰新內容，降低認知負擔。',
      },
      {
        title: '行政批次處理',
        description: '工作者用 15 或 20 分鐘專注段快速清掉郵件、請款或表單，避免零碎工作佔滿整天。',
      },
    ],
    faq: [
      {
        q: '番茄鐘一定要 25 分鐘嗎？',
        a: '不一定。25 分鐘是常見預設值，你可以依任務難度、精神狀態或會議間隔調整專注與休息長度。',
      },
      {
        q: '我的番茄鐘設定會被保存嗎？',
        a: '會。專注、短休息與長休息分鐘數會保存在此瀏覽器的 localStorage；正在倒數的即時狀態不會跨分頁或重整保存。',
      },
      {
        q: '計時器會自動切換階段嗎？',
        a: '會。專注結束後會切到休息，休息結束後會回到專注；每完成 4 個專注階段後會切到長休息。',
      },
      {
        q: '為什麼我沒有聽到提示音？',
        a: '部分瀏覽器會限制尚未互動頁面的音訊播放。按下開始後，多數現代瀏覽器都能播放短提示音。',
      },
      {
        q: '關閉頁面後計時還會繼續嗎？',
        a: '不會。此工具在瀏覽器頁面內運作，關閉或重新整理頁面後，目前倒數狀態會結束。',
      },
    ],
    labels: {
      workMinutes: '專注分鐘',
      breakMinutes: '短休息分鐘',
      longBreakMinutes: '長休息分鐘',
      start: '開始',
      pause: '暫停',
      reset: '重設',
      work: '專注',
      break: '休息',
      longBreak: '長休息',
      completed: '已完成專注段落',
      sessions: '段',
      minutesError: '分鐘必須是 1 到 180 之間的整數。',
    },
    privacyNote: '番茄鐘設定只保存在你的瀏覽器 localStorage 中，用來記住你偏好的分鐘數。本站不會接收你的計時設定、使用紀錄或專注段落數。',
    disclaimer: '此工具提供一般時間管理與專注輔助，不是醫療、心理健康或職業效率診斷工具；若你有睡眠、焦慮或健康問題，請尋求合格專業協助。',
  },
  en: {
    name: 'Pomodoro Timer',
    short: 'Build a steady focus rhythm with work sessions, short breaks, and long breaks.',
    long: 'This Pomodoro timer helps you work in clear focus blocks. It starts with the classic 25-minute work session, 5-minute short break, and 15-minute long break, but you can adjust every duration to match your routine. After every four completed work sessions, the timer automatically schedules a long break. The browser tab title updates while the timer is running, which makes it useful for writing, studying, admin work, practice, and distraction-resistant sessions.',
    seoTitle: 'Pomodoro Timer | Free online focus timer',
    seoDescription: 'Use a free online Pomodoro timer with custom work minutes, short breaks, long breaks, session count, title updates, and local settings.',
    keywords: ['Pomodoro timer', 'focus timer', 'work timer', 'productivity timer', 'study timer'],
    instructions: [
      'Review the work, short break, and long break lengths. The defaults are ready for a standard Pomodoro flow.',
      'Press Start to begin. The browser tab title updates with the remaining time while the timer is running.',
      'Use Pause if you need to stop briefly. Reset returns the current phase to its full duration.',
      'After four completed work sessions, the timer automatically schedules a long break.',
      'Custom minute settings are saved in the same browser for future visits.',
    ],
    examples: [
      'Draft articles, plans, or code by breaking a large task into 25-minute focus blocks.',
      'Study one chapter or topic at a time while using short breaks to reduce fatigue.',
      'Batch email, reports, and admin work into deliberate sessions instead of constant task switching.',
      'Track language, music, or skill practice with repeatable timed sessions.',
      'Use breaks as reminders to stretch, hydrate, or step away from the screen during long computer work.',
    ],
    audience: [
      'Freelancers, writers, and designers who need to break large tasks into manageable blocks.',
      'Students preparing for exams or studying for long periods who want a steady pace without burnout.',
      'Office workers frequently interrupted by email and messages who want dedicated batch-processing time.',
      'Self-learners practicing languages, instruments, or coding who want timed sessions to track progress.',
    ],
    notes: [
      'The Pomodoro Technique is a general time-management method; results vary by person. Consult a professional for attention or anxiety concerns.',
      'The timer runs inside the browser tab. Closing or refreshing the page ends the countdown, but custom minute settings are preserved.',
      'During long computer sessions, use break phases to step away from the screen, stretch, and hydrate.',
    ],
    caseStudies: [
      {
        title: 'Writing sprint',
        description: 'A writer uses 25 minutes for a rough draft, 5 minutes for notes and recovery, then a long break after four rounds to plan the next section.',
      },
      {
        title: 'Exam review',
        description: 'A student splits chapters into focused blocks, covers one topic per session, and keeps breaks separate from new material.',
      },
      {
        title: 'Admin batching',
        description: 'A worker sets 15 or 20 minute sessions to clear email, invoices, and forms before returning to deeper work.',
      },
    ],
    faq: [
      {
        q: 'Does a Pomodoro session have to be 25 minutes?',
        a: 'No. 25 minutes is a common default, but you can adjust work and break lengths based on task difficulty, energy, and schedule.',
      },
      {
        q: 'Are my Pomodoro settings saved?',
        a: 'Yes. Work, short break, and long break lengths are saved in localStorage for this browser. The active countdown state is not saved across refreshes.',
      },
      {
        q: 'Does the timer switch phases automatically?',
        a: 'Yes. It moves from work to break, from break to work, and uses a long break after every four completed work sessions.',
      },
      {
        q: 'Why did I not hear the beep?',
        a: 'Some browsers limit audio until you interact with the page. After pressing Start, the short Web Audio beep should work in most modern browsers.',
      },
      {
        q: 'Will the timer continue after I close the page?',
        a: 'No. The timer runs inside the open browser page. Closing or refreshing the page ends the current countdown state.',
      },
    ],
    labels: {
      workMinutes: 'Work minutes',
      breakMinutes: 'Break minutes',
      longBreakMinutes: 'Long break minutes',
      start: 'Start',
      pause: 'Pause',
      reset: 'Reset',
      work: 'Work',
      break: 'Break',
      longBreak: 'Long break',
      completed: 'Completed work sessions',
      sessions: 'sessions',
      minutesError: 'Minutes must be whole numbers from 1 to 180.',
    },
    privacyNote: 'Your custom Pomodoro minute settings are stored only in this browser using localStorage. FunnyTools does not receive your timer settings, session count, or usage history.',
    disclaimer: 'This tool is a general time-management aid. It is not medical, mental-health, or workplace performance advice. For sleep, anxiety, or health concerns, consult a qualified professional.',
  },
} satisfies LocalizedToolContent;
