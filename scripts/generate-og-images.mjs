import { mkdir, writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const outDir = new URL('../public/og/', import.meta.url);
await mkdir(outDir, { recursive: true });

const palettes = {
  money: ['薪資與金錢', 'Money & Salary', '#f59e0b'],
  time: ['工作與時間', 'Work & Time', '#0ea5e9'],
  random: ['隨機工具', 'Random Tools', '#8b5cf6'],
  text: ['文字與寫作', 'Text & Writing', '#14b8a6'],
  image: ['圖片與檔案', 'Image & File', '#ec4899'],
  pdf: ['PDF 工具', 'PDF Tools', '#ef4444'],
  draw: ['製圖工具', 'Drawing & CAD', '#f97316'],
  study: ['學生與老師', 'Student & Teacher', '#22c55e'],
  personality: ['趣味測驗', 'Personality Quizzes', '#6366f1'],
  statistics: ['教育與統計', 'Education & Statistics', '#06b6d4'],
};

function escapeXml(value) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}

function card(locale, zh, en, accent) {
  const title = locale === 'zh' ? zh : en;
  const subtitle = locale === 'zh' ? '免費線上工具 · 無需註冊' : 'Free online tools · No registration';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#0f172a"/><stop offset="1" stop-color="#134e4a"/>
      </linearGradient>
      <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="${accent}"/><stop offset="1" stop-color="#5eead4"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#bg)"/>
    <circle cx="1030" cy="-10" r="310" fill="${accent}" opacity=".14"/>
    <circle cx="1110" cy="560" r="230" fill="#2dd4bf" opacity=".09"/>
    <rect x="84" y="92" width="116" height="12" rx="6" fill="url(#accent)"/>
    <text x="84" y="190" fill="#f8fafc" font-family="Arial, 'Noto Sans TC', sans-serif" font-size="68" font-weight="700">${escapeXml(title)}</text>
    <text x="84" y="262" fill="#cbd5e1" font-family="Arial, 'Noto Sans TC', sans-serif" font-size="30">${escapeXml(subtitle)}</text>
    <rect x="84" y="365" width="1032" height="2" fill="#334155"/>
    <text x="84" y="470" fill="#5eead4" font-family="Arial, sans-serif" font-size="42" font-weight="700">FunnyTools</text>
    <text x="84" y="520" fill="#94a3b8" font-family="Arial, 'Noto Sans TC', sans-serif" font-size="24">${locale === 'zh' ? '把日常任務在瀏覽器裡完成' : 'Finish everyday tasks in your browser'}</text>
  </svg>`;
  return Buffer.from(svg);
}

for (const [category, [zh, en, accent]] of Object.entries(palettes)) {
  for (const locale of ['zh', 'en']) {
    const filename = `${locale}-${category}.png`;
    const png = await sharp(card(locale, zh, en, accent)).png().toBuffer();
    await writeFile(new URL(filename, outDir), png);
  }
}

console.log(`Generated ${Object.keys(palettes).length * 2} topic-specific OG images.`);
