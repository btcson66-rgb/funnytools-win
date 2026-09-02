---
slug: "/guides/markdown-syntax-preview-guide/"
seo_title: "Markdown 語法完整指南｜標題、清單、表格、Code Block、README 與預覽差異｜FunnyTools"
meta_description: "Markdown 怎麼寫？完整整理標題、粗體、連結、圖片、引用、清單、code fence、表格與 task list，並說明 CommonMark、GitHub Flavored Markdown、HTML、Mermaid、LaTeX 與預覽器差異。"
og_title: "Markdown 語法完整指南：README、表格、程式碼與預覽"
og_description: "先寫可攜的 Markdown，再到 GitHub、CMS 或最終平台驗證 dialect 與安全處理。"
canonical: "https://funnytools.win/guides/markdown-syntax-preview-guide/"
primary_keyword: "Markdown 語法"
card_title: "Markdown 語法與預覽怎麼用？"
card_description: "從 H1、清單、表格到 code fence，並理解 GitHub 與 CMS 為什麼可能顯示不同。"
hero_title: "Markdown 語法完整指南｜標題、清單、表格、Code Block、README 與預覽差異"
hero_subtitle: "Markdown 很簡單，但不同平台支援的語法擴充不完全相同；預覽正確不代表 GitHub、CMS、MDX 也一定一樣。"
---

# Markdown 語法完整指南｜標題、清單、表格、Code Block、README 與預覽差異

Markdown 最常被用在：

- README；
- 技術文件；
- GitHub issue；
- 筆記；
- 部落格草稿；
- 文件系統。

它的優點不是「語法很多」，而是：

> **原始文字本身也容易閱讀。**

> **速答：Markdown 最常用哪些語法？** `#` 建立標題、`**文字**` 粗體、`*文字*` 斜體、`-` 建立清單、`[文字](URL)` 建連結、`![alt](image)` 放圖片、反引號包 inline code，三個反引號建立 fenced code block。表格與 task list 常見於 GitHub Flavored Markdown，但不是所有 Markdown renderer 都完全相同。FunnyTools Markdown Previewer 使用 Marked 產生 HTML，再以 DOMPurify 清理危險 HTML；它適合預覽結構，不代表最終 GitHub/CMS/MDX 的輸出一定完全一致。

## 一、標題 Headings

```md
# H1
## H2
### H3
#### H4
```

文件通常只保留一個主要 H1，後續用 H2/H3 建立清楚層級。

不要為了字變大而跳級：

```text
H1 → H4 → H2
```

這會讓文件結構混亂。

## 二、粗體與斜體

```md
**粗體**
*斜體*
***粗斜體***
```

不同 parser 對特殊邊界情況可能略有差異，普通文字使用上述寫法通常最穩定。

## 三、無序清單

```md
- Apple
- Banana
- Orange
```

也常見 `*` 或 `+`。

建議同一份文件保持一致。

## 四、有序清單

```md
1. Step one
2. Step two
3. Step three
```

Nested list 時要注意 indentation。

## 五、引用 Blockquote

```md
> 這是一段引用。
```

可用於：

- 引文；
- 提醒；
- 摘要。

但不同網站可能另外把 blockquote 套成 note / callout 樣式。

## 六、Inline Code

```md
使用 `npm install` 安裝。
```

適合：

- 指令；
- 變數；
- 檔名；
- 短程式碼。

## 七、Fenced Code Block

````md
```js
console.log("hello");
```
````

語言標籤 `js` 常被 syntax highlighter 使用，但：

> FunnyTools Markdown Previewer 目前不承諾自動做語言語法高亮。

Code block 主要先保留結構。

## 八、最常見 Code Fence 錯誤：忘記關閉

如果你寫：

