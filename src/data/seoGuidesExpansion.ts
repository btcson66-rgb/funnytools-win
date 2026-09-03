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
    contentHtml: {
      zh: '<h2>先測目的地，再測圖案</h2><p>QR Code 列印前最容易漏掉的不是產生步驟，而是讀者掃描後的下一步。先核對網址、語言、活動日期與登入限制，再用不同手機與實際紙張尺寸測試。螢幕預覽只能當第一關。</p><h2>列印前的五個檢查點</h2><ol><li>兩支不同手機都能掃描並開啟頁面。</li><li>深色模組、淺色背景與完整外圍留白仍存在。</li><li>從預計距離與角度掃描，不需要反覆尋找焦點。</li><li>QR Code 旁有短網址或簡短備援指示。</li><li>保存已核准的圖檔與目的地版本。</li></ol><h2>可靠來源與限制</h2><p>DENSO WAVE 的 <a href="https://www.qrcode.com/en/about/">QR Code 基礎說明</a>可用來理解結構與錯誤修正；實際可讀性仍受紙張、尺寸、光線與相機影響，不能用單次成功掃描保證所有場景。</p>',
      en: '<h2>Test the destination before the pixels</h2><p>The most common pre-print failure is not generating the symbol; it is sending readers to the wrong page. Check the URL, language, event date, and login requirement first, then test on different phones and at the final paper size. A screen preview is only the first gate.</p><h2>Five print checks</h2><ol><li>Two different phones scan and open the page.</li><li>Dark modules, a light background, and the full quiet space remain.</li><li>The code scans from the expected distance and angle.</li><li>A short URL or one-line fallback appears beside it.</li><li>The approved image and destination version are saved.</li></ol><h2>Source and limits</h2><p>Use <a href="https://www.qrcode.com/en/about/">DENSO WAVE’s QR Code basics</a> for structural concepts and error correction. Actual readability still depends on paper, size, light, and camera; one successful scan cannot guarantee every context.</p>',
    },
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
      en: 'QR Code Mobile Landing Page Checklist: Fast, Clear, and Accessible',
    },
    metaDescription: {
      zh: 'QR Code 掃描成功只是開始：檢查手機頁面載入、單手操作、標題、語言、表單欄位、無障礙與無法掃描時的替代路徑，降低入口流失、表單中斷與誤解風險。',
      en: 'A successful QR scan is only the start. Check mobile loading, one-hand actions, headings, language, form fields, accessibility, and a fallback path for people who cannot scan.',
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
    contentHtml: {
      zh: '<h2>掃描成功只是第一關</h2><p>落地頁要在小螢幕與弱網路中快速說明用途、主要行動與替代路徑。表單只問完成任務需要的資料，並清楚標示語言。</p><h2>用兩支手機與可操作性檢查</h2><p>測試 iOS、Android、觸控按鈕、輸入鍵盤、錯誤訊息與語言切換。可參考 <a href="https://www.w3.org/TR/WCAG22/">W3C WCAG 2.2</a>的可操作性與輸入協助原則，再回到實際頁面驗證。</p><h2>保留不用掃描的替代入口</h2><p>在紙面與頁面放短網址或可複製連結，讓相機故障、沒有權限或不便掃描的人仍能完成任務。完成後再回到<a href="/guides/qr-code-before-print-testing-guide/">列印前測試指南</a>檢查整條路徑。</p>',
      en: '<h2>A successful scan is only the first gate</h2><p>The landing page should explain the purpose, main action, and fallback on a small screen and a slow connection. Ask only for task-related data and label the language clearly.</p><h2>Test two phones and operability</h2><p>Check iOS, Android, touch targets, input keyboards, errors, and language switching. Use <a href="https://www.w3.org/TR/WCAG22/">W3C WCAG 2.2</a> for operability and input-assistance principles, then verify the actual page.</p><h2>Keep a non-scan fallback</h2><p>Print a short URL and show a copyable link so people with camera or permission problems can continue. Finish with the <a href="/guides/qr-code-before-print-testing-guide/">pre-print testing guide</a> to check the complete journey.</p>',
    },
    noFaqSchema: true,
  },
];
