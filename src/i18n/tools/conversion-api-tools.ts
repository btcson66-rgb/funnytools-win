import type { LocalizedToolContent, ToolContent } from './_types';

const privacy = {
  zh: '檔案只為轉換而上傳，於請求期間暫時處理，完成後不會刻意保留。請勿上傳不必要的個人或機密資料。',
  en: 'Files are uploaded only for conversion, processed temporarily, and not intentionally retained after the request completes. Do not upload unnecessary personal or confidential data.',
};

const sourceNote = {
  zh: '這些工具使用 FunnyTools Conversion API；瀏覽器會把你選取的檔案送到 API 進行處理。',
  en: 'These tools use the FunnyTools Conversion API; the files you choose are sent to the API for processing.',
};

const makeLocalized = (zh: ToolContent, en: ToolContent): LocalizedToolContent => ({ zh, en });

export const bulkImageCompressorContent = makeLocalized(
  {
    name: '批次圖片壓縮器',
    short: '一次上傳多張圖片，調整品質與尺寸後下載 ZIP。',
    long: '批次圖片壓縮器適合整理網站上傳、郵件附件、簡報與商品圖片。你可以一次選取 1 至 100 張圖片，設定品質、最大寬高與輸出格式，處理後以 ZIP 下載並保留每個檔案的結果。',
    seoTitle: '批次圖片壓縮器｜一次壓縮多張 JPG、PNG、WebP',
    seoDescription: '一次上傳 1 至 100 張圖片，調整品質、最大尺寸與輸出格式，下載批次壓縮 ZIP。',
    keywords: ['批次圖片壓縮', '大量圖片壓縮', '圖片壓縮 ZIP'],
    capabilities: ['支援 1 至 100 張圖片', '可設定品質、最大寬度與最大高度', '提供自動、JPEG、PNG、WebP 輸出選項', '每個檔案完成後打包成 ZIP'],
    instructions: ['選取或拖曳 1 至 100 張圖片。', '調整品質、最大寬高與輸出格式。', '開始處理，檢查檔案清單後下載 ZIP。'],
    examples: ['整理網站或表單要求的圖片大小。', '批次準備簡報、商品頁或社群圖片。', '將多張手機照片縮小後集中下載。'],
    audience: ['網站內容編輯與電商工作者', '需要處理圖片附件的行政人員', '製作簡報或社群素材的創作者'],
    faq: [
      { q: '一次最多可以處理幾張？', a: '一次最多 100 張，總批次大小預設上限為 120 MB；實際速度也會受到檔案尺寸與 API 主機資源影響。' },
      { q: '壓縮後一定會變小嗎？', a: '不一定。輸出格式、原始壓縮方式、品質與尺寸都會影響結果；請下載後檢查容量與畫質。' },
      { q: '檔案會留在伺服器嗎？', a: privacy.zh },
    ],
    labels: {
      serverNote: sourceNote.zh, upload: '選擇圖片（可多選）', invalidFiles: '只會處理圖片檔案。', invalidPages: '頁碼請輸入正整數或遞增範圍，例如 1,3-5。', quality: '品質', maxWidth: '最大寬度（可留白）', maxHeight: '最大高度（可留白）', outputFormat: '輸出格式', auto: '自動', jpeg: 'JPEG', png: 'PNG', webp: 'WebP', compress: '開始壓縮', cancel: '取消等待', download: '下載 ZIP', clear: '清除', waiting: '尚未選取檔案', processing: '正在處理…', ready: '已完成，請檢查清單後下載。', noFile: '請先選取至少一張圖片。', failed: '圖片壓縮失敗。', cancelNote: '取消會停止瀏覽器等待；已開始的伺服器處理不保證立即停止。', selected: '已選取 {count} 個檔案',
    },
    privacyNote: privacy.zh,
    contentSections: [
      { heading: '轉換方式與限制', paragraphs: [sourceNote.zh, '輸出會依你設定的品質與尺寸重編碼，原始檔案不會被覆寫。若圖片包含個人資料、內部文件或未公開商品資訊，請先確認你的資料處理政策。'] },
      { heading: '品質、尺寸與格式怎麼選', paragraphs: ['品質數值越高通常越接近原圖，但檔案也可能較大；若是照片，可先從中等品質開始，再對照文字邊緣、細線、臉部與透明區域。最大寬度和最大高度是限制輸出尺寸，不會把圖片放大超過原始尺寸。', 'Auto 會依來源格式選擇輸出；JPEG 適合照片但不保留透明背景，PNG 適合介面截圖與需要清楚文字的圖片，WebP 通常能在支援的平台取得較小檔案。不同平台的格式限制仍要以實際上傳欄位為準。'] },
      { heading: '下載前檢查清單', paragraphs: ['批次完成後先看每個檔名、輸出格式、寬高與大小變化，再下載 ZIP。壓縮不一定讓每張圖片都變小，因為來源可能已經高度壓縮；若輸出變大或細節損失明顯，請提高品質、保留原格式或改用本機工具處理。', 'ZIP 是方便集中下載的包裝，不代表每個檔案內容都適合直接公開。下載後請在實際網站、簡報或表單中打開幾個代表檔案，確認方向、色彩、透明背景與檔名都符合用途。'] },
    ],
  },
  {
    name: 'Bulk Image Compressor',
    short: 'Compress multiple images with quality and size controls, then download one ZIP.',
    long: 'Bulk Image Compressor helps prepare website uploads, email attachments, slide decks, and product images. Select 1 to 100 images, set quality, maximum dimensions, and output format, then review the per-file result list before downloading a ZIP.',
    seoTitle: 'Bulk Image Compressor | Compress JPG, PNG, and WebP Files',
    seoDescription: 'Upload 1 to 100 images, control quality, maximum dimensions, and output format, then download a compressed ZIP.',
    keywords: ['bulk image compressor', 'compress multiple images', 'image compression ZIP'],
    capabilities: ['Process 1 to 100 images per batch', 'Set quality, maximum width, and maximum height', 'Choose auto, JPEG, PNG, or WebP output', 'Download every result in one ZIP archive'],
    instructions: ['Choose or drag in 1 to 100 images.', 'Set quality, maximum dimensions, and output format.', 'Start processing, review the file list, and download the ZIP.'],
    examples: ['Prepare images for a website or form upload.', 'Create smaller slide, product, or social-media assets.', 'Reduce a phone-photo batch before sharing it.'],
    audience: ['Website editors and ecommerce operators', 'Office workers preparing image attachments', 'Creators preparing slide or social assets'],
    faq: [
      { q: 'How many images can I process?', a: 'Up to 100 images per batch, with a default total batch limit of 120 MB. Speed also depends on image dimensions and API resources.' },
      { q: 'Will every output be smaller?', a: 'Not necessarily. The result depends on the source encoding, output format, quality, and dimensions. Inspect both size and visual quality.' },
      { q: 'Are my files retained?', a: privacy.en },
    ],
    labels: {
      serverNote: sourceNote.en, upload: 'Choose images (multiple)', invalidFiles: 'Only image files will be processed.', invalidPages: 'Use positive page numbers or ascending ranges, for example 1,3-5.', quality: 'Quality', maxWidth: 'Maximum width (optional)', maxHeight: 'Maximum height (optional)', outputFormat: 'Output format', auto: 'Auto', jpeg: 'JPEG', png: 'PNG', webp: 'WebP', compress: 'Compress images', cancel: 'Cancel waiting', download: 'Download ZIP', clear: 'Clear', waiting: 'No files selected', processing: 'Processing…', ready: 'Finished. Review the list before downloading.', noFile: 'Choose at least one image.', failed: 'Image compression failed.', cancelNote: 'Cancel stops the browser from waiting; it does not guarantee that server CPU work already started stops immediately.', selected: '{count} files selected',
    },
    privacyNote: privacy.en,
    contentSections: [
      { heading: 'Processing and limits', paragraphs: [sourceNote.en, 'Outputs are re-encoded according to your quality and dimension settings; originals are not overwritten. Check your organization policy before uploading personal, internal, or unpublished product material.'] },
      { heading: 'Choosing quality, dimensions, and format', paragraphs: ['A higher quality setting usually keeps more detail but may produce a larger file. For photos, start with a moderate value and compare text edges, fine lines, faces, and transparent areas. Maximum width and height limit the output dimensions; they do not enlarge an image beyond its source size.', 'Auto follows the source format. JPEG is useful for photos but does not preserve transparency; PNG is useful for interface screenshots and crisp text; WebP can be smaller on platforms that support it. Always confirm the format accepted by the destination upload field.'] },
      { heading: 'Review before downloading', paragraphs: ['After processing, review each filename, output format, dimensions, and size change before downloading the ZIP. Compression does not guarantee that every output is smaller, especially when a source image was already compressed. If a result grows or loses important detail, raise quality, keep the source format, or use a local tool instead.', 'The ZIP is only a convenient download container. Open representative files after downloading and check orientation, color, transparency, filenames, and appearance in the real website, slide deck, or form where they will be used. Keep the original batch until the resized copies have been accepted by the destination service. Confirm the final files also open correctly on the target device.'] },
    ],
  },
);

