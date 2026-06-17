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
    name: '流程圖製作工具',
    short: '建立流程矩形、決策菱形與箭頭連線，可拖曳、改文字並匯出 PNG。',
    long: '流程圖製作工具讓你在瀏覽器中建立簡單流程圖。可新增流程矩形與決策菱形、雙擊修改文字、拖曳節點、用連線模式建立箭頭，並匯出 PNG 圖片。',
    seoTitle: '流程圖製作工具｜免費線上流程圖與 PNG 匯出',
    seoDescription: '免費線上流程圖工具，可建立流程節點、決策菱形、箭頭連線，支援拖曳、文字編輯、刪除與 PNG 匯出。',
    keywords: ['流程圖', '流程圖製作', 'flowchart maker', '線上流程圖', 'PNG 匯出'],
    instructions: [
      '按新增流程或新增決策，在畫布上放入節點。',
      '雙擊節點修改文字，拖曳節點調整位置。',
      '切換到連線模式，先點來源節點，再點目標節點建立箭頭。',
      '選取節點或箭頭後可刪除，完成後匯出 PNG。',
    ],
    examples: [
      '整理工作流程、審核步驟、客服回覆或課堂流程。',
      '快速畫出是否判斷、分支流程與簡單系統邏輯。',
      '把流程圖匯出成 PNG 放入簡報、文件或任務說明。',
    ],
    faq: [
      {
        q: '可以新增哪些節點？',
        a: '目前提供流程矩形與決策菱形，適合簡單流程圖、分支圖與操作步驟。',
      },
      {
        q: '如何修改節點文字？',
        a: '在畫布上雙擊節點，輸入新的文字後確認即可更新。',
      },
      {
        q: '匯出的 PNG 會包含所有節點與箭頭嗎？',
        a: '會。工具會依目前畫布狀態重新繪製，再下載一張 PNG 圖片。',
      },
    ],
    labels: {
      toolbar: '流程圖工具列',
      selectMove: '選取/移動',
      connect: '連線',
      addProcess: '新增流程',
      addDecision: '新增決策',
      deleteSelected: '刪除選取',
      clearAll: '清除全部',
      exportPng: '匯出 PNG',
      canvasLabel: '流程圖畫布',
      processText: '流程',
      decisionText: '決策？',
      editPrompt: '編輯節點文字',
      connectFirst: '請先點來源節點',
      connectSecond: '請點目標節點',
      selectedNode: '已選取節點',
      selectedEdge: '已選取箭頭',
      nothingSelected: '未選取項目',
      confirmClear: '要清除整張流程圖嗎？',
    },
    privacyNote: '流程圖節點與連線只存在於本機瀏覽器中。匯出 PNG 時不會上傳圖面資料。',
  },
  en: {
    name: 'Flowchart Maker',
    short: 'Build simple flowcharts with editable nodes, arrows, dragging, delete, and PNG export.',
    long: 'Flowchart Maker lets you build simple diagrams in the browser. Add process rectangles and decision diamonds, double-click to edit text, drag nodes, connect nodes with arrows, delete selected items, and export PNG.',
    seoTitle: 'Flowchart Maker | Free online diagram tool with PNG export',
    seoDescription: 'Create simple flowcharts online with process nodes, decision diamonds, arrows, dragging, text editing, delete, clear, and PNG export.',
    keywords: ['flowchart maker', 'online flowchart', 'diagram tool', 'process diagram', 'PNG export'],
    instructions: [
      'Use Add process or Add decision to place nodes on the canvas.',
      'Double-click a node to edit its text, and drag nodes to reposition them.',
      'Switch to Connect mode, click a source node, then click a target node to add an arrow.',
      'Select a node or arrow to delete it, then export PNG when the diagram is ready.',
    ],
    examples: [
      'Map work procedures, approval steps, support replies, or classroom sequences.',
      'Sketch decisions, branches, and simple system logic.',
      'Export PNG for slides, documents, tickets, or task notes.',
    ],
    faq: [
      {
        q: 'Which node types are available?',
        a: 'The tool includes process rectangles and decision diamonds for simple workflows, branches, and step diagrams.',
      },
      {
        q: 'How do I edit node text?',
        a: 'Double-click a node on the canvas, enter the new text, and confirm.',
      },
      {
        q: 'Does PNG export include all nodes and arrows?',
        a: 'Yes. The tool re-renders the current diagram state and downloads it as a PNG image.',
      },
    ],
    labels: {
      toolbar: 'Flowchart toolbar',
      selectMove: 'Select/Move',
      connect: 'Connect',
      addProcess: 'Add process',
      addDecision: 'Add decision',
      deleteSelected: 'Delete selected',
      clearAll: 'Clear all',
      exportPng: 'Export PNG',
      canvasLabel: 'Flowchart canvas',
      processText: 'Process',
      decisionText: 'Decision?',
      editPrompt: 'Edit node text',
      connectFirst: 'Click a source node',
      connectSecond: 'Click a target node',
      selectedNode: 'Selected node',
      selectedEdge: 'Selected arrow',
      nothingSelected: 'Nothing selected',
      confirmClear: 'Clear the whole flowchart?',
    },
    privacyNote: 'The flowchart nodes and arrows stay in your browser. PNG export is generated locally without uploading the diagram.',
  },
} satisfies Record<'zh' | 'en', ToolContent>;
