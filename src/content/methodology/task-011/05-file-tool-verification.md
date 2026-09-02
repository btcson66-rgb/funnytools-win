---
slug: "/methodology/file-tool-verification/"
seo_title: "PDF 與圖片工具怎麼驗證？頁數、格式、尺寸、重新開啟與 Round Trip 測試｜FunnyTools"
meta_description: "PDF與圖片工具不能只看有沒有下載。FunnyTools驗證方法包括重新開啟、頁數、尺寸、格式signature、透明度、頁序、壓縮結果與失敗邊界，並說明哪些轉換天生不可逆。"
canonical: "https://funnytools.win/methodology/file-tool-verification/"
primary_keyword: "PDF 圖片 工具 測試"
card_title: "PDF／圖片工具怎麼測？"
card_description: "下載成功只是第一步；輸出要能重新開啟、頁數正確、尺寸正確，且限制要和工具說明一致。"
hero_title: "PDF 與圖片工具怎麼驗證？頁數、格式、尺寸、重新開啟與 Round Trip 測試"
hero_subtitle: "檔案工具最危險的bug，是畫面顯示『完成』，使用者到另一個軟體才發現輸出損壞。"
---

# PDF 與圖片工具怎麼驗證？頁數、格式、尺寸、重新開啟與 Round Trip 測試

檔案工具的測試不能只寫：

> Download button clicked。

真正要測：

> 下載的東西是什麼。

## 一、最小PDF Fixtures

repo應保留自己生成、無個資的：

- 1頁PDF
- 2頁PDF
- 3頁PDF
- portrait
- landscape
- small text page

用途：

- merge
- split
- rotate
- delete
- extract
- reorder
- image conversion
- compression

## 二、Merge PDF Test

輸入：
- A：1頁
- B：2頁

預期：
> 3頁。

還要確認：
- A在前
- B頁順序保留
- 檔案可開
- 不為0 byte

## 三、Split PDF Test

輸入：
> 3頁PDF

依產品設計：
- each page
- selected ranges

預期：
> 頁數與range完全一致。

## 四、Rotate Test

只轉第2頁90°。

驗證：
- page count仍3
- 第1、第3不變
- 第2rotation metadata/content正確

## 五、Delete / Extract Test

Delete page2：

> 剩1、3。

Extract page2：

> 只剩原page2。

這兩個工具搜尋意圖很像，但測試結果相反。

## 六、Reorder Test

原順序：

`1,2,3`

改：

`3,1,2`

輸出重新打開後：

> 必須真的3,1,2。

不能只測UI拖曳順序。

## 七、PDF → Image

驗證：
- 輸出張數 = page count（在工具限制內）
- PNG/JPG格式正確
- dimensions >0
- 可開啟

不要測：
> 搜尋文字仍存在。

因為轉成影像本來就會失去PDF文字語意。

## 八、Image → PDF

驗證：
- 每張圖對應頁
- 順序正確
- page count
- PDF可開

若有：
- page size
- orientation

則加入fixture。

## 九、Compression Test

最容易寫錯的測試：

> output一定比input小。

不應。

某些檔案已高度壓縮：

> 重寫後可能一樣大甚至更大。

應驗證：
- output valid
- page count unchanged
- content still opens
- tool正確顯示size difference

不能把「縮小」作為所有fixture的硬assert。

## 十、圖片格式 Fixtures

至少：
- 100×50 PNG
- transparent PNG
- opaque JPG
- WebP
- very small image
- odd dimension，例如101×73

## 十一、Resize Test

輸入：

> 100×50

keep ratio，width=200：

預期：

> 200×100。

若設定任意：
> 200×200

則視keep-ratio開關決定。

## 十二、PNG → JPG透明度

透明PNG轉JPG：

> JPG沒有alpha。

工具需要：
- 背景色
- 或固定flatten規則

fixture要測：

> 透明區最後變什麼。

## 十三、JPG Lossy

JPG encode/decode：

> pixel-by-pixel不一定完全相同。

所以不要用hash equality。

可以測：
- dimensions
- format
- decode success
- reasonable size

## 十四、Round Trip 不是永遠適用

PNG → JPG → PNG：

> 不會回到原始PNG像素。

PDF → image → PDF：

> 不會恢復原始PDF語意。

測試方法必須知道：

> 轉換是否理論可逆。

## 十五、大檔測試

自動suite不應每天跑超大fixture拖垮CI。

可分：
- small regression fixtures
- manual stress test

例如：
- 20MB image
- 40MB PDF

依工具實際limit執行release smoke test。

## 十六、Browser Compatibility

File API / Canvas / PDF library在：
- Chrome
- Edge
- Safari
- iOS

可能有差異。

重要release：

> 至少主流browser smoke test。

## 十七、FAQ

### 為什麼壓縮後反而更大？
可能，尤其原檔已最佳化。

### PDF下載成功就代表內容正確？
不代表。

### JPG轉回PNG可以復原嗎？
不能恢復已丟失的有損資訊。

### 大檔要放Git嗎？
不建議，small fixture進repo，大型stress asset可另管理。

## 延伸閱讀

- [PDF工具](/category/pdf/)
- [圖片工具](/category/image/)
- [SVG vs PNG指南](/guides/svg-vs-png-diagram-export/)
- [工具驗證](/methodology/tool-verification/)
