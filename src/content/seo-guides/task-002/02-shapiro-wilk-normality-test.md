---
slug: /guides/shapiro-wilk-normality-test/
seo_title: "Shapiro–Wilk 常態性檢定怎麼看？p<.05、Q-Q Plot 與常態假設完整指南｜FunnyTools"
meta_description: "Shapiro–Wilk 怎麼看？說明 W、p<.05、p>.05、樣本數影響、Q-Q Plot、離群值，以及 t 檢定、ANOVA、迴歸真正要檢查哪個常態假設。"
og_title: "Shapiro–Wilk 怎麼看？別再只用 p<.05 判常態"
og_description: "常態性檢定不是紅綠燈。用 Shapiro–Wilk、Q-Q Plot、樣本數與模型殘差一起判斷。"
canonical: "https://funnytools.win/guides/shapiro-wilk-normality-test/"
primary_keyword: "Shapiro Wilk 怎麼看"
secondary_keywords: ["Shapiro Wilk p值", "常態性檢定", "Shapiro Wilk p<.05", "Q-Q plot", "常態分布檢定", "SPSS 常態性"]
search_intent: "資訊型／統計假設檢查"
card_title: "Shapiro–Wilk 常態性檢定怎麼看？"
card_description: "不要只看 p 值：一起用 Q-Q Plot、樣本數與研究模型判斷常態假設。"
hero_eyebrow: "統計假設與資料診斷"
hero_title: "Shapiro–Wilk 常態性檢定怎麼看？p<.05、Q-Q Plot 與常態假設完整指南"
hero_subtitle: "Shapiro–Wilk 的 H₀ 是『資料來自常態分布』，但是否改用非參數統計，不能只靠一個 p 值決定。"
date_published: "2026-08-27"
date_modified: "2026-08-27"
---

# Shapiro–Wilk 常態性檢定怎麼看？p<.05、Q-Q Plot 與常態假設完整指南

SPSS 的 Tests of Normality 常出現：

| | Shapiro–Wilk |
|---|---|
| Statistic | .962 |
| df | 80 |
| Sig. | .018 |

很多人看到 `p=.018 < .05`，就直接說：「資料不是常態，所以不能做 t 檢定。」這個判斷太快了。

> **速答：Shapiro–Wilk 怎麼看？**  
> Shapiro–Wilk 的虛無假設通常是「樣本來自常態分布」。若 p<.05，代表在目前檢定與顯著水準下，資料對完全常態的假設呈現顯著偏離；若 p≥.05，只能說沒有足夠證據拒絕常態，不能證明資料完美常態。真正決定 t 檢定、ANOVA 或迴歸是否適合時，還要看 **你應檢查的是原始資料還是模型殘差／差分、Q-Q Plot、離群值、樣本數與方法的穩健性**。

## 一、Shapiro–Wilk 的 H₀ 是什麼？

常見設定：

- **H₀：**資料來自常態分布。
- **H₁：**資料不是來自常態分布。

因此：

- p<.05：在 α=.05 下拒絕 H₀。
- p≥.05：沒有足夠證據拒絕 H₀。

但第二句不能改寫成「證明資料是常態」。和一般假設檢定一樣：**未拒絕 ≠ 證明為真。**

## 二、W 值是什麼？

Shapiro–Wilk 會產生 W statistic。W 越接近 1，通常表示排序後資料和理論常態 order statistics 的對應更接近線性；較小 W 則表示偏離常態的證據增加。

NIST 將 Shapiro–Wilk 描述為檢查樣本是否來自常態分布的常態性檢定方法之一。實務上不要只看 W，也要結合 p 值、Q-Q Plot、樣本數與離群值。

## 三、為什麼不能只看 p<.05？

因為 Shapiro–Wilk 和其他假設檢定一樣，會受到樣本量影響。

### 大樣本
很小、實務上可能不重要的偏離，也可能得到很小的 p。

### 小樣本
資料明顯偏斜，但因檢定力不足，可能 p>.05。

所以：

> **p 值不是「常態程度分數」。**

## 四、大樣本 p 很小，圖形卻可能還算合理

假設 N=800：

`W=.991, p<.001`

如果只看 p，你會說「不常態」。但 Q-Q Plot 顯示大多數點貼近直線，只在尾端輕微偏離，而且沒有極端 outlier。

對部分對常態違反相對穩健的平均數比較方法而言，這未必代表必須立刻改成非參數方法。你應回到：

> **該方法真正假設的是什麼，以及偏離程度是否會實質影響推論。**

## 五、小樣本 p>.05，也不能保證沒問題

假設 N=10，Shapiro p=.21，但資料是：

