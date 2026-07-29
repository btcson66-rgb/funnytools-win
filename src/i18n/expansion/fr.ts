import type { ToolContent } from '../tools/_types';

export const frenchHome = {
  seoTitle: 'Outils en ligne gratuits, pratiques et vérifiables',
  seoDescription: 'Utilisez gratuitement des outils de calcul et de PDF dans votre navigateur, sans inscription, avec des explications en français et des résultats à vérifier.',
  keywords: [
    'outils en ligne gratuits',
    'outils gratuits sans inscription',
    'outil navigateur',
    'calcul moyenne notes',
    'fusionner PDF',
    'outils pratiques en français',
  ],
  faq: [
    {
      q: 'Les outils FunnyTools sont-ils vraiment gratuits ?',
      a: 'Oui. Les outils actuellement proposés en français sont accessibles sans compte, sans installation et sans paiement. Une connexion reste nécessaire pour charger le site.',
    },
    {
      q: 'Faut-il envoyer ses notes ou ses PDF à FunnyTools ?',
      a: 'Non pour produire le résultat. Les calculs et la fusion des PDF s’exécutent dans le navigateur. Consultez néanmoins la politique de votre établissement ou de votre employeur avant de manipuler un document sensible.',
    },
    {
      q: 'La version française est-elle une traduction automatique ?',
      a: 'Non. Les pages françaises sont rédigées pour les formulations réellement employées en français, avec des exemples, des repères scolaires et des précautions adaptés au contexte d’usage.',
    },
    {
      q: 'Puis-je utiliser le résultat comme document officiel ?',
      a: 'Non. FunnyTools facilite une opération et sa vérification, mais ne remplace ni un relevé de notes, ni un logiciel métier, ni la validation d’une administration ou d’un professionnel.',
    },
    {
      q: 'Pourquoi seules certaines pages existent-elles en français ?',
      a: 'Chaque page est publiée seulement après rédaction, test de l’outil, contrôle mobile et vérification SEO. Aucun lien de langue n’est créé vers une page française inachevée.',
    },
    {
      q: 'Comment signaler une erreur ou une formulation peu naturelle ?',
      a: 'Écrivez à btcson66@gmail.com en indiquant l’adresse de la page, le navigateur utilisé et un exemple ne contenant aucune donnée personnelle.',
    },
  ],
};

