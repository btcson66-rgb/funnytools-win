---
slug: /guides/statistical-test-selection/
seo_title: "統計方法怎麼選？t 檢定、ANOVA、卡方、相關、迴歸選擇指南｜FunnyTools"
meta_description: "不知道該用哪個統計方法？從依變項尺度、組數、獨立或相依樣本開始，快速判斷 t 檢定、ANOVA、卡方、Pearson/Spearman 相關與迴歸分析。"
og_title: "統計方法怎麼選？一張流程表從研究問題找到分析方法"
og_description: "先看研究問題、變項尺度、組數與樣本關係，再選 t 檢定、ANOVA、卡方、相關或迴歸。"
canonical: "https://funnytools.win/guides/statistical-test-selection/"
primary_keyword: "統計方法怎麼選"
search_intent: "資訊型／研究方法選擇"
card_title: "統計方法怎麼選？完整選擇指南"
card_description: "從研究問題、資料尺度、組數和樣本關係找到合適的統計方法。"
hero_eyebrow: "研究方法指南"
hero_title: "統計方法怎麼選？t 檢定、ANOVA、卡方、相關與迴歸完整選擇指南"
hero_subtitle: "不要先打開 SPSS 才決定分析。先回答四個問題：你要比較還是看關係？依變項是什麼尺度？有幾組？資料彼此獨立還是重複測量？"
date_published: "2026-08-27"
date_modified: "2026-08-27"
---

# 統計方法怎麼選？t 檢定、ANOVA、卡方、相關與迴歸完整選擇指南

很多研究生最常問的不是公式，而是：「我這個題目到底要用哪個統計？」

答案通常不是從「哪個分析比較厲害」開始，而是從研究問題和資料結構開始。

> **速答：統計方法怎麼選？**  
> 先判斷你是要比較差異、檢查關聯，還是建立預測模型；再看依變項是連續、類別還是次序資料；接著確認有幾組／幾個時間點，以及觀察值彼此獨立還是同一批人重複測量。兩個獨立群體的連續結果常用獨立樣本 t 檢定；同一批前後測常用 paired t test；三組以上常考慮 ANOVA；兩個類別變項關聯常用卡方；兩個連續變項關係可用 Pearson 或 Spearman；需要同時預測或控制其他變項時常使用迴歸。

## 一、第一步不要看軟體：先問你的研究問題

大多數基礎量化問題可先分成三類。

### A. 比較差異
例如：
- 男生和女生平均成績是否不同？
- 三種教學法的後測成績是否不同？
- 同一群學生前後測是否改變？

### B. 檢查關係
例如：
- 學習動機和成績是否相關？
- 性別和是否通過考試是否有關？

### C. 建立預測或解釋模型
例如：
- 前測、出席率、動機能否一起預測後測？
- 控制年齡後，教學方式還能否預測成績？

不同問題會走到完全不同的分析。

## 二、第二步：看依變項是什麼資料

### 連續資料
例如成績、反應時間、身高、量表總分。

常見方法：
- t 檢定
- ANOVA
- correlation
- linear regression

### 類別資料
例如通過／未通過、有／沒有、A/B/C 類型。

常見方法：
- chi-square
- logistic regression

### 次序資料
例如等級 1～5、名次、嚴重度分級。

視研究目的可能考慮：
- Spearman correlation
- Mann–Whitney U
- Wilcoxon signed-rank
- Kruskal–Wallis
- ordinal regression

## 三、第三步：如果要比較平均數，先看有幾組

### 只有兩組
可能考慮 t 檢定，但還要問：這兩組是不同的人，還是同一批人？

### 三組以上
通常不要一直做多個 t 檢定。可先考慮 one-way ANOVA、repeated-measures ANOVA、mixed ANOVA 或 factorial ANOVA。

## 四、第四步：樣本是獨立還是相依？

這一步是 t 檢定最常選錯的地方。

### 獨立樣本
A 組和 B 組是不同的人，例如 A 班 vs B 班、實驗組 vs 控制組。

常用：**independent-samples t test**

FunnyTools 現有[獨立樣本 t 檢定簡易計算器](/tools/independent-samples-t-test-calculator/)使用 Welch 方法，可由兩組 N、M、SD 進行核對。

### 相依樣本
同一人被測量兩次，或資料具有一對一配對，例如前測 vs 後測。

常用：**paired-samples t test**

延伸閱讀：[獨立樣本 vs 相依樣本 t 檢定](/guides/independent-vs-paired-t-test/)

## 五、一張表快速找到常見分析

