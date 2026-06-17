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
    name: '線上繪圖板',
    short: '用筆刷、顏色與橡皮擦在白色畫布手繪，支援復原與 PNG 匯出。',
    long: '線上繪圖板是一個簡單的本機手繪畫布，可調整筆刷顏色與粗細，切換橡皮擦，復原上一筆，清空畫布，並把作品匯出成 PNG 圖片。',
    seoTitle: '線上繪圖板｜免費手繪畫布與 PNG 匯出',
    seoDescription: '免費線上繪圖板，可在瀏覽器中手繪、調整顏色與筆刷大小、使用橡皮擦、復原、清除並匯出 PNG。',
    keywords: ['線上繪圖板', '手繪畫布', 'sketchpad', '畫圖工具', 'PNG 匯出'],
    instructions: [
      '選擇筆刷顏色並調整筆刷大小。',
      '在白色畫布上用滑鼠、觸控板或手指直接繪圖。',
      '需要擦除時開啟橡皮擦；畫錯可按復原移除上一筆。',
      '完成後按匯出 PNG 下載目前畫布。',
    ],
    examples: [
      '快速畫草稿、簽名、批註、課堂白板或社群貼圖概念。',
      '在手機或平板上用手指記錄簡單圖形與想法。',
      '匯出 PNG 後貼到文件、簡報、聊天或筆記中。',
    ],
    faq: [
      {
        q: '這個繪圖板會自動儲存嗎？',
        a: '不會。請在離開頁面前匯出 PNG。重新整理或關閉頁面後，畫布內容通常會消失。',
      },
      {
        q: '橡皮擦會讓背景透明嗎？',
        a: '不會。此工具使用白色畫布，橡皮擦會以白色覆蓋筆跡，匯出的 PNG 也是白底圖片。',
      },
      {
        q: '可以在手機上使用嗎？',
        a: '可以。畫布支援 Pointer Events，通常可用手指或觸控筆繪圖。',
      },
    ],
    labels: {
      localNote: '所有筆跡都在本機瀏覽器中處理。',
      color: '筆刷顏色',
      brushSize: '筆刷大小',
      pixels: 'px',
      eraser: '橡皮擦',
      undo: '復原',
      clear: '清除',
      exportPng: '匯出 PNG',
      canvasLabel: '線上繪圖板畫布',
      confirmClear: '要清除整張畫布嗎？',
    },
    privacyNote: '繪圖內容保留在你的瀏覽器畫布中，匯出 PNG 時也在本機產生，不會上傳圖片。',
  },
  en: {
    name: 'Online Sketchpad',
    short: 'Draw freehand with brush color, size, eraser, undo, clear, and PNG export.',
    long: 'Online Sketchpad is a simple local drawing canvas. Choose a brush color and size, toggle the eraser, undo the last stroke, clear the canvas, and export your drawing as a PNG image.',
    seoTitle: 'Online Sketchpad | Free browser drawing canvas with PNG export',
    seoDescription: 'Draw online in your browser with brush color, brush size, eraser, undo, clear, and PNG export. Works with mouse and touch.',
    keywords: ['online sketchpad', 'drawing canvas', 'freehand drawing', 'browser drawing tool', 'PNG export'],
    instructions: [
      'Pick a brush color and adjust the brush size.',
      'Draw on the white canvas with a mouse, trackpad, finger, or stylus.',
      'Turn on the eraser when needed, and use undo to remove the previous stroke.',
      'Export PNG to download the current canvas.',
    ],
    examples: [
      'Make quick sketches, signatures, annotations, classroom whiteboard notes, or sticker ideas.',
      'Capture simple shapes and thoughts from a phone or tablet.',
      'Export a PNG for documents, slides, chat, or notes.',
    ],
    faq: [
      {
        q: 'Does the sketchpad autosave?',
        a: 'No. Export a PNG before leaving the page. Reloading or closing the page usually removes the drawing.',
      },
      {
        q: 'Does the eraser create transparency?',
        a: 'No. This tool uses a white canvas, so the eraser paints white over strokes and the exported PNG has a white background.',
      },
      {
        q: 'Does it work on mobile?',
        a: 'Yes. The canvas uses Pointer Events, so drawing usually works with touch and stylus input.',
      },
    ],
    labels: {
      localNote: 'All strokes are processed locally in your browser.',
      color: 'Brush color',
      brushSize: 'Brush size',
      pixels: 'px',
      eraser: 'Eraser',
      undo: 'Undo',
      clear: 'Clear',
      exportPng: 'Export PNG',
      canvasLabel: 'Online sketchpad canvas',
      confirmClear: 'Clear the whole canvas?',
    },
    privacyNote: 'Your drawing stays in the browser canvas. PNG export is generated locally and the image is not uploaded.',
  },
} satisfies Record<'zh' | 'en', ToolContent>;
