import type { ToolContent } from '../tools/_types';

export const frenchCaseConverter: ToolContent = {
  name: 'Convertir majuscules et minuscules en ligne',
  short: 'Passez un texte français en majuscules, minuscules, casse de titre, casse de phrase ou formats de variable.',
  long: 'Collez un texte puis choisissez MAJUSCULES, minuscules, initiale de chaque mot, casse de phrase, camelCase, snake_case, kebab-case ou CONSTANT_CASE. La version française utilise les règles Unicode avec la locale `fr`, afin de traiter les lettres accentuées. Les transformations restent mécaniques : elles ne corrigent ni noms propres, ni sigles, ni typographie, ni orthographe.',
  seoTitle: 'Convertir majuscules, minuscules et camelCase',
  seoDescription: 'Convertissez un texte français en majuscules, minuscules, casse de phrase, camelCase, snake_case ou kebab-case, avec accents et traitement local.',
  keywords: [
    'convertir majuscules en minuscules',
    'convertir minuscules en majuscules',
    'convertisseur majuscule minuscule',
    'mettre un texte en majuscules',
    'convertir en casse de phrase',
    'convertir en camelCase',
    'convertir en snake_case',
  ],
  capabilities: [
    'Transformer les lettres françaises en majuscules ou en minuscules.',
    'Mettre mécaniquement une capitale au début de chaque mot.',
    'Créer une casse de phrase après point, point d’interrogation ou d’exclamation.',
    'Produire camelCase, snake_case, kebab-case et CONSTANT_CASE.',
    'Copier le résultat sans remplacer le texte d’entrée.',
  ],
  contentSections: [
    {
      heading: 'Réponse rapide : changer majuscules et minuscules',
      paragraphs: [
        'Saisissez ou collez le texte dans le premier champ puis choisissez le format. Le résultat apparaît dans une zone séparée pour permettre une comparaison avant la copie. « MAJUSCULES » transforme `école et forêt` en `ÉCOLE ET FORÊT` ; « minuscules » effectue l’opération inverse. La locale française est transmise au navigateur et les accents présents ne sont pas supprimés.',
        'Relisez toujours le résultat avant publication. Un convertisseur ne sait pas si `Orange` désigne une couleur, une ville ou une entreprise, si `ONU` doit rester un sigle ou si une marque impose une graphie particulière. L’outil accélère une transformation répétitive ; il ne décide pas des capitales pertinentes. Conservez le texte original tant que la nouvelle version n’a pas été validée.',
      ],
    },
    {
      heading: 'Accents, ligatures et capitales françaises',
      paragraphs: [
        'En français, les capitales conservent les signes nécessaires : `ÉTÉ`, `À PROPOS` et `ÇA` ne doivent pas perdre leur accent ou cédille. Le navigateur applique les correspondances Unicode disponibles pour la locale `fr`. Les chiffres, espaces, ponctuation et emoji ne changent pas, tandis que les lettres sont transformées selon le mode choisi.',
        'Cette opération n’ajoute rien qui manque dans la source. `ecole` devient `ECOLE`, pas `ÉCOLE`, et une apostrophe droite n’est pas remplacée par une apostrophe typographique. L’outil ne normalise pas non plus deux séquences Unicode visuellement équivalentes. Après un OCR ou un copier-coller hétérogène, corrigez caractères invisibles, accents absents et lettres d’un autre alphabet avant d’appliquer la casse.',
      ],
      items: [
        'Les accents présents sont conservés pendant le changement de casse.',
        'Les signes, chiffres, espaces et retours restent à leur place.',
        'Une faute ou un accent absent n’est pas corrigé.',
        'La transformation dépend des données Unicode du navigateur.',
      ],
    },
    {
      heading: 'Casse de titre et casse de phrase : règles mécaniques',
      paragraphs: [
        'Le bouton « Initiale de chaque mot » met en minuscule chaque suite de lettres puis transforme sa première lettre en capitale. Il ne suit pas une charte éditoriale française : articles, prépositions et conjonctions reçoivent eux aussi une capitale. `Le guide de la rédaction` devient donc `Le Guide De La Rédaction`. Pour un véritable titre, corrigez ensuite les petits mots, noms propres et sigles.',
        'La casse de phrase met d’abord le texte en minuscules, puis capitalise la première lettre du bloc et celle qui suit `.`, `!` ou `?`. Elle ne déclenche pas automatiquement une capitale après deux-points, point-virgule ou simple retour à la ligne. Les abréviations peuvent aussi créer une fausse fin de phrase. Utilisez ce mode comme point de départ, puis vérifiez les citations, listes et acronymes.',
      ],
    },
    {
      heading: 'camelCase, snake_case et kebab-case',
      paragraphs: [
        'Les formats techniques découpent le texte en suites Unicode de lettres ou de nombres. Les espaces, apostrophes, ponctuation et symboles deviennent des séparateurs. `Projet d’été 2026` produit par exemple `projetDÉté2026` en camelCase, `projet_d_été_2026` en snake_case et `projet-d-été-2026` en kebab-case. CONSTANT_CASE emploie des capitales et des traits de soulignement.',
        'Un identifiant lisible n’est pas forcément accepté par le système cible. Certains langages, bases, URL, CMS ou API interdisent accents, commencent par une règle spéciale ou imposent une longueur. Cette page ne translittère pas `é` en `e`, ne garantit pas l’unicité et ne vérifie aucun mot réservé. Consultez la convention du projet et testez le résultat dans le code, le formulaire ou la route réelle.',
      ],
    },
    {
      heading: 'Noms propres, sigles et rédaction éditoriale',
      paragraphs: [
        'Un texte passé entièrement en minuscules perd la distinction de `Paris`, `Jean Dupont`, `CNRS` ou `iPhone`. La casse de titre ne peut pas la reconstruire car elle ignore le sens. Si le document comporte de nombreux noms, gardez une liste de référence et contrôlez chaque occurrence après conversion. Pour une communication institutionnelle, appliquez ensuite la charte typographique de l’organisation.',
        'Les capitales ne remplacent pas une correction. Le convertisseur ne traite ni espaces insécables, ni guillemets français, ni accords, ni ponctuation double, ni typographie des unités. Pour un import de données, vérifiez aussi si la casse sert à l’identification : transformer des codes, mots de passe, clés ou chemins sensibles à la casse peut les rendre inutilisables.',
      ],
    },
    {
      heading: 'Confidentialité, copie et validation finale',
      paragraphs: [
        'Le texte et le résultat restent dans la mémoire de cet onglet ; FunnyTools ne reçoit pas le contenu pour modifier la casse. Les services généraux de la page suivent la politique de confidentialité, mais le texte saisi n’est pas envoyé comme paramètre de mesure. Évitez tout de même les secrets, mots de passe ou données personnelles lorsqu’ils ne sont pas nécessaires.',
        'Le bouton « Copier le résultat » n’efface pas l’entrée. Gardez cette source, comparez les deux versions et collez d’abord la sortie dans un document distinct. Pour du code, exécutez les tests ; pour une URL, vérifiez le lien ; pour un contenu public, relisez noms propres, sigles et accents. Une transformation complète n’est correcte qu’après validation dans son contexte.',
      ],
    },
  ],
  instructions: [
    'Collez une copie du texte et conservez la source originale.',
    'Choisissez la casse générale ou le format d’identifiant recherché.',
    'Comparez accents, sigles, noms propres, ponctuation et séparateurs.',
    'Corrigez manuellement les règles éditoriales que le mode mécanique ignore.',
    'Copiez la sortie puis testez-la dans le document, le code ou le système cible.',
  ],
  examples: [
    'Passer un titre reçu en capitales vers des minuscules lisibles.',
    'Mettre une liste de codes en CONSTANT_CASE après vérification.',
    'Créer un camelCase provisoire pour un nom de variable.',
    'Normaliser une phrase avant une relecture éditoriale.',
    'Comparer les effets de la casse sur des lettres accentuées.',
  ],
  audience: [
    'Rédacteurs, étudiants, éditeurs et équipes administratives.',
    'Développeurs préparant noms de variables ou identifiants.',
    'Équipes qui nettoient des exports de texte avant import.',
    'Personnes souhaitant transformer localement un bloc sans compte.',
  ],
  caseStudies: [
    { title: 'Titre reçu en capitales', description: 'Une accroche entière en capitales est passée en minuscules puis relue. Les noms propres et le début de phrase sont corrigés manuellement avant publication.' },
    { title: 'Identifiant de projet', description: 'Le libellé `Équipe produit 2026` devient un snake_case accentué. La convention du dépôt exigeant ASCII, l’équipe effectue ensuite une translittération contrôlée et vérifie l’unicité.' },
    { title: 'Liste contenant des sigles', description: 'La casse de titre transforme un sigle en forme ordinaire. Une comparaison avec la liste de référence permet de restaurer `CNRS` et les graphies de marque.' },
  ],
  notes: [
    'La conversion ne corrige ni accents absents, ni orthographe, ni typographie.',
    'La casse de titre capitalise mécaniquement chaque mot.',
    'La casse de phrase se déclenche après `.`, `!` et `?`, pas après chaque retour.',
    'Apostrophes et ponctuation séparent les tokens des formats techniques.',
    'Les systèmes cibles peuvent refuser accents ou identifiants commençant par un chiffre.',
  ],
  faq: [
    { q: 'Les accents disparaissent-ils en majuscules ?', a: 'Non lorsqu’ils existent dans l’entrée. Le navigateur applique les correspondances Unicode françaises, par exemple `é` vers `É`.' },
    { q: 'Le mode titre respecte-t-il les règles typographiques françaises ?', a: 'Non. Il met mécaniquement une capitale à chaque mot ; relisez articles, prépositions, noms et sigles.' },
    { q: 'La casse de phrase corrige-t-elle toute la ponctuation ?', a: 'Non. Elle met en minuscule puis capitalise après `.`, `!` ou `?`. Elle ne corrige ni abréviations ni typographie.' },
    { q: 'camelCase retire-t-il les accents ?', a: 'Non. Les lettres Unicode sont conservées. Vérifiez si votre langage ou plateforme accepte les identifiants accentués.' },
    { q: 'Le texte original est-il remplacé ?', a: 'Non. Il reste dans la zone d’entrée et le résultat apparaît dans un champ séparé.' },
    { q: 'Le texte est-il envoyé à FunnyTools ?', a: 'Non. La conversion s’effectue localement dans cet onglet.' },
  ],
  labels: {
    locale: 'fr',
    input: 'Texte original',
    placeholder: 'Écrivez ou collez le texte à convertir…',
    uppercase: 'MAJUSCULES',
    lowercase: 'minuscules',
    titleCase: 'Initiale De Chaque Mot',
    sentenceCase: 'Casse de phrase',
    camelCase: 'camelCase',
    snakeCase: 'snake_case',
    kebabCase: 'kebab-case',
    constantCase: 'CONSTANT_CASE',
    output: 'Résultat',
    copy: 'Copier le résultat',
    clear: 'Effacer',
    copied: 'Résultat copié',
  },
  privacyNote: 'Le texte est transformé dans la mémoire de cet onglet. FunnyTools ne le reçoit ni ne l’enregistre pour modifier la casse.',
  disclaimer: 'Les transformations sont mécaniques. Relisez noms propres, sigles, accents et règles du système cible avant de remplacer ou publier un texte.',
};

