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
      '輸入或貼上文字後，即時更新字數、字元、行、段落與句子數量。',
      '分開顯示含空白與不含空白字元，方便核對平台或投稿限制。',
      '依中英文內容估算閱讀時間，並可一鍵複製完整文字。',
    ],
    contentSections: [
      {
        heading: "字數統計工具可以做什麼",
        paragraphs: [
          "字數統計工具會即時計算文字的字數、含空白字元、不含空白字元、行數、段落數、句數與預估閱讀時間。它支援英文與中日韓文字混合內容，適合草稿、作業、履歷、社群貼文、腳本與雙語文案。"
        ]
      },
      {
        heading: "什麼時候適合使用字數統計",
        paragraphs: [
          "當平台、作業或出版規範有字數或字元限制時，先檢查統計數字可以避免送出後才發現超標。"
        ],
        items: [
          "檢查社群貼文、廣告文案或簡訊長度",
          "估算文章、演講稿、影片腳本的閱讀時間",
          "確認作業、申請書、履歷摘要是否符合限制",
          "整理長文時檢查段落與句子數量"
        ]
      },
      {
        heading: "字數統計使用步驟",
        paragraphs: [
          "1. 將文章、貼文、作業、履歷或腳本貼到輸入框。",
          "2. 查看即時更新的字數、字元數、行數、段落數、句數與閱讀時間。",
          "3. 需要分享時按下複製統計。",
          "4. 若要重新開始，按下清除重設所有數據。"
        ]
      },
      {
        heading: "隱私與本機處理",
        paragraphs: [
          "文字只會在你的瀏覽器中分析，不會上傳到 FunnyTools 伺服器，也不會被儲存。重新整理或關閉頁面後，輸入內容不會由工具保留。"
        ]
      },
      {
        heading: "字數統計建議",
        paragraphs: [
          "不同平台的字數規則可能不同，正式提交前仍應以對方規範為準。"
        ],
        items: [
          "有字元限制時同時查看含空白與不含空白數字",
          "中英文混合內容不要只依賴單一指標",
          "長文可用段落數與句數檢查可讀性",
          "閱讀時間只是估算，需依受眾與內容難度調整"
        ]
      }
    ],
    instructions: [
      '把文章、貼文、作業、履歷或腳本貼到輸入框。',
      '查看即時更新的字數、字元、行數、段落、句數與閱讀時間。',
      '需要回報統計資訊時，按下複製統計即可取得整理好的摘要。',
      '要重新檢查另一段文字時，按下清除即可重設所有數值。',
      '若內容包含中英文混合文字，可同時參考字數與字元數，避免只看單一指標。',
    ],
    examples: [
      '檢查社群貼文、廣告文案或簡訊是否接近平台限制。',
      '估算文章、講稿、電子報或影片腳本的閱讀時間。',
      '確認作業、申請文件、履歷摘要或投稿內容是否符合字數要求。',
      '整理中英文混合內容時，同時查看 CJK 字元與英文單字的統計。',
      '編輯文章時快速掌握段落數與句數，判斷結構是否過長。',
    ],
    audience: [
      '需要控制作業、自傳、論文摘要或申請題字數的學生與求職者。',
      '要核對社群貼文、廣告文案、電子報或影片腳本長度的編輯與行銷人員。',
      '處理中英文混合內容，需同時參考字數、字元與閱讀時間的作者。',
    ],
    caseStudies: [
      {
        title: '社群文案檢查',
        description: '行銷人員貼上貼文草稿，確認字元數沒有超過平台限制，再複製統計結果交給同事審稿。',
      },
      {
        title: '文章閱讀時間',
        description: '部落格作者在發布前估算閱讀時間，決定是否拆成小標題或分成兩篇文章。',
      },
      {
        title: '作業與申請文件',
        description: '學生或求職者確認自傳、讀書計畫與短答題的字數，避免低於或超過規定範圍。',
      },
    ],
    notes: [
      '不同學校、出版社與平台對「字數」的定義可能不同，有正式規範時請以該單位規則為準。',
      '閱讀時間是依一般速度估算，專業術語、數據表格與讀者熟悉度都會影響實際所需時間。',
      '文字在瀏覽器本機分析，但處理尚未公開的機密內容時，仍應遵守組織的資安規範。',
    ],
    faq: [
      {
        q: "中文、日文或韓文字數怎麼計算？",
        a: "CJK 表意文字會逐字計算，英文單字與數字則以詞彙 token 計算，工具會合併顯示總字數。"
      },
      {
        q: "閱讀時間如何估算？",
        a: "工具約以英文每分鐘 200 字、中日韓文字每分鐘 300 字元估算，並進位到整分鐘。"
      },
      {
        q: "我的文字會上傳嗎？",
        a: "不會。所有統計都在瀏覽器內即時完成，網站不會接收或儲存你的文字。"
      },
      {
        q: "行數和段落數有什麼不同？",
        a: "行數依換行符號計算；段落數則是以空白行分隔的非空文字區塊。"
      }
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
    contentSections: [
      {
        heading: "What Word Counter does",
        paragraphs: [
          "Word Counter instantly reports words, characters with spaces, characters without spaces, lines, paragraphs, sentences, and estimated reading time. It is designed for English and mixed CJK content, including Chinese, Japanese, and Korean text."
        ]
      },
      {
        heading: "When to use Word Counter",
        paragraphs: [
          "Use it whenever a platform, assignment, editor, or form has word or character limits."
        ],
        items: [
          "Checking social posts, ad copy, or SMS drafts against limits",
          "Estimating reading time for articles, speeches, and video scripts",
          "Reviewing assignments, applications, and resume summaries",
          "Watching paragraph and sentence counts while editing readability"
        ]
      },
      {
        heading: "Step-by-step usage guide",
        paragraphs: [
          "1. Paste or type your text into the input area.",
          "2. Review live counts for words, characters, lines, paragraphs, sentences, and reading time.",
          "3. Use Copy stats when you need to share the summary.",
          "4. Use Clear to reset the text and all metrics."
        ]
      },
      {
        heading: "Privacy and local processing",
        paragraphs: [
          "Text is analyzed entirely in your browser. It is not uploaded to FunnyTools and is not stored on a server. If you refresh or close the page, the tool does not keep your pasted content."
        ]
      },
      {
        heading: "Tips and best practices",
        paragraphs: [
          "Different platforms count text differently, so treat the result as a practical editing guide."
        ],
        items: [
          "Check both character counts when a limit may include spaces",
          "For mixed-language content, compare words and characters",
          "Use paragraph and sentence counts to improve readability",
          "Follow the official counter for final submission rules"
        ]
      }
    ],
    instructions: [
      'Paste or type your article, post, assignment, resume, or script into the textarea.',
      'Review the live stats for words, characters, lines, paragraphs, sentences, and reading time.',
      'Use Copy stats to place a formatted summary on your clipboard.',
      'Use Clear when you want to remove the text and reset every metric.',
      'For mixed English and CJK content, compare both word count and character count instead of relying on one metric.',
    ],
    examples: [
      'Check whether a social post, ad, or SMS draft is close to a platform limit.',
      'Estimate reading time for blog posts, speeches, newsletters, or video scripts.',
      'Review word count for assignments, applications, resume summaries, or submissions.',
      'Measure mixed English and Chinese content without switching tools.',
      'Scan paragraph and sentence counts while editing long drafts for readability.',
    ],
    caseStudies: [
      {
        title: 'Social copy review',
        description: 'A marketer pastes a post draft, checks the character count against platform limits, then copies the stats for review.',
      },
      {
        title: 'Article reading time',
        description: 'A blogger estimates reading time before publishing and decides whether the draft should be split into sections or separate posts.',
      },
      {
        title: 'Application writing',
        description: 'A student or job seeker checks essays, personal statements, and short answers before submitting them to a form with limits.',
      },
    ],
    faq: [
      {
        q: "How are Chinese, Japanese, or Korean words counted?",
        a: "CJK ideographs are counted one character at a time, while Latin words and numbers are counted as word tokens."
      },
      {
        q: "How is reading time estimated?",
        a: "The estimate uses about 200 English words per minute and about 300 CJK characters per minute, then rounds up to whole minutes."
      },
      {
        q: "Does my text get uploaded?",
        a: "No. Counting happens live in your browser, and the site does not receive or store the text."
      },
      {
        q: "What is the difference between lines and paragraphs?",
        a: "Lines follow newline characters. Paragraphs are non-empty text blocks separated by blank lines."
      }
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
