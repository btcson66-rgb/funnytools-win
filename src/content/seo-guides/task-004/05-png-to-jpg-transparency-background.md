---
slug: "/guides/png-to-jpg-transparency-background/"
seo_title: "PNG 轉 JPG 為什麼透明背景消失、變白或變黑？完整原因與正確轉檔指南｜FunnyTools"
meta_description: "PNG 轉 JPG 後透明背景為什麼變白、黑色或指定顏色？完整說明 alpha channel、JPEG 不支援透明、背景混合、Logo 與商品圖轉檔注意事項，以及如何選擇背景色。"
og_title: "PNG 轉 JPG 為什麼透明背景不見了？"
og_description: "不是工具壞掉：JPEG 本身沒有透明通道，轉檔時必須把透明區域合成某個實際顏色。"
canonical: "https://funnytools.win/guides/png-to-jpg-transparency-background/"
primary_keyword: "PNG 轉 JPG 透明背景"
card_title: "PNG 轉 JPG 為什麼透明背景消失？"
card_description: "JPEG 不支援透明，轉檔時一定要把透明區域填入真實背景色。"
hero_title: "PNG 轉 JPG 為什麼透明背景消失、變白或變黑？完整原因與正確轉檔指南"
hero_subtitle: "透明背景不是『空白』，而是 alpha channel；JPEG 沒有這個通道，所以轉檔前必須決定背景。"
---

# PNG 轉 JPG 為什麼透明背景消失、變白或變黑？完整原因與正確轉檔指南

你有一張透明 Logo PNG：

> 背景原本是透明。

轉成 JPG 後卻變成：

- 白色；
- 黑色；
- 灰色；
- 或某個意外顏色。

很多人以為：

> 「轉檔工具壞掉了。」

其實這通常是格式本身的限制。

> **速答：PNG 轉 JPG 為什麼透明背景不見？**  
> PNG 可以保存 alpha transparency；JPEG/JPG 不支援 alpha channel。因此透明像素轉成 JPG 前，必須先與一個實際背景色合成。FunnyTools PNG to JPG 目前讓使用者選擇背景色與 JPG 品質，再把透明區域永久填入該背景。轉成 JPG 後，透明資訊已不再存在；若需要保留透明，請繼續使用 PNG 或支援 alpha 的 WebP，而不是 JPG。

## 一、透明背景不是「什麼都沒有」

PNG 一個像素通常不只包含：

- Red；
- Green；
- Blue；

還可能包含：

- Alpha。

Alpha 表示透明程度。

例如：
- alpha 100% → 完全不透明；
- alpha 50% → 半透明；
- alpha 0% → 完全透明。

## 二、JPEG 為什麼不能透明？

標準 JPEG 沒有 alpha channel。

所以它無法保存：

> 「這一格讓底下背景透出來。」

JPEG 每個像素最後都要是一個實際顏色。

## 三、轉 JPG 時工具必須做什麼？

把透明 PNG 轉 JPG 時，需要先：

1. 讀取 PNG；
2. 建立背景；
3. 把 PNG 疊在背景上；
4. 把混合後結果編碼成 JPEG。

這叫：

> compositing / flattening。

## 四、為什麼有些工具變白、有些變黑？

因為工具選的預設背景不同。

如果透明區域沒有先明確合成：
- 某些流程變白；
- 某些變黑；
- 某些由 Canvas 初始值與實作決定。

最安全的方式：

> **自己指定背景色。**

FunnyTools PNG to JPG 目前就是這樣設計。

## 五、Logo 應該選什麼背景？

看實際使用場所。

### 網站永遠白底
可以選白。

### 簡報深色底
如果最後一定放深色底，轉 JPG 後應選相符背景。

### Logo 需要在不同背景使用
不要轉 JPG。

保留：
- PNG；
- WebP alpha；
- SVG。

## 六、為什麼透明邊緣有白邊？

Logo 常有 anti-aliasing 半透明像素。

例如黑色 Logo 的邊緣可能是：

> 黑色 + 30% alpha。

如果你先在白底 flatten，再放到黑底：

半透明邊緣已經和白色混合，會出現白 halo。

因此：

> **背景應在最終使用情境決定。**

## 七、商品圖透明背景轉 JPG怎麼辦？

電商平台可能只接受 JPG。

如果你的商品 PNG 是透明：

1. 看平台背景規範；
2. 常見是白底；
3. 轉 JPG 時選白；
4. 檢查商品邊緣；
5. 確認陰影是否正常。

不要先隨便黑底轉檔，再到平台抱怨背景錯。

## 八、PNG 轉 JPG一定比較小嗎？

不一定，但照片型 PNG 通常有機會。

JPG 很擅長：
- 照片；
- 漸層；
- 自然影像。

如果 PNG 是：
- 透明 Logo；
- 細線；
- UI；

JPG 未必值得。

