import type { Locale } from '../config/site';
import type { Category } from '../data/categories';
import type { ToolContent } from '../i18n/tools/_types';

export interface ContentValueReview {
  heading: string;
  intro: string;
  panels: { title: string; text: string }[];
  checklistHeading: string;
  checklist: string[];
  reviewedLabel: string;
  reviewedAt: string;
}

export const CONTENT_REVIEWED_AT = '2026-07-27';
const reviewedAt = CONTENT_REVIEWED_AT;

function first(items: string[] | undefined, fallback: string): string {
  return items?.find((item) => item.trim().length > 0) ?? fallback;
}

function last(items: string[] | undefined, fallback: string): string {
  return [...(items ?? [])].reverse().find((item) => item.trim().length > 0) ?? fallback;
}

const categoryLens: Record<string, Record<Locale, string>> = {
  money: {
    zh: '金額、利率、期間、單位與四捨五入方式都會改變結果；正式金額還會受到合約、法規、稅費與個人條件影響。',
    en: 'Amounts, rate periods, units, and rounding can all change the result. Binding figures may also depend on contracts, current rules, fees, taxes, and personal circumstances.',
  },
  time: {
    zh: '日期邊界、時區、是否包含起訖日、背景分頁節流與地區假日，是時間工具最常見的誤差來源。',
    en: 'Date boundaries, time zones, inclusive dates, background-tab throttling, and regional holidays are the most common sources of timing differences.',
  },
  random: {
    zh: '隨機結果適合日常分配與活動輔助，但不等於公證抽獎、統計抽樣設計或不可更動的決策。',
    en: 'Random output is useful for everyday allocation and activities, but it is not a certified draw, a complete sampling design, or an unchangeable decision.',
  },
  text: {
    zh: '換行、Unicode、標點、編碼與目的平台的格式規則，都可能讓同一段文字得到不同的整理結果。',
    en: 'Line endings, Unicode, punctuation, encoding, and destination-platform rules can change how the same text is counted, cleaned, or formatted.',
  },
  image: {
    zh: '像素尺寸、檔案格式、透明度、壓縮品質與目的平台限制必須分開檢查；轉檔不會補回原圖沒有的細節。',
    en: 'Pixel dimensions, format, transparency, compression quality, and destination limits need separate checks. Conversion cannot restore detail missing from the source.',
  },
  pdf: {
    zh: '頁數、頁序、表單、書籤、字型、簽章與加密狀態都可能影響 PDF 輸出；重要檔案必須保留原始版本。',
    en: 'Page count, order, forms, bookmarks, fonts, signatures, and encryption can affect PDF output. Important documents always need an untouched original.',
  },
  draw: {
    zh: '畫布尺寸、座標、匯出格式、列印比例與後續編輯需求要先確定，避免完成後才發現輸出不適用。',
    en: 'Canvas size, coordinates, export format, print scale, and later editing needs should be decided before relying on a drawing output.',
  },
  study: {
    zh: '名單、評分規則、課堂安全與個別需求仍需要教師或使用者判斷，工具只能協助產生初稿或整理紀錄。',
    en: 'Lists, grading rules, classroom safety, and individual needs still require teacher or user judgment; a tool can only produce a draft or organize records.',
  },
  statistics: {
    zh: '樣本品質、尺度定義、缺失值、公式假設與報告脈絡會共同決定統計結果是否可解讀。',
    en: 'Sample quality, scale definitions, missing values, formula assumptions, and reporting context jointly determine whether a statistical result is interpretable.',
  },
};

export interface ToolValueReviewOverride {
  heading?: string;
  intro: string;
  panels: [
    { title: string; text: string },
    { title: string; text: string },
    { title: string; text: string },
  ];
  checklistHeading?: string;
  checklist: string[];
  reviewedAt?: string;
}

/**
 * Hand-written, tool-specific replacements for the auto-generated "verification method"
 * block. Populated only for pages that have been individually reviewed against their
 * component source so the baseline case, boundary case, and checklist are true for that
 * exact tool instead of interpolated into a shared sentence template. Keyed by `${lang}:${slug}`.
 * See Company Vault 03_Incidents for the 2026-08-01 scaled-content-abuse remediation.
 */
