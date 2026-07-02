import type { Locale } from '../../config/site';
import type { ToolContent } from './_types';

type Pair = { zh: string; en: string };
type CasePair = { title: Pair; description: Pair };
type Enhancement = Partial<ToolContent>;

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

interface PrioritySpec {
  slug: string;
  zhName: string;
  enName: string;
  zhSeoTitle: string;
  enSeoTitle: string;
  zhSeoDescription: string;
  enSeoDescription: string;
  zhKeywords: string[];
  enKeywords: string[];
  zhWho: string;
  enWho: string;
  zhMethod: string;
  enMethod: string;
  zhExamples: string[];
  enExamples: string[];
  zhMistakes: string[];
  enMistakes: string[];
  relatedZh: string;
  relatedEn: string;
}

function priorityEnhancement(spec: PrioritySpec): Record<Locale, Enhancement> {
  return {
    zh: {
      seoTitle: spec.zhSeoTitle,
      seoDescription: spec.zhSeoDescription,
      keywords: spec.zhKeywords,
      contentSections: [
        {
          heading: `${spec.zhName}適合誰使用`,
          paragraphs: [
            spec.zhWho,
            `這一頁的重點不是取代正式簡章、學校規定或專業軟體，而是把「先試算、再檢查、最後依正式資料確認」的流程整理清楚。使用 ${spec.zhName} 時，建議先用一組小資料測試欄位、單位與權重是否符合你的情境，再把完整資料放入工具中。`,
          ],
        },
        {
          heading: '計算方法、判讀與限制',
          paragraphs: [
            spec.zhMethod,
            '結果應搭配資料來源、樣本大小、頁面範圍、輸出格式或操作規則一起判讀；如果用於甄試、申請、正式報告、交件或公開文件，請把工具結果視為草稿檢查與溝通輔助，最後仍以原始資料、正式公告與人工複核為準。',
          ],
          items: spec.zhMistakes,
        },
        {
          heading: '實際使用情境',
          paragraphs: [
            '以下情境是為了說明工具使用方式的範例，不代表任何機關、學校或平台的正式規則。你可以把它們當成檢查流程：先確認輸入資料，再看結果是否符合預期，最後決定是否要搭配其他工具處理。',
          ],
          items: spec.zhExamples,
        },
        {
          heading: '建議搭配的相關工具',
          paragraphs: [spec.relatedZh],
        },
      ],
      caseStudies: spec.zhExamples.map((description, index) => ({
        title: `範例 ${index + 1}`,
        description,
      })),
      notes: spec.zhMistakes,
      faq: [
        { q: `${spec.zhName}可以免費使用嗎？`, a: '可以。FreeTools 的工具可直接在瀏覽器使用，不需要註冊。' },
        { q: '資料會上傳到伺服器嗎？', a: '這個工具採瀏覽器本機處理；輸入內容與檔案不會主動上傳到 FreeTools 伺服器。' },
        { q: '結果可以當作正式規則嗎？', a: '不建議。這裡提供的是試算、整理與檢查輔助，正式用途仍要依簡章、學校、機關或平台公告為準。' },
        { q: '輸入後結果看起來不合理怎麼辦？', a: '先檢查單位、權重、頁碼範圍、樣本數、格式與空白字元，再用小範例驗算一次。' },
        { q: '還可以搭配哪些工具？', a: spec.relatedZh },
      ],
    },
    en: {
      seoTitle: spec.enSeoTitle,
      seoDescription: spec.enSeoDescription,
      keywords: spec.enKeywords,
      contentSections: [
        {
          heading: `Who should use ${spec.enName}`,
          paragraphs: [
            spec.enWho,
            `This page is designed for quick checking and preparation, not for replacing official rules, institutional requirements, or professional software. When using ${spec.enName}, test a small sample first so units, weights, page ranges, and output settings match your real task before processing the full dataset or document.`,
          ],
        },
        {
          heading: 'Method, interpretation, and limits',
          paragraphs: [
            spec.enMethod,
            'Read the result together with the source data, sample size, page range, output format, or workflow rule. For applications, exams, reports, submissions, or public documents, treat the output as a draft check and verify it against the original source and official instructions.',
          ],
          items: spec.enMistakes,
        },
        {
          heading: 'Practical examples',
          paragraphs: [
            'These examples illustrate workflow ideas only. They are not official policy for any school, agency, exam board, or platform.',
          ],
          items: spec.enExamples,
        },
        {
          heading: 'Related workflow',
          paragraphs: [spec.relatedEn],
        },
      ],
      caseStudies: spec.enExamples.map((description, index) => ({
        title: `Example ${index + 1}`,
        description,
      })),
      notes: spec.enMistakes,
      faq: [
        { q: `Is ${spec.enName} free to use?`, a: 'Yes. You can use the tool directly in the browser with no registration.' },
        { q: 'Is my data uploaded?', a: 'No. This tool runs locally in your browser and does not actively upload inputs or files to FreeTools servers.' },
        { q: 'Can I treat the result as official?', a: 'No. Use it as a calculation, cleanup, or checking aid and confirm formal requirements with official sources.' },
        { q: 'What should I check when the result looks wrong?', a: 'Review units, weights, page ranges, sample size, source format, whitespace, and output settings, then test again with a small known example.' },
        { q: 'Which related tools should I use next?', a: spec.relatedEn },
      ],
    },
  };
}

