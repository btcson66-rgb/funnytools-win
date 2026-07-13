interface ToolContent {
  name: string;
  short: string;
  long: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  capabilities?: string[];
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
    name: 'PDF 拆分',
    short: '將 PDF 每頁分開，或依自訂頁碼範圍輸出多份 PDF。',
    long: 'PDF 拆分工具適合從報告、合約、教材或掃描檔中取出需要的頁面。你可以把每一頁輸出成獨立 PDF，也能輸入 1-3, 5, 8-10 這類範圍建立分段檔案；處理過程在瀏覽器本機完成，不會把原始 PDF 上傳到本站或第三方伺服器。',
    seoTitle: "分割 PDF 線上工具｜免費擷取頁面與自訂頁碼範圍",
    seoDescription: '免費將 PDF 逐頁拆分，或輸入 1-3、5、8-10 自訂頁碼範圍產生多份 PDF。檔案只在瀏覽器本機處理，不會上傳。',
    keywords: [
      "分割 PDF",
      "PDF 分割",
      "擷取 PDF 頁面",
      "PDF 頁碼範圍",
      "split PDF",
      "PDF splitter",
      "本機 PDF 工具"
    ],
    capabilities: [
      '將一份 PDF 的每一頁拆成獨立檔案，適合逐頁歸檔或分別傳送。',
      '依自訂頁碼範圍擷取章節、條款或簽名頁，每個範圍產生一份 PDF。',
      '原始檔留在裝置中，工具只建立新的下載檔，不會覆寫內容。',
    ],
    contentSections: [
      {
        heading: "分割 PDF 工具可以做什麼",
        paragraphs: [
          "分割 PDF 可將一份 PDF 拆成單頁檔案，或依照你輸入的頁碼範圍建立多個 PDF。它適合從報告、合約、掃描文件、課堂資料或申請檔案中取出需要的頁面。",
          "工具會產生新的下載檔，不會覆蓋原始 PDF；你可以用 1-3, 5, 8-10 這類格式快速建立自訂範圍。"
        ]
      },
      {
        heading: "什麼時候適合分割 PDF",
        paragraphs: [
          "當你只需要分享或保存 PDF 的部分頁面時，分割工具能讓檔案更小、更清楚，也能避免傳送不相關內容。"
        ],
        items: [
          "從完整報告中取出摘要或附件頁",
          "只匯出合約條款或簽名頁",
          "把掃描成一份的大檔拆成章節或月份",
          "將教材依單元拆成多個下載檔",
          "從申請文件中取出指定證明頁"
        ]
      },
      {
        heading: "分割 PDF 使用步驟",
        paragraphs: [
          "1. 選擇一份 PDF 並載入總頁數。",
          "2. 選擇每頁一份 PDF，或選擇自訂頁碼範圍。",
          "3. 若使用自訂範圍，輸入 1-3, 5, 8-10 這類格式。",
          "4. 按下分割 PDF，逐一下載產生的檔案。"
        ]
      },
      {
        heading: "分割 PDF 的實用建議",
        paragraphs: [
          "輸入頁碼前先確認總頁數，可減少範圍錯誤。"
        ],
        items: [
          "頁碼從 1 開始，不是從 0 開始",
          "使用逗號分隔多個範圍，每個範圍會產生一份 PDF",
          "大型文件建議先取出需要的範圍，不要一次拆成所有單頁",
          "密碼保護、限制編輯或損壞的 PDF 可能無法處理"
        ]
      },
      {
        heading: "拆分掃描件、合約與報告的實際做法",
        paragraphs: [
          "答案是：先依文件的閱讀單位決定每個輸出範圍，再輸入頁碼，不要一開始就把大型掃描檔全部拆成單頁。以掃描件為例，可以先載入總頁數，對照紙本或原檔目錄，將每張收據、每份表單或每個月份整理成 1-2, 3-5, 6-6 這類範圍。每個逗號分隔的項目會各自輸出一份 PDF，方便後續重新命名與歸檔。",
          "抽取合約頁面時，先確認頁碼是 PDF 檢視器顯示的實際頁序，而不是文件印刷在頁尾的章節頁碼。若只要提供封面、特定條款與簽名頁，可分別輸入對應範圍；輸出後仍應逐頁核對當事人、附件編號與簽署欄，避免因插頁或空白頁導致選錯。需要把多個範圍重新組成同一份文件時，可下載後使用 PDF 合併工具依想要的順序整合。",
          "整理報告或教材時，自訂範圍比逐頁拆分更適合保留章節脈絡。例如摘要為 1-3 頁、第一章為 4-18 頁，就把它們設成不同範圍；只有在逐張上傳、逐頁批註或每頁都要獨立命名時，才選擇每頁拆分。這樣可以減少下載檔案數量，也比較不容易在瀏覽器中同時建立大量物件。"
        ]
      },
      {
        heading: "檔案大小、頁數與加密 PDF 限制",
        paragraphs: [
          "限制是：本工具沒有把檔案上傳到伺服器，因此可處理大小取決於裝置記憶體、瀏覽器與 PDF 結構，而不是網路速度。為了維持穩定，建議一般裝置一次處理約 40 MB 以下、300 頁以內的 PDF；這是操作建議而非硬性上傳上限。高解析度掃描、內嵌大量圖片或字型的檔案，即使頁數不多，也可能比純文字 PDF 使用更多記憶體。",
          "密碼保護、限制修改、憑證加密或檔案結構損壞的 PDF 不支援。請先在有權限的原始軟體中解除保護並另存新檔，再回來拆分；本工具不會嘗試破解密碼或移除權限。含互動表單、數位簽章、附件、特殊圖層或複雜書籤的 PDF 在重新建立時也可能無法完整保留，重要法律或送審文件務必比對輸出結果。",
          "手機可以使用，但大型 PDF 容易因記憶體不足而讓分頁重新載入。手機上建議只擷取少數範圍，並在產生後立即下載；若要將數百頁全部拆成單頁，改用記憶體較充足的桌機瀏覽器會更可靠。無論使用哪種裝置，原始檔都不會被覆寫，重設或關閉分頁後，尚未下載的暫存結果就無法取回。"
        ]
      }
    ],
    instructions: [
      '選取一份 PDF 檔案並讀取總頁數。',
      '選擇每頁拆成獨立檔案，或輸入自訂頁碼範圍。',
      '自訂範圍可使用 1-3, 5, 8-10 這種格式。',
      '按下拆分 PDF，逐一下載產生的檔案。',
    ],
    examples: [
      '把完整報告拆成每一頁的單頁 PDF。',
      '只輸出合約中的第 1-3 頁和簽名頁。',
      '將教材依章節拆成多份檔案給不同學生。',
      '在不外傳原始文件的情況下擷取需要分享的頁面。',
    ],
    audience: [
      '只需要分享報告、合約或申請資料中特定頁面的辦公室使用者。',
      '要把掃描成一份的大檔案拆成章節、收據或個別附件的行政人員。',
      '需要按課程單元輸出講義、作業或閱讀資料的老師與助教。',
      '想在本機擷取 PDF 頁面，避免把完整文件上傳到外部服務的人。',
    ],
    caseStudies: [
      {
        title: '合約頁面擷取',
        description: '法務或業務同仁只需要寄出合約中的條款頁與簽名頁時，可輸入指定頁碼範圍產生一份較小 PDF，降低分享不必要頁面的風險。',
      },
      {
        title: '掃描收據拆檔',
        description: '行政人員將一次掃描成大檔的收據依月份或案件拆成多份 PDF，方便命名、歸檔與提供給會計審核。',
      },
      {
        title: '教材分章下載',
        description: '老師把整本講義依單元拆成多個 PDF，學生可以只下載當週需要的章節，手機閱讀時也比較不會載入過慢。',
      },
    ],
    notes: [
      '頁碼從 1 開始，範圍可用逗號分隔；輸入前建議先確認工具讀到的總頁數。',
      '建議一次處理約 40 MB 以下、300 頁以內的 PDF；這不是上傳上限，而是一般瀏覽器的穩定性建議。',
      '受密碼保護、限制修改、憑證加密或損壞的 PDF 不支援，也不會嘗試破解保護。',
      '若 PDF 很大或頁數很多，拆成多個範圍比一次輸出每一頁更容易維持瀏覽器穩定。',
    ],
    faq: [
      {
        q: "分割 PDF 時檔案會上傳嗎？",
        a: "不會。PDF 會在瀏覽器內讀取與分割，不會離開你的裝置。"
      },
      {
        q: "頁碼範圍要怎麼輸入？",
        a: "可使用 1-3, 5, 8-10 這類格式。頁碼從 1 開始，請先確認載入的總頁數。"
      },
      {
        q: "自訂範圍會產生幾個檔案？",
        a: "每個逗號分隔的範圍會產生一份 PDF；只輸入一個範圍就會產生一份檔案。"
      },
      {
        q: "分割會修改原始 PDF 嗎？",
        a: "不會。工具只會建立新的下載檔，原始 PDF 不會被覆蓋或修改。"
      },
      {
        q: "加密 PDF 或大型 PDF 可以拆分嗎？",
        a: "加密、受密碼保護或限制修改的 PDF 不支援。大型檔案受瀏覽器記憶體限制，建議控制在約 40 MB、300 頁以內，並優先輸出少數自訂範圍。"
      }
    ],
    labels: {
      localNote: '檔案只在你的瀏覽器本機處理，不會上傳。',
      upload: '選擇 PDF',
      analyze: '讀取頁數',
      modeLabel: '拆分方式',
      modeEvery: '每頁一份 PDF',
      modeRanges: '自訂頁碼範圍',
      rangesLabel: '頁碼範圍',
      rangesPlaceholder: '例如：1-3, 5, 8-10',
      pageCount: '總頁數：{count}',
      split: '拆分 PDF',
      reset: '重設',
      processing: '處理中...',
      outputTitle: '可下載檔案',
      noOutput: '尚未產生檔案',
      download: '下載',
      noFile: '請先選擇一份 PDF。',
      pdfOnly: '請選擇 PDF 檔案。',
      loadError: '無法讀取 PDF，請確認檔案未損毀。',
      emptyRange: '請輸入至少一個頁碼範圍。',
      invalidRange: '頁碼範圍格式無效，請使用 1-3, 5, 8-10 這類格式。',
      splitError: '拆分 PDF 時發生錯誤，請改用較小或未加密的檔案。',
    },
    privacyNote: '所有 PDF 都只在你的瀏覽器本機處理，檔案不會離開瀏覽器，也不會上傳到本站或第三方伺服器。',
  },
  en: {
    name: 'Split PDF',
    short: 'Split one PDF into single pages or custom page-range files.',
    long: 'Split PDF helps you extract only the pages you need from reports, contracts, class material, scanned files, and application packets. Create one PDF per page or enter custom ranges such as 1-3, 5, 8-10 to build separate downloads. Processing runs locally in your browser with pdf-lib, so the original PDF is not uploaded to FunnyTools or a third-party server.',
    seoTitle: "Split PDF Online Free | Extract Pages and Custom Ranges",
    seoDescription: 'Split a PDF into single pages or custom page ranges locally in your browser. Files are never uploaded.',
    keywords: [
      "split PDF",
      "PDF splitter",
      "extract PDF pages",
      "PDF page range",
      "split PDF online free",
      "local PDF tool",
      "PDF page extractor"
    ],
    contentSections: [
      {
        heading: "What Split PDF does",
        paragraphs: [
          "Split PDF extracts pages from one PDF as single-page files or as custom page-range PDFs. It is built for reports, contracts, scanned packets, class material, and application documents where only part of the file is needed.",
          "The tool creates new downloads and leaves your original PDF unchanged. Custom ranges can use formats such as 1-3, 5, 8-10."
        ]
      },
      {
        heading: "When to use Split PDF",
        paragraphs: [
          "Use it when you need to share, archive, or upload only selected pages from a larger PDF."
        ],
        items: [
          "Exporting summary pages or appendices from a report",
          "Extracting signature pages or selected contract clauses",
          "Dividing one scanned file into chapters or monthly records",
          "Preparing separate lesson or workbook downloads",
          "Removing unrelated pages before sending a document"
        ]
      },
      {
        heading: "Step-by-step usage guide",
        paragraphs: [
          "1. Choose one PDF and load its total page count.",
          "2. Select one PDF per page or custom page ranges.",
          "3. For custom output, enter ranges like 1-3, 5, 8-10.",
          "4. Run Split PDF and download each generated file."
        ]
      },
      {
        heading: "Tips and best practices",
        paragraphs: [
          "Check the total page count before entering ranges."
        ],
        items: [
          "Page numbers start at 1",
          "Each comma-separated range creates one PDF",
          "Use fewer custom ranges for very large documents",
          "Use an unlocked, undamaged PDF for the best result"
        ]
      },
      {
        heading: "Practical workflows for scans, contracts, and reports",
        paragraphs: [
          "The direct answer is to decide what each output file should represent before entering page ranges. Do not automatically turn a large scan into hundreds of single-page files when each receipt, form, case, or month spans several pages. Load the total page count, compare it with the source document, and enter groups such as 1-2, 3-5, 6-6. Every comma-separated group becomes a separate PDF that you can rename and archive after downloading.",
          "When extracting contract material, use the physical page order shown by the PDF viewer rather than a chapter number printed in a footer. A cover sheet, clause section, exhibit, and signature page may have different printed numbering or inserted blank pages. Download the result and verify names, exhibit labels, initials, and signature fields before sharing it. If selected ranges need to become one document in a new order, download them and use Merge PDF to assemble the final packet.",
          "For reports and course material, chapter ranges usually preserve context better than one-page output. A report might use pages 1-3 for the executive summary, 4-18 for the analysis, and 19-24 for appendices. Create those as separate range files. Choose one PDF per page only for workflows that genuinely require individual uploads, page-level annotations, or a separate filename for every scanned item. Fewer output files also reduce memory use and make the download list easier to review."
        ]
      },
      {
        heading: "File size, page count, and encrypted PDF limits",
        paragraphs: [
          "The main limit is browser memory. Because the PDF is not uploaded, there is no server upload quota; performance depends on your device, browser, and the internal structure of the document. For a stable general workflow, keep a single file around 40 MB or less and under roughly 300 pages. This is a practical recommendation rather than a hard upload limit. A high-resolution scan with large images and embedded fonts can consume much more memory than a text-based PDF of the same page count.",
          "Password-protected, certificate-encrypted, edit-restricted, or damaged PDFs are not supported. If you own the document and have permission, unlock it in the original application and save an unprotected copy before splitting. This tool does not crack passwords or bypass document permissions. Interactive forms, digital signatures, embedded attachments, layers, bookmarks, and other advanced PDF features may not survive exactly when pages are copied into a new file, so compare important legal or submission documents with the original.",
          "Phones can run the tool, but mobile browsers have tighter memory limits and may reload the tab during a large job. On a phone, extract a few custom ranges and download them immediately. Use a desktop browser with more available memory when splitting hundreds of pages into individual files. The original PDF is never overwritten, and generated object URLs are temporary; any result that has not been downloaded disappears when you reset or close the page."
        ]
      }
    ],
    instructions: [
      'Choose one PDF and load its total page count.',
      'Select either one PDF per page or custom page ranges.',
      'Use range syntax such as 1-3, 5, 8-10 for custom output.',
      'Run Split PDF and download each generated file.',
    ],
    examples: [
      'Split a full report into one-page PDFs.',
      'Export only pages 1-3 and the signature page from a contract.',
      'Divide class material into chapter files for students.',
      'Extract pages without sending the original document to a service.',
    ],
    audience: [
      'Office users who only need to share selected pages from a report, contract, or application file.',
      'Admins separating a large scanned PDF into chapters, receipts, proof documents, or case attachments.',
      'Teachers and assistants who want to export handouts, readings, or worksheets by lesson unit.',
      'Anyone who wants local PDF page extraction without uploading the full document to an external service.',
    ],
    caseStudies: [
      {
        title: 'Contract page extraction',
        description: 'A coordinator exports only the clause pages and signature page needed for a review, creating a smaller PDF and reducing the chance of sharing unrelated contract pages.',
      },
      {
        title: 'Receipt scan cleanup',
        description: 'An admin splits one large scanned receipt file into monthly or case-based PDFs, making each file easier to name, archive, and send to accounting.',
      },
      {
        title: 'Lesson chapter downloads',
        description: 'A teacher divides a full workbook into chapter PDFs so students can download only the current unit and open the file more easily on phones.',
      },
    ],
    notes: [
      'Page numbers start at 1, and ranges can be comma-separated; check the loaded page count before entering ranges.',
      'For general stability, keep one PDF around 40 MB or less and under roughly 300 pages; this is a browser-memory recommendation, not an upload quota.',
      'Password-protected, certificate-encrypted, edit-restricted, or damaged PDFs are not supported.',
      'For very large PDFs, creating a few custom ranges is usually more stable than exporting every page at once.',
    ],
    faq: [
      {
        q: "Are PDFs uploaded when splitting?",
        a: "No. The PDF is read and split inside your browser and is not uploaded."
      },
      {
        q: "How do I write page ranges?",
        a: "Use a format like 1-3, 5, 8-10. Page numbers start at 1."
      },
      {
        q: "How many files does a custom range create?",
        a: "Each comma-separated range creates one PDF. One range creates one output file."
      },
      {
        q: "Does splitting change the original PDF?",
        a: "No. The tool creates new downloadable PDFs and leaves the original file unchanged."
      },
      {
        q: "Can I split an encrypted or very large PDF?",
        a: "Encrypted, password-protected, or edit-restricted PDFs are not supported. Large files depend on browser memory; for general stability, stay around 40 MB and 300 pages or use a few custom ranges."
      }
    ],
    labels: {
      localNote: 'Files are processed locally in your browser and never uploaded.',
      upload: 'Choose PDF',
      analyze: 'Load page count',
      modeLabel: 'Split mode',
      modeEvery: 'One PDF per page',
      modeRanges: 'Custom page ranges',
      rangesLabel: 'Page ranges',
      rangesPlaceholder: 'Example: 1-3, 5, 8-10',
      pageCount: 'Total pages: {count}',
      split: 'Split PDF',
      reset: 'Reset',
      processing: 'Processing...',
      outputTitle: 'Downloads',
      noOutput: 'No files generated yet',
      download: 'Download',
      noFile: 'Choose one PDF first.',
      pdfOnly: 'Choose a PDF file.',
      loadError: 'Could not read the PDF. Make sure the file is not damaged.',
      emptyRange: 'Enter at least one page range.',
      invalidRange: 'Invalid page range. Use a format like 1-3, 5, 8-10.',
      splitError: 'Could not split the PDF. Try a smaller or unencrypted file.',
    },
    privacyNote: 'All PDFs are processed locally in your browser. Files never leave the browser and are never uploaded to this site or a third-party server.',
  },
} satisfies Record<'zh' | 'en', ToolContent>;
