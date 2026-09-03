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
      en: 'Test a QR Code Before Printing: Checklist',
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
    id: 'classroom-random-group-materials-handoff-guide',
    locales: ['zh', 'en'],
    slug: 'classroom-random-group-materials-handoff-guide',
    title: { zh: '課堂分組材料交接指南', en: 'Classroom Group Materials Handoff Guide' },
    metaTitle: { zh: '隨機分組後材料怎麼分？小組物品交接與回收清單', en: 'Group Materials Handoff Checklist' },
    metaDescription: {
      zh: '隨機分組後先把材料需求、領取人、數量、替代品與回收責任寫清楚，再依組別卡與座位表交接；活動結束逐組核對，避免有人缺物品、重複領取或把個人物品留在教室。',
      en: 'After random grouping, assign quantities, pickup owners, substitutes, and return duties by group. Check each handoff so work starts without missing items.',
    },
    h1: { zh: '隨機分組後材料怎麼交接：領取、使用與回收的課堂清單', en: 'How to Hand Off and Return Materials After Random Grouping' },
    category: { zh: '教學工作流程', en: 'Teaching workflows' },
    priority: 65,
    searchIntent: { zh: '教師完成隨機分組後，想安排每組領取正確數量的紙張、器材或平板，並在活動結束回收與核對，避免材料短缺造成小組無法開始。', en: 'A teacher has random groups and needs each team to receive the right papers, devices, or equipment, then return them with an accountable checklist.' },
    targetKeywords: [
      { zh: '課堂分組材料分配', en: 'classroom group materials' },
      { zh: '小組器材領取清單', en: 'group equipment checklist' },
      { zh: '分組後材料回收', en: 'return materials after group work' },
    ],
    relatedToolIds: ['random-group-generator', 'group-generator', 'seating-chart'],
    relatedGuideIds: ['classroom-random-group-seat-transition-guide', 'classroom-random-group-shareable-result-guide', 'classroom-group-roles-rotation-guide'],
    relatedWorkflowIds: ['teacher-classroom-random-toolkit'],
    summary: { zh: '材料交接要跟著分組結果走：每組知道拿什麼、由誰領、如何替代與何時歸還，教師才有辦法把時間用在任務而不是找物品。', en: 'Materials should follow the grouping result: each team needs a quantity, pickup owner, substitute, and return time so teaching time is not lost to searching.' },
    problem: { zh: '隨機分組只產生人員名單，不會自動知道每組需要幾份材料。若沒有領取順序與回收記錄，學生可能重複拿取、拿錯版本、共用設備沒充電，或在活動結束找不到缺少的物品。', en: 'A random roster does not know how many materials each team needs. Without pickup order and return records, students duplicate items, take the wrong version, leave devices uncharged, or lose equipment.' },
    whoShouldUse: { zh: '適合實驗、手作、閱讀站、平板課程、戶外活動與需要共用材料的教師、助教及主持人。', en: 'Useful for labs, craft work, reading stations, device lessons, outdoor activities, and any shared-material session.' },
    explanation: [
      { zh: '先從任務列出每組的最低材料包，而不是先把整箱物品搬到桌上。Cornell 的主動學習資源強調合作活動需要結構化任務（https://teaching.cornell.edu/teaching-resources/engaging-students/active-learning）；材料包也應對應角色與產出。', en: 'Start with the minimum kit each team needs, not a full box on every table. Cornell’s active-learning resources emphasize structured collaborative tasks (https://teaching.cornell.edu/teaching-resources/engaging-students/active-learning); the kit should match roles and outputs.' },
      { zh: '把材料分成消耗品、可歸還器材與個人用品。消耗品記數量，器材記資產或編號，個人用品則避免教師代替學生保管，三種責任不要混在同一欄。', en: 'Separate consumables, returnable equipment, and personal supplies. Count consumables, record equipment IDs, and do not make the teacher responsible for personal items.' },
      { zh: '每組指定一位領取人與一位回收核對人；人數不足時可由同一人負責，但要在組別卡上寫明。角色輪替可以留到下一輪，不要在交接途中臨時改規則。', en: 'Assign a pickup owner and return checker to each group. One person can hold both roles in a small team, but write it on the card; rotate roles in the next round rather than mid-handoff.' },
      { zh: '用組別標記、桌號或條碼讓材料站與學生看到同一個名稱。材料放置順序也要與座位動線一致，避免學生為了找一支筆穿越正在移動的隊伍。', en: 'Use the same group label, table number, or code at the material station and on student cards. Align the bin order with the movement route so students do not cross active traffic.' },
      { zh: '準備可接受的替代品與停止條件。若某組缺少紅色筆，能否改用藍色並在成果上註記？若器材安全檢查未通過，應暫停並通知教師，不要讓隨機結果凌駕於安全。', en: 'Define acceptable substitutes and stop conditions. Can a blue pen replace a red one with a note? If equipment fails a safety check, pause and tell the teacher instead of prioritizing randomness.' },
      { zh: '活動開始前由領取人逐項念出材料，教師只抽查高風險或高價物品。這比教師逐組搬運更有效率，也留下能解釋短缺來源的起點記錄。', en: 'Have pickup owners read each item before starting while the teacher samples high-risk or costly equipment. This is faster than teacher delivery and creates a starting record for shortages.' },
      { zh: '回收時使用相同清單反向核對，記錄遺失、損壞、未充電與下次要補充的項目。把結果回填到下一輪分組或材料規劃，不要只在課後口頭提醒。', en: 'Use the same checklist in reverse for return, recording missing, damaged, uncharged, or replenishment items. Feed the result into the next plan instead of relying on a spoken reminder.' },
    ],
    steps: [
      { zh: '依任務列出每組最低材料包、替代品與安全停止條件。', en: 'List each team’s minimum kit, substitutes, and safety stop conditions.' },
      { zh: '把消耗品、可歸還器材與個人用品分開記錄。', en: 'Separate consumables, returnable equipment, and personal supplies.' },
      { zh: '在組別卡與材料站標上相同組別名稱、數量與領取人。', en: 'Put the same group label, quantity, and pickup owner on cards and bins.' },
      { zh: '依座位動線分段領取，領取人逐項核對後才帶回小組。', en: 'Collect in route-based phases; the pickup owner checks each item before returning.' },
      { zh: '教師抽查高風險器材與替代品，確認學生知道何時停止並求助。', en: 'Sample high-risk equipment and substitutes, confirming when students must stop and ask.' },
      { zh: '活動結束依原清單回收，記下遺失、損壞、未充電與補充需求。', en: 'Use the original list to return items and record loss, damage, charging, and replenishment needs.' },
      { zh: '把交接結果存入教師備份，供下一輪分組與材料準備使用。', en: 'Save the handoff result in the teacher copy for the next grouping and preparation.' },
    ],
    example: { zh: '七組進行平板查資料活動。每組卡片列出一台平板、充電線、任務紙與一支備用筆，A 組領取人先到 A 箱核對，回收人於結束時確認電量與外觀。兩組缺少充電線時依替代規則共用並註記，教師把短缺寫入下一堂課清單。', en: 'Seven groups use tablets for research. Each card lists one tablet, cable, task sheet, and spare pen. The A pickup owner checks bin A, and the return checker confirms charge and condition. Two missing cables are shared under the substitute rule and logged for the next lesson.' },
    commonMistakes: [
      { zh: '只公布分組，沒有把材料數量與領取責任綁定。', en: 'Publishing groups without quantities or pickup ownership.' },
      { zh: '消耗品與昂貴器材使用同一種模糊記錄。', en: 'Tracking consumables and costly equipment with one vague field.' },
      { zh: '所有學生同時去材料桌，造成走道與領取站堵塞。', en: 'Sending everyone to the material station at once.' },
      { zh: '沒有事先定義替代品與安全停止條件。', en: 'Defining neither substitutes nor safety stop conditions.' },
      { zh: '活動開始沒有核對，結束才發現物品從哪組短缺。', en: 'Skipping the starting check and finding shortages without an owner.' },
      { zh: '回收只靠口頭提醒，沒有把損壞與補充需求寫回清單。', en: 'Relying on a verbal return reminder instead of recording damage or replenishment.' },
    ],
    faq: [
      { question: { zh: '每組材料一定要完全相同嗎？', en: 'Must every group receive identical materials?' }, answer: { zh: '不一定。依任務列出最低需求與可接受替代品，差異要被記錄並不影響安全與評量公平。', en: 'No. Define task minimums and acceptable substitutes, record differences, and protect safety and assessment fairness.' } },
      { question: { zh: '材料領取人和回收人可以是同一人嗎？', en: 'Can pickup and return be the same person?' }, answer: { zh: '可以，尤其是小組人數少時，但要在組別卡清楚標記；下一輪可輪替，避免責任永遠集中。', en: 'Yes, especially in small groups, if the card names the role clearly. Rotate it next round so responsibility is not permanent.' } },
      { question: { zh: '學生缺席後材料包怎麼調整？', en: 'How should a kit change after an absence?' }, answer: { zh: '先依任務角色判斷是否仍需原數量，必要時按缺席修補規則調整組別與材料，並更新領取清單。', en: 'Check task roles first, then adjust group and kit under the absence repair rule and update the pickup list.' } },
      { question: { zh: '為什麼要保留回收紀錄？', en: 'Why keep a return record?' }, answer: { zh: '它能指出短缺、損壞或未充電發生在哪個交接點，讓下一堂課能準備補充，而不是再次浪費活動時間。', en: 'It identifies where loss, damage, or charging issues occurred so the next lesson can prepare instead of losing activity time again.' } },
    ],
    cta: { zh: '用分組結果建立每組材料包與領取責任，活動前後都用同一張清單核對。', en: 'Turn the group result into a kit and ownership list, then use the same checklist before and after the activity.' },
    updatedAt: '2026-09-03',
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
      en: 'Split PDF Pages by Range: Safe Checklist',
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
      en: 'PDF-to-Image Too Dark? Contrast Checklist',
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
      en: 'CSV-to-JSON Misaligned? Check Headers First',
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
      en: 'Image Compression: Size vs Clarity',
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
  {
    id: 'pdf-to-word-layout-fidelity-guide',
    locales: ['zh', 'en'],
    slug: 'pdf-to-word-layout-fidelity-guide',
    title: {
      zh: 'PDF 轉 Word 版面與內容驗收指南',
      en: 'PDF to Word Layout Check Guide',
    },
    metaTitle: {
      zh: 'PDF 轉 Word 後版面跑掉？文字、表格與圖片驗收流程',
      en: 'PDF to Word: Check Layout and Text',
    },
    metaDescription: {
      zh: 'PDF 轉 Word 後不要只看檔案能否開啟，還要逐頁檢查段落、表格、圖片、頁首頁尾、字型與可編輯性；保留原始 PDF，先用小樣本驗收，再決定是否交付可編輯版本。',
      en: 'After converting PDF to Word, check paragraphs, tables, images, headers, fonts, and editability against the source before delivering an editable copy.',
    },
    h1: {
      zh: 'PDF 轉 Word 後怎麼驗收：版面、文字與可編輯性的完整流程',
      en: 'How to Check a PDF-to-Word Conversion Before You Deliver It',
    },
    category: { zh: 'PDF 工作流程', en: 'PDF workflows' },
    priority: 51,
    searchIntent: {
      zh: '使用者需要把 PDF 轉成可編輯的 Word，擔心轉換後文字順序、表格、圖片、頁首頁尾或字型跑版，想要一套可重複的驗收方法。',
      en: 'A user needs an editable Word copy of a PDF and wants a repeatable way to catch shifted text, tables, images, headers, footers, or fonts before delivery.',
    },
    targetKeywords: [
      { zh: 'PDF 轉 Word 版面跑掉', en: 'PDF to Word layout shifted' },
      { zh: 'PDF 轉 Word 檢查', en: 'check PDF to Word conversion' },
      { zh: 'PDF 轉可編輯文字', en: 'convert PDF to editable Word' },
    ],
    relatedToolIds: ['pdf-to-word', 'pdf-to-image', 'pdf-compressor'],
    relatedGuideIds: ['pdf-to-image-raster-text-search-guide', 'merge-pdf-reading-order-checklist-guide', 'pdf-to-image-resolution-guide'],
    relatedWorkflowIds: ['office-document-toolkit'],
    summary: {
      zh: 'PDF 轉 Word 是格式重建，不是把每個像素原封不動搬進文件。成功開啟只證明檔案存在；真正交付前要比較文字順序、表格結構、圖片位置與編輯需求。',
      en: 'PDF-to-Word is document reconstruction, not a pixel-perfect copy. A file opening proves only that it exists; delivery requires checks for reading order, tables, images, and the intended editing task.',
    },
    problem: {
      zh: 'PDF 可能是文字型、掃描影像型，或混合文字、表單與圖層。轉換器若無法判斷欄位順序，雙欄文章會交錯，表格可能變成定位文字，簽名和註解也可能失去原本位置。',
      en: 'A PDF may contain live text, scanned images, forms, or mixed layers. When a converter cannot infer reading order, two columns interleave, tables become positioned text, and signatures or annotations move away from their context.',
    },
    whoShouldUse: {
      zh: '適合需要修改合約草稿、報告、表單、講義、會議紀錄或內部文件的人，也適合在交付前替同事檢查轉換品質。',
      en: 'Useful for anyone editing a contract draft, report, form, handout, meeting record, or internal document, and for reviewers checking a converted file before handoff.',
    },
    explanation: [
      {
        zh: '先判斷原 PDF 是否有可選取的文字層。若整頁只能選到一張圖片，轉成 Word 後通常需要 OCR，辨識結果必須逐頁校對；若原檔有文字層，也不代表複雜欄位能完全重建。',
        en: 'First determine whether the source has selectable text. If a whole page selects as one image, the Word result usually depends on OCR and needs page-by-page proofing. A live text layer still does not guarantee that complex layouts will rebuild perfectly. Adobe describes export choices in its official guide (https://helpx.adobe.com/acrobat/using/export-pdf-overview.html).',
      },
      {
        zh: '把「視覺相同」與「可以編輯」分開驗收。Word 可能用文字方塊、表格或浮動圖片模擬原版面；它看似接近 PDF，卻不一定能讓你順利改寫段落、調整欄寬或重排頁面。',
        en: 'Separate visual similarity from editability. Word may simulate the PDF with text boxes, tables, or floating images. The page can look close while paragraphs remain difficult to rewrite, columns resist resizing, or page breaks become fragile.',
      },
      {
        zh: '先選一頁最能代表風險的樣本：雙欄文字、表格、腳註、圖片、頁首頁尾與特殊字型各挑一頁。小樣本能在整份文件處理前揭露工具是否適合，不必等到幾百頁完成才發現方向錯誤。',
        en: 'Choose representative risk pages before converting everything: a two-column page, a table, a footnote, an image, a header or footer, and unusual fonts. A small sample reveals whether the method fits before hundreds of pages are processed.',
      },
      {
        zh: '比較時要以原始 PDF 為基準，而不是只看 Word 預覽。逐段確認閱讀順序、標題層級、清單、頁碼與連結；對表格則檢查列欄是否仍能編輯，而非只比較邊框看起來像不像。',
        en: 'Compare with the source PDF rather than trusting the Word preview alone. Check reading order, heading levels, lists, page numbers, and links. For tables, verify that rows and columns can be edited instead of checking only whether the borders look similar.',
      },
      {
        zh: '圖片與掃描文字要分開處理。高解析度圖片可以保留外觀，卻不會自動產生可編輯文字；OCR 可能把 0 和 O、1 和 l 或表格欄位辨識錯。把需要修改的內容標出，必要時回到原始來源重打。',
        en: 'Treat images and scanned text separately. A high-resolution image preserves appearance but does not create editable words. OCR can confuse 0 with O, 1 with l, or merge table cells. Adobe explains the recognize-text workflow (https://helpx.adobe.com/acrobat/using/recognize-text.html); mark content that needs editing and retype from a trusted source when accuracy matters.',
      },
      {
        zh: '頁首頁尾、浮水印、註解與簽名是常見的隱性差異。轉換後要在不同頁面檢查它們是否被當成正文、重複出現或移到錯誤層級；若文件要簽署，不能只因文字正確就略過位置驗收。',
        en: 'Headers, footers, watermarks, annotations, and signatures are common hidden differences. Check several pages to see whether they became body text, duplicated, or moved to another layer. A signing workflow needs position checks, not just correct wording.',
      },
      {
        zh: '交付格式應依用途決定。若只需要引用或存檔，原 PDF 可能比轉換檔可靠；若需要編輯，交付 Word 時附上原檔與已知限制，並用版本日期命名。不要把可編輯誤說成完全等同原稿。',
        en: 'Choose the delivery format from the job. For citation or archive, the original PDF may be safer. For editing, include the source and known limits with the Word file and use a dated filename. Do not describe an editable copy as fully identical to the source.',
      },
    ],
    steps: [
      { zh: '確認 PDF 是否有文字層，並挑出雙欄、表格、圖片與掃描頁作樣本。', en: 'Check for a text layer and select sample pages with columns, tables, images, and scans.' },
      { zh: '保留原始檔，使用 PDF 轉 Word 工具輸出帶版本日期的副本。', en: 'Keep the original and export a dated copy with the PDF-to-Word tool.' },
      { zh: '逐頁比較標題、段落順序、清單、頁碼、頁首頁尾與連結。', en: 'Compare headings, reading order, lists, page numbers, headers, footers, and links page by page.' },
      { zh: '在表格中實際修改一個儲存格，確認列欄不是只用定位文字模擬。', en: 'Edit a table cell to confirm rows and columns are real editable structure, not positioned text.' },
      { zh: '放大檢查 OCR 文字、數字、符號、圖片、簽名與浮水印位置。', en: 'Zoom in on OCR text, numbers, symbols, images, signatures, and watermark positions.' },
      { zh: '在 Word 與 PDF 檢視器各開一次，檢查分頁、字型替代與列印預覽。', en: 'Open the result in Word and a PDF viewer and check page breaks, font substitutions, and print preview.' },
      { zh: '將原 PDF、Word 副本、驗收紀錄與已知限制一起保存後再交付。', en: 'Deliver only after saving the source, Word copy, acceptance notes, and known limitations together.' },
    ],
    example: {
      zh: '行政人員要修改一份 18 頁雙欄政策 PDF。團隊先測試一頁雙欄、一頁表格和一頁掃描簽名，發現表格可編輯但簽名被當成圖片移位。最後保留原 PDF，將 Word 只用於改寫正文，並在交付說明標出簽名頁必須回看原檔。',
      en: 'An administrator must edit an 18-page two-column policy PDF. A sample of one column page, one table, and one scanned signature shows that the table is editable but the signature shifts as an image. The team keeps the PDF, uses Word for body edits only, and flags the signature page for source review.',
    },
    commonMistakes: [
      { zh: '看到 Word 能開啟就當成轉換完成。', en: 'Treating a Word file that opens as proof that conversion is complete.' },
      { zh: '只比較截圖，不實際修改段落或表格。', en: 'Comparing screenshots without editing a paragraph or table.' },
      { zh: '把 OCR 辨識文字當成不需要校對的原文。', en: 'Assuming OCR text needs no proofreading.' },
      { zh: '忽略頁首頁尾、浮水印、註解和簽名位置。', en: 'Ignoring headers, footers, watermarks, annotations, and signatures.' },
      { zh: '用轉換後的 Word 取代唯一的原始 PDF。', en: 'Replacing the only source PDF with the converted Word file.' },
      { zh: '宣稱版面百分之百相同，卻沒有測列印與字型替代。', en: 'Claiming a perfect match without testing printing or font substitution.' },
    ],
    faq: [
      { question: { zh: 'PDF 轉 Word 後一定可以編輯嗎？', en: 'Is a PDF-to-Word result always editable?' }, answer: { zh: '不一定。文字層、掃描影像、表格與浮動物件會影響可編輯性；先用代表頁測試，再決定是否適合你的修改工作。', en: 'No. Text layers, scans, tables, and floating objects affect editability. Test representative pages before deciding whether the result fits your editing task.' } },
      { question: { zh: '為什麼轉成 Word 後雙欄順序亂了？', en: 'Why do two columns appear in the wrong order?' }, answer: { zh: '轉換器需要推測閱讀順序，複雜欄位、圖片或註解可能讓推測失敗。逐頁與原 PDF 對照，必要時把內容拆成可重排的段落。', en: 'The converter must infer reading order, and columns, images, or annotations can confuse it. Compare page by page and rebuild content into reorderable paragraphs when needed.' } },
      { question: { zh: '掃描 PDF 轉 Word 要不要用 OCR？', en: 'Should a scanned PDF use OCR?' }, answer: { zh: '若需要搜尋或修改文字通常需要，但 OCR 不是零錯誤。數字、專有名詞、表格與簽名頁應特別校對，重要內容可直接依可信來源重打。', en: 'Usually yes when search or editing is required, but OCR is not error-free. Proof numbers, names, tables, and signature pages, and retype critical text from a trusted source.' } },
      { question: { zh: '交付 Word 後還要附 PDF 嗎？', en: 'Should I include the PDF with the Word file?' }, answer: { zh: '若版面、引用或簽署仍重要，建議保留並一併提供。Word 是工作副本，不應取代可追溯的原始文件。', en: 'Include it when layout, citation, or signing still matters. Word is an editing copy and should not replace the traceable source document.' } },
    ],
    cta: {
      zh: '用 PDF 轉 Word 工具先做代表頁，再逐項驗收閱讀順序、表格、OCR 與頁面功能，保留原始 PDF 作為基準。',
      en: 'Test representative pages with the PDF-to-Word tool, verify order, tables, OCR, and page features, and keep the original PDF as the baseline.',
    },
    updatedAt: '2026-09-03',
    noFaqSchema: true,
  },
  {
    id: 'pdf-table-to-excel-header-check-guide',
    locales: ['zh', 'en'],
    slug: 'pdf-table-to-excel-header-check-guide',
    title: {
      zh: 'PDF 表格轉 Excel 欄位與數值驗收指南',
      en: 'PDF Table to Excel Validation Guide',
    },
    metaTitle: {
      zh: 'PDF 表格轉 Excel 後怎麼檢查？欄位、數字與合併儲存格',
      en: 'PDF Table to Excel: Validate Fields',
    },
    metaDescription: {
      zh: 'PDF 表格轉 Excel 後，先核對欄位名稱、列數、合併儲存格、負號、小數與日期，再用總和與代表列比對原稿；不要因為資料能貼到試算表就直接拿去分析或匯入。',
      en: 'After converting a PDF table to Excel, validate headers, row counts, merged cells, signs, decimals, and dates against the source before analysis or import.',
    },
    h1: {
      zh: 'PDF 表格轉 Excel 後怎麼驗收：欄位、數字與匯入前檢查',
      en: 'How to Validate a PDF Table Converted to Excel Before Analysis',
    },
    category: { zh: 'PDF 工作流程', en: 'PDF workflows' },
    priority: 52,
    searchIntent: {
      zh: '使用者想把 PDF 報表或表格轉成 Excel，擔心欄位錯位、合併儲存格、負數、小數和日期被誤讀，想在分析或匯入前找出錯誤。',
      en: 'A user converts a PDF report or table to Excel and needs to catch shifted columns, merged cells, negative numbers, decimals, and dates before analysis or import.',
    },
    targetKeywords: [
      { zh: 'PDF 表格轉 Excel 檢查', en: 'validate PDF table to Excel' },
      { zh: 'PDF 轉 Excel 欄位錯位', en: 'PDF to Excel columns shifted' },
      { zh: 'PDF 表格數字辨識錯誤', en: 'PDF table number conversion errors' },
    ],
    relatedToolIds: ['pdf-table-to-excel', 'csv-to-json', 'pdf-to-image'],
    relatedGuideIds: ['csv-to-json-header-duplicate-column-guide', 'pdf-to-word-layout-fidelity-guide', 'pdf-to-image-raster-text-search-guide'],
    relatedWorkflowIds: ['office-document-toolkit'],
    summary: {
      zh: '表格轉換的風險在於欄位意義和數值型別可能改變，而不是檔案能否開啟。先用原始 PDF 對照欄位、列數與代表數字，再讓 Excel 進入分析流程。',
      en: 'The main risk in table conversion is changed column meaning or numeric type, not whether the workbook opens. Compare fields, rows, and representative values with the PDF before analysis.',
    },
    problem: {
      zh: 'PDF 表格常含多行標題、跨欄標題、合併儲存格、千分位、負號、括號、百分比與頁尾合計。轉換器可能把視覺位置當成欄位，造成一列少欄、數字變文字或標題重複。',
      en: 'PDF tables often contain multi-line headers, merged cells, thousands separators, parentheses, percentages, and page totals. A converter may treat visual positions as fields, creating short rows, numeric text, or duplicate headers.',
    },
    whoShouldUse: {
      zh: '適合整理財務報表、研究資料、成績表、庫存清單、發票明細與任何要從 PDF 進入 Excel、CSV 或資料庫的使用者。',
      en: 'Useful for financial reports, research tables, grade sheets, inventory lists, invoices, and any workflow moving PDF data into Excel, CSV, or a database.',
    },
    explanation: [
      {
        zh: '先確認 PDF 的表格是文字型還是掃描影像型。文字型表格可保留字元但仍可能失去欄位邊界；掃描型需要 OCR，數字、負號和小數點必須用原稿逐格校對。',
        en: 'Determine whether the table is live text or a scanned image. Live text can still lose column boundaries; scanned tables require OCR, so digits, minus signs, and decimals need cell-level proofing against the source.',
      },
      {
        zh: '先建立欄位契約：每欄名稱、預期型別、允許空白與單位。不要只看第一列，因為跨頁表格可能在第二頁重複標題或少了某些欄位。',
        en: 'Write a field contract with each header, expected type, allowed blanks, and unit. Do not inspect only the first row; tables that span pages may repeat headers or omit a column later.',
      },
      {
        zh: '合併儲存格要先理解它代表的資料。視覺上跨三列的地區名稱，可能需要在 Excel 中填滿每列，也可能應保留為分組標籤；轉換器不應替你決定分析語意。',
        en: 'Interpret merged cells before filling them. A region label spanning three rows may need to repeat on every record for analysis, or remain a group label for presentation. The converter cannot decide that meaning for you.',
      },
      {
        zh: '數值欄位要分辨千分位、小數、百分比、貨幣與括號負數。`1,234`、`12.34%` 和 `(500)` 在 Excel 中可能被當成文字或套用不同格式；先保留原始顯示，再建立明確的標準化欄位。',
        en: 'Distinguish thousands separators, decimals, percentages, currency, and parenthesized negatives. Excel may treat `1,234`, `12.34%`, and `(500)` as text or apply different formats. Microsoft Excel documentation (https://support.microsoft.com/en-us/excel) is a reference, but preserve the displayed value first and create an explicit normalized field.',
      },
      {
        zh: '日期與代碼不能只靠試算表自動辨識。發票號碼前導零、郵遞區號、月份文字與不同地區日期格式都可能被改寫；把識別碼保存為文字，把日期依來源格式記錄後再轉換。',
        en: 'Do not rely on spreadsheet auto-detection for dates or codes. Invoice IDs may lose leading zeros, month names vary, and regional date formats can be rewritten. Keep identifiers as text and document the source date format before normalizing it.',
      },
      {
        zh: '用總和、筆數與代表列做三層驗證。若原稿有頁尾合計，可與 Excel 的數值欄重算；但合計列、重複表頭與備註不能直接當成資料列，否則總和會被重複計算。',
        en: 'Use three checks: totals, counts, and representative rows. Recalculate a source total when available, but exclude page totals, repeated headers, and notes from data rows or the sum will be inflated.',
      },
      {
        zh: '轉換完成後再決定要不要輸出 CSV 或 JSON。先在 Excel 內確認欄位唯一、型別一致與空值規則，再連到 CSV 轉 JSON 指南的清理流程；不要把錯誤的試算表直接放大成整批資料。',
        en: 'Only export CSV or JSON after the workbook passes field, type, and blank-value checks. RFC 4180 (https://www.rfc-editor.org/rfc/rfc4180) is a useful CSV reference; then follow the CSV-to-JSON cleanup guidance and do not multiply a wrong spreadsheet into a whole dataset.',
      },
    ],
    steps: [
      { zh: '確認表格是文字型或掃描型，保留原始 PDF 與頁碼範圍。', en: 'Classify the table as live text or scanned and keep the source PDF with page ranges.' },
      { zh: '列出每欄名稱、資料型別、單位、允許空白與預期列數。', en: 'List each header, type, unit, blank rule, and expected row count.' },
      { zh: '用 PDF 表格轉 Excel 工具輸出副本，不覆蓋原始檔。', en: 'Export a copy with the PDF-table-to-Excel tool without overwriting the source.' },
      { zh: '核對多行標題、重複表頭、合併儲存格與欄位數。', en: 'Check multi-line headers, repeated headers, merged cells, and field count.' },
      { zh: '逐格抽查負數、小數、百分比、日期、代碼與前導零。', en: 'Sample negatives, decimals, percentages, dates, codes, and leading zeros cell by cell.' },
      { zh: '比較資料筆數、頁尾合計與 Excel 重算結果，排除備註列。', en: 'Compare row count, page totals, and Excel recalculation while excluding notes.' },
      { zh: '通過驗收後才另存 CSV／JSON，並保存轉換設定與差異。', en: 'Export CSV or JSON only after acceptance and save settings plus the differences.' },
    ],
    example: {
      zh: '研究助理要把 6 頁 PDF 銷售表轉成 Excel。抽查發現第二頁重複表頭被當成資料、括號負數變成文字、產品代碼前導零消失。團隊排除表頭、把代碼設為文字、以原稿合計重算並保存一份未標準化欄位，確認後才匯入分析。',
      en: 'A research assistant converts a six-page sales table to Excel. The sample shows a repeated header counted as data, parenthesized negatives stored as text, and leading zeros removed from product codes. The team excludes headers, keeps codes as text, reconciles a source total, and imports only after acceptance.',
    },
    commonMistakes: [
      { zh: '看到表格線條完整就當成欄位一定正確。', en: 'Assuming intact grid lines mean the columns are correct.' },
      { zh: '把重複表頭、頁尾合計或備註列算進資料。', en: 'Counting repeated headers, page totals, or notes as data.' },
      { zh: '讓 Excel 自動把代碼、日期或百分比改寫。', en: 'Letting Excel rewrite codes, dates, or percentages automatically.' },
      { zh: '忽略合併儲存格的分析語意，直接向下填滿。', en: 'Filling merged cells down without deciding their analytical meaning.' },
      { zh: '只抽查第一頁，沒有檢查跨頁欄位與最後幾列。', en: 'Checking only page one and missing cross-page fields or final rows.' },
      { zh: '驗收前就輸出 CSV／JSON，將一個錯誤放大成整批資料。', en: 'Exporting CSV or JSON before acceptance and multiplying one error into a dataset.' },
    ],
    faq: [
      { question: { zh: 'PDF 表格轉 Excel 後可以直接分析嗎？', en: 'Can I analyze an Excel file immediately after PDF conversion?' }, answer: { zh: '不建議。先核對欄位、列數、數值型別、日期與合計，因為檔案能開啟不代表資料語意正確。', en: 'Not safely. Validate fields, rows, types, dates, and totals first; a workbook opening does not prove its data meaning is correct.' } },
      { question: { zh: '為什麼 PDF 表格轉 Excel 後欄位會錯位？', en: 'Why do columns shift after converting a PDF table?' }, answer: { zh: 'PDF 儲存的是版面位置，轉換器要推測欄位邊界；多行文字、合併儲存格與掃描影像都可能讓推測失敗。', en: 'PDF stores layout positions, so the converter must infer boundaries. Multi-line text, merged cells, and scans can make that inference fail.' } },
      { question: { zh: '負數括號要怎麼檢查？', en: 'How should I check parenthesized negatives?' }, answer: { zh: '把原稿的 `(500)`、`-500` 與 Excel 儲存值分開比對，確認它是數字而非文字，並在重算合計時納入正確符號。', en: 'Compare `(500)`, `-500`, and the Excel value separately. Confirm it is numeric rather than text and that recalculated totals use the correct sign.' } },
      { question: { zh: '轉換後要保留原 PDF 嗎？', en: 'Should I keep the source PDF after conversion?' }, answer: { zh: '要。原 PDF 是欄位、數字與版面爭議時的對照基準，也能讓日後重新轉換有可追溯來源。', en: 'Yes. The PDF is the baseline for disputed fields, numbers, and layout, and it makes future re-conversion traceable.' } },
    ],
    cta: {
      zh: '用 PDF 表格轉 Excel 工具先處理副本，依欄位契約、列數、數值與合計逐層驗收，再進入 CSV 或 JSON 流程。',
      en: 'Convert a copy with the PDF-table-to-Excel tool, validate fields, rows, values, and totals, then continue to CSV or JSON workflows.',
    },
    updatedAt: '2026-09-03',
    noFaqSchema: true,
  },
  {
    id: 'pdf-to-word-review-track-changes-guide',
    locales: ['zh', 'en'],
    slug: 'pdf-to-word-review-track-changes-guide',
    title: {
      zh: 'PDF 轉 Word 後的修訂與協作驗收指南',
      en: 'PDF to Word Review Guide',
    },
    metaTitle: {
      zh: 'PDF 轉 Word 後怎麼開修訂？轉換、審稿與交付流程',
      en: 'PDF to Word: Review Changes and Comments',
    },
    metaDescription: {
      zh: '把 PDF 轉成 Word 只是第一步；本指南說明如何保留原檔、建立工作副本、開啟修訂與留言、逐頁對照版面，並在交付前清除未處理的變更與私人資訊。',
      en: 'Convert a PDF to Word, keep the source, review with comments and tracked changes, compare pages, and prepare a clean handoff.',
    },
    h1: {
      zh: 'PDF 轉 Word 後如何審稿與交付：修訂、留言和原稿對照流程',
      en: 'How to Review and Handoff a PDF-to-Word Conversion',
    },
    category: { zh: 'PDF 工作流程', en: 'PDF workflows' },
    priority: 53,
    searchIntent: {
      zh: '使用者已把 PDF 轉成 Word，接下來要與同事審稿或修改，想知道如何使用修訂與留言、避免直接覆寫原稿，並確認交付檔沒有遺漏轉換錯誤。',
      en: 'A user already converted a PDF to Word and needs a safe review workflow with colleagues, including comments, tracked changes, source comparison, and a clean final handoff.',
    },
    targetKeywords: [
      { zh: 'PDF 轉 Word 修訂追蹤', en: 'track changes after PDF to Word' },
      { zh: 'PDF 轉 Word 審稿流程', en: 'review PDF to Word conversion' },
      { zh: 'Word 留言比較 PDF', en: 'use Word comments to review PDF conversion' },
    ],
    relatedToolIds: ['pdf-to-word', 'pdf-to-image'],
    relatedGuideIds: ['pdf-to-word-layout-fidelity-guide', 'pdf-to-image-raster-text-search-guide', 'merge-pdf-reading-order-checklist-guide'],
    relatedWorkflowIds: ['office-document-toolkit'],
    summary: {
      zh: '轉換後的 Word 應被視為可追蹤的工作副本，而不是新的唯一正本。把版面驗收、文字修訂、留言決策與最後清稿拆成不同階段，才能知道錯誤來自 PDF 轉換還是後續編輯。',
      en: 'Treat the converted Word file as a traceable working copy, not a replacement for the source. Separate layout acceptance, editorial revisions, comment decisions, and final cleanup so conversion defects are not confused with later edits.',
    },
    problem: {
      zh: '若多人直接在轉換檔上改字，原本的轉換錯誤、編輯意見與已核准內容會混在一起。最後即使文字看似正確，也可能無法追溯誰改了什麼，或把未接受的留言一起交給外部收件人。',
      en: 'When several people edit a converted file directly, conversion defects, editorial suggestions, and approved text become indistinguishable. A document may look correct yet lack an audit trail or expose unresolved comments to the recipient.',
    },
    whoShouldUse: {
      zh: '適合行政、法務、研究、教育與內容團隊在 PDF 轉 Word 後共同校稿，也適合需要把可編輯副本交給客戶但仍要保留原始證據的工作。',
      en: 'Useful for administrative, legal, research, education, and content teams reviewing a converted Word copy, especially when an editable file must be shared while the source remains authoritative.',
    },
    explanation: [
      {
        zh: '先建立檔案角色：原始 PDF 是來源、轉換後的 Word 是工作副本、清稿後的 Word 是交付候選。用檔名或資料夾明確區分，避免同事把尚未驗收的檔案當成正式版本。',
        en: 'Define file roles first: the original PDF is the source, the converted Word file is the working copy, and the cleaned Word file is a delivery candidate. Separate them by names or folders so an unverified file is not mistaken for the final version.',
      },
      {
        zh: '版面驗收要在編輯前完成。先用代表頁確認閱讀順序、表格、圖片、頁首頁尾與字型，再開啟修訂；否則後續每一個排版補救都會變成修訂紀錄，難以判斷原始轉換品質。',
        en: 'Accept the layout before editorial work begins. Check reading order, tables, images, headers, footers, and fonts on representative pages, then enable review. Otherwise every layout repair becomes a tracked edit and hides the original conversion quality.',
      },
      {
        zh: '修訂與留言用途不同。修訂代表實際改動，留言代表問題、理由或待辦事項；不要用刪除文字加留言假裝已完成，也不要把重要決策只放在聊天訊息裡。',
        en: 'Tracked changes and comments serve different purposes. A change records an actual edit; a comment records a question, reason, or follow-up. Do not mark work complete with a comment alone or leave critical decisions only in chat. Microsoft documents these separate review features in its official Word guidance (https://support.microsoft.com/en-us/word/track-changes-and-view-add-or-edit-comments).',
      },
      {
        zh: '設定修訂範圍時要先約定誰需要被追蹤。多人協作可以選擇追蹤所有作者，也可以只追蹤自己的修改；團隊應在文件開頭記下規則，避免有人以為已記錄而實際上沒有。',
        en: 'Agree on who should be tracked before editing. A team may track everyone or only the current author, but the rule should be written in the review note so nobody assumes an edit was recorded when it was not.',
      },
      {
        zh: '審稿順序應從高風險項目開始：數字、日期、法規用語、表格合計、簽名欄與連結。這些內容一旦轉換或改寫錯誤，影響通常比一般標點更大，應用原始 PDF 逐項核對。',
        en: 'Review high-risk items first: numbers, dates, legal wording, table totals, signature fields, and links. A conversion or edit error in these items matters more than ordinary punctuation, so compare each with the source PDF.',
      },
      {
        zh: '接受修訂前先處理留言。留言可能解釋為什麼某個數字不能改、哪個段落需要回到原始來源；若先批次接受修訂再回頭找留言，決策脈絡可能已經消失。',
        en: 'Resolve comments before accepting changes in bulk. A comment may explain why a number must stay or why a paragraph needs a trusted source. Accepting everything first can destroy the context behind the decision.',
      },
      {
        zh: '交付前要做一次「看不到標記」的清稿檢查，再做一次「顯示所有標記」的殘留檢查。確認沒有未決修訂、留言、隱藏文字或不該外流的檔案屬性，並保留一份含修訂的內部紀錄。',
        en: 'Before handoff, inspect the clean view and then the all-markup view. Confirm there are no unresolved changes, comments, hidden text, or inappropriate document properties, while retaining an internal copy with the review history.',
      },
    ],
    steps: [
      { zh: '保留原始 PDF，建立帶日期與版本號的 Word 工作副本。', en: 'Keep the source PDF and create a dated, versioned Word working copy.' },
      { zh: '先用代表頁完成版面、文字順序、表格與圖片驗收。', en: 'Accept layout, reading order, tables, and images on representative pages first.' },
      { zh: '在文件開頭記下審稿人、修訂範圍、來源版本與交付條件。', en: 'Record reviewers, tracking scope, source version, and handoff conditions at the top.' },
      { zh: '開啟修訂，使用留言標記問題與待查來源，不用留言取代實際改字。', en: 'Turn on tracking and use comments for questions or sources, not as a substitute for edits.' },
      { zh: '依高風險清單逐項對照 PDF，測試表格、連結、頁碼與簽名欄。', en: 'Compare the high-risk checklist with the PDF and test tables, links, page numbers, and signature fields.' },
      { zh: '逐一回覆或解決留言，再接受或拒絕修訂並記下理由。', en: 'Resolve comments one by one, then accept or reject changes with a recorded reason.' },
      { zh: '用清稿與所有標記兩種檢視完成最後檢查，分開保存內部紀錄與交付檔。', en: 'Run the final clean and all-markup checks, saving the internal record separately from the handoff file.' },
    ],
    example: {
      zh: '研究團隊把 24 頁政策 PDF 轉成 Word，三人分工校稿。先驗收雙欄頁與表格，再約定所有人開啟修訂；數字疑問用留言連回 PDF 頁碼，最後由負責人逐一處理留言、清除標記並另存交付檔，含修訂版本則留在內部資料夾。',
      en: 'A research team converts a 24-page policy PDF to Word. After accepting sample columns and tables, all three reviewers turn on tracking; number questions cite PDF page numbers in comments. The owner resolves each comment, creates a clean handoff file, and keeps the marked-up copy internally.',
    },
    commonMistakes: [
      { zh: '直接在原始轉換檔上覆寫，沒有保留 PDF 與工作副本。', en: 'Overwriting the converted file without keeping the PDF and a working copy.' },
      { zh: '編輯開始後才檢查版面，導致轉換錯誤和排版修補混在一起。', en: 'Checking layout only after editing has mixed conversion defects with repairs.' },
      { zh: '把留言當成已完成的修改，實際文字卻沒有更新。', en: 'Treating a comment as a completed edit when the text was never changed.' },
      { zh: '批次接受所有修訂，沒有先閱讀數字或法規用語的留言。', en: 'Accepting every change before reading comments about numbers or legal wording.' },
      { zh: '只用無標記檢視交付，沒有確認未決修訂和隱藏內容。', en: 'Delivering from a clean view without checking unresolved changes or hidden content.' },
      { zh: '把含內部留言、作者姓名或修訂紀錄的檔案寄給外部收件人。', en: 'Sending internal comments, author names, or revision history to an external recipient.' },
    ],
    faq: [
      { question: { zh: 'PDF 轉 Word 後要先開修訂還是先驗收版面？', en: 'Should I enable Track Changes before checking layout?' }, answer: { zh: '先驗收代表頁再開修訂較容易追蹤。若先修排版，後續很難分辨哪些是轉換錯誤、哪些是編輯決定。', en: 'Accept representative pages first, then enable tracking. Otherwise it is hard to distinguish conversion defects from editorial decisions.' } },
      { question: { zh: '留言可以取代修訂嗎？', en: 'Can comments replace tracked changes?' }, answer: { zh: '不行。留言適合說明問題或理由，真正的文字、數字或格式變更仍應透過修訂留下可接受或拒絕的紀錄。', en: 'No. Comments explain a question or reason; actual text, number, or format edits should remain as changes that can be accepted or rejected.' } },
      { question: { zh: '交付前要刪掉所有修訂嗎？', en: 'Should all tracked changes be removed before handoff?' }, answer: { zh: '依收件人需求決定，但應另存清稿並保留內部含修訂版本；不要為了清稿而失去審查紀錄。', en: 'It depends on the recipient, but save a clean copy and retain an internal marked-up copy so the review trail is not lost.' } },
      { question: { zh: '怎麼確認 Word 沒有把 PDF 的錯誤一起交出去？', en: 'How do I make sure PDF conversion errors are not handed off?' }, answer: { zh: '用原始 PDF 對照高風險項目，並在清稿與所有標記檢視各看一次；檔案能開啟不等於內容已驗收。', en: 'Compare high-risk items with the source PDF and inspect both clean and all-markup views. A file opening does not prove its contents were accepted.' } },
    ],
    cta: {
      zh: '先用 PDF 轉 Word 工具建立可追蹤副本，再配合原稿對照、修訂與留言完成安全的共同審稿。',
      en: 'Create a traceable copy with the PDF-to-Word tool, then combine source comparison, tracked changes, and comments for a safe collaborative review.',
    },
    updatedAt: '2026-09-03',
    noFaqSchema: true,
  },
  {
    id: 'pdf-compressor-email-attachment-guide',
    locales: ['zh', 'en'],
    slug: 'pdf-compressor-email-attachment-guide',
    title: {
      zh: 'PDF 壓縮寄信與上傳容量驗收指南',
      en: 'Compress PDF for Email and Upload',
    },
    metaTitle: {
      zh: 'PDF 太大寄不出去怎麼辦？壓縮後容量與清晰度檢查',
      en: 'Compress PDF for Email and Upload',
    },
    metaDescription: {
      zh: 'PDF 壓縮不是只把檔案變小：先確認收件平台的總容量、選擇品質模式、保留文字與連結，再用實際附件或上傳流程驗證，不要用模糊掃描換取幾 MB。',
      en: 'Compress a PDF for email or upload: confirm the limit, preserve readable text and links, and test the real attachment flow.',
    },
    h1: {
      zh: 'PDF 太大寄不出去怎麼辦：壓縮、附件限制與清晰度驗收流程',
      en: 'How to Compress a PDF for Email Without Losing Usable Quality',
    },
    category: { zh: 'PDF 工作流程', en: 'PDF workflows' },
    priority: 54,
    searchIntent: {
      zh: '使用者需要把 PDF 寄信或上傳到表單，遇到檔案太大，想知道應該壓到多少、如何避免文字模糊，以及壓縮後怎麼確認附件真的能送出。',
      en: 'A user must email or upload a PDF that is too large and wants a target size, a way to preserve readable text, and a repeatable check that the final attachment really works.',
    },
    targetKeywords: [
      { zh: 'PDF 壓縮 寄信 附件太大', en: 'compress PDF for email attachment' },
      { zh: 'PDF 壓縮後模糊怎麼辦', en: 'PDF blurry after compression' },
      { zh: 'PDF 上傳容量限制', en: 'PDF upload size limit' },
    ],
    relatedToolIds: ['pdf-compressor', 'pdf-to-image', 'pdf-to-word'],
    relatedGuideIds: ['image-compression-quality-size-guide', 'pdf-to-image-resolution-guide', 'pdf-to-word-layout-fidelity-guide'],
    relatedWorkflowIds: ['office-document-toolkit'],
    summary: {
      zh: '正確的壓縮目標是「在平台限制內仍能完成工作」，不是追求最低檔案大小。先取得收件平台的限制，再以文字、圖片、表格與連結為驗收點，最後用實際上傳流程確認。',
      en: 'The right target is a file that works within the platform limit, not the smallest possible PDF. Start with the recipient limit, validate text, images, tables, and links, and finish with the real upload flow.',
    },
    problem: {
      zh: 'PDF 可能因掃描圖片、嵌入字型、透明效果或重複物件而變大；只調低品質常讓文字與細線先失去可讀性。不同平台還可能把超過限制的附件改成雲端連結，讓收件人權限與下載路徑變成另一個風險。',
      en: 'Scans, embedded fonts, transparency, and duplicated objects can make a PDF large. Simply lowering quality often damages text and fine lines first. Platforms may also replace oversized attachments with cloud links, adding permission and download-path risks.',
    },
    whoShouldUse: {
      zh: '適合寄送掃描合約、課程講義、投標文件、作品集、發票或報告的人，也適合要把 PDF 放進求職表單、客服系統或政府線上申請的使用者。',
      en: 'Useful for sending scanned contracts, handouts, bids, portfolios, invoices, or reports, and for uploading PDFs to job, support, or government forms.',
    },
    explanation: [
      {
        zh: '先量測而不是猜測。記下原始檔案大小、頁數、紙張尺寸、是否含掃描圖片與收件平台限制；Gmail 個人帳戶的附件總大小上限目前為 25 MB，工作或學校帳戶可能由管理員設定，應以實際帳戶規則為準（https://support.google.com/mail/answer/6584?hl=zh-Hant）。',
        en: 'Measure before changing anything. Record the source size, page count, page dimensions, scans, and recipient limit. Gmail lists a 25 MB total attachment limit for personal accounts, while work or school limits may be set by an administrator, so verify the actual account rules (https://support.google.com/mail/answer/6584).',
      },
      {
        zh: '預留安全餘量，不要剛好壓到上限。郵件可能還包含其他附件，平台也可能用不同單位計算或在傳輸時加入編碼；把目標設在限制以下，並在實際撰寫郵件時重新看總大小。',
        en: 'Leave headroom instead of targeting the exact limit. A message may contain other attachments, and platforms may measure units or encoding differently. Set a target below the limit and recheck the total while composing the message.',
      },
      {
        zh: '先找出檔案的主要重量來源。文字型 PDF、向量圖和掃描圖片需要不同策略；若整份文件只有兩頁高解析掃描，降低所有頁面的品質會浪費清晰度，應優先處理最大的頁面或重複資源。',
        en: 'Identify what makes the file heavy. Text PDFs, vector art, and scanned images need different strategies. If only two pages contain high-resolution scans, degrading every page wastes clarity; start with the largest pages or repeated resources.',
      },
      {
        zh: '壓縮後要同時驗收「可讀」和「可用」。放大檢查最小字、表格線、條碼、簽名與圖片；另外測試文字搜尋、複製、連結、頁面旋轉與列印，因為檔案看起來變小不代表工作功能仍在。',
        en: 'Validate both readability and usability after compression. Zoom into the smallest text, table lines, barcodes, signatures, and images, then test search, copy, links, rotation, and printing. A smaller file is not necessarily a functional file.',
      },
      {
        zh: '如果來源是掃描文件，先判斷是否需要保留 OCR 文字層。把圖片壓得太低可能讓日後搜尋失效；若收件人只需視覺存檔，策略可以不同，但仍要保留一份未壓縮或高品質主檔。',
        en: 'For scans, decide whether the OCR text layer must remain. Excessive image reduction can break future search. An archive-only delivery may use another strategy, but keep an uncompressed or high-quality master.',
      },
      {
        zh: '平台的「超過限制」處理方式也要納入驗收。Gmail 可能把過大的檔案改成 Google Drive 連結；若文件含敏感資料，必須確認分享權限、有效期限與收件人是否能在不登入錯誤帳戶的情況下開啟。',
        en: 'Include the platform fallback in acceptance. Gmail may turn an oversized file into a Google Drive link; for sensitive documents, verify sharing permission, expiration, and whether the recipient can open it without the wrong account. Google explains the Drive fallback in its attachment guidance (https://support.google.com/a/users/answer/11339703).',
      },
      {
        zh: '最後用實際附件或表單做小型演練，而不是只看本機檔案屬性。確認上傳完成、郵件可以送出、收件端能下載並開啟，且檔名、頁數、連結與關鍵文字沒有在途中改變。',
        en: 'Finish with a small real-world rehearsal rather than relying on local file properties. Confirm upload completion, successful sending, recipient download and opening, and unchanged filename, page count, links, and critical text.',
      },
    ],
    steps: [
      { zh: '記下原始大小、頁數、內容類型與平台的總附件限制。', en: 'Record the source size, pages, content types, and total attachment limit.' },
      { zh: '設定低於平台上限的目標值，並保留原始主檔與一份工作副本。', en: 'Set a target below the limit and keep the master plus a working copy.' },
      { zh: '用 PDF 壓縮工具輸出兩個模式或品質版本，不覆蓋來源。', en: 'Export two modes or quality variants with the PDF compressor without overwriting the source.' },
      { zh: '比較檔案大小、最小文字、表格、圖片、條碼與簽名清晰度。', en: 'Compare size and the clarity of small text, tables, images, barcodes, and signatures.' },
      { zh: '測試搜尋、複製、連結、旋轉、列印與頁數是否正常。', en: 'Test search, copy, links, rotation, printing, and page count.' },
      { zh: '在實際郵件或表單中加入其他附件後，重新確認總大小與權限。', en: 'Recheck total size and permissions in the real email or form, including other attachments.' },
      { zh: '用測試收件人或草稿流程完成下載與開啟驗收，再交付正式檔案。', en: 'Use a test recipient or draft flow to verify download and opening before formal delivery.' },
    ],
    example: {
      zh: '求職者要上傳 42 MB 的掃描證明文件到表單，限制是 10 MB。團隊先保留主檔，找出三頁彩色掃描是主要容量來源，輸出兩個壓縮版本；選定仍能讀清證件號碼的 8.1 MB 版本，測試搜尋與頁數後再上傳，並在備註中標明檔案日期。',
      en: 'A job applicant must upload a 42 MB scanned certificate to a 10 MB form. The team keeps the master, finds three color-scan pages driving the size, and compares two variants. They choose the 8.1 MB copy that keeps ID numbers readable, test search and page count, then upload the dated file.',
    },
    commonMistakes: [
      { zh: '把目標設在平台上限整數，沒有預留其他附件與傳輸餘量。', en: 'Targeting the exact platform limit without room for other attachments or transport overhead.' },
      { zh: '一律調到最低品質，沒有先找出真正佔容量的頁面。', en: 'Using the lowest quality everywhere without finding the pages that actually add weight.' },
      { zh: '只看檔案大小，不檢查最小字、條碼、表格和簽名。', en: 'Checking only bytes and not small text, barcodes, tables, or signatures.' },
      { zh: '壓縮後覆蓋唯一的原始掃描檔，日後無法重新輸出。', en: 'Overwriting the only source scan and losing the ability to export again.' },
      { zh: '忽略 OCR、搜尋、連結或列印功能在壓縮後失效。', en: 'Ignoring broken OCR, search, links, or printing after compression.' },
      { zh: '看到平台改成雲端連結就直接寄出，沒有驗證分享權限。', en: 'Sending the cloud-link fallback without verifying sharing permissions.' },
    ],
    faq: [
      { question: { zh: 'PDF 壓到越小越好嗎？', en: 'Is the smallest PDF always the best one?' }, answer: { zh: '不是。應先符合平台容量，再以最小文字、表格、條碼與搜尋功能能否正常工作作為品質底線。', en: 'No. Meet the platform size with a quality floor based on small text, tables, barcodes, and required search or link functions.' } },
      { question: { zh: 'Gmail 附件超過限制會怎樣？', en: 'What happens when a Gmail attachment exceeds the limit?' }, answer: { zh: '個人帳戶通常會改用 Google Drive 連結，但工作或學校帳戶規則可能不同；寄出前要確認連結權限與收件者能否開啟。', en: 'Personal Gmail generally falls back to a Google Drive link, but work or school rules may differ. Verify link permissions and recipient access before sending.' } },
      { question: { zh: '掃描 PDF 壓縮後文字模糊怎麼辦？', en: 'What if scanned text becomes blurry after compression?' }, answer: { zh: '回到原始主檔，先只處理最大或不必要的圖片，再以證件號碼、細字和條碼做放大比較；不要反覆壓縮同一副本。', en: 'Return to the master, target the largest or unnecessary images, and compare ID numbers, small text, and barcodes at zoom. Do not repeatedly compress one copy.' } },
      { question: { zh: '壓縮後要不要重新下載測試？', en: 'Should I download and test the compressed file again?' }, answer: { zh: '要。實際附件或表單流程可能重新處理檔案；用測試收件人下載並開啟，才能驗證交付端的檔案仍可用。', en: 'Yes. An email or form may process the file again. Download and open it as a test recipient to verify the delivered copy still works.' } },
    ],
    cta: {
      zh: '用 PDF 壓縮工具先輸出比較版本，按照平台限制、關鍵細節與實際附件流程逐項驗收，再交付低容量但仍可工作的檔案。',
      en: 'Create comparison variants with the PDF compressor, validate limits, critical detail, and the real attachment flow, then deliver a compact but usable file.',
    },
    updatedAt: '2026-09-03',
    noFaqSchema: true,
  },
  {
    id: 'merge-pdf-bookmarks-navigation-guide',
    locales: ['zh', 'en'],
    slug: 'merge-pdf-bookmarks-navigation-guide',
    title: {
      zh: '合併 PDF 書籤與導航驗收指南',
      en: 'Merged PDF Bookmarks and Navigation Guide',
    },
    metaTitle: {
      zh: '合併 PDF 後怎麼保留書籤？目錄、連結與導航檢查',
      en: 'Merged PDF: Check Bookmarks, Links & Navigation',
    },
    metaDescription: {
      zh: '合併 PDF 後不要只確認頁面順序；逐項檢查書籤層級、目錄連結、頁面標籤與外部連結，並用實際讀者路徑驗證合併檔仍能快速找到章節與附件，方便閱讀。',
      en: 'After merging PDFs, check bookmark hierarchy, table-of-contents links, page labels, and external links so readers can still navigate to the right section.',
    },
    h1: {
      zh: '合併 PDF 後如何檢查書籤與導航：讓讀者找得到章節',
      en: 'How to Check Bookmarks and Navigation After Merging PDFs',
    },
    category: { zh: 'PDF 工作流程', en: 'PDF workflows' },
    priority: 55,
    searchIntent: {
      zh: '使用者已合併多個 PDF，發現書籤、目錄連結或頁碼可能失效，想知道如何在交付前檢查章節導航，而不是只確認檔案能開啟。',
      en: 'A user merged several PDFs and needs to verify bookmarks, table-of-contents links, and page labels before delivery instead of checking only that the file opens.',
    },
    targetKeywords: [
      { zh: '合併 PDF 書籤', en: 'bookmarks after merging PDF' },
      { zh: 'PDF 目錄連結失效', en: 'PDF table of contents links broken' },
      { zh: 'PDF 導航檢查', en: 'check PDF navigation' },
    ],
    relatedToolIds: ['merge-pdf', 'pdf-page-reorder', 'pdf-to-image'],
    relatedGuideIds: ['merge-pdf-reading-order-checklist-guide', 'merge-pdf-page-size-orientation-guide', 'pdf-to-image-raster-text-search-guide'],
    relatedWorkflowIds: ['office-document-toolkit'],
    summary: {
      zh: '合併 PDF 會重建頁面位置，但不一定能自動重建原本的書籤與目錄目標。把章節樹、頁面標籤、內外部連結和讀者任務分開驗收，才能交付真正可導航的文件。',
      en: 'Merging PDFs rebuilds page positions but may not rebuild bookmarks or table-of-contents targets. Validate the outline, page labels, internal and external links, and reader tasks separately.',
    },
    problem: {
      zh: '每份來源 PDF 可能都有自己的書籤層級、頁碼起點與目錄連結。合併後若只保留其中一份導航樹，其他章節會變成沒有入口的頁面；若頁面被重新排序，舊連結也可能指到錯誤位置。',
      en: 'Each source PDF may have its own outline, page numbering, and link targets. A merge that keeps only one outline leaves other sections without an entry point, and reordering pages can send old links to the wrong place.',
    },
    whoShouldUse: {
      zh: '適合合併課程講義、研究附件、投標文件、操作手冊、年度報告與多份客戶交付檔的人，也適合需要快速跳轉章節的長篇 PDF 讀者。',
      en: 'Useful for merging handouts, research appendices, bids, manuals, annual reports, or client deliverables that readers must navigate quickly.',
    },
    explanation: [
      {
        zh: '先畫出來源清單和章節樹。記下每份 PDF 的檔名、版本、頁數、第一層章節與頁碼標籤，再決定合併檔要採來源名稱、主題或層級作為書籤文字，不要讓工具替你隨機命名。',
        en: 'Map the source files and outline first. Record each filename, version, page count, top-level sections, and page labels, then decide whether merged bookmarks use source names, topics, or hierarchy instead of accepting random names.',
      },
      {
        zh: '分辨「頁面順序」和「導航順序」。文件可能依合約附件順序合併，但讀者需要先看摘要再跳到附件；書籤可以提供另一條閱讀路徑，不能用目錄樹掩蓋頁面順序錯誤。',
        en: 'Separate page order from navigation order. A contract may merge in attachment order while readers need a summary first. Bookmarks can offer another path, but they cannot hide a wrong physical page order.',
      },
      {
        zh: '書籤目標要指向真正的頁面視圖，而不是只顯示章節文字。合併或刪頁後，原本的頁碼可能改變；Adobe 說明書籤可連到文件中的位置、另一份文件或網頁，驗收時應確認每個目標是否仍是預期內容（https://helpx.adobe.com/acrobat/using/page-thumbnails-bookmarks-pdfs.html）。',
        en: 'A bookmark target must land on the intended page view, not merely display a chapter label. Page numbers can change after merging or deleting. Adobe notes that bookmarks can target a location, another document, or a web page; verify each target still reaches the intended content (https://helpx.adobe.com/acrobat/using/page-thumbnails-bookmarks-pdfs.html).',
      },
      {
        zh: '目錄中的相對頁碼、頁面標籤和檢視器索引可能不是同一套數字。對照時同時記錄檔案頁序、印刷頁碼與檢視器顯示，並用點擊結果驗證，而不是靠心算加減。',
        en: 'Printed page numbers, PDF page labels, and viewer indexes may be different systems. Record all three while checking and verify by clicking the target instead of relying on mental arithmetic.',
      },
      {
        zh: '外部連結和跨文件連結是另一種風險。來源檔可能指向舊版本附件或本機路徑；合併後要測試網址、相對檔案、權限與離線情境，必要時改成明確的交付說明。',
        en: 'External and cross-document links add another risk. A source may point to an old attachment or local path. Test URLs, relative files, permissions, and offline behavior, and replace fragile targets with explicit delivery notes when needed.',
      },
      {
        zh: '長文件應用讀者任務做抽樣，而不是逐一點完所有書籤。挑選首頁、每個第一層章節、最深層節點、目錄、附件和最後一頁，記錄點擊後的章節標題與頁面內容。',
        en: 'For a long file, sample reader tasks instead of clicking every bookmark. Check the cover, each top-level section, the deepest node, the table of contents, appendices, and final page, recording the landed heading and content.',
      },
      {
        zh: '交付前保留一份不含失效連結的清單。若某個來源書籤無法移植，應在驗收紀錄標明限制並移除誤導入口；不要保留看似可點擊、實際跳到錯頁的導航。',
        en: 'Keep a delivery checklist with no unresolved links. If a source bookmark cannot be migrated, document the limitation and remove the misleading entry instead of keeping a clickable item that lands on the wrong page.',
      },
    ],
    steps: [
      { zh: '列出來源檔案、版本、頁數、章節和頁面標籤。', en: 'List source files, versions, pages, sections, and page labels.' },
      { zh: '使用 PDF 合併工具依已確認的順序輸出副本。', en: 'Export a copy in the confirmed order with the merge PDF tool.' },
      { zh: '檢查書籤樹是否涵蓋每份來源與預期的層級。', en: 'Check that the bookmark tree covers every source and expected level.' },
      { zh: '點擊目錄、第一層與最深層書籤，記錄實際落點。', en: 'Click the table of contents, top-level, and deepest bookmarks and record the landing pages.' },
      { zh: '分開測試印刷頁碼、PDF 頁面標籤、內部與外部連結。', en: 'Test printed numbers, PDF labels, internal links, and external links separately.' },
      { zh: '用首頁、摘要、附件和最後一頁做讀者任務抽樣。', en: 'Sample reader tasks from the cover, summary, appendices, and final page.' },
      { zh: '保存合併檔、來源清單、導航驗收紀錄與已知限制再交付。', en: 'Save the merged file, source list, navigation checks, and known limits before handoff.' },
    ],
    example: {
      zh: '團隊把報告正文、三份附件和修訂版合併成 86 頁 PDF。檢查時發現第二份附件的書籤仍指向合併前頁碼，目錄也把附件合計當成正文章節；團隊重建書籤層級、抽測每個附件入口並保留來源版本表後才寄出。',
      en: 'A team merges a report, three appendices, and a revision into an 86-page PDF. Checks show appendix bookmarks still use pre-merge positions and the contents list treats an appendix total as a body section. The team rebuilds the outline, samples each appendix entry, and records source versions before sending.',
    },
    commonMistakes: [
      { zh: '只看頁面順序，不檢查書籤樹和目錄落點。', en: 'Checking page order but not the outline or table-of-contents targets.' },
      { zh: '用印刷頁碼推算檢視器頁碼，沒有實際點擊驗證。', en: 'Inferring viewer indexes from printed numbers without clicking to verify.' },
      { zh: '保留指向舊附件、本機路徑或錯誤章節的跨文件連結。', en: 'Keeping links to old attachments, local paths, or wrong sections.' },
      { zh: '把每份來源的最高層書籤直接平鋪，失去章節脈絡。', en: 'Flattening every source outline and losing chapter context.' },
      { zh: '為了看起來完整而保留無法移植的失效書籤。', en: 'Keeping broken bookmarks merely to make the outline look complete.' },
      { zh: '交付前沒有保存來源版本與導航驗收紀錄。', en: 'Delivering without saving source versions and navigation acceptance notes.' },
    ],
    faq: [
      { question: { zh: '合併 PDF 後書籤一定會保留嗎？', en: 'Are bookmarks always preserved after merging PDFs?' }, answer: { zh: '不一定。工具和來源結構不同，書籤可能被合併、平鋪、遺失或指向舊頁面；要以實際點擊結果驗收。', en: 'No. Depending on the tool and source structure, bookmarks may merge, flatten, disappear, or keep old targets. Verify by clicking them.' } },
      { question: { zh: 'PDF 目錄頁碼和檢視器頁碼不同正常嗎？', en: 'Is it normal for printed and viewer page numbers to differ?' }, answer: { zh: '可能正常，但必須能清楚對應。記錄印刷頁碼、頁面標籤和檢視器索引，並確認目錄連結落在正確內容。', en: 'It can be normal, but the systems must map clearly. Record printed numbers, labels, and viewer indexes and verify the links land on the right content.' } },
      { question: { zh: '可以只保留目錄，不建立書籤嗎？', en: 'Can I keep only the table of contents and skip bookmarks?' }, answer: { zh: '短文件或許可以，但長文件在螢幕閱讀時需要可見的導航樹；依讀者任務決定，並至少測試目錄與章節入口。', en: 'For a short file perhaps, but long screen-read documents benefit from an outline. Decide from reader tasks and test at least the contents and section entries.' } },
      { question: { zh: '書籤跳錯頁要怎麼處理？', en: 'What should I do when a bookmark lands on the wrong page?' }, answer: { zh: '回到合併檔重新指定頁面視圖，或移除誤導入口並在驗收紀錄說明限制；不要把錯誤導航交給收件人自行猜。', en: 'Retarget the bookmark in the merged file, or remove the misleading entry and document the limitation. Do not make recipients guess.' } },
    ],
    cta: {
      zh: '用 PDF 合併工具輸出副本後，依章節樹、頁碼系統與讀者任務逐項點擊驗收，讓長文件真的找得到內容。',
      en: 'Merge a copy, then test the outline, page-number systems, and reader tasks so a long PDF remains genuinely navigable.',
    },
    updatedAt: '2026-09-03',
    noFaqSchema: true,
  },
  {
    id: 'split-pdf-output-naming-batch-delivery-guide',
    locales: ['zh', 'en'],
    slug: 'split-pdf-output-naming-batch-delivery-guide',
    title: {
      zh: '拆分 PDF 批次輸出與檔名管理指南',
      en: 'Split PDF Batch Output and File Naming Guide',
    },
    metaTitle: {
      zh: '拆分 PDF 後檔案太多怎麼整理？命名、資料夾與驗收',
      en: 'Split PDFs: Naming, Folders & Batch Checks',
    },
    metaDescription: {
      zh: '拆分 PDF 前先決定分段規則、檔名欄位與輸出資料夾，再用頁數、章節、版本和檔案大小驗收每個副本；避免附件順序錯、同名覆蓋或把錯誤檔案寄出去。',
      en: 'Plan split rules, filename fields, and an output folder, then verify page ranges, sections, versions, and sizes before delivery.',
    },
    h1: {
      zh: '拆分 PDF 後如何整理檔案：批次命名、資料夾與交付檢查',
      en: 'How to Organize Split PDFs for Batch Delivery',
    },
    category: { zh: 'PDF 工作流程', en: 'PDF workflows' },
    priority: 56,
    searchIntent: {
      zh: '使用者要把長 PDF 拆成多個章節、附件或容量較小的檔案，擔心輸出檔名混亂、頁面遺漏、同名覆蓋與交付順序錯誤，想要可重複的批次管理方法。',
      en: 'A user needs to split a long PDF into sections, appendices, or smaller files and wants repeatable naming, folder, page-coverage, and delivery checks.',
    },
    targetKeywords: [
      { zh: '拆分 PDF 檔名整理', en: 'name split PDF files' },
      { zh: 'PDF 批次拆分檔案', en: 'split PDF into batches' },
      { zh: '拆分 PDF 頁面遺漏', en: 'missing pages after splitting PDF' },
    ],
    relatedToolIds: ['split-pdf', 'pdf-compressor', 'pdf-page-reorder'],
    relatedGuideIds: ['split-pdf-page-range-planning-guide', 'merge-pdf-reading-order-checklist-guide', 'pdf-compressor-email-attachment-guide'],
    relatedWorkflowIds: ['office-document-toolkit'],
    summary: {
      zh: '拆分工作的難點不是按下按鈕，而是讓每個輸出檔能被辨識、追溯和正確交付。先定義分段與命名，再用頁面覆蓋、版本、大小和開啟測試確認沒有漏檔或錯檔。',
      en: 'The hard part of splitting is not clicking a button; it is making every output identifiable, traceable, and deliverable. Define ranges and names first, then verify coverage, versions, sizes, and opening tests.',
    },
    problem: {
      zh: '同一份長 PDF 可能同時需要依章節、頁數或檔案大小拆分。若沒有先決定唯一規則，輸出檔會出現 `part-1`、`final`、`final2` 等無法追溯的名稱，甚至因同名而覆蓋上一批結果。',
      en: 'A long PDF may need to be split by chapters, page ranges, or file size. Without one declared rule, outputs become untraceable names such as part-1, final, and final2, or overwrite an earlier batch.',
    },
    whoShouldUse: {
      zh: '適合把報告拆成章節、把投標附件分開、把課程講義按週交付、把大型掃描檔分批上傳，或需要把多個輸出交給不同收件人的使用者。',
      en: 'Useful for chapter-based reports, bid appendices, weekly handouts, large scans uploaded in batches, and deliveries where different outputs go to different recipients.',
    },
    explanation: [
      {
        zh: '先決定拆分依據並寫成小規格：連續頁、奇偶頁、章節書籤或最大檔案大小。Adobe 的桌面說明列出頁數、檔案大小與第一層書籤等方式，也提供輸出目的地與命名慣例設定；可把這些選項當成規劃時的檢查表（https://helpx.adobe.com/acrobat/desktop/edit-documents/organize-pages/split-pdfs.html）。',
        en: 'Choose and document one split rule: consecutive ranges, odd/even pages, top-level bookmarks, or maximum file size. Adobe lists these options and provides destination and naming settings; use them as a planning checklist (https://helpx.adobe.com/acrobat/desktop/edit-documents/organize-pages/split-pdfs.html).',
      },
      {
        zh: '檔名應包含能回答「這是哪一份」的欄位，例如文件代號、章節序號、主題、版本與日期。序號要固定寬度（01、02），避免檔案總管以字串排序時把 10 放到 2 前面。',
        en: 'A filename should answer which file it is with a document ID, section number, topic, version, and date. Use fixed-width numbers such as 01 and 02 so string sorting does not place 10 before 2.',
      },
      {
        zh: '輸出資料夾要和來源、交付包、失敗重試分開。先建立空的工作資料夾，完成驗收後再複製到交付資料夾；不要讓工具把新輸出混在含有同名舊檔的資料夾。',
        en: 'Separate the source, working outputs, delivery package, and failed retries. Start with an empty work folder and copy only accepted files to delivery; do not mix new outputs with same-named older files.',
      },
      {
        zh: '頁面覆蓋檢查要同時看起點、終點與相鄰邊界。若第 1–8 頁和第 8–15 頁都含第 8 頁，可能是刻意重複封面，也可能是範圍錯誤；把預期重複規則寫清楚，不要只用總頁數相加。',
        en: 'Check starts, ends, and boundaries. If outputs 1–8 and 8–15 both contain page 8, that may be an intentional cover repeat or an error. Document the expected overlap instead of relying only on summed page counts.',
      },
      {
        zh: '版本和日期不是裝飾。來源更新後重新拆分，舊檔和新檔可能頁數相同但內容不同；把來源版本寫入檔名或清單，並保留產出時間與規則，日後才知道哪一批可以撤回。',
        en: 'Version and date fields are not decoration. A revised source can produce the same page counts with different content. Put the source version in the filename or manifest and keep the rule and time so a batch can be withdrawn later.',
      },
      {
        zh: '每個輸出都要通過基本開啟和內容抽查。檔案大小為零、頁面旋轉錯誤、第一頁缺失或書籤仍指向原檔的結果，都應回到工作資料夾修正，不要在交付包內覆蓋。',
        en: 'Every output needs a basic open and content spot check. Zero-byte files, wrong rotation, missing first pages, or bookmarks still pointing to the source belong in the work folder for repair, not in the delivery package.',
      },
      {
        zh: '若拆分是為了寄信或上傳，最後還要檢查總容量與收件人對應。單檔通過限制不表示整批附件能送出；用交付清單逐一對照檔名、頁碼範圍、收件人和權限。',
        en: 'When splitting for email or upload, check total size and recipient mapping at the end. Each file can meet a limit while the batch still fails. Match filename, page range, recipient, and permission in a delivery manifest.',
      },
    ],
    steps: [
      { zh: '列出來源版本、預期分段規則、頁面範圍與交付對象。', en: 'List the source version, split rule, page ranges, and recipients.' },
      { zh: '建立空的工作資料夾與固定欄位的檔名格式。', en: 'Create an empty work folder and a fixed-field filename format.' },
      { zh: '用 PDF 拆分工具輸出副本，指定目的地與命名慣例。', en: 'Export copies with the split PDF tool using the destination and naming convention.' },
      { zh: '以頁面起迄、重複規則和預期檔案數檢查覆蓋範圍。', en: 'Check coverage with page starts, ends, overlap rules, and expected file count.' },
      { zh: '逐檔開啟並抽查章節標題、方向、書籤和檔案大小。', en: 'Open each file and sample headings, orientation, bookmarks, and size.' },
      { zh: '建立交付清單，對照檔名、版本、收件人、權限和總附件大小。', en: 'Create a manifest matching names, versions, recipients, permissions, and total attachment size.' },
      { zh: '只把通過驗收的檔案複製到交付資料夾，保留失敗與來源紀錄。', en: 'Copy only accepted files to delivery and retain failed outputs and source records.' },
    ],
    example: {
      zh: '教學團隊要把 72 頁講義按四週寄給不同助教。先把每週頁碼和重複封面規則寫入清單，輸出 `course-v3-w01` 到 `w04`，發現第三週檔名被舊檔覆蓋；團隊清空工作資料夾、重跑拆分、逐檔開啟抽查後才建立寄信附件包。',
      en: 'A teaching team splits a 72-page handout into four weekly deliveries for different assistants. They document ranges and repeated covers, export course-v3-w01 through w04, catch an old file overwriting week three, then clear the work folder, rerun, sample each file, and build the email package.',
    },
    commonMistakes: [
      { zh: '沒有先決定拆分規則，看到輸出結果才臨時改範圍。', en: 'Changing ranges after seeing outputs because no split rule was declared.' },
      { zh: '使用 `final`、`new` 等檔名，無法追溯來源版本。', en: 'Using names such as final or new that cannot trace the source version.' },
      { zh: '把新輸出放進含有同名舊檔的資料夾而被覆蓋。', en: 'Writing new outputs into a folder with same-named files and overwriting them.' },
      { zh: '只把各檔案頁數相加，沒有檢查邊界遺漏或非預期重複。', en: 'Adding page counts without checking missing boundaries or unintended overlap.' },
      { zh: '只檢查第一個輸出，沒有開啟最後一個和最大檔案。', en: 'Checking only the first output and not the last or largest file.' },
      { zh: '單檔大小合格就直接寄出，忽略整批附件和收件人權限。', en: 'Sending once each file meets a size limit without checking the batch or permissions.' },
    ],
    faq: [
      { question: { zh: '拆分 PDF 應該依頁數還是依章節？', en: 'Should I split a PDF by pages or chapters?' }, answer: { zh: '依交付任務決定：章節需要獨立閱讀時用章節或書籤，容量受限時用頁數或大小；先寫規則再輸出，避免混用。', en: 'Choose from the delivery task: chapters or bookmarks for independent reading, pages or size for capacity limits. Document one rule before exporting.' } },
      { question: { zh: '拆分後檔名怎麼取比較好？', en: 'What is a good naming pattern for split PDFs?' }, answer: { zh: '至少包含文件代號、固定寬度序號、主題、來源版本和日期；用清單保存頁面範圍，檔名不必塞入所有說明。', en: 'Include a document ID, fixed-width sequence, topic, source version, and date. Keep page ranges in a manifest rather than making the filename unreadably long.' } },
      { question: { zh: '拆分後怎麼確認沒有漏頁？', en: 'How can I check that no pages are missing?' }, answer: { zh: '對照預期檔案數、每段起迄和邊界重複規則，再開啟第一個、最後一個與相鄰輸出抽查；只加總頁數不夠。', en: 'Compare expected file count, starts, ends, and overlap rules, then sample the first, last, and adjacent outputs. Summing page counts alone is not enough.' } },
      { question: { zh: '拆分後可以刪除原始 PDF 嗎？', en: 'Can I delete the source PDF after splitting?' }, answer: { zh: '不建議。來源版本是日後重跑、比對與追溯的基準；先確認備份與保存政策，再清理不需要的副本。', en: 'Usually not. The source version is the baseline for reruns, comparison, and traceability. Confirm backups and retention policy before cleaning copies.' } },
    ],
    cta: {
      zh: '用 PDF 拆分工具依規格輸出到空的工作資料夾，再以頁面覆蓋、檔名、版本與收件人清單完成批次交付驗收。',
      en: 'Split into an empty work folder, then validate page coverage, names, versions, and recipients before batch delivery.',
    },
    updatedAt: '2026-09-03',
    noFaqSchema: true,
  },
  {
    id: 'pdf-page-reorder-appendix-merge-check-guide',
    locales: ['zh', 'en'],
    slug: 'pdf-page-reorder-appendix-merge-check-guide',
    title: {
      zh: 'PDF 附錄重排與合併前檢查指南',
      en: 'PDF Appendix Reorder Check Guide',
    },
    metaTitle: {
      zh: 'PDF 附錄怎麼重排？合併前頁碼、版本與引用檢查',
      en: 'PDF Appendix Reorder: Pages and References',
    },
    metaDescription: {
      zh: '把附件、證據與表格放進 PDF 前，先規劃頁面順序、版本與引用，重排後再驗收目錄、頁碼、連結和重複頁，避免合併檔難以追溯，讓讀者能快速找到正確資料。',
      en: 'Reorder PDF appendices before merging: map versions and references, then check page labels, links, duplicates, and traceability in the final file.',
    },
    h1: {
      zh: 'PDF 附錄重排與合併前怎麼檢查：讓證據頁可追溯的流程',
      en: 'How to Reorder PDF Appendices Before a Reliable Merge',
    },
    category: { zh: 'PDF 工作流程', en: 'PDF workflows' },
    priority: 52,
    searchIntent: {
      zh: '使用者要把附件、證據、表格或補充頁加入主 PDF，想先重排內容並確認版本、引用與頁碼，避免合併後找不到來源或重複附錄。',
      en: 'A user needs to add evidence, tables, or supporting pages to a main PDF and wants a repeatable reorder check for versions, references, page labels, and duplicates before merging.',
    },
    targetKeywords: [
      { zh: 'PDF 附錄重排', en: 'reorder PDF appendix' },
      { zh: '合併 PDF 附件順序', en: 'PDF appendix merge order' },
      { zh: 'PDF 頁面版本檢查', en: 'PDF page version check' },
    ],
    relatedToolIds: ['pdf-page-reorder', 'merge-pdf', 'split-pdf'],
    relatedGuideIds: ['merge-pdf-reading-order-checklist-guide', 'merge-pdf-bookmarks-navigation-guide', 'split-pdf-page-range-planning-guide'],
    relatedWorkflowIds: ['office-document-toolkit'],
    summary: {
      zh: '附錄重排不是把頁面拖到最後就完成。每一頁都要有來源、版本與用途，並在合併前確認主文引用、頁碼與目錄會如何變動。',
      en: 'Reordering an appendix is more than dragging pages to the end. Each page needs a source, version, and purpose, and the main document references and navigation must be checked before merging.',
    },
    problem: {
      zh: '附件常來自不同人、不同日期或不同範本。若先合併再整理，舊版表格可能蓋過新版，引用頁碼會失效，重複的封面與空白頁也會讓讀者誤判內容。',
      en: 'Appendices often come from different people, dates, or templates. Merging first can leave an old table beside a new one, break page references, and add duplicate covers or blank pages that confuse readers.',
    },
    whoShouldUse: {
      zh: '適合整理研究報告、申請文件、課程講義、稽核證據與專案交付包的人，也適合在多人協作後替最終 PDF 做版本驗收。',
      en: 'Useful for research reports, applications, course handouts, audit evidence, project handoffs, and final-version reviews after several people contribute PDFs.',
    },
    explanation: [
      {
        zh: '先建立附錄清單，不要直接在檔案總管依檔名排序。清單至少記錄附件代號、負責人、來源日期、版本、預期位置與主文引用，讓每一頁在合併後仍能追溯。',
        en: 'Start with an appendix manifest instead of sorting filenames in a folder. Record an item ID, owner, source date, version, intended position, and main-text reference so every page stays traceable after merging.',
      },
      {
        zh: '把「附件順序」和「頁面順序」分開思考。主文可能需要先看到定義，再看到證據，最後才是原始表格；若只依收到檔案的先後排列，讀者路徑通常不會合理。',
        en: 'Separate appendix order from file-arrival order. The reader may need a definition, then evidence, then the raw table; arranging by upload time rarely creates a useful path.',
      },
      {
        zh: '版本判定要有明確規則，例如以核准日期、文件編號或資料截點為準。不要把檔名中的 `final` 當成證據；必要時打開頁面查看頁尾、表格日期與簽核欄。',
        en: 'Define a version rule using an approval date, document ID, or data cutoff. Do not treat a filename containing final as proof; inspect footers, table dates, and approval fields when needed.',
      },
      {
        zh: '重排工具只改變頁面容器，不會自動修正正文中的「見附錄 A 第 12 頁」。重排後先標記所有頁碼與章節引用，等最終合併後再重新核對落點。',
        en: 'A reorder tool changes the page container but cannot automatically fix text such as “see Appendix A, page 12.” Mark every page and section reference, then verify destinations again after the final merge.',
      },
      {
        zh: '對每份附件檢查開頭與結尾，特別留意重複封面、空白頁、旋轉方向與不同紙張尺寸。Adobe 的頁面整理說明也把插入、移動、刪除與旋轉視為獨立操作，應逐項驗收（https://helpx.adobe.com/acrobat/using/manipulate-pages-pdfs.html）。',
        en: 'Inspect the beginning and end of every appendix, especially duplicate covers, blank pages, rotation, and mixed paper sizes. Adobe documents insert, move, delete, and rotate as separate page operations, so check each one (https://helpx.adobe.com/acrobat/using/manipulate-pages-pdfs.html).',
      },
      {
        zh: '若附錄包含敏感資料，先確認應保留的頁面與應遮蔽的版本，再做重排。把刪除的頁面從工作檔移走並留下紀錄，避免誤把未核准的附件放回最終包。',
        en: 'When appendices contain sensitive data, decide which version is approved and which pages need redaction before reordering. Move removed pages out of the work file and record the decision so an unapproved appendix is not reintroduced.',
      },
      {
        zh: '完成合併後要用讀者任務做驗收：從正文引用跳到附錄、從附錄回看主文、開啟目錄與外部連結，並在另一個 PDF 閱讀器抽查，避免只在編輯器預覽中通過。',
        en: 'After merging, test reader tasks: follow a main-text reference to an appendix, return to the main section, open the table of contents and external links, and sample in another PDF viewer instead of trusting one editor preview.',
      },
    ],
    steps: [
      { zh: '建立附錄清單，記下代號、版本、來源、用途與預期順序。', en: 'Create a manifest with each appendix ID, version, source, purpose, and intended order.' },
      { zh: '打開每份 PDF，確認封面、頁數、方向、紙張尺寸與版本標記。', en: 'Open each PDF and confirm its cover, page count, orientation, paper size, and version mark.' },
      { zh: '刪除或隔離重複封面、空白頁與未核准的舊附件，留下處理紀錄。', en: 'Remove or isolate duplicate covers, blank pages, and unapproved old appendices with a record of the decision.' },
      { zh: '用 PDF 頁面重排工具依清單插入、移動、旋轉或刪除頁面。', en: 'Use the PDF page reorder tool to insert, move, rotate, or delete pages according to the manifest.' },
      { zh: '逐項核對正文引用、附錄標籤、頁碼與版本是否仍指向正確頁面。', en: 'Check main-text references, appendix labels, page numbers, and versions against the correct destinations.' },
      { zh: '合併後開啟目錄、書籤、內外部連結，抽查第一頁、邊界頁與最後一頁。', en: 'After merging, open the contents, bookmarks, and links; sample the first, boundary, and last pages.' },
      { zh: '輸出帶有版本與日期的交付檔，保留來源、清單與驗收結果。', en: 'Export a dated, versioned delivery file and retain the sources, manifest, and acceptance result.' },
    ],
    example: {
      zh: '研究小組要把問卷、原始統計表與受試者說明加入報告。清單顯示統計表 v2 才是核准版；重排時移除 v1、補上附錄標籤，合併後從正文的三個引用逐一跳轉，才發現一處頁碼仍指向舊版，於是先修正文再交付。',
      en: 'A research team adds a survey, raw tables, and participant notes to a report. The manifest identifies table v2 as approved, so they isolate v1, label the appendices, and follow three references after merging. One page number still pointed to the old table, so they fixed the main text before delivery.',
    },
    commonMistakes: [
      { zh: '依檔名或收到時間排序，沒有先定義讀者需要的順序。', en: 'Sorting by filenames or arrival time without defining the reader’s sequence.' },
      { zh: '把 `final`、`最新版` 當成版本證據，沒有核對頁尾或核准日期。', en: 'Treating final or latest in a filename as version proof without checking the page or approval date.' },
      { zh: '重排後只看頁數，沒有重新驗證正文中的頁碼與附錄名稱。', en: 'Checking only the page count after reordering and not the references or appendix names.' },
      { zh: '忽略重複封面、空白頁、旋轉頁與混合紙張尺寸。', en: 'Ignoring duplicate covers, blank pages, rotated pages, or mixed paper sizes.' },
      { zh: '在工作檔直接覆蓋來源，之後無法重建或解釋變更。', en: 'Overwriting the source in the work file and losing the ability to rebuild or explain changes.' },
      { zh: '只在同一個編輯器預覽，沒有用讀者流程和另一個閱讀器抽查。', en: 'Trusting one editor preview without testing reader paths or another PDF viewer.' },
    ],
    faq: [
      { question: { zh: '附錄一定要放在 PDF 最後嗎？', en: 'Must an appendix be at the end of a PDF?' }, answer: { zh: '不一定；依讀者任務與正文引用安排。若證據需要緊接章節，可放在相關段落後，但要維持清楚標籤與目錄。', en: 'Not always. Place it where the reader and main-text references need it, while keeping clear labels and navigation.' } },
      { question: { zh: '重排頁面會自動更新正文頁碼嗎？', en: 'Does reordering automatically update page references?' }, answer: { zh: '通常不會。頁面工具改變順序，但正文文字、目錄與外部索引可能仍是舊值，必須在最終檔逐項驗證。', en: 'Usually not. Reordering changes pages, while body text, contents, and external indexes may keep old values; verify them in the final file.' } },
      { question: { zh: '如何避免把舊版附件合併進去？', en: 'How can I keep an old appendix out of the merge?' }, answer: { zh: '以清單指定核准版本，隔離舊檔並在每頁核對文件編號、日期或資料截點，不要只依檔名判定。', en: 'Specify the approved version in a manifest, isolate old files, and check IDs, dates, or data cutoffs on the pages rather than relying on names.' } },
      { question: { zh: '重排完成後要保留哪些紀錄？', en: 'What should I retain after reordering?' }, answer: { zh: '保留來源檔、附錄清單、版本決策、處理日期與驗收結果；這些紀錄能支援重跑、稽核與日後更新。', en: 'Retain source files, the manifest, version decisions, processing date, and acceptance result for reruns, audits, and future updates.' } },
    ],
    cta: {
      zh: '先用 PDF 頁面重排工具整理附件，再依版本、引用、頁碼與連結清單完成合併前後驗收。',
      en: 'Reorder appendix pages first, then use the version, reference, page, and link checklist before and after merging.',
    },
    updatedAt: '2026-09-03',
    noFaqSchema: true,
  },
  {
    id: 'pdf-to-image-print-crop-marks-guide',
    locales: ['zh', 'en'],
    slug: 'pdf-to-image-print-crop-marks-guide',
    title: {
      zh: 'PDF 轉圖片列印裁切與出血指南',
      en: 'PDF to Image Print Crop Guide',
    },
    metaTitle: {
      zh: 'PDF 轉 JPG／PNG 列印怎麼不被裁掉？出血與裁切檢查',
      en: 'PDF to Image for Print: Crop and Bleed Checks',
    },
    metaDescription: {
      zh: '把 PDF 轉成 JPG 或 PNG 送印前，先分清頁面尺寸、出血、裁切線與安全邊界，檢查文字、條碼與圖片是否靠邊，避免成品被裁掉或細節變得難以辨識。',
      en: 'Before sending a PDF-to-JPG or PNG export to print, check page size, bleed, crop marks, and safe margins so text, barcodes, and images are not cut off.',
    },
    h1: {
      zh: 'PDF 轉圖片列印前怎麼檢查裁切線與出血：避免文字被切掉',
      en: 'How to Check Crop and Bleed Before Printing a PDF as an Image',
    },
    category: { zh: 'PDF 工作流程', en: 'PDF workflows' },
    priority: 53,
    searchIntent: {
      zh: '使用者要把 PDF 轉成 JPG／PNG 交給印刷或貼圖平台，擔心出血、裁切線、解析度與安全邊界造成文字或條碼被切掉，想要交付前的檢查流程。',
      en: 'A user needs a JPG or PNG from a PDF for print or a signage platform and wants to verify bleed, crop marks, resolution, and safe margins before delivery.',
    },
    targetKeywords: [
      { zh: 'PDF 轉圖片 列印裁切', en: 'PDF to image print crop' },
      { zh: 'PDF 出血與裁切線', en: 'PDF bleed and crop marks' },
      { zh: 'JPG 列印安全邊界', en: 'JPG print safe margin' },
    ],
    relatedToolIds: ['pdf-to-image', 'image-resizer', 'image-compressor'],
    relatedGuideIds: ['pdf-to-image-resolution-guide', 'pdf-to-image-background-contrast-guide', 'image-resize-aspect-ratio-guide'],
    relatedWorkflowIds: ['creator-social-toolkit'],
    summary: {
      zh: 'PDF 頁面轉成圖片後，印刷端只看到像素，不會替你理解文字安全區。先確認輸出尺寸與裁切規格，再用邊界檢查確保重要內容離裁切線足夠遠。',
      en: 'After a PDF becomes an image, the printer sees pixels rather than layout intent. Confirm the output size and trim specification, then check that important content stays clear of the cut line.',
    },
    problem: {
      zh: '螢幕預覽完整不代表印刷不會缺角。不同平台可能要求出血、移除裁切標記或使用固定像素尺寸；若把安全區的文字、條碼或商標放得太靠邊，裁切誤差就會變成成品缺失。',
      en: 'A complete screen preview does not guarantee a safe print. A platform may require bleed, no crop marks, or a fixed pixel size; text, barcodes, and logos near the edge can disappear with normal trim tolerance.',
    },
    whoShouldUse: {
      zh: '適合製作海報、講義封面、菜單、貼紙、社群圖卡與簡報海報的人，也適合把 PDF 交給印刷店或線上上傳平台前做最後檢查。',
      en: 'Useful for posters, handout covers, menus, labels, social graphics, and presentation boards before sending a PDF-derived image to a printer or upload platform.',
    },
    explanation: [
      {
        zh: '先向印刷端取得實際規格：成品尺寸、出血寬度、是否需要裁切線、色彩模式、檔案格式與最低解析度。不要把網路上通用的 A4 或 300 dpi 當成所有平台的規則。',
        en: 'Get the printer’s specification first: trim size, bleed, crop-mark policy, color mode, file format, and minimum resolution. Do not assume generic A4 or 300 dpi rules fit every platform.',
      },
      {
        zh: '分清成品尺寸與含出血尺寸。成品是裁切後留下的範圍，含出血檔則要在外圍多留背景；重要文字與條碼仍應放在安全邊界內，而不是把它們延伸到出血區。',
        en: 'Separate the trim size from the bleed size. The trim is what remains after cutting; the bleed extends background beyond it. Keep important text and barcodes inside the safe area rather than extending them into bleed.',
      },
      {
        zh: '裁切線不是設計內容。若平台要求無標記檔案，輸出時要移除裁切線；若印刷店需要標記，確認它們位於出血外並不會被當成成品的一部分。',
        en: 'Crop marks are production aids, not design content. Remove them when the platform asks for a clean file; when required, place them outside the bleed so they are not mistaken for the finished artwork.',
      },
      {
        zh: 'PDF 轉圖片時要固定頁面比例，避免為了符合像素尺寸而非等比例拉伸。先用比例計算目標像素，再檢查圓形、字體與條碼是否仍保持正確形狀。',
        en: 'Keep the page ratio during PDF-to-image export instead of stretching to a pixel box. Calculate target pixels from the ratio, then check circles, type, and barcodes for distortion.',
      },
      {
        zh: '靠邊的內容需要視覺檢查，不只是量距離。斜線、細字、淡色背景與條碼在螢幕上可能看似安全，縮小成縮圖或換成實際列印尺寸後卻難以辨識；Adobe 的列印 PDF 說明可用來核對頁面與列印設定（https://helpx.adobe.com/acrobat/using/print-pdf.html）。',
        en: 'Edge content needs a visual check, not just a measured distance. Diagonals, small type, pale backgrounds, and barcodes can look safe on screen but fail at print size; Adobe’s PDF printing guidance helps verify page and print settings (https://helpx.adobe.com/acrobat/using/print-pdf.html).',
      },
      {
        zh: '轉成圖片後不要再把圖片壓縮到看不清細字。若平台有限制，先做一份符合尺寸的主檔，再輸出壓縮副本，並保留能重新轉出的 PDF 原始版本。',
        en: 'Do not compress the image until fine type becomes unreadable. Keep a correctly sized master, create a compressed copy only when needed, and retain the source PDF for a clean re-export.',
      },
      {
        zh: '交付前應在 100% 尺寸檢查整頁、四個角落、裁切邊界與最小文字，並讓實際印刷者確認規格。轉檔成功只代表有圖片，不代表它符合裁切與交付條件。',
        en: 'Before delivery, inspect the full page, all four corners, trim boundaries, and smallest type at 100% size, then have the printer confirm the specification. A successful export only proves an image exists.',
      },
    ],
    steps: [
      { zh: '記下印刷端的成品尺寸、出血、裁切線、解析度與格式規格。', en: 'Record the printer’s trim size, bleed, crop-mark, resolution, and format requirements.' },
      { zh: '在 PDF 原檔標出成品範圍、安全邊界與不應被裁掉的元素。', en: 'Mark the trim, safe area, and must-keep elements on the source PDF.' },
      { zh: '用 PDF 轉圖片工具依比例輸出，不要用非等比例縮放硬塞進像素框。', en: 'Export with the PDF-to-image tool using the page ratio instead of forcing a stretched pixel box.' },
      { zh: '確認輸出是否包含裁切線與出血，依平台規格保留或移除。', en: 'Check whether crop marks and bleed are included, then keep or remove them to match the specification.' },
      { zh: '在 100% 尺寸檢查四邊文字、條碼、商標、細線與背景延伸。', en: 'At 100% size, inspect edge text, barcodes, logos, fine lines, and background extension.' },
      { zh: '輸出符合容量的交付副本，保留原始 PDF 與未壓縮主檔。', en: 'Create a delivery copy that meets the size limit while retaining the source PDF and uncompressed master.' },
      { zh: '把檔案交給印刷端確認，記錄檔名、規格與最終驗收結果。', en: 'Ask the printer to confirm the file, and record its name, specification, and final acceptance.' },
    ],
    example: {
      zh: '設計者把 A4 活動海報轉成 PNG 上傳印刷平台。平台要求四邊 3 mm 出血且不接受裁切線；第一次輸出把標題放在安全區外，100% 檢查時發現條碼也貼近邊緣。重新調整 PDF 原檔、按比例輸出並保留未壓縮主檔後才送印。',
      en: 'A designer exports an A4 event poster to PNG for an online printer. The printer requires 3 mm bleed and no crop marks. A 100% check catches a headline outside the safe area and a barcode too close to the edge, so the source is adjusted and re-exported proportionally before delivery.',
    },
    commonMistakes: [
      { zh: '沒有取得印刷端規格，就直接套用 A4 或 300 dpi。', en: 'Using A4 or 300 dpi without getting the printer’s actual specification.' },
      { zh: '把出血區當成安全區，把重要文字或條碼放到裁切附近。', en: 'Treating bleed as the safe area and placing text or barcodes near the trim.' },
      { zh: '平台不接受裁切線，仍把標記一起輸出。', en: 'Including crop marks when the platform requires a clean artwork file.' },
      { zh: '為了符合像素尺寸而拉伸圖片，造成字體或圓形變形。', en: 'Stretching the image to fit pixels and distorting type or circles.' },
      { zh: '只看縮小預覽，沒有在 100% 尺寸檢查最小文字與條碼。', en: 'Checking only a thumbnail instead of the smallest type and barcode at 100%.' },
      { zh: '壓縮交付檔後刪掉 PDF 原檔，無法依新規格重新輸出。', en: 'Deleting the source PDF after compressing the delivery copy and losing a clean re-export path.' },
    ],
    faq: [
      { question: { zh: 'PDF 轉 JPG 列印一定要加出血嗎？', en: 'Does every PDF-to-JPG print need bleed?' }, answer: { zh: '不一定，取決於印刷端是否要求滿版裁切。先取得實際規格；有出血需求時，背景延伸到裁切外，但重要內容仍放在安全區。', en: 'Not always; it depends on the printer and whether the piece is trimmed full bleed. Follow the specification and keep important content inside the safe area.' } },
      { question: { zh: '裁切線應該保留在圖片裡嗎？', en: 'Should crop marks stay in the image?' }, answer: { zh: '只有印刷端明確要求時才保留，並確認標記在出血外；上傳平台通常要求不含裁切線的乾淨成品。', en: 'Only when the printer explicitly asks for them, and they must sit outside the bleed. Upload platforms often want clean artwork without marks.' } },
      { question: { zh: '如何知道圖片解析度足夠列印？', en: 'How do I know the image resolution is enough?' }, answer: { zh: '用印刷端提供的成品尺寸與最低解析度計算目標像素，再在 100% 尺寸查看細字與條碼；不要只用檔案大小判定。', en: 'Calculate target pixels from the printer’s trim size and minimum resolution, then inspect fine type and barcodes at 100%; file size alone is not a quality test.' } },
      { question: { zh: '轉成圖片後還能修改文字嗎？', en: 'Can I edit text after converting to an image?' }, answer: { zh: '圖片中的文字已變成像素，應回到 PDF 或原始設計檔修改，再重新輸出；不要把圖片當成可編輯文件。', en: 'Text becomes pixels in the image. Edit the PDF or original design and export again instead of treating the image as an editable document.' } },
    ],
    cta: {
      zh: '用 PDF 轉圖片工具依印刷規格輸出，再以出血、裁切線、安全邊界與 100% 檢視完成交付前驗收。',
      en: 'Export with the PDF-to-image tool, then check bleed, crop marks, safe margins, and 100% scale before sending the print file.',
    },
    updatedAt: '2026-09-03',
    noFaqSchema: true,
  },
  {
    id: 'pdf-compressor-form-fields-links-guide',
    locales: ['zh', 'en'],
    slug: 'pdf-compressor-form-fields-links-guide',
    title: {
      zh: 'PDF 壓縮後表單欄位與連結驗收指南',
      en: 'PDF Compression Form and Link Check',
    },
    metaTitle: {
      zh: 'PDF 壓縮後表單不能填？欄位、連結與附件驗收流程',
      en: 'PDF Compression: Check Forms and Links',
    },
    metaDescription: {
      zh: 'PDF 壓縮後不要只看檔案變小，還要測試表單欄位、核取方塊、超連結、附件與 JavaScript 是否仍能使用，並保留原檔作為失敗時的回復基準。',
      en: 'After compressing a PDF, test form fields, checkboxes, links, attachments, and scripts instead of checking size alone; keep the source as a recovery baseline.',
    },
    h1: {
      zh: 'PDF 壓縮後怎麼驗收互動功能：表單欄位、連結與附件檢查',
      en: 'How to Check PDF Forms and Links After Compression',
    },
    category: { zh: 'PDF 工作流程', en: 'PDF workflows' },
    priority: 54,
    searchIntent: {
      zh: '使用者需要縮小 PDF 上傳或寄送，但檔案含有可填表單、核取方塊、連結、附件或腳本，想知道壓縮後哪些互動功能必須重新測試。',
      en: 'A user needs a smaller PDF for upload or email, but the file contains forms, checkboxes, links, attachments, or scripts and needs a post-compression interaction checklist.',
    },
    targetKeywords: [
      { zh: 'PDF 壓縮後表單不能填', en: 'PDF form broken after compression' },
      { zh: '壓縮 PDF 連結失效', en: 'compressed PDF links not working' },
      { zh: 'PDF 互動功能驗收', en: 'PDF interactive feature check' },
    ],
    relatedToolIds: ['pdf-compressor', 'pdf-to-image', 'pdf-to-word'],
    relatedGuideIds: ['pdf-compressor-email-attachment-guide', 'pdf-to-image-raster-text-search-guide', 'pdf-to-word-review-track-changes-guide'],
    relatedWorkflowIds: ['office-document-toolkit'],
    summary: {
      zh: '壓縮 PDF 的風險不只在文字變模糊，也可能是欄位、連結與附件被扁平化或失去作用。先列出互動功能，再用實際讀者任務逐一測試。',
      en: 'PDF compression can affect more than visual quality: fields, links, and attachments may be flattened or lost. Inventory interactive features and test them through real reader tasks.',
    },
    problem: {
      zh: '不同壓縮器可能重新取樣圖片、移除嵌入資源或改寫 PDF 結構。檔案大小雖然達標，收件人卻可能無法輸入姓名、點開目錄、下載附件或執行必要的表單流程。',
      en: 'Compressors may resample images, remove embedded resources, or rewrite the PDF structure. The file can meet a size limit while recipients can no longer enter a name, open a link, download an attachment, or complete the form.',
    },
    whoShouldUse: {
      zh: '適合處理申請表、報名表、回覆表、產品手冊、含附件的報告與線上簽核文件的人，尤其是需要把檔案交給不熟悉技術的收件者時。',
      en: 'Useful for applications, registration forms, response sheets, manuals, reports with attachments, and approval documents sent to readers who may not know technical workarounds.',
    },
    explanation: [
      {
        zh: '壓縮前先列出互動元件：文字欄位、核取方塊、選單、簽名區、內部連結、外部連結、附件、書籤與腳本。沒有清單就無法知道壓縮後要驗收什麼。',
        en: 'Inventory interactive elements before compression: text fields, checkboxes, menus, signature areas, internal and external links, attachments, bookmarks, and scripts. Without a list, you cannot know what to retest.',
      },
      {
        zh: '設定容量目標時，先決定哪些品質與功能不能犧牲。表單檔通常比純掃描講義更重視欄位與連結；不要為了少幾百 KB 就接受功能失效。',
        en: 'Set a size target together with non-negotiable quality and feature requirements. A form usually values fields and links more than a scanned handout; saving a few kilobytes is not worth a broken workflow.',
      },
      {
        zh: '壓縮後用支援表單的 PDF 閱讀器打開，不要只在瀏覽器快速預覽。Adobe 的 PDF 最佳化說明指出，可移除或改寫不同資源，因此必須在目標閱讀器檢查輸出（https://helpx.adobe.com/acrobat/using/optimizing-pdfs-acrobat-pro.html）。',
        en: 'Open the compressed file in a PDF viewer that supports forms instead of relying on a quick browser preview. Adobe’s PDF optimizer guidance describes changes to different resources, so inspect the output in the target viewer (https://helpx.adobe.com/acrobat/using/optimizing-pdfs-acrobat-pro.html).',
      },
      {
        zh: '表單欄位要測試輸入、清除、選取、必填提示與儲存後重開。只看到欄位外框不代表欄位仍可互動，也不代表值會在不同閱讀器中保留。',
        en: 'Test entering, clearing, selecting, required-field prompts, saving, and reopening. Seeing a field outline does not prove it remains interactive or that values survive in every viewer.',
      },
      {
        zh: '連結要從兩種路徑測試：點擊文字或按鈕，以及從書籤或目錄跳轉。外部連結還要確認 HTTPS、網址沒有被截斷，附件則要測試下載後檔名與內容。',
        en: 'Test links through both visible text or buttons and bookmarks or contents navigation. For external links, confirm HTTPS and the full URL; for attachments, test the downloaded filename and contents.',
      },
      {
        zh: '若壓縮器提供「移除互動內容」或「扁平化」選項，先讀懂它的含義再使用。扁平化可能讓畫面看起來不變，卻把欄位變成不可編輯的外觀；交付前要明確標示這是可填版還是封存版。',
        en: 'Understand options such as remove interactive content or flatten before selecting them. Flattening can preserve appearance while making fields uneditable; label the deliverable clearly as fillable or archival.',
      },
      {
        zh: '保存原始 PDF、壓縮設定與驗收紀錄。若收件人回報連結或欄位失效，可以回到原檔重做較保守的壓縮，而不是在已損壞的副本上反覆修改。',
        en: 'Keep the source PDF, compression settings, and acceptance record. If a recipient reports a broken link or field, rerun a conservative compression from the source instead of patching a damaged copy.',
      },
    ],
    steps: [
      { zh: '列出所有表單欄位、連結、書籤、附件與腳本，標記不可失效的功能。', en: 'List fields, links, bookmarks, attachments, and scripts, marking features that must survive.' },
      { zh: '記下目前檔案大小、頁數、閱讀器與可重現的測試值。', en: 'Record the current size, page count, viewer, and reproducible test values.' },
      { zh: '用 PDF 壓縮工具輸出副本，保留原檔與壓縮設定。', en: 'Create a copy with the PDF compressor while retaining the source and settings.' },
      { zh: '在目標閱讀器測試輸入、清除、儲存、重開與必填提示。', en: 'In the target viewer, test entering, clearing, saving, reopening, and required prompts.' },
      { zh: '點擊文字、按鈕、目錄與書籤，並下載每個附件抽查內容。', en: 'Click text, buttons, contents, and bookmarks, and download each attachment for a content sample.' },
      { zh: '比較壓縮前後容量、可搜尋文字、視覺品質與互動結果。', en: 'Compare size, searchable text, visual quality, and interaction results before and after compression.' },
      { zh: '只交付通過清單的版本，註明可填或封存狀態與版本日期。', en: 'Deliver only the version that passes the checklist, labeling it fillable or archival with a version date.' },
    ],
    example: {
      zh: '社團把 18 頁報名表壓到平台限制以下。團隊先記錄兩個文字欄位、三個核取方塊、四個外部連結與一個附件；壓縮後發現欄位仍可見但無法儲存輸入，於是改用保留表單的設定，並在桌面閱讀器與瀏覽器各測一次才上傳。',
      en: 'A club compresses an 18-page registration form to meet an upload limit. They inventory two text fields, three checkboxes, four external links, and one attachment; after compression the fields are visible but do not save. They switch to a form-preserving setting and test in both a desktop viewer and browser before upload.',
    },
    commonMistakes: [
      { zh: '只比較檔案大小，沒有列出或測試互動元件。', en: 'Comparing file size only without inventorying or testing interactive elements.' },
      { zh: '啟用扁平化後仍把檔案當成可填表單交付。', en: 'Flattening the file and still delivering it as a fillable form.' },
      { zh: '只在瀏覽器預覽，沒有用實際表單閱讀器儲存再重開。', en: 'Using only a browser preview and never saving and reopening in a form-capable viewer.' },
      { zh: '沒有點擊書籤、目錄與外部連結，誤以為文字存在就代表連結正常。', en: 'Not clicking bookmarks, contents, or external links and assuming visible text means a link works.' },
      { zh: '壓縮後覆蓋唯一的原始檔，失去保守重做的基準。', en: 'Overwriting the only source and losing a baseline for a conservative rerun.' },
      { zh: '把容量剛好壓到上限，沒有為平台重新編碼或附件變化留餘量。', en: 'Compressing exactly to the limit without headroom for platform encoding or attachments.' },
    ],
    faq: [
      { question: { zh: 'PDF 壓縮一定會讓表單失效嗎？', en: 'Does compression always break PDF forms?' }, answer: { zh: '不一定，取決於工具與設定；但含互動元件時不能只看大小，必須在目標閱讀器測試輸入、儲存與重開。', en: 'No. It depends on the tool and settings, but interactive PDFs must be tested for entry, save, and reopen in the target viewer.' } },
      { question: { zh: '怎麼知道 PDF 連結還能點？', en: 'How do I know PDF links still work?' }, answer: { zh: '逐一從正文、按鈕、目錄與書籤點擊，外部連結確認完整 HTTPS 網址；不要只看文字底線或游標變化。', en: 'Click links from body text, buttons, contents, and bookmarks, and verify the full HTTPS destination. Underlining or a cursor change is not enough.' } },
      { question: { zh: '可填表單與封存 PDF 有什麼差別？', en: 'What is the difference between a fillable and archival PDF?' }, answer: { zh: '可填表單保留欄位互動；封存版通常把內容固定以便閱讀或保存。交付前要清楚標示狀態，避免收件人拿錯版本。', en: 'A fillable PDF retains field interaction; an archival copy fixes the content for reading or retention. Label the status clearly so recipients use the right version.' } },
      { question: { zh: '壓縮後附件下載失敗怎麼辦？', en: 'What if an attachment fails after compression?' }, answer: { zh: '回到原始 PDF，以保留附件的設定重做，並測試下載檔名、大小與內容；不要只把壓縮副本再壓一次。', en: 'Rerun from the source with an attachment-preserving setting, then test filename, size, and contents. Do not repeatedly compress the damaged copy.' } },
    ],
    cta: {
      zh: '用 PDF 壓縮工具輸出副本後，依表單、連結、書籤與附件清單逐項測試，再交付可填或封存的正確版本。',
      en: 'Create a compressed copy, test forms, links, bookmarks, and attachments, then deliver the correctly labeled fillable or archival version.',
    },
    updatedAt: '2026-09-03',
    noFaqSchema: true,
  },
  {
    id: 'pdf-to-word-form-field-editing-guide',
    locales: ['zh', 'en'],
    slug: 'pdf-to-word-form-field-editing-guide',
    title: {
      zh: 'PDF 表單轉 Word 編輯欄位指南',
      en: 'PDF Form to Word Editing Guide',
    },
    metaTitle: {
      zh: 'PDF 表單轉 Word 後怎麼改？欄位、標籤與可填性檢查',
      en: 'PDF Form to Word: Edit Fields and Labels',
    },
    metaDescription: {
      zh: '把 PDF 表單轉成 Word 前，先分清固定版面與可編輯欄位；轉換後重建標籤、表格、選項與說明，逐項驗證收件人能否完成填寫、回存與再次開啟。',
      en: 'Before converting a PDF form to Word, separate fixed layout from editable fields; rebuild labels, tables, choices, and instructions, then test the completed handoff.',
    },
    h1: {
      zh: 'PDF 表單轉 Word 後怎麼重建欄位：可編輯與可填寫的驗收流程',
      en: 'How to Rebuild Editable Fields When Converting a PDF Form to Word',
    },
    category: { zh: 'PDF 工作流程', en: 'PDF workflows' },
    priority: 55,
    searchIntent: {
      zh: '使用者要把 PDF 申請表或問卷轉成 Word 來修改欄位與說明，擔心轉換後底線、核取方塊、表格與欄位順序失真，想知道如何重建並測試。',
      en: 'A user needs to edit a PDF application or questionnaire in Word and wants to rebuild fields, labels, checkboxes, tables, and order after conversion.',
    },
    targetKeywords: [
      { zh: 'PDF 表單轉 Word 編輯', en: 'convert PDF form to editable Word' },
      { zh: 'PDF 欄位轉 Word', en: 'PDF fields to Word' },
      { zh: 'Word 表單欄位驗收', en: 'Word form field checklist' },
    ],
    relatedToolIds: ['pdf-to-word', 'pdf-table-to-excel', 'pdf-to-image'],
    relatedGuideIds: ['pdf-to-word-layout-fidelity-guide', 'pdf-to-word-review-track-changes-guide', 'pdf-table-to-excel-header-check-guide'],
    relatedWorkflowIds: ['office-document-toolkit'],
    summary: {
      zh: 'PDF 表單轉 Word 後，外觀相似不代表欄位可用。把標籤、輸入區、選項與說明視為一個表單系統，重建後再用真實填寫任務驗收。',
      en: 'A similar-looking Word page does not prove a converted PDF form is usable. Treat labels, inputs, choices, and instructions as one form system and test it with a real completion task.',
    },
    problem: {
      zh: 'PDF 表單常把文字、線條、欄位與背景圖層分開保存。轉成 Word 後，底線可能變成段落框、核取方塊變成圖片，原本的欄位順序與說明也可能無法直接編輯。',
      en: 'PDF forms often store text, lines, fields, and backgrounds on separate layers. After conversion, an underline may become a paragraph border, a checkbox an image, and the original field order or instructions may not be editable.',
    },
    whoShouldUse: {
      zh: '適合維護報名表、問卷、行政申請、內部稽核表與教學回饋單的人，也適合要把舊 PDF 表單改成可長期維護 Word 範本的團隊。',
      en: 'Useful for registration forms, surveys, administrative applications, audit checklists, feedback sheets, and teams maintaining an old PDF as a reusable Word template.',
    },
    explanation: [
      {
        zh: '先判斷目標是「修改版面」還是「重建表單」。若收件人只需要列印，固定版面可能足夠；若要在 Word 輸入、排序、回存或協作，就要把欄位當成結構重新設計。',
        en: 'Decide whether the goal is layout editing or form rebuilding. A fixed layout may work for printing, but typing, sorting, saving, or collaboration in Word requires structural field design.',
      },
      {
        zh: '保留原始 PDF 作為視覺與欄位基準，逐頁標出標題、說明、輸入區、選項、必填項與簽名位置。這張盤點表能防止轉換後只修到看得見的文字。',
        en: 'Keep the source PDF as the visual and field baseline. Mark headings, instructions, inputs, choices, required items, and signature areas page by page so the conversion does not focus only on visible text.',
      },
      {
        zh: '轉換工具能協助產生初稿，但不會替你決定欄位語意。Adobe 的 PDF 匯出說明把 Word 轉換視為輸出格式選擇，實際欄位仍需要人工檢查（https://helpx.adobe.com/acrobat/using/export-pdf-overview.html）。',
        en: 'A converter can produce a draft but cannot decide field semantics. Adobe presents Word conversion as an output-format choice, so the resulting fields still need human review (https://helpx.adobe.com/acrobat/using/export-pdf-overview.html).',
      },
      {
        zh: '欄位標籤要靠近輸入區，並使用一致的語句與順序。不要只留下空白底線；收件人需要知道格式、單位、日期範圍與是否可略過，這些說明應成為文件的一部分。',
        en: 'Keep labels near inputs and use consistent wording and order. Do not leave blank lines alone; recipients need format, units, date range, and optionality instructions as part of the document.',
      },
      {
        zh: '核取方塊、單選選項與下拉選單的語意不同。轉換後若只剩圖片，必須重建可操作的控制項，並確認互斥選項不會被誤設為可以同時選取。',
        en: 'Checkboxes, radio choices, and dropdowns have different meanings. If they become images, rebuild usable controls and confirm mutually exclusive choices cannot be selected together by mistake.',
      },
      {
        zh: '重建表格時先處理資料順序，再處理線條與間距。若表格是要匯入 Excel 或 CSV，欄位名稱、單位與日期格式要固定；Microsoft 的 Word 表格與表單說明可作為編輯介面參考（https://support.microsoft.com/en-us/word）。',
        en: 'When rebuilding tables, fix data order before borders and spacing. If the table will move to Excel or CSV, standardize headers, units, and date formats; Microsoft’s Word guidance is a useful interface reference (https://support.microsoft.com/en-us/word).',
      },
      {
        zh: '完成後要讓不熟悉原 PDF 的人實際填寫，觀察他是否能找到每個欄位、理解格式並回存。由原作者自己檢查容易把舊習慣當成清楚說明，測試者回饋能揭露真正的障礙。',
        en: 'Have someone unfamiliar with the source complete the form, observing whether they can find every field, understand formats, and save the result. Authors often mistake familiar habits for clear instructions.',
      },
    ],
    steps: [
      { zh: '決定要做固定版面文件還是可維護、可填寫的 Word 表單。', en: 'Decide whether the output is a fixed layout or a maintainable, fillable Word form.' },
      { zh: '逐頁盤點標籤、輸入區、選項、必填項、簽名與附件說明。', en: 'Inventory labels, inputs, choices, required items, signatures, and attachment notes page by page.' },
      { zh: '用 PDF 轉 Word 工具產生副本，保留原始 PDF 與轉換日期。', en: 'Create a copy with the PDF-to-Word tool while retaining the source and conversion date.' },
      { zh: '依盤點表重建底線、核取方塊、單選項與表格欄位。', en: 'Rebuild lines, checkboxes, radio choices, and table fields from the inventory.' },
      { zh: '統一欄位標籤、格式、單位、日期規則與必填提示。', en: 'Standardize labels, formats, units, date rules, and required-field guidance.' },
      { zh: '請未參與轉換的人完成一份，記錄找不到欄位或誤解的地方。', en: 'Ask someone outside the conversion to complete a copy and record missing or misunderstood fields.' },
      { zh: '回存、重開並與原 PDF 逐頁比對，輸出有版本號的 Word 範本。', en: 'Save, reopen, compare page by page with the source PDF, and export a versioned Word template.' },
    ],
    example: {
      zh: '行政團隊把紙本申請 PDF 轉成 Word，第一次只修正字型，卻發現核取方塊是圖片、日期底線無法對齊、必填欄位沒有提示。團隊依欄位盤點重建控制項，讓新同事實際填寫並回存，才把範本交給全公司使用。',
      en: 'An admin team converts a paper application PDF to Word and fixes fonts first. They then find that checkboxes are images, date lines shift, and required fields have no prompts. They rebuild controls from a field inventory, ask a new colleague to complete and save it, and only then release the template company-wide.',
    },
    commonMistakes: [
      { zh: '把畫面看起來像原檔當成欄位已可編輯。', en: 'Assuming a similar appearance means fields are editable.' },
      { zh: '沒有區分核取方塊、單選項與下拉選單的語意。', en: 'Treating checkboxes, radio choices, and dropdowns as the same control.' },
      { zh: '只重建底線，沒有補上格式、單位與必填說明。', en: 'Rebuilding lines without format, unit, or required-field instructions.' },
      { zh: '重排表格線條後才發現欄位順序與匯出資料不一致。', en: 'Fixing table borders before confirming field order and export data.' },
      { zh: '由原作者獨自測試，沒有請陌生使用者完成一份。', en: 'Testing alone as the author and never asking an unfamiliar user to complete it.' },
      { zh: '覆蓋原始 PDF，之後無法比較轉換差異或重做。', en: 'Overwriting the source PDF and losing a comparison and rerun baseline.' },
    ],
    faq: [
      { question: { zh: 'PDF 表單轉 Word 後欄位會自動生成嗎？', en: 'Are form fields created automatically when converting PDF to Word?' }, answer: { zh: '不一定。轉換器可能只產生文字、線條或圖片；可填欄位、選項與驗證規則通常需要人工重建與測試。', en: 'Not necessarily. A converter may produce text, lines, or images; fillable fields, choices, and validation usually need manual rebuilding and tests.' } },
      { question: { zh: '要保留原 PDF 的外觀還是優先可編輯？', en: 'Should I prioritize the original look or editability?' }, answer: { zh: '看使用任務：列印交付偏向外觀，長期維護與填寫偏向結構。先決定目標，再接受必要的版面差異。', en: 'Choose from the task: print delivery favors appearance, while maintenance and completion favor structure. Decide first and accept necessary visual differences.' } },
      { question: { zh: '轉換後的核取方塊是圖片怎麼辦？', en: 'What if converted checkboxes are images?' }, answer: { zh: '刪除圖片並依原意重建可操作控制項，確認單選與複選行為正確，再請測試者完成一份。', en: 'Replace the images with usable controls, verify single- versus multi-select behavior, and have a tester complete a copy.' } },
      { question: { zh: '如何確認 Word 表單可以長期維護？', en: 'How can I tell whether a Word form is maintainable?' }, answer: { zh: '檢查標籤、欄位、樣式與表格是否有一致規則，並讓另一位編輯新增一個欄位、回存與重開，確認不會破壞版面。', en: 'Check consistent rules for labels, fields, styles, and tables. Have another editor add a field, save, and reopen to see whether the layout remains stable.' } },
    ],
    cta: {
      zh: '先用 PDF 轉 Word 工具產生副本，再依欄位盤點重建表單控制項，最後請陌生使用者實際填寫與回存。',
      en: 'Create a PDF-to-Word copy, rebuild controls from a field inventory, and have an unfamiliar user complete and save the form before release.',
    },
    updatedAt: '2026-09-03',
    noFaqSchema: true,
  },
  {
    id: 'qr-code-utm-campaign-link-guide',
    locales: ['zh', 'en'],
    slug: 'qr-code-utm-campaign-link-guide',
    title: {
      zh: 'QR Code 活動連結與 UTM 追蹤指南',
      en: 'QR Code Campaign Link Tracking Guide',
    },
    metaTitle: {
      zh: 'QR Code 怎麼追蹤活動成效？UTM 連結命名與驗收',
      en: 'QR Code Campaign Tracking with UTM Links',
    },
    metaDescription: {
      zh: '替 QR Code 目的地加入 UTM 參數前，先規劃來源、媒介、活動與內容命名，測試掃描後網址、重新導向與 GA4 報表，避免不同海報流量混在一起。',
      en: 'Add UTM parameters to QR destinations with a naming plan for source, medium, campaign, and content; test scans, redirects, and GA4 attribution before publishing.',
    },
    h1: {
      zh: 'QR Code 活動連結怎麼加 UTM：從命名到 GA4 驗收的完整流程',
      en: 'How to Add UTM Tracking to QR Code Campaign Links',
    },
    category: { zh: 'QR Code 工作流程', en: 'QR Code workflows' },
    priority: 56,
    searchIntent: {
      zh: '使用者要在海報、名片、包裝或活動看板放 QR Code，想分辨不同版位與印刷批次帶來的訪客，並需要不破壞目的地網址的 UTM 命名與測試方法。',
      en: 'A user places QR Codes on posters, cards, packaging, or signs and needs to distinguish placements and print batches with a safe UTM naming and testing workflow.',
    },
    targetKeywords: [
      { zh: 'QR Code UTM 追蹤', en: 'QR Code UTM tracking' },
      { zh: 'QR Code 活動成效 GA4', en: 'QR Code campaign GA4' },
      { zh: 'QR Code 來源媒介命名', en: 'QR Code source medium naming' },
    ],
    relatedToolIds: ['qr-code-generator', 'url-encoder'],
    relatedGuideIds: ['qr-code-before-print-testing-guide', 'qr-code-mobile-landing-page-guide', 'qr-code-event-page-expiry-guide'],
    relatedWorkflowIds: ['qr-barcode-publishing-toolkit', 'creator-social-toolkit'],
    summary: {
      zh: 'QR Code 本身只負責帶人到網址；要比較海報、包裝或活動攤位的流量，必須在目的地 URL 上用一致的 UTM 命名，並先從掃描到報表走完一次測試。',
      en: 'A QR Code sends people to a URL; comparing posters, packages, or booths requires consistent UTM naming on the destination and a test from scan to report.',
    },
    problem: {
      zh: '沒有追蹤參數時，不同印刷版位可能全部顯示成同一個直接流量。反過來，參數拼錯、大小寫混用或把個資放進 URL，又會造成報表分裂與隱私風險。',
      en: 'Without campaign parameters, different placements can appear as one direct source. Typos, inconsistent case, or personal data in a URL can split reports and create privacy risks.',
    },
    whoShouldUse: {
      zh: '適合行銷、活動、校園公告、零售包裝與內容創作者，也適合需要比較紙本版位但不想建立多個內容頁的人。',
      en: 'Useful for marketing, events, campus notices, retail packaging, and creators who need placement comparisons without maintaining many duplicate landing pages.',
    },
    explanation: [
      {
        zh: '先決定比較單位：來源可代表平台或印刷渠道，媒介代表 QR、海報或包裝，活動代表同一檔活動，內容則用來區分版位。Google Analytics 文件說明 `utm_source`、`utm_medium` 與 `utm_campaign` 會填入手動活動維度，命名一致比參數數量更重要（https://developers.google.com/analytics/devguides/collection/ga4/reference/config）。',
        en: 'Decide what you are comparing: source can represent a platform or print channel, medium a QR or poster, campaign the event, and content the placement. Google Analytics documents how `utm_source`, `utm_medium`, and `utm_campaign` populate manual campaign dimensions, so consistency matters more than adding every parameter (https://developers.google.com/analytics/devguides/collection/ga4/reference/config).',
      },
      {
        zh: '建立小寫、可讀、固定分隔符號的命名表，例如 `campus_fair`、`poster_a3`。不要把中文姓名、電話或 email 放進參數；追蹤版位不需要識別個人。',
        en: 'Use a naming sheet with lowercase, readable values and one separator, such as `campus_fair` and `poster_a3`. Never put names, phone numbers, or emails in parameters; placement tracking does not need personal identifiers.',
      },
      {
        zh: '在原始目的地後面附加參數，不要刪掉既有查詢字串或片段。若目的地已有 `?`，用 `&` 連接；若含重新導向，確認參數不會在中途被移除。',
        en: 'Append parameters to the real destination without deleting existing query strings or fragments. Use `&` when a `?` already exists, and confirm redirects do not strip the parameters.',
      },
      {
        zh: 'QR Code 生成前先在手機瀏覽器貼上完整網址，檢查 HTTPS、語言、登入需求與頁面是否適合第一屏。追蹤參數不應改變使用者要完成的任務。',
        en: 'Before generating the QR Code, open the full URL on a phone and check HTTPS, language, login requirements, and the first-screen task. Tracking parameters should not change what the visitor needs to do.',
      },
      {
        zh: '同一活動的不同版位可使用不同 `utm_content`，但不要為了每張小海報建立難以維護的命名。先定義可回答的問題，例如「入口 A 與櫃台 B 哪個帶來更多完成事件」。',
        en: 'Use different `utm_content` values for placements when the comparison answers a real question, such as whether entrance A or counter B drives more completions. Avoid a naming scheme no one can maintain.',
      },
      {
        zh: '測試時同時記錄掃描裝置、實際落地 URL、重新導向後 URL 與 GA4 看到的來源。Google 的事件文件把事件視為使用者互動資料，活動參數需要等資料進入報表後再驗收（https://developers.google.com/analytics/devguides/collection/ga4/events）。',
        en: 'Record the scanning device, landing URL, post-redirect URL, and source seen in GA4. Google describes events as interaction data; campaign parameters should be accepted only after the data appears in reports (https://developers.google.com/analytics/devguides/collection/ga4/events).',
      },
      {
        zh: '印刷後要保留版本與停用計畫。若活動頁會過期，先確認 QR Code 指向的頁面如何顯示更新資訊或替代入口，避免只因追蹤需要而留下失效連結。',
        en: 'Keep a version and retirement plan after printing. If the event page expires, decide how the destination shows an update or fallback instead of leaving a dead link merely because it was trackable.',
      },
    ],
    steps: [
      { zh: '寫下要比較的版位、來源、媒介、活動與內容欄位。', en: 'Write down the placements, source, medium, campaign, and content fields you need to compare.' },
      { zh: '建立小寫命名表，排除個資、空格、中文與不必要的特殊字元。', en: 'Create a lowercase naming sheet and exclude personal data, spaces, and unnecessary special characters.' },
      { zh: '把 UTM 參數附加到真實目的地，保留既有查詢字串與片段。', en: 'Append UTM parameters to the real destination while preserving existing queries and fragments.' },
      { zh: '用手機開啟網址，測試 HTTPS、語言、重新導向與第一屏任務。', en: 'Open the URL on a phone and test HTTPS, language, redirects, and the first-screen task.' },
      { zh: '用 QR Code 工具生成並掃描，記錄實際 URL 與裝置結果。', en: 'Generate with the QR Code tool, scan it, and record the actual URL and device result.' },
      { zh: '在 GA4 報表確認來源、媒介、活動與完成事件能按命名分組。', en: 'Confirm in GA4 that source, medium, campaign, and completion events group by the naming plan.' },
      { zh: '保存版位清單、QR 圖檔、目的地版本與活動結束後的停用安排。', en: 'Save the placement manifest, QR artwork, destination version, and post-campaign retirement plan.' },
    ],
    example: {
      zh: '社區講座把同一個報名頁放在入口海報與櫃台桌卡。團隊用 `utm_source=community`、`utm_medium=qr`、`utm_campaign=autumn_talk`，再以 `utm_content=entrance` 與 `desk` 區分版位；掃描測試先發現桌卡網址少了 `&`，修正後才印刷。',
      en: 'A community talk uses the same registration page on an entrance poster and desk card. The team uses source community, medium qr, campaign autumn_talk, and content entrance or desk. A scan test catches a missing ampersand on the desk URL before printing.',
    },
    commonMistakes: [
      { zh: '每個人自行發明參數名稱，大小寫與分隔符號混用。', en: 'Inventing parameter names independently and mixing case or separators.' },
      { zh: '把姓名、電話或 email 放入 UTM，讓追蹤網址含有個資。', en: 'Putting names, phone numbers, or emails into UTM values.' },
      { zh: '目的地已有查詢字串卻又加一個 `?`，導致網址解析錯誤。', en: 'Adding another question mark to a destination that already has a query string.' },
      { zh: '只掃描 QR Code 看頁面開啟，沒有驗證重新導向與 GA4 來源。', en: 'Checking that a page opens but not redirects or GA4 attribution.' },
      { zh: '為了追蹤每張小海報建立無法維護的超細命名。', en: 'Creating an unmaintainable naming value for every tiny poster.' },
      { zh: '活動結束後 QR Code 指向失效頁，沒有替代入口或更新說明。', en: 'Leaving the QR destination dead after the event without a fallback or update.' },
    ],
    faq: [
      { question: { zh: 'QR Code 一定要加 UTM 嗎？', en: 'Does every QR Code need UTM parameters?' }, answer: { zh: '不一定；若不需要比較來源，乾淨網址更簡單。需要分析版位時才加，並先建立可維護的命名規則。', en: 'No. A clean URL is simpler when placement comparison is unnecessary. Add parameters when they answer a real measurement question and use a maintainable rule.' } },
      { question: { zh: 'UTM 參數會改變 QR Code 圖案嗎？', en: 'Do UTM parameters change the QR Code image?' }, answer: { zh: '會改變編碼後的圖案，因為完整網址不同；印刷前要把最終 URL 定稿，不能先印再臨時改參數。', en: 'They change the encoded pattern because the full URL differs. Finalize the URL before printing rather than changing parameters afterward.' } },
      { question: { zh: 'UTM 參數應該用中文嗎？', en: 'Should UTM values use Chinese?' }, answer: { zh: '建議用小寫英文字母、數字與固定分隔符號，報表較易分組；顯示給讀者的內容仍應由落地頁語言處理。', en: 'Lowercase letters, numbers, and one separator are easier to group in reports. Let the landing page handle the visitor’s language.' } },
      { question: { zh: '掃描後 GA4 沒有看到來源怎麼辦？', en: 'What if GA4 does not show the campaign after a scan?' }, answer: { zh: '先確認完整 URL、重新導向是否保留參數，再等待資料處理並檢查日期範圍；不要只依即時報表一次判定失敗。', en: 'Check the full URL and whether redirects preserve parameters, allow processing time, and verify the date range instead of judging from one realtime view.' } },
    ],
    cta: {
      zh: '先用 QR Code 工具測試含 UTM 的最終網址，再依版位清單與 GA4 來源驗收後送印。',
      en: 'Test the final UTM-tagged URL with the QR Code tool, then approve it against the placement manifest and GA4 source before printing.',
    },
    updatedAt: '2026-09-03',
    noFaqSchema: true,
  },
  {
    id: 'classroom-random-group-size-balance-guide',
    locales: ['zh', 'en'],
    slug: 'classroom-random-group-size-balance-guide',
    title: {
      zh: '課堂隨機分組人數平衡指南',
      en: 'Classroom Random Group Size Guide',
    },
    metaTitle: {
      zh: '隨機分組怎麼平衡人數？課堂小組規模與例外處理',
      en: 'Random Classroom Groups: Balance Group Sizes',
    },
    metaDescription: {
      zh: '用隨機分組工具前，先決定理想小組大小、可接受的人數差、缺席與最後一組規則；分組後用名單檢查人數、角色與任務需求，避免只追求看似隨機而忽略課堂流程。',
      en: 'Before randomizing classroom groups, set the ideal size, acceptable difference, absence rule, and last-group policy; verify roster counts against the task afterward.',
    },
    h1: {
      zh: '課堂隨機分組怎麼平衡人數：從規則設定到名單驗收',
      en: 'How to Balance Classroom Group Sizes After Random Assignment',
    },
    category: { zh: '教學工作流程', en: 'Teaching workflows' },
    priority: 57,
    searchIntent: {
      zh: '教師想快速隨機分組，但班級人數不一定能整除，還可能有缺席、特殊任務或不宜同組的條件，因此需要一套先定規則、再檢查人數與調整例外的方法。',
      en: 'A teacher wants fast random groups even when enrollment does not divide evenly and absences or task constraints exist, so they need rules, a size check, and a documented exception process.',
    },
    targetKeywords: [
      { zh: '隨機分組 人數平衡', en: 'balance random group sizes' },
      { zh: '課堂小組人數怎麼分', en: 'classroom group size strategy' },
      { zh: '隨機分組缺席處理', en: 'random grouping absent students' },
    ],
    relatedToolIds: ['random-group-generator', 'group-generator', 'random-student-picker'],
    relatedGuideIds: ['classroom-random-group-no-repeat-guide', 'classroom-group-roles-rotation-guide', 'seating-chart-student-needs-intake-guide'],
    relatedWorkflowIds: ['teacher-classroom-random-toolkit'],
    summary: {
      zh: '隨機不等於不需要規則。先決定任務需要幾人、班級人數差一人時怎麼處理，再用工具產生結果，最後對照名單與任務角色驗收。',
      en: 'Random does not mean rule-free. Decide how many students the task needs and what to do with a remainder, then generate and verify groups against the roster and roles.',
    },
    problem: {
      zh: '把 29 位學生直接分成 5 組，可能出現 6、6、6、6、5，也可能因缺席變成任務無法執行的單人組。若教師沒有先寫出可接受差異，學生會把事後調整誤解為不公平。',
      en: 'Putting 29 students into five groups can yield 6, 6, 6, 6, 5, but absences may create a group too small for the task. Without a declared tolerance, later adjustments can look unfair.',
    },
    whoShouldUse: {
      zh: '適合需要討論、實驗、同儕互評或輪流角色的教師，也適合在固定班級中定期重新分組、又想保留可解釋規則的人。',
      en: 'Useful for discussions, labs, peer review, rotating roles, and classes that regroup regularly while keeping a clear, explainable rule.',
    },
    explanation: [
      {
        zh: '先從任務而不是工具開始。兩人互評、四人拼圖與需要記錄員的實驗，對小組大小的需求不同；Cornell 的主動學習資源也把 think-pair-share、小組討論與結構化工作單視為不同互動形式（https://teaching.cornell.edu/teaching-resources/engaging-students/active-learning）。',
        en: 'Start from the task, not the tool. Peer review, a four-person jigsaw, and a lab with a recorder need different sizes; Cornell’s active-learning resources distinguish pair-share, group discussion, and structured worksheets (https://teaching.cornell.edu/teaching-resources/engaging-students/active-learning).',
      },
      {
        zh: '把理想人數、最小人數、最大人數與可接受差異寫在課前規則。例如理想 4 人、允許 3–5 人；這比事後看到結果才決定哪組要調整更容易說明。',
        en: 'Write the ideal, minimum, maximum, and tolerance before class, such as ideal four with an allowed range of three to five. This is easier to explain than deciding after seeing the result.',
      },
      {
      zh: '先處理名單狀態：缺席、轉學生、前置工作不足的學生是否先排除或保留？工具只能依輸入名單分配，不能猜測誰今天能參與。',
        en: 'Resolve roster status first: should absent students, transfers, or students missing prerequisite work be excluded or kept? A tool can only assign the list it receives.',
      },
      {
        zh: '人數不能整除時，通常讓差異最多一人，並把較大的組分散到不同任務。不要讓所有多出來的學生集中到同一組，除非活動規則明確要求。',
        en: 'When enrollment does not divide evenly, keep the difference to one where possible and spread larger groups across tasks. Do not put every remainder in one group unless the activity requires it.',
      },
      {
        zh: '隨機分組要與「不可同組」或「需要支援」的條件分開記錄。若有明確的安全、照顧或學習支援需求，先依校規處理，再在剩餘名單中隨機，並保留調整理由。',
        en: 'Record hard constraints such as safeguarding or support separately from randomization. Follow school policy first, then randomize the remaining list and record the reason for any adjustment.',
      },
      {
        zh: '產生結果後檢查的不只是人數，還包括每組是否有足夠角色、材料與報告時間。角色輪替指南可協助避免一組 3 人卻被分配 4 個不可合併的責任。',
        en: 'After generation, check roles, materials, and reporting time, not only counts. A role-rotation plan helps prevent a three-person group receiving four non-combinable responsibilities.',
      },
      {
        zh: '保存分組結果與規則版本，下一次可避免重複或解釋差異。不要承諾每次都完全不重複；把「本輪隨機」與「跨輪限制」分成兩個可驗證的條件。',
        en: 'Save the result and rule version so the next round can avoid unnecessary repeats or explain differences. Separate “random this round” from any cross-round no-repeat requirement.',
      },
    ],
    steps: [
      { zh: '寫下活動目標、理想小組大小、允許差異與角色需求。', en: 'Write the activity goal, ideal size, allowed difference, and role needs.' },
      { zh: '更新名單，標記缺席、支援條件與不可同組的硬性規則。', en: 'Update the roster with absences, support needs, and hard no-together constraints.' },
      { zh: '決定人數不能整除時的餘數分配與最後一組最低人數。', en: 'Decide how to distribute a remainder and the minimum size for the final group.' },
      { zh: '用隨機分組工具輸入已確認名單，保存本輪設定與結果。', en: 'Use the random group tool with the confirmed roster and save the settings and result.' },
      { zh: '逐組核對人數、角色、材料與任務時間是否可行。', en: 'Check each group’s size, roles, materials, and time against the task.' },
      { zh: '只依課前規則處理例外，記錄調整者、原因與新的結果。', en: 'Handle exceptions only under the predeclared rule, recording the editor, reason, and new result.' },
      { zh: '向學生說明分組規則與回報方式，課後保存結果供下輪參考。', en: 'Explain the rule and reporting method to students, then retain the result for the next round.' },
    ],
    example: {
      zh: '一班 29 人要做五站輪轉實驗。教師先訂理想 5–6 人、差異最多 1 人，並把缺席 2 人從當日名單移除；工具產生 5、5、5、6、6 人組，教師再確認每組都有安全說明閱讀者與紀錄者，沒有為了「看起來平均」而破壞任務角色。',
      en: 'A class of 29 runs a five-station lab. The teacher sets an ideal of five to six students with a difference of one and removes two absences from today’s roster. The tool creates groups of 5, 5, 5, 6, and 6; the teacher verifies each has a safety reader and recorder instead of chasing identical sizes.',
    },
    commonMistakes: [
      { zh: '先按工具預設分組，事後才發現任務需要不同人數。', en: 'Using the tool default before checking what the task requires.' },
      { zh: '沒有事前定義餘數、缺席與最後一組的最低人數。', en: 'Failing to define remainders, absences, or the final group minimum.' },
      { zh: '把需要支援或不可同組的條件當成隨機輸入，造成不必要調整。', en: 'Treating support or no-together constraints as random inputs and creating avoidable changes.' },
      { zh: '只看每組人數，沒有檢查角色、材料與報告時間。', en: 'Checking counts only and ignoring roles, materials, or reporting time.' },
      { zh: '為了完全相同的人數，把所有餘數塞到一組。', en: 'Forcing identical counts by putting every remainder into one group.' },
      { zh: '沒有保存規則與結果，下一輪無法解釋重複或調整。', en: 'Saving neither rules nor results, making later repeats or adjustments impossible to explain.' },
    ],
    faq: [
      { question: { zh: '班級人數不能整除時怎麼分組最公平？', en: 'What is the fairest split when the class size does not divide evenly?' }, answer: { zh: '先依任務設定可接受範圍，通常讓各組差異不超過一人，再把較大組分散；公平是規則一致且能完成任務，不一定是每組完全同人數。', en: 'Set a task-based range, usually keeping the difference to one, and spread larger groups. Fairness is a consistent rule that supports the task, not necessarily identical counts.' } },
      { question: { zh: '缺席學生要放進隨機分組名單嗎？', en: 'Should absent students stay in the randomization list?' }, answer: { zh: '依當日活動規則決定；若不會參與，先從當日名單移除並記錄，避免產生現場不存在的組別。', en: 'Use the day’s rule. If they cannot participate, remove them from that day’s roster and record it so the output matches the room.' } },
      { question: { zh: '可以同時設定不重複與平衡人數嗎？', en: 'Can I require both no-repeat pairings and balanced sizes?' }, answer: { zh: '可以，但要把它們視為不同條件，先確認工具支援程度；若無法同時滿足，依課前排序的優先規則處理並說明例外。', en: 'Yes, but treat them as separate constraints and check tool support. If both cannot be met, follow the predeclared priority and document the exception.' } },
      { question: { zh: '學生質疑分組不公平時怎麼說明？', en: 'How should I explain a grouping students question?' }, answer: { zh: '說明課前設定的人數範圍、缺席處理與必要例外，不必公開個別支援資訊；讓學生知道規則先於結果。', en: 'Explain the predeclared size range, absence rule, and necessary exceptions without exposing private support details. Emphasize that the rule came before the result.' } },
    ],
    cta: {
      zh: '先用課堂隨機分組工具產生名單，再依人數、角色、材料與課前例外規則完成驗收。',
      en: 'Generate the roster with the classroom random group tool, then verify size, roles, materials, and predeclared exceptions.',
    },
    updatedAt: '2026-09-03',
    noFaqSchema: true,
  },
  {
    id: 'qr-code-accessible-fallback-guide',
    locales: ['zh', 'en'],
    slug: 'qr-code-accessible-fallback-guide',
    title: {
      zh: 'QR Code 無障礙替代入口指南',
      en: 'QR Code Accessible Fallback Guide',
    },
    metaTitle: {
      zh: 'QR Code 之外要提供什麼？無障礙文字網址與替代入口',
      en: 'QR Code Accessibility: Add a Text Fallback',
    },
    metaDescription: {
      zh: 'QR Code 不是唯一入口；在海報、講義與活動頁同時提供可讀文字網址、清楚連結名稱與不依賴相機的替代流程，並測試手機、鍵盤與螢幕閱讀器使用情境。',
      en: 'Do not make a QR Code the only route: provide a readable URL, clear link name, and camera-free fallback, then test mobile, keyboard, and screen-reader paths.',
    },
    h1: {
      zh: 'QR Code 無障礙怎麼做：文字網址、替代入口與實際測試流程',
      en: 'How to Make a QR Code Flow More Accessible with a Text Fallback',
    },
    category: { zh: 'QR Code 工作流程', en: 'QR Code workflows' },
    priority: 58,
    searchIntent: {
      zh: '使用者要在紙本或活動頁放 QR Code，但希望沒有相機、視力或手部操作限制的人也能完成同一任務，因此需要可讀網址、連結文字與替代入口的設計與驗收方法。',
      en: 'A user wants a QR Code on print or an event page while keeping the same task available to people without a camera or with visual or motor needs, using readable URLs and clear fallback links.',
    },
    targetKeywords: [
      { zh: 'QR Code 無障礙替代', en: 'accessible QR Code fallback' },
      { zh: 'QR Code 文字網址', en: 'QR Code text URL alternative' },
      { zh: 'QR Code 螢幕閱讀器', en: 'QR Code screen reader accessibility' },
    ],
    relatedToolIds: ['qr-code-generator', 'url-encoder', 'character-counter'],
    relatedGuideIds: ['qr-code-mobile-landing-page-guide', 'qr-code-before-print-testing-guide', 'qr-code-utm-campaign-link-guide'],
    relatedWorkflowIds: ['qr-barcode-publishing-toolkit'],
    summary: {
      zh: '掃描只是其中一種操作方式。把 QR Code 的目的地、文字網址、連結名稱與替代流程一起設計，才能讓印刷品和網頁在不同裝置與能力下仍可完成任務。',
      en: 'Scanning is only one interaction. Design the destination, readable URL, link name, and fallback together so print and web users can complete the task across devices and abilities.',
    },
    problem: {
      zh: '只放一張 QR 圖會把任務綁在相機、光線與精細瞄準上；只寫「點此」的替代連結又無法說明目的。若替代入口沒有與 QR 指向同一版本，使用者還會收到不同內容。',
      en: 'A QR-only design depends on a camera, lighting, and precise aiming. A link labeled only click here does not explain its purpose, and a fallback pointing to another version creates inconsistent results.',
    },
    whoShouldUse: {
      zh: '適合製作活動海報、課堂講義、醫療或公共服務指引、包裝說明與需要兼顧紙本和網頁讀者的團隊。',
      en: 'Useful for event posters, handouts, public-service instructions, packaging, and teams serving both print and web readers.',
    },
    explanation: [
      {
        zh: '先寫清楚 QR Code 讓人完成什麼任務，再決定替代入口。替代連結的目的不是複製一張 QR 圖，而是讓使用者在沒有相機時仍能開啟同一目的地、填表或取得文件。',
        en: 'Describe the task before choosing the fallback. The fallback is not a duplicate image; it lets someone without a camera reach the same destination, submit a form, or obtain the same document.',
      },
      {
        zh: '印刷品可在 QR 圖旁放短而可讀的網址，網頁則提供真正的文字連結。連結文字要說明目的，例如「開啟活動報名表」，而不是只有「點此」。',
        en: 'Put a short readable URL beside a printed QR Code and provide a real text link on the web. Link text should describe the purpose, such as open the event registration form, not just click here.',
      },
      {
        zh: 'WCAG 對非文字內容與連結目的都要求提供可理解的替代資訊；QR 圖本身不是完整說明，旁邊的文字與頁面標題要讓使用者知道會去哪裡（https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html）。',
        en: 'WCAG addresses alternatives for non-text content and link purpose. The QR image is not a complete explanation; nearby text and the page title should tell users where the route goes (https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html).',
      },
      {
        zh: '替代網址也要通過相同的語言、登入、權限與手機版檢查。若 QR Code 帶有 UTM 或版本參數，文字網址應使用相同的最終目的地，避免兩條路徑進入不同活動頁。',
        en: 'Run the same language, login, permission, and mobile checks on the fallback URL. If the QR carries UTM or version parameters, decide whether the readable URL should use the same final destination so users do not enter different event pages.',
      },
      {
        zh: '短網址方便印刷，但要有清楚的維護責任與失效處理。不要用無法控制的第三方縮網址取代真正目的地；若使用短網址，至少保留原始連結與更新紀錄。',
        en: 'A short URL helps print, but it needs an owner and retirement plan. Do not replace the destination with an uncontrolled shortener; retain the original URL and update record when using one.',
      },
      {
        zh: '測試不能只找能成功掃描的人。請測試者用鍵盤、螢幕閱讀器、放大文字、低光環境與沒有相機的情境走完同一流程；W3C 的連結目的說明可協助檢查名稱是否足夠清楚（https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html）。',
        en: 'Do not test only with someone who can scan. Ask testers to use a keyboard, screen reader, enlarged text, low light, and a camera-free path; W3C’s link-purpose guidance helps check whether names are sufficiently clear (https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html).',
      },
      {
        zh: '上線前確認替代入口與 QR Code 同時更新。活動換期、表單換版本或頁面停用時，兩條路徑都要顯示更新資訊或替代聯絡方式，而不是讓其中一條留在 404。',
        en: 'Update the fallback and QR destination together. When an event, form, or page changes, both routes should show the update or contact option instead of leaving one path at a 404.',
      },
    ],
    steps: [
      { zh: '定義 QR Code 的任務與沒有相機時的等效替代流程。', en: 'Define the QR task and an equivalent camera-free fallback.' },
      { zh: '建立短而可讀的網址，並在網頁使用描述性連結文字。', en: 'Create a short readable URL and use descriptive link text on the web.' },
      { zh: '用 QR Code 工具生成圖案，確認它與文字網址指向同一版本。', en: 'Generate the QR with the tool and confirm it matches the text URL and version.' },
      { zh: '測試手機、鍵盤、放大文字、螢幕閱讀器與低光情境。', en: 'Test mobile, keyboard, enlarged text, screen reader, and low-light scenarios.' },
      { zh: '檢查語言、登入、權限、UTM 與重新導向結果。', en: 'Check language, login, permission, UTM, and redirect behavior.' },
      { zh: '把 QR 圖、文字網址、目的地版本與負責人寫入發布清單。', en: 'Record the QR, readable URL, destination version, and owner in a release manifest.' },
      { zh: '活動或頁面變更時同步更新兩條路徑並測試失效處理。', en: 'When the event or page changes, update both paths and test retirement handling.' },
    ],
    example: {
      zh: '圖書館海報用 QR Code 連到預約表單，設計者在旁邊印出短網址並寫「開啟自習室預約表」。螢幕閱讀器測試發現網頁按鈕只有「點此」，團隊改成描述性文字，並確認無相機測試者也能完成相同預約。',
      en: 'A library poster links to a reservation form with a QR Code. The designer prints a short URL and labels it open the study-room reservation form. A screen-reader test finds a button labeled only click here, so the team changes the name and confirms a camera-free tester can complete the same reservation.',
    },
    commonMistakes: [
      { zh: '把 QR Code 當成唯一入口，沒有提供文字網址或其他流程。', en: 'Making the QR Code the only route without a readable URL or fallback.' },
      { zh: '替代連結只寫「點此」，使用者不知道會開啟什麼。', en: 'Using click here without explaining the destination.' },
      { zh: '文字網址與 QR Code 指向不同版本或不同語言頁面。', en: 'Pointing the readable URL and QR Code to different versions or languages.' },
      { zh: '只在明亮環境用相機測試，沒有測試鍵盤、放大或螢幕閱讀器。', en: 'Testing only with a camera in bright light and ignoring keyboard, zoom, or screen reader paths.' },
      { zh: '使用無法維護的短網址，活動結束後留下失效入口。', en: 'Using an unowned short URL that becomes dead after the event.' },
      { zh: '頁面更新時只改 QR 目的地，忘了同步印刷品旁的文字網址。', en: 'Updating only the QR destination and forgetting the readable URL beside it.' },
    ],
    faq: [
      { question: { zh: 'QR Code 無障礙一定要印完整網址嗎？', en: 'Must I print a full URL beside a QR Code?' }, answer: { zh: '不一定要很長的完整網址，但要提供可讀、可輸入且能到達同一任務的文字入口；網頁上則應使用真正的描述性連結。', en: 'Not necessarily a long full URL, but provide a readable, typeable route to the same task and a real descriptive link on the web.' } },
      { question: { zh: '短網址會不會比完整網址危險？', en: 'Are short URLs riskier than full URLs?' }, answer: { zh: '短網址會隱藏目的地，且需要維護；若使用，應選可控制的網域、保留原始 URL、使用 HTTPS 並在發布前測試重新導向。', en: 'Short URLs hide the destination and need maintenance. Use a domain you control, retain the original URL, use HTTPS, and test redirects before publishing.' } },
      { question: { zh: '螢幕閱讀器能讀 QR Code 嗎？', en: 'Can a screen reader read a QR Code?' }, answer: { zh: '不要假設能。把目的地與任務寫成文字連結或說明，讓使用者不必辨識圖案也能完成流程。', en: 'Do not assume it can. Provide the destination and task as text so the user can complete the flow without identifying the pattern.' } },
      { question: { zh: '活動頁過期後替代入口怎麼處理？', en: 'What should happen when an event page expires?' }, answer: { zh: 'QR 與文字網址都應導向更新說明、下一期活動或聯絡方式，並保留版本與停用日期，避免單一路徑變成 404。', en: 'Both routes should show an update, next event, or contact option, with a version and retirement date instead of a single path becoming a 404.' } },
    ],
    cta: {
      zh: '用 QR Code 工具生成後，在旁邊加入可讀文字入口，並以鍵盤、放大文字與螢幕閱讀器測試同一任務。',
      en: 'Generate the QR, add a readable fallback, and test the same task with keyboard, zoom, and screen-reader paths.',
    },
    updatedAt: '2026-09-03',
    noFaqSchema: true,
  },
  {
    id: 'classroom-random-group-absent-student-repair-guide',
    locales: ['zh', 'en'],
    slug: 'classroom-random-group-absent-student-repair-guide',
    title: {
      zh: '隨機分組遇到缺席學生的修補指南',
      en: 'Random Groups with Absent Students',
    },
    metaTitle: {
      zh: '分組後有人缺席怎麼辦？課堂小組快速修補流程',
      en: 'Absent Students After Random Groups: Repair Plan',
    },
    metaDescription: {
      zh: '隨機分組公布後遇到缺席、早退或臨時轉組，先依任務角色與人數規則做最小幅度修補，保留原始結果與調整紀錄，讓學生知道變更有一致、可說明的依據並維持課堂公平感。',
      en: 'When an absence disrupts random groups, make a minimal role-aware repair, keep the original and updated rosters, and explain the shared rule clearly.',
    },
    h1: {
      zh: '隨機分組後有人缺席怎麼辦：不重抽全部名單的課堂修補流程',
      en: 'How to Repair Random Classroom Groups When Someone Is Absent',
    },
    category: { zh: '教學工作流程', en: 'Teaching workflows' },
    priority: 59,
    searchIntent: {
      zh: '教師已經用隨機分組工具產生名單，卻在上課前或活動中遇到缺席、早退或臨時加入，想用最少變更維持人數、角色與公平感，而不是每次都全部重抽。',
      en: 'A teacher has generated random groups but faces an absence, early departure, or late arrival and needs a minimal repair that preserves size, roles, and trust without rerolling everyone.',
    },
    targetKeywords: [
      { zh: '隨機分組 缺席', en: 'random groups absent student' },
      { zh: '課堂分組臨時調整', en: 'classroom group last-minute change' },
      { zh: '分組不重抽修補', en: 'repair groups without rerolling' },
    ],
    relatedToolIds: ['random-group-generator', 'group-generator', 'random-student-picker'],
    relatedGuideIds: ['classroom-random-group-size-balance-guide', 'classroom-random-group-no-repeat-guide', 'classroom-group-roles-rotation-guide'],
    relatedWorkflowIds: ['teacher-classroom-random-toolkit'],
    summary: {
      zh: '缺席發生後，最公平的做法通常不是把所有人重新洗牌，而是依課前寫好的優先順序做最小幅度修補，並讓每組仍有完成任務所需的角色。',
      en: 'After an absence, fairness usually means a minimal repair under a prewritten priority order, not reshuffling everyone, while keeping the roles needed for the task.',
    },
    problem: {
      zh: '一名學生缺席可能讓某組少一人、失去記錄員或無法達到安全要求。臨時憑直覺把人拉過去，容易造成重複搭配、角色過載與「老師偏心」的印象。',
      en: 'One absence can leave a group short, remove a recorder, or break a safety requirement. Moving someone by intuition can create repeat pairings, overloaded roles, and a perception of favoritism.',
    },
    whoShouldUse: {
      zh: '適合討論、實驗、同儕互評、輪站活動與需要固定角色的課堂，尤其是班級人數常變或學生會臨時離席的情境。',
      en: 'Useful for discussions, labs, peer review, stations, and role-based activities where enrollment changes during class.',
    },
    explanation: [
      {
        zh: '先在分組前寫出修補優先順序：可否由同組成員吸收、是否需要跨組借人、何時才重抽全部。事先定義能把「臨場決定」變成每次都一致的流程。',
        en: 'Write a repair priority before grouping: can the group absorb the change, should a member be borrowed, and when is a full reroll justified? A prior rule keeps decisions consistent.',
      },
      {
        zh: '先看任務最低人數與角色，而不是只看總人數。三人討論可能仍可完成，四人實驗若缺安全觀察者就不可直接照搬；Cornell 的主動學習資源把不同合作形式視為不同教學設計，提醒教師先對齊任務（https://teaching.cornell.edu/teaching-resources/engaging-students/active-learning）。',
        en: 'Check the task minimum and roles before total counts. A three-person discussion may work while a four-person lab cannot lose its safety observer; Cornell’s active-learning resources distinguish collaboration formats, so align the repair with the task (https://teaching.cornell.edu/teaching-resources/engaging-students/active-learning).',
      },
      {
        zh: '若只是少一人且仍在可接受範圍，可保留原分組，重新分配缺席者的角色。若某組低於最低人數，優先從人數較大的組借一人，並檢查下一輪是否造成新的單人或角色缺口。',
        en: 'If one person is missing but the group remains within the range, keep the groups and redistribute the absent role. If a group falls below minimum, borrow from a larger group and check that the move does not create a new gap.',
      },
      {
        zh: '臨時加入的學生不要直接塞入第一組。先判斷哪組缺角色、哪組仍在上限，再依同一個隨機或輪替規則放入，並標記這是補位而非原始抽籤結果。',
        en: 'Do not put a late arrival into the first group. Find the group missing a role and below its maximum, apply the same random or rotation rule, and label the move as a repair rather than the original draw.',
      },
      {
        zh: '保留原始名單、缺席時間、調整者與新名單。記錄不是為了懲罰學生，而是讓教師能解釋為何沒有全部重抽，也能在下一次分組避免不必要的重複。',
        en: 'Keep the original roster, absence time, editor, and repaired roster. The record explains why a full reroll was not used and helps avoid needless repeats later.',
      },
      {
        zh: '對學生說明規則時只講必要資訊，不公開個別健康、家庭或支援原因。可說明「依課前人數與角色規則調整」，同時保護不應被全班知道的資料。',
        en: 'Explain only what classmates need to know and never disclose private health, family, or support details. State that the change follows the class size and role rule.',
      },
      {
        zh: '活動中再次有人離席時，先讓小組完成可獨立的步驟，再做一次最小修補。若任務涉及安全、評量或敏感資料，依校方流程暫停或重新安排，不要為了維持隨機而冒險。',
        en: 'If another student leaves, let the group finish an independent step before making another minimal repair. For safety, assessment, or sensitive work, follow school procedures rather than preserving randomness at all costs.',
      },
    ],
    steps: [
      { zh: '在活動開始前寫好可接受人數、角色最低需求與重抽條件。', en: 'Write the acceptable size, role minimums, and full-reroll condition before class.' },
      { zh: '保存原始分組結果，標記缺席、早退或臨時加入的學生。', en: 'Save the original groups and mark absences, early departures, or late arrivals.' },
      { zh: '判斷受影響小組是否仍達最低人數與角色需求。', en: 'Check whether the affected group still meets minimum size and role needs.' },
      { zh: '依優先規則吸收、借人或重新分配角色，避免直覺式調動。', en: 'Under the priority rule, absorb, borrow, or reassign a role instead of moving by intuition.' },
      { zh: '用分組工具或清單重新核對每組人數、角色與不可同組條件。', en: 'Use the group tool or manifest to recheck size, roles, and no-together constraints.' },
      { zh: '記錄變更與必要的公開說明，不揭露個人敏感資訊。', en: 'Record the change and the needed class explanation without exposing private details.' },
      { zh: '課後保存修補結果，供下次分組與不重複規則參考。', en: 'Retain the repaired result for the next grouping and no-repeat review.' },
    ],
    example: {
      zh: '五組各 5 人的討論課有一人臨時缺席。教師課前已訂「3 人仍可討論，低於 3 人才借人」，因此保留原分組，把缺席者的摘要角色改由主持人兼任；另一組有新同學加入時，則放入原本缺記錄員且仍未達 5 人的組，並在清單標記為補位。',
      en: 'A discussion class has five groups of five and one last-minute absence. The teacher’s rule says three can still discuss, so the original groups stay and the facilitator covers the absent summary role. A late arrival is placed in the group missing a recorder and still below five, marked as a repair in the manifest.',
    },
    commonMistakes: [
      { zh: '沒有課前修補規則，臨場憑印象把人移到第一個想到的組。', en: 'Having no repair rule and moving someone to the first group that comes to mind.' },
      { zh: '只看人數，沒有確認安全、記錄或評量角色是否缺失。', en: 'Checking counts only and missing safety, recording, or assessment roles.' },
      { zh: '一人缺席就全部重抽，造成其他學生不必要的重複與混亂。', en: 'Rerolling everyone for one absence and creating unnecessary repeats and confusion.' },
      { zh: '臨時加入者直接塞入最小組，讓該組超過上限或失去平衡。', en: 'Putting a late arrival into the smallest group and exceeding its limit or balance.' },
      { zh: '把個人支援或缺席原因公開，讓修補變成隱私問題。', en: 'Disclosing personal support or absence reasons and turning a repair into a privacy issue.' },
      { zh: '沒有保存原始與修補名單，下一次無法解釋重複或變更。', en: 'Saving neither original nor repaired rosters, making later changes impossible to explain.' },
    ],
    faq: [
      { question: { zh: '一人缺席需要全部重新隨機分組嗎？', en: 'Do I need to reroll every group for one absence?' }, answer: { zh: '不一定。若受影響組仍達任務最低人數與角色需求，依課前規則保留原分組通常更穩定；只有低於門檻或安全要求時才考慮更大幅度調整。', en: 'Not necessarily. Keep the original groups when the task minimum and roles still work; consider a larger change only when a threshold or safety requirement fails.' } },
      { question: { zh: '臨時加入的學生應該放哪一組？', en: 'Where should a late-arriving student go?' }, answer: { zh: '找仍未達上限且缺少必要角色的組，依既定隨機或輪替規則補位，並把它標記為修補結果。', en: 'Choose a group below its maximum and missing a needed role, apply the established random or rotation rule, and mark it as a repair.' } },
      { question: { zh: '修補分組會不會不公平？', en: 'Are repaired groups unfair?' }, answer: { zh: '任何調整都可能改變原結果，但事前公開一致的門檻、最小變更原則與紀錄方式，能讓處理可解釋且不依個人偏好。', en: 'Any adjustment changes the original result, but a shared threshold, minimal-change rule, and record make it explainable rather than preference-based.' } },
      { question: { zh: '要不要告訴全班誰為什麼缺席？', en: 'Should I tell the class why someone is absent?' }, answer: { zh: '不需要。只需說明分組依人數與角色規則調整，個別健康、家庭或支援資訊應保密。', en: 'No. Explain that the groups changed under the size and role rule, and keep individual health, family, or support information private.' } },
    ],
    cta: {
      zh: '先用隨機分組工具保存原始名單，再依人數、角色與缺席規則做最小修補並留下紀錄。',
      en: 'Save the original roster, then use the size, role, and absence rules to make the smallest repair and keep a record.',
    },
    updatedAt: '2026-09-03',
    noFaqSchema: true,
  },
  {
    id: 'qr-code-destination-change-log-guide',
    locales: ['zh', 'en'],
    slug: 'qr-code-destination-change-log-guide',
    title: {
      zh: 'QR Code 目的地變更記錄指南',
      en: 'QR Code Destination Change Log Guide',
    },
    metaTitle: {
      zh: 'QR Code 換網址要重印嗎？目的地變更與版本記錄流程',
      en: 'Change a QR Code Destination: Change Log',
    },
    metaDescription: {
      zh: 'QR Code 圖案不變也能更新目的地，但要先確認重新導向、語言、權限與舊連結行為；用版本、日期、負責人與回復方案建立變更記錄，避免活動現場才發現指向錯誤。',
      en: 'A QR image can keep working while its destination changes. Verify redirects, language, access, and rollback, then log each version, date, owner, and test result.',
    },
    h1: {
      zh: 'QR Code 目的地換網址怎麼管理：不重印圖案的變更記錄流程',
      en: 'How to Manage QR Code Destination Changes with a Version Log',
    },
    category: { zh: 'QR Code 工作流程', en: 'QR Code workflows' },
    priority: 60,
    searchIntent: {
      zh: '行銷或活動團隊想在不重印既有 QR Code 的情況下更換網址，並需要一套可測試、可回復、可交接的目的地版本與重新導向管理方法。',
      en: 'A marketing or event team needs to change a QR destination without reprinting, using a tested, reversible, and handoff-friendly version and redirect process.',
    },
    targetKeywords: [
      { zh: 'QR Code 換網址', en: 'change QR Code destination' },
      { zh: 'QR Code 重新導向管理', en: 'QR Code redirect management' },
      { zh: 'QR Code 版本記錄', en: 'QR Code version log' },
    ],
    relatedToolIds: ['qr-code-generator', 'url-encoder', 'character-counter'],
    relatedGuideIds: ['qr-code-event-page-expiry-guide', 'qr-code-utm-campaign-link-guide', 'qr-code-accessible-fallback-guide'],
    relatedWorkflowIds: ['qr-barcode-publishing-toolkit'],
    summary: {
      zh: '可更新的 QR Code 不是「改完就好」：每次目的地變更都要驗證狀態碼、語言、參數與手機流程，並留下能回復到上一版的記錄。',
      en: 'A changeable QR Code still needs release discipline: verify status, language, parameters, and the mobile path, then keep a log that can roll back.',
    },
    problem: {
      zh: '活動海報、包裝或教室講義可能已經印出，團隊卻在後台更換頁面、表單或活動日期。沒有版本記錄時，工作人員不知道哪個網址正在使用，也無法判斷舊掃描是否仍應可用。',
      en: 'Printed posters, packaging, or handouts may remain in circulation while a page, form, or event date changes. Without a log, staff cannot tell which URL is live or whether old scans should still work.',
    },
    whoShouldUse: {
      zh: '適合活動主辦、校園行政、內容營運、包裝團隊與需要多人共同維護 QR Code 目的地的組織。',
      en: 'Useful for event owners, school teams, content operations, packaging teams, and any organization sharing QR destination maintenance.',
    },
    explanation: [
      {
        zh: '先區分「圖案固定」與「目的地可變」兩件事。若 QR 直接編碼最終網址，換網址通常要重印；若使用自己控制的中介網址，則可在中介層更新目的地，但必須承擔維護與失效風險。',
        en: 'Separate a fixed image from a changeable destination. A QR that encodes the final URL usually needs reprinting; a controlled intermediary URL can change, but it creates an ownership and retirement responsibility.',
      },
      {
        zh: '每個目的地要有唯一識別、目前版本、啟用時間與負責人。不要只在聊天訊息裡寫「已改好」，因為交接後沒有人能確認哪一次修改才是正式版本。',
        en: 'Give each destination an identifier, current version, activation time, and owner. Do not rely on a chat message saying it is fixed; after handoff, nobody can tell which edit is official.',
      },
      {
        zh: '變更前先記錄舊網址與預期行為。若舊活動頁應顯示延期說明，就不要直接刪除；若舊連結必須停止，應先準備可理解的停用頁，而不是讓掃描者遇到空白或無限重新導向。',
        en: 'Record the old URL and expected behavior before changing it. If an old event should show a delay notice, do not delete it; if it must retire, prepare a clear retirement page instead of a blank or redirect loop. Include who approves the change, which printed assets are affected, and when the next verification will happen. Store the evidence where support staff can find it during a live event and later handoff for future release support.',
      },
      {
        zh: '重新導向是 HTTP 層的行為，狀態碼與目的地都會影響瀏覽器、快取與搜尋引擎處理；Google Search Central 建議依網站情境選擇永久或暫時重新導向（https://developers.google.com/search/docs/crawling-indexing/301-redirects）。',
        en: 'Redirects are HTTP behavior: status and destination affect browsers, caches, and search handling. Google Search Central explains choosing permanent or temporary redirects for the situation (https://developers.google.com/search/docs/crawling-indexing/301-redirects).',
      },
      {
        zh: '測試不只看首頁能否開啟。要檢查語言版本、登入權限、UTM 是否保留、手機瀏覽器返回鍵與不同網域的 HTTPS，並確認沒有把使用者送到過期活動或錯誤語系。',
        en: 'Do not test only whether the home page opens. Check locale, access, UTM retention, mobile back navigation, HTTPS across domains, and whether users land on an expired event or wrong language.',
      },
      {
        zh: '把回復方案寫進記錄，包含上一版網址、回復條件與測試者。若新表單臨時故障，工作人員可依記錄回到可用版本，而不是在現場猜測。',
        en: 'Write a rollback plan with the previous URL, rollback condition, and tester. If a new form fails, staff can restore a known version instead of guessing on site.',
      },
      {
        zh: '活動結束後仍要處理存量印刷品。可導向下一期活動、結果頁或聯絡方式，並標記停用日期；這比讓 QR 圖突然失效更能保留使用者信任與可追蹤性。',
        en: 'Handle printed copies after an event ends. Route them to the next event, results, or contact option and record a retirement date instead of letting the QR suddenly fail.',
      },
    ],
    steps: [
      { zh: '列出 QR 識別、印刷位置、目前目的地與預期停用日期。', en: 'List the QR identifier, print placement, current destination, and expected retirement date.' },
      { zh: '建立新目的地版本，保留舊網址、參數與語言需求。', en: 'Create the new destination version while retaining the old URL, parameters, and locale needs.' },
      { zh: '用 QR Code 工具掃描或解碼，確認圖案內容與中介網址一致。', en: 'Scan or decode with the QR tool and confirm the image matches the controlled URL.' },
      { zh: '測試 HTTPS、狀態碼、重新導向、UTM、登入與手機返回流程。', en: 'Test HTTPS, status, redirects, UTM, access, and mobile back navigation.' },
      { zh: '記錄啟用時間、測試者、截圖或結果與回復條件。', en: 'Record activation time, tester, evidence, and rollback conditions.' },
      { zh: '通知所有使用印刷品或社群素材的人員，避免有人仍維護舊版本。', en: 'Notify everyone using the print or social asset so nobody maintains an old version.' },
      { zh: '到停用日期再次測試，將舊目的地轉為清楚的更新或聯絡頁。', en: 'Retest on the retirement date and change the old destination to a clear update or contact page.' },
    ],
    example: {
      zh: '社區講座海報的 QR Code 先連到報名表。活動延期後，團隊在自有短網址層建立 v2，導向含新日期的報名頁，保留 v1 記錄並測試 UTM、手機返回與中文頁面；活動結束則改為下一場講座資訊，而不是刪除網址。',
      en: 'A community lecture poster points to a registration form. After a date change, the team creates v2 in its controlled short-link layer, tests UTM, mobile back navigation, and the English page, then routes the retired link to the next lecture instead of deleting it.',
    },
    commonMistakes: [
      { zh: '把直接編碼最終網址的 QR 說成可以隨意改目的地。', en: 'Assuming a QR that encodes the final URL can be changed freely.' },
      { zh: '只改目的地，沒有保存舊版本與回復方式。', en: 'Changing the destination without saving the old version or rollback path.' },
      { zh: '測試時只看首頁，漏掉語系、權限、UTM 或重新導向迴圈。', en: 'Testing only the home page and missing locale, access, UTM, or redirect loops.' },
      { zh: '多人共用短網址卻沒有明確擁有者與停用日期。', en: 'Sharing a short URL without a clear owner or retirement date.' },
      { zh: '活動延期後刪除舊頁，讓已印出的 QR 直接失效。', en: 'Deleting the old page after a delay and breaking printed QR scans.' },
      { zh: '只通知行銷人員，忘記同步更新客服、現場與社群排程。', en: 'Telling marketing only and missing support, on-site, or social schedulers.' },
    ],
    faq: [
      { question: { zh: 'QR Code 換網址一定要重新印嗎？', en: 'Must I reprint a QR Code when the URL changes?' }, answer: { zh: '若圖案直接編碼最終網址，通常要重印；若圖案指向自己控制的中介網址，可以更新中介目的地，但仍要負責測試、維護與停用。', en: 'Usually yes when the image encodes the final URL. A controlled intermediary can change destinations, but it still needs testing, maintenance, and retirement.' } },
      { question: { zh: '重新導向要用 301 還是 302？', en: 'Should a QR redirect use 301 or 302?' }, answer: { zh: '依變更是否永久與網站架構決定，並先閱讀 Google Search Central 的重新導向說明；活動短期調整不要在沒有理由時永久化。', en: 'Choose based on whether the change is permanent and your site structure. Review Google Search Central guidance, and do not make a temporary event change permanent without a reason.' } },
      { question: { zh: '版本記錄至少要保存什麼？', en: 'What should a destination log contain?' }, answer: { zh: '至少保存 QR 識別、舊新網址、版本、啟用時間、負責人、測試結果與回復條件，讓下一位維護者能重現判斷。', en: 'Keep the identifier, old and new URLs, version, activation time, owner, test result, and rollback condition so the next maintainer can reproduce the decision.' } },
      { question: { zh: '活動結束後 QR Code 應該刪除嗎？', en: 'Should I delete a QR Code after an event?' }, answer: { zh: '不一定。若仍有印刷品流通，導向更新說明、下一場活動或聯絡方式通常比直接 404 更友善，並設定清楚停用日期。', en: 'Not always. While printed copies circulate, an update, next event, or contact page is usually better than a sudden 404; set a clear retirement date.' } },
    ],
    cta: {
      zh: '用 QR Code 工具確認圖案後，建立目的地版本記錄，逐項驗收重新導向、語言、參數與手機流程。',
      en: 'Verify the image with the QR tool, then release a destination version log covering redirects, locale, parameters, and the mobile path.',
    },
    updatedAt: '2026-09-03',
    noFaqSchema: true,
  },
  {
    id: 'classroom-random-group-shareable-result-guide',
    locales: ['zh', 'en'],
    slug: 'classroom-random-group-shareable-result-guide',
    title: {
      zh: '課堂隨機分組結果分享指南',
      en: 'Share Classroom Random Group Results Clearly',
    },
    metaTitle: {
      zh: '隨機分組結果怎麼公布？投影、列印與隱私友善分享方法',
      en: 'How to Share Random Group Results in Class',
    },
    metaDescription: {
      zh: '隨機分組完成後，依學生看得懂、教師能核對、個人資料不過度曝光的原則公布結果；比較投影、列印、個別通知與代碼清單，並準備缺席、更正與課堂回報流程。',
      en: 'After randomizing, share results students can understand and teachers can verify without exposing extra personal data. Compare display, print, and private notices.',
    },
    h1: {
      zh: '課堂隨機分組結果怎麼公布：清楚、可核對又兼顧隱私的分享流程',
      en: 'How to Share Classroom Random Group Results Clearly and Privately',
    },
    category: { zh: '教學工作流程', en: 'Teaching workflows' },
    priority: 61,
    searchIntent: {
      zh: '教師已用隨機分組工具產生名單，接下來要在教室、線上課程或混合場景公布結果，希望學生能快速找到自己的組別，同時避免投影或公開文件暴露不必要的個人資料。',
      en: 'A teacher has generated groups and needs to publish them in a classroom, online, or hybrid setting so students find their group quickly without exposing unnecessary personal data.',
    },
    targetKeywords: [
      { zh: '隨機分組結果公布', en: 'share random group results' },
      { zh: '課堂分組名單隱私', en: 'classroom group list privacy' },
      { zh: '分組名單投影', en: 'project group assignments' },
    ],
    relatedToolIds: ['random-group-generator', 'group-generator', 'random-student-picker'],
    relatedGuideIds: ['classroom-random-group-size-balance-guide', 'classroom-random-group-absent-student-repair-guide', 'classroom-group-roles-rotation-guide'],
    relatedWorkflowIds: ['teacher-classroom-random-toolkit'],
    summary: {
      zh: '公布分組不是把完整名單貼出去就結束；先決定誰需要看到什麼，再選投影、列印、代碼或個別通知，並保留教師用的核對版本。',
      en: 'Publishing is more than pasting a full roster. Decide who needs which details, choose display, print, codes, or private notices, and keep a teacher verification copy. A short spoken orientation helps students act on the result without guessing.',
    },
    problem: {
      zh: '完整名單可能含有不應長時間公開的資訊，投影照片或分享連結也可能被保存。若結果格式太小、沒有組別標籤或缺席後未更新，學生會找不到位置，教師也難以核對。',
      en: 'A full roster may expose details that should not remain public, while a projected photo or shared link can be saved. Tiny text, missing labels, or stale absences also make results hard to use.',
    },
    whoShouldUse: {
      zh: '適合面授、線上與混合教學的教師、助教與活動主持人，尤其是需要快速公布多組名單又要保留更正紀錄的場合。',
      en: 'Useful for teachers, teaching assistants, and facilitators in in-person, online, or hybrid settings who need fast publication and a correction record.',
    },
    explanation: [
      {
        zh: '先把「教師核對版」和「學生看到的公布版」分開。核對版可包含輸入順序、規則、時間與調整欄位；公布版只放完成任務所需的組別、座位或角色資訊。',
        en: 'Separate the teacher verification copy from the student-facing version. The first can contain inputs, rules, time, and edits; the second should show only the group, seat, or role details needed for the task.',
      },
      {
        zh: '投影適合快速開始，但要使用足夠字級、清楚的組別標題與短暫顯示時間。若學生需要課後查閱，應提供受控的列印或個別通知，而不是假設大家都能拍照保存。',
        en: 'Projection is quick, but use readable type, clear group headings, and limited display time. For later reference, provide controlled print or private notices instead of assuming everyone can photograph the screen.',
      },
      {
        zh: '若班級使用代碼或座號，先確認每位學生知道自己的對應方式；不要讓代碼變成只有教師看得懂的謎題。對新加入、缺席或姓名相似的學生，準備人工核對入口。',
        en: 'If you use codes or seat numbers, confirm every student knows the mapping. Codes should not become a puzzle only the teacher can solve; prepare a manual check for late arrivals, absences, and similar names.',
      },
      {
        zh: '結果分享要能回到原始名單核對。保留產生時間、工具設定與修改者，遇到學生提出疑問時，可以說明是哪個規則造成結果，而不是重新憑印象猜一次。',
        en: 'Make the shared result traceable to the original roster. Keep generation time, settings, and editor so questions can be answered from the rule instead of a second guess.',
      },
      {
        zh: '公布前做一次可讀性檢查：在教室最後一排、手機直向畫面與低頻寬情境測試。學生找不到自己不是「不專心」，可能只是格式沒有提供可搜尋或可辨認的線索。',
        en: 'Run a readability check from the back of the room, on a phone in portrait mode, and under low bandwidth. A student missing their name may reflect poor format, not inattention.',
      },
      {
        zh: '更正要有明顯版本與時間。不要默默覆蓋舊圖；標示「更新版」、通知受影響的小組，並保留教師記錄，避免不同學生持有不同答案。',
        en: 'Corrections need a visible version and time. Do not silently overwrite an old image; mark the update, notify affected groups, and keep the teacher record so students do not hold conflicting answers.',
      },
      {
        zh: '活動結束後依課程需要保存或刪除學生可見版本。教師備份應與學生分享連結分開管理，避免下次課堂誤用過期名單或把上一班資料帶入新活動。',
        en: 'After the activity, retain or remove the student-facing copy according to course needs. Keep teacher backup separate from shared links so an old roster is not reused in the next class.',
      },
    ],
    steps: [
      { zh: '整理教師核對版，確認名單、規則、角色與版本時間。', en: 'Prepare the teacher copy with roster, rules, roles, and version time.' },
      { zh: '決定學生需要看到的最少欄位與適合的分享方式。', en: 'Choose the minimum student-facing fields and a suitable sharing method.' },
      { zh: '用隨機分組工具產生結果，統一組別標題、字級與排序。', en: 'Generate the result and standardize group labels, type size, and order.' },
      { zh: '從不同座位、手機與網路情境測試能否快速找到組別。', en: 'Test whether students can find their group from different seats, phones, and network conditions.' },
      { zh: '公布結果並說明版本時間、提問入口與缺席處理方式。', en: 'Publish the result with its version time, question route, and absence procedure.' },
      { zh: '有更正時建立新版本、通知受影響者並保存變更紀錄。', en: 'For corrections, create a new version, notify affected students, and save the change record.' },
      { zh: '活動後分開管理教師備份與學生可見連結，清理過期版本。', en: 'After class, separate teacher backup from student links and retire stale versions.' },
    ],
    example: {
      zh: '教師將 32 人分成八組，先保存含時間與規則的核對表，再投影大字版組別卡 90 秒。需要課後查閱的學生透過校內受控頁面用座號查詢；一人臨時缺席時，教師發布 v2 並只通知受影響的兩組，沒有重新投影完整姓名名單。',
      en: 'A teacher splits 32 students into eight groups, saves a timestamped verification sheet, and projects large group cards for 90 seconds. Students who need later access use a controlled seat-number lookup; after one absence, v2 is sent to only the two affected groups.',
    },
    commonMistakes: [
      { zh: '把教師內部完整名單直接投影或公開分享。', en: 'Projecting or sharing the full teacher roster as-is.' },
      { zh: '字太小、組別標題不清，學生無法從後排或手機辨認。', en: 'Using tiny type or unclear headings that fail from the back row or on phones.' },
      { zh: '只發布圖片沒有版本時間，更新後不同人持有不同答案。', en: 'Posting an image without a version time so updates create conflicting answers.' },
      { zh: '用代碼卻沒有提供學生查詢或人工核對方式。', en: 'Using codes without a student lookup or manual verification path.' },
      { zh: '缺席或臨時加入後仍沿用舊名單。', en: 'Leaving the old roster in place after an absence or late arrival.' },
      { zh: '把上一堂課的公開連結留在下一次活動仍可存取。', en: 'Leaving a prior class link accessible during the next activity.' },
    ],
    faq: [
      { question: { zh: '分組結果適合直接投影姓名嗎？', en: 'Is it fine to project student names directly?' }, answer: { zh: '先依課程與校方規範判斷必要性；通常只顯示完成活動需要的資訊，並控制顯示時間，課後查閱則使用受控方式。', en: 'Check course and school requirements first. Usually show only what the activity needs, limit display time, and use a controlled method for later access.' } },
      { question: { zh: '用座號或代碼公布會比較好嗎？', en: 'Are seat numbers or codes better?' }, answer: { zh: '它們可減少公開姓名，但前提是學生能可靠對應自己的代碼，且有人工核對入口處理新生、缺席與相似姓名。', en: 'They can reduce exposed names, provided students can reliably map their code and a manual check handles late arrivals, absences, and similar names.' } },
      { question: { zh: '分組結果更正要不要重新抽籤？', en: 'Must a correction trigger a full reroll?' }, answer: { zh: '不一定。依課前的人數、角色與修補規則做最小變更，發布清楚的新版並保留原始結果，通常更容易解釋。', en: 'Not necessarily. Apply the predeclared size, role, and repair rules, publish a clear new version, and retain the original for explanation.' } },
      { question: { zh: '活動後要保留分組名單多久？', en: 'How long should I keep the group list?' }, answer: { zh: '依課程、校方與資料管理要求決定；至少把學生可見版本與教師備份分開，並清楚標示過期版本，避免下次誤用。', en: 'Follow course, school, and data-management requirements. Keep student and teacher copies separate, label stale versions, and prevent reuse in the next activity.' } },
    ],
    cta: {
      zh: '用隨機分組工具產生後，先做教師核對版，再以清楚版本、適當字級與受控方式分享給學生。',
      en: 'After generating groups, keep a teacher verification copy and share a readable, versioned result through a controlled channel.',
    },
    updatedAt: '2026-09-03',
    noFaqSchema: true,
  },
  {
    id: 'qr-code-scan-failure-field-troubleshooting-guide',
    locales: ['zh', 'en'],
    slug: 'qr-code-scan-failure-field-troubleshooting-guide',
    title: {
      zh: 'QR Code 現場掃描失敗排查指南',
      en: 'QR Code Scan Failure Troubleshooting Guide',
    },
    metaTitle: {
      zh: 'QR Code 現場掃不到怎麼辦？光線、距離與網址排查順序',
      en: 'QR Code Scan Troubleshooting On Site',
    },
    metaDescription: {
      zh: '活動現場 QR Code 掃不到時，依序檢查鏡頭距離、反光、對比、裁切、畫面亮度、手機權限與目的地回應；用最小變更定位問題，避免直接重印或更換網址造成新的混亂。',
      en: 'When a QR Code fails on site, check distance, glare, contrast, crop, brightness, camera permissions, and destination response before changing the asset.',
    },
    h1: {
      zh: 'QR Code 現場掃描失敗怎麼排查：從鏡頭到目的地的快速流程',
      en: 'How to Troubleshoot a QR Code That Fails to Scan on Site',
    },
    category: { zh: 'QR Code 工作流程', en: 'QR Code workflows' },
    priority: 62,
    searchIntent: {
      zh: '使用者已在活動、櫃檯或教室張貼 QR Code，現場有人掃不到，想快速分辨是圖像、環境、手機設定還是網址服務問題，並採取不會破壞其他版位的修正。',
      en: 'A QR Code is already posted at an event, desk, or classroom and some people cannot scan it. They need to isolate image, environment, device, or service causes without breaking other placements.',
    },
    targetKeywords: [
      { zh: 'QR Code 掃不到排查', en: 'QR Code scan troubleshooting' },
      { zh: 'QR Code 現場失敗', en: 'QR Code fails on site' },
      { zh: 'QR Code 反光距離', en: 'QR Code glare distance fix' },
    ],
    relatedToolIds: ['qr-code-generator', 'image-resizer', 'url-encoder'],
    relatedGuideIds: ['qr-code-before-print-testing-guide', 'qr-code-mobile-landing-page-guide', 'qr-code-destination-change-log-guide'],
    relatedWorkflowIds: ['qr-barcode-publishing-toolkit'],
    summary: {
      zh: '現場掃不到不代表 QR 圖一定壞了。先用同一份素材在不同距離、光線與手機測試，再分離圖形、裝置與網址服務問題，才能做出可回復的修正。',
      en: 'A field failure does not prove the image is broken. Test the same asset across distance, light, and phones, then separate image, device, and service causes before changing it.',
    },
    problem: {
      zh: '展場玻璃反光、投影畫面亮度不足、海報被裁切、手機相機權限關閉或活動頁暫時錯誤，都可能被使用者統稱為「掃不到」。若直接換圖或換網址，反而會讓真正原因更難追蹤。',
      en: 'Glass glare, a dim projection, a cropped poster, camera permission, or a temporary page error can all be called “not scanning.” Replacing the image or URL immediately can hide the real cause.',
    },
    whoShouldUse: {
      zh: '適合活動現場人員、門市櫃檯、教師、展場技術支援與負責維護多個 QR 版位的內容團隊。',
      en: 'Useful for event staff, retail desks, teachers, venue support, and content teams maintaining multiple QR placements.',
    },
    explanation: [
      { zh: '先請同一位使用者保持手機與 QR Code 的相對位置，確認問題是否可重現。若只有一支手機失敗，先查相機權限、鏡頭污漬、系統掃描功能與瀏覽器；不要立刻改動共用素材。', en: 'Keep the same phone position and reproduce the issue. If only one phone fails, check camera permission, lens, built-in scanning, and browser before changing a shared asset.' },
      { zh: '把「完全讀不到圖」與「讀到網址但頁面失敗」分開。前者偏向尺寸、對比、裁切、反光或焦距；後者應檢查 HTTPS、重新導向、DNS、登入與服務狀態。', en: 'Separate “cannot read the pattern” from “reads the URL but the page fails.” The first points to size, contrast, crop, glare, or focus; the second needs HTTPS, redirects, DNS, access, and service checks.' },
      { zh: '先改變環境而不是改檔案：移開反光角度、提高投影亮度、擦拭鏡頭、拉開距離或讓畫面填滿取景框。每次只改一個變數並記錄結果，才能知道哪個修正有效。', en: 'Change the environment before the file: remove glare, raise projection brightness, clean the lens, adjust distance, or fill the camera frame. Change one variable at a time and log the result.' },
      { zh: '檢查圖案四周是否被邊框、文字、膠帶或裁切線侵入。DENSO WAVE 的 QR Code 基礎資料說明定位圖樣與空白區的結構限制（https://www.qrcode.com/en/about/）；現場貼紙若遮住邊界，螢幕預覽測試並不能代表成品。', en: 'Check whether borders, text, tape, or trim intrude on the quiet space. DENSO WAVE documents structural limits around finder patterns and margins (https://www.qrcode.com/en/about/); a covered sticker edge can invalidate a screen-only test.' },
      { zh: '確認解碼後的網址是否仍是核准版本。若短網址或中介層剛更新，先在手機瀏覽器直接開啟並查看狀態，再判斷是否需要回復；不要因單一快取結果就重印全部素材。', en: 'Confirm the decoded URL is the approved version. If a short-link layer just changed, open it directly on the phone and inspect its status before deciding whether to roll back; do not reprint from one cached result.' },
      { zh: '現場備援應寫在 QR 旁或工作人員卡片上，例如可讀網址、人工登記或聯絡方式。備援不是宣稱 QR 永遠成功，而是讓任務在相機、光線或服務暫時失效時仍能完成。', en: 'Put a readable URL, manual registration, or contact route beside the QR or on a staff card. A fallback does not promise perfect scanning; it keeps the task moving when camera, light, or service fails.' },
      { zh: '故障排除完成後，保存版位、裝置、環境、原因、修正與再次測試時間。把結果回填到目的地版本記錄，下一場活動才能區分可重現的素材問題與一次性的現場狀況。', en: 'After recovery, save the placement, device, environment, cause, fix, and retest time. Add it to the destination version log so the next event can distinguish repeatable asset issues from one-off conditions.' },
    ],
    steps: [
      { zh: '記錄失敗版位、手機型號、時間、光線與是否能讀出網址。', en: 'Record placement, phone model, time, lighting, and whether a URL is decoded.' },
      { zh: '保持圖案不變，依序測試距離、角度、反光、亮度與鏡頭清潔。', en: 'Keep the asset unchanged while testing distance, angle, glare, brightness, and lens cleanliness.' },
      { zh: '若讀到網址，直接開啟並檢查 HTTPS、重新導向、登入與服務狀態。', en: 'If a URL is decoded, open it directly and check HTTPS, redirects, access, and service status.' },
      { zh: '檢查圖案尺寸、對比、裁切與四周留白是否被現場物件遮住。', en: 'Inspect size, contrast, crop, and quiet space for obstruction in the actual placement.' },
      { zh: '只做一項最小修正，再用另一支手機與原手機各測一次。', en: 'Make one minimal fix and retest with both the original and another phone.' },
      { zh: '啟用可讀網址或人工流程備援，並向現場人員說明使用條件。', en: 'Enable a readable URL or manual fallback and brief on-site staff on when to use it.' },
      { zh: '把原因與證據寫回版本記錄，決定是否需要換圖、回復或安排後續修正。', en: 'Write the cause and evidence into the version log and decide whether to replace, roll back, or schedule a later fix.' },
    ],
    example: {
      zh: '展場入口的霧面海報只有部分訪客掃不到。工作人員先確認手機能讀到網址，再發現玻璃門反光與斜角造成失敗；移動燈源、擦拭鏡頭後恢復，不必更換 QR 圖。記錄中保留原版位、兩支手機、光線與修正時間，並在旁邊加上短網址備援。',
      en: 'Only some visitors fail to scan a matte poster at a venue entrance. Staff confirm the URL decodes, then find glare from the glass door and viewing angle. Moving a light and cleaning the lens restores scans, so the QR image stays unchanged; the log records both phones, lighting, and the fallback short URL.',
    },
    commonMistakes: [
      { zh: '把所有「掃不到」都當成網址錯誤，忽略現場光線與距離。', en: 'Treating every scan failure as a URL error and ignoring light or distance.' },
      { zh: '一個人失敗就立刻重印全部海報或更換共用短網址。', en: 'Reprinting every poster or changing a shared short URL after one failure.' },
      { zh: '測試時同時改圖、改網址與換位置，失去原因證據。', en: 'Changing the image, URL, and placement at once and losing causal evidence.' },
      { zh: '忽略 QR 四周留白被框線、膠帶或裁切遮住。', en: 'Ignoring quiet space covered by borders, tape, or trimming.' },
      { zh: '只確認相機讀出網址，沒有開啟頁面驗收登入、語言與權限。', en: 'Checking only the decoded URL and not the page’s access, language, or login behavior.' },
      { zh: '沒有留下現場人員可使用的文字網址或人工備援。', en: 'Providing no readable URL or manual fallback for on-site staff.' },
    ],
    faq: [
      { question: { zh: 'QR Code 偶爾掃不到要不要立刻換圖？', en: 'Should I replace a QR Code after occasional failures?' }, answer: { zh: '先確認是否只在特定手機、角度或光線失敗，並檢查網址能否直接開啟；只有確認素材本身有問題時才換圖。', en: 'First isolate phone, angle, lighting, and direct URL behavior. Replace the asset only after evidence points to the image itself.' } },
      { question: { zh: '掃到網址但頁面空白算 QR Code 失敗嗎？', en: 'Is a blank page after decoding a QR failure?' }, answer: { zh: '這通常是目的地服務、重新導向、權限或瀏覽器問題；應與圖案讀取問題分開記錄與處理。', en: 'Usually it is a destination, redirect, access, or browser issue. Log and troubleshoot it separately from pattern readability.' } },
      { question: { zh: '現場最有用的備援是什麼？', en: 'What is the most useful field fallback?' }, answer: { zh: '提供可讀短網址與簡短人工流程，並讓工作人員知道何時啟用；備援要指向同一任務，不是另一個無關首頁。', en: 'Provide a readable short URL and a brief manual route, with staff guidance on when to use it. It should lead to the same task, not an unrelated home page.' } },
      { question: { zh: '如何判斷是單一手機問題？', en: 'How can I tell if one phone is the problem?' }, answer: { zh: '保持版位與環境不變，用另一支手機或系統相機測試；再檢查原手機權限、鏡頭與瀏覽器，避免用單一結果下結論。', en: 'Keep placement and environment constant and test another phone or camera. Then check permissions, lens, and browser on the original device.' } },
    ],
    cta: {
      zh: '現場先記錄版位與裝置，再用最小變更逐項排查 QR 圖、環境、手機與目的地，最後補上可讀網址備援。',
      en: 'Log the placement and device, isolate image, environment, phone, and destination causes with minimal changes, then provide a readable fallback.',
    },
    updatedAt: '2026-09-03',
    noFaqSchema: true,
  },
  {
    id: 'classroom-random-group-seat-transition-guide',
    locales: ['zh', 'en'],
    slug: 'classroom-random-group-seat-transition-guide',
    title: {
      zh: '隨機分組後座位轉換指南',
      en: 'Move Students Smoothly After Random Grouping',
    },
    metaTitle: {
      zh: '隨機分組後怎麼快速換座位？課堂動線與分組轉換流程',
      en: 'Smooth Seat Transition After Random Groups',
    },
    metaDescription: {
      zh: '隨機分組公布後，用組別標記、移動順序、材料站位與計時提示安排換座位；先處理無障礙與安全動線，再用座位表與點名核對，降低噪音、遺漏與臨時重排。',
      en: 'After randomizing groups, use labels, movement order, material stations, and prompts to change seats safely, then verify locations with a seating chart and roster.',
    },
    h1: {
      zh: '隨機分組後如何快速換座位：動線、材料與點名核對的課堂流程',
      en: 'How to Transition to New Seats After Random Grouping',
    },
    category: { zh: '教學工作流程', en: 'Teaching workflows' },
    priority: 63,
    searchIntent: {
      zh: '教師已經產生隨機小組，接下來要讓學生從原座位移到小組位置，希望轉換快速、可預期且不犧牲無障礙、安全、材料分配與點名正確性。',
      en: 'A teacher has generated random groups and needs students to move from current seats to group locations quickly and predictably without sacrificing accessibility, safety, materials, or attendance accuracy.',
    },
    targetKeywords: [
      { zh: '隨機分組換座位', en: 'move seats after random grouping' },
      { zh: '課堂分組動線', en: 'classroom group movement plan' },
      { zh: '分組後點名核對', en: 'verify attendance after grouping' },
    ],
    relatedToolIds: ['random-group-generator', 'seating-chart', 'group-generator'],
    relatedGuideIds: ['classroom-random-group-shareable-result-guide', 'classroom-random-group-absent-student-repair-guide', 'seating-chart-changeover-routine-guide'],
    relatedWorkflowIds: ['teacher-classroom-random-toolkit'],
    summary: {
      zh: '分組結果公布只是起點；把組別轉成教室中的位置、動線、材料與回報責任，學生才能在短時間內開始活動，教師也能快速確認每人到位。',
      en: 'Publishing groups is only the start. Convert them into locations, movement paths, materials, and reporting roles so students begin quickly and the teacher can verify everyone is in place.',
    },
    problem: {
      zh: '如果只說「去你的組」，學生會在門口、材料桌與走道互相堵住，還可能有人找錯組、漏拿材料或坐到不適合的位置。轉換失控也會吃掉原本用來學習的時間。',
      en: 'Telling students only to go to their group creates bottlenecks at doors, material tables, and aisles. Students may join the wrong group, miss materials, or occupy an unsuitable seat, consuming learning time.',
    },
    whoShouldUse: {
      zh: '適合需要頻繁重新分組的國小、中學、大專課堂、工作坊與社團活動主持人。',
      en: 'Useful for elementary, secondary, and higher-education classes, workshops, and clubs that regroup often.',
    },
    explanation: [
      { zh: '先用固定的組別標記取代臨時喊名字。顏色、字母、桌號或圖示都可以，但必須在投影、紙卡與材料站使用同一套標記，避免學生在不同位置看到不同稱呼。', en: 'Use stable group labels instead of calling names ad hoc. Colors, letters, table numbers, or icons work when the same labels appear on the display, cards, and material stations.' },
      { zh: '把移動拆成「看結果、收物品、走指定路線、坐下、回報」五個動作。Cornell 的主動學習資源強調把合作形式與任務結構對齊（https://teaching.cornell.edu/teaching-resources/engaging-students/active-learning）；座位轉換也應服務活動，而不是只追求安靜。', en: 'Break movement into see the result, collect items, follow the route, sit, and report. Cornell’s active-learning resources align collaboration with task structure (https://teaching.cornell.edu/teaching-resources/engaging-students/active-learning); movement should serve the activity, not silence alone.' },
      { zh: '先處理無障礙、視線、逃生與設備需求，再安排一般動線。需要靠近出口、插座或低干擾位置的人，不應在學生開始移動後才被迫重新調整。', en: 'Handle accessibility, sightlines, exits, and equipment needs before ordinary routes. Students who need an exit, outlet, or low-distraction seat should not be moved again after traffic begins.' },
      { zh: '每組指定一位材料或路線提示者，其他人依序移動。這能把教師的口頭指令減少到必要程度，也讓學生在混合或嘈雜環境中仍有可查詢的下一步。', en: 'Assign each group a materials or route lead and move the rest in order. This reduces repeated teacher instructions and gives students a reference in noisy or hybrid settings.' },
      { zh: '用短計時器分段，而不是只喊一次開始。先給閱讀結果的時間，再給第一排或靠牆組移動，最後讓其他組就位；計時是協調工具，不是對學生速度的保證。', en: 'Use short timed phases instead of one start command: read the result, move the first or wall-side groups, then settle the rest. Timing coordinates the room; it does not promise equal speed.' },
      { zh: '到位後用座位表、組別卡或口頭回報核對。若有人缺席、臨時加入或坐錯位置，先依修補規則處理，並保留原始分組與變更時間，避免現場再抽一次。', en: 'Verify positions with a seating chart, group card, or verbal check. For absences, late arrivals, or wrong seats, follow the repair rule and retain the original draw and change time instead of rerolling.' },
      { zh: '活動結束前預告回復原座位或下一輪轉換。學生知道何時移動、物品放哪裡、誰負責回報，能減少最後五分鐘的混亂，也讓下一次分組記錄更可靠。', en: 'Preview the return to original seats or the next transition. Knowing when to move, where to return items, and who reports reduces end-of-class disorder and improves the next grouping record.' },
    ],
    steps: [
      { zh: '在座位表上標出組別位置、無障礙需求、出口與材料站。', en: 'Mark group locations, accessibility needs, exits, and material stations on the seating chart.' },
      { zh: '統一投影、紙卡、桌牌與材料箱的組別標記。', en: 'Use the same group labels on the display, cards, tables, and material bins.' },
      { zh: '說明五個動作與每段計時，先讓學生閱讀再開始移動。', en: 'Explain the five actions and timing, giving students a reading pause before movement.' },
      { zh: '依指定順序移動，材料負責人最後確認每組拿到正確物品。', en: 'Move in the stated order, with the materials lead confirming each group has the right items.' },
      { zh: '就位後用座位表與點名核對人數、角色與特殊位置。', en: 'Once seated, verify attendance, roles, and special positions against the chart.' },
      { zh: '依課前規則修補缺席、臨時加入或不適合位置，並記錄變更。', en: 'Repair absences, late arrivals, or unsuitable positions under the predeclared rule and log changes.' },
      { zh: '活動結束前說明回復路線、材料歸還與下一次轉換提示。', en: 'Before closing, explain the return route, material handoff, and next transition cue.' },
    ],
    example: {
      zh: '教師把 28 人分成七組，每桌貼上 A–G 標記，並在投影上顯示組別與路線。學生先閱讀 30 秒，接著由靠牆四組依序移動，材料負責人到指定箱取物。教師用座位表核對後發現一人缺席，依「三人仍可討論」規則保留原組並改派摘要角色，沒有重新抽籤。',
      en: 'A teacher splits 28 students into seven groups labeled A–G. Students read the display for 30 seconds, wall-side groups move first, and materials leads collect from marked bins. The seating chart reveals one absence; under the three-person discussion rule, the group stays and the summary role changes without a reroll.',
    },
    commonMistakes: [
      { zh: '只公布組別，沒有指定桌號、路線或材料站。', en: 'Publishing groups without table locations, routes, or material stations.' },
      { zh: '不同投影、桌牌與講義使用不同組別名稱。', en: 'Using inconsistent labels across displays, tables, and handouts.' },
      { zh: '忽略出口、輪椅、視線、插座或設備的固定需求。', en: 'Ignoring fixed needs for exits, wheelchairs, sightlines, outlets, or equipment.' },
      { zh: '所有人同時起身，讓走道與材料桌形成瓶頸。', en: 'Having everyone move at once and creating aisle and material bottlenecks.' },
      { zh: '沒有到位核對，直到活動中才發現有人坐錯或缺材料。', en: 'Skipping the seat check and discovering wrong seats or missing materials mid-activity.' },
      { zh: '遇到缺席就全部重抽，打亂已完成的動線與角色。', en: 'Rerolling everyone after an absence and disrupting settled routes and roles.' },
    ],
    faq: [
      { question: { zh: '分組後先公布名單還是先讓學生移動？', en: 'Should I publish groups before moving students?' }, answer: { zh: '先給學生足夠時間看懂組別、位置與路線，再分段移動；沒有共同參照時直接起身最容易造成堵塞。', en: 'Give students time to read the group, location, and route first, then move in phases. Starting without a shared reference causes the most congestion.' } },
      { question: { zh: '怎麼安排需要無障礙位置的學生？', en: 'How should I place students who need accessible seats?' }, answer: { zh: '在分組與動線規劃前先標記固定需求，依課程與校方流程安排，再處理一般隨機分組，避免現場二次搬動。', en: 'Mark fixed needs before grouping and routing, follow course and school procedures, then randomize the remaining seats to avoid a second move.' } },
      { question: { zh: '換座位需要使用座位表嗎？', en: 'Do I need a seating chart for the transition?' }, answer: { zh: '建議使用。它能讓教師快速核對人數、角色與特殊位置，也能在缺席或臨時加入時留下可說明的修補依據。', en: 'It is recommended. A chart lets the teacher verify attendance, roles, and special positions and supports explainable repairs for absences or late arrivals.' } },
      { question: { zh: '如何縮短分組換位花費的時間？', en: 'How can I shorten the transition?' }, answer: { zh: '固定標記、先說明五個動作、分段計時並指定材料負責人；每次只改善一個瓶頸，記錄實際時間再調整下一輪。', en: 'Use stable labels, explain the five actions, time phases, and assign materials leads. Improve one bottleneck at a time and record the actual duration.' } },
    ],
    cta: {
      zh: '用隨機分組與座位表先規劃位置，再以標記、分段計時、材料站與到位核對讓學生快速開始任務。',
      en: 'Plan locations with the random group and seating tools, then use labels, timed phases, material stations, and a seat check to start smoothly.',
    },
    updatedAt: '2026-09-03',
    noFaqSchema: true,
  },
  {
    id: 'qr-code-multi-placement-consistency-guide',
    locales: ['zh', 'en'],
    slug: 'qr-code-multi-placement-consistency-guide',
    title: { zh: '多版位 QR Code 一致性指南', en: 'Keep QR Codes Consistent Across Placements' },
    metaTitle: { zh: '海報、收據、社群的 QR Code 怎麼統一？多版位驗收清單', en: 'QR Code Placement Consistency Checklist' },
    metaDescription: {
      zh: '同一活動放在海報、收據、簡報與社群的 QR Code，不一定要使用完全相同參數；用版位矩陣逐一核對目的地、語系、UTM、尺寸、備援網址與停用日期，避免素材互相矛盾。',
      en: 'For QR Codes on posters, receipts, slides, and social posts, use a placement matrix to verify destination, locale, UTM, size, fallback, and retirement date.',
    },
    h1: { zh: '多個版位的 QR Code 怎麼保持一致：從素材矩陣到逐一驗收', en: 'How to Keep QR Codes Consistent Across Multiple Placements' },
    category: { zh: 'QR Code 工作流程', en: 'QR Code workflows' },
    priority: 64,
    searchIntent: { zh: '團隊要在多種線上與線下版位發布同一活動 QR Code，希望分辨哪些欄位必須一致、哪些追蹤參數可依版位不同，並建立不漏測的交付清單。', en: 'A team is publishing one campaign QR flow across online and offline assets and needs to know what must match, what can vary by placement, and how to test every asset.' },
    targetKeywords: [
      { zh: 'QR Code 多版位管理', en: 'QR Code multiple placements' },
      { zh: 'QR Code 素材一致性', en: 'QR Code asset consistency' },
      { zh: 'QR Code UTM 版位', en: 'QR Code UTM by placement' },
    ],
    relatedToolIds: ['qr-code-generator', 'url-encoder', 'character-counter'],
    relatedGuideIds: ['qr-code-utm-campaign-link-guide', 'qr-code-destination-change-log-guide', 'qr-code-scan-failure-field-troubleshooting-guide'],
    relatedWorkflowIds: ['qr-barcode-publishing-toolkit'],
    summary: { zh: '一致性不是每個網址字串都一模一樣，而是所有版位都完成同一任務、語言與版本；UTM 等分析欄位可按版位區分，但必須有明確命名規則。', en: 'Consistency means every placement reaches the same task, locale, and release, not that every URL string is identical. UTM fields may vary by placement under a naming rule.' },
    problem: { zh: '設計、社群與現場人員常各自複製 QR 圖，結果海報仍指向舊日期、社群連到英文頁、收據缺少 UTM，或其中一個版位沒有可讀備援。沒有矩陣就很難在發布前發現差異。', en: 'Design, social, and field teams may copy a QR independently, leaving a poster on an old date, a social post on the wrong locale, or a receipt without UTM. Without a matrix, differences hide until launch.' },
    whoShouldUse: { zh: '適合活動行銷、零售門市、校園公告、展覽、包裝與同一活動需要跨媒體發布的團隊。', en: 'Useful for event marketing, retail, school announcements, exhibitions, packaging, and any cross-media campaign.' },
    explanation: [
      { zh: '先建立版位矩陣，每列是一個實際素材，每欄記錄版位名稱、檔案版本、目的地、語系、UTM、實體尺寸與負責人。這能把「同一張圖」改成可驗收的交付物。', en: 'Create a placement matrix with one row per real asset and columns for placement, file version, destination, locale, UTM, physical size, and owner. This turns one image into an auditable deliverable. Include a status column so reviewers can see which rows are approved, blocked, or awaiting a replacement scan.' },
      { zh: '把核心目的地與版位追蹤分開。所有版位可通往同一活動頁，但 `utm_source`、`utm_medium` 或 `utm_content` 可用來辨識海報、收據與社群；Google Analytics 官方說明建議使用一致的來源、媒介與活動命名（https://support.google.com/analytics/answer/10917952）。', en: 'Separate the core destination from placement tracking. All assets can reach one event page while `utm_source`, `utm_medium`, or `utm_content` distinguishes poster, receipt, and social. Google Analytics recommends consistent source, medium, and campaign naming (https://support.google.com/analytics/answer/10917952).' },
      { zh: '定義哪些欄位不可變：活動識別、語言版本、登入要求、表單權限與停用日期；可變欄位則明確列出允許範圍，避免有人把活動頁整個換成不相干首頁。', en: 'Define immutable fields such as event identity, locale, login requirement, form access, and retirement date. List allowed variations so nobody replaces the event page with an unrelated home page.' },
      { zh: '每個版位都要解碼並開啟一次。檔名正確不代表圖案正確，設計檔裡的 URL 也不代表印刷、社群壓縮或收據系統真的使用同一個版本。', en: 'Decode and open every placement once. A correct filename does not prove the pixels are correct, and a design-file URL may differ after print, social compression, or receipt export.' },
      { zh: '把實體版位的尺寸、觀看距離、反光與裁切列為獨立欄位；線上版位則檢查縮放、深色模式與替代文字。不同媒體的測試條件不同，不能只用桌面預覽代表全部。', en: 'Track size, viewing distance, glare, and trimming for physical assets; check scaling, dark mode, and fallback text online. Each medium needs its own test conditions.' },
      { zh: '發布前由未參與製作的人抽查矩陣。請他們只依版位名稱找到素材、掃描並回填結果；若找不到檔案或不知道哪個版本是最新，流程本身就需要修正。', en: 'Have someone outside production sample the matrix before release. They should locate each asset by placement, scan it, and record the result; difficulty finding the latest file is a process defect.' },
      { zh: '活動改期或換表單時，只更新矩陣核准的版本，並通知所有版位擁有者。保留舊版與變更時間，才能在 GA4 數據出現異常時回溯是哪個媒體先切換。', en: 'When the event or form changes, update only the approved matrix version and notify every placement owner. Keep the old version and change time to trace anomalies in GA4 by medium.' },
    ],
    steps: [
      { zh: '列出海報、收據、簡報、網站、社群與包裝等所有實際版位。', en: 'List every real placement: poster, receipt, slide, website, social post, and packaging.' },
      { zh: '為每列指定目的地版本、語系、UTM、檔名、尺寸與負責人。', en: 'Assign destination version, locale, UTM, filename, size, and owner to each row.' },
      { zh: '用 QR Code 工具解碼每個素材，逐一開啟並記錄結果。', en: 'Decode each asset with the QR tool, open it, and record the result.' },
      { zh: '按媒體條件測試實體距離、反光、縮放、權限與備援入口。', en: 'Test physical distance, glare, scaling, access, and fallback by medium.' },
      { zh: '由第二位審查者抽查檔案與矩陣，確認沒有過期或錯語系素材。', en: 'Have a second reviewer sample files and the matrix for stale or wrong-locale assets.' },
      { zh: '發布後在 GA4 依版位檢查來源命名是否如預期出現。', en: 'After launch, check GA4 for the expected placement naming.' },
      { zh: '變更或停用時建立新版本，通知所有擁有者並重新測試受影響列。', en: 'For changes or retirement, create a new version, notify owners, and retest affected rows.' },
    ],
    example: { zh: '同一場講座有入口海報、櫃檯收據與 Instagram 圖卡。三者都指向中文報名頁，但 UTM content 分別為 entrance、receipt、social；矩陣另記錄海報尺寸與收據系統版本。發布前逐一掃描，發現 Instagram 圖卡仍是舊日期，修正後才排程。', en: 'A lecture uses an entrance poster, desk receipt, and Instagram card. All reach the Chinese registration page, while UTM content is entrance, receipt, and social. The matrix also records poster size and receipt version; a preflight scan catches an old date on Instagram before scheduling.' },
    commonMistakes: [
      { zh: '只管理 QR 圖檔，沒有列出實際發布版位。', en: 'Managing QR files without listing real placements.' },
      { zh: '把所有 UTM 都寫成相同值，失去版位辨識能力。', en: 'Using identical UTMs everywhere and losing placement attribution.' },
      { zh: '只掃描設計檔，沒有測試社群壓縮、收據輸出或印刷成品。', en: 'Scanning the design file but not compressed social, receipt exports, or print.' },
      { zh: '改期後只通知一個團隊，其他版位仍使用舊目的地。', en: 'Notifying one team while other placements keep the old destination.' },
      { zh: '沒有記錄檔案版本、負責人與最後測試時間。', en: 'Recording neither file version, owner, nor last test time.' },
      { zh: '看到 GA4 來源不一致就直接改網址，沒有先核對命名規則。', en: 'Changing URLs when GA4 sources differ without checking the naming rule first.' },
    ],
    faq: [
      { question: { zh: '所有版位的 QR Code 網址要完全一樣嗎？', en: 'Must every placement use the exact same URL?' }, answer: { zh: '核心目的地與語系、權限應一致；UTM 等追蹤參數可依版位不同，但必須遵守同一命名規則並記錄在矩陣。', en: 'The core destination, locale, and access should align. Tracking parameters may differ by placement under one documented naming rule.' } },
      { question: { zh: '版位矩陣一定要用試算表嗎？', en: 'Does a placement matrix have to be a spreadsheet?' }, answer: { zh: '不一定，任何能讓每個素材、版本、負責人與測試結果逐列核對的受控清單都可以；重點是可交接與可回溯。', en: 'No. Any controlled list that verifies each asset, version, owner, and test result works; handoff and traceability matter.' } },
      { question: { zh: '發布後才發現一個版位錯了怎麼辦？', en: 'What if one placement is wrong after launch?' }, answer: { zh: '先標記受影響列，依目的地變更記錄決定回復或更新，通知版位擁有者並重新驗收，不要直接改全部素材。', en: 'Mark the affected row, use the destination log to choose rollback or update, notify its owner, and retest without changing every asset.' } },
      { question: { zh: 'GA4 沒有看到版位 UTM 是 QR 壞了嗎？', en: 'Does missing placement UTM mean the QR is broken?' }, answer: { zh: '不一定。先確認參數拼寫、重新導向、報表日期與處理延遲，再用原始網址與手機流程重現，分開判斷掃描與歸因問題。', en: 'Not necessarily. Check spelling, redirects, date range, and processing delay, then reproduce the raw URL and mobile flow separately from scan readability.' } },
    ],
    cta: { zh: '建立多版位 QR Code 矩陣，逐一核對目的地、語系、UTM、檔案版本與實際掃描結果。', en: 'Build a QR placement matrix and verify destination, locale, UTM, asset version, and a real scan for every row.' },
    updatedAt: '2026-09-03',
    noFaqSchema: true,
  },
  {
    id: 'pdf-to-word-ocr-language-check-guide',
    locales: ['zh', 'en'],
    slug: 'pdf-to-word-ocr-language-check-guide',
    title: { zh: 'PDF 轉 Word 的 OCR 語言驗收指南', en: 'Check OCR Language When Converting PDF to Word' },
    metaTitle: { zh: 'PDF 轉 Word 後文字亂碼？OCR 語言與版面驗收指南', en: 'PDF to Word OCR Language Check Guide' },
    metaDescription: {
      zh: '掃描 PDF 轉 Word 前先辨認語言、字型與欄位；轉換後逐段比對數字、標點、表格與多語混排，找出 OCR 語言設定造成的錯字，並保留原檔作為交付基準。',
      en: 'Before converting a scanned PDF to Word, identify its languages and layout. Compare text, numbers, tables, and mixed scripts after OCR to catch hidden errors.',
    },
    h1: { zh: 'PDF 轉 Word 後如何驗收 OCR 語言：多語文件的逐段比對方法', en: 'How to Check OCR Language After Converting a PDF to Word' },
    category: { zh: 'PDF 工作流程', en: 'PDF workflows' },
    priority: 65,
    searchIntent: { zh: '使用者想把掃描或多語 PDF 轉成可編輯 Word，卻擔心 OCR 將專有名詞、數字、標點或混合語言辨識錯誤；需要一套轉換前後可重現的驗收流程。', en: 'A user needs an editable Word file from a scanned or multilingual PDF and wants a repeatable way to catch OCR errors in names, numbers, punctuation, tables, and mixed scripts.' },
    targetKeywords: [
      { zh: 'PDF 轉 Word OCR 語言', en: 'PDF to Word OCR language' },
      { zh: '掃描 PDF 文字辨識驗收', en: 'scanned PDF OCR quality check' },
      { zh: '多語 PDF 轉 Word', en: 'multilingual PDF to Word' },
    ],
    relatedToolIds: ['pdf-to-word', 'pdf-to-image', 'character-counter'],
    relatedGuideIds: ['pdf-to-word-layout-fidelity-guide', 'pdf-to-word-review-track-changes-guide', 'pdf-to-word-form-field-editing-guide'],
    relatedWorkflowIds: ['office-document-toolkit'],
    summary: { zh: 'OCR 驗收不只看文字能否選取，還要按語言與風險抽樣比對原始頁面；數字、表格、姓名與混排文字應列為獨立檢查項目。', en: 'OCR acceptance is more than checking whether text can be selected. Sample against the source by language and risk, with separate checks for numbers, tables, names, and mixed scripts.' },
    problem: { zh: '掃描檔看起來清楚，不代表 OCR 會正確辨識。中文與英文混排、重音符號、阿拉伯數字、頁首頁尾與低解析表格都可能被悄悄替換；若直接把轉換檔交給下一位編輯，錯誤會在後續排版才被發現。', en: 'A clear scan does not guarantee accurate OCR. Mixed Chinese and English, diacritics, Arabic numerals, headers, and low-resolution tables can be silently changed. If the converted file goes straight to an editor, errors may surface only during later layout work.' },
    whoShouldUse: { zh: '適合需要編輯合約、研究資料、課堂講義、表單或多語行政文件的辦公室、教師、研究者與內容團隊。', en: 'Useful for offices, teachers, researchers, and content teams editing contracts, research material, handouts, forms, or multilingual administrative documents.' },
    explanation: [
      { zh: '先把原始 PDF 設為唯讀基準，記錄頁數、掃描方向、主要語言與是否有雙欄、表格、手寫或印章。驗收時不要只依 Word 的文字流，而要能回到同一頁影像核對。', en: 'Treat the source PDF as a read-only baseline. Record page count, scan orientation, primary languages, columns, tables, handwriting, and stamps. During acceptance, return to the same page image instead of trusting Word text flow alone.' },
      { zh: '多語文件先分區，不要把整份檔案假設成單一語言。標出中文、英文、數字、程式碼、姓名與地址的位置，轉換後才能針對容易混淆的區塊抽樣。', en: 'Segment a multilingual document before conversion rather than assuming one language. Mark Chinese, English, numbers, code, names, and addresses so the high-confusion zones can be sampled after conversion.' },
      { zh: '確認工具提供的 OCR 語言選項與實際內容相符；若只能選一種語言，記錄限制並安排人工逐頁驗收，不要把語言選單當作品質保證。Adobe 的 OCR 說明也建議選取文件語言並在完成後檢查文字（https://helpx.adobe.com/acrobat/desktop/create-documents/scan-documents-to-pdfs/recognize-text.html）。', en: 'Confirm that the tool’s OCR language options match the document. If only one language can be selected, record that limitation and schedule page-level human review; a language menu is not a quality guarantee. Adobe’s OCR guidance explains selecting the document language and reviewing the result (https://helpx.adobe.com/acrobat/desktop/create-documents/scan-documents-to-pdfs/recognize-text.html).' },
      { zh: '先抽查高風險頁：表格、金額、日期、編號、專有名詞、頁首頁尾與密集小字。這些欄位一個字元錯誤就可能改變文件意思，應優先於一般段落。', en: 'Sample high-risk pages first: tables, amounts, dates, identifiers, proper names, headers, footers, and dense small text. One wrong character can change the meaning, so these areas come before ordinary paragraphs.' },
      { zh: '逐段比對時同時看字元、空白、標點與順序。OCR 可能把兩欄串在一起、遺漏負號、把全形半形混用，或將相鄰行誤合併；把問題記在頁碼與區塊，而不是只寫「OCR 有錯」。', en: 'Compare characters, spacing, punctuation, and order together. OCR may join columns, drop minus signs, mix full-width and half-width forms, or merge adjacent lines. Log the page and block instead of writing only “OCR error.”' },
      { zh: '表格要分開驗收欄名、列數、欄位對齊與總計。即使每個字都正確，欄位錯位仍會讓 Word 中的數字對到錯誤項目，必要時改用影像重建表格。', en: 'Validate table headings, row count, column alignment, and totals separately. Even correct characters are unsafe when values shift into the wrong column; rebuild a table from the image when alignment cannot be trusted.' },
      { zh: '多語姓名與地址使用第二個來源交叉核對，例如原始表單或已核准名冊；不要用瀏覽器拼字檢查自動改寫專有名詞。修改後保留原 OCR 與修正版差異，方便追溯。', en: 'Cross-check multilingual names and addresses against a second source such as an approved form or roster. Do not let browser spellcheck rewrite proper nouns. Keep the OCR text and corrected version so every edit is traceable.' },
      { zh: '完成校對後再檢查 Word 的樣式、標題階層、頁碼與可搜尋性。內容正確但樣式混亂會影響後續審閱；反過來，漂亮的版面也不能掩蓋漏字與錯字。', en: 'After text review, check Word styles, heading hierarchy, page numbers, and searchability. Correct content with broken styles slows review, while polished layout must never hide missing or altered text.' },
      { zh: '交付時附上轉換工具、日期、OCR 語言、抽樣頁與未解決風險。若下一位編輯知道哪些頁面仍需人工確認，就能在不重做整份檔案的情況下安全接手。', en: 'Handoff notes should include the conversion tool, date, OCR languages, sampled pages, and unresolved risks. The next editor can then review known exceptions without repeating the entire conversion.' },
    ],
    steps: [
      { zh: '保存原始 PDF，記錄頁數、語言與高風險區塊。', en: 'Save the source PDF and record pages, languages, and high-risk blocks.' },
      { zh: '依內容分區，標記中英混排、數字、表格與專有名詞。', en: 'Segment content and mark mixed scripts, numbers, tables, and proper names.' },
      { zh: '選擇符合文件的 OCR 語言並記下工具與設定。', en: 'Choose matching OCR languages and record the tool and settings.' },
      { zh: '用 FunnyTools PDF 轉 Word 工具產生可編輯檔。', en: 'Create the editable file with the FunnyTools PDF to Word tool.' },
      { zh: '先抽查高風險頁，再逐段比對文字、順序與標點。', en: 'Sample high-risk pages, then compare text, order, and punctuation block by block.' },
      { zh: '獨立驗收表格、姓名、地址、金額與頁首頁尾。', en: 'Validate tables, names, addresses, amounts, headers, and footers separately.' },
      { zh: '保留差異紀錄與未解決風險，再交付 Word 與基準 PDF。', en: 'Keep the difference log and open risks with the Word file and baseline PDF.' },
    ],
    example: { zh: '一份中英雙語課程表有日期、教室代碼與三欄表格。轉換後先以原 PDF 比對日期與代碼，再檢查英文專有名詞和欄位對齊；發現負號遺失後回到 OCR 設定與影像放大重做該頁，並在交付紀錄標註修正。', en: 'A bilingual course schedule contains dates, room codes, and a three-column table. After conversion, compare dates and codes first, then names and column alignment. When a minus sign is missing, revisit the OCR setting and enlarged image for that page, and record the correction in the handoff log.' },
    commonMistakes: [
      { zh: '只看 Word 能否選取文字，沒有回看原始頁面。', en: 'Checking selectable text without comparing the source page.' },
      { zh: '把多語文件當成單一語言處理。', en: 'Treating a multilingual file as one language.' },
      { zh: '忽略負號、千分位、日期與編號。', en: 'Ignoring minus signs, separators, dates, and identifiers.' },
      { zh: '只校對段落，沒有獨立驗收表格欄位。', en: 'Reviewing paragraphs but not table columns separately.' },
      { zh: '讓拼字工具自動改寫姓名或地址。', en: 'Letting spellcheck rewrite names or addresses.' },
      { zh: '交付修正版卻沒有留下 OCR 原檔與差異。', en: 'Delivering corrections without the original OCR or a difference log.' },
    ],
    faq: [
      { question: { zh: 'OCR 語言選對就一定不會錯嗎？', en: 'Does the right OCR language prevent all errors?' }, answer: { zh: '不會。解析度、版面、字型與表格仍會影響結果；語言設定只是降低一類風險，仍需以原始頁面抽樣驗收。', en: 'No. Resolution, layout, fonts, and tables still affect results. Language selection reduces one risk; source-page sampling is still required.' } },
      { question: { zh: '多語 PDF 應該分檔轉換嗎？', en: 'Should a multilingual PDF be split before conversion?' }, answer: { zh: '不一定。若工具可同時處理語言可保留原檔；若不能，分區或分檔能讓語言設定更可控，但要保留頁碼對照。', en: 'Not always. Keep one file when the tool supports the languages; otherwise segmentation or separate conversion can improve control, provided page mapping is retained.' } },
      { question: { zh: '表格 OCR 文字正確但欄位錯位怎麼辦？', en: 'What if table text is right but columns shift?' }, answer: { zh: '把欄位對齊視為實質錯誤，使用原圖重建表格或改用純文字加人工排版，不要因字元正確就直接交付。', en: 'Treat alignment as a substantive error. Rebuild from the image or use plain text with manual layout; correct characters alone are not enough.' } },
      { question: { zh: '要保留原始 OCR 檔嗎？', en: 'Should the original OCR file be kept?' }, answer: { zh: '應保留並標記版本。它能說明哪些文字是辨識結果、哪些是人工修正，也方便日後重新轉換或稽核。', en: 'Yes, with a version label. It shows which text came from OCR and which was corrected, supporting later reconversion or audit.' } },
    ],
    cta: { zh: '用 PDF 轉 Word 工具建立可編輯檔，再按語言、數字、表格與專有名詞逐項驗收。', en: 'Use the PDF to Word tool, then verify language, numbers, tables, and proper names item by item.' },
    updatedAt: '2026-09-03',
    noFaqSchema: true,
  },
  {
    id: 'pdf-accessibility-reading-order-check-guide',
    locales: ['zh', 'en'],
    slug: 'pdf-accessibility-reading-order-check-guide',
    title: { zh: 'PDF 轉換後可及性與閱讀順序驗收指南', en: 'Check PDF Reading Order and Accessibility After Conversion' },
    metaTitle: { zh: 'PDF 轉 Word 後閱讀順序錯亂？可及性驗收清單', en: 'PDF Conversion Reading Order Checklist' },
    metaDescription: {
      zh: 'PDF 轉 Word 或圖片後，依標題、欄位、表格、替代文字與鍵盤閱讀順序驗收，找出視覺上正常但輔助技術讀錯的內容，並建立可交接的修正紀錄。',
      en: 'After converting a PDF to Word or images, check headings, columns, tables, alternative text, and keyboard reading order for assistive-technology users.',
    },
    h1: { zh: 'PDF 轉換後如何檢查閱讀順序與可及性：視覺之外的驗收流程', en: 'How to Check Reading Order and Accessibility After PDF Conversion' },
    category: { zh: 'PDF 工作流程', en: 'PDF workflows' },
    priority: 66,
    searchIntent: { zh: '使用者需要確認 PDF 轉 Word 或圖片後，標題、欄位、表格與圖片說明是否仍能被鍵盤與輔助技術依正確順序讀取，而不只看畫面是否漂亮。', en: 'A user needs to verify that headings, fields, tables, and images remain understandable in keyboard and assistive-technology reading order after PDF conversion, not merely visually attractive.' },
    targetKeywords: [
      { zh: 'PDF 閱讀順序檢查', en: 'PDF reading order check' },
      { zh: 'PDF 轉換可及性', en: 'PDF conversion accessibility' },
      { zh: 'PDF 替代文字驗收', en: 'PDF alternative text check' },
    ],
    relatedToolIds: ['pdf-to-word', 'pdf-to-image', 'merge-pdf'],
    relatedGuideIds: ['pdf-to-word-layout-fidelity-guide', 'pdf-to-image-print-crop-marks-guide', 'merge-pdf-bookmarks-navigation-guide'],
    relatedWorkflowIds: ['office-document-toolkit', 'verify-tool-result'],
    summary: { zh: '可及性驗收要把視覺版面轉成可讀結構：標題層級、欄位順序、表格關係、替代文字與鍵盤焦點都要實際測試。', en: 'Accessibility acceptance translates visual layout into readable structure: test heading levels, field order, table relationships, alternative text, and keyboard focus.' },
    problem: { zh: '轉換後的文件可能在螢幕上看起來完全正常，但螢幕閱讀器先讀頁尾再讀正文、表格欄位無法對應，或圖片只有檔名沒有意義。若交付給需要鍵盤或輔助技術的人，這些結構問題等同內容缺漏。', en: 'A converted document can look perfect while a screen reader announces the footer before the body, loses table relationships, or exposes only a meaningless image filename. For keyboard and assistive-technology users, structural defects are content defects.' },
    whoShouldUse: { zh: '適合製作課程教材、公共表單、報告、政策文件、公司流程與需要對外分享的 PDF／Word 內容團隊。', en: 'Useful for teams publishing course material, public forms, reports, policies, company procedures, and shared PDF or Word documents.' },
    explanation: [
      { zh: '先明確交付格式與讀者。PDF、Word 與圖片的可及性能力不同；若最終只提供圖片，必須另備可讀文字或替代入口，不能只靠放大。', en: 'Define the delivery format and audience first. PDF, Word, and images expose different accessibility capabilities; if images are the only output, provide readable text or a fallback instead of relying on zoom.' },
      { zh: '把標題層級當成導航，而不是字體大小。轉換後檢查標題是否按 H1、H2、H3 邏輯排列，避免視覺上較大的文字被誤當成標題，或重要章節變成普通段落。', en: 'Treat heading levels as navigation, not font size. Check H1, H2, and H3 logic after conversion so large decorative text is not mistaken for a heading and important sections do not become plain paragraphs.' },
      { zh: '雙欄與側欄是閱讀順序的高風險來源。用鍵盤逐項移動或讀出內容，確認讀者會先完成左欄再到右欄，而不是行與行交錯。', en: 'Two-column and sidebar layouts are high-risk reading-order areas. Move through the document with the keyboard or read-aloud tool to ensure the left column is completed before the right, rather than interleaving lines.' },
      { zh: '表格需驗收欄名、列與資料的關係。視覺網格不一定提供結構資訊；若轉換後欄名只在第一頁，後續列仍要能被理解，必要時把複雜表格拆成簡單區塊。', en: 'Check table headers and the relationship between rows and data. A visual grid may not expose structure; repeated pages still need understandable headers, and complex tables may need to be simplified into smaller blocks.' },
      { zh: '圖片、圖表與掃描章印要有文字替代或上下文說明。替代文字應描述對讀者有用的資訊，不要把「image123」或檔名當成說明。', en: 'Images, charts, and scanned stamps need a useful text alternative or surrounding explanation. Describe information a reader needs; do not expose “image123” or a filename as the description.' },
      { zh: '表單欄位要檢查標籤、順序、必填提示與錯誤訊息。游標能點到欄位不代表使用者知道要填什麼，欄位名稱與說明必須在讀取順序中相鄰。', en: 'Check form labels, order, required hints, and error messages. A focusable field is not enough; its name and instructions should appear next to it in the reading sequence.' },
      { zh: '鍵盤測試從第一個互動元素開始，不要用滑鼠代替。確認焦點可見、順序合理、沒有卡在嵌入物或隱藏按鈕，並在不同瀏覽器至少重現一次。', en: 'Start keyboard testing at the first interactive element instead of substituting a mouse. Confirm visible focus, sensible order, and no traps in embeds or hidden controls; reproduce once in another browser.' },
      { zh: '依 W3C WCAG 2.2 非文字內容與連結目的指引記錄問題，將「視覺不一致」轉成可驗證的結構缺陷；每個問題附頁碼、元素與修正方式。', en: 'Use the W3C WCAG 2.2 guidance on non-text content and link purpose to describe defects in testable terms. Attach a page, element, and fix for every issue (https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html).' },
      { zh: '交付前讓未參與製作的人依鍵盤與讀出流程走一次。新鮮的審查者更容易發現製作者已經習慣的順序錯誤，並能把結果留在版本紀錄。', en: 'Before handoff, have someone outside production follow the keyboard and read-aloud path. A fresh reviewer catches order errors the author has learned to ignore and can leave evidence in the version record.' },
    ],
    steps: [
      { zh: '確認最終格式、讀者與是否需要可讀文字備援。', en: 'Confirm the final format, audience, and need for a readable fallback.' },
      { zh: '檢查標題階層與雙欄、側欄的閱讀順序。', en: 'Check heading levels and two-column or sidebar reading order.' },
      { zh: '逐表驗收欄名、列關係與跨頁標示。', en: 'Validate headers, row relationships, and page breaks for every table.' },
      { zh: '為圖片、圖表與章印補上有意義的文字替代。', en: 'Add meaningful text alternatives for images, charts, and stamps.' },
      { zh: '用鍵盤測試焦點、表單標籤與錯誤提示。', en: 'Test focus, form labels, and error hints with the keyboard.' },
      { zh: '以讀出工具重現高風險頁並記錄頁碼與元素。', en: 'Reproduce high-risk pages with read-aloud tools and log page and element.' },
      { zh: '由第二位審查者確認修正後版本並保存紀錄。', en: 'Have a second reviewer confirm the fixed version and preserve the record.' },
    ],
    example: { zh: '一份兩欄研究報告轉成 Word 後外觀沒有變，但讀出工具在每行左右欄交錯。團隊把欄位改為連續區塊、重新設定標題階層，並為圖表補上摘要；第二位審查者用鍵盤完成全文後才交付 PDF。', en: 'A two-column research report looked unchanged in Word, but read-aloud interleaved the columns line by line. The team changed them to sequential blocks, reset headings, and added a chart summary; a second reviewer completed the document by keyboard before PDF delivery.' },
    commonMistakes: [
      { zh: '只用滑鼠與視覺預覽驗收。', en: 'Accepting with only a mouse and visual preview.' },
      { zh: '把字體大小當成標題結構。', en: 'Treating font size as heading structure.' },
      { zh: '忽略雙欄、側欄與跨頁表格。', en: 'Ignoring columns, sidebars, and tables across pages.' },
      { zh: '用檔名取代圖片替代文字。', en: 'Using a filename instead of alternative text.' },
      { zh: '欄位可聚焦卻沒有標籤或錯誤提示。', en: 'Making fields focusable without labels or error hints.' },
      { zh: '修正後沒有讓第二位審查者重走流程。', en: 'Skipping a second reviewer after fixes.' },
    ],
    faq: [
      { question: { zh: '視覺上正常的 PDF 還需要測閱讀順序嗎？', en: 'Does a visually correct PDF still need reading-order testing?' }, answer: { zh: '需要。視覺版面與結構樹是不同層次；鍵盤與讀出測試才能發現欄位、表格與標題順序問題。', en: 'Yes. Visual layout and the structure tree are different layers; keyboard and read-aloud tests reveal order issues in columns, tables, and headings.' } },
      { question: { zh: '圖片 PDF 可以只提供放大功能嗎？', en: 'Is zoom enough for an image-only PDF?' }, answer: { zh: '不夠。應提供可搜尋、可複製或可由輔助技術讀取的文字版本，並說明兩者如何對應。', en: 'No. Provide text that can be searched, copied, or read by assistive technology, and explain how it maps to the image.' } },
      { question: { zh: '複雜表格一定要重做嗎？', en: 'Must every complex table be rebuilt?' }, answer: { zh: '不一定，但若欄名與資料關係無法可靠表達，就應拆分或重建；保留漂亮外觀不是安全理由。', en: 'Not always, but rebuild or split a table when header and data relationships cannot be expressed reliably; appearance alone is not a safety argument.' } },
      { question: { zh: '要在哪個階段做可及性檢查？', en: 'When should accessibility be checked?' }, answer: { zh: '轉換後立刻做結構抽查，版面修正後再做一次鍵盤與讀出回歸測試，避免最後才發現需要重做。', en: 'Run a structural sample immediately after conversion, then repeat keyboard and read-aloud regression after layout fixes instead of waiting until final delivery.' } },
    ],
    cta: { zh: '轉換後用鍵盤與讀出流程檢查標題、欄位、表格和替代文字，讓文件不只看起來正確。', en: 'After conversion, test headings, fields, tables, and alternatives with keyboard and read-aloud flows—not visual appearance alone.' },
    updatedAt: '2026-09-03',
    noFaqSchema: true,
  },
  {
    id: 'image-compressor-metadata-privacy-guide',
    locales: ['zh', 'en'],
    slug: 'image-compressor-metadata-privacy-guide',
    title: { zh: '圖片壓縮與 Metadata 隱私驗收指南', en: 'Check Image Metadata Privacy After Compression' },
    metaTitle: { zh: '圖片壓縮會保留 EXIF 嗎？Metadata 與隱私驗收', en: 'Image Compression and Metadata Privacy Check' },
    metaDescription: {
      zh: '圖片壓縮後不要只看檔案變小，也要確認 EXIF、GPS、拍攝時間、作者與編輯軟體欄位是否符合分享政策；先從副本測試並記錄輸出，避免把位置或裝置資訊一併公開。',
      en: 'After compression, check EXIF, GPS, dates, author, and software fields against your sharing policy. Test a copy and record the output before publishing.',
    },
    h1: { zh: '圖片壓縮後如何檢查 Metadata 與 EXIF 隱私：分享前的副本驗收流程', en: 'How to Check Image Metadata and EXIF Privacy After Compression' },
    category: { zh: '圖片工作流程', en: 'Image workflows' },
    priority: 51,
    searchIntent: { zh: '使用者想把圖片壓小後分享，卻需要確認 EXIF、GPS、作者與軟體資訊是否仍在檔案中，以及哪些欄位應依工作或個人隱私政策保留或移除。', en: 'A user wants to share a smaller image but needs to know whether EXIF, GPS, author, and software fields remain, and which metadata should be kept or removed under a privacy policy.' },
    targetKeywords: [
      { zh: '圖片壓縮 EXIF 隱私', en: 'image compression EXIF privacy' },
      { zh: '圖片 GPS Metadata 移除', en: 'remove GPS metadata from image' },
      { zh: '分享照片前檢查資訊', en: 'check photo metadata before sharing' },
    ],
    relatedToolIds: ['image-compressor', 'image-resizer', 'image-to-base64'],
    relatedGuideIds: ['image-compression-quality-size-guide', 'image-resize-aspect-ratio-guide', 'browser-local-tool-privacy-guide'],
    relatedWorkflowIds: ['creator-social-toolkit'],
    summary: { zh: '壓縮檔案大小與清理 Metadata 是兩件事；分享前要以副本檢查 EXIF 欄位，依情境保留拍攝資訊或移除 GPS、作者與裝置細節。', en: 'Reducing file size and cleaning metadata are different tasks. Inspect a copy before sharing and keep or remove EXIF fields according to the context.' },
    problem: { zh: '照片看起來只是風景或商品，但 EXIF 可能包含 GPS、拍攝時間、裝置型號、作者與編輯軟體。壓縮後檔案變小不代表這些欄位消失；反過來，為了隱私全部刪除也可能破壞攝影存檔或版權追蹤需要。', en: 'A photo may look like a simple landscape or product, while EXIF can include GPS, capture time, device model, author, and editing software. A smaller file does not prove those fields are gone, and deleting everything can harm archival or rights-tracking needs.' },
    whoShouldUse: { zh: '適合攝影、行銷、客服、教師、電商與任何在公開分享前需要控制照片 Metadata 的人員。', en: 'Useful for photographers, marketers, support teams, teachers, ecommerce sellers, and anyone controlling image metadata before public sharing.' },
    explanation: [
      { zh: '先分清楚檔案內容與 Metadata。畫面像素是使用者看到的內容，EXIF 等欄位則是檔案附帶資訊；壓縮可能改變像素與檔案大小，但不應假設會處理每個附帶欄位。', en: 'Separate image content from metadata. Pixels are what viewers see, while EXIF is attached file information; compression may change pixels and size, but never assume it processes every field.' },
      { zh: '依分享情境列出必要與敏感欄位。作品集可能需要作者與版權，內部稽核可能需要拍攝時間，公開社群通常不需要 GPS 或裝置序號；政策要先於工具設定。ExifTool 的 EXIF 欄位參考可用來核對常見標籤（https://exiftool.org/TagNames/EXIF.html）。', en: 'List required and sensitive fields for the sharing context. A portfolio may need author and rights, an internal audit may need capture time, while a public post rarely needs GPS or device identifiers. Policy comes before tool settings; ExifTool’s EXIF tag reference helps identify common fields (https://exiftool.org/TagNames/EXIF.html).' },
      { zh: '從原圖複製出測試檔，不要直接修改唯一主檔。先記錄檔名、來源、尺寸與已知欄位，再用本站壓縮工具輸出副本；若結果不符政策，可以回到原圖重新選擇。', en: 'Create a test copy instead of editing the only master. Record filename, source, dimensions, and known fields before using the browser compressor; if the result conflicts with policy, return to the master.' },
      { zh: '壓縮前後分別檢查檔案資訊，至少確認 GPS、拍攝時間、作者、版權、裝置與軟體欄位。沒有 metadata 檢視器時，將檔案交給既有內部工具或作業流程檢查，不要用「看不到」推論不存在。', en: 'Inspect file information before and after compression, including GPS, capture time, author, rights, device, and software fields. If you lack a metadata viewer, use an approved internal process; absence from a preview is not proof of removal.' },
      { zh: '若輸出要進社群或客服系統，做一次實際上傳下載回讀。有些平台會重編檔案，有些會保留欄位；本機測試只能說明輸出當下的狀態。', en: 'For social or support uploads, perform a real upload and download readback. Some platforms re-encode files and others preserve fields; a local test only describes the output at that moment.' },
      { zh: '把「保留」與「移除」寫進交付清單，並由第二位審查者確認。不要把隱私處理當成壓縮工具的默認副作用，也不要在沒有授權時刪掉需要的版權欄位。', en: 'Write keep and remove decisions in the handoff checklist and have a second reviewer confirm them. Privacy handling is not a default side effect of compression, and required rights fields should not be deleted without approval.' },
      { zh: '對含人物、住址、車牌或室內定位線索的圖片，除了 Metadata 也要做畫面本身的隱私檢查。移除 GPS 不會遮掉畫面中的門牌或螢幕內容。', en: 'For images containing people, addresses, plates, or location clues, review the pixels as well as metadata. Removing GPS does not hide a street number or screen visible in the image.' },
      { zh: '記錄輸出格式、壓縮設定、Metadata 結果與分享目的。日後若平台規則或保留政策改變，可用同一主檔重跑，不必猜測哪一次輸出曾刪過哪些欄位。', en: 'Record output format, compression setting, metadata result, and sharing purpose. When platform or retention rules change, regenerate from the master rather than guessing which export removed which field.' },
      { zh: '敏感資料應依組織的裝置、下載與保存政策處理。瀏覽器端處理可以減少上傳步驟，但不能替代你的權限、備份與清理制度。', en: 'Handle sensitive files under your organization’s device, download, and retention policy. Browser-side processing can reduce an upload step, but it cannot replace access, backup, and cleanup controls.' },
    ],
    steps: [
      { zh: '寫下分享目的與必須保留、必須移除的 Metadata 欄位。', en: 'Define the sharing purpose and metadata fields to keep or remove.' },
      { zh: '複製原圖並記錄尺寸、來源與已知資訊。', en: 'Copy the master and record dimensions, source, and known information.' },
      { zh: '用圖片壓縮工具輸出副本，不覆蓋原始檔。', en: 'Export a copy with the image compressor without overwriting the master.' },
      { zh: '比較壓縮前後的 GPS、時間、作者、裝置與軟體欄位。', en: 'Compare GPS, time, author, device, and software fields before and after.' },
      { zh: '檢查畫面是否仍含門牌、螢幕或其他定位線索。', en: 'Check pixels for addresses, screens, or other location clues.' },
      { zh: '在實際分享平台上傳、下載並再次回讀。', en: 'Upload and download on the real sharing platform, then read back.' },
      { zh: '由第二位審查者確認清單、輸出版本與保存政策。', en: 'Have a second reviewer confirm the checklist, version, and retention policy.' },
    ],
    example: { zh: '攝影師要把街拍作品交給社群團隊。作品集版本保留作者與版權，公開版本則先從副本檢查 GPS 與裝置欄位，再確認畫面沒有門牌；上傳平台下載後仍做一次回讀，並把兩個版本分開命名。', en: 'A photographer sends a street photo to a social team. The portfolio copy keeps author and rights, while the public copy is checked for GPS and device fields and for visible addresses. The team reads back the platform download and names the two versions separately.' },
    commonMistakes: [
      { zh: '以檔案變小推論 GPS 或 EXIF 已經消失。', en: 'Assuming smaller size means GPS or EXIF is gone.' },
      { zh: '直接修改唯一原圖，失去可回復版本。', en: 'Editing the only master and losing a recoverable version.' },
      { zh: '只檢查 Metadata，忽略畫面中的地址與螢幕。', en: 'Checking metadata while ignoring visible addresses or screens.' },
      { zh: '為了隱私刪掉仍需要的作者與版權欄位。', en: 'Deleting author or rights fields that still matter.' },
      { zh: '只在本機預覽，沒有檢查平台重新編碼後的檔案。', en: 'Checking a local preview without testing the platform export.' },
      { zh: '把瀏覽器端處理當成完整資料治理。', en: 'Treating browser-side processing as complete data governance.' },
    ],
    faq: [
      { question: { zh: '壓縮工具一定會移除 EXIF 嗎？', en: 'Does compression always remove EXIF?' }, answer: { zh: '不一定。不同格式、工具與平台處理方式不同，應以副本實測並檢查欄位，不要用工具名稱猜結果。', en: 'No. Formats, tools, and platforms differ. Test a copy and inspect fields instead of guessing from the tool name.' } },
      { question: { zh: '移除 GPS 就代表照片安全嗎？', en: 'Does removing GPS make a photo safe?' }, answer: { zh: '不代表。畫面可能仍有門牌、地標、車牌或螢幕資料，還要做像素內容的隱私檢查。', en: 'No. Addresses, landmarks, plates, or screens may remain visible, so review the pixels too.' } },
      { question: { zh: '作品集與社群版本應該一樣嗎？', en: 'Should portfolio and social versions be identical?' }, answer: { zh: '不一定。作品集可能需要版權與拍攝紀錄，公開版本依政策移除敏感欄位；兩者都應從同一主檔輸出並分開標記。', en: 'Not necessarily. A portfolio may need rights and capture records while a public copy removes sensitive fields. Export both from one master and label them separately.' } },
      { question: { zh: '沒有 Metadata 檢視器怎麼驗收？', en: 'What if I lack a metadata viewer?' }, answer: { zh: '使用已核准的內部檢查流程或工具；若無法證明欄位狀態，就把結果標為待確認，不要宣稱已清除。', en: 'Use an approved internal checker. If field state cannot be proven, mark it unverified rather than claiming it was cleared.' } },
    ],
    cta: { zh: '先從副本壓縮，再按分享政策檢查 EXIF、GPS 與畫面線索，最後在實際平台回讀。', en: 'Compress a copy, check EXIF, GPS, and visible clues against policy, then read back the real platform output.' },
    updatedAt: '2026-09-03',
    noFaqSchema: true,
  },
  {
    id: 'image-resolution-print-web-guide',
    locales: ['zh', 'en'],
    slug: 'image-resolution-print-web-guide',
    title: { zh: '圖片列印與網頁解析度選擇指南', en: 'Choose Image Resolution for Print and Web' },
    metaTitle: { zh: '圖片解析度怎麼選？列印、網頁與像素尺寸驗收', en: 'Image Resolution for Print vs Web' },
    metaDescription: {
      zh: '列印與網頁需要的圖片條件不同；依實際尺寸、觀看距離與版位決定像素，再檢查文字、細線、檔案大小與平台縮放，避免只看 DPI 或盲目輸出超大檔。',
      en: 'Print and web need different constraints. Choose pixels from final size and placement, then check text, fine lines, file weight, and platform scaling.',
    },
    h1: { zh: '圖片解析度怎麼選：列印尺寸、網頁像素與實際清晰度驗收', en: 'How to Choose Image Resolution for Print and Web Use' },
    category: { zh: '圖片工作流程', en: 'Image workflows' },
    priority: 52,
    searchIntent: { zh: '使用者想知道同一張圖片用於海報列印、網站卡片或社群時，需要多少像素與何種解析度設定，並希望避免文字模糊、檔案過大或平台自動縮放。', en: 'A user needs to prepare one image for a printed poster, web card, or social post and wants the right pixels and resolution without blurry text, oversized files, or unexpected scaling.' },
    targetKeywords: [
      { zh: '圖片列印解析度', en: 'image resolution for print' },
      { zh: '網頁圖片像素尺寸', en: 'web image pixel dimensions' },
      { zh: 'DPI PPI 圖片怎麼選', en: 'DPI PPI image resolution' },
    ],
    relatedToolIds: ['image-resizer', 'image-compressor', 'image-crop'],
    relatedGuideIds: ['image-resize-aspect-ratio-guide', 'image-compression-quality-size-guide', 'pdf-to-image-resolution-guide'],
    relatedWorkflowIds: ['creator-social-toolkit'],
    summary: { zh: '解析度選擇應從實際輸出尺寸與觀看情境開始；網頁通常以像素與版位寬度驗收，列印則還要看紙張尺寸、觀看距離與細節要求。', en: 'Choose resolution from the final size and viewing context. Web work is checked by pixels and placement width, while print also depends on paper size, viewing distance, and detail.' },
    problem: { zh: '有人把手機照片直接放大印成海報，文字與細線變糊；也有人為了網頁保留數萬像素，讓載入變慢。只看 DPI 欄位而沒有寫下最終尺寸，無法判斷輸出是否適合使用。', en: 'A phone photo may be enlarged into a blurry poster, while a web page may carry tens of thousands of unnecessary pixels. A DPI value without a final physical or display size cannot prove suitability.' },
    whoShouldUse: { zh: '適合設計、行銷、教師、電商與需要同時準備列印和數位版本的內容團隊。', en: 'Useful for designers, marketers, teachers, ecommerce teams, and anyone preparing both printed and digital versions.' },
    explanation: [
      { zh: '先寫下輸出用途、實際寬高與觀看距離。A4 講義、展架海報、網站卡片與手機縮圖的細節需求不同；沒有用途就無法從像素推導合理的尺寸。', en: 'Write the purpose, final width and height, and viewing distance first. An A4 handout, a poster, a web card, and a phone thumbnail need different detail; pixels are meaningful only with a destination.' },
      { zh: '網頁版先以 CSS 版位與裝置密度估算需要的像素，再用實際頁面測試。輸出兩倍寬度可能提高高密度螢幕清晰度，但也會增加檔案重量，不是越大越好。', en: 'For web, estimate pixels from the CSS placement and device density, then test on the real page. A two-times export can help high-density screens but adds weight; larger is not automatically better.' },
      { zh: '列印版把像素、紙張尺寸與觀看距離一起看。近距離閱讀的細字需要更多有效細節，遠距離標語則可接受不同取捨；先做小尺寸樣張比只改 DPI 更可靠。', en: 'For print, consider pixels, paper size, and viewing distance together. Close-reading fine text needs more usable detail than a distant headline; a small proof is more reliable than changing DPI alone.' },
      { zh: 'DPI、PPI 與實際像素不是同一件事。檔案的像素決定可用影像資料，PPI 反映在某個實體尺寸下如何分配，列印驅動或設計軟體還可能重新取樣；Adobe 對列印解析度的說明也區分像素尺寸與 PPI（https://helpx.adobe.com/photoshop/desktop/crop-resize-transform/resize-adjust-resolution/printed-image-resolution.html），交付清單要同時寫像素與尺寸。', en: 'DPI, PPI, and pixel dimensions are not the same. Pixels describe available image data, PPI describes allocation at a physical size, and software may resample. Adobe’s print-resolution guidance distinguishes pixel dimensions from PPI (https://helpx.adobe.com/photoshop/desktop/crop-resize-transform/resize-adjust-resolution/printed-image-resolution.html); record both pixels and final size in the handoff.' },
      { zh: '含文字、條碼、圖表與細線的圖片要單獨驗收，不要只看照片區域。縮放後文字邊緣、條碼可讀性與線條連續性若失敗，應回到主檔調整尺寸或改用更合適格式。', en: 'Images with text, barcodes, charts, or fine lines need separate checks. If edges, barcode readability, or line continuity fail after scaling, return to the master and change size or format.' },
      { zh: '本站圖片調整尺寸工具可用來建立用途明確的像素版本；壓縮工具則處理檔案重量。先決定像素，再壓縮副本，避免用品質滑桿掩蓋像素不足。', en: 'Use the image resizer to create purpose-named pixel versions, then use the compressor for file weight. Decide pixels first and compress a copy so a quality slider does not hide insufficient detail.' },
      { zh: '若平台會自動裁切或縮放，先上傳測試圖並從下載結果回讀尺寸。平台規則可能改變，不能只依設計軟體的畫布數字判斷最終效果。', en: 'When a platform crops or scales automatically, upload a test and read back the downloaded dimensions. Platform rules can change, so a design canvas alone cannot prove final output.' },
      { zh: '保留原始高解析主檔與列印／網頁輸出，不要在同一檔案上來回放大縮小。版本名稱包含用途、像素與日期，後續換版位時才能找到正確來源。', en: 'Keep a high-resolution master separate from print and web exports. Do not resize the same file back and forth; name versions with purpose, pixels, and date for future placements.' },
      { zh: '交付前讓實際使用者在目標紙張或網頁上檢查，並把「可讀、可掃描、可載入」分開記錄。解析度合格不代表內容焦點、色彩或檔案大小也合格。', en: 'Have the real user inspect the target paper or page and record readability, scanability, and load weight separately. Passing resolution does not prove focus, color, or file size.' },
    ],
    steps: [
      { zh: '寫下用途、最終尺寸、觀看距離與不可模糊的內容。', en: 'Record purpose, final size, viewing distance, and content that must stay sharp.' },
      { zh: '以版位寬度與紙張尺寸推導目標像素，不只填 DPI。', en: 'Derive target pixels from placement or paper size, not DPI alone.' },
      { zh: '用圖片調整尺寸工具從主檔輸出用途版本。', en: 'Export purpose-specific versions from the master with the image resizer.' },
      { zh: '在列印樣張或實際網頁檢查文字、細線與條碼。', en: 'Check text, fine lines, and barcodes on a print proof or real page.' },
      { zh: '需要時以圖片壓縮工具減少檔案重量，保留主檔。', en: 'Use the compressor for weight only when needed and keep the master.' },
      { zh: '回讀平台實際輸出，確認沒有自動裁切或縮放問題。', en: 'Read back the platform output to catch automatic crop or scaling.' },
      { zh: '保存像素、格式、大小與驗收結果，供下次重用。', en: 'Save pixels, format, size, and acceptance results for reuse.' },
    ],
    example: { zh: '同一張活動主視覺要做 A3 海報與網站 600px 卡片。團隊從主檔各自輸出列印與網頁版本，在 A3 樣張檢查小字，在網站測試載入與裁切；網頁版再壓縮，海報版保留較多細節，兩者不互相覆蓋。', en: 'One event visual serves an A3 poster and a 600px web card. The team exports each from the master, checks small type on an A3 proof, tests load and crop on the page, compresses only the web copy, and keeps both versions separate.' },
    commonMistakes: [
      { zh: '只改 DPI 數字，沒有確認像素與最終尺寸。', en: 'Changing DPI without checking pixels and final size.' },
      { zh: '把列印高解析檔直接拿去當網頁素材。', en: 'Using a print master directly on the web.' },
      { zh: '用壓縮品質掩蓋來源像素不足。', en: 'Using compression quality to hide insufficient source pixels.' },
      { zh: '只看照片，不驗收文字、條碼與細線。', en: 'Checking photos but not text, barcodes, or fine lines.' },
      { zh: '在同一檔案上反覆放大縮小，沒有保存主檔。', en: 'Resizing the same file repeatedly without a master.' },
      { zh: '忽略平台自動裁切、重採樣與實際下載結果。', en: 'Ignoring platform crop, resampling, and downloaded output.' },
    ],
    faq: [
      { question: { zh: '網頁圖片一定要使用最高解析度嗎？', en: 'Should web images always use the highest resolution?' }, answer: { zh: '不一定。應依版位與裝置密度提供足夠像素，再以檔案重量與實際清晰度取平衡。', en: 'No. Provide enough pixels for the placement and display density, then balance weight against real clarity.' } },
      { question: { zh: 'DPI 越高列印一定越清楚嗎？', en: 'Does higher DPI always make print sharper?' }, answer: { zh: '不一定。來源像素、實際紙張尺寸、觀看距離與細節本身都會影響結果，先做樣張比單改數字可靠。', en: 'No. Source pixels, paper size, viewing distance, and detail also matter. A proof is more reliable than changing one number.' } },
      { question: { zh: '可以用壓縮解決圖片不清楚嗎？', en: 'Can compression fix a blurry image?' }, answer: { zh: '不能。壓縮主要改變檔案重量與品質，無法創造遺失的細節；應回到主檔或重新取得較高解析來源。', en: 'No. Compression changes weight and quality but cannot create missing detail; return to the master or obtain a higher-resolution source.' } },
      { question: { zh: '列印版與網頁版要保留兩份嗎？', en: 'Should print and web versions be separate?' }, answer: { zh: '建議分開輸出並保留同一主檔。兩者的像素、格式、重量與驗收條件不同，混用容易造成過大或過小。', en: 'Yes, export both from one master. Pixels, format, weight, and acceptance differ, so mixing them creates oversized or underspecified files.' } },
    ],
    cta: { zh: '先按列印或網頁用途決定像素與尺寸，再用圖片調整尺寸、壓縮工具和實際版位驗收。', en: 'Choose pixels and size for print or web first, then verify with resize, compression, and the real placement.' },
    updatedAt: '2026-09-03',
    noFaqSchema: true,
  },
  {
    id: 'image-color-profile-web-print-guide',
    locales: ['zh', 'en'],
    slug: 'image-color-profile-web-print-guide',
    title: { zh: '圖片色彩設定與網頁列印交付指南', en: 'Choose Image Color Profiles for Web and Print' },
    metaTitle: { zh: 'sRGB、Adobe RGB、CMYK 怎麼選？圖片色彩交付檢查', en: 'sRGB, Adobe RGB, or CMYK: Image Color Profile Guide' },
    metaDescription: {
      zh: '釐清 sRGB、Adobe RGB 與 CMYK 的用途，從工作色彩空間、嵌入設定到瀏覽器與印刷打樣逐項回讀，降低顏色變淡、偏色或黑位消失的交付風險。',
      en: 'Choose sRGB, Adobe RGB, or CMYK by destination. Check embedded profiles, browser previews, and print proofs so exports do not look washed out or shifted.',
    },
    h1: { zh: 'sRGB、Adobe RGB、CMYK 怎麼選：圖片網頁與列印色彩驗收流程', en: 'How to Choose sRGB, Adobe RGB, or CMYK for Web and Print' },
    category: { zh: '圖片工作流程', en: 'Image workflows' },
    priority: 53,
    searchIntent: { zh: '使用者在網頁、社群與列印之間交付圖片，想知道應採用哪個色彩空間，以及如何避免不同軟體或平台造成顏色偏移。', en: 'A user is delivering images for web, social, and print and needs to choose a color space while avoiding shifts between apps, browsers, and printers.' },
    targetKeywords: [
      { zh: 'sRGB Adobe RGB CMYK 怎麼選', en: 'sRGB vs Adobe RGB vs CMYK' },
      { zh: '網頁圖片色彩設定', en: 'web image color profile' },
      { zh: '列印圖片偏色檢查', en: 'print image color shift check' },
    ],
    relatedToolIds: ['image-compressor', 'image-resizer', 'png-to-jpg'],
    relatedGuideIds: ['image-resolution-print-web-guide', 'image-compression-quality-size-guide', 'image-compressor-metadata-privacy-guide'],
    relatedWorkflowIds: ['creator-social-toolkit'],
    summary: { zh: '色彩空間不是檔案副檔名；要按目的地選擇工作空間、保留或轉換嵌入設定，並用瀏覽器與實體打樣回讀最終結果。', en: 'A color space is not the file extension. Choose it for the destination, preserve or convert the embedded profile deliberately, and read back the result in a browser or print proof.' },
    problem: { zh: '同一張圖在設計軟體看起來鮮豔，輸出到網站卻變灰，或送印後膚色與品牌色偏移。若只改檔名、盲目把 RGB 轉 CMYK，或把不同版本互相覆蓋，之後很難追查是哪個階段改變了色彩。', en: 'An image can look vivid in a design app yet appear dull on a website or shift in print. Renaming a file, blindly converting RGB to CMYK, or overwriting versions makes the stage that changed the color hard to trace.' },
    whoShouldUse: { zh: '適合設計師、攝影師、電商、行銷與需要同時交付網頁素材、社群圖卡和印刷檔案的團隊。', en: 'Useful for designers, photographers, ecommerce teams, marketers, and anyone delivering web, social, and print assets.' },
    explanation: [
      { zh: '先把交付目的寫在檔案名稱與清單中。網頁與多數螢幕預覽通常以 sRGB 作為穩健起點，印刷則要依印刷廠的色彩流程與 ICC 設定決定；Adobe 的色彩設定說明提醒，工作空間與色彩管理政策會影響轉換方式（https://helpx.adobe.com/photoshop/using/color-settings.html）。', en: 'Write the destination in the filename and handoff sheet. sRGB is a practical starting point for web and common screen previews, while print depends on the printer’s process and ICC settings. Adobe notes that the working space and color-management policy affect conversions (https://helpx.adobe.com/photoshop/using/color-settings.html).' },
      { zh: '分清楚工作色彩空間與嵌入檔案的 profile。工作空間是編輯時的參考，嵌入 profile 是告訴下一個軟體如何解讀數值；沒有 profile 時，對方只能猜測，顏色可能因此變化。', en: 'Separate the working space from the profile embedded in the file. The working space guides editing, while the embedded profile tells the next app how to interpret values; without it, the recipient has to guess.' },
      { zh: '不要把 Adobe RGB 直接當成「比 sRGB 更適合網頁」。若瀏覽器、社群或轉檔流程沒有正確管理，寬色域數值可能被當成 sRGB 解讀而顯得不飽和；Adobe 的線上色彩管理說明也建議為網頁準備經過管理的輸出（https://helpx.adobe.com/photoshop/using/color-managing-documents-online-viewing.html）。', en: 'Do not assume Adobe RGB is automatically better for the web. If a browser, social platform, or converter does not manage it correctly, wide-gamut values can be interpreted as sRGB and look muted. Adobe’s online color-management guidance explains why managed exports matter (https://helpx.adobe.com/photoshop/using/color-managing-documents-online-viewing.html).' },
      { zh: 'CMYK 不是單一標準，而是與印刷條件相關的色彩模型。送印前向印刷廠取得指定 profile 與紙張要求，再做副本轉換；不要用網頁版反向轉成 CMYK 後再拿回網站。', en: 'CMYK is not one universal standard; it depends on the print process and paper. Get the printer’s requested profile, convert a copy, and never reuse that print conversion as the web master.' },
      { zh: '用「保留嵌入 profile」與「轉換成目的地 profile」做明確選擇。前者適合保留可管理的來源資訊，後者適合你已知下一站的色彩條件；兩種動作都要記錄來源與目的地，避免重複轉換。', en: 'Choose deliberately between preserving an embedded profile and converting to the destination profile. Preserve when the next system is color-managed; convert when the destination is known. Record both source and destination to avoid double conversion.' },
      { zh: '輸出後分別在色彩管理的桌面軟體、一般瀏覽器與目標平台預覽。若畫面差異很大，先確認檔案是否仍有 profile、平台是否重編碼，再調整而不是立刻提高飽和度。', en: 'Preview exports in a color-managed desktop app, a normal browser, and the target platform. If they differ, check the embedded profile and platform re-encoding before pushing saturation higher.' },
      { zh: '列印交付要做小尺寸打樣或軟打樣，特別檢查膚色、品牌色、深黑、漸層與細字。螢幕亮度不能代表紙張反射光，螢幕版通過不等於印刷版通過。', en: 'For print, run a small proof or soft proof and check skin tones, brand colors, deep blacks, gradients, and fine type. Screen brightness does not represent reflected paper light, so a screen pass is not a print pass.' },
      { zh: '保留一份不轉換的主檔，再輸出 web、social、print 副本。檔名加入色彩空間、像素、用途與日期，並把 profile 與驗收截圖放進同一交付資料夾。', en: 'Keep an unconverted master and export separate web, social, and print copies. Put color space, pixels, purpose, and date in filenames, and store profile evidence and proof screenshots with the handoff.' },
      { zh: '瀏覽器端的圖片工具適合處理尺寸、格式與檔案重量，不能替你判斷印刷 profile。色彩決策仍要回到交付規格、平台支援與實際回讀。', en: 'Browser image tools can handle dimensions, formats, and file weight, but they cannot decide a printer’s profile for you. Color decisions still depend on the specification, platform support, and readback.' },
    ],
    steps: [
      { zh: '寫下目的地、紙張或螢幕版位與色彩要求。', en: 'Record the destination, paper or screen placement, and color requirements.' },
      { zh: '確認來源檔的工作空間與嵌入 profile。', en: 'Check the source working space and embedded profile.' },
      { zh: '保留主檔，分別輸出 web、social 與 print 副本。', en: 'Keep the master and export separate web, social, and print copies.' },
      { zh: '依目的地保留或轉換 profile，記錄來源與目的地。', en: 'Preserve or convert the profile for the destination and log both spaces.' },
      { zh: '在瀏覽器、目標平台與列印樣張中回讀顏色。', en: 'Read back color in a browser, target platform, and print proof.' },
      { zh: '檢查膚色、品牌色、黑位、漸層與小字。', en: 'Check skin tones, brand colors, blacks, gradients, and small type.' },
      { zh: '保存 profile、版本名稱與驗收結果。', en: 'Save profile evidence, version names, and acceptance results.' },
    ],
    example: { zh: '電商團隊把商品照同時交給網站與印刷型錄。網站副本轉為管理良好的 sRGB 並在實際頁面回讀，型錄副本依印刷廠提供的 profile 做軟打樣；兩份都從未轉換主檔輸出，檢查品牌紅與黑位後才交付。', en: 'An ecommerce team prepares a product photo for a website and a printed catalog. The web copy uses managed sRGB and is checked on the real page; the catalog copy uses the printer’s profile for a soft proof. Both come from an unconverted master, and brand red and black detail are checked before handoff.' },
    commonMistakes: [
      { zh: '把 Adobe RGB 直接當成網頁必然更好。', en: 'Assuming Adobe RGB is automatically better for web.' },
      { zh: '沒有 profile 卻要求下一個軟體猜色彩。', en: 'Leaving the next app to guess without a profile.' },
      { zh: '把印刷 CMYK 副本再拿回網站使用。', en: 'Reusing a print CMYK copy on the web.' },
      { zh: '重複轉換同一檔案，沒有保存主檔。', en: 'Converting the same file repeatedly without a master.' },
      { zh: '只在亮度很高的螢幕檢查，不做打樣。', en: 'Checking only on a bright screen and skipping a proof.' },
      { zh: '用提高飽和度掩蓋 profile 或平台管理問題。', en: 'Increasing saturation to hide a profile or platform-management issue.' },
    ],
    faq: [
      { question: { zh: '網頁圖片一定要轉成 sRGB 嗎？', en: 'Must every web image be converted to sRGB?' }, answer: { zh: '要看平台是否完整支援色彩管理；若目標平台與受眾環境不確定，經管理的 sRGB 通常較容易預期，但仍應在實際頁面回讀。', en: 'It depends on color-management support. When the destination is uncertain, managed sRGB is usually more predictable, but verify it on the real page.' } },
      { question: { zh: 'CMYK 可以直接放到網站嗎？', en: 'Can a CMYK file go directly on a website?' }, answer: { zh: '不建議把印刷副本直接當網頁主檔；另從主檔輸出符合網站規格的版本，避免瀏覽器或平台錯誤解讀。', en: 'Do not use the print copy as the web master. Export a web-specific version from the master so the browser or platform does not misinterpret it.' } },
      { question: { zh: '沒有印刷機可以驗收列印色彩嗎？', en: 'Can print color be accepted without a printer?' }, answer: { zh: '可先做軟打樣並向印刷廠確認 profile，但最終仍要以實體樣張或印刷廠的 proof 作為交付依據。', en: 'You can soft-proof and confirm the profile with the printer, but final acceptance should use a physical proof or the printer’s approved proof.' } },
      { question: { zh: '色彩偏掉時先改飽和度嗎？', en: 'Should saturation be adjusted first when colors shift?' }, answer: { zh: '先檢查 profile、轉換紀錄與平台是否重編碼；確認流程正確後才調整影像，否則可能把管理問題烙進主檔。', en: 'First check profiles, conversion history, and platform re-encoding. Adjust the image only after the pipeline is correct, or you may bake a workflow problem into the master.' } },
    ],
    cta: { zh: '按目的地建立色彩版本，保存主檔與 profile 證據，再用瀏覽器和打樣回讀，而不是只相信設計軟體預覽。', en: 'Create color-specific exports, keep the master and profile evidence, and read back in a browser and proof instead of trusting one app preview.' },
    updatedAt: '2026-09-03',
    noFaqSchema: true,
  },
  {
    id: 'image-resampling-quality-guide',
    locales: ['zh', 'en'],
    slug: 'image-resampling-quality-guide',
    title: { zh: '圖片重採樣與放大縮小品質指南', en: 'Image Resampling Quality Guide for Upscaling and Downscaling' },
    metaTitle: { zh: '圖片放大縮小會糊嗎？重採樣方法與品質驗收', en: 'Image Resampling: Upscale and Downscale Quality' },
    metaDescription: {
      zh: '區分裁切、改尺寸與重採樣，依放大或縮小目的選擇方法，檢查鋸齒、暈邊、文字與細節，並從主檔輸出不同用途版本，避免反覆改尺寸造成品質累積損失與交付誤判。',
      en: 'Separate cropping, resizing, and resampling. Choose a method for upscaling or downscaling, inspect edges and detail, and export each size from the master.',
    },
    h1: { zh: '圖片放大與縮小怎麼不失真：重採樣方法與驗收流程', en: 'How to Upscale or Downscale Images: Resampling and Quality Checks' },
    category: { zh: '圖片工作流程', en: 'Image workflows' },
    priority: 54,
    searchIntent: { zh: '使用者需要把圖片改成不同尺寸，想了解裁切、重採樣與放大的差異，以及如何避免鋸齒、暈邊、文字模糊與檔案反覆處理造成的品質損失。', en: 'A user needs multiple image sizes and wants to distinguish cropping from resampling and upscaling while avoiding jagged edges, halos, blurry text, and cumulative quality loss.' },
    targetKeywords: [
      { zh: '圖片重採樣是什麼', en: 'what is image resampling' },
      { zh: '圖片放大不失真方法', en: 'upscale image without losing quality' },
      { zh: '圖片縮小鋸齒暈邊', en: 'image downscaling jagged edges halos' },
    ],
    relatedToolIds: ['image-resizer', 'image-crop', 'image-compressor'],
    relatedGuideIds: ['image-resize-aspect-ratio-guide', 'image-resolution-print-web-guide', 'image-compression-quality-size-guide'],
    relatedWorkflowIds: ['creator-social-toolkit'],
    summary: { zh: '改變像素尺寸就會涉及重採樣；先決定裁切與比例，再從高品質主檔輸出，最後以文字、細線、邊緣和檔案用途驗收。', en: 'Changing pixel dimensions involves resampling. Decide crop and ratio first, export from a high-quality master, and verify text, lines, edges, and purpose.' },
    problem: { zh: '把同一張圖片先放大、再縮小、再壓縮，常會出現鋸齒、暈邊、細節消失或文字難讀。若只看預覽縮圖，可能沒發現實際版位放大後的缺陷。', en: 'Repeatedly enlarging, shrinking, and compressing one image can create jagged edges, halos, lost detail, or unreadable text. A thumbnail preview can hide defects that appear at the real placement size.' },
    whoShouldUse: { zh: '適合社群編輯、設計、電商、教師與需要批次準備縮圖、海報、簡報或網站卡片的人員。', en: 'Useful for social editors, designers, ecommerce teams, teachers, and anyone preparing thumbnails, posters, slides, or web cards.' },
    explanation: [
      { zh: '先分辨三個動作：裁切改變畫面範圍，調整尺寸改變像素數，重採樣則是軟體為新像素估算顏色。三者可一起使用，但順序不同會影響主體是否被拉伸或細節是否先被丟掉。', en: 'Separate three actions: cropping changes the visible area, resizing changes pixel dimensions, and resampling estimates colors for new pixels. They can be combined, but order affects stretching and detail loss.' },
      { zh: '先決定比例與版位，再裁切，最後才輸出目標像素。若先把完整照片縮小再裁切，主體可能變小且細節已經不可逆地減少；保留主檔能重新調整。', en: 'Choose the ratio and placement first, crop second, and export target pixels last. Shrinking a full photo before cropping may make the subject too small and discard detail irreversibly.' },
      { zh: '放大不會創造真實細節。插值可以讓邊緣較平滑，但原始文字、髮絲與紋理若不存在，放大後只能呈現估算結果；Adobe 的重採樣選項說明可用來理解不同方法與取捨（https://helpx.adobe.com/photoshop/desktop/crop-resize-transform/resize-adjust-resolution/resampling-options.html）。', en: 'Upscaling cannot create true source detail. Interpolation can smooth edges, but missing text, hair, or texture remains an estimate. Adobe’s resampling-options guidance explains the available methods and trade-offs (https://helpx.adobe.com/photoshop/desktop/crop-resize-transform/resize-adjust-resolution/resampling-options.html).' },
      { zh: '縮小通常要特別檢查細線、文字與高對比邊緣。若縮小後出現鋸齒或細字黏成一團，可調整輸出尺寸、先簡化內容，或改用適合小尺寸閱讀的設計，而不是只提高壓縮品質。', en: 'Downscaling needs extra checks on fine lines, text, and high-contrast edges. If small type merges or edges become jagged, change the output size, simplify the design, or adapt it for small reading instead of only raising compression quality.' },
      { zh: '用一張含文字、斜線、人物髮絲與純色背景的測試圖比較輸出。這些區域能快速顯示過度平滑、鋸齒、暈邊、色塊與細節消失，不要只用模糊風景照判斷。', en: 'Compare outputs with a test image containing type, diagonals, hair, and flat color. These regions reveal oversmoothing, jaggies, halos, banding, and lost detail faster than a soft landscape photo.' },
      { zh: '本站圖片調整尺寸工具適合建立明確命名的尺寸副本；放大前先確認來源像素與用途，縮小後再用壓縮工具處理重量。兩個工具解決不同問題，不要用壓縮滑桿補救錯誤尺寸。', en: 'Use the image resizer to create clearly named size variants, confirm source pixels before upscaling, and compress only after resizing. The tools solve different problems; a quality slider cannot fix the wrong dimensions.' },
      { zh: '避免在 JPEG 上反覆存檔。先從無損或高品質主檔輸出尺寸，再一次完成格式與壓縮；每次有損編碼都可能讓細節與邊緣更難判斷。', en: 'Avoid repeatedly saving a JPEG. Export sizes from a lossless or high-quality master, then perform format and compression once; each lossy encode can make detail and edges harder to evaluate.' },
      { zh: '平台縮圖可能再重採樣或裁切。把輸出上傳到真實版位，下載或截圖回讀尺寸與焦點；本機預覽通過不等於平台處理後仍通過。', en: 'A platform may resample or crop again. Upload to the real placement and read back dimensions and subject focus from the download or capture; a local pass does not prove the platform pass.' },
      { zh: '把可接受的瑕疵門檻寫下來：文字必須可讀、條碼必須可掃、邊緣不可有明顯光暈、檔案要符合載入限制。不同用途的門檻不同，不能用一張「看起來還行」取代驗收。', en: 'Write acceptance thresholds: text must remain readable, barcodes scannable, edges free of obvious halos, and file weight within the load budget. Thresholds differ by use; “looks okay” is not a test.' },
    ],
    steps: [
      { zh: '記錄來源像素、目標版位、比例與不可失真的內容。', en: 'Record source pixels, target placement, ratio, and content that must stay intact.' },
      { zh: '先決定是否裁切，再建立目標尺寸。', en: 'Decide whether to crop before creating the target size.' },
      { zh: '從主檔輸出放大或縮小版本，避免覆蓋來源。', en: 'Export the upscale or downscale from the master without overwriting it.' },
      { zh: '用含文字、斜線與細節的測試圖檢查邊緣。', en: 'Check edges with a test image containing type, diagonals, and detail.' },
      { zh: '需要時一次壓縮輸出，記錄格式與品質設定。', en: 'Compress once when needed and record format and quality settings.' },
      { zh: '在真實平台回讀尺寸、裁切、焦點與載入結果。', en: 'Read back size, crop, focus, and load behavior on the real platform.' },
      { zh: '保存版本與失敗案例，供下次選擇方法。', en: 'Save versions and failed examples to guide the next method choice.' },
    ],
    example: { zh: '團隊要把 4000px 商品照做成 1200px 網頁主圖與 320px 搜尋縮圖。先保留商品比例並各自裁切，再從主檔輸出兩個尺寸；縮圖以文字可讀與邊緣無暈邊為門檻，最後在實際網站回讀平台裁切。', en: 'A team turns a 4000px product photo into a 1200px web hero and a 320px search thumbnail. They preserve the product ratio, crop each placement, export both from the master, require readable type and halo-free edges in the thumbnail, and read back the site crop.' },
    commonMistakes: [
      { zh: '把放大當成能補回原本不存在的細節。', en: 'Expecting upscaling to restore detail that was never captured.' },
      { zh: '先縮小再裁切，導致主體與細節不可逆損失。', en: 'Shrinking before cropping and losing subject detail irreversibly.' },
      { zh: '只看縮圖，不在實際版位尺寸檢查。', en: 'Checking only a thumbnail instead of the real placement size.' },
      { zh: '反覆存 JPEG，讓有損瑕疵累積。', en: 'Saving JPEG repeatedly and accumulating lossy artifacts.' },
      { zh: '用品質滑桿掩蓋像素或比例錯誤。', en: 'Using a quality slider to hide pixel or ratio errors.' },
      { zh: '忽略平台再次裁切與重採樣。', en: 'Ignoring the platform’s second crop or resample.' },
    ],
    faq: [
      { question: { zh: '圖片放大可以完全不失真嗎？', en: 'Can an image be enlarged with no quality loss?' }, answer: { zh: '不能保證。重採樣能改善邊緣連續性，但無法恢復來源沒有的真實細節；應以實際用途門檻判斷是否可接受。', en: 'There is no guarantee. Resampling can smooth edges but cannot recover missing source detail; judge it against the use-case threshold.' } },
      { question: { zh: '縮小圖片應先裁切還是先調尺寸？', en: 'Should you crop or resize first?' }, answer: { zh: '通常先按版位裁切與確認比例，再輸出目標尺寸，能避免把不需要的畫面也縮進檔案並浪費細節。', en: 'Usually crop and confirm the ratio for the placement first, then export the target size so unused areas do not consume pixels.' } },
      { question: { zh: '哪種重採樣方法一定最好？', en: 'Is one resampling method always best?' }, answer: { zh: '沒有。放大、縮小、照片、文字與線稿的最佳取捨不同，應用測試圖和實際版位比較，而不是只看方法名稱。', en: 'No. The trade-off differs for upscaling, downscaling, photos, type, and line art. Compare a test image at the real placement.' } },
      { question: { zh: '壓縮能修正鋸齒或暈邊嗎？', en: 'Can compression fix jaggies or halos?' }, answer: { zh: '不能。壓縮主要改變檔案大小與編碼品質；應回到裁切、重採樣與來源版本處理邊緣問題。', en: 'No. Compression changes file weight and encoding quality. Fix edge problems in the crop, resampling, or source version instead.' } },
    ],
    cta: { zh: '先按版位裁切與定比例，再從主檔輸出尺寸，最後以文字、細線、邊緣和平台回讀驗收。', en: 'Crop and set the ratio first, export from the master, then verify type, fine lines, edges, and platform readback.' },
    updatedAt: '2026-09-03',
    noFaqSchema: true,
  },
];
