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
    name: '座位表產生器',
    short: '依名單規劃教室座位配置。',
    long: '座位表產生器會把貼上的學生名單放入指定列數與欄數的座位格。可選擇隨機洗牌，並支援依列或依欄填入，方便快速複製或列印。',
    seoTitle: '座位表產生器｜免費教室座位安排工具',
    seoDescription: '貼上學生名單，設定列數與欄數，隨機或依序產生座位表，可複製與列印。',
    keywords: ['座位表', 'seating chart', '教室座位', '學生座位安排'],
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
    ],
    faq: [
      {
        q: '如果座位比學生多會怎樣？',
        a: '多出的格子會顯示為空位，方便保留走道、講桌或未使用座位。',
      },
      {
        q: '每次洗牌都會不同嗎？',
        a: '會。按下產生時會重新隨機排列目前名單。',
      },
      {
        q: '可以儲存座位表嗎？',
        a: '工具本身不儲存。你可以複製文字版或使用瀏覽器列印功能保存。',
      },
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
      print: '列印',
      reset: '重設',
      seatLabel: '座位',
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
    long: 'Seating Chart places a pasted student list into a row-by-column seat grid. You can shuffle the list and fill seats by row or by column, then copy or print the chart.',
    seoTitle: 'Seating Chart Generator | Free classroom seating tool',
    seoDescription: 'Paste a student list, choose rows and columns, shuffle or keep order, and generate a copyable printable seating chart.',
    keywords: ['seating chart', 'classroom seating chart', 'student seating', 'seat planner'],
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
    ],
    faq: [
      {
        q: 'What happens if there are more seats than students?',
        a: 'Extra cells are shown as empty seats so you can reserve aisles, front spaces, or unused seats.',
      },
      {
        q: 'Will shuffle produce a different chart every time?',
        a: 'Yes. The current list is shuffled again when you generate.',
      },
      {
        q: 'Can the chart be saved?',
        a: 'The tool does not store charts. Copy the text version or use your browser print dialog to save it.',
      },
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
      print: 'Print',
      reset: 'Reset',
      seatLabel: 'Seat',
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

