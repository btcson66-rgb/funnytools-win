import type { ToolContent } from '../tools/_types';

export const frenchImageCompressor: ToolContent = {
  name: 'Compresser une image en ligne',
  short: 'Réduisez le poids d’une image JPG, PNG ou WebP et comparez la copie avant de la télécharger.',
  long: 'Ce compresseur d’image réencode une photo, une capture d’écran ou un visuel directement dans votre navigateur. Vous choisissez le format de sortie et le niveau de qualité, puis vous comparez l’aperçu, le poids d’origine, le poids obtenu et le pourcentage d’économie. Aucune image n’est envoyée à FunnyTools pour effectuer l’opération. Les dimensions en pixels restent identiques : l’outil agit sur l’encodage, pas sur la largeur ni la hauteur.',
  seoTitle: 'Compresser une image en ligne gratuitement',
  seoDescription: 'Compressez une image JPG, PNG ou WebP sans inscription. Réglez la qualité, comparez le poids et téléchargez la copie dans votre navigateur.',
  keywords: [
    'compresser une image en ligne',
    'réduire le poids d’une photo',
    'compresser JPG gratuitement',
    'compresser PNG',
    'réduire taille fichier image',
    'convertir image WebP',
    'compresseur image sans inscription',
  ],
  capabilities: [
    'Ouvrir une image JPG, PNG ou WebP compatible, jusqu’à 20 Mo et 40 millions de pixels.',
    'Comparer le poids réel du fichier original et celui de la nouvelle copie.',
    'Choisir JPEG ou WebP et régler la qualité pour une compression avec perte.',
    'Conserver le format lorsque le navigateur sait le réencoder.',
    'Télécharger un nouveau fichier sans modifier ni écraser l’image d’origine.',
  ],
  contentSections: [
    {
      heading: 'Réponse rapide : comment réduire le poids d’une photo',
      paragraphs: [
        'Sélectionnez l’image, choisissez « conserver le format », JPEG ou WebP, puis déplacez le curseur de qualité. Le navigateur produit un aperçu et calcule le poids du résultat. Si la copie est plus légère tout en restant nette à la taille d’utilisation, téléchargez-la. Un taux négatif signifie que le nouveau fichier pèse davantage : changez de format, baissez légèrement la qualité ou gardez l’original.',
        'La compression ne réduit pas ici le nombre de pixels. Une photo de 4 000 × 3 000 pixels reste à ces dimensions. Si un formulaire exige 1 200 × 900 pixels, il faut aussi utiliser un outil de redimensionnement. Poids du fichier, dimensions, résolution d’impression et qualité visuelle répondent à des contraintes différentes.',
      ],
    },
    {
      heading: 'JPEG, PNG ou WebP : quel format choisir',
      paragraphs: [
        'Le JPEG convient généralement aux photographies sans transparence. Il accepte une compression avec perte efficace, mais peut créer des blocs ou des halos autour du texte et des contours. Le PNG préserve bien les aplats, les captures d’écran et les logos avec transparence ; un PNG déjà optimisé peut toutefois rester identique ou grossir après réencodage.',
        'WebP combine une bonne compression et la possibilité de conserver la transparence. Il est largement pris en charge par les navigateurs modernes, mais le logiciel ou le portail destinataire peut encore imposer JPG ou PNG. Le meilleur format n’est donc pas seulement le plus léger : c’est celui qui reste lisible et accepté dans le parcours réel.',
      ],
      items: [
        'Photo destinée à un site ou à un courriel : commencez avec JPEG ou WebP entre 75 % et 85 %.',
        'Capture avec petit texte : comparez PNG et WebP en zoomant à 100 %.',
        'Logo transparent : vérifiez la transparence avant de remplacer le PNG.',
        'Dossier administratif : respectez d’abord le format, le poids et les dimensions demandés.',
      ],
    },
    {
      heading: 'Ce que fait réellement le navigateur',
      paragraphs: [
        'L’image choisie est décodée dans la mémoire de l’appareil, dessinée dans un canevas HTML, puis exportée dans le format demandé. La méthode `toBlob()` permet au navigateur de créer un fichier JPEG, PNG ou WebP selon ses capacités et d’appliquer un niveau de qualité aux formats avec perte. La copie est ensuite proposée au téléchargement.',
        'Ce passage par les pixels peut retirer des éléments qui ne sont pas visibles dans l’aperçu : métadonnées EXIF, lieu de prise de vue, orientation, profil colorimétrique particulier ou information de l’appareil. Cette disparition peut contribuer à alléger la copie, mais empêche de la considérer comme archive maîtresse ou preuve. Conservez toujours l’original.',
      ],
    },
    {
      heading: 'Trouver le bon compromis entre netteté et poids',
      paragraphs: [
        'Il n’existe pas de qualité universelle. Un ciel lisse, des cheveux, du feuillage, du grain photographique et du texte fin réagissent différemment. Commencez autour de 80 %, observez les zones difficiles, puis baissez par petits pas. Arrêtez-vous dès que les défauts deviennent visibles au format auquel l’image sera consultée.',
        'Un gain spectaculaire n’est pas forcément une réussite. Une vignette peut tolérer une compression plus forte qu’une photographie de produit, un schéma médical ou une pièce justificative. Comparez les octets, mais contrôlez également les détails, les couleurs, la transparence et le rendu après téléversement, car la plateforme peut compresser une seconde fois.',
      ],
    },
    {
      heading: 'Courriel, site web, formulaire et réseau social',
      paragraphs: [
        'Pour un courriel, créez une copie dont le nom indique qu’elle est allégée et vérifiez que le destinataire n’a pas besoin du fichier original. Pour un site web, combinez une compression raisonnable avec des dimensions adaptées à l’affichage : envoyer 5 000 pixels pour une colonne de 800 pixels gaspille encore de la bande passante.',
        'Pour un formulaire, lisez chaque exigence avant de commencer. « Moins de 2 Mo », « JPG uniquement » et « 600 × 600 pixels » sont trois règles distinctes. Pour un réseau social, conservez un fichier de meilleure qualité en local : le service peut recadrer ou réencoder l’image et dégrader une copie déjà trop compressée.',
      ],
    },
    {
      heading: 'Limites de mémoire et formats non pris en charge',
      paragraphs: [
        'L’outil refuse les fichiers de plus de 20 Mo ou les images dépassant 40 millions de pixels afin de limiter les blocages. Une image compressée sur disque occupe bien davantage de mémoire après décodage. Un téléphone ancien peut donc échouer avant la limite annoncée. Dans ce cas, fermez les autres onglets, réduisez les dimensions ou utilisez un ordinateur.',
        'Les formats HEIC, RAW, TIFF, SVG animé et certains fichiers endommagés ne sont pas garantis. Le résultat dépend du moteur de décodage du navigateur. Si le format de sortie demandé n’est pas disponible, le navigateur peut revenir au PNG. Contrôlez toujours l’extension, le type et l’ouverture du fichier final.',
      ],
    },
    {
      heading: 'Comment vérifier la copie téléchargée',
      paragraphs: [
        'Ouvrez la copie dans un autre lecteur et comparez-la à l’original. Zoomez sur les textes, les visages, les dégradés, les bords et les aplats. Vérifiez les dimensions, le format annoncé et le poids. Pour une image transparente, placez-la sur un fond sombre puis clair afin de repérer un fond ajouté.',
        'Chargez ensuite la copie dans le courriel, le CMS ou le formulaire visé. Un fichier peut s’ouvrir localement tout en étant refusé par un contrôle automatique. Ne supprimez l’original qu’après avoir confirmé le parcours complet et, pour une image importante, gardez-le comme source de toute nouvelle variante.',
      ],
    },
  ],
  instructions: [
    'Choisissez une image JPG, PNG ou WebP et attendez l’affichage des aperçus.',
    'Sélectionnez le format de sortie selon le contenu et les exigences du destinataire.',
    'Ajustez la qualité, puis comparez le poids original et le poids obtenu.',
    'Examinez le texte, les contours, les couleurs et la transparence au niveau de détail utile.',
    'Téléchargez la copie, ouvrez-la ailleurs et testez-la dans le service final.',
  ],
  examples: [
    'Alléger une photo avant de l’ajouter à un courriel sans confier l’original à un service distant.',
    'Créer une version WebP d’un visuel pour un site qui accepte ce format.',
    'Comparer plusieurs qualités d’une capture d’écran jusqu’à conserver un texte net.',
    'Constater qu’un logo PNG réencodé pèse plus lourd et choisir de garder l’original.',
    'Préparer une copie JPG respectant une limite de poids avant un dépôt en ligne.',
  ],
  audience: [
    'Personnes qui doivent réduire le poids d’une photo pour un courriel ou un formulaire.',
    'Créateurs de contenu préparant des visuels pour un site ou un réseau social.',
    'Étudiants et enseignants qui allègent des captures sans installer de logiciel.',
    'Utilisateurs qui préfèrent un traitement local dans le navigateur.',
  ],
  caseStudies: [
    {
      title: 'Photo pour une petite annonce',
      description: 'Une photo de 5,2 Mo est exportée en JPEG à 82 %. La copie devient plus légère, mais le texte d’une étiquette reste lisible. La personne teste le fichier dans le formulaire et conserve l’original pour une future retouche.',
    },
    {
      title: 'Capture de cours avec petit texte',
      description: 'Une étudiante compare le PNG d’origine et un WebP à 90 %. Le JPEG est encore plus petit, mais les lettres deviennent floues. Elle retient le WebP après avoir vérifié que la plateforme pédagogique l’accepte.',
    },
    {
      title: 'Aucune économie réelle',
      description: 'Un pictogramme PNG déjà optimisé grossit après réencodage. L’indicateur affiche une économie négative. La bonne décision consiste à ne pas télécharger la copie et à conserver le fichier initial.',
    },
  ],
  notes: [
    'Les dimensions en pixels ne sont pas réduites par cet outil.',
    'Le contrôle de qualité peut ne pas avoir d’effet sur une sortie PNG.',
    'Les métadonnées et profils particuliers peuvent disparaître lors du réencodage.',
    'Un pourcentage négatif signifie que la copie est plus lourde que l’original.',
    'La mémoire réelle du téléphone peut imposer une image plus petite que les limites maximales.',
  ],
  faq: [
    { q: 'Puis-je compresser une image sans la téléverser ?', a: 'Oui. Le fichier est décodé et réencodé dans le navigateur. FunnyTools ne reçoit pas l’image pour effectuer l’opération.' },
    { q: 'Pourquoi mon PNG ne devient-il pas plus léger ?', a: 'Le PNG n’utilise pas le même réglage de qualité que JPEG ou WebP. Un fichier déjà optimisé peut rester identique ou grossir.' },
    { q: 'La compression réduit-elle la largeur et la hauteur ?', a: 'Non. Les dimensions restent identiques. Il faut redimensionner séparément si un portail impose un nombre de pixels.' },
    { q: 'Quel niveau de qualité choisir pour une photo ?', a: 'Commencez autour de 80 %, examinez les détails importants puis ajustez par petits pas selon le support final.' },
    { q: 'Les données EXIF sont-elles conservées ?', a: 'Ce n’est pas garanti. Le réencodage par canevas peut supprimer la date, le lieu, l’appareil et d’autres métadonnées.' },
    { q: 'Pourquoi l’économie affichée est-elle négative ?', a: 'La copie pèse plus lourd. Essayez un autre format ou une qualité différente, sinon gardez simplement l’original.' },
    { q: 'Puis-je traiter une image HEIC ou RAW ?', a: 'La prise en charge dépend du navigateur et n’est pas garantie. Convertissez d’abord avec une application fiable si le fichier ne s’ouvre pas.' },
    { q: 'Le fichier original est-il modifié ?', a: 'Non. L’outil crée une nouvelle copie à télécharger et ne remplace pas le fichier source.' },
  ],
  labels: {
    upload: 'Choisir une image',
    quality: 'Qualité',
    format: 'Format de sortie',
    keepFormat: 'Conserver le format',
    jpeg: 'JPEG',
    webp: 'WebP',
    sourcePreview: 'Aperçu de l’original',
    outputPreview: 'Aperçu de la copie',
    originalSize: 'Poids original',
    compressedSize: 'Poids obtenu',
    saved: 'Économie',
    waiting: 'Choisissez une image',
    download: 'Télécharger l’image',
    reset: 'Réinitialiser',
    invalidType: 'Choisissez un fichier image valide.',
    tooLarge: 'L’image est trop volumineuse. Utilisez moins de 20 Mo et moins de 40 millions de pixels.',
    processError: 'Impossible de traiter cette image. Essayez un autre fichier JPG, PNG ou WebP.',
    localNote: 'L’image est traitée dans ce navigateur et n’est pas envoyée à FunnyTools.',
  },
  privacyNote: 'L’image est décodée et réencodée dans la mémoire de ce navigateur. FunnyTools ne reçoit ni le fichier ni ses pixels. La copie temporaire disparaît lorsque vous réinitialisez ou fermez l’onglet.',
  disclaimer: 'Conservez l’original et contrôlez la copie dans son contexte final. FunnyTools ne garantit ni un poids précis, ni la conservation des métadonnées, ni l’acceptation par une plateforme.',
  sources: [
    {
      label: 'MDN — HTMLCanvasElement.toBlob()',
      href: 'https://developer.mozilla.org/fr/docs/Web/API/HTMLCanvasElement/toBlob',
      note: 'Méthode du navigateur utilisée pour créer un Blob dans un format et avec une qualité compatibles.',
    },
    {
      label: 'MDN — guide des formats d’image',
      href: 'https://developer.mozilla.org/fr/docs/Web/Media/Guides/Formats/Image_types',
      note: 'Comparaison des usages et caractéristiques de JPEG, PNG, WebP et d’autres formats.',
    },
  ],
};

