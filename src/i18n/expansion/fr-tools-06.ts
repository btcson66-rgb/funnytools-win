import type { ToolContent } from '../tools/_types';

export const frenchImageRotateFlip: ToolContent = {
  name: 'Faire pivoter ou retourner une image',
  short: 'Corrigez l’orientation par pas de 90° ou créez un effet miroir, puis téléchargez une nouvelle copie.',
  long: 'Cet outil ouvre une photo ou une image dans votre navigateur. Vous pouvez la faire pivoter de 90° vers la gauche ou la droite, enchaîner plusieurs rotations, la retourner horizontalement ou verticalement et revenir à l’orientation initiale. L’aperçu est recalculé après chaque action. Le fichier n’est pas envoyé à FunnyTools et l’original n’est jamais remplacé.',
  seoTitle: 'Faire pivoter ou retourner une image en ligne',
  seoDescription: 'Pivotez une photo de 90°, 180° ou 270° et retournez-la horizontalement ou verticalement, sans envoyer le fichier.',
  keywords: [
    'faire pivoter une image',
    'tourner une photo en ligne',
    'retourner une image',
    'effet miroir photo',
    'rotation image 90 degrés',
    'pivoter photo gratuitement',
    'inverser image horizontalement',
  ],
  capabilities: [
    'Faire pivoter l’image de 90° vers la gauche ou la droite.',
    'Cumuler deux ou trois rotations pour obtenir 180° ou 270°.',
    'Retourner l’image horizontalement ou verticalement.',
    'Réinitialiser les transformations avant téléchargement.',
    'Créer une copie locale en JPG, PNG ou WebP lorsque le navigateur le permet.',
  ],
  contentSections: [
    {
      heading: 'Réponse rapide : comment faire pivoter une photo',
      paragraphs: [
        'Choisissez l’image, puis cliquez sur « Pivoter à droite » ou « Pivoter à gauche ». Chaque clic ajoute un quart de tour. Utilisez deux clics pour 180° et trois pour 270°. Lisez les dimensions de sortie, regardez l’aperçu dans le bon sens et téléchargez seulement quand le haut, le bas, la gauche et la droite correspondent au résultat attendu.',
        'Pour obtenir un miroir, utilisez « Retourner horizontalement » ou « Retourner verticalement ». Un retournement n’est pas une rotation : il inverse l’ordre des éléments autour d’un axe. Si le résultat devient confus, cliquez sur « Réinitialiser l’orientation » et recommencez depuis l’image chargée.',
      ],
    },
    {
      heading: 'Pivoter, retourner et redresser : trois opérations différentes',
      paragraphs: [
        'Faire pivoter change l’orientation par rapport au cadre. Une photo de 1 200 × 800 pixels devient 800 × 1 200 après un quart de tour. Retourner horizontalement produit un effet miroir gauche-droite sans échanger largeur et hauteur. Retourner verticalement place le haut en bas. Ces commandes peuvent être combinées, mais leur ordre influence la perception du résultat.',
        'Redresser un horizon incliné de deux ou trois degrés est une autre opération. La version actuelle ne propose que des pas de 90° et ne crée pas de nouveaux bords pour un angle libre. Elle convient à une photo couchée, à une page scannée à l’envers ou à un visuel qui doit être reflété, pas à une correction fine de perspective.',
      ],
      items: [
        'Photo couchée sur le côté : rotation de 90°.',
        'Document photographié tête-bêche : rotation de 180°.',
        'Créer une symétrie gauche-droite : retournement horizontal.',
        'Corriger un horizon légèrement incliné : outil de redressement spécialisé.',
      ],
    },
    {
      heading: 'Effet miroir : vérifier le texte, les logos et les gestes',
      paragraphs: [
        'Un miroir horizontal peut sembler naturel sur un portrait, mais il inverse aussi les lettres, les chiffres, une signature, un logo, une montre, une cicatrice ou le côté d’un objet. Une capture d’écran retournée devient généralement illisible. Agrandissez donc chaque zone contenant du texte ou une information asymétrique avant d’utiliser la copie.',
        'Pour une démonstration technique, médicale ou sportive, droite et gauche peuvent porter un sens précis. Ne supposez pas qu’un miroir est neutre. Conservez une référence non modifiée et ajoutez une mention si le public doit savoir que l’image a été inversée. L’outil modifie les pixels, pas la signification du contenu.',
      ],
    },
    {
      heading: 'Dimensions, format et qualité de la copie',
      paragraphs: [
        'Une rotation de 90° ou 270° échange les dimensions ; une rotation de 180° et les deux retournements les conservent. La résolution n’est pas réduite volontairement. Pour produire le nouveau fichier, le navigateur dessine toutefois l’image sur un canevas puis la réencode. Un JPEG ou un WebP peut donc présenter une légère différence par rapport à l’original compressé.',
        'L’outil tente de garder JPG, PNG ou WebP. Un type moins courant peut ressortir en PNG. La transparence d’un PNG ou d’un WebP doit être contrôlée dans la copie. Les métadonnées EXIF, la géolocalisation, le profil colorimétrique, l’animation et les propriétés destinées à l’impression ne sont pas garanties. Gardez toujours le fichier source.',
      ],
    },
    {
      heading: 'Orientation EXIF et photo encore tournée ailleurs',
      paragraphs: [
        'Certains appareils enregistrent les pixels dans un sens et ajoutent une information EXIF pour demander au logiciel de les afficher autrement. Les navigateurs modernes tiennent souvent compte de cette orientation lors du décodage, mais un ancien logiciel, une messagerie ou un portail peut interpréter le fichier différemment. La copie réencodée présente les pixels selon l’aperçu affiché ici.',
        'Cette réécriture peut résoudre un problème d’orientation, mais elle ne garantit pas le comportement de chaque destination. Ouvrez le téléchargement dans au moins un autre lecteur et testez le service final. Si l’image doit servir d’archive, conservez aussi l’original avec ses métadonnées et documentez la transformation.',
      ],
    },
    {
      heading: 'Limites de mémoire et contrôle final',
      paragraphs: [
        'La sélection est limitée à 20 Mo et 40 millions de pixels. Une image décompressée peut utiliser beaucoup plus de mémoire que son poids sur disque. Sur téléphone, un grand panorama peut échouer avant la limite annoncée. Fermez les onglets inutiles, essayez une copie redimensionnée ou utilisez un ordinateur lorsque l’aperçu ne se crée pas.',
        'Avant de partager, vérifiez le sens, les dimensions, le texte, les objets asymétriques, le format, la transparence et le poids. Testez la copie dans le document ou la plateforme réelle. Une orientation correcte à l’écran ne prouve ni l’acceptation par un portail, ni la conformité d’une preuve, ni la fidélité colorimétrique pour l’impression.',
      ],
    },
  ],
  instructions: [
    'Choisissez une image compatible et observez son orientation initiale.',
    'Appliquez une rotation de 90° ou un retournement selon le besoin.',
    'Contrôlez l’aperçu, les dimensions et tout texte visible.',
    'Réinitialisez et recommencez si le sens ou l’effet miroir est incorrect.',
    'Téléchargez la copie et ouvrez-la dans l’application de destination.',
  ],
  examples: [
    'Remettre droite une photo prise avec le téléphone couché.',
    'Tourner de 180° une page numérisée tête-bêche.',
    'Créer un effet miroir pour comparer deux compositions visuelles.',
    'Retourner verticalement une texture destinée à une maquette.',
    'Réécrire les pixels d’une photo dont l’orientation varie selon les logiciels.',
  ],
  audience: [
    'Personnes corrigeant l’orientation d’une photo ou d’un document.',
    'Créateurs préparant une variante miroir d’un visuel.',
    'Élèves et enseignants remettant une capture dans le bon sens.',
    'Utilisateurs qui veulent transformer une image localement.',
  ],
  caseStudies: [
    { title: 'Page photographiée sur le côté', description: 'La page passe de 1 200 × 800 à 800 × 1 200 après une rotation à droite. Le texte reste lisible, puis la copie est ouverte dans le portail de dépôt.' },
    { title: 'Portrait avec inscription sur le vêtement', description: 'Le miroir semblait améliorer la composition, mais inversait le mot imprimé. La personne conserve finalement l’orientation originale.' },
    { title: 'Orientation différente selon les logiciels', description: 'La photo s’affichait droite dans le téléphone et couchée dans un ancien lecteur. Une copie réencodée est testée dans les deux applications, tandis que l’original reste archivé.' },
  ],
  notes: [
    'Les rotations se font uniquement par pas de 90°.',
    'Un retournement horizontal inverse le texte et les asymétries.',
    'JPEG et WebP sont réencodés pour créer la copie.',
    'Métadonnées, animation et profils particuliers peuvent disparaître.',
    'Le résultat doit être testé dans son application finale.',
  ],
  faq: [
    { q: 'Comment faire pivoter une image en ligne ?', a: 'Choisissez la photo, cliquez à gauche ou à droite par pas de 90°, vérifiez l’aperçu puis téléchargez la copie.' },
    { q: 'Puis-je tourner une photo de 180° ou 270° ?', a: 'Oui. Deux clics donnent 180° et trois clics 270°, dans le sens du bouton choisi.' },
    { q: 'Quelle différence entre pivoter et retourner ?', a: 'Pivoter change l’orientation en degrés. Retourner crée un reflet autour d’un axe horizontal ou vertical.' },
    { q: 'Puis-je redresser un horizon de quelques degrés ?', a: 'Non. Cet outil ne propose pas d’angle libre ; il travaille par quarts de tour.' },
    { q: 'Pourquoi le texte est-il à l’envers ?', a: 'Un retournement horizontal crée un miroir et inverse lettres, chiffres, logos et autres éléments asymétriques.' },
    { q: 'La qualité reste-t-elle identique ?', a: 'Les dimensions restent complètes, mais l’image est réencodée. Comparez la copie, surtout en JPEG et WebP.' },
    { q: 'L’image est-elle envoyée à FunnyTools ?', a: 'Non. Le décodage, la transformation et le téléchargement ont lieu dans le navigateur.' },
    { q: 'Pourquoi la photo se tourne-t-elle encore sur un autre site ?', a: 'Les logiciels peuvent interpréter différemment l’orientation EXIF. Testez la copie dans la destination réelle.' },
  ],
  labels: {
    localNote: 'L’image est pivotée et retournée dans ce navigateur ; elle n’est pas envoyée à FunnyTools.',
    upload: 'Choisir une image',
    rotateLeft: '↺ Pivoter à gauche',
    rotateRight: '↻ Pivoter à droite',
    flipH: 'Retourner horizontalement',
    flipV: 'Retourner verticalement',
    resetTransform: 'Réinitialiser l’orientation',
    preview: 'Aperçu de l’image transformée',
    waiting: 'Choisissez une image pour commencer',
    originalSize: 'Poids du fichier original',
    dimensions: 'Dimensions de sortie',
    download: 'Télécharger l’image',
    reset: 'Tout effacer',
    invalidType: 'Choisissez un fichier image valide.',
    tooLarge: 'L’image dépasse la limite de 20 Mo ou 40 millions de pixels.',
    processError: 'Impossible de traiter cette image. Essayez un autre fichier.',
  },
  privacyNote: 'L’image est décodée, transformée et réencodée dans la mémoire de ce navigateur. FunnyTools ne reçoit ni le fichier ni les actions appliquées. Les données temporaires disparaissent après effacement ou fermeture.',
  disclaimer: 'Conservez l’original et vérifiez la copie. Un miroir peut inverser une information importante, et l’exportation ne garantit pas les métadonnées, l’animation ou un usage professionnel.',
  sources: [
    { label: 'MDN — CanvasRenderingContext2D.rotate()', href: 'https://developer.mozilla.org/fr/docs/Web/API/CanvasRenderingContext2D/rotate', note: 'Référence de la transformation de rotation appliquée au canevas.' },
  ],
};

