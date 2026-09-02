---
slug: "/guides/csv-to-json-conversion-guide/"
seo_title: "CSV 轉 JSON 怎麼做？標題列、逗號、引號、分號與型別完整指南｜FunnyTools"
meta_description: "CSV 轉 JSON 不只是用逗號 split。完整說明 header、quoted fields、欄位內逗號與換行、分號 delimiter、UTF-8、前導零、number/boolean 型別推論與 irregular rows。"
og_title: "CSV 轉 JSON 完整指南：不要直接 split(',')"
og_description: "CSV 欄位可以包含逗號、引號與換行；先正確解析，再決定 JSON 型別。"
canonical: "https://funnytools.win/guides/csv-to-json-conversion-guide/"
primary_keyword: "CSV 轉 JSON"
card_title: "CSV 轉 JSON 怎麼做才不跑欄？"
card_description: "先辨認 header、delimiter 與 quoted fields，再處理型別與前導零。"
hero_title: "CSV 轉 JSON 怎麼做？標題列、逗號、引號、分號與型別完整指南"
hero_subtitle: "CSV 看起來像用逗號分隔，但真正安全的轉換必須處理引號、換行、不同 delimiter 與資料型別。"
---

# CSV 轉 JSON 怎麼做？標題列、逗號、引號、分號與型別完整指南

最簡單的 CSV：

```csv
name,age
Amy,20
Ben,21
```

看起來好像每行 `split(',')` 就能轉 JSON。但遇到：

```csv
name,address,note
Amy,"Taipei, Taiwan","Line 1
Line 2"
```

單純 split 立刻跑欄。

> **速答：CSV 轉 JSON 最重要的是什麼？** 不要把 CSV 當成單純逗號分隔字串。欄位可能用雙引號包住，其中可以包含逗號、雙引號甚至換行；雙引號本身要以 `""` 表示。轉 JSON 前先正確解析 header、delimiter 與 quoted field，再決定值要保留 string 還是推論成 number/boolean。FunnyTools CSV to JSON 預設保留 cell 為字串，這對郵遞區號、學號、長 ID 與前導零資料通常更安全。

## 一、CSV 不只是逗號

RFC 4180 記錄常見 CSV 慣例：

- 每筆 record 通常一行；
- 第一行可以是 header；
- 欄位由 delimiter 分隔；
- 包含逗號、換行或雙引號的欄位需要 quoting；
- quote 裡的 `"` 以 `""` escape。

## 二、為什麼不能直接 split(',')？

```csv
name,city
Amy,"Taipei, Taiwan"
```

如果直接 split comma，原本 2 欄會被切成 3 欄。真正 CSV parser 會知道引號內逗號屬於資料。

## 三、欄位裡可以有換行

```csv
name,note
Amy,"第一行
第二行"
```

所以也不能把每個 newline 無條件當成新 row。

## 四、欄位裡的雙引號怎麼寫？

內容：

`She said "hello"`

CSV：

```csv
"She said ""hello"""
```

## 五、第一列一定是 Header 嗎？

不一定，但大部分 object-style CSV→JSON 需要 header 才知道 property name。

沒有 header 的 CSV：

```csv
Amy,90
Ben,85
```

你必須自己決定是 `column1/column2`、`name/score` 或 array of arrays。

## 六、Header 重複要先處理

```csv
name,name
Amy,Lin
```

JSON object 無法安全表達兩個同名欄位的原始表格語意。正式轉換前應先讓 header 唯一。

## 七、逗號不是唯一 delimiter

實務還可能有：

- `;`
- Tab
- `|`

尤其一些 locale 會偏好 semicolon CSV。不要把「CSV」理解成永遠只有英文逗號。

## 八、`00125` 為什麼不要自動變 125？

它可能是：

- 郵遞區號；
- 員工編號；
- 產品代碼；
- 學號；
- 帳號片段。

因此 FunnyTools 預設保留 cell 為 string，這是較保守的行為。

## 九、什麼時候才適合型別推論？

例如：

```csv
name,age,active
Amy,20,true
```

若你確定 schema，可推論成：

```json
[{"name":"Amy","age":20,"active":true}]
```

但必須檢查：

- 00123；
- 長整數；
- 科學記號；
- 日期；
- TRUE/FALSE 字串；
- 產品編號。

## 十、長整數可能失去精度

`123456789012345678` 如果被推論成 JavaScript Number，可能失去精確值。若它是 ID，應保留 string。

