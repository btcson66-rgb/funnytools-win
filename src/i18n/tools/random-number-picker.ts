import type { LocalizedToolContent } from './_types';

export default {
  zh: {
    name: '隨機數字產生器',
    short: '設定範圍、數量與是否重複，立即抽出公平的隨機整數。',
    long: '這個隨機數字產生器適合抽號碼、產生測試資料、安排順序或做日常決定。你可以指定最小值、最大值與抽取數量，選擇是否允許重複，並把結果排序後複製使用。整個抽選過程都在瀏覽器中完成，不需要註冊，也不會把你輸入的範圍或結果上傳到伺服器。',
    seoTitle: '隨機數字產生器｜免費抽號碼、亂數與不重複數字',
    seoDescription: '設定整數範圍與抽取數量，即時產生可重複或不重複的隨機數字，支援排序與複製。適合抽號、點名、活動與測試資料。',
    keywords: ['隨機數字產生器', '抽號碼', '亂數產生器', '隨機整數', 'random number picker'],
    capabilities: [
      "設定最小值、最大值與抽取數量，產生一個或多個整數結果。",
    ],
    contentSections: [
      {
        heading: "隨機數字抽選器適合解決的工作",
        paragraphs: [
          "適合從一段連續整數範圍中抽出結果，例如抽票號、座號、題號、樣本編號或測試資料。你可以設定最小值、最大值與數量，讓結果符合現場規則，而不是手動在紙上圈選或用心算猜一個數字。",
          "如果你的名單原本就在 Excel 或 Google Sheets，常見流程是先替每列資料編號，再用這個工具抽出號碼，最後回到表格比對對應列。這樣比直接貼上個資名單更乾淨，也方便保留抽選紀錄。",
        ],
      },
      {
        heading: "建議使用流程",
        paragraphs: [
          "最小值與最大值都會被包含在抽選範圍內，所以 1 到 10 有可能抽到 1，也有可能抽到 10。允許重複適合產生練習題、模擬資料或遊戲擲點；不允許重複則適合抽獎號碼、座號或不想重複的樣本。",
          "排序只會改變結果顯示順序，不會改變抽選機率。若你要把結果貼回試算表、報告或公告，排序能讓讀者更容易核對；若你需要保留抽出的先後順序，例如順位或出場順序，就不要啟用排序。",
        ],
        items: [
          "正式名單建議先在表格中固定編號，再抽號碼",
          "不允許重複時，抽取數量不能超過範圍內整數總數",
          "排序適合核對資料，不適合保留抽出順位",
          "抽完後可複製結果貼入 Excel、公告或會議紀錄",
        ],
      },
      {
        heading: "限制與需要人工判斷的部分",
        paragraphs: [
          "工具使用瀏覽器提供的隨機能力，適合課堂活動、日常抽籤、測試資料與非正式抽獎。它不是加密安全亂數，也不是審計或公證抽獎流程；如果活動涉及高價獎品、金流、法規或正式申訴，應使用符合規範的抽選與紀錄方式。",
          "數字本身不代表資格。抽到號碼後，仍要回到原始資料確認該列是否有效、是否重複、是否已取消資格，尤其是報名抽獎、問卷抽樣或會員活動。",
        ],
      },
    ],
    examples: [
      "從 1 到 500 的票號中抽出 10 個不重複得獎號碼。",
      "老師抽座號決定回答順序，並可排序方便核對。",
      "開發者快速產生整數樣本，用來測試排序、分頁或欄位驗證。",
      "工作坊主持人抽題號、分組編號或挑戰關卡。",
    ],
    audience: [
      "需要抽票號、座號、題號或樣本編號的老師與活動主持人。",
      "想從試算表資料中抽樣，但不想直接暴露完整個資的工作者。",
      "需要快速整數測試資料的開發者、資料分析者與教學者。",
    ],
    caseStudies: [
      {
        title: "票號抽獎",
        description: "活動人員先在 Excel 確認有效票號範圍，輸入 1 到 500 並關閉重複，抽出 10 個得獎號碼後貼回名單核對。",
      },
      {
        title: "課堂座號抽題",
        description: "老師設定座號範圍並抽出數個題號，啟用排序後能快速對照題目或座位表。",
      },
      {
        title: "測試資料產生",
        description: "開發者用允許重複模式產生一批整數，測試圖表、表格排序或 API 篩選行為。",
      },
    ],
    notes: [
      "範圍端點會被包含在內。",
      "排序只影響顯示，不代表抽選先後。",
      "高風險或受監管抽獎應另用正式審計流程。",
    ],
    faq: [
      {
        q: "最小值和最大值會包含在結果裡嗎？",
        a: "會。範圍是包含端點的，例如 1 到 10 可能抽到 1 或 10。",
      },
      {
        q: "為什麼關閉重複時會出現錯誤？",
        a: "不允許重複時，抽取數量不能超過範圍內可用整數數量，例如 1 到 5 最多只能抽 5 個。",
      },
      {
        q: "排序會影響抽選公平性嗎？",
        a: "不會。排序只是在抽完後重新排列顯示結果，方便閱讀或貼到表格中核對。",
      },
      {
        q: "可以用在正式抽獎嗎？",
        a: "一般活動可以參考使用；若涉及法規、金流、公證或高價獎品，請依主辦單位規範使用正式流程。",
      },
      {
        q: "結果會被網站保存嗎？",
        a: "不會。範圍、數量與結果都在瀏覽器內處理，關閉或重新整理頁面後不會由網站保存。",
      },
    ],


    instructions: [
      '輸入要抽選的最小值、最大值與數量。',
      '依需求選擇是否允許重複；若不允許重複，抽取數量不能超過範圍內的整數個數。',
      '需要由小到大查看時，勾選排序結果。',
      '按下產生後即可取得新結果，必要時可直接複製。',
      '如果要重新開始，按下重設即可回到預設範圍。',
    ],




    labels: {
      min: '最小值',
      max: '最大值',
      count: '數量',
      allowDuplicates: '允許重複',
      sortResults: '排序結果',
      generate: '產生',
      reset: '重設',
      copy: '複製結果',
      result: '抽選結果',
      placeholder: '結果會顯示在這裡',
      copied: '已複製！',
      integerError: '請輸入整數範圍與至少 1 的數量。',
      rangeError: '最小值必須小於或等於最大值。',
      duplicateError: '不允許重複時，數量不能超過範圍內可用的整數個數。',
      countLimit: '單次抽取數量上限為 100000，請輸入較小的數量。',
    },
    privacyNote: '此工具在瀏覽器本機產生亂數與結果。你輸入的最小值、最大值、抽取數量與結果不會傳送到 FunnyTools 免費線上工具箱伺服器。',
    disclaimer: '此工具使用瀏覽器亂數能力，適合一般用途，不適合作為高安全性、密碼學、法規稽核或需公證的抽選系統。',
  },
  en: {
    name: 'Random Number Picker',
    short: 'Pick fair random integers from a custom range with optional duplicate control.',
    long: 'Use this random number picker to generate one or many integers between your chosen minimum and maximum. It supports duplicates, unique picks, optional sorting, and quick copying for raffles, classroom activities, test data, and everyday decisions. The draw runs in your browser, so the range and results are not uploaded to a server.',
    seoTitle: 'Random Number Picker | Free online integer generator',
    seoDescription: 'Generate random integers online with custom min, max, quantity, duplicate control, sorting, and copy-ready results for raffles, classes, and test data.',
    keywords: ['random number picker', 'random integer generator', 'number raffle', 'random draw', 'pick random numbers'],
    capabilities: [
      "Generate one or many integers from an inclusive custom range.",
    ],
    contentSections: [
      {
        heading: "What Random Number Picker is useful for",
        paragraphs: [
          "Use it when the source list already has numbers: tickets, seats, rows, questions, samples, invoices, or test records. Instead of choosing by memory or asking someone to name a number, set the minimum and maximum values, choose how many results you need, and generate a copy-ready list.",
          "A clean workflow is to number rows in Excel or Google Sheets first, draw numbers here, then return to the spreadsheet to identify the matching rows. That keeps personal information out of the picker and gives you a stable record of the source list, eligibility checks, and final copied result.",
        ],
      },
      {
        heading: "Recommended workflow",
        paragraphs: [
          "Allow duplicates when repeated values are acceptable, such as mock data, classroom practice numbers, game rolls, or simulations. Disable duplicates when a ticket, seat, row, or sample should only appear once. In unique mode, the quantity cannot be larger than the count of available integers in the range.",
          "Sorting is a display choice. It does not change the randomness of the draw, but it can make copied results easier to compare with a spreadsheet or printed list. Leave sorting off when the order of selection matters, such as ranking winners, assigning presentation order, or recording the exact draw sequence.",
        ],
        items: [
          "Use a spreadsheet row number when the source data contains personal details",
          "Disable duplicates for raffles, samples, and no-repeat seat draws",
          "Enable sorting when the copied list will be checked against a table",
          "Keep sorting off when draw order is part of the result",
        ],
      },
      {
        heading: "Limits and human checks",
        paragraphs: [
          "The tool uses the browser random capability and is suitable for everyday classroom activities, informal raffles, sampling, and development tasks. It is not a cryptographic random generator, a notarized lottery machine, or an audited selection process.",
          "Numbers do not prove eligibility by themselves. After drawing, return to the original list to confirm that each selected row or ticket is valid, not duplicated, and still allowed to participate. Copy the generated numbers into your announcement, report, spreadsheet, or meeting notes before refreshing the page.",
        ],
      },
    ],
    examples: [
      "Draw 10 unique winning ticket numbers from a range of 1 to 500.",
      "Pick seat numbers or question numbers for a classroom activity.",
      "Generate integer samples for testing sorting, pagination, or validation logic.",
      "Choose workshop challenge numbers or table assignments.",
    ],
    audience: [
      "Teachers and hosts who need ticket, seat, row, question, or sample numbers.",
      "Spreadsheet users who want to draw by row number instead of pasting personal data.",
      "Developers and analysts who need quick integer samples for demonstrations or tests.",
    ],
    caseStudies: [
      {
        title: "Ticket number raffle",
        description: "An organizer confirms valid ticket numbers in Excel, draws 10 unique numbers, then pastes the result back into the workbook for winner lookup.",
      },
      {
        title: "Classroom question order",
        description: "A teacher draws several seat numbers and leaves sorting on so the numbers are easy to check against the seating chart.",
      },
      {
        title: "Test data",
        description: "A developer allows duplicates to generate a quick batch of integers for table, chart, or API validation demos.",
      },
    ],
    notes: [
      "Minimum and maximum values are included in the possible results.",
      "Sorting changes display order only; it does not create a new draw.",
      "Use a regulated process for audited, notarized, or high-value drawings.",
    ],
    faq: [
      {
        q: "Are the minimum and maximum values included?",
        a: "Yes. The range is inclusive, so a range from 1 to 10 can return 1, 10, or any integer between them.",
      },
      {
        q: "Why does unique mode show an error?",
        a: "When duplicates are disabled, the requested quantity cannot exceed the number of integers available in the range.",
      },
      {
        q: "Does sorting affect fairness?",
        a: "No. Sorting only rearranges the already generated result so it is easier to read or compare with a table.",
      },
      {
        q: "Can I use this for official raffles?",
        a: "It is fine for everyday use. For regulated, notarized, commercial, or disputed drawings, follow the required formal process.",
      },
      {
        q: "Are my ranges or results stored?",
        a: "No. The values are generated locally in your browser and are not stored by the site.",
      },
    ],
    instructions: [
      'Enter the minimum value, maximum value, and how many numbers you need.',
      'Choose whether duplicate numbers are allowed. Unique mode cannot draw more numbers than the range contains.',
      'Turn on sorting if you want the final list ordered from low to high.',
      'Select Generate for a fresh draw, then copy the result when needed.',
      'Use Reset when you want to return to the default values.',
    ],



    labels: {
      min: 'Min',
      max: 'Max',
      count: 'Quantity',
      allowDuplicates: 'Allow duplicates',
      sortResults: 'Sort results',
      generate: 'Generate',
      reset: 'Reset',
      copy: 'Copy result',
      result: 'Result',
      placeholder: 'Results will appear here',
      copied: 'Copied!',
      integerError: 'Enter integer values and a quantity of at least 1.',
      rangeError: 'Min must be less than or equal to max.',
      duplicateError: 'When duplicates are disabled, quantity cannot exceed the number of available integers.',
      countLimit: 'The maximum quantity per draw is 100000. Enter a smaller quantity.',
    },
    privacyNote: 'This tool generates the random values locally in your browser. Your range, quantity, and results are not sent to FunnyTools servers.',
    disclaimer: 'This tool uses the browser random number capability. It is intended for general use, not high-security, cryptographic, audited, or notarized selection systems.',
  },
} satisfies LocalizedToolContent;
