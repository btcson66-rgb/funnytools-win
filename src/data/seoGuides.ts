import type { Locale } from '../config/site';
import { CONTENT_REVIEWED_AT } from '../lib/contentValue';

// P1 (2026-10-15): the guide catalogue was reduced to the single retained
// guide, t-score-calculator-guide. The other template guides were removed.
export type SeoPageKind = 'guide' | 'guideHub';

export type LocalizedText = Record<Locale, string>;

export interface GuideFaq {
  question: LocalizedText;
  answer: LocalizedText;
}

export interface SeoGuide {
  id: string;
  task?: string;
  pageKind?: SeoPageKind;
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
  publishAt?: string;
  contentHtml?: LocalizedText;
  noFaqSchema?: boolean;
}

export interface SeoGuideView {
  id: string;
  task?: string;
  pageKind?: SeoPageKind;
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
  publishAt?: string;
  contentHtml?: string;
  noFaqSchema?: boolean;
}

interface RawSeoGuide {
  id: string;
  pageKind?: SeoPageKind;
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
  publishAt?: string;
}

type EnglishSeoGuideContent = Omit<RawSeoGuide, 'id' | 'slug' | 'priority' | 'relatedToolIds' | 'relatedGuideIds' | 'relatedWorkflowIds' | 'updatedAt'>;

const guideSeoOverrides: Record<string, Partial<Record<'zhMetaDescription' | 'enMetaTitle', string>>> = {
  't-score-calculator-guide': {
    zhMetaDescription: 'T 分數教學說明平均數、標準差、Z 分數轉換與常見判讀方式，適合教師考試、教育測驗與研究報告前先檢查公式、保存範例並確認解讀脈絡。',
    enMetaTitle: 'T Score Calculator Guide: Formula and Examples',
  },
};

export const statisticsDisclaimer = {
  zh: '本頁協助計算與報告撰寫，但使用者仍應確認自己的研究設計、假設條件與統計解釋。',
  en: 'This page helps with calculation and reporting, but users should still confirm their research design, assumptions, and statistical interpretation.',
} satisfies LocalizedText;

function text(zh: string, en?: string): LocalizedText {
  return { zh, en: en ?? zh };
}

function completeZhMetaDescription(description: string): string {
  if ([...description].length >= 70) return description;
  return `${description} 本頁補充工具連結、操作步驟、常見錯誤與檢查方向，方便正式使用前快速核對。`;
}

function localizeRawGuide(guide: RawSeoGuide): SeoGuide {
  const translated = englishGuideContent[guide.slug];
  const en: EnglishSeoGuideContent = translated ?? guide;
  const zhMetaDescription = guideSeoOverrides[guide.slug]?.zhMetaDescription ?? guide.metaDescription;

  return {
    ...guide,
    pageKind: guide.pageKind ?? 'guide',
    // A scheduled Chinese article must never break the whole build merely
    // because its English editorial pass is not finished yet. Keep the
    // original article publishable in Chinese, and only expose an English
    // route/hreflang once a real translation exists.
    locales: translated ? ['zh', 'en'] : ['zh'],
    title: text(guide.title, en.title),
    metaTitle: text(guide.metaTitle, guideSeoOverrides[guide.slug]?.enMetaTitle ?? en.metaTitle),
    metaDescription: text(completeZhMetaDescription(zhMetaDescription), en.metaDescription),
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
    updatedAt: guide.updatedAt ?? CONTENT_REVIEWED_AT,
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
    contentHtml: guide.contentHtml?.[lang],
    noFaqSchema: guide.noFaqSchema,
  };
}

export function guideUpdatedAt(guide: Pick<SeoGuide, 'updatedAt'>): string {
  return guide.updatedAt ?? CONTENT_REVIEWED_AT;
}

export function isSeoGuideAvailableInLocale(guide: SeoGuide, lang: Locale): boolean {
  return guide.locales.includes(lang);
}

