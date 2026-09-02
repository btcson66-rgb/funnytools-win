---
slug: "/guides/qr-code-phishing-security-guide/"
seo_title: "QR Code 安全嗎？Quishing、假網址、貼紙覆蓋與掃碼詐騙完整指南｜FunnyTools"
meta_description: "掃QR Code前要注意什麼？完整說明QR phishing（quishing）、假網址、停車繳費貼紙覆蓋、簡訊QR、惡意登入頁、付款QR與安全掃描檢查流程。"
og_title: "QR Code 安全嗎？掃之前先看目的地"
og_description: "QR只是把內容藏在方格裡，不會替你證明網址是真的；詐騙者正是利用你看不到目的地這件事。"
canonical: "https://funnytools.win/guides/qr-code-phishing-security-guide/"
primary_keyword: "QR Code 安全"
card_title: "QR Code 安全嗎？"
card_description: "掃碼前先確認來源與URL，尤其是付款、登入、停車與突發簡訊中的QR。"
hero_title: "QR Code 安全嗎？Quishing、假網址、貼紙覆蓋與掃碼詐騙完整指南"
hero_subtitle: "一張QR可以指向官方網站，也可以指向仿冒登入頁；圖案本身不會告訴你哪一個是真的。"
---

# QR Code 安全嗎？Quishing、假網址、貼紙覆蓋與掃碼詐騙完整指南

QR Code 的最大便利：

> 你不用自己輸入網址。

這同時也是風險：

> 你在掃之前通常看不到完整目的地。

FTC已多次提醒，詐騙者會利用QR把人導向仿冒網站，甚至把自己的QR貼紙覆蓋在停車設備等原本的QR上。

> **速答：掃 QR Code 前怎麼判斷安全？**  
> 先看來源是否合理，再讓手機顯示URL預覽，不要立刻開啟；檢查domain拼字、子網域、HTTPS與是否出現奇怪短網址。對「立刻付款、重新登入、包裹異常、帳號停權、交通罰單」等製造急迫感的QR特別警惕。若是停車、政府、銀行、物流或帳號問題，最好直接開官方App或手動輸入你已知的官方網站，而不是使用訊息裡的QR。QR encoding本身不是安全認證。

## 一、Quishing 是什麼？

QR phishing常被稱為：

> Quishing。

攻擊者把phishing URL放入QR，誘導使用者掃描。

目的可能是：
- 偷帳號
- 偷信用卡
- 收款
- 安裝惡意程式
- 騙取個資

## 二、為什麼QR特別適合Phishing？

Email中的文字網址：

> `paypa1.example`

還可能被人看出拼字怪異。

QR本身：

> 只是一個圖。

使用者在掃前不知道內容。

## 三、貼紙覆蓋攻擊

FTC提醒過：

> 詐騙者可能在停車計費器原QR上貼自己的QR。

看起來仍像官方設備。

因此看到實體QR時要檢查：
- 是否有第二層貼紙
- 邊角翹起
- 顏色／印刷不一致
- 官方品牌是否對得上

## 四、簡訊或Email裡突然出現QR

如果訊息說：

- 包裹無法配送
- 帳號有可疑活動
- 立即驗證
- 不付款就罰款

並要求掃QR：

> 先不要掃。

FTC建議使用你已知正確的官方網站或電話自行確認。

## 五、掃碼後先看URL

手機通常會顯示目的地preview。

檢查：

### Domain
`example.com`

而不是：
`example-login-security.xyz`

### 拼字
`micros0ft`
`paypaI`

### 子網域
`bank.example.com`

和：

`bank.example.com.evil.tld`

完全不同。

真正註冊domain是最後可註冊層級。

## 六、HTTPS不代表網站是真的

HTTPS只代表：

> 連線有TLS保護。

詐騙網站也能申請憑證。

因此小鎖頭不是官方身份保證。

## 七、短網址要更小心

QR若指向：

> URL shortener

你在預覽階段看不到最終domain。

短網址本身不是惡意，但降低透明度。

