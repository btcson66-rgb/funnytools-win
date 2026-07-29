import type { ToolContent } from '../tools/_types';

export const frenchStandardDeviation: ToolContent = {
  name: 'Calculateur d’écart-type et de variance',
  short: 'Calculez moyenne, médiane, variance et écart-type pour une population ou un échantillon.',
  long: 'Saisissez une série de nombres séparés par des virgules, des espaces ou des retours à la ligne. Le calculateur affiche effectif, somme, moyenne, médiane, mode, minimum, maximum, étendue, variance et écart-type. Les résultats population et échantillon sont séparés. Le calcul reste dans le navigateur et l’affichage est arrondi à quatre décimales au maximum.',
  seoTitle: 'Calculateur d’écart-type et de variance',
  seoDescription: 'Calculez écart-type, variance, moyenne et médiane pour une population ou un échantillon, avec formules et vérifications.',
  keywords: [
    'calculateur écart-type',
    'calculer variance en ligne',
    'écart-type population échantillon',
    'variance échantillon n moins 1',
    'moyenne médiane mode calculateur',
    'statistiques descriptives en ligne',
    'formule écart-type',
  ],
  capabilities: [
    'Lire des nombres séparés par une virgule, un espace ou un retour à la ligne.',
    'Calculer effectif, somme, moyenne, médiane, mode, minimum, maximum et étendue.',
    'Afficher variance et écart-type de population avec le diviseur n.',
    'Afficher variance et écart-type d’échantillon avec le diviseur n−1.',
    'Copier un résumé textuel des résultats visibles.',
  ],
  contentSections: [
    {
      heading: 'Réponse rapide : calculer un écart-type',
      paragraphs: [
        'Collez les valeurs dans la zone de saisie. Les résultats se mettent à jour immédiatement. Si la liste contient tous les individus du groupe que vous voulez décrire, lisez la colonne population. Si elle représente seulement une partie utilisée pour estimer un ensemble plus vaste, lisez la sortie échantillon. Le calculateur affiche aussi les deux variances, la moyenne et l’étendue pour faciliter le contrôle.',
        'La virgule sépare les observations : écrivez `12.5` et non `12,5` pour un nombre décimal. Les éléments qui ne sont pas reconnus comme des nombres sont ignorés. Vérifiez donc toujours que l’effectif affiché correspond au nombre de données attendu. La présentation est limitée à quatre décimales ; gardez les valeurs d’origine pour appliquer la précision demandée par votre cours ou protocole.',
      ],
    },
    {
      heading: 'Écart-type, variance et unité de mesure',
      paragraphs: [
        'L’écart-type décrit la dispersion des données autour de leur moyenne. On calcule l’écart entre chaque valeur et la moyenne, on élève ces écarts au carré, puis on les additionne. La variance divise cette somme par n pour une population ou par n−1 pour un échantillon. L’écart-type est la racine carrée de la variance.',
        'La variance s’exprime dans l’unité au carré, ce qui la rend parfois difficile à commenter. L’écart-type revient dans l’unité initiale : des notes en points donnent un écart-type en points. Une valeur faible indique des observations relativement regroupées ; une valeur élevée indique davantage de dispersion, sans prouver que les données sont normales, fiables ou représentatives.',
      ],
      items: [
        'Variance de population : somme des carrés divisée par n.',
        'Écart-type de population : racine de la variance de population.',
        'Variance d’échantillon : somme des carrés divisée par n−1.',
        'Écart-type d’échantillon : racine de la variance corrigée.',
      ],
    },
    {
      heading: 'Population ou échantillon : comment choisir',
      paragraphs: [
        'Utilisez population lorsque la liste contient exactement tous les cas du groupe étudié. Les résultats des 28 élèves d’une classe constituent une population si la question porte uniquement sur cette classe. Les mêmes 28 élèves deviennent un échantillon si vous cherchez à estimer la variabilité de tous les élèves d’un niveau ou d’une région.',
        'Le choix dépend de la question, pas seulement du nombre de lignes. La correction n−1, appelée correction de Bessel, réduit le biais lors de l’estimation de la variance d’une population à partir d’un échantillon. Si un exercice demande STDEV.S, ÉCARTYPE.STANDARD ou une variance corrigée, utilisez l’échantillon. Pour STDEV.P ou une population complète, utilisez population et documentez ce choix.',
      ],
    },
    {
      heading: 'Moyenne, médiane, mode et étendue',
      paragraphs: [
        'La moyenne est la somme divisée par l’effectif. La médiane est la valeur centrale après tri ; avec un effectif pair, elle correspond à la moyenne des deux valeurs centrales. L’étendue est le maximum moins le minimum. Le mode indique la ou les valeurs les plus fréquentes ; lorsqu’aucune ne se répète, le résultat signale l’absence de mode.',
        'Ces indicateurs répondent à des questions différentes. Une valeur extrême peut déplacer fortement la moyenne et l’étendue tout en affectant moins la médiane. Deux séries peuvent avoir la même moyenne et le même écart-type mais des formes différentes. Examinez les données, les valeurs aberrantes et le contexte avant de résumer toute une distribution par un seul nombre.',
      ],
    },
    {
      heading: 'Saisie des décimales et données ignorées',
      paragraphs: [
        'Les séparateurs acceptés sont la virgule, l’espace, la tabulation et le retour à la ligne. Les nombres négatifs et le point décimal sont valides. Des éléments comme `10 kg`, `18 %`, une date ou un en-tête ne sont pas convertis et disparaissent du calcul. Le composant ne dresse pas une liste détaillée des erreurs : l’effectif est donc le premier contrôle obligatoire.',
        'Supprimez les unités, notes et séparateurs de milliers avant de coller une colonne. `1.250` est lu comme un nombre décimal, pas comme mille deux cent cinquante. Pour 1 250, saisissez `1250`. Faites un essai sur cinq valeurs connues et comparez la moyenne manuellement avant d’utiliser une grande série.',
      ],
    },
    {
      heading: 'Interprétation, données sensibles et limites',
      paragraphs: [
        'Les valeurs et résultats restent dans cet onglet ; FunnyTools ne reçoit pas la série pour effectuer le calcul. Les connexions générales du site restent possibles selon la politique de confidentialité, mais le contenu du champ n’est pas ajouté aux événements de mesure pour produire la statistique. Retirez noms et identifiants lorsqu’ils ne sont pas nécessaires.',
        'Le calculateur convient aux statistiques descriptives et aux séries de taille raisonnable. Il ne gère pas données manquantes codées, pondérations, groupes, intervalles de confiance, tests d’hypothèse ou traçabilité scientifique. Un écart-type exact ne corrige pas un mauvais échantillonnage. Pour un résultat publié, reproduisez le calcul dans le logiciel exigé et conservez méthode, unité et données sources.',
      ],
    },
  ],
  instructions: [
    'Collez les valeurs avec une virgule, un espace ou un retour à la ligne.',
    'Utilisez le point pour les décimales et contrôlez l’effectif reconnu.',
    'Décidez si la série décrit une population complète ou un échantillon.',
    'Lisez la variance et l’écart-type correspondants avec leur unité.',
    'Copiez le résumé et documentez source, variante et règle d’arrondi.',
  ],
  examples: [
    'Décrire toutes les notes d’une classe considérée comme population.',
    'Estimer l’écart-type de mesures prélevées sur un processus plus vaste.',
    'Comparer deux groupes ayant une moyenne proche mais une dispersion différente.',
    'Repérer une valeur extrême avec moyenne, médiane et étendue.',
    'Vérifier un résultat STDEV.S ou STDEV.P obtenu dans un tableur.',
  ],
  audience: [
    'Étudiants apprenant les statistiques descriptives.',
    'Enseignants préparant un exemple de population et d’échantillon.',
    'Personnes contrôlant une petite série de mesures.',
    'Utilisateurs souhaitant calculer sans envoyer leur tableau.',
  ],
  caseStudies: [
    {
      title: 'Classe entière comme population',
      description: 'Les notes 6, 7, 7, 8 et 10 représentent exactement le groupe étudié. L’effectif 5 est vérifié puis l’écart-type de population est présenté avec la moyenne, sans généraliser à un autre établissement.',
    },
    {
      title: 'Mesures utilisées comme échantillon',
      description: 'Cinq lectures proviennent d’un procédé qui continuera à produire des données. La sortie avec n−1 est retenue et accompagnée de l’unité, de l’instrument et des conditions expérimentales.',
    },
    {
      title: 'Décimale écrite avec une virgule',
      description: 'La saisie `12,5 13,0` crée quatre observations. Elle est corrigée en `12.5 13.0`, puis l’effectif passe de quatre à deux. Ce contrôle évite une interprétation fondée sur une série mal découpée.',
    },
  ],
  notes: [
    'La virgule sépare les observations ; utilisez le point décimal.',
    'Les éléments non numériques sont ignorés : vérifiez toujours l’effectif.',
    'Avec une seule observation, la variance d’échantillon reste indéfinie.',
    'L’affichage utilise au maximum quatre décimales.',
    'L’écart-type ne prouve ni normalité, causalité ou représentativité.',
  ],
  faq: [
    { q: 'Quelle différence entre variance et écart-type ?', a: 'La variance utilise l’unité au carré ; l’écart-type est sa racine carrée et revient dans l’unité des données.' },
    { q: 'Faut-il choisir population ou échantillon ?', a: 'Population si tous les cas du groupe étudié sont présents ; échantillon si la liste sert à estimer un ensemble plus vaste.' },
    { q: 'Pourquoi diviser par n−1 pour un échantillon ?', a: 'La correction de Bessel réduit le biais de l’estimation de la variance de population à partir d’un échantillon.' },
    { q: 'Peut-on saisir 12,5 comme nombre décimal ?', a: 'Non dans ce composant : la virgule sépare les valeurs. Saisissez 12.5 et vérifiez l’effectif.' },
    { q: 'Que deviennent les lettres ou les unités ?', a: 'Les éléments non numériques sont ignorés. Retirez les unités et comparez l’effectif à votre liste.' },
    { q: 'Les données sont-elles envoyées à FunnyTools ?', a: 'Non. La série et le résumé sont calculés dans la mémoire de ce navigateur.' },
  ],
  labels: {
    inputLabel: 'Saisir les nombres',
    hint: 'Séparez-les par une virgule, un espace ou un retour à la ligne ; utilisez le point décimal',
    placeholder: 'Exemple : 12, 15, 20, 22, 30',
    count: 'Effectif',
    sum: 'Somme',
    mean: 'Moyenne',
    median: 'Médiane',
    mode: 'Mode',
    min: 'Minimum',
    max: 'Maximum',
    range: 'Étendue',
    variancePopulation: 'Variance de population',
    stdevPopulation: 'Écart-type de population',
    varianceSample: 'Variance d’échantillon',
    stdevSample: 'Écart-type d’échantillon',
    copy: 'Copier le résumé',
    copied: 'Résumé copié',
    empty: 'Saisissez au moins un nombre valide.',
    modeNone: 'Aucun mode',
  },
  privacyNote: 'La série et ses résultats restent dans cet onglet. FunnyTools ne reçoit pas les valeurs pour calculer la statistique.',
  disclaimer: 'Ce calcul descriptif ne valide pas l’échantillonnage, la distribution, les données manquantes ou la méthode exigée. Vérifiez le choix population ou échantillon.',
};

