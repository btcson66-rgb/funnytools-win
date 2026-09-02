---
slug: "/guides/json-error-fix-guide/"
seo_title: "JSON 格式錯誤怎麼修？Unexpected token、逗號、引號與常見錯誤完整指南｜FunnyTools"
meta_description: "JSON 格式錯誤怎麼修？完整整理 Unexpected token、trailing comma、單引號、undefined、NaN、未跳脫換行、重複 key 與大型數字精度問題，並教你如何驗證而不亂改資料。"
og_title: "JSON 格式錯誤怎麼修？從 Unexpected token 到重複 Key"
og_description: "先分清楚語法錯誤、資料型別與資料語意，再用 JSON Formatter 找位置，不要讓自動修正猜錯你的資料。"
canonical: "https://funnytools.win/guides/json-error-fix-guide/"
primary_keyword: "JSON 格式錯誤"
card_title: "JSON 格式錯誤怎麼修？"
card_description: "從逗號、雙引號、undefined 到大型數字，依錯誤位置逐步排查。"
hero_title: "JSON 格式錯誤怎麼修？Unexpected token、逗號、引號與常見錯誤完整指南"
hero_subtitle: "JSON Formatter 可以幫你驗證語法，但真正重要的是知道錯在哪裡，以及哪些看起來像 JavaScript 的寫法其實不是合法 JSON。"
---

# JSON 格式錯誤怎麼修？Unexpected token、逗號、引號與常見錯誤完整指南

JSON 看起來很簡單，但從 API、設定檔、後台或 AI 回覆複製資料時，最常遇到的就是 `Unexpected token`、`Unexpected end of JSON input`、`Expected property name` 或 `JSON.parse error`。很多人看到錯誤後就開始亂刪逗號、換引號，最後雖然 parse 成功，資料卻被改壞。

> **速答：JSON 格式錯誤怎麼修？** 先保留原始資料，再用 JSON Formatter／Validator 找 parser 第一個報錯位置。優先檢查：key 是否有雙引號、最後一個欄位是否多逗號、字串中的雙引號與反斜線是否跳脫、是否出現 `undefined`／`NaN`／函式／註解，以及 `{}`、`[]` 是否成對。JSON 有效只代表語法可解析，不代表欄位、型別與資料內容一定正確。

## 一、JSON 不是 JavaScript 物件字面值

下面這段在 JavaScript 裡可能成立：

```js
{
  name: 'Amy',
  score: undefined
}
```

但它不是合法 JSON。標準 JSON 的 key 與 string 都使用雙引號，value 可為 object、array、number、string、`true`、`false`、`null`。

合法寫法：

```json
{
  "name": "Amy",
  "score": null
}
```

## 二、最常見錯誤：Key 沒有雙引號

錯誤：

```json
{name: "Amy"}
```

正確：

```json
{"name": "Amy"}
```

## 三、最常見錯誤：單引號

錯誤：

```json
{"name": 'Amy'}
```

正確：

```json
{"name": "Amy"}
```

標準 JSON 字串不能用單引號。

## 四、Trailing comma：最後多一個逗號

錯誤：

```json
{
  "name": "Amy",
  "score": 90,
}
```

以及：

```json
[1,2,3,]
```

最後一個 member 或 array item 後不能留逗號。

## 五、字串裡的雙引號沒有跳脫

錯誤：

```json
{"message":"He said "hello""}
```

正確：

```json
{"message":"He said \"hello\""}
```

## 六、Windows 路徑的反斜線

錯誤概念：

```json
{"path":"C:\new\test"}
```

如果你真正需要的是反斜線字元，應正確 escape：

```json
{"path":"C:\\new\\test"}
```

否則 `\n` 可能被當作換行 escape。

## 七、字串中直接換行

錯誤：

```json
{"text":"第一行
第二行"}
```

應寫：

```json
{"text":"第一行\n第二行"}
```

## 八、`undefined`、`NaN`、`Infinity` 都不是合法 JSON

JSON 沒有：

- `undefined`
- `NaN`
- `Infinity`
- function
- comment

如果資料真的「沒有值」，可能用 `null`，但不要機械式把所有 undefined 都改 null；對 API 而言「欄位不存在」和「欄位存在但為 null」可能是不同意思。

## 九、布林值與 null 必須小寫

合法：

```json
true
false
null
```

不合法：

```text
True
FALSE
NULL
None
```

## 十、括號少一個，常造成 Unexpected end

Nested JSON 最容易漏 `}` 或 `]`。格式化縮排後，括號層級會更清楚。遇到 `Unexpected end of JSON input` 時，要從檔案尾端往前檢查未關閉的 object、array 或 string。

## 十一、Formatter 能做什麼、不能做什麼？

FunnyTools JSON Formatter 可以：

