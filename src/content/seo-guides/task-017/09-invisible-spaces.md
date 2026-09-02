---
slug: "/guides/invisible-spaces-nbsp-zero-width-guide/"
seo_title: "明明一樣卻比對失敗？NBSP、零寬空格、全形空白與隱藏 Unicode 字元指南｜FunnyTools"
meta_description: "看不見的空白也可能是不同Unicode字元。說明SPACE、NBSP、ZERO WIDTH SPACE、IDEOGRAPHIC SPACE與ZWJ如何影響字元計數、搜尋、排序、貼上與資料匯入。"
canonical: "https://funnytools.win/guides/invisible-spaces-nbsp-zero-width-guide/"
primary_keyword: "NBSP 零寬空格 隱藏字元"
hero_title: "明明看起來一樣，為什麼搜尋、排序或比對失敗？"
hero_subtitle: "因為螢幕上的『空白』不一定都是 U+0020 SPACE；有些 Unicode 字元甚至完全沒有可見寬度。"
---

# 明明看起來一樣，為什麼搜尋、排序或比對失敗？

兩個字串：

`Hello World`

看起來完全一樣。

但其中一個中間可能是：

- 普通 SPACE
- NO-BREAK SPACE

人眼看不出來。

程式卻知道：

> code point 不同。

## 普通 SPACE

最常見：

`U+0020 SPACE`

一般英文輸入空白。

## NO-BREAK SPACE

`U+00A0 NBSP`

主要目的：

> 避免在這個位置換行。

常見來源：
- 網頁
- rich text editor
- copy/paste
- CMS

看起來像普通空白。

但搜尋或 exact compare：

> 可能不同。

## IDEOGRAPHIC SPACE

`U+3000`

常見於 CJK 排版。

寬度通常更接近：
> 全形。

如果資料欄位要求 ASCII space：

> 它不是同一個字元。

## ZERO WIDTH SPACE

`U+200B`

名稱有 space，但：

> 通常沒有可見寬度。

Unicode 說明它可作為隱藏的 break opportunity。

所以：

`abc​def`

看起來像：
`abcdef`

實際卻多一個 code point。

## ZERO WIDTH JOINER

`U+200D ZWJ`

它不是一般「空格」。

常用來連接：
- emoji sequences
- complex scripts

如果粗暴地：

> 刪除所有 zero-width characters

可能破壞 emoji 或某些文字。

所以不能把所有 invisible Unicode 一律當垃圾。

## 為什麼會造成 bug？

### Login / username
使用者貼上後可能含 invisible chars。

### Excel / CSV
兩個值看起來相同：
> exact match 卻 false。

### Sorting
排序位置可能異常。

### Character limit
看起來沒有增加：
> count 卻增加。

### Search
Ctrl+F 找不到。

## 怎麼檢查？

第一步：

> 看 character count。

若視覺內容沒變，但 count 比預期多：

> 懷疑 hidden chars。

第二步：
把文字貼到：
- code editor
- Unicode inspector
- hex/code-point viewer

FunnyTools 現行 Character Counter 目前顯示長度與 UTF-8 bytes，但不是專門的 Unicode code-point inspector。

所以不要宣稱它能列出每個 hidden code point。

## Remove Empty Lines 能處理什麼？

它會把：

> 只含 whitespace 的整行

當作空白行。

但這不代表：

> 可以清掉任意文字中所有 invisible Unicode。

這是不同問題。

## 最安全的 normalization 方法

先定義用途。

### 一般文章
不要任意刪 ZWJ。

### 名單
可以考慮：
- trim
- normalize known spaces

但先保留原始資料。

### Identifier
一定要依系統規格。

例如：
> username 是否允許 Unicode？

應由 application validation 定義。

## 常見錯誤

### 所有看不見字元都刪掉
危險。

### NBSP 就是一般空白
視覺近似，但 code point 不同。

### ZWJ 就是多餘空格
錯，它是 joiner。

### UTF-8 byte 多一點就是惡意字元
不一定。

## 相關指南

## 建立可追蹤的 Unicode 診斷

遇到看不見的差異，可將字串中的每個位置標成索引、字元名稱、十六進位 code point 和 UTF-8 bytes。這份診斷只用於除錯，不應直接公開可能含有密碼或個資的原文。確認問題後，制定最小替換規則，例如只把 NBSP 轉成一般空白，或只移除來源明確加入的 BOM。每次替換都保留前後長度與測試結果，並用相同案例驗證搜尋、排序、複製和 API 比對，避免一次清掉所有特殊字元而引入新錯誤。

## 找出問題而不是盲目刪除

看不見的字元先要被分類。一般空白、NBSP、tab、LF、CRLF、zero-width space、zero-width joiner 和 BOM 的用途不同；有些是排版分隔，有些是檔案標記，有些負責把 emoji 組合成一個顯示圖案。可以把輸入轉成 code point 或 UTF-8 bytes 的診斷表，標出位置、名稱與前後文，再決定是否清理。

若問題是搜尋不到、比對失敗或 API 拒絕，先建立最小重現：原始字串、可見顯示、預期結果、實際 code point 和目標系統規則。對密碼、簽章、程式碼與使用者輸入，不要把所有零寬字元一律刪掉；這可能改變安全資料或讓問題無法追查。清理後重新計算長度，並在瀏覽器、匯出檔與實際 API 各驗證一次，確定改動只處理已確認的噪音。

- [UTF-8 bytes vs 字元](/guides/utf8-bytes-vs-characters-guide/)
- [Emoji / Grapheme Cluster](/guides/emoji-character-count-grapheme-guide/)
- [PDF/網頁複製文字清理](/guides/clean-copied-text-from-pdf-web-guide/)

## 輸入驗證與顯示要分開

清理工具可以協助定位異常字元，但不應默默改寫所有輸入。對登入名稱、檔案路徑、API key 或資料庫欄位，先建立允許字元和正規化規則，遇到不符合時回報位置與 code point，讓使用者決定是否修正。對一般文章則可提供預覽差異，讓使用者比較原文與清理後版本，再手動確認標題、網址、數字和標點沒有被改變。

相容性測試要覆蓋複製貼上、不同瀏覽器、CSV 匯入、搜尋比對與排序。輸入端若做 Unicode normalization，輸出端也要使用一致規則，否則兩個看似相同的字串仍可能無法比對。記錄清理前後長度、bytes 和異常位置，能幫助工程人員分辨編碼問題、不可見空白和真正的資料內容，而不是只看到一個模糊的「不相等」。

## 建議的診斷輸出

診斷畫面可以逐字列出索引、可見替代符號、Unicode 名稱、code point、UTF-16 長度和 UTF-8 bytes，但原文應提供遮罩或只在本機顯示。對於一段短字串，讓使用者能點選差異位置並複製單一 code point；對大量內容則只報告異常數量、第一個位置與前後幾個安全片段，避免把個資或密鑰寫入日誌。

修正規則也要有明確名稱，例如「只將 NBSP 轉為 SPACE」或「移除檔案開頭 BOM」，不要使用含糊的「清除特殊字元」。每個規則建立保留案例與拒絕案例，測試英文、中文、組合符號、網址和程式字串。當規則更新時，比較前後診斷報告，確認新增的替換範圍是有意義且可回復的。
