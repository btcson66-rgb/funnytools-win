import type { ToolContent } from './_types';

export default {
  zh: {
    name: '骰子產生器',
    short: '擲出常見骰面並計算總點數，適合遊戲、課堂與快速決策。',
    long: '骰子產生器支援 d4、d6、d8、d10、d12 與 d20，可一次擲 1 到 20 顆骰子。工具會顯示每顆骰子的結果與總點數，並用短暫動畫讓抽取過程更清楚。',
    seoTitle: '骰子產生器｜免費線上擲骰工具',
    seoDescription: '線上擲 d4、d6、d8、d10、d12、d20 骰子，可設定數量、顯示單顆結果與總點數。',
    keywords: ['骰子產生器', '線上擲骰', 'dice roller', 'd20'],
    capabilities: [
      "支援 d4、d6、d8、d10、d12、d20，並可一次擲 1 到 20 顆。",
    ],
    contentSections: [
      {
        heading: "骰子產生器適合解決的工作",
        paragraphs: [
          "適合沒有實體骰子、需要遠端共享結果，或想快速擲多顆骰子的情境。桌遊、TRPG、課堂機率活動、破冰遊戲與臨時決策都能使用。",
          "不同骰面代表不同用途：d6 常見於一般遊戲，d20 常見於 TRPG 判定，d10 可用於百分比或等級表。一次擲多顆時，總點數會自動計算，適合傷害、資源、分數或機率練習。",
        ],
      },
      {
        heading: "建議使用流程",
        paragraphs: [
          "不同骰面代表不同用途：d6 常見於一般遊戲，d20 常見於 TRPG 判定，d10 可用於百分比或等級表。一次擲多顆時，總點數會自動計算，適合傷害、資源、分數或機率練習。",
          "遠端跑團或線上課堂可以擲骰後複製結果貼到聊天室或紀錄表。若是需要長期追蹤的角色數值、傷害紀錄或遊戲日誌，建議把結果複製到自己的文件，而不是只依賴當前頁面。",
        ],
        items: [
          "d20 適合判定，d6 適合常見桌遊與課堂活動",
          "多顆骰子的總和可用於傷害、分數或資源計算",
          "複製結果可貼到聊天、角色卡或試算表",
          "短期結果不會看起來完全平均",
        ],
      },
      {
        heading: "每一顆骰子實際怎麼產生",
        paragraphs: [
          "程式使用瀏覽器的 crypto.getRandomValues 取得 32 位元亂數，不使用 Math.random()。針對 d6 等不能整除 2³² 的面數，程式會先拒絕落在不完整尾端區間的值，再取餘數並加 1，得到 1 到骰面數的整數；這避免直接取模造成某些點數有極小但不必要的偏差。若瀏覽器無法提供安全亂數來源，畫面會停止並顯示錯誤。",
          "一次擲多顆時，每顆都各自呼叫同一方法，最後只把整數點數相加，沒有四捨五入。短動畫顯示的是循環預覽；真正結果在動畫開始前已經產生，動畫速度或停留畫面不會改變最後點數。",
        ],
      },
      {
        heading: "國中機率課的數字例子",
        paragraphs: [
          "一顆公平 d6 的 1 到 6 各有 1/6 機會，理論平均點數是 (1+2+3+4+5+6)÷6=3.5；兩顆 d6 的理論總和平均是 7，但總和 7 有 6 種組合，總和 2 只有 1 種，所以各總和並不是等機率。老師可讓全班各擲 10 次、合併成 300 次後再比較次數；不要用某位學生只有 10 次的結果判定骰子是否公平。",
          "若要檢查相對次數，可先建立 1 到 6 六欄計數表。擲 60 次時，每個點數的理論期望次數是 10，但實際出現 7、12 或 14 次都不必然異常；增加試驗次數後，應觀察各點相對次數是否逐漸接近 1/6，而不是要求每一批恰好平均。本站只保留當次最多 20 顆的結果，跨批資料要由使用者自行複製或登記。",
        ],
      },
      {
        heading: "課堂操作與結果紀錄",
        paragraphs: [
          "若全班共用投影畫面，先固定骰面與每次顆數，再指定一位學生記錄，避免看到不喜歡的點數就重擲。遠端課堂可把每次複製結果貼到共用表格，並保留總試驗次數；工具沒有帳號、歷史紀錄或鎖定規則，重新整理後無法還原先前結果。",
        ],
      },
      {
        heading: "限制與需要人工判斷的部分",
        paragraphs: [
          "這個工具適合遊戲、教學與日常決策，不適合賭博、金流、抽獎、公證或需要審計的隨機流程。短期連續高點或低點是正常現象，不代表工具壞掉。",
        ],
      },
      {
        heading: "需要從學生名單抽人時",
        paragraphs: [
          "骰子適合固定面數的規則；若候選人數不是 4、6、8、10、12 或 20，或需要抽出後移除，應直接使用名單抽選，避免自行規定重擲區間造成流程混亂。",
        ],
        link: {
          prefix: "改用",
          label: "隨機姓名抽選器處理班級名單與不重複抽選",
          href: "/tools/random-name-picker/",
          suffix: "，並在抽選前確認缺席、同名與重複列。",
        },
      },
    ],
    examples: [
      "TRPG 玩家擲 d20 判定技能，並複製結果到聊天室。",
      "桌遊臨時缺骰子時，用 d6 一次擲多顆。",
      "老師用多次擲骰結果做機率分布示範。",
      "活動主持人用骰子決定題目、關卡或出場順序。",
    ],
    audience: [
      "需要快速處理骰子產生器工作的人。",
    ],
    caseStudies: [
      {
        title: "桌遊回合判定",
        description: "主持人擲 d20 判定角色行動結果，並把重要結果記到遊戲紀錄中。",
      },
      {
        title: "機率課堂示範",
        description: "老師多次擲 d6，讓學生觀察少量樣本不一定平均分布。",
      },
      {
        title: "活動破冰選題",
        description: "主持人用骰子在多個低風險破冰題目中快速選出下一題。",
      },
    ],
    notes: [
      "這個工具適合遊戲、教學與日常決策，不適合賭博、金流、抽獎、公證或需要審計的隨機流程。短期連續高點或低點是正常現象，不代表工具壞掉。",
      "支援面數固定為 d4、d6、d8、d10、d12、d20，每次只能擲 1 到 20 顆整數顆數。",
      "安全亂數不代表短期結果會平均，也不提供可供第三方重播的種子、簽章或不可竄改稽核紀錄。",
    ],
    formula: {
      expression: '單顆點數 = crypto.getRandomValues 的 32 位元值經拒絕取樣後 mod s + 1；總點數 = Σ各顆點數',
      explanation: 's 是所選骰面數。程式拒絕大於等於 floor(2³²/s)×s 的值，再映射到 1 至 s；多顆骰子的顯示總和為整數加總，不做四捨五入。',
    },
    educationApplication: '可用來示範理論機率與實驗相對次數的差別。應先固定骰面、擲骰次數與紀錄方式，再合併足夠多次結果；少量樣本出現連號、全是偶數或高點集中都可能只是隨機波動，不能單憑看起來不平均就下結論。',
    reportTip: '課堂紀錄可寫成：「使用 d6 共擲 300 次，記錄各點數次數並與理論機率 1/6 比較。」本頁只顯示當次結果，不會自動保存跨次數據。',
    sources: [
      {
        label: 'W3C Web Cryptography：getRandomValues',
        href: 'https://www.w3.org/TR/webcrypto/#Crypto-method-getRandomValues',
        note: '規格說明此 API 產生密碼學強度亂數；本站再以拒絕取樣映射到骰面，避免直接取模偏差。',
      },
    ],
    faq: [
      {
        q: "支援哪些骰子？",
        a: "支援常見的 d4、d6、d8、d10、d12 與 d20，並可設定同時擲出的數量。",
      },
      {
        q: "可以一次擲幾顆？",
        a: "目前可一次擲 1 到 20 顆骰子，工具會顯示每顆結果與總點數。",
      },
      {
        q: "結果可以複製嗎？",
        a: "可以。擲骰後可複製結果，貼到聊天室、角色卡、試算表或活動紀錄。",
      },
      {
        q: "為什麼連續擲到很高或很低？",
        a: "短期隨機結果本來就可能集中或連續，這不代表骰子一定有問題。",
      },
      {
        q: "可以用來賭博或正式抽獎嗎？",
        a: "不建議。這個工具是遊戲、教學與日常決策用途，不是受監管或公證的隨機系統。",
      },
    ],
    instructions: [
      '選擇骰子面數，例如 d6 或 d20。',
      '設定要同時擲出的骰子數量，範圍為 1 到 20。',
      '按下擲骰，等待短暫動畫結束。',
      '查看每顆骰子的點數與總和，需要時複製結果。',
    ],
    labels: {
      diceType: '骰子類型',
      count: '骰子數量',
      roll: '擲骰',
      copy: '複製結果',
      result: '擲骰結果',
      total: '總點數',
      dice: '每顆骰子',
      placeholder: '按下擲骰開始',
      rolling: '擲骰中...',
      countError: '骰子數量必須是 1 到 20 的整數。',
      copied: '已複製',
      cryptoError: '此瀏覽器無法提供安全亂數來源，因此沒有產生擲骰結果。',
    },
  },
  en: {
    name: 'Dice Roller',
    short: 'Roll common dice for games, classes, and quick decisions.',
    long: 'Roll d4, d6, d8, d10, d12, or d20 dice in your browser. Choose from 1 to 20 dice, watch a short rolling animation, then see each die result and the total.',
    seoTitle: 'Dice Roller | Free online d4 d6 d20 roller',
    seoDescription: 'Roll d4, d6, d8, d10, d12, and d20 dice online. Choose count, see each die, total the result, and copy it.',
    keywords: ['dice roller', 'online dice', 'd20 roller', 'roll dice'],
    capabilities: [
      "Roll d4, d6, d8, d10, d12, or d20 dice, with 1 to 20 dice at once.",
    ],
    contentSections: [
      {
        heading: "What Dice Roller is useful for",
        paragraphs: [
          "Use it when you do not have physical dice nearby, when a remote group needs a shared result, or when rolling many dice by hand would slow the activity down. It fits tabletop games, TRPG sessions, classroom probability activities, party games, and quick random decisions.",
          "Different dice fit different tasks. A d6 is common for board games and classroom examples. A d20 is common for TRPG checks. A d10 can support percentage-style tables or level rolls. Multiple dice are totaled automatically.",
        ],
      },
      {
        heading: "Recommended workflow",
        paragraphs: [
          "Different dice fit different tasks. A d6 is common for board games and classroom examples. A d20 is common for TRPG checks. A d10 can support percentage-style tables or level rolls. Multiple dice are totaled automatically.",
          "For remote play or online teaching, copy the result into chat or a shared note so everyone has the same record. For character sheets, damage logs, or classroom data, paste repeated results into a spreadsheet for later review.",
        ],
        items: [
          "Use d20 for checks and d6 for many common games",
          "Use totals for damage, score, or resource calculations",
          "Copy results into chat, character sheets, or spreadsheets",
          "Expect short runs to be uneven sometimes",
        ],
      },
      {
        heading: "Limits and human checks",
        paragraphs: [
          "This dice roller is intended for games, teaching, demonstrations, and everyday decisions. It is not designed for gambling, payments, notarized drawings, regulated lotteries, or audited random processes. Short random sequences can include streaks.",
          "This dice roller is intended for games, teaching, demonstrations, and everyday decisions. It is not designed for gambling, payments, notarized drawings, regulated lotteries, or audited random processes. Short random sequences can include streaks. After using the tool, move the result into the next workflow step: download it, copy it, paste it into Excel or Google Sheets, add it to a document, or test it in the real publishing environment.",
        ],
      },
    ],
    examples: [
      "Roll one d20 for a TRPG skill check and copy the result into chat.",
      "Roll multiple d6 when physical dice are missing from a board game.",
      "Use repeated rolls in a classroom probability demonstration.",
      "Choose an activity, challenge, or turn order during an event.",
    ],
    audience: [
      "People who need a quick dice roller workflow in the browser.",
    ],
    caseStudies: [
      {
        title: "Remote TRPG check",
        description: "A player rolls one d20, copies the result into chat, and the game master applies the character modifier.",
      },
      {
        title: "Probability lesson",
        description: "A teacher rolls d6 many times, pastes results into a spreadsheet, and shows how distribution changes with sample size.",
      },
      {
        title: "Activity decision",
        description: "A host uses dice to choose the next challenge and copies the result into the event notes to avoid disputes later.",
      },
    ],
    notes: [
      "This dice roller is intended for games, teaching, demonstrations, and everyday decisions. It is not designed for gambling, payments, notarized drawings, regulated lotteries, or audited random processes. Short random sequences can include streaks.",
    ],
    faq: [
      {
        q: "Which dice are supported?",
        a: "The tool supports d4, d6, d8, d10, d12, and d20 dice.",
      },
      {
        q: "How many dice can I roll at once?",
        a: "You can roll from 1 to 20 dice at once, and the tool shows individual results plus the total.",
      },
      {
        q: "Can I copy the result?",
        a: "Yes. Copy the result into chat, a character sheet, a spreadsheet, or an activity log.",
      },
      {
        q: "Why do I see several high or low rolls in a row?",
        a: "Short random sequences can be uneven. Streaks can happen without indicating a problem.",
      },
      {
        q: "Can I use this for gambling or official drawings?",
        a: "No. It is intended for games, teaching, and everyday decisions, not regulated or audited random processes.",
      },
    ],
    instructions: [
      'Choose the die type, such as d6 or d20.',
      'Set how many dice to roll from 1 to 20.',
      'Press Roll and wait for the short animation.',
      'Review each die and the total, then copy the result if needed.',
    ],
    labels: {
      diceType: 'Dice type',
      count: 'Dice count',
      roll: 'Roll',
      copy: 'Copy result',
      result: 'Roll result',
      total: 'Total',
      dice: 'Dice',
      placeholder: 'Press Roll to start',
      rolling: 'Rolling...',
      countError: 'Dice count must be an integer from 1 to 20.',
      copied: 'Copied!',
      cryptoError: 'This browser cannot provide a secure random source, so no dice result was generated.',
    },
  },
} satisfies Record<'zh' | 'en', ToolContent>;
