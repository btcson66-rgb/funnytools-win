/**
 * P1 (2026-10-15) removal map.
 *
 * es/fr locales, the template guides, workflows, audience pages, blog and shop
 * were removed from the site (they now return 404). The URLs below are the only
 * exceptions: each one is directly tied to a retained education-statistics page,
 * so it keeps a small redirect stub (noindex + canonical to the target + meta
 * refresh), the same mechanism as the legacy /zh/* stubs.
 *
 * Budget: at most 30 stubs. Every `to` must be in INDEXABLE_PATHS (checked by
 * scripts/removed-pages-audit.mjs). Do not add a stub for an unrelated page.
 */
export interface RemovedRedirect {
  from: string;
  to: string;
}

export const MAX_REMOVED_REDIRECTS = 30;

export const removedRedirects: RemovedRedirect[] = [
  // es/fr home pages (the only es/fr URLs Google had indexed)
  { from: '/es/', to: '/' },
  { from: '/fr/', to: '/' },
  // es hubs and guide that map onto retained hubs
  { from: '/es/estadisticas-educativas/', to: '/education-statistics/' },
  { from: '/es/categorias/estadistica/', to: '/education-statistics/' },
  { from: '/es/guias/puntuacion-t-interpretacion/', to: '/tools/t-score-calculator/' },
  // es guides whose subject is a retained tool
  { from: '/es/guias/puntuacion-z-interpretacion/', to: '/tools/z-score-calculator/' },
  { from: '/es/guias/rango-percentil-interpretacion/', to: '/tools/percentile-rank-calculator/' },
  { from: '/es/guias/calcular-nota-oposicion-docente/', to: '/tools/teacher-exam-score-converter/' },
  // es tools -> the matching retained tool
  { from: '/es/herramientas/calculadora-promedio-notas/', to: '/tools/grade-average/' },
  { from: '/es/herramientas/calculadora-desviacion-estandar/', to: '/tools/standard-deviation/' },
  { from: '/es/herramientas/calculadora-media-ponderada/', to: '/tools/weighted-average-calculator/' },
  { from: '/es/herramientas/calculadora-percentil-ranking-clase/', to: '/tools/class-rank-percentile-calculator/' },
  { from: '/es/herramientas/calculadora-puntuacion-t/', to: '/tools/t-score-calculator/' },
  { from: '/es/herramientas/calculadora-puntuacion-z/', to: '/tools/z-score-calculator/' },
  { from: '/es/herramientas/calculadora-rango-percentil/', to: '/tools/percentile-rank-calculator/' },
  { from: '/es/herramientas/calculadora-t-muestras-independientes/', to: '/tools/independent-samples-t-test-calculator/' },
  { from: '/es/herramientas/calculadora-nota-oposicion-docente/', to: '/tools/teacher-exam-score-converter/' },
  { from: '/es/herramientas/sorteo-nombres-aleatorio/', to: '/tools/random-name-picker/' },
  // fr tools -> the matching retained tool
  { from: '/fr/outils/calcul-moyenne-notes/', to: '/tools/grade-average/' },
  { from: '/fr/outils/calculateur-ecart-type/', to: '/tools/standard-deviation/' },
  { from: '/fr/outils/calculateur-moyenne-ponderee/', to: '/tools/weighted-average-calculator/' },
  { from: '/fr/outils/calculateur-rang-percentile/', to: '/tools/percentile-rank-calculator/' },
  { from: '/fr/outils/calculateur-score-t/', to: '/tools/t-score-calculator/' },
  { from: '/fr/outils/calculateur-score-z/', to: '/tools/z-score-calculator/' },
  { from: '/fr/outils/tirage-au-sort-noms/', to: '/tools/random-name-picker/' },
  // removed zh guides whose subject is a retained tool
  { from: '/guides/z-score-calculator-guide/', to: '/tools/z-score-calculator/' },
  { from: '/guides/percentile-rank-guide/', to: '/tools/percentile-rank-calculator/' },
  { from: '/guides/teacher-exam-weighted-score-guide/', to: '/tools/teacher-exam-score-converter/' },
  // P2 batch 4 (2026-10-17): duplicate-intent pages merged into the page that answers the same query
  { from: '/guides/t-score-calculator-guide/', to: '/tools/t-score-calculator/' },
  { from: '/category/statistics/', to: '/education-statistics/' },
];
