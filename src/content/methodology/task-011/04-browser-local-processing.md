---
slug: "/methodology/browser-local-processing/"
seo_title: "瀏覽器本機處理是什麼？Local Processing、localStorage、下載與第三方服務完整說明｜FunnyTools"
meta_description: "FunnyTools所說的瀏覽器本機處理是什麼？完整區分RAM中的工具輸入、localStorage偏好、下載檔案、GA4/AdSense連線與Email寄送，並教你如何用瀏覽器Network面板自行確認。"
canonical: "https://funnytools.win/methodology/browser-local-processing/"
primary_keyword: "瀏覽器 本機處理 隱私"
card_title: "「本機處理」到底是什麼？"
card_description: "把工具輸入、localStorage、下載檔案與第三方分析連線分開看，避免把『本機』誤解成『完全離線』。"
hero_title: "瀏覽器本機處理是什麼？Local Processing、localStorage、下載與第三方服務完整說明"
hero_subtitle: "一個工具在瀏覽器本機計算，不代表整個網站完全沒有任何網路請求；真正要問的是：你的工具輸入有沒有被送出去。"
---

# 瀏覽器本機處理是什麼？Local Processing、localStorage、下載與第三方服務完整說明

FunnyTools 常寫：

> 本機處理。

這句話需要講清楚。

## 一、本機處理的核心意思

對多數工具而言：

- 文字
- 數字
- 名單
- 圖片
- PDF

會在目前瀏覽器分頁中的 JavaScript / Web API 處理。

計算結果：

> 不需要把這些工具輸入送到 FunnyTools 自有應用伺服器計算。

## 二、本機處理 ≠ 完全離線網站

頁面本身仍可能需要：
- 下載HTML/CSS/JS
- Cloudflare
- Analytics
- AdSense
- 字型／外部資源

所以：

> Network面板有request，不代表工具輸入一定被上傳。

要看request payload。

## 三、瀏覽器記憶體

例如你選一個PDF：

瀏覽器可以透過 File API：

> 在分頁記憶體讀檔。

這不等於：

> 檔案被上傳。

但如果程式呼叫：
- fetch
- XMLHttpRequest
- form upload

就可能有網路傳輸。

所以最好的證明：

> code audit + Network test。

## 四、localStorage

部分工具可能保存：

- Pomodoro時間設定
- UI偏好
- favorites
- recently used

localStorage：

> 留在目前瀏覽器profile。

但它不是「永遠保密的安全保險箱」。

同origin JavaScript在瀏覽器權限下可能讀取。

不要把：
- password
- API key
- 銀行資訊

當成一般localStorage偏好保存。

## 五、下載檔案

當工具用：
- Blob
- Object URL
- Canvas toDataURL/toBlob

產生下載：

> 檔案可以直接由瀏覽器建立。

這不需要伺服器先存一份。

Task 011 應要求 Codex 對 PDF/Image tools 確認：

> 產出路徑確實符合頁面聲明。

## 六、Email寄送是例外

如果使用者主動選：

> 寄到信箱。

就一定需要：

> 網路服務。

FunnyTools目前政策已說明 Brevo email 流程。

因此工具頁若有Email功能：

> 不能仍用模糊的「所有資料永不離開裝置」。

要把：
- 本機處理階段
- 使用者主動寄送階段

分開説明。

## 七、GA4 / AdSense 會看到工具內容嗎？

網站可能載入分析／廣告script。

這些服務可能收到：
- page view
- IP
- device
- browser
- cookie / identifier

但這和：

> 把PDF內容或名單當event parameter傳出去

是兩件事。

Task 011 Codex應檢查：

- GA4 event是否意外帶入tool input
- URL query是否含敏感輸入
- error logging是否記錄完整資料

原則：

> 不把工具內容塞進analytics。

## 八、URL本身也可能洩漏

如果工具把使用者輸入放入：

`?text=secret`

那麼：
- browser history
- analytics
- referrer
- screenshot

都可能看到。

因此敏感工具：

> 不應把完整內容放query string。

## 九、使用者怎麼自己看？

Chrome / Edge：

1. F12
2. Network
3. 清除紀錄
4. 輸入一個明顯測試字串，例如 `TEST-LOCAL-12345`
5. 執行工具
6. 搜尋request payload／URL
7. 看是否出現該字串

這不是100%資安審計，但非常直觀。

## 十、DevTools測試要注意

如果第三方script很多：

> request很多。

不要只看「有網路」。

要找：

> 工具內容是否被傳送。

## 十一、圖片／PDF尤其適合本機處理

優點：
- 不需上傳時間
- 減少伺服器保存風險
- 私密文件更安心

限制：
- 手機RAM
- browser memory
- CPU
- 大檔速度

所以本機處理不是：

> 無限容量。

## 十二、公開資料處理標籤

Task 011 建議每個工具標準化：

### Processing
`Browser-local`

### Storage
`Not stored by FunnyTools`

### Network exceptions
`Analytics page requests only` / `Email feature when used`

### Local persistence
`Uses localStorage: yes/no`

不要全站一個「🔒 Local」圖示卻沒有細節。

## 十三、FAQ

### 本機工具可以在斷網後繼續用嗎？
若頁面與需要的資源已載入，有些功能可能可以；但網站本身不是正式離線App保證。

### localStorage會上傳嗎？
localStorage本身是本機儲存，但頁面JavaScript理論上可以讀後傳送，因此仍要看程式。

### 有GA4就代表PDF被Google看到嗎？
不代表。

### FunnyTools完全沒有第三方連線嗎？
不是，政策已揭露GA4、AdSense、Cloudflare、Brevo等情境。

## 延伸閱讀

- [Privacy Policy](/privacy/)
- [本站工具如何運作](/about-tools/)
- [檔案工具驗證](/methodology/file-tool-verification/)
- [工具驗證中心](/methodology/)