export const frenchStandardDeviationReview = {
  heading: 'Comment vérifier un écart-type',
  intro: 'Un calcul exact peut répondre à la mauvaise question si la série, le séparateur ou la variante sont mal choisis.',
  panels: [
    { title: 'Compter les observations', text: 'Comparez l’effectif visible à la liste et corrigez décimales, unités ou texte ignoré.' },
    { title: 'Choisir la variante', text: 'Notez pourquoi vous utilisez population n ou échantillon n−1.' },
    { title: 'Regarder la distribution', text: 'Comparez moyenne, médiane, minimum, maximum et valeurs extrêmes.' },
  ],
  checklistHeading: 'Liste de contrôle',
  checklist: [
    'L’effectif correspond à toutes les observations valides.',
    'Les décimales utilisent un point sans séparateur de milliers ambigu.',
    'La sortie retenue correspond à population ou échantillon.',
    'L’unité, l’arrondi et le contexte accompagnent le résultat.',
  ],
};

export const frenchPercentageCalculator: ToolContent = {
  name: 'Calculateur de pourcentage',
  short: 'Calculez un pourcentage d’une valeur, la part d’un total ou une variation entre deux nombres.',
  long: 'Ce calculateur répond à trois questions distinctes : combien vaut X % de Y, quel pourcentage X représente de Y, et de combien un nombre augmente ou diminue entre une valeur initiale et une valeur finale. Les résultats se mettent à jour pendant la saisie et restent dans le navigateur. Une variation relative n’est pas définie lorsque la valeur de départ vaut zéro.',
  seoTitle: 'Calculateur de pourcentage et de variation',
  seoDescription: 'Calculez X % d’une valeur, la part d’un total et une hausse ou baisse en pourcentage, avec formules et exemples.',
  keywords: [
    'calculateur pourcentage',
    'calculer un pourcentage d’une somme',
    'quel pourcentage représente un nombre',
    'variation en pourcentage',
    'augmentation en pourcentage',
    'diminution en pourcentage',
    'calcul pourcentage en ligne',
  ],
  capabilities: [
    'Calculer X % d’une valeur Y avec Y × X ÷ 100.',
    'Calculer la part X d’un total Y en pourcentage.',
    'Calculer la variation relative d’une valeur initiale A vers une valeur B.',
    'Distinguer une hausse, une baisse ou une absence de changement.',
    'Mettre chaque réponse à jour immédiatement.',
  ],
  contentSections: [
    {
      heading: 'Réponse rapide : trois calculs de pourcentage',
      paragraphs: [
        'Le premier bloc répond à « combien vaut X % de Y ? » : 25 % de 200 donne 50. Le deuxième répond à « quel pourcentage X représente-t-il de Y ? » : 30 sur 120 donne 25 %. Le troisième mesure la variation de A vers B : passer de 80 à 100 correspond à une hausse de 25 %. Choisissez le bloc selon la question, pas seulement selon les nombres disponibles.',
        'Les résultats apparaissent sans bouton et acceptent les décimales ou des pourcentages supérieurs à 100. Une division par zéro est signalée lorsque le total du deuxième calcul ou la valeur initiale du troisième vaut zéro. L’outil n’interprète ni monnaie, taxes, remise successive ou règle administrative : il exécute la formule affichée.',
      ],
    },
    {
      heading: 'Calculer X % d’une quantité',
      paragraphs: [
        'Divisez X par 100 puis multipliez par Y. Pour 18 % de 250, `0,18 × 250 = 45`. Le résultat représente la partie, pas forcément le montant final. Dans le cas d’une remise, il faut encore soustraire 45 au prix initial de 250 pour obtenir 205.',
        'Un pourcentage peut dépasser 100 : 125 % de 80 vaut 100. Si le résultat est monétaire, appliquez les règles de la devise et arrondissez au moment prévu par la réglementation ou le contrat. Arrondir chaque étape peut donner quelques centimes d’écart par rapport à un calcul effectué avec toute la précision.',
      ],
    },
    {
      heading: 'Trouver la part d’un total en pourcentage',
      paragraphs: [
        'Divisez la partie X par le total Y et multipliez par 100. Si 36 réponses sur 144 choisissent une option, `36 ÷ 144 × 100 = 25 %`. Partie et total doivent porter sur la même unité, la même période et le même groupe. Un calcul peut être arithmétiquement correct tout en comparant des ensembles incompatibles.',
        'Le total ne peut pas valoir zéro. Une partie supérieure au total donne plus de 100 %, ce qui peut être valide pour un objectif dépassé mais incohérent dans une répartition exclusive. Si plusieurs catégories doivent former 100 %, contrôlez chevauchements, non-réponses et petits écarts créés par l’arrondi.',
      ],
    },
    {
      heading: 'Variation relative et points de pourcentage',
      paragraphs: [
        'La variation de A à B est `(B − A) ÷ A × 100`. A est la base. Passer de 80 à 100 donne +25 %, mais revenir de 100 à 80 donne −20 % : les deux opérations ne sont pas symétriques puisque le dénominateur change. La sortie indique la magnitude et le mot hausse ou baisse.',
        'Si un taux passe de 20 % à 25 %, l’écart est de 5 points de pourcentage, tandis que la hausse relative est de 25 %. Le troisième bloc calcule cette variation relative. Il ne détecte pas automatiquement que vos valeurs sont déjà des pourcentages et ne remplace pas un calcul de points de pourcentage.',
      ],
    },
    {
      heading: 'Remises, taxes, marges et évolutions successives',
      paragraphs: [
        'Une remise de 15 % sur 60 représente 9 et donne un prix final de 51. Ajouter ensuite 21 % de taxe à 51 produit 10,71 de taxe et 61,71 au total. Retirer 15 % puis ajouter 15 % ne revient pas à la valeur initiale, car le second taux s’applique à une base différente.',
        'Une marge et un taux de marque utilisent aussi des bases différentes. Un coût de 80 augmenté de 25 % donne un prix de 100 ; le bénéfice de 20 représente seulement 20 % du prix final. Définissez explicitement numérateur et dénominateur. Pour impôts, paie ou obligations commerciales, consultez la source officielle applicable.',
      ],
      items: [
        'Montant d’une remise : pourcentage du prix initial.',
        'Prix remisé : prix initial moins le montant de remise.',
        'Taux de marque : hausse calculée sur le coût.',
        'Marge : bénéfice divisé par le prix de vente.',
      ],
    },
    {
      heading: 'Précision, confidentialité et vérification',
      paragraphs: [
        'Les six nombres saisis et les résultats restent dans cette page. FunnyTools ne les reçoit pas pour effectuer les opérations. Les connexions générales du site sont distinctes du calcul local. Évitez néanmoins de saisir des informations confidentielles lorsqu’un exemple anonyme suffit.',
        'Reproduisez la formule à la main avec des valeurs simples, identifiez la base et conservez l’unité. Pour une décision financière, contractuelle ou scolaire, vérifiez aussi inclusions, période, règles d’arrondi et source. Un pourcentage précis ne corrige pas un total incomplet ou une mauvaise définition.',
      ],
    },
  ],
  instructions: [
    'Choisissez la question : partie d’une quantité, part d’un total ou variation.',
    'Saisissez les deux valeurs dans le bloc correspondant.',
    'Repérez la base utilisée dans la formule et vérifiez qu’elle n’est pas nulle.',
    'Contrôlez le résultat avec un exemple simple ou un calcul manuel.',
    'Ajoutez unité, période, source et règle d’arrondi avant de communiquer la valeur.',
  ],
  examples: [
    'Calculer 18 % d’un prix de 250.',
    'Trouver la part de 36 réponses dans un total de 144.',
    'Mesurer la hausse d’un indicateur de 80 à 100.',
    'Distinguer cinq points de pourcentage d’une hausse relative de 25 %.',
    'Calculer une remise puis une taxe sur la nouvelle base.',
  ],
  audience: [
    'Personnes vérifiant prix, remise, taxe ou commission.',
    'Étudiants apprenant les trois formules courantes.',
    'Équipes comparant objectifs et valeurs obtenues.',
    'Utilisateurs souhaitant un calcul rapide sans inscription.',
  ],
  caseStudies: [
    {
      title: 'Remise de 20 %',
      description: 'Le premier bloc donne 24 pour 20 % de 120. Le prix final est ensuite calculé séparément : 120 − 24 = 96. Cette distinction évite de présenter le montant de remise comme le prix à payer.',
    },
    {
      title: 'Réponses à un questionnaire',
      description: '45 réponses favorables sur 60 donnent 75 %. Le rapport précise que 60 est le nombre de réponses valides et non le nombre d’invitations, afin que le dénominateur reste compréhensible.',
    },
    {
      title: 'Taux passant de 40 % à 50 %',
      description: 'La hausse est de 10 points de pourcentage et de 25 % en variation relative. Le libellé choisi indique clairement laquelle de ces deux mesures est communiquée.',
    },
  ],
  notes: [
    'Les trois blocs utilisent des formules et des bases différentes.',
    'La variation relative n’est pas définie avec une valeur initiale nulle.',
    'Une hausse puis une baisse du même taux ne s’annulent pas.',
    'Points de pourcentage et variation relative ne sont pas synonymes.',
    'L’outil ne connaît ni taxe, devise ou règle d’arrondi locale.',
  ],
  faq: [
    { q: 'Comment calculer 20 % d’une somme ?', a: 'Multipliez la somme par 20 puis divisez par 100. Le premier bloc exécute directement cette formule.' },
    { q: 'Comment savoir quel pourcentage représente une partie ?', a: 'Divisez la partie par le total et multipliez par 100. Le total doit être non nul et comparable à la partie.' },
    { q: 'Comment calculer une hausse en pourcentage ?', a: 'Soustrayez la valeur initiale de la nouvelle, divisez par la valeur initiale puis multipliez par 100.' },
    { q: 'Pourquoi une base zéro produit-elle une erreur ?', a: 'Une variation relative ou une part nécessite une division. La division par zéro n’est pas définie.' },
    { q: 'Cinq points de pourcentage signifient-ils +5 % ?', a: 'Pas toujours. De 20 % à 25 %, l’écart est 5 points mais la hausse relative est 25 %.' },
    { q: 'Les valeurs sont-elles envoyées à FunnyTools ?', a: 'Non. Les opérations sont réalisées dans ce navigateur.' },
  ],
  labels: {
    p1Title: 'Combien vaut X % de Y ?',
    p1Desc: 'Exemple : 25 % de 200 = 50',
    p1Percent: 'Pourcentage X',
    p1Value: 'Valeur Y',
    p2Title: 'Quel pourcentage X représente-t-il de Y ?',
    p2Desc: 'Exemple : 30 sur 120 = 25 %',
    p2Part: 'Partie X',
    p2Whole: 'Total Y',
    p3Title: 'Quelle variation de A vers B ?',
    p3Desc: 'Exemple : de 80 à 100 = hausse de 25 %',
    p3From: 'Valeur initiale A',
    p3To: 'Nouvelle valeur B',
    result: 'Résultat',
    invalid: 'Saisissez deux nombres valides.',
    divideZero: 'Calcul non défini avec une base nulle.',
    increase: 'de hausse',
    decrease: 'de baisse',
    noChange: 'sans changement',
  },
  privacyNote: 'Les nombres et résultats restent dans cet onglet. FunnyTools ne reçoit pas les valeurs pour calculer les pourcentages.',
  disclaimer: 'Le calculateur exécute des formules générales. Il ne valide pas taxes, marges, monnaie, arrondis, réglementation ou pertinence du dénominateur.',
};

