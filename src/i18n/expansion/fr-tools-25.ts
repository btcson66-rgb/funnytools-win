import type { ToolContent } from '../tools/_types';

export const frenchZScore: ToolContent = {
  name: 'Calculateur de score z',
  short: 'Standardisez une valeur avec la moyenne et l’écart-type de son groupe, puis lisez sa direction et sa distance à la moyenne.',
  long: 'Ce calculateur de score z applique z = (x − moyenne) / écart-type. Le résultat indique le nombre d’écarts-types qui sépare une valeur de la moyenne : le signe donne la direction et la valeur absolue la distance. Il sert à étudier une standardisation ou à vérifier un calcul lorsque le groupe de référence est connu. Il ne rend pas une distribution normale, ne calcule pas automatiquement un percentile et ne remplace pas le barème d’un test.',
  seoTitle: 'Calculateur de score z | Formule et interprétation',
  seoDescription: 'Calculez z = (x − moyenne) / écart-type. Exemple, distance à la moyenne, groupe de référence, limites et vérification locale.',
  keywords: [
    'calculateur score z',
    'calculer score z',
    'formule score z',
    'score standardisé',
    'centrer réduire une valeur',
    'écarts types de la moyenne',
    'z score statistique',
    'standardiser une note',
  ],
  capabilities: [
    'Calculer z avec une valeur, une moyenne et un écart-type strictement positif.',
    'Afficher le score z avec jusqu’à trois décimales.',
    'Indiquer la distance absolue à la moyenne en unités d’écart-type.',
    'Signaler une position au-dessus, au-dessous ou exactement à la moyenne.',
    'Accepter des valeurs négatives ou décimales lorsque l’échelle les autorise.',
    'Effacer le résultat dès qu’une entrée change pour éviter un calcul périmé.',
  ],
  contentSections: [
    {
      heading: 'Réponse directe : comment calculer un score z',
      paragraphs: [
        'Saisissez la valeur observée x, la moyenne du même groupe et son écart-type, puis cliquez sur Calculer le score z. L’outil soustrait la moyenne et divise cette différence par l’écart-type. Avec x = 82, moyenne = 70 et écart-type = 10, z = (82 − 70) / 10 = 1,2 : la valeur se situe à 1,2 écart-type au-dessus de la moyenne. Avec x = 58, z = −1,2 et la distance est identique dans l’autre direction.',
        'Les trois nombres doivent décrire la même variable, la même unité et une population ou un échantillon pertinent. Une note d’une session ne doit pas être standardisée avec la moyenne d’une autre session sans justification. La calculatrice contrôle les nombres et refuse un écart-type nul ou négatif ; elle ne peut pas vérifier la qualité du groupe de référence.',
      ],
      items: [
        'z = 0 : la valeur est égale à la moyenne.',
        'z = 1 : elle est un écart-type au-dessus.',
        'z = −2 : elle est deux écarts-types au-dessous.',
        'Le signe indique la direction ; |z| mesure la distance.',
      ],
    },
    {
      heading: 'Que signifie un score standardisé sans unité ?',
      paragraphs: [
        'L’Insee définit l’écart-type comme une mesure de la dispersion des valeurs autour de leur moyenne. Diviser l’écart x − moyenne par cette dispersion retire l’unité originale : points, centimètres ou secondes deviennent un nombre d’écarts-types. Une différence de 10 points peut ainsi être importante dans un groupe très homogène et modeste dans un groupe dispersé.',
        'Positif ne veut pas dire favorable et négatif défavorable. Sur une échelle d’erreurs, de durée ou de symptômes, une valeur plus haute peut être moins souhaitable. Le résultat décrit une position relative ; son sens dépend de la variable, de sa direction et de la décision étudiée.',
      ],
    },
    {
      heading: 'Population, échantillon et choix de l’écart-type',
      paragraphs: [
        'La forme du calcul est identique avec des paramètres de population ou des statistiques d’échantillon, mais l’interprétation diffère. Si x appartient à une population complète décrite par μ et σ, la comparaison porte sur ces paramètres. Si moyenne et s sont estimées sur un échantillon, le score est relatif à cet échantillon. Notez la source plutôt que de mélanger des paramètres issus de groupes différents.',
        'Cette page ne calcule pas l’écart-type et ne choisit pas entre version population et version échantillon. Utilisez la définition prévue par le protocole, le cours ou le manuel. Un écart-type nul signifie que toutes les valeurs de référence sont identiques : la division est alors impossible. Conservez les décimales pendant les étapes et arrondissez le score z à la fin.',
      ],
    },
    {
      heading: 'Centrer-réduire ne rend pas la distribution normale',
      paragraphs: [
        'Soustraire la moyenne recentre les données sur zéro ; diviser par l’écart-type donne une dispersion de référence égale à un. La transformation reste linéaire et conserve la forme. Une distribution asymétrique, bimodale ou riche en valeurs extrêmes le reste après standardisation.',
        'Un score z ne suffit donc pas pour lire une aire dans une table de loi normale ni annoncer un percentile. Une telle conversion exige un modèle normal justifié ou un barème qui la prévoit. Pour connaître la position empirique dans une liste, le rang percentile répond à une question différente.',
      ],
      link: {
        prefix: 'Pour une position obtenue par comptage dans le groupe, utilisez le ',
        label: 'calculateur de rang percentile',
        href: '/fr/outils/calculateur-rang-percentile/',
        suffix: '.',
      },
    },
    {
      heading: 'Comparer deux scores z : utile, mais pas magique',
      paragraphs: [
        'La standardisation permet de comparer des distances relatives sur des échelles dont les dispersions diffèrent. Un élève à z = 1 sur un test se situe un écart-type au-dessus de la moyenne de sa référence ; un autre à z = 0,5 se situe à un demi-écart-type. Cette comparaison n’est recevable que si les groupes, les dates, la qualité des mesures et la signification des variables sont compatibles.',
        'Deux tests différents ne deviennent pas le même construit parce qu’ils partagent une échelle. Un z de compréhension écrite et un z de vitesse décrivent deux positions relatives, pas une compétence commune. Il faut également distinguer ce score descriptif du « test z » utilisé en statistique inférentielle.',
      ],
    },
    {
      heading: 'Valeurs extrêmes, z supérieur à 3 et vérification',
      paragraphs: [
        'Un |z| supérieur à 3 sert parfois de signal pour examiner une observation, mais ce n’est pas une règle universelle d’exclusion. Une grande population ou une distribution à queues épaisses peut contenir des valeurs réelles éloignées de la moyenne. Vérifiez l’unité, la saisie, la date, les conditions de mesure et le protocole avant de retirer quoi que ce soit.',
        'Contrôlez le calcul en trois temps : x − moyenne, division par l’écart-type, puis signe. Le résultat doit être zéro lorsque x égale la moyenne. Remplacer l’écart-type par la variance est une erreur fréquente, car la variance est exprimée dans l’unité au carré.',
      ],
    },
    {
      heading: 'Comment communiquer un score z sans surinterpréter',
      paragraphs: [
        'Une phrase contrôlable donne toutes les entrées : « Le score 82 est comparé à une moyenne de 70 et un écart-type de 10 ; z = 1,2, soit 1,2 écart-type au-dessus de la moyenne. » Ajoutez la population, la date et la version de l’évaluation. Le nombre seul ne permet pas de reconstruire la comparaison.',
        'Un score z n’est ni une note officielle, ni une probabilité, ni un diagnostic. Les publications de la DEPP montrent que des échelles peuvent être fixées par construction, par exemple moyenne 250 et écart-type 50. Une transformation facilite la lecture, mais la validité vient de la méthode de mesure et du cadre d’interprétation.',
      ],
    },
  ],
  instructions: [
    'Identifiez une valeur x et un groupe de référence pertinent.',
    'Saisissez la moyenne calculée ou publiée pour ce même groupe.',
    'Saisissez un écart-type positif correspondant à la même définition.',
    'Calculez z = (x − moyenne) / écart-type.',
    'Vérifiez le signe, la distance et l’ordre de grandeur manuellement.',
    'Rapportez x, moyenne, écart-type, groupe, date et méthode avec le résultat.',
  ],
  examples: [
    '82, moyenne 70, écart-type 10 → z = 1,2.',
    '58, moyenne 70, écart-type 10 → z = −1,2.',
    '70, moyenne 70, écart-type 10 → z = 0.',
    'Comparer prudemment deux positions relatives issues de références documentées.',
    'Repérer une saisie potentiellement aberrante sans supprimer automatiquement la donnée.',
  ],
  audience: [
    'Élèves et étudiants apprenant la standardisation.',
    'Enseignants préparant ou vérifiant un exemple statistique.',
    'Analystes disposant déjà d’une moyenne et d’un écart-type pertinents.',
    'Personnes qui veulent un calcul local sans saisir d’identifiant.',
  ],
  caseStudies: [
    { title: 'Vérification d’un exercice', description: 'Une étudiante calcule 1,2 à la main, retrouve la même valeur et explique séparément le signe et la distance.' },
    { title: 'Deux sessions non comparables', description: 'Un enseignant constate que les moyennes viennent de sessions différentes et refuse de comparer les deux z sans analyser les épreuves.' },
    { title: 'Valeur très éloignée', description: 'Une analyste obtient z = 3,4, contrôle unité et saisie, puis conserve l’observation réelle au lieu de l’exclure par automatisme.' },
  ],
  notes: [
    'La formule est z = (x − moyenne) / écart-type.',
    'L’écart-type doit être strictement positif.',
    'La standardisation conserve la forme de la distribution.',
    'Un score z ne donne pas automatiquement un percentile.',
    'La pertinence du groupe de référence reste une décision humaine.',
    'La calculatrice n’effectue ni test d’hypothèse ni diagnostic.',
  ],
  faq: [
    { q: 'Comment calculer un score z ?', a: 'Soustrayez la moyenne à la valeur, puis divisez par l’écart-type : z = (x − moyenne) / écart-type.' },
    { q: 'Que signifie z = −1,5 ?', a: 'La valeur se trouve à 1,5 écart-type au-dessous de la moyenne du groupe utilisé.' },
    { q: 'Pourquoi l’écart-type ne peut-il pas être zéro ?', a: 'La division par zéro est indéfinie. Si toutes les valeurs de référence sont identiques, il n’existe pas de dispersion permettant cette standardisation.' },
    { q: 'Le score z suit-il toujours une loi normale ?', a: 'Non. Centrer et réduire ne change pas la forme de la distribution.' },
    { q: 'z = 2 correspond-il au percentile 97,5 ?', a: 'Approximativement seulement dans un modèle normal standard justifié. Cette page ne fait pas cette hypothèse.' },
    { q: 'Faut-il un écart-type population ou échantillon ?', a: 'Utilisez celui défini par votre méthode et documentez sa source. La calculatrice ne peut pas choisir sans le plan d’analyse.' },
    { q: 'Puis-je comparer les z de deux tests ?', a: 'Avec prudence si références et construits sont comparables. Une unité commune ne rend pas deux tests équivalents.' },
    { q: 'Les nombres saisis sont-ils envoyés ?', a: 'Non. La valeur, la moyenne, l’écart-type et z sont traités dans cet onglet.' },
  ],
  labels: {
    score: 'Valeur observée (x)',
    mean: 'Moyenne du groupe',
    sd: 'Écart-type',
    calculate: 'Calculer le score z',
    result: 'Score z',
    distanceFromMean: 'Distance à la moyenne',
    sdUnit: 'écart-type',
    relativePosition: 'Position relative',
    aboveMean: 'Au-dessus de la moyenne',
    belowMean: 'Au-dessous de la moyenne',
    atMean: 'Égale à la moyenne',
    invalid: 'Saisissez une valeur et une moyenne valides, ainsi qu’un écart-type strictement positif.',
  },
  sources: [
    { label: 'Insee : écart-type', href: 'https://www.insee.fr/fr/metadonnees/definition/c1913', note: 'Définit l’écart-type comme mesure de dispersion autour de la moyenne.' },
    { label: 'DEPP : définitions statistiques de l’éducation', href: 'https://www.education.gouv.fr/depp/les-definitions-des-termes-et-indicateurs-statistiques-de-l-education-nationale-5123', note: 'Présente écart-type et échelles de compétences construites avec moyenne et dispersion fixées.' },
    { label: 'Insee : évaluation des compétences et échelles', href: 'https://www.insee.fr/fr/information/6035946?sommaire=6035950', note: 'Explique la standardisation en moyenne 0 et écart-type 1 puis les transformations vers d’autres échelles.' },
  ],
  privacyNote: 'La valeur, la moyenne, l’écart-type et z restent dans cet onglet. Aucun nom ni identifiant n’est nécessaire.',
  disclaimer: 'Outil pédagogique de standardisation descriptive. Vérifiez groupe de référence, définition de l’écart-type et barème avant toute décision.',
};

