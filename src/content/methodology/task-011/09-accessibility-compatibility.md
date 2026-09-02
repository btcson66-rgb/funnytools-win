---
slug: "/methodology/accessibility-compatibility/"
seo_title: "線上工具可存取性怎麼測？鍵盤、Label、Focus、手機與瀏覽器相容性｜FunnyTools"
meta_description: "FunnyTools可存取性與相容性測試方法：鍵盤操作、表單label、focus、錯誤訊息、色彩、圖表替代文字、手機觸控、Safari/Chrome/Edge與檔案工具實測。"
canonical: "https://funnytools.win/methodology/accessibility-compatibility/"
primary_keyword: "線上工具 可存取性 測試"
card_title: "可存取性與相容性怎麼測？"
card_description: "工具不只要算對，還要能用鍵盤操作、看得懂錯誤、在手機與不同瀏覽器正常完成任務。"
hero_title: "線上工具可存取性怎麼測？鍵盤、Label、Focus、手機與瀏覽器相容性"
hero_subtitle: "一個計算結果完全正確，如果使用者無法用鍵盤到達輸入框、看不到focus或手機按鈕被遮住，仍然不是完整可用的工具。"
---

# 線上工具可存取性怎麼測？鍵盤、Label、Focus、手機與瀏覽器相容性

FunnyTools 的工具頁主要面向：

- 手機
- 桌面
- 學生
- 教師
- 一般使用者

因此品質不能只看：

> Chrome桌面上有沒有正常。

## 一、鍵盤流程

不碰滑鼠：

1. Tab進入第一個欄位。
2. 依序移動。
3. 到主要按鈕。
4. Enter / Space啟動。
5. 取得結果。
6. 可以繼續操作。

如果Tab突然跳到：
- 隱藏元素
- 無關footer
- 無法返回的canvas

就需要修。

## 二、Visible Focus

focus必須看得見。

不要：
```css
outline: none;
```

然後沒有替代。

使用者需要知道：

> 現在鍵盤在哪裡。

## 三、Label

輸入欄應有程式可關聯的：

`<label for="">`

Placeholder：

> 不能完全取代label。

因為使用者輸入後placeholder消失。

## 四、Error Message

不要只：
> border變紅。

應有文字：

- 請輸入正數
- 頁數超過限制
- JSON格式錯誤
- EAN check digit不符

而且錯誤應靠近相關欄位。

## 五、Result Announcement

對計算器，如果按下按鈕後結果在頁面某處更新：

> screen reader使用者需要知道發生更新。

可評估：
- `aria-live`
- focus management
- 結果heading

但不要濫用assertive announcements。

## 六、Color Not Alone

Chart：
- red
- green

不能只靠顏色表示：
- pass
- fail

需要：
- label
- text
- shape / legend

Task 007的圖表ALT指南可作補充。

## 七、Canvas / Chart

Canvas本身對screen reader資訊有限。

如果圖表承載重要數據：

> 同頁提供資料表或文字摘要。

流程圖：
> 提供文字版步驟。

## 八、Touch Target

手機常見問題：

- + / −按鈕太小
- delete icon太靠近
- drag handle難抓

Task 011 QA應至少人工測：
> 實際手機觸控。

不要只縮桌面browser視窗當作唯一mobile test。

## 九、200% Zoom

桌面browser放大：

> 200%。

檢查：
- 內容能讀
- 按鈕沒重疊
- horizontal scroll合理
- modal可關

## 十、Small Viewport

例如：

> 360px寬。

檢查：
- tables
- long URLs
- code blocks
- result cards
- canvas

Task011 methodology pages本身也要通過。

## 十一、Safari

File API、download、Canvas、Clipboard：

> Safari可能有不同限制。

重要工具至少測：
- Chrome/Edge
- Safari（若有裝置）
- mobile Chrome/Safari

Codex如果沒有Safari環境：

> completion report應誠實寫「未測Safari」，不能假PASS。

## 十二、Clipboard

Copy button：
- secure context
- permission
- fallback

如果clipboard API失敗：
> 使用者應得到明確提示。

## 十三、Download

手機：
- filename
- file opens
- share/save behavior

可能和桌面不同。

PDF / SVG / PNG：
> 最好真機下載一次。

## 十四、Reduced Motion

Wheel、timer、animation：

如果有大量motion，可評估：

`prefers-reduced-motion`

至少：
> 動畫不能是取得結果的唯一方式。

## 十五、Language

中文頁：
- `lang="zh-Hant"`或站內一致正確語言標記
- 英文頁 `en`
- 西文 `es`

不正確lang會影響screen reader發音。

## 十六、W3C不是「勾一次就完成」

可存取性需要：
- design
- code
- content
- real use

自動scanner能抓：
- missing label
- contrast
- ARIA issue

但不一定知道：

> 這個流程實際難不難用。

所以：
> automated + manual。

## 十七、Compatibility Matrix

Task011建議公開簡化版：

| 類型 | Chrome | Edge | Safari | Mobile |
|---|---|---|---|---|
| Calculator | tested | tested | smoke | tested |
| PDF | tested | tested | manual | tested |
| Canvas | tested | tested | manual | tested |

只有真的測過：

> 才填tested。

否則填：
- Not tested
- Limited
- Known issue

## 十八、FAQ

### Lighthouse 100就代表無障礙嗎？
不代表完整人工可用性。

### Placeholder算label嗎？
不應把它當完整替代。

### Mobile responsive就等於手機好用嗎？
不一定，touch與file workflow仍需實測。

### Safari沒設備怎麼辦？
誠實標示未測，利用使用者回報補足。

## 延伸閱讀

- [圖表與流程圖ALT](/guides/chart-flowchart-alt-text-accessibility/)
- [工具驗證方法](/methodology/tool-verification/)
- [檔案工具驗證](/methodology/file-tool-verification/)
- [工具結果複核Workflow](/workflows/verify-tool-result/)
