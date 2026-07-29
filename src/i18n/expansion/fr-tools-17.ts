import type { ToolContent } from '../tools/_types';

export const frenchRandomGroupGenerator: ToolContent = {
  name: 'Générateur de groupes aléatoires',
  short: 'Répartissez une liste en équipes tirées au hasard, avec des effectifs qui diffèrent au maximum d’une personne.',
  long: 'Collez une entrée par ligne, choisissez le nombre de groupes, puis obtenez une répartition locale fondée sur `crypto.getRandomValues`, un mélange de Fisher–Yates et une distribution circulaire. Le résultat équilibre uniquement les effectifs : il ne connaît ni les compétences, ni les besoins, ni les contraintes relationnelles. Vous pouvez copier tous les groupes ou exporter un CSV protégé contre les cellules interprétées comme formules.',
  seoTitle: 'Générateur de groupes aléatoires et équipes',
  seoDescription: 'Créez des groupes aléatoires aux effectifs proches. Une personne par ligne, nombre d’équipes au choix, copie et export CSV dans le navigateur.',
  keywords: [
    'générateur de groupes aléatoires',
    'faire des groupes au hasard',
    'créer des équipes aléatoires',
    'répartir des élèves en groupes',
    'générateur d’équipes en ligne',
    'tirage au sort des groupes',
    'groupes aléatoires classe',
  ],
  capabilities: [
    'Lire chaque ligne non vide comme une entrée indépendante.',
    'Mélanger la liste avec Web Crypto et Fisher–Yates.',
    'Créer de 1 groupe jusqu’au nombre total de participants.',
    'Limiter l’écart d’effectif à une personne entre les groupes.',
    'Copier la répartition ou télécharger un CSV groupe–membre.',
  ],
  contentSections: [
    {
      heading: 'Réponse rapide : faire des groupes au hasard',
      paragraphs: [
        'Collez la liste avec une personne par ligne, indiquez le nombre de groupes souhaité et cliquez sur « Générer les groupes ». Le champ attend un nombre d’équipes, pas un effectif par équipe. Avec 23 personnes et 5 groupes, trois groupes auront 5 membres et deux en auront 4. Chaque entrée apparaît une fois dans la répartition produite.',
        'Relisez la composition avant de l’afficher. « Copier tous les groupes » donne un texte prêt pour une messagerie ou une diapositive. « Exporter en CSV » crée une ligne par membre avec son groupe. La page ne conserve aucun historique : sauvegardez la version retenue avant de fermer ou de relancer.',
      ],
    },
    {
      heading: 'Des effectifs équilibrés, pas des profils équilibrés',
      paragraphs: [
        'Ici, « équilibré » signifie uniquement que le groupe le plus grand compte au maximum une personne de plus que le plus petit. La liste est mélangée, puis les entrées sont distribuées à tour de rôle dans le groupe 1, le groupe 2 et ainsi de suite. Cette règle est simple, visible et facile à contrôler.',
        'L’outil ne sait rien du niveau scolaire, des compétences, des rôles, de la langue, de l’accessibilité, du genre ou des relations entre participants. Deux équipes de même taille peuvent donc être très différentes dans la pratique. Si le contexte exige une composition par besoins ou compétences, utilisez le tirage comme brouillon et appliquez ensuite des critères explicites.',
      ],
    },
    {
      heading: 'Une entrée par ligne et le traitement des doublons',
      paragraphs: [
        'Les espaces placés avant ou après un libellé sont retirés et les lignes vides sont ignorées. Deux lignes identiques restent deux places distinctes. Cela peut correspondre à deux homonymes, à une duplication accidentelle ou à une pondération involontaire. Vérifiez la liste avant le clic, car le navigateur ne peut pas deviner votre intention.',
        'Pour distinguer deux personnes portant le même prénom, ajoutez un identifiant court et pertinent, par exemple `Camille · 4B` ou `Alex · table 6`. Évitez l’adresse électronique, le téléphone, la date de naissance ou toute information sensible lorsqu’un prénom et une initiale suffisent.',
      ],
    },
    {
      heading: 'Comment Fisher–Yates mélange la liste',
      paragraphs: [
        'Le moteur copie la liste puis parcourt ses positions depuis la fin. À chaque étape, il échange l’entrée courante avec une position choisie dans la partie encore disponible : c’est le mélange de Fisher–Yates. Cette méthode évite les tris improvisés dont certaines permutations recevraient davantage de chances que d’autres.',
        'L’indice d’échange vient de `crypto.getRandomValues`. Un échantillonnage par rejet écarte la petite zone qui provoquerait un biais de modulo. Si Web Crypto manque, aucun groupe n’est produit et un message l’indique ; l’outil ne remplace pas silencieusement cette source par `Math.random`.',
      ],
      link: {
        prefix: 'La source aléatoire du navigateur est décrite dans ',
        label: 'la documentation française de Crypto.getRandomValues',
        href: 'https://developer.mozilla.org/fr/docs/Web/API/Crypto/getRandomValues',
        suffix: '.',
      },
    },
    {
      heading: 'Préparer une liste de classe sans données superflues',
      paragraphs: [
        'Pour des groupes aléatoires en classe, partez des personnes réellement présentes. Retirez les absences, ajoutez les arrivées tardives et décidez comment gérer une adaptation ou une contrainte connue. La CNIL recommande de limiter une liste scolaire aux informations strictement nécessaires ; un prénom accompagné d’une initiale suffit souvent.',
        'Le traitement local empêche FunnyTools de recevoir la liste, mais il ne protège pas contre les personnes qui voient l’écran, une capture, le presse-papiers ou le fichier téléchargé. Si la répartition est projetée, privilégiez des prénoms, numéros de table ou codes compris du groupe plutôt qu’une liste administrative complète.',
      ],
      link: {
        prefix: 'Pour les listes scolaires, consultez ',
        label: 'les bonnes pratiques de la CNIL',
        href: 'https://cnil.fr/fr/rentree-scolaire-et-affichage-des-listes-des-classes-quelles-sont-les-bonnes-pratiques',
        suffix: '.',
      },
    },
    {
      heading: 'Groupes aléatoires et groupes de besoins',
      paragraphs: [
        'Un tirage au sort convient à des activités temporaires où toutes les répartitions sont acceptables : débat, lecture, atelier, jeu ou rotation. Il n’équivaut pas à un groupe de besoins. Le ministère de l’Éducation nationale décrit ces derniers comme fondés sur l’analyse des acquis et réexaminés au fil de la progression.',
        'Ne présentez donc pas une répartition aléatoire comme une évaluation pédagogique. Pour une séquence qui exige des profils complémentaires, constituez les groupes selon l’objectif de formation ou corrigez la sortie en expliquant les critères. Le hasard peut renouveler les interactions, mais ne remplace pas l’expertise de l’équipe éducative.',
      ],
      link: {
        prefix: 'La distinction avec les groupes de besoins apparaît dans ',
        label: 'les indications du ministère',
        href: 'https://www.education.gouv.fr/le-college-4940',
        suffix: '.',
      },
    },
    {
      heading: 'Choisir le bon nombre d’équipes',
      paragraphs: [
        'Le nombre de groupes doit être compris entre 1 et le nombre d’entrées. Avant de le saisir, vérifiez les tables, le matériel, la durée et le nombre de rôles disponibles. Avec 30 personnes, 6 groupes donnent exactement 5 membres ; 8 groupes donnent six groupes de 4 et deux de 3.',
        'Si votre consigne porte plutôt sur « quatre personnes par équipe », calculez d’abord le nombre de groupes approché, puis vérifiez la répartition. Cette version ne propose pas un mode par taille cible. Lorsque le reste est inévitable, décidez si les groupes les plus nombreux disposent de matériel ou de tâches adaptés.',
      ],
    },
    {
      heading: 'Réviser la sortie sans cacher les ajustements',
      paragraphs: [
        'Copiez d’abord la répartition brute. Examinez ensuite les contraintes que le navigateur ne connaît pas : accessibilité, sécurité, conflit d’intérêt, langue de travail, rôle indispensable ou consentement. Un échange entre deux membres peut préserver les effectifs tout en rendant l’activité viable.',
        'Après modification, le résultat final n’est plus entièrement aléatoire. Ce n’est pas un problème si la raison est assumée. Indiquer « tirage initial puis deux échanges pour le matériel et l’accompagnement » est plus transparent que de relancer jusqu’à obtenir une composition qui semble convenir sans documenter les essais écartés.',
      ],
    },
    {
      heading: 'Exporter un CSV lisible et plus sûr',
      paragraphs: [
        'Le CSV comporte deux colonnes, `Groupe` et `Membre`, et une marque UTF-8 pour conserver correctement les accents. Les virgules, guillemets et retours à la ligne sont protégés selon le format CSV. Le fichier peut ensuite recevoir une table, un rôle ou une heure dans un tableur.',
        'Un texte commençant par `=`, `+`, `-` ou `@` peut être interprété comme une formule par certains tableurs. L’export ajoute donc une apostrophe à ces valeurs. Cette protection réduit un risque à l’ouverture, mais ne dispense pas de vérifier le fichier avant de l’importer dans un système sensible.',
      ],
    },
    {
      heading: 'Équité du procédé et équité de la situation',
      paragraphs: [
        'Le mélange vise à donner à chaque entrée la même place dans le mécanisme. Il ne garantit pas que la liste initiale soit complète, que chaque personne ait consenti, que les tâches soient comparables ou que les conséquences soient équitables. Une bonne randomisation ne corrige pas une règle de départ injuste.',
        'Fixez la liste et le nombre de groupes avant le tirage. Évitez les relances opportunistes et annoncez les motifs légitimes de reprise, comme une entrée manquante. Pour un événement avec enjeu, conservez la version initiale, les paramètres et les ajustements ; cette page ne fournit ni seed publique, ni horodatage, ni journal immuable.',
      ],
    },
    {
      heading: 'Cas où le hasard n’est pas le bon choix',
      paragraphs: [
        'N’utilisez pas une équipe aléatoire lorsqu’il faut attribuer une responsabilité légale, une tâche dangereuse, un accompagnement médical ou une mesure disciplinaire. Ces décisions demandent des compétences, un cadre, des informations pertinentes et parfois l’accord des personnes concernées.',
        'Pour un tournoi avec têtes de série, des horaires de disponibilité, des quotas ou plusieurs contraintes simultanées, choisissez un système qui modélise ces règles. Le générateur est adapté à une première répartition d’alternatives équivalentes, pas à une optimisation multicritère.',
      ],
    },
    {
      heading: 'Confidentialité locale et traces à effacer',
      paragraphs: [
        'La liste, le mélange et l’affichage restent dans l’onglet ; FunnyTools ne reçoit pas les noms. En revanche, le presse-papiers peut être synchronisé et le CSV reste dans le dossier de téléchargement. Un écran partagé ou une vidéoconférence peut aussi exposer le contenu.',
        'Utilisez le minimum d’information nécessaire, fermez la page après usage et supprimez les exports temporaires selon les règles de votre établissement ou organisation. Si la composition doit être conservée, déplacez uniquement la version finale vers l’espace autorisé au lieu de garder plusieurs brouillons contenant les mêmes personnes.',
      ],
    },
    {
      heading: 'Checklist avant d’annoncer les groupes',
      paragraphs: [
        'Confirmez la présence de chaque personne, les doublons, les homonymes et le nombre d’équipes. Vérifiez ensuite que chaque entrée apparaît exactement une fois, que l’écart d’effectif ne dépasse pas une personne et que la salle comme le matériel peuvent accueillir la configuration.',
        'Relisez enfin les contraintes humaines, notez chaque ajustement et sauvegardez la version qui sera réellement utilisée. Si une personne ne doit pas être identifiable publiquement, remplacez son nom par le code convenu avant la projection ou le partage.',
      ],
    },
  ],
  instructions: [
    'Préparez la liste définitive et placez une entrée par ligne.',
    'Distinguez les homonymes avec un identifiant court et retirez les doublons accidentels.',
    'Saisissez un nombre de groupes compris entre 1 et le nombre d’entrées.',
    'Générez, puis contrôlez les effectifs et les contraintes externes.',
    'Copiez ou exportez la version retenue et documentez les ajustements.',
  ],
  examples: [
    'Répartir 28 élèves présents sur 7 tables de laboratoire.',
    'Créer 5 équipes de débat à partir de 23 participants.',
    'Former des groupes de lecture temporaires avec des codes courts.',
    'Exporter la répartition pour ajouter table, rôle et matériel.',
  ],
  audience: [
    'Enseignants qui préparent des groupes de classe temporaires.',
    'Animateurs de formations, ateliers, jeux et événements.',
    'Équipes qui veulent un premier partage avant révision humaine.',
    'Associations qui organisent des activités à alternatives équivalentes.',
  ],
  caseStudies: [
    { title: 'Atelier scientifique', description: 'Vingt-quatre élèves sont répartis en six groupes ; l’enseignante vérifie ensuite la présence d’une personne formée au matériel dans chaque équipe.' },
    { title: 'Absence de dernière minute', description: 'L’animateur retire l’entrée absente, régénère une seule fois et conserve le CSV de la liste réellement utilisée.' },
    { title: 'Deux prénoms identiques', description: 'Une initiale de nom distingue les homonymes sans exposer d’adresse ou de donnée administrative.' },
  ],
  notes: [
    'Le champ demande le nombre de groupes, pas le nombre de personnes par groupe.',
    'L’équilibre porte sur les effectifs uniquement.',
    'Deux lignes identiques comptent comme deux entrées.',
    'Le CSV neutralise les débuts de cellules qui ressemblent à des formules.',
    'Aucune seed, contrainte, archive ou certification n’est créée.',
  ],
  faq: [
    { q: 'Comment créer des groupes aléatoires équilibrés ?', a: 'La liste est mélangée puis distribuée à tour de rôle. Les effectifs diffèrent ainsi au maximum d’une personne.' },
    { q: 'Puis-je choisir le nombre de personnes par groupe ?', a: 'Pas directement. Indiquez le nombre d’équipes, puis vérifiez les tailles obtenues selon le nombre total de participants.' },
    { q: 'L’outil équilibre-t-il les niveaux et compétences ?', a: 'Non. Il équilibre seulement les quantités. Les besoins, rôles, langues et contraintes doivent être examinés séparément.' },
    { q: 'Que se passe-t-il avec deux noms identiques ?', a: 'Chaque ligne reste une entrée. Ajoutez une initiale ou un code pour distinguer les homonymes et retirez les doublons accidentels.' },
    { q: 'Les noms sont-ils envoyés à FunnyTools ?', a: 'Non. La liste est traitée dans l’onglet. Le presse-papiers, l’écran et le CSV restent néanmoins des traces à protéger.' },
    { q: 'Peut-on reproduire exactement les mêmes groupes ?', a: 'Non. Il n’existe ni seed ni historique. Copiez le texte ou gardez le CSV si vous devez réutiliser la répartition.' },
  ],
  labels: {
    input: 'Liste, une entrée par ligne',
    placeholder: 'Camille · 4A\nNoé · 4A\nLina · 4B\nYanis · 4B\nMaya · 4C\nLouis · 4C',
    groupCount: 'Nombre de groupes',
    generate: 'Générer les groupes',
    reset: 'Réinitialiser',
    groupLabel: 'Groupe {n}',
    copyAll: 'Copier tous les groupes',
    exportCsv: 'Exporter en CSV',
    csvGroup: 'Groupe',
    csvMember: 'Membre',
    copied: 'Groupes copiés',
    emptyError: 'Saisissez au moins deux entrées.',
    invalidError: 'Le nombre de groupes doit être un entier compris entre 1 et le nombre d’entrées.',
    emptyResult: 'Les groupes apparaîtront ici',
    cryptoError: 'Ce navigateur ne fournit pas de source aléatoire sûre ; aucun groupe n’a été généré.',
    csvFileName: 'groupes-aleatoires.csv',
  },
  sources: [
    { label: 'MDN en français — Crypto.getRandomValues', href: 'https://developer.mozilla.org/fr/docs/Web/API/Crypto/getRandomValues', note: 'Source aléatoire utilisée pour le mélange.' },
    { label: 'CNIL — Affichage des listes de classe', href: 'https://cnil.fr/fr/rentree-scolaire-et-affichage-des-listes-des-classes-quelles-sont-les-bonnes-pratiques', note: 'Minimisation des données dans les listes scolaires.' },
    { label: 'Ministère de l’Éducation nationale — Le collège', href: 'https://www.education.gouv.fr/le-college-4940', note: 'Les groupes de besoins reposent sur les acquis et évoluent avec la progression.' },
  ],
  privacyNote: 'La liste et les groupes sont traités dans cet onglet. FunnyTools ne les reçoit pas. Contrôlez l’écran, le presse-papiers et les fichiers CSV téléchargés.',
  disclaimer: 'La page équilibre les effectifs, pas les profils. Vérifiez présence, besoins, accessibilité, sécurité et consentement avant de publier les groupes.',
};

