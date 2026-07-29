import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const dist = join(root, 'dist');
const publicDir = join(root, 'public');
const registry = JSON.parse(readFileSync(join(root, 'src', 'i18n', 'expansion-routes.json'), 'utf8'));
const siteOrigin = 'https://funnytools.win';
const failures = [];
const pages = [];

function fail(message) {
  failures.push(message);
}

function htmlFile(pathname) {
  const clean = pathname.replace(/^\/+|\/+$/g, '');
  return clean ? join(dist, clean, 'index.html') : join(dist, 'index.html');
}

function decode(value) {
  return value
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>');
}

function plainText(html) {
  return decode(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<svg[\s\S]*?<\/svg>/gi, ' ')
      .replace(/<[^>]+>/g, ' '),
  ).replace(/\s+/g, ' ').trim();
}

function attr(tag, name) {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return tag.match(new RegExp(`${escaped}\\s*=\\s*["']([^"']*)["']`, 'i'))?.[1] ?? '';
}

function linkTags(html, rel) {
  return [...html.matchAll(/<link\b[^>]*>/gi)]
    .map((match) => match[0])
    .filter((tag) => attr(tag, 'rel').toLowerCase() === rel);
}

function jsonLdTypes(html, pathname) {
  const types = new Set();
  for (const match of html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      const data = JSON.parse(match[1]);
      const items = Array.isArray(data) ? data : [data];
      for (const item of items) if (item?.['@type']) types.add(item['@type']);
    } catch {
      fail(`${pathname}: données JSON-LD invalides.`);
    }
  }
  return types;
}

const frenchRoutes = registry.routes.filter((route) => route.paths?.fr);
const activeBatchRoutes = registry.routes.filter(
  (route) => route.localeBatches?.[registry.activeLocale] === registry.activeLocaleBatch,
);
if (registry.activeLocale !== 'fr') {
  fail(`activeLocale must be fr during the French publication phase; found ${registry.activeLocale}.`);
}
if (activeBatchRoutes.length < 1 || activeBatchRoutes.length > registry.maxBatchSize) {
  fail(`Active French batch ${registry.activeLocaleBatch} must contain 1-${registry.maxBatchSize} routes; found ${activeBatchRoutes.length}.`);
}
if (activeBatchRoutes.some((route) => !route.paths?.fr)) {
  fail(`Active French batch ${registry.activeLocaleBatch} contains a route without a French path.`);
}

