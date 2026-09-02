---
slug: "/guides/chart-flowchart-alt-text-accessibility/"
seo_title: "圖表與流程圖 ALT 怎麼寫？W3C 可存取性、長描述、色彩與資料表完整指南｜FunnyTools"
meta_description: "長條圖、圓餅圖、流程圖的alt text怎麼寫？依W3C WAI complex images原則，說明短ALT、長描述、資料表、關鍵趨勢、流程路徑、色彩不可作唯一資訊，以及裝飾圖alt=""。"
og_title: "圖表 ALT 不能只寫『這是一張長條圖』"
og_description: "W3C把圖表與流程圖視為complex images；短ALT用來辨識圖，完整資料與關鍵趨勢還需要長描述或等價文字。"
canonical: "https://funnytools.win/guides/chart-flowchart-alt-text-accessibility/"
primary_keyword: "圖表 ALT 怎麼寫"
card_title: "圖表與流程圖 ALT 怎麼寫？"
card_description: "短ALT先辨識圖與重點，完整資料或流程再用長描述、表格或正文提供等價資訊。"
hero_title: "圖表與流程圖 ALT 怎麼寫？W3C 可存取性、長描述、色彩與資料表完整指南"
hero_subtitle: "ALT 的目標不是描述每一個像素，而是讓看不到圖的人仍能取得這張圖真正要傳達的資訊。"
---

# 圖表與流程圖 ALT 怎麼寫？W3C 可存取性、長描述、色彩與資料表完整指南

一張長條圖的 ALT 如果只是：

> `alt="長條圖"`

形式上有ALT，但實際上幾乎沒有提供資訊。

W3C Web Accessibility Initiative 把：

- graphs
- charts
- flow charts
- diagrams

都列為：

> complex images。

> **速答：圖表 ALT 怎麼寫？**  
> 先用簡短ALT辨識圖的類型、主題與最重要訊息，例如「長條圖，比較A、B、C三部門案件量，C最高」；若圖中包含多筆數據、尺度、關係或多條流程，還要在圖旁、正文、表格或專門長描述中提供完整等價資訊。W3C WAI明確建議complex images使用短描述加上詳細長描述。不要只靠紅綠顏色區分結果，也不要把所有數字硬塞進一個超長alt attribute。

## 一、ALT的目的不是SEO塞詞

ALT首先是：

> Text alternative。

當使用者：
- 使用screen reader
- 圖片無法顯示
- 無法看到圖像內容

仍可理解圖的功能與資訊。

搜尋理解是附帶價值，不應主導內容。

## 二、什麼是Complex Image？

W3C列出的典型包括：

- charts
- graphs
- flow charts
- organization charts
- maps
- detailed diagrams

原因是：

> 一句話通常無法完整傳達。

## 三、W3C的兩層做法

### 第一層：Short description
快速說：
- 這是什麼圖
- 主題是什麼
- 最重要訊息

### 第二層：Long description
提供：
- 全部關鍵數據
- 尺度
- 關係
- 趨勢
- 路徑

## 四、長條圖 ALT 範例

不夠：

`長條圖`

更好：

`2026年三部門案件量長條圖，C部門160件最高，A部門120件，B部門95件。`

如果有12個月 × 5部門：

> 不要把60個數值全部塞ALT。

應提供旁邊資料表。

## 五、圓餅圖 ALT 範例

例如：

- 人事50%
- 設備25%
- 行銷15%
- 其他10%

可以：

`年度預算圓餅圖，人事占50%為最大項，設備25%、行銷15%、其他10%。`

若圖旁已經有完整資料表：

> ALT可以更短，避免重複朗讀所有資訊。

## 六、流程圖 ALT 怎麼寫？

簡單流程：

開始 → 檢查資料 → 完整？
- 是 → 審核 → 結束
- 否 → 補件 → 再檢查

短ALT可寫：

`申請審核流程圖，資料不完整時回到補件，完整後進入審核。`

詳細流程則在正文列出步驟。

## 七、為什麼不能全部塞進alt？

過長alt attribute：

- screen reader一次讀很長
- 難以分段
- 難瀏覽
- 難維護

對複雜圖，W3C建議：

> 另提供可結構化閱讀的長描述。

## 八、長描述可以放哪？

常見：

- 圖片下方文字
- 同頁section
- 詳細資料表
- 鄰近連結到description
- figure / figcaption配合正文

W3C複雜圖片教學提供多種方式。

## 九、資料圖最好保留原始表格

長條圖只是視覺化。

若原始表：

| 部門 | 件數 |
|---|---:|
| A | 120 |
| B | 95 |
| C | 160 |

把表格放在圖附近，可以同時幫助：
- screen reader
- 精確查數字
- 手機使用者
- 搜尋
- 審核

## 十、不要只用顏色傳達資訊

例如：

