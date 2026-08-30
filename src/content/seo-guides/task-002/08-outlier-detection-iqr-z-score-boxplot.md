---
slug: /guides/outlier-detection-iqr-z-score-boxplot/
seo_title: "離群值怎麼判斷？IQR、Z-score、箱型圖與 1.5×IQR 完整指南｜FunnyTools"
meta_description: "離群值怎麼找？完整說明 boxplot、IQR、Q1/Q3、1.5×IQR、Z-score ±3、極端值、何時可以刪除，以及離群值對平均數、相關、迴歸與常態性檢定的影響。"
og_title: "離群值怎麼判斷？IQR、Z-score、Boxplot 一次懂"
og_description: "被箱型圖標成 outlier 不代表資料錯誤。先找，再確認，再做敏感度分析，最後才決定如何處理。"
canonical: "https://funnytools.win/guides/outlier-detection-iqr-z-score-boxplot/"
primary_keyword: "離群值 怎麼判斷"
secondary_keywords: ["IQR 離群值", "1.5 IQR", "Z score 離群值", "boxplot outlier", "箱型圖離群值", "outlier detection"]
search_intent: "資訊型／資料清理與統計診斷"
card_title: "離群值怎麼判斷？"
card_description: "IQR、Z-score 與箱型圖只是辨識工具；真正關鍵是判斷資料點為何異常、能不能刪。"
hero_eyebrow: "資料診斷與清理"
hero_title: "離群值怎麼判斷？IQR、Z-score、箱型圖與 1.5×IQR 完整指南"
hero_subtitle: "Outlier 不是『看到很遠就刪掉』。先區分輸入錯誤、真實極端值與模型高影響點，再決定保留、修正或做敏感度分析。"
date_published: "2026-08-27"
date_modified: "2026-08-27"
---

# 離群值怎麼判斷？IQR、Z-score、箱型圖與 1.5×IQR 完整指南

資料：

`10, 11, 12, 12, 13, 14, 100`

100 看起來很奇怪。

但真正的問題不是只有「100 是不是 outlier？」而是：

> **100 為什麼出現？是真實極端值、輸入錯誤、不同群體，還是合理但罕見的個案？**

> **速答：離群值怎麼判斷？**  
> 常見初步方法包括箱型圖的 `1.5×IQR` 規則與 Z-score，但它們只是 **flagging rules**，不是自動刪除規則。IQR 法先算 Q1、Q3 與 `IQR=Q3−Q1`，低於 `Q1−1.5×IQR` 或高於 `Q3+1.5×IQR` 的值常被標示為 potential outlier。Z-score 則常用 |z|>3 作粗略警示，但只在分布與尺度合理時較有意義。被標記後必須回到原始資料與研究設計判斷。

## 一、什麼是離群值？

Outlier 是與資料主要分布明顯不同的觀察值。

但「不同」可能來自：

1. 輸入錯誤；
2. 儀器錯誤；
3. 單位錯誤；
4. 真實罕見個案；
5. 不同子群；
6. 研究流程改變；
7. 異常行為；
8. 自然長尾分布。

所以 outlier detection 是：

> **診斷起點，不是清除按鈕。**

## 二、IQR 是什麼？

IQR：

`IQR = Q3 − Q1`

代表中間 50% 資料的範圍。

因為只使用 quartiles，IQR 對極端值比 Mean/SD 更 robust。

## 三、1.5×IQR 規則怎麼算？

先找：

- Q1；
- Q3；
- IQR。

下界：

`Lower Fence = Q1 − 1.5×IQR`

上界：

`Upper Fence = Q3 + 1.5×IQR`

超出 fence 的值常被 boxplot 標成 potential outlier。

## 四、IQR 實際例子

資料：

`1,2,3,4,5,6,7,20`

假設依使用軟體的 quartile convention 得到：

- Q1=2.5；
- Q3=6.5；
- IQR=4。

上界：

`6.5 + 1.5×4 = 12.5`

20>12.5，所以 20 被 IQR rule 標記。

但：

> **標記 ≠ 錯誤。**

## 五、為什麼不同軟體 Q1/Q3 可能不同？

Quartile 有多種計算 convention。

小樣本時 Excel、R、Python、SPSS 可能在 interpolation 上有差異，因此 Q1、Q3 與 fence 可能略有不同。

研究中最好使用統一軟體／明確定義，不要混用不同計算方式後再比較結果。

## 六、箱型圖怎麼看？

Boxplot 通常包含：

- Q1；
- Median；
- Q3；
- whiskers；
- potential outliers。

盒子代表中間 50%，盒內線是 median。

Whiskers 常延伸到仍位於 1.5×IQR fence 內的最遠資料點；超出者畫成點。

## 七、Boxplot 上的點一定要刪嗎？

絕對不是。