## 十一、日期不要讓工具替你猜

`2026-08-27` 可以是日期，也可以只是文字版本號。普通 converter 不知道你的 schema，不應擅自把它變 Date object。

## 十二、空白 Cell 的語意不是固定的

```csv
name,age
Amy,
```

可以對應：

```json
{"name":"Amy","age":""}
```

但某些 API 需要 `null` 或省略 key。要依資料契約決定。

## 十三、不規則列是警訊

Header 三欄：

```csv
name,age,email
```

某列只有兩欄、另一列四欄，常代表：

- delimiter 選錯；
- quote 漏掉；
- 原始 CSV 壞掉。

不要只要求工具「轉得出來」，應回頭找原因。

## 十四、UTF-8 中文亂碼不是 JSON 的錯

如果瀏覽器已正確讀到 Unicode，中文與 Emoji 都能進 JSON。若 CSV 在讀入前就已經被錯誤 encoding 解碼成亂碼，轉 JSON 不會自動恢復原字元。

## 十五、Nested JSON 不能從普通 CSV 自動推斷

CSV：

```csv
name,city,zip
Amy,Taipei,100
```

你可能想要：

```json
{"name":"Amy","address":{"city":"Taipei","zip":"100"}}
```

但 converter 不知道 `city` 與 `zip` 應放進 `address`。這需要 schema mapping。

## 十六、Array 欄位也沒有唯一答案

CSV：

```csv
name,tags
Amy,"red,blue"
```

`tags` 可能是字串，也可能是 `['red','blue']`。沒有 schema 無法安全推斷。

## 十七、轉換後一定要驗證

至少檢查：

1. record count；
2. header；
3. 第一筆；
4. 最後一筆；
5. 含逗號欄位；
6. 含換行欄位；
7. 前導零；
8. 中文／Emoji；
9. 空值；
10. 型別。

## 十八、推薦工作流

1. 保留原 CSV。
2. 確認 delimiter / header。
3. 使用真正 CSV parser。
4. 預設保留 string。
5. 核對 row count / keys。
6. 有 schema 再做 typed conversion。
7. 用目標 API schema 驗證。

## 十九、轉換後的資料抽查

完成轉換後，至少抽查第一列、含逗號的列、含換行的列、空值列、前導零 ID，以及欄位數最多的一列。把 JSON 再轉回 CSV 或交給測試 API 前，記錄原始 row count 與轉換後 array length；兩者不一致時先找出是空列、引號解析或換行規則造成的差異，不要直接刪除「看起來奇怪」的資料。

若 CSV 來自不同地區的試算表，delimiter、decimal separator 與日期格式可能同時不同。這些是資料契約，不應由程式用猜的方式永久決定。先在小樣本上確認，再把 delimiter、編碼與欄位型別寫進匯入說明，下一次處理同一來源時才有可重現的結果。

## 二十、FAQ

### CSV 裡的逗號怎麼辦？
欄位若含逗號，應正確 quoting 並由 CSV parser 解析。

### CSV 可以有換行嗎？
Field 被雙引號正確包住時可以。

### 轉 JSON 後數字為什麼是字串？
FunnyTools 預設保守保留文字，以避免前導零與 ID 被破壞。

### 可以自動轉 number / boolean 嗎？
可以選擇型別推論，但要核對 ID、日期與長整數。

### CSV 可以直接產生 nested JSON 嗎？
通常不能，除非另外提供 mapping 規則。

## 二十一、延伸閱讀

- [CSV 轉 JSON 工具](/tools/csv-to-json/)
- [JSON 格式錯誤修復](/guides/json-error-fix-guide/)
- [JSON 轉 CSV 給 Excel](/guides/json-to-csv-excel-guide/)
- [CSV 中文亂碼與 UTF-8 BOM](/guides/csv-utf8-bom-excel-garbled-text/)
- [文字與寫作工具](/category/text/)

## 頁面 CTA

**CSV 要進 API 前，先把它轉成可檢查的 JSON。** 保留原 CSV，轉換後先核對筆數、欄位與前導零，再決定是否推論型別。

CTA：`開啟 CSV 轉 JSON`

## 圖卡與 ALT

`CSV → Parse quoting/delimiter → Keep strings → Validate rows → Optional type inference → JSON`

ALT：`CSV 轉 JSON 正確流程圖，包含引號分隔解析、保留字串、筆數驗證與型別推論`
