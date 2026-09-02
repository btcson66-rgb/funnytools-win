---
slug: "/guides/line-breaks-lf-crlf-guide/"
seo_title: "LF vs CRLF 差在哪？Windows、Linux、Git 換行格式與文字行數完整指南｜FunnyTools"
meta_description: "為什麼Git顯示整份檔案都改過？解釋LF、CRLF、CR、Windows與Unix換行差異，並說明文字計數、CSV、程式碼與複製貼上如何受換行格式影響。"
canonical: "https://funnytools.win/guides/line-breaks-lf-crlf-guide/"
primary_keyword: "LF CRLF 差別"
hero_title: "LF vs CRLF 差在哪？"
hero_subtitle: "你看到的是『換行』，檔案底層可能是一個控制字元，也可能是兩個。"
---

# LF vs CRLF 差在哪？

畫面上：

`第一行`
`第二行`

你只看到：
> 換行。

但純文字底層可能使用：

## LF
`\n`

## CRLF
`\r\n`

歷史與作業系統習慣不同。

## LF

Line Feed。

現代：
- Linux
- macOS
- Git repository

常見。

## CRLF

Carriage Return + Line Feed。

Windows 純文字環境長期常見。

## 為什麼 Git 會顯示整份檔案變動？

如果檔案原本：

> LF

你的編輯器存成：

> CRLF

即使每一行文字完全一樣：

> Git 仍可能把大量行視為改動。

所以遇到：

> 「我只改一行，diff卻整份紅綠」

第一件事就要檢查：
> line ending。

## Character Count 也可能受影響

CRLF：

> 兩個 code units。

LF：

> 一個。

所以某些 raw character count：

> 同樣100行文字，底層字元數可能不同。

但應用程式也可能先 normalize newline，再計數。

所以仍以目標系統規則為準。

## 行數怎麼算？

一個常見概念：

> line separators 把內容切成多行。

但空字串與最後一個 newline 會讓不同程式的 line count 定義不同。

例如：

`A\n`

有人視為：
- 1行有內容

有人 split 後得到：
- `A`
- `""`

因此工具要公開自己的行數規則。

## FunnyTools Remove Empty Lines 的例子

目前公開驗證寫得很清楚：

### 完全空輸入
原始行數：
> 0。

### 只有一個 newline
切割後：
> 2 個空行。

這就是為什麼：

> 行數不是肉眼感覺就能唯一推導。

## CSV

CSV 在不同工具中可能使用：
- CRLF
- LF

而 quoted field 內也可能包含 newline。

所以：

> 不能用單純逐行文字工具安全解析所有 CSV。

FunnyTools Sort Lines 也明確說：

> 不會解析 CSV 引號、欄位或多行儲存格。

## Git 建議

專案最好明確規範 line ending。

常見工具：
- `.gitattributes`
- editor setting
- formatter

但 Task017 不替你的 repo 決定一定用 LF 或 CRLF。

應依：
- team
- platform
- tooling

規範。

## Copy/Paste

從：
- Windows app
- browser
- PDF

貼入 web textarea 時，瀏覽器／JS 處理過程也可能 normalize。

所以不要假設：
> clipboard bytes = textarea string bytes。

## 常見錯誤

### CRLF一定比LF錯
不是。

### Git整份變更一定是程式壞掉
可能只是 line ending。

### Sort Lines 可以當 CSV parser
不可以。

### 換行字元和 Unicode line breaking 是同一件事
不是。

Unicode 的「可以在哪裡換行」和檔案裡實際 newline code 是不同層級。

## 相關工具

## 以 fixture 防止換行回歸

固定測試資料應同時包含 LF、CRLF、檔尾換行、連續空行、tab，以及 CSV 引號中的多行內容。測試讀取、清理、排序和匯出後的行數與欄位數，並確認內容沒有因換行正規化而拼接錯誤。Git diff 出現整檔變動時，先將 line ending 差異與真正內容差異分開檢視；formatter 也要固定設定，避免每次儲存都改寫整個檔案。這些檢查能讓跨平台協作保持可預期，也能在工具更新後立即發現回歸。

## 跨平台交付時的檢查順序

先確認目標是純文字、CSV、Markdown、程式碼還是 Git repository，因為不同格式對換行的容忍度不同。Windows 常見 CRLF，Unix-like 系統常見 LF；有些工具會在讀取時自動正規化，有些則把差異視為檔案內容。若 diff 顯示整份檔案變更，先檢查 editor、Git autocrlf、formatter 與輸出編碼，不要立刻判定業務邏輯被改壞。

發布前可用一個含空行、結尾換行和多行欄位的固定 fixture 測試：確認讀回的行數、最後一行是否有 newline、空白行是否保留，以及 CSV 引號內的換行是否仍屬於同一欄。Remove Empty Lines 適合處理已知的純文字清理，不是 CSV parser。完成轉換後，在至少一個 Windows 與一個 Unix-like 環境讀回，並將編碼、換行策略寫進交付說明，避免下一位維護者再次猜測。

- [移除空白行](/tools/remove-empty-lines/)
- [文字行排序](/tools/sort-lines/)
- [字元計數器](/tools/character-counter/)

## 換行轉換後的相容性測試

轉換前先計算原始檔的行數、LF 數量、CRLF 數量與檔案 bytes，轉換後再比較預期差異。純文字檔通常只會改變換行表示法，但二進位檔、壓縮檔、簽章檔和某些固定格式資料不可用文字替換處理。對腳本要在目標作業系統執行一次，對 CSV 要用實際匯入工具讀取一次，避免把編輯器能開啟誤當成應用程式能解析。

Git 顯示整份檔案變更時，先用能顯示不可見字元的 diff 確認是否只有換行差異，再檢查 `.gitattributes`、editorconfig 和 CI formatter 是否互相衝突。若團隊同時使用 Windows 與 Linux，應在文件中寫明提交時的策略，並以 fixture 固定空檔、尾端換行、混合換行和多行欄位等案例，讓後續更新不會悄悄改變資料邊界。

## 不同檔案類型的處理差異

Markdown 和一般文字多半可以在讀取時正規化換行，但 shell script、Makefile、設定檔和某些資料交換格式可能依賴行尾或空行。CSV 的引號欄位可以包含換行，不能用每個 newline 都代表新資料列；JSON 字串中的跳脫換行也不能和實際檔案換行混為一談。先辨認 parser，再選擇工具，才不會因為畫面看起來相同而破壞資料。

若要在 CI 中固定結果，可將 fixture 放進測試資料，分別檢查讀取後的欄位、輸出 bytes 和再次讀取的結果。部署前抽查 Git diff 與產物檔案，不要讓編輯器自動轉換和建置工具轉換兩次。遇到 legacy 檔案時，先記錄現況與接收端要求，再安排一次可回復的轉換，避免把歷史資料和新規則混在一起。
