import type { ToolContent } from '../tools/_types';

export const frenchImageCropper: ToolContent = {
  name: 'Recadrer une image en ligne',
  short: 'Sélectionnez la zone rectangulaire à conserver et téléchargez une nouvelle image sans envoyer l’original.',
  long: 'Cet outil de recadrage ouvre une photo, une capture ou un visuel dans votre navigateur. Faites glisser le pointeur sur l’aperçu pour délimiter la partie à garder, lisez les dimensions du recadrage puis créez une nouvelle copie. Les pixels situés hors du rectangle sont exclus du téléchargement. FunnyTools ne reçoit pas l’image ni la sélection.',
  seoTitle: 'Recadrer une image en ligne gratuitement',
  seoDescription: 'Recadrez une photo dans le navigateur, choisissez la zone à garder, contrôlez les pixels et téléchargez sans envoyer le fichier.',
  keywords: ['recadrer une image en ligne', 'recadrer photo gratuitement', 'rogner une image', 'découper photo', 'recadrer image en pixels', 'recadrer photo sans inscription', 'couper les bords image'],
  capabilities: [
    'Tracer librement un rectangle sur l’aperçu.',
    'Lire la largeur et la hauteur de la sélection en pixels réels.',
    'Recommencer la sélection avant téléchargement.',
    'Conserver autant que possible JPG, PNG ou WebP.',
    'Créer une copie locale sans modifier l’original.',
  ],
  contentSections: [
    {
      heading: 'Réponse rapide : comment recadrer une photo',
      paragraphs: [
        'Choisissez l’image, puis faites glisser le pointeur depuis un angle de la zone utile jusqu’à l’angle opposé. Vérifiez les dimensions indiquées, observez les quatre bords et cliquez sur « Recadrer et télécharger ». Si le cadre coupe un élément important, tracez simplement une nouvelle sélection.',
        'Recadrer signifie garder un rectangle et supprimer ce qui se trouve autour dans la copie. L’outil ne déplace pas automatiquement le sujet, ne supprime pas un arrière-plan et ne change pas la largeur finale vers une valeur imposée. Redimensionnez après le recadrage si un portail demande exactement 600 × 600 pixels.',
      ],
    },
    {
      heading: 'Recadrer, redimensionner et supprimer le fond',
      paragraphs: [
        'Le recadrage change le cadrage et souvent le rapport largeur/hauteur. Le redimensionnement conserve tout le cadre mais change le nombre de pixels. La suppression de fond suit les contours d’un sujet et crée éventuellement de la transparence. Ces opérations répondent à trois demandes différentes.',
        'Pour une photo de profil carrée, commencez par tracer un carré autour du visage, puis redimensionnez la copie. Pour isoler une personne de forme irrégulière, un rectangle ne suffit pas : il faut un outil de masque ou de détourage. Pour réduire uniquement les Ko, utilisez ensuite la compression.',
      ],
      items: [
        'Couper un panneau inutile sur le bord : recadrage.',
        'Passer de 2 000 à 800 pixels de large : redimensionnement.',
        'Rendre transparent ce qui entoure un produit : détourage.',
        'Respecter moins de 500 Ko : compression et contrôle du poids.',
      ],
    },
    {
      heading: 'Choisir un cadre carré, portrait ou 16:9',
      paragraphs: [
        'La sélection est libre et ne bloque pas un rapport. Pour approcher un carré, surveillez que largeur et hauteur affichées sont identiques. Pour 16:9, comparez par exemple 1 600 × 900, 1 280 × 720 ou 800 × 450. Une petite différence peut ensuite être corrigée au redimensionnement.',
        'Les tailles recommandées par les réseaux sociaux évoluent et certaines interfaces affichent une image carrée sous forme de cercle. Gardez une marge autour du visage, du logo et des textes. Testez la copie dans le conteneur réel plutôt que de supposer qu’un rapport suffit.',
      ],
    },
    {
      heading: 'Composition : ce qui doit rester dans les quatre bords',
      paragraphs: [
        'Regardez chaque angle, pas seulement le centre. Vérifiez cheveux, mains, accessoires, légendes, ombres et contexte. Un cadrage trop serré peut sembler correct en grand mais devenir maladroit dans une vignette. Laissez de l’espace dans la direction du regard ou du mouvement lorsque cela sert la lecture.',
        'Le recadrage peut aussi retirer une information sensible située autour du sujet : adresse, nom, écran voisin ou plaque. Ouvrez toutefois la copie pour confirmer qu’elle a réellement disparu. Gardez l’original dans un emplacement approprié si vous devez conserver le contexte complet.',
      ],
    },
    {
      heading: 'Pixels, qualité, format et métadonnées',
      paragraphs: [
        'Les pixels du rectangle sont prélevés à la résolution de la source. Le contenu n’est pas agrandi pendant le recadrage. JPEG et WebP doivent néanmoins être réencodés pour créer un nouveau fichier, ce qui peut légèrement modifier leur qualité. PNG reste adapté à la transparence et aux aplats.',
        'Les métadonnées comme date, position GPS, orientation EXIF et profil particulier ne sont pas garanties. Une animation peut devenir fixe. La copie n’est donc pas une archive maîtresse. Vérifiez son extension, ses dimensions, sa transparence et son ouverture dans un autre lecteur.',
      ],
    },
    {
      heading: 'Limites du navigateur et contrôle final',
      paragraphs: [
        'L’entrée est limitée à 20 Mo et 40 millions de pixels. Une image occupe beaucoup plus de mémoire une fois décodée ; un téléphone peut donc échouer avant ces plafonds. Pour un grand fichier, fermez d’autres onglets ou utilisez un ordinateur.',
        'Chargez la copie dans le document, profil ou formulaire final. Le service peut appliquer un second recadrage, une forme circulaire ou une compression. Conservez l’original jusqu’à validation et ne remplacez jamais une preuve ou un document maître par un recadrage sans vérifier le besoin.',
      ],
    },
  ],
  instructions: [
    'Choisissez une image compatible.',
    'Faites glisser sur l’aperçu pour tracer la zone à conserver.',
    'Contrôlez largeur, hauteur et quatre bords.',
    'Tracez une nouvelle sélection si nécessaire.',
    'Téléchargez la copie et testez-la dans son conteneur final.',
  ],
  examples: [
    'Retirer une grande marge autour d’un produit.',
    'Préparer un portrait carré avant de le redimensionner.',
    'Conserver uniquement un graphique dans une capture d’écran.',
    'Éliminer du cadre une information personnelle visible sur le bord.',
    'Créer un cadrage 16:9 approximatif pour une miniature.',
  ],
  audience: [
    'Personnes préparant une photo de profil ou de dossier.',
    'Créateurs ajustant un cadrage pour un article ou une présentation.',
    'Élèves et enseignants isolant une zone utile d’une capture.',
    'Utilisateurs souhaitant recadrer localement une image privée.',
  ],
  caseStudies: [
    { title: 'Portrait pour un profil', description: 'La sélection garde le visage et une marge régulière. La copie est ensuite redimensionnée à 600 × 600 et testée dans la prévisualisation circulaire du service.' },
    { title: 'Capture contenant une donnée privée', description: 'Une adresse apparaît sur le bord. Le recadrage l’exclut ; la personne ouvre ensuite le téléchargement pour confirmer que seule la zone nécessaire subsiste.' },
    { title: 'Produit trop serré', description: 'Le premier cadre coupe l’ombre et donne une impression artificielle. Une seconde sélection plus large préserve le produit, son ombre et un espace régulier.' },
  ],
  notes: [
    'La sélection est rectangulaire et libre.',
    'Le recadrage ne détoure pas un sujet et ne supprime pas le fond.',
    'Une taille exacte peut nécessiter un redimensionnement ultérieur.',
    'Métadonnées et animation peuvent ne pas être conservées.',
    'L’original reste la source à garder.',
  ],
  faq: [
    { q: 'Comment recadrer une image en ligne ?', a: 'Choisissez le fichier, tracez un rectangle sur l’aperçu, contrôlez les pixels puis téléchargez la copie.' },
    { q: 'Puis-je obtenir un carré ou du 16:9 ?', a: 'La sélection ne se verrouille pas. Utilisez les dimensions affichées pour approcher le rapport, puis redimensionnez si nécessaire.' },
    { q: 'Le recadrage réduit-il la qualité ?', a: 'La zone vient des pixels originaux, mais JPEG et WebP sont réencodés. Contrôlez la copie à 100 %.' },
    { q: 'Puis-je enlever le fond ?', a: 'Non. L’outil retire seulement ce qui se trouve hors d’un rectangle.' },
    { q: 'Quel format sera téléchargé ?', a: 'L’outil tente de conserver JPG, PNG ou WebP ; un autre format peut ressortir en PNG.' },
    { q: 'L’image est-elle envoyée à FunnyTools ?', a: 'Non. La lecture, la sélection et l’exportation ont lieu dans le navigateur.' },
    { q: 'Puis-je déplacer une sélection existante ?', a: 'Tracez une nouvelle sélection à l’endroit voulu ; elle remplace la précédente.' },
    { q: 'Pourquoi le portail recadre-t-il encore ma photo ?', a: 'Certains services appliquent leur propre rapport ou masque. Testez toujours dans la destination réelle.' },
  ],
  labels: {
    localNote: 'L’image est recadrée dans ce navigateur et n’est pas envoyée à FunnyTools.',
    upload: 'Choisir une image',
    hint: 'Faites glisser sur l’image pour délimiter la zone rectangulaire à conserver.',
    canvasLabel: 'Zone de sélection pour recadrer une image',
    originalSize: 'Poids du fichier original',
    dimensions: 'Dimensions d’origine',
    selection: 'Dimensions du recadrage',
    cropDownload: 'Recadrer et télécharger',
    reset: 'Réinitialiser',
    invalidType: 'Choisissez un fichier image valide.',
    tooLarge: 'L’image dépasse la limite de 20 Mo ou 40 millions de pixels.',
    processError: 'Impossible d’ouvrir cette image. Essayez un autre fichier.',
    noSelection: 'Faites glisser sur l’image pour sélectionner une zone.',
  },
  privacyNote: 'L’image est décodée, affichée et recadrée dans la mémoire du navigateur. FunnyTools ne reçoit ni le fichier ni la zone sélectionnée. Les données temporaires disparaissent après réinitialisation ou fermeture.',
  disclaimer: 'Conservez l’original et vérifiez le téléchargement. FunnyTools ne garantit ni un rapport exact, ni les métadonnées, ni le recadrage ultérieur appliqué par une plateforme.',
  sources: [
    { label: 'MDN — drawImage()', href: 'https://developer.mozilla.org/fr/docs/Web/API/CanvasRenderingContext2D/drawImage', note: 'Méthode utilisée pour copier une zone source vers le canevas de sortie.' },
  ],
};

