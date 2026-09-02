---
slug: "/guides/uuid-v4-vs-v7-guide/"
seo_title: "UUID v4 vs v7 差在哪？隨機ID、時間排序、資料庫索引與RFC 9562完整指南｜FunnyTools"
meta_description: "UUID v4和v7怎麼選？完整比較v4的122位隨機、v7的48位Unix毫秒時間戳、排序性、資料庫索引locality、隱私時間資訊與用途。FunnyTools目前只產生v4。"
og_title: "UUID v4 vs v7：一個純隨機，一個帶時間排序"
og_description: "v4適合簡單隨機識別；v7把Unix毫秒時間放進高位，改善按建立時間排序與索引locality，但也會暴露大致生成時間。"
canonical: "https://funnytools.win/guides/uuid-v4-vs-v7-guide/"
primary_keyword: "UUID v4 vs v7"
card_title: "UUID v4 vs v7 差在哪？"
card_description: "v4強調隨機；v7加入毫秒時間，換來可排序性與更好的資料庫寫入locality。"
hero_title: "UUID v4 vs v7 差在哪？隨機ID、時間排序、資料庫索引與RFC 9562完整指南"
hero_subtitle: "RFC 9562不只重新整理UUID規範，也正式定義v7；但『比較新』不代表每個系統都應立刻從v4改成v7。"
---

# UUID v4 vs v7 差在哪？隨機ID、時間排序、資料庫索引與RFC 9562完整指南

很多開發者熟悉：

> UUID v4。

現在又常看到：

> UUID v7。

最明顯差異：

- v4主要靠隨機
- v7在前面放時間資訊

> **速答：UUID v4和v7怎麼選？**  
> RFC 9562中的UUID v4使用122個隨機bits，生成簡單、分散式且沒有內建時間順序；UUID v7則把48位Unix Epoch毫秒時間戳放在高位，再搭配隨機／單調性資料，因此文字按UUID位元順序比較時大致也依生成時間排序，常能改善資料庫索引locality。若你只需要成熟、廣泛支援的隨機identifier，v4仍很合理；若新系統大量依建立時間插入與排序，可評估v7。FunnyTools目前的UUID產生器只產生v4，不應在Task008中假裝站內已支援v7。

## 一、UUID v4長什麼樣？

例如：

```text
36b8f84d-df4e-4d49-b662-bcde71a8764f
```

第三組開頭：

> `4`

表示version 4。

核心：
> random UUID。

## 二、UUID v7的核心

RFC 9562定義v7：

前48 bits：

> Unix Epoch timestamp in milliseconds。

後面包含：
- version
- variant
- random / monotonicity data

所以v7會把：

> 建立時間的順序資訊

放進ID。

## 三、v7和Timestamp一樣嗎？

不是。

v7只是：

> 內含毫秒timestamp成分的UUID。

它仍然是128-bit UUID格式。

不能只拿前幾位當完整時間處理而不按RFC layout。

## 四、v4的優點

- 簡單
- 成熟
- 到處支援
- 不需要協調central counter
- 不直接暴露生成時間
- `crypto.randomUUID()`瀏覽器原生可用

## 五、v4的資料庫缺點

若把隨機v4作為B-tree clustered key：

> 新資料會插到index的不同位置。

可能造成：
- page split
- cache locality差
- index fragmentation

實際影響依：
- DB engine
- workload
- storage
- index design

不同。

## 六、v7為什麼有較好locality？

因為高位時間大致隨時間增加。

新生成的UUID：

> 通常更靠近近期值。

對依ID排序／索引的資料庫可能更友善。

## 七、v7就是嚴格連續嗎？

不是。

同一毫秒內：
- 多個UUID
- random bits
- monotonic strategy

會影響順序。

RFC 9562提供單調性實作建議，但不能把v7當：

> 簡單自增integer。

## 八、v7會暴露建立時間嗎？

會暴露：

> 毫秒級Unix timestamp資訊。

因此若你不希望外部看到「大約何時產生」：

> v4可能比較適合。

這是隱私／資訊揭露的trade-off。

## 九、v4碰撞更容易嗎？

v4有122個random bits，碰撞已極低。

v7也保留大量隨機空間，但其結構不同。

選v7主要不是因為：

> v4會常碰撞。

而是：
- ordering
- database locality
- time semantics

