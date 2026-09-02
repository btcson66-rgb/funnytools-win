---
slug: "/guides/qr-barcode/"
seo_title: "QR Code 與條碼完整指南中心｜掃描、印刷、Wi-Fi、EAN、UPC、Code 128｜FunnyTools"
meta_description: "FunnyTools QR Code 與條碼指南中心：從 QR Code 掃不到、容錯、Logo、靜態/動態、Wi-Fi、安全，到 EAN-13、UPC-A、Code 128、Code 39、檢查碼與印刷品質一次整理。"
og_title: "QR Code 與條碼完整指南中心"
og_description: "先選對 QR 或一維條碼，再處理掃描、內容、印刷、安全與商品編號規格。"
canonical: "https://funnytools.win/guides/qr-barcode/"
primary_keyword: "QR Code 條碼 指南"
card_title: "QR Code 與條碼完整指南中心"
card_description: "從手機 QR、Wi-Fi、海報印刷，到 EAN、UPC、Code 128 與倉儲標籤，依用途找到正確指南與工具。"
hero_title: "QR Code 與條碼完整指南中心"
hero_subtitle: "QR Code 適合網址、文字與手機互動；一維條碼更常用於商品、庫存與內部編號。先選對資料載體，再談尺寸、容錯與印刷。"
---

# QR Code 與條碼完整指南中心

QR Code 和傳統條碼常被放在同一張包裝上，但它們解決的問題不同。

QR Code 很適合：

- 網址
- 表單
- Wi-Fi
- 活動資訊
- 說明文件
- 手機掃描

一維條碼則常見於：

- 商品 GTIN
- 庫存編號
- 工單
- 訂單
- 資產標籤
- POS / 倉儲流程

這個專題中心把 FunnyTools 現有的 **QR Code 產生器**與**條碼產生器**連到完整問題解決指南，讓你不是只產生一張圖，而是能確認：

> 它能不能掃、內容是否正確、印出來會不會失敗、格式是不是選對。

## 先選：QR Code 還是一維條碼？

### 要讓一般手機打開網址、表單或 Wi-Fi
優先看 QR Code。

### 要讓 POS、庫存或掃描槍讀短編號
優先看 Barcode。

### 要放零售商品 GTIN
依通路要求使用 EAN-13 / UPC-A 等 GS1 data carrier。

### 只要公司內部料號
Code 128 通常比 Code 39 更密集、更彈性。

## QR Code 指南

### [QR Code 掃不到怎麼辦？](/guides/qr-code-not-scanning-print-guide/)
從 quiet zone、尺寸、對比、Logo、內容密度、反光與實際列印逐一排查。

### [QR Code 容錯 L/M/Q/H 怎麼選？](/guides/qr-error-correction-logo-guide/)
理解 7% / 15% / 25% / 30% 的 codeword recovery 概念，以及為什麼 Logo 不是「遮30%都沒事」。

### [Static vs Dynamic QR Code](/guides/static-vs-dynamic-qr-code-guide/)
靜態碼把內容直接編進圖形；動態碼通常是第三方 redirect service。FunnyTools 現行產生的是靜態內容。

### [Wi-Fi QR Code 怎麼做？](/guides/wifi-qr-code-format-security-guide/)
理解常見 `WIFI:T:WPA;S:...;P:...;;` 格式、特殊字元與分享密碼風險。

### [QR Code 安全嗎？](/guides/qr-code-phishing-security-guide/)
QR 圖本身不會替你證明目的地安全。掃碼前先看 URL，避免「quishing」與貼紙覆蓋攻擊。

## Barcode 指南

### [QR Code vs Barcode 怎麼選？](/guides/qr-code-vs-barcode-guide/)
比較資料容量、手機掃描、商品編號與內部系統。

### [EAN-13、UPC-A 與檢查碼](/guides/ean13-upca-check-digit-gs1-guide/)
檢查碼只能驗證數字結構，不等於商品號碼已向 GS1 正式取得。

