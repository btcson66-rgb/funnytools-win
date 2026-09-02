---
slug: "/guides/base64-utf8-unicode-guide/"
seo_title: "Base64 中文、Emoji 為什麼亂碼？UTF-8、btoa/atob 與正確編解碼完整指南｜FunnyTools"
meta_description: "Base64 中文或 Emoji 為什麼會亂碼？完整說明 Unicode、UTF-8 bytes、btoa/atob 限制、TextEncoder/TextDecoder、Base64 不是加密、padding 與常見 InvalidCharacterError。"
og_title: "Base64 中文／Emoji 亂碼怎麼辦？"
og_description: "Base64 編碼的是 bytes，不是直接編碼 Unicode 字元；先把文字轉 UTF-8 bytes 才是安全做法。"
canonical: "https://funnytools.win/guides/base64-utf8-unicode-guide/"
primary_keyword: "Base64 中文亂碼"
card_title: "Base64 中文、Emoji 為什麼亂碼？"
card_description: "從 Unicode、UTF-8 bytes 到 btoa/atob，一次釐清 Base64 文字編解碼。"
hero_title: "Base64 中文、Emoji 為什麼亂碼？UTF-8、btoa/atob 與正確編解碼完整指南"
hero_subtitle: "Base64 本身處理的是 bytes；中文與 Emoji 先要變成正確的 UTF-8 bytes，否則直接 btoa 很容易失敗。"
---

# Base64 中文、Emoji 為什麼亂碼？UTF-8、btoa/atob 與正確編解碼完整指南

英文 `hello` 做 Base64 很簡單，但把：

```text
你好😀
```

直接丟進某些 JavaScript `btoa()` 範例，常會遇到：

- `InvalidCharacterError`
- 亂碼
- 解碼後文字不一致

原因不是 Base64 不支援中文，而是：

> **Base64 編碼的是 bytes，不是 JavaScript Unicode 字串本身。**

> **速答：Base64 中文／Emoji 怎麼正確編碼？** 先把文字用 UTF-8 編成 bytes，再把這些 bytes 轉 Base64；解碼時反過來，先 Base64 → bytes，再用 UTF-8 解碼成文字。FunnyTools Base64 工具目前就是以 UTF-8 文字為核心處理，可正確處理中文、Emoji 與一般 Unicode 文字。不要把 Base64 當加密，也不要看到一串 Base64 就假設它一定是文字。

## 一、Base64 到底在編什麼？

Base64 是 binary-to-text encoding。

它把 bytes 重新表示成一組可傳輸字元。

因此真正流程不是：

`中文 → Base64`

而是：

`中文 → UTF-8 bytes → Base64`

## 二、為什麼英文常不會出錯？

ASCII 英文像：

```text
hello
```

每個字元的 code point 都落在單 byte 範圍，很多簡化 API 看起來可以直接處理。

中文、Emoji 則通常需要多個 UTF-8 bytes，因此問題才暴露。

## 三、`btoa()` 的常見限制

Browser `btoa()` 傳統上把每個 JS character 視為一個 byte-like value。

如果字元超出 byte 範圍，可能拋出：

> `InvalidCharacterError`

因此：

```js
btoa("你好")
```

不能被當成通用 Unicode Base64 方法。

## 四、正確 JavaScript 思路：TextEncoder

概念：

```js
const bytes = new TextEncoder().encode(text);
```

先把字串轉成 UTF-8 bytes。

再把 bytes 轉成 Base64 表示。

不同 runtime 有不同 API，但核心原則不變：

> 先明確決定文字 encoding。

## 五、解碼則用 TextDecoder

概念流程：

`Base64 → bytes → TextDecoder('utf-8') → text`

如果原始資料不是 UTF-8，卻硬用 UTF-8 decode：

> 仍可能亂碼。

所以 encoding 必須前後一致。

## 六、Base64 不是文字專用格式

一串 Base64 可能代表：

- UTF-8 文字；
- PNG；
- PDF；
- ZIP；
- certificate；
- 任意 binary。

因此 decode 出 bytes 後，還需要知道：

> 原始資料型別。

## 七、Base64 不是加密

這點非常重要。

```text
cGFzc3dvcmQ=
```

看起來不像明文，但任何人都能 decode。

所以：

> Base64 ≠ Encryption。

不要拿它保護：

- 密碼；
- token；
- API key；
- 私密資料。

## 八、Base64 通常會變大

Base64 大致把 3 bytes 轉成 4 個 Base64 characters。

所以原始 payload 的文字表示量通常增加約：

> 33%。

它不是 compression。

如果目標是縮小資料：

> 應先壓縮，再視協定需求 Base64。

## 九、`=` Padding 是什麼？

Base64 以固定 block 編碼。

如果最後 bytes 不滿完整組，常用：

```text
=
```

或：

```text
==
```

補足輸出長度。

某些 URL-safe Base64 會省略 padding，但接收方是否接受要看規格。

