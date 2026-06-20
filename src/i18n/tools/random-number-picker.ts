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
      '自訂最小值、最大值與抽取數量，一次產生單個或多個隨機整數。',
      '可選擇是否允許重複，並將結果由小到大、由大到小排列。',
      '結果可直接複製，方便用於抽號碼、課堂點名或非機密測試資料。',
    ],
    audience: [
      '需要為課堂點名、座號或練習題快速抽號的老師與學生。',
      '舉辦一般活動，需要透明地從編號範圍抽出結果的主辦人。',
      '需要快速產生非機密整數測試資料的開發者與資料處理人員。',
    ],
    instructions: [
      '輸入要抽選的最小值、最大值與數量。',
      '依需求選擇是否允許重複；若不允許重複，抽取數量不能超過範圍內的整數個數。',
      '需要由小到大查看時，勾選排序結果。',
      '按下產生後即可取得新結果，必要時可直接複製。',
      '如果要重新開始，按下重設即可回到預設範圍。',
    ],
    examples: [
      '活動、直播或社群抽獎時抽出中獎號碼。',
      '老師在課堂上隨機指定題號、座號或報告順序。',
      '開發、測試或教學時快速產生一組整數樣本。',
      '桌遊、聚會或工作坊中公平決定行動順序。',
      '需要從固定編號清單中挑選樣本時，避免人工偏好。',
    ],
    caseStudies: [
      {
        title: '活動抽獎',
        description: '主辦人把票券編號設定為 1 到 500，數量輸入 10，關閉重複後即可抽出 10 個不同的中獎號碼。',
      },
      {
        title: '課堂互動',
        description: '老師用座號範圍抽出下一位回答者，搭配排序功能也能一次抽出多位學生分配題目。',
      },
      {
        title: '測試資料',
        description: '工程師在示範 API、表格或排序功能時，可以快速產生固定範圍內的整數樣本。',
      },
    ],
    notes: [
      '關閉「允許重複」時，抽取數量不能大於範圍內可用的整數個數。',
      '工具使用瀏覽器亂數，適合日常抽選，不應用於密碼學、法規稽核或需公證的正式抽獎。',
      '大量產生前請先確認範圍與重複設定，避免得到不符使用情境的數列。',
    ],
    faq: [
      {
        q: '產生的數字包含最小值和最大值嗎？',
        a: '包含。範圍是閉區間，例如 1 到 10 可能抽到 1，也可能抽到 10。',
      },
      {
        q: '關閉重複後為什麼會出現錯誤？',
        a: '如果不允許重複，抽取數量不能大於可用整數數量。例如 1 到 5 最多只能抽 5 個不同數字。',
      },
      {
        q: '抽出的結果真的隨機嗎？',
        a: '工具使用瀏覽器提供的亂數能力產生結果，適合一般抽選與日常用途，但不等同於需稽核或密碼學等級的隨機系統。',
      },
      {
        q: '結果會上傳或儲存嗎？',
        a: '不會。抽選邏輯在你的瀏覽器中執行，本站不會接收你輸入的範圍、數量或抽選結果。',
      },
      {
        q: '這適合正式抽獎或公證抽籤嗎？',
        a: '它適合一般活動、課堂與非正式抽選。若抽獎涉及法規、稽核、公證或商業責任，請使用符合規範的流程並保留紀錄。',
      },
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
    instructions: [
      'Enter the minimum value, maximum value, and how many numbers you need.',
      'Choose whether duplicate numbers are allowed. Unique mode cannot draw more numbers than the range contains.',
      'Turn on sorting if you want the final list ordered from low to high.',
      'Select Generate for a fresh draw, then copy the result when needed.',
      'Use Reset when you want to return to the default values.',
    ],
    examples: [
      'Draw winning ticket numbers for events, streams, or community giveaways.',
      'Pick classroom question numbers, seat numbers, or presentation order without bias.',
      'Create quick integer samples for development, testing, and demos.',
      'Decide turn order during a board game, workshop, or group activity.',
      'Choose samples from a numbered list without relying on manual preference.',
    ],
    caseStudies: [
      {
        title: 'Event raffle',
        description: 'Set the ticket range to 1 through 500, request 10 numbers, disable duplicates, and copy the 10 unique winners.',
      },
      {
        title: 'Classroom activity',
        description: 'Use the seat-number range to pick the next student, or draw several sorted numbers when assigning questions.',
      },
      {
        title: 'Test data',
        description: 'Generate a quick list of integers when demonstrating APIs, tables, sorting logic, or validation rules.',
      },
    ],
    faq: [
      {
        q: 'Are the minimum and maximum values included?',
        a: 'Yes. The range is inclusive, so a range from 1 to 10 can return both 1 and 10.',
      },
      {
        q: 'Why do I get an error when duplicates are disabled?',
        a: 'Unique mode cannot draw more values than the range contains. A range from 1 to 5 can only provide five unique integers.',
      },
      {
        q: 'Are the results truly random?',
        a: 'The tool uses the browser random number capability, which is appropriate for everyday draws and general use. It is not an audited or cryptographic random selection system.',
      },
      {
        q: 'Does the site store my range or results?',
        a: 'No. The draw runs in your browser and the site does not receive the values you enter or the results you generate.',
      },
      {
        q: 'Can I use this for official raffles?',
        a: 'It is suitable for everyday and informal use. For regulated, audited, commercial, or notarized drawings, use a process that meets those requirements.',
      },
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
