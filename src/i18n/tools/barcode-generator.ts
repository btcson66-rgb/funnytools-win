import type { ToolContent } from './_types';

export default {
  zh: {
    name: '條碼產生器',
    short: '輸入文字或商品編號，即時產生 Code 128、EAN-13、UPC-A 或 Code 39 條碼。',
    long: '條碼產生器可把文字或數字轉成適合標籤、庫存、商品測試與內部管理的條碼，並下載 PNG 或 SVG。選擇 EAN-13 或 UPC-A 時，工具會驗證檢查碼；輸入 12 位 EAN 或 11 位 UPC 資料碼時也會自動補上正確檢查碼。所有內容只在瀏覽器本機處理，不會傳送到 FunnyTools 或第三方伺服器。',
    seoTitle: '條碼產生器｜Code 128、EAN-13、UPC-A、Code 39 免費下載',
    seoDescription: '免費線上條碼產生器，支援 Code 128、EAN-13、UPC-A、Code 39，即時預覽並下載 PNG、SVG，自動驗證商品條碼檢查碼。',
    keywords: ['條碼產生器', 'Barcode Generator', 'Code 128', 'EAN-13', 'UPC-A', 'Code 39', '商品條碼', '條碼 PNG', '條碼 SVG'],
    capabilities: [
      '支援 Code 128、EAN-13、UPC-A 與 Code 39 四種常用一維條碼。',
      '即時檢查 EAN-13 與 UPC-A 位數及檢查碼，避免輸出表面正常但編號錯誤的圖。',
      '可下載清晰的 PNG 點陣圖或可縮放的 SVG 向量圖，方便放入標籤與文件。',
      '輸入內容與產生結果都只在目前瀏覽器分頁處理，不會上傳。',
    ],
    contentSections: [
      {
        heading: '先選對條碼格式',
        paragraphs: [
          '答案是：一般內部標籤優先用 Code 128，零售商品則依通路規範選 EAN-13 或 UPC-A，舊式資產標籤才常用 Code 39。條碼不是只要掃得到就能互換；掃描器可能支援多種格式，但商店、物流平台或倉儲系統通常會限定資料長度與編碼規則。正式印製前，應先向接收條碼的通路或系統管理者確認規格。',
          '本工具產生的是條碼圖形，不會替你申請全球商品編號，也不會查詢編號是否屬於某家公司。要在零售通路販售商品，EAN 或 UPC 前綴通常需依 GS1 或所在地通路程序取得；自行輸入一組能通過檢查碼的數字，只代表數學格式正確，不代表該商品編號已合法註冊。',
        ],
      },
      {
        heading: 'Code 128：內容彈性最高的日常選擇',
        paragraphs: [
          'Code 128 適合庫存編號、訂單號、包裹代碼、工單與內部資產標籤。它能編碼英文字母、數字及多種符號，資料密度通常也比 Code 39 高，因此同樣內容可以做得較窄。若你只是要讓掃描器快速輸入一串內部代碼，又沒有零售通路規範，Code 128 通常是最實用的起點。',
          'Code 128 雖然能放較長內容，但條碼越長就需要越大的印刷寬度。不要把整段說明、網址參數或大量個資塞進一維條碼；應改用短代碼對應後端資料。標籤若縮得太窄，黑白線條會擠在一起，手機或舊掃描器就可能讀不到。',
        ],
      },
      {
        heading: 'EAN-13 與 UPC-A：零售商品編號',
        paragraphs: [
          'EAN-13 固定為 13 位數，常見於全球零售商品；UPC-A 固定為 12 位數，主要常見於北美市場。兩者最後一位都是檢查碼，用前面的資料碼依固定權重計算。你可以輸入 12 位 EAN-13 資料碼或 11 位 UPC-A 資料碼，工具會補上最後一位；若輸入完整 13 位或 12 位編號，工具會重新計算並在不一致時直接顯示錯誤。',
          '檢查碼只能發現常見的輸入錯誤，不能證明產品名稱、價格、公司或庫存資料正確。掃描後顯示什麼內容，取決於收銀、倉儲或資料庫系統如何對應該編號。製作包裝前應使用通路提供的測試流程，並以實際掃描器檢查列印成品。',
        ],
      },
      {
        heading: 'Code 39：相容傳統設備的簡單格式',
        paragraphs: [
          'Code 39 常見於較早期的工業、汽車、國防與資產管理流程。它支援大寫英文字母、數字、空白與少數符號，規則容易實作，許多舊型掃描器也能辨識。缺點是資料密度較低，相同文字通常比 Code 128 更寬；內容太長時不適合貼在小型標籤上。',
          '工具會把 Code 39 英文字母轉成大寫，並拒絕格式不支援的字元。若既有系統要求額外的 Mod 43 檢查字元、起訖星號顯示方式或特定高度，請依系統文件處理；本頁提供一般 Code 39 圖形，不能取代企業標籤規格驗證。',
        ],
      },
      {
        heading: '條碼產生與下載步驟',
        paragraphs: [
          '做法很簡單：先輸入要編碼的文字或數字，再選擇格式；預覽會在輸入停止片刻後自動更新。EAN-13 與 UPC-A 若位數或檢查碼錯誤，下載按鈕會停用並顯示原因。確認預覽下方的人眼可讀文字正確後，選擇 PNG 或 SVG 下載。',
          'PNG 適合貼到 Word、PowerPoint、試算表或一般圖片工具；SVG 是向量格式，適合交給排版軟體縮放與印刷。無論選哪一種，都要保留條碼左右的空白區，不要裁到第一條或最後一條線，也不要任意拉伸寬高比例。',
        ],
        items: [
          '內部編號沒有通路限制時，先試 Code 128。',
          'EAN-13 可輸入 12 位資料碼，UPC-A 可輸入 11 位資料碼，工具會補檢查碼。',
          '完整編號若檢查碼錯誤，先回來源資料核對，不要只把最後一位改到能通過。',
          '印刷前以最終尺寸、紙張、印表機與實際掃描器測試。',
        ],
      },
      {
        heading: '列印限制與品質檢查',
        paragraphs: [
          '限制是：條碼可否掃描同時受到尺寸、解析度、對比、空白區、印表機與標籤材質影響。畫面預覽成功不等於印出後一定可用。低解析度截圖、熱感紙髒污、亮面反光、曲面包裝、墨水暈開或把深色條碼印在花紋背景上，都可能降低辨識率。',
          '建議優先使用黑色條碼與白色背景，不要反白，也不要在條碼上疊 Logo、文字或裁切標記。PNG 若需要放大很多，改用 SVG 可避免像素化；但排版軟體輸出 PDF 時仍要檢查線條是否保持清晰。大量標籤或正式商品包裝應交由熟悉條碼規範的印刷與品管流程驗證。',
        ],
      },
    ],
    instructions: [
      '輸入商品編號、庫存碼、訂單號或其他短文字。',
      '選擇 Code 128、EAN-13、UPC-A 或 Code 39；預覽會即時更新。',
      '若使用 EAN-13 或 UPC-A，依錯誤提示核對位數與最後一位檢查碼。',
      '確認人眼可讀文字正確，再下載 PNG 或 SVG 並以最終印刷尺寸試掃。',
    ],
    examples: [
      '用 Code 128 製作倉庫料號與內部資產標籤。',
      '輸入 12 位資料碼，自動產生含正確檢查碼的 EAN-13 測試圖。',
      '替北美商品包裝流程驗證 12 位 UPC-A 編號。',
      '為只能讀取 Code 39 的舊型設備建立大寫英數標籤。',
    ],
    audience: [
      '需要快速製作庫存、訂單、工單或資產標籤的行政與倉儲人員。',
      '準備商品包裝草稿並想先驗證 EAN-13 或 UPC-A 位數與檢查碼的人。',
      '要把條碼放入文件、簡報、標籤排版或測試資料的設計與開發人員。',
      '使用既有掃描器，需要比較 Code 128 與 Code 39 相容性的現場人員。',
    ],
    caseStudies: [
      { title: '庫存標籤', description: '小型倉庫把既有料號轉成 Code 128 SVG，放入固定尺寸的標籤版型後，以現場掃描器逐批抽測，減少手動輸入錯誤。' },
      { title: '包裝校稿', description: '設計人員輸入完整 EAN-13，工具先攔下錯誤檢查碼；回到產品主檔核對後再輸出 SVG，避免把錯誤編號送進印刷稿。' },
      { title: '舊設備相容', description: '工廠沿用只支援特定格式的掃描流程，先以 Code 39 建立短資產碼，確認允許字元與標籤寬度後才進行批次印製。' },
    ],
    notes: [
      '本工具不核發、不註冊也不查詢 GS1 商品編號；通過檢查碼只代表數字格式有效。',
      '條碼圖形在瀏覽器本機產生，輸入資料不會上傳；但下載後的檔案仍應依你的資料安全規範保存。',
      '正式零售、物流、醫療或法規用途可能有尺寸、靜區、倍率與印刷品質要求，請依接收系統規格驗證。',
    ],
    faq: [
      { q: 'EAN-13 或 UPC-A 的檢查碼怎麼處理？', a: '直接答案：輸入 12 位 EAN-13 或 11 位 UPC-A 資料碼時，工具會自動計算最後一位；輸入完整編號時則會驗證，不一致就顯示正確檢查碼提示。' },
      { q: '通過檢查碼就代表商品編號可以使用嗎？', a: '不是。檢查碼只驗證數字結構，無法確認編號是否已由 GS1 或通路核發，也不會驗證商品、公司或價格資料。' },
      { q: 'PNG 和 SVG 應該下載哪一個？', a: '一般文件與簡報可用 PNG；需要在排版軟體縮放或交付印刷時優先用 SVG，並保留正確比例與左右空白區。' },
      { q: '為什麼畫面看得到，印出來卻掃不到？', a: '最常見原因是尺寸太小、對比不足、空白區被裁切、圖片被拉伸、印表機暈墨或材質反光。請用最終標籤和實際掃描器測試。' },
      { q: '輸入的商品編號會上傳嗎？', a: '不會。JsBarcode 在目前瀏覽器分頁產生 SVG 與 PNG，FunnyTools 不會接收或儲存你輸入的內容。' },
    ],
    labels: {
      localNote: '條碼只在你的瀏覽器本機產生，輸入內容不會上傳。',
      inputLabel: '文字或數字', placeholder: '例如：ITEM-2026-001', formatLabel: '條碼格式',
      hintCode128: 'Code 128 適合訂單號、庫存碼與含英數符號的內部標籤。',
      hintEan13: 'EAN-13 請輸入 12 位資料碼或含檢查碼的完整 13 位數字。',
      hintUpc: 'UPC-A 請輸入 11 位資料碼或含檢查碼的完整 12 位數字。',
      hintCode39: 'Code 39 支援大寫英文字母、數字、空白與 . $ / + % -。',
      downloadPng: '下載 PNG', downloadSvg: '下載 SVG', reset: '重設', previewAlt: '條碼預覽',
      emptyError: '請輸入要產生條碼的內容。',
      eanLengthError: 'EAN-13 只能輸入 12 位資料碼或 13 位完整數字。',
      upcLengthError: 'UPC-A 只能輸入 11 位資料碼或 12 位完整數字。',
      checksumError: '檢查碼錯誤，正確的最後一位應為 {digit}。',
      code39Error: 'Code 39 只支援英文字母、數字、空白與 . $ / + % -。',
      renderError: '無法產生條碼，請縮短內容或改用其他格式。',
    },
    privacyNote: '條碼透過 JsBarcode 在你的瀏覽器本機產生；文字、商品編號與輸出圖形都不會上傳到本站或第三方伺服器。',
  },
  en: {
    name: 'Barcode Generator',
    short: 'Create Code 128, EAN-13, UPC-A, or Code 39 barcodes with live validation and PNG or SVG downloads.',
    long: 'Barcode Generator turns text and product numbers into downloadable one-dimensional barcodes for labels, inventory, packaging drafts, and system tests. It validates EAN-13 and UPC-A check digits and can calculate the final digit from a 12-digit EAN or 11-digit UPC payload. Rendering happens locally in your browser with JsBarcode, so FunnyTools does not receive the values you enter.',
    seoTitle: 'Free Barcode Generator | Code 128, EAN-13, UPC-A and Code 39',
    seoDescription: 'Generate Code 128, EAN-13, UPC-A, and Code 39 barcodes with live preview, check digit validation, and PNG or SVG downloads.',
    keywords: ['barcode generator', 'Code 128 generator', 'EAN-13 generator', 'UPC-A barcode', 'Code 39 generator', 'barcode PNG', 'barcode SVG', 'check digit validator'],
    capabilities: [
      'Generate Code 128, EAN-13, UPC-A, and Code 39 barcodes from text or numbers.',
      'Calculate or validate EAN-13 and UPC-A check digits before enabling a download.',
      'Download a high-resolution PNG for documents or a scalable SVG for layout and print work.',
      'Keep the entered value in the current browser tab without uploading it to a server.',
    ],
    contentSections: [
      {
        heading: 'Choose the barcode format before designing the label',
        paragraphs: [
          'The short answer is to use Code 128 for flexible internal labels, EAN-13 or UPC-A when a retail channel requires those product-number standards, and Code 39 when an older industrial workflow specifically expects it. Barcode formats are not interchangeable merely because the same scanner can recognize several of them. A retailer, warehouse, shipping platform, or legacy database may accept only one symbology and one exact data length.',
          'This generator creates the barcode graphic; it does not issue a Global Trade Item Number, search an ownership database, or register a product. A number that passes a check-digit calculation is mathematically well formed, but that does not prove it belongs to your organization or is authorized for retail use. Confirm numbering requirements with GS1, your retailer, or the system receiving the scan before printing production packaging.',
        ],
      },
      {
        heading: 'Code 128 for inventory, orders, and internal identifiers',
        paragraphs: [
          'Code 128 is usually the best general-purpose choice for stock numbers, order IDs, package references, work orders, and asset labels. It can encode letters, digits, and many symbols while keeping reasonably high data density. If you need a scanner to type a short internal identifier and no external standard dictates the format, start with Code 128.',
          'Flexible does not mean unlimited. A longer value creates a wider barcode, and reducing that wide graphic to fit a small label can make individual bars too narrow for a camera or laser scanner. Store detailed descriptions in your database and encode a concise lookup key instead. Avoid placing personal data, full notes, or long tracking URLs directly in a one-dimensional barcode when a short reference will work.',
        ],
      },
      {
        heading: 'EAN-13 and UPC-A for retail product numbers',
        paragraphs: [
          'EAN-13 contains exactly 13 digits and is widely used on retail products around the world. UPC-A contains exactly 12 digits and is especially common in North American retail. The final digit in each format is a check digit calculated from the preceding digits with alternating weights. It helps catch common typing and scanning errors, but it does not carry product details by itself.',
          'Enter a 12-digit EAN payload or an 11-digit UPC payload and this tool appends the calculated check digit. If you enter all 13 EAN digits or all 12 UPC digits, the tool recalculates the final digit and displays an error when it does not match. When an error appears, verify the source product record instead of changing the last digit merely to make the value pass. The source data may contain a transposed or missing digit elsewhere.',
          'The name, price, company, and stock status shown after a retail scan come from the receiving point-of-sale or inventory database. They are not embedded in the bars. You therefore need both a correctly assigned identifier and a correct database record. Use the retailer or logistics provider’s certification procedure for final production artwork.',
        ],
      },
      {
        heading: 'Code 39 for simple legacy and industrial workflows',
        paragraphs: [
          'Code 39 is common in older industrial, automotive, defense, and asset-management systems. It supports uppercase letters, digits, spaces, and a small set of punctuation. Many older scanners can read it, and its rules are straightforward, but it uses more horizontal space than Code 128 for similar content. That makes it less suitable for long identifiers on small labels.',
          'The generator converts Code 39 letters to uppercase and rejects unsupported characters. Some organizations require an optional Mod 43 check character, a particular start-and-stop presentation, or strict dimensions. This page produces a standard Code 39 graphic without those organization-specific controls, so follow the receiving system’s documentation when a contract or operating procedure defines additional requirements.',
        ],
      },
      {
        heading: 'How to generate and download a barcode',
        paragraphs: [
          'Enter the text or number first, then choose the required format. The preview updates shortly after you stop typing. For EAN-13 and UPC-A, invalid lengths and incorrect check digits disable both download buttons and show a specific message. Read the human-readable line under the bars and compare it with the source record before exporting.',
          'Choose PNG for Word, PowerPoint, spreadsheets, quick mockups, and applications that expect a regular image. Choose SVG for vector layout software, label templates, and artwork that may need resizing. SVG remains sharp when scaled, but it can still become unscannable if you squeeze its width, distort its aspect ratio, cover the bars, or remove the quiet zones on the left and right.',
        ],
        items: [
          'Use Code 128 first when the value is an internal ID and no external specification applies.',
          'Supply 12 digits for EAN-13 or 11 digits for UPC-A when you want the tool to calculate the last digit.',
          'Treat a check-digit error as a reason to inspect the complete source value.',
          'Scan the final printed label with the actual equipment used in the real workflow.',
        ],
      },
      {
        heading: 'Printing limits and quality checks',
        paragraphs: [
          'A successful browser preview does not guarantee a successful printed scan. Readability depends on bar width, height, resolution, contrast, quiet zones, printer behavior, label material, lighting, curvature, and the scanner itself. A low-resolution screenshot, ink spread, thermal-printer damage, glossy reflections, patterned packaging, or a label wrapped around a narrow bottle can all reduce reliability.',
          'Use dark bars on a plain light background, keep the image proportions intact, and leave clear space around both ends. Do not place a logo, caption, border, or cutting mark over the bars. If a PNG must be enlarged substantially, regenerate or use SVG rather than stretching a small raster image. For production retail, logistics, medical, or regulated labels, use the mandated dimensions and verification equipment instead of relying on visual inspection alone.',
        ],
      },
      {
        heading: 'Privacy and responsible data handling',
        paragraphs: [
          'The value is passed to JsBarcode inside your browser and the PNG or SVG is created on your device. FunnyTools does not need a backend request for generation. This is useful for internal references and draft product numbers, but the downloaded file can still expose the encoded value to anyone who receives or scans it.',
          'Use a non-sensitive lookup identifier instead of encoding passwords, payment details, medical data, or unnecessary personal information. Store downloaded artwork according to your organization’s access and retention rules. Local generation protects the input from being uploaded by this page; it does not make the resulting label private once you print, email, or publish it.',
        ],
      },
    ],
    instructions: [
      'Enter a product number, stock code, order ID, asset ID, or other short value.',
      'Choose Code 128, EAN-13, UPC-A, or Code 39 and review the live preview.',
      'For EAN-13 or UPC-A, resolve any length or check-digit message before downloading.',
      'Download PNG or SVG, preserve the aspect ratio and quiet zones, then scan-test the final printed size.',
    ],
    examples: [
      'Create a Code 128 SVG for warehouse stock labels.',
      'Enter a 12-digit payload and calculate the thirteenth EAN-13 digit for a packaging draft.',
      'Validate a complete 12-digit UPC-A value before adding it to a North American label mockup.',
      'Generate uppercase Code 39 asset IDs for a scanner used by a legacy system.',
    ],
    audience: [
      'Warehouse and office teams creating short inventory, order, work-order, or asset labels.',
      'Packaging teams checking EAN-13 or UPC-A length and check digits during artwork preparation.',
      'Designers and developers who need barcode PNG or SVG assets for documents, templates, and test data.',
      'Operations teams comparing Code 128 and Code 39 with existing scanners and legacy software.',
    ],
    caseStudies: [
      { title: 'Warehouse label template', description: 'A small warehouse converts its existing item IDs to Code 128 SVG, places each graphic in a fixed label template, and tests samples with the same handheld scanners used during picking.' },
      { title: 'Packaging proof correction', description: 'A designer enters a full EAN-13 number and receives a check-digit error. The product team corrects the master record before the SVG reaches the print proof, preventing an avoidable packaging revision.' },
      { title: 'Legacy scanner compatibility', description: 'A factory creates short uppercase Code 39 asset IDs because its established scanner profile requires that format, then confirms allowed characters and physical label width before batch printing.' },
    ],
    notes: [
      'This tool does not issue, register, or look up GS1 identifiers; a valid check digit only confirms the numeric structure.',
      'Barcode rendering is local, but you remain responsible for protecting the downloaded image and the value it reveals.',
      'Retail, logistics, healthcare, and regulated workflows may impose exact size, quiet-zone, magnification, and print-quality rules.',
    ],
    faq: [
      { q: 'How are EAN-13 and UPC-A check digits handled?', a: 'Enter 12 EAN digits or 11 UPC digits and the tool calculates the final digit. Enter a complete 13- or 12-digit number and it validates the existing final digit, showing the expected digit when there is a mismatch.' },
      { q: 'Does a valid check digit mean I can use the product number?', a: 'No. It only confirms the arithmetic structure. It does not establish GS1 registration, company ownership, retailer acceptance, or a correct product database record.' },
      { q: 'Should I download PNG or SVG?', a: 'PNG works well in documents and quick mockups. SVG is preferable for scalable layout and print work, provided you preserve its proportions and quiet zones.' },
      { q: 'Why does a printed barcode fail when the preview looks correct?', a: 'Common causes include a label that is too small, cropped quiet zones, distorted proportions, low contrast, ink spread, reflective material, curved packaging, or incompatible scanner settings.' },
      { q: 'Is my barcode value uploaded?', a: 'No. JsBarcode renders the graphic in your browser. FunnyTools does not receive or store the text or product number you enter.' },
    ],
    labels: {
      localNote: 'The barcode is generated locally in your browser; your value is never uploaded.',
      inputLabel: 'Text or number', placeholder: 'Example: ITEM-2026-001', formatLabel: 'Barcode format',
      hintCode128: 'Code 128 suits order IDs, inventory codes, and internal labels with letters, numbers, or symbols.',
      hintEan13: 'Enter a 12-digit EAN payload or a complete 13-digit EAN including its check digit.',
      hintUpc: 'Enter an 11-digit UPC payload or a complete 12-digit UPC including its check digit.',
      hintCode39: 'Code 39 supports uppercase letters, digits, spaces, and . $ / + % -.',
      downloadPng: 'Download PNG', downloadSvg: 'Download SVG', reset: 'Reset', previewAlt: 'Barcode preview',
      emptyError: 'Enter a value to generate a barcode.',
      eanLengthError: 'EAN-13 requires a 12-digit payload or a complete 13-digit number.',
      upcLengthError: 'UPC-A requires an 11-digit payload or a complete 12-digit number.',
      checksumError: 'The check digit is incorrect. The expected final digit is {digit}.',
      code39Error: 'Code 39 supports letters, digits, spaces, and . $ / + % - only.',
      renderError: 'Could not generate this barcode. Shorten the value or try another format.',
    },
    privacyNote: 'JsBarcode generates the barcode locally in your browser. The text, product number, and output graphic are not uploaded to this site or a third-party server.',
  },
} satisfies Record<'zh' | 'en', ToolContent>;
