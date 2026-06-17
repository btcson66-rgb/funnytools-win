import { SITE, type Locale } from '../config/site';

export interface InfoPageContent {
  title: string;
  seoTitle: string;
  description: string;
  body: string[];
}

export type InfoPageKey = 'about' | 'contact' | 'privacy' | 'terms' | 'disclaimer' | 'aboutTools';

export const home = {
  zh: {
    seoTitle: "FunnyTools 免費線上工具大全｜PDF、圖片、隨機、計算器",
    seoDescription: "FunnyTools 收錄常用免費線上工具，包含 PDF 合併、圖片壓縮、隨機選號、抽籤、字數統計、番茄鐘、QR Code 與生活試算。免安裝、免註冊，許多工具可在瀏覽器本機處理。",
    eyebrow: '免費、快速、免安裝',
    title: '免費線上工具大全',
    intro: "FunnyTools 把工作、教學、PDF、圖片、文字、隨機抽選與生活試算工具整理在同一個地方。打開網頁即可使用，手機與電腦都方便。",
    primaryCta: '查看全部工具',
    secondaryCta: '搜尋工具',
  },
  en: {
    seoTitle: "FunnyTools Free Online Tools | PDF, Image, Random Tools & Calculators",
    seoDescription: "FunnyTools collects free online tools for PDF merge, image compression, random numbers, name picking, word counts, Pomodoro, QR codes, age, mortgage, and everyday calculations. No install or sign-up required.",
    eyebrow: 'Free, fast, no install',
    title: 'Free Online Tools Collection',
    intro: "FunnyTools gathers practical tools for work, teaching, PDFs, images, writing, random picks, and everyday calculations. Open a page and use it on mobile or desktop.",
    primaryCta: 'View all tools',
    secondaryCta: 'Search tools',
  },
} satisfies Record<Locale, Record<string, string>>;

export const homeUseCases = {
  zh: [
    {
      title: '老師上課',
      description: '點名、分組、座位安排與課堂計時，適合教室投影或平板使用。',
      tools: ['random-student-picker', 'random-group-generator', 'seating-chart', 'countdown-timer'],
    },
    {
      title: '辦公寫作',
      description: '處理文字、PDF、圖片壓縮與 QR Code，讓常見文件工作更快完成。',
      tools: ['word-counter', 'merge-pdf', 'image-compressor', 'qr-code-generator'],
    },
    {
      title: '日常決策',
      description: '從選號、抽籤、轉盤到午餐選擇，幫你快速決定小事情。',
      tools: ['random-number-picker', 'random-name-picker', 'random-wheel', 'what-to-eat'],
    },
    {
      title: '金錢試算',
      description: '先做生活與財務估算，再回頭確認正式資料與專業建議。',
      tools: ['net-salary', 'mortgage-payment', 'compound-interest', 'savings-goal'],
    },
    {
      title: '趣味分享',
      description: '適合做朋友聚會、社群互動與輕鬆分享；人格測驗類工具會陸續補上。',
      tools: ['random-wheel', 'this-or-that', 'what-to-eat', 'dice-roller'],
    },
  ],
  en: [
    {
      title: 'Teaching',
      description: 'Pick students, split groups, arrange seats, and run classroom timers from one place.',
      tools: ['random-student-picker', 'random-group-generator', 'seating-chart', 'countdown-timer'],
    },
    {
      title: 'Office writing',
      description: 'Handle word counts, PDFs, image compression, and QR codes for everyday document work.',
      tools: ['word-counter', 'merge-pdf', 'image-compressor', 'qr-code-generator'],
    },
    {
      title: 'Daily decisions',
      description: 'Use numbers, name draws, wheels, and meal picks to make small choices faster.',
      tools: ['random-number-picker', 'random-name-picker', 'random-wheel', 'what-to-eat'],
    },
    {
      title: 'Money estimates',
      description: 'Run quick personal estimates before checking official numbers or professional advice.',
      tools: ['net-salary', 'mortgage-payment', 'compound-interest', 'savings-goal'],
    },
    {
      title: 'Fun sharing',
      description: 'Lightweight tools for group chats, social posts, and casual sharing. Personality quizzes are planned.',
      tools: ['random-wheel', 'this-or-that', 'what-to-eat', 'dice-roller'],
    },
  ],
} satisfies Record<Locale, { title: string; description: string; tools: string[] }[]>;

