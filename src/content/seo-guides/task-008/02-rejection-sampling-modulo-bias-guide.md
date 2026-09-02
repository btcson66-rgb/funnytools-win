---
slug: "/guides/rejection-sampling-modulo-bias-guide/"
seo_title: "Modulo Bias 是什麼？取餘數偏差、Rejection Sampling 與均勻亂數完整指南｜FunnyTools"
meta_description: "為什麼 random % n 可能不均勻？完整解釋 modulo bias、32位亂數空間、rejection sampling、Fisher–Yates與安全索引選取，並用小範例說明如何避免某些結果被多分到一個值。"
og_title: "random % n 為什麼可能有偏差？Modulo Bias 一次看懂"
og_description: "當亂數來源範圍無法被 n 整除時，直接取餘數會讓部分結果多對應一個來源值。"
canonical: "https://funnytools.win/guides/rejection-sampling-modulo-bias-guide/"
primary_keyword: "modulo bias"
card_title: "Modulo Bias 是什麼？"
card_description: "直接 random % n 可能讓某些結果稍微更常出現；拒絕取樣用丟棄尾端值換取均勻映射。"
hero_title: "Modulo Bias 是什麼？取餘數偏差、Rejection Sampling 與均勻亂數完整指南"
hero_subtitle: "安全亂數來源只是第一步；把大範圍亂數映射到0～n−1時，演算法本身也可能偷偷加入偏差。"
---

# Modulo Bias 是什麼？取餘數偏差、Rejection Sampling 與均勻亂數完整指南

很多程式會這樣寫：

```js
index = randomValue % n;
```

看起來很合理。

但如果亂數來源的總可能數：

> 不能被 n 整除

某些餘數就會多分到一個來源值。

這叫：

> **Modulo Bias。**

> **速答：Rejection Sampling 怎麼避免 modulo bias？**  
> 假設原始亂數均勻分布在0到M−1，而你需要0到n−1。先計算最大的可整除區間 `limit = floor(M / n) × n`，若亂數值 ≥ limit 就丟掉重抽；只對0到limit−1取 `% n`。如此每個結果都對應完全相同數量的原始值。FunnyTools目前的Random Number、Password、Wheel、Dice與姓名抽選相關實作會使用Web Crypto搭配拒絕取樣，而不是直接把32位亂數無條件 `% n`。

## 一、用10個值映射到6面骰

假設來源只有：

`0,1,2,3,4,5,6,7,8,9`

想映射到：

`0～5`

直接 `%6`：

- 0 → 0
- 1 → 1
- 2 → 2
- 3 → 3
- 4 → 4
- 5 → 5
- 6 → 0
- 7 → 1
- 8 → 2
- 9 → 3

結果：

- 0：2個來源
- 1：2個
- 2：2個
- 3：2個
- 4：1個
- 5：1個

0～3機率比4～5高。

## 二、為什麼會這樣？

因為：

`10 ÷ 6`

不能整除。

如果來源剛好有12個值：

`0～11`

每個餘數都能對應2次，就沒有這個問題。

## 三、Rejection Sampling 的做法

對10個來源值、6個結果：

最大的6倍數：

`floor(10/6) × 6 = 6`

只接受：

`0～5`

6～9全部丟掉重抽。

這樣0～5各自只有一個來源，完全均勻。

## 四、這不是浪費很多亂數嗎？

在真實的32位空間中，通常浪費比例很小。

FunnyTools使用 `Uint32` 類亂數空間時：

> M = 2^32

對一般小n來說，只會丟掉最尾端不足一整組的值。

換來的是：

> 精確均勻索引。

## 五、密碼字元為什麼也需要？

假設字元池有：

> 73個字元。

32位亂數空間不一定能被73整除。

如果直接：

```text
random32 % 73
```

某些字元會有非常微小的額外機率。

在安全工具中沒有必要接受這個偏差，因此FunnyTools密碼產生器使用rejection sampling。

## 六、抽名字也是一樣

候選名單有37人。

要選0～36其中一個index。

合理做法：
- 安全亂數
- 均勻索引
- 再選名單位置

不能只說：

> 「用了crypto就一定均勻」

映射算法也要正確。

