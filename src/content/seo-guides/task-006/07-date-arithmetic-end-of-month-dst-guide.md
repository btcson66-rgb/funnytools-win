---
slug: "/guides/date-arithmetic-end-of-month-dst-guide/"
seo_title: "日期加減為什麼會算錯？1月31日+1個月、閏年、月底與DST陷阱｜FunnyTools"
meta_description: "日期加減常見陷阱完整整理：1/31加1個月為何可能跑到3月、2/29加一年怎麼定義、DST跨日為何不是24小時、日期與時間點應使用不同計算方式。"
og_title: "1月31日加1個月不是永遠2月28日：日期運算最容易踩的坑"
og_description: "月份不是固定天數，DST也會讓本地日跨越23或25小時；日期 arithmetic 必須先定義規則。"
canonical: "https://funnytools.win/guides/date-arithmetic-end-of-month-dst-guide/"
primary_keyword: "日期加減"
card_title: "日期加減為什麼會算錯？"
card_description: "月底、閏年、月份長度與夏令時間，會讓『加一個月』『加一天』不是單純加固定毫秒。"
hero_title: "日期加減為什麼會算錯？1月31日+1個月、閏年、月底與DST陷阱"
hero_subtitle: "Calendar arithmetic 和 duration arithmetic 是兩件事；『一個月後』不是固定30天，『明天同一時間』也不一定永遠是24小時後。"
---

# 日期加減為什麼會算錯？1月31日+1個月、閏年、月底與DST陷阱

你寫：

> 1 月 31 日 + 1 個月

直覺可能期待：

> 2 月最後一天。

但某些程式庫或 JavaScript Date 操作可能得到：

> 3 月 2 日、3 月 3 日或其他結果。

原因不是數學壞掉，而是：

> **「加一個月」需要先定義月底 overflow 規則。**

> **速答：日期加減為什麼常出錯？**  
> Calendar unit 不是固定長度：月份有28、29、30、31天，年份有365或366天；有 DST 的地區，本地「同一時間的下一天」也可能只隔23或25小時。JavaScript `Date.setMonth()` 會在日期超出目標月份時 overflow，例如 MDN 示範 2016-01-31 設為2月可能落到3月2日。若你真正想要的是「下個月最後一天」或「帳單每月月底」，要自己定義 end-of-month policy，而不是把月份當30天或直接依賴 overflow。

## 一、先分清楚兩種運算

### Duration arithmetic
加固定經過時間：

- +24 hours
- +3600 seconds
- +86,400,000 ms

### Calendar arithmetic
加日曆單位：

- +1 day
- +1 month
- +1 year

兩者不永遠相同。

## 二、為什麼一個月不是30天？

月份有：

- 28；
- 29；
- 30；
- 31天。

所以：

> +30 days

和：

> +1 calendar month

不是同一件事。

## 三、1月31日 + 1個月的問題

如果目標是2月：

> 2月沒有31日。

系統必須決定：

### Policy A：Clamp
落在2月最後一天。

### Policy B：Overflow
超出的日數往3月推。

### Policy C：Reject
要求使用者選規則。

沒有唯一宇宙正解。

## 四、JavaScript setMonth 的行為

MDN 特別提醒：

如果日期為：

`2016-01-31`

再把 month 設為 February：

> 結果可能是 2016-03-02。

因為2016-02只有29天，剩餘天數 overflow 到3月。

所以不要以為：

```js
date.setMonth(date.getMonth() + 1)
```

一定等於「下個月同日或月底」。

## 五、帳單「每月最後一天」應怎麼做？

如果業務規則是：

> 每月最後一天。

就應明確建構：

- 1月31；
- 2月28/29；
- 3月31；
- 4月30。

不要用：

> 上一個日期 + 1 month

假設自然會得到月底。

## 六、2月29日 + 1年怎麼辦？

2024-02-29 + 1 year：

2025沒有2/29。

可能規則：

- 2/28；
- 3/1；
- invalid；
- 依制度特殊規則。

生日、保固、合約、訂閱可能各自不同。

因此：

> 先看 domain rule。

## 七、Leap Year 規則

Gregorian calendar：

- divisible by 4 → leap；
- divisible by 100 → 通常不是；
- divisible by 400 → 還是 leap。

所以：
- 2000 leap；
- 2100 non-leap。

## 八、「明天同一時間」和「24小時後」一樣嗎？

在沒有 DST 的台灣通常看起來一樣。

但在 DST 地區：

### Spring forward
某天少一小時。

「明天 09:00」可能只經過：

> 23小時。

### Fall back
可能經過：

> 25小時。

## 九、MDN 對 setDate / setMonth 的提醒

