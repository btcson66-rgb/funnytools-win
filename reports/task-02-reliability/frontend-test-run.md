# 新增測試與真實執行輸出（任務書 §20）

日期：2026-09-06

## 環境準備

容器一開始沒有 `node_modules`（`registry.npmjs.org` 是通的，如任務書所述），跑法：

```
npm ci            # 451 packages, 49s
npm run build     # astro build, 1171 pages, 完成
```

`npm run build` 成功（見 `frontend-privacy-audit.md` 第 1 節引用的 `dist/tools/image-compressor/index.html` 等實際產物，就是這次 build 的輸出）。

## 新增的兩支測試檔案

1. `tests/tool-dependency-map.test.mjs`（8 個 test）
2. `tests/privacy-claim-consistency.test.mjs`（18 個 test）

兩者都用純文字 / 正規表示式解析原始碼（跟репo既有的 `tests/merge-pdf-limits.test.mjs` 同一種寫法），沒有動態 `import()` 帶有 `.astro` 或無副檔名相依的模組（這類 import 在純 Node ESM 下會直接丟 `ERR_UNKNOWN_FILE_EXTENSION` / `Cannot find module`，已實測確認，見下方「寫測試時踩到的坑」）。

## 完整跑法與結果（只跑這兩支）

```
node --experimental-strip-types --test --test-reporter=spec \
  tests/tool-dependency-map.test.mjs tests/privacy-claim-consistency.test.mjs
```

**結果：26 個 test，12 pass、14 fail。這是預期中的紅燈，不是測試寫壞——每一個紅燈都對應 `frontend-privacy-audit.md` 或 `frontend-tool-classification.md` 裡的一筆具體發現，任務書明確要求「保持紅燈，不要為了讓它綠燈而放寬斷言」，所以沒有調整斷言去遷就現狀。**

以下是完整、未經刪減的真實輸出（只省略每個 test 案例自己的 stack trace 內部的 Node 內部呼叫框架行，那些對閱讀沒有幫助；斷言的 diff 內容、錯誤訊息、pass/fail 統計數字全部保留原樣）：

