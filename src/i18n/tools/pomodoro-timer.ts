import type { LocalizedToolContent } from './_types';

export default {
  zh: {
    name: '番茄鐘計時器',
    short: '用專注、短休息與長休息循環，建立穩定的工作節奏。',
    long: '這個番茄鐘計時器提供預設 25 分鐘專注、5 分鐘短休息與 15 分鐘長休息，也能依你的工作習慣自行調整。完成每 4 個專注段落後，工具會自動切換到長休息。計時期間瀏覽器分頁標題會顯示剩餘時間，適合寫作、讀書、行政工作、練習與需要避免分心的任務。',
    seoTitle: "番茄鐘計時器｜免費線上 Pomodoro 專注與休息計時",
    seoDescription: '免費線上番茄鐘計時器，可自訂專注、短休息、長休息分鐘數，自動切換階段並在瀏覽器分頁顯示剩餘時間。',
    keywords: [
      "番茄鐘",
      "番茄鐘計時器",
      "Pomodoro timer",
      "專注計時器",
      "工作計時器",
      "讀書計時器",
      "生產力工具"
    ],
    capabilities: [
      "提供專注、短休息與長休息循環，可自訂每段分鐘數。",
    ],
    contentSections: [
      {
        heading: "番茄鐘計時器適合解決的工作",
        paragraphs: [
          "適合把容易拖延的大任務拆成可開始的時間段。預設 25 分鐘專注、5 分鐘短休息、15 分鐘長休息，但你可以依工作內容調整。寫作、讀書、程式練習、行政整理、語言學習與家務，都可以用固定節奏降低分心。",
          "開始前先寫下本段只做一件事，例如改完第一段文案、整理 20 筆資料或讀完第 3 節。深度寫作或研究可以用 40 到 50 分鐘專注；回信、整理檔案或練習題則可能 15 到 20 分鐘就足夠。",
        ],
      },
      {
        heading: "建議使用流程",
        paragraphs: [
          "開始前先寫下本段只做一件事，例如改完第一段文案、整理 20 筆資料或讀完第 3 節。深度寫作或研究可以用 40 到 50 分鐘專注；回信、整理檔案或練習題則可能 15 到 20 分鐘就足夠。",
          "完成多段專注後安排長休息，是為了避免一直硬撐。工具會累計完成段落，你可以用這個數字回顧今天完成了幾個可衡量的工作段，而不是只看坐在桌前多久。",
        ],
        items: [
          "開始前先定義本段要完成的具體輸出",
          "休息時離開工作視窗，避免滑同一個螢幕",
          "太常中斷時，先把專注時間調短",
          "用完成段落數記錄節奏，不要只追求越多越好",
        ],
      },
      {
        heading: "限制與需要人工判斷的部分",
        paragraphs: [
          "番茄鐘只能提供節奏，不能保證效率。若任務本身不清楚、工具一直跳通知、或你同時開太多聊天視窗，計時器也很難幫忙。使用前先關閉不必要分頁，準備好文件、資料與水，會比單純按開始更有效。",
        ],
      },
    ],
    examples: [
      "用 25 分鐘寫完文章第一版，再用短休息離開螢幕。",
      "讀書時每段只處理一節內容，完成後記下段落數。",
      "行政工作用較短專注段清掉信件、發票或表格。",
      "把完成段落數記到習慣追蹤表，觀察一週節奏。",
    ],
    audience: [
      "需要快速處理番茄鐘計時器工作的人。",
    ],
    caseStudies: [
      {
        title: "????",
        description: "???????????????????????????????????",
      },
      {
        title: "????",
        description: "??? 25 ???????????????????????????",
      },
      {
        title: "????",
        description: "???? 15 ????????????????????????????",
      },
    ],
    notes: [
      "番茄鐘只能提供節奏，不能保證效率。若任務本身不清楚、工具一直跳通知、或你同時開太多聊天視窗，計時器也很難幫忙。使用前先關閉不必要分頁，準備好文件、資料與水，會比單純按開始更有效。",
    ],
    faq: [
      {
        q: "一定要用 25 分鐘嗎？",
        a: "不用。25 分鐘只是常見起點，你可以依任務難度、注意力狀態與工作環境調整。",
      },
      {
        q: "什麼時候要長休息？",
        a: "通常完成數個專注段落後安排長休息，讓注意力恢復，而不是一直硬撐。",
      },
      {
        q: "關閉頁面後會保存進度嗎？",
        a: "這個工具主要用於當前頁面的計時，不應當作長期紀錄資料庫；需要紀錄請另外寫到表格或日誌。",
      },
      {
        q: "適合所有工作嗎？",
        a: "不一定。需要長時間不中斷的會議、照護、客服或即時工作，可能不適合硬切成番茄鐘。",
      },
      {
        q: "如何讓番茄鐘更有效？",
        a: "每段開始前只設定一個清楚輸出，並在休息時離開工作畫面，下一段會更容易重新專注。",
      },
    ],

    instructions: [
      '確認專注、短休息與長休息的分鐘數；預設值可直接用於標準番茄鐘流程。',
      '按下開始後進入目前階段，瀏覽器分頁標題會同步顯示剩餘時間。',
      '需要暫停時按下暫停，想重新計算目前階段時按下重設。',
      '每完成 4 個專注階段後，系統會自動安排長休息。',
      '你調整過的分鐘數會保存在同一個瀏覽器中，下次開啟可繼續使用。',
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
    seoTitle: "Pomodoro Timer Online | Free Focus Timer with Breaks",
    seoDescription: 'Use a free online Pomodoro timer with custom work minutes, short breaks, long breaks, session count, title updates, and local settings.',
    keywords: [
      "Pomodoro timer",
      "online Pomodoro timer",
      "focus timer",
      "work timer",
      "study timer",
      "productivity timer",
      "break timer"
    ],
    capabilities: [
      "Run focus, short break, and long break cycles with adjustable minute values.",
    ],
    contentSections: [
      {
        heading: "What Pomodoro Timer is useful for",
        paragraphs: [
          "Use it to turn a vague, easy-to-delay task into a short work block you can start now. Writing, studying, coding practice, filing, language learning, design cleanup, and household admin can all benefit from a visible rhythm.",
          "Before pressing start, define one concrete output for the next session: revise one section, process 20 rows, solve five practice problems, outline one slide, or clear one inbox folder. Adjust session length to the task instead of treating 25 minutes as a rule.",
        ],
      },
      {
        heading: "Recommended workflow",
        paragraphs: [
          "Before pressing start, define one concrete output for the next session: revise one section, process 20 rows, solve five practice problems, outline one slide, or clear one inbox folder. Adjust session length to the task instead of treating 25 minutes as a rule.",
          "Completed session count can be a useful lightweight record of how much focused work happened today. If you want long-term tracking, write the task name, completed sessions, and a short note in your own spreadsheet, note app, or paper journal.",
        ],
        items: [
          "Define one clear output before starting each focus block",
          "Shorten sessions if you are repeatedly interrupted",
          "Use breaks away from the same work screen",
          "Record completed sessions in your own habit tracker if needed",
        ],
      },
      {
        heading: "Limits and human checks",
        paragraphs: [
          "A timer can provide structure, but it cannot fix unclear priorities, noisy tools, or an unrealistic workload. If a session fails, check the environment: chat windows, missing source material, vague scope, or a block length that does not match the work.",
          "A timer can provide structure, but it cannot fix unclear priorities, noisy tools, or an unrealistic workload. If a session fails, check the environment: chat windows, missing source material, vague scope, or a block length that does not match the work. After using the tool, move the result into the next workflow step: download it, copy it, paste it into Excel or Google Sheets, add it to a document, or test it in the real publishing environment.",
        ],
      },
    ],
    examples: [
      "Draft the first version of an article in one focus block.",
      "Study one textbook section, then take a real screen break.",
      "Use shorter sessions for email, invoices, or spreadsheet cleanup.",
      "Record completed focus blocks in a weekly habit tracker.",
    ],
    audience: [
      "People who need a quick pomodoro timer workflow in the browser.",
    ],
    caseStudies: [
      {
        title: "Writing sprint",
        description: "An editor splits work into outline, draft, and revision sessions, writing the session goal before each start.",
      },
      {
        title: "Exam study",
        description: "A student studies one section per focus block, takes a break, then logs completed sessions in a spreadsheet.",
      },
      {
        title: "Admin cleanup",
        description: "A worker uses 15-minute blocks for email, invoices, and forms so small tasks do not swallow the whole morning.",
      },
    ],
    notes: [
      "A timer can provide structure, but it cannot fix unclear priorities, noisy tools, or an unrealistic workload. If a session fails, check the environment: chat windows, missing source material, vague scope, or a block length that does not match the work.",
    ],
    faq: [
      {
        q: "Do I have to use 25 minutes?",
        a: "No. 25 minutes is a common starting point. Adjust focus and break lengths to fit the task and your attention span.",
      },
      {
        q: "When should I take a long break?",
        a: "A long break is useful after several completed focus sessions so you can recover instead of pushing through fatigue.",
      },
      {
        q: "Is progress saved after closing the page?",
        a: "Treat this as a live timer, not a long-term database. Record progress in your own tracker if it matters.",
      },
      {
        q: "Does Pomodoro work for every job?",
        a: "No. Meetings, care work, live support, and other interrupt-driven tasks may not fit strict focus blocks.",
      },
      {
        q: "How can I make it more effective?",
        a: "Start each session with one concrete output and use breaks away from the same screen.",
      },
    ],

    instructions: [
      'Review the work, short break, and long break lengths. The defaults are ready for a standard Pomodoro flow.',
      'Press Start to begin. The browser tab title updates with the remaining time while the timer is running.',
      'Use Pause if you need to stop briefly. Reset returns the current phase to its full duration.',
      'After four completed work sessions, the timer automatically schedules a long break.',
      'Custom minute settings are saved in the same browser for future visits.',
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
