import type { Locale } from '../../config/site';
import type { ToolContent } from './_types';

const CHECKED = '查核日期 2026-10-16';

export default {
  zh: {
    name: '標準差計算器',
    short: '貼上一組數字，同時算出母體與樣本的標準差、變異數，以及平均、中位數、眾數與全距。',
    long: '預設值就是下方第一個算例：五位同學的段考分數 62、68、70、75、85，平均 72，母體標準差 7.7201，樣本標準差 8.6313。母體與樣本兩個數字會同時列出，你再依資料的角色選用。',
    seoTitle: '標準差怎麼算？計算機、公式、STDEV.P／STDEV.S',
    seoDescription: '標準差計算器：貼上一組數字，同時算出母體與樣本標準差、變異數；附計算步驟、工程計算機按法、高中課綱與 Excel 函數。',
    keywords: ['標準差計算器', '標準差怎麼算', '標準差公式', '母體標準差 樣本標準差', '標準差 excel', '標準差計算機怎麼按', '變異數 標準差'],
    contentSections: [
      {
        heading: '標準差是什麼',
        paragraphs: [
          '標準差描述一組數字「離平均有多遠」，單位與原始資料相同：分數的標準差單位仍是「分」。標準差越大，數字越分散；越小，越集中在平均附近。',
          '國家教育研究院《教育大辭書》（吳鐵雄，2000 年 12 月）的說明是：標準差是表示團體分數分散情形的統計數之一，是離均差平方的平均數的正平方根；同一則詞條也提到，離均差平方和除以 N 用於描述統計，除以 N−1（自由度）則用在推論統計中估計母群的標準差。',
        ],
      },
      {
        heading: '標準差怎麼算：逐步算例',
        paragraphs: [
          '步驟：(1) 算平均數；(2) 每筆資料減平均，得離均差；(3) 離均差平方；(4) 全部加總，得離均差平方和；(5) 除以 n（母體）或 n−1（樣本），得變異數；(6) 開根號，得標準差。',
          '算例一（工具預設值）：五位同學的段考分數 62、68、70、75、85（假設的示範數字）。平均＝360÷5＝72。離均差平方和＝298。若這五人就是要描述的整個群體：變異數＝298÷5＝59.6，標準差＝√59.6＝7.7201。若這五人只是從更大群體抽出的樣本：變異數＝298÷4＝74.5，標準差＝√74.5＝8.6313。',
        ],
        table: {
          caption: '算例一的離均差計算（平均 72）',
          headers: ['分數 x', '離均差 x−72', '離均差平方'],
          rows: [
            ['62', '−10', '100'],
            ['68', '−4', '16'],
            ['70', '−2', '4'],
            ['75', '3', '9'],
            ['85', '13', '169'],
            ['合計', '0', '298'],
          ],
          note: '離均差合計一定是 0，可以用來檢查平均數有沒有算錯。',
        },
      },
      {
        heading: '母體標準差與樣本標準差怎麼選',
        paragraphs: [
          '手上的資料就是你要描述的整個群體（例如想描述全班這次段考，而全班成績都在手上），用母體標準差，除以 n，符號 σ，Excel 為 STDEV.P。手上的資料只是樣本、想拿來推論更大的群體（例如問卷抽樣、研究取樣），用樣本標準差，除以 n−1，符號 s，Excel 為 STDEV.S。選用要看資料的角色，不是挑比較小或比較好看的數字。',
          '兩者的差距隨資料筆數增加而縮小：算例一 5 筆是 7.7201 與 8.6313；把 10 位同學的分數 52、58、61、65、68、70、72、75、80、89 貼進工具，則是 10.2859 與 10.8423。Microsoft 的說明也指出，樣本很大時兩者結果會趨近相等。只有 1 筆資料時，樣本標準差的分母是 0，無法計算，工具會顯示「--」，不會硬填成 0。',
        ],
        link: {
          prefix: '知道平均與標準差後，可以用',
          label: 'Z 分數計算器',
          href: '/tools/z-score-calculator/',
          suffix: '看某個分數離平均幾個標準差。',
        },
      },
      {
        heading: '平均一樣、標準差不一樣：算例二',
        paragraphs: [
          '各取 4 位同學的小考分數（示範數字）：A 組 60、60、80、80，B 組 68、70、70、72。兩組平均都是 70。A 組離均差是 −10、−10、10、10，平方和 400，母體變異數 100，母體標準差 10。B 組離均差是 −2、0、0、2，平方和 8，母體變異數 2，母體標準差 1.4142。',
          '結論：只看平均會以為兩組一樣，標準差顯示 A 組分散得多。把這兩組數字分別貼進工具就能重現。',
        ],
        link: {
          prefix: '要把個別分數放到同一把尺上比較，可以用',
          label: 'T 分數計算器',
          href: '/tools/t-score-calculator/',
          suffix: '。',
        },
      },
      {
        heading: '標準差計算機（工程計算機）怎麼按',
        paragraphs: [
          '按鍵名稱與順序依型號而異，請以手上計算機的說明書為準。通用步驟如下：(1) 進入統計模式（常標 STAT 或 SD），有選單時選單變數統計（常標 1-VAR）；(2) 清除舊資料；(3) 逐筆輸入分數，每輸入一筆就按該機型的存入或確認鍵；(4) 離開資料編輯，叫出統計結果選單；(5) 選平均數 x̄、母體標準差 σx、樣本標準差 sx。',
          'Casio 官方線上說明書就是這樣標示：σx 是母體標準差（Population standard deviation），sx 是樣本標準差（Sample standard deviation）。其他品牌的標示可能不同，找不到時請翻說明書的統計章節。',
          '用已知答案核對你的按法：同一份 Casio 說明書的範例資料 55、54、51、55、53、53、54、52，說明書給的結果是 x̄＝53.375、σx＝1.316956719、sx＝1.407885953。把這 8 個數字貼進本頁工具，會得到平均 53.375、母體標準差 1.317、樣本標準差 1.4079，與說明書一致。如果你按出來的是 1.4079，你取的是樣本標準差。',
        ],
      },
      {
        heading: '高中課綱怎麼寫標準差',
        paragraphs: [
          '教育部 2018 年（107 年 6 月）公布的《十二年國民基本教育課程綱要 國民中小學暨普通型高級中等學校 數學領域》，10 年級的學習內容 D-10-2「數據分析」列出「一維數據的平均數、標準差」，備註寫到「學生應知道統計數據可能有略為不同的定義，也應理解可能產生數值略為不同但意義相同的數據」。12 年級加深加廣選修數學甲（D-12 甲-1）與乙（D-12 乙-1）則在離散型隨機變數中列出期望值、變異數與標準差。實施要點也寫到，高中學生所用的計算機應該要能處理數據的變異數與標準差。',
          '課綱本身沒有逐字規定標準差公式要寫成除以 n 或 n−1，公式的寫法以你使用的教科書與老師的定義為準。如果同一批資料在課本、計算機與 Excel 得到略微不同的數字，先檢查它用的是 n 還是 n−1。',
        ],
      },
      {
        heading: 'Excel 標準差函數',
        paragraphs: ['以算例一為例，五位同學的分數放在 A2:A6。下列公式已用 LibreOffice Calc 實際執行驗算（函數名稱與 Excel 相同）：'],
        snippets: [
          { label: '平均數（結果 72）', code: '=AVERAGE(A2:A6)' },
          { label: '母體標準差（結果 7.7201）', code: '=STDEV.P(A2:A6)' },
          { label: '樣本標準差（結果 8.6313）', code: '=STDEV.S(A2:A6)' },
          { label: '母體變異數（結果 59.6）', code: '=VAR.P(A2:A6)' },
          { label: '樣本變異數（結果 74.5）', code: '=VAR.S(A2:A6)' },
        ],
        items: [
          'Microsoft 的說明：STDEV.P 假設引數是整個母體，採 n 方法；STDEV.S 假設引數是母體的樣本，採 n−1 方法。VAR.P、VAR.S 是對應的變異數函數。',
          '引數是範圍時，空白儲存格、邏輯值與文字會被忽略，所以含文字的欄位不會造成錯誤，但也代表有效個數可能比你以為的少。',
        ],
      },
      {
        heading: '標準差常見錯誤',
        paragraphs: [],
        items: [
          '母體與樣本版本混用：同一份報告前後用不同的版本，數字對不上。選一個並寫明。',
          '極端值或輸入錯誤：NIST 工程統計手冊指出，尾端的極端值可能扭曲標準差。把 75 誤打成 750，標準差會暴增，先檢查原始資料。',
          '逗號當小數點：本工具把逗號視為分隔符，3,5 會被讀成 3 與 5 兩筆，不是 3.5。',
          '沒有核對有效個數：無法辨識的片段會被忽略，正式使用前請確認畫面上的個數等於你的資料筆數。',
          '拿不同滿分或不同單位的標準差直接比大小：標準差的單位與原始資料相同，滿分不同的考卷不能直接比較。',
          '把標準差當作好壞的判斷：標準差只描述分散程度，不是及格或精熟的門檻。',
        ],
      },
    ],
    instructions: [
      '在輸入框貼上或鍵入數字，可用逗號、空白或換行分隔。',
      '工具會即時列出個數、平均、中位數、眾數、全距，以及母體與樣本的變異數、標準差。',
      '依資料角色選用：完整群體看母體，抽樣資料看樣本。',
      '需要時可複製完整的統計摘要。',
    ],
    examples: [
      '計算一組段考成績的標準差，看班上分數是否集中。',
      '平均相同的兩組資料，比較哪一組比較分散（算例二）。',
      '用說明書的範例資料核對工程計算機的按法。',
    ],
    formula: {
      expression: '母體：σ² ＝ Σ(xᵢ−x̄)² ÷ n，σ ＝ √σ²　樣本：s² ＝ Σ(xᵢ−x̄)² ÷ (n−1)，s ＝ √s²',
      explanation: 'xᵢ 是第 i 筆有效數值，x̄ 是平均數，n 是有效筆數。完整群體用 σ，抽樣資料用 s。',
    },
    reportTip: '可寫成：「本班 30 人，本次段考平均 74.2 分，母體標準差 8.6 分。」若這 30 人只是研究母群的樣本，則改報樣本標準差並說明抽樣方式。',
    sources: [
      {
        label: '國家教育研究院《教育大辭書》：標準差（吳鐵雄，2000 年 12 月）',
        href: 'https://pedia.cloud.edu.tw/Entry/Detail/?title=%E6%A8%99%E6%BA%96%E5%B7%AE',
        note: `標準差表示團體分數分散情形；除以 N 用於描述統計、除以 N−1 用於推論統計。${CHECKED}。`,
      },
      {
        label: '教育部、國家教育研究院：十二年國民基本教育課程綱要 數學領域（2018 年 6 月）',
        href: 'https://www.naer.edu.tw/upload/1/16/doc/815/%E5%8D%81%E4%BA%8C%E5%B9%B4%E5%9C%8B%E6%B0%91%E5%9F%BA%E6%9C%AC%E6%95%99%E8%82%B2%E8%AA%B2%E7%A8%8B%E7%B6%B1%E8%A6%81%E5%9C%8B%E6%B0%91%E4%B8%AD%E5%B0%8F%E5%AD%B8%E6%9A%A8%E6%99%AE%E9%80%9A%E5%9E%8B%E9%AB%98%E7%B4%9A%E4%B8%AD%E7%AD%89%E5%AD%B8%E6%A0%A1-%E6%95%B8%E5%AD%B8%E9%A0%98%E5%9F%9F.pdf',
        note: `學習內容 D-10-2（第 47 頁）、D-12 甲-1、D-12 乙-1，以及實施要點的計算機規定（第 54 頁）。${CHECKED}。`,
      },
      {
        label: 'Casio 官方線上說明書：fx-82ES PLUS 統計模式（1-VAR）',
        href: 'https://support.casio.com/global/en/calc/manual/fx-82ESPLUS_85ESPLUS_95ESPLUS_350ESPLUS_en/using_calculation_modes/stat.html',
        note: `Var 選單中 σx 為 Population standard deviation，sx 為 Sample standard deviation。${CHECKED}。`,
      },
      {
        label: 'Casio 官方線上說明書：fx-991MS 標準差計算',
        href: 'https://support.casio.com/global/en/calc/manual/fx-100MS_570MS_991MS_en/using_calculation_modes/statistical_calculations/standard_deviation.html',
        note: `範例資料 55、54、51、55、53、53、54、52 的 sx＝1.407885953、σx＝1.316956719、x̄＝53.375。${CHECKED}。`,
      },
      {
        label: 'Microsoft 支援：STDEV.P 函數',
        href: 'https://support.microsoft.com/zh-tw/office/stdev-p-%E5%87%BD%E6%95%B8-6e917c05-31a0-496f-ade7-4f4e7462f285',
        note: `假設引數為整個母體，採 n 方法；樣本很大時與 STDEV.S 趨近相等。${CHECKED}。`,
      },
      {
        label: 'Microsoft 支援：STDEV.S 函數',
        href: 'https://support.microsoft.com/zh-tw/office/stdev-s-%E5%87%BD%E6%95%B8-7d69cf97-0c1f-4acf-be27-f3e83904cc23',
        note: `假設引數為母體的樣本，採 n−1 方法。${CHECKED}。`,
      },
      {
        label: 'Microsoft 支援：VAR.P 函數',
        href: 'https://support.microsoft.com/zh-tw/office/var-p-%E5%87%BD%E6%95%B8-73d1285c-108c-4843-ba5d-a51f90656f3a',
        note: `以整個母體計算變異數；VAR.S 為樣本版本。${CHECKED}。`,
      },
      {
        label: 'NIST Engineering Statistics Handbook：Measures of Scale',
        href: 'https://www.itl.nist.gov/div898/handbook/eda/section3/eda356.htm',
        note: `樣本變異數與樣本標準差採 N−1；尾端的極端值可能扭曲標準差。${CHECKED}。`,
      },
    ],
    faq: [
      { q: '標準差怎麼算？', a: '先算平均，再把每筆資料與平均的差平方後加總，除以 n（母體）或 n−1（樣本）得變異數，最後開根號。逐步算例見上方。' },
      { q: '標準差和變異數是什麼關係？', a: '標準差是變異數的正平方根。變異數的單位是原始單位的平方，標準差則回到原始單位。' },
      { q: '母體標準差和樣本標準差有什麼不同？', a: '母體標準差除以 n，樣本標準差除以 n−1。資料是整個群體就看母體，只是抽樣就看樣本。' },
      { q: '標準差越大越好還是越小越好？', a: '都不是好壞指標，只描述分散程度：越大越分散，越小越集中。' },
      { q: '資料會被上傳嗎？', a: '不會，所有計算都在你的瀏覽器本機完成，數字不會送到伺服器。' },
    ],
    labels: {
      inputLabel: '輸入數字',
      hint: '用逗號、空格或換行分隔',
      placeholder: '例如：62, 68, 70, 75, 85',
      defaultInput: '62, 68, 70, 75, 85',
      count: '個數',
      sum: '總和',
      mean: '平均數',
      median: '中位數',
      mode: '眾數',
      min: '最小值',
      max: '最大值',
      range: '全距',
      variancePopulation: '母體變異數',
      stdevPopulation: '母體標準差',
      varianceSample: '樣本變異數',
      stdevSample: '樣本標準差',
      copy: '複製結果',
      copied: '已複製',
      empty: '請輸入至少一個有效數字。',
      modeNone: '無',
    },
    privacyNote: '所有統計運算都在你的瀏覽器本機進行，輸入的數字不會上傳。',
  },
  en: {
    name: 'Standard Deviation Calculator',
    short: 'Paste a set of numbers to get population and sample standard deviation and variance, plus mean, median, mode and range.',
    long: 'The default is the first worked example below: five exam scores 62, 68, 70, 75, 85 with mean 72, population SD 7.7201 and sample SD 8.6313. Both versions are shown; choose according to the role of your data.',
    seoTitle: 'Standard Deviation Calculator | Population vs Sample',
    seoDescription: 'Standard deviation calculator: paste numbers to get population and sample SD and variance, with worked steps, calculator keys and Excel STDEV.P and STDEV.S.',
    keywords: ['standard deviation calculator', 'population vs sample standard deviation', 'STDEV.P STDEV.S', 'variance calculator'],
    contentSections: [
      {
        heading: 'What standard deviation is',
        paragraphs: ['Standard deviation describes how far numbers sit from their mean, in the same unit as the data. Larger means more spread out. The NAER Educational Encyclopedia notes that dividing the sum of squared deviations by N is used in descriptive statistics and by N−1 in inferential statistics.'],
      },
      {
        heading: 'How to calculate it: worked example',
        paragraphs: ['Steps: mean; deviations; squares; sum; divide by n (population) or n−1 (sample); square root. Example 1 (tool default, made-up scores): 62, 68, 70, 75, 85. Mean = 360 / 5 = 72, sum of squared deviations = 298. Population: variance 298 / 5 = 59.6, SD = 7.7201. Sample: variance 298 / 4 = 74.5, SD = 8.6313.'],
        table: {
          caption: 'Example 1 deviations (mean 72)',
          headers: ['Score x', 'x − 72', 'Squared'],
          rows: [['62', '−10', '100'], ['68', '−4', '16'], ['70', '−2', '4'], ['75', '3', '9'], ['85', '13', '169'], ['Total', '0', '298']],
        },
      },
      {
        heading: 'Population or sample?',
        paragraphs: ['Use population SD (divide by n, Excel STDEV.P) when your numbers are the whole group you want to describe; use sample SD (divide by n−1, Excel STDEV.S) when they are a sample used to infer a larger group. With one value the sample SD is undefined and the tool shows “--”.'],
        link: { prefix: 'To see how many SDs a score is from the mean, use the ', label: 'Z score calculator', href: '/tools/z-score-calculator/', suffix: '.' },
      },
      {
        heading: 'Same mean, different spread: example 2',
        paragraphs: ['Group A: 60, 60, 80, 80; group B: 68, 70, 70, 72. Both means are 70. Population SD is 10 for A and 1.4142 for B.'],
        link: { prefix: 'To put scores on one scale, use the ', label: 'T score calculator', href: '/tools/t-score-calculator/', suffix: '.' },
      },
      {
        heading: 'Scientific calculator and Excel',
        paragraphs: ['Key names vary by model; follow your manual. Generally: enter statistics mode (1-VAR), clear old data, enter each value, open the result menu and choose σx (population) or sx (sample), as in the Casio online manual. Check with Casio’s example data 55, 54, 51, 55, 53, 53, 54, 52: σx = 1.316956719, sx = 1.407885953.'],
        snippets: [
          { label: 'Population SD (7.7201)', code: '=STDEV.P(A2:A6)' },
          { label: 'Sample SD (8.6313)', code: '=STDEV.S(A2:A6)' },
        ],
      },
    ],
    instructions: [
      'Paste or type numbers separated by commas, spaces or new lines.',
      'Read count, mean, median, mode and range, and both population and sample variance and SD.',
      'Choose population for a whole group and sample for sampled data.',
    ],
    examples: [
      'Check how spread out a class’s exam scores are.',
      'Compare two groups with the same mean (example 2).',
      'Verify scientific-calculator key presses against a manual’s sample data.',
    ],
    formula: {
      expression: 'Population: σ² = Σ(xᵢ−x̄)² / n; Sample: s² = Σ(xᵢ−x̄)² / (n−1); SD = √variance',
      explanation: 'xᵢ is each valid value, x̄ the mean and n the count of valid values.',
    },
    reportTip: 'Example: “The class of 30 had a mean of 74.2 and a population SD of 8.6.” If the 30 are a sample, report the sample SD and state the sampling method.',
    sources: [
      { label: 'NAER Educational Encyclopedia: standard deviation (in Chinese)', href: 'https://pedia.cloud.edu.tw/Entry/Detail/?title=%E6%A8%99%E6%BA%96%E5%B7%AE', note: 'N versus N−1. Checked 2026-10-16.' },
      { label: 'Casio online manual: fx-991MS standard deviation', href: 'https://support.casio.com/global/en/calc/manual/fx-100MS_570MS_991MS_en/using_calculation_modes/statistical_calculations/standard_deviation.html', note: 'Example data and σx, sx results. Checked 2026-10-16.' },
      { label: 'Microsoft Support: STDEV.P', href: 'https://support.microsoft.com/zh-tw/office/stdev-p-%E5%87%BD%E6%95%B8-6e917c05-31a0-496f-ade7-4f4e7462f285', note: 'Population version. Checked 2026-10-16.' },
      { label: 'Microsoft Support: STDEV.S', href: 'https://support.microsoft.com/zh-tw/office/stdev-s-%E5%87%BD%E6%95%B8-7d69cf97-0c1f-4acf-be27-f3e83904cc23', note: 'Sample version. Checked 2026-10-16.' },
      { label: 'NIST Engineering Statistics Handbook: Measures of Scale', href: 'https://www.itl.nist.gov/div898/handbook/eda/section3/eda356.htm', note: 'N−1 formula; extreme tails can distort SD. Checked 2026-10-16.' },
    ],
    faq: [
      { q: 'What is the difference between population and sample standard deviation?', a: 'Population SD divides by n and sample SD by n−1. Use population for a whole group and sample for sampled data.' },
      { q: 'Can I enter decimals or negative numbers?', a: 'Yes. A comma is a separator, so 3,5 is read as 3 and 5, not 3.5.' },
      { q: 'Is my data uploaded?', a: 'No. All calculations run locally in your browser.' },
    ],
    labels: {
      inputLabel: 'Enter numbers',
      hint: 'Separate with commas, spaces, or new lines',
      placeholder: 'e.g. 62, 68, 70, 75, 85',
      defaultInput: '62, 68, 70, 75, 85',
      count: 'Count',
      sum: 'Sum',
      mean: 'Mean',
      median: 'Median',
      mode: 'Mode',
      min: 'Min',
      max: 'Max',
      range: 'Range',
      variancePopulation: 'Population variance',
      stdevPopulation: 'Population SD',
      varianceSample: 'Sample variance',
      stdevSample: 'Sample SD',
      copy: 'Copy result',
      copied: 'Copied!',
      empty: 'Enter at least one valid number.',
      modeNone: 'None',
    },
    privacyNote: 'All statistics run locally in your browser; the numbers you enter are not uploaded.',
  },
} satisfies Record<Locale, ToolContent>;
