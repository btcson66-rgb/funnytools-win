import type { Locale } from '../../config/site';
import type { ToolContent } from './_types';

type Pair = { zh: string; en: string };
type CasePair = { title: Pair; description: Pair };
type Enhancement = Pick<ToolContent, 'audience' | 'caseStudies' | 'notes'>;

function localize(audience: Pair[], caseStudies: CasePair[], notes: Pair[]): Record<Locale, Enhancement> {
  return {
    zh: {
      audience: audience.map((item) => item.zh),
      caseStudies: caseStudies.map((item) => ({ title: item.title.zh, description: item.description.zh })),
      notes: notes.map((item) => item.zh),
    },
    en: {
      audience: audience.map((item) => item.en),
      caseStudies: caseStudies.map((item) => ({ title: item.title.en, description: item.description.en })),
      notes: notes.map((item) => item.en),
    },
  };
}

export const toolContentEnhancements: Record<string, Record<Locale, Enhancement>> = {
  'csv-to-json': localize(
    [
      { zh: '需要把試算表匯出資料交給 API 的開發者', en: 'Developers preparing spreadsheet exports for APIs' },
      { zh: '需要檢查欄位與資料型別的分析人員', en: 'Analysts checking fields before importing a dataset' },
      { zh: '處理小型 CSV 範例的學生與內容管理者', en: 'Students and content managers working with small CSV samples' },
    ],
    [
      { title: { zh: '整理表單匯出資料', en: 'Prepare a form export for an API' }, description: { zh: '先確認第一列是唯一欄位名稱，再將含逗號、引號與換行的 CSV 轉成 JSON。下載前抽查幾筆資料，確認空值與數字格式符合接收系統要求。', en: 'Start with a CSV whose first row contains unique field names. Convert quoted commas and multiline fields into JSON, then inspect several records before sending the result to an API so empty values and number-like strings are handled as expected.' } },
      { title: { zh: '除錯有問題的 CSV', en: 'Diagnose a malformed CSV file' }, description: { zh: '若轉換失敗，先縮小到包含標題列與一筆錯誤資料的範例，檢查引號是否成對、各列欄位數是否一致及文字編碼是否為 UTF-8。', en: 'When conversion fails, reduce the file to the header and one problematic row. Check for unmatched quotes, inconsistent column counts, and UTF-8 text before retrying the complete dataset.' } },
    ],
    [
      { zh: 'JSON 值預設會保留為文字，不會猜測日期、布林值或數字型別。', en: 'Values remain strings unless the source parser can identify structure; the tool does not guess dates or business-specific data types.' },
      { zh: '大型資料仍可能受瀏覽器記憶體限制，正式匯入前應保留原始 CSV。', en: 'Large files are limited by browser memory. Keep the original CSV and validate the converted record count before a production import.' },
      { zh: '敏感資料雖不會上傳，仍應避免把轉換結果貼到不受信任的服務。', en: 'Processing is local, but the downloaded JSON still contains the original data and should be stored or shared with the same care.' },
    ],
  ),
  'json-to-csv': localize(
    [
      { zh: '需要把 API 回應交給試算表使用者的開發者', en: 'Developers handing API results to spreadsheet users' },
      { zh: '需要快速檢視物件陣列的資料分析人員', en: 'Analysts reviewing arrays of flat JSON objects' },
      { zh: '準備簡單匯入檔案的營運與內容團隊', en: 'Operations teams preparing simple import files' },
    ],
    [
      { title: { zh: '將 API 清單匯出到試算表', en: 'Export an API list to a spreadsheet' }, description: { zh: '確認最外層資料是物件陣列，且每個物件使用一致欄位。轉換後先檢查標題列、含逗號文字與換行內容，再用 Excel 或 Google 試算表開啟。', en: 'Use an array of objects with consistent keys. After conversion, verify the header row and fields containing commas, quotes, or line breaks before opening the CSV in Excel or Google Sheets.' } },
      { title: { zh: '準備系統匯入檔', en: 'Prepare a file for another system' }, description: { zh: '先查閱目標系統要求的欄位名稱、順序與編碼。此工具會建立標準 CSV，但不會自動符合特定 CRM、電商或會計系統的匯入規格。', en: 'Check the destination system for required column names, order, encoding, and allowed values. This tool produces standard CSV but cannot automatically satisfy a specific CRM, commerce, or accounting import schema.' } },
    ],
    [
      { zh: '巢狀物件與陣列不會自動展平，應先轉換成目標系統接受的欄位。', en: 'Nested objects and arrays are not automatically flattened into a business-specific schema.' },
      { zh: '不同物件缺少的欄位會形成空白儲存格，下載前應檢查欄位完整性。', en: 'Missing keys can become blank cells, so review column completeness before importing the file elsewhere.' },
      { zh: 'CSV 不保留 JSON 的型別資訊，日期、前導零與長數字可能被試算表重新格式化。', en: 'CSV does not preserve JSON types; spreadsheets may reformat dates, leading zeros, and long numeric identifiers.' },
    ],
  ),
  'timestamp-converter': localize(
    [
      { zh: '檢查 API、資料庫與伺服器紀錄的開發者', en: 'Developers inspecting API, database, and server log timestamps' },
      { zh: '需要比較本機時間與 UTC 的技術支援人員', en: 'Support teams comparing local time with UTC' },
      { zh: '學習 Unix epoch 與 ISO 8601 的學生', en: 'Students learning Unix epoch and ISO 8601 formats' },
    ],
    [
      { title: { zh: '對照錯誤紀錄時間', en: 'Match an error log to local time' }, description: { zh: '把紀錄中的 epoch 值轉成 UTC 與本機時間，再與使用者回報時間比較。先確認來源是秒或毫秒，避免得到相差數千年的錯誤日期。', en: 'Convert an epoch value into UTC and browser-local time, then compare it with a user report. Confirm whether the source uses seconds or milliseconds; the wrong unit can produce a date thousands of years away.' } },
      { title: { zh: '準備 API 測試值', en: 'Prepare values for an API test' }, description: { zh: '使用目前時間產生 Unix 秒、毫秒與 ISO 8601 值，貼入測試請求前先確認 API 文件要求的單位及是否接受時區偏移。', en: 'Generate current Unix seconds, milliseconds, and an ISO 8601 value. Before using one in a request, verify the API documentation for the required unit and whether timezone offsets are accepted.' } },
    ],
    [
      { zh: 'Unix 時間戳本身不含時區；時區只影響顯示方式。', en: 'A Unix timestamp represents an instant and does not contain a timezone; timezone only changes how that instant is displayed.' },
      { zh: 'ISO 8601 結尾的 Z 代表 UTC，本機時間可能因日光節約時間而不同。', en: 'A trailing Z in ISO 8601 means UTC. Browser-local output can differ because of locale and daylight-saving rules.' },
      { zh: '極大或負數時間戳可能超出瀏覽器日期範圍，正式資料應再由來源系統驗證。', en: 'Very large or negative values may fall outside browser date limits and should be checked against the source system.' },
    ],
  ),
  'uuid-generator': localize(
    [
      { zh: '建立測試資料與資料庫樣本的開發者', en: 'Developers creating test data and database fixtures' },
      { zh: '需要不重複暫時識別碼的 QA 與設計人員', en: 'QA and design teams needing temporary unique identifiers' },
      { zh: '學習 UUID 格式與用途的學生', en: 'Students learning UUID formats and use cases' },
    ],
    [
      { title: { zh: '產生測試資料主鍵', en: 'Generate keys for test fixtures' }, description: { zh: '一次產生與樣本筆數相同的 UUID，保留標準小寫與連字號格式，並把結果存入版本控制前確認其中不含真實使用者資料。', en: 'Generate the same number of UUIDs as your fixture records and keep the standard lowercase hyphenated form unless the target schema requires otherwise. Verify that the surrounding fixture contains no real user data before committing it.' } },
      { title: { zh: '測試輸入驗證', en: 'Test identifier validation' }, description: { zh: '建立標準、無連字號及大寫版本，確認應用程式是否只接受預期格式。UUID 可作識別碼，但不應當成權限憑證、密碼或可猜測順序的替代品。', en: 'Create standard, uppercase, and no-hyphen variants to test what an application accepts. UUIDs are identifiers, not authentication secrets, passwords, or proof that a request is authorized.' } },
    ],
    [
      { zh: '工具產生 UUID v4，不提供名稱型 UUID、時間排序 UUID 或資料庫特定型別。', en: 'The tool creates UUID v4 values, not name-based, time-ordered, or database-specific UUID variants.' },
      { zh: '移除連字號或變更大小寫不會增加隨機性，只改變文字表示方式。', en: 'Removing hyphens or changing case alters representation only; it does not add randomness.' },
      { zh: '在大量或法規敏感系統中，仍應由應用程式或資料庫於寫入時產生並驗證識別碼。', en: 'For large or regulated systems, generate and validate identifiers in the application or database at write time.' },
    ],
  ),
  'markdown-previewer': localize(
    [
      { zh: '撰寫 README 與技術文件的開發者', en: 'Developers writing README files and technical documentation' },
      { zh: '需要預覽筆記與文章草稿的作者', en: 'Writers previewing notes and article drafts' },
      { zh: '學習 Markdown 語法的學生', en: 'Students learning Markdown syntax' },
    ],
    [
      { title: { zh: '檢查 README 排版', en: 'Review a README before publishing' }, description: { zh: '貼上標題、清單、程式碼區塊與表格，確認層級與可讀性。安全清理會移除危險 HTML，因此結果可能與允許自訂 HTML 的平台略有不同。', en: 'Paste headings, lists, fenced code, and tables to inspect hierarchy and readability. Sanitization removes unsafe HTML, so the preview can differ from platforms that allow custom elements or platform-specific Markdown extensions.' } },
      { title: { zh: '準備可攜式文章草稿', en: 'Prepare a portable article draft' }, description: { zh: '先用標準 Markdown 撰寫，再下載清理後 HTML 作為參考。發布到 CMS 前仍需檢查連結、圖片來源、程式碼語言標記與該平台支援的語法。', en: 'Draft with common Markdown, then copy or download sanitized HTML for reference. Before publishing to a CMS, recheck links, image sources, code-language labels, and the exact Markdown features supported by that platform.' } },
    ],
    [
      { zh: '預覽不會上傳或儲存內容，重新整理頁面後草稿會消失。', en: 'The preview is not uploaded or saved; refreshing the page removes the current draft.' },
      { zh: '清理後 HTML 降低腳本風險，但無法替你確認外部連結或圖片內容是否可信。', en: 'Sanitized HTML reduces script risk but cannot verify that external links or image sources are trustworthy.' },
      { zh: '不同平台的 Markdown 方言不完全相同，正式發布前應在目標平台再次預覽。', en: 'Markdown dialects differ, so perform a final preview in the destination platform before publishing.' },
    ],
  ),
  'jpg-to-webp': localize(
    [
      { zh: '需要縮小網站圖片的內容編輯與開發者', en: 'Editors and developers optimizing website images' },
      { zh: '準備商品圖、縮圖與作品集的設計人員', en: 'Designers preparing product images, thumbnails, and portfolios' },
      { zh: '希望比較 JPEG 與 WebP 大小的使用者', en: 'Users comparing JPEG and WebP size and quality' },
    ],
    [
      { title: { zh: '製作網站縮圖', en: 'Create a lighter website thumbnail' }, description: { zh: '選擇已調整到顯示尺寸的 JPG，再逐步降低品質並比較文字邊緣、漸層與細節。下載後確認檔案大小與實際頁面載入效果，不要只看預覽。', en: 'Start with a JPG already resized to its display dimensions. Lower quality gradually while checking text edges, gradients, and fine detail, then confirm the downloaded file size and appearance in the actual page layout.' } },
      { title: { zh: '批次工作前建立品質基準', en: 'Choose a quality baseline before batch work' }, description: { zh: '先用一張具代表性的照片測試數個品質值，記錄可接受的檔案大小與視覺結果。此工具一次處理一張圖片，批次流程應另外使用可重現設定的工具。', en: 'Test several quality values on one representative photo and record the acceptable visual result and file size. This page handles one image at a time; use a reproducible batch process when many assets need identical settings.' } },
    ],
    [
      { zh: '轉成 WebP 不會自動改變像素尺寸，過大的來源圖仍應先縮放。', en: 'Conversion does not change pixel dimensions, so oversized source images should still be resized for their intended display.' },
      { zh: 'WebP 通常比 JPEG 小，但已高度壓縮的來源不一定會有明顯改善。', en: 'WebP is often smaller, but a heavily optimized JPEG may show little improvement or visible quality loss.' },
      { zh: '重要原圖應另外備份；重新壓縮有損格式可能累積畫質損失。', en: 'Keep an original master because repeated lossy conversion can accumulate visible artifacts.' },
    ],
  ),
  'webp-to-jpg': localize(
    [
      { zh: '需要相容舊系統或上傳規格的使用者', en: 'Users meeting legacy upload or compatibility requirements' },
      { zh: '準備文件、簡報與列印素材的編輯人員', en: 'Editors preparing images for documents, slides, and print workflows' },
      { zh: '需要處理透明 WebP 背景的設計人員', en: 'Designers choosing a background for transparent WebP images' },
    ],
    [
      { title: { zh: '符合只接受 JPG 的上傳規格', en: 'Meet a JPG-only upload requirement' }, description: { zh: '先確認 WebP 是否含透明區域，選擇與目標頁面一致的背景色後轉檔。下載後檢查邊緣光暈、色彩與檔案大小，再上傳至舊系統。', en: 'Check whether the WebP contains transparency and choose a background that matches the destination. After conversion, inspect edge halos, color, and file size before uploading to a JPG-only system.' } },
      { title: { zh: '放入不支援 WebP 的文件', en: 'Place an image in software without WebP support' }, description: { zh: '以足夠但不過高的品質輸出 JPG，再在目標簡報或文件中確認實際尺寸。若來源是圖示或透明插圖，PNG 可能比 JPG 更適合。', en: 'Export a JPG at an appropriate quality and verify it at the real size inside the destination document. PNG may be a better choice for logos, flat graphics, or transparency-sensitive artwork.' } },
    ],
    [
      { zh: 'JPG 不支援透明度，透明像素一定會被指定背景色取代。', en: 'JPEG cannot preserve transparency; transparent pixels are permanently replaced by the selected background.' },
      { zh: '轉檔不會提高原始解析度，也無法還原來源已失去的細節。', en: 'Conversion does not increase source resolution or restore detail already lost in the original.' },
      { zh: '照片適合 JPG；銳利文字、線條與少色圖形可能更適合 PNG。', en: 'JPEG suits photographs, while sharp text, line art, and limited-color graphics may remain clearer as PNG.' },
    ],
  ),
  'pdf-page-reorder': localize(
    [
      { zh: '整理掃描文件與報告附件的使用者', en: 'Users organizing scanned documents and report appendices' },
      { zh: '需要在不重建內容下調整頁序的行政人員', en: 'Administrators correcting page order without rebuilding content' },
      { zh: '在本機處理敏感 PDF 的學生與專業人員', en: 'Students and professionals handling sensitive PDFs locally' },
    ],
    [
      { title: { zh: '修正掃描頁面順序', en: 'Correct pages from a scanning session' }, description: { zh: '載入 PDF 後，先對照頁碼、頁首與內容連續性，再逐頁移動。下載新檔後重新開啟並抽查開頭、中間與結尾，確認沒有遺漏或重複頁面。', en: 'After loading the PDF, compare page labels, headers, and content continuity before moving pages. Reopen the downloaded file and inspect the beginning, middle, and end to confirm that no page is missing or duplicated.' } },
      { title: { zh: '整理報告附件', en: 'Arrange report appendices' }, description: { zh: '依引用順序排列附件，保留原始 PDF 作為備份。工具只改頁面順序，不會重建目錄、書籤、頁碼文字或文件內部連結。', en: 'Place appendices in citation order while keeping the original PDF as a backup. Reordering pages does not rebuild a table of contents, printed page numbers, bookmarks, or internal document links.' } },
    ],
    [
      { zh: '加密、限制修改或損壞的 PDF 可能無法載入。', en: 'Encrypted, permission-restricted, or damaged PDFs may not load or save correctly.' },
      { zh: '工具不會修改頁面內容、方向、裁切範圍或檔案壓縮。', en: 'The tool changes page order only; it does not rotate, crop, edit, or compress page content.' },
      { zh: '重要文件下載後應重新開啟驗證，再取代原始檔。', en: 'Reopen and verify important output before replacing the original document.' },
    ],
  ),
  'pdf-to-image': localize(
    [
      { zh: '需要將文件頁面放入簡報或教學素材的使用者', en: 'Users placing document pages into slides or teaching materials' },
      { zh: '製作 PDF 預覽圖與縮圖的內容編輯', en: 'Editors creating PDF previews and thumbnails' },
      { zh: '需要在本機擷取頁面畫面的專業人員', en: 'Professionals extracting page images without uploading files' },
    ],
    [
      { title: { zh: '建立文件預覽圖', en: 'Create document preview images' }, description: { zh: '使用較低倍率先檢查所有頁面，再針對需要清楚文字的頁面提高倍率。PNG 適合文字與線條，JPG 適合照片較多且希望縮小檔案的頁面。', en: 'Render all pages at a lower scale for a first review, then increase scale where small text must remain legible. PNG suits text and line art; JPG can reduce file size for photo-heavy pages.' } },
      { title: { zh: '擷取頁面放入簡報', en: 'Use a PDF page in a presentation' }, description: { zh: '先確認你有權重製文件內容，再選擇符合投影片尺寸的倍率。下載圖片後裁切多餘邊界並檢查文字可讀性，避免為了高解析度產生過大的簡報。', en: 'Confirm that you have permission to reuse the document, choose a scale appropriate for the slide size, and check text legibility after download. Excessive resolution can make presentations unnecessarily large.' } },
    ],
    [
      { zh: '一次最多 20 頁，超大頁面或高倍率可能超出手機記憶體。', en: 'A maximum of 20 pages is supported, and large pages at high scale may exceed mobile memory.' },
      { zh: '輸出圖片不保留可搜尋文字、表單、連結、書籤或輔助功能標記。', en: 'Image output does not preserve searchable text, forms, links, bookmarks, or accessibility tags.' },
      { zh: 'PDF 內嵌色彩與字型的渲染結果可能因瀏覽器而略有不同。', en: 'Embedded fonts and color profiles can render slightly differently across browsers.' },
    ],
  ),
  'pdf-compressor': localize(
    [
      { zh: '想整理未最佳化 PDF 結構的使用者', en: 'Users testing structural optimization on unoptimized PDFs' },
      { zh: '需要比較重寫前後檔案大小的文件管理者', en: 'Document managers comparing file size before and after rewriting' },
      { zh: '希望檔案留在瀏覽器本機的專業人員', en: 'Professionals who need files to remain in the browser' },
    ],
    [
      { title: { zh: '測試由舊工具輸出的 PDF', en: 'Test a PDF created by older software' }, description: { zh: '先保留原檔，再進行結構重寫並比較大小。若輸出較小，仍需重新開啟並檢查字型、表單、頁面與附件；如果沒有縮小，應保留原檔。', en: 'Keep the original, rewrite the PDF structure, and compare sizes. Even when output is smaller, reopen it and inspect fonts, pages, forms, and attachments. Keep the original whenever the result is not smaller.' } },
      { title: { zh: '判斷是否需要圖片壓縮', en: 'Decide whether image compression is actually needed' }, description: { zh: '若 PDF 主要由掃描圖片組成，單純重寫結構通常效果有限。這種情況需要另行評估圖片解析度與品質；本工具不會重採樣圖片，因此也不會犧牲圖片畫質。', en: 'A scan-heavy PDF may not shrink because image streams dominate its size. That requires a separate image-resolution decision; this tool deliberately avoids resampling images and therefore cannot promise a compression ratio.' } },
    ],
    [
      { zh: '輸出變小不代表視覺品質變差；此工具主要整理物件與串流結構。', en: 'A smaller output does not imply lower visual quality because this tool primarily reorganizes objects and streams.' },
      { zh: '加密、簽章、複雜表單或特殊附件可能無法完整保留，重要文件必須驗證。', en: 'Encryption, signatures, complex forms, and unusual attachments may not survive rewriting and require careful verification.' },
      { zh: '法律、簽署或保存用途的 PDF 不應在未比對前取代原始版本。', en: 'Do not replace legal, signed, or archival originals until the rewritten file has been fully compared.' },
    ],
  ),
  base64: localize(
    [
      { zh: '檢查 API、設定檔與資料 URI 的開發者', en: 'Developers inspecting APIs, configuration files, and data URIs' },
      { zh: '需要處理 Unicode 測試字串的 QA 人員', en: 'QA teams testing Unicode text and transport formats' },
      { zh: '學習編碼與加密差異的學生', en: 'Students learning the difference between encoding and encryption' },
    ],
    [
      { title: { zh: '檢查 API 中的 Base64 文字', en: 'Inspect a Base64 value from an API' }, description: { zh: '只解碼來自可信來源的短文字，確認輸出是預期 UTF-8。Base64 可能代表二進位資料；若解碼後不是有效文字，本工具會報錯，而不會把任意位元組當成可讀內容。', en: 'Decode a short value from a trusted source and confirm that the result is expected UTF-8 text. Base64 can represent arbitrary binary data, so this text-focused tool reports an error instead of treating every byte sequence as readable content.' } },
      { title: { zh: '建立文件中的測試範例', en: 'Create a documentation example' }, description: { zh: '輸入不含秘密的範例文字，編碼後再立即解碼比對。不要把 Base64 當成遮蔽 API 金鑰、密碼或個人資料的方法，因為任何人都能還原。', en: 'Encode a non-secret sample and immediately decode it to verify a round trip. Never use Base64 to hide API keys, passwords, or personal data because anyone can reverse it without a key.' } },
    ],
    [
      { zh: 'Base64 只改變表示方式，通常會讓資料大小增加約三分之一。', en: 'Base64 changes representation rather than securing data and typically increases size by roughly one third.' },
      { zh: '工具以 UTF-8 處理文字，不適合作為任意二進位檔案轉換器。', en: 'This page is designed for UTF-8 text, not arbitrary binary file conversion.' },
      { zh: '複製結果時請避免多餘空白與換行，部分接收系統會嚴格驗證格式。', en: 'Avoid accidental spaces or line breaks when copying output because some receivers validate Base64 strictly.' },
    ],
  ),
  'url-encoder': localize(
    [
      { zh: '建立查詢字串與 API 請求的開發者', en: 'Developers building query strings and API requests' },
      { zh: '檢查含中文、空白與符號網址的 QA 人員', en: 'QA teams testing URLs containing spaces, Unicode, and symbols' },
      { zh: '學習百分比編碼規則的學生', en: 'Students learning percent-encoding rules' },
    ],
    [
      { title: { zh: '編碼單一查詢參數', en: 'Encode one query parameter safely' }, description: { zh: '只對參數值使用元件編碼，再由程式組合鍵名、等號與 &。如果把完整 URL 當成單一元件編碼，斜線、冒號與查詢分隔符也會被轉換。', en: 'Encode the parameter value as a component, then let application code assemble the key, equals sign, and ampersand. Encoding an entire URL as one component also escapes slashes, the scheme colon, and query separators.' } },
      { title: { zh: '除錯重複編碼', en: 'Diagnose double encoding' }, description: { zh: '看到 `%25` 時，原本的百分號可能被再次編碼。逐層解碼前先確認資料經過哪些系統，避免把合法文字過度解碼或把不可信字串直接放入頁面。', en: 'A `%25` sequence can indicate that a percent sign was encoded again. Trace which systems touched the value before decoding multiple times, and never insert decoded untrusted content directly into HTML.' } },
    ],
    [
      { zh: '元件編碼與完整 URL 編碼用途不同，應依輸入所在位置選擇。', en: 'Component encoding and complete-URL handling solve different problems; choose based on where the value will be inserted.' },
      { zh: 'URL 編碼不是輸入驗證，也不會自動防止重新導向、XSS 或注入攻擊。', en: 'URL encoding is not input validation and does not by itself prevent open redirects, XSS, or injection.' },
      { zh: '加號在表單編碼中可能代表空白，但在一般 URI 元件中可以是字面加號。', en: 'A plus sign can mean a space in form encoding but may remain a literal plus in a URI component.' },
    ],
  ),
  'sort-lines': localize(
    [
      { zh: '整理名單、代碼與小型資料表的使用者', en: 'Users organizing lists, codes, and small text datasets' },
      { zh: '需要快速比較字母與數字順序的 QA 人員', en: 'QA teams comparing alphabetical and numeric ordering' },
      { zh: '清理貼上文字的學生與行政人員', en: 'Students and administrators cleaning pasted text' },
    ],
    [
      { title: { zh: '整理含數字的項目清單', en: 'Sort a list containing numbers' }, description: { zh: '先決定 `2`、`10` 應採數值順序還是純文字順序，再選擇對應模式。排序後抽查前後幾筆，特別注意前導零、負號、小數與混合文字。', en: 'Decide whether values such as `2` and `10` should use numeric or lexical order, then choose the matching mode. Inspect the first and last results, especially leading zeros, negative values, decimals, and mixed text.' } },
      { title: { zh: '建立可比對的名單', en: 'Create a stable list for comparison' }, description: { zh: '先統一大小寫與多餘空白，再排序並視需要移除重複行。這能協助人工比較兩份名單，但不會理解姓名、自然語言或地區特定的完整排序規則。', en: 'Normalize case and surrounding whitespace before sorting, then remove duplicates if needed. This makes manual comparison easier but does not understand names, natural-language collation, or every locale-specific ordering convention.' } },
    ],
    [
      { zh: '字母排序會受瀏覽器語系與大小寫設定影響。', en: 'Alphabetical results can vary with browser locale and case-sensitivity options.' },
      { zh: '排序會改變原始行序；重要資料應先保留未修改副本。', en: 'Sorting changes source order, so keep an untouched copy of important data.' },
      { zh: '此工具逐行處理，不會解析 CSV 引號、欄位或多行儲存格。', en: 'The tool works line by line and does not parse CSV quoting, columns, or multiline cells.' },
    ],
  ),
  stopwatch: localize(
    [
      { zh: '量測任務、練習與活動時間的使用者', en: 'Users timing tasks, practice sessions, and activities' },
      { zh: '需要圈速記錄的教練、老師與學生', en: 'Coaches, teachers, and students recording lap times' },
      { zh: '進行簡單工作流程觀察的團隊', en: 'Teams performing simple workflow observations' },
    ],
    [
      { title: { zh: '比較多次練習時間', en: 'Compare repeated practice attempts' }, description: { zh: '開始後在每次完成時記錄圈速，保留相同起訖條件，再比較中位數或趨勢。單次最快時間可能受誤觸或操作延遲影響，不適合單獨代表表現。', en: 'Record a lap after each attempt while keeping the same start and finish conditions. Compare several attempts or a median instead of relying on one fastest value that may reflect a tap delay or accidental input.' } },
      { title: { zh: '估算工作流程耗時', en: 'Estimate a workflow duration' }, description: { zh: '把固定流程拆成數個圈速步驟，進行多次觀察並記錄干擾。此瀏覽器碼錶適合一般估算，不是經認證的競賽、醫療或計費計時設備。', en: 'Split a repeatable workflow into lap checkpoints, observe several runs, and note interruptions. A browser stopwatch is suitable for practical estimates but is not certified equipment for competition, medical, legal, or billing use.' } },
    ],
    [
      { zh: '裝置休眠、分頁凍結與省電模式可能影響畫面更新。', en: 'Device sleep, tab suspension, and power-saving modes can delay display updates.' },
      { zh: '關閉或重新載入分頁可能清除目前紀錄，重要結果應另行抄錄。', en: 'Closing or refreshing the page may clear the current session, so copy important results elsewhere.' },
      { zh: '觸控反應與人為操作會帶來誤差，高精度量測應使用專用設備。', en: 'Human reaction time and touch latency add error; use dedicated equipment for precision measurement.' },
    ],
  ),
  'remove-duplicate-lines': localize(
    [
      { zh: '整理電子郵件、標籤與代碼清單的使用者', en: 'Users cleaning email, tag, and code lists' },
      { zh: '準備匯入資料的營運與 QA 人員', en: 'Operations and QA teams preparing import data' },
      { zh: '比較重複文字資料的學生與分析人員', en: 'Students and analysts reviewing repeated text data' },
    ],
    [
      { title: { zh: '清理活動報名名單', en: 'Clean a registration list' }, description: { zh: '先決定大小寫、前後空白與全形半形差異是否應視為相同，再執行去重。完成後比對原始與輸出行數，並抽查可能屬於不同人的相似資料。', en: 'Decide whether case, surrounding whitespace, and visually similar characters should count as the same value. Compare input and output counts afterward, and review near-matches that could belong to different people.' } },
      { title: { zh: '整理系統代碼', en: 'Normalize a list of system codes' }, description: { zh: '代碼通常區分大小寫且可能保留前導零，不應套用不合適的正規化。先保留原始清單，再用符合目標系統規格的選項去重。', en: 'System codes may be case-sensitive and can depend on leading zeros. Keep the source list, avoid inappropriate normalization, and deduplicate only with rules that match the destination system.' } },
    ],
    [
      { zh: '工具只判斷整行是否相同，不會找出拼字近似或部分重複。', en: 'The tool compares complete lines and does not identify spelling variants, partial matches, or semantic duplicates.' },
      { zh: '保留第一筆或最後一筆會影響輸出順序，匯入前應確認需求。', en: 'Keeping the first or last occurrence affects output order and should match the downstream requirement.' },
      { zh: '個人資料雖在本機處理，下載與貼上後仍需遵守原有存取規範。', en: 'Local processing does not change the sensitivity of personal data after it is copied or downloaded.' },
    ],
  ),
  'case-converter': localize(
    [
      { zh: '整理標題、介面文字與內容草稿的作者', en: 'Writers formatting headings, interface copy, and drafts' },
      { zh: '準備程式常數與測試字串的開發者', en: 'Developers preparing constants and test strings' },
      { zh: '統一資料大小寫的營運與 QA 人員', en: 'Operations and QA teams normalizing text case' },
    ],
    [
      { title: { zh: '統一匯入資料的大小寫', en: 'Normalize text before an import' }, description: { zh: '先確認目標欄位是否區分大小寫，再轉換一小段樣本。電子郵件、產品代碼、專有名詞與縮寫可能有特殊規則，不能只靠一般標題格式。', en: 'Confirm whether the destination field is case-sensitive and test a small sample first. Email addresses, product codes, names, acronyms, and branded terms can require rules that a general title-case conversion cannot infer.' } },
      { title: { zh: '整理文章標題草稿', en: 'Prepare a draft heading' }, description: { zh: '把文字轉為標題格式後，人工檢查冠詞、介系詞、連字號詞、品牌與程式名稱。工具提供一致起點，但不會套用每一本風格手冊的例外。', en: 'Use title case as a consistent starting point, then review articles, prepositions, hyphenated words, brands, and programming names manually. The tool cannot reproduce every editorial style guide or language-specific exception.' } },
    ],
    [
      { zh: '大小寫規則以瀏覽器 Unicode 處理為基礎，不等同所有語言的文法規則。', en: 'Conversion uses browser Unicode casing and is not a complete grammar engine for every language.' },
      { zh: '轉換可能改變具有大小寫意義的識別碼，程式碼與密碼不應直接套用。', en: 'Case conversion can break identifiers where case is meaningful; do not apply it blindly to code or passwords.' },
      { zh: '重要內容應保留原文並在轉換後人工校對。', en: 'Keep the original and proofread important text after conversion.' },
    ],
  ),
  'remove-empty-lines': localize(
    [
      { zh: '清理從 PDF、網頁與文件貼上文字的使用者', en: 'Users cleaning text pasted from PDFs, websites, and documents' },
      { zh: '整理名單與逐行資料的行政人員', en: 'Administrators preparing lists and line-based data' },
      { zh: '需要保留或壓縮段落間距的作者', en: 'Writers controlling spacing between paragraphs' },
    ],
    [
      { title: { zh: '清理 PDF 複製文字', en: 'Clean text copied from a PDF' }, description: { zh: '先確認空白行是否只是版面殘留，或原本代表段落與章節。使用「壓縮多餘空行」通常比全部刪除更安全，處理後應重新檢查標題與段落邊界。', en: 'Determine whether blank lines are layout artifacts or meaningful paragraph and section breaks. Collapsing repeated blanks is often safer than deleting every blank line; review headings and paragraph boundaries afterward.' } },
      { title: { zh: '準備逐行匯入清單', en: 'Prepare a line-based import list' }, description: { zh: '移除空白行前先確認只包含一筆一行的資料，並檢查看似空白的行是否含空格或不可見字元。輸出後比較有效行數再進行匯入。', en: 'Confirm that each real record occupies exactly one line, and check whether apparently blank rows contain spaces or invisible characters. Compare valid line counts before using the cleaned result in an import.' } },
    ],
    [
      { zh: '刪除所有空白行會合併段落視覺間距，但不會合併非空白文字行。', en: 'Removing every blank line changes paragraph spacing but does not join adjacent non-empty lines.' },
      { zh: '只含空格或 Tab 的行是否視為空白，取決於所選設定。', en: 'Whether whitespace-only lines count as blank depends on the selected option.' },
      { zh: '工具不會修復 PDF 斷行、連字號或欄位順序等其他複製問題。', en: 'The tool does not repair PDF line wrapping, hyphenation, column order, or other extraction problems.' },
    ],
  ),
};
