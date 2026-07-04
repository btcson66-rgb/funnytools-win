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
      "將一行一名的清單洗牌，平均分配成指定數量的小組。",
    ],
    contentSections: [
      {
        heading: "隨機分組工具適合解決的工作",
        paragraphs: [
          "適合在你需要快速建立臨時小組，但不想花時間手動拖拉名單時使用。老師可以用它安排討論、實驗、閱讀分享或報告小組；工作坊主持人可以把簽到名單分成練習隊伍；社團與活動也能用它建立遊戲分隊或破冰小組。",
          "工具會先把名單洗牌，再輪流分配到各組，讓人數盡量平均。它不會自動判斷能力、性別、座位、朋友關係或出席限制，所以正式發布前仍應由老師或主持人快速檢查，必要時手動交換少數成員。",
        ],
      },
      {
        heading: "建議使用流程",
        paragraphs: [
          "最穩定的做法是先在 Excel 或 Google Sheets 清理名單：刪除缺席者、合併重複姓名，並替同名者加上座號或代碼。接著貼到工具中，每一行放一位成員，輸入要建立的小組數，再產生結果。",
          "分組完成後，你可以複製全部結果貼到聊天室、簡報或課堂公告，也可以匯出 CSV，讓「組別」與「成員」成為兩欄資料。CSV 特別適合需要後續點名、評分、列印座位表或彙整分組作業的情境。",
        ],
        items: [
          "小組數必須介於 1 和名單人數之間",
          "CSV 可直接用 Excel、Google Sheets 或 LibreOffice 開啟",
          "同名者請加上座號、班級或簡短代碼",
          "有特殊限制時，先產生初稿，再人工微調",
        ],
      },
      {
        heading: "限制與需要人工判斷的部分",
        paragraphs: [
          "隨機分組的好處是快速、透明，也能減少主持人的主觀偏好。不過「隨機」不一定等於「最適合」。如果課程需要能力平衡、語言搭配、實驗安全、座位安排或避免特定組合，應把工具產生的結果視為初稿，而不是最終答案。",
          "分享前先檢查每組人數、缺席者、重複姓名與特殊需求。若要列印，可以把 CSV 匯入試算表後調整欄寬；若要投影，複製文字版本通常更快。",
        ],
      },
    ],
    examples: [
      "將 28 位學生分成 7 組進行實驗課。",
      "工作坊把簽到名單分成 5 個討論小隊。",
      "社團活動用 CSV 匯出分組，交給關主列印點名。",
      "助教先隨機分組，再依缺席與能力需求微調。",
    ],
    audience: [
      "需要快速安排討論組、實驗組或報告組的老師與助教。",
      "工作坊、社團、營隊與活動主持人。",
      "想把分組結果匯入試算表後續追蹤的人。",
    ],
    caseStudies: [
      {
        title: "實驗課分組",
        description: "老師將 28 位學生分成 7 組，匯出 CSV 後貼到課堂試算表，下一步再加上器材與桌號。",
      },
      {
        title: "工作坊破冰",
        description: "主持人用簽到名單建立 5 個臨時小隊，複製文字版本貼到投影片，讓參與者立即找到隊友。",
      },
      {
        title: "報告小組初稿",
        description: "助教先用隨機分組產生公平初稿，再根據缺席、同組限制與能力平衡手動調整。",
      },
    ],
    notes: [
      "工具平均分配人數，但不會自動處理能力、座位或人際限制。",
      "名單含個資時，建議只輸入必要稱呼或代碼。",
      "CSV 匯出方便後續在 Excel 或 Google Sheets 中列印與追蹤。",
    ],
    faq: [
      {
        q: "分組怎麼保持平均？",
        a: "工具會先洗牌名單，再輪流放入各組，因此各組人數會盡量接近。",
      },
      {
        q: "可以指定兩個人一定同組或不同組嗎？",
        a: "目前不支援限制條件。建議先產生分組初稿，再由老師或主持人手動調整。",
      },
      {
        q: "可以匯出到 Excel 嗎？",
        a: "可以匯出 CSV。CSV 可用 Excel、Google Sheets 或其他試算表開啟。",
      },
      {
        q: "小組數可以比人數多嗎？",
        a: "不行。小組數必須至少 1，且不能超過名單中的有效人數，避免產生空組。",
      },
      {
        q: "名單會被保存嗎？",
        a: "不會。分組在瀏覽器內完成，關閉或重新整理頁面後，工具不會保存名單。",
      },
    ],
    instructions: [
      '將所有名字貼到文字框中，每一行一個名字。',
      '輸入需要的小組數，例如 2、3 或 6 組。',
      '按「產生分組」，工具會洗牌後平均分配成各組。',
      '使用「複製全部」把分組結果貼到訊息、簡報或工作表中。',
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
    capabilities: [
      "Shuffle a one-name-per-line list into a chosen number of balanced groups.",
    ],
    contentSections: [
      {
        heading: "What Random Group Generator is useful for",
        paragraphs: [
          "Use it when you need temporary teams quickly and do not want to build the grouping by hand. It works well for classroom discussions, lab groups, reading circles, presentation teams, workshop exercises, game teams, club activities, and icebreakers.",
          "The tool shuffles the list first, then distributes names across groups so the sizes stay close. It does not know ability levels, seating constraints, attendance issues, friendships, safety rules, or pairing restrictions. Treat the output as a fair first draft and make small manual changes when human context matters.",
        ],
      },
      {
        heading: "Recommended workflow",
        paragraphs: [
          "For clean results, start in Excel or Google Sheets. Remove absent people, fix duplicates, and add seat numbers or short codes when names repeat. Then paste the final list into the generator, choose the number of groups, and generate the split.",
          "After groups are created, copy the text into a slide or chat message, or export CSV when you need a structured file with group and member columns. CSV export is useful for attendance, grading, room assignment, equipment checkout, printed handouts, or project tracking.",
        ],
        items: [
          "Keep one participant per line before generating groups",
          "Use CSV export when the result needs spreadsheet tracking",
          "Add short identifiers for duplicate names",
          "Review special constraints before sharing the final groups",
        ],
      },
      {
        heading: "Limits and human checks",
        paragraphs: [
          "Random grouping reduces visible bias and speeds up setup, but random does not always mean pedagogically or operationally ideal. A random split can still put all experienced students together, separate required partners, or create a group that does not match room logistics.",
          "Before publishing groups, check the number of people in each group, missing participants, duplicate names, and any special needs. For printed lists, export CSV and adjust formatting in a spreadsheet. For live announcements, copy the grouped text and paste it where students or participants already watch.",
        ],
      },
    ],
    examples: [
      "Split 28 students into seven lab groups.",
      "Create five discussion teams from a workshop check-in list.",
      "Export CSV so staff can print group rosters for activity stations.",
      "Generate a fair first draft, then manually adjust for absences or constraints.",
    ],
    audience: [
      "Teachers and teaching assistants creating discussion, lab, or presentation groups.",
      "Workshop hosts, camp staff, club leaders, and event organizers.",
      "Anyone who needs grouped results in a spreadsheet for later tracking.",
    ],
    caseStudies: [
      {
        title: "Lab group setup",
        description: "A teacher splits 28 students into seven groups, exports CSV, and adds bench numbers in the class spreadsheet.",
      },
      {
        title: "Workshop icebreaker",
        description: "A facilitator creates five temporary teams from the check-in list and copies the result into the opening slide.",
      },
      {
        title: "Presentation planning",
        description: "A teaching assistant generates a fair draft, then adjusts a few students based on absences and project constraints.",
      },
    ],
    notes: [
      "Group sizes are balanced, but skill, seating, and relationship constraints are not automatic.",
      "Use nicknames or IDs when projecting sensitive participant lists.",
      "CSV export is best for Excel, Google Sheets, printing, and follow-up records.",
    ],
    faq: [
      {
        q: "How are the groups balanced?",
        a: "The list is shuffled, then names are dealt into groups in a way that keeps group sizes as even as possible.",
      },
      {
        q: "Can I force two people together or apart?",
        a: "Not in this version. Generate the groups first, then adjust the draft manually when constraints matter.",
      },
      {
        q: "Can I export the groups to Excel?",
        a: "Yes. Export the result as CSV, then open it in Excel, Google Sheets, or another spreadsheet app.",
      },
      {
        q: "Can there be more groups than names?",
        a: "No. The group count must be at least 1 and no greater than the number of valid names.",
      },
      {
        q: "Is the list saved?",
        a: "No. Names and groups are processed in your browser and are not stored by the site.",
      },
    ],
    instructions: [
      'Paste every participant name into the textarea, one per line.',
      'Enter the number of groups you want to create.',
      'Press Generate Groups to shuffle and distribute people as evenly as possible.',
      'Copy all groups as plain text for chat, slides, worksheets, or notes.',
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
