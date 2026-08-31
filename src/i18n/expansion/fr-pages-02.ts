export const frenchPrivacy = {
  title: 'Politique de confidentialité de FunnyTools',
  seoTitle: 'Confidentialité et données personnelles | FunnyTools',
  seoDescription: 'Comprenez quelles données FunnyTools traite, ce qui reste dans votre navigateur, les connexions à Google et Cloudflare, les cookies et vos choix.',
  keywords: [
    'FunnyTools confidentialité',
    'outil en ligne sans envoyer fichier',
    'traitement dans le navigateur',
    'cookies FunnyTools',
    'données personnelles outils en ligne',
    'outil PDF confidentialité',
  ],
  eyebrow: 'Données, cookies et contrôle utilisateur',
  intro: 'Cette page explique concrètement la différence entre le contenu confié à un outil, les données techniques nécessaires pour afficher le site et les services tiers susceptibles d’être contactés. Elle ne promet pas une navigation invisible : elle décrit ce qui est traité, dans quel but et quels contrôles restent à votre disposition.',
  directAnswer: [
    'Les outils français actuellement publiés calculent une moyenne ou fusionnent des PDF dans la mémoire du navigateur. Les notes saisies et le contenu des documents ne sont pas envoyés à FunnyTools pour produire le résultat. Vous n’avez pas besoin de créer un compte.',
    'La visite d’une page reste une activité en ligne. Votre navigateur contacte l’hébergement et la protection réseau de Cloudflare ; il peut aussi charger Google Analytics et l’infrastructure Google AdSense selon la configuration du site, votre région et les choix de consentement applicables. Ces services peuvent recevoir des données techniques telles que l’adresse IP, l’URL consultée, le type d’appareil, des identifiants ou des cookies. Cette circulation est distincte du contenu traité localement par l’outil.',
  ],
  sections: [
    {
      heading: 'Ce qui reste dans votre navigateur',
      paragraphs: [
        'Lorsque vous saisissez des notes dans la calculatrice, le calcul est effectué par le code chargé dans l’onglet. Les valeurs servent à afficher la somme, la moyenne simple ou la moyenne pondérée. Elles ne sont pas ajoutées aux événements de mesure d’audience et ne créent pas un dossier associé à votre identité.',
        'Pour fusionner des PDF, le navigateur lit les fichiers sélectionnés, copie leurs pages dans l’ordre choisi et construit un nouveau document en mémoire. FunnyTools ne reçoit pas une copie des fichiers pour réaliser cette opération. Le téléchargement final est généré depuis l’appareil. Cette caractéristique réduit l’exposition, mais elle ne remplace ni la sécurité du terminal, ni la prudence face aux extensions installées, ni les règles de confidentialité de votre organisation.',
      ],
      items: [
        'Aucun compte FunnyTools n’est nécessaire pour utiliser les outils français publiés.',
        'Les notes et coefficients ne sont pas enregistrés dans une base FunnyTools.',
        'Les PDF ne sont pas téléversés vers FunnyTools pour être fusionnés.',
        'Une fermeture ou un rechargement de l’onglet peut effacer l’état de travail non téléchargé.',
      ],
    },
    {
      heading: 'Données techniques lors de la consultation du site',
      paragraphs: [
        'Pour afficher funnytools.win, le navigateur échange nécessairement avec des serveurs. Les journaux et services de protection peuvent traiter l’adresse IP, l’heure de la requête, l’adresse demandée, l’agent utilisateur, la provenance approximative et des signaux de sécurité. Cloudflare fournit notamment la distribution du contenu, la protection contre les abus et des mesures techniques de performance.',
        'Ces informations ne sont pas équivalentes au texte ou au fichier ouvert dans un outil. Par exemple, un service réseau peut savoir que la page « fusionner des PDF » a été consultée sans recevoir le contenu des documents assemblés localement. Cette distinction doit rester visible : dire qu’un outil fonctionne dans le navigateur ne signifie pas que la page entière fonctionne sans aucune connexion.',
      ],
    },
    {
      heading: 'Mesure d’audience avec Google Analytics',
      paragraphs: [
        'FunnyTools utilise Google Analytics pour comprendre quelles pages sont consultées, quels types d’appareils rencontrent des problèmes et quelles fonctions méritent une correction. Selon la configuration et le consentement, Google peut traiter des informations techniques de navigation et utiliser des identifiants. Les événements FunnyTools sont conçus pour décrire une action, comme l’ouverture ou la fin d’un outil, sans inclure le contenu saisi, une note individuelle, un mot de passe ou le contenu d’un PDF.',
        'La CNIL rappelle que les traceurs de mesure d’audience ne sont dispensés de consentement que sous des conditions précises. FunnyTools ne présente donc pas toute mesure comme automatiquement exemptée. Les règles applicables, la région, la configuration de l’outil et les choix proposés à la personne doivent être pris en compte. Vous pouvez aussi bloquer les traceurs avec les réglages du navigateur ou les outils proposés par Google.',
      ],
    },
    {
      heading: 'Google AdSense, publicité et consentement',
      paragraphs: [
        'FunnyTools peut charger le script Google AdSense sur les pages indexables pendant la procédure d’examen ou lors de la diffusion d’annonces. Google et ses partenaires peuvent utiliser des cookies, l’adresse IP, des informations sur l’appareil, le stockage local et d’autres signaux pour la sécurité, la prévention de la fraude, la mesure et la sélection d’annonces. Le chargement de cette infrastructure ne signifie pas que le contenu de vos PDF ou de vos calculs est transmis à Google.',
        'Les annonces personnalisées ou non personnalisées dépendent notamment de la région, des réglages de Google et des choix de consentement disponibles. Lorsqu’un consentement préalable est requis, les finalités concernées ne doivent pas être activées avant ce choix. Les mécanismes de gestion de la confidentialité proposés sur le site ou par Google permettent, selon le pays, de consulter ou modifier les décisions enregistrées.',
      ],
    },
    {
      heading: 'Cookies, stockage local et application installable',
      paragraphs: [
        'Le site utilise le stockage du navigateur pour des préférences limitées : thème clair ou sombre, nombre de visites avant l’affichage prudent d’une proposition d’installation, refus de cet avis et, pour certains outils, paramètres de travail. Ces valeurs restent sur l’appareil ; elles ne constituent pas un compte FunnyTools. Vous pouvez les supprimer depuis les paramètres de données du site.',
        'FunnyTools peut être installé comme application web progressive. Un service worker met en cache des fichiers statiques afin d’accélérer les visites et d’offrir une expérience dégradée hors connexion. Les requêtes liées à la publicité et à l’analytique sont explicitement exclues de ce cache. Effacer les données de funnytools.win ou désinstaller l’application retire ces copies selon le fonctionnement de votre navigateur.',
      ],
    },
    {
      heading: 'Courriel volontaire et contact',
      paragraphs: [
        'Si vous écrivez à btcson224@gmail.com, FunnyTools reçoit l’adresse d’expédition et le contenu volontaire du message afin de répondre. N’envoyez jamais de mot de passe, de document d’identité, de relevé scolaire, de dossier médical ou de fichier professionnel confidentiel pour signaler un bug. Un exemple fictif, l’URL, le navigateur et les étapes de reproduction suffisent généralement.',
        'Certaines fonctions du réseau FunnyTools peuvent proposer une inscription à une lettre d’information ou une livraison volontaire par courriel, gérée avec une infrastructure partagée et Brevo. Lorsque cette fonction est choisie, l’adresse sert à l’objectif annoncé. Elle n’est pas vendue à des annonceurs. Les messages d’information doivent proposer un moyen de se désinscrire, et une demande de suppression peut être envoyée au contact indiqué.',
      ],
    },
    {
      heading: 'Liens externes et prestataires',
      paragraphs: [
        'Les pages peuvent citer des administrations, des documentations techniques, Google, Cloudflare, Brevo ou d’autres ressources. En ouvrant un autre domaine, vous quittez FunnyTools et la politique du fournisseur s’applique. Un lien de référence aide à vérifier une règle ; il ne signifie pas que FunnyTools contrôle toutes les pratiques, les transferts ou les évolutions de ce service.',
        'Avant de déposer un fichier ou de remplir un formulaire externe, vérifiez l’adresse du site, sa politique, la finalité et les destinataires. Les outils locaux de FunnyTools ne rendent pas automatiquement confidentielle l’étape suivante : si vous téléversez ensuite le résultat sur un portail, ce portail reçoit le fichier selon ses propres conditions.',
      ],
    },
    {
      heading: 'Liens affiliés et indépendance du résultat',
      paragraphs: [
        'Le site chinois de Taïwan peut afficher des liens affiliés facultatifs vers Shopee ou Coupang sur la page de soutien, après la réussite d’un outil et, de manière sélective, dans des guides liés à un besoin précis. Si vous achetez après avoir suivi l’un de ces liens, FunnyTools peut recevoir une commission sans coût supplémentaire pour vous ; le prix et les conditions de la plateforme concernée restent applicables.',
        'Ces liens sont placés dans une zone clairement séparée et ne modifient ni les formules, ni les calculs, ni les téléchargements, ni les réponses. Vous pouvez les ignorer ou chercher directement auprès du service de votre choix : le résultat de l’outil reste identique. La divulgation complète figure sur la page de soutien.',
      ],
    },
    {
      heading: 'Vos choix et demandes relatives aux données',
      paragraphs: [
        'Vous pouvez refuser ou supprimer des cookies, effacer le stockage local de funnytools.win, utiliser une fenêtre de navigation privée, limiter les extensions, installer le module de désactivation de Google Analytics ou ajuster les préférences publicitaires de Google. Certains choix peuvent réinitialiser le thème, le cache ou la mesure, mais les deux outils français restent accessibles sans connexion à un compte.',
        'Si le droit applicable vous reconnaît un accès, une rectification, une suppression, une limitation, une opposition ou un retrait du consentement, écrivez au contact avec une demande précise. FunnyTools ne reliant pas par défaut l’entrée d’un outil à une identité, il peut ne pas exister de donnée de calcul ou de fichier à retrouver. Ne transmettez un justificatif d’identité que si sa nécessité est établie et qu’un canal approprié a été convenu.',
      ],
    },
    {
      heading: 'Précautions pour les documents sensibles et les mineurs',
      paragraphs: [
        'Un traitement local diminue le nombre d’intermédiaires, mais ne protège pas contre un appareil compromis, une sauvegarde automatique, une extension malveillante, un partage d’écran ou une personne ayant accès au dossier de téléchargement. Pour un document sensible, utilisez un appareil maîtrisé, désactivez les extensions inutiles, travaillez sur une copie, puis supprimez les fichiers temporaires selon les règles de votre organisation.',
        'Le site ne vise pas spécifiquement les enfants et ne cherche pas à recueillir volontairement leurs données. Dans un contexte scolaire, l’adulte ou l’établissement doit choisir les données autorisées. Pour tester une moyenne, utilisez des valeurs fictives plutôt que des noms, appréciations ou identifiants d’élèves. Pour un PDF, retirez les informations inutiles avant toute manipulation ou partage.',
      ],
    },
    {
      heading: 'Évolution de cette politique',
      paragraphs: [
        'Cette politique est révisée lorsque de nouvelles catégories d’outils, un traitement serveur, un fournisseur ou un usage de données modifie réellement le parcours. Une future fonction qui exige un téléversement ou une API devra l’indiquer avant la saisie et ne pourra pas être présentée comme locale.',
        'La date affichée en bas de page correspond à la dernière relecture éditoriale du registre multilingue. Si vous constatez une différence entre cette description et le comportement visible, envoyez l’URL, la version du navigateur et une capture des requêtes avec des données fictives. Une politique utile doit pouvoir être confrontée au fonctionnement public.',
      ],
    },
  ],
  review: {
    heading: 'Trois contrôles simples pour vérifier nos affirmations',
    intro: 'Vous pouvez observer le comportement d’une page sans nous confier de données réelles. Ces vérifications n’offrent pas un audit de sécurité complet, mais elles aident à distinguer une promesse d’un fonctionnement reproductible.',
    checks: [
      {
        title: 'Séparer contenu et navigation',
        text: 'Ouvrez les outils de développement avec un PDF fictif : la page peut contacter des services techniques, mais le document ne doit pas être envoyé à FunnyTools pour la fusion.',
      },
      {
        title: 'Inspecter le stockage',
        text: 'Consultez les données enregistrées pour funnytools.win. Vous devez y trouver des préférences ou du cache, pas une bibliothèque de notes ou de PDF personnels.',
      },
      {
        title: 'Effacer et recommencer',
        text: 'Supprimez les données du site, rechargez la page et vérifiez que les préférences sont réinitialisées. Conservez vos originaux avant toute manipulation.',
      },
    ],
  },
  faq: [
    { q: 'FunnyTools enregistre-t-il les notes que je saisis ?', a: 'Non pour les outils français publiés. Les valeurs sont calculées dans l’onglet et ne sont pas enregistrées dans une base FunnyTools.' },
    { q: 'Mes PDF sont-ils envoyés à un serveur pour être fusionnés ?', a: 'Non. La fusion s’exécute dans la mémoire du navigateur. Utilisez tout de même un appareil fiable et vérifiez la politique de votre organisation.' },
    { q: 'Pourquoi mon navigateur contacte-t-il Google ?', a: 'Le site utilise Google Analytics et peut charger l’infrastructure AdSense. Ces connexions concernent la navigation, la mesure, la sécurité ou la publicité, pas le contenu local de l’outil.' },
    { q: 'Traitement local signifie-t-il navigation anonyme ?', a: 'Non. L’hébergement et des tiers peuvent recevoir des signaux techniques. Le terme local décrit le traitement du fichier ou des valeurs, pas l’ensemble des requêtes de la page.' },
    { q: 'Comment supprimer les préférences et le cache ?', a: 'Effacez les cookies et données du site funnytools.win dans les réglages du navigateur. Le thème, les préférences et les ressources PWA pourront être réinitialisés.' },
    { q: 'FunnyTools vend-il mon adresse électronique ?', a: 'Non. Une adresse fournie volontairement sert au contact, à la livraison ou à l’abonnement demandé et n’est pas vendue à des annonceurs.' },
    { q: 'Puis-je utiliser un dossier confidentiel ?', a: 'Vérifiez d’abord les règles de votre établissement ou employeur. Préférez une copie expurgée sur un appareil maîtrisé et contrôlez le fichier téléchargé.' },
    { q: 'Comment exercer un droit ou signaler une anomalie ?', a: 'Écrivez à btcson224@gmail.com avec la page et une demande précise. N’ajoutez ni mot de passe ni document sensible.' },
  ],
  sources: [
    {
      label: 'CNIL — cookies et autres traceurs',
      href: 'https://www.cnil.fr/fr/cookies-et-autres-traceurs',
      note: 'Repères officiels français sur l’information, le consentement et les catégories de traceurs.',
    },
    {
      label: 'CNIL — outils de mesure d’audience',
      href: 'https://www.cnil.fr/fr/cookies-solutions-pour-les-outils-de-mesure-daudience',
      note: 'Conditions et recommandations applicables aux traceurs utilisés pour mesurer l’audience.',
    },
    {
      label: 'Google — utilisation des données des sites partenaires',
      href: 'https://policies.google.com/technologies/partner-sites?hl=fr',
      note: 'Explique les données et mécanismes associés aux services Google intégrés à des sites tiers.',
    },
  ],
};