export const pdfToWordContent = makeLocalized(
  {
    name: 'PDF 轉可編輯 Word',
    short: '將原生文字或掃描 PDF 轉成可編輯的 DOCX。',
    long: 'PDF 轉可編輯 Word 會讀取 PDF 原生文字，必要時以 OCR 處理掃描頁面，並輸出 DOCX。結果可編輯，但不宣稱 100% 保留原始版面；複雜欄位、表格、字型與掃描品質都可能造成差異。',
    seoTitle: 'PDF 轉可編輯 Word｜DOCX 與 OCR 轉換工具',
    seoDescription: '將原生文字或掃描 PDF 轉成可編輯 DOCX，可選 OCR 模式、語言與是否包含圖片。',
    keywords: ['PDF 轉 Word', 'PDF DOCX', '掃描 PDF OCR Word'],
    capabilities: ['支援原生 PDF 文字擷取', '掃描頁面可選自動或強制 OCR', '可選英文、繁體中文 OCR 語言', '可選擇是否把頁面圖片放入 DOCX'],
    instructions: ['選取一份 PDF。', '選擇 OCR 模式、語言與是否包含圖片。', '開始轉換，下載 DOCX 並人工檢查內容與版面。'],
    examples: ['把掃描收據或表單轉成可校訂草稿。', '從文字型 PDF 建立可編輯文件副本。', '將課程講義轉成可再整理的 Word 檔。'],
    audience: ['需要校訂文件的行政人員', '整理掃描資料的研究與教學工作者', '需要保留文字可編輯性的內容編輯'],
    faq: [
      { q: '會 100% 保留原始 PDF 版面嗎？', a: '不會保證。輸出重點是可編輯文字；欄位、表格、字型、圖片位置與掃描品質可能讓版面和原檔不同。' },
      { q: '什麼時候該使用 OCR？', a: '沒有可擷取文字的掃描 PDF 可使用 auto 或 force；原生文字 PDF 可先使用 off 以避免不必要的 OCR。' },
      { q: '檔案會留在伺服器嗎？', a: privacy.zh },
    ],
    labels: {
      serverNote: sourceNote.zh, upload: '選擇 PDF', ocrMode: 'OCR 模式', auto: '自動', off: '關閉', force: '強制', ocrLang: 'OCR 語言', english: '英文', traditionalChinese: '繁體中文', includeImages: '在 DOCX 中包含頁面圖片', convert: '轉換成 DOCX', cancel: '取消等待', download: '下載 DOCX', waiting: '尚未選取 PDF', processing: '正在轉換…', ready: '轉換完成，請檢查可編輯文字與版面。', noFile: '請先選取 PDF。', failed: 'PDF 轉 Word 失敗。', cancelNote: '取消會停止瀏覽器等待；已開始的伺服器處理不保證立即停止。',
    },
    privacyNote: privacy.zh,
    contentSections: [
      { heading: '可編輯文字與版面限制', paragraphs: ['輸出目標是可編輯文字，不是版面像素級複製。OCR 會受到解析度、字型、傾斜與雜訊影響，下載後請逐頁校對重要內容。', sourceNote.zh] },
      { heading: 'OCR 模式怎麼選', paragraphs: ['Auto 會先嘗試使用 PDF 內的文字層，沒有足夠文字時再處理 OCR，適合來源不確定的文件。Off 適合文字層完整、希望避免 OCR 誤辨的原生 PDF；Force 則適合你明確知道要重新辨識頁面內容的掃描文件。英文與繁體中文語言設定會影響字元辨識，混合語言文件仍可能需要人工校正。', '掃描品質比按鈕選項更重要。清楚、正向、解析度足夠的頁面通常較容易辨識；陰影、歪斜、手寫字、低對比背景與複雜欄位都可能造成漏字或錯字。若文件很重要，請保留原始 PDF，把 DOCX 當作編輯草稿。'] },
      { heading: '下載後的實務檢查', paragraphs: ['轉換完成後，先確認頁數與段落順序，再抽查標題、日期、金額、姓名、網址與表格。包含圖片選項可協助保留頁面視覺參考，但圖片不是可編輯文字，且可能讓 DOCX 檔案變大。複雜版面可能需要在 Word 中重新調整欄位、分頁、字型與圖片位置。', '這項工具適合建立可搜尋、可校訂的工作副本，不適合把輸出直接當作法律、財務、醫療或正式出版文件。涉及重要內容時，請由熟悉原文件的人逐頁比對並保留修訂紀錄。'] },
    ],
  },
  {
    name: 'PDF to Editable Word',
    short: 'Convert native-text or scanned PDFs into an editable DOCX.',
    long: 'PDF to Editable Word extracts native PDF text and can use OCR for scanned pages, then creates a DOCX file. The result is editable, but it does not promise 100% layout fidelity; columns, tables, fonts, and scan quality can change the output.',
    seoTitle: 'PDF to Editable Word | DOCX and OCR Converter',
    seoDescription: 'Convert native-text or scanned PDFs to editable DOCX with OCR mode, language, and image options.',
    keywords: ['PDF to Word', 'PDF DOCX converter', 'scanned PDF OCR Word'],
    capabilities: ['Extract native PDF text', 'Choose automatic, forced, or disabled OCR', 'Choose English or Traditional Chinese OCR', 'Choose whether to include page images in the DOCX'],
    instructions: ['Choose one PDF.', 'Select OCR mode, language, and whether to include images.', 'Convert, download the DOCX, and review text and layout manually.'],
    examples: ['Turn scanned receipts or forms into editable drafts.', 'Create an editable copy of a text-based PDF.', 'Prepare a class handout for further editing in Word.'],
    audience: ['Office workers revising documents', 'Researchers and teachers organizing scans', 'Editors who need text to remain editable'],
    faq: [
      { q: 'Does it preserve the original layout 100%?', a: 'No guarantee is made. The goal is editable text; columns, tables, fonts, image positions, and scan quality can change the document.' },
      { q: 'When should I use OCR?', a: 'Use auto or force for scanned PDFs without a usable text layer. For native-text PDFs, off can avoid unnecessary OCR.' },
      { q: 'Are my files retained?', a: privacy.en },
    ],
    labels: {
      serverNote: sourceNote.en, upload: 'Choose PDF', ocrMode: 'OCR mode', auto: 'Auto', off: 'Off', force: 'Force', ocrLang: 'OCR language', english: 'English', traditionalChinese: 'Traditional Chinese', includeImages: 'Include page images in DOCX', convert: 'Convert to DOCX', cancel: 'Cancel waiting', download: 'Download DOCX', waiting: 'No PDF selected', processing: 'Converting…', ready: 'Conversion finished. Review editable text and layout.', noFile: 'Choose a PDF first.', failed: 'PDF to Word conversion failed.', cancelNote: 'Cancel stops the browser from waiting; it does not guarantee that server CPU work already started stops immediately.',
    },
    privacyNote: privacy.en,
    contentSections: [
      { heading: 'Editable text and layout limits', paragraphs: ['The output targets editable text rather than pixel-perfect layout reproduction. OCR quality depends on resolution, fonts, skew, and noise; proofread important content page by page after downloading.', sourceNote.en] },
      { heading: 'Choosing an OCR mode', paragraphs: ['Auto first tries the PDF text layer and uses OCR when there is not enough usable text, making it a practical choice for mixed source files. Off suits a native-text PDF when you want to avoid unnecessary recognition errors. Force is useful when you deliberately want to recognize the page image of a scanned document. English and Traditional Chinese language choices affect recognition, while mixed-language pages may still need manual correction.', 'Source quality matters more than the button choice. Clear, upright, sufficiently high-resolution pages are easier to recognize; shadows, skew, handwriting, low contrast, and complex form fields can cause missing or incorrect text. Keep the original PDF and treat the DOCX as an editable working copy.'] },
      { heading: 'Practical review after download', paragraphs: ['When conversion finishes, confirm page count and paragraph order, then sample headings, dates, amounts, names, URLs, and tables. Including page images can preserve a visual reference, but images are not editable text and may increase the DOCX size. Complex layouts may require manual work in Word to restore columns, page breaks, fonts, and image positions.', 'This tool is intended to create a searchable, revisable working copy. Do not treat its output as a final legal, financial, medical, or published document without review. For important material, have someone familiar with the source compare every page and keep a revision record.'] },
    ],
  },
);

