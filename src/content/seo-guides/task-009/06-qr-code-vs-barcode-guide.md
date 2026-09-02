---
slug: "/guides/qr-code-vs-barcode-guide/"
seo_title: "QR Code vs Barcode 差在哪？一維條碼、手機掃描、網址、庫存與商品用途完整比較｜FunnyTools"
meta_description: "QR Code和Barcode怎麼選？比較二維QR與Code128、EAN-13、UPC-A、Code39的一維條碼在資料容量、手機掃描、商品編號、庫存、網址與印刷上的差異。"
og_title: "QR Code vs Barcode：不是誰比較新，而是讀取場景不同"
og_description: "要讓手機開網址用QR；要讓POS或倉儲系統讀短商品/庫存ID，一維條碼仍然非常適合。"
canonical: "https://funnytools.win/guides/qr-code-vs-barcode-guide/"
primary_keyword: "QR Code Barcode 差別"
card_title: "QR Code vs Barcode 差在哪？"
card_description: "網址、Wi-Fi與手機互動優先QR；商品GTIN與內部ID常用一維條碼。"
hero_title: "QR Code vs Barcode 差在哪？一維條碼、手機掃描、網址、庫存與商品用途完整比較"
hero_subtitle: "QR Code不是『取代所有條碼的新版本』；零售POS、物流與內部庫存仍大量使用一維條碼。"
---

# QR Code vs Barcode 差在哪？一維條碼、手機掃描、網址、庫存與商品用途完整比較

QR和Barcode都能：

> 讓機器從圖案讀出資料。

但它們的結構與生態不同。

> **速答：什麼情況用QR，什麼情況用Barcode？**  
> 如果內容是網址、表單、Wi-Fi、聯絡資訊或較長文字，並希望一般手機相機直接掃描，優先使用QR Code；如果只要表示商品GTIN、庫存ID、工單或短代碼，而且現場已有POS／掃描槍，一維條碼如EAN-13、UPC-A、Code 128或Code 39通常更自然。零售商品的EAN/UPC還涉及GS1編號規則，不是把任意數字轉成一維條碼就能正式上架。

## 一、結構不同

### 一維 Barcode
資料主要沿：

> 水平方向條紋

編碼。

### QR Code
資料在：

> 水平＋垂直二維方格

中編碼。

因此相同面積下QR可容納更多資料。

## 二、QR適合網址

網址可能包含：
- domain
- path
- query

遠比12～13位商品號碼長。

QR可以直接編入完整URL。

手機相機也普遍能識別後開瀏覽器。

## 三、Barcode適合短ID

例如：
- `ITEM-2026-001`
- 訂單號
- 料號
- 資產編號

Code 128可以把這些短字串做成高密度一維條碼。

掃描槍讀完後：

> 通常像鍵盤一樣把ID輸入系統。

## 四、EAN-13 / UPC-A 是商品編號生態

EAN-13對應：

> GTIN-13。

UPC-A對應：

> GTIN-12。

這些不是一般任意文字格式。

需要：
- 固定長度
- check digit
- GS1分配／規則

## 五、QR可以放商品號碼嗎？

可以。

但如果收銀POS要求：

> EAN-13

你放QR沒有用。

資料能編入：

> 不代表接收系統支援。

## 六、一維條碼可以放網址嗎？

Code 128理論上能編文字。

但長URL會使條碼非常寬，不利於印刷與掃描。

因此手機URL：

> QR更合理。

## 七、手機掃描能力

現代手機：

> 原生相機通常支援QR。

一維商品條碼有些手機可透過相機／App讀取，但不是每個預設相機都會給你相同操作。

現場設備：
- POS
- warehouse scanner

則常對一維條碼優化。

## 八、容錯能力

QR有：

> L/M/Q/H error correction。

部分污損仍可能恢復。

一維條碼也有自己的校驗與印刷品質要求，但不要把QR容錯等級概念直接套到EAN/UPC。

## 九、方向與旋轉

QR有三個finder patterns，可讓reader快速定位方向。

一維條碼則依scanner與symbology讀取。

