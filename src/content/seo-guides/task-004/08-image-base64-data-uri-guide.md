---
slug: "/guides/image-base64-data-uri-guide/"
seo_title: "圖片 Base64 是什麼？Data URL、大小增加、HTML/CSS 內嵌與適用情境完整指南｜FunnyTools"
meta_description: "圖片 Base64 是什麼？完整解釋 data:image/png;base64、Data URL、為什麼 Base64 通常比原檔大約三分之一、HTML/CSS 內嵌、API 純 Base64 差異，以及什麼時候不該用。"
og_title: "圖片 Base64 / Data URL 完整指南"
og_description: "Base64 不是圖片壓縮，也不是加密；它把二進位資料轉成文字，通常反而變大。"
canonical: "https://funnytools.win/guides/image-base64-data-uri-guide/"
primary_keyword: "圖片 Base64"
card_title: "圖片 Base64 是什麼？"
card_description: "Data URL 可以把小型圖片內嵌到文字，但通常會增加資料量，也失去獨立快取優勢。"
hero_title: "圖片 Base64 是什麼？Data URL、大小增加、HTML/CSS 內嵌與適用情境完整指南"
hero_subtitle: "Base64 是編碼，不是壓縮、不是加密、也不是圖片格式轉換。"
---

# 圖片 Base64 是什麼？Data URL、大小增加、HTML/CSS 內嵌與適用情境完整指南

你可能看過：

```text
data:image/png;base64,iVBORw0KGgoAAA...
```

這不是什麼神秘圖片格式。

它通常是：

> **把圖片 bytes 轉成 Base64 文字，再放進 Data URL。**

> **速答：圖片 Base64 是什麼？**  
> Base64 是把二進位資料表示成文字的一種編碼。Data URL 可以寫成 `data:image/png;base64,...`，讓 HTML、CSS 或某些 API 直接包含圖片資料。它不是壓縮：Base64 本體通常會比原二進位資料增加約 4/3 的字元資料量，再加上 Data URL header。適合很小、一次性、需要內嵌的資源；大型照片、可重複快取的網站圖片通常更適合一般 URL。

## 一、為什麼需要 Base64？

有些文字環境不能直接放 binary bytes。

例如：
- JSON；
- HTML attribute；
- CSS；
- API payload；
- config。

Base64 把 bytes 映射成可傳輸文字。

## 二、Base64 的 4/3 膨脹從哪來？

Base64 每：

> 3 bytes binary

通常轉成：

> 4 個 Base64 characters。

所以理論原始資料量大致：

`4 / 3 ≈ 1.333`

約增加 33%。

最後還可能有：
- `data:`;
- MIME；
- `;base64,`

header。

## 三、例子：300KB 圖片會變多少？

粗略：

`300KB × 4/3 ≈ 400KB`

再加少量 header。

實際字串長度還受：
- bytes；
- padding；
- 字元編碼；
- 壓縮傳輸

影響。

所以不要把 Base64 當「壓圖片」方法。

## 四、Data URL 的標準結構

MDN 的 Data URL 語法：

```text
data:[<media-type>][;base64],<data>
```

例如：

```text
data:image/jpeg;base64,/9j/4AAQSk...
```

這是一個 URL 值，不是普通檔案路徑。

## 五、FunnyTools Image to Base64 現在做什麼？

目前站內工具：

- 讀取圖片；
- 上限 5MB；
- 產生完整 Data URL；
- 顯示 MIME；
- 顯示長度；
- 可複製 Data URL；
- 可複製 CSS `background-image`；
- 本機處理；
- 不壓縮；
- 不轉格式；
- 不加密。

這些限制必須保留。

## 六、Base64 是加密嗎？

不是。

任何拿到 Base64 的人都可以：

> decode 回原始 bytes。

所以不要拿 Base64 保護：

- 密碼；
- 身分證；
- 私密照片；
- API secret。

## 七、Base64 是圖片格式嗎？

不是。

來源仍然可能是：

- JPG；
- PNG；
- WebP。

Data URL header 中的 MIME：

```text
image/png
```

告訴接收端資料類型。

## 八、API 要的「純 Base64」和 Data URL不同

有些 API 要：

```text
iVBORw0KGgoAAA...
```

不接受：

```text
data:image/png;base64,iVBORw...
```

因此一定看文件。

不要自己猜要不要刪 header。

## 九、HTML 怎麼內嵌？

例如：

```html
<img
  src="data:image/png;base64,..."
  alt="..."
>
```

小型 icon 或 demo 可能使用。

## 十、CSS 怎麼用？

例如：

```css
.logo {
  background-image: url("data:image/png;base64,...");
}
```

FunnyTools 可以輸出類似 CSS 用法。

## 十一、為什麼大型網站圖片通常不建議 Base64？

因為大型 Base64：

- HTML/CSS 文件變大；
- 解析負擔增加；
- 無法獨立 image cache；
- 每次父文件更新可能重新下載；
- 開發與除錯困難；
- source map / diff 巨大。

一般照片用正常 URL 更合理。

## 十二、Base64 能減少 HTTP request，不就是更快嗎？

在很早期 HTTP/1.x 時代，減少 request 數有時更重要。

現代 HTTP/2、HTTP/3：
- multiplexing；
- browser caching；
- preload；
- CDN

改變了成本結構。

所以不能用：

