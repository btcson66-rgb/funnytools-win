---
slug: "/guides/qr-code-not-scanning-print-guide/"
seo_title: "QR Code 掃不到怎麼辦？尺寸、留白、對比、Logo、印刷與反光完整排查｜FunnyTools"
meta_description: "QR Code 手機掃不到怎麼辦？從四周 quiet zone、模組尺寸、對比、Logo、內容太長、反光紙、低解析截圖、印刷縮放與網址失效逐步排查。"
og_title: "QR Code 掃不到？先別急著重做"
og_description: "大多數掃描失敗可以從 quiet zone、尺寸、對比、內容密度與最終印刷環境找到原因。"
canonical: "https://funnytools.win/guides/qr-code-not-scanning-print-guide/"
primary_keyword: "QR Code 掃不到"
card_title: "QR Code 掃不到怎麼辦？"
card_description: "四周留白、模組大小、對比、Logo、內容密度與紙材，逐項找出掃描失敗原因。"
hero_title: "QR Code 掃不到怎麼辦？尺寸、留白、對比、Logo、印刷與反光完整排查"
hero_subtitle: "畫面上看得到 QR Code，不代表手機鏡頭能可靠辨識；真正影響掃描的是每個黑白 module 在實際環境中能不能被清楚分開。"
---

# QR Code 掃不到怎麼辦？尺寸、留白、對比、Logo、印刷與反光完整排查

QR Code 在電腦上看起來完全正常，放進海報後卻掃不到。

這種情況很常見。

> **速答：QR Code 掃不到先檢查什麼？**  
> 先確認四周沒有文字或圖片貼太近。標準 QR Code 需要四側各至少 **4 modules 的 quiet zone**；接著檢查圖是否被縮得太小、黑白對比是否足夠、Logo 是否遮住太多模組、網址內容是否太長導致 QR 變得太密、圖片是否被低解析截圖或非等比例拉伸。最後一定要以「最終尺寸、最終紙張、最終印表機」實際掃描，而不是只測原始 PNG。DENSO WAVE 明確把四模組留白列為 QR Code 的必要符號區域。 

## 一、第一個檢查：四周 Quiet Zone

QR Code 周圍的白邊不是裝飾。

它讓掃描器知道：

> QR Code 到哪裡開始、哪裡結束。

標準 QR Code 需要：

> 四邊各 4 modules 寬的空白區。

不要：
- 把標題貼到QR邊緣
- 加邊框碰到模組
- 裁掉白邊
- 讓背景花紋侵入

## 二、Module 是什麼？

QR不是單純一張黑白圖片。

每一個小方格：

> module。

Version 1 是 21×21 modules。

Version越高，modules越多。

如果同樣印成3公分寬：

> modules越多，每一格就越小。

因此內容越長，往往越難在小尺寸可靠掃描。

## 三、為什麼網址太長會讓QR變密？

QR容量會依：
- 內容長度
- 字元類型
- 容錯等級

決定需要多少modules。

內容增加：

> QR version可能上升。

例如塞入很長：
- UTM
- session token
- tracking parameters

圖會更密。

若能用短而穩定的正式URL：

> 通常更容易印。

## 四、不要只把QR放大截圖

如果來源QR是低像素PNG，截圖再放大：

> 模組邊緣可能被抗鋸齒、模糊或壓縮。

最好：

1. 回產生器
2. 重新輸出足夠尺寸
3. 再放入版面

不要依賴放大低解析預覽。

## 五、不要任意拉伸寬高

QR應保持：

> 正方形比例。

如果設計軟體只拉寬不拉高：

- finder pattern變形
- module不再正方

掃描可靠度可能下降。

## 六、對比越清楚越好

最保守：

> 深色modules + 淺色背景。

黑底白碼不是所有scanner都同樣可靠。

漸層、透明、照片背景也會降低局部對比。

正式印刷：

> 黑碼白底最容易測。

## 七、Logo為什麼會讓QR失敗？