export const frenchGradeAverage: ToolContent = {
  name: 'Calculer une moyenne de notes avec coefficients',
  short: 'Calculez une moyenne simple ou pondérée à partir de notes, de barèmes et de coefficients.',
  long: 'Cette calculatrice de moyenne de notes permet de saisir des résultats sur 10, 20, 100 ou tout autre barème cohérent. Elle affiche la somme, la moyenne arithmétique et, si vous renseignez des coefficients, la moyenne pondérée. Le calcul reste dans votre navigateur et peut être contrôlé ligne par ligne avant d’être comparé au bulletin, à l’ENT ou au règlement de l’établissement.',
  seoTitle: 'Calcul moyenne notes avec coefficients',
  seoDescription: 'Calculez une moyenne de notes simple ou pondérée avec coefficients. Outil gratuit, sans inscription, avec formule, exemples et vérifications.',
  keywords: [
    'calcul moyenne notes',
    'calculer une moyenne avec coefficient',
    'moyenne pondérée notes',
    'calcul moyenne sur 20',
    'simulateur moyenne scolaire',
    'moyenne bulletin',
  ],
  capabilities: [
    'Calculer une moyenne arithmétique quand toutes les notes ont la même importance.',
    'Calculer une moyenne pondérée avec des coefficients, des crédits ou des pondérations homogènes.',
    'Conserver une note égale à zéro tout en ignorant une ligne réellement vide.',
    'Copier le récapitulatif ou exporter les données valides dans un fichier CSV.',
  ],
  contentSections: [
    {
      heading: 'Réponse rapide : comment calculer une moyenne de notes',
      paragraphs: [
        'Pour une moyenne simple, additionnez toutes les notes qui appartiennent au même barème, puis divisez la somme par le nombre de notes. Avec 12, 15 et 9 sur 20, le total vaut 36 et la moyenne vaut 12 sur 20. Dans l’outil, saisissez une note par ligne et laissez la colonne « coefficient » vide.',
        'Pour une moyenne avec coefficients, multipliez chaque note par son coefficient, additionnez les produits, puis divisez par la somme des coefficients. Avec 12 coefficient 1, 15 coefficient 2 et 9 coefficient 1, le calcul est (12 + 30 + 9) ÷ 4, soit 12,75. Les coefficients ne doivent pas obligatoirement totaliser 100 : ils doivent surtout suivre la même convention.',
      ],
    },
    {
      heading: 'Moyenne simple, moyenne pondérée et note sur 20',
      paragraphs: [
        'La moyenne simple convient lorsque chaque devoir compte autant. Elle répond par exemple à la question « quelle est la moyenne de mes quatre quiz de même valeur ? ». La moyenne pondérée convient lorsqu’un devoir surveillé, un oral ou un projet ne possède pas le même coefficient. La différence ne vient pas du niveau des notes, mais de la place que chaque évaluation occupe dans la règle de calcul.',
        'Une note sur 20 n’a rien de particulier pour la formule. L’outil accepte aussi un barème sur 10, 30 ou 100. En revanche, il ne faut pas mélanger directement 8 sur 10 et 14 sur 20. Convertissez d’abord les données vers une échelle commune, ou appliquez la méthode explicitement prévue par l’établissement. Une conversion automatique pourrait masquer un plafond, une compétence non compensable ou une règle d’arrondi.',
      ],
    },
    {
      heading: 'À quoi sert un coefficient dans un bulletin',
      paragraphs: [
        'Un coefficient représente un poids relatif. Un travail coefficient 4 compte deux fois plus qu’un travail coefficient 2 dans la moyenne pondérée. Les coefficients 1, 2 et 3 produisent le même rapport que 10, 20 et 30. Ce qui importe est la proportion entre les poids, pas leur somme absolue.',
        'Le terme « coefficient » est courant en France, mais d’autres systèmes parlent de pondération, de crédits ou de pourcentage. Ne mélangez pas 30 % avec le nombre 0,4 si les autres lignes utilisent 40. L’outil divise par la somme réelle des poids : une saisie incohérente donne un calcul mathématiquement exact, mais appliqué à une mauvaise règle.',
      ],
    },
    {
      heading: 'Bulletin, ENT, baccalauréat et Parcoursup : ce que l’outil ne décide pas',
      paragraphs: [
        'Une moyenne personnelle peut servir à contrôler une opération, mais le bulletin et l’ENT peuvent appliquer des règles supplémentaires : devoir non noté, absence, rattrapage, note remplacée, compétence, bonus, arrondi ou minimum par matière. Le calcul affiché ici n’accède pas à ces informations. Une différence avec la plateforme ne prouve donc pas automatiquement une erreur.',
        'Les modalités d’un diplôme ou d’une admission peuvent évoluer et associer contrôle continu, épreuves, coefficients et règles propres à une session. Pour le baccalauréat, Parcoursup, un concours ou une équivalence internationale, consultez la page officielle qui correspond à l’année et au profil concernés. FunnyTools ne transforme pas une estimation en note officielle et ne prédit pas une décision d’admission.',
      ],
      link: {
        prefix: 'Le ministère publie une présentation spécifique pour ',
        label: 'le calcul de la note au baccalauréat',
        href: 'https://www.education.gouv.fr/reussir-au-lycee/comment-calculer-votre-note-au-baccalaureat-325511',
        suffix: ' : utilisez-la comme source de règles, et non la formule générique de cette page.',
      },
    },
    {
      heading: 'Comment retrouver une erreur de moyenne',
      paragraphs: [
        'Commencez par un cas que vous savez calculer de tête, par exemple 10 et 14 sans coefficient : le résultat attendu est 12. Ajoutez ensuite deux coefficients identiques ; le résultat doit rester 12. Remplacez enfin les poids par 1 et 3 : la deuxième note doit influencer davantage le résultat. Cette progression vérifie le comportement de l’outil sans dépendre de données personnelles.',
        'Si votre résultat diffère du bulletin, comparez la liste des notes, le barème, les coefficients et la période. Recherchez une ligne vide, un zéro oublié ou un coefficient saisi avec une virgule que le champ numérique n’a pas accepté. Demandez ensuite quelle règle institutionnelle est appliquée. Une capture isolée de la moyenne ne suffit pas : conservez la liste des entrées et la date de consultation.',
      ],
    },
    {
      heading: 'Estimer sans confondre calcul et décision scolaire',
      paragraphs: [
        'Une estimation est utile pour comprendre l’effet d’une évaluation, préparer un entretien ou vérifier une saisie. Elle devient trompeuse lorsqu’elle prétend annoncer une moyenne future sans connaître la note à venir, son coefficient réel et les conditions de compensation. Pour étudier un scénario, indiquez clairement quelles valeurs sont hypothétiques.',
        'Présentez le résultat avec son contexte : « moyenne pondérée estimée à 13,25 sur 20, calculée sur cinq notes et les coefficients indiqués, à confirmer sur l’ENT ». Cette phrase est plus utile qu’un nombre seul, car une autre personne peut reproduire le calcul et identifier ce qui manque.',
      ],
    },
  ],
  formula: {
    expression: 'Moyenne simple = Σxᵢ / n · Moyenne pondérée = Σ(xᵢ × cᵢ) / Σcᵢ',
    explanation: 'xᵢ désigne chaque note valide, n le nombre de notes et cᵢ un coefficient strictement positif. Toutes les notes doivent employer le même barème et tous les coefficients la même convention.',
  },
  instructions: [
    'Vérifiez que toutes les notes portent sur la même échelle et la même période.',
    'Saisissez une note par ligne ; gardez zéro lorsqu’il s’agit d’une vraie note.',
    'Laissez les coefficients vides pour une moyenne simple ou indiquez des poids homogènes.',
    'Comparez la moyenne affichée à un petit calcul manuel dont vous connaissez le résultat.',
    'Copiez ou exportez le récapitulatif, puis confrontez-le à la règle officielle applicable.',
  ],
  examples: [
    'Contrôler la moyenne de plusieurs devoirs ayant tous le même poids.',
    'Calculer une moyenne sur 20 avec des coefficients différents par évaluation.',
    'Simuler un scénario pédagogique en distinguant clairement les notes hypothétiques.',
    'Repérer pourquoi une moyenne personnelle diffère de celle affichée dans l’ENT.',
    'Documenter un calcul avant de demander une explication à l’établissement.',
  ],
  caseStudies: [
    {
      title: 'Trois devoirs de même importance',
      description: 'Une élève saisit 11, 14 et 17 sur 20 sans coefficient. La somme est 42 et la moyenne 14. Elle refait l’addition à la main avant de comparer le résultat à son relevé.',
    },
    {
      title: 'Projet deux fois plus important',
      description: 'Un étudiant saisit 12 coefficient 1 et 16 coefficient 2. La moyenne pondérée est (12 + 32) ÷ 3, soit 14,67. Une moyenne simple de 14 ne respecterait pas la règle annoncée.',
    },
    {
      title: 'Écart avec l’ENT',
      description: 'Une famille obtient 13,20 alors que l’ENT indique 13,00. Elle vérifie les coefficients et découvre qu’une activité était informative, donc exclue de la moyenne officielle. L’outil a correctement calculé les seules entrées fournies.',
    },
  ],
  notes: [
    'Une ligne vide est ignorée, tandis qu’une note égale à zéro reste une donnée valide.',
    'Les notes exprimées sur des barèmes différents doivent être harmonisées selon une règle explicite.',
    'L’arrondi affiché ne remplace pas la règle d’arrondi de l’établissement ou de l’examen.',
    'Les absences, bonus, rattrapages, compétences et seuils non compensables ne sont pas déduits automatiquement.',
    'Le résultat n’est ni un bulletin, ni une décision Parcoursup, ni une attestation de réussite.',
  ],
  faq: [
    {
      q: 'Comment calculer une moyenne sur 20 ?',
      a: 'Additionnez les notes sur 20 puis divisez par leur nombre si elles ont le même poids. Avec des coefficients, additionnez chaque note multipliée par son coefficient puis divisez par la somme des coefficients.',
    },
    {
      q: 'Les coefficients doivent-ils faire 100 ?',
      a: 'Non. Ils peuvent valoir 1, 2 et 3 ou 20, 40 et 60. Le rapport entre les coefficients doit simplement représenter la pondération voulue.',
    },
    {
      q: 'Peut-on saisir une note égale à zéro ?',
      a: 'Oui. Zéro est conservé comme une note valide. Seule une ligne sans note est ignorée.',
    },
    {
      q: 'Puis-je mélanger une note sur 10 et une note sur 20 ?',
      a: 'Pas directement. Ramenez les notes sur un barème commun selon une méthode justifiée, puis vérifiez que cette conversion est autorisée dans votre contexte.',
    },
    {
      q: 'Pourquoi ma moyenne diffère-t-elle de celle de l’ENT ?',
      a: 'L’ENT peut appliquer une exclusion, un rattrapage, un bonus, une règle d’arrondi ou un coefficient que vous n’avez pas saisi. Comparez les entrées avant de conclure à une erreur.',
    },
    {
      q: 'Cette calculatrice donne-t-elle la note nécessaire au prochain devoir ?',
      a: 'Non. Elle calcule les notes déjà saisies. Une estimation future exige de connaître le coefficient et la règle exacte du prochain devoir.',
    },
    {
      q: 'Les notes sont-elles enregistrées ?',
      a: 'Elles sont traitées dans la page et ne sont pas envoyées à FunnyTools pour effectuer le calcul. Rechargez la page et la liste de travail disparaît.',
    },
    {
      q: 'Le résultat est-il valable pour le bac ou Parcoursup ?',
      a: 'Il peut aider à vérifier une opération, mais seules les règles officielles de la session et les données reconnues par l’institution font foi.',
    },
  ],
  labels: {
    score: 'Note',
    weight: 'Coefficient (facultatif)',
    addRow: 'Ajouter une ligne',
    remove: 'Supprimer',
    copy: 'Copier le résultat',
    exportCsv: 'Exporter en CSV',
    result: 'Résultat',
    totalItems: 'Notes valides',
    sum: 'Somme',
    average: 'Moyenne simple',
    weightedAverage: 'Moyenne pondérée',
    noWeights: 'Aucun coefficient valide',
    noValidRows: 'Saisissez au moins une note valide.',
    copied: 'Résultat copié',
  },
  sources: [
    {
      label: 'Ministère de l’Éducation nationale — calcul de la note au baccalauréat',
      href: 'https://www.education.gouv.fr/reussir-au-lycee/comment-calculer-votre-note-au-baccalaureat-325511',
      note: 'Source à consulter pour les coefficients et modalités propres à la session, distincts d’une moyenne générique.',
    },
    {
      label: 'CNIL — guide de la sécurité des données personnelles',
      href: 'https://www.cnil.fr/fr/guide-de-la-securite-des-donnees-personnelles',
      note: 'Repères de sécurité à appliquer lorsqu’un équipement traite des données scolaires ou personnelles.',
    },
  ],
  privacyNote: 'Les notes et coefficients sont calculés dans cette page. FunnyTools ne les reçoit pas pour produire la moyenne et ne les rattache pas à un compte.',
  disclaimer: 'Cette moyenne est une aide de calcul. Le bulletin, l’ENT, le règlement de l’établissement et les textes officiels restent les références.',
};