const requiredTermsByKey = {
  home: ['outils en ligne', 'sans inscription', 'navigateur', 'vérifier'],
  'grade-average': ['calcul moyenne notes', 'moyenne pondérée', 'coefficient', 'sur 20'],
  'merge-pdf': ['fusionner pdf', 'sans téléverser', 'navigateur', 'ordre'],
  'tools-index': ['outils en ligne gratuits', 'sans inscription', 'traitement local', 'vérifier'],
  privacy: ['politique de confidentialité', 'données personnelles', 'cookies', 'consentement'],
  'about-tools': ['fonctionnent les outils', 'traitement dans le navigateur', 'vérifier', 'limites'],
  'image-compressor': ['compresser une image', 'réduire le poids', 'jpeg', 'webp'],
  'qr-code-generator': ['générateur de code qr', 'qr code statique', 'correction', 'png'],
  'split-pdf': ['diviser un pdf', 'extraire les pages', 'plages', 'sans envoyer'],
  'image-resizer': ['redimensionner une image', 'largeur', 'hauteur', 'proportions'],
  'png-to-jpg': ['convertir un png en jpg', 'fond blanc', 'transparence', 'qualité'],
  'jpg-to-png': ['convertir un jpg en png', 'fond transparent', 'poids', 'dans le navigateur'],
  'image-crop': ['recadrer une image', 'recadrage', 'rectangle', 'pixels'],
  'jpg-to-webp': ['convertir un jpg en webp', 'qualité', 'poids', 'compatibilité'],
  'webp-to-jpg': ['convertir un webp en jpg', 'fond blanc', 'transparence', 'animation'],
  'image-rotate-flip': ['faire pivoter une image', 'retourner', 'effet miroir', '90°'],
  'image-to-base64': ['convertir une image en base64', 'data uri', 'type mime', 'chiffrement'],
  'images-to-pdf': ['convertir des images en pdf', 'jpg', 'png', 'ordre'],
  'rotate-pdf': ['faire pivoter un pdf', 'pages précises', '90°', 'rotation'],
  'delete-pdf-pages': ['supprimer des pages', 'plages', 'au moins une', 'métadonnées'],
  'extract-pdf-pages': ['extraire des pages', 'conserver', 'ordre', 'doublon'],
  'pdf-page-reorder': ['réorganiser les pages', 'ordre', 'monter', 'descendre'],
  'pdf-to-image': ['convertir un pdf en jpg', 'png', 'échelle', 'pixels'],
  'pdf-compressor': ['compresser un pdf', 'réduire', 'structure', 'pourcentage'],
  'standard-deviation': ['calculateur d’écart-type', 'variance', 'population', 'échantillon'],
  'percentage-calculator': ['calculateur de pourcentage', 'variation', 'hausse', 'points de pourcentage'],
  'bar-chart-maker': ['créer un graphique en barres', 'catégorie', 'axe', 'png'],
  'pie-chart-maker': ['diagramme circulaire', 'secteurs', 'pourcentage', 'dénominateur'],
  'word-counter': ['compteur de mots', 'caractères', 'paragraphes', 'temps de lecture'],
  'character-counter': ['compteur de caractères', 'octets utf-8', 'sms', 'méta-description'],
  'case-converter': ['convertir majuscules', 'minuscules', 'camelcase', 'snake_case'],
  'remove-empty-lines': ['supprimer les lignes vides', 'espaces', 'trim', 'lf'],
  'remove-duplicate-lines': ['supprimer les lignes en double', 'première occurrence', 'casse', 'tri'],
  'sort-lines': ['trier des lignes', 'ordre alphabétique', 'nombre initial', 'longueur'],
  'json-formatter': ['formater', 'valider', 'json', 'clés en double'],
  base64: ['encoder', 'décoder', 'base64', 'utf-8'],
  'url-encoder': ['encoder', 'décoder', 'url', 'percent-encoding'],
  'timestamp-converter': ['timestamp unix', 'secondes', 'millisecondes', 'utc'],
  'uuid-generator': ['générateur', 'uuid v4', 'crypto.randomuuid', 'unicité'],
  'csv-to-json': ['convertir csv en json', 'point-virgule', 'en-têtes', 'zéros initiaux'],
  'json-to-csv': ['convertir json en csv', 'point-virgule', 'bom utf-8', 'formules'],
  'markdown-previewer': ['éditeur markdown', 'aperçu html', 'dompurify', 'github'],
  'password-generator': ['générateur de mot de passe sécurisé', 'crypto.getrandomvalues', 'gestionnaire', 'mfa'],
  'barcode-generator': ['générateur de code-barres', 'ean-13', 'clé de contrôle', 'gs1'],
  'color-generator': ['générateur de couleur', 'hex', 'contraste', 'wcag'],
  'random-number-picker': ['générateur de nombres aléatoires', 'sans répétition', 'crypto.getrandomvalues', 'intervalle'],
  'random-name-picker': ['tirage au sort de noms', 'une entrée par ligne', 'retirer après le tirage', 'minimisation'],
  'random-wheel': ['roue aléatoire', 'roue de la chance', 'secteur', 'animation'],
  'random-group-generator': ['générateur de groupes aléatoires', 'effectifs', 'fisher–yates', 'groupes de besoins'],
  'dice-roller': ['lancer de dés en ligne', 'dé virtuel', 'd20', 'probabilité'],
  'this-or-that': ['choisir entre deux options', '50/50', 'pile ou face', 'consentement'],
  'what-to-eat': ['quoi manger ce soir', 'idée repas', 'une entrée par ligne', 'allergène'],
  'countdown-timer': ['minuteur en ligne', 'compte à rebours', 'date et heure', 'mise en veille'],
  stopwatch: ['chronomètre en ligne', 'temps partiel', 'temps total', 'performance.now'],
  'date-difference': ['calculer la différence entre deux dates', 'date de fin', '30,4375', 'inclure'],
  'age-calculator': ['calculateur d’âge', 'années révolues', '29 février', '70 battements'],
  'business-days': ['calculateur de jours ouvrés', 'jours ouvrables', 'jours calendaires', 'jours fériés'],
  'break-reminder': ['rappel de pause écran', 'pause active', 'date.now', 'notification système'],
  'net-salary': ['calculateur de salaire net', 'brut', 'urssaf', 'aucun taux français'],
  'overtime-pay': ['calculateur d’heures supplémentaires', '1,25', '1,50', 'heures complémentaires'],
  'mortgage-payment': ['calculateur de mensualité de prêt immobilier', 'taux nominal', 'taeg', 'assurance emprunteur'],
  'compound-interest': ['calculateur d’intérêts composés', 'versements mensuels', 'capitalisation', 'aucun rendement'],
  'savings-goal': ['calculateur d’objectif d’épargne', 'combien verser par mois', '1 200 mois', 'inflation'],
  'pomodoro-timer': ['minuteur pomodoro en ligne', '25 minutes', 'pause longue', 'date.now'],
  inflation: ['calculateur d’inflation', 'pouvoir d’achat', 'ipc', 'insee'],
  'cad-2d': ['cao 2d en ligne', 'accrochage aux extrémités', 'mode orthogonal', 'svg'],
  sketchpad: ['tableau blanc en ligne', 'dessiner en ligne', 'png', 'pointer events'],
  flowchart: ['créer un diagramme de flux', 'losange de décision', 'flèche', 'processus'],
  'random-student-picker': ['tirage au sort d’un élève', 'sans répétition', 'crypto.getrandomvalues', 'données personnelles'],
};
const expectedPageTypesByKey = {
  'tools-index': 'CollectionPage',
  privacy: 'WebPage',
  'about-tools': 'AboutPage',
};

