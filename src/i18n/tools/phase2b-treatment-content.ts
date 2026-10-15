import type { ToolPageSection, ToolContent } from './_types';

export interface Phase2BTreatmentContent {
  contentSections: ToolPageSection[];
  examples?: string[];
  notes?: string[];
}

const zh = (contentSections: ToolPageSection[], examples: string[], notes: string[]): Phase2BTreatmentContent => ({ contentSections, examples, notes });
const en = (contentSections: ToolPageSection[], examples: string[], notes: string[]): Phase2BTreatmentContent => ({ contentSections, examples, notes });

export const phase2bToolContent: Record<'zh' | 'en', Record<string, Phase2BTreatmentContent>> = {
  zh: {
    'bar-chart-maker': zh([
      { heading: '長條圖的資料先怎麼整理', paragraphs: ['每一列代表一個類別，每個類別只放一個要比較的數值。例如要比較四季訂單，可輸入「第一季、120」「第二季、185」「第三季、160」「第四季、210」，再檢查標籤順序是否符合報告的閱讀順序。', '數值應使用可比較的同一單位；不要把「件數」和「收入」放在同一張圖。若資料包含負數，先確認圖表的零線與標籤仍能讓讀者辨識方向。'] },
      { heading: '輸出圖表如何判讀與檢查', paragraphs: ['產生後先看最高與最低柱是否對應原始輸入，再檢查刻度是否讓差距被誇大。匯出的 PNG 適合放進簡報或講義，但圖片不會保留可重新計算的原始資料。', '如果只是想比較數值，請保留輸入表；若要交付正式報告，另行標示資料期間、單位與來源。這個瀏覽器工具負責繪圖與匯出，不會替你判斷因果或統計顯著性。'] },
    ], ['用四季訂單數繪製一張年度比較圖。', '把四個班級的平均分數做成教學用長條圖。'], ['標籤相同時讀者可能無法分辨類別，匯出前請逐項檢查。', 'PNG 是視覺輸出，不是可供試算表繼續編輯的資料檔。']),
    base64: zh([
      { heading: 'Base64 輸入與用途判斷', paragraphs: ['若要測試文字，可輸入 `Hello, FunnyTools!`；若要處理檔案，選擇檔案後讓工具產生對應的 data URL。文字 Base64 適合在需要 ASCII 字串傳遞時使用，並不等於壓縮或加密。', '檔案轉成 Base64 後會膨脹，常見估算約比原始位元組多三分之一。把它放入 JSON、HTML 或 API 前，先確認接收端需要的是完整 data URL，還是只需要逗號後的編碼內容。'] },
      { heading: '解碼結果與安全邊界', paragraphs: ['解碼時先確認來源標示的媒體類型，例如 `data:text/plain;base64,...` 與 `data:image/png;base64,...` 的用途不同。輸出若是文字，請比對換行與 Unicode 字元；若是檔案，請下載後再用對應程式開啟。', 'Base64 沒有提供機密性或完整性驗證。不要把密碼、存取權杖或私人檔案貼到公共電腦；即使計算在本機完成，剪貼簿、瀏覽器歷史與裝置權限仍可能暴露內容。'] },
    ], ['把 `Hello` 編碼後再解碼，確認結果回到原字串。', '檢查一個 PNG data URL 的媒體類型與檔案輸出。'], ['Base64 字串變長是正常現象，不能拿它當壓縮率。', '錯誤的 padding 或被截斷的字串會造成解碼失敗。']),
    'cronbach-alpha-calculator': zh([
      { heading: '先準備可重現的量表矩陣', paragraphs: ['每一列放一位受試者，每一欄放同一量表的一個題目。例如五位受試者回答四題，就應有 5 × 4 個數值；先移除姓名與欄名，並在計算前完成反向題的正確重編碼。', '若使用 1 到 5 分量尺，先確認所有題目的方向一致。缺值、不同欄數或混入文字會讓資料不適合直接計算；請保留原始檔，另存一份匿名化的分析副本。'] },
      { heading: 'α 的輸出代表什麼', paragraphs: ['工具會顯示受試者數 N、題目數 k、總分平均、總分標準差與 α。這些欄位可用來核對輸入是否完整；例如 N 意外少一位，應先查資料格式，不要直接把結果寫入報告。', 'α 反映題目在這份樣本中的內部一致性，不證明單一構面、效度或跨時間穩定性。題目很多或內容重複可能推高 α；正式研究仍需說明缺值處理、量表版本與其他信度或效度證據。'] },
    ], ['用五位受試者、四個已完成反向計分的題目做算術核對。', '把工具輸出的 N、k 與 α 和統計軟體摘要逐項比對。'], ['總分沒有變異時 α 無法提供有意義的估計。', '不要把 .70 當成所有量表與用途都適用的通用門檻。']),
    'seating-chart': zh([
      { heading: '製作座位表前準備名單', paragraphs: ['先把每位學生放在獨立一行，移除學號、電話等不需要的識別資訊。例如 24 位學生要排成 4 列 6 欄，就先確認人數與座位數一致，再選擇是否打散順序。', '若有不能相鄰、無障礙位置或分組要求，先在紙上標記限制；這個工具能產生座位排列，但不會理解學生關係、視力需求或教師的班級管理規則。'] },
      { heading: '結果如何核對與使用', paragraphs: ['產生後逐格確認每個名字只出現一次，並檢查列數、欄數與教室前方方向。需要重排時可重新產生，但請把採用的版本另存或列印，避免重新整理頁面後失去正在使用的安排。', '隨機排列只能提供一個起始方案，不代表公平或最佳方案。對有特殊需求的班級，人工套用已知限制並再次核對人數，比直接接受第一次結果更安全。'] },
    ], ['用 24 人班級產生 4 × 6 的初版座位表。', '把隨機結果作為小組活動前的分組起點，再套用教室限制。'], ['姓名屬於個人資料，示範時可改用代號。', '重新產生結果會改變排列，正式使用前要固定並保存版本。']),
    'countdown-timer': zh([
      { heading: '倒數時間與任務要對得上', paragraphs: ['設定時間前先決定任務的結束條件。例如 25 分鐘專注工作可設定 00:25:00，並把標籤寫成「整理研究筆記」；標籤能幫助你在多個分頁或螢幕旁辨認目前倒數用途。', '短倒數適合可明確結束的活動，長倒數則要先確認裝置不會進入省電或瀏覽器分頁被暫停。若任務需要中途休息，請把工作與休息拆成兩次倒數，而不是把提醒責任交給單一長計時器。'] },
      { heading: '到點後的行為與限制', paragraphs: ['開始後請確認畫面上的剩餘時間正在減少，暫停或重設前先記錄目前進度。倒數結束時的提示是本頁互動的一部分，不能取代手機、作業系統或日曆的背景通知。', '若你關閉分頁、切換到受限制的背景環境，或裝置睡眠，實際提醒可能不符合預期。需要長時間或關鍵提醒時，請使用專門的鬧鐘並把本工具當作可見的工作計時器。'] },
    ], ['用 25 分鐘倒數完成一段不被打斷的筆記整理。', '把 5 分鐘休息另設為一個倒數，而不是修改已開始的工作計時。'], ['計時器不會替你保存任務內容或在關閉頁面後恢復狀態。', '完成時間的準確性會受裝置與瀏覽器背景節流影響。']),
  },
  en: {
    'cad-2d': en([
      { heading: 'Set up a 2D drawing that can be checked', paragraphs: ['Start with a small coordinate plan: for example, draw a 120 by 80 rectangle, add a 30-unit circle near its center, and keep the origin and units visible in your notes. A simple first shape makes it easier to spot a mistaken scale or an accidental drag.','Use the same unit for every coordinate and dimension. The board is useful for quick layouts, teaching geometry, and exporting a visual draft; it is not a substitute for a surveyed coordinate system or a full CAD project with layers, constraints, and revision history.'] },
      { heading: 'Read the drawing and export safely', paragraphs: ['Before exporting, inspect the object list or canvas visually and verify that the intended lines, circles, and labels are present. A PNG is convenient for a slide, while an SVG keeps vector geometry for many downstream uses; choose the format according to the recipient.','An exported image does not prove that dimensions are to scale unless the receiving workflow preserves the drawing units. Keep the coordinate notes alongside the export, and recheck any measurement used for fabrication, compliance, or a client handoff in the required CAD system.'] },
    ], ['Draft a 120 × 80 rectangle for a worksheet diagram.', 'Draw a simple room outline before moving the final dimensions into CAD software.'], ['A visual export is not a manufacturing or survey record.', 'Keep a copy of the coordinate plan because an image alone is hard to edit.']),
    'class-rank-percentile-calculator': en([
      { heading: 'Enter rank data with a defined cohort', paragraphs: ['Enter the student rank and the total number of students from the same ordered list. For example, rank 7 in a cohort of 30 is a different input from rank 7 in a cohort of 300; record the cohort definition before calculating.','Decide how ties were handled in the source list. If the ranking includes absent students, exclusions, or a special examination group, use the same denominator that the official list uses rather than silently replacing it with the visible class size.'] },
      { heading: 'Interpret the percentile without overclaiming', paragraphs: ['The result expresses a relative position within the supplied cohort. It is useful for checking a spreadsheet or explaining an approximate standing, but it does not convert a rank into a grade, admission probability, or measure of learning.','Different percentile conventions can assign different values to the same rank, especially at the top, bottom, or around ties. Compare the formula and tie rule with the school or testing body before publishing the number, and keep the original rank list for auditability.'] },
    ], ['Check a rank of 7 among 30 students against a hand calculation.', 'Compare the displayed percentile with a spreadsheet using the same tie convention.'], ['A percentile is relative to the named cohort and date.', 'Do not use the output as an official transcript or admissions decision by itself.']),
    'compound-interest': en([
      { heading: 'Define the compounding inputs', paragraphs: ['For a reproducible example, enter a principal of 1000, an annual rate of 5%, annual compounding, and a term of 3 years. Write down whether the rate is nominal, whether deposits are added, and whether the term is measured in complete years.','The compounding frequency changes the result: monthly and annual compounding are not interchangeable. Use the same currency and rate period throughout, and do not enter a percentage as 0.05 if the field expects 5.'] },
      { heading: 'Read the balance and its limits', paragraphs: ['Compare the displayed final balance with the starting principal and the interest portion. If regular deposits or withdrawals are part of the real plan, a one-time-principal calculation is only a baseline and should not be presented as the complete forecast.','The result is arithmetic, not a promise of return. Taxes, fees, changing rates, inflation, contribution timing, and early withdrawals can materially alter the outcome; verify those assumptions with the relevant account or official terms before making a financial decision.'] },
    ], ['Check 1000 at 5% for 3 years with annual compounding.', 'Run the same principal with monthly compounding to see why frequency must be reported.'], ['The calculator does not model taxes, fees, inflation, or uncertain future rates.', 'Keep the rate period and currency next to any copied result.']),
    'cronbach-alpha-calculator': en([
      { heading: 'Prepare an analyzable response matrix', paragraphs: ['Put one respondent on each row and one item on each column. A five-person, four-item practice matrix should contain exactly 20 numeric cells after names and headers are removed; reverse-score keyed items before pasting.','Check that all columns belong to the same intended scale and use a consistent direction. Missing cells, irregular row lengths, and text such as NA are not silently repaired because each choice changes N, item variances, and the total-score variance.'] },
      { heading: 'Use alpha as one piece of evidence', paragraphs: ['The output reports N, k, the mean and standard deviation of total scores, and alpha. These values make a useful input check: an unexpected N or a zero total-score standard deviation is a reason to stop and inspect the matrix.','Alpha describes internal consistency for this sample and scale version. It does not establish unidimensionality, validity, measurement invariance, or test-retest stability; report the scoring rule, missing-data handling, sample, and complementary evidence when the result matters.'] },
    ], ['Verify a five-by-four practice matrix before using a statistical package.', 'Compare N, k, and alpha with a second implementation using the same reverse-scoring rule.'], ['A high alpha can reflect many redundant items.', 'Do not treat a universal .70 cutoff as a complete reliability decision.']),
    'percentage-calculator': en([
      { heading: 'Choose the percentage question first', paragraphs: ['For 18% of 250, use the part-of-quantity calculation and expect 45. For 36 out of 144, use the share-of-total calculation and expect 25%. These are different questions even though both contain two numbers.','For a change from 80 to 100, use the relative-change calculation and expect a 25% increase. Write the base, unit, and time period beside the values; a correct formula cannot fix a mismatched numerator and denominator.'] },
      { heading: 'Separate relative change from percentage points', paragraphs: ['A rate moving from 20% to 25% changes by 5 percentage points, while its relative increase is 25%. Use the output that matches the question and state the base so readers do not confuse the two descriptions.','A zero total or zero starting value makes the relevant division undefined. Discounts, tax, margin, and successive changes may use different bases, so calculate each step with its stated base and apply the required rounding rule at the correct stage.'] },
    ], ['Calculate 18% of 250 and label the result as a part, not a final price.', 'Compare a change from 80 to 100 with a change from 100 to 80 to see the base effect.'], ['The tool does not decide whether a business or legal rounding rule applies.', 'A percentage above 100% can be valid; interpret it using the underlying quantity.']),
  },
};

export function mergePhase2BContent(base: ToolContent, addition?: Phase2BTreatmentContent): ToolContent {
  if (!addition) return base;
  return {
    ...base,
    contentSections: [...(base.contentSections ?? []), ...addition.contentSections],
    examples: [...base.examples, ...(addition.examples ?? [])],
    notes: [...(base.notes ?? []), ...(addition.notes ?? [])],
  };
}
