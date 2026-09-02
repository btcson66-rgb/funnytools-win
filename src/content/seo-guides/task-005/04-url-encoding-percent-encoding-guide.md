---
slug: "/guides/url-encoding-percent-encoding-guide/"
seo_title: "URL 編碼是什麼？%20、+、%2F、中文網址與 encodeURIComponent 完整指南｜FunnyTools"
meta_description: "URL encoding / percent-encoding 是什麼？完整解釋 %20、+、%2F、%3F、%26、中文與 Emoji 如何編碼，encodeURIComponent、URLSearchParams、整條網址與 query value 的差異，以及 double encoding。"
og_title: "URL 編碼完整指南：%20、+、%2F 到底代表什麼？"
og_description: "只編碼需要的 URL component；把整條網址亂 encode 或 encode 兩次都可能把連結弄壞。"
canonical: "https://funnytools.win/guides/url-encoding-percent-encoding-guide/"
primary_keyword: "URL 編碼"
card_title: "URL 編碼 %20、+、%2F 是什麼？"
card_description: "理解 percent-encoding、query parameter 與 double encoding，避免網址參數被解析錯。"
hero_title: "URL 編碼是什麼？%20、+、%2F、中文網址與 encodeURIComponent 完整指南"
hero_subtitle: "URL 中的空格、&、=、#、斜線都有語法角色，真正的重點不是全部編碼，而是編對 component。"
---

# URL 編碼是什麼？%20、+、%2F、中文網址與 encodeURIComponent 完整指南

你可能看過 `hello%20world`、`%E5%8F%B0%E7%81%A3` 或 `q=hello+world`。這些都和 URL encoding 有關，但 `%20` 和 `+` 並不是在所有位置都完全等價。

> **速答：URL 編碼是什麼？** URL percent-encoding 會把不能直接或不應直接出現在某個 URI component 的 bytes 表示成 `%HH`。空格常見為 `%20`；UTF-8 中文會先轉成 UTF-8 bytes，再逐 byte percent-encode。Query form encoding 中，`URLSearchParams` 序列化空格時常使用 `+`。最安全的做法是只編碼參數值或特定 component，不要把完整 `https://...?...` 整條網址無差別丟進 `encodeURIComponent()`，也不要重複編碼。

## 一、什麼是 Percent-Encoding？

形式：

```text
%HH
```

`HH` 是一個 byte 的 16 進位值。

ASCII space 是 hex `20`，所以常見為 `%20`。

## 二、中文為什麼變成很多 `%E5...`？

中文是 Unicode。常見流程是：

`Unicode → UTF-8 bytes → Percent-Encoding`

一個中文字在 UTF-8 通常不只一個 byte，所以會看到數個 `%HH`。

## 三、`%20` 是什麼？

通常代表空格。

```text
hello world
```

可表示為：

```text
hello%20world
```

## 四、那 `+` 也是空格嗎？

在 `application/x-www-form-urlencoded` 與 `URLSearchParams` query serialization 中，space 常序列化為 `+`。

所以：

```text
q=hello+world
```

常被解析為 `hello world`。

但不要把這個規則套到 URL 所有位置。

## 五、真正的 Plus 號怎麼辦？

如果 value 真的是 `C++`，form-style parser 可能把 `+` 當空格。

真正 plus 可 percent-encode 為：

```text
%2B
```

例如：

```text
q=C%2B%2B
```

## 六、`%2F` 是什麼？

Slash `/`。

Slash 在 path 裡常有結構意義，例如：

```text
/users/123
```

如果 slash 是資料值的一部分，是否 encode 要看它所在 component 與 server routing。

## 七、`%3F`、`%26`、`%3D`、`%23`

| 字元 | 常見 encoded | URL 中常見角色 |
|---|---|---|
| `?` | `%3F` | query 起點 |
| `&` | `%26` | query parameter 分隔 |
| `=` | `%3D` | key/value 分隔 |
| `#` | `%23` | fragment 起點 |

如果 value 本身含這些字元，就要避免它們被誤認成 URL 結構。

## 八、為什麼 `A&B` 必須注意？

如果 query 是：

```text
?name=A&B
```

parser 可能把 `B` 當下一個 parameter。

若 value 本身是 `A&B`，應安全表示成：

```text
A%26B
```

## 九、`#` 為什麼常造成參數被截掉？

URL 中 `#` 後面通常是 fragment，而且 fragment 通常不會作為 HTTP request query 傳給 server。

如果 query value 本身含 `#`，應正確 encode 為 `%23`。

## 十、encodeURIComponent() 適合什麼？

JavaScript：

```js
encodeURIComponent(value)
```

主要適合單一 URI component，例如 query parameter value。

```js
encodeURIComponent("A&B")
```

可以避免 `&` 被誤解為 parameter separator。

## 十一、為什麼不應把整條網址丟 encodeURIComponent？

原網址：

```text
https://example.com/search?q=hello
```

整條編碼後：

