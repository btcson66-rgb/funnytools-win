---
slug: /guides/r-squared-adjusted-r-squared/
seo_title: "R² 與 Adjusted R² 怎麼看？迴歸解釋力、公式與常見誤解完整指南｜FunnyTools"
meta_description: "R平方怎麼看？完整說明 R²、Adjusted R²、R²=.60 的意思、加入變項為何 R² 不降、調整後 R²、預測力與模型準確率差異，以及 SPSS 迴歸結果寫法。"
og_title: "R² vs Adjusted R²：迴歸解釋力到底怎麼看？"
og_description: "R² 不是模型正確率；Adjusted R² 也不是越高就一定最好。用迴歸例子一次理解。"
canonical: "https://funnytools.win/guides/r-squared-adjusted-r-squared/"
primary_keyword: "R平方 怎麼看"
secondary_keywords: ["R squared", "Adjusted R squared", "調整後R平方", "迴歸 R2", "R² 解釋力", "SPSS R平方"]
search_intent: "資訊型／迴歸結果解讀"
card_title: "R² 與 Adjusted R² 怎麼看？"
card_description: "R² 描述模型解釋的樣本變異比例；Adjusted R² 對加入更多預測變項做調整。"
hero_eyebrow: "迴歸分析"
hero_title: "R² 與 Adjusted R² 怎麼看？迴歸解釋力、公式與常見誤解完整指南"
hero_subtitle: "R²=.60 不代表模型有 60% 準確率；加入變項後 R² 幾乎只升不降，因此多元迴歸還要看 Adjusted R²、殘差與外部驗證。"
date_published: "2026-08-27"
date_modified: "2026-08-27"
---

# R² 與 Adjusted R² 怎麼看？迴歸解釋力、公式與常見誤解完整指南

SPSS Model Summary 常看到：

| R | R Square | Adjusted R Square |
|---|---|---|
| .721 | .520 | .503 |

很多人會寫：「模型準確率 52%。」這是錯的。

> **速答：R² 怎麼看？**  
> R²（coefficient of determination）表示在目前樣本與迴歸模型中，依變項相對於其平均值的變異有多少比例被模型所解釋。例如 R²=.52，可說模型解釋約 52% 的樣本變異，但 **不能說模型有 52% 的預測準確率**。加入更多預測變項時，普通 R² 幾乎只會上升或不變；Adjusted R² 會對模型變項數與樣本量做調整，因此常用來輔助比較相同 outcome 的候選模型。

## 一、R² 的核心公式

線性迴歸中：

`R² = SSR / SST`

也可寫成：

`R² = 1 − SSE / SST`

概念上：

- **SST：**如果完全不使用 X，只用 Y 平均數預測，總共有多少變異？
- **SSE：**用了迴歸模型之後，還剩多少誤差？
- **R²：**模型相對於「只猜平均值」減少了多少平方誤差比例。

## 二、R²=.60 是什麼意思？

可以說：

> 模型解釋了依變項約 60% 的樣本變異。

不能說：

- 60% 的人被預測正確；
- 模型正確率 60%；
- X 有 60% 機率造成 Y；
- Y 有 60% 是由 X 導致。

R² 是 variance-explained measure，不是分類 accuracy，也不是 causal proportion。

## 三、R² 介於 0 和 1 嗎？

在含截距的普通 least squares regression 中，R² 通常在 0～1。

但在某些特殊模型或不含截距情況，R² 定義與範圍可能出現例外。FunnyTools 面向一般教育研究時，可優先使用標準含截距 OLS 的常見解讀。

## 四、簡單迴歸中 r² 和 R² 有什麼關係？

只有一個 predictor 的普通簡單線性迴歸：

`R² = r²`

例如：

`r=.50`

則：

`R²=.25`

表示約 25% 的 Y 變異由這個線性模型相對於平均值基準所解釋。

但相關仍不等於因果。

延伸：[Pearson vs Spearman](/guides/pearson-vs-spearman-correlation/)

## 五、為什麼加入變項 R² 不會下降？

假設 Model 1：

`Y ~ X1`

R²=.40。

Model 2：

`Y ~ X1 + X2`

即使 X2 幾乎沒用，OLS 至少可以讓 X2 係數接近 0，保留原本模型表現。所以 SSE 不會增加，R² 不會下降。

