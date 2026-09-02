---
slug: "/workflows/verify-tool-result/"
seo_title: "如何自己驗證線上工具結果？公式、已知答案、邊界與檔案輸出複核流程｜FunnyTools"
meta_description: "不確定線上計算器或檔案工具是否正確？用一組可手算或可預期的小案例，逐步檢查公式、輸入、rounding、輸出、邊界與正式制度。"
canonical: "https://funnytools.win/workflows/verify-tool-result/"
hero_title: "工具結果複核流程"
hero_subtitle: "不用先相信任何網站，包括 FunnyTools。用一個小而已知的案例，就能快速判斷工具是不是按你以為的規則工作。"
---

# 工具結果複核流程

這個流程適合：

- 計算器結果和Excel不同
- GPA和LMS不同
- PDF輸出怪怪的
- 圖片尺寸不對
- JSON轉換後資料跑掉
- Random工具看起來「不平均」
- 想確認本機處理

## 路徑 A：計算器

### Step 1 — 找公式

先看工具／指南：

> 它宣稱算什麼？

不要只看輸入欄名稱。

### Step 2 — 選簡單案例

例如Weighted Average：

- 80 ×1
- 90 ×3

手算：

`87.5`

### Step 3 — 輸入工具

確認：
- 小數
- 權重
- 空白
- 單位

和手算完全相同。

### Step 4 — 比結果

一致：
> 通過這個case。

不一致：
先檢查：
- 公式
- round
- blank
- locale
- hidden rule

### Step 5 — 測邊界

再試：
- 0
- blank
- negative
- max/min
- invalid

### Step 6 — 正式制度

若是：
- GPA
- salary
- mortgage
- business day

最後再查：

> 學校／政府／銀行／所在地規則。

工具只能驗證數學層。

---

## 路徑 B：文字／資料轉換

### Step 1
使用很小的fixture。

JSON：

```json
{"a":1,"b":[true,null]}
```

### Step 2
轉換。

### Step 3
如果可逆：

> Round trip。

例如：
JSON → minify → parse

Base64：
Text → Encode → Decode

### Step 4
比較：
- 字元
- 欄位
- 順序（若規格保證）
- leading zeros
- Unicode

### Step 5
加入edge case：
- comma
- quotes
- newline
- emoji

---

## 路徑 C：PDF／圖片

### Step 1
不要先用重要文件。

建立：
> 無敏感資訊的小fixture。

### Step 2
執行：
- merge
- split
- resize
- convert

### Step 3
下載後：

> 重新開啟。

### Step 4
檢查：
- 頁數
- 順序
- dimensions
- format
- transparency
- readable content

### Step 5
再使用正式檔案。

對重要文件：

> 保留原檔。

---

## 路徑 D：Random

不要問：

> 「為什麼連續三次都是A？」

先問：

- 候選池正確？
- duplicate lines?
- replacement rule?
- range?
- code uses intended random source?

用property：
- 全部結果在range
- no-repeat模式無重複
- quantity正確

不要用短期平均當硬性判斷。

---

## 路徑 E：本機處理

### Step 1
開 DevTools Network。

### Step 2
清除紀錄。

### Step 3
輸入：

`TEST-LOCAL-12345`

### Step 4
執行工具。

### Step 5
在request中搜尋該字串。

如果沒有：
> 提供一個實際本機處理證據。

仍可再：
- code audit
- 查看third-party scripts

---

## 發現Bug怎麼回報？

保存：

- URL
- Site version
- Browser
- Device
- Input
- Expected
- Actual
- Screenshot
- Output file（無敏感內容）

最有價值的一句不是：

> 「壞了。」

而是：

> 「輸入 X，預期 Y，實際 Z。」

## 最終Checklist

- [ ] 我知道工具的公式／目的
- [ ] 我用了一個已知小案例
- [ ] 我測了至少一個邊界
- [ ] 我分清display rounding和正式規則
- [ ] 檔案工具下載後有重新開啟
- [ ] Random沒有用短期平均誤判
- [ ] 重要正式結果已查官方規則
- [ ] 若有bug，我保存了可重現條件

## 相關頁面

- [Methodology Hub](/methodology/)
- [公開測試案例](/methodology/public-test-cases/)
- [公式驗證](/methodology/calculator-formula-verification/)
- [本機處理](/methodology/browser-local-processing/)
- [檔案工具驗證](/methodology/file-tool-verification/)

## CTA

**先拿一個你自己知道答案的小案例，現在就試一次。**

CTA：`查看公開測試案例`


