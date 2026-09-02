---
slug: "/guides/qr-error-correction-logo-guide/"
seo_title: "QR Code 容錯 L M Q H 怎麼選？Logo、7% 15% 25% 30% 完整指南｜FunnyTools"
meta_description: "QR Code容錯等級L/M/Q/H差在哪？依DENSO WAVE標準說明約7%、15%、25%、30% codeword recovery、Logo遮擋、印刷環境、容量與尺寸取捨。"
og_title: "QR Code L/M/Q/H 怎麼選？"
og_description: "容錯越高不是永遠越好：可靠性上升的同時也會增加資料冗餘與符號密度。"
canonical: "https://funnytools.win/guides/qr-error-correction-logo-guide/"
primary_keyword: "QR Code 容錯等級"
card_title: "QR Code L/M/Q/H 怎麼選？"
card_description: "理解7%、15%、25%、30%的真正含義，再決定Logo與印刷環境要用哪一級。"
hero_title: "QR Code 容錯 L M Q H 怎麼選？Logo、7% 15% 25% 30% 完整指南"
hero_subtitle: "H並不是『最高所以永遠最好』；它犧牲容量與簡潔度來換更高資料恢復能力。"
---

# QR Code 容錯 L M Q H 怎麼選？Logo、7% 15% 25% 30% 完整指南

FunnyTools QR Code工具提供：

- L
- M
- Q
- H

很多人直接選H。

但H不是所有情境的最佳答案。

> **速答：L/M/Q/H差在哪？**  
> DENSO WAVE 的QR規格把error correction分成四級：L約可恢復7% codewords、M約15%、Q約25%、H約30%。容錯越高，需要加入的錯誤修正資料越多，因此相同內容可能需要更大的symbol version或更密的模組。一般乾淨的網址QR可從M起步；有Logo、較容易磨損或印刷環境較差時可提高Q或H，但仍必須實掃，不能把30%誤解成「Logo可以遮住30%面積」。

## 一、容錯在修復什麼？

QR Code使用：

> Reed–Solomon error correction。

當部分codewords因：
- 污損
- 遮擋
- 印刷缺陷

無法讀取時，可利用冗餘資料恢復。

## 二、四個等級

| Level | 約可恢復 codewords |
|---|---:|
| L | 7% |
| M | 15% |
| Q | 25% |
| H | 30% |

這是DENSO WAVE官方規格的近似復原能力。

## 三、為什麼不是「遮住30%都沒事」？

因為：
- 損傷位置不均
- finder pattern不能隨便遮
- alignment / timing pattern重要
- codeword分布不是單純以畫面面積計算

所以H=30%：

> 不是Logo占面積30%的安全證書。

## 四、Logo應該放哪？

通常放：

> 中央。

避免三個角落的大型finder patterns。

但中央也不是「完全安全區」。

仍需要：
- 小Logo
- 白色padding
- Q/H
- 實際測試

## 五、Logo要不要加白底？

若Logo色彩複雜：

> 加一小圈白底可提高Logo和QR modules邊界清晰度。

但白底本身也是遮擋。

所以仍需控制面積。

## 六、M為什麼常被當一般起點？

DENSO WAVE指出：

> M（約15%）是很常使用的等級。

原因是容量與恢復能力取得中間平衡。

對：
- 一般網址
- 室內海報
- 乾淨紙張

通常合理。

## 七、什麼時候考慮Q/H？

- 中央Logo
- 戶外污損
- 包裝刮擦
- 小部分可能被遮
- 現場掃描環境不穩

但higher ECC不會修復：
- URL失效
- 對比太低
- 被裁掉finder
- 大幅變形

## 八、為什麼容錯提高會讓QR變密？

資料容量有限。

加入更多error-correction codewords後：

> 留給真正payload的空間變少。

同樣內容可能需要更高version。

更高version：
> modules增加。

如果輸出尺寸固定：

> 每個module變小。

## 九、所以H有時反而掃得更差？

在非常小的印刷尺寸中：

> 有可能。

因為higher ECC導致symbol更密，每個module過小，可能抵銷容錯收益。

所以最佳設定取決於：
- payload
- print size
- scanner
- environment

不是永遠H。

## 十、短網址的重要性

若能使用：

`https://example.com/a`

不要為了追蹤把非常長參數全部寫進QR。

短payload通常：
- modules較少
- 圖更簡潔
- 小尺寸更容易掃

但使用URL shortener也會帶來：
- 服務依賴
- destination透明度降低
- 過期風險

需取捨。

## 十一、FunnyTools如何選？

現行工具允許你自己選：
- error correction
- output size
- logo

工具頁已提醒：

> 加Logo後建議Q或H並實際掃描。

Task009會把背後原因補完整。

## 十二、實測矩陣

如果是重要海報，可以做：

- M / no logo
- Q / logo
- H / logo

各輸出一張。

再測：
- iPhone
- Android
- 螢幕
- 列印
- 距離
- 低光

選最穩定、又不過度密集的版本。

## 十三、常見錯誤

- 不管內容一律H
- H就把Logo放超大
- Logo蓋finder pattern
- 提高ECC卻把整張圖縮更小
- 只看預覽不實掃
- 把error correction當URL備援

## 十四、FAQ

### M是15%的什麼？
約15%的全部codewords可以被復原，不等同15%畫面面積。

### 加Logo一定要H嗎？
不是硬規則；可從Q/H測試，依Logo與尺寸決定。

### H一定最好嗎？
不是，會增加冗餘並可能提高symbol密度。

### QR Code髒掉可以修嗎？
在error correction能力範圍內可能可以。

### Finder pattern可以遮嗎？
不建議，這些定位圖形對掃描非常重要。

## 十五、延伸閱讀

- [QR Code產生器](/tools/qr-code-generator/)
- [QR掃不到排查](/guides/qr-code-not-scanning-print-guide/)
- [Static vs Dynamic QR](/guides/static-vs-dynamic-qr-code-guide/)
- [QR安全指南](/guides/qr-code-phishing-security-guide/)
- [QR與Barcode完整中心](/guides/qr-barcode/)

## 頁面 CTA

**一般網址先從M開始；要加Logo，再用Q/H做實際掃描測試。**

CTA：`開啟QR Code產生器`

次要 CTA：`QR印出來掃不到？`

## 圖卡與 ALT

`L 7% • M 15% • Q 25% • H 30% codeword recovery`

ALT：`QR Code L M Q H容錯等級比較圖，顯示約7%、15%、25%、30%的codeword恢復能力`

## 放置標誌後的測試順序

加入中心標誌會遮住一部分模組，因此不能只依賴 H 等級就直接送印。先用沒有標誌的原始 QR 確認資料正確，再以目標尺寸加入標誌，最後用多支手機和實際印刷樣張測試。若掃描距離、亮度或角度稍有變化就失敗，應先縮小標誌、增加留白或提高輸出解析度，而不是繼續堆疊裝飾。

容錯等級描述的是可恢復的編碼資料比例，不是對模糊、反光、低對比和裁切的保證。背景要保持乾淨，前景與背景有足夠對比，四周保留完整 quiet zone；所有改版都要重新掃描。這樣才能把 QR 的編碼參數與印刷品質分開判斷。

最後請以成品尺寸測試，而不是只測試放大的設計檔。

並記下每次改版的掃描結果。

再確認版本。
