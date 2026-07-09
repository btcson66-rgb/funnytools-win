/**
 * 蝦皮分潤商品池與工具頁對應表。
 *
 * 啟用方式（兩步都要做才會顯示）：
 * 1. 在 src/config/site.ts 把 features.affiliate 改為 true
 * 2. 取消下方 toolAffiliateMap 內的註解（或自行增改對應）
 *
 * toolAffiliateMap 為空、feature 關閉、或頁面為英文版時，
 * AffiliateBlock 不輸出任何 HTML（AdSense 審查期間保持零輸出）。
 */

export interface AffiliateProduct {
  id: string;
  name: string;
  price: string;
  shop: string;
  note: string;
  url: string;
}

export const productPool: AffiliateProduct[] = [
  {
    id: 'wd-elements-hdd',
    name: 'WD Elements 2.5吋行動硬碟（1TB-6TB）',
    price: 'NT$3,599 起',
    shop: '71CY_3CSHOP',
    note: '檔案備份與外接儲存',
    url: 'https://s.shopee.tw/4fuOranl9k',
  },
  {
    id: 'transcend-m3-hdd',
    name: '創見 M3 軍規抗震行動硬碟',
    price: 'NT$3,499',
    shop: '數位宅急購',
    note: '抗震外接硬碟，附轉接頭',
    url: 'https://s.shopee.tw/LlPhd4Fws',
  },
  {
    id: 'adata-hv620s-hdd',
    name: 'ADATA 威剛 HV620S 行動硬碟',
    price: 'NT$3,180',
    shop: 'DataStone宅速配',
    note: '大容量檔案備份',
    url: 'https://s.shopee.tw/BRzVK4tHp',
  },
  {
    id: 'adata-64g-usb',
    name: 'ADATA 威剛 64G 隨身碟（蝦皮直營）',
    price: 'NT$209',
    shop: '蝦皮直營生活超市',
    note: '入門隨身碟，銷量 4 萬+',
    url: 'https://s.shopee.tw/20tdggxua1',
  },
  {
    id: 'kingston-se9-usb',
    name: '金士頓 DataTraveler SE9 G3 金屬隨身碟',
    price: 'NT$539 起',
    shop: 'Gowalala',
    note: '金屬質感高速隨身碟',
    url: 'https://s.shopee.tw/1BKWhA15H0',
  },
  {
    id: 'kingston-canvas-microsd',
    name: '金士頓 Canvas Go! Plus microSD 記憶卡',
    price: 'NT$2,264 起',
    shop: 'Gowalala',
    note: '相機／空拍機 4K 錄影用',
    url: 'https://s.shopee.tw/3ViRTRsCXg',
  },
  {
    id: 'logitech-m650',
    name: 'Logitech 羅技 M650 靜音無線滑鼠',
    price: 'NT$1,090',
    shop: 'Logitech官方旗艦館',
    note: '辦公靜音滑鼠，銷量 1 萬+',
    url: 'https://s.shopee.tw/3ViRTRsCWf',
  },
  {
    id: 'logitech-g304',
    name: 'Logitech G304 無線遊戲滑鼠',
    price: 'NT$898',
    shop: 'Logitech官方旗艦館',
    note: '入門電競無線滑鼠',
    url: 'https://s.shopee.tw/3g1rfkrZBi',
  },
  {
    id: 'logitech-mx-master4',
    name: 'Logitech MX Master 4 無線智能滑鼠',
    price: 'NT$3,990',
    shop: 'Logitech官方旗艦館',
    note: '生產力旗艦滑鼠',
    url: 'https://s.shopee.tw/30mAsWu6Xe',
  },
  {
    id: 'logitech-superlight2',
    name: 'Logitech G PRO X SUPERLIGHT 2 電競滑鼠',
    price: 'NT$3,390',
    shop: 'Logitech官方旗艦館',
    note: '輕量化無線電競滑鼠',
    url: 'https://s.shopee.tw/7VEaEncyPY',
  },
  {
    id: 'ducky-okm98',
    name: 'Ducky OK-M-98 機械式鍵盤（三模）',
    price: 'NT$2,290',
    shop: 'Ducky官方旗艦店',
    note: '三模熱插拔機械鍵盤',
    url: 'https://s.shopee.tw/9fJ4omUj1L',
  },
  {
    id: 'steelseries-apexpro',
    name: 'SteelSeries Apex Pro 磁力軸電競鍵盤',
    price: 'NT$4,390',
    shop: 'SteelSeries官方旗艦店',
    note: '磁力軸旗艦電競鍵盤',
    url: 'https://s.shopee.tw/8KnhEKZnjD',
  },
];

/**
 * 工具 slug → 商品 id 對應。初始為空（零輸出）。
 * 啟用時取消以下建議對應的註解：
 */
export const toolAffiliateMap: Record<string, string[]> = {
  // 'image-compressor': ['wd-elements-hdd', 'adata-64g-usb', 'kingston-canvas-microsd'],
  // 'pdf-compressor': ['transcend-m3-hdd', 'kingston-se9-usb'],
  // 'merge-pdf': ['adata-hv620s-hdd', 'kingston-se9-usb'],
  // 'split-pdf': ['adata-hv620s-hdd', 'adata-64g-usb'],
  // 'image-resizer': ['kingston-canvas-microsd', 'adata-64g-usb'],
  // 'pomodoro-timer': ['logitech-m650', 'ducky-okm98'],
  // 'break-reminder': ['logitech-mx-master4', 'logitech-m650'],
  // 'word-counter': ['ducky-okm98', 'logitech-mx-master4'],
  // 'character-counter': ['ducky-okm98', 'logitech-m650'],
  // 'stopwatch': ['logitech-g304', 'logitech-superlight2'],
  // 'countdown-timer': ['logitech-g304', 'steelseries-apexpro'],
};

export function getAffiliateProducts(toolSlug: string): AffiliateProduct[] {
  const ids = toolAffiliateMap[toolSlug] ?? [];
  return ids
    .map((id) => productPool.find((product) => product.id === id))
    .filter((product): product is AffiliateProduct => Boolean(product));
}
