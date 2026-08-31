import { SITE, type Locale } from '../config/site';
import { liveToolCount } from '../data/tools';

const adsenseDisclosure = {
  zh: SITE.adsenseEnabled
    ? SITE.features.adsense
      ? '本站目前已載入 Google AdSense 程式並啟用廣告版位，頁面可能顯示由 Google 或其合作夥伴提供的第三方廣告。'
      : '本站已申請 Google AdSense，並載入 Google 提供的 AdSense 審核與廣告程式；目前手動廣告版位仍維持關閉，審核期間可能不會顯示廣告。'
    : '本站目前未載入 Google AdSense 程式，也未啟用廣告版位。',
  en: SITE.adsenseEnabled
    ? SITE.features.adsense
      ? 'The Site currently loads Google AdSense and has enabled ad placements, so pages may display third-party ads provided by Google or its partners.'
      : "The Site has applied for Google AdSense and loads Google's AdSense review and advertising script. Manual ad placements remain disabled, so ads may not appear while the application is under review."
    : 'The Site does not currently load Google AdSense or enable ad placements.',
} satisfies Record<Locale, string>;

const githubIssuesUrl = 'https://github.com/btcson66-rgb/funnytools-win/issues';

export interface InfoPageContent {
  title: string;
  seoTitle: string;
  description: string;
  body: string[];
}

export type InfoPageKey = 'about' | 'contact' | 'privacy' | 'terms' | 'disclaimer' | 'aboutTools';

export const home = {
  zh: {
    seoTitle: "FunnyTools 免費線上工具箱｜PDF、圖片、文字、QR Code、隨機與計算工具",
    seoDescription: "FunnyTools 是一個免費線上工具箱，提供 PDF、圖片、文字、QR Code、隨機、時間、金錢、教學與統計工具。免安裝、免註冊，手機與電腦都能使用。",
    eyebrow: '免費、快速、免安裝',
    title: 'FunnyTools 免費線上工具箱',
    intro: "免安裝、免註冊，快速使用 PDF、圖片、文字、金錢、時間與教學工具。",
    primaryCta: '查看所有工具',
    secondaryCta: '熱門工具',
  },
  en: {
    seoTitle: "Free Online Tools - PDF, Image, Text & QR | FunnyTools",
    seoDescription: "Free online tools for PDF, images, text, QR codes, random picks, and calculators. No signup; browser-first workflows for everyday tasks.",
    eyebrow: 'Free, fast, no install',
    title: 'FunnyTools - Free Online Tools for Everyday Tasks',
    intro: "FunnyTools gathers practical tools for work, teaching, PDFs, images, writing, random picks, and everyday calculations. Open a page and use it on mobile or desktop.",
    primaryCta: 'View all tools',
    secondaryCta: 'Search tools',
  },
} satisfies Record<Locale, Record<string, string>>;

export const homeSeoIntro = {
  zh: {
    heading: '日常工作與學習需要的免費工具箱',
    paragraphs: [
      'FunnyTools 是一個整理日常實用功能的免費線上工具箱，讓你不必為了一次簡單任務下載軟體或安裝 App。無論是合併與拆分 PDF、壓縮或轉換圖片、統計文字字數、整理文字格式、抽選名單、安排分組、計算日期時間，或試算薪資與貸款，都可以從首頁的搜尋、熱門工具與分類快速找到合適功能。網站保留清楚的操作流程，適合臨時需要處理文件的上班族、準備教材與課堂活動的老師、整理報告與作業的學生，以及處理圖片和文字內容的創作者使用。',
      '站內工具免安裝、免註冊，多數功能可直接在手機或電腦的瀏覽器中執行。現有分類涵蓋 PDF 工具、圖片工具、文字工具、隨機工具、時間工具、金錢工具與教學工具；你可以依任務分類瀏覽，也能輸入關鍵字搜尋。對於可在本機完成的操作，資料通常留在目前的瀏覽器分頁中處理；實際處理方式與使用限制會在各工具頁說明。FunnyTools 的重點是縮短尋找與切換工具的時間，讓工作、學習、備課與內容製作中的小任務更快完成。',
    ],
  },
  en: {
    heading: 'Free tools for everyday work and study',
    paragraphs: [
      'FunnyTools is a free online toolbox for common document, image, writing, classroom, time, and calculation tasks. Use search, popular tools, or categories to find a practical option without installing an app or creating an account.',
      'Most tools work directly in a mobile or desktop browser. The collection includes PDF, image, text, random, time, money, and teaching tools for students, teachers, office workers, and creators. Each tool page explains its workflow and any relevant data-handling limits.',
    ],
  },
} satisfies Record<Locale, { heading: string; paragraphs: string[] }>;

export const homeUseCases = {
  zh: [
    {
      title: '文件處理',
      description: '合併、拆分、轉換或旋轉 PDF，檔案主要留在目前的瀏覽器中處理。',
      tools: ['merge-pdf', 'split-pdf', 'images-to-pdf', 'rotate-pdf'],
    },
    {
      title: '圖片處理',
      description: '壓縮、調整尺寸、轉換 PNG／JPG 或製作 QR Code，適合日常檔案整理。',
      tools: ['image-compressor', 'image-resizer', 'png-to-jpg', 'qr-code-generator'],
    },
    {
      title: '老師教學',
      description: '用隨機點名、課堂分組、座位表與成績平均工具協助準備及進行課堂活動。',
      tools: ['random-student-picker', 'random-group-generator', 'seating-chart', 'grade-average'],
    },
    {
      title: '上班族與理財',
      description: '試算薪資、加班費、房貸與複利，再用工作日工具安排時間；金額結果僅供估算。',
      tools: ['net-salary', 'overtime-pay', 'mortgage-payment', 'compound-interest', 'business-days'],
    },
  ],
  en: [
    {
      title: 'Document tasks',
      description: 'Merge, split, convert, or rotate PDFs locally in your current browser.',
      tools: ['merge-pdf', 'split-pdf', 'images-to-pdf', 'rotate-pdf'],
    },
    {
      title: 'Image tasks',
      description: 'Compress, resize, convert PNG or JPG files, and create QR codes for everyday use.',
      tools: ['image-compressor', 'image-resizer', 'png-to-jpg', 'qr-code-generator'],
    },
    {
      title: 'Teaching',
      description: 'Pick students, split classes, arrange seats, and calculate grade averages.',
      tools: ['random-student-picker', 'random-group-generator', 'seating-chart', 'grade-average'],
    },
    {
      title: 'Work & money',
      description: 'Estimate salary, overtime, mortgages, and compound interest, then plan with business days. Figures are estimates only.',
      tools: ['net-salary', 'overtime-pay', 'mortgage-payment', 'compound-interest', 'business-days'],
    },
  ],
} satisfies Record<Locale, { title: string; description: string; tools: string[] }[]>;

export const homePrivacy = {
  zh: {
    heading: '隱私與本機處理說明',
    text: 'FunnyTools 免費線上工具箱優先提供可在瀏覽器本機執行的工具。文字、名單、數字、圖片與 PDF 通常不需要上傳到本站伺服器；若未來有工具需要網路服務，會在工具頁明確標示。',
    linkText: '查看完整隱私權政策',
  },
  en: {
    heading: 'Privacy & local processing',
    text: 'FunnyTools prioritizes tools that run in your browser. Text, lists, numbers, images, and PDFs usually do not need to be uploaded to our server. Any future tool that requires a network service will say so clearly.',
    linkText: 'Read the privacy policy',
  },
} satisfies Record<Locale, { heading: string; text: string; linkText: string }>;

