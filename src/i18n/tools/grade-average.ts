import type { ToolContent } from './_types';

const CHECKED = '查核日期 2026-10-17';

export default {
  zh: {
    name: '學期成績計算器',
    short: '輸入平時、段考等各項分數與占分比例，算出學期成績（加權平均），並與簡單平均對照。',
    long: '預設值就是下方第一個算例：平時成績 88 分（占 30%）、第一次段考 76 分（占 30%）、第二次段考 84 分（占 40%），加權平均是 82.80，依高中評量辦法科目學期成績取整數為 83。簡單平均 82.67 是把三項當成同等重要，通常不是學期成績。',
    seoTitle: '學期成績計算機｜平時與段考加權平均計算、學期總平均四捨五入',
    seoDescription: '學期成績與段考加權平均計算機：輸入平時、段考分數與占分比例算出學期總平均計算結果，附期末要考幾分、高中與國中小四捨五入規定與 Excel 公式。',
    keywords: ['學期總平均計算', '段考加權平均計算機', '學期成績', '學期成績怎麼算', '學期成績計算', '學期成績計算器', '學期成績四捨五入', '平時成績 段考 比例', '成績加權平均'],
    contentSections: [
      {
        heading: '學期成績怎麼算',
        paragraphs: [
          '學期成績通常是各評量項目的分數乘以它的占分比例後加總：學期成績＝平時成績×平時比例＋第一次段考×比例＋第二次段考×比例，比例全部加起來是 100%。這就是加權平均。',
          '占分比例不是全國統一。《高級中等學校學生學習評量辦法》第 4 條規定，各科目日常及定期學業成績評量的占分比率由學校定之；《國民小學及國民中學學生學習評量辦法》第 7 條只規定領域學習課程評量應兼顧平時評量及定期評量，第 8 條要求授課教師於每學期初向學生及其法定代理人說明評量計畫。所以你的比例要看學校的評量規定與老師學期初公布的評量計畫。',
        ],
      },
      {
        heading: '平時與定期評量的配分實例',
        paragraphs: [
          '以下配分與分數是為了示範算法而設定的假設數字，實際比例以你的學校與老師公布的為準。',
        ],
        items: [
          '算例一（工具預設值）：平時成績 88 分占 30%、第一次段考 76 分占 30%、第二次段考 84 分占 40%。88×0.3＝26.4，76×0.3＝22.8，84×0.4＝33.6，加起來 82.8。三項直接平均是 (88＋76＋84)÷3＝82.67，兩者不同是因為第二次段考的占比最大。依高中的規定科目學期成績取整數，82.8 記為 83。',
          '算例二（配分制）：平時配分 30 分得 24 分、期中配分 30 分得 27 分、期末配分 40 分得 34 分，學期成績直接加總 24＋27＋34＝85。同樣的結果也可以用得分率加權：得分率 80%、90%、85%，權重 30、30、40，(80×30＋90×30＋85×40)÷100＝85。在工具輸入 80／30、90／30、85／40 即可重現。',
          '算例三（期末要考幾分）：沿用算例一，平時 88 分、第一次段考 76 分，兩項合計占 60%，已得 26.4＋22.8＝49.2 分。高中一般學生以 60 分為及格（《高級中等學校學生學習評量辦法》第 8 條第一款，特殊身分學生另有規定），期末（占 40%）至少要 (60−49.2)÷0.4＝27 分；想拿到 80 分，期末要 (80−49.2)÷0.4＝77 分。工具下方的「規劃剩餘成績」填入目前平均 82、已完成權重 60、目標 80，會得到 77。',
        ],
        link: {
          prefix: '學分制的學期總平均（各科成績乘以學分），用',
          label: '加權平均計算器',
          href: '/tools/weighted-average-calculator/',
          suffix: '。',
        },
      },
      {
        heading: '學期成績會四捨五入嗎',
        paragraphs: [
          '要看學制與學校，沒有一條全國通用的規則。下表只列我在全國法規資料庫查到的條文；查不到的部分寫「依各校規定」，不替學校補規則。',
          '高中的規定最明確：第 7 條說各科目學期學業成績的計算遇小數點時，採四捨五入法取整數；學期、學年學業成績總平均及各科目學年學業成績，取小數點後一位數，第二位數採四捨五入法進入第一位數。因此算例一的 82.8 分記為 83 分。',
          '國中小：《國民小學及國民中學學生學習評量辦法》全文沒有「四捨五入」或「進位」的規定。領域學習課程的學期成績以優、甲、乙、丙、丁五個等第呈現（第 10 條），分數與等第的轉換如下表；因為等第有分數界線，一個 89.6 分要不要先進位成 90 再轉等第，辦法沒有規定，要看學校的評量計畫。',
        ],
        table: {
          caption: '《國民小學及國民中學學生學習評量辦法》第 10 條：領域學習課程等第與分數的轉換',
          headers: ['等第', '分數'],
          rows: [
            ['優', '九十分以上'],
            ['甲', '八十分以上未滿九十分'],
            ['乙', '七十分以上未滿八十分'],
            ['丙', '六十分以上未滿七十分'],
            ['丁', '未滿六十分'],
          ],
          note: '同條規定以丙等為表現及格之基準。',
        },
        items: [
          '大學：學期成績的計算與進位依各校學則，本頁沒有逐校查證，所以不寫統一規則。',
          '工具的「四捨五入到整數」欄位依高中的規定顯示；用在其他學制或課程時，請以學校評量計畫為準，不要直接當成績單數字。',
        ],
      },
      {
        heading: '各學制規定一覽（占分比例、進位、及格）',
        paragraphs: [],
        table: {
          caption: '依全國法規資料庫現行條文整理（查核日期 2026-10-17）',
          headers: ['學制', '平時與定期的占分比例', '進位', '及格'],
          rows: [
            ['高中', '由學校定之（第 4 條）', '各科目學期成績四捨五入取整數；總平均取小數點後一位（第 7 條）', '一般學生 60 分，特殊身分學生另有規定（第 8 條）'],
            ['國中小', '兼顧平時評量及定期評量，未規定比率；教師學期初說明評量計畫（第 7、8 條）', '辦法未規定', '領域學習課程以丙等（六十分以上未滿七十分）為及格基準（第 10 條）'],
            ['大學', '依各校規定（未逐校查證）', '依各校規定（未逐校查證）', '依各校規定（未逐校查證）'],
          ],
          note: '條文以全國法規資料庫公布的現行版本為準；各校另有補充規定時依各校。',
        },
      },
      {
        heading: '補考、缺考，以及不能算進學期成績的項目',
        paragraphs: [],
        items: [
          '補考：國中小學生因故不能參加定期評量，經學校核准給假者，得補行評量，其成績以實得分數計算（第 7 條第 4 項）；高中則由學校定補考成績的採計與登錄方式（第 6 條）。',
          '缺考沒有統一算法：記 0 分、補考成績或不列入，要依學校規定，不能為了方便先填 0。工具會忽略沒有分數的列，和明確輸入 0 分的結果不同。',
          '教育會考的成績不得納入在校學習評量成績計算（國中小評量辦法第 15 條）；國中辦理的模擬考成績同樣不得納入（第 17 條）。',
        ],
      },
      {
        heading: 'Excel 怎麼算學期成績',
        paragraphs: [
          '假設平時、第一次段考、第二次段考的分數放在 B2:B4，占分比例放在 C2:C4（30%、30%、40%）。下面的公式已用 LibreOffice Calc 實際執行驗算（函數名稱與 Excel 相同），算例一的結果與本頁工具一致。',
        ],
        snippets: [
          { label: '學期成績（比例寫成百分比，總和 100%；算例一＝82.8）', code: '=SUMPRODUCT(B2:B4,C2:C4)' },
          { label: '比例寫成 30、30、40 時', code: '=SUMPRODUCT(B2:B4,C2:C4)/SUM(C2:C4)' },
          { label: '四捨五入取整數（高中科目學期成績；算例一＝83）', code: '=ROUND(SUMPRODUCT(B2:B4,C2:C4),0)' },
          { label: '簡單平均（不加權；算例一＝82.67）', code: '=AVERAGE(B2:B4)' },
          { label: '期末至少要幾分（目標 60，平時 B2、段考一 B3，期末比例在 C4；算例三＝27）', code: '=(60-B2*C2-B3*C3)/C4' },
        ],
        items: [
          'Microsoft 的說明指出：SUMPRODUCT 的各陣列必須有相同維度，否則傳回 #VALUE!；非數值的項目會被當作 0，所以空白或文字的分數會悄悄被當成 0 分。',
          'ROUND(數值, 0) 四捨五入到整數；Microsoft 文件的範例是 ROUND(2.15, 1)＝2.2。',
        ],
      },
      {
        heading: '學期成績常見錯誤',
        paragraphs: [],
        items: [
          '占分比例沒有加到 100%：用百分比時三項要合計 100；用工具輸入 30、30、40 或 3、3、4 都可以，工具會除以權重總和。',
          '用簡單平均代替學期成績：項目占比不同時，簡單平均會偏離（算例一差 0.13，占比懸殊時差更多）。',
          '把缺考直接當 0 或空白：要依學校的規定處理。',
          '把教育會考或模擬考成績算進學期成績：辦法規定不得納入。',
          '把四捨五入當成全國統一規則：高中有明文，國中小的辦法沒有規定，大學依各校。',
          '只看分數、忽略國中小的等第：國中小領域學習課程的學期成績以優甲乙丙丁呈現，轉換界線見上表。',
        ],
      },
    ],
    instructions: [
      '每一列填入一個評量項目的分數與它的占分比例（沒有填比例的列不會進入加權平均）。',
      '需要時按「新增一列」或移除不用的列，結果會自動更新。',
      '看「加權平均」就是學期成績；「四捨五入到整數」依高中規定顯示。',
      '想知道期末要考幾分，用下方「規劃剩餘成績」。',
    ],
    examples: [
      '用平時與兩次段考的占分比例算學期成績（算例一）。',
      '配分制的得分換算（算例二）。',
      '算期末至少要考幾分才及格或達到目標（算例三）。',
    ],
    formula: {
      expression: '學期成績＝Σ(分數×比例)÷Σ比例；簡單平均＝Σ分數÷n',
      explanation: '分數是每一個評量項目的得分，比例是它的占分（權重必須大於 0）。權重不必加總為 100，工具會除以權重總和；只有同時有分數與正數權重的列會進入加權平均。',
    },
    reportTip: '可寫成：「依平時 30%、第一次段考 30%、第二次段考 40% 計算，學期成績為 82.8，依高中評量辦法科目學期成績取整數為 83。」並寫明比例的來源（學校評量計畫）。',
    sources: [
      {
        label: '全國法規資料庫：國民小學及國民中學學生學習評量辦法（教育部，民國 113 年 4 月 24 日修正，同年 8 月 1 日施行）',
        href: 'https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=H0070019',
        note: `第 7 條（平時與定期評量、補行評量以實得分數計算）、第 8 條（學期初說明評量計畫）、第 10 條（等第與分數的轉換、丙等為及格基準）、第 15、17 條（會考與模擬考不納入）；全文無「四捨五入」「進位」規定。${CHECKED}。`,
      },
      {
        label: '全國法規資料庫：高級中等學校學生學習評量辦法（教育部，民國 114 年 12 月 18 日修正）',
        href: 'https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=H0060060',
        note: `第 4 條（日常與定期占分比率由學校定之）、第 6 條（補考）、第 7 條（學期學業成績總平均與四捨五入）、第 8 條（及格基準）。${CHECKED}。`,
      },
      {
        label: 'NIST Dataplot Reference Manual：WEIGHTED MEAN',
        href: 'https://www.itl.nist.gov/div898/software/dataplot/refman2/ch2/weigmean.pdf',
        note: `加權平均 xw＝Σ(wᵢxᵢ)÷Σwᵢ 的定義。${CHECKED}。`,
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
      {
        q: '學期成績怎麼算？',
        a: '各評量項目的分數乘以占分比例後加總。例如平時 88 分占 30%、段考一 76 分占 30%、段考二 84 分占 40%，學期成績＝88×0.3＋76×0.3＋84×0.4＝82.8。',
      },
      {
        q: '學期成績會四捨五入嗎？',
        a: '依學制與學校而定。高中的評量辦法規定科目學期成績四捨五入取整數；國中小的評量辦法沒有規定進位方式；大學依各校學則。請以你的學校評量規定為準。',
      },
      {
        q: '平時成績與段考的比例是多少？',
        a: '不是全國統一。高中由學校訂定（評量辦法第 4 條），國中小要求兼顧平時與定期評量並於學期初說明評量計畫，請看老師公布的評量計畫。',
      },
      {
        q: '期末要考幾分才會及格？',
        a: '期末至少分數＝(及格分數−已得分數)÷期末比例。例如已得 49.2 分、期末占 40%、及格 60：(60−49.2)÷0.4＝27 分。',
      },
      {
        q: '空白列會算進去嗎？',
        a: '不會。沒有有效分數的列會被忽略；只有同時有分數與正數權重的列才進入加權平均。',
      },
    ],
    labels: {
      score: '分數',
      weight: '占分比例（權重）',
      addRow: '新增一列',
      remove: '移除',
      copy: '複製結果',
      exportCsv: '匯出 CSV',
      result: '計算結果',
      totalItems: '有效項目',
      sum: '總分',
      average: '簡單平均',
      weightedAverage: '加權平均（學期成績）',
      roundedInt: '四捨五入到整數',
      noWeights: '尚未輸入有效權重',
      noValidRows: '請輸入至少一筆有效分數。',
      copied: '已複製',
    },
    disclaimer: '本工具供教學與初步估算，不取代學校成績系統。正式成績請以學校成績單與評量規定為準。',
  },
  en: {
    name: 'Grade Average Calculator',
    short: 'Enter coursework and exam scores with their weights to get the semester grade (weighted average) next to the simple average.',
    long: 'The defaults are the first worked example below: coursework 88 (30%), exam 1 76 (30%) and exam 2 84 (40%) give a weighted average of 82.80, or 83 rounded to an integer as Taiwan senior-high rules require for subject semester scores. The simple average of 82.67 treats the three items as equally important.',
    seoTitle: 'Semester Grade Calculator | Weighted Average and Rounding Rules',
    seoDescription: 'Semester grade calculator: enter scores and weights to get the weighted average, with worked examples, the score needed on the final exam, Taiwan rounding rules and Excel formulas.',
    keywords: ['grade average calculator', 'semester grade calculator', 'weighted grade calculator', 'how to calculate semester grade', 'final exam score needed'],
    contentSections: [
      {
        heading: 'How a semester grade is calculated',
        paragraphs: [
          'A semester grade is usually the sum of each item’s score times its weight, with the weights adding to 100%. That is a weighted average: 88 × 0.3 + 76 × 0.3 + 84 × 0.4 = 82.8.',
          'The weights are not national. For Taiwan senior high schools, Article 4 of the Regulations Governing Student Learning Assessment says each school sets the ratio of daily and periodic assessment. For elementary and junior high schools the assessment regulations only require both ongoing and periodic assessment (Article 7) and a teacher’s explanation of the assessment plan at the start of each semester (Article 8).',
        ],
      },
      {
        heading: 'Worked examples',
        paragraphs: ['The weights and scores below are made-up illustrations.'],
        items: [
          'Example 1 (tool default): 88 at 30%, 76 at 30%, 84 at 40% gives 26.4 + 22.8 + 33.6 = 82.8. The simple average is 82.67. Senior-high subject semester scores are rounded to an integer, so 83.',
          'Example 2 (points-based): 24 of 30, 27 of 30 and 34 of 40 add up to 85; as percentages 80, 90 and 85 with weights 30, 30 and 40 also give 85.',
          'Example 3 (final exam needed): with 49.2 points already earned from the first 60%, passing at 60 needs a final of (60 − 49.2) / 0.4 = 27, and 80 needs (80 − 49.2) / 0.4 = 77.',
        ],
        link: { prefix: 'For credit-weighted semester averages use the ', label: 'weighted average calculator', href: '/tools/weighted-average-calculator/', suffix: '.' },
      },
      {
        heading: 'Is a semester grade rounded?',
        paragraphs: [
          'It depends on the school level. Article 7 of the senior-high regulations rounds each subject semester score half up to an integer and keeps overall averages to one decimal. The elementary and junior-high regulations contain no rounding rule; they present domain results as grades (優 90 and above, 甲 80–89, 乙 70–79, 丙 60–69, 丁 below 60; 丙 is the pass line), so whether 89.6 is rounded up before conversion is left to each school. Universities follow their own rules, which this page did not check school by school.',
        ],
      },
      {
        heading: 'Excel',
        paragraphs: ['With scores in B2:B4 and weights in C2:C4. The formulas were run in LibreOffice Calc.'],
        snippets: [
          { label: 'Semester grade (weights add to 100%)', code: '=SUMPRODUCT(B2:B4,C2:C4)' },
          { label: 'Weights written as 30, 30, 40', code: '=SUMPRODUCT(B2:B4,C2:C4)/SUM(C2:C4)' },
          { label: 'Rounded to an integer', code: '=ROUND(SUMPRODUCT(B2:B4,C2:C4),0)' },
          { label: 'Final exam score needed for 60', code: '=(60-B2*C2-B3*C3)/C4' },
        ],
      },
    ],
    instructions: [
      'Enter a score and its weight on each row.',
      'Add or remove rows; results update automatically.',
      'The weighted average is the semester grade; use the planner below for the score needed on the remaining work.',
    ],
    examples: [
      'Semester grade from coursework and two exams.',
      'Convert a points-based scheme.',
      'Find the final exam score needed to pass or reach a target.',
    ],
    formula: {
      expression: 'semester grade = Σ(score × weight) / Σweight; simple mean = Σscore / n',
      explanation: 'Only rows with both a valid score and a positive weight enter the weighted average; the tool divides by the total weight.',
    },
    reportTip: 'Example: “Weighted 30% / 30% / 40%, the semester grade is 82.8, 83 when rounded to an integer.” State where the weights come from.',
    sources: [
      {
        label: 'Laws & Regulations Database: Regulations Governing Student Learning Assessment in Elementary and Junior High Schools (in Chinese)',
        href: 'https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=H0070019',
        note: 'Articles 7, 8, 10, 15 and 17. Checked 2026-10-17.',
      },
      {
        label: 'Laws & Regulations Database: Regulations Governing Student Learning Assessment in Senior High Schools (in Chinese)',
        href: 'https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=H0060060',
        note: 'Articles 4, 6, 7 and 8. Checked 2026-10-17.',
      },
      {
        label: 'Microsoft Support: SUMPRODUCT function',
        href: 'https://support.microsoft.com/zh-tw/excel/functions/sumproduct-function',
        note: 'Same-size arrays; non-numeric entries treated as zero. Checked 2026-10-17.',
      },
    ],
    faq: [
      { q: 'How do I calculate a semester grade?', a: 'Multiply each score by its weight and add them: 88 × 0.3 + 76 × 0.3 + 84 × 0.4 = 82.8.' },
      { q: 'Is a semester grade rounded?', a: 'It depends on the school level and the school’s own rules; see the section above.' },
      { q: 'Are blank rows counted?', a: 'No. Rows without a valid score are ignored.' },
    ],
    labels: {
      score: 'Score',
      weight: 'Weight',
      addRow: 'Add row',
      remove: 'Remove',
      copy: 'Copy result',
      exportCsv: 'Export CSV',
      result: 'Result',
      totalItems: 'Valid items',
      sum: 'Sum',
      average: 'Simple average',
      weightedAverage: 'Weighted average',
      roundedInt: 'Rounded to integer',
      noWeights: 'No valid weights yet',
      noValidRows: 'Enter at least one valid score.',
      copied: 'Copied!',
    },
    disclaimer: 'For teaching and preliminary estimates. Official grades follow your school’s records and rules.',
  },
} satisfies Record<'zh' | 'en', ToolContent>;
