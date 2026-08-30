---
slug: /guides/pearson-vs-spearman-correlation/
seo_title: "Pearson 還是 Spearman？相關分析怎麼選、散佈圖與結果解讀完整指南｜FunnyTools"
meta_description: "Pearson 和 Spearman 怎麼選？完整比較線性 vs 單調關係、連續 vs 次序資料、離群值、常態性、散佈圖、r/ρ 解讀與 APA 報告方式。"
og_title: "Pearson vs Spearman：相關分析到底怎麼選？"
og_description: "不要只用『常態就 Pearson，不常態就 Spearman』選方法。真正關鍵是資料尺度、線性/單調關係與離群值。"
canonical: "https://funnytools.win/guides/pearson-vs-spearman-correlation/"
primary_keyword: "Pearson Spearman 怎麼選"
secondary_keywords: ["Pearson correlation", "Spearman correlation", "Pearson vs Spearman", "相關分析怎麼選", "皮爾森相關", "斯皮爾曼相關"]
search_intent: "資訊型／相關分析方法選擇"
card_title: "Pearson 還是 Spearman？"
card_description: "用資料尺度、線性/單調關係、離群值與散佈圖選對相關係數。"
hero_eyebrow: "相關分析"
hero_title: "Pearson 還是 Spearman？相關分析怎麼選、散佈圖與結果解讀完整指南"
hero_subtitle: "真正的差別不是一句『常態 vs 不常態』：Pearson 看線性關係；Spearman 用排名描述單調關係。"
date_published: "2026-08-27"
date_modified: "2026-08-27"
---

# Pearson 還是 Spearman？相關分析怎麼選、散佈圖與結果解讀完整指南

很多統計課把選擇簡化成：

> 常態 → Pearson  
> 不常態 → Spearman

這個口訣太粗。真正重要的是資料尺度、關係是不是線性、是不是單調、有沒有離群值、是否有大量 ties，以及你真正想回答的是什麼關係。

> **速答：Pearson 還是 Spearman？**  
> Pearson’s r 主要描述兩個量化變項的 **線性關係**；Spearman’s ρ 是基於排名的相關係數，描述兩變項的 **單調關係**，也適合次序資料。若資料有明顯非線性但單調關係、次序尺度或 outlier 使 Pearson 不合適，可考慮 Spearman。不要只靠 Shapiro–Wilk 的 p 值自動選方法；**先畫散佈圖。**

## 一、Pearson r 在看什麼？

Pearson correlation coefficient：

`−1 ≤ r ≤ +1`

- r>0：X 越高，Y 越高。
- r<0：X 越高，Y 越低。
- |r| 越接近 1：線性關係越強。
- r≈0：沒有明顯線性關係。

注意最後一句：

> **r≈0 不等於兩個變項完全沒有任何關係。**

可能存在很強的 U 型關係，但 Pearson r 接近 0。

## 二、Spearman ρ 在看什麼？

Spearman rank correlation 先把數值轉成排名，再看排名之間的一致性。

它關心：

> **X 上升時，Y 是否大致持續上升或持續下降。**

這叫 monotonic relationship。SciPy 的官方統計教學將 Spearman 描述為衡量兩組資料單調關係的非參數相關指標。

## 三、線性和單調有什麼不同？

### 線性
資料大致沿直線，例如：

`Y = 2X + 誤差`

適合 Pearson。

### 單調但非線性
X 越大，Y 仍越大，但增加速度不固定，例如：

`Y = log(X)`

曲線會漸平，但順序基本一致。Spearman 可能仍然很高。

## 四、U 型關係為什麼 Pearson 和 Spearman 都可能失敗？

假設：

`Y = X²`

當 X 從負值走到 0，Y 下降；從 0 走到正值，Y 又上升。它不是單調關係。

因此：

- Pearson 可能接近 0；
- Spearman 也可能接近 0；

但兩變項其實有明確關係。

這就是為什麼：

> **相關分析前一定要畫散佈圖。**

## 五、一張表比較 Pearson vs Spearman

| 項目 | Pearson | Spearman |
|---|---|---|
| 符號 | r | ρ / rₛ |
| 核心 | 線性關係 | 單調關係 |
| 計算基礎 | 原始數值 | 排名 |
| 連續資料 | 適合 | 可用 |
| 次序資料 | 通常不首選 | 常用 |
| 對 outlier | 較敏感 | 通常較不敏感 |
| 非線性單調 | 可能低估 | 可反映 |
| 大量 ties | 可計算但非其核心 | 需正確處理 ties |

