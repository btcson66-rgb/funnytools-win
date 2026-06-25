import type { ToolContent } from './_types';

export default {
  zh: {
    name: '隨機分組工具',
    short: '將名單打散並平均分配到多個小組。',
    long: '隨機分組產生器適合老師在課堂討論、合作任務或活動破冰前快速建立小組。貼上一行一名、設定小組數後，工具會在瀏覽器內洗牌並輪流分配，讓各組人數盡量接近。結果可複製成文字，方便貼到簡報、通訊軟體或課堂公告中。',
    seoTitle: "隨機分組工具｜免費產生公平隨機小組與團隊",
    seoDescription: '免費隨機分組工具，只要輸入名單即可自動分組，適合老師、課堂活動與團隊活動使用。',
    keywords: [
      "隨機分組",
      "分組工具",
      "小組產生器",
      "隨機隊伍",
      "random group generator",
      "team generator",
      "課堂分組"
    ],
    capabilities: [
      '將一行一名的學生、參加者或團隊名單即時洗牌。',
      '按指定小組數輪流分配，讓各組人數差距盡量不超過一人。',
      '一鍵複製所有分組結果，可直接貼到簡報、群組或課堂公告。',
    ],
    contentSections: [
      {
        heading: "隨機分組工具可以做什麼",
        paragraphs: [
          "隨機分組工具可將名單打亂並平均分配到指定數量的小組，適合課堂討論、工作坊、活動破冰、遊戲隊伍與簡報分組。輸入一行一個名字，設定組數後即可產生可複製或匯出的分組結果。"
        ]
      },
      {
        heading: "什麼時候適合使用隨機分組",
        paragraphs: [
          "當你需要快速建立臨時小組，而且不想用試算表或手動抽籤時，這個工具很適合。"
        ],
        items: [
          "課堂討論、實驗或合作學習分組",
          "工作坊、讀書會或社團活動分組",
          "遊戲夜、競賽或破冰活動分隊",
          "簡報、專案或練習任務的初步分配"
        ]
      },
      {
        heading: "隨機分組使用步驟",
        paragraphs: [
          "1. 將參與者名單貼到輸入框，一行一個名字。",
          "2. 輸入要建立的小組數量。",
          "3. 按下產生分組，工具會隨機打亂並平均分配。",
          "4. 複製全部結果，或匯出 CSV 供試算表使用。"
        ]
      },
      {
        heading: "隨機分組建議",
        paragraphs: [
          "隨機分組能提高效率，但仍可依實際需求做最後調整。"
        ],
        items: [
          "有同名者時加入座號、代號或班級避免混淆",
          "若有特殊配對限制，產生後再手動調整",
          "組數不要超過人數，避免空組",
          "複製結果前先確認每組人數是否符合活動需求"
        ]
      }
    ],
    instructions: [
      '將所有名字貼到文字框中，每一行一個名字。',
      '輸入需要的小組數，例如 2、3 或 6 組。',
      '按「產生分組」，工具會洗牌後平均分配成各組。',
      '使用「複製全部」把分組結果貼到訊息、簡報或工作表中。',
    ],
    examples: [
      '課堂討論前把學生平均分成數組。',
      '工作坊破冰活動快速建立臨時小隊。',
      '線上遊戲或桌遊前隨機分隊。',
      '將報告主題或任務成員分配到各組。',
    ],
    audience: [
      '需要在短時間內完成討論分組、實驗分組或活動分隊的老師。',
      '帶領工作坊、讀書會或社團活動，想減少人工分組時間的主持人。',
      '需要把參與者分成多個小隊進行遊戲、競賽或破冰的活動工作者。',
      '想用文字結果快速公告小組名單，而不需要製作複雜表格的人。',
    ],
    caseStudies: [
      {
        title: '課堂討論前快速分組',
        description: '老師在投影畫面上貼入全班名單，設定 6 組後產生結果，再把文字複製到班級公告，學生可以立刻找到自己的討論小組。',
      },
      {
        title: '工作坊破冰活動',
        description: '主持人把報到名單貼進工具，依活動需求分成數個小隊，避免現場逐一安排座位與隊伍造成等待。',
      },
      {
        title: '報告任務分配',
        description: '課程助教先用工具產生初步小組，再依特殊需求手動微調，保留隨機分配的便利，也兼顧實際課務安排。',
      },
    ],
    notes: [
      '隨機結果適合做為教學輔助，不代表課堂公平性的唯一依據；老師仍可依學生需求調整。',
      '工具可把分組結果複製到剪貼簿，也可匯出 CSV（含組別與成員）方便用試算表整理；目前沒有 Excel 或圖片檔案匯出。',
      '同名學生建議加上座號、班級或代碼，避免複製結果後難以辨識。',
    ],
    faq: [
      {
        q: "分組如何保持平均？",
        a: "工具會先將名單洗牌，再用輪流發牌方式分配到各組，讓組員數盡量接近。"
      },
      {
        q: "可以指定兩個人同組或不同組嗎？",
        a: "目前不支援限制條件；若有特殊需求，建議先產生結果後手動調整。"
      },
      {
        q: "可以建立比人數更多的組嗎？",
        a: "不可以。組數必須介於 1 到名單人數之間，避免產生空組。"
      },
      {
        q: "名單會被儲存嗎？",
        a: "不會。名單與分組結果只在瀏覽器內處理，離開或重新整理後不會由工具保存。"
      }
    ],
    labels: {
      input: '名單',
      placeholder: '王小明\n陳怡君\nAlex\nMia\nNoah\nEmma',
      groupCount: '小組數',
      generate: '產生分組',
      reset: '重設',
      groupLabel: '第 {n} 組',
      copyAll: '複製全部',
      exportCsv: '匯出 CSV',
      csvGroup: '組別',
      csvMember: '成員',
      copied: '已複製',
      emptyError: '請先輸入至少兩個名字。',
      invalidError: '小組數必須是 1 到名單人數之間的整數。',
      emptyResult: '分組結果會顯示在這裡',
    },
    privacyNote: '名單與分組結果完全在你的瀏覽器本機處理，不會上傳到本站或第三方伺服器。關閉頁面後資料即消失。',
  },
  en: {
    name: 'Random Group Generator',
    short: 'Shuffle names and split them into balanced groups.',
    long: 'Random Group Generator helps teachers and facilitators create groups before discussions, cooperative tasks, workshops, or icebreakers. Paste one name per line, choose the number of groups, and the tool shuffles locally in your browser before dealing names into groups with similar sizes. Copy the plain-text result into slides, chat, notes, or class announcements.',
    seoTitle: "Random Group Generator | Free Balanced Team Splitter Online",
    seoDescription: 'Paste one name per line, choose the number of groups, and generate balanced random groups you can copy instantly.',
    keywords: [
      "random group generator",
      "team generator",
      "group maker",
      "random teams",
      "classroom group generator",
      "random team splitter",
      "balanced groups"
    ],
    contentSections: [
      {
        heading: "What Random Group Generator does",
        paragraphs: [
          "Random Group Generator shuffles a list of names and splits them into balanced groups. It is useful for classroom discussions, workshops, icebreakers, games, presentation teams, and temporary project groups."
        ]
      },
      {
        heading: "When to use Random Group Generator",
        paragraphs: [
          "Use it when you need temporary teams quickly and do not want to build a spreadsheet or draw names manually."
        ],
        items: [
          "Creating classroom discussion, lab, or activity groups",
          "Splitting workshop, reading group, or club participants",
          "Making teams for games, contests, or icebreakers",
          "Assigning presentation or practice groups"
        ]
      },
      {
        heading: "Step-by-step usage guide",
        paragraphs: [
          "1. Paste participant names into the text box, one per line.",
          "2. Enter the number of groups to create.",
          "3. Press Generate Groups to shuffle and distribute people evenly.",
          "4. Copy all groups as text or export a CSV for spreadsheets."
        ]
      },
      {
        heading: "Tips and best practices",
        paragraphs: [
          "Random grouping is fast, but final judgment still matters for real people."
        ],
        items: [
          "Add seat numbers or codes when duplicate names exist",
          "Manually adjust the result for special pairing constraints",
          "Keep group count at or below the number of names",
          "Review group sizes before sharing the copied result"
        ]
      }
    ],
    instructions: [
      'Paste every participant name into the textarea, one per line.',
      'Enter the number of groups you want to create.',
      'Press Generate Groups to shuffle and distribute people as evenly as possible.',
      'Copy all groups as plain text for chat, slides, worksheets, or notes.',
    ],
    examples: [
      'Split students into discussion groups for a classroom activity.',
      'Create workshop teams for a short exercise.',
      'Randomize teams before a game night or online match.',
      'Distribute project members across presentation groups.',
    ],
    audience: [
      'Teachers who need quick discussion groups, lab groups, or activity teams.',
      'Workshop hosts, reading group leaders, and club organizers reducing manual sorting time.',
      'Event staff who need several temporary teams for games, contests, or icebreakers.',
      'People who want a copyable text list without building a spreadsheet first.',
    ],
    caseStudies: [
      {
        title: 'Discussion groups before class',
        description: 'A teacher pastes the class list, creates six groups, and copies the result into the class announcement so students can find their group immediately.',
      },
      {
        title: 'Workshop icebreaker teams',
        description: 'A facilitator uses the check-in list to create small teams on the spot, reducing waiting time before the first exercise starts.',
      },
      {
        title: 'Presentation task planning',
        description: 'A teaching assistant creates an initial grouping, then manually adjusts a few special cases while keeping the speed of random assignment.',
      },
    ],
    notes: [
      'Random grouping is a teaching aid, not the only measure of fairness; adjust results when student needs require it.',
      'The tool copies plain-text results to the clipboard and can export a CSV (group and member); it does not export Excel or image files.',
      'Add seat numbers, class names, or codes when duplicate names could make the copied result unclear.',
    ],
    faq: [
      {
        q: "How are the groups balanced?",
        a: "The list is shuffled first, then names are dealt into groups round-robin so group sizes stay as even as possible."
      },
      {
        q: "Can I force two people to be together or apart?",
        a: "Not in this simple version. Generate the groups first, then adjust manually when constraints matter."
      },
      {
        q: "Can there be more groups than names?",
        a: "No. The group count must be between 1 and the number of names so empty groups are not created."
      },
      {
        q: "Is the list saved?",
        a: "No. Names and groups are processed in your browser and are not stored after you leave or refresh the page."
      }
    ],
    labels: {
      input: 'Names',
      placeholder: 'Avery\nJordan\nMia\nLeo\nNoah\nEmma',
      groupCount: 'Number of groups',
      generate: 'Generate Groups',
      reset: 'Reset',
      groupLabel: 'Group {n}',
      copyAll: 'Copy All',
      exportCsv: 'Export CSV',
      csvGroup: 'Group',
      csvMember: 'Member',
      copied: 'Copied',
      emptyError: 'Enter at least two names first.',
      invalidError: 'Number of groups must be a whole number from 1 to the number of names.',
      emptyResult: 'Generated groups appear here',
    },
    privacyNote: 'Names and group results are processed entirely in your browser and never uploaded to this site or any third-party server. Data disappears when you close the page.',
  },
} satisfies Record<'zh' | 'en', ToolContent>;
