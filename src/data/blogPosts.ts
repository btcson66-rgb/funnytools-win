import type { Locale } from '../config/site';

export type LocalizedText = Record<Locale, string>;

export interface BlogToolLink {
  slug: string;
  label: LocalizedText;
  note: LocalizedText;
}

export interface BlogSubsection {
  heading: LocalizedText;
  paragraphs: LocalizedText[];
}

export interface BlogSection {
  heading: LocalizedText;
  paragraphs: LocalizedText[];
  subsections?: BlogSubsection[];
}

export interface BlogPost {
  slug: string;
  locales: Locale[];
  title: LocalizedText;
  description: LocalizedText;
  summary: LocalizedText;
  published: string;
  updated: string;
  categorySlug?: string;
  categoryLabel?: LocalizedText;
  relatedArticleSlugs?: string[];
  toolLinks: BlogToolLink[];
  sections: BlogSection[];
  faq: { question: LocalizedText; answer: LocalizedText }[];
}

export interface BlogToolLinkView {
  slug: string;
  label: string;
  note: string;
}

export interface BlogSubsectionView {
  heading: string;
  paragraphs: string[];
}

export interface BlogSectionView {
  heading: string;
  paragraphs: string[];
  subsections?: BlogSubsectionView[];
}

export interface BlogPostView {
  slug: string;
  locales: Locale[];
  title: string;
  description: string;
  summary: string;
  published: string;
  updated: string;
  categorySlug?: string;
  categoryLabel?: string;
  relatedArticleSlugs?: string[];
  toolLinks: BlogToolLinkView[];
  sections: BlogSectionView[];
  faq: { question: string; answer: string }[];
}

export interface RawBlogToolLink {
  slug: string;
  label: string;
  note: string;
}

export interface RawBlogSubsection {
  heading: string;
  paragraphs: string[];
}

export interface RawBlogSection {
  heading: string;
  paragraphs: string[];
  subsections?: RawBlogSubsection[];
}

export interface RawBlogPost {
  slug: string;
  title: string;
  description: string;
  summary: string;
  published: string;
  updated: string;
  categorySlug?: string;
  categoryLabel?: string;
  relatedArticleSlugs?: string[];
  toolLinks: RawBlogToolLink[];
  sections: RawBlogSection[];
  faq: { question: string; answer: string }[];
}

type EnglishBlogSectionContent = {
  heading: string;
  paragraphs: string[];
  subsections?: { heading: string; paragraphs: string[] }[];
};

type EnglishBlogPostContent = {
  title: string;
  description: string;
  summary: string;
  categoryLabel?: string;
  toolLinks: Omit<RawBlogToolLink, 'slug'>[];
  sections: EnglishBlogSectionContent[];
  faq: { question: string; answer: string }[];
};

const bilingualPillarSlugs = new Set([
  'teacher-exam-score-guide',
  't-score-pr-guide',
  'classroom-random-tools-guide',
  'pdf-workflow-guide',
  'image-format-workflow-guide',
]);

function text(zh: string, en?: string): LocalizedText {
  return { zh, en: en ?? zh };
}

function localizeRawPost(post: RawBlogPost): BlogPost {
  const en = englishPillarContent[post.slug];
  const locales: Locale[] = bilingualPillarSlugs.has(post.slug) && en ? ['zh', 'en'] : ['zh'];

  return {
    ...post,
    locales,
    title: text(post.title, en?.title),
    description: text(post.description, en?.description),
    summary: text(post.summary, en?.summary),
    categoryLabel: post.categoryLabel ? text(post.categoryLabel, en?.categoryLabel) : undefined,
    toolLinks: post.toolLinks.map((tool, index) => ({
      slug: tool.slug,
      label: text(tool.label, en?.toolLinks[index]?.label),
      note: text(tool.note, en?.toolLinks[index]?.note),
    })),
    sections: post.sections.map((section, index) => ({
      heading: text(section.heading, en?.sections[index]?.heading),
      paragraphs: section.paragraphs.map((paragraph, paragraphIndex) =>
        text(paragraph, en?.sections[index]?.paragraphs[paragraphIndex]),
      ),
      subsections: section.subsections?.map((subsection, subsectionIndex) => ({
        heading: text(subsection.heading, en?.sections[index]?.subsections?.[subsectionIndex]?.heading),
        paragraphs: subsection.paragraphs.map((paragraph, paragraphIndex) =>
          text(paragraph, en?.sections[index]?.subsections?.[subsectionIndex]?.paragraphs[paragraphIndex]),
        ),
      })),
    })),
    faq: post.faq.map((item, index) => ({
      question: text(item.question, en?.faq[index]?.question),
      answer: text(item.answer, en?.faq[index]?.answer),
    })),
  };
}

export function localizeZhPost(post: RawBlogPost): BlogPost {
  return localizeRawPost(post);
}

export function viewBlogPost(post: BlogPost, lang: Locale): BlogPostView {
  return {
    ...post,
    title: post.title[lang],
    description: post.description[lang],
    summary: post.summary[lang],
    categoryLabel: post.categoryLabel?.[lang],
    toolLinks: post.toolLinks.map((tool) => ({
      slug: tool.slug,
      label: tool.label[lang],
      note: tool.note[lang],
    })),
    sections: post.sections.map((section) => ({
      heading: section.heading[lang],
      paragraphs: section.paragraphs.map((paragraph) => paragraph[lang]),
      subsections: section.subsections?.map((subsection) => ({
        heading: subsection.heading[lang],
        paragraphs: subsection.paragraphs.map((paragraph) => paragraph[lang]),
      })),
    })),
    faq: post.faq.map((item) => ({
      question: item.question[lang],
      answer: item.answer[lang],
    })),
  };
}

export function isPostAvailableInLocale(post: BlogPost, lang: Locale): boolean {
  return post.locales.includes(lang);
}

