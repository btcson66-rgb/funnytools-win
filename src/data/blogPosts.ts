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
  contentHtml?: LocalizedText;
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
  contentHtml?: string;
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

function ensureMetaDescription(description: string, lang: Locale): string {
  if (description.trim().length >= 70) return description;
  const suffix = lang === 'en'
    ? ' Includes related tools, checkpoints, privacy notes, and FAQs for practical use.'
    : '，並整理相關工具、檢查重點、隱私提醒與常見問題，協助你更安全地完成實際任務。';
  return `${description.replace(/[，,。.\s]+$/, '')}${suffix}`;
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
    description: ensureMetaDescription(post.description[lang], lang),
    summary: post.summary[lang],
    categoryLabel: post.categoryLabel?.[lang],
    contentHtml: post.contentHtml?.[lang],
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

const rawBlogPosts: RawBlogPost[] = [];

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