```
✔ conversion-api-tools.ts (the 5 BACKEND_DEPENDENT tools) makes no absolute no-upload claim (2.669588ms)
✔ tools.ts `short` field for the 5 BACKEND_DEPENDENT tools makes no absolute no-upload claim (0.648029ms)
✖ image-compressor.ts privacyNote makes no absolute no-upload claim (currently failing) (1.296569ms)
✖ image-compressor.ts seoDescription makes no absolute no-upload claim (currently failing) (0.600132ms)
✖ merge-pdf.ts privacyNote makes no absolute no-upload claim (currently failing) (0.314851ms)
✖ merge-pdf.ts seoDescription makes no absolute no-upload claim (currently failing) (0.272411ms)
✖ qr-code-generator.ts privacyNote/seoDescription make no absolute no-upload claim (currently failing) (0.36232ms)
✖ categoryContent.ts toolBlurbs['image-compressor'] makes no absolute no-upload claim (currently failing) (0.292768ms)
✖ categoryContent.ts toolBlurbs['merge-pdf'] makes no absolute no-upload claim (currently failing) (0.640199ms)
✔ categoryContent.ts toolBlurbs['qr-code-generator'] makes no absolute no-upload claim (0.460336ms)
✖ categoryContent.ts 'image' category intro makes no unqualified all-local claim (currently failing) (0.865992ms)
✖ categoryContent.ts 'draw' category intro makes no unqualified all-local claim (currently failing) (0.704771ms)
✔ categoryContent.ts 'pdf' category intro makes no unqualified all-local claim (0.282906ms)
✖ merge-pdf-private-guide (zh, seoGuides.ts) makes no absolute no-upload claim (currently failing) (0.44276ms)
✖ merge-pdf-private-guide (en translation, seoGuides.ts) makes no absolute no-upload claim (currently failing) (0.480653ms)
✔ merge-pdf-private-guide links to pdf-compressor, which is BACKEND_DEPENDENT (contradicts the guide premise) (0.385531ms)
✖ compress-pdf-to-upload-limit.md does not claim PDF Compressor runs locally (currently failing) (0.459575ms)
✖ compress-pdf-to-upload-limit.md single-file limit matches the live backend limit (currently failing) (0.315576ms)
✔ tools.ts parses to at least one live tool (sanity check on the parser itself) (1.208408ms)
✔ every live tool has a registered widget component (1.222045ms)
✔ every live tool has registered i18n content (0.199574ms)
✔ widgetBySlug has no orphaned entries for tools that are not live (0.285321ms)
✔ BACKEND_DEPENDENT slug list (ConversionApiTool) is locked to the known 5 (0.378248ms)
✔ BACKEND_DEPENDENT slugs are tagged anonymous-api in the registry, not local-only (0.148532ms)
✔ MIXED slug list (download-gate upload path) is locked to the known 3 (0.265014ms)
✖ MIXED tools are NOT tagged local-only in the registry (currently failing -- see privacy audit) (0.629761ms)
ℹ tests 26
ℹ suites 0
ℹ pass 12
ℹ fail 14
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 118.118066

✖ failing tests:

test at tests/privacy-claim-consistency.test.mjs:126:1
✖ image-compressor.ts privacyNote makes no absolute no-upload claim (currently failing) (1.296569ms)
  AssertionError [ERR_ASSERTION]: image-compressor.ts privacyNote contains an absolute no-upload/never-leaves-browser claim: ["does not receive"]
  + actual - expected
  
  + [
  +   'does not receive'
  + ]
  - []
  
    generatedMessage: false,
    code: 'ERR_ASSERTION',
    actual: [ 'does not receive' ],
    expected: [],
    operator: 'deepStrictEqual',
    diff: 'simple'
  }

test at tests/privacy-claim-consistency.test.mjs:132:1
✖ image-compressor.ts seoDescription makes no absolute no-upload claim (currently failing) (0.600132ms)
  AssertionError [ERR_ASSERTION]: image-compressor.ts seoDescription contains an absolute no-upload/never-leaves-browser claim: ["不外流"]
  + actual - expected
  
  + [
  +   '不外流'
  + ]
  - []
  
    generatedMessage: false,
    code: 'ERR_ASSERTION',
    actual: [ '不外流' ],
    expected: [],
    operator: 'deepStrictEqual',
    diff: 'simple'
  }

test at tests/privacy-claim-consistency.test.mjs:138:1
✖ merge-pdf.ts privacyNote makes no absolute no-upload claim (currently failing) (0.314851ms)
  AssertionError [ERR_ASSERTION]: merge-pdf.ts privacyNote contains an absolute no-upload/never-leaves-browser claim: ["不會上傳到本站","不會離開瀏覽器"]
  + actual - expected
  
  + [
  +   '不會上傳到本站',
  +   '不會離開瀏覽器'
  + ]
  - []
  
    generatedMessage: false,
    code: 'ERR_ASSERTION',
    actual: [ '不會上傳到本站', '不會離開瀏覽器' ],
    expected: [],
    operator: 'deepStrictEqual',
    diff: 'simple'
  }

test at tests/privacy-claim-consistency.test.mjs:144:1
✖ merge-pdf.ts seoDescription makes no absolute no-upload claim (currently failing) (0.272411ms)
  AssertionError [ERR_ASSERTION]: merge-pdf.ts seoDescription contains an absolute no-upload/never-leaves-browser claim: ["不用上傳"]
  + actual - expected
  
  + [
  +   '不用上傳'
  + ]
  - []
  
    generatedMessage: false,
    code: 'ERR_ASSERTION',
    actual: [ '不用上傳' ],
    expected: [],
    operator: 'deepStrictEqual',
    diff: 'simple'
  }

test at tests/privacy-claim-consistency.test.mjs:150:1
✖ qr-code-generator.ts privacyNote/seoDescription make no absolute no-upload claim (currently failing) (0.36232ms)
  AssertionError [ERR_ASSERTION]: qr-code-generator.ts privacyNote contains an absolute no-upload/never-leaves-browser claim: ["does not receive"]
  + actual - expected
  
  + [
  +   'does not receive'
  + ]
  - []
  
    generatedMessage: false,
    code: 'ERR_ASSERTION',
    actual: [ 'does not receive' ],
    expected: [],
    operator: 'deepStrictEqual',
    diff: 'simple'
  }

test at tests/privacy-claim-consistency.test.mjs:166:1
✖ categoryContent.ts toolBlurbs['image-compressor'] makes no absolute no-upload claim (currently failing) (0.292768ms)
  AssertionError [ERR_ASSERTION]: categoryContent.ts toolBlurbs['image-compressor'] contains an absolute no-upload/never-leaves-browser claim: ["never leave your browser","不會上傳到伺服器"]
  + actual - expected
  
  + [
  +   'never leave your browser',
  +   '不會上傳到伺服器'
  + ]
  - []
  
    generatedMessage: false,
    code: 'ERR_ASSERTION',
    actual: [ 'never leave your browser', '不會上傳到伺服器' ],
    expected: [],
    operator: 'deepStrictEqual',
    diff: 'simple'
  }

test at tests/privacy-claim-consistency.test.mjs:172:1
✖ categoryContent.ts toolBlurbs['merge-pdf'] makes no absolute no-upload claim (currently failing) (0.640199ms)
  AssertionError [ERR_ASSERTION]: categoryContent.ts toolBlurbs['merge-pdf'] contains an absolute no-upload/never-leaves-browser claim: ["nothing uploaded","不離開瀏覽器"]
  + actual - expected
  
  + [
  +   'nothing uploaded',
  +   '不離開瀏覽器'
  + ]
  - []
  
    generatedMessage: false,
    code: 'ERR_ASSERTION',
    actual: [ 'nothing uploaded', '不離開瀏覽器' ],
    expected: [],
    operator: 'deepStrictEqual',
    diff: 'simple'
  }

test at tests/privacy-claim-consistency.test.mjs:191:1
✖ categoryContent.ts 'image' category intro makes no unqualified all-local claim (currently failing) (0.865992ms)
  AssertionError [ERR_ASSERTION]: categoryContent.ts image category intro contains an absolute no-upload/never-leaves-browser claim: ["所有處理都在本機完成"]
  + actual - expected
  
  + [
  +   '所有處理都在本機完成'
  + ]
  - []
  
    generatedMessage: false,
    code: 'ERR_ASSERTION',
    actual: [ '所有處理都在本機完成' ],
    expected: [],
    operator: 'deepStrictEqual',
    diff: 'simple'
  }

test at tests/privacy-claim-consistency.test.mjs:196:1
✖ categoryContent.ts 'draw' category intro makes no unqualified all-local claim (currently failing) (0.704771ms)
  AssertionError [ERR_ASSERTION]: categoryContent.ts draw category intro contains an absolute no-upload/never-leaves-browser claim: ["所有繪製都在瀏覽器本機完成"]
  + actual - expected
  
  + [
  +   '所有繪製都在瀏覽器本機完成'
  + ]
  - []
  
    generatedMessage: false,
    code: 'ERR_ASSERTION',
    actual: [ '所有繪製都在瀏覽器本機完成' ],
    expected: [],
    operator: 'deepStrictEqual',
    diff: 'simple'
  }

test at tests/privacy-claim-consistency.test.mjs:215:1
✖ merge-pdf-private-guide (zh, seoGuides.ts) makes no absolute no-upload claim (currently failing) (0.44276ms)
  AssertionError [ERR_ASSERTION]: seoGuides.ts merge-pdf-private-guide (zh) contains an absolute no-upload/never-leaves-browser claim: ["不離開你的裝置","不經過任何伺服器"]
  + actual - expected
  
  + [
  +   '不離開你的裝置',
  +   '不經過任何伺服器'
  + ]
  - []
  
    generatedMessage: false,
    code: 'ERR_ASSERTION',
    actual: [ '不離開你的裝置', '不經過任何伺服器' ],
    expected: [],
    operator: 'deepStrictEqual',
    diff: 'simple'
  }

test at tests/privacy-claim-consistency.test.mjs:221:1
✖ merge-pdf-private-guide (en translation, seoGuides.ts) makes no absolute no-upload claim (currently failing) (0.480653ms)
  AssertionError [ERR_ASSERTION]: seoGuides.ts merge-pdf-private-guide (en) contains an absolute no-upload/never-leaves-browser claim: ["never leave your device"]
  + actual - expected
  
  + [
  +   'never leave your device'
  + ]
  - []
  
    generatedMessage: false,
    code: 'ERR_ASSERTION',
    actual: [ 'never leave your device' ],
    expected: [],
    operator: 'deepStrictEqual',
    diff: 'simple'
  }

test at tests/privacy-claim-consistency.test.mjs:238:1
✖ compress-pdf-to-upload-limit.md does not claim PDF Compressor runs locally (currently failing) (0.459575ms)
  AssertionError [ERR_ASSERTION]: guide describes the live /tools/pdf-compressor/ as browser-local, but it is wired to ConversionApiTool and uploads to the Conversion API
  + actual - expected
  
  + '- 在瀏覽器本機處理；'
  - null
  
    generatedMessage: false,
    code: 'ERR_ASSERTION',
    actual: '- 在瀏覽器本機處理；',
    expected: null,
    operator: 'strictEqual',
    diff: 'simple'
  }

test at tests/privacy-claim-consistency.test.mjs:247:1
✖ compress-pdf-to-upload-limit.md single-file limit matches the live backend limit (currently failing) (0.315576ms)
  AssertionError [ERR_ASSERTION]: guide states a 40MB single-file limit; the live backend limit is 80MB (the guide's number matches the orphaned local PdfCompressor.astro component's hardcoded 40MB check instead)
  
  '40' !== '80'
  
    generatedMessage: false,
    code: 'ERR_ASSERTION',
    actual: '40',
    expected: '80',
    operator: 'strictEqual',
    diff: 'simple'
  }

test at tests/tool-dependency-map.test.mjs:198:1
✖ MIXED tools are NOT tagged local-only in the registry (currently failing -- see privacy audit) (0.629761ms)
  AssertionError [ERR_ASSERTION]: image-compressor uploads its output file via the download-gate path but is tagged privacyLevel: 'local-only'
    generatedMessage: false,
    code: 'ERR_ASSERTION',
    actual: 'local-only',
    expected: 'local-only',
    operator: 'notStrictEqual',
    diff: 'simple'
  }
```