export const frenchZScoreReview = {
  heading: 'Contrôle avant d’interpréter le score z',
  intro: 'Une division exacte ne corrige pas une référence incompatible ni une hypothèse injustifiée.',
  panels: [
    { title: 'Référence', text: 'Valeur, moyenne et écart-type décrivent la même variable, le même groupe et la même période.' },
    { title: 'Dispersion', text: 'Le nombre saisi est un écart-type positif, pas une variance.' },
    { title: 'Sens', text: 'Le signe est interprété selon la variable et non comme bon ou mauvais.' },
  ],
  checklistHeading: 'Liste de contrôle',
  checklist: [
    'Le groupe de référence est pertinent et documenté.',
    'La définition population, échantillon ou norme est connue.',
    'Le résultat est arrondi seulement à la fin.',
    'Aucun percentile n’est déduit sans modèle justifié.',
    'L’interprétation conserve les entrées et le contexte.',
  ],
};

export const frenchTScore: ToolContent = {
  name: 'Calculateur de score T',
  short: 'Convertissez un score z vers l’échelle T de moyenne 50 et d’écart-type 10, sans le confondre avec le test t de Student.',
  long: 'Ce calculateur transforme z selon T = 50 + 10z. Sur cette échelle standardisée, 50 représente la moyenne et 10 points représentent un écart-type. La transformation évite souvent les valeurs négatives et exprime la même position avec une origine différente. Elle concerne le score T psychométrique 50/10 : elle ne calcule ni le statistique t de Student, ni un T-score de densitométrie, ni un barème propriétaire.',
  seoTitle: 'Calculateur de score T | Convertir z en T',
  seoDescription: 'Convertissez z avec T = 50 + 10z. Échelle moyenne 50, écart-type 10, exemples, limites et différence avec le t de Student.',
  keywords: [
    'calculateur score T',
    'convertir z en T',
    'formule score T',
    'échelle T moyenne 50',
    'score standardisé T',
    'T = 50 + 10z',
    'score T psychométrique',
    'différence score T test t',
  ],
  capabilities: [
    'Convertir tout score z fini avec T = 50 + 10z.',
    'Afficher T avec jusqu’à deux décimales et rappeler le z équivalent.',
    'Situer le résultat au-dessus, au-dessous ou à la moyenne 50.',
    'Accepter les valeurs z négatives et décimales.',
    'Effacer le résultat dès que l’entrée est modifiée.',
    'Effectuer la transformation localement sans identifiant.',
  ],
  contentSections: [
    {
      heading: 'Réponse directe : convertir un score z en score T',
      paragraphs: [
        'Saisissez le score z et cliquez sur Convertir z en T. La page multiplie z par 10 puis ajoute 50. Avec z = 1,2, T = 50 + 12 = 62. La position reste 1,2 écart-type au-dessus de la moyenne. Avec z = −1,2, T = 38 ; avec z = 0, T = 50.',
        'L’entrée doit déjà être un score z obtenu avec une référence valable. Une note brute de 14 sur 20 n’est pas un z. Il faut d’abord connaître la moyenne et l’écart-type du groupe ou utiliser la table officielle du test. La conversion ne fabrique pas un barème absent.',
      ],
      items: ['z = −2 → T = 30.', 'z = −1 → T = 40.', 'z = 0 → T = 50.', 'z = 1 → T = 60 ; z = 2 → T = 70.'],
    },
    {
      heading: 'Pourquoi l’échelle T utilise une moyenne de 50',
      paragraphs: [
        'Lorsque z a une moyenne 0 et un écart-type 1, la transformation 50 + 10z produit une échelle de moyenne 50 et d’écart-type 10. Une différence de 10 points T correspond à un écart-type et 5 points à un demi-écart-type. Les valeurs usuelles sont plus faciles à lire que des z négatifs ou décimaux.',
        'La transformation est linéaire et croissante : elle conserve l’ordre et les distances relatives. T = 62 ne contient pas plus d’information que z = 1,2. Changer l’origine et l’unité n’améliore ni la fiabilité, ni la validité, ni la précision du test.',
      ],
    },
    {
      heading: 'Score T, test t de Student et T-score osseux',
      paragraphs: [
        'Le score T de cette page est une échelle psychométrique 50/10. Le statistique t de Student appartient aux tests d’hypothèse et dépend d’un écart, d’une erreur standard et de degrés de liberté. Lui appliquer 50 + 10t ne produit pas une interprétation psychométrique valable.',
        'Le T-score d’une densitométrie osseuse relève d’une définition clinique et de recommandations médicales spécifiques. Cet outil n’évalue ni densité minérale osseuse, ni ostéoporose, ni risque de fracture. La lettre T identique ne rend pas ces mesures interchangeables.',
      ],
      items: [
        'Score T psychométrique : moyenne 50, écart-type 10.',
        't de Student : statistique inférentielle avec degrés de liberté.',
        'T-score osseux : indicateur médical avec référence clinique.',
        'Toujours identifier le domaine et le manuel avant de convertir.',
      ],
    },
    {
      heading: 'Barèmes et tables officielles peuvent donner un autre T',
      paragraphs: [
        'Un éditeur peut appliquer des tables par âge ou niveau, une normalisation, un lissage, des plafonds ou un arrondi particulier. La formule linéaire 50/10 ne reproduit pas forcément ces étapes. Si le manuel fournit une conversion directe, cette table et sa version font autorité pour l’instrument.',
        'Ne recalculer un score officiel avec une moyenne improvisée peut changer sa signification. Documentez la référence du z d’origine et vérifiez que le protocole autorise T = 50 + 10z. Si la table donne un autre nombre, examinez population normative et règle d’arrondi au lieu de forcer le résultat.',
      ],
    },
    {
      heading: 'Score T élevé, percentile et direction de l’échelle',
      paragraphs: [
        'Un T élevé signifie seulement une position supérieure sur la variable mesurée. Sur une aptitude, cela peut correspondre à davantage de réussite ; sur une échelle de difficultés, cela peut signifier davantage de symptômes. L’intitulé et la direction de cotation sont indispensables.',
        'T = 50 est le centre de la transformation, mais pas automatiquement le 50e percentile. Convertir T en percentile exige une distribution ou une table normative. La page ne présente volontairement aucune probabilité : la formule seule ne prouve pas la normalité.',
      ],
    },
    {
      heading: 'Résultats hors de 0 à 100 et précision apparente',
      paragraphs: [
        'L’échelle 50/10 n’a pas de borne mathématique. Un z très négatif peut donner T inférieur à 0 et un z très positif T supérieur à 100. Si un test plafonne les scores, c’est une règle externe qui doit être appliquée selon son manuel, pas une propriété générale de T.',
        'Afficher deux décimales facilite la vérification mais ne crée pas de précision. Si z a déjà été arrondi à 1,2, écrire T = 62,00 ne récupère pas les informations perdues. Conservez le z non arrondi lorsque possible et arrondissez selon la source.',
      ],
    },
    {
      heading: 'Comment rédiger le résultat',
      paragraphs: [
        'Une phrase complète peut être : « Le score z de 1,2 a été converti par T = 50 + 10z, donnant T = 62, soit 1,2 écart-type au-dessus de la moyenne de la référence. » Ajoutez le nom, la version et la population normative du test lorsqu’ils sont pertinents.',
        'Ne présentez pas T comme une note sur 100, un percentile, un diagnostic ou un résultat médical. Le score reste attaché à son construit, à la qualité de sa mesure et à son barème.',
      ],
    },
  ],
  instructions: [
    'Confirmez que l’entrée est bien un score z.',
    'Vérifiez que le protocole utilise l’échelle T 50/10.',
    'Saisissez z et calculez T = 50 + 10z.',
    'Contrôlez la multiplication et l’addition manuellement.',
    'Interprétez la direction selon la variable.',
    'Rapportez formule, référence, version et arrondi.',
  ],
  examples: ['z = 1,2 → T = 62.', 'z = −0,75 → T = 42,5.', 'z = 0 → T = 50.', 'z = 3 → T = 80.', 'Vérifier une table seulement si elle utilise la même règle 50/10.'],
  audience: [
    'Étudiants apprenant les transformations de scores.',
    'Enseignants illustrant une échelle standardisée.',
    'Professionnels vérifiant une conversion autorisée par un manuel.',
    'Personnes qui disposent déjà d’un z pertinent.',
  ],
  caseStudies: [
    { title: 'Exercice de psychométrie', description: 'Une étudiante transforme z = −0,6 en T = 44 et vérifie que l’écart de 6 points représente 0,6 écart-type.' },
    { title: 'Table normative différente', description: 'Un praticien constate un écart avec le manuel et conserve la table officielle, qui inclut un lissage absent de la formule.' },
    { title: 'Confusion évitée', description: 'Un chercheur identifie un statistique t de Student et refuse de le saisir dans le convertisseur de score T.' },
  ],
  notes: [
    'La formule est T = 50 + 10z.',
    'Le centre 50 et l’unité 10 supposent un z centré-réduit.',
    'L’ordre et les distances relatives sont conservés.',
    'Le score T n’est ni un t de Student ni un T-score médical.',
    'Aucun percentile n’est déduit sans distribution ou barème.',
    'Une table officielle peut intégrer des règles supplémentaires.',
  ],
  faq: [
    { q: 'Comment convertir z en T ?', a: 'Multipliez z par 10 puis ajoutez 50 : T = 50 + 10z.' },
    { q: 'Que signifie T = 60 ?', a: 'Sur l’échelle 50/10, cela correspond à z = 1, soit un écart-type au-dessus de la moyenne.' },
    { q: 'Le score T est-il une note sur 100 ?', a: 'Non. L’échelle n’est pas bornée à 0 et 100 et décrit une position standardisée.' },
    { q: 'Est-ce le test t de Student ?', a: 'Non. Le t de Student est un statistique inférentiel avec des degrés de liberté.' },
    { q: 'T = 50 est-il toujours le percentile 50 ?', a: 'Non. Il est le centre de la transformation. Le percentile dépend de la distribution ou du barème.' },
    { q: 'Puis-je convertir directement une note brute ?', a: 'Non, sauf table officielle. Il faut d’abord produire z avec une moyenne et un écart-type valides.' },
    { q: 'Pourquoi le manuel donne-t-il un autre score ?', a: 'Il peut utiliser une norme, un lissage, un plafond ou un arrondi spécifique. Suivez le manuel applicable.' },
    { q: 'Le score est-il enregistré ?', a: 'Non. z et T sont calculés dans cet onglet sans identifiant.' },
  ],
  labels: {
    z: 'Score z',
    calculate: 'Convertir z en T',
    result: 'Score T',
    zEquivalent: 'z équivalent',
    relativePosition: 'Position par rapport à T = 50',
    aboveMean: 'Au-dessus de la moyenne',
    belowMean: 'Au-dessous de la moyenne',
    atMean: 'Égale à la moyenne',
    invalid: 'Saisissez un score z numérique valide.',
  },
  sources: [
    { label: 'Insee : évaluation des compétences et échelles', href: 'https://www.insee.fr/fr/information/6035946?sommaire=6035950', note: 'Explique le passage d’une échelle centrée-réduite vers des scores transformés à moyenne et écart-type fixés.' },
    { label: 'DEPP : termes et indicateurs statistiques', href: 'https://www.education.gouv.fr/depp/les-definitions-des-termes-et-indicateurs-statistiques-de-l-education-nationale-5123', note: 'Donne des exemples d’échelles de performance dont la moyenne et l’écart-type sont fixés par construction.' },
    { label: 'Insee : écart-type', href: 'https://www.insee.fr/fr/metadonnees/definition/c1913', note: 'Rappelle la signification de l’unité de dispersion conservée par la transformation T.' },
  ],
  privacyNote: 'La seule entrée est z. La conversion est exécutée dans cet onglet et n’est pas envoyée à FunnyTools.',
  disclaimer: 'Calcule uniquement le score T psychométrique 50/10. Ne pas utiliser pour le t de Student, une densitométrie ou un diagnostic.',
};

