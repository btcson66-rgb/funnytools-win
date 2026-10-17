import type { Locale } from '../../config/site';
import type { ToolContent } from './_types';
import { normalCdf } from '../../lib/educationStats';

// Every number in the tables below is produced by the same normalCdf() the calculator uses,
// so the page can never drift from the tool. tests/p2-core-pages.test.mjs compares the function
// against all 410 entries of the NIST/SEMATECH normal table (tests/fixtures/nist-normal-table.json).
const Z_TABLE_COLUMNS = Array.from({ length: 10 }, (_, i) => (i / 100).toFixed(2));
const zTableRows = Array.from({ length: 35 }, (_, r) => {
  const rowZ = r / 10;
  return [rowZ.toFixed(1), ...Z_TABLE_COLUMNS.map((_c, i) => normalCdf(rowZ + i / 100).toFixed(4))];
});

const RANGE_Z_VALUES = [1, 1.645, 1.96, 2, 2.576, 3];
const rangeRows = RANGE_Z_VALUES.map((z) => [
  `z = ${z}`,
  normalCdf(z).toFixed(4),
  `${(100 * (2 * normalCdf(z) - 1)).toFixed(2)}%`,
]);

const CHECKED = '查核日期 2026-10-17';

export default {
  zh: {
    name: 'Z 分數計算器',
    short: '輸入原始分數、平均數與標準差，算出 Z 分數、常態假設下的累積比例與對應的 T 分數；已經有 Z 值也可以直接查比例。',
    long: '預設值就是下方第一個算例：段考 82 分、全班平均 70、標準差 10，按下計算會得到 z＝1.2，在常態分配假設下約勝過 88.49% 的人。只想由 Z 值查比例，把 Z 填在最後一格即可。',
    seoTitle: 'Z分數怎麼算？公式、Z表查表與Z分數計算機',
    seoDescription: 'Z分數計算機：輸入原始分數、平均與標準差，用 z=(X−M)÷SD 算出 Z分數，附怎麼看、Z表查表方法、Z分數與T分數換算、常態分配與 Excel 公式。',
    keywords: ['Z分數', 'Z分數怎麼算', 'Z分數公式', 'Z分數查表', 'Z表', 'Z分數 T分數', 'Z分數 常態分配', '標準分數'],
    contentSections: [
      {
        heading: 'Z 分數是什麼',
        paragraphs: [
          'Z 分數回答一個問題：這個分數比團體平均高或低「幾個標準差」。國家教育研究院《教育大辭書》說明，Z 分數是直線標準分數之一，是最基本且最簡單的一種，其他直線標準分數（例如 T 分數）都依 Z 分數的原理計算；原始分數高於平均數時 Z 為正、低於平均數時為負、與平均數一樣大時為 0。',
          '同一份辭書的「標準分數」詞條把這類分數定義為：以平均數為參照點，用離均差表示個別分數在所屬團體中的相對位置。所以 Z 分數描述的是「在這個團體裡站在哪裡」，不是答對幾成：同樣 82 分，放在平均 70 的班級和平均 90 的班級，Z 分數完全不同。',
        ],
      },
      {
        heading: 'Z 分數怎麼算：公式與算例',
        paragraphs: [
          '公式是 z＝(X−M)÷SD（教育大辭書寫成 Z＝(X－M)/S）：X 是原始分數，M 是平均數，SD 是標準差。M 與 SD 必須是同一個團體、同一份考卷的數字，標準差必須大於 0。以下班級數字是為了示範算法而設定的假設數字。',
        ],
        items: [
          '算例一（工具預設值）：某班國文段考，全班平均 70、標準差 10，小明考 82 分。z＝(82−70)÷10＝1.2，表示高於平均 1.2 個標準差。在常態分配假設下，這個位置約勝過 88.49% 的同學（查表方法見下一節）。',
          '算例二（兩科比較）：數學 85 分（全班平均 70、標準差 15）、英文 91 分（全班平均 82、標準差 6）。數學 z＝(85−70)÷15＝1，英文 z＝(91−82)÷6＝1.5。數學比平均高 15 分、英文只高 9 分，但英文分數比較集中，所以英文的相對位置反而更前面。把工具的三格改成 85、70、15 就能重現數學的結果。',
          '算例三（低於平均）：社會科 55 分，全班平均 68、標準差 10。z＝(55−68)÷10＝−1.3，低於平均 1.3 個標準差，常態假設下約勝過 9.68% 的同學。',
          '反推：想在平均 64、標準差 12 的考試達到 z＝2，原始分數要 X＝M＋z×SD＝64＋2×12＝88 分。',
        ],
        link: {
          prefix: '平均數與標準差還沒算出來，可以先用',
          label: '標準差計算器',
          href: '/tools/standard-deviation/',
          suffix: '。',
        },
      },
      {
        heading: 'Z 分數怎麼看',
        paragraphs: ['0 是平均，每差 1 就是差 1 個標準差；正負號看方向，絕對值看距離。'],
        items: [
          'z＝0：剛好等於團體平均。',
          'z＝1 或 −1：高於或低於平均 1 個標準差；z＝2 或 −2 則是 2 個標準差。',
          '|z| 越大，離平均越遠；Z 分數沒有固定的上下限。',
          'Z 分數不是百分制成績，也不是名次：z＝1.2 不代表 1.2 分，也不代表第 1.2 名。',
          '教育大辭書的例子：Z＝+1.0 表示成績居於平均數之上一個標準差的位置，在常態分配的假定下，勝過 84.13% 的學生；Z＝−1.0 則只勝過 15.87%。',
          '分數越高是否代表「越好」，要看該測驗的計分方向，請以測驗說明或成績單為準。',
        ],
      },
      {
        heading: 'Z 分數查表：Z 表怎麼用',
        paragraphs: [
          'Z 表把 z 換成標準常態分配中「小於等於 z 的比例」Φ(z)。查法：把 z 寫到小數第 2 位，用前兩位（例如 1.2）找列，用第三位（例如 0.03）找欄。例如 z＝1.23：列 1.2、欄 0.03，得 0.8907，也就是約 89.07%。',
          '負的 z 用對稱性：Φ(−z)＝1−Φ(z)。例如 z＝−1.3，先查 1.3 得 0.9032，再算 1−0.9032＝0.0968，約 9.68%，與算例三一致。',
          'NIST/SEMATECH《工程統計手冊》的 Z 表是「從 0 到 z 的面積」版本，要再加 0.5 才是累積比例；手冊的例子是 z＝1.53 查到 0.43699，加 0.5 得 0.93699。下表改成直接給累積比例 Φ(z)，由本頁工具使用的同一支程式算出，並已逐格對照 NIST 表的 410 個數值，差異都在 0.00001 以內。',
        ],
        table: {
          caption: 'Z 表：標準常態分配小於等於 z 的累積比例 Φ(z)（取到小數第 4 位；列＝z 的前兩位，欄＝第三位）',
          headers: ['z', ...Z_TABLE_COLUMNS],
          rows: zTableRows,
          note: '這張表只有在常態分配假設下才能當成「比例」使用。成績明顯偏斜或集中在某一端時，不能直接查表當 PR；此時應回到名次與人數計算。',
        },
        items: [
          'NIST 手冊同時列出常用於統計檢定的臨界值：Φ(z)＝0.90、0.95、0.975、0.99、0.995 時，z 分別約為 1.282、1.645、1.960、2.326、2.576。',
        ],
        link: {
          prefix: '已知名次與人數、想直接算 PR，請用',
          label: 'PR 百分等級計算器',
          href: '/tools/percentile-rank-calculator/',
          suffix: '。',
        },
      },
      {
        heading: 'Z 分數與 T 分數的關係',
        paragraphs: [
          'T 分數是把 Z 分數線性轉換到「平均 50、標準差 10」的尺度：T＝50＋10z。教育大辭書說明，T 分數 60 表示高於平均數一個標準差；直線轉換得到的 T 分數，分配形狀與原始分數相同。這樣做是為了避開負數與小數，讓成績單比較好讀。',
          'Z 與 T 是同一個位置的兩種寫法，只改尺度，不改相對位置。',
        ],
        items: [
          'z＝1.2 → T＝50＋10×1.2＝62（本頁預設值）。',
          'z＝−1.3 → T＝50＋10×(−1.3)＝37（算例三）。',
          'z＝0 → T＝50；z＝1 → T＝60；z＝−2 → T＝30。',
          '反過來：T＝65 → z＝(65−50)÷10＝1.5。',
          '教育大辭書另說明 T 分數也可以先求百分等級、再轉成標準常態的 z（常態化轉換），這時 T 與百分等級有固定對應；本頁工具做的是直線轉換。',
        ],
        link: {
          prefix: '想直接由原始分數換成 T 分數與近似 PR，用',
          label: 'T 分數計算器',
          href: '/tools/t-score-calculator/',
          suffix: '。',
        },
      },
      {
        heading: 'Z 分數與常態分配',
        paragraphs: [
          '標準常態分配的平均是 0、標準差是 1，z 的位置決定曲線下的面積。教育大辭書也是在「常態分配的假定下」，才把 Z＝±1 說成勝過 84.13%／15.87%。',
          '換成 Z 分數只改變中心與尺度，不會把偏斜的資料變成常態：成績明顯偏斜時，z＝1 的位置未必勝過 84% 的人。下表同樣假設常態分配。',
        ],
        table: {
          caption: '常態假設下，z 與落在 −z 到 +z 之間的比例',
          headers: ['z', '小於等於 z 的比例 Φ(z)', '落在 −z 到 +z 之間'],
          rows: rangeRows,
          note: '「落在 −z 到 +z 之間」＝2Φ(z)−1，由本頁工具的 Φ(z) 算出。',
        },
      },
      {
        heading: 'Excel 怎麼算 Z 分數',
        paragraphs: [
          '假設全班分數放在 A2:A41，要換算的那一位在 A2，平均數放在 D1、標準差放在 D2，Z 分數放在 B2。下面的公式已用 LibreOffice Calc 實際執行驗算（函數名稱與 Excel 相同）；Microsoft 說明文件的範例 STANDARDIZE(42,40,1.5)＝1.33333333、NORM.S.DIST(1.333333,TRUE)＝0.908788726 也與本頁工具的函式一致。',
        ],
        snippets: [
          { label: '平均數（填入 D1）', code: '=AVERAGE(A2:A41)' },
          { label: '標準差：全班就是完整群體（填入 D2）', code: '=STDEV.P(A2:A41)' },
          { label: '標準差：把這批成績當作抽樣（填入 D2）', code: '=STDEV.S(A2:A41)' },
          { label: 'Z 分數（填入 B2）', code: '=STANDARDIZE(A2,$D$1,$D$2)' },
          { label: 'Z 分數（不用 STANDARDIZE）', code: '=(A2-$D$1)/$D$2' },
          { label: 'Z 換成累積比例（等於查 Z 表）', code: '=NORM.S.DIST(B2,TRUE)' },
          { label: '高於這個 Z 的比例', code: '=1-NORM.S.DIST(B2,TRUE)' },
          { label: '已知比例反查 Z（例如 0.975 → 1.959964）', code: '=NORM.S.INV(0.975)' },
          { label: 'Z 換成 T 分數', code: '=50+10*B2' },
        ],
        items: [
          'Microsoft 的說明指出：STANDARDIZE 的 standard_dev 小於等於 0 會傳回 #NUM!；NORM.S.INV 的機率不在 0 與 1 之間（不含 0 和 1）時同樣傳回 #NUM!。',
          'STDEV.P 假設引數是整個母體，STDEV.S 假設引數是母體的樣本。選哪一個會讓 Z 分數有些微差異，請與成績報表或老師的說明一致。',
        ],
      },
      {
        heading: 'Z 分數常見錯誤',
        paragraphs: [],
        items: [
          '把 Z 分數當百分制：z＝1.2 不是 1.2 分。',
          '把 z 直接當名次或 PR：z＝1 在常態假設下的比例約 84.13%，不是 1。',
          '平均數與標準差來自不同的團體或不同的考卷（例如拿全校平均配班級分數）：結果沒有意義。',
          '標準差用錯版本：整個班級當作完整群體與當作抽樣，算出的 Z 會有差異，選一個並在報告寫明。',
          '標準差填 0 或負數：z 無法計算，工具會顯示錯誤。',
          '對明顯偏斜的成績硬查 Z 表當比例。',
        ],
      },
    ],
    instructions: [
      '填入原始分數 X，以及同一團體的平均數 M 與標準差 SD。',
      '按下「計算 Z 分數」，看 Z 分數、常態假設下的累積比例與對應的 T 分數。',
      '只想由 Z 值查比例時，把 Z 填在最後一格，上面三格會被忽略。',
      '正式報告請回到測驗手冊或成績單，確認採用的常模與換算方式。',
    ],
    examples: [
      '看自己的段考分數在全班的相對位置（算例一）。',
      '比較兩科原始分數的相對位置（算例二）。',
      '查 Z 表：已知 Z 值，換成常態假設下的比例。',
    ],
    formula: {
      expression: 'z＝(X−M)÷SD；T＝50＋10z；常態假設下低於此分數的比例＝Φ(z)',
      explanation: 'X 是原始分數，M 是平均數，SD 是標準差（必須大於 0）。Φ(z) 是標準常態累積機率，即 Z 表的內容。',
    },
    reportTip: '可寫成：「依班級平均 70、母體標準差 10 換算，該生國文 82 分的 Z 分數為 1.20。」並寫明標準差用的是母體或樣本版本，以及是否假設常態分配。',
    sources: [
      {
        label: '國家教育研究院《教育大辭書》：Z分數（簡茂發，2000 年 12 月）',
        href: 'https://pedia.cloud.edu.tw/Entry/Detail/?title=Z%E5%88%86%E6%95%B8',
        note: `Z 為最基本的直線標準分數；公式 Z＝(X－M)/S；正負號與 0 的意義；Z＝±1.0 在常態假設下勝過 84.13%／15.87%。${CHECKED}。`,
      },
      {
        label: '國家教育研究院《教育大辭書》：標準分數（魏麗敏，2000 年 12 月）',
        href: 'https://pedia.cloud.edu.tw/Entry/Detail/?title=%E6%A8%99%E6%BA%96%E5%88%86%E6%95%B8',
        note: `標準分數以平均數為參照點，用離均差表示個別分數在團體中的相對位置；Z 分數、T 分數等屬於同一類。${CHECKED}。`,
      },
      {
        label: '國家教育研究院《教育大辭書》：T分數（盧雪梅，2012 年 10 月）',
        href: 'https://pedia.cloud.edu.tw/Entry/Detail/?title=T%E5%88%86%E6%95%B8',
        note: `T 分數平均 50、標準差 10；直線轉換與常態化轉換；T 60 表示高於平均一個標準差。${CHECKED}。`,
      },
      {
        label: 'NIST/SEMATECH e-Handbook of Statistical Methods：1.3.6.7.1 Cumulative Distribution Function of the Standard Normal Distribution',
        href: 'https://www.itl.nist.gov/div898/handbook/eda/section3/eda3671.htm',
        note: `標準常態「從 0 到 z 的面積」表、查表範例（z＝1.53 → 0.43699＋0.5）與常用臨界值；本頁 Z 表已逐格對照。${CHECKED}。`,
      },
      {
        label: 'Microsoft 支援：STANDARDIZE 函數',
        href: 'https://support.microsoft.com/zh-tw/excel/functions/standardize-function',
        note: `語法 STANDARDIZE(x, mean, standard_dev)；standard_dev ≤ 0 傳回 #NUM!；範例結果 1.33333333。${CHECKED}。`,
      },
      {
        label: 'Microsoft 支援：NORM.S.DIST 函數',
        href: 'https://support.microsoft.com/zh-tw/excel/functions/norm-s-dist-function',
        note: `標準常態分配，cumulative 為 TRUE 時傳回累加分配函數；範例結果 0.908788726。${CHECKED}。`,
      },
      {
        label: 'Microsoft 支援：NORM.S.INV 函數',
        href: 'https://support.microsoft.com/zh-tw/excel/functions/norm-s-inv-function',
        note: `傳回標準常態累加分配的反函數值；機率不在 0 與 1 之間（不含 0 和 1）傳回 #NUM!。${CHECKED}。`,
      },
      {
        label: 'Microsoft 支援：STDEV.P 函數',
        href: 'https://support.microsoft.com/zh-tw/excel/functions/stdev-p-function',
        note: `假設引數為整個母體。${CHECKED}。`,
      },
      {
        label: 'Microsoft 支援：STDEV.S 函數',
        href: 'https://support.microsoft.com/zh-tw/excel/functions/stdev-s-function',
        note: `假設引數為母體的樣本。${CHECKED}。`,
      },
    ],
    faq: [
      { q: 'Z 分數怎麼算？', a: 'z＝(原始分數−平均數)÷標準差。例如 82 分、平均 70、標準差 10，z＝1.2。' },
      { q: 'Z 分數是負的代表什麼？', a: '代表原始分數低於團體平均；z＝−1.3 就是低於平均 1.3 個標準差。' },
      { q: 'Z 分數怎麼查表？', a: '把 z 寫到小數第 2 位，用前兩位找列、第三位找欄，查到的是小於等於 z 的比例；負的 z 用 1 減去對應正值的比例。' },
      { q: 'Z 分數可以換成 T 分數嗎？', a: '可以，T＝50＋10z。例如 z＝1.2 對應 T＝62。' },
      { q: '沒有平均數和標準差也能算 Z 分數嗎？', a: '不行。原始分數必須搭配同一團體的平均數與標準差；若已經有 Z 值，可直接填在最後一格查比例。' },
    ],
    labels: {
      score: '原始分數（X）',
      mean: '平均數（M）',
      sd: '標準差（SD）',
      z: '只想由 Z 值查比例？填這格（選填，填了會忽略上面三格）',
      calculate: '計算 Z 分數',
      result: 'Z 分數',
      distanceFromMean: '與平均的距離',
      sdUnit: '個標準差',
      relativePosition: '相對位置',
      aboveMean: '高於平均',
      belowMean: '低於平均',
      atMean: '等於平均',
      cumulative: '低於此分數的比例（常態假設）',
      upperTail: '高於此分數的比例（常態假設）',
      tEquivalent: '對應 T 分數（50＋10z）',
      invalid: '請輸入有效數字，且標準差必須大於 0；若填了 Z 值欄，它必須是有效數字。',
    },
    disclaimer: '本工具供教學與初步估算，不取代正式統計軟體或專業判斷。正式成績或測驗報告請以測驗手冊、成績單或主辦單位公告為準。',
    privacyNote: '所有輸入與計算都在你的瀏覽器內完成，不會上傳到 FunnyTools。',
  },
  en: {
    name: 'Z Score Calculator',
    short: 'Enter a raw score, mean and standard deviation to get the z score, the proportion below it under a normal assumption, and the matching T score. Already have a z value? Type it in to look up the proportion.',
    long: 'The defaults are the first worked example below: a score of 82 with class mean 70 and SD 10 gives z = 1.2, about 88.49% of a normal distribution lies below it. To look up a proportion from a z value, type it in the last box.',
    seoTitle: 'Z Score Calculator | Formula, Z Table and Excel',
    seoDescription: 'Z score calculator: enter raw score, mean and SD to get z = (X − M) / SD, with how to read it, how to use a z table, the z to T score link and Excel formulas.',
    keywords: ['z score calculator', 'z score formula', 'z table', 'z score to percentile', 'z score to t score', 'standard score'],
    contentSections: [
      {
        heading: 'What a z score is',
        paragraphs: [
          'A z score says how many standard deviations a score lies above or below the group mean. The Taiwan National Academy for Educational Research encyclopedia describes it as the most basic linear standard score: positive above the mean, negative below it, and 0 when equal to the mean.',
          'It describes position within a group, not percent correct: the same raw score of 82 has a different z score in a class averaging 70 and a class averaging 90.',
        ],
      },
      {
        heading: 'How to calculate a z score',
        paragraphs: ['z = (X − M) / SD, where M and SD come from the same group and the same test as X, and SD must be greater than 0. The class numbers below are made-up illustrations.'],
        items: [
          'Example 1 (tool default): class mean 70, SD 10, score 82. z = (82 − 70) / 10 = 1.2; under a normal assumption about 88.49% of the group scores lower.',
          'Example 2 (two subjects): math 85 (mean 70, SD 15) gives z = 1; English 91 (mean 82, SD 6) gives z = 1.5. Math is 15 points above average and English only 9, but English scores are more tightly spread, so the English position is stronger.',
          'Example 3 (below average): 55 with mean 68 and SD 10 gives z = −1.3, about 9.68% of the group below it under normality.',
          'Reverse: to reach z = 2 when the mean is 64 and SD is 12, you need X = 64 + 2 × 12 = 88.',
        ],
        link: { prefix: 'To get the mean and SD first, use the ', label: 'standard deviation calculator', href: '/tools/standard-deviation/', suffix: '.' },
      },
      {
        heading: 'How to read a z score',
        paragraphs: ['0 is the average and each 1 is one standard deviation; the sign gives the direction and the absolute value the distance.'],
        items: [
          'z = 0: exactly the group mean. z = 1 or −1: one SD above or below.',
          'A z score is not a percentage score or a rank.',
          'The encyclopedia notes that under a normal assumption z = +1.0 beats 84.13% of students and z = −1.0 beats 15.87%.',
        ],
      },
      {
        heading: 'Using a z table',
        paragraphs: [
          'A z table converts z into the proportion of a standard normal distribution at or below z, Φ(z). Write z to two decimals, find the row by the first two digits and the column by the last: z = 1.23 gives row 1.2, column 0.03, 0.8907, about 89.07%.',
          'For negative z use Φ(−z) = 1 − Φ(z): z = −1.3 gives 1 − 0.9032 = 0.0968. The NIST/SEMATECH handbook table lists the area from 0 to z instead (z = 1.53 gives 0.43699, add 0.5 for 0.93699). The table below is generated by the same function as the calculator and was compared with all 410 NIST entries (differences within 0.00001).',
        ],
        table: {
          caption: 'Standard normal cumulative proportion Φ(z) (row = first two digits of z, column = third digit)',
          headers: ['z', ...Z_TABLE_COLUMNS],
          rows: zTableRows,
          note: 'The table is a proportion only under a normality assumption.',
        },
        link: { prefix: 'To compute PR from counts instead, use the ', label: 'percentile rank calculator', href: '/tools/percentile-rank-calculator/', suffix: '.' },
      },
      {
        heading: 'Z score and T score',
        paragraphs: ['T = 50 + 10z puts a z score on a scale with mean 50 and SD 10. z = 1.2 gives T = 62, z = −1.3 gives T = 37, and T = 65 means z = 1.5. Only the scale changes, not the position.'],
        link: { prefix: 'To convert raw scores directly, use the ', label: 'T score calculator', href: '/tools/t-score-calculator/', suffix: '.' },
      },
      {
        heading: 'Z score and the normal distribution',
        paragraphs: ['Standardising changes the centre and scale but not the shape, so a skewed set of scores stays skewed. The table assumes normality.'],
        table: {
          caption: 'Normal assumption: z and the proportion between −z and +z',
          headers: ['z', 'Φ(z)', 'Between −z and +z'],
          rows: rangeRows,
        },
      },
      {
        heading: 'Z score in Excel',
        paragraphs: ['Assume scores in A2:A41, the mean in D1, the SD in D2 and the z score in B2. The formulas were run in LibreOffice Calc.'],
        snippets: [
          { label: 'Mean (D1)', code: '=AVERAGE(A2:A41)' },
          { label: 'SD, whole group (D2)', code: '=STDEV.P(A2:A41)' },
          { label: 'SD, sample (D2)', code: '=STDEV.S(A2:A41)' },
          { label: 'Z score', code: '=STANDARDIZE(A2,$D$1,$D$2)' },
          { label: 'Proportion below z (z table)', code: '=NORM.S.DIST(B2,TRUE)' },
          { label: 'z for a given proportion', code: '=NORM.S.INV(0.975)' },
        ],
      },
    ],
    instructions: [
      'Enter the raw score X and the mean M and SD of the same group.',
      'Press Calculate to see z, the proportion below it under normality and the T score.',
      'To look up a proportion from a z value, type z in the last box; the first three boxes are then ignored.',
    ],
    examples: [
      'See where a test score sits within a class.',
      'Compare relative standing across two subjects.',
      'Look up the normal proportion for a known z value.',
    ],
    formula: {
      expression: 'z = (X − M) / SD; T = 50 + 10z; proportion below = Φ(z) (normal assumption)',
      explanation: 'X is the raw score, M the mean, SD the standard deviation (greater than 0). Φ is the standard normal cumulative probability, the content of a z table.',
    },
    reportTip: 'Example: “Using a class mean of 70 and a population SD of 10, the student’s score of 82 corresponds to z = 1.20.” State whether the SD is the population or sample version.',
    sources: [
      {
        label: 'NAER Educational Encyclopedia: Z-score (in Chinese)',
        href: 'https://pedia.cloud.edu.tw/Entry/Detail/?title=Z%E5%88%86%E6%95%B8',
        note: 'Basic linear standard score; z = (X − M) / S; z = ±1.0 beats 84.13% / 15.87% under normality. Checked 2026-10-17.',
      },
      {
        label: 'NIST/SEMATECH e-Handbook: Cumulative Distribution Function of the Standard Normal Distribution',
        href: 'https://www.itl.nist.gov/div898/handbook/eda/section3/eda3671.htm',
        note: 'Standard normal table, worked lookup example and critical values. Checked 2026-10-17.',
      },
      {
        label: 'Microsoft Support: STANDARDIZE function',
        href: 'https://support.microsoft.com/zh-tw/excel/functions/standardize-function',
        note: 'STANDARDIZE(x, mean, standard_dev). Checked 2026-10-17.',
      },
      {
        label: 'Microsoft Support: NORM.S.DIST function',
        href: 'https://support.microsoft.com/zh-tw/excel/functions/norm-s-dist-function',
        note: 'Standard normal distribution; cumulative = TRUE. Checked 2026-10-17.',
      },
    ],
    faq: [
      { q: 'How do I calculate a z score?', a: 'z = (X − mean) / SD. For 82, mean 70 and SD 10, z = 1.2.' },
      { q: 'What does a negative z score mean?', a: 'The score is below the group mean; z = −1.3 is 1.3 SDs below.' },
      { q: 'Can I convert z to a T score?', a: 'Yes: T = 50 + 10z, so z = 1.2 gives T = 62.' },
    ],
    labels: {
      score: 'Raw score (X)',
      mean: 'Mean (M)',
      sd: 'Standard deviation (SD)',
      z: 'Just looking up a z value? Enter it here (optional; overrides the three boxes above)',
      calculate: 'Calculate z score',
      result: 'Z score',
      distanceFromMean: 'Distance from the mean',
      sdUnit: 'SD',
      relativePosition: 'Position',
      aboveMean: 'Above the mean',
      belowMean: 'Below the mean',
      atMean: 'At the mean',
      cumulative: 'Proportion below (normal assumption)',
      upperTail: 'Proportion above (normal assumption)',
      tEquivalent: 'Equivalent T score (50 + 10z)',
      invalid: 'Enter valid numbers with SD greater than 0; if the z box is filled it must be a valid number.',
    },
    disclaimer: 'For teaching and preliminary estimates. For formal scores follow the test manual, score report or the organiser’s notice.',
    privacyNote: 'All input and calculation stays in your browser and is not uploaded to FunnyTools.',
  },
} satisfies Record<Locale, ToolContent>;
