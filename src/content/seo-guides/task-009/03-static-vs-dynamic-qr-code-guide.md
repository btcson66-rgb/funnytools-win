---
slug: "/guides/static-vs-dynamic-qr-code-guide/"
seo_title: "Static vs Dynamic QR Code 差在哪？能不能改網址、追蹤掃描與失效風險完整指南｜FunnyTools"
meta_description: "靜態QR和動態QR差在哪？說明內容直接編碼、redirect服務、網址可修改、掃描追蹤、第三方平台失效與FunnyTools目前只產生靜態QR的差異。"
og_title: "Static vs Dynamic QR：圖案看起來一樣，控制權完全不同"
og_description: "Static把內容直接編進碼；Dynamic通常把一個可控制redirect URL編進碼，真正目的地由服務端改。"
canonical: "https://funnytools.win/guides/static-vs-dynamic-qr-code-guide/"
primary_keyword: "Static Dynamic QR Code 差別"
card_title: "Static vs Dynamic QR Code 差在哪？"
card_description: "能不能改目的地、會不會依賴第三方服務、能否追蹤掃描，差異都在QR背後的URL架構。"
hero_title: "Static vs Dynamic QR Code 差在哪？能不能改網址、追蹤掃描與失效風險完整指南"
hero_subtitle: "『動態QR』通常不是另一種QR符號標準，而是把可管理的redirect URL放進一般QR，再由伺服器決定最後去哪裡。"
---

# Static vs Dynamic QR Code 差在哪？能不能改網址、追蹤掃描與失效風險完整指南

你印了1000張海報。

QR連到：

`https://example.com/event-2026`

活動頁後來搬家。

這時才發現：

> QR圖不能改。

這就是Static與Dynamic最實際的差異。

> **速答：Static和Dynamic QR差在哪？**  
> **Static QR**把文字或網址直接編碼在QR圖形中，產生後內容固定；**Dynamic QR**在市場上的常見做法，是把一個由服務商或你自己控制的redirect URL編入QR，再由伺服器把掃描者導到真正目的地，因此之後可以改redirect、記錄掃描或設定條件。FunnyTools現行QR Code產生器是靜態生成工具，不代管redirect、不縮網址、也不提供掃描分析。若要印長期使用的QR，最穩定策略可以是使用你自己控制網域下的短redirect URL。

## 一、Static QR如何工作？

QR內直接放：

`https://example.com/menu`

掃描器decode後：

> 就得到這個URL。

QR本身沒有帳號、雲端或後台。

## 二、網址能改嗎？

不能改QR裡的payload。

如果你控制：

`example.com/menu`

則可以讓這個URL伺服器：

> redirect到新的頁面。

這其實是在網站層改，不是QR圖自己變。

## 三、Dynamic QR通常怎麼工作？

QR內不是最終頁：

`https://qr-service.example/abc123`

掃描後：

1. 先到QR服務
2. 服務記錄scan
3. 再redirect到真正目的地

管理者可在後台改：

> `abc123 → new destination`

QR圖不用重印。

## 四、Dynamic是QR標準的一部分嗎？

通常不是。

「Dynamic QR」多半是：

> SaaS / redirect service的產品概念。

底層仍是標準QR Code。

這點很重要，避免以為換了一種特殊QR格式。

## 五、動態QR的優勢

- 可以改目的地
- 可能有掃描統計
- 可設定campaign
- 有時可做A/B或地區導向
- 大量印刷後不用重做圖

## 六、動態QR的代價

你依賴：

- 第三方domain
- subscription
- redirect service
- analytics policy
- uptime

服務停止：

> QR可能一起失效。

## 七、免費動態QR最要小心什麼？

有些服務：
- 免費期到期
- QR停止轉址
- 強制升級
- 網域變更
- 插入中介頁

印刷前應讀清楚：

> 長期有效性與服務條款。

## 八、自己控制Redirect怎麼做？

如果你有網站：

`https://yourdomain.com/go/menu`

QR只放這個短URL。

日後在你的server／Cloudflare／hosting設定：

> redirect到新目的地。

這樣：
- QR短
- domain自己控制
- 可更換目的地

但analytics、維護與資安也要自己負責。

## 九、Static QR反而有什麼優點？