## 九、JPG 品質多少最好？

沒有固定答案。

FunnyTools PNG to JPG 可以調品質。

應依：

- 圖片用途；
- 細節；
- 檔案限制；
- 邊緣是否有文字

逐步比較。

不要把 85% 當成跨所有圖片的唯一最佳值。

## 十、透明 PNG 轉 WebP 可以保留透明嗎？

WebP 支援 alpha。

但要看：
- 轉換工具；
- 輸出模式；
- 目標系統是否接受。

如果目標是網站：

> PNG → WebP alpha

可能是合理方向。

FunnyTools 現有 JPG to WebP 是以 JPG 為來源，JPG 本身沒有透明；它不是 PNG alpha converter。

所以 Codex 不應把站內功能寫成不存在的 PNG→WebP 透明轉換器。

## 十一、JPG 轉 PNG 能把背景重新變透明嗎？

不能。

一旦 PNG flatten 成 JPG，原本的 alpha 已經消失。

JPG → PNG：

> 只會把目前背景像素存進 PNG。

它不會知道哪些白色：
- 是原本透明；
- 哪些本來就是白色物件。

真正去背需要：
- segmentation；
- chroma key；
- manual mask；
- background-removal model。

## 十二、透明度和白色看起來一樣嗎？

在白底 Viewer 中可能看起來一樣。

但它們是完全不同資料：

### Transparent
底下換黑色就看到黑色。

### White pixel
底下不管什麼顏色都仍然是白。

檢查透明 PNG 時，可以放到棋盤格或彩色背景上看。

## 十三、半透明陰影會怎樣？

PNG Logo 的柔和陰影可能有大量半透明像素。

轉 JPG 時全部會和背景色永久混合。

因此換到其他背景後不能重新適應。

## 十四、JPG 不支援透明是不是缺點？

是限制，但不代表 JPG 不好。

照片通常根本不需要透明。

JPG 的優勢：
- 高相容；
- 照片壓縮效率；
- 普遍支援。

格式應按用途選。

## 十五、只改副檔名能保留透明嗎？

例如：

`logo.png → logo.jpg`

如果只是重新命名：

> 檔案仍是 PNG bytes。

一些系統會拒絕。

真正轉 JPG：

> alpha 一定要被 flatten。

## 十六、轉檔後 metadata 會怎樣？

瀏覽器重新編碼通常不保證保留：

- EXIF；
- GPS；
- ICC；
- comments。

所以輸出是使用副本，不要覆蓋 master。

## 十七、常見錯誤

### 錯誤 1
以為 JPG 可以透明。

### 錯誤 2
轉完看到白底就認為工具故障。

### 錯誤 3
Logo 要多背景使用還轉 JPG。

### 錯誤 4
JPG→PNG 以為可以恢復透明。

### 錯誤 5
不檢查半透明邊緣 halo。

### 錯誤 6
只改副檔名。

## 十八、快速選擇表

| 需求 | 建議 |
|---|---|
| 透明 Logo | PNG / WebP / SVG |
| 平台只收 JPG | 選定背景後 flatten |
| 白底商品圖 | JPG 白底可行 |
| 多種背景重複使用 | 不要 JPG |
| 照片本來無透明 | JPG / WebP |
| JPG 想「恢復透明」 | 需去背，不是格式轉換 |

## 十九、FAQ

### PNG 轉 JPG 背景為什麼變白？
JPEG 不支援透明，工具通常會用白色或指定色填滿。

### 可以選黑底嗎？
FunnyTools PNG to JPG 目前可以選背景色。

### JPG 可以做透明背景嗎？
標準 JPG 不行。

### JPG 轉回 PNG會恢復透明嗎？
不會。

### 為什麼 Logo 邊緣有白邊？
半透明 anti-alias pixels 已經和白背景混合。

### PNG 轉 JPG一定比較小嗎？
不一定，照片通常較有機會。

## 二十、延伸閱讀

- [PNG 轉 JPG 工具](/tools/png-to-jpg/)
- [JPG、PNG、WebP 怎麼選](/guides/jpg-png-webp-which-to-use/)
- [JPG 轉 PNG 工具](/tools/jpg-to-png/)
- [圖片壓縮](/tools/image-compressor/)
- [圖片無法上傳排查](/guides/image-upload-failed-troubleshooting/)

## 頁面 CTA

**目標平台只接受 JPG？**

先決定透明區域最後應該是什麼顏色，再轉檔，不要讓工具替你猜背景。

CTA：`開啟 PNG 轉 JPG`

次要 CTA：`需要保留透明？查看格式比較`

## 圖卡與 ALT

`PNG: RGB + Alpha`
`JPG: RGB only`
`Transparent → Choose Background → JPG`

ALT：`PNG 轉 JPG 透明背景原理圖，顯示 JPEG 不支援 alpha 並需要先選背景色`
