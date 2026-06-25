import type { ToolContent } from './_types';

export default {
  zh: {
    name: '座位表產生器',
    short: '依名單規劃教室座位配置。',
    long: '座位表產生器可把學生名單放入指定列數與欄數的座位格，適合新學期排座位、考試座位、活動桌次與臨時分區。你可以選擇是否隨機洗牌，並依列或依欄填入。結果可複製成文字，也可使用瀏覽器列印或另存 PDF，方便課前快速確認空位。',
    seoTitle: "座位表產生器｜免費製作教室座位表與隨機排座位",
    seoDescription: '貼上學生名單，設定列數與欄數，隨機或依序產生座位表，可複製與列印。',
    keywords: [
      "座位表",
      "座位表產生器",
      "教室座位表",
      "隨機座位",
      "seating chart",
      "seat planner",
      "學生座位安排"
    ],
    contentSections: [
      {
        heading: "座位表產生器可以做什麼",
        paragraphs: [
          "座位表產生器可把學生或參與者名單安排到列與欄組成的座位格中，適合開學座位、考試座位、活動桌次與臨時教室配置。你可以選擇是否隨機打亂，並決定依列或依欄填入。"
        ]
      },
      {
        heading: "什麼時候適合使用座位表",
        paragraphs: [
          "當你需要快速把名單轉成可檢查、可列印的座位配置時，這個工具能節省排版時間。"
        ],
        items: [
          "開學或換座位時建立教室座位表",
          "考試前隨機安排座位",
          "工作坊、營隊或活動桌次規劃",
          "將座位表貼到公告、講義或班級文件"
        ]
      },
      {
        heading: "座位表使用步驟",
        paragraphs: [
          "1. 將學生或參與者名單貼到輸入框，一行一個名字。",
          "2. 設定列數與欄數，座位總數必須足夠容納名單。",
          "3. 選擇是否隨機，以及依列或依欄填入。",
          "4. 產生座位表後複製、匯出 CSV 或列印。"
        ]
      },
      {
        heading: "座位安排建議",
        paragraphs: [
          "座位表是規劃輔助，實際使用時仍應考量學生需求與場地限制。"
        ],
        items: [
          "產生後依視力、無障礙、互動狀況或考試規則調整",
          "空位可當走道、保留席或臨時位置",
          "同名者可加入座號或代號避免混淆",
          "列印前確認列欄方向是否符合實際教室"
        ]
      }
    ],
    instructions: [
      '貼上學生名單，每行一位學生。',
      '設定座位列數與欄數，座位數需足以容納名單。',
      '選擇是否洗牌，以及依列或依欄填入。',
      '產生座位表後可複製文字版或列印。',
    ],
    examples: [
      '為新學期快速建立教室座位表。',
      '考試前隨機安排座位，減少固定鄰座。',
      '把活動或工作坊參與者安排到桌次。',
      '依列或依欄建立可貼到文件中的座位文字表。',
    ],
    audience: [
      '需要快速安排班級座位、考試座位或臨時座位的老師。',
      '想把座位表複製到公告、文件或班級群組的導師與行政人員。',
      '正在規劃工作坊、營隊、講座桌次或分區座位的活動工作者。',
      '需要列印座位表或透過瀏覽器另存 PDF 的教學現場使用者。',
    ],
    caseStudies: [
      {
        title: '新學期教室座位安排',
        description: '導師貼上全班名單，設定 5 列 6 欄並產生初版座位表，再依視力、互動狀況或特殊需求做人工調整。',
      },
      {
        title: '考試座位重新洗牌',
        description: '老師在考前開啟隨機洗牌產生座位表，列印後貼在教室門口，讓學生進教室前就能找到座位。',
      },
      {
        title: '活動桌次分配',
        description: '工作坊工作人員用列與欄模擬桌次配置，複製文字版給現場同仁核對，再用列印版放在報到桌。',
      },
    ],
    notes: [
      '座位表是安排輔助工具，仍建議依學生視力、行動需求、互動狀況或考試規範進行人工調整。',
      '工具可複製文字結果、匯出 CSV（含列、欄、座號與姓名），也可透過瀏覽器列印或另存 PDF；目前沒有 Excel 或圖片檔案匯出。',
      '列數與欄數上限是 20；若學生人數超過座位數，需要先增加座位格再產生。',
    ],
    faq: [
      {
        q: "座位比學生多會怎樣？",
        a: "多出的格子會顯示為空位，可用來保留走道、前排空間或備用座位。"
      },
      {
        q: "每次隨機都會不同嗎？",
        a: "會。啟用隨機後，每次產生都會重新洗牌目前名單。"
      },
      {
        q: "座位表會被儲存嗎？",
        a: "不會。工具不會保存座位表；你可以複製、匯出 CSV、列印或從列印對話框另存 PDF。"
      },
      {
        q: "依列填入和依欄填入有什麼差別？",
        a: "依列填入會先從左到右填滿一列再往下；依欄填入會先填滿一欄再到下一欄。"
      }
    ],
    labels: {
      input: '學生名單',
      placeholder: '每行一位學生...\n小安\n小美\n小杰',
      rows: '列數',
      columns: '欄數',
      shuffle: '隨機洗牌',
      fillMode: '填入方向',
      rowMode: '依列填入',
      columnMode: '依欄填入',
      generate: '產生座位表',
      copy: '複製',
      exportCsv: '匯出 CSV',
      print: '列印',
      reset: '重設',
      seatLabel: '座位',
      csvRow: '列',
      csvColumn: '欄',
      csvName: '姓名',
      emptySeat: '空位',
      emptyResult: '座位表會顯示在這裡',
      emptyListError: '請至少輸入一位學生。',
      invalidGrid: '列數與欄數必須是 1 到 20 的整數。',
      tooManyStudents: '學生人數超過座位數，請增加列數或欄數。',
      copied: '已複製',
    },
    privacyNote: '名單與座位表只在你的瀏覽器中產生，不會上傳。',
  },
  en: {
    name: 'Seating Chart',
    short: 'Arrange classroom seating from a student list.',
    long: 'Seating Chart places a student list into a row-and-column grid for new terms, exam seating, activity tables, and temporary room layouts. Choose whether to shuffle, then fill seats by row or by column. Copy the plain-text chart, print it from the browser, or save it as a PDF from the print dialog.',
    seoTitle: "Seating Chart Generator | Free Classroom Seat Planner",
    seoDescription: 'Paste a student list, choose rows and columns, shuffle or keep order, and generate a copyable printable seating chart.',
    keywords: [
      "seating chart",
      "seating chart generator",
      "classroom seating chart",
      "seat planner",
      "student seating",
      "random seating chart",
      "printable seating chart"
    ],
    contentSections: [
      {
        heading: "What Seating Chart does",
        paragraphs: [
          "Seating Chart places a student or participant list into a row-and-column grid. It is useful for new term seating, exam rooms, activity tables, workshops, and temporary classroom layouts."
        ]
      },
      {
        heading: "When to use Seating Chart",
        paragraphs: [
          "Use it when a list needs to become a printable or reviewable seating layout quickly."
        ],
        items: [
          "Creating a classroom seating chart at the start of term",
          "Randomizing exam seating",
          "Planning workshop, camp, or activity tables",
          "Pasting seating charts into announcements or documents"
        ]
      },
      {
        heading: "Step-by-step usage guide",
        paragraphs: [
          "1. Paste one student or participant name per line.",
          "2. Set rows and columns; total seats must fit the list.",
          "3. Choose shuffle and row or column fill mode.",
          "4. Generate the chart, then copy, export CSV, or print it."
        ]
      },
      {
        heading: "Tips and best practices",
        paragraphs: [
          "A generated seating chart is a starting point, not a substitute for classroom judgment."
        ],
        items: [
          "Adjust for eyesight, accessibility, behavior needs, and exam rules",
          "Use empty seats for aisles, reserves, or spacing",
          "Add numbers or codes when duplicate names exist",
          "Confirm row and column direction before printing"
        ]
      }
    ],
    instructions: [
      'Paste one student name per line.',
      'Set rows and columns; total seats must fit the list.',
      'Choose shuffle and row or column fill mode.',
      'Generate the chart, then copy the text version or print it.',
    ],
    examples: [
      'Create a new classroom seating chart for the start of term.',
      'Randomize exam seating to avoid fixed neighbors.',
      'Arrange workshop or activity participants by table positions.',
      'Build a text-based seating layout that can be pasted into notes or documents.',
    ],
    audience: [
      'Teachers arranging regular classroom seating, exam seating, or temporary room layouts.',
      'Homeroom teachers and administrators copying seating charts into announcements or documents.',
      'Event staff planning workshop tables, camp groups, lecture sections, or activity zones.',
      'Classroom users who need a printable chart or a PDF saved from the browser print dialog.',
    ],
    caseStudies: [
      {
        title: 'New term classroom layout',
        description: 'A homeroom teacher pastes the class list, creates a 5 by 6 chart, then manually adjusts the result for eyesight, interaction patterns, or support needs.',
      },
      {
        title: 'Exam seating shuffle',
        description: 'A teacher generates a shuffled seating chart before an exam, prints it, and posts it at the classroom entrance so students can find seats quickly.',
      },
      {
        title: 'Workshop table planning',
        description: 'An event team models tables with rows and columns, copies the text chart for staff review, and keeps a printed version at check-in.',
      },
    ],
    notes: [
      'Seating charts are planning aids; adjust results for eyesight, accessibility, behavior needs, and exam rules.',
      'The tool copies plain text, exports a CSV (row, column, seat number, name), and can print through the browser, including saving as PDF from the print dialog; it does not export Excel or image files.',
      'Rows and columns are limited to 20 each; increase the grid before generating when the list is larger than the number of seats.',
    ],
    faq: [
      {
        q: "What happens if there are more seats than students?",
        a: "Extra cells are shown as empty seats so you can reserve aisles, front spaces, or unused seats."
      },
      {
        q: "Will shuffle produce a different chart every time?",
        a: "Yes. The current list is shuffled again each time you generate."
      },
      {
        q: "Can the chart be saved?",
        a: "The tool does not store charts. Copy the text version, export CSV, print it, or save as PDF from your browser print dialog."
      },
      {
        q: "What is the difference between row and column fill?",
        a: "Row fill moves left to right across a row before moving down. Column fill fills one column before moving to the next."
      }
    ],
    labels: {
      input: 'Student list',
      placeholder: 'One student per line...\nAvery\nMia\nLeo',
      rows: 'Rows',
      columns: 'Columns',
      shuffle: 'Shuffle',
      fillMode: 'Fill direction',
      rowMode: 'By row',
      columnMode: 'By column',
      generate: 'Generate chart',
      copy: 'Copy',
      exportCsv: 'Export CSV',
      print: 'Print',
      reset: 'Reset',
      seatLabel: 'Seat',
      csvRow: 'Row',
      csvColumn: 'Column',
      csvName: 'Name',
      emptySeat: 'Empty',
      emptyResult: 'Seating chart appears here',
      emptyListError: 'Enter at least one student.',
      invalidGrid: 'Rows and columns must be whole numbers from 1 to 20.',
      tooManyStudents: 'There are more students than seats. Increase rows or columns.',
      copied: 'Copied',
    },
    privacyNote: 'Names and seating charts are generated locally in your browser and are not uploaded.',
  },
} satisfies Record<'zh' | 'en', ToolContent>;