export const frenchImageCropperReview = {
  heading: 'Vérifier que le recadrage conserve l’essentiel',
  intro: 'Contrôlez le cadre entier, les pixels, le format et l’affichage final.',
  panels: [
    { title: 'Regarder les quatre coins', text: 'Confirmez qu’aucun texte, cheveu, accessoire ou contexte utile n’est coupé.' },
    { title: 'Confirmer les dimensions', text: 'Comparez les propriétés du fichier à la sélection. Redimensionnez ensuite si une valeur exacte est exigée.' },
    { title: 'Tester le conteneur', text: 'Placez la copie dans le profil ou document réel et repérez un éventuel second recadrage.' },
  ],
  checklistHeading: 'Liste de contrôle',
  checklist: [
    'Le sujet et le contexte utile restent dans les quatre bords.',
    'Les informations sensibles autour ont bien disparu.',
    'Format, pixels, transparence et netteté conviennent.',
    'L’original demeure conservé.',
  ],
};

export const frenchJpgToWebp: ToolContent = {
  name: 'Convertir un JPG en WebP en ligne',
  short: 'Créez une copie WebP, réglez la qualité et comparez le poids avant téléchargement.',
  long: 'Ce convertisseur ouvre un JPG ou JPEG dans votre navigateur et crée un WebP aux mêmes dimensions. Le curseur de qualité va de 40 % à 100 % et actualise l’aperçu. Comparez le poids réel des deux fichiers avant de décider. La conversion n’envoie pas l’image à FunnyTools, ne redimensionne pas et ne garantit pas que le WebP sera toujours plus léger.',
  seoTitle: 'Convertir JPG en WebP en ligne gratuitement',
  seoDescription: 'Convertissez JPG en WebP, réglez la qualité, comparez le poids et téléchargez localement sans modifier les dimensions.',
  keywords: ['convertir JPG en WebP', 'JPG WebP en ligne', 'convertisseur JPEG WebP', 'réduire poids image WebP', 'photo WebP gratuite', 'JPG vers WebP sans inscription'],
  capabilities: [
    'Lire JPG et JPEG jusqu’à 20 Mo et 40 millions de pixels.',
    'Créer un WebP avec les mêmes largeur et hauteur.',
    'Régler la qualité de 40 % à 100 %.',
    'Comparer le poids JPG et le poids WebP.',
    'Télécharger localement sans écraser l’original.',
  ],
  contentSections: [
    {
      heading: 'Réponse rapide : comment convertir JPG en WebP',
      paragraphs: [
        'Choisissez le JPG, commencez autour de 80 % de qualité, puis comparez l’aperçu et le poids. Zoomez sur les visages, les textes, les contours et les dégradés. Téléchargez le WebP seulement s’il apporte un gain de poids ou répond à une exigence de publication.',
        'La largeur et la hauteur restent identiques. Une photo de 4 000 pixels reste surdimensionnée pour une zone de 800 pixels, même si son WebP est plus léger. Redimensionnez d’abord lorsque la page n’a pas besoin de tous les pixels.',
      ],
    },
    {
      heading: 'WebP est-il toujours plus léger que JPG',
      paragraphs: [
        'Non. Le résultat dépend de l’image source, de sa compression antérieure, du navigateur et de la qualité choisie. Un JPG déjà bien optimisé peut rester plus petit. L’indication utile est la différence réelle en octets, pas la réputation générale du format.',
        'Si le WebP pèse davantage, essayez une qualité légèrement inférieure et vérifiez à nouveau l’image. Si la dégradation apparaît avant le gain, gardez le JPG. Une conversion sans avantage mesurable ajoute seulement un fichier à gérer.',
      ],
    },
    {
      heading: 'Qualité WebP et contrôle visuel',
      paragraphs: [
        'Le pourcentage est une demande au moteur d’encodage, pas une note absolue. Une photographie, un ciel, du feuillage et une capture avec du texte réagissent différemment. Comparez les zones difficiles à la taille réelle d’usage et à 100 %.',
        'Un gain important peut être acceptable pour une vignette mais pas pour une photo de produit ou une image documentaire. Conservez une source de meilleure qualité, car une plateforme peut recomprimer le WebP au moment de la mise en ligne.',
      ],
    },
    {
      heading: 'Compatibilité, transparence et animation',
      paragraphs: [
        'Les navigateurs modernes prennent largement WebP en charge, mais certains logiciels, portails administratifs ou anciens circuits d’impression exigent encore JPG ou PNG. Testez le fichier dans le CMS, l’application, le courriel et le destinataire réels.',
        'WebP accepte la transparence, mais un JPG n’a pas de canal alpha : cette conversion ne retire donc pas le fond. Elle crée une image fixe et ne transforme pas une photo en animation. Le format disponible n’ajoute pas des informations absentes de la source.',
      ],
    },
    {
      heading: 'Traitement local, métadonnées et limites',
      paragraphs: [
        'Le JPG est décodé, dessiné sur un canevas puis exporté en `image/webp` dans la mémoire du navigateur. FunnyTools ne reçoit pas ses pixels. L’entrée est limitée à 20 Mo et 40 millions de pixels, avec une mémoire réelle plus faible sur certains téléphones.',
        'EXIF, date, lieu, orientation et profils particuliers ne sont pas garantis. Gardez le JPG original comme archive et vérifiez l’orientation, les couleurs, l’extension et le type MIME de la sortie.',
      ],
    },
    {
      heading: 'Publier et mesurer le résultat réel',
      paragraphs: [
        'Après téléchargement, ouvrez le WebP ailleurs puis servez-le dans la page ou l’application ciblée. Contrôlez que le serveur renvoie `image/webp`, que le cache se met à jour et que l’image apparaît sur mobile et ordinateur.',
        'Pour le web, le gain doit être évalué dans la page complète : poids transféré, dimensions adaptées, netteté et stabilité visuelle. Une copie plus légère aide, mais elle ne compense pas une image affichée beaucoup plus petite que ses dimensions réelles.',
      ],
    },
  ],
  instructions: [
    'Choisissez un JPG ou JPEG valide.',
    'Réglez la qualité WebP et attendez l’aperçu.',
    'Comparez poids, netteté et dimensions.',
    'Téléchargez la copie sans supprimer le JPG.',
    'Testez le WebP dans le vrai système de publication.',
  ],
  examples: [
    'Créer un WebP plus léger pour une photo d’article.',
    'Comparer plusieurs qualités pour une image de produit.',
    'Conserver le JPG lorsqu’il est déjà plus léger.',
    'Redimensionner puis convertir une photo trop grande.',
    'Tester un CMS avant de remplacer une bibliothèque d’images.',
  ],
  audience: [
    'Gestionnaires de sites optimisant des photos.',
    'Créateurs comparant format, poids et qualité.',
    'Développeurs testant la prise en charge de WebP.',
    'Utilisateurs souhaitant convertir sans téléverser une image privée.',
  ],
  caseStudies: [
    { title: 'Photo d’article', description: 'Le WebP à 82 % réduit nettement le poids tout en gardant le visage et les détails lisibles. Il est testé sur la page avant remplacement.' },
    { title: 'JPG déjà optimisé', description: 'La copie WebP pèse davantage à qualité comparable. Le JPG est conservé, car changer de format n’apporte aucun bénéfice.' },
    { title: 'Logiciel incompatible', description: 'Le navigateur affiche WebP, mais un outil interne le refuse. L’équipe garde JPG pour ce circuit et réserve WebP au site compatible.' },
  ],
  notes: [
    'WebP n’est pas toujours plus léger.',
    'Les dimensions ne changent pas.',
    'La conversion ne crée pas de transparence.',
    'Métadonnées et profils peuvent disparaître.',
    'La compatibilité doit être testée dans le destinataire.',
  ],
  faq: [
    { q: 'Comment convertir JPG en WebP ?', a: 'Choisissez le JPG, réglez la qualité, comparez le poids puis téléchargez le WebP.' },
    { q: 'WebP est-il toujours plus léger ?', a: 'Non. Cela dépend de la source et de la qualité. Fiez-vous aux poids affichés.' },
    { q: 'Les dimensions changent-elles ?', a: 'Non. Redimensionnez séparément si vous devez réduire les pixels.' },
    { q: 'Le WebP devient-il transparent ?', a: 'Non. Un JPG ne contient aucune transparence à conserver.' },
    { q: 'Quelle qualité choisir ?', a: 'Commencez vers 80 %, inspectez les détails puis ajustez selon le support.' },
    { q: 'Tous les logiciels acceptent-ils WebP ?', a: 'Non. Les navigateurs modernes oui, mais certains portails ou logiciels exigent encore JPG.' },
    { q: 'Les données EXIF sont-elles conservées ?', a: 'Ce n’est pas garanti. Gardez le JPG original.' },
    { q: 'L’image est-elle envoyée à FunnyTools ?', a: 'Non. Le fichier est converti dans le navigateur.' },
  ],
  labels: {
    outputMime: 'image/webp',
    extension: 'webp',
    accept: 'image/jpeg,.jpg,.jpeg',
    localNote: 'L’image est convertie dans ce navigateur et n’est pas envoyée à FunnyTools.',
    upload: 'Choisir un JPG',
    quality: 'Qualité WebP',
    background: 'Fond de transparence',
    source: 'Aperçu JPG',
    output: 'Aperçu WebP',
    originalSize: 'Poids du JPG',
    outputSize: 'Poids du WebP',
    download: 'Télécharger le WebP',
    reset: 'Réinitialiser',
    tooLarge: 'L’image dépasse la limite de 20 Mo ou 40 millions de pixels.',
    failed: 'Impossible de convertir ce JPG. Vérifiez que le fichier est valide.',
  },
  privacyNote: 'Le JPG est décodé et exporté en WebP dans la mémoire du navigateur. FunnyTools ne reçoit ni le fichier ni son contenu. Les URL temporaires disparaissent après réinitialisation ou fermeture.',
  disclaimer: 'Conservez le JPG et validez le WebP dans sa destination. FunnyTools ne garantit ni économie précise, ni compatibilité universelle, ni conservation des métadonnées.',
  sources: [
    { label: 'MDN — guide WebP', href: 'https://developer.mozilla.org/fr/docs/Web/Media/Guides/Formats/Image_types#webp', note: 'Caractéristiques, transparence et prise en charge du format WebP.' },
  ],
};