### [Code 128 vs Code 39](/guides/code128-vs-code39-guide/)
內部庫存、工單、資產標籤與舊設備的選擇。

### [條碼怎麼印才掃得到？](/guides/barcode-printing-quiet-zone-svg-guide/)
保留 quiet zone、不要拉伸、優先高對比，正式標籤一定用最終紙材與掃描器測試。

## FunnyTools 目前可以直接做什麼？

### QR Code 產生器
目前可：
- 網址／文字
- Wi-Fi 或聯絡內容字串
- L / M / Q / H 容錯
- 選擇輸出尺寸
- 加中央 Logo
- PNG
- 複製圖片
- 瀏覽器本機生成

### 條碼產生器
目前可：
- Code 128
- EAN-13
- UPC-A
- Code 39
- EAN / UPC check digit 驗證
- 12位EAN資料碼自動補第13位
- 11位UPC資料碼自動補第12位
- PNG / SVG
- 本機生成

## 三條最常見工作流

### 海報／簡報 QR
1. 使用短而穩定的正式網址。
2. 先產 QR。
3. 選 M 起步。
4. 若加 Logo，再提高 Q / H 並實掃。
5. 放進設計稿後再次掃。
6. 印出最終尺寸再掃一次。

### 商品 Barcode
1. 先確認通路要求的 GTIN 類型。
2. 從正式 GS1 / 公司資料取得編號。
3. 驗證 check digit。
4. 產 EAN-13 / UPC-A。
5. 保留 quiet zone。
6. 用最終印刷設備與掃描器驗證。

### 內部庫存
1. 設計短而穩定的 internal ID。
2. 優先試 Code 128。
3. 下載 SVG 做標籤排版。
4. 不任意拉伸比例。
5. 以實際掃描槍測試。

## 最重要的使用界線

FunnyTools 可以幫你：

> 產生與檢查圖形。

但它不會：
- 幫你申請 GTIN
- 代替 GS1 註冊
- 驗證商品所有權
- 提供動態 QR 代管
- 追蹤掃描數
- 證明 QR 目的地安全
- 保證所有印表機／掃描器都能讀

真正正式使用時，應以對方系統、通路與最終實體掃描測試為準。

## 直接使用工具

- [QR Code 產生器](/tools/qr-code-generator/)
- [條碼產生器](/tools/barcode-generator/)
- [圖片尺寸調整](/tools/image-resizer/)
- [圖片壓縮](/tools/image-compressor/)
- [SVG vs PNG 指南](/guides/svg-vs-png-diagram-export/)

## 頁面 CTA

**先決定你的資料是要給「一般手機」掃，還是給「商品／庫存系統」掃。**

CTA：`開啟 QR Code 產生器`

次要 CTA：`開啟條碼產生器`

## 圖卡與 ALT

`Phone / URL / Wi-Fi → QR Code`
`Product / Inventory / ID → Barcode`

ALT：`QR Code與一維條碼用途選擇圖，手機網址與Wi-Fi使用QR Code，商品與庫存編號使用Barcode`

## 發布前的共同驗收清單

不論選 QR Code 或一維條碼，完成圖檔後都要用實際會使用的手機、掃描器與印刷尺寸測試。先確認內容文字沒有多餘空白或錯字，再從正面、稍微傾斜和不同距離各掃描一次；結果若只在螢幕上成功，不能代表紙本、標籤或包裝也能穩定讀取。記錄測試裝置、輸出格式、尺寸和失敗情況，之後修改編碼或版面時才有可比較的基準。

選型也應配合資料生命週期。固定的聯絡方式、教室網址或 Wi-Fi 設定可使用直接承載內容的 QR；會更換目的地的活動連結，則要先確認轉址服務的可用性與管理權。商品、庫存與內部 ID 若已有掃描流程，應優先遵循既有編碼規格，避免只因圖形看起來新而改變下游系統的資料格式。

所有輸出都應保存原始資料與最後掃描結果，方便補印和追查。

## 相關工作流程

- [QR Code 與條碼發布工具組](/workflows/qr-barcode-publishing-toolkit/)
