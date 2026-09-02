---
slug: "/methodology/calculator-formula-verification/"
seo_title: "線上計算器公式怎麼驗證？公式、輸入規則、四捨五入與正式制度分層指南｜FunnyTools"
meta_description: "線上計算器結果怎麼複核？把問題分成公式、輸入驗證、單位、rounding與正式制度五層，用Percentage、Weighted Average、GPA、Mortgage等例子說明。"
canonical: "https://funnytools.win/methodology/calculator-formula-verification/"
primary_keyword: "線上計算器 公式 驗證"
card_title: "計算器公式怎麼複核？"
card_description: "公式算對不代表正式結果一定對；還要檢查輸入、單位、rounding與制度。"
hero_title: "線上計算器公式怎麼驗證？公式、輸入規則、四捨五入與正式制度分層指南"
hero_subtitle: "計算器最常見的爭議，其實是把『數學公式』和『現實規則』混在一起。"
---

# 線上計算器公式怎麼驗證？公式、輸入規則、四捨五入與正式制度分層指南

當兩個網站算出不同答案時，不應直接問：

> 「哪個網站錯？」

應先拆成五層。

## 第一層：公式本身

例如 Weighted Average：

`Σ(wx)/Σw`

這是數學公式。

若兩個工具連這一層都不同：

> 一定至少有一個算法／定義不同。

## 第二層：輸入解讀

Weight：
- 30
- 0.30

如果所有weight都使用同一比例：

> 結果可相同。

但如果混：
- 30
- .3
- 40

就不是30/30/40。

所以錯誤可能在：

> 單位。

## 第三層：資料狀態

Blank：
- ignore?
- zero?
- error?

不同工具可能設計不同。

這不是公式問題。

Grade Average目前的blank behavior應由repo test確認並公開。

## 第四層：Rounding

工具A：
> 中間保留完整精度，最後round2位。

工具B：
> 每一項先round。

最後可能不同。

所以驗證時要記：
- calculation precision
- display precision
- cutoff precision

## 第五層：正式制度

這最重要。

### GPA
同一公式：

`quality points / credits`

但：
- A+是多少
- P/F
- repeat
- transfer

由學校決定。

### Salary
數學扣除：
> gross − deductions

但實際：
- 稅
- 保費
- 雇主制度

會依地區與個人不同。

### Mortgage
固定本息公式可以正確。

但正式銀行：
- fees
- rate type
- amortization
- insurance
- early repayment

可能不同。

因此：

> 「公式正確」不等於「正式個案結果完全相同」。

## Known-Answer Test

每一個計算器至少要有：

- 普通值
- 0
- 邊界
- invalid
- 大數
- 小數

例如Percentage：
- 25% of200
- 0% of200
- 100% of200
- percent change original0

## Independent Calculation

如果calculator function：

```text
calculateWeighted()
```

test不應只：

> 再呼叫一次calculateWeighted()。

應在test用獨立公式：

> 計算expected。

才有cross-check意義。

## Property Test

除了固定答案，可以測不變性。

例如weighted average：

所有values都相同100：

> 只要weights為正，結果必須100。

所有weights乘10：

> 結果不變。

這類property可以抓出很多隱藏bug。

## Unit Test vs UI Test

Unit test：
> 公式function。

UI test：
> 使用者輸入 → parse → validation → result。

兩者都需要。

很多bug發生在：
- comma
- locale decimal
- blank
- string conversion

而不是公式。

## Formal-result boundary 應顯示在頁面

每個可能受制度影響的計算器應有：

`此結果是依輸入與本站公式的試算；正式結果請以______為準。`

不要使用統一空泛免責。

要寫具體：

- GPA → school
- Mortgage → bank
- Salary → employer/government
- Business days → local holiday calendar

## FAQ

### 兩個網站答案不同就是一個錯嗎？
不一定，可能輸入與rounding規則不同。

### 可以只看公式嗎？
不夠。

### 自動測試能驗證法規嗎？
不能，法規來源需要另外更新與審閱。

## 延伸閱讀

- [公開測試案例](/methodology/public-test-cases/)
- [內容來源與修正](/methodology/content-sourcing-corrections/)
- [成績GPA方法案例](/guides/grades-gpa/)