export const frenchImageRotateFlipReview = {
  heading: 'Contrôler une rotation ou un effet miroir',
  intro: 'Une image qui semble droite doit aussi conserver le sens du texte, les dimensions attendues et les détails asymétriques.',
  panels: [
    { title: 'Repérer les quatre directions', text: 'Utilisez un objet dont le haut, le bas, la gauche et la droite sont évidents pour confirmer le sens.' },
    { title: 'Relire tout le texte', text: 'Agrandissez les panneaux, chiffres, logos et signatures après un retournement.' },
    { title: 'Ouvrir la copie ailleurs', text: 'Contrôlez format, transparence, dimensions et orientation dans le logiciel final.' },
  ],
  checklistHeading: 'Liste de contrôle',
  checklist: [
    'Le haut, le bas, la gauche et la droite sont corrects.',
    'Aucun texte ou élément asymétrique n’est inversé par erreur.',
    'Les dimensions ne s’échangent que pour 90° ou 270°.',
    'L’original reste conservé et la copie s’ouvre dans la destination.',
  ],
};

export const frenchImageToBase64: ToolContent = {
  name: 'Convertir une image en Base64',
  short: 'Obtenez une URL de données Base64 complète et copiez-la telle quelle ou sous forme de déclaration CSS.',
  long: 'Ce convertisseur lit une image de 5 Mo maximum avec FileReader et affiche une URL de données complète : type MIME, marqueur Base64 et contenu encodé. Vous pouvez copier cette Data URI ou une déclaration background-image prête à tester en CSS. L’opération ne compresse pas, ne chiffre pas et ne change pas le format de l’image. Le fichier reste dans votre navigateur.',
  seoTitle: 'Convertir une image en Base64 et Data URI',
  seoDescription: 'Convertissez JPG, PNG, WebP, GIF ou SVG en URL de données Base64 et copiez la chaîne ou le CSS, sans envoi du fichier.',
  keywords: [
    'convertir une image en Base64',
    'image Base64 en ligne',
    'convertisseur image Base64',
    'image en Data URI',
    'Base64 image HTML',
    'Base64 image CSS',
    'encoder image Base64',
  ],
  capabilities: [
    'Lire localement une image de 5 Mo maximum.',
    'Afficher une URL de données avec type MIME et contenu Base64.',
    'Indiquer le poids, les dimensions et la longueur totale de la chaîne.',
    'Copier la Data URI ou une déclaration CSS background-image.',
    'Conserver les octets du format source sans réencodage de l’image.',
  ],
  contentSections: [
    {
      heading: 'Réponse rapide : transformer une image en Base64',
      paragraphs: [
        'Choisissez l’image et attendez l’affichage du poids, des dimensions et de la chaîne. Cliquez sur « Copier l’URL de données » si le champ attendu accepte une valeur commençant par `data:image/…;base64,`. Utilisez « Copier pour CSS » pour obtenir une déclaration `background-image`. Collez d’abord le résultat dans un fichier de test.',
        'La sortie est une Data URI complète, pas uniquement le bloc Base64. Le texte avant la virgule décrit le type de contenu et l’encodage. Une API peut demander seulement la partie située après la virgule ; un attribut HTML ou une propriété CSS attend souvent l’URL complète. Suivez le contrat exact de la destination.',
      ],
    },
    {
      heading: 'Comprendre une Data URI image',
      paragraphs: [
        'Une URL de données suit la forme `data:type/sous-type;base64,données`. Pour une image, le type peut être `image/png`, `image/jpeg`, `image/webp`, `image/gif` ou un autre MIME fourni par le fichier. La virgule sépare l’en-tête du contenu. Le navigateur peut ensuite reconstruire la ressource sans appeler une URL d’image externe.',
        'Base64 représente des octets avec un alphabet textuel. Il ne transforme pas un PNG en JPG et ne redessine pas l’image. Un GIF animé conserve ses octets animés dans la chaîne ; un SVG reste un SVG encodé. L’outil lit le fichier avec FileReader, ce qui évite une perte de qualité mais n’effectue aucune optimisation.',
      ],
    },
    {
      heading: 'Base64 augmente le volume et ne chiffre rien',
      paragraphs: [
        'La représentation Base64 utilise quatre caractères pour trois octets dans le cas général, auxquels s’ajoute l’en-tête. La chaîne est donc habituellement plus volumineuse que le fichier binaire avant compression de transport. La longueur exacte affichée permet de constater le coût réel. Convertir une photo de 400 Ko ne la rend pas plus légère.',
        'Base64 n’est ni un chiffrement, ni un mot de passe, ni une anonymisation. Toute personne disposant de la chaîne peut reconstruire l’image. Ne publiez pas une signature, un document personnel ou une capture confidentielle sous prétexte que son contenu ressemble à une suite de caractères. La conversion locale protège seulement l’opération sur cette page.',
      ],
    },
    {
      heading: 'Quand intégrer une petite image dans HTML ou CSS',
      paragraphs: [
        'Une Data URI peut être pratique pour un minuscule pictogramme, un prototype autonome, une démonstration technique ou un format de configuration qui n’accepte que du texte. En HTML, une image informative doit toujours conserver un texte alternatif pertinent. En CSS, le bouton prépare seulement `background-image`; il ne choisit ni sélecteur, ni taille, ni position.',
        'Pour une photo, un fond lourd ou une ressource réutilisée sur plusieurs pages, une URL de fichier optimisé est souvent préférable. Le navigateur peut mettre ce fichier en cache séparément, le code reste lisible et la même image n’est pas répétée dans chaque document. Mesurez le HTML ou le CSS final, pas seulement le nombre de requêtes.',
      ],
    },
    {
      heading: 'CSP, API, messagerie et compatibilité',
      paragraphs: [
        'Le système qui reçoit la chaîne peut imposer ses propres règles. Une Content Security Policy peut interdire `data:` pour les images. Un éditeur peut tronquer un champ, une API peut refuser l’en-tête, un client de messagerie peut supprimer le contenu embarqué. Une chaîne valide dans ce navigateur n’est donc pas une garantie universelle.',
        'Vérifiez le type MIME, la présence de `;base64,`, le premier et le dernier caractère après la copie. Testez le résultat dans l’environnement réel avec une image fictive. Si le presse-papiers est bloqué, le navigateur peut proposer une copie manuelle ; assurez-vous alors que la longue valeur n’a pas été sélectionnée partiellement.',
      ],
    },
    {
      heading: 'Limite de 5 Mo et méthode de vérification',
      paragraphs: [
        'La limite de 5 Mo évite de placer une chaîne immense dans la page et le presse-papiers. Une URL de données occupe plus de mémoire que le fichier, surtout sur téléphone. Pour une ressource trop grande, compressez ou redimensionnez une copie, ou conservez un fichier servi par URL normale.',
        'Pour vérifier, placez la Data URI dans un document de test, ouvrez-le et comparez dimensions, transparence, animation et contenu avec l’original. Confirmez aussi le comportement de la CSP et le poids du document final. La longueur n’est ni une mesure de qualité, ni une preuve de sécurité.',
      ],
    },
  ],
  instructions: [
    'Choisissez une image de 5 Mo maximum.',
    'Contrôlez le type MIME, les dimensions et la longueur de la Data URI.',
    'Copiez l’URL complète ou la déclaration CSS selon le champ attendu.',
    'Testez la chaîne dans un fichier fictif et dans la destination réelle.',
    'Vérifiez poids, cache, CSP et confidentialité avant publication.',
  ],
  examples: [
    'Intégrer un petit pictogramme dans un prototype HTML autonome.',
    'Créer un background-image CSS pour une démonstration locale.',
    'Préparer une valeur pour une API qui documente une Data URI.',
    'Comparer la longueur Base64 d’un PNG et d’une copie optimisée.',
    'Identifier qu’un champ demande le bloc après la virgule uniquement.',
  ],
  audience: [
    'Développeurs utilisant HTML, CSS ou une API.',
    'Personnes créant des prototypes ou exemples autonomes.',
    'Équipes transportant une petite ressource binaire dans un champ texte.',
    'Utilisateurs souhaitant encoder une image sans la téléverser.',
  ],
  caseStudies: [
    { title: 'Petit pictogramme dans une démo', description: 'Le pictogramme ne pèse que quelques Ko. L’équipe teste la Data URI avec sa CSP, compare le poids du HTML et conserve un texte alternatif lorsque l’image apporte une information.' },
    { title: 'API demandant du Base64 brut', description: 'La documentation exclut le préfixe `data:image/png;base64,`. La personne retire l’en-tête uniquement pour ce champ et vérifie l’appel avec une image non sensible.' },
    { title: 'Photographie trop lourde', description: 'La chaîne de plusieurs millions de caractères rend le fichier difficile à maintenir. Une copie WebP dimensionnée est finalement servie par URL pour profiter du cache.' },
  ],
  notes: [
    'La sortie est une URL de données complète.',
    'Base64 encode les octets mais ne compresse, ne chiffre et n’anonymise pas.',
    'La chaîne est généralement plus grande que le fichier binaire.',
    'Une CSP, une API ou un éditeur peut refuser ou tronquer la valeur.',
    'Toute personne ayant la chaîne peut reconstruire l’image.',
  ],
  faq: [
    { q: 'Comment convertir une image en Base64 ?', a: 'Choisissez le fichier puis copiez la Data URI affichée. La lecture est effectuée localement avec FileReader.' },
    { q: 'La sortie est-elle du Base64 brut ?', a: 'Non. C’est une URL de données complète avec type MIME et préfixe. Retirez l’en-tête seulement si le destinataire le demande.' },
    { q: 'Base64 réduit-il le poids de l’image ?', a: 'Non. La représentation textuelle est généralement plus grande que les octets binaires.' },
    { q: 'Puis-je l’utiliser dans HTML ou CSS ?', a: 'Oui si le projet et la CSP autorisent `data:`. Testez la sortie et gardez un texte alternatif pour une image informative.' },
    { q: 'Base64 protège-t-il une image privée ?', a: 'Non. C’est une codification réversible et non un chiffrement.' },
    { q: 'Quels formats sont acceptés ?', a: 'Les images que le navigateur peut lire, dans la limite de 5 Mo ; le type MIME source reste dans la Data URI.' },
    { q: 'Pourquoi la chaîne ne fonctionne-t-elle pas dans mon API ?', a: 'L’API peut demander du Base64 sans en-tête, refuser le MIME ou imposer une taille maximale. Consultez son contrat.' },
    { q: 'L’image est-elle envoyée à FunnyTools ?', a: 'Non. Le fichier et la chaîne restent dans la mémoire de ce navigateur.' },
  ],
  labels: {
    localNote: 'L’image est encodée dans ce navigateur et n’est pas envoyée à FunnyTools.',
    upload: 'Choisir une image',
    output: 'URL de données Base64',
    copy: 'Copier l’URL de données',
    copyCss: 'Copier pour CSS',
    copied: 'Contenu copié',
    reset: 'Tout effacer',
    waiting: 'L’URL de données apparaîtra ici après le choix d’une image',
    originalSize: 'Poids du fichier original',
    dimensions: 'Dimensions de l’image',
    base64Length: 'Longueur de la Data URI',
    invalidType: 'Choisissez un fichier image valide.',
    tooLarge: 'L’image dépasse la limite de 5 Mo.',
    processError: 'Impossible de lire cette image. Essayez un autre fichier.',
  },
  privacyNote: 'FileReader crée la Data URI dans la mémoire de ce navigateur. FunnyTools ne reçoit ni l’image ni la chaîne. Le contenu disparaît après effacement, rechargement ou fermeture ; le presse-papiers dépend de votre appareil.',
  disclaimer: 'Vérifiez le format attendu avant d’utiliser la chaîne. Base64 ne chiffre rien, augmente généralement le volume et peut être bloqué par une CSP, une API, un éditeur ou une messagerie.',
  sources: [
    { label: 'MDN — URL de données', href: 'https://developer.mozilla.org/fr/docs/Web/URI/Reference/Schemes/data', note: 'Syntaxe et comportement du schéma data:.' },
    { label: 'RFC 4648 — Base64', href: 'https://www.rfc-editor.org/rfc/rfc4648', note: 'Spécification des codages Base16, Base32 et Base64.' },
  ],
};

