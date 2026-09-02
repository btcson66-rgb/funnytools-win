---
slug: "/guides/camelcase-snake-case-kebab-case-guide/"
seo_title: "camelCase、snake_case、kebab-case 差在哪？變數、URL、檔名命名指南｜FunnyTools"
meta_description: "camelCase、PascalCase、snake_case、kebab-case、CONSTANT_CASE怎麼選？用變數、API、URL、CSS、檔名與常數實例解釋常見命名格式。"
canonical: "https://funnytools.win/guides/camelcase-snake-case-kebab-case-guide/"
primary_keyword: "camelCase snake_case kebab-case 差別"
hero_title: "camelCase、snake_case、kebab-case 差在哪？"
hero_subtitle: "同一句文字可以變成多種命名格式；真正的選擇標準是語言、框架、API契約與團隊規範。"
---

# camelCase、snake_case、kebab-case 差在哪？

原文：

`user profile image`

可以變成：

- `userProfileImage`
- `user_profile_image`
- `user-profile-image`
- `USER_PROFILE_IMAGE`

語意一樣，但使用情境不同。

## camelCase

格式：

`userProfileImage`

特徵：
- 第一個詞小寫
- 後面每個詞首字大寫
- 沒有 separator

常見於：
- JavaScript variables
- functions
- object properties

但實際仍依專案規範。

## PascalCase

格式：

`UserProfileImage`

常見於：
- classes
- components
- types

FunnyTools 現行 Case Converter 公開按鈕目前沒有獨立 PascalCase，因此不要在文章裡宣稱工具支援。

如果 Codex 日後確認 repo 新增：
> 才更新。

## snake_case

格式：

`user_profile_image`

常見於：
- Python variables
- databases
- data pipelines
- some APIs

優點：
> word boundary 很明顯。

## kebab-case

格式：

`user-profile-image`

常見於：
- URL slug
- CSS class
- file naming
- command line flags

URL 通常不使用 camelCase，因為：
> lowercase + hyphen 更容易閱讀和一致處理。

但 SEO 不需要為了 keyword 亂改已存在健康 URL。

## CONSTANT_CASE

格式：

`MAX_UPLOAD_SIZE`

常見於：
- constants
- environment variable names

不要把所有 variables 都轉大寫。

## 命名不是純格式問題

例如：

`user id`

轉換器可能得到：

`userId`

但 API 契約可能要求：

`user_id`

如果你擅自改：

> integration 會壞。

所以 case converter 適合：
- 草稿
- 批次整理
- 命名候選

不是：
> 自動重構 production API。

## Acronym 特別麻煩

`API response URL`

可能有人寫：
- `apiResponseUrl`
- `APIResponseURL`
- `apiResponseURL`

沒有一個跨團隊唯一答案。

應以：
> code style guide

為準。

## FunnyTools 現有工具實際支援

目前公開頁面列出：

- UPPERCASE
- lowercase
- Title Case
- Sentence case
- camelCase
- snake_case
- kebab-case
- CONSTANT_CASE

並且：

> 只轉 ASCII 英文字母，CJK 保持原樣。

所以不要拿它當：
- locale-aware casing engine
- Unicode identifier normalizer
- code parser

## 轉換前檢查

### Identifier 是否 case-sensitive？
密碼、token、ID：
> 不要碰。

### 是否 public API？
改名可能是 breaking change。

### 是否 URL？
改 slug 需要 redirect / canonical。

### 是否 database column？
可能牽涉 migration。

## 實例

原文：

`student score report`

JavaScript variable：
`studentScoreReport`

Python：
`student_score_report`

CSS：
`student-score-report`

Environment variable：
`STUDENT_SCORE_REPORT`

## 工具

[英文大小寫轉換器](/tools/case-converter/)

## 延伸

## 重新命名的相容性檢查

若名稱已經進入公開 API、資料庫 migration、設定檔或 URL，改 case 不只是編輯動作。先列出 producer、consumer、測試 fixture 和文件中的引用，再決定要不要提供舊名稱的相容讀取。對檔案系統還要考慮大小寫敏感與不敏感環境的差異；在一台電腦可用，不代表部署到另一個系統仍可用。完成改名後跑 lint、typecheck、單元測試和最小整合測試，並檢查錯誤訊息是否仍指向正確名稱。

## 先看命名規約，再做轉換

camelCase、snake_case、kebab-case 和 UPPER_SNAKE_CASE 不是裝飾，而是不同工具鏈的識別方式。JavaScript 變數常見 camelCase，Python 變數常見 snake_case，HTML class 和 URL 常見 kebab-case，環境變數則常見大寫底線。若把一段程式碼整段轉換，可能改壞字串內容、JSON key、正規表示式、密碼、檔案路徑或外部 API 欄位，因此應只選取已確認是識別名稱的片段。

發布前可以列出每個名稱的用途、語言、允許字元與是否對大小寫敏感，再對照專案 lint 或 style guide。轉換後至少跑一次 parser、typecheck 或 API smoke test，並用搜尋確認舊名稱沒有遺漏在引用處。對公開 URL 還要考慮大小寫是否造成不同路徑；如果名稱已經被外部使用，通常應保留相容別名，而不是只改文字外觀。

- [Title Case vs Sentence case](/guides/title-case-vs-sentence-case-guide/)
- [文字清理與發布 Workflow](/workflows/text-cleanup-publishing-toolkit/)

## 轉換工具的安全邊界

大小寫轉換適合處理一般文字與已確認的命名清單，不適合把整個原始碼檔案直接貼上後全部改寫。字串常數、正規表示式、HTML 內容、翻譯 key 和序列化資料可能需要保留原樣；同一個 token 在變數、顯示文字和外部協定中的規則也可能不同。實作前先圈出可轉換範圍，轉換後再以 diff 檢查只有預期的識別名稱改變。

如果轉換結果要提交到版本庫，先在隔離分支執行 formatter、lint、typecheck 和測試，再用搜尋檢查匯入、匯出、路由、環境變數與文件連結。若是批次改檔，保留檔案清單與原始 commit，並準備以小批次回退。這樣可以把語法相容性、執行期相容性和文件相容性分開驗證，而不是把「看起來整齊」誤當成改名成功。

## 一個安全的改名清單

可以先建立四欄清單：舊名稱、新名稱、使用位置、相容期限。使用位置要拆成程式識別字、設定 key、資料庫欄位、URL、文件和使用者可見文字；每一欄的處理方式可能不同。先改內部引用，再保留外部輸入的舊名稱讀取，最後才在有遷移通知和測試覆蓋後移除別名。這個順序能降低一次改動同時影響多個消費者的風險。

對大小寫敏感的系統，還要在 Linux、Windows 和部署環境各測一次檔名與路由。若名稱包含 acronym、數字或連續分隔符，先寫出預期結果再交給工具轉換；工具不應替你猜測 `userID` 要變成 `user-id` 還是 `user-id` 的其他形式。最後檢查 generated code、型別宣告和文件範例，確保新舊名稱的遷移狀態清楚可追蹤。