> 綠色 = 通過  
> 紅色 = 不通過

若沒有：
- 文字
- 圖示
- 形狀

某些色覺差異使用者會失去資訊。

因此應寫：
- `通過`
- `不通過`

顏色只做輔助。

## 十一、圓餅圖顏色很多怎麼辦？

除了不同顏色：
- 圖例要有文字
- 百分比可直接標示
- 不要要求讀者只靠色相猜類別

FunnyTools圓餅圖現行有圖例與百分比，這比只有彩色扇區更有資訊。

## 十二、低對比文字也是問題

淺灰字配白底、淡黃字配白底，即使視力正常也難讀。

圖表完成後應檢查：
- 投影
- 手機
- 黑白列印
- 高亮環境

## 十三、圖片中的文字不能取代HTML文字

如果一整張流程規範只存在PNG裡：

> 搜尋、放大、screen reader、複製都更困難。

重要內容應在HTML正文中同步提供。

## 十四、Decorative Image怎麼處理？

如果圖片純裝飾，沒有資訊價值：

```html
alt=""
```

W3C建議裝飾圖使用null alternative，避免screen reader讀出無用檔名或描述。

## 十五、Functional Image呢？

如果圖片本身是按鈕／連結：

> ALT應描述功能或目的。

例如下載按鈕圖示：
`下載報告`

而不是：
`向下箭頭圖示`

## 十六、圖表標題和ALT可以完全一樣嗎？

可以部分重疊，但最好避免重複冗長朗讀。

若可見標題已經說：

> 「2026年三部門案件量」

ALT可增加：

> C最高、B最低

補充圖像本身提供的關係。

## 十七、SEO圖片ALT怎麼兼顧？

自然描述就好。

不要：

`長條圖 長條圖製作 免費圖表 SEO圖表 報告長條圖`

應：

`2026年三部門案件量長條圖，C部門最高`

People-first描述本身就有語意。

## 十八、FunnyTools匯出的PNG會自動有ALT嗎？

不會。

PNG檔案本身不會替你決定HTML的`alt`。

當你把圖片放進：
- 網站
- CMS
- LMS
- 文件

要在目標平台補上適當替代文字。

## 十九、SVG就自動可存取嗎？

也不會。

SVG是向量格式，不代表：
- 自動有可存取名稱
- 自動有長描述
- 自動符合閱讀順序

格式和accessibility是不同層面。

## 二十、流程圖分享前的可存取性檢查

- [ ] 有文字版流程
- [ ] Decision不是只靠顏色
- [ ] 箭頭方向在文字版可理解
- [ ] 圖中字足夠大
- [ ] Short ALT有主題與核心訊息
- [ ] 複雜路徑有long description

## 二十一、資料圖檢查

- [ ] 圖題清楚
- [ ] 單位清楚
- [ ] 類別文字清楚
- [ ] 不只靠顏色
- [ ] ALT有核心結論
- [ ] 完整資料可用文字／表格取得
- [ ] 來源可查

## 二十二、常見錯誤

### 錯誤1
ALT只寫「圖表」。

### 錯誤2
把50個數字全部塞ALT。

### 錯誤3
只有紅綠沒有文字。

### 錯誤4
認為SVG天生無障礙。

### 錯誤5
圖裡有全部資訊，正文什麼都沒有。

### 錯誤6
ALT為SEO塞關鍵字。

## 二十三、FAQ

### 圖表ALT要把所有數字都寫出來嗎？
簡單圖可以；複雜圖更適合短ALT加資料表／長描述。

### 流程圖怎麼提供長描述？
可在圖下按步驟列出每個節點與分支。

### 裝飾圖片需要ALT嗎？
通常使用 `alt=""`。

### 圖表有圖例就不用ALT嗎？
仍需要在使用情境中提供文字替代。

### PNG和SVG哪個比較無障礙？
格式本身不能決定；重點是替代文字、結構與內容提供方式。

## 二十四、延伸閱讀

- [長條圖製作工具](/tools/bar-chart-maker/)
- [圓餅圖製作工具](/tools/pie-chart-maker/)
- [流程圖製作工具](/tools/flowchart/)
- [圖表避免誤導](/guides/misleading-chart-common-errors/)
- [SVG vs PNG](/guides/svg-vs-png-diagram-export/)

## 頁面 CTA

**圖做完後，再問一次：看不到圖的人能不能得到相同關鍵資訊？**

如果不能，就補short ALT、文字摘要與必要的資料表／長描述。

CTA：`前往製圖與圖表工具`

次要 CTA：`查看圖表誤導檢查`

## 圖卡與 ALT

`Short ALT = identify + key message`
`Long description = data + relationships + flow`

ALT：`W3C複雜圖片替代文字概念圖，短ALT提供圖型與核心訊息，長描述提供完整資料與關係`
