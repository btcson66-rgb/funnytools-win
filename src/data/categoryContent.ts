import type { Locale } from '../config/site';

export interface CategoryFaq {
  q: string;
  a: string;
}

export interface HowToChoose {
  /** Short guidance sentence shown to the user. */
  tip: string;
  /** Optional tool slug to link the recommendation to. */
  toolSlug?: string;
}

export interface CategoryContent {
  /** Custom <title> per category for SEO. */
  title: Record<Locale, string>;
  /** Custom meta description per category. */
  metaDescription: Record<Locale, string>;
  /** Single H1 text (category name + free tools). */
  h1: Record<Locale, string>;
  /** Intro paragraphs (300-500 words combined for zh). */
  intro: Record<Locale, string[]>;
  /** Suitable use cases (4-6). */
  useCases: Record<Locale, string[]>;
  /** How to choose the right tool (mapped to tools). */
  howToChoose: Record<Locale, HowToChoose[]>;
  /** Category FAQ (3-5). */
  faq: Record<Locale, CategoryFaq[]>;
  /** Related category ids (3+). */
  relatedCategories: string[];
  /** Optional disclaimer (required for money). */
  disclaimer?: Record<Locale, string>;
  /** Longer per-tool blurbs keyed by tool slug (50-100 chars zh). */
  toolBlurbs: Record<string, Record<Locale, string>>;
}

// P1 (2026-10-15): only the statistics category page is published; the content
// blocks of the other categories were removed together with their pages.
export const categoryContent: Record<string, CategoryContent> = {
  statistics: {
    title: {
      zh: '教育與統計免費工具｜標準差、百分比、平均計算 - FunnyTools',
      en: 'Education & Statistics Calculators | Free Tools - FunnyTools',
    },
    metaDescription: {
      zh: '免費統計與教育計算工具：標準差、變異數、平均、中位數與百分比計算。瀏覽器本機運算、完全免註冊，適合學生自主學習、作業、教學研究與基礎資料分析。',
      en: 'Free statistics and education calculators: standard deviation, variance, mean, median, and percentages. Processed locally, ideal for study and analysis.',
    },
    h1: { zh: '教育與統計免費工具', en: 'Free Education & Statistics Tools' },
    intro: {
      zh: [
        '教育與統計分類提供與計算、數據分析相關的免費工具，包括標準差計算器與百分比計算器，協助學生、老師與需要快速處理數字的人完成常見的統計運算。不必安裝軟體，打開網頁輸入數字就能立即得到結果。',
        '想了解一組數據的離散程度，標準差計算器能一次算出平均、中位數、眾數、全距，以及母體與樣本的變異數與標準差；處理折扣、占比或成長率時，百分比計算器則提供三種常用的百分比運算，輸入後即時顯示答案。',
        '所有運算都在你的瀏覽器本機完成，輸入的數字不會上傳到伺服器，適合處理作業、報告或研究資料。這些工具的結果適合作為學習與分析的輔助參考；若用於正式研究或決策，仍建議搭配完整的統計方法與專業判斷。',
        '這個分類適合正在學習統計的學生、準備教材的老師，以及需要快速檢查資料分布的研究與行政人員。你可以先用平均、中位數與標準差描述資料，再用百分比、加權平均或分數轉換處理成績與比例問題，並把計算過程當成理解公式的輔助。',
      ],
      en: [
        'The Education & Statistics category offers free tools for calculation and data analysis, including a standard deviation calculator and a percentage calculator, helping students, teachers, and anyone working with numbers complete common statistics quickly. No install needed — open the page, enter numbers, and get results instantly.',
        'To understand how spread out a data set is, the standard deviation calculator returns mean, median, mode, range, and both population and sample variance and standard deviation; for discounts, ratios, or growth, the percentage calculator covers three common operations with live results.',
        'Everything runs locally in your browser, so numbers are never uploaded — good for homework, reports, and research data. Treat the results as a study and analysis aid; for formal research or decisions, pair them with proper statistical methods and professional judgment.',
      ],
    },
    useCases: {
      zh: [
        '計算考試成績的平均與標準差',
        '檢查實驗或量測數據的離散程度',
        '計算折扣後省下的金額與占比',
        '估算數據從上期到本期的成長百分比',
        '作業或報告中快速取得統計摘要',
      ],
      en: [
        'Find the mean and standard deviation of exam scores',
        'Check how spread out experimental data is',
        'Work out discount savings and ratios',
        'Estimate growth from one period to the next',
        'Get a quick statistics summary for homework or reports',
      ],
    },
    howToChoose: {
      zh: [
        { tip: '想算平均、變異數與標準差，用標準差計算器', toolSlug: 'standard-deviation' },
        { tip: '想算百分比、占比或增減變化，用百分比計算器', toolSlug: 'percentage-calculator' },
        { tip: '想算學期成績（平時與段考的加權平均），用學期成績計算器', toolSlug: 'grade-average' },
      ],
      en: [
        { tip: 'For mean, variance, and standard deviation, use the Standard Deviation Calculator', toolSlug: 'standard-deviation' },
        { tip: 'For percentages, ratios, or change, use the Percentage Calculator', toolSlug: 'percentage-calculator' },
        { tip: 'For weighted grade averages, use the Grade Average Calculator', toolSlug: 'grade-average' },
      ],
    },
    faq: {
      zh: [
        { q: '這些統計工具需要付費嗎？', a: '不需要，全部免費，也不需要註冊或安裝。' },
        { q: '母體標準差與樣本標準差怎麼選？', a: '若你的數字是整個母體就看母體值，若只是抽樣就看樣本值（除以 n−1）。' },
        { q: '輸入的數字會被上傳嗎？', a: '不會，所有運算都在你的瀏覽器本機完成。' },
        { q: '可以輸入小數或負數嗎？', a: '可以，工具支援小數與負數，只要是有效數字都會納入計算。' },
        { q: '結果可以當作正式研究依據嗎？', a: '結果適合學習與快速分析參考；正式研究請搭配完整統計方法與專業判斷。' },
      ],
      en: [
        { q: 'Are these statistics tools free?', a: 'Yes, all free with no sign-up or installation.' },
        { q: 'How do I choose population vs sample standard deviation?', a: 'Use the population value for a full population, or the sample value (divide by n−1) for a sample.' },
        { q: 'Are the numbers I enter uploaded?', a: 'No, all calculations run locally in your browser.' },
        { q: 'Can I enter decimals or negative numbers?', a: 'Yes, decimals and negatives are supported as long as they are valid numbers.' },
        { q: 'Can I use the results for formal research?', a: 'They suit study and quick analysis; for formal research, pair them with proper methods and judgment.' },
      ],
    },
    relatedCategories: ['study', 'money', 'text'],
    toolBlurbs: {
      'standard-deviation': {
        zh: '輸入一組數字（逗號、空格或換行分隔），自動計算個數、總和、平均、中位數、眾數、全距，以及母體與樣本的變異數與標準差。',
        en: 'Enter a set of numbers to get count, sum, mean, median, mode, range, and both population and sample variance and standard deviation.',
      },
      'percentage-calculator': {
        zh: '提供三種常用計算：某數的百分比、占比（X 是 Y 的百分之多少）與百分比增減變化，輸入後即時顯示結果，適合折扣與成長率。',
        en: 'Covers three common needs — percentage of a number, ratio, and percentage change — with live results for discounts and growth.',
      },
    },
  },
};

export function getCategoryContent(id: string): CategoryContent | undefined {
  return categoryContent[id];
}
