// Btcson Lab 自營數位教材產品目錄（/shop/ 櫥窗頁資料源）。
// 連結一律帶 UTM，方便在 Gumroad/Payhip 後台歸因 funnytools 導流。

export type ShopLocale = 'zh' | 'en';

export interface ShopProduct {
  id: string;
  emoji: string;
  price: string;
  name: Record<ShopLocale, string>;
  blurb: Record<ShopLocale, string>;
  meta: Record<ShopLocale, string>;
  gumroad?: string;
  payhip?: string;
}

const UTM = 'utm_source=funnytools&utm_medium=shop&utm_campaign=shop_page';

export function withUtm(url: string, content?: string): string {
  const contentParam = content ? `&utm_content=${encodeURIComponent(content)}` : '';
  return `${url}${url.includes('?') ? '&' : '?'}${UTM}${contentParam}`;
}

export const STOREFRONTS = {
  gumroad: 'https://btcsonlab.gumroad.com/',
  payhipNote: 'https://payhip.com/',
};

export const entitleKit: ShopProduct = {
  id: 'entitlekit',
  emoji: '🔐',
  price: 'US$39',
  name: {
    zh: 'EntitleKit — Gumroad 與 Payhip 軟體授權自動化 Starter Kit',
    en: 'EntitleKit — Gumroad & Payhip License Automation Starter Kit',
  },
  blurb: {
    zh: '給販售 Chrome Extension、桌面工具與小型 SaaS 的獨立開發者：把 Gumroad／Payhip 付款、續訂、退款、取消與到期事件接成可驗證的使用權，並支援裝置、席位與功能限制。這是可下載、自行部署的原始碼套件，不是代管 SaaS。',
    en: 'For indie developers selling Chrome extensions, desktop tools, or small SaaS products: turn Gumroad and Payhip purchase, renewal, refund, cancellation, and expiration events into verifiable access with device, seat, and feature limits. Downloadable self-hosted source code, not hosted SaaS.',
  },
  meta: {
    zh: 'Next.js 16 · Supabase · Webhooks · REST API · TypeScript SDK',
    en: 'Next.js 16 · Supabase · webhooks · REST API · TypeScript SDK',
  },
  gumroad: 'https://btcsonlab.gumroad.com/l/entitlekit-gumroad-payhip-license-automation',
  payhip: 'https://payhip.com/b/3AfqG',
};

export const learningProducts: ShopProduct[] = [
  {
    id: 'cvc-reading-quest',
    emoji: '📖',
    price: 'US$19',
    name: {
      zh: 'CVC Reading Quest 自然發音閱讀任務',
      en: 'CVC Reading Quest',
    },
    blurb: {
      zh: '為 4–8 歲初學閱讀的孩子設計：20 個循序漸進的發音課次、10 本可解碼小讀本、60 張字卡，在家就能帶的完整 phonics 教材。',
      en: 'A complete phonics kit for early readers ages 4–8: 20 step-by-step sessions, 10 decodable readers, and 60 word cards you can run at home.',
    },
    meta: {
      zh: '20 課次 · 10 讀本 · 60 字卡 · PDF 列印',
      en: '20 sessions · 10 readers · 60 cards · printable PDF',
    },
    gumroad: 'https://btcsonlab.gumroad.com/l/btcson-cvc-reading-quest',
    payhip: 'https://payhip.com/b/6hg3N',
  },
  {
    id: 'math-fact-quest',
    emoji: '🔢',
    price: 'US$17',
    name: {
      zh: 'Math Fact Quest 數學事實闖關',
      en: 'Math Fact Quest',
    },
    blurb: {
      zh: '30 個短課次把 0–12 的加減乘除基本事實練到自動化，每天 10 分鐘、遊戲化闖關設計，適合國小階段。',
      en: '30 short game-style sessions that build automatic recall of math facts 0–12 — ten minutes a day for elementary kids.',
    },
    meta: {
      zh: '30 課次 · facts 0–12 · PDF 列印',
      en: '30 sessions · facts 0–12 · printable PDF',
    },
    gumroad: 'https://btcsonlab.gumroad.com/l/btcson-math-fact-quest',
    payhip: 'https://payhip.com/b/Vpkuf',
  },
  {
    id: 'morning-momentum',
    emoji: '🌅',
    price: 'US$17',
    name: {
      zh: 'Morning Momentum 晨間慣例系統',
      en: 'Morning Momentum',
    },
    blurb: {
      zh: '30 天晨間慣例養成系統，Start–Core–Stretch 三段式設計，幫孩子（和大人）把早晨從混亂變成穩定節奏。',
      en: 'A 30-day morning routine system with a Start–Core–Stretch structure that turns chaotic mornings into a steady rhythm.',
    },
    meta: {
      zh: '30 天 · 三段式 · PDF 列印',
      en: '30 days · 3-phase structure · printable PDF',
    },
    gumroad: 'https://btcsonlab.gumroad.com/l/btcson-morning-momentum',
    payhip: 'https://payhip.com/b/mbi6Q',
  },
  {
    id: 'visual-day-builder',
    emoji: '🗓️',
    price: 'US$14',
    name: {
      zh: 'Visual Day Builder 視覺化日程板',
      en: 'Visual Day Builder',
    },
    blurb: {
      zh: '123 張視覺日程卡＋4 種底板、2–12 格彈性時段，特別適合需要視覺提示的孩子建立每日流程。',
      en: '123 visual schedule cards with 4 boards and flexible 2–12 slot layouts — great for kids who thrive on visual routines.',
    },
    meta: {
      zh: '123 卡 · 4 底板 · 2–12 格 · PDF 列印',
      en: '123 cards · 4 boards · 2–12 slots · printable PDF',
    },
    gumroad: 'https://btcsonlab.gumroad.com/l/btcson-visual-day-builder',
    payhip: 'https://payhip.com/b/ZzuKD',
  },
  {
    id: 'ready-hands-adventure',
    emoji: '✂️',
    price: 'US$12',
    name: {
      zh: 'Ready Hands Adventure 小手預備任務',
      en: 'Ready Hands Adventure',
    },
    blurb: {
      zh: '20 個精細動作任務、3 種線寬漸進設計，為學前孩子的握筆與剪貼能力打基礎。',
      en: '20 fine-motor missions with 3 progressive line widths that build pre-writing and scissor skills for preschoolers.',
    },
    meta: {
      zh: '20 任務 · 3 線寬 · PDF 列印',
      en: '20 missions · 3 line widths · printable PDF',
    },
    gumroad: 'https://btcsonlab.gumroad.com/l/btcson-ready-hands-adventure',
    payhip: 'https://payhip.com/b/0SmWy',
  },
];

