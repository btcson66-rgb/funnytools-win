---
slug: "/guides/barcode-printing-quiet-zone-svg-guide/"
seo_title: "條碼怎麼印才掃得到？Quiet Zone、SVG、尺寸、對比與列印品質完整指南｜FunnyTools"
meta_description: "條碼畫面可掃、印出卻掃不到？完整說明quiet zone、X-dimension、黑條白底、SVG、非等比例拉伸、熱感紙、墨水暈開、曲面標籤與實際掃描器驗證。"
og_title: "條碼怎麼印才掃得到？"
og_description: "條碼是否可掃描，真正決定於最終紙材、尺寸、quiet zone、對比與印刷品質，不是螢幕預覽。"
canonical: "https://funnytools.win/guides/barcode-printing-quiet-zone-svg-guide/"
primary_keyword: "條碼 掃不到 印刷"
card_title: "條碼怎麼印才掃得到？"
card_description: "保留quiet zone、不要拉伸、優先黑條白底與SVG，最後一定用真正掃描器測。"
hero_title: "條碼怎麼印才掃得到？Quiet Zone、SVG、尺寸、對比與列印品質完整指南"
hero_subtitle: "Barcode generator 只能產圖；真正能不能被POS或掃描槍讀取，要到最終印刷品才知道。"
---

# 條碼怎麼印才掃得到？Quiet Zone、SVG、尺寸、對比與列印品質完整指南

條碼在瀏覽器預覽：

> 一掃就成功。

印到標籤：

> 完全讀不到。

很常見。

> **速答：條碼印刷最重要的五件事是什麼？**  
> 保留符號左右的 quiet zone、不任意壓縮或拉伸寬度、使用高對比深色bars與淺色背景、以符合目標symbology與GS1規格的尺寸輸出，並使用最終紙材／印表機／掃描器實測。GS1現行規格明確把quiet zone不足列為常見掃描失敗原因；對EAN/UPC等零售條碼，還必須符合應用要求的X-dimension、高度與HRI，而不是只求手機掃得到。

## 一、Quiet Zone是什麼？

一維條碼左右需要：

> 沒有其他印刷內容的空白區。

掃描器靠它辨認：

> 條碼邊界。

如果文字、框線、Logo貼太近：

> 可能被誤判。

## 二、不同Barcode的Quiet Zone要求不同

不要用一個固定mm數字套所有格式。

GS1規格會依：
- EAN-13
- UPC-A
- 其他symbology

定義quiet zone相對X-dimension需求。

正式零售輸出：

> 以最新GS1 General Specifications為準。

## 三、X-Dimension是什麼？

X-dimension是：

> 最窄bar／space的名義寬度基準。

許多條碼尺寸要求都建立在X-dimension上。

當你把條碼縮太小：

> 最細bars可能小於印表機真正能穩定輸出的寬度。

## 四、不要任意拉伸

把條碼：
- 寬度壓50%
- 高度不變

可能直接破壞module比例。

排版時應：

> 等比例縮放。

如果正式規格要求特定高度：

> 應從合規symbol尺寸重新輸出，而不是視覺硬拉。

## 五、為什麼SVG很適合Barcode？

條碼本質是：

> 清晰的幾何bars。

SVG是向量圖：

- 放大不會像素化
- 排版軟體可重新渲染
- 適合標籤輸出

FunnyTools Barcode可下載：

> PNG / SVG。

正式標籤優先考慮SVG。

## 六、PNG什麼時候夠用？

- Word文件
- PowerPoint
- 測試圖
- 固定尺寸

如果PNG像素足夠，而且不再大幅縮放：

> 可以正常使用。

但不要截圖預覽後當正式barcode。

## 七、黑條白底為什麼最穩？

GS1官方列印建議中：

> 深色bars + 淺色背景

是最安全組合。

黑條白底：

> 最容易建立足夠contrast。

不要為設計：
- 淺灰bar
- 花紋背景
- 漸層
- 透明底叠照片