export const homeFaq = {
  zh: [
    {
      q: '這些工具可以免費使用嗎？',
      a: '可以。目前 FunnyTools 站內工具皆可免費使用，不需要付費訂閱；個別工具的用途與限制會在各工具頁說明。',
    },
    {
      q: '免費線上工具需要安裝嗎？',
      a: '不需要。使用手機或電腦的瀏覽器開啟工具頁即可操作，也不必註冊帳號或登入。',
    },
    {
      q: 'FunnyTools 可以在手機使用嗎？',
      a: '可以。首頁、分類頁與工具頁均支援手機與電腦瀏覽器；較大的 PDF 或圖片檔案，處理速度仍會受到裝置效能與記憶體影響。',
    },
    {
      q: 'PDF 工具會上傳檔案嗎？',
      a: '目前多數 PDF 工具會直接在瀏覽器本機讀取與處理檔案，不會上傳到 FunnyTools 伺服器保存。請以各工具頁的隱私說明為準，並避免處理高度敏感資料。',
    },
    {
      q: '有哪些適合老師或學生的工具？',
      a: '老師可使用隨機點名、課堂分組、座位表與成績平均工具；學生可使用文字統計、PDF 整理、圖片處理、番茄鐘與日期計算等工具協助作業和報告。',
    },
    {
      q: '如何快速找到需要的線上工具？',
      a: '可以在首頁搜尋工具名稱或用途，也能從 PDF、圖片、文字、隨機、時間、金錢與學生老師等分類瀏覽，或直接查看熱門工具。',
    },
    {
      q: '計算器結果可以當作正式依據嗎？',
      a: '不建議。薪資、貸款、複利等試算結果僅供參考，正式決策仍應查證官方資料、合約或專業意見。',
    },
    {
      q: '圖片與文字工具的結果可以商業使用嗎？',
      a: '一般計算或自行輸入內容產生的結果可依你的需求使用，但你仍需確認原始素材、字型、商標與第三方內容的授權，並自行驗證結果是否符合工作或法規要求。',
    },
  ],
  en: [
    {
      q: 'Is FunnyTools free?',
      a: 'Yes. The tools currently available on the site are free to use without an account or app download.',
    },
    {
      q: 'Do I need an account?',
      a: 'No. Current tools open directly without an account or sign-in system.',
    },
    {
      q: 'Are uploaded files saved?',
      a: 'Most PDF and image tools read and process files locally, so they are not saved on FunnyTools servers. Check each tool page and avoid highly sensitive files.',
    },
    {
      q: 'Can I use it on a phone?',
      a: 'Yes. The home page, category pages, and tool pages are designed for both mobile and desktop browsers.',
    },
    {
      q: 'Can calculator results be used as official figures?',
      a: 'No. Salary, loan, compound interest, and similar calculator results are for reference only. Check official sources, contracts, or qualified professionals for formal decisions.',
    },
    {
      q: 'Can I use tool results commercially?',
      a: 'General calculations and results based on your own inputs may be used as needed, but you remain responsible for source-material rights, third-party licenses, and result verification.',
    },
  ],
} satisfies Record<Locale, { q: string; a: string }[]>;

