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
  /** Category FAQ (5+). */
  faq: Record<Locale, CategoryFaq[]>;
  /** Related category ids (3+). */
  relatedCategories: string[];
  /** Optional disclaimer (required for money). */
  disclaimer?: Record<Locale, string>;
  /** Longer per-tool blurbs keyed by tool slug (50-100 chars zh). */
  toolBlurbs: Record<string, Record<Locale, string>>;
}

export const categoryContent: Record<string, CategoryContent> = {
  money: {
    title: {
      zh: '薪資與金錢免費工具｜薪水、貸款、複利試算 - FunnyTools',
      en: 'Money & Salary Calculators | Free Tools - FunnyTools',
    },
    metaDescription: {
      zh: '免費薪資與金錢試算工具：實領薪資、加班費、房貸月付、複利、儲蓄目標與通膨購買力。免註冊、瀏覽器本機計算，適合先比較方案與規劃預算，結果僅供估算參考。',
      en: 'Free money and salary calculators: take-home pay, overtime, mortgage, compound interest, savings goals, and inflation. No sign-up, local in-browser estimates.',
    },
    h1: { zh: '薪資與金錢免費工具', en: 'Free Money & Salary Tools' },
    intro: {
      zh: [
        '薪資與金錢分類整理了一系列免費的線上試算工具，幫助你在不安裝任何軟體的情況下，快速估算與日常財務有關的數字。從每個月的實領薪水、加班費，到房貸月付金、複利成長、儲蓄目標與通膨對購買力的影響，這些工具都能在瀏覽器中即時計算，讓原本需要列公式或翻試算表的事情變得簡單。',
        '無論你正在比較不同的貸款方案、規劃長期投資、設定存錢目標，或只是想看懂薪資單上的數字，這個分類都提供直觀的輸入欄位與清楚的結果。所有計算都在你的裝置本機完成，輸入的金額不會上傳到伺服器，適合處理較為私密的財務資訊。',
        '需要提醒的是，這些工具提供的都是估算結果，並未涵蓋每個人不同的稅率、級距、保費或銀行條件。實際金額仍應以政府公告、公司薪資單、銀行核定或專業人士的意見為準，請勿將試算結果直接當作正式的財務或投資決策依據。',
      ],
      en: [
        'The Money & Salary category brings together free online calculators that help you estimate everyday financial figures without installing anything. From monthly take-home pay and overtime to mortgage payments, compound growth, savings goals, and the effect of inflation, each tool calculates instantly in your browser.',
        'Whether you are comparing loan options, planning long-term investing, setting a savings target, or simply making sense of your payslip, these tools offer clear inputs and results. Everything runs locally on your device, so the amounts you enter are never uploaded — and remember that all results are estimates that should be confirmed with official sources or a professional.',
      ],
    },
    useCases: {
      zh: [
        '比較不同房貸方案，先抓出大概的每月負擔',
        '規劃長期投資，了解複利累積的成長',
        '設定存錢目標，反推每月該存多少',
        '核對薪資單上的實領金額與加班費',
        '評估通膨對未來購買力的影響',
      ],
      en: [
        'Compare mortgage options and estimate the monthly burden',
        'Plan long-term investing and see compound growth',
        'Set a savings goal and work out the monthly amount',
        'Check take-home pay and overtime on a payslip',
        'Assess how inflation affects future purchasing power',
      ],
    },
    howToChoose: {
      zh: [
        { tip: '想估算每月實際入帳的薪水，用實領薪資試算', toolSlug: 'net-salary' },
        { tip: '想看懂或核對加班給付，用加班費計算', toolSlug: 'overtime-pay' },
        { tip: '想知道買房後每月要還多少，用房貸月付試算', toolSlug: 'mortgage-payment' },
        { tip: '想了解長期投資的成長，用複利計算器', toolSlug: 'compound-interest' },
        { tip: '想規劃存錢計畫，用儲蓄目標計算器', toolSlug: 'savings-goal' },
        { tip: '想了解通膨對購買力的影響，用通膨購買力試算', toolSlug: 'inflation' },
      ],
      en: [
        { tip: 'To estimate the salary that actually lands in your account, use Net Salary', toolSlug: 'net-salary' },
        { tip: 'To understand or check overtime pay, use Overtime Pay', toolSlug: 'overtime-pay' },
        { tip: 'To see the monthly repayment after buying, use Mortgage Payment', toolSlug: 'mortgage-payment' },
        { tip: 'To understand long-term investment growth, use Compound Interest', toolSlug: 'compound-interest' },
        { tip: 'To plan a savings plan, use Savings Goal', toolSlug: 'savings-goal' },
        { tip: "To gauge inflation's impact on purchasing power, use Inflation", toolSlug: 'inflation' },
      ],
    },
    faq: {
      zh: [
        { q: '這些金錢與薪資工具需要付費嗎？', a: '不需要，所有工具都免費，也不需要註冊或安裝。' },
        { q: '計算結果可以當作正式依據嗎？', a: '不行，所有結果都是估算，未涵蓋個別稅率、級距與銀行條件，請以官方公告或專業意見為準。' },
        { q: '我輸入的金額會被上傳嗎？', a: '不會，所有計算都在你的瀏覽器本機完成，金額不會送到伺服器。' },
        { q: '房貸試算用的是哪種還款方式？', a: '房貸月付試算以本息平均攤還（每月固定金額）估算，實際方案可能不同，請以銀行條件為準。' },
        { q: '複利計算可以用在定期定額投資嗎？', a: '可以，複利計算器支援設定本金與每月投入估算長期累積，但不保證實際報酬。' },
        { q: '這些工具適用哪個國家或地區？', a: '工具提供通用的數學試算，未內建特定國家的稅制，使用時請依當地規定調整。' },
      ],
      en: [
        { q: 'Are these money and salary tools free?', a: 'Yes, all tools are free with no sign-up or installation.' },
        { q: 'Can I use the results as official figures?', a: "No. All results are estimates and don't reflect individual tax rates or bank terms; rely on official notices or professional advice." },
        { q: 'Is the amount I enter uploaded?', a: 'No. All calculations run locally in your browser and are not sent to any server.' },
        { q: 'Which repayment method does the mortgage tool use?', a: 'It estimates equal monthly principal-and-interest payments; actual plans may differ by bank.' },
        { q: "Do these tools apply to my country's tax system?", a: 'They offer general math estimates without built-in local tax rules, so adjust for your region.' },
      ],
    },
    relatedCategories: ['time', 'study', 'statistics'],
    disclaimer: {
      zh: '免責提醒：本分類所有工具僅提供數學估算，未涵蓋個別的稅率、級距、保費、優惠或銀行核定條件。計算結果不構成財務、投資、稅務或法律建議，實際金額請以政府公告、薪資單、銀行條件或專業人士意見為準。',
      en: 'Disclaimer: These tools provide math estimates only and do not account for individual tax rates, brackets, premiums, or bank terms. Results are not financial, investment, tax, or legal advice — confirm actual figures with official sources or a qualified professional.',
    },
    toolBlurbs: {
      'net-salary': {
        zh: '輸入月薪與常見扣除項目，快速估算實際入帳的月實領金額，方便規劃每月可支配收入與預算。結果僅供參考估算。',
        en: 'Estimate the monthly take-home pay you actually receive after common deductions, so you can plan your budget. Results are estimates only.',
      },
      'overtime-pay': {
        zh: '依時薪、加班時數與不同倍率（如平日、假日）估算加班費總額，協助你核對薪資單上的加班給付是否合理。',
        en: 'Work out total overtime pay from your hourly rate, hours, and different multipliers, and check the overtime figures on your payslip.',
      },
      'mortgage-payment': {
        zh: '輸入貸款金額、年利率與還款年限，以本息平均攤還方式估算每月應繳金額，幫你在看房或比較方案時先抓出大概負擔。',
        en: 'Enter loan amount, annual rate, and term to estimate the monthly equal-payment mortgage instalment before house hunting.',
      },
      'compound-interest': {
        zh: '設定本金、每月投入金額、年化報酬率與投資年數，試算複利累積後的未來總值，直觀理解長期投資與時間的力量。',
        en: 'Set principal, monthly contributions, annual return, and years to project compound growth and see the power of time.',
      },
      'savings-goal': {
        zh: '輸入目標金額與條件，估算達成需要多久，或反推每月應存多少錢，讓存錢計畫更具體、更容易堅持下去。',
        en: 'Enter a target amount to estimate how long it takes, or how much to save each month to reach your goal.',
      },
      inflation: {
        zh: '輸入金額、通膨率與年數，估算物價上漲後同一筆錢的未來購買力，幫助你理解現金長期被通膨稀釋的影響。',
        en: 'Estimate how rising prices erode the future purchasing power of a given amount over a number of years.',
      },
    },
  },

  time: {
    title: {
      zh: '工作與時間免費工具｜番茄鐘、倒數計時、日期計算 - FunnyTools',
      en: 'Work & Time Tools | Timers & Date Calculators - FunnyTools',
    },
    metaDescription: {
      zh: '免費工作與時間管理工具：番茄鐘、倒數計時、碼錶、日期差、年齡與工作日計算。免安裝、手機與電腦皆可用，適合專注、排程、期限估算與日常時間規劃。',
      en: 'Free work and time tools: Pomodoro timer, countdown, stopwatch, date difference, age, and business-day calculators. No install, works on mobile.',
    },
    h1: { zh: '工作與時間免費工具', en: 'Free Work & Time Tools' },
    intro: {
      zh: [
        '工作與時間分類集合了番茄鐘、倒數計時、碼錶、日期計算與工作日試算等免費工具，協助你把時間安排得更清楚。不論是想專注完成一項任務、控制會議或簡報的時間，還是要計算兩個日期之間的天數與工作日，都能在這裡找到對應的小工具。',
        '對需要長時間使用電腦的人來說，規律的專注與休息節奏特別重要。番茄鐘與休息提醒可以幫你維持「專注—休息」的循環，減少分心與久坐；倒數計時與碼錶則適合限時練習、運動間歇或量測單一工作花費的時間。',
        '日期差、年齡計算與工作日工具則著重在規劃，常用於估算專案工期、合約天數、活動倒數或請假安排。所有工具都在瀏覽器中即時運作，免註冊也免安裝，打開網頁就能開始使用，手機與電腦都適用。',
      ],
      en: [
        'The Work & Time category collects free tools for timers, dates, and workday planning — a Pomodoro timer, countdown, stopwatch, date difference, age, and business-day calculators. Whether you want to focus, time a meeting, or count days between dates, there is a small tool for it here.',
        'For anyone who spends long hours at a computer, a steady focus-and-rest rhythm matters. The Pomodoro timer and break reminder help you keep that cycle, while date and workday tools support planning project timelines, contract durations, and leave. Everything runs in the browser with no sign-up on both mobile and desktop.',
      ],
    },
    useCases: {
      zh: [
        '用番茄鐘維持讀書或工作的專注節奏',
        '簡報、考試或烹飪時設定倒數計時',
        '計算專案工期或合約的工作天數',
        '由生日快速算出實歲與下次生日',
        '提醒自己定時起身休息、保護眼睛',
      ],
      en: [
        'Keep a focus rhythm for studying or work with a Pomodoro timer',
        'Set a countdown for presentations, exams, or cooking',
        'Calculate workdays for project timelines or contracts',
        'Find exact age and the next birthday from a birth date',
        'Remind yourself to take regular breaks and rest your eyes',
      ],
    },
    howToChoose: {
      zh: [
        { tip: '想維持專注節奏，用番茄鐘計時器', toolSlug: 'pomodoro-timer' },
        { tip: '需要固定時限提醒，用倒數計時器', toolSlug: 'countdown-timer' },
        { tip: '要量測單一任務耗時，用碼錶', toolSlug: 'stopwatch' },
        { tip: '想算兩個日期相隔多久，用日期差計算', toolSlug: 'date-difference' },
        { tip: '要計算扣除週末的天數，用工作日計算', toolSlug: 'business-days' },
        { tip: '想提醒自己定時休息，用休息提醒', toolSlug: 'break-reminder' },
      ],
      en: [
        { tip: 'To keep a focus rhythm, use the Pomodoro Timer', toolSlug: 'pomodoro-timer' },
        { tip: 'For a fixed time limit, use the Countdown Timer', toolSlug: 'countdown-timer' },
        { tip: 'To measure how long a task takes, use the Stopwatch', toolSlug: 'stopwatch' },
        { tip: 'To find how far apart two dates are, use Date Difference', toolSlug: 'date-difference' },
        { tip: 'To count workdays excluding weekends, use Business Days', toolSlug: 'business-days' },
        { tip: 'To remind yourself to rest, use the Break Reminder', toolSlug: 'break-reminder' },
      ],
    },
    faq: {
      zh: [
        { q: '番茄鐘可以自訂工作與休息時間嗎？', a: '可以，你能依自己的節奏調整專注與休息的長度。' },
        { q: '關掉分頁後計時器還會繼續嗎？', a: '計時主要在目前分頁執行，建議讓分頁保持開啟以確保準確。' },
        { q: '工作日計算會自動扣掉國定假日嗎？', a: '工作日計算主要扣除週末，國定假日因地區而異，需要時請自行調整。' },
        { q: '這些時間工具需要安裝 App 嗎？', a: '不需要，全部在瀏覽器執行，手機與電腦都能直接使用。' },
        { q: '倒數計時時間到會有提醒嗎？', a: '會以提示音或畫面變化提醒，請確認裝置音量已開啟。' },
      ],
      en: [
        { q: 'Can I customize the Pomodoro work and break times?', a: 'Yes, you can set the focus and break lengths to fit your rhythm.' },
        { q: 'Will the timer keep running if I close the tab?', a: 'Timing runs in the active tab, so keep it open for accuracy.' },
        { q: 'Does Business Days exclude public holidays?', a: 'It mainly excludes weekends; holidays vary by region, so adjust as needed.' },
        { q: 'Do I need to install an app?', a: 'No, everything runs in the browser on both mobile and desktop.' },
        { q: 'Will the countdown alert me when time is up?', a: 'Yes, with a sound or visual cue, so make sure your volume is on.' },
      ],
    },
    relatedCategories: ['money', 'study', 'random'],
    toolBlurbs: {
      'pomodoro-timer': {
        zh: '以工作、短休息與長休息循環安排專注時段，搭配提示音維持節奏，適合讀書、寫作與遠距工作時對抗分心。',
        en: 'Run focus and break cycles with audio cues to keep a steady rhythm for studying, writing, or remote work.',
      },
      'countdown-timer': {
        zh: '設定一段時間後清楚倒數，時間到會提醒，適合簡報、考試練習、烹飪或運動間歇等需要固定時限的情境。',
        en: 'Set a duration and count down clearly with an alert, ideal for presentations, exam practice, cooking, or interval training.',
      },
      stopwatch: {
        zh: '精準計時並支援暫停、重設與記錄圈速，方便量測單一任務耗時、運動分段或會議各議程實際花費的時間。',
        en: 'Time tasks precisely with pause, reset, and lap support to measure how long a single activity really takes.',
      },
      'date-difference': {
        zh: '選擇兩個日期，立即算出相隔的天數、週數或月數，常用於計算合約天數、專案工期或活動倒數。',
        en: 'Pick two dates to instantly get the days, weeks, or months between them for contracts, projects, or countdowns.',
      },
      'age-calculator': {
        zh: '輸入出生日期，計算精確的實歲與距離下次生日還有幾天，適合填表、報名與快速確認年齡資格。',
        en: 'Enter a birth date to find the exact age and a countdown to the next birthday for forms and sign-ups.',
      },
      'business-days': {
        zh: '估算兩個日期之間扣除週末的工作天數，方便抓出交付期限、請假天數或專案的實際可用工作日。',
        en: 'Estimate the number of workdays between two dates, excluding weekends, for deadlines and leave planning.',
      },
      'break-reminder': {
        zh: '設定固定間隔提醒自己起身、看遠方或喝水，協助長時間使用電腦的人養成規律休息、減少久坐與眼睛疲勞。',
        en: 'Set gentle interval reminders to stand up, look away, or drink water during long sessions at the screen.',
      },
      'timestamp-converter': {
        zh: '在 Unix 時間戳、UTC、ISO 與本機日期時間之間互相轉換，是工程師除錯、處理 API 與紀錄檔時常用的小工具。',
        en: 'Convert between Unix timestamps, UTC, ISO, and local date-time — handy for debugging, APIs, and log files.',
      },
    },
  },

  random: {
    title: {
      zh: '隨機與抽籤免費工具｜抽號碼、抽名字、分組、轉盤 - FunnyTools',
      en: 'Random Pickers & Generators | Free Tools - FunnyTools',
    },
    metaDescription: {
      zh: '免費隨機工具：隨機數字、姓名抽籤、隨機分組、骰子、轉盤、密碼與顏色產生器。公平即時、瀏覽器本機處理，適合課堂、團體活動、公平抽選與日常決策使用。',
      en: 'Free random tools: random numbers, name picker, group maker, dice, wheel, password and color generators. Fair, instant, processed locally.',
    },
    h1: { zh: '隨機與抽籤免費工具', en: 'Free Random & Picker Tools' },
    intro: {
      zh: [
        '隨機工具分類提供各種公平、即時的抽選與產生器，包括隨機數字、姓名抽籤、分組、骰子、轉盤，以及密碼、顏色與 UUID 產生器。當你需要一個不帶偏心的結果時，這些工具都能在瀏覽器中一鍵完成。',
        '在教學與活動場合，隨機點名、抽籤與分組能讓每個人都有公平的機會，也讓流程更有趣；在日常生活中，二選一決定器與今天吃什麼則專治選擇困難，幫你快速放下猶豫。對開發者而言，密碼與 UUID 產生器則是處理帳號安全與測試資料的好幫手。',
        '這些隨機結果都在你的裝置本機產生，名單與輸入內容不會上傳到伺服器，使用起來安心。所有工具免費、免註冊，介面簡單，無論是課堂、聚會、直播抽獎還是日常決定，都能立刻派上用場。',
      ],
      en: [
        'The Random category offers fair, instant pickers and generators — random numbers, name draws, grouping, dice, a spinning wheel, plus password, color, and UUID generators. Whenever you need an unbiased result, these tools deliver it in one click.',
        'In classrooms and events, random roll call, draws, and grouping give everyone a fair chance and make activities more fun; in daily life, This or That and What to Eat cure decision fatigue. For developers, the password and UUID generators help with account security and test data. Results are generated locally and lists are never uploaded.',
      ],
    },
    useCases: {
      zh: [
        '課堂隨機點名與公平分組',
        '活動或直播抽獎抽出幸運兒',
        '午餐晚餐不知道吃什麼時隨機決定',
        '為帳號產生高強度密碼',
        '設計或簡報時尋找配色靈感',
        '開發測試時批次產生 UUID',
      ],
      en: [
        'Fair random roll call and grouping in class',
        'Draw winners for events or live streams',
        "Decide what to eat when you can't choose",
        'Generate strong passwords for accounts',
        'Find color palette ideas for design or slides',
        'Batch-generate UUIDs for development and testing',
      ],
    },
    howToChoose: {
      zh: [
        { tip: '要抽一組亂數號碼，用隨機數字產生器', toolSlug: 'random-number-picker' },
        { tip: '要從名單抽人，用隨機姓名抽籤', toolSlug: 'random-name-picker' },
        { tip: '要把名單分組，用隨機分組工具', toolSlug: 'random-group-generator' },
        { tip: '想用視覺化方式抽選，用轉盤抽籤', toolSlug: 'random-wheel' },
        { tip: '要產生安全密碼，用密碼產生器', toolSlug: 'password-generator' },
        { tip: '猶豫不決時，用二選一決定器', toolSlug: 'this-or-that' },
      ],
      en: [
        { tip: 'To draw random numbers, use the Random Number Picker', toolSlug: 'random-number-picker' },
        { tip: 'To pick names from a list, use the Random Name Picker', toolSlug: 'random-name-picker' },
        { tip: 'To split a list into groups, use the Random Group Generator', toolSlug: 'random-group-generator' },
        { tip: 'For a visual pick, use the Random Wheel', toolSlug: 'random-wheel' },
        { tip: 'To create secure passwords, use the Password Generator', toolSlug: 'password-generator' },
        { tip: "When you can't decide, use This or That", toolSlug: 'this-or-that' },
      ],
    },
    faq: {
      zh: [
        { q: '抽選結果是真的隨機嗎？', a: '工具使用瀏覽器內建的亂數產生器，對一般教學與活動用途已足夠公平。' },
        { q: '可以避免同一個人被重複抽到嗎？', a: '可以，隨機點名與部分工具支援抽過不重複，直到全部輪完。' },
        { q: '我貼上的名單會被儲存嗎？', a: '不會，名單只在你的瀏覽器本機處理，不會上傳或保存到伺服器。' },
        { q: '密碼產生器產生的密碼安全嗎？', a: '密碼在本機產生且不外傳，建議搭配足夠長度與多種字元類型使用。' },
        { q: '適合用在正式抽獎嗎？', a: '適合一般活動與課堂；若為具法律效力的抽獎，建議搭配公開、可稽核的流程。' },
      ],
      en: [
        { q: 'Are the results truly random?', a: "Tools use the browser's built-in random generator, which is fair enough for classroom and event use." },
        { q: 'Can I avoid picking the same person twice?', a: 'Yes, several tools support no-repeat picks until everyone has had a turn.' },
        { q: 'Is my pasted list stored?', a: 'No, lists are processed locally and never uploaded or saved to a server.' },
        { q: 'Are generated passwords secure?', a: "They're created locally and not transmitted; use a good length and mix of character types." },
        { q: 'Can I use these for official prize draws?', a: 'They suit general events; for legally binding draws, pair with an open, auditable process.' },
      ],
    },
    relatedCategories: ['study', 'text', 'time'],
    toolBlurbs: {
      'random-number-picker': {
        zh: '設定最小值、最大值與要抽出的數量，立即產生一組隨機整數，適合抽獎號碼、隨機座號或任何需要公平亂數的場合。',
        en: 'Set a range and quantity to instantly draw random integers for raffles, seat numbers, or any fair pick.',
      },
      'random-name-picker': {
        zh: '貼上一份名單，就能公平抽出一位或多位名字，適合課堂點名、抽獎、分配工作或決定誰先發言。',
        en: 'Paste a list to fairly pick one or more names for roll call, prizes, or deciding who goes first.',
      },
      'random-group-generator': {
        zh: '把名單依指定組數或每組人數自動隨機分組，省去手動安排的麻煩，常用於分組報告、活動隊伍與遊戲分隊。',
        en: 'Split a list into random teams by group count or size for projects, activities, and games.',
      },
      'dice-roller': {
        zh: '擲出常見骰面並自動加總點數，適合桌遊、教學示範機率，或在沒有實體骰子時快速做出隨機決定。',
        en: 'Roll common dice and total the result for board games, teaching probability, or quick random decisions.',
      },
      'random-wheel': {
        zh: '把自訂選項變成彩色轉盤，轉一下公平抽出一個結果，視覺效果適合直播、課堂與團體活動的抽選環節。',
        en: 'Turn custom options into a colorful spinning wheel for fair picks in classrooms, streams, and events.',
      },
      'password-generator': {
        zh: '依長度與字元規則（大小寫、數字、符號）產生高強度密碼，並可排除易混淆字元，全程在瀏覽器本機完成不外傳。',
        en: 'Create strong passwords from length and character rules, with confusable characters excluded — all done locally.',
      },
      'color-generator': {
        zh: '一鍵產生隨機顏色並顯示 HEX、RGB、HSL 數值與配色靈感，適合設計、簡報配色或單純尋找新鮮的色彩搭配。',
        en: 'Generate random colors with HEX, RGB, HSL values and palette ideas for design and presentations.',
      },
      'what-to-eat': {
        zh: '從內建餐點分類或你自訂的清單中隨機決定下一餐，專治選擇困難，午餐、晚餐不知道吃什麼時用它最快。',
        en: "Randomly decide your next meal from built-in categories or your own list when you can't choose.",
      },
      'this-or-that': {
        zh: '在兩個選項之間以 50/50 機率快速做出決定，幫你在猶豫不決時放下糾結，立刻得到一個明確答案。',
        en: 'Make a quick 50/50 decision between two options to stop hesitating and get a clear answer.',
      },
      'uuid-generator': {
        zh: '一次批次產生符合標準的 UUID v4 識別碼，方便開發者建立資料庫主鍵、測試資料或唯一識別字串。',
        en: 'Generate standard UUID v4 identifiers in batches for database keys, test data, or unique strings.',
      },
    },
  },

  text: {
    title: {
      zh: '文字與寫作免費工具｜字數統計、大小寫、文字清理 - FunnyTools',
      en: 'Text & Writing Tools | Count, Convert & Clean - FunnyTools',
    },
    metaDescription: {
      zh: '免費文字與寫作工具：字數統計、字元計數、大小寫轉換、移除空白行與重複行、JSON 與 CSV 轉換。瀏覽器本機處理，適合寫作、校稿、資料清理與開發工作。',
      en: 'Free text and writing tools: word and character counters, case converter, line cleanup, JSON and CSV converters. Processed locally in your browser.',
    },
    h1: { zh: '文字與寫作免費工具', en: 'Free Text & Writing Tools' },
    intro: {
      zh: [
        '文字與寫作分類收錄了字數統計、大小寫轉換、文字清理與格式轉換等免費工具，讓寫作、編輯與資料整理更有效率。無論是要控制社群貼文字數、整理從各處複製來的雜亂文字，還是在不同資料格式之間轉換，都能在這裡快速處理。',
        '寫作者與學生常用字數與字元統計來符合作業或平台的長度限制；需要整理清單與資料的人，則能用移除空白行、移除重複行與行排序快速清理內容。對工程師與處理資料的人來說，JSON 格式化、Base64、URL 編碼與 CSV／JSON 互轉等工具，能省下不少手動處理的時間。',
        '所有工具都在瀏覽器本機執行，你貼上的文字不會送到伺服器，適合處理草稿、內部資料或含個人資訊的內容。介面直覺、結果即時顯示，多數工具還能一鍵複製或下載，方便接續後面的工作。',
      ],
      en: [
        'The Text & Writing category includes free tools for counting, cleaning, and converting text so writing, editing, and data work go faster. From staying within character limits to tidying messy pasted text and converting between data formats, you can handle it here.',
        'Writers and students use word and character counts to meet length limits, while anyone organizing data can clean blank or duplicate lines and sort content. For developers, JSON formatting, Base64, URL encoding, and CSV/JSON conversion save manual effort. Everything runs locally, so pasted text is never sent to a server.',
      ],
    },
    useCases: {
      zh: [
        '控制社群貼文與表單的字數限制',
        '整理從 PDF 或網頁複製來的雜亂文字',
        '清理名單中的空白行與重複項目',
        '美化或檢查 JSON、轉換 CSV 資料',
        '寫 README 或筆記時即時預覽 Markdown',
      ],
      en: [
        'Stay within character limits for posts and forms',
        'Clean up messy text copied from PDFs or web pages',
        'Remove blank and duplicate lines from lists',
        'Beautify or validate JSON and convert CSV data',
        'Preview Markdown live for READMEs and notes',
      ],
    },
    howToChoose: {
      zh: [
        { tip: '要統計字數與閱讀時間，用字數統計工具', toolSlug: 'word-counter' },
        { tip: '要對照平台字元限制，用字元計數器', toolSlug: 'character-counter' },
        { tip: '要清掉多餘空行，用移除空白行', toolSlug: 'remove-empty-lines' },
        { tip: '要去除重複項目，用移除重複行', toolSlug: 'remove-duplicate-lines' },
        { tip: '要整理或檢查 JSON，用 JSON 格式化', toolSlug: 'json-formatter' },
        { tip: '要把試算表資料轉成 JSON，用 CSV 轉 JSON', toolSlug: 'csv-to-json' },
      ],
      en: [
        { tip: 'To count words and reading time, use the Word Counter', toolSlug: 'word-counter' },
        { tip: 'To match platform character limits, use the Character Counter', toolSlug: 'character-counter' },
        { tip: 'To remove extra blank lines, use Remove Empty Lines', toolSlug: 'remove-empty-lines' },
        { tip: 'To drop duplicates, use Remove Duplicate Lines', toolSlug: 'remove-duplicate-lines' },
        { tip: 'To tidy or check JSON, use the JSON Formatter', toolSlug: 'json-formatter' },
        { tip: 'To turn spreadsheet data into JSON, use CSV to JSON', toolSlug: 'csv-to-json' },
      ],
    },
    faq: {
      zh: [
        { q: '這些文字工具會儲存我貼上的內容嗎？', a: '不會，所有處理都在瀏覽器本機完成，文字不會上傳到伺服器。' },
        { q: '字數統計支援中文嗎？', a: '支援，工具會計算字元與字數，中英文皆可使用。' },
        { q: '處理大量文字會不會很慢？', a: '多數工具能順暢處理一般長度的文字；極大量內容可能受裝置效能影響。' },
        { q: 'JSON 格式化會幫我修正錯誤嗎？', a: '它會指出語法錯誤的位置，但不會自動猜測修正，需由你調整內容。' },
        { q: '轉換後的資料可以下載嗎？', a: '多數工具支援一鍵複製，部分格式轉換工具可直接下載結果。' },
      ],
      en: [
        { q: 'Do these tools store the text I paste?', a: 'No, all processing happens locally and text is not uploaded.' },
        { q: 'Do the counters support Chinese?', a: 'Yes, they count characters and words for both Chinese and English.' },
        { q: 'Will large amounts of text be slow?', a: 'Normal-length text is handled smoothly; very large input depends on your device.' },
        { q: 'Does the JSON formatter fix errors for me?', a: "It points to syntax errors but won't guess fixes; you adjust the content." },
        { q: 'Can I download the converted data?', a: 'Most tools support one-click copy, and some converters let you download results.' },
      ],
    },
    relatedCategories: ['image', 'pdf', 'random'],
    toolBlurbs: {
      'word-counter': {
        zh: '即時計算字數、字元、行數、段落與預估閱讀時間，適合寫作業、社群貼文、SEO 文章或任何有字數上限的稿件。',
        en: 'Count words, characters, lines, paragraphs, and reading time live for essays, posts, and length-limited copy.',
      },
      'character-counter': {
        zh: '即時統計字元、UTF-8 位元組、單字與行數，並對照常見平台字數限制，發推文、寫簡介或填表單前先確認長度。',
        en: 'Count characters, UTF-8 bytes, words, and lines against common platform limits before you post or submit.',
      },
      'case-converter': {
        zh: '一鍵在全大寫、全小寫、首字母大寫與句首大寫之間轉換英文文字，整理標題、程式碼或匯入資料時很實用。',
        en: 'Convert text between upper, lower, title, and sentence case in one click for titles, code, or imports.',
      },
      'remove-empty-lines': {
        zh: '清除貼上文字中多餘的空白行，讓段落、清單或資料更緊湊整齊，特別適合整理從 PDF 或網頁複製來的內容。',
        en: 'Remove extra blank lines from pasted text to keep lists and paragraphs tidy, especially from PDFs or web pages.',
      },
      'remove-duplicate-lines': {
        zh: '保留每一行的唯一值並刪除重複內容，清理 email 名單、關鍵字清單或匯出資料時可快速去除重複項目。',
        en: 'Keep only unique lines and drop duplicates when cleaning email lists, keywords, or exported data.',
      },
      'sort-lines': {
        zh: '把多行文字依字母或數字順序排序，整理清單、名單與資料時一鍵完成，省去手動搬移的時間。',
        en: 'Sort multiline text alphabetically or numerically to organize lists and data in one click.',
      },
      'json-formatter': {
        zh: '將 JSON 美化縮排、壓縮成單行或檢查語法錯誤，是開發、除錯與閱讀 API 回應時方便的整理工具。',
        en: 'Beautify, minify, or validate JSON to read API responses and debug data more easily.',
      },
      base64: {
        zh: '在 Base64 與 UTF-8 純文字之間安全互轉，常用於處理資料 URI、設定檔或在系統間傳遞文字內容。',
        en: 'Safely convert between Base64 and UTF-8 text for data URIs, config files, or passing text between systems.',
      },
      'url-encoder': {
        zh: '對網址參數與查詢字串進行編碼或解碼，處理含中文、空格或特殊符號的連結時避免亂碼與錯誤。',
        en: 'Encode or decode URL parameters and query strings to avoid issues with spaces and special characters.',
      },
      'csv-to-json': {
        zh: '正確解析含逗號與引號的 CSV，轉成格式化 JSON，方便把試算表資料匯入程式或 API。',
        en: 'Parse CSV with commas and quotes correctly and convert it into formatted JSON for code or APIs.',
      },
      'json-to-csv': {
        zh: '將 JSON 物件陣列轉成標準 CSV，方便把資料下載後用 Excel 或 Google 試算表開啟與分析。',
        en: 'Convert arrays of JSON objects into standard CSV to open and analyze in Excel or Google Sheets.',
      },
      'markdown-previewer': {
        zh: '一邊輸入 Markdown 一邊即時看到安全渲染後的結果，寫 README、筆記或部落格草稿時方便確認排版。',
        en: 'Type Markdown and see a safely rendered preview instantly for READMEs, notes, and blog drafts.',
      },
    },
  },

  image: {
    title: {
      zh: '圖片與檔案免費工具｜圖片壓縮、轉檔、尺寸調整 - FunnyTools',
      en: 'Image Tools | Compress, Convert & Resize - FunnyTools',
    },
    metaDescription: {
      zh: '免費圖片工具：圖片壓縮、裁切、旋轉翻轉、尺寸調整、PNG／JPG／WebP 轉檔、轉 Base64 與 QR Code。全部在瀏覽器本機處理，圖片不上傳。',
      en: 'Free image tools: compress, crop, rotate, resize, convert PNG/JPG/WebP, image to Base64, and QR codes. All processed locally — images never uploaded.',
    },
    h1: { zh: '圖片與檔案免費工具', en: 'Free Image & File Tools' },
    intro: {
      zh: [
        '圖片與檔案分類提供圖片壓縮、裁切、旋轉翻轉、尺寸調整、格式轉換、轉 Base64 與 QR Code 產生等免費工具，全部在瀏覽器本機處理，圖片不會上傳到任何伺服器。當你需要為網站、社群或表單準備合適的圖片時，這些工具能快速完成常見的處理。',
        '想讓網頁載入更快或符合上傳容量限制，可以用圖片壓縮與 JPG 轉 WebP 來縮小檔案；需要特定尺寸的大頭貼、縮圖或封面時，圖片尺寸調整能維持比例輸出新檔，圖片裁切則能拖曳框出想保留的部分。手機拍歪或掃描方向錯誤時，旋轉翻轉工具可一鍵轉正。',
        'PNG、JPG、WebP 之間的互轉工具能解決不同平台對格式的要求；圖片轉 Base64 方便把小圖示內嵌到 HTML 或 CSS；QR Code 產生器則把網址或文字變成方便掃描的條碼。因為所有處理都在本機完成，即使是含個人資訊或尚未公開的圖片也能安心使用，無需擔心檔案外流。',
      ],
      en: [
        'The Image & File category provides free tools for compressing, cropping, rotating, resizing, and converting images, plus image-to-Base64 and QR codes — all processed locally in your browser so images are never uploaded. When you need the right image for a site, social post, or form, these tools handle common tasks quickly.',
        'Compress images or convert JPG to WebP to load faster and meet upload limits; resize for avatars, thumbnails, or covers while keeping proportions, and crop by dragging to keep just the part you want. When a phone shot is tilted or a scan is sideways, the rotate and flip tool straightens it in one click.',
        'Conversions between PNG, JPG, and WebP solve format requirements; image-to-Base64 embeds small icons in HTML or CSS; and the QR code generator turns links or text into scannable codes. Because everything runs locally, even private or unpublished images are safe to use without worrying about uploads.',
      ],
    },
    useCases: {
      zh: [
        '壓縮圖片以加快網站載入或符合上傳限制',
        '裁切圖片製作方形大頭貼或擷取重點',
        '把拍歪或掃描方向錯誤的圖片轉正',
        '在 PNG、JPG、WebP 之間轉換格式',
        '把小圖示轉成 Base64 內嵌到網頁',
        '為海報、名片或菜單製作 QR Code',
      ],
      en: [
        'Compress images to speed up sites or meet upload limits',
        'Crop a square avatar or grab the key part of an image',
        'Straighten tilted photos or sideways scans',
        'Convert between PNG, JPG, and WebP formats',
        'Turn small icons into Base64 to embed in a page',
        'Create QR codes for posters, cards, or menus',
      ],
    },
    howToChoose: {
      zh: [
        { tip: '想縮小圖片檔案，用圖片壓縮', toolSlug: 'image-compressor' },
        { tip: '要框出並保留圖片局部，用圖片裁切工具', toolSlug: 'image-crop' },
        { tip: '要把圖片轉正或做鏡像，用圖片旋轉翻轉工具', toolSlug: 'image-rotate-flip' },
        { tip: '要調整圖片寬高，用圖片尺寸調整', toolSlug: 'image-resizer' },
        { tip: '想讓網站圖片更小更快，用 JPG 轉 WebP', toolSlug: 'jpg-to-webp' },
        { tip: '要把圖片內嵌到網頁，用圖片轉 Base64', toolSlug: 'image-to-base64' },
        { tip: '要製作可掃描的條碼，用 QR Code 產生器', toolSlug: 'qr-code-generator' },
      ],
      en: [
        { tip: 'To shrink image files, use the Image Compressor', toolSlug: 'image-compressor' },
        { tip: 'To keep just part of an image, use the Image Cropper', toolSlug: 'image-crop' },
        { tip: 'To straighten or mirror an image, use Image Rotate & Flip', toolSlug: 'image-rotate-flip' },
        { tip: 'To change width and height, use the Image Resizer', toolSlug: 'image-resizer' },
        { tip: 'To make site images smaller and faster, use JPG to WebP', toolSlug: 'jpg-to-webp' },
        { tip: 'To embed an image in a page, use Image to Base64', toolSlug: 'image-to-base64' },
        { tip: 'To make a scannable code, use the QR Code Generator', toolSlug: 'qr-code-generator' },
      ],
    },
    faq: {
      zh: [
        { q: '圖片會被上傳到伺服器嗎？', a: '不會，所有圖片都在你的瀏覽器本機處理，不會外流。' },
        { q: '壓縮會讓畫質明顯變差嗎？', a: '壓縮會在檔案大小與畫質間取捨，多數工具可調整品質以取得平衡。' },
        { q: '支援哪些圖片格式？', a: '常見的 JPG、PNG、WebP 都支援，並提供彼此之間的轉換。' },
        { q: '可以一次處理多張圖片嗎？', a: '視工具而定，部分工具支援多檔處理，請參考各工具頁的說明。' },
        { q: 'QR Code 產生後可以商用嗎？', a: '可以，產生的 QR Code 可自由使用，內容由你提供。' },
      ],
      en: [
        { q: 'Are images uploaded to a server?', a: 'No, all images are processed locally in your browser.' },
        { q: 'Will compression noticeably reduce quality?', a: 'Compression trades size for quality; most tools let you adjust the quality.' },
        { q: 'Which formats are supported?', a: 'Common JPG, PNG, and WebP, with conversions between them.' },
        { q: 'Can I process multiple images at once?', a: "It depends on the tool; some support multiple files — check each tool's page." },
        { q: 'Can I use the QR codes commercially?', a: 'Yes, generated QR codes are free to use; the content is yours.' },
      ],
    },
    relatedCategories: ['pdf', 'text', 'draw'],
    toolBlurbs: {
      'image-compressor': {
        zh: '在瀏覽器本機壓縮 JPG、PNG、WebP 圖片以縮小檔案大小，加快網站載入或符合上傳限制，圖片不會上傳到伺服器。',
        en: 'Reduce JPG, PNG, and WebP file size locally to speed up sites or meet upload limits — images never leave your browser.',
      },
      'image-resizer': {
        zh: '自訂寬高調整圖片大小並可維持比例，輸出新檔案，適合製作大頭貼、縮圖或符合平台尺寸要求的圖片。',
        en: 'Resize images to custom dimensions while keeping proportions for avatars, thumbnails, or platform requirements.',
      },
      'image-crop': {
        zh: '上傳圖片後直接在預覽上拖曳框選要保留的範圍，即時顯示裁切尺寸並下載，適合方形大頭貼或擷取截圖重點。',
        en: 'Upload an image, drag on the preview to select the area to keep, see the crop size live, and download — great for avatars or screenshots.',
      },
      'image-rotate-flip': {
        zh: '一鍵向左、向右旋轉 90 度或水平、垂直翻轉圖片，預覽即時更新後下載，適合修正拍歪的照片或掃描方向。',
        en: 'Rotate 90 degrees left or right, or flip horizontally or vertically with a live preview, then download — fixes tilted photos or scans.',
      },
      'image-to-base64': {
        zh: '把圖片轉成 Base64 資料 URI，可一鍵複製字串或 CSS 寫法，方便把小圖示內嵌到 HTML 或 CSS，減少額外請求。',
        en: 'Convert an image to a Base64 data URI with one-click copy or a CSS snippet, embedding small icons in HTML or CSS to cut requests.',
      },
      'png-to-jpg': {
        zh: '把 PNG 圖片轉成 JPG，並可用自選背景色填補透明區域，常用於縮小檔案或符合只接受 JPG 的上傳系統。',
        en: 'Convert PNG images to JPG with a chosen background color to shrink files or meet JPG-only upload systems.',
      },
      'jpg-to-png': {
        zh: '在瀏覽器本機把 JPG 或其他格式圖片輸出成無損 PNG，適合需要透明背景或更高品質的後續編輯。',
        en: 'Convert JPG or other images to lossless PNG locally for transparency or higher-quality editing.',
      },
      'qr-code-generator': {
        zh: '把網址、文字或聯絡資訊轉成 QR Code 並下載，適合海報、名片、菜單或活動報到等線下到線上的導引。',
        en: 'Turn links, text, or contact details into a downloadable QR code for posters, cards, menus, and events.',
      },
      'jpg-to-webp': {
        zh: '將 JPG 轉成更小巧的 WebP 格式並可調整品質，幫網站圖片大幅瘦身、提升載入速度與 Core Web Vitals。',
        en: 'Convert JPG to the smaller WebP format with quality control to speed up sites and improve Core Web Vitals.',
      },
      'webp-to-jpg': {
        zh: '把 WebP 圖片轉回相容性更高的 JPG 並可設定背景色，方便在不支援 WebP 的軟體或平台上使用。',
        en: "Convert WebP back to widely compatible JPG with a chosen background for apps that don't support WebP.",
      },
    },
  },

  pdf: {
    title: {
      zh: 'PDF 免費工具｜合併、拆分、旋轉、壓縮 PDF - FunnyTools',
      en: 'PDF Tools | Merge, Split, Rotate & Compress - FunnyTools',
    },
    metaDescription: {
      zh: '免費 PDF 工具：合併、拆分、旋轉、刪除與擷取頁面、重新排序、轉圖片與壓縮。瀏覽器本機處理，檔案不上傳，適合整理報告、掃描文件與機密資料。',
      en: 'Free PDF tools: merge, split, rotate, delete and extract pages, reorder, convert to image, and compress. Processed locally — nothing uploaded.',
    },
    h1: { zh: 'PDF 免費工具', en: 'Free PDF Tools' },
    intro: {
      zh: [
        'PDF 工具分類集合了合併、拆分、旋轉、刪除與擷取頁面、重新排序、轉圖片與壓縮等免費功能，協助你整理日常的文件、報告、合約與教材。所有 PDF 都在瀏覽器本機處理，檔案不會上傳到伺服器，特別適合處理含敏感資訊的文件。',
        '需要把多份檔案整合成一份時可以用 PDF 合併；想分發特定章節或抽出重點頁，則能用拆分、擷取或刪除頁面來精簡內容。掃描方向錯誤或頁序顛倒時，旋轉與重新排序工具能快速修正，讓文件閱讀與列印更順手。',
        '此外，PDF 轉圖片方便把內容貼到簡報或社群，PDF 壓縮則能在寄送 email 或上傳有容量限制的系統前縮小檔案。這些工具免費、免註冊，介面以「上傳—操作—下載」為主，不需要安裝任何桌面軟體就能完成大部分的文件整理工作。',
      ],
      en: [
        'The PDF category gathers free tools to merge, split, rotate, delete and extract pages, reorder, convert to images, and compress — helping you organize documents, reports, contracts, and teaching materials. All PDFs are processed locally, so files are never uploaded, which is ideal for sensitive documents.',
        'Combine several files into one with Merge PDF, or slim content down by splitting, extracting, or deleting pages. Rotate and reorder fix scans that are sideways or out of order, while PDF to Image and PDF Compressor help you share or send files. These tools are free, need no sign-up, and require no desktop software.',
      ],
    },
    useCases: {
      zh: [
        '把多份報告或附件合併成一份 PDF',
        '從合約或教材中抽出需要的頁面',
        '刪除空白頁或不需要分享的內容',
        '修正掃描方向錯誤或頁序顛倒的文件',
        '壓縮 PDF 以方便 email 寄送或上傳',
      ],
      en: [
        'Merge several reports or attachments into one PDF',
        'Extract the pages you need from a contract or textbook',
        "Delete blank pages or content you won't share",
        'Fix scans with wrong orientation or page order',
        'Compress a PDF for email or upload limits',
      ],
    },
    howToChoose: {
      zh: [
        { tip: '要把多份 PDF 整合，用 PDF 合併', toolSlug: 'merge-pdf' },
        { tip: '要把一份 PDF 拆成多份，用 PDF 拆分', toolSlug: 'split-pdf' },
        { tip: '只想保留特定頁面，用擷取 PDF 頁面', toolSlug: 'extract-pdf-pages' },
        { tip: '要移除不需要的頁面，用刪除 PDF 頁面', toolSlug: 'delete-pdf-pages' },
        { tip: '掃描方向錯誤時，用 PDF 旋轉', toolSlug: 'rotate-pdf' },
        { tip: '要縮小 PDF 檔案，用 PDF 壓縮工具', toolSlug: 'pdf-compressor' },
      ],
      en: [
        { tip: 'To combine several PDFs, use Merge PDF', toolSlug: 'merge-pdf' },
        { tip: 'To split one PDF into several, use Split PDF', toolSlug: 'split-pdf' },
        { tip: 'To keep only certain pages, use Extract PDF Pages', toolSlug: 'extract-pdf-pages' },
        { tip: 'To remove unwanted pages, use Delete PDF Pages', toolSlug: 'delete-pdf-pages' },
        { tip: 'When a scan is sideways, use Rotate PDF', toolSlug: 'rotate-pdf' },
        { tip: 'To shrink a PDF file, use the PDF Compressor', toolSlug: 'pdf-compressor' },
      ],
    },
    faq: {
      zh: [
        { q: '我的 PDF 會被上傳嗎？', a: '不會，所有 PDF 都在瀏覽器本機處理，檔案不會送到伺服器，適合機密文件。' },
        { q: 'PDF 壓縮能縮小多少？', a: '壓縮幅度依檔案內容而定，以掃描圖片為主的 PDF 通常較有空間，純文字檔效果有限。' },
        { q: '合併或拆分有檔案數量限制嗎？', a: '沒有硬性限制，但檔案過大或過多時會受裝置記憶體影響。' },
        { q: '處理後的 PDF 會有浮水印嗎？', a: '不會，本站工具不會在輸出檔案加上浮水印。' },
        { q: '可以編輯 PDF 內的文字嗎？', a: '目前工具著重在頁面層級的整理（合併、拆分、旋轉等），尚不支援直接編輯內文。' },
      ],
      en: [
        { q: 'Is my PDF uploaded?', a: 'No, all PDFs are processed locally, so files never reach a server — good for confidential documents.' },
        { q: 'How much can the PDF compressor reduce size?', a: 'It varies by content; scan-heavy PDFs compress more, text-only files less.' },
        { q: 'Is there a file limit for merge or split?', a: 'No hard limit, but very large or many files depend on device memory.' },
        { q: 'Do processed PDFs have a watermark?', a: 'No, our tools never add watermarks to output files.' },
        { q: 'Can I edit the text inside a PDF?', a: "Tools focus on page-level tasks like merge, split, and rotate; editing body text isn't supported yet." },
      ],
    },
    relatedCategories: ['image', 'text', 'draw'],
    toolBlurbs: {
      'merge-pdf': {
        zh: '選取多個 PDF、調整先後順序後合併成一份檔案，整理報告、合約附件或掃描文件時很方便，檔案全程不離開瀏覽器。',
        en: 'Combine multiple PDFs in your chosen order into one file — all locally, with nothing uploaded.',
      },
      'split-pdf': {
        zh: '把一份 PDF 每頁拆開，或依自訂頁碼範圍輸出成多份檔案，適合分發特定章節或抽出需要的部分。',
        en: 'Split a PDF into single pages or custom page-range files to share specific sections.',
      },
      'images-to-pdf': {
        zh: '把多張 JPG 或 PNG 依順序整理成一份 PDF，適合把掃描照片、收據或手寫筆記整合成單一文件。',
        en: 'Turn ordered JPG or PNG images into one PDF, ideal for scanned photos, receipts, or notes.',
      },
      'rotate-pdf': {
        zh: '將整份 PDF 或指定頁面旋轉 90、180 或 270 度，修正掃描時方向錯誤的頁面，閱讀與列印更順手。',
        en: 'Rotate the whole PDF or selected pages by 90, 180, or 270 degrees to fix scan orientation.',
      },
      'delete-pdf-pages': {
        zh: '輸入要移除的頁碼範圍，產生不含那些頁面的新 PDF，快速去掉空白頁、廣告頁或不需要分享的內容。',
        en: 'Remove selected page ranges and download a new PDF without the blank or unwanted pages.',
      },
      'extract-pdf-pages': {
        zh: '依你輸入的順序保留指定頁面，輸出一份精簡的新 PDF，適合只抽出合約重點頁或教材的特定章節。',
        en: 'Keep selected pages in your chosen order and download a slimmer new PDF.',
      },
      'pdf-page-reorder': {
        zh: '在瀏覽器內拖曳調整 PDF 頁面順序，重新排列掃描順序顛倒或章節錯置的文件，整理後直接下載。',
        en: 'Drag to rearrange PDF pages locally and download the reordered document.',
      },
      'pdf-to-image': {
        zh: '把 PDF 各頁轉成 PNG 或 JPG 圖片，方便貼到簡報、社群貼文或在不支援 PDF 的地方預覽內容。',
        en: 'Convert PDF pages into PNG or JPG images to paste into slides, posts, or previews.',
      },
      'pdf-compressor': {
        zh: '重新整理 PDF 內部結構並嘗試縮小檔案大小，方便以 email 寄送或上傳到有容量限制的系統。實際壓縮幅度依檔案內容而定。',
        en: 'Rewrite the PDF structure to try to reduce file size for email or upload limits. Actual reduction varies by content.',
      },
    },
  },

  draw: {
    title: {
      zh: '製圖與圖表免費工具｜2D CAD、流程圖、長條圖、圓餅圖 - FunnyTools',
      en: 'Drawing & Chart Tools | CAD, Flowcharts & Charts - FunnyTools',
    },
    metaDescription: {
      zh: '免費製圖與圖表工具：2D CAD 製圖板、線上繪圖板、流程圖、長條圖與圓餅圖製作。免安裝即可在瀏覽器繪製並匯出 PNG／SVG，適合草稿與簡報。',
      en: 'Free drawing and chart tools: 2D CAD board, sketchpad, flowchart, bar chart, and pie chart makers. Draw in your browser and export PNG/SVG.',
    },
    h1: { zh: '製圖與圖表免費工具', en: 'Free Drawing & Chart Tools' },
    intro: {
      zh: [
        '製圖工具分類提供簡易的 2D 製圖板、線上繪圖板、流程圖，以及長條圖與圓餅圖製作工具，讓你不必安裝專業 CAD 或繪圖軟體，就能在瀏覽器中畫出基本圖形、示意圖與資料圖表。無論是教學、報告還是隨手記錄想法，都能快速上手。',
        '2D CAD 製圖板適合在網格上畫線段、矩形、圓形與折線，做簡單的平面配置或尺寸示意；線上繪圖板提供畫筆、顏色與橡皮擦，適合自由手繪、註記與塗鴉；流程圖工具能建立節點與箭頭，畫出流程、決策樹或步驟圖；長條圖與圓餅圖製作工具則讓你輸入資料即時產生圖表，方便視覺化數據。',
        '這些工具都著重在「簡單、即時」，並支援把成果匯出成 PNG 或 SVG，方便貼到文件、簡報或網頁中。所有繪製都在瀏覽器本機完成，免註冊也免安裝。若你需要的是複雜的工程製圖或專業向量編輯，仍建議搭配專門軟體使用。',
      ],
      en: [
        'The Drawing category offers a simple 2D CAD board, an online sketchpad, a flowchart maker, and bar and pie chart makers, so you can draw basic shapes, diagrams, and data charts in the browser without professional CAD or design software — handy for teaching, reports, or jotting down ideas.',
        'The 2D CAD board suits lines, rectangles, circles, and polylines on a grid; the sketchpad offers brush, color, and eraser for freehand notes; the flowchart tool builds nodes and arrows for flows and decision trees; and the bar and pie chart makers turn your data into charts instantly. Each supports PNG or SVG export. For complex engineering drawing or professional vector editing, dedicated software is still recommended.',
      ],
    },
    useCases: {
      zh: [
        '畫簡單的平面配置或尺寸示意圖',
        '在白板上手繪註記或教學示範',
        '製作流程圖、決策樹或步驟圖',
        '用長條圖或圓餅圖視覺化資料',
        '把圖形與圖表匯出成 PNG 或 SVG 貼到報告',
      ],
      en: [
        'Sketch a simple floor plan or diagram',
        'Hand-draw notes or demos on a whiteboard',
        'Make flowcharts, decision trees, or step diagrams',
        'Visualize data with a bar or pie chart',
        'Export drawings and charts as PNG or SVG for reports',
      ],
    },
    howToChoose: {
      zh: [
        { tip: '要畫平面配置或示意圖，用簡易 2D CAD 製圖板', toolSlug: 'cad-2d' },
        { tip: '想自由手繪或註記，用線上繪圖板', toolSlug: 'sketchpad' },
        { tip: '要畫流程或決策圖，用流程圖製作工具', toolSlug: 'flowchart' },
        { tip: '要比較數量大小，用長條圖製作工具', toolSlug: 'bar-chart-maker' },
        { tip: '要呈現占比結構，用圓餅圖製作工具', toolSlug: 'pie-chart-maker' },
      ],
      en: [
        { tip: 'To draw a floor plan or diagram, use the 2D CAD Drawing Board', toolSlug: 'cad-2d' },
        { tip: 'To sketch or annotate freely, use the Online Sketchpad', toolSlug: 'sketchpad' },
        { tip: 'To draw a flow or decision diagram, use the Flowchart Maker', toolSlug: 'flowchart' },
        { tip: 'To compare quantities, use the Bar Chart Maker', toolSlug: 'bar-chart-maker' },
        { tip: 'To show proportions, use the Pie Chart Maker', toolSlug: 'pie-chart-maker' },
      ],
    },
    faq: {
      zh: [
        { q: '這些製圖工具可以取代專業 CAD 嗎？', a: '不行，它們適合簡單示意與教學，複雜的工程製圖仍建議使用專業軟體。' },
        { q: '畫好的圖可以匯出嗎？', a: '可以，支援匯出成 PNG，部分工具還能輸出 SVG。' },
        { q: '作品會自動儲存到雲端嗎？', a: '不會，繪製都在本機進行，請記得自行匯出保存。' },
        { q: '手機可以使用嗎？', a: '可以，但較細緻的繪製在大螢幕與滑鼠操作下會更順手。' },
        { q: '流程圖可以加入多少節點？', a: '沒有硬性上限，但節點過多時建議分圖處理以保持清楚。' },
      ],
      en: [
        { q: 'Can these replace professional CAD?', a: 'No, they suit simple diagrams and teaching; complex engineering drawing needs dedicated software.' },
        { q: 'Can I export my drawing?', a: 'Yes, PNG export is supported, and some tools also export SVG.' },
        { q: 'Are my drawings saved to the cloud?', a: 'No, drawing happens locally, so remember to export and save.' },
        { q: 'Can I use these on mobile?', a: 'Yes, though detailed drawing is easier on a large screen with a mouse.' },
        { q: 'How many nodes can a flowchart have?', a: 'No hard limit, but split large diagrams to keep them clear.' },
      ],
    },
    relatedCategories: ['image', 'pdf', 'text'],
    toolBlurbs: {
      'cad-2d': {
        zh: '在網格畫布上繪製線段、矩形、圓形與折線，支援移動、縮放與匯出 PNG/SVG，適合畫簡單平面配置或示意圖，免安裝 CAD 軟體。',
        en: 'Draft lines, rectangles, circles, and polylines on a grid with move, zoom, and PNG/SVG export — no CAD install.',
      },
      sketchpad: {
        zh: '用可調顏色與筆刷大小的畫筆在白色畫布自由手繪，支援橡皮擦、復原與 PNG 匯出，適合隨手塗鴉、註記或教學示範。',
        en: 'Draw freehand with adjustable brush color and size, eraser, undo, and PNG export for quick sketches and notes.',
      },
      flowchart: {
        zh: '建立流程矩形、決策菱形與箭頭連線，可拖曳節點、編輯文字並匯出 PNG，適合畫簡單流程、決策樹或教學報告用的圖。',
        en: 'Build simple flowcharts with editable nodes and arrows, drag to arrange, and export as PNG.',
      },
      'bar-chart-maker': {
        zh: '輸入多筆標籤與數值，即時產生長條圖並自動計算刻度，可加上標題並匯出 PNG，適合報告、簡報與教學中比較數量。',
        en: 'Enter labels and values to instantly build a bar chart with auto scaling, add a title, and export PNG for reports and teaching.',
      },
      'pie-chart-maker': {
        zh: '輸入標籤與數值即時產生圓餅圖，自動換算百分比並附上圖例，可匯出 PNG，適合呈現預算、問卷或市占等占比結構。',
        en: 'Enter labels and values to build a pie chart with automatic percentages and a legend, then export PNG for budgets, surveys, or shares.',
      },
    },
  },

  study: {
    title: {
      zh: '學生與老師免費工具｜點名、分組、座位表、成績計算 - FunnyTools',
      en: 'Student & Teacher Tools | Groups, Grades & Roll Call - FunnyTools',
    },
    metaDescription: {
      zh: '免費教學工具：隨機點名、座位表、課堂分組、成績平均與 GPA 計算。瀏覽器本機處理，名單與成績不外傳，適合老師日常備課、課堂活動與成績整理。',
      en: 'Free classroom tools: random student picker, seating chart, group maker, grade average, and GPA calculator. Processed locally for privacy.',
    },
    h1: { zh: '學生與老師免費工具', en: 'Free Tools for Students & Teachers' },
    intro: {
      zh: [
        '學生與老師分類整理了課堂常用的免費工具，包括隨機點名、座位表、分組、成績平均與 GPA 計算器，協助老師處理日常教學庶務，也讓學生方便管理自己的成績。這些工具操作簡單，打開網頁即可使用，很適合在課堂上即時操作。',
        '上課時，隨機點名與分組工具能讓提問與活動更公平、更有參與感；座位表產生器則方便開學安排或考試座位。需要結算成績時，成績平均與 GPA 計算器能快速算出總分、加權平均與 GPA，省去手動計算的時間與出錯的機會。',
        '所有工具都在瀏覽器本機執行，輸入的學生名單與成績不會上傳到伺服器，能更安心地處理班級資料。免費、免註冊、支援手機與電腦，無論是課堂教學、課後輔導還是學生自學，都能成為實用的小幫手。',
      ],
      en: [
        'The Students & Teachers category collects free classroom tools — random student picker, seating chart, group maker, grade average, and GPA calculator — to help teachers handle daily tasks and let students manage their grades. They are simple to use and work right in the browser, even live in class.',
        'During lessons, random picking and grouping make participation fair and engaging, while the seating chart helps with term or exam arrangements. At grading time, the average and GPA calculators quickly compute totals, weighted averages, and GPA. Everything runs locally, so student lists and grades are never uploaded.',
      ],
    },
    useCases: {
      zh: [
        '課堂上公平隨機點名與抽選',
        '替分組活動或專案快速分組',
        '開學或考試安排教室座位',
        '結算學期成績的加權平均',
        '申請學校或獎學金前估算 GPA',
      ],
      en: [
        'Fair random roll call and picking in class',
        'Quickly group students for activities or projects',
        'Arrange classroom seating for term or exams',
        'Calculate weighted averages for term grades',
        'Estimate GPA before applications or scholarships',
      ],
    },
    howToChoose: {
      zh: [
        { tip: '要公平點名，用隨機點名工具', toolSlug: 'random-student-picker' },
        { tip: '要安排教室座位，用座位表產生器', toolSlug: 'seating-chart' },
        { tip: '要替活動分組，用課堂分組工具', toolSlug: 'group-generator' },
        { tip: '要估算 GPA，用 GPA 計算器', toolSlug: 'gpa-calculator' },
      ],
      en: [
        { tip: 'For fair roll call, use the Random Student Picker', toolSlug: 'random-student-picker' },
        { tip: 'To arrange classroom seating, use the Seating Chart', toolSlug: 'seating-chart' },
        { tip: 'To group students for activities, use the Class Group Generator', toolSlug: 'group-generator' },
        { tip: 'To estimate GPA, use the GPA Calculator', toolSlug: 'gpa-calculator' },
      ],
    },
    faq: {
      zh: [
        { q: '學生名單與成績會被上傳嗎？', a: '不會，所有資料都在你的瀏覽器本機處理，不會上傳到伺服器。' },
        { q: '隨機點名可以避免重複嗎？', a: '可以，能設定抽過不重複，直到全班都被點過為止。' },
        { q: 'GPA 計算器用的是哪種制度？', a: '以常見的 4.3 制估算，若學校採用不同制度，結果僅供參考。' },
        { q: '成績計算支援加權平均嗎？', a: '支援，可為每個項目設定權重後計算加權平均。' },
        { q: '這些工具適合哪些年級使用？', a: '從中小學到大專皆可，依課堂需求彈性運用。' },
      ],
      en: [
        { q: 'Are student lists and grades uploaded?', a: 'No, all data is processed locally and not sent to a server.' },
        { q: 'Can roll call avoid repeats?', a: 'Yes, you can pick without repeats until the whole class has been called.' },
        { q: 'Which scale does the GPA calculator use?', a: 'It estimates on a common 4.3 scale; if your school differs, treat it as a reference.' },
        { q: 'Does grade calculation support weighting?', a: 'Yes, you can set a weight for each item to compute a weighted average.' },
        { q: 'What grade levels are these for?', a: 'From primary school to college, used flexibly to fit your class.' },
      ],
    },
    relatedCategories: ['random', 'statistics', 'time'],
    toolBlurbs: {
      'random-student-picker': {
        zh: '從學生名單中公平隨機抽點，可設定避免重複直到全班輪過一遍，讓課堂提問與發言機會更平均、更有參與感。',
        en: 'Pick students fairly at random, with no-repeat until everyone has had a turn, for balanced classroom participation.',
      },
      'seating-chart': {
        zh: '依學生名單規劃教室座位配置，快速產生座位表，方便開學安排、考試座位或臨時調整分組座位。',
        en: 'Plan classroom seating from a student list to quickly produce a seating chart for term or exams.',
      },
      'group-generator': {
        zh: '為課堂活動或專案快速建立隨機分組，依組數或每組人數自動分配，省下手動排組的時間並降低偏心爭議。',
        en: 'Quickly create random groups for class activities by group count or size, saving time and avoiding bias.',
      },
      'gpa-calculator': {
        zh: '依各科學分與字母成績，以 4.3 制估算 GPA，方便申請學校、獎學金或交換計畫前先掌握自己的成績水準。',
        en: 'Estimate GPA on a 4.3 scale from credits and letter grades before applications or scholarships.',
      },
    },
  },

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
        { tip: '想算成績的加權平均，用成績平均計算器', toolSlug: 'grade-average' },
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
