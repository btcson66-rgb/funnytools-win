---
slug: /guides/independent-vs-paired-t-test/
seo_title: "獨立樣本 vs 相依樣本 t 檢定：前後測要用哪一個？完整比較｜FunnyTools"
meta_description: "獨立樣本 t 檢定和相依樣本 t 檢定怎麼選？用 A/B 班、實驗組控制組、前後測、配對資料範例說明 independent、paired t test 與 Welch t 的差異。"
og_title: "獨立樣本 vs 相依樣本 t 檢定：前後測別再選錯"
og_description: "不同的人用 independent；同一批人前後測用 paired。再看 Welch t、配對差分與常見錯誤。"
canonical: "https://funnytools.win/guides/independent-vs-paired-t-test/"
primary_keyword: "獨立樣本 相依樣本 t 檢定"
search_intent: "資訊型／方法選擇"
card_title: "獨立樣本 vs 相依樣本 t 檢定"
card_description: "不同的人 vs 同一批人的前後測：用例子一次搞懂該選哪個 t 檢定。"
hero_eyebrow: "t 檢定指南"
hero_title: "獨立樣本 vs 相依樣本 t 檢定：前後測到底要用哪一個？"
hero_subtitle: "選 t 檢定最重要的不是看表格長什麼樣，而是先問：兩次數據是不是來自同一個人，或具有一對一配對關係？"
date_published: "2026-08-27"
date_modified: "2026-08-27"
---

# 獨立樣本 vs 相依樣本 t 檢定：前後測到底要用哪一個？

很多人知道「兩組平均數 → t 檢定」，但真正容易錯的是：**到底要用獨立樣本 t 檢定，還是相依樣本 t 檢定？**

最簡單的判斷不是看「有兩欄資料」，而是看每一筆觀察值之間的關係。

> **速答：獨立樣本和相依樣本 t 檢定怎麼選？**  
> 如果兩組資料來自不同且彼此獨立的人，例如實驗組 vs 控制組、A 班 vs B 班，通常使用獨立樣本 t 檢定；如果兩次資料來自同一批人，例如前測 vs 後測，或每筆資料有一對一配對關係，通常使用相依樣本／成對樣本 t 檢定（paired-samples t test）。

## 一、一句口訣先記住

> **不同的人 → Independent t test**  
> **同一批人兩次測量 → Paired t test**

這個口訣可以解決大部分初學題。

## 二、什麼是獨立樣本 t 檢定？

獨立樣本 t 檢定比較兩個彼此獨立群體的平均數。

例如研究問題：

> 閱讀策略教學組的後測是否高於一般教學組？

組別：
- 實驗組 30 人
- 控制組 32 人

一個學生只會出現在其中一組。

這兩組資料彼此獨立，所以考慮：

> **independent-samples t test**

## 三、什麼是相依樣本 t 檢定？

相依樣本 t 檢定又常叫：
- paired-samples t test；
- paired t test；
- dependent t test；
- 成對樣本 t 檢定；
- 相依樣本 t 檢定；
- 重複量數 t 檢定。

它比較的是：**一組配對差分的平均值是否偏離 0。**

最典型情境是同一批學生接受：
- 教學前測；
- 教學後測。

每一個後測都可以對回同一位學生的前測。

## 四、為什麼前後測不能當兩個獨立群體？

假設：

小明：
- 前測 60
- 後測 80

小華：
- 前測 90
- 後測 91

如果只把前測平均和後測平均當兩群獨立資料，你會忽略每個人的起點不同。

Paired t test 會先看個人差分：

- 小明：+20
- 小華：+1

再分析平均變化是否顯著偏離 0。

這正是配對設計的重要資訊。

## 五、兩種 t test 的核心差別

| 項目 | 獨立樣本 t | 相依樣本 t |
|---|---|---|
| 英文 | independent-samples t | paired-samples t |
| 資料來源 | 不同人 | 同一人兩次／配對 |
| 常見案例 | 實驗組 vs 控制組 | 前測 vs 後測 |
| 分析核心 | 兩組平均差 | 配對差分平均 |
| 每人出現次數 | 通常一次 | 通常兩次 |
| 是否利用配對關係 | 否 | 是 |
| 常見替代 | Welch t | Wilcoxon signed-rank 等 |

## 六、A 班 vs B 班：獨立樣本

A 班 30 人，B 班 30 人，研究者比較兩班數學成績。

即使兩班同校、同年級、使用同一份考卷，只要 A 班和 B 班不是同一批學生：

> 仍是獨立樣本。

## 七、同一班前測 vs 後測：相依樣本

30 位學生都接受：

1. 前測；
2. 教學；
3. 後測。

每個人有兩筆成績。

