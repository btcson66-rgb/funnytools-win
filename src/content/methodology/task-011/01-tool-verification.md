---
slug: "/methodology/tool-verification/"
seo_title: "線上工具怎麼驗證？Known Answer、Boundary 與 Regression Test｜FunnyTools"
meta_description: "FunnyTools如何測試線上工具？完整說明known-answer test、boundary test、round-trip test、error-state、regression test與人工瀏覽器驗證，並說明自動測試通過不等於所有情境都正確。"
canonical: "https://funnytools.win/methodology/tool-verification/"
primary_keyword: "線上工具 驗證 測試"
card_title: "工具到底怎麼驗證？"
card_description: "不是只點一次按鈕；要測已知答案、邊界、錯誤輸入、來回轉換與回歸。"
hero_title: "線上工具怎麼驗證？Known Answer、Boundary 與 Regression Test"
hero_subtitle: "不同工具需要不同證據：計算器看已知答案，轉檔工具看來回開啟，亂數工具看不變條件與演算法，UI還要看真實瀏覽器。"
---

# 線上工具怎麼驗證？Known Answer、Boundary 與 Regression Test

「工具頁能開」只能證明：

> route存在。

它不能證明：

> 結果正確。

FunnyTools 的工具驗證應分成至少六層。

## 一、Smoke Test：工具有沒有基本跑起來？

最基本：

- 頁面載入
- 輸入欄存在
- 按鈕可以按
- 結果區出現
- Console沒有明顯錯誤

Smoke test 是：

> 最低門檻。

它不能證明數學或檔案正確。

## 二、Known-Answer Test：用已知答案檢查

最適合計算器。

例如：

> 25% of 200 = 50

如果 Percentage Calculator 得到：

> 50

通過一個known-answer case。

Weighted Average：

- 80，weight 1
- 90，weight 3

公式：

`(80×1 + 90×3)/(1+3)`

`= 350/4`

`= 87.5`

這是非常容易人工重算的case。

## 三、Boundary Test：邊界會不會壞？

例如 Percentage：

- 0%
- 100%
- 負數
- original = 0 的 percent change
- very large number

Weighted Average：

- weight = 0
- negative weight
- blank
- one valid row

GPA：

- blank credits
- zero credits
- highest grade
- F

邊界測試比「正常值」更容易找出bug。

## 四、Invalid Input Test

工具不應因為錯誤資料就：

> 顯示一個看似正常的答案。

例如：
- `abc`
- 空值
- 不完整JSON
- EAN錯check digit
- 超過工具限制的PDF

合理行為可能是：
- 顯示錯誤
- disable button
- skip invalid row
- 説明限制

真正規則要以工具設計為準。

## 五、Round-Trip Test

適合：

- JSON ↔ CSV
- Base64 encode/decode
- URL encode/decode
- JPG/PNG轉換
- PDF split/merge的一部分

例如文字：

`Hello 世界`

Encode後再Decode：

> 應回到相同文字。

但round-trip不是所有轉換都能完全無損。

JPG：
> lossy。

PDF → image：
> 會丟失文字／表單語意。

所以先確認「理論上是否可逆」。

## 六、Structural Validation

PDF或圖片不只看：

> 有沒有下載。

還要檢查：

- 檔案可重新打開
- MIME/type合理
- PDF頁數
- 圖片尺寸
- 格式signature
- 檔案不為0 byte

這比只看download success更有效。

## 七、Regression Test

修一個bug後：

> 要把bug輸入保留下來。

未來每次build再跑一次。

這叫 regression test。

例：
某次：
> EAN輸入12位自動補check digit算錯。

修好後應新增固定fixture。

不然下次重構又可能回來。

## 八、Cross-Check Test

重要公式可以：

> 用兩種獨立方式算。

例如：
- 工具JavaScript
- 手算公式
- 小型獨立test function

如果兩個方法只是呼叫同一個function：

> 不是真正獨立cross-check。

## 九、Visual Test

Canvas／Chart／PDF preview：
- overflow
- 截字
- mobile
- dark mode
- zoom

這些不是數學bug，但會讓工具無法使用。

## 十、Manual Browser Test

自動化無法涵蓋所有：

- Safari
- iOS
- Android Chrome
- low-memory device
- touch interaction
- file picker

所以重要檔案工具仍要：

> 真機測。

## 十一、Pass 不等於 Certified

FunnyTools的公開測試表示：

> 在已列案例中得到預期結果。

不代表：
- ISO認證
- 政府驗證
- 銀行認證
- 學校認證
- 所有輸入都正確

避免把 QA 語言變成誇大宣傳。

## 十二、建議每個核心工具都有一個 Verification Block

可顯示：

- Formula / algorithm
- 3–5 public test cases
- Last substantive review
- Known limits
- Data processing
- Report issue

讓使用者不用只相信一句：

> 「準確」。

## FAQ

### 測試通過就一定沒bug？
不可能保證。

### 為什麼要公開測試案例？
因為使用者可以自己輸入重現。

### 所有工具都適合known-answer嗎？
不是；檔案、繪圖、random需要不同測試方法。

### 自動測試可以取代手機實測嗎？
不能完全取代。

## 延伸閱讀

- [公開測試案例](/methodology/public-test-cases/)
- [計算器公式驗證](/methodology/calculator-formula-verification/)
- [檔案工具驗證](/methodology/file-tool-verification/)
- [工具結果複核 Workflow](/methodology/tool-verification/)
