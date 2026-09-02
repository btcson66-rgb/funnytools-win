---
slug: "/guides/csv-utf8-bom-excel-garbled-text/"
seo_title: "CSV 在 Excel 開啟中文亂碼怎麼辦？UTF-8、BOM、分隔符與匯入完整指南｜FunnyTools"
meta_description: "CSV 用 Excel 開啟中文變亂碼？完整說明 UTF-8、UTF-8 BOM、ANSI/Big5 猜測、逗號與分號 delimiter、資料匯入、前導零與長 ID，並教你如何判斷是 encoding 還是欄位解析問題。"
og_title: "CSV Excel 中文亂碼怎麼修？UTF-8 BOM 與匯入流程"
og_description: "先分清楚 encoding、delimiter 與 Excel 自動型別；不是所有看起來錯的 CSV 都是同一種亂碼。"
canonical: "https://funnytools.win/guides/csv-utf8-bom-excel-garbled-text/"
primary_keyword: "CSV Excel 中文亂碼"
card_title: "CSV 在 Excel 開啟中文亂碼怎麼辦？"
card_description: "從 UTF-8、BOM、delimiter 到 Excel 自動型別逐步排查。"
hero_title: "CSV 在 Excel 開啟中文亂碼怎麼辦？UTF-8、BOM、分隔符與匯入完整指南"
hero_subtitle: "中文亂碼、欄位全部擠在一起、00123 變 123，其實是三種不同問題：encoding、delimiter 與型別推論。"
---

# CSV 在 Excel 開啟中文亂碼怎麼辦？UTF-8、BOM、分隔符與匯入完整指南

你有一份 CSV：

```csv
姓名,城市
王小明,台北
```

在文字編輯器看完全正常，但雙擊用 Excel 開啟後可能出現：

- 中文亂碼；
- 所有欄位擠在第一欄；
- `00123` 變 `123`；
- 長 ID 變科學記號；
- 日期自動改格式。

這些問題常被全部叫做「CSV 亂碼」，但其實不是同一件事。

> **速答：CSV 在 Excel 中文亂碼怎麼辦？** 先確認檔案實際 encoding 是否為 UTF-8；若使用「直接雙擊開啟」的工作流，UTF-8 BOM 常能提高部分 Excel 版本辨識 UTF-8 的相容性。若欄位全部擠在同一欄，通常是 delimiter 不符；若前導零、長 ID 或日期被改，則是 Excel 自動型別推論。最穩定的方式是使用 Excel 的 Data / From Text/CSV 匯入，明確選擇 UTF-8、delimiter 與欄位型別，而不是只靠雙擊猜測。

## 一、先分清楚三種常見問題

### 問題 A：中文變亂碼
多半是 encoding interpretation。

### 問題 B：所有資料在第一欄
多半是 delimiter。

### 問題 C：00123 變 123
多半是 type inference。

不要只靠加 BOM 解決所有問題。

## 二、UTF-8 是什麼？

UTF-8 是 Unicode 的常見字元編碼方式。

它可以表示：

- 中文；
- 英文；
- Emoji；
- 多語言字元。

CSV 本身不規定「只准某一種 encoding」。真正能否正確顯示，取決於產生端與讀取端是否對 encoding 有一致理解。

## 三、BOM 是什麼？

BOM = Byte Order Mark。

UTF-8 BOM 常見 bytes：

```text
EF BB BF
```

在 UTF-8 中它不是用來表示 byte order 的必要資訊，但很多軟體會把它當作：

> 「這是 UTF-8」的 signature / hint。

## 四、為什麼 Excel 直接開啟時 BOM 有幫助？

某些 Windows / Excel 工作流若沒有 BOM，可能依 locale 猜成其他 encoding。

加入 UTF-8 BOM 後：

> 更容易被辨認為 UTF-8。

因此 FunnyTools JSON to CSV 現行下載選項提供 UTF-8 BOM。

## 五、BOM 是不是永遠要加？

不是。

有些：

- API；
- parser；
- Unix pipeline；
- database import

可能明確要求：

> UTF-8 without BOM。

所以 BOM 是 compatibility choice，不是「CSV 正確答案」。

## 六、最穩定的方法：不要只靠雙擊

在 Excel 使用：

> Data → From Text/CSV

可以明確選：

- File origin / encoding；
- delimiter；
- preview；
- 欄位型別。

這比讓 Excel 自己猜更可控。

## 七、所有欄位都在第一欄是什麼原因？

CSV 內容：

```text
name,score,city
```

但 Excel locale 可能期待 semicolon：

```text
name;score;city
```

若 delimiter 判斷不一致，整行就可能落在同一格。

這不是字元 encoding 問題。

## 八、逗號和分號怎麼選？

依：

- 來源系統；
- locale；
- 目標 Excel；
- 下游 parser

決定。

FunnyTools JSON to CSV 支援 separator 選擇，就是為了解決這類差異。

## 九、欄位內本來就有逗號怎麼辦？

例如地址：

```text
Taipei, Taiwan
```

正確 CSV 應 quoting：

```csv
"Taipei, Taiwan"
```

不能因為 Excel 跑欄就直接把資料裡的逗號刪掉。

## 十、前導零為什麼消失？

CSV：

```text
00123
```

