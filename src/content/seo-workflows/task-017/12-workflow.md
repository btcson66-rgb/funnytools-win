---
slug: "/workflows/text-cleanup-publishing-toolkit/"
seo_title: "文字清理與發布前檢查工具組｜字數、字元、空白行、大小寫與排序 Workflow｜FunnyTools"
meta_description: "從PDF、網頁、AI或試算表取得文字後，依序完成原文備份、空白清理、隱藏字元檢查、大小寫、排序、字數、UTF-8 bytes與最終平台驗證。"
canonical: "https://funnytools.win/workflows/text-cleanup-publishing-toolkit/"
primary_keyword: "文字清理 workflow"
hero_title: "文字清理與發布前檢查工具組"
hero_subtitle: "把『貼上後亂掉的文字』整理成可交付版本：先保留原文，再清理，再格式化，最後才做長度檢查。"
---

# 文字清理與發布前檢查工具組

這個 Workflow 適合：

- 從 PDF 複製文字
- 從網頁複製內容
- AI 草稿
- 試算表名單
- CMS 文案
- 作業
- 社群內容
- API / import 前文字檢查

核心順序是：

> **Preserve → Clean → Normalize → Sort if needed → Count → Verify destination**

## Step 1 — 保存 Raw

先保留：

`original.txt`

或原始文件。

理由：
- 清理是 destructive transform
- 去重不可逆
- 排序會改順序
- trim 會改原始字串

沒有 raw backup：

> 後面很難知道工具改了什麼。

## Step 2 — 判斷內容類型

### Prose
文章、Email、報告。

不要：
> 隨便排序。

### List
一行一筆：
- name
- keyword
- ID

可以：
> clean / dedupe / sort。

### Structured data
CSV、JSON。

不要只用：
> line tools

當 parser。

應用對應工具。

## Step 3 — 清空白行

工具：
[移除空白行](/tools/remove-empty-lines/)

### 文章
優先：
> 壓縮連續空白成單一空白行。

### 名單
可以：
> 全部移除。

必要時：
> trim 每行前後空白。

## Step 4 — 檢查異常空白

如果：
- search找不到
- exact match失敗
- character count怪

看：
[NBSP／零寬空格指南](/guides/invisible-spaces-nbsp-zero-width-guide/)

不要一律刪除所有 ZWJ／zero-width chars。

## Step 5 — 大小寫

只有真的需要才做。

工具：
[英文大小寫轉換器](/tools/case-converter/)

### 文章標題
選：
- Title Case
- Sentence case

再人工校正：
- brands
- acronyms
- proper nouns

### 程式命名
選：
- camelCase
- snake_case
- kebab-case
- CONSTANT_CASE

不要對：
- password
- token
- case-sensitive ID

轉換。

## Step 6 — 清單才排序

工具：
[文字行排序](/tools/sort-lines/)

先選：
- A→Z
- Z→A
- numeric
- length

如果數字：
> 不要誤用預設字串排序。

## Step 7 — 長度檢查

### 長文章
[字數統計工具](/tools/word-counter/)

看：
- word
- character
- paragraph
- sentence
- reading time

### 硬限制
[字元計數器](/tools/character-counter/)

看：
- characters with spaces
- without spaces
- UTF-8 bytes
- lines

## Step 8 — Unicode / Emoji

如果內容含：
- emoji
- CJK
- combining marks

不要假定：
> 1 visible symbol = 1 code unit = 1 byte。

看：
[Emoji與Grapheme指南](/guides/emoji-character-count-grapheme-guide/)

## Step 9 — 目標平台驗證

最後貼到：
- submission system
- CMS
- API
- database
- social platform

再驗證一次。

第三方工具：

> 只能做預檢。

## 三種快速 Workflow

### A. PDF 文章
Raw
→ Remove Empty Lines（壓縮）
→ 人工修斷行
→ Word Counter
→ 目標文件

### B. 名單
Raw
→ Remove Empty Lines（全部移除）
→ Trim
→ Dedupe
→ Sort Lines
→ Count
→ Import

### C. 技術字串
Raw
→ Character Counter
→ UTF-8 bytes
→ Case format if appropriate
→ 真實 API test

## 最後檢查

- [ ] 原始文字仍保留
- [ ] 沒把段落誤刪
- [ ] 沒對 code/password 做 case transform
- [ ] 清單排序模式正確
- [ ] word/character/byte 指標沒混用
- [ ] emoji / Unicode 已考慮
- [ ] 已在目標平台驗證

## 相關中心

## 完成條件與回復策略

這個流程只有在輸出可重現時才算完成。交付紀錄應包括原始輸入位置、清理規則、計數口徑、排序模式、輸出編碼、驗證日期和目標系統結果。若任何一步的規格不清，先停在草稿狀態，不要覆蓋原檔或直接匯入正式資料。發現輸出不對時，回到上一個保存版本，重新執行單一步驟並比較差異；不要把多個未驗證的清理動作一次疊加。對重要名單和技術字串，完成後仍保留人工抽查與回復路徑。

## 針對不同資料的安全分支

文章草稿先走保守分支：保留段落與標題，清理多餘空白後再計算 word、character 和 reading time。名單資料則先確認一行是否代表一筆，再決定去重和排序；如果原始內容可能有逗號、引號或多行欄位，就改用 CSV 工具。技術字串則完全不同，先計算 bytes 和字元，再檢查大小寫是否屬於協定規則，最後用測試 API 驗證。

每個分支都應保存輸入、輸出、使用的規則與驗證結果。若輸出要交給別的平台，先用平台的測試欄位或 sandbox，不要直接覆蓋正式資料。發現數字不一致時，回到規格逐項比對空白、換行、Unicode、emoji、編碼和截斷方式；不要為了看起來一致而刪除未知字元。當結果通過人工抽查、格式檢查與目標系統回讀後，才把清理後版本標記為可發布。

[文字與寫作完整指南中心](/guides/text-writing/)

## 發布前的最小相容性矩陣

至少用一份文章、一份名單和一份技術字串跑完整流程。文章要驗證段落、標題、閱讀時間與字數；名單要驗證空白行、去重、排序和每行邊界；技術字串要驗證大小寫、Unicode、UTF-8 bytes 和 parser。每一類都保留原文、處理規則、輸出與回讀結果，讓問題能定位在某一步，而不是只看到最後匯入失敗。

若流程使用瀏覽器工具，還要測試貼上、下載、重新載入和窄螢幕顯示；若使用腳本，則測試空輸入、單筆輸入、尾端換行、非 ASCII 字元和超過限制的輸入。只有在測試結果符合規格時才更新正式檔案。若任一步失敗，保留上一個可用版本並記下失敗樣本，修正規則後從該步重跑，不要把未驗證輸出繼續傳給下一個系統。

## 交付紀錄範本

每次完成可記錄輸入資料的來源、是否含個資、備份位置、採用的清理規則、工具版本、計數單位、排序模式、輸出編碼和目標平台。再附上通過的 fixture、人工抽查筆數、平台回讀結果與負責人。若輸出被拒絕，不要覆蓋原檔，改記錄錯誤訊息、失敗步驟和下一次重試的前置條件。

對需要多人協作的內容，先讓一人確認資料形狀，另一人確認規則，最後由交付者驗證輸出。瀏覽器工具的下載檔和腳本產物都要重新開啟或解析一次，確認不是空檔或錯誤頁面。只有在原文可回復、規則可重現、格式可解析、數字口徑清楚且目標系統接受後，才把版本標成完成。
