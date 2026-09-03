import type { SeoGuide } from './seoGuides';

/**
 * First editorial cluster for the 1,500-page expansion.
 *
 * These guides are intentionally kept in a separate source file so each
 * authoring batch can be reviewed without rewriting the historical guide
 * catalogue. They are not added to the published set until the related QR
 * cluster is complete and the release gate is approved.
 */
export const additionalSeoGuides: SeoGuide[] = [
  {
    id: 'qr-code-before-print-testing-guide',
    locales: ['zh', 'en'],
    slug: 'qr-code-before-print-testing-guide',
    title: {
      zh: 'QR Code 列印前測試指南',
      en: 'QR Code Testing Checklist Before You Print',
    },
    metaTitle: {
      zh: 'QR Code 列印前怎麼測試？連結、尺寸與備援檢查清單',
      en: 'How to Test a QR Code Before Printing: Checklist',
    },
    metaDescription: {
      zh: '列印 QR Code 前，依序檢查網址、語言、手機掃描、對比、四周留白、實體尺寸與備援文字，避免海報或講義印出後才發現連不上或導向錯誤，造成重印浪費。',
      en: 'Test a QR code before printing: verify the destination, scan on more than one phone, check contrast and quiet space, and add a fallback URL.',
    },
    h1: {
      zh: 'QR Code 列印前測試：一張紙上線前的完整檢查清單',
      en: 'How to Test a QR Code Before Printing: A Complete Preflight Checklist',
    },
    category: { zh: 'QR Code 與條碼', en: 'QR codes and barcodes' },
    priority: 31,
    searchIntent: {
      zh: '使用者已經有 QR Code，想在印刷或大量張貼前確認掃描、網址與版面不會出錯。',
      en: 'A user already has a QR code and wants to verify scanning, destination, and layout before printing or distributing it widely.',
    },
    targetKeywords: [
      { zh: 'QR Code 列印前測試', en: 'test QR code before printing' },
      { zh: 'QR Code 掃不到怎麼辦', en: 'QR code not scanning checklist' },
      { zh: 'QR Code 印刷檢查', en: 'QR code print test' },
    ],
    relatedToolIds: ['qr-code-generator', 'image-resizer', 'image-compressor'],
    relatedGuideIds: ['qr-code-print-size-guide', 'qr-code-classroom-guide', 'qr-code-mobile-landing-page-guide'],
    relatedWorkflowIds: [],
    summary: {
      zh: 'QR Code 能不能使用，不只取決於產生器畫面上的預覽；網址、對比、周圍留白、實際列印尺寸與手機鏡頭都要在成品情境中測試。',
      en: 'A QR code is not ready merely because its generator preview works. Verify the URL, contrast, quiet space, physical size, and real-phone scanning in the final context.',
    },
    problem: {
      zh: '螢幕上的 QR Code 通常很清楚，但縮小到名片、放進低對比海報，或被裁切掉外圍留白後，讀者可能完全掃不到。印刷後才修正還會浪費紙張與張貼時間。',
      en: 'A code can scan on a large monitor yet fail on a business card, a low-contrast poster, or a crop that removes the surrounding quiet space. Discovering that after printing wastes paper and distribution time.',
    },
    whoShouldUse: {
      zh: '適合製作活動海報、菜單、講義、包裝貼紙、名片、展場指示牌與家長通知的店家、教師、社群管理者與設計人員。',
      en: 'Use this for event posters, menus, worksheets, packaging labels, business cards, signs, and parent notices.',
    },
    explanation: [
      {
        zh: '先驗證目的地，再測試圖形。把 QR Code 解碼後得到的網址貼到瀏覽器，確認網域、路徑、語言與活動日期都正確；不要只看網址前半段。若頁面需要登入、只在公司網路可用，或手機上會跳轉到錯誤語言，掃描成功仍不代表使用者能完成下一步。',
        en: 'Verify the destination before testing the pixels. Open the decoded URL and check the domain, path, language, and event date—not only the first part of the address. A successful scan is not useful if the page requires a login, works only on an office network, or redirects a phone to the wrong language.',
      },
      {
        zh: '使用本站 QR Code 產生器建立測試檔後，至少用兩支不同手機掃描：一支較新的機型、一支較舊或不同品牌的機型。先在螢幕預覽，再把檔案以預計的尺寸列印一張；鏡頭距離、紙張反光與環境光線都可能改變結果。這是情境測試，不是保證所有相機都能讀取。',
        en: 'After creating a test file with the QR Code generator, scan it with at least two different phones: one newer device and one older or different-brand device. Test the screen preview, then print one sample at the intended size. Camera distance, paper glare, and ambient light can change the result; this is a context test, not a promise that every camera will decode it.',
      },
      {
        zh: '保留深色模組、淺色背景與完整外圍留白。DENSO WAVE 的 QR Code 說明指出，定位圖樣與空白區是讀取結構的一部分；把圖案貼到複雜照片上、反轉前景背景、或讓文字緊貼邊緣，都會降低辨識容錯。若一定要放品牌色，先在實際紙張上確認明暗差，而不是只在設計軟體中看色票。',
        en: 'Keep dark modules, a light background, and the full quiet space around the symbol. DENSO WAVE explains that the finder patterns and blank margin are part of the readable structure. Placing a code on a busy photo, inverting foreground and background, or crowding text against its edge reduces tolerance. If brand colors are required, check their lightness difference on the actual paper rather than trusting a design-app swatch.',
      },
      {
        zh: '最後做「讀者路徑」測試：掃描後能否在三秒內看懂頁面要做什麼？若 QR Code 旁沒有短網址、電話或簡短說明，鏡頭故障或使用者不想掃描時就沒有替代路徑。備援文字也應與 QR 目的地保持同一個版本，活動換頁時同步更新。',
        en: 'Finish with a reader-path test: can someone understand what to do within three seconds after scanning? A short URL, phone number, or one-line instruction gives people a fallback when a camera fails or they prefer not to scan. Keep that fallback aligned with the same destination version when the campaign changes.',
      },
      {
        zh: '可參考 DENSO WAVE 的 QR Code 基礎說明（https://www.qrcode.com/en/about/）理解定位圖樣、錯誤修正與資料容量等結構限制；視覺可讀性仍須回到你的紙張、尺寸與光線做實測。',
        en: 'For the underlying structure, see DENSO WAVE’s QR Code basics (https://www.qrcode.com/en/about/), including finder patterns, error correction, and data capacity. Readability still has to be tested on your paper, at your size, under your lighting.',
      },
    ],
    steps: [
      { zh: '解碼或掃描測試檔，逐字核對目的地網址、語言、活動日期與是否需要登入。', en: 'Decode the test file and check the destination URL, language, event date, and login requirement.' },
      { zh: '在兩支不同手機上測試螢幕版本；每支手機都要實際開啟頁面，不只看相機跳出的網址。', en: 'Test the screen version on two different phones and open the page on each device.' },
      { zh: '以預計的實體尺寸列印一張，檢查深淺對比、四周留白、裁切線與紙張反光。', en: 'Print one sample at the intended physical size and inspect contrast, quiet space, trim, and glare.' },
      { zh: '從讀者預計的距離與角度掃描，記錄是否需要靠近、歪斜或重試。', en: 'Scan from the expected distance and angle, noting whether users must move closer, tilt, or retry.' },
      { zh: '在 QR Code 旁放置短網址或簡短指示，並由另一位未參與設計的人照指示完成一次。', en: 'Add a short URL or one-line instruction and ask someone outside the design process to follow it once.' },
      { zh: '保存最後核准的圖檔與網址版本；若活動目的地改變，重新產生或更新對應素材並再測一次。', en: 'Save the approved image and URL version. If the destination changes, update the matching asset and repeat the test.' },
    ],
    example: {
      zh: '社區講座要印 200 張 A5 海報。設計者先用產生器輸出 QR Code，掃描後發現手機會導向英文頁；修正後再用新款 Android 與舊款 iPhone 掃描。最後以海報實際尺寸列印，從兩公尺處測試，並在旁邊加上「掃描報名；無法掃描請輸入 example.org/talk」的備援文字。這份測試記錄比「設計檔看起來沒問題」更能支援印刷決定。',
      en: 'A community lecture needs 200 A5 posters. The designer first scans the generated code and notices that phones land on the English page. After fixing the destination, they test a newer Android and an older iPhone, print at poster size, scan from two metres away, and add “Scan to register; use example.org/talk if scanning fails.” That record supports the print decision better than “the design file looked fine.”',
    },
    commonMistakes: [
      { zh: '只在設計軟體或大型螢幕預覽，沒有按最終尺寸列印。', en: 'Testing only in a design app or on a large monitor instead of at final print size.' },
      { zh: '掃描成功就直接發布，卻沒有確認手機開啟後的頁面、語言與權限。', en: 'Treating a successful decode as proof that the mobile page, language, and permissions work.' },
      { zh: '裁切掉 QR Code 四周留白，或把文字、邊框壓到圖案邊緣。', en: 'Cropping the quiet space or pushing text and borders against the symbol.' },
      { zh: '只用一支手機測試，忽略舊機型、不同相機與現場光線。', en: 'Using one phone only and ignoring older cameras or venue lighting.' },
      { zh: 'QR Code 目的地更新後，忘記同步短網址、說明文字與已印素材。', en: 'Changing the destination without updating the fallback URL, instruction, and printed assets.' },
    ],
    faq: [
      { question: { zh: '一定要列印後才能測試嗎？', en: 'Do I have to print a QR code to test it?' }, answer: { zh: '不一定。螢幕測試能先抓出網址或編碼錯誤，但最終仍應以預計尺寸列印一張，因為紙張、反光、距離與裁切在螢幕上不存在。', en: 'No. Screen tests catch URL and encoding errors early, but print one sample at the intended size because paper, glare, distance, and trimming do not exist on a screen.' } },
      { question: { zh: '要用幾支手機測試？', en: 'How many phones should I use?' }, answer: { zh: '至少兩支不同品牌或世代的手機，並實際開啟目的地頁面。若是大量張貼或重要活動，再請未參與設計的人按讀者路徑測一次。', en: 'At least two phones from different brands or generations, opening the destination page each time. For a large distribution, also ask someone outside the design process to follow the reader path.' } },
      { question: { zh: 'QR Code 可以用彩色嗎？', en: 'Can a QR code use color?' }, answer: { zh: '可以嘗試，但重點是模組與背景有足夠明暗差、圖案不被照片干擾，並以實際紙張測試。不要把可讀性建立在某台手機一定能辨識的假設上。', en: 'It can, provided the modules remain clearly different in lightness from the background and are not lost in a photo. Test on the real paper instead of assuming one phone’s camera represents everyone.' } },
    ],
    cta: {
      zh: '用 FunnyTools QR Code 產生器輸出測試檔，完成螢幕、實體尺寸與備援路徑三輪檢查，再交付印刷。',
      en: 'Create a test file with the FunnyTools QR Code generator, complete the screen, physical-size, and fallback-path checks, then send it to print.',
    },
    updatedAt: '2026-09-02',
    noFaqSchema: true,
  },
  {
    id: 'qr-code-mobile-landing-page-guide',
    locales: ['zh', 'en'],
    slug: 'qr-code-mobile-landing-page-guide',
    title: {
      zh: 'QR Code 掃描後手機頁面設計指南',
      en: 'QR Code Mobile Landing Page Guide',
    },
    metaTitle: {
      zh: 'QR Code 掃描後頁面怎麼設計？手機操作、語言與備援清單',
      en: 'QR Code Mobile Landing Page Checklist',
    },
    metaDescription: {
      zh: 'QR Code 掃描成功只是開始：檢查手機頁面載入、單手操作、標題、語言、表單欄位、無障礙與無法掃描時的替代路徑，降低入口流失、表單中斷與誤解風險。',
      en: 'After a QR scan, check mobile loading, headings, forms, language, accessibility, and a fallback path for people who cannot scan.',
    },
    h1: {
      zh: 'QR Code 掃描後要看到什麼？手機落地頁的實用檢查清單',
      en: 'What Should Happen After a QR Scan? A Practical Mobile Landing Page Checklist',
    },
    category: { zh: 'QR Code 與條碼', en: 'QR codes and barcodes' },
    priority: 32,
    searchIntent: {
      zh: '使用者的 QR Code 可以掃描，但想改善掃描後的手機頁面、表單與行動流程，避免訪客到站後找不到下一步。',
      en: 'A QR code scans successfully, but the owner wants the mobile page, form, and next action to work clearly after the scan.',
    },
    targetKeywords: [
      { zh: 'QR Code 掃描後頁面', en: 'QR code mobile landing page' },
      { zh: 'QR Code 手機版表單', en: 'QR code mobile form checklist' },
      { zh: 'QR Code 無障礙替代文字', en: 'QR code accessibility fallback' },
    ],
    relatedToolIds: ['qr-code-generator', 'url-encoder'],
    relatedGuideIds: ['qr-code-before-print-testing-guide', 'qr-code-print-size-guide', 'qr-code-classroom-guide'],
    relatedWorkflowIds: [],
    summary: {
      zh: '掃描器只負責把人帶到網址；落地頁必須在小螢幕、弱網路與不同語言情境下，清楚交代目的、下一步與替代入口。',
      en: 'The scanner only gets people to a URL. The landing page must explain the purpose, next action, and fallback on a small screen, a weak connection, and different language settings.',
    },
    problem: {
      zh: 'QR Code 掃描成功卻沒有報名，常見原因不是圖案，而是頁面在手機上載入太慢、按鈕藏在長文裡、表單要求太多欄位，或英文使用者被送到看不懂的中文頁。',
      en: 'A successful scan can still produce no registration when the page loads slowly, hides the button below a long article, asks for too many fields, or sends an English reader to an unreadable Chinese page.',
    },
    whoShouldUse: {
      zh: '適合活動報名、菜單、課程講義、包裝說明、展場導覽與任何把紙本讀者帶到手機頁面的團隊。',
      en: 'Use this for registrations, menus, course handouts, packaging instructions, venue maps, and any printed-to-mobile journey.',
    },
    explanation: [
      {
        zh: '第一屏要回答三件事：這是什麼、我現在能做什麼、如果不想繼續要去哪裡。把頁面標題與主要按鈕放在不必滑動太久的位置，避免掃描者先看到彈窗、輪播或與任務無關的廣告。',
        en: 'The first screen should answer three questions: what is this, what can I do now, and where can I go if I do not continue? Put the heading and primary action where users do not need a long scroll, and avoid making a popup, carousel, or unrelated ad the first obstacle.',
      },
      {
        zh: '表單只問完成任務所需的資料。活動報名可能需要姓名與聯絡方式，但不應因為 QR Code 入口就順手要求生日、完整住址或其他無關欄位；欄位旁說明用途，錯誤訊息要指出怎麼修正。',
        en: 'Ask only for data needed to complete the task. Registration may need a name and contact method, but a QR entry is not a reason to request a birthday, full address, or unrelated details. Explain each field and make errors actionable.',
      },
      {
        zh: '手機可用性不只等於縮小桌面版。確認按鈕有足夠觸控空間、文字不需要左右捲動、輸入欄位會叫出合適鍵盤，並在 iOS 與 Android 各測一次。可參考 W3C WCAG 2.2 的可操作性與輸入協助原則（https://www.w3.org/TR/WCAG22/），再依實際頁面檢查。',
        en: 'Mobile usability is more than shrinking a desktop page. Check touch targets, horizontal overflow, suitable input keyboards, and one iOS and one Android device. Use the W3C WCAG 2.2 principles (https://www.w3.org/TR/WCAG22/) as a reference, then test the actual page.',
      },
      {
        zh: '多語入口要讓使用者看得出目前語言，也能手動切換。不要只依瀏覽器語言自動跳轉；在 QR Code 旁與頁面內都可放短網址或語言連結，避免錯誤分流讓使用者以為 QR Code 壞掉。',
        en: 'A multilingual entry should show the current language and offer a manual switch. Do not rely only on browser-language detection; provide a short URL or language links beside the code and on the page so a wrong redirect does not look like a broken QR code.',
      },
      {
        zh: '載入失敗、沒有相機權限或不便掃描的人仍應有替代路徑。W3C 對非文字內容與輸入協助的精神是提供可理解的文字資訊；在紙面放短網址，在頁面提供可複製連結與聯絡方式，能讓流程不依賴單一感測器。',
        en: 'People with a failed load, no camera permission, or no desire to scan still need a fallback. The W3C approach to text alternatives and input assistance supports understandable text information; put a short URL on paper and a copyable link and contact method on the page so the journey does not depend on one sensor.',
      },
    ],
    steps: [
      { zh: '在手機私密瀏覽視窗開啟目的地，確認第一屏立即說明用途與主要行動。', en: 'Open the destination in a phone private window and confirm the first screen states the purpose and main action.' },
      { zh: '用一支 iOS 與一支 Android 測試載入、文字、按鈕、表單鍵盤與錯誤訊息。', en: 'Test loading, text, buttons, form keyboards, and error messages on one iOS and one Android phone.' },
      { zh: '關閉圖片或模擬較慢網路，確認頁面仍能讀懂，且沒有先跳出阻擋內容的彈窗。', en: 'Try a slow connection or blocked images and confirm the page remains understandable without a blocking popup.' },
      { zh: '切換中英文頁，核對標題、日期、價格、表單欄位與提交後訊息沒有混語或錯誤路徑。', en: 'Switch between English and Chinese and check headings, dates, prices, fields, and confirmation messages for mixed language or wrong paths.' },
      { zh: '用鍵盤或輔助技術走過主要按鈕與表單，確認焦點順序與標籤可理解。', en: 'Move through the main buttons and form with a keyboard or assistive technology and check focus order and labels.' },
      { zh: '在紙面與落地頁都放置備援短網址，並請未參與設計的人只看第一屏完成一次任務。', en: 'Put a fallback short URL on the paper and page, then ask someone outside the design process to complete the task from the first screen.' },
    ],
    example: {
      zh: '展場 QR Code 導向報名頁。第一次測試發現表單在手機上要填 12 欄，英文訪客還被自動送到中文頁。團隊改成只收姓名與 Email，新增清楚的語言切換、可複製短網址與提交成功訊息，再用弱網路和兩種手機重測。掃描率沒有被誤當成報名率，兩者分開記錄。',
      en: 'A venue QR code opens a registration page. Testing shows twelve phone fields and an automatic redirect that sends English visitors to Chinese. The team reduces the form to name and email, adds a visible language switch, a copyable short URL, and a clear success message, then retests on two phones and a slow connection. Scan rate is not mistaken for registration rate; they are measured separately.',
    },
    commonMistakes: [
      { zh: '把桌面版頁面縮小就當成手機落地頁完成。', en: 'Treating a shrunken desktop page as a finished mobile landing page.' },
      { zh: 'QR Code 掃描後立刻跳出訂閱或廣告彈窗，遮住使用者真正要做的事。', en: 'Showing a subscription or ad popup immediately and hiding the task.' },
      { zh: '表單收集超出任務所需的個資，卻沒有說明用途與保存方式。', en: 'Collecting more personal data than the task needs without explaining use or retention.' },
      { zh: '只測掃描是否成功，沒有測目的地頁面的語言、提交流程與錯誤狀態。', en: 'Testing only whether scanning works, not the destination language, submission path, or error state.' },
      { zh: '沒有紙面短網址或頁面可複製連結，讓不能掃描的人無法繼續。', en: 'Providing no printed short URL or copyable page link for people who cannot scan.' },
    ],
    faq: [
      { question: { zh: 'QR Code 掃描後一定要直接開表單嗎？', en: 'Should a QR code open a form immediately?' }, answer: { zh: '不一定。若使用者需要先知道活動內容、價格、語言或隱私說明，先到清楚的手機落地頁通常更容易完成決定；表單仍應保持短而聚焦。', en: 'No. If users need context, price, language, or privacy information first, a clear mobile landing page can support the decision better. Keep the form short and focused.' } },
      { question: { zh: '要不要依手機語言自動跳轉？', en: 'Should the page auto-redirect by phone language?' }, answer: { zh: '可以作為輔助，但不要拿掉手動切換與清楚語言標示。自動判斷可能受裝置設定、翻譯或共用手機影響，錯誤時要能自行修正。', en: 'It may help, but keep a manual switch and an explicit language label. Device settings and shared phones can make detection wrong, so users need a way to correct it.' } },
      { question: { zh: '如何照顧不方便掃描的人？', en: 'How do I support people who cannot scan?' }, answer: { zh: '在紙面放短網址或電話，在頁面提供可複製連結與替代聯絡方式；不要把 QR Code 當成唯一入口。', en: 'Print a short URL or phone number and provide a copyable link and contact alternative on the page. Do not make the QR code the only entrance.' } },
    ],
    cta: {
      zh: '先用 QR Code 產生器建立入口，再以手機、弱網路、語言切換與備援路徑逐項驗證落地頁。',
      en: 'Create the entry with the QR Code generator, then validate the landing page on phones, a slow connection, both languages, and the fallback path.',
    },
    updatedAt: '2026-09-03',
    noFaqSchema: true,
  },
  {
    id: 'qr-code-payload-length-guide',
    locales: ['zh', 'en'],
    slug: 'qr-code-payload-length-guide',
    title: {
      zh: 'QR Code 內容長度與密度指南',
      en: 'QR Code Payload Length and Density Guide',
    },
    metaTitle: {
      zh: 'QR Code 可以放多少文字？網址、Unicode 與內容密度怎麼取捨',
      en: 'QR Code Text Capacity and Density Guide',
    },
    metaDescription: {
      zh: 'QR Code 不是越能塞資料越好：比較短網址、純文字、中文與 Emoji 對容量和模組密度的影響，並用最少資料設計可測試、可維護的入口與頁面。',
      en: 'Learn how URL length, plain text, Chinese, and emoji affect QR density, then design a short, testable entry.',
    },
    h1: {
      zh: 'QR Code 可以放多少內容？從短網址到中文 Emoji 的密度取捨',
      en: 'How Much Can a QR Code Store? Density Trade-offs from Short URLs to Unicode',
    },
    category: { zh: 'QR Code 與條碼', en: 'QR codes and barcodes' },
    priority: 33,
    searchIntent: {
      zh: '使用者想把文字、網址、中文或 Emoji 放進 QR Code，並理解內容變長後為何圖案變密、尺寸需求變大或難以掃描。',
      en: 'A user wants to encode text, URLs, Chinese, or emoji and needs to understand why longer payloads make a symbol denser and harder to scan at small sizes.',
    },
    targetKeywords: [
      { zh: 'QR Code 文字容量', en: 'QR code text capacity' },
      { zh: 'QR Code 中文 Emoji', en: 'QR code Chinese emoji' },
      { zh: 'QR Code 網址太長', en: 'QR code URL too long' },
    ],
    relatedToolIds: ['qr-code-generator', 'url-encoder', 'character-counter'],
    relatedGuideIds: ['qr-code-before-print-testing-guide', 'qr-code-mobile-landing-page-guide', 'qr-code-print-size-guide'],
    relatedWorkflowIds: [],
    summary: {
      zh: 'QR Code 的容量與圖案版本、錯誤修正、資料類型和字元編碼有關；實務上優先放短而穩定的入口，讓詳細內容留在手機頁。',
      en: 'QR capacity depends on symbol version, error correction, data type, and encoding. In practice, use a short stable entry and keep detailed content on the mobile page.',
    },
    problem: {
      zh: '把整段說明、名單或長網址直接塞入 QR Code，圖案很快變得密集。設計檔在螢幕上仍能掃描，縮到貼紙或講義後卻需要更近距離，使用者便誤以為產生器失效。',
      en: 'Putting a full instruction, list, or long URL inside the symbol quickly increases density. It may scan on a large screen yet require a much closer camera on a sticker or worksheet, making the generator look broken.',
    },
    whoShouldUse: {
      zh: '適合要編入網址、聯絡資訊、短訊息、產品說明或活動資料的設計者、教師、店家與開發者。',
      en: 'Use this when encoding URLs, contact details, short messages, product instructions, or event data for print or screen.',
    },
    explanation: [
      {
        zh: 'QR Code 有不同 version 與資料容量上限；內容越長，通常需要更多 modules。若固定印刷寬度，modules 越多代表每個小方格越小，遠距離或低品質鏡頭更難分辨。DENSO WAVE 的容量表也提醒，容量會依數字、英數、位元組與漢字模式而變，不能用一個「固定字數」回答所有情況。',
        en: 'QR codes have symbol versions and data limits; longer payloads generally require more modules. At a fixed print width, more modules make each cell smaller and harder to resolve at distance or with a poor camera. DENSO WAVE’s capacity tables also show that limits vary by numeric, alphanumeric, byte, and Kanji modes, so there is no universal character count.',
      },
      {
        zh: '網址通常比把整篇內容直接編入更適合印刷。網址只需提供入口，頁面可以承載標題、說明、圖片、語言切換與更新；若要追蹤來源，用你控制的短路徑加上不含個資的參數，並先測試參數是否會被系統截斷。',
        en: 'A URL is usually better for print than embedding an entire article. The URL provides the entry while the page holds headings, instructions, images, language switching, and updates. If source measurement is needed, use a controlled short path with non-identifying parameters and test that the parameters survive redirects.',
      },
      {
        zh: '中文、日文或 Emoji 不應只用肉眼計算「幾個字」。不同編碼模式與 UTF-8 位元組可能需要不同容量；Emoji 還可能由多個 code point 組成。若內容是跨裝置顯示的文字，先用字元計數工具檢查長度，再用兩種手機解碼與開啟結果。',
        en: 'Do not estimate Chinese, Japanese, or emoji capacity by counting visible glyphs alone. Encoding modes and UTF-8 bytes can require different capacity, and an emoji may contain multiple code points. For cross-device text, check length with a character counter, then decode and open the result on two phones.',
      },
      {
        zh: '錯誤修正提高可恢復程度，也會增加符號需要的資料。當目標是小尺寸印刷時，先縮短 payload 通常比盲目提高容錯更有效；容錯等級仍應依紙張磨損、Logo 與實際環境選擇，不能拿百分比當作可遮住的面積。',
        en: 'Higher error correction improves recoverability but also adds symbol data. For a small print target, shortening the payload is often more effective than blindly increasing correction; choose the level for paper wear, logos, and context, not as a percentage of surface area that may be covered.',
      },
      {
        zh: '不要把秘密、存取權杖或不必要的個資當成「方便」塞進圖案。QR Code 常被拍照、轉貼與長期保存；需要權限的內容應由受控 HTTPS 頁面處理，並設定適當的失效與撤銷機制。',
        en: 'Do not put secrets, access tokens, or unnecessary personal data in a symbol for convenience. QR codes are photographed, reposted, and kept; protected content belongs behind a controlled HTTPS page with an appropriate expiry and revocation process.',
      },
    ],
    steps: [
      { zh: '先寫出使用者掃描後真正需要完成的任務，把詳細說明移到手機頁。', en: 'Write the task users must complete after scanning and move detailed instructions to the mobile page.' },
      { zh: '用字元計數工具比較網址、純文字與中文／Emoji 版本，不用肉眼猜容量。', en: 'Compare URL, plain-text, and Chinese/emoji versions with a character counter instead of guessing.' },
      { zh: '優先縮短並穩定網址；移除不必要的追蹤參數、空白與重複內容，但不要移除必要語意。', en: 'Prefer a short stable URL; remove unnecessary parameters, whitespace, and repetition without removing required meaning.' },
      { zh: '以預計尺寸產生圖檔，檢查 modules 是否過密，再依環境調整錯誤修正等級。', en: 'Generate at the intended size, inspect module density, and then choose error correction for the context.' },
      { zh: '用兩支手機解碼，確認中文、Emoji、跳轉參數與 HTTPS 頁面都照預期顯示。', en: 'Decode with two phones and confirm Chinese, emoji, redirect parameters, and the HTTPS page behave as expected.' },
      { zh: '若仍需縮小，先回到 payload 與頁面架構處理，不要只把圖案硬縮到看不清楚。', en: 'If the symbol is still too large, fix the payload or page architecture instead of shrinking an unreadable image.' },
    ],
    example: {
      zh: '餐盒貼紙原本直接放入 180 字中英文保存說明，QR Code 變得很密。店家改成只編入 `/care` 短路徑，頁面提供完整保存方式、語言切換與客服電話；貼紙旁保留短網址。兩支手機與實際貼紙測試都通過，且不需要把顧客資料或一次性權杖放進圖案。',
      en: 'A food-label sticker originally encoded 180 Chinese and English characters, creating a dense symbol. The owner switches to a `/care` short path, puts the full storage instructions, language switch, and support number on the page, and prints the short URL beside it. Two phones scan the real sticker, without exposing customer data or a one-time token in the symbol.',
    },
    commonMistakes: [
      { zh: '把可放入的字數當成固定值，忽略數字、英數、位元組與漢字模式差異。', en: 'Treating capacity as one fixed character count and ignoring numeric, alphanumeric, byte, and Kanji modes.' },
      { zh: '把完整文章、名單或秘密直接編入 QR Code，而不是提供受控頁面入口。', en: 'Encoding an article, list, or secret instead of linking to a controlled page.' },
      { zh: '為了塞更多資料只提高錯誤修正，卻沒有檢查小尺寸下的 module 密度。', en: 'Raising error correction to fit more data without checking module density at the print size.' },
      { zh: '用肉眼把一個 Emoji 當成一個 code unit，導致跨裝置內容長度判斷錯誤。', en: 'Counting one visible emoji as one code unit and misjudging cross-device length.' },
      { zh: '縮短網址時使用不受控或會到期的第三方短網址，之後無法維護入口。', en: 'Using an uncontrolled or expiring third-party shortener that cannot be maintained later.' },
    ],
    faq: [
      { question: { zh: 'QR Code 能放幾個中文字？', en: 'How many Chinese characters fit in a QR code?' }, answer: { zh: '沒有單一答案，會受 version、錯誤修正、編碼模式與其他資料影響。實務上先放短網址，並用預計尺寸與兩支手機實測，不要以字數保證可讀性。', en: 'There is no single answer; version, error correction, encoding mode, and the rest of the payload matter. Use a short URL and test at the intended size on two phones instead of promising readability from a character count.' } },
      { question: { zh: '把文章全文放進 QR Code 會比較方便嗎？', en: 'Is it more convenient to encode an entire article?' }, answer: { zh: '通常不是。圖案會變密且難以縮小，內容更新也要重新產生；連到受控頁面能保留完整排版、語言與更新能力。', en: 'Usually not. The symbol becomes denser and harder to print small, and every update requires a new symbol. A controlled page keeps formatting, language, and updateability.' } },
      { question: { zh: 'Emoji 會讓 QR Code 變大嗎？', en: 'Do emoji make a QR code larger?' }, answer: { zh: '可能。Emoji 的實際編碼可能包含多個 code point，容量判斷不能只看畫面上的一個圖示；請計數、解碼並在不同手機測試。', en: 'They can. An emoji may contain multiple code points, so visual glyph count is not enough; measure, decode, and test on different phones.' } },
    ],
    cta: {
      zh: '先用字元計數工具檢查 payload，再用 QR Code 產生器輸出短而穩定的入口，最後按實際尺寸測試。',
      en: 'Check the payload with the character counter, generate a short stable entry with the QR Code generator, and test at the real print size.',
    },
    updatedAt: '2026-09-03',
    noFaqSchema: true,
  },
  {
    id: 'pdf-to-image-resolution-guide',
    locales: ['zh', 'en'],
    slug: 'pdf-to-image-resolution-guide',
    title: {
      zh: 'PDF 轉圖片解析度怎麼選',
      en: 'PDF to Image Resolution Guide',
    },
    metaTitle: {
      zh: 'PDF 轉 JPG／PNG 要選多高解析度？螢幕、Email 與列印設定指南',
      en: 'PDF to JPG or PNG Resolution Guide',
    },
    metaDescription: {
      zh: 'PDF 轉 JPG 或 PNG 時，不要只追求最高解析度：依螢幕預覽、Email 附件、簡報與列印用途選擇像素尺寸，兼顧文字清晰、檔案大小、記憶體與隱私，並用實際輸出檢查小字。',
      en: 'Choose PDF-to-JPG or PNG resolution for screens, email, slides, or print while balancing clarity and file size.',
    },
    h1: {
      zh: 'PDF 轉圖片要選多高解析度？先看用途再決定像素',
      en: 'What Resolution Should You Use for PDF to Image Conversion?',
    },
    category: { zh: '檔案與 PDF', en: 'Files and PDFs' },
    priority: 34,
    searchIntent: {
      zh: '使用者要把 PDF 轉成 JPG 或 PNG，想知道螢幕、Email、簡報與列印各需要多少解析度，避免文字模糊或檔案過大。',
      en: 'A user needs to convert a PDF to JPG or PNG and wants a practical resolution choice for screens, email, slides, or print without blurry text or oversized files.',
    },
    targetKeywords: [
      { zh: 'PDF 轉圖片 解析度', en: 'PDF to image resolution' },
      { zh: 'PDF 轉 JPG DPI', en: 'PDF to JPG DPI' },
      { zh: 'PDF 轉 PNG 清晰度', en: 'PDF to PNG quality' },
    ],
    relatedToolIds: ['pdf-to-image', 'image-compressor', 'image-resizer'],
    relatedGuideIds: ['pdf-to-jpg-vs-png', 'image-compression-email-guide', 'a4-vs-us-letter-printing-guide'],
    relatedWorkflowIds: [],
    summary: {
      zh: '解析度不是越高越好，而是要配合觀看距離、版面尺寸與文字大小。先決定用途，再檢查輸出的像素、檔案大小與小字可讀性。',
      en: 'Resolution is not automatically better when it is higher. Match pixel dimensions to viewing distance, page size, and text, then verify readability and file size in the actual output.',
    },
    problem: {
      zh: '有人把每一頁都用最高解析度輸出，結果 Email 附件超過限制、手機記憶體不足；也有人用低解析度做簡報或列印，放大後小字和表格變成馬賽克。只看設定中的 DPI 數字，沒有回到使用場景驗證。',
      en: 'Exporting every page at the highest setting can exceed an email limit or consume phone memory. Exporting too low makes small text and tables turn blocky in slides or print. A DPI number alone cannot replace checking the intended use.',
    },
    whoShouldUse: {
      zh: '適合要把報告、講義、收據、圖表或掃描 PDF 放到網站、Email、社群、簡報或紙張上的學生、行政人員與內容創作者。',
      en: 'This is for students, office teams, and creators placing reports, handouts, receipts, charts, or scanned PDFs in websites, email, social posts, slides, or print.',
    },
    explanation: [
      {
        zh: '先分清楚「像素尺寸」和「DPI」。轉成點陣圖後，真正影響螢幕顯示的是寬高像素；DPI 多半是列印工作流程用來描述每英吋的輸出密度。相同像素在不同檔案中可能帶有不同 DPI 標籤，因此不要只用標籤推論螢幕清晰度。',
        en: 'Separate pixel dimensions from DPI. Once a page is rasterized, screen display is governed by its pixel width and height; DPI is mainly a density description in print workflows. The same pixels can carry different DPI metadata, so a label alone does not prove screen sharpness.',
      },
      {
        zh: '螢幕預覽、Email 與社群通常重視載入速度和檔案大小；可先用足以閱讀標題與正文的中等尺寸，再在手機與桌面各看一次。若文字需要反覆放大，回到原 PDF 或改用更高輸出，而不是把壓縮後的圖片再放大。',
        en: 'Screen previews, email, and social posts usually prioritize loading and file size. Start with a moderate pixel size that keeps headings and body text readable, then inspect it on phone and desktop. If readers must zoom repeatedly, return to the PDF or export larger instead of enlarging a compressed image.',
      },
      {
        zh: '簡報或投影要按預計顯示尺寸測試。把整頁 PDF 轉成縮圖後塞進投影片，遠端觀眾看到的可能只剩模糊小字；若只需要一個圖表，先裁出圖表再輸出，比整頁用超高解析度更有效率。',
        en: 'Test slides at the size they will actually be shown. A full-page thumbnail can make remote viewers see blurry small type; if you need one chart, crop that chart before exporting instead of making the entire page enormous.',
      },
      {
        zh: '列印時要把紙張尺寸、觀看距離與文字大小一起考慮。A4 或 Letter 頁面若要保留細字，輸出像素應足以支援目標紙張；完成後請用列印預覽和一張樣張檢查，因為印表機邊界與縮放也會影響結果。',
        en: 'For print, consider paper size, viewing distance, and text size together. An A4 or Letter page with small type needs enough pixels for the target sheet; use print preview and one proof sheet because printer margins and scaling also change the result.',
      },
      {
        zh: 'Adobe Acrobat 的 PDF 最佳化說明把影像取樣、壓縮與目標用途分開處理（https://helpx.adobe.com/acrobat/using/optimizing-pdfs-acrobat-pro.html）。這些設定不能替你的實際檔案做保證；輸出後仍要檢查文字、條碼、圖片邊緣和檔案大小。',
        en: 'Adobe Acrobat’s PDF optimization guidance treats image downsampling, compression, and target use as separate decisions (https://helpx.adobe.com/acrobat/using/optimizing-pdfs-acrobat-pro.html). Those settings do not guarantee your file; inspect text, barcodes, image edges, and size after export.',
      },
    ],
    steps: [
      { zh: '寫下輸出目的：手機閱讀、Email、簡報、網站嵌圖或實體列印。', en: 'Write down the output job: phone reading, email, slides, a website image, or physical print.' },
      { zh: '先用 PDF 轉圖片工具輸出一頁中等尺寸，記錄像素寬高、檔案大小與格式。', en: 'Export one page at a moderate size with the PDF-to-image tool and record pixels, file size, and format.' },
      { zh: '在預計使用的裝置或投影片版面檢查正文、表格、條碼與細線。', en: 'Check body text, tables, barcodes, and fine lines on the target device or slide layout.' },
      { zh: '若小字模糊，優先提高像素或裁出真正需要的區域；不要只重複放大壓縮圖。', en: 'If small type is blurry, increase pixels or crop the needed area instead of repeatedly enlarging a compressed image.' },
      { zh: '若檔案太大，先比較 JPG／PNG 和圖片壓縮結果，再確認文字沒有出現暈邊。', en: 'If the file is too large, compare JPG/PNG and compression results, then confirm text has no halos or block artifacts.' },
      { zh: '列印用途先印一張樣張，核對紙張尺寸、縮放、邊界與實際可讀性。', en: 'For print, make one proof and check paper size, scaling, margins, and real readability.' },
    ],
    example: {
      zh: '行政人員要把兩頁收據放進 Email。第一次用最高解析度輸出 PNG，附件超過限制；改成以手機閱讀為目標的中等像素 JPG，正文仍清楚。另一份要放進 A4 報告的表格則改輸出較大 PNG，並印一張樣張確認細線沒有消失。兩份檔案使用不同設定，而不是套同一個「最高品質」。',
      en: 'An office worker needs to email two receipt pages. A maximum-resolution PNG exceeds the attachment limit, so a moderate-pixel JPG for phone reading keeps the text clear. A table destined for an A4 report uses a larger PNG and one proof print to check fine lines. The two jobs use different settings instead of one maximum-quality preset.',
    },
    commonMistakes: [
      { zh: '把 DPI 標籤當成螢幕清晰度的唯一指標。', en: 'Treating the DPI label as the only measure of screen sharpness.' },
      { zh: '不看用途，所有 PDF 頁面都用最高解析度輸出。', en: 'Using maximum resolution for every page without considering the job.' },
      { zh: '先用低解析度輸出，再把圖片放大到簡報或列印尺寸。', en: 'Exporting low and enlarging the image later for slides or print.' },
      { zh: '只檢查第一頁，忽略其他頁的小字、條碼或掃描陰影。', en: 'Checking only the first page and missing small type, barcodes, or scan shadows elsewhere.' },
      { zh: '壓縮後沒有重新打開檔案，直接假設檔案大小和清晰度都可接受。', en: 'Skipping a post-compression check and assuming both size and clarity are acceptable.' },
    ],
    faq: [
      { question: { zh: 'PDF 轉圖片一定要 300 DPI 嗎？', en: 'Does every PDF-to-image job need 300 DPI?' }, answer: { zh: '不一定。螢幕、Email 與縮圖通常不需要印刷工作流程的同一密度；列印才要按紙張、文字大小與樣張調整。先看用途，不要把單一數字當成保證。', en: 'No. Screen, email, and thumbnails do not require the same density as a print workflow. Print jobs need a choice based on paper, text size, and a proof; no single number is a guarantee.' } },
      { question: { zh: 'JPG 和 PNG 哪個比較清楚？', en: 'Is JPG or PNG sharper?' }, answer: { zh: '格式只是其中一項。照片常適合 JPG，文字與線條常適合 PNG；輸出像素、壓縮程度與原始 PDF 內容同樣重要。', en: 'Format is only one factor. Photos often suit JPG and text or lines often suit PNG; output pixels, compression, and the source PDF matter too.' } },
      { question: { zh: '為什麼轉出來的圖片在 PDF 裡很清楚，放大後卻模糊？', en: 'Why is the converted image blurry when enlarged?' }, answer: { zh: '點陣圖只包含有限像素，放大會把像素攤開。重新以較大像素輸出，或在需要時保留原 PDF，通常比放大舊圖片可靠。', en: 'A raster image has a finite pixel grid, so enlarging spreads those pixels. Export larger or keep the original PDF when possible instead of enlarging the old image.' } },
    ],
    cta: {
      zh: '用 PDF 轉圖片工具先輸出一頁做用途測試，再依清晰度與檔案限制調整解析度和格式。',
      en: 'Use the PDF-to-image tool to test one page first, then adjust resolution and format against clarity and file limits.',
    },
    updatedAt: '2026-09-03',
    noFaqSchema: true,
  },
  {
    id: 'merge-pdf-page-size-orientation-guide',
    locales: ['zh', 'en'],
    slug: 'merge-pdf-page-size-orientation-guide',
    title: {
      zh: '合併 PDF 後紙張大小與方向整理指南',
      en: 'Merged PDF Page Size and Orientation Guide',
    },
    metaTitle: {
      zh: '合併 PDF 後大小不一、方向混亂怎麼辦？A4、Letter 與橫直頁整理教學',
      en: 'Merged PDF Page Sizes and Orientations Guide',
    },
    metaDescription: {
      zh: '合併 PDF 後出現 A4、Letter、橫向與直向混在一起，不代表檔案損壞。本指南教你先盤點頁面尺寸、決定是否需要統一、避免不必要縮放，並在列印與分享前逐頁驗證。',
      en: 'Mixed A4, Letter, portrait, and landscape pages are not automatically corruption. Check each page, avoid needless scaling, and verify before printing.',
    },
    h1: {
      zh: '合併 PDF 後頁面大小不一怎麼整理？先判斷再縮放',
      en: 'How to Fix Mixed Page Sizes After Merging PDFs',
    },
    category: { zh: '檔案與 PDF', en: 'Files and PDFs' },
    priority: 35,
    searchIntent: {
      zh: '使用者合併多份 PDF 後發現紙張大小或橫直方向不一致，想知道是否要統一、怎麼列印與如何避免內容被裁切。',
      en: 'A user merged PDFs and found mixed paper sizes or portrait and landscape pages, and needs to decide whether to standardize them without clipping content.',
    },
    targetKeywords: [
      { zh: '合併 PDF 大小不一', en: 'merged PDF different page sizes' },
      { zh: 'PDF 橫向直向混合', en: 'PDF mixed portrait landscape' },
      { zh: 'PDF A4 Letter 合併', en: 'merge A4 and Letter PDF' },
    ],
    relatedToolIds: ['merge-pdf', 'pdf-page-reorder', 'pdf-compressor'],
    relatedGuideIds: ['merge-pdf-private-guide', 'a4-vs-us-letter-printing-guide', 'pdf-to-jpg-vs-png'],
    relatedWorkflowIds: [],
    summary: {
      zh: '合併只是在同一檔案中排列頁面，不會自動把所有頁面變成同一紙張。先確認接收者要閱讀、列印還是歸檔，再決定保留原尺寸或另做統一版本。',
      en: 'Merging places pages in one file; it does not automatically make every page the same paper size. Decide whether the file is for reading, printing, or archiving before changing original dimensions.',
    },
    problem: {
      zh: '履歷、附件、表單和掃描件常來自不同來源。直接合併後，預覽器可能出現頁面忽大忽小、橫向頁旋轉、列印時被裁切。為了「看起來整齊」硬縮放，反而可能讓表格或簽名失去可讀性。',
      en: 'Resumes, attachments, forms, and scans often come from different sources. A merged file can show pages at different scales, rotated landscape pages, or clipped printouts. Forcing everything to look uniform may make tables or signatures unreadable.',
    },
    whoShouldUse: {
      zh: '適合整理申請資料、報告附件、合約、學習單與掃描收據的學生、求職者、行政人員和教師。',
      en: 'This helps students, applicants, office teams, and teachers assembling application packets, reports, contracts, worksheets, and scanned receipts.',
    },
    explanation: [
      {
        zh: '先把「頁面尺寸」與「檢視器縮放」分開。檢視器可能把 Letter 顯示得和 A4 一樣大，但列印時仍是不同實體尺寸。ISO 216 定義 A 系列紙張；美國 Letter 則是另一套常見規格，不能靠螢幕預覽猜測。',
        en: 'Separate physical page size from viewer zoom. A viewer can display Letter and A4 at a similar on-screen scale while printing them at different dimensions. ISO 216 defines the A series, while US Letter is a different common specification; do not infer paper size from preview alone.',
      },
      {
        zh: '如果目標是數位閱讀或保留原始證據，保留混合尺寸通常比重排安全。每頁旁邊加清楚的頁碼與來源，讓讀者知道附件本來就是不同格式；只有在接收系統明確要求單一紙張時才建立統一版本。',
        en: 'For digital reading or preserving source evidence, keeping mixed sizes is often safer than reflowing them. Add clear page numbers and source labels so readers understand the attachments differ; standardize only when the receiving system requires one sheet size.',
      },
      {
        zh: '要列印時，先決定每頁要「符合可列印範圍」還是「實際大小」。一般文字附件可縮小到紙張內；尺規、表格欄位、簽名框與裁切模板則屬尺寸敏感，縮放後應用尺再次核對。',
        en: 'For printing, choose between fitting each page to the printable area and preserving actual size. Ordinary text attachments can usually fit the sheet; rulers, form fields, signature boxes, and cutting templates are size-sensitive and need a ruler check after scaling.',
      },
      {
        zh: '橫向頁不必為了統一而旋轉內容。比較好的做法是保留頁面方向，在目錄或檔名中標示；若收件者需要裝訂，另做一份經過預覽和樣張驗證的列印版。',
        en: 'A landscape page does not need its content rotated merely to look uniform. Keep its orientation and label it in the contents or filename; if binding is required, make a separate print version validated in preview and with a proof sheet. This preserves the author’s intended reading direction and makes later revisions easier to audit.',
      },
      {
        zh: '可參考 ISO 216 的 A 系列紙張標準（https://www.iso.org/obp/ui/#iso:std:iso:216:ed-2:v1:en）確認 A4 的規格，再把接收端的印表機設定與邊界納入測試。標準尺寸不等於每台印表機都能無邊界輸出。',
        en: 'Use ISO 216’s A-series paper standard (https://www.iso.org/obp/ui/#iso:std:iso:216:ed-2:v1:en) to confirm A4 dimensions, then include the receiving printer’s margins and settings in testing. A standard sheet does not mean every printer can print edge to edge.',
      },
    ],
    steps: [
      { zh: '列出每個來源檔案的頁數、A4／Letter／其他尺寸與橫直方向。', en: 'List each source file’s page count, A4/Letter/other size, and orientation.' },
      { zh: '決定合併檔是用於閱讀、上傳歸檔，還是實體列印；不要先為了外觀縮放。', en: 'Decide whether the merged file is for reading, submission, archiving, or print before scaling for appearance.' },
      { zh: '用合併 PDF 工具排列檔案，再用頁面重排工具檢查封面、附件與分隔頁。', en: 'Merge the files, then use the page reorder tool to check cover, attachments, and separator pages.' },
      { zh: '在預覽中逐頁查看方向、頁碼、表格與簽名框；特別標記尺寸敏感頁。', en: 'Inspect orientation, page numbers, tables, and signature boxes page by page, flagging size-sensitive pages.' },
      { zh: '列印前選擇符合頁面或實際大小，先印一頁樣張並用尺核對必要尺寸。', en: 'Before printing, choose fit or actual size, make one proof, and measure any required dimensions.' },
      { zh: '保留原始檔與合併版，將統一紙張的版本另存並清楚命名。', en: 'Keep the source files and merged version, saving any standardized print version under a clear separate name.' },
    ],
    example: {
      zh: '求職者要提交一份 PDF：履歷是 A4 直向、作品集是 Letter 直向、作品截圖有兩頁橫向。數位上傳沒有要求單一尺寸，因此他保留原始比例，重新排序並加頁碼；列印給面試官時才另存「Fit to A4」版本，先印一頁確認 QR Code、簽名欄與橫向截圖沒有被裁切。',
      en: 'An applicant submits one PDF with an A4 portrait resume, a Letter portrait portfolio, and two landscape screenshots. Because the portal does not require one size, they preserve the proportions, reorder pages, and add page numbers. For an interviewer’s paper copy, they create a separate fit-to-A4 version and proof the QR code, signature field, and landscape pages.',
    },
    commonMistakes: [
      { zh: '只看檢視器畫面，沒有確認每頁的實體尺寸。', en: 'Relying on viewer appearance without checking physical page dimensions.' },
      { zh: '把所有頁面硬縮成同一大小，導致表格、簽名或條碼難以閱讀。', en: 'Forcing every page to one scale and making tables, signatures, or barcodes hard to read.' },
      { zh: '橫向頁旋轉了內容，卻沒有確認讀者或列印裝訂方向。', en: 'Rotating landscape content without checking reading or binding direction.' },
      { zh: '列印混合尺寸檔案時沿用上一份文件的縮放設定。', en: 'Reusing a previous document’s scaling setting for a mixed-size file.' },
      { zh: '統一版本覆蓋原始檔，之後無法追查哪一頁被縮放或裁切。', en: 'Overwriting the source with a standardized copy and losing the audit trail for scaling or clipping.' },
    ],
    faq: [
      { question: { zh: '合併 PDF 一定要把 A4 和 Letter 統一嗎？', en: 'Must A4 and Letter pages be standardized after merging?' }, answer: { zh: '不一定。數位閱讀與保留原始附件時可保留混合尺寸；只有接收系統、裝訂或印刷流程要求單一紙張時，才另做統一版本。', en: 'No. Keep mixed sizes for digital reading or source preservation. Make a separate standardized version only when a portal, binding plan, or print workflow requires one sheet size.' } },
      { question: { zh: '混合橫向與直向會讓 PDF 壞掉嗎？', en: 'Does mixing portrait and landscape corrupt a PDF?' }, answer: { zh: '不會。PDF 可以保存不同方向的頁面；問題通常出在檢視、列印或裝訂設定。合併後逐頁預覽並做一張樣張即可發現問題。', en: 'No. PDFs can contain pages with different orientations. Problems usually come from viewing, printing, or binding settings; inspect pages and make one proof after merging.' } },
      { question: { zh: '怎麼避免合併後頁面被裁切？', en: 'How can I prevent clipping after merging?' }, answer: { zh: '先知道每頁原始尺寸，列印時選符合可列印範圍並先印一頁；尺寸敏感內容則選實際大小並量測。不要只依賴檢視器的自動縮放。', en: 'Know each original size, choose fit to printable area for ordinary pages, and proof one page. Use actual size and measure size-sensitive content instead of trusting automatic viewer scaling.' } },
    ],
    cta: {
      zh: '用合併 PDF 工具先保留原始頁面，再依閱讀或列印需求建立經過樣張驗證的版本。',
      en: 'Merge PDFs while preserving source pages, then make a proofed version for the actual reading or print requirement.',
    },
    updatedAt: '2026-09-03',
    noFaqSchema: true,
  },
  {
    id: 'pdf-to-image-multipage-download-guide',
    locales: ['zh', 'en'],
    slug: 'pdf-to-image-multipage-download-guide',
    title: {
      zh: '多頁 PDF 轉圖片下載與檔名整理',
      en: 'Multi-page PDF to Image Download Guide',
    },
    metaTitle: {
      zh: '多頁 PDF 轉 JPG／PNG 後怎麼下載？頁碼、檔名與 20 頁限制教學',
      en: 'Multi-page PDF Image Download Guide',
    },
    metaDescription: {
      zh: '多頁 PDF 轉成圖片後通常是一頁一個檔案：本指南說明 FunnyTools 的頁碼檔名、PNG／JPG 選擇、20 頁與 25MB 邊界、逐頁檢查和批次整理方式，避免漏頁、覆蓋或把敏感文件留在共用裝置。',
      en: 'Convert each PDF page to an image: learn page filenames, PNG/JPG choices, the 20-page and 25MB limits, proofing, and safe file organization.',
    },
    h1: {
      zh: '多頁 PDF 轉成 JPG／PNG 後怎麼下載與整理？',
      en: 'How to Download and Organize Images from a Multi-page PDF',
    },
    category: { zh: '檔案與 PDF', en: 'Files and PDFs' },
    priority: 36,
    searchIntent: {
      zh: '使用者要把多頁 PDF 轉成圖片，想知道輸出會有幾個檔案、如何依頁碼下載與命名，以及遇到檔案或頁數限制時怎麼處理。',
      en: 'A user needs every page of a PDF as an image and wants to understand the number of files, page-number downloads, naming, and what to do when file or page limits apply.',
    },
    targetKeywords: [
      { zh: '多頁 PDF 轉圖片下載', en: 'multi-page PDF to images download' },
      { zh: 'PDF 每頁轉 JPG', en: 'convert every PDF page to JPG' },
      { zh: 'PDF 轉 PNG 檔名', en: 'PDF to PNG page filenames' },
    ],
    relatedToolIds: ['pdf-to-image', 'image-compressor', 'pdf-page-reorder'],
    relatedGuideIds: ['pdf-to-image-resolution-guide', 'pdf-to-jpg-vs-png', 'merge-pdf-page-size-orientation-guide'],
    relatedWorkflowIds: [],
    summary: {
      zh: '多頁轉圖不是把 PDF 變成一張長圖，而是依頁面產生獨立圖片。先規劃頁碼、格式、檔案夾與檢查順序，後續上傳或分享才不容易漏頁。',
      en: 'Multi-page conversion does not make one tall image; it creates one image per page. Plan filenames, format, folders, and a proofing order before uploading or sharing.',
    },
    problem: {
      zh: '轉換完成後才發現下載資料夾有 page-1、page-2……，卻不知道原始頁碼、檔案順序或是否漏掉最後一頁。若把不同 PDF 都下載到同一個資料夾，重複檔名還可能被系統自動加上括號或直接覆蓋。',
      en: 'After conversion, a folder may contain page-1, page-2, and so on without the original section name or proof that the last page exists. Saving multiple PDFs to one folder can also create duplicate names, automatic parentheses, or overwrites.',
    },
    whoShouldUse: {
      zh: '適合要把講義、報告、收據、掃描文件或簡報逐頁放入網站、簡報、社群與檔案夾的學生、行政人員與內容創作者。',
      en: 'Use this for handouts, reports, receipts, scans, or slide PDFs that must become page-by-page images for websites, presentations, social posts, or folders.',
    },
    explanation: [
      {
        zh: 'FunnyTools PDF 轉圖片工具會為每一頁建立獨立預覽與下載連結，檔名使用 `page-1.png` 或 `page-1.jpg` 這種頁碼格式。這讓單頁使用很方便，但若是多份文件，下載前應先建立以原始檔命名的資料夾，避免不同來源互相混淆。',
        en: 'FunnyTools creates a separate preview and download link for each page, using filenames such as `page-1.png` or `page-1.jpg`. That is convenient for single-page use, but create a folder named after the source PDF before downloading multiple documents.',
      },
      {
        zh: '目前工具接受單一 PDF，檔案上限 25MB、最多 20 頁，並限制單頁畫布面積避免瀏覽器記憶體失控。這些是工具的處理邊界，不是 PDF 格式本身的容量標準；超過時應先拆分檔案或改用桌面流程，不能靠重試繞過。',
        en: 'The current tool accepts one PDF up to 25 MB and 20 pages, with a per-page canvas-area guard to avoid exhausting browser memory. These are tool limits, not universal PDF limits; split the source or use a desktop workflow when it exceeds them.',
      },
      {
        zh: 'PNG 與 JPG 的選擇要看後續工作。文字、表格、線條和條碼通常需要乾淨邊緣，可先用 PNG；照片頁面或需要縮小附件時，JPG 往往更省空間。格式選定後仍要逐頁放大檢查，不能把副檔名當成清晰度保證。',
        en: 'Choose PNG or JPG for the next task. Text, tables, lines, and barcodes often benefit from PNG’s clean edges; photo-heavy pages or smaller attachments often suit JPG. After choosing, zoom into every page—an extension alone does not guarantee clarity.',
      },
      {
        zh: '下載順序最好與原始頁序一致。先下載全部頁面，再用檔案總管依數字排序；不要讓 page-10 排在 page-2 前面，也不要只憑縮圖判斷順序。若要重新組回 PDF，先用頁面重排工具或明確的數字前綴建立可追溯順序。',
        en: 'Keep the download order aligned with the source. Download all pages, then sort numerically; lexical sorting can place page-10 before page-2, and thumbnails alone may hide a sequence error. If rebuilding a PDF, use the reorder tool or clear numeric prefixes.',
      },
      {
        zh: 'PDF.js 是瀏覽器端的 PDF 解析與渲染專案（https://mozilla.github.io/pdf.js/）。工具實作會在裝置上讀取檔案並建立 Blob 預覽；關閉或離開頁面後，暫存的物件網址會被釋放。這不等於所有使用情境都沒有風險，下載後仍應依共享裝置政策清理檔案。',
        en: 'PDF.js is a browser-side PDF parsing and rendering project (https://mozilla.github.io/pdf.js/). The tool reads the file on the device and creates Blob previews; those object URLs are released when the page is left. That does not remove every local-device risk, so follow your shared-device cleanup policy after downloading.',
      },
    ],
    steps: [
      { zh: '先確認 PDF 檔案小於 25MB、頁數不超過 20 頁，並把原始檔名記下來。', en: 'Confirm the PDF is under 25 MB and no more than 20 pages, and note the source filename.' },
      { zh: '為這份文件建立獨立資料夾，例如 `meeting-notes-2026-09`。', en: 'Create a dedicated folder, such as `meeting-notes-2026-09`, for this source.' },
      { zh: '開啟 PDF 轉圖片工具，選擇 PNG 或 JPG 與合適的 1×、1.5× 或 2× 輸出倍率。', en: 'Open the PDF-to-image tool and choose PNG or JPG plus a suitable 1×, 1.5×, or 2× scale.' },
      { zh: '等待每頁完成，核對最後的頁碼與原始 PDF 頁數一致。', en: 'Wait for every page to finish and compare the final page number with the source page count.' },
      { zh: '逐頁下載並保留 `page-N` 檔名；需要跨文件整理時，再加上原始檔名前綴。', en: 'Download each page while retaining its `page-N` name; add a source prefix later when combining multiple documents.' },
      { zh: '抽查第一頁、中間頁、最後一頁和含小字／條碼的頁面，再上傳或分享。', en: 'Proof the first, a middle, and the last page plus pages with small type or barcodes before uploading or sharing.' },
    ],
    example: {
      zh: '老師要把 12 頁講義中的第 3、7、12 頁放進投影片。他先建立 `science-handout` 資料夾，選 PNG 與 1.5×，等 12 個預覽完成後確認最後一頁存在，再下載全部檔案。依數字排序後只挑出 page-3、page-7、page-12，並放大檢查圖表文字；沒有把原始 PDF 直接截圖，也沒有把兩份講義存進同一資料夾。',
      en: 'A teacher needs pages 3, 7, and 12 of a 12-page handout for slides. They create a `science-handout` folder, choose PNG at 1.5×, wait for all 12 previews, confirm the last page exists, and download the set. Numeric sorting makes page-3, page-7, and page-12 easy to select, and chart text is checked before the slides are shared.',
    },
    commonMistakes: [
      { zh: '不同 PDF 都下載成 `page-1`，卻沒有用資料夾或前綴區分來源。', en: 'Saving several PDFs as `page-1` files without a source folder or prefix.' },
      { zh: '用檔名字串排序，導致 page-10 出現在 page-2 前面。', en: 'Using lexical filename sorting so page-10 appears before page-2.' },
      { zh: '只看前幾頁縮圖，沒有確認最後一頁和中間頁是否完成。', en: 'Checking only the first thumbnails and missing an unfinished middle or final page.' },
      { zh: '遇到 25MB 或 20 頁限制時反覆重試，沒有先拆分來源檔。', en: 'Retrying a file over 25 MB or 20 pages instead of splitting the source.' },
      { zh: '下載後把含個資的圖片留在共用電腦或同步資料夾，忘記清理。', en: 'Leaving downloaded pages with personal data on a shared computer or synced folder.' },
    ],
    faq: [
      { question: { zh: '多頁 PDF 會下載成一張長圖嗎？', en: 'Does a multi-page PDF download as one tall image?' }, answer: { zh: '不會。工具會依頁面產生獨立圖片與下載連結，例如 page-1、page-2。這樣可以單獨使用某頁，但也要核對總頁數。', en: 'No. The tool creates one image and download link per page, such as page-1 and page-2. That makes individual pages useful, but you must still check the total count.' } },
      { question: { zh: '為什麼找不到第 21 頁？', en: 'Why cannot I convert page 21?' }, answer: { zh: '目前工具最多處理 20 頁；這是瀏覽器工具的安全邊界。可先用 PDF 分割工具拆成較小檔案，再分批轉換。', en: 'The current tool processes up to 20 pages as a browser safety boundary. Split the PDF into smaller files with a PDF splitter and convert them in batches.' } },
      { question: { zh: '下載的圖片可以重新合成 PDF 嗎？', en: 'Can downloaded images be made into a PDF again?' }, answer: { zh: '可以，但這會把頁面重新點陣化，原 PDF 的文字搜尋、連結、表單與書籤不會由圖片自動恢復。先保留原檔，再用圖片轉 PDF 工具建立副本。', en: 'Yes, but the pages are rasterized and the source PDF’s searchable text, links, forms, and bookmarks do not return automatically. Keep the original and create a copy with an image-to-PDF workflow.' } },
    ],
    cta: {
      zh: '用 PDF 轉圖片工具逐頁輸出，依原始檔建立資料夾並檢查首頁、中頁與末頁，再交付使用。',
      en: 'Convert the PDF page by page, use a source-named folder, proof the first, middle, and last pages, and then deliver the images.',
    },
    updatedAt: '2026-09-03',
    noFaqSchema: true,
  },
  {
    id: 'seating-chart-student-needs-intake-guide',
    locales: ['zh', 'en'],
    slug: 'seating-chart-student-needs-intake-guide',
    title: {
      zh: '排座位前的學生需求清單',
      en: 'Student Needs Checklist Before Making a Seating Chart',
    },
    metaTitle: {
      zh: '排座位表前要收集什麼？視線、動線、專注與隱私需求清單',
      en: 'Seating Chart Student Needs Checklist',
    },
    metaDescription: {
      zh: '不要一開學就把名單丟進座位表：先整理視線、聽講、進出動線、設備、同儕支援與安靜區等可觀察需求，再用座位表工具做草稿並由老師逐項核對；本文也說明如何避免公開敏感資訊。',
      en: 'Collect observable needs for sight lines, movement, equipment, and low-distraction areas before drafting and privately reviewing a seating chart.',
    },
    h1: {
      zh: '排座位表前先做什麼？把學生需求整理成可執行清單',
      en: 'What to Do Before Making a Seating Chart: An Actionable Student-Needs Checklist',
    },
    category: { zh: '教學與課堂工具', en: 'Teaching and classroom tools' },
    priority: 37,
    searchIntent: {
      zh: '老師想製作座位表，但不想只按身高或成績排位，需要一份能兼顧視線、動線、設備、專注與隱私的事前檢查流程。',
      en: 'A teacher wants a seating chart that accounts for sight lines, movement, equipment, attention, and privacy instead of sorting only by height or grades.',
    },
    targetKeywords: [
      { zh: '座位表 需求清單', en: 'seating chart student needs checklist' },
      { zh: '教室排座位 注意事項', en: 'classroom seating chart considerations' },
      { zh: '學生座位安排 視線 動線', en: 'student seating sight lines movement' },
    ],
    relatedToolIds: ['seating-chart', 'random-group-generator', 'random-student-picker'],
    relatedGuideIds: ['seating-chart-strategies-guide', 'classroom-random-group-guide', 'fair-student-grouping-guide'],
    relatedWorkflowIds: ['teacher-classroom-random-toolkit'],
    summary: {
      zh: '好的座位表不是把名字平均填滿格子，而是先把可觀察的學習與動線需求整理好，再用工具畫出能被老師檢查、調整與說明的草稿。',
      en: 'A useful seating chart is not a grid filled evenly with names. Collect observable learning and movement needs first, then make a draft that a teacher can review, adjust, and explain.',
    },
    problem: {
      zh: '只按身高、座號或成績排序，看似快速，卻可能讓學生看不到投影、輪椅或助行器沒有轉身空間、需要設備的人離插座太遠，或兩位容易互相干擾的同學被固定在一起。更敏感的是，把診斷、家庭或行為標籤直接寫在公開座位表上，會把排課工具變成不必要的個資曝光。',
      en: 'Sorting by height, number, or grades may leave a student unable to see the screen, a mobility aid without turning space, a device user far from power, or two easily distracted peers side by side. Writing diagnoses, family details, or behavior labels on a public chart also exposes more personal information than the seating task needs.',
    },
    whoShouldUse: {
      zh: '適合國小、中學、大學小班、社團與課後班教師，以及需要在換教室、換課型或新學期重新排座位的人。',
      en: 'Use this for primary and secondary teachers, small university classes, clubs, and after-school groups when a room, term, or lesson format changes.',
    },
    explanation: [
      {
        zh: '先記錄「會改變座位決策的觀察」，不要蒐集一張與任務無關的完整個人檔案。可觀察項目包括：是否需要看清黑板或投影、進出教室的路線、桌面設備與充電位置、是否需要靠近教師示範、以及哪些位置能降低走廊或門口干擾。這些描述能支援排位，卻不必公開敏感原因。',
        en: 'Record observations that change a seating decision, not a full personal profile unrelated to the task. Useful observations include sight of the board or projector, routes in and out, desk equipment and power, proximity to demonstrations, and positions with less corridor or door traffic. They support placement without publishing sensitive reasons.',
      },
      {
        zh: '把需求分成「必要限制」與「可嘗試偏好」。必要限制可能是通道不能被堵住、視線不能被高櫃遮擋、設備需要穩定放置；偏好則是靠前、靠邊或與熟悉同伴同組。先滿足必要限制，再在剩餘空間中調整偏好，避免一個人的偏好意外破壞全班安全動線。',
        en: 'Separate hard constraints from preferences. A clear aisle, an unobstructed sight line, or stable equipment placement may be necessary; front, side, or a familiar peer may be a preference. Satisfy hard constraints first, then fit preferences without compromising the room’s shared movement and safety.',
      },
      {
        zh: '座位需求應以學生能完成任務為中心，而不是把學生固定在某個標籤。CAST 的 Universal Design for Learning Guidelines（https://udlguidelines.cast.org/）提醒教學設計要提供多種參與、呈現與行動表達方式；座位只是其中一項環境調整。安排後仍要觀察實際課程，必要時改變桌型、投影位置或活動流程。',
        en: 'Keep the goal on task access, not on fixing a student to a label. CAST’s Universal Design for Learning Guidelines (https://udlguidelines.cast.org/) frame multiple means of engagement, representation, and action; seating is only one environmental adjustment. Observe the real lesson and change the table layout, screen position, or activity flow when needed.',
      },
      {
        zh: '把清單放在私下的教師備課紀錄，公開版只呈現姓名、組別或座號。若需要和代課老師交接，使用最少必要資訊，例如「靠近投影」或「保留通道」，不要把醫療、家庭或行為推論寫在教室牆上。這也讓座位表在換班、拍照或上傳平台時較不容易外洩。',
        en: 'Keep the detailed checklist in a private planning note; the public chart can show names, groups, or numbers only. If a substitute needs context, share the minimum actionable note, such as “near the projector” or “keep aisle clear,” rather than medical, family, or behavioral inferences. This also reduces exposure when charts are photographed or uploaded.',
      },
      {
        zh: '使用座位表工具時先產生草稿，再做人工審查。工具能快速畫出格子與姓名配置，不能替你判斷門、窗、反光、插座、教師走動路線或學生當天狀態。把「草稿→現場走一圈→試教→微調」當成流程，而不是把第一次隨機結果當成唯一正解。',
        en: 'Use the seating-chart tool to make a draft, then review it yourself. A tool can place names in a grid but cannot judge doors, glare, outlets, teacher circulation, or a student’s state that day. Treat “draft, walk the room, teach, adjust” as the process instead of treating the first random result as final.',
      },
    ],
    steps: [
      { zh: '畫出教室固定物：門、窗、投影、黑板、插座、柱子與不可阻擋的通道。', en: 'Map fixed features: doors, windows, projector, board, outlets, pillars, and aisles that must stay clear.' },
      { zh: '只記錄會改變座位的可觀察需求，分成必要限制與可嘗試偏好。', en: 'Record only observable needs that change placement and divide them into hard constraints and preferences.' },
      { zh: '把詳細備註留在私下紀錄，公開座位表只放完成課堂所需的最少資訊。', en: 'Keep detailed notes private and put only the minimum task-related information on the public chart.' },
      { zh: '用座位表工具建立草稿；需要分組時，再用隨機分組工具產生可檢查的初始組合。', en: 'Create a seating draft, then use the random-group tool for a reviewable starting grouping when needed.' },
      { zh: '站在學生預計的位置看一次黑板、投影與教師示範，並走過主要通道。', en: 'View the board and demonstrations from student positions and walk the main routes once.' },
      { zh: '試行一堂課後記錄實際摩擦，做最小幅度調整並註明日期。', en: 'After one trial lesson, record real friction, make the smallest useful adjustment, and date the note.' },
    ],
    example: {
      zh: '新學期教室有一根柱子遮住右側投影，且靠門位置人流很多。老師先在私下清單標出投影死角、保留通道與需要穩定桌面設備的學生，公開座位表只放姓名。用座位表工具排出草稿後，老師從最後一排和側邊各看一次，發現兩個位置仍會反光，便交換座位並在一週後再檢查，而不是把任何學生的敏感原因貼在牆上。',
      en: 'A new classroom has a pillar blocking the right side of the projector and heavy traffic by the door. The teacher privately marks the sight-line problem, clear aisle, and students who need stable desk equipment; the public chart shows names only. After drafting with the seating tool, the teacher checks from the back and side, swaps two glare-prone seats, and reviews again after a week without posting sensitive reasons.',
    },
    commonMistakes: [
      { zh: '只按身高或座號排位，沒有走到學生視角檢查投影、黑板與反光。', en: 'Sorting by height or number without checking the board, projector, and glare from student positions.' },
      { zh: '把診斷、家庭或行為推論寫在公開座位表。', en: 'Writing diagnoses, family details, or behavioral inferences on a public chart.' },
      { zh: '把偏好當成硬限制，為了滿足一個位置而堵住全班通道。', en: 'Treating a preference as a hard constraint and blocking a shared aisle to satisfy one placement.' },
      { zh: '把工具第一次產生的座位當成終稿，沒有試教與回看。', en: 'Treating the first generated layout as final without a trial lesson or room walk.' },
      { zh: '一次大幅度搬動整班，卻沒有記錄哪個變更改善或製造摩擦。', en: 'Moving the whole class at once without recording which change helped or created friction.' },
    ],
    faq: [
      { question: { zh: '座位表要不要公開學生需求？', en: 'Should a seating chart show student needs?' }, answer: { zh: '公開版只放完成課堂所需的最少資訊，例如姓名或座號。詳細原因與觀察留在受控的教師紀錄，交接時也只分享可執行的必要提醒。', en: 'Keep the public chart to the minimum needed for class, such as names or numbers. Store reasons and observations in a controlled teacher note and share only actionable context during handoff.' } },
      { question: { zh: '一定要把需要支援的學生排前面嗎？', en: 'Must students who need support sit in front?' }, answer: { zh: '不一定。先看實際任務、視線、聲音、動線與設備，再決定哪個位置能降低障礙；前排只是可能的方案，不是通用規則。', en: 'No. Consider the actual task, sight, sound, movement, and equipment before choosing a position. The front is one possible option, not a universal rule.' } },
      { question: { zh: '隨機座位表能取代老師判斷嗎？', en: 'Can a random seating chart replace teacher judgment?' }, answer: { zh: '不能。隨機工具適合快速產生草稿，但固定物、課型、可及性與學生當天狀態仍需要老師檢查和微調。', en: 'No. Random placement is useful for a quick draft, but room features, lesson type, access, and current student needs still require teacher review and adjustment.' } },
    ],
    cta: {
      zh: '先畫固定物與需求清單，再用座位表工具建立草稿，走一圈、試教一次後才公布版本。',
      en: 'Map the room and needs first, draft with the seating-chart tool, then walk, teach, and review before publishing the chart.',
    },
    updatedAt: '2026-09-03',
    noFaqSchema: true,
  },
  {
    id: 'classroom-random-group-no-repeat-guide',
    locales: ['zh', 'en'],
    slug: 'classroom-random-group-no-repeat-guide',
    title: {
      zh: '課堂分組如何避免一直同組',
      en: 'How to Avoid Repeating the Same Classroom Groups',
    },
    metaTitle: {
      zh: '學生分組一直重複怎麼辦？用歷史紀錄檢查組員與最小調整',
      en: 'Avoid Repeating Classroom Groups: Pairing Log',
    },
    metaDescription: {
      zh: '隨機分組不會自動記得上次結果：本指南教你保存日期、組合與缺席紀錄，檢查重複組員，再用最少交換改善下一次分組；同時說明隨機性、公平與教師判斷不能混為一談。',
      en: 'Track group dates, absences, and pairings so you can reduce repeats with small, transparent adjustments without confusing randomness with fairness.',
    },
    h1: {
      zh: '學生分組一直遇到同一批人？用紀錄降低重複的實用流程',
      en: 'Students Keep Getting the Same Partners? A Practical History-Based Grouping Process',
    },
    category: { zh: '教學與課堂工具', en: 'Teaching and classroom tools' },
    priority: 38,
    searchIntent: {
      zh: '老師已使用隨機分組工具，但多次活動仍常出現相同組員，想知道如何記錄歷史結果、處理缺席並做透明的小幅調整。',
      en: 'A teacher uses a random group generator but sees repeated partners across activities and needs a transparent way to log results, handle absences, and make small adjustments.',
    },
    targetKeywords: [
      { zh: '分組避免重複組員', en: 'avoid repeating group members' },
      { zh: '課堂分組紀錄', en: 'classroom group history' },
      { zh: '隨機分組一直同組', en: 'random groups keep repeating' },
    ],
    relatedToolIds: ['random-group-generator', 'group-generator', 'seating-chart'],
    relatedGuideIds: ['classroom-random-group-guide', 'fair-student-grouping-guide', 'seating-chart-student-needs-intake-guide'],
    relatedWorkflowIds: ['teacher-classroom-random-toolkit'],
    summary: {
      zh: '隨機只描述這一次怎麼抽，不會自動最佳化整學期的組合。把每次結果留下來，再用重複檢查和少量交換讓下一次更符合活動目標。',
      en: 'Randomness describes one draw; it does not optimize a whole term. Keep each result, check repeats, and use small swaps when the next activity needs more variety.',
    },
    problem: {
      zh: '30 人分 6 組時，一次隨機結果可能很公平，但連續幾週重抽仍可能讓兩三位學生反覆同組。若老師為了避免重複而完全手排，又容易失去透明度、耗掉備課時間，或在缺席後忘記自己改了哪些人。',
      en: 'A draw for 30 students in six groups can be fair for that round while still repeating the same partners over several weeks. Fully hand-building every group may lose transparency, consume planning time, and make absence changes hard to audit.',
    },
    whoShouldUse: {
      zh: '適合每週合作學習、實驗、討論、報告或輪站活動的老師、助教與社團帶領者。',
      en: 'Use this for teachers, teaching assistants, and club leaders running weekly cooperative work, labs, discussions, presentations, or stations.',
    },
    explanation: [
      {
        zh: '先定義「重複」要算什麼。最簡單是記錄同組過的配對；若活動是四人一組，也可以檢查整組是否完全重現。不要把「同一排座位」或「曾經同時出席」誤當成同組，否則紀錄會比問題更混亂。',
        en: 'Define what counts as a repeat. The simplest rule records pairs who have shared a group; for four-person projects, you can also flag an identical full group. Do not confuse sitting in the same row or attending the same lesson with actually sharing a group.',
      },
      {
        zh: '每次活動留下日期、實際在場名單、組數或每組人數、產生結果與教師交換。缺席者不要寫進歷史配對，否則下一次會把從未合作的人誤判成重複；交換也要標記原因是缺席、動線、支援需求還是單純增加多樣性。',
        en: 'Log the date, present roster, group count or size, generated result, and teacher swaps. Do not add absent students to pair history or you will mark students as repeats when they never worked together. Note whether a swap addressed absence, movement, support, or simply variety.',
      },
      {
        zh: 'Vanderbilt Center for Teaching 的 Group Work 指南（https://cft.vanderbilt.edu/guides-sub-pages/group-work/）把分組視為教學設計的一部分，而不是抽籤本身。歷史紀錄能支援組合多樣性，但不能保證每組能力、語言、關係或角色都完美平衡；教師仍要依任務和課堂脈絡判斷。',
        en: 'Vanderbilt’s Center for Teaching group-work guide (https://cft.vanderbilt.edu/guides-sub-pages/group-work/) treats grouping as part of instructional design, not merely a draw. A history log can increase variety but cannot guarantee perfect balance of skills, language, relationships, or roles; the teacher still decides in context.',
      },
      {
        zh: '一個可說明的流程是「隨機產生→檢查重複→最多交換少數人→公開原則」。若交換超過一小部分，就應記錄並說明課堂理由，避免把「避免重複」變成另一種不透明的固定分組。下次仍從新名單開始，不要承諾數學上完全不重複。',
        en: 'A explainable process is “generate, check repeats, swap a small number at most, and state the rule.” If many swaps are needed, log the instructional reason rather than turning “avoid repeats” into another opaque fixed assignment. Start from the updated roster next time and do not promise mathematically perfect non-repetition.',
      },
      {
        zh: '紀錄可以是簡單試算表或純文字，不需要把學生資料上傳到第三方服務。只保留完成分組所需的識別方式，並依學校政策保存與刪除；公開投影片可顯示組別，歷史配對表則應留在教師可控的位置。',
        en: 'A simple spreadsheet or text note is enough; the history does not need to be uploaded to a third-party service. Keep only the identifiers needed for grouping and follow school retention rules. Slides can show current groups while the pairing history stays under teacher control.',
      },
    ],
    steps: [
      { zh: '建立只包含本次在場學生的名單，記下日期、活動名稱與組數。', en: 'Create a roster containing only students present and note the date, activity, and group count.' },
      { zh: '用隨機分組工具產生結果，先保存原始順序再做任何交換。', en: 'Generate groups with the random-group tool and save the original result before any swaps.' },
      { zh: '把每組轉成配對或整組紀錄，和前幾次歷史結果比對重複。', en: 'Turn each group into pair or full-group records and compare them with prior results.' },
      { zh: '若重複與活動目標衝突，只交換少數人，並記錄可說明的課堂原因。', en: 'If repeats conflict with the activity goal, swap a small number and record the instructional reason.' },
      { zh: '公布本次分組與「隨機起點、教師檢查」原則，不公開私人歷史表。', en: 'Publish the current groups and the rule of random start plus teacher review, not the private history table.' },
      { zh: '活動後保存結果與缺席／交換註記，下一次先更新名單再重新檢查。', en: 'Save the result and absence or swap notes, then update the roster before the next check.' },
    ],
    example: {
      zh: '四週的實驗課每次 24 人分 6 組。老師用工具產生第四週結果後，把每組拆成兩兩配對，發現 A 與 B 已連續三次同組。老師只交換 B 與另一組一位學生，並註記「增加合作對象；不改變需要支援的座位安排」。投影片公布新組別，歷史表留在教師檔案；下週再用實際出席名單重新計算。',
      en: 'A lab class of 24 students uses six groups for four weeks. In week four, the teacher expands each group into pairs and sees that A and B have shared three rounds. They swap B with one student from another group, note “increase partners; preserve support seating,” publish the new groups on slides, and keep the history private. The next week starts with the actual attendance list.',
    },
    commonMistakes: [
      { zh: '把缺席學生算進歷史配對，讓從未同組的人被錯誤標成重複。', en: 'Counting absent students in pairing history and flagging students who never worked together.' },
      { zh: '看到一次重複就完全放棄隨機，改成沒有紀錄的手排。', en: 'Abandoning randomness after one repeat and hand-assigning without an audit trail.' },
      { zh: '為了不重複交換太多人，結果組別失去可說明的規則。', en: 'Swapping so many students that the result no longer has an explainable rule.' },
      { zh: '只看完整小組是否重現，忽略兩人配對已反覆出現。', en: 'Checking only identical full groups and missing repeated pairs inside different groups.' },
      { zh: '把歷史配對表放在公開投影片或共用連結，暴露不必要的學生資料。', en: 'Putting the pairing history in public slides or shared links and exposing unnecessary student data.' },
    ],
    faq: [
      { question: { zh: '隨機分組可以保證不重複嗎？', en: 'Can random grouping guarantee no repeats?' }, answer: { zh: '不能。隨機抽選只保證這一次的產生方式；要降低學期內重複，必須保存結果、檢查配對並做有限度的教師調整。', en: 'No. Random selection describes how this round was generated. Reducing repeats across a term requires saved results, pair checks, and limited teacher adjustments.' } },
      { question: { zh: '要記錄整組還是兩人配對？', en: 'Should I record full groups or pairs?' }, answer: { zh: '看活動目標。要避免同一整組重現可記整組；要增加合作對象多樣性，記錄兩人配對通常更敏感，但資料量也較大。', en: 'It depends on the goal. Record full groups to avoid an identical team; record pairs to increase partner variety, knowing the history is larger.' } },
      { question: { zh: '交換學生後還算隨機分組嗎？', en: 'Is it still random after swapping students?' }, answer: { zh: '可以說是「隨機起點加教師審查」，不要宣稱完全隨機。公開這個原則並留下交換原因，比假裝沒有人工判斷更透明。', en: 'Describe it as “a random starting point with teacher review,” not fully random. Stating the rule and recording the reason is more transparent than hiding judgment.' } },
    ],
    cta: {
      zh: '用隨機分組工具產生起點，留下每次結果與缺席紀錄，再用配對檢查做少量、可說明的調整。',
      en: 'Use the random-group tool for a starting point, log each result and absence, then make small, explainable adjustments after checking pairs.',
    },
    updatedAt: '2026-09-03',
    noFaqSchema: true,
  },
  {
    id: 'classroom-group-roles-rotation-guide',
    locales: ['zh', 'en'],
    slug: 'classroom-group-roles-rotation-guide',
    title: {
      zh: '課堂小組角色分工與輪替指南',
      en: 'Classroom Group Roles and Rotation Guide',
    },
    metaTitle: {
      zh: '小組討論要分哪些角色？主持、記錄、報告與檢查輪替教學',
      en: 'Classroom Group Roles and Rotation Guide',
    },
    metaDescription: {
      zh: '隨機分組只決定誰和誰一起工作，不會自動分配責任。本指南提供主持、記錄、報告、時間與檢查角色的簡化做法，示範如何依任務輪替並檢查交付，不把角色標籤固定在某位學生身上。',
      en: 'Assign lightweight roles, rotate them by task, and review the deliverable without fixing labels to students.',
    },
    h1: {
      zh: '小組討論怎麼分工？用角色輪替讓每個人都有明確下一步',
      en: 'How to Assign Classroom Group Roles and Rotate Them Fairly',
    },
    category: { zh: '教學與課堂工具', en: 'Teaching and classroom tools' },
    priority: 39,
    searchIntent: {
      zh: '老師已經完成分組，但學生互相等待或工作集中在一人身上，想找一套簡單的角色分工、輪替與交付檢查方法。',
      en: 'A teacher has groups but sees waiting or one student doing all the work and needs a simple role, rotation, and deliverable-checking routine.',
    },
    targetKeywords: [
      { zh: '小組角色分工', en: 'classroom group roles' },
      { zh: '小組角色輪替', en: 'rotate group roles' },
      { zh: '小組討論主持記錄報告', en: 'facilitator recorder reporter group work' },
    ],
    relatedToolIds: ['random-group-generator', 'random-student-picker', 'countdown-timer'],
    relatedGuideIds: ['classroom-random-group-guide', 'classroom-random-group-no-repeat-guide', 'classroom-timer-guide'],
    relatedWorkflowIds: ['teacher-classroom-random-toolkit'],
    summary: {
      zh: '角色不是給學生貼標籤，而是把這一輪任務的責任說清楚。先用少量角色啟動合作，再依下一次活動輪替，最後檢查作品而不是只檢查誰講得最大聲。',
      en: 'Roles are temporary responsibilities, not labels. Start with a small set for this task, rotate them next round, and review the work rather than rewarding whoever speaks loudest.',
    },
    problem: {
      zh: '沒有角色時，最快的學生常同時主持、寫答案與報告，其他人只能旁觀；角色太多時，學生又花時間爭論職稱而不是完成任務。若每次都讓同一人當報告者，老師也很難知道其他人是否真正理解。',
      en: 'Without roles, the fastest student may facilitate, write, and report while others watch. Too many titles create a new negotiation instead of progress. If the same student always reports, a teacher cannot tell whether others understood the work.',
    },
    whoShouldUse: {
      zh: '適合討論、實驗、閱讀理解、問題解決、報告準備與站點活動的國高中、大學小班與社團帶領者。',
      en: 'Use this for discussions, labs, reading tasks, problem solving, presentations, and station activities in schools, small university classes, or clubs.',
    },
    explanation: [
      {
        zh: '角色應該描述可觀察的行動，而不是能力或人格。主持人負責讓每人有發言機會並回到題目；記錄者整理共同決定；報告者代表小組說明證據；時間員提醒剩餘時間；檢查者依題目或格式逐項核對。小組只有三人時可以合併時間與檢查，無須硬湊五個職稱。',
        en: 'Describe observable actions, not ability or personality. A facilitator invites each voice and returns to the prompt; a recorder captures decisions; a reporter explains evidence; a timekeeper signals remaining time; a checker compares the work with the task. With three students, combine time and checking instead of forcing five titles.',
      },
      {
        zh: '分工卡最好寫「完成條件」。例如記錄者不是只負責寫字，而是要留下三個共同理由與一個未解問題；報告者不是背稿，而是指出資料在哪裡。這讓老師和學生都能在活動結束時檢查角色是否真的完成，而不是靠印象評分。',
        en: 'Write a completion condition for each role. A recorder does more than write: they capture three shared reasons and one open question. A reporter points to the evidence instead of reciting a script. Clear conditions let students and teachers check the role without relying on impressions.',
      },
      {
        zh: 'Vanderbilt Center for Teaching 的 Group Work 指南（https://cft.vanderbilt.edu/guides-sub-pages/group-work/）將小組合作視為需要設計、支援與評量的教學活動。角色能降低「誰來做」的起始摩擦，但不會自動讓小組公平或高效；任務說明、時間、材料與回饋同樣重要。',
        en: 'Vanderbilt’s Center for Teaching group-work guide (https://cft.vanderbilt.edu/guides-sub-pages/group-work/) treats collaboration as an activity that needs design, support, and assessment. Roles reduce the opening “who does what?” friction, but they do not automatically make a group fair or effective; task directions, time, materials, and feedback still matter.',
      },
      {
        zh: '輪替可以按活動、課堂或小組週期進行。若同一任務只有十分鐘，活動中途換角色可能增加成本；若是四週專題，則每次會議輪替一次並留下簡短紀錄。輪替不代表每人每個角色都必須完全相同時間，而是避免責任長期固定，並讓教師看見不同學生的理解。',
        en: 'Rotate by activity, lesson, or project meeting. For a ten-minute task, changing roles halfway can cost more than it helps; for a four-week project, rotate at each meeting and keep a short log. Rotation need not give every student identical minutes in every role, but it prevents permanent responsibility and reveals different kinds of understanding.',
      },
      {
        zh: '用隨機抽選器決定第一輪角色可以增加透明度，但要保留學生合理的支援與可及性調整。老師可先產生隨機起點，再確認需要使用不同表達方式、設備或安靜準備時間的學生能完成角色；不要把「隨機」當成拒絕調整的理由。',
        en: 'A random picker can make the first role assignment transparent, but keep reasonable access and support adjustments. Generate a starting point, then check whether a student needs another way to communicate, equipment, or quiet preparation time. Randomness is not a reason to refuse an adjustment.',
      },
    ],
    steps: [
      { zh: '先寫出這次任務真正需要的兩到五種行動，不要先列漂亮的職稱。', en: 'List the two to five actions this task actually needs before naming roles.' },
      { zh: '為每個角色寫一個完成條件，讓學生知道交付長什麼樣子。', en: 'Write one completion condition for each role so the deliverable is visible.' },
      { zh: '用隨機抽選器或小組共識分配第一輪，保留老師必要的支援調整。', en: 'Assign the first round with a random picker or group agreement, keeping necessary teacher support adjustments.' },
      { zh: '用倒數計時器切出討論、整理、檢查與報告時間，避免角色失去節奏。', en: 'Use a countdown timer for discussion, synthesis, checking, and reporting so roles have a shared rhythm.' },
      { zh: '活動結束檢查每個完成條件，讓報告者不成為唯一被看見的人。', en: 'Check every completion condition so the reporter is not the only visible contributor.' },
      { zh: '保存角色與日期，下一次活動先看歷史再輪替，並記錄缺席或支援調整。', en: 'Save roles and dates, review the history before rotating next time, and note absences or support adjustments.' },
    ],
    example: {
      zh: '四人小組要在 12 分鐘內比較兩種解法。老師只設四個行動：主持、記錄、檢查、報告，並把完成條件寫在投影片上。用抽選器決定第一輪後，倒數計時器提醒剩 4 分鐘時開始檢查。下一堂課同一批學生換角色，老師從紀錄看見原本只報告的學生開始提出證據；這不是保證每人能力相同，而是讓參與機會不被固定。',
      en: 'A four-person group has twelve minutes to compare two methods. The teacher defines four actions—facilitator, recorder, checker, reporter—and puts completion conditions on the slide. A picker assigns the first round, and the timer signals checking at four minutes remaining. The same students rotate next lesson; the log shows a former reporter beginning to cite evidence. Rotation does not guarantee identical ability, but it prevents visibility from staying fixed.',
    },
    commonMistakes: [
      { zh: '角色太多、定義太抽象，學生記得職稱卻不知道下一步。', en: 'Creating too many abstract titles so students remember labels but not actions.' },
      { zh: '每次都讓同一位學生主持或報告，卻稱為「合作學習」。', en: 'Letting the same student facilitate or report every time while calling it collaboration.' },
      { zh: '用隨機抽選結果拒絕必要的支援、可及性或語言調整。', en: 'Using a random result to refuse necessary access, language, or support adjustments.' },
      { zh: '只評報告者的口頭表現，沒有檢查記錄、證據與共同決定。', en: 'Assessing only the reporter’s speaking and not the notes, evidence, or shared decisions.' },
      { zh: '沒有記錄輪替日期，下一次又從同一個人開始。', en: 'Keeping no rotation date and assigning the same role again by accident.' },
    ],
    faq: [
      { question: { zh: '小組一定要有五種角色嗎？', en: 'Does every group need five roles?' }, answer: { zh: '不需要。依任務需要設兩到五種可觀察行動即可；三人小組可以合併時間與檢查，重點是責任清楚。', en: 'No. Use two to five observable actions that fit the task. A three-person group can combine timekeeping and checking; clarity matters more than titles.' } },
      { question: { zh: '角色要每堂課都換嗎？', en: 'Must roles change every lesson?' }, answer: { zh: '看任務長度與熟悉度。短活動可每次換，長專題可每次會議換；若中途換角色會打斷工作，就在下一個活動輪替並留下紀錄。', en: 'It depends on task length and familiarity. Rotate short activities each round and longer projects each meeting; if mid-task changes interrupt work, rotate next activity and log it.' } },
      { question: { zh: '可以用隨機工具分配角色嗎？', en: 'Can a random tool assign roles?' }, answer: { zh: '可以當透明起點，但老師仍要檢查支援、可及性與任務需求。公開「隨機起點加教師審查」比宣稱完全隨機更準確。', en: 'Yes, as a transparent starting point, while the teacher checks support, access, and task needs. “Random start plus teacher review” is more accurate than claiming fully random.' } },
    ],
    cta: {
      zh: '先用隨機分組工具建立小組，再以抽選器、倒數計時器與角色完成條件讓每個人都有可檢查的下一步。',
      en: 'Create groups first, then use a picker, countdown timer, and role completion conditions to give everyone a reviewable next step.',
    },
    updatedAt: '2026-09-03',
    noFaqSchema: true,
  },
  {
    id: 'seating-chart-changeover-routine-guide',
    locales: ['zh', 'en'],
    slug: 'seating-chart-changeover-routine-guide',
    title: {
      zh: '換座位表的現場執行流程',
      en: 'Classroom Seating Chart Changeover Routine',
    },
    metaTitle: {
      zh: '換座位怎麼不混亂？座位表公告、標記、動線與課後檢查流程',
      en: 'Seating Chart Changeover Routine',
    },
    metaDescription: {
      zh: '新座位表畫好不代表換位完成：本指南整理公告時機、姓名標記、分批移動、通道檢查、設備與缺席處理，並教你用座位表工具保存版本，降低學生走錯位或課堂中斷。',
      en: 'Plan announcements, movement batches, aisle checks, equipment, and absences, then save a dated seating-chart version.',
    },
    h1: {
      zh: '換座位表怎麼執行？讓學生移動、找位與課堂恢復都有步驟',
      en: 'How to Run a Seating Chart Changeover Without Derailing Class',
    },
    category: { zh: '教學與課堂工具', en: 'Teaching and classroom tools' },
    priority: 40,
    searchIntent: {
      zh: '老師已經排好新座位，但擔心公告、搬動、缺席與設備調整造成混亂，想找一套可在一堂課內完成的換位流程。',
      en: 'A teacher has a new seating chart but needs a practical in-class routine for announcing it, moving students, handling absences and equipment, and restoring the lesson.',
    },
    targetKeywords: [
      { zh: '換座位流程', en: 'seating chart changeover routine' },
      { zh: '座位表公告怎麼做', en: 'how to announce a new seating chart' },
      { zh: '教室換座位不混亂', en: 'classroom seat change without chaos' },
    ],
    relatedToolIds: ['seating-chart', 'countdown-timer', 'random-student-picker'],
    relatedGuideIds: ['seating-chart-strategies-guide', 'seating-chart-student-needs-intake-guide', 'classroom-timer-guide'],
    relatedWorkflowIds: ['teacher-classroom-random-toolkit'],
    summary: {
      zh: '換位是一次小型現場作業：先讓學生知道目的與順序，再分批移動、檢查通道與設備，最後保存日期版本，下一堂課才不會一直重問「我坐哪裡」。',
      en: 'A seat change is a small operations task: explain the purpose and order, move in batches, check aisles and equipment, and save a dated version so the next lesson starts clearly.',
    },
    problem: {
      zh: '老師常在下課前宣布「下節課換座位」，卻沒有標記、移動順序或缺席處理。結果學生圍在座位表前、桌椅撞在一起、投影或插座被換掉，下一節課前幾分鐘都在找位子。',
      en: 'A teacher may announce “new seats next lesson” without labels, movement order, or an absence plan. Students crowd around the chart, desks collide, projector or power access changes, and the first minutes of the next lesson disappear into seat-finding.',
    },
    whoShouldUse: {
      zh: '適合學期初、每月輪換、課型變更、考試後重新編組，以及需要讓代課老師快速接手的班級。',
      en: 'Use this at the start of term, during scheduled rotations, after exams, when the lesson format changes, or when a substitute needs a clear handoff.',
    },
    explanation: [
      {
        zh: '先在課前產生並保存座位表版本，標示日期與使用情境。公開版可以是投影、紙本或每桌的小卡，但不要只依賴一張拍照後會反光的牆面表；讓學生能在自己的位置附近找到姓名，也能在需要時詢問老師。',
        en: 'Generate and save a dated seating version before class, including the reason or lesson context. The public copy can be projected, printed, or shown on desk cards, but do not rely on one glare-prone wall chart; students need a nearby way to find their place and ask for help.',
      },
      {
        zh: '把換位拆成可預測的批次，例如先搬靠窗一側、再搬靠門一側，或按座號區塊依序移動。每批只在上一批坐定、通道恢復後開始，避免全班同時起身。倒數計時器可以提醒剩餘時間，但不能取代老師口頭確認。',
        en: 'Break the move into predictable batches, such as window side then door side, or numbered zones. Start the next batch only after the previous one is seated and the aisle is clear; a countdown timer can signal time but cannot replace a teacher check.',
      },
      {
        zh: '換位前先處理固定設備與可及性需求：投影視線、桌面電源、輪椅或助行器轉身空間、教師走動線和需要安靜準備的位置。若缺席者未到，不要讓全班自行猜測是否補位；先保留該位置，課後再依教師紀錄調整。',
        en: 'Before moving, check projector sight lines, desk power, turning space for mobility aids, teacher circulation, and low-distraction preparation areas. If someone is absent, do not let the class guess whether to fill the seat; hold the place and adjust from the private teacher record later.',
      },
      {
        zh: '公告內容只說明學生需要知道的規則，例如「先拿個人物品、依區域移動、坐定後舉手」。不要在全班面前解釋某位學生為何被安排到某處。CAST UDL Guidelines（https://udlguidelines.cast.org/）鼓勵降低不必要的環境障礙；清楚流程與替代詢問方式能讓換位更可預期。',
        en: 'Announce only the rules students need: take personal items first, move by zone, and raise a hand after sitting. Do not explain in front of the class why one student is placed somewhere. CAST’s UDL Guidelines (https://udlguidelines.cast.org/) support reducing unnecessary environmental barriers; a clear routine and a private way to ask make the move more predictable.',
      },
      {
        zh: '完成後用一分鐘做「現場驗收」：姓名與座位相符、通道暢通、桌椅沒有擋住門或設備、學生知道下一堂課仍沿用哪一版。把需要微調的地方寫下來，下一次更新座位表時才有依據，而不是靠記憶重新排一次。',
        en: 'Finish with a one-minute acceptance check: names match seats, aisles are clear, desks do not block doors or equipment, and everyone knows which version applies next lesson. Write down small adjustments so the next chart is based on evidence rather than memory.',
      },
    ],
    steps: [
      { zh: '用座位表工具保存帶日期的新版本，先核對固定物、設備與必要限制。', en: 'Save a dated version with the seating tool and verify fixed features, equipment, and hard constraints.' },
      { zh: '在課前公告目的、移動區域、個人物品與坐定後的確認方式。', en: 'Announce the purpose, movement zones, personal items, and the seated confirmation method before moving.' },
      { zh: '依區域或座號分批移動，每批完成後清空通道再開始下一批。', en: 'Move by zone or number in batches, clearing the aisle after each batch.' },
      { zh: '缺席者保留位置，不公開原因；設備或可及性問題交由老師私下調整。', en: 'Hold absent students’ places without public reasons and handle equipment or access changes privately.' },
      { zh: '全班坐定後用姓名、門口、投影、插座與教師動線快速驗收。', en: 'After everyone sits, check names, doors, projector, outlets, and teacher circulation.' },
      { zh: '把交換、缺席與現場摩擦記在版本旁，下一次換位先讀紀錄。', en: 'Record swaps, absences, and friction beside the version and review it before the next change.' },
    ],
    example: {
      zh: '老師要在週一把 32 人班級換成討論用分組島。週五先用座位表工具輸出帶日期版本，標出門、投影和保留通道；週一開課前說明「先收好物品、後排兩區移動、坐定舉手」。學生依窗側與門側分批換位，缺席者位置保留，最後老師檢查投影視線與走動線。全程花 6 分鐘，課後把兩個反光位置記在版本旁，下一次直接調整。',
      en: 'A teacher changes a class of 32 into discussion islands on Monday. On Friday, they save a dated chart with the door, projector, and clear aisle marked. Before class, students hear “pack items, move by two zones, raise a hand when seated.” Window and door zones move in batches, absent seats stay open, and the teacher checks sight lines and circulation. The move takes six minutes; two glare-prone seats are logged for the next version.',
    },
    commonMistakes: [
      { zh: '只公布新座位表，沒有說明移動順序與坐定後怎麼確認。', en: 'Publishing the chart without a movement order or seated confirmation method.' },
      { zh: '讓全班同時搬桌椅，通道與門口變成瓶頸。', en: 'Moving every desk at once and turning aisles and doors into bottlenecks.' },
      { zh: '缺席者位置由同學自行補位，下一堂課又無法追查版本。', en: 'Letting classmates fill absent seats and losing track of the next version.' },
      { zh: '在公開場合解釋個別學生的座位原因或敏感需求。', en: 'Explaining an individual student’s placement or sensitive need publicly.' },
      { zh: '換完只看姓名有沒有坐對，沒有檢查投影、插座、門與教師動線。', en: 'Checking names only and missing the projector, outlets, doors, or teacher circulation.' },
    ],
    faq: [
      { question: { zh: '換座位一定要花一整節課嗎？', en: 'Does a seating change take a whole lesson?' }, answer: { zh: '不一定。事前把版本、公告和分區順序準備好，常可在幾分鐘內完成；班級大小、桌型與設備會影響實際時間，仍要預留驗收。', en: 'No. Preparing the version, announcement, and zones beforehand can make it take minutes. Class size, desks, and equipment change the time, so reserve a final check.' } },
      { question: { zh: '缺席學生的座位要先給別人坐嗎？', en: 'Should an absent student’s seat be given away?' }, answer: { zh: '通常先保留，避免全班形成未記錄的臨時版本。若課堂確實需要調整，老師私下記下變更，下一次再依實際名單更新。', en: 'Usually hold it to avoid an unlogged temporary version. If the lesson requires a change, the teacher should record it privately and update the chart from actual attendance next time.' } },
      { question: { zh: '要不要把座位表拍照傳到班級群組？', en: 'Should I photograph the chart in a class group chat?' }, answer: { zh: '先看學校政策與學生隱私。能用投影、紙本或受控平台就不要擴散；公開版本只放完成課堂所需的最少資訊。', en: 'Follow school policy and privacy rules. Prefer projection, paper, or a controlled platform over broad sharing; the public version should contain only what the class needs.' } },
    ],
    cta: {
      zh: '用座位表工具保存版本，按區域分批移動，最後驗收通道、設備與姓名，讓換位不再打斷整堂課。',
      en: 'Save a dated chart, move by zones, and check aisles, equipment, and names so the change does not derail the lesson.',
    },
    updatedAt: '2026-09-03',
    noFaqSchema: true,
  },
  {
    id: 'qr-code-event-page-expiry-guide',
    locales: ['zh', 'en'],
    slug: 'qr-code-event-page-expiry-guide',
    title: {
      zh: '活動 QR Code 到期與失效處理指南',
      en: 'QR Code Event Page Expiry and Recovery Guide',
    },
    metaTitle: {
      zh: '活動 QR Code 到期怎麼辦？網址失效與更新流程',
      en: 'QR Code Event Page Expiry: Prevent Broken Links',
    },
    metaDescription: {
      zh: '活動結束後不要讓 QR Code 變成死連結：用可控網址、到期頁、備援訊息與版本紀錄，規劃更新、轉址和撤下時機，避免使用者掃描後看到錯誤或無法繼續。',
      en: 'Keep event QR codes useful after a campaign ends with a controlled URL, expiry page, fallback message, redirects, and a documented retirement plan.',
    },
    h1: {
      zh: '活動 QR Code 到期與失效：從設計到撤下的維護流程',
      en: 'QR Code Event Page Expiry: A Practical Maintenance and Recovery Plan',
    },
    category: { zh: 'QR Code 與條碼', en: 'QR codes and barcodes' },
    priority: 41,
    searchIntent: {
      zh: '使用者的活動 QR Code 即將到期或已失效，想知道如何在不重印的情況下更新目的地並保留清楚的使用者訊息。',
      en: 'An event QR code is nearing expiry or already broken, and the owner wants to update the destination without reprinting while giving visitors a clear next step.',
    },
    targetKeywords: [
      { zh: 'QR Code 到期處理', en: 'QR code event expiry' },
      { zh: 'QR Code 失效怎麼更新', en: 'update a broken QR code link' },
      { zh: '活動 QR Code 轉址', en: 'event QR code redirect' },
    ],
    relatedToolIds: ['qr-code-generator', 'url-encoder', 'character-counter'],
    relatedGuideIds: ['qr-code-before-print-testing-guide', 'qr-code-mobile-landing-page-guide', 'qr-code-payload-length-guide'],
    relatedWorkflowIds: ['qr-barcode-publishing-toolkit'],
    summary: {
      zh: '印在海報上的圖形通常不能直接改寫；真正可維護的是它指向的網址。把活動頁、到期頁、轉址與撤下紀錄先設計好，才能在活動結束後仍提供有用回應。',
      en: 'The printed symbol usually cannot be edited. The maintainable part is its destination URL, so plan the event page, expiry response, redirect, and retirement record before publishing.',
    },
    problem: {
      zh: '活動結束後，主辦方刪掉頁面或讓短網址失效，訪客掃描 QR Code 只看到 404、空白頁或過期報名表。重新印刷成本高，臨時把網址換掉又可能讓既有宣傳失去一致性。',
      en: 'After an event, an organizer deletes the page or lets a short link expire. Visitors then see a 404, blank page, or closed registration form. Reprinting is expensive, while an undocumented last-minute change breaks consistency across promotion.',
    },
    whoShouldUse: {
      zh: '適合活動主辦、展場、學校、社群管理者、餐飲店與任何會在固定印刷品上放限時 QR Code 的團隊。',
      en: 'Useful for event organizers, venues, schools, community managers, restaurants, and teams placing time-limited QR codes on printed materials.',
    },
    explanation: [
      {
        zh: '先把 QR Code 指向自己能控制的穩定入口，而不是把一次性報名表或含日期的長網址直接編碼。印刷圖形固定後，只要入口頁仍存在，就能在頁面內更新活動狀態、提供新資訊或引導到下一個活動。這不是把靜態碼變成動態碼的保證，而是把維護責任放在可管理的網頁上。',
        en: 'Point the code to a stable entry you control instead of encoding a one-time form or a long date-specific URL. Once the symbol is printed, a living entry page can show status, updates, or the next event. This does not magically make a static code dynamic; it places maintenance on a page you can manage.',
      },
      {
        zh: '到期頁不應只是「活動已結束」。說明結束日期、目前狀態、替代入口與聯絡方式；若還有錄影、資料下載或下一場活動，給出明確按鈕。不要要求訪客猜測是否要重試，也不要把過期表單留在畫面上讓人重複提交。',
        en: 'An expiry page should say more than “event over.” State the end date, current status, alternative links, and contact route; offer a clear button for a recording, resources, or the next event. Do not leave a closed form that invites repeated submissions or make visitors guess whether to retry.',
      },
      {
        zh: '轉址要保留可理解的路徑與語言，不要在無紀錄的情況下連續跳轉。建立一份版本表，記下 QR Code 印刷品、入口路徑、生效日、到期處理、負責人與最後測試時間。這份表也能讓代班或新成員知道哪些舊海報仍在流通。',
        en: 'Keep redirects understandable and language-aware; avoid chains of undocumented hops. Maintain a version table with the printed asset, entry path, effective date, expiry action, owner, and last test. That record helps a substitute or new teammate handle posters that are still in circulation.',
      },
      {
        zh: '撤下前先從真實紙張掃描，不只在後台打開網址。用不同手機確認到期頁仍能載入、按鈕可用、聯絡方式正確；也檢查紙張上的短網址或備援文字是否仍與頁面一致。DENSO WAVE 的 QR Code 基礎說明可作為符號結構與留白的參考，但不能替你的活動頁維運背書。',
        en: 'Before retiring a page, scan the real printed material rather than opening the URL only in an admin screen. Test the expiry page, buttons, and contact route on different phones, and check that the printed fallback text still matches. DENSO WAVE is a reference for QR structure and quiet space, not a guarantee for your page operations.',
      },
      {
        zh: '若網址已經失效，先恢復一個清楚的狀態頁再處理長期轉址。不要把所有未知舊路徑都導到首頁，因為使用者會失去上下文；保留可辨識的「活動已結束」訊息，並在分析工具中把掃描、頁面瀏覽與後續點擊分開觀察。',
        en: 'If the URL is already broken, restore a clear status page first, then decide on a long-term redirect. Sending every unknown path to the home page loses context; keep an identifiable “event ended” message and measure scans, page views, and follow-up clicks separately.',
      },
    ],
    steps: [
      { zh: '列出所有仍在紙本、簡報、包裝或社群貼文中的活動 QR Code。', en: 'Inventory event QR codes still present on print, slides, packaging, or social posts.' },
      { zh: '為每個圖形指定一個可控制、可記錄的入口網址。', en: 'Assign each symbol a controllable, documented entry URL.' },
      { zh: '建立活動中、即將到期、已結束三種頁面狀態與替代連結。', en: 'Define active, expiring, and ended states with alternative links.' },
      { zh: '在真正的印刷尺寸上用兩支不同手機測試入口與備援文字。', en: 'Test the entry and fallback text at print size with two different phones.' },
      { zh: '在版本表記下生效日、到期日、負責人與最後一次掃描時間。', en: 'Record effective date, expiry date, owner, and last scan in a version table.' },
      { zh: '活動結束後先切換狀態頁，再依資料決定保留、轉址或撤下。', en: 'After the event, switch to the status page before deciding whether to keep, redirect, or retire it.' },
    ],
    example: {
      zh: '一張校園講座海報預計張貼三個月。主辦方讓 QR Code 指向 `/events/spring-talk`，頁面在報名關閉後顯示日期、錄影連結與聯絡信箱；版本表記錄海報批次與最後測試。活動結束兩週後仍有人掃描，團隊保留頁面而沒有導回首頁，避免訪客以為連結壞掉。',
      en: 'A campus talk poster will remain up for three months. Its QR code points to `/events/spring-talk`; after registration closes, the page shows the date, recording link, and contact email. The version table records the poster batch and last test. When scans continue two weeks later, the team keeps the status page instead of redirecting to the home page.',
    },
    commonMistakes: [
      { zh: '把 QR Code 直接編碼到一次性表單或帶有到期日期的路徑。', en: 'Encoding a one-time form or date-bound path directly in the QR code.' },
      { zh: '活動結束只刪頁面，沒有提供狀態、替代入口或聯絡方式。', en: 'Deleting the page without a status message, alternative link, or contact route.' },
      { zh: '所有失效網址都導回首頁，讓訪客失去活動上下文。', en: 'Redirecting every broken URL to the home page and losing event context.' },
      { zh: '只在後台測試網址，沒有掃描仍在流通的實體印刷品。', en: 'Testing only in an admin screen and never scanning the physical material still in circulation.' },
      { zh: '沒有保存 URL 版本與負責人，導致到期日只能靠猜。', en: 'Keeping no URL version or owner record and guessing when an event expires.' },
    ],
    faq: [
      { question: { zh: 'QR Code 印出去後可以直接改網址嗎？', en: 'Can I change the URL after printing a QR code?' }, answer: { zh: '圖形本身通常不能改；若它指向你能控制的入口頁，可以更新入口內容或設定清楚的轉址。若是把一次性網址直接編碼，通常需要重新產生與印刷。', en: 'The printed symbol usually cannot be edited. If it points to a page you control, update that entry or its redirect. A one-time URL encoded directly in the symbol usually requires a new code and reprint.' } },
      { question: { zh: '活動結束後應該把 QR Code 轉到首頁嗎？', en: 'Should an ended event QR code redirect to the home page?' }, answer: { zh: '不一定。保留活動名稱、日期與替代資訊的狀態頁通常更符合訪客期待；只有在內容確實沒有保留價值時，才考慮有說明的轉址。', en: 'Not automatically. A status page preserving the event name, date, and alternatives usually matches visitor expectations; redirect only when the content has no useful context, and explain the destination.' } },
      { question: { zh: '要保留過期活動頁多久？', en: 'How long should an ended event page stay online?' }, answer: { zh: '依紙本仍在流通時間、資料保存政策與聯絡需求決定。先保留一個不含個資的狀態頁，再依實際掃描與維運成本調整，並記錄決策日期。', en: 'Base it on how long the print remains in circulation, retention policy, and support needs. Keep a privacy-safe status page first, then adjust from real scans and maintenance cost with a dated decision record.' } },
    ],
    cta: {
      zh: '用 QR Code 產生器建立入口，先寫好活動中與到期後的頁面狀態，再用實體樣張測試並留下版本紀錄。',
      en: 'Create the entry with the QR Code generator, define active and expired states, test a real sample, and keep a version record.',
    },
    updatedAt: '2026-09-03',
    noFaqSchema: true,
  },
  {
    id: 'qr-code-multilingual-switch-testing-guide',
    locales: ['zh', 'en'],
    slug: 'qr-code-multilingual-switch-testing-guide',
    title: {
      zh: '多語 QR Code 語言切換測試指南',
      en: 'Multilingual QR Code Language-Switch Testing Guide',
    },
    metaTitle: {
      zh: '多語 QR Code 怎麼測試？語言切換與備援流程',
      en: 'Multilingual QR Codes: Test Language Switching',
    },
    metaDescription: {
      zh: '為中文與英文 QR Code 落地頁建立語言切換測試：檢查自動判斷、手動切換、日期與表單文字、錯誤頁及短網址備援，避免掃描後進入錯誤語言或卡在錯誤流程。',
      en: 'Test a bilingual QR code landing page for automatic detection, manual switching, dates, forms, errors, and a short-URL fallback so visitors reach the right language.',
    },
    h1: {
      zh: '多語 QR Code 語言切換：中文與英文落地頁的測試方法',
      en: 'Multilingual QR Code Testing: A Reliable Language-Switch Workflow',
    },
    category: { zh: 'QR Code 與條碼', en: 'QR codes and barcodes' },
    priority: 42,
    searchIntent: {
      zh: '使用者已準備好多語 QR Code 頁面，想確認不同裝置與語言設定不會把訪客帶到錯誤翻譯或無法返回的頁面。',
      en: 'A multilingual QR destination exists, and the owner needs to verify that devices and language settings do not send visitors to the wrong translation or a page they cannot escape.',
    },
    targetKeywords: [
      { zh: '多語 QR Code 測試', en: 'test multilingual QR code' },
      { zh: 'QR Code 語言切換', en: 'QR code language switch' },
      { zh: 'QR Code 中文英文頁面', en: 'bilingual QR code landing page' },
    ],
    relatedToolIds: ['qr-code-generator', 'url-encoder', 'character-counter'],
    relatedGuideIds: ['qr-code-mobile-landing-page-guide', 'qr-code-before-print-testing-guide', 'qr-code-event-page-expiry-guide'],
    relatedWorkflowIds: ['qr-barcode-publishing-toolkit'],
    summary: {
      zh: '多語 QR Code 的難點不是產生圖形，而是讓掃描後的頁面清楚顯示目前語言、允許手動切換，並在自動判斷錯誤時仍保留可理解的備援入口。',
      en: 'The hard part of a multilingual QR code is not making the symbol. It is showing the current language, keeping a manual switch, and preserving a useful fallback when automatic detection is wrong.',
    },
    problem: {
      zh: '同一個 QR Code 服務不同語言的訪客時，瀏覽器語言、手機共用、轉址參數與快取可能把人送到錯誤頁面。表單欄位看似翻譯完成，提交後訊息、日期格式或客服連結卻仍是另一種語言。',
      en: 'When one QR code serves multiple languages, browser settings, shared phones, redirect parameters, and caches can send people to the wrong page. A form may look translated while its confirmation, dates, or support link remains in another language.',
    },
    whoShouldUse: {
      zh: '適合服務台、活動報名、校園通知、餐飲菜單、跨地區產品說明與同時面向中文和英文使用者的團隊。',
      en: 'Use this for help desks, registrations, campus notices, menus, product instructions, and teams serving both Chinese- and English-speaking visitors.',
    },
    explanation: [
      {
        zh: '把語言切換視為完整任務，不是只替換標題。測試頁面標題、主要按鈕、表單欄位、錯誤訊息、日期時間、價格、隱私說明與提交後確認；任一關鍵步驟混語，都可能讓訪客不敢繼續。',
        en: 'Treat language switching as a complete task, not a title replacement. Test headings, primary buttons, form fields, errors, dates, prices, privacy text, and confirmation messages; mixed language at a critical step can stop a visitor.',
      },
      {
        zh: '自動依瀏覽器語言判斷可以減少一步，但不能取代可見的手動切換。W3C WCAG 2.2 的可理解性原則支持讓目前語言與操作狀態清楚可辨；不要讓訪客只能清除 Cookie 或猜 URL 才能回到另一種語言。',
        en: 'Browser-language detection may remove one step, but it must not replace a visible manual switch. WCAG 2.2’s understandable-content principles support making the current language and state clear; visitors should not have to clear cookies or guess a URL to switch back.',
      },
      {
        zh: '用固定測試矩陣記錄裝置與入口：中文手機、英文手機、無偏好語言、私密瀏覽、慢速網路，以及直接開短網址。每種情況都記下最後 URL、頁面語言、切換後是否保留表單內容，以及返回 QR Code 入口是否仍合理。',
        en: 'Use a fixed test matrix: Chinese phone, English phone, no preferred language, private browsing, slow network, and a direct short-URL visit. Record the final URL, page language, preserved form state, and whether returning to the QR entry still makes sense.',
      },
      {
        zh: '不要把翻譯檔的存在當成完成證據。真正的驗收要從掃描或貼上入口開始，走過語言切換、填寫、錯誤與成功狀態；若使用參數記錄來源，確認轉址不會刪除語言選擇或重複附加參數。',
        en: 'The existence of translation files is not proof of completion. Start from a scan or pasted entry, then walk through switching, filling, errors, and success; if source parameters are used, verify redirects do not drop the language choice or append it repeatedly.',
      },
      {
        zh: '為無法掃描或無法使用自動偵測的人保留短網址與語言連結。這不只是可及性補救，也能協助客服描述問題、讓桌面使用者直接開啟同一入口。測試結果應記錄「哪一個語言、哪一台裝置、哪一個版本」而非只寫通過。',
        en: 'Keep a short URL and explicit language links for people who cannot scan or whose automatic detection fails. This is both an accessibility fallback and a support aid. Record which language, device, and version passed—not just a generic “works.”',
      },
      {
        zh: '發布前安排一位不熟悉流程的人盲測，請他只依展板、短網址與頁面提示完成任務，記下猶豫與誤按的位置。',
        en: 'Before publishing, ask someone unfamiliar with the flow to complete it using only the poster, short URL, and page prompts. Note hesitation and wrong taps; real-user behavior exposes entry problems an experienced team may overlook.',
      },
    ],
    steps: [
      { zh: '列出中文、英文與未設定語言三種預期入口結果。', en: 'Define expected results for Chinese, English, and no-language-preference entry.' },
      { zh: '用 QR Code 產生器與短網址各建立一份可重現的測試入口。', en: 'Create reproducible test entries with the QR generator and the short URL.' },
      { zh: '在兩支不同手機掃描，記錄最終 URL、頁面語言與轉址次數。', en: 'Scan on two different phones and record the final URL, language, and redirect count.' },
      { zh: '在頁面中手動切換語言，確認標題、表單、日期、錯誤與成功訊息完整一致。', en: 'Switch language manually and verify headings, forms, dates, errors, and success messages.' },
      { zh: '用私密瀏覽與慢速網路重做一次，確認沒有依賴快取或登入狀態。', en: 'Repeat in private browsing and on a slow connection to avoid cache or login assumptions.' },
      { zh: '把短網址、語言連結與測試矩陣放入發布紀錄，版本更新後重新抽測。', en: 'Add the fallback URL, language links, and matrix to the release record and retest after changes.' },
    ],
    example: {
      zh: '展場 QR Code 連到雙語產品頁。測試發現英文手機會正確進英文首頁，但按下「立即預約」後的表單確認仍是中文。團隊把表單與成功頁列入同一語言路由，保留頁首的中／EN 切換，並在展板旁印上短網址；重新用私密瀏覽和慢速網路測試後才發布。',
      en: 'A trade-show QR code opens a bilingual product page. Testing shows an English phone reaches the English home but the booking confirmation remains Chinese. The team puts the form and success page under the same language route, keeps a visible 中文/EN switch, and prints the short URL beside the poster before retesting privately and on a slow connection.',
    },
    commonMistakes: [
      { zh: '只翻譯首屏標題，沒有測表單、錯誤與成功訊息。', en: 'Translating the first-screen heading but not the form, errors, or success message.' },
      { zh: '依賴自動語言判斷，卻沒有可見的手動切換。', en: 'Relying on automatic detection without a visible manual switch.' },
      { zh: '只在同一支手機與已登入狀態測試，忽略快取與權限差異。', en: 'Testing on one phone while logged in and missing cache or permission differences.' },
      { zh: '轉址後遺失語言參數，或每次跳轉都重複附加參數。', en: 'Dropping the language parameter or appending it repeatedly during redirects.' },
      { zh: '沒有提供短網址或文字備援，客服也無法重現訪客路徑。', en: 'Providing no short-URL or text fallback, leaving support unable to reproduce the path.' },
    ],
    faq: [
      { question: { zh: '一個 QR Code 可以同時服務中文和英文嗎？', en: 'Can one QR code serve Chinese and English visitors?' }, answer: { zh: '可以，前提是入口頁能清楚顯示目前語言並提供手動切換。自動偵測只能當輔助，且每種語言都要測完整任務流程。', en: 'Yes, if the entry clearly shows the current language and offers a manual switch. Automatic detection is only an aid, and each language needs a full task-flow test.' } },
      { question: { zh: '應該把中文與英文做成兩個 QR Code 嗎？', en: 'Should Chinese and English use separate QR codes?' }, answer: { zh: '若受眾、版面或追蹤需求明確分開，兩個碼可降低語言猜測；若希望印刷簡潔，一個碼加上清楚切換與短網址備援也可行。先以實際掃描流程與維護成本決定。', en: 'Use separate codes when audiences, layout, or measurement must be clearly separated. One code with a clear switch and fallback can keep print simpler; choose from the scan flow and maintenance cost.' } },
      { question: { zh: '切換語言時要保留已填寫的表單嗎？', en: 'Should a language switch preserve form entries?' }, answer: { zh: '若不會造成個資暴露或欄位格式錯誤，保留未提交內容能減少重填；否則要先清楚提醒並提供回到原語言的方式。測試時要記錄實際行為，不要假設所有瀏覽器相同。', en: 'Preserve unsubmitted fields when it is safe and format-compatible, because it reduces retyping. Otherwise warn clearly and provide a way back; record actual browser behavior rather than assuming it is universal.' } },
    ],
    cta: {
      zh: '先用 QR Code 產生器建立測試入口，再按裝置、語言與網路條件走完切換和表單流程，讓多語頁面在真實掃描後仍然清楚。',
      en: 'Create a test entry with the QR Code generator, then walk through switching and forms across devices, languages, and network conditions.',
    },
    updatedAt: '2026-09-03',
    noFaqSchema: true,
  },
  {
    id: 'split-pdf-page-range-planning-guide',
    locales: ['zh', 'en'],
    slug: 'split-pdf-page-range-planning-guide',
    title: {
      zh: 'PDF 分割頁碼範圍規劃指南',
      en: 'PDF Page-Range Splitting Planning Guide',
    },
    metaTitle: {
      zh: 'PDF 怎麼分割頁碼？範圍、奇偶頁與檔案驗收',
      en: 'How to Split PDF Pages by Range: A Safe Checklist',
    },
    metaDescription: {
      zh: '分割 PDF 前先規劃頁碼範圍、奇偶頁與輸出命名，並在下載後核對頁數、順序與檔案內容，避免把原檔刪錯、頁面漏掉或交付不完整，分享前也更容易複核。',
      en: 'Plan PDF page ranges, odd or even selections, and output names before splitting, then verify page count, order, and contents after download.',
    },
    h1: {
      zh: 'PDF 分割頁碼怎麼規劃：從範圍選擇到輸出驗收',
      en: 'How to Split PDF Pages by Range Without Losing Context',
    },
    category: { zh: 'PDF 工作流程', en: 'PDF workflows' },
    priority: 43,
    searchIntent: {
      zh: '使用者需要從長篇 PDF 擷取連續頁、奇偶頁或多個區段，想先避免頁碼計算錯誤，再確認輸出的檔案可交付。',
      en: 'A user needs consecutive pages, odd or even pages, or several ranges from a long PDF and wants a repeatable plan that avoids page-number mistakes.',
    },
    targetKeywords: [
      { zh: 'PDF 分割頁碼範圍', en: 'split PDF by page range' },
      { zh: 'PDF 擷取奇數偶數頁', en: 'extract odd even PDF pages' },
      { zh: 'PDF 分割後檢查頁數', en: 'verify split PDF page count' },
    ],
    relatedToolIds: ['split-pdf', 'extract-pdf-pages', 'pdf-page-reorder'],
    relatedGuideIds: ['merge-pdf-page-size-orientation-guide', 'pdf-to-image-multipage-download-guide', 'merge-pdf-private-guide'],
    relatedWorkflowIds: ['office-document-toolkit'],
    summary: {
      zh: '分割 PDF 的核心不是按下按鈕，而是把「原始 PDF 頁碼」和「輸出檔案用途」對上。先保留原檔、寫清楚範圍，再用頁數與內容抽查驗收。',
      en: 'Splitting a PDF is less about clicking a button than mapping source page numbers to the purpose of each output. Keep the original, write the ranges down, and verify page count and content.',
    },
    problem: {
      zh: '長篇報告常同時有 PDF 內頁碼與檢視器顯示的索引，封面、目錄或插頁讓「第 10 頁」產生歧義。只憑記憶輸入範圍，容易少一頁、多一頁，或把不該分享的附錄一起輸出。',
      en: 'Long reports may contain printed page numbers and viewer indexes, with covers and inserts making “page 10” ambiguous. Guessing a range can omit a page, include an extra one, or expose an appendix that should not be shared.',
    },
    whoShouldUse: {
      zh: '適合學生交作業、行政人員寄送附件、研究者整理章節、教師分享講義與需要從 PDF 取出指定頁面的任何人。',
      en: 'Useful for students submitting assignments, administrators sending attachments, researchers extracting chapters, and teachers sharing selected handouts.',
    },
    explanation: [
      {
        zh: '先確認工具使用的頁碼規則。檢視器顯示的是第幾張紙、PDF 內的印刷頁碼，還是從 1 開始的檔案索引？打開縮圖並寫下第一張與最後一張的可辨識標題，讓範圍有內容線索，不只是一串數字。',
        en: 'Confirm the tool’s page-number convention first. Is it the sheet count, the printed number inside the PDF, or a file index starting at one? Use thumbnails and write the first and last recognizable headings so a range has content context, not only numbers.',
      },
      {
        zh: '把輸出目標拆成任務：例如第 3–8 頁給同學、第 12 頁留作封面、第 20–25 頁交給審閱者。每個任務使用清楚檔名，避免下載後出現多個 `split.pdf` 而無法辨識。',
        en: 'Split the output by purpose: pages 3–8 for a classmate, page 12 as a cover, and pages 20–25 for a reviewer. Give each purpose a clear filename so several `split.pdf` downloads are not confused.',
      },
      {
        zh: '多個區段最好先列成表格再操作，並標記是否要保留原始順序。若需要奇數或偶數頁，先確認這裡指檔案索引的奇偶，而不是頁面上印出的數字；封面與插頁可能讓兩者不同。',
        en: 'List several ranges in a small table and mark whether source order must stay intact. For odd or even pages, confirm that the selection uses file indexes rather than printed numbers; covers and inserts can differ.',
      },
      {
        zh: '分割不應取代原檔備份。本站工具會在瀏覽器中處理檔案並提供下載，但下載檔仍要依共用裝置政策管理；不要在尚未驗收前刪除原始 PDF，也不要把檔名當作內容正確的證明。',
        en: 'Splitting should not replace the original backup. The site tool processes the file in the browser and offers a download, but follow shared-device cleanup policy; do not delete the source before verification or treat a filename as proof of content.',
      },
      {
        zh: '驗收至少包含輸出檔案能否開啟、頁數是否符合、第一與最後一頁是否正確，以及中間一頁是否仍有文字、圖片、連結或表格。PDF.js 的文件可作為瀏覽器解析概念參考，但不保證所有檔案的特殊字型或註解都能以相同方式呈現。',
        en: 'Verify that each output opens, has the expected count, starts and ends correctly, and keeps text, images, links, or tables in a middle page. PDF.js documents browser parsing concepts, but unusual fonts or annotations may render differently across files.',
      },
      {
        zh: '多個區段要分別命名並記錄原始頁碼，若印刷頁碼與 PDF 索引不同，交付說明要同時標示兩者。',
        en: 'Name separate ranges with their source pages, such as `proposal-p03-05`, so recipients do not have to guess. If printed page numbers differ from the PDF index, document both before splitting and repeat the mapping in the delivery note.',
      },
    ],
    steps: [
      { zh: '複製並保留原始 PDF，記下檔名、總頁數與用途。', en: 'Keep a copy of the original and record its filename, total pages, and purpose.' },
      { zh: '用縮圖核對工具頁碼與 PDF 內頁碼的差異。', en: 'Use thumbnails to compare tool indexes with printed PDF numbers.' },
      { zh: '把每個輸出任務寫成連續範圍或奇偶規則。', en: 'Write each output as a range or an odd/even rule.' },
      { zh: '在分割 PDF 工具中逐項輸入並使用可辨識的檔名。', en: 'Enter each selection in the split-PDF tool with an identifiable filename.' },
      { zh: '下載後開啟檔案，核對頁數、首尾頁與一頁中段內容。', en: 'Open each download and check count, first and last pages, and one middle page.' },
      { zh: '在確認收件人與權限後才分享，並依政策清理暫存檔。', en: 'Share only after checking recipients and permissions, then clean temporary files by policy.' },
    ],
    example: {
      zh: '研究報告有 48 頁，前 4 頁是封面與目錄。作者要寄出方法章第 15–22 頁，先在縮圖確認這對應檔案索引 15–22，再以 `method-15-22.pdf` 輸出。下載後檢查 8 頁、首尾標題與第 18 頁表格，確認沒有把附錄一起寄出。',
      en: 'A research report has 48 pages, including a four-page cover and contents section. The author needs methods pages 15–22, checks thumbnails to confirm those file indexes, and exports `method-15-22.pdf`. The eight-page file is opened and its headings and page-18 table are checked before sharing.',
    },
    commonMistakes: [
      { zh: '把 PDF 內印刷頁碼當成工具索引，導致整段偏移。', en: 'Confusing printed page numbers with the tool index and shifting the range.' },
      { zh: '一次輸出多個檔案卻都使用相同預設檔名。', en: 'Exporting several files with the same default filename.' },
      { zh: '驗收只看檔案能開啟，沒有核對頁數與首尾內容。', en: 'Checking that a file opens but not its count or boundary pages.' },
      { zh: '在確認輸出前刪除原始 PDF，失去重新擷取的依據。', en: 'Deleting the original before verifying the outputs.' },
      { zh: '把奇偶頁規則套到印刷頁碼，忽略封面與插頁。', en: 'Applying odd/even rules to printed numbers while ignoring inserts.' },
    ],
    faq: [
      { question: { zh: 'PDF 分割的頁碼從 0 還是 1 開始？', en: 'Does PDF splitting start at page 0 or 1?' }, answer: { zh: '要看工具的介面規則，常見是從 1 開始；仍應用縮圖核對第一頁，並用首尾標題驗證，不要只靠習慣猜測。', en: 'It depends on the interface, though one-based indexes are common. Confirm the first thumbnail and use boundary headings instead of relying on habit.' } },
      { question: { zh: '分割 PDF 會改變原始檔嗎？', en: 'Does splitting change the original PDF?' }, answer: { zh: '瀏覽器工具通常產生新的下載檔，但仍應保留原檔並在交付前檢查輸出。實際行為以工具當下說明與你的檔案驗收為準。', en: 'A browser tool typically creates a new download, but keep the original and verify the output before delivery. Follow the tool’s current behavior and your own acceptance check.' } },
      { question: { zh: '可以一次輸入多個頁碼範圍嗎？', en: 'Can I enter several page ranges at once?' }, answer: { zh: '若工具介面支援，可以；先把每段用途與檔名寫清楚，下載後分別核對頁數和首尾內容，避免把多段混成一個不易追蹤的檔案。', en: 'If the interface supports it, yes. Document each purpose and filename, then verify each file separately so ranges do not become one untraceable output.' } },
    ],
    cta: {
      zh: '用分割 PDF 工具前先核對縮圖與頁碼規則，下載後檢查頁數和內容，再安全分享指定頁面。',
      en: 'Check thumbnails and page rules before splitting, then verify count and content before sharing selected pages.',
    },
    updatedAt: '2026-09-03',
    noFaqSchema: true,
  },
  {
    id: 'merge-pdf-reading-order-checklist-guide',
    locales: ['zh', 'en'],
    slug: 'merge-pdf-reading-order-checklist-guide',
    title: {
      zh: '合併 PDF 閱讀順序與檔案驗收指南',
      en: 'Merged PDF Reading Order and Acceptance Checklist',
    },
    metaTitle: {
      zh: '合併 PDF 後順序錯了？檔案閱讀與交付檢查表',
      en: 'Merged PDF Order: Reading Checklist',
    },
    metaDescription: {
      zh: '合併多個 PDF 前先決定檔案順序、封面與版本，完成後檢查頁面連續性、方向、書籤、連結與檔案大小，降低交付錯檔或漏章風險，讓收件人能直接閱讀。',
      en: 'Plan PDF file order, covers, and versions before merging, then check continuity, orientation, bookmarks, links, and file size before delivery.',
    },
    h1: {
      zh: '合併 PDF 後怎麼確認閱讀順序：交付前完整驗收清單',
      en: 'How to Check Reading Order After Merging PDFs',
    },
    category: { zh: 'PDF 工作流程', en: 'PDF workflows' },
    priority: 44,
    searchIntent: {
      zh: '使用者已把多個 PDF 合成一份，想確認章節順序、頁面方向、版本與可讀性，避免交付一份看似完成但無法順利閱讀的檔案。',
      en: 'A user merged several PDFs and needs to verify chapter order, orientation, versions, and readability before delivering the combined file.',
    },
    targetKeywords: [
      { zh: '合併 PDF 順序檢查', en: 'check merged PDF order' },
      { zh: 'PDF 合併後驗收', en: 'merged PDF acceptance checklist' },
      { zh: 'PDF 章節順序錯誤', en: 'merged PDF chapters out of order' },
    ],
    relatedToolIds: ['merge-pdf', 'pdf-page-reorder', 'pdf-compressor'],
    relatedGuideIds: ['merge-pdf-page-size-orientation-guide', 'split-pdf-page-range-planning-guide', 'merge-pdf-private-guide'],
    relatedWorkflowIds: ['office-document-toolkit'],
    summary: {
      zh: '合併 PDF 的正確順序來自一份可追溯的檔案清單，而不是上傳區的偶然排列。合併後要用章節、頁面方向與連結做抽查，才能放心交付。',
      en: 'Correct merged-PDF order comes from a traceable file list, not an accidental upload arrangement. Sample chapters, orientation, and links after merging before delivery.',
    },
    problem: {
      zh: '資料夾中的檔名可能混用版本、日期或語言，拖曳上傳後順序又不容易察覺。結果是封面在中間、舊版頁面混進新版、橫頁旋轉錯誤，收件人必須自己猜讀法。',
      en: 'Filenames may mix versions, dates, and languages, while upload order can be hard to notice. A cover ends up in the middle, an old page mixes with a new one, or landscape pages rotate incorrectly.',
    },
    whoShouldUse: {
      zh: '適合整理報告、課程講義、投標文件、會議資料、研究附件與任何需要把多份 PDF 交付成單一檔案的使用者。',
      en: 'Useful for reports, course handouts, proposals, meeting packets, research appendices, and any delivery that combines several PDFs into one.',
    },
    explanation: [
      {
        zh: '合併前先建立來源清單，包含順序、檔名、版本、頁數與用途。若檔名不可靠，打開每份 PDF 的第一頁確認標題；檔案系統的字母排序不等於讀者需要的章節順序。',
        en: 'Create a source list with order, filename, version, page count, and purpose before merging. If names are unreliable, open each first page; alphabetical order is not the reader’s chapter order.',
      },
      {
        zh: '封面、摘要與附錄要先決定位置，並把它們當作正式章節記錄。不要只在合併後靠拖曳補救，因為重排可能連帶影響頁面方向與版本追蹤。',
        en: 'Decide where covers, abstracts, and appendices belong and record them as formal sections. Do not rely on post-merge dragging, which can obscure orientation and version tracking.',
      },
      {
        zh: '混合 A4／Letter 或橫直頁時，先採用與交付場景相符的策略，再抽查實際列印或螢幕閱讀。既有紙張尺寸指南與 ISO 216 可作為尺寸參考，但不能取代對你這份檔案的檢查。',
        en: 'For mixed A4/Letter or portrait/landscape pages, choose a strategy for the delivery context and proof real print or screen viewing. The existing paper-size guide and ISO 216 are references, not substitutes for checking your file.',
      },
      {
        zh: '合併後至少檢查第一頁、每個章節交界、最後一頁與一個含表格或連結的頁面。檔案能開啟只代表容器可讀，不代表順序、超連結或書籤仍符合用途；若工具不保留某種書籤，應在交付說明中明白標示。',
        en: 'After merging, check the first page, every chapter boundary, the last page, and a page with a table or link. Opening successfully proves only that the container is readable; order, links, and bookmarks may differ. If the tool does not preserve a bookmark type, say so in delivery notes.',
      },
      {
        zh: '交付前用清楚的新檔名與版本日期保存，並保留來源清單。若檔案過大，再使用 PDF 壓縮工具，但壓縮後要重做順序、圖片清晰度與連結抽查；不要把壓縮當成免費的品質保證。',
        en: 'Save the delivery with a clear filename and version date while keeping the source list. If it is too large, compress it and repeat order, image clarity, and link checks; compression is not a free quality guarantee.',
      },
      {
        zh: '若檔案由不同部門提供，約定檔名與頁碼規則並記錄每次替換來源，避免新封面混入舊章節。',
        en: 'When several teams contribute, agree on one page and filename convention and record every replaced source. This prevents a new cover or appendix from shipping with an old chapter still inside.',
      },
      {
        zh: '驗收表記錄順序、頁數、方向、書籤、連結與檔案大小；不適用項目標記 N/A 而不是留白。',
        en: 'Use a checklist for order, count, orientation, bookmarks, links, and file size. Mark an item N/A when it does not apply so the next reviewer can distinguish an intentional boundary from an unchecked task.',
      },
    ],
    steps: [
      { zh: '建立來源清單，記下每份 PDF 的版本、頁數與預期位置。', en: 'List each source PDF with version, page count, and intended position.' },
      { zh: '依清單順序上傳合併 PDF，完成後立即保存版本檔名。', en: 'Upload in list order, then immediately save a versioned output filename.' },
      { zh: '檢查封面、章節交界、附錄與最後一頁是否連續。', en: 'Check the cover, chapter boundaries, appendices, and final page for continuity.' },
      { zh: '抽查橫直方向、紙張尺寸、表格、圖片與至少一個連結。', en: 'Sample orientation, page size, tables, images, and at least one link.' },
      { zh: '若需壓縮或重排，記錄動作並在輸出檔上重做驗收。', en: 'If compressing or reordering, record it and repeat acceptance on the output.' },
      { zh: '把合併檔、來源清單與交付版本一起保存，必要時清理暫存檔。', en: 'Store the merged file with its source list and delivery version, then clean temporary files as needed.' },
    ],
    example: {
      zh: '團隊要交付年度報告，來源包括封面、執行摘要、三份部門報告和附錄。合併前先列出版本與頁數，完成後檢查五個章節交界、兩頁橫向圖表和附錄連結；發現第二份部門報告是舊版，立即替換後重新合併，而不是在交付郵件中補充說明。',
      en: 'A team delivers an annual report built from a cover, executive summary, three department reports, and an appendix. It records versions and counts, checks five boundaries, two landscape charts, and an appendix link, then replaces an outdated department report and merges again before delivery.',
    },
    commonMistakes: [
      { zh: '直接依資料夾或上傳順序合併，沒有來源清單。', en: 'Merging by folder or upload order without a source list.' },
      { zh: '只看總頁數，沒有檢查章節交界與版本。', en: 'Checking total pages but not chapter boundaries or versions.' },
      { zh: '混合橫直頁後只在檢視器看一眼，沒有測列印或實際閱讀。', en: 'Glancing at mixed orientations in a viewer without testing the delivery context.' },
      { zh: '壓縮後沿用原本的驗收結果，沒有重新抽查圖片與連結。', en: 'Reusing pre-compression checks without sampling images and links again.' },
      { zh: '把工具未保留的書籤或連結功能當成一定存在。', en: 'Assuming bookmarks or links are preserved when the tool may not support them.' },
    ],
    faq: [
      { question: { zh: '合併 PDF 後頁面順序可以再改嗎？', en: 'Can I change page order after merging PDFs?' }, answer: { zh: '可以用 PDF 頁面重排工具調整，但要重新檢查章節交界、頁碼、方向與連結。若來源版本改變，最好回到清單重新合併並留下新版本。', en: 'Yes, with a PDF page-reorder tool, but recheck boundaries, numbering, orientation, and links. If a source version changed, re-merge from the list and create a new version.' } },
      { question: { zh: '合併 PDF 後書籤一定會保留嗎？', en: 'Are bookmarks always preserved after merging?' }, answer: { zh: '不一定，取決於來源檔與工具實作。把書籤視為需要驗收的功能；若收件人依賴導覽，請在交付前實際點選或提供章節頁。', en: 'Not always; it depends on the source files and tool implementation. Treat bookmarks as an acceptance item and click them or provide a contents page when navigation matters.' } },
      { question: { zh: '合併 PDF 檔案太大怎麼辦？', en: 'What if the merged PDF is too large?' }, answer: { zh: '先確認是否真的需要所有頁面，再考慮壓縮或分割交付。壓縮後要重測文字、圖片、連結與檔案大小，不能只看檔案變小。', en: 'Confirm that every page is needed, then consider compression or split delivery. After compression, retest text, images, links, and size rather than checking only that it became smaller.' } },
    ],
    cta: {
      zh: '用合併 PDF 工具前先列出來源順序與版本，完成後逐段驗收，再交付一份可追溯的檔案。',
      en: 'List source order and versions before merging, then verify each boundary before delivering a traceable PDF.',
    },
    updatedAt: '2026-09-03',
    noFaqSchema: true,
  },
  {
    id: 'pdf-to-image-background-contrast-guide',
    locales: ['zh', 'en'],
    slug: 'pdf-to-image-background-contrast-guide',
    title: {
      zh: 'PDF 轉圖片背景與對比檢查指南',
      en: 'PDF-to-Image Background and Contrast Guide',
    },
    metaTitle: {
      zh: 'PDF 轉圖片背景變黑或太淡？對比與閱讀檢查',
      en: 'PDF-to-Image Background Too Dark? Contrast Checklist',
    },
    metaDescription: {
      zh: 'PDF 轉成 JPG 或 PNG 後若背景變黑、文字變淡或圖表不清，先分辨原稿、透明度與渲染差異，再用實際螢幕和列印樣張檢查對比與可讀性，避免直接交付失真的圖片。',
      en: 'If a PDF-to-JPG or PNG export has a dark background or faint text, separate source, transparency, and rendering causes, then proof contrast on screen and in print.',
    },
    h1: {
      zh: 'PDF 轉圖片後背景與對比異常：從原因到驗收',
      en: 'PDF-to-Image Background and Contrast Problems: Diagnose and Verify',
    },
    category: { zh: 'PDF 工作流程', en: 'PDF workflows' },
    priority: 45,
    searchIntent: {
      zh: '使用者將 PDF 轉成圖片後發現背景、透明區或文字對比異常，想找出是原始檔、輸出格式還是檢視環境造成，並確認成品可讀。',
      en: 'A user exported a PDF as images and sees unexpected backgrounds or contrast, seeking to distinguish source, format, and viewing causes before delivery.',
    },
    targetKeywords: [
      { zh: 'PDF 轉圖片背景黑色', en: 'PDF to image black background' },
      { zh: 'PDF 轉 JPG 文字變淡', en: 'PDF to JPG faint text' },
      { zh: 'PDF 圖片對比檢查', en: 'check PDF image contrast' },
    ],
    relatedToolIds: ['pdf-to-image', 'image-compressor', 'image-resizer'],
    relatedGuideIds: ['pdf-to-image-resolution-guide', 'pdf-to-jpg-vs-png', 'pdf-to-image-multipage-download-guide'],
    relatedWorkflowIds: ['office-document-toolkit'],
    summary: {
      zh: '轉檔後的背景與對比問題，可能來自原 PDF 的透明物件、渲染器的背景處理或後續壓縮。先分層診斷，再用目標裝置驗收，不能只看一張縮圖。',
      en: 'Background and contrast issues can come from transparent objects in the source, renderer behavior, or later compression. Diagnose each layer and proof on the target device instead of trusting one thumbnail.',
    },
    problem: {
      zh: '同一份 PDF 在閱讀器中正常，轉成 JPG 後卻出現黑底、灰文字或白色標誌消失；PNG 在某個簡報軟體裡又顯示不同。若直接交付，收件人可能無法閱讀，卻很難從檔名看出原因。',
      en: 'A PDF may look normal in a viewer but become black-backed or low-contrast as a JPG; a PNG may look different in presentation software. A filename cannot reveal these rendering differences before delivery.',
    },
    whoShouldUse: {
      zh: '適合把報告、表單、圖表、投影片或含透明圖形的 PDF 轉成圖片，用於簡報、社群、列印與上傳平台的使用者。',
      en: 'Useful for people converting reports, forms, charts, slides, or transparent graphics to images for presentations, social posts, print, or uploads.',
    },
    explanation: [
      {
        zh: '先用原始 PDF 的閱讀器與轉出圖片並排比較同一頁。檢查背景是否真的存在於原稿、透明物件是否依賴閱讀器合成，以及問題只發生在某個檢視器。這一步能把「轉檔錯誤」與「顯示器或軟體差異」分開。',
        en: 'Compare the source PDF and exported image side by side on the same page. Check whether the background is in the source, whether transparency depends on viewer compositing, and whether only one viewer shows the issue. This separates conversion from display differences.',
      },
      {
        zh: 'JPG 會把畫面合成為不透明像素，適合照片但不保留透明區；PNG 能保留較多圖形細節，但不同應用程式仍可能用自己的背景顯示。不要把「檔案有透明通道」誤當成所有平台都會呈現透明。',
        en: 'JPG flattens the page into opaque pixels and suits photos, while PNG retains more graphic detail; applications may still display transparency against their own background. An alpha channel is not a promise that every platform will show it identically.',
      },
      {
        zh: '以文字、細線、條碼與圖表做對比抽查，而不是只看大面積照片。若背景色接近文字色，縮小或投影時更容易失去層次；可先回到 PDF 修正色彩，再重新轉出，而不是在低品質 JPG 上反覆加深。',
        en: 'Sample text, fine lines, barcodes, and charts rather than only large photos. Similar background and text colors lose separation when scaled or projected; fix the source PDF and re-export instead of repeatedly darkening a low-quality JPG.',
      },
      {
        zh: '輸出尺寸與對比是兩個不同問題。解析度指南處理像素與用途；本頁處理背景與明暗。Adobe Acrobat 的 PDF 最佳化說明可作為影像取樣與壓縮的參考，但實際可讀性仍要在目標螢幕與紙張上驗收。',
        en: 'Output dimensions and contrast are separate decisions. The resolution guide covers pixels and use; this guide covers backgrounds and lightness. Adobe Acrobat’s optimization guidance is a reference for sampling and compression, but readability still needs target-screen and paper proofing.',
      },
      {
        zh: '若只是某一頁異常，保留原檔、頁碼與軟體版本，並用另一個檢視器重現。工具在瀏覽器端產生圖片時，檔案格式、瀏覽器與來源 PDF 的特殊效果都可能影響結果；記錄條件比宣稱「一定支援透明」更可靠。',
        en: 'If only one page is affected, keep the source, page number, and software version and reproduce it in another viewer. Browser-side rendering can vary with format, browser, and special PDF effects; record conditions instead of promising universal transparency support.',
      },
      {
        zh: '對比驗收要設定門檻，例如手機寬度仍可讀、條碼可掃描、投影時圖例不融入背景，並把門檻寫入交付單。',
        en: 'Set explicit contrast thresholds, such as readable body text at phone width, a scannable barcode, and a legend that stays distinct on a projector. Put them in the delivery record so future exports are judged consistently.',
      },
    ],
    steps: [
      { zh: '保留原始 PDF，挑一頁包含文字、圖表或透明圖形作對照。', en: 'Keep the source PDF and choose a page with text, a chart, or transparency for comparison.' },
      { zh: '在原閱讀器與 PDF 轉圖片工具中並排查看同一頁。', en: 'View the same page side by side in the source reader and the PDF-to-image tool.' },
      { zh: '分別輸出 PNG 與 JPG，記錄背景、文字與檔案大小差異。', en: 'Export PNG and JPG separately and record background, text, and size differences.' },
      { zh: '在目標瀏覽器、簡報或手機上檢查細字、線條、條碼與圖表。', en: 'Check small text, lines, barcodes, and charts in the target browser, presentation app, or phone.' },
      { zh: '若需壓縮或縮放，完成後重新檢查對比與邊緣，不沿用舊結果。', en: 'After compression or resizing, recheck contrast and edges instead of reusing old results.' },
      { zh: '在交付紀錄中寫下格式、尺寸、檢視器與已知限制。', en: 'Record format, dimensions, viewer, and known limits in the delivery notes.' },
    ],
    example: {
      zh: '公司手冊的白色標誌位於深藍色區塊。轉成 JPG 後在白色網頁背景看似消失；團隊回到 PDF 確認標誌本來就使用透明區，改用有明確背景的 PNG 版本，再在簡報與手機上檢查文字與條碼，才上傳給客戶。',
      en: 'A company handbook has a white logo over a navy panel. After JPG export it appears to vanish on a white webpage. The team confirms the source uses transparency, creates a PNG with an intentional background, and checks text and barcodes in a presentation and phone before delivery.',
    },
    commonMistakes: [
      { zh: '只在原 PDF 閱讀器看正常，就假設轉出圖片也相同。', en: 'Assuming the image matches because the source PDF looks correct in one reader.' },
      { zh: '把 JPG 與 PNG 的透明處理當成完全一樣。', en: 'Treating JPG and PNG transparency behavior as identical.' },
      { zh: '只檢查照片，不檢查細字、條碼、圖表與線條。', en: 'Checking photos but not small text, barcodes, charts, or fine lines.' },
      { zh: '壓縮或縮放後沿用原本的對比驗收。', en: 'Reusing contrast checks after compression or resizing.' },
      { zh: '遇到單頁異常就刪除原檔，沒有保存重現條件。', en: 'Deleting the source when one page fails and keeping no reproduction conditions.' },
    ],
    faq: [
      { question: { zh: '為什麼 PDF 轉 JPG 後背景變黑？', en: 'Why did the background turn black after PDF-to-JPG export?' }, answer: { zh: '可能是透明物件被不透明背景合成、原稿本身含深色底，或不同渲染器處理方式不同。把原 PDF、PNG 與 JPG 同頁比較，並在目標軟體重現後再決定修正方式。', en: 'Transparency may have been flattened, the source may contain a dark background, or renderers may differ. Compare the source, PNG, and JPG on one page and reproduce it in the target software before fixing.' } },
      { question: { zh: 'PDF 轉圖片應該選 PNG 還是 JPG？', en: 'Should I choose PNG or JPG for PDF images?' }, answer: { zh: '含文字、線條、圖表或透明需求時通常先試 PNG；照片型頁面可比較 JPG 的大小與品質。最後仍要用交付平台實測，因為平台可能重新壓縮。', en: 'Start with PNG for text, lines, charts, or transparency; compare JPG for photo-heavy pages. Test on the delivery platform because it may recompress either format.' } },
      { question: { zh: '可以在圖片工具裡直接修正 PDF 的背景嗎？', en: 'Can the image tool directly fix a PDF background?' }, answer: { zh: '轉圖工具主要負責渲染與輸出，不一定能理解原稿圖層。若問題源於原 PDF，回到原始檔修正背景或透明設定，再重新輸出通常更可追蹤。', en: 'A converter mainly renders and exports; it may not understand source layers. If the source causes the issue, fix its background or transparency and export again for a traceable result.' } },
    ],
    cta: {
      zh: '用 PDF 轉圖片工具輸出 PNG／JPG 對照，從原稿到目標裝置逐層檢查背景、文字與圖表對比。',
      en: 'Export PNG and JPG comparisons, then check backgrounds, text, and charts from source PDF to target device.',
    },
    updatedAt: '2026-09-03',
    noFaqSchema: true,
  },
  {
    id: 'pdf-to-image-raster-text-search-guide',
    locales: ['zh', 'en'],
    slug: 'pdf-to-image-raster-text-search-guide',
    title: {
      zh: 'PDF 轉圖片後文字搜尋與複製限制指南',
      en: 'PDF-to-Image Rasterization and Text Search Guide',
    },
    metaTitle: {
      zh: 'PDF 轉圖片後文字不能搜尋？點陣化前要知道的事',
      en: 'PDF-to-Image: Why Text Search Stops Working',
    },
    metaDescription: {
      zh: 'PDF 轉成圖片會把文字變成像素，可能失去搜尋、複製、超連結與書籤；先決定是否需要可搜尋原檔，再用圖片與 PDF 雙版本交付並驗證，避免收件人無法查找內容。',
      en: 'Converting PDF pages to images can remove searchable text, links, and bookmarks. Keep the original when search matters, then verify both versions before delivery.',
    },
    h1: {
      zh: 'PDF 轉圖片後文字不能搜尋：點陣化的功能取捨與交付方法',
      en: 'PDF-to-Image Rasterization: Search, Copy, and Delivery Trade-offs',
    },
    category: { zh: 'PDF 工作流程', en: 'PDF workflows' },
    priority: 46,
    searchIntent: {
      zh: '使用者把 PDF 轉成圖片後發現文字不能搜尋或複製，想了解這是正常的點陣化結果，並規劃兼顧視覺與可用性的交付版本。',
      en: 'A user converted PDF pages to images and lost text search or copying, seeking to understand rasterization and choose a usable delivery format.',
    },
    targetKeywords: [
      { zh: 'PDF 轉圖片文字不能搜尋', en: 'PDF image text not searchable' },
      { zh: 'PDF 點陣化限制', en: 'PDF rasterization limitations' },
      { zh: 'PDF 圖片與原檔交付', en: 'deliver PDF and image versions' },
    ],
    relatedToolIds: ['pdf-to-image', 'images-to-pdf', 'pdf-compressor'],
    relatedGuideIds: ['pdf-to-image-resolution-guide', 'pdf-to-image-background-contrast-guide', 'pdf-to-image-multipage-download-guide'],
    relatedWorkflowIds: ['office-document-toolkit'],
    summary: {
      zh: 'PDF 轉圖片是渲染，不是文字格式轉換；每一頁會成為像素圖。視覺版方便放入簡報或社群，但搜尋、複製、連結與書籤通常要保留原 PDF 才能使用。',
      en: 'PDF-to-image is rendering, not text conversion: each page becomes pixels. Images help presentations and social posts, while search, copying, links, and bookmarks usually require the original PDF.',
    },
    problem: {
      zh: '使用者為了上傳限制把 PDF 轉成 JPG，交付後才發現收件人無法搜尋關鍵字、複製引用或點開原本的連結。重新 OCR 也可能產生辨識錯字，且無法自動恢復書籤與表單。',
      en: 'Someone converts a PDF to JPG to meet an upload limit, then discovers recipients cannot search, copy citations, or follow links. OCR may add recognition errors and does not automatically restore bookmarks or forms.',
    },
    whoShouldUse: {
      zh: '適合製作簡報圖片、社群貼文、縮圖、列印樣張，以及必須同時提供可視版本與可搜尋原始文件的團隊。',
      en: 'Useful for presentation images, social posts, thumbnails, print proofs, and teams that need both a visual version and a searchable source document.',
    },
    explanation: [
      {
        zh: '把「看起來一樣」與「功能一樣」分開。圖片可以保留頁面外觀，但不等於保留文字層、超連結、表單、註解或書籤；在交付規格中先寫清楚收件人需要的是視覺素材還是可操作文件。',
        en: 'Separate visual similarity from functional equivalence. An image can preserve appearance without text layers, links, forms, annotations, or bookmarks; state whether the recipient needs a visual asset or an interactive document.',
      },
      {
        zh: '若必須把圖片重新放回 PDF，結果仍是圖片型 PDF，搜尋能力不會自動回來。可搜尋需求應保留原始 PDF，或另行建立並校對 OCR 文字層；不要把 OCR 當成無錯誤的還原。',
        en: 'Putting images back into a PDF still creates an image-only PDF; search does not return automatically. Keep the source or create and proof an OCR text layer separately instead of treating OCR as perfect restoration.',
      },
      {
        zh: '依用途保存兩種版本通常比只交付一種格式更穩：圖片版服務簡報或平台上傳，原 PDF 服務搜尋、引用、列印與存檔。檔名與資料夾要標明 `visual`、`source` 或版本日期，避免收件人拿錯檔。',
        en: 'Two versions are often safer: an image version for slides or uploads and the source PDF for search, citation, printing, and archive. Label filenames and folders with `visual`, `source`, or a version date.',
      },
      {
        zh: '檢查是否仍需保留可及性資訊。W3C WCAG 2.2 的文字替代與可操作性原則提醒我們，單純圖片可能讓輔助技術與鍵盤使用者少了內容入口；必要時附上原 PDF 或文字稿，而不是只貼一張無替代文字的圖片。',
        en: 'Check whether accessibility information must remain. WCAG 2.2 principles for text alternatives and operability warn that an image alone can remove an entry point for assistive technology and keyboard users; include the source PDF or transcript when needed.',
      },
      {
        zh: '驗收時實際嘗試搜尋、選取、複製、點擊連結與列印，而不是只比較截圖。用瀏覽器 PDF 檢視器與目標平台各測一次，記錄哪些能力屬於圖片版限制，讓交付說明可被查證。',
        en: 'For acceptance, actually search, select, copy, click links, and print instead of comparing screenshots. Test the browser PDF viewer and target platform and document which limits belong to the image version.',
      },
      {
        zh: '若原檔含表單、註解或簽名，先確認收件人需要編輯還是只查看，把「可查看」和「可操作」列為不同交付條件。',
        en: 'If the source contains forms, annotations, or signatures, confirm whether recipients must edit or only view them. List “viewable” and “operable” as separate delivery requirements because an image can block filling and assistive technology.',
      },
      {
        zh: '對需要引用的文件，交付圖片時附上頁碼與文字來源，讓讀者能回到原始 PDF，而不是事後靠 OCR 猜測。',
        en: 'For documents that will be cited, include page references and the text source alongside images so readers can return to the original PDF. This is more reliable than reconstructing quotations with OCR and keeps a visual export from pretending to be complete.',
      },
    ],
    steps: [
      { zh: '列出收件人需要的搜尋、複製、連結、列印與可及性功能。', en: 'List the search, copy, link, print, and accessibility features recipients need.' },
      { zh: '用 PDF 轉圖片工具輸出視覺版，保留帶版本的原 PDF。', en: 'Export the visual version and keep a versioned original PDF.' },
      { zh: '在兩種檔案上測試搜尋、選取文字、連結與書籤。', en: 'Test search, text selection, links, and bookmarks on both versions.' },
      { zh: '若平台只接受圖片，附上可搜尋來源或文字替代入口。', en: 'If a platform accepts only images, provide a searchable source or text alternative.' },
      { zh: '把限制、檔名、版本與用途寫入交付說明。', en: 'Document limitations, filenames, versions, and purposes in delivery notes.' },
      { zh: '平台重新壓縮或轉檔後，再抽查清晰度與可操作性。', en: 'After platform recompression or conversion, sample clarity and usability again.' },
    ],
    example: {
      zh: '設計師要把 12 頁產品手冊放入社群貼文，因此輸出每頁 PNG；同時把原 PDF 放在可搜尋的說明連結。貼文圖片驗收文字清晰，說明頁則測試搜尋型號、複製規格與點擊客服連結，兩種用途沒有互相取代。',
      en: 'A designer exports a 12-page product manual as PNGs for a social post while linking the searchable source PDF. The images are checked for legibility; the source is tested for model search, copying specs, and support links.',
    },
    commonMistakes: [
      { zh: '把圖片外觀相同誤認為文字、連結和書籤功能也相同。', en: 'Assuming identical appearance means identical text, link, and bookmark behavior.' },
      { zh: '刪掉原 PDF，交付後才發現收件人需要搜尋或複製。', en: 'Deleting the source PDF and discovering search or copy needs after delivery.' },
      { zh: '把 OCR 當成完全準確的文字還原，沒有逐頁校對。', en: 'Treating OCR as perfect restoration without page-by-page proofing.' },
      { zh: '只交付圖片，沒有提供文字替代或可及性入口。', en: 'Delivering only images without a text alternative or accessible entry.' },
      { zh: '平台重新壓縮後沿用原本的清晰度驗收。', en: 'Reusing clarity checks after the platform recompresses the images.' },
    ],
    faq: [
      { question: { zh: 'PDF 轉成 JPG 後還能搜尋文字嗎？', en: 'Can I search text after converting a PDF to JPG?' }, answer: { zh: '一般 JPG 只有像素，不能像原始 PDF 的文字層那樣搜尋或複製。若必須搜尋，保留原 PDF 或另行建立並校對 OCR 版本。', en: 'A JPG usually contains pixels, not a searchable text layer. Keep the original PDF or create and proof an OCR version when search is required.' } },
      { question: { zh: '把圖片再轉回 PDF 就能恢復搜尋嗎？', en: 'Does converting images back to PDF restore search?' }, answer: { zh: '不會自動恢復；那通常仍是圖片型 PDF。需要搜尋時要保留文字來源或建立 OCR 文字層，並檢查辨識品質。', en: 'Not automatically; it is usually still an image-only PDF. Keep the text source or create an OCR layer and check its accuracy.' } },
      { question: { zh: '交付時可以只給圖片版嗎？', en: 'Can I deliver only the image version?' }, answer: { zh: '若收件人只需要視覺素材可以，但要先確認沒有搜尋、引用、連結、列印或可及性需求。規格不確定時，同時提供圖片與原 PDF 通常更安全。', en: 'Yes when recipients need only visual assets, but confirm there is no search, citation, link, print, or accessibility need. When uncertain, provide both images and the source PDF.' } },
    ],
    cta: {
      zh: '用 PDF 轉圖片工具建立視覺版，同時保留可搜尋原檔，逐一驗收兩種格式的功能差異。',
      en: 'Create the visual version with the PDF-to-image tool, keep the searchable source, and verify the functional differences.',
    },
    updatedAt: '2026-09-03',
    noFaqSchema: true,
  },
  {
    id: 'csv-to-json-header-duplicate-column-guide',
    locales: ['zh', 'en'],
    slug: 'csv-to-json-header-duplicate-column-guide',
    title: {
      zh: 'CSV 轉 JSON 標題列與重複欄位指南',
      en: 'CSV-to-JSON Headers and Duplicate Columns Guide',
    },
    metaTitle: {
      zh: 'CSV 轉 JSON 欄位錯位？標題列與重複欄位檢查',
      en: 'CSV-to-JSON Columns Misaligned? Check Headers First',
    },
    metaDescription: {
      zh: 'CSV 轉 JSON 後欄位名稱錯位、空白或重複時，先檢查標題列、分隔符號、引號與編碼，再用少量資料驗證輸出，避免整批資料靜默錯欄、覆蓋或漏值。',
      en: 'When CSV-to-JSON fields shift or duplicate, check headers, delimiters, quotes, and encoding, then validate a small sample before converting the whole file.',
    },
    h1: {
      zh: 'CSV 轉 JSON 欄位錯位怎麼查：標題列與重複欄位驗收',
      en: 'CSV-to-JSON Column Misalignment: A Header and Sample-Check Workflow',
    },
    category: { zh: '文字與資料格式', en: 'Text and data formats' },
    priority: 47,
    searchIntent: {
      zh: '使用者將 CSV 轉成 JSON 後發現鍵名錯誤、欄位移位或重複，想知道如何從標題列與分隔規則找出原因並安全轉換。',
      en: 'A user converted CSV to JSON and found wrong keys, shifted values, or duplicate fields, seeking a safe way to diagnose headers and delimiters.',
    },
    targetKeywords: [
      { zh: 'CSV 轉 JSON 欄位錯位', en: 'CSV to JSON columns shifted' },
      { zh: 'CSV 重複欄位名稱', en: 'duplicate CSV headers' },
      { zh: 'CSV 標題列檢查', en: 'check CSV header row' },
    ],
    relatedToolIds: ['csv-to-json', 'json-formatter', 'character-counter'],
    relatedGuideIds: ['csv-utf8-bom-excel-garbled-text', 'json-error-fix-guide', 'json-to-csv-excel-guide'],
    relatedWorkflowIds: ['text-cleanup-publishing-toolkit'],
    summary: {
      zh: 'CSV 的第一列常被當成 JSON 鍵名，但分隔符號、引號與重複標題會讓整列資料錯位。先檢查小樣本與欄位數，再轉換完整檔案。',
      en: 'The first CSV row often becomes JSON keys, but delimiters, quotes, and duplicate headers can shift every value. Check a small sample and field count before converting the full file.',
    },
    problem: {
      zh: '同一份 CSV 在試算表看似正常，轉換後卻出現空鍵、`undefined`、後半欄位消失或重複鍵被覆蓋。這類錯誤常不會讓轉換程式報錯，卻會在匯入資料庫後才被發現。',
      en: 'A CSV can look fine in a spreadsheet yet produce empty keys, missing trailing fields, or overwritten duplicate keys after conversion. These issues may not throw an error and appear only after database import.',
    },
    whoShouldUse: {
      zh: '適合整理問卷、名單、產品表、交易匯出與任何要把表格資料交給 API 或程式處理的人。',
      en: 'Useful for survey exports, contact lists, product tables, transaction data, and any spreadsheet being sent to an API or program.',
    },
    explanation: [
      {
        zh: '先確認標題列是否真的在第一列。部分匯出檔前面會有報表名稱、空白列或欄位說明；轉換器若把那一列當鍵名，後續每個物件都會使用錯誤名稱。RFC 4180 將第一列視為可選的欄位名稱列，不能假設所有 CSV 都有相同結構。',
        en: 'Confirm that the header is truly the first row. Some exports include a report title, blank line, or notes; treating it as headers gives every object the wrong keys. RFC 4180 describes an optional header row, so do not assume every CSV has the same shape.',
      },
      {
        zh: '逐列計算分隔後的欄位數，並注意引號內的逗號不應切開欄位。若某列少一欄，可能是未成對引號、換行文字或錯用分號／逗號；先在小樣本定位，不要直接修改整批資料。',
        en: 'Count fields after parsing each row and remember that commas inside quotes do not split a field. A short row may come from unclosed quotes, embedded newlines, or the wrong semicolon/comma setting; locate it in a sample before bulk edits.',
      },
      {
        zh: '重複標題是資料模型問題，不只是顯示問題。JSON 物件通常不能安全表達兩個同名鍵；轉換器可能保留最後一個值、加上數字後綴，或把其中一欄捨去。先把標題改成明確且唯一，再記錄欄位對應。',
        en: 'Duplicate headers are a data-model problem, not merely a display issue. JSON objects cannot safely represent two identical keys; a converter may keep the last value, add suffixes, or drop one. Rename headers uniquely and document the mapping first.',
      },
      {
        zh: '編碼與分隔符號要分開診斷。中文亂碼多半是讀取編碼不符，欄位全部擠在一欄則常是分隔符號不符；同一份檔案可能同時有兩種問題。本站 CSV 轉 JSON 工具適合在清理後做轉換，但輸出仍應抽查。',
        en: 'Diagnose encoding separately from delimiters. Garbled Chinese often indicates a charset mismatch, while every field in one column suggests the wrong separator; both can occur together. Use the CSV-to-JSON tool after cleanup and still sample the output.',
      },
      {
        zh: '轉換後比較原 CSV 的標題、第一筆、中間一筆與最後一筆。檢查數字是否被當字串、空白是否有意義、日期是否保留原樣；不要用試算表自動格式化後的畫面當唯一真相。',
        en: 'After conversion, compare headers and the first, middle, and last records. Check numeric strings, meaningful blanks, and date text; a spreadsheet’s auto-format display is not the only source of truth.',
      },
      {
        zh: '若目的地是既有 API，先對照 schema 決定空值要保留為 null 還是省略，並把決策寫入轉換紀錄。',
        en: 'When an existing API is the destination, compare its schema before deciding whether blanks become `null` or are omitted. Record that decision so another operator can reproduce the same JSON shape.',
      },
      {
        zh: '最後再檢查標題是否含前後空白、不可見字元或不同大小寫，並保留欄位對應表。',
        en: 'Finally inspect headers for leading spaces, invisible characters, or inconsistent case. They can look identical while producing different API keys, so keep a mapping note after cleanup for later imports.',
      },
      {
        zh: '轉換前先定義欄位契約：必填鍵、可空白欄位與日期數字格式，並把清理與轉換分開記錄。',
        en: 'Define the data contract before converting: required keys, allowed blanks, and date or number formats. Keep cleanup and conversion as separate notes so import failures can be traced to structure, encoding, or downstream validation.',
      },
      {
        zh: '抽查完成後確認總筆數與欄位數，並加入含逗號、換行、引號及中文的邊界案例；把通過樣本留作回歸測試。',
        en: 'After the sample passes, compare total rows and fields and include commas, newlines, quotes, and Chinese in boundary cases. These cases often shift columns in an apparently normal CSV; keep the passing sample as a regression fixture.',
      },
      {
        zh: '匯入前再以唯讀方式保存清理後 CSV 與轉換設定，並記錄誰核對了首、中、尾資料。這份小型稽核軌跡能在下游欄位錯置時快速回到原始樣本，不必重新猜測分隔符號。',
        en: 'Before import, keep the cleaned CSV and conversion settings read-only and record who checked the first, middle, and last records. This small audit trail lets you trace a downstream shift back to the sample instead of guessing delimiter settings again.',
      },
      {
        zh: '匯入後比對一筆原始資料與 API 回應。',
        en: 'After import, compare at least one source record with the API response.',
      },
    ],
    steps: [
      { zh: '複製原始 CSV，記下預期欄位名稱與資料筆數。', en: 'Copy the source CSV and record expected headers and row count.' },
      { zh: '確認標題列位置、分隔符號、引號規則與文字編碼。', en: 'Confirm header position, delimiter, quote rules, and text encoding.' },
      { zh: '找出空白或重複標題，改成唯一且可理解的名稱。', en: 'Find blank or duplicate headers and rename them uniquely.' },
      { zh: '用少量含逗號、引號、空值與中文的列先轉換。', en: 'Convert a small sample containing commas, quotes, blanks, and Chinese text.' },
      { zh: '比較 JSON 的鍵、欄位數、首中尾資料與型別。', en: 'Compare JSON keys, field count, first/middle/last records, and types.' },
      { zh: '確認抽查無誤後再轉換完整檔案並保存版本。', en: 'Convert the full file only after the sample passes and save a version.' },
    ],
    example: {
      zh: '產品匯出檔前面多了一列報表標題，且最後兩個欄位都叫 `Status`。團隊先移除非資料列、將欄位改成 `stock_status` 與 `order_status`，用含逗號的商品描述做小樣本轉換，確認每筆仍有 8 個鍵後才處理完整檔。',
      en: 'A product export begins with a report title and ends with two columns both named `Status`. The team removes the non-data row, renames the fields to `stock_status` and `order_status`, tests a product description containing a comma, and converts the full file only after every sample has eight keys.',
    },
    commonMistakes: [
      { zh: '把報表標題或空白列誤當成 CSV 標題列。', en: 'Treating a report title or blank line as the CSV header.' },
      { zh: '看到逗號就切欄，忽略引號內的逗號與換行。', en: 'Splitting every comma and ignoring quoted commas or newlines.' },
      { zh: '保留重複鍵名，期待 JSON 自動保存兩個值。', en: 'Keeping duplicate keys and expecting JSON to preserve both values.' },
      { zh: '只看試算表畫面，不驗證轉換後的實際鍵與資料筆數。', en: 'Trusting a spreadsheet view without checking JSON keys or row count.' },
      { zh: '整批轉換後才發現編碼或分隔符號設定錯誤。', en: 'Converting the whole file before testing encoding or delimiter settings.' },
    ],
    faq: [
      { question: { zh: 'CSV 可以有重複欄位名稱嗎？', en: 'Can a CSV have duplicate column names?' }, answer: { zh: 'CSV 格式本身可能允許，但轉成 JSON 物件後同名鍵會產生覆蓋或改名問題。若欄位都重要，先改成唯一名稱並保存對應表。', en: 'The CSV text may contain them, but JSON objects can overwrite or rename duplicate keys. Rename them uniquely and keep a mapping when both fields matter.' } },
      { question: { zh: '為什麼 CSV 轉 JSON 後每筆欄位都錯一格？', en: 'Why are every JSON fields shifted by one column?' }, answer: { zh: '常見原因是標題列位置錯誤、分隔符號設定不符，或某列的引號沒有成對。先檢查原始文字與少量樣本，再修正設定。', en: 'Common causes are a wrong header row, delimiter mismatch, or unclosed quotes. Inspect the raw text and a small sample before changing settings.' } },
      { question: { zh: 'CSV 轉 JSON 會自動判斷數字和日期嗎？', en: 'Will CSV-to-JSON automatically detect numbers and dates?' }, answer: { zh: '不同工具可能把值保留為字串或嘗試轉型；不要假設結果。用代表性資料抽查型別，尤其是前導零、帳號、郵遞區號和日期。', en: 'Tools may preserve strings or coerce types differently. Sample representative values, especially leading-zero IDs, postal codes, and dates, instead of assuming.' } },
    ],
    cta: {
      zh: '用 CSV 轉 JSON 工具前先確認標題與分隔規則，先轉小樣本，再驗收完整輸出。',
      en: 'Check headers and delimiters before using the CSV-to-JSON tool, test a sample, then accept the full output.',
    },
    updatedAt: '2026-09-03',
    noFaqSchema: true,
  },
  {
    id: 'json-formatter-trailing-comma-error-guide',
    locales: ['zh', 'en'],
    slug: 'json-formatter-trailing-comma-error-guide',
    title: {
      zh: 'JSON 尾端逗號錯誤排查指南',
      en: 'JSON Trailing-Comma Error Troubleshooting Guide',
    },
    metaTitle: {
      zh: 'JSON 為什麼解析失敗？尾端逗號與引號檢查',
      en: 'JSON Parse Error: Find Trailing Commas',
    },
    metaDescription: {
      zh: 'JSON 解析失敗時，先檢查物件或陣列最後一項的尾端逗號、雙引號、括號與控制字元，再用格式化工具定位行列，避免只刪一個逗號卻留下更深層語法錯誤。',
      en: 'When JSON parsing fails, check trailing commas, double quotes, brackets, and control characters, then use a formatter to locate the exact line instead of guessing.',
    },
    h1: {
      zh: 'JSON 尾端逗號與解析錯誤：用格式化工具定位問題',
      en: 'JSON Trailing Commas and Parse Errors: Locate the Real Problem',
    },
    category: { zh: '文字與資料格式', en: 'Text and data formats' },
    priority: 48,
    searchIntent: {
      zh: '使用者收到 JSON parse error，懷疑是最後多了一個逗號，想用線上格式化工具確認行列、引號、括號與資料值是否合法。',
      en: 'A user sees a JSON parse error and suspects a trailing comma, wanting a formatter to identify the line, brackets, quotes, and values that violate JSON syntax.',
    },
    targetKeywords: [
      { zh: 'JSON 尾端逗號錯誤', en: 'JSON trailing comma error' },
      { zh: 'JSON parse error 怎麼修', en: 'how to fix JSON parse error' },
      { zh: 'JSON 格式化定位錯誤', en: 'format JSON to find error' },
    ],
    relatedToolIds: ['json-formatter', 'csv-to-json', 'json-to-csv'],
    relatedGuideIds: ['json-error-fix-guide', 'csv-to-json-conversion-guide', 'csv-to-json-header-duplicate-column-guide'],
    relatedWorkflowIds: ['text-cleanup-publishing-toolkit'],
    summary: {
      zh: '標準 JSON 不允許物件或陣列最後一項後面再放逗號；但錯誤也可能來自單引號、未跳脫換行或括號不成對。格式化工具可縮小範圍，不能代替理解資料。',
      en: 'Standard JSON does not allow a comma after the last object or array item, but single quotes, unescaped newlines, and mismatched brackets cause similar errors. A formatter narrows the location but does not replace data understanding.',
    },
    problem: {
      zh: '設定檔在 JavaScript 中能執行，貼到 API 或其他語言卻解析失敗；錯誤訊息指向下一行，讓人誤刪正確內容。這通常是把寬鬆的程式語法與嚴格的 JSON 格式混在一起。',
      en: 'A configuration runs in JavaScript but fails in an API or another language; the error points to the next line, tempting someone to delete valid content. The root is often mixing permissive code syntax with strict JSON.',
    },
    whoShouldUse: {
      zh: '適合處理 API 回應、設定檔、匯入資料與需要在不同程式語言間交換 JSON 的開發者、分析師與內容編輯。',
      en: 'Useful for developers, analysts, and editors handling API responses, config files, imports, and JSON exchanged between languages.',
    },
    explanation: [
      {
        zh: '先把 JSON 複製到格式化工具，保留原始檔不直接覆蓋。RFC 8259 定義 JSON 語法；尾端逗號不是標準 JSON 的一部分，即使某些語言或編輯器會寬容接受，也不代表 API 或資料庫會接受。',
        en: 'Paste a copy into the formatter and keep the original untouched. RFC 8259 defines JSON syntax; trailing commas are not standard JSON, even if a language or editor accepts them permissively.',
      },
      {
        zh: '錯誤位置常落在真正問題的下一個 token。看到「unexpected character」時，回看前一個逗號、引號或括號；不要只刪掉錯誤訊息指出的那一行。格式化成功後，再用語法高亮檢查鍵和值是否仍屬於預期結構。',
        en: 'The reported location may be the token after the real problem. When you see an unexpected character, inspect the preceding comma, quote, or bracket instead of deleting the named line. After formatting, confirm keys and values still have the intended structure.',
      },
      {
        zh: 'JSON 的字串要使用雙引號，換行、反斜線與控制字元需要正確跳脫。註解、`undefined`、`NaN` 與函式不是標準 JSON 值；若來源是程式碼，先序列化或移除程式專用語法。',
        en: 'JSON strings use double quotes, and newlines, backslashes, and control characters need escaping. Comments, `undefined`, `NaN`, and functions are not standard JSON values; serialize or remove code-only syntax from the source.',
      },
      {
        zh: '格式化只是語法檢查，不會確認欄位名稱、數字單位或個資是否正確。通過後仍要對照 API schema、資料筆數與必要欄位；若 JSON 要交給別人，附上版本和來源。',
        en: 'Formatting checks syntax, not field meaning, units, or personal data. After it passes, compare the API schema, row count, and required fields, and include a source and version when sharing JSON.',
      },
      {
        zh: '若檔案很大，先縮小到能重現的區段，但不要只保留錯誤行而破壞上下文。修正後用完整檔再驗證一次，並以唯讀副本保存修正前後差異，方便回溯。',
        en: 'For a large file, reduce it to a reproducible section without losing context. Validate the complete file after fixing and keep read-only before/after copies for traceability.',
      },
      {
        zh: '修正後用實際 API 或匯入器做少量整合測試，保存回應與測試資料版本，以區分語法和型別問題。',
        en: 'After syntax is fixed, run a small test through the real API staging endpoint or importer. Save the response and fixture version to separate syntax fixes from permissions, field-type, or encoding issues.',
      },
      {
        zh: '若錯誤只在某個編輯器出現，確認它是否使用 JSON5；交付標準應以真正接收資料的解析器為準。',
        en: 'If an error appears in only one editor, check whether it uses JSON5 or another permissive syntax. Let the receiving parser define the delivery standard and keep the formatted diff so the same comma is not reintroduced.',
      },
      {
        zh: '對外分享前移除測試個資與秘密值，確認跳脫後的換行與反斜線仍代表原意；格式化工具不會替你做安全審查。',
        en: 'Before sharing, remove test personal data and secrets and confirm escaped newlines and backslashes still mean what you intend. Valid JSON can still contain tokens or internal paths; a formatter does not perform a security review.',
      },
      {
        zh: '最後用接收端的錯誤處理與少量真實資料做回歸測試，確認鍵名、順序依賴與數字精度未被改變，再替換正式檔。',
        en: 'Finish with a regression test using the consumer’s error handling and a small real-data fixture. Confirm keys, ordering assumptions, and numeric precision did not change; replace the production file only after it passes and keep a recoverable original.',
      },
      {
        zh: '把修正後檔案交給第二位使用者重新格式化一次，確認工具不再報錯且輸出一致，再提交正式環境。',
        en: 'Have a second operator format the corrected file once more and confirm the tool reports no error and produces consistent output before submitting it to production.',
      },
    ],
    steps: [
      { zh: '複製 JSON 並記下來源、版本與解析錯誤訊息。', en: 'Copy the JSON and record its source, version, and parse error.' },
      { zh: '用 JSON 格式化工具定位第一個語法錯誤。', en: 'Use the JSON formatter to locate the first syntax error.' },
      { zh: '從錯誤位置向前檢查尾端逗號、雙引號與括號。', en: 'Inspect the preceding comma, double quote, and bracket from that location.' },
      { zh: '移除註解、單引號、未跳脫控制字元與程式專用值。', en: 'Remove comments, single quotes, unescaped controls, and code-only values.' },
      { zh: '格式化後對照 schema、筆數與必要欄位。', en: 'After formatting, compare the schema, record count, and required fields.' },
      { zh: '用目標 API 或匯入器做一次小範圍測試，再保存完整版本。', en: 'Run a small target-API or import test, then save the complete version.' },
    ],
    example: {
      zh: 'API 設定在 JavaScript 中能讀取，但服務端回報第 18 行錯誤。格式化工具顯示第 17 行陣列最後一項後多了一個逗號；修正後又發現一個單引號字串，團隊依序改成雙引號並跳脫換行，最後用測試 endpoint 驗證必要欄位。',
      en: 'A configuration runs in JavaScript but the service rejects line 18. The formatter shows a trailing comma after the final array item on line 17; after fixing it, a single-quoted string appears. The team switches to double quotes, escapes a newline, and tests required fields on a staging endpoint.',
    },
    commonMistakes: [
      { zh: '只刪除錯誤訊息指出的行，沒有回看前一個 token。', en: 'Deleting only the named line without checking the preceding token.' },
      { zh: '把 JavaScript 物件或帶註解設定檔當成標準 JSON。', en: 'Treating a JavaScript object or commented config as standard JSON.' },
      { zh: '使用單引號、`undefined` 或未跳脫換行。', en: 'Using single quotes, `undefined`, or unescaped newlines.' },
      { zh: '格式化成功就直接交付，沒有驗證 schema 與必要欄位。', en: 'Delivering after formatting without checking schema or required fields.' },
      { zh: '直接覆蓋原始檔，失去修正前後的可追溯差異。', en: 'Overwriting the original and losing before/after traceability.' },
    ],
    faq: [
      { question: { zh: 'JSON 最後一項後面可以加逗號嗎？', en: 'Can JSON have a comma after the last item?' }, answer: { zh: '標準 JSON 不允許物件或陣列最後一項後的尾端逗號。某些程式語言接受寬鬆寫法，但跨系統交換時應移除。', en: 'Standard JSON does not allow a trailing comma after the last object or array item. Some languages accept it, but remove it for cross-system exchange.' } },
      { question: { zh: '為什麼錯誤行號通常不是問題所在？', en: 'Why is the reported line often not the real problem?' }, answer: { zh: '解析器常在讀到下一個無法理解的 token 才報錯，因此要回看前一個逗號、引號或括號。格式化工具能協助縮小範圍，但仍要理解結構。', en: 'A parser may fail only when it reaches the next unexpected token, so inspect the previous comma, quote, or bracket. A formatter narrows the range but structure still matters.' } },
      { question: { zh: 'JSON 可以寫註解嗎？', en: 'Can JSON contain comments?' }, answer: { zh: '標準 JSON 不包含註解語法。若設定工具支援 JSON5 或自訂格式，輸出給 API 前要轉成標準 JSON 並重新驗證。', en: 'Standard JSON has no comment syntax. If a config tool supports JSON5 or a custom format, convert to standard JSON before sending it to an API and validate again.' } },
    ],
    cta: {
      zh: '把 JSON 複製到格式化工具定位語法，再用目標 API 和 schema 驗收，不直接覆蓋原始檔。',
      en: 'Copy JSON into the formatter, verify syntax with the target API and schema, and keep the original file intact.',
    },
    updatedAt: '2026-09-03',
    noFaqSchema: true,
  },
  {
    id: 'image-resize-aspect-ratio-guide',
    locales: ['zh', 'en'],
    slug: 'image-resize-aspect-ratio-guide',
    title: {
      zh: '圖片調整尺寸與比例裁切指南',
      en: 'Image Resizing and Aspect-Ratio Cropping Guide',
    },
    metaTitle: {
      zh: '圖片調整尺寸不變形：比例、裁切與留白選擇',
      en: 'Resize Images Without Stretching: Crop or Pad',
    },
    metaDescription: {
      zh: '圖片要符合頭像、網站或簡報尺寸時，先決定鎖定比例、裁切或留白，再用實際寬高與焦點驗收，避免人物變形、文字被切掉或畫面留白失控，並保留可回復的原圖。',
      en: 'Fit an image to a profile, website, or slide by choosing locked ratio, crop, or padding, then verify dimensions and focal content without stretching.',
    },
    h1: {
      zh: '圖片調整尺寸不變形：比例、裁切與留白的實作流程',
      en: 'Resize Images Without Distortion: A Practical Ratio and Crop Workflow',
    },
    category: { zh: '圖片工作流程', en: 'Image workflows' },
    priority: 49,
    searchIntent: {
      zh: '使用者需要把圖片放進固定尺寸的頭像、網站卡片或簡報，想知道該鎖定比例、裁切還是加留白，並避免內容變形。',
      en: 'A user must fit an image into a fixed profile, card, or slide size and needs to choose locked scaling, cropping, or padding without distortion.',
    },
    targetKeywords: [
      { zh: '圖片調整比例不變形', en: 'resize image without distortion' },
      { zh: '圖片裁切還是留白', en: 'crop or pad image' },
      { zh: '圖片固定尺寸比例', en: 'fit image to fixed aspect ratio' },
    ],
    relatedToolIds: ['image-resizer', 'image-crop', 'image-compressor'],
    relatedGuideIds: ['resize-image-without-distortion', 'crop-vs-resize-vs-compress-image', 'image-compression-email-guide'],
    relatedWorkflowIds: ['creator-social-toolkit'],
    summary: {
      zh: '固定尺寸不代表要把原圖硬拉成同樣比例。先決定內容不能被切掉、畫面必須填滿，或可以接受留白，再用鎖定比例、裁切或 padding 完成。',
      en: 'A fixed box does not mean stretching the source. Decide whether content must stay intact, the box must be filled, or padding is acceptable, then use locked scaling, crop, or padding.',
    },
    problem: {
      zh: '把 4:3 照片直接拉成 1:1，人物臉部和圓形標誌會變形；改用自動裁切又可能切掉文字或商品。只看輸出寬高，沒有檢查焦點與邊界，往往要上傳後才發現。',
      en: 'Stretching a 4:3 photo into a square distorts faces and logos; automatic cropping may cut text or a product. Checking dimensions alone misses the focal area until the upload is already live.',
    },
    whoShouldUse: {
      zh: '適合製作社群頭像、商品縮圖、網站卡片、投影片圖片、證件照與任何需要符合固定寬高的使用者。',
      en: 'Useful for social avatars, product thumbnails, website cards, slides, ID photos, and any fixed-width and height destination.',
    },
    explanation: [
      {
        zh: '先量出來源與目標比例。比例相同時可鎖定比例縮放；比例不同時必須在「裁切內容」與「保留完整畫面加留白」之間選擇。不要把「符合尺寸」和「保留所有內容」當成同一個要求。',
        en: 'Measure source and target ratios first. Matching ratios can use locked scaling; mismatched ratios require a choice between cropping content and keeping the full image with padding. Fitting dimensions and preserving everything are different requirements.',
      },
      {
        zh: '裁切前先設定焦點安全區：人物臉、產品標誌、圖表標題或 QR Code 不應貼近邊緣。先在裁切工具預覽，再輸出；自動置中只是起點，不一定符合每張圖的重點。',
        en: 'Set a safe focal area before cropping: faces, logos, chart titles, and QR codes should not sit on the edge. Preview in the crop tool; center cropping is only a starting point.',
      },
      {
        zh: '若圖片要放在多個版位，保留原始比例的主檔，再各自輸出目標尺寸。反覆在已裁切檔上縮放會累積取捨，之後很難找回被切掉的內容。',
        en: 'For multiple placements, keep a proportional master and export each target size separately. Repeatedly resizing a cropped file compounds trade-offs and cannot restore removed content.',
      },
      {
        zh: '鎖定比例只能避免幾何變形，不能保證文字清晰或檔案適合上傳。完成尺寸後，依用途決定是否再壓縮，並在手機、網站卡片或簡報投影等實際情境查看。',
        en: 'Locked ratio prevents geometric distortion but not blurry text or upload limits. After sizing, decide whether to compress and view it in the real context: phone, card, or projected slide.',
      },
      {
        zh: '使用本站圖片調整尺寸工具時，輸出後檢查像素寬高、檔案方向、焦點與透明背景。工具在瀏覽器端處理檔案；下載檔仍應依共享裝置政策清理，不要把暫存檔當成主檔。',
        en: 'After using the browser-based image resizer, check pixel dimensions, orientation, focal content, and transparency. Follow shared-device cleanup policy for downloads and keep a separate master.',
      },
      {
        zh: '為不同版位使用可追蹤的輸出命名並記錄裁切焦點，之後需要另一比例時一律回到主檔重做。',
        en: 'Use traceable output names such as `avatar-square` and `card-4x3`, and record the crop focus before delivery. Return to the master when another ratio is requested instead of guessing removed edges.',
      },
      {
        zh: '交付前寫下目標寬高、格式、透明需求與裁切規則，並在瀏覽器與手機各開一次確認。',
        en: 'Before delivery, write a short spec for target dimensions, format, transparency, and crop rules, then open the result in a browser and on a phone. Completion means focal content and readability survive the real placement.',
      },
      {
        zh: '若圖片同時用於頭像、卡片與列印，保留主檔並各自輸出，不用一個折衷尺寸服務所有場景；每個輸出標明版位與日期。',
        en: 'When an image serves an avatar, card, and print job, keep a master plus purpose-specific exports instead of one compromise size. Label each output by placement and date so a later change replaces only the affected version.',
      },
      {
        zh: '固定框若包含文字或商品，裁切後再次確認安全邊界與最小可讀尺寸；必要時保留少量留白並記錄手動調整。',
        en: 'For boxes containing text or products, recheck safe margins and minimum readable size after cropping. A little padding is safer than touching a logo, face, or barcode; record any manual exception beside the version.',
      },
      {
        zh: '若目標平台會自動裁切，先上傳測試圖確認其焦點規則，再調整輸出，不要只依賴本站預覽。',
        en: 'If the destination auto-crops, upload a test image to learn its focal rule and adjust the export before the real campaign. Do not rely on the local preview alone when the platform changes the frame.',
      },
    ],
    steps: [
      { zh: '記下原圖寬高、目標寬高與不可裁切的重點。', en: 'Record source and target dimensions and content that must not be cropped.' },
      { zh: '計算兩者比例，選擇鎖定比例、裁切或留白。', en: 'Compare ratios and choose locked scaling, crop, or padding.' },
      { zh: '在圖片裁切工具中定位焦點並預覽邊界。', en: 'Position the focal area and preview edges in the crop tool.' },
      { zh: '用圖片調整尺寸工具輸出目標像素，保持比例。', en: 'Export target pixels with the image resizer while preserving ratio.' },
      { zh: '在實際版位檢查人物、文字、標誌、透明與方向。', en: 'Check faces, text, logos, transparency, and orientation in the real placement.' },
      { zh: '需要時再壓縮，保存主檔與用途明確的輸出檔。', en: 'Compress only if needed and save the master separately from purpose-named outputs.' },
    ],
    example: {
      zh: '網站卡片要求 1200×800，但原圖是 4000×3000。團隊鎖定比例縮小到 1067×800，再從主檔裁切左右，確保商品標籤留在安全區；另一個社群方形版則重新定位焦點，而不是把卡片檔再拉成正方形。',
      en: 'A website card needs 1200×800 while the source is 4000×3000. The team scales proportionally to 1067×800, crops the sides from the master, and keeps the product label safe. The square social version is cropped from the master again rather than stretching the card file.',
    },
    commonMistakes: [
      { zh: '為了符合寬高直接拉伸，讓人物、圓形標誌或文字變形。', en: 'Stretching to target dimensions and distorting faces, logos, or text.' },
      { zh: '使用自動置中裁切，卻沒有檢查焦點與邊緣。', en: 'Using center crop without checking the focal area and edges.' },
      { zh: '在已裁切輸出檔上反覆縮放，遺失可恢復的原始內容。', en: 'Repeatedly resizing a cropped output and losing recoverable content.' },
      { zh: '只看像素尺寸，不看網站、手機或簡報中的實際效果。', en: 'Checking pixels but not the real website, phone, or slide context.' },
      { zh: '把輸出檔當成主檔，未保存原始比例與透明資訊。', en: 'Treating an output as the master and losing original ratio or transparency.' },
    ],
    faq: [
      { question: { zh: '調整圖片尺寸一定要裁切嗎？', en: 'Must I crop when resizing an image?' }, answer: { zh: '不一定。比例相同時鎖定比例縮放即可；比例不同時可選裁切、留白或改變版位。先依內容重要性和版位規格決定。', en: 'No. Matching ratios need only locked scaling; mismatched ratios can use crop, padding, or a different layout. Decide from content importance and destination rules.' } },
      { question: { zh: '鎖定比例會讓圖片符合固定寬高嗎？', en: 'Does locking the ratio fit a fixed width and height?' }, answer: { zh: '它會避免變形，但可能只符合其中一邊，另一邊需要裁切或留白。固定框的完整處理需要兩個步驟。', en: 'It prevents distortion but may fit only one dimension; the other needs crop or padding. A fixed box usually requires both decisions.' } },
      { question: { zh: '可以先壓縮再調整尺寸嗎？', en: 'Should I compress before resizing?' }, answer: { zh: '通常先從主檔調整尺寸，再依用途壓縮較容易控制品質。若先壓縮又大幅縮放，細節可能重複損失；每次輸出都要實測。', en: 'Usually resize from the master first, then compress for the destination. Compressing before a large resize can compound detail loss; test each output.' } },
    ],
    cta: {
      zh: '先用圖片裁切與調整尺寸工具選好比例策略，再到實際版位檢查焦點與清晰度。',
      en: 'Choose a ratio strategy with crop and resize tools, then check the focal content and clarity in the real placement.',
    },
    updatedAt: '2026-09-03',
    noFaqSchema: true,
  },
  {
    id: 'image-compression-quality-size-guide',
    locales: ['zh', 'en'],
    slug: 'image-compression-quality-size-guide',
    title: {
      zh: '圖片壓縮品質與檔案大小取捨指南',
      en: 'Image Compression Quality and File-Size Trade-off Guide',
    },
    metaTitle: {
      zh: '圖片壓縮品質怎麼選？檔案大小與清晰度驗收',
      en: 'Image Compression Quality: Balance Size and Clarity',
    },
    metaDescription: {
      zh: '圖片壓縮不是越小越好：先設定上傳大小與可接受清晰度，再比較文字邊緣、細節、色塊與檔案重量，保存原圖並用實際平台驗收輸出，避免只追求最低容量。',
      en: 'Smaller is not always better. Set the upload limit, compare text edges and detail, keep the original, and proof the compressed image on the real platform.',
    },
    h1: {
      zh: '圖片壓縮品質怎麼選：檔案大小、細節與上傳驗收',
      en: 'How to Choose Image Compression Quality: Size, Detail, and Acceptance',
    },
    category: { zh: '圖片工作流程', en: 'Image workflows' },
    priority: 50,
    searchIntent: {
      zh: '使用者需要把圖片壓到上傳限制以下，又不想讓文字、商品細節或圖表模糊，想知道如何比較品質與檔案大小。',
      en: 'A user must meet an upload limit without making text, product detail, or charts blurry and needs a repeatable quality-versus-size comparison.',
    },
    targetKeywords: [
      { zh: '圖片壓縮品質設定', en: 'image compression quality setting' },
      { zh: '圖片壓縮不失真', en: 'compress image without visible loss' },
      { zh: '圖片檔案太大怎麼辦', en: 'reduce image file size' },
    ],
    relatedToolIds: ['image-compressor', 'image-resizer', 'jpg-to-webp'],
    relatedGuideIds: ['image-compression-email-guide', 'compress-image-to-upload-limit', 'jpg-png-webp-which-to-use'],
    relatedWorkflowIds: ['creator-social-toolkit'],
    summary: {
      zh: '壓縮品質要由用途決定：照片可接受細微雜訊，截圖、文字與圖表則更怕邊緣糊掉。先調整不必要的尺寸，再用副本比較大小與可讀性。',
      en: 'Compression quality follows the job: photos tolerate small artifacts, while screenshots, text, and charts expose fuzzy edges. Resize unnecessary pixels first, then compare size and readability on a copy.',
    },
    problem: {
      zh: '有人把品質滑桿直接拉到最低，檔案雖符合限制，卻讓發票號碼、商品邊緣或簡報小字無法辨識；也有人反覆壓縮同一檔案，品質越來越差卻沒有保留可回復版本。',
      en: 'A lowest-quality export may meet the limit but make invoice numbers, product edges, or slide text unreadable. Recompressing the same file repeatedly compounds damage without a recoverable master.',
    },
    whoShouldUse: {
      zh: '適合寄 Email、上傳表單、網站、社群、電商與需要在檔案大小限制內保留可讀性的使用者。',
      en: 'Useful for email, forms, websites, social posts, ecommerce, and any upload with a size limit and readability requirement.',
    },
    explanation: [
      {
        zh: '先確認限制是檔案大小、像素尺寸、格式還是三者都有。若只需要 1200 像素寬，先縮小超過需求的原圖常比大幅降低品質更乾淨；不要用壓縮解決其實是尺寸過大的問題。',
        en: 'Identify whether the constraint is file size, pixel dimensions, format, or all three. If 1200 pixels wide is enough, resizing excess pixels is often cleaner than severe quality reduction.',
      },
      {
        zh: '照片、截圖、掃描與圖表的失真容忍度不同。照片可比較天空或皮膚的色階，截圖要看文字邊緣，掃描要看細線和印章，圖表要看座標與標籤；用與用途相同的區域做比較。',
        en: 'Photos, screenshots, scans, and charts tolerate different artifacts. Compare gradients in photos, text edges in screenshots, fine lines in scans, and labels in charts using areas that match the real job.',
      },
      {
        zh: '每次比較至少保留原圖、兩個品質版本與檔案大小。放大看細節，也縮小到收件人實際看到的尺寸；只看 400% 放大或只看縮圖都可能做出錯誤選擇。',
        en: 'Keep the original, two quality variants, and their sizes for each comparison. Inspect enlarged detail and the recipient’s actual display size; either view alone can mislead.',
      },
      {
        zh: '格式也會改變取捨。JPG 適合照片的有損壓縮，PNG 適合文字與透明圖形，WebP 可在支援的平台減少重量；但收件平台可能重新壓縮或拒絕某格式，仍要實測。',
        en: 'Format changes the trade-off: JPG suits lossy photo compression, PNG suits text and transparency, and WebP can reduce weight where supported. The destination may recompress or reject a format, so test it.',
      },
      {
        zh: '本站圖片壓縮工具在瀏覽器端處理檔案，下載後要確認檔案真的能開啟、方向與色彩沒有改變。壓縮不是隱私或品質的絕對保證，敏感資料仍應依你的裝置與共享政策處理。',
        en: 'The browser-based image compressor processes files locally in the page; verify that downloads open and preserve orientation and color. Compression is not an absolute privacy or quality guarantee, so follow your device policy for sensitive data.',
      },
      {
        zh: '把通過測試的品質、格式、像素與檔案大小記成小規格，平台規則改變時從主檔重跑候選版本再更新。',
        en: 'Turn the passing quality, format, pixels, and file size into a small specification. If a platform changes its limit, regenerate candidates from the master and update the spec instead of lowering a whole folder without comparison.',
      },
      {
        zh: '對含文字或條碼的圖片，固定放大檢視區比較壓縮前後邊緣；正常尺寸就難讀時應提高品質或改用 PNG。',
        en: 'For text or barcodes, keep a fixed zoomed inspection area and compare edges before and after compression. A defect visible only when enlarged may be acceptable, but blur at normal size means raising quality or choosing PNG is safer.',
      },
      {
        zh: '對一批圖片先抽取最細文字、最複雜色階、最高對比與最大檔案作代表樣本，用同一組樣本比較設定後再套用整批。',
        en: 'For a batch, choose representative samples: the smallest text, hardest gradient, highest contrast, and largest file. Compare settings on those samples before applying them broadly, and keep failures for retesting when limits change.',
      },
      {
        zh: '若壓縮針對特定平台，先記錄大小與格式限制，再用草稿上傳測試；二次壓縮出現色帶、方向錯誤或模糊時回到主檔調整。',
        en: 'When compression targets a platform, record its size and format limits and test with a draft upload. If recompression creates banding, rotation errors, or blurry text, return to the master instead of compressing the same copy again.',
      },
    ],
    steps: [
      { zh: '寫下上傳大小、尺寸、格式與最低可接受清晰度。', en: 'Write down size, dimensions, format, and minimum acceptable clarity.' },
      { zh: '從原圖輸出兩個品質版本，不要覆蓋主檔。', en: 'Export two quality variants from the original without overwriting it.' },
      { zh: '比較檔案大小與用途關鍵區域的文字、細節和色階。', en: 'Compare file sizes and text, detail, and gradients in task-critical areas.' },
      { zh: '在實際網站、表單、Email 或社群平台上傳測試。', en: 'Upload a test to the real website, form, email, or social platform.' },
      { zh: '檢查平台重新壓縮後的清晰度、方向與色彩。', en: 'Check clarity, orientation, and color after platform recompression.' },
      { zh: '保存通過版本與設定，避免下次重新猜品質滑桿。', en: 'Save the passing version and settings so the slider is not guessed next time.' },
    ],
    example: {
      zh: '表單限制單張 2 MB，原始商品照片 6.8 MB、寬 4000 像素。團隊先縮到 1600 像素，再輸出 JPG 品質 80 與 60；品質 60 的檔案較小但商品序號邊緣變糊，最後選品質 80 並在表單實際上傳確認。',
      en: 'A form limits each product photo to 2 MB; the source is 6.8 MB at 4000 pixels wide. The team resizes to 1600 pixels, compares JPG quality 80 and 60, rejects 60 because the serial edge blurs, and confirms quality 80 in the actual form.',
    },
    commonMistakes: [
      { zh: '用最低品質滑桿直接解決尺寸問題，沒有先縮小多餘像素。', en: 'Using the lowest quality to solve a dimension problem without resizing excess pixels.' },
      { zh: '只看檔案大小，不檢查文字、條碼、細線與商品細節。', en: 'Checking size but not text, barcodes, fine lines, or product detail.' },
      { zh: '反覆壓縮同一個輸出檔，沒有保留原始主檔。', en: 'Recompressing the same output repeatedly without a master.' },
      { zh: '忽略平台重新壓縮、格式限制與色彩變化。', en: 'Ignoring platform recompression, format limits, and color changes.' },
      { zh: '把瀏覽器端處理誤當成所有裝置與資料都沒有風險。', en: 'Treating browser-side processing as a guarantee for every device and data risk.' },
    ],
    faq: [
      { question: { zh: '圖片壓縮品質越低越好嗎？', en: 'Is lower image quality always better?' }, answer: { zh: '不是。品質越低通常越省容量，但可能破壞文字、圖表或商品細節。先依用途設定最低可讀性，再選能通過實際平台測試的版本。', en: 'No. Lower quality usually saves space but can destroy text, charts, or product detail. Set a minimum readability level and choose the version that passes the real platform test.' } },
      { question: { zh: '先調整尺寸還是先壓縮？', en: 'Should I resize or compress first?' }, answer: { zh: '通常先從原圖調整到用途需要的像素，再壓縮輸出較好控制。兩者都要測試，因為某些平台還會再次處理檔案。', en: 'Usually resize from the original to the needed pixels, then compress. Test both steps because some platforms process the file again.' } },
      { question: { zh: '壓縮後可以刪掉原圖嗎？', en: 'Can I delete the original after compressing?' }, answer: { zh: '若未來可能需要不同尺寸、格式或更高品質，應保留原圖或無損主檔。只在確認保存政策與備份後才清理副本。', en: 'Keep the original or lossless master if another size, format, or quality may be needed. Clean copies only after confirming retention and backup policy.' } },
    ],
    cta: {
      zh: '用圖片調整尺寸與壓縮工具建立兩個版本，先比對關鍵細節，再到實際平台驗收大小與清晰度。',
      en: 'Create two versions with resize and compression tools, compare critical detail, and verify size and clarity on the real platform.',
    },
    updatedAt: '2026-09-03',
    noFaqSchema: true,
  },
]; 
