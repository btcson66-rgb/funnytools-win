import type { ToolContent } from '../tools/_types';

export const frenchSeatingChart: ToolContent = {
  name: 'Créer un plan de classe en ligne',
  short: 'Répartissez une liste dans une grille de tables, dans l’ordre ou après brassage sécurisé, puis copiez, imprimez ou exportez le plan en CSV.',
  long: 'Ce créateur de plan de classe transforme une liste d’élèves ou de participants en grille de 1 à 20 rangées et de 1 à 20 colonnes. Le remplissage peut suivre les rangées ou les colonnes ; l’ordre peut être conservé ou brassé avec Web Crypto. Le résultat reste un brouillon à confronter à la salle réelle : il ne connaît ni portes, ni largeurs de passage, ni besoins visuels, auditifs ou moteurs, ni aménagements pédagogiques. La décision finale appartient donc à l’équipe qui connaît les personnes et le lieu.',
  seoTitle: 'Créer un plan de classe en ligne | CSV et impression',
  seoDescription: 'Collez la liste, choisissez rangées et colonnes, puis créez un plan de classe. Brassage sécurisé, copie, impression et CSV, sans inscription.',
  keywords: [
    'créer un plan de classe',
    'plan de classe en ligne',
    'générateur plan de classe',
    'placement élèves classe',
    'répartition élèves tables',
    'plan de salle examen',
    'placer élèves aléatoirement',
    'plan de classe à imprimer',
  ],
  capabilities: [
    'Placer jusqu’à 400 entrées dans une grille de 1 à 20 rangées et de 1 à 20 colonnes.',
    'Conserver la liste initiale ou la brasser avec `crypto.getRandomValues()`.',
    'Remplir la grille rangée par rangée ou colonne par colonne.',
    'Laisser visibles les cases inoccupées pour représenter une réserve ou préparer un ajustement.',
    'Copier le plan sous forme tabulée et lancer l’impression ou l’enregistrement en PDF du navigateur.',
    'Exporter rangée, colonne, numéro de place et nom dans un CSV protégé contre les formules.',
  ],
  contentSections: [
    {
      heading: 'Réponse directe : comment faire un plan de classe',
      paragraphs: [
        'Collez une personne par ligne, indiquez le nombre de rangées et de colonnes de la zone à représenter, puis vérifiez que leur produit couvre tout l’effectif. Choisissez « Par rangées » pour remplir de gauche à droite avant de descendre, ou « Par colonnes » pour remplir chaque colonne de haut en bas. Activez le brassage uniquement si un premier placement aléatoire est pertinent. Créez ensuite le plan, corrigez-le au regard de la salle réelle et exportez seulement la version retenue.',
        'La grille décrit des positions, pas des mètres. Un plan de 5 × 6 peut accueillir 28 personnes et laisser deux cases vides, mais il ne prouve pas que six tables tiennent dans la largeur ni qu’un cheminement reste praticable. Les numéros de place se lisent toujours par rangées à partir du coin supérieur gauche. Le sens de remplissage change l’ordre des noms, pas cette numérotation visuelle.',
      ],
      items: [
        '30 personnes : une grille 5 × 6 utilise toutes les cases.',
        '28 personnes : une grille 5 × 6 laisse deux cases à interpréter et à placer manuellement.',
        'Deux homonymes doivent recevoir une initiale, un numéro ou un identifiant compréhensible.',
        'Le devant de la salle, les portes et les circulations doivent être ajoutés hors de cette grille.',
      ],
    },
    {
      heading: 'Un brouillon de placement, jamais une décision pédagogique automatique',
      paragraphs: [
        'Un tirage aléatoire peut fournir un point de départ impartial pour certaines activités ou rompre un ordre alphabétique. Il ne sait pas déterminer la place appropriée. Une recherche de « placement élèves » ne doit donc pas conduire à automatiser une décision humaine : la proximité du tableau, l’éclairage, l’acoustique, les possibilités de déplacement, la présence d’une AESH, le matériel adapté, la fatigue, les interactions et les consignes de sécurité peuvent imposer des changements. Le bon enchaînement est générer, examiner, ajuster, puis communiquer.',
        'La fiche « Aménager une salle de classe inclusive » du ministère de l’Éducation nationale rappelle qu’une salle adaptée doit pouvoir répondre à des besoins spécifiques et attirer l’attention sur le mobilier, l’acoustique et le confort visuel. Le plan numérique sert à tester une hypothèse d’organisation. Il ne remplace ni l’observation, ni les aménagements formalisés, ni le retour des personnes concernées.',
      ],
    },
    {
      heading: 'Accessibilité : vérifier le trajet avant la symétrie',
      paragraphs: [
        'Commencez par dessiner mentalement les déplacements : entrée, sortie, tableau, rangements, prises, matériel partagé et espace de regroupement. Une case libre n’est pas automatiquement un passage accessible, car la grille ignore sa largeur, les rayons de giration, les obstacles et les déplacements de chaises. Vérifiez le plan dans la pièce, aux heures et avec le mobilier réellement utilisés.',
        'La première rangée n’est pas une réponse universelle à une difficulté visuelle ou auditive. La lumière, les reflets, le côté depuis lequel une consigne est donnée, la taille de l’affichage et le système d’aide disponible comptent aussi. Appliquez les aménagements prévus par l’établissement sans inscrire un diagnostic dans le nom de la place. Le plan partagé doit montrer l’action nécessaire, pas une donnée de santé.',
      ],
      items: [
        'Peut-on rejoindre la place et en repartir sans déplacer plusieurs personnes ?',
        'Le tableau et les supports sont-ils visibles sans posture durablement inconfortable ?',
        'Les consignes sont-elles audibles et le matériel d’aide reste-t-il accessible ?',
        'La place permet-elle de participer, et non seulement d’être présent ?',
      ],
    },
    {
      heading: 'Plan de salle pour un examen : usage et limites',
      paragraphs: [
        'Pour une épreuve, le brassage peut produire une première répartition qui ne suit pas la liste d’appel. Il ne garantit ni la conformité au règlement de l’examen ni la prévention de toute fraude. Il faut encore tenir compte des convocations, absences, aménagements accordés, versions de sujets, distances, surveillance, sorties et règles de l’organisateur. Identifiez clairement le devant de salle et la lecture des numéros sur la copie imprimée.',
        'Si plusieurs salles ou secteurs sont utilisés, ajoutez un code simple à l’identifiant ou produisez un fichier par zone. N’insérez pas de numéro national, d’adresse, de téléphone ou d’information médicale pour distinguer les personnes. Le CSV est un support logistique : il ne doit pas devenir un dossier scolaire parallèle.',
      ],
    },
    {
      heading: 'Brassage sécurisé : ce que signifie Web Crypto',
      paragraphs: [
        'Quand le brassage est activé, l’outil applique l’algorithme de Fisher–Yates. Chaque échange utilise un entier fourni par `crypto.getRandomValues()` et un rejet des valeurs qui créeraient un biais de modulo. MDN décrit cette API comme une source de valeurs aléatoires suffisamment fortes pour un usage cryptographique. Ici, elle sert à éviter la source plus faible `Math.random()`, pas à transformer le placement en décision juste par nature.',
        'Il n’y a pas de graine enregistrée : cliquer une seconde fois peut donner un autre ordre. Si le placement doit être traçable, téléchargez le CSV retenu et conservez-le avec une date et un nom de groupe dans l’espace autorisé. Si Web Crypto manque, la page affiche une erreur au lieu de simuler un tirage ; désactivez alors le brassage pour reprendre l’ordre collé.',
      ],
    },
    {
      heading: 'CSV, impression et prévention des mauvaises versions',
      paragraphs: [
        'Le fichier CSV contient quatre champs : rangée, colonne, place et nom. Les cellules sont encadrées de guillemets. Une valeur commençant par un caractère de formule comme `=`, `+`, `-` ou `@` reçoit un préfixe de protection afin de réduire le risque d’exécution par un tableur. Cette mesure suit le risque décrit par OWASP, mais le fichier doit toujours être contrôlé dans Excel, LibreOffice ou Google Sheets avant diffusion.',
        'Toute modification de la liste, de la grille ou du mode invalide le résultat affiché. Cela évite de télécharger par mégarde un ancien placement. L’impression ouvre le dialogue du navigateur : vérifiez orientation, échelle, marges et sens de lecture. Pour afficher le plan sur une porte, des prénoms abrégés ou des codes de place peuvent suffire.',
      ],
    },
    {
      heading: 'RGPD et minimisation des noms',
      paragraphs: [
        'Les noms sont des données personnelles. La CNIL rappelle que les informations doivent être adéquates, pertinentes et limitées à ce qui est nécessaire. Utilisez donc la forme la moins précise permettant d’identifier la place : prénom et initiale, code interne ou numéro temporaire selon le contexte. N’ajoutez jamais un motif d’aménagement, une note, un comportement supposé ou une information familiale dans la ligne.',
        'Le calcul reste dans cet onglet et FunnyTools ne reçoit pas la liste pour construire le plan. Cette propriété ne règle pas tout : le CSV téléchargé, le PDF imprimé, une capture d’écran ou une projection peuvent être copiés. Conservez le résultat pendant la durée utile, limitez ses destinataires et supprimez les versions devenues inutiles conformément aux règles de l’établissement.',
      ],
    },
  ],
  instructions: [
    'Collez une personne par ligne et ajoutez un identifiant minimal aux homonymes.',
    'Saisissez entre 1 et 20 rangées et entre 1 et 20 colonnes.',
    'Choisissez un remplissage par rangées ou par colonnes.',
    'Activez le brassage sécurisé seulement si un ordre aléatoire convient à l’usage.',
    'Créez le plan, puis contrôlez la salle, l’accessibilité, les aménagements et la confidentialité.',
    'Copiez, imprimez ou téléchargez `plan-de-classe.csv`, puis ouvrez la version réellement utilisée.',
  ],
  examples: [
    'Préparer une grille 5 × 6 pour une classe de 28 élèves et réserver deux positions.',
    'Créer un plan de salle d’examen sans ordre alphabétique, puis archiver le CSV retenu.',
    'Représenter les places d’un atelier, d’une formation ou d’un accueil périscolaire.',
    'Comparer un remplissage horizontal et vertical sans modifier la liste source.',
    'Utiliser des identifiants courts pour une version affichée à l’entrée.',
  ],
  audience: [
    'Professeurs, professeurs principaux et personnels éducatifs.',
    'Organisateurs d’examens, de concours, de formations ou d’ateliers.',
    'Équipes qui ont besoin d’une grille imprimable et contrôlable.',
    'Personnes recherchant une première proposition locale sans création de compte.',
  ],
  caseStudies: [
    {
      title: 'Salle de classe flexible',
      description: 'Une enseignante crée 30 cases, réserve des espaces pour la circulation et confronte la grille au mobilier. Elle applique ensuite les aménagements connus avant d’imprimer une version réduite aux identifiants utiles.',
    },
    {
      title: 'Épreuve répartie en deux secteurs',
      description: 'Le responsable ajoute A ou B aux identifiants, brasse la liste puis exporte le CSV retenu. Il vérifie séparément les distances, les sorties et les aménagements de chaque secteur.',
    },
    {
      title: 'Atelier avec inscriptions tardives',
      description: 'L’équipe laisse quatre cases disponibles et assigne les arrivées au moment de l’accueil. Le plan public ne contient ni adresse électronique ni numéro de téléphone.',
    },
  ],
  notes: [
    'La grille ne représente ni dimensions, ni portes, ni obstacles, ni largeur de circulation.',
    'Le brassage ne connaît pas les besoins pédagogiques, sensoriels, moteurs ou relationnels.',
    'La capacité maximale est de 400 positions, avec 20 rangées et 20 colonnes.',
    'Les doublons exacts sont refusés pour éviter une affectation ambiguë.',
    'Aucune graine n’est conservée : exportez la version exacte que vous retenez.',
    'Le navigateur contrôle la mise en page d’impression et l’enregistrement en PDF.',
  ],
  faq: [
    { q: 'Comment créer un plan de classe pour 30 élèves ?', a: 'Choisissez par exemple 5 rangées et 6 colonnes. Si cette forme ne correspond pas à la salle, essayez 6 × 5 puis contrôlez le mobilier et les passages sur place.' },
    { q: 'Peut-on garder des places vides ?', a: 'Oui. Si la grille comporte plus de cases que de noms, les cases restantes sont marquées comme vides. Vous devez décider où placer réellement les passages ou réserves.' },
    { q: 'Le placement aléatoire est-il fiable ?', a: 'Le brassage utilise Web Crypto et évite le biais de modulo. Il produit un ordre aléatoire solide, mais ne juge pas si ce placement est adapté aux élèves.' },
    { q: 'Puis-je retrouver exactement le même plan ?', a: 'Pas avec une graine. Téléchargez le CSV, imprimez ou enregistrez en PDF la version retenue avant de relancer le brassage.' },
    { q: 'Pourquoi les noms identiques sont-ils refusés ?', a: 'Deux lignes identiques rendraient les places impossibles à attribuer sans ambiguïté. Ajoutez une initiale, un numéro ou un alias convenu.' },
    { q: 'Le CSV fonctionne-t-il dans Excel ?', a: 'Il est produit en UTF-8 avec BOM et cellules entre guillemets. Contrôlez néanmoins le séparateur, les accents et la protection des formules dans votre tableur.' },
    { q: 'FunnyTools conserve-t-il la liste des élèves ?', a: 'Non. La liste et le plan sont traités dans la page. En revanche, le fichier que vous téléchargez devient sous votre responsabilité.' },
    { q: 'Peut-on représenter des tables en îlots ?', a: 'La grille n’a pas de géométrie libre. Vous pouvez créer plusieurs petites zones ou utiliser le résultat comme liste d’affectation dans un vrai plan de salle.' },
  ],
  labels: {
    input: 'Liste des élèves ou participants',
    placeholder: 'Une personne par ligne…\nCamille D.\nNora B.\nLucas M.',
    rows: 'Rangées',
    columns: 'Colonnes',
    shuffle: 'Brasser de façon sécurisée',
    fillMode: 'Sens de remplissage',
    rowMode: 'Par rangées',
    columnMode: 'Par colonnes',
    generate: 'Créer le plan',
    copy: 'Copier le plan',
    exportCsv: 'Télécharger le CSV',
    print: 'Imprimer',
    reset: 'Réinitialiser',
    seatLabel: 'Place',
    csvRow: 'Rangée',
    csvColumn: 'Colonne',
    csvName: 'Nom',
    csvFilename: 'plan-de-classe.csv',
    emptySeat: 'Vide',
    emptyResult: 'Le plan de classe apparaîtra ici',
    emptyListError: 'Saisissez au moins une personne.',
    duplicateListError: 'La liste contient des noms identiques. Ajoutez une initiale, un numéro ou un alias pour les distinguer.',
    invalidGrid: 'Les rangées et colonnes doivent être des nombres entiers compris entre 1 et 20.',
    tooManyStudents: 'La liste dépasse le nombre de places. Augmentez les rangées ou les colonnes.',
    cryptoError: 'Ce navigateur ne fournit pas de source aléatoire sûre. Désactivez le brassage pour conserver l’ordre initial.',
    copied: 'Plan copié',
  },
  sources: [
    {
      label: 'Ministère de l’Éducation nationale : aménager une salle de classe inclusive',
      href: 'https://batiscolaire.education.gouv.fr/fiche-pratique-amenager-une-salle-de-classe-inclusive-240782',
      note: 'Présente l’adaptabilité, le mobilier, l’acoustique et le confort visuel parmi les points à examiner.',
    },
    {
      label: 'Bâti Scolaire : livret Accessibilité',
      href: 'https://batiscolaire.education.gouv.fr/livret-accessibilite-240489',
      note: 'Replace les cheminements, équipements, repères, éclairage et usages dans une approche globale.',
    },
    {
      label: 'CNIL : minimiser les données collectées',
      href: 'https://www.cnil.fr/fr/minimiser-les-donnees-collectees',
      note: 'Rappelle de limiter les données personnelles à ce qui est pertinent et nécessaire.',
    },
    {
      label: 'MDN : Crypto.getRandomValues()',
      href: 'https://developer.mozilla.org/fr/docs/Web/API/Crypto/getRandomValues',
      note: 'Documente la source aléatoire forte utilisée par le brassage.',
    },
    {
      label: 'OWASP : CSV Injection',
      href: 'https://owasp.org/www-community/attacks/CSV_Injection',
      note: 'Explique le risque des valeurs interprétées comme formules par un tableur.',
    },
  ],
  privacyNote: 'La liste, le brassage et la grille restent dans la mémoire de cet onglet. FunnyTools ne reçoit ni ne stocke les noms. La copie, l’impression et le CSV ne sont créés qu’à votre demande.',
  disclaimer: 'Outil de préparation. Le plan final doit respecter les aménagements autorisés, l’accessibilité, la sécurité, la vie privée et les règles de l’établissement ou de l’examen.',
};

