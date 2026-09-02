---
slug: "/guides/wifi-qr-code-format-security-guide/"
seo_title: "Wi-Fi QR Code 怎麼做？WIFI:T:WPA 格式、SSID、密碼與安全完整指南｜FunnyTools"
meta_description: "Wi-Fi QR Code怎麼做？完整說明常見WIFI:T:WPA;S:SSID;P:password;;格式、特殊字元跳脫、隱藏SSID、WPA/WPA2-EAP相容性與分享密碼安全風險。"
og_title: "Wi-Fi QR Code 怎麼做？格式與安全一次看懂"
og_description: "QR只把Wi-Fi設定編成文字；任何能看到QR的人都可能取得或使用其中資訊。"
canonical: "https://funnytools.win/guides/wifi-qr-code-format-security-guide/"
primary_keyword: "Wi-Fi QR Code"
card_title: "Wi-Fi QR Code 怎麼做？"
card_description: "理解SSID、密碼、WPA格式與特殊字元，避免看起來有QR卻掃不進網路。"
hero_title: "Wi-Fi QR Code 怎麼做？WIFI:T:WPA 格式、SSID、密碼與安全完整指南"
hero_subtitle: "Wi-Fi QR不是一種加密方法，而是把網路設定編成可被掃描器理解的文字格式。"
---

# Wi-Fi QR Code 怎麼做？WIFI:T:WPA 格式、SSID、密碼與安全完整指南

常見 Wi-Fi QR 內容長這樣：

```text
WIFI:T:WPA;S:MyWiFi;P:MyPassword;;
```

手機掃到後，如果系統支援這個格式，就可能提示：

> 加入這個 Wi-Fi 網路。

> **速答：Wi-Fi QR Code 的基本格式是什麼？**  
> ZXing等常見掃描生態使用的de facto格式是 `WIFI:T:[type];S:[SSID];P:[password];;`。其中 `T` 是驗證類型、`S` 是SSID、`P` 是密碼；隱藏網路可加 `H:true`。特殊字元如反斜線、分號、逗號、雙引號與冒號需要正確跳脫。這個格式雖被Android與iOS等廣泛識別，但不是「把密碼加密」；任何能掃描或decode該QR的人都可能取得其中設定，因此不應把內部高敏感Wi-Fi QR公開張貼。

## 一、最常見格式

例如：

```text
WIFI:T:WPA;S:GuestWiFi;P:abc12345;;
```

欄位：

- `T:` 驗證類型
- `S:` SSID
- `P:` Password

最後：

```text
;;
```

結束。

## 二、Open Wi-Fi

無密碼可用：

```text
WIFI:T:nopass;S:GuestWiFi;;
```

或依scanner實作省略type。

但公開Wi-Fi本身有其他安全風險，QR只是連線便利性，不會讓open network變安全。

## 三、Hidden SSID

常見：

```text
WIFI:T:WPA;S:HiddenNet;P:password;H:true;;
```

`H:true`

表示hidden SSID。

是否能順利加入仍取決於：
- 手機
- OS版本
- scanner

## 四、WPA和WPA2怎麼填？

許多scanner生態對一般個人Wi-Fi會接受：

> `T:WPA`

作為WPA/WPA2-Personal類連線標示。

不同裝置與實作可能有相容差異。

不要自行發明不存在的type值。

## 五、WPA2-Enterprise比較複雜

ZXing現行parser支援：

```text
T:WPA2-EAP
```

以及：
- EAP method
- identity
- anonymous identity
- phase2

但企業Wi-Fi可能還需要：
- certificate
- MDM
- device policy

因此：

> 一張QR不一定足以配置完整企業網路。

## 六、特殊字元為什麼會失敗？

如果SSID叫：

```text
Office;Guest
```

`;`

本身是欄位分隔符。

因此需要escape。

ZXing格式說明中，常見需要反斜線跳脫的字元包括：

- `\`
- `;`
- `,`
- `"`
- `:`

例如：

```text
Office\;Guest
```

## 七、密碼裡有分號怎麼辦？

同樣需要escape。

如果原密碼：

```text
abc;123
```

不能直接讓scanner把`;`誤認為欄位結束。

要按目標格式正確跳脫。

## 八、FunnyTools目前怎麼做？

現行QR Code工具接受：

> 網址或文字。

也就是說可以把準備好的Wi-Fi字串放進去，再產QR。