現代影像式掃描器可多方向讀，但舊式laser設備可能有更明顯方向要求。

## 十、資料顯示

EAN / UPC通常有：

> 人眼可讀數字 HRI。

即使掃描器失敗，人仍能輸入GTIN。

QR則不會把完整payload直接印在方格下方。

如果QR是重要網址：

> 建議旁邊印domain或短URL。

## 十一、QR vs Barcode快速表

| 需求 | QR | 一維Barcode |
|---|---|---|
| 網址 | ✅ | 不理想 |
| Wi-Fi | ✅ | ❌ |
| 手機菜單 | ✅ | 不理想 |
| GTIN商品 | 非主要POS載體 | ✅ EAN/UPC |
| 內部ID | 可 | ✅ Code128 |
| 長文字 | ✅ | 不理想 |
| 舊型掃描槍 | 視設備 | ✅常見 |
| 容錯等級 | L/M/Q/H | 不同機制 |

## 十二、同一包裝可以兩個都有嗎？

可以。

例如：
- EAN-13：收銀POS
- QR：產品說明頁

但要：
- 分開留白
- 不互相干擾
- 各自測試

## 十三、不要把QR貼太靠近Barcode

掃描器視野可能同時看到兩個symbol。

應依包裝設計與scanner測試：
- 留空間
- 分區
- 確保預期掃描器選到正確碼

## 十四、FunnyTools怎麼選？

### QR
`/tools/qr-code-generator/`

### Barcode
`/tools/barcode-generator/`

如果只是內部文字ID：

> Barcode工具先試Code 128。

如果是手機連結：

> QR工具。

## 十五、常見錯誤

- 商品上架需要EAN卻只做QR
- 長網址硬塞Code39
- 以為Barcode都一樣
- 任意13位數字就叫正式EAN
- 只看手機掃得到，不看真正POS／scanner
- 兩種碼貼太近卻未實測

## 十六、FAQ

### QR Code是二維條碼嗎？
是，QR屬於二維碼的一種。

### Barcode是不是只指一維？
日常中文常把Barcode用來指一維條碼，但廣義barcode可包含二維symbology；本指南為方便比較，以「一維Barcode」為主。

### 商品可以只放QR嗎？
取決於通路；一般零售POS若要求GTIN/EAN/UPC，仍要依規格。

### 庫存用哪個？
短internal ID通常Code 128很實用。

### 手機網址用哪個？
QR。

## 十七、延伸閱讀

- [QR Code產生器](/tools/qr-code-generator/)
- [條碼產生器](/tools/barcode-generator/)
- [EAN-13與UPC-A指南](/guides/ean13-upca-check-digit-gs1-guide/)
- [Code128 vs Code39](/guides/code128-vs-code39-guide/)
- [QR/Barcode指南中心](/guides/qr-barcode/)

## 頁面 CTA

**手機互動選QR；商品／庫存系統先看Barcode規格。**

CTA：`開啟QR Code產生器`

次要 CTA：`開啟條碼產生器`

## 圖卡與 ALT

`URL / Wi-Fi / Mobile → QR`
`GTIN / Inventory / Scanner → 1D Barcode`

ALT：`QR Code與一維條碼用途比較圖，網址Wi-Fi手機互動使用QR，商品GTIN與庫存掃描使用一維條碼`

## 依使用情境做最後選擇

如果使用者需要用手機開啟網址、讀取聯絡資訊或加入 Wi-Fi，QR Code 能在平面上承載較多文字，版面也可加入簡短的操作提示。若工作流程是收銀、入庫或盤點，則應先看現有掃描器、標籤紙和資料庫欄位支援什麼格式；一維條碼的相容性與掃描速度通常比重新教育整個流程更重要。選擇標準是工作流程的輸入需求，不是單看圖形的流行程度。

兩種碼都要驗證輸出內容與實際掃描結果。測試時同時保留原始資料字串，掃描後比對解碼文字是否完全一致，尤其注意網址大小寫、空白、換行和前導零。把結果放進發佈檢查表，能避免「畫面看起來正確」卻在不同裝置上得到不同內容。
