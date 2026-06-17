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
    name: 'QR Code 產生器',
    short: '把網址或文字即時轉成可下載的 QR Code。',
    long: 'QR Code 產生器可以將網址、聯絡資訊、短文字或活動資訊轉成 QR Code。你可以調整容錯等級與尺寸，預覽結果後下載 PNG，或在支援的瀏覽器中直接複製圖片。',
    seoTitle: 'QR Code 產生器｜免費線上 QR 圖片下載',
    seoDescription: '免費線上 QR Code 產生器，支援網址或文字、容錯等級、128/256/512 尺寸、即時預覽、下載 PNG 與複製圖片。',
    keywords: ['QR Code 產生器', 'QR 圖片', 'QRCode', 'QR Code Generator'],
    instructions: [
      '輸入網址或任何要轉成 QR Code 的文字。',
      '選擇容錯等級；一般使用可維持預設 M。',
      '選擇圖片尺寸，工具會在短暫延遲後自動更新預覽。',
      '下載 PNG 檔，或在支援的瀏覽器中複製 QR 圖片。',
    ],
    examples: [
      '為活動報名頁、菜單或問卷連結建立 QR Code。',
      '把 Wi-Fi 說明、短訊息或聯絡方式轉成可掃描圖片。',
      '製作簡報、海報或社群貼文中的 QR 圖片。',
      '測試不同尺寸與容錯等級，選出印刷或螢幕顯示合適的版本。',
    ],
    faq: [
      {
        q: 'QR Code 內容會上傳嗎？',
        a: '不會。QR Code 在瀏覽器中產生，輸入內容不會送到伺服器。',
      },
      {
        q: '容錯等級應該選哪一個？',
        a: '一般網址可使用 M。若 QR Code 會被印刷、縮小或可能被遮擋，可選 Q 或 H。',
      },
      {
        q: '為什麼不能複製圖片？',
        a: '部分瀏覽器尚未支援將 Canvas 圖片寫入剪貼簿；仍可使用下載 PNG。',
      },
      {
        q: '可以輸入非網址文字嗎？',
        a: '可以。QR Code 可包含一般文字，但掃描後會依掃描器支援方式顯示。',
      },
    ],
    labels: {
      inputLabel: '網址或文字',
      placeholder: 'https://example.com',
      correction: '容錯等級',
      size: '尺寸',
      download: '下載 PNG',
      copyImage: '複製圖片',
      copyUnsupported: '此瀏覽器不支援直接複製圖片，請改用下載 PNG。',
      emptyError: '請輸入要產生 QR Code 的內容。',
      renderError: 'QR Code 產生失敗，請縮短內容或調整設定。',
      copied: '已複製圖片',
      canvasAlt: 'QR Code 預覽',
    },
  },
  en: {
    name: 'QR Code Generator',
    short: 'Turn a URL or text into a downloadable QR code.',
    long: 'QR Code Generator converts links, contact details, short text, or event information into a QR code. Adjust error correction and size, preview the result live, then download a PNG or copy the image when the browser supports it.',
    seoTitle: 'QR Code Generator | Free online QR PNG maker',
    seoDescription: 'Generate QR codes for URLs or text with error correction, 128/256/512 sizes, live preview, PNG download, and copy image support.',
    keywords: ['QR code generator', 'QR maker', 'download QR code', 'URL QR code'],
    instructions: [
      'Enter a URL or any text you want to encode.',
      'Choose an error correction level; M is a good default for normal use.',
      'Select the image size. The preview updates automatically after a short delay.',
      'Download the PNG or copy the QR image in browsers that support image clipboard access.',
    ],
    examples: [
      'Create a QR code for an event signup page, menu, or survey link.',
      'Encode Wi-Fi instructions, short notes, or contact information.',
      'Prepare QR images for slides, posters, flyers, or social posts.',
      'Test sizes and error correction levels before printing or sharing.',
    ],
    faq: [
      {
        q: 'Is the QR content uploaded?',
        a: 'No. The QR code is generated in your browser, and your input is not sent to a server.',
      },
      {
        q: 'Which error correction level should I use?',
        a: 'M works for most links. Choose Q or H when the QR code may be printed small, damaged, or partly covered.',
      },
      {
        q: 'Why can I not copy the image?',
        a: 'Some browsers do not support writing canvas images to the clipboard. Download PNG is the fallback.',
      },
      {
        q: 'Can I enter text that is not a URL?',
        a: 'Yes. QR codes can contain plain text, though scanner apps may display it differently.',
      },
    ],
    labels: {
      inputLabel: 'URL or text',
      placeholder: 'https://example.com',
      correction: 'Error correction',
      size: 'Size',
      download: 'Download PNG',
      copyImage: 'Copy Image',
      copyUnsupported: 'This browser cannot copy images directly. Use Download PNG instead.',
      emptyError: 'Enter content to generate a QR code.',
      renderError: 'Could not generate the QR code. Try shorter content or different settings.',
      copied: 'Image copied',
      canvasAlt: 'QR code preview',
    },
  },
} satisfies Record<'zh' | 'en', ToolContent>;

