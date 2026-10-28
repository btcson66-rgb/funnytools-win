import type { Locale } from '../../config/site';
import type { ToolContent } from './_types';

const CHECKED = '查核日期 2026-10-17';

// All numbers in the worked examples are produced by independentTTest() in src/lib/educationStats.ts,
// the same function the calculator runs; tests/p2-core-pages.test.mjs re-derives them and compares the
// function with SciPy, NIST (AUTO83B) and the published R output for the sleep data.

export default {
  zh: {
    name: '獨立樣本 t 檢定計算器',
    short: '輸入兩組的人數、平均數與標準差，算出 t、自由度、p 值、95% 信賴區間與效果量，可選 Welch 或 Student（合併變異數）。',
    long: '預設值是第一個算例：A 班 30 人、平均 78.4、標準差 8.2，B 班 32 人、平均 73.1、標準差 9.5。按下計算會得到 Welch t(59.61) = 2.36、p = .022，並附可貼進報告的 APA 統計式。',
    seoTitle: '獨立樣本t檢定怎麼算？Welch與Student、p值與APA寫法',
    seoDescription: '獨立樣本t檢定計算器：輸入兩組人數、平均、標準差，算出t、自由度、p值與信賴區間。說明Welch與Student差在哪、APA怎麼寫、Excel T.TEST怎麼用。',
    keywords: ['獨立樣本t檢定', 't檢定怎麼算', 't檢定 excel', 'Welch t test', 'Student t test', 't檢定 APA', 't檢定 自由度', 'T.TEST'],
    contentSections: [
      {
        heading: '獨立樣本 t 檢定是什麼',
        paragraphs: [
          '獨立樣本 t 檢定比較兩個互相獨立群體的平均數有沒有差異，例如兩個班用不同教法的期末成績。虛無假設是兩個母體平均數相等（H0：μ1＝μ2），雙尾檢定的對立假設是不相等。NIST《工程統計手冊》的 Two-Sample t-Test for Equal Means 就是這個檢定。',
          '它只需要每組的人數 n、平均數 M 和樣本標準差 SD（除以 n−1 的那一個）。同一批人的前後測、配對的兩組資料不是獨立樣本，要用配對 t 檢定；R 的說明文件就特別註明內建的 sleep 資料其實是配對資料。',
        ],
        items: [
          '快速選法（Welch vs. Student）：實務與心理教育統計文獻（Delacre et al., 2017）建議預設使用 Welch t 檢定（不假設兩組變異數相等，Excel T.TEST 的 type＝3）；僅在教科書題目或期刊明確指定合併變異數時改選 Student t 檢定（df＝n1＋n2−2，Excel T.TEST 的 type＝2）。',
          '顯著性與 APA 7 報告判準：雙尾 p < .05（等價於平均差的 95% 信賴區間不包含 0）代表兩組平均差異達 5% 統計顯著；APA 7 格式應同時列出兩組 M、SD 與 n，並寫明檢定法與自由度，如 Welch t(59.61) ＝ 2.36，p ＝ .022，95% CI [0.80, 9.80]，g ＝ 0.59。',
        ],
      },
      {
        heading: '獨立樣本 t 檢定怎麼算：兩個完整算例',
        paragraphs: [
          '以下兩組班級數字是為了示範算法而設定的假設數字，可以直接填進工具重現。',
        ],
        items: [
          '算例一（工具預設值，Welch）：A 班 n＝30、M＝78.4、SD＝8.2；B 班 n＝32、M＝73.1、SD＝9.5。平均差＝78.4−73.1＝5.3。SD²÷n：8.2²÷30＝2.2413，9.5²÷32＝2.8203，相加 5.0616，開根號得標準誤 SE＝2.2498。t＝5.3÷2.2498＝2.356。自由度 df＝5.0616²÷(2.2413²÷29＋2.8203²÷31)＝25.620÷0.4298＝59.61。雙尾 p＝.0218，95% 信賴區間＝5.3±2.0006×2.2498＝[0.80, 9.80]，Hedges’ g＝0.59。',
          '同一組數字改選 Student（合併變異數）：合併標準差 8.895，SE＝2.2606，t＝2.344，df＝60，p＝.0224。兩種算法差很小，因為兩組人數與標準差都很接近。',
          '算例二（人數與標準差都差很多）：新教材班 n＝12、M＝75、SD＝15；舊教材班 n＝48、M＝68、SD＝6。平均差 7。Welch：SE＝√(225÷12＋36÷48)＝√19.5＝4.416，t＝1.585，df＝11.89，p＝.139，信賴區間 [−2.63, 16.63]。Student：合併變異數 4167÷58＝71.84，SE＝2.736，t＝2.559，df＝58，p＝.013，信賴區間 [1.52, 12.48]。同一筆資料，一個不顯著、一個顯著，結論相反。',
        ],
        link: {
          prefix: '還沒算出每組的平均與標準差，可以先用',
          label: '標準差計算器',
          href: '/tools/standard-deviation/',
          suffix: '，記得選樣本標準差（STDEV.S）。',
        },
      },
      {
        heading: 'Student 與 Welch 差在哪',
        paragraphs: [
          'Student t 檢定假設兩組變異數相等，把兩組變異數合併成一個；Welch t 檢定不做這個假設，各用各的變異數。兩者的 t 公式分母不同，自由度也不同。',
        ],
        table: {
          caption: 'Student（合併變異數）與 Welch 的比較',
          headers: ['項目', 'Student（合併變異數）', 'Welch'],
          rows: [
            ['變異數假設', '兩組相等', '不要求相等'],
            ['標準誤', 'sp×√(1/n1＋1/n2)，sp²＝[(n1−1)s1²＋(n2−1)s2²]÷(n1＋n2−2)', '√(s1²÷n1＋s2²÷n2)'],
            ['自由度', 'n1＋n2−2（整數）', 'Welch–Satterthwaite 公式，通常是小數'],
            ['Excel T.TEST 的 type', '2', '3'],
            ['算例一的結果', 't(60)＝2.34，p＝.022', 't(59.61)＝2.36，p＝.022'],
            ['算例二的結果', 't(58)＝2.56，p＝.013', 't(11.89)＝1.59，p＝.139'],
          ],
          note: '公式依 NIST/SEMATECH e-Handbook 1.3.5.3；算例由本頁工具使用的同一個函式算出。',
        },
        items: [
          'Welch 的自由度一定介於 min(n1−1, n2−1) 與 n1＋n2−2 之間：兩組人數、變異數都相同時等於 n1＋n2−2，差距越大自由度越小。算例二從 58 降到 11.89。',
          '怎麼選：Delacre、Lakens 與 Leys（2017）在《International Review of Social Psychology》主張應把 Welch t 檢定當作預設策略；他們也指出，先用變異數同質性檢定決定要用哪一種，往往無法得到適當的答案。',
          '老師或期刊指定用 Student 時照做；工具上方的選單可以切換，預設是 Welch。',
        ],
      },
      {
        heading: '自由度與 p 值怎麼看',
        paragraphs: [
          'p 值是在虛無假設為真時，出現至少這麼極端的 t 值的機率；本頁是雙尾。Microsoft 的 T.TEST 說明也寫明，tails＝2 傳回的值是 tails＝1 的兩倍。p < .05 只代表差異在 5% 水準下顯著，不代表差異很大；差異大小要看平均差、信賴區間與效果量。',
          '信賴區間與 p 值是一致的：95% 信賴區間不含 0，雙尾 p 就小於 .05。算例一的區間 [0.80, 9.80] 不含 0，p＝.022；算例二 Welch 的 [−2.63, 16.63] 含 0，p＝.139。',
          '效果量 Hedges’ g 是平均差除以合併標準差，再乘小樣本校正係數；算例一 g＝0.59。是否算「大」要看研究領域與比較對象，本頁不套用固定門檻。',
        ],
      },
      {
        heading: '獨立樣本 t 檢定 APA 寫法',
        paragraphs: [
          'APA 的數字與統計速查表（2024 年版）有這幾條可以直接套用：t 這類推論統計量取到小數 2 位；p 值寫精確值到小數 2 或 3 位，小於 .001 就寫成「p < .001」；p 不能大於 1，所以前面不加 0（p ＝ .022）；t、p、M、SD 等統計符號用斜體；t、df、p、M、SD 不需要另外定義；自由度不用逗號。速查表沒有規定 Welch 自由度要寫幾位小數，本頁寫 2 位，請依老師或期刊要求調整。',
          '用算例一的輸出，可以寫成：「A 班（M ＝ 78.4，SD ＝ 8.2，n ＝ 30）的期末成績高於 B 班（M ＝ 73.1，SD ＝ 9.5，n ＝ 32），Welch t(59.61) ＝ 2.36，p ＝ .022，95% CI [0.80, 9.80]，g ＝ 0.59。」工具的結果區已經附一行可以貼上的統計式。',
        ],
        items: [
          '同時報告兩組的平均數、標準差與人數，讀者才能自己核對。',
          '寫明用的是 Welch 還是 Student；沒有特別說明時，讀者會不知道自由度怎麼來的。',
          '信賴區間與效果量是否必填，依老師或期刊的規定。',
        ],
        link: {
          prefix: '要把其他統計量也整理成 APA 句子，用',
          label: 'APA 7 統計結果報告產生器',
          href: '/tools/apa-7-report-generator/',
          suffix: '。',
        },
      },
      {
        heading: 'Excel 怎麼做獨立樣本 t 檢定（T.TEST）',
        paragraphs: [
          'T.TEST(array1, array2, tails, type) 直接傳回 p 值。Microsoft 說明：tails＝1 是單尾、2 是雙尾；type＝1 配對、2 兩樣本變異數相同、3 兩樣本變異數不同。獨立樣本請用 type 2 或 3，不要用 1。T.TEST 只傳回 p 值，不傳回 t 與自由度，要自己算。',
          '範例資料：A 組 8 人放在 A2:A9（72、75、80、68、77、83、79、74），B 組 9 人放在 B2:B10（65、70、72、68、74、66、71、69、73）。下面的公式已用 LibreOffice Calc 實際執行驗算（函數名稱與 Excel 相同），結果與 SciPy 一致：A 組 M＝76.00、SD＝4.78，B 組 M＝69.78、SD＝3.07；Welch t(11.70)＝3.15，p＝.0086；Student t(15)＝3.23，p＝.0056。',
        ],
        snippets: [
          { label: 'Welch 雙尾 p 值 → 0.008642', code: '=T.TEST(A2:A9,B2:B10,2,3)' },
          { label: 'Student 雙尾 p 值 → 0.005593', code: '=T.TEST(A2:A9,B2:B10,2,2)' },
          { label: '平均差 → 6.2222', code: '=AVERAGE(A2:A9)-AVERAGE(B2:B10)' },
          { label: 'Welch 標準誤 → 1.9765', code: '=SQRT(VAR.S(A2:A9)/COUNT(A2:A9)+VAR.S(B2:B10)/COUNT(B2:B10))' },
          { label: 'Welch t（平均差÷標準誤，假設平均差在 D3、標準誤在 D4）→ 3.1481', code: '=D3/D4' },
          { label: 'Welch 自由度 → 11.7047', code: '=(VAR.S(A2:A9)/COUNT(A2:A9)+VAR.S(B2:B10)/COUNT(B2:B10))^2/((VAR.S(A2:A9)/COUNT(A2:A9))^2/(COUNT(A2:A9)-1)+(VAR.S(B2:B10)/COUNT(B2:B10))^2/(COUNT(B2:B10)-1))' },
        ],
        items: [
          '小心自由度取整：Microsoft 的 T.INV.2T 說明寫明非整數自由度會被取整數，T.DIST.2T 也只寫整數。本例用 T.DIST.2T(3.1481, 11.7047) 在 LibreOffice 得到 .0093，與精確的 .0086 不同；所以要 p 值就用 T.TEST，信賴區間臨界值若用 T.INV.2T 也會略有誤差，請用本工具的區間。',
          'type＝1 要求兩組資料點數相同並一一配對；人數不同時 Microsoft 說明指出會傳回 #N/A。',
        ],
      },
      {
        heading: '用公開資料核對本工具',
        paragraphs: [
          '下面的公開結果是用本頁工具使用的同一個函式重算的，數字與公開值一致：',
        ],
        table: {
          caption: '本工具與公開結果的對照',
          headers: ['資料', '輸入', '公開結果', '本工具'],
          rows: [
            ['NIST 手冊 AUTO83B（美國車與日本車的每加侖英里數，Student）', 'n＝249，M＝20.14458，SD＝6.41470；n＝79，M＝30.48101，SD＝6.10771', 'T＝−12.62059，sp＝6.34260，df＝326，臨界值 1.9673', 'T＝−12.6206，sp＝6.3426，df＝326，臨界值 1.9673'],
            ['R 內建 sleep 資料（Welch）', 'n＝10，M＝0.75，SD＝1.789；n＝10，M＝2.33，SD＝2.002（SD 四捨五入到小數 3 位）', 't＝−1.8608，df＝17.776，p＝0.07939，95% CI [−3.3654832, 0.2054832]', '填入上列四捨五入後的 SD：t＝−1.861，df＝17.78，p＝.0794；用 20 筆原始資料算出的未四捨五入 SD，則與公開值完全相同（t＝−1.8608，df＝17.776，p＝.07939，CI [−3.3655, 0.2055]）'],
          ],
          note: 'sleep 是配對資料，這裡只用來核對數值，不是獨立樣本的好例子。同一資料改選 Student：t 相同、df＝18、p＝.0792。',
        },
      },
      {
        heading: '獨立樣本 t 檢定常見錯誤',
        paragraphs: [],
        items: [
          '把配對資料（同一批人的前後測）當成獨立樣本：要用配對 t 檢定。',
          '輸入母體標準差、標準誤或變異數：工具要的是每組的樣本標準差（除以 n−1）。',
          '先做變異數同質性檢定再決定用哪一種：Delacre 等人建議直接用 Welch。',
          '三組以上平均數比較，不能用 t 檢定兩兩比較了事，需要變異數分析。',
          '只看 p 值：p 小不代表差異大，還要看平均差、信賴區間與效果量。',
          '小樣本且分數明顯偏斜或有極端值時，t 檢定的結果要保守看待。',
        ],
        link: {
          prefix: '已有 SPSS 輸出要看懂，用',
          label: 'SPSS 結果解讀助手',
          href: '/tools/spss-result-interpreter/',
          suffix: '。',
        },
      },
    ],
    instructions: [
      '輸入兩組各自的人數 n、平均數 M 與樣本標準差 SD。',
      '選擇 Welch（預設，不假設變異數相等）或 Student（合併變異數）。',
      '按下計算，看 t、自由度、p 值、信賴區間與效果量，最後一格是可貼進報告的 APA 統計式。',
    ],
    examples: [
      '比較兩個班用不同教法的期末成績（預設值）。',
      '新教材班與舊教材班人數、標準差差很多時，比較 Welch 與 Student 的差別。',
      '用摘要統計量核對 SPSS 或 Excel 的輸出。',
    ],
    formula: {
      expression: 'Welch：t＝(M1−M2)÷√(s1²÷n1＋s2²÷n2)；Student：t＝(M1−M2)÷[sp×√(1÷n1＋1÷n2)]',
      explanation: 'Welch 自由度＝(s1²÷n1＋s2²÷n2)²÷[(s1²÷n1)²÷(n1−1)＋(s2²÷n2)²÷(n2−1)]；Student 自由度＝n1＋n2−2。s1、s2 是樣本標準差，p 值由 t 分配計算（雙尾）。',
    },
    educationApplication: '適合比較兩個互相獨立群體的平均數。使用前確認觀察值彼此獨立，並檢查離群值與分配形狀；統計顯著不等於教育上的實質重要。',
    reportTip: 'APA 範例：「A 班（M ＝ 78.4，SD ＝ 8.2）高於 B 班（M ＝ 73.1，SD ＝ 9.5），Welch t(59.61) ＝ 2.36，p ＝ .022，95% CI [0.80, 9.80]，g ＝ 0.59。」統計符號用斜體；是否附信賴區間與效果量依老師或期刊規定。',
    notes: [
      '兩組人數須為大於 1 的整數，標準差須大於 0。',
      '工具的信賴區間是平均差（M1−M2）的 95% 信賴區間，用該方法自己的自由度計算。',
    ],
    sources: [
      {
        label: 'NIST/SEMATECH e-Handbook 1.3.5.3：Two-Sample t-Test for Equal Means',
        href: 'https://itl.nist.gov/div898/handbook/eda/section3/eda353.htm',
        note: `合併與 Welch 兩種 t 統計量、Welch–Satterthwaite 自由度、AUTO83B 範例（T＝−12.62059，df＝326）。${CHECKED}。`,
      },
      {
        label: 'Delacre, Lakens & Leys (2017), Why Psychologists Should by Default Use Welch’s t-test Instead of Student’s t-test, International Review of Social Psychology 30(1), 92–101',
        href: 'https://www.rips-irsp.com/articles/10.5334/irsp.82',
        note: `摘要：主張 Welch t 檢定應作為預設策略，先檢定變異數是否相等再選方法往往無法提供適當的答案。${CHECKED}。`,
      },
      {
        label: 'APA Style：Numbers and Statistics Guide（7th edition，2024 年 9 月更新）',
        href: 'https://apastyle.apa.org/instructional-aids/numbers-statistics-guide.pdf',
        note: `推論統計量取 2 位小數、p 值寫精確值或 p < .001、p 不加前導 0、統計符號用斜體、t 與 df 等不需定義。${CHECKED}。`,
      },
      {
        label: 'Microsoft 支援：T.TEST 函數',
        href: 'https://support.microsoft.com/zh-tw/office/t-test-%E5%87%BD%E6%95%B8-d4e08ec3-c545-485f-962e-276f7cbed055',
        note: `tails 與 type 引數（type 2 變異數相同、3 變異數不同）、tails＝2 傳回 tails＝1 的兩倍。${CHECKED}。`,
      },
      {
        label: 'Microsoft 支援：T.INV.2T 函數',
        href: 'https://support.microsoft.com/zh-tw/office/t-inv-2t-%E5%87%BD%E6%95%B8-ce72ea19-ec6c-4be7-bed2-b9baf2264f17',
        note: `deg_freedom 不是整數時會取整數。${CHECKED}。`,
      },
      {
        label: 'Microsoft 支援：T.DIST.2T 函數',
        href: 'https://support.microsoft.com/zh-tw/office/t-dist-2t-%E5%87%BD%E6%95%B8-198e9340-e360-4230-bd21-f52f22ff5c28',
        note: `deg_freedom 為整數值。${CHECKED}。`,
      },
      {
        label: 'R 文件：t.test（stats 套件）',
        href: 'https://stat.ethz.ch/R-manual/R-devel/library/stats/html/t.test.html',
        note: `var.equal 預設為 FALSE，使用 Welch 近似自由度。${CHECKED}。`,
      },
      {
        label: 'R 文件：sleep 資料集',
        href: 'https://stat.ethz.ch/R-manual/R-devel/library/datasets/html/sleep.html',
        note: `資料來源為 Student（1908），說明文件範例指出該資料其實是配對資料。${CHECKED}。`,
      },
      {
        label: 'Bioconductor 課程教材：R 對 sleep 資料執行 Welch t 檢定的輸出',
        href: 'https://bioconductor.org/help/course-materials/2015/Uruguay2015/S2-RNASeq-Experimental-Design.html',
        note: `t＝−1.8608，df＝17.776，p＝0.07939，95% CI −3.3654832 至 0.2054832。${CHECKED}。`,
      },
    ],
    faq: [
      { q: '獨立樣本 t 檢定怎麼算？', a: '先算平均差與標準誤，t＝平均差÷標準誤，再用自由度對照 t 分配得到 p 值。例如 A 班 78.4、B 班 73.1、標準誤 2.25，t＝2.36。' },
      { q: 'Welch 和 Student t 檢定差在哪？', a: 'Student 假設兩組變異數相等並合併，自由度是 n1＋n2−2；Welch 不做這個假設，自由度通常是小數。兩組人數與標準差差很多時結論可能不同，本頁算例二 p 值分別是 .013 與 .139。' },
      { q: 'Excel 的 T.TEST 要選哪個 type？', a: '獨立樣本選 2（變異數相同）或 3（變異數不同，即 Welch）；1 是配對。T.TEST 只傳回 p 值。' },
      { q: '獨立樣本 t 檢定的 APA 要怎麼寫？', a: '例如「Welch t(59.61) ＝ 2.36，p ＝ .022」：t 取 2 位小數，p 寫精確值，小於 .001 寫成 p < .001，統計符號用斜體。' },
      { q: '自由度為什麼有小數？', a: 'Welch 方法的自由度由兩組的變異數與人數估計，不是整數；它一定介於 min(n1−1, n2−1) 與 n1＋n2−2 之間。' },
    ],
    labels: {
      group1: '第一組',
      group2: '第二組',
      n: '樣本數（N）',
      mean: '平均數（M）',
      sd: '樣本標準差（SD）',
      method: '檢定方法',
      methodWelch: 'Welch t 檢定（預設，不假設變異數相等）',
      methodStudent: 'Student t 檢定（合併變異數）',
      calculate: '計算 t 檢定',
      difference: '平均差（M₁ − M₂）',
      result: 't 值',
      df: '自由度（df）',
      p: '雙尾 p 值',
      standardError: '標準誤（SE）',
      confidenceInterval: '95% 信賴區間',
      hedgesG: 'Hedges’ g（效果量）',
      apaLine: 'APA 統計式（可貼進報告，符號請改斜體）',
      invalid: '兩組樣本數須為大於 1 的整數，標準差須大於 0，其他欄位須為有效數字。',
    },
    disclaimer: '本工具供教學與初步估算，不取代正式統計軟體或專業判斷。使用結果撰寫研究報告前，請確認資料、研究設計與分析假設。',
    privacyNote: '所有輸入與計算都在你的瀏覽器內完成，不會上傳到 FunnyTools。',
  },
  en: {
    name: 'Independent Samples t-test Calculator',
    short: 'Enter n, mean and SD for two independent groups to get t, degrees of freedom, p, a 95% CI and an effect size, with a choice of Welch or Student (pooled variance).',
    long: 'The defaults are the first worked example: class A n = 30, M = 78.4, SD = 8.2 against class B n = 32, M = 73.1, SD = 9.5. Calculate gives Welch t(59.61) = 2.36, p = .022 and a ready-to-paste APA statistics line.',
    seoTitle: 'Independent Samples t-test Calculator | Welch vs Student, p Value, APA',
    seoDescription: 'Independent-samples t test from n, mean and SD: t, degrees of freedom, p value, confidence interval and effect size. Welch versus Student, APA reporting and Excel T.TEST.',
    keywords: ['independent samples t test calculator', 'Welch t test', 'Student t test', 't test APA', 'T.TEST Excel', 'two sample t test'],
    contentSections: [
      {
        heading: 'What an independent-samples t test does',
        paragraphs: ['It compares the means of two independent groups, for example the final scores of two classes taught differently. H0: μ1 = μ2; the two-tailed alternative is that they differ. Paired data (the same people measured twice) need a paired t test; R’s documentation notes that its sleep data set is actually paired.'],
        items: [
          'Quick decision rule (Welch vs. Student): Use Welch’s t-test by default (no equal-variance assumption, Excel T.TEST type = 3; Delacre et al., 2017). Switch to Student’s pooled-variance t-test (df = n1 + n2 − 2, Excel T.TEST type = 2) only when required by a textbook or journal.',
          'Significance & APA 7 rule: A two-tailed p < .05 (equivalently, a 95% CI for M1 − M2 that excludes 0) indicates a statistically significant difference at α = .05. Report both group means, SDs, sample sizes, and the exact test: e.g., Welch t(59.61) = 2.36, p = .022, 95% CI [0.80, 9.80], g = 0.59.',
        ],
      },
      {
        heading: 'Worked examples',
        paragraphs: ['The class numbers are made up for illustration; type them into the tool to reproduce them.'],
        items: [
          'Example 1 (default, Welch): n = 30, M = 78.4, SD = 8.2 versus n = 32, M = 73.1, SD = 9.5. Mean difference 5.3; SE = √(8.2² ÷ 30 + 9.5² ÷ 32) = √5.0616 = 2.2498; t = 2.356; df = 59.61; p = .0218; 95% CI [0.80, 9.80]; Hedges’ g = 0.59. With the pooled (Student) formula: SE 2.2606, t = 2.344, df = 60, p = .0224.',
          'Example 2 (very different n and SD): n = 12, M = 75, SD = 15 versus n = 48, M = 68, SD = 6. Welch: t(11.89) = 1.59, p = .139. Student: t(58) = 2.56, p = .013. The same data are non-significant under one method and significant under the other.',
        ],
        link: { prefix: 'To get each group’s mean and sample SD first, use the ', label: 'standard deviation calculator', href: '/tools/standard-deviation/', suffix: '.' },
      },
      {
        heading: 'Student versus Welch',
        paragraphs: ['Student pools the two variances and assumes they are equal, with df = n1 + n2 − 2. Welch keeps the variances separate and uses the Welch–Satterthwaite degrees of freedom, which are usually fractional and always between min(n1 − 1, n2 − 1) and n1 + n2 − 2. Delacre, Lakens and Leys (2017) argue that Welch’s t-test should be used as the default strategy and that choosing between the two with a test of equal variances often fails to give an appropriate answer. Use Student if your instructor or journal requires it; the menu above the tool switches the method.'],
      },
      {
        heading: 'APA reporting',
        paragraphs: ['The APA numbers and statistics guide asks for inferential statistics such as t to two decimals, exact p values to two or three decimals (p < .001 when smaller), no leading zero for p, italic statistical symbols, and no definition of t, df, p, M or SD. Example: “Class A (M = 78.4, SD = 8.2, n = 30) scored higher than class B (M = 73.1, SD = 9.5, n = 32), Welch t(59.61) = 2.36, p = .022, 95% CI [0.80, 9.80], g = 0.59.” The guide does not state how many decimals Welch df should have.'],
      },
      {
        heading: 'Excel: T.TEST',
        paragraphs: ['T.TEST(array1, array2, tails, type) returns the p value only: tails = 2 for two-tailed; type 1 paired, 2 equal variance, 3 unequal variance (Welch). With group A in A2:A9 and group B in B2:B10 (72, 75, 80, 68, 77, 83, 79, 74 and 65, 70, 72, 68, 74, 66, 71, 69, 73) LibreOffice Calc gives 0.008642 for type 3 and 0.005593 for type 2, matching SciPy. Microsoft documents that T.INV.2T truncates non-integer degrees of freedom, so do not feed Welch’s fractional df to T.DIST.2T for the p value.'],
        snippets: [
          { label: 'Welch two-tailed p', code: '=T.TEST(A2:A9,B2:B10,2,3)' },
          { label: 'Student two-tailed p', code: '=T.TEST(A2:A9,B2:B10,2,2)' },
        ],
      },
      {
        heading: 'Checked against published results',
        paragraphs: ['NIST handbook example AUTO83B (Student): n = 249, M = 20.14458, SD = 6.41470 versus n = 79, M = 30.48101, SD = 6.10771 gives T = −12.62059, sp = 6.34260, df = 326 in both the handbook and this tool. R’s sleep data with Welch (t = −1.8608, df = 17.776, p = 0.07939, 95% CI −3.3655 to 0.2055) is reproduced too; those data are paired, so this is only a numerical check.'],
      },
    ],
    instructions: [
      'Enter n, mean and sample SD for both groups.',
      'Choose Welch (default) or Student (pooled variance).',
      'Calculate to see t, df, p, CI and effect size; the last tile is a statistics line for your report.',
    ],
    examples: [
      'Compare final scores under two teaching methods (the default).',
      'See how Welch and Student differ when sample sizes and SDs are far apart.',
      'Check the output of SPSS or Excel from summary statistics.',
    ],
    formula: {
      expression: 'Welch: t = (M1 − M2) / √(s1²/n1 + s2²/n2); Student: t = (M1 − M2) / [sp × √(1/n1 + 1/n2)]',
      explanation: 'Welch df = (s1²/n1 + s2²/n2)² / [(s1²/n1)²/(n1 − 1) + (s2²/n2)²/(n2 − 1)]; Student df = n1 + n2 − 2. s1 and s2 are sample SDs; p is two-tailed.',
    },
    educationApplication: 'Use for means from two independent groups; check independence, outliers and distribution shape. Statistical significance is not the same as educational importance.',
    reportTip: 'APA example: “Class A (M = 78.4, SD = 8.2) scored higher than class B (M = 73.1, SD = 9.5), Welch t(59.61) = 2.36, p = .022, 95% CI [0.80, 9.80], g = 0.59.” Statistical symbols are italic.',
    sources: [
      {
        label: 'NIST/SEMATECH e-Handbook 1.3.5.3: Two-Sample t-Test for Equal Means',
        href: 'https://itl.nist.gov/div898/handbook/eda/section3/eda353.htm',
        note: 'Pooled and Welch statistics, Welch–Satterthwaite df, AUTO83B example. Checked 2026-10-17.',
      },
      {
        label: 'Delacre, Lakens & Leys (2017), International Review of Social Psychology 30(1), 92–101',
        href: 'https://www.rips-irsp.com/articles/10.5334/irsp.82',
        note: 'Welch’s t-test as the default strategy. Checked 2026-10-17.',
      },
      {
        label: 'APA Style: Numbers and Statistics Guide (7th edition)',
        href: 'https://apastyle.apa.org/instructional-aids/numbers-statistics-guide.pdf',
        note: 'Decimals, p values and italic symbols. Checked 2026-10-17.',
      },
      {
        label: 'Microsoft Support: T.TEST function (Traditional Chinese)',
        href: 'https://support.microsoft.com/zh-tw/office/t-test-%E5%87%BD%E6%95%B8-d4e08ec3-c545-485f-962e-276f7cbed055',
        note: 'tails and type arguments. Checked 2026-10-17.',
      },
    ],
    faq: [
      { q: 'What is the difference between Welch and Student?', a: 'Student pools the variances (df = n1 + n2 − 2); Welch does not assume equal variances and has fractional df. With very unequal n and SD the p values can differ a lot.' },
      { q: 'Which Excel T.TEST type should I use?', a: 'Type 2 for equal variance (Student), type 3 for unequal variance (Welch); type 1 is paired. T.TEST returns only the p value.' },
      { q: 'How do I report it in APA style?', a: 'For example “Welch t(59.61) = 2.36, p = .022”: t to two decimals, exact p, p < .001 when smaller, italic symbols.' },
    ],
    labels: {
      group1: 'Group 1',
      group2: 'Group 2',
      n: 'Sample size (N)',
      mean: 'Mean (M)',
      sd: 'Sample SD',
      method: 'Method',
      methodWelch: 'Welch t test (default, no equal-variance assumption)',
      methodStudent: 'Student t test (pooled variance)',
      calculate: 'Run t test',
      difference: 'Mean difference (M₁ − M₂)',
      result: 't statistic',
      df: 'Degrees of freedom',
      p: 'Two-tailed p value',
      standardError: 'Standard error (SE)',
      confidenceInterval: '95% confidence interval',
      hedgesG: 'Hedges’ g (effect size)',
      apaLine: 'APA statistics line (italicise the symbols)',
      invalid: 'Both sample sizes must be whole numbers above 1, SDs must be positive, and all fields must be valid numbers.',
    },
    disclaimer: 'For teaching and preliminary estimates; it does not replace statistical software or professional judgment. Verify the data, design and assumptions before reporting.',
    privacyNote: 'All input and calculation stays in your browser and is not uploaded to FunnyTools.',
  },
} satisfies Record<Locale, ToolContent>;
