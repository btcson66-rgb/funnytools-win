import type { ToolContent } from './_types';

export default {
  zh: {
    name: '圖片壓縮',
    short: '在瀏覽器內壓縮 JPG、PNG、WebP 圖片，快速取得較小的下載檔。',
    long: '圖片壓縮工具適合處理社群貼文、頭像、商品圖、截圖與部落格配圖。你可以調整品質、比較壓縮前後大小，並選擇保留格式或輸出 JPEG、WebP。處理過程在瀏覽器內完成，原圖不會上傳到伺服器，也能協助降低頁面載入負擔。',
    seoTitle: '圖片壓縮｜免費縮小 JPG、PNG 與 WebP 檔案',
    seoDescription: '免費壓縮 JPG、PNG、WebP 圖片，可調整品質、切換輸出格式，並比較壓縮前後容量。圖片只在瀏覽器處理，不會上傳。',
    keywords: ['圖片壓縮', 'JPG 壓縮', 'PNG 壓縮', 'WebP 壓縮', 'image compressor'],
    capabilities: [
      '壓縮 JPG、PNG 與 WebP，即時比較原始容量、輸出容量與節省比例。',
      '透過品質滑桿在清晰度與檔案大小之間取得平衡。',
      '保留原格式，或轉成 JPEG、WebP，方便網站、社群與附件使用。',
    ],
    instructions: [
      '選擇一張 JPG、PNG 或 WebP 圖片，先確認原始預覽與檔案大小。',
      '調整品質滑桿，並選擇保留原格式、JPEG 或 WebP 輸出。',
      '比較原始大小、壓縮後大小與節省比例，確認畫質仍可接受。',
      '下載新的圖片檔，或清除目前圖片後處理下一張。',
    ],
    examples: [
      '把商品圖壓小後再上架，讓頁面載入速度更穩定。',
      '縮小社群貼文、頭像或封面圖，方便上傳到平台。',
      '壓縮截圖與教學圖片，降低寄信或分享時的附件大小。',
      '在本機比較 JPEG 與 WebP 的檔案大小，再決定發布格式。',
    ],
    audience: [
      '需要快速準備商品圖、活動圖或社群素材的站長與行銷人員。',
      '想把截圖、照片或簡報圖片壓小後再寄出的辦公室使用者。',
      '希望圖片留在本機處理、不想上傳到外部服務的人。',
      '正在優化網頁速度、部落格配圖或作品集圖片的創作者。',
    ],
    caseStudies: [
      {
        title: '商品圖上架前壓縮',
        description: '小型商店先把多張商品照片壓縮成較小檔案，再放進商品頁，讓手機使用者開頁更快，也減少圖片過大造成的跳出率。',
      },
      {
        title: '社群封面快速輸出',
        description: '行銷人員把活動主視覺轉成 WebP，確認畫質仍清楚後下載，讓社群排程與網站橫幅可以共用同一張輕量圖片。',
      },
      {
        title: '截圖教學整理',
        description: '客服團隊把操作截圖壓縮後放進說明文件，降低文件總容量，同時保留足夠清楚的按鈕與文字細節。',
      },
    ],
    notes: [
      'JPEG 與 WebP 屬於有損壓縮，品質調太低可能出現模糊、色塊或細節消失。',
      '透明 PNG 轉成 JPEG 會失去透明背景；需要透明效果時請保留 PNG 或改用 WebP。',
      '檔案非常大或像素過高時會消耗較多瀏覽器記憶體，建議分批處理。',
    ],
    faq: [
      {
        q: '我的圖片會被上傳嗎？',
        a: '不會。圖片在你的瀏覽器內讀取與壓縮，本站不會接收、儲存或上傳原始檔與輸出檔。',
      },
      {
        q: '為什麼 PNG 壓縮後沒有變小很多？',
        a: 'PNG 常用於透明或無失真圖片，品質滑桿不一定能明顯降低容量。若可接受有損壓縮，可改選 JPEG 或 WebP。',
      },
      {
        q: '壓縮會覆蓋我的原始圖片嗎？',
        a: '不會。工具只產生一個新的下載檔，原始圖片仍保留在你的裝置中。',
      },
      {
        q: 'WebP 適合所有地方使用嗎？',
        a: '大多數現代瀏覽器支援 WebP，但少數舊系統或特定平台可能不支援。正式發布前請確認目標平台能開啟。',
      },
      {
        q: '壓縮後畫質看起來不好怎麼辦？',
        a: '提高品質滑桿、改用保留原格式，或重新從較高解析度原圖處理。不要用已嚴重壓縮的圖片重複壓縮太多次。',
      },
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
    seoTitle: 'Image Compressor | Free local JPG PNG WebP compression',
    seoDescription: 'Compress JPG, PNG, and WebP images locally in your browser with quality and format controls. Files are never uploaded.',
    keywords: ['image compressor', 'compress jpg', 'compress png', 'compress webp', 'local image compression'],
    instructions: [
      'Choose a JPG, PNG, or WebP image and review the input preview.',
      'Adjust the quality slider and choose Keep, JPEG, or WebP output.',
      'Compare original size, compressed size, and the saved percentage.',
      'Download the new image or clear the file to start again.',
    ],
    examples: [
      'Shrink product images before uploading them to a store page.',
      'Prepare smaller avatars, covers, and social media graphics.',
      'Compress screenshots for help docs, email, or team chat.',
      'Compare JPEG and WebP output sizes before publishing.',
    ],
    audience: [
      'Site owners and marketers preparing product photos, banners, or campaign graphics.',
      'Office users who need smaller screenshots, photos, or report images for sharing.',
      'Creators who want local image processing instead of uploading private files.',
      'Bloggers, designers, and portfolio owners improving page weight and load speed.',
    ],
    caseStudies: [
      {
        title: 'Product page image cleanup',
        description: 'A small shop compresses product photos before publishing them, improving mobile load time while keeping enough visual detail for customers to inspect the item.',
      },
      {
        title: 'Social cover export',
        description: 'A marketer converts a campaign image to WebP, checks that the text still looks sharp, and downloads a lighter version for both the site banner and scheduled social post.',
      },
      {
        title: 'Screenshot documentation',
        description: 'A support team compresses step-by-step screenshots before adding them to a help article, reducing document size while keeping buttons and labels readable.',
      },
    ],
    notes: [
      'JPEG and WebP are lossy formats, so very low quality settings can introduce blur, blockiness, or lost detail.',
      'Converting transparent PNG files to JPEG removes transparency; keep PNG or use WebP if transparency matters.',
      'Very large images can use significant browser memory, so process oversized files in smaller batches.',
    ],
    faq: [
      {
        q: 'Are my images uploaded?',
        a: 'No. Files stay on your device, are processed locally in your browser, and are never uploaded or stored by this site.',
      },
      {
        q: 'Why does a PNG sometimes stay large?',
        a: 'PNG is often used for lossless or transparent graphics, so the quality slider may not reduce it much. Choose JPEG or WebP when a smaller file matters more.',
      },
      {
        q: 'Does compression overwrite my original file?',
        a: 'No. The tool creates a separate downloadable file and does not modify the original image on your device.',
      },
      {
        q: 'Is WebP safe to use everywhere?',
        a: 'Most modern browsers support WebP, but some older systems or upload platforms may not. Check your target platform before publishing.',
      },
      {
        q: 'What should I do if the output looks poor?',
        a: 'Raise the quality setting, keep the original format, or start again from a higher quality source image. Avoid repeatedly compressing the same already-compressed file.',
      },
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
