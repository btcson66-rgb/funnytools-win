type StressBand = 'low' | 'moderate' | 'high' | 'veryHigh';

interface StressQuestion {
  statement: string;
}

interface StressResult {
  title: string;
  description: string;
  suggestion: string;
}

interface StressWidget {
  questions: StressQuestion[];
  results: Record<StressBand, StressResult>;
}

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
  widget: StressWidget;
  disclaimer?: string;
  privacyNote?: string;
}

export default {
  zh: {
    name: '壓力程度測驗',
    short: '用簡短題目檢視近期壓力狀態。',
    long: '壓力程度測驗是一個輕量自我反思工具，透過近期感受、睡眠、專注與身體訊號整理壓力傾向。它不是臨床量表，也不能診斷任何身心狀況。',
    seoTitle: '壓力程度測驗｜非診斷的自我反思小測驗',
    seoDescription: '回答近期壓力相關題目，取得低、中、高或很高壓力傾向與自我照顧提醒。非醫療建議。',
    keywords: ['壓力測驗', 'stress level test', '壓力自評', 'self reflection quiz'],
    instructions: [
      '回想最近一到兩週的實際狀態。',
      '每題選擇最接近的頻率，不需要追求完美答案。',
      '完成後閱讀壓力傾向與照顧提醒。',
      '若你感到痛苦或有安全疑慮，請直接尋求專業或緊急協助。',
    ],
    examples: [
      '在忙碌週期中快速檢視自己是否需要休息。',
      '把結果當作寫日記或與可信任的人談話的開端。',
      '提醒自己觀察睡眠、專注與身體緊繃等壓力訊號。',
    ],
    faq: [
      {
        q: '這是醫療或心理診斷嗎？',
        a: '不是。它只是非臨床自我反思測驗，不能診斷焦慮、憂鬱或其他健康狀況。',
      },
      {
        q: '如果結果很高代表什麼？',
        a: '代表你在本測驗的近期壓力訊號較多。若你感到難以承受、持續失眠、恐慌或有自傷想法，請盡快聯絡專業人員或當地緊急資源。',
      },
      {
        q: '答案會被保存嗎？',
        a: '不會。分數只在瀏覽器中計算，重新整理後就消失。',
      },
    ],
    labels: {
      questionOf: '第 {current} / {total} 題',
      progress: '進度',
      resultTitle: '你的壓力傾向',
      scoreLabel: '分數',
      never: '幾乎沒有',
      sometimes: '有時',
      often: '經常',
      almostAlways: '幾乎一直',
      suggestion: '自我照顧提醒',
      resultDisclaimer: '這不是醫療建議或診斷；若你感到痛苦、持續失眠、恐慌或有自傷想法，請盡快聯絡心理師、醫師或當地緊急資源。',
      retake: '重新測驗',
      share: '分享結果',
      copyResult: '複製結果',
      copied: '已複製',
    },
    widget: {
      questions: [
        { statement: '最近我覺得事情多到難以負荷。' },
        { statement: '我比平常更難放鬆或停下思緒。' },
        { statement: '睡眠品質、入睡或醒來狀態受到影響。' },
        { statement: '我更容易煩躁、焦急或對小事失去耐心。' },
        { statement: '我覺得專注、記憶或做決定變得比較困難。' },
        { statement: '身體出現緊繃、頭痛、胃不舒服或疲憊感。' },
        { statement: '我開始拖延或逃避原本重要的事情。' },
        { statement: '我很難享受平常會讓我恢復精神的活動。' },
        { statement: '我感覺自己缺少支持，或不想讓別人知道狀況。' },
        { statement: '即使休息後，我仍覺得能量很低。' },
      ],
      results: {
        low: {
          title: '低壓力訊號',
          description: '你的近期壓力訊號相對少，可能仍有一定恢復空間。',
          suggestion: '維持規律睡眠、活動與界線，並持續觀察壓力變化。',
        },
        moderate: {
          title: '中等壓力訊號',
          description: '你可能累積了一些壓力，已經影響部分情緒、專注或身體狀態。',
          suggestion: '安排可執行的小休息，減少非必要承諾，並找可信任的人談談。',
        },
        high: {
          title: '高壓力訊號',
          description: '你的壓力訊號偏多，可能需要更主動地調整工作量、休息與支持來源。',
          suggestion: '若狀態持續或影響日常功能，建議聯絡心理師、醫師或員工協助資源。',
        },
        veryHigh: {
          title: '很高壓力訊號',
          description: '你回報了許多近期壓力訊號，這可能表示目前負荷已經偏高。',
          suggestion: '請優先確保安全與支持。若你感到痛苦、恐慌、無法休息或有自傷想法，請立即聯絡專業或當地緊急資源。',
        },
      },
    },
    disclaimer: '此測驗不是醫療建議、臨床量表或診斷工具。若你感到痛苦、持續失眠、恐慌、無法工作生活，或有自傷想法，請盡快尋求心理師、醫師或當地緊急資源協助。',
  },
  en: {
    name: 'Stress Level Test',
    short: 'Check recent stress signals with a short self-test.',
    long: 'Stress Level Test is a light self-reflection quiz about recent feelings, sleep, focus, and body signals. It is not a clinical scale and cannot diagnose any mental or physical health condition.',
    seoTitle: 'Stress Level Test | Non-diagnostic self-reflection quiz',
    seoDescription: 'Answer recent stress questions and get a low, moderate, high, or very high stress tendency with self-care prompts. Not medical advice.',
    keywords: ['stress level test', 'stress quiz', 'stress self check', 'self reflection quiz'],
    instructions: [
      'Think about your actual experience over the last one to two weeks.',
      'Choose the frequency that fits each statement best; there is no perfect answer.',
      'Read the stress tendency and self-care prompt after finishing.',
      'If you feel distressed or unsafe, seek professional or emergency help directly.',
    ],
    examples: [
      'Check whether a busy period is starting to require more rest.',
      'Use the result as a starting point for journaling or a trusted conversation.',
      'Notice stress signals such as sleep disruption, focus difficulty, and body tension.',
    ],
    faq: [
      {
        q: 'Is this a medical or psychological diagnosis?',
        a: 'No. It is a non-clinical self-reflection quiz and cannot diagnose anxiety, depression, or any health condition.',
      },
      {
        q: 'What does a very high result mean?',
        a: 'It means you selected many recent stress signals in this quiz. If you feel overwhelmed, cannot sleep, have panic symptoms, or have thoughts of self-harm, contact a professional or local emergency resource as soon as possible.',
      },
      {
        q: 'Are my answers saved?',
        a: 'No. Scores are calculated in your browser and disappear after refresh.',
      },
    ],
    labels: {
      questionOf: 'Question {current} of {total}',
      progress: 'Progress',
      resultTitle: 'Your stress tendency',
      scoreLabel: 'Score',
      never: 'Rarely',
      sometimes: 'Sometimes',
      often: 'Often',
      almostAlways: 'Almost always',
      suggestion: 'Self-care prompt',
      resultDisclaimer: 'This is not medical advice or a diagnosis. If you feel distressed, cannot sleep, have panic symptoms, or have thoughts of self-harm, contact a mental health professional, doctor, or local emergency resource as soon as possible.',
      retake: 'Retake',
      share: 'Share result',
      copyResult: 'Copy result',
      copied: 'Copied',
    },
    widget: {
      questions: [
        { statement: 'Recently, I have felt like there is more to handle than I can carry.' },
        { statement: 'It has been harder than usual to relax or stop my thoughts.' },
        { statement: 'My sleep quality, falling asleep, or waking state has been affected.' },
        { statement: 'I have been more irritable, tense, or impatient with small things.' },
        { statement: 'Focus, memory, or decision-making has felt harder than usual.' },
        { statement: 'My body has shown tension, headaches, stomach discomfort, or fatigue.' },
        { statement: 'I have been delaying or avoiding things that matter.' },
        { statement: 'It has been hard to enjoy activities that usually restore me.' },
        { statement: 'I have felt unsupported or reluctant to let others know how I am doing.' },
        { statement: 'Even after resting, my energy has still felt low.' },
      ],
      results: {
        low: {
          title: 'Low stress signals',
          description: 'You reported relatively few recent stress signals and may still have room to recover.',
          suggestion: 'Keep steady sleep, movement, and boundaries, and continue noticing changes in stress.',
        },
        moderate: {
          title: 'Moderate stress signals',
          description: 'Some stress may be building and touching mood, focus, or body state.',
          suggestion: 'Schedule small realistic breaks, reduce nonessential commitments, and talk with someone you trust.',
        },
        high: {
          title: 'High stress signals',
          description: 'You reported many stress signals and may need more active support, rest, or workload adjustment.',
          suggestion: 'If this continues or affects daily functioning, consider contacting a therapist, doctor, or employee support resource.',
        },
        veryHigh: {
          title: 'Very high stress signals',
          description: 'You reported many recent stress signals, which may mean your current load is heavy.',
          suggestion: 'Prioritize safety and support. If you feel distressed, panicky, unable to rest, or have thoughts of self-harm, contact professional or local emergency support immediately.',
        },
      },
    },
    disclaimer: 'This quiz is not medical advice, a clinical scale, or a diagnostic tool. If you feel distressed, cannot sleep, have panic symptoms, cannot function in daily life, or have thoughts of self-harm, seek help from a mental health professional, doctor, or local emergency resource as soon as possible.',
  },
} satisfies Record<'zh' | 'en', ToolContent>;

