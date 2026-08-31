# FunnyTools 聯盟商品管理

FunnyTools 的唯一可編輯商品清單是 `public/data/support-products.json`。工具結果頁的支持貨架、`/support/` 與日後文章中的 `AffiliateProductShelf` 都讀取這份檔案；不要把商品寫死在 Astro 元件，也不要在瀏覽器端放酷澎或蝦皮 API 憑證。

## 新增商品

1. 在蝦皮 Affiliate 或酷澎 Partners 後台手動產生最終推廣連結。
2. 取得平台允許使用的商品圖片，放入 `public/assets/support-products/`，並在 `imageUrl` 填站內路徑，例如 `/assets/support-products/example.webp`。圖片無法使用時也可以留空，貨架會顯示平台／分類圖示。
3. 在 `public/data/support-products.json` 新增一個物件，填寫名稱、平台、分類、標籤與 `priority`。
4. `affiliateUrl` 必須是完整的 HTTPS 最終連結；不要刪除或重組查詢參數。
5. 啟用商品時使用 `enabled: true`；既有資料的 `status: "active"` 也會相容讀取。停用請改成 `enabled: false` 或 `status: "inactive"`。
6. 先執行 `npm.cmd run build` 與相關檢查，再依 FunnyTools release 流程發布。

### 蝦皮 Sub ID

在蝦皮聯盟後台建立 Sub ID 來區分來源，例如 `funnytools`、`result-card`、`tool-name`、`product`、`campaign`，再把後台產生的完整推廣連結原樣貼到 `affiliateUrl`。可用 `optionalSubId` 與 `optionalCampaign` 留下管理註記，但程式不會自行產生私人連結，也不會移除任何 URL 參數。

### 酷澎商品

在酷澎 Partners 後台或既有官方支援的商品流程取得推廣連結與允許使用的圖片，再原樣貼入 `affiliateUrl`／`imageUrl`。目前網站不會自動呼叫酷澎 API、爬商品頁或把即時價格寫進頁面；若要更新 API 匯出的商品，請人工檢查名稱、圖片、連結與可用性後再提交 JSON。

## 欄位範例

以下是虛構範例，網址不可直接使用，也不是實際商品推薦：

```json
{
  "id": "demo-platform-item-001",
  "enabled": false,
  "platform": "shopee",
  "title": "請替換成實際商品名稱",
  "shortTitle": "請替換成短標題",
  "affiliateUrl": "https://example.invalid/PASTE_FINAL_AFFILIATE_URL",
  "imageUrl": "/assets/support-products/replace-with-permitted-image.webp",
  "category": "computer",
  "tags": ["3C", "辦公"],
  "priority": 999,
  "optionalDescription": "請填寫中性的用途說明，不要填寫未核實的價格、評分或庫存。",
  "optionalPriceLabel": "查看目前價格",
  "optionalSubId": "funnytools-result-card",
  "optionalCampaign": "demo"
}
```

## 顯示規則

工具完成有意義的結果後才會顯示支持貨架，初始最多 4 張卡片；使用者可在原頁展開到 8／12 張或換一批。手機使用原生橫向滑動。沒有可靠價格時固定顯示「查看目前價格」，不會由程式猜測價格、折扣、評分、庫存或銷量。

目前清單已包含既有蝦皮與酷澎商品，可作為超過 40 項的初始池。後續新增商品仍請集中在上述 JSON，並維持多平台與電腦、行動、辦公／學生、教師、居家、一般等分類的平衡；不要為了湊數量建立沒有真實連結與資料來源的商品。
