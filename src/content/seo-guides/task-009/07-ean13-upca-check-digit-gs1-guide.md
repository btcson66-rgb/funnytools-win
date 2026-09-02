---
slug: "/guides/ean13-upca-check-digit-gs1-guide/"
seo_title: "EAN-13、UPC-A 檢查碼怎麼算？GTIN、GS1、12位13位與商品條碼完整指南｜FunnyTools"
meta_description: "EAN-13和UPC-A差在哪？完整說明GTIN-13/GTIN-12、最後一位check digit、1/3加權算法、12位EAN資料碼與11位UPC資料碼，以及為什麼檢查碼正確不等於GS1正式註冊。"
og_title: "EAN-13、UPC-A 檢查碼怎麼算？"
og_description: "檢查碼只驗證號碼結構；正式商品GTIN仍要來自正確GS1編號來源與通路流程。"
canonical: "https://funnytools.win/guides/ean13-upca-check-digit-gs1-guide/"
primary_keyword: "EAN-13 UPC-A 檢查碼"
card_title: "EAN-13、UPC-A 檢查碼怎麼算？"
card_description: "先分清GTIN-13與GTIN-12，再理解最後一位檢查碼和GS1編號來源。"
hero_title: "EAN-13、UPC-A 檢查碼怎麼算？GTIN、GS1、12位13位與商品條碼完整指南"
hero_subtitle: "能產生一張掃得到的EAN或UPC，不代表那個商品編號已經正式屬於你的品牌。"
---

# EAN-13、UPC-A 檢查碼怎麼算？GTIN、GS1、12位13位與商品條碼完整指南

EAN-13 和 UPC-A 最容易被混淆的地方是：

> 位數和用途看起來很像。

但在 GS1 系統裡，它們分別承載不同長度的 GTIN。

> **速答：EAN-13 和 UPC-A 差在哪？**  
> EAN-13 通常承載 13 位的 **GTIN-13**；UPC-A 通常承載 12 位的 **GTIN-12**。最後一位是 check digit，用前面的資料位依 GS1 固定 1/3 權重算法計算。FunnyTools 條碼產生器可讓你輸入 12 位 EAN 資料碼自動補第 13 位，或輸入 11 位 UPC 資料碼補第 12 位；若輸入完整號碼，工具會驗證 check digit。但「check digit 正確」只代表數字結構一致，不代表 GTIN 已向 GS1 正式取得，也不代表平台會接受這個商品編號。

## 一、GTIN 是什麼？

GTIN：

> Global Trade Item Number。

用來唯一識別 trade item。

常見長度：

- GTIN-8
- GTIN-12
- GTIN-13
- GTIN-14

零售 POS 常見：

> GTIN-12 / GTIN-13。

## 二、EAN-13 對應什麼？

EAN-13：

> 13 位數一維條碼。

一般承載：

> GTIN-13。

最後一位：

> check digit。

## 三、UPC-A 對應什麼？

UPC-A：

> 12 位數。

一般承載：

> GTIN-12。

同樣最後一位是 check digit。

## 四、Check Digit 有什麼用？

目的不是加密。

而是：

> 協助偵測輸入或掃描時常見錯誤。

掃描器會驗證：
- 前面數字
- 最後check digit

是否符合固定算法。

## 五、GS1 的計算原理

對GTIN：

1. 從右側資料位開始交替乘3與1。
2. 把結果加總。
3. 找到大於等於總和的下一個10倍數。
4. 差值就是check digit。

例如GS1官方示例：

資料碼：
`629104150021`

加權總和：
`57`

下一個10倍數：
`60`

所以：

`60 - 57 = 3`

完整GTIN-13：

`6291041500213`

## 六、為什麼權重有人寫1、3、1、3？

因為你從哪一側開始描述會不同。

最安全的方法不是背一個模糊口訣，而是：

> 使用 GS1 官方 check digit 演算法，從右側資料位按規則交替權重。

## 七、FunnyTools EAN-13 怎麼輸入？

目前：

### 輸入12位
工具會：
> 計算第13位。

### 輸入13位
工具會：
> 驗證最後一位。

若不一致：

> 顯示錯誤並停用下載。

## 八、UPC-A 呢？

同理：

### 輸入11位
自動補第12位。

### 輸入12位
驗證check digit。

