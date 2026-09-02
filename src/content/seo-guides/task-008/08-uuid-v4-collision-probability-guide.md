---
slug: "/guides/uuid-v4-collision-probability-guide/"
seo_title: "UUID v4 會重複嗎？122位隨機、碰撞機率、Birthday Problem 與安全界線完整指南｜FunnyTools"
meta_description: "UUID v4真的不會重複嗎？依RFC 9562解釋128位格式中122位隨機、birthday paradox碰撞機率、資料庫unique constraint，以及為什麼UUID不是密碼、token或安全授權。"
og_title: "UUID v4 會不會碰撞？『幾乎不會』不等於數學上不可能"
og_description: "UUID v4有122個隨機bit，碰撞機率極低，但正式資料庫仍應使用唯一性約束並正確處理失敗。"
canonical: "https://funnytools.win/guides/uuid-v4-collision-probability-guide/"
primary_keyword: "UUID v4 會重複嗎"
card_title: "UUID v4 會重複嗎？"
card_description: "122個隨機bit讓碰撞極低，但識別碼仍應由資料庫約束真正保證唯一。"
hero_title: "UUID v4 會重複嗎？122位隨機、碰撞機率、Birthday Problem 與安全界線完整指南"
hero_subtitle: "UUID的名稱叫Universally Unique，不代表宇宙中存在數學上的絕對不重複保證；工程上依靠的是極大的識別空間加上資料庫約束。"
---

# UUID v4 會重複嗎？122位隨機、碰撞機率、Birthday Problem 與安全界線完整指南

常見UUID：

```text
36b8f84d-df4e-4d49-b662-bcde71a8764f
```

很多人會問：

> 「真的永遠不會重複嗎？」

答案是：

> **不是數學上的零機率，但正確產生時低到一般系統幾乎不用擔心。**

> **速答：UUID v4碰撞機率有多低？**  
> RFC 9562定義UUID v4共有128位，其中version與variant佔固定bit，因此真正隨機的部分為122位，也就是約 `2^122 ≈ 5.3×10^36` 種可能值。Birthday approximation下，大約要產生 `2.7×10^18` 個隨機UUID v4，碰撞機率才接近50%；約 `3.3×10^17` 個時才接近1%。但工程上仍不應只靠機率：資料庫主鍵應有UNIQUE/PRIMARY KEY constraint，若真的撞到就重新產生。FunnyTools UUID工具目前使用 `crypto.randomUUID()` 產生v4，但UUID不應被當作密碼、access token或秘密授權憑證。

## 一、UUID有128位

UUID標準總長：

> 128 bits。

文字常寫成：

`8-4-4-4-12`

共36字元，包括4個hyphen。

去掉hyphen：

> 32個hex digits。

## 二、為什麼v4不是128位全隨機？

RFC 9562規定：

- 4 bits：version = 4
- 2 bits：variant

剩下：

> 122 bits random。

因此可能的v4隨機空間：

`2^122`

## 三、`2^122`有多大？

約：

`5.3169 × 10^36`

這是一個極大的空間。

所以產生幾百萬、幾十億個UUID時，碰撞仍非常不可能。

## 四、為什麼不是產到2^122才會碰撞？

因為Birthday Problem。

當你從一個巨大空間隨機抽很多值：

> 任意兩個值相同的機率，比「某個指定值再次出現」更快上升。

近似公式：

`P(collision) ≈ 1 - exp(-n(n-1)/(2N))`

其中：
- `n` = 已產生數量
- `N` = 可能空間

## 五、50%碰撞大概多少個？

對UUID v4：

`N = 2^122`

50%碰撞門檻約：

`2.7 × 10^18`

也就是約2.7 quintillion個UUID。

這遠高於一般應用。

## 六、1%碰撞呢？

約：

`3.3 × 10^17`

仍然極大。

這些是理論birthday approximation，不是對單一特定系統的保證。

## 七、為什麼還需要資料庫Unique Constraint？

因為系統還可能出錯：

- generator bug
- wrong implementation
- import duplication
- migration
- manual data
- mock fixture重複
- concurrency問題

唯一性不能只交給機率。

資料庫應：

> enforce uniqueness。

## 八、如果真的撞到怎麼辦？

Insert失敗後：

1. 捕捉unique violation
2. 重新產生UUID
3. 再試一次
4. 若持續發生就視為系統異常

不要事先寫一大段「查資料庫是否存在再insert」而引入race condition，實際要依資料庫與ORM正確設計。

## 九、FunnyTools如何產生UUID？

現行工具使用：

`crypto.randomUUID()`

MDN說明它會用cryptographically secure random number generator建立v4 UUID。

