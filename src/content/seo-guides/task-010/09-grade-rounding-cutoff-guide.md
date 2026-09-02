---
slug: "/guides/grade-rounding-cutoff-guide/"
seo_title: "59.5 一定算60嗎？成績四捨五入、及格線、Cutoff 與小數位完整指南｜FunnyTools"
meta_description: "59.5是否算60？完整比較round half up、銀行家捨入、截斷、不四捨五入、每項先round與總分最後round，說明為何及格線必須依課程或學校正式規則。"
og_title: "59.5 一定會變60嗎？不一定"
og_description: "四捨五入的位置與方法都會改變結果；正式及格不能由一般計算器替學校決定。"
canonical: "https://funnytools.win/guides/grade-rounding-cutoff-guide/"
primary_keyword: "59.5 算 60 嗎"
card_title: "59.5 一定算60嗎？"
card_description: "先看學校在哪一個步驟round、保留幾位，以及cutoff是否用原始值判斷。"
hero_title: "59.5 一定算60嗎？成績四捨五入、及格線、Cutoff 與小數位完整指南"
hero_subtitle: "同一組分數，如果每次小考先round和最後總分才round，可能得到不同結果。"
---

# 59.5 一定算60嗎？成績四捨五入、及格線、Cutoff 與小數位完整指南

最常見問題：

> 「我59.5，會不會算60？」

真正答案：

> 要看正式規則。

> **速答：59.5不一定自動等於60。**  
> 有些課程使用一般四捨五入，有些保留一或兩位小數，有些直接截斷，有些用未round的原始總分判斷及格線。甚至同樣使用四捨五入，如果「每個項目先round」和「所有計算完成後最後round一次」，結果也可能不同。FunnyTools計算器會依各工具自己的顯示精度呈現數字，但不能替任何學校決定59.5是否正式及格。

## 一、Round Half Up

日常最熟悉：

- 59.4 → 59
- 59.5 → 60

如果規定：

> 最終成績四捨五入到整數

59.5可能變60。

但仍要確認：

> 是否真的是half-up。

## 二、Banker's Rounding

某些軟體／程式語言可能使用：

> ties to even

例如：
- 58.5 → 58
- 59.5 → 60
- 60.5 → 60

目的是大量計算時減少系統性bias。

所以「尾數5一定進位」不是所有系統真理。

## 三、Truncation 截斷

有些規則：

> 直接捨去小數。

59.99：

> 59。

如果及格線60：

> 不及格。

## 四、完全不Round

系統可能保留：

> 59.50

並用原始值判斷：

`59.50 < 60`

所以仍不及格。

顯示畫面寫「60」不代表內部判斷使用60。

## 五、最危險：每一項先Round

例：

三項貢獻：
- 26.46
- 26.46
- 6.46

### 先各自round整數
26 + 26 + 6 = 58

### 先加總
`59.38`

再round：

> 59

結果不同。

如果更多項目：

> 誤差可能累積。

## 六、一般好習慣：中間保留精度

除非制度明確要求中間round：

> 計算過程保留較多位數，最後才按正式規則顯示。

這能降低rounding accumulation。

## 七、GPA也是一樣

若每一學期GPA先round到2位，再直接拿round後數字累積：

> 可能和從原始course quality points重算略不同。

正式累積GPA應以教務系統算法為準。

## 八、Cutoff和Display是不同事情

介面顯示：

> 60

可能內部值：

> 59.6

如果政策：
> 顯示到整數，但及格判斷使用原始值

結果仍可能不及格。

所以要分：

- calculation precision
- display precision
- decision cutoff

## 九、老師手動加分又是另一層

有些課程允許：
- discretionary bump
- attendance adjustment
- borderline review

這不是數學rounding。

不能把：

> 「老師可能會調」

寫成公式。

## 十、FunnyTools顯示精度

不同工具目前可能：
- 顯示2位
- 顯示4位
- 移除多餘0

這是：

> 前端呈現。

正式學校系統可能用不同精度。

所以試算時最好保存：
- 原始輸入
- 完整公式
- 未round中間結果

## 十一、怎麼查正式規則？

依序看：

1. 課程大綱
2. 評分規準
3. 學校學則
4. LMS說明
5. 教師公告
6. 教務系統

不要把同學經驗當正式政策。

## 十二、常見錯誤

- 59.5自動視為60
- 顯示60就認為內部也是60
- 每項先round
- GPA每學期rounded值直接平均
- Excel顯示2位就以為實際只存2位
- 把老師額外調分當rounding

## 十三、FAQ

### 59.5會及格嗎？
依正式rounding與cutoff規則。

### 59.9呢？
仍不能跨制度保證。

### FunnyTools會自動判斷及格嗎？
一般成績工具主要負責數學計算，不知道學校cutoff policy。

### 最好什麼時候round？
一般試算可保留中間精度、最後再round，但正式規則優先。

### Excel顯示60就是60嗎？
不一定，cell內部可能仍是59.6。

## 十四、延伸閱讀

- [成績平均計算器](/tools/grade-average/)
- [加權平均計算器](/tools/weighted-average-calculator/)
- [Extra Credit指南](/guides/extra-credit-over-100-grade-guide/)
- [GPA學分公式](/guides/gpa-credit-weighted-formula-guide/)
- [成績與GPA中心](/guides/grades-gpa/)

## 頁面 CTA

**正式門檻問題，先查rounding policy；試算時保留中間小數。**

CTA：`開啟成績平均計算器`

次要 CTA：`查看成績檢查Workflow`

## 圖卡與 ALT

`Raw result → official rounding rule → displayed grade → cutoff decision`

ALT：`成績四捨五入流程圖，區分原始計算值、正式rounding規則、顯示分數與及格cutoff判斷`

## 四捨五入前後要分開記錄

先保留完整計算值，再依規則決定是在每項評量、每個加權貢獻、課程總成績或 GPA 最後一步取捨。不同位置的四捨五入會產生不同結果，例如每科先取到整數再平均，通常不會等於全部原始小數先平均後才取整。不要只看畫面上的顯示分數就反推實際計算值。

及格線附近應列出原始值、取捨方法、顯示值和最終判定四欄。59.5 是否成為 60、銀行家捨入或一般四捨五入、是否採無條件進位，都要以課程或學校規則為準。工具能協助比較不同規則的結果，但不能替代教務單位對及格、補考或學位資格的正式判定。

若成績剛好落在邊界，應查閱課程大綱、校務規章或教師公布的評分政策，不能只引用一般數學課本的四捨五入定義。不同系統可能顯示相同的整數，但內部保留位數不同；因此複核時要要求原始計算值或正式成績紀錄，避免只截圖顯示結果。

建立成績表時，將規則版本、計算日期和人工覆核者一併保存。日後若修正權重或輸入分數，可以重新產生完整結果，並清楚比較哪些項目造成及格判定改變。