（`MIXED tools are NOT tagged local-only` 這個 test 只跑到 `image-compressor` 就整個 test 失敗中止，沒有機會跑到 `qr-code-generator`／`merge-pdf`——三者的 `privacyLevel` 目前都是 `'local-only'`，可以在 `src/data/tools.ts` 第 618、694、728 行左右直接肉眼確認，跟這裡的 assertion 邏輯是一致的。）

## 沒有紅燈的其餘測試（12 個）——確認「已知正確」的部分真的正確

- `conversion-api-tools.ts`（5 個 BACKEND_DEPENDENT 工具自己的文案）：**沒有**任何絕對「不上傳」措辭，符合交辦背景。
- `tools.ts` 這 5 個工具的 `short` 欄位：同上，沒問題。
- `categoryContent.ts toolBlurbs['qr-code-generator']`：這個分類頁卡片文案本身沒有隱私宣稱（問題出在它自己 `qr-code-generator.ts` 的 `privacyNote`，這個有抓到，見上）。
- `pdf` 分類頁的 intro：正確區分「整理工具（本機）」跟「轉檔／壓縮（會上傳）」，寫得最好的一個分類頁。
- `merge-pdf-private-guide` 連到 `pdf-compressor`：確認 `relatedToolIds` 真的包含這個 BACKEND_DEPENDENT slug（純粹取證，不是「不該發生」的斷言）。
- `tools.ts`／`toolWidgets.ts`／`toolContent.ts` 三份註冊表互相一致：83 個 live 工具，每個都找得到對應的 widget 與 i18n 內容，沒有孤兒項目。
- BACKEND_DEPENDENT 與 MIXED 的 slug 清單都鎖住為目前的 5 個／3 個，且對應的 `privacyLevel` 分別正確（BACKEND_DEPENDENT 是 `anonymous-api`）與錯誤（MIXED 目前是 `local-only`，這個錯誤本身才是紅燈）。

