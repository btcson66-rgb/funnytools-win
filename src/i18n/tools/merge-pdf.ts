interface ToolContent {
  name: string;
  short: string;
  long: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  capabilities?: string[];
  contentSections?: { heading: string; paragraphs: string[]; items?: string[] }[];
  instructions: string[];
  examples: string[];
  audience?: string[];
  caseStudies?: { title: string; description: string }[];
  notes?: string[];
  faq: { q: string; a: string }[];
  labels: Record<string, string>;
  disclaimer?: string;
  privacyNote?: string;
}

export default {
  zh: {
    name: 'PDF 合併',
    short: '選取多個 PDF、調整順序，並在瀏覽器本機合併成一份檔案。',
    long: 'PDF 合併工具適合把合約附件、掃描章節、課堂講義或申請資料整理成一份檔案。你可以在瀏覽器內選取多個 PDF、查看頁數、調整順序，再下載新的合併檔；處理過程使用本機 JavaScript 與 pdf-lib，檔案不會上傳到本站或第三方伺服器。',
    seoTitle: "合併 PDF 線上工具｜免費將多個 PDF 整合成一份檔案",
    seoDescription: '免費 PDF 合併工具，將多個 PDF 合成一份；免安裝，直接在瀏覽器本機處理，文件不需上傳伺服器。',
    keywords: [
      "合併 PDF",
      "PDF 合併",
      "線上 PDF 合併工具",
      "PDF combiner",
      "多個 PDF 合成一份",
      "免費 PDF 工具",
      "本機 PDF 合併"
    ],
    capabilities: [
      '一次選取多份 PDF，並依清單順序合併成單一檔案。',
      '讀取各檔頁數，合併前可用上移、下移調整文件順序。',
      '在瀏覽器本機完成處理，不需上傳合約、申請書或掃描檔。',
    ],
    contentSections: [
      {
        heading: "合併 PDF 工具可以做什麼",
        paragraphs: [
          "合併 PDF 可將多個 PDF 依照你指定的順序整合成一份檔案，適合整理合約附件、掃描文件、課堂講義、收據與申請資料。你可以先載入頁數、調整檔案順序，再下載新的合併 PDF。",
          "整個流程在瀏覽器中完成，原始檔不會被修改；輸出的 PDF 是一份新的下載檔，方便寄送、歸檔或上傳到表單。"
        ]
      },
      {
        heading: "什麼時候適合使用合併 PDF",
        paragraphs: [
          "當多份 PDF 需要以固定順序一起交付、分享或保存時，合併工具可以減少附件遺漏與排序錯誤。"
        ],
        items: [
          "將掃描成多個檔案的文件整理成一份 PDF",
          "把報價單、合約、附件與簽名頁合併",
          "整合講義、作業與閱讀材料",
          "把收據、證明文件或申請資料打包",
          "在不安裝桌面軟體的情況下快速處理小批量 PDF"
        ]
      },
      {
        heading: "合併 PDF 使用步驟",
        paragraphs: [
          "1. 選擇兩個或更多 PDF 檔案。",
          "2. 載入頁數後，使用上移與下移調整合併順序。",
          "3. 確認清單順序正確後按下合併 PDF。",
          "4. 下載產生的新 PDF，或重設清單處理下一批檔案。"
        ]
      },
      {
        heading: "合併 PDF 的實用建議",
        paragraphs: [
          "合併前先確認檔名與順序，可以避免輸出後還要重新整理。"
        ],
        items: [
          "把要放在前面的檔案先移到清單上方",
          "大型文件可分批合併，降低瀏覽器負擔",
          "密碼保護或損壞的 PDF 可能無法成功處理",
          "下載後打開檢查頁面順序與內容是否完整"
        ]
      }
    ],
    instructions: [
      '選取兩個以上的 PDF 檔案。',
      '等待工具讀取頁數，並用上移或下移調整合併順序。',
      '按下合併 PDF 產生新的單一 PDF 檔案。',
      '下載完成後可重設清單，再處理下一批檔案。',
    ],
    examples: [
      '把報價單、合約附件與簽核頁合併成一份文件。',
      '將掃描後分開的章節整理成單一 PDF。',
      '把多份課堂講義依上課順序合成一份檔案。',
      '合併私人文件時避免把檔案傳到外部服務。',
    ],
    audience: [
      '需要把多份合約、報價單、附件或簽核頁整理成單一檔案的行政與業務人員。',
      '想把掃描文件、申請資料、收據或證明文件依指定順序彙整的使用者。',
      '要把課堂講義、作業說明或閱讀資料打包成一份 PDF 的老師與學生。',
      '偏好在瀏覽器本機處理文件，不想把私人 PDF 上傳到外部服務的人。',
    ],
    caseStudies: [
      {
        title: '合約附件整理',
        description: '一位業務同仁把報價單、主合約、付款條件與簽核頁依客戶要求排序後合併，交付時只需要寄出一份 PDF，避免附件漏寄或順序混亂。',
      },
      {
        title: '掃描文件歸檔',
        description: '行政人員將分批掃描的收據、申請表與證明文件合併成同一個檔案，方便上傳到內部系統，也能保留原始頁面順序作為查核依據。',
      },
      {
        title: '課堂資料包',
        description: '老師把講義、練習題與補充閱讀合併為一份 PDF，學生下載後不用在多個檔案之間切換，也比較容易依課程進度閱讀。',
      },
    ],
    notes: [
      '大型或頁數很多的 PDF 會吃瀏覽器記憶體；若處理變慢，建議分批合併後再整理。',
      '受密碼保護、限制編輯或檔案損壞的 PDF 可能無法正常讀取或合併。',
      '工具會建立新的 PDF 下載檔，不會修改你裝置上的原始 PDF。',
    ],
    faq: [
      {
        q: "PDF 會被上傳嗎？",
        a: "不會。檔案會在瀏覽器中讀取與合併，不會離開你的裝置，也不會儲存在 FreeTools 伺服器。"
      },
      {
        q: "可以調整 PDF 合併順序嗎？",
        a: "可以。選擇檔案後使用上移與下移按鈕，輸出的 PDF 會依照畫面上的清單順序合併。"
      },
      {
        q: "合併會改到原始 PDF 嗎？",
        a: "不會。工具會產生新的下載檔，原始檔仍保留在你的裝置上。"
      },
      {
        q: "為什麼大型 PDF 需要比較久？",
        a: "所有處理都在瀏覽器本機執行，檔案越大、頁數越多，越依賴裝置記憶體與瀏覽器效能。"
      }
    ],
    labels: {
      localNote: '檔案只在你的瀏覽器本機處理，不會上傳。',
      upload: '選擇 PDF 檔案',
      selectedFiles: '已選檔案',
      noFiles: '尚未選擇 PDF',
      pages: '頁',
      loadingPages: '頁數尚未讀取',
      moveUp: '上移',
      moveDown: '下移',
      analyze: '讀取頁數',
      merge: '合併 PDF',
      reset: '重設',
      processing: '處理中...',
      ready: '已讀取 {count} 個 PDF',
      downloaded: '合併後的 PDF 已開始下載',
      noFile: '請至少選擇兩個 PDF 檔案。',
      pdfOnly: '請只選擇 PDF 檔案。',
      loadError: '無法讀取其中一個 PDF，請確認檔案未損毀。',
      mergeError: '合併 PDF 時發生錯誤，請改用較小或未加密的檔案。',
    },
    privacyNote: '所有 PDF 都只在你的瀏覽器本機處理，檔案不會離開瀏覽器，也不會上傳到本站或第三方伺服器。',
  },
  en: {
    name: 'Merge PDF',
    short: 'Combine multiple PDFs in your chosen order locally in the browser.',
    long: 'Merge PDF is a browser-based PDF combiner for contracts, scans, class handouts, application packets, and other small document batches. Choose multiple PDFs, review page counts, move files into the right order, and download one combined file. Processing runs locally with JavaScript and pdf-lib, so your documents are not uploaded to FreeTools or a third-party server.',
    seoTitle: "Merge PDF Online Free | Combine Multiple PDF Files Locally",
    seoDescription: 'Merge multiple PDF files locally in your browser, reorder them, view page counts, and download one combined PDF. Files are never uploaded.',
    keywords: [
      "merge PDF",
      "combine PDF files",
      "PDF combiner",
      "merge PDF online free",
      "local PDF merge",
      "join PDF files",
      "browser PDF tool"
    ],
    contentSections: [
      {
        heading: "What Merge PDF does",
        paragraphs: [
          "Merge PDF combines multiple PDF files into one document in the order you choose. It is useful for contracts, scanned records, invoices, reports, class handouts, application packets, and other small document batches.",
          "You can review page counts, move files into the right order, and download a new merged PDF without changing the originals on your device."
        ]
      },
      {
        heading: "When to use Merge PDF",
        paragraphs: [
          "Use this tool when several PDFs need to be delivered, archived, or uploaded as one ordered file."
        ],
        items: [
          "Combining scanned pages or forms into a single PDF",
          "Joining a quote, contract, appendix, and signature page",
          "Bundling worksheets, readings, or lesson files",
          "Packaging receipts, certificates, and application documents",
          "Creating one attachment from several small PDF files"
        ]
      },
      {
        heading: "Step-by-step usage guide",
        paragraphs: [
          "1. Choose two or more PDF files.",
          "2. Load page counts and use Move up or Move down to set the order.",
          "3. Select Merge PDF to create one combined file.",
          "4. Download the merged PDF or reset the list for another batch."
        ]
      },
      {
        heading: "Tips and best practices",
        paragraphs: [
          "A little preparation makes the final PDF easier to review and share."
        ],
        items: [
          "Put files in final reading order before merging",
          "Use smaller batches if the browser becomes slow",
          "Avoid password-protected or damaged PDFs",
          "Open the downloaded result and check page order before sending"
        ]
      }
    ],
    instructions: [
      'Choose two or more PDF files.',
      'Load page counts, then use Move up and Move down to set the merge order.',
      'Select Merge PDF to create one combined PDF file.',
      'Download the result or reset the list to start another batch.',
    ],
    examples: [
      'Combine a quote, contract appendix, and signature page into one file.',
      'Join scanned chapters that were saved as separate PDFs.',
      'Create one class handout from several lesson files.',
      'Merge private documents without sending them to an external service.',
    ],
    audience: [
      'Office teams that need one PDF from contracts, quotes, appendices, invoices, or approval pages.',
      'People organizing scanned forms, receipts, certificates, or application documents in a fixed order.',
      'Teachers and students packaging lesson notes, worksheets, readings, or project material into one download.',
      'Anyone who prefers local browser processing instead of uploading private PDFs to an external service.',
    ],
    caseStudies: [
      {
        title: 'Contract packet cleanup',
        description: 'A sales coordinator combines a quote, main agreement, payment terms, and signature page into one ordered PDF, reducing the chance of missing attachments when sending the packet to a client.',
      },
      {
        title: 'Scanned record archive',
        description: 'An admin merges separately scanned receipts, forms, and proof documents into one file before uploading it to an internal system, keeping the sequence clear for later review.',
      },
      {
        title: 'Class material bundle',
        description: 'A teacher combines handouts, exercises, and extra reading into one PDF so students can download a single file and follow the material in lesson order.',
      },
    ],
    notes: [
      'Very large PDFs or documents with many pages can use significant browser memory; merge in smaller batches if the page becomes slow.',
      'Password-protected, edit-restricted, or damaged PDFs may not load or merge correctly.',
      'The tool creates a new PDF download and does not modify the original files on your device.',
    ],
    faq: [
      {
        q: "Are my PDFs uploaded?",
        a: "No. Files are read and merged inside your browser. They are not uploaded or stored by FreeTools."
      },
      {
        q: "Can I change the merge order?",
        a: "Yes. Use Move up and Move down after choosing files. The output follows the visible list order."
      },
      {
        q: "Does this change my original PDFs?",
        a: "No. The tool creates a separate download and does not modify the files on your device."
      },
      {
        q: "Why can large PDFs take longer?",
        a: "Everything runs locally, so large files and long documents depend on browser memory and device performance."
      }
    ],
    labels: {
      localNote: 'Files are processed locally in your browser and never uploaded.',
      upload: 'Choose PDF files',
      selectedFiles: 'Selected files',
      noFiles: 'No PDFs selected',
      pages: 'pages',
      loadingPages: 'Page count not loaded',
      moveUp: 'Move up',
      moveDown: 'Move down',
      analyze: 'Load page counts',
      merge: 'Merge PDF',
      reset: 'Reset',
      processing: 'Processing...',
      ready: 'Loaded {count} PDFs',
      downloaded: 'Merged PDF download has started',
      noFile: 'Choose at least two PDF files.',
      pdfOnly: 'Choose PDF files only.',
      loadError: 'Could not read one of the PDFs. Make sure the file is not damaged.',
      mergeError: 'Could not merge the PDFs. Try smaller or unencrypted files.',
    },
    privacyNote: 'All PDFs are processed locally in your browser. Files never leave the browser and are never uploaded to this site or a third-party server.',
  },
} satisfies Record<'zh' | 'en', ToolContent>;