export const pdfTableToExcelContent = makeLocalized(
  {
    name: 'PDF 表格轉 Excel',
    short: '先預覽並編輯擷取的表格，再匯出 Excel。',
    long: 'PDF 表格轉 Excel 會依序完成上傳、table preview、可編輯表格格線與 export tables。你可以修改儲存格、刪除列、刪除欄或刪除整張表，再下載 XLSX；掃描表格會使用 OCR 座標推測欄位，因此一定要檢查預覽。',
    seoTitle: 'PDF 表格轉 Excel｜預覽、編輯後匯出 XLSX',
    seoDescription: '上傳 PDF 後先預覽表格，編輯儲存格、刪除列欄或表格，再匯出 Excel。',
    keywords: ['PDF 表格轉 Excel', 'PDF XLSX', '掃描表格 OCR Excel'],
    capabilities: ['先預覽偵測到的表格', '編輯每個儲存格內容', '刪除列、欄與整張表', '選擇頁碼並匯出 XLSX'],
    instructions: ['選取 PDF 並選擇頁碼、OCR 模式與語言。', '按預覽後檢查並編輯表格格線。', '確認資料後匯出 Excel。'],
    examples: ['把報表中的表格整理到試算表。', '先刪除不需要的 OCR 列欄再匯出。', '校對掃描發票或名單的欄位。'],
    audience: ['需要整理 PDF 報表的行政人員', '處理研究或課堂資料的工作者', '需要把表格交給 Excel 後續分析的人'],
    faq: [
      { q: '為什麼一定要先預覽？', a: 'PDF 表格可能有合併欄、斷行與 OCR 誤辨；預覽與編輯步驟讓你在匯出前修正資料。' },
      { q: '可以選擇特定頁面嗎？', a: '可以，在頁碼欄輸入以逗號分隔的 1-based 頁碼；留白則處理文件中的可用頁面。' },
      { q: '檔案會留在伺服器嗎？', a: privacy.zh },
    ],
    labels: {
      serverNote: sourceNote.zh, upload: '選擇 PDF', pages: '頁碼（可留白）', pagesPlaceholder: '例如 1,3,4', invalidPages: '頁碼請輸入正整數或遞增範圍，例如 1,3-5。', ocrMode: 'OCR 模式', auto: '自動', off: '關閉', force: '強制', ocrLang: 'OCR 語言', english: '英文', traditionalChinese: '繁體中文', preview: '預覽表格', export: '匯出編輯後的 Excel', cancel: '取消等待', waiting: '先上傳 PDF，再產生預覽。', processing: '正在偵測表格…', ready: '請檢查並編輯表格後再匯出。', noFile: '請先選取 PDF。', failed: 'PDF 表格處理失敗。', noTables: '沒有偵測到可編輯表格。', table: '表格 {number}', deleteTable: '刪除表格', deleteRow: '刪除列', deleteColumn: '刪除欄', columnNumber: '欄號', apply: '套用', cancelNote: '取消會停止瀏覽器等待；已開始的伺服器處理不保證立即停止。',
    },
    privacyNote: privacy.zh,
    contentSections: [
      { heading: '為什麼保留 preview/edit 步驟', paragraphs: ['PDF 表格不一定有真正的表格語意。原生文字、線條、合併儲存格與掃描 OCR 都可能讓欄位推斷出現差異，因此匯出前請用可編輯格線核對標題、數字與列欄。', sourceNote.zh] },
      { heading: '偵測方法與頁碼選擇', paragraphs: ['有文字層的 PDF 會優先嘗試直接擷取表格；若版面沒有明確表格線，服務可能使用文字座標推測欄位。掃描文件則可使用 Auto 或 Force OCR，並選擇英文或繁體中文。頁碼以 1 開始，輸入 1,3,4 可以只處理指定頁，留白則掃描文件中的可用頁面。', '表格越複雜，預覽越重要。合併欄、跨頁表格、欄位換行、頁首頁尾與掃描歪斜都可能讓資料落到相鄰欄位。若只需要一部分資料，先選頁碼可以降低誤抓與等待時間，也比較容易逐項核對。'] },
      { heading: '編輯與匯出檢查', paragraphs: ['預覽後可以修改儲存格、刪除整列、刪除整欄或移除整張表。刪除前請確認不是因為欄位空白而誤判；對發票、名單、金額與日期等重要欄位，建議逐列對照原始 PDF。匯出的 XLSX 是整理後的資料工作簿，不會替你推斷缺失值或驗證數字的真實性。', '完成後打開 Excel 或相容試算表軟體，檢查工作表名稱、欄寬、表頭、數字格式與編碼。若 OCR 結果不穩定，保留原始 PDF 與修訂後的工作簿，並在後續分析前建立自己的資料校驗規則。'] },
    ],
  },
  {
    name: 'PDF Table to Excel',
    short: 'Preview and edit detected tables before exporting an Excel workbook.',
    long: 'PDF Table to Excel follows upload, table preview, editable grid, and export tables in that order. Edit cells, delete rows, delete columns, or delete an entire table before downloading XLSX. Scanned tables use OCR coordinates to infer columns, so the preview must be checked.',
    seoTitle: 'PDF Table to Excel | Preview, Edit, and Export XLSX',
    seoDescription: 'Preview tables from a PDF, edit cells, remove rows or columns, and export a checked Excel workbook.',
    keywords: ['PDF table to Excel', 'PDF XLSX converter', 'scanned table OCR Excel'],
    capabilities: ['Preview detected tables first', 'Edit every cell in the grid', 'Delete rows, columns, or complete tables', 'Select pages and export XLSX'],
    instructions: ['Choose a PDF and optional pages, OCR mode, and language.', 'Preview the detected tables and inspect the editable grid.', 'Confirm the data and export the Excel workbook.'],
    examples: ['Move a report table into a spreadsheet.', 'Remove unwanted OCR rows or columns before export.', 'Review scanned invoice or roster fields.'],
    audience: ['Office workers organizing PDF reports', 'Researchers and teachers handling tabular data', 'People who need a checked table for Excel analysis'],
    faq: [
      { q: 'Why is preview required?', a: 'PDFs can contain merged cells, line breaks, and OCR errors. Preview and editing let you correct the table before export.' },
      { q: 'Can I choose specific pages?', a: 'Yes. Enter comma-separated 1-based page numbers; leave the field empty to use available pages in the document.' },
      { q: 'Are my files retained?', a: privacy.en },
    ],
    labels: {
      serverNote: sourceNote.en, upload: 'Choose PDF', pages: 'Pages (optional)', pagesPlaceholder: 'For example 1,3,4', invalidPages: 'Use positive page numbers or ascending ranges, for example 1,3-5.', ocrMode: 'OCR mode', auto: 'Auto', off: 'Off', force: 'Force', ocrLang: 'OCR language', english: 'English', traditionalChinese: 'Traditional Chinese', preview: 'Preview tables', export: 'Export edited Excel', cancel: 'Cancel waiting', waiting: 'Upload a PDF to create a preview.', processing: 'Detecting tables…', ready: 'Review and edit the tables before exporting.', noFile: 'Choose a PDF first.', failed: 'PDF table processing failed.', noTables: 'No editable tables were detected.', table: 'Table {number}', deleteTable: 'Delete table', deleteRow: 'Delete row', deleteColumn: 'Delete column', columnNumber: 'Column number', apply: 'Apply', cancelNote: 'Cancel stops the browser from waiting; it does not guarantee that server CPU work already started stops immediately.',
    },
    privacyNote: privacy.en,
    contentSections: [
      { heading: 'Why preview and edit are required', paragraphs: ['A PDF does not always contain table semantics. Native text, lines, merged cells, and OCR can all change column inference, so verify headings, numbers, and rows in the editable grid before export.', sourceNote.en] },
      { heading: 'Detection methods and page selection', paragraphs: ['A PDF with a usable text layer is first checked for extractable tables. When visible table borders are absent, text coordinates may be used to infer columns. Scanned documents can use Auto or Force OCR with English or Traditional Chinese. Page numbers start at 1; enter 1,3,4 to process selected pages, or leave the field empty to scan available pages.', 'Complex tables make the preview step especially important. Merged columns, tables that continue across pages, wrapped cells, headers and footers, and skewed scans can move a value into a neighboring column. Selecting only the needed pages can reduce noise and processing time and makes a row-by-row check easier.'] },
      { heading: 'Editing and export checks', paragraphs: ['After preview, edit cells, delete complete rows or columns, or remove an entire table. Before deleting, confirm that a blank-looking cell is not an extraction artifact. For invoices, rosters, amounts, and dates, compare important fields against the original PDF. The XLSX is a cleaned working workbook; it does not infer missing values or prove that extracted numbers are correct.', 'Open the exported workbook in Excel or a compatible spreadsheet and check sheet names, widths, headers, number formatting, and encoding. If OCR is uncertain, retain both the source PDF and edited workbook, and apply your own validation rules before analysis or reporting.'] },
    ],
  },
);