這就是普通 R² 的問題：

> **它會「獎勵」加入更多 predictor，即使新變項貢獻很小。**

Penn State Regression Methods 也明確說明：加入更多 predictor 時 R² 會增加或不變，因此不能只靠 R² 決定變項是否應留下。

## 六、Adjusted R² 在調整什麼？

常見公式：

`Adjusted R² = 1 − [(1−R²)(n−1)/(n−p−1)]`

不同教材對 p 的符號定義可能不同，但核心相同：

> 對 predictor 數量增加施加懲罰。

如果新變項沒有帶來足夠的誤差降低，Adjusted R² 可能下降。

## 七、例子：加入一個沒什麼用的 X

Model A：

- predictors=2
- R²=.50
- Adjusted R²=.48

Model B：

- predictors=8
- R²=.54
- Adjusted R²=.43

如果只看 R²，Model B 比較高；但 adjusted R² 告訴你額外 6 個變項可能沒有帶來值得的改善。

## 八、Adjusted R² 可以是負的嗎？

可以。

若模型表現很差，相對於只有截距／平均值的基準，Adjusted R² 可能小於 0。這不是軟體壞掉，而是警訊：

> 模型的 predictor 並沒有提供足夠有價值的解釋。

## 九、Adjusted R² 越高一定越好嗎？

也不能單獨這樣說。

比較模型時還要看：

- 是否預測同一個 outcome；
- 是否使用同一樣本；
- 模型理論合理性；
- residual diagnostics；
- multicollinearity；
- overfitting；
- validation / test set；
- prediction error；
- AIC/BIC（若適用）；
- 交叉驗證。

Adjusted R² 只是其中一個 model-building criterion。

## 十、R² 很低就是研究失敗嗎？

完全不是。

R² 大小高度依領域而定。人類行為、教育、心理變項通常有較高測量誤差、更多影響因素和個體差異，因此 R²=.20 可能很有價值。

工程或物理精密模型中，R²=.20 可能完全不夠。

Penn State 的 regression 教材也提醒「什麼算高 R²」依研究領域而異。

## 十一、R² 很高就一定好嗎？

也不是。

異常高 R² 值得檢查：

- data leakage；
- outcome 的衍生變項被當 predictor；
- 重複資料；
- 過度擬合；
- 時間序列趨勢造成 spurious regression；
- 訓練資料上評估；
- 不合理變項。

R²=.99 不應讓你停止診斷。

## 十二、R² 和預測能力不是同一件事

模型在 training sample：

`R²=.80`

不代表新資料也有同樣效果。

真正的 predictive performance 要看：

- test set；
- cross-validation；
- RMSE；
- MAE；
- predictive R²；
- calibration 等。

一個 overfit model 可以有很高 training R²，卻在新資料表現差。

## 十三、Adjusted R² 和 Predicted R² 不一樣

部分軟體還會提供 Predicted R²。

概念上：

- **Adjusted R²：**修正樣本內 R² 對 predictor 數的偏好。
- **Predicted R²：**更關注對新觀察值的預測能力。

兩者不是同一個東西。

## 十四、R² 和 p 值有什麼關係？

整體迴歸 F test 常檢驗：

> H₀：所有 slope coefficients 都為 0。

模型可以：

- R² 很小但 N 很大 → p 很小；
- R² 看似不低但 N 很小 → p 不一定顯著。

所以：

> **統計顯著 ≠ 解釋力大。**

延伸：[統計顯著 vs 實務顯著](/guides/statistical-vs-practical-significance/)

## 十五、R² 和效果量的關係

R² 本身就是一種模型效果／解釋程度指標。

在階層迴歸還常看：

`ΔR²`

表示加入一組 predictors 後多解釋多少變異。

例如：

- Model 1 R²=.30
- Model 2 R²=.42

`ΔR²=.12`

可以說新 block 額外解釋約 12% 樣本變異。但還要搭配 change F test、理論與其他診斷。

## 十六、階層迴歸怎麼解讀 R² Change？

例如：

### Block 1
控制年齡與前測，R²=.35。

### Block 2
加入學習動機，R²=.43。

`ΔR²=.08`

如果 change test 顯著，可以寫：

> 學習動機在控制年齡與前測後，為模型增加約 8% 的樣本變異解釋。