## 十、Base64 與 Base64url 不完全一樣

標準 Base64 常包含：

- `+`
- `/`

Base64url 通常用：

- `-`
- `_`

替代，並可能省略 padding。

JWT 常見 Base64url，而不是標準 Base64。

所以不要直接把兩種字串混用。

## 十一、為什麼 Decode 後是亂碼？

常見原因：

1. 原始文字不是 UTF-8；
2. Encode 時先錯誤轉 bytes；
3. Base64 string 被截斷；
4. 把 Base64url 當標準 Base64；
5. Decode 出來其實是 binary，不是文字。

## 十二、為什麼會出現 Invalid Base64？

可能是：

- 長度不合法；
- padding 被破壞；
- 混入空白或其他字元；
- URL-safe alphabet 與 standard alphabet 混用；
- copy/paste 少了一段。

不要在錯誤時自動「猜著補」。

## 十三、Data URL 和 Base64 差在哪？

完整 Data URL 可能是：

```text
data:image/png;base64,iVBORw0KGgo...
```

真正 Base64 payload 是逗號後面的部分。

如果 API 要純 Base64，卻把 `data:image/...;base64,` 一起傳：

> 可能失敗。

Task 004 已有圖片 Base64 專頁；本頁重點是文字與 UTF-8。

## 十四、Base64 與 URL Encoding 差在哪？

### Base64
binary-to-text representation。

### URL Encoding
把 URI component 中特殊 bytes percent-encode。

例如：

`A&B` → `A%26B`

兩者用途完全不同。

## 十五、Emoji 為什麼特別容易暴露錯誤？

Emoji 常超出基本 BMP，JavaScript 內部字串與 UTF-16 surrogate pair 會讓錯誤 byte conversion 更明顯。

所以用「逐 charCode 當 byte」的方法很危險。

## 十六、FunnyTools Base64 工具的適合用途

適合：

- UTF-8 文字編碼；
- 中文／Emoji 測試；
- API sample；
- 設定值檢查；
- 教學與除錯。

不適合拿來：

- 保護秘密；
- 判斷資料是否安全；
- 解碼未知來源後直接執行內容。

## 十七、未知 Base64 不要直接執行

如果解碼結果是：

- shell command；
- JavaScript；
- macro；
- executable bytes；

不要因為它「成功 decode」就執行。

Encoding 不提供可信度。

## 十八、推薦除錯流程

1. 先確認來源資料類型。
2. 若是文字，確認 encoding。
3. UTF-8 encode 成 bytes。
4. Base64 encode。
5. Decode 回 bytes。
6. UTF-8 decode。
7. 比較 round-trip 是否完全一致。

## 十九、Base64 交付前的 round-trip 檢查

做完編碼後，保留原始文字與解碼結果，逐字比較中文、Emoji、換行、制表符與結尾空白。對檔案則比較解碼後的 bytes 或雜湊，不要只看畫面上「似乎能打開」。如果資料會放進 JSON、URL 或 data URL，還要分別確認跳脫、Base64url alphabet、padding 與 MIME prefix 是否符合下游規格；Base64 本身不會替你處理這些外層格式。

遇到解碼失敗時，先判斷輸入是普通 Base64、Base64url、帶 padding 或省略 padding，再確認是否在複製過程中混入空白與換行。不要把任意字串補上 `=` 就當成修復，因為長度修正後仍可能是錯誤 alphabet 或截斷資料。這種分層檢查比反覆嘗試不同 decoder 更容易找到真正原因。

## 二十、FAQ

### Base64 支援中文嗎？
支援，前提是先用正確文字 encoding 轉 bytes。

### 為什麼 `btoa('中文')` 會錯？
因為 `btoa()` 不應被當成通用 Unicode string encoder。

### Base64 是加密嗎？
不是。

### Base64 會縮小資料嗎？
通常不會，反而增加約三分之一表示量。

### Emoji 可以 Base64 嗎？
可以，先 UTF-8 encode。

### Base64 和 Base64url 一樣嗎？
不完全一樣，alphabet 與 padding 規則可能不同。

## 二十一、延伸閱讀

- [Base64 編碼解碼工具](/tools/base64/)
- [URL 編碼完整指南](/guides/url-encoding-percent-encoding-guide/)
- [圖片 Base64 / Data URL 指南](/guides/image-base64-data-uri-guide/)
- [JSON 格式錯誤](/guides/json-error-fix-guide/)
- [文字與寫作工具](/category/text/)

## 頁面 CTA

**中文、Emoji 做 Base64 不想再遇到亂碼？** 使用 UTF-8 aware 的編解碼流程，並用 round-trip 驗證原文是否完整還原。

CTA：`開啟 Base64 編碼解碼`

## 圖卡與 ALT

`Unicode text → UTF-8 bytes → Base64 → bytes → UTF-8 text`

ALT：`Base64 UTF-8 中文編解碼流程圖，顯示文字先轉 bytes 再做 Base64`
