type WorkType = 'planner' | 'connector' | 'builder' | 'explorer';

interface WorkOption {
  label: string;
  type: WorkType;
}

interface WorkQuestion {
  question: string;
  options: WorkOption[];
}

interface WorkResult {
  typeName: string;
  description: string;
  traits: string[];
  bestFit: string;
  growthTip: string;
}

interface WorkWidget {
  questions: WorkQuestion[];
  results: Record<WorkType, WorkResult>;
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
  widget: WorkWidget;
  disclaimer?: string;
  privacyNote?: string;
}

export default {
  zh: {
    name: '工作性格測驗',
    short: '快速整理工作風格與合作偏好。',
    long: '工作性格測驗用日常職場情境整理你的合作節奏、決策方式與偏好的任務型態。結果分為規劃者、連結者、實作者與探索者，適合作為自我反思與團隊破冰。',
    seoTitle: '工作性格測驗｜免費職場風格小測驗',
    seoDescription: '回答簡短工作情境題，了解你的工作風格、合作偏好、適合情境與成長提醒。',
    keywords: ['工作性格測驗', 'work personality test', '職場風格', 'team style quiz'],
    instructions: [
      '依照直覺選擇最像你的工作反應。',
      '完成所有題目後查看最接近的工作風格。',
      '閱讀特質、適合情境與成長提醒。',
      '可複製或分享結果，重新測驗也不會保存舊答案。',
    ],
    examples: [
      '團隊建立時讓成員快速理解彼此合作偏好。',
      '面試或職涯整理前，描述自己的工作方式。',
      '在專案分工前討論誰適合規劃、協調、執行或探索。',
    ],
    faq: [
      {
        q: '這是正式心理測驗嗎？',
        a: '不是。它是輕量自我反思工具，不應用來做診斷、人事評分或職涯決定的唯一依據。',
      },
      {
        q: '結果會固定不變嗎？',
        a: '不一定。工作風格會受角色、壓力、團隊文化與當下任務影響。',
      },
      {
        q: '答案會被記錄嗎？',
        a: '不會。分數只在瀏覽器中計算，重新整理後就消失。',
      },
    ],
    labels: {
      questionOf: '第 {current} / {total} 題',
      progress: '進度',
      optionA: 'A',
      optionB: 'B',
      optionC: 'C',
      optionD: 'D',
      resultTitle: '你的工作風格',
      traits: '主要特質',
      bestFit: '適合情境',
      growthTip: '成長提醒',
      retake: '重新測驗',
      share: '分享結果',
      copyResult: '複製結果',
      copied: '已複製',
    },
    widget: {
      questions: [
        {
          question: '新專案剛開始時，你通常最想先做什麼？',
          options: [
            { label: '把目標、時程與風險拆清楚。', type: 'planner' },
            { label: '先確認大家期待與溝通方式。', type: 'connector' },
            { label: '快速做出第一版讓事情動起來。', type: 'builder' },
            { label: '蒐集可能方向，找出新的切入點。', type: 'explorer' },
          ],
        },
        {
          question: '會議中意見分歧時，你比較常扮演哪個角色？',
          options: [
            { label: '整理選項與決策標準。', type: 'planner' },
            { label: '讓每個人都被聽見。', type: 'connector' },
            { label: '提出能立刻測試的做法。', type: 'builder' },
            { label: '問一個讓大家換角度的問題。', type: 'explorer' },
          ],
        },
        {
          question: '面對模糊任務，你的第一反應是？',
          options: [
            { label: '先定義範圍與完成標準。', type: 'planner' },
            { label: '找利害關係人對齊需求。', type: 'connector' },
            { label: '做出原型，再用結果校正。', type: 'builder' },
            { label: '探索資料、案例與其他可能性。', type: 'explorer' },
          ],
        },
        {
          question: '你最有成就感的工作時刻是？',
          options: [
            { label: '複雜計畫如期落地。', type: 'planner' },
            { label: '團隊合作變得更順暢。', type: 'connector' },
            { label: '親手把想法變成可用成果。', type: 'builder' },
            { label: '找到別人沒想到的機會。', type: 'explorer' },
          ],
        },
        {
          question: '當期限逼近，你最自然的做法是？',
          options: [
            { label: '重排優先順序並控管風險。', type: 'planner' },
            { label: '協調支援，避免團隊卡住。', type: 'connector' },
            { label: '集中火力完成最重要部分。', type: 'builder' },
            { label: '找出更簡單或更聰明的路徑。', type: 'explorer' },
          ],
        },
        {
          question: '你偏好的回饋方式是？',
          options: [
            { label: '具體指出目標、指標與下一步。', type: 'planner' },
            { label: '先理解對方感受再討論改善。', type: 'connector' },
            { label: '直接看成果哪裡能改得更好。', type: 'builder' },
            { label: '討論背後假設與替代可能。', type: 'explorer' },
          ],
        },
        {
          question: '挑選工作工具時，你最重視？',
          options: [
            { label: '流程清楚、可追蹤、少出錯。', type: 'planner' },
            { label: '大家容易上手、合作順暢。', type: 'connector' },
            { label: '速度快，可以馬上完成任務。', type: 'builder' },
            { label: '彈性高，可以支援新想法。', type: 'explorer' },
          ],
        },
        {
          question: '如果團隊士氣低落，你會先？',
          options: [
            { label: '釐清阻礙並重設可達成里程碑。', type: 'planner' },
            { label: '主動關心大家狀態與壓力。', type: 'connector' },
            { label: '帶頭完成一件小事建立動能。', type: 'builder' },
            { label: '提出新的方向讓大家看見可能。', type: 'explorer' },
          ],
        },
        {
          question: '你最不喜歡哪種工作狀態？',
          options: [
            { label: '目標一直變，沒有人管理依賴。', type: 'planner' },
            { label: '溝通冷漠，彼此互不信任。', type: 'connector' },
            { label: '討論很多，但沒有實際推進。', type: 'builder' },
            { label: '只照舊方法，沒有探索空間。', type: 'explorer' },
          ],
        },
        {
          question: '別人最常稱讚你的工作能力是？',
          options: [
            { label: '可靠、有條理、能把事情排好。', type: 'planner' },
            { label: '善於協調，讓合作更舒服。', type: 'connector' },
            { label: '行動快，能把東西做出來。', type: 'builder' },
            { label: '點子多，能看見新的可能。', type: 'explorer' },
          ],
        },
      ],
      results: {
        planner: {
          typeName: '規劃者',
          description: '你擅長把混亂整理成路線圖，重視承諾、節奏與可預期結果。',
          traits: ['結構感強', '重視風險', '可靠交付'],
          bestFit: '適合專案管理、營運規劃、流程改善與需要穩定推進的任務。',
          growthTip: '保留一點實驗空間，能讓計畫更能適應變化。',
        },
        connector: {
          typeName: '連結者',
          description: '你重視關係、信任與共同理解，常能讓不同立場的人重新對齊。',
          traits: ['同理心', '溝通協調', '團隊凝聚'],
          bestFit: '適合跨部門協作、客戶溝通、教學引導與團隊文化工作。',
          growthTip: '在照顧大家感受時，也要明確說出界線與優先順序。',
        },
        builder: {
          typeName: '實作者',
          description: '你喜歡把想法變成看得見的成果，透過行動與測試快速學習。',
          traits: ['行動力', '務實', '快速迭代'],
          bestFit: '適合產品原型、執行落地、問題排除與需要速度的任務。',
          growthTip: '在衝刺前先確認方向，可避免做出很多不需要的工作。',
        },
        explorer: {
          typeName: '探索者',
          description: '你擅長發現模式、提出可能性，能在模糊情境中找到新方向。',
          traits: ['好奇心', '創意', '策略視角'],
          bestFit: '適合研究、創意發想、策略探索與需要重新定義問題的任務。',
          growthTip: '把點子收斂成清楚下一步，能讓更多人跟上你的想法。',
        },
      },
    },
    disclaimer: '此測驗是娛樂與自我反思工具，不是正式心理測評、人事評鑑或職涯診斷。',
  },
  en: {
    name: 'Work Personality Test',
    short: 'Summarize work style and collaboration preferences.',
    long: 'Work Personality Test uses everyday workplace scenarios to reflect your collaboration rhythm, decision style, and preferred task shape. Results include Planner, Connector, Builder, and Explorer styles for self-reflection and team icebreakers.',
    seoTitle: 'Work Personality Test | Free workplace style quiz',
    seoDescription: 'Answer short workplace scenario questions to learn your work style, collaboration preferences, best-fit settings, and growth tip.',
    keywords: ['work personality test', 'work style quiz', 'team style quiz', 'workplace personality'],
    instructions: [
      'Choose the answer that feels most like your natural work response.',
      'Complete every question to see your closest work style.',
      'Read the traits, best-fit setting, and growth tip.',
      'Copy or share the result; retaking the quiz does not save old answers.',
    ],
    examples: [
      'Help a new team understand collaboration preferences quickly.',
      'Describe your work style before an interview or career reflection.',
      'Discuss who is comfortable planning, coordinating, building, or exploring before assigning project roles.',
    ],
    faq: [
      {
        q: 'Is this a formal psychological assessment?',
        a: 'No. It is a lightweight self-reflection tool and should not be used as a diagnosis, performance score, or sole career basis.',
      },
      {
        q: 'Will my result always stay the same?',
        a: 'Not necessarily. Work style can shift with role, pressure, team culture, and the task in front of you.',
      },
      {
        q: 'Are my answers recorded?',
        a: 'No. Scores are calculated in your browser and disappear after refresh.',
      },
    ],
    labels: {
      questionOf: 'Question {current} of {total}',
      progress: 'Progress',
      optionA: 'A',
      optionB: 'B',
      optionC: 'C',
      optionD: 'D',
      resultTitle: 'Your work style',
      traits: 'Key traits',
      bestFit: 'Best fit',
      growthTip: 'Growth tip',
      retake: 'Retake',
      share: 'Share result',
      copyResult: 'Copy result',
      copied: 'Copied',
    },
    widget: {
      questions: [
        {
          question: 'When a new project starts, what do you most want to do first?',
          options: [
            { label: 'Clarify goals, timeline, and risks.', type: 'planner' },
            { label: 'Align expectations and communication style.', type: 'connector' },
            { label: 'Create a first version so things start moving.', type: 'builder' },
            { label: 'Explore possible directions and fresh angles.', type: 'explorer' },
          ],
        },
        {
          question: 'When opinions split in a meeting, which role feels natural?',
          options: [
            { label: 'Organize the options and decision criteria.', type: 'planner' },
            { label: 'Make sure everyone feels heard.', type: 'connector' },
            { label: 'Suggest something the team can test right away.', type: 'builder' },
            { label: 'Ask a question that shifts the frame.', type: 'explorer' },
          ],
        },
        {
          question: 'When a task is vague, your first response is to:',
          options: [
            { label: 'Define scope and completion standards.', type: 'planner' },
            { label: 'Talk with stakeholders to align needs.', type: 'connector' },
            { label: 'Build a prototype and learn from the result.', type: 'builder' },
            { label: 'Research examples, data, and possibilities.', type: 'explorer' },
          ],
        },
        {
          question: 'Which work moment feels most satisfying?',
          options: [
            { label: 'A complex plan lands on schedule.', type: 'planner' },
            { label: 'Team collaboration becomes easier.', type: 'connector' },
            { label: 'An idea becomes a usable result.', type: 'builder' },
            { label: 'You discover an opportunity others missed.', type: 'explorer' },
          ],
        },
        {
          question: 'When a deadline is close, what do you naturally do?',
          options: [
            { label: 'Reset priorities and manage risk.', type: 'planner' },
            { label: 'Coordinate support so nobody gets stuck.', type: 'connector' },
            { label: 'Focus hard on finishing the most important piece.', type: 'builder' },
            { label: 'Find a simpler or smarter path.', type: 'explorer' },
          ],
        },
        {
          question: 'What feedback style do you prefer?',
          options: [
            { label: 'Specific goals, measures, and next steps.', type: 'planner' },
            { label: 'Understand feelings before discussing improvement.', type: 'connector' },
            { label: 'Look directly at what can be improved in the work.', type: 'builder' },
            { label: 'Discuss assumptions and alternative possibilities.', type: 'explorer' },
          ],
        },
        {
          question: 'When choosing a work tool, what matters most?',
          options: [
            { label: 'Clear process, tracking, and fewer errors.', type: 'planner' },
            { label: 'Easy adoption and smoother collaboration.', type: 'connector' },
            { label: 'Speed and immediate task completion.', type: 'builder' },
            { label: 'Flexibility for new ideas.', type: 'explorer' },
          ],
        },
        {
          question: 'If team energy drops, what do you try first?',
          options: [
            { label: 'Clarify blockers and reset reachable milestones.', type: 'planner' },
            { label: 'Check how people are feeling and what pressure they carry.', type: 'connector' },
            { label: 'Lead one small win to rebuild momentum.', type: 'builder' },
            { label: 'Offer a new direction that makes possibility visible.', type: 'explorer' },
          ],
        },
        {
          question: 'Which work state frustrates you most?',
          options: [
            { label: 'Goals keep changing and dependencies are unmanaged.', type: 'planner' },
            { label: 'Communication is cold and trust is low.', type: 'connector' },
            { label: 'There is lots of talk but little progress.', type: 'builder' },
            { label: 'Only old methods are allowed, with no exploration room.', type: 'explorer' },
          ],
        },
        {
          question: 'What do people most often appreciate about your work?',
          options: [
            { label: 'Reliable, organized, and good at sequencing work.', type: 'planner' },
            { label: 'Good coordination and comfortable collaboration.', type: 'connector' },
            { label: 'Fast action and ability to make things real.', type: 'builder' },
            { label: 'Many ideas and a view of new possibilities.', type: 'explorer' },
          ],
        },
      ],
      results: {
        planner: {
          typeName: 'Planner',
          description: 'You turn ambiguity into a route map and care about commitments, rhythm, and predictable results.',
          traits: ['Structured', 'Risk-aware', 'Reliable delivery'],
          bestFit: 'Project management, operations planning, process improvement, and work that needs steady progress.',
          growthTip: 'Leave some room for experiments so the plan can adapt when conditions change.',
        },
        connector: {
          typeName: 'Connector',
          description: 'You value relationships, trust, and shared understanding, and you often help different positions realign.',
          traits: ['Empathy', 'Coordination', 'Team cohesion'],
          bestFit: 'Cross-functional collaboration, customer communication, teaching, facilitation, and team culture work.',
          growthTip: 'While caring for people, name boundaries and priorities clearly.',
        },
        builder: {
          typeName: 'Builder',
          description: 'You like turning ideas into visible outcomes and learn quickly through action and testing.',
          traits: ['Action-oriented', 'Practical', 'Fast iteration'],
          bestFit: 'Prototyping, execution, troubleshooting, and tasks where speed matters.',
          growthTip: 'Confirm direction before sprinting so you avoid building work nobody needs.',
        },
        explorer: {
          typeName: 'Explorer',
          description: 'You notice patterns and possibilities, and you can find fresh direction in unclear situations.',
          traits: ['Curiosity', 'Creativity', 'Strategic perspective'],
          bestFit: 'Research, ideation, strategy exploration, and tasks that need the problem reframed.',
          growthTip: 'Turn ideas into clear next steps so more people can follow your thinking.',
        },
      },
    },
    disclaimer: 'This quiz is for entertainment and self-reflection only. It is not a formal psychological assessment, performance evaluation, or career diagnosis.',
  },
} satisfies Record<'zh' | 'en', ToolContent>;

