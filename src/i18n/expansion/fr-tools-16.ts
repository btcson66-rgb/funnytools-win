import type { ToolContent } from '../tools/_types';

export const frenchRandomNumberPicker: ToolContent = {
  name: 'Générateur de nombres aléatoires',
  short: 'Tirez des nombres entiers dans un intervalle inclusif, avec ou sans répétition, puis conservez l’ordre du tirage ou triez le résultat.',
  long: 'Indiquez les bornes minimale et maximale, la quantité et la règle de répétition. La page utilise `crypto.getRandomValues`, un échantillonnage par rejet et, sans doublon, l’algorithme de Floyd suivi d’un mélange. Elle accepte jusqu’à 100 000 résultats, fonctionne dans cet onglet et refuse les intervalles qui dépassent les entiers sûrs de JavaScript. Le résultat convient à des jeux, exercices, tests ou répartitions informelles ; il ne constitue ni un tirage certifié, ni une preuve auditable.',
  seoTitle: 'Générateur de nombres aléatoires en ligne',
  seoDescription: 'Générez des nombres entiers aléatoires dans un intervalle, avec ou sans répétition, tri facultatif et Web Crypto dans votre navigateur.',
  keywords: [
    'générateur de nombres aléatoires',
    'nombre aléatoire entre deux nombres',
    'tirage nombre aléatoire',
    'générateur nombre aléatoire sans répétition',
    'tirer plusieurs nombres au hasard',
    'liste aléatoire de nombres entiers',
    'random number generator français',
  ],
  capabilities: [
    'Définir deux bornes entières inclusives, négatives ou positives.',
    'Produire une valeur ou une liste pouvant atteindre 100 000 résultats.',
    'Autoriser les répétitions ou obtenir des entiers tous distincts.',
    'Conserver l’ordre de tirage ou classer numériquement la sortie.',
    'Utiliser Web Crypto avec rejet des valeurs qui créeraient un biais de modulo.',
  ],
  contentSections: [
    {
      heading: 'Réponse rapide : tirer un nombre entre deux bornes',
      paragraphs: [
        'Pour tirer un entier entre 1 et 100, laissez 1 comme minimum, 100 comme maximum et 1 comme quantité, puis cliquez sur « Générer des nombres ». Les deux bornes peuvent sortir : l’intervalle est inclusif. Pour cinq numéros distincts, saisissez 5, décochez « Autoriser les nombres répétés » et gardez au moins cinq entiers disponibles.',
        'Activez le tri seulement si la présentation doit être croissante. Un résultat trié ne montre plus l’ordre dans lequel les valeurs ont été obtenues. Si cet ordre attribue un premier prix, un deuxième prix ou une priorité, laissez le tri désactivé et copiez immédiatement la séquence avec la règle annoncée.',
      ],
    },
    {
      heading: 'Intervalle inclusif : minimum et maximum peuvent sortir',
      paragraphs: [
        'Entre `min` et `max`, le nombre de possibilités est `max - min + 1`. L’intervalle 1–6 contient donc six entiers, tandis que −2–2 en contient cinq : −2, −1, 0, 1 et 2. Oublier le `+1` est une source fréquente d’erreur lorsqu’on vérifie si une quantité sans répétition est possible.',
        'Les bornes doivent être des entiers sûrs de JavaScript et leur largeur complète doit aussi rester sûre. Cette limite évite des valeurs que le format numérique ne pourrait plus distinguer exactement. Pour des identifiants très longs, des décimales ou des entiers arbitraires, utilisez un outil conçu pour ce format au lieu de convertir silencieusement.',
      ],
    },
    {
      heading: 'Avec répétition : des tirages indépendants',
      paragraphs: [
        'Lorsque les répétitions sont autorisées, chaque position est tirée indépendamment dans le même intervalle. Obtenir deux fois 7 n’est pas un défaut : chaque nouvelle extraction peut retomber sur une valeur déjà vue. Ce modèle correspond par exemple à plusieurs lancers d’un dé, à des valeurs de test indépendantes ou à des simulations avec remise.',
        'Une courte série peut présenter des doublons, des suites ou un déséquilibre apparent sans que le mécanisme soit biaisé. Le hasard ne promet pas une alternance régulière. Si votre règle exige que chaque numéro apparaisse au plus une fois dans la liste, désactivez explicitement la répétition avant de générer.',
      ],
    },
    {
      heading: 'Sans répétition : un échantillon uniforme de valeurs distinctes',
      paragraphs: [
        'Sans répétition, la quantité ne peut pas dépasser la taille de l’intervalle. Le moteur emploie l’algorithme de Floyd pour choisir un sous-ensemble uniforme sans construire toute la plage en mémoire, puis mélange les valeurs retenues afin que leur ordre ne révèle pas la mécanique de sélection. Chaque entier est présent au maximum une fois.',
        'Cette méthode reste efficace lorsqu’on demande quelques nombres dans un intervalle très large. Elle ne corrige toutefois pas les trous d’une liste externe. Si les numéros 17 et 42 ne correspondent à aucun participant, les inclure dans les bornes peut produire un résultat inutilisable. Préparez une table d’identifiants continue ou tirez directement dans une liste validée.',
      ],
    },
    {
      heading: 'Pourquoi utiliser crypto.getRandomValues',
      paragraphs: [
        'Le widget demande des entiers à `window.crypto.getRandomValues`. La spécification Web Cryptography décrit cette interface comme une source pseudo-aléatoire cryptographiquement forte, alimentée par une entropie de qualité fournie par la plateforme. Si l’API manque, l’outil affiche une erreur au lieu de revenir à `Math.random`.',
        'Cette source réduit la prévisibilité du tirage, mais elle ne transforme pas la page en système de certification. Le navigateur, l’appareil, le code livré, la liste de départ et la manière d’annoncer le résultat restent des éléments du processus. Pour une clé cryptographique, la spécification recommande d’ailleurs les fonctions de génération de clés prévues à cet effet.',
      ],
    },
    {
      heading: 'Échantillonnage par rejet et biais de modulo',
      paragraphs: [
        'Prendre un grand entier aléatoire puis calculer simplement son reste peut favoriser certaines sorties lorsque la taille de l’intervalle ne divise pas exactement l’espace disponible. La page calcule le plus grand multiple exact de la taille demandée, rejette les valeurs situées au-delà et ne conserve qu’une zone répartissable sans reste.',
        'Le rejet est généralement rare et invisible, mais il permet à chaque indice d’avoir la même quantité de valeurs sources. Pour les grands intervalles sûrs, deux mots de 32 bits forment un entier de 53 bits. Cette précision technique concerne la sélection ; elle ne mesure pas l’équité de la liste des personnes ou objets associés aux numéros.',
      ],
    },
    {
      heading: 'Trier la sortie ou préserver le rang',
      paragraphs: [
        'Le tri croissant facilite la lecture d’une grille, la comparaison de deux listes ou la détection visuelle d’un doublon. Il modifie uniquement l’affichage après la sélection. Les mêmes valeurs sont conservées, mais leur position initiale est perdue. Pour un jeu où seule la combinaison compte, ce changement peut être acceptable.',
        'Si les positions ont une signification, conservez la sortie non triée. Un premier nombre peut désigner le gagnant principal, le suivant un suppléant et le troisième une réserve. Notez cette convention avant le clic ; la déduire après avoir vu les résultats ouvre la porte à une interprétation opportuniste.',
      ],
    },
    {
      heading: 'Nombres négatifs, zéro et cas limites',
      paragraphs: [
        'Les bornes négatives sont admises. Un tirage entre −10 et 10 peut servir à tester des écarts, des températures fictives ou des déplacements. Zéro est un entier à part entière et peut sortir lorsque l’intervalle le contient. Vérifiez que le système destinataire n’utilise pas zéro ou une valeur négative comme code réservé.',
        'Une borne identique à l’autre forme un intervalle d’une seule valeur. Avec répétition, cette valeur peut être produite plusieurs fois ; sans répétition, une seule sortie est possible. Une quantité nulle, décimale ou supérieure à 100 000 est refusée afin de rendre l’erreur explicite et de protéger l’onglet.',
      ],
    },
    {
      heading: 'Probabilité de chaque entier et probabilité d’une combinaison',
      paragraphs: [
        'Pour un seul tirage uniforme dans un intervalle de `N` entiers, chaque valeur a une probabilité de `1/N`. Avec répétition, une suite ordonnée de `k` positions a une probabilité de `(1/N)^k`. Sans répétition, le calcul change puisque le nombre de possibilités diminue après chaque valeur.',
        'La probabilité d’une combinaison non ordonnée n’est pas la même que celle d’une séquence ordonnée. Le widget ne calcule pas ces probabilités et ne réalise pas de test statistique. Si vous utilisez la sortie dans une étude, documentez le plan d’échantillonnage, les exclusions, la taille de population et la graine ou le mécanisme reproductible requis par votre protocole.',
      ],
    },
    {
      heading: 'Tirage, échantillon statistique et population réelle',
      paragraphs: [
        'Tirer des indices au hasard peut aider à sélectionner des lignes dans un jeu de données, mais l’échantillon n’est représentatif que si la base couvre correctement la population et si chaque unité éligible est reliée à un indice valable. Un bon générateur ne compense ni non-réponse, ni doublons de personnes, ni population incomplète.',
        'Pour un audit ou une recherche, figez la version de la population avant le tirage, conservez la méthode, les exclusions et la correspondance entre indices et unités. Cette page ne stocke rien et ne publie pas de seed : elle vise les usages immédiats, pas la reproductibilité scientifique ou réglementaire.',
      ],
    },
    {
      heading: 'Jeux, loto et attentes à ne pas confondre',
      paragraphs: [
        'L’outil peut créer des numéros pour un jeu privé, un exercice ou une animation. Il ne connaît pas les règles d’un loto, les numéros bonus, les limites d’une grille, les tirages antérieurs ou les modalités d’un opérateur. Une combinaison aléatoire n’améliore pas la probabilité intrinsèque de gagner.',
        'Pour un concours public ou une attribution de valeur, vérifiez le règlement, l’éligibilité, la juridiction et les preuves à conserver. L’absence de serveur protège la saisie, mais signifie aussi que FunnyTools ne fournit ni horodatage indépendant, ni journal immuable, ni témoin du tirage.',
      ],
    },
    {
      heading: 'Générer des données de test sans créer de faux secrets',
      paragraphs: [
        'Des nombres aléatoires sont pratiques pour tester limites, tris, graphiques et formulaires. Incluez volontairement les bornes, zéro, négatifs et cas répétitifs si ces situations sont valables. Un échantillon purement aléatoire peut manquer précisément le cas extrême que le test devait couvrir ; combinez donc exemples déterministes et données tirées.',
        'N’utilisez pas la sortie comme identifiant unique garanti, mot de passe, jeton de session ou clé. Même avec une bonne source, l’intervalle choisi peut être trop petit et aucun contrôle de collision n’est effectué. Les outils UUID, mot de passe ou fonctions cryptographiques dédiées répondent à des contrats différents.',
      ],
    },
    {
      heading: 'Vérifier une série avant de l’utiliser',
      paragraphs: [
        'Contrôlez les bornes, la quantité, la case de répétition et le tri. Comptez les valeurs produites et, sans répétition, vérifiez leur unicité. Relisez aussi la correspondance externe : un numéro valide mathématiquement peut pointer vers une ligne supprimée, une place inexistante ou un participant non éligible.',
        'Si le résultat doit être partagé, copiez la séquence avec les paramètres et la date dans le document approprié. Une capture seule montre un écran, pas la liste initiale ni les règles. Pour un usage informel, cette trace peut suffire ; pour un processus sensible, utilisez une procédure approuvée et auditable.',
      ],
    },
    {
      heading: 'Confidentialité locale et traces restantes',
      paragraphs: [
        'Les bornes et les résultats restent dans l’onglet ; ils ne sont pas envoyés à FunnyTools. Le presse-papiers, une capture d’écran, un enregistrement de réunion ou l’historique du navigateur peuvent néanmoins révéler la sortie. Fermez ou réinitialisez la page lorsque les identifiants ont une portée interne.',
        'Un numéro peut être une donnée personnelle lorsqu’une table permet de le relier à quelqu’un. Évitez d’afficher simultanément la table complète et le tirage devant un public non autorisé. La minimisation recommandée par la CNIL consiste à ne traiter que les données adéquates, pertinentes et nécessaires à la finalité.',
      ],
    },
    {
      heading: 'Erreurs courantes lors d’un tirage de nombres',
      paragraphs: [
        'Les erreurs fréquentes sont : inverser minimum et maximum, demander plus de valeurs uniques que l’intervalle, trier une séquence dont le rang compte, oublier que les bornes sont inclusives ou interpréter un doublon autorisé comme un bug. Le widget bloque les incohérences numériques, mais pas les règles métier mal choisies.',
        'Autre piège : relancer jusqu’à obtenir une série « plus aléatoire ». Les humains trouvent souvent les motifs et doublons suspects, alors qu’ils sont compatibles avec le hasard. Fixez les paramètres, annoncez le nombre d’essais et acceptez le premier résultat valide, sauf règle de reprise définie à l’avance.',
      ],
    },
    {
      heading: 'Quand préférer une liste, une roue ou un outil spécialisé',
      paragraphs: [
        'Utilisez ce générateur lorsque les candidats portent des identifiants numériques continus ou lorsque la sortie elle-même est un nombre. Pour des prénoms, sujets ou tâches, le tirage de noms évite une table de correspondance. La roue ajoute une visualisation utile devant un groupe, au prix d’une animation plus longue.',
        'Pour une étude reproductible, un jeu réglementé, une sélection à fort enjeu ou une clé de sécurité, choisissez un système qui documente précisément le mécanisme attendu. FunnyTools privilégie une décision locale, immédiate et compréhensible ; il ne prétend pas couvrir les preuves, signatures et contrôles externes.',
      ],
    },
    {
      heading: 'Checklist avant de cliquer sur Générer',
      paragraphs: [
        'Confirmez que les deux bornes correspondent aux valeurs réellement admissibles, que la quantité est correcte et que la répétition reflète le scénario. Désactivez le tri si le rang attribue une priorité. Pour une population externe, figez la liste et résolvez les numéros manquants avant le tirage.',
        'Après génération, comptez les résultats, vérifiez les limites et copiez la sortie avant de modifier un champ. Si une erreur est affichée, corrigez la cause au lieu de contourner le contrôle. Une préparation courte rend le résultat beaucoup plus explicable qu’un clic répété sans règle écrite.',
      ],
    },
  ],
  instructions: [
    'Saisissez le nombre minimum et le nombre maximum ; les deux extrêmes sont inclus.',
    'Indiquez combien d’entiers doivent être produits.',
    'Choisissez si un même nombre peut apparaître plusieurs fois.',
    'Activez le tri uniquement si l’ordre de tirage n’a pas de signification.',
    'Générez, contrôlez la quantité et copiez le résultat avec ses paramètres.',
  ],
  examples: [
    { input: 'Minimum 1, maximum 100, quantité 1', output: 'Un entier de 1 à 100 inclus.' },
    { input: 'Minimum 1, maximum 10, quantité 5, sans répétition', output: 'Cinq entiers distincts ; l’ordre reste aléatoire si le tri est désactivé.' },
    { input: 'Minimum −5, maximum 5, quantité 8, répétition autorisée', output: 'Huit valeurs pouvant inclure zéro, des négatifs et des doublons.' },
    { input: 'Minimum 20, maximum 22, quantité 4, sans répétition', output: 'Erreur : trois valeurs seulement sont disponibles.' },
  ],
  audience: [
    'Enseignants qui créent des numéros d’exercices, des passages ou des exemples.',
    'Organisateurs d’activités informelles avec des tickets numérotés.',
    'Développeurs qui préparent rapidement des entiers pour des tests.',
    'Étudiants qui explorent intervalle, répétition, ordre et échantillonnage.',
  ],
  caseStudies: [
    { title: 'Ordre de présentation', description: 'Douze groupes portent les numéros 1 à 12. La quantité 12 est tirée sans répétition et sans tri ; la séquence devient l’ordre de passage.' },
    { title: 'Échantillon de dossiers', description: 'Dix indices distincts sont tirés dans une table figée de 1 à 500. Les trous et exclusions sont contrôlés avant la sélection.' },
    { title: 'Test de formulaire', description: 'Des valeurs entre −10 et 10 sont générées avec répétition, puis complétées par des cas déterministes aux bornes et hors limites.' },
  ],
  notes: [
    'Minimum et maximum sont inclus dans l’intervalle.',
    'Sans répétition, la quantité doit rester inférieure ou égale au nombre d’entiers disponibles.',
    'Le tri détruit l’ordre initial sans changer les valeurs sélectionnées.',
    'La page ne propose ni seed, ni historique, ni certificat de tirage.',
    'Une valeur aléatoire n’est pas automatiquement un identifiant unique ou un secret.',
  ],
  faq: [
    { q: 'Le maximum peut-il être tiré ?', a: 'Oui. Les deux bornes sont inclusives : entre 1 et 100, 1 comme 100 sont admissibles.' },
    { q: 'Comment générer des nombres sans doublon ?', a: 'Décochez « Autoriser les nombres répétés ». La quantité ne doit pas dépasser la taille de l’intervalle.' },
    { q: 'Le tri change-t-il le tirage ?', a: 'Il ne change pas les valeurs, mais remplace leur ordre de sortie par un ordre croissant. Ne triez pas si le rang compte.' },
    { q: 'Pourquoi un nombre peut-il apparaître plusieurs fois ?', a: 'Lorsque la répétition est activée, chaque position est indépendante. Un doublon est alors un résultat normal.' },
    { q: 'Puis-je reproduire exactement la même série ?', a: 'Non. La page n’accepte pas de seed et ne mémorise pas l’état aléatoire. Copiez la sortie si vous devez la conserver.' },
    { q: 'Est-ce adapté à un tirage officiel ?', a: 'Pas comme procédure complète. La page ne valide pas la population et ne crée ni journal, ni horodatage indépendant, ni preuve immuable.' },
  ],
  labels: {
    min: 'Nombre minimum',
    max: 'Nombre maximum',
    count: 'Quantité',
    allowDuplicates: 'Autoriser les nombres répétés',
    sortResults: 'Trier les résultats du plus petit au plus grand',
    generate: 'Générer des nombres',
    reset: 'Réinitialiser',
    copy: 'Copier le résultat',
    result: 'Nombres générés',
    placeholder: 'Les résultats apparaîtront ici',
    copied: 'Résultat copié',
    integerError: 'Saisissez le minimum, le maximum et la quantité sous forme d’entiers ; la quantité doit être au moins égale à 1.',
    safeRangeError: 'Les bornes et la largeur totale doivent rester dans les entiers sûrs de JavaScript.',
    rangeError: 'Le minimum doit être inférieur ou égal au maximum.',
    duplicateError: 'Sans répétition, la quantité ne peut pas dépasser le nombre d’entiers disponibles.',
    countLimit: 'La quantité maximale par génération est de 100 000.',
    cryptoError: 'Ce navigateur ne fournit pas de source aléatoire sûre ; aucun résultat n’a été généré.',
  },
  sources: [
    { label: 'W3C — Web Cryptography Level 2', href: 'https://www.w3.org/TR/WebCryptoAPI/', note: 'Définition normative de Crypto.getRandomValues et exigences de génération aléatoire.' },
    { label: 'MDN en français — Crypto.getRandomValues', href: 'https://developer.mozilla.org/fr/docs/Web/API/Crypto/getRandomValues', note: 'Syntaxe, compatibilité, limites et distinction avec la génération de clés.' },
    { label: 'CNIL — Minimiser les données collectées', href: 'https://www.cnil.fr/fr/minimiser-les-donnees-collectees', note: 'Principe de données adéquates, pertinentes et limitées à la finalité.' },
  ],
  privacyNote: 'Les paramètres et résultats sont traités dans ce navigateur avec Web Crypto. FunnyTools ne les reçoit pas et ne les conserve pas.',
  disclaimer: 'La page produit des entiers aléatoires, mais ne certifie pas un tirage et ne valide pas la population associée. Pour une décision réglementée ou à fort enjeu, utilisez la procédure autorisée et documentée.',
};

