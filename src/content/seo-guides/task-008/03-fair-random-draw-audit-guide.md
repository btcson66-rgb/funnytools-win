---
slug: "/guides/fair-random-draw-audit-guide/"
seo_title: "公平抽籤怎麼做？名單、重複項、抽後移除、亂數來源與稽核紀錄完整指南｜FunnyTools"
meta_description: "公平抽籤不只按一個隨機按鈕。完整說明候選資格、重複姓名、抽後移除、等機率、Web Crypto、輪盤動畫、結果紀錄與正式抽獎為何需要可稽核流程。"
og_title: "公平抽籤怎麼做？真正決定公平的不是動畫"
og_description: "公平性來自正確名單、事先規則、均勻選取、重複項處理與可檢查紀錄。"
canonical: "https://funnytools.win/guides/fair-random-draw-audit-guide/"
primary_keyword: "公平抽籤"
card_title: "公平抽籤怎麼做？"
card_description: "名單、資格、重複項、抽後移除與結果紀錄，比轉盤轉幾圈更重要。"
hero_title: "公平抽籤怎麼做？名單、重複項、抽後移除、亂數來源與稽核紀錄完整指南"
hero_subtitle: "抽選演算法可以公平，但如果名單本身錯了、同一人出現兩次或規則抽到一半才改，結果仍然不公平。"
---

# 公平抽籤怎麼做？名單、重複項、抽後移除、亂數來源與稽核紀錄完整指南

「用了隨機工具，所以抽籤一定公平。」

這句話只對了一半。

公平抽選至少有五個層次：

1. 誰有資格進名單
2. 每個人有幾個抽選單位
3. 是否等機率
4. 抽到後是否移除
5. 結果是否可重現／稽核

> **速答：公平抽籤最重要的流程是什麼？**  
> 抽之前先凍結候選名單與資格，確認一行代表一個抽選單位，清理非預期重複項，事先公告抽幾位、是否抽後移除、是否允許同一人重複得獎。抽選時使用均勻亂數來源，抽完立即保存名單版本、時間、規則與結果。FunnyTools Name Picker、Wheel與Random Number適合課堂、會議與一般活動，但目前不提供不可竄改audit log、第三方簽章或公證，所以高價獎項與法律效果抽獎應採可稽核的正式流程。

## 一、名單比亂數更重要

假設100位合格者。

其中某人被貼了兩次：

```text
Amy
Amy
```

若每一行都是一個entry：

> Amy機率就可能變成別人的兩倍。

演算法完全均勻，結果仍不符合「每人等機率」。

## 二、同名不等於重複人

班上兩位都叫：

> 王小明

不能直接刪一個。

應加識別：

- 王小明 A01
- 王小明 B17

重點是分辨：

> 重複文字 vs 重複資格。

## 三、抽之前就要決定是否「抽後移除」

### 不移除
每一輪都可再次中選。

### 移除
中選後下一輪不再參加。

兩者都可能合理。

錯的是：

> 抽到自己不喜歡的結果才臨時改規則。

## 四、一次抽多位和連續抽一位一樣嗎？

如果一次抽多位且不重複：

> 本質接近 without replacement sampling。

若每次抽一位後又把人放回：

> 是 with replacement。

規則不同，機率也不同。

## 五、FunnyTools Name Picker 現在怎麼做？

現行工具：

- 一行一個entry
- 可一次抽一位或多位
- 單次多抽不重複position
- 可選抽出後從名單移除
- 重複文字會保留為不同entry
- Web Crypto + Fisher–Yates
- 本機處理

這讓一般抽選邏輯很透明。

## 六、Wheel Spinner呢？

FunnyTools現行Wheel：

> 每一個非空白行建立一個等寬segment。

所以：

```text
A
A
B
```

代表：
- A有兩格
- B有一格

理論機率就是：

- A：2/3
- B：1/3