export const frenchSeatingChartReview = {
  heading: 'Contrôle du plan avant son utilisation',
  intro: 'Faire tenir toute la liste dans une grille ne suffit pas : le placement doit fonctionner dans la salle et pour les personnes.',
  panels: [
    { title: 'Salle', text: 'Vérifiez le devant, les portes, les passages, le mobilier, la lumière et l’acoustique.' },
    { title: 'Personnes', text: 'Appliquez les aménagements nécessaires sans révéler leur motif sur le plan partagé.' },
    { title: 'Version', text: 'Ouvrez le CSV ou le PDF réellement diffusé et identifiez la date du plan.' },
  ],
  checklistHeading: 'Liste de contrôle',
  checklist: [
    'Chaque personne dispose d’une place identifiable sans doublon ambigu.',
    'Les accès, cheminements et sorties restent utilisables.',
    'Vision, audition, mobilité, accompagnement et participation ont été examinés.',
    'Le devant de salle et le sens des rangées sont indiqués.',
    'La version partagée contient seulement les données nécessaires.',
  ],
};

export const frenchClassGroupGenerator: ToolContent = {
  name: 'Générateur de groupes pour la classe',
  short: 'Formez des groupes par nombre d’équipes ou par effectif maximal, avec ordre conservé ou brassage sécurisé, puis copiez ou exportez le résultat.',
  long: 'Ce générateur de groupes pour la classe répond à deux contraintes différentes : créer un nombre précis d’équipes ou limiter le nombre de personnes dans chaque équipe. Il peut conserver l’ordre collé ou le brasser grâce à Web Crypto. La répartition équilibre des effectifs, pas des profils : elle ne connaît ni acquis, ni besoins, ni rôles, ni relations. Elle fournit une première composition explicite que l’enseignant doit revoir en fonction de l’activité.',
  seoTitle: 'Générateur de groupes de classe | Nombre ou effectif',
  seoDescription: 'Collez la liste et créez des groupes par nombre d’équipes ou taille maximale. Brassage sécurisé, répartition, copie et CSV sans inscription.',
  keywords: [
    'générateur de groupes classe',
    'créer des groupes élèves',
    'faire des groupes aléatoires',
    'répartir élèves en groupes',
    'former équipes classe',
    'groupes de travail élèves',
    'composition groupes pédagogiques',
    'groupe par effectif',
  ],
  capabilities: [
    'Créer un nombre exact de groupes dont les effectifs diffèrent au plus d’une personne.',
    'Créer des groupes jusqu’à un effectif maximal et afficher le dernier groupe restant.',
    'Conserver l’ordre d’entrée ou appliquer un brassage sécurisé avec Web Crypto.',
    'Refuser les entrées identiques pour que chaque affectation reste identifiable.',
    'Copier tous les groupes dans un texte prêt à coller.',
    'Télécharger un CSV groupe–membre avec protection contre les formules de tableur.',
  ],
  contentSections: [
    {
      heading: 'Réponse directe : nombre de groupes ou personnes par groupe',
      paragraphs: [
        'Choisissez « Nombre de groupes » lorsque le dispositif impose un nombre d’ateliers, de sujets, de tables ou de matériels. Avec 25 personnes et 6 groupes, la répartition donne un groupe de 5 et cinq groupes de 4. Choisissez « Personnes par groupe » lorsque l’interaction impose une taille maximale. Avec 25 personnes et une taille de 4, six groupes de 4 et un dernier groupe de 1 sont créés.',
        'Collez une personne par ligne, décidez de brasser ou non, puis générez. En mode nombre, les entrées sont distribuées à tour de rôle entre les groupes. En mode taille, elles sont prises par blocs successifs. Modifier la liste ou un réglage efface le résultat précédent pour éviter de publier un fichier qui ne correspond plus aux entrées visibles.',
      ],
      items: [
        '28 élèves en 7 groupes : 4 personnes dans chaque groupe.',
        '29 élèves par groupes de 4 : sept groupes de 4, puis un groupe de 1 à corriger.',
        '30 élèves en 8 groupes : six groupes de 4 et deux groupes de 3.',
        'Un dernier groupe trop petit appelle une décision pédagogique, pas un clic répété.',
      ],
    },
    {
      heading: 'Aléatoire, homogène ou hétérogène : trois notions différentes',
      paragraphs: [
        'Un groupe aléatoire décrit le mode de constitution. Il peut, par hasard, réunir plusieurs personnes très autonomes ou priver une équipe d’une compétence utile. Un groupe homogène rapproche des profils selon un critère annoncé ; un groupe hétérogène cherche une diversité pertinente. Aucun choix n’est systématiquement supérieur. L’objectif, la durée, la tâche, les ressources et le mode d’accompagnement déterminent le type de composition.',
        'Le générateur ne demande pas les notes, diagnostics, catégories sociales ou difficultés. C’est une limite utile pour la vie privée. Si l’activité exige une complémentarité, produisez une première répartition avec des prénoms ou codes, puis ajustez-la avec vos informations professionnelles dans le système prévu par l’établissement. Ne transformez pas un regroupement ponctuel en étiquette durable.',
      ],
    },
    {
      heading: 'Concevoir le travail de groupe, pas seulement distribuer des noms',
      paragraphs: [
        'Réseau Canopé présente la coopération comme un objet qui doit être organisé et enseigné, avec des formes telles que l’entraide, le travail de groupe, l’aide et le tutorat. Mettre quatre élèves autour d’une table ne crée donc pas automatiquement une activité coopérative. Il faut préciser le problème à résoudre, le produit attendu, le temps disponible, les ressources et la contribution de chacun.',
        'Avant d’annoncer les groupes, préparez une consigne qui ne peut pas être accomplie par une seule personne pendant que les autres attendent. Définissez si les rôles sont nécessaires : animation, rapport, gestion du temps, matériel ou vérification. Faites tourner ces rôles sur plusieurs séances afin qu’une personne ne soit pas assignée en permanence à la même fonction.',
      ],
      items: [
        'Une consigne commune et un résultat observable.',
        'Une responsabilité individuelle identifiable dans le travail collectif.',
        'Des rôles compréhensibles et, si possible, rotatifs.',
        'Un temps de bilan sur le résultat et sur la coopération.',
      ],
    },
    {
      heading: 'Effectif du groupe et cas du dernier élève isolé',
      paragraphs: [
        'Les petits groupes facilitent la prise de parole et rendent la participation visible. Les grands groupes réunissent plus de ressources, mais demandent davantage de coordination et peuvent laisser certains membres en retrait. Le nombre idéal n’existe pas indépendamment de la tâche : une correction en binôme, une discussion à quatre et un projet à six ne mobilisent pas les mêmes interactions.',
        'Le mode par taille respecte strictement la limite saisie. Il peut donc laisser une seule personne dans le dernier groupe. Ce résultat est mathématiquement cohérent mais souvent pédagogiquement inadapté. Réduisez la taille, passez au mode « Nombre de groupes » ou déplacez manuellement un membre pour créer deux groupes légèrement différents. Expliquez le critère plutôt que de relancer le hasard jusqu’à obtenir une composition préférée.',
      ],
    },
    {
      heading: 'Groupes de besoins : évolutifs et liés à un objectif',
      paragraphs: [
        'Un groupe de besoins n’est pas un niveau définitif attribué à l’élève. Le vademecum Éduscol sur les groupes de besoins insiste sur des groupes évolutifs et sur la nécessité d’éviter l’assignation. Cette page ne sait pas diagnostiquer un besoin : elle peut seulement répartir une liste déjà préparée. Si vous l’utilisez dans ce contexte, associez la composition à une compétence, une séance et une prochaine date de réexamen.',
        'N’affichez pas publiquement des intitulés comme « faibles » et « forts ». Nommez plutôt la tâche, l’atelier ou la stratégie travaillée. Un changement de groupe doit pouvoir résulter d’une observation récente et pas d’un historique figé. Pour des décisions à fort enjeu, utilisez les procédures et outils institutionnels, pas un générateur aléatoire.',
      ],
    },
    {
      heading: 'Brassage, équité perçue et reproductibilité',
      paragraphs: [
        'Le brassage utilise Fisher–Yates, des nombres issus de `crypto.getRandomValues()` et un rejet de biais. Il est adapté à une attribution dont la règle est réellement aléatoire. Il n’offre toutefois pas de preuve que les groupes sont équitables sur toutes les dimensions. L’équité se juge aussi sur l’accès aux rôles, la difficulté des tâches, les adaptations et la possibilité de contribuer.',
        'Aucune graine n’est conservée. Le même clic répété produit normalement d’autres équipes. Pour un ordre de passage ou une évaluation, exportez immédiatement la version retenue et conservez-la avec sa date. Si vous devez respecter des contraintes nommées, formulez-les avant le tirage et documentez les modifications ensuite.',
      ],
    },
    {
      heading: 'CSV, RGPD et données strictement nécessaires',
      paragraphs: [
        'Le CSV contient seulement le numéro du groupe et l’entrée correspondante. Une protection est ajoutée lorsque la cellule pourrait être interprétée comme une formule par un tableur. Ouvrez le fichier, vérifiez les accents, le séparateur, l’ordre et le nombre total de personnes. Une copie locale peut ensuite être adaptée dans l’environnement autorisé.',
        'La CNIL demande de limiter les données personnelles à la finalité. Un prénom complété par une initiale ou un code temporaire suffit souvent. N’insérez pas notes, besoins médicaux, mesures disciplinaires ou commentaires dans la liste. FunnyTools ne reçoit pas les noms pour effectuer le partage, mais le presse-papiers et le CSV sortent de l’onglet : contrôlez où vous les collez, à qui vous les envoyez et combien de temps ils sont conservés.',
      ],
    },
  ],
  instructions: [
    'Collez au moins deux personnes, une par ligne, et distinguez les homonymes.',
    'Choisissez un nombre de groupes ou un effectif maximal par groupe.',
    'Conservez l’ordre si la liste est déjà préparée ; activez le brassage pour une première répartition aléatoire.',
    'Créez les groupes puis contrôlez le dernier effectif, les contraintes et la participation.',
    'Définissez la tâche, les rôles, le temps et le produit avant de publier la composition.',
    'Copiez ou téléchargez `groupes-classe.csv`, puis vérifiez la version communiquée.',
  ],
  examples: [
    'Répartir 28 élèves sur sept postes de manipulation.',
    'Créer des groupes de quatre maximum pour une discussion courte.',
    'Conserver une liste ordonnée afin de distribuer successivement les profils préparés.',
    'Brasser les participants d’un atelier ponctuel, puis corriger un dernier groupe isolé.',
    'Exporter un ordre de travail en CSV pour ajouter ensuite les rôles dans un document interne.',
  ],
  audience: [
    'Enseignants préparant ateliers, projets, débats ou travaux pratiques.',
    'Formateurs et animateurs répartissant des participants.',
    'Équipes qui doivent respecter un nombre de postes ou un effectif maximal.',
    'Personnes souhaitant une répartition locale et explicite sans inscription.',
  ],
  caseStudies: [
    {
      title: 'Sept ateliers scientifiques',
      description: 'Une professeure répartit 28 élèves en sept équipes égales. Elle vérifie ensuite que les aménagements et compétences nécessaires sont accessibles à chaque poste avant d’attribuer des rôles.',
    },
    {
      title: 'Discussion en groupes de quatre',
      description: 'Avec 29 participants, le mode taille laisse une personne seule. Le formateur passe au mode huit groupes, obtient six groupes de quatre et deux de trois, puis explique ce choix.',
    },
    {
      title: 'Groupes de besoins réexaminés',
      description: 'L’équipe prépare une liste liée à une compétence précise et désactive le brassage. La composition est datée, les ateliers portent le nom des stratégies travaillées et une nouvelle observation est prévue.',
    },
  ],
  notes: [
    'Des effectifs proches ne garantissent pas une composition pédagogique pertinente.',
    'Le mode par taille peut produire un dernier groupe d’une seule personne.',
    'Le brassage n’est pas reproductible par une graine ; conservez le CSV retenu.',
    'Les doublons exacts sont refusés afin que chaque affectation soit identifiable.',
    'Les rôles, besoins, contraintes et conflits ne sont ni demandés ni déduits.',
    'La liste et le résultat disparaissent au rechargement de la page.',
  ],
  faq: [
    { q: 'Comment faire des groupes aléatoires en classe ?', a: 'Collez une personne par ligne, choisissez le nombre ou la taille, gardez le brassage activé et cliquez sur Créer les groupes. Examinez ensuite la faisabilité pédagogique.' },
    { q: 'Quelle différence entre nombre de groupes et taille des groupes ?', a: 'Le premier mode crée exactement le nombre demandé avec des effectifs proches. Le second respecte une taille maximale et peut produire un petit dernier groupe.' },
    { q: 'Les groupes ont-ils toujours le même effectif ?', a: 'En mode nombre, l’écart est au plus d’une personne. En mode taille, tous les groupes sauf le dernier atteignent généralement la limite choisie.' },
    { q: 'Le générateur crée-t-il des groupes hétérogènes ?', a: 'Non. Il ne connaît aucun profil. Le brassage est aléatoire ; l’hétérogénéité pertinente doit être examinée en fonction de la tâche.' },
    { q: 'Peut-on conserver l’ordre de la liste ?', a: 'Oui. Désactivez le brassage. Le mode nombre distribuera à tour de rôle ; le mode taille formera des blocs successifs.' },
    { q: 'Pourquoi un groupe ne contient-il qu’une personne ?', a: 'Le mode par taille ne dépasse jamais la limite. Modifiez la taille, choisissez le nombre de groupes ou rééquilibrez manuellement.' },
    { q: 'Pourquoi les noms en double sont-ils bloqués ?', a: 'Deux entrées identiques ne peuvent pas être distinguées dans le résultat ou le CSV. Ajoutez une initiale ou un identifiant minimal.' },
    { q: 'La liste des élèves est-elle enregistrée ?', a: 'Non. Elle reste dans cet onglet. Le fichier ou le texte copié doit ensuite être géré conformément aux règles de votre établissement.' },
  ],
  labels: {
    input: 'Liste des élèves ou participants',
    placeholder: 'Une personne par ligne…\nCamille D.\nNora B.\nLucas M.\nInès R.',
    mode: 'Mode de répartition',
    byGroupCount: 'Nombre de groupes',
    byGroupSize: 'Personnes par groupe',
    groupCount: 'Nombre de groupes',
    groupSize: 'Effectif maximal',
    shuffle: 'Brasser de façon sécurisée',
    generate: 'Créer les groupes',
    copyAll: 'Tout copier',
    exportCsv: 'Télécharger le CSV',
    csvGroup: 'Groupe',
    csvMember: 'Membre',
    csvFilename: 'groupes-classe.csv',
    reset: 'Réinitialiser',
    groupLabel: 'Groupe {n}',
    summary: 'Groupes créés',
    emptyResult: 'Les groupes apparaîtront ici',
    emptyError: 'Saisissez au moins deux personnes.',
    duplicateListError: 'La liste contient des noms identiques. Ajoutez une initiale, un numéro ou un alias pour les distinguer.',
    invalidCountError: 'Le nombre de groupes doit être un entier compris entre 1 et le nombre de personnes.',
    invalidSizeError: 'L’effectif doit être un entier compris entre 1 et le nombre de personnes.',
    cryptoError: 'Ce navigateur ne fournit pas de source aléatoire sûre. Désactivez le brassage pour conserver l’ordre initial.',
    copied: 'Groupes copiés',
  },
  sources: [
    {
      label: 'Réseau Canopé : la coopération entre élèves',
      href: 'https://www.reseau-canope.fr/notice/la-cooperation-entre-eleves',
      note: 'Distingue travail de groupe, entraide, aide et tutorat et souligne la nécessité d’organiser la coopération.',
    },
    {
      label: 'Éduscol : vademecum des groupes de besoins',
      href: 'https://eduscol.education.fr/document/58272/download?attachment=',
      note: 'Souligne le caractère évolutif des groupes et la vigilance face au risque d’assignation.',
    },
    {
      label: 'Éduscol : travailler en groupe',
      href: 'https://eduscol.education.fr/document/33791/download',
      note: 'Présente plusieurs modalités de travail en groupe et des outils de préparation, dont les listes aléatoires.',
    },
    {
      label: 'CNIL : principe de minimisation',
      href: 'https://www.cnil.fr/fr/definition/minimisation',
      note: 'Rappelle que les données doivent rester adéquates, pertinentes et limitées au nécessaire.',
    },
    {
      label: 'MDN : Crypto.getRandomValues()',
      href: 'https://developer.mozilla.org/fr/docs/Web/API/Crypto/getRandomValues',
      note: 'Documente la source aléatoire forte utilisée par le brassage local.',
    },
  ],
  privacyNote: 'La liste, le brassage et les groupes vivent dans la mémoire de cet onglet. FunnyTools ne reçoit ni noms ni résultats. Le CSV est généré localement lorsque vous le demandez.',
  disclaimer: 'Aide à la préparation. Contrôlez objectif, effectif, composition, aménagements, participation, rôles et confidentialité avant de communiquer les groupes.',
};

