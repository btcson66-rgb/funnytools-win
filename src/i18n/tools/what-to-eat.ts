interface ToolContent {
  name: string;
  short: string;
  long: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  capabilities?: string[];
  instructions: string[];
  examples: string[];
  audience?: string[];
  caseStudies?: { title: string; description: string }[];
  notes?: string[];
  faq: { q: string; a: string }[];
  labels: Record<string, string>;
  disclaimer?: string;
  privacyNote?: string;
}

export default {
  zh: {
    name: '今天吃什麼',
    short: '從餐點分類與自訂清單中隨機決定下一餐。',
    long: '今天吃什麼工具內建台灣常見、中式、日式、西式、速食與健康餐等分類，也能加入自己的候選清單。按下決定後會快速洗牌並抽出一個餐點，省下反覆猶豫的時間。',
    seoTitle: '今天吃什麼｜午餐、晚餐隨機選擇與美食決定器',
    seoDescription: '不知道今天吃什麼？從台灣常見、中式、日式、西式、速食與健康餐分類中隨機選午餐或晚餐，也可加入自訂候選清單。',
    keywords: ['今天吃什麼', '晚餐吃什麼', '午餐選擇', 'food picker', 'what to eat'],
    capabilities: [
      '從台灣常見、中式、日式、西式、速食與健康餐等分類隨機抽出一個餐點。',
      '把附近餐廳、團購選項或冰箱現有食材加入自訂清單再抽選。',
      '重新抽取不同結果，用一個簡單限制結束午餐、晚餐或宵夜的選擇猶豫。',
    ],
    instructions: [
      '勾選想納入的餐點分類。',
      '如果有自己的店家或餐點，輸入在自訂清單中，每行一個。',
      '按下決定，工具會從所有候選項中隨機抽出一個。',
      '可複製結果或重設回預設分類。',
    ],
    examples: [
      '午餐前快速從便當、麵食、日式或健康餐中挑一個。',
      '把附近餐廳加入自訂清單，讓選擇更貼近生活圈。',
      '朋友聚餐時讓工具公平抽出餐廳方向。',
      '避免每天都花太久思考晚餐。',
    ],
    audience: [
      '每天在午餐、晚餐或宵夜之間難以決定的上班族與學生。',
      '想讓朋友、家人或同事從共同可接受清單中公平選一家餐廳的人。',
      '有飲食限制、預算或距離條件，希望先篩選再隨機決定的使用者。',
    ],
    caseStudies: [
      {
        title: '公司午餐投票前先抽選',
        description: '同事先列出步行十分鐘內、預算可接受的餐廳，再由工具抽出當天選項，減少在群組來回討論的時間。',
      },
      {
        title: '週末家庭外食決定',
        description: '家人先排除過敏、不吃與當日沒營業的選項，將其餘餐廳放入自訂清單，以隨機結果作為共同決定。',
      },
    ],
    notes: [
      '隨機結果不會判斷餐廳是否營業、距離、價格或排隊情況，出發前仍要查詢最新資訊。',
      '有過敏、宗教、素食或醫療飲食限制時，請先移除不適合的候選選項。',
      '如果抽到完全不想吃的結果，可把它視為偏好提示，調整清單後再抽一次。',
    ],
    faq: [
      {
        q: '內建清單可以改嗎？',
        a: '內建分類不能直接編輯，但你可以取消勾選分類，並在自訂清單加入自己的餐點或店名。',
      },
      {
        q: '自訂項目怎麼輸入？',
        a: '每行輸入一個餐點或店名，工具會把它們與勾選分類合併後一起抽選。',
      },
      {
        q: '沒有勾選分類也可以用嗎？',
        a: '可以，只要自訂清單至少有一個項目即可。',
      },
      {
        q: '結果真的隨機嗎？',
        a: '工具使用瀏覽器的 Math.random 從候選項中選一個，適合日常決策與娛樂用途。',
      },
      {
        q: '有過敏或飲食限制時可以用嗎？',
        a: '可以，但請先取消不適合的分類，並只把確認可食用的餐點放入自訂清單。工具不會自動辨識食材與過敏原。',
      },
    ],
    labels: {
      categories: '餐點分類',
      custom: '自訂餐點',
      customPlaceholder: '牛肉麵\n韓式拌飯\n公司附近便當店',
      decide: '決定',
      copy: '複製結果',
      reset: '重設',
      result: '今天吃',
      waiting: '先選分類或輸入餐點',
      emptyError: '請至少勾選一個分類或輸入一個自訂餐點。',
      copied: '已複製',
      categoriesJson: JSON.stringify([
        { id: 'taiwan', label: '台灣常見', items: ['滷肉飯', '牛肉麵', '雞肉飯', '水餃', '炒飯', '鍋貼', '鹽酥雞', '便當'] },
        { id: 'chinese', label: '中式', items: ['麻婆豆腐飯', '燒臘飯', '酸辣湯麵', '炒麵', '小籠包', '粥品', '熱炒', '砂鍋魚頭'] },
        { id: 'japanese', label: '日式', items: ['拉麵', '壽司', '咖哩飯', '丼飯', '烏龍麵', '豬排飯', '章魚燒', '日式定食'] },
        { id: 'western', label: '西式', items: ['義大利麵', '漢堡', '披薩', '沙威瑪', '牛排', '三明治', '焗烤飯', '墨西哥捲'] },
        { id: 'fast', label: '速食', items: ['炸雞', '薯條套餐', '熱狗堡', '速食漢堡', '雞塊', '披薩外送', '潛艇堡', '早餐店套餐'] },
        { id: 'healthy', label: '健康餐', items: ['舒肥雞胸餐', '沙拉碗', '地瓜雞肉餐', '蔬食便當', '鮭魚飯盒', '豆腐蔬菜碗', '燕麥優格', '清湯麵'] },
      ]),
    },
  },
  en: {
    name: 'What Should I Eat',
    short: 'Choose a meal from built-in categories or your own shortlist.',
    long: 'What Should I Eat includes built-in bilingual meal categories such as Chinese, Japanese, Western, fast food, and healthy choices. Add your own restaurants or dishes, then let the tool shuffle and pick one when decision fatigue hits.',
    seoTitle: 'What Should I Eat | Free random meal picker',
    seoDescription: 'Randomly choose lunch, dinner, or snack ideas from built-in food categories and custom items.',
    keywords: ['what should I eat', 'meal picker', 'dinner picker', 'random food generator'],
    instructions: [
      'Select the food categories you want to include.',
      'Add custom restaurants or dishes, one per line, if you have local favorites.',
      'Press Decide to pick one item from the combined candidate list.',
      'Copy the result or reset the tool to the default categories.',
    ],
    examples: [
      'Pick lunch from Chinese, Japanese, Western, fast food, or healthy categories.',
      'Add nearby restaurants so the suggestions fit your area.',
      'Let a group choose a dinner direction fairly.',
      'Cut down the time spent debating what to eat.',
    ],
    faq: [
      {
        q: 'Can I edit the built-in lists?',
        a: 'You cannot edit the built-in categories directly, but you can uncheck categories and add your own items in the custom list.',
      },
      {
        q: 'How do custom items work?',
        a: 'Enter one dish or restaurant per line. Custom items are merged with selected categories before the random pick.',
      },
      {
        q: 'Can I use only custom items?',
        a: 'Yes. Uncheck every category and enter at least one custom item.',
      },
      {
        q: 'Is the choice random?',
        a: 'The tool uses browser Math.random to pick from the current candidate list, which is appropriate for everyday decisions and fun.',
      },
      {
        q: 'Can I use it with allergies or dietary restrictions?',
        a: 'Yes, but disable unsuitable categories and only add confirmed-safe meals to your custom list. The tool cannot identify ingredients or allergens.',
      },
    ],
    labels: {
      categories: 'Categories',
      custom: 'Custom items',
      customPlaceholder: 'Taco place\nChicken rice\nCafe near work',
      decide: 'Decide',
      copy: 'Copy result',
      reset: 'Reset',
      result: 'Eat this',
      waiting: 'Select categories or add items',
      emptyError: 'Select at least one category or enter one custom item.',
      copied: 'Copied!',
      categoriesJson: JSON.stringify([
        { id: 'chinese', label: 'Chinese', items: ['Beef noodle soup', 'Fried rice', 'Dumplings', 'Mapo tofu rice', 'BBQ pork rice', 'Hot pot', 'Congee', 'Scallion pancakes'] },
        { id: 'japanese', label: 'Japanese', items: ['Ramen', 'Sushi', 'Katsu curry', 'Donburi', 'Udon', 'Bento', 'Takoyaki', 'Teriyaki set'] },
        { id: 'western', label: 'Western', items: ['Pasta', 'Burger', 'Pizza', 'Steak', 'Sandwich', 'Baked rice', 'Tacos', 'Roast chicken'] },
        { id: 'fast', label: 'Fast food', items: ['Fried chicken', 'Fries combo', 'Cheeseburger', 'Chicken nuggets', 'Sub sandwich', 'Hot dog', 'Pizza delivery', 'Breakfast sandwich'] },
        { id: 'healthy', label: 'Healthy', items: ['Chicken salad bowl', 'Grain bowl', 'Salmon rice box', 'Vegetarian bento', 'Tofu veggie bowl', 'Soup noodles', 'Oat yogurt', 'Sweet potato chicken plate'] },
      ]),
    },
  },
} satisfies Record<'zh' | 'en', ToolContent>;
