import type { Locale } from '../config/site';

export type LocalizedText = Record<Locale, string>;

export interface WorkflowFaq {
  question: LocalizedText;
  answer: LocalizedText;
}

export interface Workflow {
  id: string;
  locales: Locale[];
  slug: string;
  title: LocalizedText;
  metaTitle: LocalizedText;
  metaDescription: LocalizedText;
  h1: LocalizedText;
  purpose: LocalizedText;
  steps: LocalizedText[];
  recommendedToolIds: string[];
  relatedGuideIds: string[];
  faq: WorkflowFaq[];
  updatedAt: string;
}

export interface WorkflowView {
  id: string;
  locales: Locale[];
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  purpose: string;
  steps: string[];
  recommendedToolIds: string[];
  relatedGuideIds: string[];
  faq: { question: string; answer: string }[];
  updatedAt: string;
}

interface RawWorkflow {
  id: string;
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  purpose: string;
  steps: string[];
  recommendedToolIds: string[];
  relatedGuideIds: string[];
  faq: { question: string; answer: string }[];
  updatedAt: string;
}

type EnglishWorkflowContent = Omit<RawWorkflow, 'id' | 'slug' | 'recommendedToolIds' | 'relatedGuideIds' | 'updatedAt'>;

const workflowSeoOverrides: Record<string, Partial<Record<'zhMetaDescription' | 'enMetaTitle', string>>> = {
  'graduate-statistics-report-toolkit': {
    zhMetaDescription: '研究生統計報告流程串接描述統計、SPSS 表格、Levene 檢定、APA 7 句子與效果量檢查，適合交稿前逐步確認資料、表格、假設與報告文字。',
    enMetaTitle: 'Graduate Statistics Report Workflow Toolkit',
  },
  'teacher-exam-score-toolkit': {
    zhMetaDescription: '教師甄試成績流程整理原始分數、加權總分、T 分數、Z 分數與 PR 百分等級，協助保存可回查的計算紀錄、公式脈絡與備查結果。',
    enMetaTitle: 'Teacher Exam Score Workflow Toolkit',
  },
  'teacher-classroom-random-toolkit': {
    zhMetaDescription: '教師課堂隨機流程串接名單整理、隨機分組、抽人、抽順序、計時與結果保存，適合討論、報告、複習活動與課堂紀錄安排。',
    enMetaTitle: 'Teacher Classroom Random Workflow Toolkit',
  },
  'student-report-toolkit': {
    enMetaTitle: 'Student Report Workflow Toolkit',
  },
  'office-document-toolkit': {
    enMetaTitle: 'Office Document Workflow Toolkit',
  },
  'creator-social-toolkit': {
    enMetaTitle: 'Creator & Social Media Workflow Toolkit',
  },
  'daily-decision-toolkit': {
    enMetaTitle: 'Daily Decision Workflow Toolkit',
  },
};

function text(zh: string, en?: string): LocalizedText {
  return { zh, en: en ?? zh };
}

function completeZhMetaDescription(description: string): string {
  if ([...description].length >= 70) return description;
  return `${description} 本頁補充推薦工具、相關指南、操作步驟與檢查方向，方便正式使用前快速核對。`;
}

function localizeRawWorkflow(workflow: RawWorkflow): Workflow {
  const en = englishWorkflowContent[workflow.slug];
  const zhMetaDescription = workflowSeoOverrides[workflow.slug]?.zhMetaDescription ?? workflow.metaDescription;

  return {
    ...workflow,
    locales: ['zh', 'en'],
    title: text(workflow.title, en.title),
    metaTitle: text(workflow.metaTitle, workflowSeoOverrides[workflow.slug]?.enMetaTitle ?? en.metaTitle),
    metaDescription: text(completeZhMetaDescription(zhMetaDescription), en.metaDescription),
    h1: text(workflow.h1, en.h1),
    purpose: text(workflow.purpose, en.purpose),
    steps: workflow.steps.map((step, index) => text(step, en.steps[index])),
    faq: workflow.faq.map((item, index) => ({
      question: text(item.question, en.faq[index].question),
      answer: text(item.answer, en.faq[index].answer),
    })),
  };
}

