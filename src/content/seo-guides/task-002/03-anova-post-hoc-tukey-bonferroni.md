---
slug: /guides/anova-post-hoc-tukey-bonferroni/
seo_title: "ANOVA 顯著後怎麼辦？Tukey、Bonferroni、事後比較完整指南｜FunnyTools"
meta_description: "ANOVA p<.05 後怎麼知道哪組不同？完整解釋 post hoc、Tukey HSD、Bonferroni、多重比較、planned contrast、Games-Howell，以及 SPSS 事後檢定結果怎麼寫。"
og_title: "ANOVA 顯著後怎麼辦？Tukey、Bonferroni 一次搞懂"
og_description: "F 顯著只表示至少有部分平均數不同；要知道哪組不同，需要適當的事後比較或預先規劃比較。"
canonical: "https://funnytools.win/guides/anova-post-hoc-tukey-bonferroni/"
primary_keyword: "ANOVA 事後比較"
secondary_keywords: ["Tukey HSD", "Bonferroni", "post hoc", "ANOVA 顯著後", "Games Howell", "SPSS 事後檢定"]
search_intent: "資訊型／ANOVA 結果解讀"
card_title: "ANOVA 顯著後怎麼辦？"
card_description: "用 Tukey、Bonferroni、Games–Howell 和 planned contrasts 找出到底哪幾組不同。"
hero_eyebrow: "ANOVA 與多重比較"
hero_title: "ANOVA 顯著後怎麼辦？Tukey、Bonferroni、事後比較完整指南"
hero_subtitle: "整體 F 檢定只告訴你『至少有差』，不會自動告訴你 A、B、C 哪兩組不同。接下來要處理的是多重比較。"
date_published: "2026-08-27"
date_modified: "2026-08-27"
---

# ANOVA 顯著後怎麼辦？Tukey、Bonferroni、事後比較完整指南

假設三組教學法：

- A：一般教學
- B：閱讀策略
- C：視覺提示

One-way ANOVA 得到：

`F(2, 87) = 8.42, p < .001`

你可以說：三組平均數並非全部相同。

但你還不能直接說：B>A、C>A、B=C。因為整體 ANOVA 沒有告訴你到底哪兩組不同。

> **速答：ANOVA 顯著後怎麼辦？**  
> 當整體 ANOVA 達顯著時，通常需要依研究設計進一步進行 pairwise comparisons、post hoc tests 或事先規劃的 contrasts，才能判斷哪些組別不同。若要做所有組間兩兩比較，Tukey HSD 是常見方法；Bonferroni 可以對較少、特定的多重檢定調整 α 或 p；若變異數不齊且樣本數不等，可考慮 Games–Howell。選方法不能只看哪個比較容易顯著。

## 一、為什麼不能三組直接做三次 t test？

三組有：

- A vs B
- A vs C
- B vs C

如果每次都用 α=.05，而完全不校正，多重檢定會提高 family-wise Type I error。

組數更多時更嚴重。5 組共有：

`5 × 4 / 2 = 10`

個 pairwise comparisons。

如果每一個都當獨立 .05 檢定，整體至少出現一次偽陽性的機率會上升。

ANOVA 的整體 F 檢定先回答：「有沒有證據認為所有平均數都相等？」後續比較再回答：「哪些平均數不同？」

## 二、ANOVA 顯著到底代表什麼？

One-way ANOVA 的 H₀：

`μ1 = μ2 = μ3 = ... = μk`

如果 p<.05，代表拒絕所有母體平均數完全相同的假設。

只需要有一部分組別不同，就可能讓 F 顯著。

> **F 顯著 ≠ 每一組彼此都不同。**

## 三、Tukey HSD 是什麼？

Tukey’s Honestly Significant Difference 常用於「所有組別之間的兩兩比較」。

例如 4 組：

- A vs B
- A vs C
- A vs D
- B vs C
- B vs D
- C vs D

Tukey 方法會控制多重比較造成的 family-wise error。Penn State 的 ANOVA 教學也將 Tukey HSD 作為常見 post hoc，重點就在於同時做多個 pairwise comparisons 時調整 Type I error。

## 四、什麼時候適合 Tukey？

典型情境：

- one-way ANOVA；
- 你真的想比較所有組別彼此；
- 組別為獨立樣本；
- 常態／殘差條件大致合理；
- 變異數同質性可接受。

若樣本數不相等，軟體通常會使用適合不等樣本的 Tukey-Kramer 類處理。

## 五、Bonferroni 是什麼？

Bonferroni 的核心非常直白。

如果你有 `m` 個檢定，想讓整體 α=.05：

`α_each = .05 / m`

例如 5 個比較：

`.05 / 5 = .01`

每個比較要 p<.01 才達 Bonferroni 校正後標準。很多軟體也會直接輸出 adjusted p-values。

## 六、Bonferroni 的優點與缺點