## 七、Fisher–Yates Shuffle 為什麼常一起出現？

Fisher–Yates洗牌會逐步把每個位置和一個隨機位置交換。

若每一步的index是均勻的：

> 每種排列理論上具有相同機率。

如果隨機index本身偏掉：

> 洗牌也會偏。

所以：
- CSPRNG
- rejection sampling
- Fisher–Yates

是可以互補的不同層。

## 八、`array.sort(() => Math.random() - 0.5)` 呢？

這是常見一行式洗牌。

問題包括：
- sort comparator不是為隨機排序設計
- 不同排序實作可能有不同偏差
- Math.random也不是安全亂數來源

一般需要公平洗牌時：

> Fisher–Yates更合理。

## 九、偏差很小是不是就沒差？

要看情境。

對：
- 畫面小動畫
- 隨機背景色

微小偏差可能沒實務意義。

對：
- 密碼
- token
- 正式機率實驗
- 大量重複抽選

沒有理由自己引入已知偏差。

## 十、Modulo Bias和短期不平均不同

Modulo bias：

> 演算法本身讓理論機率不相等。

短期不平均：

> 即使理論機率完全相等，小樣本也會自然波動。

兩者不能混為一談。

## 十一、怎麼驗證程式？

除了讀code，可用大量模擬做sanity check：

例如100萬次，觀察每個結果頻率。

但：

> 頻率看起來平均，不能證明沒有微小bias。

真正還是要檢查映射演算法。

## 十二、Rejection Sampling有沒有風險？

若n設定不合理或程式計算錯誤，可能：
- 無限重抽
- overflow
- 效能問題

因此實作應限制輸入範圍並測邊界。

## 十三、FunnyTools現行做法

目前西文技術頁已公開說明：

- Random Number：Web Crypto + rejection sampling
- Password：Web Crypto + rejection sampling
- Wheel：先均勻選segment，再動畫
- Dice：均勻選face
- Name Picker：安全shuffle

Task008的SEO文章就是把這些技術原理變成可搜尋、可理解的知識頁。

## 十四、常見錯誤

### 錯誤1
用了crypto就直接 `% n`。
亂數來源安全，不代表映射無bias。

### 錯誤2
把短期連續結果當modulo bias。
不是同一件事。

### 錯誤3
用sort + random當公平洗牌。
不建議。

### 錯誤4
拿頻率圖當cryptographic proof。
不夠。

## 十五、簡化公式

來源空間：

`0 ... M-1`

目標：

`0 ... n-1`

接受上限：

`limit = floor(M/n) × n`

若：

`x < limit`

則：

`x mod n`

否則：

> 重抽。

## 十六、FAQ

### `random % n`一定有bias嗎？
當來源可能數可以被n整除時沒有；不能整除時會有。

### 32位亂數bias會很大嗎？
很多n下非常小，但安全實作通常仍會避免。

### Fisher–Yates會自動避免bias嗎？
前提是每一步抽到的index本身均勻。

### Math.random加rejection sampling就安全嗎？
只能解決映射偏差，不能把非密碼學亂數變成CSPRNG。

### FunnyTools為什麼不用簡單取餘數？
因為現行工具可以用拒絕取樣取得更乾淨的均勻分布。

## 十七、延伸閱讀

- [亂數真的隨機嗎](/guides/secure-random-vs-math-random-guide/)
- [隨機數字產生器](/tools/random-number-picker/)
- [公平抽籤指南](/guides/fair-random-draw-audit-guide/)
- [抽後放回 vs 不放回](/guides/random-sampling-with-without-replacement/)
- [密碼產生器](/tools/password-generator/)

## 頁面 CTA

**需要在0到n−1之間公平選一個index？**

不要只看亂數來源，還要確認映射方法是否避免modulo bias。

CTA：`開啟隨機數字產生器`

次要 CTA：`公平抽籤還要檢查什麼？`

## 圖卡與 ALT

`10 source values → 6 outputs`
`Direct modulo: 2,2,2,2,1,1`
`Reject tail → 1,1,1,1,1,1`

ALT：`Modulo bias與拒絕取樣示意圖，顯示直接取餘數造成不均，丟棄尾端值後每個結果對應相同來源數`