export const frenchImageCompressorReview = {
  heading: 'Vérifier qu’une image allégée reste exploitable',
  intro: 'Le poids seul ne suffit pas. La copie doit préserver les informations utiles et être acceptée par le support auquel elle est destinée.',
  panels: [
    { title: 'Comparer les octets', text: 'Contrôlez le poids avant et après. Une économie n’existe que si le résultat est réellement plus léger ou si le changement de format répond à un besoin précis.' },
    { title: 'Observer les détails', text: 'Zoomez sur le texte, les visages, les contours, les dégradés et la transparence. Une petite vignette peut masquer une dégradation gênante.' },
    { title: 'Tester le parcours final', text: 'Ouvrez la copie dans un autre lecteur puis chargez-la dans le courriel, le formulaire ou le site réel. Conservez l’original comme source.' },
  ],
  checklistHeading: 'Liste de contrôle avant utilisation',
  checklist: [
    'Le fichier est plus léger ou le nouveau format est nécessaire.',
    'Les détails importants restent lisibles à la taille d’usage.',
    'Le format, les dimensions et le poids respectent la consigne.',
    'L’original est conservé séparément.',
  ],
};

export const frenchQrCodeGenerator: ToolContent = {
  name: 'Générateur de code QR gratuit',
  short: 'Créez un code QR statique pour une URL ou un texte, puis téléchargez-le au format PNG.',
  long: 'Ce générateur de QR code transforme dans le navigateur une adresse ou un texte en motif statique. Vous choisissez 128, 256 ou 512 pixels, le niveau de correction d’erreurs et, si nécessaire, un logo central. Le PNG peut être téléchargé ou copié lorsque le navigateur l’autorise. FunnyTools ne crée ni compte, ni redirection intermédiaire, ni tableau de suivi : le contenu est directement inscrit dans l’image.',
  seoTitle: 'Générateur de QR code gratuit pour URL',
  seoDescription: 'Créez gratuitement un QR code statique pour une URL ou un texte. Choisissez taille et correction, ajoutez un logo et téléchargez le PNG.',
  keywords: [
    'générateur QR code gratuit',
    'créer un QR code',
    'faire un QR code pour un lien',
    'QR code URL gratuit',
    'télécharger QR code PNG',
    'QR code avec logo',
    'générateur QR sans inscription',
  ],
  capabilities: [
    'Encoder une URL complète ou un texte dans un QR code statique.',
    'Choisir une taille de 128, 256 ou 512 pixels.',
    'Régler la correction d’erreurs L, M, Q ou H.',
    'Ajouter puis retirer un logo central optionnel.',
    'Télécharger le PNG sans envoyer le texte à FunnyTools.',
  ],
  contentSections: [
    {
      heading: 'Réponse rapide : comment créer un QR code',
      paragraphs: [
        'Collez l’adresse complète en conservant `https://`, ou saisissez le texte à encoder. Choisissez 256 ou 512 pixels pour un usage courant, puis sélectionnez un niveau de correction. La prévisualisation est créée automatiquement. Téléchargez le PNG et scannez ce fichier depuis au moins deux téléphones avant de le publier ou de l’imprimer.',
        'Le code produit est statique. L’adresse fait partie du motif : elle ne peut pas être remplacée après impression depuis un tableau de bord FunnyTools. Si la page change, il faut générer une nouvelle image. Cette simplicité évite un abonnement et une redirection tierce, mais rend la vérification initiale indispensable.',
      ],
    },
    {
      heading: 'QR code statique ou dynamique : la différence',
      paragraphs: [
        'Un QR statique contient directement le lien ou le texte. Tant que la destination existe, le motif ne dépend pas de FunnyTools. Il ne fournit ni statistiques de scan, ni modification à distance, ni date d’expiration gérée par le site. Une personne équipée d’un lecteur peut retrouver le contenu.',
        'Un service de QR dynamique encode souvent une adresse de redirection. Le propriétaire peut ensuite changer la destination et mesurer les visites, mais le fonctionnement dépend du domaine, du compte, du contrat et de la durée du service. FunnyTools ne propose pas cette fonction. Pour un document durable, choisissez une URL que vous contrôlez et conservez un inventaire des supports imprimés.',
      ],
    },
    {
      heading: 'Choisir entre L, M, Q et H',
      paragraphs: [
        'La correction d’erreurs ajoute de la redondance. Un niveau plus élevé peut permettre la lecture malgré une petite zone masquée ou dégradée, au prix d’un motif plus dense. M constitue un bon point de départ pour un code propre sans logo. Q ou H offrent davantage de marge lorsqu’un visuel central est ajouté.',
        'Cette tolérance n’autorise pas à recouvrir une grande partie du code. Un logo trop large, un contraste faible ou un recadrage du bord blanc peut empêcher la détection. L’outil place un fond clair sous le logo, mais seul un test du PNG et du support imprimé permet de savoir si l’ensemble reste lisible.',
      ],
    },
    {
      heading: 'Taille, contraste et marge blanche',
      paragraphs: [
        '128 pixels convient à un petit affichage numérique simple ; 256 pixels est polyvalent ; 512 pixels offre une meilleure base pour un document ou une impression réduite. Le téléchargement est un PNG matriciel. L’agrandir fortement dans un logiciel de mise en page peut créer du flou : générez directement la plus grande taille nécessaire.',
        'Conservez un motif sombre sur fond clair et la zone blanche autour du carré. Évitez les photographies derrière le code, les plis, les surfaces brillantes et les impressions minuscules. La distance, l’éclairage, la qualité de la caméra et la densité du contenu influencent la lecture. Imprimez une seule épreuve avant de lancer toute une série.',
      ],
    },
    {
      heading: 'Vérifier le lien et éviter un QR trompeur',
      paragraphs: [
        'Ouvrez d’abord l’adresse dans une fenêtre privée. Contrôlez le protocole, le domaine, la route, les paramètres et les permissions demandées. Un code parfaitement lisible peut mener à la mauvaise page si une seule lettre manque. Scannez ensuite le fichier téléchargé, pas uniquement l’aperçu affiché.',
        'France Num recommande d’être attentif à la destination et aux risques de détournement. Sur une affiche ou une table accessible, un autocollant peut recouvrir le code original. Affichez si possible le nom du domaine à côté du QR et inspectez régulièrement les supports. Ne scannez pas automatiquement une adresse inattendue.',
      ],
    },
    {
      heading: 'Ajouter un logo sans sacrifier la lecture',
      paragraphs: [
        'Un logo peut aider à identifier une marque, mais il masque des modules. Utilisez une image simple, carrée et contrastée, puis commencez avec Q ou H. Si certains téléphones hésitent, réduisez ou supprimez le logo au lieu de compter sur la correction d’erreurs.',
        'Testez le PNG sur Android et iPhone, puis sur l’impression finale. Le papier, la plastification, la luminosité d’un écran et l’encre modifient le contraste. Une version qui fonctionne sur le moniteur du concepteur peut devenir difficile à lire sur un menu posé sous une lumière forte.',
      ],
    },
    {
      heading: 'Accessibilité et solution alternative',
      paragraphs: [
        'Un QR code ne doit pas être l’unique moyen d’accéder à une information importante. Certaines personnes ne disposent pas d’un smartphone adapté, ne peuvent pas cadrer la caméra ou utilisent une technologie d’assistance. Ajoutez une adresse courte lisible, un numéro ou une instruction équivalente.',
        'Si le lien ouvre un formulaire, précisez l’objectif avant le scan et évitez de demander plus de données que nécessaire. Pour une salle de classe, une administration ou un commerce, fournissez une alternative directe au même contenu. La facilité technique du QR ne remplace pas une information claire.',
      ],
    },
  ],
  instructions: [
    'Saisissez l’URL complète ou le texte, puis relisez chaque caractère.',
    'Choisissez la taille et le niveau de correction adaptés au support.',
    'Ajoutez un logo seulement si nécessaire et conservez la marge blanche.',
    'Téléchargez le PNG puis scannez-le avec plusieurs appareils.',
    'Testez une impression ou une publication à la taille et dans la lumière réelles.',
  ],
  examples: [
    'Créer un QR code vers la page publique d’un événement.',
    'Ajouter à un dépliant un accès direct à un formulaire sans redirection FunnyTools.',
    'Encoder un texte court qu’une application peut récupérer hors ligne.',
    'Préparer un QR avec logo puis le tester avant d’imprimer une série.',
    'Générer un nouveau motif après le changement de l’adresse de destination.',
  ],
  audience: [
    'Associations et organisateurs qui partagent un programme ou une inscription.',
    'Commerces qui relient un support physique à une page publique.',
    'Enseignants et étudiants qui passent d’un document imprimé à une ressource.',
    'Personnes souhaitant un QR statique sans compte ni abonnement.',
  ],
  caseStudies: [
    {
      title: 'Affiche d’événement',
      description: 'Une association vérifie l’URL en navigation privée, génère un PNG de 512 pixels et l’imprime sur une feuille test. Android et iPhone ouvrent le bon programme. Une adresse courte est ajoutée sous le code.',
    },
    {
      title: 'Menu avec logo',
      description: 'Un restaurant choisit H et ajoute un logo. Un ancien téléphone lit mal l’épreuve plastifiée. L’équipe supprime le logo et agrandit le code avant d’imprimer toutes les cartes.',
    },
    {
      title: 'Page déplacée',
      description: 'L’adresse d’un formulaire change après diffusion. Le QR étant statique, l’équipe crée une nouvelle image, remplace les fichiers numériques et organise le retrait des anciennes affiches.',
    },
  ],
  notes: [
    'Le QR code est statique et ne peut pas être modifié après sa création.',
    'FunnyTools ne fournit ni redirection ni statistiques de scan.',
    'Un logo peut empêcher la lecture même avec une correction élevée.',
    'Le téléchargement est un PNG et non un fichier vectoriel.',
    'N’encodez aucun secret : toute personne voyant le code peut tenter de le lire.',
  ],
  faq: [
    { q: 'Le QR code gratuit expire-t-il ?', a: 'Le motif statique ne dépend pas d’un compte FunnyTools et n’a pas de date d’expiration imposée. La page liée peut toutefois être déplacée ou supprimée.' },
    { q: 'Puis-je modifier le lien après impression ?', a: 'Non. Il faut créer et remplacer le QR code, car l’adresse est inscrite directement dans le motif.' },
    { q: 'Quel niveau de correction choisir ?', a: 'M convient souvent à un code simple. Essayez Q ou H avec un logo, puis testez toujours le fichier final sur plusieurs appareils.' },
    { q: 'Pourquoi conserver la bordure blanche ?', a: 'Cette zone aide le lecteur à distinguer le QR de son environnement. La recadrer peut rendre la détection difficile.' },
    { q: 'FunnyTools enregistre-t-il mon URL ?', a: 'Non. Le texte, l’URL et le logo sont traités dans le navigateur pour créer l’image.' },
    { q: 'Puis-je créer un QR code Wi-Fi ?', a: 'Vous pouvez saisir manuellement une chaîne compatible, mais l’outil ne valide pas sa syntaxe. N’encodez pas un mot de passe sensible destiné à un large public.' },
    { q: 'Pourquoi tester le PNG téléchargé ?', a: 'Le téléchargement, le redimensionnement ou l’impression peuvent modifier la netteté. Seul le support final reproduit les conditions réelles.' },
    { q: 'Faut-il afficher aussi le lien ?', a: 'Oui lorsque l’accès compte. Une adresse lisible fournit une solution aux personnes qui ne peuvent pas scanner le code.' },
  ],
  labels: {
    inputLabel: 'URL ou texte',
    placeholder: 'https://exemple.fr',
    correction: 'Correction d’erreurs',
    size: 'Taille',
    download: 'Télécharger le PNG',
    copyImage: 'Copier l’image',
    logo: 'Logo central (facultatif)',
    logoHint: 'Avec un logo, essayez Q ou H et scannez le PNG téléchargé avant toute utilisation.',
    removeLogo: 'Retirer le logo',
    logoError: 'Impossible de lire cette image. Essayez un fichier PNG, JPG, WebP ou SVG.',
    copyUnsupported: 'Ce navigateur ne permet pas de copier l’image. Utilisez « Télécharger le PNG ».',
    emptyError: 'Saisissez le contenu à convertir en QR code.',
    renderError: 'Impossible de créer le QR code. Raccourcissez le contenu ou changez la configuration.',
    copied: 'Image copiée',
    canvasAlt: 'Aperçu du QR code',
  },
  privacyNote: 'L’URL, le texte et le logo facultatif sont traités dans la mémoire de ce navigateur. FunnyTools ne les reçoit pas et ne crée ni compte ni redirection.',
  disclaimer: 'Scannez le PNG final avant publication ou impression. FunnyTools ne garantit ni la lecture sur tous les appareils, ni la sécurité, la disponibilité ou la permanence du site lié.',
  sources: [
    {
      label: 'France Num — sécurité des QR codes',
      href: 'https://www.francenum.gouv.fr/guides-et-conseils/protection-contre-les-risques/cybersecurite/qr-code-quelle-securite-et-quelles',
      note: 'Conseils publics français sur le fonctionnement des QR codes et les précautions face aux destinations.',
    },
    {
      label: 'France Num — utiliser un QR code en entreprise',
      href: 'https://www.francenum.gouv.fr/guides-et-conseils/developpement-commercial/gestion-de-la-relation-client/utiliser-un-code-qr-pour',
      note: 'Repères pratiques pour concevoir, tester et déployer un QR code auprès du public.',
    },
  ],
};

