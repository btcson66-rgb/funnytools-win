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
]; 