export const frenchCaseConverterReview = {
  heading: 'Comment vérifier une conversion de casse',
  intro: 'La transformation peut être techniquement exacte tout en étant éditorialement fausse pour un nom propre, un sigle ou un identifiant.',
  panels: [
    { title: 'Comparer la source', text: 'Conservez l’original et contrôlez accents, signes, retours et mots qui ne devaient pas changer.' },
    { title: 'Restaurer le sens', text: 'Relisez noms de personnes, lieux, marques, acronymes et débuts de phrases.' },
    { title: 'Tester la destination', text: 'Validez identifiants, URL, chemins et code dans le système qui les utilisera.' },
  ],
  checklistHeading: 'Liste de contrôle',
  checklist: [
    'La source non modifiée reste disponible.',
    'Les accents présents sont conservés.',
    'Noms propres et sigles ont été relus.',
    'Le format est accepté dans le document ou système cible.',
  ],
};

export const frenchRemoveEmptyLines: ToolContent = {
  name: 'Supprimer les lignes vides en ligne',
  short: 'Retirez toutes les lignes vides ou réduisez chaque groupe à une seule, avec option de suppression des espaces en bord de ligne.',
  long: 'Collez une liste ou un texte pour supprimer les lignes ne contenant que des espaces, tabulations ou aucun caractère. Vous pouvez retirer toutes les lignes vides, ou réduire chaque groupe consécutif à une ligne afin de préserver les paragraphes. L’option de nettoyage des extrémités retire aussi indentation et espaces finaux. La sortie utilise des retours LF et ne conserve ni format de fichier ni encodage original.',
  seoTitle: 'Supprimer les lignes vides d’un texte',
  seoDescription: 'Supprimez toutes les lignes vides ou réduisez les sauts multiples à un seul. Statistiques, option de trim, traitement local et limites expliquées.',
  keywords: [
    'supprimer lignes vides',
    'enlever lignes blanches texte',
    'retirer sauts de ligne multiples',
    'réduire lignes vides',
    'nettoyer liste en ligne',
    'supprimer espaces fin de ligne',
    'outil lignes vides gratuit',
  ],
  capabilities: [
    'Reconnaître comme vide une ligne sans contenu ou composée d’espaces et tabulations.',
    'Supprimer toutes les lignes vides d’une liste compacte.',
    'Réduire chaque groupe consécutif à une seule ligne vide.',
    'Retirer facultativement les espaces au début et à la fin de chaque ligne.',
    'Afficher les nombres de lignes originales, finales et retirées.',
  ],
  contentSections: [
    {
      heading: 'Réponse rapide : enlever les lignes vides',
      paragraphs: [
        'Collez le texte puis choisissez « Supprimer toutes les lignes vides » pour obtenir une liste continue, ou « Réduire chaque groupe à une ligne vide » pour conserver un séparateur entre les paragraphes. Le résultat et les statistiques se mettent à jour lorsque le contenu ou les options changent. Une ligne contenant seulement des espaces ou des tabulations est considérée comme vide dans les deux modes.',
        'Ne copiez pas la sortie sans vérifier la structure. Une ligne blanche peut représenter un paragraphe, un emplacement manquant, un séparateur d’enregistrement ou une convention de fichier. Le compteur indique combien de lignes ont disparu, mais il ne sait pas si elles étaient inutiles. Gardez la source et contrôlez le premier élément, le dernier, les groupes et le total attendu.',
      ],
    },
    {
      heading: 'Supprimer toutes les lignes ou réduire les groupes',
      paragraphs: [
        'Le mode suppression écarte chaque ligne dont le contenu devient vide après un contrôle par `trim`. Il convient aux listes contenant un élément par ligne, aux inventaires ou aux colonnes copiées lorsque les trous n’ont aucune signification. L’ordre des lignes non vides reste identique. Les lignes ne sont ni triées, ni dédupliquées, ni fusionnées.',
        'Le mode réduction conserve au maximum une ligne vide par groupe consécutif. Il aide à ramener quatre ou cinq sauts entre paragraphes à un seul séparateur. Une ligne vide située au début ou à la fin peut rester dans la sortie, car le mode ne supprime pas automatiquement les bords. Examinez donc les extrémités si le texte doit commencer et finir directement par du contenu.',
      ],
      items: [
        'Supprimer toutes convient surtout aux listes compactes.',
        'Réduire les groupes préserve une séparation entre blocs.',
        'L’ordre des lignes avec contenu ne change pas.',
        'Une ligne blanche en début ou fin peut subsister en mode réduction.',
      ],
    },
    {
      heading: 'Espaces, tabulations et option de nettoyage',
      paragraphs: [
        'La détection des lignes vides ignore toujours espaces et tabulations : une ligne composée de blancs est retirée même si l’option de nettoyage est désactivée. Cette case répond à une autre question. Lorsqu’elle est cochée, elle applique `trim()` à chaque ligne conservée et supprime donc espaces initiaux, tabulations d’indentation et espaces finaux.',
        'Ce nettoyage peut être destructeur pour du code Python, du YAML, un tableau aligné, un poème ou un format à largeur fixe. Il ne retire pas les espaces situés entre les mots, mais l’indentation de début peut porter un sens syntaxique. Laissez la case décochée lorsque vous n’êtes pas certain, puis utilisez un diff ou le validateur du format avant de remplacer un fichier.',
      ],
    },
    {
      heading: 'Retours Windows, macOS et Unix',
      paragraphs: [
        'L’entrée reconnaît les fins de ligne CRLF de Windows, CR historique et LF d’Unix. Après traitement, toutes les lignes sont assemblées avec LF. À l’écran, le texte reste lisible, mais la séquence binaire d’origine n’est pas préservée. Certains outils de développement, protocoles ou fichiers anciens exigent une convention précise.',
        'La page ne détecte ni encodage du fichier, ni marque BOM, car elle ne reçoit qu’une chaîne collée. Copier depuis un traitement de texte perd déjà une partie de la structure. Si le format exige CRLF, UTF-16 ou une taille exacte, enregistrez la sortie avec un éditeur capable de choisir ces paramètres et vérifiez-la ensuite avec l’outil de destination.',
      ],
    },
    {
      heading: 'Listes, données, code et paragraphes',
      paragraphs: [
        'Dans une simple liste de mots, retirer les trous est généralement sûr après vérification du nombre d’éléments. Dans un export de données, une ligne vide peut correspondre à une réponse absente et maintenir l’alignement avec une autre colonne. Supprimer cette position décale les enregistrements. Pour un CSV ou un tableau multi-colonnes, utilisez un outil qui comprend les lignes et champs structurés.',
        'Pour un article, le mode réduction conserve la séparation visuelle des paragraphes ; pour du code, même ce mode peut modifier une chaîne multilignes ou une convention de blocs. Cette page n’analyse ni Markdown, ni HTML, ni code source. Travaillez sur une copie et lancez ensuite compilation, tests, prévisualisation ou import d’essai selon le format.',
      ],
    },
    {
      heading: 'Confidentialité, limites et contrôle du résultat',
      paragraphs: [
        'Le texte est nettoyé dans cet onglet et n’est pas envoyé à FunnyTools pour retirer les lignes. Les services généraux de la page suivent la politique de confidentialité, mais le bloc collé ne fait pas partie des événements de mesure. Évitez néanmoins secrets, mots de passe ou données personnelles inutiles.',
        'La page ne conserve pas d’historique, n’ouvre pas de fichier, ne propose pas de recherche par expression régulière et ne fournit pas de diff détaillé. Copiez la sortie dans un nouveau document, comparez le nombre de lignes et inspectez plusieurs zones. Pour du code ou des données, utilisez enfin le validateur du format : une diminution correcte du nombre de lignes ne prouve pas que la structure reste valide.',
      ],
    },
  ],
  instructions: [
    'Conservez le texte original puis collez une copie.',
    'Choisissez suppression complète ou réduction des groupes selon la structure.',
    'N’activez le trim que si indentation et espaces finaux sont sans importance.',
    'Comparez statistiques, extrémités, paragraphes et nombre d’enregistrements.',
    'Copiez dans un nouveau fichier et validez le format à destination.',
  ],
  examples: [
    'Compacter une liste de mots contenant des rangées vides.',
    'Réduire les grands espaces entre paragraphes à une seule ligne.',
    'Nettoyer une colonne isolée après contrôle du nombre d’éléments.',
    'Préparer un texte brut pour un import d’essai.',
    'Examiner un extrait de code sans retirer son indentation.',
  ],
  audience: [
    'Personnes qui nettoient listes, notes ou inventaires.',
    'Rédacteurs normalisant les espaces entre paragraphes.',
    'Équipes support préparant du texte avant import.',
    'Développeurs qui valident ensuite fins de ligne et indentation.',
  ],
  caseStudies: [
    { title: 'Liste avec tabulations invisibles', description: 'Des lignes semblent vides mais contiennent des tabulations. Le mode suppression les reconnaît, conserve l’ordre des codes et permet de comparer le total avec la source.' },
    { title: 'Article trop espacé', description: 'Des groupes de quatre lignes blanches séparent les paragraphes. Le mode réduction en garde une ; le trim reste désactivé pour protéger un exemple préformaté.' },
    { title: 'Cellules vides significatives', description: 'Une exportation utilise les rangées vides comme réponses manquantes. La suppression casserait l’alignement avec les identifiants : seul un extrait dérivé est nettoyé.' },
  ],
  notes: [
    'Une ligne faite seulement d’espaces ou tabulations est considérée comme vide.',
    'Le mode réduction peut conserver une ligne vide au début ou à la fin.',
    'Le trim retire indentation et espaces finaux mais pas les espaces internes.',
    'La sortie normalise les fins de ligne en LF.',
    'Aucun fichier, format, encodage ou métadonnée n’est conservé.',
  ],
  faq: [
    { q: 'Une ligne contenant seulement des espaces est-elle supprimée ?', a: 'Oui. La détection applique un contrôle sans blancs, même lorsque l’option de trim est désactivée.' },
    { q: 'Peut-on garder une ligne vide entre les paragraphes ?', a: 'Oui. Choisissez le mode qui réduit chaque groupe à une ligne puis vérifiez le début et la fin.' },
    { q: 'Le trim supprime-t-il les espaces entre les mots ?', a: 'Non. Il retire uniquement les blancs au début et à la fin de chaque ligne.' },
    { q: 'Les fins de ligne Windows CRLF sont-elles conservées ?', a: 'Non exactement. CRLF, CR et LF sont reconnus, puis la sortie est assemblée avec LF.' },
    { q: 'Peut-on utiliser l’outil sur du code ?', a: 'Seulement sur une copie et après diff et tests. N’activez pas le trim si l’indentation a un sens.' },
    { q: 'Le texte est-il envoyé au serveur ?', a: 'Non. Le nettoyage s’effectue localement dans cet onglet.' },
  ],
  labels: {
    input: 'Texte original',
    placeholder: 'Collez une liste ou un texte avec des lignes vides…',
    mode: 'Traitement des lignes vides',
    removeAll: 'Supprimer toutes les lignes vides',
    collapseMultiple: 'Réduire chaque groupe à une ligne vide',
    trimLineEnds: 'Retirer les espaces au début et à la fin de chaque ligne',
    process: 'Nettoyer les lignes',
    copy: 'Copier le résultat',
    reset: 'Réinitialiser',
    output: 'Texte nettoyé',
    emptyResult: 'Le résultat apparaîtra ici',
    originalLines: 'Lignes originales',
    resultLines: 'Lignes finales',
    removedLines: 'Lignes retirées',
    copied: 'Résultat copié',
  },
  privacyNote: 'Le nettoyage s’exécute dans la mémoire de cet onglet. FunnyTools ne reçoit ni n’enregistre le texte pour supprimer les lignes vides.',
  disclaimer: 'Supprimer ou recadrer des lignes peut modifier paragraphes, positions de données, indentation et fins de ligne. Conservez la source et validez la sortie dans son format cible.',
};