## 六、Spearman 是不是「不常態版 Pearson」？

不是這麼簡單。

如果兩個連續變項線性關係很漂亮、沒有 outlier，只是單變項 Shapiro p<.05，不代表一定要換 Spearman。

反之，資料完全「常態」也不代表 Pearson 適合。若關係是彎曲的單調曲線，Spearman 可能更符合問題。

所以選擇關鍵是：

> **關係形狀 + 資料尺度 + outlier**

不只是 normality。

延伸：[Shapiro–Wilk 常態性檢定](/guides/shapiro-wilk-normality-test/)

## 七、Pearson 的常見假設與注意事項

一般推論情境常關心：

- observations independent；
- 兩變項為量化資料；
- 關係大致線性；
- 沒有嚴重 influential outliers；
- 推論 p/CI 時還涉及相關分布條件。

Penn State 的相關教材也特別提醒：Pearson r 應先以 scatterplot 確認線性，且 r 對 outlier 並不 resistant。

## 八、Spearman 需要常態嗎？

Spearman 是 rank-based，通常不要求原始數值服從常態。

但這不代表完全沒有任何假設。你仍要看：

- observations 是否配對正確；
- 是否獨立；
- 關係是否適合用 monotonic association 描述；
- ties 的情況；
- 小樣本 p 值的計算方式。

對非常小的樣本，exact / permutation inference 可能比大樣本近似更合適。

## 九、Outlier 對 Pearson 有多大影響？

一個極端點可能把 r 從 .20 拉到 .80，也可能把 .80 拉到 .20。

例如大部分資料無關，但右上角有一個極端值，Pearson 可能看起來高度正相關。

所以：

> **不要只看 r，必須看散佈圖。**

延伸：[離群值完整指南](/guides/outlier-detection-iqr-z-score-boxplot/)

## 十、Spearman 比較不怕 outlier，是否永遠比較安全？

不是。

Spearman 轉成 rank 後，極端數值的距離不再那麼重要，所以確實比較不受 magnitude 影響；但它也因此丟掉原始距離資訊。

如果真正關係是漂亮線性、數值尺度有意義，Pearson 會更直接。

## 十一、Likert 題目該用哪個？

### 單一 Likert 題
例如 1～5 的「非常不同意」到「非常同意」，本質上是 ordinal。Spearman 通常比 Pearson 的尺度假設更直接。

### 多題加總量表
若總分有許多可能值，研究慣例可能把它近似當連續資料，再依分布和模型使用 Pearson。

不能把所有 Likert 情境一概而論。

## 十二、相關係數大小怎麼看？

常見粗略規則：

- |r|≈.10：小
- |r|≈.30：中
- |r|≈.50：大

但這不是跨領域標準。不同領域的典型關係強度、測量誤差與實務後果完全不同。

更好的做法是報：

- r/ρ；
- 95% CI；
- p；
- sample size；
- scatterplot；
- 領域脈絡。

## 十三、正相關 .60 和負相關 −.60 哪個比較強？

強度看絕對值：

`|.60| = |−.60|`

所以一樣強。符號只表示方向：+ 同方向；− 反方向。

## 十四、r=.80 代表 X 解釋 Y 80% 嗎？

不對。

在簡單線性相關情境：

`r² = .80² = .64`

可以談約 64% 的變異共享／簡單線性模型解釋程度。

但：

> **correlation ≠ causation**

不能寫「X 造成 Y 64%。」

延伸：[R² vs Adjusted R²](/guides/r-squared-adjusted-r-squared/)

## 十五、p<.05 代表相關很強嗎？

不代表。

N 很大時，`r=.08` 也可能 p<.001。

所以完整報告至少看 correlation coefficient、CI、p 和 sample size。

## 十六、Pearson 範例

N=100：

`r=.42, p<.001, 95% CI [.25,.56]`

可以寫：

> 學習投入與閱讀成績呈中等程度正向線性關係，*r*(98)=.42, 95% CI [.25,.56], *p*<.001。

不要寫：「學習投入造成閱讀成績提升 42%。」

## 十七、Spearman 範例

N=60。

變項：
- 班級排名；
- 學習投入等級。

`ρ=−.58, p<.001`

如果排名 1 代表最好，負相關可以解讀為：投入程度越高，名次數字傾向越小，也就是排名更前面。

負號的解讀一定要配合量尺方向。

## 十八、散佈圖可能比係數更重要