export const frenchGradeReview = {
  heading: 'Vérifier une moyenne avant de l’utiliser',
  intro: 'Deux décimales donnent une impression de précision, mais elles ne corrigent ni un mauvais barème ni un coefficient absent. Ce contrôle sépare l’opération mathématique de la règle scolaire.',
  panels: [
    {
      title: 'Testez un exemple de tête',
      text: 'Saisissez 10 et 14 sans coefficient : la moyenne doit être 12. Ajoutez ensuite les coefficients 1 et 3 : la moyenne pondérée doit devenir 13. Si ce n’est pas le cas, contrôlez les champs et le séparateur décimal.',
    },
    {
      title: 'Comparez les données, pas seulement le total',
      text: 'Vérifiez une à une la période, l’échelle, les notes prises en compte et leurs coefficients. Une moyenne correcte de la mauvaise liste reste inutilisable.',
    },
    {
      title: 'Revenez à la règle applicable',
      text: 'Pour un bulletin, un examen ou une admission, consultez la source institutionnelle à jour. Mentionnez qu’il s’agit d’une estimation tant que l’établissement ne l’a pas confirmée.',
    },
  ],
  checklistHeading: 'Liste de contrôle',
  checklist: [
    'Toutes les notes utilisent le même barème.',
    'Les coefficients proviennent de la même règle et suivent la même convention.',
    'Un exemple manuel donne le même résultat que l’outil.',
    'Le résultat officiel a été vérifié auprès de la source compétente.',
  ],
};

