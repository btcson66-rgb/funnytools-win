---
slug: "/guides/secure-random-vs-math-random-guide/"
seo_title: "亂數真的隨機嗎？Web Crypto、CSPRNG、Math.random 與安全亂數完整指南｜FunnyTools"
meta_description: "電腦亂數是真的隨機嗎？完整解釋 PRNG、CSPRNG、Web Crypto getRandomValues、Math.random、entropy、seed 與一般抽籤／密碼的差異，並說明 FunnyTools 哪些工具使用安全亂數來源。"
og_title: "亂數真的隨機嗎？Web Crypto 和 Math.random 差在哪？"
og_description: "一般遊戲亂數和安全亂數不是同一個等級；密碼、UUID與公平抽選應使用適合的亂數來源。"
canonical: "https://funnytools.win/guides/secure-random-vs-math-random-guide/"
primary_keyword: "亂數真的隨機嗎"
card_title: "亂數真的隨機嗎？"
card_description: "從PRNG、CSPRNG、Web Crypto到Math.random，把『看起來隨機』和『適合安全用途』分清楚。"
hero_title: "亂數真的隨機嗎？Web Crypto、CSPRNG、Math.random 與安全亂數完整指南"
hero_subtitle: "電腦不需要每次都接一顆實體骰子才能產生可信亂數；真正要分的是一般偽亂數與密碼學安全偽亂數。"
---

# 亂數真的隨機嗎？Web Crypto、CSPRNG、Math.random 與安全亂數完整指南

「電腦是照程式跑的，那亂數怎麼可能是真的隨機？」

這是一個很好的問題。

大部分電腦亂數並不是每次直接量測一個物理隨機事件，而是使用演算法產生序列。但這不代表所有亂數都一樣。

> **速答：Math.random 和 Web Crypto 差在哪？**  
> `Math.random()` 是一般用途的偽亂數來源，適合動畫、簡單模擬、非安全遊戲與介面效果，但不設計用來產生密碼、token或其他秘密；`crypto.getRandomValues()` 則由瀏覽器提供密碼學強度的亂數值，實作會使用具足夠 entropy 的系統來源來 seed 密碼學安全 PRNG。FunnyTools 的隨機數字、姓名抽籤、輪盤、骰子與密碼產生器目前使用 Web Crypto，而不是在安全用途上退回 `Math.random()`。

## 一、什麼是 PRNG？

PRNG = Pseudo-Random Number Generator。

它用一個內部狀態和演算法，產生看起來像亂數的序列。

如果：
- 演算法已知
- seed 已知
- 狀態可預測

同一套PRNG可能重現相同序列。

這對：
- 測試
- 遊戲地圖
- 可重現模擬

反而很有用。

## 二、什麼是 CSPRNG？

CSPRNG = Cryptographically Secure Pseudo-Random Number Generator。

除了統計上看起來隨機，還要求：

> 即使攻擊者知道大量過去輸出，也不應容易預測下一個輸出。

這是安全用途的關鍵差異。

## 三、Web Crypto 的 getRandomValues 做什麼？

MDN把 `crypto.getRandomValues()` 定義為：

> 取得 cryptographically strong random values。

瀏覽器會把你提供的整數 TypedArray 填入安全亂數。

實際PRNG演算法可能因瀏覽器與作業系統不同，但應以高 entropy 系統來源 seed。

## 四、它是不是「真正物理亂數」？

不必這樣理解。

MDN特別說明，實作通常不是每次直接用 true random generator，而是：

> 使用被足夠 entropy seed 的 PRNG。

所以更精確的說法是：

> 密碼學安全偽亂數。

## 五、Entropy 是什麼？

可以把 entropy 想成：

> 系統中攻擊者難以預測的不確定性。

作業系統可能從不同系統事件、硬體來源或平台隨機介面累積 entropy，再提供給安全亂數系統。

使用者通常不需要自己提供 seed。

## 六、為什麼不要自己用時間當 Seed？

例如：

```text
seed = Date.now()
```

時間通常可被猜到。

如果攻擊者知道：
- 產生的大概時刻
- 演算法

就可能大幅縮小搜尋空間。

安全亂數應交給：

> 系統／瀏覽器安全API。

## 七、Math.random 有什麼問題？

`Math.random()` 並不是「壞掉」。

它適合：

- UI小動畫
- 非安全遊戲
- 隨機顯示範例
- 一般統計示範

問題是：

> 規格沒有承諾它達到密碼學安全。

所以不能拿它來產生：
- 帳號密碼
- session token
- recovery code
- API secret
- cryptographic key

## 八、抽籤一定要 CSPRNG 嗎？

一般課堂與活動抽選：

> 使用安全亂數來源是很好的做法。

FunnyTools目前：
- Random Number
- Name Picker
- Wheel
- Dice

都採 Web Crypto。