export const frenchRandomGroupGeneratorReview = {
  heading: 'Vérifier des groupes aléatoires',
  intro: 'La vérification sépare la répartition mathématique des conditions humaines que la page ne peut pas connaître.',
  panels: [
    { title: 'Liste', text: 'Contrôlez présence, doublons, homonymes et données strictement nécessaires.' },
    { title: 'Effectifs', text: 'Le plus grand groupe doit avoir au maximum une personne de plus que le plus petit.' },
    { title: 'Contexte', text: 'Appliquez ensuite les besoins, rôles, contraintes de sécurité et consentements.' },
  ],
  checklistHeading: 'Points à contrôler',
  checklist: [
    'Chaque entrée valable apparaît exactement une fois.',
    'Le nombre d’équipes correspond à la salle, au temps et au matériel.',
    'Chaque ajustement ultérieur possède une raison explicable.',
    'La version finale est conservée dans l’espace autorisé si nécessaire.',
  ],
};

export const frenchDiceRoller: ToolContent = {
  name: 'Lancer de dés en ligne',
  short: 'Lancez de 1 à 20 dés virtuels d4, d6, d8, d10, d12 ou d20, puis lisez chaque face et la somme.',
  long: 'Choisissez le nombre de faces et la quantité. Chaque dé est produit séparément avec `crypto.getRandomValues` et un échantillonnage par rejet ; les valeurs finales sont fixées avant l’animation. La page affiche toutes les faces et leur total arithmétique. Elle n’interprète ni modificateur, ni avantage, ni règle de jeu et ne constitue pas un registre certifié pour paris ou récompenses.',
  seoTitle: 'Lancer de dés en ligne | Dé virtuel d6 et d20',
  seoDescription: 'Lancez jusqu’à 20 dés virtuels d4, d6, d8, d10, d12 ou d20. Chaque face et le total sont calculés dans votre navigateur.',
  keywords: [
    'lancer de dés en ligne',
    'dé virtuel',
    'lancer un d20',
    'd6 en ligne',
    'dés pour jeu de rôle',
    'simulateur de dés',
    'lanceur de dés gratuit',
  ],
  capabilities: [
    'Choisir d4, d6, d8, d10, d12 ou d20.',
    'Lancer de 1 à 20 dés du même type.',
    'Afficher chaque face individuelle et la somme totale.',
    'Utiliser Web Crypto avant l’animation.',
    'Copier une sortie lisible avec notation, faces et total.',
  ],
  contentSections: [
    {
      heading: 'Réponse rapide : lancer un dé virtuel',
      paragraphs: [
        'Sélectionnez d6 pour un dé classique ou d20 pour un dé à vingt faces, indiquez une quantité de 1 à 20 puis cliquez sur « Lancer les dés ». Après une courte animation, chaque face apparaît dans une pastille et le total est affiché. Trois d6 donnent donc trois valeurs comprises entre 1 et 6, accompagnées de leur somme.',
        'Le total est purement arithmétique. Aucun bonus, malus, seuil de réussite, avantage ou règle de relance n’est appliqué. Vérifiez le règlement de votre jeu et utilisez « Copier le résultat » pour conserver la notation, les faces obtenues et la somme avant un nouveau lancer.',
      ],
    },
    {
      heading: 'Comprendre d4, d6, d8, d10, d12 et d20',
      paragraphs: [
        'La notation `dN` désigne un dé dont les faces vont de 1 à N. Un d4 produit 1, 2, 3 ou 4 ; un d20 produit un entier de 1 à 20. Une notation comme `3d6` signifie trois dés à six faces. FunnyTools l’affiche sous la forme `d6 x 3` avec les trois résultats séparés.',
        'Cette version ne propose pas d100, de dé percentile, de faces personnalisées ou d’expressions comme `2d8+4`. Pour simuler `2d8+4`, lancez deux d8 puis ajoutez 4 au total dans votre fiche. Cette séparation évite de faire croire que la page interprète une règle qu’elle ne connaît pas.',
      ],
    },
    {
      heading: 'Comment chaque face est choisie',
      paragraphs: [
        'Le navigateur demande un entier de 32 bits à `crypto.getRandomValues`. Pour obtenir une face uniforme, le code calcule le plus grand multiple exact du nombre de faces, rejette les valeurs situées au-delà et applique ensuite le modulo. Sans cette étape, certaines positions pourraient recevoir une représentation de plus.',
        'Si Web Crypto n’est pas disponible, le lancer est annulé et un message apparaît. La page ne revient pas à `Math.random` sans prévenir. Les résultats définitifs sont calculés avant l’animation : les nombres qui défilent pendant une demi-seconde ne modifient pas les faces finales.',
      ],
      link: {
        prefix: 'Le fonctionnement de la source est expliqué par ',
        label: 'MDN dans Crypto.getRandomValues',
        href: 'https://developer.mozilla.org/fr/docs/Web/API/Crypto/getRandomValues',
        suffix: '.',
      },
    },
    {
      heading: 'Probabilité d’une face sur un dé équilibré',
      paragraphs: [
        'Sur un d6 idéal, chaque face a une probabilité théorique de 1/6 ; sur un d20, elle vaut 1/20, soit 5 %. Deux dés sont générés indépendamment. Si le premier montre 6, cela ne retire pas le 6 des possibilités du second. Les doublons et les séries sont donc des résultats normaux.',
        'Une courte suite ne ressemble pas forcément à la distribution théorique. Dix lancers peuvent ne montrer aucun 1 ou contenir quatre fois la même face. La régularité apparaît seulement comme tendance sur de grands nombres d’essais ; elle ne force jamais le prochain résultat à compenser les précédents.',
      ],
    },
    {
      heading: 'Pourquoi les sommes de plusieurs dés ne sont pas uniformes',
      paragraphs: [
        'Chaque face individuelle est uniforme, mais toutes les sommes ne possèdent pas le même nombre de combinaisons. Avec 2d6, le total 2 n’existe que par 1+1, tandis que 7 peut venir de six couples ordonnés. Sept est donc bien plus fréquent que deux.',
        'La page affiche la somme observée sans calculer sa probabilité. Pour une activité scolaire, conservez les faces, pas seulement le total, afin de compter les combinaisons. Les ressources Éduscol utilisent précisément le lancer de dé, pile ou face et les tirages d’urne pour travailler les situations de hasard.',
      ],
      link: {
        prefix: 'Un document pédagogique officiel sur ces situations est disponible sur ',
        label: 'Éduscol',
        href: 'https://eduscol.education.fr/document/36953/download',
        suffix: '.',
      },
    },
    {
      heading: 'Utiliser un d20 pour le jeu de rôle',
      paragraphs: [
        'Pour un test courant, choisissez d20 et quantité 1. Ajoutez ensuite le modificateur prévu par le système. Avec avantage ou désavantage, vous pouvez lancer deux d20 puis garder manuellement le plus élevé ou le plus faible. La somme automatique des deux dés n’est pas le résultat de cette mécanique.',
        'Pour des dégâts ou soins, choisissez le type et le nombre requis, puis notez le calcul complet : `3d8 : 4, 7, 2 ; total 13 ; bonus +5 ; résultat 18`. FunnyTools ne lie pas les jets à un personnage et ne conserve aucun journal de campagne.',
      ],
    },
    {
      heading: 'Dés en ligne pour la classe',
      paragraphs: [
        'Un dé virtuel peut attribuer une question, déclencher un déplacement ou alimenter une expérience sur les fréquences. Préparez une correspondance complète entre faces et consignes. Si cinq exercices sont associés à un d6, définissez à l’avance ce que signifie le 6 : relancer, choisir librement ou traiter une sixième activité.',
        'Pour comparer fréquences observées et probabilités théoriques, exportez manuellement les résultats dans un tableau. Cette page ne garde que le dernier lancer. Une expérience sérieuse doit aussi préciser le type de dé, le nombre de lancers et la manière dont les résultats ont été enregistrés.',
      ],
    },
    {
      heading: 'Lire l’animation sans lui attribuer le tirage',
      paragraphs: [
        'Pendant l’animation, les pastilles changent pour signaler l’action. Ces valeurs sont des aperçus déterministes et non des tirages supplémentaires. La sélection finale existe déjà avant le premier changement visuel ; ni la vitesse de l’écran ni la dernière image affichée ne choisissent le résultat.',
        'Attendez que le mot « Total » et les pastilles finales soient stables avant de copier. Si l’onglet passe en arrière-plan, l’animation peut prendre un peu plus de temps, mais la face retenue ne change pas. Cette distinction rend le comportement explicable devant un groupe.',
      ],
    },
    {
      heading: 'Indépendance, répétitions et erreur du joueur',
      paragraphs: [
        'Chaque nouveau clic produit une expérience indépendante. Une suite de valeurs élevées ne rend pas une petite face « due ». De même, obtenir plusieurs 20 de suite est rare mais possible. Relancer parce qu’un motif paraît trop régulier revient à modifier la règle après avoir vu le résultat.',
        'Décidez avant le lancer quand une reprise est autorisée : mauvaise quantité, mauvais type de dé ou panne visible. Un résultat simplement décevant n’est pas une erreur technique. Cette discipline est surtout utile dans un jeu à distance où les autres personnes ne voient pas votre écran.',
      ],
    },
    {
      heading: 'Copier le résultat et ses limites',
      paragraphs: [
        'Le texte copié contient le type, la quantité, la liste des faces et le total. Il convient à une messagerie, une fiche ou une note. Il ne contient cependant ni date certifiée, ni identité, ni compteur de tentatives, ni seed, ni signature.',
        'Une capture ou un message conserve ce qui a été montré, mais ne prouve pas qu’il s’agissait du premier lancer. Si une partie exige un historique partagé, utilisez le bot ou le serveur accepté par les joueurs. Cette page n’est pas un arbitre distant résistant aux manipulations.',
      ],
    },
    {
      heading: 'Quand ne pas utiliser ce lanceur',
      paragraphs: [
        'N’utilisez pas le dé virtuel pour un pari, un casino, une loterie, un prix réglementé ou toute attribution qui exige certification et audit. Une bonne source aléatoire ne suffit pas : il faudrait aussi contrôler le code, l’appareil, l’identité, les tentatives et le journal.',
        'Le hasard ne doit pas remplacer une décision médicale, juridique, financière, professionnelle ou de sécurité. Les dés conviennent aux jeux, à l’enseignement et aux petits départages réversibles, lorsque toutes les conséquences possibles sont connues et acceptées.',
      ],
    },
    {
      heading: 'Checklist pour vérifier un lancer',
      paragraphs: [
        'Contrôlez le type de dé et la quantité avant de cliquer. Après l’animation, comptez les pastilles, vérifiez que chaque face se trouve entre 1 et N et refaites la somme si l’enjeu du jeu le justifie. Ajoutez ensuite les modificateurs dans une ligne séparée.',
        'Conservez la sortie avant de relancer et expliquez toute règle spéciale. Si une erreur de quantité apparaît, saisissez un entier de 1 à 20. Ne contournez pas le contrôle avec plusieurs opérations dont les conditions diffèrent sans l’indiquer.',
      ],
    },
  ],
  instructions: [
    'Choisissez d4, d6, d8, d10, d12 ou d20.',
    'Saisissez une quantité entière de 1 à 20 dés.',
    'Lancez et attendez la fin de l’animation.',
    'Vérifiez les faces individuelles et leur somme.',
    'Copiez la sortie avant d’appliquer les règles externes.',
  ],
  examples: [
    'Lancer un d20 puis ajouter le bonus du personnage.',
    'Lancer 6d6 et conserver chaque face avec le total.',
    'Comparer cinquante séries de 2d6 en classe.',
    'Associer les six faces d’un d6 à six questions valides.',
  ],
  audience: [
    'Joueurs de rôle et de jeux de société.',
    'Enseignants qui présentent hasard, fréquence et somme.',
    'Groupes à distance sans dés physiques.',
    'Animateurs de petites activités à faible enjeu.',
  ],
  caseStudies: [
    { title: 'Test au d20', description: 'La joueuse copie 14 puis ajoute séparément son bonus +3 pour annoncer 17.' },
    { title: 'Étude de 2d6', description: 'La classe note chaque paire et observe que les totaux centraux possèdent davantage de combinaisons.' },
    { title: 'Avantage manuel', description: 'Deux d20 sont lancés et le plus grand est conservé ; la somme automatique est ignorée selon la règle.' },
  ],
  notes: [
    'Chaque dé donne un entier indépendant entre 1 et son nombre de faces.',
    'Doublons et séries restent possibles.',
    'Le total n’inclut aucun modificateur.',
    'Le résultat est fixé avant l’animation.',
    'Aucun historique ou certificat de lancer n’est créé.',
  ],
  faq: [
    { q: 'Quels dés peut-on lancer en ligne ?', a: 'La page propose d4, d6, d8, d10, d12 et d20, avec 1 à 20 dés du même type par lancer.' },
    { q: 'Chaque face d’un d20 a-t-elle 5 % de chance ?', a: 'Oui dans le modèle utilisé. Une courte série peut toutefois s’éloigner fortement de cette fréquence théorique.' },
    { q: 'L’animation choisit-elle la face finale ?', a: 'Non. Toutes les faces sont générées avant l’animation ; les valeurs intermédiaires sont uniquement visuelles.' },
    { q: 'Puis-je saisir une formule comme 2d8+4 ?', a: 'Non. Lancez deux d8 puis ajoutez 4 séparément. La page ne traite pas les expressions ou règles de jeu.' },
    { q: 'Pourquoi 7 sort-il plus souvent que 2 avec 2d6 ?', a: 'Sept possède six couples possibles, contre un seul pour deux. Les faces sont uniformes, pas les sommes.' },
    { q: 'Est-ce adapté à un pari ou un tirage audité ?', a: 'Non. La page n’offre ni identité, ni historique immuable, ni seed publique, ni certification.' },
  ],
  labels: {
    diceType: 'Type de dé',
    count: 'Nombre de dés',
    roll: 'Lancer les dés',
    copy: 'Copier le résultat',
    result: 'Résultat du lancer',
    total: 'Total',
    dice: 'Dés',
    placeholder: 'Cliquez pour lancer les dés',
    rolling: 'Lancer en cours…',
    countError: 'Le nombre de dés doit être un entier compris entre 1 et 20.',
    copied: 'Résultat copié',
    cryptoError: 'Ce navigateur ne fournit pas de source aléatoire sûre ; aucun dé n’a été lancé.',
  },
  sources: [
    { label: 'MDN en français — Crypto.getRandomValues', href: 'https://developer.mozilla.org/fr/docs/Web/API/Crypto/getRandomValues', note: 'Source d’entiers aléatoires utilisée par chaque dé.' },
    { label: 'W3C — Web Cryptography Level 2', href: 'https://www.w3.org/TR/WebCryptoAPI/', note: 'Spécification normative de Web Crypto.' },
    { label: 'Éduscol — Situations usuelles produisant du hasard', href: 'https://eduscol.education.fr/document/36953/download', note: 'Ressource pédagogique citant lancer de dé, pile ou face et tirage dans une urne.' },
  ],
  privacyNote: 'Les faces et le total sont générés dans cet onglet. FunnyTools ne reçoit ni ne conserve les lancers ; le presse-papiers reste sous le contrôle de votre appareil.',
  disclaimer: 'Ce dé virtuel sert aux jeux, à l’enseignement et aux décisions de faible enjeu. Il ne remplace pas un système réglementé, certifié ou auditable.',
};

