import type { LocalizedToolContent } from './_types';

export default {
  zh: {
    name: '字數統計工具',
    short: '貼上文字後，即時計算字數、字元、行數、段落、句數與閱讀時間。',
    long: '這個字數統計工具會在你輸入或貼上文字時即時更新統計結果，包含含空白字元、不含空白字元、字數、行數、段落數、句數與預估閱讀時間。它特別考量中英文混合內容：中文、日文、韓文等 CJK 字元會逐字計算，英文與數字則以詞彙 token 計算，適合社群貼文、文章草稿、作業、申請文件、腳本與雙語內容檢查。',
    seoTitle: "字數統計工具｜線上計算字數、字元數與閱讀時間",
    seoDescription: '免費即時統計中英文字數、含與不含空白字元、行數、段落、句數與閱讀時間。文字只在瀏覽器分析，不會儲存或上傳。',
    keywords: [
      "字數統計",
      "字元計算",
      "文字計數器",
      "閱讀時間計算",
      "word counter",
      "character counter",
      "中英文字數"
    ],
    capabilities: [
      "即時計算字數、字元、行數、段落、句數與預估閱讀時間。",
    ],
    contentSections: [
      {
        heading: "字數統計工具適合解決的工作",
        paragraphs: [
          "字數統計工具適合在文字送出前做最後檢查，例如部落格草稿、社群貼文、作業、申請文件、影片腳本、電子報、Meta description 或雙語內容。你貼上文字後，工具會即時更新統計結果，讓你知道內容是否接近平台、投稿或內部審稿規範。",
          "CJK 字元逐字計算，英文與數字以詞彙 token 估算。這比只用空白切字更貼近實際寫作場景，尤其適合中英文混合、含數字、網址、emoji 或全形標點的內容。",
        ],
      },
      {
        heading: "建議使用流程",
        paragraphs: [
          "寫作者可以先在慣用編輯器完成草稿，再貼到工具中檢查長度。如果平台有上限，請確認對方要求的是字、詞、字元、位元組還是不含空白字元，因為不同規範可能差很多。",
          "複製統計摘要到 Excel、Google Sheets、Notion 或 SEO 內容檢查表。",
        ],
        items: [
          "先確認規範要求的是字數、字元、位元組還是不含空白字元",
          "社群平台、廣告後台與 CMS 可能使用不同計算方式",
          "複製統計摘要比截圖更適合放進審稿表",
          "發布前仍要在實際平台預覽排版與截斷情況",
        ],
      },
      {
        heading: "限制與需要人工判斷的部分",
        paragraphs: [
          "統計只能告訴你長度，不能判斷內容是否清楚、有說服力或符合品牌語氣。不同平台對 emoji、連結、全形符號、換行與空白的計算方式也可能不同。",
          "正式發布前，仍應在目標平台、廣告後台、CMS 或文件版面中再次預覽。若內容要進資料庫、API 或匯入檔，請搭配欄位限制與實際系統驗證。",
        ],
      },
    ],
    examples: [
      "檢查文章草稿是否接近指定字數。",
      "估算電子報、社群貼文或影片腳本長度。",
      "比較多個文案版本，挑出最適合平台限制的一版。",
      "複製統計摘要到 SEO 內容檢查表或審稿表。",
    ],
    audience: [
      "部落客、編輯、文案、學生與研究者。",
      "需要追蹤文字長度與平台限制的 SEO、行銷與內容團隊。",
      "撰寫中英文混合內容、雙語作業或短文案的人。",
    ],
    caseStudies: [
      {
        title: "SEO 草稿檢查",
        description: "編輯把文章貼入工具，確認長度與摘要，再把統計結果貼到內容排程表。",
      },
      {
        title: "作業或投稿核對",
        description: "作者在繳交前確認長度，避免把標點、換行或空白誤認為有效內容。",
      },
      {
        title: "短文案修剪",
        description: "行銷人員比較多個版本的統計結果，挑出最適合發布平台的一版。",
      },
    ],
    notes: [
      "CJK 字元逐字計算，英文與數字以詞彙 token 估算。",
      "統計結果是輔助判斷，不能取代實際平台預覽。",
      "工具不會保存文字；需要紀錄請複製統計摘要。",
    ],
    faq: [
      {
        q: "文字會被上傳或保存嗎？",
        a: "不會。統計在瀏覽器內完成，FunnyTools 不會保存你貼上的文字。",
      },
      {
        q: "統計結果可以匯出嗎？",
        a: "工具提供複製統計摘要，你可以貼到 Excel、Google Sheets、交稿表或內容管理文件。",
      },
      {
        q: "平台限制一定準確嗎？",
        a: "不一定。這些統計適合做發布前檢查，正式上線仍要以目標平台實際預覽為準。",
      },
      {
        q: "中英文混合內容可以用嗎？",
        a: "可以。工具會針對 CJK 字元、英文、數字與空白提供較完整的統計參考。",
      },
      {
        q: "可以用來檢查 SEO 摘要嗎？",
        a: "可以做長度參考，但搜尋結果顯示仍可能受查詢、裝置與搜尋引擎改寫影響。",
      },
    ],


    instructions: [
      '把文章、貼文、作業、履歷或腳本貼到輸入框。',
      '查看即時更新的字數、字元、行數、段落、句數與閱讀時間。',
      '需要回報統計資訊時，按下複製統計即可取得整理好的摘要。',
      '要重新檢查另一段文字時，按下清除即可重設所有數值。',
      '若內容包含中英文混合文字，可同時參考字數與字元數，避免只看單一指標。',
    ],





    labels: {
      input: '輸入文字',
      placeholder: '在這裡貼上或輸入文字...',
      characters: '字元（含空白）',
      charactersNoSpaces: '字元（不含空白）',
      words: '字數',
      lines: '行數',
      paragraphs: '段落',
      sentences: '句數',
      readingTime: '預估閱讀時間',
      minutes: '分鐘',
      copyStats: '複製統計',
      clear: '清除',
      copied: '已複製！',
      note: '計算規則：CJK 字元逐字計算，英文與數字以詞彙 token 計算。閱讀時間以約 200 English wpm 與 300 CJK cpm 估算。',
    },
    privacyNote: '此工具完全在瀏覽器本機分析文字。你貼上的文章、作業、文案或腳本不會傳送到 FunnyTools 免費線上工具箱伺服器，也不會被儲存。',
    disclaimer: '統計結果會因平台、學校、出版社或投稿系統的計算規則而不同。若有正式字數規範，請以該平台或單位的規則為準。',
  },
  en: {
    name: 'Word Counter',
    short: 'Paste text and instantly count words, characters, lines, paragraphs, sentences, and reading time.',
    long: 'This word counter updates as you type and reports characters with spaces, characters without spaces, combined word count, lines, paragraphs, sentences, and estimated reading time. It is designed for mixed English and CJK text: Chinese, Japanese, and Korean ideographs are counted character by character, while English words and numbers are counted as word tokens. Use it for social posts, drafts, assignments, applications, scripts, newsletters, and bilingual content checks.',
    seoTitle: "Word Counter Online | Count Words, Characters and Reading Time",
    seoDescription: 'Count words, characters, lines, paragraphs, sentences, and estimated reading time online with CJK-aware counting for English and multilingual text.',
    keywords: [
      "word counter",
      "character counter",
      "online word count",
      "reading time calculator",
      "CJK word count",
      "text counter",
      "sentence counter"
    ],
    capabilities: [
      "Count words, characters, lines, paragraphs, sentences, and estimated reading time in real time.",
    ],
    contentSections: [
      {
        heading: "What Word Counter is useful for",
        paragraphs: [
          "Word Counter is useful before publishing, submitting, or handing off blog drafts, social captions, assignments, application essays, newsletters, video scripts, meta descriptions, and bilingual text. Paste the text and the page updates immediately, giving you a practical length check before the copy reaches a platform, editor, CMS, ad account, or review sheet.",
          "CJK characters are counted individually, while English and numbers are counted using word-like tokens. This is more useful than a simple space split when drafts combine headings, numbers, URLs, emoji, punctuation, and multiple languages.",
        ],
      },
      {
        heading: "Recommended workflow",
        paragraphs: [
          "Write in your normal editor first, then paste the draft here for a length check. If the destination has a strict rule, confirm whether it means words, visible characters, bytes, characters without spaces, or a platform-specific calculation.",
          "copy the statistics summary into Excel, Google Sheets, Notion, or an SEO content checklist. Teams can store that summary in an editorial calendar, review sheet, submission checklist, or SEO QA document instead of relying on screenshots or manual notes.",
        ],
        items: [
          "Confirm whether the rule is based on words, characters, bytes, or characters without spaces",
          "Use copied statistics for review sheets instead of screenshots",
          "Preview final formatting in the destination platform",
          "Check database and API limits in the real system when the text will be imported",
        ],
      },
      {
        heading: "Limits and human checks",
        paragraphs: [
          "Counting text does not prove that the writing is clear, persuasive, original, or ready to publish. Platforms may count emoji, links, full-width punctuation, line breaks, and pasted formatting differently.",
          "Before publishing ads, snippets, social posts, app text, or CMS pages, preview the final version in the target system. For database, API, or import workflows, compare the numbers with the real field limits and validation rules.",
        ],
      },
    ],
    examples: [
      "Check whether a draft is close to a required length.",
      "Estimate length for a newsletter, social post, or video script.",
      "Compare several copy versions before choosing one for a platform.",
      "Copy the statistics summary into an SEO or editorial checklist.",
    ],
    audience: [
      "Bloggers, editors, copywriters, students, researchers, and translators.",
      "SEO, marketing, and content teams that track text length and platform limits.",
      "Writers working with bilingual text, short copy, or mixed-language drafts.",
    ],
    caseStudies: [
      {
        title: "SEO draft review",
        description: "An editor checks length and copies the statistics into the content calendar before publication.",
      },
      {
        title: "Submission check",
        description: "A writer verifies length before handing in a draft with a strict requirement.",
      },
      {
        title: "Copy trimming",
        description: "A marketer compares several versions and chooses the one that fits the destination platform.",
      },
    ],
    notes: [
      "CJK characters are counted individually, while English and numbers are counted using word-like tokens.",
      "Counts are a planning aid and do not replace a real platform preview.",
      "The site does not save your text; copy the statistics summary if you need a record.",
    ],
    faq: [
      {
        q: "Is my text uploaded?",
        a: "No. Counting runs in your browser, and the site does not store the text you paste.",
      },
      {
        q: "Can I export the statistics?",
        a: "Use the copy statistics action, then paste the summary into a spreadsheet, checklist, or editorial note.",
      },
      {
        q: "Are platform limits guaranteed?",
        a: "No. Use the numbers as a preflight check, then confirm in the destination platform.",
      },
      {
        q: "Does it work with mixed languages?",
        a: "Yes. The tool gives useful counts for CJK text, English, numbers, whitespace, and symbols.",
      },
      {
        q: "Can I use it for SEO snippets?",
        a: "Yes, as a length reference. Search result display can still change by query, device, and rewriting.",
      },
    ],

    instructions: [
      'Paste or type your article, post, assignment, resume, or script into the textarea.',
      'Review the live stats for words, characters, lines, paragraphs, sentences, and reading time.',
      'Use Copy stats to place a formatted summary on your clipboard.',
      'Use Clear when you want to remove the text and reset every metric.',
      'For mixed English and CJK content, compare both word count and character count instead of relying on one metric.',
    ],



    labels: {
      input: 'Input text',
      placeholder: 'Paste or type text here...',
      characters: 'Characters with spaces',
      charactersNoSpaces: 'Characters without spaces',
      words: 'Words',
      lines: 'Lines',
      paragraphs: 'Paragraphs',
      sentences: 'Sentences',
      readingTime: 'Estimated reading time',
      minutes: 'min',
      copyStats: 'Copy stats',
      clear: 'Clear',
      copied: 'Copied!',
      note: 'Counting rule: CJK ideographs count one by one, Latin text and numbers count as word tokens. Reading time uses about 200 English wpm and 300 CJK cpm.',
    },
    privacyNote: 'This tool analyzes text entirely in your browser. Your articles, assignments, copy, or scripts are not sent to FunnyTools servers and are not stored.',
    disclaimer: 'Counts can differ from the rules used by platforms, schools, publishers, or submission systems. For official limits, follow the rule shown by that platform or organization.',
  },
} satisfies LocalizedToolContent;