這能降低演算法可預測性的疑慮。

但「公平抽籤」還不只亂數來源，還需要：
- 候選名單正確
- 重複項目處理
- 規則先公開
- 是否抽後移除
- 結果紀錄

## 九、密碼更需要安全亂數

密碼本身是秘密。

如果字元選擇可被預測：

> 看起來很亂，也可能只是有限序列。

FunnyTools密碼產生器目前使用：
`crypto.getRandomValues()`

並使用 rejection sampling 避免字元選擇偏差。

## 十、UUID v4 呢？

FunnyTools UUID v4 使用：

`crypto.randomUUID()`

MDN說明它使用 cryptographically secure random number generator 建立 v4 UUID。

但：

> UUID仍不是密碼或access token。

它的主要目的是識別，不是保密。

## 十一、動畫隨機 ≠ 結果隨機

輪盤畫面轉了5圈，不代表「動畫自己決定結果」。

FunnyTools現行Wheel：

> 先用Web Crypto選出index，再讓動畫落到那個segment。

所以動畫是呈現方式。

真正的隨機決策已經先完成。

## 十二、短期看起來不平均正常嗎？

非常正常。

連續10次擲骰：

> 不保證每一面都出現。

隨機性不等於：

> 每短短幾次就平均。

反而如果每6次d6都剛好1～6各一次，才不像一般獨立擲骰。

## 十三、統計上均勻 ≠ 安全

一個PRNG可能：
- 頻率看起來很平均
- 卡方檢定也沒有明顯異常

但內部狀態可被預測。

因此：

> 統計隨機性測試不能單獨證明 cryptographic security。

## 十四、安全亂數也不等於正式公證

即使使用Web Crypto：

> 一般瀏覽器工具仍沒有自動提供不可竄改audit log、第三方見證、簽章、承諾機制或法規程序。

若是正式抽獎：
- 法律效果
- 金錢
- 高價獎品
- 公開爭議

應使用可稽核流程與相應制度。

## 十五、FunnyTools目前哪些工具使用安全亂數？

目前已確認：

- 隨機數字：Web Crypto
- 姓名抽籤：Web Crypto + Fisher–Yates
- 輪盤：Web Crypto
- 骰子：Web Crypto
- 密碼：Web Crypto
- UUID v4：`crypto.randomUUID()`

Codex上架時仍應重新掃repo，不要只靠任務包舊資訊。

## 十六、常見錯誤

### 錯誤1
「偽亂數」就等於不安全。
錯。CSPRNG也是偽亂數，但設計目標不同。

### 錯誤2
Math.random適合密碼。
不適合。

### 錯誤3
短期不平均就代表工具有偏差。
不一定。

### 錯誤4
動畫很華麗就代表公平。
不代表。

### 錯誤5
CSPRNG就等於抽獎可公證。
不等於。

## 十七、快速比較

| 來源 | 一般模擬 | 抽籤 | 密碼／秘密 |
|---|---|---|---|
| Math.random | 可 | 不建議正式 | ❌ |
| Web Crypto | 可 | ✅一般活動 | ✅適合作為安全亂數來源 |
| 實體骰子 | 可 | 可 | 不適合直接產密碼 |
| 公證抽獎系統 | 視系統 | 正式用途 | 不等於密碼系統 |

## 十八、FAQ

### 電腦亂數是假亂數嗎？
多數是PRNG；安全用途會使用具足夠entropy的CSPRNG。

### Math.random能拿來抽班級座號嗎？
低風險用途可以，但FunnyTools目前使用更強的Web Crypto。

### Web Crypto可以拿來產密碼嗎？
它是適合密碼學用途的亂數來源，但完整密碼安全還包括長度、唯一性、儲存、MFA等。

### 使用CSPRNG就保證抽籤公平嗎？
不保證名單、規則與稽核流程公平。

### UUID v4是安全token嗎？
不是。UUID主要是identifier，不應當成秘密。

## 十九、延伸閱讀

- [隨機數字產生器](/tools/random-number-picker/)
- [拒絕取樣與Modulo Bias](/guides/rejection-sampling-modulo-bias-guide/)
- [公平抽籤怎麼設計](/guides/fair-random-draw-audit-guide/)
- [密碼長度與安全指南](/guides/random-password-length-security-guide/)
- [UUID v4碰撞機率](/guides/uuid-v4-collision-probability-guide/)

## 頁面 CTA

**需要一般活動或測試用亂數？**

優先使用有清楚說明亂數來源與限制的工具；秘密用途不要使用 `Math.random()`。

CTA：`開啟隨機數字產生器`

次要 CTA：`為什麼還要拒絕取樣？`

## 圖卡與 ALT

`Math.random → general PRNG`
`Web Crypto → cryptographically strong random values`

ALT：`Math.random與Web Crypto比較圖，區分一般偽亂數與密碼學安全亂數的用途`
