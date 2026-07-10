interface ToolContent {
  name: string;
  short: string;
  long: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  instructions: string[];
  examples: string[];
  faq: { q: string; a: string }[];
  labels: Record<string, string>;
  disclaimer?: string;
  privacyNote?: string;
}

export default {
  zh: {
    name: '二選一決定器',
    short: '在兩個選項之間用 50/50 機率快速決定。',
    long: '二選一決定器適合處理兩個差不多的選項。輸入 A 與 B，按下決定後會短暫交替顯示，最後以 50/50 機率選出其中一個。',
    seoTitle: '二選一決定器｜隨機選擇與快速決策',
    seoDescription: '輸入兩個選項，用 50/50 隨機機率快速決定 A 或 B，可重新決定與複製結果。',
    keywords: ['二選一', 'this or that', 'choice picker', 'random decision'],
    instructions: [
      '輸入 Option A 與 Option B。',
      '按下決定，工具會短暫在兩個選項間切換。',
      '查看最後選出的選項。',
      '需要時可以重新決定或複製結果。',
    ],
    examples: [
      '在兩家餐廳、兩部電影或兩個活動間做選擇。',
      '快速決定先做哪一個任務。',
      '讓朋友之間的平手選項有一個公平結果。',
      '把瑣碎小決定從討論中移除。',
    ],
    faq: [
      {
        q: '機率真的是一半一半嗎？',
        a: '是。每次決定都用瀏覽器隨機數在 A 與 B 之間選一個。',
      },
      {
        q: '可以只填一個選項嗎？',
        a: '不行。二選一需要兩個有效選項，否則工具會提示你補齊。',
      },
      {
        q: '重新決定會沿用同一組選項嗎？',
        a: '會。只要不改文字，重新決定會用目前的 A 與 B 再抽一次。',
      },
      {
        q: '適合重要決策嗎？',
        a: '它適合日常小決策與娛樂用途。重要決策仍應依照資訊、風險與責任判斷。',
      },
    ],
    labels: {
      optionA: '選項 A',
      optionB: '選項 B',
      placeholderA: '火鍋',
      placeholderB: '拉麵',
      decide: '決定',
      copy: '複製結果',
      reset: '重設',
      result: '選中的選項',
      waiting: '輸入兩個選項後開始',
      error: '請填入兩個選項。',
      copied: '已複製',
    },
  },
  en: {
    name: 'This or That Picker',
    short: 'A 50/50 decider: make a quick random choice between two options.',
    long: 'This or That Picker is a 50/50 decider and random decision maker for when two options feel equally good. Enter Option A and Option B, press Decide, watch the brief alternating animation, and get one fair result with a true 50/50 chance — like a coin flip, but with your actual choices on screen.',
    seoTitle: 'This or That Picker | Free 50/50 Decider',
    seoDescription: '50/50 decider: enter two options, get one random fair pick.',
    keywords: ['50/50 decider', '50 50 decision maker', '50/50 chooser', 'this or that generator', 'random decision maker', 'A or B picker'],
    instructions: [
      'Enter Option A and Option B.',
      'Press Decide and watch the brief alternating animation.',
      'Review the final chosen option.',
      'Re-decide or copy the result when needed.',
    ],
    examples: [
      'Choose between two restaurants, movies, or activities.',
      'Decide which task to do first.',
      'Break a tie between two equally good choices.',
      'Remove small decisions from a group discussion.',
    ],
    faq: [
      {
        q: 'Is it really 50/50?',
        a: 'Yes. Each decision uses a browser random number to choose between A and B.',
      },
      {
        q: 'How is this different from flipping a coin?',
        a: 'The odds are the same — a fair 50/50. The difference is that you see your actual options on screen instead of remembering which side means what, you can re-decide instantly, and you can copy the result to share it.',
      },
      {
        q: 'Can I fill only one option?',
        a: 'No. A this-or-that choice needs two valid options, so the tool asks you to fill both fields.',
      },
      {
        q: 'Does re-deciding reuse the same options?',
        a: 'Yes. Unless you change the text, re-deciding uses the current A and B values again.',
      },
      {
        q: 'Should I use this for serious decisions?',
        a: 'Use it for everyday low-stakes choices and fun. Serious decisions still need context, evidence, and judgment.',
      },
    ],
    labels: {
      optionA: 'Option A',
      optionB: 'Option B',
      placeholderA: 'Pizza',
      placeholderB: 'Ramen',
      decide: 'Decide',
      copy: 'Copy result',
      reset: 'Reset',
      result: 'Chosen option',
      waiting: 'Enter two options to start',
      error: 'Fill in both options.',
      copied: 'Copied!',
    },
  },
} satisfies Record<'zh' | 'en', ToolContent>;
