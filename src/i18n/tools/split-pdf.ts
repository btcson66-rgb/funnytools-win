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
    seoTitle: 'PDF 拆分｜免費線上分割頁面與擷取範圍',
    seoDescription: '免費將 PDF 逐頁拆分，或輸入 1-3、5、8-10 自訂頁碼範圍產生多份 PDF。檔案只在瀏覽器本機處理，不會上傳。',
    keywords: ['PDF 拆分', 'PDF 分割', '拆頁 PDF', 'split PDF', 'PDF page range'],
    capabilities: [
      '將一份 PDF 的每一頁拆成獨立檔案，適合逐頁歸檔或分別傳送。',
      '依自訂頁碼範圍擷取章節、條款或簽名頁，每個範圍產生一份 PDF。',
      '原始檔留在裝置中，工具只建立新的下載檔，不會覆寫內容。',
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
      '受密碼保護、限制修改或損壞的 PDF 可能無法拆分。',
      '若 PDF 很大或頁數很多，拆成多個範圍比一次輸出每一頁更容易維持瀏覽器穩定。',
    ],
    faq: [
      {
        q: '拆分 PDF 時檔案會上傳嗎？',
        a: '不會。PDF 只在你的瀏覽器中讀取和拆分，檔案不會離開瀏覽器。',
      },
      {
        q: '頁碼範圍要怎麼輸入？',
        a: '請用 1-3, 5, 8-10 這類格式。頁碼從 1 開始，超出總頁數的端點會被限制在有效範圍內。',
      },
      {
        q: '自訂範圍會輸出幾個檔案？',
        a: '每個逗號分隔的範圍會輸出一個檔案。若只輸入一個範圍，就只會產生一個 PDF。',
      },
      {
        q: '可以處理加密 PDF 嗎？',
        a: '瀏覽器端工具通常無法處理需要密碼或限制複製的 PDF，請先使用未加密檔案。',
      },
      {
        q: '拆分後會影響原始 PDF 嗎？',
        a: '不會。工具會依你選擇的頁面建立新的 PDF 下載檔，原始 PDF 仍保留在你的裝置上，不會被覆寫或修改。',
      },
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
    seoTitle: 'Split PDF | Free online PDF splitter',
    seoDescription: 'Split a PDF into single pages or custom page ranges locally in your browser. Files are never uploaded.',
    keywords: ['split PDF', 'PDF splitter', 'extract PDF ranges', 'PDF page splitter', 'local PDF tool'],
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
      'Password-protected, edit-restricted, or damaged PDFs may not split correctly.',
      'For very large PDFs, creating a few custom ranges is usually more stable than exporting every page at once.',
    ],
    faq: [
      {
        q: 'Are PDFs uploaded when splitting?',
        a: 'No. The PDF is read and split inside your browser. It never leaves the browser.',
      },
      {
        q: 'How do I write page ranges?',
        a: 'Use a format like 1-3, 5, 8-10. Page numbers start at 1, and endpoints outside the document are clamped to valid pages.',
      },
      {
        q: 'How many files does a custom range create?',
        a: 'Each comma-separated range creates one PDF. If you enter one range, the tool creates one output file.',
      },
      {
        q: 'Can this split encrypted PDFs?',
        a: 'Browser-only tools usually cannot process password-protected or restricted PDFs. Use an unlocked PDF.',
      },
      {
        q: 'Does splitting change the original PDF?',
        a: 'No. The tool creates new downloadable PDFs from the pages you choose. The original file remains on your device and is not overwritten or modified.',
      },
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
