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
    relatedGuideIds: ['qr-code-print-size-guide', 'qr-code-classroom-guide', 'qr-code-destination-choice-guide'],
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
    id: 'qr-code-destination-choice-guide',
    locales: ['zh', 'en'],
    slug: 'qr-code-destination-choice-guide',
    title: {
      zh: 'QR Code 目的地選擇指南',
      en: 'Choosing a QR Code Destination: Static Link or Updateable Workflow',
    },
    metaTitle: {
      zh: 'QR Code 要放什麼網址？靜態連結、活動頁與可更新流程比較',
      en: 'Where Should a QR Code Link? Static, Campaign, or Updateable URL',
    },
    metaDescription: {
      zh: '先決定 QR Code 的目的地再產生圖檔：比較固定網址、活動頁與可更新流程，建立版本、備援、語言與隱私檢查，避免印好後無法維護或留下失效連結。',
      en: 'Choose the QR code destination before generating it: compare fixed URLs, campaign pages, and updateable workflows with version, fallback, and privacy checks.',
    },
    h1: {
      zh: 'QR Code 該連到哪裡？從固定網址到可更新活動頁的選擇方法',
      en: 'Where Should a QR Code Link? A Practical Guide to Fixed URLs and Updateable Campaign Pages',
    },
    category: { zh: 'QR Code 與條碼', en: 'QR codes and barcodes' },
    priority: 32,
    searchIntent: {
      zh: '使用者準備製作 QR Code，但不確定要直接編入網址、連到活動頁，或如何在印刷後維護目的地。',
      en: 'A user is preparing a QR code but needs to choose between encoding a direct URL, using a campaign page, and maintaining the destination after printing.',
    },
    targetKeywords: [
      { zh: 'QR Code 連結網址選擇', en: 'choose QR code destination URL' },
      { zh: 'QR Code 印好後改網址', en: 'change QR code link after printing' },
      { zh: 'QR Code 活動頁規劃', en: 'QR code campaign landing page' },
    ],
    relatedToolIds: ['qr-code-generator', 'url-encoder'],
    relatedGuideIds: ['qr-code-before-print-testing-guide', 'qr-code-print-size-guide', 'qr-code-classroom-guide'],
    relatedWorkflowIds: [],
    summary: {
      zh: 'QR Code 圖案只是入口，真正需要維護的是它指向的內容。先依內容是否固定、是否需要改版與是否包含個資，選擇直接網址或可控制的中介頁。',
      en: 'The QR symbol is only the entrance; the destination content is what you maintain. Choose a direct URL or a controlled intermediary page based on how often it may change and what data it contains.',
    },
    problem: {
      zh: '把一次性活動網址直接印在大量海報上，看似最快，卻可能遇到活動結束、路徑改名、語言版本錯誤或表單權限改變。重新印刷的成本通常比多花幾分鐘設計版本策略更高。',
      en: 'Encoding a one-time event URL directly into a large print run feels fast, but events end, paths change, languages are corrected, and form permissions expire. Reprinting often costs more than spending a few minutes on a destination strategy.',
    },
    whoShouldUse: {
      zh: '適合活動主辦人、教師、餐飲店家、社群經營者、包裝設計人員與需要長期保留印刷品的品牌團隊。',
      en: 'Use this for event organizers, teachers, restaurants, community managers, packaging designers, and teams that need printed materials to remain useful over time.',
    },
    explanation: [
      {
        zh: '固定網址適合內容真的不會改變、或你能保證舊網址長期轉址的情境。例如品牌首頁、公開說明文件或長期存在的聯絡方式。產生器把網址資料編入圖案後，圖案本身不會因網站內容更新而自動改寫；能否「改連結」取決於你是否控制該網址或中介頁。',
        en: 'A fixed URL fits content that truly will not change or that you can keep redirecting for a long time, such as a brand homepage or stable public instructions. Once a URL is encoded, the symbol does not rewrite itself when the site content changes; the ability to “change the link” depends on whether you control that URL or an intermediary page.',
      },
      {
        zh: '活動頁或中介頁適合日期、報名表、菜單、課程檔案會更新的情境。QR Code 固定連到一個你控制的短路徑，頁面再提供目前版本；這讓你能換內容而不必重新設計每張海報。但這不是魔法，也不是任何免費產生器都提供的動態服務，必須確認網域、主機、轉址與維護責任。',
        en: 'A campaign or intermediary page fits destinations that change—dates, registration forms, menus, or course files. The QR code keeps one controlled short path while the page serves the current version, so you can update content without redesigning every poster. This is not magic and is not included in every free generator; confirm who controls the domain, hosting, redirects, and maintenance.',
      },
      {
        zh: '用版本表管理目的地：記下 QR Code 圖檔名稱、編入的網址、頁面版本、啟用日期、負責人與下線條件。若同一活動有中文與英文頁，將語言寫進路徑或頁面標題，並用兩種手機實測；不要靠瀏覽器自動語言猜測當作唯一分流。',
        en: 'Maintain a destination version table: record the QR image name, encoded URL, page version, activation date, owner, and retirement condition. If an event has English and Chinese pages, make the language explicit in the path or page title and test both; do not rely only on browser-language guessing.',
      },
      {
        zh: '避免把不必要的個資放進 QR Code。姓名、電話或一次性識別碼一旦直接編入圖案，就會出現在相片、轉貼與紙張上；若只是要讓系統辨識活動來源，可考慮由頁面處理必要欄位，並在表單與分析工具中說明資料用途。這是內容規劃與隱私責任，不是產生器能替你決定的事。',
        en: 'Avoid encoding unnecessary personal data. A name, phone number, or one-time identifier placed directly in the symbol can appear in photos, reposts, and discarded paper. If a system needs campaign context, let the landing page handle the minimum fields and explain their use in the form and analytics notice. That is a planning and privacy responsibility, not a generator setting.',
      },
      {
        zh: '若要追蹤來源，可在你控制的網址上使用清楚命名的 UTM 參數，但先確認分析工具的隱私政策與資料保留設定。追蹤參數不應包含姓名、Email 或可直接識別個人的字串。',
        en: 'If you need source measurement, use clearly named UTM parameters on a URL you control, after checking the analytics privacy and retention settings. Tracking parameters should not contain names, email addresses, or directly identifying strings.',
      },
    ],
    steps: [
      { zh: '寫下 QR Code 使用期限：一次性活動、季度活動、長期品牌或包裝。', en: 'Write down the intended lifetime: one event, a recurring campaign, a permanent brand link, or packaging.' },
      { zh: '列出可能變動的內容，例如日期、表單、價格、語言、檔案與聯絡方式。', en: 'List what may change, such as dates, forms, prices, language, files, and contact details.' },
      { zh: '若內容固定且網址能長期維護，使用直接網址；若會變動，建立你控制的中介頁或短路徑。', en: 'Use a direct URL when content is stable and the URL can be maintained; otherwise create a controlled intermediary page or short path.' },
      { zh: '建立版本表，標示啟用、更新與下線責任，並準備一個不含個資的備援網址。', en: 'Create a version table with activation, update, and retirement ownership, plus a fallback URL without personal data.' },
      { zh: '用 QR Code 產生器輸出圖檔，依「QR Code 列印前測試」指南在螢幕與紙張上驗證。', en: 'Generate the image and validate it on screen and paper using the QR Code pre-print testing checklist.' },
      { zh: '活動結束後保留簡短說明或轉址，不要讓舊海報掃描後直接落到無法解釋的 404。', en: 'After the campaign, keep a short explanation or redirect so old posters do not lead to an unexplained 404.' },
    ],
    example: {
      zh: '咖啡店要印一批可使用一年的桌牌。若直接編入當月優惠頁，優惠結束後桌牌就失效；店家改用自己控制的 `/menu` 頁面，QR Code 不變，頁面內更新當季菜單與過敏原說明。版本表記錄每次更新日期，桌牌旁仍印出短網址，讓不便掃描的顧客能手動輸入。',
      en: 'A café wants table cards that last a year. Encoding the current promotion would make them stale when the offer ends, so the café uses a controlled `/menu` page and updates the seasonal menu and allergen notes behind the same code. A version table records each update, and a short URL remains visible for guests who cannot scan.',
    },
    commonMistakes: [
      { zh: '以為所有 QR Code 都能在印刷後直接改目的地，卻沒有控制原網址或中介頁。', en: 'Assuming every QR code can change destination after printing without controlling the encoded URL or an intermediary page.' },
      { zh: '把活動日期、價格或檔案直接寫死在圖案裡，沒有安排結束後的替代內容。', en: 'Hard-coding dates, prices, or files into a symbol without a post-campaign destination.' },
      { zh: '把姓名、電話或 Email 放進 QR Code 或追蹤參數，讓紙張本身暴露個資。', en: 'Putting names, phone numbers, or email addresses in the symbol or tracking parameters.' },
      { zh: '只記得產生圖檔，沒有保存網址版本與更新責任人。', en: 'Saving the image but not the URL version or the person responsible for updates.' },
      { zh: '活動結束後刪除頁面，讓仍在流通的海報導向無說明的 404。', en: 'Deleting the page after the campaign and leaving circulating posters at an unexplained 404.' },
    ],
    faq: [
      { question: { zh: '印好 QR Code 後可以換網址嗎？', en: 'Can I change the URL after printing a QR code?' }, answer: { zh: '如果圖案直接編入原始網址，不能由產生器把圖案內容改寫；只有在你控制該網址的頁面或轉址時，才能讓同一入口顯示新內容。', en: 'If the symbol encodes the original URL directly, the generator cannot rewrite the symbol. You can keep the same entry useful only by updating a page or redirect that you control.' } },
      { question: { zh: '固定網址和動態 QR Code 哪個比較好？', en: 'Is a fixed URL or a dynamic QR code better?' }, answer: { zh: '沒有通用答案。內容固定、能長期維護時直接網址更簡單；內容常變時，中介頁更容易管理。比較時要把網域控制權、服務費、轉址可靠性與下線流程一起算進去。', en: 'Neither is universally better. A direct URL is simpler for stable content; an intermediary page is easier for changing content. Compare domain control, fees, redirect reliability, and retirement procedures together.' } },
      { question: { zh: '可以把個人資料放進 QR Code 嗎？', en: 'Can I put personal data in a QR code?' }, answer: { zh: '技術上可能，但通常不必要。紙張與照片容易被轉發，建議只編入必要入口，讓受控頁面依告知內容收集最少資料。', en: 'It may be technically possible, but it is usually unnecessary. Paper and photos are easy to share; encode only the necessary entry point and collect the minimum data on a controlled page with clear notice.' } },
    ],
    cta: {
      zh: '先決定 QR Code 的生命週期與維護人，再用產生器建立圖檔；完成版本表與列印前測試後才交付設計。',
      en: 'Decide the QR code’s lifetime and owner first, then generate the image. Deliver the design only after the version table and pre-print tests are complete.',
    },
    updatedAt: '2026-09-02',
    contentHtml: {
      zh: '<h2>QR Code 不是目的地本身</h2><p>圖案只保存入口資料，真正需要維護的是網址背後的頁面。內容固定時可用直接網址；日期、菜單、表單或檔案會變動時，使用自己控制的中介頁能避免每次重新印刷。</p><h2>用版本表降低失效風險</h2><p>記錄圖檔、網址、頁面版本、啟用日期、負責人與下線條件。若有中英文頁，讓語言路徑清楚可見，並在兩種手機上測試。不要把姓名或 Email 放進圖案或 UTM 參數。</p><h2>結束活動也要照顧舊入口</h2><p>活動結束後保留簡短說明或轉址，讓仍在流通的海報不會落到無法解釋的 404。產生圖檔後，搭配 <a href="/guides/qr-code-before-print-testing-guide/">列印前測試指南</a>完成實體驗證。</p>',
      en: '<h2>The QR code is not the destination</h2><p>The symbol stores an entry point; the page behind the URL is what you maintain. Use a direct URL for stable content. For dates, menus, forms, or files that change, a controlled intermediary page avoids reprinting every asset.</p><h2>Reduce failures with a version table</h2><p>Record the image, URL, page version, activation date, owner, and retirement condition. Make English and Chinese paths explicit and test both on two phones. Do not put names or email addresses in the symbol or UTM parameters.</p><h2>Care for old entrances</h2><p>After a campaign, keep a short explanation or redirect so circulating posters do not become unexplained 404s. Pair generation with the <a href="/guides/qr-code-before-print-testing-guide/">pre-print testing guide</a> for physical validation.</p>',
    },
    noFaqSchema: true,
  },
];
