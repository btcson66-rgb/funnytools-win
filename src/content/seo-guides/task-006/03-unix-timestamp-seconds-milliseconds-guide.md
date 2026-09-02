---
slug: "/guides/unix-timestamp-seconds-milliseconds-guide/"
seo_title: "Unix Timestamp 是什麼？10位秒、13位毫秒、UTC、時區與2038完整指南｜FunnyTools"
meta_description: "Unix timestamp 是什麼？完整解釋 1970-01-01 UTC epoch、10 位秒、13 位毫秒、JavaScript Date、UTC 與本地時間、2038 問題、負 timestamp 與常見轉換錯誤。"
og_title: "10位還是13位？Unix Timestamp 秒與毫秒一次看懂"
og_description: "Unix time通常以秒計；Web JavaScript Date核心則以毫秒計。少乘或多乘1000，是最常見錯誤。"
canonical: "https://funnytools.win/guides/unix-timestamp-seconds-milliseconds-guide/"
primary_keyword: "Unix Timestamp 是什麼"
card_title: "Unix Timestamp 10位、13位差在哪？"
card_description: "秒與毫秒差1000倍；同一個 instant 顯示成哪個本地時間則取決於時區。"
hero_title: "Unix Timestamp 是什麼？10位秒、13位毫秒、UTC、時區與2038完整指南"
hero_subtitle: "Timestamp 的核心是『同一瞬間』，不是某個地區牆上時鐘的文字；秒與毫秒單位搞錯會直接差數十年。"
---

# Unix Timestamp 是什麼？10位秒、13位毫秒、UTC、時區與2038完整指南

API 回傳：

```text
1787760000
```

或：

```text
1787760000000
```

看起來只差三個 0，但程式若把單位認錯：

> 日期可能直接跑到完全不合理的年代。

> **速答：Unix Timestamp 是什麼？**  
> Unix time 通常定義為從 `1970-01-01 00:00:00 UTC` 起經過的秒數；Web 平台的 JavaScript `Date` 內部時間值則以自同一 epoch 起的毫秒表示。因此現代日期附近常見約 10 位「秒 timestamp」與 13 位「毫秒 timestamp」。秒轉毫秒通常乘 1000；毫秒轉秒通常除以 1000。Timestamp 本身代表 instant，顯示成台北、東京或紐約時間時才會套用時區。

## 一、Epoch 是什麼？

Unix epoch：

```text
1970-01-01 00:00:00 UTC
```

Unix timestamp：

> 從 epoch 到某個時間點經過多少秒。

例如：

```text
0
```

代表 epoch 本身。

## 二、Timestamp 不是「台灣時間」

Unix timestamp 的核心是：

> 一個全球共通 instant。

例如同一 timestamp：

- 台北顯示某個時間；
- 倫敦顯示另一個本地時間；
- 紐約又不同。

但指向同一瞬間。

## 三、10 位數通常是秒

現代年份附近 Unix seconds 常長得像：

```text
17xxxxxxxx
```

約 10 位。

例如：

```text
1787760000
```

通常應先猜：

> seconds。

但不要只靠長度做正式解析。

## 四、13 位數通常是毫秒

JavaScript / browser ecosystem 很常見：

```text
1787760000000
```

約 13 位。

這通常是：

> milliseconds since Unix epoch。

MDN 說明 JavaScript `Date` 的核心 time value 就是以毫秒表示。

## 五、秒與毫秒差1000倍

seconds：

```text
1787760000
```

milliseconds：

```text
1787760000000
```

關係：

```text
milliseconds = seconds × 1000
seconds = milliseconds / 1000
```

## 六、JavaScript 最常見的錯誤

如果 API 回秒：

```js
const seconds = 1787760000;
new Date(seconds);
```

JavaScript 會把它當：

> 毫秒。

所以結果接近 1970 年。

正確概念：

```js
new Date(seconds * 1000);
```

## 七、反過來也會錯

如果 `Date.now()`：

```js
Date.now()
```

回的是毫秒。

你卻把它當 seconds 傳到只收 Unix seconds 的 API：

> 數值會大 1000 倍。

## 八、Timestamp Converter 為什麼要明確寫單位？

好的工具應讓使用者知道：

- input 是 seconds 還是 milliseconds；
- output 是 UTC 還是 local；
- 是否含 timezone offset。

不要讓工具偷偷猜，使用者卻不知道猜法。

FunnyTools 時間戳記轉換器應保持這個透明原則。

## 九、UTC 和本地時間差在哪？

UTC 是協調世界時。

台灣標準時間通常：

> UTC+08:00。

所以同一 instant：

```text
2026-08-27T12:00:00Z
```

在台北顯示：

```text
2026-08-27 20:00:00 +08:00
```

## 十、`Z` 是什麼？

RFC 3339 中：

> `Z` 表示 UTC offset `00:00`。

因此：

```text
2026-08-27T12:00:00Z
```

不是「沒有時區」。

而是明確：

> UTC。

## 十一、負 Timestamp 是什麼？

Epoch 以前的時間可以用負值表示。

例如：

