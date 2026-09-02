---
slug: "/methodology/randomness-security/"
seo_title: "隨機工具怎麼驗證？CSPRNG、Modulo Bias、不重複抽樣與公平性測試｜FunnyTools"
meta_description: "FunnyTools亂數與抽籤工具如何驗證？區分Web Crypto亂數來源、rejection sampling、Fisher–Yates、with/without replacement、範圍不變條件與短期頻率波動。"
canonical: "https://funnytools.win/methodology/randomness-security/"
primary_keyword: "隨機 工具 驗證"
card_title: "亂數工具怎麼驗證？"
card_description: "不能用『每100次剛好平均』當測試；要檢查亂數來源、均勻映射、範圍與抽樣規則。"
hero_title: "隨機工具怎麼驗證？CSPRNG、Modulo Bias、不重複抽樣與公平性測試"
hero_subtitle: "隨機結果最常被誤測：真正公平的工具反而不會保證短短幾次就看起來平均。"
---

# 隨機工具怎麼驗證？CSPRNG、Modulo Bias、不重複抽樣與公平性測試

「六面骰擲60次，每面一定10次。」

這不是：

> 隨機性測試。

這是要求：

> 配額。

## 一、先驗證亂數來源

Task 008已要求：

> code audit Web Crypto。

Task 011要把它變成：

> regression requirement。

核心工具改版時，測試應防止：

> 不小心又退回 `Math.random()`。

## 二、來源和映射是兩層

即使用：

`crypto.getRandomValues`

如果：

`random % n`

映射不均：

> 仍可能有modulo bias。

所以code review應確認：
- rejection sampling
- 或其他無偏映射

## 三、Range Invariant

Random Number：

min=10
max=20

所有輸出必須：

`10 ≤ x ≤20`

這是deterministic property。

比「分布看起來漂亮」更適合單元測試。

## 四、No-Duplicate Invariant

設定：
- range1–10
- quantity10
- duplicates off

結果：
> 10個不同數。

如果quantity=11：

> 工具應拒絕或清楚提示。

不能無限loop。

## 五、Name Picker

single multi-pick without replacement：

> 同一entry position不能在同次結果重複。

但如果名單文字本身：

`Amy`
`Amy`

它們是兩個entry。

測試要區分：

> position identity vs display text。

## 六、Wheel

每一非空白行：
> 一個segment。

測試：
- empty lines ignored（若repo如此）
- duplicate lines preserved
- selected index在range內
- animation final segment與selected index一致

動畫不是randomness proof。

## 七、Dice

d6：

> 每一顆必須1–6。

20顆：

> exactly20 results。

Total：

> sum individual faces。

這些是確定可驗證的property。

## 八、頻率測試可以做什麼？

例如100,000次d6：

可以做：
> sanity check。

如果1永遠不出現：
> 明顯bug。

但若：
- 1=16.5%
- 2=16.9%

不能因沒剛好16.666%就fail。

## 九、統計檢定也不是安全證明

即使：
- chi-square pass
- frequency pass

也不代表：

> cryptographically unpredictable。

CSPRNG安全性需要：
- 已知API／演算法設計
- code audit
- platform guarantees

## 十、Fair Draw 不只演算法

候選名單：

> 是不是正確？

規則：

> 是否事前固定？

是否抽後移除？

這些都可能讓：

> 演算法公平，但活動不公平。

所以工具方法頁應避免：

> certified fair

這種語言。

## 十一、Password Generator

測試：
- length exactly N
- enabled char sets represented（若產品設計保證）
- excluded chars真的不出現
- all chars come frompool
- crypto source code path

不要測：
> 生成密碼永遠不碰撞。

理論上不可能保證。

## 十二、UUID

測：
- version nibble 4
- variant
- format
- count
- case/no-hyphen option

不要用：
> 1000個不重複

作為唯一安全證明。

## 十三、FAQ

### 頻率不平均是不是bug？
短期通常不是。

### Web Crypto就保證抽獎官方公平？
不保證流程、公證與名單。

### Fisher–Yates一定公平？
前提是random index均勻。

### UUID測試要檢查什麼？
格式、version、variant與產生路徑。

## 延伸閱讀

- [安全亂數 vs Math.random](/guides/secure-random-vs-math-random-guide/)
- [Modulo Bias](/guides/rejection-sampling-modulo-bias-guide/)
- [公平抽籤](/guides/fair-random-draw-audit-guide/)
- [公開測試案例](/methodology/public-test-cases/)