const toolValueReviewOverrides: Partial<Record<string, ToolValueReviewOverride>> = {
  'zh:t-score-calculator': {
    intro: '這一段只針對 T 分數計算器本身：它只接受一個 Z 分數欄位，不會重新計算原始分數、平均數或標準差，也不會限制輸出範圍。',
    panels: [
      {
        title: '先用課本例題核對公式',
        text: '輸入 Z = 1.2，公式為 T = 50 + 10 × Z，應得到 T = 62；同時頁面會顯示「Z 分數」欄位回填 1.2 與「高於平均」的相對位置文字。若你手上只有原始分數、平均數與標準差，要先自行算出 Z = (原始分數 − 平均數) ÷ 標準差，再貼進本頁，本頁不會替你做這一步。',
      },
      {
        title: '測試極端 Z 值會發生什麼事',
        text: '輸入 Z = 0 應得到 T = 50（代表剛好等於參照群體平均）。再試 Z = −6 這種現實中少見的極端值：頁面會照樣算出 T = −10，因為程式沒有把 T 分數夾在 0～100 之間，極端輸入不會被擋下或提示可疑，需要使用者自行判斷是否合理。',
      },
      {
        title: '換算前先確認量尺定義一致',
        text: '本頁固定使用「平均 50、標準差 10」這一種 T 分數定義，教育與心理測驗常見但不是唯一標準（例如有些量表用不同平均或方向）。正式使用前，請對照原始測驗手冊或主辦單位公告的常模與轉換規則，確認與本頁公式相符，再把結果填入正式報告。',
      },
    ],
    checklist: [
      '輸入框裡填的必須已經是 Z 分數，不是原始分數、平均數或標準差本身。',
      '用 T = 50 + 10 × Z 手動複算一次，確認與頁面顯示的 T 分數一致。',
      '確認測驗手冊或主辦單位採用的正是「平均 50、標準差 10」這個定義，而非其他量尺。',
      '若換算出的 T 分數明顯偏離 0～100（例如負值），先檢查輸入的 Z 值是否合理，頁面本身不會攔截。',
    ],
  },
  'zh:grade-average': {
    intro: '這一段用「成績平均計算器強化版」實際的兩種輸出（未加權平均、加權平均）示範怎麼核對，而不是抽象規則。',
    panels: [
      {
        title: '先用三科加權成績核對公式',
        text: '刪除頁面預設的兩列，改成三列：82 分（權重 0.5）、88 分（權重 0.3）、90 分（權重 0.2），加權平均應顯示 85.4（82×0.5+88×0.3+90×0.2）。同一組資料的「未加權平均」則是 (82+88+90)÷3 ≈ 86.67，兩個數字本來就會不同，不是計算錯誤。',
      },
      {
        title: '權重留空或填 0 的那一列會怎麼算',
        text: '再加一列：70 分、權重留空（或填 0）。這一列的分數仍會被算進「未加權平均」的總筆數與總和，但會被整列排除在「加權平均」之外——不是以「權重 0、貢獻 0 分」的方式參與。如果沒注意到這個差異，可能會誤以為兩個平均數應該連動變化。',
      },
      {
        title: '匯出後用試算表交叉核對',
        text: '按「匯出 CSV」下載的檔案帶 UTF-8 BOM，用 Excel 或 Google 試算表開啟不會出現亂碼中文；打開後用 SUM／SUMPRODUCT 公式重算一次總分與加權平均，確認與頁面顯示的數字一致，再把結果用於正式成績單。',
      },
    ],
    checklistHeading: '完成前檢查清單',
    checklist: [
      '未輸入分數的列不會被計入任何一種平均。',
      '權重留空或為 0 的列只從「加權平均」剔除，仍計入「未加權平均」——先確認你要看的是哪一個數字。',
      '加權平均＝Σ(分數×權重)÷Σ權重，已用一組已知答案的資料核對過。',
      '匯出的 CSV 已重新開啟確認欄位與中文字元正常，才用於正式用途。',
    ],
  },
  'zh:random-name-picker': {
    heading: '隨機姓名抽選器的抽籤規則與重複姓名風險',
    intro: '這一段針對「抽出後移除」這個預設勾選的選項，說明抽完一輪與名單有重複姓名時實際會發生什麼事。',
    panels: [
      {
        title: '先用小名單測試「抽出後移除」',
        text: '貼上 5 個姓名，保持預設勾選的「抽出後移除」，連續按「抽一位」兩次：名單應該依序剩下 4 筆、3 筆，且不會抽到已經抽過的人。這是可以直接數筆數驗證的行為，不需要看程式碼也能核對。',
      },
      {
        title: '把名單抽完一輪後會發生什麼',
        text: '持續抽到名單完全清空，再按一次「抽一位」，會顯示「名單是空的」錯誤，不會自動重置或允許重抽；同樣地，若「抽多位」設定的數量超過剩餘名單筆數，會顯示筆數不足的錯誤，不會自動改成抽出剩餘全部人數。',
      },
      {
        title: '重複姓名是已知的風險點，不是本頁保證會處理好',
        text: '此工具用姓名文字比對來移除已抽出的人，不是用清單中的位置。如果名單裡有兩個完全相同的名字（例如兩位「王小明」），移除時只會刪掉第一個相符的項目，不保證刪掉的正是畫面上抽到的那一位。正式抽籤前建議先手動檢查並排除重複姓名，或改用支援重複姓名檢查的「課堂分組工具」。',
      },
    ],
    checklist: [
      '名單已檢查過沒有完全重複的姓名，或已知道重複姓名時的移除行為與限制。',
      '「抽出後移除」是否勾選，已依實際需求確認（需要可重複抽取時要取消勾選）。',
      '抽完整份名單後會出現「名單是空的」錯誤，這是預期行為，不是故障。',
      '抽多位時輸入的數量沒有超過目前剩餘名單筆數。',
    ],
  },
  'zh:class-rank-percentile-calculator': {
    intro: '這一段用頁面預設的名次與班級人數示範計算方式，並說明工具沒有處理「並列名次」的地方。',
    panels: [
      {
        title: '先用頁面預設值核對公式',
        text: '頁面載入時預設名次 6、總人數 40：百分等級＝100×(40−6+0.5)÷40＝86.25，前百分比＝100×6÷40＝15%，你前面還有 5 人、後面還有 34 人。這組數字可以直接用計算機核對，公式用的是名次區間中點（+0.5），不是單純用名次除以總人數。',
      },
      {
        title: '測試名次最好與最差兩種邊界',
        text: '把名次改成 1（全班最好）：百分等級變成 98.75%，前百分比 2.5%。再把名次改成等於總人數 40（全班最後）：百分等級只剩 1.25%，前百分比變成 100%。名次或總人數輸入非整數、名次大於總人數，或任一個小於 1，都會被擋下顯示錯誤。',
      },
      {
        title: '並列名次要自己先決定怎麼代入',
        text: '這個工具只接受一個整數名次，沒有「並列」選項。如果班上有兩人並列第 6 名，你必須自己決定要用「6」還是依學校規則調整後的數字代入，工具不會提醒你，也不會自動處理並列。不同代入方式會得到不同百分等級，正式使用前要對照學校教務系統實際採用的排名規則。',
      },
    ],
    checklist: [
      '名次與總人數都是正整數，且名次不大於總人數。',
      '已用「名次區間中點」公式（100×(總人數−名次+0.5)÷總人數）手動核對過一次結果。',
      '班上如有並列名次，已依學校實際規則決定代入哪個數字，而不是直接照抄名次冊。',
      '「你前面還有幾人、後面還有幾人」的數字已和名次冊人工核對過。',
    ],
  },
  'zh:standard-deviation': {
    intro: '這一段用頁面預設的五個數字示範母體與樣本兩種標準差的差異，並示範資料只有一筆時會發生什麼事。',
    panels: [
      {
        title: '先用預設數列核對公式',
        text: '頁面預設輸入「12, 15, 20, 22, 30」：平均數 19.8，母體變異數 38.56、母體標準差約 6.2097，樣本變異數 48.2（除以 n−1＝4）、樣本標準差約 6.9426。這五個數字互相之間可以用「變異數開根號＝標準差」互相驗算，不需要額外資料。',
      },
      {
        title: '只輸入一筆資料會怎樣',
        text: '把輸入清空，只留一個數字，例如「50」：母體標準差會顯示 0（因為只有一個值、離均差必為 0），但「樣本標準差」欄位會顯示「--」，因為樣本公式要除以 n−1，n=1 時分母為 0，工具直接判定沒有意義，不會顯示 0 或錯誤的數字。',
      },
      {
        title: '眾數欄位在資料都不重複時的行為',
        text: '同樣用預設的五個數字測試「眾數」欄位：因為 12、15、20、22、30 彼此都不相同，眾數欄位會顯示「無」，不是 0 或空白。只有輸入的數字中至少有一組重複時，才會列出實際的眾數；使用時要分清楚「無眾數」與「眾數是 0」是兩件不同的事。',
      },
    ],
    checklist: [
      '已分清楚要用「母體標準差」（除以 n）還是「樣本標準差」（除以 n−1），兩者對同一批資料的結果不同。',
      '資料只有一筆時，樣本標準差會顯示「--」而不是 0，這是預期行為。',
      '眾數顯示「無」代表資料沒有重複值，不代表眾數等於 0。',
      '輸入的數字已用逗號或空白分隔，非數字字元會被自動忽略，貼上前確認沒有夾帶多餘符號。',
    ],
  },
  'zh:dice-roller': {
    intro: '這一段針對骰子產生器的顆數上限與亂數來源，說明它能保證什麼、不能保證什麼。',
    panels: [
      {
        title: '先用單顆骰子測試基本行為',
        text: '選 d6、顆數 1，按「擲骰子」：結果應該是 1～6 其中一個整數，畫面下方會列出每顆的點數與總和。改選 d4 再測一次，確認結果不會超出 1～4；每一種面數都要各自測過範圍是否正確，不能只測一種就假設其他面數也正常。',
      },
      {
        title: '顆數超過上限會被擋下，不是自動修正',
        text: '顆數輸入框允許 1～20，把顆數改成 21 或 0 再按擲骰子：頁面會顯示數量錯誤訊息，並清空原本的結果，不會自動夾回 20 或 1 再幫你擲。需要模擬更多顆骰子時，必須分批擲、自己加總，工具不會一次擲超過 20 顆。',
      },
      {
        title: '這個亂數沒有種子，無法重現同一組結果',
        text: '骰子點數是用瀏覽器的加密亂數（crypto.getRandomValues）配合拒絕抽樣產生，目的是避免點數分布偏態，但也代表沒有「種子」可以設定——同樣的操作不會重現同一組點數。如果需要可重現、能覆盤的測試序列（例如教學示範要重播同一組結果），這個工具本身做不到，需要另外用程式記錄下第一次的結果。',
      },
    ],
    checklist: [
      '每一種骰子面數（d4～d20）都各自測過，結果沒有超出該面數的範圍。',
      '顆數輸入 0、21 等超出 1～20 的值時，出現的是錯誤訊息而不是被自動修正。',
      '總和數字等於畫面列出的各顆點數相加，已手動加總核對過。',
      '知道這個工具的亂數沒有種子、無法重現同一組結果，需要可重現序列時另找方法。',
    ],
  },
  'zh:teacher-exam-score-converter': {
    heading: '教師甄試成績轉換模擬器的權重規則與試算陷阱',
    intro: '這一段針對權重不等於 100% 時的實際行為，以及「40/30/30 預設」按鈕跟頁面預設值不同這兩個容易誤會的地方。',
    panels: [
      {
        title: '先用頁面預設值核對加權公式',
        text: '頁面載入時預設筆試 80 分（權重 40%）、試教 85 分（權重 40%）、口試 82 分（權重 20%），權重合計剛好 100%，加權總分＝80×0.4+85×0.4+82×0.2＝32+34+16.4＝82.4。畫面下方的「計算式」欄位會列出同樣的算式，可以直接對照。',
      },
      {
        title: '權重加起來不是 100% 時，工具不會擋下計算',
        text: '把三個權重都改成 50（合計 150%）再按計算：頁面只會多顯示一行黃色提示「權重合計 150.00%，非 100%」，但仍然會算出一個加權總分，分母用的是實際權重總和（150），不是強制當作 100。也就是說看到警告文字不代表數字是錯的或被擋下，而是提醒你檢查權重設定是否符合甄試簡章。',
      },
      {
        title: '「40/30/30 預設」按鈕不等於頁面原本的預設值',
        text: '頁面一開始的權重是 40/40/20，但按下「40/30/30 預設」按鈕會把三個權重改成 40/30/30，這是兩組不同的數字，別把「頁面預設」和「按鈕預設」搞混。另外「自動正規化」按鈕會把目前輸入的權重依比例縮放到合計正好 100 再重新計算，適合用來修正合計不是 100% 的情況。',
      },
    ],
    checklist: [
      '三科成績與權重都已對照正式甄試簡章公告的實際規則輸入，而不是沿用頁面預設值。',
      '看到「權重合計非 100%」的黃色提示時，已確認這只是提醒、不是計算錯誤或被擋下。',
      '分清楚「頁面載入的預設權重（40/40/20）」與「按鈕帶入的預設權重（40/30/30）」是兩組不同數字。',
      '正式用途前已用「複製結果」把文字摘要與算式貼到試算表，再核對一次總分。',
    ],
  },
  'zh:z-score-calculator': {
    intro: '這一段用頁面預設的原始分數、平均數與標準差示範公式，並說明這個工具刻意不做的事——換算百分位。',
    panels: [
      {
        title: '先用頁面預設值核對公式',
        text: '頁面預設原始分數 82、平均數 70、標準差 10：Z＝(82−70)÷10＝1.2，畫面會同時顯示「距平均值 1.2 個標準差」與「高於平均」的文字說明。這組數字可以用計算機在幾秒內驗算完成。',
      },
      {
        title: '標準差輸入 0 或負值會被擋下',
        text: '把標準差改成 0 再計算：頁面會顯示「請輸入有效數字，且標準差需大於 0」的錯誤，不會顯示 Infinity 或除以 0 的錯誤數值。輸入負的標準差（例如 −5）也會被同一個檢查擋下，因為標準差本身不可能是負數。',
      },
      {
        title: '這個工具不會幫你換算成百分位或機率',
        text: '算出 Z 分數後，頁面只顯示 Z 值本身、距平均值的距離，以及「高於／低於／等於平均」的文字，並不會進一步換算成百分等級或常態分布的機率值。如果需要的是百分位，要改用本站的「排名百分比計算器」或另外查常態分布表，不要假設這個 Z 值可以直接讀成百分比。',
      },
    ],
    checklist: [
      '平均數與標準差的定義（母體或樣本、來源資料範圍）已確認與原始分數屬於同一個參照群體。',
      '已用 Z＝(原始分數−平均數)÷標準差手動核對過一次結果。',
      '標準差輸入 0 或負值時看到的是錯誤訊息，不是異常的數字結果。',
      '需要百分位或機率時，已知道這個工具不提供，要另外查表或換用其他頁面。',
    ],
  },
  'zh:weighted-average-calculator': {
    intro: '這一段用頁面預設的兩列資料示範加權公式，並特別說明無效列會讓「整個計算」失敗，這一點跟「成績平均計算器」的處理方式不同。',
    panels: [
      {
        title: '先用頁面預設的兩列核對公式',
        text: '頁面載入時已經有兩列：數值 80、權重 30，以及數值 90、權重 70。權重總和＝100，加權總和＝80×30+90×70＝2400+6300＝8700，加權平均＝8700÷100＝87。這三個數字都會顯示在結果區，可以逐一核對。',
      },
      {
        title: '新增一列權重為 0 的資料會發生什麼',
        text: '按「新增一列」，數值填 70、權重留空或填 0：整個結果區會消失、改顯示錯誤訊息，不是像有些成績工具那樣自動忽略這一列繼續算其他列。任何一列權重小於等於 0，或只填了數值、權重兩者其中之一，都會讓整份計算被判定無效，必須修正或刪除那一列才能重新看到結果。',
      },
      {
        title: '跟「成績平均計算器」交叉比對時要注意的差異',
        text: '如果同一批分數同時要用「成績平均計算器」和「加權平均計算器」核對，要知道兩個工具對「權重 0 或留空」的處理方式不一樣：前者會把該列排除在加權平均之外但仍保留在未加權平均；後者則是整個計算直接失敗、不會給出任何結果。混用兩個工具核對同一份資料時，這個差異可能讓你誤以為其中一個算錯了。',
      },
    ],
    checklist: [
      '已用 Σ(數值×權重)÷Σ權重 手動核對過頁面預設兩列的結果（87）。',
      '知道任何一列權重小於等於 0，或數值、權重只填一半，會讓整份計算失敗顯示錯誤，而不是被忽略。',
      '新增列之前，確認每一列的數值與權重都已填妥，避免留下空白列。',
      '如果同時使用「成績平均計算器」核對同一批資料，已注意到兩個工具對無效列的處理方式不同。',
    ],
  },
  'zh:percentage-calculator': {
    heading: '百分比計算器三個獨立面板的驗證方法',
    intro: '這一段分別針對頁面上三個互不相關的面板——A 是 B 的百分之多少、比例換算、增減百分比——各給一組可核對的數字。',
    panels: [
      {
        title: '先用三個面板各自的預設值核對',
        text: '第一個面板（求 A% 是多少）：25% of 200＝50。第二個面板（比例換算）：30 佔 120 的比例＝30÷120×100＝25%。第三個面板（增減百分比）：從 80 變成 100，變化率＝(100−80)÷80×100＝25%，並標示「增加」。三個面板互相獨立，改其中一個不會影響另外兩個的數字。',
      },
      {
        title: '分母或起始值為 0 時的行為',
        text: '在第二個面板把「整體」欄位改成 0：結果會顯示「無法計算」，不是 Infinity 或 NaN。在第三個面板把「起始值」改成 0：同樣顯示「無法計算」，因為從 0 開始沒有基準可以算變化百分比。這是刻意的防呆設計，不是程式錯誤。',
      },
      {
        title: '結果的精確度與四捨五入',
        text: '三個面板的結果都只計算到小數第 4 位，並自動移除多餘的 0（例如 25.0000 會顯示成 25）。牽涉到金錢、成績或正式報告的計算，建議用計算機或試算表以相同公式再算一次，尤其是小數位數要求跟這裡不同時。',
      },
    ],
    checklist: [
      '確認要用的是哪一個面板（求 A%、比例換算、還是增減百分比），三者公式不同，數字不能互相套用。',
      '分母或起始值為 0 時，看到「無法計算」是正確行為，不是故障。',
      '至少用一組可心算的數字（例如 25% of 200）核對過面板真的在算你以為的那個公式。',
      '正式用途的小數位數需求如果比 4 位更嚴格，已改用計算機或試算表重算。',
    ],
  },
  'zh:random-number-picker': {
    heading: '隨機數字產生器的邊界規則（不是時區或檔案格式）',
    intro: '這一段只針對這個工具真正會遇到的邊界——重複與否、數量上限、範圍大小——不涉及時區、編碼或檔案格式，因為這個工具不處理檔案。',
    panels: [
      {
        title: '先用預設範圍核對基本行為',
        text: '頁面預設最小值 1、最大值 100、數量 1、允許重複：按「產生」會得到一個 1～100 的整數。把數量改成 5 再試一次，確認產生的每個數字都落在 1～100 之間，且「允許重複」勾選時同一個數字可能出現兩次以上。',
      },
      {
        title: '不允許重複時，數量不能超過範圍大小',
        text: '取消「允許重複」，把最小值設 1、最大值設 10、數量設 11：範圍只有 10 個整數（1～10），卻要求 11 個不重複的結果，頁面會顯示錯誤，不會自動放寬範圍或允許重複。另外單次最多可產生 100000 個數字，超過會顯示數量上限錯誤；最小值大於最大值（例如 50 到 10）也會被擋下。',
      },
      {
        title: '排序選項與結果核對',
        text: '勾選「排序結果」再產生多個數字，確認輸出是由小到大排列；取消勾選則保持產生順序。這個工具只輸出整數清單，沒有下載檔案、沒有編碼轉換、也不牽涉時區，所以驗證時只需要核對範圍、數量與是否重複，不需要檢查檔案格式或重新開啟下載檔案。',
      },
    ],
    checklist: [
      '最小值不大於最大值，且兩者都是整數。',
      '不允許重複時，要求的「數量」沒有超過「最大值−最小值+1」這個範圍大小。',
      '單次要求的數量沒有超過 100000 的上限。',
      '這個工具不涉及時區、編碼、檔案格式或下載檔案，驗證時不需要檢查這些項目。',
    ],
  },
  'zh:group-generator': {
    intro: '「student-grouping」不是本站現有的網址，這裡改用功能對應的「課堂分組工具」（group-generator）示範驗證方法。',
    panels: [
      {
        title: '先用「依組數」模式核對分配方式',
        text: '貼上 10 個學生姓名，模式選「依組數」、組數設 3，勾選「打亂順序」，按「產生分組」：10 人分 3 組會採輪流分配，人數會是 4、3、3（最多相差 1 人），不會是平均但不整除的 3.33 人一組，也不會有一組是 0 人。',
      },
      {
        title: '改成「依組人數」模式時最後一組會變小',
        text: '同樣 10 個人，模式改成「依組人數」、每組人數設 4：會分成 4 人、4 人、2 人三組，最後一組只有 2 人，因為 10 除以 4 除不盡。這跟「依組數」模式的輪流分配邏輯不同，兩種模式選錯可能會得到人數差異很大的分組結果。',
      },
      {
        title: '名單裡有重複姓名會被整個擋下',
        text: '在名單中刻意放兩個一樣的名字（不分大小寫也算重複），再按「產生分組」：頁面會顯示名單重複錯誤，直接拒絕產生分組，需要先修正名單才能繼續，不會像「隨機姓名抽選器」那樣忽略重複逕自處理。匯出的 CSV 對於以「=」「+」「-」「@」開頭的儲存格內容還會自動加上防護，避免在 Excel 中被誤判成公式執行。',
      },
    ],
    checklist: [
      '名單至少有 2 人，且沒有重複姓名（不分大小寫），否則會被直接擋下無法產生分組。',
      '已依實際需求選對模式：「依組數」是固定組數、人數盡量平均；「依組人數」是固定每組人數、最後一組可能較小。',
      '「打亂順序」是否勾選已依需求確認——取消勾選會依名單原始順序分組。',
      '匯出 CSV 後已用試算表開啟確認欄位正常，尤其名字裡如果有「=」開頭等特殊字元。',
    ],
  },
};

