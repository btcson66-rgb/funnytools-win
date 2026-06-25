import type { Locale } from '../config/site';

export type LocalizedText = Record<Locale, string>;

export interface GuideFaq {
  question: LocalizedText;
  answer: LocalizedText;
}

export interface SeoGuide {
  id: string;
  locales: Locale[];
  slug: string;
  title: LocalizedText;
  metaTitle: LocalizedText;
  metaDescription: LocalizedText;
  h1: LocalizedText;
  category: LocalizedText;
  priority: number;
  searchIntent: LocalizedText;
  targetKeywords: LocalizedText[];
  relatedToolIds: string[];
  relatedGuideIds: string[];
  relatedWorkflowIds: string[];
  summary: LocalizedText;
  problem: LocalizedText;
  whoShouldUse: LocalizedText;
  explanation: LocalizedText[];
  steps: LocalizedText[];
  formula?: LocalizedText;
  example: LocalizedText;
  commonMistakes: LocalizedText[];
  faq: GuideFaq[];
  cta: LocalizedText;
  updatedAt: string;
}

export interface SeoGuideView {
  id: string;
  locales: Locale[];
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  category: string;
  priority: number;
  searchIntent: string;
  targetKeywords: string[];
  relatedToolIds: string[];
  relatedGuideIds: string[];
  relatedWorkflowIds: string[];
  summary: string;
  problem: string;
  whoShouldUse: string;
  explanation: string[];
  steps: string[];
  formula?: string;
  example: string;
  commonMistakes: string[];
  faq: { question: string; answer: string }[];
  cta: string;
  updatedAt: string;
}

interface RawSeoGuide {
  id: string;
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  category: string;
  priority: number;
  searchIntent: string;
  targetKeywords: string[];
  relatedToolIds: string[];
  relatedGuideIds: string[];
  relatedWorkflowIds: string[];
  summary: string;
  problem: string;
  whoShouldUse: string;
  explanation: string[];
  steps: string[];
  formula?: string;
  example: string;
  commonMistakes: string[];
  faq: { question: string; answer: string }[];
  cta: string;
  updatedAt: string;
}

type EnglishSeoGuideContent = Omit<RawSeoGuide, 'id' | 'slug' | 'priority' | 'relatedToolIds' | 'relatedGuideIds' | 'relatedWorkflowIds' | 'updatedAt'>;

export const statisticsDisclaimer = {
  zh: '本頁協助計算與報告撰寫，但使用者仍應確認自己的研究設計、假設條件與統計解釋。',
  en: 'This page helps with calculation and reporting, but users should still confirm their research design, assumptions, and statistical interpretation.',
} satisfies LocalizedText;

function text(zh: string, en?: string): LocalizedText {
  return { zh, en: en ?? zh };
}

function localizeRawGuide(guide: RawSeoGuide): SeoGuide {
  const en = englishGuideContent[guide.slug];

  return {
    ...guide,
    locales: ['zh', 'en'],
    title: text(guide.title, en.title),
    metaTitle: text(guide.metaTitle, en.metaTitle),
    metaDescription: text(guide.metaDescription, en.metaDescription),
    h1: text(guide.h1, en.h1),
    category: text(guide.category, en.category),
    searchIntent: text(guide.searchIntent, en.searchIntent),
    targetKeywords: guide.targetKeywords.map((keyword, index) => text(keyword, en.targetKeywords[index])),
    summary: text(guide.summary, en.summary),
    problem: text(guide.problem, en.problem),
    whoShouldUse: text(guide.whoShouldUse, en.whoShouldUse),
    explanation: guide.explanation.map((paragraph, index) => text(paragraph, en.explanation[index])),
    steps: guide.steps.map((step, index) => text(step, en.steps[index])),
    formula: guide.formula ? text(guide.formula, en.formula) : undefined,
    example: text(guide.example, en.example),
    commonMistakes: guide.commonMistakes.map((mistake, index) => text(mistake, en.commonMistakes[index])),
    faq: guide.faq.map((item, index) => ({
      question: text(item.question, en.faq[index].question),
      answer: text(item.answer, en.faq[index].answer),
    })),
    cta: text(guide.cta, en.cta),
  };
}

export function viewSeoGuide(guide: SeoGuide, lang: Locale): SeoGuideView {
  return {
    ...guide,
    title: guide.title[lang],
    metaTitle: guide.metaTitle[lang],
    metaDescription: guide.metaDescription[lang],
    h1: guide.h1[lang],
    category: guide.category[lang],
    searchIntent: guide.searchIntent[lang],
    targetKeywords: guide.targetKeywords.map((keyword) => keyword[lang]),
    summary: guide.summary[lang],
    problem: guide.problem[lang],
    whoShouldUse: guide.whoShouldUse[lang],
    explanation: guide.explanation.map((paragraph) => paragraph[lang]),
    steps: guide.steps.map((step) => step[lang]),
    formula: guide.formula?.[lang],
    example: guide.example[lang],
    commonMistakes: guide.commonMistakes.map((mistake) => mistake[lang]),
    faq: guide.faq.map((item) => ({ question: item.question[lang], answer: item.answer[lang] })),
    cta: guide.cta[lang],
  };
}

export function isSeoGuideAvailableInLocale(guide: SeoGuide, lang: Locale): boolean {
  return guide.locales.includes(lang);
}