export const frenchClassGroupGeneratorReview = {
  heading: 'Contrôle pédagogique avant d’annoncer les groupes',
  intro: 'Une répartition régulière en nombre peut encore être inadéquate pour la tâche ou pour certaines personnes.',
  panels: [
    { title: 'Effectifs', text: 'Vérifiez que chaque groupe peut travailler et que personne ne reste isolé.' },
    { title: 'Composition', text: 'Appliquez les contraintes utiles sans figer les élèves dans une catégorie.' },
    { title: 'Coopération', text: 'Précisez la consigne, les rôles, le temps et la responsabilité individuelle.' },
  ],
  checklistHeading: 'Liste de contrôle',
  checklist: [
    'La liste correspond aux participants présents et les homonymes sont distingués.',
    'Le mode choisi répond à une contrainte identifiable.',
    'Aucun groupe n’est rendu impraticable par sa taille ou sa composition.',
    'La tâche et les modalités de participation sont annoncées.',
    'La version diffusée ne contient que les données utiles.',
  ],
};

export const frenchPercentileRank: ToolContent = {
  name: 'Calculateur de rang percentile',
  short: 'Calculez la position relative d’un score à partir du nombre de valeurs inférieures, du nombre d’ex æquo et de l’effectif total.',
  long: 'Ce calculateur de rang percentile applique la convention du rang moyen en cas d’ex æquo : RP = 100 × (B + 0,5 × E) / N. B désigne les scores strictement inférieurs, E toutes les observations égales au score étudié et N l’effectif du groupe de référence. La page affiche aussi les parts situées en dessous, à égalité et au-dessus. Elle ne recherche pas la valeur d’un centile dans une série et ne remplace aucun barème officiel.',
  seoTitle: 'Rang percentile avec ex æquo | Calculateur',
  seoDescription: 'Calculez RP = 100 × (B + 0,5E) / N avec scores inférieurs, ex æquo et effectif. Interprétation, exemple et limites du percentile.',
  keywords: [
    'calculateur rang percentile',
    'calcul percentile score',
    'formule rang percentile',
    'rang centile calcul',
    'percentile avec ex aequo',
    'position relative score',
    'pourcentage sous un score',
    'percentile statistique éducation',
  ],
  capabilities: [
    'Calculer un rang percentile selon la convention du rang moyen pour les ex æquo.',
    'Afficher séparément le pourcentage inférieur, égal et supérieur au score.',
    'Contrôler que B, E et N sont des effectifs entiers cohérents.',
    'Placer chaque observation ex æquo au milieu du bloc de rangs partagé.',
    'Vérifier un exercice ou un calcul manuel sans transmettre de scores.',
    'Distinguer rang percentile, centile, note et pourcentage de réussite.',
  ],
  contentSections: [
    {
      heading: 'Réponse directe : calculer un rang percentile',
      paragraphs: [
        'Comptez les observations dont le score est strictement inférieur et saisissez ce nombre dans B. Comptez ensuite toutes les observations exactement égales au score étudié, y compris la personne ou le cas concerné, et saisissez E. N est l’effectif complet du même groupe de référence. La formule place le bloc d’ex æquo au milieu des rangs qu’il occupe.',
        'Exemple : parmi 40 scores, 24 sont inférieurs et 2 sont égaux. RP = 100 × (24 + 0,5 × 2) / 40 = 62,5. La page indique aussi 60 % en dessous, 5 % à égalité et 35 % au-dessus. Un rang percentile de 62,5 ne signifie ni une note de 62,5 sur 100, ni 62,5 % de bonnes réponses.',
      ],
      items: [
        'B exclut toujours les ex æquo.',
        'E vaut au moins 1 puisque le score étudié appartient au groupe.',
        'N inclut chaque observation du groupe de comparaison.',
        'B + E ne peut pas dépasser N.',
      ],
    },
    {
      heading: 'Percentile, centile et rang percentile : éviter la confusion',
      paragraphs: [
        'En français, « centile » désigne généralement une valeur-seuil qui partage une distribution ordonnée en cent parts. L’Insee définit les centiles comme les seuils qui partitionnent une population en cent sous-populations de même taille. Le 90e centile est donc une valeur de la variable. Le rang percentile part au contraire d’une valeur déjà connue et exprime sa position relative sur une échelle de 0 à 100.',
        'Le mot « percentile » est aussi employé dans les publications francophones, notamment pour des résultats d’évaluation. Le vocabulaire peut varier selon le domaine et le logiciel. Avant de comparer deux nombres, cherchez si la source parle d’un seuil P90, d’un rang percentile, d’un pourcentage cumulé ou d’un rang transformé. Cette page calcule uniquement la position par comptage B, E et N.',
      ],
    },
    {
      heading: 'Pourquoi la formule attribue la moitié des ex æquo',
      paragraphs: [
        'Lorsque plusieurs observations ont la même valeur, rien ne permet de les ordonner entre elles. Les placer toutes au début du bloc sous-estimerait leur position ; les placer toutes à la fin la surestimerait. Le rang moyen attribue à chacune le centre des rangs occupés. En comptant les valeurs strictement inférieures, cela revient à ajouter la moitié du nombre E.',
        'NIST présente le percentage rank sous la forme 100 × (rang − 0,5) / N et utilise le rang moyen pour les valeurs égales. Cette écriture conduit à 100 × (B + 0,5E) / N lorsqu’on raisonne avec des effectifs. D’autres conventions existent, notamment B/N, (B + E)/N ou des formules en (N − 1). Pour reproduire un rapport, utilisez sa formule explicite plutôt que le seul mot percentile.',
      ],
    },
    {
      heading: 'Groupe de référence : la partie la plus importante du résultat',
      paragraphs: [
        'Un rang percentile n’existe pas sans population de comparaison. Un score peut être élevé dans une classe et moyen dans une cohorte nationale ; il peut changer de position quand la difficulté du test, l’âge, le programme ou la date changent. Accompagnez toujours RP du groupe, de N, de l’évaluation et de la période.',
        'La calculatrice n’intègre aucun barème. Si un test standardisé fournit des tables par âge, niveau scolaire ou édition, utilisez la table autorisée du manuel. Compter les scores d’une seule classe ne recrée pas un étalonnage national. Pour une décision d’orientation, un diagnostic ou une sélection, le calcul doit être validé dans le processus professionnel compétent.',
      ],
    },
    {
      heading: 'Petits effectifs, valeurs extrêmes et fausse précision',
      paragraphs: [
        'Avec N = 10 et sans ex æquo, une place fait varier le résultat d’environ dix points. Les deux décimales affichées servent à contrôler l’arithmétique ; elles ne prouvent pas que la position est mesurée avec cette précision. Indiquez l’effectif et évitez d’interpréter une différence minime entre deux petits groupes.',
        'Selon la convention utilisée ici, une valeur minimale unique dans N = 20 obtient 2,5 et une valeur maximale unique 97,5. Chaque observation occupe le centre de son intervalle de 5 points. Ne pas atteindre 0 ou 100 est donc attendu. Un système qui produit exactement ces extrêmes applique probablement une autre convention.',
      ],
    },
    {
      heading: 'Rang percentile, note et progression ne répondent pas à la même question',
      paragraphs: [
        'Une note mesure un résultat selon un barème ; un pourcentage de réussite rapporte des points obtenus aux points possibles ; le rang percentile compare ce résultat aux autres observations. Avec 18 réponses correctes sur 20, la réussite vaut 90 %. Le RP peut pourtant être faible si presque tout le groupe obtient 19 ou 20, ou élevé si la plupart des scores sont inférieurs.',
        'Une progression individuelle peut aussi coexister avec un rang stable si tout le groupe progresse. À l’inverse, un RP peut monter sans augmentation importante du score direct lorsque le groupe rencontre davantage de difficultés. Pour suivre les apprentissages, conservez le score brut, les compétences évaluées et les conditions de passation au lieu de résumer la situation par un rang.',
      ],
    },
    {
      heading: 'Comment rédiger une interprétation vérifiable',
      paragraphs: [
        'Une formulation complète pourrait être : « Dans le groupe de 40 élèves ayant passé l’évaluation de mai, 24 scores sont inférieurs et 2 sont égaux ; avec la convention du rang moyen pour les ex æquo, le rang percentile est 62,5. » Vous pouvez ajouter les parts en dessous, égales et au-dessus. Cette phrase rend les comptages et la méthode contrôlables.',
        'Évitez « meilleur que 62,5 % » lorsque des ex æquo existent : 60 % sont strictement en dessous et 5 % partagent le score. Évitez aussi de transformer le résultat en étiquette personnelle, pronostic ou diagnostic. Les évaluations scolaires doivent éclairer les acquis et l’accompagnement ; un indicateur isolé n’explique pas la cause d’un résultat.',
      ],
    },
    {
      heading: 'Données locales et contrôle manuel de la formule',
      paragraphs: [
        'Les trois effectifs sont calculés dans le navigateur et ne sont pas envoyés à FunnyTools. Aucun nom n’est nécessaire. Pour vérifier manuellement, calculez d’abord E ÷ 2, ajoutez B, divisez par N, puis multipliez par 100. Les trois parts affichées doivent totaliser 100 %, aux arrondis près.',
        'La confidentialité locale ne rend pas automatiquement une analyse conforme. Travaillez avec des données agrégées, évitez de saisir des identifiants dans d’autres documents et appliquez les règles de votre organisation. Si le résultat entre dans une décision importante, conservez la source des comptages et faites valider la méthode.',
      ],
    },
  ],
  instructions: [
    'Identifiez un seul score et un groupe de référence cohérent.',
    'Comptez les scores strictement inférieurs et saisissez B.',
    'Comptez tous les scores égaux, score étudié compris, et saisissez E.',
    'Saisissez l’effectif complet N, avec B + E ≤ N.',
    'Calculez puis contrôlez RP = 100 × (B + 0,5 × E) / N.',
    'Rapportez le résultat avec N, la population, la date et la convention utilisée.',
  ],
  examples: [
    'B = 24, E = 2, N = 40 : RP = 62,5.',
    'B = 0, E = 1, N = 20 : RP = 2,5 pour la valeur minimale unique.',
    'B = 19, E = 1, N = 20 : RP = 97,5 pour la valeur maximale unique.',
    'B = 15, E = 4, N = 25 : RP = 68, avec 60 % en dessous et 16 % à égalité.',
    'Comparer un calcul manuel à la sortie d’un logiciel lorsque les deux déclarent la même convention.',
  ],
  audience: [
    'Élèves et étudiants qui apprennent les mesures de position.',
    'Enseignants vérifiant un exemple statistique ou une petite série.',
    'Analystes qui doivent documenter une convention simple avec ex æquo.',
    'Toute personne disposant déjà des comptages B, E et N.',
  ],
  caseStudies: [
    {
      title: 'Exercice de statistique descriptive',
      description: 'Une classe ordonne 40 résultats, compte 24 valeurs inférieures et deux égales, puis vérifie 62,5 à la main. Elle distingue ensuite ce rang du 62,5e centile de la série.',
    },
    {
      title: 'Contrôle d’un rapport',
      description: 'Une analyste lit la méthode du logiciel avant de comparer. Elle constate que le rapport utilise le rang moyen, saisit les mêmes effectifs et documente N ainsi que la date.',
    },
    {
      title: 'Petit groupe',
      description: 'Un enseignant obtient 72,5 dans un groupe de 20. Il communique aussi N = 20 et le score brut, et refuse d’interpréter deux décimales comme une grande précision.',
    },
  ],
  notes: [
    'La formule utilisée est RP = 100 × (B + 0,5E) / N.',
    'Le rang moyen n’est qu’une convention parmi plusieurs méthodes publiées.',
    'Un rang percentile n’est ni une note, ni un taux de bonnes réponses, ni un centile-seuil.',
    'La population de référence et sa date sont indispensables à l’interprétation.',
    'Les petits effectifs produisent de grands pas entre les positions possibles.',
    'La calculatrice ne contient aucun barème normatif et ne produit aucun diagnostic.',
  ],
  faq: [
    { q: 'Quelle est la formule du rang percentile ?', a: 'Cette page utilise RP = 100 × (B + 0,5 × E) / N, avec B valeurs inférieures, E valeurs égales et N observations au total.' },
    { q: 'Quelle différence entre centile et rang percentile ?', a: 'Un centile est une valeur-seuil de la distribution. Le rang percentile part d’un score et indique sa position relative. Les usages terminologiques peuvent varier selon les sources.' },
    { q: 'Pourquoi ajouter la moitié des ex æquo ?', a: 'Tous les scores égaux occupent le même bloc de rangs. Leur attribuer le milieu du bloc évite de les placer arbitrairement au début ou à la fin.' },
    { q: 'Pourquoi le minimum n’obtient-il pas 0 ?', a: 'Le rang moyen place chaque observation au centre de sa portion. Une valeur minimale unique obtient donc 50/N plutôt que 0.' },
    { q: 'Un rang percentile de 80 signifie-t-il 80 % de réussite ?', a: 'Non. La réussite dépend du barème de l’épreuve. Le RP décrit une position dans un groupe de référence.' },
    { q: 'Peut-on comparer deux rangs percentiles ?', a: 'Seulement si les populations, évaluations, dates et conventions sont suffisamment comparables. Sinon, la différence peut venir du contexte.' },
    { q: 'Puis-je utiliser ce calcul pour un test étalonné ?', a: 'Uniquement si le manuel prescrit exactement cette convention et le groupe approprié. Une table normative officielle doit être utilisée lorsqu’elle existe.' },
    { q: 'Les effectifs saisis sont-ils envoyés au serveur ?', a: 'Non. B, E, N et les résultats sont calculés dans cet onglet. Aucun nom n’est requis.' },
  ],
  labels: {
    below: 'Scores strictement inférieurs (B)',
    equal: 'Scores égaux, ex æquo compris (E)',
    total: 'Effectif total du groupe (N)',
    calculate: 'Calculer le rang percentile',
    result: 'Rang percentile (RP)',
    belowPercent: 'Part strictement inférieure',
    tiedPercent: 'Part à égalité',
    abovePercent: 'Part strictement supérieure',
    invalid: 'Saisissez des effectifs entiers valides : B ≥ 0, E ≥ 1, N ≥ 1 et B + E ne doit pas dépasser N.',
  },
  sources: [
    {
      label: 'Insee : définition des centiles',
      href: 'https://www.insee.fr/fr/metadonnees/definition/c1284',
      note: 'Définit les centiles comme des valeurs-seuils partageant une population ordonnée en cent sous-populations.',
    },
    {
      label: 'DEPP : définitions des termes et indicateurs statistiques',
      href: 'https://www.education.gouv.fr/depp/les-definitions-des-termes-et-indicateurs-statistiques-de-l-education-nationale-5123',
      note: 'Présente notamment quartiles et mesures utilisées dans les statistiques de l’éducation.',
    },
    {
      label: 'NIST Dataplot : Percentage Rank',
      href: 'https://www.itl.nist.gov/div898/software/dataplot/refman2/auxillar/percrank.htm',
      note: 'Documente la formule 100 × (rang − 0,5) / N et le rang moyen pour les ex æquo.',
    },
    {
      label: 'NIST/SEMATECH : Percentiles',
      href: 'https://itl.nist.gov/div898/handbook/prc/section2/prc262.htm',
      note: 'Montre que plusieurs conventions et méthodes d’interpolation coexistent.',
    },
    {
      label: 'Ministère de l’Éducation nationale : finalités de l’évaluation',
      href: 'https://www.education.gouv.fr/le-conseil-d-evaluation-de-l-ecole/finalites-et-enjeux-de-l-evaluation-des-eleves-au-college-470495',
      note: 'Replace l’évaluation dans une démarche de progrès, d’analyse et d’aide à la décision.',
    },
  ],
  privacyNote: 'B, E, N et les résultats sont calculés dans cette page. FunnyTools ne reçoit ni score individuel, ni nom, ni donnée sur le groupe.',
  disclaimer: 'Outil pédagogique appliquant une convention précise. Vérifiez le manuel, le barème, le logiciel ou le protocole avant de communiquer un résultat ou de prendre une décision.',
};

export const frenchPercentileRankReview = {
  heading: 'Contrôle statistique avant de communiquer le résultat',
  intro: 'Une formule juste peut produire une comparaison trompeuse si le groupe ou la convention ne correspond pas.',
  panels: [
    { title: 'Effectifs', text: 'B exclut les ex æquo, E les inclut tous et B + E ne dépasse pas N.' },
    { title: 'Référence', text: 'La population, l’évaluation, la période et l’effectif sont explicités.' },
    { title: 'Convention', text: 'Le rang moyen est déclaré et distingué du centile et du taux de réussite.' },
  ],
  checklistHeading: 'Liste de contrôle',
  checklist: [
    'Le score étudié appartient bien au groupe N.',
    'Tous les comptages viennent de la même population et de la même évaluation.',
    'La formule correspond à la source ou au logiciel à reproduire.',
    'Le résultat est rapporté avec N et le contexte.',
    'Aucune conclusion diagnostique ou prédictive n’est tirée du seul rang.',
  ],
};