export const homePrivacy = {
  zh: {
    heading: '隱私與本機處理說明',
    text: 'FunnyTools 優先提供可在瀏覽器本機執行的工具。文字、名單、數字、圖片與 PDF 通常不需要上傳到本站伺服器；若未來有工具需要網路服務，會在工具頁明確標示。',
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
      q: 'FunnyTools 是免費的嗎？',
      a: '目前站內工具都可以免費使用，不需要註冊帳號或下載 App。',
    },
    {
      q: 'PDF、圖片或名單會被上傳嗎？',
      a: '多數工具設計為瀏覽器本機處理，輸入內容通常不會傳到 FunnyTools 伺服器。仍建議避免輸入高度敏感資料。',
    },
    {
      q: '可以在手機上使用嗎？',
      a: '可以。首頁、分類頁與工具頁都以手機和桌面瀏覽器使用為目標設計。',
    },
    {
      q: '計算器結果可以當作正式依據嗎？',
      a: '不建議。薪資、貸款、複利等試算結果僅供參考，正式決策仍應查證官方資料、合約或專業意見。',
    },
  ],
  en: [
    {
      q: 'Is FunnyTools free?',
      a: 'Yes. The tools currently available on the site are free to use without an account or app download.',
    },
    {
      q: 'Are PDFs, images, or lists uploaded?',
      a: 'Most tools are designed for local browser processing, so your input usually is not sent to FunnyTools servers. You should still avoid entering highly sensitive data.',
    },
    {
      q: 'Can I use it on a phone?',
      a: 'Yes. The home page, category pages, and tool pages are designed for both mobile and desktop browsers.',
    },
    {
      q: 'Can calculator results be used as official figures?',
      a: 'No. Salary, loan, compound interest, and similar calculator results are for reference only. Check official sources, contracts, or qualified professionals for formal decisions.',
    },
  ],
} satisfies Record<Locale, { q: string; a: string }[]>;

