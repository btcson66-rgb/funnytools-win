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
    seoTitle: 'PDF 合併｜免費線上合併多個 PDF，不上傳檔案',
    seoDescription: '免費 PDF 合併工具，將多個 PDF 合成一份；免安裝，直接在瀏覽器本機處理，文件不需上傳伺服器。',
    keywords: ['PDF 合併', '合併 PDF', '免費 PDF 合併', '線上合併 PDF', 'PDF 工具', '不上傳檔案合併 PDF', '本機處理 PDF'],
    capabilities: [
      '一次選取多份 PDF，並依清單順序合併成單一檔案。',
      '讀取各檔頁數，合併前可用上移、下移調整文件順序。',
      '在瀏覽器本機完成處理，不需上傳合約、申請書或掃描檔。',
    ],
    contentSections: [
      {
        heading: 'PDF 合併工具是什麼？',
        paragraphs: [
          'PDF 合併工具可把兩個以上的 PDF 依指定順序整合成一份新文件。FunnyTools 的免費 PDF 合併功能免安裝，直接在瀏覽器本機處理 PDF，適合不想把私人或工作文件上傳到外部伺服器的使用者。',
        ],
      },
      {
        heading: '什麼情況會需要合併 PDF？',
        paragraphs: [
          '當資料分散在多個檔案，但需要一次寄送、上傳、列印或歸檔時，就適合先合併 PDF。常見情境包括：',
        ],
        items: [
          '把主合約、報價單、條款與簽名頁整理成一份合約文件。',
          '將課堂講義、練習題與補充閱讀依教學順序合併。',
          '整合分批掃描的收據、證明或紙本文件。',
          '彙整申請表、身分證明與其他申請資料。',
          '把報告本文與多份附件合成單一 PDF，方便提交與保存。',
        ],
      },
      {
        heading: '如何合併多個 PDF？',
        paragraphs: [
          '先選取至少兩個 PDF，等待工具顯示各檔案頁數，再用上移、下移確認合併順序。按下「合併 PDF」後，瀏覽器會建立一份新的 PDF 供你下載，原始檔案不會被修改。',
        ],
      },
      {
        heading: '合併 PDF 前要注意什麼？',
        paragraphs: [
          '合併前請確認每份 PDF 都能正常開啟，並檢查頁面方向、文件順序與是否有重複頁。受密碼保護、限制編輯或已損壞的檔案可能無法處理；大型 PDF 也會使用較多裝置記憶體，必要時可先分批合併。',
        ],
      },
      {
        heading: '本機處理 PDF 和上傳處理 PDF 的差異',
        paragraphs: [
          '本機處理會由你的瀏覽器直接讀取並產生結果，PDF 不會傳送到 FunnyTools 或第三方伺服器，隱私較容易掌握，也省去上傳與等待下載的時間。相對地，上傳式服務會先把文件送到遠端伺服器處理，可能較不受裝置效能限制，但需要考量傳輸時間、保存政策與機密資料風險。',
        ],
      },
      {
        heading: '如果 PDF 順序錯了該怎麼調整？',
        paragraphs: [
          '合併前可直接用檔案旁的上移、下移按鈕重新排列，輸出結果會依畫面清單由上到下合併。若合併後才發現單一 PDF 內部頁序錯誤，可改用相關工具中的「PDF 頁面重新排序」調整頁次，再重新檢查與下載。',
        ],
      },
      {
        heading: '合併後檔案太大可以搭配哪些工具？',
        paragraphs: [
          '若合併後超過電子郵件或申請系統的檔案大小限制，可先使用「PDF 壓縮工具」嘗試縮小容量；也能用「PDF 拆分」保留需要分開提交的部分。頁面方向錯誤可用「PDF 旋轉」，紙本照片可用「圖片轉 PDF」整理，若要抽出頁面圖像則可使用「PDF 轉圖片」。這些連結列在下方相關工具區。',
        ],
      },
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
        q: 'PDF 合併需要安裝軟體嗎？',
        a: '不需要。這是免安裝的線上 PDF 工具，只要使用支援 JavaScript 的現代瀏覽器，就能選取檔案並在本機完成合併。',
      },
      {
        q: '合併 PDF 會上傳到伺服器嗎？',
        a: '不會。檔案只會在你的瀏覽器中讀取與合併，不會離開瀏覽器，也不會被上傳或儲存到 FunnyTools 或第三方伺服器。',
      },
      {
        q: '可以用手機合併 PDF 嗎？',
        a: '可以，只要手機瀏覽器能選取 PDF 並有足夠記憶體即可。大型或頁數很多的檔案可能較耗資源，若處理變慢，建議改用電腦或分批合併。',
      },
      {
        q: '合併後會影響 PDF 畫質嗎？',
        a: '一般頁面內容會直接複製到新的 PDF，工具不會刻意降低圖片解析度；但書籤、附件、進階表單或特殊互動功能可能無法完整保留。',
      },
      {
        q: '可以調整 PDF 合併順序嗎？',
        a: '可以。選取檔案後可用上移與下移按鈕改變清單順序，輸出的 PDF 會依照畫面由上到下的順序合併。',
      },
      {
        q: '合併後檔案太大怎麼辦？',
        a: '可使用本站的 PDF 壓縮工具嘗試縮小檔案，或用 PDF 拆分工具把不必放在同一份文件的頁面分開。大型檔案處理時也建議關閉不需要的分頁，以保留瀏覽器記憶體。',
      },
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
    long: 'Merge PDF is a browser-based PDF combiner for contracts, scans, class handouts, application packets, and other small document batches. Choose multiple PDFs, review page counts, move files into the right order, and download one combined file. Processing runs locally with JavaScript and pdf-lib, so your documents are not uploaded to FunnyTools or a third-party server.',
    seoTitle: 'Merge PDF | Free online PDF combiner',
    seoDescription: 'Merge multiple PDF files locally in your browser, reorder them, view page counts, and download one combined PDF. Files are never uploaded.',
    keywords: ['merge PDF', 'combine PDF', 'PDF combiner', 'local PDF tool', 'free PDF merge'],
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
        q: 'Are my PDFs uploaded?',
        a: 'No. Files are read and merged inside your browser. They never leave the browser and are not uploaded or stored by this site.',
      },
      {
        q: 'Can I change the merge order?',
        a: 'Yes. Use the Move up and Move down buttons after choosing files. The output follows the visible list order.',
      },
      {
        q: 'Does this change my original PDFs?',
        a: 'No. The tool creates a separate download and does not modify the files on your device.',
      },
      {
        q: 'Why can large PDFs take longer?',
        a: 'Everything runs locally, so very large files or documents with many pages depend on your device memory and browser performance.',
      },
      {
        q: 'Will bookmarks or interactive forms be preserved?',
        a: 'This tool mainly copies PDF pages into a new file. Normal page content is preserved, but bookmarks, embedded attachments, advanced forms, or special interactive features may not carry over fully.',
      },
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
