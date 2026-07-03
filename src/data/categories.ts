import type { Locale } from '../config/site';

export interface Category {
  id: string;
  icon: string;
  name: Record<Locale, string>;
  description: Record<Locale, string>;
  relatedCategories?: string[];
  guide?: Record<Locale, {
    overview: string[];
    tips: string[];
  }>;
}

export const categories: Category[] = [
  {
    id: 'money',
    icon: '💰',
    name: { zh: '薪資與金錢', en: 'Money & Salary' },
    description: {
      zh: '整理薪資、加班費、貸款、儲蓄與複利等日常試算，方便先比較不同條件。計算採簡化公式，結果僅供估算，正式決策請查證實際規定。',
      en: 'Estimate salary, loans, savings, and everyday money questions with simple browser tools.',
    },
    relatedCategories: ['time', 'statistics', 'study'],
    guide: {
      zh: {
        overview: [
          '這一類工具適合在決定貸款方案、安排儲蓄或核對薪資前，先把不同金額、利率、期間與倍率放進同一套條件比較。工具不會主動取得銀行、公司或政府資料，所有費率都以你輸入的內容為準。',
          '房貸與複利屬長期估算，加班費與薪資則容易受到法規、公司制度及扣繳項目影響。請把結果視為試算起點，不要直接當成契約、報稅或投資依據。',
        ],
        tips: ['先確認金額單位與年利率、月利率的差別。', '比較方案時一次只改一個條件，較容易看出影響。', '正式簽約或申報前，以金融機構、雇主或主管機關資料為準。'],
      },
      en: {
        overview: [
          'Use these calculators to compare amounts, rates, terms, and pay assumptions before reviewing a loan, savings plan, or payroll figure. The tools do not fetch bank, employer, or government records; results depend entirely on the values you enter.',
          'Mortgage and compound-interest results are long-term estimates, while salary and overtime figures can vary with law, employer policy, and deductions. Treat every result as a planning starting point rather than a contract, tax filing, or investment recommendation.',
        ],
        tips: ['Confirm the currency unit and whether a rate is annual or monthly.', 'Change one assumption at a time when comparing scenarios.', 'Use lender, employer, or government figures for formal decisions.'],
      },
    },
  },
  {
    id: 'time',
    icon: '⏱️',
    name: { zh: '工作與時間', en: 'Work & Time' },
    description: {
      zh: '使用倒數計時、番茄鐘、日期差與工作日計算安排工作節奏，適合專注、排程與期限估算。實際休假日仍應依所在地行事曆確認。',
      en: 'Plan focus sessions, dates, breaks, and workday timing without installing an app.',
    },
    relatedCategories: ['money', 'text', 'random'],
    guide: {
      zh: {
        overview: [
          '工作與時間工具分成即時計時與日期計算兩類。番茄鐘、倒數計時器及碼表適合目前工作階段；日期差、年齡與工作日計算則適合排程、交期或區間估算。',
          '瀏覽器可能在分頁進入背景或裝置省電時降低計時頻率，因此重要提醒仍應搭配系統鬧鐘。工作日工具只會排除你指定的週末與假日，不會自動套用各地最新國定假日。',
        ],
        tips: ['長時間計時時避免關閉分頁或讓裝置進入深度休眠。', '計算工作日時手動加入適用地區的假日。', '涉及合約期限時確認是否包含開始日與結束日。'],
      },
      en: {
        overview: [
          'Work and time tools cover live timers and date calculations. Pomodoro, countdown, and stopwatch tools support the current session; date difference, age, and business-day tools help estimate schedules and deadlines.',
          'Browsers may throttle background tabs or timers during device power saving, so use a system alarm for critical reminders. Business-day results exclude only the weekends and holidays you specify and do not automatically import every regional holiday calendar.',
        ],
        tips: ['Keep the tab open and avoid deep sleep during long timers.', 'Add holidays for the region relevant to your schedule.', 'For contracts, confirm whether start and end dates are inclusive.'],
      },
    },
  },
  {
    id: 'random',
    icon: '🎲',
    name: { zh: '隨機工具', en: 'Random' },
    description: {
      zh: '快速產生隨機數字、名單抽選、分組與轉盤結果，適合課堂、活動及日常決定。結果由瀏覽器即時產生，不代表正式抽獎或公證程序。',
      en: 'Generate numbers, picks, groups, and decisions for classrooms, events, and everyday choices.',
    },
    relatedCategories: ['study', 'text', 'time'],
  },
  {
    id: 'text',
    icon: '✍️',
    name: { zh: '文字與寫作', en: 'Text & Writing' },
    description: {
      zh: '提供字數統計、格式整理、大小寫轉換、JSON 與文字清理工具，協助寫作、校稿及資料整理。輸入內容多數只在目前瀏覽器分頁處理。',
      en: 'Count, clean, format, and review text for faster writing and editing.',
    },
    relatedCategories: ['study', 'image', 'statistics'],
  },
  {
    id: 'image',
    icon: '🖼️',
    name: { zh: '圖片與檔案', en: 'Image & File' },
    description: {
      zh: "提供圖片壓縮、格式轉換、尺寸調整與 QR Code 等常用功能，主要在瀏覽器本機處理。大型圖片的速度與輸出品質會受到裝置效能及格式限制影響。",
      en: "Compress, convert, and resize images, plus QR codes and other handy file tasks — all processed locally in your browser.",
    },
    relatedCategories: ['pdf', 'draw', 'text'],
    guide: {
      zh: {
        overview: [
          '圖片工具適合處理網站上傳、社群分享及一般文件需要的檔案。壓縮會在畫質與容量間取捨，尺寸調整會改變像素數，格式轉換則可能影響透明背景、動畫或色彩表現。',
          '檔案主要由瀏覽器本機讀取及輸出，不會主動上傳到 FunnyTools 免費線上工具箱伺服器。處理大量或高解析度圖片時會占用裝置記憶體，手機上建議分批操作並在下載後檢查成品。',
        ],
        tips: ['需要透明背景時優先保留 PNG 或 WebP。', '照片通常適合 JPEG 或 WebP，文字截圖需注意壓縮模糊。', 'QR Code 產生後先用另一台裝置實際掃描。'],
      },
      en: {
        overview: [
          'Image tools support common website uploads, social sharing, and document preparation. Compression trades quality for file size, resizing changes pixel dimensions, and format conversion can affect transparency, animation, or color rendering.',
          'Files are read and exported locally in the browser rather than uploaded to FunnyTools servers. Large batches and high-resolution images can use substantial memory, so process them in smaller groups on mobile and inspect every downloaded result.',
        ],
        tips: ['Keep PNG or WebP when transparency is required.', 'JPEG or WebP usually suits photos; check text screenshots for blur.', 'Scan a generated QR code with another device before publishing it.'],
      },
    },
  },
  {
    id: 'pdf',
    icon: '📄',
    name: { zh: 'PDF 工具', en: 'PDF Tools' },
    description: {
      zh: '在瀏覽器本機合併、拆分、旋轉、排序與整理 PDF 檔案，不需把文件傳到本站伺服器。大型、加密或特殊格式檔案可能受瀏覽器能力限制。',
      en: 'Merge, split, rotate, and organize PDF files locally in your browser — nothing is uploaded.',
    },
    relatedCategories: ['image', 'text', 'time'],
  },
  {
    id: 'draw',
    icon: '✏️',
    name: { zh: '製圖工具', en: 'Drawing & CAD' },
    description: {
      zh: '在瀏覽器本機進行簡易二維製圖、手繪與流程圖，適合草稿、概念整理及快速示意。功能不取代專業 CAD 或設計軟體，重要圖面請另行檢查。',
      en: 'Simple 2D drafting, sketching, and diagrams right in your browser — no CAD software to install.',
    },
    relatedCategories: ['image', 'study', 'pdf'],
    guide: {
      zh: {
        overview: [
          '製圖工具定位為快速草稿與概念溝通。手繪板適合自由標記，流程圖適合整理步驟與關係，簡易 CAD 則可用於基本幾何配置；三者的輸出目的與精度不同。',
          '瀏覽器工具不包含專業 CAD 的圖層管理、工程單位、標註規範或製造驗證。涉及施工、加工、安全或正式送審的圖面，必須再由合格軟體與專業人員檢查，並保留原始設計檔與版本紀錄。',
        ],
        tips: ['先依用途選擇手繪、流程圖或幾何製圖。', '操作較複雜的圖面應定期匯出備份。', '正式工程尺寸不可只依螢幕顯示判斷。'],
      },
      en: {
        overview: [
          'Drawing tools are intended for quick drafts and concept communication. The sketchpad supports freehand marks, the flowchart tool organizes steps and relationships, and simple CAD supports basic geometric layouts; each has a different purpose and precision level.',
          'Browser tools do not provide the layer control, engineering units, drafting standards, or manufacturing validation of professional CAD. Construction, fabrication, safety, and submission drawings require qualified software and professional review.',
        ],
        tips: ['Choose sketching, flowcharts, or geometric drafting based on the task.', 'Export backups regularly while working on a complex drawing.', 'Do not treat on-screen dimensions as verified engineering measurements.'],
      },
    },
  },
  {
    id: 'study',
    icon: '🎓',
    name: { zh: '學生與老師', en: 'Student & Teacher' },
    description: {
      zh: '集合課堂點名、隨機分組、座位安排與成績平均等教學輔助工具，適合老師備課及課堂操作。成績結果仍應依學校規則與原始紀錄核對。',
      en: 'Classroom helpers for picking students, grouping, seating, and grade calculations.',
    },
    relatedCategories: ['random', 'text', 'draw'],
    guide: {
      zh: {
        overview: [
          '學生與老師工具著重課堂現場的快速操作，例如從名單抽選、建立隨機小組、安排座位及計算成績。名單與分數主要在目前瀏覽器分頁處理，使用後可重設或關閉頁面。',
          '隨機結果只能協助分配，仍要考量學生需求、無障礙安排與課堂公平。成績計算必須符合學校採用的配分、缺考、補考及四捨五入規則，正式紀錄應回到校務系統核對並由負責教師確認。',
        ],
        tips: ['貼上名單前先移除學號、電話等不必要個資。', '分組後人工檢查人數與特殊安排。', '輸入成績時保留原始紀錄，避免只保存計算結果。'],
      },
      en: {
        overview: [
          'Student and teacher tools support quick classroom tasks such as picking from a list, creating random groups, arranging seats, and calculating grades. Lists and scores are primarily processed in the current browser tab and can be reset or removed by closing the page.',
          'Random output can assist allocation but does not replace accessibility, student-support, or fairness decisions. Grade calculations must follow the school rules for weights, absences, make-up work, and rounding, with official records checked in the school system.',
        ],
        tips: ['Remove student IDs, phone numbers, and unnecessary personal data before pasting a list.', 'Review group sizes and individual accommodations after random assignment.', 'Keep the original grade record instead of saving only the calculated result.'],
      },
    },
  },
  {
    id: 'personality',
    icon: '🧠',
    name: { zh: '趣味測驗', en: 'Personality Quizzes' },
    description: {
      zh: '收錄適合休閒互動的趣味測驗與簡單選擇題，方便和朋友一起體驗。內容以娛樂為主，不是心理衡鑑、醫療診斷或專業人格分析。',
      en: 'Fun personality quizzes to pass the time or share with friends.',
    },
  },
  {
    id: 'statistics',
    icon: '📊',
    name: { zh: '教育與統計工具', en: 'Education & Statistics Tools' },
    description: {
      zh: '提供分數轉換、加權平均、標準差、百分比與基礎統計工具，協助老師、學生與研究者進行計算與資料分析。結果應配合研究設計及專業方法再次檢查。',
      en: 'Score conversion, weighted averages, standard deviation, percentages, and introductory statistics tools for educators, students, and researchers.',
    },
    relatedCategories: ['study', 'money', 'text'],
  },
];

export function getCategoryById(id: string): Category | undefined {
  return categories.find((category) => category.id === id);
}