export function buildToolValueReview(
  lang: Locale,
  toolName: string,
  category: Category,
  content: ToolContent,
  slug?: string,
): ContentValueReview {
  if (slug) {
    const override = toolValueReviewOverrides[`${lang}:${slug}`];
    if (override) {
      return {
        heading: override.heading ?? (lang === 'zh' ? `${toolName} 的驗證方法與判讀界線` : `How to verify a ${toolName} result before relying on it`),
        intro: override.intro,
        panels: override.panels,
        checklistHeading: override.checklistHeading ?? (lang === 'zh' ? '完成前檢查清單' : 'Acceptance checklist'),
        checklist: override.checklist,
        reviewedLabel: lang === 'zh' ? '內容與驗證流程複查' : 'Content and verification review',
        reviewedAt: override.reviewedAt ?? reviewedAt,
      };
    }
  }

  const exampleA = first(content.examples, lang === 'zh' ? '先用簡單、可手算或可目視確認的資料測試。' : 'Begin with a simple case that can be checked by hand or by sight.');
  const exampleB = content.examples?.[1] ?? exampleA;
  const openingStep = first(content.instructions, lang === 'zh' ? '先確認輸入格式與單位。' : 'Confirm the input format and units first.');
  const closingStep = last(content.instructions, lang === 'zh' ? '完成後重新檢查輸出。' : 'Recheck the output after completion.');
  const limitation = first(
    content.notes,
    content.disclaimer ?? (lang === 'zh' ? '重要結果仍需要對照原始資料。' : 'Important results still need to be checked against the source material.'),
  );
  const capability = first(content.capabilities, content.short);
  const lens = categoryLens[category.id]?.[lang] ?? category.description[lang];
  const formulaText = content.formula
    ? lang === 'zh'
      ? `本頁公開的計算核心是「${content.formula.expression}」；請先確認每個變數的單位，再用第二種方法重算一次。`
      : `The page exposes its calculation core as “${content.formula.expression}.” Confirm every variable and unit, then reproduce the result with a second method.`
    : lang === 'zh'
      ? `本頁的核心能力是「${capability}」。先預寫你期待看到的輸出，再操作工具，能較快發現格式或設定錯誤。`
      : `The page is designed to “${capability}.” Write down the output you expect before running it; this makes format and setting errors easier to spot.`;

  if (lang === 'zh') {
    return {
      heading: `${toolName} 的驗證方法與判讀界線`,
      intro: `這一段不是重複操作按鈕，而是提供一套可以重現的檢查方法。先用小型測試資料建立基準，再測一個邊界情況，最後才放入正式資料。${lens}`,
      panels: [
        {
          title: '先建立可預期的基準',
          text: `以「${exampleA}」作為第一個測試情境。從「${openingStep}」開始，執行前先寫下預期結果；若實際輸出不同，先檢查單位、格式、空白字元、檔案頁數或選項，而不是直接假設工具或原始資料正確。`,
        },
        {
          title: '再測邊界與失敗情境',
          text: `第二次可改用「${exampleB}」，並刻意測試空值、極端值、重複項目、特殊字元、大型檔案或不支援格式中的一種。已知判讀限制是：${limitation} 這一步用來確認工具在哪些條件下應停止使用。`,
        },
        {
          title: '接受結果前做交叉核對',
          text: `${formulaText} 若輸出將交給別人、上傳到其他系統、取代原始檔或影響金錢與成績，還要依「${closingStep}」完成最終檢查，並保留輸入條件與原始版本供日後回查。`,
        },
      ],
      checklistHeading: '完成前檢查清單',
      checklist: [
        `輸入：確認資料來源、單位、時區、編碼或檔案格式符合 ${toolName} 的欄位要求。`,
        '過程：先用可人工判斷的小案例，再測一個容易出錯的邊界案例。',
        '輸出：核對筆數、頁數、尺寸、總和、時間或格式，並重新開啟下載檔。',
        '決策：重要結果需保留原始資料，並以官方規則、目的平台或第二種方法交叉確認。',
      ],
      reviewedLabel: '內容與驗證流程複查',
      reviewedAt,
    };
  }

  return {
    heading: `How to verify a ${toolName} result before relying on it`,
    intro: `This is a reproducible review method, not another list of button instructions. Start with a small baseline whose answer you can predict, test one boundary condition, and only then use real material. ${lens}`,
    panels: [
      {
        title: 'Establish a predictable baseline',
        text: `Use “${exampleA}” as the first test case. Begin with “${openingStep}” and write down the expected result before clicking anything. If the output differs, check units, formatting, whitespace, file page count, and selected options before assuming either the tool or source data is correct.`,
      },
      {
        title: 'Probe an edge or failure case',
        text: `For a second run, adapt “${exampleB}” and deliberately include one empty value, extreme value, duplicate, unusual character, large file, or unsupported format. The relevant boundary is: ${limitation} This tells you when the page should be used as a draft aid rather than the final authority.`,
      },
      {
        title: 'Cross-check before acceptance',
        text: `${formulaText} If the result will be shared, imported elsewhere, used to replace an original file, or affect money or grades, also complete the final action “${closingStep}.” Keep the input assumptions and untouched source so another person can reproduce the decision later.`,
      },
    ],
    checklistHeading: 'Acceptance checklist',
    checklist: [
      `Input: confirm that the source, units, timezone, encoding, or file format matches the fields on ${toolName}.`,
      'Process: run one small case you can judge independently, followed by one likely edge case.',
      'Output: compare counts, pages, dimensions, totals, timing, or format, and reopen any downloaded file.',
      'Decision: retain the source and verify important output against official rules, the destination system, or a second method.',
    ],
    reviewedLabel: 'Content and verification review',
    reviewedAt,
  };
}

