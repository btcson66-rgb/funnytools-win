import type { ToolContent } from './_types';

export default {
  zh: {
    name: '字元計數器',
    short: '即時計算字元、UTF-8 位元組、字數、行數與常見平台長度限制。',
    long: '字元計數器適合檢查社群貼文、簡訊、推播、Meta title、Meta description、個人簡介、資料庫欄位與編輯稿。輸入文字後會即時計算含空白字元、不含空白字元、UTF-8 位元組、字數與行數，並標示 Twitter/X、SMS 與搜尋摘要常見限制。',
    seoTitle: '字元計數器｜文字長度與 UTF-8 位元組計算',
    seoDescription: '免費即時計算字元、字數、行數、UTF-8 位元組，並檢查 Twitter/X、SMS、Meta description 常見限制。',
    keywords: ['字元計數器', '字數統計', 'UTF-8 位元組', 'character counter', 'SMS 字數', 'GSM-7', 'UCS-2', 'varchar 長度'],
    capabilities: [
      "即時計算含空白字元、不含空白字元、UTF-8 位元組、字數與行數。",
      "用 Twitter/X 280、SMS 160、Meta description 160 等常見參考值做發布前提醒。",
      "協助檢查中文、emoji、換行、網址與混合語言內容是否可能超出欄位或平台限制。",
      "把統計摘要複製到審稿表、SEO QA、推播紀錄、資料匯入規格或產品需求文件。",
      "所有統計都在瀏覽器內完成，適合檢查尚未公開的草稿與內部文案。",
    ],
    contentSections: [
      {
        heading: "字元計數器和字數統計的差異",
        paragraphs: [
          "字數統計適合文章、作業、腳本和長篇草稿；字元計數器更適合有硬性欄位限制的短文案，例如 SMS、推播、Meta title、Meta description、社群 bio、廣告標題、表單欄位和資料匯入內容。",
          "這個工具同時顯示含空白字元、不含空白字元、UTF-8 位元組、字數與行數。當文案混合中文、英文、emoji、網址、換行和全形標點時，只看字數很容易低估實際長度。",
        ],
        items: [
          "字元數適合檢查平台、欄位、推播和 SEO 摘要上限",
          "UTF-8 位元組適合檢查 API、資料庫、CSV 匯入和後端驗證風險",
          "不含空白字元適合對照某些表單、考試、稿件或內部審稿規範",
          "字數仍可作為文章長度參考，但不應取代字元或位元組檢查",
        ],
      },
      {
        heading: "SMS、Unicode 和 emoji 長度",
        paragraphs: [
          "簡訊長度常見參考是 GSM-7 單則約 160 字元；如果內容包含中文、日文、韓文、emoji 或 GSM-7 不支援的符號，通常會改用 Unicode/UCS-2，單則常見上限約 70 字元。長簡訊分段後，每段可用字元還會再下降。",
          "頁面上的 SMS 計數器使用 160 作為快速提醒，適合在寫稿時先抓風險；正式發送前仍要以簡訊服務商、電信商或行銷平台的實際段數預覽為準。",
        ],
        items: [
          "純英文、數字和常見符號可能符合 GSM-7，單則常見上限約 160",
          "中文、emoji 和許多全形符號常會落入 Unicode/UCS-2，單則常見上限約 70",
          "多段 SMS 常因串接資訊佔位，使每段可用容量少於 160 或 70",
          "許多 emoji 在這個計數器中可能顯示為 2 個以上字元，UTF-8 位元組也通常比英文字母更高",
        ],
      },
      {
        heading: "SEO、社群 bio 和短文案檢查",
        paragraphs: [
          "Meta title 常見檢查範圍約 50 到 60 字元，Meta description 常見參考約 150 到 160 字元，但搜尋結果實際顯示會受像素寬度、查詢、裝置和搜尋引擎改寫影響。這個工具可先確認文案是否明顯過短或過長，再回到實際頁面預覽。",
          "社群個人簡介、短影音描述、廣告標題、推播標題和 CTA 往往比文章更需要字元控制。先把候選版本貼進來比較，能在送審、排程或交給設計前減少被截斷的機率。",
        ],
        items: [
          "檢查 Meta title 是否過長，避免重要關鍵字被截斷",
          "讓 Meta description 接近 150 到 160 字元的常見參考區間",
          "比較 Instagram、TikTok、YouTube、Threads 或 X bio 的候選版本",
          "確認廣告標題、推播和短 CTA 在實際版面中更容易完整顯示",
        ],
      },
      {
        heading: "資料庫、表單和匯入前檢查",
        paragraphs: [
          "開發和營運工作常遇到 varchar(80)、varchar(160)、CSV 欄位、API payload、後台表單或 CMS 摘要欄位限制。不同資料庫、字元集、collation 和驗證規則可能以字元、位元組或其他方式計算，因此送出前最好同時看字元數和 UTF-8 位元組。",
          "如果文字會進資料庫或第三方平台，請把這裡的數字當成預檢，再用真實系統驗證。尤其是 emoji、合成字、換行、全形標點和多語內容，最容易造成前端看起來沒超長、後端卻拒收的情況。",
        ],
        items: [
          "把 varchar、API、CMS 和匯入規格寫清楚是限制字元還是限制 bytes",
          "測試中文、emoji、換行和最長實際案例，而不是只測英文短句",
          "複製統計摘要到 bug ticket、QA 表或資料匯入紀錄",
          "若系統會自動修剪空白或換行，應在目標系統再做一次確認",
        ],
      },
      {
        heading: "建議使用流程",
        paragraphs: [
          "先在慣用編輯器完成草稿，再貼到工具中檢查。若目的地有嚴格限制，先確認它要求的是字數、可見字元、UTF-8 位元組、SMS 段數，還是不含空白字元。",
          "調整文案時保留 2 到 3 個版本，分別複製統計摘要到審稿表、SEO 檢查表、推播紀錄或產品規格。這比只截圖更容易搜尋、比對和追蹤。",
        ],
        items: [
          "先確認規範要求的是字數、字元、位元組還是不含空白字元",
          "用含空白字元和不含空白字元檢查同一份文案的兩種常見規則",
          "用 UTF-8 位元組檢查中文、emoji 和資料欄位風險",
          "複製統計摘要比截圖更適合放進審稿表",
          "發布前仍要在實際平台預覽排版與截斷情況",
        ],
      },
      {
        heading: "限制與需要人工判斷的部分",
        paragraphs: [
          "統計只能告訴你長度，不能判斷內容是否清楚、有說服力、符合品牌語氣或適合 AdSense 審查。搜尋引擎、社群平台、簡訊平台和資料庫也可能使用不同計算方式。",
        ],
      },
    ],
    examples: [
      "檢查 SMS 文案是否可能超過 GSM-7 160 字元或 Unicode/UCS-2 70 字元的常見參考。",
      "確認 Meta title 和 Meta description 是否接近 SEO 常見長度範圍。",
      "比較社群 bio、短影音描述、廣告標題和 CTA 的不同版本。",
      "檢查推播標題、通知內容和 app 內短文案是否容易被截斷。",
      "確認 varchar(160)、表單欄位、CMS 摘要或 API 欄位是否可能超長。",
      "用 UTF-8 位元組檢查中文、emoji、網址和換行造成的編碼長度。",
      "把統計摘要貼到 SEO QA、行銷排程表、產品 ticket 或資料匯入紀錄。",
      "在送審、排程、匯入或發布前快速找出需要修短的句子。",
    ],
    audience: [
      "需要控制 Meta title、Meta description、摘要和 schema 文案長度的 SEO 編輯。",
      "撰寫 SMS、推播、廣告、社群貼文和活動短文案的行銷團隊。",
      "管理 Instagram、TikTok、YouTube、Threads、X 或個人品牌 bio 的創作者。",
      "設計表單、空狀態、按鈕、通知和 app 內文案的產品與 UX 團隊。",
      "需要檢查 varchar、API、CSV 匯入和多語欄位限制的開發與 QA 團隊。",
      "處理中英文混合、CJK、emoji、網址和全形標點內容的編輯與客服人員。",
    ],
    caseStudies: [
      {
        title: "SMS 活動文案預檢",
        description: "行銷人員先貼入優惠簡訊，確認英文版接近 160 字元、中文版可能落入 70 字元參考，再回到簡訊平台檢查實際段數與費用。",
      },
      {
        title: "SEO 摘要修短",
        description: "編輯把 Meta title 和 Meta description 候選稿放進工具比較，保留主要關鍵字，並把過長版本修到更適合搜尋結果顯示的範圍。",
      },
      {
        title: "社群 bio 版本比較",
        description: "創作者同時比較三個個人簡介版本，檢查 emoji 和連結是否讓字元數過高，最後選出較短且重點完整的一版。",
      },
      {
        title: "資料匯入欄位檢查",
        description: "開發者用中文、英文、emoji 和換行組合測試 varchar 欄位，將字元數與 UTF-8 位元組記錄到 QA ticket，避免匯入時才發現後端驗證失敗。",
      },
    ],
    notes: [
      "SMS 160 是快速參考；中文、emoji 或非 GSM-7 符號常會改用 Unicode/UCS-2，單則常見參考約 70 字元。",
      "UTF-8 位元組不是 SMS 段數。中文在 UTF-8 常見為 3 bytes，emoji 常見為 4 bytes 或更多，但簡訊計費通常看 GSM-7/UCS-2 段數規則。",
      "許多 emoji 在 JavaScript 字串長度中可能算 2 個以上字元；加上膚色、合成圖示或家庭組合時可能更長。",
      "Meta title 和 Meta description 的顯示受像素寬度、裝置、查詢和搜尋引擎改寫影響，字元數只能做預檢。",
      "varchar、API 和資料庫欄位限制會受資料庫、字元集、collation 和驗證邏輯影響，正式匯入前仍要測真實系統。",
      "工具不會保存文字；需要紀錄請複製統計摘要，並避免貼入密碼、金鑰或高度敏感資料。",
    ],
    faq: [
      {
        q: "字元計數器和字數統計有什麼不同？",
        a: "字數統計適合文章和作業長度；字元計數器更適合 SMS、Meta title、Meta description、社群 bio、推播、表單和資料庫欄位這類有字元或位元組限制的場景。",
      },
      {
        q: "emoji 會算 2 個字元嗎？",
        a: "很多 emoji 在這個工具的字元數中會算 2 個或更多，因為瀏覽器的字串長度會受 UTF-16 表示方式影響。加上膚色、合成圖示或家庭組合時，實際字元數和平台顯示都可能不同。",
      },
      {
        q: "SMS 為什麼要看 70/160 和 GSM-7/UCS-2？",
        a: "純英文、數字和部分符號常符合 GSM-7，單則常見約 160 字元；中文、emoji 或特殊符號常會改用 Unicode/UCS-2，單則常見約 70 字元。長簡訊分段後每段容量還會再降低。",
      },
      {
        q: "中文一定是 3 bytes 嗎？這和 SMS 一樣嗎？",
        a: "在 UTF-8 中，常見中文字多半是 3 bytes，但 SMS 通常不是用 UTF-8 bytes 計費，而是依 GSM-7 或 UCS-2 段數規則。請把 UTF-8 位元組當成資料庫/API 參考，把 SMS 段數交給發送平台確認。",
      },
      {
        q: "可以用來檢查 Meta title 和 Meta description 嗎？",
        a: "可以做預檢。Meta title 常見參考約 50 到 60 字元，Meta description 常見參考約 150 到 160 字元，但實際搜尋結果會受像素寬度、裝置、查詢和搜尋引擎改寫影響。",
      },
      {
        q: "文字會被上傳或保存嗎？",
        a: "不會。統計在瀏覽器內完成，FunnyTools 不會保存你貼上的文字；需要留存結果時，可以使用複製統計摘要。",
      },
    ],
    instructions: [
      "貼上或輸入要檢查的 SMS、社群 bio、Meta title、Meta description、推播或資料欄位文字。",
      "查看含空白字元、不含空白字元、UTF-8 位元組、字數與行數。",
      "用常見限制區塊快速查看 Twitter/X、SMS 與 Meta description 是否超過參考值。",
      "若內容含中文、emoji、特殊符號或換行，另外查看 UTF-8 位元組並回到目標平台確認。",
      "需要紀錄時可複製統計摘要，或清除文字重新計算下一個版本。",
    ],





    labels: {
      input: '輸入文字',
      placeholder: '在這裡貼上或輸入文字...',
      characters: '含空白字元',
      charactersNoSpaces: '不含空白字元',
      bytes: 'UTF-8 位元組',
      words: '字數',
      lines: '行數',
      limits: '常見限制',
      twitter: 'Twitter/X',
      sms: 'SMS',
      meta: 'Meta description',
      copyStats: '複製統計',
      clear: '清除',
      copied: '已複製',
      overLimit: '超出限制',
      note: '限制為常見參考值，實際平台規則可能不同。',
    },
    privacyNote: '字元統計在瀏覽器本機完成。本站不會接收、儲存或上傳你輸入的文字。',
  },
  en: {
    name: 'Character Counter',
    short: 'Count characters, bytes, words, lines, and common platform limits live.',
    long: 'Character Counter is useful for social posts, SMS copy, push notifications, meta titles, meta descriptions, profile bios, database fields, ad text, and editing drafts. As you type, it reports characters with spaces, characters without spaces, UTF-8 bytes, words, and lines, while tracking common Twitter/X, SMS, and search snippet limits.',
    seoTitle: 'Character Counter | Characters, Words & UTF-8 Bytes',
    seoDescription: 'Count characters with spaces, without spaces, UTF-8 bytes, words, and lines while checking Twitter/X, SMS, and meta description limits.',
    keywords: ['character counter', 'byte counter', 'Twitter character count', 'SMS counter', 'meta description length', 'GSM-7', 'UCS-2', 'varchar length'],
    capabilities: [
      "Count characters with spaces, characters without spaces, UTF-8 bytes, words, and lines in real time.",
      "Use common reference limits such as Twitter/X 280, SMS 160, and meta description 160 before publishing.",
      "Check whether CJK text, emoji, line breaks, URLs, and mixed-language copy may exceed platform or field limits.",
      "Copy a statistics summary into review sheets, SEO QA notes, push logs, import specs, or product tickets.",
      "Run the count in the browser, which is useful for drafts and internal copy that is not ready to publish.",
    ],
    contentSections: [
      {
        heading: "Character count versus word count",
        paragraphs: [
          "Word count is useful for articles, assignments, scripts, and long drafts. Character count is more useful when the destination has a strict field or platform limit, such as SMS, push notifications, meta titles, meta descriptions, profile bios, ad headlines, form fields, and imported data.",
          "This tool shows characters with spaces, characters without spaces, UTF-8 bytes, words, and lines. That combination matters when a draft mixes English, CJK text, emoji, URLs, line breaks, punctuation, and full-width symbols.",
        ],
        items: [
          "Use character count for platform limits, short fields, push copy, and SEO snippets",
          "Use UTF-8 bytes for API, database, CSV import, and backend validation risk checks",
          "Use no-space characters when a form, exam, editorial rule, or internal checklist ignores spaces",
          "Keep word count as a writing-length reference, but do not use it as a replacement for field limits",
        ],
      },
      {
        heading: "SMS, Unicode, and emoji length",
        paragraphs: [
          "A common SMS reference is about 160 characters for a single GSM-7 message. If the text includes Chinese, Japanese, Korean, emoji, or symbols that are not supported by GSM-7, the message usually switches to Unicode/UCS-2, where a common single-message reference is about 70 characters. Concatenated messages reserve extra space, so each segment can hold less.",
          "The on-page SMS counter uses 160 as a quick writing reference. Before sending a real campaign, confirm the final segment count in the SMS provider, carrier tool, or marketing platform.",
        ],
        items: [
          "Plain English, numbers, and supported symbols may fit GSM-7, with about 160 characters per single message",
          "CJK text, emoji, and many full-width symbols often move the message to Unicode/UCS-2, with about 70 characters per single message",
          "Long SMS messages have lower per-segment capacity because segment headers take space",
          "Many emoji can count as 2 or more characters here, and their UTF-8 byte length is usually higher than a Latin letter",
        ],
      },
      {
        heading: "SEO, social bios, and short copy",
        paragraphs: [
          "Meta title checks often use a rough 50 to 60 character range, and meta descriptions often use a rough 150 to 160 character range. Search display still depends on pixel width, query, device, and rewriting, so this tool is best used as an early warning before previewing the live page or SERP snippet.",
          "Profile bios, short video descriptions, ad headlines, push titles, and CTA copy often fail because they are only slightly too long. Comparing several versions here before handoff helps reduce truncation in scheduling tools, ad review, and design layouts.",
        ],
        items: [
          "Check whether a meta title is too long before important keywords are truncated",
          "Keep meta descriptions close to the common 150 to 160 character reference range",
          "Compare Instagram, TikTok, YouTube, Threads, or X bio drafts",
          "Check ad headlines, push notifications, and short CTAs before they reach the final interface",
        ],
      },
      {
        heading: "Database, form, and import checks",
        paragraphs: [
          "Product and engineering work often includes limits such as varchar(80), varchar(160), CSV columns, API payloads, admin forms, and CMS summary fields. Different databases, character sets, collations, and validation layers may count characters, bytes, or something else, so it is useful to inspect both visible characters and UTF-8 bytes.",
          "If the text will be stored or imported, treat these numbers as a preflight check and then test the real system. Emoji, composed characters, line breaks, full-width punctuation, and multilingual copy are common sources of mismatches between what fits in the UI and what the backend accepts.",
        ],
        items: [
          "Clarify whether a varchar, API, CMS, or import rule limits characters or bytes",
          "Test CJK text, emoji, line breaks, and realistic longest examples, not only short English strings",
          "Copy the statistics summary into a bug ticket, QA sheet, or import log",
          "If the destination trims spaces or line breaks automatically, verify the final stored value there",
        ],
      },
      {
        heading: "Recommended workflow",
        paragraphs: [
          "Write in your normal editor first, then paste the draft here. If the destination has a strict rule, confirm whether it means words, visible characters, UTF-8 bytes, SMS segments, or characters without spaces.",
          "Keep two or three candidate versions and copy each statistics summary into a review sheet, SEO checklist, push log, or product spec. Text summaries are easier to search and compare than screenshots.",
        ],
        items: [
          "Compare characters with spaces and no-space characters when the rule is ambiguous",
          "Use UTF-8 bytes to check CJK, emoji, and data-field risk",
        ],
      },
      {
        heading: "Limits and human checks",
        paragraphs: [
          "Counting text does not prove that the writing is clear, persuasive, original, on-brand, or suitable for AdSense review. Search engines, social platforms, SMS providers, and databases can also apply different counting rules.",
          "Before publishing ads, snippets, social posts, app text, CMS pages, or SMS campaigns, preview the final version in the target system. For database, API, or import workflows, compare the numbers with the real field limits and validation rules.",
        ],
      },
    ],
    examples: [
      "Check whether SMS copy may exceed the common GSM-7 160 character or Unicode/UCS-2 70 character references.",
      "Check whether meta titles and meta descriptions are near common SEO length ranges.",
      "Compare social profile bios, short video descriptions, ad headlines, and CTA variants.",
      "Review push titles, notification copy, and short in-app messages before they are truncated.",
      "Check whether varchar(160), form fields, CMS summaries, or API fields may be too long.",
      "Inspect UTF-8 byte length for CJK text, emoji, URLs, and line breaks.",
      "Paste the statistics summary into SEO QA, campaign calendars, product tickets, or import logs.",
      "Find sentences to trim before review, scheduling, import, or publication.",
    ],
    audience: [
      "SEO editors managing meta titles, meta descriptions, summaries, and schema copy.",
      "Marketing teams writing SMS, push notifications, ads, social posts, and campaign microcopy.",
      "Creators managing Instagram, TikTok, YouTube, Threads, X, or personal brand bios.",
      "Product and UX teams writing form labels, empty states, buttons, notifications, and app text.",
      "Developers and QA teams checking varchar limits, APIs, CSV imports, and multilingual field validation.",
      "Editors and support teams working with English, CJK text, emoji, URLs, and full-width punctuation.",
    ],
    caseStudies: [
      {
        title: "SMS campaign preflight",
        description: "A marketer pastes a promotion message, sees that the English version is near 160 characters and the Chinese version may fall under a 70 character Unicode reference, then confirms final segments in the SMS platform.",
      },
      {
        title: "SEO snippet trimming",
        description: "An editor compares meta title and meta description drafts, keeps the core keywords, and trims the longest version before previewing the final page.",
      },
      {
        title: "Social bio comparison",
        description: "A creator compares three profile bio drafts, checks whether emoji and links push the length too high, and chooses the shortest version that still carries the main message.",
      },
      {
        title: "Data import field check",
        description: "A developer tests Chinese, English, emoji, and line breaks against a varchar field, then records both character count and UTF-8 bytes in the QA ticket before import.",
      },
    ],
    notes: [
      "SMS 160 is a quick reference. CJK text, emoji, or non-GSM-7 symbols often switch messages to Unicode/UCS-2, where a common single-message reference is about 70 characters.",
      "UTF-8 bytes are not SMS segments. Common CJK characters are often 3 bytes in UTF-8, and emoji are often 4 bytes or more, while SMS billing usually follows GSM-7/UCS-2 segment rules.",
      "Many emoji can count as 2 or more JavaScript string characters; skin tone modifiers, composed icons, and family emoji can be longer.",
      "Meta title and meta description display depends on pixel width, device, query, and search engine rewriting, so character count is only a preflight check.",
      "Varchar, API, and database limits depend on the database, charset, collation, and validation logic. Test the real system before bulk import.",
      "The tool does not store your text. Copy the statistics summary if you need a record, and avoid pasting passwords, keys, or highly sensitive content.",
    ],
    faq: [
      {
        q: "How is a character counter different from a word counter?",
        a: "A word counter is better for article and assignment length. A character counter is better for SMS, meta titles, meta descriptions, social bios, push notifications, forms, and database fields where characters or bytes can be the actual limit.",
      },
      {
        q: "Do emoji count as 2 characters?",
        a: "Many emoji count as 2 or more characters in this tool because browser string length is affected by UTF-16 representation. Skin tone modifiers, composed icons, and family emoji can be longer, and platform-specific display rules may differ.",
      },
      {
        q: "Why do SMS limits mention 70/160 and GSM-7/UCS-2?",
        a: "Plain English, numbers, and supported symbols often fit GSM-7, where a common single-message reference is about 160 characters. Chinese, emoji, and unsupported symbols often switch to Unicode/UCS-2, where a common single-message reference is about 70 characters. Long messages have lower per-segment capacity.",
      },
      {
        q: "Are Chinese characters always 3 bytes, and is that the same as SMS?",
        a: "In UTF-8, many common Chinese characters are 3 bytes, but SMS usually is not billed by UTF-8 bytes. Use UTF-8 bytes for database and API checks, and confirm SMS segments in the sending platform.",
      },
      {
        q: "Can I use this for meta titles and meta descriptions?",
        a: "Yes, as a preflight check. Meta titles are often checked around 50 to 60 characters, and meta descriptions around 150 to 160 characters, but actual search display depends on pixel width, device, query, and rewriting.",
      },
      {
        q: "Is my text uploaded?",
        a: "No. Counting runs in your browser, and FunnyTools does not store the text you paste. Use the copy statistics action if you need a record.",
      },
    ],
    instructions: [
      "Paste or type SMS copy, a social bio, a meta title, a meta description, push copy, or a database field value.",
      "Review characters, no-space characters, UTF-8 bytes, words, and lines.",
      "Use the common limits panel to check Twitter/X, SMS, and meta description references.",
      "If the text includes CJK characters, emoji, special symbols, or line breaks, check UTF-8 bytes and confirm in the destination platform.",
      "Copy the stats summary when you need a record, or clear the textarea to start another version.",
    ],





    labels: {
      input: 'Input text',
      placeholder: 'Paste or type text here...',
      characters: 'Characters with spaces',
      charactersNoSpaces: 'Characters without spaces',
      bytes: 'UTF-8 bytes',
      words: 'Words',
      lines: 'Lines',
      limits: 'Common limits',
      twitter: 'Twitter/X',
      sms: 'SMS',
      meta: 'Meta description',
      copyStats: 'Copy stats',
      clear: 'Clear',
      copied: 'Copied!',
      overLimit: 'Over limit',
      note: 'Limits are common references. Actual platform rules may differ.',
    },
    privacyNote: 'Text counting runs locally in your browser. This site does not receive, store, or upload the text you enter.',
  },
} satisfies Record<'zh' | 'en', ToolContent>;
