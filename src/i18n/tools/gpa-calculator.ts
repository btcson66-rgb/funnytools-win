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
    name: 'GPA 計算器',
    short: '依學分與字母成績用 4.3 制估算 GPA。',
    long: 'GPA 計算器可輸入課程名稱、學分與字母成績，使用常見 4.3 制換算分數並計算加權 GPA。適合在選課、期末估分或整理成績紀錄時快速試算。',
    seoTitle: 'GPA 計算器｜4.3 制學分加權試算',
    seoDescription: '免費 GPA 計算器，輸入課程、學分與 A+ 到 F 字母成績，使用 4.3 制計算 GPA。',
    keywords: ['GPA 計算器', '4.3 GPA', '學分加權', 'gpa calculator'],
    instructions: [
      '每列輸入一門課，可選填課程名稱。',
      '輸入該課程學分，並選擇字母成績。',
      '新增或刪除課程後，GPA 會自動更新。',
      '查看總學分與 GPA，必要時複製結果。',
    ],
    examples: [
      '期末前用預估成績試算整體 GPA。',
      '比較不同選課或重修情境對 GPA 的影響。',
      '整理課程成績時快速得到學分加權平均。',
    ],
    faq: [
      {
        q: '使用哪一種 GPA 制度？',
        a: '此工具使用常見 4.3 制：A+ 為 4.3、A 為 4.0、A- 為 3.7，依此類推到 F 為 0。',
      },
      {
        q: '沒有課程名稱可以嗎？',
        a: '可以。課程名稱只是方便辨識，計算只需要有效學分與字母成績。',
      },
      {
        q: '結果能作為正式成績嗎？',
        a: '不能。不同學校可能有不同換算與四捨五入規則，正式結果請以學校公告為準。',
      },
    ],
    labels: {
      course: '課程名稱（選填）',
      coursePlaceholder: '例如：英文',
      credits: '學分',
      grade: '成績',
      scale: 'GPA 制度',
      scale43: '4.3 制',
      scale40: '4.0 制',
      addRow: '新增課程',
      remove: '移除',
      copy: '複製結果',
      result: 'GPA 結果',
      totalCredits: '總學分',
      qualityPoints: '總績點',
      gpa: 'GPA',
      noValidRows: '請輸入至少一門有效課程。',
      scaleNote: '使用 4.3 制：A+=4.3、A=4.0、A-=3.7、B+=3.3、B=3.0、B-=2.7、C+=2.3、C=2.0、C-=1.7、D=1.0、F=0。',
      scaleNote43: '使用 4.3 制：A+=4.3、A=4.0、A-=3.7、B+=3.3、B=3.0、B-=2.7、C+=2.3、C=2.0、C-=1.7、D=1.0、F=0。',
      scaleNote40: '使用 4.0 制：A+ 與 A=4.0、A-=3.7、B+=3.3、B=3.0、B-=2.7、C+=2.3、C=2.0、C-=1.7、D=1.0、F=0。',
      ignoredInvalidRows: '空白、零或負學分列未計入。',
      copied: '已複製',
    },
    disclaimer: 'GPA 換算制度可能因學校而異，正式成績請以校方規定為準。',
  },
  en: {
    name: 'GPA Calculator',
    short: 'Estimate GPA from credits and letter grades on a 4.3 scale.',
    long: 'Enter course names, credits, and letter grades to estimate credit-weighted GPA on a common 4.3 scale. It is useful for planning, end-of-term estimates, and comparing grade scenarios.',
    seoTitle: 'GPA Calculator | 4.3 scale credit-weighted GPA',
    seoDescription: 'Calculate GPA from course credits and letter grades using a common 4.3 scale from A+ to F.',
    keywords: ['GPA calculator', '4.3 GPA scale', 'credit weighted GPA', 'grade point average'],
    instructions: [
      'Enter one course per row. Course name is optional.',
      'Add credits and choose the letter grade.',
      'Add or remove rows as needed; GPA updates automatically.',
      'Copy the summary when you want to save or share the estimate.',
    ],
    examples: [
      'Estimate term GPA before final grades are official.',
      'Compare how different grade scenarios affect overall GPA.',
      'Summarize a course list with total credits and grade points.',
    ],
    faq: [
      {
        q: 'Which GPA scale is used?',
        a: 'The calculator uses a common 4.3 scale: A+ is 4.3, A is 4.0, A- is 3.7, down to F as 0.',
      },
      {
        q: 'Is course name required?',
        a: 'No. Course names are only for clarity. The calculation uses credits and letter grades.',
      },
      {
        q: 'Can this replace my official transcript?',
        a: 'No. Schools may use different conversion or rounding rules. Always follow your institution official policy.',
      },
    ],
    labels: {
      course: 'Course name (optional)',
      coursePlaceholder: 'Example: English',
      credits: 'Credits',
      grade: 'Grade',
      scale: 'GPA scale',
      scale43: '4.3 scale',
      scale40: '4.0 scale',
      addRow: 'Add course',
      remove: 'Remove',
      copy: 'Copy result',
      result: 'GPA result',
      totalCredits: 'Total credits',
      qualityPoints: 'Quality points',
      gpa: 'GPA',
      noValidRows: 'Enter at least one valid course.',
      scaleNote: 'Scale used: A+=4.3, A=4.0, A-=3.7, B+=3.3, B=3.0, B-=2.7, C+=2.3, C=2.0, C-=1.7, D=1.0, F=0.',
      scaleNote43: '4.3 scale: A+=4.3, A=4.0, A-=3.7, B+=3.3, B=3.0, B-=2.7, C+=2.3, C=2.0, C-=1.7, D=1.0, F=0.',
      scaleNote40: '4.0 scale: A+ and A=4.0, A-=3.7, B+=3.3, B=3.0, B-=2.7, C+=2.3, C=2.0, C-=1.7, D=1.0, F=0.',
      ignoredInvalidRows: 'Blank, zero, or negative-credit rows were not included.',
      copied: 'Copied!',
    },
    disclaimer: 'GPA conversion rules can vary by institution. Use official school policy for final records.',
  },
} satisfies Record<'zh' | 'en', ToolContent>;