> 「少一個 request 一定更快」

當成普遍規則。

## 十三、小 icon 什麼時候可以內嵌？

可能適合：

- 非常小；
- 只在單一頁使用；
- 不值得獨立 cache；
- generated document；
- email / self-contained demo；
- API 明確要求。

仍需實測。

## 十四、重複使用的 Logo 呢？

如果全站 50 頁都用同一 Logo：

正常獨立 URL 可以：

> cache 一次，重複使用。

如果每頁 HTML 都 Base64 內嵌：

> 可能每頁都重複帶同一批資料。

通常不划算。

## 十五、Data URL 有瀏覽器長度限制嗎？

不同環境、瀏覽器與上下文可能有實務限制。

MDN 也提醒 Data URL 適合：

> 小型檔案。

FunnyTools 工具自己限制 5MB，這不是 Data URL 規格唯一上限，而是網站產品的安全／實用限制。

## 十六、Base64 能保留透明背景嗎？

如果原始 PNG bytes 被完整 Base64 編碼：

> PNG 本身的 alpha 資料仍然在。

因為 Base64 沒有改圖片 bytes 的語意。

它只是表示方式。

## 十七、Base64 會讓圖片變糊嗎？

正常 encode/decode：

> 不會。

它不是 lossy compression。

如果解碼後 bytes 完全相同，畫質完全相同。

## 十八、Base64 可以當壓縮嗎？

不行。

如果想減少資料：

1. 先 Resize；
2. Compress；
3. Format；
4. 最後有必要才 Base64。

## 十九、Base64 和 URL encode 不一樣

Base64：
> binary-to-text。

URL encoding：
> 把 URL 特殊字元轉成百分比形式。

例如空白：

`%20`

兩者不是同一件事。

## 二十、Base64 和 Blob URL 也不一樣

Blob URL：

```text
blob:https://example.com/...
```

通常指向瀏覽器記憶體中的 Blob。

Data URL：
> 資料直接在 URL 文字裡。

兩者使用情境不同。

## 二十一、CSP 可能阻止 Data URL

網站 Content Security Policy 可能限制：

```text
img-src
```

是否允許 `data:`。

所以即使 Base64 正確：

> CSP 仍可能阻止顯示。

正式網站要檢查安全政策。

## 二十二、Email 裡可以 Base64 圖片嗎？

Email client 支援情況複雜。

有些支援：
- CID；
- attachments；
- remote images；
- Data URI

方式不同。

不要因為 browser 能顯示，就假設所有 Email client 都能顯示。

## 二十三、Base64 放進 JSON 要注意什麼？

大型 Base64 會讓 JSON payload 大幅增加。

如果 API 支援：

> multipart/form-data / binary upload

可能更適合。

應依 API contract。

## 二十四、隱私安全

FunnyTools 本機產生 Base64，不上傳圖片。

但當你把 Base64：
- 貼到聊天室；
- 放到 API；
- 放進 source code；
- commit GitHub；

資料就已經離開本機。

Base64 看起來像亂碼，不代表安全。

## 二十五、常見錯誤

### 錯誤 1
把 Base64 當壓縮。

### 錯誤 2
把 Base64 當加密。

### 錯誤 3
巨大照片全部塞 HTML。

### 錯誤 4
API 要純 Base64卻傳 Data URL。

### 錯誤 5
全站 Logo 每頁重複 Base64。

### 錯誤 6
忘記 CSP。

## 二十六、快速選擇表

| 情境 | 建議 |
|---|---|
| 很小一次性 icon | 可評估 Base64 |
| 大型照片 | URL |
| 重複 Logo | URL + cache |
| API 明確要 Base64 | Base64 |
| API 要 Data URL | 完整 header |
| 想縮檔 | 不要靠 Base64 |
| 想保密 | Base64 沒有保密作用 |

## 二十七、FAQ

### Base64 比原圖小嗎？
通常不會，原始 binary 經 Base64 表示大致增加約三分之一。

### Base64 會降低畫質嗎？
正常編碼本身不會。

### Base64 是加密嗎？
不是。

### Data URL 和 Base64一樣嗎？
Data URL 可以包含 Base64，但兩者不是完全同義。

### FunnyTools Image to Base64 最大多大？
現行限制為 5MB。

### Base64 適合網站所有圖片嗎？
通常不適合大型或重複使用圖片。

## 二十八、延伸閱讀

- [圖片轉 Base64](/tools/image-to-base64/)
- [網站圖片最佳化](/guides/optimize-images-for-website/)
- [圖片太大怎麼壓](/guides/compress-image-to-upload-limit/)
- [JPG、PNG、WebP 怎麼選](/guides/jpg-png-webp-which-to-use/)
- [Base64 編碼解碼](/tools/base64/)

## 頁面 CTA

**API 或 CSS 明確需要 Data URL？**

用 FunnyTools 產生完整 Base64 Data URL；如果圖片很大，先思考是否應該改用一般 URL。

CTA：`開啟圖片轉 Base64`

次要 CTA：`網站圖片？查看最佳化指南`

## 圖卡與 ALT

`3 bytes binary → 4 Base64 chars`
`Base64 ≠ Compress`
`Base64 ≠ Encrypt`

ALT：`圖片 Base64 原理圖，說明三個二進位 bytes 約轉成四個 Base64 字元並造成大小增加`