高風險情境：
- 付款
- 登入
- 身分驗證

應更謹慎。

## 八、付款QR

掃到付款頁時：

1. 看收款人
2. 看金額
3. 看官方App
4. 確認是否有人要求你「不要掛電話」
5. 不受急迫感影響

FTC也曾提醒以QR導向加密貨幣付款的詐騙。

## 九、QR會直接安裝病毒嗎？

現代手機通常會先：
- 解析內容
- 顯示URL
- 需要使用者開啟

但惡意網站可能進一步：
- 誘導下載
- 要求安裝profile/app
- 利用瀏覽器漏洞

因此掃碼不是終點：

> 後續頁面仍要判斷。

## 十、不要輸入帳密

如果掃QR後突然要求：
- Email password
- Microsoft 365 login
- Google login
- 銀行帳密

先停下來。

改用：
- 官方App
- 手動書籤
- 已知官方網址

重新進入。

## 十一、QR Code 本身可以被複製

任何公開QR都可以：

> 截圖、拍照、重印。

所以不要把「有公司Logo的QR」理解成不可偽造的簽章。

Logo也能被複製。

## 十二、自己的QR怎麼提高信任？

如果你是活動主辦者：

- 在旁邊印完整domain
- 使用品牌自有domain
- 不只放「掃我」
- 説明掃描目的
- 避免陌生短網址
- 官網也放相同連結

讓使用者可以交叉確認。

## 十三、Dynamic QR也有供應商風險

若你使用第三方redirect：

> QR domain屬於服務商。

帳號被接管、服務失效或redirect被改：

> 整批QR目的地可能改變。

重要用途應有：
- account MFA
- provider security
- 監控
- 自有domain策略

## 十四、FunnyTools產QR是否會上傳內容？

現行FunnyTools QR工具：

> 在瀏覽器本機產生。

本站不接收你輸入的文字或URL。

但如果QR指向第三方網站：

> 掃描後自然會連到該第三方。

本機生成不代表目的地安全。

## 十五、掃到可疑QR後已輸入帳密怎麼辦？

一般安全處理：
1. 從可信裝置改密碼。
2. 若有重複密碼，同步改其他帳戶。
3. 啟用MFA／passkey。
4. 查看登入紀錄。
5. 若涉及銀行，聯絡金融機構。
6. 依所在地詐騙通報流程處理。

## 十六、安全掃碼清單

- [ ] QR來源合理
- [ ] 沒有可疑覆蓋貼紙
- [ ] 手機先顯示URL
- [ ] domain拼字正確
- [ ] 不被「立即處理」催促
- [ ] 付款／登入改走官方App
- [ ] 不安裝未知profile/app
- [ ] 不因Logo就信任

## 十七、FAQ

### QR Code本身有病毒嗎？
QR只是編碼資料；風險通常來自它導向的內容與後續行為。

### HTTPS就安全嗎？
不代表官方網站是真的。

### 可以掃餐廳菜單嗎？
可以，但仍可查看URL與domain。

### 付款QR怎麼確認？
核對收款人、官方App與現場來源。

### FunnyTools會檢查URL是否惡意嗎？
目前不會。它只是把你輸入的內容生成QR。

## 十八、延伸閱讀

- [QR Code產生器](/tools/qr-code-generator/)
- [Static vs Dynamic QR](/guides/static-vs-dynamic-qr-code-guide/)
- [QR掃不到排查](/guides/qr-code-not-scanning-print-guide/)
- [密碼管理器、MFA、Passkey](/guides/password-manager-mfa-passkey-guide/)
- [QR/Barcode指南中心](/guides/qr-barcode/)

## 頁面 CTA

**掃QR之前，先確認「誰給我的」和「它要去哪」。**

CTA：`開啟QR Code產生器`

次要 CTA：`自己的QR如何提高可信度？`

## 圖卡與 ALT

`Scan → Preview URL → Verify domain → Open`

ALT：`QR Code安全掃描流程圖，從掃描後先預覽網址、核對domain再決定是否開啟`
