---
slug: "/guides/gpa-credit-weighted-formula-guide/"
seo_title: "GPA 怎麼算？學分加權、Quality Points、公式與手算驗證完整指南｜FunnyTools"
meta_description: "GPA為什麼不是直接平均A、B、C？完整說明grade points乘學分、quality points、總學分、重修與無學分課程的制度差異，附3學分A與B+手算範例。"
og_title: "GPA 怎麼算？真正公式是 grade points × credits"
og_description: "三學分的課和一學分的課通常不應有相同權重；GPA本質是學分加權平均。"
canonical: "https://funnytools.win/guides/gpa-credit-weighted-formula-guide/"
primary_keyword: "GPA 怎麼算 學分"
card_title: "GPA 怎麼算？"
card_description: "用grade point乘學分取得quality points，再除以計入GPA的總學分。"
hero_title: "GPA 怎麼算？學分加權、Quality Points、公式與手算驗證完整指南"
hero_subtitle: "如果一門課3學分、另一門1學分，它們對GPA的影響通常不應一樣大。"
---

# GPA 怎麼算？學分加權、Quality Points、公式與手算驗證完整指南

GPA 的核心公式非常簡單：

`GPA = Σ(Grade Point × Credit) / Σ Credits`

難的不是公式，而是：

> 哪些課程真的要進分子和分母？

> **速答：GPA 是學分加權平均。**  
> 每門課先把letter grade換成grade point，再乘上該課credit得到quality points；最後把所有quality points加總，除以所有「計入GPA」的credits。FunnyTools的GPA工具依使用者輸入的有效學分與letter grade試算，但它不知道你的學校如何處理重修、Pass/Fail、Withdraw、轉學生抵免或免修，因此正式GPA仍應以教務系統為準。

## 一、Quality Points 是什麼？

假設：

> A = 4.0

一門3學分A：

`4.0 × 3 = 12`

這12就是該課對總GPA的quality points貢獻。

## 二、B+三學分

FunnyTools preset：

> B+ = 3.3

所以：

`3.3 × 3 = 9.9`

## 三、完整例子

- 3學分 A
- 3學分 B+
- 2學分 B

總quality points：

`3×4.0 + 3×3.3 + 2×3.0`

`= 12 + 9.9 + 6`

`= 27.9`

總學分：

`3+3+2 = 8`

GPA：

`27.9 / 8 = 3.4875`

約3.49。

## 四、為什麼不能直接平均grade points？

直接：

`(4.0 + 3.3 + 3.0)/3`

`= 3.4333`

和正確3.4875不同。

因為2學分B的權重比3學分課小。

## 五、一學分低分影響比較小嗎？

如果其他條件相同：

> 通常是。

因為GPA按credit加權。

例如1學分F：

> 貢獻0 quality points，但增加1個分母學分。

影響比3學分F小。

## 六、無學分課會怎樣？

如果credit = 0：

> 一般不會有GPA加權貢獻。

FunnyTools目前會忽略0或負學分列。

但正式學校可能有：
- zero-credit requirement
- pass/fail activity

應按制度。

## 七、Pass / Fail怎麼處理？

各校規定差異很大。

可能：
- P給學分但不進GPA
- F進GPA
- 全部不進GPA
- 特定課例外

FunnyTools目前只接受A+到F的preset，不處理完整P/W/I/X制度。

不要自行把P換成4.0。

## 八、Withdraw W呢？

很多制度：

> W不進GPA。

但仍會出現在transcript。

正式結果要看校規。

FunnyTools沒有W選項時：

> 不要把W當F輸入。

## 九、重修怎麼算？

常見政策可能：
- 新成績取代舊成績
- 兩次都算
- 舊成績留transcript但GPA替換
- 有次數限制

所以重修GPA不能只靠一般公式判斷。

要先處理：

> 哪一筆被學校視為「計入」。

## 十、累積GPA怎麼延伸？

不要把semester GPA直接平均。

正確需要保留：

> 每學期quality points與計入學分。

累積：

`總quality points / 總credits`

延伸：[學期GPA vs累積GPA](/guides/semester-vs-cumulative-gpa-guide/)

## 十一、如何手算驗證 FunnyTools？

工具顯示：

- GPA
- total credits
- total quality points

你可以：

`GPA × total credits`

反推quality points。

再逐科：

`grade point × credit`

加起來。

兩邊一致：

> 代表這組輸入按同一公式計算。

## 十二、常見錯誤

- letter grade直接平均
- 忘記乘credits
- W當F
- P當4.0
- 重修兩筆都算卻不知道校規
- 0學分當正常課
- GPA只保留一位小數導致累積誤差

## 十三、FAQ

### GPA為什麼要乘學分？
因為課程credit通常代表課程在GPA中的權重。

### 三學分A比一學分A影響大嗎？
通常是，前者quality points貢獻為三倍。

### P算幾分？
不能通用回答，依學校規則。

### 重修要刪舊成績嗎？
看學校政策。

### FunnyTools會自動知道重修嗎？
不會。

## 十四、延伸閱讀

- [GPA計算器](/tools/gpa-calculator/)
- [GPA 4.0 vs 4.3](/guides/gpa-4-0-vs-4-3-guide/)
- [學期GPA vs累積GPA](/guides/semester-vs-cumulative-gpa-guide/)
- [百分制轉GPA](/guides/percentage-grade-to-gpa-conversion-guide/)
- [成績與GPA中心](/guides/grades-gpa/)

## 頁面 CTA

**保留每門課的學分與letter grade，比只記最後GPA更容易複核。**

CTA：`開啟GPA計算器`

次要 CTA：`計算累積GPA`

## 圖卡與 ALT

`Course Grade Point × Credit = Quality Points`

ALT：`GPA學分加權公式示意，逐科grade point乘學分得到quality points，再除以總學分`

## 逐科重算範例的檢查點

建立表格時至少保留課程名稱、grade point、有效學分與 quality points 四欄。每一列先計算 grade point × credits，再把 quality points 加總；分母只放符合學校 GPA 規則的有效學分。旁聽、P/F、免修或不計入 GPA 的科目不能因為出現在成績單上就自動加入分母。

完成後可用反向檢查：把總 quality points 除以總 GPA 學分，並將結果與逐科手算的範圍比較。若超過最高 grade point、分母少了一科，或重修科目同時被算兩次，通常是輸入狀態或制度規則沒有先分類。保留原始未四捨五入數字，能避免每科先取整造成累積誤差。

逐科表格也應保留「是否計入 GPA」欄位，因為有效學分不一定等於成績單上所有學分。重修課程可能以新成績取代舊成績，也可能兩次都留下但只有一次計入；轉學分則可能只算學分、不算 grade point。若規則不清楚，分別列出每種假設的結果，不要選一個看似合理的數字冒充正式 GPA。

檢查小數時，先比較 quality points 總和與分母，再檢查最後顯示位數。每一步留下可重算的原始欄位，未來新增課程或更正成績時只需更新一列，不必手動修改整個總數。

任何無法確認的科目狀態，都先標記待核對而不是猜測。

這也適用於跨學期匯入的成績資料。

匯入後仍需人工抽查幾筆。

抽查時比對科目、學分、等第、quality points 與是否計入 GPA，任何一欄不同都先停止提交。

完成。
