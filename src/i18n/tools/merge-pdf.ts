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
    long: 'PDF 合併工具適合把合約附件、掃描章節、課堂講義或申請資料整理成一份檔案。你可以在瀏覽器內選取多個 PDF、查看頁數、調整順序，再下載新的合併檔；合併使用本機 JavaScript 與 pdf-lib，若選擇寄送下載，產生的合併檔可能進入寄送流程。',
    seoTitle: "PDF 合併工具｜本機合併、調整順序與檔案限制",
    seoDescription: '將兩份以上 PDF 在瀏覽器本機合併，可讀取頁數與調整順序；一次最多 50 檔、總量 100 MiB。附操作案例、錯誤處理與寄送下載說明。',
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
      '在瀏覽器本機完成合併，不需為了合併上傳合約、申請書或掃描檔。',
    ],
    contentSections: [
      {
        heading: "合併 PDF 工具可以做什麼",
        paragraphs: [
          "答案是：合併 PDF 可將多個 PDF 依照畫面清單順序整合成一份新檔案。它適合整理合約附件、掃描文件、課堂講義、收據與申請資料；先載入頁數、用上移或下移排好順序，再下載新的合併 PDF。",
          "讀取與合併在瀏覽器中完成，原始檔不會被修改；輸出的 PDF 是一份新檔。產生後的寄送下載可能使用網路，請先閱讀下方的寄送與隱私說明。"
        ]
      },
      {
        heading: "什麼時候適合使用合併 PDF",
        paragraphs: [
          "最適合的情況是：多份 PDF 必須以固定順序一起交付、分享或保存。合併成單一檔案可以減少附件遺漏與排序錯誤，也讓收件人只需開啟一次。"
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
          "4. 依電子郵件寄送面板完成下載流程，打開結果確認頁數與順序；再重設清單處理下一批。"
        ]
      },
      {
        heading: "三種常見的合併情境",
        paragraphs: [
          "合併掃描件時，先按紙本順序整理各批掃描檔，再查看每份頁數是否符合預期。若掃描器把正反面、附件或不同日期分成多個 PDF，利用上移與下移即可把封面、正文、附件放回正確位置；下載後再抽查接縫處，確認沒有漏頁或重複頁。",
          "彙整報告時，建議依封面、目錄、各部門章節、附錄的閱讀順序排列。每個部門可以保留自己的原始 PDF，最後只輸出一份交付版；本工具合併每份文件的所有頁面，不能在這裡刪除或抽取指定頁。",
          "報帳憑證合併時，可以把費用申請單放最前面，再依日期排列發票、收據、刷卡證明與核准附件。合併後的檔名可包含月份或案件編號，但仍要依公司會計規則保留原始憑證；本工具只協助整理檔案，不會判斷憑證是否符合報帳或稅務要求。"
        ],
        items: [
          "把要放在前面的檔案移到清單上方，輸出會依畫面順序進行",
          "下載後打開檢查頁面順序、內容與簽章狀態"
        ]
      },
      {
        heading: "檔案大小、頁數與加密限制",
        paragraphs: [
          "一次至少選取 2 個、最多 50 個 PDF；所選檔案總量不得超過 100 MiB（104,857,600 bytes），超過會顯示錯誤並停止讀取或合併。這是工具的硬性限制，不能當作裝置可穩定處理的保證；手機與高解析度掃描文件請先用小批次測試。工具沒有設定 300 頁的硬性上限，實際可處理頁數取決於檔案內容、瀏覽器記憶體與裝置。",
          "若按下讀取或合併後瀏覽器變慢，先重設並改成較小批次。可以先把同一章節或同一月份合併，再視裝置狀況處理下一批。密碼保護、限制修改、憑證加密或已損壞的 PDF 不支援；請在有權限的原始軟體中解除保護並另存副本，本工具不會破解密碼。",
          "互動表單、數位簽章、書籤、附件與特殊圖層在建立新 PDF 後可能無法完全維持原狀。需要法律效力、正式送審或長期保存的文件，下載後必須逐頁比對內容、簽章狀態與頁序，不能只看檔案是否成功開啟。"
        ]
      },
      {
        heading: '操作案例：2 頁講義加 1 頁附件',
        paragraphs: [
          '準備 A.pdf（2 頁講義）與 B.pdf（1 頁附件），選取兩檔後按「讀取頁數」，確認清單顯示 2 頁與 1 頁。A 在上、B 在下時，合併結果應為 A 第 1 頁、A 第 2 頁、B 第 1 頁，共 3 頁。',
          '用 B 旁的「上移」把附件移到最前面，再合併一次，順序應變成 B 第 1 頁、A 第 1 頁、A 第 2 頁。輸出是新的 PDF；下載後開啟比對頁數與順序，原始兩檔仍保持不變。這是可重現的操作例，不是對所有文件的成功率保證。'
        ]
      },
      {
        heading: '本機合併、寄送下載與離線使用',
        paragraphs: [
          '原始 PDF 的讀取與合併在瀏覽器內完成，不會為了合併送到轉檔 API。「合併 PDF」完成後會顯示電子郵件寄送面板；目前的下載流程需要填寫電子郵件，不是按一下就一定直接下載。',
          '提交寄送面板時，電子郵件與不超過 5 MiB 的產生檔可能送到 FunnyTools 的 Brevo 寄送流程。輸出檔過大、寄送失敗或網路不可用時，流程會改成本機下載；這不代表寄送過程完全不使用網路。電子郵件可能保留在此瀏覽器供下次使用，詳見頁面的隱私說明。',
          '首次載入網站與 PDF 程式仍需要網路。頁面和合併程式已載入後，可在本機處理文件；離線時不能寄信，寄送失敗會啟用本機下載備援。重新整理或首次離線開啟是否可用取決於快取，不能保證所有裝置都能完全離線使用。'
        ]
      },
      {
        heading: '讀取失敗、合併失敗或沒有下載時怎麼辦',
        paragraphs: [
          '先確認已選至少兩個真正的 PDF，且沒有超過 50 檔或 100 MiB。只改副檔名不會把其他格式變成 PDF。若讀取失敗，先在原始軟體確認文件能開啟，再用兩個小型、未加密的 PDF 測試；有權限時另存乾淨副本，不要嘗試破解保護。',
          '若頁數已載入但合併失敗，重設清單並減少檔案數與掃描解析度。合併後出現寄送面板，請依面板完成流程；若顯示本機下載已保留，檢查瀏覽器下載清單與封鎖提示。沒有成功訊息或結果檔時，不要只因網站或 API 健康檢查正常就當作合併成功。'
        ]
      }
    ],
    instructions: [
      '選取兩個以上的 PDF 檔案。',
      '按「讀取頁數」，並用上移或下移調整合併順序。',
      '按下合併 PDF 產生新的單一 PDF 檔案。',
      '依寄送面板完成下載流程，開啟結果檢查頁數與順序；再重設清單處理下一批。',
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
      '硬性限制為最多 50 個 PDF、所選檔案合計 100 MiB；沒有固定頁數上限，裝置仍可能在限制內記憶體不足。',
      '受密碼保護、限制編輯、憑證加密或檔案損壞的 PDF 不支援。',
      '工具會建立新的 PDF 下載檔，不會修改你裝置上的原始 PDF。',
    ],
    faq: [
      {
        q: "合併 PDF 的順序怎麼調？",
        a: "直接用每個檔案旁的上移與下移按鈕調整；輸出的 PDF 會完全依畫面清單由上到下合併。"
      },
      {
        q: "PDF 會被上傳嗎？",
        a: "原始 PDF 不會為了合併而上傳，因為合併在你的瀏覽器內完成；若使用寄送下載，產生的合併檔可能進入 FunnyTools 的 Brevo 寄送流程。"
      },
      {
        q: "加密或有密碼的 PDF 怎麼辦？",
        a: "本工具不支援加密、密碼保護或限制修改的 PDF，也不會破解密碼。若你有權限，請先在原始軟體解除保護並另存副本。"
      },
      {
        q: "手機可以合併 PDF 嗎？",
        a: "可以，但手機記憶體通常較少，請先測試小批次。工具最多接受 50 個 PDF、總量 100 MiB；在限制內仍可能記憶體不足。下載後確認頁數與順序。"
      },
      {
        q: "合併會修改原始 PDF 嗎？",
        a: "不會。工具只建立一份新的下載檔，裝置上的所有原始 PDF 都保持不變。"
      }
    ],
    labels: {
      localNote: '原始檔只在你的瀏覽器本機合併；寄送下載可能傳送產生的合併檔。',
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
      tooManyFiles: '一次最多選擇 {count} 個 PDF 檔案。',
      tooLarge: '所選 PDF 總大小超過 {size}，請分批處理。',
      loadError: '無法讀取其中一個 PDF，請確認檔案未損毀。',
      mergeError: '合併 PDF 時發生錯誤，請改用較小或未加密的檔案。',
    },
    privacyNote: '原始 PDF 只在你的瀏覽器本機合併，不會為了合併而上傳；若使用寄送下載，產生的合併檔與電子郵件會依頁面說明進入 FunnyTools 的寄送流程。',
  },
  en: {
    name: 'Merge PDF',
    short: 'Combine multiple PDFs in your chosen order locally in the browser.',
    long: 'Merge PDF is a browser-based PDF combiner for contracts, scans, class handouts, application packets, and other small document batches. Choose multiple PDFs, review page counts, move files into the right order, and download one combined file. Processing runs locally with JavaScript and pdf-lib; email delivery, if selected, can send the generated merged file.',
    seoTitle: "Merge PDF Online Free | Combine Multiple PDF Files Locally",
    seoDescription: 'Merge multiple PDF files locally in your browser, reorder them, view page counts, and download one combined PDF; email delivery has separate output-file disclosure.',
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
        a: "Source PDFs are not uploaded for merging because the merge runs in your browser. If you choose email delivery, the generated file may enter FunnyTools' Brevo delivery flow."
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
      localNote: 'Source files are merged locally in your browser; email delivery can send the generated file.',
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
      tooManyFiles: 'Choose no more than {count} PDF files at once.',
      tooLarge: 'The selected PDFs exceed {size} in total. Try a smaller batch.',
      loadError: 'Could not read one of the PDFs. Make sure the file is not damaged.',
      mergeError: 'Could not merge the PDFs. Try smaller or unencrypted files.',
    },
    privacyNote: 'Source PDFs are merged locally in your browser and are not uploaded for the merge; if you choose email delivery, the generated file and email address enter FunnyTools\' delivery flow as described on this page.',
  },
} satisfies Record<'zh' | 'en', ToolContent>;
