---
slug: "/workflows/grade-gpa-check-toolkit/"
seo_title: "成績與 GPA 檢查工具組｜加權、期末估分、學分 GPA 與正式核對流程｜FunnyTools"
meta_description: "學生與老師的成績檢查流程：先確認評分規則，處理missing與bonus，再算簡單/加權平均、反推期末需求、試算GPA，最後用正式成績單或課程規定核對。"
canonical: "https://funnytools.win/workflows/grade-gpa-check-toolkit/"
hero_title: "成績與 GPA 檢查工具組"
hero_subtitle: "從原始分數一路算到GPA之前，先把『空白、權重、加分、四捨五入、學分』逐層檢查，避免一個小假設讓整個結果偏掉。"
---

# 成績與 GPA 檢查工具組

這個 Workflow 適合：

- 學生期末前估分
- 教師整理課程成績
- 家長理解分數組成
- 申請前自我核對 GPA
- 助教整理課程評量

目的不是取代：

> 教務系統。

而是讓你在正式成績出現前，先有一套可以重算與找錯的流程。

## 路徑 A：學生期末前估分

### Step 1 — 抄下正式配分

不要憑記憶。

從：
- syllabus
- LMS
- 老師公告

抄：

| Item | Weight |
|---|---:|
| Homework | 30% |
| Midterm | 30% |
| Final | 40% |

先確認：

> 真的總和100%。

若不是：
閱讀 [權重不是100%怎麼辦](/guides/weighted-grade-weights-not-100-guide/)

### Step 2 — 標記每筆狀態

不要只填Score。

標記：
- graded
- not graded
- missing→zero
- exempt

閱讀：
[缺交0分還是不計](/guides/missing-assignment-zero-exempt-guide/)

### Step 3 — 算目前分數

使用：
[成績平均計算器](/tools/grade-average/)

若每項權重不同：
[加權平均計算器](/tools/weighted-average-calculator/)

確認：
- 有效項目數
- 權重
- blank是否被排除

### Step 4 — 反推期末

如果剩下一個主要評量：

使用：
[期末要考幾分公式](/guides/final-exam-score-needed-guide/)

不要把：
> normalized current average

誤當：
> 已鎖定course points。

### Step 5 — 處理Bonus

如果老師有Extra Credit：

先查：
- bonus加在哪一層
- 是否cap
- 是否drop lowest

閱讀：
[Extra Credit指南](/guides/extra-credit-over-100-grade-guide/)

### Step 6 — 查Rounding

如果你在59.5、79.5等cutoff附近：

> 不要自行假設。

閱讀：
[成績四捨五入與Cutoff](/guides/grade-rounding-cutoff-guide/)

### Step 7 — 最後核對LMS

把你算出的：
- total
- current grade
- assumptions

和LMS比較。

若不同：

> 先找規則差，不要立刻認為系統錯。

---

## 路徑 B：算 GPA

### Step 1 — 找正式 GPA Scale

先確認：
- 4.0?
- 4.3?
- 其他?

不要把百分制自己線性縮放。

閱讀：
[GPA 4.0 vs 4.3](/guides/gpa-4-0-vs-4-3-guide/)

### Step 2 — 準備每門課資料

至少：
- Course
- Credit
- Letter grade

### Step 3 — 排除／處理特殊課

先查：
- P/F
- W
- transfer
- repeat
- zero-credit

因為 FunnyTools 不知道你的校規。

### Step 4 — 計算 GPA

使用：
[GPA計算器](/tools/gpa-calculator/)

再手算一門：
`grade point × credit`

核對總quality points。

### Step 5 — 算累積 GPA

若要跨學期：

> 不要直接平均semester GPA。

閱讀：
[學期GPA vs累積GPA](/guides/semester-vs-cumulative-gpa-guide/)

### Step 6 — 百分制申請換算

如果申請機構要求另一scale：

> 先讀指定conversion policy。

閱讀：
[百分制轉GPA為什麼不能亂換](/guides/percentage-grade-to-gpa-conversion-guide/)

---

## 路徑 C：教師或助教出分前抽查

### Step 1
檢查所有項目權重。

### Step 2
抽查：
- 0
- blank
- exempt
- extra credit
- >100

### Step 3
用 FunnyTools 小樣本重算。

### Step 4
匯出 Grade Average CSV。

### Step 5
在試算表抽查3～5名學生。

### Step 6
確認rounding只在規定的步驟發生。

### Step 7
再匯入／發布正式系統。

---

## 最終學生 Checklist

- [ ] 課程配分來自正式來源
- [ ] blank不是自己亂填0
- [ ] 權重單位一致
- [ ] 目前平均和final contribution有區分
- [ ] bonus規則清楚
- [ ] cutoff/rounding已查
- [ ] GPA scale已查
- [ ] P/F/W/repeat已依校規處理
- [ ] 已用正式LMS／成績單核對

## 最終教師 Checklist

- [ ] 權重總和符合課綱
- [ ] missing policy一致
- [ ] exempt處理一致
- [ ] bonus沒有意外normalize
- [ ] >100符合規則
- [ ] rounding位置固定
- [ ] random sample手算一致
- [ ] 正式發布前留存原始資料

## 相關工具

- [成績平均計算器](/tools/grade-average/)
- [加權平均計算器](/tools/weighted-average-calculator/)
- [GPA計算器](/tools/gpa-calculator/)
- [百分比計算器](/tools/percentage-calculator/)

## 相關指南

- [成績與GPA指南中心](/guides/grades-gpa/)
- [期末需要幾分](/guides/final-exam-score-needed-guide/)
- [缺交0分還是不計](/guides/missing-assignment-zero-exempt-guide/)
- [GPA學分公式](/guides/gpa-credit-weighted-formula-guide/)

## 頁面 CTA

**先把規則、資料狀態和公式分開，再讓工具幫你算。**

CTA：`開啟成績平均計算器`

次要 CTA：`開啟GPA計算器`