interface GuideLike {
  title: string;
  problem: string;
  example: string;
  steps: string[];
  commonMistakes: string[];
  formula?: string;
  cta: string;
}

export function buildGuideValueReview(lang: Locale, guide: GuideLike): ContentValueReview {
  const firstStep = first(guide.steps, lang === 'zh' ? '先確認問題與資料。' : 'Confirm the problem and source data.');
  const finalStep = last(guide.steps, lang === 'zh' ? '保存結果與假設。' : 'Save the result and assumptions.');
  const mistakeA = first(guide.commonMistakes, lang === 'zh' ? '忽略輸入限制。' : 'Ignoring input limits.');
  const mistakeB = guide.commonMistakes?.[1] ?? mistakeA;

  return lang === 'zh'
    ? {
        heading: '把指南轉成可查核的實際決策',
        intro: `閱讀「${guide.title}」後，不要只記結論。先把自己的問題改寫成一個可檢查句子，保存輸入、假設與來源，再用指南中的例題和錯誤清單做反證。這能區分「算出一個數字」與「得到可說明的結果」。`,
        panels: [
          { title: '重做例題', text: `先遮住答案，獨立重做本頁例題：「${guide.example}」完成後逐步比對，特別檢查第一步「${firstStep}」是否使用了相同定義與單位。若無法重現，先處理差異，不要直接套用到正式資料。` },
          { title: '主動找反例', text: `把「${mistakeA}」與「${mistakeB}」各改成一個測試案例。若結論在更換尺度、期間、樣本、格式或規則後失效，就應把適用範圍一起寫進報告，而不是只保留看似精確的結果。` },
          { title: '留下決策軌跡', text: `${guide.formula ? `公式或規則為「${guide.formula}」，請記錄每個代入值的來源。` : '請記錄採用的規則、版本、資料日期與排除條件。'} 最後依「${finalStep}」保存可回查版本，再把「${guide.cta}」視為後續行動而非保證。` },
        ],
        checklistHeading: '指南使用完成條件',
        checklist: ['能用自己的資料重現一次例題流程。', '能說明至少一個不適用或需要專業判斷的情境。', '保留資料來源、公式版本、輸入條件與日期。', '重要結論已用官方資料、原始紀錄或第二種方法查核。'],
        reviewedLabel: '編輯與可重現性複查',
        reviewedAt,
      }
    : {
        heading: 'Turn the guide into an auditable decision',
        intro: `After reading “${guide.title},” do not retain only the conclusion. Rewrite your own question as a checkable statement, preserve inputs and assumptions, then use the worked example and error list to challenge the result. That separates producing a number from reaching an explainable conclusion.`,
        panels: [
          { title: 'Reproduce the worked example', text: `Hide the answer and independently reproduce: “${guide.example}” Compare the process step by step, especially “${firstStep}.” If your result differs, resolve definitions, units, and rounding before applying the method to real data.` },
          { title: 'Try to disprove the conclusion', text: `Turn “${mistakeA}” and “${mistakeB}” into test cases. If the conclusion changes when the scale, period, sample, format, or governing rule changes, state that boundary beside the result instead of keeping only a precise-looking number.` },
          { title: 'Preserve the decision trail', text: `${guide.formula ? `The stated formula or rule is “${guide.formula}”; record the source of every substituted value.` : 'Record the rule, version, data date, exclusions, and any judgment calls.'} Finish with “${finalStep},” and treat “${guide.cta}” as a next action rather than a promised outcome.` },
        ],
        checklistHeading: 'Completion criteria',
        checklist: ['Reproduce the example with your own notes rather than copying its answer.', 'Name at least one boundary where the method should not be used without expert judgment.', 'Keep the source, rule version, input assumptions, and review date.', 'Check important conclusions against an official source, original record, or independent method.'],
        reviewedLabel: 'Editorial and reproducibility review',
        reviewedAt,
      };
}

