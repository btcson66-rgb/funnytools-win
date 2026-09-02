import type { Locale } from '../config/site';
import type { SeoGuide } from './seoGuides';
import type { Workflow } from './workflows';
import { localePath } from '../lib/url';

export interface HubDestination {
  id: string;
  label: string;
  href: string;
}

interface HubDefinition {
  id: string;
  segments: string[];
  label: Record<Locale, string>;
  locales?: Locale[];
}

const fallbackHub: HubDefinition = {
  id: 'guides',
  segments: ['guides'],
  label: { zh: '指南', en: 'Guides' },
};

// Task IDs are stable content metadata, while the destination remains the
// existing category, guide hub, or methodology route. No new content routes
// are invented here; an unmapped guide safely falls back to /guides/.
const guideHubByTask: Record<string, HubDefinition> = {
  'task-001': { id: 'education-statistics', segments: ['education-statistics'], label: { zh: '教育統計工具中心', en: 'Education & Statistics hub' } },
  'task-002': { id: 'education-statistics', segments: ['education-statistics'], label: { zh: '教育統計工具中心', en: 'Education & Statistics hub' } },
  'task-003': { id: 'category-pdf', segments: ['category', 'pdf'], label: { zh: 'PDF 工具', en: 'PDF Tools' } },
  'task-004': { id: 'category-image', segments: ['category', 'image'], label: { zh: '圖片與檔案', en: 'Image & File' } },
  'task-005': { id: 'category-text', segments: ['category', 'text'], label: { zh: '文字與寫作', en: 'Text & Writing' } },
  'task-006': { id: 'category-time', segments: ['category', 'time'], label: { zh: '工作與時間', en: 'Work & Time' } },
  'task-007': { id: 'category-draw', segments: ['category', 'draw'], label: { zh: '製圖工具', en: 'Drawing & CAD' } },
  'task-008': { id: 'category-random', segments: ['category', 'random'], label: { zh: '隨機工具', en: 'Random' } },
  'task-009': { id: 'qr-barcode', segments: ['guides', 'qr-barcode'], label: { zh: 'QR Code 與條碼指南中心', en: 'QR & Barcode guide hub' }, locales: ['zh'] },
  'task-010': { id: 'grades-gpa', segments: ['guides', 'grades-gpa'], label: { zh: '成績與 GPA 指南中心', en: 'Grades & GPA guide hub' }, locales: ['zh'] },
  'task-017': { id: 'text-writing', segments: ['guides', 'text-writing'], label: { zh: '文字與寫作指南中心', en: 'Text & Writing guide hub' }, locales: ['zh'] },
};

const workflowHubBySlug: Record<string, HubDefinition> = {
  'graduate-statistics-report-toolkit': guideHubByTask['task-001'],
  'teacher-exam-score-toolkit': guideHubByTask['task-010'],
  'teacher-classroom-random-toolkit': { id: 'category-study', segments: ['category', 'study'], label: { zh: '學生與老師', en: 'Student & Teacher' } },
  'student-report-toolkit': { id: 'category-study', segments: ['category', 'study'], label: { zh: '學生與老師', en: 'Student & Teacher' } },
  'office-document-toolkit': { id: 'category-pdf', segments: ['category', 'pdf'], label: { zh: 'PDF 工具', en: 'PDF Tools' } },
  'creator-social-toolkit': { id: 'category-text', segments: ['category', 'text'], label: { zh: '文字與寫作', en: 'Text & Writing' } },
  'daily-decision-toolkit': { id: 'category-random', segments: ['category', 'random'], label: { zh: '隨機工具', en: 'Random' } },
  'qr-barcode-publishing-toolkit': guideHubByTask['task-009'],
  'grade-gpa-check-toolkit': guideHubByTask['task-010'],
  'verify-tool-result': { id: 'methodology', segments: ['methodology'], label: { zh: '方法與驗證', en: 'Methodology & verification' } },
  'text-cleanup-publishing-toolkit': guideHubByTask['task-017'],
};

function toDestination(definition: HubDefinition, lang: Locale): HubDestination {
  if (definition.locales && !definition.locales.includes(lang)) {
    return toDestination(fallbackHub, lang);
  }
  return {
    id: definition.id,
    label: definition.label[lang],
    href: localePath(lang, ...definition.segments),
  };
}

export function resolveGuideHub(guide: Pick<SeoGuide, 'task'>, lang: Locale): HubDestination {
  return toDestination(guideHubByTask[guide.task ?? ''] ?? fallbackHub, lang);
}

export function resolveWorkflowHub(workflow: Pick<Workflow, 'slug'>, lang: Locale): HubDestination {
  return toDestination(workflowHubBySlug[workflow.slug] ?? fallbackHub, lang);
}
