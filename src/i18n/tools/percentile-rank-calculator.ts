import type { Locale } from '../../config/site';
import type { ToolContent } from './_types';

const CHECKED = '查核日期 2026-10-16';

export default {
  zh: {
    name: 'PR 百分等級計算器',
    short: '輸入低於你的人數、同分人數（含你）與總人數，用中點法算出 PR 百分等級。',
    long: '預設值就是下方第一個算例：40 人中有 24 人分數比你低、1 人同分（就是你），PR＝61.25。PR 說的是「你在這個團體裡的相對位置」，不是答對幾成。',
    seoTitle: 'PR值是什麼？怎麼算、為何最高99｜百分等級計算器',
    seoDescription: 'PR值（百分等級）計算器：輸入低於、同分與總人數算 PR，附 PR 公式、為何最高 99、PR 與百分位數差別與 Excel 公式。',
    keywords: ['PR值', 'PR值怎麼算', '百分等級', 'PR值是什麼', 'PR值最高', '百分等級 百分位數', 'PR值 excel'],
    contentSections: [
      {
        heading: 'PR 值（百分等級）是什麼',
        paragraphs: [
          'PR（Percentile Rank，百分等級）表示一個分數在某個團體裡的相對位置。國家教育研究院的數學名詞釋義是：一組數值由小到大排序，分成一百等分，某一數值位在第 r 個百分位置時，稱此數值的百分等級為 r。實務上可以讀成「約有 r% 的人分數比你低」；Sage《Encyclopedia of Educational Psychology》的說法是，百分等級表示低於某個值的分數所占的百分比，刻度為 1–99。',
          'PR 80 不是考 80 分，也不是答對 80%，而是位置：在這個團體裡，約八成的人比你低。PR 越高代表位置越前面；是不是「越好」，要看那個指標的方向（例如跑步秒數是越低越好）。PR 也只在同一個參照團體內有意義，同樣的分數放進人數、程度不同的團體，PR 會不一樣。',
        ],
      },
      {
        heading: 'PR 值怎麼算：中點法與三個算例',
        paragraphs: [
          '本頁使用中點法：PR＝100×(B＋0.5×E)÷N。B 是分數低於你的人數，E 是與你同分的人數（包含你自己），N 是團體總人數。同分的人占據一段位置，取其中點，所以 E 只算一半。以下班級資料是為示範算法而設定的假設數字。',
        ],
        items: [
          '算例一（工具預設值）：某班 40 人，小華的分數比 24 人低，只有他自己是這個分數。B＝24、E＝1、N＝40：PR＝100×(24＋0.5×1)÷40＝61.25。此時低於的人占 60%，高於的人占 37.5%，同分占 2.5%，三者加起來是 100%。',
          '算例二（有同分）：10 人數學小考，分數依序是 95、90、90、85、80、80、80、70、65、50。小明考 80 分：低於他的有 70、65、50 共 3 人，同分有 3 人（含他）。B＝3、E＝3、N＝10：PR＝100×(3＋1.5)÷10＝45。若忽略同分只算 B÷N 會得到 30，若把同分全算進去（(B＋E)÷N）會得到 60，差距很大。同一批資料，90 分的 PR＝100×(7＋1)÷10＝80，85 分的 PR＝65。',
          '算例三（名次換 PR）：某年級 300 人，小美第 30 名、沒有人與她同分。低於她的有 270 人：B＝270、E＝1、N＝300：PR＝100×(270＋0.5)÷300＝90.17（精確值 90.1667）。沒有同分時，PR＝100×(N−名次＋0.5)÷N。成績單是否把 PR 四捨五入、取到哪一位，依各校或主辦單位的規定。',
        ],
        link: {
          prefix: '手上只有名次與人數時，也可以用',
          label: '班級排名百分比計算器',
          href: '/tools/class-rank-percentile-calculator/',
          suffix: '；兩個工具的輸入資料不同，不能互相套用。',
        },
      },
      {
        heading: '為什麼 PR 最高是 99，不會是 100',
        paragraphs: [
          '用中點法算，最高分那個人也只能把自己算一半，所以 PR 一定小於 100。把算例二的 10 人班換成第一名：95 分的 PR＝100×(9＋0.5)÷10＝95；40 人的班第一名是 98.75，最後一名是 1.25；1000 人的團體第一名是 99.95。這就是百分等級常見刻度是 1–99 的原因：沒有人能「勝過所有人，包含自己」。',
          '要注意的是：人數很多時，第一名的 PR 取整數會變成 100（例如 99.95）。成績單是否把結果限制在 1–99，依各測驗或學校的成績說明為準；本工具不做截斷，直接顯示小數點後兩位。',
        ],
      },
      {
        heading: 'PR 百分等級與百分位數的差別',
        paragraphs: [
          '兩者方向相反：百分等級是「給定分數，問它的位置是百分之幾」；百分位數是「給定百分比，問對應的分數是多少」。同一份 10 人小考：90 分的百分等級是 80（算例二）；而第 90 百分位數是 90.5 分（Excel 的 PERCENTILE.INC，k＝0.9）。90.5 不是任何人的實際分數，因為 Microsoft 的說明指出，k 不是 1/(n−1) 的倍數時，函數會在資料之間內插。',
          '另外，有些資料把 PR 定義成「小於或等於」該分數的比例，這種定義不加 0.5×E，數字會比中點法高。比較不同來源的 PR 之前，先確認它的定義。',
        ],
      },
      {
        heading: 'Excel 怎麼算 PR',
        paragraphs: [
          '以算例二為例，10 人分數放在 A2:A11，小明的 80 分在 A6。下列公式已用 LibreOffice Calc 實際執行驗算（函數名稱與 Excel 相同），並與上面的算例比對。',
        ],
        snippets: [
          { label: '中點法 PR（與本頁工具相同）', code: '=(COUNTIF($A$2:$A$11,"<"&A6)+0.5*COUNTIF($A$2:$A$11,A6))/COUNT($A$2:$A$11)*100' },
          { label: 'Excel 內建 PERCENTRANK.INC（不同算法）', code: '=PERCENTRANK.INC($A$2:$A$11,A6)' },
          { label: '第 90 百分位數（分數）', code: '=PERCENTILE.INC($A$2:$A$11,0.9)' },
        ],
        items: [
          '中點法對 80 分傳回 45，對最高分 95 傳回 95，對最低分 50 傳回 5。',
          'PERCENTRANK.INC 的範圍包含 0 和 1（Microsoft 說明）：同一批資料中，80 分傳回 0.333（3 個低於，除以 10−1），最高分 95 傳回 1，最低分 50 傳回 0，與中點法不是同一種算法，不要混用。預設只顯示三位小數。',
        ],
      },
      {
        heading: 'PR 常見錯誤',
        paragraphs: [],
        items: [
          '把 PR 當原始分數或答對率：PR 80 是位置，不是 80 分。',
          'E（同分人數）漏算自己，或同分時只算 0：同分人數不是可有可無的欄位，忽略會讓 PR 偏低。',
          '把兩個不同團體的 PR 直接比較：班上第一名與全年級第一名的 PR 參照群體不同。',
          '把 PR 的差距當成等距：Chong Ho Yu 的講義指出百分等級與原始分數是非線性轉換，PR 在中段較不穩定；PR 從 50 到 60 與從 90 到 99 對應的原始分數差距通常不一樣。',
          '把名次當成「低於的人數」輸入：名次第 6 名，低於你的人數是總人數減 6，不是 6。',
          '各考試、各學校是否提供 PR、怎麼取整，依各自的成績說明；本頁不代表任何考試的官方算法。',
        ],
        link: {
          prefix: '想把常態分配下的位置換成標準分數，可以看',
          label: 'T 分數計算器與 T 分數換 PR 對照表',
          href: '/tools/t-score-calculator/',
          suffix: '。',
        },
      },
    ],
    instructions: [
      '填入分數低於你的人數 B（不含同分）。',
      '填入與你同分的人數 E，必須包含你自己，所以至少是 1。',
      '填入團體總人數 N，按下「計算 PR」；B＋E 不能超過 N。',
    ],
    examples: [
      '看自己的段考成績在全班的相對位置。',
      '把年級名次換成 PR（見算例三）。',
      '檢查成績單上的 PR 與自己用人數算出來的是否一致。',
    ],
    formula: {
      expression: 'PR＝100×(B＋0.5×E)÷N',
      explanation: 'B 為低於該分數的人數，E 為同分人數（含自己），N 為總人數。0.5×E 是同分群體的中點修正。',
    },
    reportTip: '可寫成：「該生在全班 40 人中的百分等級為 PR＝61.25（中點法）。」並交代參照群體、人數與 PR 的算法。',
    sources: [
      {
        label: '國家教育研究院辭書：百分等級（黃登源，數學名詞釋義，2012 年 10 月）',
        href: 'https://pedia.cloud.edu.tw/Entry/Detail/?title=%E7%99%BE%E5%88%86%E7%AD%89%E7%B4%9A',
        note: `百分等級的定義：將數據分為一百等分，某數值位在第 r 個百分位置時，其百分等級為 r。${CHECKED}。`,
      },
      {
        label: 'Sage《Encyclopedia of Educational Psychology》：Percentile Rank（Ernest T. Goetz，2008）',
        href: 'https://sk.sagepub.com/ency/edvol/embed/educationalpsychology/chpt/percentile-rank',
        note: `百分等級表示低於某個值的分數所占的百分比，刻度為 1–99。${CHECKED}。`,
      },
      {
        label: 'Wikipedia：Percentile rank',
        href: 'https://en.wikipedia.org/wiki/Percentile_rank',
        note: `公式 PR＝(低於該分數的個數＋0.5×同分次數)÷N×100；若定義為「小於或等於」則不加 0.5 項。${CHECKED}。`,
      },
      {
        label: 'Chong Ho Yu：Standardized Tests (Continued)',
        href: 'https://creative-wisdom.com/teaching/assessment/standardized2.html',
        note: `使用 0.5 倍同分次數的中點算法；百分等級是原始分數的非線性轉換。${CHECKED}。`,
      },
      {
        label: 'Microsoft 支援：PERCENTRANK.INC 函數',
        href: 'https://support.microsoft.com/zh-tw/office/percentrank-inc-%E5%87%BD%E6%95%B8-149592c9-00c0-49ba-86c1-c1f45b80463a',
        note: `傳回範圍包含 0 與 1 的百分比排名；significance 省略時預設三位小數。${CHECKED}。`,
      },
      {
        label: 'Microsoft 支援：PERCENTILE.INC 函數',
        href: 'https://support.microsoft.com/zh-tw/office/percentile-inc-%E5%87%BD%E6%95%B8-680f9539-45eb-410b-9a5e-c1355e5fe2ed',
        note: `傳回第 K 個百分位數的值；k 不是 1/(n−1) 的倍數時會內插。${CHECKED}。`,
      },
    ],
    faq: [
      { q: 'PR 值怎麼算？', a: 'PR＝100×(低於你的人數＋0.5×同分人數)÷總人數。例如 40 人中 24 人低於、1 人同分，PR＝61.25。' },
      { q: 'PR 值越高越好嗎？', a: 'PR 越高代表位置越前面；是不是「好」要看指標方向，也只在同一個參照團體內有意義。' },
      { q: 'PR 最高是多少？', a: '用中點法算一定小於 100，所以常見刻度是 1–99；成績單是否截成 99 依各自說明。' },
      { q: 'PR 和百分位數一樣嗎？', a: '不一樣。PR 是分數對應的位置（%），百分位數是百分比對應的分數。' },
      { q: '同分人數要包含自己嗎？', a: '要。E 是取得相同分數的總人數，包含正在計算的你。' },
    ],
    labels: {
      below: '低於該分數的人數（B）',
      equal: '同分人數（E，含自己）',
      total: '總人數（N）',
      calculate: '計算 PR',
      result: '百分等級（PR）',
      belowPercent: '低於的百分比',
      tiedPercent: '同分的百分比',
      abovePercent: '高於的百分比',
      invalid: '請確認人數為有效整數、同分人數至少為 1，且 B ＋ E 不超過總人數。',
    },
    disclaimer: '本工具供教學與初步估算，不取代正式統計軟體或專業判斷。各考試與學校的 PR 算法與取整方式，以其成績單說明為準。',
    privacyNote: '所有輸入與計算都在你的瀏覽器內完成，不會上傳到 FunnyTools。',
  },
  en: {
    name: 'Percentile Rank Calculator',
    short: 'Enter the number below, tied (including you) and total to get percentile rank by the midpoint method.',
    long: 'The defaults are the first worked example below: 24 of 40 scores are lower, 1 is tied (yours), so PR = 61.25. Percentile rank describes relative standing in a group, not percent correct.',
    seoTitle: 'Percentile Rank Calculator | PR Formula, Why Max 99',
    seoDescription: 'Percentile rank calculator: enter counts below, tied and total to get PR, with the formula, why PR tops out at 99, PR vs percentile, and Excel formulas.',
    keywords: ['percentile rank calculator', 'PR calculator', 'percentile rank formula', 'percentile rank vs percentile'],
    contentSections: [
      {
        heading: 'What percentile rank is',
        paragraphs: [
          'Percentile rank tells you where a score sits in a group: roughly r% of scores are lower. A reference encyclopedia (Sage, Encyclopedia of Educational Psychology) describes it as the percentage of scores lower than a given value on a 1–99 scale. PR 80 is not a score of 80 and not 80% correct.',
        ],
      },
      {
        heading: 'How to calculate PR (midpoint method) with worked examples',
        paragraphs: ['PR = 100 × (B + 0.5 × E) / N, where B is the count below, E the count tied including you, and N the group size. The class data below are made-up illustrations.'],
        items: [
          'Example 1 (tool default): 40 people, 24 below, 1 tied: PR = 100 × (24 + 0.5) / 40 = 61.25.',
          'Example 2 (ties): ten quiz scores 95, 90, 90, 85, 80, 80, 80, 70, 65, 50. For 80: B = 3, E = 3, N = 10, so PR = 100 × (3 + 1.5) / 10 = 45. For 90 PR = 80; for 85 PR = 65.',
          'Example 3 (rank to PR): 300 students, rank 30, no ties: B = 270, E = 1, so PR = 100 × 270.5 / 300 = 90.17.',
        ],
        link: { prefix: 'With only a rank and class size, use the ', label: 'class rank percentile calculator', href: '/tools/class-rank-percentile-calculator/', suffix: '.' },
      },
      {
        heading: 'Why PR tops out at 99',
        paragraphs: ['With the midpoint method the top scorer counts only half of themselves, so PR is always below 100: 95 for the top of ten, 98.75 for the top of 40, 99.95 for the top of 1000. Whether a report caps the integer at 99 depends on that report; this tool does not cap.'],
      },
      {
        heading: 'Percentile rank vs percentile',
        paragraphs: ['Percentile rank maps a score to a percent; a percentile maps a percent to a score. In the ten-score quiz the 90 has PR 80, while the 90th percentile (Excel PERCENTILE.INC, k = 0.9) is 90.5, an interpolated value.'],
      },
      {
        heading: 'Excel formulas',
        paragraphs: ['Scores in A2:A11, the score of interest in A6.'],
        snippets: [
          { label: 'Midpoint PR (same as this tool)', code: '=(COUNTIF($A$2:$A$11,"<"&A6)+0.5*COUNTIF($A$2:$A$11,A6))/COUNT($A$2:$A$11)*100' },
          { label: 'Built-in PERCENTRANK.INC (a different method)', code: '=PERCENTRANK.INC($A$2:$A$11,A6)' },
          { label: '90th percentile', code: '=PERCENTILE.INC($A$2:$A$11,0.9)' },
        ],
        link: { prefix: 'To move to standard scores see the ', label: 'T score calculator', href: '/tools/t-score-calculator/', suffix: '.' },
      },
    ],
    instructions: [
      'Enter the number of people scoring below you (B).',
      'Enter the number tied with you, including you (E, at least 1).',
      'Enter the group size (N) and calculate; B + E cannot exceed N.',
    ],
    examples: [
      'See where a test score sits in a class.',
      'Convert a year-level rank to PR (example 3).',
      'Check a printed PR against your own counts.',
    ],
    formula: { expression: 'PR = 100 × (B + 0.5 × E) / N', explanation: 'B is the count below, E the count tied (including you), N the group size. The 0.5E term places ties at their midpoint.' },
    reportTip: 'Example: “Within the class of 40, the student’s percentile rank was PR = 61.25 (midpoint method).” State the reference group and method.',
    sources: [
      { label: 'NAER dictionary: percentile rank (in Chinese)', href: 'https://pedia.cloud.edu.tw/Entry/Detail/?title=%E7%99%BE%E5%88%86%E7%AD%89%E7%B4%9A', note: 'Definition by hundredths of the ordered data. Checked 2026-10-16.' },
      { label: 'Sage Encyclopedia of Educational Psychology: Percentile Rank', href: 'https://sk.sagepub.com/ency/edvol/embed/educationalpsychology/chpt/percentile-rank', note: 'Percentage of scores lower than a value, scale 1–99. Checked 2026-10-16.' },
      { label: 'Wikipedia: Percentile rank', href: 'https://en.wikipedia.org/wiki/Percentile_rank', note: 'Midpoint formula with the 0.5 tie term. Checked 2026-10-16.' },
    ],
    faq: [
      { q: 'How is PR calculated?', a: 'PR = 100 × (below + 0.5 × tied) / total. With 24 below, 1 tied and 40 people, PR = 61.25.' },
      { q: 'Is PR the same as a percentile?', a: 'No. PR maps a score to a percent; a percentile maps a percent to a score.' },
      { q: 'Does the tied count include me?', a: 'Yes; E counts everyone with the same score, including the person being evaluated.' },
    ],
    labels: {
      below: 'Number below (B)',
      equal: 'Number tied, including you (E)',
      total: 'Total group size (N)',
      calculate: 'Calculate PR',
      result: 'Percentile rank (PR)',
      belowPercent: 'Percent below',
      tiedPercent: 'Percent tied',
      abovePercent: 'Percent above',
      invalid: 'Use whole numbers, make E at least 1, and keep B + E within N.',
    },
    disclaimer: 'For teaching and preliminary estimates. PR methods and rounding for specific exams or schools follow their own score reports.',
    privacyNote: 'All input and calculation stays in your browser and is not uploaded to FunnyTools.',
  },
} satisfies Record<Locale, ToolContent>;
