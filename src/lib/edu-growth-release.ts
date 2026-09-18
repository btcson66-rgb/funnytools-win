import type { Locale } from '../config/site';
import releaseConfig from '../config/edu-growth-release.json';

export type EducationGrowthCandidate = (typeof releaseConfig.candidates)[number];

function taipeiDate(value: Date = new Date()): string {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: releaseConfig.timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(value);
  const fields = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${fields.year}-${fields.month}-${fields.day}`;
}

export function isEducationGrowthCandidateDue(candidate: EducationGrowthCandidate, value: Date = new Date()): boolean {
  return releaseConfig.enabled
    && !releaseConfig.pause
    && candidate.reviewStatus === 'PASS'
    && candidate.publishAt <= taipeiDate(value);
}

export function isEducationGrowthToolPublic(slug: string, lang: Locale, value: Date = new Date()): boolean {
  const candidates = releaseConfig.candidates.filter((candidate) => candidate.slug === slug);
  return candidates.length === 0 || candidates.some((candidate) =>
    candidate.locale === lang && isEducationGrowthCandidateDue(candidate, value),
  );
}

export function isEducationGrowthToolDue(slug: string, value: Date = new Date()): boolean {
  const candidates = releaseConfig.candidates.filter((candidate) => candidate.slug === slug);
  return candidates.length === 0 || candidates.some((candidate) =>
    candidate.slug === slug && isEducationGrowthCandidateDue(candidate, value),
  );
}

export function getEducationGrowthCandidatesForLocale(lang: Locale, value: Date = new Date()): EducationGrowthCandidate[] {
  return releaseConfig.candidates.filter((candidate) =>
    candidate.locale === lang && isEducationGrowthCandidateDue(candidate, value),
  );
}

export function getEducationGrowthSchedule() {
  return releaseConfig;
}