| 研究問題 | 資料型態 | 設計 | 常見方法 |
|---|---|---|---|
| 一組平均數 vs 已知標準 | 連續 | 一組 | one-sample t |
| 兩個不同群體平均數 | 連續 | 獨立 | independent / Welch t |
| 同一群前後測 | 連續 | 相依 | paired t |
| 三組以上平均數 | 連續 | 獨立 | one-way ANOVA |
| 同一群三時間點 | 連續 | 重複測量 | repeated-measures ANOVA |
| 組別 × 時間 | 連續 | 混合 | mixed ANOVA |
| 兩個類別變項是否相關 | 類別 | 計數 | chi-square |
| 兩連續變項線性關係 | 連續 | 關聯 | Pearson r |
| 次序／單調關係 | 次序或不符合 Pearson 條件 | 關聯 | Spearman ρ |
| 一個連續結果，多個預測變項 | 連續 | 預測 | multiple linear regression |
| 二元結果 | 0/1 | 預測 | logistic regression |

這只是起點，不代表看到資料型態就可以忽略分析假設。

## 六、什麼時候用獨立樣本 t 檢定？

問題：兩個互相獨立群體的平均數是否不同？

例如比較：
- 30 名策略教學學生；
- 32 名一般教學學生。

依變項是閱讀後測分數。

這是典型獨立樣本比較。

實務上 Welch t test 不要求兩組變異數完全相等，是常見而穩健的選擇之一。

## 七、什麼時候用 paired t test？

問題：同一批人的兩次測量平均是否改變？

例如 20 名學生接受前測、8 週教學、後測。

每一位學生的後測都要和自己的前測配對，不能把前測 20 筆和後測 20 筆當成 40 位獨立學生。

## 八、什麼時候用 one-way ANOVA？

問題：一個分類自變項有 3 組以上，想比較一個連續依變項。

例如三種教學：
- 一般教學；
- 閱讀策略；
- 視覺提示。

比較後測平均數。

ANOVA 的整體 F 顯著只代表至少有部分組別平均數存在差異，它不直接告訴你哪兩組不同，所以必要時要做 post hoc comparisons 或 planned contrasts。

## 九、什麼時候用 two-way ANOVA？

有兩個分類因子，例如：
- 教學法：A / B / C
- 性別：男 / 女

你可能同時想看：
1. 教學法主效果；
2. 性別主效果；
3. 教學法 × 性別交互作用。

如果交互作用顯著，通常不能只看兩個主效果就結束，因為一個因素的效果可能依另一因素而改變。

## 十、什麼時候用 repeated-measures ANOVA？

同一批人測量三次以上，例如前測、中測、後測。

若只有兩次，paired t test 常能回答問題；三個以上重複時間點，常使用 repeated-measures ANOVA 或更彈性的 mixed models。

## 十一、什麼時候用 mixed ANOVA？

有一個 between-subjects factor，再加一個 within-subjects factor。

例如：
- 組別：實驗組 / 對照組
- 時間：前測 / 後測 / 追蹤測

最常關心的問題往往是：**兩組隨時間的變化是否不同？**

也就是組別 × 時間交互作用。

## 十二、什麼時候用卡方檢定？

兩個變項都是類別，而且你想知道分類分布是否有關聯。

例如：

| | 通過 | 未通過 |
|---|---:|---:|
| 接受輔導 | 45 | 15 |
| 未接受輔導 | 30 | 30 |

可以用 chi-square test of independence。

但要注意期望次數過小等條件；小樣本 2×2 表中可能要考慮 Fisher’s exact test。

## 十三、Pearson 和 Spearman 怎麼選？

### Pearson correlation
適合關注兩個連續變項的線性關係，並需檢查離群值與關係形態。

### Spearman correlation
根據排名，適合次序資料、單調但不一定線性的關係，以及部分不符合 Pearson 條件的情境。

不要只用「有沒有常態」一個條件機械決定 Pearson 或 Spearman。先看散佈圖非常重要。

## 十四、什麼時候從相關改用迴歸？

相關通常回答：X 和 Y 關係有多強？

迴歸可以進一步回答：X 改變時 Y 的預期值如何改變？在控制其他變項後，X 是否仍和 Y 有關？

例如前測、動機、出席率一起預測後測成績，multiple regression 比單純做三次相關更接近研究問題。

## 十五、什麼是 ANCOVA？

ANCOVA 常用在比較不同組後測，同時控制一個連續共變數。

例如比較三種教學的後測，但三組前測程度不同，模型可把前測放入共變數。

但 ANCOVA 不是把前測不公平全部消除的魔法；需要合理研究設計、量測品質，以及像 regression slope homogeneity 等相關假設。

## 十六、什麼時候不該硬用參數統計？

不要只因為「老師教過 t test」就硬套。

值得特別檢查：
- 極端小樣本；
- 嚴重離群；
- 明顯偏態；
- 次序資料；
- 計數資料；
- 天花板／地板效果；
- 非獨立觀察；
- 群聚資料；
- 大量缺失值。

可能需要 Mann–Whitney U、Wilcoxon signed-rank、Kruskal–Wallis、generalized linear models、mixed-effects models、robust methods、permutation 或 bootstrap。

## 十七、不要只做「常態性檢定 → p < .05 就不能用 t」

這是另一個常見簡化。

常態性判斷不應只依 Shapiro–Wilk 的 p 值，還要一起考慮樣本數、Q-Q plot、histogram、離群值、方法穩健性與研究設計。

