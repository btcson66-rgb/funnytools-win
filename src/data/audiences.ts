import type { Locale } from '../config/site';

export type LocalizedText = Record<Locale, string>;

export interface AudienceFaq {
  question: LocalizedText;
  answer: LocalizedText;
}

export interface Audience {
  id: string;
  slug: string;
  locales: Locale[];
  title: LocalizedText;
  metaTitle: LocalizedText;
  metaDescription: LocalizedText;
  h1: LocalizedText;
  intro: LocalizedText;
  painPoints: LocalizedText[];
  recommendedToolIds: string[];
  workflowSuggestions: LocalizedText[];
  relatedCategoryIds: string[];
  relatedWorkflowIds: string[];
  faq: AudienceFaq[];
}

export interface AudienceView {
  id: string;
  slug: string;
  locales: Locale[];
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  painPoints: string[];
  recommendedToolIds: string[];
  workflowSuggestions: string[];
  relatedCategoryIds: string[];
  relatedWorkflowIds: string[];
  faq: { question: string; answer: string }[];
}

function text(zh: string, en: string): LocalizedText {
  return { zh, en };
}

export const audiences: Audience[] = [
  {
    id: 'teachers',
    slug: 'teachers',
    locales: ['zh', 'en'],
    title: text('教師工具', 'Teacher Tools'),
    metaTitle: text('教師常用工具：抽籤、分組、座位表、計時與成績計算', 'Free Tools for Teachers: Picks, Groups, Timers'),
    metaDescription: text('整理教師上課常用的免費工具，包含隨機抽學生、分組、座位表、倒數計時、QR Code 與成績計算，適合課堂活動、討論與評量前快速使用，免安裝、免註冊，打開瀏覽器即可操作。', 'A practical teacher toolkit for random student picks, group generators, seating charts, timers, QR codes, word counts, and grade calculations.'),
    h1: text('教師常用工具：把課堂抽籤、分組、計時與成績整理在一起', 'Teacher Tools for Classroom Picking, Grouping, Timing, and Grades'),
    intro: text(
      '教師在課堂中常要快速處理名單、抽籤、分組、計時、座位安排與成績檢查。如果每次都重新找工具，活動節奏很容易被打斷。這一頁把適合課堂現場使用的 FreeTools 工具集中整理，讓你可以先貼上學生名單，再依照情境選擇抽學生、分組、座位表、倒數計時、QR Code 或成績平均。工具主要在瀏覽器中操作，適合投影、備課、活動分配與課後整理。',
      'Teachers often need to handle names, random picks, groups, seating, timers, handout links, and score checks without interrupting the class. This page groups the FreeTools utilities that fit those classroom moments: paste a student list, pick a speaker, create groups, arrange seats, run a countdown, make a QR code, or check grade averages. Use it for lessons, presentations, reviews, and activity planning.'
    ),
    painPoints: [
      text('上課時需要公平抽人或抽組，不能花太多時間設定。', 'Pick students or groups fairly without slowing down the lesson.'),
      text('小組討論、報告順序與座位調整常需要快速產生結果。', 'Generate groups, presentation order, and seating support quickly.'),
      text('成績、字數與繳交連結需要可檢查、可複製的輔助工具。', 'Check scores, word counts, and share links with copyable browser tools.'),
    ],
    recommendedToolIds: ['random-student-picker', 'random-group-generator', 'group-generator', 'seating-chart', 'countdown-timer', 'qr-code-generator', 'word-counter', 'grade-average', 'weighted-average-calculator', 'random-wheel'],
    workflowSuggestions: [
      text('先整理今天實際出席的學生名單，移除不需要參與活動的名字。', 'Start with the students who are actually participating today.'),
      text('用隨機分組或抽籤工具產生活動安排，再由教師做最後調整。', 'Use grouping or picker tools for the first result, then apply teacher judgment.'),
      text('用倒數計時控制討論與發表時間，最後複製結果到投影片或班級平台。', 'Run a countdown for discussion or presentation time, then copy results to slides or the class platform.'),
    ],
    relatedCategoryIds: ['study', 'random', 'time', 'statistics'],
    relatedWorkflowIds: ['teacher-classroom-random-toolkit', 'teacher-exam-score-toolkit'],
    faq: [
      { question: text('這些工具會儲存學生名單嗎？', 'Do these tools store student lists?'), answer: text('多數工具在目前瀏覽器頁面中處理輸入。仍建議只貼活動需要的姓名，不要貼學生證號、電話或敏感資料。', 'Most tools process input in the current browser page. Still, paste only the names needed for the activity, not student IDs, phone numbers, or sensitive records.') },
      { question: text('隨機分組結果可以直接使用嗎？', 'Can I use random groups as-is?'), answer: text('可以作為初稿，但教師仍應檢查缺席、特殊需求、組內互動與活動安全。', 'Use them as a first draft, then check absences, support needs, group dynamics, and safety.') },
      { question: text('適合投影到教室大螢幕嗎？', 'Are these suitable for classroom projection?'), answer: text('可以。建議先確認名單內容是否適合公開顯示，並在投影前測試字體大小與瀏覽器縮放。', 'Yes. Review whether the list is appropriate to show publicly, and test browser zoom before class.') },
      { question: text('成績工具能取代學校系統嗎？', 'Can grade tools replace the school system?'), answer: text('不能。它們適合試算與檢查，正式成績仍應以學校規則與官方系統為準。', 'No. They are for estimates and checks; official grades should follow school rules and the official system.') },
    ],
  },
  {
    id: 'students',
    slug: 'students',
    locales: ['zh', 'en'],
    title: text('學生報告工具', 'Student Report Tools'),
    metaTitle: text('學生報告工具：字數、PDF、圖片壓縮、APA 7 與 QR Code', 'Free Tools for Students: Words, PDFs, Reports'),
    metaDescription: text('整理學生做報告、交作業與準備簡報時常用的免費工具，包含字數統計、圖片壓縮、PDF 合併拆分、GPA、APA 7 與 QR Code，免安裝、免註冊，手機或電腦打開瀏覽器就能用。', 'A student report toolkit for word counts, character counts, image compression, PDF merge and split, GPA, APA 7 reports, and QR codes.'),
    h1: text('學生報告工具：從草稿、圖片到 PDF 繳交前檢查', 'Student Report Tools for Drafts, Images, PDFs, and Submission Checks'),
    intro: text(
      '學生做報告時常遇到字數限制、圖片太大、PDF 需要合併拆分、引用格式要整理，或需要把連結轉成 QR Code。這一頁把交作業前最常用的 FreeTools 工具集中在一起，讓你可以先檢查字數與大小，再處理圖片、PDF、APA 7 報告或 GPA 試算。工具適合在手機或電腦上快速使用，但正式繳交前仍要依老師或系所規定再次確認格式。',
      'Student reports often involve word limits, oversized images, merged PDFs, citation drafts, QR codes, and last-minute file checks. This page collects FreeTools utilities for those moments: count words, compress images, merge or split PDFs, prepare APA 7 report text, calculate GPA, and clean up text before submitting. Always compare the final file against your teacher or department requirements.'
    ),
    painPoints: [
      text('報告有字數或字元限制，需要快速檢查。', 'Reports have word or character limits that need quick checking.'),
      text('圖片與 PDF 檔案太大，繳交系統或信箱不容易上傳。', 'Images and PDFs may be too large for upload portals or email.'),
      text('引用格式、大小寫與 QR Code 常在最後階段才需要處理。', 'Citations, casing, and QR codes often appear at the final submission stage.'),
    ],
    recommendedToolIds: ['word-counter', 'character-counter', 'image-compressor', 'merge-pdf', 'split-pdf', 'pdf-compressor', 'qr-code-generator', 'gpa-calculator', 'apa-7-report-generator', 'case-converter'],
    workflowSuggestions: [
      text('先用字數與字元工具檢查草稿是否符合規定。', 'Check the draft with word and character counters first.'),
      text('把圖片壓縮或轉檔後再放入文件，避免最後 PDF 過大。', 'Compress or convert images before placing them in the document.'),
      text('繳交前合併、拆分或壓縮 PDF，並再次打開下載檔確認頁面順序。', 'Merge, split, or compress PDFs before submission, then reopen the downloaded file to verify page order.'),
    ],
    relatedCategoryIds: ['text', 'pdf', 'image', 'statistics'],
    relatedWorkflowIds: ['student-report-toolkit', 'graduate-statistics-report-toolkit'],
    faq: [
      { question: text('PDF 工具會上傳我的報告嗎？', 'Do PDF tools upload my report?'), answer: text('這些工具以瀏覽器本機處理為主。大型檔案仍可能受裝置記憶體限制，處理完請打開下載檔檢查。', 'They are designed for browser-local processing. Large files can still hit device memory limits, so reopen the downloaded result and check it.') },
      { question: text('APA 7 產生器可以直接交嗎？', 'Can I submit APA 7 output directly?'), answer: text('請把它當成草稿。你仍需要檢查研究問題、變項名稱、統計假設、老師要求與引用格式。', 'Treat it as a draft. You still need to check variables, assumptions, teacher requirements, and citation rules.') },
      { question: text('圖片壓縮會影響畫質嗎？', 'Will image compression affect quality?'), answer: text('可能會。建議保留原始檔，壓縮後放大檢查文字、圖表與細節是否清楚。', 'It can. Keep the original file and zoom in after compression to inspect text, charts, and details.') },
      { question: text('GPA 工具能代表正式成績嗎？', 'Is the GPA tool an official grade record?'), answer: text('不能。它適合試算與規劃，正式成績仍以學校公告與成績系統為準。', 'No. It is for planning and estimates; official records come from your school system.') },
    ],
  },
  {
    id: 'office-workers',
    slug: 'office-workers',
    locales: ['zh', 'en'],
    title: text('上班族文件工具', 'Office Worker Tools'),
    metaTitle: text('上班族文件工具：PDF、圖片、工作天與 JSON 格式化', 'Free Office Tools: PDF, Images, Dates, JSON'),
    metaDescription: text('整理辦公室常用的免費文件工具，包含 PDF 合併拆分壓縮、圖片壓縮、工作天與日期計算、QR Code、薪資加班費與 JSON 格式化，適合臨時文件、行程與資料整理。', 'Office tools for PDF merge, split, and compression, image compression, business days, date math, QR codes, salary and overtime estimates, and JSON formatting.'),
    h1: text('上班族文件工具：處理 PDF、圖片、日期與日常辦公試算', 'Office Worker Tools for PDFs, Images, Dates, and Daily Checks'),
    intro: text(
      '辦公室工作常被臨時文件任務打斷：PDF 要合併拆分、圖片太大、日期與工作天要試算、QR Code 要貼到公告，或薪資與加班費需要先估算。這一頁把日常辦公常用的 FreeTools 工具整理成一個入口，讓你可以快速處理文件、行程與資料格式。工具適合用於內部草稿、行政整理與交付前檢查；正式薪資、合約或法務決策仍應以公司制度與專業意見為準。',
      'Office work is often interrupted by small file and scheduling tasks: merge a PDF, split pages, compress a file, calculate business days, make a QR code, estimate salary or overtime, or format JSON from another system. This page groups the FreeTools utilities that help with those daily checks. Use them for drafts, internal admin, and pre-delivery review; formal payroll, legal, or contract decisions still need official sources.'
    ),
    painPoints: [
      text('臨時要整理 PDF、圖片或 QR Code，時間很碎。', 'PDF, image, and QR code tasks often arrive with little time.'),
      text('工作天、日期差與截止日需要快速試算。', 'Business days, date differences, and deadlines need quick estimates.'),
      text('薪資、加班費或資料格式只能先做內部估算與檢查。', 'Payroll and data formatting often need preliminary checks before official review.'),
    ],
    recommendedToolIds: ['merge-pdf', 'split-pdf', 'pdf-compressor', 'image-compressor', 'business-days', 'date-difference', 'qr-code-generator', 'net-salary', 'overtime-pay', 'json-formatter'],
    workflowSuggestions: [
      text('先把文件頁面順序整理好，再進行合併、拆分或壓縮。', 'Confirm page order before merging, splitting, or compressing documents.'),
      text('日期試算要記錄假設，例如是否排除週末或特定假日。', 'Record assumptions for date calculations, such as weekends or holidays.'),
      text('薪資與加班試算只作內部估算，正式金額請回到公司或法規資料。', 'Treat salary and overtime results as estimates, then confirm official figures elsewhere.'),
    ],
    relatedCategoryIds: ['pdf', 'image', 'time', 'money', 'text'],
    relatedWorkflowIds: ['office-document-toolkit'],
    faq: [
      { question: text('這些工具適合處理公司機密檔案嗎？', 'Are these tools suitable for confidential company files?'), answer: text('工具以瀏覽器處理為主，但你仍應遵守公司資安規範。高度敏感資料請使用公司核准工具。', 'They are browser-oriented, but you still need to follow company security rules. Use approved company tools for highly sensitive files.') },
      { question: text('工作天計算會自動套用所有國定假日嗎？', 'Does business-day calculation include all public holidays automatically?'), answer: text('不一定。請依頁面提供的設定輸入需要排除的日期，並確認地區規則。', 'Not necessarily. Enter the holidays you need to exclude and confirm regional rules.') },
      { question: text('PDF 壓縮後可以直接寄出嗎？', 'Can I send a compressed PDF immediately?'), answer: text('建議先打開下載檔，檢查頁數、文字清晰度、表格與簽名頁是否正常。', 'Open the downloaded file first and check page count, readability, tables, and signature pages.') },
      { question: text('薪資試算結果能作為正式依據嗎？', 'Are salary estimates official?'), answer: text('不能。它們只協助估算，正式薪資與加班費仍需依公司制度、法規與薪資單確認。', 'No. They are estimates; official payroll depends on company policy, law, and payslips.') },
    ],
  },
  {
    id: 'creators',
    slug: 'creators',
    locales: ['zh', 'en'],
    title: text('創作者工具', 'Creator Tools'),
    metaTitle: text('創作者工具：字數字元、圖片壓縮、尺寸調整、QR Code 與顏色', 'Free Creator Tools: Text, Images, QR Codes'),
    metaDescription: text('整理社群創作者常用的免費工具，包含字元統計、圖片壓縮與尺寸調整、QR Code、大小寫轉換、顏色產生與隨機輪盤，適合發文、短影音與活動宣傳前快速整理素材。', 'Creator utilities for character counts, word counts, image compression, resizing, QR codes, case conversion, color generation, and random wheels.'),
    h1: text('創作者工具：處理貼文長度、圖片大小、QR Code 與靈感選擇', 'Creator Tools for Post Length, Images, QR Codes, and Quick Decisions'),
    intro: text(
      '創作者常在發布前處理很多小事：標題要改大小寫、貼文要符合字數限制、圖片要壓縮或調整尺寸、活動連結要變成 QR Code，甚至內容主題要用輪盤快速決定。這一頁把適合社群、短影音、部落格與活動宣傳的 FreeTools 工具集中整理，讓你在發文前快速檢查格式與素材。工具不會替你承諾成效，但可以減少重複整理的時間。',
      'Creators do many small checks before publishing: post length, title casing, image size, QR links, colors, and quick choices between content ideas. This page collects the FreeTools utilities that fit social posts, short videos, blog drafts, event promotion, and visual prep. They do not promise reach or performance; they simply reduce repetitive formatting work before you publish.'
    ),
    painPoints: [
      text('貼文、標題、簡介與平台限制需要快速檢查。', 'Posts, titles, bios, and platform limits need fast checks.'),
      text('圖片尺寸與檔案大小會影響上傳、分享與讀取速度。', 'Image size and dimensions affect uploads, sharing, and loading.'),
      text('靈感很多時，需要一個透明的方式快速做選擇。', 'When there are many ideas, a transparent random choice can help.'),
    ],
    recommendedToolIds: ['character-counter', 'word-counter', 'image-compressor', 'image-resizer', 'qr-code-generator', 'case-converter', 'color-generator', 'what-to-eat', 'random-wheel', 'png-to-jpg'],
    workflowSuggestions: [
      text('先用字元與字數工具檢查貼文、標題與摘要長度。', 'Check post, title, and summary length first.'),
      text('發布前壓縮圖片並確認文字截圖仍然清楚。', 'Compress images before publishing and confirm text remains readable.'),
      text('用 QR Code 或隨機輪盤處理活動連結與主題選擇。', 'Use QR codes or random wheels for event links and content choices.'),
    ],
    relatedCategoryIds: ['text', 'image', 'random'],
    relatedWorkflowIds: ['creator-social-toolkit', 'daily-decision-toolkit'],
    faq: [
      { question: text('字元統計適合哪些平台？', 'Which platforms are character counters useful for?'), answer: text('適合社群貼文、短影音描述、廣告文字、Meta description、推播與簡訊草稿。', 'They help with social posts, video descriptions, ad copy, meta descriptions, push messages, and SMS drafts.') },
      { question: text('圖片壓縮會不會讓作品變糊？', 'Will compression blur my creative work?'), answer: text('可能會。請保留原始檔，並在發布前用目標平台或裝置預覽。', 'It can. Keep originals and preview the result on the target platform or device.') },
      { question: text('顏色產生器可以做品牌規範嗎？', 'Can the color generator create a brand system?'), answer: text('它適合找靈感與產生色碼，正式品牌規範仍需要設計判斷與一致性管理。', 'It is useful for ideas and color codes; formal brand systems still require design judgment and consistency rules.') },
      { question: text('隨機工具適合決定商業策略嗎？', 'Should random tools decide business strategy?'), answer: text('不適合。它們適合靈感排序、小活動或低風險選擇，重要決策仍需資料與判斷。', 'No. Use them for idea ordering, small activities, or low-risk choices; important decisions need data and judgment.') },
    ],
  },
  {
    id: 'designers',
    slug: 'designers',
    locales: ['zh', 'en'],
    title: text('設計師工具', 'Designer Tools'),
    metaTitle: text('設計師工具：圖片壓縮、裁切、轉檔、顏色、QR Code 與草圖', 'Free Designer Tools: Images, Color, QR Codes'),
    metaDescription: text('整理設計師與視覺工作者常用的免費工具，包含圖片壓縮、尺寸調整、裁切旋轉、PNG/JPG/WebP 轉檔、顏色產生、QR Code 與草圖，適合交付前的輕量圖片調整。', 'Designer utilities for image compression, resizing, crop, rotate, PNG/JPG/WebP conversion, color generation, QR codes, and sketching.'),
    h1: text('設計師工具：快速處理圖片尺寸、格式、顏色與 QR Code', 'Designer Tools for Image Size, Formats, Color, and QR Codes'),
    intro: text(
      '設計交付前常需要快速處理非核心但很花時間的細節：圖片要壓縮、裁切、旋轉、轉成 JPG 或 WebP，色碼要臨時挑選，活動或作品集連結要做成 QR Code。這一頁把適合設計師、行銷視覺與內容製作的 FreeTools 工具集中整理，讓你在不開大型軟體的情況下完成輕量調整。正式印刷、品牌規範或工程圖仍需要專業軟體與人工檢查。',
      'Design delivery often includes small but time-consuming tasks: compress an image, resize it, crop or rotate it, convert PNG/JPG/WebP, pick a color, create a QR code, or sketch a quick idea. This page groups lightweight FreeTools utilities for designers, marketers, and visual content teams. They are useful for quick browser edits, while print, brand systems, and production files still need professional review.'
    ),
    painPoints: [
      text('交付前圖片大小、格式與尺寸常需要臨時調整。', 'Image size, format, and dimensions often need last-minute adjustment.'),
      text('QR Code、色碼與簡單草圖不一定需要打開大型軟體。', 'QR codes, color codes, and quick sketches do not always need heavy software.'),
      text('瀏覽器工具適合快速處理，但正式輸出仍要檢查品質。', 'Browser tools are fast, but final delivery still needs quality checks.'),
    ],
    recommendedToolIds: ['image-compressor', 'image-resizer', 'image-crop', 'image-rotate-flip', 'color-generator', 'png-to-jpg', 'jpg-to-png', 'jpg-to-webp', 'qr-code-generator', 'sketchpad'],
    workflowSuggestions: [
      text('先保留原始檔，再用壓縮、裁切或轉檔工具輸出交付版本。', 'Keep the original file, then export delivery versions with compression, crop, or conversion tools.'),
      text('針對透明背景、照片或網頁使用情境選擇 PNG、JPG 或 WebP。', 'Choose PNG, JPG, or WebP based on transparency, photo content, and web use.'),
      text('發布前在目標裝置上檢查色彩、文字清晰度與 QR Code 掃描結果。', 'Before publishing, inspect color, text clarity, and QR scan results on the target device.'),
    ],
    relatedCategoryIds: ['image', 'draw', 'pdf'],
    relatedWorkflowIds: [],
    faq: [
      { question: text('WebP 一定比 JPG 好嗎？', 'Is WebP always better than JPG?'), answer: text('不一定。WebP 常適合網頁檔案大小，但相容性、透明度與平台要求仍要確認。', 'Not always. WebP often helps web file size, but compatibility, transparency, and platform requirements still matter.') },
      { question: text('可以用這些工具做正式印刷檔嗎？', 'Can these tools prepare print-ready files?'), answer: text('不建議作為唯一流程。正式印刷仍需檢查色彩模式、解析度、出血與印刷規格。', 'Not as the only workflow. Print files still need checks for color mode, resolution, bleed, and printer specs.') },
      { question: text('QR Code 產生後要怎麼檢查？', 'How should I check a generated QR code?'), answer: text('用另一台裝置掃描，確認網址、開啟速度與落地頁內容正確。', 'Scan it with another device and confirm the URL, load speed, and landing page content.') },
      { question: text('草圖工具適合長期設計檔管理嗎？', 'Is the sketchpad good for long-term design file management?'), answer: text('不適合。它適合快速草稿與討論，長期版本管理請使用專業設計工具。', 'No. It is for quick drafts and discussion; use professional design tools for long-term versioning.') },
    ],
  },
  {
    id: 'developers',
    slug: 'developers',
    locales: ['zh', 'en'],
    title: text('開發者工具', 'Developer Tools'),
    metaTitle: text('開發者工具：JSON、Base64、URL 編碼、UUID 與 CSV 轉換', 'Free Developer Tools: JSON, Base64, UUID, CSV'),
    metaDescription: text('整理開發者常用的免費瀏覽器工具，包含 JSON 格式化、Base64、URL 編碼、UUID、Timestamp、CSV JSON 轉換、Markdown 預覽與密碼產生。', 'Developer utilities for JSON formatting, Base64, URL encoding, UUIDs, timestamps, CSV and JSON conversion, Markdown preview, QR codes, and password generation.'),
    h1: text('開發者工具：快速處理 JSON、編碼、UUID、Timestamp 與 Markdown', 'Developer Tools for JSON, Encoding, UUIDs, Timestamps, and Markdown'),
    intro: text(
      '開發與除錯時常需要快速處理小片段資料：JSON 要格式化、字串要 Base64 或 URL 編碼、Timestamp 要轉換、UUID 要產生、CSV 與 JSON 要互轉，或 Markdown 要先預覽。這一頁整理 FreeTools 中適合開發者的輕量工具，方便在瀏覽器中完成資料檢查與格式轉換。工具適合處理範例、測試資料與非敏感內容；正式密鑰、個資與公司機密請遵守團隊資安流程。',
      'Development and debugging often involve small data tasks: format JSON, encode a URL, decode Base64, generate a UUID, convert timestamps, move between CSV and JSON, preview Markdown, or create a QR code for testing. This page collects lightweight FreeTools utilities for those checks. Use them for examples, test data, and non-sensitive content; secrets, personal data, and confidential company data need approved security workflows.'
    ),
    painPoints: [
      text('小型資料轉換不值得切換到大型 IDE 或線上服務。', 'Small data conversions should not require a heavy IDE or service.'),
      text('除錯時需要快速看懂 JSON、時間戳與編碼後的字串。', 'Debugging often needs readable JSON, timestamps, and encoded strings.'),
      text('測試資料與密碼產生要避免混入正式秘密資訊。', 'Test data and password generation must avoid exposing real secrets.'),
    ],
    recommendedToolIds: ['json-formatter', 'base64', 'url-encoder', 'uuid-generator', 'timestamp-converter', 'csv-to-json', 'json-to-csv', 'markdown-previewer', 'qr-code-generator', 'password-generator'],
    workflowSuggestions: [
      text('只貼測試資料或已去識別內容，不要貼正式 token、密碼或個資。', 'Paste only test or anonymized data, not real tokens, passwords, or personal data.'),
      text('先格式化 JSON 或轉換 Timestamp，再回到程式碼確認欄位語意。', 'Format JSON or convert timestamps, then return to code to verify field meaning.'),
      text('CSV/JSON 轉換後抽查欄位名稱、空值與特殊字元。', 'After CSV/JSON conversion, spot-check field names, empty values, and special characters.'),
    ],
    relatedCategoryIds: ['text', 'random', 'time'],
    relatedWorkflowIds: [],
    faq: [
      { question: text('可以貼正式 API key 嗎？', 'Can I paste real API keys?'), answer: text('不建議。即使工具以瀏覽器處理為主，正式秘密資訊仍應留在團隊核准的安全工具中。', 'No. Even when a tool is browser-oriented, real secrets should stay in approved secure tooling.') },
      { question: text('JSON 格式化會修正資料語意嗎？', 'Does JSON formatting fix data meaning?'), answer: text('不會。它只協助排版與基本可讀性，欄位意義、型別與業務規則仍需你確認。', 'No. It helps readability and basic structure; field meaning, types, and business rules still need review.') },
      { question: text('Timestamp 轉換要注意什麼？', 'What should I watch for with timestamps?'), answer: text('請確認秒與毫秒單位、時區、夏令時間與系統顯示格式。', 'Check seconds vs milliseconds, time zone, daylight saving behavior, and display format.') },
      { question: text('密碼產生器可以用於正式帳號嗎？', 'Can generated passwords be used for real accounts?'), answer: text('可以作為產生強密碼的輔助，但正式帳號建議搭配密碼管理器保存，並依系統規則調整。', 'It can help generate strong passwords, but use a password manager for storage and adjust to the target system rules.') },
    ],
  },
];

export function viewAudience(audience: Audience, lang: Locale): AudienceView {
  return {
    ...audience,
    title: audience.title[lang],
    metaTitle: audience.metaTitle[lang],
    metaDescription: audience.metaDescription[lang],
    h1: audience.h1[lang],
    intro: audience.intro[lang],
    painPoints: audience.painPoints.map((item) => item[lang]),
    workflowSuggestions: audience.workflowSuggestions.map((item) => item[lang]),
    faq: audience.faq.map((item) => ({ question: item.question[lang], answer: item.answer[lang] })),
  };
}

export function isAudienceAvailableInLocale(audience: Audience, lang: Locale): boolean {
  return audience.locales.includes(lang);
}

export function getAudience(slug: string): Audience | undefined {
  return audiences.find((audience) => audience.slug === slug);
}