Excel 自動當 number 後顯示：

```text
123
```

這是型別推論，不是 encoding。

郵遞區號、學號、產品代碼、電話等欄位應在匯入時指定：

> Text。

## 十一、長 ID 為什麼變科學記號？

例如：

```text
123456789012345678
```

Excel 可能顯示：

```text
1.23457E+17
```

甚至可能因數值精度而改變尾數。

如果它是 ID，不是數量：

> 應匯入為 Text。

## 十二、日期為什麼自動改格式？

CSV：

```text
01-02
```

可能被 Excel 當日期。

產品代碼、版本號、月份代碼等也可能被錯誤推論。

因此重要資料不要只靠雙擊。

## 十三、UTF-8 檔案在文字編輯器正常，Excel 亂碼代表什麼？

這通常表示：

> 檔案 bytes 可能是正確 UTF-8，但 Excel 開啟時用了錯誤 encoding。

這種情況下：

- 加 BOM；
- 用 Data Import 指定 UTF-8

通常比重新轉資料更合理。

## 十四、如果來源本身已經是亂碼，BOM 救不了

例如原資料已經變成：

```text
çŽ‹å°æ˜Ž
```

再加 BOM 不會神奇恢復。

你必須找到：

> 原始 bytes + 正確 encoding。

Encoding 問題要在最早錯誤解碼處修復。

## 十五、Big5、ANSI、CP950 怎麼辦？

舊系統可能仍輸出 Big5 / CP950 等編碼。

如果你知道來源：

> 應以正確 encoding 讀取，再轉 UTF-8。

不要把錯誤解碼後的文字再「另存 UTF-8」；那只會把亂碼正式保存。

## 十六、Emoji 為什麼在舊 CSV 工作流特別容易壞？

舊編碼不一定能表示 Emoji。

如果 pipeline 中任何一段：

- Big5；
- ANSI；
- 非 Unicode database column

無法表示，就可能丟失。

UTF-8 end-to-end 才能可靠保留。

## 十七、CSV 轉 JSON 前也要先解決 encoding

如果 CSV 文字已亂碼：

> 轉 JSON 只會得到「JSON 格式的亂碼」。

因此順序：

1. 正確 decode CSV；
2. 確認中文；
3. 再 CSV → JSON。

## 十八、JSON → CSV 給 Excel 的推薦設定

一般中文 Excel 工作流可以考慮：

- UTF-8；
- BOM on；
- 適合 locale 的 delimiter；
- Formula Protection on；
- 再用 Excel 實際打開測試。

如果下游系統有明確 spec，則以 spec 為準。

## 十九、Formula-like value 和亂碼是不同安全問題

值：

```text
=1+1
```

中文顯示正常，不代表安全。

Excel 可能把它當公式。

因此 JSON→CSV 還要另外考慮 CSV / Formula Injection。

## 二十、最終驗證清單

- [ ] 中文正常
- [ ] Emoji 正常
- [ ] 欄位數正確
- [ ] delimiter 正確
- [ ] 逗號欄位沒有跑欄
- [ ] 前導零保留
- [ ] 長 ID 沒被改
- [ ] 日期沒被誤轉
- [ ] formula-like text 已檢查
- [ ] row count 正確

## 二十一、常見錯誤

### 錯誤 1：所有問題都叫亂碼
應分 encoding / delimiter / type inference。

### 錯誤 2：只加 BOM 不檢查 delimiter
欄位可能仍擠在一格。

### 錯誤 3：雙擊 CSV 就當最終驗證
Excel 可能自動猜型別。

### 錯誤 4：來源已亂碼還一直另存 UTF-8
只會固化錯誤。

### 錯誤 5：把 ID 當 number
可能失去前導零或精度。

## 二十二、FAQ

### UTF-8 CSV 一定需要 BOM 嗎？
不一定；BOM 是相容性提示，依目標程式決定。

### 為什麼 Excel 全部塞在第一欄？
多半是 delimiter 判斷不符，不是 encoding。

### 00123 為什麼變 123？
Excel 自動當 number。

### 長 ID 為什麼變 E+17？
Excel 以數值／科學記號處理，應匯入為 Text。

### 加 BOM 可以救已經亂掉的文字嗎？
不行，來源若已錯誤 decode，需要回到原始 bytes 修正。

## 二十三、延伸閱讀

- [JSON 轉 CSV 工具](/tools/json-to-csv/)
- [CSV 轉 JSON 工具](/tools/csv-to-json/)
- [JSON 轉 CSV 給 Excel 指南](/guides/json-to-csv-excel-guide/)
- [CSV 轉 JSON 完整指南](/guides/csv-to-json-conversion-guide/)
- [文字與寫作工具](/category/text/)

## 頁面 CTA

**CSV 給 Excel 前先測一次真正匯入流程。** 中文亂碼、欄位擠在一起與前導零消失是不同問題，要分開修。

CTA：`開啟 JSON 轉 CSV`

次要 CTA：`CSV 要進 API？開啟 CSV 轉 JSON`

## 圖卡與 ALT

`CSV problem → Encoding? Delimiter? Type inference? → Import explicitly → Verify values`

ALT：`CSV Excel 中文亂碼排查流程圖，區分 UTF-8 encoding、delimiter 與自動型別問題`