const prioritySpecs: PrioritySpec[] = [
  {
    slug: 'teacher-exam-score-converter',
    zhName: '教師甄試成績轉換模擬器',
    enName: 'Teacher Exam Score Converter',
    zhSeoTitle: '教甄成績計算器｜免費試算筆試口試試教加權分數',
    enSeoTitle: 'Free Teacher Exam Score Calculator | Weighted Total',
    zhSeoDescription: '免費教師甄試成績計算器，輸入筆試、口試、試教分數與權重，立即算出加權總成績，方便考生整理備考紀錄。',
    enSeoDescription: 'Calculate your weighted teacher exam total for free. Enter written, interview, and teaching-demo scores and weights instantly.',
    zhKeywords: ['教師甄試成績計算', '教師甄試加權', '筆試口試試教', '教甄分數試算'],
    enKeywords: ['teacher exam score calculator', 'weighted exam score', 'teaching demo score', 'teacher recruitment'],
    zhWho: '適合準備教師甄試的考生、協助整理成績試算表的老師，以及想快速比較不同權重情境的人。你可以把筆試、口試、試教或其他項目拆開輸入，先確認各項權重加總是否合理。',
    enWho: 'Useful for teacher-candidate score planning, spreadsheet checks, and quick what-if comparisons across written, interview, and teaching-demo components.',
    zhMethod: '加權總分的核心是「分數乘以權重後加總」。若簡章使用先標準化、再加權或另有門檻，請依該年度公告調整，本頁只做一般加權試算。',
    enMethod: 'The basic method multiplies each component by its weight and sums the weighted scores. If an official notice uses normalization, thresholds, or a different sequence, follow that notice.',
    zhExamples: [
      '考生把筆試 70%、口試 15%、試教 15% 輸入，先確認總分是否符合自己整理的表格。',
      '老師協助學生比較「筆試較高、試教普通」與「筆試普通、試教較高」兩種範例情境。',
      '讀書會整理不同縣市簡章時，用小範例檢查每個權重欄位是否輸入正確。',
    ],
    enExamples: [
      'A candidate tests a 70% written, 15% interview, and 15% teaching-demo scenario before updating a study spreadsheet.',
      'A study group compares examples where the written score is strong but the demo score is average.',
      'A teacher checks whether several official-notice examples use the same weighting sequence.',
    ],
    zhMistakes: ['不要把百分比權重和小數權重混用。', '不要把範例試算當成任何年度正式錄取規則。', '若簡章有最低門檻、同分比序或標準化規則，需另外確認。'],
    enMistakes: ['Do not mix percentage and decimal weights.', 'Do not treat a sample calculation as an official selection rule.', 'Check thresholds, tie-breakers, and normalization separately.'],
    relatedZh: '若需要比較標準化後的分數，可接著使用 T 分數計算器、Z 分數計算器、PR 百分等級計算器與加權平均計算器。',
    relatedEn: 'For standardized score workflows, use the T Score Calculator, Z Score Calculator, Percentile Rank Calculator, and Weighted Average Calculator.',
  },
  {
    slug: 't-score-calculator',
    zhName: 'T 分數計算器',
    enName: 'T Score Calculator',
    zhSeoTitle: 'T 分數計算器｜Z 分數轉換與教育統計解讀',
    enSeoTitle: 'T Score Calculator | Convert Z Scores for Education',
    zhSeoDescription: '使用 T = 50 + 10z 將 Z 分數轉為 T 分數，附教育測驗、班級成績與教師甄試範例說明。',
    enSeoDescription: 'Convert z scores to T scores with T = 50 + 10z and interpret standardized education results.',
    zhKeywords: ['T 分數計算', 'Z 分數轉 T 分數', '標準分數', '教育統計'],
    enKeywords: ['t score calculator', 'z score to t score', 'standard score', 'education statistics'],
    zhWho: '適合需要把 Z 分數轉成平均 50、標準差 10 量尺的老師、考生與研究生。T 分數比 Z 分數更容易閱讀，常用於教育測驗與成績比較範例。',
    enWho: 'Useful for teachers, candidates, and graduate students who need a mean-50, SD-10 scale that is easier to read than raw z scores.',
    zhMethod: 'T 分數公式為 T = 50 + 10z。z 為 0 時 T 分數是 50；z 為 1 時 T 分數是 60；z 為 -1 時 T 分數是 40。公式只改變量尺，不會讓偏態資料變成常態分配。',
    enMethod: 'T = 50 + 10z. A z score of 0 becomes 50, +1 becomes 60, and -1 becomes 40. The transformation changes the scale, not the distribution shape.',
    zhExamples: ['班級平均附近的學生 z = 0.1，換成 T 分數約 51，方便放入報告。', '教師甄試範例中若已取得 Z 分數，可快速轉成 T 分數做比較。', '研究生整理量表結果時，用 T 分數讓不同指標有相同基準。'],
    enExamples: ['A student near the class mean has z = 0.1, which becomes T = 51 for a short report.', 'A teacher-exam example with provided z scores can be converted to T scores for comparison.', 'A researcher puts multiple standardized indicators onto the same T-score scale.'],
    zhMistakes: ['不要把 T 分數解讀成答對百分比。', '原始分數若尚未標準化，應先用 Z 分數計算器。', '極端分數需要搭配樣本數與分布形狀判讀。'],
    enMistakes: ['Do not read a T score as percent correct.', 'Use a z-score calculator first if the raw score is not standardized.', 'Interpret extreme scores with sample size and distribution shape.'],
    relatedZh: '可先用 Z 分數計算器取得 z，再搭配 PR 百分等級與教師甄試成績轉換模擬器整理完整流程。',
    relatedEn: 'Start with the Z Score Calculator, then use Percentile Rank and Teacher Exam Score tools for a fuller workflow.',
  },
  {
    slug: 'z-score-calculator',
    zhName: 'Z 分數計算器',
    enName: 'Z Score Calculator',
    zhSeoTitle: 'Z 分數計算器｜標準分數公式與班級成績解讀',
    enSeoTitle: 'Z Score Calculator | Standard Score Formula',
    zhSeoDescription: '輸入原始分數、平均數與標準差，計算 Z 分數並理解分數距離平均幾個標準差。',
    enSeoDescription: 'Calculate a z score from raw score, mean, and standard deviation, with interpretation guidance.',
    zhKeywords: ['Z 分數計算', '標準分數', '平均數標準差', '班級成績統計'],
    enKeywords: ['z score calculator', 'standard score', 'mean standard deviation', 'statistics calculator'],
    zhWho: '適合需要理解一個分數在群體中相對位置的人，例如老師檢查班級成績、研究生整理測驗資料，或考生比較不同科目的標準化結果。',
    enWho: 'Useful for comparing a raw score to a reference group, such as class scores, exam results, or research measurements.',
    zhMethod: '公式為 z = (X - M) / SD，X 是原始分數，M 是平均數，SD 是標準差。標準差必須大於 0；若分布偏斜，Z 分數仍只能描述相對距離。',
    enMethod: 'z = (X - M) / SD, where X is the raw score, M is the mean, and SD is the standard deviation. SD must be greater than zero.',
    zhExamples: ['班級平均 72、標準差 8，某生 84 分，Z 分數為 1.5。', '研究生檢查量表分數時，先確認平均數與標準差來源一致。', '考生比較不同科目時，用 Z 分數避免直接拿原始分數相減。'],
    enExamples: ['With class mean 72 and SD 8, a score of 84 gives z = 1.5.', 'A graduate student standardizes scale scores only after confirming mean and SD sources.', 'A candidate compares subjects by standard units rather than raw-score gaps.'],
    zhMistakes: ['標準差不能填 0。', '平均數與標準差必須來自同一參照群體。', 'Z 分數不是排名，也不是百分等級。'],
    enMistakes: ['Standard deviation cannot be zero.', 'Mean and SD must come from the same reference group.', 'A z score is not a rank or percentile by itself.'],
    relatedZh: '可接著使用 T 分數計算器轉換量尺，或用 PR 百分等級計算器描述相對位置。',
    relatedEn: 'Use the T Score Calculator for a mean-50 scale or Percentile Rank for relative standing.',
  },
  {
    slug: 'weighted-average-calculator',
    zhName: '加權平均計算器',
    enName: 'Weighted Average Calculator',
    zhSeoTitle: '加權平均計算器｜分數權重與平均公式',
    enSeoTitle: 'Weighted Average Calculator | Scores and Weights',
    zhSeoDescription: '輸入多筆分數與權重，計算加權平均，適合成績、評分表、教師甄試與專題配分範例。',
    enSeoDescription: 'Calculate a weighted mean from values and weights for grades, rubrics, and exam score scenarios.',
    zhKeywords: ['加權平均計算', '成績權重', '分數加權', 'weighted average'],
    enKeywords: ['weighted average calculator', 'grade weights', 'weighted mean', 'score weighting'],
    zhWho: '適合處理平時成績、期中期末比例、評分規準、教師甄試配分或任何「每一項重要程度不同」的資料。',
    enWho: 'Useful for grade weighting, rubrics, exam components, and any dataset where each value carries a different importance.',
    zhMethod: '加權平均 = 各項分數乘權重後加總，再除以權重總和。若權重總和不是 100，也可以計算，但要確認這是否符合原本規則。',
    enMethod: 'Weighted mean equals the sum of value times weight divided by total weight. Weights do not have to total 100, but the rule should be intentional.',
    zhExamples: ['平時 30%、期中 30%、期末 40%，快速計算學期總成績。', '教師甄試範例中把筆試、試教、口試依權重合成總分。', '專題評分表將內容、表達、合作三項用不同權重計分。'],
    enExamples: ['Calculate a term grade from 30% coursework, 30% midterm, and 40% final.', 'Combine written, demo, and interview teacher-exam scores.', 'Score a project rubric with content, presentation, and teamwork weights.'],
    zhMistakes: ['不要把 30% 輸成 30 又把其他欄位輸成 0.4。', '缺漏項目會改變權重總和。', '若有最低門檻，需在加權平均之外另外判斷。'],
    enMistakes: ['Do not mix 30 and 0.4 style weights in one table.', 'Missing items change total weight.', 'Minimum thresholds require separate checks.'],
    relatedZh: '成績類資料可搭配成績平均計算器、教師甄試成績轉換模擬器與標準差計算器。',
    relatedEn: 'For grade workflows, pair this with Grade Average, Teacher Exam Score, and Standard Deviation tools.',
  },
  {
    slug: 'standard-deviation',
    zhName: '標準差計算器',
    enName: 'Standard Deviation Calculator',
    zhSeoTitle: '標準差計算器｜平均數變異數與樣本標準差',
    enSeoTitle: 'Standard Deviation Calculator | Mean and Variance',
    zhSeoDescription: '輸入一組數字，計算平均、中位數、全距、母體與樣本變異數和標準差，適合班級成績與研究資料檢查。',
    enSeoDescription: 'Calculate mean, median, range, population variance, sample variance, and standard deviation from a number list.',
    zhKeywords: ['標準差計算', '樣本標準差', '變異數', '平均數'],
    enKeywords: ['standard deviation calculator', 'sample standard deviation', 'variance calculator', 'mean calculator'],
    zhWho: '適合老師整理班級成績、學生檢查作業資料、研究生初步檢視問卷或實驗數據的集中趨勢與離散程度。',
    enWho: 'Useful for teachers, students, and researchers who need a quick summary of central tendency and spread.',
    zhMethod: '工具會同時計算母體與樣本版本。若資料是完整群體，使用母體標準差；若只是從更大群體抽出的樣本，通常使用樣本標準差。',
    enMethod: 'The tool reports both population and sample values. Use population SD for the complete group and sample SD for a sample drawn from a larger population.',
    zhExamples: ['老師輸入全班小考分數，查看平均與標準差是否顯示題目太難。', '研究生貼上前測資料，先確認是否有極端值。', '社團活動統計滿意度分數時，用標準差看意見是否集中。'],
    enExamples: ['A teacher checks whether class quiz scores are widely spread.', 'A graduate student reviews pre-test data for outliers.', 'A club summarizes satisfaction scores and checks agreement.'],
    zhMistakes: ['不要混入文字、空白或不同單位的資料。', '樣本數太少時標準差不穩定。', '標準差不能單獨說明分布是否常態。'],
    enMistakes: ['Do not mix units or nonnumeric text.', 'Very small samples produce unstable SD estimates.', 'SD alone does not prove normality.'],
    relatedZh: '可搭配 Z 分數計算器、T 分數計算器與成績平均計算器，形成完整教育統計流程。',
    relatedEn: 'Pair with Z Score, T Score, and Grade Average tools for education-statistics workflows.',
  },
  {
    slug: 'cronbach-alpha-calculator',
    zhName: 'Cronbach’s Alpha 計算器',
    enName: 'Cronbach Alpha Calculator',
    zhSeoTitle: 'Cronbach Alpha 計算器｜問卷量表信度估算',
    enSeoTitle: 'Cronbach Alpha Calculator | Scale Reliability',
    zhSeoDescription: '貼上受試者乘題目的原始資料，估算 Cronbach alpha、題目數與有效樣本數，適合問卷信度初步檢查。',
    enSeoDescription: 'Estimate Cronbach alpha from respondent-by-item data for a first reliability check of a questionnaire scale.',
    zhKeywords: ['Cronbach alpha', '信度分析', '問卷信度', '量表信度'],
    enKeywords: ['Cronbach alpha calculator', 'reliability analysis', 'questionnaire scale', 'internal consistency'],
    zhWho: '適合研究生、老師與問卷設計者在正式統計前快速檢查同一構面的題目是否具有基本內部一致性。',
    enWho: 'Useful for graduate students, teachers, and survey designers doing a first internal-consistency check before formal analysis.',
    zhMethod: 'Alpha 會受到題數、題目相關與樣本特性影響。高 alpha 不代表量表一定單一構面，低 alpha 也可能來自反向題未處理或題目混合不同概念。',
    enMethod: 'Alpha depends on item count, inter-item relationships, and sample characteristics. High alpha does not prove unidimensionality, and low alpha may reflect reverse-coded or mixed constructs.',
    zhExamples: ['研究生輸入 5 題學習動機量表，先確認 alpha 是否過低。', '老師試用課程回饋問卷，檢查同一面向題目是否一致。', '問卷修改前後比較 alpha，找出可能不合適的題目。'],
    enExamples: ['A graduate student checks a five-item motivation scale.', 'A teacher tests whether course-feedback items align.', 'A survey designer compares alpha before and after revising items.'],
    zhMistakes: ['反向題未轉向會拉低 alpha。', '不同構面的題目不應硬算同一個 alpha。', 'Alpha 不是效度，也不是正式量表審查的唯一標準。'],
    enMistakes: ['Reverse-coded items must be handled first.', 'Do not combine different constructs into one alpha.', 'Alpha is reliability, not validity.'],
    relatedZh: '可搭配標準差計算器檢查每題分布，再用 Z 分數或 T 分數整理個別量尺結果。',
    relatedEn: 'Pair with Standard Deviation for item summaries and Z/T score tools for standardized reporting.',
  },
  {
    slug: 'group-generator',
    zhName: '課堂分組工具',
    enName: 'Class Group Generator',
    zhSeoTitle: '課堂分組工具｜老師活動分組與學生名單分組',
    enSeoTitle: 'Class Group Generator | Classroom Team Maker',
    zhSeoDescription: '貼上學生名單，依組數或每組人數產生課堂分組，適合老師活動、小組討論與專題分配。',
    enSeoDescription: 'Paste a student list and create classroom groups by group count or group size for lessons and projects.',
    zhKeywords: ['課堂分組', '學生分組', '小組活動', '老師工具'],
    enKeywords: ['class group generator', 'student grouping', 'classroom teams', 'teacher tool'],
    zhWho: '適合老師在課堂活動、合作學習、實驗分組、專題討論前快速產生初版分組名單。',
    enWho: 'Useful for teachers creating first-pass groups for activities, labs, discussion, and projects.',
    zhMethod: '先清理名單，確認一行一位學生，再選擇分成幾組或每組幾人。工具提供隨機結果，但老師仍可依特殊需求做人工微調。',
    enMethod: 'Clean the list so each student is on one line, then choose either group count or group size. Random output is a starting point and can be adjusted by the teacher.',
    zhExamples: ['國中老師把 28 人分成 7 組，安排實驗器材。', '大學通識課把名單依每組 5 人分成討論組。', '補習班活動前先隨機分組，再人工調整請假學生。'],
    enExamples: ['A teacher splits 28 students into seven lab groups.', 'A college class creates five-person discussion groups.', 'A tutoring center creates random groups and then adjusts absent students.'],
    zhMistakes: ['名單重複會造成同一人進入多組。', '隨機不代表一定符合能力、性別或座位限制。', '公開投影名單前要注意學生個資。'],
    enMistakes: ['Duplicate names can place one person more than once.', 'Random grouping does not satisfy ability, gender, or seating constraints automatically.', 'Protect student privacy when projecting lists.'],
    relatedZh: '可搭配隨機點名工具、座位表產生器與隨機姓名抽選器處理課堂流程。',
    relatedEn: 'Pair with Random Student Picker, Seating Chart, and Random Name Picker for classroom workflows.',
  },
  {
    slug: 'delete-pdf-pages',
    zhName: '刪除 PDF 頁面工具',
    enName: 'Delete PDF Pages Tool',
    zhSeoTitle: '刪除 PDF 頁面｜移除空白頁與指定頁碼',
    enSeoTitle: 'Delete PDF Pages | Remove Selected Pages',
    zhSeoDescription: '輸入頁碼或範圍，刪除 PDF 中的空白頁、錯頁或不需要頁面，並在瀏覽器本機下載新檔。',
    enSeoDescription: 'Remove selected pages or ranges from a PDF locally in the browser and download a new file.',
    zhKeywords: ['刪除 PDF 頁面', '移除 PDF 頁碼', 'PDF 空白頁', 'PDF 工具'],
    enKeywords: ['delete PDF pages', 'remove PDF pages', 'PDF page remover', 'PDF tool'],
    zhWho: '適合整理掃描文件、申請附件、講義或報告時，移除空白頁、重複頁、錯誤頁與不需要的附錄。',
    enWho: 'Useful for removing blank, duplicate, wrong, or unnecessary pages from scans, applications, handouts, and reports.',
    zhMethod: '先開啟原始 PDF 確認頁碼，再以逗號與範圍輸入要刪除的頁面，例如 2, 5-7。下載後務必重新開檔檢查頁數與順序。',
    enMethod: 'Open the original PDF first, confirm page numbers, then enter pages or ranges such as 2, 5-7. Reopen the output and verify page count and order.',
    zhExamples: ['掃描講義時多出空白頁，輸入頁碼後移除。', '申請資料合併後發現附件重複，刪掉指定頁面。', '交件前移除內部備註頁，保留正式文件。'],
    enExamples: ['Remove blank pages after scanning handouts.', 'Delete duplicate attachment pages after combining files.', 'Remove internal note pages before submission.'],
    zhMistakes: ['頁碼以 PDF 顯示順序為準，不一定等於文件印刷頁碼。', '不要覆蓋原始檔，先保留備份。', '簽章或表單 PDF 輸出後需重新檢查。'],
    enMistakes: ['PDF page order may differ from printed page numbers.', 'Keep the original file as a backup.', 'Signed or form PDFs need extra verification.'],
    relatedZh: '若只是要保留幾頁，使用擷取 PDF 頁面；若要調整順序，使用 PDF 頁面重新排序。',
    relatedEn: 'Use Extract PDF Pages to keep selected pages, or PDF Page Reorder to rearrange pages.',
  },
  {
    slug: 'extract-pdf-pages',
    zhName: '擷取 PDF 頁面工具',
    enName: 'Extract PDF Pages Tool',
    zhSeoTitle: '擷取 PDF 頁面｜保留指定頁碼與頁面範圍',
    enSeoTitle: 'Extract PDF Pages | Keep Selected Ranges',
    zhSeoDescription: '輸入 1, 3-5 這類頁碼範圍，只保留 PDF 指定頁面並下載新檔，檔案不需上傳。',
    enSeoDescription: 'Keep selected PDF pages or ranges, such as 1, 3-5, and download a new local file.',
    zhKeywords: ['擷取 PDF 頁面', 'PDF 保留頁面', 'PDF 頁碼範圍', 'PDF 分頁'],
    enKeywords: ['extract PDF pages', 'keep PDF pages', 'PDF page range', 'split PDF'],
    zhWho: '適合從完整講義、合約、掃描檔或申請資料中取出指定頁面，製作較短版本或只分享需要的範圍。',
    enWho: 'Useful for pulling selected pages from handouts, contracts, scans, or application files.',
    zhMethod: '先確認要保留的頁碼，輸入單頁或範圍。工具會產生只包含指定頁面的新 PDF，原始檔不會被修改。',
    enMethod: 'Confirm the pages to keep, enter single pages or ranges, and download a new PDF containing only those pages.',
    zhExamples: ['老師只擷取講義第 3-6 頁給學生預習。', '行政人員從完整附件中取出需要上傳的頁面。', '研究生從掃描資料中保留問卷附錄頁。'],
    enExamples: ['A teacher extracts pages 3-6 for pre-class reading.', 'An administrator keeps only required upload pages.', 'A graduate student keeps questionnaire appendix pages from a scan.'],
    zhMistakes: ['保留頁碼與刪除頁碼是相反操作。', '輸出前先確認頁碼範圍沒有漏打。', '大檔案可能受瀏覽器記憶體限制。'],
    enMistakes: ['Keeping pages is the opposite of deleting pages.', 'Check ranges before exporting.', 'Large files can hit browser memory limits.'],
    relatedZh: '若要把多份 PDF 合起來，使用 PDF 合併；若要移除少數頁面，使用刪除 PDF 頁面。',
    relatedEn: 'Use Merge PDF to combine files or Delete PDF Pages when only a few pages should be removed.',
  },
  {
    slug: 'images-to-pdf',
    zhName: '圖片轉 PDF 工具',
    enName: 'Images to PDF Tool',
    zhSeoTitle: '圖片轉 PDF｜JPG PNG 排序合併成 PDF',
    enSeoTitle: 'Images to PDF | Combine JPG and PNG Files',
    zhSeoDescription: '將多張 JPG、PNG 圖片排序後合併成 PDF，可選 A4、Letter 或圖片尺寸，適合掃描與交件。',
    enSeoDescription: 'Sort JPG and PNG images and combine them into one PDF with A4, Letter, or image-size layout options.',
    zhKeywords: ['圖片轉 PDF', 'JPG 轉 PDF', 'PNG 轉 PDF', '掃描成 PDF'],
    enKeywords: ['images to PDF', 'JPG to PDF', 'PNG to PDF', 'scan to PDF'],
    zhWho: '適合把手機拍攝的作業、收據、表單或證明文件整理成單一 PDF，再用於上傳、列印或備份。',
    enWho: 'Useful for turning photos of homework, receipts, forms, or certificates into one PDF for upload, print, or archive.',
    zhMethod: '先把圖片依正確順序排列，必要時先壓縮或調整尺寸，再選擇頁面尺寸。若圖片方向不同，建議先旋轉或裁切。',
    enMethod: 'Order images first, optionally compress or resize them, then choose the page size. Rotate or crop images before conversion when orientation differs.',
    zhExamples: ['學生把多張作業照片整理成一份 PDF 上傳。', '辦公室把收據照片合成報帳附件。', '老師把白板照片排序後存成課堂紀錄。'],
    enExamples: ['A student combines assignment photos into one PDF.', 'An office worker creates an expense attachment from receipt photos.', 'A teacher saves ordered whiteboard photos as a class record.'],
    zhMistakes: ['照片模糊或歪斜不會因轉 PDF 變清楚。', '圖片太大會讓 PDF 也很大。', '交件前要打開輸出檔檢查頁面方向。'],
    enMistakes: ['Blurry or skewed photos will not become clearer.', 'Large images produce large PDFs.', 'Open the output and check orientation before submission.'],
    relatedZh: '可先使用圖片壓縮、圖片尺寸調整或圖片裁切，再用 PDF 合併整理其他文件。',
    relatedEn: 'Use Image Compressor, Image Resizer, or Image Crop before combining; use Merge PDF for document workflows.',
  },
  {
    slug: 'image-crop',
    zhName: '圖片裁切工具',
    enName: 'Image Crop Tool',
    zhSeoTitle: '圖片裁切工具｜免費線上裁剪大頭貼與縮圖',
    enSeoTitle: 'Image Crop Tool | Online Cropper for Avatars and Thumbnails',
    zhSeoDescription: '上傳圖片後拖曳選取範圍，裁切大頭貼、縮圖、報告圖片或社群圖，全程瀏覽器本機處理。',
    enSeoDescription: 'Crop avatars, thumbnails, report images, and social visuals locally in your browser.',
    zhKeywords: ['圖片裁切', '線上裁剪圖片', '大頭貼裁切', '縮圖裁切'],
    enKeywords: ['image crop tool', 'online image cropper', 'avatar crop', 'thumbnail crop'],
    zhWho: '適合需要快速裁掉多餘背景、對齊主體、製作大頭貼、簡報縮圖或報告插圖的人。',
    enWho: 'Useful for removing extra background, centering subjects, and preparing avatars, slides, thumbnails, or report figures.',
    zhMethod: '先確認輸出比例，再拖曳裁切框。若後續要上傳到平台，建議先查平台尺寸需求，避免裁切後仍被二次裁掉。',
    enMethod: 'Choose the intended aspect ratio first, then drag the crop area. Check platform size requirements before export to avoid a second forced crop.',
    zhExamples: ['老師裁切學生作品照片，只保留重點區域。', '研究生把圖表截圖裁到只剩坐標與圖例。', '社群貼文先裁成方形縮圖再下載。'],
    enExamples: ['A teacher crops a student-work photo to the important area.', 'A graduate student trims a chart screenshot to axes and legend.', 'A social post image is cropped to a square thumbnail.'],
    zhMistakes: ['裁切會永久移除框外內容，請保留原圖。', '小圖裁切後再放大會變模糊。', '透明背景輸出格式需另外確認。'],
    enMistakes: ['Cropping removes content outside the frame, so keep the original.', 'Cropping a small image and enlarging it will blur.', 'Check output format when transparency matters.'],
    relatedZh: '裁切後可搭配圖片壓縮、圖片尺寸調整、PNG 轉 JPG 或 JPG 轉 WebP。',
    relatedEn: 'After cropping, use Image Compressor, Image Resizer, PNG to JPG, or JPG to WebP.',
  },
  {
    slug: 'png-to-jpg',
    zhName: 'PNG 轉 JPG 工具',
    enName: 'PNG to JPG Tool',
    zhSeoTitle: 'PNG 轉 JPG｜透明背景與圖片壓縮轉檔',
    enSeoTitle: 'PNG to JPG | Convert Transparent Images',
    zhSeoDescription: '把 PNG 轉成 JPG，可選背景色與品質，適合減小照片、報告圖片與不需要透明背景的檔案。',
    enSeoDescription: 'Convert PNG images to JPG with background color and quality controls for smaller compatible files.',
    zhKeywords: ['PNG 轉 JPG', '透明背景轉 JPG', '圖片轉檔', 'PNG 壓縮'],
    enKeywords: ['PNG to JPG', 'transparent PNG to JPG', 'image converter', 'PNG compression'],
    zhWho: '適合把不需要透明背景的 PNG 轉成更通用的 JPG，例如報告插圖、簡報圖片、網站縮圖或平台上傳檔。',
    enWho: 'Useful for converting PNG files without needed transparency into more compatible JPG images.',
    zhMethod: 'JPG 不支援透明，所以透明區域會套用你選擇的背景色。若圖片是 Logo、線稿或需要透明，PNG 可能仍較適合。',
    enMethod: 'JPG does not support transparency, so transparent areas receive the selected background color. Logos and line art may remain better as PNG.',
    zhExamples: ['把透明背景截圖改成白底 JPG 放入 Word。', '把大型 PNG 照片轉 JPG 以降低上傳容量。', '簡報圖片不需要透明時，轉成 JPG 方便分享。'],
    enExamples: ['Convert a transparent screenshot to a white-background JPG for Word.', 'Turn a large PNG photo into JPG to reduce upload size.', 'Prepare a nontransparent slide image for sharing.'],
    zhMistakes: ['轉成 JPG 後透明背景無法保留。', '重複有損轉檔會累積畫質損失。', '文字邊緣或線條圖可能不適合 JPG。'],
    enMistakes: ['Transparency is lost in JPG.', 'Repeated lossy conversion adds artifacts.', 'Text edges and line drawings may look worse as JPG.'],
    relatedZh: '若要保留透明背景，使用 JPG 轉 PNG 或圖片裁切；若要更小檔案，可試 JPG 轉 WebP。',
    relatedEn: 'Use JPG to PNG when transparency is needed, or JPG to WebP for smaller web images.',
  },
  {
    slug: 'jpg-to-png',
    zhName: 'JPG 轉 PNG 工具',
    enName: 'JPG to PNG Tool',
    zhSeoTitle: 'JPG 轉 PNG｜本機圖片轉檔與報告素材整理',
    enSeoTitle: 'JPG to PNG | Local Image Format Converter',
    zhSeoDescription: '將 JPG 或瀏覽器可讀圖片轉成 PNG，適合報告截圖、設計素材與需要 PNG 格式的上傳流程。',
    enSeoDescription: 'Convert JPG and browser-readable images to PNG locally for reports, screenshots, and design workflows.',
    zhKeywords: ['JPG 轉 PNG', '圖片轉 PNG', '線上轉檔', 'PNG 圖片'],
    enKeywords: ['JPG to PNG', 'convert image to PNG', 'online image converter', 'PNG image'],
    zhWho: '適合需要 PNG 格式輸出、避免再次 JPG 壓縮、或整理截圖與報告素材的人。',
    enWho: 'Useful when a workflow requires PNG output, screenshots, or avoiding another JPG save step.',
    zhMethod: 'JPG 轉 PNG 不會讓畫質變回原始狀態，也不會自動產生透明背景；它只是改成 PNG 容器與無損儲存方式。',
    enMethod: 'Converting JPG to PNG does not restore original quality or create transparency automatically; it changes the output format and storage method.',
    zhExamples: ['把 JPG 圖片轉 PNG 後放入需要 PNG 的作業系統。', '設計稿需要統一輸出格式時，先轉成 PNG。', '報告截圖避免再次 JPG 壓縮，改存 PNG。'],
    enExamples: ['Convert a JPG for a system that accepts PNG only.', 'Standardize design exports to PNG.', 'Save report screenshots as PNG to avoid another JPG compression step.'],
    zhMistakes: ['JPG 壓縮造成的模糊無法復原。', 'PNG 檔案可能比 JPG 大。', '透明背景需要原圖本身有透明資訊或另外去背。'],
    enMistakes: ['JPG artifacts cannot be undone.', 'PNG can be larger than JPG.', 'Transparency requires source transparency or separate background removal.'],
    relatedZh: '若目標是縮小容量，優先使用圖片壓縮、圖片尺寸調整或 JPG 轉 WebP。',
    relatedEn: 'For smaller files, use Image Compressor, Image Resizer, or JPG to WebP.',
  },
  {
    slug: 'jpg-to-webp',
    zhName: 'JPG 轉 WebP 工具',
    enName: 'JPG to WebP Tool',
    zhSeoTitle: 'JPG 轉 WebP｜網站圖片壓縮與格式轉換',
    enSeoTitle: 'JPG to WebP | Compress Website Images',
    zhSeoDescription: '將 JPG 轉成 WebP，調整品質並比較檔案大小，適合網站縮圖、部落格圖片與載入速度優化。',
    enSeoDescription: 'Convert JPG to WebP with quality control and file-size comparison for faster website images.',
    zhKeywords: ['JPG 轉 WebP', 'WebP 轉檔', '網站圖片壓縮', '圖片格式'],
    enKeywords: ['JPG to WebP', 'WebP converter', 'website image compression', 'image format'],
    zhWho: '適合網站維護者、部落格作者與設計人員，把照片型 JPG 轉成較小的 WebP 版本，用於網頁載入優化。',
    enWho: 'Useful for site owners, bloggers, and designers converting photo-like JPG images into smaller WebP versions.',
    zhMethod: '先把圖片尺寸調到實際顯示大小，再調整 WebP 品質。若原 JPG 已高度壓縮，WebP 不一定會明顯變小。',
    enMethod: 'Resize to display dimensions first, then tune WebP quality. Highly optimized JPG files may not shrink much further.',
    zhExamples: ['部落格封面圖先縮到 1200px，再轉 WebP。', '網站縮圖用較低品質測試載入速度。', '作品集照片比較 JPG 與 WebP 的畫質差異。'],
    enExamples: ['Resize a blog cover to 1200px before WebP conversion.', 'Test a lower-quality WebP for thumbnails.', 'Compare portfolio photo quality between JPG and WebP.'],
    zhMistakes: ['不要把原始大圖直接轉檔卻不縮尺寸。', '舊系統或特殊平台可能不接受 WebP。', '請保留原始 JPG 作為備份。'],
    enMistakes: ['Do not convert oversized originals without resizing.', 'Some legacy systems may not accept WebP.', 'Keep the source JPG as a backup.'],
    relatedZh: '可搭配圖片尺寸調整、圖片壓縮、WebP 轉 JPG 與 QR Code 產生器的圖檔流程。',
    relatedEn: 'Pair with Image Resizer, Image Compressor, WebP to JPG, and QR Code workflows.',
  },
  {
    slug: 'webp-to-jpg',
    zhName: 'WebP 轉 JPG 工具',
    enName: 'WebP to JPG Tool',
    zhSeoTitle: 'WebP 轉 JPG｜相容格式與背景色轉換',
    enSeoTitle: 'WebP to JPG | Compatible Image Conversion',
    zhSeoDescription: '將 WebP 轉成 JPG，可為透明區域選背景色，適合上傳限制、文件插圖與簡報素材。',
    enSeoDescription: 'Convert WebP to JPG with a chosen background color for upload limits, documents, and presentations.',
    zhKeywords: ['WebP 轉 JPG', 'WebP 轉檔', '圖片相容格式', '透明背景轉 JPG'],
    enKeywords: ['WebP to JPG', 'WebP converter', 'compatible image format', 'transparent WebP'],
    zhWho: '適合遇到平台只接受 JPG、簡報軟體不支援 WebP，或需要把透明 WebP 套上固定背景的人。',
    enWho: 'Useful when an upload form, slide deck, or document tool accepts JPG but not WebP.',
    zhMethod: '若 WebP 有透明區域，JPG 會用你選的背景色填滿。轉檔後請檢查邊緣是否出現不自然色塊。',
    enMethod: 'Transparent WebP areas are filled with the selected background because JPG has no alpha channel. Check edges after export.',
    zhExamples: ['把下載的 WebP 商品圖轉成 JPG 放入簡報。', '平台不接受 WebP 時，轉成白底 JPG 上傳。', '文件編輯器無法顯示 WebP，改用 JPG 版本。'],
    enExamples: ['Convert a downloaded WebP product image for a slide deck.', 'Upload a white-background JPG when a platform rejects WebP.', 'Use JPG in a document editor without WebP support.'],
    zhMistakes: ['JPG 不能保留透明背景。', '轉檔不會提升原圖解析度。', '邊緣細節需要放大檢查。'],
    enMistakes: ['JPG cannot preserve transparency.', 'Conversion does not increase resolution.', 'Inspect edge detail at real size.'],
    relatedZh: '若要維持 WebP 優化流程，可搭配 JPG 轉 WebP、圖片壓縮與圖片尺寸調整。',
    relatedEn: 'For web optimization, pair with JPG to WebP, Image Compressor, and Image Resizer.',
  },
];

Object.assign(
  toolContentEnhancements,
  Object.fromEntries(prioritySpecs.map((spec) => [spec.slug, priorityEnhancement(spec)])),
);