例如年收入資料大多數人在 30～80 萬，一位 500 萬。這個人可能是真的高收入，不是資料錯誤。

如果你把他刪掉，你是在改變研究母體的代表方式。

所以必須有合理規則與原因。

## 八、Z-score 怎麼找 outlier？

Z-score：

`z = (x − mean) / SD`

表示一筆資料距離 mean 幾個 SD。

常見粗略規則：

- |z|>2：值得看；
- |z|>3：常被標成 potential extreme。

但不是絕對刪除線。

FunnyTools 有 Z 分數工具，Codex 上架時需以 repository 內實際 route 建立連結。

## 九、Z-score 為什麼不適合嚴重偏態資料？

Mean 和 SD 本身就受 outlier 影響。

右偏分布中：

- outlier 把 mean 拉高；
- SD 也變大；

反而可能讓自己的 z 沒想像中極端。

對偏態資料，median/IQR-based 方法常更 robust。

## 十、IQR 和 Z-score 怎麼選？

| 情境 | IQR | Z-score |
|---|---|---|
| 明顯偏態 | 較適合 | 較不理想 |
| 對稱常態近似 | 可以 | 常用 |
| 極端值很多 | robust | 受影響 |
| 需 boxplot | 直接對應 | 不直接 |
| 標準化解讀 | 不直接 | 直接 |

最好不是二選一，而是：

> **圖形 + robust rule + domain check。**

## 十一、Modified Z-score 是什麼？

為了更 robust，可以使用 median 與 MAD（median absolute deviation）建立 modified z-score。

它不像普通 z 那麼依賴 mean/SD。對有 outlier 或偏態的資料，可以作為額外診斷。

## 十二、Outlier 對平均數有什麼影響？

資料：

`10,11,12,13,14`

Mean=12。

加一個 100：

Mean=26.67。

Median 卻仍接近原本中心。

所以離群值是 Mean 被拉動的重要原因。

延伸：[平均數 vs 中位數 vs 眾數](/guides/mean-median-mode-when-to-use/)

## 十三、Outlier 對 SD 有什麼影響？

SD 使用平方偏差，極端值的偏差平方會非常大。

所以 outlier 常大幅提高 SD，進一步影響：

- t test；
- CI；
- effect size；
- z scores。

## 十四、Outlier 對 Pearson r 有多大影響？

非常大。

一個右上角 extreme point 可以創造高正相關；一個反方向 extreme point 也可以摧毀原本強相關。

所以 correlation 一定要看 scatterplot。

延伸：[Pearson vs Spearman](/guides/pearson-vs-spearman-correlation/)

## 十五、Outlier 對 regression 有什麼影響？

迴歸要區分：

### Outlier in Y
殘差很大。

### High leverage point
X 值很極端。

### Influential point
移除後係數、預測或模型結論有明顯改變。

常見診斷：

- standardized residual；
- leverage；
- Cook’s distance；
- DFBETAs。

因此「outlier」不是只有一個概念。

## 十六、Cook’s Distance 是什麼？

Cook’s D 衡量某一觀察值對整體 regression fitted model 的影響程度。

常見粗略警示有 D>1 或 4/n 等，但都只是 heuristic。

真正應看：

> 移除後模型結論是否明顯改變？

## 十七、Outlier 對 Shapiro–Wilk 的影響

一個極端值可能讓 normality test 顯著。

所以 Shapiro p<.05 時，先看是不是一兩個 outlier 在主導。

延伸：[Shapiro–Wilk 常態性](/guides/shapiro-wilk-normality-test/)

## 十八、可以刪除離群值的合理情況

### 1. 明確輸入錯誤
例如身高輸入 `1750 cm`，原始問卷其實是 `175.0 cm`。應修正，而不是把它當真實極端值。

### 2. 明確不符合納入條件
研究只收 18～25 歲，但一筆 52 歲因資料匯入錯誤混入。

### 3. 儀器故障
有設備 log 證明該筆量測無效。

這些都有外部證據，而不是因為統計結果不好看才刪。

## 十九、不應只因「太極端」就刪

如果 100 是真實值，刪除它只是因為它讓 p 變不好看，是不當資料處理。

更好的做法可能是：

- 主分析保留；
- sensitivity analysis 排除；
- robust methods；
- transformation；
- 報告兩種結果。

## 二十、事先設定規則很重要

最好在 analysis plan 先寫：

> 若 standardized residual>3 且確認為測量錯誤才排除。

或：

> 所有有效觀察保留，另做 robust sensitivity analysis。

這比看到結果後臨時決定可靠得多。

## 二十一、Winsorization 是什麼？

Winsorization 不是刪除資料，而是把極端值截到指定 percentile。

例如：

- 低於 1st percentile → 設為 1st percentile；
- 高於 99th → 設為 99th percentile。

