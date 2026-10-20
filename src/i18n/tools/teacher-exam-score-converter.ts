import type { Locale } from '../../config/site';
import type { ToolContent } from './_types';

const CHECKED = '查核日期 2026-10-17';

// Weights quoted below come from three 115-school-year recruitment notices opened on 2026-10-17; the worked
// examples use hypothetical scores. tests/p2-core-pages.test.mjs re-derives every number with the same
// weightedMean()/roundHalfUp()/tScoreFrom() the page and the tool use.

export default {
  zh: {
    name: '教師甄試成績計算器',
    short: '輸入筆試、試教、口試的分數與配分，算出加權總成績並四捨五入到小數 2 位；各縣市規定一律以當年度簡章為準。',
    long: '預設值是第一個算例：配分 40／30／30（教育部受託辦理 115 學年度公立高中簡章國文科的配分結構），筆試 78、試教 85、口試 82，總成績 81.3。臺北市複試只看試教與口試，按「臺北市複試 60/40」把筆試權重設為 0。',
    seoTitle: '教甄分數換算與成績計算器｜筆試試教口試配分加權、T分數',
    seoDescription: '教甄分數換算與教師甄試成績計算器：輸入筆試、試教、口試分數與配分算出加權總成績，附115學年度簡章原文、T分數標準化算例與Excel公式。',
    keywords: ['教甄分數換算', '教甄成績計算', '教師甄試成績換算', '教甄配分', '教甄總成績', '教師甄選 T分數', '教甄 筆試 試教 口試 比例', '教師甄試加權'],
    contentSections: [
      {
        heading: '教甄成績怎麼算：總成績＝各項成績×配分比例',
        paragraphs: [
          '教師甄試總成績最基本的算法，是各項成績乘上配分比例後相加，也就是加權平均：總成績＝Σ(成績×配分)÷Σ配分。NIST Dataplot 手冊把加權平均寫成 Σwᵢxᵢ÷Σwᵢ，權重 wᵢ 就是這裡的配分。',
          '教育部受託辦理 115 學年度公立高級中等學校教師甄選簡章的原文是：「總成績計算，係依該科別(分區報名則依其區域別)初試、複試各項成績配分比例計算總成績，滿分 100 分；並以四捨五入法取至小數點後 2 位數」。以下算例的成績是為了示範算法而設定的假設數字，配分取自該簡章附件 B 的國文科與地理科。',
        ],
        items: [
          '算例一（工具預設值）：國文科配分為初試筆試 40%、複試口試 30%、試教 30%。筆試 78、試教 85、口試 82：78×0.4＋85×0.3＋82×0.3＝31.2＋25.5＋24.6＝81.3。',
          '算例二（同樣的成績、不同的配分）：地理科配分為筆試 40%、口試 20%、試教 40%。同樣是筆試 78、試教 85、口試 82：31.2＋85×0.4＋82×0.2＝31.2＋34＋16.4＝81.6。試教權重從 30% 變 40%，總分差了 0.3。',
          '本頁假設各項成績都以 100 分為滿分再乘配分。若你的成績單某一項滿分不是 100（例如試教滿分 50、得 42），先換算成 100 分制：42÷50×100＝84，再放進工具。',
        ],
      },
      {
        heading: '各縣市與各科別的配分不一樣：以當年度簡章為準',
        paragraphs: [
          '各縣市、各科別的配分、門檻與同分比序都不同，每年也可能調整，一律以你報考那一年的簡章為準。下表只列本站 2026-10-17 實際打開的三份 115 學年度簡章原文，用來示範三種不同的結構，不代表你報考的縣市。',
        ],
        table: {
          caption: '115 學年度三份簡章的計分規定（摘錄原文）',
          headers: ['簡章', '總成績怎麼組成', '門檻與其他'],
          rows: [
            ['教育部受託辦理 115 學年度公立高級中等學校教師甄選簡章（國文科，附件 B）', '初試筆試 40%；複試口試 30%、試教 30%', '總成績滿分 100 分，四捨五入取至小數點後 2 位；總成績相同時依序比身心障礙證明、原住民族語能力認證、技術士證等，再依筆試、實作、試教、口試逐次比序'],
            ['同一簡章（地理科，附件 B）', '初試筆試 40%；複試口試 20%、試教 40%', '同上；各科別的配分請看附件 B 的各科列'],
            ['臺北市 115 學年度公立國民小學教師聯合甄選簡章（1150317 更新版，普通科）', '「初試成績僅作為初試通過門檻，不併入複試成績」；複試：教學演示 60%（兩場教學演示各 30%）、口試 40%', '複試各項教學演示或口試原始分數未達 70 分者不予錄取；初試錄取人數超過 10 人時得分組，並以加權 T 分數校正'],
            ['臺北市 115 學年度市立國民中學正式教師聯合甄選簡章（一般類科）', '複試：試教佔總分 60%、口試佔總分 40%；初試成績僅作為通過門檻，不併入複試成績', '「成績以原始分數轉換成常態化標準分數（T 分數）計算」；複試任一項目原始分數未達 70 分者不予錄取'],
          ],
          note: '以上只是三份簡章的摘錄，其他縣市與其他年度的規定本站沒有逐一查證，請以當年度簡章為準。',
        },
      },
      {
        heading: '初試不算進總成績時怎麼用：配分與權重',
        paragraphs: [
          '臺北市的兩份簡章都寫初試成績只作為通過門檻、不併入複試成績。這種情況把工具的「筆試權重」填 0，只留試教（或教學演示）與口試，或直接按「臺北市複試 60/40」。權重填 0 的項目不影響總分。',
          '算例三（臺北市國小普通科的結構）：兩場教學演示各 30%、口試 40%。兩場教學演示得 85 與 84，口試 81：85×30%＋84×30%＋81×40%＝25.5＋25.2＋32.4＝83.1。放進工具時，教學演示填兩場平均 84.5、權重 60，口試 81、權重 40，同樣得 83.1。',
          '權重加起來不是 100 時，工具仍照實際權重總和當分母計算，並顯示警告；也可以按「自動正規化權重」換成合計 100 的比例。40、30、30 與 0.4、0.3、0.3 結果相同，但不能把 40 與 0.3 混在同一份裡。',
        ],
      },
      {
        heading: '簡章寫「T 分數」時：標準化怎麼影響總成績',
        paragraphs: [
          '臺北市國中簡章寫明成績「以原始分數轉換成常態化標準分數（T 分數）計算」，國小簡章也提到分組時以加權 T 分數校正。簡章原文只寫了名稱，沒有公布換算公式，而且換算需要全體應考人的成績分布，考生通常無法自己精確複算。',
          '國家教育研究院《教育大辭書》說明，T 分數是以高於或低於平均幾個標準差表示相對地位的標準分數；常態化 T 分數先把百分等級轉成標準常態分配的 z，再以 T＝10z＋50 換算，線性轉換的 T 分數則保留原始分數的分配形狀。下面用較簡單的線性 T 分數（T＝50＋10z）示範標準化為什麼會改變排序，這只是概念示範，不是任何簡章的實際算式。',
        ],
        items: [
          '假設試教全體平均 80、標準差 5，口試全體平均 85、標準差 10（假設數字），配分 60／40。甲試教 90、口試 80：T 分別是 70 與 45。乙試教 84、口試 92：T 分別是 58 與 57。',
          '直接用原始分數加權：甲 0.6×90＋0.4×80＝86，乙 0.6×84＋0.4×92＝87.2，乙較高。先標準化再加權：甲 0.6×70＋0.4×45＝60，乙 0.6×58＋0.4×57＝57.6，甲較高。同樣的兩個人，順序反過來。',
          '原因是各項成績的分散程度不同：試教分數集中（標準差 5），甲的 90 分距離平均 2 個標準差；口試分數分散（標準差 10），乙的 92 分只高於平均 0.7 個標準差。',
          '本工具做的是原始分數直接加權，不做標準化。簡章規定要標準化時，結果會與本工具不同，請以主辦單位公布的成績為準。',
        ],
        link: {
          prefix: '想自己練習原始分數與 T 分數的換算，用',
          label: 'T 分數計算器',
          href: '/tools/t-score-calculator/',
          suffix: '。',
        },
      },
      {
        heading: '簡章裡工具沒有處理的規則',
        paragraphs: [
          '正式錄取還有很多規則，本工具都沒有算進去，使用時要逐項對照簡章：',
        ],
        items: [
          '最低門檻：臺北市兩份簡章都寫複試任一項目原始分數未達 70 分者不予錄取；總分再高也沒有用。',
          '加分：教育部受託簡章寫身心障礙應考人「成績以原始分數加2%計算，並以四捨五入法取至小數點後2位數」，其他加分各縣市不同。',
          '同分比序：教育部受託簡章先比身心障礙證明、原住民族語能力認證、技術士證等，再依筆試、實作、試教、口試逐次比序；臺北市國小則以教學演示、口試成績高者優先。工具只顯示總成績，不會幫你排名次。',
          '缺額與不足額錄取：簡章寫的是按缺額與最低錄取標準錄取，成績高不保證錄取。',
        ],
      },
      {
        heading: '四捨五入取到小數第幾位',
        paragraphs: [
          '教育部受託簡章寫總成績「並以四捨五入法取至小數點後 2 位數」。工具除了顯示完整的加權結果（最多 3 位小數），也多列一格「取到小數 2 位」。算例四：筆試 79.35、試教 84.25、口試 81.5，配分 40／30／30：(79.35×40＋84.25×30＋81.5×30)÷100＝8146.5÷100＝81.465，四捨五入到小數 2 位是 81.47。',
          '各縣市要取到小數幾位、是每項先取位還是最後才取位，簡章可能不同，請以當年度簡章為準；兩位考生只差 0.001 分時，不要用任何試算工具判定名次。',
        ],
      },
      {
        heading: '想考到目標分，另一項要幾分',
        paragraphs: [
          '已知目標總分與其他項目，可以反推最後一項需要的分數：需要的分數＝(目標總分−其他項目成績×配分)÷該項配分。算例五：目標 85、筆試 78（40%）、口試 82（30%），試教要 (85−31.2−24.6)÷0.3＝97.33 分。目標改成 90：(90−31.2−24.6)÷0.3＝114，超過 100 分，在這組成績下無法達成。',
        ],
        link: {
          prefix: '一般課程成績的反推，可以用',
          label: '加權平均計算器',
          href: '/tools/weighted-average-calculator/',
          suffix: '。',
        },
      },
      {
        heading: 'Excel 怎麼算教甄加權總成績',
        paragraphs: [
          '假設三項成績放在 B2:B4（78、85、82），配分（百分比的數字）放在 C2:C4（40、30、30）。Microsoft 說明：SUMPRODUCT 傳回對應範圍乘積的總和，各陣列必須有相同的維度。ROUND(number, num_digits) 的 num_digits 大於 0 時四捨五入到指定的小數位數。下面的公式已用 LibreOffice Calc 實際執行驗算（函數名稱與 Excel 相同）。',
        ],
        snippets: [
          { label: '加權總成績 → 81.3', code: '=SUMPRODUCT(B2:B4,C2:C4)/SUM(C2:C4)' },
          { label: '四捨五入到小數 2 位（算例四的資料得 81.47）', code: '=ROUND(SUMPRODUCT(B2:B4,C2:C4)/SUM(C2:C4),2)' },
          { label: '試教要幾分才達到目標（目標在 E1，筆試在 B2、口試在 B4，配分在 C2:C4）→ 算例五 97.33', code: '=(E1-(B2*C2+B4*C4)/100)/C3*100' },
        ],
      },
      {
        heading: '教甄成績試算常見錯誤',
        paragraphs: [],
        items: [
          '把預設的 40／30／30 當成你報考縣市的規定：預設值只是示範，請改成當年度簡章的配分。',
          '以為各縣市都一樣：同樣是 115 學年度，教育部受託簡章、臺北市國小與國中的結構就各不相同。',
          '初試只作門檻卻仍把筆試算進總分：簡章寫不併入時，筆試權重要填 0。',
          '忘了單項門檻與同分比序：總成績算對了，仍可能因為某一項未達門檻而不錄取。',
          '把簡章要求標準化的成績直接加權：結果可能與正式成績不同，順序也可能不同。',
          '用試算結果預測錄取：缺額、其他考生成績與最低錄取標準都會影響結果。',
        ],
      },
    ],
    instructions: [
      '輸入筆試、試教、口試的分數，並依當年度簡章填入配分；不計入總成績的項目，權重填 0。',
      '可以按「高中國文科配分 40/30/30」或「臺北市複試 60/40」快速套用配分結構，成績仍要自己填。',
      '確認權重總和是 100 後計算，看加權總成績與計算明細，必要時複製結果。',
    ],
    examples: [
      '國文科配分 40／30／30，筆試 78、試教 85、口試 82：總成績 81.3（預設值）。',
      '臺北市複試結構：筆試權重填 0，試教 60、口試 40。',
      '比較試教權重 30% 與 40% 對總分的影響：同樣成績差 0.3 分。',
    ],
    formula: {
      expression: '總成績＝Σ(各項成績×各項配分)÷Σ配分',
      explanation: '本工具使用一般加權平均，各項成績以 100 分為滿分。若簡章另有門檻、倍率、標準化（T 分數）、加分或不同的四捨五入順序，必須另外套用，結果可能與工具不同。',
    },
    educationApplication: '可用於備考情境分析，例如估算筆試固定時試教提升 5 分對總成績的影響。正式結果仍須依主辦單位簡章、最低門檻及同分比序規則。',
    reportTip: '若用於備考紀錄，可寫成：「依筆試 40%、試教 30%、口試 30% 模擬，加權總成績為 81.3。」並註明這是情境估算，不是正式成績。',
    notes: [
      '各縣市、各科別、各年度的規定不同，一律以當年度簡章為準。',
      '本工具不處理單項門檻、加分、同分比序與標準化。',
    ],
    sources: [
      {
        label: '教育部受託辦理 115 學年度公立高級中等學校教師甄選簡章（國立臺灣師範大學教師甄選網站）',
        href: 'https://tecs.otecs.ntnu.edu.tw/upload/ips/news_ips/news_115/news_115_4_7.pdf',
        note: `玖、總成績計算（配分比例、滿分 100 分、四捨五入取至小數點後 2 位、同分比序）；陸、二（四）複試成績採計；柒與附件 B 各科配分（國文科 40/30/30、地理科 40/20/40）；身心障礙加 2%。${CHECKED}。`,
      },
      {
        label: '臺北市 115 學年度公立國民小學教師聯合甄選簡章（1150317 更新版，臺北市政府教育局）',
        href: 'https://primary.tp.edu.tw/Home/AnnDownload?id=3&file=%E8%87%BA%E5%8C%97%E5%B8%82115%E5%AD%B8%E5%B9%B4%E5%BA%A6%E5%85%AC%E7%AB%8B%E5%9C%8B%E6%B0%91%E5%B0%8F%E5%AD%B8%E6%95%99%E5%B8%AB%E8%81%AF%E5%90%88%E7%94%84%E9%81%B8%E7%B0%A1%E7%AB%A0%28%E6%9B%B4%E6%AD%A3%E5%85%AC%E5%91%8A%E7%89%88%29_1150317.pdf',
        note: `初試僅作通過門檻；複試成績計算（普通科教學演示 60%、口試 40%）；複試各項未達 70 分不予錄取；分組時以加權 T 分數校正。${CHECKED}。`,
      },
      {
        label: '臺北市 115 學年度市立國民中學正式教師聯合甄選簡章（臺北市政府教育局）',
        href: 'https://www-ws.gov.taipei/Download.ashx?u=LzAwMS9VcGxvYWQvMzQyL3JlbGZpbGUvMTAxNzMvOTU1ODczNy82MzhjOWZlZi0xYWU4LTQzODItYWI4Yy1jZGNkYzE4MGUyZDEucGRm&n=6Ie65YyX5biCMTE15a245bm05bqm5biC56uL5ZyL5rCR5Lit5a245q2j5byP5pWZ5bir6IGv5ZCI55SE6YG457Ch56ugLeWFrOWRiueJiC5wZGY%3D&icon=..pdf',
        note: `複試成績計算（試教 60%、口試 40%、原始分數轉換成常態化標準分數（T 分數））；複試任一項目未達 70 分不予錄取。${CHECKED}。`,
      },
      {
        label: '國家教育研究院《教育大辭書》：T分數',
        href: 'https://pedia.cloud.edu.tw/Entry/Detail/?title=T%E5%88%86%E6%95%B8',
        note: `T 分數是標準分數；常態化 T 分數 T＝10zn＋50（zn 由百分等級轉成標準常態 z）；直線轉換的 T 分數保留原始分配形狀。${CHECKED}。`,
      },
      {
        label: 'NIST Dataplot Reference Manual：WEIGHTED MEAN',
        href: 'https://www.itl.nist.gov/div898/software/dataplot/refman2/ch2/weigmean.pdf',
        note: `加權平均 xw＝Σwᵢxᵢ÷Σwᵢ。${CHECKED}。`,
      },
      {
        label: 'Microsoft 支援：SUMPRODUCT 函數',
        href: 'https://support.microsoft.com/zh-tw/excel/functions/sumproduct-function',
        note: `傳回對應範圍或陣列之乘積的總和；各陣列維度必須相同，否則 #VALUE!。${CHECKED}。`,
      },
      {
        label: 'Microsoft 支援：ROUND 函數',
        href: 'https://support.microsoft.com/zh-tw/excel/functions/round-function',
        note: `ROUND(number, num_digits)；num_digits 大於 0 時四捨五入到指定小數位數。${CHECKED}。`,
      },
    ],
    faq: [
      { q: '教甄總成績怎麼算？', a: '各項成績乘上配分比例後相加。例如筆試 78 占 40%、試教 85 占 30%、口試 82 占 30%：31.2＋25.5＋24.6＝81.3。' },
      { q: '各縣市的配分一樣嗎？', a: '不一樣。教育部受託 115 學年度高中簡章國文科是筆試 40%、口試 30%、試教 30%；臺北市國小與國中的複試則只看教學演示（試教）60%、口試 40%。一律以當年度簡章為準。' },
      { q: '初試成績不算進總分時怎麼辦？', a: '把筆試權重填 0，只留複試的項目，或按「臺北市複試 60/40」。' },
      { q: '簡章寫 T 分數，工具會算嗎？', a: '不會。本工具是原始分數直接加權；標準化需要全體應考人的分布，結果可能與正式成績不同，順序也可能不同。' },
      { q: '可以拿來預測錄取嗎？', a: '不建議。缺額、單項門檻、同分比序與其他考生成績都會影響結果。' },
    ],
    labels: {
      written: '筆試成績',
      writtenWeight: '筆試權重（%）',
      interview: '口試成績',
      interviewWeight: '口試權重（%）',
      teaching: '試教（教學演示）成績',
      teachingWeight: '試教權重（%）',
      calculate: '計算加權總成績',
      result: '加權總成績',
      rounded2: '取到小數 2 位（四捨五入）',
      weightTotal: '權重總和',
      breakdown: '計算明細',
      presetHs: '套用高中國文科配分 40/30/30',
      presetTaipei: '套用臺北市複試 60/40（筆試權重 0）',
      autoNormalize: '自動正規化權重',
      copyResult: '複製結果',
      copied: '已複製',
      weightWarning: '權重總和不是 100%。請對照簡章修正權重，或使用自動正規化。',
      invalid: '請輸入有效成績與非負權重，且至少一項權重大於 0。',
    },
    disclaimer: '本工具供備考情境試算，不是正式成績。各縣市、各科別與各年度的配分、門檻、加分與同分比序請以當年度簡章為準。',
    privacyNote: '所有輸入與計算都在你的瀏覽器內完成，不會上傳到 FunnyTools。',
  },
  en: {
    name: 'Teacher Exam Score Calculator',
    short: 'Enter written, teaching-demo and interview scores with their weights to get the weighted total, rounded to two decimals; each county’s rules are those of the current year’s notice.',
    long: 'The defaults are the first worked example: weights 40/30/30 (the structure of the Chinese-language subject in the Ministry-commissioned 2026 senior-high recruitment notice) with scores 78, 85 and 82, total 81.3. Taipei’s second stage counts only the demo and the interview: use the Taipei preset, which sets the written weight to 0.',
    seoTitle: 'Teacher Exam Score Calculator | Weighted Total and T Scores',
    seoDescription: 'Weighted total for Taiwan teacher-recruitment exams from written, teaching-demo and interview scores, with 2026 notice excerpts, a T score example and Excel formulas.',
    keywords: ['teacher exam score calculator', 'teacher recruitment weighted score', 'Taiwan teacher exam scoring', 'T score exam'],
    contentSections: [
      {
        heading: 'How the total is calculated',
        paragraphs: ['The total is usually the sum of each score times its weight: Σ(score × weight) ÷ Σweight, a weighted mean (NIST Dataplot gives Σwᵢxᵢ ÷ Σwᵢ). The Ministry-commissioned 2026 senior-high notice says the total is computed from the first-stage and second-stage items by their weights, out of 100 and rounded half up to two decimals. Scores below are made up; weights come from that notice’s annex B.'],
        items: [
          'Example 1 (default, Chinese subject 40/30/30): 78 × 0.4 + 85 × 0.3 + 82 × 0.3 = 31.2 + 25.5 + 24.6 = 81.3.',
          'Example 2 (geography 40/20/40, same scores): 31.2 + 34 + 16.4 = 81.6.',
          'The tool assumes every item is scored out of 100; if an item has another maximum, convert it first (42 out of 50 is 84).',
        ],
      },
      {
        heading: 'Rules differ by county, subject and year',
        paragraphs: ['Follow the notice for your year. The three 2026 notices opened on 2026-10-17 show three structures: Ministry-commissioned senior high (written 40%, oral and demo 30% each for Chinese), Taipei elementary (first stage only a pass threshold; second stage demo 60%, oral 40%) and Taipei junior high (demo 60%, oral 40%, scores converted to normalised standard scores, T scores). Taipei sets a floor of 70 on each second-stage item. Other counties and years were not checked.'],
      },
      {
        heading: 'When a notice uses T scores',
        paragraphs: ['Standardising first and weighting afterwards can reverse a ranking. With demo mean 80, SD 5 and oral mean 85, SD 10 (made-up numbers) and weights 60/40, candidate A (90, 80) has raw total 86 and candidate B (84, 92) has 87.2, but with linear T scores A gets 0.6 × 70 + 0.4 × 45 = 60 and B gets 0.6 × 58 + 0.4 × 57 = 57.6. This tool weights raw scores only and does not standardise.'],
        link: { prefix: 'To practise the conversion, use the ', label: 'T score calculator', href: '/tools/t-score-calculator/', suffix: '.' },
      },
      {
        heading: 'Rounding and Excel',
        paragraphs: ['Example 4: 79.35, 84.25 and 81.5 with weights 40/30/30 give 8146.5 ÷ 100 = 81.465, which rounds to 81.47. In Excel, scores in B2:B4 and weights in C2:C4:'],
        snippets: [
          { label: 'Weighted total', code: '=SUMPRODUCT(B2:B4,C2:C4)/SUM(C2:C4)' },
          { label: 'Rounded to two decimals', code: '=ROUND(SUMPRODUCT(B2:B4,C2:C4)/SUM(C2:C4),2)' },
        ],
      },
      {
        heading: 'What the tool does not handle',
        paragraphs: ['Per-item thresholds, bonus points, tie-break order, vacancies and standardisation are not modelled. Check each against the notice.'],
      },
    ],
    instructions: [
      'Enter the written, teaching-demo and interview scores and the weights from the current notice; use weight 0 for an item that does not count.',
      'Optionally apply the 40/30/30 or Taipei 60/40 weight structure; the scores stay yours.',
      'Check that the weights total 100 and calculate; copy the result if needed.',
    ],
    examples: [
      'Chinese subject 40/30/30 with scores 78, 85, 82: total 81.3 (default).',
      'Taipei second-stage structure: written weight 0, demo 60, oral 40.',
      'Compare a 30% with a 40% teaching weight: 0.3 points apart for the same scores.',
    ],
    formula: {
      expression: 'Total = Σ(score × weight) ÷ Σweight',
      explanation: 'A general weighted mean with every item out of 100. Thresholds, multipliers, standardisation, bonus points and different rounding orders must be applied separately.',
    },
    educationApplication: 'Useful for scenario analysis, such as how a five-point rise in the teaching demo changes the total. Official results depend on the current notice.',
    reportTip: 'For a preparation record: “Using weights of 40% written, 30% teaching and 30% interview, the simulated total was 81.3.” Label it a scenario estimate.',
    sources: [
      {
        label: 'Ministry-commissioned 2026 senior-high teacher recruitment notice (in Chinese)',
        href: 'https://tecs.otecs.ntnu.edu.tw/upload/ips/news_ips/news_115/news_115_4_7.pdf',
        note: 'Total score rule, rounding, annex B weights. Checked 2026-10-17.',
      },
      {
        label: 'Taipei 2026 elementary teacher recruitment notice (in Chinese)',
        href: 'https://primary.tp.edu.tw/Home/AnnDownload?id=3&file=%E8%87%BA%E5%8C%97%E5%B8%82115%E5%AD%B8%E5%B9%B4%E5%BA%A6%E5%85%AC%E7%AB%8B%E5%9C%8B%E6%B0%91%E5%B0%8F%E5%AD%B8%E6%95%99%E5%B8%AB%E8%81%AF%E5%90%88%E7%94%84%E9%81%B8%E7%B0%A1%E7%AB%A0%28%E6%9B%B4%E6%AD%A3%E5%85%AC%E5%91%8A%E7%89%88%29_1150317.pdf',
        note: 'Second-stage weights and the 70-point floor. Checked 2026-10-17.',
      },
      {
        label: 'NAER Educational Encyclopedia: T score (in Chinese)',
        href: 'https://pedia.cloud.edu.tw/Entry/Detail/?title=T%E5%88%86%E6%95%B8',
        note: 'Linear versus normalised T scores. Checked 2026-10-17.',
      },
      {
        label: 'NIST Dataplot Reference Manual: WEIGHTED MEAN',
        href: 'https://www.itl.nist.gov/div898/software/dataplot/refman2/ch2/weigmean.pdf',
        note: 'Weighted mean definition. Checked 2026-10-17.',
      },
    ],
    faq: [
      { q: 'Are the weights the same in every county?', a: 'No. Always use the weights of the notice for your year; the default 40/30/30 is only an example.' },
      { q: 'What if the first stage does not count?', a: 'Set the written weight to 0 and keep the second-stage items.' },
      { q: 'Does the tool standardise scores?', a: 'No. It weights raw scores directly, which can differ from official results when a notice uses T scores.' },
    ],
    labels: {
      written: 'Written score',
      writtenWeight: 'Written weight (%)',
      interview: 'Interview score',
      interviewWeight: 'Interview weight (%)',
      teaching: 'Teaching demo score',
      teachingWeight: 'Teaching weight (%)',
      calculate: 'Calculate weighted total',
      result: 'Weighted total',
      rounded2: 'Rounded to 2 decimals (half up)',
      weightTotal: 'Weight total',
      breakdown: 'Calculation breakdown',
      presetHs: 'Use senior-high Chinese 40/30/30',
      presetTaipei: 'Use Taipei second stage 60/40 (written 0)',
      autoNormalize: 'Auto-normalize weights',
      copyResult: 'Copy result',
      copied: 'Copied',
      weightWarning: 'Weights do not total 100%. Adjust them to the notice or use auto-normalize.',
      invalid: 'Enter valid scores and nonnegative weights, with at least one positive weight.',
    },
    disclaimer: 'For preparation scenarios only; not an official score. Weights, thresholds, bonus points and tie-breaks follow the current year’s notice.',
    privacyNote: 'All input and calculation stays in your browser and is not uploaded to FunnyTools.',
  },
} satisfies Record<Locale, ToolContent>;
