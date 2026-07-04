import type { ToolContent } from './_types';

export default {
  zh: {
    name: '轉盤抽籤',
    short: '把清單變成彩色轉盤，公平抽出一個結果。',
    long: '轉盤抽籤可以把每行一個選項畫成彩色轉盤，按下旋轉後用動畫抽出結果。適合課堂點名、活動抽獎、晚餐選擇或任何需要公開、直覺決定的情境。',
    seoTitle: '轉盤抽籤｜隨機名單、獎項與決定轉盤',
    seoDescription: '輸入選項清單，轉成可視化彩色轉盤並隨機抽出結果，可複製中選項。',
    keywords: ['轉盤抽籤', 'random wheel', 'wheel picker', '抽籤工具'],
    capabilities: [
      "把每行一個選項轉成可視化轉盤，按下旋轉後抽出結果。",
    ],
    contentSections: [
      {
        heading: "轉盤抽籤適合解決的工作",
        paragraphs: [
          "比單純顯示文字結果更適合需要「讓大家看見抽選過程」的場合。每個非空白行會成為轉盤上的一個選項，按下旋轉後以動畫停在中選結果，適合課堂點名、活動抽獎、晚餐選擇、遊戲任務或會議暖身。",
          "如果你只是要從名單中快速抽一個人，姓名抽籤工具會更直接；如果你需要視覺化、現場參與感或投影給大家看，轉盤會更容易讓參與者理解結果不是主持人臨時指定。",
        ],
      },
      {
        heading: "建議使用流程",
        paragraphs: [
          "轉盤的可讀性取決於選項長度與數量。短標籤最適合放在轉盤上，例如座號、餐廳名、任務代碼、獎項名稱或小組名。若選項很多，建議先在 Excel 或 Google Sheets 清理重複項目，再貼到工具中。",
          "抽選結果可以複製到紀錄、公告或聊天室，但工具不會替你保存歷史紀錄。如果要連續抽多次且不希望重複，建議每次抽完後手動刪除中選項目，或改用支援移除名單的姓名抽籤工具。",
        ],
        items: [
          "每行一個選項，空白行不會成為有效選項",
          "投影時使用短標籤或編號，避免文字擠在轉盤上",
          "大量候選項目前，先用試算表整理再貼入",
          "需要不重複抽選時，抽完後手動移除中選項目",
        ],
      },
      {
        heading: "限制與需要人工判斷的部分",
        paragraphs: [
          "轉盤抽籤在瀏覽器中執行，清單不會上傳到伺服器。這適合教室、會議室與小活動快速使用，但也代表重新整理頁面後內容不會由網站替你保存。",
          "轉盤適合非正式決策與活動互動，不適合高價獎品、公證抽獎或需要審計的流程。公開抽選前，仍應先確認候選項目有效、規則清楚，並在必要時保存原始清單與中選結果。",
        ],
      },
    ],
    examples: [
      "把餐廳清單貼上轉盤，抽出今天晚餐先吃哪一家。",
      "老師用轉盤抽小組、題目或下一位分享者。",
      "主持人把獎項或任務放進轉盤，增加現場參與感。",
      "團隊會議用轉盤選暖身問題或下一個討論主題。",
    ],
    audience: [
      "需要投影抽選過程的老師、主持人與活動工作者。",
      "想讓日常選擇更直覺的朋友、家庭與小團隊。",
      "需要從短選項清單中公開抽出一項的人。",
    ],
    caseStudies: [
      {
        title: "課堂題目轉盤",
        description: "老師把題號與主題貼成短標籤，投影轉盤抽出下一題，學生能清楚看到選擇過程。",
      },
      {
        title: "活動抽任務",
        description: "主持人把破冰任務放入轉盤，中選後複製結果貼到活動紀錄，方便下一輪排除重複任務。",
      },
      {
        title: "晚餐決策",
        description: "朋友把候選餐廳貼進轉盤，抽到後先截圖或複製結果，再開地圖確認營業時間。",
      },
    ],
    notes: [
      "選項越長、數量越多，轉盤文字越不容易閱讀。",
      "工具不會自動保存抽選歷史；需要紀錄請複製結果。",
      "正式抽獎仍應保留規則、名單與人工核對流程。",
    ],
    faq: [
      {
        q: "每個選項機率都一樣嗎？",
        a: "是。每個非空白行會成為一個轉盤區塊，抽選時以相同權重處理。",
      },
      {
        q: "可以一次貼很多選項嗎？",
        a: "可以，但選項太多會讓轉盤標籤變小。大量名單建議改用短代碼或其他抽選工具。",
      },
      {
        q: "抽完會自動移除中選項目嗎？",
        a: "不會。若需要不重複抽選，請手動刪除中選項目後再旋轉。",
      },
      {
        q: "清單會被網站保存嗎？",
        a: "不會。清單在瀏覽器內處理，重新整理或關閉頁面後網站不會保留內容。",
      },
      {
        q: "適合正式抽獎嗎？",
        a: "適合小型互動與日常決策；高價或受規範抽獎請使用符合主辦規則的正式流程。",
      },
    ],
    instructions: [
      '在文字框中輸入選項，每行一個。',
      '按下旋轉，轉盤會動畫旋轉並停在隨機結果。',
      '結果會顯示在下方，也可以複製。',
      '修改清單後可再次旋轉，轉盤會依照新清單重畫。',
    ],


    labels: {
      input: '選項清單',
      placeholder: '披薩\n拉麵\n便當\n火鍋',
      spin: '旋轉',
      copy: '複製結果',
      clear: '重設範例',
      result: '中選結果',
      waiting: '等待旋轉',
      emptyError: '請至少輸入一個選項。',
      copied: '已複製',
      oneOption: '只有一個選項，結果就是它。',
    },
  },
  en: {
    name: 'Random Wheel Picker',
    short: 'Spin a visual wheel to choose from custom options.',
    long: 'Random Wheel Picker turns a one-option-per-line list into a colorful canvas wheel. Spin it to animate the choice and land on a random winner for classrooms, giveaways, meals, games, or everyday decisions.',
    seoTitle: 'Random Wheel Picker | Free online spinning wheel',
    seoDescription: 'Enter custom options, spin a colorful wheel, highlight the winner, and copy the result.',
    keywords: ['random wheel', 'wheel picker', 'spin wheel', 'random picker'],
    capabilities: [
      "Turn one option per line into a visual spinning wheel.",
    ],
    contentSections: [
      {
        heading: "What Random Wheel Picker is useful for",
        paragraphs: [
          "A random wheel is useful when the selection process should be visible, not just fast. Each non-empty line becomes a wheel segment, and the animated spin makes the outcome easy for a room, class, stream, or meeting to follow.",
          "If you only need the quickest possible draw from a name list, a plain name picker may be more efficient. The wheel is better when presentation matters: projecting to a classroom, sharing a screen in a remote meeting, or adding a little ceremony to an otherwise simple decision.",
        ],
      },
      {
        heading: "Recommended workflow",
        paragraphs: [
          "Wheel readability depends on short labels. Restaurant names, ticket codes, seat numbers, task names, team names, and prize labels usually work well. Long sentences and very large lists become hard to read on the wheel. Clean large lists in Excel or Google Sheets first.",
          "The winner can be copied after the spin, but the page does not keep a draw history for you. If you need repeated no-duplicate draws, remove the winning line manually before spinning again, or use a list picker that supports remove-after-picking behavior.",
        ],
        items: [
          "Use one option per line and keep labels short",
          "Clean large lists in a spreadsheet before pasting",
          "Copy the winner before refreshing the page",
          "Remove winners manually when later spins should not repeat",
        ],
      },
      {
        heading: "Limits and human checks",
        paragraphs: [
          "The wheel runs in your browser, and the option list is not uploaded to FunnyTools. That makes it convenient for quick local use, but it also means the site is not keeping records for you.",
          "Use this tool for everyday decisions and lightweight audience interaction. For high-value prizes, regulated raffles, or disputed outcomes, prepare official rules, clean the eligible list, and keep whatever records your event requires.",
        ],
      },
    ],
    examples: [
      "Spin a restaurant list to decide where to eat tonight.",
      "Pick a classroom group, question, or next presenter.",
      "Choose a small prize or activity task during an event.",
      "Select the next meeting prompt or discussion topic.",
    ],
    audience: [
      "Teachers and hosts who want the draw to be visible on a screen.",
      "Friends, families, and small teams making informal choices.",
      "Organizers choosing from short option lists during live activities.",
    ],
    caseStudies: [
      {
        title: "Classroom question wheel",
        description: "A teacher uses short topic labels, projects the wheel, and copies the selected topic into the lesson notes.",
      },
      {
        title: "Event task draw",
        description: "A host spins the wheel for an icebreaker task, then removes the task manually before the next round.",
      },
      {
        title: "Dinner choice",
        description: "Friends paste restaurant names, spin once, copy the winner, and then check opening hours in a map app.",
      },
    ],
    notes: [
      "Long labels and very large lists are harder to read on a wheel.",
      "The tool does not automatically store draw history.",
      "Use a formal process for regulated or high-value drawings.",
    ],
    faq: [
      {
        q: "Does every option have the same chance?",
        a: "Yes. Every non-empty line becomes one wheel segment with the same weight.",
      },
      {
        q: "Can I paste many options?",
        a: "Yes, but very long lists make labels harder to read. Use short codes when the wheel will be projected.",
      },
      {
        q: "Are winners removed automatically?",
        a: "No. Remove the winning line manually if later spins should not repeat the same result.",
      },
      {
        q: "Is my list saved?",
        a: "No. The list runs in your browser and is not stored by the site.",
      },
      {
        q: "Can I use it for official raffles?",
        a: "It is best for informal use. Follow formal event rules for regulated, audited, or high-value drawings.",
      },
    ],
    instructions: [
      'Enter one option per line in the textarea.',
      'Press Spin and watch the wheel animate to a random result.',
      'Copy the winner when you need to share or record it.',
      'Edit the list and spin again whenever the options change.',
    ],


    labels: {
      input: 'Options',
      placeholder: 'Pizza\nRamen\nBento\nHot pot',
      spin: 'Spin',
      copy: 'Copy winner',
      clear: 'Reset sample',
      result: 'Winner',
      waiting: 'Ready to spin',
      emptyError: 'Enter at least one option.',
      copied: 'Copied!',
      oneOption: 'Only one option is available, so it wins.',
    },
  },
} satisfies Record<'zh' | 'en', ToolContent>;
