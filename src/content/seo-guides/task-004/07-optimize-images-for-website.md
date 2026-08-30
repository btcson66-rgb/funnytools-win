---
slug: "/guides/optimize-images-for-website/"
seo_title: "網站圖片怎麼最佳化？尺寸、WebP、srcset、Lazy Loading、LCP 與 ALT 完整指南｜FunnyTools"
meta_description: "網站圖片太慢怎麼辦？完整說明尺寸調整、JPG/PNG/WebP、srcset、sizes、lazy loading、LCP 圖片、width/height、alt text 與 Core Web Vitals 的實作順序。"
og_title: "網站圖片最佳化完整指南：不要只把 JPG 轉 WebP"
og_description: "正確尺寸、responsive images、LCP 優先級與 lazy loading，往往比單純換副檔名更重要。"
canonical: "https://funnytools.win/guides/optimize-images-for-website/"
primary_keyword: "網站圖片最佳化"
card_title: "網站圖片怎麼最佳化？"
card_description: "從 Resize、WebP 到 srcset、LCP、lazy loading，把真正影響載入速度的步驟串起來。"
hero_title: "網站圖片怎麼最佳化？尺寸、WebP、srcset、Lazy Loading、LCP 與 ALT 完整指南"
hero_subtitle: "網站圖片最佳化不是把所有 JPG 批次改成 WebP，而是讓每個裝置下載接近實際需要的圖，並讓首屏重要圖片被瀏覽器儘早發現。"
---

# 網站圖片怎麼最佳化？尺寸、WebP、srcset、Lazy Loading、LCP 與 ALT 完整指南

網站圖片太慢，最常見的錯誤修法是：

> 「全部轉 WebP 就好了。」

WebP 的確可能降低 bytes，但一張 6000px 寬的 WebP 放在 600px 卡片裡，仍然可能浪費大量流量。

> **速答：網站圖片最佳化應該先做什麼？**  
> 先把來源圖裁成正確構圖，再輸出符合實際顯示需求的尺寸，接著選 JPG / PNG / WebP 等合理格式與品質；網站端使用 `srcset` / `sizes` 提供多尺寸版本、在 `<img>` 設定 width/height，首屏 LCP 圖片不要 lazy-load，頁面下方的圖片才使用 `loading="lazy"`。最後再用 PageSpeed / DevTools / 真實裝置測試。格式只是其中一環。

## 一、第一個問題：網站真的需要原圖那麼大嗎？

假設商品圖：

`6000×4000`

但卡片實際最多顯示：

`600×400 CSS px`

直接送 6000px 原圖：

> 可能讓使用者下載遠超實際需要的資料。

因此第一步通常是：

> **Resize。**

## 二、但 Retina 螢幕不是需要更高解析嗎？

是。

例如 CSS 顯示 600px 寬：

- 1x 裝置可能適合 600px；
- 2x DPR 可能適合約 1200px。

所以網站不是只做單一 600px 圖，而是：

> 準備多尺寸版本，再用 `srcset`。

## 三、srcset 是什麼？

簡化例：

```html
<img
  src="photo-800.webp"
  srcset="
    photo-480.webp 480w,
    photo-800.webp 800w,
    photo-1200.webp 1200w
  "
  sizes="(max-width: 600px) 100vw, 800px"
  alt="..."
>
```

瀏覽器依：

- viewport；
- DPR；
- sizes

選適合版本。

## 四、為什麼不能只有一張超大圖靠 CSS 縮小？

CSS：

```css
img { width: 300px; }
```

只改：

> 顯示大小。

它不會自動把下載檔從 5MB 變 100KB。

所以：

> **CSS resize ≠ network image optimization。**

## 五、JPG、PNG、WebP怎麼選？

### 照片
JPG / WebP。

### 透明 Logo、UI、圖表
PNG / WebP / SVG。

### 向量 Logo
SVG 優先。

WebP 不是萬能，但常是很好的 raster web format。

延伸：[JPG、PNG、WebP 怎麼選](/guides/jpg-png-webp-which-to-use/)

## 六、JPG 轉 WebP一定改善速度嗎？

不一定。

如果：
- JPG 已只有 80KB；
- WebP 變 85KB；

沒有必要。

FunnyTools JPG to WebP 可以直接比較輸出大小。

真正應該看：

> 實際 transferred bytes。

## 七、Largest Contentful Paint（LCP）是什麼？

LCP 是 Core Web Vitals 之一，描述：

> 初始 viewport 中最大主要內容元素何時完成呈現。

對大量網站：

> Hero image 可能就是 LCP element。

web.dev 目前建議 good LCP 約 2.5 秒以下（以至少 75% visits 判斷）。

## 八、為什麼 LCP 圖不要 lazy-load？

如果 Hero 圖：

```html
<img loading="lazy" ...>
```

瀏覽器可能延後啟動下載。

web.dev 明確建議：

> 首屏、尤其 LCP 圖片不要 lazy-load。

因為這會增加 resource load delay。

## 九、哪些圖片適合 lazy loading？

頁面下方：
- gallery；
- related cards；
- footer；
- 長文章後段圖片。

可考慮：

```html
loading="lazy"
```

目的：

> 使用者沒滑到就不急著下載。

## 十、LCP 圖可以怎麼提高優先級？

可視需求使用：

```html
fetchpriority="high"
```

並讓 `<img src/srcset>` 直接出現在 initial HTML。

如果圖片只能等 JS 執行後才知道 URL：

> 瀏覽器會較晚發現資源。

## 十一、不要 lazy-load 所有圖片

有些框架會自動：

> every image = lazy。

這會讓首屏重要圖反而慢。

要分：

- Above the fold；
- Below the fold。

## 十二、width 和 height 為什麼重要？

HTML：