const rawSeoGuides: RawSeoGuide[] = [
  {
    id: 't-score-calculator-guide',
    slug: 't-score-calculator-guide',
    title: 'T 分數計算完整指南',
    metaTitle: 'T 分數計算完整指南：公式、Z 分數轉換與教師甄試解讀',
    metaDescription: '用教師甄試與教育測驗情境理解 T 分數公式、Z 分數轉換、PR 差異與常見錯誤，含完整數字範例。',
    h1: 'T 分數怎麼算？教師甄試與教育測驗的完整指南',
    category: '教育統計',
    priority: 1,
    searchIntent: '想把原始分數或 Z 分數轉成 T 分數，並理解教師甄試成績單中的相對位置。',
    targetKeywords: ['T 分數計算', 'T 分數公式', '教師甄試 T 分數', 'Z 分數轉 T 分數'],
    relatedToolIds: ['t-score-calculator', 'z-score-calculator', 'percentile-rank-calculator', 'teacher-exam-score-converter'],
    relatedGuideIds: ['z-score-calculator-guide', 'percentile-rank-guide', 'teacher-exam-weighted-score-guide'],
    relatedWorkflowIds: ['teacher-exam-score-toolkit'],
    summary: 'T 分數把 Z 分數放到平均 50、標準差 10 的量尺上，讓教育測驗與教師甄試成績更容易比較。',
    problem: '只看原始分數時，無法知道該分數在同一群考生中高於或低於平均多少。不同科目、不同年度或不同測驗的平均與標準差也可能不同。',
    whoShouldUse: '適合教師甄試考生、教育研究生、需要解讀標準分數的教師，以及正在整理測驗結果的人。',
    explanation: [
      'T 分數不是百分制分數，而是標準分數的一種轉換。常見量尺設定為平均 50、標準差 10，因此 T=60 通常表示高於平均一個標準差，T=40 則表示低於平均一個標準差。',
      '教師甄試或教育測驗使用 T 分數，是為了把不同分布的成績放到同一比較基準。這不代表錄取規則只看 T 分數，仍要依公告的加權、門檻、排序與同分處理規則。',
      statisticsDisclaimer.zh,
    ],
    steps: [
      '確認原始分數 X、群體平均 M、標準差 SD 都來自同一批資料。',
      '先計算 Z = (X - M) / SD，標準差必須大於 0。',
      '套用常見公式 T = 50 + 10Z。',
      '解讀時同時保留原始分數、平均、標準差與 T 分數，不要只留下轉換後的數字。',
    ],
    formula: 'Z = (X - M) / SD；T = 50 + 10Z。',
    example: '例如某科原始分數 82，該科平均 70、標準差 8。Z = (82 - 70) / 8 = 1.50，T = 50 + 10 × 1.50 = 65。這表示分數高於該群體平均 1.5 個標準差，而不是「得到 65%」。',
    commonMistakes: [
      '把 T 分數當成百分比或滿分 100 的成績。',
      '用不同年度或不同群體的平均與標準差混在一起計算。',
      '標準差為 0 或資料太少時仍硬算標準分數。',
      '過早四捨五入，造成後續加權或排序差異。',
    ],
    faq: [
      { question: 'T 分數越高一定越好嗎？', answer: '在同一量尺與同一群體內通常代表相對位置較高，但正式結果仍取決於公告的加權與錄取規則。' },
      { question: 'T 分數和 Z 分數差在哪？', answer: 'Z 分數以平均 0、標準差 1 表示距離；T 分數通常把 Z 分數轉成平均 50、標準差 10，較容易閱讀。' },
      { question: 'T 分數可以直接轉 PR 嗎？', answer: '只有在分布假設合理或有完整群體資料時才適合估算 PR，否則可能只是粗略推測。' },
      { question: '教師甄試一定使用 T 分數嗎？', answer: '不一定。各縣市、學校或年度可能採不同規則，請以當次簡章或成績公告為準。' },
    ],
    cta: '先用 T 分數計算器確認轉換，再搭配 Z 分數與 PR 工具檢查解讀是否一致。',
    updatedAt: '2026-06-25',
  },
  {
    id: 'z-score-calculator-guide',
    slug: 'z-score-calculator-guide',
    title: 'Z 分數計算與標準化解讀',
    metaTitle: 'Z 分數計算指南：平均、標準差與正負值怎麼看',
    metaDescription: '理解 Z 分數公式、平均與標準差的角色，學會解讀正值、負值與 0，含教育測驗數字範例。',
    h1: 'Z 分數怎麼算？平均與標準差的標準化指南',
    category: '教育統計',
    priority: 2,
    searchIntent: '想知道一個分數距離平均值多遠，以及 Z 分數正負號代表什麼。',
    targetKeywords: ['Z 分數計算', 'Z score 公式', '標準分數', '平均 標準差'],
    relatedToolIds: ['z-score-calculator', 't-score-calculator', 'standard-deviation'],
    relatedGuideIds: ['t-score-calculator-guide', 'percentile-rank-guide'],
    relatedWorkflowIds: ['teacher-exam-score-toolkit', 'graduate-statistics-report-toolkit'],
    summary: 'Z 分數用標準差作單位描述原始分數距離平均多少，是 T 分數、PR 估計與測驗比較的基礎。',
    problem: '同樣 5 分的差距，在分數很集中與很分散的班級中意義不同。Z 分數能把差距轉成標準差單位，讓比較更有脈絡。',
    whoShouldUse: '適合正在做分數標準化、班級成績分析、教師甄試試算與統計作業的人。',
    explanation: [
      'Z=0 代表剛好等於平均；Z>0 代表高於平均；Z<0 代表低於平均。Z=1 代表高於平均一個標準差，Z=-2 代表低於平均兩個標準差。',
      'Z 分數本身不會讓偏態資料變成常態資料，也不會解決抽樣或測驗設計問題。解讀極端值時仍要看資料分布、樣本大小與測量品質。',
      statisticsDisclaimer.zh,
    ],
    steps: [
      '準備原始分數 X、平均 M、標準差 SD。',
      '確認 SD 大於 0，且三個數值都來自同一資料集。',
      '計算 Z = (X - M) / SD。',
      '用正負號與絕對值解讀位置，再視需要轉成 T 分數。',
    ],
    formula: 'Z = (X - M) / SD。',
    example: '班級測驗平均 76、標準差 6，學生甲得 88 分。Z = (88 - 76) / 6 = 2.00，表示高於班級平均兩個標準差。學生乙得 70 分，Z = (70 - 76) / 6 = -1.00，表示低於平均一個標準差。',
    commonMistakes: [
      '只看 Z 分數大小，沒有報告平均與標準差。',
      '把 Z=2 解讀成「多 2 分」而不是「多 2 個標準差」。',
      '用樣本很小或標準差不穩定的資料做過度解釋。',
      '忽略分布形狀，直接把 Z 分數等同常態百分位。',
    ],
    faq: [
      { question: 'Z 分數 0 是好還是壞？', answer: 'Z=0 只代表等於平均，不代表好壞。好壞要看測驗目的、標準與群體。' },
      { question: 'Z 分數可以是負數嗎？', answer: '可以。負數代表低於平均，正數代表高於平均。' },
      { question: '標準差越大 Z 分數會怎樣？', answer: '在相同原始差距下，標準差越大，Z 分數絕對值越小，代表該差距在群體中較不突出。' },
      { question: 'Z 分數能直接用於教師甄試排名嗎？', answer: '只能作理解或試算，正式排名仍要依公告規則與完整資料。' },
    ],
    cta: '用 Z 分數計算器先確認標準化結果，再視情境轉成 T 分數或搭配標準差工具檢查資料。',
    updatedAt: '2026-06-25',
  },
  {
    id: 'percentile-rank-guide',
    slug: 'percentile-rank-guide',
    title: 'PR 百分等級解讀指南',
    metaTitle: 'PR 百分等級是什麼？和百分比分數、排名的差異',
    metaDescription: '用教育測驗例子理解 PR 百分等級、百分比分數與排序位置的差異，避免把 PR 當原始分數。',
    h1: 'PR 百分等級怎麼看？不要把相對位置當原始分數',
    category: '教育統計',
    priority: 3,
    searchIntent: '想知道 PR 代表什麼、和百分比成績有何不同，以及如何搭配 T/Z 分數解讀。',
    targetKeywords: ['PR 百分等級', 'percentile rank', 'PR 分數', '百分等級 解讀'],
    relatedToolIds: ['percentile-rank-calculator', 't-score-calculator', 'z-score-calculator'],
    relatedGuideIds: ['t-score-calculator-guide', 'z-score-calculator-guide'],
    relatedWorkflowIds: ['teacher-exam-score-toolkit'],
    summary: 'PR 描述一個分數高於多少比例的比較群體，是排序與相對位置概念，不是答對率。',
    problem: '許多人看到 PR 80 會誤以為得到 80 分或答對 80%，但 PR 80 的意思是相對位置約高於 80% 的比較對象。',
    whoShouldUse: '適合解讀測驗報告、班級排名、教師甄試成績與家長溝通資料的人。',
    explanation: [
      'PR 是 ordinal/ranking 性質的指標，重點在位置，不在原始分數距離。PR 90 與 PR 80 的差，不一定等於 PR 60 與 PR 50 的差。',
      '百分比分數回答「答對多少比例」；PR 回答「相對於比較群體的位置」。兩者可能同時出現在成績單上，但不能互換。',
      statisticsDisclaimer.zh,
    ],
    steps: [
      '先確認 PR 的比較群體，例如全班、全校、全國常模或某次考試考生。',
      '判斷 PR 是由實際排序、常態估計或工具公式計算而來。',
      '同時保留原始分數、T/Z 分數或排名資訊，避免只引用 PR。',
      '對外說明時使用「約高於多少比例」而非「得到多少分」。',
    ],
    formula: '常見概念：PR 表示低於或等於某分數的觀察值比例，實務公式會依排名、同分處理與資料型態而不同。',
    example: '若 100 位考生中有 72 人分數低於某考生，另有 4 人同分，採中位排名概念可估為 PR = (72 + 0.5 × 4) / 100 × 100 = 74。這代表相對位置約 PR 74，不代表該考生考了 74 分。',
    commonMistakes: [
      '把 PR 當百分比分數或答對率。',
      '忽略比較群體不同，拿不同常模的 PR 互比。',
      '把 PR 差距當等距量尺做平均或加減。',
      '在同分很多時沒有說明排名或處理方式。',
    ],
    faq: [
      { question: 'PR 90 是前 10% 嗎？', answer: '大致可理解為高於約 90% 的比較群體，但實際是否等於前 10% 要看排名與同分處理。' },
      { question: 'PR 可以和原始分數相加嗎？', answer: '不建議。PR 是相對位置，原始分數是測驗分數，量尺不同。' },
      { question: 'PR 和百分比成績一樣嗎？', answer: '不一樣。百分比成績是得分比例，PR 是相對於群體的位置。' },
      { question: 'PR 可以由 Z 分數估算嗎？', answer: '在常態分布假設合理時可以估算，但有偏態、樣本小或常模不明時要保守。' },
    ],
    cta: '使用 PR 計算器估算相對位置，並搭配 T 分數與 Z 分數工具完整解讀。',
    updatedAt: '2026-06-25',
  },
  {
    id: 'teacher-exam-weighted-score-guide',
    slug: 'teacher-exam-weighted-score-guide',
    title: '教師甄試加權成績計算指南',
    metaTitle: '教師甄試加權成績怎麼算？筆試、試教、口試權重範例',
    metaDescription: '用實際數字說明教師甄試筆試、試教、口試與資料審查的加權公式，避免直接相加原始分數。',
    h1: '教師甄試加權成績怎麼算？從權重到總分的完整流程',
    category: '教師甄試',
    priority: 1,
    searchIntent: '想把筆試、試教、口試或資料審查成績依公告權重合成總分。',
    targetKeywords: ['教師甄試加權成績', '教師甄試總分計算', '加權平均', '筆試 試教 口試 權重'],
    relatedToolIds: ['teacher-exam-score-converter', 'weighted-average-calculator', 't-score-calculator'],
    relatedGuideIds: ['t-score-calculator-guide', 'z-score-calculator-guide', 'percentile-rank-guide'],
    relatedWorkflowIds: ['teacher-exam-score-toolkit'],
    summary: '教師甄試常把筆試、試教、口試與資料審查依不同權重合成總分，重點是先確認權重總和與官方規則。',
    problem: '若直接把各項原始分數相加，會把 70% 的筆試和 10% 的資料審查看成同等重要，導致總分完全錯誤。',
    whoShouldUse: '適合準備教師甄試、代理教師甄選、校內甄選試算，以及需要檢查成績表的人。',
    explanation: [
      '加權總分的核心是「分數 × 權重」後加總。權重可用百分比或小數表示，但同一張表中要一致，且通常總和應為 100% 或 1。',
      '有些甄試會先做門檻、複試資格、標準化或同分比序，這些不應被簡化成單一加權公式。工具只能協助試算，不代表官方結果。',
      statisticsDisclaimer.zh,
    ],
    steps: [
      '從簡章或公告抄下每一項名稱與權重，例如筆試、試教、口試、資料審查。',
      '檢查權重總和是否為 100%。若不是，先確認是否有缺項或特殊規則。',
      '逐項計算分數 × 權重，例如 84 × 0.5。',
      '加總所有加權後分數，最後才依公告規則四捨五入。',
    ],
    formula: '加權總分 = Σ(項目分數 × 項目權重)。權重 50% 可輸入為 0.50。',
    example: '某甄試筆試 50%、試教 30%、口試 20%。考生筆試 82、試教 88、口試 90，總分 = 82×0.50 + 88×0.30 + 90×0.20 = 41 + 26.4 + 18 = 85.4。',
    commonMistakes: [
      '把 50% 輸入成 50 而不是 0.50，或同時混用百分比與小數。',
      '直接加總 82+88+90，沒有乘上權重。',
      '權重總和不是 100% 卻沒有回頭查公告。',
      '每一步都四捨五入，造成最後總分偏差。',
    ],
    faq: [
      { question: '權重一定要加總 100% 嗎？', answer: '多數加權總分會加總 100%，但仍需依正式公告。若公告有特殊換算，應照公告處理。' },
      { question: '筆試分數和試教分數可以直接比較嗎？', answer: '不建議。兩項評量目的與權重不同，應先依規則加權後再解讀總分。' },
      { question: '加權後還需要 T 分數嗎？', answer: '視公告而定。有些流程使用原始加權總分，有些可能再做標準化或排名。' },
      { question: '何時四捨五入最安全？', answer: '通常保留完整精度到最後，再依公告的小數位數規則處理。' },
    ],
    cta: '用教師甄試成績轉換工具輸入各項分數與權重，再用加權平均工具交叉檢查。',
    updatedAt: '2026-06-25',
  },
  {
    id: 'spss-levene-test-guide',
    slug: 'spss-levene-test-guide',
    title: 'SPSS Levene 檢定解讀指南',
    metaTitle: 'SPSS Levene 檢定怎麼看？獨立樣本 t 檢定讀哪一列',
    metaDescription: '說明 Levene 檢定檢查變異數同質性，p >= .05 與 p < .05 時如何選擇 SPSS t 檢定列。',
    h1: 'SPSS Levene 檢定怎麼看？獨立樣本 t 檢定列的選擇',
    category: '研究與 SPSS',
    priority: 2,
    searchIntent: '已經有 SPSS 獨立樣本 t 檢定輸出，想知道 Levene 顯著時要讀哪一列。',
    targetKeywords: ['SPSS Levene 檢定', '變異數同質性', 'equal variances assumed', 'independent samples t test SPSS'],
    relatedToolIds: ['spss-result-interpreter', 'apa-7-report-generator', 'independent-samples-t-test-calculator'],
    relatedGuideIds: ['t-test-apa-format-guide', 'anova-apa-format-guide', 'two-way-anova-interaction-guide'],
    relatedWorkflowIds: ['graduate-statistics-report-toolkit'],
    summary: 'Levene 檢定用來檢查兩組變異數是否可視為相等，會影響 SPSS 獨立樣本 t 檢定該讀第一列或第二列。',
    problem: '常見錯誤是永遠讀 SPSS 表格第一列，卻忽略 Levene 檢定已顯著，導致 t、df、p 值抄錯。',
    whoShouldUse: '適合正在寫論文、作業或研究報告，且使用 SPSS 獨立樣本 t 檢定的人。',
    explanation: [
      'Levene 的虛無假設是兩組變異數相等。若 p >= .05，通常可讀 Equal variances assumed；若 p < .05，通常讀 Equal variances not assumed，也就是 Welch 修正那一列。',
      'Levene 不是在檢定平均數差異，而是在協助選擇 t 檢定結果列。平均數是否顯著，仍要看對應列的 t、df、p 與信賴區間。',
      statisticsDisclaimer.zh,
    ],
    steps: [
      '在 SPSS Independent Samples Test 表中先找到 Levene’s Test for Equality of Variances。',
      '查看 Sig. 欄位，判斷 p 是否小於 .05。',
      'p >= .05 時讀 Equal variances assumed 那一列。',
      'p < .05 時讀 Equal variances not assumed 那一列，並抄該列的 t、df、p。',
    ],
    formula: '判斷規則：Levene p >= .05 -> equal variances assumed；Levene p < .05 -> equal variances not assumed。',
    example: '研究比較兩組學生閱讀成績，SPSS 顯示 Levene F = 6.21, p = .015。因 p < .05，不讀第一列，而讀 Equal variances not assumed。若該列 t = 2.48, df = 37.62, p = .018，APA 報告就應使用這些數字。',
    commonMistakes: [
      '把 Levene p 值當成平均數差異的 p 值。',
      'Levene 顯著時仍抄第一列 equal variances assumed。',
      '只報告 p 值，沒有報告 t、df 或效果量。',
      '沒有確認研究設計是否真的適合獨立樣本 t 檢定。',
    ],
    faq: [
      { question: 'Levene p = .05 要讀哪一列？', answer: '常見規則以 p < .05 視為顯著；p = .05 的處理需依課程或期刊規範，保守做法是清楚說明判準。' },
      { question: 'Levene 顯著代表兩組平均數不同嗎？', answer: '不是。它檢查變異數同質性，不是平均數差異。' },
      { question: '第二列的 df 有小數正常嗎？', answer: '正常。Equal variances not assumed 常使用 Welch 修正，自由度可能是小數。' },
      { question: '配對樣本 t 檢定也看 Levene 嗎？', answer: '通常不看。Levene 常用於獨立樣本兩組比較的變異數同質性判斷。' },
    ],
    cta: '把 SPSS 表格結果放進 SPSS 解讀器確認該讀哪一列，再用 APA 7 工具整理報告句。',
    updatedAt: '2026-06-25',
  },
  {
    id: 't-test-apa-format-guide',
    slug: 't-test-apa-format-guide',
    title: 't 檢定 APA 7 報告格式指南',
    metaTitle: 't 檢定 APA 7 怎麼寫？獨立樣本、配對樣本與 p 值格式',
    metaDescription: '整理 t 檢定 APA 7 報告重點：t、df、p、Cohen’s d、獨立樣本與配對樣本例句。',
    h1: 't 檢定 APA 7 報告格式：t、df、p 與 Cohen’s d 怎麼寫',
    category: '研究與 APA',
    priority: 3,
    searchIntent: '想把 t 檢定結果寫成符合 APA 7 的研究報告句。',
    targetKeywords: ['t 檢定 APA 7', 'independent t test APA', 'paired t test APA', 'Cohen d 報告'],
    relatedToolIds: ['apa-7-report-generator', 'spss-result-interpreter'],
    relatedGuideIds: ['spss-levene-test-guide', 'anova-apa-format-guide'],
    relatedWorkflowIds: ['graduate-statistics-report-toolkit'],
    summary: 'APA 7 的 t 檢定報告通常需要說明檢定類型、描述統計、t、df、p 值與效果量。',
    problem: '只寫「兩組達顯著差異」不夠，讀者無法知道檢定類型、自由度、顯著水準、效果量與方向。',
    whoShouldUse: '適合撰寫論文、課堂作業、研究報告與 SPSS 結果整理的人。',
    explanation: [
      '獨立樣本 t 檢定比較兩個獨立群體；配對樣本 t 檢定比較同一批受試者兩次測量或配對資料。報告時應先確認設計，不要只看 SPSS 表名。',
      'p 值通常寫成 p = .032，若小於 .001 則寫 p < .001。APA 風格中小於 1 的統計值常省略前導 0，但請依課程或期刊規定。',
      statisticsDisclaimer.zh,
    ],
    steps: [
      '確認是獨立樣本、配對樣本，或單一樣本 t 檢定。',
      '整理每組平均數與標準差，必要時附樣本數。',
      '從正確列抄 t、df、p，獨立樣本需先看 Levene。',
      '加入效果量，例如 Cohen’s d，並用文字說明差異方向。',
    ],
    formula: '常見 APA 片段：t(df) = value, p = value, d = value。',
    example: '獨立樣本例句：實驗組的後測分數 (M = 82.40, SD = 7.10) 高於控制組 (M = 76.30, SD = 8.20)，差異達顯著，t(58) = 3.07, p = .003, d = 0.79。配對樣本例句：學生後測分數 (M = 85.20, SD = 6.40) 高於前測 (M = 78.10, SD = 7.50)，t(29) = 5.12, p < .001, d = 0.93。',
    commonMistakes: [
      '把 Levene 的 p 值當成 t 檢定 p 值。',
      '沒有報告 df，或抄錯 equal variances 的列。',
      'p 值寫成 0.000，而不是 p < .001。',
      '沒有說明哪一組較高或差異方向。',
    ],
    faq: [
      { question: 't 檢定一定要報 Cohen’s d 嗎？', answer: '許多課程與期刊會要求效果量。即使未強制，報告效果量有助於理解差異大小。' },
      { question: 'p = .000 可以照抄 SPSS 嗎？', answer: '不建議。通常改寫為 p < .001。' },
      { question: 'df 有小數可以寫嗎？', answer: '可以。Welch t 檢定或修正方法可能產生小數自由度。' },
      { question: '描述統計要放在哪裡？', answer: '可放在同一句或前一句，至少要讓讀者知道各組平均數與標準差。' },
    ],
    cta: '先確認 SPSS 結果列，再用 APA 7 報告產生器整理可修改的報告句。',
    updatedAt: '2026-06-25',
  },
  {
    id: 'anova-apa-format-guide',
    slug: 'anova-apa-format-guide',
    title: 'ANOVA APA 7 報告格式指南',
    metaTitle: 'ANOVA APA 7 怎麼寫？F、df、p、eta squared 與事後比較',
    metaDescription: '整理單因子與二因子 ANOVA 的 APA 7 報告格式，含 F(df1, df2)、p、eta squared 與 post-hoc 提醒。',
    h1: 'ANOVA APA 7 報告格式：F、自由度、p 值與效果量',
    category: '研究與 APA',
    priority: 4,
    searchIntent: '想把單因子或二因子 ANOVA 結果寫成 APA 7 報告句。',
    targetKeywords: ['ANOVA APA 7', 'F 檢定 APA', 'eta squared', 'partial eta squared'],
    relatedToolIds: ['apa-7-report-generator', 'spss-result-interpreter'],
    relatedGuideIds: ['t-test-apa-format-guide', 'two-way-anova-interaction-guide', 'spss-levene-test-guide'],
    relatedWorkflowIds: ['graduate-statistics-report-toolkit'],
    summary: 'ANOVA 報告通常包含效果名稱、F(df1, df2)、p 值、效果量，以及必要時的事後比較結果。',
    problem: 'ANOVA 表格有多列，若沒有標明主效果、交互作用與事後比較，讀者很難知道哪個因素真的有差異。',
    whoShouldUse: '適合寫論文、研究報告、課堂統計作業，以及需要將 SPSS ANOVA 表轉成文字的人。',
    explanation: [
      '單因子 ANOVA 報告一個自變項的組間差異；二因子 ANOVA 需分別處理兩個主效果與交互作用。若交互作用顯著，通常先解讀交互作用，再謹慎看主效果。',
      '效果量可依課程或期刊要求使用 eta squared 或 partial eta squared。符號常見為 η² 或 ηp²；若環境不便輸入符號，可用文字寫 eta squared 或 partial eta squared。',
      statisticsDisclaimer.zh,
    ],
    steps: [
      '確認 ANOVA 類型：單因子、二因子、重複量數或混合設計。',
      '找到要報告的效果列，抄 F、df1、df2 與 p。',
      '加入效果量，例如 η² 或 partial η²。',
      '若整體 F 顯著且有三組以上，依研究問題補上 post-hoc 或 planned comparisons。',
    ],
    formula: '常見 APA 片段：F(df1, df2) = value, p = value, eta squared = value。',
    example: '單因子例句：不同教學法在後測成績上有顯著差異，F(2, 87) = 6.42, p = .003, η² = .13。Tukey 事後比較顯示，合作學習組顯著高於講述組。二因子例句：教學法與年級的交互作用達顯著，F(2, 114) = 4.18, p = .018, partial η² = .07。',
    commonMistakes: [
      '只報告 p 值，沒有 F 與自由度。',
      '二因子 ANOVA 忽略交互作用，直接解讀主效果。',
      '整體 ANOVA 顯著後沒有說明哪些組不同。',
      '混用 η² 與 partial η²，卻沒有標明使用哪一種。',
    ],
    faq: [
      { question: 'ANOVA 顯著就代表每一組都不同嗎？', answer: '不是。整體 F 顯著只表示至少有組別差異，通常需要事後比較確認差異在哪裡。' },
      { question: 'df1 和 df2 要怎麼放？', answer: 'APA 通常寫成 F(df1, df2)，例如 F(2, 87) = 6.42。' },
      { question: '二因子 ANOVA 要報幾個結果？', answer: '通常至少報兩個主效果與一個交互作用，實際取決於研究問題與模型。' },
      { question: '可以只寫 partial eta squared 嗎？', answer: '可以，若你的課程、期刊或軟體輸出要求它。重點是標明效果量類型。' },
    ],
    cta: '用 APA 7 報告產生器整理 F 檢定句，再回到 SPSS 輸出確認效果列與事後比較。',
    updatedAt: '2026-06-25',
  },
  {
    id: 'two-way-anova-interaction-guide',
    slug: 'two-way-anova-interaction-guide',
    title: '二因子 ANOVA 交互作用解讀指南',
    metaTitle: '二因子 ANOVA 交互作用怎麼解讀？主效果、簡單主效果與例子',
    metaDescription: '用白話與數字例子說明二因子 ANOVA 交互作用、主效果差異，以及何時進行簡單主效果分析。',
    h1: '二因子 ANOVA 交互作用怎麼解讀？先看交互作用再看主效果',
    category: '研究與 SPSS',
    priority: 5,
    searchIntent: '想理解二因子 ANOVA 中 interaction、main effect 與 simple main effects 的差異。',
    targetKeywords: ['二因子 ANOVA 交互作用', 'interaction effect', 'simple main effects', '主效果 交互作用'],
    relatedToolIds: ['apa-7-report-generator', 'spss-result-interpreter'],
    relatedGuideIds: ['anova-apa-format-guide', 't-test-apa-format-guide', 'spss-levene-test-guide'],
    relatedWorkflowIds: ['graduate-statistics-report-toolkit'],
    summary: '交互作用表示一個因素的效果會隨另一個因素水準改變；在二因子 ANOVA 中通常要優先解讀。',
    problem: '如果交互作用顯著，單純說「教學法有效」可能會誤導，因為效果可能只出現在某個年級、性別或條件下。',
    whoShouldUse: '適合正在分析二因子 ANOVA、解讀 SPSS 表格或撰寫研究結果的人。',
    explanation: [
      '主效果回答「某因素整體上是否有差異」；交互作用回答「某因素的差異是否取決於另一因素」。當交互作用顯著時，平均化後的主效果可能掩蓋重要模式。',
      '簡單主效果是在另一個因素的特定水準內檢查差異，例如分別在低年級與高年級中比較兩種教學法。是否需要做，取決於研究問題與交互作用結果。',
      statisticsDisclaimer.zh,
    ],
    steps: [
      '先看交互作用列是否顯著，例如 teaching method × grade。',
      '若交互作用顯著，畫平均數圖或整理各格平均數。',
      '依研究問題進行簡單主效果或事後比較。',
      '最後再補充主效果，但避免把主效果寫成唯一結論。',
    ],
    formula: '二因子 ANOVA 報告常見順序：interaction -> simple main effects -> main effects。',
    example: '假設比較教學法 A/B 與年級高/低對閱讀分數的影響。低年級中 A=78、B=77 幾乎相同；高年級中 A=88、B=80 差距明顯。若交互作用 F(1, 76) = 5.90, p = .018，代表教學法效果會隨年級改變，接著應檢查各年級內的教學法差異。',
    commonMistakes: [
      '交互作用顯著後仍只解讀主效果。',
      '沒有查看各格平均數或圖形就下結論。',
      '把「兩個主效果都顯著」誤稱為交互作用。',
      '做多次簡單主效果卻沒有考慮比較次數或研究假設。',
    ],
    faq: [
      { question: '交互作用不顯著還要做簡單主效果嗎？', answer: '通常不需要，除非研究設計或事前假設有明確理由。' },
      { question: '主效果顯著但交互作用也顯著怎麼辦？', answer: '通常先解讀交互作用，再用主效果作輔助描述，避免忽略條件差異。' },
      { question: '交互作用一定要畫圖嗎？', answer: '不是硬性規定，但平均數圖能幫助檢查方向與是否有交叉或擴散模式。' },
      { question: 'SPSS 會自動給簡單主效果嗎？', answer: '不一定。需要依分析程序、EM Means 或額外比較設定產生。' },
    ],
    cta: '先用 SPSS 解讀器整理交互作用與主效果，再用 APA 7 工具產生可修改的報告文字。',
    updatedAt: '2026-06-25',
  },
  {
    id: 'classroom-random-group-guide',
    slug: 'classroom-random-group-guide',
    title: '課堂隨機分組教學指南',
    metaTitle: '課堂隨機分組教學指南：快速公平分組、組數與人數設定',
    metaDescription: '給老師使用的課堂隨機分組指南：整理學生名單、選擇組數或每組人數、處理缺席學生，並用分組工具快速產生結果。',
    h1: '老師如何用隨機分組工具快速完成公平課堂分組',
    category: '課堂教學',
    priority: 10,
    searchIntent: '老師想把學生快速分成公平小組，並知道該用組數、每組人數或座位調整。',
    targetKeywords: ['課堂隨機分組', '學生分組工具', '老師分組', '公平分組'],
    relatedToolIds: ['group-generator', 'random-group-generator', 'random-student-picker', 'seating-chart'],
    relatedGuideIds: ['fair-student-grouping-guide', 'classroom-random-picker-guide'],
    relatedWorkflowIds: ['teacher-classroom-random-toolkit'],
    summary: '隨機分組適合討論、任務闖關、合作學習與快速換組，重點是先整理名單，再決定要用組數或每組人數。',
    problem: '課堂臨時分組若只靠點名或老師手動安排，容易耗時、重複同組，也可能讓學生覺得分組不透明。',
    whoShouldUse: '適合需要在幾分鐘內完成小組活動、報告分組、實驗分組或討論分組的老師、助教與社團帶領者。',
    explanation: [
      '隨機分組的價值不是取代老師判斷，而是先產生一個透明的起點。老師可以先用 group-generator 或 random-group-generator 產生初稿，再依特殊需求微調。',
      '如果活動需要固定六組，就使用組數；如果每桌最多四人，就使用每組人數。名單中要先刪除請假、外出考試或暫時不參與的學生。',
      '分組結果適合搭配 random-student-picker 指派發表者，或搭配 seating-chart 檢查座位是否方便移動。',
    ],
    steps: [
      '先貼上或輸入本節課實際在場學生名單，每行一位學生。',
      '依活動限制選擇分成幾組，或設定每組幾人。',
      '產生結果後檢查各組人數是否可接受，必要時重新抽一次或手動交換一兩位學生。',
      '公布分組前說明這次使用隨機分組，降低學生質疑分組偏好。',
      '把分組結果複製到投影片、白板或班級平台，讓學生能直接移動。',
    ],
    example: '30 位學生要做 10 分鐘小組討論，老師使用 group-generator 設定 6 組，每組 5 人。若有 2 位學生請假，先把名單改成 28 人，再改成 6 組，最後會有部分小組 4 人、部分 5 人，老師可依座位微調。',
    commonMistakes: [
      '忘記刪除缺席學生，導致某組少人或需要臨時重抽。',
      '活動需要固定桌數，卻用每組人數設定，產生太多組別。',
      '完全不看結果就公布，忽略特殊支援需求或座位限制。',
      '每次都重新隨機，沒有記錄上次組員，造成同學反覆同組。',
    ],
    faq: [
      { question: '課堂隨機分組一定比老師指定公平嗎？', answer: '不一定。隨機分組提供透明起點，但老師仍可依學習需求、座位、支援需求做少量調整。' },
      { question: '應該用組數還是每組人數？', answer: '若活動有固定任務站、桌數或報告順序，用組數。若每組工作量與討論品質更重要，用每組人數。' },
      { question: '學生不想和某人同組怎麼辦？', answer: '可以先用隨機結果，再保留老師微調空間。工具處理分配，班級經營仍由老師判斷。' },
      { question: '分組結果可以保留嗎？', answer: '可以複製到文件或班級平台。若下次要避免重複同組，建議保留上次結果作為調整依據。' },
    ],
    cta: '開啟學生分組工具，貼上本節課名單，先產生一版可檢查的課堂分組。',
    updatedAt: '2026-06-26',
  },
  {
    id: 'classroom-random-picker-guide',
    slug: 'classroom-random-picker-guide',
    title: '課堂隨機點名與抽人指南',
    metaTitle: '課堂隨機點名與抽人指南：提升參與、發表順序與快速複習',
    metaDescription: '了解老師如何使用隨機點名工具安排回答、報告順序與複習活動，同時降低學生壓力並保持課堂透明。',
    h1: '如何用課堂隨機抽人工具提升學生參與',
    category: '課堂教學',
    priority: 11,
    searchIntent: '老師想用隨機抽人點名、安排回答或發表順序，但希望避免讓學生尷尬。',
    targetKeywords: ['課堂隨機點名', '隨機抽學生', '學生抽籤', '課堂參與工具'],
    relatedToolIds: ['random-student-picker', 'random-name-picker', 'random-group-generator', 'countdown-timer'],
    relatedGuideIds: ['classroom-lottery-tool-guide', 'classroom-random-group-guide'],
    relatedWorkflowIds: ['teacher-classroom-random-toolkit'],
    summary: '隨機抽人能讓回答、報告順序與複習活動更透明，但老師需要先設定安全規則，避免學生被突襲或公開難堪。',
    problem: '如果老師只固定叫少數學生，參與容易集中；如果抽人方式不透明，學生又可能覺得被針對。',
    whoShouldUse: '適合想安排回答、簡報順序、小組代表、快速複習或課堂互動的老師。',
    explanation: [
      'random-student-picker 適合班級名單，random-name-picker 適合臨時活動名單。兩者都能把抽人流程攤開，讓學生知道不是老師主觀指定。',
      '隨機抽人不應該用來羞辱學生。可以先允許一次 pass、讓小組討論 30 秒，再抽代表回答。',
      '若要連接活動流程，可以先用 random-group-generator 分組，再用 countdown-timer 給討論時間，最後抽小組或學生發表。',
    ],
    steps: [
      '準備實際會參與的學生或小組名單。',
      '先說明抽人目的，例如分享想法、決定順序或快速複習。',
      '使用 random-student-picker 或 random-name-picker 抽出學生。',
      '給學生短暫思考或小組支援時間，再請他回答或發表。',
      '必要時記錄已抽過的人，避免短時間內重複壓力。',
    ],
    example: '英文課複習單字時，老師先給各組 2 分鐘用 countdown-timer 討論，再用 random-student-picker 抽一位代表說明例句。學生知道可以先和組員準備，抽人就比較像參與機會，而不是突襲考試。',
    commonMistakes: [
      '沒有說明規則就直接抽人，讓學生覺得被處罰。',
      '抽到不會回答的學生時公開責備，削弱後續參與意願。',
      '忘記排除缺席或暫時離開教室的學生。',
      '連續抽同一位學生，沒有追蹤已抽過名單。',
    ],
    faq: [
      { question: '隨機抽人會不會增加學生焦慮？', answer: '如果沒有支援規則，可能會。建議先給思考時間、允許小組協助，並避免把抽人當成懲罰。' },
      { question: '可以用來安排報告順序嗎？', answer: '可以。把小組或學生名單放入 random-name-picker，就能產生透明的發表順序。' },
      { question: '抽到缺席學生怎麼辦？', answer: '最好在抽之前更新名單。若已抽到，直接略過並重新抽，不要把缺席者算入公平輪替。' },
      { question: '要用學生抽選器還是一般姓名抽選器？', answer: '班級名單與教學情境優先用 random-student-picker；臨時名單、活動名單可用 random-name-picker。' },
    ],
    cta: '開啟隨機學生抽選器，貼上班級名單，為下一題回答或小組發表抽出代表。',
    updatedAt: '2026-06-26',
  },
  {
    id: 'classroom-timer-guide',
    slug: 'classroom-timer-guide',
    title: '課堂計時器使用指南',
    metaTitle: '課堂計時器使用指南：討論、發表、學習單與小組活動控時',
    metaDescription: '給老師的課堂倒數計時器指南：如何安排討論、發表、學習單與轉換時間，並搭配分組和抽人工具完成活動。',
    h1: '老師如何用倒數計時器掌握課堂活動節奏',
    category: '課堂教學',
    priority: 13,
    searchIntent: '老師想用倒數計時器控制討論、發表、學習單或小組活動時間。',
    targetKeywords: ['課堂計時器', '教室倒數計時器', '小組討論計時', '老師計時工具'],
    relatedToolIds: ['countdown-timer', 'pomodoro-timer', 'random-group-generator', 'random-student-picker'],
    relatedGuideIds: ['classroom-random-group-guide', 'classroom-random-picker-guide'],
    relatedWorkflowIds: ['teacher-classroom-random-toolkit'],
    summary: '倒數計時器讓學生知道剩餘時間，也讓老師能把討論、發表、轉換與收束安排得更穩定。',
    problem: '沒有清楚時間界線時，小組討論容易拖延，發表容易超時，老師也更難把活動收回到下一個教學段落。',
    whoShouldUse: '適合需要控制討論、發表、練習題、學習單、闖關任務與課堂轉換時間的老師。',
    explanation: [
      'countdown-timer 適合短時間活動，例如 3 分鐘討論、5 分鐘書寫、10 分鐘發表。pomodoro-timer 則較適合較長的自學或專題工作段落。',
      '計時不是把學生逼快，而是讓每個階段有共同節奏。老師可以在時間到前提醒一次，讓學生有心理準備。',
      '搭配 random-group-generator 和 random-student-picker 時，流程可以變成先分組、限時討論、再抽代表發表。',
    ],
    steps: [
      '先把活動拆成討論、產出、發表與轉換幾個階段。',
      '為每個階段設定合理時間，並預留 30 秒到 2 分鐘轉換時間。',
      '在 countdown-timer 設定倒數，讓全班都能看到剩餘時間。',
      '時間到前給一次提醒，例如剩 1 分鐘請整理答案。',
      '時間到後立刻進入抽人、發表或收束，避免倒數失去意義。',
    ],
    example: '一段 15 分鐘活動可以分成 5 分鐘小組閱讀、5 分鐘討論、3 分鐘抽代表發表、2 分鐘老師整理。老師使用 countdown-timer 控制前兩段，最後用 random-student-picker 抽代表分享。',
    commonMistakes: [
      '把活動時間設得太短，學生還沒理解任務就被迫結束。',
      '沒有安排轉換時間，導致收材料、移動座位或開啟投影片時超時。',
      '時間到了卻繼續無限延長，學生會慢慢忽略計時器。',
      '所有活動都用同一個時間，沒有依任務難度調整。',
    ],
    faq: [
      { question: '課堂活動應該設定幾分鐘？', answer: '看任務而定。快速討論可從 2 到 5 分鐘開始，產出型任務通常需要 8 到 15 分鐘。' },
      { question: '倒數結束後一定要立刻停止嗎？', answer: '不一定，但建議先建立一致規則。若常常延長，計時器就會失去提醒效果。' },
      { question: '可以搭配隨機抽人嗎？', answer: '可以。先用倒數計時器給準備時間，再抽學生或小組發表，壓力會比直接抽人低。' },
      { question: '什麼時候用番茄鐘？', answer: '番茄鐘適合較長的自學、專題或寫作段落；短課堂活動通常用 countdown-timer 更直接。' },
    ],
    cta: '開啟倒數計時器，為下一段討論或發表設定清楚的課堂時間。',
    updatedAt: '2026-06-26',
  },
  {
    id: 'fair-student-grouping-guide',
    slug: 'fair-student-grouping-guide',
    title: '學生公平分組方法指南',
    metaTitle: '學生公平分組方法指南：隨機分組、老師微調與 30 人分 6 組範例',
    metaDescription: '了解公平學生分組的做法：隨機起點、老師微調、組數與人數選擇，以及 30 位學生分成 6 組的課堂範例。',
    h1: '學生公平分組怎麼做：隨機分配與老師微調的實用流程',
    category: '課堂教學',
    priority: 14,
    searchIntent: '老師想讓學生分組更公平，並知道如何在隨機分組後做必要調整。',
    targetKeywords: ['公平分組', '學生分組方法', '隨機分組教學', '30人分6組'],
    relatedToolIds: ['group-generator', 'random-group-generator', 'random-student-picker'],
    relatedGuideIds: ['classroom-random-group-guide', 'classroom-timer-guide'],
    relatedWorkflowIds: ['teacher-classroom-random-toolkit'],
    summary: '公平分組通常是先用隨機工具建立透明分配，再由老師依缺席、角色、支援需求與活動目標做少量調整。',
    problem: '學生常在意分組是否被偏心安排；老師則需要兼顧效率、座位、能力差異與課堂管理。',
    whoShouldUse: '適合需要規劃合作學習、小組報告、實驗課、討論課或跨組輪替的老師。',
    explanation: [
      '公平不代表每次完全隨機，也不代表老師完全不能調整。較穩定的做法是先用 group-generator 產生可檢查結果，再說明調整理由。',
      '組數適合任務站、桌數或發表安排固定的活動；每組人數適合討論品質或材料份數有上限的活動。',
      '若後續要安排發表代表，可在分組後使用 random-student-picker，讓每組都有透明的參與機會。',
    ],
    steps: [
      '確認本節課實際參與人數，先移除缺席與不參與者。',
      '決定使用組數或每組人數，並寫下活動限制。',
      '使用 group-generator 或 random-group-generator 產生初始分組。',
      '檢查是否有重複同組、角色失衡或需要支援的學生被放在不合適位置。',
      '公布分組時說明原則，並保留必要的老師調整。',
    ],
    example: '30 位學生要分 6 組做實驗，老師在 group-generator 輸入 30 人名單並設定 6 組。產生結果後，每組 5 人。老師再確認每組至少有一位能負責紀錄的學生，若有兩位需要支援的學生被分在同一組，才做一次交換。',
    commonMistakes: [
      '忽略缺席學生，讓分組結果和現場人數不一致。',
      '沒有記錄前幾次分組，導致相同學生一直同組。',
      '只追求完全平均，卻沒有分配組長、記錄、報告等角色。',
      '調整太多但不說明原因，讓學生覺得隨機分組只是形式。',
    ],
    faq: [
      { question: '公平分組一定要完全隨機嗎？', answer: '不一定。完全隨機透明度高，但老師可以基於安全、支援或活動目標做少量調整。' },
      { question: '30 人分 6 組怎麼設定？', answer: '使用組數設定為 6，或每組人數設定為 5。若有人缺席，先更新名單再產生結果。' },
      { question: '如何避免學生一直跟同一批人同組？', answer: '保留前一次分組結果，下一次產生後檢查重複組員，必要時交換少數學生。' },
      { question: '分組後還需要指定角色嗎？', answer: '建議需要。分組只解決人員分配，角色如主持、記錄、報告者能讓合作更有效率。' },
    ],
    cta: '開啟學生分組工具，先建立一版透明分組，再依課堂目標做最小調整。',
    updatedAt: '2026-06-26',
  },
  {
    id: 'classroom-lottery-tool-guide',
    slug: 'classroom-lottery-tool-guide',
    title: '課堂抽籤與轉盤工具指南',
    metaTitle: '課堂抽籤與轉盤工具指南：主題分配、發表順序、獎勵抽選與角色安排',
    metaDescription: '老師如何使用課堂抽籤、轉盤與姓名抽選工具，透明安排主題、發表順序、獎勵抽選和小組角色。',
    h1: '如何用抽籤與轉盤工具安排透明的課堂活動',
    category: '課堂教學',
    priority: 12,
    searchIntent: '老師想用抽籤、轉盤或抽名字工具安排課堂主題、順序、獎勵或角色。',
    targetKeywords: ['課堂抽籤工具', '教室轉盤', '隨機抽籤', '課堂抽獎'],
    relatedToolIds: ['random-wheel', 'random-name-picker', 'random-student-picker', 'dice-roller'],
    relatedGuideIds: ['classroom-random-picker-guide', 'classroom-random-group-guide'],
    relatedWorkflowIds: ['teacher-classroom-random-toolkit'],
    summary: '抽籤與轉盤工具適合主題分配、發表順序、角色安排和小獎勵抽選，關鍵是先公布選項與規則。',
    problem: '課堂活動若由老師臨時指定主題或順序，學生可能質疑公平；若抽籤規則不清楚，也容易引發爭議。',
    whoShouldUse: '適合需要安排報告題目、上台順序、小組角色、獎勵抽選或課堂任務的老師與活動帶領者。',
    explanation: [
      'random-wheel 適合可視化抽選，例如主題、任務卡或獎勵項目。random-name-picker 與 random-student-picker 適合抽學生或小組。',
      '透明流程比花俏動畫更重要。抽之前先讓學生看到候選清單，說明是否可重抽、抽到後是否移除。',
      'dice-roller 可用在簡單的活動規則，例如骰到 1 到 3 回答基礎題，4 到 6 回答挑戰題。',
    ],
    steps: [
      '先列出要抽的選項，例如主題、組別、學生或角色。',
      '說明抽到後是否移除、是否允許重抽，以及誰負責確認結果。',
      '使用 random-wheel、random-name-picker 或 random-student-picker 進行抽選。',
      '把抽選結果立即寫到白板、投影片或班級平台。',
      '若是獎勵抽選，保留簡短紀錄，避免事後爭議。',
    ],
    example: '社會課要分配 8 個報告主題，老師把主題放進 random-wheel，讓每組依序抽題。抽到的主題立即從清單移除並記在投影片上，最後用 random-name-picker 決定下週報告順序。',
    commonMistakes: [
      '抽之前沒有讓學生確認候選清單，抽完才發現漏掉主題或人名。',
      '沒有先說明是否可以重抽，導致學生對結果有爭議。',
      '把抽獎工具用在高風險評量或重要權益分配上。',
      '同一個活動混用太多工具，學生不清楚規則。',
    ],
    faq: [
      { question: '課堂抽籤適合用在哪些情境？', answer: '適合主題分配、發表順序、角色分配、任務卡和小獎勵抽選，不適合替代正式評量規則。' },
      { question: '轉盤和姓名抽選器有什麼差別？', answer: '轉盤適合讓全班看到選項抽選；姓名抽選器更適合學生名單或小組名單。' },
      { question: '抽到後要不要移除選項？', answer: '如果每個主題或順序只能被選一次，就應該移除；如果是複習題或趣味挑戰，可以保留。' },
      { question: '可以用骰子決定活動嗎？', answer: '可以，用 dice-roller 做簡單規則很快，但要先公布每個點數代表的任務。' },
    ],
    cta: '開啟隨機轉盤或姓名抽選器，先公布候選清單，再完成一次透明的課堂抽選。',
    updatedAt: '2026-06-26',
  },
];