export const frenchRandomNumberPickerReview = {
  heading: 'Vérifier un tirage de nombres',
  intro: 'Une série correcte dépend autant des paramètres et de la population associée que de la source aléatoire.',
  panels: [
    { title: 'Intervalle', text: 'Confirmez les deux bornes inclusives, les éventuels trous et la quantité.' },
    { title: 'Répétition', text: 'Décidez avant le clic si un même entier peut apparaître plusieurs fois.' },
    { title: 'Ordre', text: 'Ne triez pas lorsque la position attribue un rang, un lot ou une priorité.' },
  ],
  checklistHeading: 'Points à contrôler',
  checklist: [
    'Chaque entier admissible correspond à une entrée réelle lorsque la sortie pointe vers une liste.',
    'La quantité tient dans l’intervalle lorsque les doublons sont interdits.',
    'Le tri reflète la règle annoncée et non une décision prise après le tirage.',
    'La sortie et les paramètres sont consignés ailleurs lorsqu’une trace est nécessaire.',
  ],
};

export const frenchRandomNamePicker: ToolContent = {
  name: 'Tirage au sort de noms',
  short: 'Collez une entrée par ligne, tirez une ou plusieurs personnes sans répéter une position et retirez éventuellement les noms sélectionnés.',
  long: 'Le sélecteur accepte des prénoms, pseudonymes, équipes, sujets ou tâches. Il supprime les lignes vides, conserve les doublons saisis et mélange les positions avec `crypto.getRandomValues` et Fisher–Yates. Une même extraction ne choisit pas deux fois la même ligne. La case de retrait décide si les résultats restent disponibles lors des clics suivants. Tout se passe dans l’onglet ; l’animation n’est qu’un affichage et la page ne constitue pas une preuve de concours.',
  seoTitle: 'Tirage au sort de noms en ligne',
  seoDescription: 'Collez une liste de noms et tirez une ou plusieurs entrées au hasard, avec retrait facultatif, Web Crypto et traitement local.',
  keywords: [
    'tirage au sort de noms',
    'tirage au sort prénom',
    'sélecteur aléatoire de noms',
    'choisir un nom au hasard',
    'tirage au sort liste de noms',
    'tirer plusieurs personnes sans doublon',
    'random name picker français',
  ],
  capabilities: [
    'Lire une entrée non vide par ligne et conserver les textes tels qu’ils sont saisis après trim.',
    'Choisir une personne ou plusieurs positions distinctes dans le même tirage.',
    'Retirer automatiquement les lignes gagnantes pour les tours suivants.',
    'Mélanger la liste avec Web Crypto et Fisher–Yates.',
    'Copier le résultat affiché sans envoyer la liste à FunnyTools.',
  ],
  contentSections: [
    {
      heading: 'Réponse rapide : faire un tirage au sort de noms',
      paragraphs: [
        'Collez un prénom, un pseudonyme ou une option par ligne. Pour une seule personne, cliquez sur « Tirer un nom ». Pour plusieurs résultats, indiquez la quantité puis cliquez sur « Tirer plusieurs noms ». La quantité ne peut pas dépasser le nombre de lignes disponibles dans ce tour.',
        'Laissez « Retirer après le tirage » activé si un gagnant ne doit plus participer aux tours suivants. Désactivez-la si chaque nouveau clic doit repartir de la liste complète. Annoncez cette règle avant le premier tirage : la modifier après avoir vu un résultat change les chances futures.',
      ],
    },
    {
      heading: 'Une ligne représente une chance de sélection',
      paragraphs: [
        'Le moteur découpe la zone de texte aux retours à la ligne, retire les espaces au début et à la fin, puis ignore les lignes vides. Chaque ligne restante devient une position. Les virgules, points-virgules et tabulations ne séparent pas automatiquement plusieurs personnes sur la même ligne.',
        'Deux lignes identiques restent deux positions distinctes et doublent le poids du même texte. Cela peut être volontaire, par exemple deux tickets appartenant à la même équipe, ou accidentel à cause d’un copier-coller. Vérifiez les doublons et différenciez les homonymes avant de cliquer.',
      ],
    },
    {
      heading: 'Tirer une personne ou plusieurs sans remplacement',
      paragraphs: [
        'Dans un tirage de plusieurs noms, le mélange attribue un ordre aux positions puis prend les premières. Une position ne peut donc apparaître deux fois dans ce même résultat. Ce comportement correspond à un tirage sans remplacement à l’intérieur d’un clic, même si la case de retrait est désactivée.',
        'La case de retrait agit entre les clics. Activée, elle supprime de la zone les lignes choisies une fois le résultat fixé. Désactivée, les personnes peuvent ressortir au prochain tour. Cette distinction évite de confondre « plusieurs gagnants maintenant » et « plusieurs tours successifs ».',
      ],
    },
    {
      heading: 'Web Crypto et mélange de Fisher–Yates',
      paragraphs: [
        'Le sélecteur utilise `crypto.getRandomValues` pour choisir chaque indice du mélange Fisher–Yates. La permutation échange progressivement les positions de la fin vers le début. Avec une source uniforme et un choix d’indice sans biais, chaque ordre de la liste peut être obtenu avec la même probabilité.',
        'Si Web Crypto est indisponible, aucun nom n’est choisi. La page ne bascule pas vers une source plus faible. Cette précaution améliore la sélection locale, mais ne prouve pas que la liste initiale était complète, que tous les participants étaient éligibles ou qu’aucun clic précédent n’a été ignoré.',
      ],
    },
    {
      heading: 'L’animation ne décide pas du gagnant',
      paragraphs: [
        'Après le clic, la liste est mélangée et le résultat est déjà déterminé. L’interface fait ensuite défiler brièvement des entrées pour rendre l’attente visible, puis affiche les noms retenus. Une personne montrée pendant l’animation n’a pas été presque gagnante et n’influence pas le calcul.',
        'Cette séparation garantit que la vitesse de l’écran, la fréquence d’images ou le moment où l’utilisateur regarde ne choisissent pas la sortie. Pour une vérification accessible, le résultat final est aussi écrit sous forme de texte ; il ne dépend ni d’un son, ni d’une couleur, ni de l’animation seule.',
      ],
    },
    {
      heading: 'Retrait automatique : éviter les gagnants répétés',
      paragraphs: [
        'Avec le retrait activé, chaque occurrence choisie est supprimée une seule fois. Si « Camille » figure deux fois et qu’une occurrence sort, l’autre reste dans la liste. Pour exclure complètement une personne du tour suivant, dédupliquez d’abord la source ou retirez manuellement toutes ses entrées.',
        'Le retrait convient à un ordre de passage, une distribution de tâches ou plusieurs prix exclusifs. Il ne convient pas lorsque chaque manche doit être indépendante. Le bouton de réinitialisation vide la liste ; il ne restaure pas automatiquement sa version d’origine. Gardez une copie autorisée si vous devez recommencer.',
      ],
    },
    {
      heading: 'Homonymes, doublons et identifiants clairs',
      paragraphs: [
        'Deux personnes peuvent porter le même prénom. Utilisez un ajout minimal comme « Alex — groupe bleu » ou un code interne compréhensible par l’organisateur. Évitez de publier nom complet, adresse, courriel, date de naissance ou information de santé lorsque le tirage n’en a pas besoin.',
        'Un doublon accidentel modifie les probabilités ; un homonyme non distingué rend le résultat ambigu. Avant le tirage, comptez les lignes, recherchez les répétitions et vérifiez que chaque libellé permet d’identifier une seule entrée éligible sans révéler plus de données que nécessaire.',
      ],
    },
    {
      heading: 'Confidentialité : pseudonymes et minimisation CNIL',
      paragraphs: [
        'La CNIL rappelle que les données personnelles doivent être adéquates, pertinentes et limitées à ce qui est nécessaire pour la finalité. Un tirage affiché en classe ou en visioconférence peut généralement fonctionner avec un prénom, un numéro ou un pseudonyme plutôt qu’un dossier d’identité complet.',
        'FunnyTools ne reçoit pas la liste, mais les personnes autour de l’écran, les outils de capture, le presse-papiers et les extensions du navigateur peuvent la voir. Utilisez un appareil maîtrisé, limitez les informations collées et effacez la zone après usage lorsque la liste ne doit pas rester exposée.',
      ],
    },
    {
      heading: 'Tirage en classe sans transformer le hasard en sanction',
      paragraphs: [
        'Un tirage peut répartir les prises de parole, sujets ou rôles de façon visible. Il ne garantit pas à lui seul l’équité pédagogique : absences, besoins particuliers, temps de préparation et fréquence passée peuvent nécessiter une règle complémentaire. Le hasard ne doit pas masquer une décision qui demande un jugement professionnel.',
        'Expliquez ce qui est tiré, quand une personne peut être replacée dans la liste et comment une impossibilité est gérée. Pour une participation sensible, proposer une possibilité de report ou utiliser des volontaires peut être plus approprié qu’une sélection automatique.',
      ],
    },
    {
      heading: 'Ordre de passage, tâches et sujets',
      paragraphs: [
        'La liste n’est pas limitée à des personnes. Vous pouvez tirer des équipes, thèmes d’exposé, exercices, repas ou tâches. Pour créer un ordre complet, demandez autant de résultats que de lignes en une seule extraction et gardez l’ordre affiché. Le retrait n’est alors pas nécessaire puisque toutes les positions sortent une fois.',
        'Pour associer personnes et tâches, effectuez deux permutations séparées et assemblez les positions avec une règle annoncée, ou utilisez un outil de répartition dédié. Un seul tirage de textes combinés figerait les associations saisies au lieu de les créer aléatoirement.',
      ],
    },
    {
      heading: 'Gagnants, suppléants et importance du rang',
      paragraphs: [
        'Lorsque plusieurs noms sont tirés, leur ordre peut représenter gagnant principal, deuxième lot et suppléant. Décidez-le avant le clic et copiez la sortie telle quelle. Si tous les gagnants ont le même statut, indiquez que l’ordre est sans effet afin d’éviter une lecture compétitive inutile.',
        'La page affiche les noms séparés par des virgules mais copie le résultat avec un nom par ligne. Conservez le format qui permet de relire la décision. Une simple liste de gagnants ne prouve pas quels participants étaient présents dans la source ni comment les doublons ont été gérés.',
      ],
    },
    {
      heading: 'Concours public : pourquoi cet outil ne suffit pas',
      paragraphs: [
        'Un concours peut imposer un règlement, des critères d’éligibilité, une période, une information des participants, une preuve du consentement, une conservation limitée des données et une procédure de désignation. Ce sélecteur ne vérifie aucun de ces éléments et ne crée pas d’horodatage indépendant.',
        'Pour un lot important ou une décision contestable, utilisez le système et la supervision prévus par l’organisateur. Conservez la version figée de la liste, les exclusions et les règles de reprise. FunnyTools peut aider à une animation informelle, pas remplacer une chaîne de preuve.',
      ],
    },
    {
      heading: 'Pourquoi relancer jusqu’au nom souhaité fausse le processus',
      paragraphs: [
        'Chaque clic valide constitue un tirage. Ignorer une sortie parce qu’elle paraît étrange, parce que la personne est absente ou parce que l’organisateur préfère quelqu’un d’autre introduit une sélection humaine après coup. Prévoyez les cas d’absence et d’inéligibilité avant de commencer.',
        'Si une erreur de liste est découverte, arrêtez, annoncez l’annulation, corrigez la source et recommencez selon une règle documentée. Ne présentez pas le deuxième clic comme le premier. Pour une activité légère, une explication orale suffit souvent ; pour un enjeu réel, il faut une trace adaptée.',
      ],
    },
    {
      heading: 'Vérifier le résultat et la liste restante',
      paragraphs: [
        'Après l’animation, comparez le nombre de résultats à la quantité demandée. Avec retrait activé, vérifiez que chaque occurrence sélectionnée a disparu une fois de la zone. Copiez le résultat avant un nouveau clic, surtout si l’ordre attribue des places différentes.',
        'La liste restante est l’état du prochain tour, pas une archive de l’état initial. Si vous devez expliquer le processus, gardez séparément la source figée et les résultats successifs. Ne stockez pas plus longtemps que nécessaire les informations personnelles utilisées uniquement pour l’animation.',
      ],
    },
    {
      heading: 'Erreurs courantes dans une liste de noms',
      paragraphs: [
        'Les causes principales sont une liste vide, une quantité décimale ou supérieure au nombre d’entrées, des doublons accidentels, plusieurs personnes sur la même ligne et des homonymes impossibles à distinguer. Le widget bloque la quantité invalide, mais il ne sait pas si deux textes représentent la même personne.',
        'Autre erreur : croire que décocher le retrait autorise un doublon dans un même tirage multiple. Ce n’est pas le cas ; les positions restent uniques jusqu’à la fin du clic. La personne redevient simplement disponible au tour suivant.',
      ],
    },
    {
      heading: 'Quand choisir la roue ou le générateur de nombres',
      paragraphs: [
        'Le tirage de noms est le plus direct pour une liste temporaire et un résultat textuel. La roue aléatoire convient lorsqu’un groupe doit voir les options et l’animation. Le générateur de nombres est plus compact si chaque participant possède déjà un identifiant continu.',
        'Choisissez selon la donnée source et la manière d’expliquer le résultat, pas selon l’apparence la plus spectaculaire. Les trois outils utilisent une sélection locale, mais aucun n’établit à lui seul l’éligibilité, la conformité d’un concours ou l’authenticité d’une capture.',
      ],
    },
    {
      heading: 'Checklist avant de tirer les noms',
      paragraphs: [
        'Figez la liste, placez une entrée par ligne, retirez les personnes non éligibles, distinguez les homonymes et vérifiez les doublons. Fixez la quantité, le rôle de l’ordre et la règle de retrait avant de montrer l’écran aux participants.',
        'Après le clic, attendez le texte final, copiez-le et contrôlez la liste restante. Si des données personnelles étaient nécessaires, effacez-les lorsque la finalité est terminée. Si le tirage doit pouvoir être contesté, passez à une procédure qui conserve les preuves attendues.',
      ],
    },
  ],
  instructions: [
    'Collez un prénom, un pseudonyme, une équipe ou une option par ligne.',
    'Vérifiez les doublons et distinguez les homonymes avec un libellé minimal.',
    'Indiquez la quantité si plusieurs entrées doivent sortir en même temps.',
    'Décidez si les résultats doivent être retirés pour les tours suivants.',
    'Lancez le tirage, attendez le résultat final et copiez-le avec son ordre.',
  ],
  examples: [
    { input: 'Lina\nNoé\nMaya\nYanis', output: 'Un clic sur « Tirer un nom » choisit une des quatre positions.' },
    { input: 'Équipe A\nÉquipe B\nÉquipe C\nÉquipe D, quantité 2', output: 'Deux équipes distinctes sont sélectionnées dans le même tirage.' },
    { input: 'Alex — groupe bleu\nAlex — groupe vert', output: 'Les deux homonymes restent identifiables sans afficher leur identité complète.' },
    { input: 'Camille\nCamille\nZoé', output: 'Camille occupe deux positions ; ce poids doit être intentionnel.' },
  ],
  audience: [
    'Enseignants qui tirent un ordre, un sujet ou un rôle devant la classe.',
    'Associations et équipes qui répartissent des tâches informelles.',
    'Animateurs qui sélectionnent des participants avec une liste temporaire.',
    'Familles ou groupes qui veulent choisir une option sans compte ni installation.',
  ],
  caseStudies: [
    { title: 'Ordre de quatre exposés', description: 'Les quatre équipes sont tirées en une seule fois, sans importance de retrait. L’ordre affiché devient l’ordre de passage annoncé.' },
    { title: 'Deux lots distincts', description: 'Deux noms sortent avec retrait activé. Le premier et le deuxième lot sont définis avant le clic et le résultat est copié immédiatement.' },
    { title: 'Participation en classe', description: 'Des codes courts remplacent les noms complets. Les absences sont retirées avant le tirage et la règle de report est expliquée.' },
  ],
  notes: [
    'Une ligne non vide équivaut à une position et donc à une chance.',
    'Les doublons textuels restent des positions séparées.',
    'Une extraction multiple ne répète jamais la même position.',
    'Le retrait agit sur les tours suivants et modifie directement la zone de texte.',
    'L’animation affiche le tirage ; elle ne décide pas du résultat.',
  ],
  faq: [
    { q: 'Comment tirer plusieurs noms sans doublon ?', a: 'Indiquez la quantité et cliquez sur « Tirer plusieurs noms ». Une position ne peut sortir qu’une fois dans ce tirage.' },
    { q: 'À quoi sert « Retirer après le tirage » ?', a: 'Les occurrences gagnantes disparaissent de la liste et ne participent plus aux clics suivants. Désactivez la case pour repartir de la même liste.' },
    { q: 'Pourquoi un prénom apparaît-il deux fois dans la liste ?', a: 'Le widget conserve les doublons saisis. Deux lignes identiques donnent deux positions ; retirez-les si ce poids n’est pas voulu.' },
    { q: 'La liste est-elle envoyée à FunnyTools ?', a: 'Non. Le mélange et l’affichage se font dans cet onglet. Protégez toutefois écran, presse-papiers et captures.' },
    { q: 'Puis-je utiliser des équipes ou des tâches ?', a: 'Oui. Chaque ligne peut contenir n’importe quelle option textuelle courte, pas seulement un nom de personne.' },
    { q: 'Le résultat suffit-il pour un concours officiel ?', a: 'Non. La page ne valide pas les participants et ne conserve ni liste initiale, ni essais, ni horodatage, ni preuve indépendante.' },
  ],
  labels: {
    input: 'Noms ou options, une entrée par ligne',
    placeholder: 'Lina — groupe A\nNoé — groupe B\nMaya — groupe C\nYanis — groupe D',
    pickOne: 'Tirer un nom',
    pickMany: 'Tirer plusieurs noms',
    countLabel: 'Nombre de résultats',
    removePicked: 'Retirer après le tirage',
    reset: 'Réinitialiser',
    result: 'Résultat du tirage',
    emptyResult: 'Les noms tirés apparaîtront ici',
    emptyListError: 'Saisissez au moins un nom ou une option.',
    tooManyError: 'La quantité ne peut pas dépasser le nombre d’entrées disponibles.',
    invalidCountError: 'Saisissez une quantité entière au moins égale à 1.',
    copy: 'Copier le résultat',
    copied: 'Résultat copié',
    spinning: 'Tirage en cours…',
    cryptoError: 'Ce navigateur ne fournit pas de source aléatoire sûre ; aucun tirage n’a été effectué.',
  },
  sources: [
    { label: 'W3C — Web Cryptography Level 2', href: 'https://www.w3.org/TR/WebCryptoAPI/', note: 'Source normative pour les valeurs pseudo-aléatoires cryptographiquement fortes.' },
    { label: 'MDN en français — Crypto.getRandomValues', href: 'https://developer.mozilla.org/fr/docs/Web/API/Crypto/getRandomValues', note: 'Documentation française de l’API utilisée par le mélange.' },
    { label: 'CNIL — Principe de minimisation', href: 'https://www.cnil.fr/fr/definition/minimisation', note: 'Limiter les données personnelles à ce qui est nécessaire au tirage.' },
  ],
  privacyNote: 'Les noms sont mélangés dans ce navigateur et ne sont pas envoyés à FunnyTools. Utilisez des pseudonymes ou codes lorsque l’écran ou le presse-papiers sont partagés.',
  disclaimer: 'Le sélecteur facilite des décisions informelles, mais ne valide pas les participants et ne crée pas de preuve auditable. Vérifiez les règles applicables avant un concours ou une décision importante.',
};

