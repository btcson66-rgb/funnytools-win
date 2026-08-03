import type { Locale } from '../../config/site';
import type { ToolContent } from './_types';

type Pair = { zh: string; en: string };
type CasePair = { title: Pair; description: Pair };
type Enhancement = Partial<ToolContent>;
type SectionSpec = { heading: Pair; paragraphs: Pair[]; items?: Pair[] };

function localize(
  audience: Pair[],
  caseStudies: CasePair[],
  notes: Pair[],
  sections: SectionSpec[] = [],
): Record<Locale, Enhancement> {
  return {
    zh: {
      audience: audience.map((item) => item.zh),
      caseStudies: caseStudies.map((item) => ({ title: item.title.zh, description: item.description.zh })),
      notes: notes.map((item) => item.zh),
      ...(sections.length
        ? {
            contentSections: sections.map((section) => ({
              heading: section.heading.zh,
              paragraphs: section.paragraphs.map((item) => item.zh),
              items: section.items?.map((item) => item.zh),
            })),
          }
        : {}),
    },
    en: {
      audience: audience.map((item) => item.en),
      caseStudies: caseStudies.map((item) => ({ title: item.title.en, description: item.description.en })),
      notes: notes.map((item) => item.en),
      ...(sections.length
        ? {
            contentSections: sections.map((section) => ({
              heading: section.heading.en,
              paragraphs: section.paragraphs.map((item) => item.en),
              items: section.items?.map((item) => item.en),
            })),
          }
        : {}),
    },
  };
}

