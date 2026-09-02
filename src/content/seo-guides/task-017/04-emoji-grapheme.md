---
slug: "/guides/emoji-character-count-grapheme-guide/"
seo_title: "Emoji 為什麼算2個以上字元？Unicode、UTF-16 與 Grapheme Cluster｜FunnyTools"
meta_description: "一個emoji看起來只有1個，程式卻可能算2、4甚至更多。完整解釋 Unicode code point、UTF-16 code unit、ZWJ、grapheme cluster與使用者感知字元。"
canonical: "https://funnytools.win/guides/emoji-character-count-grapheme-guide/"
primary_keyword: "emoji 字元 計算 Unicode"
hero_title: "Emoji 為什麼看起來1個，程式卻可能算2個以上？"
hero_subtitle: "「字元」在 Unicode 世界至少有三種常見意思：code unit、code point、grapheme cluster。Emoji 正好把差異全部放大。"
---

# Emoji 為什麼看起來1個，程式卻可能算2個以上？

例如：

`🦊`

對人來說：
> 一個狐狸 emoji。

但 JavaScript：

```js
"🦊".length
```

得到的不是使用者直覺中的「1」。

原因是 JavaScript String 的 length 計算：

> UTF-16 code units。

## 第一層：Code Unit

JavaScript 內部使用 UTF-16。

BMP 之外的 code point 需要 surrogate pair：

> 兩個 UTF-16 code units。

所以某些 emoji：

> 看起來1個，`.length` 卻是2。

## 第二層：Code Point

如果你用：

```js
[..."🦊"].length
```

會比較接近 Unicode code points。

但這仍然不一定等於：

> 人類看起來的字元。

## 第三層：Grapheme Cluster

Unicode 使用：

> grapheme cluster

來近似「使用者感知的一個字元」。

例如某些：
- family emoji
- skin tone emoji
- flags
- combining accent

可能由多個 code points 組成，但使用者仍看成一個。

Unicode UAX #29 明確指出：

> 使用者感知字元不一定只是一個 code point。

## Family Emoji 為什麼特別長？

有些 family emoji 是多個人物 emoji 加：

> Zero Width Joiner（ZWJ）

連起來。

畫面：
> 一個家庭圖示。

底層：
> 多個 Unicode 元件。

因此 character counter 到底顯示什麼，取決於它計的是：

- UTF-16 code units
- code points
- grapheme clusters

## 瀏覽器有 Intl.Segmenter

現代 JavaScript 可使用：

```js
new Intl.Segmenter(locale, {
  granularity: "grapheme"
})
```

依 grapheme cluster 分段。

這比 `.length` 更接近：

> 使用者認為幾個字元。

但舊瀏覽器支援度與平台自身算法仍可能不同。

## FunnyTools Character Counter 要怎麼看？

目前工具公開提醒：

> 許多 emoji 可能顯示為2個以上字元，UTF-8 bytes也通常高於英文字母。

因此它適合：

> 預先發現「emoji 可能讓平台限制和直覺不同」。

但若某平台規則寫：

> Unicode scalar values  
> graphemes  
> UTF-16 units

就必須依平台規格。

## Flags

旗幟 emoji 也很經典。

畫面：
> 🇯🇵

你看成：
> 一面旗。

底層可能由區域指示符 code points 組成。

所以：
> 「看起來一個圖示」不能直接推導程式 count。

## Combining Accent

某些文字：

`é`

可能：
- 單一 precomposed code point

也可能：
- `e`
- combining acute accent

畫面相同。

底層 representation 不一定相同。

Unicode normalization 就是另一層需要注意的問題。

## 什麼時候需要 Grapheme Count？

比較適合：
- UI 顯示限制
- 編輯器游標
- backspace
- 使用者可見長度
- 暱稱限制

但 API／database 若限制 bytes：

> Grapheme count 完全不夠。

## 一張表搞懂

| 觀念 | 問題 |
|---|---|
| UTF-16 code unit | JavaScript `.length` 常看到什麼 |
| Code point | Unicode 編碼點有幾個 |
| Grapheme cluster | 使用者看起來幾個字元 |
| UTF-8 byte | 傳輸／儲存需要多少 bytes |

## 建議

當需求文件只寫：

> maximum 20 characters

但允許 emoji：

> 請要求工程團隊定義「character」到底是哪一種。

這比事後處理 bug 更有效。

## 相關工具／指南

## 以使用者感知測試介面

介面顯示「還剩幾個字」時，應先定義這個數字服務誰。若是使用者輸入限制，半個家庭 emoji 或被拆開的變音符號都不應被接受；若是後端欄位限制，則要另做 bytes 和 code unit 檢查。測試人員可在游標前後刪除一個 grapheme，觀察是否整組消失，再檢查複製、貼上、退格鍵和表單送出。這些操作比只在程式 console 印出 length 更接近真實使用，也能發現視覺內容和儲存內容不一致的問題。

## 產品限制應該選哪種單位

若限制面向使用者，例如顯示名稱、貼文標題或留言欄，通常應先討論 grapheme cluster，也就是使用者感覺的一個字。這能避免家庭 emoji、膚色修飾、旗幟和 ZWJ 組合被拆開後只剩半個圖案。若限制面向資料庫或傳輸，則還要另外檢查 code point、UTF-16 code unit、UTF-8 bytes 與欄位大小，因為這些是工程實作單位，不等於畫面上的字數。

測試時不要只放一個笑臉。至少加入單一 BMP 字元、需要 surrogate pair 的 emoji、帶膚色的 emoji、旗幟、家庭或職業 ZWJ 序列，以及文字加變音符號。逐一記錄 JavaScript length、Array.from 長度、使用者感知數量與實際 bytes。規格若沒有說明 character 的定義，就應先補上定義和測試案例，再承諾上限。

- [字元計數器](/tools/character-counter/)
- [UTF-8 bytes vs 字元](/guides/utf8-bytes-vs-characters-guide/)
- [隱藏 Unicode 空白](/guides/invisible-spaces-nbsp-zero-width-guide/)

## 截斷文字時要避免半個 emoji

顯示預覽或限制輸入長度時，不能只用字串索引切到指定位置，因為索引可能落在 surrogate pair、組合符號或 ZWJ 序列中。較安全的做法是先以 grapheme cluster 分段，再以完整片段累加到上限；若環境不支援 Intl.Segmenter，應選擇明確的 fallback，並把限制標示成估算值，而不是假裝每個畫面字元都能用 length 表示。

驗收時要測試剛好等於上限、超過一個 cluster、連續多個組合 emoji、游標刪除以及貼上超長內容。除了畫面，也要檢查送出的 JSON、資料庫欄位和錯誤訊息，確保前端截斷後沒有留下孤立的 variation selector 或不可見連接符。使用者看到的是完整圖形，工程端則應記錄採用的計數單位，兩者都要能被重現。

## 常見介面案例

留言欄、顯示名稱和社群貼文通常應以使用者感知的 grapheme 作為主要提示，並在送出前完整拒絕超限輸入；資料庫或 API 若另有限制，則應把 bytes 或 code units 的錯誤清楚分開。搜尋框若只限制畫面寬度，也不一定需要截斷文字，可以改用 CSS 省略並保留完整值，避免把顯示需求誤套成資料截斷需求。

對旗幟、膚色、家庭和職業 emoji，要驗證複製貼上後仍是同一個 cluster，並測試不同瀏覽器對 Intl.Segmenter 的支援差異。若 fallback 與主流程結果不同，應在規格中寫明取捨並加入回歸案例。這些案例能讓產品、設計和工程團隊使用同一套語言討論「一個字」，而不是各自引用不同的 length 數字。