```html
<img width="1200" height="800" ...>
```

讓瀏覽器在圖片下載完成前：

> 預先保留比例空間。

這有助減少 layout shift。

圖片仍可用 CSS responsive：

```css
max-width: 100%;
height: auto;
```

## 十三、圖片檔名重要嗎？

使用有描述性的檔名比：

`IMG_8721.JPG`

更利於管理。

但不要把圖片 SEO 簡化成：

> 塞一長串關鍵字進檔名。

可讀、穩定、語意清楚即可。

## 十四、ALT 真正用途是什麼？

`alt` 的核心是：

> 替代文字。

對：
- 螢幕閱讀器；
- 圖片無法載入；
- 搜尋系統理解內容

都有幫助。

W3C WAI 的原則是依圖片目的寫替代文字。

不要寫：

> `alt="便宜鞋 鞋子 特價鞋 網購鞋..."`

這是 keyword stuffing。

## 十五、裝飾性圖片怎麼寫 ALT？

純裝飾：

```html
alt=""
```

通常比亂寫「裝飾圖片」更適合，讓輔助技術略過。

但實際元件角色要依 accessibility implementation 判斷。

## 十六、圖片有文字怎麼辦？

如果圖片本身承載重要文字：

> HTML 仍應提供等價文字內容。

不要把主要文章標題只藏在圖片裡。

## 十七、網站圖片工作流程

### Step 1
保留原始 master。

### Step 2
Crop 構圖。

### Step 3
建立：
- 480w；
- 800w；
- 1200w；
或符合實際版面的尺寸。

### Step 4
選 WebP/JPG/PNG。

### Step 5
調整品質。

### Step 6
加入 responsive markup。

### Step 7
LCP 圖 eager/high priority。

### Step 8
下方圖片 lazy。

### Step 9
測真實頁面。

## 十八、FunnyTools可以幫哪一段？

### Crop
[圖片裁切](/tools/image-cropper/)

### Resize
[圖片尺寸調整](/tools/image-resizer/)

### Compress
[圖片壓縮](/tools/image-compressor/)

### JPG → WebP
[JPG 轉 WebP](/tools/jpg-to-webp/)

FunnyTools 可以準備圖片 asset。

網站程式碼中的：

- srcset；
- sizes；
- loading；
- fetchpriority；
- cache

仍需開發者實作。

## 十九、圖片 CDN 是必要的嗎？

不一定。

小網站可以：
- 手動準備幾種尺寸；
- 靜態檔案；
- 良好 cache。

大型網站才更可能需要：
- dynamic transform；
- CDN；
- format negotiation。

選 CDN 也要考慮：
- 成本；
- origin；
- cache；
- latency。

## 二十、Hero 圖應該多大？

沒有通用 1200×630、1920×1080 就一定對的答案。

應依：
- CSS layout；
- max-width；
- DPR；
- crop；
- art direction。

不要用社群 OG 尺寸規則套所有 Hero。

## 二十一、圖片品質多少最好？

沒有固定 80%、85%。

不同 encoder、內容和尺寸差很多。

正確做法：

> 逐圖或按素材類型建立 quality policy，再用視覺與 bytes 驗證。

## 二十二、WebP fallback還需要嗎？

現代主流瀏覽器對 WebP 支援很廣。

但你的實際 target：
- 舊企業 WebView；
- 特殊 CMS；
- Email client；
- 圖像處理 pipeline

可能有不同限制。

所以：

> 依目標環境，不要只看一般 browser support。

## 二十三、常見錯誤

### 錯誤 1
把所有 JPG 轉 WebP就宣稱 SEO 完成。

### 錯誤 2
Hero image lazy-load。

### 錯誤 3
所有裝置下載同一張 5000px 圖。

### 錯誤 4
沒有 width/height。

### 錯誤 5
ALT 塞關鍵字。

### 錯誤 6
CSS 縮圖就以為 bytes 變少。

## 二十四、快速檢查表

- [ ] 原圖有保留
- [ ] 圖片 crop 正確
- [ ] 實際 pixels 合理
- [ ] 格式適合內容
- [ ] bytes 已檢查
- [ ] srcset / sizes
- [ ] width / height
- [ ] LCP image 不 lazy
- [ ] below-fold lazy
- [ ] alt 合理
- [ ] 真機測試

## 二十五、FAQ

### 網站圖片都要 WebP 嗎？
不一定，按實際 bytes、內容與相容性選擇。

### LCP圖片可以 lazy load嗎？
通常不應該，會延後重要圖片下載。

### 圖片越小越好嗎？
不是。必須保持用途所需畫質。

### CSS width會降低下載大小嗎？
不會。

### ALT 要放關鍵字嗎？
應描述圖片在情境中的功能／內容，而不是塞詞。

### srcset有什麼用？
讓瀏覽器選更合適的圖片尺寸。

## 二十六、延伸閱讀

- [圖片尺寸調整](/tools/image-resizer/)
- [圖片壓縮](/tools/image-compressor/)
- [JPG 轉 WebP](/tools/jpg-to-webp/)
- [JPG、PNG、WebP 比較](/guides/jpg-png-webp-which-to-use/)
- [裁切 vs Resize vs Compress](/guides/crop-vs-resize-vs-compress-image/)

## 頁面 CTA

**先把網站圖片素材處理到合理尺寸與格式，再交給 srcset / lazy loading / LCP 策略。**

CTA：`開啟圖片尺寸調整`

次要 CTA：`比較 JPG 轉 WebP 大小`

## 圖卡與 ALT

`Correct pixels → Format → Compress → srcset → LCP priority → Lazy below fold`

ALT：`網站圖片最佳化流程圖，包含尺寸、WebP壓縮、srcset、LCP優先載入與下方圖片延遲載入`