目前工具頁雖寫可用於Wi-Fi資訊，但並沒有獨立「SSID / Password」結構化表單。

Codex不得因本指南存在就自行加一套未測試的Wi-Fi form。

## 九、QR裡的密碼是加密的嗎？

不是。

QR Code可以被：
- 手機
- decoder
- screenshot
- camera

讀出。

如果有人取得QR圖片：

> 就可能取得SSID與password。

不要把QR圖當作密碼保護機制。

## 十、適合分享Guest Wi-Fi

更好的使用情境：

> 獨立Guest network。

而不是：
- 公司核心內網
- 管理員Wi-Fi
- IoT管理網
- 高權限網路

如果QR要貼在：
- 店內
- 會議室
- Airbnb

最好使用隔離的guest network並定期更換密碼。

## 十一、密碼換掉後怎麼辦？

Static Wi-Fi QR中的內容：

> 不會自動更新。

密碼變更後：
1. 重新產生QR
2. 更換現場貼紙
3. 刪除舊圖檔／文件
4. 再測一次

## 十二、照片裡的QR也會洩漏

如果你拍到Wi-Fi QR並公開到：
- 社群
- 房間照片
- 影片背景

別人可以截圖再decode。

所以QR不要貼在會被大量公開拍攝的位置，除非網路本來就是公開guest用途。

## 十三、裝置相容性

即使字串格式正確：

> 不代表每一台手機都會顯示同樣UI。

有的會：
- 提示加入網路
- 顯示文字
- 只複製內容

因此要用實際目標裝置測試。

## 十四、建議流程

1. 建立Guest Wi-Fi。
2. 確認SSID與password。
3. 依常見WIFI格式組字串。
4. 正確escape特殊字元。
5. 用FunnyTools產QR。
6. 用iOS / Android各掃一次。
7. 確認能連線。
8. 再印刷張貼。

## 十五、常見錯誤

- 把QR當加密
- SSID有`;`卻沒escape
- 密碼換了但貼紙沒換
- 公開張貼公司核心Wi-Fi
- 只測一台手機
- 企業EAP網路以為一個簡單QR一定能配完

## 十六、FAQ

### Wi-Fi QR會顯示密碼嗎？
視scanner UI而定，但QR內容本身可能被decode，因此應視為可取得資訊。

### 可以放WPA2嗎？
常見掃描格式以WPA類型處理一般WPA/WPA2 Personal，相容性仍要實測。

### 隱藏SSID可以嗎？
常見格式可用 `H:true`。

### FunnyTools有獨立Wi-Fi表單嗎？
目前沒有，現行工具是把文字內容編成QR。

### Wi-Fi密碼改了QR還有效嗎？
舊QR仍包含舊密碼，需要重做。

## 十七、延伸閱讀

- [QR Code產生器](/tools/qr-code-generator/)
- [QR安全指南](/guides/qr-code-phishing-security-guide/)
- [Static vs Dynamic QR](/guides/static-vs-dynamic-qr-code-guide/)
- [QR掃不到排查](/guides/qr-code-not-scanning-print-guide/)
- [密碼與帳號安全](/guides/random-password-length-security-guide/)

## 頁面 CTA

**如果只是分享Guest Wi-Fi，先產生設定字串，再用兩種手機實掃。**

CTA：`開啟QR Code產生器`

次要 CTA：`QR安全嗎？`

## 圖卡與 ALT

`WIFI:T:WPA;S:SSID;P:PASSWORD;;`

ALT：`Wi-Fi QR Code文字格式示意圖，標示T為驗證類型、S為SSID、P為密碼`

## 建立 Wi-Fi QR 前的安全檢查

產生前先確認 SSID、驗證類型與密碼完全符合路由器設定，並以測試裝置掃描後檢查是否連到預期網路。SSID 含有分號、反斜線或其他特殊字元時，必須依採用的 Wi-Fi QR 格式正確跳脫；否則掃描器可能讀到截斷內容。不要把示範用密碼、訪客網路密碼和正式網路密碼混用，也不要把真實密碼寫進公開文件或測試截圖。

對外張貼的 QR 應優先使用隔離的訪客網路，並定期更換憑證。若 QR 已印在無法回收的海報上，密碼一旦更換就要視為舊碼失效，重新評估張貼位置與可見範圍。QR 只是方便傳遞設定的編碼格式，不會替 Wi-Fi 本身提供額外加密或存取控制。