### 優點
- 簡單；
- 適用範圍廣；
- 不限於所有 pairwise；
- 可用於少數事先關心的比較。

### 缺點
- 比較數很多時可能非常保守；
- Type II error 增加；
- 真實差異可能變得難以檢出。

所以「比較越多」並不代表越應該一律 Bonferroni。

## 七、Tukey vs Bonferroni 怎麼選？

| 情境 | 常見選擇 |
|---|---|
| 所有組別都要兩兩比較 | Tukey 常很適合 |
| 只有少數特定比較 | Bonferroni / Holm / planned contrasts |
| 變異數不齊 | Games–Howell 常被考慮 |
| 預先有明確理論比較 | planned contrasts |
| 很多探索性比較 | 需明確控制 multiplicity |

不要問：「哪一個比較容易顯著？」

應問：「哪一個符合我事先的研究問題與錯誤率控制？」

## 八、Games–Howell 是什麼？

當變異數不相等、樣本數也不相等時，傳統 Tukey 的假設可能不理想。

Games–Howell 是常見的 pairwise 方法之一，設計上較適合 heteroscedastic groups。若整體分析使用 Welch ANOVA，後續常搭配 Games–Howell 進行比較。

## 九、Levene 顯著就一定 Games–Howell 嗎？

也不能完全機械化。

Levene p<.05 表示變異數同質性有證據被違反，但還要看：

- 樣本數是否平衡；
- 變異數差距程度；
- 是否有 outlier；
- 整體分析是否用 Welch ANOVA；
- 研究軟體與課程要求。

FunnyTools 既有 SPSS 解讀內容已包含 Levene 的角色；本頁則聚焦後續 pairwise strategy。

## 十、Planned Contrast 和 Post Hoc 差在哪？

### Planned contrast
在看資料結果以前，就由理論或研究問題指定比較。

例如：「新教學 B+C 平均是否優於傳統 A？」你並不是真的想比較所有 pair。

### Post hoc
看到整體 ANOVA 後，再探索到底哪些組不同。

事先規劃通常具有更明確的研究假設，也可以避免做大量不必要比較。

## 十一、可以 ANOVA 不顯著卻做 post hoc 嗎？

傳統教學常說：「先 omnibus ANOVA 顯著，才做 post hoc。」這是安全且常見的流程。

但更精細的設計中，若有事先 planned comparisons，並不一定必須以 omnibus F 顯著作為所有比較的門票。

重點是：

> **比較應由研究假設事先定義，並合理控制錯誤率。**

不要在看到資料後到處試方法找顯著。

## 十二、SPSS Tukey 表格怎麼看？

Multiple Comparisons 常包含：

- (I) Group
- (J) Group
- Mean Difference (I−J)
- Std. Error
- Sig.
- 95% CI

假設 A vs B：

- Mean Difference = -6.2
- p=.011
- 95% CI [-11.1, -1.3]

因為 A−B 為負，所以 A 平均低於 B 6.2 分。CI 未跨 0，adjusted p=.011。

## 十三、Mean Difference 正負號常看反

如果 `(I) A - (J) B = -6.20`，表示 A 比 B 低 6.2，不是 B 比 A 低。

最保險方式：

1. 先看 I 和 J；
2. 寫成 `I−J`；
3. 再看正負。

## 十四、同一對比較為什麼會出現兩次？

SPSS 可能列：

- A vs B = -6.2
- B vs A = +6.2

它們是同一個比較，方向相反。論文不需要把兩列都報一次。

## 十五、Grouping Letters 怎麼看？

某些軟體會產生：

| Group | Mean | Letter |
|---|---:|---|
| C | 88 | A |
| B | 83 | A |
| A | 74 | B |

常見讀法：共享相同字母的組別，未被判定有顯著差異。

所以 B 和 C 都是 A → 沒有顯著差異；A 組是 B → 與它們存在顯著差異。

但 letter display 只是 pairwise 結果的摘要，不是效果量。

## 十六、顯著 pairwise 還是要看效果量

假設 A vs B adjusted p=.001。如果平均差只有 0.4 分，但 N=5000，仍可能顯著。

所以 pairwise 結果至少一起看：

- mean difference；
- 95% CI；
- adjusted p；
- effect size。

延伸：[效果量完整指南](/guides/effect-size-guide/)

## 十七、95% CI 在 post hoc 有什麼用？

例如 Tukey adjusted CI：

`Difference = 7.1`

`95% CI [2.3, 11.9]`

你不只知道「顯著」，還知道合理差異範圍。

如果 `95% CI [-0.4, 14.6]`，則 adjusted comparison 未能排除 0。

延伸：[95% 信賴區間](/guides/confidence-interval-95-guide/)

## 十八、Bonferroni 例子

研究者只關心：

1. A vs B
2. A vs C

一共 2 個比較，Family α=.05。

Bonferroni：`.05 / 2 = .025`

結果：