- 格式化縮排；
- minify；
- 驗證標準 JSON syntax；
- 顯示 parser error。

但它不是「自動修正器」。例如：

```json
{"age":"18"}
```

這完全合法，但如果 API schema 要求 number，就應是：

```json
{"age":18}
```

Formatter 不知道你的業務規則。

## 十二、JSON valid 不代表資料 valid

下面語法完全合法：

```json
{
  "price": -999999,
  "date": "2099-99-99",
  "email": "abc"
}
```

但資料可能不合理。JSON syntax validation 只回答「能不能 parse」，不能回答：

- 欄位有沒有少；
- 型別符不符合 schema；
- 日期是否合法；
- email 是否有效；
- 金額是否合理。

正式 API 應再做 schema/business validation。

## 十三、重複 Key 是隱藏風險

```json
{
  "role": "user",
  "role": "admin"
}
```

某些 parser 會接受，但可能只保留最後一個值；不同 implementation 的處理也可能不同。重複 key 不應視為安全資料格式。

## 十四、大型整數精度

JSON 可以寫很長的 number，但 JavaScript 常用 IEEE 754 double。超出安全整數範圍的 ID 可能失去精度。

例如：

```json
{"id":"123456789012345678"}
```

如果它是識別碼，不需要做算術，通常更適合保留 string。

## 十五、不要把郵遞區號、電話、學號當 number

`00123` 如果轉成 number 就變 `123`。資料「長得像數字」不代表語意上是數值。

## 十六、Error position 不一定是真正錯誤起點

Parser 常在「終於無法繼續理解」的位置才報錯。漏一個引號可能到下一行才爆掉，因此應往錯誤位置前面檢查一小段。

## 十七、最安全的修復流程

1. 保留 raw input。
2. 用 Formatter 驗證。
3. 找第一個 error。
4. 一次只修一個問題。
5. 重新驗證。
6. 格式化後檢查 key/value。
7. 若是 API，再做 schema validation。

## 十八、Minify 會不會改資料？

理論上 minify 只移除不必要 whitespace，例如：

```json
{"name":"Amy"}
```

但如果工具採 parse → stringify，重複 key、大數值等仍可能受到 parser 行為影響。重要資料要保留原始版本。

## 十九、常見錯誤總表

| 問題 | 是否合法 JSON |
|---|---|
| 單引號字串 | ❌ |
| key 未雙引號 | ❌ |
| trailing comma | ❌ |
| undefined | ❌ |
| NaN | ❌ |
| true / false / null | ✅ |
| 重複 key | 可能 parse，但不建議 |
| 日期字串不存在 | 語法仍可合法 |

## 二十、修好後的回歸檢查

修正語法後不要只看 formatter 顯示 `valid`。先把輸入縮小成最小可重現片段，再把原始資料與修正版各保留一份。接著比較 key 的數量、陣列長度、數字與字串型別，以及 `null` 是否仍代表原本的缺值。若 JSON 要送到 API，還要用 API 文件要求的 schema 做第二次檢查，因為合法 JSON 仍可能缺少必填欄位或把日期、ID 當成錯誤型別。

處理含有使用者輸入的資料時，也應避免把錯誤訊息原樣顯示成可執行 HTML。記錄 parser 指出的行列位置即可，不要為了「自動修復」任意刪除反斜線、引號或最後一筆資料。保守修正雖然多一步，但能避免修好語法後才發現資料內容已經被改掉。

## 二十一、FAQ

### JSON 可以用單引號嗎？
不可以。

### JSON 最後可以多一個逗號嗎？
不可以。

### JSON 可以有 comment 嗎？
標準 JSON 不支援 `//` 或 `/* */` comments。

### Formatter 可以修好所有 JSON 嗎？
不能。它可指出語法錯誤，但不知道你的正確資料應該是什麼。

### JSON valid 就代表 API 一定接受嗎？
不代表，API 還可能要求 schema、型別與必填欄位。

## 二十二、延伸閱讀

- [JSON 格式化工具](/tools/json-formatter/)
- [CSV 轉 JSON 完整指南](/guides/csv-to-json-conversion-guide/)
- [JSON 轉 CSV 給 Excel](/guides/json-to-csv-excel-guide/)
- [CSV 中文亂碼與 UTF-8 BOM](/guides/csv-utf8-bom-excel-garbled-text/)
- [文字與寫作工具](/category/text/)

## 頁面 CTA

**JSON 貼進 API 前先驗證一次。** FunnyTools 可以幫你格式化、minify 與找 syntax error；修完後仍應用目標 API 的 schema 驗證資料意義。

CTA：`開啟 JSON 格式化`

## 圖卡與 ALT

`JSON Error → Find first parser error → Fix one issue → Validate again → Check schema`

ALT：`JSON 格式錯誤修復流程圖，從 parser 錯誤、逐一修正到 schema 驗證`