export const toolContentEnhancements: Record<string, Record<Locale, Enhancement>> = {
  'random-name-picker': {
    zh: {},
    en: {},
  },
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
      { zh: '這個轉換器預設啟用動態型別偵測，頁面上沒有關閉選項；純數字或 true/false 字串會被轉成 JSON 數字或布林值，不會保留為文字。', en: 'Dynamic type detection is on by default and there is no toggle to disable it; purely numeric or true/false strings become JSON numbers or booleans instead of staying as text.' },
      { zh: '大型資料仍可能受瀏覽器記憶體限制，正式匯入前應保留原始 CSV。', en: 'Large files are limited by browser memory. Keep the original CSV and validate the converted record count before a production import.' },
      { zh: '敏感資料雖不會上傳，仍應避免把轉換結果貼到不受信任的服務。', en: 'Processing is local, but the downloaded JSON still contains the original data and should be stored or shared with the same care.' },
    ],
    [
      {
        heading: { zh: '實測範例：3 列 CSV 轉 JSON', en: 'Worked example: 3 CSV rows to JSON' },
        paragraphs: [
          {
            zh: '貼上這段含引號逗號的 CSV：第一列標題 name,role,dept，接著 Alice,"Senior, Eng",R&D 與 Bob,PM,"Ops, APAC"。轉換後會得到 2 筆物件的 JSON 陣列，Bob 那筆的 dept 欄位會正確還原成完整的 "Ops, APAC"，因為引號內的逗號不會被當成欄位分隔符。',
            en: 'Paste this CSV with a quoted comma: header row name,role,dept, then Alice,"Senior, Eng",R&D and Bob,PM,"Ops, APAC". The result is a 2-object JSON array, and Bob\'s dept field correctly stays as the full "Ops, APAC" because a comma inside quotes is not treated as a field separator.',
          },
          {
            zh: '動態型別預設開啟且無法關閉，會直接影響會被誤判成數字的欄位，例如員工編號或郵遞區號開頭是 0 的情況：',
            en: 'Dynamic typing is on by default with no way to turn it off, which directly affects fields that look numeric, such as employee IDs or postal codes that start with a zero:',
          },
        ],
        items: [
          { zh: '輸入：id,code 標題列，接著 1,007 與 2,USD100 兩列。', en: 'Input: header id,code, then rows 1,007 and 2,USD100.' },
          { zh: '輸出：[{"id":1,"code":7},{"id":2,"code":"USD100"}] — "007" 被動態型別讀成數字 7，前導零消失；"USD100" 不是純數字，保留為文字。', en: 'Output: [{"id":1,"code":7},{"id":2,"code":"USD100"}] — "007" is read as the number 7 by dynamic typing and loses its leading zero, while "USD100" is not purely numeric and stays as text.' },
        ],
      },
      {
        heading: { zh: '解析失敗的行為、如何驗證，以及該選哪個轉換方向', en: 'What happens on a parse error, how to verify, and which direction to use' },
        paragraphs: [
          {
            zh: '格式錯誤時（例如引號未成對或某列欄位數與標題不同），錯誤訊息會直接顯示 PapaParse 回報的原始文字，並在後面加上出錯的列號，例如「Trailing quote on quoted field is malformed (row 3)」；這段附加的列號固定用英文 row 標示，不會因語系而翻譯，可用它直接定位到第幾列去修正來源 CSV。',
            en: 'On a malformed row, such as an unmatched quote or a column count that does not match the header, the error message shows PapaParse\'s raw text with the offending row number appended, for example "Trailing quote on quoted field is malformed (row 3)". That row label always stays in English regardless of site language, and it points directly at which source row to fix.',
          },
          {
            zh: '驗證輸出最簡單的方法：把結果貼回本站的 JSON 轉 CSV 工具轉一次，比對筆數與欄位是否與原始 CSV 一致；也可以在瀏覽器主控台執行 JSON.parse(貼上的文字) 確認語法正確。',
            en: 'The simplest way to verify the output is to paste it into this site\'s JSON to CSV tool and convert it back, then compare the row and column counts against the original CSV. You can also run JSON.parse(pasted text) in the browser console to confirm the syntax is valid.',
          },
          {
            zh: '選哪個方向：資料來源已經是逗號分隔（試算表匯出、資料庫查詢結果）時用 CSV 轉 JSON；已經有 API 回傳的物件陣列、想在 Excel 或 Google 試算表打開時改用 JSON 轉 CSV。兩個方向都不會自動展平巢狀物件或陣列，來源如果有巢狀欄位，要先手動拆成單層欄位再轉換。',
            en: 'Which direction to pick: use CSV to JSON when the source is already comma-separated, such as a spreadsheet export or a database query result. Use JSON to CSV when you already have an array of objects from an API and want to open it in Excel or Google Sheets. Neither direction flattens nested objects or arrays automatically, so flatten nested fields manually before converting.',
          },
        ],
      },
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
    [
      {
        heading: { zh: '實測範例：物件陣列轉出含逗號欄位的 CSV', en: 'Worked example: an object array with a comma-containing field' },
        paragraphs: [
          {
            zh: '輸入 [{"name":"Alice","role":"Senior, Eng"},{"name":"Bob","role":"PM"}]，轉換後會得到標題列 name,role，接著 Alice,"Senior, Eng" 與 Bob,PM 兩列；role 欄位因為本身含逗號，輸出時會自動補上引號，避免被試算表誤判成兩欄。',
            en: 'Enter [{"name":"Alice","role":"Senior, Eng"},{"name":"Bob","role":"PM"}] and the output is a header row name,role, followed by Alice,"Senior, Eng" and Bob,PM. Because the role value itself contains a comma, the tool automatically wraps it in quotes so a spreadsheet does not split it into two columns.',
          },
          {
            zh: '這個轉換方向的頁面沒有分隔符號選單，也沒有加入 UTF-8 BOM 的選項；輸出一律使用逗號分隔且不加 BOM。用滑鼠雙擊直接在 Excel 開啟含中文或表情符號的下載檔時，如果 Excel 判定的預設編碼不是 UTF-8，可能出現亂碼；比較保險的作法是改用「資料 > 從文字/CSV」匯入並手動選擇 UTF-8。',
            en: 'This conversion direction has no delimiter selector and no option to add a UTF-8 BOM; the output always uses commas with no BOM. Double-clicking the downloaded file to open it directly in Excel can show garbled characters for Chinese text or emoji if Excel guesses a non-UTF-8 encoding; importing through Data > From Text/CSV and manually choosing UTF-8 is more reliable.',
          },
        ],
      },
      {
        heading: { zh: '輸入不是陣列時的行為，以及如何驗證輸出', en: 'What happens when the input is not an array, and how to verify the output' },
        paragraphs: [
          {
            zh: '如果貼上的是單一物件（例如 {"name":"Alice"}）而不是陣列，工具會顯示「JSON 最外層必須是物件陣列」並清空輸出；如果貼上的文字根本不是合法 JSON（例如漏了結尾的引號），會顯示一段固定的英文訊息 "The input is not valid JSON."，這段訊息不會隨頁面語系翻譯成中文，需要對照原始輸入自行抓漏字或漏引號。',
            en: 'If you paste a single object such as {"name":"Alice"} instead of an array, the tool shows "The JSON root must be an array of objects" and clears the output. If the pasted text is not valid JSON at all, for example a missing closing quote, it shows a fixed English message, "The input is not valid JSON.", which does not get translated on the Chinese site, so you need to check the raw input yourself for the missing character.',
          },
          {
            zh: '驗證輸出的方法：把 CSV 貼回本站的 CSV 轉 JSON 工具轉一次，確認還原後的物件數與鍵值跟原始 JSON 一致；也可以用試算表打開後手動核對含逗號或換行的欄位是否還在同一格內。',
            en: 'To verify the output, paste the CSV back into this site\'s CSV to JSON tool and confirm the restored object count and keys match the original JSON. You can also open the file in a spreadsheet and manually check that fields containing a comma or line break stayed inside a single cell.',
          },
        ],
      },
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
    [
      {
        heading: { zh: '自動判斷秒或毫秒的實際規則', en: 'How automatic seconds-vs-milliseconds detection actually works' },
        paragraphs: [
          {
            zh: '選擇「自動判斷」時，工具只看輸入的絕對值：小於 100,000,000,000（1000 億）視為秒，大於或等於這個門檻視為毫秒。輸入 1735689600（2025 年附近的秒數）會被判成秒，輸入 1735689600000（同一時間的毫秒數）會被判成毫秒，兩者換算後應該指向同一天。',
            en: 'With "Auto detect" selected, the tool only looks at the absolute value of the input: anything below 100,000,000,000 is treated as seconds, and anything at or above that threshold is treated as milliseconds. Entering 1735689600 (a seconds value near 2025) is read as seconds, while 1735689600000 (the same instant in milliseconds) is read as milliseconds, and both should convert to the same calendar day.',
          },
          {
            zh: '如何驗證結果：按「使用目前時間」會把目前時間同時填入輸入框並強制切成毫秒單位，這時可以直接比對電腦系統時間是否與畫面上的本機時間欄位一致，藉此確認轉換邏輯正常運作。',
            en: 'To verify the result, click "Use current time" to fill the field with the current instant and force the unit to milliseconds, then compare the local-time field on screen with your computer\'s system clock to confirm the conversion logic is working correctly.',
          },
        ],
        items: [
          { zh: '輸入 1735689600，單位選自動 → 判定為秒，本機時間會顯示 2025 年附近的日期。', en: 'Input 1735689600 with Auto detect selected results in seconds, showing a local date near 2025.' },
          { zh: '輸入 1735689600000，單位選自動 → 判定為毫秒，換算出的日期應與上一列相同。', en: 'Input 1735689600000 with Auto detect selected results in milliseconds, converting to the same date as the row above.' },
        ],
      },
      {
        heading: { zh: '輸入無效時的行為，以及和其他時間工具的分工', en: 'What happens on invalid input, and how this differs from other time tools' },
        paragraphs: [
          {
            zh: '如果輸入框留空、輸入非數字文字，或換算出的日期超出瀏覽器 Date 物件能表示的範圍，畫面會直接顯示錯誤訊息並隱藏原本的結果區塊，不會顯示過去計算殘留的舊數值；修正輸入後再次按「轉換」即可重新顯示完整的本機時間、UTC、ISO 8601、Unix 秒與 Unix 毫秒五欄結果。',
            en: 'If the field is left empty, contains non-numeric text, or converts to a date outside what the browser Date object can represent, the page shows an error message and hides the results panel instead of leaving a stale value on screen. Fixing the input and clicking Convert again redisplays all five fields: local time, UTC, ISO 8601, Unix seconds, and Unix milliseconds.',
          },
          {
            zh: '這個工具只做「數字時間戳 ↔ 可讀日期」的雙向轉換，不做時區換算成第三個城市、不做日期加減、也不做工作天計算；需要那類需求時應改用本站的日期差計算器或工作日計算器。',
            en: 'This tool only converts between a numeric timestamp and a readable date in both directions. It does not convert a time into a third city\'s timezone, add or subtract days, or calculate business days; use this site\'s date difference calculator or business days calculator for those tasks instead.',
          },
        ],
      },
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
    [
      {
        heading: { zh: '數量與格式的實際限制', en: 'The real limits on count and format' },
        paragraphs: [
          {
            zh: '數量欄位輸入超過 100 或小於 1 都會被自動夾回有效範圍：例如輸入 500，按下產生後欄位會自己改回 100，並只產生 100 個 UUID；輸入 0 或負數則會改回 1。這個限制寫死在程式碼裡，不是可調整的偏好設定。',
            en: 'Entering more than 100 or less than 1 in the count field is automatically clamped back into range: type 500 and click generate, and the field silently resets to 100 while only 100 UUIDs are produced. Entering 0 or a negative number resets it to 1. This limit is hard-coded, not an adjustable preference.',
          },
          {
            zh: '格式是單一下拉選單，只能三選一：小寫（預設，例如 3fa85f64-5717-4562-b3fc-2c963f66afa6）、大寫，或移除連字號；沒有辦法同時勾選「大寫」又「去連字號」，如果你需要大寫又無連字號的版本，要先產生後自行用文字編輯器的取代功能處理。',
            en: 'The format control is a single dropdown with three mutually exclusive options: lowercase (default, e.g. 3fa85f64-5717-4562-b3fc-2c963f66afa6), uppercase, or no hyphens. There is no way to select uppercase and no-hyphens at the same time; if you need that combination, generate the list first and then run a find-and-replace in a text editor.',
          },
        ],
        items: [
          { zh: '驗證方法：用正規表達式 ^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$ 檢查小寫版本是否符合 UUID v4 格式（第三段以 4 開頭、第四段以 8/9/a/b 開頭）。', en: 'Verification method: check the lowercase output against the regular expression ^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$, which confirms UUID v4 format (the third group starts with 4, the fourth starts with 8, 9, a, or b).' },
        ],
      },
      {
        heading: { zh: '產生失敗時的行為，以及 UUID 不能拿來做什麼', en: 'What happens if generation fails, and what a UUID should not be used for' },
        paragraphs: [
          {
            zh: '產生功能依賴瀏覽器的 crypto.randomUUID()，這個 API 需要安全環境（HTTPS 或 localhost）。如果瀏覽器不支援或執行環境不安全，工具會捕捉例外、清空輸出欄位，並顯示「UUID generation is unavailable in this browser.」之類的錯誤訊息，而不會退回到不安全的隨機數產生方式。',
            en: 'Generation relies on the browser\'s crypto.randomUUID(), which requires a secure context such as HTTPS or localhost. If the browser lacks support or the page is not served securely, the tool catches the exception, clears the output field, and shows an error such as "UUID generation is unavailable in this browser." instead of silently falling back to a weaker random source.',
          },
          {
            zh: 'UUID 不是 CSV 轉 JSON 或 JSON 轉 CSV 工具能自動填入的欄位型別，如果需要在轉換出的資料裡補上識別碼，通常是先用這個頁面產生一批 UUID，再手動貼進表格的對應欄位。UUID 本身也不驗證任何權限，不應取代密碼、API 金鑰或簽章。', en: 'A UUID is not a field type that the CSV to JSON or JSON to CSV converter fills in automatically; when a converted dataset needs identifiers, the usual workflow is to generate a batch on this page first and paste the values into the matching column by hand. A UUID also proves nothing about authorization and should not replace a password, API key, or signature.' },
        ],
      },
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
    [
      {
        heading: { zh: '實測範例：一段會被清理的 HTML', en: 'Worked example: HTML that gets sanitized on preview' },
        paragraphs: [
          {
            zh: '在左側貼上 `# Title` 加一行 `<script>alert(1)</script>` 加一行 `- item one`，右側預覽會顯示一個 h1 標題與一個項目清單，但 script 標籤整段消失，不會執行、也不會以文字形式出現，因為 DOMPurify 會在渲染前移除不安全的元素與屬性。',
            en: 'Paste `# Title`, then a line with `<script>alert(1)</script>`, then a line with `- item one` on the left. The right-side preview shows an h1 heading and a bullet list, but the entire script tag disappears — it neither executes nor appears as visible text, because DOMPurify strips unsafe elements and attributes before rendering.',
          },
          {
            zh: '每次在輸入框打字都會即時重新渲染（監聽 input 事件），沒有儲存草稿的功能；重新整理或關閉分頁後，輸入的內容會完全消失，沒有自動儲存或還原機制。',
            en: 'The preview re-renders on every keystroke because it listens for the input event, and there is no draft-saving feature. Refreshing or closing the tab discards everything typed, with no autosave or recovery.',
          },
        ],
        items: [
          { zh: '驗證方法一：按「複製 HTML」把清理後的內容貼到純文字編輯器，確認裡面沒有 <script>、onclick 等可執行片段。', en: 'Verification method one: click Copy HTML, paste the sanitized output into a plain-text editor, and confirm there is no <script>, onclick, or other executable fragment left.' },
          { zh: '驗證方法二：下載 HTML 後在瀏覽器開啟獨立檔案，比對排版與左側原始 Markdown 的標題層級、清單與程式碼區塊是否一致。', en: 'Verification method two: download the HTML, open the standalone file in a browser, and compare its heading levels, lists, and code blocks against the original Markdown on the left.' },
        ],
      },
      {
        heading: { zh: '連結行為與比較：什麼時候該用繪圖板而不是預覽器', en: 'Link behavior, and when a drawing tool fits better than a Markdown preview' },
        paragraphs: [
          {
            zh: '預覽區塊裡的連結是不能點擊的：程式碼會攔截預覽內 <a> 標籤的點擊事件並呼叫 preventDefault()，所以貼上連結後想確認網址是否正確，必須用滑鼠懸停查看狀態列，或直接檢視左側原始 Markdown 文字，而不是在預覽中點下去。',
            en: 'Links inside the preview are not clickable: the script intercepts click events on any <a> tag in the preview and calls preventDefault(). To check whether a pasted link is correct, hover to see the status-bar URL or look at the raw Markdown on the left instead of clicking inside the preview.',
          },
          {
            zh: '如果你需要的是手繪草圖、簽名或流程示意圖而不是格式化文字，這個工具幫不上忙；本站的線上繪圖板可以手繪並匯出 PNG，流程圖製作工具則專門處理有方向箭頭的步驟圖，兩者都不會解析 Markdown 語法。',
            en: 'If what you actually need is a freehand sketch, a signature, or a flow diagram rather than formatted text, this tool will not help. This site\'s Online Sketchpad supports freehand drawing with PNG export, and Flowchart Maker is built for directional step diagrams; neither one parses Markdown syntax.',
          },
        ],
      },
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
    [
      {
        heading: { zh: '實測範例：把第 3 頁移到最前面', en: 'Worked example: move page 3 to the front' },
        paragraphs: [
          {
            zh: '上傳一份 5 頁 PDF 後，頁面清單會依原始順序列出「第 1 頁」到「第 5 頁」，每一列只有上移與下移兩個按鈕，沒有拖曳、也沒有直接輸入目標位置的欄位。要把第 3 頁移到最前面，需要連續按 2 次上移；清單第一列的上移按鈕、最後一列的下移按鈕會被停用，避免移出範圍。',
            en: 'After uploading a 5-page PDF, the page list shows "Page 1" through "Page 5" in their original order. Each row has only an up and a down button — no drag-and-drop, and no field to jump straight to a target position. Moving page 3 to the front takes 2 clicks of the up button; the up button on the first row and the down button on the last row are disabled so a page cannot move out of range.',
          },
          {
            zh: '下載的檔案固定命名為 reordered.pdf，不會沿用原始檔名（旋轉 PDF 工具則會在原檔名後加上 -rotated），如果同時處理多份文件，下載後要自行改檔名以免互相覆蓋。',
            en: 'The downloaded file is always named reordered.pdf; it does not reuse the original filename (the Rotate PDF tool, by contrast, appends -rotated to the source name). If you are reordering several documents in the same session, rename each download yourself to avoid one overwriting another.',
          },
        ],
      },
      {
        heading: { zh: '檔案限制、載入失敗的行為，以及該選哪個 PDF 工具', en: 'File limits, what happens when loading fails, and which PDF tool to use' },
        paragraphs: [
          {
            zh: '程式碼裡寫死 40MB 的檔案大小上限（超過會顯示錯誤並中止），這是這一批 PDF 工具中對檔案大小最寬鬆的一個：PDF 轉圖片限制在 25MB，PDF 旋轉則完全沒有檔案大小檢查。加密或需要密碼開啟的 PDF 在讀取階段就會失敗，顯示「無法讀取 PDF」，不會進到頁面清單。',
            en: 'A 40MB file-size ceiling is hard-coded in the script (going over it shows an error and stops), which is the most generous limit among this batch of PDF tools: PDF to Image caps at 25MB, while Rotate PDF has no file-size check at all. An encrypted or password-protected PDF fails at the loading step with "The PDF could not be loaded" and never reaches the page list.',
          },
          {
            zh: '這個工具只搬動整頁順序，完全不碰頁面內容；如果同時還想旋轉方向錯誤的頁面，要另外用 PDF 旋轉工具處理，兩個工具不會互相呼叫。想確認結果正確，下載後重新打開 PDF，對照頁首文字或頁碼浮水印，確認移動後的順序符合預期，而不是只看檔案總頁數有沒有變。',
            en: 'This tool only moves whole pages around and never touches page content. If some pages also need rotating, use the Rotate PDF tool separately; the two tools do not call each other. To confirm correctness, reopen the downloaded PDF and check header text or a page-number watermark against the expected order, rather than just checking that the total page count is unchanged.',
          },
        ],
      },
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
    [
      {
        heading: { zh: '實測範例：一份 8 頁 PDF 在 1.5× 倍率下的輸出', en: 'Worked example: an 8-page PDF rendered at 1.5x scale' },
        paragraphs: [
          {
            zh: '上傳一份 8 頁、A4 尺寸的 PDF，格式選 PNG、倍率選 1.5×，狀態文字會依序顯示「正在處理第 1/8 頁…」到「正在處理第 8/8 頁…」，每處理完一頁就會多出一張縮圖，完成後改顯示「全部頁面處理完成」；每張縮圖下面都有獨立的下載連結，檔名固定是 page-1.png、page-2.png 這種格式，需要合併使用時要自己依序重新命名。',
            en: 'Upload an 8-page A4 PDF, choose PNG format and 1.5x scale. The status text updates in order from "Processing page 1 of 8…" to "Processing page 8 of 8…", adding one thumbnail per completed page, then switches to "All pages are ready." Each thumbnail has its own download link with a fixed filename pattern like page-1.png, page-2.png, so renaming them in sequence is up to you if you need to combine the files.',
          },
          {
            zh: '每頁像素上限是寬乘高 1,600 萬像素，一般 A4 或 Letter 文件即使放大到 2× 也遠低於這個門檻（大約 194 萬像素），只有海報尺寸或建築圖這類非常大的頁面才會觸發；JPG 品質固定為 0.9，畫面上沒有可調整的品質滑桿。',
            en: 'Each page has a 16-million-pixel cap on width times height. A typical A4 or Letter page stays far under that limit even at 2x scale (about 1.94 million pixels), so only very large formats such as posters or architectural drawings tend to trigger it. JPG quality is fixed at 0.9, and there is no adjustable quality slider in the interface.',
          },
        ],
      },
      {
        heading: { zh: '超過頁數上限時的行為，以及如何驗證輸出張數', en: 'What happens past the page limit, and how to verify the output count' },
        paragraphs: [
          {
            zh: '如果 PDF 超過 20 頁，工具會在讀完頁數之後、開始渲染之前就丟出「一次最多處理 20 頁」的錯誤並停止，不會先渲染前 20 頁；但如果是在渲染過程中才超出單頁 1,600 萬像素的限制，已經完成的那幾張縮圖會保留在畫面上，只有卡住的那一頁之後會中止，等於是部分成功的狀態，此時應該先下載已完成的頁面，再把過大的原始頁面另外處理。',
            en: 'If the PDF has more than 20 pages, the tool throws "A maximum of 20 pages can be processed at once" right after reading the page count and before rendering starts, rather than rendering the first 20 anyway. But if the 16-million-pixel cap is hit partway through rendering, the thumbnails already generated stay on screen and only the run past the oversized page stops — a partial-success state. In that case, download the pages already produced first, then deal with the oversized source page separately.',
          },
          {
            zh: '驗證輸出最簡單的方法：比對畫面上產生的縮圖張數與原始 PDF 的總頁數是否一致，再挑一兩張圖片放大檢查文字是否清晰可讀；如果最終用途是嵌入簡報，需要在目標簡報軟體裡預覽實際顯示大小，而不是只看瀏覽器裡的縮圖。',
            en: 'The simplest way to verify the output is to compare the number of thumbnails against the original PDF page count, then zoom into one or two images to check that text stays legible. If the images are going into a slide deck, preview them at their real display size inside the presentation software rather than judging only from the browser thumbnails.',
          },
        ],
      },
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
  'rotate-pdf': localize(
    [
      { zh: '需要修正掃描方向的行政與文件處理人員', en: 'Administrators and document handlers fixing scan orientation' },
      { zh: '只想調整部分頁面方向的辦公室使用者', en: 'Office users who only need to rotate a subset of pages' },
      { zh: '在本機處理合約與私人文件的專業人員', en: 'Professionals handling contracts and private documents locally' },
    ],
    [
      { title: { zh: '修正整批橫向掃描頁', en: 'Fix a batch of sideways-scanned pages' }, description: { zh: '掃描機吃紙方向錯誤時，整份文件常常全部轉了 90 度；選擇「全部頁面」加上對應角度即可一次修正，下載後重新開啟確認方向正確。', en: 'When a scanner feeds paper in the wrong orientation, an entire document often ends up rotated 90 degrees. Choose "All pages" with the matching angle to fix it in one pass, then reopen the download to confirm the orientation.' } },
      { title: { zh: '只轉正簽名頁', en: 'Rotate only the signature page' }, description: { zh: '合約掃描件裡通常只有簽名頁方向不同，用「指定頁面」輸入該頁頁碼並選 180 度，其餘頁面維持原狀，不需要整份重新掃描。', en: 'In a scanned contract, usually only the signature page is oriented differently. Enter that page number under "Selected pages" and choose 180 degrees, leaving the rest of the document untouched instead of rescanning everything.' } },
    ],
    [
      { zh: '這個工具在程式碼裡沒有寫死檔案大小上限，跟另外兩個 PDF 工具（重新排序 40MB、轉圖片 25MB）不同。', en: 'This tool has no hard-coded file-size limit in the script, unlike the other two PDF tools here (Page Reorder at 40MB, PDF to Image at 25MB).' },
      { zh: '旋轉角度會疊加在頁面原本的角度上，不是直接取代成你選的角度。', en: 'The chosen angle is added to the page\'s existing rotation, not used to replace it outright.' },
      { zh: '頁碼範圍如果超出總頁數，會直接顯示錯誤並中止旋轉，不會自動修剪成有效範圍。', en: 'A page range that exceeds the total page count triggers an error and stops the rotation; it is not silently trimmed to the valid range.' },
    ],
    [
      {
        heading: { zh: '實測範例：指定頁面 2, 5-7 與超出範圍的輸入', en: 'Worked example: selected pages 2, 5-7 versus an out-of-range input' },
        paragraphs: [
          {
            zh: '上傳一份 10 頁 PDF 並選「指定頁面」，輸入 2, 5-7 會旋轉第 2、5、6、7 頁共 4 頁；如果改輸入 2, 5-12（總頁數只有 10），工具不會自動修剪成 2, 5-10，而是直接顯示「頁碼範圍格式無效，請使用 2, 5-7 這類格式。」並整份中止，不會旋轉任何一頁。',
            en: 'Upload a 10-page PDF and choose "Selected pages," then enter 2, 5-7 to rotate pages 2, 5, 6, and 7 — 4 pages in total. Enter 2, 5-12 instead (with only 10 total pages) and the tool does not trim it to 2, 5-10. It shows "Invalid page range. Use a format like 2, 5-7." and stops without rotating anything.',
          },
          {
            zh: '旋轉角度是疊加、不是取代：如果某一頁在 PDF 內部已經帶有 90 度的旋轉標記，再對它套用「90 度」，該頁最終角度會變成 180 度，而不是回到 0 度。懷疑某頁方向已經被多次旋轉搞混時，先用「讀取頁數」確認檔案能正常載入，再從小角度開始逐步測試。',
            en: 'The rotation angle stacks rather than replaces: if a page already carries a 90-degree rotation flag inside the PDF and you apply "90 degrees" to it, that page ends up at 180 degrees, not back at 0. If a page\'s orientation seems confused from repeated rotations, first click "Load page count" to confirm the file loads correctly, then test with a small angle before committing.',
          },
        ],
        items: [
          { zh: '輸入 2, 5-7（總頁數 10）→ 旋轉第 2、5、6、7 頁。', en: 'Enter 2, 5-7 with 10 total pages -> pages 2, 5, 6, and 7 rotate.' },
          { zh: '輸入 2, 5-12（總頁數 10）→ 顯示「頁碼範圍格式無效」，不執行旋轉。', en: 'Enter 2, 5-12 with 10 total pages -> shows "Invalid page range," nothing rotates.' },
        ],
      },
      {
        heading: { zh: '沒有檔案大小上限的代價，以及如何驗證與搭配其他工具', en: 'The tradeoff of no file-size cap, and how to verify results or pair it with other tools' },
        paragraphs: [
          {
            zh: '沒有寫死的檔案大小檢查，代表能處理多大的 PDF 完全取決於瀏覽器分頁當下可用的記憶體；非常大的檔案可能在「讀取頁數」階段就讓分頁變慢，沒有明確的錯誤提示可循，建議先用縮小過或分割過的檔案測試流程是否正常。',
            en: 'Because there is no hard-coded size check, how large a PDF this tool can handle depends entirely on the memory available to the browser tab at that moment. A very large file may just make the tab slow at the "Load page count" step with no clear error to point to, so testing with a smaller or already-split file first is safer.',
          },
          {
            zh: '驗證方法：下載後重新打開旋轉後的 PDF，逐頁檢查方向錯誤的頁面是否已經轉正，同時確認原本方向正確的頁面沒有被誤轉——因為「全部頁面」選項會套用到每一頁，用在只有部分頁面需要旋轉的文件上，會連帶把其他頁面也轉歪。',
            en: 'To verify, reopen the rotated PDF and check page by page that the previously misoriented pages are now upright, while confirming pages that were already correct were not accidentally rotated too — the "All pages" option applies to every page, so using it on a document that only needs a few pages fixed will also rotate the rest incorrectly.',
          },
          {
            zh: '這個工具只改變頁面顯示角度，不會重新排列頁面順序；如果同一份文件既要調整順序又要修正方向，需要另外用本站的 PDF 頁面重新排序工具分兩步驟處理，兩者是各自獨立的下載，不會互相呼叫。',
            en: 'This tool only changes the display angle of pages; it does not reorder them. If the same document needs both a new page order and a rotation fix, use this site\'s PDF Page Reorder tool as a separate step — the two tools produce independent downloads and do not call each other.',
          },
        ],
      },
    ],
  ),
  sketchpad: localize(
    [
      { zh: '需要快速手繪草圖、簽名或批註的使用者', en: 'Users who need a quick freehand sketch, signature, or annotation' },
      { zh: '製作課堂白板示意圖的老師', en: 'Teachers creating classroom whiteboard-style diagrams' },
      { zh: '用手機或平板隨手記錄想法的使用者', en: 'Users capturing quick ideas from a phone or tablet' },
    ],
    [
      { title: { zh: '手繪課堂示意圖', en: 'Sketch a classroom diagram by hand' }, description: { zh: '用不同顏色的筆刷畫出簡單的座位圖或概念關係，畫錯時用復原移除上一筆，完成後匯出 PNG 貼進投影片；畫布內部固定 960×560 像素，不論螢幕多寬，匯出的圖片尺寸都一樣。', en: 'Use different brush colors to sketch a simple seating chart or concept diagram, undo the last stroke if it goes wrong, then export a PNG for a slide. The canvas is internally fixed at 960 by 560 pixels, so the exported image is the same size no matter how wide the screen is.' } },
      { title: { zh: '手機上快速記錄圖形', en: 'Capture a quick shape from a phone' }, description: { zh: '觸控座標會依目前畫布顯示寬度換算回固定的內部解析度，所以在小螢幕手機上用手指畫的線條，換算後仍對應到同一組座標，不會因裝置不同而跑位或變形。', en: 'Touch coordinates are converted back to the fixed internal resolution based on the canvas\'s current display width, so a line drawn with a finger on a small phone screen still maps to the same coordinate set and does not shift or distort across devices.' } },
    ],
    [
      { zh: '復原歷史最多保留 30 筆，超過之後最舊的筆跡就無法再復原，只能用「清除」重畫。', en: 'Undo history keeps at most 30 steps; beyond that, the oldest strokes can no longer be undone and only "Clear" starts over.' },
      { zh: '橡皮擦是用白色覆蓋筆跡，不是清除成透明；匯出的 PNG 一定帶不透明白底。', en: 'The eraser paints white over strokes rather than clearing to transparency; the exported PNG always has an opaque white background.' },
      { zh: '這個工具沒有物件化的節點或圖層，畫完就是單純的像素圖，無法事後個別移動某一筆。', en: 'There are no objects or layers here — once drawn, it is a flat pixel image, and no individual stroke can be moved afterward.' },
    ],
    [
      {
        heading: { zh: '實測範例：復原上限與筆刷粗細範圍', en: 'Worked example: the undo limit and brush size range' },
        paragraphs: [
          {
            zh: '畫布內部解析度固定是 960×560 像素，不管螢幕顯示多寬，滑鼠或手指座標都會依目前顯示寬度換算回這個固定尺寸，所以手機小螢幕上畫出的線條，跟桌機大螢幕上畫出的線條會對應到同一組內部座標，匯出的 PNG 永遠是 960×560。',
            en: 'The canvas is internally fixed at 960 by 560 pixels. Regardless of how wide it displays on screen, mouse or touch coordinates are converted back to this fixed size, so a line drawn on a small phone screen maps to the same internal coordinates as one drawn on a large desktop screen, and the exported PNG is always 960 by 560.',
          },
          {
            zh: '復原功能最多記住 30 個步驟：每畫完一筆，工具就把當下整張畫布存成一張 PNG 快照放進歷史紀錄；超過 30 筆之後，最舊的快照會被丟棄，也就是連續按「復原」超過 30 次之後，最早期的筆跡就無法再復原。',
            en: 'Undo remembers at most 30 steps: after every completed stroke, the tool saves the whole canvas as a PNG snapshot in its history. Past 30 snapshots, the oldest one is dropped, meaning clicking "Undo" more than 30 times in a row can no longer bring back the earliest strokes.',
          },
        ],
        items: [
          { zh: '筆刷粗細滑桿範圍是 1 到 48 像素，數值旁邊會即時顯示目前粗細，例如「8 px」。', en: 'The brush-size slider ranges from 1 to 48 pixels, with a live readout next to it such as "8 px".' },
          { zh: '復原機制以「最近 30 個畫布快照」為單位，不是以「最近 30 個滑鼠動作」為單位。', en: 'Undo tracks the "most recent 30 canvas snapshots," not the "most recent 30 pointer movements."' },
        ],
      },
      {
        heading: { zh: '匯出前的驗證方法，以及跟流程圖工具的分工', en: 'How to verify before exporting, and the split with Flowchart Maker' },
        paragraphs: [
          {
            zh: '匯出前的驗證方法：按「匯出 PNG」下載後重新開啟圖片，確認筆跡位置、顏色與粗細跟畫面上看到的一致；如果之後想把圖案疊在有顏色的背景上，要知道這個工具不會輸出透明背景，需要另外用去背工具處理。',
            en: 'To verify before exporting, click "Export PNG," reopen the downloaded image, and confirm the stroke position, color, and thickness match what was on screen. If the drawing needs to sit on a colored background later, note that this tool cannot output a transparent background, so a separate background-removal step is needed.',
          },
          {
            zh: '如果你要畫的是有方向箭頭、可雙擊編輯文字的流程圖，而不是自由手繪，本站的流程圖製作工具提供矩形與菱形節點並支援拖曳；兩者都匯出 PNG，但繪圖板的筆跡沒有物件化，畫完就是純像素，無法之後單獨修改某一筆的文字或位置。',
            en: 'If what is needed is a diagram with directional arrows and double-click-editable text rather than freehand drawing, this site\'s Flowchart Maker offers draggable rectangle and diamond nodes. Both export PNG, but sketchpad strokes are not objects — once drawn, they are plain pixels with no way to edit the text or position of a single stroke afterward.',
          },
        ],
      },
    ],
  ),
  flowchart: localize(
    [
      { zh: '需要整理審核流程或作業步驟的職員', en: 'Staff mapping an approval process or task workflow' },
      { zh: '製作課堂決策樹或流程示意圖的老師', en: 'Teachers building a classroom decision tree or process diagram' },
      { zh: '想快速畫出是否判斷邏輯的產品或支援人員', en: 'Product or support staff sketching yes/no decision logic' },
    ],
    [
      { title: { zh: '整理審核流程', en: 'Map an approval workflow' }, description: { zh: '用流程矩形代表每個處理步驟、決策菱形代表是否判斷，畫完後用連線模式依序接上箭頭；節點上限是 20 個，複雜流程要先拆成幾張較小的圖。', en: 'Use process rectangles for each handling step and decision diamonds for yes/no checks, then switch to Connect mode to link them with arrows in order. The node limit is 20, so a complex process needs to be split into a few smaller diagrams.' } },
      { title: { zh: '畫客服應答的分支邏輯', en: 'Diagram support-ticket branching logic' }, description: { zh: '用決策菱形列出常見的分岔問題，雙擊節點編輯文字，完成後匯出 PNG 放進內部知識庫；匯出時會自動隱藏編輯用的選取外框，畫面比較乾淨。', en: 'Use decision diamonds for common branch points, double-click a node to edit its text, then export a PNG for an internal knowledge base. Export automatically hides the selection outline used while editing, keeping the image clean.' } },
    ],
    [
      { zh: '節點上限是 20 個；達到上限後再按新增，畫布不會新增節點，只會更新狀態文字，不會跳出錯誤視窗。', en: 'The node limit is 20; clicking add again past that point does not create a node — it only updates the status text, with no error dialog.' },
      { zh: '兩個節點之間可以同時存在方向相反的兩條箭頭，畫面上會幾乎完全重疊，難以分辨。', en: 'Two nodes can have arrows pointing in both directions at once, and they render almost exactly on top of each other, making them hard to tell apart.' },
      { zh: '節點文字用瀏覽器原生的輸入提示框編輯，不是直接在畫布上打字。', en: 'Node text is edited through the browser\'s native prompt dialog, not by typing directly on the canvas.' },
    ],
    [
      {
        heading: { zh: '實測範例：第 21 個節點與雙向箭頭', en: 'Worked example: the 21st node and a two-way arrow' },
        paragraphs: [
          {
            zh: '頁面載入時已經內建 2 個節點（1 個流程、1 個決策）並用箭頭連好，方便直接體驗；持續按「新增流程」到第 21 個節點時，畫布不會新增節點，狀態列文字會改成「最多可建立 20 個節點。」，不會跳出錯誤訊息框，很容易被忽略——如果按了新增卻沒有新節點出現，先看狀態列文字，而不是重新整理頁面重來。',
            en: 'The page loads with 2 nodes already in place (1 process, 1 decision) connected by an arrow, ready to try immediately. Clicking "Add process" repeatedly up to a 21st node does not add anything — the status line changes to "This canvas supports up to 20 nodes." with no error dialog, so it is easy to miss. If clicking add produces no new node, check the status line before reloading the page.',
          },
          {
            zh: '從節點 A 連到節點 B 之後，切到連線模式再從 B 連回 A，工具允許建立第二條反方向箭頭（狀態列顯示「已選取箭頭」而不是拒絕），但兩條箭頭畫在同一條線段上，視覺上幾乎完全重疊；需要表達雙向關係時，建議直接在節點文字裡註明方向，而不是依賴兩條重疊的箭頭。',
            en: 'After connecting node A to node B, switching to Connect mode and linking B back to A is allowed — the status line shows "Selected arrow" rather than rejecting it — but both arrows are drawn along the same line segment and end up nearly on top of each other. To express a two-way relationship, note the direction directly in the node text instead of relying on two overlapping arrows.',
          },
        ],
        items: [
          { zh: '節點文字用瀏覽器原生的「輸入提示框」（window.prompt）編輯，雙擊節點會跳出這個提示框。', en: 'Node text is edited through the browser\'s native prompt dialog; double-clicking a node opens it.' },
          { zh: '匯出 PNG 時會暫時隱藏目前選取的橘色外框與虛線連線提示，輸出圖片不含編輯用的視覺標記。', en: 'Exporting a PNG temporarily hides the orange selection outline and the dashed connect-mode indicator, so the output has no editing markers.' },
        ],
      },
      {
        heading: { zh: '只有兩種節點形狀，以及跟繪圖板的分工', en: 'Only two node shapes, and the split with Sketchpad' },
        paragraphs: [
          {
            zh: '這個工具只提供矩形（流程）與菱形（決策）兩種節點，沒有橢圓形的起訖點、沒有泳道，也沒有純文字標籤節點；如果流程需要區分「開始/結束」跟一般步驟，目前只能靠文字內容區分，不能靠形狀區分。',
            en: 'The tool offers only two node shapes: rectangles for processes and diamonds for decisions. There is no oval start/end shape, no swimlanes, and no plain text-label node. If a process needs to distinguish "start/end" from a regular step, that has to happen through wording, not shape.',
          },
          {
            zh: '驗證方法：畫完後先用「選取/移動」模式逐一點擊每個節點確認文字正確，再匯出 PNG 並放大檢查箭頭方向，尤其節點彼此靠得很近時，箭頭的起點與終點容易讓人誤判方向。',
            en: 'To verify, use "Select/Move" mode to click through every node and confirm its text, then export the PNG and zoom in to check arrow direction — especially when nodes sit close together, where the arrow start and end points are easy to misread.',
          },
          {
            zh: '如果需要的是自由手繪的草圖或簽名，而不是有方向的步驟圖，改用本站的線上繪圖板；兩個工具都匯出 PNG，但繪圖板沒有節點與箭頭的概念，畫完就是單純的筆跡像素，沒有可雙擊編輯的文字。',
            en: 'If what is needed is a freehand sketch or signature rather than a directional step diagram, use this site\'s Online Sketchpad instead. Both tools export PNG, but sketchpad has no concept of nodes or arrows — once drawn, it is plain pixel strokes with no double-click-editable text.',
          },
        ],
      },
    ],
  ),
  'image-to-base64': localize(
    [
      { zh: '需要內嵌小圖示到 HTML 或 CSS 的前端開發者', en: 'Front-end developers embedding small icons in HTML or CSS' },
      { zh: '沒有圖片主機、想直接把圖片放進網頁的使用者', en: 'Users without image hosting who need to embed an image directly' },
      { zh: '準備 email 範本或設定檔內嵌圖片的行銷與工程人員', en: 'Marketing and engineering staff embedding images in email templates or config files' },
    ],
    [
      { title: { zh: '把 Logo 內嵌進 CSS', en: 'Embed a logo directly in CSS' }, description: { zh: '上傳一張幾十 KB 的 PNG Logo，按「複製為 CSS」直接取得 background-image 那一整行，貼進樣式表就能省去一個額外的圖片請求；上傳前先確認檔案在 5MB 以內。', en: 'Upload a PNG logo of a few dozen KB, click "Copy as CSS" to get the full background-image line, and paste it into a stylesheet to remove one extra image request. Confirm the file is under 5MB before uploading.' } },
      { title: { zh: '在 email 範本裡內嵌小圖', en: 'Embed a small image in an email template' }, description: { zh: '部分 email 系統不方便外部圖片連結，把小圖示轉成 Base64 資料 URI 直接寫進 HTML；但字串會讓範本原始碼變長很多，只適合小尺寸圖示。', en: 'Some email systems make external image links inconvenient, so a small icon can be converted to a Base64 data URI and written directly into the HTML. The string makes the template source much longer, so this only suits small icons.' } },
    ],
    [
      { zh: '檔案大小上限精確寫死在程式碼是 5×1024×1024 位元組（約 5MB），超過會在選取當下就被拒絕。', en: 'The file-size ceiling is hard-coded at exactly 5 x 1024 x 1024 bytes (about 5MB), and larger files are rejected the moment they are selected.' },
      { zh: '這個工具不會轉換圖片格式，輸出的 MIME 類型完全跟著上傳的原始檔案。', en: 'The tool does not convert image formats; the output MIME type always matches the original uploaded file.' },
      { zh: 'Base64 字串通常比原始檔案大約三分之一，大型相片不適合用這種方式內嵌。', en: 'The Base64 string is typically about a third larger than the original file, so large photos are not a good fit for this kind of embedding.' },
    ],
    [
      {
        heading: { zh: '實測範例：小圖示的輸出大小與資料 URI 格式', en: 'Worked example: output size and data URI format for a small icon' },
        paragraphs: [
          {
            zh: '上傳一張約 20KB 的 PNG 小圖示後，畫面上的「Base64 長度」欄位會顯示字元數，通常會落在原始位元組數的 4/3 倍左右；可以直接拿這個數字跟「原始檔案大小」欄位比較，實測驗證大約 33% 的膨脹率是否成立。',
            en: 'After uploading a roughly 20KB PNG icon, the "Base64 length" field shows a character count that typically lands around 4/3 of the original byte size. Compare it directly with the "Original file size" field to confirm whether the roughly 33% expansion actually holds.',
          },
          {
            zh: '輸出的資料 URI 開頭固定是 data:image/png;base64,（或依原始檔案類型顯示 image/jpeg、image/webp 等），這個工具不會幫你轉換圖片格式，如果需要先轉檔再取得 Base64，要先用本站的圖片格式轉換工具處理過一次。',
            en: 'The output data URI always starts with data:image/png;base64, (or image/jpeg, image/webp, and so on, matching the source file). The tool does not convert formats, so if a format change is needed first, run the file through this site\'s image format converter before coming here.',
          },
        ],
        items: [
          { zh: '按「複製」拿到完整的 data:image/...;base64,... 字串，適合直接貼進 img 標籤的 src 屬性。', en: 'Click "Copy" for the full data:image/...;base64,... string, ready to paste into an img tag\'s src attribute.' },
          { zh: '按「複製為 CSS」拿到 background-image: url("data:image/...;base64,..."); 這一整行，可以直接貼進 CSS 檔案。', en: 'Click "Copy as CSS" for the full line background-image: url("data:image/...;base64,..."); ready to paste into a CSS file.' },
        ],
      },
      {
        heading: { zh: '超過 5MB 時的行為，以及如何驗證輸出可用', en: 'What happens past 5MB, and how to verify the output actually works' },
        paragraphs: [
          {
            zh: '超過 5MB 的檔案會在選取當下立即被拒絕，顯示「圖片過大（上限約 5MB），請選擇較小的檔案。」，不會嘗試部分讀取或先壓縮再轉換，也不會呼叫伺服器處理，所有動作都在瀏覽器分頁內完成。',
            en: 'A file over 5MB is rejected the instant it is selected, showing "The image is too large (about 5MB max); please choose a smaller file." It does not attempt a partial read or compress-then-convert; nothing is sent to a server, and everything happens inside the browser tab.',
          },
          {
            zh: '驗證輸出是否可用：把「複製為 CSS」的結果貼進一個測試用的 HTML 檔案的 style 屬性，在瀏覽器打開確認圖片正常顯示；也可以把完整字串貼進網址列的新分頁直接預覽，確認字串沒有被截斷。',
            en: 'To verify the output works, paste the "Copy as CSS" result into a test HTML file\'s style attribute and open it in a browser to confirm the image displays. You can also paste the full string into a new browser tab\'s address bar to preview it directly and confirm nothing was truncated.',
          },
          {
            zh: '這個工具適合幾 KB 到幾百 KB 的小圖示、Logo 或簡單插圖；大型相片轉成 Base64 之後字串長度會非常長，內嵌進 CSS 或 HTML 反而讓檔案難以維護，這種情況應該改用一般的圖片檔案搭配路徑引用，而不是內嵌。',
            en: 'This tool suits small icons, logos, or simple graphics in the range of a few KB to a few hundred KB. A large photo converted to Base64 produces an extremely long string, and embedding that in CSS or HTML makes the file hard to maintain — a regular image file referenced by path is the better choice in that case.',
          },
        ],
      },
    ],
  ),
  'pie-chart-maker': localize(
    [
      { zh: '需要呈現預算或支出占比的職員', en: 'Staff presenting budget or spending shares' },
      { zh: '整理問卷選項比例的分析人員', en: 'Analysts summarizing survey option proportions' },
      { zh: '製作教學或報告用占比圖的老師與學生', en: 'Teachers and students making proportion charts for reports' },
    ],
    [
      { title: { zh: '呈現支出分類占比', en: 'Show a spending breakdown by category' }, description: { zh: '用內建的四筆種子資料（居住、飲食、交通、娛樂）示範，改成自己的類別與數值後，圖表與圖例上的百分比會即時更新；類別建議控制在八項以內，避免顏色重複。', en: 'Start from the four built-in seed rows (housing, food, transport, leisure), then replace them with your own categories and values; the chart and legend percentages update instantly. Keep categories to about eight or fewer to avoid repeated colors.' } },
      { title: { zh: '整理問卷選項比例', en: 'Summarize survey option shares' }, description: { zh: '把每個選項的票數當成一列輸入，圖表會自動算出各選項占全部票數的百分比並畫出圖例，適合快速做成報告用的視覺化圖表。', en: 'Enter each option\'s vote count as a row; the chart automatically calculates each option\'s share of the total and draws a legend, useful for a quick visualization in a report.' } },
    ],
    [
      { zh: '圖表標題欄位有 60 字元的長度上限，超過的部分無法輸入。', en: 'The chart title field has a 60-character limit; anything beyond that cannot be typed.' },
      { zh: '色盤固定循環使用 8 種顏色，輸入超過 8 筆資料時，顏色會重複，只能靠圖例文字分辨。', en: 'The color palette cycles through 8 fixed colors; entering more than 8 rows repeats colors, leaving legend text as the only way to tell them apart.' },
      { zh: '標籤超過 14 個字元時，圖例上的顯示文字會被截斷並加上刪節號，輸入欄位裡的完整文字則不受影響。', en: 'A label longer than 14 characters is truncated with an ellipsis on the legend display, while the full text in the input field is unaffected.' },
    ],
    [
      {
        heading: { zh: '實測範例：4 筆種子資料的百分比與截斷規則', en: 'Worked example: percentages from the 4 seed rows, and the truncation rule' },
        paragraphs: [
          {
            zh: '頁面預設帶入「居住 40、飲食 25、交通 20、娛樂 15」四筆種子資料，總和為 100，因此各項百分比剛好等於數值本身（40%、25%、20%、15%）；如果把其中一筆改成 0 但其他三筆仍大於 0，圖表仍會正常繪製，只是那一項在圓餅圖上不佔任何角度。只有「所有」數值都是 0 或空白時，才會顯示「請輸入至少一筆有效資料」的提示。',
            en: 'The page loads with four seed rows — housing 40, food 25, transport 20, leisure 15 — summing to 100, so each percentage equals its value directly (40%, 25%, 20%, 15%). Change one row to 0 while the other three stay above 0, and the chart still renders normally; that slice simply takes up no angle in the pie. The "Enter at least one valid row" message only appears when every value is 0 or blank.',
          },
          {
            zh: '標籤欄位超過 14 個字元時，圖例文字會被截斷並加上刪節號（例如很長的分類名稱可能顯示成前 13 個字加上一個「…」），完整文字仍保留在輸入欄位裡，只是畫布上的顯示被縮短；匯出 PNG 前建議先把過長的標籤縮短到 14 字以內。',
            en: 'A label over 14 characters gets truncated with an ellipsis on the legend (for example, a long category name might show as its first 13 characters plus "…"), while the full text stays in the input field — only the canvas display is shortened. Shortening long labels to 14 characters or fewer before exporting a PNG avoids this.',
          },
        ],
        items: [
          { zh: '圖表標題欄位有 60 字元的長度上限（maxlength="60"），超過的部分無法輸入。', en: 'The chart title field has a 60-character limit (maxlength="60"); anything past that cannot be typed.' },
          { zh: '色盤固定循環使用 8 種顏色；輸入超過 8 筆資料時，第 9 筆會重複使用第 1 筆的顏色。', en: 'The color palette cycles through 8 fixed colors; a 9th row reuses the same color as the 1st row.' },
        ],
      },
      {
        heading: { zh: '什麼時候該用圓餅圖，什麼時候改用長條圖', en: 'When a pie chart fits, and when a bar chart is the better call' },
        paragraphs: [
          {
            zh: '圓餅圖工具比長條圖工具多一道檢查：只要所有數值加總為 0（例如全部留空或全部輸入 0），就不會嘗試畫出一個沒有意義的滿版圓；長條圖工具沒有這道加總檢查，即使數值全是 0 也會嘗試繪製座標軸。這代表圓餅圖比較適合「一定要看得出占比」的資料，長條圖比較能容忍暫時未填完的資料列。',
            en: 'The pie chart tool has one extra check that the bar chart tool does not: if every value sums to 0 (all blank or all zero), it will not attempt to draw a meaningless full circle. The bar chart tool has no such total check and still tries to draw axes even when every value is 0. That makes the pie chart a better fit for data that must show clear proportions, while the bar chart tolerates rows that are still being filled in.',
          },
          {
            zh: '選擇建議：類別在 2 到 6 項、彼此加總成一個有意義的「整體」時（例如預算分配、問卷選項占比），用圓餅圖比較容易一眼看出佔比；類別超過 8 項、數值之間沒有「加總為 100%」的關係，或需要比較數值大小而不是佔比（例如每月銷售額趨勢）時，改用長條圖，因為圓餅圖色盤只有 8 色，切片過多會重複顏色也難以分辨。',
            en: 'As a rule of thumb: use the pie chart when there are 2 to 6 categories that add up to a meaningful whole, such as a budget split or survey shares, since proportions are easy to read at a glance. Switch to the bar chart when there are more than 8 categories, the values do not sum to a meaningful 100%, or the point is comparing magnitudes rather than shares, such as monthly sales trends — the pie chart\'s 8-color palette starts repeating colors once slices exceed 8, making them hard to tell apart.',
          },
          {
            zh: '驗證方法：把畫面上每個扇形旁邊顯示的百分比手動加總，應該等於 100%（因四捨五入到小數點後 1 位，可能有極小誤差）；也可以另外用本站的百分比計算器，逐一算出每個數值占總和的比例，交叉核對圖例上顯示的數字。',
            en: 'To verify, manually add up the percentage shown next to every slice; the total should equal 100% (allowing for a tiny rounding difference, since values round to one decimal place). You can also use this site\'s percentage calculator to compute each value\'s share of the total separately and cross-check it against the legend.',
          },
        ],
      },
    ],
  ),
  'gpa-calculator': localize(
    [
      { zh: '想在期末前預估 GPA 的學生', en: 'Students estimating GPA before final grades are official' },
      { zh: '需要比較 4.3 制與 4.0 制差異的申請者', en: 'Applicants comparing results on the 4.3 and 4.0 scales' },
      { zh: '協助整理成績試算表的老師與顧問', en: 'Teachers and advisors helping compile a grade spreadsheet' },
    ],
    [
      { title: { zh: '期末前預估整體 GPA', en: 'Estimate overall GPA before finals' }, description: { zh: '把目前已知或預期的成績逐科輸入，留白學分的列會被自動忽略、不影響計算，適合在還有幾科成績未定時先抓一個大概的區間。', en: 'Enter each known or expected grade by course; a row with a blank credits field is automatically ignored and does not affect the calculation, which is useful for a rough estimate while a few grades are still pending.' } },
      { title: { zh: '比較 4.3 制與 4.0 制結果', en: 'Compare results on the 4.3 and 4.0 scales' }, description: { zh: '同一組課程分別切換兩種制度查看差異；如果課表裡沒有任何一科拿到 A+，兩種制度算出的 GPA 會完全相同，只有出現 A+ 才會產生差異。', en: 'Switch between the two scales for the same set of courses to compare. If no course earned an A+, both scales produce the identical GPA — only an A+ grade causes them to diverge.' } },
    ],
    [
      { zh: '4.3 制與 4.0 制的差異只在 A+：4.0 制把 A+ 降成跟 A 相同的 4.0，其餘等第完全一樣。', en: 'The 4.3 and 4.0 scales differ only at A+: the 4.0 scale drops A+ to the same 4.0 as a plain A, and every other grade is identical.' },
      { zh: '學分欄位有輸入但是 0 或負數的列會被忽略，並在說明文字後加上提醒；學分留空的列則直接忽略、不特別提醒。', en: 'A row where credits are entered but are 0 or negative is ignored, with a reminder appended to the note text; a row with credits left blank is simply ignored with no extra reminder.' },
      { zh: '這個工具只計算使用者輸入的單一組課程加權平均，不會核對任何學校的正式成績單或畢業門檻。', en: 'This tool only computes a weighted average from the courses you type in; it does not check any school\'s official transcript or graduation requirements.' },
    ],
    [
      {
        heading: { zh: '實測範例：預設 3 列資料的計算過程', en: 'Worked example: the calculation behind the 3 default rows' },
        paragraphs: [
          {
            zh: '頁面載入時已經預帶 3 列範例：3 學分 A、3 學分 B+，第三列學分留空（會被忽略，不計入總學分）。在 4.3 制下，3 學分 A（4.0 績點）加 3 學分 B+（3.3 績點），總績點是 3×4.0 + 3×3.3 = 21.9，總學分是 6，GPA 是 21.9 ÷ 6 = 3.65。',
            en: 'The page loads with 3 example rows: 3 credits at A, 3 credits at B+, and a third row with blank credits (ignored, so it does not count toward total credits). On the 4.3 scale, 3 credits at A (4.0 points) plus 3 credits at B+ (3.3 points) gives total quality points of 3x4.0 + 3x3.3 = 21.9, total credits of 6, and a GPA of 21.9 / 6 = 3.65.',
          },
          {
            zh: '兩種制度只有一個地方不同：4.0 制把 A+ 的績點從 4.3 降成 4.0（跟 A 相同），A 到 F 其餘等第完全一樣。把其中一科改成 A+ 後再切換制度比較，就能直接看出這個差異只發生在有 A+ 的科目上。',
            en: 'The two scales differ in exactly one place: the 4.0 scale drops A+ from 4.3 points down to 4.0, matching a plain A, while every other grade from A to F stays the same. Change one course to A+ and switch scales to compare, and the difference will only show up for that one course.',
          },
        ],
        items: [
          { zh: '輸入學分 3、成績 A，加上學分 3、成績 B+ → 4.3 制 GPA = 3.65。', en: 'Enter credits 3 grade A, plus credits 3 grade B+ -> 4.3-scale GPA = 3.65.' },
          { zh: '把其中一科成績改成 A+ → 4.3 制下總績點增加 0.3 乘以該科學分，4.0 制下維持不變。', en: 'Change one course to A+ -> total quality points on the 4.3 scale rise by 0.3 times that course\'s credits, while the 4.0 scale stays unchanged.' },
        ],
      },
      {
        heading: { zh: '無效資料列的行為，以及如何用手算驗證', en: 'How invalid rows are handled, and how to verify by hand' },
        paragraphs: [
          {
            zh: '學分欄位留空的列會被直接忽略、不計入任何計算，也不會出現警告；但如果學分欄位「有輸入」卻是 0 或負數，工具一樣會忽略這一列，同時在制度說明文字後面加上一句提醒，提示你檢查是不是打錯數字。',
            en: 'A row with the credits field left blank is simply ignored and produces no warning. But a row where credits are entered as 0 or a negative number is also ignored, with a reminder line appended after the scale note to flag that a number may have been mistyped.',
          },
          {
            zh: '驗證方法：挑畫面上其中一科手動反推，用「總績點 = GPA × 總學分」算出總績點，再減去其他科目的績點乘積，看剩下的數字是否等於該科成績對應的績點；一致就代表計算正確。',
            en: 'To verify, pick one course on screen and work backward: compute total quality points as GPA times total credits, subtract the quality points from every other course, and check whether what remains matches the grade points for that one course. A match confirms the calculation is correct.',
          },
          {
            zh: '這個工具算出的是「單一使用者輸入的一組課程」的加權平均，不會查詢或核對任何學校的正式成績單、學分抵免規則或畢業門檻；正式採認的 GPA 仍以學校教務系統或官方成績單為準。',
            en: 'This tool computes a weighted average purely from the set of courses you type in. It does not look up or check any school\'s official transcript, credit-transfer rules, or graduation requirements; the officially recognized GPA still comes from the school\'s registrar system or transcript.',
          },
        ],
      },
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
  zhQuickAnswer?: string;
  enQuickAnswer?: string;
  zhContentSections?: NonNullable<ToolContent['contentSections']>;
  enContentSections?: NonNullable<ToolContent['contentSections']>;
  zhFaq?: ToolContent['faq'];
  enFaq?: ToolContent['faq'];
  zhSources?: ToolContent['sources'];
  enSources?: ToolContent['sources'];
}

function priorityEnhancement(spec: PrioritySpec): Record<Locale, Enhancement> {
  const zhContentSections = [
    ...(spec.zhQuickAnswer ? [{ heading: '速答', paragraphs: [spec.zhQuickAnswer] }] : []),
    ...(spec.zhContentSections ?? [
      {
        heading: `${spec.zhName}適合誰使用`,
        paragraphs: [
          spec.zhWho,
          `這一頁的重點不是取代原始資料、人工複核或專業軟體，而是把「先試算、再檢查、最後確認來源」的流程整理清楚。使用 ${spec.zhName} 時，建議先用一組小資料測試欄位、單位、選項與輸出是否符合你的情境，再處理完整內容。`,
        ],
      },
      {
        heading: '計算方法、判讀與限制',
        paragraphs: [
          spec.zhMethod,
          '結果應搭配資料來源、輸入條件、輸出格式與使用情境一起判讀；如果用於申請、報告、交件或公開文件，請把工具結果視為草稿檢查與溝通輔助，最後仍以原始資料與人工複核為準。',
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
    ]),
  ];
  const enContentSections = [
    ...(spec.enQuickAnswer ? [{ heading: 'Quick answer', paragraphs: [spec.enQuickAnswer] }] : []),
    ...(spec.enContentSections ?? [
      {
        heading: `Who should use ${spec.enName}`,
        paragraphs: [
          spec.enWho,
          `This page is designed for quick checking and preparation, not for replacing the source material, review process, or specialist software for your task. When using ${spec.enName}, test a small input first so units, options, files, and output settings match your real workflow before processing the full item.`,
        ],
      },
      {
        heading: 'Method, interpretation, and limits',
        paragraphs: [
          spec.enMethod,
          'Read the result together with the source data, selected options, output format, and workflow context. For reports, submissions, public documents, or important decisions, treat the output as a draft check and verify it against the original source before relying on it.',
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
    ]),
  ];

  return {
    zh: {
      seoTitle: spec.zhSeoTitle,
      seoDescription: spec.zhSeoDescription,
      keywords: spec.zhKeywords,
      contentSections: zhContentSections,
      caseStudies: spec.zhExamples.map((description, index) => ({
        title: `範例 ${index + 1}`,
        description,
      })),
      notes: spec.zhMistakes,
      ...(spec.zhSources ? { sources: spec.zhSources } : {}),
      faq: spec.zhFaq ?? [
        { q: `${spec.zhName}可以免費使用嗎？`, a: '可以。FunnyTools 的工具可直接在瀏覽器使用，不需要註冊。' },
        { q: '資料會上傳到伺服器嗎？', a: '這個工具採瀏覽器本機處理；輸入內容與檔案不會主動上傳到 FunnyTools 伺服器。' },
        { q: '結果可以當作正式規則嗎？', a: '不建議。這裡提供的是試算、整理與檢查輔助，正式用途仍要依簡章、學校、機關或平台公告為準。' },
        { q: '輸入後結果看起來不合理怎麼辦？', a: '先檢查單位、權重、頁碼範圍、樣本數、格式與空白字元，再用小範例驗算一次。' },
        { q: '還可以搭配哪些工具？', a: spec.relatedZh },
      ],
    },
    en: {
      seoTitle: spec.enSeoTitle,
      seoDescription: spec.enSeoDescription,
      keywords: spec.enKeywords,
      contentSections: enContentSections,
      caseStudies: spec.enExamples.map((description, index) => ({
        title: `Example ${index + 1}`,
        description,
      })),
      notes: spec.enMistakes,
      ...(spec.enSources ? { sources: spec.enSources } : {}),
      faq: spec.enFaq ?? [
        { q: `Is ${spec.enName} free to use?`, a: 'Yes. You can use the tool directly in the browser with no registration.' },
        { q: 'Is my data uploaded?', a: 'No. This tool runs locally in your browser and does not actively upload inputs or files to FunnyTools servers.' },
        { q: 'Can I treat the result as official?', a: 'No. Use it as a calculation, cleanup, or checking aid and confirm formal requirements with official sources.' },
        { q: 'What should I check when the result looks wrong?', a: 'Review units, options, source format, whitespace, file state, and output settings, then test again with a small known example.' },
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
    zhMethod: '程式計算 Σ(分數×權重)／Σ權重，權重不必剛好合計 100，但必須全部採同一單位。若簡章使用先標準化、再加權或另有門檻，請依該年度公告調整，本頁只做一般加權試算。',
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
    zhMistakes: ['不要把百分比權重和小數權重混用。', '不要把範例試算當成任何年度正式錄取規則。', '若簡章有最低門檻、同分比序、加分或標準化規則，需另外確認。', '不要在不清楚簡章的四捨五入順序時，用畫面結果推算名次差。'],
    enMistakes: ['Do not mix percentage and decimal weights.', 'Do not treat a sample calculation as an official selection rule.', 'Check thresholds, tie-breakers, and normalization separately.'],
    relatedZh: '若需要比較標準化後的分數，可接著使用 T 分數計算器、Z 分數計算器、PR 百分等級計算器與加權平均計算器。',
    relatedEn: 'For standardized score workflows, use the T Score Calculator, Z Score Calculator, Percentile Rank Calculator, and Weighted Average Calculator.',
    zhContentSections: [
      {
        heading: '工具實際使用的加權公式與精度',
        paragraphs: [
          '程式分別讀取筆試、試教、口試的分數與非負權重，至少要有一項權重大於 0。模擬總成績為 Σ(各項分數×各項權重)／Σ權重；權重合計不是 100 時仍會照總和正規化計算，同時顯示警告。這代表 40、40、20 與 0.4、0.4、0.2 會得到相同結果，但把 40、0.4、20 混在一起會扭曲比例。',
          '乘法與除法先使用完整數值精度，模擬總成績最後顯示到小數點後最多 3 位；權重總和與明細中的分數、權重顯示到最多 2 位。「自動正規化權重」會先把各權重換成合計 100 的比例並保留最多 4 位，再重新計算。若簡章規定每項先取到小數第 2 位後再加總，本工具結果可能不同。',
        ],
      },
      {
        heading: '教甄三項成績的完整試算例子',
        paragraphs: [
          '假設筆試 80 分占 40%、試教 85 分占 40%、口試 82 分占 20%，模擬總成績為 (80×40+85×40+82×20)÷100=82.4。若只把試教提高 5 分到 90，其他不變，總成績變成 84.4，增加 2 分；因為試教權重是 40%，試教每增加 1 分只會讓總成績增加 0.4 分。',
          '這個例子只能用來排定準備重點。正式結果還可能受到初試門檻、複試資格、原始分數標準化、加分、缺額與同分比序影響；工具沒有這些年度與縣市規則，也不會預測錄取。',
        ],
      },
      {
        heading: '0 權重、分數範圍與輸入邊界',
        paragraphs: [
          '權重可以是 0；該項分數仍會顯示在輸入欄，但乘積為 0，不影響模擬總成績。權重不能是負數，且三項不能全部為 0。分數欄只檢查是否為有限數值，程式不限制在 0 到 100，所以 105 分或負分也會照公式計算；這是為了保留自訂量尺彈性，不代表任何教甄允許超出公告範圍。正式試算前應自行檢查各欄滿分與可接受區間。',
          '畫面沒有缺考、未到考或資格不符的專用狀態。把空白改成 0 會實際拉低總分，把該項權重改成 0 則等於完全排除，兩者意義不同；應依簡章規定處理，不要用方便計算的方式代替正式規則。',
        ],
      },
      {
        heading: '正式使用前的逐項核對表',
        paragraphs: [
          '先確認三項名稱是否真的是筆試、試教、口試，以及簡章中的數字是百分比、倍率或已換算分數；再確認計算順序是原始分數直接加權，還是各項先標準化、先取小數位、通過門檻後才加權。最後核對是否另有服務年資、證照、偏遠地區、身心障礙或其他依法加分項目。本工具沒有這些欄位，不能把它們併入某一項分數假裝完成。',
          '試算後應保留簡章版本、輸入值、權重與計算明細。若兩位考生只差 0.001 分，不要用本站顯示的 3 位小數自行判定名次；主辦單位可能保留更多內部精度，或依另一項成績進行同分比序。',
        ],
      },
      {
        heading: '先核對簡章，再決定要用哪一種平均',
        paragraphs: [
          '若只是整理多次作業、段考或任意數量的評量，不必硬塞進固定三欄；一般成績工具能逐列輸入，並同時比較簡單平均與加權平均。',
        ],
        link: {
          prefix: '改用',
          label: '成績平均計算器整理多筆評量與權重',
          href: '/tools/grade-average/',
          suffix: '；正式教甄試算則應把本頁每個欄位逐一對照當年度簡章。',
        },
      },
      {
        heading: '簡章若使用標準分數',
        paragraphs: [
          '有些情境會先把原始成績轉為標準分數，再依權重合併；先標準化再加權和直接加權原始分數不是同一件事。只有簡章明確提供常模、平均、標準差或換算表時，才能依指定順序處理。',
        ],
        link: {
          prefix: '需要檢查平均 50、標準差 10 的換算時，使用',
          label: 'T 分數計算器並核對常模來源',
          href: '/tools/t-score-calculator/',
          suffix: '，不要自行假設所有教甄都採相同量尺。',
        },
      },
    ],
    zhSources: [
      {
        label: 'NIST Dataplot Reference Manual：Weighted Mean',
        href: 'https://www.itl.nist.gov/div898/software/dataplot/refman2/ch2/weigmean.pdf',
        note: '公開列出 Σ(wᵢxᵢ)／Σwᵢ 的加權平均定義；本工具依此公式試算三項成績，不代表任何主辦單位的正式規則。',
      },
    ],
  },
  {
    slug: 't-score-calculator',
    zhName: 'T 分數計算器',
    enName: 'T Score Calculator',
    zhSeoTitle: 'T分數換算器｜Z分數轉T分數公式與範例',
    enSeoTitle: 'T Score Calculator | Convert Z Scores for Education',
    zhSeoDescription: 'T分數換算器：輸入Z分數，用 T = 50 + 10z 立即算出T分數，附教育測驗、班級成績與教師甄試換算範例。',
    enSeoDescription: 'Convert z scores to T scores with T = 50 + 10z and interpret standardized education results.',
    zhKeywords: ['T 分數計算', 'T 分數換算器', 'Z 分數轉 T 分數', '標準分數', '教育統計'],
    enKeywords: ['t score calculator', 'z score to t score', 'standard score', 'education statistics'],
    zhWho: '適合需要把 Z 分數轉成平均 50、標準差 10 量尺的老師、考生與研究生。T 分數比 Z 分數更容易閱讀，常用於教育測驗與成績比較範例。',
    enWho: 'Useful for teachers, candidates, and graduate students who need a mean-50, SD-10 scale that is easier to read than raw z scores.',
    zhMethod: 'T 分數公式為 T = 50 + 10z。程式先用完整數值精度運算，畫面最後顯示到小數點後最多 2 位；z 對照值顯示到最多 3 位。公式只改變量尺，不會讓偏態資料變成常態分配。',
    enMethod: 'T = 50 + 10z. A z score of 0 becomes 50, +1 becomes 60, and -1 becomes 40. The transformation changes the scale, not the distribution shape.',
    zhExamples: ['班級平均附近的學生 z = 0.1，換成 T 分數約 51，方便放入報告。', '教師甄試範例中若已取得 Z 分數，可快速轉成 T 分數做比較。', '研究生整理量表結果時，用 T 分數讓不同指標有相同基準。'],
    enExamples: ['A student near the class mean has z = 0.1, which becomes T = 51 for a short report.', 'A teacher-exam example with provided z scores can be converted to T scores for comparison.', 'A researcher puts multiple standardized indicators onto the same T-score scale.'],
    zhMistakes: ['不要把 T 分數解讀成答對百分比。', '原始分數若尚未標準化，應先用同一參照群體的平均與標準差計算 Z 分數。', '不要把不同年度、不同考科或不同常模的 T 分數直接視為完全等值。', '極端分數需要搭配樣本數與分布形狀判讀。'],
    enMistakes: ['Do not read a T score as percent correct.', 'Use a z-score calculator first if the raw score is not standardized.', 'Interpret extreme scores with sample size and distribution shape.'],
    relatedZh: '可先用 Z 分數計算器取得 z，再搭配 PR 百分等級與教師甄試成績轉換模擬器整理完整流程。',
    relatedEn: 'Start with the Z Score Calculator, then use Percentile Rank and Teacher Exam Score tools for a fuller workflow.',
    zhQuickAnswer: 'T 分數 = 50 + 10 × Z 分數；例如 z = 1.2 會得到 T = 62。這是平均 50、標準差 10 的常見標準分數量尺，可見於教育與心理測驗，但實際定義仍要核對該測驗手冊。',
    enQuickAnswer: 'T score = 50 + 10 × z; for example, z = 1.2 becomes T = 62 on a scale with mean 50 and standard deviation 10, which is commonly used for educational and psychological test interpretation.',
    zhContentSections: [
      {
        heading: 'T 分數是什麼',
        paragraphs: [
          'T 分數是一種由 Z 分數線性轉換而來的標準分數，常見設定是平均數 50、標準差 10。它保留「高於或低於平均多少個標準差」的資訊，但用較容易閱讀的數字呈現。',
          '公式是 T = 50 + 10 × z；z = 0 會得到 T = 50，z = 1 會得到 T = 60，z = -1 會得到 T = 40。',
          '在台灣，學生與老師常會在心理與教育測驗、班級成績分析、教師甄試或標準分數報表中看到 T 分數。實際採用的常模、方向與換算規則仍要以測驗手冊、原始報表或主辦單位說明為準。',
        ],
        items: [
          '範例：某次測驗原始分數 82 分，參照群體平均數 70、標準差 10，先算 z = (82 − 70) / 10 = 1.2。',
          '再代入 T = 50 + 10 × 1.2，得到 T = 62，表示比該參照群體平均高 1.2 個標準差。',
        ],
      },
      {
        heading: '工具實作、四捨五入與輸入邊界',
        paragraphs: [
          '本工具只接收一個有限數值 Z，不會從原始分數自動猜平均數或標準差。程式直接計算 50 + 10×z，沒有先四捨五入 z；T 分數最後顯示到小數點後最多 2 位，輸入的 Z 對照值顯示到最多 3 位，尾端 0 會省略。因此 z = 0.126 會得到 T = 51.26，而不是先把 z 取成 0.13 再算 51.3。',
          '輸入可以是負數或很大的數，程式不把 T 限制在 0 到 100。這和標準分數沒有固定滿分的定義一致，但極端結果常表示原始常模、平均數、標準差或輸入小數需要重新核對。',
        ],
      },
      {
        heading: '段考成績的常模參照例子',
        paragraphs: [
          '某次八年級數學段考，參照群體平均 70 分、母體標準差 10 分，學生得 82 分。先算 z=(82−70)/10=1.2，再算 T=50+10×1.2=62。正確說法是「在這次參照群體中高於平均 1.2 個標準差」；不能說成答對 62%、全國 PR 62，或已達某個課程精熟標準。',
          '常模參照回答的是「相對於這群人在哪裡」，標準參照回答的是「是否達到事先設定的學習標準」。同一位學生可能 T 分數高於班級平均，卻仍未達學校設定的及格門檻，兩種判讀不可互相替代。',
        ],
      },
      {
        heading: '先確認平均與標準差的來源',
        paragraphs: [
          '若手上只有全班原始分數，應先決定這批資料是完整班級母體或抽樣資料，再取得相符的平均與標準差；混用不同群體會讓 Z 與 T 失去意義。',
        ],
        link: {
          prefix: '可先用',
          label: '標準差計算器核對母體與樣本標準差',
          href: '/tools/standard-deviation/',
          suffix: '，再把算出的 Z 分數帶回本頁。',
        },
      },
      {
        heading: 'T 分數、排名百分比與完整教學指南',
        paragraphs: [
          'T 分數保留標準差單位，排名百分比則從名次與群體人數估計相對位置；在沒有完整分布或常態假設不合理時，兩者不能直接互換。',
        ],
        link: {
          prefix: '需要從原始分數一路檢查公式與限制時，請閱讀',
          label: 'T 分數計算完整指南',
          href: '/guides/t-score-calculator-guide/',
          suffix: '；只有班級名次時則使用排名百分比計算器。',
        },
      },
    ],
    zhSources: [
      {
        label: 'NCES：ECLS-K 標準化 T 分數說明',
        href: 'https://nces.ed.gov/pubs2002/kindergarten/21.asp?nav=4',
        note: '美國教育統計中心以平均 50、標準差 10 的 T 分數作為常模參照量尺範例，並說明結果取決於分析所用群體。',
      },
      {
        label: 'ETS Standards for Quality and Fairness：Norm Group 與 Normative Scale',
        href: 'https://www.ets.org/pdfs/about/standards-quality-fairness.pdf',
        note: '說明常模量尺必須交代參照群體；本頁因此不把不同群體的 T 分數視為可直接比較。',
      },
    ],
    enContentSections: [
      {
        heading: 'What a T score means',
        paragraphs: [
          'A T score is a standard score created by linearly transforming a z score. The common scale uses a mean of 50 and a standard deviation of 10, so it keeps the relative-position meaning of z while using easier numbers.',
          'The formula is T = 50 + 10 × z. A z score of 0 becomes T = 50, z = 1 becomes T = 60, and z = -1 becomes T = 40.',
          'Students and teachers may see T scores in educational tests, psychology reports, standardized score tables, and teacher-exam preparation. Always confirm the relevant norm group, direction, and conversion rule from the test manual or official notice.',
        ],
        items: [
          'Example: if a raw score is 82, the reference mean is 70, and the standard deviation is 10, then z = (82 − 70) / 10 = 1.2.',
          'Using T = 50 + 10 × 1.2 gives T = 62, meaning the score is 1.2 standard deviations above that reference-group mean.',
        ],
      },
    ],
    zhFaq: [
      { q: 'T 分數是什麼？', a: 'T 分數是由 Z 分數轉換而來的標準分數，常見量尺平均數為 50、標準差為 10。它用來描述某個分數在參照群體中的相對位置，而不是原始得分。' },
      { q: 'T 分數 50 代表什麼？', a: '在 T = 50 + 10z 的量尺下，T 分數 50 代表 z = 0，也就是剛好等於參照群體平均數。高於 50 通常表示高於平均，低於 50 通常表示低於平均。' },
      { q: 'T 分數越高越好嗎？', a: '不一定，要看測驗或指標定義。有些測驗高分代表能力或表現較高，但也有量表高分代表症狀、風險或需求較高，解讀時要看測驗說明。' },
      { q: 'T 分數是滿分 100 或百分比嗎？', a: '不是。T 分數是標準分數量尺，不是百分制成績，也不是答對百分比。T 分數可能高於 100 或低於 0，只是一般常見資料不一定會出現這麼極端的值。' },
      { q: '沒有 Z 分數可以算 T 分數嗎？', a: '若只有原始分數，必須先知道同一參照群體的平均數與標準差，先算 z = (X − M) / SD。沒有平均數、標準差或常模來源時，無法正確換算 T 分數。' },
      { q: 'T 分數和 PR 百分等級可以直接換算嗎？', a: '一般不能直接換算，因為 PR 需要知道分數在參照群體中的累積位置。若假設常態分配且常模相同，可以用統計表或軟體估算近似 PR，但正式報告仍應使用原始常模或官方轉換表。' },
    ],
    enFaq: [
      { q: 'What is a T score?', a: 'A T score is a standard score converted from a z score, commonly using a mean of 50 and a standard deviation of 10. It describes relative position within a reference group, not the raw score itself.' },
      { q: 'What does T = 50 mean?', a: 'With T = 50 + 10z, T = 50 means z = 0. The score is exactly at the reference-group mean on that scale.' },
      { q: 'Is a higher T score always better?', a: 'Not always. In some tests a higher T score means higher performance, while in other scales it can mean higher symptoms, risk, or need, so the test definition matters.' },
      { q: 'Is a T score a percentage or a score out of 100?', a: 'No. A T score is a standard-score scale, not percent correct or a 0 to 100 grade. It can theoretically go above 100 or below 0 for extreme z scores.' },
      { q: 'Can I calculate T without a z score?', a: 'If you only have a raw score, you first need the matching reference mean and standard deviation to calculate z = (X − M) / SD. Without the mean, SD, or norm source, the T score cannot be calculated correctly.' },
      { q: 'Can T score and percentile rank be converted directly?', a: 'Usually not directly, because percentile rank depends on the cumulative position in a reference distribution. Under a normal-distribution assumption with the same norm group, an approximate percentile can be estimated, but formal reports should use the official norm table.' },
    ],
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
    zhQuickAnswer: 'Z 分數 = (原始分數 − 平均數) / 標準差；例如班級平均 70、標準差 10、個人 82 分，z = 1.2，表示高於平均 1.2 個標準差。',
    enQuickAnswer: 'Z score = (raw score − mean) / standard deviation; for example, with mean 70, SD 10, and score 82, z = 1.2, meaning the score is 1.2 standard deviations above the mean.',
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

interface PrecheckSpec {
  slug: string;
  zhName: string;
  enName: string;
  zhWho: string;
  enWho: string;
  zhExamples: string[];
  enExamples: string[];
  zhMistakes: string[];
  enMistakes: string[];
  zhLimitations: string[];
  enLimitations: string[];
  zhAdditionalSections?: NonNullable<ToolContent['contentSections']>;
  enAdditionalSections?: NonNullable<ToolContent['contentSections']>;
  zhFaq: ToolContent['faq'];
  enFaq: ToolContent['faq'];
}

function precheckEnhancement(spec: PrecheckSpec): Record<Locale, Enhancement> {
  return {
    zh: {
      audience: [spec.zhWho],
      contentSections: [
        { heading: '適合誰使用', paragraphs: [spec.zhWho] },
        {
          heading: '常見錯誤',
          paragraphs: [`使用 ${spec.zhName} 前，先確認輸入資料與目標情境一致。下列錯誤容易讓結果看起來可用，實際卻不符合你的任務。`],
          items: spec.zhMistakes,
        },
        {
          heading: '使用限制',
          paragraphs: [`${spec.zhName} 是瀏覽器內的輔助工具，適合快速整理、檢查或產生初稿。重要輸出仍應保留原始資料並做人工確認。`],
          items: spec.zhLimitations,
        },
        ...(spec.zhAdditionalSections ?? []),
      ],
      caseStudies: spec.zhExamples.map((description, index) => ({
        title: `實例 ${index + 1}`,
        description,
      })),
      notes: [...spec.zhMistakes, ...spec.zhLimitations],
      faq: spec.zhFaq,
    },
    en: {
      audience: [spec.enWho],
      contentSections: [
        { heading: 'Who this tool is for', paragraphs: [spec.enWho] },
        {
          heading: 'Common mistakes',
          paragraphs: [`Before using ${spec.enName}, check that the inputs and destination workflow match. These issues can make an output look useful while still being wrong for the real task.`],
          items: spec.enMistakes,
        },
        {
          heading: 'Limitations',
          paragraphs: [`${spec.enName} is a browser-based helper for quick preparation, cleanup, or checking. Keep the original material and review important output before using it in a formal workflow.`],
          items: spec.enLimitations,
        },
        ...(spec.enAdditionalSections ?? []),
      ],
      caseStudies: spec.enExamples.map((description, index) => ({
        title: `Example ${index + 1}`,
        description,
      })),
      notes: [...spec.enMistakes, ...spec.enLimitations],
      faq: spec.enFaq,
    },
  };
}

const adsensePrecheckSpecs: PrecheckSpec[] = [
  {
    slug: 'random-number-picker',
    zhName: '隨機數字產生器',
    enName: 'Random Number Picker',
    zhWho: '適合抽籤、課堂示範、低風險排序、活動分組與快速產生測試數字的人。',
    enWho: 'Useful for simple draws, classroom demos, low-stakes ordering, activity setup, and quick test numbers.',
    zhExamples: ['活動主持人在 1 到 50 之間抽出下一位分享者。', '老師用 1 到 6 的範圍示範隨機結果不會每次平均。', '測試表單流程時快速產生一組非正式編號。'],
    enExamples: ['A facilitator draws a number from 1 to 50 to pick the next speaker.', 'A teacher uses 1 to 6 to show that short random runs are not always balanced.', 'A tester generates temporary numbers for a form workflow.'],
    zhMistakes: ['不要用於有金錢價值或受監管的抽選。', '不要把單次結果當成統計證明。', '不要忘記先確認上下限與是否允許重複。'],
    enMistakes: ['Do not use it for money-value or regulated drawings.', 'Do not treat one draw as statistical proof.', 'Do not forget to confirm the min, max, and duplicate rule.'],
    zhLimitations: ['瀏覽器隨機適合一般用途，不是公證或加密抽選。', '不保存可稽核的抽選紀錄。', '結果品質取決於你設定的範圍與規則。'],
    enLimitations: ['Browser randomness is for everyday use, not notarized or cryptographic draws.', 'It does not keep an audit-grade draw record.', 'Output quality depends on your range and rules.'],
    zhFaq: [
      { q: '可以設定最小與最大值嗎？', a: '可以，請先確認上下限再抽取。' },
      { q: '可以避免重複嗎？', a: '若頁面提供不重複選項，可依需求開啟。' },
      { q: '適合正式抽獎嗎？', a: '不適合。正式抽獎請使用可稽核流程與完整規則。' },
      { q: '結果會保存嗎？', a: '不會長期保存，重要結果請自行紀錄。' },
      { q: '資料會上傳嗎？', a: '不會，抽取在瀏覽器內完成。' },
    ],
    enFaq: [
      { q: 'Can I set the minimum and maximum?', a: 'Yes. Check both limits before drawing.' },
      { q: 'Can duplicates be avoided?', a: 'Use the no-repeat option when the page provides it.' },
      { q: 'Is this for official prize drawings?', a: 'No. Use an auditable process and complete rules for formal drawings.' },
      { q: 'Are results saved?', a: 'No. Record important results yourself.' },
      { q: 'Is data uploaded?', a: 'No. Picking happens in the browser.' },
    ],
  },
  {
    slug: 'word-counter',
    zhName: '字數統計工具',
    enName: 'Word Counter',
    zhWho: '適合整理文章、作業、社群貼文、SEO 摘要、簡報講稿與貼上的草稿文字。',
    enWho: 'Useful for drafts, assignments, social posts, SEO snippets, presentation notes, and pasted text cleanup.',
    zhExamples: ['確認 meta description 是否接近建議長度。', '在交稿前檢查文章字數與段落數。', '把英文與中文混合草稿貼入後估算閱讀時間。'],
    enExamples: ['Check whether a meta description is near the desired length.', 'Review word and paragraph count before submitting a draft.', 'Paste mixed English and Chinese text to estimate reading time.'],
    zhMistakes: ['不要把不同平台限制視為永久不變。', '不要假設所有語言都用同一種字數規則。', '不要把閱讀時間當成精準承諾。'],
    enMistakes: ['Do not assume platform limits never change.', 'Do not assume every language uses the same word-count rules.', 'Do not treat reading time as an exact promise.'],
    zhLimitations: ['中英混合文字只能用一般規則估算。', '不會檢查文法、事實或語氣。', '平台實際截斷規則可能不同。'],
    enLimitations: ['Mixed-language text is estimated with general rules.', 'It does not check grammar, facts, or tone.', 'Real platform truncation rules may differ.'],
    zhFaq: [
      { q: '中文怎麼計算？', a: '中文與 CJK 字元通常逐字計算，英文則以詞彙 token 估算。' },
      { q: '閱讀時間準確嗎？', a: '只是估算，實際速度會因內容難度與讀者而不同。' },
      { q: '會保存文字嗎？', a: '不會，文字在瀏覽器中處理。' },
      { q: '能檢查 SEO 品質嗎？', a: '不能，只能提供長度與基本統計。' },
      { q: '適合機密內容嗎？', a: '工具本身不主動上傳，但高敏感內容仍建議避免貼入任何線上工具。' },
    ],
    enFaq: [
      { q: 'How is Chinese counted?', a: 'CJK characters are usually counted character by character, while English is estimated by word tokens.' },
      { q: 'Is reading time exact?', a: 'No. It depends on reader speed and text complexity.' },
      { q: 'Is text saved?', a: 'No. Text is processed in the browser.' },
      { q: 'Does it judge SEO quality?', a: 'No. It only reports length and basic statistics.' },
      { q: 'Is it for confidential text?', a: 'The tool does not actively upload text, but highly sensitive content should stay out of online tools.' },
    ],
  },
  {
    slug: 'random-name-picker',
    zhName: '隨機抽名字',
    enName: 'Random Name Picker',
    zhWho: '適合課堂點名、會議輪流發言、活動互動與低風險名單抽取。',
    enWho: 'Useful for classroom participation, meeting turns, activity prompts, and low-stakes list picking.',
    zhExamples: ['老師從學生名單抽下一位回答問題。', '團隊從志願名單中選下一位分享者。', '主持人在破冰活動中隨機選一個名字。'],
    enExamples: ['A teacher picks the next student from a class list.', 'A team selects the next speaker from a volunteer list.', 'A host chooses a name for an icebreaker prompt.'],
    zhMistakes: ['不要在未清理名單時抽取。', '不要把日常抽取用於正式獎項或爭議結果。', '不要忘記處理重複姓名或空白行。'],
    enMistakes: ['Do not pick from an uncleaned list.', 'Do not use everyday picking for formal prizes or disputed outcomes.', 'Do not forget duplicate names or blank lines.'],
    zhLimitations: ['不驗證名單資格。', '不保存完整可稽核紀錄。', '同名者需要你自行加註識別資訊。'],
    enLimitations: ['It does not verify list eligibility.', 'It does not keep a complete audit trail.', 'People with the same name need extra labels from you.'],
    zhFaq: [
      { q: '名單會上傳嗎？', a: '不會，名單在瀏覽器中處理。' },
      { q: '可以避免重複抽到嗎？', a: '若頁面提供抽後移除或不重複選項，可依需求使用。' },
      { q: '同名怎麼處理？', a: '建議加上座號、部門或簡短識別。' },
      { q: '適合正式抽獎嗎？', a: '不適合，正式抽獎需可稽核紀錄與規則。' },
      { q: '可以貼很多名字嗎？', a: '可以，但非常大的名單可能受裝置效能影響。' },
    ],
    enFaq: [
      { q: 'Is the list uploaded?', a: 'No. It is handled in the browser.' },
      { q: 'Can repeat picks be avoided?', a: 'Use remove-after-pick or no-repeat options when available.' },
      { q: 'What about duplicate names?', a: 'Add a seat number, team, or short identifier.' },
      { q: 'Is it for formal raffles?', a: 'No. Formal raffles need auditable records and rules.' },
      { q: 'Can I paste many names?', a: 'Yes, though very large lists may depend on device performance.' },
    ],
  },
  {
    slug: 'random-group-generator',
    zhName: '隨機分組工具',
    enName: 'Random Group Generator',
    zhWho: '適合課堂活動、工作坊、讀書會、團隊練習與低風險活動分組。',
    enWho: 'Useful for classroom activities, workshops, study groups, team exercises, and low-stakes grouping.',
    zhExamples: ['老師把 32 位學生分成 8 組。', '工作坊主持人把參加者分成討論小組。', '讀書會把成員隨機分配到不同書目主題。'],
    enExamples: ['A teacher splits 32 students into eight groups.', 'A workshop host creates discussion groups.', 'A study group assigns members to topic teams.'],
    zhMistakes: ['不要忘記先移除缺席者。', '不要把隨機分組當成能力均衡分班。', '不要忽略必須分開或必須同組的限制。'],
    enMistakes: ['Do not forget to remove absent people first.', 'Do not treat random grouping as ability-balanced placement.', 'Do not ignore must-separate or must-keep-together constraints.'],
    zhLimitations: ['不會自動判斷能力、語言、職務或衝突關係。', '不保存長期分組歷史。', '正式分班或人事安排需人工審核。'],
    enLimitations: ['It does not evaluate ability, language, role, or relationship constraints.', 'It does not save long-term grouping history.', 'Formal placement or staffing needs human review.'],
    zhFaq: [
      { q: '可以依組數分組嗎？', a: '可以，依頁面選項設定組數或每組人數。' },
      { q: '名單會上傳嗎？', a: '不會，分組在瀏覽器中處理。' },
      { q: '可以保證公平嗎？', a: '不能，只能隨機分配；公平仍取決於名單與規則。' },
      { q: '可以固定某些人同組嗎？', a: '若需要複雜限制，建議先手動調整名單或分組結果。' },
      { q: '結果會保存嗎？', a: '不會，請自行複製需要的分組。' },
    ],
    enFaq: [
      { q: 'Can I group by number of groups?', a: 'Yes. Use group count or group size options as provided.' },
      { q: 'Is the list uploaded?', a: 'No. Grouping happens in the browser.' },
      { q: 'Does it guarantee fairness?', a: 'No. It randomizes; fairness still depends on your list and rules.' },
      { q: 'Can some people stay together?', a: 'For complex constraints, adjust the list or output manually.' },
      { q: 'Are results saved?', a: 'No. Copy the groups you need.' },
    ],
  },
  {
    slug: 'random-wheel',
    zhName: '隨機轉盤',
    enName: 'Random Wheel',
    zhWho: '適合活動互動、課堂題目、餐點選擇、破冰遊戲與低風險候選清單。',
    enWho: 'Useful for event interaction, classroom prompts, meal choices, icebreakers, and low-stakes option lists.',
    zhExamples: ['活動主持人把破冰任務放進轉盤。', '老師用轉盤選下一個題目。', '朋友把晚餐選項貼入後快速決定。'],
    enExamples: ['A host puts icebreaker tasks on the wheel.', 'A teacher chooses the next prompt.', 'Friends paste dinner options and decide quickly.'],
    zhMistakes: ['不要讓未確認的選項進入轉盤。', '不要把動畫結果當成可稽核抽選。', '不要用於高價值獎品或受監管抽獎。'],
    enMistakes: ['Do not include unconfirmed options.', 'Do not treat the animation as an auditable draw.', 'Do not use it for high-value prizes or regulated raffles.'],
    zhLimitations: ['轉盤偏向互動展示，不是正式抽選系統。', '不保留完整審計紀錄。', '清單品質與結果可用性由使用者負責。'],
    enLimitations: ['The wheel is for interaction, not formal drawing systems.', 'It does not keep a full audit record.', 'List quality and output usefulness are the user’s responsibility.'],
    zhFaq: [
      { q: '可以貼自訂選項嗎？', a: '可以，請一行一個選項。' },
      { q: '結果會保存嗎？', a: '不會，重要結果請自行紀錄。' },
      { q: '可以用於抽獎嗎？', a: '不建議用於高價值或受監管抽獎。' },
      { q: '可以移除抽中的選項嗎？', a: '若頁面提供移除選項，可依活動規則使用。' },
      { q: '資料會上傳嗎？', a: '不會，清單在瀏覽器中處理。' },
    ],
    enFaq: [
      { q: 'Can I paste custom options?', a: 'Yes. Put one option on each line.' },
      { q: 'Are results saved?', a: 'No. Record important outcomes yourself.' },
      { q: 'Can I use it for prize draws?', a: 'Not for high-value or regulated raffles.' },
      { q: 'Can selected options be removed?', a: 'Use the remove option if the page provides it and it matches your rule.' },
      { q: 'Is data uploaded?', a: 'No. The list is processed in the browser.' },
    ],
  },
  {
    slug: 'what-to-eat',
    zhName: '今天吃什麼',
    enName: 'What Should I Eat',
    zhWho: '適合在低風險日常情境中快速縮小餐點選擇，包含午餐、晚餐、聚會和外送。',
    enWho: 'Useful for narrowing low-stakes meal choices for lunch, dinner, gatherings, and delivery orders.',
    zhExamples: ['同事在午餐前從附近餐點清單抽一個。', '朋友把外送選項貼入後快速決定。', '家庭把晚餐類型放進清單避免來回討論。'],
    enExamples: ['Coworkers pick from nearby lunch options.', 'Friends paste delivery choices and decide quickly.', 'A family lists dinner styles to reduce back-and-forth discussion.'],
    zhMistakes: ['不要忽略過敏、飲食限制或宗教禁忌。', '不要把隨機結果當成營養建議。', '不要把已關店或無法外送的餐點留在清單。'],
    enMistakes: ['Do not ignore allergies, dietary restrictions, or religious limits.', 'Do not treat a random pick as nutrition advice.', 'Do not keep closed or unavailable restaurants in the list.'],
    zhLimitations: ['工具不提供醫療、營養或餐廳品質保證。', '不會檢查營業時間、價格或外送範圍。', '結果只適合日常參考。'],
    enLimitations: ['The tool does not provide medical, nutrition, or restaurant-quality guarantees.', 'It does not check hours, prices, or delivery zones.', 'Results are for everyday reference only.'],
    zhFaq: [
      { q: '可以加入自己的餐點嗎？', a: '可以，把餐點逐行輸入或貼上。' },
      { q: '會考慮過敏嗎？', a: '不會，請先自行排除不適合的選項。' },
      { q: '是營養建議嗎？', a: '不是，健康或飲食需求請諮詢專業人士。' },
      { q: '結果會保存嗎？', a: '不會長期保存。' },
      { q: '資料會上傳嗎？', a: '不會，選擇在瀏覽器中處理。' },
    ],
    enFaq: [
      { q: 'Can I add my own meals?', a: 'Yes. Enter or paste one option per line.' },
      { q: 'Does it consider allergies?', a: 'No. Remove unsuitable options yourself first.' },
      { q: 'Is this nutrition advice?', a: 'No. Ask a qualified professional for health or diet needs.' },
      { q: 'Are results saved?', a: 'No long-term history is saved.' },
      { q: 'Is data uploaded?', a: 'No. Selection happens in the browser.' },
    ],
  },
  {
    slug: 'character-counter',
    zhName: '字元計數器',
    enName: 'Character Counter',
    zhWho: '適合檢查社群貼文、簡訊、SEO 標題、meta description、表單欄位與產品文案長度。',
    enWho: 'Useful for checking social posts, SMS text, SEO titles, meta descriptions, form fields, and product copy length.',
    zhExamples: ['檢查 meta description 是否過長。', '在發送簡訊前確認字元數。', '把產品標題貼入後比較平台限制。'],
    enExamples: ['Check whether a meta description is too long.', 'Confirm SMS length before sending.', 'Paste a product title and compare it with platform limits.'],
    zhMistakes: ['不要把常見限制當成所有平台的最新規則。', '不要忽略 emoji 與多位元組字元。', '不要只看字元數而不檢查可讀性。'],
    enMistakes: ['Do not treat common limits as the latest rule for every platform.', 'Do not ignore emoji and multibyte characters.', 'Do not check length without reviewing readability.'],
    zhLimitations: ['平台規則可能改變。', 'UTF-8 位元組與顯示寬度不是同一件事。', '不會檢查文案品質或政策合規。'],
    enLimitations: ['Platform rules can change.', 'UTF-8 bytes and visual width are not the same.', 'It does not check copy quality or policy compliance.'],
    zhFaq: [
      { q: '字元和字數有什麼不同？', a: '字元是每個符號或文字單位，字數通常以詞或 CJK 字元估算。' },
      { q: 'emoji 會怎麼算？', a: '不同平台可能不同，本工具提供一般字元與位元組參考。' },
      { q: 'Meta description 有固定上限嗎？', a: '沒有絕對保證，顯示長度會因查詢與裝置而變化。' },
      { q: '文字會上傳嗎？', a: '不會，文字在瀏覽器中處理。' },
      { q: '可以用來保證平台通過嗎？', a: '不能，仍需依平台最新規則與實際預覽確認。' },
    ],
    enFaq: [
      { q: 'How are characters different from words?', a: 'Characters count each symbol or text unit; words are estimated by tokens or CJK characters.' },
      { q: 'How are emoji counted?', a: 'Platforms differ, so this tool provides general character and byte references.' },
      { q: 'Is there a fixed meta description limit?', a: 'No. Display length varies by query and device.' },
      { q: 'Is text uploaded?', a: 'No. Text is processed in the browser.' },
      { q: 'Does this guarantee platform acceptance?', a: 'No. Check the latest platform rules and previews.' },
    ],
  },
  {
    slug: 'pomodoro-timer',
    zhName: '番茄鐘',
    enName: 'Pomodoro Timer',
    zhWho: '適合需要把寫作、讀書、整理表格、行政雜務或練習題拆成短時段的人。',
    enWho: 'Useful for writers, students, office workers, and makers who want to split focused work into short, visible sessions.',
    zhExamples: ['編輯用一段專注時間整理一節文章草稿。', '學生讀完一個小章節後離開螢幕休息。', '上班族用 15 分鐘清完一批信件或發票。'],
    enExamples: ['An editor uses one focus block to revise a draft section.', 'A student studies one chapter segment and then takes a screen break.', 'An office worker uses 15-minute blocks for email and invoice cleanup.'],
    zhMistakes: ['不要把 25 分鐘當成硬性規則。', '不要在每次休息時繼續看同一個工作螢幕。', '不要把完成次數當成工作品質保證。'],
    enMistakes: ['Do not treat 25 minutes as a mandatory rule.', 'Do not spend every break staring at the same work screen.', 'Do not treat completed sessions as proof of work quality.'],
    zhLimitations: ['工具不會同步到其他裝置。', '關閉分頁後不保留長期歷史。', '不能取代睡眠、健康或工作負荷相關的專業建議。'],
    enLimitations: ['The timer does not sync across devices.', 'Closing the tab does not preserve long-term history.', 'It does not replace health, sleep, or workload advice.'],
    zhFaq: [
      { q: '一定要使用 25 分鐘嗎？', a: '不需要。25 分鐘只是常見起點，可依任務難度與注意力狀態調整。' },
      { q: '完成次數會永久保存嗎？', a: '不會。若要長期追蹤，請把任務與完成次數記到自己的筆記或表格。' },
      { q: '番茄鐘適合會議嗎？', a: '不一定。需要即時回應或頻繁中斷的工作，不一定適合固定專注區塊。' },
      { q: '休息時該做什麼？', a: '建議離開同一個螢幕、補水、伸展或短暫走動。' },
      { q: '資料會上傳嗎？', a: '不會。時間設定主要留在你的瀏覽器本機。' },
    ],
    enFaq: [
      { q: 'Do I have to use 25 minutes?', a: 'No. It is only a common starting point. Adjust the block length to the task and your attention span.' },
      { q: 'Are completed sessions stored forever?', a: 'No. Keep your own note or spreadsheet if long-term tracking matters.' },
      { q: 'Is this good for meetings?', a: 'Not always. Interrupt-driven work may not fit fixed focus blocks.' },
      { q: 'What should I do during breaks?', a: 'Step away from the same screen, stretch, hydrate, or briefly walk.' },
      { q: 'Is data uploaded?', a: 'No. Timer settings stay mainly in your local browser.' },
    ],
  },
  {
    slug: 'dice-roller',
    zhName: '擲骰工具',
    enName: 'Dice Roller',
    zhWho: '適合桌遊、課堂示範、機率教學、破冰活動與快速日常決策。',
    enWho: 'Useful for tabletop games, classroom probability demos, icebreakers, and low-stakes everyday decisions.',
    zhExamples: ['桌遊主持人快速擲 d20 判定回合結果。', '老師用 d6 示範機率分布不會每次平均。', '活動主持人用骰子選下一個破冰任務。'],
    enExamples: ['A game host rolls d20 for a turn outcome.', 'A teacher rolls d6 repeatedly to show distribution variance.', 'A facilitator uses dice to choose the next icebreaker prompt.'],
    zhMistakes: ['不要把少量擲骰結果視為長期期望值。', '不要用它處理賭博或受監管抽選。', '不要在需要可稽核紀錄時只靠畫面結果。'],
    enMistakes: ['Do not treat a few rolls as the long-run expected distribution.', 'Do not use it for gambling or regulated drawings.', 'Do not rely only on the screen when an audit trail is required.'],
    zhLimitations: ['結果由瀏覽器產生，非加密或公證流程。', '工具不保存完整歷史紀錄。', '實體遊戲規則仍需由使用者確認。'],
    enLimitations: ['Results come from browser randomness, not a cryptographic or notarized process.', 'The tool does not keep a complete permanent roll history.', 'Game-specific rules remain the user’s responsibility.'],
    zhFaq: [
      { q: '可以選不同骰子嗎？', a: '可以，依頁面提供的骰子種類選擇後再擲骰。' },
      { q: '結果公平嗎？', a: '適合一般用途，但不是可稽核或加密等級的隨機系統。' },
      { q: '可以拿來賭博嗎？', a: '不建議，也不適合任何受監管或有金錢風險的用途。' },
      { q: '會保存紀錄嗎？', a: '不會長期保存，重要結果請自行記錄。' },
      { q: '資料會上傳嗎？', a: '不會。擲骰在瀏覽器內完成。' },
    ],
    enFaq: [
      { q: 'Can I choose different dice?', a: 'Yes. Select the available dice type before rolling.' },
      { q: 'Is it fair?', a: 'It is suitable for everyday use, but it is not an audited or cryptographic random system.' },
      { q: 'Can I use it for gambling?', a: 'No. It is not intended for regulated or money-risk uses.' },
      { q: 'Are rolls saved?', a: 'Not permanently. Record important outcomes yourself.' },
      { q: 'Is data uploaded?', a: 'No. Rolling happens in the browser.' },
    ],
  },
  {
    slug: 'password-generator',
    zhName: '密碼產生器',
    enName: 'Password Generator',
    zhWho: '適合需要為新帳號、測試帳號、Wi-Fi 或一次性分享建立獨特密碼的人。',
    enWho: 'Useful for creating unique passwords for new accounts, test accounts, Wi-Fi sharing, and temporary access.',
    zhExamples: ['為新網站帳號產生 20 字元密碼。', '為活動 Wi-Fi 建立較容易唸出的臨時密碼。', '測試系統註冊流程時產生假密碼。'],
    enExamples: ['Create a 20-character password for a new account.', 'Generate a readable temporary Wi-Fi password for an event.', 'Create fake passwords while testing a signup flow.'],
    zhMistakes: ['不要在多個帳號重複使用同一組密碼。', '不要把產生結果貼到不可信的聊天或文件。', '不要只依強度標籤判斷帳號安全。'],
    enMistakes: ['Do not reuse the same password across accounts.', 'Do not paste generated passwords into untrusted chats or documents.', 'Do not treat the strength label as a full security audit.'],
    zhLimitations: ['工具不保存密碼，也無法幫你找回。', '密碼管理、雙因素驗證與帳號復原仍需另外設定。', '若裝置已被監控，本機產生也無法保證安全。'],
    enLimitations: ['The tool does not save or recover passwords.', 'Password managers, two-factor authentication, and recovery settings are separate tasks.', 'Local generation cannot protect a compromised device.'],
    zhFaq: [
      { q: '密碼會上傳嗎？', a: '不會。產生過程在瀏覽器內完成。' },
      { q: '為什麼要排除 O0l1I？', a: '這些字元在部分字型或口頭傳達時容易混淆。' },
      { q: '密碼會被保存嗎？', a: '不會。請存到你信任的密碼管理器。' },
      { q: '越長一定越安全嗎？', a: '長度很重要，但帳號安全也取決於是否重複使用、是否開啟雙因素驗證與裝置安全。' },
      { q: '可以用於正式公司密碼政策嗎？', a: '請先確認公司的字元、長度、保存與輪替政策。' },
    ],
    enFaq: [
      { q: 'Is the password uploaded?', a: 'No. Generation runs in the browser.' },
      { q: 'Why exclude O0l1I?', a: 'Those characters can be confused in some fonts or when spoken aloud.' },
      { q: 'Is the password stored?', a: 'No. Save it in a password manager you trust.' },
      { q: 'Is longer always safer?', a: 'Length helps, but account safety also depends on reuse, two-factor authentication, and device security.' },
      { q: 'Can I use this for a company policy?', a: 'Check the company’s length, character, storage, and rotation requirements first.' },
    ],
  },
  {
    slug: 'color-generator',
    zhName: '隨機顏色產生器',
    enName: 'Random Color Generator',
    zhWho: '適合需要快速取得色票靈感、測試 UI 狀態、簡報配色或社群圖片草稿的人。',
    enWho: 'Useful for quick color inspiration, UI state testing, slide drafts, and social graphic mockups.',
    zhExamples: ['為按鈕 hover 狀態找一個測試色。', '替簡報先產生一組草稿色票。', '複製 HEX 值到 CSS 或設計工具。'],
    enExamples: ['Find a test color for a button hover state.', 'Generate a rough palette for a slide deck.', 'Copy a HEX value into CSS or a design tool.'],
    zhMistakes: ['不要直接把隨機色票當成品牌系統。', '不要忽略文字對比與可讀性。', '不要假設螢幕色彩與印刷色完全一致。'],
    enMistakes: ['Do not treat random colors as a finished brand system.', 'Do not ignore text contrast and readability.', 'Do not assume screen colors match print exactly.'],
    zhLimitations: ['工具不會自動檢查 WCAG 對比。', '調色盤是靈感，不是設計規範。', '顏色在不同螢幕上可能看起來不同。'],
    enLimitations: ['The tool does not automatically verify WCAG contrast.', 'The palette is inspiration, not a design standard.', 'Colors can look different across displays.'],
    zhFaq: [
      { q: 'HEX、RGB、HSL 哪個適合網頁？', a: '三者都可用於網頁，HEX 最常見，HSL 較方便調整明度與飽和度。' },
      { q: '能保證色彩無障礙嗎？', a: '不能。正式介面仍要做對比檢查。' },
      { q: '可以商用嗎？', a: '顏色數值本身可自由使用，但品牌與素材仍需自行確認權利。' },
      { q: '會保存色票嗎？', a: '不會，請自行複製需要的色碼。' },
      { q: '調色盤有設計邏輯嗎？', a: '它是隨機靈感，不是自動和諧配色系統。' },
    ],
    enFaq: [
      { q: 'Which format should I use on the web?', a: 'HEX, RGB, and HSL all work; HEX is common, while HSL is convenient for lightness and saturation edits.' },
      { q: 'Does it guarantee accessibility?', a: 'No. Run contrast checks for production UI.' },
      { q: 'Can I use the color commercially?', a: 'Color values are fine to use, but check rights for any surrounding brand or asset work.' },
      { q: 'Are palettes saved?', a: 'No. Copy the values you need.' },
      { q: 'Is the palette harmonized?', a: 'No. It is random inspiration, not a color-system generator.' },
    ],
  },
  {
    slug: 'this-or-that',
    zhName: '二選一工具',
    enName: 'This or That',
    zhWho: '適合低風險日常選擇，例如午餐、活動順序、草稿版本或破冰題目。',
    enWho: 'Useful for low-stakes everyday choices such as lunch options, activity order, draft variants, or icebreaker prompts.',
    zhExamples: ['朋友在兩家餐廳之間快速決定。', '團隊從兩個會議破冰題目中選一個。', '創作者比較兩個標題草稿後抽一個先測。'],
    enExamples: ['Friends choose between two restaurants.', 'A team picks one of two meeting icebreakers.', 'A creator selects one headline draft to test first.'],
    zhMistakes: ['不要用於高風險財務、醫療或法律決策。', '不要把輸入不完整的選項拿來抽。', '不要把隨機結果當成偏好調查。'],
    enMistakes: ['Do not use it for high-stakes financial, medical, or legal decisions.', 'Do not draw between incomplete options.', 'Do not treat a random result as a preference survey.'],
    zhLimitations: ['只支援兩個選項。', '不會保存歷史結果。', '不能替你評估選項品質或後果。'],
    enLimitations: ['Only two options are supported.', 'History is not saved.', 'It does not evaluate option quality or consequences.'],
    zhFaq: [
      { q: '可以輸入空白選項嗎？', a: '不可以，兩個選項都要有內容。' },
      { q: '結果公平嗎？', a: '適合一般日常選擇，但不是可稽核抽選。' },
      { q: '可以反覆抽嗎？', a: '可以，但反覆抽會改變決策流程，建議先約定規則。' },
      { q: '會保存結果嗎？', a: '不會，重要結果請自行記錄。' },
      { q: '適合正式決策嗎？', a: '不適合。正式決策請使用清楚標準與人工判斷。' },
    ],
    enFaq: [
      { q: 'Can an option be blank?', a: 'No. Both options need text.' },
      { q: 'Is the result fair?', a: 'It is fine for everyday choices, but it is not an audited draw.' },
      { q: 'Can I draw repeatedly?', a: 'Yes, but agree on the rule first so repeated draws do not change the decision process.' },
      { q: 'Is the result saved?', a: 'No. Record important outcomes yourself.' },
      { q: 'Is it for formal decisions?', a: 'No. Use clear criteria and human judgment for formal decisions.' },
    ],
  },
  {
    slug: 'countdown-timer',
    zhName: '倒數計時器',
    enName: 'Countdown Timer',
    zhWho: '適合會議提醒、烹飪、活動開始、報名截止、運動間隔與短時間工作提示。',
    enWho: 'Useful for meeting reminders, cooking, event starts, registration deadlines, workouts, and short work prompts.',
    zhExamples: ['設定 10 分鐘後回到專注工作。', '倒數到直播或課程開始。', '追蹤運動組間休息時間。'],
    enExamples: ['Set a 10-minute reminder before returning to focused work.', 'Count down to a livestream or class start.', 'Track rest time between workout sets.'],
    zhMistakes: ['不要關閉分頁後期待倒數繼續提醒。', '不要把音效當成保證會響的鬧鐘。', '不要用錯時區或日期。'],
    enMistakes: ['Do not close the tab and expect the alert to continue.', 'Do not treat the beep as a guaranteed alarm.', 'Do not choose the wrong date or timezone context.'],
    zhLimitations: ['瀏覽器可能限制背景分頁與音效。', '不適合生命安全或不可錯過的警報。', '分頁關閉後狀態不會持續。'],
    enLimitations: ['Browsers can limit background tabs and audio.', 'It is not for safety-critical or must-not-miss alarms.', 'State does not continue after closing the tab.'],
    zhFaq: [
      { q: '關閉分頁後會提醒嗎？', a: '不會，請保持分頁開啟。' },
      { q: '為什麼沒有聲音？', a: '部分瀏覽器需要先互動才允許播放音效。' },
      { q: '可以倒數到明天嗎？', a: '可以，目標時間需設定在未來。' },
      { q: '適合當正式鬧鐘嗎？', a: '不建議，正式提醒請使用系統鬧鐘或行事曆。' },
      { q: '資料會上傳嗎？', a: '不會。時間設定在瀏覽器中處理。' },
    ],
    enFaq: [
      { q: 'Will it alert me after I close the tab?', a: 'No. Keep the tab open.' },
      { q: 'Why is there no sound?', a: 'Some browsers require interaction before allowing audio.' },
      { q: 'Can it count down to tomorrow?', a: 'Yes. The target time must be in the future.' },
      { q: 'Can it replace a real alarm?', a: 'No. Use a system alarm or calendar for critical reminders.' },
      { q: 'Is data uploaded?', a: 'No. Timer settings are processed in the browser.' },
    ],
  },
  {
    slug: 'stopwatch',
    zhName: '碼錶',
    enName: 'Stopwatch',
    zhWho: '適合練習計時、圈速紀錄、簡單活動測量、課堂示範與工作流程觀察。',
    enWho: 'Useful for practice timing, lap records, simple activity measurement, classroom demos, and workflow observation.',
    zhExamples: ['運動練習時記錄每圈時間。', '老師示範同一任務不同方法的耗時。', '工作者測量資料整理流程需要多久。'],
    enExamples: ['Record lap times during practice.', 'Compare how long two classroom methods take.', 'Measure how long a data cleanup workflow takes.'],
    zhMistakes: ['不要把瀏覽器碼錶當成比賽官方計時。', '不要忘記先重設再開始下一輪。', '不要只看總時間而忽略圈速差異。'],
    enMistakes: ['Do not treat a browser stopwatch as official race timing.', 'Do not forget to reset before a new run.', 'Do not inspect total time only when lap variation matters.'],
    zhLimitations: ['背景分頁與裝置休眠可能影響操作。', '不保存長期歷史。', '不適合需要專業硬體校準的計時。'],
    enLimitations: ['Background tabs and device sleep can affect use.', 'Long-term history is not saved.', 'It is not for hardware-calibrated timing needs.'],
    zhFaq: [
      { q: '可以記錄圈速嗎？', a: '可以，使用圈速功能記錄分段時間。' },
      { q: '時間很精準嗎？', a: '使用瀏覽器時間來源，適合一般用途，不是官方計時設備。' },
      { q: '會保存紀錄嗎？', a: '不會，請自行複製重要結果。' },
      { q: '可以在背景跑嗎？', a: '可能可以，但瀏覽器和裝置省電設定會影響體驗。' },
      { q: '資料會上傳嗎？', a: '不會，計時在本機分頁中處理。' },
    ],
    enFaq: [
      { q: 'Can I record laps?', a: 'Yes. Use the lap action to record split times.' },
      { q: 'Is it precise?', a: 'It uses browser timing and is fine for everyday use, not official timing.' },
      { q: 'Are records saved?', a: 'No. Copy important results yourself.' },
      { q: 'Can it run in the background?', a: 'Sometimes, but browser and device power settings can affect behavior.' },
      { q: 'Is data uploaded?', a: 'No. Timing runs in the local tab.' },
    ],
  },
  {
    slug: 'date-difference',
    zhName: '日期差距計算器',
    enName: 'Date Difference Calculator',
    zhWho: '適合安排旅程、請假、專案、活動期間、合約檢查前的日期估算。',
    enWho: 'Useful for estimating date gaps for trips, leave planning, projects, event periods, and contract review prep.',
    zhExamples: ['計算活動報名開放到截止共有幾天。', '比較旅行出發與回程日期的總天數。', '估算專案還剩幾週又幾天。'],
    enExamples: ['Count days from registration opening to closing.', 'Compare departure and return dates for a trip.', 'Estimate weeks and days remaining in a project.'],
    zhMistakes: ['不要忘記確認是否包含結束日。', '不要把約略月份當成精準曆法判定。', '不要忽略時區或當地日期規則。'],
    enMistakes: ['Do not forget whether the end date is included.', 'Do not treat approximate months as exact calendar rulings.', 'Do not ignore timezone or local date rules.'],
    zhLimitations: ['不處理法律或合約上的正式期限判定。', '不自動套用各地假日。', '日期輸入錯誤會直接影響結果。'],
    enLimitations: ['It does not determine legal or contractual deadlines.', 'It does not automatically apply local holidays.', 'Wrong date input directly changes the result.'],
    zhFaq: [
      { q: '包含結束日是什麼意思？', a: '代表把結束當天也算進總天數，適合某些請假或活動天數情境。' },
      { q: '月份結果精準嗎？', a: '月份有長短差異，請把月份結果視為輔助理解。' },
      { q: '可以算工作日嗎？', a: '若要排除週末或假日，請使用工作日計算器。' },
      { q: '適合法律期限嗎？', a: '不適合。正式期限請查原始文件或專業意見。' },
      { q: '資料會上傳嗎？', a: '不會，日期在瀏覽器中計算。' },
    ],
    enFaq: [
      { q: 'What does include end date mean?', a: 'It counts the final day in the total, which fits some leave or event-duration cases.' },
      { q: 'Are month results exact?', a: 'Months differ in length, so use month output as a helper, not a formal rule.' },
      { q: 'Can it count business days?', a: 'Use the Business Days Calculator when weekends or custom holidays matter.' },
      { q: 'Is it suitable for legal deadlines?', a: 'No. Confirm formal deadlines with source documents or qualified advice.' },
      { q: 'Is data uploaded?', a: 'No. Dates are calculated in the browser.' },
    ],
  },
  {
    slug: 'age-calculator',
    zhName: '年齡計算器',
    enName: 'Age Calculator',
    zhWho: '適合生日提醒、活動資格初步確認、個人里程碑、表單前自我檢查。',
    enWho: 'Useful for birthday reminders, preliminary eligibility checks, personal milestones, and form-prep checks.',
    zhExamples: ['確認活動報名者到活動日是否滿指定年齡。', '計算下一次生日還有幾天。', '查看出生日期是星期幾。'],
    enExamples: ['Check whether someone reaches an age by an event date.', 'Count days until the next birthday.', 'Find the weekday for a birth date.'],
    zhMistakes: ['不要用趣味心跳估算做健康判斷。', '不要忽略資格規則可能使用當地時間或指定日期。', '不要把錯誤生日輸入當成正式結果。'],
    enMistakes: ['Do not use playful heartbeat estimates for health decisions.', 'Do not ignore local time or rule-specific dates for eligibility.', 'Do not treat a mistyped birthday as a formal result.'],
    zhLimitations: ['不是身分、醫療或資格認證工具。', '不會驗證生日真實性。', '資格判斷仍以主辦單位規則為準。'],
    enLimitations: ['It is not an identity, medical, or eligibility certification tool.', 'It cannot verify whether a birthday is real.', 'Eligibility still depends on the organizer’s rules.'],
    zhFaq: [
      { q: '可以指定計算到哪一天嗎？', a: '可以，依頁面提供的 as-of date 設定。' },
      { q: '心跳估算能用於健康嗎？', a: '不能，這只是趣味估算。' },
      { q: '適合報名資格判定嗎？', a: '只能作初步檢查，正式資格仍看主辦規則。' },
      { q: '會保存生日嗎？', a: '不會，資料在瀏覽器內處理。' },
      { q: '閏年生日怎麼辦？', a: '請依實際使用情境與當地規則確認。' },
    ],
    enFaq: [
      { q: 'Can I choose the as-of date?', a: 'Yes. Use the as-of date control provided on the page.' },
      { q: 'Can heartbeat estimates be used for health?', a: 'No. They are playful estimates only.' },
      { q: 'Is this enough for event eligibility?', a: 'Use it as a first check only. Formal eligibility follows organizer rules.' },
      { q: 'Is the birthday saved?', a: 'No. It is processed in the browser.' },
      { q: 'What about leap-day birthdays?', a: 'Confirm the rule for your exact context and location.' },
    ],
  },
  {
    slug: 'business-days',
    zhName: '工作日計算器',
    enName: 'Business Days Calculator',
    zhWho: '適合估算交件期限、請假天數、服務時效、合約審核與專案排程。',
    enWho: 'Useful for delivery estimates, leave planning, service windows, contract review prep, and project scheduling.',
    zhExamples: ['扣除週末估算文件審核需要幾個工作日。', '貼上自訂假日後計算交件窗口。', '把工作日結果複製到專案排程。'],
    enExamples: ['Estimate document review days after excluding weekends.', 'Paste custom holidays before calculating a delivery window.', 'Copy the result into a project schedule.'],
    zhMistakes: ['不要忘記加入公司或地區假日。', '不要混用包含結束日與不包含結束日的規則。', '不要把估算結果當成法院、銀行或合約正式期限。'],
    enMistakes: ['Do not forget company or local holidays.', 'Do not mix include-end-date and exclude-end-date rules.', 'Do not treat estimates as court, bank, or contract deadline determinations.'],
    zhLimitations: ['不內建全球假日日曆。', '不判斷勞動、金融、法院或合約規則。', '自訂假日格式錯誤會造成扣除失敗。'],
    enLimitations: ['No global holiday calendar is built in.', 'It does not interpret labor, banking, court, or contract rules.', 'Bad custom-holiday formatting can prevent proper subtraction.'],
    zhFaq: [
      { q: '可以排除週末嗎？', a: '可以，依頁面選項設定。' },
      { q: '可以加入假日嗎？', a: '可以，將自訂假日用指定格式貼入。' },
      { q: '結果是正式期限嗎？', a: '不是。正式期限請依原始文件或專業意見。' },
      { q: '假日清單會上傳嗎？', a: '不會，計算在瀏覽器內完成。' },
      { q: '可以用於跨國專案嗎？', a: '可以作初步估算，但需自行加入相關地區假日。' },
    ],
    enFaq: [
      { q: 'Can weekends be excluded?', a: 'Yes. Use the page option.' },
      { q: 'Can I add holidays?', a: 'Yes. Paste custom holidays in the required format.' },
      { q: 'Is the result a formal deadline?', a: 'No. Confirm formal deadlines with source documents or qualified advice.' },
      { q: 'Is the holiday list uploaded?', a: 'No. Calculation happens in the browser.' },
      { q: 'Can I use this for international projects?', a: 'Yes for first estimates, but add the relevant local holidays yourself.' },
    ],
  },
  {
    slug: 'break-reminder',
    zhName: '休息提醒',
    enName: 'Break Reminder',
    zhWho: '適合長時間閱讀、寫作、客服、資料整理或設計工作時提醒自己短暫離開螢幕。',
    enWho: 'Useful for screen-heavy reading, writing, support, data cleanup, and design work where short breaks are easy to miss.',
    zhExamples: ['每 45 分鐘提醒自己站起來走動。', '客服排班中用溫和提示避免長時間不動。', '整理資料時設定短休息檢查眼睛與姿勢。'],
    enExamples: ['Set a reminder to stand up every 45 minutes.', 'Use gentle prompts during support shifts.', 'Take short breaks while cleaning data to check posture and eyes.'],
    zhMistakes: ['不要把提醒當成醫療建議。', '不要把提示音設成會干擾他人的環境。', '不要忽略身體不適或疼痛。'],
    enMistakes: ['Do not treat reminders as medical advice.', 'Do not use audible beeps where they disturb others.', 'Do not ignore discomfort or pain.'],
    zhLimitations: ['背景分頁或裝置休眠可能影響提醒。', '不診斷健康問題。', '不會長期保存休息紀錄。'],
    enLimitations: ['Background tabs or device sleep can affect reminders.', 'It does not diagnose health issues.', 'It does not store long-term break history.'],
    zhFaq: [
      { q: '可以關閉聲音嗎？', a: '可以，依頁面選項使用視覺提醒即可。' },
      { q: '背景分頁會提醒嗎？', a: '可能受瀏覽器限制，重要提醒請使用系統工具。' },
      { q: '適合健康問題嗎？', a: '不適合診斷或治療，身體不適請尋求專業協助。' },
      { q: '會保存紀錄嗎？', a: '不會長期保存。' },
      { q: '資料會上傳嗎？', a: '不會，提醒在目前分頁中運作。' },
    ],
    enFaq: [
      { q: 'Can sound be disabled?', a: 'Yes. Use visual reminders only if preferred.' },
      { q: 'Will it work in a background tab?', a: 'Browser limits may apply. Use a system tool for critical reminders.' },
      { q: 'Is it for health conditions?', a: 'No. Seek qualified help for discomfort, pain, or medical concerns.' },
      { q: 'Is history saved?', a: 'No long-term history is saved.' },
      { q: 'Is data uploaded?', a: 'No. It runs in the current tab.' },
    ],
  },
  {
    slug: 'case-converter',
    zhName: '英文大小寫轉換器',
    enName: 'Case Converter',
    zhWho: '適合整理英文標題、程式命名、表格欄位、檔名草稿與貼上的英文文字。',
    enWho: 'Useful for cleaning English headings, code identifiers, spreadsheet fields, filename drafts, and pasted text.',
    zhExamples: ['把欄位名稱轉成 snake_case。', '把標題草稿轉成 Title Case 後再人工修正。', '把大寫貼文改成較可讀的小寫句子。'],
    enExamples: ['Convert field names to snake_case.', 'Turn a headline draft into Title Case before manual review.', 'Convert all-caps pasted text into more readable sentence case.'],
    zhMistakes: ['不要期待它理解專有名詞大小寫。', '不要用於需要保留原始格式的程式碼區塊。', '不要把自動 Title Case 當成出版規範。'],
    enMistakes: ['Do not expect it to understand proper-noun capitalization.', 'Do not use it on code blocks where exact formatting matters.', 'Do not treat automatic Title Case as a publishing style guide.'],
    zhLimitations: ['主要處理 ASCII 英文字母。', '不會自動校正文法或拼字。', 'CJK 文字會保留原樣。'],
    enLimitations: ['It mainly transforms ASCII letters.', 'It does not fix grammar or spelling.', 'CJK text passes through unchanged.'],
    zhFaq: [
      { q: '中文會被改掉嗎？', a: '不會，中文與多數 CJK 字元會保留原樣。' },
      { q: '會修正文法嗎？', a: '不會，只處理大小寫與常見命名格式。' },
      { q: '適合程式變數嗎？', a: '可用於草稿轉換，但正式程式碼仍要人工檢查。' },
      { q: 'Title Case 完全正確嗎？', a: '不一定，不同風格指南規則不同。' },
      { q: '資料會上傳嗎？', a: '不會，文字在瀏覽器中處理。' },
    ],
    enFaq: [
      { q: 'Will Chinese text change?', a: 'No. Chinese and most CJK characters pass through unchanged.' },
      { q: 'Does it fix grammar?', a: 'No. It only changes case and identifier formats.' },
      { q: 'Can it be used for code variables?', a: 'Yes for drafts, but review production code manually.' },
      { q: 'Is Title Case always correct?', a: 'No. Style guides differ.' },
      { q: 'Is data uploaded?', a: 'No. Text is processed in the browser.' },
    ],
  },
  {
    slug: 'remove-empty-lines',
    zhName: '移除空白行',
    enName: 'Remove Empty Lines',
    zhWho: '適合整理名單、筆記、PDF 複製文字、表格貼上資料與匯入前的多行文字。',
    enWho: 'Useful for cleaning lists, notes, copied PDF text, pasted spreadsheet data, and multiline text before import.',
    zhExamples: ['把名單中多餘空行刪除後再貼到抽籤工具。', '把 PDF 複製出的段落空行壓縮成單行間距。', '匯入前確認每一筆資料都是一行。'],
    enExamples: ['Remove extra blank lines before pasting a list into a picker.', 'Collapse repeated blanks from copied PDF text.', 'Check that each record is one line before import.'],
    zhMistakes: ['不要刪掉原本有語意的段落分隔。', '不要忽略只含空白字元的行。', '不要以為它能修復 PDF 欄位順序。'],
    enMistakes: ['Do not remove paragraph breaks that carry meaning.', 'Do not overlook whitespace-only lines.', 'Do not expect it to repair PDF column order.'],
    zhLimitations: ['只處理文字行，不理解文件結構。', '不會合併斷行造成的破碎句子。', '不保存輸入內容。'],
    enLimitations: ['It processes text lines, not document structure.', 'It does not repair broken line wrapping automatically.', 'Input text is not saved.'],
    zhFaq: [
      { q: '空白字元算空白行嗎？', a: '依工具選項處理，通常可把只含空白的行視為空白行。' },
      { q: '會改變非空白文字嗎？', a: '不會，主要移除或壓縮空白行。' },
      { q: '適合整理 PDF 文字嗎？', a: '可作初步清理，但 PDF 欄位與斷行仍需人工檢查。' },
      { q: '結果會保存嗎？', a: '不會，請自行複製整理後文字。' },
      { q: '資料會上傳嗎？', a: '不會，文字在瀏覽器中處理。' },
    ],
    enFaq: [
      { q: 'Do whitespace-only lines count?', a: 'Depending on the option, lines containing only spaces can be treated as blank.' },
      { q: 'Does it change nonblank text?', a: 'No. It mainly removes or collapses blank lines.' },
      { q: 'Is it good for copied PDF text?', a: 'It helps with first cleanup, but PDF columns and wrapping still need review.' },
      { q: 'Is output saved?', a: 'No. Copy the cleaned text yourself.' },
      { q: 'Is data uploaded?', a: 'No. Text is processed in the browser.' },
    ],
  },
  {
    slug: 'image-compressor',
    zhName: '圖片壓縮工具',
    enName: 'Image Compressor',
    zhWho: '適合在上傳網站、部落格、表單、簡報或社群前降低圖片檔案大小的人。',
    enWho: 'Useful for reducing image file size before uploading to a website, blog, form, slide deck, or social post.',
    zhExamples: ['把 3 MB 商品圖壓到較適合 CMS 上傳的大小。', '為部落格縮圖測試品質與容量平衡。', '在寄送前降低多張活動照片的檔案大小。'],
    enExamples: ['Reduce a 3 MB product image before CMS upload.', 'Test quality and file size for a blog thumbnail.', 'Compress event photos before sending them.'],
    zhMistakes: ['不要反覆壓縮同一張有損圖片。', '不要把模糊原圖期待壓縮後變清楚。', '不要忽略輸出格式和透明背景需求。'],
    enMistakes: ['Do not repeatedly compress the same lossy image.', 'Do not expect a blurry source to become sharp.', 'Do not ignore output format and transparency needs.'],
    zhLimitations: ['瀏覽器記憶體會限制大型圖片。', '壓縮可能降低畫質。', '不會自動判斷平台最佳尺寸。'],
    enLimitations: ['Browser memory limits very large images.', 'Compression can reduce visual quality.', 'It does not automatically know each platform’s best dimensions.'],
    zhFaq: [
      { q: '圖片會上傳嗎？', a: '不會，壓縮在瀏覽器中處理。' },
      { q: '壓縮會變模糊嗎？', a: '可能，請比較輸出畫質與檔案大小。' },
      { q: '能處理很多張嗎？', a: '大型或多張圖片可能受裝置記憶體限制。' },
      { q: '透明背景會保留嗎？', a: '需依輸出格式確認，JPG 不支援透明。' },
      { q: '適合正式印刷嗎？', a: '不建議只靠此工具，印刷需確認解析度與色彩需求。' },
    ],
    enFaq: [
      { q: 'Is the image uploaded?', a: 'No. Compression happens in the browser.' },
      { q: 'Will compression blur the image?', a: 'It can. Compare output quality and file size.' },
      { q: 'Can it process many images?', a: 'Large or many files may be limited by device memory.' },
      { q: 'Is transparency preserved?', a: 'Check the output format. JPG does not support transparency.' },
      { q: 'Is it for print production?', a: 'Not by itself. Confirm resolution and color requirements for print.' },
    ],
  },
  {
    slug: 'qr-code-generator',
    zhName: 'QR Code 產生器',
    enName: 'QR Code Generator',
    zhWho: '適合把網址、短文字、Wi-Fi 資訊或活動連結做成可掃描 QR Code 的人。',
    enWho: 'Useful for turning URLs, short text, Wi-Fi details, or event links into a scannable QR code.',
    zhExamples: ['為活動報名表產生 QR Code 並下載 PNG。', '把 Wi-Fi 資訊轉成現場使用的掃描碼。', '替海報連結建立可測試的 QR Code。'],
    enExamples: ['Create a PNG QR code for an event signup form.', 'Turn Wi-Fi details into a scan code for guests.', 'Generate a QR code for a poster link and test it.'],
    zhMistakes: ['不要在印刷前忘記用手機實測。', '不要把過長文字塞進小尺寸 QR Code。', '不要連到尚未公開或會過期的網址。'],
    enMistakes: ['Do not print before testing with a phone.', 'Do not put very long text into a tiny QR code.', 'Do not link to unpublished or expiring URLs.'],
    zhLimitations: ['工具不會代管或縮短網址。', '掃描成功取決於尺寸、對比、紙張與鏡頭。', 'QR Code 內容一旦印出就不會自動更新。'],
    enLimitations: ['The tool does not host or shorten URLs.', 'Scan success depends on size, contrast, paper, and camera quality.', 'Printed QR code content does not update automatically.'],
    zhAdditionalSections: [
      {
        heading: 'QR Code 與一維條碼的選擇',
        paragraphs: [],
        link: {
          prefix: '若零售、庫存或物流系統只需要短商品編號或內部 ID，請使用',
          label: '條碼產生器',
          href: '/tools/barcode-generator/',
          suffix: '。',
        },
      },
    ],
    enAdditionalSections: [
      {
        heading: 'Choosing a QR code or one-dimensional barcode',
        paragraphs: [],
        link: {
          prefix: 'For a short product number or internal ID used by retail, inventory, or logistics systems, use the ',
          label: 'Barcode Generator',
          href: '/en/tools/barcode-generator/',
          suffix: '.',
        },
      },
    ],
    zhFaq: [
      { q: 'QR Code 會上傳到伺服器嗎？', a: '不會，產生過程在瀏覽器內完成。' },
      { q: '可以放 Wi-Fi 資訊嗎？', a: '可以，但請確認現場分享這些資訊是安全且允許的。' },
      { q: '印刷前要檢查什麼？', a: '請用手機掃描、確認連結、尺寸、對比和留白。' },
      { q: '可以更新已下載的 QR Code 嗎？', a: '不能，除非 QR Code 指向你可控制的轉址網址。' },
      { q: '適合機密資訊嗎？', a: '不建議，QR Code 可被任何看到的人掃描。' },
    ],
    enFaq: [
      { q: 'Is the QR code uploaded?', a: 'No. It is generated in the browser.' },
      { q: 'Can I encode Wi-Fi details?', a: 'Yes, but confirm that sharing those details is safe and allowed.' },
      { q: 'What should I check before printing?', a: 'Scan with a phone and verify the link, size, contrast, and quiet zone.' },
      { q: 'Can a downloaded QR code be updated?', a: 'No, unless it points to a redirect URL you control.' },
      { q: 'Is it for confidential information?', a: 'No. Anyone who sees the QR code may scan it.' },
    ],
  },
];

Object.assign(
  toolContentEnhancements,
  Object.fromEntries(adsensePrecheckSpecs.map((spec) => [spec.slug, precheckEnhancement(spec)])),
);