export const frenchTScoreReview = {
  heading: 'Contrôle avant d’utiliser le score T',
  intro: 'Identifiez le type de T et le barème applicable avant de convertir.',
  panels: [
    { title: 'Entrée', text: 'Le nombre est un score z obtenu avec la bonne référence.' },
    { title: 'Échelle', text: 'Le protocole utilise réellement T = 50 + 10z.' },
    { title: 'Contexte', text: 'Le résultat n’est confondu ni avec t de Student, ni avec une mesure médicale.' },
  ],
  checklistHeading: 'Liste de contrôle',
  checklist: [
    'Le groupe de référence de z est connu.',
    'La transformation 50/10 est autorisée.',
    'Aucun percentile automatique n’est annoncé.',
    'La direction de l’échelle est interprétée.',
    'La formule, la version et l’arrondi sont documentés.',
  ],
};

export const frenchWeightedAverage: ToolContent = {
  name: 'Calculateur de moyenne pondérée',
  short: 'Combinez notes, crédits, pourcentages ou autres valeurs avec des poids cohérents, puis contrôlez la somme pondérée.',
  long: 'Ce calculateur applique moyenne pondérée = Σ(valeur × poids) / Σpoids. Vous pouvez ajouter ou retirer des lignes et utiliser pourcentages, coefficients, crédits, heures ou proportions, à condition de garder une unité commune et des poids positifs. Les lignes partiellement remplies provoquent une erreur pour éviter une omission silencieuse. Le résultat ne décide ni seuil de réussite, ni arrondi officiel, ni formule particulière d’admission.',
  seoTitle: 'Moyenne pondérée | Calculateur et formule',
  seoDescription: 'Calculez une moyenne pondérée avec notes, coefficients, pourcentages ou crédits. Formule, somme des poids, exemples et contrôles.',
  keywords: [
    'calculateur moyenne pondérée',
    'calcul moyenne avec coefficient',
    'moyenne notes coefficients',
    'note finale pondérée',
    'moyenne pondérée crédits',
    'formule moyenne pondérée',
    'calculer moyenne pourcentage',
    'pondération évaluation',
  ],
  capabilities: [
    'Combiner au moins deux valeurs avec des poids strictement positifs.',
    'Accepter pourcentages, coefficients, crédits, heures ou proportions cohérentes.',
    'Normaliser en divisant automatiquement par la somme des poids.',
    'Afficher somme des poids, somme pondérée et moyenne.',
    'Ajouter ou retirer des composants.',
    'Refuser une ligne incomplète, un poids nul ou négatif.',
  ],
  contentSections: [
    {
      heading: 'Réponse directe : calculer une moyenne pondérée',
      paragraphs: [
        'Saisissez une valeur et son poids sur chaque ligne, puis cliquez sur Calculer. Avec 12 coefficient 2 et 16 coefficient 3, la somme pondérée vaut 12 × 2 + 16 × 3 = 72, la somme des coefficients vaut 5 et la moyenne est 72 / 5 = 14,4. Le coefficient 3 donne à la seconde note une influence une fois et demie supérieure à la première.',
        'Les poids n’ont pas besoin de totaliser 100, car le dénominateur les normalise. Les couples 30 et 70, 3 et 7, ou 0,3 et 0,7 donnent la même proportion. Ils doivent toutefois employer une convention homogène dans une même opération.',
      ],
      items: [
        '12 coefficient 2 et 16 coefficient 3 → 14,4.',
        '80 à 30 % et 90 à 70 % → 87.',
        '80 poids 3 et 90 poids 7 → 87.',
        'Multiplier tous les poids par le même nombre ne change pas la moyenne.',
      ],
    },
    {
      heading: 'Formule et différence avec la moyenne simple',
      paragraphs: [
        'La moyenne simple donne le même poids à chaque valeur. La moyenne pondérée calcule MP = Σ(wᵢxᵢ) / Σwᵢ. Le numérateur additionne les produits et le dénominateur remet les poids sur leur échelle. Oublier la division ne fonctionne que si les poids décimaux totalisent exactement 1.',
        'Avec des poids positifs, le résultat reste entre la plus petite et la plus grande valeur. Un résultat extérieur à cet intervalle signale une erreur de formule, de signe ou d’unité. La page refuse les poids nuls ou négatifs : une pénalité additive répond généralement à une autre formule.',
      ],
    },
    {
      heading: 'Coefficients, pourcentages, crédits : choisir une seule unité',
      paragraphs: [
        'Dans un bulletin, les poids sont souvent appelés coefficients. Dans une unité d’enseignement, ils peuvent être des crédits ECTS ; dans une évaluation, des pourcentages. La mécanique est identique lorsque chaque poids exprime une importance relative définie par la règle.',
        'Ne mélangez pas 25 pour signifier 25 % et 0,75 pour signifier 75 % : l’outil les lira comme 25 et 0,75. Utilisez 25 et 75 ou 0,25 et 0,75. La somme des poids affichée sert précisément à repérer une base incohérente.',
      ],
      items: [
        'Pourcentages : 20, 30 et 50.',
        'Proportions : 0,2, 0,3 et 0,5.',
        'Coefficients : 2, 3 et 5.',
        'Crédits : 3, 6 et 9 si le règlement les utilise ainsi.',
      ],
    },
    {
      heading: 'Note manquante, zéro et calcul provisoire',
      paragraphs: [
        'Une cellule vide ne signifie pas zéro. Une note de 0 est une valeur réelle qui peut compter ; une case vide peut indiquer une épreuve non passée ou un résultat en attente. Toute ligne avec un seul champ rempli déclenche donc une erreur. Une ligne entièrement vide est ignorée.',
        'Pour une projection, choisissez explicitement un scénario : supprimer temporairement la composante et annoncer que la moyenne porte sur les éléments connus, ou saisir une hypothèse et la nommer. Ne présentez pas ce résultat comme une note officielle avant l’application du règlement.',
      ],
    },
    {
      heading: 'Règles scolaires et universitaires que la moyenne ne connaît pas',
      paragraphs: [
        'Une formation peut imposer une note éliminatoire, un minimum dans chaque unité, une compensation entre semestres, une seconde session, un plafond ou un arrondi précis. Deux personnes ayant la même moyenne arithmétique peuvent donc avoir une décision différente. Consultez la maquette, le règlement des études ou la consigne de l’enseignant.',
        'Le calculateur affiche jusqu’à trois décimales et ne pratique aucun arrondi réglementaire. Gardez les valeurs non arrondies pendant les produits et la division, puis appliquez une seule fois la règle officielle. Arrondir chaque composante peut déplacer la moyenne finale.',
      ],
    },
    {
      heading: 'Moyenne pondérée ou formule additive ?',
      paragraphs: [
        'Une expression `0,6 × A + 0,4 × B` est équivalente à une moyenne pondérée, car les poids totalisent 1. En revanche, `A + 0,2 × B` peut être une note de base complétée par un bonus : diviser par 1,2 changerait la règle. Toute présence de coefficients ne signifie donc pas qu’il faut normaliser.',
        'Réécrivez la formule officielle avant la saisie. La question de la moyenne pondérée est : quel centre obtient-on avec ces importances relatives ? Une admission, une rémunération ou un indice composite peut suivre une somme, un maximum, des points additionnels ou des seuils.',
      ],
    },
    {
      heading: 'Contrôles simples avant d’utiliser le résultat',
      paragraphs: [
        'Vérifiez le nombre de lignes, la somme des poids, la somme pondérée et l’intervalle min–max. Recalculez au moins un exemple à la main. Si tous les valeurs sont identiques, la moyenne doit être identique quel que soit le poids. Si un seul poids augmente, le résultat doit se rapprocher de la valeur correspondante.',
        'Les notes et poids restent dans l’onglet ; aucun nom n’est utile. Pour une décision importante, conservez la formule, la source des coefficients et la date plutôt qu’une simple capture du résultat.',
      ],
    },
  ],
  instructions: [
    'Recopiez la formule ou le règlement avant de choisir les poids.',
    'Saisissez une valeur et un poids positif sur chaque ligne active.',
    'Ajoutez ou retirez les composants nécessaires.',
    'Calculez puis contrôlez somme des poids et somme pondérée.',
    'Vérifiez que le résultat est compris entre minimum et maximum.',
    'Appliquez les seuils et l’arrondi officiel séparément.',
  ],
  examples: [
    '12 coefficient 2 et 16 coefficient 3 → 14,4.',
    'Contrôle 30 %, projet 20 %, examen 50 %.',
    'Moyenne de modules pondérée par crédits ECTS lorsque le règlement le prévoit.',
    'Projection avec une hypothèse clairement annoncée pour une note manquante.',
    'Comparer 3/7 et 30/70 pour vérifier l’invariance de l’échelle des poids.',
  ],
  audience: [
    'Élèves calculant une moyenne de notes avec coefficients.',
    'Étudiants travaillant avec crédits ou pourcentages.',
    'Enseignants vérifiant une pondération.',
    'Toute personne qui doit combiner des valeurs avec une importance relative.',
  ],
  caseStudies: [
    { title: 'Bulletin avec coefficients', description: 'Un élève saisit 12 coefficient 2 et 16 coefficient 3, retrouve 14,4 et vérifie le règlement d’arrondi de son établissement.' },
    { title: 'Crédits universitaires', description: 'Une étudiante utilise les crédits seulement après confirmation que la moyenne de l’unité est pondérée de cette façon.' },
    { title: 'Formule d’admission', description: 'Une candidate constate que la règle ajoute des points de spécialité sans division et choisit le simulateur officiel plutôt que cette moyenne.' },
  ],
  notes: [
    'La formule est Σ(valeur × poids) / Σpoids.',
    'Les poids doivent être positifs et dans une unité cohérente.',
    'Les poids ne sont pas obligés de totaliser 100.',
    'Vide et zéro ont des significations différentes.',
    'Seuils, bonus, plafonds et arrondis ne sont pas appliqués.',
    'Une formule additive n’est pas toujours une moyenne.',
  ],
  faq: [
    { q: 'Comment calculer une moyenne avec coefficients ?', a: 'Multipliez chaque note par son coefficient, additionnez les produits et divisez par la somme des coefficients.' },
    { q: 'Les coefficients doivent-ils faire 100 ?', a: 'Non. Ils sont normalisés par leur somme. Ils doivent seulement exprimer une proportion cohérente.' },
    { q: 'Puis-je mélanger 30 % et 0,7 ?', a: 'Non. Utilisez 30 et 70 ou 0,3 et 0,7 pour rester sur la même base.' },
    { q: 'Une note absente vaut-elle zéro ?', a: 'Pas automatiquement. Décidez selon le règlement si elle est en attente, non applicable ou réellement égale à zéro.' },
    { q: 'Pourquoi une ligne incomplète provoque-t-elle une erreur ?', a: 'Pour empêcher qu’une valeur ou un poids disparaisse silencieusement du calcul.' },
    { q: 'Peut-on utiliser un poids négatif ?', a: 'Non pour une moyenne pondérée ordinaire. Une pénalité négative appartient généralement à une formule différente.' },
    { q: 'L’outil applique-t-il l’arrondi officiel ?', a: 'Non. Il affiche jusqu’à trois décimales. Appliquez la règle de votre établissement à la fin.' },
    { q: 'Les notes sont-elles enregistrées ?', a: 'Non. Valeurs, poids et résultat restent dans cet onglet.' },
  ],
  labels: {
    value: 'Valeur ou note',
    weight: 'Poids ou coefficient',
    add: 'Ajouter une ligne',
    remove: 'Retirer',
    calculate: 'Calculer la moyenne pondérée',
    weightTotal: 'Somme des poids',
    weightedSum: 'Somme pondérée',
    result: 'Moyenne pondérée',
    invalid: 'Complétez valeur et poids sur chaque ligne active. Utilisez des nombres valides et des poids strictement positifs.',
  },
  sources: [
    { label: 'Insee : moyenne', href: 'https://www.insee.fr/fr/metadonnees/definition/c1366', note: 'Présente la moyenne comme somme des valeurs divisée par le nombre de valeurs.' },
    { label: 'Ministère de l’Éducation : programme de SES', href: 'https://www.education.gouv.fr/bo/13/Hebdo21/MENE1308664A.htm', note: 'Mentionne l’apprentissage de la moyenne arithmétique simple et pondérée parmi les outils statistiques.' },
    { label: 'DEPP : termes et indicateurs statistiques', href: 'https://www.education.gouv.fr/depp/les-definitions-des-termes-et-indicateurs-statistiques-de-l-education-nationale-5123', note: 'Fournit le cadre terminologique des statistiques de l’éducation.' },
  ],
  privacyNote: 'Les valeurs, poids et résultats sont calculés dans le navigateur. Les noms et identifiants sont inutiles.',
  disclaimer: 'Résultat indicatif. Vérifiez le règlement, les seuils, les bonus et l’arrondi officiel avant une décision scolaire, universitaire ou administrative.',
};

export const frenchWeightedAverageReview = {
  heading: 'Contrôle avant d’accepter la moyenne pondérée',
  intro: 'Le calcul représente la règle uniquement si les composants et les poids ont été définis de façon cohérente.',
  panels: [
    { title: 'Valeurs', text: 'Chaque ligne appartient à la formule et zéro est distingué d’une donnée absente.' },
    { title: 'Poids', text: 'Tous sont positifs et utilisent la même base : coefficients, pourcentages ou crédits.' },
    { title: 'Règlement', text: 'Seuils, bonus, plafonds et arrondi sont vérifiés séparément.' },
  ],
  checklistHeading: 'Liste de contrôle',
  checklist: [
    'Aucune ligne n’est partiellement remplie.',
    'La somme des poids correspond au dispositif prévu.',
    'Le résultat reste entre la valeur minimale et maximale.',
    'La règle est bien Σwx/Σw et non une somme additive.',
    'L’arrondi n’est appliqué qu’à la fin.',
  ],
};