> 1969 年的某個 instant。

不是所有舊系統都完整支援負 timestamp，因此歷史資料要測試。

## 十二、2038 問題是什麼？

傳統有些系統使用：

> signed 32-bit integer

儲存 Unix seconds。

最大值約：

`2,147,483,647`

對應 2038 年 1 月附近。

超過後會 overflow。

現代 64-bit 系統通常能處理更長範圍，但：

> legacy database、protocol、embedded device 仍可能遇到。

## 十三、JavaScript Date 會在2038壞掉嗎？

標準 JavaScript `Date` 本身不是以 32-bit signed seconds 儲存。

MDN 說明它可表示的毫秒時間範圍遠超 2038。

所以：

> 2038 問題不能直接等同「所有 JavaScript Date 都會壞」。

## 十四、Leap Second 怎麼辦？

MDN 對 Unix time 的簡化定義指出：

> Unix time 忽略 leap seconds。

所以不要把 Unix timestamp 當成天文時間尺度的完整表達。

一般網站、API、log 使用通常不需要自己處理 leap-second 細節。

## 十五、Timestamp 和 ISO 8601 哪個比較好？

### Timestamp
適合：
- machine comparison；
- sort；
- storage；
- interval calculation。

### ISO 8601 / RFC 3339
適合：
- human-readable；
- API；
- 清楚帶 offset。

例如：

```text
2026-08-27T20:00:00+08:00
```

比：

```text
1787832000
```

更容易人工理解。

## 十六、API 最好明確標單位

欄位名可以寫：

```text
created_at_seconds
created_at_ms
```

或文件明確定義。

只寫：

```text
timestamp
```

很容易產生 1000 倍錯誤。

## 十七、Log 系統為什麼常同時保留兩種格式？

可以同時保留：

- machine timestamp；
- human-readable ISO string。

方便：
- 排序；
- debug；
- 查時區。

但要避免兩欄彼此來源不一致。

## 十八、常見錯誤

### 錯誤 1
秒直接丟 JavaScript Date。

### 錯誤 2
毫秒送進 seconds API。

### 錯誤 3
把 UTC `Z` 當本地時間。

### 錯誤 4
只看數字長度，不看 API spec。

### 錯誤 5
把 Timestamp 當 timezone。

### 錯誤 6
認為所有系統都有2038問題。

## 十九、快速判斷表

| 數值 | 現代日期附近常見解讀 |
|---|---|
| 10 位 | Unix seconds |
| 13 位 | Unix milliseconds |
| `Date.now()` | milliseconds |
| Unix epoch | 1970-01-01 UTC |
| `Z` | UTC +00:00 |

> 位數只能當 debug 線索，正式仍以 API 文件為準。

## 二十、跨系統傳遞前的檢查

在瀏覽器、伺服器與資料庫之間傳遞 timestamp 時，先寫清楚單位與型別，例如 `integer seconds` 或 `integer milliseconds`，不要只在欄位名稱使用模糊的 `time`。同一個數值若在 JavaScript、Unix shell 與 SQL 之間經過 JSON 或文字格式轉換，還要檢查是否被四捨五入、轉成浮點數，或因 32 位元整數而溢位。

除錯時用一個已知的 UTC instant 做 round-trip：由原始時間產生 timestamp，再轉回 UTC，最後再轉成使用者時區顯示。若只比較畫面上的本地時間，很容易把時區偏移誤判成秒／毫秒錯誤；若只比較位數，也可能漏掉負 timestamp、零值或未來日期的資料契約問題。

## 二十一、FAQ

### Unix timestamp 是秒還是毫秒？
Unix time通常以秒定義；Web JavaScript Date常用毫秒。

### 為什麼我的 timestamp 變 1970？
常見原因是把秒當毫秒。

### Timestamp 有時區嗎？
Timestamp 表示 instant；轉成人類時間時才套用時區。

### 13位要除1000嗎？
若目標 API要 seconds，通常需要；先看規格。

### 2038所有系統都會壞嗎？
不會，主要是32-bit signed seconds相容性問題。

## 二十二、延伸閱讀

- [時間戳記轉換器](/tools/timestamp-converter/)
- [ISO 8601 日期時間指南](/guides/iso-8601-utc-offset-guide/)
- [日期加減 DST 陷阱](/guides/date-arithmetic-end-of-month-dst-guide/)
- [URL 編碼指南](/guides/url-encoding-percent-encoding-guide/)
- [JSON 格式錯誤指南](/guides/json-error-fix-guide/)

## 頁面 CTA

**看到 10 位、13 位數字不知道是哪個時間？**

先確認它是 seconds 還是 milliseconds，再用 FunnyTools 時間戳記轉換器查看 UTC 與本地顯示。

CTA：`開啟時間戳記轉換器`

次要 CTA：`看不懂 Z / +08:00？`

## 圖卡與 ALT

`Unix seconds × 1000 = JavaScript milliseconds`
`Epoch = 1970-01-01T00:00:00Z`

ALT：`Unix timestamp 秒與毫秒比較圖，顯示10位秒乘1000成為13位毫秒`
