import type { Locale } from '../../config/site';
import type { ToolContent } from './_types';

const CHECKED = '查核日期 2026-10-17';

export default {
  zh: {
    name: '加權平均計算器',
    short: '輸入每一項的分數與權重（學分或比例），算出加權平均，並與不加權的簡單平均對照。',
    long: '預設值就是下方第一個算例：高中一學期 5 科，國文 78 分（4 學分）、英文 85 分（4）、數學 72 分（4）、物理 90 分（3）、體育 95 分（2）。加權平均是 1400÷17＝82.35，依高中評量辦法取到小數第一位為 82.4；簡單平均則是 84。',
    seoTitle: '加權平均怎麼算？公式、學分加權範例與 Excel SUMPRODUCT 計算機',
    seoDescription: '加權平均計算機：輸入分數與權重（學分或比例）算出加權平均，附公式、學分加權算例、高中學期總平均的計算規定與 Excel SUMPRODUCT 寫法。',
    keywords: ['加權平均', '加權平均怎麼算', '加權平均公式', '加權平均 excel', 'SUMPRODUCT 加權平均', '加權平均計算機', '學分加權平均'],
    contentSections: [
      {
        heading: '加權平均是什麼',
        paragraphs: [
          '加權平均用在「每一項的重要程度不同」的時候：權重大的項目，對平均的影響比較大。NIST 的 Dataplot 參考手冊給的定義是：加權平均 x̄w＝Σ(wᵢxᵢ)÷Σwᵢ，wᵢ 是第 i 筆資料的權重；一般平均是 Σxᵢ÷N。當所有權重都相等，加權平均就等於一般平均。',
          '權重可以是學分、配分比例（30%）、人數，只要同一次計算裡單位一致即可。公式最後會除以權重總和，所以權重不必加總為 100 或 1。',
        ],
      },
      {
        heading: '加權平均怎麼算：公式與學分加權算例',
        paragraphs: [
          '三個步驟：① 每一項的分數乘以它的權重；② 把乘積全部加起來；③ 除以權重總和。以下班級與課程數字是為了示範算法而設定的假設數字。',
        ],
        items: [
          '算例一（工具預設值，學分加權）：高中一學期 5 科。國文 78×4＝312、英文 85×4＝340、數學 72×4＝288、物理 90×3＝270、體育 95×2＝190，乘積總和 1400；學分總和 4＋4＋4＋3＋2＝17；加權平均＝1400÷17＝82.3529…。同樣五個分數的簡單平均是 (78＋85＋72＋90＋95)÷5＝84。加權平均比較低，是因為 4 學分的國英數三科分數都不高。',
          '算例二（權重是人數，合併班級平均）：甲班 40 人平均 70、乙班 20 人平均 85、丙班 30 人平均 76。三班合併的平均＝(70×40＋85×20＋76×30)÷(40＋20＋30)＝6780÷90＝75.33；直接把三個班平均再平均會得到 77，高估了，因為忽略了乙班人數最少。在工具輸入 70／40、85／20、76／30 即可重現。',
          '算例三（反推需要幾分）：沿用算例一，再加修一門 2 學分的選修，想把學期平均拉到 84，新科目要考 x 分：(1400＋2x)÷19＝84，x＝98。如果想拉到 85，x＝(85×19−1400)÷2＝107.5，超過 100 分，不可能達到。',
        ],
        link: {
          prefix: '平時、段考的配分比例（例如 30%、30%、40%）怎麼算成學期成績，請看',
          label: '學期成績計算器',
          href: '/tools/grade-average/',
          suffix: '。',
        },
      },
      {
        heading: '高中學期總平均的官方算法（學分加權與四捨五入）',
        paragraphs: [
          '高中的學期總平均有明文規定。教育部《高級中等學校學生學習評量辦法》第 7 條：學期學業成績總平均的計算，是各科目學期學業成績乘以各該科目學分數所得之總和，再除以總學分數；各科目學期學業成績遇小數點時，採四捨五入法取整數；學期、學年學業成績總平均及各科目學年學業成績，取小數點後一位數，第二位數採四捨五入法進入第一位數。',
          '學分的算法在同辦法第 5 條：每學期每週修習一節或總修習節數達十八節，為一學分。依此，算例一的 82.3529… 取到小數點後一位是 82.4，工具結果區的「取到小數第 1 位」欄位就是這個數字。',
          '以上只適用高中學分制。國中小適用另一部評量辦法，大學的學期平均請以各校學則為準；本頁沒有逐校查證，所以不寫統一規則。',
        ],
      },
      {
        heading: '加權平均怎麼看',
        paragraphs: [],
        items: [
          '加權平均會往「權重大的項目」靠近；比簡單平均低，代表權重大的項目分數偏低，反之亦然。',
          '權重全部相同時，加權平均與簡單平均一定相等。',
          '權重要有依據：學分數、規定的配分比例、人數。自己隨意調整權重，算出來的只是自己想看到的數字。',
          '加權平均只說明中心位置，不說明分散程度：兩組加權平均相同的成績，起伏可能差很多。',
        ],
        link: {
          prefix: '想知道分數起伏多大，用',
          label: '標準差計算器',
          href: '/tools/standard-deviation/',
          suffix: '。',
        },
      },
      {
        heading: 'Excel 怎麼算加權平均（SUMPRODUCT）',
        paragraphs: [
          '假設 5 科分數在 B2:B6、學分在 C2:C6。SUMPRODUCT 會把兩個範圍對應位置相乘後加總，正好是 Σ(wᵢxᵢ)。下面的公式已用 LibreOffice Calc 實際執行驗算（函數名稱與 Excel 相同），算例一的結果與本頁工具一致。',
        ],
        snippets: [
          { label: '加權總和（算例一＝1400）', code: '=SUMPRODUCT(B2:B6,C2:C6)' },
          { label: '加權平均（算例一＝82.3529…）', code: '=SUMPRODUCT(B2:B6,C2:C6)/SUM(C2:C6)' },
          { label: '依高中規定取到小數點後一位（算例一＝82.4）', code: '=ROUND(SUMPRODUCT(B2:B6,C2:C6)/SUM(C2:C6),1)' },
          { label: '簡單平均（算例一＝84）', code: '=AVERAGE(B2:B6)' },
          { label: '權重已寫成百分比且總和為 100%（三項各一格）', code: '=SUMPRODUCT(B2:B4,C2:C4)' },
        ],
        items: [
          'Microsoft 的說明指出：SUMPRODUCT 的各陣列引數必須有相同維度，否則傳回 #VALUE!；非數值的項目會被當作 0。在 LibreOffice Calc 實測：把某一科學分欄寫成文字「三」，公式不會報錯，而是把那一科當作權重 0，平均悄悄偏掉，輸入前要檢查。',
          'ROUND(數值, 1) 是四捨五入到小數第一位，Microsoft 文件的範例是 ROUND(2.15, 1)＝2.2。',
        ],
      },
      {
        heading: '加權平均常見錯誤',
        paragraphs: [],
        items: [
          '權重單位混用：同一份表格裡一格寫 30、另一格寫 0.4。要全部用百分比數字，或全部用小數。',
          '直接把各班（各科）的平均再平均：人數或學分不同時會算錯，算例二就是這個情況。',
          '用 Excel 的 AVERAGE 當加權平均：AVERAGE 把每一項視為權重相同。',
          '把空白、缺考直接當 0：是否記 0、補考或不列入，要依學校的規定，不能為了方便先填 0。',
          '先把每科乘積各自四捨五入再加總：高中規定是各科成績先取整數，總平均再取小數點後一位。',
          '本工具遇到分數或權重只填一半、或權重小於等於 0 的列，會整份判定無效並顯示錯誤，不會自動略過；這與學期成績計算器（會忽略沒有分數的列）不同。',
        ],
      },
    ],
    instructions: [
      '每一列填入一個分數（或數值）與它的權重（學分或比例）。',
      '需要時按「新增一列」或移除不用的列。',
      '按下「計算加權平均」，看加權平均、四捨五入到小數第 1 位、簡單平均、權重總和與加權總和。',
      '正式成績請以學校成績單為準。',
    ],
    examples: [
      '用學分算一學期的總平均（算例一）。',
      '合併不同人數的班級平均（算例二）。',
      '檢查再多修一科需要考幾分才能達到目標（算例三）。',
    ],
    formula: {
      expression: '加權平均＝Σ(wᵢxᵢ)÷Σwᵢ；簡單平均＝Σxᵢ÷n',
      explanation: 'xᵢ 是每一項的分數，wᵢ 是它的權重（必須大於 0，且單位一致）。權重不必加總為 100 或 1。',
    },
    reportTip: '可寫成：「本學期 5 科依學分加權的總平均為 82.4（1400÷17＝82.35，依高中評量辦法取到小數點後一位）。」並寫明權重是學分還是配分比例。',
    sources: [
      {
        label: '全國法規資料庫：高級中等學校學生學習評量辦法（教育部，民國 114 年 12 月 18 日修正）',
        href: 'https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=H0060060',
        note: `第 5 條學分的算法；第 7 條學期學業成績總平均的公式、各科目取整數與總平均取小數點後一位的四捨五入規定。${CHECKED}。`,
      },
      {
        label: 'NIST Dataplot Reference Manual：WEIGHTED MEAN',
        href: 'https://www.itl.nist.gov/div898/software/dataplot/refman2/ch2/weigmean.pdf',
        note: `加權平均 xw＝Σ(wᵢxᵢ)÷Σwᵢ 的定義，wᵢ 為第 i 筆的權重。${CHECKED}。`,
      },
      {
        label: 'Microsoft 支援：SUMPRODUCT 函數',
        href: 'https://support.microsoft.com/zh-tw/excel/functions/sumproduct-function',
        note: `陣列引數必須有相同維度，否則傳回 #VALUE!；非數值項目視為 0。${CHECKED}。`,
      },
      {
        label: 'Microsoft 支援：ROUND 函數',
        href: 'https://support.microsoft.com/zh-tw/excel/functions/round-function',
        note: `ROUND 將數字四捨五入至指定位數；ROUND(2.15, 1)＝2.2。${CHECKED}。`,
      },
    ],
    faq: [
      { q: '加權平均怎麼算？', a: '每一項分數乘以權重，全部加總，再除以權重總和。例如 78 分 4 學分、85 分 4 學分：(78×4＋85×4)÷8＝81.5。' },
      { q: '權重一定要加總為 100 嗎？', a: '不用。公式會除以權重總和，只要權重都大於 0 且單位一致即可。' },
      { q: '學分加權平均怎麼算？', a: '把學分當權重：Σ(成績×學分)÷總學分。高中的規定見上方《高級中等學校學生學習評量辦法》第 7 條。' },
      { q: 'Excel 的加權平均公式是什麼？', a: '=SUMPRODUCT(分數範圍,權重範圍)/SUM(權重範圍)。' },
      { q: '加權平均和簡單平均有什麼不同？', a: '簡單平均把每一項視為同等重要；加權平均讓權重大的項目影響較大，權重全相同時兩者相等。' },
    ],
    labels: {
      value: '分數（或數值）',
      weight: '權重（學分或比例）',
      add: '新增一列',
      remove: '移除',
      calculate: '計算加權平均',
      result: '加權平均',
      rounded1: '取到小數第 1 位（高中學期總平均的位數）',
      simpleMean: '簡單平均（不加權）',
      weightTotal: '權重總和',
      weightedSum: '加權總和',
      invalid: '請至少輸入一列有效數值，且每一列的權重都要大於 0；分數或權重只填一半的列會讓整份計算無效。',
    },
    disclaimer: '本工具供教學與初步估算，不取代學校成績系統或專業判斷。正式成績請以學校成績單與評量規定為準。',
    privacyNote: '所有輸入與計算都在你的瀏覽器內完成，不會上傳到 FunnyTools。',
  },
  en: {
    name: 'Weighted Average Calculator',
    short: 'Enter each score with its weight (credits or percentages) to get the weighted average, next to the unweighted simple average.',
    long: 'The defaults are the first worked example below: five courses with credits 4, 4, 4, 3 and 2 and scores 78, 85, 72, 90 and 95. The weighted average is 1400 / 17 = 82.35 (82.4 to one decimal) while the simple average is 84.',
    seoTitle: 'Weighted Average Calculator | Formula, Credits and Excel SUMPRODUCT',
    seoDescription: 'Weighted average calculator: enter scores and weights (credits or percentages), with the formula, a credit-weighted example, the Taiwan senior-high rounding rule and the Excel SUMPRODUCT formula.',
    keywords: ['weighted average calculator', 'weighted average formula', 'weighted average excel', 'sumproduct weighted average', 'credit weighted average'],
    contentSections: [
      {
        heading: 'What a weighted average is',
        paragraphs: [
          'A weighted average is used when items matter by different amounts. NIST defines the weighted mean as Σ(wᵢxᵢ) / Σwᵢ, where wᵢ is the weight of the ith observation. When all weights are equal it equals the ordinary mean.',
          'Weights can be credits, percentages or head counts as long as the units are consistent. The formula divides by the total weight, so weights need not add up to 100 or 1.',
        ],
      },
      {
        heading: 'How to calculate it',
        paragraphs: ['Multiply each score by its weight, add the products, and divide by the total weight. The course and class numbers are made-up illustrations.'],
        items: [
          'Example 1 (tool default): scores 78, 85, 72, 90, 95 with credits 4, 4, 4, 3, 2. Products 312 + 340 + 288 + 270 + 190 = 1400; credits 17; 1400 / 17 = 82.35. The simple average is 84, higher because the 4-credit courses scored lower.',
          'Example 2 (weights are head counts): classes of 40, 20 and 30 students with means 70, 85 and 76 combine to (2800 + 1700 + 2280) / 90 = 75.33; averaging the three means directly gives 77.',
          'Example 3 (what score do I need): adding a 2-credit course to Example 1 and aiming for 84 needs (1400 + 2x) / 19 = 84, x = 98. Aiming for 85 would need 107.5, which is impossible on a 100-point scale.',
        ],
        link: { prefix: 'For coursework and exam percentages, see the ', label: 'semester grade calculator', href: '/tools/grade-average/', suffix: '.' },
      },
      {
        heading: 'Taiwan senior-high rule',
        paragraphs: [
          'Article 7 of the Ministry of Education’s Regulations Governing Student Learning Assessment in Senior High Schools defines the semester average as the sum of subject score × credits divided by total credits. Each subject score is rounded to an integer; the semester average is kept to one decimal place, rounding the second decimal half up. This applies to senior-high credit systems only.',
        ],
      },
      {
        heading: 'Weighted average in Excel',
        paragraphs: ['With scores in B2:B6 and credits in C2:C6. The formulas were run in LibreOffice Calc.'],
        snippets: [
          { label: 'Weighted average', code: '=SUMPRODUCT(B2:B6,C2:C6)/SUM(C2:C6)' },
          { label: 'Rounded to one decimal', code: '=ROUND(SUMPRODUCT(B2:B6,C2:C6)/SUM(C2:C6),1)' },
          { label: 'Simple average', code: '=AVERAGE(B2:B6)' },
        ],
        items: ['SUMPRODUCT ranges must have the same size (otherwise #VALUE!) and non-numeric entries count as zero, so a text weight silently becomes 0.'],
        link: { prefix: 'To see how spread out the scores are, use the ', label: 'standard deviation calculator', href: '/tools/standard-deviation/', suffix: '.' },
      },
    ],
    instructions: [
      'Enter a score and its weight on each row.',
      'Add or remove rows as needed.',
      'Press Calculate to see the weighted average, the one-decimal rounding and the simple average.',
    ],
    examples: [
      'Credit-weighted semester average.',
      'Combine class means of different sizes.',
      'Check what score a new course needs to reach a target.',
    ],
    formula: {
      expression: 'weighted mean = Σ(wᵢxᵢ) / Σwᵢ; simple mean = Σxᵢ / n',
      explanation: 'xᵢ is each score and wᵢ its weight (greater than 0, same units). Weights need not total 100 or 1.',
    },
    reportTip: 'Example: “The credit-weighted semester average is 82.4 (1400 / 17 = 82.35, rounded to one decimal).” State whether weights are credits or percentages.',
    sources: [
      {
        label: 'Laws & Regulations Database: Regulations Governing Student Learning Assessment in Senior High Schools (in Chinese)',
        href: 'https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=H0060060',
        note: 'Articles 5 and 7: credits, semester average formula and rounding. Checked 2026-10-17.',
      },
      {
        label: 'NIST Dataplot Reference Manual: WEIGHTED MEAN',
        href: 'https://www.itl.nist.gov/div898/software/dataplot/refman2/ch2/weigmean.pdf',
        note: 'Definition of the weighted mean. Checked 2026-10-17.',
      },
      {
        label: 'Microsoft Support: SUMPRODUCT function',
        href: 'https://support.microsoft.com/zh-tw/excel/functions/sumproduct-function',
        note: 'Same-size arrays; non-numeric entries treated as zero. Checked 2026-10-17.',
      },
    ],
    faq: [
      { q: 'How do I calculate a weighted average?', a: 'Multiply each score by its weight, add them up and divide by the total weight.' },
      { q: 'Must weights total 100?', a: 'No. The formula divides by the total weight.' },
      { q: 'What is the Excel formula?', a: '=SUMPRODUCT(scores,weights)/SUM(weights)' },
    ],
    labels: {
      value: 'Score (or value)',
      weight: 'Weight (credits or percentage)',
      add: 'Add row',
      remove: 'Remove',
      calculate: 'Calculate weighted average',
      result: 'Weighted average',
      rounded1: 'Rounded to 1 decimal (senior-high semester average)',
      simpleMean: 'Simple average (unweighted)',
      weightTotal: 'Weight total',
      weightedSum: 'Weighted sum',
      invalid: 'Enter at least one valid row; every weight must be greater than 0 and a half-filled row makes the whole calculation invalid.',
    },
    disclaimer: 'For teaching and preliminary estimates. Official grades follow your school’s records and rules.',
    privacyNote: 'All input and calculation stays in your browser and is not uploaded to FunnyTools.',
  },
} satisfies Record<Locale, ToolContent>;