const englishGuideContent: Record<string, EnglishSeoGuideContent> = {
  't-score-calculator-guide': {
    title: 'Complete T Score Calculator Guide',
    metaTitle: 'T Score Calculator Guide: Formula, Z Score Conversion, and Teacher Exam Use',
    metaDescription: 'Understand the T score formula, Z-to-T conversion, percentile rank differences, and teacher exam examples with worked numbers.',
    h1: 'How to Calculate a T Score for Teacher Exams and Education Tests',
    category: 'Education Statistics',
    searchIntent: 'Convert a raw score or Z score to a T score and understand relative position in teacher exam score reports.',
    targetKeywords: ['T score calculator', 'T score formula', 'teacher exam T score', 'convert Z score to T score'],
    summary: 'A T score puts a Z score on a scale with mean 50 and standard deviation 10, making education test scores easier to compare.',
    problem: 'A raw score alone does not show how far a candidate is above or below the group average, and different tests may have different means and standard deviations.',
    whoShouldUse: 'Use this if you are preparing for teacher exams, reading education test reports, or explaining standardized scores.',
    explanation: [
      'A T score is not a percentage. A common scale uses mean 50 and standard deviation 10, so T = 60 is about one standard deviation above the mean and T = 40 is about one standard deviation below.',
      'Teacher exams and education tests use T scores to place different score distributions on a shared comparison scale. Official decisions can still depend on weighting, cutoffs, ranking rules, and tie-breakers.',
      statisticsDisclaimer.en,
    ],
    steps: [
      'Confirm that raw score X, mean M, and standard deviation SD come from the same group.',
      'Calculate Z = (X - M) / SD. The standard deviation must be greater than zero.',
      'Apply the common formula T = 50 + 10Z.',
      'Keep the raw score, mean, SD, and T score together so the result can be checked.',
    ],
    formula: 'Z = (X - M) / SD; T = 50 + 10Z.',
    example: 'If a candidate scores 82, the group mean is 70, and SD is 8, then Z = (82 - 70) / 8 = 1.50. T = 50 + 10 × 1.50 = 65. This means the score is 1.5 SD above the mean, not 65%.',
    commonMistakes: [
      'Treating a T score as a percentage or a score out of 100.',
      'Mixing means and SDs from different years or groups.',
      'Calculating standard scores when SD is zero or the data are too limited.',
      'Rounding too early before later weighting or ranking steps.',
    ],
    faq: [
      { question: 'Is a higher T score always better?', answer: 'Within the same scale and group it usually means a higher relative position, but official outcomes still depend on the published rules.' },
      { question: 'How is a T score different from a Z score?', answer: 'A Z score uses mean 0 and SD 1. A T score commonly transforms it to mean 50 and SD 10 for easier reading.' },
      { question: 'Can I convert a T score directly to PR?', answer: 'Only when the distribution assumption is reasonable or the full reference data are available.' },
      { question: 'Do all teacher exams use T scores?', answer: 'No. Always follow the current official notice for the exam, district, or school.' },
    ],
    cta: 'Start with the T score calculator, then compare the result with the Z score and percentile rank tools.',
  },
  'z-score-calculator-guide': {
    title: 'Z Score Calculator and Standardization Guide',
    metaTitle: 'Z Score Calculator Guide: Mean, Standard Deviation, and Interpretation',
    metaDescription: 'Learn the Z score formula, how mean and standard deviation work, and how to interpret positive, negative, and zero values.',
    h1: 'How to Calculate a Z Score with Mean and Standard Deviation',
    category: 'Education Statistics',
    searchIntent: 'Understand how far a score is from the mean and what positive or negative Z scores mean.',
    targetKeywords: ['Z score calculator', 'Z score formula', 'standard score', 'mean standard deviation'],
    summary: 'A Z score describes distance from the mean in standard-deviation units and is the basis for many score conversions.',
    problem: 'The same raw-point gap can mean different things in a tightly clustered class versus a widely spread score distribution.',
    whoShouldUse: 'Use this for score standardization, class score analysis, teacher exam estimates, and statistics assignments.',
    explanation: [
      'Z = 0 means the score equals the mean. Positive values are above the mean; negative values are below it. Z = 1 is one SD above the mean, and Z = -2 is two SDs below.',
      'Standardizing a value does not make a skewed distribution normal or fix measurement problems. Interpret extreme values with the distribution and sample size in mind.',
      statisticsDisclaimer.en,
    ],
    steps: [
      'Prepare raw score X, mean M, and standard deviation SD.',
      'Make sure SD is greater than zero and all values come from the same dataset.',
      'Calculate Z = (X - M) / SD.',
      'Interpret the sign and size, then convert to a T score if needed.',
    ],
    formula: 'Z = (X - M) / SD.',
    example: 'A class test has mean 76 and SD 6. Student A scores 88, so Z = (88 - 76) / 6 = 2.00. Student B scores 70, so Z = (70 - 76) / 6 = -1.00.',
    commonMistakes: [
      'Reporting a Z score without the mean and SD.',
      'Reading Z = 2 as two raw points rather than two standard deviations.',
      'Over-interpreting very small or unstable samples.',
      'Assuming every Z score maps cleanly to a normal percentile.',
    ],
    faq: [
      { question: 'Is Z score 0 good or bad?', answer: 'It only means the score equals the mean. Whether that is good depends on the context.' },
      { question: 'Can a Z score be negative?', answer: 'Yes. Negative values are below the mean.' },
      { question: 'What happens when SD is larger?', answer: 'For the same raw difference, the absolute Z score becomes smaller.' },
      { question: 'Can Z scores decide teacher exam ranking?', answer: 'Use them for checking and interpretation only. Official ranking follows the published rules.' },
    ],
    cta: 'Use the Z score calculator first, then convert to a T score or check the SD calculation when needed.',
  },
  'percentile-rank-guide': {
    title: 'Percentile Rank Guide',
    metaTitle: 'What Is Percentile Rank? PR vs Percentage Score and Ranking',
    metaDescription: 'Understand percentile rank, how it differs from percentage score, and why PR should not be treated as a raw score.',
    h1: 'How to Read Percentile Rank Without Confusing It with a Score',
    category: 'Education Statistics',
    searchIntent: 'Understand what PR means and how it differs from percentage scores, ranks, T scores, and Z scores.',
    targetKeywords: ['percentile rank', 'PR score', 'percentile rank calculator', 'PR vs percentage score'],
    summary: 'Percentile rank describes relative position in a comparison group. It is about ranking, not answer rate.',
    problem: 'PR 80 is often misread as 80 points or 80% correct. It actually means the score is above roughly 80% of the comparison group.',
    whoShouldUse: 'Use this when reading test reports, class rankings, teacher exam results, or parent-facing score summaries.',
    explanation: [
      'Percentile rank has an ordinal or ranking character. The gap from PR 90 to PR 80 does not necessarily equal the gap from PR 60 to PR 50.',
      'Percentage score answers how much of the test was correct. PR answers where the score sits relative to a group. They are not interchangeable.',
      statisticsDisclaimer.en,
    ],
    steps: [
      'Identify the comparison group, such as class, school, national norm, or exam cohort.',
      'Check whether PR comes from actual ranks, a normal estimate, or another method.',
      'Keep raw scores, ranks, and T/Z scores when available.',
      'Explain PR as "above about this share of the group", not as points earned.',
    ],
    formula: 'General idea: PR is the percentage of observations below or at a score. Exact formulas vary by ranks, ties, and data type.',
    example: 'In a group of 100 candidates, 72 score lower and 4 tie with one candidate. A midrank estimate is PR = (72 + 0.5 × 4) / 100 × 100 = 74. This is PR 74, not a score of 74 points.',
    commonMistakes: [
      'Treating PR as a percentage score or answer rate.',
      'Comparing PR values from different norm groups as if they were the same scale.',
      'Averaging or adding PR values as though they are interval scores.',
      'Ignoring ties in rank-heavy data.',
    ],
    faq: [
      { question: 'Does PR 90 mean top 10%?', answer: 'Roughly, but exact rank depends on ties and the method used.' },
      { question: 'Can PR be added to raw scores?', answer: 'No. They are different scales.' },
      { question: 'Is PR the same as percentage score?', answer: 'No. Percentage score is performance on the test; PR is relative position.' },
      { question: 'Can PR be estimated from a Z score?', answer: 'Only when a normal distribution assumption is appropriate or reference data are available.' },
    ],
    cta: 'Use the percentile rank calculator with T and Z score tools to explain relative position carefully.',
  },
  'teacher-exam-weighted-score-guide': {
    title: 'Teacher Exam Weighted Score Guide',
    metaTitle: 'Teacher Exam Weighted Score: Written, Demo, Interview, and Portfolio Weights',
    metaDescription: 'Learn how to combine written, teaching demo, interview, and portfolio scores by official weights without adding raw scores incorrectly.',
    h1: 'How to Calculate a Teacher Exam Weighted Score',
    category: 'Teacher Exams',
    searchIntent: 'Combine written, demo teaching, interview, or portfolio scores according to published weights.',
    targetKeywords: ['teacher exam weighted score', 'weighted average', 'teacher exam score calculator', 'written demo interview weights'],
    summary: 'Teacher exam totals often combine several components with different weights, so the official weight table must be checked first.',
    problem: 'Adding raw component scores directly treats a 70% written test and a 10% portfolio as equally important, which gives the wrong total.',
    whoShouldUse: 'Use this for teacher exam estimates, school selection workflows, and score sheet checks.',
    explanation: [
      'The weighted total is the sum of each score multiplied by its weight. Weights can be percentages or decimals, but the table should be consistent and usually sums to 100% or 1.',
      'Some exam rules include thresholds, screening stages, standardization, or tie-breakers. A calculator can help check arithmetic, but it is not the official result.',
      statisticsDisclaimer.en,
    ],
    steps: [
      'Copy each component and weight from the official notice.',
      'Check that the weights sum to 100%, unless the notice says otherwise.',
      'Multiply each score by its weight.',
      'Sum the weighted parts and round only according to the official rule.',
    ],
    formula: 'Weighted total = sum of score × weight. A 50% weight can be entered as 0.50.',
    example: 'Written test 50%, demo teaching 30%, interview 20%. Scores are 82, 88, and 90. Total = 82×0.50 + 88×0.30 + 90×0.20 = 85.4.',
    commonMistakes: [
      'Entering 50% as 50 instead of 0.50 in a decimal formula.',
      'Adding 82 + 88 + 90 without weights.',
      'Ignoring a weight total that does not equal 100%.',
      'Rounding every step instead of the final result.',
    ],
    faq: [
      { question: 'Must weights sum to 100%?', answer: 'Usually yes, but always follow the official notice when special conversion rules are used.' },
      { question: 'Can written and demo scores be compared directly?', answer: 'Not safely. They have different purposes and weights.' },
      { question: 'Do I need a T score after weighting?', answer: 'Only if the official process requires standardization or ranking after weighting.' },
      { question: 'When should I round?', answer: 'Keep full precision until the final step, then follow the published rule.' },
    ],
    cta: 'Enter the components in the teacher exam score converter, then cross-check with the weighted average calculator.',
  },
  'spss-levene-test-guide': {
    title: 'SPSS Levene Test Guide',
    metaTitle: 'How to Read SPSS Levene Test and Choose the t-test Row',
    metaDescription: 'Learn what Levene test checks and when to read equal variances assumed or not assumed in SPSS independent-samples t tests.',
    h1: 'How to Read Levene’s Test in SPSS Independent-Samples t Tests',
    category: 'Research and SPSS',
    searchIntent: 'Choose the correct SPSS independent-samples t-test row after checking Levene test.',
    targetKeywords: ['SPSS Levene test', 'equal variances assumed', 'equal variances not assumed', 'independent samples t test SPSS'],
    summary: 'Levene test checks whether group variances can be treated as equal and affects which SPSS t-test row to read.',
    problem: 'A common mistake is always reading the first SPSS row even when Levene test is significant.',
    whoShouldUse: 'Use this when writing research reports or assignments from SPSS independent-samples t-test output.',
    explanation: [
      'Levene test has the null hypothesis that variances are equal. If p >= .05, read Equal variances assumed. If p < .05, read Equal variances not assumed.',
      'Levene test is not the mean-difference test. The group difference is interpreted from the matching t, df, p, and confidence interval row.',
      statisticsDisclaimer.en,
    ],
    steps: [
      'Find Levene’s Test for Equality of Variances in the SPSS table.',
      'Read the Sig. value and compare it with .05.',
      'If p >= .05, use Equal variances assumed.',
      'If p < .05, use Equal variances not assumed and copy that row’s t, df, and p.',
    ],
    formula: 'Rule of thumb: Levene p >= .05 -> equal variances assumed; Levene p < .05 -> equal variances not assumed.',
    example: 'Levene F = 6.21, p = .015. Because p < .05, use the Equal variances not assumed row. If that row has t = 2.48, df = 37.62, p = .018, those are the values to report.',
    commonMistakes: [
      'Treating the Levene p value as the mean-difference p value.',
      'Using the first row after Levene is significant.',
      'Reporting only p without t, df, or effect size.',
      'Forgetting to confirm the design is really independent-samples.',
    ],
    faq: [
      { question: 'What if Levene p equals .05?', answer: 'Many rules use p < .05 as significant. Follow your course or journal rule and state the criterion clearly.' },
      { question: 'Does significant Levene mean group means differ?', answer: 'No. It concerns variances, not means.' },
      { question: 'Can df be a decimal in the second row?', answer: 'Yes. Welch correction often produces decimal degrees of freedom.' },
      { question: 'Do paired t tests use Levene?', answer: 'Usually no. Levene is mainly for independent group variance checks.' },
    ],
    cta: 'Use the SPSS interpreter to choose the correct row, then generate an APA 7 sentence.',
  },
  't-test-apa-format-guide': {
    title: 't Test APA 7 Format Guide',
    metaTitle: 'How to Report a t Test in APA 7: Independent, Paired, p, and Cohen d',
    metaDescription: 'Report t tests in APA 7 with t, df, p, Cohen’s d, and clear examples for independent and paired samples.',
    h1: 'How to Report a t Test in APA 7',
    category: 'Research and APA',
    searchIntent: 'Turn t-test output into an APA 7 result sentence.',
    targetKeywords: ['t test APA 7', 'independent t test APA', 'paired t test APA', 'Cohen d report'],
    summary: 'A clear APA 7 t-test report names the test, descriptive statistics, t, df, p, and effect size.',
    problem: 'Writing only "the groups differed significantly" leaves out the design, degrees of freedom, p value, effect size, and direction.',
    whoShouldUse: 'Use this for papers, assignments, research reports, and SPSS result write-ups.',
    explanation: [
      'Independent-samples t tests compare independent groups. Paired-samples t tests compare repeated or matched observations. Confirm the design before writing the result.',
      'Use p = .032 style formatting, and write p < .001 instead of p = .000. Follow your course or journal rules for exact formatting.',
      statisticsDisclaimer.en,
    ],
    steps: [
      'Confirm whether the test is independent, paired, or one-sample.',
      'Prepare group means, standard deviations, and sample sizes when needed.',
      'Copy t, df, and p from the correct output row.',
      'Add an effect size such as Cohen’s d and state the direction.',
    ],
    formula: 'Common APA fragment: t(df) = value, p = value, d = value.',
    example: 'Independent example: The experimental group (M = 82.40, SD = 7.10) scored higher than the control group (M = 76.30, SD = 8.20), t(58) = 3.07, p = .003, d = 0.79. Paired example: Posttest scores (M = 85.20, SD = 6.40) were higher than pretest scores (M = 78.10, SD = 7.50), t(29) = 5.12, p < .001, d = 0.93.',
    commonMistakes: [
      'Using Levene p as the t-test p value.',
      'Omitting df or copying the wrong variance row.',
      'Writing p = .000 instead of p < .001.',
      'Not saying which group or time point was higher.',
    ],
    faq: [
      { question: 'Do I need Cohen’s d?', answer: 'Many courses and journals require an effect size, and it helps explain the size of the difference.' },
      { question: 'Can I copy p = .000 from SPSS?', answer: 'No. Write p < .001.' },
      { question: 'Can df be a decimal?', answer: 'Yes, especially with Welch t tests.' },
      { question: 'Where should descriptive statistics go?', answer: 'Put them in the same sentence or immediately before the test result.' },
    ],
    cta: 'Check the SPSS row first, then use the APA 7 report generator for an editable sentence.',
  },
  'anova-apa-format-guide': {
    title: 'ANOVA APA 7 Format Guide',
    metaTitle: 'How to Report ANOVA in APA 7: F, df, p, eta squared, and Post Hoc',
    metaDescription: 'Report one-way and two-way ANOVA in APA 7 with F(df1, df2), p, eta squared or partial eta squared, and post-hoc reminders.',
    h1: 'How to Report ANOVA in APA 7',
    category: 'Research and APA',
    searchIntent: 'Turn one-way or two-way ANOVA output into an APA 7 result sentence.',
    targetKeywords: ['ANOVA APA 7', 'F test APA', 'eta squared', 'partial eta squared'],
    summary: 'ANOVA reports should identify the effect, F(df1, df2), p value, effect size, and post-hoc comparisons when needed.',
    problem: 'ANOVA tables contain multiple effects. Without naming the effect and follow-up comparison, readers cannot know what differed.',
    whoShouldUse: 'Use this for papers, research reports, class statistics assignments, and SPSS ANOVA write-ups.',
    explanation: [
      'One-way ANOVA reports one factor. Two-way ANOVA usually reports two main effects and one interaction. If the interaction is significant, interpret it before relying on main effects.',
      'Use eta squared or partial eta squared according to your course or journal. Label the effect size clearly.',
      statisticsDisclaimer.en,
    ],
    steps: [
      'Confirm the ANOVA type and research design.',
      'Find the effect row and copy F, df1, df2, and p.',
      'Add an effect size such as eta squared or partial eta squared.',
      'If the omnibus F is significant with three or more groups, report post-hoc or planned comparisons.',
    ],
    formula: 'Common APA fragment: F(df1, df2) = value, p = value, eta squared = value.',
    example: 'One-way example: Teaching method had a significant effect on posttest scores, F(2, 87) = 6.42, p = .003, η² = .13. Tukey comparisons showed the cooperative learning group scored higher than the lecture group. Two-way example: The interaction between method and grade was significant, F(2, 114) = 4.18, p = .018, partial η² = .07.',
    commonMistakes: [
      'Reporting only p without F and degrees of freedom.',
      'Ignoring a significant interaction in two-way ANOVA.',
      'Not explaining which groups differed after a significant omnibus test.',
      'Mixing eta squared and partial eta squared without labels.',
    ],
    faq: [
      { question: 'Does a significant ANOVA mean every group differs?', answer: 'No. It means at least one difference exists, so follow-up comparisons are often needed.' },
      { question: 'How do I write df1 and df2?', answer: 'APA style usually writes F(df1, df2), such as F(2, 87) = 6.42.' },
      { question: 'How many results are in a two-way ANOVA?', answer: 'Usually two main effects and one interaction, depending on the model and research question.' },
      { question: 'Can I report partial eta squared only?', answer: 'Yes, if that is the required effect size. Label it clearly.' },
    ],
    cta: 'Generate an APA ANOVA sentence, then check the SPSS effect row and post-hoc output.',
  },
  'two-way-anova-interaction-guide': {
    title: 'Two-Way ANOVA Interaction Guide',
    metaTitle: 'How to Interpret Two-Way ANOVA Interaction, Main Effects, and Simple Main Effects',
    metaDescription: 'Understand interaction effects in two-way ANOVA with a plain-language example, main effects, and simple main effects guidance.',
    h1: 'How to Interpret an Interaction in Two-Way ANOVA',
    category: 'Research and SPSS',
    searchIntent: 'Understand interaction effects, main effects, and simple main effects in two-way ANOVA.',
    targetKeywords: ['two-way ANOVA interaction', 'interaction effect', 'simple main effects', 'main effect interaction'],
    summary: 'An interaction means the effect of one factor changes depending on the level of another factor.',
    problem: 'When an interaction is significant, saying only "the teaching method worked" may be misleading because it may work only under certain conditions.',
    whoShouldUse: 'Use this when reading two-way ANOVA output, SPSS tables, or research result sections.',
    explanation: [
      'A main effect asks whether one factor differs overall. An interaction asks whether that difference depends on another factor. Significant interactions can hide or change main-effect interpretations.',
      'Simple main effects examine differences within a specific level of another factor, such as comparing two teaching methods separately for lower and upper grades.',
      statisticsDisclaimer.en,
    ],
    steps: [
      'Check the interaction row first, such as method × grade.',
      'If significant, inspect a means table or plot.',
      'Run simple main effects or follow-up comparisons based on the research question.',
      'Then describe main effects carefully as supporting context.',
    ],
    formula: 'Common interpretation order: interaction -> simple main effects -> main effects.',
    example: 'Method A and B are compared across lower and upper grades. In lower grades, A = 78 and B = 77. In upper grades, A = 88 and B = 80. If the interaction is F(1, 76) = 5.90, p = .018, the method effect changes by grade, so grade-specific comparisons are needed.',
    commonMistakes: [
      'Interpreting only main effects after a significant interaction.',
      'Drawing conclusions without cell means or a plot.',
      'Calling two significant main effects an interaction.',
      'Running many simple effects without a hypothesis or comparison control.',
    ],
    faq: [
      { question: 'Do I run simple main effects when interaction is not significant?', answer: 'Usually no, unless there is a clear planned reason.' },
      { question: 'What if a main effect and interaction are both significant?', answer: 'Interpret the interaction first, then discuss the main effect cautiously.' },
      { question: 'Do I need an interaction plot?', answer: 'Not always, but it helps reveal the direction and pattern.' },
      { question: 'Does SPSS automatically provide simple main effects?', answer: 'Not always. You may need EM Means or additional comparison settings.' },
    ],
    cta: 'Use the SPSS interpreter to organize interaction and main-effect results, then draft the APA wording.',
  },
  'classroom-random-group-guide': {
    title: 'Classroom Random Group Guide',
    metaTitle: 'Classroom Random Group Guide: Fair Student Groups by Size or Count',
    metaDescription: 'A teacher-focused classroom grouping guide: prepare a student list, choose group count or group size, handle absent students, and generate fair groups fast.',
    h1: 'How Teachers Can Use a Random Group Tool for Fair Classroom Groups',
    category: 'Classroom teaching',
    searchIntent: 'Teachers want to split students into fair groups quickly and understand group count, group size, and classroom adjustments.',
    targetKeywords: ['classroom random groups', 'student group generator', 'teacher grouping tool', 'fair student grouping'],
    summary: 'Random grouping works well for discussion, stations, cooperative learning, and quick regrouping when the teacher starts with a clean student list.',
    problem: 'Manual classroom grouping can take too long, repeat the same students, or feel opaque when students do not understand how groups were assigned.',
    whoShouldUse: 'Use this if you need to create discussion groups, project teams, lab groups, or presentation teams in a few minutes.',
    explanation: [
      'Random grouping does not replace teacher judgment. It gives you a transparent starting point that can be lightly adjusted for classroom needs.',
      'Use group count when the activity has fixed tables, stations, or presentation slots. Use group size when each group needs a maximum number of students.',
      'After grouping, you can use a random student picker to choose presenters or a seating chart to check whether movement is practical.',
    ],
    steps: [
      'Paste or type the students who are actually present, one name per line.',
      'Choose either the number of groups or the number of students per group.',
      'Generate the groups and check whether group sizes are acceptable.',
      'Explain that random grouping is being used so the process feels transparent.',
      'Copy the result to slides, the board, or your class platform.',
    ],
    example: 'For a 10-minute discussion with 30 students, set group-generator to 6 groups of 5. If 2 students are absent, update the list to 28 first; the tool may produce a mix of 4- and 5-person groups that you can lightly adjust by seating.',
    commonMistakes: [
      'Forgetting absent students, which creates a group with missing members.',
      'Using group size when the activity really needs a fixed number of tables or stations.',
      'Publishing the result without checking support needs or seating constraints.',
      'Never saving past groups, causing the same students to repeat together too often.',
    ],
    faq: [
      { question: 'Is random grouping always fairer than teacher-assigned groups?', answer: 'No. It is a transparent starting point, but the teacher can still make small adjustments for learning needs, seating, or support.' },
      { question: 'Should I choose group count or group size?', answer: 'Choose group count for fixed stations or presentation slots. Choose group size when discussion quality or materials limit each group.' },
      { question: 'What if students object to the random group?', answer: 'Explain the rule first and reserve a small teacher-adjustment option for genuine classroom needs.' },
      { question: 'Can I save the group result?', answer: 'Yes. Copy it to your document or class platform, especially if you want to avoid repeated groups next time.' },
    ],
    cta: 'Open the student group tool, paste today\'s class list, and generate a first grouping you can check.',
  },
  'classroom-random-picker-guide': {
    title: 'Classroom Random Picker Guide',
    metaTitle: 'Classroom Random Picker Guide: Participation, Presentation Order, and Review',
    metaDescription: 'Use a classroom random picker for answers, presentation order, quick review, and fair participation while reducing student pressure.',
    h1: 'How to Use a Classroom Random Picker Without Embarrassing Students',
    category: 'Classroom teaching',
    searchIntent: 'Teachers want to randomly pick students for answers, presentation order, or review while keeping the activity supportive.',
    targetKeywords: ['classroom random picker', 'random student picker', 'student name picker', 'class participation tool'],
    summary: 'Random picking can spread participation across the class when the teacher sets clear, supportive rules before drawing a name.',
    problem: 'Calling on the same students concentrates participation, but unclear random picking can feel like pressure or punishment.',
    whoShouldUse: 'Use this for answers, presentation order, group representatives, quick review, or classroom interaction.',
    explanation: [
      'Use random-student-picker for class lists and random-name-picker for temporary activity lists. Both make the draw visible and less subjective.',
      'Random picking should not be used to shame students. Consider a short thinking period, a group-help rule, or one pass option.',
      'A full activity flow can be: create groups, set a timer for preparation, then pick a representative or presentation order.',
    ],
    steps: [
      'Prepare the students or groups that will actually participate.',
      'Explain the purpose of the draw, such as sharing, ordering, or review.',
      'Use random-student-picker or random-name-picker to draw a name.',
      'Give brief thinking or group-support time before the answer.',
      'Track recently picked students if you want to avoid repeated pressure.',
    ],
    example: 'In a vocabulary review, the teacher gives groups 2 minutes on countdown-timer, then uses random-student-picker to choose one representative to share a sentence. Students get preparation time, so the picker feels like participation rather than a surprise test.',
    commonMistakes: [
      'Drawing names without explaining the rule or purpose.',
      'Publicly criticizing a student who cannot answer.',
      'Leaving absent students in the list.',
      'Picking the same student repeatedly without tracking recent draws.',
    ],
    faq: [
      { question: 'Can random picking increase student anxiety?', answer: 'Yes, if it is used without support. Give thinking time, allow group help, and avoid using the picker as punishment.' },
      { question: 'Can I use it for presentation order?', answer: 'Yes. Add groups or student names to random-name-picker for a transparent order.' },
      { question: 'What if the picker selects an absent student?', answer: 'Update the list before drawing when possible. If it happens, skip and draw again.' },
      { question: 'Should I use the student picker or name picker?', answer: 'Use random-student-picker for classroom lists and random-name-picker for temporary names or groups.' },
    ],
    cta: 'Open the random student picker, paste your class list, and draw a representative for the next answer or presentation.',
  },
  'classroom-timer-guide': {
    title: 'Classroom Timer Guide',
    metaTitle: 'Classroom Timer Guide: Discussion, Presentation, Worksheet, and Group Activity Timing',
    metaDescription: 'A teacher guide to using a countdown timer for classroom discussion, presentations, worksheets, transitions, and group activities.',
    h1: 'How Teachers Can Use a Countdown Timer to Pace Classroom Activities',
    category: 'Classroom teaching',
    searchIntent: 'Teachers want a classroom timer for discussions, presentations, worksheets, and group activities.',
    targetKeywords: ['classroom timer', 'classroom countdown timer', 'group discussion timer', 'teacher timer tool'],
    summary: 'A visible countdown helps students understand remaining time and helps teachers move from discussion to presentation to wrap-up.',
    problem: 'Without clear time boundaries, discussions drift, presentations overrun, and transitions consume the next part of the lesson.',
    whoShouldUse: 'Use this for discussion, presentations, worksheets, stations, practice questions, and classroom transitions.',
    explanation: [
      'countdown-timer is best for short classroom activities such as 3-minute discussion, 5-minute writing, or 10-minute presentations. pomodoro-timer fits longer independent work.',
      'A timer should create shared pacing, not panic. Give a warning before time expires so students can finish their thought.',
      'A useful flow is: group students, time the discussion, then randomly pick a presenter.',
    ],
    steps: [
      'Break the activity into discussion, output, presentation, and transition phases.',
      'Set a realistic time for each phase and reserve transition time.',
      'Start countdown-timer where the class can see it.',
      'Give one reminder before time ends, such as one minute remaining.',
      'When time ends, move directly to picking, presenting, or closing the activity.',
    ],
    example: 'A 15-minute activity can use 5 minutes for reading, 5 minutes for group discussion, 3 minutes for randomly selected sharing, and 2 minutes for teacher wrap-up. The teacher uses countdown-timer for the first two phases and random-student-picker for sharing.',
    commonMistakes: [
      'Setting the activity too short before students understand the task.',
      'Forgetting transition time for materials, movement, or slides.',
      'Always extending the timer, which weakens the signal.',
      'Using the same time for every task regardless of difficulty.',
    ],
    faq: [
      { question: 'How long should a classroom activity be?', answer: 'It depends on the task. Quick discussion may start at 2 to 5 minutes, while output tasks often need 8 to 15 minutes.' },
      { question: 'Should I stop exactly when the timer ends?', answer: 'Not always, but keep the rule consistent. If you always extend it, students stop trusting the timer.' },
      { question: 'Can a timer work with random picking?', answer: 'Yes. Give preparation time first, then pick a student or group to share.' },
      { question: 'When should I use a Pomodoro timer?', answer: 'Use it for longer independent work, projects, or writing blocks. For short class activities, countdown-timer is simpler.' },
    ],
    cta: 'Open the countdown timer and set a clear time limit for your next discussion or presentation.',
  },
  'fair-student-grouping-guide': {
    title: 'Fair Student Grouping Guide',
    metaTitle: 'Fair Student Grouping Guide: Random Groups, Teacher Adjustment, and 30 Students into 6 Groups',
    metaDescription: 'A practical guide to fair student grouping with random assignment, teacher adjustment, group count versus group size, and a 30-student example.',
    h1: 'Fair Student Grouping: Random Assignment Plus Teacher Adjustment',
    category: 'Classroom teaching',
    searchIntent: 'Teachers want fair student groups and a practical way to adjust random grouping when needed.',
    targetKeywords: ['fair student grouping', 'student grouping method', 'random classroom groups', '30 students into 6 groups'],
    summary: 'Fair grouping usually means using a random tool for a transparent first pass, then making small teacher adjustments for real classroom constraints.',
    problem: 'Students care whether groups feel fair, while teachers also need to manage speed, seating, roles, and learning support.',
    whoShouldUse: 'Use this for cooperative learning, group reports, lab work, discussions, and recurring group rotation.',
    explanation: [
      'Fair does not always mean fully random, and it does not mean the teacher cannot adjust. A strong process is random first, explain adjustments second.',
      'Use group count for fixed stations, tables, or presentation slots. Use group size when each group has a maximum practical size.',
      'After grouping, use random-student-picker if you need a transparent presenter or role assignment.',
    ],
    steps: [
      'Confirm the students who are actually participating.',
      'Choose group count or group size based on the activity constraint.',
      'Generate an initial grouping with group-generator or random-group-generator.',
      'Check repeated pairings, role balance, and support needs.',
      'Announce the grouping rule and keep adjustments minimal.',
    ],
    example: 'For 30 students into 6 lab groups, enter the 30 names in group-generator and set 6 groups. Each group has 5 students. Then check whether each group has someone who can record results, and swap only if a support need makes it necessary.',
    commonMistakes: [
      'Ignoring absent students so the generated groups do not match the room.',
      'Not saving past groups, causing repeated membership.',
      'Balancing numbers but forgetting roles such as recorder or presenter.',
      'Making many unexplained changes after claiming the groups were random.',
    ],
    faq: [
      { question: 'Does fair grouping have to be completely random?', answer: 'No. Full randomization is transparent, but small teacher adjustments can be appropriate for safety, support, or learning goals.' },
      { question: 'How do I split 30 students into 6 groups?', answer: 'Set group count to 6 or group size to 5. If anyone is absent, update the list first.' },
      { question: 'How do I avoid the same students grouping together?', answer: 'Save the previous result, compare the next draw, and swap only a few repeated pairings if needed.' },
      { question: 'Do I still need group roles?', answer: 'Usually yes. Grouping assigns people; roles such as facilitator, recorder, and presenter make the work smoother.' },
    ],
    cta: 'Open the student group generator, create a transparent first grouping, then make only the classroom adjustments you need.',
  },
  'classroom-lottery-tool-guide': {
    title: 'Classroom Lottery and Wheel Tool Guide',
    metaTitle: 'Classroom Lottery and Wheel Tool Guide: Topics, Presentation Order, Rewards, and Roles',
    metaDescription: 'Use a classroom wheel, name picker, student picker, or dice roller for transparent topic assignment, presentation order, reward draws, and role assignment.',
    h1: 'How to Use Lottery and Wheel Tools for Transparent Classroom Activities',
    category: 'Classroom teaching',
    searchIntent: 'Teachers want classroom lottery, draw, or wheel tools for topics, order, rewards, or roles.',
    targetKeywords: ['classroom lottery tool', 'classroom wheel', 'random draw for class', 'classroom reward draw'],
    summary: 'Lottery and wheel tools work well for topic assignment, presentation order, role assignment, and small reward draws when the options and rules are visible first.',
    problem: 'If topics or order are assigned casually, students may question fairness. If draw rules are unclear, the result can create disputes.',
    whoShouldUse: 'Use this for report topics, presentation order, group roles, reward draws, classroom tasks, or review games.',
    explanation: [
      'random-wheel is useful when the class should see the options spin, such as topics, tasks, or rewards. random-name-picker and random-student-picker are better for names or groups.',
      'The transparent process matters more than the animation. Show the candidate list and explain whether a result is removed after selection.',
      'dice-roller can support simple activity rules, such as 1 to 3 for a basic question and 4 to 6 for a challenge question.',
    ],
    steps: [
      'List the options you need to draw: topics, groups, students, or roles.',
      'Explain whether selected options are removed and whether redraws are allowed.',
      'Use random-wheel, random-name-picker, or random-student-picker to draw.',
      'Record the result immediately on the board, slides, or class platform.',
      'For reward draws, keep a brief record to prevent later disputes.',
    ],
    example: 'A social studies class has 8 presentation topics. The teacher adds the topics to random-wheel and each group draws one topic in order. Selected topics are removed, then random-name-picker decides next week\'s presentation order.',
    commonMistakes: [
      'Not showing the candidate list before drawing.',
      'Not explaining whether redraws are allowed.',
      'Using a draw tool for high-stakes grading or important rights.',
      'Mixing too many draw tools in one activity so students lose the rule.',
    ],
    faq: [
      { question: 'What classroom tasks fit a lottery tool?', answer: 'Topic assignment, presentation order, roles, task cards, and small rewards fit well. Formal assessment rules should not depend on a casual draw.' },
      { question: 'What is the difference between a wheel and a name picker?', answer: 'A wheel is good for visible option draws. A name picker is better for student or group lists.' },
      { question: 'Should selected options be removed?', answer: 'Remove them when each topic or order slot can be used once. Keep them for review games or repeatable challenges.' },
      { question: 'Can I use dice for classroom activities?', answer: 'Yes. Use dice-roller for simple rules, but announce what each number means before rolling.' },
    ],
    cta: 'Open the random wheel or name picker, show the candidate list, and run a transparent classroom draw.',
  },
};

export const seoGuides: SeoGuide[] = rawSeoGuides.map(localizeRawGuide);

export function getSeoGuide(slug: string): SeoGuide | undefined {
  return seoGuides.find((guide) => guide.slug === slug);
}

// Reverse lookup: guides that reference a given tool, available in the locale,
// ordered by priority. Used to surface related guides on tool detail pages.
export function getGuidesForTool(toolSlug: string, lang: Locale): SeoGuideView[] {
  return seoGuides
    .filter((guide) => isSeoGuideAvailableInLocale(guide, lang) && guide.relatedToolIds.includes(toolSlug))
    .sort((a, b) => a.priority - b.priority)
    .map((guide) => viewSeoGuide(guide, lang));
}