const rawBlogPosts: RawBlogPost[] = [
  {
    slug: 'teacher-exam-score-guide',
    title: '教師甄試成績怎麼估：筆試、口試、試教加權與 T 分數整理',
    description: '用範例整理教師甄試成績加權、T 分數、Z 分數與 PR 百分等級的試算方式，說明筆試、口試、試教權重常見檢查點，並提醒以正式簡章與公告為準。',
    summary: '從加權總分、標準化分數到 PR 判讀，整理教師甄試考生常見的成績試算流程。',
    published: '2026-06-23',
    updated: '2026-06-23',
    categorySlug: 'statistics',
    categoryLabel: '教育統計工具',
    relatedArticleSlugs: ['t-score-pr-guide', 'classroom-random-tools-guide'],
    toolLinks: [
      { slug: 'teacher-exam-score-converter', label: '教師甄試成績轉換模擬器', note: '試算筆試、口試與試教加權總分' },
      { slug: 'weighted-average-calculator', label: '加權平均計算器', note: '檢查權重與總分公式' },
      { slug: 't-score-calculator', label: 'T 分數計算器', note: '將 Z 分數轉成 T 分數量尺' },
      { slug: 'z-score-calculator', label: 'Z 分數計算器', note: '依平均與標準差取得標準分數' },
      { slug: 'percentile-rank-calculator', label: 'PR 百分等級計算器', note: '整理相對位置的描述方式' },
    ],
    sections: [
      {
        heading: '先分清楚：原始分數、加權總分與標準化分數',
        paragraphs: [
          '教師甄試的成績整理通常會同時遇到三種概念：原始分數是單一項目的得分，加權總分是把筆試、口試、試教等項目依比例合成後的結果，標準化分數則是把分數放到同一參照群體中比較。這三者不能混用，否則同一組數字可能被解讀成完全不同的結果。',
          '使用線上工具時，建議先用簡章中的範例或自己手算的小範例測試。確認權重加總、四捨五入方式、分數上限與是否有最低門檻後，再把正式資料輸入。本文所有情境都是說明範例，不代表任何年度、縣市或學校的正式規則。',
        ],
      },
      {
        heading: '建議試算流程',
        paragraphs: [
          '第一步，用加權平均或教師甄試成績轉換工具確認各項配分。例如筆試 70%、口試 15%、試教 15%，就要確認輸入的是 70/15/15 還是 0.7/0.15/0.15，整份表格必須一致。第二步，如果公告使用 Z 分數或 T 分數，先確認平均數與標準差的參照群體，再做轉換。',
          '第三步，把結果轉回容易檢查的文字說明。像是「此範例的加權總分為 82.35」或「z = 1.2，換算 T 分數為 62」。如果需要描述相對位置，再搭配 PR 百分等級，但不要把 PR 當成答對百分比。',
        ],
      },
      {
        heading: '常見錯誤',
        paragraphs: [
          '最常見的錯誤是把加權平均和標準化分數混在一起。例如原始分數先加權，再轉換，和各項先轉換再加權，結果可能不同；正式使用時必須以公告規則為準。另一個錯誤是沒有記錄參照群體，導致平均數、標準差、PR 的來源不清楚。',
          '最後，線上工具可以幫助快速檢查，但不應取代正式簡章、榜單、複查流程或人工核對。尤其牽涉錄取、備取、同分比序或門檻時，請保留原始資料與手算紀錄。',
        ],
      },
    ],
    faq: [
      { question: '教師甄試成績可以直接用加權平均算嗎？', answer: '只有在簡章規則確實是原始分數乘權重後加總時才可以。若有標準化、門檻或同分比序，需依正式公告處理。' },
      { question: 'T 分數和 Z 分數差在哪？', answer: 'Z 分數以平均 0、標準差 1 表示相對位置；T 分數常用平均 50、標準差 10，閱讀上較直覺。' },
      { question: 'PR 百分等級是百分比嗎？', answer: '不是答對百分比，而是描述相對於參照群體的位置。' },
      { question: '可以用這些結果申訴或複查嗎？', answer: '工具結果只能做個人檢查，正式複查仍要依主辦單位規定與原始成績資料。' },
      { question: '要先算 T 分數還是加權總分？', answer: '要看簡章規定。不同順序會得到不同結果，不能自行替換。' },
    ],
  },
  {
    slug: 't-score-pr-guide',
    title: 'T 分數、Z 分數、PR 怎麼看：教育統計快速指南',
    description: '以班級成績與考試情境說明 T 分數、Z 分數、百分等級與排名百分比的差異，整理公式、判讀方式、參照群體、常見誤解與使用限制，幫助老師和考生避免把分數解讀過度簡化。',
    summary: '整理標準分數與百分等級的基本判讀，協助老師、學生與研究生快速檢查成績資料。',
    published: '2026-06-23',
    updated: '2026-06-23',
    categorySlug: 'statistics',
    categoryLabel: '教育統計工具',
    relatedArticleSlugs: ['teacher-exam-score-guide'],
    toolLinks: [
      { slug: 'z-score-calculator', label: 'Z 分數計算器', note: '原始分數轉標準分數' },
      { slug: 't-score-calculator', label: 'T 分數計算器', note: 'Z 分數轉 T 分數' },
      { slug: 'percentile-rank-calculator', label: 'PR 百分等級計算器', note: '估算相對百分等級' },
      { slug: 'class-rank-percentile-calculator', label: '排名百分比計算器', note: '名次轉換相對位置' },
      { slug: 'standard-deviation', label: '標準差計算器', note: '先取得平均與標準差' },
    ],
    sections: [
      {
        heading: 'Z 分數：距離平均幾個標準差',
        paragraphs: [
          'Z 分數用標準差作為單位，描述一個原始分數距離平均數有多遠。z = 0 代表等於平均，z = 1 代表高於平均一個標準差，z = -1 則代表低於平均一個標準差。它適合比較不同量尺的分數，但前提是平均數與標準差來自同一個參照群體。',
        ],
      },
      {
        heading: 'T 分數：把 Z 分數改成較好閱讀的量尺',
        paragraphs: [
          'T 分數常見公式是 T = 50 + 10z。它不改變分數相對位置，只是把平均改成 50、標準差改成 10，避免大量小數與負數。教育測驗或甄試範例中，T 分數常比 Z 分數更容易放進報告表格。',
        ],
      },
      {
        heading: 'PR 與排名百分比：都要看參照群體',
        paragraphs: [
          'PR 百分等級描述的是相對位置，不是答對百分比。排名百分比則通常從名次與總人數估算。兩者都會受到群體大小、同分處理與計算方法影響，因此在正式用途上要說明參照群體與公式。',
        ],
      },
    ],
    faq: [
      { question: 'T 分數越高一定越好嗎？', answer: '在同一參照群體與同一指標下通常代表相對較高，但仍要看測驗目的與正式規則。' },
      { question: 'Z 分數可以直接變成 PR 嗎？', answer: '只有在特定分布假設下才可近似轉換；本工具群以明確輸入資料或名次估算為主。' },
      { question: '排名百分比和 PR 一樣嗎？', answer: '概念接近但計算方式可能不同，尤其遇到同分或不同名次定義時。' },
      { question: '班級人數很少時適合算 PR 嗎？', answer: '可以做參考，但小樣本的百分等級間距很粗，解讀要保守。' },
      { question: '正式報告要寫哪些資訊？', answer: '至少註明平均數、標準差、樣本數、參照群體與使用公式。' },
    ],
  },
  {
    slug: 'classroom-random-tools-guide',
    title: '老師課堂隨機工具整理：抽籤、分組、座位表怎麼搭配',
    description: '整理老師課堂常用的隨機點名、活動分組、座位安排與公平抽籤流程，說明名單清理、課中使用情境、特殊需求調整與工具搭配方式，讓班級活動更順暢也更容易說明。',
    summary: '把隨機點名、分組、座位表與名單抽籤串成一個可重複使用的課堂流程。',
    published: '2026-06-23',
    updated: '2026-06-23',
    categorySlug: 'study',
    categoryLabel: '老師課堂工具',
    relatedArticleSlugs: ['teacher-exam-score-guide'],
    toolLinks: [
      { slug: 'random-student-picker', label: '隨機點名工具', note: '抽學生並避免重複' },
      { slug: 'random-group-generator', label: '隨機分組工具', note: '快速產生活動小組' },
      { slug: 'group-generator', label: '課堂分組工具', note: '依組數或每組人數分組' },
      { slug: 'seating-chart', label: '座位表產生器', note: '整理教室座位安排' },
      { slug: 'random-name-picker', label: '隨機姓名抽選器', note: '處理抽籤與活動名單' },
    ],
    sections: [
      {
        heading: '課前：先整理乾淨名單',
        paragraphs: [
          '課堂隨機工具的品質取決於名單是否乾淨。建議一行一位學生，先移除空白列、重複姓名與備註欄位。若班上有同名學生，可以加入座號或組別，以免抽選或分組時混淆。',
        ],
      },
      {
        heading: '課中：抽點、分組與計時分開處理',
        paragraphs: [
          '隨機點名適合提升參與度，但若要做小組活動，應改用分組工具，避免每次手動抽籤。活動開始後，可以搭配倒數計時器控制討論時間；若成果發表需要公平順序，再使用隨機姓名抽選器。',
        ],
      },
      {
        heading: '課後：座位與分組要保留調整彈性',
        paragraphs: [
          '座位表與分組結果都是初稿。老師仍可能因視力、聽力、特殊需求、請假、設備位置或班級經營考量做調整。工具負責節省時間，最後安排仍應由老師判斷。',
        ],
      },
    ],
    faq: [
      { question: '隨機分組一定公平嗎？', answer: '隨機能降低人為偏好，但不會自動滿足能力、性別、座位或特殊需求限制。' },
      { question: '學生名單會上傳嗎？', answer: '這些工具主要在瀏覽器本機處理，仍建議避免投影完整個資。' },
      { question: '座位表可以列印嗎？', answer: '座位表工具提供可複製與列印的結果，列印前請先檢查欄列與姓名。' },
      { question: '同名學生怎麼辦？', answer: '建議加入座號、組別或其他班級內可辨識但不過度揭露個資的標記。' },
      { question: '可以避免同組重複嗎？', answer: '目前工具適合單次快速分組；若要長期追蹤同組歷史，建議另外保留紀錄。' },
    ],
  },
  {
    slug: 'pdf-workflow-guide',
    title: 'PDF 工具怎麼選：合併、拆分、壓縮、頁面整理一次看',
    description: '比較常見 PDF 任務的處理順序，協助辦公室、學生與教師判斷何時該合併、拆分、壓縮、刪除頁面或重新排序，並提醒交件前的頁碼、檔名與隱私檢查。',
    summary: '從交件、掃描、報告到附件整理，選對 PDF 工具可以少做很多重複工。',
    published: '2026-06-23',
    updated: '2026-06-23',
    categorySlug: 'pdf',
    categoryLabel: 'PDF 工具',
    toolLinks: [
      { slug: 'merge-pdf', label: 'PDF 合併', note: '多份 PDF 合成一份' },
      { slug: 'split-pdf', label: 'PDF 拆分', note: '拆成單頁或指定範圍' },
      { slug: 'pdf-compressor', label: 'PDF 壓縮工具', note: '嘗試縮小 PDF 檔案' },
      { slug: 'pdf-page-reorder', label: 'PDF 頁面重新排序', note: '拖曳調整頁面順序' },
      { slug: 'extract-pdf-pages', label: '擷取 PDF 頁面', note: '只保留指定頁面' },
      { slug: 'delete-pdf-pages', label: '刪除 PDF 頁面', note: '移除空白或錯誤頁' },
      { slug: 'pdf-to-image', label: 'PDF 轉圖片', note: '每頁輸出成圖片' },
      { slug: 'images-to-pdf', label: '圖片轉 PDF', note: '照片或掃描圖合成 PDF' },
    ],
    sections: [
      { heading: '先決定任務類型', paragraphs: ['若你手上是多份文件要交成一份，先用 PDF 合併；若是一份太長的 PDF 要拆出章節，用 PDF 拆分或擷取頁面；若只是有空白頁或錯頁，使用刪除頁面或重新排序會更直接。'] },
      { heading: '建議順序：整理頁面，再壓縮', paragraphs: ['多數情境下，先處理頁面順序、刪除不需要內容、確認頁數，再嘗試壓縮。這樣可以避免先壓縮後又重新輸出，造成重複處理與檔案混亂。壓縮結果不一定會變小，特別是已經最佳化或圖片很多的 PDF。'] },
      { heading: '掃描與照片文件', paragraphs: ['如果資料來源是手機照片，通常先裁切、調整方向與壓縮圖片，再轉成 PDF。若已經是掃描 PDF，則先確認頁面是否歪斜、空白或重複，再用頁面工具整理。正式交件前，務必重新開啟輸出檔。'] },
    ],
    faq: [
      { question: 'PDF 壓縮一定會變小嗎？', answer: '不一定。若原始檔已最佳化或主要容量來自圖片，壓縮效果可能有限。' },
      { question: '合併 PDF 前要先排序嗎？', answer: '建議先確認檔案順序，也可合併後再用頁面重新排序檢查。' },
      { question: '刪除頁面和擷取頁面差在哪？', answer: '刪除頁面是移除指定頁；擷取頁面是只保留指定頁。兩者方向相反。' },
      { question: '檔案會上傳嗎？', answer: 'FunnyTools 的 PDF 工具設計為瀏覽器本機處理，檔案不會主動上傳到伺服器。' },
      { question: '簽章 PDF 可以處理嗎？', answer: '處理後可能影響簽章或表單狀態，正式文件請保留原檔並審慎檢查。' },
    ],
  },
  {
    slug: 'image-format-workflow-guide',
    title: '圖片格式怎麼選：JPG、PNG、WebP、壓縮與 QR Code 實用整理',
    description: '說明圖片壓縮、尺寸調整、裁切與格式轉換的選擇方式，搭配社群、報告、網站圖片與 QR Code 的實際使用情境，整理 JPG、PNG、WebP 常見取捨。',
    summary: '整理 JPG、PNG、WebP 的差異，以及壓縮、縮放、裁切、轉檔與 QR Code 的實用順序。',
    published: '2026-06-23',
    updated: '2026-06-23',
    categorySlug: 'image',
    categoryLabel: '圖片工具',
    toolLinks: [
      { slug: 'image-compressor', label: '圖片壓縮', note: '縮小 JPG、PNG、WebP' },
      { slug: 'image-resizer', label: '圖片尺寸調整', note: '改寬高與比例' },
      { slug: 'image-crop', label: '圖片裁切工具', note: '裁剪大頭貼與縮圖' },
      { slug: 'png-to-jpg', label: 'PNG 轉 JPG', note: '透明背景套底色' },
      { slug: 'jpg-to-png', label: 'JPG 轉 PNG', note: '輸出 PNG 格式' },
      { slug: 'jpg-to-webp', label: 'JPG 轉 WebP', note: '網站圖片優化' },
      { slug: 'webp-to-jpg', label: 'WebP 轉 JPG', note: '轉成相容格式' },
      { slug: 'qr-code-generator', label: 'QR Code 產生器', note: '網址、文字與 Wi-Fi QR Code' },
    ],
    sections: [
      { heading: '格式選擇表', paragraphs: ['照片通常適合 JPG 或 WebP；需要透明背景、線條或截圖時，PNG 較可靠；網站圖片若目標瀏覽器支援，WebP 通常能減少容量。若平台只接受 JPG，就需要把 PNG 或 WebP 轉成相容格式。'] },
      { heading: '建議處理順序', paragraphs: ['先裁切到正確構圖，再調整尺寸，最後壓縮與轉檔。若先壓縮再裁切，可能要重複輸出；若先轉成有損格式再多次修改，畫質會逐步下降。'] },
      { heading: 'QR Code 與圖片品質', paragraphs: ['QR Code 需要足夠對比與清楚邊界。若放在海報、講義或社群圖，先確認尺寸與容錯等級，再下載 PNG。若要搭配品牌顏色，請實際掃描測試，不要只看螢幕預覽。'] },
    ],
    faq: [
      { question: 'JPG 轉 PNG 會變清楚嗎？', answer: '不會。它只改變格式，不能還原 JPG 壓縮造成的畫質損失。' },
      { question: 'PNG 轉 JPG 透明背景會怎樣？', answer: 'JPG 不支援透明，透明區域會套用你選擇的背景色。' },
      { question: 'WebP 適合所有平台嗎？', answer: '現代瀏覽器支援良好，但部分上傳系統或舊軟體仍可能只接受 JPG/PNG。' },
      { question: '圖片壓縮應該先縮尺寸嗎？', answer: '通常是。若圖片實際只顯示 1200px，就不需要保留 4000px 的原始寬度。' },
      { question: 'QR Code 可以壓縮嗎？', answer: '可以，但不要壓到邊緣模糊或對比不足，輸出後一定要實際掃描。' },
    ],
  },
  {
    slug: 'pdf-merge-guide',
    title: 'PDF 合併怎麼做？不用安裝軟體的線上方法',
    description: '教你使用瀏覽器合併多份 PDF，從排序、預覽到下載一次說明，也整理檔案隱私、頁面方向與合併失敗的注意事項，適合報告、附件與掃描檔案整理使用。',
    summary: '把分散的報告、附件或掃描檔整理成一份 PDF，並在送出前完成排序與檢查。',
    published: '2026-06-20',
    updated: '2026-06-20',
    toolLinks: [
      { slug: 'merge-pdf', label: 'PDF 合併工具', note: '依照指定順序合併多份 PDF' },
      { slug: 'pdf-page-reorder', label: 'PDF 頁面重新排序', note: '合併後再調整頁面先後' },
      { slug: 'split-pdf', label: 'PDF 拆分工具', note: '先取出需要的頁面再合併' },
    ],
    sections: [
      {
        heading: 'PDF 合併是什麼？適合哪些情況？',
        paragraphs: [
          'PDF 合併就是把兩份以上的 PDF，按照你指定的順序組成一個新檔案。原始檔通常不會被覆蓋，因此可以保留個別版本，也能另外取得整理後的成品。常見情況包括把封面、目錄與正文合成報告，把多張掃描收據整理成附件，或把履歷與作品集放進同一份檔案。',
          '合併的重點不只是「放在一起」，而是先確認閱讀順序。檔名若只有「1、2、3」，上傳後很容易看錯；建議先改成「01-封面、02-本文、03-附件」，再依清單排序。若文件內已有頁碼，也要檢查合併後是否連續，避免目錄標示與實際頁面不一致。',
        ],
        subsections: [
          {
            heading: '線上合併與安裝軟體有什麼差別？',
            paragraphs: [
              '線上工具的優點是不用安裝，臨時使用時開啟網頁即可操作。若工具在瀏覽器本機處理檔案，內容不必先傳到伺服器；不過不同網站的處理方式不一定相同，使用前仍應閱讀頁面上的隱私說明。若你每天要處理大量文件、需要書籤或進階壓縮，桌面軟體可能更適合。',
            ],
          },
        ],
      },
      {
        heading: '不用安裝軟體的 PDF 合併步驟',
        paragraphs: [
          '先準備要合併的 PDF，確認每個檔案都能正常開啟，而且沒有密碼保護。進入 PDF 合併工具後選取檔案，依照成品的閱讀順序排列，再開始處理並下載新檔。下載後不要立刻寄出，應從第一頁翻到最後一頁，檢查頁數、方向、空白頁與文字是否正常。',
          '若只需要某份 PDF 的幾頁，可以先用拆分工具取出指定範圍，再把結果與其他文件合併。若所有內容都正確、只有順序要修改，使用頁面重新排序工具會比重新拆分更快。這種「先刪減、再排序、最後合併」的流程，比一次把所有檔案丟進去更不容易出錯。',
        ],
        subsections: [
          {
            heading: '合併前的三項檢查',
            paragraphs: [
              '第一，確認檔案沒有損壞或加密；第二，確認紙張方向與尺寸是否可接受；第三，確認內容是否包含身分證號、地址或未公開資料。涉及敏感內容時，優先選擇明確標示本機處理的工具，並避免在公用電腦留下下載檔。',
            ],
          },
          {
            heading: '合併後檔案太大怎麼辦？',
            paragraphs: [
              '檔案大小多半來自掃描圖片。可先降低掃描解析度，或在合併後使用 PDF 壓縮工具；但壓縮可能讓小字與細線變模糊。若只是電子郵件附件超過限制，也可考慮只保留必要頁面，而不是一味降低整份文件的品質。',
            ],
          },
        ],
      },
    ],
    faq: [
      { question: 'PDF 合併會改變原始檔嗎？', answer: '一般會產生新的合併檔，不會覆蓋原始 PDF；仍建議保留原檔，確認成品後再整理備份。' },
      { question: '有密碼的 PDF 可以直接合併嗎？', answer: '多數工具無法直接處理受密碼保護的檔案。你必須有合法權限並先解除保護，再進行合併。' },
      { question: '手機也能合併 PDF 嗎？', answer: '可以，只要瀏覽器能選取檔案並有足夠記憶體即可；大型 PDF 在手機上可能較慢，處理時不要切換或關閉頁面。' },
    ],
  },
  {
    slug: 'images-to-pdf-guide',
    title: '如何把多張圖片轉成 PDF？',
    description: '完整說明多張 JPG、PNG 圖片轉成一份 PDF 的步驟，包含排序、方向、留白、畫質與檔案大小的實用檢查，適合整理收據、報告與作品集案例。',
    summary: '將作業照片、收據或掃描圖片依序整理成方便分享與列印的 PDF。',
    published: '2026-06-20',
    updated: '2026-06-20',
    toolLinks: [
      { slug: 'images-to-pdf', label: '圖片轉 PDF 工具', note: '把多張圖片整理成一份 PDF' },
      { slug: 'image-compressor', label: '圖片壓縮工具', note: '轉檔前先降低過大的圖片容量' },
      { slug: 'merge-pdf', label: 'PDF 合併工具', note: '將已完成的 PDF 再合併' },
    ],
    sections: [
      {
        heading: '為什麼要把圖片轉成 PDF？',
        paragraphs: [
          '多張圖片分開傳送時，收件人可能看不到正確順序，也可能漏下載其中一張。轉成 PDF 後，每張圖片會成為固定順序的頁面，適合繳交作業、整理收據、保存白板筆記或寄送掃描文件。PDF 也比較容易預覽與列印，不必逐張開啟。',
          '轉檔前應先判斷圖片是否真的適合放在同一份文件。若照片主題不同，拆成兩三份 PDF 反而更好找；若是證件或含個人資料的圖片，則要先確認用途與傳送對象，不要為了方便而把不必要的敏感內容一起放進檔案。',
        ],
        subsections: [
          {
            heading: 'JPG、PNG 都可以嗎？',
            paragraphs: [
              '一般圖片轉 PDF 工具會支援常見的 JPG 與 PNG。JPG 適合照片，檔案通常較小；PNG 適合截圖、圖表與文字邊緣，但容量可能較大。轉成 PDF 不會自動讓模糊圖片變清楚，原始照片若失焦或字太小，應先重新拍攝。',
            ],
          },
        ],
      },
      {
        heading: '多張圖片轉成 PDF 的實際步驟',
        paragraphs: [
          '第一步是整理圖片。刪除重複照片，將需要旋轉的頁面轉正，並用一致規則命名。第二步是在圖片轉 PDF 工具中一次選取檔案，再拖曳調整順序。第三步是選擇紙張方向或留白設定；文件照片通常適合直向，寬幅表格則可能需要橫向。',
          '產生 PDF 後，應檢查首頁是否正確、頁面有沒有被裁切、文字是否可讀，以及總頁數是否與圖片數量一致。若圖片邊緣包含桌面、手指或陰影，可先裁切再轉檔。若成品太大，優先壓縮尺寸過大的原圖，避免所有頁面都承受不必要的畫質損失。',
        ],
        subsections: [
          {
            heading: '如何兼顧畫質與檔案大小？',
            paragraphs: [
              '要在螢幕閱讀的文件，不需要保留相機原始的超高像素。可先複製一份圖片，再縮小尺寸或稍微壓縮；但有細小文字、印章與表格時，不宜壓得太重。判斷方式不是只看容量，而是把成品放大到實際閱讀比例，確認筆畫沒有糊成一團。',
            ],
          },
          {
            heading: '手機拍攝文件的小技巧',
            paragraphs: [
              '拍攝時讓鏡頭與紙面平行，使用均勻光線並避開反光。每頁保留完整邊界，之後再裁切，比拍攝時切掉文字更容易修正。連續拍攝後立刻檢查，不要等到轉成 PDF 才發現其中一頁晃動。',
            ],
          },
        ],
      },
    ],
    faq: [
      { question: '圖片轉 PDF 後會變清楚嗎？', answer: '不會。PDF 只是改變封裝與排列方式，原圖模糊、失焦或解析度不足時，轉檔後仍然會模糊。' },
      { question: '一張圖片會變成一頁嗎？', answer: '通常是每張圖片對應一頁，實際版面仍取決於工具設定；下載後應核對頁數與順序。' },
      { question: '圖片很多時要一次全部轉嗎？', answer: '不一定。若手機或電腦記憶體有限，可依章節分批轉換，再用 PDF 合併工具組成最後版本。' },
    ],
  },
  {
    slug: 'random-grouping-classroom',
    title: '老師如何用隨機分組工具安排課堂活動？',
    description: '提供教師使用隨機分組工具的完整課堂流程，包含名單準備、組數設定、公平性、特殊需求調整、角色分工與活動後輪替方式，讓分組作業更省時且更公平合理。',
    summary: '用可說明、可重複的流程快速分組，同時保留教師對課堂需求的必要調整。',
    published: '2026-06-20',
    updated: '2026-06-20',
    toolLinks: [
      { slug: 'random-group-generator', label: '隨機分組工具', note: '依組數或每組人數產生分組' },
      { slug: 'random-student-picker', label: '隨機抽學生', note: '抽出分享或回答問題的學生' },
      { slug: 'countdown-timer', label: '倒數計時器', note: '控制討論與換組時間' },
    ],
    sections: [
      {
        heading: '隨機分組適合什麼課堂活動？',
        paragraphs: [
          '隨機分組適合短時間討論、複習競賽、同儕互評與需要增加同學互動的活動。它能減少學生只找熟悉朋友的情況，也省去教師逐一念名單的時間。不過隨機不代表任何情況都最公平；長期專題、能力互補或需要特定支持的學生，仍可能需要教師安排。',
          '把工具定位為「產生初始組合」會比較實際。結果出現後，教師可以基於安全、學習支持或出席狀況做少量調整，並向全班說明分組原則。這樣既保留隨機帶來的新互動，也不會把教學判斷完全交給程式。',
        ],
        subsections: [
          {
            heading: '依組數還是依每組人數？',
            paragraphs: [
              '教室有固定桌數時，可直接設定組數；活動器材有限時，也可用器材份數決定組數。若任務需要三人角色分工，則設定每組三人更直觀。人數無法整除時，應先決定是否接受少數組多一人，而不是分組後才臨時處理。',
            ],
          },
        ],
      },
      {
        heading: '從名單到開始活動的分組流程',
        paragraphs: [
          '上課前先準備純文字名單，一行一個名字或座號，刪除空白列與重複項目。當天確認缺席者後再貼入隨機分組工具，選擇組數或每組人數並產生結果。投影結果時給學生一段明確的移動時間，搭配倒數計時器，能降低換位拖延。',
          '分組完成後，不要只宣布名單，還要交代每組任務、時間與成果形式。例如指定記錄者、報告者與時間管理者，並在下一輪交換角色。若活動會進行多次，可保留每輪結果，避免同一批學生反覆同組，也方便課後回顧參與情況。',
        ],
        subsections: [
          {
            heading: '怎麼處理特殊需求與臨時缺席？',
            paragraphs: [
              '先移除缺席名單，再產生分組，比事後把空位塞給其他組更清楚。需要座位、設備或同儕支持的學生，可在結果出現後調整；調整理由不必公開個人隱私，只要說明教師會依學習需求做必要安排。',
            ],
          },
          {
            heading: '如何讓學生感覺過程公平？',
            paragraphs: [
              '公平來自規則一致與過程透明，而不是永遠不調整。教師可以先說明這一輪採隨機分組、結果僅用於本次活動，必要時依人數微調。若學生對結果有意見，先讓活動完成，再收集具體原因，避免每次都因偏好而重抽。',
            ],
          },
        ],
      },
    ],
    faq: [
      { question: '隨機分組一定最公平嗎？', answer: '不一定。短期活動可降低主觀選擇，但特殊學習需求、衝突與能力配置仍需教師判斷。' },
      { question: '學生人數不能整除怎麼辦？', answer: '可接受部分組多一人，或先指定每組人數再處理餘數；重點是活動前先決定一致規則。' },
      { question: '可以保存分組結果嗎？', answer: '可使用工具提供的複製功能，或把結果貼到課程紀錄中；保存時應遵守學校對學生資料的管理規範。' },
    ],
  },
  {
    slug: 'what-to-eat-decision-methods',
    title: '不知道今天吃什麼？選擇困難時可以用的 5 種方法',
    description: '整理五種解決今天吃什麼的方法：縮小範圍、排除法、隨機輪盤、二選一與建立常用清單，幫你在單人或多人用餐時更快做出決定，省去反覆猶豫的寶貴時間。',
    summary: '先把選項縮小，再用簡單規則做決定，避免把時間耗在無限比較。',
    published: '2026-06-20',
    updated: '2026-06-20',
    toolLinks: [
      { slug: 'what-to-eat', label: '今天吃什麼', note: '從餐點分類或自訂清單中挑選' },
      { slug: 'random-wheel', label: '隨機轉盤', note: '把候選餐廳放上轉盤' },
      { slug: 'this-or-that', label: '二選一工具', note: '只剩兩個選項時快速決定' },
    ],
    sections: [
      {
        heading: '為什麼每天決定吃什麼這麼累？',
        paragraphs: [
          '選擇困難通常不是因為選項太少，而是條件沒有先排好順序。距離、價格、排隊時間、飲食偏好與同行者意見同時出現，大腦就會不斷比較。最有效的方法不是找到「完美的一餐」，而是先設定今天最重要的一兩個條件，再從合格選項中選一個。',
          '例如午休只有四十分鐘，距離與出餐速度就比網路評分重要；週末聚餐時間充裕，才適合比較環境與菜色。先承認這只是一次日常決定，也能降低後悔感。今天沒選到的餐廳，可以留到下一次，不需要一次完成所有體驗。',
        ],
      },
      {
        heading: '五種快速決定今天吃什麼的方法',
        paragraphs: [
          '第一種是先選類型，例如飯、麵、便當或輕食，再限定距離。第二種是排除法，先刪掉今天不想吃、太遠或超出預算的選項。第三種是把三到八個候選項目放進隨機轉盤，適合大家都沒有強烈偏好時使用。',
          '第四種是二選一。把選項兩兩比較，每次只回答「比較想吃哪個」，最後留下勝出的餐點。第五種是建立常用清單，分成快速、清淡、聚餐與雨天外送等情境；下次只需從對應清單抽選，不必重新搜尋。這些方法的共同點，是主動限制選項數量。',
        ],
        subsections: [
          {
            heading: '方法一到三：篩選、排除與隨機',
            paragraphs: [
              '若有明確限制，先篩選再隨機最有效。先留下營業中、距離可接受、價格符合預算的餐點，再使用「今天吃什麼」或轉盤工具。不要把明知不會接受的選項放進去，否則抽到後重來，只會讓工具變成拖延決定的方式。',
            ],
          },
          {
            heading: '方法四到五：二選一與固定清單',
            paragraphs: [
              '二選一適合兩個人意見不同，或候選項目已經很少的情況。固定清單則適合忙碌工作日：每次吃到合適的店就加入分類，踩雷或歇業便移除。清單不必很長，每個情境保留五到十個可靠選項就足夠。',
            ],
          },
        ],
      },
      {
        heading: '多人一起吃飯時怎麼決定？',
        paragraphs: [
          '先請每個人提出一個必要條件與一個候選項目，合併後刪掉不符合共同條件的選項，再從剩下的項目抽選。有人有過敏、宗教或其他飲食限制時，這些條件應優先於隨機結果。工具只能協助選擇，不能取代對同行者需求的確認。',
        ],
      },
    ],
    faq: [
      { question: '抽到不想吃的結果可以重抽嗎？', answer: '可以，但更有效的做法是先把不能接受的選項刪掉。若每次都重抽，代表候選清單需要重新整理。' },
      { question: '多人意見不同時適合用轉盤嗎？', answer: '適合，但應先確認所有候選項目都符合共同限制，並事先同意接受抽選結果。' },
      { question: '怎麼建立實用的餐點清單？', answer: '依快速、預算、清淡、聚餐或外送等情境分類，每類保留少量可靠選項，並定期移除不合適的店家。' },
    ],
  },
  {
    slug: 'compound-interest-explained',
    title: '複利是什麼？用簡單例子看懂本金、利率與時間',
    description: '用白話例子說明複利、本金、利率與期數的關係，並提醒試算結果與實際金融產品可能存在費用、稅務及計息差異，幫助理解長期儲蓄與投資的複利累積效果。',
    summary: '了解利息加入本金後如何影響下一期計算，並正確閱讀複利試算結果。',
    published: '2026-06-20',
    updated: '2026-06-20',
    toolLinks: [
      { slug: 'compound-interest', label: '複利計算機', note: '調整本金、利率與時間進行試算' },
      { slug: 'savings-goal', label: '儲蓄目標計算機', note: '反推達成目標可能需要的存款' },
    ],
    sections: [
      {
        heading: '複利的意思：利息也加入下一期計算',
        paragraphs: [
          '複利是指每一期產生的利息，在符合條件時加入本金，下一期再一起計算利息。單利則通常只用最初本金計息。兩者在時間短、利率低時差距不明顯，但期數增加後，複利的計算基礎會逐期改變，因此結果會拉開。',
          '理解複利要抓住四個元素：起始本金、每期利率、計息期數與利息是否再投入。任何一項改變，結果都會不同。金融產品還可能有手續費、稅負、提前解約條件或浮動利率，所以線上計算機適合做情境試算，不等同實際報酬承諾。',
        ],
        subsections: [
          {
            heading: '本金、利率與時間各自代表什麼？',
            paragraphs: [
              '本金是最初投入或借入的金額；利率是每個計息期間使用的比例；時間必須與利率單位一致。年利率不能直接當成月利率使用，月數也不能未換算就放進以年為單位的公式。試算前先確認欄位寫的是年、月還是日。',
            ],
          },
        ],
      },
      {
        heading: '用簡單例子看複利怎麼累積',
        paragraphs: [
          '假設本金 10,000 元，每年利率 5%，一年計息一次，而且利息留在帳戶中。第一年利息是 500 元，期末為 10,500 元；第二年若仍按 5% 計算，計息基礎變成 10,500 元，利息為 525 元，期末為 11,025 元。第二年的利息多出的 25 元，就是先前利息也參與計算的結果。',
          '這個例子刻意忽略費用、稅務與利率變動，只用來理解機制。真實產品可能每日計息、每月入帳，也可能利息不會自動再投入。比較不同方案時，必須使用相同本金、相同期間與一致的費用假設，否則數字看起來精確，實際上卻不能直接比較。',
        ],
        subsections: [
          {
            heading: '計息頻率為什麼會影響結果？',
            paragraphs: [
              '在名目利率與其他條件相同時，利息越早加入本金，後續參與計算的期數可能越多。不過產品標示方式不一，不能只看到「每日」或「每月」就判定較好，仍要看有效利率、費用與利息實際入帳規則。',
            ],
          },
          {
            heading: '如何使用複利計算機做情境比較？',
            paragraphs: [
              '可先建立保守、一般與較高三組利率情境，再分別調整時間與定期投入金額。把結果視為假設下的數學輸出，而不是未來保證。若用於重要財務決策，應核對金融機構正式文件，必要時諮詢具資格的專業人士。',
            ],
          },
        ],
      },
    ],
    faq: [
      { question: '複利一定比單利好嗎？', answer: '不能只看計息方式。實際結果還取決於利率、期間、費用、風險與資金是否能持續投入。' },
      { question: '年利率可以直接除以 12 當月利率嗎？', answer: '部分簡化試算會這樣處理，但金融產品的有效利率與計息規則可能不同，應以正式條款為準。' },
      { question: '計算機的結果就是未來會拿到的金額嗎？', answer: '不是。試算只反映輸入假設，未包含所有費用、稅務、利率變動與產品條件。' },
    ],
  },
  {
    slug: 'mortgage-payment-explained',
    title: '房貸月付金怎麼算？本息平均攤還白話解釋',
    description: '白話說明房貸本息平均攤還、每月本金與利息如何變化，以及使用房貸試算時應留意的利率、期數、寬限期與額外費用，協助評估每月實際還款的總負擔金額。',
    summary: '看懂本息平均攤還的月付金結構，並知道試算與銀行核貸結果的差距來源。',
    published: '2026-06-20',
    updated: '2026-06-20',
    toolLinks: [
      { slug: 'mortgage-payment', label: '房貸月付金試算', note: '輸入貸款金額、利率與期數估算月付金' },
      { slug: 'percentage-calculator', label: '百分比計算機', note: '換算自備款或費用比例' },
    ],
    sections: [
      {
        heading: '本息平均攤還是什麼？',
        paragraphs: [
          '本息平均攤還是常見的房貸還款方式。在利率固定且沒有寬限期等特殊條件時，會把本金與利息安排在約定期數內償還，使每期應付總額大致相同。雖然月付金接近固定，但其中的本金與利息比例會隨時間改變。',
          '還款初期剩餘本金較高，因此利息占比較大；持續還款後，剩餘本金下降，利息部分逐漸減少，本金部分增加。這不代表銀行突然改變利率，而是每期利息通常依剩餘本金計算。若採浮動利率，利率調整後的月付金仍可能改變。',
        ],
        subsections: [
          {
            heading: '月付金由哪些數字決定？',
            paragraphs: [
              '主要輸入包括實際貸款本金、年利率與總期數。房屋總價不等於貸款本金，必須扣除自備款；二十年與三十年的期數也不能只比較月付金，因為拉長期間通常會改變總利息。試算時應把所有方案放在一致條件下比較。',
            ],
          },
        ],
      },
      {
        heading: '如何用房貸計算機估算月付金？',
        paragraphs: [
          '先輸入預計貸款金額，再填入利率與年限。若銀行提供的是分段利率，不能只用最低一段代表整個期間，可以分別以不同利率試算，觀察月付金可能的範圍。結果出現後，同時記錄每月金額與總利息，不要只看哪個方案月付最低。',
          '接著做壓力測試：把利率提高一些，看看家庭現金流是否仍能負擔；也要保留管理費、修繕、保險、稅費與搬遷等支出空間。房貸計算機是整理假設的工具，銀行最後核貸利率、額度、年限與費用仍以正式契約和審核結果為準。',
        ],
        subsections: [
          {
            heading: '寬限期為什麼不能只看前幾年月付？',
            paragraphs: [
              '寬限期內常見做法是只繳利息或少還本金，因此前期付款較低，但本金下降速度也較慢。寬限期結束後，剩餘本金要在較短期間內攤還，月付金可能明顯增加。比較時應把寬限期後的金額與總成本一起看。',
            ],
          },
          {
            heading: '提前還款一定比較省嗎？',
            paragraphs: [
              '提前償還本金通常會減少後續計息基礎，但契約可能有違約金、限制期間或最低還款金額。也要保留緊急預備金，避免把所有現金投入還款後缺乏周轉。實際操作前應查閱貸款契約並向銀行確認。',
            ],
          },
        ],
      },
    ],
    faq: [
      { question: '本息平均攤還的月付金永遠不變嗎？', answer: '固定利率且條件不變時通常接近固定；浮動利率、寬限期或契約調整都可能讓金額變化。' },
      { question: '貸款年限越長越好嗎？', answer: '年限較長可降低每月壓力，但通常也會增加總利息與負債時間，需一起比較現金流與總成本。' },
      { question: '線上試算結果等於銀行報價嗎？', answer: '不等於。線上工具未必包含開辦費、保險、分段利率與個人核貸條件，正式結果以銀行文件為準。' },
    ],
  },
  {
    slug: 'qr-code-guide',
    title: 'QR Code 是什麼？如何製作自己的 QR Code？',
    description: '說明 QR Code 的用途、建立網址與文字 QR Code 的步驟，以及尺寸、對比、容錯、隱私與印刷前測試注意事項，避免掃描失敗或內容過期。',
    summary: '把網址或文字製作成可掃描的 QR Code，並在分享或印刷前完成實機測試。',
    published: '2026-06-20',
    updated: '2026-06-20',
    toolLinks: [
      { slug: 'qr-code-generator', label: 'QR Code 產生器', note: '將網址或文字製作成 QR Code' },
      { slug: 'url-encoder', label: '網址編碼工具', note: '檢查含特殊字元的網址內容' },
    ],
    sections: [
      {
        heading: 'QR Code 是什麼？',
        paragraphs: [
          'QR Code 是一種二維條碼，可以在黑白方格中儲存網址、文字或其他資料。手機相機辨識後，會讀出其中的內容；如果內容是網址，通常會提示使用者開啟網頁。它的用途包括活動報名、菜單、產品說明、聯絡資訊與跨裝置傳送連結。',
          'QR Code 本身不會判斷內容是否安全。掃描前應查看手機顯示的網址與網域，不要因為條碼印在正式文件上就直接信任。製作者也應避免把密碼、身分資料或不適合公開的資訊直接編進條碼，因為任何看到圖片的人都可能讀取。',
        ],
        subsections: [
          {
            heading: '靜態 QR Code 與可追蹤連結的差別',
            paragraphs: [
              '靜態 QR Code 直接保存輸入內容，產生後不依賴特定帳號，但網址改變時通常要重新製作。部分服務會先放入自己的短網址以提供修改或統計功能，這類連結可能依賴服務持續運作。若只需要長期印在文件上，應先確認條碼實際包含的網址。',
            ],
          },
        ],
      },
      {
        heading: '如何製作自己的 QR Code？',
        paragraphs: [
          '先準備完整內容。若是網站連結，應包含 https://，並在瀏覽器中確認可正常開啟。把內容貼到 QR Code 產生器，依用途選擇尺寸與容錯設定，再產生並下載圖片。不要只在電腦螢幕上看起來正常就完成，至少用兩支不同手機或不同相機應用程式掃描。',
          '印刷時需保留條碼四周的空白區，不要讓文字、圖案或裁切線貼得太近。深色方格搭配淺色背景通常最穩定；反差太低、漸層過多或背景複雜，都可能降低辨識率。若要縮小尺寸，應先用實際印刷大小測試，而不是只測原始大圖。',
        ],
        subsections: [
          {
            heading: '網址很長會影響掃描嗎？',
            paragraphs: [
              '內容越多，QR Code 的方格通常越密。在同樣印刷尺寸下，過密圖案對低解析列印、遠距掃描或鏡頭對焦更不友善。可先整理網址，移除不必要的追蹤參數；使用短網址前則要評估服務可靠性與連結日後是否仍可用。',
            ],
          },
          {
            heading: '加入 Logo 要注意什麼？',
            paragraphs: [
              'Logo 會遮住部分方格，必須搭配適當容錯並控制大小。不要遮住角落的定位圖案，也不要假設容錯能修復任何設計。每次更換顏色、Logo 或尺寸後都要重新測試，尤其是大量印刷前。',
            ],
          },
        ],
      },
    ],
    faq: [
      { question: 'QR Code 產生後會過期嗎？', answer: '直接保存文字或原始網址的靜態 QR Code 通常不會自行過期，但目標網址可能失效；使用第三方短網址時也受該服務影響。' },
      { question: '可以把密碼放進 QR Code 嗎？', answer: '技術上可以，但不建議把敏感密碼放在公開或容易轉傳的圖像中，因為任何取得圖片的人都可能讀取。' },
      { question: '為什麼印出來掃不到？', answer: '常見原因是尺寸太小、對比不足、四周空白被裁切、圖案過密或印刷模糊。應以實際成品和多台裝置測試。' },
    ],
  },
  {
    slug: 'word-counter-use-cases',
    title: '字數統計工具可以用在哪些情境？',
    description: '整理字數統計、字元數、段落數與閱讀時間的差異，說明學生寫作、內容編輯、社群經營與線上表單填寫時的實際用法與注意事項，協助掌握篇幅與字數限制。',
    summary: '不只看總字數，也用字元、段落與閱讀時間檢查內容是否符合使用情境。',
    published: '2026-06-20',
    updated: '2026-06-20',
    toolLinks: [
      { slug: 'word-counter', label: '字數統計工具', note: '同步查看字數、字元、段落與閱讀時間' },
      { slug: 'character-counter', label: '字元計數器', note: '檢查包含或不含空白的字元數' },
      { slug: 'remove-empty-lines', label: '移除空白行', note: '整理貼上文字中的多餘空行' },
    ],
    sections: [
      {
        heading: '字數、字元數與段落數有什麼不同？',
        paragraphs: [
          '字數統計工具通常會同時提供多種指標，但不同系統對「字」的定義可能不同。英文常以空格分隔單字，中文沒有相同規則，有些工具會把每個漢字計為一個字，有些則以語言分詞處理。因此需要符合投稿、作業或表單限制時，應先確認對方採用的是字數還是字元數。',
          '字元數是所有文字符號的數量，可能包含標點、數字與空白；段落數則反映內容結構。閱讀時間通常以預設速度估算，只適合做版面與篇幅參考，不能代表每位讀者的實際速度。看到統計值時，先理解定義，再決定是否符合要求。',
        ],
        subsections: [
          {
            heading: '為什麼不同工具算出的結果不一樣？',
            paragraphs: [
              '差異常來自換行、連字號、網址、表情符號、全形標點與中英混合文字的處理規則。正式繳交時，優先使用主辦單位指定的平台；沒有指定時，可保留一點餘裕，不要把內容寫到剛好等於上限。',
            ],
          },
        ],
      },
      {
        heading: '字數統計的常見使用情境',
        paragraphs: [
          '學生可用來檢查心得、摘要與報告篇幅，但字數達標不代表內容完整，仍要回到題目要求與論述品質。編輯與作者可觀察段落長度，找出特別冗長的區塊；社群經營者則能在貼文上線前檢查字元限制，避免重要句子被截斷。',
          '求職者填寫履歷表單、客服撰寫回覆、網站編輯準備 meta description 時，也常需要控制長度。把內容貼入工具後，不只看總數，還可搭配「每段只處理一個重點」的原則。若段落很少但字數很多，通常代表閱讀負擔較高，可以加入小標或拆段。',
        ],
        subsections: [
          {
            heading: '寫作過程應該何時檢查字數？',
            paragraphs: [
              '初稿階段先把重點寫完整，不必每句都盯著計數器。完成架構後再檢查總量，若超出上限，優先刪除重複例子、空泛轉折與偏離主題的段落；若不足，補充定義、步驟或具體例子，比重複同一觀點更有價值。',
            ],
          },
          {
            heading: '貼上文字時要留意隱私',
            paragraphs: [
              '履歷、未公開文章與客戶資料可能包含敏感內容。使用前查看工具是否說明本機處理，並避免在不信任的網站貼上密碼、身分證號或機密文件。即使是本機工具，也應留意共用電腦的剪貼簿與瀏覽器紀錄。',
            ],
          },
        ],
      },
    ],
    faq: [
      { question: '中文字數要看字數還是字元數？', answer: '取決於提交規則。若規則不明確，應向收件單位確認，並查看工具對中文、標點與空白的計算說明。' },
      { question: '閱讀時間是精確數字嗎？', answer: '不是。它依預設閱讀速度估算，適合比較篇幅，不代表所有讀者實際需要的時間。' },
      { question: '工具會保存我貼上的文字嗎？', answer: '各網站做法不同。應閱讀隱私說明並優先使用明確標示本機處理的工具，敏感資料則不應隨意貼入。' },
    ],
  },
  {
    slug: 'image-compression-quality-guide',
    title: '圖片壓縮會影響畫質嗎？上傳前該注意什麼？',
    description: '說明圖片壓縮為何可能影響畫質，如何依照片、截圖與文字圖選擇設定，並整理尺寸、格式、隱私及壓縮後檢查方式，幫助縮小檔案大小又能維持清晰度品質。',
    summary: '用實際顯示尺寸與用途決定壓縮程度，避免只追求最小檔案而犧牲可讀性。',
    published: '2026-06-20',
    updated: '2026-06-20',
    toolLinks: [
      { slug: 'image-compressor', label: '圖片壓縮工具', note: '調整圖片品質並比較檔案大小' },
      { slug: 'image-resizer', label: '圖片尺寸調整', note: '先縮小過大的像素尺寸' },
      { slug: 'jpg-to-webp', label: 'JPG 轉 WebP', note: '依網站需求轉換圖片格式' },
    ],
    sections: [
      {
        heading: '圖片壓縮為什麼可能影響畫質？',
        paragraphs: [
          '圖片壓縮分為無損與有損。無損壓縮盡量保留原始像素資訊，解壓後可還原，但容量下降幅度通常有限；有損壓縮會捨棄部分人眼較不敏感的資訊，因此能大幅減少容量，也可能出現色塊、邊緣模糊或細節消失。壓縮不一定會讓畫面明顯變差，關鍵在設定與用途。',
          '相機照片含有大量色彩與紋理，通常能接受適度有損壓縮；截圖、圖表與小字對邊緣清晰度更敏感，過度壓縮容易變得難讀。原圖的像素尺寸也很重要：如果網站只以 800 像素寬顯示，就沒有必要直接上傳數千像素的相機原檔。',
        ],
        subsections: [
          {
            heading: '壓縮品質與縮小尺寸不是同一件事',
            paragraphs: [
              '品質設定主要改變編碼保留的細節，縮小尺寸則直接減少像素數量。對網頁圖片而言，先把尺寸調到接近實際顯示大小，再做溫和壓縮，通常比保留巨大尺寸後強力壓縮更合理。原始檔仍應另外備份。',
            ],
          },
        ],
      },
      {
        heading: '上傳或分享前的圖片壓縮流程',
        paragraphs: [
          '第一步先複製原始檔，避免反覆壓縮同一張圖片。第二步確認平台要求的格式、尺寸與容量上限。第三步依實際顯示情境調整像素尺寸，再使用圖片壓縮工具輸出測試版本。最後以 100% 顯示比例檢查人物輪廓、文字、漸層與暗部，不能只看縮圖。',
          '如果檔案仍然太大，可逐步降低品質，而不是一次拉到最低。每次比較容量與視覺差異，找到可以接受的平衡點。需要透明背景時要確認輸出格式是否支援透明；轉換格式前，也要確認目標平台與使用者瀏覽器是否能正常顯示。',
        ],
        subsections: [
          {
            heading: '照片、截圖與文字圖應該怎麼選？',
            paragraphs: [
              '照片可從中等品質開始測試；截圖與介面教學應優先保留文字邊緣；Logo、線條圖與透明圖則要特別注意格式。沒有一個品質百分比適用所有圖片，因為每張圖的內容、尺寸與輸出編碼都不同。',
            ],
          },
          {
            heading: '壓縮前要處理圖片隱私嗎？',
            paragraphs: [
              '圖片可能含位置資訊、拍攝時間或裝置資料，也可能直接拍到姓名、門牌與螢幕通知。上傳前先裁切不必要區域並檢查中繼資料；敏感圖片應優先使用明確標示在瀏覽器本機處理的工具。',
            ],
          },
        ],
      },
    ],
    faq: [
      { question: '圖片壓縮一定會變模糊嗎？', answer: '不一定。適度壓縮在實際顯示尺寸下可能不易察覺，但有損壓縮設定過低時仍會失去細節。' },
      { question: '可以重複壓縮同一張圖片嗎？', answer: '不建議。反覆有損壓縮可能累積畫質損失，應保留原圖並從原圖輸出不同版本。' },
      { question: '檔案越小越好嗎？', answer: '不是。容量要符合傳輸與平台需求，同時保留必要可讀性；文字、表格與證明文件不應為了縮小容量而變得難以辨識。' },
    ],
  },
  {
    slug: 'pdf-split-guide',
    title: 'PDF 拆分是什麼？如何只保留需要的頁面？',
    description: '教你將 PDF 拆成指定頁面或範圍，說明頁碼確認、成品預覽、敏感內容檢查、重新合併與拆分後的檔案整理方式，方便分享單一頁面或特定章節的內容。',
    summary: '從完整 PDF 取出需要的頁面，減少不必要內容並讓分享範圍更清楚。',
    published: '2026-06-20',
    updated: '2026-06-20',
    toolLinks: [
      { slug: 'split-pdf', label: 'PDF 拆分工具', note: '依頁碼或範圍取出頁面' },
      { slug: 'extract-pdf-pages', label: '擷取 PDF 頁面', note: '將選定頁面另存成新檔' },
      { slug: 'delete-pdf-pages', label: '刪除 PDF 頁面', note: '保留大部分內容時移除少數頁面' },
    ],
    sections: [
      {
        heading: 'PDF 拆分是什麼？',
        paragraphs: [
          'PDF 拆分是把一份多頁文件依指定範圍分成數個檔案，或只取出需要的頁面另存。常見用途包括從完整報告取出附件、將掃描檔按章節整理、只寄送需要簽名的頁面，以及移除與收件人無關的內容。原始 PDF 通常不會被改寫，工具會產生新的檔案。',
          '拆分、擷取與刪除頁面的目標相近，但操作思路不同。需要少數頁面時，直接擷取指定頁碼最清楚；想把每個章節分開，可依範圍拆分；只想移除一兩張空白頁，刪除頁面會更省事。先判斷要保留的比例，可以減少輸入錯誤。',
        ],
        subsections: [
          {
            heading: '畫面頁碼與文件印刷頁碼可能不同',
            paragraphs: [
              'PDF 檢視器顯示的第 1 頁，可能是沒有印頁碼的封面；正文標示的「第 1 頁」實際上可能是檔案第 3 頁。輸入範圍前應以縮圖或檢視器顯示的位置為準，並記錄封面、目錄與附件造成的偏移。',
            ],
          },
        ],
      },
      {
        heading: '如何只保留需要的 PDF 頁面？',
        paragraphs: [
          '先開啟原檔，列出需要的頁碼或連續範圍，例如 2–5、8、11–13。確認文件沒有密碼保護後，進入 PDF 拆分或擷取工具，上傳檔案並輸入範圍。產生新檔後逐頁預覽，確認第一頁、最後一頁與範圍交界處都正確，再重新命名。',
          '若要交付多個章節，建議使用一致命名，例如「專案名稱-01-摘要」「專案名稱-02-附件」。如果後來需要把選出的頁面重新組成一份，可使用 PDF 合併工具調整順序。處理後不要只依檔名判斷，應打開每一份成品核對內容與頁數。',
        ],
        subsections: [
          {
            heading: '拆分能降低檔案大小嗎？',
            paragraphs: [
              '移除大量頁面後，檔案通常會變小，但縮小幅度取決於被移除頁面的內容與 PDF 結構。拆分不是專門的壓縮方法；若保留頁面含高解析掃描圖，容量仍可能很大。此時可再評估壓縮，但要檢查文字與影像品質。',
            ],
          },
          {
            heading: '分享前為什麼還要檢查敏感內容？',
            paragraphs: [
              '只取出幾頁不代表沒有敏感資料。頁首頁尾、批註、表單欄位與頁面中的姓名仍可能保留。應逐頁檢查實際顯示內容；若需要正式遮蔽，不能只用白色方塊蓋住文字，應使用適合的編修流程並驗證內容無法被還原。',
            ],
          },
        ],
      },
    ],
    faq: [
      { question: 'PDF 拆分會破壞原始檔嗎？', answer: '一般會另存新檔，不會覆蓋原始 PDF；仍建議保留備份並在下載後核對頁面。' },
      { question: '可以一次保留不連續頁面嗎？', answer: '若工具支援多個範圍或指定頁碼即可，例如保留 2、5、8–10；實際輸入格式以工具介面說明為準。' },
      { question: '拆分後頁面品質會下降嗎？', answer: '單純擷取頁面通常不需重新壓縮，但不同工具處理方式可能不同，應比較成品中的文字、圖片與檔案大小。' },
    ],
  },
  {
    slug: 'mobile-pdf-merge',
    title: '手機怎麼合併 PDF？免安裝 App 的操作方法',
    description: '用手機瀏覽器直接合併多份 PDF，不需要下載 App，從選檔、排序到下載完整說明，並整理常見失敗原因、檔案隱私、頁面順序與上傳前檢查重點，也提供對應工具與實用檢查清單。',
    summary: '在手機上用瀏覽器把多份 PDF 合成一個檔案，不必安裝額外 App。',
    published: '2026-06-23',
    updated: '2026-06-23',
    toolLinks: [
      { slug: 'merge-pdf', label: 'PDF 合併工具', note: '手機瀏覽器可直接開啟使用' },
      { slug: 'split-pdf', label: 'PDF 拆分工具', note: '合併前先取出需要的頁面' },
    ],
    sections: [
      {
        heading: '為什麼需要在手機上合併 PDF？',
        paragraphs: [
          '出差、通勤或不在電腦旁時，臨時收到需要整合的文件是常見情況。如果能直接用手機完成合併，就不必等回到辦公室才處理。只要手機瀏覽器能選取檔案，大部分線上 PDF 合併工具都能正常使用。',
          '手機合併 PDF 最常見的困擾是找不到檔案位置、記憶體不足導致頁面崩潰，以及合併後下載到不明路徑。提前了解這些問題，可以讓操作順利很多。',
        ],
        subsections: [
          {
            heading: '手機瀏覽器 vs. 專用 App',
            paragraphs: [
              '專用 App 通常有更多功能，但需要安裝、佔用空間，而且部分 App 會要求註冊。瀏覽器工具打開即用，適合偶爾合併一兩份文件的人。若你每天都要處理大量 PDF，安裝一個離線 App 可能更穩定。',
            ],
          },
        ],
      },
      {
        heading: '手機合併 PDF 的步驟與常見問題',
        paragraphs: [
          '打開手機瀏覽器，進入 PDF 合併工具頁面。點擊選取檔案，從「檔案」或「下載」資料夾中找到要合併的 PDF。選取後確認順序正確，必要時拖曳調整，再按合併按鈕。合併完成後下載新檔案，通常會存在「下載」資料夾中。',
          '如果頁面在合併時當掉，最常見的原因是檔案太大超過手機記憶體。嘗試分批合併（先合前兩份，再把結果和第三份合併），或先用圖片壓縮工具降低掃描頁面的大小。合併後務必打開成品檢查頁數和順序。',
        ],
        subsections: [
          {
            heading: '下載後找不到檔案？',
            paragraphs: [
              'Android 用戶可在「檔案」App 的「下載」資料夾找到；iPhone 用戶可在 Safari 下載列表或「檔案」App 的「下載項目」中找到。如果使用 Chrome，點擊右下角選單中的「下載內容」即可查看。',
            ],
          },
        ],
      },
    ],
    faq: [
      { question: '手機合併 PDF 需要網路嗎？', answer: '開啟工具頁面需要網路，但如果工具在瀏覽器本機處理，合併過程本身不需要上傳檔案。首次載入後可在訊號較弱的環境完成操作。' },
      { question: '合併後的 PDF 會比較大嗎？', answer: '合併後的檔案大小大約等於所有原始檔加總。如果覺得太大，可先壓縮含有掃描圖片的頁面再合併。' },
      { question: 'iPhone 和 Android 都可以用嗎？', answer: '可以。只要使用 Safari、Chrome 或其他現代瀏覽器，兩種系統都能選取檔案並下載合併結果。' },
    ],
  },
  {
    slug: 'pdf-too-large',
    title: 'PDF 太大不能上傳怎麼辦？實用縮小方法整理',
    description: '整理 PDF 檔案過大的常見原因與解決方法，包含壓縮、移除不必要頁面、降低掃描解析度、重新輸出與上傳前檢查，適合 Email 或表單送件使用，也補充相關工具與常見錯誤。',
    summary: '檔案超過上傳限制時，用壓縮、拆分或重新掃描等方法把 PDF 縮小到可接受的大小。',
    published: '2026-06-23',
    updated: '2026-06-23',
    toolLinks: [
      { slug: 'split-pdf', label: 'PDF 拆分工具', note: '移除不需要的頁面來減少檔案大小' },
      { slug: 'image-compressor', label: '圖片壓縮工具', note: '壓縮掃描圖片後再轉成 PDF' },
      { slug: 'merge-pdf', label: 'PDF 合併工具', note: '壓縮個別部分後再重新組合' },
    ],
    sections: [
      {
        heading: 'PDF 為什麼會太大？',
        paragraphs: [
          'PDF 過大通常有幾個原因：高解析度掃描圖片、嵌入大量字型、包含未壓縮的照片，或是頁數過多。一份 20 頁的掃描文件，如果用 300 dpi 以上掃描且沒有壓縮，很容易超過 20 MB。',
          '上傳限制因平台而異。Email 通常限制附件 10–25 MB，政府表單可能只接受 5 MB，雲端硬碟則通常沒有嚴格限制。了解具體的大小上限後，才知道需要壓縮多少。',
        ],
        subsections: [
          {
            heading: '怎麼知道哪些頁面最佔空間？',
            paragraphs: [
              '最簡單的方法是拆分成個別頁面，比較每頁的檔案大小。通常含有全彩照片或高解析掃描圖的頁面會遠大於純文字頁面。把這些「肥」頁面壓縮或替換，就能有效降低整體大小。',
            ],
          },
        ],
      },
      {
        heading: '縮小 PDF 的實用方法',
        paragraphs: [
          '第一種方法是直接使用壓縮工具。上傳 PDF 後工具會降低圖片品質並移除冗餘資料，通常可縮小 30–70%。壓縮後應檢查文字是否清晰、圖片是否過度模糊。',
          '第二種方法是移除不必要的頁面。如果文件中有空白頁、重複頁或與上傳目的無關的附件，用拆分工具保留需要的頁面即可。第三種方法針對掃描文件：用較低的 dpi（例如 150 dpi）重新掃描，或先壓縮圖片再轉成 PDF。',
        ],
        subsections: [
          {
            heading: '壓縮後品質會下降嗎？',
            paragraphs: [
              '會有一定程度的影響，尤其是圖片。純文字頁面的影響很小，但照片和圖表可能會出現色塊或模糊。建議壓縮後放大檢查關鍵內容，確認對方能看清楚再送出。',
            ],
          },
        ],
      },
    ],
    faq: [
      { question: '壓縮 PDF 會影響文字內容嗎？', answer: '一般不會改變文字本身，但若 PDF 是掃描圖片而非文字型，壓縮可能讓文字邊緣變模糊。' },
      { question: '可以把 PDF 分成多個小檔案分別上傳嗎？', answer: '如果接收端允許多檔上傳，可以用拆分工具把文件分成幾個較小的部分分別上傳。' },
      { question: '有沒有不失真的縮小方法？', answer: '移除不需要的頁面是唯一完全不影響品質的方法。壓縮多少都會有些微品質變化，只是程度不同。' },
      { question: '手機上也能壓縮 PDF 嗎？', answer: '可以。只要用手機瀏覽器開啟線上壓縮或拆分工具，選取檔案後即可操作。' },
    ],
  },
  {
    slug: 'compress-large-images',
    title: '圖片太大怎麼壓縮？品質與大小的平衡指南',
    description: '說明圖片壓縮的原理、操作步驟與品質控制方法，幫助你在不明顯降低畫質的情況下縮小圖片檔案，並整理上傳、寄信與網頁使用前的檢查方式、工具選擇和實際範例。',
    summary: '用線上工具把過大的圖片縮小到適合上傳、寄信或放在網頁上的大小，同時控制品質損失。',
    published: '2026-06-23',
    updated: '2026-06-23',
    toolLinks: [
      { slug: 'image-compressor', label: '圖片壓縮工具', note: '調整壓縮品質並預覽結果' },
      { slug: 'images-to-pdf', label: '圖片轉 PDF', note: '壓縮後的圖片可整理成 PDF' },
    ],
    sections: [
      {
        heading: '為什麼圖片會太大？',
        paragraphs: [
          '現代手機拍出的照片動輒 3–8 MB，高解析度截圖或設計稿也可能超過 10 MB。檔案大是因為記錄了大量像素與色彩資訊。在社群發文、寄信或上傳表單時，這麼大的檔案會導致載入緩慢、上傳失敗或佔用對方的信箱空間。',
          '壓縮的目的是在可接受的品質範圍內減少檔案大小。了解你的用途才能決定壓縮程度：社群貼文可以壓得多一些，列印用的照片則應保留較高品質。',
        ],
        subsections: [
          {
            heading: '有損壓縮 vs. 無損壓縮',
            paragraphs: [
              '有損壓縮（如 JPG）會略微降低畫質來換取更小的檔案，通常在 70–85% 品質設定下肉眼難以察覺差異。無損壓縮（如 PNG 優化）不會降低品質，但縮小幅度有限。多數線上工具預設使用有損壓縮。',
            ],
          },
        ],
      },
      {
        heading: '壓縮圖片的步驟與品質確認',
        paragraphs: [
          '開啟圖片壓縮工具，選取要壓縮的圖片。調整品質滑桿：數值越低檔案越小但品質越差，建議從 80% 開始嘗試。壓縮完成後對比原圖與成品，放大檢查文字、邊緣和漸層區域是否出現明顯色塊。',
          '若壓縮一次後仍然太大，可以同時縮小圖片尺寸（例如從 4000px 寬降到 2000px），這比反覆降低品質更有效。社群貼文通常不需要超過 1200px 寬，Email 附圖則 1600px 寬已經足夠。',
        ],
        subsections: [
          {
            heading: '批次壓縮多張圖片',
            paragraphs: [
              '如果有多張圖片要處理，選擇支援多檔上傳的工具可以一次完成。壓縮後逐張檢查是最安全的做法，尤其是包含文字或細節的圖片。',
            ],
          },
        ],
      },
    ],
    faq: [
      { question: '壓縮後的圖片還能放大看嗎？', answer: '可以，但放大後可能看到壓縮產生的色塊。若需要大尺寸列印，建議保留壓縮前的原始檔。' },
      { question: 'PNG 和 JPG 哪個壓縮效果好？', answer: 'JPG 壓縮照片效果更好，檔案通常更小。PNG 適合截圖和圖表，但壓縮空間有限。' },
      { question: '壓縮會移除照片的 EXIF 資訊嗎？', answer: '部分工具會在壓縮時移除 EXIF（拍攝時間、GPS 等），這反而有助於保護隱私。若需要保留 EXIF，應先確認工具的處理方式。' },
    ],
  },
  {
    slug: 'png-to-jpg-quality',
    title: 'PNG 轉 JPG 會失真嗎？格式轉換前該知道的事',
    description: '解釋 PNG 和 JPG 的差異、轉換時可能的品質變化、透明背景的處理方式與檔案大小取捨，幫助你判斷什麼時候該轉、什麼時候不該轉，並附轉檔前後檢查重點。',
    summary: '了解 PNG 轉 JPG 的品質影響與適用情境，避免轉錯格式造成畫質下降或透明背景消失。',
    published: '2026-06-23',
    updated: '2026-06-23',
    toolLinks: [
      { slug: 'image-compressor', label: '圖片壓縮工具', note: '壓縮時可選擇輸出格式' },
      { slug: 'images-to-pdf', label: '圖片轉 PDF', note: '把轉換後的圖片整理成文件' },
    ],
    sections: [
      {
        heading: 'PNG 和 JPG 有什麼不同？',
        paragraphs: [
          'PNG 是無損格式，支援透明背景，適合截圖、Logo、圖表與文字清晰的圖片。JPG 使用有損壓縮，不支援透明，但檔案通常更小，適合照片和色彩豐富的圖片。',
          '兩種格式的選擇不是「哪個比較好」，而是「你的圖片內容適合哪一種」。把截圖轉成 JPG 可能讓文字邊緣變模糊；把風景照存成 PNG 則會不必要地增加檔案大小。',
        ],
        subsections: [
          {
            heading: '透明背景會怎樣？',
            paragraphs: [
              'JPG 不支援透明。轉換時透明區域會被填成白色（或工具指定的底色）。如果你的 PNG 是去背的 Logo 或人物圖，轉成 JPG 後透明效果就會消失。需要保留透明的話，應維持 PNG 或轉成 WebP。',
            ],
          },
        ],
      },
      {
        heading: '什麼時候應該轉、什麼時候不該轉？',
        paragraphs: [
          '應該轉的情況：對方指定只接受 JPG、你需要大幅縮小照片檔案大小、圖片是全彩照片且不需要透明背景。不該轉的情況：圖片有透明背景且需要保留、圖片包含大量文字或線條（JPG 會在邊緣產生鋸齒）、圖片之後還需要多次編輯（每次儲存 JPG 都會再次壓縮）。',
          '如果只是為了縮小 PNG 檔案大小，先嘗試 PNG 無損壓縮，可能就已經足夠。只有在需要進一步縮小、且可以接受些微品質損失時，才考慮轉成 JPG。',
        ],
      },
    ],
    faq: [
      { question: 'PNG 轉 JPG 可以再轉回來嗎？', answer: '技術上可以把 JPG 存成 PNG，但已經損失的畫質不會恢復。轉回 PNG 只會讓檔案變大，品質不會變好。' },
      { question: '轉換後檔案大小會差多少？', answer: '視圖片內容而定。照片類圖片轉 JPG 通常可縮小 50–80%；截圖類圖片差距較小，且可能出現明顯品質下降。' },
      { question: 'WebP 是更好的選擇嗎？', answer: 'WebP 兼顧小檔案和較高品質，也支援透明。但部分舊軟體不支援 WebP，用於網頁或社群則通常沒問題。' },
      { question: '社群平台會自動轉格式嗎？', answer: '多數社群平台上傳後會自動壓縮並轉換格式。即使你上傳 PNG，平台可能存成 JPG 或 WebP，因此不需要特別堅持上傳格式。' },
    ],
  },
  {
    slug: 'free-qr-code-guide',
    title: '如何免費製作 QR Code？從產生到列印的完整流程',
    description: '完整說明免費製作 QR Code 的方法，包含網址、文字、Wi-Fi 等類型的製作步驟，以及尺寸、對比、掃描測試、列印與分享前的注意事項，也整理常見錯誤。',
    summary: '用免費線上工具製作網址、文字或 Wi-Fi QR Code，並確認掃得到、印得清。',
    published: '2026-06-23',
    updated: '2026-06-23',
    toolLinks: [
      { slug: 'qr-code-generator', label: 'QR Code 產生器', note: '免費產生各種類型的 QR Code' },
      { slug: 'image-compressor', label: '圖片壓縮工具', note: '調整 QR Code 圖片大小' },
    ],
    sections: [
      {
        heading: 'QR Code 可以放什麼內容？',
        paragraphs: [
          'QR Code 可以編碼網址、純文字、Email 地址、電話號碼、Wi-Fi 連線資訊等。最常見的用途是把網址轉成 QR Code，讓別人用手機掃描後直接開啟網頁，省去輸入長網址的麻煩。',
          '製作前應先確認內容正確。如果是網址，先在瀏覽器開啟確認可以正常載入；如果是 Wi-Fi 密碼，確認密碼沒有打錯。QR Code 產生後內容就固定了，無法修改——如果要改內容，必須重新產生一個新的。',
        ],
        subsections: [
          {
            heading: '靜態 QR Code vs. 動態 QR Code',
            paragraphs: [
              '免費工具通常產生靜態 QR Code，內容直接編碼在圖案中。動態 QR Code 會先導向一個中間網址，讓你之後可以修改目的地，但通常需要付費服務。日常使用靜態 QR Code 就足夠了。',
            ],
          },
        ],
      },
      {
        heading: '製作與列印 QR Code 的步驟',
        paragraphs: [
          '開啟 QR Code 產生器，選擇內容類型（網址、文字、Wi-Fi 等），輸入內容後點擊產生。下載前先用手機掃描預覽圖，確認跳轉或顯示結果正確。確認無誤後下載 PNG 或 SVG 格式。',
          '列印時注意尺寸：一般建議至少 2×2 公分，距離較遠的海報或看板需要更大。避免把 QR Code 印在反光材質或深色背景上，會影響掃描成功率。如果需要在深色背景上使用，確保 QR Code 周圍有足夠的白色邊距。',
        ],
        subsections: [
          {
            heading: '下載 PNG 還是 SVG？',
            paragraphs: [
              'PNG 適合直接使用或貼到文件中。SVG 是向量格式，放大不會模糊，適合需要印刷大尺寸的場合。如果只是貼到簡報或社群貼文，PNG 就夠了。',
            ],
          },
        ],
      },
    ],
    faq: [
      { question: 'QR Code 會過期嗎？', answer: '靜態 QR Code 本身不會過期，但如果裡面編碼的網址失效，掃描後就會打不開。' },
      { question: '可以加 Logo 在 QR Code 中間嗎？', answer: 'QR Code 有容錯機制，小範圍覆蓋通常不影響掃描。但加太大的 Logo 可能導致無法辨識，加完後務必測試。' },
      { question: '別人掃我的 QR Code 有安全風險嗎？', answer: '如果內容是網址，掃描者的手機會開啟該網頁。確保你提供的是可信任的網址，不要用 QR Code 導向可疑網站。' },
      { question: '免費產生的 QR Code 有使用限制嗎？', answer: '大多數免費工具對產生次數沒有限制，但功能上可能不支援動態 QR Code、統計掃描次數等進階功能。' },
    ],
  },
  {
    slug: 'threads-word-count',
    title: 'Threads 文案字數怎麼算？掌握字數限制的實用方法',
    description: '說明 Threads 的字數限制規則、中英文字數計算差異，以及如何用字數統計工具在發文前確認長度、換行與標點，避免內容被截斷或重寫，並附文案檢查流程。',
    summary: '了解 Threads 的字數限制，用字數統計工具在發文前確認文案長度。',
    published: '2026-06-23',
    updated: '2026-06-23',
    toolLinks: [
      { slug: 'word-counter', label: '字數統計工具', note: '即時計算文案的字元數與字數' },
    ],
    sections: [
      {
        heading: 'Threads 的字數限制是多少？',
        paragraphs: [
          'Threads 目前每篇貼文限制 500 個字元。這裡的「字元」是指每個字母、中文字、數字、標點符號和空格都各算一個字元。一個中文字算一個字元，一個英文字母也算一個字元，這和某些平台以「字」為單位的計算方式不同。',
          '500 字元聽起來不少，但如果貼文包含 Hashtag、Mention 和 Emoji，實際可用空間會更少。建議在撰寫較長的文案時，先用字數統計工具確認字元數，避免發文時才發現被截斷。',
        ],
        subsections: [
          {
            heading: '和 Twitter/X 的差異',
            paragraphs: [
              'Twitter/X 限制 280 字元（付費用戶更多），而 Threads 是 500 字元。中文用戶在 Threads 上可以寫更多內容。不過兩個平台都以字元而非字數計算，所以中文和英文的「一個字元」計算方式相同。',
            ],
          },
        ],
      },
      {
        heading: '發文前怎麼確認字數？',
        paragraphs: [
          '最簡單的方法是在字數統計工具中貼上文案，查看「字元數」欄位。如果字元數接近 500，考慮精簡用語或移除不必要的 Hashtag。Threads 不會顯示即時字數計數，所以養成先在外部工具確認的習慣比較保險。',
          '寫作技巧：先寫完整想法，再逐句精簡。刪除不增加資訊的形容詞、合併重複的意思、把長句拆成短句。如果內容真的太長，考慮拆成多篇貼文形成串連。',
        ],
      },
    ],
    faq: [
      { question: 'Emoji 算幾個字元？', answer: '大部分 Emoji 算 1–2 個字元，少數特殊 Emoji（如國旗或膚色修飾符）可能算更多。實際計算以平台為準。' },
      { question: '空格和換行算字元嗎？', answer: '空格算一個字元，換行通常也算。排版時要把這些計入總數。' },
      { question: '網址會佔用多少字元？', answer: '目前 Threads 上的網址會按實際長度計算字元。如果網址很長，可以使用短網址服務縮短。' },
    ],
  },
  {
    slug: 'teacher-random-grouping',
    title: '老師如何快速隨機分組？省時公平的課堂分組方法',
    description: '從教學角度說明課堂隨機分組的流程、工具選擇、公平性考量、名單清理與分組後的調整策略，幫助老師節省課堂時間並降低爭議，也整理課堂使用檢查清單。',
    summary: '用線上工具在課堂上快速完成隨機分組，並依教學需求微調結果。',
    published: '2026-06-23',
    updated: '2026-06-23',
    toolLinks: [
      { slug: 'random-group-generator', label: '隨機分組工具', note: '貼入名單即可自動分組' },
      { slug: 'random-name-picker', label: '隨機抽籤工具', note: '需要抽人時使用' },
    ],
    sections: [
      {
        heading: '為什麼老師需要隨機分組？',
        paragraphs: [
          '課堂分組最常見的挑戰是時間不夠和學生覺得不公平。人工分組需要老師在腦中考慮能力搭配、人際關係和座位距離，通常要花 3–5 分鐘以上。隨機分組可以在幾秒內完成初步結果，老師只需做少量調整即可。',
          '隨機分組也能打破固定的社交圈。學生在每次活動中與不同人合作，有助於增加課堂互動的多元性，也降低「總是和好朋友一組但沒在討論」的情況。',
        ],
        subsections: [
          {
            heading: '隨機不代表放棄調整',
            paragraphs: [
              '隨機結果只是起點，老師仍應檢查：是否有特殊需求學生需要調整、同一組是否能力過度集中或分散、人數是否平均。用隨機結果做 80% 的工作，人工微調 20%，比全部手動分配更有效率。',
            ],
          },
        ],
      },
      {
        heading: '課堂分組的實際操作流程',
        paragraphs: [
          '事前準備：在開學初建立班級名單的文字檔，每行一個名字，儲存在手機或電腦上。上課前打開隨機分組工具，貼入名單、設定組數，就能在投影畫面上即時產生結果。',
          '公布方式：可以直接投影結果、複製貼到班級群組，或口頭唸出。如果學生對分組有疑慮，可以當場說明「這是電腦隨機產生的，老師會檢查有沒有需要調整的地方」。透明的流程有助於建立學生對分組公平性的信任。',
        ],
        subsections: [
          {
            heading: '分組頻率建議',
            paragraphs: [
              '長期專案（如期末報告）通常固定分組一次即可。短期活動（如課堂討論、小測驗）可以每次重新分組，讓學生有機會與不同人合作。有些老師每週換一次，有些每堂課都換，視教學目標而定。',
            ],
          },
        ],
      },
    ],
    faq: [
      { question: '可以排除某些配對嗎？', answer: '簡單的隨機分組工具通常不支援排除規則。如果有不適合同組的學生，可以在結果出來後手動交換。' },
      { question: '分組工具需要學生個資嗎？', answer: '只需要名字即可。不要輸入學號、電話或其他個人資料。工具在瀏覽器本機處理，名單不會被儲存。' },
      { question: '人數不整除怎麼辦？', answer: '工具會自動處理，最後一兩組可能多或少一人。老師可以視情況決定哪組多一個人，或讓多出來的學生選組加入。' },
      { question: '遠距教學也能用嗎？', answer: '可以。把分組結果複製貼到線上教室的聊天室或公告區，學生依此進入對應的分組討論室。' },
    ],
  },
  {
    slug: 'seating-chart-guide',
    title: '班級座位表怎麼快速產生？老師與活動主辦的實用方法',
    description: '說明快速建立班級或活動座位表的方法，包含輸入名單、調整排列、保留特殊需求與匯出結果的流程，適合老師、班導師與活動主辦人，也附常見錯誤提醒和檢查清單。',
    summary: '用線上工具快速產生座位表，省去手動畫表格的時間。',
    published: '2026-06-23',
    updated: '2026-06-23',
    toolLinks: [
      { slug: 'seating-chart', label: '座位表產生器', note: '輸入名單即可產生座位排列' },
      { slug: 'random-group-generator', label: '隨機分組工具', note: '先分組再安排座位' },
    ],
    sections: [
      {
        heading: '為什麼需要座位表工具？',
        paragraphs: [
          '每學期換座位、新生入學、活動場地安排——這些情境都需要座位表。用試算表或手動在紙上畫格子雖然可行，但調整起來很麻煩。線上座位表工具讓你快速輸入名單、拖曳調整位置，並產生可列印或複製的結果。',
          '座位安排不只是把人填進格子。老師要考慮視力需求、學習支持、行為管理和同儕互動；活動主辦要考慮動線、VIP 位置和無障礙空間。工具幫你快速完成初稿，你再依這些因素微調。',
        ],
      },
      {
        heading: '座位表的建立與調整流程',
        paragraphs: [
          '第一步是設定教室或場地的基本配置：幾排、每排幾個座位。第二步是貼入參加者名單，工具會自動填入座位。第三步是拖曳調整——把需要坐前面的學生移到前排、讓需要靠近走道的人坐在邊緣位置。',
          '調整完成後可以複製文字結果貼到班級公告，或列印出來張貼在教室。有些老師會在開學第一週先用隨機排列，觀察學生互動情形後再手動微調成正式座位表。',
        ],
        subsections: [
          {
            heading: '座位表要多久換一次？',
            paragraphs: [
              '沒有固定答案。有些老師每月換一次增加新鮮感，有些每學期只換一次維持穩定。常見做法是在段考後換座位，同時參考學生的視力與行為表現做調整。',
            ],
          },
        ],
      },
    ],
    faq: [
      { question: '可以設定不規則的座位配置嗎？', answer: '視工具功能而定。基本工具通常只支援標準的行列排列；若教室是 U 型或分組桌，可能需要手動調整。' },
      { question: '名單會被儲存嗎？', answer: '線上工具通常在瀏覽器本機處理，不會上傳名單到伺服器。關閉頁面後資料會消失，建議先複製或匯出結果。' },
      { question: '可以標示空位嗎？', answer: '部分工具支援。如果不支援，可以在名單中加入「空位」或「-」作為佔位符，產生後再識別哪些是真正的空座位。' },
    ],
  },
  {
    slug: 'mortgage-calculation-guide',
    title: '房貸月付金怎麼算？公式原理與線上試算教學',
    description: '從公式原理出發，說明房貸月付金的計算方法、本金與利息的拆解、影響月付金的關鍵因素，以及如何用線上工具快速試算不同利率與年限方案，並提醒估算限制。',
    summary: '理解房貸月付金的計算邏輯，用線上工具比較不同貸款條件下的每月還款金額。',
    published: '2026-06-23',
    updated: '2026-06-23',
    toolLinks: [
      { slug: 'mortgage-payment', label: '房貸月付試算', note: '輸入金額、利率與年限即可試算' },
      { slug: 'compound-interest', label: '複利計算器', note: '了解利息如何累積' },
    ],
    sections: [
      {
        heading: '房貸月付金包含什麼？',
        paragraphs: [
          '每月房貸還款金額主要由兩部分組成：本金償還和利息費用。等額本息（最常見的方式）每月還款總額固定，但前期利息佔比較高、本金佔比較低，隨著時間推移，本金比例會逐漸增加。',
          '影響月付金的三個關鍵因素是貸款金額、年利率和貸款年限。金額越大月付越高、利率越高月付越高、年限越長月付越低但總利息越多。了解這三者的關係，才能在「月付負擔」和「總利息成本」之間做出適合自己的選擇。',
        ],
        subsections: [
          {
            heading: '等額本息 vs. 等額本金',
            paragraphs: [
              '等額本息每月還款金額固定，預算規劃容易。等額本金每月還款金額會逐漸減少（因為利息基數越來越小），前期壓力較大但總利息較少。大部分銀行預設提供等額本息方案，部分銀行也提供等額本金選項。',
            ],
          },
        ],
      },
      {
        heading: '如何用線上工具試算不同方案？',
        paragraphs: [
          '打開房貸月付試算工具，輸入貸款金額（例如 800 萬）、年利率（例如 2.1%）和貸款年限（例如 30 年），工具會立即算出每月應付金額和總利息。接著改變其中一個變數，比較結果：例如 20 年和 30 年的月付差多少、利率差 0.5% 會影響多少總利息。',
          '實際情況還有其他費用需要考慮：地價稅、房屋稅、管理費、保險等。線上試算工具計算的是純粹的貸款本息，不包含這些額外支出。在決定可負擔的房貸額度時，應該把所有住房相關費用一起評估。',
        ],
        subsections: [
          {
            heading: '試算結果能當作正式依據嗎？',
            paragraphs: [
              '線上試算僅供參考。實際利率由銀行依個人條件評估，可能有浮動利率、階梯利率或寬限期等變化。正式金額應以銀行核貸通知為準。',
            ],
          },
        ],
      },
    ],
    faq: [
      { question: '寬限期內只付利息嗎？', answer: '是的。寬限期內月付金只包含利息，本金不減少。寬限期結束後月付金會增加，因為要在剩餘年限內還完全部本金。' },
      { question: '提前還款划算嗎？', answer: '提前還款可以減少總利息，但部分銀行會收取違約金。是否划算要看違約金金額、剩餘期數和目前利率，建議向銀行確認後再決定。' },
      { question: '利率升降會影響已簽約的房貸嗎？', answer: '如果是浮動利率方案，央行調整基準利率後你的利率會跟著變動，月付金也會改變。固定利率方案則不受影響。' },
      { question: '貸款年限越長越好嗎？', answer: '年限長月付低，但總利息更多。例如 800 萬貸 20 年和 30 年，每月差幾千元，但 30 年的總利息可能多出數十萬到上百萬。' },
    ],
  },
  {
    slug: 'compound-interest-reading-guide',
    title: '複利計算器怎麼看？搞懂每個數字的意思',
    description: '教你看懂複利計算器的輸出結果，包含本金、利息、總額、年化報酬率的意義，以及常見的計算誤區、費用假設與長期試算注意事項，並提醒結果不是投資保證。',
    summary: '學會閱讀複利計算器的每一個數字，理解你的儲蓄或投資在時間推移下的變化。',
    published: '2026-06-23',
    updated: '2026-06-23',
    toolLinks: [
      { slug: 'compound-interest', label: '複利計算器', note: '輸入本金、利率和年限即可計算' },
      { slug: 'mortgage-payment', label: '房貸月付試算', note: '了解利息在貸款中的影響' },
    ],
    sections: [
      {
        heading: '複利計算器上的數字代表什麼？',
        paragraphs: [
          '複利計算器通常會顯示幾個關鍵數字：期初本金、每期投入、年利率、計息期數、期末總額和累計利息。「期末總額」是你最終拿到的金額，「累計利息」則是總額減去所有投入的本金。',
          '最容易被誤解的是「年利率」和「實際報酬」的差異。如果年利率 5% 但每月複利一次，實際年化報酬率會略高於 5%。計算器通常已經把複利頻率納入計算，但你應該確認工具是用年複利還是月複利，因為結果會有些微差異。',
        ],
        subsections: [
          {
            heading: '「72 法則」快速估算',
            paragraphs: [
              '用 72 除以年利率，可以大致估算本金翻倍所需的年數。例如 6% 的利率大約 12 年翻倍（72÷6=12）。這只是近似值，實際結果要看複利頻率和是否有額外投入。',
            ],
          },
        ],
      },
      {
        heading: '常見的複利計算誤區',
        paragraphs: [
          '第一個誤區是忽略通膨。計算器顯示 20 年後有 200 萬，但考慮每年 2% 的通膨後，購買力可能只相當於現在的 130 多萬。第二個誤區是把「預期報酬率」當成「保證報酬率」。股市的長期平均報酬率不代表每年都能達到。',
          '第三個誤區是忽略稅和費用。利息收入可能要繳稅，投資基金有管理費。實際到手的金額會比計算器顯示的少。使用計算器時，建議用稅後利率或扣除費用後的利率來計算，結果更貼近真實情況。',
        ],
      },
    ],
    faq: [
      { question: '月複利和年複利差很多嗎？', answer: '在利率較低時差異不大。例如 3% 年利率，年複利和月複利的差異大約是 0.04%。利率越高或期數越長，差異越明顯。' },
      { question: '負利率可以計算嗎？', answer: '技術上可以，但結果代表資產在縮水。通常用來模擬通膨對購買力的侵蝕。' },
      { question: '計算器的結果可以當作投資建議嗎？', answer: '不可以。計算器只做數學運算，不考慮市場風險、個人財務狀況和稅務影響。投資決策應諮詢合格的理財顧問。' },
      { question: '定期定額投入和一次性投入哪個好？', answer: '一次性投入在數學上通常更有利（假設長期上漲），但定期定額可以分散進場時機風險。兩者可以用計算器分別試算比較。' },
    ],
  },
  {
    slug: 'image-format-comparison',
    title: '圖片格式差異：JPG、PNG、WebP 怎麼選？',
    description: '比較 JPG、PNG、WebP 三種常見圖片格式的特點、適用場景、透明背景、檔案大小和品質差異，幫助你在不同情境下選擇正確格式，並連到相關轉檔工具。',
    summary: '了解 JPG、PNG、WebP 各自的優缺點，根據用途選擇最適合的圖片格式。',
    published: '2026-06-23',
    updated: '2026-06-23',
    toolLinks: [
      { slug: 'image-compressor', label: '圖片壓縮工具', note: '壓縮不同格式的圖片' },
      { slug: 'images-to-pdf', label: '圖片轉 PDF', note: '把不同格式的圖片整理成文件' },
    ],
    sections: [
      {
        heading: '三種格式的基本差異',
        paragraphs: [
          'JPG（也寫成 JPEG）是最普遍的照片格式，使用有損壓縮，適合色彩豐富的照片。優點是檔案小，缺點是每次儲存都會再壓縮一次，品質會逐漸下降，而且不支援透明。',
          'PNG 使用無損壓縮，支援透明背景，適合截圖、Logo、圖表和需要清晰邊緣的圖片。缺點是檔案通常比 JPG 大，尤其是色彩豐富的照片。',
          'WebP 是較新的格式，同時支援有損和無損壓縮，也支援透明。檔案大小通常比同品質的 JPG 和 PNG 都小。缺點是部分舊版軟體和少數網站不支援。',
        ],
      },
      {
        heading: '不同情境該選哪種格式？',
        paragraphs: [
          '拍照和日常照片：JPG 最適合，檔案小且所有裝置都支援。去背圖片和 Logo：PNG 適合保留透明背景。網頁圖片：WebP 是首選，檔案最小且主流瀏覽器都支援。列印用途：通常用原始格式或高品質 JPG/PNG。',
          '如果你不確定該選哪種，問自己兩個問題：需要透明嗎？如果是，選 PNG 或 WebP。不需要透明？看對方能不能開 WebP——可以的話用 WebP，不行就用 JPG。當你需要反覆編輯同一張圖片時，工作過程中使用 PNG（無損），最後輸出時再轉成 JPG 或 WebP。',
        ],
        subsections: [
          {
            heading: '社群平台會自動轉格式嗎？',
            paragraphs: [
              '大多數社群平台（Instagram、Facebook、LINE 等）上傳後會自動壓縮和轉格式。不管你上傳 PNG 還是 JPG，平台通常會轉成自己偏好的格式和解析度。因此不需要為了社群發文特別選格式，品質主要取決於原始圖片的解析度。',
            ],
          },
        ],
      },
    ],
    faq: [
      { question: 'GIF 適合什麼用途？', answer: 'GIF 支援動畫但色彩限制 256 色，適合簡單動圖和小型動畫。靜態圖片不建議用 GIF，檔案大且品質受限。' },
      { question: 'HEIF/HEIC 是什麼？', answer: 'iPhone 預設的照片格式，壓縮效率高於 JPG。但許多軟體和網站不直接支援，分享前可能需要轉成 JPG。' },
      { question: '把 JPG 轉成 PNG 可以提升品質嗎？', answer: '不能。JPG 壓縮已經損失的資訊無法恢復。轉成 PNG 只會讓檔案變大而不會改善品質。' },
      { question: '所有瀏覽器都支援 WebP 嗎？', answer: '目前主流瀏覽器（Chrome、Firefox、Safari、Edge）都支援 WebP。只有非常舊的瀏覽器版本才不支援。' },
    ],
  },
  {
    slug: 'pomodoro-focus-guide',
    title: '線上番茄鐘怎麼用？提升專注力的免費工具教學',
    description: '說明番茄鐘工作法的原理、線上工具的操作步驟、時間設定建議，以及在讀書、遠端工作與專案整理等情境下如何調整節奏，並附常見使用錯誤與休息安排建議。',
    summary: '學會用免費線上番茄鐘建立專注與休息的節奏，提升工作和學習效率。',
    published: '2026-06-23',
    updated: '2026-06-23',
    toolLinks: [
      { slug: 'pomodoro-timer', label: '番茄鐘計時器', note: '免費線上番茄鐘，可自訂時間' },
      { slug: 'word-counter', label: '字數統計工具', note: '搭配番茄鐘追蹤寫作進度' },
    ],
    sections: [
      {
        heading: '什麼是番茄鐘工作法？',
        paragraphs: [
          '番茄鐘工作法（Pomodoro Technique）由義大利人 Francesco Cirillo 在 1980 年代提出。核心概念很簡單：專注工作 25 分鐘，休息 5 分鐘，每 4 個循環後休息 15–30 分鐘。這個方法之所以有效，是因為它把「持續工作」變成「分段衝刺」，減少大腦的抗拒感。',
          '番茄鐘不是萬能的。它最適合需要持續專注的獨立工作，例如寫作、讀書、程式開發、設計或行政處理。會議、電話、需要隨時回應的工作則不太適合硬性套用。',
        ],
        subsections: [
          {
            heading: '為什麼 25 分鐘？',
            paragraphs: [
              '25 分鐘是一個「夠長能進入狀態，但不會長到疲勞」的區間。研究顯示人的注意力會在 20–45 分鐘後自然下降。你可以根據自己的經驗調整——有人用 50 分鐘效果更好，有人覺得 15 分鐘更適合。重要的是建立「專注→休息」的節奏。',
            ],
          },
        ],
      },
      {
        heading: '如何用線上番茄鐘開始？',
        paragraphs: [
          '打開番茄鐘計時器，確認專注、短休息和長休息的時間設定。初次使用建議先用預設的 25/5/15 分鐘。按下開始前，先決定這一輪要做什麼——「寫完引言段落」或「處理 10 封 Email」，比「工作」這種模糊目標更有效。',
          '專注期間關閉社群通知、把手機翻面、告訴同事你在專注。休息時間真的休息：離開螢幕、喝水、伸展。不要用休息時間滑手機，因為那會讓大腦得不到真正的恢復。4 個循環後的長休息可以出去走走或吃點東西。',
        ],
        subsections: [
          {
            heading: '被打斷怎麼辦？',
            paragraphs: [
              '如果被打斷超過一兩分鐘，番茄鐘理論上應該重新開始。但實際操作中，你可以暫停計時器處理急事，再繼續完成。重點不是嚴格遵守規則，而是培養「意識到自己被打斷」的覺察，逐漸減少不必要的干擾。',
            ],
          },
        ],
      },
    ],
    faq: [
      { question: '番茄鐘一定要配合特定 App 嗎？', answer: '不一定。用手機鬧鐘、廚房計時器或任何線上工具都可以。線上番茄鐘的好處是自動切換階段和在瀏覽器標題顯示倒數。' },
      { question: '休息時可以看手機嗎？', answer: '建議不要。社群媒體和新聞會讓大腦繼續處於刺激狀態，降低休息的恢復效果。短休息適合站起來、伸展、看窗外或喝水。' },
      { question: '工作性質需要隨時回訊息，還能用番茄鐘嗎？', answer: '可以調整。把專注時間縮短到 15 分鐘，或在每個短休息時統一回覆訊息。重點是有意識地區分「專注時段」和「回覆時段」。' },
      { question: '寫程式時 25 分鐘太短怎麼辦？', answer: '如果你進入心流狀態，可以延長到 45–50 分鐘。番茄鐘的核心不是 25 分鐘這個數字，而是「有計畫地休息」這個習慣。' },
    ],
  },
];