interface WorkflowLike {
  title: string;
  purpose: string;
  steps: string[];
}

export function buildWorkflowValueReview(
  lang: Locale,
  workflow: WorkflowLike,
  toolNames: string[],
): ContentValueReview {
  const firstStep = first(workflow.steps, lang === 'zh' ? '先整理輸入。' : 'Prepare the input.');
  const finalStep = last(workflow.steps, lang === 'zh' ? '最後核對輸出。' : 'Verify the final output.');
  const toolList = toolNames.join(lang === 'zh' ? '、' : ', ');

  return lang === 'zh'
    ? {
        heading: '流程交付標準：輸入、交接與失敗復原',
        intro: `這個工具包的價值不只是把 ${toolList} 排在同一頁，而是讓每一步都有明確輸入、輸出與停損點。流程目標是「${workflow.purpose}」；若中途資料定義改變，應回到上一個可驗證版本，而不是繼續加工錯誤結果。`,
        panels: [
          { title: '開始前建立工作副本', text: `先執行「${firstStep}」。保留原始檔或原始清單，另建一份工作副本；在檔名或筆記記下日期、版本、單位、負責人與目的。這樣後續即使轉檔、計算或整理失敗，也能從已知狀態重做。` },
          { title: '每一步都要有交接條件', text: `只有在頁數、筆數、欄位、格式、總和或預覽符合預期時，才把結果交給下一個工具。使用 ${toolList} 時，不要同時修改多個假設；一次只改一項，才能判斷差異來自哪一步。` },
          { title: '正式交付前獨立複查', text: `最後依「${finalStep}」完成複查。下載檔要重新開啟，計算值要抽查或用第二種方法重算，分享連結要以未登入或另一台裝置測試。若結果影響金錢、成績、隱私或公開發布，需由另一人確認。` },
        ],
        checklistHeading: '這套流程何時算完成',
        checklist: ['原始資料未被覆寫，工作副本能辨認日期與版本。', '每一步的輸入與輸出筆數、頁數、格式或總和已核對。', '失敗時知道回到哪一個已驗證版本，不靠重複點擊猜測。', '最終輸出已在實際目的環境重新開啟、匯入、列印或分享測試。'],
        reviewedLabel: '工作流程完整性複查',
        reviewedAt,
      }
    : {
        heading: 'Delivery standard: inputs, handoffs, and recovery',
        intro: `The value of this toolkit is not merely placing ${toolList} on one page. Each stage needs a defined input, output, and stop condition. The goal is “${workflow.purpose}” If a definition changes mid-process, return to the last verified version instead of continuing to transform a faulty result.`,
        panels: [
          { title: 'Create a working copy first', text: `Begin with “${firstStep}” Keep the untouched source and create a separate working copy. Record the date, version, units, owner, and intended destination in the filename or notes so a failed conversion or calculation can be reproduced from a known state.` },
          { title: 'Set a gate for every handoff', text: `Pass output to the next tool only after counts, pages, fields, format, totals, or preview match expectations. When using ${toolList}, change one assumption at a time. Otherwise, a later difference cannot be traced to the step that introduced it.` },
          { title: 'Perform an independent delivery check', text: `Finish with “${finalStep}” Reopen downloaded files, spot-check or independently recalculate figures, and test shared links from a signed-out session or another device. Results affecting money, grades, privacy, or publication should receive a second-person review.` },
        ],
        checklistHeading: 'Definition of done',
        checklist: ['The source is untouched and the working copy has a clear date and version.', 'Each handoff has a checked count, page total, format, preview, or calculation.', 'A failure can return to a known verified stage instead of relying on repeated clicks.', 'The final result has been reopened, imported, printed, or shared in its real destination.'],
        reviewedLabel: 'Workflow integrity review',
        reviewedAt,
      };
}