它可降低 extreme influence，但同樣會改變資料，必須有方法論理由、最好事先規劃並透明報告。

## 二十二、Transformation 可以解決 outlier 嗎？

Log transformation 可縮小右偏資料的大值距離，例如 income、reaction time 或濃度資料。

但 transformation 不是「藏掉 outlier」，而且轉換後的研究問題和係數解釋也會改變。

## 二十三、Robust methods 是另一條路

如果 outlier 是真實資料的一部分，可考慮：

- median；
- trimmed mean；
- robust regression；
- Spearman；
- bootstrap；
- quantile regression。

重點：

> 不一定要在「刪」與「不刪」之間二選一。

## 二十四、實際案例：班級成績 0 分

資料中有一位 0 分。

先問：

- 缺考記 0？
- 真正作答 0？
- 資料 missing 被錯編成 0？

三種情況處理完全不同。

如果是缺考，0 可能不是有效測量；如果是真實作答，0 是研究資料的一部分。

所以資料字典比 outlier rule 更重要。

## 二十五、實際案例：網站流量

日流量：

`100,110,95,105,1000`

1000 可能是：

- 爆文；
- bot；
- 廣告投放；
- tracking bug。

你需要回查 event log，不能只用 1.5×IQR 決定。

## 二十六、完整 Outlier 處理流程

1. **畫圖：**boxplot、histogram、scatterplot。
2. **用規則標記：**IQR、z、residual。
3. **回原始資料。**
4. **判斷原因。**
5. **決定：**修正、保留、排除或 robust analysis。
6. **做 sensitivity analysis。**
7. **透明報告。**

## 二十七、論文方法可以怎麼寫？

> 本研究先以箱型圖與 1.5×IQR 規則辨識潛在離群值，再回查原始資料與資料輸入紀錄。真實且符合納入條件之極端觀察值不因統計位置而自動刪除；主要分析保留所有有效值，另進行排除高影響觀察值之敏感度分析，以檢查結論穩健性。

這比「離群值全部刪掉」好得多。

## 二十八、常見錯誤

- **Boxplot 出現點就刪。** → 錯。
- **|z|>3 一定是假資料。** → 錯。
- **刪掉後 p<.05 就說分析變好。** → 高度危險。
- **只檢查 Y，不看 regression influence。** → 錯。
- **完全不保留刪除前結果。** → 降低可重現性。
- **資料錯誤不修正，只當 outlier 刪。** → 應優先修正可確認錯誤。

## 二十九、常見問題 FAQ

### 1.5×IQR 是絕對標準嗎？
不是，它是 Tukey boxplot 常見 heuristic。

### Z-score 超過 3 一定刪嗎？
不是，只是需要檢查。

### Outlier 可以保留嗎？
可以，而且真實且符合研究母體的 extreme observation 通常應有充分理由才排除。

### Outlier 會讓 p 值變小還是變大？
都有可能，取決於方向和模型。

### IQR 比 Z-score 好嗎？
偏態與 outlier 情況下較 robust，但沒有一個方法永遠最好。

### 箱型圖可以判斷資料是否常態嗎？
不能完整判斷。可以看偏態與 outlier，但 normality 更適合搭配 Q-Q Plot。

### 刪除 outlier 要在論文說嗎？
必須透明報告規則、數量、理由與對結果的影響。

## 三十、延伸閱讀

- [Shapiro–Wilk 常態性](/guides/shapiro-wilk-normality-test/)
- [Pearson vs Spearman](/guides/pearson-vs-spearman-correlation/)
- [平均數 vs 中位數 vs 眾數](/guides/mean-median-mode-when-to-use/)
- [標準差 SD vs SE](/guides/standard-deviation-vs-standard-error/)
- [教育與統計工具中心](/education-statistics/)

## 頁面 CTA

**想先知道一筆數值離平均幾個標準差？**

可用 FunnyTools Z 分數工具做初步標準化，但若資料明顯偏態或含極端值，不要只靠 Z-score 決定是否刪除。

CTA：`開啟 Z 分數計算器`

次要 CTA：`閱讀常態性檢定指南`

## 圖卡與 ALT

圖卡標題：`Find → Verify → Decide`

三工具：

- `Boxplot / 1.5×IQR`
- `Z-score`
- `Regression influence`

警語：`Outlier ≠ Error ≠ Delete`

ALT：`離群值判斷流程圖，使用 IQR、Z-score 與迴歸影響值並提醒離群值不等於資料錯誤`

## 參考資料

- NIST/SEMATECH EDA Handbook：outlier、normal probability plot、Grubbs 等資料診斷方法。
- FunnyTools Z 分數與標準差工具。
- 通用 robust statistics 與 regression diagnostics 原則。

> 離群值處理會直接影響研究結論。任何排除都應有方法論與資料品質理由，並透明報告。