````md
```js
console.log("hello");

## 下一個標題
````

後面整段可能都被當成 code。

Previewer 很適合在 commit 前抓這類錯誤。

## 九、連結

```md
[FunnyTools](https://funnytools.win/)
```

發布前要檢查：

- URL 是否正確；
- relative path 是否適用；
- 是否導到舊頁；
- 是否包含敏感 query parameter。

## 十、圖片

```md
![替代文字](image.png)
```

`alt` 應描述圖片在文件中的功能或內容，不是塞 SEO 關鍵字。

Relative image path 在不同平台可能基於不同 base URL。

## 十一、水平線

常見：

```md
---
```

但在某些 Markdown + front matter 系統中，文件最上方的 `---` 可能代表 YAML front matter。

所以 parser context 很重要。

## 十二、表格

常見 GFM table：

```md
| Name | Score |
|---|---:|
| Amy | 90 |
| Ben | 85 |
```

表格是 GitHub Flavored Markdown 常見擴充，不是所有最小 Markdown implementation 都保證一致。

## 十三、Task List

```md
- [x] Done
- [ ] Todo
```

常見於 GitHub。

其他 CMS 可能只顯示普通清單或不支援 checkbox 樣式。

## 十四、Markdown 不是單一完全一致的 Dialect

你可能遇到：

- CommonMark；
- GitHub Flavored Markdown；
- Markdown Extra；
- MDX；
- CMS 自訂 parser。

因此：

> 在 FunnyTools 預覽正常，最終平台仍要再測。

## 十五、Mermaid、LaTeX、MDX 不要假設都支援

FunnyTools 現行 Markdown Previewer 不應被描述成支援：

- Mermaid；
- LaTeX；
- MDX components；
- wikilinks；
- 平台專用 extensions。

如果最終系統需要這些語法，要在目標 renderer 測試。

## 十六、Markdown 裡的 Raw HTML

部分 parser 允許：

```html
<div>hello</div>
```

但直接把 Markdown 產生的 HTML 插入頁面可能有安全風險。

FunnyTools 的現行流程是：

1. Marked 產生 HTML；
2. DOMPurify sanitize；
3. 再顯示／輸出 sanitized HTML。

這是重要安全邊界。

## 十七、Sanitized 不代表內容可信

DOMPurify 可降低危險 HTML／attribute 執行風險，但它不會判斷：

- 連結是不是 phishing；
- 內容是不是謠言；
- 圖片是否侵權；
- 個資是否應公開。

安全 HTML ≠ 安全內容。

## 十八、Markdown Previewer 和 GitHub 為什麼不一樣？

可能因為：

- parser 不同；
- extensions 不同；
- CSS 不同；
- sanitizer 不同；
- relative path 不同；
- syntax highlighting 不同。

所以 README 發布前，最後仍應在 GitHub 看一次。

## 十九、README 建議結構

常見：

```md
# Project Name

一句話用途。

## Features

## Installation

## Usage

## Configuration

## License
```

不需要每個 README 都一樣，但要讓讀者快速回答：

- 這是什麼？
- 怎麼裝？
- 怎麼用？
- 有什麼限制？

## 二十、技術文件的標題層級

推薦：

`H1 → H2 → H3`

不要用粗體假裝 heading：

```md
**Installation**
```

語意結構不如真正 `## Installation` 清楚。

## 二十一、表格不一定是最佳 accessibility 選擇

如果資訊不是表格關係，改用 list 可能更好。

寬表格在手機也容易 overflow。

發布前應在實際版面檢查。

## 二十二、FunnyTools Previewer 適合什麼？

- README 草稿；
- Blog Draft；
- 文件表格；
- code fence 檢查；
- sanitized HTML snippet；
- 本機快速預覽。

它目前不：

- 開啟 `.md` file repository；
- 自動版本控制；
- 同步 GitHub；
- 執行 code block；
- 取代 CMS staging。

## 二十三、推薦發布前檢查

- [ ] 一個清楚 H1
- [ ] H2/H3 層級合理
- [ ] 清單 indentation 正確
- [ ] code fence 都關閉
- [ ] links 可用
- [ ] image alt 合理
- [ ] relative path 已在目標平台測
- [ ] table 在手機可讀
- [ ] 不依賴未支援 extension
- [ ] 最終平台再驗證一次

## 二十四、預覽與發布之間的相容性清單

Markdown 預覽通過，只代表目前 parser 能產生安全且可讀的 HTML。發布前仍應確認目標平台是否保留 heading 階層、表格、連結 target、圖片 alt 與 code fence；不同平台可能使用不同 dialect，也可能移除 inline HTML 或不支援 extension。若文件包含相對路徑，請從發布後的實際 URL 計算它的基準位置，避免首頁看得到、子頁面卻全部 404。

對外文件還要檢查連結文字是否能單獨理解、圖片是否有描述、表格在手機上是否能橫向閱讀，以及程式碼區塊是否只作為文字顯示。不要把預覽器宣稱成 JavaScript 執行環境，也不要把 sanitization 當成內容正確性的保證；安全與可讀性要分開驗證。

## 二十五、FAQ

### Markdown 和 HTML 一樣嗎？
不一樣。Markdown 通常先被 renderer 轉成 HTML 或其他輸出。

### FunnyTools 預覽和 GitHub 一定一樣嗎？
不一定。

### 支援 Mermaid 嗎？
現行 Previewer 不應宣稱支援 Mermaid。

### Markdown 可以放 HTML 嗎？
部分 dialect 可以，但安全處理取決於 renderer / sanitizer。

### Code block 會執行 JavaScript 嗎？
FunnyTools 預覽器把 code block 當文字顯示，不應執行。

## 二十六、延伸閱讀

- [Markdown 預覽器](/tools/markdown-previewer/)
- [JSON 格式錯誤](/guides/json-error-fix-guide/)
- [URL 編碼](/guides/url-encoding-percent-encoding-guide/)
- [Base64 UTF-8](/guides/base64-utf8-unicode-guide/)
- [文字與寫作工具](/category/text/)

## 頁面 CTA

**README commit 前先預覽一次。** 檢查標題、清單、表格、code fence 與 links，再到 GitHub 或最終 CMS 做第二次驗證。

CTA：`開啟 Markdown 預覽器`

## 圖卡與 ALT

`Markdown source → Marked → DOMPurify → Safe preview → Final platform check`

ALT：`Markdown 預覽流程圖，從原始 Markdown 經 parser 與 DOMPurify 清理到最終平台驗證`