大樣本時，極小偏離也可能讓 normality test 顯著；小樣本時，檢定又可能沒有足夠能力抓出問題。

## 十八、研究問題到分析方法：5 步決策流程

### Step 1：我要比較、關聯還是預測？
先確定問題類型。

### Step 2：依變項是連續、類別還是次序？
這會排除大量不適合的方法。

### Step 3：有幾組／幾個測量時間？
兩組和三組以上通常走不同方法。

### Step 4：觀察值獨立還是重複？
決定 independent vs paired / repeated。

### Step 5：檢查方法假設
包含獨立性、資料分布、離群值、變異數、線性、殘差與樣本量。

## 十九、六個研究案例快速判斷

### 案例 1：兩班教學成績
兩組不同學生、連續後測、只有兩組。  
優先考慮：**independent-samples t / Welch t**

### 案例 2：同一群學生前後測
同一批人、兩時間點、連續分數。  
考慮：**paired-samples t**

### 案例 3：三種教學法
A、B、C 三組不同學生，比較連續後測。  
考慮：**one-way ANOVA**

### 案例 4：性別與是否通過
兩變項都是類別。  
考慮：**chi-square test of independence**

### 案例 5：動機和成績
兩者皆連續，先畫散佈圖。  
線性關係考慮 **Pearson r**；次序或單調非線性等適合情境可考慮 **Spearman ρ**。

### 案例 6：多個因素預測後測
依變項是後測成績；預測變項包含前測、動機、出席率。  
考慮：**multiple linear regression**

## 二十、常見錯誤

### 錯誤 1
三組資料做三次 t test，增加多重比較問題。

### 錯誤 2
前後測用獨立樣本 t test，忽略同一人資料的配對關係。

### 錯誤 3
類別結果硬做 t test，依變項尺度不對。

### 錯誤 4
相關顯著就說因果。Correlation ≠ causation。

### 錯誤 5
只因常態性檢定顯著就全面改非參數，判斷過度機械。

### 錯誤 6
分析完才決定研究假設，容易產生選擇性報告問題。

## 二十一、分析後還要看什麼？

選對方法只是第一步。完成分析後至少看：
- 描述統計；
- 效果方向；
- p 值；
- 效果量；
- 95% CI；
- 模型假設；
- 圖形；
- 研究限制。

延伸：
- [p 值怎麼看](/guides/p-value-interpretation/)
- [效果量完整指南](/guides/effect-size-guide/)
- [95% 信賴區間](/guides/confidence-interval-95-guide/)

## 二十二、常見問題 FAQ

### 兩組就一定用 t 檢定嗎？
不一定。要看依變項尺度、獨立性、資料分布與研究設計。

### 三組以上一定用 ANOVA 嗎？
如果是連續結果與平均數比較，ANOVA 常見；但重複測量、群聚、共變數或非正態資料可能需要其他模型。

### 前測後測可以直接比較進步分數嗎？
可以是某些研究的分析方式，但不一定是最佳選擇。需看隨機分派、基線差異、測量可靠度與研究問題。

### 卡方可以用平均數嗎？
卡方通常處理類別資料的頻數，不是比較連續平均數。

### Pearson 顯著可以說 X 造成 Y 嗎？
不能。因果推論需要研究設計和額外條件。

### SPSS 幫我跑出來就代表方法選對嗎？
不代表。軟體只會依你的設定計算，不知道你的研究設計是否合理。

## 二十三、下一步

如果最常卡在「兩組到底是不是獨立」：
[獨立樣本 vs 相依樣本 t 檢定](/guides/independent-vs-paired-t-test/)

如果已經跑完分析但不會解讀：
[p 值怎麼看](/guides/p-value-interpretation/)

如果只會看顯著，還不知道差異多大：
[效果量 Effect Size 指南](/guides/effect-size-guide/)

## 頁面 CTA

**已經決定要比較兩個獨立群體？**

使用 FunnyTools 獨立樣本 t 檢定簡易計算器輸入兩組的 N、平均數與樣本標準差，快速核對 Welch t、df 與雙尾 p 值。

主要按鈕：`開啟 Welch t 檢定計算器`  
次要按鈕：`前往教育統計工具中心`

## 圖卡文案與 ALT

圖卡標題：`統計方法怎麼選？先問 4 件事`

1. `比較、關聯還是預測？`
2. `依變項是什麼尺度？`
3. `有幾組／幾個時間點？`
4. `獨立樣本還是重複測量？`

ALT：`統計方法選擇流程圖，依研究問題、變項尺度、組數與樣本關係選擇 t 檢定 ANOVA 卡方 相關或迴歸`

## 參考資料

- NIST/SEMATECH e-Handbook of Statistical Methods.
- FunnyTools 教育與統計工具中心及既有 t 檢定、ANOVA、SPSS 指南。

> 此頁為方法選擇的第一層導覽，不取代完整研究設計與統計建模判斷。
