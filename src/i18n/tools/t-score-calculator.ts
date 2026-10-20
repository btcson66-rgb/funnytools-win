import type { Locale } from '../../config/site';
import type { ToolContent } from './_types';
import { normalCdf } from '../../lib/educationStats';

// The T -> PR table is generated with the same normalCdf() the calculator uses,
// so the page can never drift from the tool.
const TABLE_T_VALUES = [20, 30, 35, 40, 45, 50, 55, 60, 65, 70, 80];
const prTableRows = TABLE_T_VALUES.map((t) => {
  const z = (t - 50) / 10;
  return [`T = ${t}`, z.toFixed(1), (100 * normalCdf(z)).toFixed(2)];
});

const CHECKED = '查核日期 2026-10-16';
const CHECKED_NOW = '查核日期 2026-10-17';

export default {
  zh: {
    name: 'T 分數計算器',
    short: '輸入原始分數、平均數與標準差，算出 Z 分數、T 分數（T＝50＋10z）與常態假設下的近似 PR。',
    long: '預設值就是下方第一個算例：段考 82 分、全班平均 70、標準差 10，按下計算會得到 z＝1.2、T＝62。已經有 Z 分數的話，直接填在最後一格即可。',
    seoTitle: 'T分數計算機｜T分數怎麼算？T=50+10z 公式與換PR對照表',
    seoDescription: 'T分數計算機：輸入原始分數、平均與標準差，用 T=50+10z 算出 T分數，附怎麼看、T分數換PR對照表與 Excel 公式。',
    keywords: ['T分數計算機', 'T分數', 'T分數怎麼算', 'T分數計算', 'T分數 PR 換算', 'T分數 excel', '原始分數換算 T分數'],
    contentSections: [
      {
        heading: 'T 分數是什麼',
        paragraphs: [
          'T 分數是一種標準分數：先把原始分數換成「高於或低於團體平均幾個標準差」，再放到平均 50、標準差 10 的尺度上。國家教育研究院《教育大辭書》對 T 分數的說明是：T 分數分配的平均數為 50、標準差為 10，T 分數 60 表示表現高於平均數一個標準差。',
          'T 分數回答的是「在這個團體裡站在哪裡」，不是「答對幾成」。同一個原始分數放到不同班級、不同考卷，T 分數會不一樣。',
          '同一則詞條也說明 T 分數有兩種取得方式：直線轉換（由原始分數直接換算，轉換後的分配形狀與原始分數相同），以及常態化轉換（先求百分等級，再換成標準常態分配的 z 分數）。本頁工具做的是直線轉換。',
        ],
      },
      {
        heading: 'T 分數怎麼算：原始分數換算',
        paragraphs: [
          '兩個步驟：先算 Z 分數 z＝(X−M)÷SD，再算 T＝50＋10×z。X 是原始分數，M 與 SD 必須是同一個團體、同一份考卷的平均數與標準差。以下班級數字是為了示範算法而設定的假設數字。',
        ],
        items: [
          '算例一（工具預設值）：某班國文段考，全班平均 M＝70、標準差 SD＝10，小明考 X＝82。z＝(82−70)÷10＝1.2；T＝50＋10×1.2＝62。結論：小明比全班平均高 1.2 個標準差，T 分數 62。',
          '算例二（兩科比較）：同一位同學數學 68 分（全班平均 52、標準差 16）、英文 85 分（全班平均 80、標準差 10）。數學 z＝(68−52)÷16＝1，T＝60；英文 z＝(85−80)÷10＝0.5，T＝55。結論：英文原始分數比較高，但數學在班上的相對位置更前面。把工具的三格改成 68、52、16 就能重現數學的結果。',
          '算例三（低於平均）：自然 55 分，全班平均 62、標準差 8。z＝(55−62)÷8＝−0.875；T＝50＋10×(−0.875)＝41.25。T 低於 50，表示低於全班平均。',
          '算例四（同樣 82 分，不同的考試）：八年級數學段考 A，全班平均 70、母體標準差 8，同學考 82：z＝(82−70)÷8＝1.5，T＝50＋10×1.5＝65。另一次考試 B，全班平均 78、標準差 6，同樣考 82：z＝(82−78)÷6＝0.6667，T＝50＋10×0.6667＝56.67。結論：原始分數一樣，T 分數差了 8.33，因為 B 考得好的人比較多、分數也比較集中；要比較兩次考試，先確認兩份考卷測的是可比較的東西。',
          '反過來推：想在平均 70、標準差 10 的考試拿到 T＝60，原始分數要 X＝M＋SD×(T−50)÷10＝70＋10×10÷10＝80 分。',
        ],
        link: {
          prefix: '想單獨了解 Z 分數的意義，可以用',
          label: 'Z 分數計算器',
          href: '/tools/z-score-calculator/',
          suffix: '。',
        },
      },
      {
        heading: 'T 分數怎麼看',
        paragraphs: ['把 50 當成平均，每差 10 分就是差 1 個標準差。'],
        items: [
          'T＝50：z＝0，剛好等於團體平均。',
          'T＝60 或 40：高於或低於平均 1 個標準差。',
          'T＝70 或 30：高於或低於平均 2 個標準差。',
          'T 分數不是百分制成績，也不是答對率：T＝62 不代表 62 分。',
          'T 分數越高是否代表「越好」，要看該測驗對分數方向的定義，請以測驗手冊或報表說明為準。',
          '只有在同一個團體、同一種換算方式下，T 分數才能互相比較；不同班級的 T＝60，原始表現不一定相同。',
        ],
      },
      {
        heading: 'T 分數是跟誰比：班級、全校還是全國',
        paragraphs: [
          '平均數 50、標準差 10 只在「算 M 和 SD 的那一群人」之內成立。美國國家教育統計中心（NCES）在 ECLS-K 幼兒追蹤研究的報告裡寫明，閱讀與數學的 T 分數是設計成「當完整樣本的所有分數都納入分析時」平均 50、標準差 10；但該報告只分析其中一部分兒童（例如只含準時升上一年級、三次都以英語施測的孩子），所以報告中幼稚園春季與一年級春季的平均 T 分數是 51，不是 50。同一套 T 分數，換一群人算平均，平均就不再是 50。',
          '放到班級上：用全班成績算出來的 T 分數，只說明這位同學在這個班級裡的位置，不能寫成「全校第幾名的水準」或「全縣市的位置」；沒有全校或全縣市的平均與標準差，就沒有那個尺度。只有一個原始分數、卻沒有同一群體的平均與標準差時，也無法憑空補出 T 分數。班級人數很少時，平均與標準差本身就不穩定，T 分數只適合當參考。',
          '教師甄試的成績單是否使用 T 分數、怎麼換算，各縣市與各年度的簡章不同，請以當年度簡章為準。',
        ],
        link: {
          prefix: '教甄成績的配分加權與簡章原文摘錄，見',
          label: '教師甄試成績計算器',
          href: '/tools/teacher-exam-score-converter/',
          suffix: '。',
        },
      },
      {
        heading: 'T 分數換 PR 百分等級對照表（常態假設）',
        paragraphs: [
          '如果成績分配接近常態，或 T 分數本來就是常態化轉換得到的，就可以用標準常態分配把 T 換成百分等級：PR＝100×Φ(z)，Φ 是標準常態累積機率。下表由本頁工具使用的同一支程式算出；《教育大辭書》也舉例 T 分數 60 約對應百分等級 84，與表中 T＝60 的 84.13 一致。',
          '這張表只有在常態假設下才成立。如果班上成績明顯偏斜或集中在某一端，不能直接查表當 PR；此時應回到名次或人數，用中點法計算 PR。',
        ],
        table: {
          caption: 'T 分數與近似 PR（常態假設，PR 取到小數第 2 位）',
          headers: ['T 分數', 'Z 分數', '近似 PR'],
          rows: prTableRows,
          note: '成績單上的 PR 是否四捨五入、最高最低顯示多少，依各測驗或學校的成績單說明。',
        },
        link: {
          prefix: '已知名次與人數、想直接算 PR，請用',
          label: 'PR 百分等級計算器',
          href: '/tools/percentile-rank-calculator/',
          suffix: '。',
        },
      },
      {
        heading: 'Excel 怎麼算 T 分數',
        paragraphs: [
          '假設全班分數放在 A2:A41，要換算的那一位在 A2，平均數放在 D1、標準差放在 D2。下面的公式已用 LibreOffice Calc 實際執行驗算（函數名稱與 Excel 相同），結果與本頁工具一致。',
        ],
        snippets: [
          { label: '平均數（填入 D1）', code: '=AVERAGE(A2:A41)' },
          { label: '標準差：全班就是完整參照群體（填入 D2）', code: '=STDEV.P(A2:A41)' },
          { label: '標準差：把這批成績當作抽樣（填入 D2）', code: '=STDEV.S(A2:A41)' },
          { label: 'Z 分數', code: '=STANDARDIZE(A2,$D$1,$D$2)' },
          { label: 'T 分數', code: '=50+10*STANDARDIZE(A2,$D$1,$D$2)' },
          { label: 'T 分數（不用 STANDARDIZE）', code: '=50+10*(A2-$D$1)/$D$2' },
          { label: '常態假設下的近似 PR（T 分數在 B2）', code: '=NORM.S.DIST((B2-50)/10,TRUE)*100' },
        ],
        items: [
          '標準差選哪一種會改變 T：以 10 位同學的分數 52、58、61、65、68、70、72、75、80、89 為例（平均 69），要換算 80 分。用 STDEV.P＝10.2859，T＝60.69；用 STDEV.S＝10.8423，T＝60.15，差約 0.5 個 T 分。',
          'Microsoft 的說明指出：STDEV.P 假設引數是整個母體，STDEV.S 假設引數是母體的樣本（n−1 方法）。要用哪一個，請與你的成績報表或老師的說明一致，並在報告中寫明。',
        ],
        link: {
          prefix: '母體與樣本標準差的差別，可以用',
          label: '標準差計算器',
          href: '/tools/standard-deviation/',
          suffix: '輸入同一批分數對照。',
        },
      },
      {
        heading: 'T 分數要算到小數第幾位、什麼時候四捨五入',
        paragraphs: [
          '工具用完整精度先算 z，再算 T，最後才顯示：Z 分數顯示到小數第 3 位、T 分數顯示到小數第 2 位（結尾的 0 會省略），不是先把中間結果取整再算。順序很重要：以算例四的 B 考試為例，z＝0.6667，T＝56.67；若先把 z 四捨五入到一位小數 0.7，T 會變成 57，差了 0.33。再看 (82−60)÷15＝1.4667，先進位成 1.5 會得到 T＝65，完整計算是 64.67。',
          '成績單上的 T 分數是否取整數、怎麼進位，依各測驗或學校報表的說明；本頁工具只負責把顯示位數說清楚，不替任何單位決定進位規則。',
        ],
      },
      {
        heading: 'T 分數常見錯誤',
        paragraphs: [],
        items: [
          '把 T 分數當百分制：T＝62 不是 62 分。',
          '把 T 分數直接當成 PR：T＝60 在常態假設下的 PR 約 84，不是 60。',
          '平均數與標準差來自不同的團體或不同的考卷：結果沒有意義，M、SD 必須和 X 屬於同一個團體。',
          '標準差用錯版本：整個班級當作完整母體與當作抽樣，算出來的 T 會差一點，選一個並在報告寫明。',
          '標準差填 0 或負數：z 無法計算，工具會顯示錯誤；Excel 的 STANDARDIZE 在標準差小於等於 0 時也會傳回 #NUM!。',
          '對明顯偏斜的成績硬套上面的 PR 對照表。',
          '把班級算出的 T 分數說成全校、全縣市或全國的位置；M 與 SD 是哪一群人算的，T 就只代表那一群人。',
          '先把 z 取整再換算 T，結果會差零點幾分到更多（見上面的進位算例）。',
        ],
      },
    ],
    instructions: [
      '填入原始分數 X，以及同一團體的平均數 M 與標準差 SD。',
      '按下「計算 T 分數」，看 Z 分數、T 分數與常態假設下的近似 PR。',
      '已經有 Z 分數時，直接填在最後一格，上面三格會被忽略。',
      '正式報告請回到測驗手冊或成績單，確認採用的常模與換算方式。',
    ],
    examples: [
      '看自己的段考分數在全班的相對位置。',
      '比較兩科原始分數的相對位置（見算例二）。',
      '把已知的 Z 分數換成 T 分數。',
    ],
    formula: {
      expression: 'z＝(X−M)÷SD；T＝50＋10z；近似 PR＝100×Φ(z)（僅限常態假設）',
      explanation: 'X 是原始分數，M 是平均數，SD 是標準差，SD 必須大於 0。Φ 是標準常態累積機率。',
    },
    reportTip: '可寫成：「依班級平均 70、母體標準差 10 換算，該生國文 82 分的 T 分數為 62.0。」並寫明標準差用的是母體或樣本版本。',
    sources: [
      {
        label: '國家教育研究院《教育大辭書》：T分數（盧雪梅，2012 年 10 月）',
        href: 'https://pedia.cloud.edu.tw/Entry/Detail/?title=T%E5%88%86%E6%95%B8',
        note: `T 分數平均數 50、標準差 10；T 60 表示高於平均一個標準差；直線轉換與常態化轉換；T 60 約對應百分等級 84。${CHECKED}。`,
      },
      {
        label: 'NCES：ECLS-K 報告，閱讀與數學 T 分數的說明（Early Childhood Longitudinal Study, Kindergarten Class of 1998-99）',
        href: 'https://nces.ed.gov/pubs2002/kindergarten/21.asp?nav=4',
        note: `T 分數設計為完整樣本平均 50、標準差 10；報告只分析部分樣本時，平均 T 分數為 51。${CHECKED_NOW}。`,
      },
      {
        label: 'Microsoft 支援：STANDARDIZE 函數',
        href: 'https://support.microsoft.com/zh-tw/office/standardize-%E5%87%BD%E6%95%B8-81d66554-2d54-40ec-ba83-6437108ee775',
        note: `語法 STANDARDIZE(x, mean, standard_dev)；standard_dev 小於等於 0 傳回 #NUM!。${CHECKED}。`,
      },
      {
        label: 'Microsoft 支援：NORM.S.DIST 函數',
        href: 'https://support.microsoft.com/zh-tw/office/norm-s-dist-%E5%87%BD%E6%95%B8-1e787282-3832-4520-a9ae-bd2a8d99ba88',
        note: `標準常態分配，cumulative 為 TRUE 時傳回累加分配函數。${CHECKED}。`,
      },
      {
        label: 'Microsoft 支援：STDEV.P 函數',
        href: 'https://support.microsoft.com/zh-tw/office/stdev-p-%E5%87%BD%E6%95%B8-6e917c05-31a0-496f-ade7-4f4e7462f285',
        note: `假設引數為整個母體，採 n 方法。${CHECKED}。`,
      },
      {
        label: 'Microsoft 支援：STDEV.S 函數',
        href: 'https://support.microsoft.com/zh-tw/office/stdev-s-%E5%87%BD%E6%95%B8-7d69cf97-0c1f-4acf-be27-f3e83904cc23',
        note: `假設引數為母體的樣本，採 n−1 方法。${CHECKED}。`,
      },
    ],
    faq: [
      { q: 'T 分數怎麼算？', a: '先算 z＝(原始分數−平均數)÷標準差，再算 T＝50＋10×z。例如 82 分、平均 70、標準差 10，z＝1.2，T＝62。' },
      { q: 'T 分數 50 是什麼意思？', a: 'T＝50 代表 z＝0，剛好等於這個團體的平均。' },
      { q: 'T 分數可以換成排名或 PR 嗎？', a: '在成績接近常態分配的假設下可以，見上方對照表；否則要回到名次或人數另外計算。' },
      { q: '沒有平均數和標準差也能算 T 分數嗎？', a: '不行。原始分數必須搭配同一團體的平均數與標準差才能換算；若手上已經有 Z 分數則可直接使用。' },
    ],
    labels: {
      score: '原始分數（X）',
      mean: '平均數（M）',
      sd: '標準差（SD）',
      z: '已有 Z 分數？填這格（選填，填了會忽略上面三格）',
      calculate: '計算 T 分數',
      result: 'T 分數',
      zEquivalent: 'Z 分數',
      approxPr: '近似 PR（僅限常態假設）',
      relativePosition: '相對位置',
      aboveMean: '高於平均',
      belowMean: '低於平均',
      atMean: '等於平均',
      invalid: '請輸入有效數字，且標準差必須大於 0；若填了 Z 分數欄，它必須是有效數字。',
    },
    disclaimer: '本工具供教學與初步估算，不取代正式統計軟體或專業判斷。正式成績或測驗報告請以測驗手冊、成績單或主辦單位公告為準。',
    privacyNote: '所有輸入與計算都在你的瀏覽器內完成，不會上傳到 FunnyTools。',
  },
  en: {
    name: 'T Score Calculator',
    short: 'Enter a raw score, mean and standard deviation to get the z score, the T score (T = 50 + 10z) and an approximate percentile rank under a normality assumption.',
    long: 'The defaults are the first worked example below: a score of 82 with class mean 70 and SD 10 gives z = 1.2 and T = 62. If you already have a z score, type it in the last box.',
    seoTitle: 'T Score Calculator | T = 50 + 10z, T to PR Table',
    seoDescription: 'T score calculator: enter raw score, mean and SD to get T = 50 + 10z, with how to read it, a T-to-percentile table and Excel formulas.',
    keywords: ['t score calculator', 't score formula', 'z to t score', 't score to percentile', 't score excel'],
    contentSections: [
      {
        heading: 'What a T score is',
        paragraphs: [
          'A T score is a standard score: the raw score is first expressed as the number of standard deviations above or below the group mean, then placed on a scale with mean 50 and SD 10. The Taiwan National Academy for Educational Research encyclopedia entry says the T-score distribution has a mean of 50 and an SD of 10, so T = 60 is one SD above the mean.',
          'It describes position within a group, not percent correct. The same raw score gives a different T score in a different class or on a different test.',
        ],
      },
      {
        heading: 'How to calculate a T score',
        paragraphs: ['Two steps: z = (X − M) / SD, then T = 50 + 10 × z. M and SD must come from the same group and the same test as X. The class numbers below are made-up illustrations.'],
        items: [
          'Example 1 (tool default): class mean 70, SD 10, score 82. z = (82 − 70) / 10 = 1.2; T = 50 + 10 × 1.2 = 62.',
          'Example 2 (two subjects): math 68 (class mean 52, SD 16) gives z = 1, T = 60; English 85 (class mean 80, SD 10) gives z = 0.5, T = 55. English has the higher raw score, but math is the stronger relative position.',
          'Example 3 (below average): 55 with mean 62 and SD 8 gives z = −0.875 and T = 41.25.',
          'Reverse: to reach T = 60 when the mean is 70 and SD is 10, you need X = 70 + 10 × (60 − 50) / 10 = 80.',
        ],
        link: { prefix: 'To look at z scores on their own, use the ', label: 'Z score calculator', href: '/tools/z-score-calculator/', suffix: '.' },
      },
      {
        heading: 'How to read a T score',
        paragraphs: ['Treat 50 as the average; every 10 points is one standard deviation.'],
        items: [
          'T = 50 means z = 0, exactly the group mean.',
          'T = 60 or 40 is one SD above or below the mean; T = 70 or 30 is two.',
          'A T score is not a percentage score or percent correct.',
          'Whether a higher T is better depends on how the test defines its scale.',
        ],
      },
      {
        heading: 'T score to percentile rank (normal assumption)',
        paragraphs: [
          'If scores are close to normal, or the T score was produced by a normalized conversion, PR ≈ 100 × Φ(z). The table is generated with the same function as the calculator. The encyclopedia entry also gives T = 60 as roughly percentile rank 84, consistent with 84.13 below.',
          'The table only holds under that assumption. For skewed class scores, compute PR from counts instead.',
        ],
        table: {
          caption: 'T score and approximate PR (normal assumption)',
          headers: ['T score', 'z', 'Approx. PR'],
          rows: prTableRows,
        },
        link: { prefix: 'To compute PR from counts, use the ', label: 'percentile rank calculator', href: '/tools/percentile-rank-calculator/', suffix: '.' },
      },
      {
        heading: 'T score in Excel',
        paragraphs: ['Assume scores in A2:A41, the score to convert in A2, the mean in D1 and the SD in D2.'],
        snippets: [
          { label: 'Mean (D1)', code: '=AVERAGE(A2:A41)' },
          { label: 'SD, whole group (D2)', code: '=STDEV.P(A2:A41)' },
          { label: 'SD, sample (D2)', code: '=STDEV.S(A2:A41)' },
          { label: 'T score', code: '=50+10*STANDARDIZE(A2,$D$1,$D$2)' },
          { label: 'Approximate PR (T in B2)', code: '=NORM.S.DIST((B2-50)/10,TRUE)*100' },
        ],
        link: { prefix: 'Compare population and sample SD with the ', label: 'standard deviation calculator', href: '/tools/standard-deviation/', suffix: '.' },
      },
    ],
    instructions: [
      'Enter the raw score X and the mean M and SD of the same group.',
      'Press Calculate to see z, T and the approximate PR.',
      'If you already have a z score, type it in the last box; the first three boxes are then ignored.',
    ],
    examples: [
      'See where a test score sits within a class.',
      'Compare relative standing across two subjects.',
      'Convert a known z score to a T score.',
    ],
    formula: {
      expression: 'z = (X − M) / SD; T = 50 + 10z; approx. PR = 100 × Φ(z) (normal assumption only)',
      explanation: 'X is the raw score, M the mean, SD the standard deviation (greater than 0). Φ is the standard normal cumulative probability.',
    },
    reportTip: 'Example: “Using a class mean of 70 and a population SD of 10, the student’s score of 82 corresponds to T = 62.0.” State whether the SD is the population or sample version.',
    sources: [
      {
        label: 'NAER Educational Encyclopedia: T-score (in Chinese)',
        href: 'https://pedia.cloud.edu.tw/Entry/Detail/?title=T%E5%88%86%E6%95%B8',
        note: 'Mean 50, SD 10; linear versus normalized conversion; T = 60 is about percentile rank 84. Checked 2026-10-16.',
      },
      {
        label: 'Microsoft Support: STANDARDIZE function',
        href: 'https://support.microsoft.com/zh-tw/office/standardize-%E5%87%BD%E6%95%B8-81d66554-2d54-40ec-ba83-6437108ee775',
        note: 'STANDARDIZE(x, mean, standard_dev). Checked 2026-10-16.',
      },
      {
        label: 'Microsoft Support: NORM.S.DIST function',
        href: 'https://support.microsoft.com/zh-tw/office/norm-s-dist-%E5%87%BD%E6%95%B8-1e787282-3832-4520-a9ae-bd2a8d99ba88',
        note: 'Standard normal distribution; cumulative = TRUE. Checked 2026-10-16.',
      },
    ],
    faq: [
      { q: 'How do I calculate a T score?', a: 'z = (X − mean) / SD, then T = 50 + 10z. For 82, mean 70 and SD 10, z = 1.2 and T = 62.' },
      { q: 'What does T = 50 mean?', a: 'z = 0: exactly the group mean.' },
      { q: 'Can I convert T to a percentile rank?', a: 'Under a normality assumption, yes (see the table); otherwise compute it from counts.' },
    ],
    labels: {
      score: 'Raw score (X)',
      mean: 'Mean (M)',
      sd: 'Standard deviation (SD)',
      z: 'Already have a z score? Enter it here (optional; overrides the three boxes above)',
      calculate: 'Calculate T score',
      result: 'T score',
      zEquivalent: 'Z score',
      approxPr: 'Approx. PR (normal assumption only)',
      relativePosition: 'Position',
      aboveMean: 'Above the mean',
      belowMean: 'Below the mean',
      atMean: 'At the mean',
      invalid: 'Enter valid numbers with SD greater than 0; if the z box is filled it must be a valid number.',
    },
    disclaimer: 'For teaching and preliminary estimates. For formal scores follow the test manual, score report or the organiser’s notice.',
    privacyNote: 'All input and calculation stays in your browser and is not uploaded to FunnyTools.',
  },
} satisfies Record<Locale, ToolContent>;