export function viewWorkflow(workflow: Workflow, lang: Locale): WorkflowView {
  return {
    ...workflow,
    title: workflow.title[lang],
    metaTitle: workflow.metaTitle[lang],
    metaDescription: workflow.metaDescription[lang],
    h1: workflow.h1[lang],
    purpose: workflow.purpose[lang],
    steps: workflow.steps.map((step) => step[lang]),
    faq: workflow.faq.map((item) => ({ question: item.question[lang], answer: item.answer[lang] })),
  };
}

export function isWorkflowAvailableInLocale(workflow: Workflow, lang: Locale): boolean {
  return workflow.locales.includes(lang);
}

const rawWorkflows: RawWorkflow[] = [
  {
    id: 'graduate-statistics-report-toolkit',
    slug: 'graduate-statistics-report-toolkit',
    title: '研究生統計報告工具包',
    metaTitle: '研究生統計報告工具包：SPSS 解讀、Levene、APA 7 與效果量',
    metaDescription: '從描述統計、檢定類型、SPSS 輸出、Levene 假設檢查到 APA 7 報告句，整理研究生統計報告流程。',
    h1: '研究生統計報告工具包：從 SPSS 輸出到 APA 7 句子',
    purpose: '這個流程協助研究生把統計輸出整理成可檢查、可修改的報告草稿：先確認描述統計與檢定類型，再檢查假設、讀取 SPSS 表格，最後產生 APA 7 句子並人工修訂。',
    steps: [
      '檢查描述統計：先整理平均數、標準差、樣本數與分組名稱，避免後面只剩 p 值。',
      '辨識檢定類型：確認是獨立樣本 t 檢定、配對樣本 t 檢定、單因子 ANOVA、二因子 ANOVA 或其他模型。',
      '讀取 SPSS 輸出：找出正確表格與效果列，不要把 Levene、主效果、交互作用或事後比較混在一起。',
      '檢查假設條件：例如獨立樣本 t 檢定先看 Levene，ANOVA 則檢查變異數同質性、樣本設計與必要的 follow-up。',
      '產生 APA 7 句子：輸入 t、F、df、p、效果量與描述統計，產生可編修的報告句。',
      '複製後人工修訂：依研究問題、指導教授或期刊格式調整文字，不把工具輸出當作最終統計判斷。',
    ],
    recommendedToolIds: ['standard-deviation', 'apa-7-report-generator', 'spss-result-interpreter', 't-score-calculator', 'z-score-calculator'],
    relatedGuideIds: ['spss-levene-test-guide', 't-test-apa-format-guide', 'anova-apa-format-guide', 'two-way-anova-interaction-guide'],
    faq: [
      { question: '這個流程可以取代統計顧問嗎？', answer: '不行。它協助整理計算與報告文字，但研究設計、假設檢查與統計解釋仍需由研究者確認。' },
      { question: '一定要先做描述統計嗎？', answer: '建議要。描述統計能幫你發現輸入錯誤、極端值與結果方向，也讓 APA 報告更完整。' },
      { question: 'SPSS 解讀器可以直接決定顯著嗎？', answer: '它可以協助你整理表格與常見判斷，但仍要依你的研究設計、alpha 水準與課程或期刊要求確認。' },
      { question: 'APA 句子產生後還要改嗎？', answer: '要。工具句子是草稿，仍需補上研究脈絡、變項名稱、方向與限制。' },
    ],
    updatedAt: '2026-06-25',
  },
  {
    id: 'teacher-exam-score-toolkit',
    slug: 'teacher-exam-score-toolkit',
    title: '教師甄試成績工具包',
    metaTitle: '教師甄試成績工具包：加權總分、T 分數、Z 分數與 PR 解讀',
    metaDescription: '整理教師甄試成績試算流程：輸入原始分數、套用權重、轉換與比較 T/Z/PR，最後複製或保存結果。',
    h1: '教師甄試成績工具包：加權總分、T 分數、Z 分數與 PR',
    purpose: '這個流程協助教師甄試考生把分散的筆試、試教、口試或資料審查分數整理成可檢查的試算表，再用 T/Z/PR 理解相對位置。',
    steps: [
      '輸入原始分數：分開記錄筆試、試教、口試、資料審查或其他公告項目，不要先合併。',
      '套用權重：依簡章把每項權重轉成百分比或小數，確認總和是否為 100%。',
      '轉換與比較分數：用加權總分確認試算，再視需要轉換 T 分數、Z 分數或 PR。',
      '理解 T/Z/PR：T 分數與 Z 分數描述離平均多遠，PR 描述相對位置，三者不是原始分數。',
      '保存或複製：保留原始分數、權重、平均、標準差與計算日期，方便回頭查核。',
    ],
    recommendedToolIds: ['teacher-exam-score-converter', 't-score-calculator', 'z-score-calculator', 'percentile-rank-calculator', 'weighted-average-calculator'],
    relatedGuideIds: ['teacher-exam-weighted-score-guide', 't-score-calculator-guide', 'z-score-calculator-guide', 'percentile-rank-guide'],
    faq: [
      { question: '這個工具包能預測錄取嗎？', answer: '不能。它只能協助試算與理解分數，正式錄取仍依公告、名額、門檻、同分比序與實際成績資料。' },
      { question: '沒有平均與標準差可以算 T 分數嗎？', answer: '不能正確計算。T/Z 分數需要同一群體的平均與標準差。' },
      { question: 'PR 和名次一樣嗎？', answer: '不完全一樣。PR 是相對百分等級，精確名次仍取決於完整考生資料與同分規則。' },
      { question: '權重可以自己估嗎？', answer: '練習試算可以，但正式解讀應以當年度簡章或公告權重為準。' },
    ],
    updatedAt: '2026-06-25',
  },
  {
    id: 'teacher-classroom-random-toolkit',
    slug: 'teacher-classroom-random-toolkit',
    title: '教師課堂隨機工具包',
    metaTitle: '教師課堂隨機工具包：分組、抽人、計時、轉盤與座位活動流程',
    metaDescription: '給老師使用的課堂隨機工具流程：準備學生名單、隨機分組、抽發表順序、使用倒數計時器，並保存課堂活動結果。',
    h1: '教師課堂隨機工具包：分組、抽人、計時與抽籤流程',
    purpose: '這個流程幫助老師用現有課堂工具更快完成活動安排：先準備學生名單，再隨機分組、抽發表者或順序、設定倒數時間，最後複製或保存結果。適合小組討論、報告、複習、角色分配與臨時課堂活動。',
    steps: [
      '準備學生名單：只保留本節課實際參與的學生，缺席、外出或不參與者先移除。',
      '隨機分組：使用 group-generator 或 random-group-generator，依活動選擇組數或每組人數。',
      '抽發表順序或代表：使用 random-student-picker、random-name-picker 或 random-wheel 決定學生、小組或主題。',
      '控制活動時間：使用 countdown-timer 設定討論、書寫、發表與轉換時間；較長自學可改用 pomodoro-timer。',
      '複製或保存結果：把分組、抽選順序、座位或主題分配貼到投影片、白板或班級平台，方便學生照著執行。',
    ],
    recommendedToolIds: ['group-generator', 'random-group-generator', 'random-student-picker', 'random-name-picker', 'countdown-timer', 'random-wheel', 'seating-chart'],
    relatedGuideIds: ['classroom-random-group-guide', 'classroom-random-picker-guide', 'classroom-timer-guide', 'fair-student-grouping-guide', 'classroom-lottery-tool-guide'],
    faq: [
      { question: '這個工具包適合哪些老師？', answer: '適合需要快速安排小組討論、課堂發表、複習抽問、主題分配、座位活動或角色分工的老師與助教。' },
      { question: '範例課堂流程可以怎麼跑？', answer: '先把 30 位在場學生貼到分組工具分成 6 組，給 5 分鐘討論，再用學生抽選器抽代表發表，最後把結果複製到投影片。' },
      { question: '常見用途有哪些？', answer: '包括公平分組、抽回答者、決定報告順序、抽主題、限時討論、分配小組角色與記錄座位安排。' },
      { question: '工具結果可以直接取代老師判斷嗎？', answer: '不建議。工具負責快速產生透明結果，老師仍要檢查缺席、支援需求、座位限制與活動安全。' },
    ],
    updatedAt: '2026-06-26',
  },
  {
    id: 'student-report-toolkit',
    slug: 'student-report-toolkit',
    title: '學生報告工具組',
    metaTitle: '學生報告工具組：字數、圖片、PDF、QR Code 與格式整理',
    metaDescription: '學生報告工具組整理寫作、圖片壓縮、PDF 合併拆分、檔案壓縮、QR Code 與文字格式檢查流程，適合交作業、簡報與研究報告繳交前使用。',
    h1: '學生報告工具組：從草稿字數到 PDF 繳交前檢查',
    purpose: '這個流程協助學生在交作業或報告前，把字數、圖片大小、PDF 頁面、QR Code 與文字格式依序檢查，減少最後一刻重複上傳與格式錯誤。',
    steps: [
      '先用字數與字元工具檢查題目、摘要、正文與附註是否符合老師規定。',
      '整理標題、段落與英文大小寫，避免複製貼上造成格式不一致。',
      '壓縮圖片後再放入文件，保留原始檔並確認圖表與文字截圖仍清楚。',
      '把完成的文件合併成 PDF，必要時拆分附件、封面或附錄頁面。',
      '如果檔案過大，先壓縮 PDF，再重新打開下載檔檢查頁數與畫質。',
      '需要分享報告連結或展示資料時，產生 QR Code 並用另一台裝置掃描測試。',
    ],
    recommendedToolIds: ['word-counter', 'character-counter', 'image-compressor', 'merge-pdf', 'split-pdf', 'pdf-compressor', 'qr-code-generator', 'case-converter'],
    relatedGuideIds: [],
    faq: [
      { question: '這個流程適合哪些學生報告？', answer: '適合課堂報告、研究摘要、簡報附件、書面作業與需要上傳 PDF 的作業。正式格式仍以老師或系所規定為準。' },
      { question: '圖片壓縮後要注意什麼？', answer: '請保留原始檔，並放大檢查圖表、文字截圖、掃描件與照片細節是否仍可辨識。' },
      { question: 'PDF 合併後可以直接繳交嗎？', answer: '建議先重新打開下載檔，確認頁面順序、頁數、封面、附錄與簽名頁都正確。' },
      { question: 'QR Code 適合放在報告裡嗎？', answer: '適合放延伸資料、展示連結或問卷，但繳交前要確認掃描後的網址正確且可公開存取。' },
    ],
    updatedAt: '2026-06-26',
  },
  {
    id: 'office-document-toolkit',
    slug: 'office-document-toolkit',
    title: '辦公室文件工具組',
    metaTitle: '辦公室文件工具組：PDF、圖片壓縮、日期、工作天與 JSON',
    metaDescription: '辦公室文件工具組整理 PDF 合併拆分壓縮、圖片壓縮、工作天與日期差試算、QR Code 與 JSON 格式化流程，適合行政、專案與日常文件處理。',
    h1: '辦公室文件工具組：處理 PDF、圖片、日期與資料格式',
    purpose: '這個流程協助上班族快速處理日常文件任務：整理 PDF、壓縮圖片或檔案、試算日期與工作天、產生 QR Code，並檢查 JSON 資料格式。',
    steps: [
      '先確認文件用途、頁面順序與是否需要拆出附件或附錄。',
      '使用 PDF 合併、拆分或壓縮工具整理交付版本，並保留原始檔。',
      '壓縮圖片或截圖後，檢查文字、表格與簽名是否仍清楚。',
      '用日期差與工作天工具估算截止日，記錄是否排除週末或特定假日。',
      '需要公告連結、表單或現場掃描時，產生 QR Code 並實際掃描測試。',
      '遇到系統輸出的 JSON 時，先格式化檢查欄位，再回到來源系統確認內容。',
    ],
    recommendedToolIds: ['merge-pdf', 'split-pdf', 'pdf-compressor', 'image-compressor', 'business-days', 'date-difference', 'qr-code-generator', 'json-formatter'],
    relatedGuideIds: [],
    faq: [
      { question: '可以用這些工具處理公司敏感文件嗎？', answer: '工具以瀏覽器處理為主，但仍應遵守公司資安規範。高度敏感或受管制文件請使用公司核准流程。' },
      { question: '工作天工具會自動知道所有假日嗎？', answer: '不一定。請依所在地與公司規則輸入需要排除的日期，並保留試算假設。' },
      { question: 'PDF 壓縮可能造成什麼問題？', answer: '壓縮可能影響掃描件、圖片或細小文字品質。寄出前請打開檔案抽查重要頁面。' },
      { question: 'JSON 格式化可以修正錯誤資料嗎？', answer: '不能。它只協助排版與閱讀，資料語意、欄位型別與來源正確性仍需人工確認。' },
    ],
    updatedAt: '2026-06-26',
  },
  {
    id: 'creator-social-toolkit',
    slug: 'creator-social-toolkit',
    title: '創作者社群工具組',
    metaTitle: '創作者社群工具組：字元、圖片、QR Code、顏色與隨機輪盤',
    metaDescription: '創作者社群工具組整理貼文字元字數、圖片壓縮與尺寸調整、QR Code、大小寫、顏色產生與隨機輪盤流程，適合發文與活動準備。',
    h1: '創作者社群工具組：貼文、圖片、QR Code 與靈感選擇',
    purpose: '這個流程協助創作者在發布前整理貼文長度、圖片素材、活動連結、顏色靈感與內容選題，讓發文準備更快完成。',
    steps: [
      '先用字元與字數工具檢查標題、貼文、簡介、摘要或廣告文字長度。',
      '整理大小寫與文字格式，讓跨平台貼文看起來一致。',
      '壓縮或調整圖片尺寸，再檢查畫質、文字截圖與平台預覽。',
      '需要導流活動、作品集或表單時，產生 QR Code 並實際掃描測試。',
      '用顏色產生器尋找輔助色，再把色碼記錄到設計稿或貼文備註。',
      '主題太多難以選擇時，用隨機輪盤做低風險排序，再由你做最後判斷。',
    ],
    recommendedToolIds: ['character-counter', 'word-counter', 'image-compressor', 'image-resizer', 'qr-code-generator', 'case-converter', 'color-generator', 'random-wheel'],
    relatedGuideIds: [],
    faq: [
      { question: '這個流程會保證社群成效嗎？', answer: '不會。它只協助整理格式、素材與發布前檢查，實際觸及與互動仍受內容、平台與受眾影響。' },
      { question: '字元統計適合哪些內容？', answer: '適合社群貼文、短影音描述、廣告文案、推播、簡訊、Meta description 與個人簡介。' },
      { question: '圖片壓縮後要怎麼檢查？', answer: '建議在目標平台或手機上預覽，確認人臉、商品、截圖文字與品牌元素仍清楚。' },
      { question: '隨機輪盤適合決定什麼？', answer: '適合主題排序、抽活動項目、決定低風險內容實驗；重要商業決策仍應用資料判斷。' },
    ],
    updatedAt: '2026-06-26',
  },
  {
    id: 'daily-decision-toolkit',
    slug: 'daily-decision-toolkit',
    title: '日常選擇工具組',
    metaTitle: '日常選擇工具組：吃什麼、輪盤、二選一、抽名字與骰子',
    metaDescription: '日常選擇工具組整理吃什麼、隨機輪盤、二選一、抽名字、骰子與倒數計時流程，適合聚會、家庭、活動與低風險快速決策。',
    h1: '日常選擇工具組：吃什麼、抽籤、輪盤與倒數計時',
    purpose: '這個流程協助處理低風險日常選擇，例如聚餐吃什麼、活動抽籤、二選一、遊戲骰子或限時計時，讓大家用透明方式快速決定。',
    steps: [
      '先確認這是低風險選擇，例如餐廳、活動順序、遊戲項目或小任務。',
      '如果是吃飯，用吃什麼工具先產生候選，再移除不適合的選項。',
      '多個選項時使用隨機輪盤；只有兩個選項時使用二選一工具。',
      '需要抽人、抽順序或抽角色時，用抽名字工具並保留當下名單。',
      '遊戲或活動需要機率時使用骰子，並事先說明規則。',
      '討論或活動有時間限制時，用倒數計時讓決定更快收斂。',
    ],
    recommendedToolIds: ['what-to-eat', 'random-wheel', 'this-or-that', 'random-name-picker', 'dice-roller', 'countdown-timer'],
    relatedGuideIds: [],
    faq: [
      { question: '這個工具組適合正式決策嗎？', answer: '不適合。它適合聚會、家庭、活動與低風險選擇；重要財務、醫療、法律或工作決策需要資料與專業判斷。' },
      { question: '多人一起使用時要注意什麼？', answer: '先確認候選選項大家都能接受，再進行抽選，避免把不適合或不可行的選項放進去。' },
      { question: '可以避免重複抽到同一個人嗎？', answer: '抽名字工具可依頁面功能協助管理名單，但重新整理或更換名單可能重置狀態，使用前請確認規則。' },
      { question: '倒數計時適合用在哪裡？', answer: '適合限時討論、遊戲回合、活動排程與決定截止時間，但重要提醒仍建議搭配系統鬧鐘。' },
    ],
    updatedAt: '2026-06-26',
  },
];

