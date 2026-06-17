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
    name: '隨機數字產生器',
    short: '設定範圍與數量，立即抽出一組隨機整數。',
    long: '這個隨機數字產生器可在指定的最小值與最大值之間抽出一個或多個整數，支援允許重複、禁止重複與排序結果，適合抽籤、課堂活動、測試資料與日常決定。',
    seoTitle: '隨機數字產生器｜免費線上抽號碼工具',
    seoDescription: '免費線上隨機數字產生器，可設定最小值、最大值、抽取數量、是否允許重複與結果排序。',
    keywords: ['隨機數字', '抽號碼', '亂數產生器', 'random number picker'],
    instructions: [
      '輸入要抽選的最小值、最大值與數量。',
      '依需求選擇是否允許重複；若不允許重複，數量不能超過範圍內的整數個數。',
      '需要由小到大查看時，勾選排序結果。',
      '按下產生後即可複製結果，重新按一次會產生新的抽選。',
    ],
    examples: [
      '活動抽獎時從 1 到 500 中抽出 10 個中獎號碼。',
      '老師在課堂上隨機指定題號或座號。',
      '開發或測試時快速產生一組整數樣本。',
      '在朋友聚會中公平決定出場順序或任務編號。',
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
        q: '結果會上傳或儲存嗎？',
        a: '不會。抽選邏輯在你的瀏覽器中執行，本站不會接收你輸入的範圍或結果。',
      },
      {
        q: '這適合正式抽獎嗎？',
        a: '它適合一般活動與日常使用。若是有法規、稽核或公證要求的正式抽獎，請使用符合規範的流程並保留紀錄。',
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
    disclaimer: '此工具使用瀏覽器內建亂數產生器，適合一般用途，不適合作為高安全性或需公證的抽選系統。',
  },
  en: {
    name: 'Random Number Picker',
    short: 'Pick one or many random integers from a custom range.',
    long: 'Use this random number picker to generate one or many integers between your chosen minimum and maximum. It supports duplicates, unique picks, optional sorting, and quick copying for raffles, classroom activities, test data, and everyday decisions.',
    seoTitle: 'Random Number Picker | Free online integer generator',
    seoDescription: 'Generate random integers online with custom min, max, quantity, duplicate control, sorting, and copy-ready results.',
    keywords: ['random number picker', 'random integer generator', 'number raffle', 'random draw'],
    instructions: [
      'Enter the minimum value, maximum value, and how many numbers you need.',
      'Choose whether duplicate numbers are allowed. Unique mode cannot draw more numbers than the range contains.',
      'Turn on sorting if you want the final list ordered from low to high.',
      'Select Generate for a fresh draw, then copy the result when needed.',
    ],
    examples: [
      'Draw 10 winning ticket numbers from a range of 1 to 500.',
      'Pick classroom question numbers or seat numbers without bias.',
      'Create quick integer samples for testing and demos.',
      'Decide turn order or task numbers during a group activity.',
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
        q: 'Does the site store my range or results?',
        a: 'No. The draw runs in your browser and the site does not receive the values you enter.',
      },
      {
        q: 'Can I use this for official raffles?',
        a: 'It is suitable for everyday and informal use. For audited, regulated, or notarized drawings, use a process that meets those requirements.',
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
    disclaimer: 'This tool uses the browser random number generator. It is intended for general use, not high-security or notarized selection systems.',
  },
} satisfies Record<'zh' | 'en', ToolContent>;
