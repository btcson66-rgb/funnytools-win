---
slug: "/guides/json-to-csv-excel-guide/"
seo_title: "JSON 轉 CSV 給 Excel：欄位、UTF-8 與公式注入指南｜FunnyTools"
meta_description: "JSON 轉 CSV 給 Excel 怎麼做？完整說明 flat object array、不同欄位、逗號與引號跳脫、UTF-8 BOM、semicolon delimiter，以及 = + - @ 開頭值造成 CSV Formula Injection 的風險。"
og_title: "JSON 轉 CSV 給 Excel：不只把 key 用逗號串起來"
og_description: "先確認 JSON 是否為平坦表格，再處理欄位、UTF-8、Excel 相容性與公式注入。"
canonical: "https://funnytools.win/guides/json-to-csv-excel-guide/"
primary_keyword: "JSON 轉 CSV Excel"
card_title: "JSON 轉 CSV 給 Excel 怎麼做？"
card_description: "Flat JSON、UTF-8 BOM、分隔符與 Formula Injection 一次整理。"
hero_title: "JSON 轉 CSV 給 Excel 怎麼做？欄位、UTF-8 BOM、分隔符與 Formula Injection 指南"
hero_subtitle: "CSV 很適合平坦表格，但 nested objects、arrays、UTF-8 與試算表公式安全都需要先決定。"
---

# JSON 轉 CSV 給 Excel 怎麼做？欄位、UTF-8 BOM、分隔符與 Formula Injection 指南

你有一段 API JSON：

```json
[
  {"name":"Amy","score":90},
  {"name":"Ben","score":85}
]
```

想讓 Excel 開啟，最簡單可以轉成：

```csv
name,score
Amy,90
Ben,85
```

但真實資料常有不同 key、中文、逗號、換行、nested object、array、長 ID，以及 `=SUM(...)` 這種可能被試算表當公式執行的內容。

> **速答：JSON 轉 CSV 給 Excel 怎麼做？** 最適合轉 CSV 的 JSON 是「array of flat objects」。先收集所有列的 key 作為欄位，再依 CSV 規則處理逗號、雙引號與換行。若要給 Excel 使用，UTF-8 BOM 常能改善直接開啟中文 CSV 的相容性；若資料可能來自不可信來源，還要防止以 `=`, `+`, `-`, `@` 等開頭的內容被試算表當成公式執行。FunnyTools JSON to CSV 目前提供 separator、UTF-8 BOM 與 spreadsheet formula protection 選項。

## 一、什麼 JSON 最適合轉 CSV？

理想結構：

```json
[
  {"name":"Amy","score":90,"city":"Taipei"},
  {"name":"Ben","score":85,"city":"Tainan"}
]
```

這是 array of flat objects。每個 object 對應一列，每個 key 對應一欄。

## 二、每列 Key 不一樣怎麼辦？

```json
[
  {"name":"Amy","score":90},
  {"name":"Ben","email":"ben@example.com"}
]
```

若只看第一列 key，`email` 會消失。較好的轉換方式是收集所有 rows 的 keys，建立完整欄位集合。

## 三、Header 從哪裡來？

通常由 JSON key 產生。例如：

```json
{"firstName":"Amy","age":20}
```

Header：

```csv
firstName,age
```

不要擅自翻譯或改名，除非目標 schema 明確要求。

## 四、欄位裡有逗號怎麼辦？

JSON：

```json
{"city":"Taipei, Taiwan"}
```

CSV 應正確 quoting：

```csv
"Taipei, Taiwan"
```

否則會被拆成兩欄。

## 五、欄位裡有雙引號怎麼辦？

內容：

`He said "hello"`

CSV 常見表示：

```csv
"He said ""hello"""
```

## 六、欄位裡有換行呢？

Quoted field 可以包含換行：

```csv
"Amy","Line 1
Line 2"
```

所以生成器必須同時處理 delimiter、quote、newline。

## 七、Nested Object 為什麼不能直接塞 CSV？

```json
{
  "name":"Amy",
  "address":{"city":"Taipei","zip":"100"}
}
```

CSV 是二維表格，`address` 可能有多種 flatten 方式：

- `address.city`, `address.zip`
- stringify 整個 object 放一格
- 拆成另一張表

沒有唯一正解。普通 converter 不應替你猜 schema。

## 八、Array 欄位也沒有唯一答案

```json
{"name":"Amy","tags":["red","blue"]}
```

可以輸出 `red|blue`、JSON string，或拆成多列。這需要業務規則。

## 九、UTF-8 中文為什麼 Excel 有時亂碼？

CSV 只是文字。問題常在 Excel 如何猜 encoding。

在部分 Windows / Excel 工作流中，UTF-8 BOM 可以提高直接開啟時辨識 UTF-8 的相容性。FunnyTools JSON to CSV 目前提供 BOM 選項。

但 BOM 不是所有下游都需要。如果 API 或系統明確要求 UTF-8 without BOM，就應依規格關閉。

## 十、逗號還是分號？

實務可能使用：

- comma `,`
- semicolon `;`

不同 locale / spreadsheet 設定可能偏好不同 delimiter。FunnyTools 提供 separator 選擇，因此不要把 CSV 理解成永遠只用逗號。

## 十一、CSV Formula Injection 是什麼？