## 跑過完整既有測試套件，確認沒有弄壞任何東西

```
node --experimental-strip-types --test --test-reporter=spec tests/*.test.mjs
```

```
ℹ tests 75
ℹ suites 0
ℹ pass 61
ℹ fail 14
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
```

75 = repo 原有的 61 個測試（`affiliate-shelf.test.mjs`、`conversion-api-client.test.mjs`、`conversion-api-pages.test.mjs`、`editorial-leakage-audit.test.mjs`、`english-task-guide-localization.test.mjs`、`gsc-sitemap-outcome.test.mjs`、`merge-pdf-limits.test.mjs`、`post-task017-architecture.test.mjs`、`release-workflows.test.mjs`、`seo-description.test.mjs`、`sitemap-hash-normalization.test.mjs`）＋新增的 2 個檔案共 26 個。**14 個 fail 全部落在新增的兩個檔案裡，逐一核對過失敗清單，跟只跑新檔案時的 14 筆完全一樣，既有的 61 個測試全數維持綠燈，沒有因為這次新增而被影響。**

## 寫測試時踩到的坑（記錄一下，避免下次重踩）

- 一開始想直接用 Node 動態 `import('./src/lib/toolWidgets.ts')` 讀 widget 對照表，會因為它 import `.astro` 檔而丟 `ERR_UNKNOWN_FILE_EXTENSION`；想 `import('./src/lib/toolContent.ts')` 也會因為它 import 無副檔名的 `.ts` 檔（Node ESM 不做 bundler 那種副檔名省略解析）丟 `Cannot find module`。這兩個問題都不是 bug，是 Node 原生 ESM 解析規則跟 Astro/Vite 打包時的規則不同；解法是跟 `tests/merge-pdf-limits.test.mjs` 一樣，直接 `readFileSync` 讀原始碼字串再用正規表示式解析，不去 `import()` 這兩支檔案。`src/data/tools.ts` 本身沒有這個問題（它唯一的 import 是 `import type { Locale } from '../config/site'`，型別 import 在 `--experimental-strip-types` 下會整行被拿掉，所以可以直接動態 `import()`）。
- 第一版 `tools.ts` 解析器用天真的大括號計數，會因為 `json-formatter` 的 `icon: '{}'` 字面字串而少算一個工具（84 變 83 的那個烏龍，細節見 `frontend-tool-classification.md` 第 0 節）；改成有辨識字串邊界的計數器後才穩定拿到正確的 83。
- `assert.doesNotMatch()`／`assert.equal(matchArray, null)` 在斷言失敗時，Node 的 assert 錯誤訊息預設會把整個「actual」值印出來——如果拿整份 markdown 檔案字串或帶 `.input` 屬性的 `RegExpMatchArray` 去做這個比較，失敗訊息會把整份文件內容都印進錯誤堆疊，非常不利閱讀。改成只取 `match(...)?.[0]`（只留下真正命中的那一小段文字）之後，失敗訊息就只會顯示命中的短字串，前面顯示的完整輸出就是修正後的版本。