## 十、v7可以當CreatedAt嗎？

它包含時間資訊，但正式資料模型仍建議保留：

> explicit `created_at`

原因：
- query語意清楚
- timezone/display
- migration
- external imports
- record time和ID creation time可能不同

不要把所有業務時間都藏在ID。

## 十一、v4能按建立時間排序嗎？

不能只看UUID本身可靠排序。

如果需要：

> 按建立時間

應有：
- created_at column
- 或選擇具時間順序的ID方案。

## 十二、既有v4系統要不要遷移？

沒有必要因為v7新就全部改。

要問：

- v4真的造成index問題嗎？
- ORM支援v7嗎？
- database type支援嗎？
- API consumer驗證版本嗎？
- mobile/client library支援嗎？
- migration成本多少？

沒有實際問題：

> v4可以繼續使用。

## 十三、FunnyTools目前為什麼仍只做v4？

現行工具使用：

`crypto.randomUUID()`

瀏覽器原生直接提供v4。

這讓：
- 生成簡單
- 安全亂數
- 相容性好

Task008可以教育v7，但Codex不得偷加v7按鈕，除非另立開發任務並完整測試。

## 十四、UUID v1呢？

v1是較早的time-based UUID設計，歷史上包含時間與node-related資訊。

RFC 9562現在推薦新time-ordered用途評估v6/v7等較新版本。

本頁不深入所有版本，避免偏離v4 vs v7搜尋意圖。

## 十五、UUID v7是否每個DB都原生支援？

不一定。

即使DB有UUID型別：

> 也不代表有v7 generator。

可能需要：
- application library
- extension
- database version

正式採用前檢查環境。

## 十六、快速比較

| 特性 | UUID v4 | UUID v7 |
|---|---|---|
| 核心 | 隨機 | 時間 + 隨機 |
| RFC | 9562 | 9562 |
| 時間排序 | 否 | 大致可 |
| 暴露生成時間 | 否 | 是 |
| Browser `randomUUID()` | ✅ | ❌不是v7 |
| DB locality | 較隨機 | 通常較好 |
| FunnyTools現行生成 | ✅ | ❌ |

## 十七、選擇建議

### 選v4
如果：
- 一般identifier
- browser client生成
- 現有系統已穩定
- 不需要ID帶時間順序

### 評估v7
如果：
- 新系統
- 高寫入資料庫
- 常按ID近似時間排序
- library與DB都支援
- 可接受ID暴露生成時間

## 十八、常見錯誤

### 錯誤1
v7比較新，所以所有系統都一定更好。

### 錯誤2
v4碰撞很高所以必須換v7。
不是主要原因。

### 錯誤3
v7就是自增ID。
不是。

### 錯誤4
有v7就不用created_at。
不建議。

### 錯誤5
`crypto.randomUUID()`會產v7。
目前它是v4。

## 十九、FAQ

### UUID v7是什麼？
RFC 9562定義、以Unix毫秒timestamp為高位的time-ordered UUID。

### v7一定比v4快嗎？
不能這樣保證，效能取決於資料庫與工作負載。

### v4還可以用嗎？
可以，而且仍非常普遍。

### FunnyTools能產v7嗎？
目前不能，只產v4。

### v7可以拿來當token嗎？
UUID版本選擇仍不等於secret/token設計。

## 二十、延伸閱讀

- [UUID v4產生器](/tools/uuid-generator/)
- [UUID v4碰撞機率](/guides/uuid-v4-collision-probability-guide/)
- [Unix Timestamp指南](/guides/unix-timestamp-seconds-milliseconds-guide/)
- [亂數真的隨機嗎](/guides/secure-random-vs-math-random-guide/)
- [開發者工具](/for/developers/)

## 頁面 CTA

**只需要標準隨機UUID？**

FunnyTools目前直接使用瀏覽器 `crypto.randomUUID()` 產生v4；如果你的架構正在評估v7，先從資料庫寫入與排序需求出發，不要只因版本號較新就遷移。

CTA：`開啟UUID v4產生器`

次要 CTA：`先理解v4碰撞機率`

## 圖卡與 ALT

`v4 = random-first`
`v7 = timestamp-first + random`

ALT：`UUID v4與v7比較圖，v4主要由隨機資料組成，v7以前48位Unix毫秒時間提供近似時間排序`