const englishWorkflowContent: Record<string, EnglishWorkflowContent> = {
  'graduate-statistics-report-toolkit': {
    title: 'Graduate Statistics Report Toolkit',
    metaTitle: 'Graduate Statistics Report Toolkit: SPSS, Levene, APA 7, and Effect Sizes',
    metaDescription: 'A workflow for graduate statistics reports: descriptive statistics, test type, SPSS output, assumptions, APA 7 sentences, and revision.',
    h1: 'Graduate Statistics Report Toolkit: From SPSS Output to APA 7 Sentences',
    purpose: 'This workflow helps graduate students turn statistical output into a checkable report draft: confirm descriptive statistics and test type, inspect assumptions, read SPSS output, generate an APA 7 sentence, and revise it manually.',
    steps: [
      'Check descriptive statistics: record means, standard deviations, sample sizes, and group labels before focusing on p values.',
      'Identify the test type: independent t test, paired t test, one-way ANOVA, two-way ANOVA, or another model.',
      'Read SPSS output: locate the correct table and effect row instead of mixing Levene, main effects, interactions, and post-hoc results.',
      'Check assumptions: for example, review Levene for independent t tests and variance/design assumptions for ANOVA.',
      'Generate an APA 7 sentence: enter t, F, df, p, effect size, and descriptive statistics.',
      'Copy and revise: adapt the draft to your research question, supervisor comments, or journal format.',
    ],
    faq: [
      { question: 'Can this workflow replace statistical advice?', answer: 'No. It helps with calculation and reporting, but the research design, assumptions, and interpretation must still be checked.' },
      { question: 'Should I always start with descriptive statistics?', answer: 'Yes. They help catch input errors, show direction, and make APA reporting clearer.' },
      { question: 'Can the SPSS interpreter decide significance for me?', answer: 'It can organize common table decisions, but you still need to confirm alpha, design, and reporting rules.' },
      { question: 'Do I need to edit the APA sentence?', answer: 'Yes. Treat it as a draft and add your variables, context, direction, and limitations.' },
    ],
  },
  'teacher-exam-score-toolkit': {
    title: 'Teacher Exam Score Toolkit',
    metaTitle: 'Teacher Exam Score Toolkit: Weighted Total, T Score, Z Score, and PR',
    metaDescription: 'A teacher exam score workflow for raw scores, weights, T scores, Z scores, percentile rank, and saved calculation checks.',
    h1: 'Teacher Exam Score Toolkit: Weighted Total, T Score, Z Score, and PR',
    purpose: 'This workflow helps teacher exam candidates organize written, demo teaching, interview, and portfolio scores into a checkable calculation, then interpret T/Z/PR position.',
    steps: [
      'Enter raw scores: keep written, demo, interview, portfolio, and other components separate.',
      'Apply weights: convert each official weight into a percent or decimal and check that the total is 100%.',
      'Convert and compare scores: calculate the weighted total, then use T, Z, or PR tools when reference data are available.',
      'Understand T/Z/PR: T and Z describe distance from the mean, while PR describes relative position.',
      'Save or copy: keep raw scores, weights, mean, SD, and calculation date for later checking.',
    ],
    faq: [
      { question: 'Can this toolkit predict admission?', answer: 'No. It only helps with estimates and explanation. Official outcomes depend on published rules and actual score data.' },
      { question: 'Can I calculate T score without mean and SD?', answer: 'No. T and Z scores require a mean and standard deviation from the same reference group.' },
      { question: 'Is PR the same as exact rank?', answer: 'Not exactly. PR is a relative percentile position; exact rank depends on the full candidate list and tie rules.' },
      { question: 'Can I estimate weights myself?', answer: 'For practice, yes. For serious interpretation, use the current official notice.' },
    ],
  },
  'teacher-classroom-random-toolkit': {
    title: 'Teacher Classroom Random Toolkit',
    metaTitle: 'Teacher Classroom Random Toolkit: Groups, Pickers, Timers, Wheels, and Seating',
    metaDescription: 'A classroom workflow for teachers: prepare a student list, create random groups, pick speakers or order, set a timer, and save the activity result.',
    h1: 'Teacher Classroom Random Toolkit: Groups, Pickers, Timers, and Draws',
    purpose: 'This workflow helps teachers run classroom activities faster with existing tools: prepare the student list, create random groups, pick speakers or order, set a countdown timer, and copy or save the result. Use it for discussion, presentations, review, role assignment, and quick classroom activities.',
    steps: [
      'Prepare the student list: include only students who are actually participating today.',
      'Randomly divide groups: use group-generator or random-group-generator, then choose group count or group size.',
      'Pick presentation order or speakers: use random-student-picker, random-name-picker, or random-wheel for students, groups, or topics.',
      'Control classroom time: use countdown-timer for discussion, writing, presentation, and transitions; use pomodoro-timer for longer independent work.',
      'Copy or save the result: paste groups, draw order, seating notes, or topic assignments into slides, the board, or your class platform.',
    ],
    faq: [
      { question: 'Who should use this toolkit?', answer: 'Teachers and assistants who need quick grouping, presentation order, review questions, topic draws, seating activity, or role assignment.' },
      { question: 'What is an example classroom scenario?', answer: 'Paste 30 present students into the group tool, make 6 groups, give 5 minutes for discussion, pick one representative, and copy the result to your slides.' },
      { question: 'What are common use cases?', answer: 'Fair grouping, random answers, presentation order, topic assignment, timed discussion, group roles, and seating activity records.' },
      { question: 'Can tool output replace teacher judgment?', answer: 'No. The tools create a fast transparent result, but the teacher should still check absence, support needs, seating limits, and safety.' },
    ],
  },
  'student-report-toolkit': {
    title: 'Student Report Toolkit',
    metaTitle: 'Student Report Toolkit: Word Count, Images, PDFs, QR Codes, and Formatting',
    metaDescription: 'A student report workflow for word counts, character counts, image compression, PDF merge and split, PDF compression, QR codes, and text cleanup.',
    h1: 'Student Report Toolkit: From Draft Checks to PDF Submission',
    purpose: 'This workflow helps students check report length, image size, PDF pages, QR codes, and text formatting before submitting homework, presentations, or research reports.',
    steps: [
      'Check the title, abstract, body, and notes with word and character counters before editing files.',
      'Clean up headings, copied text, and English casing so the report looks consistent.',
      'Compress images before placing them in the document, while keeping the original files.',
      'Merge the finished document into one PDF, or split covers, appendices, and attachments when needed.',
      'If the file is too large, compress the PDF and reopen the download to verify page count and quality.',
      'When sharing supporting links or presentation material, generate a QR code and scan it on another device.',
    ],
    faq: [
      { question: 'What reports does this workflow fit?', answer: 'It fits class reports, written homework, presentation attachments, research summaries, and PDF submissions. Formal requirements still come from your teacher or department.' },
      { question: 'What should I check after image compression?', answer: 'Keep the original file and zoom in to inspect charts, scanned text, screenshots, and photo details.' },
      { question: 'Can I submit a merged PDF immediately?', answer: 'Open the downloaded file first and confirm page order, page count, cover pages, appendices, and signature pages.' },
      { question: 'When should I use a QR code in a report?', answer: 'Use it for supporting material, presentation links, or forms, then confirm that the scanned URL is correct and accessible.' },
    ],
  },
  'office-document-toolkit': {
    title: 'Office Document Toolkit',
    metaTitle: 'Office Document Toolkit: PDFs, Image Compression, Dates, Workdays, and JSON',
    metaDescription: 'An office workflow for PDF merge, split, and compression, image compression, business-day estimates, date differences, QR codes, and JSON formatting.',
    h1: 'Office Document Toolkit: PDFs, Images, Dates, and Data Formatting',
    purpose: 'This workflow helps office workers handle everyday document tasks: organize PDFs, compress files, estimate dates and business days, create QR codes, and inspect JSON data.',
    steps: [
      'Confirm the document purpose, page order, and whether attachments or appendices need separate files.',
      'Use PDF merge, split, or compression tools to prepare a delivery copy while keeping originals.',
      'Compress images or screenshots, then check that text, tables, and signatures remain readable.',
      'Estimate deadlines with date difference and business-day tools, noting weekends and holidays.',
      'Create a QR code for announcements, forms, or event links, then scan it before publishing.',
      'Format JSON from another system before reviewing field names and returning to the source record.',
    ],
    faq: [
      { question: 'Can I use these tools for confidential company documents?', answer: 'They are browser-oriented, but you still need to follow company security rules. Use approved workflows for highly sensitive or regulated files.' },
      { question: 'Does the business-day tool know every holiday?', answer: 'Not necessarily. Enter excluded dates based on your region and company rules, and keep your assumptions.' },
      { question: 'What can PDF compression affect?', answer: 'Compression can affect scans, images, and small text. Open the file and spot-check important pages before sending it.' },
      { question: 'Can JSON formatting fix bad data?', answer: 'No. It improves layout and readability; data meaning, types, and source accuracy still need review.' },
    ],
  },
  'creator-social-toolkit': {
    title: 'Creator & Social Media Toolkit',
    metaTitle: 'Creator & Social Media Toolkit: Characters, Images, QR Codes, Color, and Wheels',
    metaDescription: 'A creator workflow for character counts, word counts, image compression and resizing, QR codes, case conversion, color generation, and random wheels.',
    h1: 'Creator & Social Media Toolkit: Posts, Images, QR Codes, and Idea Picks',
    purpose: 'This workflow helps creators prepare posts faster by checking text length, image assets, campaign links, color ideas, and low-risk content choices before publishing.',
    steps: [
      'Check titles, posts, descriptions, summaries, or ad copy with word and character counters.',
      'Clean up case and formatting so reused text stays consistent across platforms.',
      'Compress or resize images, then review quality, screenshot text, and platform previews.',
      'Generate a QR code for campaigns, portfolios, or forms, and scan it before publishing.',
      'Use the color generator for supporting colors and save the codes in your design notes.',
      'When several topics are acceptable, use a random wheel to order low-risk content ideas.',
    ],
    faq: [
      { question: 'Will this workflow guarantee social performance?', answer: 'No. It helps with formatting, assets, and checks; reach and engagement still depend on content, platform, and audience.' },
      { question: 'What content should I count characters for?', answer: 'Social posts, short video descriptions, ad copy, push messages, SMS drafts, meta descriptions, and profile bios.' },
      { question: 'How should I check compressed images?', answer: 'Preview them on the target platform or a phone, especially faces, products, screenshot text, and brand elements.' },
      { question: 'What should a random wheel decide?', answer: 'It works for topic ordering, small giveaways, or low-risk content experiments; important business choices need data.' },
    ],
  },
  'daily-decision-toolkit': {
    title: 'Daily Decision Toolkit',
    metaTitle: 'Daily Decision Toolkit: Food Picker, Wheel, This or That, Names, Dice, and Timers',
    metaDescription: 'A daily decision workflow for choosing food, spinning a wheel, this-or-that choices, random names, dice rolls, and countdown timers.',
    h1: 'Daily Decision Toolkit: Food, Draws, Wheels, Dice, and Timers',
    purpose: 'This workflow helps with low-risk everyday choices such as where to eat, activity order, small draws, dice games, and timed group decisions.',
    steps: [
      'Confirm that the decision is low risk, such as food, game order, activity options, or small tasks.',
      'For meals, start with the food picker, then remove options that are not realistic today.',
      'Use a random wheel for many options, or this-or-that when there are only two choices.',
      'Use the name picker for people, order, or roles, keeping the current participant list visible.',
      'Use dice when the activity needs a simple chance mechanic, and explain the rules first.',
      'Use a countdown timer to keep discussion or activity rounds from dragging on.',
    ],
    faq: [
      { question: 'Is this toolkit for serious decisions?', answer: 'No. It is for gatherings, family choices, activities, and low-risk decisions. Important financial, medical, legal, or work decisions need evidence and judgment.' },
      { question: 'What should groups agree on first?', answer: 'Confirm that all candidate options are acceptable and realistic before running a random choice.' },
      { question: 'Can name picking avoid repeats?', answer: 'Use the page controls available for the current list, but refreshes or list changes may reset state, so agree on rules first.' },
      { question: 'Where does countdown timing help?', answer: 'Timed discussion, game rounds, activity planning, and decision deadlines. Use a system alarm for critical reminders.' },
    ],
  },
};

export const workflows: Workflow[] = rawWorkflows.map(localizeRawWorkflow);

export function getWorkflow(slug: string): Workflow | undefined {
  return workflows.find((workflow) => workflow.slug === slug);
}

export function getWorkflowsForTool(toolSlug: string, lang: Locale): WorkflowView[] {
  return workflows
    .filter((workflow) => isWorkflowAvailableInLocale(workflow, lang) && workflow.recommendedToolIds.includes(toolSlug))
    .map((workflow) => viewWorkflow(workflow, lang));
}