const englishPillarContent: Record<string, EnglishBlogPostContent> = {
  'teacher-exam-score-guide': {
    title: 'Teacher Exam Score Guide',
    description: 'Read teacher exam scores with weighted totals, Z scores, T scores, and percentile rank. Taiwan-style weights are examples, not official rules.',
    summary: 'Learn how to move from raw exam scores to weighted totals, standard scores, T scores, and percentile rank, with clear examples for teacher exams and classroom reporting.',
    categoryLabel: 'Statistics tools',
    toolLinks: [
      { label: 'Teacher exam score converter', note: 'Combine written, oral, trial teaching, and other weighted items as examples.' },
      { label: 'Weighted average calculator', note: 'Check any score mix where each item has a different weight.' },
      { label: 'T score calculator', note: 'Convert a Z score into a T score scale for easier comparison.' },
      { label: 'Z score calculator', note: 'See how far a score is from the group average.' },
      { label: 'Percentile rank calculator', note: 'Estimate what share of the group is below a score.' },
    ],
    sections: [
      {
        heading: 'Why one raw score is not enough',
        paragraphs: [
          'Teacher exams and teacher-selection workflows often combine several parts: written tests, interviews, teaching demonstrations, portfolios, or local screening items. A raw score from one part is useful, but it does not tell the full story until you know the weight, the group average, and the spread of scores. This guide uses Taiwan-style teacher exam scenarios as examples only. Always follow the official notice for the actual exam, district, or school.',
          'Use the score tools as a checking layer: calculate the weighted total first, then compare the result with standard-score measures such as Z score, T score, and percentile rank. This keeps the workflow transparent and makes it easier to explain a score to students, parents, or colleagues without treating an estimate as an official result.',
        ],
      },
      {
        heading: 'A practical calculation flow',
        paragraphs: [
          'Start with the official weight table. For example, a written score might count 70%, an interview 15%, and a teaching demo 15%. Enter those values in the weighted average calculator or teacher exam score converter, then check whether every percentage is entered as the correct decimal or percent. A 70/15/15 example means 0.70, 0.15, and 0.15, not three equal parts.',
          'After the weighted total is clear, use the Z score calculator when you know the group mean and standard deviation. A Z score can then be converted to a T score with the common example formula T = 50 + 10z. Use percentile rank when the question is comparative: for example, roughly what percentage of candidates scored below this result. These conversions are examples for interpretation, not a replacement for official ranking rules.',
        ],
      },
      {
        heading: 'Common mistakes',
        paragraphs: [
          'The most common mistake is mixing official score rules with personal spreadsheet habits. Do not round too early, do not reuse last year weights without checking, and do not compare a raw written-test score with another person’s weighted total. Keep the raw item scores, weight table, weighted total, and comparison metric in separate rows so every step can be reviewed.',
          'Another mistake is treating PR or T score as a certificate of admission. These values describe position within a known group or assumed distribution. They are helpful for reading a score, but final decisions may include tie-breakers, thresholds, documentation checks, or local rules that are outside the calculator.',
        ],
      },
    ],
    faq: [
      { question: 'Can I use this for an official teacher exam result?', answer: 'Use it for checking and explanation only. Official results must follow the notice published by the exam organizer, school, or authority.' },
      { question: 'What is the difference between Z score and T score?', answer: 'A Z score shows distance from the mean in standard-deviation units. A T score is a friendlier scale often shown with mean 50 and standard deviation 10.' },
      { question: 'Does PR mean my exact rank?', answer: 'No. Percentile rank estimates the share of scores below a value. Exact rank depends on the actual candidate list and tie rules.' },
      { question: 'Should I round every step?', answer: 'Avoid early rounding. Keep full precision through the calculation, then round only the final value according to the official rule or report format.' },
      { question: 'What if the weight table changes?', answer: 'Rebuild the calculation from the official current table. Do not reuse an older spreadsheet unless every weight and item name has been checked.' },
    ],
  },
  't-score-pr-guide': {
    title: 'T Score, Z Score, and PR Guide',
    description: 'Understand Z scores, T scores, percentile rank, class percentile, and standard deviation with practical examples for exams, classroom analysis, and score reports.',
    summary: 'A clear guide to standard-score vocabulary: what Z score, T score, and PR mean, when to use each one, and how to avoid over-reading a score report.',
    categoryLabel: 'Statistics tools',
    toolLinks: [
      { label: 'Z score calculator', note: 'Convert a raw value into distance from the mean.' },
      { label: 'T score calculator', note: 'Convert Z score into a 50/10 score scale.' },
      { label: 'Percentile rank calculator', note: 'Estimate the percentage of values below a score.' },
      { label: 'Class rank percentile calculator', note: 'Turn a rank and class size into a percentile-style reading.' },
      { label: 'Standard deviation calculator', note: 'Measure how spread out a score group is.' },
    ],
    sections: [
      {
        heading: 'Z score: the basic standard score',
        paragraphs: [
          'A Z score tells you how far a value is from the average, measured in standard deviations. A Z score of 0 is exactly at the mean. A Z score of 1 is one standard deviation above the mean, and -1 is one standard deviation below it. This makes scores from different tests easier to compare when the groups have different averages or spreads.',
        ],
      },
      {
        heading: 'T score: the same idea on an easier scale',
        paragraphs: [
          'A T score is often calculated as T = 50 + 10z. It keeps the comparison meaning of the Z score but avoids many negative values and decimals. For example, z = 1 becomes T = 60, and z = -0.5 becomes T = 45. This is why T scores are common in test reports and selection workflows: they are easier to read while still being based on the group distribution.',
        ],
      },
      {
        heading: 'PR and percentile: position in the group',
        paragraphs: [
          'Percentile rank answers a different question: approximately what share of the group scored below this score? A PR of 80 means the score is above about 80% of the comparison group, not that the person got 80% correct. It is useful for explaining relative position, but it depends heavily on the actual group and method used to calculate it.',
        ],
      },
    ],
    faq: [
      { question: 'Is a T score always out of 100?', answer: 'No. A T score is a standard-score scale, commonly centered at 50 with standard deviation 10. It is not a percentage.' },
      { question: 'Can I convert any Z score to PR?', answer: 'Only if the distribution assumption is appropriate or you have the actual group data. Otherwise it is an estimate.' },
      { question: 'Is class percentile the same as PR?', answer: 'They are related, but class percentile often starts from rank and class size, while PR usually comes from score distribution.' },
      { question: 'Why does standard deviation matter?', answer: 'It tells you how spread out the group is. The same raw-score gap can mean very different things in a tight group versus a widely spread group.' },
      { question: 'Which score should I report?', answer: 'Report the metric required by the school, exam notice, or project. If there is no rule, explain both raw score and the comparison metric clearly.' },
    ],
  },
  'classroom-random-tools-guide': {
    title: 'Teacher Classroom Tools Guide',
    description: 'A teacher-focused guide to using random student pickers, group generators, seating charts, and name pickers for fairer classroom routines and faster lesson flow.',
    summary: 'Use classroom random tools to pick students, build groups, arrange seats, and run quick activities while keeping the process visible and fair.',
    categoryLabel: 'Study tools',
    toolLinks: [
      { label: 'Random student picker', note: 'Pick a student from a class list for questions or activities.' },
      { label: 'Random group generator', note: 'Split students into random teams quickly.' },
      { label: 'Group generator', note: 'Create groups from a pasted name list.' },
      { label: 'Seating chart', note: 'Plan and adjust classroom seating layouts.' },
      { label: 'Random name picker', note: 'Use a simple picker for names, topics, or classroom turns.' },
    ],
    sections: [
      {
        heading: 'Random does not mean careless',
        paragraphs: [
          'In class, random tools are most useful when students can see that the process is consistent. A visible random picker can reduce arguments about favoritism, while a group generator can save time during activities. The teacher still sets the rule: who is included, whether absentees stay in the list, and whether certain combinations should be avoided for learning or safety reasons.',
        ],
      },
      {
        heading: 'Picking students, groups, and classroom turns',
        paragraphs: [
          'Use a random student picker for quick questions, presentation order, reading turns, or review games. For group work, paste the class list into a random group generator and decide the group size before you start. If the class needs balanced groups, make the first random pass, then adjust only the clearly necessary cases and explain the rule briefly.',
        ],
      },
      {
        heading: 'Seating and activity planning',
        paragraphs: [
          'A seating chart is useful when you want to separate distractions, support students who need help, or rotate seats regularly. Random seating can be a starting point, but teachers should keep professional judgment for accessibility, behavior, vision, hearing, and classroom management. For short activities, combine a seating chart with a random picker so students know both the place and the turn order.',
        ],
      },
    ],
    faq: [
      { question: 'Should groups be fully random?', answer: 'Not always. Random grouping is fast and transparent, but teachers may need to adjust for learning goals, support needs, or classroom safety.' },
      { question: 'How do I avoid repeated picks?', answer: 'Keep a visible list or remove the selected name after each turn if the activity requires everyone to be picked once.' },
      { question: 'Can a seating chart be random?', answer: 'Yes, but treat random seating as a draft. Adjust for accessibility, behavior, and practical classroom needs.' },
      { question: 'What should I do with absent students?', answer: 'Decide before starting. Either remove absent names from the list or keep them only if the activity plan still needs their slot.' },
      { question: 'Can students use these tools too?', answer: 'Yes. For group projects or club activities, a shared random picker can make turn-taking feel more transparent.' },
    ],
  },
  'pdf-workflow-guide': {
    title: 'PDF Tools Workflow Guide',
    description: 'A practical PDF workflow guide for merging, splitting, compressing, reordering, extracting pages, deleting pages, and converting PDFs or images.',
    summary: 'Choose the right PDF tool for common file tasks: combine documents, split chapters, reduce file size, reorder pages, extract pages, delete pages, or convert images.',
    categoryLabel: 'PDF tools',
    toolLinks: [
      { label: 'Merge PDF', note: 'Combine several PDF files into one document.' },
      { label: 'Split PDF', note: 'Separate a PDF by page range or section.' },
      { label: 'PDF compressor', note: 'Reduce file size for upload or sharing.' },
      { label: 'PDF page reorder', note: 'Move pages into the correct order.' },
      { label: 'Extract PDF pages', note: 'Save selected pages as a new file.' },
      { label: 'Delete PDF pages', note: 'Remove unwanted pages before sending.' },
      { label: 'PDF to image', note: 'Export PDF pages as images.' },
      { label: 'Images to PDF', note: 'Combine images into a single PDF.' },
    ],
    sections: [
      {
        heading: 'Start with the file goal',
        paragraphs: [
          'Before choosing a PDF tool, decide what the final file must do. If several documents need to become one application packet, use Merge PDF. If only selected pages are needed, use Split PDF or Extract PDF pages. If the page order is wrong after scanning, reorder the pages first, then compress the final file only after the structure is correct.',
        ],
      },
      {
        heading: 'Split, reorder, and clean before compressing',
        paragraphs: [
          'Compression is often the last step. First remove blank pages, delete duplicates, extract only the pages you need, and put the document in the right order. Compressing too early can make later checks harder and may reduce image clarity more than necessary. Keep the original file until the final upload is accepted.',
        ],
      },
      {
        heading: 'Conversion and privacy checks',
        paragraphs: [
          'Use PDF to image when a page needs to be previewed, inserted into a slide, or shared as a picture. Use Images to PDF when photos, scanned pages, or screenshots should be sent as one document. For sensitive files, check the tool page privacy note and avoid uploading personal documents to services you do not trust.',
        ],
      },
    ],
    faq: [
      { question: 'Should I compress a PDF before or after merging?', answer: 'Usually after. Merge, reorder, delete, and extract first, then compress the final file.' },
      { question: 'Will merging PDF files change page quality?', answer: 'Merging itself usually keeps the pages as they are. Quality loss is more likely during compression or image conversion.' },
      { question: 'Is delete pages the same as extract pages?', answer: 'No. Delete pages removes unwanted pages from the document, while extract pages saves selected pages into a new file.' },
      { question: 'Are PDF tools safe for private files?', answer: 'Check each tool page. Prefer local browser processing for sensitive documents, and avoid entering or uploading highly confidential files.' },
      { question: 'Can I turn photos into a PDF?', answer: 'Yes. Use Images to PDF to combine screenshots, photos, or scanned pages into one PDF file.' },
    ],
  },
  'image-format-workflow-guide': {
    title: 'Image Tools Workflow Guide',
    description: 'A practical guide to image compression, resizing, cropping, JPG/PNG/WebP conversion, and QR code output for websites, social posts, documents, and classrooms.',
    summary: 'Learn when to compress, resize, crop, or convert images, and how to choose between JPG, PNG, WebP, and QR code output for everyday work.',
    categoryLabel: 'Image tools',
    toolLinks: [
      { label: 'Image compressor', note: 'Reduce JPG, PNG, or WebP file size.' },
      { label: 'Image resizer', note: 'Set practical dimensions for upload or display.' },
      { label: 'Image crop tool', note: 'Crop the important area before export.' },
      { label: 'PNG to JPG', note: 'Convert transparent or large PNG files when needed.' },
      { label: 'JPG to PNG', note: 'Create PNG output for workflows that require it.' },
      { label: 'JPG to WebP', note: 'Make smaller web-friendly images.' },
      { label: 'WebP to JPG', note: 'Convert WebP for apps that need JPG.' },
      { label: 'QR code generator', note: 'Create QR codes for links, text, or Wi-Fi details.' },
    ],
    sections: [
      {
        heading: 'Choose the format by use case',
        paragraphs: [
          'JPG is usually best for photos because it keeps file size low with acceptable visual quality. PNG is useful for sharp graphics, screenshots, logos, and transparency. WebP often gives smaller web images, but you may still need JPG or PNG when a platform, school system, or document workflow does not accept WebP.',
        ],
      },
      {
        heading: 'Compress, resize, crop, then convert',
        paragraphs: [
          'A clean image workflow starts with the visual area. Crop away unused space, resize to the dimensions the platform needs, and then compress the result. Conversion should match the destination: JPG for most photos, PNG for transparency or crisp UI images, and WebP for websites where browser support is acceptable.',
        ],
      },
      {
        heading: 'QR code output and scan quality',
        paragraphs: [
          'QR codes need strong contrast and enough quiet space around the pattern. Avoid heavy compression, blur, or low-resolution resizing that makes the modules unclear. For posters and handouts, export a clear PNG when possible, test scan it on more than one phone, and keep the linked URL short enough to avoid an overly dense code.',
        ],
      },
    ],
    faq: [
      { question: 'Does converting JPG to PNG improve quality?', answer: 'No. It may prevent further JPG compression, but it cannot restore detail already lost in the JPG file.' },
      { question: 'Why does PNG sometimes become larger than JPG?', answer: 'PNG is lossless and keeps transparency, which is useful for graphics but often larger for photos.' },
      { question: 'Is WebP always the best image format?', answer: 'No. WebP is efficient for many web images, but JPG or PNG may be better for compatibility, editing, or print workflows.' },
      { question: 'Should I resize before compressing?', answer: 'Usually yes. Reducing an oversized image to the needed dimensions often saves more space than compression alone.' },
      { question: 'Can I compress a QR code?', answer: 'Be careful. Heavy compression or blur can make a QR code hard to scan. Keep contrast high and test the result.' },
    ],
  },
};

export const blogPosts: BlogPost[] = rawBlogPosts.map(localizeRawPost);

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
