import type { ToolContent } from './_types';

export default {
  zh: {
    name: 'QR Code 產生器',
    short: '把網址、文字、Wi-Fi 資訊或聯絡內容轉成可下載的 QR Code。',
    long: 'QR Code 產生器適合製作活動連結、菜單、問卷、Wi-Fi 說明、聯絡資訊與短文字。輸入內容後可調整容錯等級與尺寸，立即預覽並下載 PNG。QR 內容在瀏覽器內產生，不需要後端服務，適合臨時製作與正式發布前檢查。',
    seoTitle: 'QR Code 產生器｜免費製作網址與文字 QR Code',
    seoDescription: '免費把網址、文字、Wi-Fi 或聯絡資訊製作成 QR Code，可調整容錯等級與尺寸，預覽後下載 PNG 或複製圖片。',
    keywords: ['QR Code 產生器', 'QR 製作', 'QRCode', 'QR Code Generator', '下載 QR Code'],
    capabilities: [
      '把網址、短文字、Wi-Fi 說明或聯絡資訊轉成手機可掃描的 QR Code。',
      '依列印尺寸與使用環境選擇容錯等級，並輸出 128、256 或 512 像素 PNG。',
      '產生後可先預覽、複製圖片或下載，方便放入海報、菜單、名片與簡報。',
    ],
    instructions: [
      '輸入要放進 QR Code 的網址、文字、Wi-Fi 說明或聯絡內容。',
      '選擇容錯等級；一般連結可使用 M，需要印刷或小尺寸時可提高到 Q 或 H。',
      '選擇輸出尺寸，預覽圖會在短暫延遲後自動更新。',
      '下載 PNG 圖片，或在支援的瀏覽器中直接複製 QR 圖。',
    ],
    examples: [
      '為活動報名頁、餐廳菜單或問卷連結產生 QR Code。',
      '把 Wi-Fi 名稱與密碼說明整理成可掃描的短文字。',
      '為名片、傳單、簡報或海報準備可下載的 QR 圖片。',
      '測試不同尺寸與容錯等級，確認列印或分享後容易掃描。',
    ],
    audience: [
      '需要快速製作活動連結、表單、菜單或店內告示 QR 的行銷與店家。',
      '準備簡報、課堂資料、展場海報或傳單的辦公室與教學使用者。',
      '想把短文字、Wi-Fi 說明或聯絡資訊做成可掃描圖片的人。',
      '需要本機產生 QR 圖，不想把內容送到外部 API 的使用者。',
    ],
    caseStudies: [
      {
        title: '活動報名入口',
        description: '活動主辦方把報名表網址轉成 QR Code，放在海報與投影片上，現場來賓用手機掃描即可開啟表單。',
      },
      {
        title: '店內菜單與問卷',
        description: '餐飲店把線上菜單與滿意度問卷分別做成 QR 圖，列印在桌牌上，減少人工輸入網址的麻煩。',
      },
      {
        title: '課堂資料分享',
        description: '老師把補充教材連結轉成 QR Code 放進簡報，學生掃描後直接開啟資料，不需要等待逐字輸入連結。',
      },
    ],
    notes: [
      'QR Code 能容納文字，但內容越長圖形越密，掃描難度也會提高。',
      '可選擇加入中央 Logo（在瀏覽器本機合成，圖片不會上傳）；Logo 會遮住部分圖形，建議將容錯等級設為 Q 或 H 並實測掃描。',
      '準備印刷時請先用手機實測，並保留足夠白邊與對比。',
      'QR Code 本身不驗證連結安全性；公開分享前請確認網址正確且可信。',
    ],
    faq: [
      {
        q: 'QR 內容會被上傳嗎？',
        a: '不會。QR Code 在你的瀏覽器內產生，輸入內容不會送到本站伺服器。',
      },
      {
        q: '容錯等級要選哪一個？',
        a: '一般網址可使用 M。若 QR 會被印得很小、可能磨損或被部分遮住，可改用 Q 或 H。',
      },
      {
        q: '可以輸入不是網址的內容嗎？',
        a: '可以。QR Code 可包含純文字、聯絡資訊或 Wi-Fi 說明，但掃描 App 顯示方式可能不同。',
      },
      {
        q: '為什麼複製圖片不能用？',
        a: '部分瀏覽器不支援把 Canvas 圖片寫入剪貼簿。遇到這種情況請使用下載 PNG。',
      },
      {
        q: '列印 QR Code 前要注意什麼？',
        a: '請確認尺寸足夠、背景對比明顯、四周有白邊，並用目標手機或掃描 App 實測。',
      },
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
    seoTitle: 'QR Code Generator | Free online QR PNG maker',
    seoDescription: 'Generate QR codes for URLs or text with error correction, 128/256/512 sizes, live preview, PNG download, and copy image support.',
    keywords: ['QR code generator', 'QR maker', 'download QR code', 'URL QR code'],
    instructions: [
      'Enter the URL, text, Wi-Fi note, or contact details you want to encode.',
      'Choose an error correction level; M is a good default, while Q or H can help for print or small sizes.',
      'Select the image size. The preview updates automatically after a short delay.',
      'Download the PNG or copy the QR image in browsers that support image clipboard access.',
    ],
    examples: [
      'Create a QR code for an event signup page, menu, or survey link.',
      'Encode Wi-Fi instructions, short notes, or contact information.',
      'Prepare QR images for business cards, slides, posters, flyers, or social posts.',
      'Test sizes and error correction levels before printing or sharing.',
    ],
    audience: [
      'Marketers and shop owners creating QR codes for events, forms, menus, or in-store notices.',
      'Office and classroom users preparing slides, handouts, posters, or quick access links.',
      'People turning short text, Wi-Fi instructions, or contact details into a scannable image.',
      'Users who prefer browser-side QR generation instead of sending content to an external API.',
    ],
    caseStudies: [
      {
        title: 'Event signup access',
        description: 'An organizer turns a registration form URL into a QR code for posters and slides, so visitors can scan the code and open the form immediately on their phones.',
      },
      {
        title: 'Menu and survey cards',
        description: 'A restaurant creates separate QR images for a digital menu and feedback survey, then prints them on table cards to reduce manual URL entry.',
      },
      {
        title: 'Class material link',
        description: 'A teacher adds a QR code for supplementary reading to a slide deck, letting students open the resource quickly without typing a long link.',
      },
    ],
    notes: [
      'QR codes can contain plain text, but longer content creates denser patterns and can be harder to scan.',
      'You can add an optional center logo (composited locally in your browser; the image is not uploaded). A logo covers part of the pattern, so set error correction to Q or H and scan-test it.',
      'For print, test the code with a phone and keep enough white margin and contrast around the image.',
      'A QR code does not verify link safety; check the target URL before sharing it publicly.',
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
        q: 'Can I enter text that is not a URL?',
        a: 'Yes. QR codes can contain plain text, contact details, or Wi-Fi notes, though scanner apps may display them differently.',
      },
      {
        q: 'Why can I not copy the image?',
        a: 'Some browsers do not support writing canvas images to the clipboard. Download PNG is the fallback.',
      },
      {
        q: 'What should I check before printing?',
        a: 'Make sure the code is large enough, has strong contrast, includes quiet space around it, and scans correctly on the phones your audience will use.',
      },
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