`2, 3, 3, 4, 4, 5, 5, 6, 7, 60`

有一個巨大極端值。這時不能因 p>.05 就說「常態性沒問題」。圖形與原始資料會提醒你更大的風險。

## 六、Q-Q Plot 怎麼看？

Q-Q Plot 把觀察資料的 quantiles 和理論常態 quantiles 比較。如果資料大致常態，點通常會接近一條直線。

常見模式：

- **大致直線：**常態模型可能合理。
- **S 型：**可能代表尾部比常態更厚或更薄。
- **一側明顯彎曲：**可能有偏態。
- **少數尾端點遠離直線：**可能有離群值。

NIST 也把 normal probability plot 視為檢查資料是否近似常態的重要圖形方法。

## 七、Histogram 能不能取代 Q-Q Plot？

Histogram 可以輔助，但受 bin width、樣本數與分組方式影響。小樣本 histogram 特別容易看錯。

因此較好的做法是：

> **Histogram + Q-Q Plot + 統計檢定 + 原始資料檢查**

而不是只看一張圖。

## 八、t 檢定真正要求哪個東西常態？

這比「資料常不常態」更重要。

### One-sample t test
通常關心該變項相對於假設平均的分布與推論條件。

### Paired t test
更重要的是：

> **配對差分 `D = 後測 − 前測` 的分布。**

不是要求前測、後測各自都完美常態。

### Independent t test
關注兩組觀察與誤差結構。t 類方法在部分條件下對中度非正態具有一定穩健性，尤其樣本較大且沒有嚴重不平衡與極端離群時。

延伸：[獨立樣本 vs 相依樣本 t 檢定](/guides/independent-vs-paired-t-test/)

## 九、ANOVA 要檢查的是什麼？

傳統 ANOVA 的常態假設更精確地說，是關於模型誤差／各條件下的殘差分布，而不是要求把所有組別混在一起後的原始分數呈完美常態。

如果三組平均不同，把三組混在一起檢查整體資料，本來就可能出現多峰或明顯偏離。正確診斷要跟模型結構一致。

## 十、迴歸要檢查 X 和 Y 都常態嗎？

常見誤解是：「所有自變項和依變項都要常態。」不對。

經典線性模型中，常態假設主要和誤差項／殘差的條件分布有關，特別是在推論與 CI。X 本身不需要服從常態分布。

比起對每個欄位跑 Shapiro，更重要的是：

- 殘差 Q-Q Plot；
- residual vs fitted；
- linearity；
- homoscedasticity；
- influential points；
- independence。

## 十一、常態性檢定顯著就一定改 Mann–Whitney 嗎？

不一定。這個「Shapiro p<.05 → 非參數」流程過度機械。

你還要看：

- 樣本大小；
- 組間是否平衡；
- 偏態程度；
- outliers；
- 目標參數是平均數還是分布位置；
- robust / Welch / bootstrap 方法；
- 非參數方法真正檢驗的問題。

Mann–Whitney U 也不是單純的「非參數 t test 替代品」。

## 十二、什麼情況下非正態真的比較令人擔心？

例如：

- N 很小；
- 極端偏態；
- 一兩個 outlier 影響平均；
- 組間樣本數嚴重不平衡；
- 同時有變異數差異；
- 資料有天花板／地板；
- 分布離散或零膨脹；
- 測量尺度根本不是連續。

這些情況下，單純依賴傳統常態理論方法要更謹慎。

## 十三、Shapiro–Wilk 和 Kolmogorov–Smirnov 哪個比較好？

兩者都能用於分布適配，但方法不同。Shapiro–Wilk 專門用於 normality，且在許多比較研究中具有良好檢定力，因此常態性檢查中非常常見。

對一般 SPSS 初學者，不需要把「哪個 p 值比較小」當成選方法標準，更重要的是建立完整診斷流程。

## 十四、SPSS 顯示 Sig.=.000 怎麼寫？

不要寫 `p=.000`，應寫 `p<.001`。真正 p 值不等於 0，只是軟體顯示精度造成。

延伸：[p 值怎麼看](/guides/p-value-interpretation/)

## 十五、完整判斷流程

看到 Shapiro–Wilk 結果時：

1. **確認你檢查對資料了嗎？** paired t 應看差分；迴歸更重視 residual。
2. **看樣本數。** 理解檢定力。
3. **看 p 值。** 但不要停止。
4. **看 Q-Q Plot。** 判斷偏離型態。
5. **找 outliers。** 離群可能是偏離主因。
6. **考慮方法穩健性。** 是否可用 Welch、robust、bootstrap 或轉換。
7. **回到研究問題。** 不要為「滿足檢定」改掉原本想估計的參數。

