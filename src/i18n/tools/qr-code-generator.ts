import type { ToolContent } from './_types';

export default {
  zh: {
    name: 'QR Code 產生器',
    short: '把網址、文字、Wi-Fi 資訊或聯絡內容轉成可下載的 QR Code。',
    long: 'QR Code 產生器適合製作活動連結、菜單、問卷、Wi-Fi 說明、聯絡資訊與短文字。輸入內容後可調整容錯等級與尺寸，立即預覽並下載 PNG。QR 內容在瀏覽器內產生，不需要後端服務，適合臨時製作與正式發布前檢查。',
    seoTitle: "QR Code 產生器｜免費製作網址、文字與 Wi-Fi QR Code",
    seoDescription: '免費把網址、文字、Wi-Fi 或聯絡資訊製作成 QR Code，可調整容錯等級與尺寸，預覽後下載 PNG 或複製圖片。',
    keywords: [
      "QR Code 產生器",
      "QR Code 製作",
      "QR 產生器",
      "網址 QR Code",
      "Wi-Fi QR Code",
      "下載 QR Code",
      "QR PNG"
    ],
    capabilities: [
      "把網址、文字、Wi-Fi 說明或聯絡資訊轉成可掃描的 QR Code。",
    ],
    contentSections: [
      {
        heading: "QR Code 產生器適合解決的工作",
        paragraphs: [
          "適合製作活動連結、菜單、問卷、Wi-Fi 說明、聯絡資訊與短文字。它適合臨時製作會議連結，也適合正式印刷前先做測試版，確認手機能快速掃到正確內容。",
          "最常見的錯誤不是產生失敗，而是內容太長、列印太小、對比不足或加 Logo 後沒有實際掃描。短網址通常比很長的追蹤網址更容易掃；加入 Logo 時建議使用 Q 或 H 容錯等級。",
        ],
      },
      {
        heading: "建議使用流程",
        paragraphs: [
          "最常見的錯誤不是產生失敗，而是內容太長、列印太小、對比不足或加 Logo 後沒有實際掃描。短網址通常比很長的追蹤網址更容易掃；加入 Logo 時建議使用 Q 或 H 容錯等級。",
          "你可以下載 PNG，或在支援的瀏覽器中直接複製圖片。若要放進 Canva、PowerPoint、Word 或印刷檔，下載 PNG 通常比較穩定；若只是貼到聊天工具或文件草稿，複製圖片會更快。",
        ],
        items: [
          "列印前用實際尺寸測試，不只看螢幕預覽",
          "深色碼點搭配淺色背景最穩定",
          "加入 Logo 後建議提高容錯等級並反覆掃描",
          "PNG 可放入簡報、海報、菜單、名片與文件",
        ],
      },
      {
        heading: "限制與需要人工判斷的部分",
        paragraphs: [
          "QR Code 本身只是把內容編碼成圖片，不會替你檢查連結是否有效、是否有 HTTPS、是否需要登入或是否會過期。發布前請點開目標網址，確認手機版頁面、表單權限、Wi-Fi 密碼與追蹤參數都正確。",
        ],
      },
    ],
    examples: [
      "把活動報名頁做成 QR Code，放在海報與簡報。",
      "建立 Wi-Fi 說明 QR Code，貼在會議室或店內桌牌。",
      "下載菜單連結 QR Code PNG，交給設計稿使用。",
      "加入 Logo 後用手機實際掃描，確認仍能快速讀取。",
    ],
    audience: [
      "需要快速處理QR Code 產生器工作的人。",
    ],
    caseStudies: [
      {
        title: "??????",
        description: "?????????? QR Code??? PNG ???????????? A4 ??????????",
      },
      {
        title: "??????",
        description: "??????????? QR Code??????????????????????",
      },
      {
        title: "??? Wi-Fi ??",
        description: "?????? Wi-Fi QR Code?????????????????????????",
      },
    ],
    notes: [
      "QR Code 本身只是把內容編碼成圖片，不會替你檢查連結是否有效、是否有 HTTPS、是否需要登入或是否會過期。發布前請點開目標網址，確認手機版頁面、表單權限、Wi-Fi 密碼與追蹤參數都正確。",
    ],
    faq: [
      {
        q: "QR Code 內容會被上傳嗎？",
        a: "產生過程在瀏覽器內完成，輸入內容不需要送到 FunnyTools 後端。",
      },
      {
        q: "加入 Logo 會不會掃不到？",
        a: "有可能。建議使用較高容錯等級，並在下載後用多支手機實際掃描測試。",
      },
      {
        q: "要選多大的尺寸？",
        a: "螢幕分享可用較小尺寸；印刷、海報或遠距掃描建議下載較大 PNG 並保留空白邊界。",
      },
      {
        q: "可以直接複製圖片嗎？",
        a: "支援的瀏覽器可以複製圖片；若失敗，使用下載 PNG 會更穩定。",
      },
      {
        q: "QR Code 會檢查網址安全嗎？",
        a: "不會。請自行確認目標網址、HTTPS、登入權限與是否會過期。",
      },
    ],
    instructions: [
      '輸入要放進 QR Code 的網址、文字、Wi-Fi 說明或聯絡內容。',
      '選擇容錯等級；一般連結可使用 M，需要印刷或小尺寸時可提高到 Q 或 H。',
      '選擇輸出尺寸，預覽圖會在短暫延遲後自動更新。',
      '下載 PNG 圖片，或在支援的瀏覽器中直接複製 QR 圖。',
    ],
    labels: {
      inputLabel: '網址或文字',
      placeholder: 'https://example.com',
      correction: '容錯等級',
      size: '尺寸',
      download: '下載 PNG',
      copyImage: '複製圖片',
      logo: '中央 Logo（選填）',
      logoHint: '加入 Logo 後建議將容錯等級設為 Q 或 H，並下載後實際掃描測試。',
      removeLogo: '移除 Logo',
      logoError: '無法讀取這張圖片，請改用 PNG、JPG 或 WebP。',
      copyUnsupported: '這個瀏覽器無法直接複製圖片，請改用下載 PNG。',
      emptyError: '請輸入要產生 QR Code 的內容。',
      renderError: '無法產生 QR Code，請縮短內容或調整設定。',
      copied: '圖片已複製',
      canvasAlt: 'QR Code 預覽',
    },
    privacyNote: 'QR Code 內容在瀏覽器內產生。本站不會接收、儲存或上傳你輸入的文字或網址。',
  },
  en: {
    name: 'QR Code Generator',
    short: 'Turn a URL, text, Wi-Fi note, or contact details into a downloadable QR code.',
    long: 'QR Code Generator is useful for event links, menus, surveys, Wi-Fi notes, contact details, and short text that should be scannable from a phone. Enter the content, adjust error correction and size, preview the result, then download a PNG. The QR image is generated in your browser without a backend service.',
    seoTitle: "QR Code Generator Online Free | Create QR PNG for URLs and Text",
    seoDescription: 'Generate QR codes for URLs or text with error correction, 128/256/512 sizes, live preview, PNG download, and copy image support.',
    keywords: [
      "QR code generator",
      "QR maker",
      "create QR code",
      "URL QR code",
      "WiFi QR code",
      "download QR code",
      "QR PNG generator"
    ],
    capabilities: [
      "Turn URLs, text, Wi-Fi details, contact info, forms, or menu links into a scannable QR Code.",
    ],
    contentSections: [
      {
        heading: "What QR Code Generator is useful for",
        paragraphs: [
          "Use it for registration forms, menus, surveys, classroom resources, Wi-Fi instructions, contact details, event pages, and short text. The important step is not only generating the code; it is confirming that real phones can scan it where it will be used.",
          "Many QR Code problems happen after generation: the content is too long, the printed code is too small, contrast is weak, or a logo covers too much of the pattern. Short URLs usually scan faster than long tracking URLs.",
        ],
      },
      {
        heading: "Recommended workflow",
        paragraphs: [
          "Many QR Code problems happen after generation: the content is too long, the printed code is too small, contrast is weak, or a logo covers too much of the pattern. Short URLs usually scan faster than long tracking URLs.",
          "Use the PNG download for Canva, PowerPoint, Word, posters, menus, name cards, and print files because it gives you a reusable image. Copy image is convenient for chat, drafts, or quick documents when your browser supports it.",
        ],
        items: [
          "Test at final print size, not only on your monitor",
          "Keep enough blank margin around the QR Code",
          "Use higher error correction when adding a logo",
          "Prefer strong contrast for posters, menus, and handouts",
        ],
      },
      {
        heading: "Limits and human checks",
        paragraphs: [
          "The QR Code image does not validate the destination for you. Before publishing, open the URL on a phone, confirm HTTPS, check form permissions, test Wi-Fi details, and make sure the page is mobile-friendly.",
          "The QR Code image does not validate the destination for you. Before publishing, open the URL on a phone, confirm HTTPS, check form permissions, test Wi-Fi details, and make sure the page is mobile-friendly. After using the tool, move the result into the next workflow step: download it, copy it, paste it into Excel or Google Sheets, add it to a document, or test it in the real publishing environment.",
        ],
      },
    ],
    examples: [
      "Create a QR Code for an event registration page and place it on a poster.",
      "Generate a Wi-Fi instruction QR Code for a meeting room or shop table.",
      "Download a menu link QR Code PNG for a printed table card.",
      "Add a logo, then scan the final image on multiple phones before printing.",
    ],
    audience: [
      "People who need a quick qr code generator workflow in the browser.",
    ],
    caseStudies: [
      {
        title: "Event poster",
        description: "A planner generates a registration QR Code, downloads PNG, places it in a poster, and tests scanning from the printed A4 proof.",
      },
      {
        title: "Restaurant menu card",
        description: "A shop creates a menu QR Code for table cards and checks that it still scans under dim indoor lighting.",
      },
      {
        title: "Meeting room Wi-Fi",
        description: "An office admin creates a Wi-Fi QR Code and verifies the network name, password, and guest access before printing instructions.",
      },
    ],
    notes: [
      "The QR Code image does not validate the destination for you. Before publishing, open the URL on a phone, confirm HTTPS, check form permissions, test Wi-Fi details, and make sure the page is mobile-friendly.",
    ],
    faq: [
      {
        q: "Is the QR content uploaded?",
        a: "No. The QR Code is generated in your browser and does not require sending the input to a FunnyTools backend.",
      },
      {
        q: "Can a logo make the QR Code unreadable?",
        a: "Yes. Use higher error correction and test the downloaded image on multiple phones.",
      },
      {
        q: "What size should I choose?",
        a: "Use smaller sizes for screen sharing and larger PNG output for print, posters, or scanning from a distance.",
      },
      {
        q: "Can I copy the image directly?",
        a: "Some browsers support direct image copy. If it fails, download the PNG instead.",
      },
      {
        q: "Does the tool check whether the URL is safe?",
        a: "No. Open the destination yourself and confirm HTTPS, permissions, mobile layout, and expiration before publishing.",
      },
    ],
    instructions: [
      'Enter the URL, text, Wi-Fi note, or contact details you want to encode.',
      'Choose an error correction level; M is a good default, while Q or H can help for print or small sizes.',
      'Select the image size. The preview updates automatically after a short delay.',
      'Download the PNG or copy the QR image in browsers that support image clipboard access.',
    ],
    labels: {
      inputLabel: 'URL or text',
      placeholder: 'https://example.com',
      correction: 'Error correction',
      size: 'Size',
      download: 'Download PNG',
      copyImage: 'Copy Image',
      logo: 'Center logo (optional)',
      logoHint: 'After adding a logo, set error correction to Q or H and scan-test the downloaded image.',
      removeLogo: 'Remove logo',
      logoError: 'Could not read this image. Try a PNG, JPG, or WebP file.',
      copyUnsupported: 'This browser cannot copy images directly. Use Download PNG instead.',
      emptyError: 'Enter content to generate a QR code.',
      renderError: 'Could not generate the QR code. Try shorter content or different settings.',
      copied: 'Image copied',
      canvasAlt: 'QR code preview',
    },
    privacyNote: 'QR code generation runs locally in your browser. This site does not receive, store, or upload the text or URL you enter.',
  },
} satisfies Record<'zh' | 'en', ToolContent>;