```text
https%3A%2F%2Fexample.com%2Fsearch%3Fq%3Dhello
```

這已不是可直接導覽的完整 URL，而是「被編碼的一段字串」。

## 十二、encodeURI() 與 encodeURIComponent() 差別

概念上：

- `encodeURI()` 保留較多 URL 結構字元；
- `encodeURIComponent()` 對單一 component 更積極。

但在現代 JavaScript 中，通常更推薦使用 URL / URLSearchParams API 正確組裝網址，而不是手動串字串。

## 十三、URLSearchParams 的好處

```js
const params = new URLSearchParams();
params.set("q", "C++ & 台灣");
```

你提供未編碼值，API 會處理 query serialization。

不要先自己 encode，再丟進 URLSearchParams，否則可能 double encode。

## 十四、Double Encoding 是什麼？

原始：

```text
hello world
```

第一次：

```text
hello%20world
```

第二次把 `%` 又 encode：

```text
hello%2520world
```

因為 `%25` 就是 `%`。

常見症狀：

- `%252F`
- `%2520`
- `%253A`

## 十五、怎麼判斷是否 encode 兩次？

你預期 `%2F`，卻看到 `%252F`，通常表示 `%2F` 這串文字本身又被 encode。

## 十六、Decode 也可能報錯

不完整 percent sequence：

```text
%
%2
%GG
```

decoder 可能失敗。不要對任何任意字串無條件 decode。

## 十七、URL Decode 不代表安全

Decode 只是把內容變可讀，不會：

- 驗證 domain；
- 檢查 phishing；
- 判斷 malware；
- 驗證 redirect。

未知連結仍需檢查。

## 十八、不要把 Secret 放 Query String

即使 encode 後看起來像亂碼，secret 仍可能進入：

- browser history；
- server logs；
- analytics；
- referrer；
- proxy logs。

Encoding ≠ Encryption。

## 十九、常見表

| 字元 | Encoded |
|---|---|
| space | `%20` |
| `+` | `%2B` |
| `/` | `%2F` |
| `?` | `%3F` |
| `&` | `%26` |
| `=` | `%3D` |
| `#` | `%23` |
| `%` | `%25` |

## 二十、推薦 Debug 流程

1. 取得原始未編碼 value。
2. 確認它位於 path、query 還是 fragment。
3. 使用 URL / URLSearchParams。
4. 只 encode 一次。
5. 看 Network tab 的 final request。
6. Server 端確認實際收到的值。
7. 看見 `%25` 疊加時檢查 double encoding。

## 二十一、path、query 與 fragment 的差別

同一個字元放在 URL 不同位置，責任也不同。path 通常代表資源階層，query 是傳給伺服器的參數，fragment 則由瀏覽器在收到頁面後處理。不要把整條已經含有 `?`、`&` 的網址當成一個 query value 再 encode；應先組合結構，再對每個 value 編碼。這樣才能保留分隔符的功能，也能避免 `%3F`、`%26` 出現在錯誤層級。

測試時準備包含空格、中文、斜線、問號、井號與百分比符號的資料。送出後在瀏覽器 Network tab 查看實際 request URL，再在伺服器端確認收到的值。若來源資料本身可能已經編碼，先標記它的狀態並只解碼一次，否則 double encoding 會讓錯誤一路累積。

還要特別區分「顯示文字」與「傳輸值」。網址列可能把字元重新顯示成可讀形式，開發者工具也可能提供 decode 後的預覽，因此除錯時應同時記錄原始 value、組合後的 URL，以及伺服器解析出的參數。對搜尋、登入或檔案名稱等敏感流程，則要另外確認 encode 之後沒有改變大小寫、斜線或保留字元的語意，並測試空值與超長值的邊界行為。

## 二十二、FAQ

### `%20` 是空格嗎？
通常是 percent-encoded space。

### `+` 一定是空格嗎？
不一定；在 form-style query parsing 中常代表 space。

### `%2F` 是什麼？
Slash `/`。

### 為什麼看到 `%252F`？
常見原因是 `%2F` 又被 encode 一次。

### URL encoding 是加密嗎？
不是，可以解碼。

## 二十三、延伸閱讀

- [URL 編碼解碼工具](/tools/url-encoder/)
- [Base64 UTF-8 中文指南](/guides/base64-utf8-unicode-guide/)
- [JSON 格式錯誤](/guides/json-error-fix-guide/)
- [Markdown 語法預覽](/guides/markdown-syntax-preview-guide/)
- [文字與寫作工具](/category/text/)

## 頁面 CTA

**要編碼的是 query value，不是整條網址？** 把單一 component 放進 FunnyTools URL 編碼工具；如果你正在寫程式，優先用 URL / URLSearchParams。

CTA：`開啟 URL 編碼解碼`

## 圖卡與 ALT

`Raw value → Identify component → Percent encode once → Build URL → Verify request`

ALT：`URL percent encoding 流程圖，說明只編碼網址參數並避免 double encoding`