MDN 明確指出：

`setDate()` / `setMonth()` 依 local time 運算，若跨 DST boundary：

> timestamp difference 可能比名義天數多或少1小時。

因此要分：

- calendar same-local-time；
- exact elapsed hours。

## 十、要加固定24小時怎麼做？

如果真正需求是：

> 精確 elapsed 24 hours。

可以用 UTC / timestamp duration。

例如概念上：

```text
timestamp + 24h
```

而不是：

> local calendar +1 day

但仍要按程式庫正確實作。

## 十一、要「明天早上9點」呢？

這是：

> local calendar time。

就應保留：
- local date；
- 09:00；
- time zone。

不要只加24小時。

## 十二、DST不存在的時間怎麼辦？

例如某些地區 spring-forward：

> 02:30 根本不存在。

程式庫可能：
- 向前調；
- reject；
- 選特定 disambiguation。

正式排程系統要定義策略。

## 十三、DST重複的時間呢？

Fall-back 時某個：

> 01:30

可能出現兩次。

只寫 local clock：

`2026-11-xx 01:30`

可能不夠。

需要：
- offset；
- time zone；
- 或 instant。

## 十四、Date-only 不要無必要變 timestamp

例如截止日期：

`2026-08-31`

如果只是「8月31日這一天」：

> 保持 calendar date。

轉成 midnight UTC 後在 UTC-07 顯示可能變：

> 8月30日下午。

這是著名 off-by-one day 來源。

## 十五、月差也要先定義「完整月」

例如：

`2026-01-31 → 2026-02-28`

到底是：
- 28天；
- 1個calendar month；
- 未滿一個完整月？

不同產品定義可能不同。

房租、年齡、訂閱、薪資都可能有自己的規則。

## 十六、FunnyTools 日期差適合做什麼？

適合：

- 兩個 calendar dates 的日常差距；
- 天數；
- 週數；
- 月份近似／分解；
- 一般規劃。

不應把它當：
- 法律期限引擎；
- 複雜 recurrence engine；
- timezone scheduling engine。

## 十七、程式開發者的檢查清單

在寫日期功能前問：

1. 這是 date 還是 instant？
2. 要 calendar arithmetic 還是 duration？
3. 是否跨 time zone？
4. 是否要 preserve local clock time？
5. end-of-month 怎麼定義？
6. leap day 怎麼處理？
7. DST ambiguous/nonexistent time 怎麼處理？

## 十八、常見錯誤

### 錯誤 1
把1個月當30天。

### 錯誤 2
1/31 +1 month沒有定義月底政策。

### 錯誤 3
2/29 +1 year直接猜。

### 錯誤 4
local +1 day當固定24h。

### 錯誤 5
date-only全部轉UTC midnight。

### 錯誤 6
只存offset，不存time zone做長期排程。

## 十九、快速表

| 問題 | 應先想 |
|---|---|
| 24小時後 | duration |
| 明天同一時間 | calendar + time zone |
| 下個月最後一天 | end-of-month policy |
| 生日明年 | leap-day rule |
| 全球事件時間 | instant / UTC |
| 純截止日 | date-only |

## 二十、FAQ

### 1/31加1個月一定是2/28嗎？
不一定，取決於程式庫與業務規則。

### 為什麼 JavaScript 跑到3月？
setMonth可能對超出目標月份的日期做overflow。

### 加1天等於加24小時嗎？
跨DST時不一定。

### 台灣沒有DST還需要管嗎？
只做台灣local工具可較簡單，但跨國API仍需要。

### 日期差工具可以算所有法律期限嗎？
不能。

## 二十一、延伸閱讀

- [日期差計算器](/tools/date-difference/)
- [ISO 8601 時區指南](/guides/iso-8601-utc-offset-guide/)
- [Unix Timestamp指南](/guides/unix-timestamp-seconds-milliseconds-guide/)
- [工作日指南](/guides/business-days-calendar-days-guide/)
- [工作截止日規劃](/guides/work-deadline-business-day-planning/)

## 頁面 CTA

**只是要算兩個純日期相差多少？**

用日期差計算器；如果你正在寫「每月31日」「跨時區排程」，先定義規則再寫程式。

CTA：`開啟日期差計算器`

次要 CTA：`開發者時間格式看不懂？`

## 圖卡與 ALT

`Calendar +1 month ≠ +30 days`
`Local +1 day ≠ always +24 hours`

ALT：`日期加減陷阱圖，顯示一個月不是固定30天且跨夏令時間時一天不一定等於24小時`

## 使用前再確認

跨月或跨時區的結果，請把起訖日期、時區與是否包含首日逐項記下；保存這些條件，日後才能重現同一答案。