工具：
- 一次1～100個
- 小寫
- 大寫
- 無連字號
- 複製
- TXT下載

## 十、大寫和小寫是不同UUID嗎？

通常不是。

Hex：

`a`和`A`

表示同樣數值。

但：
- string comparison
- database collation
- API validation

可能大小寫敏感。

最穩妥：

> 使用canonical lowercase representation。

## 十一、移除Hyphen會變成不同UUID嗎？

不會改變128位數值。

但：

> 不再是canonical文本格式。

有些validator只接受標準36字元形式。

因此不要為了短一點任意改格式，除非目標系統明確允許。

## 十二、UUID可以猜到嗎？

v4在高品質安全亂數下很難預測下一個值。

但：

> 「難猜」不等於「應當作秘密」。

公開URL中的UUID常被使用者、log、analytics看到。

如果存取控制只靠「別人猜不到ID」：

> 是不安全設計。

## 十三、UUID不是Access Token

Access token需要：
- 足夠entropy
- 明確生命周期
- authorization semantics
- rotation/revocation
- secure storage

UUID v4只是：

> identifier format。

不要把兩者混在一起。

## 十四、UUID也不是Password

密碼：
> 使用者／系統持有的秘密。

UUID：
> 通常可公開識別某筆資料。

概念完全不同。

## 十五、資料庫主鍵適合用v4嗎？

可以。

優勢：
- 分散式產生
- 不依賴central sequence
- 不暴露簡單遞增count

代價：
- random insertion locality較差
- index較大
- storage大於integer
- 人工閱讀較難

這也是v7興起的重要原因之一。

## 十六、測試資料可以用FunnyTools嗎？

可以批次產生測試UUID。

但不要把：
- production secret
- 真實user資料

混進測試fixture。

## 十七、常見錯誤

### 錯誤1
UUID v4絕對永不重複。
不是數學零機率。

### 錯誤2
機率低所以資料庫不用unique constraint。
仍應加。

### 錯誤3
UUID就是安全token。
不是。

### 錯誤4
大寫UUID等於新的UUID。
通常只是表示不同。

### 錯誤5
去hyphen就一定所有API都收。
不一定。

## 十八、FAQ

### UUID v4有幾個隨機bit？
RFC 9562定義122個random bits。

### 會不會撞？
機率不是0，但正確產生時極低。

### 需要查重嗎？
資料庫應以unique/primary key constraint保護。

### FunnyTools使用什麼API？
現行技術頁使用 `crypto.randomUUID()`。

### UUID可以拿來當API key嗎？
不應把一般UUID等同API secret。

## 十九、延伸閱讀

- [UUID v4產生器](/tools/uuid-generator/)
- [UUID v4 vs v7](/guides/uuid-v4-vs-v7-guide/)
- [亂數真的隨機嗎](/guides/secure-random-vs-math-random-guide/)
- [密碼與帳號安全](/guides/random-password-length-security-guide/)
- [時間戳記指南](/guides/unix-timestamp-seconds-milliseconds-guide/)

## 頁面 CTA

**需要測試資料或一般唯一識別碼？**

使用標準UUID v4，並在真正資料庫層仍保留unique constraint。

CTA：`開啟UUID v4產生器`

次要 CTA：`v4和v7怎麼選？`

## 圖卡與 ALT

`UUID v4 = 128 bits total`
`122 random bits + version/variant`

ALT：`UUID v4位元結構示意，128位中122位為隨機資料，其他位元固定為版本與variant`

## 二十、實務上如何檢查碰撞

在應用程式中，UUID 不應只被當成字串直接覆寫資料。建立記錄時，資料庫欄位應設定唯一限制；如果插入時收到唯一性衝突，就要讓程式重新產生識別碼或回報明確錯誤，而不是靜默捨棄其中一筆資料。這個防線處理的是實際資料完整性，不能用「碰撞機率很低」取代。

批次匯入時也可以先做集合檢查：讀取所有候選 UUID，計算總數與去重後的數量，兩者不同就停止匯入並保留原始檔供追查。檢查時要區分大小寫規則、前後空白和格式驗證，因為看起來不同的文字未必是有效 UUID，而看起來相同的識別碼也可能因清理流程被意外改寫。這些步驟能把機率討論連回可驗證的工程流程。

如果識別碼要跨服務傳遞，還應確認序列化格式、欄位長度與版本欄位沒有被截斷。API、訊息佇列和匯出 CSV 最好都保留完整的 36 字元文字表示，並在接收端重新驗證格式；不要把 UUID 當作浮點數或會自動轉換的數字欄位。這樣即使沒有發生碰撞，也能避免編碼或傳輸錯誤被誤判成碰撞。
