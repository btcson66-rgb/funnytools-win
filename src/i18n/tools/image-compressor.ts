import type { ToolContent } from './_types';

export default {
  zh: {
    name: '圖片壓縮',
    short: '在瀏覽器內壓縮 JPG、PNG、WebP 圖片，快速取得較小的下載檔。',
    long: '圖片壓縮工具適合處理社群貼文、頭像、商品圖、截圖與部落格配圖。你可以調整品質、比較壓縮前後大小，並選擇保留格式或輸出 JPEG、WebP。處理過程在瀏覽器內完成，原圖不會上傳到伺服器，也能協助降低頁面載入負擔。',
    seoTitle: "圖片壓縮工具｜免費線上壓縮，不上傳更安心",
    seoDescription: '免費線上壓縮 JPG、PNG、WebP 圖片，即時比較壓縮前後容量與畫質，全程在瀏覽器本機處理，不上傳、不外流。',
    keywords: [
      "圖片壓縮",
      "壓縮 JPG",
      "壓縮 PNG",
      "壓縮 WebP",
      "image compressor",
      "照片壓縮",
      "本機圖片壓縮"
    ],
    capabilities: [
      "在瀏覽器內壓縮 JPG、PNG、WebP，並比較原始與輸出檔案大小。",
    ],
    contentSections: [
      {
        heading: "圖片壓縮工具適合解決的工作",
        paragraphs: [
          "適合處理網站配圖、商品照、社群素材、截圖、履歷附件與表單上傳限制。大型圖片會增加頁面載入時間，也可能超過平台上傳上限；透過調整品質與輸出格式，你可以在可接受畫質下取得更小的檔案。",
          "照片類圖片通常適合輸出 JPEG 或 WebP；需要透明背景的圖片則要小心，因為轉成 JPEG 會失去透明度。建議先以中等品質測試，再放大預覽文字邊緣、臉部、商品細節與陰影。",
        ],
      },
      {
        heading: "建議使用流程",
        paragraphs: [
          "照片類圖片通常適合輸出 JPEG 或 WebP；需要透明背景的圖片則要小心，因為轉成 JPEG 會失去透明度。建議先以中等品質測試，再放大預覽文字邊緣、臉部、商品細節與陰影。",
          "下載後不要直接覆蓋原圖，先用新檔名保存；如果要放進 CMS、電商後台或簡報，請再檢查實際顯示尺寸。",
        ],
        items: [
          "照片通常可降低品質取得明顯容量改善",
          "含文字、線條或截圖的圖片壓太低會出現模糊與雜訊",
          "需要透明背景時，不要隨意輸出成 JPEG",
          "下載後保留原圖，避免之後無法重新調整",
        ],
      },
      {
        heading: "限制與需要人工判斷的部分",
        paragraphs: [
          "壓縮不能修復模糊、曝光錯誤或過小的原始圖片；它只能在現有像素基礎上重新編碼。若圖片尺寸遠大於網站實際顯示寬度，先調整尺寸再壓縮通常更有效。",
        ],
      },
    ],
    examples: [
      "把部落格封面壓到較小容量後再上傳 CMS。",
      "壓縮商品圖，降低電商頁面載入負擔。",
      "將截圖或證明文件壓縮到表單附件限制內。",
      "下載 WebP 版本作為網站圖片，再保留原始檔備份。",
    ],
    audience: [
      "需要快速處理圖片壓縮工作的人。",
    ],
    caseStudies: [
      {
        title: "???????",
        description: "??? 3 MB ?????????? JPEG?????? CMS????????????????????",
      },
      {
        title: "??????",
        description: "?????? WebP ???????????????????????????????????",
      },
      {
        title: "??????",
        description: "?????????????????????????????????????????",
      },
    ],
    notes: [
      "壓縮不能修復模糊、曝光錯誤或過小的原始圖片；它只能在現有像素基礎上重新編碼。若圖片尺寸遠大於網站實際顯示寬度，先調整尺寸再壓縮通常更有效。",
    ],
    faq: [
      {
        q: "圖片會上傳到伺服器嗎？",
        a: "不會。壓縮在你的瀏覽器內完成，原圖與輸出圖不會傳到 FunnyTools。",
      },
      {
        q: "JPEG、WebP 要怎麼選？",
        a: "網站圖片通常可考慮 WebP；需要舊系統相容或文件附件時，JPEG 可能更穩定。",
      },
      {
        q: "壓縮後圖片變糊怎麼辦？",
        a: "提高品質設定，或先確認原圖是否已經過小、模糊或含有細小文字。",
      },
      {
        q: "可以保留透明背景嗎？",
        a: "如果透明背景很重要，請避免輸出 JPEG；JPEG 不支援透明度。",
      },
      {
        q: "壓縮後可以直接用在網站嗎？",
        a: "可以下載使用，但建議在實際頁面檢查尺寸、清晰度、檔名、alt text 與載入表現。",
      },
    ],


    instructions: [
      '選擇一張 JPG、PNG 或 WebP 圖片，先確認原始預覽與檔案大小。',
      '調整品質滑桿，並選擇保留原格式、JPEG 或 WebP 輸出。',
      '比較原始大小、壓縮後大小與節省比例，確認畫質仍可接受。',
      '下載新的圖片檔，或清除目前圖片後處理下一張。',
    ],





    labels: {
      upload: '選擇圖片',
      quality: '品質',
      format: '輸出格式',
      keepFormat: '保留原格式',
      jpeg: 'JPEG',
      webp: 'WebP',
      sourcePreview: '原始預覽',
      outputPreview: '輸出預覽',
      originalSize: '原始大小',
      compressedSize: '壓縮後大小',
      saved: '節省',
      waiting: '請先選擇圖片',
      download: '下載圖片',
      reset: '清除',
      invalidType: '請選擇有效的圖片檔。',
      tooLarge: '這張圖片太大，請使用 20 MB 以下且像素較少的檔案。',
      processError: '無法處理這張圖片，請改用其他檔案。',
      localNote: '圖片會在你的瀏覽器內處理，不會上傳到伺服器。',
    },
    privacyNote: '圖片壓縮在瀏覽器本機完成。本站不會接收、儲存或上傳你選擇的圖片檔。',
  },
  en: {
    name: 'Image Compressor',
    short: 'Reduce JPG, PNG, and WebP file size locally in the browser.',
    long: 'Image Compressor is built for social posts, avatars, product images, screenshots, and blog graphics that need a smaller file before publishing or sharing. Adjust quality, compare the before-and-after size, and choose whether to keep the format or export JPEG or WebP. Processing happens in your browser, so the original image is not uploaded.',
    seoTitle: "Free Image Compressor Online | Shrink JPG, PNG & WebP Fast",
    seoDescription: 'Compress JPG, PNG, and WebP images free online. Adjust quality, compare before/after size, and keep files private — nothing is uploaded.',
    keywords: [
      "image compressor",
      "compress JPG",
      "compress PNG",
      "compress WebP",
      "photo compressor",
      "reduce image size",
      "local image compression"
    ],
    capabilities: [
      "Compress JPG, PNG, and WebP images locally in the browser and compare size savings.",
    ],
    contentSections: [
      {
        heading: "What Image Compressor is useful for",
        paragraphs: [
          "Use it when pictures are too large for a website, form upload, email attachment, slide deck, product page, or social workflow. Oversized files slow page loads and can fail upload limits, so the goal is to reduce size while keeping the image acceptable.",
          "Photo-like images usually compress well as JPEG or WebP. Screenshots, text-heavy graphics, logos, and line art need more careful checking because aggressive compression can blur edges or create artifacts.",
        ],
      },
      {
        heading: "Recommended workflow",
        paragraphs: [
          "Photo-like images usually compress well as JPEG or WebP. Screenshots, text-heavy graphics, logos, and line art need more careful checking because aggressive compression can blur edges or create artifacts.",
          "Download with a new file name instead of overwriting the source. If the image will appear in a CMS, ecommerce page, or presentation, check the real display size after uploading or inserting it.",
        ],
        items: [
          "Use WebP for modern website delivery when supported",
          "Use JPEG when compatibility is more important than transparency",
          "Inspect text and fine edges before accepting a low-quality output",
          "Keep the original file so you can recompress later",
        ],
      },
      {
        heading: "Limits and human checks",
        paragraphs: [
          "Compression cannot repair a blurry, badly exposed, or too-small original. If the source image is much larger than the size displayed on your site, resize it first, then compress.",
          "Compression cannot repair a blurry, badly exposed, or too-small original. If the source image is much larger than the size displayed on your site, resize it first, then compress. After using the tool, move the result into the next workflow step: download it, copy it, paste it into Excel or Google Sheets, add it to a document, or test it in the real publishing environment.",
        ],
      },
    ],
    examples: [
      "Reduce a blog cover before uploading it to a CMS.",
      "Compress product photos to improve ecommerce page loading.",
      "Shrink screenshots or proof documents to fit a form upload limit.",
      "Download a WebP version for a website while keeping the source file.",
    ],
    audience: [
      "People who need a quick image compressor workflow in the browser.",
    ],
    caseStudies: [
      {
        title: "Blog cover optimization",
        description: "An editor compresses a 3 MB article cover, downloads a smaller JPEG, and checks the mobile article page before publishing.",
      },
      {
        title: "Product photo workflow",
        description: "An ecommerce operator tests WebP output for product photos, keeps the original files, and verifies that edges, texture, and color still look acceptable on the product page.",
      },
      {
        title: "Upload limit fix",
        description: "An applicant compresses a screenshot or proof document until it fits the form limit, then reopens the downloaded file to confirm the text remains readable.",
      },
    ],
    notes: [
      "Compression cannot repair a blurry, badly exposed, or too-small original. If the source image is much larger than the size displayed on your site, resize it first, then compress.",
    ],
    faq: [
      {
        q: "Are my images uploaded?",
        a: "No. Compression runs in your browser, and the original image is not sent to FunnyTools.",
      },
      {
        q: "Should I choose JPEG or WebP?",
        a: "Use WebP for modern website delivery when supported. Use JPEG when compatibility with forms, documents, or older systems matters.",
      },
      {
        q: "Why does the image look blurry after compression?",
        a: "The quality setting may be too low, or the source image may already be small or text-heavy. Increase quality and inspect the result.",
      },
      {
        q: "Can transparency be preserved?",
        a: "Avoid JPEG when transparency matters because JPEG does not support transparent pixels.",
      },
      {
        q: "Can I use the output directly on my site?",
        a: "Yes, but test it in the real page and check display size, sharpness, alt text, and loading performance.",
      },
    ],

    instructions: [
      'Choose a JPG, PNG, or WebP image and review the input preview.',
      'Adjust the quality slider and choose Keep, JPEG, or WebP output.',
      'Compare original size, compressed size, and the saved percentage.',
      'Download the new image or clear the file to start again.',
    ],





    labels: {
      upload: 'Choose image',
      quality: 'Quality',
      format: 'Output format',
      keepFormat: 'Keep original',
      jpeg: 'JPEG',
      webp: 'WebP',
      sourcePreview: 'Input preview',
      outputPreview: 'Output preview',
      originalSize: 'Original size',
      compressedSize: 'Compressed size',
      saved: 'Saved',
      waiting: 'Choose an image first',
      download: 'Download image',
      reset: 'Clear',
      invalidType: 'Choose a valid image file.',
      tooLarge: 'This image is too large. Use a file under 20 MB with fewer pixels.',
      processError: 'Could not process this image. Try another file.',
      localNote: 'Files are processed locally in your browser and never uploaded.',
    },
    privacyNote: 'Image compression runs locally in your browser. This site does not receive, store, or upload the image file you choose.',
  },
} satisfies Record<'zh' | 'en', ToolContent>;