interface AudienceLike {
  title: string;
  painPoints: string[];
  workflowSuggestions: string[];
}

export function buildAudienceValueReview(
  lang: Locale,
  audience: AudienceLike,
  toolNames: string[],
): ContentValueReview {
  const need = first(audience.painPoints, lang === 'zh' ? '完成日常任務。' : 'Complete the everyday task.');
  const start = first(audience.workflowSuggestions, lang === 'zh' ? '先確認真正要解決的問題。' : 'Confirm the actual problem first.');
  const end = last(audience.workflowSuggestions, lang === 'zh' ? '最後查核輸出。' : 'Verify the output at the end.');
  const toolList = toolNames.slice(0, 5).join(lang === 'zh' ? '、' : ', ');

  return lang === 'zh'
    ? {
        heading: `${audience.title}的選工具與交付判準`,
        intro: `這份清單要處理的核心需求是「${need}」選擇 ${toolList} 等工具時，先看任務需要的是計算、整理、轉檔、產生初稿還是正式交付；同一個工具在練習情境可直接使用，在涉及個資、權益或公開發布時則需要更嚴格的複查。`,
        panels: [
          { title: '先定義最小必要輸入', text: `從「${start}」開始，只放入完成任務必要的資料。能用虛構資料、代號或工作副本，就不要使用完整姓名、帳號、未公開文件或唯一原始檔。這同時降低隱私風險，也讓錯誤更容易重現。` },
          { title: '依結果類型選工具', text: `需要可重算的數字，就選會揭露公式與假設的頁面；需要檔案，就確認格式、尺寸、頁數與相容性；需要隨機或創意初稿，就把結果視為候選方案，由人做最後判斷。不要因為工具能輸出，就跳過目的平台規則。` },
          { title: '把交付環境納入驗證', text: `最後依「${end}」完成實際情境測試。手機、投影、列印、試算表、內容管理系統或申請平台可能有不同限制；在真正交付前，用相同裝置與流程跑一次，並保留可回復版本。` },
        ],
        checklistHeading: '使用情境驗收',
        checklist: ['輸入資料已縮減到任務需要的最小範圍。', '工具的輸出類型與真正交付目的相符。', '已針對一個正常案例與一個邊界案例測試。', '最終結果由負責的人在實際裝置或目的平台確認。'],
        reviewedLabel: '使用情境編輯複查',
        reviewedAt,
      }
    : {
        heading: `Tool selection and delivery criteria for ${audience.title}`,
        intro: `The central need in this collection is “${need}” When choosing among ${toolList}, first decide whether the task calls for a calculation, cleanup, conversion, draft, or final deliverable. A result suitable for practice may need a stricter review when privacy, rights, money, grades, or public publication are involved.`,
        panels: [
          { title: 'Define the minimum necessary input', text: `Begin with “${start}” Use only the data required for the task. Prefer fictional samples, neutral labels, or working copies over full names, account details, unpublished documents, or the only original file. Smaller inputs reduce privacy risk and make errors easier to reproduce.` },
          { title: 'Choose by output type', text: `For figures, prefer a page that exposes assumptions and can be recalculated. For files, check format, dimensions, page count, and compatibility. Treat random or creative output as a candidate that still needs human selection. A tool’s ability to export does not override the destination’s rules.` },
          { title: 'Test in the delivery environment', text: `Finish with “${end}” Phones, projectors, printers, spreadsheets, content systems, and submission portals impose different constraints. Run the result through the real device and handoff once before delivery, and retain a recoverable source version.` },
        ],
        checklistHeading: 'Audience workflow acceptance',
        checklist: ['The input is limited to the minimum data needed for the task.', 'The output type matches the actual deliverable rather than an intermediate convenience.', 'One normal case and one boundary case have been tested.', 'The responsible person has checked the final result in the real device or destination system.'],
        reviewedLabel: 'Audience editorial review',
        reviewedAt,
      };
}

