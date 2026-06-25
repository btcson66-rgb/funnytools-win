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

function text(zh: string, en?: string): LocalizedText {
  return { zh, en: en ?? zh };
}

function localizeRawWorkflow(workflow: RawWorkflow): Workflow {
  const en = englishWorkflowContent[workflow.slug];

  return {
    ...workflow,
    locales: ['zh', 'en'],
    title: text(workflow.title, en.title),
    metaTitle: text(workflow.metaTitle, en.metaTitle),
    metaDescription: text(workflow.metaDescription, en.metaDescription),
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
