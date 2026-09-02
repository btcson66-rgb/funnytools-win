---
slug: "/guides/random-password-length-security-guide/"
seo_title: "密碼要幾碼才安全？隨機密碼長度、NIST新規則、特殊字元與重複使用完整指南｜FunnyTools"
meta_description: "密碼要幾碼才安全？依NIST SP 800-63B最新要求說明15字元單因素最低長度、64字元支援、composition rules、blocklist、定期改密碼、隨機密碼與密碼管理器。"
og_title: "密碼不是8碼+符號就安全：2026應該怎麼看密碼長度？"
og_description: "長度、不可預測、每站唯一與妥善保存，比硬湊大寫小寫數字符號更重要。"
canonical: "https://funnytools.win/guides/random-password-length-security-guide/"
primary_keyword: "密碼要幾碼"
card_title: "密碼要幾碼才安全？"
card_description: "用目前NIST標準重新理解長度、隨機性、blocklist與composition rule，而不是停在8碼思維。"
hero_title: "密碼要幾碼才安全？隨機密碼長度、NIST新規則、特殊字元與重複使用完整指南"
hero_subtitle: "2026年的密碼安全重點已不是『每90天換一次Password1!』，而是長度、不可猜測、每個服務唯一、洩漏阻擋與更好的驗證方式。"
---

# 密碼要幾碼才安全？隨機密碼長度、NIST新規則、特殊字元與重複使用完整指南

「密碼至少8碼，要有大寫、小寫、數字、特殊符號。」

這套規則用了很多年。

但目前NIST SP 800-63B的方向已經不同。

> **速答：密碼至少幾碼？**  
> NIST SP 800-63B目前要求：如果密碼作為**單因素驗證**，驗證端最低應要求15個字元；如果密碼只是多因素驗證流程的一部分，可以允許較短，但最低仍為8個字元。系統應支援至少64字元的最大長度，不應強制其他字元組合規則，也不應要求使用者在沒有洩漏證據時定期換密碼。對使用者而言，最實用策略是：每個服務使用不同的長而隨機密碼，交給可信任的密碼管理器保存，並啟用MFA或passkey。

## 一、為什麼「8碼」不應再當安全標準？

8碼不是瞬間變成永遠不能用。

但作為單因素密碼：

> NIST目前已把最低要求提高到15字元。

這反映：
- 攻擊能力提升
- 密碼資料庫外洩
- GPU猜測
- 人類短密碼模式可預測

等現實。

## 二、NIST現在怎麼看Composition Rules？

NIST明確寫：

> 不應再強制「一定混合不同字元類型」這類composition rule。

原因之一：

人類會形成可預測模式：

- Password1
- Password1!
- Summer2026!

看起來符合規則，但仍容易猜。

## 三、那特殊字元完全沒用嗎？

不是。

對真正隨機產生的密碼：

> 增加可用alphabet可以增加每個字元的可能性。

但核心不是：

> 有沒有一個驚嘆號。

而是：
- 長度
- 隨機性
- 唯一性

## 四、隨機密碼和人類自創密碼差在哪？

人類習慣使用：
- 名字
- 生日
- 年份
- 鍵盤模式
- 常見單字
- 服務名稱

所以可預測。

隨機生成：

> 每個位置由安全亂數選取。

通常更難猜。

## 五、FunnyTools密碼產生器目前怎麼做？

現行工具：

- 長度4～64
- 大寫
- 小寫
- 數字
- 符號
- 可排除O0l1I
- Web Crypto
- rejection sampling
- 至少包含每個已選字元群組中的一個字元
- 本機產生
- 不保存結果

這是「產生」工具，不是帳號安全掃描器。

## 六、為什麼工具最低4碼不代表推薦4碼？

UI允許4～64，是工具輸入範圍。

這不代表：

> 4碼登入密碼安全。

文章和工具說明必須把：

> 能產生

和：

> 建議用途

分開。

## 七、16碼隨機密碼如何？

對一般網站帳號，16個真正隨機字元是一個實用的強起點。

但：
- 服務政策
- 字元集
- 威脅模型

不同。

若網站允許更長且密碼管理器可以保存：

> 沒有必要刻意縮短。

## 八、為什麼系統應至少允許64字元？

NIST建議驗證端最大長度至少64字元。

原因包括支援：
- 長passphrase
- 密碼管理器
- 更長隨機字串

而不是用很短的max length限制使用者。

## 九、Blocklist是什麼？

建立／更改密碼時，系統應把候選密碼與：
- 常見密碼
- 預期密碼
- 已知洩漏密碼