這是：

> paired t test。

## 八、左手 vs 右手也可能是 paired

同一位受試者測：
- 左手反應時間；
- 右手反應時間。

雖然不是前後測，但兩筆資料來自同一人，所以有配對關係，可以考慮 paired t。

## 九、配對個案也可能使用 paired t

研究者為每位實驗組受試者找一位年齡、性別或前測程度相近的配對控制個案。

如果分析設計真的依 pair 建立一對一關係，就可能使用配對方法。

所以 paired 不只等於前後測。

## 十、獨立樣本 t 檢定為什麼常看到 Levene’s Test？

傳統 Student independent t test 有等變異數假設。

SPSS 常先給 Levene’s Test for Equality of Variances，再提供：

- Equal variances assumed
- Equal variances not assumed

這讓很多人把大量注意力放在「第一列還第二列」。

但現代實務中，Welch t test 是常見而穩健的選擇，因為不要求兩組母體變異數完全相等。

FunnyTools 的[獨立樣本 t 檢定簡易計算器](/tools/independent-samples-t-test-calculator/)就是以 Welch 方法計算。

## 十一、Welch t test 是什麼？

Welch t test 比較兩組獨立平均數，但允許：
- 兩組變異數不同；
- 兩組樣本數不同。

它的 df 常不是整數，例如：

`Welch’s t(57.36) = 2.84`

這是正常的。

不要看到自由度有小數就以為軟體錯了。

## 十二、paired t test 的 t 值怎麼來？

先算每一對的差：

`D = 後測 - 前測`

再計算：
- 差分平均；
- 差分標準差；
- 差分平均的 SE。

核心概念：

`t = 平均差 ÷ 平均差的標準誤`

所以 paired t 關注的是個人改變量是否一致地偏離 0。

## 十三、paired t test 的常態假設看什麼？

初學者常說：「前測要常態、後測也要常態。」

更核心的條件其實是：**配對差分的分布。**

例如先算：

`後測 - 前測`

再檢查差分是否有嚴重偏態或極端離群。

當然，獨立性、資料品質與研究設計仍然重要。

## 十四、獨立樣本 t test 要檢查什麼？

常見考量：
- 兩組觀察值獨立；
- 依變項適合以連續尺度分析；
- 極端離群；
- 分布形態；
- 樣本量；
- 變異數情況。

使用 Welch 方法可以減少對等變異數假設的依賴，但不能修復所有資料問題。

## 十五、paired t test 要檢查什麼？

常見考量：
- 配對關係正確；
- 每一對對應無誤；
- 差分分數沒有嚴重異常；
- 各 pair 之間彼此獨立；
- 依變項尺度合理。

如果配對資料順序弄錯，paired t 結果會完全失去意義。

## 十六、六個研究案例快速判斷

### 案例 1：兩種教學法
A 組 30 位學生接受新教學，B 組 30 位不同學生接受一般教學。  
答案：**independent-samples t / Welch t**

### 案例 2：介入前後
20 位 ADHD 學生接受注意力訓練，每人有前測和後測。  
答案：**paired-samples t**

### 案例 3：男生 vs 女生
同一份量表，兩群不同學生。  
答案：**independent-samples t**

### 案例 4：同一人看兩種畫面
每位參與者都觀看靜態教材和動態教材，比較反應時間。  
答案：**paired t**

### 案例 5：三個時間點
同一批人前測、中測、後測。  
答案：通常考慮 **repeated-measures ANOVA 或其他 repeated-measures model**，不是三次 paired t 直接亂比。

### 案例 6：三個不同群體
A、B、C 三種教學法。  
答案：通常先考慮 **one-way ANOVA**，不是把所有 pair 都各做一次 t test。

## 十七、獨立樣本 t 的實際結果怎麼看？

假設：

A 組：
- n = 30
- M = 82.4
- SD = 7.1

B 組：
- n = 32
- M = 76.3
- SD = 8.2

Welch 結果：

`t(59.8) = 3.13, p = .003`

可以寫：

> A 組（M = 82.40, SD = 7.10）高於 B 組（M = 76.30, SD = 8.20），Welch’s *t*(59.8) = 3.13, *p* = .003。

再加效果量與 CI 會更完整。

## 十八、paired t 的實際結果怎麼看？

20 人：

- 前測 M = 65.2
- 後測 M = 72.8
- 平均差 Mdiff = 7.6

假設：

`t(19) = 4.10, p < .001`

可寫：

> 學生後測（M = 72.80）高於前測（M = 65.20），平均增加 7.60 分，*t*(19) = 4.10, *p* < .001。

最好再補：
- 前後測 SD；
- 差分 CI；
- 適當 paired effect size。