## 九、檢查碼正確 ≠ 編號正式有效

這是最重要的界線。

任何人都可以算出一組：

> 數學上通過check digit的13位數。

但正式GTIN通常由：

- GS1 Company Prefix
- Item Reference
- Check Digit

依GS1流程建立。

所以FunnyTools不會：
- 幫你申請GS1 prefix
- 證明barcode ownership
- 登錄產品
- 保證Amazon／零售商接受

## 十、GS1 Company Prefix 是國家代碼嗎？

不要簡化成：

> 前三碼 = 商品製造國。

GS1 prefix allocation不是「商品原產地」的簡單對照表。

正式判斷編號來源應使用：

> Verified by GS1。

## 十一、平台拒絕編號怎麼辦？

如果check digit正確但平台仍拒絕，應查：

- GTIN來源
- 品牌資料
- 商品類型
- exemption
- marketplace規則

不要只反覆改最後一碼。

## 十二、可以自己亂編一個內部EAN嗎？

技術上可以產生圖，但若只在公司內部使用：

> Code 128通常比冒用零售GTIN語意更適合。

正式EAN/UPC最好保留給真正需要GTIN的流程。

## 十三、EAN-13和UPC-A能互相轉嗎？

某些GTIN表示之間可以做前導零等邏輯關係，但：

> 不要只靠刪一位／加一位就假設任何EAN都等於UPC。

應依GTIN規則與目標通路。

## 十四、印刷前還要檢查什麼？

即使數字正確：

- quiet zone
- X-dimension
- 高度
- 對比
- 紙材
- 印表機
- 扫描器

仍會影響可讀性。

正式零售標籤應依：

> 最新GS1 General Specifications。

## 十五、FunnyTools適合哪一步？

它適合：

> 「我已經有正確編號，現在要驗證check digit並產生barcode圖形。」

不是：

> 「我沒有GTIN，請幫我創一個能上市的編號。」

## 十六、常見錯誤

- 隨便打一組13位就拿去上架
- 把check digit當商品註冊
- 把GS1 prefix當原產國
- 平台拒絕就亂改最後一位
- 使用EAN表示內部料號
- 只在螢幕掃，不做實體印刷測試

## 十七、FAQ

### EAN-13最後一位是什麼？
Check digit。

### FunnyTools可以自動算嗎？
可以，輸入12位EAN資料碼會補第13位。

### UPC-A幾位？
12位完整號碼，其中最後一位為check digit。

### 檢查碼正確就能上Amazon嗎？
不代表，還要看GTIN來源與平台規則。

### 怎麼查barcode屬於誰？
使用GS1的Verified by GS1等官方服務。

## 十八、延伸閱讀

- [條碼產生器](/tools/barcode-generator/)
- [QR vs Barcode](/guides/qr-code-vs-barcode-guide/)
- [Code128 vs Code39](/guides/code128-vs-code39-guide/)
- [條碼印刷品質指南](/guides/barcode-printing-quiet-zone-svg-guide/)
- [QR/Barcode指南中心](/guides/qr-barcode/)

## 頁面 CTA

**已經有正式GTIN？**

先驗證check digit，再產生EAN-13或UPC-A圖形並做最終掃描測試。

CTA：`開啟條碼產生器`

次要 CTA：`只是內部料號？看Code128`

## 圖卡與 ALT

`GTIN data digits → ×1/×3 weighting → next multiple of 10 → check digit`

ALT：`GTIN檢查碼計算流程圖，前方資料位按1與3權重加總，再以最近較高十倍數求最後一位檢查碼`

## 產生後的 GTIN 驗收

計算檢查碼後，先把完整 EAN-13 或 UPC-A 字串與來源資料表逐位比對，特別檢查前導零、國家或公司前綴，以及最後一位檢查碼。接著用實際條碼圖形掃描，確認掃描器回傳的完整數字與原始字串一致；不要只以圖形能被讀取作為驗收，因為錯誤的資料仍可能形成可掃描的條碼。

商品條碼還要遵循組織或供應鏈對號碼分配的規則，產生器只能計算與繪製，不能替代正式的號碼授權或商品資料註冊。若同一批商品在不同包裝尺寸使用不同條碼，請保留每個版本的輸入數字、輸出檔、尺寸與測試紀錄，避免後續補印時把不同包裝的識別碼混在一起。
