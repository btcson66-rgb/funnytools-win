import type { ToolContent } from './_types';

export default {
  zh: {
    name: '隨機姓名抽選器',
    short: '從名單中公平抽出一個或多個名字。',
    long: '隨機姓名抽選器適合課堂點名、活動抽獎、會議分工與任何需要從名單中公平選出人選的場合。貼上一行一個名字，選擇抽一位或多位，也可以在抽出後自動從名單移除，避免重複中選。',
    seoTitle: '隨機姓名抽選器｜免費線上名單抽籤工具',
    seoDescription: '免費線上隨機姓名抽選器，支援一行一名、抽一位、抽多位、抽後移除、結果複製，適合課堂、活動與團隊抽籤。',
    keywords: ['隨機姓名', '抽籤工具', '名單抽選', 'Random Name Picker'],
    instructions: [
      '將姓名或項目貼到文字框中，每一行放一個名字。',
      '保留「抽出後從名單移除」可避免同一個名字被重複抽中。',
      '按「抽 1 位」快速抽出單一結果，或輸入數量後按「抽多位」。',
      '確認結果後可以複製，或重設名單重新開始。',
    ],
    examples: [
      '老師從學生名單中公平抽人回答問題。',
      '活動主持人從報名者中抽出得獎者。',
      '團隊會議隨機指定今天的記錄或簡報順序。',
      '朋友聚會從候選餐廳或遊戲中抽出一個選項。',
    ],
    audience: [
      '需要在課堂中公平抽人回答問題、上台報告或分配任務的老師。',
      '舉辦抽獎、抽籤或隨機點名的活動主持人與社群經營者。',
      '想用隨機方式決定會議記錄、簡報順序或值日生的團隊成員。',
      '朋友聚會時需要從候選選項中隨機挑出一個結果的人。',
    ],
    caseStudies: [
      {
        title: '課堂隨機點名',
        description: '老師把全班名單貼入工具，每次上課隨機抽一位同學回答問題，讓每位學生都有平等的發言機會。',
      },
      {
        title: '線上活動抽獎',
        description: '社群小編把留言者名單整理後貼入，抽出 3 位得獎者並複製結果，直接公布在貼文或群組中。',
      },
      {
        title: '會議角色分配',
        description: '團隊把成員名字貼入工具，每週隨機抽出會議記錄者與時間控管者，避免總是由同一個人負責。',
      },
    ],
    notes: [
      '抽選結果由瀏覽器內建的隨機數產生，適合日常用途但不適用於需要密碼學等級隨機性的場合。',
      '同名者建議加上編號或代碼，避免抽選結果無法辨識。',
      '名單不會儲存在伺服器，重新整理頁面後所有輸入會清除。',
    ],
    faq: [
      {
        q: '名單會上傳到伺服器嗎？',
        a: '不會。抽選邏輯在你的瀏覽器中執行，貼上的名單不會送出到網站伺服器。',
      },
      {
        q: '可以一次抽出多人嗎？',
        a: '可以。輸入需要的人數後按「抽多位」，工具會從目前名單中抽出指定數量。',
      },
      {
        q: '抽出後移除是什麼意思？',
        a: '啟用後，被抽中的名字會從文字框移除，下一次抽選時不會再出現。',
      },
      {
        q: '空白行會影響抽選嗎？',
        a: '不會。工具會忽略空白行，只使用有內容的行作為候選項目。',
      },
      {
        q: '手機可以使用嗎？',
        a: '可以。手機瀏覽器直接開啟本頁即可貼上名單並抽選，不需要安裝任何 App。',
      },
      {
        q: '抽選結果可以匯出嗎？',
        a: '可以用「複製結果」按鈕複製文字，貼到訊息、簡報或文件中；目前沒有直接匯出檔案的功能。',
      },
    ],
    privacyNote: '你貼入的名單與抽選結果完全在瀏覽器本機處理，不會上傳到本站或第三方伺服器。關閉或重新整理頁面後資料即消失。',
    labels: {
      input: '姓名或項目',
      placeholder: '王小明\n陳怡君\nAlex\nMia',
      pickOne: '抽 1 位',
      pickMany: '抽多位',
      countLabel: '抽幾位？',
      removePicked: '抽出後從名單移除',
      reset: '重設名單',
      result: '抽選結果',
      emptyResult: '結果會顯示在這裡',
      emptyListError: '請先輸入至少一個名字或項目。',
      tooManyError: '抽選數量不能大於目前剩餘項目數。',
      invalidCountError: '請輸入有效的抽選數量。',
      copy: '複製結果',
      copied: '已複製',
      spinning: '抽選中...',
    },
  },
  en: {
    name: 'Random Name Picker',
    short: 'Pick one or many names fairly from a pasted list.',
    long: 'Random Name Picker helps you choose people, entries, or options from a simple line-by-line list. Use it for classrooms, giveaways, meeting roles, or small decisions, with an optional no-replacement mode that removes picked names from the list.',
    seoTitle: 'Random Name Picker | Free online list picker',
    seoDescription: 'Use a free random name picker for classes, giveaways, meetings, and teams. Paste one name per line, pick one or many, remove winners, and copy results.',
    keywords: ['random name picker', 'name picker', 'raffle picker', 'classroom picker'],
    instructions: [
      'Paste names or items into the textarea, with one entry on each line.',
      'Keep “Remove after picking” enabled if each name should be picked only once.',
      'Press “Pick 1” for a single result, or enter a number and press “Pick N”.',
      'Copy the result or reset the list when you want to start again.',
    ],
    examples: [
      'Pick a student to answer the next classroom question.',
      'Choose winners from event registrations or comment lists.',
      'Assign meeting roles such as note taker or first presenter.',
      'Select a restaurant, activity, or game from a shared shortlist.',
    ],
    audience: [
      'Teachers who need a fair way to call on students for questions, presentations, or task assignments.',
      'Event hosts and community managers running giveaways, raffles, or random roll calls.',
      'Team members who want to randomly assign meeting roles like note-taker or presenter order.',
      'Friends choosing a restaurant, game, or activity from a shared shortlist.',
    ],
    caseStudies: [
      {
        title: 'Classroom random call',
        description: 'A teacher pastes the class roster and picks one student each lesson to answer a question, giving everyone an equal chance to participate.',
      },
      {
        title: 'Online giveaway draw',
        description: 'A social media manager collects commenter names, picks three winners, and copies the result directly into the announcement post.',
      },
      {
        title: 'Meeting role assignment',
        description: 'A team pastes member names and picks a note-taker and timekeeper each week so the same person does not always volunteer.',
      },
    ],
    notes: [
      'Randomness comes from the browser\'s built-in random number generator — suitable for everyday use but not for cryptographic purposes.',
      'Add a number or code next to duplicate names so picked results are easy to identify.',
      'Names are not saved on any server; refreshing or closing the page clears all input.',
    ],
    faq: [
      {
        q: 'Are my names uploaded anywhere?',
        a: 'No. The picking logic runs in your browser, and the list is not sent to a server.',
      },
      {
        q: 'Can I pick several names at once?',
        a: 'Yes. Enter the number you need and use Pick N to draw multiple results from the current list.',
      },
      {
        q: 'What does remove after picking do?',
        a: 'When enabled, picked names are removed from the textarea so they cannot be picked again in the next draw.',
      },
      {
        q: 'Do blank lines count?',
        a: 'No. Blank lines are ignored; only lines with text are used as entries.',
      },
      {
        q: 'Does it work on mobile?',
        a: 'Yes. Open this page in any mobile browser, paste your list, and pick — no app install required.',
      },
      {
        q: 'Can I export the results?',
        a: 'Use the Copy Result button to copy the text, then paste it into a message, slide, or document. There is no direct file export.',
      },
    ],
    privacyNote: 'Your pasted list and pick results are processed entirely in your browser and never uploaded to this site or any third-party server. Data disappears when you close or refresh the page.',
    labels: {
      input: 'Names or items',
      placeholder: 'Avery\nJordan\nMia\nLeo',
      pickOne: 'Pick 1',
      pickMany: 'Pick N',
      countLabel: 'How many?',
      removePicked: 'Remove after picking',
      reset: 'Reset list',
      result: 'Result',
      emptyResult: 'Your picked name appears here',
      emptyListError: 'Enter at least one name or item first.',
      tooManyError: 'Pick count cannot be larger than the remaining items.',
      invalidCountError: 'Enter a valid pick count.',
      copy: 'Copy result',
      copied: 'Copied',
      spinning: 'Picking...',
    },
  },
} satisfies Record<'zh' | 'en', ToolContent>;

