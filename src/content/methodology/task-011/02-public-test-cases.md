---
slug: "/methodology/public-test-cases/"
seo_title: "FunnyTools 公開測試案例｜Percentage、Weighted Average、GPA、Base64、UUID"
meta_description: "可直接重現的FunnyTools公開測試案例：Percentage、Weighted Average、Grade Average、GPA、Base64、JSON、UUID與Random工具，以已知答案與不變條件協助使用者自行複核。"
canonical: "https://funnytools.win/methodology/public-test-cases/"
primary_keyword: "FunnyTools 測試案例"
card_title: "公開測試案例"
card_description: "不用相信網站聲明，直接把已知輸入貼進工具，看結果是否符合公式與格式。"
hero_title: "FunnyTools 公開測試案例"
hero_subtitle: "最好的『準確』證明不是一枚徽章，而是一組任何人都能重新輸入、重新計算的例子。"
---

# FunnyTools 公開測試案例

這一頁不是完整 test suite。

它提供的是：

> 使用者可重現的 public fixtures。

真正自動化測試仍應存在 repository 中，並由 Codex 在 Task 011 實作或補齊。

## 1. Percentage：25% of 200

輸入：
- X = 25
- Y = 200

預期：

`200 × 25/100 = 50`

結果：
> 50

## 2. Percentage：50 is what % of 200

`50/200 ×100`

`=25%`

預期：
> 25%

## 3. Percentage change

Original：
> 100

New：
> 120

`(120-100)/100×100`

`=20%`

預期：
> +20%

Original = 0：

> 百分比變化沒有一般有限定義。

工具應顯示undefined／錯誤／不可計，而不是假裝0%。

## 4. Weighted Average

資料：

| Value | Weight |
|---:|---:|
| 80 | 1 |
| 90 | 3 |

`(80×1+90×3)/4`

`=87.5`

預期：
> 87.5

## 5. Weighted Average：權重不必100

同樣輸入：

- weight 25
- weight 75

結果仍：

`87.5`

因為比例：

> 1:3 = 25:75。

## 6. Grade Average

分數：

`80, 90, 100`

平均：

`270/3 = 90`

預期：
> 90

## 7. Grade Average Blank Behavior

輸入：

- 80
- blank
- 100

目前工具設計若blank ignored：

`180/2 =90`

Task 011 Codex 必須先讀程式確認。

如果 repo behavior不同：

> 更新本fixture，而不是強迫code符合文章。

## 8. GPA 4.0 Preset

假設当前repo 4.0 table：

- A=4.0
- B=3.0

資料：
- A，3 credits
- B，3 credits

Quality points：

`12 +9 =21`

GPA：

`21/6 =3.5`

預期：
> 3.50

正式institution GPA仍需校規。

## 9. GPA 4.3 Preset

假設当前repo：
- A+ 4.3
- A 4.0

各3 credits：

`(4.3×3 +4.0×3)/6`

`=24.9/6`

`=4.15`

預期：
> 4.15

Codex 必須依實際repo scale更新fixture。

## 10. Base64 ASCII

文字：

`Hello`

UTF‑8 bytes編碼Base64：

`SGVsbG8=`

Encode：
> 應得到 `SGVsbG8=`

Decode：
> 回到 `Hello`

## 11. Base64 Unicode Round Trip

文字：

`你好🙂`

不要求使用者手算Base64。

測試條件：

> Encode → Decode後必須得到完全相同Unicode字串。

這是round-trip invariant。

## 12. JSON Formatter

輸入：

```json
{"a":1,"b":[true,null]}
```

Beautify後：
- 必須仍為valid JSON
- parse後資料結構相同

Minify後：
- parse後資料結構相同

## 13. Invalid JSON

輸入：

```text
{'a':1}
```

標準JSON不允許single quote key。

工具應：
> 顯示invalid

不能偷偷把它當JavaScript object修掉，除非產品明確是「repair tool」。

## 14. UUID v4

每個輸出應符合v4結構：

`xxxxxxxx-xxxx-4xxx-[89ab]xxx-xxxxxxxxxxxx`

不應：
- 重複固定測試值
- 產生非v4 version nibble

但隨機UUID測試不應硬寫：

> 「下一次一定不同」

因為理論碰撞機率不是0。

## 15. Random Number Range Invariant

設定：

- min 1
- max 6
- quantity 100

每一個結果：

`1 ≤ x ≤ 6`

若：
> allow duplicates = false

且quantity≤range size：

> 結果應無重複。

## 16. Random Distribution Test 的界線

可以跑很多次觀察頻率。

但：
> 「六面每面必須剛好16.67%」

不是單次test。

統計頻率只能做sanity check，不能單獨證明cryptographic security。

## 17. File Tool Fixtures

Task 011 應在repo新增小型測試資產：

- 2頁PDF
- 3頁PDF
- 100×50 PNG
- transparent PNG
- small JPG
- UTF‑8 CSV
- JSON fixture

用途：
> 回歸測試。

測試資產不能含真實個資或版權不清內容。

## 18. 版本與測試日期

公開fixture區應顯示：

- Site version
- Tool route
- Last verified
- Expected result
- Test type

不要每天自動改日期。

只有：

> fixture真的重新驗證

才更新。

## FAQ

### 公開案例是完整測試嗎？
不是，是使用者可重現的一小組。

### 為什麼不提供所有edge cases？
完整suite屬於repository；公開頁要維持可讀性。

### 測試案例和正式規則衝突怎麼辦？
產品code與正式規則需要分層處理，尤其GPA、薪資、貸款等。

## 延伸閱讀

- [工具驗證方法](/methodology/tool-verification/)
- [公式驗證](/methodology/calculator-formula-verification/)
- [工具結果複核](/methodology/tool-verification/)
