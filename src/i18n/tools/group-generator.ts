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
    name: '課堂分組工具',
    short: '快速替課堂活動建立分組。',
    long: '課堂分組工具可將學生名單分成指定組數，或依每組固定人數切分。它和隨機分組工具不同，這裡提供組數與固定大小兩種課堂常用模式。',
    seoTitle: '課堂分組工具｜指定組數或固定人數分組',
    seoDescription: '貼上學生名單，選擇分成幾組或每組幾人，可隨機洗牌並複製分組結果。',
    keywords: ['課堂分組', 'group generator', 'class group maker', '學生分組'],
    instructions: [
      '貼上學生名單，每行一位學生。',
      '選擇依組數分配，或依每組固定人數切分。',
      '需要公平隨機時啟用洗牌。',
      '產生後複製分組結果到教材、投影片或訊息。',
    ],
    examples: [
      '把全班分成 6 組進行討論。',
      '依每組 4 人建立專題小組。',
      '為課堂遊戲、實驗或讀書會快速分隊。',
    ],
    faq: [
      {
        q: '指定組數時如何平均？',
        a: '工具會把名單輪流分配到各組，讓各組人數盡量接近。',
      },
      {
        q: '固定人數模式最後一組會怎樣？',
        a: '若無法整除，最後一組會保留剩餘成員。',
      },
      {
        q: '名單會被儲存嗎？',
        a: '不會。分組只在瀏覽器中產生，重新整理後不會保存。',
      },
    ],
    labels: {
      input: '學生名單',
      placeholder: 'Avery\nJordan\nMia\nLeo\nNoah\nEmma',
      mode: '分組模式',
      byGroupCount: '指定組數',
      byGroupSize: '固定每組人數',
      groupCount: '組數',
      groupSize: '每組人數',
      shuffle: '隨機洗牌',
      generate: '產生分組',
      copyAll: '複製全部',
      reset: '重設',
      groupLabel: '第 {n} 組',
      summary: '分組摘要',
      emptyResult: '分組結果會顯示在這裡',
      emptyError: '請至少輸入兩位學生。',
      invalidCountError: '組數必須是 1 到學生人數之間的整數。',
      invalidSizeError: '每組人數必須是 1 到學生人數之間的整數。',
      copied: '已複製',
    },
    privacyNote: '學生名單只在你的瀏覽器中分組，不會上傳。',
  },
  en: {
    name: 'Class Group Generator',
    short: 'Create class groups for activities and projects.',
    long: 'Class Group Generator splits a student list by a chosen number of groups or by a fixed group size. It differs from the random group tool by offering both classroom modes in one widget.',
    seoTitle: 'Class Group Generator | Split by group count or size',
    seoDescription: 'Paste a student list, split into a number of groups or fixed-size groups, optionally shuffle, and copy the result.',
    keywords: ['class group generator', 'student group maker', 'group generator', 'team splitter'],
    instructions: [
      'Paste one student name per line.',
      'Choose whether to split by number of groups or fixed group size.',
      'Turn on shuffle when you want fair random assignment.',
      'Copy the generated groups into lesson plans, slides, or chat.',
    ],
    examples: [
      'Split a class into 6 discussion groups.',
      'Create project teams with 4 students per group.',
      'Make quick teams for classroom games, labs, or study circles.',
    ],
    faq: [
      {
        q: 'How are groups balanced in group-count mode?',
        a: 'Members are dealt across groups round-robin so group sizes stay as close as possible.',
      },
      {
        q: 'What happens to the last group in fixed-size mode?',
        a: 'If the list does not divide evenly, the last group keeps the remaining members.',
      },
      {
        q: 'Is the list saved?',
        a: 'No. Groups are generated in your browser and are not kept after refresh.',
      },
    ],
    labels: {
      input: 'Student list',
      placeholder: 'Avery\nJordan\nMia\nLeo\nNoah\nEmma',
      mode: 'Grouping mode',
      byGroupCount: 'Number of groups',
      byGroupSize: 'Fixed group size',
      groupCount: 'Group count',
      groupSize: 'Group size',
      shuffle: 'Shuffle',
      generate: 'Generate groups',
      copyAll: 'Copy all',
      reset: 'Reset',
      groupLabel: 'Group {n}',
      summary: 'Group summary',
      emptyResult: 'Generated groups appear here',
      emptyError: 'Enter at least two students.',
      invalidCountError: 'Group count must be a whole number from 1 to the number of students.',
      invalidSizeError: 'Group size must be a whole number from 1 to the number of students.',
      copied: 'Copied',
    },
    privacyNote: 'Student lists are grouped locally in your browser and are not uploaded.',
  },
} satisfies Record<'zh' | 'en', ToolContent>;