export const physicsBundle: ShopProduct = {
  id: 'physics-10-pack',
  emoji: '🚀',
  price: 'US$19',
  name: {
    zh: 'Physics Mission Packs 十合一物理任務包',
    en: 'Physics Mission Packs — Complete 10-Pack',
  },
  blurb: {
    zh: '10 個動手物理實驗任務包（7–15 歲）：氣球火箭、紙橋承重、投石機、彈珠雲霄飛車等，每包含實驗步驟圖解、家長指南、工作紙、小測驗、證書與離線模擬器。',
    en: 'Ten hands-on physics mission packs for ages 7–15 — balloon rockets, paper bridges, catapults, marble coasters and more. Each pack includes illustrated steps, a parent guide, worksheets, a quiz, a certificate, and an offline simulator.',
  },
  meta: {
    zh: '10 包合集 · 90+ 頁 · 10 個離線模擬器',
    en: '10 packs · 90+ pages · 10 offline simulators',
  },
  gumroad: 'https://btcsonlab.gumroad.com/l/btcson-physics-10-pack',
  payhip: 'https://payhip.com/b/stcmZ',
};

export const physicsSingles: { name: Record<ShopLocale, string>; payhip: string }[] = [
  { name: { zh: '氣球火箭競速', en: 'Balloon Rocket Racers' }, payhip: 'https://payhip.com/b/OTrY8' },
  { name: { zh: '紙橋承重挑戰', en: 'Paper Bridge Load Challenge' }, payhip: 'https://payhip.com/b/9Lo1C' },
  { name: { zh: '投石機標靶實驗室', en: 'Catapult Target Lab' }, payhip: 'https://payhip.com/b/oR8Vr' },
  { name: { zh: '彈珠雲霄飛車能量實驗', en: 'Marble Coaster Energy Lab' }, payhip: 'https://payhip.com/b/dPt8V' },
  { name: { zh: '單擺節拍計時器', en: 'Pendulum Pattern Timekeeper' }, payhip: 'https://payhip.com/b/Yb594' },
  { name: { zh: '紙直升機飛行實驗室', en: 'Paper Helicopter Flight Lab' }, payhip: 'https://payhip.com/b/TliFr' },
  { name: { zh: '線電話訊號實驗室', en: 'String Telephone Signal Lab' }, payhip: 'https://payhip.com/b/v4EiU' },
  { name: { zh: '磁鐵迷宮磁場探索', en: 'Magnet Maze Field Explorer' }, payhip: 'https://payhip.com/b/xfFrJ' },
  { name: { zh: '水透鏡反轉箭頭實驗', en: 'Water Lens & Reversing Arrow Lab' }, payhip: 'https://payhip.com/b/x6Mtl' },
  { name: { zh: '紙電路偵探', en: 'Paper Circuit Detective' }, payhip: 'https://payhip.com/b/K3cAj' },
];

export const chemistryLine: ShopProduct = {
  id: 'chemistry-mission-packs',
  emoji: '🧪',
  price: 'US$3+',
  name: {
    zh: 'Micro Chemistry Mission Packs 廚房化學任務包',
    en: 'Micro Chemistry Mission Packs',
  },
  blurb: {
    zh: '用廚房材料做的安全化學實驗任務包：變色紫甘藍、隱形墨水等。含免費 Lite 試玩包、單包 US$3、入門合集 US$12，全系列在 Gumroad 商店。',
    en: 'Safe kitchen-chemistry mission packs — color-changing cabbage, invisible ink and more. Free Lite samples, US$3 single packs, and a US$12 starter bundle on our Gumroad store.',
  },
  meta: {
    zh: '免費 Lite · 單包 US$3 · 合集 US$12',
    en: 'Free Lite · US$3 singles · US$12 bundle',
  },
  gumroad: 'https://btcsonlab.gumroad.com/',
};
