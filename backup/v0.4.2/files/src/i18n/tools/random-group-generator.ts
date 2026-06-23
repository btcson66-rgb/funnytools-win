import type { ToolContent } from './_types';

export default {
  zh: {
    name: '隨機分組工具',
    short: '將名單打散並平均分配到多個小組。',
    long: '隨機分組產生器適合老師在課堂討論、合作任務或活動破冰前快速建立小組。貼上一行一名、設定小組數後，工具會在瀏覽器內洗牌並輪流分配，讓各組人數盡量接近。結果可複製成文字，方便貼到簡報、通訊軟體或課堂公告中。',
    seoTitle: '隨機分組工具｜免費線上名單分組，適合老師課堂與活動分組',
    seoDescription: '免費隨機分組工具，只要輸入名單即可自動分組，適合老師、課堂活動與團隊活動使用。',
    keywords: ['隨機分組', '隨機分組工具', '線上隨機分組', '老師分組工具', '課堂分組工具', '活動分組', '名單隨機分組'],
    capabilities: [
      '將一行一名的學生、參加者或團隊名單即時洗牌。',
      '按指定小組數輪流分配，讓各組人數差距盡量不超過一人。',
      '一鍵複製所有分組結果，可直接貼到簡報、群組或課堂公告。',
    ],
    contentSections: [
      {
        heading: '隨機分組工具是什麼？',
        paragraphs: [
          '隨機分組工具會先打亂輸入的名單，再把成員平均分配到指定數量的小組。比起人工逐一安排，線上隨機分組能更快完成初步分隊，也能減少依照座位、熟悉程度或輸入順序分組所造成的偏差。',
        ],
      },
      {
        heading: '老師為什麼需要隨機分組？',
        paragraphs: [
          '老師臨時要進行討論、報告或合作任務時，人工分組容易占用上課時間，也可能讓學生覺得分配方式不夠公平。將學生名單隨機分組，可以快速建立人數接近的小組，老師再依教學目標與個別需求做必要調整。',
        ],
      },
      {
        heading: '適合哪些課堂活動？',
        paragraphs: [
          '課堂分組工具適合需要短時間組隊的教學情境，例如小組討論、合作學習、實驗操作、口頭報告、閱讀分享、闖關活動與體育競賽。每次重新產生都會再次洗牌，也適合在不同課次更換合作對象。',
        ],
      },
      {
        heading: '如何輸入學生名單？',
        paragraphs: [
          '把名單貼到輸入框，每行輸入一位學生或參加者，再設定小組數並按下「產生分組」。若班上有同名學生，建議加上座號或簡短代碼；不需要輸入電話、學號等與分組無關的個人資料。',
        ],
      },
      {
        heading: '可以依照組數或每組人數分組嗎？',
        paragraphs: [
          '這個隨機分組工具目前以「組數」為設定方式，系統會讓各組人數盡量平均。如果你需要指定每組固定人數，可改用本站的課堂分組工具，選擇「每組人數」模式；名單無法整除時，最後一組會保留剩餘成員。',
        ],
      },
      {
        heading: '活動、抽獎與團隊合作也可以使用',
        paragraphs: [
          '除了老師分組，也能用於工作坊、營隊、公司訓練、社團活動、遊戲分隊或抽獎前的名單分批。若只需要抽出一位得主，可使用抽籤工具或轉盤工具；需要多人合作時，再用本頁建立隊伍。',
        ],
      },
      {
        heading: '使用隨機分組時的公平性與特殊需求安排',
        paragraphs: [
          '隨機化能降低主觀偏好，但不代表結果一定符合每個情境的公平需求。老師仍應檢查各組人數、學習支持、行動便利、語言需求與人際互動狀況；需要照顧特殊需求學生時，可先隨機產生初稿，再以清楚且尊重隱私的方式微調。',
        ],
      },
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
        q: '隨機分組工具可以免費使用嗎？',
        a: '可以。這項工具可免費使用，不需註冊或安裝軟體，開啟網頁即可輸入名單並產生分組。',
      },
      {
        q: '可以用在課堂分組嗎？',
        a: '可以。適合小組討論、合作學習、實驗、報告、遊戲與其他課堂活動。產生後，老師仍可依教學目標或學生需求微調。',
      },
      {
        q: '可以指定每組人數嗎？',
        a: '本頁目前設定的是小組數，會自動把人數平均分配。若要指定每組固定人數，請使用相關工具中的「課堂分組工具」。',
      },
      {
        q: '可以重新分組嗎？',
        a: '可以。再次按下「產生分組」就會重新洗牌，因此結果通常會不同；如需保留某次結果，請先複製文字或匯出 CSV。',
      },
      {
        q: '分組結果會儲存在伺服器嗎？',
        a: '不會。名單與分組都在目前的瀏覽器中處理，不會主動上傳到 FunnyTools 伺服器；重新整理或離開頁面後也不會保留。',
      },
      {
        q: '適合手機使用嗎？',
        a: '適合。可直接用手機瀏覽器貼上名單、設定組數及複製結果；名單較長時，使用電腦輸入與核對會更方便。',
      },
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
    seoTitle: 'Random Group Generator | Free online team splitter',
    seoDescription: 'Paste one name per line, choose the number of groups, and generate balanced random groups you can copy instantly.',
    keywords: ['random group generator', 'team generator', 'group maker', 'random teams'],
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
        q: 'How are the groups balanced?',
        a: 'The list is shuffled first, then members are dealt into groups round-robin so group sizes stay as even as possible.',
      },
      {
        q: 'Can I force two people to be together or apart?',
        a: 'Not in this simple version. It creates random groups without pairing rules, so adjust the result manually when special constraints matter.',
      },
      {
        q: 'Can there be more groups than names?',
        a: 'The tool asks for a group count between 1 and the number of names so it does not create empty groups.',
      },
      {
        q: 'Is the list saved?',
        a: 'No. Groups are generated in your browser and are not stored after you leave or refresh the page.',
      },
      {
        q: 'Can I export the groups to CSV, Excel, or an image?',
        a: 'You can export a CSV that opens in Excel or Google Sheets; there is no direct Excel or image export. You can also use Copy All to get plain text.',
      },
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