export const frenchDiceRollerReview = {
  heading: 'Vérifier un lancer de dés',
  intro: 'Séparez les faces générées des règles appliquées ensuite par votre jeu ou activité.',
  panels: [
    { title: 'Notation', text: 'Confirmez le type et le nombre ; 3d6 correspond à trois résultats de 1 à 6.' },
    { title: 'Sortie', text: 'Comptez les pastilles et vérifiez que le total est bien leur somme.' },
    { title: 'Règle', text: 'Ajoutez séparément bonus, avantage, seuil ou condition de relance.' },
  ],
  checklistHeading: 'Points à contrôler',
  checklist: [
    'Le type de dé correspond à la consigne.',
    'Chaque face est dans l’intervalle et la quantité est correcte.',
    'La somme automatique n’est pas confondue avec une règle spéciale.',
    'Le lancer est copié si le groupe doit le conserver.',
  ],
};

export const frenchThisOrThat: ToolContent = {
  name: 'Choisir entre deux options',
  short: 'Saisissez une option A et une option B pour obtenir un départage aléatoire 50/50 entre deux alternatives déjà acceptables.',
  long: 'Ce sélecteur attribue la même probabilité à A et à B. Le choix est fixé avec `crypto.getRandomValues` avant une courte animation. Il fonctionne comme un pile ou face avec des libellés personnalisés : il peut rompre une petite égalité, mais n’analyse ni avantage, ni coût, ni risque, ni consentement. Ne lui déléguez aucune décision médicale, juridique, financière, professionnelle ou de sécurité.',
  seoTitle: 'Choisir entre deux options | Décision 50/50',
  seoDescription: 'Écrivez deux alternatives et obtenez un choix aléatoire 50/50 dans votre navigateur. Pour petits départages réversibles et déjà acceptés.',
  keywords: [
    'choisir entre deux options',
    'décider entre deux choix',
    'sélecteur aléatoire A ou B',
    'décision 50 50',
    'pile ou face personnalisé',
    'choisir au hasard',
    'option A ou option B',
  ],
  capabilities: [
    'Accepter deux textes non vides.',
    'Attribuer une probabilité théorique de 1/2 à chaque position.',
    'Choisir avec Web Crypto avant l’animation.',
    'Relancer une nouvelle décision indépendante.',
    'Copier l’option retenue sans l’envoyer à FunnyTools.',
  ],
  contentSections: [
    {
      heading: 'Réponse rapide : choisir entre deux options',
      paragraphs: [
        'Écrivez une alternative dans « Option A » et une autre dans « Option B », puis cliquez sur « Choisir ». Après l’alternance visuelle, l’un des deux textes reste affiché. Les deux champs doivent contenir un libellé ; les espaces extérieurs sont retirés.',
        'Utilisez ce 50/50 lorsque les deux solutions sont déjà valides : deux films acceptés, l’ordre de deux tâches équivalentes, la personne qui commence une partie ou deux parcours récréatifs connus. La page ne compare aucun critère et ne recommande pas la meilleure solution.',
      ],
    },
    {
      heading: 'Un pile ou face avec des libellés personnalisés',
      paragraphs: [
        'A et B jouent le rôle des deux faces d’une pièce idéale. À chaque clic, la position A a une probabilité théorique de 1/2 et B aussi. La longueur du texte, son ordre alphabétique ou sa place à gauche ne modifient pas ce poids.',
        'Si les deux champs contiennent le même texte, l’algorithme choisit toujours une position, mais le résultat visible paraît identique. Employez des libellés suffisamment distincts. Pour trois alternatives ou plus, une roue ou un tirage de noms décrit mieux le problème.',
      ],
    },
    {
      heading: 'Le choix est fixé avant l’animation',
      paragraphs: [
        'Au clic, la page demande un indice 0 ou 1 à `crypto.getRandomValues`. La conversion utilise un échantillonnage par rejet, puis l’option gagnante est mémorisée. Si Web Crypto manque, aucun résultat n’est annoncé et un message explique l’échec.',
        'L’alternance d’environ une seconde commence seulement après cette sélection. Elle rend l’action visible, mais la vitesse de l’appareil et la dernière image affichée ne choisissent rien. L’animation n’est pas une preuve d’audit et n’empêche pas une personne de relancer plusieurs fois.',
      ],
      link: {
        prefix: 'La source de la décision est documentée par ',
        label: 'MDN en français',
        href: 'https://developer.mozilla.org/fr/docs/Web/API/Crypto/getRandomValues',
        suffix: '.',
      },
    },
    {
      heading: 'Chaque nouvelle décision est indépendante',
      paragraphs: [
        'Si A apparaît quatre fois, B ne devient pas plus probable au cinquième clic. Chaque sélection recommence avec 50 % pour chaque position. Les séries font partie du hasard et ne signifient pas que le navigateur doit « rééquilibrer » la prochaine sortie.',
        'Une répartition proche de 50/50 n’est attendue que sur un très grand nombre d’essais, sans garantie sur une petite série. Si votre objectif est de partager une corvée équitablement semaine après semaine, un planning alterné ou un registre de tours convient mieux qu’une succession de décisions indépendantes.',
      ],
    },
    {
      heading: 'Valider les deux alternatives avant le hasard',
      paragraphs: [
        'Le sélecteur ne transforme pas une option dangereuse, trop chère ou non consentie en choix acceptable. Vérifiez d’abord le budget, le temps, les règles, les contraintes et l’accord des personnes concernées. Supprimez toute solution qui échoue à ce contrôle.',
        'Convenez aussi de la règle : accepter le premier résultat, utiliser la sortie comme suggestion ou autoriser une reprise seulement en cas d’erreur de saisie. Décider cela après avoir vu l’option ouvre la porte à des relances opportunistes.',
      ],
    },
    {
      heading: 'Observer sa réaction sans en faire un diagnostic',
      paragraphs: [
        'Le résultat peut révéler une préférence déjà présente. Si B apparaît et que vous souhaitez immédiatement relancer, demandez-vous ce qui vous attirait dans A. Cette réaction fournit parfois une question utile, surtout lorsque les deux alternatives semblaient égales sur le papier.',
        'Ce n’est ni un test psychologique ni une méthode de décision scientifique. L’humeur, la formulation et la pression du groupe influencent le ressenti. Traitez la réaction comme une information à explorer, pas comme une preuve ou un ordre.',
      ],
    },
    {
      heading: 'Exemples adaptés à une décision 50/50',
      paragraphs: [
        'À la maison, le sélecteur peut choisir quel film déjà accepté regarder ou quelle tâche équivalente commencer. En classe, il peut fixer l’ordre de deux activités prévues. Dans une réunion, il peut départager deux formats qui respectent tous deux le même objectif.',
        'Pour choisir qui réalise une tâche, confirmez que les personnes sont volontaires et que la charge est comparable. Un tirage ne crée pas le consentement. Si l’action revient souvent, alternez les tours afin que l’équité s’évalue dans le temps.',
      ],
    },
    {
      heading: 'Décisions à ne jamais réduire à A ou B',
      paragraphs: [
        'Ne choisissez pas au hasard un traitement, une réponse à un symptôme, un contrat, un investissement, un crédit, une embauche, une sanction ou une mesure de sécurité. Ces sujets exigent informations, responsabilité et parfois avis professionnel.',
        'N’utilisez pas non plus le résultat pour ignorer une objection ou attribuer un droit. La phrase « l’outil a décidé » ne donne aucune autorité au choix. Une personne concernée peut retirer son accord, et un processus réglementé doit suivre ses propres règles de preuve.',
      ],
    },
    {
      heading: 'Quand préférer une matrice de décision',
      paragraphs: [
        'Si les options diffèrent sur le prix, le délai, la qualité et le risque, listez ces critères, donnez-leur un poids explicite et comparez les données. Une matrice rend le raisonnement visible ; le 50/50 convient seulement après cette analyse, lorsqu’une égalité raisonnable subsiste.',
        'Pour plus de deux choix, utilisez une roue ou un sélecteur de liste. Pour une attribution répétée, utilisez une rotation. Pour une décision collective, discutez les intérêts et objections. Le bon outil dépend de la structure du problème, pas du désir de le résoudre plus vite.',
      ],
    },
    {
      heading: 'Copie, confidentialité et absence d’historique',
      paragraphs: [
        'Les deux textes et le résultat restent dans cet onglet. FunnyTools ne les reçoit pas. En copiant, le choix passe dans le presse-papiers, qui peut être partagé avec d’autres applications ou synchronisé selon l’appareil. Évitez les noms complets, diagnostics ou informations confidentielles.',
        'La page ne conserve ni heure, ni nombre de clics, ni liste des résultats. Un texte copié montre l’option finale sans prouver qu’elle était la première. Pour un groupe qui exige une trace, notez les deux alternatives, la règle convenue et le résultat dans son propre document.',
      ],
    },
    {
      heading: 'Ce que cette version ne fait pas',
      paragraphs: [
        'Il n’existe ni pondération, ni meilleur de trois, ni historique, ni seed, ni analyse automatique. Le bouton exécute toujours une nouvelle décision indépendante avec les textes actuels. La page ne garantit pas une alternance et ne mesure pas votre satisfaction.',
        'Cette simplicité est volontaire : deux options, même probabilité, sortie locale. Dès que le besoin inclut plusieurs critères, des poids différents ou une preuve opposable, il faut employer une procédure plus appropriée.',
      ],
    },
    {
      heading: 'Checklist avant de cliquer sur Choisir',
      paragraphs: [
        'Demandez-vous si A et B sont toutes deux sûres, réalisables, réversibles et acceptées. Vérifiez qu’aucune troisième solution importante n’a été cachée par la formulation et que les conséquences d’un mauvais départage restent limitées.',
        'Annoncez la règle de reprise, saisissez des libellés distincts puis acceptez la première sortie valide. Si votre réaction montre une préférence forte, revenez aux critères au lieu d’accuser le hasard.',
      ],
    },
  ],
  instructions: [
    'Vérifiez que les deux alternatives sont sûres, possibles et acceptées.',
    'Saisissez un libellé clair pour A et un autre pour B.',
    'Fixez la règle de reprise avant de cliquer.',
    'Choisissez et attendez la fin de l’animation.',
    'Copiez le résultat ou réexaminez vos critères si une préférence apparaît.',
  ],
  examples: [
    'Départager deux films déjà acceptés par tout le groupe.',
    'Choisir l’ordre de deux sujets équivalents dans une réunion.',
    'Sélectionner un restaurant parmi deux options compatibles avec le budget.',
    'Déterminer qui commence une partie lorsque les deux joueurs sont d’accord.',
  ],
  audience: [
    'Personnes qui veulent rompre une petite égalité quotidienne.',
    'Familles et groupes avec deux options déjà validées.',
    'Enseignants qui choisissent l’ordre de deux activités équivalentes.',
    'Équipes qui veulent un pile ou face personnalisé.',
  ],
  caseStudies: [
    { title: 'Deux films finalistes', description: 'Les objections sont traitées avant le clic ; les deux titres restants sont acceptés et le groupe garde la première sortie.' },
    { title: 'Préférence révélée', description: 'La déception face au résultat déclenche une nouvelle comparaison des critères au lieu d’une relance automatique.' },
    { title: 'Tâche récurrente', description: 'Après une série déséquilibrée, deux collègues remplacent le 50/50 par une rotation enregistrée.' },
  ],
  notes: [
    'A et B ont chacune une probabilité théorique de 1/2.',
    'Chaque clic est indépendant et peut prolonger une série.',
    'La sélection précède l’animation.',
    'Aucun coût, risque ou consentement n’est analysé.',
    'La page ne garde ni historique, ni seed, ni preuve.',
  ],
  faq: [
    { q: 'Comment choisir entre deux options au hasard ?', a: 'Validez les deux alternatives, écrivez-les dans A et B puis cliquez sur « Choisir ». Chaque position reçoit une probabilité théorique de 50 %.' },
    { q: 'L’option A est-elle favorisée ?', a: 'Non. A et B correspondent à deux indices équiprobables ; leur ordre visuel ne change pas le tirage.' },
    { q: 'L’animation détermine-t-elle le résultat ?', a: 'Non. L’option est choisie avec Web Crypto avant l’alternance ; le mouvement est seulement visuel.' },
    { q: 'Pourquoi la même option revient-elle ?', a: 'Chaque clic est indépendant. Une série de A ou de B reste possible et ne force aucune compensation.' },
    { q: 'Puis-je l’utiliser pour une décision importante ?', a: 'Non comme substitut à l’analyse. Les décisions médicales, juridiques, financières, professionnelles ou de sécurité demandent des critères et une responsabilité humaine.' },
    { q: 'Les options et résultats sont-ils enregistrés ?', a: 'Non. Ils restent dans l’onglet et disparaissent au rechargement. Copiez seulement ce qui doit être conservé.' },
  ],
  labels: {
    optionA: 'Option A',
    optionB: 'Option B',
    placeholderA: 'Regarder un film',
    placeholderB: 'Faire une partie',
    decide: 'Choisir',
    copy: 'Copier le résultat',
    reset: 'Réinitialiser',
    result: 'Option retenue',
    waiting: 'Saisissez deux options pour commencer',
    error: 'Complétez les deux options.',
    copied: 'Résultat copié',
    cryptoError: 'Ce navigateur ne fournit pas de source aléatoire sûre ; aucune option n’a été choisie.',
  },
  sources: [
    { label: 'MDN en français — Crypto.getRandomValues', href: 'https://developer.mozilla.org/fr/docs/Web/API/Crypto/getRandomValues', note: 'Source aléatoire utilisée pour le choix A ou B.' },
    { label: 'W3C — Web Cryptography Level 2', href: 'https://www.w3.org/TR/WebCryptoAPI/', note: 'Spécification normative de Web Crypto.' },
    { label: 'Éduscol — Situations usuelles produisant du hasard', href: 'https://eduscol.education.fr/document/36953/download', note: 'Ressource pédagogique citant notamment pile ou face.' },
  ],
  privacyNote: 'Les options et le choix restent dans cet onglet. FunnyTools ne les reçoit pas ; évitez les données sensibles et contrôlez le presse-papiers.',
  disclaimer: 'Réservez ce 50/50 à des alternatives de faible enjeu déjà acceptables. Le hasard n’évalue ni les conséquences, ni les preuves, ni le consentement.',
};

export const frenchThisOrThatReview = {
  heading: 'Vérifier une décision A ou B',
  intro: 'Le contrôle essentiel précède le tirage : les deux alternatives doivent être réellement acceptables.',
  panels: [
    { title: 'Admissibilité', text: 'Écartez les options dangereuses, irréalisables ou non consenties.' },
    { title: 'Probabilité', text: 'A et B sont deux positions indépendantes avec une probabilité théorique de 1/2.' },
    { title: 'Conséquence', text: 'Acceptez ou réexaminez la sortie selon la règle annoncée avant le clic.' },
  ],
  checklistHeading: 'Points à contrôler',
  checklist: [
    'Les deux options respectent budget, temps, règles et consentement.',
    'La décision est réversible ou de faible conséquence.',
    'Les personnes concernées connaissent la règle de reprise.',
    'Une réaction émotionnelle est traitée comme une information, pas un diagnostic.',
  ],
};