blocklist比較。

例如：
`password`
`123456`
或服務名稱衍生字。

這比要求每個人機械加一個`!`更有針對性。

## 十、需要每90天換密碼嗎？

NIST目前明確：

> 不應要求定期更換，除非有洩漏／ compromise 證據或使用者主動要求。

因為被迫定期換：
- 容易形成Password1 → Password2
- 增加記憶負擔
- 可能讓使用者重複使用

## 十一、密碼可以重複使用嗎？

不應。

如果A網站資料庫外洩，而你B網站用相同密碼：

> 攻擊者可做credential stuffing。

所以每個服務應使用：

> unique password。

## 十二、怎麼記住每個網站不同密碼？

不要靠腦袋記100組。

使用可信任：

> password manager。

它可以：
- 產生
- 保存
- 自動填寫
- 協助每站唯一

主密碼與帳戶恢復策略仍要妥善處理。

## 十三、Passphrase是不是更好？

對需要自己記憶的主密碼：

> 長passphrase可能比短而複雜字串更可用。

例如多個不相關詞組成長字串。

但不要拿常見名言或歌詞直接當密碼。

如果可以讓管理器隨機產生：

> 更好。

## 十四、排除 O0l1I 會降低安全嗎？

字元池略縮小，所以理論entropy會略降。

但如果密碼需要：
- 手動輸入
- 電話口述
- 印在紙上

排除易混淆字元可以提高可用性。

可透過：

> 增加長度

輕鬆補回。

## 十五、強度條只是Heuristic

FunnyTools現行「強／非常強」提示：

> 主要依長度與字元種類。

它不會：
- 查洩漏資料庫
- 模擬破解
- 評估網站hash
- 評估MFA
- 判斷phishing

因此不能把標籤當安全保證。

## 十六、不要把產生的密碼當Crypto Key或Seed Phrase

FunnyTools現行工具明確不應用作：
- crypto seed phrase
- wallet recovery phrase
- cryptographic key material
- 私鑰

這些系統有自己的格式、entropy與checksum規範。

## 十七、剪貼簿也是風險面

本機產生不等於整個裝置無風險。

密碼複製後可能經過：
- Clipboard history
- Cloud clipboard
- Browser extension
- Malware

所以建議：

> 直接存進密碼管理器，而不是長期放剪貼簿。

## 十八、密碼不是Phishing-resistant

NIST明確指出：

> Passwords are not phishing-resistant.

再強的密碼，如果你把它輸入假登入頁：

> 仍可能被偷。

所以要搭配：
- MFA
- Passkey
- 正確domain檢查

## 十九、常見錯誤

### 錯誤1
8碼+!就認為足夠。

### 錯誤2
每個網站用同一個強密碼。

### 錯誤3
每90天把年份改一下。

### 錯誤4
把強度條當安全審計。

### 錯誤5
隨機密碼生成後放在記事本。

### 錯誤6
拿一般密碼產生器做錢包seed。

## 二十、FAQ

### 2026密碼至少幾碼？
NIST目前對單因素密碼要求驗證端最低15字元；MFA流程中的密碼最低可8字元。

### 一定要特殊符號嗎？
NIST不建議驗證端強制composition rule；真正隨機密碼使用更大字元集仍可提高搜尋空間。

### 要多久換一次？
沒有compromise證據時，不應只因時間到了就強制換。

### 16碼夠嗎？
對一般隨機帳號密碼是很好的起點，但實際仍看服務限制與威脅模型。

### FunnyTools會保存密碼嗎？
現行工具在本機產生，不送到FunnyTools伺服器，也不提供歷史紀錄。

## 二十一、延伸閱讀

- [密碼產生器](/tools/password-generator/)
- [密碼管理器、MFA與Passkey指南](/guides/password-manager-mfa-passkey-guide/)
- [亂數真的隨機嗎](/guides/secure-random-vs-math-random-guide/)
- [Modulo Bias指南](/guides/rejection-sampling-modulo-bias-guide/)
- [UUID為什麼不能當密碼](/guides/uuid-v4-collision-probability-guide/)

## 頁面 CTA

**需要建立新的唯一帳號密碼？**

用安全亂數產生長密碼，直接存進可信任的密碼管理器，並為重要帳號啟用MFA或passkey。

CTA：`開啟密碼產生器`

次要 CTA：`下一步：MFA與Passkey`

## 圖卡與 ALT

`Long + random + unique + managed + MFA/passkey`

ALT：`現代密碼安全五層策略圖，包含長度、隨機性、每站唯一、密碼管理器與多因素驗證`