const rawSeoGuides: RawSeoGuide[] = [
  {
    id: 't-score-calculator-guide',
    slug: 't-score-calculator-guide',
    title: 'T 分數計算完整指南',
    metaTitle: 'T分數換算怎麼算？公式、Z分數轉換與教師甄試解讀',
    metaDescription: 'T分數換算完整教學：用教師甄試與教育測驗情境理解 T = 50 + 10z 公式、Z 分數轉換、PR 差異與常見錯誤，含完整數字範例。',
    h1: 'T 分數怎麼算？教師甄試與教育測驗的完整指南',
    category: '教育統計',
    priority: 1,
    searchIntent: '想把原始分數或 Z 分數轉成 T 分數，並理解教師甄試成績單中的相對位置。',
    targetKeywords: ['T 分數計算', 'T 分數公式', '教師甄試 T 分數', 'Z 分數轉 T 分數'],
    relatedToolIds: ['t-score-calculator', 'standard-deviation', 'class-rank-percentile-calculator', 'teacher-exam-score-converter'],
    relatedGuideIds: [],
    relatedWorkflowIds: [],
    summary: 'T 分數把 Z 分數放到平均 50、標準差 10 的量尺上，讓教育測驗與教師甄試成績更容易比較。',
    problem: '只看原始分數時，無法知道該分數在同一群考生中高於或低於平均多少。不同科目、不同年度或不同測驗的平均與標準差也可能不同。',
    whoShouldUse: '適合教師甄試考生、教育研究生、需要解讀標準分數的教師，以及正在整理測驗結果的人。若你只有一個原始分數，卻沒有同一參照群體的平均數、標準差或官方常模，本指南能協助你辨認資料缺口，但不能憑單一分數補出可靠的 T 分數。',
    explanation: [
      'T 分數不是百分制分數，而是標準分數的一種轉換。常見量尺設定為平均 50、標準差 10，因此 T=60 通常表示高於平均一個標準差，T=40 則表示低於平均一個標準差。',
      '教師甄試或教育測驗使用 T 分數，是為了把不同分布的成績放到同一比較基準。這不代表錄取規則只看 T 分數，仍要依公告的加權、門檻、排序與同分處理規則。',
      '計算分兩段：先以 Z=(X−M)/SD 把原始分數轉成標準差單位，再以 T=50+10Z 改變中心與尺度。這兩步都是線性轉換，不會把偏態、雙峰或有極端值的資料變成常態分配，也不會建立原本不存在的全國常模。',
      '精度處理應放在最後。以本站工具實作為例，輸入 Z 後先用完整數值精度計算，T 結果顯示到小數點後最多 2 位，Z 對照值顯示到最多 3 位。若先把平均、標準差或 Z 過早取整，後續加權與排序可能出現差異。',
      '方法出處可查美國教育統計中心 NCES 的 ECLS-K 說明（nces.ed.gov/pubs2002/kindergarten/21.asp?nav=4）：該例以平均 50、標準差 10 的 T 分數呈現常模參照結果，並顯示分析樣本改變時實際平均也可能改變。百分等級與常模群體定義則可對照 ETS Standards for Quality and Fairness。',
      statisticsDisclaimer.zh,
    ],
    steps: [
      '確認原始分數 X、群體平均 M、標準差 SD 都來自同一批資料。',
      '先判斷輸入的 SD 是完整群體的母體標準差，還是由抽樣資料估計的樣本標準差，並在報告中說明。',
      '計算 Z = (X - M) / SD，標準差必須大於 0；先保留完整計算值，不要在這一步取整數。',
      '套用常見公式 T = 50 + 10Z。',
      '最後才依報告或簡章規定四捨五入；本站 T 分數工具顯示到小數點後最多 2 位。',
      '解讀時同時保留原始分數、平均、標準差、參照群體與 T 分數，不要只留下轉換後的數字。',
    ],
    formula: 'Z = (X - M) / SD；T = 50 + 10Z。',
    example: '例如某次八年級數學段考共 40 人，原始分數 82，該班平均 70、母體標準差 8。Z=(82−70)/8=1.50，T=50+10×1.50=65。這表示分數在這個班級參照群體中高於平均 1.5 個標準差，而不是「得到 65%」，也不能據此宣稱全國 PR 65。若另一次考試平均 60、標準差 15，即使原始分數同為 82，Z 與 T 都會不同；跨考試比較前必須確認常模與測量內容可比。',
    commonMistakes: [
      '把 T 分數當成百分比或滿分 100 的成績。',
      '用不同年度或不同群體的平均與標準差混在一起計算。',
      '標準差為 0 或資料太少時仍硬算標準分數。',
      '過早四捨五入，造成後續加權或排序差異。',
      '分布明顯偏態或有極端值時，仍把 T 分數直接換成常態百分位。',
      '把班級常模得到的 T 分數說成全校、全縣市或全國位置。',
    ],
    faq: [
      { question: 'T 分數越高一定越好嗎？', answer: '在同一量尺與同一群體內通常代表相對位置較高，但正式結果仍取決於公告的加權與錄取規則。' },
      { question: 'T 分數和 Z 分數差在哪？', answer: 'Z 分數以平均 0、標準差 1 表示距離；T 分數通常把 Z 分數轉成平均 50、標準差 10，較容易閱讀。' },
      { question: 'T 分數可以直接轉 PR 嗎？', answer: '只有在分布假設合理或有完整群體資料時才適合估算 PR，否則可能只是粗略推測。' },
      { question: '教師甄試一定使用 T 分數嗎？', answer: '不一定。各縣市、學校或年度可能採不同規則，請以當次簡章或成績公告為準。' },
      { question: '資料不是常態分配還能算 T 分數嗎？', answer: '線性公式仍可計算，但結果只表示相對平均的標準差距離，不能直接套用常態曲線推估百分位。小樣本、偏態或極端值都應另外說明。' },
      { question: '同分學生的 T 分數會不同嗎？', answer: '若使用相同原始分數、平均數與標準差，T 分數會相同；後續排名或錄取同分比序是另一套規則，本公式不處理。' },
    ],
    cta: '先用 T 分數計算器確認轉換，再搭配 Z 分數與 PR 工具檢查解讀是否一致。',
    updatedAt: '2026-06-25',
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
    whoShouldUse: 'Use this if you are preparing for teacher exams, reading education test reports, or explaining standardized scores. If you have only one raw score but no mean, standard deviation, or official norm from the same reference group, this guide can identify the missing information but cannot reconstruct a reliable T score.',
    explanation: [
      'A T score is not a percentage. A common scale uses mean 50 and standard deviation 10, so T = 60 is about one standard deviation above the mean and T = 40 is about one standard deviation below.',
      'Teacher exams and education tests use T scores to place different score distributions on a shared comparison scale. Official decisions can still depend on weighting, cutoffs, ranking rules, and tie-breakers.',
      'The calculation has two stages: Z = (X − M) / SD expresses the raw score in standard-deviation units, then T = 50 + 10Z changes the center and scale. These linear transformations do not make a skewed, bimodal, or outlier-heavy distribution normal, and they do not create a national norm that was not present in the source data.',
      'Round only at the end. The calculator on this site uses the full numeric value of Z, displays T to at most two decimal places, and displays the Z equivalent to at most three. Rounding the mean, SD, or Z too early can affect later weighting and ranking.',
      'For a public methodology example, see the NCES ECLS-K explanation at nces.ed.gov/pubs2002/kindergarten/21.asp?nav=4. It uses a mean-50, SD-10 T-score scale for norm-referenced reporting and also shows why results depend on the analysis group. ETS Standards for Quality and Fairness describes percentile ranks and norm groups.',
      statisticsDisclaimer.en,
    ],
    steps: [
      'Confirm that raw score X, mean M, and standard deviation SD come from the same group.',
      'Determine whether SD describes the complete reference population or is a sample estimate, and state that choice in a report.',
      'Calculate Z = (X - M) / SD. The standard deviation must be greater than zero; keep the full value at this stage.',
      'Apply the common formula T = 50 + 10Z.',
      'Round only at the reporting step; the site calculator displays T to at most two decimal places.',
      'Keep the raw score, mean, SD, reference group, and T score together so the result can be checked.',
    ],
    formula: 'Z = (X - M) / SD; T = 50 + 10Z.',
    example: 'If a candidate scores 82, the group mean is 70, and SD is 8, then Z = (82 - 70) / 8 = 1.50. T = 50 + 10 × 1.50 = 65. This means the score is 1.5 SD above the mean, not 65%.',
    commonMistakes: [
      'Treating a T score as a percentage or a score out of 100.',
      'Mixing means and SDs from different years or groups.',
      'Calculating standard scores when SD is zero or the data are too limited.',
      'Rounding too early before later weighting or ranking steps.',
      'Converting a T score to a normal percentile when the distribution is clearly skewed or affected by outliers.',
      'Describing a class-normed T score as a school-wide, district-wide, or national position.',
    ],
    faq: [
      { question: 'Is a higher T score always better?', answer: 'Within the same scale and group it usually means a higher relative position, but official outcomes still depend on the published rules.' },
      { question: 'How is a T score different from a Z score?', answer: 'A Z score uses mean 0 and SD 1. A T score commonly transforms it to mean 50 and SD 10 for easier reading.' },
      { question: 'Can I convert a T score directly to PR?', answer: 'Only when the distribution assumption is reasonable or the full reference data are available.' },
      { question: 'Do all teacher exams use T scores?', answer: 'No. Always follow the current official notice for the exam, district, or school.' },
      { question: 'Can I calculate a T score when the data are not normal?', answer: 'The linear formula still works, but the result only describes distance from the mean in SD units. Do not convert it directly to a normal percentile when the sample is small, skewed, or affected by outliers.' },
      { question: 'Do tied raw scores receive different T scores?', answer: 'Not when the same raw score, mean, and SD are used. Any later rank or admission tie-break is a separate rule that this formula does not handle.' },
    ],
    cta: 'Start with the T score calculator, then compare the result with the Z score and percentile rank tools.',
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
