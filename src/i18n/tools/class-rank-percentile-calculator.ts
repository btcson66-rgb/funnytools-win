import type { Locale } from '../../config/site';
import type { ToolContent } from './_types';
import { maxRankForTopPercent } from '../../lib/educationStats';

// Every number in the tables below is produced by the same helpers the calculator uses
// (maxRankForTopPercent in src/lib/educationStats.ts), and tests/p2-core-pages.test.mjs
// re-derives the worked examples, so the page cannot drift from the tool.
const TOP_PERCENTS = [5, 10, 20, 30, 50];
const CLASS_SIZES = [30, 35, 40, 45];
const rankTableRows = CLASS_SIZES.map((n) => [
  `${n} 人`,
  ...TOP_PERCENTS.map((pct) => {
    const rank = maxRankForTopPercent(n, pct) as number;
    return rank < 1 ? '不到 1 名' : `第 ${rank} 名`;
  }),
]);
const rankTableRowsEn = CLASS_SIZES.map((n) => [
  `${n} students`,
  ...TOP_PERCENTS.map((pct) => {
    const rank = maxRankForTopPercent(n, pct) as number;
    return rank < 1 ? 'under 1' : `rank ${rank}`;
  }),
]);
const CHECKED = '查核日期 2026-10-17';

export default {
  zh: {
    name: '班排百分比計算器',
    short: '輸入班排名次與全班人數，算出「前百分之幾」與 PR 百分等級；有並列名次可以填並列人數。',
    long: '預設值就是第一個算例：40 人的班級排第 6 名，前 15%、PR 86.25。想知道「班排前 10% 是第幾名」，用下方的反推欄位或名次對照表。',
    seoTitle: '班排百分比換算與計算機｜班排前10%是第幾名、名次換PR',
    seoDescription: '班排百分比換算計算器：輸入名次與全班人數，算出前幾％與PR值，可填並列人數。說明班排、校排、PR差在哪，附繁星推薦簡章校排原文與Excel公式。',
    keywords: ['班排百分比換算', '班排百分比計算機', '班排', '班排意思', '班排前10%', '班排百分比', '班級排名百分比', '校排 班排', '名次換算PR', '繁星推薦 校排'],
    contentSections: [
      {
        heading: '班排是什麼意思',
        paragraphs: [
          '「班排」是口語，指你在自己班上的名次，第 1 名最好。成績單或簡章寫的「排名」「排名百分比」到底是班上、全校還是別的群體，要看那份文件寫的參照群體；同一個名次放在不同群體，位置完全不同。',
          '把名次換成百分比有兩種常見說法，方向相反，不要混用：',
        ],
        items: [
          '前百分比＝名次÷人數×100，數字越小越好。40 人的班級排第 6 名：6÷40＝15%，就是「班排前 15%」。',
          'PR（百分等級）：大約有多少百分比的人在你後面，數字越大越好。本頁用名次區間的中點估算：PR＝100×(人數−名次+0.5)÷人數。同樣是 40 人第 6 名：100×(40−6+0.5)÷40＝86.25。',
          '兩者只差一個小項：PR＝100−前百分比＋50÷人數。40 人班多 1.25，所以前 15% 的 PR 是 86.25，不是 85；45 人班多約 1.11。',
        ],
      },
      {
        heading: '班排百分比怎麼算：三個算例',
        paragraphs: [
          '以下班級與人數是為了示範算法而設定的假設數字，可以把工具的欄位改成同樣的數字重現。',
        ],
        items: [
          '算例一（工具預設值）：40 人班第 6 名。前百分比＝6÷40＝15%；PR＝100×(40−6+0.5)÷40＝86.25；前面有 5 人、後面有 34 人。',
          '算例二（班排前 10% 是第幾名）：45 人班。45×10%＝4.5，名次要不大於 4.5，所以只算到第 4 名（4÷45＝8.89%）；第 5 名是 5÷45＝11.11%，已經超過。第 4 名的 PR 是 92.22，第 5 名的 PR 剛好是 90.00，但它不是前 10%。',
          '算例三（全校）：全校 480 人，排第 90 名。前百分比＝90÷480＝18.75%；PR＝100×(480−90+0.5)÷480＝81.35。同樣是第 6 名，480 人裡是前 1.25%，40 人裡是前 15%。',
        ],
        link: {
          prefix: '手上有全班分數、想同時處理同分，請用',
          label: 'PR 百分等級計算器',
          href: '/tools/percentile-rank-calculator/',
          suffix: '。',
        },
      },
      {
        heading: '班排前 10% 是第幾名：名次對照表',
        paragraphs: [
          '下表是「前 x%」對應到的最大名次：人數×百分比取整數部分，小數一律捨去，不進位。例如 45 人×10%＝4.5，只算到第 4 名。學校或簡章若另有進位規定，以文件為準。',
        ],
        table: {
          caption: '班排前 x% 的最大名次（由本頁工具使用的同一個函式算出）',
          headers: ['班級人數', '前 5%', '前 10%', '前 20%', '前 30%', '前 50%'],
          rows: rankTableRows,
          note: '工具下方的「反推目標名次」欄位用同樣的算法，可輸入任意人數與百分比。',
        },
      },
      {
        heading: '班排、校排、PR 差在哪',
        paragraphs: [
          '三個說法回答的是不同的問題：比較的群體不同，數字的好壞方向也不同。',
        ],
        table: {
          caption: '班排、校排與 PR 的差別',
          headers: ['說法', '比較的群體', '怎麼讀'],
          rows: [
            ['班排（班級排名）', '自己班上的同學', '名次或前百分比，越小越好'],
            ['校排（全校排名）', '全校，或該文件指定的群體', '名次或前百分比，越小越好；跨班同一把尺'],
            ['PR（百分等級）', '你選定的參照群體', '約有 PR% 的人在你後面，越大越好；用中點法最高不到 100'],
          ],
          note: '班排與校排的人數基準不同，不能把「班排前 10%」直接說成「校排前 10%」。',
        },
      },
      {
        heading: '申請入學脈絡：簡章怎麼寫（115 學年度原文）',
        paragraphs: [
          '以下只引用大學甄選入學委員會公布的 115 學年度簡章總則原文，沒有查到的就不寫。繁星推薦總則「壹、總則」開頭說明，繁星推薦指高一、高二、高三上「各學期學業成績總平均」之平均成績（簡稱「在校學業成績」）「全校排名百分比符合大學規定」者，得經就讀學校推薦報名。',
        ],
        items: [
          '門檻：「大學得就前百分之 20、前百分之 30、前百分之 40、前百分之 50，擇一訂定全校統一標準」。',
          '誰來算：「甄選委員會以推薦學校於上傳期間所上傳符合繁星推薦資格之學生，計算『在校學業成績』全校排名百分比」（總則三、學業成績）。',
          '比序方向：「分發比序項目為全校排名百分比時，則由百分比小者優先分發」（總則十）；簡章舉例，甲生前 1%、乙生前 2%，則甲生優先分發。',
          '同分：「在校學業成績」同分時，依序以「高三上總平均」「高二下總平均」「高二上總平均」「高一下總平均」「高一上總平均」參酌（總則三、學業成績）。',
          '成績本身：簡章寫「在校學業成績」計算至小數點第 2 位數，第 3 位數四捨五入（總則三、學業成績）；這是成績的位數，不是名次換算百分比的公式。',
          '繁星推薦總則全文用的是「全校排名百分比」，查不到「班級排名」「班排」字樣；簡章也沒有寫名次換算成百分比的公式。所以本頁的「前百分比＝名次÷人數」是本站的算法，甄選委員會的實際算法以其公告為準。',
          '個人申請：同年度《大學「申請入學」招生簡章》總則全文查不到「班級排名」「排名百分比」字樣；各校系審查什麼，以簡章「貳、分則」各校系所訂為準。',
          '以上是 115 學年度簡章；116 學年度簡章公告後，請以新版為準。',
        ],
      },
      {
        heading: '同名次（並列）怎麼算',
        paragraphs: [
          '分數相同的人通常並列同一名次。三個人並列第 6 名時，下一位是第 9 名。這時把工具的「並列人數」填 3：後面的人數是 40−(6+3−1)＝32，PR＝100×(32+3÷2)÷40＝83.75，比沒有並列的 86.25 低 2.5。前百分比仍用 6÷40＝15%。',
          '有的學校用並列中最前面的名次、有的用最後面的名次，也有學校會再依其他成績排出先後。像繁星推薦就另訂同分參酌順序（見上一節），並列者不一定共用同一個名次。要拿來申請或報告時，請以學校或受理單位的規則為準。',
        ],
      },
      {
        heading: 'Excel 怎麼算班排百分比',
        paragraphs: [
          '假設 10 位同學的分數放在 A2:A11（95、90、90、85、80、80、80、70、65、50），要算 A6 那位（80 分）。Microsoft 說明指出 RANK.EQ 會給重複的數字相同的排名，而且重複的數字會影響後續數字的排名；Order 為 0 或省略時，數字大的排名在前。下面的公式已用 LibreOffice Calc 實際執行驗算（函數名稱與 Excel 相同），結果與本頁工具一致：名次 5、並列 3 人、前百分比 50%、PR 45。',
        ],
        snippets: [
          { label: '名次（分數高者名次小）→ 5', code: '=RANK.EQ(A6,$A$2:$A$11,0)' },
          { label: '前百分比 → 0.5（儲存格設成百分比格式為 50%）', code: '=RANK.EQ(A6,$A$2:$A$11,0)/COUNT($A$2:$A$11)' },
          { label: '同分人數 → 3', code: '=COUNTIF($A$2:$A$11,A6)' },
          { label: 'PR，含同分（中點法）→ 45', code: '=(COUNTIF($A$2:$A$11,"<"&A6)+COUNTIF($A$2:$A$11,A6)/2)/COUNT($A$2:$A$11)*100' },
          { label: 'PR，只有名次、確定沒有同分時 → 例如 A2（95 分）得 95', code: '=(COUNT($A$2:$A$11)-RANK.EQ(A2,$A$2:$A$11,0)+0.5)/COUNT($A$2:$A$11)*100' },
        ],
        items: [
          '最後一條公式只在沒有同分時才對：A6 有 3 人並列，用它會得到 55，而不是 45。',
        ],
      },
      {
        heading: '班排百分比常見錯誤',
        paragraphs: [],
        items: [
          '把 PR 86 說成「考 86 分」或「贏過全國 86% 的人」：它只描述在這個班（或你輸入的群體）裡的位置。',
          '把「前 10%」和「PR 90」當成同一件事：45 人班第 5 名 PR 剛好 90.00，但前百分比是 11.11%。',
          '忽略人數：40 人班差 1 名＝2.5 個百分點，90 人的年級差 1 名只有約 1.1 個百分點。',
          '缺考、轉學生是否算進分母，由資料提供者決定；分母不同，百分比就不同。',
          '拿不同班的班排互相比較：班級強弱不同，班排不是同一把尺。',
        ],
      },
    ],
    instructions: [
      '輸入你的名次（第 1 名最好）與全班或全校總人數。',
      '有人和你並列同一名次時，填入並列人數（包含你自己，預設 1＝沒有並列）。',
      '按下計算，看前百分比與 PR；想知道前 10% 是第幾名，用下方的反推欄位。',
    ],
    examples: [
      '40 人班第 6 名：前 15%、PR 86.25（預設值）。',
      '45 人班想進前 10%，名次要在第 4 名以內。',
      '三人並列第 6 名：PR 由 86.25 降為 83.75。',
    ],
    formula: {
      expression: '前百分比＝100×r÷N；PR＝100×(N−r+0.5)÷N（無並列）；PR＝100×(N−r−t+1+t÷2)÷N（t 人並列）',
      explanation: 'r 是名次（1 最好），N 是總人數，t 是並列人數。0.5 是把每個名次放在其百分區間中點的修正；t 人並列時，後面有 N−r−t+1 人，並列者各算一半。',
    },
    educationApplication: '班排百分比屬於常模參照：只描述在特定群體裡的位置，不能回答是否達到精熟或及格。申請、獎學金或認證若有指定算法與進位方式，以該單位公告為準。',
    reportTip: '可寫成：「該生在 40 人班級中排名第 6，前 15%，以中點法估算 PR＝86.25」，並註明參照群體為該班、未處理並列。',
    notes: [
      '工具只接受整數名次、整數總人數與並列人數；名次加上並列人數不得超過總人數。',
      '同分、跨班比較、缺考者是否列入分母，都要依資料提供者的規則處理。',
    ],
    sources: [
      {
        label: '大學甄選入學委員會：115 學年度大學繁星推薦招生簡章總則',
        href: 'https://www.cac.edu.tw/star115/appform_1.php',
        note: `該頁連結的 PDF《115 學年度大學「繁星推薦」招生簡章》：在校學業成績全校排名百分比、前 20/30/40/50% 門檻、百分比小者優先、同分參酌順序。${CHECKED}。`,
      },
      {
        label: '大學甄選入學委員會：115 學年度大學申請入學招生簡章總則',
        href: 'https://www.cac.edu.tw/apply115/appform_1.php',
        note: `該頁連結的 PDF《115 學年度大學「申請入學」招生簡章》：總則全文查不到「班級排名」「排名百分比」字樣。${CHECKED}。`,
      },
      {
        label: '國家教育研究院《教育大辭書》：百分等級',
        href: 'https://pedia.cloud.edu.tw/Entry/Detail/?title=%E7%99%BE%E5%88%86%E7%AD%89%E7%B4%9A',
        note: `把資料由小到大排序、分成一百等分，某數值位在第 r 個百分位置時，其百分等級為 r。${CHECKED}。`,
      },
      {
        label: 'Wikipedia: Percentile rank',
        href: 'https://en.wikipedia.org/wiki/Percentile_rank',
        note: `PR＝(CF−0.5×F)÷N×100；無並列時 CF＝N−r+1、F＝1，即本頁公式。${CHECKED}。`,
      },
      {
        label: 'Microsoft 支援：RANK.EQ 函數',
        href: 'https://support.microsoft.com/zh-tw/office/rank-eq-%E5%87%BD%E6%95%B8-284858ce-8ef6-450e-b662-26245be04a40',
        note: `重複的數字有相同排名，並影響後續數字的排名；Order 為 0 或省略為遞減排序。${CHECKED}。`,
      },
      {
        label: 'Microsoft 支援：COUNTIF 函數',
        href: 'https://support.microsoft.com/zh-tw/office/countif-%E5%87%BD%E6%95%B8-e0de10c6-f885-4e71-abb4-1f464816df34',
        note: `COUNTIF(range, criteria)；比較運算子要用雙引號並以 & 連接儲存格。${CHECKED}。`,
      },
    ],
    faq: [
      { q: '班排是什麼意思？', a: '你在自己班上的名次，第 1 名最好。換成百分比就是名次÷人數，例如 40 人第 6 名＝前 15%。' },
      { q: '班排前 10% 是第幾名？', a: '人數×10% 取整數部分：30 人到第 3 名、40 人到第 4 名、45 人到第 4 名（4.5 捨去小數）。更多人數見上方對照表。' },
      { q: '班排前 10% 等於 PR 90 嗎？', a: '不一定。PR＝100−前百分比＋50÷人數：40 人班第 4 名前 10.00%、PR 91.25；45 人班第 5 名 PR 剛好 90.00，但前 11.11%。' },
      { q: '繁星推薦看班排還是校排？', a: '115 學年度繁星推薦簡章總則寫的是「在校學業成績」全校排名百分比，全文查不到「班級排名」字樣。' },
      { q: '同名次怎麼算？', a: '把並列人數填進工具：三人並列第 6 名時 PR 由 86.25 降為 83.75。正式用途請依學校或簡章的同分規則。' },
    ],
    labels: {
      rank: '目前名次（r）',
      total: '總人數（N）',
      tied: '並列人數（含自己，1＝沒有並列）',
      calculate: '計算班排百分比',
      result: '百分等級（PR）',
      top: '前百分比（名次÷人數）',
      peopleAhead: '前面人數',
      peopleBehind: '後面人數',
      invalid: '名次、總人數與並列人數必須是正整數，且名次加上並列人數不可超過總人數。',
    },
    disclaimer: '本工具供教學與初步估算，不取代學校成績單或招生單位公告。申請、獎學金或認證請以簡章與受理單位公布的算法為準。',
    privacyNote: '所有輸入與計算都在你的瀏覽器內完成，不會上傳到 FunnyTools。',
  },
  en: {
    name: 'Class Rank Percentile Calculator',
    short: 'Enter your class rank and class size to get the top-percent figure and the percentile rank (PR); enter the number of tied students if several share a rank.',
    long: 'The defaults are the first worked example: rank 6 in a class of 40 is the top 15% and PR 86.25. To find out what rank the top 10% is, use the reverse box below the tool or the rank table.',
    seoTitle: 'Class Rank Percentile Calculator | Rank to Top % and PR',
    seoDescription: 'Convert class rank and class size to the top-percent figure and percentile rank (PR), with a tie option, a rank table and Excel formulas.',
    keywords: ['class rank percentile calculator', 'class rank percentage', 'rank to percentile', 'top 10 percent rank', 'percentile rank'],
    contentSections: [
      {
        heading: 'What class rank means as a percentage',
        paragraphs: ['Class rank is your position in the class, 1 being best. There are two ways to turn it into a percentage, and they run in opposite directions.'],
        items: [
          'Top percent = 100 × r ÷ N; smaller is better. Rank 6 of 40 is 6 ÷ 40 = 15%, the top 15%.',
          'Percentile rank (PR), midpoint method: PR = 100 × (N − r + 0.5) ÷ N; larger is better. Rank 6 of 40 gives 86.25.',
          'They differ by a small term: PR = 100 − top percent + 50 ÷ N.',
        ],
      },
      {
        heading: 'Worked examples',
        paragraphs: ['The classes below are made-up numbers for illustration; type the same values into the tool to reproduce them.'],
        items: [
          'Example 1 (tool default): rank 6 of 40: top 15%, PR 86.25, 5 students ahead and 34 behind.',
          'Example 2 (what is the top 10%?): in a class of 45, 45 × 10% = 4.5, so only rank 4 qualifies (4 ÷ 45 = 8.89%); rank 5 is 11.11% although its PR is exactly 90.00.',
          'Example 3 (whole school): rank 90 of 480 is the top 18.75%, PR 81.35.',
        ],
        link: { prefix: 'With the full score list and ties, use the ', label: 'percentile rank calculator', href: '/tools/percentile-rank-calculator/', suffix: '.' },
      },
      {
        heading: 'Rank needed for the top x%',
        paragraphs: ['Largest rank r with 100 × r ÷ N not above x; decimals are dropped, not rounded up.'],
        table: {
          caption: 'Largest rank inside the top x% (computed by the same function as the tool)',
          headers: ['Class size', 'Top 5%', 'Top 10%', 'Top 20%', 'Top 30%', 'Top 50%'],
          rows: rankTableRowsEn,
        },
      },
      {
        heading: 'Class rank versus school rank versus PR',
        paragraphs: ['Class rank compares you with your own class, school rank with the whole school (or the group a document names), and PR with whatever reference group you choose. Top percent: smaller is better; PR: larger is better. The same rank means different things in different groups: rank 6 is the top 15% of 40 students but the top 1.25% of 480.'],
      },
      {
        heading: 'Ties',
        paragraphs: ['Three students tied for 6th place leave 40 − (6 + 3 − 1) = 32 students behind, so PR = 100 × (32 + 1.5) ÷ 40 = 83.75 instead of 86.25. Schools handle ties differently; follow the school or the receiving organisation.'],
      },
      {
        heading: 'Class rank percentage in Excel',
        paragraphs: ['Scores in A2:A11 (95, 90, 90, 85, 80, 80, 80, 70, 65, 50), student in A6. Run in LibreOffice Calc: rank 5, top 50%, PR 45.'],
        snippets: [
          { label: 'Rank', code: '=RANK.EQ(A6,$A$2:$A$11,0)' },
          { label: 'Top percent', code: '=RANK.EQ(A6,$A$2:$A$11,0)/COUNT($A$2:$A$11)' },
          { label: 'PR with ties (midpoint)', code: '=(COUNTIF($A$2:$A$11,"<"&A6)+COUNTIF($A$2:$A$11,A6)/2)/COUNT($A$2:$A$11)*100' },
        ],
      },
    ],
    instructions: [
      'Enter your rank (1 is best) and the class or school size.',
      'If other students share your rank, enter the number of tied students including yourself (1 = no tie).',
      'Calculate to see the top percent and PR; use the reverse box to find the rank for a target top percent.',
    ],
    examples: [
      'Rank 6 of 40: top 15%, PR 86.25 (the default).',
      'In a class of 45 the top 10% ends at rank 4.',
      'Three students tied for 6th: PR falls from 86.25 to 83.75.',
    ],
    formula: {
      expression: 'Top % = 100 × r ÷ N; PR = 100 × (N − r + 0.5) ÷ N (no tie); PR = 100 × (N − r − t + 1 + t ÷ 2) ÷ N (t tied)',
      explanation: 'r is the rank (1 is best), N the group size and t the number of tied students. 0.5 places each rank at the midpoint of its percentile interval.',
    },
    educationApplication: 'Class rank percentages are norm-referenced: they describe position in one group, not mastery. For admissions or scholarships, follow the official method of the receiving organisation.',
    reportTip: 'Example: “The student ranked 6th in a class of 40 (top 15%); the midpoint-method percentile rank is 86.25.” State the reference group and that ties were not handled.',
    sources: [
      {
        label: 'College Admissions Selection Committee (Taiwan): 2026 Star Recommendation general rules (in Chinese)',
        href: 'https://www.cac.edu.tw/star115/appform_1.php',
        note: 'Uses the school-wide ranking percentage of in-school academic results; no class-rank wording. Checked 2026-10-17.',
      },
      {
        label: 'NAER Educational Encyclopedia: percentile rank (in Chinese)',
        href: 'https://pedia.cloud.edu.tw/Entry/Detail/?title=%E7%99%BE%E5%88%86%E7%AD%89%E7%B4%9A',
        note: 'Definition by hundredths of the ordered data. Checked 2026-10-17.',
      },
      {
        label: 'Wikipedia: Percentile rank',
        href: 'https://en.wikipedia.org/wiki/Percentile_rank',
        note: 'PR = (CF − 0.5F) ÷ N × 100. Checked 2026-10-17.',
      },
    ],
    faq: [
      { q: 'What rank is the top 10%?', a: 'Class size × 10%, dropping the decimals: rank 3 of 30, rank 4 of 40 and of 45.' },
      { q: 'Is the top 10% the same as PR 90?', a: 'Not exactly. PR = 100 − top percent + 50 ÷ N, so rank 4 of 40 is the top 10.00% with PR 91.25.' },
      { q: 'How are ties handled?', a: 'Enter the number of tied students; three tied for 6th of 40 gives PR 83.75.' },
    ],
    labels: {
      rank: 'Rank (r)',
      total: 'Group size (N)',
      tied: 'Tied students (including you; 1 = no tie)',
      calculate: 'Calculate rank percentage',
      result: 'Percentile rank (PR)',
      top: 'Top percent (rank ÷ size)',
      peopleAhead: 'Students ahead',
      peopleBehind: 'Students behind',
      invalid: 'Rank, size and tied count must be positive whole numbers, and rank plus tied count cannot exceed the size.',
    },
    disclaimer: 'For teaching and preliminary estimates. For admissions or scholarships follow the method published by the receiving organisation.',
    privacyNote: 'All input and calculation stays in your browser and is not uploaded to FunnyTools.',
  },
} satisfies Record<Locale, ToolContent>;

