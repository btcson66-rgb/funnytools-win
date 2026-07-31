interface ToolContent {
  name: string;
  short: string;
  long: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  instructions: string[];
  examples: string[];
  faq: { q: string; a: string }[];
  labels: Record<string, string>;
  disclaimer?: string;
  privacyNote?: string;
}

export default {
  zh: {
    name: 'PDF 旋轉',
    short: '將整份 PDF 或指定頁面順時針旋轉 90、180 或 270 度。',
    long: 'PDF 旋轉工具會在瀏覽器本機讀取 PDF，讓你旋轉所有頁面或指定頁碼範圍，並下載新的 PDF。它會保留既有旋轉角度並加上你選擇的角度。',
    seoTitle: 'PDF 旋轉｜批次旋轉 PDF 頁面方向',
    seoDescription: '免費 PDF 旋轉工具，可將全部頁面或指定頁碼範圍順時針旋轉 90、180、270 度，檔案不會上傳。',
    keywords: ['PDF 旋轉', '旋轉 PDF 頁面', 'rotate PDF', 'PDF page rotation', 'local PDF tool'],
    instructions: [
      '選取一份 PDF 並讀取總頁數。',
      '選擇旋轉所有頁面，或輸入要旋轉的頁碼範圍。',
      '選擇順時針 90、180 或 270 度。',
      '按下旋轉 PDF 並下載新檔案。',
    ],
    examples: [
      '修正掃描時方向錯誤的整份文件。',
      '只旋轉報告中橫向表格所在的幾頁。',
      '把倒置的簽名頁轉回正確方向。',
      '在處理私人文件時避免上傳到線上服務。',
    ],
    faq: [
      {
        q: 'PDF 會上傳嗎？',
        a: '不會。PDF 只在你的瀏覽器中讀取、旋轉並下載，檔案不會離開瀏覽器。',
      },
      {
        q: '指定頁碼範圍怎麼輸入？',
        a: '可以輸入 2, 5-7 這種格式。頁碼從 1 開始；如果輸入的頁碼超出目前 PDF 的總頁數，或格式不符（例如缺少數字、起始頁大於結束頁），工具會直接顯示錯誤並中止旋轉，不會自動修剪成有效範圍，需要修正後重新輸入。',
      },
      {
        q: '旋轉會覆蓋原始 PDF 嗎？',
        a: '不會。工具會建立新的下載檔，原始 PDF 不會被修改。',
      },
      {
        q: '旋轉角度會如何套用？',
        a: '工具會讀取頁面既有角度，再加上你選擇的順時針角度。',
      },
    ],
    labels: {
      localNote: '檔案只在你的瀏覽器本機處理，不會上傳。',
      upload: '選擇 PDF',
      analyze: '讀取頁數',
      pageCount: '總頁數：{count}',
      scope: '旋轉範圍',
      allPages: '全部頁面',
      customPages: '指定頁面',
      pagesLabel: '頁碼範圍',
      rangesPlaceholder: '例如：2, 5-7',
      angle: '旋轉角度',
      deg90: '90 度',
      deg180: '180 度',
      deg270: '270 度',
      rotate: '旋轉 PDF',
      reset: '重設',
      processing: '處理中...',
      downloaded: '旋轉後的 PDF 已開始下載',
      noFile: '請先選擇一份 PDF。',
      pdfOnly: '請選擇 PDF 檔案。',
      loadError: '無法讀取 PDF，請確認檔案未損毀。',
      emptyRange: '請輸入至少一個頁碼範圍。',
      invalidRange: '頁碼範圍格式無效，請使用 2, 5-7 這類格式。',
      rotateError: '旋轉 PDF 時發生錯誤，請改用較小或未加密的檔案。',
    },
    privacyNote: '所有 PDF 都只在你的瀏覽器本機處理，檔案不會離開瀏覽器，也不會上傳到本站或第三方伺服器。',
  },
  en: {
    name: 'Rotate PDF',
    short: 'Rotate every page or selected page ranges by 90, 180, or 270 degrees.',
    long: 'Rotate PDF loads a PDF locally, rotates all pages or custom page ranges, and creates a new download. Existing page rotation is preserved and your chosen clockwise angle is added.',
    seoTitle: 'Rotate PDF | Free online PDF page rotator',
    seoDescription: 'Rotate all PDF pages or selected ranges clockwise by 90, 180, or 270 degrees locally in your browser. Files are never uploaded.',
    keywords: ['rotate PDF', 'PDF rotator', 'rotate PDF pages', 'PDF page rotation', 'local PDF tool'],
    instructions: [
      'Choose one PDF and load its page count.',
      'Rotate all pages or enter a custom page range.',
      'Choose 90, 180, or 270 degrees clockwise.',
      'Run Rotate PDF and download the new file.',
    ],
    examples: [
      'Fix a scanned document that is sideways.',
      'Rotate only the landscape table pages inside a report.',
      'Turn an upside-down signature page to the correct direction.',
      'Adjust private documents without uploading them to an online service.',
    ],
    faq: [
      {
        q: 'Is the PDF uploaded?',
        a: 'No. The PDF is read, rotated, and downloaded inside your browser. It never leaves the browser.',
      },
      {
        q: 'How do I enter selected pages?',
        a: 'Use a format like 2, 5-7. Page numbers start at 1. If a page number is outside the current PDF\'s total page count, or the format is invalid (missing a number, or a start page after the end page), the tool shows an error and stops the rotation instead of clamping the range automatically; fix the input and try again.',
      },
      {
        q: 'Does this overwrite my original PDF?',
        a: 'No. The tool creates a new download and does not modify the original file.',
      },
      {
        q: 'How is the rotation applied?',
        a: 'The tool reads each page rotation and adds your selected clockwise angle.',
      },
    ],
    labels: {
      localNote: 'Files are processed locally in your browser and never uploaded.',
      upload: 'Choose PDF',
      analyze: 'Load page count',
      pageCount: 'Total pages: {count}',
      scope: 'Rotate scope',
      allPages: 'All pages',
      customPages: 'Selected pages',
      pagesLabel: 'Page ranges',
      rangesPlaceholder: 'Example: 2, 5-7',
      angle: 'Rotation angle',
      deg90: '90 degrees',
      deg180: '180 degrees',
      deg270: '270 degrees',
      rotate: 'Rotate PDF',
      reset: 'Reset',
      processing: 'Processing...',
      downloaded: 'Rotated PDF download has started',
      noFile: 'Choose one PDF first.',
      pdfOnly: 'Choose a PDF file.',
      loadError: 'Could not read the PDF. Make sure the file is not damaged.',
      emptyRange: 'Enter at least one page range.',
      invalidRange: 'Invalid page range. Use a format like 2, 5-7.',
      rotateError: 'Could not rotate the PDF. Try a smaller or unencrypted file.',
    },
    privacyNote: 'All PDFs are processed locally in your browser. Files never leave the browser and are never uploaded to this site or a third-party server.',
  },
} satisfies Record<'zh' | 'en', ToolContent>;
