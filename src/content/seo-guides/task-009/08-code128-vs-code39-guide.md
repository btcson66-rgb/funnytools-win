---
slug: "/guides/code128-vs-code39-guide/"
seo_title: "Code 128 vs Code 39 差在哪？庫存、訂單、資產標籤與掃描器完整比較｜FunnyTools"
meta_description: "Code128和Code39怎麼選？完整比較資料密度、可用字元、內部料號、庫存、資產標籤、舊型掃描器、標籤寬度與檢查碼，並說明FunnyTools目前支援方式。"
og_title: "Code 128 vs Code 39：內部標籤該選哪個？"
og_description: "一般新系統優先考慮Code128；只有既有設備或制度明確要求Code39時才維持舊格式。"
canonical: "https://funnytools.win/guides/code128-vs-code39-guide/"
primary_keyword: "Code 128 Code 39 差別"
card_title: "Code 128 vs Code 39 差在哪？"
card_description: "Code128更密集、內容彈性較高；Code39規則簡單但條碼通常更寬。"
hero_title: "Code 128 vs Code 39 差在哪？庫存、訂單、資產標籤與掃描器完整比較"
hero_subtitle: "兩種條碼都很適合內部ID，但真正選擇標準應該是現場掃描器、既有系統與標籤空間。"
---

# Code 128 vs Code 39 差在哪？庫存、訂單、資產標籤與掃描器完整比較

你有一個內部編號：

`ITEM-2026-001`

要印成條碼。

該選：

- Code 128
- Code 39

哪個？

> **速答：沒有既有規範時，Code 128通常是較實用起點。**  
> Code 128資料密度高，可表示完整ASCII範圍並透過不同code set有效編碼數字或文字，適合訂單號、庫存ID、工單與資產標籤；Code 39較老、規則簡單、支援大寫字母、數字與少數符號，但同樣內容通常更寬。若舊掃描器、產線或企業系統明確要求Code 39，就應依既有規格，不要只因Code128更新就自行更換。FunnyTools條碼產生器目前兩者都支援。

## 一、Code 128 的定位

Code 128 常用於：

- Inventory ID
- Order ID
- Shipment
- Internal asset
- Work order

優點：
> 資料密度較高。

在標籤寬度有限時通常很有利。

## 二、Code 39 的定位

Code 39 是較早期的一維symbology。

常見於：
- 舊型工業系統
- 資產管理
- 汽車
- 國防／傳統設備

規則簡單、相容歷史設備。

## 三、Code 39 可用字元

基本Code 39主要支援：

- A–Z
- 0–9
- 空白
- `- . $ / + %`

以及start/stop symbol語意。

FunnyTools現行工具會：

> 把英文字母轉成大寫。

不支援的字元會拒絕。

## 四、Code 128 可用內容更彈性

Code 128可以表示更廣的ASCII字元集。

這讓：
- 小寫
- 更多符號
- 高密度數字

都比較容易。

但如果你的掃描端只接受特定格式：

> Encoder能產，不代表後端接受。

## 五、資料密度差異

同樣：

`ABC123456`

Code 39通常更寬。

Code128可透過code sets使用更有效率的編碼。

所以小標籤：

> Code128常更有優勢。

## 六、掃描器相容性

現代2D imager通常支援很多symbology。

但：
- 舊laser scanner
- 嵌入式設備
- 產線PLC
- 固定終端

可能只開啟特定barcode。

導入前：

> 用真正設備測。

## 七、Code39是不是沒有檢查碼？

Code39有可選的：

> Mod 43 check character。

但不是所有系統都要求。

FunnyTools現行一般Code39輸出：

> 不替你套用企業特定Mod43規則。

如果既有系統要求：

> 依系統文件。

## 八、Code128有自己的check symbol

Code128 symbology本身包含check symbol機制。

使用者通常：

> 不需要手動輸入最後一位。

這和EAN/UPC固定GTIN check digit概念不同。

## 九、內部ID最好放多少資料？

條碼不是資料庫。

更好的設計：