export const imageToDxfContent = makeLocalized(
  {
    name: '圖片轉 DXF',
    short: '將 JPG、PNG 線稿向量化成 DXF polyline，並可校正比例。',
    long: '圖片轉 DXF 會從點陣圖片擷取輪廓，產生適合後續檢查與編輯的 DXF LWPOLYLINE。你可以調整 threshold、反相、模糊、簡化與最小面積，也可以在預覽上點兩點做距離校正。輸出不是製造或工程驗證結果。',
    seoTitle: '圖片轉 DXF｜JPG、PNG 線稿向量化與比例校正',
    seoDescription: '把圖片線稿轉成 DXF polyline，調整 threshold、簡化、最小面積與 CAD 單位，支援兩點比例校正。',
    keywords: ['圖片轉 DXF', 'JPG DXF', 'PNG DXF', '線稿向量化'],
    capabilities: ['預覽原始圖片與校正點', '調整 threshold、反相、模糊與簡化比例', '設定最小輪廓面積與 CAD 單位', '用兩點距離校正輸出比例'],
    instructions: ['上傳清楚的 JPG 或 PNG 線稿。', '調整影像參數，必要時在預覽上點選兩點並輸入實際距離。', '下載 DXF，並在 CAD 軟體中檢查輪廓、單位與比例。'],
    examples: ['把簡單標誌或黑白線稿轉成 CAD 輪廓。', '將手繪輪廓轉成可再編輯的 polyline 草稿。', '為雷切或繪圖前置作業建立向量參考。'],
    audience: ['需要簡單向量輪廓的設計工作者', 'CAD 初步整理與草稿使用者', '需要把圖像輪廓交給後續 CAD 流程的人'],
    faq: [
      { q: 'DXF 會自動變成可製造的工程圖嗎？', a: '不會。輸出是從圖片輪廓推估的 LWPOLYLINE，仍需在 CAD 軟體檢查閉合、雜訊、尺寸、單位與製造要求。' },
      { q: '兩點校正怎麼用？', a: '在預覽圖上依序點兩個已知位置，工具會用兩點的 pixel distance 搭配你輸入的實際距離估算比例。' },
      { q: '檔案會留在伺服器嗎？', a: privacy.zh },
    ],
    labels: {
      serverNote: sourceNote.zh, upload: '選擇 JPG 或 PNG', originalPreview: '原始預覽（依序點兩點校正）', waiting: '尚未選取圖片', threshold: 'Threshold', invert: '反相', blur: '模糊', simplify: '簡化比例', minArea: '最小面積', units: 'CAD 單位', unitless: '無單位', inch: '英吋', mm: '毫米', cm: '公分', m: '公尺', pixelDistance: '兩點像素距離', realDistance: '實際距離', realDistancePlaceholder: '例如 100', pointsHint: '在圖片上依序點兩個點；重新點第三次會重設。', convert: '產生 DXF', cancel: '取消等待', download: '下載 DXF', processing: '正在向量化…', ready: 'DXF 已完成，請在 CAD 軟體中檢查。', noFile: '請先選取圖片。', failed: '圖片轉 DXF 失敗。', cancelNote: '取消會停止瀏覽器等待；已開始的伺服器處理不保證立即停止。',
    },
    privacyNote: privacy.zh,
    disclaimer: 'DXF 是由圖片輪廓推估的參考輸出，不是工程、製造、安全或尺寸驗證。重要圖面請由合格人員使用專業 CAD 軟體檢查。',
    contentSections: [
      { heading: '向量化與比例限制', paragraphs: ['threshold、模糊與簡化會改變輪廓；反相適合前景與背景明暗關係相反的圖片。兩點校正只建立幾何比例，不會修正透視、鏡頭變形或原始圖片誤差。', sourceNote.zh] },
      { heading: '準備圖片與調整參數', paragraphs: ['黑白、對比清楚、背景單純的線稿通常比照片更適合輪廓擷取。Threshold 決定前景與背景的分界，反相可處理明暗方向相反的圖片；模糊可以降低小雜訊，但太高會吃掉細節。簡化比例越積極，輸出的節點可能越少，曲線也可能更粗略。', '最小面積可排除小斑點與掃描雜訊，但過大的值可能移除本來重要的細輪廓。建議先用預設值產生結果，再在 CAD 軟體檢查是否有斷線、重疊、未閉合或多餘輪廓，依實際用途調整，而不是只追求檔案最小。'] },
      { heading: '比例校正與後續 CAD 工作', paragraphs: ['兩點校正適合圖片中有已知距離的直線或標記：依序點兩個位置，確認 pixel distance，再輸入實際距離與單位。它只會估算整體縮放，不會修正拍攝角度、透視、鏡頭畸變、紙張彎曲或原圖比例錯誤。沒有可靠基準時，保留無單位輸出比填入猜測尺寸更安全。', 'DXF 下載後仍要在你的 CAD 軟體中檢查圖層、單位、座標方向、輪廓閉合、尺寸與製程容許度。若要雷切、加工、施工或送審，請使用原始尺寸資料和合格人員覆核，不能只依圖片轉換結果決定。'] },
    ],
  },
  {
    name: 'Image to DXF',
    short: 'Vectorize JPG or PNG line art into DXF polylines with optional scale calibration.',
    long: 'Image to DXF extracts contours from a raster image and creates DXF LWPOLYLINE geometry for later review and editing. Adjust threshold, inversion, blur, simplification, and minimum area, or click two points in the preview to calibrate a known real distance. The output is not a manufacturing or engineering verification.',
    seoTitle: 'Image to DXF | JPG and PNG Line-Art Vectorizer',
    seoDescription: 'Convert image line art to DXF polylines with threshold, simplification, CAD units, and two-point scale calibration.',
    keywords: ['image to DXF', 'JPG to DXF', 'PNG to DXF', 'line art vectorizer'],
    capabilities: ['Preview the source image and calibration points', 'Adjust threshold, inversion, blur, and simplification', 'Set minimum contour area and CAD units', 'Calibrate scale from two points and a known distance'],
    instructions: ['Upload a clear JPG or PNG line drawing.', 'Adjust image settings and, if needed, click two points and enter their real distance.', 'Download the DXF and inspect contours, units, and scale in CAD software.'],
    examples: ['Turn a simple logo or black-and-white drawing into CAD contours.', 'Create an editable polyline draft from a hand-drawn outline.', 'Prepare a vector reference for laser-cutting or plotting workflows.'],
    audience: ['Designers who need simple vector contours', 'CAD users preparing an initial draft', 'People handing image outlines into a later CAD workflow'],
    faq: [
      { q: 'Does the DXF become a manufacturable engineering drawing?', a: 'No. It is a contour estimate from an image. Check closure, noise, dimensions, units, and manufacturing requirements in CAD.' },
      { q: 'How does two-point calibration work?', a: 'Click two known locations in order. The tool uses their pixel distance and your real distance to estimate the output scale.' },
      { q: 'Are my files retained?', a: privacy.en },
    ],
    labels: {
      serverNote: sourceNote.en, upload: 'Choose JPG or PNG', originalPreview: 'Source preview (click two points to calibrate)', waiting: 'No image selected', threshold: 'Threshold', invert: 'Invert', blur: 'Blur', simplify: 'Simplification ratio', minArea: 'Minimum area', units: 'CAD units', unitless: 'Unitless', inch: 'Inch', mm: 'Millimeter', cm: 'Centimeter', m: 'Meter', pixelDistance: 'Pixel distance', realDistance: 'Real distance', realDistancePlaceholder: 'For example 100', pointsHint: 'Click two points in order; a third click resets the pair.', convert: 'Create DXF', cancel: 'Cancel waiting', download: 'Download DXF', processing: 'Vectorizing…', ready: 'DXF is ready. Inspect it in CAD software.', noFile: 'Choose an image first.', failed: 'Image to DXF failed.', cancelNote: 'Cancel stops the browser from waiting; it does not guarantee that server CPU work already started stops immediately.',
    },
    privacyNote: privacy.en,
    disclaimer: 'DXF is a reference output inferred from image contours, not engineering, manufacturing, safety, or dimensional verification. Have important drawings checked by a qualified person in professional CAD software.',
    contentSections: [
      { heading: 'Vectorization and scale limits', paragraphs: ['Threshold, blur, and simplification change the contour. Invert is useful when foreground and background brightness are reversed. Two-point calibration establishes geometric scale but does not correct perspective, lens distortion, or source-image error.', sourceNote.en] },
      { heading: 'Preparing an image and tuning parameters', paragraphs: ['High-contrast black-and-white line art with a simple background is usually easier to vectorize than a photograph. Threshold sets the foreground boundary; invert handles the opposite brightness relationship; blur can reduce small noise but may remove detail when set too high. A more aggressive simplification ratio can reduce nodes while making curves less exact.', 'Minimum area can filter specks and scan noise, but an overly large value may remove meaningful small contours. Start with the defaults, then inspect the DXF in CAD for gaps, overlaps, open paths, and unwanted outlines. Adjust for the real use case rather than optimizing only for a small file.'] },
      { heading: 'Scale calibration and CAD follow-up', paragraphs: ['Two-point calibration works when the image contains a reliable known distance. Click the two locations in order, confirm the pixel distance, then enter the real distance and unit. It estimates overall scale but cannot correct camera angle, perspective, lens distortion, paper curvature, or errors in the source image. Without a trustworthy reference, unitless output is safer than guessing a dimension.', 'After downloading, inspect layers, units, coordinate direction, closed contours, dimensions, and process tolerances in your CAD software. Laser cutting, fabrication, construction, and submission drawings require source measurements and qualified review; do not make those decisions from an image conversion alone.'] },
    ],
  },
);