export function buildCategoryValueReview(
  lang: Locale,
  categoryName: string,
  toolSummaries: { name: string; summary: string }[],
): ContentValueReview {
  const primary = toolSummaries[0];
  const secondary = toolSummaries[1] ?? primary;
  const third = toolSummaries[2] ?? secondary;

  return lang === 'zh'
    ? {
        heading: `如何在「${categoryName}」分類選到正確工具`,
        intro: `分類頁的用途是縮短選擇時間，而不是要求你把所有工具都試一遍。先寫下希望得到的結果類型，再比較輸入資料、隱私需求、輸出格式與驗證成本。名稱相近的工具可能處理不同階段，請從任務邊界判斷。`,
        panels: [
          { title: `何時選 ${primary.name}`, text: `${primary.summary} 適合在輸入條件清楚、需要直接完成這類輸出的情境。正式操作前先用一個小案例測試，確認欄位、單位與下載格式符合目的。` },
          { title: `何時改用 ${secondary.name}`, text: `${secondary.summary} 如果你的問題更接近這個描述，就不要因為第一個工具排名較前而勉強使用。比較兩者需要的原始資料、是否會改變內容，以及輸出能否再次編輯。` },
          { title: `用 ${third.name} 做第三種判斷`, text: `${third.summary} 第三個選項提醒你：任務可能需要的是另一種輸出。選定後仍應閱讀該工具頁的限制與驗證段落，並在真實目的平台完成最後測試。` },
        ],
        checklistHeading: '分類選擇檢查',
        checklist: ['先確認需要的是計算、整理、產生、轉換、視覺化或計時。', '比較工具的輸入格式、資料敏感度與輸出是否可逆。', '不要覆寫唯一原始檔；檔案與正式數字都保留工作副本。', '選定工具後，仍依個別頁面的限制和驗證清單操作。'],
        reviewedLabel: '分類導覽複查',
        reviewedAt,
      }
    : {
        heading: `How to choose the right tool in ${categoryName}`,
        intro: `A category page should shorten the decision, not make you try every tool. Write down the required output first, then compare input data, privacy needs, file format, reversibility, and the cost of checking the result. Similar names can describe different stages of a workflow, so choose by task boundary.`,
        panels: [
          { title: `Choose ${primary.name} when`, text: `${primary.summary} This is the stronger fit when the input is defined and that output is the actual goal. Before real work, use a small sample to confirm fields, units, interaction, and download format.` },
          { title: `Switch to ${secondary.name} when`, text: `${secondary.summary} If your problem is closer to this description, do not force the first-ranked option. Compare required source material, whether content is transformed, and whether the result remains editable.` },
          { title: `Use ${third.name} for a third decision path`, text: `${third.summary} This option is a reminder that the task may need a different output type. After choosing, read that page’s limits and verification method, then test the result in the actual destination.` },
        ],
        checklistHeading: 'Category selection check',
        checklist: ['Identify whether the task is calculation, cleanup, generation, conversion, visualization, or timing.', 'Compare input format, data sensitivity, output reversibility, and destination requirements.', 'Do not overwrite the only source; keep working copies for files and consequential figures.', 'After choosing, follow the individual page’s limits and acceptance checklist.'],
        reviewedLabel: 'Category navigation review',
        reviewedAt,
      };
}
