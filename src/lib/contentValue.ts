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

export function buildToolValueReview(
  lang: Locale,
  toolName: string,
  category: Category,
  content: ToolContent,
): ContentValueReview {
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