export const frenchMergePdf: ToolContent = {
  name: 'Fusionner plusieurs PDF en un seul fichier',
  short: 'Assemblez des PDF dans l’ordre voulu directement dans votre navigateur, sans téléverser les documents vers FunnyTools.',
  long: 'Cet outil sert à fusionner des PDF pour constituer un dossier, réunir des pièces justificatives, assembler des chapitres ou regrouper des factures. Sélectionnez plusieurs fichiers, lisez leur nombre de pages, placez-les dans le bon ordre puis téléchargez une nouvelle copie. Les originaux restent inchangés sur votre appareil.',
  seoTitle: 'Fusionner PDF gratuitement sans téléversement',
  seoDescription: 'Fusionnez plusieurs PDF gratuitement dans votre navigateur, changez leur ordre et téléchargez un seul fichier, sans inscription ni téléversement.',
  keywords: [
    'fusionner PDF',
    'assembler PDF gratuitement',
    'regrouper plusieurs PDF',
    'fusionner PDF sans téléversement',
    'mettre plusieurs PDF en un seul',
    'combiner documents PDF',
  ],
  capabilities: [
    'Sélectionner plusieurs documents PDF depuis l’appareil.',
    'Lire le nombre de pages de chaque fichier avant l’assemblage.',
    'Modifier l’ordre des documents pour construire un dossier cohérent.',
    'Créer et télécharger une nouvelle copie sans remplacer les originaux.',
  ],
  contentSections: [
    {
      heading: 'Réponse rapide : comment fusionner plusieurs PDF',
      paragraphs: [
        'Choisissez au moins deux fichiers PDF, cliquez sur « Lire les pages », puis déplacez chaque document vers le haut ou le bas. L’ordre affiché devient l’ordre du fichier final. Lancez ensuite « Fusionner les PDF » et attendez le téléchargement de la nouvelle copie.',
        'Ouvrez toujours le résultat après le téléchargement. Vérifiez le total des pages, le passage d’un document au suivant, l’orientation et la lisibilité. Une fusion terminée signifie que le navigateur a créé un fichier ; elle ne garantit pas que le dossier respecte les consignes du destinataire.',
      ],
    },
    {
      heading: 'Assembler un dossier administratif dans le bon ordre',
      paragraphs: [
        'Pour une candidature, une demande de logement ou un dossier administratif, placez généralement le formulaire principal avant les pièces qui le justifient. Nommez les fichiers de travail avec un numéro — 01-formulaire, 02-identite, 03-justificatif — afin de rendre l’ordre visible avant même la fusion.',
        'Relisez la liste demandée par le portail. Fusionner les PDF ne détecte ni une pièce manquante ni un justificatif périmé. Si le service impose un fichier par catégorie, un document unique peut au contraire être refusé. La consigne du destinataire prime sur la commodité.',
      ],
    },
    {
      heading: 'Que signifie « sans téléverser les fichiers »',
      paragraphs: [
        'Le navigateur accède aux fichiers que vous sélectionnez avec l’API File, puis le code de la page copie les pages dans un nouveau PDF. Le contenu n’est pas envoyé à un serveur FunnyTools pour réaliser l’opération. Fermer ou recharger l’onglet efface la liste de travail affichée.',
        'Le traitement local réduit une exposition inutile, mais ne rend pas un appareil automatiquement sûr. Évitez un ordinateur public pour des documents personnels, maintenez le navigateur à jour et examinez les extensions installées. Respectez également les règles de votre entreprise, de votre établissement ou de l’administration concernée.',
      ],
      link: {
        prefix: 'Pour comprendre l’accès aux fichiers sélectionnés, consultez ',
        label: 'la documentation française de l’API File sur MDN',
        href: 'https://developer.mozilla.org/fr/docs/Web/API/File',
        suffix: '.',
      },
    },
    {
      heading: 'Taille du PDF, mémoire et téléphone',
      paragraphs: [
        'Il n’existe pas de limite de téléversement puisque les documents ne sont pas envoyés à FunnyTools. La limite réelle dépend cependant de la mémoire disponible, de la taille des images et du navigateur. Un PDF scanné de cinquante pages peut être plus exigeant qu’un document texte beaucoup plus long.',
        'Comme repère prudent, commencez avec un lot inférieur à environ 40 Mo ou 300 pages, sans considérer ces valeurs comme une garantie. Sur téléphone, choisissez de petits lots. Si l’onglet ralentit, assemblez d’abord plusieurs sous-ensembles, contrôlez chaque fichier intermédiaire, puis fusionnez ces copies.',
      ],
    },
    {
      heading: 'Signatures électroniques, formulaires et PDF protégés',
      paragraphs: [
        'Une signature électronique porte sur un état précis du document. La création d’un nouveau PDF peut rendre la vérification de cette signature invalide ou différente. Si la valeur probante du document compte, demandez au destinataire si une fusion est autorisée et contrôlez la signature avec le logiciel prévu.',
        'Les formulaires interactifs, signets, pièces jointes, calques et autres fonctions avancées peuvent ne pas être conservés comme attendu. Un PDF protégé par mot de passe ou endommagé peut refuser de s’ouvrir. L’outil ne contourne pas les mots de passe et ne répare pas un fichier corrompu.',
      ],
    },
    {
      heading: 'Réduire le poids n’est pas la même opération que fusionner',
      paragraphs: [
        'Assembler plusieurs PDF augmente souvent la taille totale, car les pages d’origine sont réunies dans un même conteneur. La fusion n’est pas une compression et ne diminue pas automatiquement les images scannées. Consultez la limite du portail avant de commencer.',
        'Si le fichier final est trop lourd, revenez aux originaux. Recadrez les scans inutiles, choisissez une résolution adaptée ou produisez une copie optimisée avec un outil prévu pour la compression. Ne détériorez pas le seul exemplaire lisible et contrôlez les petits caractères après toute optimisation.',
      ],
    },
    {
      heading: 'Méthode de contrôle avant l’envoi',
      paragraphs: [
        'Additionnez le nombre de pages des fichiers sources et comparez ce total à celui de la copie fusionnée. Notez les pages de transition : si le premier PDF a quatre pages, la page 5 doit être le début du second. Cette vérification ciblée repère rapidement un ordre inversé, une page blanche ou un doublon.',
        'Ouvrez ensuite le résultat dans un second lecteur ou sur l’appareil utilisé pour l’envoi. Vérifiez le nom, la taille, les liens, les formulaires et les signatures. Conservez les originaux jusqu’à l’acceptation du dossier ; une copie fusionnée ne doit pas devenir l’unique version disponible.',
      ],
    },
  ],
  instructions: [
    'Dupliquez les documents de travail et conservez les originaux intacts.',
    'Sélectionnez au moins deux PDF, puis cliquez sur « Lire les pages ».',
    'Placez les fichiers dans l’ordre exact attendu par le lecteur ou le portail.',
    'Lancez la fusion et téléchargez la nouvelle copie.',
    'Ouvrez le résultat, comptez les pages et contrôlez les signatures, formulaires et transitions.',
  ],
  examples: [
    'Regrouper un formulaire et ses pièces justificatives dans un dossier unique.',
    'Assembler une proposition, un contrat et ses annexes dans l’ordre de lecture.',
    'Créer un polycopié à partir de plusieurs chapitres fournis séparément.',
    'Rassembler des factures mensuelles tout en conservant chaque original.',
    'Réunir des scans produits en plusieurs passages par un même appareil.',
  ],
  caseStudies: [
    {
      title: 'Candidature avec pièces justificatives',
      description: 'Une candidate numérote ses copies, vérifie la liste du portail, fusionne le formulaire et les justificatifs, puis compare le total des pages avant le dépôt. Elle garde les originaux dans un dossier séparé.',
    },
    {
      title: 'Contrat déjà signé',
      description: 'Une équipe constate que le contrat porte une signature électronique. Elle ne suppose pas que la fusion la préservera : elle demande la procédure au destinataire et transmet les annexes séparément lorsque cela est requis.',
    },
    {
      title: 'Cours scanné en plusieurs lots',
      description: 'Un enseignant assemble trois chapitres, vérifie chaque transition et ouvre le résultat sur téléphone. Il conserve une version distincte des corrigés avant toute diffusion aux élèves.',
    },
  ],
  notes: [
    'La fusion crée un nouveau fichier et ne doit jamais remplacer votre seule copie des originaux.',
    'Le repère de 40 Mo ou 300 pages dépend du contenu et de la mémoire ; ce n’est pas une limite garantie.',
    'Un PDF protégé, incomplet ou endommagé peut ne pas être lisible.',
    'Les signatures électroniques, formulaires, signets, calques et pièces jointes exigent une vérification spécifique.',
    'Le fichier final doit encore respecter la taille, le format et l’ordre demandés par le destinataire.',
  ],
  faq: [
    {
      q: 'Les PDF sont-ils envoyés sur un serveur ?',
      a: 'Ils ne sont pas envoyés à FunnyTools pour être fusionnés. Le navigateur lit les fichiers sélectionnés et produit la nouvelle copie sur votre appareil.',
    },
    {
      q: 'Dans quel ordre les PDF sont-ils assemblés ?',
      a: 'Dans l’ordre visible de haut en bas. Utilisez les boutons de déplacement avant de lancer la fusion.',
    },
    {
      q: 'Peut-on fusionner un PDF protégé par mot de passe ?',
      a: 'Non. L’outil ne retire ni ne contourne une protection. Créez une copie autorisée avec le logiciel d’origine si vous disposez des droits nécessaires.',
    },
    {
      q: 'La signature électronique reste-t-elle valide ?',
      a: 'Ne le supposez pas. La création d’un nouveau document peut modifier la vérification de la signature. Contrôlez-la avec la procédure exigée par le destinataire.',
    },
    {
      q: 'Combien de PDF peut-on regrouper ?',
      a: 'Cela dépend de la mémoire, du navigateur et du poids des pages. Si l’appareil ralentit, travaillez par lots plus petits.',
    },
    {
      q: 'La fusion réduit-elle la taille du fichier ?',
      a: 'Non. Fusionner et compresser sont deux opérations différentes. La taille finale est généralement proche de la somme des fichiers sources.',
    },
    {
      q: 'Est-ce utilisable sur Android ou iPhone ?',
      a: 'Oui avec un navigateur moderne, mais un téléphone dispose souvent de moins de mémoire. Préférez de petits lots et contrôlez le téléchargement.',
    },
    {
      q: 'Les fichiers d’origine sont-ils modifiés ?',
      a: 'Non. Le navigateur génère une nouvelle copie. Gardez néanmoins vos originaux jusqu’à l’acceptation du dossier final.',
    },
  ],
  labels: {
    localNote: 'Les fichiers sont traités dans ce navigateur et ne sont pas envoyés à FunnyTools.',
    upload: 'Sélectionner des fichiers PDF',
    selectedFiles: 'Fichiers sélectionnés',
    noFiles: 'Aucun PDF sélectionné pour le moment',
    page: 'page',
    pages: 'pages',
    loadingPages: 'Nombre de pages à lire',
    moveUp: 'Monter',
    moveDown: 'Descendre',
    analyze: 'Lire les pages',
    merge: 'Fusionner les PDF',
    reset: 'Réinitialiser',
    processing: 'Traitement en cours…',
    ready: '{count} fichiers PDF prêts',
    downloaded: 'Le téléchargement du PDF fusionné a commencé',
    noFile: 'Sélectionnez au moins deux fichiers PDF.',
    pdfOnly: 'Sélectionnez uniquement des fichiers PDF.',
    loadError: 'Impossible de lire l’un des PDF. Vérifiez qu’il n’est ni endommagé ni protégé.',
    mergeError: 'Impossible de fusionner ce lot. Essayez avec des fichiers plus petits ou non chiffrés.',
  },
  sources: [
    {
      label: 'MDN en français — interface File',
      href: 'https://developer.mozilla.org/fr/docs/Web/API/File',
      note: 'Documentation sur l’accès par JavaScript aux fichiers explicitement sélectionnés dans une page web.',
    },
    {
      label: 'pdf-lib — documentation de PDFDocument',
      href: 'https://pdf-lib.js.org/docs/api/classes/pdfdocument',
      note: 'Documentation de la bibliothèque utilisée dans le navigateur pour charger, copier et enregistrer les pages PDF.',
    },
    {
      label: 'CNIL — guide de la sécurité des données personnelles',
      href: 'https://www.cnil.fr/fr/guide-de-la-securite-des-donnees-personnelles',
      note: 'Bonnes pratiques générales de sécurité pour les appareils et données personnelles.',
    },
  ],
  privacyNote: 'Les documents restent dans l’onglet pendant l’opération. FunnyTools ne reçoit pas leur contenu pour effectuer la fusion et ne conserve pas de copie dans un compte.',
  disclaimer: 'Vérifiez l’ordre, le nombre de pages, la taille, les formulaires et les signatures avant tout envoi. L’outil ne valide aucune exigence juridique ou administrative.',
};