但仍不能直接說「動機造成 8% 成績」。

## 十七、SPSS Model Summary 怎麼看？

常見欄位：

- R
- R Square
- Adjusted R Square
- Std. Error of the Estimate
- R Square Change

基本流程：

1. 看 R²；
2. 看 Adjusted R²；
3. 看 ANOVA table 的 overall F；
4. 看 Coefficients；
5. 看 residual diagnostics；
6. 若階層迴歸，看 ΔR²。

## 十八、R 是什麼？

在多元迴歸 SPSS Model Summary 中，`R` 是 observed Y 與 predicted Y 的 multiple correlation。

不要把這個 R 當成某一個 predictor 的 Pearson r。

## 十九、Std. Error of the Estimate 是什麼？

它與 residual variation 有關，表示預測值和實際值在 outcome 原始單位上的典型誤差尺度。

如果成績單位是「分」，`SEE=5.2` 比 R² 更容易讓讀者理解：「預測誤差大概幾分。」所以最好不要只報 R²。

## 二十、完整教育研究例子

Y：後測成績。

Predictors：

- 前測；
- 出席率；
- 動機。

結果：

- R²=.48
- Adjusted R²=.46
- F(3,116)=35.7, p<.001

可以寫：

> 三個預測變項共同解釋後測成績約 48% 的樣本變異，*R*²=.48, adjusted *R*²=.46；整體模型達統計顯著，*F*(3,116)=35.70, *p*<.001。

接著才看每個 predictor 的 B、β、CI 與 p。

## 二十一、常見錯誤

- **R²=.70 = 模型準確率 70%。** → 錯。
- **加入更多 X，R² 變高，所以模型一定更好。** → 錯。
- **R² 低就沒有研究價值。** → 錯。
- **R² 高就有因果關係。** → 錯。
- **只看 Model Summary，不看 residual。** → 錯。
- **拿不同 outcome 的 R² 直接比較誰模型比較好。** → 通常沒有直接可比性。

## 二十二、常見問題 FAQ

### R² 多少算高？
沒有通用門檻。依研究領域和目的判斷。

### R² 可以 100% 嗎？
可以在資料上完美擬合，但真實研究要高度警覺 overfitting、data leakage 或特殊結構。

### Adjusted R² 為什麼比 R² 小？
因為它對 predictor 數量做調整。

### Adjusted R² 可以比 R² 大嗎？
在標準 OLS 含截距的常見公式下，Adjusted R² 通常不高於 R²。

### Adjusted R² 為負正常嗎？
可以發生，代表模型相對基準表現很差。

### R² 高但 predictor p 不顯著怎麼辦？
可能有 multicollinearity、樣本小或 predictors 共享變異，需要進一步檢查。

### R² 和 r² 一樣嗎？
簡單線性迴歸中相等；多元迴歸則是 multiple R²。

## 二十三、延伸閱讀

- [Pearson vs Spearman](/guides/pearson-vs-spearman-correlation/)
- [效果量完整指南](/guides/effect-size-guide/)
- [p 值怎麼看](/guides/p-value-interpretation/)
- [統計顯著 vs 實務顯著](/guides/statistical-vs-practical-significance/)
- [95% 信賴區間](/guides/confidence-interval-95-guide/)

## 頁面 CTA

**已經有 SPSS Regression 的 Model Summary、ANOVA 與 Coefficients？**

先把 R²、Adjusted R²、整體 F 與各 predictor 係數分開解讀，再用 APA 7 統計工具整理報告句。

CTA：`開啟 APA 7 統計報告產生器`

次要 CTA：`前往 SPSS 結果解讀助手`

## 圖卡與 ALT

圖卡標題：`R² ≠ Accuracy`

三點：

- `R²：樣本變異解釋比例`
- `Adjusted R²：對變項數做調整`
- `Prediction：還要看新資料驗證`

ALT：`R平方與調整後R平方比較圖，提醒 R squared 不是模型準確率`

## 參考資料

- Penn State STAT 501: Multiple Linear Regression。
- Penn State STAT 501: Simple Linear Regression 與 R²。
- Penn State Model Building: Adjusted R²。

> 本頁聚焦一般 OLS regression。Logistic、mixed、survival 等模型的 pseudo-R² 不可直接用相同方式解讀。