export const frenchRemoveEmptyLinesReview = {
  heading: 'Comment vérifier la suppression des lignes vides',
  intro: 'Avant la copie, confirmez que les blancs étaient du bruit et non une partie de la structure du document ou des données.',
  panels: [
    { title: 'Choisir le mode', text: 'Supprimez tout pour une liste compacte ou réduisez les groupes pour conserver les paragraphes.' },
    { title: 'Protéger l’indentation', text: 'N’appliquez pas le trim si les blancs de début ou de fin peuvent modifier le format.' },
    { title: 'Valider les quantités', text: 'Comparez enregistrements, lignes, premier et dernier élément et convention de fin de ligne.' },
  ],
  checklistHeading: 'Liste de contrôle',
  checklist: [
    'Le document original reste disponible.',
    'Les lignes vides ne représentaient aucun enregistrement nécessaire.',
    'Indentation et espaces significatifs sont préservés.',
    'L’application cible accepte LF ou renormalise correctement les retours.',
  ],
};

export const frenchRemoveDuplicateLines: ToolContent = {
  name: 'Supprimer les lignes en double en ligne',
  short: 'Retirez les lignes répétées, conservez la première occurrence et choisissez casse, espaces ou tri français.',
  long: 'Collez une liste avec un élément par ligne afin de conserver la première occurrence de chaque valeur. Par défaut, les extrémités sont nettoyées, les majuscules restent distinctes et l’ordre initial est conservé. Vous pouvez ignorer la casse et trier la sortie avec la locale française. Les lignes vides sont toujours omises. L’outil ne déduplique ni colonne CSV, ni personne, ni URL normalisée, ni correspondance approximative.',
  seoTitle: 'Supprimer les lignes en double d’un texte',
  seoDescription: 'Supprimez les lignes répétées, conservez la première, ignorez facultativement la casse et triez selon la locale française. Traitement local.',
  keywords: [
    'supprimer lignes en double',
    'enlever lignes dupliquées',
    'supprimer doublons texte',
    'liste sans doublons',
    'dédupliquer liste en ligne',
    'retirer valeurs répétées',
    'trier lignes uniques',
  ],
  capabilities: [
    'Conserver la première occurrence de chaque ligne et retirer les suivantes.',
    'Distinguer ou ignorer majuscules et minuscules.',
    'Nettoyer facultativement les espaces aux extrémités avant comparaison.',
    'Maintenir l’ordre d’origine ou trier avec les règles de la locale française.',
    'Afficher le nombre de lignes uniques et de doublons retirés.',
  ],
  contentSections: [
    {
      heading: 'Réponse rapide : supprimer les lignes répétées',
      paragraphs: [
        'Collez un élément par ligne. La sortie se met à jour et conserve la première apparition de chaque valeur. Par défaut, les espaces de début et de fin sont retirés, la casse est respectée et l’ordre des premières occurrences reste celui de l’entrée. Les lignes vides n’apparaissent jamais dans le résultat.',
        'Lisez les statistiques avant de copier. « Lignes uniques » compte la sortie ; « Doublons retirés » compare le nombre de lignes non vides au total unique. Les lignes blanches ignorées ne sont pas enregistrées comme doublons. La page ne fournit pas la position ou la fréquence de chaque répétition : conservez la source si un audit détaillé est nécessaire.',
      ],
    },
    {
      heading: 'Conserver la première occurrence et l’ordre',
      paragraphs: [
        'Si `Paris` apparaît aux lignes 2, 8 et 20, la graphie et la position de la ligne 2 gagnent. Tant que le tri est désactivé, les valeurs uniques suivent l’ordre de leur première rencontre. Cette règle convient aux priorités, chemins ou réponses lorsque la séquence apporte une information. L’outil ne combine pas les copies et ne choisit ni la plus récente ni la plus complète.',
        'Le nettoyage des extrémités est coché initialement. `  Paris`, `Paris` et `Paris  ` deviennent alors la même valeur et la première est renvoyée sans blancs extérieurs. Si vous désactivez l’option, ces variantes peuvent rester distinctes. Une ligne ne contenant que des blancs est néanmoins toujours omise.',
      ],
      items: [
        'La première occurrence est conservée, jamais la dernière.',
        'L’ordre ne change que lorsque le tri est activé.',
        'Les lignes totalement vides ne figurent pas dans la sortie.',
        'Aucune colonne de fréquence ou de position n’est produite.',
      ],
    },
    {
      heading: 'Ignorer la casse sans supprimer les accents',
      paragraphs: [
        'Avec « Ignorer majuscules et minuscules », la clé de comparaison passe en minuscule selon la locale `fr`. `ÉCOLE`, `École` et `école` deviennent donc équivalents et la première graphie est conservée. `école` et `ecole` restent différents : la fonction ne retire pas les accents. De même, `cœur` et `coeur` ne sont pas fusionnés.',
        'Ce choix n’est pas une normalisation linguistique. Il ne regroupe ni singulier et pluriel, ni abréviations, ni espaces internes multiples, ni tirets différents, ni variantes de noms. `Rue de Paris` et `Rue  de Paris` restent distincts à cause du double espace interne. Une déduplication approximative exige des règles métier, un seuil et une revue des faux positifs.',
      ],
    },
    {
      heading: 'Tri français, accents et nombres',
      paragraphs: [
        'Lorsque le tri est activé, les lignes sont comparées avec `localeCompare` en locale française. Cela fournit un ordre plus adapté aux accents qu’une comparaison brute de codes. Si la casse est ignorée, la sensibilité de base limite l’effet des capitales. Le contenu conservé reste toutefois la première graphie rencontrée.',
        'Le tri porte sur la ligne complète et reste lexical. Une liste `2`, `10`, `100` peut ne pas suivre l’ordre numérique attendu, et `Produit 10` peut précéder `Produit 2`. Il n’existe ni tri descendant, ni choix de colonne. Si l’ordre représente une priorité ou si vous avez besoin de nombres naturels et de dates, laissez le tri désactivé ou utilisez un tableur.',
      ],
    },
    {
      heading: 'CSV, courriels, URL et identités',
      paragraphs: [
        'Chaque ligne est traitée comme une chaîne entière. Les virgules, tabulations, guillemets et en-têtes ne sont pas compris comme des colonnes CSV. Deux lignes avec le même courriel mais des dates différentes ne correspondent pas. Pour dédupliquer selon une clé, utilisez un outil tabulaire et décidez quel enregistrement doit gagner tout en conservant les autres champs.',
        'La page ne normalise ni courriels ni URL. Retirer les paramètres, la barre finale ou la casse du chemin peut être correct pour un site et faux pour un autre. Elle ne détermine pas non plus si deux noms désignent la même personne. N’utilisez pas l’option de casse comme règle d’identité ; conservez consentements, métadonnées et relations entre colonnes dans le système source.',
      ],
    },
    {
      heading: 'Confidentialité, limites et validation finale',
      paragraphs: [
        'La liste est comparée dans cet onglet ; FunnyTools ne la reçoit pas pour repérer les doublons et ne conserve aucun historique. Les services généraux suivent la politique de confidentialité, mais le contenu collé n’est pas ajouté aux événements. Réduisez les données personnelles et n’utilisez jamais de secrets ou identifiants sensibles pour un simple nettoyage.',
        'Le navigateur gère les listes courantes, mais mémoire et vitesse dépendent de l’appareil. Il n’y a ni import de fichier, ni correspondance floue, ni rapport des suppressions, ni annulation par étape. Testez une petite sélection, vérifiez accents, espaces et casse, puis comparez le total attendu. Pour des données opérationnelles, validez clés et champs associés avant tout remplacement.',
      ],
    },
  ],
  instructions: [
    'Gardez la liste originale et collez une copie avec un élément complet par ligne.',
    'Décidez si espaces extérieurs et casse font partie de l’identité.',
    'Conservez l’ordre initial sauf besoin explicite de tri alphabétique.',
    'Contrôlez le total unique et des exemples avec accents ou espaces.',
    'Copiez vers un nouveau fichier puis validez clés et relations à destination.',
  ],
  examples: [
    'Conserver une occurrence de chaque étiquette.',
    'Nettoyer une liste de chemins exacts sans changer leur priorité.',
    'Comparer des noms sans tenir compte de la casse mais avec les accents.',
    'Créer une liste française triée à partir de réponses répétées.',
    'Repérer qu’un CSV exige une déduplication par colonne ailleurs.',
  ],
  audience: [
    'Équipes nettoyant étiquettes, noms, routes ou identifiants.',
    'Analystes préparant une colonne pour un tableur.',
    'Rédacteurs et SEO organisant des termes exacts.',
    'Développeurs et opérations qui valident ensuite dans leur système.',
  ],
  caseStudies: [
    { title: 'Étiquettes avec casses différentes', description: 'La liste contient `Éducation`, `ÉDUCATION` et `éducation`. En ignorant la casse, la première graphie reste ; `education` sans accent demeure distinct.' },
    { title: 'Chemins dont l’ordre compte', description: 'Un processus essaie des routes par priorité. Les répétitions exactes sont retirées sans tri afin de garder la séquence des premières apparitions.' },
    { title: 'Exportation avec plusieurs colonnes', description: 'Deux lignes partagent le même courriel mais des dates différentes. Comme la ligne entière diffère, elles restent séparées et le fichier est traité dans un tableur.' },
  ],
  notes: [
    'Les lignes vides sont omises et ne comptent pas comme doublons.',
    'Le trim est actif par défaut et modifie comparaison et sortie.',
    'Ignorer la casse conserve la première graphie sans retirer les accents.',
    'Le tri français compare le texte complet, pas les valeurs numériques.',
    'Aucune déduplication approximative, par colonne, d’URL ou de personnes.',
  ],
  faq: [
    { q: 'La première ou la dernière ligne est-elle conservée ?', a: 'La première. Sans tri, l’ordre des premières occurrences est maintenu.' },
    { q: 'Que deviennent les espaces en début et fin ?', a: 'Le trim est actif par défaut : ils sont retirés avant comparaison et dans la sortie.' },
    { q: 'Ignorer la casse ignore-t-il aussi les accents ?', a: 'Non. `ÉCOLE` et `école` correspondent, tandis que `école` et `ecole` restent distincts.' },
    { q: 'Les lignes vides comptent-elles comme doublons ?', a: 'Non. Elles sont toujours omises et ne sont pas incluses dans la statistique des doublons.' },
    { q: 'Peut-on supprimer les doublons selon une colonne CSV ?', a: 'Non. Chaque ligne est comparée entièrement ; utilisez un outil tabulaire pour préserver les champs associés.' },
    { q: 'La liste est-elle envoyée à FunnyTools ?', a: 'Non. La comparaison et le tri s’effectuent localement dans ce navigateur.' },
  ],
  labels: {
    locale: 'fr',
    input: 'Liste originale',
    placeholder: 'Collez un élément par ligne…',
    caseInsensitive: 'Ignorer majuscules et minuscules',
    trimLines: 'Retirer les espaces au début et à la fin',
    sortOutput: 'Trier le résultat en français',
    remove: 'Supprimer les doublons',
    copy: 'Copier le résultat',
    reset: 'Réinitialiser',
    output: 'Lignes uniques',
    emptyResult: 'Le résultat apparaîtra ici',
    uniqueLines: 'Lignes uniques',
    removedLines: 'Doublons retirés',
    copied: 'Résultat copié',
  },
  privacyNote: 'La liste est comparée localement dans cet onglet. FunnyTools ne la reçoit ni ne l’enregistre pour supprimer les doublons.',
  disclaimer: 'La comparaison porte sur chaque ligne complète. Conservez la source et ne confondez pas ce résultat avec une déduplication par colonne, d’identité ou approximative.',
};

export const frenchRemoveDuplicateLinesReview = {
  heading: 'Comment vérifier une liste sans doublons',
  intro: 'Définissez ce que signifie « identique » avant de supprimer : espaces, casse, accents, ordre et colonnes peuvent changer le résultat.',
  panels: [
    { title: 'Définir l’égalité', text: 'Décidez si le trim ou l’ignorance de la casse est légitime ; accents et espaces internes restent distinctifs.' },
    { title: 'Conserver l’ordre', text: 'Laissez le tri désactivé si la première position représente priorité, chronologie ou dépendance.' },
    { title: 'Valider le modèle', text: 'Pour CSV, courriels, URL ou champs liés, utilisez des règles spécifiques qui préservent les colonnes.' },
  ],
  checklistHeading: 'Liste de contrôle',
  checklist: [
    'La première occurrence est bien celle à conserver.',
    'Les options d’espaces et de casse correspondent à la règle métier.',
    'Les variantes accentuées et non accentuées ont été revues séparément.',
    'Le total et plusieurs suppressions ont été contrôlés avec la source.',
  ],
};