## 十九、p < .05 不代表教學效果一定大

不管 independent 還是 paired：

> p 值 ≠ 效果量。

所以完成 t test 後，請繼續看：
- 平均差；
- Cohen’s d 或適合的 standardized effect；
- 95% CI。

延伸：
- [p 值怎麼看](/guides/p-value-interpretation/)
- [效果量完整指南](/guides/effect-size-guide/)
- [95% 信賴區間](/guides/confidence-interval-95-guide/)

## 二十、前後測有實驗組和控制組怎麼辦？

例如：

### 實驗組
- 前測
- 後測

### 控制組
- 前測
- 後測

很多人會分別做：
- 實驗組 paired t；
- 控制組 paired t；

然後說：

> 實驗組顯著、控制組不顯著，所以兩組改變不同。

這個推論不一定成立。

> **「一組顯著、另一組不顯著」不等於「兩組差異顯著」。**

真正要檢查的是組別之間的改變是否不同。

可依研究設計考慮：
- change score comparison；
- ANCOVA；
- mixed ANOVA；
- linear mixed model。

## 二十一、常見錯誤

### 錯誤 1
前後測使用 independent t。

### 錯誤 2
A 班 vs B 班用 paired t，卻沒有配對依據。

### 錯誤 3
三組以上一直做 t test。

### 錯誤 4
只看 p 值，不看平均差與效果量。

### 錯誤 5
看到 Levene 顯著就停止分析。

### 錯誤 6
paired 資料配對順序錯誤。

### 錯誤 7
實驗組顯著、控制組不顯著，就直接說組間變化不同。

## 二十二、快速判斷題

### 題目 A
30 名男生 vs 30 名女生的平均分數。  
答案：**independent**

### 題目 B
30 名學生教學前 vs 教學後。  
答案：**paired**

### 題目 C
同一位學生使用鍵盤 A vs 鍵盤 B 的速度。  
答案：**paired**

### 題目 D
A 校 vs B 校學生平均成績。  
答案：**independent**

### 題目 E
三個班平均成績。  
答案：通常先想 **ANOVA**，不是 t test。

## 二十三、常見問題 FAQ

### 前測後測一定用 paired t 嗎？
如果只有同一批人兩次連續測量，paired t 是常見方法；但有控制組、三次以上測量、非連續結果或更複雜設計時，可能需要其他分析。

### Welch t 和 independent t 是不同研究設計嗎？
不是。Welch t 是兩獨立群體平均數比較的一種版本，主要處理變異數不相等與樣本數不平衡問題。

### paired t 需要兩組樣本數一樣嗎？
每一筆必須成對，因此完整配對資料會有同樣的 pair 數。缺失資料要依分析計畫處理，不能隨便錯位配對。

### 獨立樣本 t 可以比較三組嗎？
不應把 three-group overall question 只靠多次 t test 解決；通常考慮 ANOVA。

### t test 顯著就代表因果嗎？
不一定。因果推論主要取決於研究設計，不是檢定名稱。

### 我只有平均數、SD、N 可以算嗎？
對兩個獨立群體，Welch t 可以從摘要統計量計算。FunnyTools 的工具正是這種用途；paired t 通常還需要配對差分或前後測相關資訊，不能只靠兩個獨立摘要完整重建。

## 二十四、下一步

如果你還沒確定該用哪種統計：

[統計方法怎麼選](/guides/statistical-test-selection/)

如果你已經得到 p 值：

[p 值怎麼看](/guides/p-value-interpretation/)

如果你想知道「差多少」：

[效果量完整指南](/guides/effect-size-guide/)

## 頁面 CTA

**你比較的是兩個不同群體，而且手上有 N、M、SD？**

直接使用 FunnyTools 的獨立樣本 t 檢定簡易計算器。工具採 Welch t test，不需要假設兩組變異數完全相等。

主要按鈕：`開啟獨立樣本 t 檢定計算器`  
次要按鈕：`查看統計方法選擇指南`

## 圖卡與 ALT

圖卡標題：`不同的人 vs 同一批人`

左側：`不同的人 → Independent / Welch t`  
右側：`同一批人兩次 → Paired t`  
底部：`三組以上？先考慮 ANOVA`

ALT：`獨立樣本 t 檢定與相依樣本 t 檢定比較圖，不同群體使用 independent t，同一批人前後測使用 paired t`

## 參考資料

- NIST/SEMATECH e-Handbook of Statistical Methods.
- FunnyTools 獨立樣本 t 檢定簡易計算器。
- FunnyTools SPSS Levene 與 t 檢定 APA 7 既有指南。

> 本頁提供研究方法判斷框架，正式分析需確認研究設計、抽樣、量尺、離群值與模型假設。