相同的 r、平均數和變異數，可能對應完全不同圖形。

所以在相關分析：

> **係數是摘要，圖形才讓你看到資料結構。**

至少檢查：

- 線性；
- curvature；
- clusters；
- outliers；
- heteroscedasticity。

## 十九、兩個群集也可能造成假相關

假設資料其實由國中生群與大學生群組成。兩群的 X、Y 水準都不同，合併後 r=.75，但群內可能完全沒有相關。

這可能涉及 confounding、group structure 或 Simpson’s paradox 類問題。

因此若有群組變項，不能只看整體 r。

## 二十、Partial correlation 和一般 correlation 差在哪？

一般 Pearson 看 X 與 Y 的總體線性關係。

Partial correlation 看控制 Z 後 X 與 Y 的線性關係。

例如控制年齡後看使用時間和成績。但統計上的「控制」不等於真正消除所有 confounding，更不自動產生因果解釋。

## 二十一、多個 correlation 要不要校正？

如果你有 30 個變項，做全部兩兩 correlation：

`30×29/2 = 435`

個檢定。

如果每一個都 α=.05，不做 correction，偽陽性問題會非常嚴重。

可考慮：

- Bonferroni；
- Holm；
- FDR；
- 預先指定主要假設。

## 二十二、常見錯誤

- **不常態就一定 Spearman。** → 錯。
- **Pearson r=0 就代表沒任何關係。** → 可能是非線性。
- **r=.60 = 解釋 60%。** → 錯。
- **相關顯著 = 因果。** → 錯。
- **完全不畫 scatterplot。** → 非常危險。
- **忽略 outlier。** → 可能讓 r 完全變樣。

## 二十三、快速選擇流程

1. 兩個觀察是否一一配對？
2. 資料是量化還是 ordinal？
3. 畫 scatterplot。
4. 關係是 linear 還是 monotonic nonlinear？
5. 檢查 outliers / clusters。
6. 選 Pearson / Spearman / 其他 model。

## 二十四、常見問題 FAQ

### Pearson 一定要求 X 和 Y 都常態嗎？
Pearson coefficient 的計算本身不需要兩變項完美常態；若要做傳統顯著性推論，分布假設才更重要。實務上線性、outlier 與獨立性更不能忽略。

### Spearman 可以用連續資料嗎？
可以。若你想描述 monotonic rank relationship，連續資料也能用 Spearman。

### Likert 1–5 可以 Pearson 嗎？
單題本質是 ordinal，Spearman 更直觀；多題量表總分是否可作連續處理要依量尺與領域慣例判斷。

### Pearson 和 Spearman 哪個比較容易顯著？
不能用「容易顯著」選方法。

### Spearman ρ=.70 可以說很大嗎？
通常表示相當強的正向單調關係，但大小仍需依研究領域解讀。

### r 很高就代表預測很準嗎？
不一定。還要看 regression model、prediction error 與 validation。

### 相關可以是 1.2 嗎？
不行。Pearson/Spearman 都介於 −1 到 +1。

## 二十五、延伸閱讀

- [R² vs Adjusted R²](/guides/r-squared-adjusted-r-squared/)
- [離群值 IQR / Z-score / Boxplot](/guides/outlier-detection-iqr-z-score-boxplot/)
- [Shapiro–Wilk 常態性](/guides/shapiro-wilk-normality-test/)
- [p 值完整指南](/guides/p-value-interpretation/)
- [效果量完整指南](/guides/effect-size-guide/)

## 頁面 CTA

**已經從 SPSS 得到 Pearson 或 Spearman 的係數與 p 值？**

先用本頁確認你選的是「線性」還是「單調」關係，再把係數、p 值與樣本數整理成 APA 7 結果句。

CTA：`開啟 APA 7 統計報告產生器`

次要 CTA：`前往 SPSS 結果解讀助手`

## 圖卡與 ALT

圖卡標題：

`Pearson = Linear`  
`Spearman = Monotonic Rank`

提示：`先畫 Scatterplot，不要只看 Shapiro p`

ALT：`Pearson 與 Spearman 相關比較圖，Pearson 用於線性關係，Spearman 用於排名與單調關係`

## 參考資料

- Penn State STAT 200: Correlation。
- SciPy Pearson correlation 官方文件。
- SciPy Spearman correlation 官方統計教學。

> 本頁為相關分析方法選擇指南。複雜的非線性、群聚或縱貫資料應考慮更適合的統計模型。