export const frenchImageToBase64Review = {
  heading: 'Valider une image encodée en Base64',
  intro: 'Une chaîne générée correctement doit encore correspondre à la variante, à la politique de sécurité et au poids acceptés par la destination.',
  panels: [
    { title: 'Identifier la valeur attendue', text: 'Distinguez Data URI complète et bloc Base64 situé après la virgule.' },
    { title: 'Reconstruire une image test', text: 'Affichez la sortie dans un document contrôlé et comparez format, dimensions et animation.' },
    { title: 'Mesurer le coût', text: 'Comparez le poids final, le cache et la CSP avec une image servie par URL.' },
  ],
  checklistHeading: 'Liste de contrôle',
  checklist: [
    'Le type MIME correspond au fichier choisi.',
    'La chaîne n’est pas tronquée et affiche bien l’image.',
    'Aucune donnée privée n’est publiée dans le code.',
    'Le volume et la règle CSP sont acceptables.',
  ],
};

export const frenchImagesToPdf: ToolContent = {
  name: 'Convertir des images en PDF',
  short: 'Classez plusieurs JPG ou PNG et créez un PDF unique en A4, Lettre ou au format de chaque image.',
  long: 'Ce convertisseur rassemble des fichiers JPG, JPEG et PNG dans un seul PDF, directement dans le navigateur. Vous pouvez déplacer les images vers le haut ou le bas, choisir une page A4, Lettre ou ajustée à l’image, puis sélectionner une orientation portrait ou paysage. Chaque image occupe une page et conserve ses proportions. Il n’y a ni OCR, ni signature, ni compression réglable.',
  seoTitle: 'Convertir JPG, PNG et photos en PDF',
  seoDescription: 'Convertissez plusieurs images JPG ou PNG en un PDF, choisissez l’ordre, le format A4 ou Lettre et l’orientation, sans envoi.',
  keywords: [
    'convertir images en PDF',
    'JPG en PDF en ligne',
    'PNG en PDF',
    'photos en PDF',
    'regrouper images en PDF',
    'créer PDF avec photos',
    'plusieurs JPG en un PDF',
  ],
  capabilities: [
    'Sélectionner plusieurs images JPG, JPEG ou PNG.',
    'Modifier l’ordre des futures pages avec les boutons monter et descendre.',
    'Choisir A4, Lettre ou une page ajustée à chaque image.',
    'Utiliser une orientation portrait ou paysage sans déformer les proportions.',
    'Créer un PDF local avec une image par page.',
  ],
  contentSections: [
    {
      heading: 'Réponse rapide : mettre plusieurs photos dans un PDF',
      paragraphs: [
        'Sélectionnez tous les JPG ou PNG, puis contrôlez la liste. Le premier fichier deviendra la première page. Utilisez « Monter » et « Descendre » pour corriger l’ordre. Choisissez A4 ou Lettre pour une feuille standard, ou « Ajuster à l’image » pour supprimer le marge fixe. Sélectionnez portrait ou paysage, créez le PDF et ouvrez immédiatement le téléchargement.',
        'Chaque image produit une page. L’outil ne compose pas plusieurs photos sur une même feuille et n’accepte pas un PDF existant comme entrée. Pour ajouter ensuite un autre document, utilisez la fusion PDF. Pour obtenir une planche de contact ou quatre photos par page, il faut une mise en page différente.',
      ],
    },
    {
      heading: 'Formats acceptés : JPG et PNG uniquement',
      paragraphs: [
        'La bibliothèque intègre directement JPG, JPEG et PNG. WebP, HEIC, AVIF, GIF, SVG et TIFF ne sont pas acceptés ici, même si votre navigateur peut les afficher. Convertissez d’abord une copie dans un format compatible, ouvrez-la pour vérifier le rendu, puis ajoutez-la à la liste.',
        'Renommer simplement `.webp` en `.jpg` ne convertit pas les octets et peut provoquer une erreur. Le PNG est utile pour les captures et les aplats ; le JPG convient souvent aux photographies. La transparence d’un PNG est intégrée, mais son apparence finale dépend du fond affiché par le lecteur PDF.',
      ],
    },
    {
      heading: 'A4, Lettre ou ajuster à l’image',
      paragraphs: [
        'A4 mesure 595,28 × 841,89 points PDF dans cet outil, et le format Lettre 612 × 792 points. Une marge de 36 points est conservée de chaque côté ; l’image est centrée et réduite proportionnellement si nécessaire. Aucun bord n’est coupé et aucun étirement n’est appliqué, ce qui peut laisser de l’espace blanc.',
        '« Ajuster à l’image » utilise les dimensions numériques de l’image comme dimensions de page, sans marge. Ces valeurs deviennent des points PDF et ne garantissent pas une taille d’impression fondée sur les DPI du fichier. Pour un dossier imprimé ou une administration demandant un format précis, A4 ou Lettre est généralement plus prévisible.',
      ],
    },
    {
      heading: 'Ordre des pages et orientation des photos',
      paragraphs: [
        'Le nom du premier fichier sert aussi de base au nom du PDF téléchargé. Lorsque les noms se ressemblent, ouvrez les images ou renommez des copies avant la sélection afin de ne pas inverser recto et verso, page 2 et page 3, janvier et février. Les boutons déplacent une image d’une seule position à la fois.',
        'Le réglage portrait ou paysage concerne la page PDF ; il ne pivote pas les pixels d’une photo couchée. Corrigez d’abord l’image avec l’outil de rotation, puis revenez créer le PDF. Une photo verticale placée sur une page paysage garde ses proportions et affiche donc plus d’espace sur les côtés.',
      ],
    },
    {
      heading: 'Poids du PDF, qualité et absence d’OCR',
      paragraphs: [
        'Le convertisseur n’offre pas de réglage de compression. Le poids final dépend du nombre d’images, de leur résolution et de leur format. Dix photos de téléphone en pleine définition peuvent créer un PDF volumineux et saturer la mémoire d’un appareil. Redimensionnez ou compressez des copies avant l’assemblage si le portail impose une limite.',
        'Les mots photographiés restent des pixels. Aucun OCR ne crée de texte sélectionnable ou consultable. L’outil n’ajoute pas non plus de mot de passe, signature, pagination, formulaire, PDF/A ou valeur officielle. Si une institution exige une couche texte, une signature numérique ou une norme d’archivage, utilisez le logiciel prescrit.',
      ],
    },
    {
      heading: 'Confidentialité et contrôle avant envoi',
      paragraphs: [
        'Les images sont lues et le PDF est construit dans la mémoire du navigateur avec pdf-lib. FunnyTools ne reçoit pas les fichiers pour produire le document. La page a néanmoins besoin de connexions normales pour charger le site et peut utiliser les services généraux décrits dans la politique de confidentialité ; le contenu des images n’est pas ajouté à la transformation distante.',
        'Ouvrez le PDF et parcourez toutes les pages. Vérifiez le nombre, l’ordre, la première et la dernière page, l’orientation, les marges, la netteté, le poids et le nom. Agrandissez le petit texte et essayez le portail final. Un fichier qui s’ouvre n’est pas automatiquement complet, lisible ou recevable par une administration.',
      ],
    },
  ],
  instructions: [
    'Choisissez une ou plusieurs images JPG, JPEG ou PNG.',
    'Placez-les dans l’ordre exact avec Monter et Descendre.',
    'Sélectionnez A4, Lettre ou Ajuster à l’image, puis portrait ou paysage.',
    'Créez le PDF et attendez le démarrage du téléchargement.',
    'Ouvrez le document et contrôlez chaque page avant de l’envoyer.',
  ],
  examples: [
    'Regrouper des photos de reçus dans un seul fichier.',
    'Transformer les pages photographiées d’un devoir en PDF ordonné.',
    'Assembler plusieurs captures PNG dans un document visuel.',
    'Créer un dossier recto-verso en vérifiant l’ordre des deux images.',
    'Partager des notes photographiées sans prétendre qu’elles contiennent de l’OCR.',
  ],
  audience: [
    'Étudiants devant remettre plusieurs pages sous forme de PDF.',
    'Bureaux regroupant reçus, annexes ou scans visuels.',
    'Créateurs préparant une séquence d’images paginée.',
    'Personnes préférant construire le PDF localement.',
  ],
  caseStudies: [
    { title: 'Dossier photographié en trois pages', description: 'La couverture, le formulaire et l’annexe sont remis dans l’ordre, exportés en A4 portrait puis vérifiés page par page avant dépôt.' },
    { title: 'Reçus de formes différentes', description: 'Les reçus restent proportionnés sur des pages A4. Des marges blanches apparaissent, mais aucun montant n’est étiré ou coupé.' },
    { title: 'Une capture reçue en WebP', description: 'Le fichier est d’abord réellement converti en JPG. La copie est ouverte pour contrôler le fond, puis intégrée avec les autres images.' },
  ],
  notes: [
    'Les entrées sont limitées à JPG, JPEG et PNG.',
    'L’orientation règle la page mais ne tourne pas les pixels.',
    'A4 et Lettre ajoutent une marge ; Ajuster à l’image ne promet pas un DPI.',
    'Il n’y a ni OCR, ni signature, ni mot de passe, ni compression réglable.',
    'Le nombre et la résolution des images déterminent la mémoire nécessaire.',
  ],
  faq: [
    { q: 'Comment convertir plusieurs images en un seul PDF ?', a: 'Sélectionnez les JPG ou PNG, ordonnez-les, choisissez la page et l’orientation puis créez le PDF. Une image devient une page.' },
    { q: 'Puis-je changer l’ordre des photos ?', a: 'Oui. Les boutons Monter et Descendre déplacent chaque fichier avant la génération.' },
    { q: 'WebP, HEIC, GIF ou SVG sont-ils acceptés ?', a: 'Non. Convertissez d’abord une copie réelle en JPG ou PNG.' },
    { q: 'Quelle différence entre A4, Lettre et Ajuster à l’image ?', a: 'A4 et Lettre utilisent une feuille standard avec marge ; Ajuster reprend les dimensions numériques de chaque image sans marge.' },
    { q: 'Le réglage paysage tourne-t-il ma photo ?', a: 'Non. Il change la page. Faites pivoter les pixels avant de créer le PDF.' },
    { q: 'Le PDF contient-il du texte sélectionnable ?', a: 'Non. Il n’y a pas d’OCR ; les mots restent dans les images.' },
    { q: 'Pourquoi le PDF est-il très lourd ?', a: 'Les images ne disposent pas d’un réglage de compression ici. Réduisez ou compressez des copies avant l’assemblage.' },
    { q: 'Les images sont-elles envoyées à FunnyTools ?', a: 'Non. Les fichiers et le PDF sont traités dans ce navigateur.' },
  ],
  labels: {
    localNote: 'Les images et le PDF sont traités dans ce navigateur ; ils ne sont pas envoyés à FunnyTools.',
    upload: 'Choisir des images JPG ou PNG',
    selectedImages: 'Images sélectionnées et ordre des pages',
    noFiles: 'Aucune image sélectionnée pour le moment',
    pageSize: 'Format de page',
    a4: 'A4',
    letter: 'Lettre',
    fit: 'Ajuster à l’image',
    orientation: 'Orientation de la page',
    portrait: 'Portrait',
    landscape: 'Paysage',
    moveUp: 'Monter',
    moveDown: 'Descendre',
    create: 'Créer et télécharger le PDF',
    reset: 'Tout effacer',
    processing: 'Création du PDF dans ce navigateur…',
    downloaded: 'Le téléchargement du PDF a commencé',
    noImages: 'Choisissez au moins une image JPG ou PNG.',
    invalidType: 'Choisissez uniquement des fichiers JPG, JPEG ou PNG.',
    imageError: 'Impossible de lire une des images.',
    createError: 'Impossible de créer le PDF. Vérifiez les formats ou utilisez des images plus petites.',
  },
  privacyNote: 'Les images sont lues et le PDF est construit dans la mémoire de ce navigateur. FunnyTools ne reçoit ni les fichiers ni le document. La liste disparaît après effacement, rechargement ou fermeture.',
  disclaimer: 'Vérifiez le PDF avant envoi. L’outil n’ajoute ni OCR, ni signature, ni valeur officielle, ni compression garantie, et ne contrôle pas les exigences d’une institution.',
  sources: [
    { label: 'pdf-lib — documentation', href: 'https://pdf-lib.js.org/', note: 'Bibliothèque utilisée dans le navigateur pour créer et intégrer les pages.' },
  ],
};

export const frenchImagesToPdfReview = {
  heading: 'Vérifier un PDF créé à partir d’images',
  intro: 'Le document téléchargé doit être relu comme un ensemble complet, pas seulement considéré comme réussi parce qu’il s’ouvre.',
  panels: [
    { title: 'Parcourir toutes les pages', text: 'Confirmez le nombre, l’ordre, la première et la dernière page.' },
    { title: 'Agrandir le contenu', text: 'Contrôlez petit texte, bords, contraste et orientation ; une photo ne devient pas automatiquement lisible.' },
    { title: 'Tester la destination', text: 'Vérifiez poids, impression, dépôt et exigences éventuelles de signature ou d’OCR.' },
  ],
  checklistHeading: 'Liste de contrôle',
  checklist: [
    'Le nombre et l’ordre des pages correspondent au dossier.',
    'Chaque image est orientée, proportionnée et lisible.',
    'Le format et les marges conviennent à l’écran ou à l’impression.',
    'Le poids respecte la limite et les originaux restent conservés.',
  ],
};