這可以用來「有意加權」，但也可能是誤貼重複資料。

## 七、動畫是不是隨機的一部分？

現行Wheel先決定中選index，再播放動畫落到該segment。

因此：

> 轉幾圈不是機率來源。

公平性應看：
- 候選segments
- index selection
- algorithm

不是看動畫是否刺激。

## 八、Random Number怎麼用於抽號碼？

若參加者編號1～500：

- min = 1
- max = 500
- quantity = 10
- 不允許重複

可以抽10個不同號碼。

但前提：

> 每個號碼真的只對應一個有效參加者。

## 九、抽獎前要不要公開名單？

視隱私與情境。

高透明度不等於公開個資。

可以公開：
- 編號
- alias
- 匿名代碼

而完整姓名保留在授權紀錄中。

## 十、結果截圖夠不夠？

低風險活動可能夠。

正式稽核至少還需要：
- 原始候選名單版本
- 抽選規則
- 抽選時間
- 是否移除
- 抽幾位
- 結果順序

單一截圖不能證明：

> 抽之前名單沒有被改。

## 十一、瀏覽器本機處理有什麼好處？

名單不需上傳FunnyTools伺服器。

這對：
- 班級
- 內部會議
- 低風險活動

有隱私優勢。

但：
> 本機處理也不自動產生第三方稽核證據。

## 十二、正式抽獎還需要什麼？

視法規與獎項而定，可能需要：

- 官方活動規則
- eligibility rule
- cutoff time
- duplicate handling
- audit trail
- witness
- signed record
- certified drawing system

FunnyTools目前不是公證抽獎平台。

## 十三、短期出現連續同類結果正常嗎？

如果規則允許放回：

> 同一人連續兩輪中選並非不可能。

如果你希望每人一輪只出現一次：

> 就應使用抽後移除／without replacement。

不能要求「真正隨機」同時又要求「看起來平均」。

## 十四、最小可稽核流程

### Step 1
固定名單版本。

### Step 2
標記資格與ID。

### Step 3
去除意外重複。

### Step 4
公告：
- 抽幾位
- 是否放回
- 重新抽條件

### Step 5
執行抽選。

### Step 6
保存結果與時間。

### Step 7
不要事後更改名單後假裝是同一次抽選。

## 十五、常見錯誤

- 名單沒清理
- 同一人多行
- 同名被誤刪
- 抽後才決定是否移除
- 動畫當公平證據
- 只保存結果不保存名單
- 正式高價抽獎只靠一般網頁工具

## 十六、FAQ

### 同一名字出現兩次會怎樣？
如果是兩個entry，通常就有兩個抽選位置。

### 抽多位會重複嗎？
FunnyTools現行Name Picker單次多抽不重複position。

### 可以避免下一輪再中嗎？
可啟用抽出後移除。

### Wheel每一格機率一樣嗎？
現行工具每個非空白entry一個等寬segment；重複文字等於多個segment。

### FunnyTools適合正式公證抽獎嗎？
不適合取代可稽核、公證或依法規設計的正式流程。

## 十七、延伸閱讀

- [隨機姓名抽籤](/tools/random-name-picker/)
- [轉盤抽籤](/tools/random-wheel/)
- [抽後放回 vs 不放回](/guides/random-sampling-with-without-replacement/)
- [亂數真的隨機嗎](/guides/secure-random-vs-math-random-guide/)
- [Modulo Bias指南](/guides/rejection-sampling-modulo-bias-guide/)

## 頁面 CTA

**一般活動要公平抽人？**

先清理並凍結名單，再決定「抽到後是否移除」，最後才按抽選。

CTA：`開啟隨機姓名抽籤`

次要 CTA：`想用視覺輪盤？`

## 圖卡與 ALT

`Fair draw = eligible list + clear rules + uniform selection + record`

ALT：`公平抽籤流程圖，包含候選資格、規則、均勻抽選與結果紀錄四個階段`