## 八、紅色為什麼常有問題？

Barcode scanner的光源與感測方式可能讓某些顏色：

> 對scanner看起來對比不足。

因此即使人眼覺得紅條清楚：

> 不代表掃描器也這樣看。

正式條碼不要只憑人眼選色。

## 九、熱感紙會影響嗎？

會。

可能有：
- 印頭髒
- 熱量不足
- 速度太快
- 紙材老化

造成：
- bar斷裂
- 邊緣毛糙
- 空白區污染

大量列印要做：
> 品質抽查。

## 十、墨水暈開

Inkjet在吸墨紙上：

> 黑bar可能變粗。

細space被吃掉後：

> scanner難分。

這就是為什麼預覽正常，紙上失敗。

## 十一、亮面／反光標籤

強反射會讓掃描器：
- 局部曝光
- 產生亮斑

可測：
- 角度
- 霧面
- 較大symbol
- 不同scanner

## 十二、曲面包裝

把barcode橫跨：
- 小瓶
- 細圓柱

線條會因曲率產生視覺變形。

如果曲面不可避免：

> 調整方向、尺寸，並依實物scanner測試。

## 十三、人眼可讀數字HRI

EAN/UPC等零售symbol會在bars下顯示：

> Human Readable Interpretation。

不要隨意：
- 裁掉
- 改成不一致號碼
- 隱藏

HRI讓人工核對與備援輸入更容易。

## 十四、Scanner測試不能只用手機

若現場真正使用：

> Zebra / Honeywell / POS scanner / 固定掃描器

就要用那台測。

手機掃得到：

> 不能替代生產設備驗證。

## 十五、正式商品還可需要Barcode Verification

掃得到只是：

> decode成功。

GS1環境還可能要求：
- symbol quality grading
- X-dimension
- quiet zone
- reflectance
- decode quality

大批零售包裝應進行：

> 正式barcode verification。

FunnyTools不提供ISO/GS1 verifier。

## 十六、最終測試流程

1. 確認資料與check digit。
2. 下載SVG。
3. 放入最終標籤。
4. 等比例縮放。
5. 保留quiet zone。
6. 匯出正式印刷檔。
7. 用實際印表機／紙材列印。
8. 用目標scanner測。
9. 多抽幾張測。
10. 大量印刷後持續抽驗。

## 十七、常見錯誤

- 裁掉quiet zone
- 非等比例拉伸
- 低解析截圖放大
- 背景花紋
- 只用手機測
- 印前不試紙材
- GS1商品只要「掃得到」就算合格
- 條碼靠近裁切線
- 條碼靠近其他黑色圖形

## 十八、FAQ

### SVG一定比PNG更容易掃嗎？
不是保證，但向量輸出能避免放大像素化。

### 條碼可以反白嗎？
正式GS1/零售用途應依規格；一般建議深bar淺底。

### Quiet zone可以裁掉一點嗎？
不建議，quiet zone不足是常見掃描失敗原因。

### 手機掃得到就能上架嗎？
不代表符合零售通路barcode quality要求。

### FunnyTools可以驗證印刷品質等級嗎？
不能，只負責產生圖與EAN/UPC數字檢查。

## 十九、延伸閱讀

- [條碼產生器](/tools/barcode-generator/)
- [EAN-13與UPC-A](/guides/ean13-upca-check-digit-gs1-guide/)
- [Code128 vs Code39](/guides/code128-vs-code39-guide/)
- [SVG vs PNG](/guides/svg-vs-png-diagram-export/)
- [QR/Barcode指南中心](/guides/qr-barcode/)

## 頁面 CTA

**不要只測畫面，測真正的標籤。**

CTA：`開啟條碼產生器`

次要 CTA：`商品GTIN先驗證check digit`

## 圖卡與 ALT

`Barcode + clear quiet zones + high contrast + final scanner test`

ALT：`條碼印刷品質示意圖，顯示左右quiet zone、高對比bars、等比例輸出與最終掃描器實測`
