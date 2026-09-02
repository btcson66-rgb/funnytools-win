---
slug: "/guides/utf8-bytes-vs-characters-guide/"
seo_title: "UTF-8 位元組 vs 字元數差在哪？中文、英文、Emoji 為什麼 bytes 不一樣｜FunnyTools"
meta_description: "1個字元不一定等於1 byte。完整解釋 UTF-8 bytes、Unicode、ASCII、中文字與emoji的差異，以及 API、資料庫、CSV、後端欄位限制該看哪個數字。"
canonical: "https://funnytools.win/guides/utf8-bytes-vs-characters-guide/"
primary_keyword: "UTF-8 bytes 字元 差別"
hero_title: "UTF-8 位元組 vs 字元數差在哪？"
hero_subtitle: "看起來都是1個字，儲存大小卻可能完全不同。當規格寫 bytes，就不能只看 character count。"
---

# UTF-8 位元組 vs 字元數差在哪？

最容易出問題的情境是：

> 前端顯示「還沒超過 100 characters」，後端卻拒絕。

其中一個原因就是：

> 後端限制的是 bytes。

## Character 和 Byte 是不同層級

Character count 想回答：

> 這個文字序列有多長？

UTF-8 byte count 想回答：

> 這段文字編碼成 UTF-8 後需要多少位元組？

兩者不是同一件事。

## 英文最容易讓人產生錯覺

常見 ASCII 英文字母：

`A`

在 UTF-8 中只需要 1 byte。

所以如果你一直測：
- abc
- hello
- test123

會誤以為：

> 1 character = 1 byte。

但一碰到中文或 emoji 就不同。

## 中文

中文字通常在 UTF-8 中使用多個 bytes。

因此：

`你好`

看起來：
> 2 個漢字。

但 byte count：
> 會高於 2。

## Emoji

Emoji 情況更複雜。

有些 emoji：
- 一個 Unicode code point
- 但 UTF-8 需要多個 bytes

有些看起來「一個 emoji」甚至由：
- 多個 code points
- Zero Width Joiner
- variation selector
- skin tone modifier

組成。

因此：

> visible character、code point、UTF-16 length、UTF-8 bytes 都可能不同。

## JavaScript 怎麼取得 UTF-8 bytes？

瀏覽器的 `TextEncoder`：

> 會把 JavaScript string 編碼成 UTF-8 `Uint8Array`。

因此：

```js
new TextEncoder().encode(text).length
```

可以得到 UTF-8 byte length。

FunnyTools Character Counter 就是把這類 byte 概念直接顯示給一般使用者。

## 哪些情境一定要看 bytes？

### API Payload
後端可能限制：
- request size
- field byte size

### Database
欄位規格可能和：
- encoding
- DB type
- collation

有關。

不能只看前端 character count。

### CSV / Import
系統可能：
- 用 bytes 控制匯入
- 對 encoding 有要求

### Message Queue / Protocol
某些服務直接限制：
> payload bytes。

## 不要把 varchar(N) 一律理解成 N bytes

不同資料庫、版本與 encoding 定義不同。

所以：
> `varchar(255)` 不應由 FunnyTools 幫你推論一定等於255 UTF-8 bytes。

應看你的：
- DB 文件
- schema
- API spec

## 實際檢查流程

1. 先確認規格寫 `characters` 還是 `bytes`。
2. 若是 bytes，用 Character Counter 看 UTF-8 bytes。
3. 加入最壞案例：
   - 中文
   - emoji
   - 換行
   - 全形標點
4. 在真正 API／資料庫測一次。
5. 保留安全餘量。

## 常見錯誤

### 用 `.length` 當 UTF-8 bytes
JavaScript String `.length` 是 UTF-16 code units，不是 UTF-8 byte count。

### 英文測試成功就代表中文也成功
不一定。

### Emoji看起來一個就只占1 byte
錯。

### UTF-8 byte count 就是檔案大小
純文字檔還可能有：
- BOM
- newline encoding
- metadata／container

要看實際格式。

## 工具

## 截斷與驗證的注意事項

bytes 上限最容易在截斷時出錯。不能把字串當成固定寬度的字元陣列，從中間切開後直接送出；必須在完整 UTF-8 序列的邊界停止，並重新解碼確認文字沒有替換符號。JSON 還要計入跳脫引號與反斜線，HTTP 傳輸則要確認 Content-Length 使用的編碼。測試應涵蓋剛好低於上限、剛好等於上限和超過上限三種情況，並驗證伺服器實際收到的 bytes，而不是只看輸入框長度。

## API 與檔案限制的核對方式

遇到「最多幾 bytes」時，先確認限制套用在文字內容、HTTP body、資料庫欄位，還是完整檔案。文字內容通常可用 UTF-8 編碼後計算，完整檔案則還可能包括 BOM、換行格式、壓縮容器或 metadata。中文、日文、韓文與多數 emoji 通常比 ASCII 字母占用更多 bytes，但這不代表內容有問題，只代表傳輸編碼不同。

實作上可準備 ASCII、CJK、重音字母和 emoji 各一組樣本，先計算字元數，再計算 UTF-8 bytes，最後用實際 API request 或匯出檔確認。若即將達到上限，預留 JSON 引號、跳脫字元、換行和欄位名稱的空間，不要只計算輸入框裡的文字。任何截斷動作都要在編碼後進行，並確認不會把多 bytes 字元切成不完整序列。

[字元計數器](/tools/character-counter/)

延伸：
[Emoji 為什麼算不出直覺的「1個字」？](/guides/emoji-character-count-grapheme-guide/)

## 截斷前先確認編碼邊界

若系統必須把文字截到固定 bytes，不能直接依 JavaScript 的字串索引切割。先以 UTF-8 編碼取得位元組，再在完整字元邊界回退，並確認不會留下無效序列；對 grapheme cluster 需求更高的輸入，還要避免把一個使用者感知字元拆開。截斷後重新解碼並回讀，才知道送出的內容真的符合接收端限制。

相容性測試要覆蓋 API 回應、資料庫寫入、CSV 匯出、訊息佇列與檔案下載。記錄原文長度、UTF-8 bytes、截斷位置、HTTP 狀態與接收端錯誤，不要只在前端顯示一個剩餘數字。若不同服務使用不同單位，應在介面契約中明寫名稱，例如 `maxBytes`、`maxCodePoints` 或 `maxGraphemes`，避免把模糊的 `maxLength` 傳遍整條鏈路。

## 用實例確認 bytes 口徑

假設欄位限制是 32 bytes，可以準備只含 ASCII 的短句、同樣長度的中文句子、帶重音字母的句子和一組 emoji，逐一記錄 JavaScript `TextEncoder` 的結果。若資料會包在 JSON 中，再對完整 JSON body 計算，而不是只計算 value。若系統加入 BOM、固定換行或簽章，則應把它們列為檔案格式的一部分，與純文字內容分開報告。

遇到不同服務顯示不同數字時，先確認是否使用 UTF-8、UTF-16 或資料庫欄位自己的長度函式，再用同一個樣本逐層回讀。不要把「中文字通常三 bytes」當成所有 Unicode 的保證，也不要從錯誤訊息猜測截斷位置。把限制名稱、編碼、是否含包裝資料和超限處理寫進介面文件，後續維護才不會重新發生同一類誤判。
