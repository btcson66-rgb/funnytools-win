import { SITE, type Locale } from '../config/site';
import { liveTools } from '../data/tools';

const liveToolCount = liveTools.length;

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
        "FunnyTools 免費線上工具箱是一個免費、免安裝、免註冊的線上工具網站，把工作、學習、金錢與日常生活常用的小工具整理在乾淨、好讀、手機友善的頁面中。",
        `本站目前提供 ${liveToolCount} 種免費工具，涵蓋薪資與金錢、工作與時間、隨機工具、文字與寫作、圖片與檔案、PDF、製圖工具、學生與老師等分類，並會持續新增與維護。`,
        "我們優先設計可以在瀏覽器本機執行的工具，減少不必要的資料傳輸。文字、名單、數字、圖片或 PDF 等內容，除非工具頁另有明確說明，通常只在你目前的瀏覽器分頁中處理。",
        "每個工具頁會說明用途、基本操作、常見情境、資料處理方式與已知限制。涉及估算的工具也會提醒你以原始紀錄、官方規則或專業意見交叉確認重要結果。",
        "網站內容與工具行為會一起維護。更新重點包括修正功能錯誤、補充操作說明、揭露瀏覽器或檔案限制，以及提供可供核對結果的實際範例，而不是把任何計算結果描述成必然正確。",
        "內容維護原則是把公式、假設、輸入限制與結果限制寫在使用者看得到的位置。涉及公開規則或常用公式的頁面，會優先以可重現的範例、工具實測結果與公開資料說明，不以誇大承諾、假評價或未查證的權威背書包裝工具。",
        "本站由 FunnyTools 維護者負責更新，不是政府、學校、銀行、醫療或法律機構，也不代表任何第三方服務。若工具或說明出現錯誤，會依問題影響程度安排修正，並避免把尚未確認的內容描述成正式建議。",
        "FunnyTools 不要求建立帳號，也不會在計算結果中提供付費置入。廣告或第三方服務如有啟用，會與工具輸出清楚區隔，並在隱私權政策中揭露。",
        "本站工具以日常便利、學習與初步估算為目的。涉及薪資、稅務、貸款、投資、醫療、法律或其他專業判斷時，結果僅供參考，正式決策仍應查證官方資料或諮詢專業人士。",
        `如果你有工具建議、錯誤回報、內容修正或網站合作問題，歡迎來信 ${SITE.email}。`,
      ],
    },
    contact: {
      title: '聯絡我們',
      seoTitle: '聯絡我們｜問題回報與工具建議 - FunnyTools',
      description: '提供 FunnyTools 免費線上工具箱的聯絡方式與回饋管道。你可以回報工具錯誤、提出新工具建議或反映網站內容問題；來信時若附上頁面網址、操作步驟、裝置與瀏覽器資訊，將更容易確認問題。',
      body: [
        `如果你想回報錯誤、提出工具建議、詢問網站內容，或有其他與 FunnyTools 免費線上工具箱相關的問題，請寄信到 ${SITE.email}。`,
        '一般網站維護與內容修正來信通常會在 3 個工作天內查看；若問題需要重現、比對資料或排入開發修正，實際處理時間可能更長，且不保證每封信都能逐一回覆。',
        '回報工具錯誤時，建議附上工具頁網址、你輸入的大致條件、預期結果、實際看到的結果、使用裝置與瀏覽器版本。這些資訊能幫助我們更快重現問題。',
        '如果你想建議新工具，請簡單說明工具用途、希望輸入哪些資料、需要輸出哪些結果，以及你會在什麼情境下使用它。',
        '若要提出內容修正，請附上頁面網址、需要修正的確切句子或結果；如問題涉及標準、公式或現行規定，也請提供可信的參考來源，方便我們比對公開內容與實際工具行為。',
        '請勿透過電子郵件傳送密碼、身分證件、金融對帳單、學生個資、醫療紀錄或其他機密檔案。技術問題通常可改用少量虛構資料重現。',
        '來信會用於網站維護，但無法保證回覆時間。本站無法代為認證計算結果、復原瀏覽器資料，或代表你與雇主、學校、銀行、政府機關或第三方服務交涉。',
        '本站不提供即時客服、個人財務規劃、法律、醫療或稅務諮詢。若問題涉及正式權益或專業判斷，請直接洽詢主管機關、金融機構、公司人資或合格專業人士。',
      ],
    },
    privacy: {
      title: '隱私權政策',
      seoTitle: '隱私權政策｜資料處理與 Cookie 說明 - FunnyTools',
      description: '說明 FunnyTools 免費線上工具箱如何處理使用者輸入、瀏覽器本機計算、localStorage、第三方連結與未來可能使用的廣告 Cookie，並整理資料安全提醒、使用者權利及聯絡方式。',
      body: [
        "生效日期：2026 年 7 月 10 日。本隱私權政策說明 FunnyTools 免費線上工具箱（funnytools.win，以下稱「本站」）如何處理你的資料。",
        "本站是靜態網站，所有工具預設在你的瀏覽器本機執行。你在工具中輸入的文字、數字、名單與設定不會傳送到本站伺服器，本站也不會儲存這些內容、不要求註冊，也不建立會員帳號。",
        "本站預設不販售、出租或交換你在工具中輸入的內容，也不會把本機處理工具中的文字、名單、圖片或 PDF 內容提供給廣告商。若未來新增需要伺服器或第三方 API 的功能，會在該工具頁另外標示資料處理方式。",
        "本機處理範圍：文字處理、隨機抽選、計時、薪資與貸款估算、圖片處理、PDF 整理與製圖等工具，設計上以瀏覽器本機計算為主。若未來新增需要網路服務的工具，會在工具頁明確標示。",
        "本機儲存：部分工具會使用瀏覽器的 localStorage 儲存你的偏好設定（例如番茄鐘的時間長度），這些資料只留在你的裝置上，你可以隨時透過清除瀏覽器資料移除。",
        "Email 收集（電子報與檔案寄送）：若你自願訂閱電子報，或在工具中選擇「把檔案寄到信箱」，本站會收集你的 email 與所使用的工具名稱，透過 Brevo（Sendinblue）服務儲存與寄送。你選擇寄送的結果檔案僅用於當次寄送，不會被本站另行保存。我們只用 email 寄送你要求的檔案、新工具通知與站內更新，不會販售或提供給第三方廣告商。每封信都附退訂方式，你也可以來信要求刪除你的 email 資料。",
        `Cookie 與廣告：${adsenseDisclosure.zh} Google 及其合作夥伴可能使用 Cookie、本機儲存空間、IP 位址與裝置資訊，以進行安全驗證、流量品質判斷、第三方廣告放送與成效衡量。Google 可能依你的設定提供個人化或非個人化廣告。你可前往 Google 廣告設定（adssettings.google.com）管理個人化廣告，並可在瀏覽器中封鎖或清除 Cookie。若所在地法律要求事前同意，本站會在啟用相關廣告功能前提供必要的同意選項。`,
        "Google 第三方服務：AdSense 相關請求可能連線至 googlesyndication.com、doubleclick.net、google.com 等 Google 網域。Google 如何使用合作網站或應用程式提供的資訊，請參閱 Google 的隱私權與條款說明。本站不會取得你在本機工具中輸入的文字、名單、圖片或 PDF 內容。",
        "第三方連結：本站可能包含指向外部網站的連結，這些網站有各自的隱私權政策，本站不對其內容或做法負責。",
        "兒童隱私：本站並非以兒童為對象，且不會在知情情況下蒐集未滿 16 歲兒童的個人資料。",
        "你的權利：由於本站預設不蒐集可識別個人身分的資料，通常沒有可供存取或刪除的個人資料。若你位於歐盟 / 英國（GDPR）或加州（CCPA / CPRA）等地區並對資料處理有疑問，可透過下方聯絡方式與我們聯繫。",
        "安全提醒：請避免在任何線上工具中輸入高度敏感的個人資料、密碼、金融帳號或機密資訊。",
        `政策更新：本站可能不定期更新本政策，重大變更會更新本頁生效日期。如有疑問請來信 ${SITE.email}。`,
      ],
    },
    terms: {
      title: '使用條款',
      seoTitle: '使用條款｜服務範圍與責任限制 - FunnyTools',
      description: '閱讀 FunnyTools 免費線上工具箱的使用條款與基本使用規則，包含服務範圍、使用者責任、可接受使用方式、智慧財產權、第三方服務與責任限制，使用網站前請先確認相關內容。',
      body: [
        "生效日期：2026 年 6 月 16 日。使用 FunnyTools 免費線上工具箱（funnytools.win）即表示你同意本使用條款。",
        "服務說明：本站提供免費、免安裝的線上小工具，僅供一般資訊與日常便利之用。",
        "使用者責任：你應自行確認輸入資料是否正確，並自行判斷結果是否適合你的情境。請勿在本站工具中輸入高度敏感個資、密碼、金融帳號、機密文件或未經授權處理的第三方資料。",
        "查證義務：任何會影響薪資、稅務、貸款、投資、醫療、法律、學籍、工作權益或其他正式權利義務的事項，都應以主管機關、雇主、學校、金融機構、合約文件或合格專業人士提供的正式資訊為準。",
        "「依現狀」提供：本站工具與內容均以「現狀」與「現有」基礎提供，不附任何明示或默示之擔保，包括但不限於適售性、特定用途之適用性與不侵權。我們不保證工具結果完全準確、不中斷或無錯誤。",
        "責任限制：在法律允許的最大範圍內，對於因使用或無法使用本站所造成之任何直接、間接、附帶或衍生性損害，本站均不負賠償責任。",
        "可接受使用：你同意以合法方式使用本站，不得從事干擾網站運作、嘗試入侵、大量自動化抓取或其他濫用行為。",
        "智慧財產權：本站名稱、設計、程式碼與內容受著作權等智慧財產權保護；你可正常使用工具，但不得未經授權重製或散布本站內容。提供「嵌入」功能的工具，請依嵌入頁面的說明使用。",
        "第三方服務：本站目前載入 Google AdSense 審核與廣告程式，但手動廣告版位仍維持關閉。未來若啟用廣告版位或整合其他分析服務，相關服務會有其自身條款與政策，本站也會同步更新隱私權政策。",
        "變更：我們可能隨時調整工具、分類、功能或本條款；重大變更會更新本頁生效日期。",
        "準據法：本條款依中華民國（台灣）法律解釋與適用。",
        `聯絡：如有任何問題，請來信 ${SITE.email}。`,
      ],
    },
    disclaimer: {
      title: '免責聲明',
      seoTitle: '免責聲明｜工具結果僅供參考 - FunnyTools',
      description: '了解 FunnyTools 免費線上工具箱的結果限制與使用者責任。薪資、貸款、統計、隨機及其他工具僅供一般參考，不構成法律、醫療、投資、稅務或會計建議，正式決策請查證官方資料。',
      body: [
        "生效日期：2026 年 6 月 20 日。本站提供的所有結果僅供一般參考，使用前請自行判斷並驗證。",
        "非專業建議：本站不提供法律、醫療、投資、稅務、會計或其他專業建議。",
        "財務 / 薪資 / 貸款類工具：薪資、加班費、貸款、複利、稅務等計算採用你輸入的參數與一般公式，結果為概估，可能因法規調整、實際條件或四捨五入而與官方或金融機構之計算不同；正式金額請以主管機關公告或專業人士意見為準。",
        "資料來源與公式限制：部分工具使用簡化公式、常見假設或使用者自行輸入的條件，不會涵蓋所有例外狀況、地區差異、公司制度或即時法規變更。",
        "非官方關係：FunnyTools 並非政府、金融、醫療、法律、教育考試或雇主人資系統，也不替任何機構確認正式資格、金額、名次、診斷、抽獎或申請結果。",
        "教育與統計工具：成績、排名、標準化分數、統計檢定與信度等結果會受樣本品質、輸入方式、學校規則與方法假設影響，不應直接視為正式評量、研究結論或錄取依據。",
        "檔案與內容工具：你有責任確認上傳或輸入素材的著作權、商標、授權與個資處理權限。本站不會因工具可處理某個檔案而代表你有權複製、轉換、公開或散布該內容。",
        "服務可用性：瀏覽器版本、裝置記憶體、檔案格式或第三方程式庫限制都可能造成工具失敗、結果差異或資料遺失。請保留原始檔案，重要輸出應在使用前重新開啟並核對。",
        "健康類工具：相關結果僅供自我參考，並非醫療診斷工具，不能取代醫師或專業人員的評估。",
        "隨機工具：隨機抽選結果不應用於法律上具拘束力之抽獎、博弈或其他須符合特定法規的用途。",
        "責任歸屬：你依本站工具結果所做的任何決策與後續行動，皆由你自行負責。",
      ],
    },
    aboutTools: {
      title: '本站工具如何運作',
      seoTitle: '本站工具如何運作｜瀏覽器本機處理說明 - FunnyTools',
      description: '了解 FunnyTools 免費線上工具箱如何在瀏覽器本機處理文字、圖片、PDF 與計算資料，以及本機儲存、檔案大小、結果限制、錯誤回報與新工具建議方式，使用前可先確認各項限制。',
      body: [
        "FunnyTools 免費線上工具箱的多數工具是直接在瀏覽器中執行的靜態網頁工具。你打開工具頁後，輸入欄位、按鈕、計算公式與結果顯示通常都在目前瀏覽器分頁內完成。",
        "本機處理工具包含文字統計、大小寫轉換、刪除空白行、隨機抽選、計時器、薪資與貸款估算、圖片壓縮與轉檔、PDF 合併拆分、草圖與流程圖等。這些工具的輸入資料不會主動上傳到本站伺服器。",
        "圖片與 PDF 類工具會在瀏覽器本機讀取檔案並產生下載結果。處理大型檔案時，速度會受到你的裝置效能、瀏覽器限制與檔案大小影響。",
        "部分工具可能使用 localStorage 儲存偏好設定，例如計時器長度或介面選項。這類資料保存在你的瀏覽器中，可透過清除瀏覽器資料移除。",
        "計算結果有其限制。薪資、加班費、貸款、複利、通膨、工作日、GPA 或成績平均等工具，通常採用簡化公式或你輸入的條件，不會涵蓋所有法規、公司制度、銀行條件、學校規則或四捨五入差異。",
        "部分工具僅供參考，是因為真實世界的結果可能受到法規更新、地區差異、合約條款、實際費率、個人條件、資料來源或專業判斷影響。涉及金錢、法律、醫療、稅務或正式權益時，請以官方公告、正式文件或專業意見為準。",
        `如果你發現錯誤，請寄信到 ${SITE.email}，並附上工具頁網址、操作步驟、輸入條件、預期結果、實際結果、裝置與瀏覽器。`,
        `如果你想建議新工具，也可以寄信到 ${SITE.email}。請說明工具要解決的問題、需要哪些輸入、預期輸出，以及你希望它支援哪些使用情境。`,
      ],
    },
  },
  en: {
    about: {
      title: 'About FunnyTools',
      seoTitle: 'About Us | Free Online Toolbox - FunnyTools',
      description: 'Learn what FunnyTools is, how its free browser tools work, how local processing protects inputs, and what practical categories the site covers.',
      body: [
        "FunnyTools is a free, no-install, no-sign-up website that gathers everyday tools for work, study, money, and daily life into clean, readable, mobile-friendly pages.",
        `The site currently offers ${liveToolCount} free tools across Money & Salary, Work & Time, Random, Text & Writing, Image & File, PDF, Drawing & CAD, and Student & Teacher, with more added over time.`,
        "The site prioritizes tools that can run locally in your browser, reducing unnecessary data transfer. Unless a tool page clearly says otherwise, text, lists, numbers, images, and PDFs are processed in your current browser session.",
        "Each tool page explains its purpose, basic steps, common use cases, privacy model, and known limitations. Tools that perform estimates also include reminders to compare important results with source records, official rules, or professional advice.",
        "Content and tool behavior are maintained together in the same published project. Updates focus on correcting broken behavior, clarifying instructions, documenting browser or file limits, and adding practical examples that help users verify the output instead of treating a result as automatically authoritative.",
        "The editorial approach is to keep formulas, assumptions, input limits, and result limits visible on the page. Pages that rely on public rules or common formulas prioritize reproducible examples, tool behavior checks, and plain-language explanations over exaggerated claims, fake reviews, or unverified authority signals.",
        "FunnyTools is maintained by the site operator and is not a government agency, school, bank, medical provider, law firm, or official representative of a third-party service. When errors are reported, fixes are prioritized by impact, and unverified material should not be treated as formal advice.",
        "FunnyTools does not require user accounts and does not offer paid placement inside calculation results. Advertising or third-party services, when enabled, are kept separate from the tool output and are disclosed in the Privacy Policy.",
        "Tool results are meant for everyday convenience, learning, and preliminary estimates. For salary, tax, loans, investments, medical, legal, or other professional matters, verify with official sources or qualified professionals.",
        `For tool suggestions, bug reports, content corrections, or site-related questions, email ${SITE.email}.`,
      ],
    },
    contact: {
      title: 'Contact',
      seoTitle: 'Contact Us | Bug Reports & Tool Suggestions - FunnyTools',
      description: 'Contact FunnyTools to report a tool error, suggest a practical new browser tool, request a content correction, or ask a site-related question.',
      body: [
        `For bug reports, tool suggestions, content questions, or site-related questions, email ${SITE.email}.`,
        'Site maintenance and content-correction messages are usually reviewed within 3 business days. Issues that require reproduction, source comparison, or development work may take longer, and an individual reply is not guaranteed.',
        'When reporting an issue, include the tool page URL, approximate input conditions, expected result, actual result, device, and browser version. This helps us reproduce and check the issue faster.',
        'When suggesting a new tool, briefly explain what problem it should solve, what inputs it should accept, what result it should produce, and when you would use it.',
        'For a content correction, include the page URL, the exact sentence or result that appears incorrect, and a reliable source when the issue depends on a standard, formula, or current rule. Corrections are evaluated against the published tool behavior and supporting sources.',
        'Do not email passwords, identity documents, financial statements, private student records, medical records, or files containing confidential information. Most technical issues can be reproduced with a small fictional example instead.',
        'Messages are reviewed for site maintenance, but a reply time is not guaranteed. FunnyTools cannot provide individual case review, certify a calculation, recover browser data, or act as an intermediary with an employer, school, bank, government agency, or third-party service.',
        'The site does not provide live support, personal financial planning, legal, medical, or tax advice. For matters affecting formal rights or obligations, contact an official source, employer, bank, or qualified professional.',
      ],
    },
    privacy: {
      title: 'Privacy Policy',
      seoTitle: 'Privacy Policy | Data Handling & Cookies - FunnyTools',
      description: 'How FunnyTools handles browser processing, user input, local storage, third-party links, account-free access, and future advertising cookies.',
      body: [
        "Effective date: July 10, 2026. This Privacy Policy explains how FunnyTools (funnytools.win, the \"Site\") handles your data.",
        "The Site is static, and all tools run locally in your browser by default. The text, numbers, lists, and settings you enter are not sent to a FunnyTools server, are not stored by us, and no account or registration is required.",
        "The Site does not sell, rent, or exchange the content you enter into local-processing tools, and it does not provide tool inputs such as text, lists, images, or PDFs to advertisers. If a future feature requires a server or third-party API, that tool page will identify the additional data handling.",
        "Local-processing scope: Text tools, random pickers, timers, salary and loan estimates, image tools, PDF tools, and drawing tools are designed around browser-side processing. If a future tool requires a network service, that tool page will say so clearly.",
        "Local storage: Some tools use your browser's localStorage to remember preferences (such as Pomodoro lengths). That data stays on your device and can be removed any time by clearing your browser data.",
        "Email collection (newsletter and file delivery): If you voluntarily subscribe to the newsletter, or choose \"send the file to my inbox\" in a tool, the Site collects your email address and the name of the tool used, stored and delivered through Brevo (Sendinblue). A result file you choose to have emailed is used only for that delivery and is not retained by the Site. We use your email only to send the file you requested, new-tool announcements, and site updates; it is never sold or shared with third-party advertisers. Every email includes an unsubscribe option, and you can contact us to have your email data deleted.",
        `Cookies and advertising: ${adsenseDisclosure.en} Google and its partners may use cookies, local storage, IP addresses, and device information for security checks, traffic-quality assessment, third-party ad serving, and measurement. Google may provide personalized or non-personalized ads according to your settings. You can manage personalized advertising at Google Ads Settings (adssettings.google.com) and block or clear cookies in your browser. Where prior consent is legally required, the Site will provide the required consent choices before enabling the relevant advertising features.`,
        "Google third-party services: AdSense requests may connect to Google domains such as googlesyndication.com, doubleclick.net, and google.com. See Google's privacy and terms documentation for how Google uses information from partner sites and apps. The Site does not provide Google with text, lists, images, or PDFs entered into local-processing tools.",
        "Third-party links: The Site may link to external websites that have their own privacy policies; we are not responsible for their content or practices.",
        "Children's privacy: The Site is not directed to children and does not knowingly collect personal data from children under 16.",
        "Your rights: Because the Site does not collect personally identifiable information by default, there is usually no personal data to access or delete. If you are in the EU/UK (GDPR) or California (CCPA/CPRA) and have questions about data handling, contact us using the details below.",
        "Safety reminder: Please avoid entering highly sensitive personal data, passwords, financial account numbers, or confidential information into any online tool.",
        `Updates: We may update this policy from time to time and will revise the effective date above for material changes. Questions: ${SITE.email}.`,
      ],
    },
    terms: {
      title: 'Terms of Use',
      seoTitle: 'Terms of Use | Service Scope & Limits - FunnyTools',
      description: 'FunnyTools terms covering service scope, user responsibility, acceptable use, intellectual property, third-party services, and liability limits.',
      body: [
        "Effective date: June 16, 2026. By using FunnyTools (funnytools.win), you agree to these Terms of Use.",
        "Service: The Site offers free, no-install online tools for general information and everyday convenience only.",
        "User responsibility: You are responsible for checking whether your inputs are correct and whether results fit your situation. Do not enter highly sensitive personal data, passwords, financial account numbers, confidential documents, or third-party data you are not authorized to process.",
        "Verification duty: Anything that affects salary, tax, loans, investments, medical decisions, legal rights, school records, workplace rights, or other formal obligations should be confirmed against official agencies, employers, schools, financial institutions, contract documents, or qualified professionals.",
        "\"As is\": The tools and content are provided on an \"as is\" and \"as available\" basis, without warranties of any kind, express or implied, including merchantability, fitness for a particular purpose, and non-infringement. We do not warrant that results are fully accurate, uninterrupted, or error-free.",
        "Limitation of liability: To the maximum extent permitted by law, the Site is not liable for any direct, indirect, incidental, or consequential damages arising from your use of, or inability to use, the Site.",
        "Acceptable use: You agree to use the Site lawfully and not to interfere with its operation, attempt to breach it, perform bulk automated scraping, or otherwise abuse it.",
        "Intellectual property: The Site name, design, code, and content are protected by copyright and other rights. You may use the tools normally but may not reproduce or redistribute Site content without authorization. For tools that offer an \"embed\" feature, follow the instructions on the embed page.",
        "Third-party services: The Site currently loads Google AdSense review and advertising code, while manual ad placements remain disabled. If ad placements or other analytics services are enabled later, those services will have their own terms and policies and this Privacy Policy will be updated accordingly.",
        "Changes: We may change tools, categories, features, or these Terms at any time; material changes will update the effective date above.",
        "Governing law: These Terms are interpreted under the laws of the Republic of China (Taiwan).",
        `Contact: For any questions, email ${SITE.email}.`,
      ],
    },
    disclaimer: {
      title: 'Disclaimer',
      seoTitle: 'Disclaimer | Results Are Reference Only - FunnyTools',
      description: 'Limits of FunnyTools results, user responsibility, and why calculator, random, financial, legal, and health outputs are reference only.',
      body: [
        "Effective date: June 20, 2026. All results from the Site are for general reference only; use your own judgment and verify before relying on them.",
        "Not professional advice: The Site does not provide legal, medical, investment, tax, accounting, or other professional advice.",
        "Financial / salary / loan tools: Salary, overtime, loan, compound-interest, and tax calculations use the parameters you enter and general formulas. Results are estimates and may differ from official or financial-institution figures due to regulatory changes, real conditions, or rounding; rely on official announcements or qualified professionals for binding amounts.",
        "Data and formula limits: Some tools use simplified formulas, common assumptions, or user-entered conditions. They may not cover every exception, regional difference, company policy, school rule, or real-time regulatory change.",
        "No official relationship: FunnyTools is not a government, financial, medical, legal, education-testing, or employer HR system, and it does not certify official eligibility, amounts, rankings, diagnoses, raffle outcomes, or application results for any institution.",
        "Education and statistics tools: Grades, rankings, standardized scores, statistical tests, and reliability results depend on sample quality, input methods, institutional rules, and methodological assumptions. They are not automatically official assessments, research conclusions, or admission decisions.",
        "File and content tools: You are responsible for confirming copyright, trademark, licensing, and personal-data rights for any material you enter or process. A tool's ability to process a file does not mean you have permission to copy, convert, publish, or distribute it.",
        "Service availability: Browser versions, device memory, file formats, and third-party library limits can cause failures, result differences, or data loss. Keep original files and reopen and verify important outputs before use.",
        "Health tools: Related results are for self-reference only, are not medical diagnostic tools, and do not replace evaluation by a physician or professional.",
        "Random tools: Random results should not be used for legally binding raffles, gambling, or other purposes subject to specific regulations.",
        "Responsibility: Any decisions and follow-up actions you take based on the tools are your own responsibility.",
      ],
    },
    aboutTools: {
      title: 'How Our Tools Work',
      seoTitle: 'How Our Tools Work | Local Browser Processing - FunnyTools',
      description: 'How FunnyTools processes text, images, PDFs, and calculations locally in the browser, plus storage, result limits, bug reports, and suggestions.',
      body: [
        "Most FunnyTools tools are static browser tools. After you open a tool page, form inputs, buttons, formulas, and result displays usually run inside your current browser tab.",
        "Local-processing tools include word counters, case converters, text cleanup tools, random pickers, timers, salary and loan calculators, image compression and conversion, PDF merge and split tools, sketching, and flowchart tools. These inputs are not actively uploaded to FunnyTools servers.",
        "Image and PDF tools read files in your browser and generate downloadable results locally. Large files may be slower depending on your device, browser limits, and file size.",
        "Some tools may use localStorage for preferences such as timer lengths or interface options. That data is stored in your browser and can be removed by clearing browser data.",
        "Calculation results have limits. Salary, overtime, loans, compound interest, inflation, business days, GPA, and grade average tools usually rely on simplified formulas or the values you enter. They do not cover every law, company policy, bank condition, school rule, or rounding difference.",
        "Some tools are reference-only because real-world results can depend on updated rules, regional differences, contract terms, real rates, personal conditions, source data, or professional judgment. For money, legal, medical, tax, or formal-rights decisions, rely on official documents or qualified advice.",
        `To report an error, email ${SITE.email} with the tool page URL, steps, input conditions, expected result, actual result, device, and browser.`,
        `To suggest a new tool, email ${SITE.email} and describe the problem, desired inputs, expected output, and use case.`,
      ],
    },
  },
} satisfies Record<Locale, Record<InfoPageKey, InfoPageContent>>;