export const frenchAboutTools = {
  title: 'Comment fonctionnent les outils FunnyTools',
  seoTitle: 'Fonctionnement des outils en ligne | FunnyTools',
  seoDescription: 'Découvrez comment les outils FunnyTools calculent et traitent des PDF dans le navigateur, comment tester un résultat et quelles limites vérifier.',
  keywords: [
    'comment fonctionne un outil en ligne',
    'outil dans le navigateur',
    'traitement local PDF',
    'outil sans téléverser fichier',
    'vérifier calcul en ligne',
    'FunnyTools fonctionnement',
  ],
  eyebrow: 'Méthode, tests et limites expliqués',
  intro: 'Un outil en ligne utile ne devrait pas se résumer à un bouton. Cette page décrit le chemin entre votre entrée et le résultat, les contrôles réalisés avant publication et les vérifications à effectuer lorsque la sortie compte pour une décision, un dossier ou un envoi.',
  directAnswer: [
    'Les outils français actuels sont des pages statiques dont la logique interactive s’exécute dans le navigateur. La calculatrice lit les nombres saisis et applique la formule dans l’onglet. L’outil PDF lit les documents sélectionnés, copie les pages et crée une nouvelle version sans demander à un serveur FunnyTools de faire l’opération.',
    'Le traitement local ne rend pas un résultat automatiquement exact, officiel ou compatible avec tous les systèmes. Une moyenne dépend de la règle de l’établissement ; un PDF peut contenir une signature, un formulaire ou un chiffrement qu’une transformation ne conserve pas. FunnyTools associe donc l’outil à une méthode, des exemples, des limites, une FAQ et une procédure de contrôle.',
  ],
  sections: [
    {
      heading: 'Une page statique avec une fonction interactive',
      paragraphs: [
        'Astro génère l’essentiel de la page sous forme de HTML : titre, explications, exemples, limites, navigation et données structurées sont lisibles sans attendre une application lourde. Le navigateur n’active du JavaScript que pour les interactions nécessaires, comme ajouter une note, choisir des fichiers, modifier leur ordre ou lancer un téléchargement.',
        'Cette architecture réduit le code envoyé et facilite l’affichage sur mobile. Elle ne signifie pas que le site n’utilise jamais Internet : les fichiers du site doivent être chargés, et des services d’hébergement, de sécurité, de mesure ou de publicité peuvent être contactés. En revanche, l’entrée d’un outil déclaré local suit un circuit distinct et reste dans l’appareil pour le calcul.',
      ],
    },
    {
      heading: 'Financement et indépendance du résultat',
      paragraphs: [
        'Les outils restent gratuits et les éventuels placements payants ne doivent jamais modifier un calcul ou une réponse. Le site chinois de Taïwan peut afficher, après la fin d’un outil ou dans certains guides pertinents, une zone distincte et facultative contenant des liens affiliés Shopee ou Coupang.',
        'Utiliser ou ignorer cette zone ne change jamais le résultat. Les liens sont une possibilité de soutenir la maintenance lorsque vous aviez déjà l’intention d’acheter ; ils ne constituent ni un classement, ni une recommandation personnalisée, ni une condition d’accès à l’outil.',
      ],
    },
    {
      heading: 'Ce que signifie « traitement dans le navigateur »',
      paragraphs: [
        'Un navigateur moderne fournit des API pour lire un fichier choisi par l’utilisateur, manipuler des octets, dessiner une image, produire un objet Blob et déclencher un téléchargement. Une bibliothèque comme pdf-lib peut copier les pages d’un document en mémoire. Aucun téléversement n’est indispensable tant que la capacité de l’appareil suffit.',
        'Le terme décrit un mécanisme vérifiable, pas un slogan de sécurité absolue. Le système d’exploitation, le navigateur, les extensions et les dossiers synchronisés restent dans votre environnement. Une organisation peut interdire certains traitements même sans envoi au fournisseur du site. Consultez donc les règles internes avant de manipuler un dossier scolaire, juridique, médical ou professionnel.',
      ],
    },
    {
      heading: 'Calculs : formule, unités et arrondi',
      paragraphs: [
        'Une calculatrice correcte doit annoncer la formule. Pour une moyenne simple, on additionne les valeurs puis on divise par leur nombre. Pour une moyenne pondérée, on additionne chaque note multipliée par son coefficient, puis on divise par la somme des coefficients. L’outil vérifie les champs et distingue une ligne vide d’un véritable zéro.',
        'La formule générale ne connaît pas les règles particulières d’un bulletin : barèmes différents, devoir non compensable, bonus, absence, rattrapage, crédits ECTS ou arrondi imposé. Testez d’abord 10 et 14, dont la moyenne simple est 12. Si ce cas échoue, n’utilisez pas de données réelles. S’il réussit, comparez encore la méthode au règlement qui fera foi.',
      ],
    },
    {
      heading: 'PDF : ordre des pages, mémoire et fichier nouveau',
      paragraphs: [
        'Pour fusionner plusieurs PDF, l’outil analyse chaque document, indique le nombre de pages, respecte l’ordre affiché et crée un nouveau fichier. Le bouton de déplacement permet de corriger la séquence avant la fusion. Un exemple minimal consiste à réunir deux documents d’une page, marqués A et B, puis à vérifier que le téléchargement comporte deux pages dans le bon ordre.',
        'La taille affichée sur disque ne suffit pas à prévoir la mémoire nécessaire. Un scan contenant de grandes images peut être plus coûteux qu’un long document de texte. Sur un téléphone, travaillez par petits lots et fermez les autres onglets. Si l’outil refuse un PDF chiffré ou endommagé, ne cherchez pas à contourner une protection : utilisez le fichier source autorisé ou l’application prévue par l’émetteur.',
      ],
    },
    {
      heading: 'Pourquoi conserver systématiquement les originaux',
      paragraphs: [
        'Une transformation crée une copie. Les pages visuelles peuvent sembler identiques alors qu’une signature numérique ne valide plus, qu’un formulaire interactif change, qu’un signet disparaît ou qu’un portail refuse la structure. Le fichier téléchargé ne doit pas écraser l’original avant contrôle.',
        'Adoptez un nom explicite, ouvrez la copie dans un second lecteur et vérifiez le nombre de pages, l’ordre, les marges, les liens, les champs, l’impression et la taille maximale du destinataire. Pour un document important, conservez également la source et la règle de dépôt jusqu’à confirmation de réception.',
      ],
      items: [
        'Travaillez sur une copie et donnez un nom distinct au résultat.',
        'Contrôlez la première et la dernière page ainsi que chaque jonction.',
        'Vérifiez signatures, formulaires, liens, signets et accessibilité.',
        'Testez le fichier dans le portail ou le logiciel réellement utilisé.',
      ],
    },
    {
      heading: 'Comment une page est rédigée pour répondre à une vraie question',
      paragraphs: [
        'La rédaction commence par l’intention : « calculer une moyenne avec coefficient » ne demande pas la même explication que « convertir des notes sur 20 ». Une page utile donne d’abord une réponse courte, place l’outil près du besoin, puis développe la formule, les cas d’usage, les erreurs, les limites et la méthode de vérification.',
        'La version française est écrite avec des formulations usuelles en France et dans la francophonie, sans supposer que tous les pays appliquent le même barème ou le même droit. Les termes proches sont expliqués lorsqu’ils peuvent créer une erreur. Fusionner des PDF assemble des documents ; compresser cherche à réduire le poids ; convertir change le format. Les trois actions ne sont pas interchangeables.',
      ],
    },
    {
      heading: 'Contrôles techniques avant publication',
      paragraphs: [
        'Chaque lot passe une construction statique complète et des contrôles sur les liens, le titre, la description, l’URL canonique, les variantes de langue, le sitemap, les données structurées, la sécurité, l’application installable et la profondeur éditoriale. Les nouvelles routes françaises ne sont ajoutées au sélecteur de langue qu’après existence réelle de la page.',
        'Les fonctions interactives sont testées avec une entrée dont la sortie est connue, une erreur volontaire, un redémarrage et une largeur mobile. La calculatrice doit produire 12 avec 10 et 14. La fusion doit analyser deux petits PDF, permettre leur ordre et déclencher un fichier lisible. Après déploiement, la même URL est contrôlée avec un navigateur ordinaire et un agent Googlebot.',
      ],
    },
    {
      heading: 'Accessibilité, mobile et performance',
      paragraphs: [
        'Une page doit rester utilisable au clavier, afficher un seul titre principal, associer les libellés aux champs et annoncer les changements importants. À 390 pixels de large, aucun texte ni bouton essentiel ne doit créer un défilement horizontal. Le menu mobile doit pouvoir s’ouvrir, se fermer et être quitté avec la touche Échap.',
        'Le contenu principal ne dépend pas d’une application monopage. Les scripts lourds sont réservés aux outils qui en ont besoin. Cette sobriété aide les connexions lentes, mais les opérations sur de gros fichiers restent limitées par la mémoire. Si une action bloque, réduisez le lot, utilisez un ordinateur ou choisissez un logiciel hors ligne adapté.',
      ],
    },
    {
      heading: 'Mesure du fonctionnement sans copier votre contenu',
      paragraphs: [
        'La mesure peut indiquer qu’une page a été vue, qu’un outil a démarré ou qu’une erreur de fonctionnement est survenue. Les paramètres autorisés décrivent l’outil, la langue et l’action ; ils ne doivent pas contenir les notes, le nom d’un élève, un texte collé, le mot de passe généré ni le contenu d’un fichier.',
        'Pour un répertoire, la recherche peut filtrer les cartes directement dans l’onglet. Si un événement est utile, il vaut mieux mesurer qu’un filtre a été utilisé et le nombre de résultats que transmettre une phrase potentiellement sensible. La politique de confidentialité détaille séparément les connexions de navigation et les contrôles disponibles.',
      ],
      link: {
        prefix: 'Consultez la ',
        label: 'politique de confidentialité française',
        href: '/fr/confidentialite/',
        suffix: ' avant d’utiliser des données sensibles.',
      },
    },
    {
      heading: 'Quand FunnyTools ne suffit pas',
      paragraphs: [
        'FunnyTools fournit une aide pratique et une méthode de contrôle. Il ne délivre pas un relevé officiel, ne remplace pas l’ENT d’un établissement, ne certifie pas un document et ne répare pas toutes les variantes PDF. Une règle juridique, fiscale, médicale, financière ou administrative doit être vérifiée auprès de la source compétente.',
        'Arrêtez-vous si vous ne comprenez pas le résultat, si un fichier contient une signature critique, si une procédure impose un logiciel précis ou si l’erreur pourrait nuire à quelqu’un. L’efficacité d’un outil vient aussi de sa capacité à signaler le moment où une décision humaine ou professionnelle est nécessaire.',
      ],
    },
    {
      heading: 'Signaler un défaut de manière reproductible',
      paragraphs: [
        'Un bon rapport contient l’URL, le navigateur et sa version, le type d’appareil, les étapes exactes, le résultat attendu et celui observé. Pour un calcul, utilisez de petits nombres fictifs. Pour un PDF, créez deux documents de test sans donnée personnelle. Une capture d’écran peut aider si elle ne révèle rien de sensible.',
        'Envoyez ces éléments à btcson224@gmail.com. Si l’erreur dépend d’une règle officielle, ajoutez le lien et la date de consultation. Ne transmettez pas le document réel pour prouver le problème. Une reproduction minimale permet de corriger le code sans transformer le support en canal de collecte.',
      ],
    },
  ],
  review: {
    heading: 'Le test en trois questions avant d’utiliser un résultat',
    intro: 'Un outil devient fiable pour une tâche précise lorsque vous pouvez expliquer son entrée, prévoir un petit résultat et contrôler la sortie dans le contexte réel.',
    checks: [
      {
        title: 'Puis-je prévoir un cas simple ?',
        text: 'Choisissez deux nombres ou deux fichiers dont vous connaissez déjà le résultat. Si la sortie diffère, arrêtez-vous avant les données réelles.',
      },
      {
        title: 'Ai-je identifié les limites ?',
        text: 'Repérez le barème, l’arrondi, la mémoire, le chiffrement, les signatures et les exigences du destinataire qui ne sont pas résolus par le bouton.',
      },
      {
        title: 'Ai-je validé la copie finale ?',
        text: 'Ouvrez, relisez, imprimez ou déposez le résultat dans le système cible tout en conservant les originaux jusqu’à confirmation.',
      },
    ],
  },
  faq: [
    { q: 'Les outils FunnyTools fonctionnent-ils tous sans serveur ?', a: 'Les outils français publiés traitent actuellement les notes et les PDF dans le navigateur. Une future fonction nécessitant un serveur devra l’indiquer avant la saisie.' },
    { q: 'Que veut dire « sans téléverser le fichier » ?', a: 'Le fichier sert au calcul dans la mémoire de l’appareil et n’est pas envoyé à FunnyTools pour produire le résultat. La page reste néanmoins connectée à Internet.' },
    { q: 'Comment vérifier une moyenne calculée en ligne ?', a: 'Essayez 10 et 14, qui doivent donner 12, puis vérifiez la formule, les coefficients, le barème et la règle d’arrondi de votre établissement.' },
    { q: 'Pourquoi une fusion peut-elle invalider une signature PDF ?', a: 'La fusion crée un nouveau document et change sa structure. Une signature liée aux octets d’origine peut alors ne plus être valide.' },
    { q: 'Les gros fichiers fonctionnent-ils mieux sur ordinateur ?', a: 'Souvent oui, car la mémoire disponible est généralement supérieure. La complexité interne du PDF compte toutefois davantage que son seul poids.' },
    { q: 'La version française est-elle traduite automatiquement ?', a: 'Non. Les pages sont rédigées pour les requêtes, le vocabulaire et les précautions réellement utiles à un lectorat francophone.' },
    { q: 'Un test automatique garantit-il le contenu ?', a: 'Non. Il vérifie des conditions programmées. FunnyTools ajoute une relecture éditoriale, des cas manuels et une vérification sur la page publique.' },
    { q: 'Où signaler un résultat incorrect ?', a: 'Écrivez à btcson224@gmail.com avec l’URL et un exemple fictif reproductible. Ne joignez aucun document confidentiel.' },
  ],
  sources: [
    {
      label: 'MDN — API File',
      href: 'https://developer.mozilla.org/fr/docs/Web/API/File',
      note: 'Documentation des objets représentant les fichiers sélectionnés dans le navigateur.',
    },
    {
      label: 'pdf-lib — documentation',
      href: 'https://pdf-lib.js.org/',
      note: 'Bibliothèque utilisée pour lire, copier et créer des pages PDF côté navigateur.',
    },
    {
      label: 'MDN — stockage Web',
      href: 'https://developer.mozilla.org/fr/docs/Web/API/Web_Storage_API',
      note: 'Fonctionnement de localStorage et sessionStorage dans le navigateur.',
    },
  ],
};