export const serverPdfCompressorContent = makeLocalized(
  {
    name: 'PDF 壓縮工具',
    short: '以保留文字與向量為優先的模式嘗試縮小 PDF。',
    long: 'PDF 壓縮工具提供 Lossless、Balanced（預設）與 Strong 三種模式，優先重寫 PDF 結構並在可能時保留文字與向量。點陣圖片可能被重新壓縮；為避免簽章失效，數位簽署 PDF 會被拒絕。',
    seoTitle: 'PDF 壓縮工具｜保留文字與向量的三種模式',
    seoDescription: '使用 Lossless、Balanced 或 Strong 模式壓縮 PDF；文字與向量盡可能保留，數位簽署 PDF 會拒絕處理。',
    keywords: ['PDF 壓縮', '縮小 PDF', 'PDF compressor', 'PDF 檔案減肥'],
    capabilities: ['Lossless、Balanced（預設）、Strong 三種模式', '文字與向量在可能時保留', '點陣圖片可能重新壓縮', '偵測數位簽署 PDF 並拒絕處理'],
    instructions: ['選取 PDF。', '選擇壓縮模式；Balanced 適合作為預設起點。', '下載後比較檔案大小，並檢查文字、圖片與簽章需求。'],
    examples: ['降低郵件附件或表單上傳的 PDF 大小。', '整理含文字與圖片的報告副本。', '在分享前測試不同壓縮強度。'],
    audience: ['需要控制 PDF 附件大小的工作者', '整理報告與文件副本的人', '需要在容量與圖片品質間取捨的使用者'],
    faq: [
      { q: '哪個模式最適合先試？', a: 'Balanced 是預設起點；若文字或向量必須盡量維持，可先試 Lossless；Strong 可能更積極處理圖片。' },
      { q: '會把 PDF 整頁轉成 JPEG 嗎？', a: '不會把整頁轉成 JPEG 當作預設壓縮方式；文字與向量在可能時保留，點陣圖片才可能重新壓縮。' },
      { q: '為什麼數位簽署 PDF 不能壓縮？', a: '重新寫入檔案可能使簽章失效，因此工具會拒絕數位簽署 PDF，請保留原檔並使用合適的簽章流程。' },
    ],
    labels: {
      serverNote: sourceNote.zh, upload: '選擇 PDF', preset: '壓縮模式', lossless: 'Lossless', balanced: 'Balanced（預設）', strong: 'Strong', signatureNote: '數位簽署 PDF 會被拒絕，以避免重新寫入使簽章失效。', compress: '開始壓縮', cancel: '取消等待', download: '下載壓縮後 PDF', waiting: '尚未選取 PDF', processing: '正在壓縮…', ready: '壓縮完成，請比較大小並檢查內容。', noFile: '請先選取 PDF。', failed: 'PDF 壓縮失敗。', original: '原始大小', output: '輸出大小', change: '大小變化', smaller: '輸出較小', notSmaller: '輸出未變小，已保留較安全的結果', cancelNote: '取消會停止瀏覽器等待；已開始的伺服器處理不保證立即停止。',
    },
    privacyNote: privacy.zh,
    contentSections: [{ heading: '保留文字與向量的壓縮原則', paragraphs: ['工具不以整頁 JPEG 化作為預設壓縮方式。文字與向量在可能時保留，但點陣圖片可能重新壓縮；輸出若沒有比原檔小，服務會回傳較安全的結果。', '數位簽署 PDF 會被拒絕，以免重新寫入使簽章失效。', sourceNote.zh] }],
  },
  {
    name: 'PDF Compressor',
    short: 'Try three compression modes while preserving text and vector content when possible.',
    long: 'PDF Compressor offers Lossless, Balanced (default), and Strong modes. It prioritizes rewriting PDF structure while preserving text and vector content when possible. Raster images may be recompressed, and digitally signed PDFs are rejected to avoid invalidating signatures.',
    seoTitle: 'PDF Compressor | Three Modes with Text and Vector Preservation',
    seoDescription: 'Compress PDFs with Lossless, Balanced, or Strong modes while preserving text and vectors when possible; signed PDFs are rejected.',
    keywords: ['PDF compressor', 'reduce PDF size', 'compress PDF safely'],
    capabilities: ['Lossless, Balanced (default), and Strong modes', 'Preserve text and vectors when possible', 'Recompress raster images when appropriate', 'Reject digitally signed PDFs before processing'],
    instructions: ['Choose a PDF.', 'Select a mode; Balanced is the default starting point.', 'Download, compare file sizes, and inspect text, images, and signature requirements.'],
    examples: ['Reduce a PDF attachment for email or a form upload.', 'Prepare a smaller copy of a report with text and images.', 'Test compression strength before sharing a document.'],
    audience: ['People managing PDF attachment limits', 'Workers organizing report and document copies', 'Users balancing file size and image quality'],
    faq: [
      { q: 'Which mode should I try first?', a: 'Balanced is the default starting point. Try Lossless when text and vectors need the most conservative handling; Strong may treat images more aggressively.' },
      { q: 'Does it render every page to JPEG?', a: 'No. Full-page JPEG rendering is not the default. Text and vectors are preserved when possible, while raster images may be recompressed.' },
      { q: 'Why are signed PDFs rejected?', a: 'Rewriting a file can invalidate its signature, so digitally signed PDFs are rejected. Keep the original and use an appropriate signed-document workflow.' },
    ],
    labels: {
      serverNote: sourceNote.en, upload: 'Choose PDF', preset: 'Compression mode', lossless: 'Lossless', balanced: 'Balanced (default)', strong: 'Strong', signatureNote: 'Digitally signed PDFs are rejected to avoid invalidating signatures.', compress: 'Compress PDF', cancel: 'Cancel waiting', download: 'Download compressed PDF', waiting: 'No PDF selected', processing: 'Compressing…', ready: 'Compression finished. Compare size and inspect the content.', noFile: 'Choose a PDF first.', failed: 'PDF compression failed.', original: 'Original size', output: 'Output size', change: 'Size change', smaller: 'Output is smaller', notSmaller: 'Output was not smaller; the safer result was kept', cancelNote: 'Cancel stops the browser from waiting; it does not guarantee that server CPU work already started stops immediately.',
    },
    privacyNote: privacy.en,
    contentSections: [{ heading: 'Compression that keeps text and vectors in view', paragraphs: ['The tool does not make full-page JPEG rendering the default compression method. Text and vectors are preserved when possible, while raster images may be recompressed; if the output is not smaller, the safer result is returned.', 'Digitally signed PDFs are rejected because rewriting them can invalidate the signature.', sourceNote.en] }],
  },
);