export const frenchQrCodeGeneratorReview = {
  heading: 'Valider un QR code avant de le diffuser',
  intro: 'Un motif visible n’établit ni la justesse du lien ni la lecture dans toutes les conditions. Contrôlez le contenu, les appareils et le support réel.',
  panels: [
    { title: 'Vérifier la destination', text: 'Ouvrez l’URL puis scannez le PNG. Contrôlez le domaine, la route, les paramètres et les permissions sans vous fier au seul dessin.' },
    { title: 'Changer de lecteur', text: 'Essayez au moins deux appareils ou applications, surtout avec un logo. Le résultat doit apparaître rapidement et sans ambiguïté.' },
    { title: 'Tester le support', text: 'Imprimez ou publiez une épreuve à la taille finale. Observez la marge, le contraste, les reflets, la distance et l’alternative écrite.' },
  ],
  checklistHeading: 'Liste de contrôle avant diffusion',
  checklist: [
    'L’URL appartient au domaine prévu et s’ouvre avec les bons droits.',
    'Le PNG se scanne depuis plusieurs appareils.',
    'Le logo et la mise en page ne masquent pas le motif.',
    'Une épreuve réelle et une alternative lisible sont disponibles.',
  ],
};

export const frenchSplitPdf: ToolContent = {
  name: 'Diviser un PDF et séparer ses pages',
  short: 'Créez un PDF par page ou séparez des groupes comme 1-3, 5 et 8-10 dans votre navigateur.',
  long: 'Cet outil divise un document PDF sans l’envoyer à FunnyTools. Après lecture du nombre total de pages, vous choisissez un fichier par page ou des plages personnalisées séparées par des virgules. Chaque groupe crée une nouvelle copie et conserve l’ordre physique des pages sélectionnées. L’original n’est jamais écrasé.',
  seoTitle: 'Diviser un PDF en ligne gratuitement',
  seoDescription: 'Divisez un PDF par page ou par plages comme 1-3, 5, 8-10. Séparez le document dans le navigateur, sans téléversement ni inscription.',
  keywords: [
    'diviser PDF en ligne',
    'séparer pages PDF',
    'extraire pages d’un PDF',
    'découper PDF gratuitement',
    'un PDF par page',
    'séparer PDF par plage',
    'diviser PDF sans téléverser',
  ],
  capabilities: [
    'Lire le nombre de pages d’un PDF compatible.',
    'Créer automatiquement un fichier distinct pour chaque page.',
    'Séparer des plages comme 1-3, 5 et 8-10.',
    'Télécharger plusieurs copies sans modifier le document source.',
    'Effectuer le traitement dans le navigateur sans envoi à FunnyTools.',
  ],
  contentSections: [
    {
      heading: 'Réponse rapide : comment diviser un fichier PDF',
      paragraphs: [
        'Choisissez une copie du PDF et cliquez sur « Lire le nombre de pages ». Pour obtenir une sortie par feuille, gardez le mode « Un PDF par page ». Pour des chapitres ou annexes, sélectionnez « Plages personnalisées » et saisissez par exemple `1-3, 5, 8-10`. Chaque élément séparé par une virgule produit un fichier distinct.',
        'Les numéros commencent à 1 et correspondent à la position physique dans le document, pas toujours au chiffre imprimé en bas de page. Téléchargez toutes les sorties avant de fermer l’onglet, puis ouvrez chacune d’elles et vérifiez son début, sa fin et son nombre de pages.',
      ],
    },
    {
      heading: 'Écrire correctement les pages et les plages',
      paragraphs: [
        'Un nombre isolé sélectionne une seule page. Un tiret définit un intervalle inclusif. `2-4, 7, 10-12` crée donc trois PDF : les pages 2 à 4, la page 7 et les pages 10 à 12. Les espaces sont acceptés, mais pas les lettres, les points de suspension, la page 0, une valeur supérieure au total ou un intervalle inversé comme `9-3`.',
        'Une virgule indique une nouvelle sortie, pas une simple interruption dans le même fichier. Si vous voulez un seul PDF composé des pages 1 à 3 puis 8 à 10, créez les deux groupes, téléchargez-les et utilisez ensuite l’outil de fusion dans l’ordre souhaité.',
      ],
      items: [
        '`1` crée un PDF avec la première page.',
        '`1-3` crée un PDF contenant les pages 1, 2 et 3.',
        '`1-3, 5, 8-10` crée trois fichiers distincts.',
        '`0`, `7-2` et toute page au-delà du total sont refusés.',
      ],
    },
    {
      heading: 'Un fichier par page ou quelques chapitres',
      paragraphs: [
        'Le mode automatique convient lorsqu’un portail exige une pièce par fichier ou quand des feuilles scannées doivent être classées séparément. Un document de 150 pages crée toutefois 150 téléchargements, sollicite la mémoire et augmente le risque d’oubli. Ne l’utilisez pas comme méthode de compression : le total des copies peut être plus lourd.',
        'Les plages sont préférables pour un résumé, un chapitre, des annexes ou des factures de plusieurs pages. Préparez une liste indiquant le contenu attendu de chaque groupe. Moins de sorties facilitent le contrôle et le renommage avant envoi.',
      ],
    },
    {
      heading: 'Position physique et numéro imprimé',
      paragraphs: [
        'Une couverture peut ne porter aucun numéro ; une préface peut employer des chiffres romains ; le chapitre « page 1 » peut commencer à la cinquième feuille. L’outil compte depuis la première feuille du fichier. Si votre lecteur affiche position 9 alors que le pied de page indique 5, saisissez 9.',
        'Parcourez l’original dans un lecteur affichant les miniatures et notez les positions. Vérifiez également les versos, pages blanches et annexes. Une feuille visuellement vide peut séparer deux documents, porter un élément invisible ou être exigée dans la version complète.',
      ],
    },
    {
      heading: 'Signatures, formulaires et documents officiels',
      paragraphs: [
        'Extraire des pages crée un nouveau PDF. Une signature numérique liée au fichier original peut devenir invalide. Les formulaires interactifs, signets, pièces jointes, calques, liens, droits d’usage et portfolios PDF ne sont pas garantis dans la copie. Une apparence correcte à l’écran ne démontre pas que toutes les fonctions ont survécu.',
        'Pour un contrat, un dossier administratif ou une pièce signée, consultez la consigne du destinataire. Il peut exiger le document complet, une signature vérifiable ou un logiciel précis. Conservez toujours l’original et ne présentez pas une page extraite comme une version officiellement certifiée.',
      ],
    },
    {
      heading: 'Fichiers volumineux, chiffrés ou endommagés',
      paragraphs: [
        'Le traitement utilise la mémoire de l’appareil. Un PDF de scans peut demander bien plus de ressources qu’un fichier de texte de poids comparable. Pour une expérience stable, restez autour de 40 Mo et moins de 300 pages, surtout sur mobile. Ce ne sont pas des limites de téléversement, puisque le document ne quitte pas le navigateur, mais des repères de prudence.',
        'Un fichier protégé par mot de passe, chiffré, restreint ou endommagé peut ne pas s’ouvrir. FunnyTools ne tente pas de casser la protection. Si vous êtes autorisé, enregistrez une copie accessible depuis l’application d’origine. Sinon, demandez une version adaptée à l’émetteur.',
      ],
    },
    {
      heading: 'Contrôler les sorties avant le partage',
      paragraphs: [
        'Renommez chaque téléchargement immédiatement. Ouvrez-le, contrôlez le nombre de pages, la première, la dernière et toutes les transitions importantes. Comparez les tableaux qui débordent sur deux pages, les annexes et les pages en paysage. Pour une grande série, utilisez une liste afin de savoir quels fichiers ont été téléchargés.',
        'Testez enfin les fichiers dans le portail, le logiciel ou le lecteur du destinataire. Vérifiez la taille maximale, les caractères autorisés dans le nom, les formulaires et signatures. Gardez l’original jusqu’à confirmation de réception et supprimez les copies temporaires conformément aux règles de votre organisation.',
      ],
    },
  ],
  instructions: [
    'Sélectionnez une copie du PDF et lisez le nombre total de pages.',
    'Choisissez un fichier par page ou le mode plages personnalisées.',
    'Saisissez des groupes valides comme 1-3, 5, 8-10 en utilisant les positions physiques.',
    'Lancez la division et téléchargez chaque sortie avant de fermer l’onglet.',
    'Ouvrez les fichiers, vérifiez pages, fonctions et exigences du destinataire.',
  ],
  examples: [
    'Extraire les pages 1 à 4 d’un rapport pour créer un résumé indépendant.',
    'Séparer un scan mensuel en plusieurs périodes avec des plages.',
    'Créer un fichier par feuille pour un portail qui impose des dépôts séparés.',
    'Découper un manuel en chapitres sans envoyer l’intégralité du document.',
    'Extraire deux parties puis les réunir dans un ordre différent.',
  ],
  audience: [
    'Personnel administratif séparant dossiers, factures ou formulaires.',
    'Étudiants et enseignants distribuant une partie d’un support.',
    'Professionnels partageant uniquement une section autorisée.',
    'Personnes souhaitant traiter un PDF localement dans le navigateur.',
  ],
  caseStudies: [
    {
      title: 'Résumé et annexes',
      description: 'Une équipe lit un rapport de 42 pages et saisit `1-4, 35-42`. Elle obtient deux fichiers, vérifie leurs extrémités et confirme que le résumé et les annexes sont complets.',
    },
    {
      title: 'Archive de factures',
      description: 'Un service repère trois lots aux positions 1-7, 8-15 et 16-23. Il crée les plages, télécharge les trois PDF, les renomme et conserve le scan complet pour toute vérification.',
    },
    {
      title: 'Contrat signé',
      description: 'Une page de signature est extraite uniquement pour consultation. Le document ayant une signature numérique, le PDF complet reste la référence et sa validité est contrôlée avec le logiciel approprié.',
    },
  ],
  notes: [
    'Les numéros correspondent aux positions physiques, pas toujours à la pagination imprimée.',
    'Chaque groupe séparé par une virgule crée son propre fichier.',
    'Signatures, formulaires et fonctions avancées peuvent disparaître ou ne plus être valides.',
    'Les documents chiffrés ou endommagés ne sont pas déverrouillés.',
    'La mémoire disponible peut imposer des fichiers plus petits sur téléphone.',
  ],
  faq: [
    { q: 'Le PDF est-il envoyé à FunnyTools ?', a: 'Non. Le fichier est lu et divisé dans la mémoire du navigateur.' },
    { q: 'Comment extraire les pages 1 à 3 et la page 8 ?', a: 'Choisissez les plages personnalisées et saisissez `1-3, 8`. Deux PDF seront créés.' },
    { q: 'Puis-je réunir plusieurs plages dans un seul fichier ?', a: 'Pas directement dans cet outil. Téléchargez les groupes puis assemblez-les avec l’outil de fusion PDF.' },
    { q: 'Le document original est-il modifié ?', a: 'Non. De nouvelles copies sont créées et le fichier source reste intact sur votre appareil.' },
    { q: 'Une signature numérique est-elle conservée ?', a: 'Ce n’est pas garanti. La création d’un nouveau fichier peut invalider ou supprimer la signature.' },
    { q: 'Pourquoi la page imprimée ne correspond-elle pas au numéro saisi ?', a: 'L’outil utilise la position depuis la première feuille. Une couverture et une préface peuvent décaler la pagination visible.' },
    { q: 'Pourquoi mon PDF avec mot de passe ne s’ouvre-t-il pas ?', a: 'L’outil ne déverrouille pas les fichiers protégés. Utilisez une copie autorisée depuis l’application d’origine.' },
    { q: 'Combien de pages puis-je traiter ?', a: 'La limite réelle dépend de la mémoire. En pratique, restez autour de 40 Mo et moins de 300 pages, avec des lots plus petits sur mobile.' },
  ],
  labels: {
    localNote: 'Le PDF est traité dans ce navigateur et n’est pas envoyé à FunnyTools.',
    upload: 'Choisir un PDF',
    analyze: 'Lire le nombre de pages',
    modeLabel: 'Mode de division',
    modeEvery: 'Un PDF par page',
    modeRanges: 'Plages personnalisées',
    rangesLabel: 'Plages de pages',
    rangesPlaceholder: 'Exemple : 1-3, 5, 8-10',
    pageCount: 'Nombre total de pages : {count}',
    split: 'Diviser le PDF',
    reset: 'Réinitialiser',
    processing: 'Traitement en cours…',
    outputTitle: 'Fichiers à télécharger',
    noOutput: 'Aucun fichier n’a encore été créé',
    download: 'Télécharger',
    noFile: 'Choisissez d’abord un fichier PDF.',
    pdfOnly: 'Choisissez un fichier au format PDF.',
    loadError: 'Impossible de lire le PDF. Vérifiez qu’il n’est ni endommagé, ni chiffré, ni protégé.',
    emptyRange: 'Saisissez au moins une plage de pages.',
    invalidRange: 'La plage est invalide. Utilisez un format comme 1-3, 5, 8-10.',
    splitError: 'Impossible de diviser le PDF. Essayez un fichier plus petit et non chiffré.',
  },
  privacyNote: 'Le PDF reste dans la mémoire de ce navigateur. FunnyTools ne reçoit ni le document ni ses pages. Les liens temporaires disparaissent après réinitialisation, rechargement ou fermeture.',
  disclaimer: 'Vérifiez chaque sortie et conservez l’original. FunnyTools ne garantit pas la conservation des signatures, formulaires, signets, pièces jointes, permissions ni exigences administratives.',
  sources: [
    {
      label: 'pdf-lib — documentation',
      href: 'https://pdf-lib.js.org/',
      note: 'Bibliothèque utilisée pour lire et copier des pages PDF dans le navigateur.',
    },
    {
      label: 'Adobe — signatures numériques PDF',
      href: 'https://helpx.adobe.com/fr/acrobat/using/certificate-based-signatures.html',
      note: 'Documentation sur la validation des signatures fondées sur un certificat dans un PDF.',
    },
  ],
};

export const frenchSplitPdfReview = {
  heading: 'Vérifier un PDF divisé avant de le transmettre',
  intro: 'Le contrôle doit montrer qu’aucune page utile ne manque et que la nouvelle copie reste adaptée à sa destination, notamment lorsqu’un formulaire ou une signature est présent.',
  panels: [
    { title: 'Comparer les positions', text: 'Contrôlez la première et la dernière page de chaque groupe par rapport à l’original. Tenez compte du décalage entre position physique et numéro imprimé.' },
    { title: 'Ouvrir chaque fichier', text: 'Vérifiez le nom, le total, l’orientation et la lisibilité. Pour de nombreuses sorties, notez les téléchargements effectués avant de fermer l’onglet.' },
    { title: 'Tester les fonctions', text: 'Examinez signatures, formulaires, liens, signets et règles du portail. Le PDF complet reste la référence lorsque la procédure l’exige.' },
  ],
  checklistHeading: 'Liste de contrôle avant partage',
  checklist: [
    'Les plages correspondent aux positions physiques prévues.',
    'Chaque sortie contient le début, la fin et le total attendus.',
    'Aucune validité de signature ou de formulaire n’a été supposée.',
    'Le fichier est accepté par le système de destination.',
  ],
};