export const frenchRandomNamePickerReview = {
  heading: 'Vérifier un tirage de noms',
  intro: 'L’équité pratique dépend d’une liste correcte, d’une règle annoncée et d’un résultat conservé avec son ordre.',
  panels: [
    { title: 'Liste', text: 'Une ligne égale une position ; distinguez les homonymes et retirez les doublons accidentels.' },
    { title: 'Règle', text: 'Fixez quantité, ordre et retrait avant le premier clic.' },
    { title: 'Données', text: 'Affichez un pseudonyme ou code et gardez les détails dans le système autorisé.' },
  ],
  checklistHeading: 'Points à contrôler',
  checklist: [
    'La liste est figée, complète et limitée aux entrées éligibles.',
    'Chaque doublon est volontaire et chaque homonyme peut être reconnu.',
    'Le retrait correspond bien à la règle des tours suivants.',
    'Le résultat final est copié avant toute modification de la liste.',
  ],
};

export const frenchRandomWheel: ToolContent = {
  name: 'Roue aléatoire de noms et d’options',
  short: 'Créez une roue avec une option par ligne, lancez une sélection locale puis lisez le résultat final sous le cercle.',
  long: 'Chaque ligne non vide occupe un secteur de même taille. Avant l’animation, la roue choisit un indice avec `crypto.getRandomValues` et un rejet anti-biais ; la rotation visuelle s’arrête ensuite sur ce secteur. Une ligne répétée crée plusieurs secteurs et augmente volontairement le poids du même texte. La page ne retire pas automatiquement le gagnant, ne conserve aucun historique et ne fournit ni pondérations décimales, ni preuve certifiée.',
  seoTitle: 'Roue aléatoire en ligne de noms',
  seoDescription: 'Créez une roue aléatoire avec une option par ligne, faites-la tourner et obtenez un résultat local avec chances égales par secteur.',
  keywords: [
    'roue aléatoire',
    'roue de la chance en ligne',
    'roue aléatoire de noms',
    'faire tourner une roue',
    'roue tirage au sort',
    'roue des prénoms',
    'sélecteur aléatoire visuel',
  ],
  capabilities: [
    'Créer un secteur de même taille pour chaque ligne non vide.',
    'Afficher des noms, sujets, tâches ou autres options textuelles.',
    'Choisir le secteur avec Web Crypto avant de lancer l’animation.',
    'Mettre en évidence le gagnant et afficher le même résultat en texte.',
    'Copier le résultat sans transmettre les options à FunnyTools.',
  ],
  contentSections: [
    {
      heading: 'Réponse rapide : créer et faire tourner une roue aléatoire',
      paragraphs: [
        'Remplacez l’exemple par une option par ligne, puis cliquez sur « Faire tourner la roue ». Attendez la fin de l’animation : le secteur gagnant est mis en évidence et son texte apparaît sous le cercle. Le bouton de copie reprend ce résultat final.',
        'Chaque ligne non vide crée un secteur de même taille. Pour quatre options différentes, chacune représente donc un quart de la roue. Vérifiez les doublons avant de lancer : répéter un texte lui attribue plusieurs secteurs et augmente sa probabilité.',
      ],
    },
    {
      heading: 'Une option par ligne, un secteur par option',
      paragraphs: [
        'Les retours à la ligne définissent les secteurs. Les lignes vides sont ignorées et les espaces extérieurs retirés. Une virgule ne crée pas deux choix : « rouge, bleu » sur une seule ligne reste une seule option. Placez « rouge » et « bleu » sur deux lignes si elles doivent avoir des chances séparées.',
        'La roue accepte autant de lignes que le navigateur peut dessiner, mais une grande quantité rend les textes minuscules et les secteurs difficiles à distinguer. Pour des dizaines ou centaines de candidats, le tirage de noms textuel est généralement plus lisible et plus facile à vérifier.',
      ],
    },
    {
      heading: 'Chances égales et doublons qui créent des poids',
      paragraphs: [
        'Avec `N` lignes, chaque position possède une probabilité de `1/N`. Deux lignes identiques correspondent à deux positions : le même texte reçoit alors `2/N`. Cette pondération entière peut être volontaire, mais elle doit être annoncée et visible dans la liste.',
        'La page ne propose pas de champ « 35 % » ou « poids 1,5 ». Répéter des lignes permet seulement des rapports entiers et encombre le dessin. Pour une pondération précise ou des contraintes conditionnelles, utilisez un outil qui affiche, valide et additionne explicitement les probabilités.',
      ],
    },
    {
      heading: 'Le gagnant est choisi avant l’animation',
      paragraphs: [
        'Au clic, le moteur choisit d’abord l’indice gagnant avec Web Crypto. Il calcule ensuite une rotation d’au moins cinq tours qui place le centre de ce secteur sous le pointeur. L’accélération visuelle ralentit avec une fonction d’animation ; elle ne modifie pas l’indice.',
        'La durée, le nombre d’images par seconde et la vitesse de l’appareil ne déterminent donc pas le gagnant. L’animation rend le processus facile à suivre devant un groupe, mais ne constitue pas un enregistrement du tirage. Le texte final est la référence accessible.',
      ],
    },
    {
      heading: 'Web Crypto et rejet du biais de modulo',
      paragraphs: [
        'La roue demande un entier de 32 bits à `crypto.getRandomValues`. Pour éviter qu’un reste de division favorise les premiers secteurs, elle rejette les valeurs situées au-delà du plus grand multiple exact du nombre de secteurs. Chaque indice dispose ainsi du même nombre de valeurs sources.',
        'Si la source aléatoire sûre n’est pas disponible, la roue affiche une erreur et ne tourne pas vers un faux résultat. La spécification W3C demande aux navigateurs une source pseudo-aléatoire cryptographiquement forte, mais ne transforme pas l’interface en mécanisme d’audit ou de certification.',
      ],
    },
    {
      heading: 'Pourquoi le pointeur et le texte final doivent correspondre',
      paragraphs: [
        'La rotation cible le centre géométrique du secteur choisi, puis ce secteur est coloré différemment à la fin. Le texte sous la roue reprend directement la même entrée. Cette redondance permet de vérifier le résultat même si une étiquette est tronquée sur le canvas.',
        'Sur le cercle, seules les dix-huit premières unités de texte sont dessinées afin de préserver la lisibilité. Deux options commençant de façon identique peuvent donc sembler égales visuellement. Donnez-leur un préfixe distinct ou fiez-vous au résultat textuel complet.',
      ],
    },
    {
      heading: 'Faire une roue des prénoms en classe',
      paragraphs: [
        'Une roue de prénoms peut choisir un ordre, une question ou un rôle de manière visible. Utilisez uniquement les élèves présents et préférez un prénom, un code ou un pseudonyme suffisant. Ne collez pas d’information sensible sur un écran projeté.',
        'Le hasard n’est pas toujours la bonne règle pédagogique. Une adaptation, un volontariat ou une rotation planifiée peut être nécessaire. Expliquez ce qui se passe si la personne tirée est absente, a déjà participé ou ne peut pas accomplir la tâche.',
      ],
    },
    {
      heading: 'Sujets, tâches, repas et décisions quotidiennes',
      paragraphs: [
        'Les secteurs peuvent contenir autre chose que des noms : sujets d’exposé, tâches ménagères, activités, menus ou destinations. La roue aide surtout lorsque toutes les options sont acceptables et que le groupe veut visualiser une décision aléatoire.',
        'Retirez avant le tirage les choix impossibles, dangereux, trop coûteux ou incompatibles avec une contrainte. Le hasard ne vérifie pas le budget, les allergies, la disponibilité, la météo ou le consentement. Il départage des options déjà validées.',
      ],
    },
    {
      heading: 'Le gagnant reste présent au tour suivant',
      paragraphs: [
        'La roue ne supprime aucune ligne automatiquement. Après un résultat, un nouveau clic repart de la même liste et le gagnant peut ressortir. Pour un tirage sans remplacement, retirez manuellement la ligne avant le tour suivant ou utilisez le sélecteur de noms avec retrait automatique.',
        'Annoncez la règle avant le premier tour. Conserver le gagnant correspond à des manches indépendantes ; le retirer distribue les chances entre les options restantes. Ces deux scénarios sont valables, mais ils ne répondent pas au même objectif.',
      ],
    },
    {
      heading: 'Une seule option, liste vide et erreurs visibles',
      paragraphs: [
        'Avec une seule ligne, il n’existe aucune incertitude : cette option est affichée comme résultat et un message le signale. Avec une liste vide, la roue reste dans son état d’attente et demande au moins une option. Aucun pseudo-tirage n’est fabriqué.',
        'Si Web Crypto échoue, le résultat précédent n’est pas présenté comme nouveau gagnant. Corrigez l’environnement ou changez de navigateur. Le bouton de réinitialisation restaure les quatre options d’exemple, ce qui permet de vérifier rapidement le dessin avant de saisir la vraie liste.',
      ],
    },
    {
      heading: 'Roue de la chance, concours et obligations externes',
      paragraphs: [
        'L’expression « roue de la chance » peut désigner une animation commerciale avec lots, probabilités, règlement et collecte de contacts. Cette page ne gère ni inscription, ni stock de lots, ni probabilité cumulative, ni limitation par personne, ni consentement marketing.',
        'Pour un concours public, vérifiez la réglementation applicable, le règlement annoncé, l’éligibilité et les preuves à conserver. Une animation locale sans historique ne suffit pas lorsqu’un résultat doit être contrôlé par un tiers ou contesté.',
      ],
    },
    {
      heading: 'Protection des noms affichés et principe de minimisation',
      paragraphs: [
        'La liste ne quitte pas le navigateur, mais elle est visible à l’écran et peut apparaître dans une capture ou un partage de réunion. La CNIL recommande de limiter les données à ce qui est nécessaire. Un code court ou un prénom peut suffire là où un nom complet et une adresse seraient excessifs.',
        'Après le tirage, remplacez ou réinitialisez la liste si l’appareil est partagé. Le presse-papiers conserve potentiellement le résultat au-delà de la page. La confidentialité locale réduit la transmission à FunnyTools ; elle ne neutralise pas les autres logiciels et personnes ayant accès au terminal.',
      ],
    },
    {
      heading: 'Accessibilité et alternatives au canvas',
      paragraphs: [
        'Le cercle est un canvas avec une étiquette accessible, mais l’information essentielle est répétée dans la zone de résultat en texte. Les erreurs sont annoncées dans une région dédiée. Un utilisateur qui ne distingue pas les couleurs peut donc lire le gagnant sans identifier le secteur surligné.',
        'Pour une réunion, annoncez aussi oralement le résultat et évitez de dépendre du son ou de la couleur seule. Les libellés courts améliorent la lecture mobile. Si toutes les options doivent être consultables avec les technologies d’assistance, gardez la liste dans la zone de texte plutôt que dans l’image uniquement.',
      ],
    },
    {
      heading: 'Mobile, projection et libellés lisibles',
      paragraphs: [
        'Le canvas conserve un rapport carré et réduit sa largeur sur petit écran. Les secteurs restent proportionnels, mais un texte long est tronqué dans le dessin. Utilisez des libellés distinctifs de quelques mots, puis lisez le résultat complet sous la roue.',
        'Sur vidéoprojecteur, augmentez le zoom du navigateur si nécessaire et vérifiez le contraste avant l’activité. Une roue à huit secteurs reste généralement plus lisible qu’une roue à quarante. Pour une grande liste, préférez une sortie textuelle ou divisez le processus en étapes clairement annoncées.',
      ],
    },
    {
      heading: 'Erreurs courantes avec une roue aléatoire',
      paragraphs: [
        'Les erreurs fréquentes sont les lignes dupliquées sans intention, plusieurs choix sur une même ligne, des options quasi identiques, un gagnant laissé par oubli au tour suivant et une relance jusqu’à obtenir une sortie préférée. Le widget ne peut pas deviner la règle métier.',
        'Une autre erreur consiste à croire que le secteur qui passe lentement sous le pointeur avait plus de chances. Le gagnant était déjà fixé avant l’animation. Ne jugez pas la qualité du hasard à la trajectoire visuelle ; vérifiez la liste, les secteurs et la règle de reprise.',
      ],
    },
    {
      heading: 'Quand préférer le tirage de noms ou de nombres',
      paragraphs: [
        'La roue convient à un petit nombre d’options lorsque la visualisation participe à l’activité. Le tirage de noms est plus rapide pour sélectionner plusieurs personnes, retirer automatiquement les gagnants et lire de longues entrées. Le générateur de nombres convient à des tickets ou positions numériques.',
        'Aucun de ces formats ne rend le résultat officiel. Choisissez l’interface qui réduit les erreurs de saisie et rend la règle compréhensible, puis ajoutez la documentation externe nécessaire selon l’enjeu.',
      ],
    },
    {
      heading: 'Checklist avant de faire tourner la roue',
      paragraphs: [
        'Placez exactement une option par ligne, retirez les lignes vides inutiles, recherchez les doublons et raccourcissez les libellés ambigus. Confirmez que toutes les options sont réellement admissibles et que chaque secteur doit avoir le même poids.',
        'Décidez si le gagnant participera au tour suivant et comment gérer une impossibilité. Après la rotation, lisez le texte final, copiez-le si nécessaire et ne relancez pas sans appliquer la règle annoncée. Pour un enjeu important, utilisez un dispositif qui conserve les preuves requises.',
      ],
    },
  ],
  instructions: [
    'Saisissez une option courte par ligne dans la zone de texte.',
    'Vérifiez que les doublons et donc les poids supplémentaires sont intentionnels.',
    'Décidez avant le clic si le gagnant restera dans les tours suivants.',
    'Faites tourner la roue et attendez la fin complète de l’animation.',
    'Lisez le résultat textuel sous le cercle et copiez-le si une trace est utile.',
  ],
  examples: [
    { input: 'Rouge\nBleu\nVert\nJaune', output: 'Quatre secteurs égaux ; chaque couleur a une chance sur quatre.' },
    { input: 'Sujet A\nSujet B\nSujet C', output: 'La roue choisit un sujet puis affiche le libellé final sous le canvas.' },
    { input: 'Équipe bleue\nÉquipe bleue\nÉquipe orange', output: 'Le texte « Équipe bleue » occupe deux secteurs sur trois.' },
    { input: 'Une seule option', output: 'Cette option est le résultat et un avertissement explique l’absence de choix.' },
  ],
  audience: [
    'Enseignants et animateurs qui veulent rendre un choix visible devant un groupe.',
    'Équipes qui répartissent sujets, rôles ou tâches déjà validés.',
    'Familles et amis qui départagent des activités quotidiennes.',
    'Créateurs qui ont besoin d’une roue simple sans compte ni collecte de contacts.',
  ],
  caseStudies: [
    { title: 'Quatre sujets d’exposé', description: 'Chaque sujet apparaît une fois. La classe voit les secteurs égaux et le texte final confirme le thème retenu.' },
    { title: 'Tour de jeu indépendant', description: 'Les joueurs restent dans la liste après chaque manche. La règle autorise donc la même personne à ressortir au tour suivant.' },
    { title: 'Distribution sans remplacement', description: 'Après chaque rotation, l’organisateur copie le résultat puis retire manuellement la ligne avant le tour suivant.' },
  ],
  notes: [
    'Chaque ligne non vide crée exactement un secteur.',
    'Les doublons augmentent le poids du même texte.',
    'Le gagnant est choisi avant l’animation avec Web Crypto.',
    'Le résultat n’est pas retiré automatiquement.',
    'La page ne conserve ni historique, ni seed, ni preuve de tirage.',
  ],
  faq: [
    { q: 'Chaque option a-t-elle la même chance ?', a: 'Oui, chaque ligne crée un secteur égal. Un texte répété sur plusieurs lignes possède cependant plusieurs secteurs.' },
    { q: 'La vitesse de rotation choisit-elle le gagnant ?', a: 'Non. L’indice est tiré avant l’animation ; la rotation sert à rejoindre visuellement le secteur déjà choisi.' },
    { q: 'Comment empêcher un gagnant de ressortir ?', a: 'Supprimez sa ligne avant le tour suivant ou utilisez le tirage de noms avec retrait automatique.' },
    { q: 'Puis-je mettre plusieurs choix sur une ligne ?', a: 'La ligne entière serait une seule option. Utilisez un retour à la ligne pour créer un secteur distinct.' },
    { q: 'Les options sont-elles envoyées au serveur ?', a: 'Non. Le dessin, la sélection et le résultat restent dans cet onglet. Protégez néanmoins l’écran et le presse-papiers.' },
    { q: 'Cette roue convient-elle à un concours officiel ?', a: 'Pas comme procédure complète. Elle ne gère ni éligibilité, ni règlement, ni tentatives, ni horodatage, ni preuve indépendante.' },
  ],
  labels: {
    input: 'Options, une entrée par ligne',
    placeholder: 'Sujet A\nSujet B\nSujet C\nSujet D',
    spin: 'Faire tourner la roue',
    copy: 'Copier le résultat',
    clear: 'Réinitialiser l’exemple',
    result: 'Option sélectionnée',
    waiting: 'Roue prête',
    emptyError: 'Saisissez au moins une option.',
    copied: 'Résultat copié',
    oneOption: 'Une seule option est disponible ; elle devient le résultat.',
    cryptoError: 'Ce navigateur ne fournit pas de source aléatoire sûre ; la roue n’a choisi aucun résultat.',
  },
  sources: [
    { label: 'W3C — Web Cryptography Level 2', href: 'https://www.w3.org/TR/WebCryptoAPI/', note: 'Définition normative de la source aléatoire utilisée avant l’animation.' },
    { label: 'MDN en français — Crypto.getRandomValues', href: 'https://developer.mozilla.org/fr/docs/Web/API/Crypto/getRandomValues', note: 'Documentation française de l’API et de ses garanties.' },
    { label: 'CNIL — Minimiser les données collectées', href: 'https://www.cnil.fr/fr/minimiser-les-donnees-collectees', note: 'Réduire les noms et autres données affichées au strict nécessaire.' },
  ],
  privacyNote: 'Les options et le résultat restent dans ce navigateur et ne sont pas envoyés à FunnyTools. Protégez l’écran et le presse-papiers si la liste contient des identifiants personnels.',
  disclaimer: 'La roue aide aux décisions quotidiennes et animations. Elle ne consigne ni ne certifie le tirage et ne remplace pas les contrôles d’éligibilité, de règlement ou d’audit.',
};

export const frenchRandomWheelReview = {
  heading: 'Vérifier une roue aléatoire',
  intro: 'La vérification porte sur les secteurs, les doublons, la règle des tours suivants et le niveau de preuve attendu.',
  panels: [
    { title: 'Secteurs', text: 'Chaque ligne forme une position égale ; les répétitions augmentent le poids.' },
    { title: 'Résultat', text: 'La sélection précède l’animation et le texte final confirme le secteur.' },
    { title: 'Tour suivant', text: 'Le gagnant reste dans la liste tant que vous ne retirez pas sa ligne.' },
  ],
  checklistHeading: 'Points à contrôler',
  checklist: [
    'Chaque alternative apparaît exactement le nombre de fois prévu.',
    'Les libellés restent distincts malgré la troncature visuelle sur la roue.',
    'La règle de retrait ou de maintien est fixée avant le premier tour.',
    'Une procédure externe conserve les preuves lorsque l’enjeu l’exige.',
  ],
};