Logo會直接遮住一部分data / error-correction modules。

Higher ECC能提高容錯能力，但不是：

> 可以任意蓋住30%面積。

容錯比例是codeword recovery能力，不是Logo安全面積保證。

因此：
- Logo盡量小
- 不遮三個finder pattern
- 提高Q/H
- 實際掃多支手機

## 八、反光材質

亮面貼紙、壓克力、玻璃：

> 可能把部分黑白區反射成白光。

掃描角度稍微改變就失敗。

可以：
- 換霧面
- 增大QR
- 避免正對強光
- 增加對比

## 九、曲面也會扭曲

把小QR繞在：
- 細瓶
- 杯子
- 圓柱

會產生幾何變形。

如果曲率很大：

> 改用更大標籤或重新選放置位置。

## 十、印表機墨水暈開

小module如果印到：
- 紙纖維滲墨
- 黑格變粗
- 白格縮小

就可能連在一起。

因此小尺寸QR特別需要：

> 真正列印測試。

## 十一、手機距離不對

QR很大時：

> 太近鏡頭看不完整。

QR很小時：

> 太遠分辨率不足。

掃描器需要同時看見完整 finder pattern 與足夠module細節。

## 十二、鏡頭髒污與低光

先排除最簡單因素：

- 擦鏡頭
- 光線足夠
- 不晃動
- 使用原生相機或可靠scanner

不要一掃不到就直接判斷QR壞掉。

## 十三、掃得到但打不開

這是不同問題。

QR decoding成功後，如果：
- URL 404
- 網頁未公開
- 憑證錯誤
- DNS失效
- 登入權限不足

看起來也像「QR壞了」。

先看掃描結果是不是正確網址。

## 十四、Static QR 不會自動更新

若QR直接編入：

`https://example.com/old-page`

印出後就固定。

頁面搬家：

> QR本身不會變。

除非該URL本身有你控制的redirect。

FunnyTools不提供動態QR代管。

## 十五、印刷前測試流程

1. 下載正式PNG。
2. 放入最終設計稿。
3. 不裁quiet zone。
4. 匯出最終PDF／圖片。
5. 在100%尺寸列印。
6. 用至少兩台手機掃。
7. 從不同角度／距離掃。
8. 確認目的地內容。
9. 才大量印製。

## 十六、常見錯誤

- QR貼到版面邊緣
- 白邊被裁掉
- Logo太大
- 放進深色／花紋背景
- 截圖放大
- 不等比例拉伸
- 只在螢幕測
- 內容網址過期
- 印1000張後才第一次掃

## 十七、FAQ

### QR Code四周一定要白嗎？
核心是clear quiet zone，傳統高對比淺色背景最穩妥。

### Quiet zone多大？
標準QR要求四側至少4 modules。

### QR越大越好嗎？
不是無限越大越好，但太小會讓module難辨識；依掃描距離與內容密度測試。

### Logo會讓QR失效嗎？
可能。提高ECC只能增加容錯，不是任意遮擋保證。

### 螢幕能掃、印出不能掃為什麼？
紙材、解析度、墨水、縮放、反光與quiet zone都可能改變結果。

## 十八、延伸閱讀

- [QR Code產生器](/tools/qr-code-generator/)
- [QR容錯與Logo指南](/guides/qr-error-correction-logo-guide/)
- [Static vs Dynamic QR](/guides/static-vs-dynamic-qr-code-guide/)
- [QR安全與Phishing](/guides/qr-code-phishing-security-guide/)
- [QR與Barcode怎麼選](/guides/qr-code-vs-barcode-guide/)

## 頁面 CTA

**先用最終版設計稿實掃，再印。**

CTA：`開啟QR Code產生器`

次要 CTA：`Logo要用哪個容錯等級？`

## 圖卡與 ALT

`QR symbol + 4-module quiet zone on every side`

ALT：`QR Code四周quiet zone示意圖，顯示黑白模組外四側皆需保留至少四個module寬的淨空區`