- A vs B p=.018 → 顯著
- A vs C p=.031 → 不顯著

若沒校正，第二個會被 .05 判顯著。這就是 multiplicity adjustment 改變推論的地方。

## 十九、Tukey 例子

四組平均：

- A=70
- B=72
- C=81
- D=83

ANOVA p<.001。

Tukey 可能顯示：

- A vs B：ns
- A vs C：sig
- A vs D：sig
- B vs C：sig
- B vs D：sig
- C vs D：ns

真正結論不是「四組都有差」，而是 A/B 形成較低群，C/D 形成較高群。

## 二十、Repeated-measures ANOVA 的 post hoc 一樣嗎？

不完全一樣。

同一批受試者重複測量，pairwise comparisons 具有相依性。例如前測、中測、後測，可以進行 repeated-measures pairwise comparisons，並使用 Bonferroni/Holm 等校正。

不能把三時間點當獨立群體套 ordinary Tukey。

## 二十一、Two-way ANOVA 更不能只做主效果 post hoc

如果有顯著 interaction，代表 A 因素的效果會依 B 因素水準改變。

這時需要考慮：

- simple main effects；
- simple comparisons；
- estimated marginal means；
- multiplicity adjustment。

若 interaction 明顯，直接只報 overall main effect 可能誤導。

## 二十二、常見錯誤

- **ANOVA 顯著 = 每組都彼此不同。** → 錯。
- **三組一直做未校正 t tests。** → 增加 Type I error。
- **只因 Tukey 不顯著就換方法直到顯著。** → 結果導向分析。
- **Mean Difference 方向看反。** → 常見 SPSS 錯誤。
- **只報 adjusted p，不報差異大小。** → 資訊不足。
- **有 interaction 卻忽略 simple effects。** → 可能誤解模型。

## 二十三、論文寫法範例

### Omnibus
> 三組後測平均數存在差異，*F*(2,87)=8.42, *p*<.001, η²=.16。

### Tukey
> Tukey HSD 事後比較顯示，策略教學組高於一般教學組（MD=6.20, 95% CI [1.30,11.10], adjusted *p*=.011），視覺提示組亦高於一般教學組（MD=8.40, 95% CI [3.50,13.30], adjusted *p*<.001），而兩種介入組之間未達顯著差異（adjusted *p*=.47）。

## 二十四、常見問題 FAQ

### ANOVA 顯著後一定要 Tukey 嗎？
不一定。要依比較目的、變異數假設與研究設計選擇。

### Bonferroni 比 Tukey 好嗎？
沒有絕對好壞。Tukey 很適合所有 pairwise；Bonferroni 適合少數或更一般的多重檢定，但可能較保守。

### Levene 顯著可以用 Tukey 嗎？
變異數不齊時可考慮更適合 heteroscedasticity 的方法，例如 Games–Howell，並搭配整體分析策略。

### ANOVA 不顯著可以做事後比較嗎？
探索性 post hoc 通常不建議隨意做；若是事先 planned contrasts，則屬不同設計邏輯。

### Tukey p 值是原始 p 嗎？
通常是經過方法調整後的 pairwise inference，應按軟體輸出標示 adjusted p。

### 為什麼 SPSS 同一組比較出現兩次？
I−J 與 J−I 是同一對的相反方向。

### 哪個 post hoc 最容易顯著？
這不應是選擇標準。分析方法應依研究問題和錯誤率控制決定。

## 二十五、延伸閱讀

- [統計方法怎麼選](/guides/statistical-test-selection/)
- [p 值怎麼看](/guides/p-value-interpretation/)
- [效果量完整指南](/guides/effect-size-guide/)
- [95% 信賴區間](/guides/confidence-interval-95-guide/)
- [教育與統計工具中心](/education-statistics/)

## 頁面 CTA

**已經有 SPSS ANOVA 表格和 Multiple Comparisons？**

先確認整體 F、Levene、研究設計，再把 post hoc 的 Mean Difference、adjusted p 和 CI 一起解讀。

CTA：`開啟 SPSS 結果解讀助手`

次要 CTA：`查看 APA 7 統計報告工具`

## 圖卡與 ALT

圖卡標題：`ANOVA p<.05 → 只知道至少有差`

分岔：

- `所有 pairwise → Tukey`
- `少數特定比較 → Bonferroni / planned`
- `變異數不齊 → Games–Howell`

ALT：`ANOVA 顯著後事後比較選擇圖，包含 Tukey HSD、Bonferroni、planned contrasts 與 Games Howell`

## 參考資料

- Penn State STAT 200: Pairwise Comparisons。
- Penn State hypothesis testing 教材中 Bonferroni 與 practical significance 說明。
- FunnyTools 既有 ANOVA、Levene、SPSS 與 APA 7 統計內容。

> 正式 post hoc 選擇應依研究設計、變異數條件、比較數量與事前研究假設決定。