- 不依賴第三方QR SaaS
- 圖內內容直接可decode
- 不需帳號
- 不會因訂閱停止本身失效
- 更適合固定文字、永久URL

如果網址本來就穩定：

> Static非常合理。

## 十、Wi-Fi QR適合Dynamic嗎？

Wi-Fi內容通常是：

> SSID + authentication + password

這不是網頁redirect。

因此常見做法是：

> Static QR。

密碼變更：

> 重新產生並重印。

不要把Wi-Fi密碼送進不需要的第三方動態QR服務。

## 十一、名片聯絡資訊呢？

若是完整vCard文字：

> 靜態。

若是連到自己的contact page：

> 可以透過URL做redirect。

取決於：
- 要離線decode
- 還是要後續更新

## 十二、掃描追蹤是不是一定需要Dynamic？

若QR直接指向你自己的URL：

> 你的網站analytics也能看到該URL的訪問。

可以加入：
- UTM
- campaign path

不一定需要第三方動態QR。

但直接靜態QR無法在「完全不經伺服器」的情況下知道誰掃了。

## 十三、隱私注意

Dynamic QR的redirect服務可能看到：
- 時間
- IP
- user-agent
- referrer context
- location approximation

依服務政策而異。

正式活動應看：

> privacy policy。

## 十四、FunnyTools現行定位

FunnyTools：
- 本機生成
- PNG
- static content
- no hosting
- no redirect
- no scan tracking
- no URL shortening

這個定位反而適合：

> 不想把輸入交給QR SaaS的人。

## 十五、常見錯誤

- Static印完才想改內容
- 以為Dynamic是另一種QR標準
- 免費動態QR沒看有效期
- 第三方domain停掉整批印刷失效
- QR裡塞超長UTM造成密度增加
- 把Wi-Fi密碼送進不必要雲端服務

## 十六、快速選擇

| 情境 | 建議 |
|---|---|
| 永久官網 | Static 或自有redirect |
| 海報活動可能換頁 | 自有／可靠Dynamic redirect |
| Wi-Fi | Static |
| 固定短文字 | Static |
| 要第三方scan analytics | Dynamic service |
| 高隱私資料 | 避免不必要第三方 |

## 十七、FAQ

### FunnyTools是動態QR嗎？
不是，目前產生靜態QR。

### Static QR印出後可以改網址嗎？
QR payload不能；若該URL由你控制，可以在伺服器端redirect。

### Dynamic QR一定會過期嗎？
不一定，但取決於服務商與方案。

### 靜態QR可以統計掃描嗎？
QR本身不會；若指向你的網站，可以用網站analytics統計訪問。

### Dynamic QR掃描比較快嗎？
不一定，還多一個redirect步驟。

## 十八、延伸閱讀

- [QR Code產生器](/tools/qr-code-generator/)
- [QR掃不到](/guides/qr-code-not-scanning-print-guide/)
- [Wi-Fi QR指南](/guides/wifi-qr-code-format-security-guide/)
- [QR安全指南](/guides/qr-code-phishing-security-guide/)
- [QR/Barcode指南中心](/guides/qr-barcode/)

## 頁面 CTA

**目的地永久不變？Static最簡單。**

如果印刷後可能改網址，優先考慮自己可控制的短redirect URL。

CTA：`開啟QR Code產生器`

次要 CTA：`印刷前怎麼測？`

## 圖卡與 ALT

`Static: QR → final content`
`Dynamic: QR → redirect service → destination`

ALT：`Static與Dynamic QR Code架構比較圖，靜態碼直接包含目的地，動態碼先連redirect服務再導向最終頁`

## 變更網址前的檢查

如果 QR 直接包含最終網址，改網址就必須重新產生並重新印刷；這是靜態碼的簡單邊界。若採用動態碼，則要先確認轉址服務、管理帳號、到期規則與備援頁面，並在遷移前後用掃描器檢查 HTTP 狀態、HTTPS、最終目的地和 UTM 參數。不要因為能修改目的地，就忽略短網址服務本身也可能停用。

正式發布前應保存一份 QR 對應表，包含原始內容、產出日期、印刷尺寸、負責人與測試結果。對長期張貼的海報或包裝，至少安排定期抽測；對一次性活動，則在活動前後各測一次。這個流程能讓靜態與動態方案都具備可追查的維護紀錄。
