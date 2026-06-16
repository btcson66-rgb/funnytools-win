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
    id: 'fun',
    icon: '🎭',
    name: { zh: '趣味測驗', en: 'Personality & Fun' },
    description: {
      zh: '收集輕量的性格、壓力與趣味測驗，適合朋友與社群互動。',
      en: 'Lightweight quizzes and playful tests for sharing, reflection, and social moments.',
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