export const pages = {
  zh: {
    about: {
      title: '關於 FunnyTools 免費線上工具箱',
      seoTitle: '關於我們｜免費線上工具箱簡介 - FunnyTools',
      description: '了解 FunnyTools 免費線上工具箱的網站定位、工具原則、資料處理方式與目前涵蓋的工具分類。本站工具可免費使用且不需註冊，並優先採用瀏覽器本機處理，協助你安全完成日常工作、學習與檔案任務。',
      body: [
        "FunnyTools 免費線上工具箱是由一名學生獨立開發與維護的免費工具網站，把工作、學習、金錢與日常生活常用的小工具整理在乾淨、好讀、手機友善的頁面中。做這個網站的起點很單純：在課業與日常生活中常需要把好幾張圖片合成一份 PDF、幫班級抽籤分組、算加班費、或把統計成績轉換成百分等級，但網路上同類工具很多要求先註冊、被滿版廣告卡住，或是把檔案上傳到不清楚會被怎麼處理的伺服器，所以動手做了一個免安裝、免註冊、盡量在瀏覽器本機就能完成的版本。",
        `本站目前提供 ${liveToolCount} 種免費工具，依用途分成金錢、時間、隨機、文字、圖片、PDF、製圖與統計等分類，另外整理出學生與老師常用的工具組合（例如隨機點名、課堂分組、成績百分等級、Cronbach's α 信度計算），持續新增與維護中。`,
        "我們優先設計可以在瀏覽器本機執行的工具，減少不必要的資料傳輸。站內幾乎所有工具的隱私設計都標記為「本機處理」——文字、名單、數字、圖片或 PDF 內容只在你目前的瀏覽器分頁中計算，不會主動送到本站伺服器。",
        "少數情境會用到網路服務，而且會在該工具頁明確說明。例如你在部分工具選擇「把結果寄到信箱」，或訂閱電子報時，站方會透過第三方寄信服務（Brevo）收集你的 email 與所使用的工具名稱，這件事在隱私權政策與工具頁都會標示，不會偷偷發生。",
        "每個工具頁會說明用途、基本操作、常見情境、資料處理方式與已知限制，多數工具頁下方也附有一段內容審閱說明，標示這個頁面的公式、範例或步驟最近一次被檢查或更新的日期，方便你判斷內容是不是新的。",
        "涉及公開規則或常用公式的頁面，我們優先用可重現的範例與工具實測結果來說明，而不是用誇大承諾、假評價或未查證的權威背書包裝工具；如果一段說明找不到可查證的依據，我們寧可先不寫，也不放沒把握的內容上去。",
        `如果你發現工具算錯、頁面顯示異常或說明有誤，可以寄信到 ${SITE.email}，或直接到 ${githubIssuesUrl} 開一個公開 issue，附上頁面網址與你輸入的條件。我們會依問題影響的使用者範圍安排修正順序，明顯算錯的功能會優先處理，措辭與排版類問題會排在後面。`,
        "本站有一些明確不做的事：不提供法律、醫療、投資或稅務的個別化建議，不能取代學校、雇主、銀行或政府機關開立的正式文件，也不會用計算結果替你認證資格、名次或申請結果——這些事永遠要以官方資料或專業人士的意見為準。",
        `本站目前由這名學生一個人維護：更新、除錯與內容修正都是同一個人處理，你寄到 ${SITE.email} 的信、或在 GitHub 開的 issue，也是由同一個人閱讀與回覆，中間沒有客服團隊或轉單流程。正因為是個人維護，本站不是政府、學校、銀行、醫療或法律機構，也不代表任何第三方服務；除了「由一名學生獨立維護」這一點之外，目前沒有可公開揭露的姓名、學校或其他個人資訊。`,
        "FunnyTools 不要求建立帳號，付費置入不會影響計算或輸出。工具完成任務後，頁面可能在清楚分隔的區域顯示可選的支持本站分潤連結；使用或忽略這個區域，都不會改變結果。",
        `${adsenseDisclosure.zh} 本站另外使用 Google Analytics（GA4）記錄匿名流量統計，協助我們了解哪些工具比較常被使用，藉此決定優先維護與新增的方向；詳細的 Cookie 與資料處理範圍請見隱私權政策。`,
        "本站工具以日常便利、學習與初步估算為目的。涉及薪資、稅務、貸款、投資、醫療、法律或其他專業判斷時，結果僅供參考，正式決策仍應查證官方資料或諮詢專業人士，完整限制請見免責聲明與使用條款。",
        `如果你有工具建議、錯誤回報、內容修正或網站合作問題，歡迎來信 ${SITE.email}，或到 GitHub Issues 開票。`,
        "英文版與中文版雖然共用同一套網站架構，但不是逐句翻譯——舉例、分類說明與段落順序會依讀者情境調整。英文版是比較晚才擴充的區塊，如果你發現某個英文頁面內容明顯比對應的中文頁面單薄，歡迎直接來信告訴我們，這類回報對我們排序優化很有幫助。",
        "多數工具頁下方會列出同分類的相關工具連結，方便你不用回到首頁重新搜尋，例如 PDF 拆分工具會連到合併與壓縮工具，百分等級計算器也會連到同樣用於統計分析的 Z 分數與 T 分數工具。",
      ],
    },
    contact: {
      title: '聯絡我們',
      seoTitle: '聯絡我們｜問題回報與工具建議 - FunnyTools',
      description: '提供 FunnyTools 免費線上工具箱的聯絡方式與回饋管道。你可以回報工具錯誤、提出新工具建議或反映網站內容問題；來信時若附上頁面網址、操作步驟、裝置與瀏覽器資訊，將更容易確認問題。',
      body: [
        `如果你想回報工具錯誤、提出新工具建議、詢問網站內容，或有其他與 FunnyTools 免費線上工具箱相關的問題，可以寄信到 ${SITE.email}；比較適合公開討論、或想讓其他使用者也看得到進度的問題，也可以直接到 ${githubIssuesUrl} 開一個 issue。`,
        "一般網站維護與內容修正來信通常會在 3 個工作天內查看；如果問題需要重現、比對官方資料或排入開發修正，實際處理時間可能拉長到數週，且因為目前是小規模維護，無法保證每一封信都能逐一回覆，但每封信都會被看過。",
        "回報工具錯誤時，請盡量附上工具頁網址、你輸入的大致條件（不需要真實個資，用假資料重現即可）、預期結果、實際看到的結果、使用裝置類型與瀏覽器版本。這些資訊愈完整，我們愈容易在自己的環境中重現同樣的狀況。",
        "舉例來說，如果你發現某個 PDF 工具在特定瀏覽器輸出空白頁，或某個統計計算器在輸入特定樣本數時顯示錯誤訊息，只要附上工具名稱、你用的瀏覽器版本與輸入條件，通常就足夠我們排查。",
        "如果你想建議新工具，請簡單說明工具用途、希望輸入哪些資料、需要輸出哪些結果，以及你會在什麼情境下使用它；愈具體愈有機會被排入開發。",
        "若要提出內容修正，請附上頁面網址、需要修正的確切句子或結果；如果問題涉及公開規則、公式或現行法規，也請附上可信的參考來源網址，方便我們比對公開資料與工具實際行為是否一致。",
        "GitHub Issues 是公開的回報管道，任何人都能看到你回報的內容與後續處理進度，適合可重現、不涉及隱私的工具錯誤或功能建議；請不要在 GitHub 上貼任何私人或機密資料。",
        "目前本站沒有另外設立商業合作或媒體詢問的專屬信箱，如果你有網站合作、素材授權或其他商業性質的問題，可以先寄到一般聯絡信箱，但這類信件的回覆速度可能低於一般錯誤回報與工具建議。",
        "請勿透過電子郵件或 GitHub Issues 傳送密碼、身分證件、財務對帳單、學生個資、醫療紀錄或其他機密檔案；這些資料本站沒有能力妥善保管，也不需要用來重現大多數技術問題。",
        "多數技術問題可以改用少量虛構的測試資料重現，例如用假的姓名清單測試隨機分組工具，或用非真實的金額測試貸款試算工具，這樣既能說明問題，也不會暴露你的真實資料。",
        "來信會用於網站維護，但無法保證回覆時間。本站無法代為認證計算結果、復原瀏覽器資料，或代表你與雇主、學校、銀行、政府機關或第三方服務交涉。",
        "本站不提供即時客服、個人財務規劃、法律、醫療或稅務諮詢。若問題涉及正式權益或專業判斷，請直接洽詢主管機關、金融機構、公司人資或合格專業人士；本站工具的計算結果僅能作為初步參考。",
        `如果你準備好要寄信，直接寄到 ${SITE.email}，或到 GitHub Issues 開票即可，兩種方式我們都會看到。`,
        "你可以用中文或英文寫信，兩種語言我們都看得懂，不需要先自行翻譯。",
        "回報愈具體，愈容易被處理。「PDF 合併工具壞掉了」很難直接動手排查；「用 Android 版 Chrome 合併兩份超過 20MB 的 PDF 會輸出損毀檔案，但同樣的檔案在電腦版 Chrome 合併正常」通常可以直接重現並修正。多花十秒描述細節，往往能省下好幾天的來回確認。",
        "如果依你的回報做了修正，我們通常會直接把修正反映在工具頁上，而不是逐一寫信通知；回報幾天後回去看該頁面，往往比等回信更快知道結果。",
        "回覆速度會依當下處理量浮動，收信量少時可能當天就看過，量多時單純的確認信可能要等幾天。如果事情比較急，可以在原本的信件或 GitHub issue 底下簡短補充提醒一次。",
      ],
    },
    privacy: {
      title: '隱私權政策',
      seoTitle: '隱私權政策｜資料處理與 Cookie 說明 - FunnyTools',
      description: '說明 FunnyTools 免費線上工具箱如何處理使用者輸入、瀏覽器本機計算、localStorage、第三方連結與未來可能使用的廣告 Cookie，並整理資料安全提醒、使用者權利及聯絡方式。',
      body: [
        "生效日期：2026 年 7 月 10 日。本隱私權政策說明 FunnyTools 免費線上工具箱（funnytools.win，以下稱「本站」）如何處理你的資料，適用於本站所有頁面與工具，包括金錢、統計、圖片、PDF、文字、隨機與教育類工具。",
        "本站是靜態網站，所有工具預設在你的瀏覽器本機執行。你在工具中輸入的文字、數字、名單與設定不會傳送到本站伺服器，本站也不會儲存這些內容、不要求註冊，也不建立會員帳號。",
        "本站預設不販售、出租或交換你在工具中輸入的內容，也不會把本機處理工具中的文字、名單、圖片或 PDF 內容提供給廣告商。若未來新增需要伺服器或第三方 API 的功能，會在該工具頁另外標示資料處理方式。",
        "本機處理範圍：文字處理、隨機抽選、計時、薪資與貸款估算、圖片處理、PDF 整理、製圖與統計計算等工具，設計上以瀏覽器本機計算為主。若未來新增需要網路服務的工具，會在工具頁明確標示。",
        "本機儲存：部分工具會使用瀏覽器的 localStorage 儲存你的偏好設定（例如番茄鐘的時間長度或介面選項），這些資料只留在你的裝置上，你可以隨時透過清除瀏覽器資料移除。",
        "電子報訂閱：若你自願訂閱電子報，本站會收集你的 email，透過 Brevo（Sendinblue）服務儲存與寄送新工具通知與站內更新。我們只用這個 email 寄送你訂閱的內容，不會販售或提供給第三方廣告商，每封信都附退訂方式。",
        "檔案寄送功能：如果你在工具中選擇「把檔案寄到信箱」，本站會額外收集你的 email 與所使用的工具名稱，同樣透過 Brevo 寄送。你選擇寄送的結果檔案僅用於當次寄送，不會被本站另行保存；你也可以隨時來信要求刪除已留存的 email 資料。",
        `Cookie 與廣告：${adsenseDisclosure.zh} Google 及其合作夥伴可能使用 Cookie、本機儲存空間、IP 位址與裝置資訊，以進行安全驗證、流量品質判斷、第三方廣告放送與成效衡量。Google 可能依你的設定提供個人化或非個人化廣告。你可前往 Google 廣告設定（adssettings.google.com）管理個人化廣告，並可在瀏覽器中封鎖或清除 Cookie。若所在地法律要求事前同意，本站會在啟用相關廣告功能前提供必要的同意選項。`,
        "Google 第三方服務：AdSense 相關請求可能連線至 googlesyndication.com、doubleclick.net、google.com 等 Google 網域。Google 如何使用合作網站或應用程式提供的資訊，請參閱 Google 的隱私權與條款說明。本站不會取得你在本機工具中輸入的文字、名單、圖片或 PDF 內容。",
        "分析工具：本站使用 Google Analytics（GA4）記錄匿名流量統計，例如頁面瀏覽次數、裝置類型與大致地區，用來了解哪些工具較常被使用，藉此決定維護與新增的優先順序；GA4 不會被本站用來嘗試識別個別訪客身分。你可以透過瀏覽器隱私設定或 Google 官方提供的停用工具限制這類蒐集。",
        "網路服務層：本站透過 Cloudflare 提供的網路服務對外提供內容並進行安全防護，Cloudflare 在此過程中可能依其安全與效能最佳化功能，處理連線層級的技術資訊（例如 IP 位址、瀏覽器類型）；這層處理與本站工具本身的資料蒐集是分開的，詳情請參閱 Cloudflare 的隱私權政策。",
        "第三方連結：本站可能包含指向外部網站的連結，這些網站有各自的隱私權政策，本站不對其內容或做法負責。",
        "兒童隱私：本站並非以兒童為對象，且不會在知情情況下蒐集未滿 16 歲兒童的個人資料。",
        "你的權利：由於本站預設不蒐集可識別個人身分的資料，通常沒有可供存取或刪除的個人資料；若你曾訂閱電子報或使用過檔案寄送功能，可來信要求刪除我們透過 Brevo 保存的 email 記錄。若你位於歐盟 / 英國（GDPR）或加州（CCPA / CPRA）等地區並對資料處理有疑問，可透過下方聯絡方式與我們聯繫。",
        "安全提醒：請避免在任何線上工具中輸入高度敏感的個人資料、密碼、金融帳號或機密資訊；本站的本機處理設計是為了降低風險，但無法取代你自己對輸入內容的判斷。",
        `政策更新：本站可能不定期更新本政策，重大變更會更新本頁生效日期。如有疑問請來信 ${SITE.email}。`,
        "分潤連結：台灣中文版網站可能在支持本站頁面、工具成功完成後的清楚分隔區域，以及少數與需求直接相關的指南文章中，顯示蝦皮或酷澎等平台的選擇性分潤連結。如果你透過這些連結完成購買，本站可能會收到少量分潤，購買價格不會因此增加；這些連結不會影響工具的計算或輸出。點擊追蹤是由對方平台處理，不經過本站自己的伺服器；詳細揭露請見支持本站頁面。",
        "跨境資料傳輸：由於 Google（Analytics、AdSense）與 Brevo 都採用跨國基礎設施，匿名分析事件或電子報 email 等資料可能會在你所在國家以外的伺服器上被處理。各服務商各自公開其資料處理與跨境傳輸的保障措施，詳情請參考其隱私權政策。",
        "Do Not Track：多數瀏覽器提供「請勿追蹤」等隱私訊號，但目前業界對網站該如何回應這類訊號並沒有統一標準，本站目前不會依此訊號改變分析行為；你仍可透過前述的 Cookie 與廣告個人化設定來限制追蹤。",
        "伺服器與主機紀錄：本站靜態頁面透過 GitHub Pages 搭配 Cloudflare 代管，兩者都可能基於安全與穩定性保留標準的連線技術紀錄（例如請求時間與 IP 位址），這與本政策所述的分析或廣告資料是分開的兩件事。",
        "個別服務退出方式：若只想停用 Google Analytics，可安裝 Google 官方提供的分析退出擴充功能；若想停止收到電子報或檔案寄送信件，可使用 Brevo 信件中的退訂連結，或直接來信告知，我們會將該 email 從名單中移除。",
        "本節更新：如果本站未來新增其他會蒐集資料的第三方服務，會先更新這個章節，並同步調整本頁最上方的生效日期。",
        "統計與製圖類工具：百分等級、Z 分數、t 檢定、Cronbach's α 信度等計算器，以及長條圖與圓餅圖製圖工具，處理你輸入的數字方式與本站其他本機工具相同——這些數值在計算過程中不會被傳送到任何地方。",
        "新功能揭露原則：未來若有新工具或新功能需要把資料送出瀏覽器以外的地方，原則上會在該功能上線的同一次更新中同步修訂本隱私權政策，而不是事後補充，讓這份政策能持續反映目前實際上線工具的行為。",
      ],
    },
    terms: {
      title: '使用條款',
      seoTitle: '使用條款｜服務範圍與責任限制 - FunnyTools',
      description: '閱讀 FunnyTools 免費線上工具箱的使用條款與基本使用規則，包含服務範圍、使用者責任、可接受使用方式、智慧財產權、第三方服務與責任限制，使用網站前請先確認相關內容。',
      body: [
        "生效日期：2026 年 6 月 16 日。使用 FunnyTools 免費線上工具箱（funnytools.win）即表示你同意本使用條款；如果你不同意這些條款，請不要使用本站工具。",
        "服務說明：本站提供免費、免安裝的線上小工具，涵蓋金錢與薪資、時間、隨機、文字、圖片、PDF、製圖與統計等分類，僅供一般資訊與日常便利之用，不構成任何形式的正式服務保證。",
        "使用者責任：你應自行確認輸入資料是否正確，並自行判斷結果是否適合你的情境。請勿在本站工具中輸入高度敏感個資、密碼、金融帳號、機密文件或未經授權處理的第三方資料。",
        "舉例來說，測試隨機分組或成績計算工具時，建議使用虛構姓名與假設分數；測試貸款或薪資工具時，可用整數示範金額，不需要輸入真實的身分證字號、銀行帳號或實際薪資單資訊。",
        "查證義務：任何會影響薪資、稅務、貸款、投資、醫療、法律、學籍、工作權益或其他正式權利義務的事項，都應以主管機關、雇主、學校、金融機構、合約文件或合格專業人士提供的正式資訊為準，本站工具的輸出僅供初步參考。",
        "「依現狀」提供：本站工具與內容均以「現狀」與「現有」基礎提供，不附任何明示或默示之擔保，包括但不限於適售性、特定用途之適用性與不侵權。我們不保證工具結果完全準確、不中斷或無錯誤。",
        "責任限制：在法律允許的最大範圍內，對於因使用或無法使用本站所造成之任何直接、間接、附帶或衍生性損害，本站均不負賠償責任。",
        "這包含但不限於：因誤用計算結果做出的財務決策、因檔案處理工具造成的資料格式變化、或因統計工具輸出被誤用於正式研究或評量而產生的後果；你在使用前應自行評估並承擔相關風險。",
        "可接受使用：你同意以合法方式使用本站，不得從事干擾網站運作、嘗試入侵、大量自動化抓取或其他濫用行為。",
        "智慧財產權：本站名稱、設計、程式碼與內容受著作權等智慧財產權保護；你可正常使用工具，但不得未經授權重製或散布本站內容。提供「嵌入」功能的工具，請依嵌入頁面的說明使用，且嵌入時不得移除本站來源標示。",
        "你在工具中輸入的文字、圖片或檔案，其著作權仍歸你或原著作權人所有，本站不會因為你使用工具而取得這些內容的所有權；多數工具的輸入內容也只在你的瀏覽器記憶體中暫時處理，不會被本站保存為己有的素材。",
        "第三方服務：本站目前載入 Google AdSense 審核與廣告程式，但手動廣告版位仍維持關閉。未來若啟用廣告版位或整合其他分析服務，相關服務會有其自身條款與政策，本站也會同步更新隱私權政策。",
        "本站同時使用 Google Analytics（GA4）記錄匿名流量統計；GA4 的資料蒐集範圍與 Cookie 使用方式，請一併參閱隱私權政策，本條款不重複列出細節。",
        "變更：我們可能隨時調整工具、分類、功能或本條款；重大變更會更新本頁生效日期。",
        "準據法：本條款依中華民國（台灣）法律解釋與適用；如有爭議，雙方應優先透過溝通解決。",
        `聯絡：如有任何問題，請來信 ${SITE.email}。`,
        "爭議處理：在採取正式法律行動前，請先透過聯絡頁與我們聯繫，讓我們有機會了解狀況並在合理範圍內直接處理。",
        "可分割性：若本條款任何部分依適用法律被認定為無法執行，其餘條款仍繼續有效，該部分則會依最接近原意的方式解讀。",
        "語言版本：本條款同時維護中文與英文版本。若兩版本文意有實質差異，因中文為本站原始的工作語言，將以中文版為準。",
        "嵌入式工具：若工具頁提供可嵌入其他網站使用的版本，該嵌入版本仍受本條款規範。負責嵌入頁面呈現方式的是嵌入該工具的網站本身，本站不對任何嵌入 FunnyTools 工具之第三方頁面的其他內容負責。",
      ],
    },
    disclaimer: {
      title: '免責聲明',
      seoTitle: '免責聲明｜工具結果僅供參考 - FunnyTools',
      description: '了解 FunnyTools 免費線上工具箱的結果限制與使用者責任。薪資、貸款、統計、隨機及其他工具僅供一般參考，不構成法律、醫療、投資、稅務或會計建議，正式決策請查證官方資料。',
      body: [
        "生效日期：2026 年 6 月 20 日。本站提供的所有結果僅供一般參考，使用前請自行判斷並驗證是否符合你的實際情況；本頁適用於本站目前提供的所有工具分類，包括金錢、統計、教育、檔案處理、圖片、隨機與健康類工具。",
        "非專業建議：本站不提供法律、醫療、投資、稅務、會計或其他個別化的專業建議。任何工具產生的文字或數字說明，都不構成針對你個人情況的建議。",
        "財務／薪資／貸款類工具：薪資、加班費、貸款、複利、通膨、工作天數等計算採用你輸入的參數與一般公式，結果為概估，可能因法規調整、實際條件、四捨五入方式或計算基期不同，而與官方或金融機構的計算結果有落差。",
        "這類工具通常無法涵蓋責任制、部分工時、地區基本工資差異、公司內部獎金制度或個別合約條款等特殊情況；正式金額仍須以薪資單、貸款合約、勞動法規公告或專業人士意見為準。",
        "資料來源與公式限制：部分工具使用簡化公式、常見假設或使用者自行輸入的條件，不會涵蓋所有例外狀況、地區差異、公司制度或即時法規變更。",
        "教育與統計工具：成績、排名、標準化分數、統計檢定（例如 t 檢定、Cronbach's α 信度）與百分等級等結果，都建立在特定的統計假設上——例如樣本需接近常態分布、樣本數需達到一定規模——輸入資料不符合這些前提時，計算出來的數字仍會顯示，但解讀上可能失去統計意義。",
        "這類工具的輸出不應直接視為正式評量、學術研究結論或錄取依據；如果你把結果用於論文或正式報告，仍需自行確認方法是否符合你的研究設計與所屬機構的規範。",
        "檔案與內容工具：PDF 合併、拆分、壓縮與轉檔工具在處理過程中可能改變原始檔案的排版、字型嵌入或圖層結構；圖片壓縮多數採用破壞性壓縮，畫質一經壓縮即無法完全還原。你有責任確認上傳或輸入素材的著作權、商標、授權與個資處理權限，本站不會因工具可處理某個檔案而代表你有權複製、轉換、公開或散布該內容。",
        "服務可用性：瀏覽器版本、裝置記憶體、檔案格式或第三方程式庫限制都可能造成工具失敗、結果差異或資料遺失。請保留原始檔案，重要輸出應在使用前重新開啟並核對，避免直接以工具產生的檔案取代唯一備份。",
        "健康類工具：相關結果僅供自我參考，並非醫療診斷工具，不能取代醫師或專業人員的評估，也不會記錄或分析你的健康資料。",
        "隨機工具：隨機抽選結果不應用於法律上具拘束力之抽獎、博弈或其他須符合特定法規的用途；正式抽獎活動請洽主辦單位確認合規的抽獎機制。",
        "製圖工具：長條圖、圓餅圖等製圖工具只負責把你輸入的數字畫成圖表，不會驗證資料本身是否正確；圖表呈現的正確性完全取決於你輸入的原始數字。",
        "非官方關係：FunnyTools 並非政府、金融、醫療、法律、教育考試或雇主人資系統，也不替任何機構確認正式資格、金額、名次、診斷、抽獎或申請結果。",
        "責任歸屬：你依本站工具結果所做的任何決策與後續行動，皆由你自行負責；如對計算方式有疑問，歡迎依聯絡頁的方式提出，但本站不會針對個別情境提供具拘束力的正式意見。",
        `政策更新：本頁若有重大修改，會更新最上方的生效日期；如有疑問請來信 ${SITE.email}。`,
        "留意內容更新：計算工具背後的公式或假設，可能隨著該分類被重新檢查或修正而更新。工具頁下方的內容審閱說明是確認某個頁面是否最近被檢查過最快的方式。",
        "如果計算工具的預設條件不符合你的情況（例如不同的地區稅率級距或公司制度），請直接調整輸入值，而不要假設預設值就代表你的情境——工具是依照你輸入的內容計算，不是依照它猜測的使用者身分計算。",
      ],
    },
    aboutTools: {
      title: '本站工具如何運作',
      seoTitle: '本站工具如何運作｜瀏覽器本機處理說明 - FunnyTools',
      description: '了解 FunnyTools 免費線上工具箱如何在瀏覽器本機處理文字、圖片、PDF 與計算資料，以及本機儲存、檔案大小、結果限制、錯誤回報與新工具建議方式，使用前可先確認各項限制。',
      body: [
        "FunnyTools 免費線上工具箱的多數工具是直接在瀏覽器中執行的靜態網頁工具。你打開工具頁後，輸入欄位、按鈕、計算公式與結果顯示通常都在目前瀏覽器分頁內完成，不需要等待伺服器處理。",
        "本機處理工具包含文字統計、大小寫轉換、刪除空白行、隨機抽選、計時器、薪資與貸款估算、圖片壓縮與轉檔、PDF 合併拆分、統計檢定與百分等級計算、草圖與流程圖等。這些工具的輸入資料不會主動上傳到本站伺服器。",
        "新工具是否值得做，主要看三件事：能不能完全在瀏覽器內完成、是不是很多人會重複遇到的具體任務、以及是否不需要保存使用者的機敏資料。像隨機分組、單位換算、成績百分等級這類工具符合這三個條件，會優先開發。",
        "目前不會做的類型包括：需要建立帳號登入才能使用、需要在伺服器長期保存使用者資料庫、或需要大量伺服器端運算（例如大型機器學習推論）的功能。這類需求超出目前純靜態網站的架構，也不符合本站優先本機處理的原則。",
        "圖片與 PDF 類工具會在瀏覽器本機讀取檔案並產生下載結果，過程中檔案內容留在你的裝置記憶體中處理，處理完成後你可以直接下載結果檔。",
        "部分工具可能使用 localStorage 儲存偏好設定，例如計時器長度或介面選項。這類資料保存在你的瀏覽器中，可透過清除瀏覽器資料移除，不會同步到其他裝置或本站伺服器。",
        "計算結果有其限制。薪資、加班費、貸款、複利、通膨、工作日、GPA 或成績平均等工具，通常採用簡化公式或你輸入的條件，不會涵蓋所有法規、公司制度、銀行條件、學校規則或四捨五入差異。",
        "部分工具僅供參考，是因為真實世界的結果可能受到法規更新、地區差異、合約條款、實際費率、個人條件、資料來源或專業判斷影響。涉及金錢、法律、醫療、稅務或正式權益時，請以官方公告、正式文件或專業意見為準。",
        "瀏覽器與裝置本身也有限制：處理大型 PDF 或高解析度圖片時，速度會受到裝置效能、可用記憶體與瀏覽器版本影響；部分較舊的瀏覽器可能不支援本站使用的檔案處理技術，遇到工具無反應時，可先嘗試更新瀏覽器或改用較新的裝置測試。",
        `如果你發現錯誤，請寄信到 ${SITE.email}，或到 ${githubIssuesUrl} 開 issue，並附上工具頁網址、操作步驟、輸入條件、預期結果、實際結果、裝置與瀏覽器。`,
        `如果你想建議新工具，也可以用同樣方式聯絡我們。請說明工具要解決的問題、需要哪些輸入、預期輸出，以及你希望它支援哪些使用情境；具體的建議比籠統的需求更容易被排入開發。`,
        "工具刻意維持單一用途，而不是把多個步驟包在同一個大型應用程式裡。這樣可以讓每個頁面保持專注、容易一眼看懂，也能讓修正某個工具時，比較不會影響到其他無關的工具。",
        "如果你不確定某個任務能不能完全在瀏覽器本機完成，最保險的做法是先用一份不含機敏資料的小範例實際測試看看；如果結果看起來正確，通常同樣的做法也適用於你真正要處理的檔案或數字。",
      ],
    },
  },
  en: {
    about: {
      title: 'About FunnyTools',
      seoTitle: 'About Us | Free Online Toolbox - FunnyTools',
      description: 'Learn what FunnyTools is, how its free browser tools work, how local processing protects inputs, and what practical categories the site covers.',
      body: [
        "FunnyTools is a free, no-install, no-sign-up toolbox built and maintained by a single student, fitted in around classes and everyday tasks. It started from a simple frustration: routine jobs — combining scanned pages into one PDF, splitting a group into random teams, checking a loan estimate, or converting a raw score into a percentile — kept leading to tools that wanted an account first, buried the page in ads, or asked for a file upload with no clear explanation of where it went. A page that opens in a browser tab, does the one thing you need, and closes again seemed like the more honest option.",
        `The site currently offers ${liveToolCount} free tools, organized into categories such as Money, Time, Random, Text, Image, PDF, Drawing, and Statistics, plus a set of tools built specifically for students and teachers (grade averages, percentile rank, Cronbach's alpha reliability, and similar classroom calculations). New tools and updates are added over time.`,
        "The site is built around tools that run in your browser rather than on a server. Almost every tool on FunnyTools is designed for local-only processing: the text, numbers, lists, images, or PDF pages you work with stay inside your current browser tab and are not automatically sent anywhere.",
        "There are a few deliberate exceptions, and each one is disclosed on the tool page where it applies. If you choose to have a result emailed to you, or you subscribe to the newsletter, the site collects your email address and the tool name through a third-party delivery service (Brevo). That is described in the Privacy Policy and on the relevant tool pages — it is not a hidden behavior.",
        "Most tool pages include a short content-review note near the bottom of the page, showing when the formula, steps, or examples on that page were last checked. That date is meant to give you a quick, honest signal about how current the page is, rather than leaving you to guess.",
        "For pages based on public formulas or common rules, the priority is reproducible examples and plain explanations of how the calculation works — not exaggerated claims, fabricated reviews, or borrowed authority. If a section can't be backed by something checkable, it is left out rather than padded with filler.",
        `If you find a tool producing a wrong result, a broken page, or a misleading description, email ${SITE.email} or open a public issue at ${githubIssuesUrl} with the page URL and the inputs you used. Fixes are prioritized by how many people a problem likely affects — a calculation that's actually wrong is treated as more urgent than a wording or layout issue.`,
        "There are things this site deliberately does not do. It does not give individualized legal, medical, investment, or tax advice. It cannot replace an official document from a school, employer, bank, or government agency, and a result from a calculator here is never a substitute for an official eligibility, ranking, or admission decision.",
        `The site is currently maintained by one person — a student — end to end: updates, bug fixes, and content corrections are all handled by the same person who reads every message sent to ${SITE.email} and every GitHub issue. There's no support team or ticket queue behind it. Because of that, FunnyTools is not a government body, school, bank, medical provider, or law firm, and it does not represent any third-party service. Beyond "an independently maintained student project," there's no name, school, or other personal detail to disclose at this time.`,
        "No account is required to use any tool, and paid placements never affect calculations or outputs. After a tool completes its task, a clearly separated optional affiliate-support section may appear; using or ignoring it never changes the result.",
        `${adsenseDisclosure.en} The site also uses Google Analytics (GA4) to record anonymous traffic statistics, which helps decide which tools are worth maintaining or expanding. The full scope of cookies and data handling is in the Privacy Policy.`,
        "Tool results on this site are meant for everyday convenience, learning, and preliminary estimates. For salary, tax, loan, investment, medical, legal, or other high-stakes decisions, treat the output as a starting point and verify it against official sources or a qualified professional — see the Disclaimer and Terms of Use for the specific limits by tool category.",
        `For tool suggestions, bug reports, content corrections, or other site-related questions, email ${SITE.email} or open an issue on GitHub.`,
        "The English and Chinese sections of the site are maintained on the same codebase but are not literal translations of each other — examples, category framing, and paragraph order are adapted for each audience rather than mirrored sentence by sentence. The English section was expanded more recently than the Chinese section, so if a specific English page feels thinner than you'd expect, that's a fair thing to flag through the contact page.",
        "Most tool pages also link to a short list of related tools in the same category, meant to help you find a nearby tool without going back to search — for example, a PDF split tool links to PDF merge and PDF compression, and a percentile-rank calculator links to the z-score and t-score tools used in similar analysis.",
      ],
    },
    contact: {
      title: 'Contact',
      seoTitle: 'Contact Us | Bug Reports & Tool Suggestions - FunnyTools',
      description: 'Contact FunnyTools to report a tool error, suggest a practical new browser tool, request a content correction, or ask a site-related question.',
      body: [
        `For bug reports, tool suggestions, content questions, or any other question related to FunnyTools, email ${SITE.email}. If the issue is something other users might benefit from tracking, or you'd rather have the discussion be public, you can also open an issue directly at ${githubIssuesUrl}.`,
        "General maintenance and content-correction messages are usually reviewed within 3 business days. Issues that need reproduction, comparison against an official source, or actual development work can take longer — sometimes a few weeks — and because this is a small-scale operation, an individual reply is not guaranteed for every message, though every message is read.",
        "When reporting a bug, include the tool page URL, the approximate inputs you used (fictional data is fine — you don't need to send real personal information), the result you expected, the result you actually got, your device type, and your browser version. The more specific this is, the faster the same behavior can be reproduced.",
        "For example, if a PDF tool produces a blank page in a specific browser, or a statistics calculator returns an error for a particular sample size, naming the tool, the browser version, and the exact inputs used is usually enough to start investigating.",
        "When suggesting a new tool, briefly explain the problem it should solve, what inputs it should accept, what output it should produce, and the situation where you'd actually use it. Specific suggestions are easier to prioritize than general requests.",
        "For a content correction, include the page URL and the exact sentence or result that looks wrong. If the issue depends on a public rule, formula, or current regulation, include a link to a reliable source so the published content can be compared against it directly.",
        "GitHub Issues is a public channel — anyone can see what you reported and how it was handled. It works well for reproducible bugs or feature requests that don't involve private information. Do not post private or confidential data in a public issue.",
        "There is currently no separate inbox for business partnerships, licensing, or media inquiries. Questions of that kind can be sent to the general contact address, but they may be reviewed more slowly than bug reports and tool suggestions, which are the current priority.",
        "Do not email or post passwords, identity documents, financial statements, private student records, medical records, or other confidential files, either by email or on GitHub. This site has no dedicated process for storing sensitive files securely, and none of that is needed to reproduce most technical issues.",
        "Most technical problems can be reproduced with a small set of fictional test data instead — for example, a fake name list to test a random-grouping tool, or made-up figures to test a loan calculator. That demonstrates the problem without exposing your real information.",
        "Messages are used for site maintenance, but a reply time is not guaranteed. FunnyTools cannot certify a calculation result, recover data from your browser, or act as an intermediary between you and an employer, school, bank, government agency, or third-party service.",
        "The site does not provide live support, personal financial planning, or legal, medical, or tax advice. For anything affecting formal rights or obligations, contact the relevant official source, financial institution, HR department, or a qualified professional directly — treat calculator results here as a starting point only.",
        `When you're ready to send a message, email ${SITE.email} or open an issue on GitHub — either channel reaches the same person.`,
        "You can write in English or Chinese — both are read by the same person, so there's no need to translate your message first.",
        "A specific report is far more useful than a general one. \"The PDF merge tool doesn't work\" is hard to act on; \"merging two PDFs over 20MB on Chrome for Android produces a corrupted file, but the same files merge fine on desktop Chrome\" can usually be reproduced and fixed directly. The extra time spent adding detail up front tends to save days of back-and-forth later.",
        "If a fix is made in response to your report, it's usually reflected directly on the tool page rather than announced individually — checking the page again after a few days is often faster than waiting for a reply confirming the change.",
        "Response volume varies. A quiet week might mean same-day review; a busier stretch can push simple confirmations back by several days. If the issue is urgent for you and you haven't heard back, a short follow-up referencing your original message, or the GitHub issue number if you used that channel, is a reasonable way to bump it.",
      ],
    },
    privacy: {
      title: 'Privacy Policy',
      seoTitle: 'Privacy Policy | Data Handling & Cookies - FunnyTools',
      description: 'How FunnyTools handles browser processing, user input, local storage, third-party links, account-free access, and future advertising cookies.',
      body: [
        "Effective date: July 10, 2026. This Privacy Policy explains how FunnyTools (funnytools.win, the \"Site\") handles your data, and it applies to every page and tool on the Site, including the money, statistics, image, PDF, text, random, and education categories.",
        "The Site is static, and all tools run locally in your browser by default. The text, numbers, lists, and settings you enter are not sent to a FunnyTools server, are not stored by us, and no account or registration is required.",
        "The Site does not sell, rent, or exchange the content you enter into local-processing tools, and it does not provide tool inputs such as text, lists, images, or PDFs to advertisers. If a future feature requires a server or third-party API, that tool page will identify the additional data handling.",
        "Local-processing scope: Text tools, random pickers, timers, salary and loan estimates, image tools, PDF tools, drawing tools, and statistics calculators are designed around browser-side processing. If a future tool requires a network service, that tool page will say so clearly.",
        "Local storage: Some tools use your browser's localStorage to remember preferences, such as a Pomodoro timer length or an interface option. That data stays on your device and can be removed any time by clearing your browser data.",
        "Newsletter subscriptions: If you voluntarily subscribe to the newsletter, the Site collects your email address and delivers new-tool announcements and site updates through Brevo (Sendinblue). We use that address only for the content you subscribed to; it is never sold or shared with third-party advertisers, and every email includes an unsubscribe link.",
        "File-delivery feature: If you choose \"send the file to my inbox\" in a tool, the Site additionally collects your email address and the name of the tool used, also delivered through Brevo. A result file sent this way is used only for that delivery and is not separately retained by the Site; you can contact us at any time to have any retained email data deleted.",
        `Cookies and advertising: ${adsenseDisclosure.en} Google and its partners may use cookies, local storage, IP addresses, and device information for security checks, traffic-quality assessment, third-party ad serving, and measurement. Google may provide personalized or non-personalized ads according to your settings. You can manage personalized advertising at Google Ads Settings (adssettings.google.com) and block or clear cookies in your browser. Where prior consent is legally required, the Site will provide the required consent choices before enabling the relevant advertising features.`,
        "Google third-party services: AdSense requests may connect to Google domains such as googlesyndication.com, doubleclick.net, and google.com. See Google's privacy and terms documentation for how Google uses information from partner sites and apps. The Site does not provide Google with text, lists, images, or PDFs entered into local-processing tools.",
        "Analytics: The Site uses Google Analytics (GA4) to record anonymous traffic statistics — page views, device type, and approximate region — to understand which tools are used most and prioritize maintenance and new development accordingly. GA4 is not used to try to identify individual visitors. You can limit this collection through your browser's privacy settings or Google's official opt-out tools.",
        "Network layer: The Site is served through Cloudflare's network, which also provides security protection. As part of that, Cloudflare may process connection-level technical information (such as IP address and browser type) under its own security and performance features. This layer is separate from data collected by the Site's own tools; see Cloudflare's privacy policy for details.",
        "Third-party links: The Site may link to external websites that have their own privacy policies; we are not responsible for their content or practices.",
        "Children's privacy: The Site is not directed to children and does not knowingly collect personal data from children under 16.",
        "Your rights: Because the Site does not collect personally identifiable information by default, there is usually no personal data to access or delete. If you've subscribed to the newsletter or used the file-delivery feature, you can email us to request deletion of any email record we hold through Brevo. If you are in the EU/UK (GDPR) or California (CCPA/CPRA) and have questions about data handling, contact us using the details below.",
        "Safety reminder: Please avoid entering highly sensitive personal data, passwords, financial account numbers, or confidential information into any online tool. The Site's local-processing design is meant to reduce risk, but it cannot replace your own judgment about what you type into a form.",
        `Updates: We may update this policy from time to time and will revise the effective date above for material changes. Questions: ${SITE.email}.`,
        "Affiliate links: The Taiwan Chinese version of this Site may show optional Shopee or Coupang affiliate links on the Support page, after a tool completes successfully, and selectively in relevant guide articles. If you choose to purchase something after clicking one of those links, the Site may receive a commission at no extra cost to you. These links never affect calculations or outputs. Affiliate click tracking is handled by the destination platform rather than by this Site's own servers; see the Support page for the current disclosure.",
        "International data transfer: Because Google (Analytics, AdSense) and Brevo operate global infrastructure, data such as anonymous analytics events or a newsletter email address may be processed on servers outside your own country. Each provider publishes its own data-processing and transfer safeguards; see their respective privacy policies for details relevant to your location.",
        "Do Not Track: Most browsers offer a \"Do Not Track\" or similar privacy signal. Because there isn't yet a single agreed-upon standard for how sites should respond to that signal, this Site does not currently change its analytics behavior based on it; you can still limit tracking using the cookie and ad-personalization controls described above.",
        "Server and hosting logs: Static pages on this Site are hosted through GitHub Pages behind Cloudflare, both of which may keep standard technical connection logs (such as request timestamps and IP addresses) for security and reliability purposes, separate from any analytics or advertising data described elsewhere in this policy.",
        "Opting out of specific services: To limit Google Analytics specifically, Google's own Analytics opt-out browser add-on is available directly from Google; to stop newsletter or file-delivery emails, use the unsubscribe link in any message from Brevo, or contact us directly and we will remove the address from that list.",
        "Changes to this section: If the Site begins using additional third-party services that collect data beyond what's described here, this policy will be updated first, and the effective date at the top of this page will change accordingly.",
        "Statistics and drawing tools: calculators such as percentile rank, z-score, t-test, and Cronbach's alpha reliability, along with the bar-chart and pie-chart makers, process the numbers you enter the same way as the Site's other local tools — those values are never transmitted anywhere as part of computing the result.",
        "New-feature disclosure practice: whenever a new tool or feature needs to send data beyond your browser, this Privacy Policy is meant to be updated in the same release that ships the feature, not afterward, so this page should always reflect the current behavior of the tools that are actually live.",
      ],
    },
    terms: {
      title: 'Terms of Use',
      seoTitle: 'Terms of Use | Service Scope & Limits - FunnyTools',
      description: 'FunnyTools terms covering service scope, user responsibility, acceptable use, intellectual property, third-party services, and liability limits.',
      body: [
        "Effective date: June 16, 2026. By using FunnyTools (funnytools.win), you agree to these Terms of Use. If you do not agree, please do not use the tools on this site.",
        "Service: The Site offers free, no-install online tools across categories including money and salary, time, random, text, image, PDF, drawing, and statistics, provided for general information and everyday convenience only. Nothing here constitutes a formal service guarantee.",
        "User responsibility: You are responsible for checking whether your inputs are correct and whether results fit your situation. Do not enter highly sensitive personal data, passwords, financial account numbers, confidential documents, or third-party data you are not authorized to process.",
        "For example, when testing a random-grouping or grade-calculation tool, use fictional names and made-up scores; when testing a loan or salary tool, round test amounts are fine — there's no need to enter a real ID number, bank account, or your actual pay stub.",
        "Verification duty: Anything that affects salary, tax, loans, investments, medical decisions, legal rights, school records, workplace rights, or other formal obligations should be confirmed against official agencies, employers, schools, financial institutions, contract documents, or qualified professionals. Output from this site's tools is preliminary reference only.",
        "\"As is\": The tools and content are provided on an \"as is\" and \"as available\" basis, without warranties of any kind, express or implied, including merchantability, fitness for a particular purpose, and non-infringement. We do not warrant that results are fully accurate, uninterrupted, or error-free.",
        "Limitation of liability: To the maximum extent permitted by law, the Site is not liable for any direct, indirect, incidental, or consequential damages arising from your use of, or inability to use, the Site.",
        "This includes, without limitation, financial decisions made based on a misused calculation, changes to file formatting caused by a file-processing tool, or consequences from a statistics tool's output being misapplied to formal research or assessment. You are responsible for assessing and accepting that risk before relying on any result.",
        "Acceptable use: You agree to use the Site lawfully and not to interfere with its operation, attempt to breach it, perform bulk automated scraping, or otherwise abuse it.",
        "Intellectual property: The Site name, design, code, and content are protected by copyright and other rights. You may use the tools normally but may not reproduce or redistribute Site content without authorization. For tools that offer an \"embed\" feature, follow the instructions on the embed page, and do not remove the site attribution when embedding.",
        "Content you type into a tool, or files you upload, remain your own or the original rights holder's property. Using a tool does not transfer ownership of that content to the Site, and most tool inputs are only held temporarily in your browser's memory rather than retained as Site material.",
        "Third-party services: The Site currently loads Google AdSense review and advertising code, while manual ad placements remain disabled. If ad placements or other analytics services are enabled later, those services will have their own terms and policies, and the Privacy Policy will be updated accordingly.",
        "The Site also uses Google Analytics (GA4) to record anonymous traffic statistics. The scope of GA4 data collection and cookie use is described in the Privacy Policy rather than repeated here.",
        "Changes: We may change tools, categories, features, or these Terms at any time; material changes will update the effective date above.",
        "Governing law: These Terms are interpreted under the laws of the Republic of China (Taiwan). Any dispute should first be addressed through direct communication.",
        `Contact: For any questions, email ${SITE.email}.`,
        "Dispute resolution: Before pursuing formal legal action, please first contact us using the details on the Contact page so we have a chance to understand and, where reasonable, address the issue directly.",
        "Severability: If any part of these Terms is found unenforceable under applicable law, the remaining provisions continue to apply, and the unenforceable part will be read in the way that most closely reflects its original intent.",
        "Language: These Terms are maintained in both Chinese and English. If there is a meaningful difference in meaning between the two versions, the Chinese version is treated as authoritative, since it is the Site's original working language.",
        "Embedded tools: Where a tool page offers an embeddable version for use on another website, that embedded copy still operates under these Terms. The site hosting the embed is responsible for the surrounding page and how the embed is presented there, and this Site is not responsible for content on any third-party page that embeds a FunnyTools tool.",
      ],
    },
    disclaimer: {
      title: 'Disclaimer',
      seoTitle: 'Disclaimer | Results Are Reference Only - FunnyTools',
      description: 'Limits of FunnyTools results, user responsibility, and why calculator, random, financial, legal, and health outputs are reference only.',
      body: [
        "Effective date: June 20, 2026. All results from the Site are for general reference only; use your own judgment and verify before relying on them. This page applies to every tool category currently on the Site, including money, statistics, education, file-processing, image, random, and health-related tools.",
        "Not professional advice: The Site does not provide individualized legal, medical, investment, tax, or accounting advice. Text or numbers produced by any tool are not advice tailored to your specific situation.",
        "Financial / salary / loan tools: Salary, overtime, loan, compound-interest, inflation, and business-day calculations use the parameters you enter and general formulas. Results are estimates and can differ from official or financial-institution figures due to regulatory changes, real conditions, rounding conventions, or a different calculation base period.",
        "These tools generally cannot account for exempt-status pay structures, part-time arrangements, regional minimum-wage differences, company-specific bonus schemes, or individual contract terms. Rely on your pay stub, loan agreement, labor-law publications, or a qualified professional for binding figures.",
        "Data and formula limits: Some tools use simplified formulas, common assumptions, or user-entered conditions. They may not cover every exception, regional difference, company policy, school rule, or real-time regulatory change.",
        "Education and statistics tools: Grades, rankings, standardized scores, statistical tests (such as t-tests or Cronbach's alpha reliability), and percentile results rest on specific statistical assumptions — for example, that a sample is close to normally distributed or reaches a minimum size. When your input data doesn't meet those assumptions, the tool still returns a number, but the statistical meaning of that number can break down.",
        "Output from these tools should not be treated automatically as an official assessment, a research conclusion, or an admission decision. If you use a result in a thesis or a formal report, you remain responsible for confirming the method fits your research design and your institution's requirements.",
        "File and content tools: PDF merge, split, compression, and conversion tools can change the original file's layout, embedded fonts, or layer structure during processing; image compression is mostly lossy, so quality is not fully recoverable once compressed. You are responsible for confirming copyright, trademark, licensing, and personal-data rights for any material you enter or process. A tool's ability to process a file does not mean you have permission to copy, convert, publish, or distribute it.",
        "Service availability: Browser versions, device memory, file formats, and third-party library limits can cause failures, result differences, or data loss. Keep your original files, and reopen and verify important outputs before relying on them — don't treat a tool-generated file as your only backup.",
        "Health tools: Related results are for self-reference only, are not medical diagnostic tools, do not replace evaluation by a physician or professional, and do not record or analyze your health data.",
        "Random tools: Random results should not be used for legally binding raffles, gambling, or other purposes subject to specific regulations. For an official drawing, confirm the compliant mechanism with the organizer.",
        "Drawing tools: Bar chart, pie chart, and similar drawing tools only render the numbers you enter — they do not verify whether that underlying data is correct. The accuracy of any chart depends entirely on the figures you provide.",
        "No official relationship: FunnyTools is not a government, financial, medical, legal, education-testing, or employer HR system, and it does not certify official eligibility, amounts, rankings, diagnoses, raffle outcomes, or application results for any institution.",
        "Responsibility: Any decisions and follow-up actions you take based on the tools are your own responsibility. Questions about how a calculation works are welcome through the contact page, but the Site does not provide binding, case-specific opinions.",
        `Updates: If this page changes materially, the effective date above will be updated. Questions: ${SITE.email}.`,
        "Watch for content updates: The formulas or assumptions behind a calculator can change if a category is deepened or corrected later. The content-review note near the bottom of a tool page is the fastest way to check whether that specific page has been revisited recently.",
        "If a calculator's default settings don't match your situation — a different regional tax bracket or company policy, for example — adjust the inputs accordingly rather than assuming the default represents your case. The tool computes from what you enter, not from any assumption about who is using it.",
      ],
    },
    aboutTools: {
      title: 'How Our Tools Work',
      seoTitle: 'How Our Tools Work | Local Browser Processing - FunnyTools',
      description: 'How FunnyTools processes text, images, PDFs, and calculations locally in the browser, plus storage, result limits, bug reports, and suggestions.',
      body: [
        "Most FunnyTools tools are static browser tools. After you open a tool page, form inputs, buttons, formulas, and result displays usually run inside your current browser tab, with no server round-trip required to get a result.",
        "Local-processing tools include word counters, case converters, text cleanup tools, random pickers, timers, salary and loan calculators, image compression and conversion, PDF merge and split tools, statistical tests and percentile calculators, sketching, and flowchart tools. These inputs are not actively uploaded to FunnyTools servers.",
        "Whether a new tool is worth building comes down to three things: can it run entirely in the browser, is it a specific task enough people run into repeatedly, and does it avoid needing to store sensitive user data long-term. Tools like random grouping, unit conversion, and grade percentile calculators fit all three and tend to get prioritized.",
        "Some categories are intentionally out of scope for now: anything that requires account creation to use, anything that needs a persistent server-side user database, or anything that needs heavy server-side computation (large-scale machine learning inference, for example). Those needs go beyond a static, browser-first site and don't fit the local-processing priority described above.",
        "Image and PDF tools read files in your browser and generate downloadable results locally. The file content is processed in your device's memory during the operation, and you download the finished result directly when it's done.",
        "Some tools may use localStorage for preferences such as timer lengths or interface options. That data is stored in your browser only — it doesn't sync to other devices or to a FunnyTools server, and it can be removed at any time by clearing your browser data.",
        "Calculation results have limits. Salary, overtime, loans, compound interest, inflation, business days, GPA, and grade average tools usually rely on simplified formulas or the values you enter. They do not cover every law, company policy, bank condition, school rule, or rounding difference that might apply to your specific situation.",
        "Results are reference-only because real-world outcomes can depend on updated regulations, regional differences, contract terms, actual rates, personal circumstances, source data, or professional judgment. For money, legal, medical, tax, or formal-rights decisions, rely on official documents or qualified advice instead of a calculator result.",
        "Browsers and devices have their own limits. Processing a large PDF or a high-resolution image is slower on lower-powered devices or when memory is limited, and older browsers may not support some of the file-processing features these tools rely on. If a tool seems unresponsive, updating your browser or trying a newer device is a reasonable first step.",
        `To report an error, email ${SITE.email} or open an issue at ${githubIssuesUrl} with the tool page URL, the steps you took, your input conditions, the expected result, the actual result, and your device and browser.`,
        `To suggest a new tool, reach out the same way. Describe the problem it should solve, what inputs it needs, what output it should produce, and the use case you have in mind — specific suggestions are easier to prioritize than general requests.`,
        "Tools are kept intentionally single-purpose rather than bundled into one large multi-step app. That keeps each page focused and easy to scan, and it means a fix to one tool is unlikely to introduce a regression in an unrelated one.",
        "If you're not sure whether a task can be done locally in the browser, the safest test is simply trying the relevant tool with a small, non-sensitive example first — if the result looks right, the same approach will generally work for your real file or numbers.",
      ],
    },
  },
} satisfies Record<Locale, Record<InfoPageKey, InfoPageContent>>;