> 編短ID，掃描後去系統查資料。

不要把：
- 姓名
- 地址
- 整段產品描述

全部塞進一維條碼。

內容越長：
> 條碼越寬。

## 十、可以直接把網址做Code128嗎？

技術上可能。

但長URL會非常寬。

一般手機網址：

> QR Code更適合。

## 十一、資產標籤怎麼選？

如果公司已有：
> Code39掃描流程

繼續Code39可能最合理。

新建系統：

> Code128可先測。

重點不是格式新舊，而是：
- label size
- scanner
- software
- workflow

## 十二、要不要顯示Human Readable Text？

建議保留：

> 人眼可讀ID。

掃描器壞掉時仍可人工輸入。

FunnyTools條碼輸出會顯示可讀文字。

## 十三、PNG還是SVG？

正式標籤排版：

> 優先SVG。

因為線條保持向量清晰。

簡報或文件：

> PNG方便。

無論哪個：

> 不要非等比例拉伸。

## 十四、Code128不是GS1-128自動等價物

這點非常重要。

GS1-128使用Code128 symbology，但還有：

- GS1 data structure
- FNC1
- Application Identifiers
- specific formatting rules

FunnyTools現行「Code128」一般產生器：

> 不應被宣稱為完整GS1-128生成器。

## 十五、常見錯誤

- 新舊格式只看名字
- 不測舊掃描器
- Code39塞小寫卻沒注意轉大寫
- 把Code128當GS1-128
- 條碼塞太長內容
- 拉伸條碼塞進標籤
- 只留圖、不留人眼可讀ID

## 十六、快速比較

| 項目 | Code 128 | Code 39 |
|---|---|---|
| 密度 | 高 | 較低 |
| 小寫 | 可 | 基本格式不支援 |
| 內部ID | 很適合 | 適合 |
| 舊設備 | 視設備 | 常見相容 |
| 同長內容寬度 | 通常較窄 | 通常較寬 |
| FunnyTools | ✅ | ✅ |

## 十七、FAQ

### 一般庫存選哪個？
沒有既有規範時先測Code128。

### Code39可以小寫嗎？
基本Code39不支援；FunnyTools會轉大寫。

### Code128等於GS1-128嗎？
不等於。

### 哪個掃描比較快？
取決於設備、印刷與內容，不能單看格式名稱。

### 可以輸出SVG嗎？
FunnyTools兩種都可由Barcode工具輸出SVG。

## 十八、延伸閱讀

- [條碼產生器](/tools/barcode-generator/)
- [EAN/UPC指南](/guides/ean13-upca-check-digit-gs1-guide/)
- [條碼印刷指南](/guides/barcode-printing-quiet-zone-svg-guide/)
- [QR vs Barcode](/guides/qr-code-vs-barcode-guide/)
- [SVG vs PNG](/guides/svg-vs-png-diagram-export/)

## 頁面 CTA

**內部ID沒有既有規範？先從Code128測試。**

CTA：`開啟條碼產生器`

次要 CTA：`正式商品號碼？看EAN/UPC`

## 圖卡與 ALT

`Code128 = denser / flexible`
`Code39 = simple / legacy-friendly`

ALT：`Code128與Code39比較圖，Code128資料密度較高內容彈性較大，Code39適合既有舊設備與簡單大寫ID`

## 選定條碼後的相容性確認

先列出實際資料樣本，再檢查掃描器、標籤軟體與後端欄位是否接受相同的字元集。Code 39 常見於既有設備和簡單大寫識別碼；Code 128 可在較小版面承載更多內容，但仍要確認設備的啟用模式與校驗設定。不要只看產生器能否輸出圖形，還要把掃描結果與原始字串逐字比對。

印刷測試至少包含最小寬度、一般工作距離、不同紙材和常用掃描器。條碼左右的 quiet zone、條與空白的對比、縮放方式及標籤裁切都可能影響讀取。若資料會跨系統傳輸，應保留前導零、大小寫與完整字串，避免匯入 Excel 或資料庫時自動格式化造成誤判。