export const pages = {
  zh: {
    about: {
      title: '關於免費工具箱',
      seoTitle: '關於免費工具箱',
      description: '了解免費工具箱的網站定位、工具原則、資料處理方式與目前涵蓋的工具分類。',
      body: [
        "免費工具箱（Free Tools Hub）是一個免費、免安裝、免註冊的線上工具網站，把工作、學習、金錢與日常生活常用的小工具整理在乾淨、好讀、手機友善的頁面中。",
        "本站目前已上線超過 40 種工具，涵蓋薪資與金錢、工作與時間、隨機工具、文字與寫作、圖片與檔案、PDF、製圖工具、學生與老師等分類，並會持續新增與維護。",
        "我們優先設計可以在瀏覽器本機執行的工具，減少不必要的資料傳輸。文字、名單、數字、圖片或 PDF 等內容，除非工具頁另有明確說明，通常只在你目前的瀏覽器分頁中處理。",
        "本站工具以日常便利、學習與初步估算為目的。涉及薪資、稅務、貸款、投資、醫療、法律或其他專業判斷時，結果僅供參考，正式決策仍應查證官方資料或諮詢專業人士。",
        `如果你有工具建議、錯誤回報、內容修正或網站合作問題，歡迎來信 ${SITE.email}。`,
      ],
    },
    contact: {
      title: '聯絡我們',
      seoTitle: '聯絡免費工具箱',
      description: '提供免費工具箱的聯絡方式與回饋管道。',
      body: [
        `如果你想回報錯誤、提出工具建議、詢問網站內容，或有其他與免費工具箱相關的問題，請寄信到 ${SITE.email}。`,
        '回報工具錯誤時，建議附上工具頁網址、你輸入的大致條件、預期結果、實際看到的結果、使用裝置與瀏覽器版本。這些資訊能幫助我們更快重現問題。',
        '如果你想建議新工具，請簡單說明工具用途、希望輸入哪些資料、需要輸出哪些結果，以及你會在什麼情境下使用它。',
        '本站不提供即時客服、個人財務規劃、法律、醫療或稅務諮詢。若問題涉及正式權益或專業判斷，請直接洽詢主管機關、金融機構、公司人資或合格專業人士。',
      ],
    },
    privacy: {
      title: '隱私權政策',
      seoTitle: '隱私權政策｜免費工具箱',
      description: '說明免費工具箱如何處理使用者輸入、瀏覽器本機計算與未來可能使用的廣告 Cookie。',
      body: [
        "生效日期：2026 年 6 月 16 日。本隱私權政策說明免費工具箱（funnytools.win，以下稱「本站」）如何處理你的資料。",
        "本站是靜態網站，所有工具預設在你的瀏覽器本機執行。你在工具中輸入的文字、數字、名單與設定不會傳送到本站伺服器，本站也不會儲存這些內容、不要求註冊，也不建立會員帳號。",
        "本機處理範圍：文字處理、隨機抽選、計時、薪資與貸款估算、圖片處理、PDF 整理與製圖等工具，設計上以瀏覽器本機計算為主。若未來新增需要網路服務的工具，會在工具頁明確標示。",
        "本機儲存：部分工具會使用瀏覽器的 localStorage 儲存你的偏好設定（例如番茄鐘的時間長度），這些資料只留在你的裝置上，你可以隨時透過清除瀏覽器資料移除。",
        "Cookie 與廣告：本站目前未啟用 Google AdSense 或任何第三方廣告。未來若啟用廣告，Google 及其他第三方供應商可能會使用 Cookie，依你先前造訪本站或其他網站的紀錄放送個人化廣告。你可前往 Google 廣告設定（google.com/settings/ads）關閉個人化廣告，或前往 aboutads.info 了解第三方供應商 Cookie 的選擇退出方式。屆時本頁會更新對應說明。",
        "第三方連結：本站可能包含指向外部網站的連結，這些網站有各自的隱私權政策，本站不對其內容或做法負責。",
        "兒童隱私：本站並非以兒童為對象，且不會在知情情況下蒐集未滿 16 歲兒童的個人資料。",
        "你的權利：由於本站預設不蒐集可識別個人身分的資料，通常沒有可供存取或刪除的個人資料。若你位於歐盟 / 英國（GDPR）或加州（CCPA / CPRA）等地區並對資料處理有疑問，可透過下方聯絡方式與我們聯繫。",
        "安全提醒：請避免在任何線上工具中輸入高度敏感的個人資料、密碼、金融帳號或機密資訊。",
        `政策更新：本站可能不定期更新本政策，重大變更會更新本頁生效日期。如有疑問請來信 ${SITE.email}。`,
      ],
    },
    terms: {
      title: '使用條款',
      seoTitle: '使用條款｜免費工具箱',
      description: '免費工具箱的使用條款與基本使用規則。',
      body: [
        "生效日期：2026 年 6 月 16 日。使用免費工具箱（funnytools.win）即表示你同意本使用條款。",
        "服務說明：本站提供免費、免安裝的線上小工具，僅供一般資訊與日常便利之用。",
        "使用者責任：你應自行確認輸入資料是否正確，並自行判斷結果是否適合你的情境。請勿在本站工具中輸入高度敏感個資、密碼、金融帳號、機密文件或未經授權處理的第三方資料。",
        "「依現狀」提供：本站工具與內容均以「現狀」與「現有」基礎提供，不附任何明示或默示之擔保，包括但不限於適售性、特定用途之適用性與不侵權。我們不保證工具結果完全準確、不中斷或無錯誤。",
        "責任限制：在法律允許的最大範圍內，對於因使用或無法使用本站所造成之任何直接、間接、附帶或衍生性損害，本站均不負賠償責任。",
        "可接受使用：你同意以合法方式使用本站，不得從事干擾網站運作、嘗試入侵、大量自動化抓取或其他濫用行為。",
        "智慧財產權：本站名稱、設計、程式碼與內容受著作權等智慧財產權保護；你可正常使用工具，但不得未經授權重製或散布本站內容。提供「嵌入」功能的工具，請依嵌入頁面的說明使用。",
        "第三方服務：本站未來可能整合第三方服務（例如廣告或分析），這些服務有其自身條款與政策。",
        "變更：我們可能隨時調整工具、分類、功能或本條款；重大變更會更新本頁生效日期。",
        "準據法：本條款依中華民國（台灣）法律解釋與適用。",
        `聯絡：如有任何問題，請來信 ${SITE.email}。`,
      ],
    },
    disclaimer: {
      title: '免責聲明',
      seoTitle: '免責聲明｜免費工具箱',
      description: '免費工具箱的工具結果限制與使用者責任說明。',
      body: [
        "生效日期：2026 年 6 月 16 日。本站提供的所有結果僅供一般參考，使用前請自行判斷並驗證。",
        "非專業建議：本站不提供法律、醫療、投資、稅務、會計或其他專業建議。",
        "財務 / 薪資 / 貸款類工具：薪資、加班費、貸款、複利、稅務等計算採用你輸入的參數與一般公式，結果為概估，可能因法規調整、實際條件或四捨五入而與官方或金融機構之計算不同；正式金額請以主管機關公告或專業人士意見為準。",
        "資料來源與公式限制：部分工具使用簡化公式、常見假設或使用者自行輸入的條件，不會涵蓋所有例外狀況、地區差異、公司制度或即時法規變更。",
        "健康類工具：相關結果僅供自我參考，並非醫療診斷工具，不能取代醫師或專業人員的評估。",
        "隨機工具：隨機抽選結果不應用於法律上具拘束力之抽獎、博弈或其他須符合特定法規的用途。",
        "責任歸屬：你依本站工具結果所做的任何決策與後續行動，皆由你自行負責。",
      ],
    },
    aboutTools: {
      title: '本站工具如何運作',
      seoTitle: '本站工具如何運作｜免費工具箱',
      description: '了解免費工具箱的本機處理、資料上傳、結果限制、錯誤回報與新工具建議方式。',
      body: [
        "免費工具箱的多數工具是直接在瀏覽器中執行的靜態網頁工具。你打開工具頁後，輸入欄位、按鈕、計算公式與結果顯示通常都在目前瀏覽器分頁內完成。",
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
      title: 'About Free Tools Hub',
      seoTitle: 'About Free Tools Hub',
      description: 'Learn what Free Tools Hub is, how its tools work, and what categories it covers.',
      body: [
        "Free Tools Hub is a free, no-install, no-sign-up website that gathers everyday tools for work, study, money, and daily life into clean, readable, mobile-friendly pages.",
        "More than 40 tools are live, spanning Money & Salary, Work & Time, Random, Text & Writing, Image & File, PDF, Drawing & CAD, and Student & Teacher, with more added over time.",
        "The site prioritizes tools that can run locally in your browser, reducing unnecessary data transfer. Unless a tool page clearly says otherwise, text, lists, numbers, images, and PDFs are processed in your current browser session.",
        "Tool results are meant for everyday convenience, learning, and preliminary estimates. For salary, tax, loans, investments, medical, legal, or other professional matters, verify with official sources or qualified professionals.",
        `For tool suggestions, bug reports, content corrections, or site-related questions, email ${SITE.email}.`,
      ],
    },
    contact: {
      title: 'Contact',
      seoTitle: 'Contact Free Tools Hub',
      description: 'Contact Free Tools Hub for bug reports, suggestions, or site-related questions.',
      body: [
        `For bug reports, tool suggestions, content questions, or site-related questions, email ${SITE.email}.`,
        'When reporting an issue, include the tool page URL, approximate input conditions, expected result, actual result, device, and browser version. This helps us reproduce and check the issue faster.',
        'When suggesting a new tool, briefly explain what problem it should solve, what inputs it should accept, what result it should produce, and when you would use it.',
        'The site does not provide live support, personal financial planning, legal, medical, or tax advice. For matters affecting formal rights or obligations, contact an official source, employer, bank, or qualified professional.',
      ],
    },
    privacy: {
      title: 'Privacy Policy',
      seoTitle: 'Privacy Policy | Free Tools Hub',
      description: 'How Free Tools Hub handles local browser tools, user input, accounts, and future advertising cookies.',
      body: [
        "Effective date: June 16, 2026. This Privacy Policy explains how Free Tools Hub (funnytools.win, the \"Site\") handles your data.",
        "The Site is static, and all tools run locally in your browser by default. The text, numbers, lists, and settings you enter are not sent to a Free Tools Hub server, are not stored by us, and no account or registration is required.",
        "Local-processing scope: Text tools, random pickers, timers, salary and loan estimates, image tools, PDF tools, and drawing tools are designed around browser-side processing. If a future tool requires a network service, that tool page will say so clearly.",
        "Local storage: Some tools use your browser's localStorage to remember preferences (such as Pomodoro lengths). That data stays on your device and can be removed any time by clearing your browser data.",
        "Cookies and advertising: The Site currently runs no Google AdSense or any third-party ads. If advertising is enabled later, Google and other third-party vendors may use cookies to serve personalized ads based on your prior visits to this and other sites. You can opt out of personalized advertising at Google Ads Settings (google.com/settings/ads), or learn about third-party vendor cookies at aboutads.info. This page will be updated when that happens.",
        "Third-party links: The Site may link to external websites that have their own privacy policies; we are not responsible for their content or practices.",
        "Children's privacy: The Site is not directed to children and does not knowingly collect personal data from children under 16.",
        "Your rights: Because the Site does not collect personally identifiable information by default, there is usually no personal data to access or delete. If you are in the EU/UK (GDPR) or California (CCPA/CPRA) and have questions about data handling, contact us using the details below.",
        "Safety reminder: Please avoid entering highly sensitive personal data, passwords, financial account numbers, or confidential information into any online tool.",
        `Updates: We may update this policy from time to time and will revise the effective date above for material changes. Questions: ${SITE.email}.`,
      ],
    },
    terms: {
      title: 'Terms of Use',
      seoTitle: 'Terms of Use | Free Tools Hub',
      description: 'Basic terms for using Free Tools Hub.',
      body: [
        "Effective date: June 16, 2026. By using Free Tools Hub (funnytools.win), you agree to these Terms of Use.",
        "Service: The Site offers free, no-install online tools for general information and everyday convenience only.",
        "User responsibility: You are responsible for checking whether your inputs are correct and whether results fit your situation. Do not enter highly sensitive personal data, passwords, financial account numbers, confidential documents, or third-party data you are not authorized to process.",
        "\"As is\": The tools and content are provided on an \"as is\" and \"as available\" basis, without warranties of any kind, express or implied, including merchantability, fitness for a particular purpose, and non-infringement. We do not warrant that results are fully accurate, uninterrupted, or error-free.",
        "Limitation of liability: To the maximum extent permitted by law, the Site is not liable for any direct, indirect, incidental, or consequential damages arising from your use of, or inability to use, the Site.",
        "Acceptable use: You agree to use the Site lawfully and not to interfere with its operation, attempt to breach it, perform bulk automated scraping, or otherwise abuse it.",
        "Intellectual property: The Site name, design, code, and content are protected by copyright and other rights. You may use the tools normally but may not reproduce or redistribute Site content without authorization. For tools that offer an \"embed\" feature, follow the instructions on the embed page.",
        "Third-party services: The Site may integrate third-party services in the future (such as advertising or analytics), which have their own terms and policies.",
        "Changes: We may change tools, categories, features, or these Terms at any time; material changes will update the effective date above.",
        "Governing law: These Terms are interpreted under the laws of the Republic of China (Taiwan).",
        `Contact: For any questions, email ${SITE.email}.`,
      ],
    },
    disclaimer: {
      title: 'Disclaimer',
      seoTitle: 'Disclaimer | Free Tools Hub',
      description: 'Limitations of Free Tools Hub results and user responsibility.',
      body: [
        "Effective date: June 16, 2026. All results from the Site are for general reference only; use your own judgment and verify before relying on them.",
        "Not professional advice: The Site does not provide legal, medical, investment, tax, accounting, or other professional advice.",
        "Financial / salary / loan tools: Salary, overtime, loan, compound-interest, and tax calculations use the parameters you enter and general formulas. Results are estimates and may differ from official or financial-institution figures due to regulatory changes, real conditions, or rounding; rely on official announcements or qualified professionals for binding amounts.",
        "Data and formula limits: Some tools use simplified formulas, common assumptions, or user-entered conditions. They may not cover every exception, regional difference, company policy, school rule, or real-time regulatory change.",
        "Health tools: Related results are for self-reference only, are not medical diagnostic tools, and do not replace evaluation by a physician or professional.",
        "Random tools: Random results should not be used for legally binding raffles, gambling, or other purposes subject to specific regulations.",
        "Responsibility: Any decisions and follow-up actions you take based on the tools are your own responsibility.",
      ],
    },
    aboutTools: {
      title: 'How Our Tools Work',
      seoTitle: 'How Our Tools Work | Free Tools Hub',
      description: 'Learn about local processing, data uploads, result limitations, bug reports, and new tool suggestions.',
      body: [
        "Most Free Tools Hub tools are static browser tools. After you open a tool page, form inputs, buttons, formulas, and result displays usually run inside your current browser tab.",
        "Local-processing tools include word counters, case converters, text cleanup tools, random pickers, timers, salary and loan calculators, image compression and conversion, PDF merge and split tools, sketching, and flowchart tools. These inputs are not actively uploaded to Free Tools Hub servers.",
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
