---
slug: "/guides/extra-credit-over-100-grade-guide/"
seo_title: "Extra Credit 怎麼算？成績超過100分、Bonus、加權後加分與上限完整指南｜FunnyTools"
meta_description: "加分題到底加在哪裡？完整比較原始分數加分、評量內bonus、課程總成績bonus、extra credit權重與cap，並說明FunnyTools為何允許輸入超過100分但不會替你判斷校規。"
og_title: "Extra Credit 超過100分可以嗎？先看加分是加在哪一層"
og_description: "105分可能完全合理，也可能違反課程上限；關鍵不是100這個數字，而是評分規則。"
canonical: "https://funnytools.win/guides/extra-credit-over-100-grade-guide/"
primary_keyword: "Extra Credit 成績 超過100"
card_title: "Extra Credit 怎麼算？"
card_description: "先分清bonus加在單項分數、加權總分，還是獨立額外百分點。"
hero_title: "Extra Credit 怎麼算？成績超過100分、Bonus、加權後加分與上限完整指南"
hero_subtitle: "同樣『加5分』，加在一份20%作業上和直接加在學期總成績上，影響可以差五倍。"
---

# Extra Credit 怎麼算？成績超過100分、Bonus、加權後加分與上限完整指南

老師說：

> 「Bonus +5。」

到底是哪一種？

- 考試80變85？
- 考試滿分100但可拿105？
- 學期總成績直接+5？
- 額外作業占5%？

差別非常大。

> **速答：Extra Credit 必須先確認加分層級。**  
> 如果bonus加在某一項評量的原始分數，它還要再乘該項權重；如果是直接加在course total，才是直接增加總成績百分點。FunnyTools 成績平均工具允許分數超過100，方便處理bonus或非百分制資料，但不會自動知道課程是否cap at 100、是否允許extra credit、或bonus應加在哪一層。

## 一、評量內加分

期中考：
- 原分80
- bonus +5
- 期中占30%

新期中：

> 85

對總成績增加：

`5 × 0.30 = 1.5`

也就是只增加：

> 1.5個課程總分百分點。

## 二、直接加學期總成績

如果規則是：

> Course total +5 points

那原本81：

> 變86。

這和上一種完全不同。

## 三、考試可超過100

例如：
- 基本100
- bonus 10
- 學生拿105

如果課程明確允許：

> 105可以是一個有效原始分數。

FunnyTools Grade Average目前不限制score一定≤100。

這是刻意保留彈性。

## 四、但正式成績可能Cap at 100

課程可能規定：

> 每項可超100，但final course grade最高100。

或：
> letter grade最高A+。

這需要額外套cap：

`min(calculated grade, 100)`

但FunnyTools不會自動替你cap。

## 五、Extra Credit作為獨立項目

例如：

- Homework 30
- Midterm 30
- Final 40
- Bonus activity 5

總權重變：

> 105

接下來要看教師定義。

### 可能A
Bonus是額外5 course points，不normalize。

### 可能B
105只是相對權重，最後仍除以105。

兩者結果不同。

所以不能只把數字丟進加權平均工具。

## 六、為什麼通用Weighted Average會normalize？

公式：

`Σwx / Σw`

如果輸入：
30、30、40、5

它會除以：

> 105

這是正確的「相對權重平均」。

但如果老師說：

> 前100%先算完，bonus再額外加5%

你就不能讓工具自動normalize成105%。

## 七、例子：兩種做法差多少

原始課程：

> 80分。

Bonus activity：
> 100分，標示5%。

### 相對權重
`(80×100 + 100×5)/105`

`= 80.95`

### 額外5%
`80 + 5`

`= 85`

差4.05分。

所以一定要先讀規則。

## 八、Bonus也可能只用來替換最低分

例如：
- 完成bonus worksheet
- 可以drop lowest quiz

這根本不是「+幾分」。

計算方式會變成：

> 先排除最低項再重算。

FunnyTools目前不會自動drop lowest。

## 九、超過100的平均合理嗎？

如果所有項目允許bonus：

> 算術上可以。

例如：
105、110、100

平均：

`105`

但正式report是否顯示105：

> 依制度。

## 十、學生估分應做什麼？

不要只問：

> 「我有5分bonus。」

要問：
1. 加在哪個assessment？
2. assessment weight多少？
3. final grade有cap嗎？
4. bonus可否超過100？
5. bonus是否替換其他分數？

## 十一、教師設計Extra Credit應寫清楚

課程大綱可以明確寫：

> Bonus quiz最多增加course total 2 percentage points，且final grade capped at100。

這比只寫：

> bonus 2%

更不容易爭議。

## 十二、常見錯誤

- assessment +5當course +5
- extra 5 weight被normalize卻沒發現
- >100一律當錯誤
- >100一律當有效正式成績
- 忘記cap
- bonus其實drop lowest卻直接加分

## 十三、FAQ

### FunnyTools可以輸入105嗎？
Grade Average目前可以。

### 105一定代表105%嗎？
不一定，工具本身不判斷量尺語意。

### Extra Credit權重加到105怎麼辦？
先看課程是否要normalize，還是視為額外bonus。

### 最終成績可以超100嗎？
由課程／學校規則決定。

### 工具會自動cap嗎？
目前不會。

## 十四、延伸閱讀

- [成績平均計算器](/tools/grade-average/)
- [加權平均計算器](/tools/weighted-average-calculator/)
- [權重不是100%](/guides/weighted-grade-weights-not-100-guide/)
- [四捨五入與及格線](/guides/grade-rounding-cutoff-guide/)
- [成績與GPA中心](/guides/grades-gpa/)

## 頁面 CTA

**看到Bonus先問「加在哪一層」，再進計算器。**

CTA：`開啟成績平均計算器`

次要 CTA：`權重超過100怎麼判斷？`

## 圖卡與 ALT

`Assessment bonus × assessment weight ≠ course-total bonus`

ALT：`Extra Credit層級差異圖，說明單項評量加分要再乘權重，而課程總成績bonus可直接加總分百分點`

## 加分項目的兩個常見層級

先確認 bonus 是加在某一項評量的原始分數，還是直接加到課程總成績。若測驗原始分數多 5 分，而該測驗權重是 20%，對總成績的影響可能只有 1 個百分點；若規則寫的是課程總成績另加 5 個百分點，計算方式完全不同。把這兩種加分都直接相加，會誇大結果。

也要確認是否有單項上限、課程總成績上限、letter grade 上限或未使用加分的失效條件。試算時列出原始成績、加分前權重貢獻、加分後貢獻與 cap 後結果，並以課程大綱的文字規則做最後核對。若學校系統已自動處理加分，應以系統顯示和正式成績規則為準。

加分政策常有期限、資格或指定評量限制，例如只有完成某項活動才可使用，或加分只能抵銷缺交而不能提高考試分數。試算時把資格條件與數學公式分開列出；先確認是否有資格，再計算可加入的分數，避免把未獲得的 bonus 當成已取得成績。

若總成績上限是 100，請同時保留 cap 前和 cap 後數值。這樣能看出加分實際影響，也能在規則改變時重新檢查，而不是只剩一個無法解釋的 100 分。

## 使用前再確認

加分規則通常由課程或學校自訂，計算前先確認加分上限、權重與四捨五入位置，再把原始分數和加分分開保存。