如果資料值是：

```text
=SUM(A1:A10)
```

寫進 CSV 後用 Excel、LibreOffice Calc 等試算表開啟，可能被當成公式。

OWASP 將這類風險稱為：

> CSV Injection / Formula Injection。

常見需注意的開頭包括：

- `=`
- `+`
- `-`
- `@`
- tab / CR / LF
- 某些全形變體

## 十二、什麼情況風險最高？

當 JSON 內容來自：

- 使用者名稱；
- 表單；
- 留言；
- 外部 API；
- 不可信匯入資料；

而 CSV 最後會由 spreadsheet app 開啟。

## 十三、Quote escaping 不等於 Formula protection

把 cell 包在雙引號中主要是 CSV syntax。

Spreadsheet 解析完 CSV 後，cell 內容仍可能以 `=` 開頭，因此：

> CSV 語法 escaping ≠ 試算表公式安全。

## 十四、FunnyTools 的 Formula Protection 怎麼理解？

現行 JSON to CSV 提供 spreadsheet formula-like cell protection。它是安全防護的一環，但不應宣稱「100% 消除所有 CSV Injection」。

OWASP 也提醒，不同 spreadsheet 軟體的開啟、儲存與重新匯入行為可能讓 mitigation 變複雜。

## 十五、長 ID 進 Excel 可能被改掉

例如：

```text
123456789012345678
```

Excel 可能：

- 顯示科學記號；
- 當數值處理；
- 失去部分精度。

如果它是 ID，應在 Excel 匯入時指定欄位為 Text。

## 十六、前導零也可能消失

`00123` 開成 Excel 後可能顯示 `123`。這不一定是 converter 改掉，而是試算表自動型別推論。

正式資料應使用 Data Import / Power Query 或欄位 Text 設定驗證。

## 十七、下載後要驗證什麼？

至少檢查：

1. row count；
2. column count；
3. 中文；
4. 逗號；
5. 引號；
6. 換行；
7. 前導零；
8. 長 ID；
9. formula-like text；
10. 第一列與最後一列。

## 十八、推薦工作流

1. 驗證 JSON syntax。
2. 確認是 flat object array。
3. 決定 separator。
4. 決定 Formula Protection。
5. 決定 BOM。
6. 產生 CSV。
7. 用真正目標 Excel / Sheets 開啟。
8. 核對 row / column。

## 十九、常見錯誤

### 錯誤 1：Nested JSON 直接硬轉
會失去結構語意。

### 錯誤 2：只取第一個 object 的 key
可能漏欄。

### 錯誤 3：中文亂碼就以為資料壞掉
可能只是 encoding detection。

### 錯誤 4：只做 quote escaping 就以為安全
不等於 Formula protection。

### 錯誤 5：ID 被 Excel 科學記號化就怪 converter
CSV 本身沒有欄位型別資訊。

## 二十、交付前的 Excel 相容性測試

輸出 CSV 後，先用純文字編輯器確認第一個位元組與分隔符，再用實際收件人會使用的 Excel 版本開啟。檢查中文、換行、日期、長數字、前導零與以 `=`, `+`, `-`, `@` 開頭的欄位；這些欄位即使在 CSV 語法上合法，也可能被試算表重新解讀。若資料要進資料庫或 API，應以 CSV parser 的結果為準，不要以 Excel 顯示的格式反推原始值。

Nested object 與 array 最好在輸出前明確選擇欄位路徑，例如拆成多欄、序列化成 JSON 字串，或另存子表。把決策寫在交付說明中，收件人才能知道空白欄位是缺值、未展開，還是原資料本來就不存在；這也能避免下次轉換時欄位順序或意義悄悄改變。

## 二十一、FAQ

### 所有 JSON 都能轉 CSV 嗎？
不是。Nested object / arrays 需要先定義 flatten 規則。

### Excel 中文亂碼怎麼辦？
UTF-8 BOM 常能改善直接開啟相容性，也可使用 Excel 資料匯入流程指定 UTF-8。

### BOM 一定要開嗎？
不一定，依下游規格。

### 為什麼要防 `=` 開頭？
Spreadsheet 可能把它當公式。

### 每列 Key 不同會不會丟欄？
FunnyTools 現行工具會收集所有 row 的 key。

## 二十二、延伸閱讀

- [JSON 轉 CSV 工具](/tools/json-to-csv/)
- [CSV 中文亂碼與 UTF-8 BOM](/guides/csv-utf8-bom-excel-garbled-text/)
- [CSV 轉 JSON](/guides/csv-to-json-conversion-guide/)
- [JSON 格式錯誤](/guides/json-error-fix-guide/)
- [文字與寫作工具](/category/text/)

## 頁面 CTA

**JSON 要交給 Excel？先確認它真的是平坦表格。** 再決定 Separator、Formula Protection 與 UTF-8 BOM，最後一定用真正的目標 spreadsheet 開一次。

CTA：`開啟 JSON 轉 CSV`

## 圖卡與 ALT

`Flat JSON → Collect all keys → Escape CSV → Formula protection → UTF-8 BOM → Excel verify`

ALT：`JSON 轉 CSV 給 Excel 流程圖，包含欄位收集、CSV 跳脫、公式保護與 UTF-8 BOM`
