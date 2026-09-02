---
slug: "/guides/flowchart-symbols-guide/"
seo_title: "流程圖符號怎麼用？Process、Decision、Arrow、Start End 與簡化原則｜FunnyTools"
meta_description: "流程圖符號怎麼用？完整說明Process矩形、Decision菱形、Start/End、箭頭、輸入輸出等常見符號，並解釋FunnyTools現行只提供流程矩形與決策菱形時如何畫出清楚的簡易流程圖。"
og_title: "流程圖符號怎麼用？矩形、菱形與箭頭一次看懂"
og_description: "符號不是越多越專業；簡單流程圖最重要的是行動用矩形、可回答的條件用菱形、箭頭方向一致。"
canonical: "https://funnytools.win/guides/flowchart-symbols-guide/"
primary_keyword: "流程圖符號"
card_title: "流程圖符號怎麼用？"
card_description: "行動用Process、條件用Decision、箭頭表方向；其他符號按需要再增加。"
hero_title: "流程圖符號怎麼用？Process、Decision、Arrow、Start End 與簡化原則"
hero_subtitle: "清楚的流程圖不靠二十種符號，而是每個形狀都有固定語意，讀者不需要猜。"
---

# 流程圖符號怎麼用？Process、Decision、Arrow、Start End 與簡化原則

畫流程圖最常見的問題不是不會畫箭頭，而是所有步驟都用同一個形狀，或每個形狀都亂換。

> **速答：流程圖最基本符號怎麼用？**  
> 最常見做法是：一般行動／處理步驟用矩形（Process），需要回答「是／否」「有／沒有」等條件分支時用菱形（Decision），箭頭表示流程方向；正式流程圖也常用橢圓或圓角形表示Start/End，以及平行四邊形表示Input/Output。FunnyTools現行流程圖工具刻意只提供Process矩形與Decision菱形，加上箭頭連線，因此適合簡短流程與決策示意，不是完整BPMN、UML或專業流程建模器。

## 一、Process 矩形

矩形代表做一件事。好的文字通常是：

- 填寫申請表
- 檢查附件
- 寄出通知
- 儲存資料

最好用「動詞＋對象」，不要只寫「文件」「審核」「系統」。

## 二、Decision 菱形

菱形代表一個會造成分支的問題，例如「資料完整嗎？」出口可分成是／否。好的Decision應該可以回答；「資料完整性」只是主題，不是問題。

## 三、Arrow 箭頭

箭頭回答下一步往哪裡走。若整體方向是上→下，儘量維持同一主方向，除非真的存在回圈。

## 四、Start / End

正式流程圖常用oval／terminator表示開始與結束。FunnyTools目前沒有獨立Start/End形狀，因此簡單圖可以用Process矩形寫「開始」「結束」，但不能宣稱工具有不存在的元件。

## 五、Input / Output

常見流程圖會用平行四邊形表示輸入／輸出，例如「輸入姓名」「顯示結果」。FunnyTools現行沒有此形狀，簡易圖仍可用Process矩形表達。

## 六、符號不是越多越專業

若圖只有5～10步，增加很多少見符號反而要求讀者先學圖例。符號精度應配合讀者與用途。

## 七、Decision 應有清楚出口

最常見：
- Yes / No
- True / False
- Pass / Fail

FunnyTools現有箭頭不支援箭頭文字label；若需要明確Yes/No，可讓後續節點文字寫清楚，或匯出後用其他編輯器補標記。

## 八、流程方向不一定上到下

常見是top→bottom或left→right。簡報橫向版面可能適合左→右，長文章則上→下較自然。重點是一致。

## 九、交叉箭頭越少越好

如果很多線交叉，讀者容易看錯來源與終點。可重新排列節點、把相關分支靠近，或把複雜流程拆成子圖。

## 十、循環怎麼畫？

例如「資料完整嗎？」否→補件→再檢查，就是合理loop。要確認循環有可以離開的條件；若每條路都回原點，可能是流程本身有問題。

## 十一、一個節點放多少文字？

FunnyTools現行節點文字的可見空間有限，西文實作頁標示三行內最穩妥。因此不要把一整段SOP塞進一個矩形。一節點一行動，詳細規範放圖外文字。

## 十二、FunnyTools現行限制

目前：
- Process rectangle
- Decision diamond
- straight arrow
- drag node
- edit text
- delete
- PNG export
- 最多約20 nodes
- no undo
- no autosave
- no editable project file
- arrow無label
- grid會出現在1000×620輸出PNG

因此它適合短流程示意。

## 十三、什麼時候該換專業工具？

若需要：
- BPMN
- UML activity diagram
- swimlane
- connector routing
- 多頁流程
- 團隊協作
- version history
- editable project file

FunnyTools現有簡易流程圖就不夠。

## 十四、流程圖驗證法

請另一個人不聽解釋，直接從第一步走到最後。如果他一直問「這裡往哪」「這個菱形要回答什麼」「這條線是哪來的」，表示流程仍不清楚。

## 十五、常見錯誤

- Decision菱形裡不是問題。
- 一個矩形塞五個動作。
- 箭頭交叉太多。
- 分支沒有出口語意。
- 為了專業感塞太多符號。
- 把簡易工具當BPMN系統。

## 十六、符號不足時的替代做法

如果工具沒有獨立的 Start、End 或箭頭文字標籤，可以在第一個與最後一個矩形直接寫「開始」與「完成」，並在分支後方用短句說明條件結果。這種做法不是完整的流程標準，但對小型工作步驟仍能保持可讀性；重要的是每個節點只做一件事，每條線都能追溯到下一個明確步驟。

完成後把流程交給未參與繪圖的人閱讀，要求他只依照圖上的節點與箭頭走一次。若讀者需要靠作者口頭補充才能理解，就先重寫節點文字或調整方向，不要只增加顏色與裝飾。流程圖的相容性首先是語意相容，其次才是不同匯出格式的外觀相容。

## 十七、FAQ

### 流程圖矩形代表什麼？
通常代表Process／行動步驟。

### 菱形代表什麼？
Decision／條件判斷。

### FunnyTools有Start/End橢圓嗎？
目前沒有獨立Start/End形狀。

### 可以在箭頭上寫Yes/No嗎？
現行工具的箭頭不支援文字label。

## 十八、延伸閱讀

- [流程圖製作工具](/tools/flowchart/)
- [決策樹 vs 流程圖](/guides/decision-tree-vs-flowchart-guide/)
- [流程圖怎麼畫才看得懂](/guides/flowchart-design-checklist/)
- [SVG vs PNG](/guides/svg-vs-png-diagram-export/)
- [圖表與流程圖 ALT](/guides/chart-flowchart-alt-text-accessibility/)

## 頁面 CTA

**只有幾個步驟與簡單條件？**

用Process、Decision與箭頭就足夠，先把邏輯畫清楚，再考慮符號完整性。

CTA：`開啟流程圖製作工具`

次要 CTA：`決策樹和流程圖差在哪？`

## 圖卡與 ALT

`Process ▭ = action`  
`Decision ◇ = question`  
`Arrow → = direction`

ALT：`流程圖基本符號示意圖，矩形代表處理步驟，菱形代表決策問題，箭頭代表流程方向`
