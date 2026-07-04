import type { ToolContent } from './_types';

export default {
  zh: {
    name: '隨機姓名抽選器',
    short: '姓名抽籤工具，從名單中公平抽出一個或多個名字。',
    long: '隨機姓名抽選器適合課堂點名、活動抽獎、會議分工與任何需要從名單中公平選出人選的場合。貼上一行一個名字，選擇抽一位或多位，也可以在抽出後自動從名單移除，避免重複中選。',
    seoTitle: '姓名抽籤｜免費隨機姓名抽選器線上工具',
    seoDescription: '免費姓名抽籤工具，一行輸入一個名字，可抽一位或多位並自動移除，適合課堂點名、活動抽獎與團隊分工。',
    keywords: ['隨機姓名', '抽籤工具', '名單抽選', 'Random Name Picker'],
    capabilities: [
      "從一行一個名字的清單中抽出一位或多位，適合課堂點名、活動抽獎與會議分工。",
    ],
    contentSections: [
      {
        heading: "姓名抽籤工具適合解決的工作",
        paragraphs: [
          "最適合用在你已經有一份候選名單，但不想靠記憶、座位遠近或主持人的偏好做決定時。老師可以用它抽答、排報告順序或安排值日工作；活動主持人可以用它抽出得獎者、分享者或小隊代表；團隊也可以用它輪流分配會議記錄、時間提醒或下一位簡報者。",
          "名單整理比按下抽選更重要。建議一行只放一個名字，同名者加上座號、部門或簡短代碼；如果要公開投影抽選畫面，使用暱稱或編號會比完整姓名更安全。",
        ],
      },
      {
        heading: "建議使用流程",
        paragraphs: [
          "單次抽一位適合課堂問答、主持人點名或會議輪值；一次抽多位則適合抽獎、分配分享順序或挑出一批志工。需要本輪不重複時，保留抽出後從名單移除；只要展示一次公平結果時，可以關閉移除選項。",
          "抽完後可複製結果到 Google Sheets、Excel 備註、班級公告、活動紀錄或聊天室。正式抽獎前仍應先清理重複報名、無效資料與不符合資格的候選項目；抽選後也建議保留原始名單、抽選時間與複製結果。",
        ],
        items: [
          "名單有同名者時，先加座號、組別或識別代碼",
          "多位抽選的數量不能大於目前剩餘名單數",
          "正式獎項或爭議活動，抽選後仍需人工核對資格",
          "要放進表格時，先複製結果再貼到 Excel 或 Google Sheets",
        ],
      },
      {
        heading: "限制與需要人工判斷的部分",
        paragraphs: [
          "抽選在你的瀏覽器內完成，名單不會被 FunnyTools 上傳或保存。這對學生名單、內部成員清單或小型活動報名資料很重要，但也代表重新整理頁面後資料會消失；如果需要留存結果，請在關閉頁面前複製到自己的文件。",
          "隨機抽選適合日常教學、團隊活動與非正式決策，不等同公證、審計或法規要求的抽獎流程。若獎項價值高、規則有法律效力或需要第三方見證，應搭配活動規章、時間戳記、錄影或正式抽獎系統。",
        ],
      },
    ],
    examples: [
      "老師貼上全班名單，抽一位學生回答暖身問題。",
      "活動主持人從報名名單抽出三位得獎者並複製結果公告。",
      "團隊會議抽出本週記錄者、主持人與下一位報告者。",
      "朋友聚會把候選餐廳貼上去，抽出今晚先試的一家。",
    ],
    audience: [
      "需要公平點名、抽答或安排報告順序的老師與補習班講師。",
      "辦理抽獎、破冰、社群活動或校園活動的主持人。",
      "想讓會議角色輪流分配、不靠自願者固定承擔的團隊。",
    ],
    caseStudies: [
      {
        title: "課堂抽答與報告排序",
        description: "老師將班級名單貼入工具，保留抽出後移除，連續抽出本週報告順序。結果複製到班級公告後，學生可以直接確認自己的順位。",
      },
      {
        title: "社群活動抽獎",
        description: "活動管理員先在試算表清理重複留言與不符合資格者，再把有效名單貼入工具抽出得獎者。抽完後把結果貼回 Excel 備註欄，方便後續寄信與查核。",
      },
      {
        title: "會議角色輪值",
        description: "小團隊每週抽出記錄者與時間提醒者，避免同一個人長期負責雜務。若有人請假，先從名單刪除再重新抽選。",
      },
    ],
    notes: [
      "空白行會被忽略；重複的非空白行會被視為多個候選項目。",
      "公開投影時建議使用代碼或暱稱，避免顯示完整個資。",
      "這是日常公平抽選工具，不是公證抽獎或法規審計系統。",
    ],
    faq: [
      {
        q: "姓名名單會上傳到伺服器嗎？",
        a: "不會。名單與抽選結果都在你的瀏覽器內處理，FunnyTools 不會接收、保存或分享這些內容。",
      },
      {
        q: "可以一次抽出多位嗎？",
        a: "可以。輸入需要的人數後使用多位抽選，工具會從目前名單中抽出指定數量的結果。",
      },
      {
        q: "同名的人要怎麼處理？",
        a: "建議在名字後加座號、部門、編號或簡短代碼，否則抽到同名時可能無法確認是哪一位。",
      },
      {
        q: "抽出後移除是什麼意思？",
        a: "啟用後，中選項目會從文字框移除，下一次抽選就不會再次被抽到；如果要保留原清單，可以先關閉這個選項。",
      },
      {
        q: "結果可以匯出成 Excel 嗎？",
        a: "工具不直接產生 Excel 檔，但你可以複製結果並貼到 Excel、Google Sheets、公告或會議紀錄中。",
      },
    ],
    instructions: [
      '將姓名或項目貼到文字框中，每一行放一個名字。',
      '保留「抽出後從名單移除」可避免同一個名字被重複抽中。',
      '按「抽 1 位」快速抽出單一結果，或輸入數量後按「抽多位」。',
      '確認結果後可以複製，或重設名單重新開始。',
    ],





    privacyNote: '你貼入的名單與抽選結果完全在瀏覽器本機處理，不會上傳到本站或第三方伺服器。關閉或重新整理頁面後資料即消失。',
    labels: {
      input: '姓名或項目',
      placeholder: '王小明\n陳怡君\nAlex\nMia',
      pickOne: '抽 1 位',
      pickMany: '抽多位',
      countLabel: '抽幾位？',
      removePicked: '抽出後從名單移除',
      reset: '重設名單',
      result: '抽選結果',
      emptyResult: '結果會顯示在這裡',
      emptyListError: '請先輸入至少一個名字或項目。',
      tooManyError: '抽選數量不能大於目前剩餘項目數。',
      invalidCountError: '請輸入有效的抽選數量。',
      copy: '複製結果',
      copied: '已複製',
      spinning: '抽選中...',
    },
  },
  en: {
    name: 'Random Name Picker',
    short: 'Pick one or many names fairly from a pasted list.',
    long: 'Random Name Picker helps you choose people, entries, or options from a simple line-by-line list. Use it for classrooms, giveaways, meeting roles, or small decisions, with an optional no-replacement mode that removes picked names from the list.',
    seoTitle: 'Random Name Picker | Free online list picker',
    seoDescription: 'Use a free random name picker for classes, giveaways, meetings, and teams. Paste one name per line, pick one or many, remove winners, and copy results.',
    keywords: ['random name picker', 'name picker', 'raffle picker', 'classroom picker'],
    capabilities: [
      "Pick one or multiple names from a pasted list, with one entry per line.",
    ],
    contentSections: [
      {
        heading: "What Random Name Picker is useful for",
        paragraphs: [
          "Use it when you already have a valid candidate list and need a visible, low-friction way to choose from it. Teachers can call on students without leaning on memory or seating position. Hosts can draw winners from a cleaned registration list. Teams can rotate meeting roles such as note taker, timekeeper, first presenter, or reviewer.",
          "The quality of the draw depends on the list you paste. Remove ineligible entries, merge accidental duplicates, and add a short identifier when two people share the same name. If the draw is projected, seat numbers, ticket codes, or nicknames can protect privacy better than full names.",
        ],
      },
      {
        heading: "Recommended workflow",
        paragraphs: [
          "Use a single draw for quick participation, a meeting role, or a small decision. Use multiple picks when you need several winners, volunteers, presenters, or representatives. The remove-after-picking option is useful for no-repeat rounds because selected entries leave the list before the next draw.",
          "A practical workflow is to clean the source list in a spreadsheet, paste the final entries here, draw, then copy the selected names back into Excel, Google Sheets, slides, chat, or an activity log. That keeps the random step lightweight while leaving the source of truth in your own document.",
        ],
        items: [
          "Use one entry per line and avoid extra notes inside the name field",
          "Add seat numbers, ticket numbers, or short codes for duplicate names",
          "Copy results before refreshing the page or closing the tab",
          "Use a separate spreadsheet when eligibility or attendance needs review",
        ],
      },
      {
        heading: "Limits and human checks",
        paragraphs: [
          "The list is processed in your browser and is not uploaded to FunnyTools. That is helpful for student names, small membership lists, and informal event registrations, but it also means the page is not a database. Copy results before refreshing if you need a record.",
          "This tool is appropriate for everyday fair selection. It is not a notarized raffle system, an audited lottery device, or a cryptographic random process. If prizes, money, legal rules, or formal complaints are involved, pair the draw with published rules, a cleaned list, timestamps, and any review process your event requires.",
        ],
      },
    ],
    examples: [
      "Pick a student to answer the next classroom question.",
      "Draw three event winners from a cleaned registration list.",
      "Assign meeting roles such as note taker, timekeeper, or first presenter.",
      "Choose a restaurant or activity from a shared shortlist.",
    ],
    audience: [
      "Teachers who need fair participation, presentation order, or quick classroom selection.",
      "Event hosts and community managers running small giveaways or activity draws.",
      "Teams that want meeting roles and informal tasks to rotate visibly.",
    ],
    caseStudies: [
      {
        title: "Classroom participation",
        description: "A teacher pastes the class roster, draws one name, then removes that student for the next round so participation spreads across the room.",
      },
      {
        title: "Small giveaway workflow",
        description: "An organizer cleans entries in a spreadsheet, pastes the final list into the picker, draws winners, and copies the result back into the event log.",
      },
      {
        title: "Weekly meeting roles",
        description: "A team draws the note taker and presenter order at the start of the meeting, avoiding the same volunteer every week.",
      },
    ],
    notes: [
      "Blank lines are ignored; repeated non-empty lines count as separate entries.",
      "Use codes or partial names when projecting a sensitive list to a room.",
      "For regulated drawings, keep your official rules and records outside this tool.",
    ],
    faq: [
      {
        q: "Are the names uploaded anywhere?",
        a: "No. The list and the draw run in your browser, and the site does not store the names you paste.",
      },
      {
        q: "Can I pick several names at once?",
        a: "Yes. Enter the number of names you need, then use the multiple-pick control to draw them from the current list.",
      },
      {
        q: "How should I handle duplicate names?",
        a: "Add a seat number, ticket number, department, or short code so the copied result identifies the right person.",
      },
      {
        q: "What does remove after picking do?",
        a: "It removes selected entries from the text box after the draw, so a later draw from the same list will not pick them again.",
      },
      {
        q: "Can I export the result to Excel?",
        a: "There is no direct Excel export. Copy the result and paste it into Excel, Google Sheets, a slide, or your event record.",
      },
    ],
    instructions: [
      'Paste names or items into the textarea, with one entry on each line.',
      'Keep “Remove after picking” enabled if each name should be picked only once.',
      'Press “Pick 1” for a single result, or enter a number and press “Pick N”.',
      'Copy the result or reset the list when you want to start again.',
    ],





    privacyNote: 'Your pasted list and pick results are processed entirely in your browser and never uploaded to this site or any third-party server. Data disappears when you close or refresh the page.',
    labels: {
      input: 'Names or items',
      placeholder: 'Avery\nJordan\nMia\nLeo',
      pickOne: 'Pick 1',
      pickMany: 'Pick N',
      countLabel: 'How many?',
      removePicked: 'Remove after picking',
      reset: 'Reset list',
      result: 'Result',
      emptyResult: 'Your picked name appears here',
      emptyListError: 'Enter at least one name or item first.',
      tooManyError: 'Pick count cannot be larger than the remaining items.',
      invalidCountError: 'Enter a valid pick count.',
      copy: 'Copy result',
      copied: 'Copied',
      spinning: 'Picking...',
    },
  },
} satisfies Record<'zh' | 'en', ToolContent>;