export const frenchMergeReview = {
  heading: 'Contrôler un PDF fusionné avant de l’envoyer',
  intro: 'Un fichier qui se télécharge sans erreur peut encore être incomplet, trop lourd ou impropre à une procédure. Un contrôle court et reproductible évite la plupart des mauvaises surprises.',
  panels: [
    {
      title: 'Commencez avec deux fichiers connus',
      text: 'Testez d’abord deux PDF non confidentiels dont vous connaissez le nombre de pages. Vérifiez l’ordre et le total afin de distinguer un problème du navigateur d’un problème propre au dossier réel.',
    },
    {
      title: 'Inspectez chaque raccord',
      text: 'Repérez la dernière page de chaque original, puis vérifiez la page suivante dans le fichier final. Recherchez les doublons, pages blanches, rotations et coupures inattendues.',
    },
    {
      title: 'Testez dans le système de destination',
      text: 'Ouvrez la copie dans un autre lecteur et, si possible, chargez-la dans le portail prévu. Contrôlez le nom, le poids, les signatures et les formulaires avant de considérer le dossier comme prêt.',
    },
  ],
  checklistHeading: 'Liste de contrôle',
  checklist: [
    'L’ordre affiché correspond exactement à l’ordre de lecture demandé.',
    'La somme des pages sources correspond au total du fichier fusionné.',
    'Les signatures, formulaires et éléments interactifs ont été vérifiés.',
    'La copie s’ouvre et respecte les contraintes du destinataire.',
  ],
};