## 十六、案例：兩組學生後測

A 組 n=35，B 組 n=38。

Shapiro：

- A：p=.021
- B：p=.092

常見錯誤：「A 不常態，所以不能 t test。」

更好的判斷：

1. 畫兩組 Q-Q；
2. 看是否只是輕度 skew；
3. 看 outlier；
4. 看樣本量是否讓 Welch t 相對穩健；
5. 若嚴重偏態，再考慮 robust / transformation / nonparametric 方法。

## 十七、案例：前後測

N=24。

前測 Shapiro p=.03，後測 p=.04。很多人直接說不能 paired t，但真正應先算：

`D = post − pre`

如果差分 Q-Q 合理，paired t 的常態假設可能並沒有你想像中的問題。

## 十八、案例：迴歸

研究：

- X1=出席率；
- X2=動機；
- Y=成績。

X1 很偏態，不代表線性迴歸立刻失效。你要檢查關係是否線性、residual pattern、residual normality、influential points 與 variance pattern。

## 十九、離群值和常態性有什麼關係？

單一極端值就可能讓 skewness、kurtosis、Shapiro–Wilk 與 Q-Q Plot 產生明顯變化。因此常態性顯著時，先確認是整體分布形狀不同，還是只有少數資料點。

延伸：[離群值怎麼判斷：IQR、Z-score 與箱型圖](/guides/outlier-detection-iqr-z-score-boxplot/)

## 二十、常見錯誤

- **p>.05 = 證明常態。** → 錯。
- **p<.05 = 所有參數統計禁止使用。** → 錯。
- **paired t 分別檢查前測和後測就好。** → 更核心的是差分。
- **迴歸要求所有 X 都常態。** → 錯。
- **大樣本只要 Shapiro 顯著就換非參數。** → 過度機械。
- **完全不畫圖。** → 會錯過 outlier、雙峰與非線性。

## 二十一、常見問題 FAQ

### Shapiro p<.05 就是不常態嗎？
在檢定語意上，表示拒絕「完全常態」H₀，但是否實務上足以影響分析要再看偏離程度、樣本數與模型。

### p>.05 就可以說資料常態嗎？
更精確是「未發現足夠證據拒絕常態假設」，不是證明常態。

### N 很大還要做 Shapiro 嗎？
可以做，但大樣本時要更重視 Q-Q Plot、偏離程度與方法穩健性，避免把很小偏離過度放大。

### SPSS 該看 Kolmogorov–Smirnov 還是 Shapiro–Wilk？
若目的是常態性檢查，Shapiro–Wilk 很常被使用；但最重要的不是選一個 p，而是完整診斷。

### 前後測 Shapiro 都顯著怎麼辦？
先檢查「差分」分布，而不是只看兩次原始分數。

### 迴歸 Y 不常態怎麼辦？
先看 residuals。依變項本身不常態不等於誤差一定不常態。

### Q-Q Plot 怎樣算不正常？
沒有單一機械界線。大幅系統性彎曲、S 型、尾端嚴重偏離或極端 outlier 都值得檢查。

## 二十二、延伸閱讀

- [統計方法怎麼選](/guides/statistical-test-selection/)
- [離群值 IQR / Z-score / Boxplot 指南](/guides/outlier-detection-iqr-z-score-boxplot/)
- [獨立樣本 vs 相依樣本 t 檢定](/guides/independent-vs-paired-t-test/)
- [p 值怎麼看](/guides/p-value-interpretation/)
- [教育與統計工具中心](/education-statistics/)

## 頁面 CTA

**你已經從 SPSS 拿到 t 檢定、ANOVA 或常態性表格？**

先用本頁確認「應該檢查哪個資料結構」，再使用 FunnyTools SPSS 結果解讀助手整理正式輸出，不要只靠 Shapiro 的一個 p 值決定所有分析。

CTA：`開啟 SPSS 結果解讀助手`

次要 CTA：`查看統計方法選擇指南`

## 圖卡與 ALT

圖卡標題：`Shapiro–Wilk 不是紅綠燈`

流程：`p 值 → Q-Q Plot → Outlier → 樣本數 → 模型真正假設`

ALT：`Shapiro Wilk 常態性檢定判讀流程圖，包含 p 值、Q-Q Plot、離群值、樣本數與模型假設`

## 參考資料

- NIST/SEMATECH e-Handbook: Anderson-Darling and Shapiro-Wilk tests。
- NIST Normal Probability Plot。
- FunnyTools SPSS 結果解讀助手與研究統計指南。

> 本頁介紹一般研究統計的常態性診斷原則，不取代對特定模型的完整假設檢查。