export const frenchJpgToWebpReview = {
  heading: 'Vérifier que WebP améliore réellement le parcours',
  intro: 'Une conversion utile doit démontrer un gain, une fidélité suffisante et une compatibilité réelle.',
  panels: [
    { title: 'Comparer les octets', text: 'Si le WebP pèse plus lourd, essayez une autre qualité ou conservez le JPG.' },
    { title: 'Observer les détails', text: 'Zoomez sur texte, peau, bords et dégradés afin de repérer les défauts.' },
    { title: 'Tester la publication', text: 'Vérifiez le CMS, le type MIME, le mobile, l’ordinateur et les logiciels destinataires.' },
  ],
  checklistHeading: 'Liste de contrôle',
  checklist: [
    'Le WebP est plus léger ou répond à un besoin documenté.',
    'Les détails utiles restent lisibles.',
    'Le destinataire accepte `image/webp`.',
    'Le JPG original demeure conservé.',
  ],
};

export const frenchWebpToJpg: ToolContent = {
  name: 'Convertir un WebP en JPG en ligne',
  short: 'Transformez un WebP en JPG, choisissez le fond de la transparence et réglez la qualité.',
  long: 'Ce convertisseur ouvre un WebP dans votre navigateur, peint une couleur derrière l’image puis crée une copie JPEG aux mêmes dimensions. Choisissez le fond des pixels transparents, réglez la qualité de 40 % à 100 %, comparez les poids et téléchargez le .jpg. Le fichier n’est pas envoyé à FunnyTools. La sortie est fixe et ne conserve ni transparence ni animation.',
  seoTitle: 'Convertir WebP en JPG en ligne gratuitement',
  seoDescription: 'Convertissez WebP en JPG, choisissez un fond blanc ou coloré, réglez la qualité et téléchargez sans envoyer le fichier.',
  keywords: ['convertir WebP en JPG', 'WebP JPG en ligne', 'convertisseur WebP JPEG', 'ouvrir WebP en JPG', 'WebP JPG fond blanc', 'changer image WebP'],
  capabilities: [
    'Ouvrir un WebP jusqu’à 20 Mo et 40 millions de pixels.',
    'Créer un JPG aux mêmes largeur et hauteur.',
    'Choisir la couleur qui remplace la transparence.',
    'Régler la qualité JPEG et comparer le poids.',
    'Télécharger localement sans modifier l’original.',
  ],
  contentSections: [
    {
      heading: 'Réponse rapide : comment convertir WebP en JPG',
      paragraphs: [
        'Choisissez le WebP, sélectionnez un fond — blanc par défaut — et réglez la qualité JPG. Comparez les deux aperçus et les poids, puis téléchargez la copie. Ouvrez-la dans l’application qui refusait WebP afin de confirmer la compatibilité.',
        'Renommer `.webp` en `.jpg` ne convertit rien : les octets et le type restent WebP. Cette page décode réellement l’image puis la réencode en JPEG. L’opération conserve les dimensions, mais elle peut modifier la qualité et les métadonnées.',
      ],
    },
    {
      heading: 'Transparence : choisir le fond avant la conversion',
      paragraphs: [
        'WebP peut contenir des pixels transparents ou semi-transparents ; JPEG ne le peut pas. L’outil remplit donc le canevas avec la couleur choisie avant de dessiner l’image. Ce fond devient permanent dans la copie.',
        'Le blanc convient à de nombreux documents, mais peut créer un halo autour d’un élément conçu pour un fond sombre. Inspectez les cheveux, les ombres et les bords. Le sélecteur ne retire pas un fond opaque : il agit seulement sur la transparence existante.',
      ],
      items: [
        'Logo transparent : choisissez la couleur réelle du support.',
        'Ombres translucides : contrôlez les halos.',
        'Photo opaque : le fond choisi ne change normalement rien.',
        'Besoin de transparence : gardez le WebP ou utilisez PNG.',
      ],
    },
    {
      heading: 'Animation WebP : la sortie JPG sera fixe',
      paragraphs: [
        'Un WebP peut contenir plusieurs images animées. Le canevas de cette page exporte une seule image fixe. Le mouvement, le rythme et les autres images ne sont pas conservés. Ne convertissez pas si l’animation porte une information importante.',
        'Avant téléchargement, vérifiez l’original dans un lecteur compatible. Si le mouvement est nécessaire, choisissez plutôt un format animé accepté par le destinataire. Une capture fixe peut être appropriée uniquement lorsqu’elle représente volontairement l’image voulue.',
      ],
    },
    {
      heading: 'Qualité JPEG et poids du résultat',
      paragraphs: [
        'Le curseur ajuste une compression avec perte. Commencez vers 85 %, puis examinez les textes, bords et dégradés. Le JPG n’est pas garanti plus léger qu’un WebP déjà optimisé. Comparez les octets affichés et la lisibilité.',
        'Si la copie est trop lourde, baissez la qualité par petites étapes ou réduisez les dimensions. Si elle est plus lourde et que le service accepte WebP, gardez l’original. La compatibilité peut justifier une copie plus lourde, mais cette décision doit être consciente.',
      ],
    },
    {
      heading: 'Traitement local, métadonnées et limites',
      paragraphs: [
        'Le WebP est décodé, mélangé au fond et exporté en `image/jpeg` dans la mémoire du navigateur. FunnyTools ne reçoit pas le fichier. La limite est de 20 Mo et 40 millions de pixels ; un appareil peu puissant peut nécessiter moins.',
        'Date, lieu, orientation, profil de couleur et autres métadonnées ne sont pas garantis. Conservez le WebP original et contrôlez l’extension, le type, les couleurs, l’orientation et l’ouverture de la copie.',
      ],
    },
    {
      heading: 'Vérifier le JPG dans le système destinataire',
      paragraphs: [
        'Ouvrez le fichier dans un autre lecteur. Examinez le fond, les contours, le poids, les dimensions et l’image choisie si la source était animée. Comparez au WebP original avant de l’envoyer.',
        'Chargez ensuite le JPG dans le portail ou logiciel qui motivait la conversion. Confirmez qu’il est accepté et qu’aucun second recadrage ou réencodage ne dégrade le rendu. Gardez l’original jusqu’à la fin du parcours.',
      ],
    },
  ],
  instructions: [
    'Choisissez un fichier WebP.',
    'Sélectionnez la couleur qui remplacera la transparence.',
    'Réglez la qualité JPG et comparez les poids.',
    'Vérifiez la perte éventuelle d’animation.',
    'Téléchargez puis testez la copie dans le destinataire.',
  ],
  examples: [
    'Créer un JPG pour un logiciel qui refuse WebP.',
    'Ajouter un fond blanc à un logo transparent.',
    'Préparer une image fixe à partir d’un WebP non animé.',
    'Comparer le poids avant de remplacer un fichier web.',
    'Garder WebP lorsque transparence ou animation reste nécessaire.',
  ],
  audience: [
    'Personnes confrontées à un logiciel incompatible avec WebP.',
    'Équipes préparant des images pour un document ou formulaire.',
    'Créateurs choisissant un fond pour une image transparente.',
    'Utilisateurs souhaitant convertir localement une image privée.',
  ],
  caseStudies: [
    { title: 'Portail qui exige JPG', description: 'Le WebP opaque est converti à 85 %, le poids reste acceptable et le portail accepte la copie. L’original demeure archivé.' },
    { title: 'Logo transparent', description: 'Le fond du document est bleu. La même couleur est choisie avant conversion et les bords sont vérifiés pour éviter un halo blanc.' },
    { title: 'WebP animé', description: 'La prévisualisation révèle un mouvement utile. La personne renonce au JPG fixe et recherche un format animé accepté par le destinataire.' },
  ],
  notes: [
    'Renommer l’extension ne convertit pas le fichier.',
    'La transparence devient le fond choisi.',
    'Une animation WebP devient une image fixe.',
    'Le JPG n’est pas toujours plus léger.',
    'Les métadonnées peuvent disparaître.',
  ],
  faq: [
    { q: 'Comment convertir WebP en JPG ?', a: 'Choisissez le WebP, sélectionnez le fond, réglez la qualité puis téléchargez le JPG.' },
    { q: 'Que devient la transparence ?', a: 'Elle est mélangée avec la couleur choisie, car JPEG ne contient pas de canal alpha.' },
    { q: 'Puis-je simplement renommer le fichier ?', a: 'Non. Renommer ne modifie ni les octets ni le type MIME.' },
    { q: 'L’animation est-elle conservée ?', a: 'Non. La copie JPEG contient une seule image fixe.' },
    { q: 'Le JPG sera-t-il plus léger ?', a: 'Ce n’est pas garanti. Comparez les tailles affichées.' },
    { q: 'Les dimensions changent-elles ?', a: 'Non. La largeur et la hauteur naturelles sont conservées.' },
    { q: 'Quel fond choisir ?', a: 'Utilisez la couleur du support final et examinez les bords semi-transparents.' },
    { q: 'Le fichier est-il envoyé à FunnyTools ?', a: 'Non. Il est décodé et exporté dans le navigateur.' },
  ],
  labels: {
    outputMime: 'image/jpeg',
    extension: 'jpg',
    accept: 'image/webp,.webp',
    localNote: 'L’image est convertie dans ce navigateur et n’est pas envoyée à FunnyTools.',
    upload: 'Choisir un WebP',
    quality: 'Qualité JPG',
    background: 'Fond de transparence',
    source: 'Aperçu WebP',
    output: 'Aperçu JPG',
    originalSize: 'Poids du WebP',
    outputSize: 'Poids du JPG',
    download: 'Télécharger le JPG',
    reset: 'Réinitialiser',
    tooLarge: 'L’image dépasse la limite de 20 Mo ou 40 millions de pixels.',
    failed: 'Impossible de convertir ce WebP. Vérifiez que le fichier est valide.',
  },
  privacyNote: 'Le WebP est décodé, mélangé au fond et exporté en JPEG dans le navigateur. FunnyTools ne reçoit pas le fichier. Les URL temporaires disparaissent après réinitialisation ou fermeture.',
  disclaimer: 'Conservez le WebP original et vérifiez le JPG. La conversion supprime transparence et animation, peut ajouter une perte et ne garantit ni poids réduit ni métadonnées.',
  sources: [
    { label: 'MDN — guide WebP et JPEG', href: 'https://developer.mozilla.org/fr/docs/Web/Media/Guides/Formats/Image_types', note: 'Caractéristiques de WebP, JPEG, transparence et compatibilité.' },
  ],
};

export const frenchWebpToJpgReview = {
  heading: 'Vérifier un JPG créé depuis WebP',
  intro: 'Contrôlez le fond, l’image fixe, la qualité, le poids et la compatibilité.',
  panels: [
    { title: 'Examiner le fond', text: 'Regardez les espaces, bords, ombres et cheveux afin de repérer un halo.' },
    { title: 'Confirmer l’image fixe', text: 'Si la source était animée, vérifiez que la perte du mouvement est acceptable.' },
    { title: 'Tester le système', text: 'Chargez la copie dans l’application qui refusait WebP et contrôlez type, poids et rendu.' },
  ],
  checklistHeading: 'Liste de contrôle',
  checklist: [
    'La transparence utilise le fond voulu.',
    'La perte d’animation est comprise.',
    'Les détails restent suffisamment nets.',
    'Le WebP original demeure conservé.',
  ],
};
