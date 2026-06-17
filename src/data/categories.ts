import type { Locale } from '../config/site';

export interface Category {
  id: string;
  icon: string;
  name: Record<Locale, string>;
  description: Record<Locale, string>;
}

export const categories: Category[] = [
  {
    id: 'money',
    icon: '💰',
    name: { zh: '薪資與金錢', en: 'Money & Salary' },
    description: {
      zh: '整理薪資、貸款、儲蓄與日常金錢試算，讓財務決策更好估。',
      en: 'Estimate salary, loans, savings, and everyday money questions with simple browser tools.',
    },
  },
  {
    id: 'time',
    icon: '⏱️',
    name: { zh: '工作與時間', en: 'Work & Time' },
    description: {
      zh: '用倒數、番茄鐘、日期與工作日工具，讓工作節奏更清楚。',
      en: 'Plan focus sessions, dates, breaks, and workday timing without installing an app.',
    },
  },
  {
    id: 'random',
    icon: '🎲',
    name: { zh: '隨機工具', en: 'Random' },
    description: {
      zh: '快速產生數字、名單、分組與抽選結果，適合教學、活動與日常決定。',
      en: 'Generate numbers, picks, groups, and decisions for classrooms, events, and everyday choices.',
    },
  },
  {
    id: 'text',
    icon: '✍️',
    name: { zh: '文字與寫作', en: 'Text & Writing' },
    description: {
      zh: '處理字數、格式、大小寫與文字整理，寫作與校稿更省時。',
      en: 'Count, clean, format, and review text for faster writing and editing.',
    },
  },
  {
    id: 'image',
    icon: '🖼️',
    name: { zh: '圖片與檔案', en: 'Image & File' },
    description: {
      zh: "提供圖片壓縮、轉檔、調整尺寸與 QR Code 等常用檔案工具，全部在瀏覽器本機處理。",
      en: "Compress, convert, and resize images, plus QR codes and other handy file tasks — all processed locally in your browser.",
    },
  },
  {
    id: 'pdf',
    icon: '📄',
    name: { zh: 'PDF 工具', en: 'PDF Tools' },
    description: {
      zh: '在瀏覽器本機合併、拆分、旋轉與整理 PDF 檔案，不會上傳到伺服器。',
      en: 'Merge, split, rotate, and organize PDF files locally in your browser — nothing is uploaded.',
    },
  },
  {
    id: 'draw',
    icon: '✏️',
    name: { zh: '製圖工具', en: 'Drawing & CAD' },
    description: {
      zh: '在瀏覽器本機進行簡易 2D 製圖、手繪與流程圖，無需安裝 CAD 軟體。',
      en: 'Simple 2D drafting, sketching, and diagrams right in your browser — no CAD software to install.',
    },
  },
  {
    id: 'study',
    icon: '🎓',
    name: { zh: '學生與老師', en: 'Student & Teacher' },
    description: {
      zh: '為課堂抽籤、分組、座位與成績計算準備的教學輔助工具。',
      en: 'Classroom helpers for picking students, grouping, seating, and grade calculations.',
    },
  },
];

export function getCategoryById(id: string): Category | undefined {
  return categories.find((category) => category.id === id);
}