for (const route of frenchRoutes) {
  const pathname = route.paths.fr;
  const file = htmlFile(pathname);
  if (!existsSync(file)) {
    fail(`${pathname}: fichier HTML construit introuvable.`);
    continue;
  }

  const html = readFileSync(file, 'utf8');
  const text = plainText(html);
  const lower = text.toLocaleLowerCase('fr');
  const words = text.match(/[\p{L}\p{N}][\p{L}\p{N}’'/-]*/gu)?.length ?? 0;
  const h1 = html.match(/<h1\b/gi)?.length ?? 0;
  const h2 = html.match(/<h2\b/gi)?.length ?? 0;
  const canonical = attr(linkTags(html, 'canonical')[0] ?? '', 'href');
  const alternates = new Map(linkTags(html, 'alternate').map((tag) => [attr(tag, 'hreflang'), attr(tag, 'href')]));
  const robotsNoindex = /<meta\b[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html);
  const types = jsonLdTypes(html, pathname);
  const minimumWords = route.type === 'tool' ? 950 : 800;

  if (!/<html\b[^>]*lang=["']fr["']/i.test(html)) fail(`${pathname}: html lang doit être fr.`);
  if (canonical !== `${siteOrigin}${pathname}`) fail(`${pathname}: canonical incorrect ou absent.`);
  if (robotsNoindex) fail(`${pathname}: la page française publiée contient noindex.`);
  if (h1 !== 1) fail(`${pathname}: un seul H1 attendu, ${h1} trouvé(s).`);
  if (h2 < (route.type === 'tool' ? 9 : 7)) fail(`${pathname}: profondeur AEO insuffisante (${h2} H2).`);
  if (words < minimumWords) fail(`${pathname}: ${words} mots français ; minimum ${minimumWords}.`);
  if (!html.includes('data-native-locale="fr"') || !html.includes('data-editorial-mode="native-search-intent"')) {
    fail(`${pathname}: marqueurs de rédaction française native absents.`);
  }
  if (!types.has('FAQPage')) fail(`${pathname}: FAQPage JSON-LD absent.`);
  if (route.type === 'tool' && (!types.has('WebApplication') || !types.has('HowTo'))) {
    fail(`${pathname}: WebApplication ou HowTo JSON-LD absent.`);
  }
  if (route.type === 'home' && !types.has('WebSite')) fail(`${pathname}: WebSite JSON-LD absent.`);
  const expectedPageType = expectedPageTypesByKey[route.key];
  if (expectedPageType && !types.has(expectedPageType)) {
    fail(`${pathname}: ${expectedPageType} JSON-LD absent.`);
  }
  if (/(?:Cómo usar|Preguntas frecuentes|Usar la herramienta|What this tool can do|Use cases|Last updated|Move up|Move down)/i.test(text)) {
    fail(`${pathname}: fuite d’interface espagnole ou anglaise détectée.`);
  }
  if (/(?:lorem ipsum|coming soon|under construction|placeholder|contenu à venir)/i.test(text)) {
    fail(`${pathname}: contenu provisoire détecté.`);
  }
  for (const term of requiredTermsByKey[route.key] ?? ['outil', 'navigateur', 'vérifier']) {
    if (!lower.includes(term)) fail(`${pathname}: terme d’intention française manquant : "${term}".`);
  }
  for (const [locale, expectedPath] of Object.entries(route.paths)) {
    const hreflang = locale === 'zh' ? 'zh-TW' : locale;
    if (alternates.get(hreflang) !== `${siteOrigin}${expectedPath}`) {
      fail(`${pathname}: hreflang ${hreflang} absent ou incorrect.`);
    }
  }
  const defaultPath = route.paths.en ?? route.paths.zh;
  if (alternates.get('x-default') !== `${siteOrigin}${defaultPath}`) {
    fail(`${pathname}: x-default incorrect.`);
  }

  pages.push({ key: route.key, path: pathname, words, h2, types: [...types] });
}

for (const route of frenchRoutes) {
  for (const locale of ['zh', 'en', 'es'].filter((candidate) => route.paths[candidate])) {
    const pathname = route.paths[locale];
    const file = htmlFile(pathname);
    if (!existsSync(file)) {
      fail(`${pathname}: page réciproque ${locale} absente.`);
      continue;
    }
    const html = readFileSync(file, 'utf8');
    const alternates = new Map(linkTags(html, 'alternate').map((tag) => [attr(tag, 'hreflang'), attr(tag, 'href')]));
    if (alternates.get('fr') !== `${siteOrigin}${route.paths.fr}`) {
      fail(`${pathname}: hreflang français réciproque absent.`);
    }
  }
}

const sitemapPath = join(publicDir, 'sitemap-fr.xml');
if (!existsSync(sitemapPath)) {
  fail('public/sitemap-fr.xml est absent.');
} else {
  const xml = readFileSync(sitemapPath, 'utf8');
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]).sort();
  const expected = frenchRoutes.map((route) => `${siteOrigin}${route.paths.fr}`).sort();
  if (JSON.stringify(locs) !== JSON.stringify(expected)) {
    fail(`sitemap-fr.xml incorrect : ${expected.length} URL attendues, ${locs.length} trouvées.`);
  }
}

const summary = {
  status: failures.length ? 'FAIL' : 'PASS',
  editorialMode: 'native-search-intent',
  reviewedAt: registry.reviewedAt,
  activeBatch: registry.activeLocaleBatch,
  activeBatchRoutes: activeBatchRoutes.map((route) => route.paths.fr),
  frenchRoutes: pages,
  blockedUntilReviewed: ['hi', 'de'],
  failures,
};

console.log(JSON.stringify(summary, null, 2));
if (failures.length) process.exitCode = 1;
