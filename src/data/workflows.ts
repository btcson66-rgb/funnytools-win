import type { Locale } from '../config/site';
import type { SeoPageKind } from './seoContentModels';
import { importedTaskSeoWorkflows } from './taskSeoWorkflows';

export type LocalizedText = Record<Locale, string>;

export interface WorkflowFaq {
  question: LocalizedText;
  answer: LocalizedText;
}

export interface Workflow {
  id: string;
  pageKind: SeoPageKind;
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
  publishAt?: string;
  contentHtml?: LocalizedText;
  noFaqSchema?: boolean;
}

export interface WorkflowView {
  id: string;
  pageKind: SeoPageKind;
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
  publishAt?: string;
  contentHtml?: string;
  noFaqSchema?: boolean;
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
    pageKind: 'workflow',
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
    contentHtml: workflow.contentHtml?.[lang],
    noFaqSchema: workflow.noFaqSchema,
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
      '輸入原始分數：用教師甄試成績轉換模擬器分開記錄筆試、試教、口試、資料審查或其他公告項目，先不要自己心算合計，讓工具的欄位結構逼你把每一項來源分開存放。',
      '套用權重：依簡章把每項權重轉成百分比或小數輸入到對應欄位，輸入完先檢查全部權重加總是否等於 100%，如果簡章本身寫的權重加總就不是 100%，要先確認是否有你漏看的加分或條件項目。',
      '轉換與比較分數：先看加權總分模擬器算出的總分是否符合你手動概算的範圍；如果有歷屆或同一梯次的平均與標準差資料，再用 T 分數計算器或 Z 分數計算器換算相對位置，沒有這組資料時，這一步就無法正確進行，不要用猜測的平均數硬套。',
      '理解 T/Z/PR 三者的差異：Z 分數和 T 分數描述的是「離平均多遠」，PR 百分等級計算器描述的是「贏過多少人」，三者都不是原始分數本身，也不能直接互相加總或平均；混用會讓解讀出現邏輯錯誤。',
      '交叉核對：把工具算出的加權總分、T/Z 分數與 PR 各自用一組簡單數字手算一次（例如只算兩個人的情境），確認換算邏輯與你的理解一致，再套用到正式的一整批分數上。',
      '保存或複製：保留原始分數、輸入的權重、使用的平均數與標準差來源、計算日期與工具版本，方便日後有疑義時能重建整個計算過程，而不是只留下一個最終數字。',
    ],
    recommendedToolIds: ['teacher-exam-score-converter', 't-score-calculator', 'z-score-calculator', 'percentile-rank-calculator', 'weighted-average-calculator'],
    relatedGuideIds: ['teacher-exam-weighted-score-guide', 't-score-calculator-guide', 'z-score-calculator-guide', 'percentile-rank-guide'],
    faq: [
      { question: '這個工具包能預測錄取嗎？', answer: '不能。它只能協助試算與理解分數，正式錄取仍依公告、名額、門檻、同分比序與實際成績資料。' },
      { question: '沒有平均與標準差可以算 T 分數嗎？', answer: '不能正確計算。T/Z 分數需要同一群體的平均與標準差。' },
      { question: 'PR 和名次一樣嗎？', answer: '不完全一樣。PR 是相對百分等級，精確名次仍取決於完整考生資料與同分規則。' },
      { question: '權重可以自己估嗎？', answer: '練習試算可以，但正式解讀應以當年度簡章或公告權重為準。' },
      { question: '加權總分、T 分數與 PR 可以互相加總嗎？', answer: '不行。加權總分是原始分數乘以權重後相加，T 分數與 Z 分數是相對平均的標準化分數，PR 是相對排名的百分位描述，三者的單位與意義不同，把它們加在一起或直接平均沒有統計意義。' },
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
      '先用字數統計檢查正文與摘要是否符合規定字數，再用字元計數器檢查標題或有明確字元上限的欄位（例如系統表單），因為兩種計法不同，只查一種可能誤判合格。',
      '整理標題、段落與英文大小寫時，先用大小寫轉換統一從不同來源複製貼上造成的格式不一致，再人工檢查標點與換行，工具只能處理大小寫規則，不會判斷句意是否通順。',
      '把每一張要放進報告的圖片先壓縮，壓縮後放大檢查圖表座標軸文字、掃描件筆跡與截圖細節是否仍可辨識，確認沒問題再放入文件；原始檔另外保留一份，避免壓縮後想放大版本卻找不到來源。',
      '所有頁面確認無誤後才合併成一份 PDF，需要拆出封面、附錄或簽名頁時再用 PDF 拆分處理，順序是先合併總稿、確認頁序，再依繳交系統的要求拆分或重組，而不是邊合併邊拆分造成頁碼混亂。',
      '如果合併後的檔案超過上傳限制，用 PDF 壓縮縮小檔案，壓縮完務必重新打開下載檔，逐頁檢查頁數是否完整、圖表是否還能辨識，因為壓縮可能讓細小文字或掃描件變模糊。',
      '需要分享報告連結、問卷或展示資料時，把最終網址貼進 QR Code 產生器，產生後換一台裝置或用無痕視窗掃描測試，確認未登入時也能正常開啟目標頁面。',
      '繳交前把字數、格式、圖片、PDF 頁序與 QR Code 這五項結果集中複查一次，任何一項單獨看都沒問題，仍要在同一份最終檔案裡確認彼此沒有互相影響，例如壓縮後圖片是否讓字數統計看到的段落跑位。',
    ],
    recommendedToolIds: ['word-counter', 'character-counter', 'image-compressor', 'merge-pdf', 'split-pdf', 'pdf-compressor', 'qr-code-generator', 'case-converter'],
    relatedGuideIds: [],
    faq: [
      { question: '這個流程適合哪些學生報告？', answer: '適合課堂報告、研究摘要、簡報附件、書面作業與需要上傳 PDF 的作業。正式格式仍以老師或系所規定為準。' },
      { question: '圖片壓縮後要注意什麼？', answer: '請保留原始檔，並放大檢查圖表、文字截圖、掃描件與照片細節是否仍可辨識。' },
      { question: 'PDF 合併後可以直接繳交嗎？', answer: '建議先重新打開下載檔，確認頁面順序、頁數、封面、附錄與簽名頁都正確。' },
      { question: 'QR Code 適合放在報告裡嗎？', answer: '適合放延伸資料、展示連結或問卷，但繳交前要確認掃描後的網址正確且可公開存取。' },
      { question: '字數統計和字元計數器結果為什麼不一樣？', answer: '字數統計算的是斷詞後的字數，字元計數器算的是每一個字元（含標點與空白），中英文混排的報告尤其容易兩者差距明顯；請以繳交規定實際要求的算法為準，不要只看其中一個數字。' },
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
      '先確認文件用途、最終頁面順序，以及交付對象是要一份完整檔案還是需要拆出附件、附錄或簽名頁分開處理，這個判斷決定後面要先合併還是先拆分。',
      '用 PDF 合併把多份來源整理成一份工作稿，需要調整方向時用 PDF 旋轉，需要拆出獨立檔案時用 PDF 拆分；每一步都對照原始檔案數與頁數，操作前先複製一份工作副本，原始檔保持不動。',
      '壓縮圖片或截圖前先確認交付管道的檔案大小限制，壓縮後放大檢查文字、表格框線與簽名筆跡是否仍清楚，尤其是掃描件與手寫簽名，壓縮過度容易讓筆劃糊在一起。',
      '用日期差計算兩個日期間的天數，用工作天計算扣除週末後的實際工作日數；輸入前先寫下是否要排除國定假日與公司特休，因為工具只會排除你手動指定的日期，不會自動套用當年度行事曆。',
      '需要公告連結、內部表單或現場報到掃描時，把最終網址貼進 QR Code 產生器，產生後用另一支手機或訪客帳號掃描測試，確認連結指向正確版本且沒有多餘的存取權限。',
      '遇到系統匯出的 JSON 時，先用 JSON 格式化排版，方便肉眼檢查欄位名稱、巢狀結構與是否有明顯缺漏，格式化只處理排版不會修正資料本身，發現異常要回到來源系統核對，不要直接修改格式化後的文字再回填。',
      '所有文件、日期試算與 JSON 檢查完成後，在正式送出前重新打開最終版本走一遍：頁數、頁序、日期假設、QR Code 與資料欄位是否彼此一致，因為個別步驟分開看都合格，仍可能在合併後出現版本錯置。',
    ],
    recommendedToolIds: ['merge-pdf', 'split-pdf', 'rotate-pdf', 'pdf-compressor', 'image-compressor', 'business-days', 'date-difference', 'qr-code-generator', 'json-formatter'],
    relatedGuideIds: [],
    faq: [
      { question: '可以用這些工具處理公司敏感文件嗎？', answer: '工具以瀏覽器處理為主，但仍應遵守公司資安規範。高度敏感或受管制文件請使用公司核准流程。' },
      { question: '工作天工具會自動知道所有假日嗎？', answer: '不一定。請依所在地與公司規則輸入需要排除的日期，並保留試算假設。' },
      { question: 'PDF 壓縮可能造成什麼問題？', answer: '壓縮可能影響掃描件、圖片或細小文字品質。寄出前請打開檔案抽查重要頁面。' },
      { question: 'JSON 格式化可以修正錯誤資料嗎？', answer: '不能。它只協助排版與閱讀，資料語意、欄位型別與來源正確性仍需人工確認。' },
      { question: '應該先合併 PDF 還是先拆分？', answer: '通常先合併成一份完整工作稿，確認整體頁序無誤後，再依繳交或歸檔需求拆出附件、封面或簽名頁；先拆分再個別調整，之後合併時很容易搞錯頁面順序。' },
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
      '先用字元計數器檢查標題、貼文、簡介或廣告文字的字元數，再用字數統計看整段內容的字數；兩個數字分開看，因為不同平台的限制有的是計字元、有的是計字，混用會誤判是否超過上限。',
      '確認長度沒問題後，用大小寫轉換統一標題與內文格式，例如把不同來源複製貼上造成的全大寫、隨機大小寫改成同一種風格，讓跨平台重複發布時看起來一致。',
      '壓縮圖片或調整尺寸前，先確認目的平台需要的長寬比與檔案大小上限；壓縮完務必放大檢查文字截圖、商品細節與人臉是否還清楚，而不是只看縮圖預覽。',
      '需要導流活動、作品集或報名表時，把最終網址貼進 QR Code 產生器；產生後用另一支手機掃描測試，同時把可讀的短網址放在旁邊，避免鏡頭壞掉的人無法進入。',
      '需要輔助色或延伸色票時使用顏色產生器，記下色碼後貼到設計稿或貼文備註，方便下次沿用同一組視覺，而不是每次都重新試色。',
      '主題太多難以選擇時，把候選主題貼進隨機輪盤做初步排序，這個結果只是起點，仍要依近期已發過的內容、時事與受眾反應做最後調整。',
      '發布前把字數、圖片、QR Code 與色碼結果放在同一份草稿裡再看一次整體版面，因為單獨檢查每一項時容易漏看排版擠壓或圖文順序錯置的問題。',
    ],
    recommendedToolIds: ['character-counter', 'word-counter', 'image-compressor', 'image-resizer', 'qr-code-generator', 'case-converter', 'color-generator', 'random-wheel'],
    relatedGuideIds: [],
    faq: [
      { question: '這個流程會保證社群成效嗎？', answer: '不會。它只協助整理格式、素材與發布前檢查，實際觸及與互動仍受內容、平台與受眾影響。' },
      { question: '字元統計適合哪些內容？', answer: '適合社群貼文、短影音描述、廣告文案、推播、簡訊、Meta description 與個人簡介。' },
      { question: '圖片壓縮後要怎麼檢查？', answer: '建議在目標平台或手機上預覽，確認人臉、商品、截圖文字與品牌元素仍清楚。' },
      { question: '隨機輪盤適合決定什麼？', answer: '適合主題排序、抽活動項目、決定低風險內容實驗；重要商業決策仍應用資料判斷。' },
      { question: '字元計數器和字數統計要用哪一個？', answer: '看目的平台的規則而定：如果平台限制寫的是字元數（含空白與標點），用字元計數器；如果只在意整段文字大概多長，用字數統計即可，兩者算法不同，不能互相取代。' },
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
      '先確認這是低風險選擇：金額、健康、法律或工作相關的決定不適用這個流程，只用於餐廳、活動順序、遊戲項目或小任務等就算選錯也能立刻換一個的情境。',
      '如果是吃飯，先用吃什麼工具產生 3～5 個候選，再手動刪除距離太遠、已經吃過或有人不能吃的選項，讓最後名單只剩下大家都能接受的選擇。',
      '候選超過兩個時用隨機輪盤，把篩選過的名單貼進去轉一次；只剩兩個選項時改用二選一工具，避免多此一舉的設定步驟。',
      '需要抽人、抽發表順序或分配角色時，用抽名字工具貼上目前在場名單，抽完立即截圖或記錄，因為重新整理頁面可能會清空已輸入的名單。',
      '遊戲或活動需要機率結果時使用骰子，並在骰之前先講清楚規則（例如點數對應的結果），避免骰完才臨時改規則造成爭議。',
      '討論或活動有時間限制時用倒數計時，設定時間後盡量不中途暫停，讓計時器的收斂效果發揮作用。',
      '如果有人對隨機結果不服氣，先確認候選名單本來就是大家都同意才放進去的，而不是重新抽一次；重抽只在候選名單本身有誤（例如漏列一個人）時才使用，避免規則失去公信力。',
    ],
    recommendedToolIds: ['what-to-eat', 'random-wheel', 'this-or-that', 'random-name-picker', 'dice-roller', 'countdown-timer'],
    relatedGuideIds: [],
    faq: [
      { question: '這個工具組適合正式決策嗎？', answer: '不適合。它適合聚會、家庭、活動與低風險選擇；重要財務、醫療、法律或工作決策需要資料與專業判斷。' },
      { question: '多人一起使用時要注意什麼？', answer: '先確認候選選項大家都能接受，再進行抽選，避免把不適合或不可行的選項放進去。' },
      { question: '可以避免重複抽到同一個人嗎？', answer: '抽名字工具可依頁面功能協助管理名單，但重新整理或更換名單可能重置狀態，使用前請確認規則。' },
      { question: '倒數計時適合用在哪裡？', answer: '適合限時討論、遊戲回合、活動排程與決定截止時間，但重要提醒仍建議搭配系統鬧鐘。' },
      { question: '名單很長時要怎麼避免同一個人一直被抽到？', answer: '抽名字工具的結果只反映當下貼上的名單，不會記住歷史紀錄；如果想避免短期內重複被抽到，需要自己在下一輪前手動移除剛抽到的名字，工具本身不會累計次數。' },
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
      'Enter raw scores in the teacher exam score converter, keeping written, demo teaching, interview, portfolio, and other components in separate fields rather than adding them up in your head first, so each source stays traceable.',
      'Apply weights by converting each official percentage or decimal into the matching field, then check that the total equals 100% before trusting any output; if the notice itself does not add to 100%, look for a bonus or conditional item you may have missed.',
      'Convert and compare scores: check the weighted total against a rough hand calculation first, then use the T score or Z score calculator only when you have a mean and standard deviation from the same cohort or a prior year; without that reference data, this step cannot be done correctly, so do not substitute a guessed average.',
      'Understand what T, Z, and PR actually describe: Z and T scores measure distance from the mean, while the percentile rank calculator measures how many people you outscore; none of the three is a raw score, and they cannot be summed or averaged with each other.',
      'Cross-check the logic with a tiny example, such as just two candidates, calculated by hand for weighted total, T or Z, and PR, and confirm it matches the tool output before applying the same method to a full batch of real scores.',
      'Save or copy the raw scores, the weights you entered, the source of the mean and standard deviation, the calculation date, and which tool version you used, so the full calculation can be reconstructed later if a candidate disputes the result.',
    ],
    faq: [
      { question: 'Can this toolkit predict admission?', answer: 'No. It only helps with estimates and explanation. Official outcomes depend on published rules and actual score data.' },
      { question: 'Can I calculate T score without mean and SD?', answer: 'No. T and Z scores require a mean and standard deviation from the same reference group.' },
      { question: 'Is PR the same as exact rank?', answer: 'Not exactly. PR is a relative percentile position; exact rank depends on the full candidate list and tie rules.' },
      { question: 'Can I estimate weights myself?', answer: 'For practice, yes. For serious interpretation, use the current official notice.' },
      { question: 'Can I add the weighted total, T score, and PR together?', answer: 'No. The weighted total is raw scores multiplied by weights and summed, T and Z scores are standardized distances from a mean, and PR is a relative percentile position; they use different units and meanings, so summing or averaging them has no statistical meaning.' },
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
      'Check the body and abstract against the required length with the word counter, then check any field with a hard character limit, such as a submission-form title, with the character counter, since the two counts use different rules and checking only one can give a false pass.',
      'Clean up headings, copied text, and English casing with case converter first to fix formatting left over from pasting between sources, then review punctuation and line breaks by eye, since the tool only handles capitalization, not whether a sentence reads well.',
      'Compress each image that will go into the report, then zoom in to check chart axis labels, scanned handwriting, and screenshot detail before placing it in the document; keep the original file separately so a sharper version is still available if the compressed one is not enough.',
      'Merge every confirmed page into one PDF first, then split out a cover, appendix, or signature page afterward if the submission system requires it, so the working order is merge, verify, then split, rather than splitting midway and losing track of page numbers.',
      'If the merged file exceeds an upload limit, compress the PDF and reopen the download to check every page: confirm the page count is unchanged and that charts and small text are still legible, since compression can blur fine detail.',
      'When sharing supporting links, a survey, or presentation material, paste the final URL into the QR code generator, then scan it from another device or a private browser window to confirm it opens correctly while signed out.',
      'Before submitting, review the word count, formatting, images, PDF page order, and QR code together in the final file rather than separately, since a change in one, such as an image placement, can shift the layout the other checks already passed.',
    ],
    faq: [
      { question: 'What reports does this workflow fit?', answer: 'It fits class reports, written homework, presentation attachments, research summaries, and PDF submissions. Formal requirements still come from your teacher or department.' },
      { question: 'What should I check after image compression?', answer: 'Keep the original file and zoom in to inspect charts, scanned text, screenshots, and photo details.' },
      { question: 'Can I submit a merged PDF immediately?', answer: 'Open the downloaded file first and confirm page order, page count, cover pages, appendices, and signature pages.' },
      { question: 'When should I use a QR code in a report?', answer: 'Use it for supporting material, presentation links, or forms, then confirm that the scanned URL is correct and accessible.' },
      { question: 'Why do the word counter and character counter give different numbers?', answer: 'The word counter reports tokenized word counts, while the character counter reports every character including spaces and punctuation, and the gap can be large in reports that mix languages; follow whichever rule your submission actually specifies instead of assuming one number represents the other.' },
    ],
  },
  'office-document-toolkit': {
    title: 'Office Document Toolkit',
    metaTitle: 'Office Document Toolkit: PDFs, Image Compression, Dates, Workdays, and JSON',
    metaDescription: 'An office workflow for PDF merge, split, and compression, image compression, business-day estimates, date differences, QR codes, and JSON formatting.',
    h1: 'Office Document Toolkit: PDFs, Images, Dates, and Data Formatting',
    purpose: 'This workflow helps office workers handle everyday document tasks: organize PDFs, compress files, estimate dates and business days, create QR codes, and inspect JSON data.',
    steps: [
      'Confirm the document purpose, the final page order, and whether the recipient needs one complete file or separate attachments, a cover, and a signature page, since that decision determines whether you merge first or split first.',
      'Use PDF merge to combine multiple sources into one working draft, rotate pages that face the wrong way, and split out separate files when needed; check the page count against the originals at every step, and work from a copy while keeping the source untouched.',
      'Before compressing an image or screenshot, confirm the file-size limit for the delivery channel, then zoom in after compressing to check text, table borders, and signature strokes, since scans and handwritten signatures blur first under heavy compression.',
      'Use date difference for the number of days between two dates and business-days for the count after excluding weekends; decide up front whether to also exclude public holidays and company leave, since the tool only skips the dates you enter manually and does not apply a regional calendar automatically.',
      'For announcements, internal forms, or on-site check-in, paste the final URL into the QR code generator, then scan the result with another phone or a guest account to confirm it points to the correct version with no unintended access.',
      'When a system exports JSON, run it through the JSON formatter first so field names, nesting, and obvious gaps are easier to read by eye; formatting only changes layout, not the data itself, so verify anything unusual against the source system rather than editing the formatted text directly.',
      'Before sending the final version, reopen it and check documents, date assumptions, and JSON fields together, since each step can pass individually while the merged result still contains a mismatched version or an outdated page.',
    ],
    faq: [
      { question: 'Can I use these tools for confidential company documents?', answer: 'They are browser-oriented, but you still need to follow company security rules. Use approved workflows for highly sensitive or regulated files.' },
      { question: 'Does the business-day tool know every holiday?', answer: 'Not necessarily. Enter excluded dates based on your region and company rules, and keep your assumptions.' },
      { question: 'What can PDF compression affect?', answer: 'Compression can affect scans, images, and small text. Open the file and spot-check important pages before sending it.' },
      { question: 'Can JSON formatting fix bad data?', answer: 'No. It improves layout and readability; data meaning, types, and source accuracy still need review.' },
      { question: 'Should I merge or split a PDF first?', answer: 'Merge into one complete working draft first and confirm the overall page order, then split out attachments, a cover, or a signature page as the submission requires; splitting first and merging afterward makes page order mistakes much easier to introduce.' },
    ],
  },
  'creator-social-toolkit': {
    title: 'Creator & Social Media Toolkit',
    metaTitle: 'Creator & Social Media Toolkit: Characters, Images, QR Codes, Color, and Wheels',
    metaDescription: 'A creator workflow for character counts, word counts, image compression and resizing, QR codes, case conversion, color generation, and random wheels.',
    h1: 'Creator & Social Media Toolkit: Posts, Images, QR Codes, and Idea Picks',
    purpose: 'This workflow helps creators prepare posts faster by checking text length, image assets, campaign links, color ideas, and low-risk content choices before publishing.',
    steps: [
      'Check the character count of titles, posts, bios, or ad copy with the character counter, then check overall length with the word counter separately, since some platform limits count characters and others count words, and mixing the two produces a wrong pass or fail.',
      'Once length is confirmed, run the text through case converter to fix inconsistent capitalization left over from copy-pasting between sources, so the same post reads consistently when it is reused across platforms.',
      'Before compressing or resizing an image, confirm the target aspect ratio and file-size limit for that platform; after compressing, zoom in to check screenshot text, product detail, and faces instead of judging quality from a small thumbnail.',
      'For campaign links, portfolios, or sign-up forms, paste the final URL into the QR code generator, then scan the result with a second phone and place a readable short link next to it for anyone whose camera fails.',
      'Use the color generator for supporting or accent colors, then record the codes in your design notes so the same palette can be reused next time instead of re-picking colors from scratch.',
      'When several topics are equally acceptable, paste the candidates into a random wheel for a first ordering; treat that result as a starting point and adjust it against what you posted recently, current events, and audience reaction.',
      'Before publishing, review the final word count, image, QR code, and color choices together in one draft, because checking each item separately makes it easy to miss layout crowding or a mismatched image-text order.',
    ],
    faq: [
      { question: 'Will this workflow guarantee social performance?', answer: 'No. It helps with formatting, assets, and checks; reach and engagement still depend on content, platform, and audience.' },
      { question: 'What content should I count characters for?', answer: 'Social posts, short video descriptions, ad copy, push messages, SMS drafts, meta descriptions, and profile bios.' },
      { question: 'How should I check compressed images?', answer: 'Preview them on the target platform or a phone, especially faces, products, screenshot text, and brand elements.' },
      { question: 'What should a random wheel decide?', answer: 'It works for topic ordering, small giveaways, or low-risk content experiments; important business choices need data.' },
      { question: 'Should I use the character counter or the word counter?', answer: 'It depends on the platform rule: use the character counter when the stated limit counts characters, including spaces and punctuation, and use the word counter when you only need a rough sense of overall length; the two counts are not interchangeable.' },
    ],
  },
  'daily-decision-toolkit': {
    title: 'Daily Decision Toolkit',
    metaTitle: 'Daily Decision Toolkit: Food Picker, Wheel, This or That, Names, Dice, and Timers',
    metaDescription: 'A daily decision workflow for choosing food, spinning a wheel, this-or-that choices, random names, dice rolls, and countdown timers.',
    h1: 'Daily Decision Toolkit: Food, Draws, Wheels, Dice, and Timers',
    purpose: 'This workflow helps with low-risk everyday choices such as where to eat, activity order, small draws, dice games, and timed group decisions.',
    steps: [
      'Confirm this is a low-risk choice first: skip this workflow for anything involving money, health, legal matters, or work commitments, and use it only for restaurants, activity order, game rules, or small tasks where a wrong pick can simply be redone.',
      'For meals, generate three to five candidates with the food picker, then manually remove anything too far away, already eaten recently, or off-limits for someone in the group, so the final list only contains options everyone actually accepts.',
      'Use the random wheel when more than two candidates remain, pasting in the filtered list, or switch to this-or-that when exactly two options are left, which skips an unnecessary setup step.',
      'When you need to pick a person, a speaking order, or a role, paste the current attendee list into the name picker and record or screenshot the result immediately, because refreshing the page can clear whatever was typed in.',
      'Use dice when the activity needs a chance mechanic, and state the rule for what each result means before rolling, not after, to avoid disputes about a rule invented on the spot.',
      'Use the countdown timer for time-limited discussion or activities, and avoid pausing it partway through so the deadline still does its job of forcing a decision.',
      'If someone disputes a random result, check first whether the candidate list itself was wrong, such as a missing person, and only re-run the pick in that case; re-rolling just because someone dislikes the outcome removes the point of using a transparent method.',
    ],
    faq: [
      { question: 'Is this toolkit for serious decisions?', answer: 'No. It is for gatherings, family choices, activities, and low-risk decisions. Important financial, medical, legal, or work decisions need evidence and judgment.' },
      { question: 'What should groups agree on first?', answer: 'Confirm that all candidate options are acceptable and realistic before running a random choice.' },
      { question: 'Can name picking avoid repeats?', answer: 'Use the page controls available for the current list, but refreshes or list changes may reset state, so agree on rules first.' },
      { question: 'Where does countdown timing help?', answer: 'Timed discussion, game rounds, activity planning, and decision deadlines. Use a system alarm for critical reminders.' },
      { question: 'How do I avoid picking the same person repeatedly in a long session?', answer: 'The name picker only reflects the list you paste in and keeps no history of past draws; to avoid short-term repeats, manually remove the most recent pick before the next round, since the tool itself does not track how many times each name has been drawn.' },
    ],
  },
};

const WORKFLOW_CONTENT_FREEZE_DATE = '2026-08-01';
const releasedTaskWorkflowSlugs = new Set([
  'qr-barcode-publishing-toolkit',
  'grade-gpa-check-toolkit',
  'verify-tool-result',
  'text-cleanup-publishing-toolkit',
]);
export const workflows: Workflow[] = [...rawWorkflows.map(localizeRawWorkflow), ...importedTaskSeoWorkflows]
  .filter((workflow) => !workflow.publishAt || workflow.publishAt <= WORKFLOW_CONTENT_FREEZE_DATE || releasedTaskWorkflowSlugs.has(workflow.slug));

export function getWorkflow(slug: string): Workflow | undefined {
  return workflows.find((workflow) => workflow.slug === slug);
}

export function getWorkflowsForTool(toolSlug: string, lang: Locale): WorkflowView[] {
  return workflows
    .filter((workflow) => isWorkflowAvailableInLocale(workflow, lang) && workflow.recommendedToolIds.includes(toolSlug))
    .map((workflow) => viewWorkflow(workflow, lang));
}