export const frenchPercentageCalculatorReview = {
  heading: 'Comment vérifier un calcul de pourcentage',
  intro: 'La principale erreur vient souvent d’une mauvaise base, pas de la multiplication elle-même.',
  panels: [
    { title: 'Nommer la question', text: 'Distinguez montant, part d’un total et variation avant de choisir le bloc.' },
    { title: 'Repérer la base', text: 'Identifiez le nombre placé au dénominateur et pourquoi il sert de référence.' },
    { title: 'Contrôler le contexte', text: 'Vérifiez unité, période, arrondi, inclusions et source du total.' },
  ],
  checklistHeading: 'Liste de contrôle',
  checklist: [
    'Le bloc correspond exactement à la question.',
    'La base est non nulle et définie dans le même contexte.',
    'Le résultat est cohérent avec un ordre de grandeur mental.',
    'Points de pourcentage et variation relative sont bien distingués.',
  ],
};

export const frenchBarChartMaker: ToolContent = {
  name: 'Créer un graphique en barres',
  short: 'Saisissez des catégories et des valeurs non négatives, puis téléchargez un graphique PNG.',
  long: 'Ajoutez une ligne par catégorie, saisissez une valeur finie supérieure ou égale à zéro et donnez éventuellement un titre de 60 caractères maximum. L’outil dessine un graphique vertical à une seule série sur un canevas de 900 × 560 pixels. La table reste dans le navigateur. Il n’accepte pas les valeurs négatives, les séries multiples, l’import CSV ou les couleurs personnalisées.',
  seoTitle: 'Créer un graphique en barres en ligne',
  seoDescription: 'Créez un graphique en barres PNG à partir de catégories et valeurs, avec aperçu local, échelle depuis zéro et contrôles de lisibilité.',
  keywords: [
    'créer graphique en barres',
    'générateur diagramme en bâtons',
    'faire histogramme simple en ligne',
    'graphique catégories valeurs PNG',
    'diagramme en barres gratuit',
    'créer graphique sans Excel',
    'graphique en colonnes en ligne',
  ],
  capabilities: [
    'Ajouter ou retirer des lignes de catégorie et de valeur.',
    'Dessiner une série verticale avec un axe partant de zéro.',
    'Afficher chaque valeur au-dessus de sa barre.',
    'Ajouter un titre facultatif de 60 caractères maximum.',
    'Télécharger un PNG de 900 × 560 pixels créé localement.',
  ],
  contentSections: [
    {
      heading: 'Réponse rapide : créer un graphique en barres',
      paragraphs: [
        'Remplacez les quatre lignes d’exemple par vos catégories et valeurs. Ajoutez ou supprimez des lignes, puis saisissez un titre court qui indique le sujet, l’unité ou la période. L’aperçu se met à jour immédiatement. Lorsque chaque barre et chaque nombre sont corrects, téléchargez le fichier PNG et conservez la table source séparément.',
        'Chaque ligne doit comporter une étiquette et un nombre fini supérieur ou égal à zéro. Une ligne incomplète, négative ou non numérique est ignorée. Le graphique est une série de colonnes simples : il ne crée ni barres horizontales, empilées, groupes multiples ou échelle logarithmique.',
      ],
    },
    {
      heading: 'Quand utiliser un graphique en barres',
      paragraphs: [
        'Les barres conviennent à la comparaison de catégories distinctes : ventes par produit, réponses par option, effectifs par groupe ou incidents par type. Toutes les colonnes partagent une échelle commune, ce qui rend les écarts plus faciles à lire. L’ordre peut suivre le temps, la grandeur ou une logique métier, à condition de l’expliquer.',
        'Pour une longue série temporelle, une courbe est souvent préférable. Pour montrer des parties d’un total, une barre empilée ou un tableau peut être plus clair. Pour étudier deux variables numériques, utilisez un nuage de points. Cet outil ne doit pas servir à suggérer une tendance, une causalité ou une proportion que les données ne démontrent pas.',
      ],
    },
    {
      heading: 'Préparer les catégories et valeurs',
      paragraphs: [
        'Une ligne correspond à une catégorie et un nombre. Le point sert de séparateur décimal. Zéro est accepté et doit être conservé lorsqu’il représente une observation réelle. Supprimer les zéros peut exagérer l’activité ou masquer l’absence d’un phénomène. Les valeurs négatives ne sont pas dessinées par cette version.',
        'Dans l’image, une étiquette de plus de dix caractères est abrégée après neuf caractères avec une ellipse. Le champ conserve le texte complet, mais pas le PNG. Choisissez des noms courts et uniques, puis expliquez toute abréviation dans le titre, la légende du rapport ou une table accessible.',
      ],
      items: [
        'Une ligne correspond à une catégorie et une valeur.',
        'Zéro est valide ; une valeur négative est ignorée.',
        'Les étiquettes longues sont abrégées dans le PNG.',
        'Le titre est limité à 60 caractères.',
      ],
    },
    {
      heading: 'Axe à zéro et comparaison visuelle',
      paragraphs: [
        'L’axe vertical part de zéro et utilise comme maximum la plus grande valeur valide, avec quatre divisions intermédiaires. Ce choix évite de tronquer l’axe et d’amplifier artificiellement de petites différences. Lorsque toutes les valeurs valent zéro, le cadre reste visible mais les barres n’ont aucune hauteur.',
        'Une valeur très élevée peut rendre les autres colonnes presque plates. Il n’y a ni zoom, axe brisé, transformation logarithmique ou second axe. Dans ce cas, montrez la table, expliquez la valeur extrême ou choisissez une autre visualisation. Ne supprimez pas une donnée uniquement pour embellir le graphique.',
      ],
    },
    {
      heading: 'Couleurs, accessibilité et nombre de barres',
      paragraphs: [
        'La palette contient huit couleurs fixes puis recommence. Les couleurs ne peuvent pas être personnalisées et ne portent pas une signification automatique. Un grand nombre de catégories réduit la largeur de chaque colonne. Limitez l’image à une question claire plutôt qu’à toutes les lignes disponibles.',
        'Le PNG contient des étiquettes et des chiffres, mais ne remplace pas une table accessible. Lors de la publication, ajoutez un texte alternatif, la conclusion principale, l’unité, la période, la source et la table de données. La couleur ne doit jamais être le seul moyen de distinguer les catégories.',
      ],
    },
    {
      heading: 'Confidentialité, téléchargement et traçabilité',
      paragraphs: [
        'Les catégories, nombres et le dessin restent dans ce navigateur. FunnyTools ne reçoit pas la table pour produire l’image. Les connexions générales du site sont régies par la politique de confidentialité, mais le contenu des lignes n’est pas joint aux événements de mesure pour effectuer le rendu.',
        'Le PNG utilise un fond blanc et ne contient ni source, table éditable, lien ou description accessible. Ouvrez le téléchargement et contrôlez titre, catégories, valeurs, ordre et unités. Gardez la table d’origine dans un format réutilisable afin de corriger ou actualiser le graphique sans retranscrire les données depuis l’image.',
      ],
    },
  ],
  instructions: [
    'Remplacez les exemples par des catégories courtes et des valeurs non négatives.',
    'Ajoutez ou retirez des lignes puis choisissez un ordre logique.',
    'Saisissez un titre de 60 caractères maximum avec sujet, unité ou période.',
    'Contrôlez l’axe à zéro, les chiffres et les étiquettes abrégées.',
    'Téléchargez le PNG et conservez table, unité, période et source séparément.',
  ],
  examples: [
    'Comparer les ventes de quatre produits dans la même unité.',
    'Afficher le nombre de réponses valides par option.',
    'Présenter les effectifs de plusieurs groupes scolaires.',
    'Comparer des incidents par catégorie pendant une période donnée.',
    'Créer une image simple pour une diapositive pédagogique.',
  ],
  audience: [
    'Étudiants préparant un graphique simple pour un rapport.',
    'Enseignants créant un support visuel avec peu de données.',
    'Équipes comparant des effectifs entre catégories.',
    'Personnes souhaitant exporter un PNG sans téléverser la table.',
  ],
  caseStudies: [
    {
      title: 'Questionnaire à quatre options',
      description: 'Quatre options et leurs réponses valides sont classées du plus grand au plus petit. Le titre indique la taille de l’échantillon et le rapport joint la table, les non-réponses et la méthode de collecte.',
    },
    {
      title: 'Étiquette trop longue',
      description: '« Assistance clientèle » est abrégé dans le canevas. Le libellé devient « Assistance » et le nom complet est conservé dans la table et le texte du rapport.',
    },
    {
      title: 'Une catégorie domine l’échelle',
      description: 'Avec 8, 11, 9 et 420, les trois premières barres paraissent très petites. La valeur 420 n’est pas supprimée : la table et une explication sont ajoutées ou une visualisation mieux adaptée est choisie.',
    },
  ],
  notes: [
    'Le résultat est un graphique vertical à une seule série.',
    'Seules les valeurs finies supérieures ou égales à zéro sont dessinées.',
    'Les étiquettes longues sont abrégées dans l’image.',
    'La palette fixe se répète après huit barres.',
    'Le PNG n’incorpore ni table, source, unité ou texte alternatif.',
  ],
  faq: [
    { q: 'Peut-on saisir des valeurs négatives ?', a: 'Non. Les lignes négatives sont ignorées ; choisissez une autre visualisation pour des valeurs qui traversent zéro.' },
    { q: 'Combien de barres peut-on ajouter ?', a: 'Il n’existe pas de limite fixe, mais chaque catégorie réduit l’espace disponible. Une série courte reste plus lisible.' },
    { q: 'Peut-on changer les couleurs ou l’axe ?', a: 'Non. Cette version utilise une palette et une échelle automatiques.' },
    { q: 'Pourquoi une étiquette est-elle coupée ?', a: 'Le canevas abrège les libellés longs. Utilisez un nom court et conservez la définition complète à côté du graphique.' },
    { q: 'Quelle est la taille du PNG ?', a: 'Le canevas produit une image de 900 × 560 pixels sur fond blanc.' },
    { q: 'Les données sont-elles envoyées à FunnyTools ?', a: 'Non. La table, le dessin et le téléchargement sont traités dans ce navigateur.' },
  ],
  labels: {
    chartType: 'bar',
    titleLabel: 'Titre du graphique (facultatif)',
    titlePlaceholder: 'Exemple : Ventes par produit, 2026',
    labelHeader: 'Catégorie',
    valueHeader: 'Valeur',
    addRow: 'Ajouter une ligne',
    remove: 'Supprimer',
    exportPng: 'Télécharger le PNG',
    canvasLabel: 'Aperçu du graphique en barres',
    emptyHint: 'Saisissez au moins une catégorie avec une valeur valide et non négative.',
    seedLabels: 'Janvier,Février,Mars,Avril',
    seedValues: '120,150,90,180',
  },
  privacyNote: 'La table et le canevas restent dans cet onglet. FunnyTools ne reçoit pas les catégories ou valeurs pour créer l’image.',
  disclaimer: 'Le graphique ne valide pas source, unité, échantillon, ordre ou interprétation. Il ne prend pas en charge négatifs, séries multiples, import CSV ou couleurs personnalisées.',
};

export const frenchBarChartMakerReview = {
  heading: 'Comment vérifier un graphique en barres',
  intro: 'Une image peut être techniquement correcte tout en induisant en erreur par omission, ordre ou manque de contexte.',
  panels: [
    { title: 'Comparer à la table', text: 'Contrôlez chaque catégorie, valeur et zéro ; aucune ligne valide ne doit disparaître.' },
    { title: 'Lire axe et ordre', text: 'Vérifiez le départ à zéro et une séquence temporelle, logique ou par grandeur.' },
    { title: 'Ajouter le contexte', text: 'Publiez unité, période, source, table et texte alternatif avec le PNG.' },
  ],
  checklistHeading: 'Liste de contrôle',
  checklist: [
    'Chaque catégorie valide apparaît une fois avec la bonne valeur.',
    'Le titre, l’unité et la période rendent la comparaison compréhensible.',
    'Les étiquettes abrégées restent sans ambiguïté.',
    'La table originale et la source sont conservées hors du PNG.',
  ],
};
