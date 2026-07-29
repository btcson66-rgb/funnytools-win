import type { ToolContent } from '../tools/_types';

export const frenchImageResizer: ToolContent = {
  name: 'Redimensionner une image en ligne',
  short: 'Modifiez la largeur et la hauteur en pixels, conservez les proportions et téléchargez une nouvelle copie.',
  long: 'Ce redimensionneur d’image change les dimensions réelles d’une photo, d’une capture ou d’un visuel dans votre navigateur. Saisissez une largeur ou une hauteur entre 1 et 8 000 pixels, gardez les proportions pour éviter la déformation, ou déverrouillez-les lorsqu’un format exact est réellement nécessaire. L’aperçu permet de contrôler la copie avant téléchargement. Le fichier choisi n’est pas envoyé à FunnyTools.',
  seoTitle: 'Redimensionner une image en ligne gratuitement',
  seoDescription: 'Redimensionnez une photo par largeur et hauteur en pixels, gardez les proportions et téléchargez la copie sans envoyer le fichier.',
  keywords: [
    'redimensionner une image en ligne',
    'changer la taille d’une photo',
    'modifier dimensions image',
    'réduire image en pixels',
    'redimensionner photo gratuitement',
    'garder proportions image',
    'changer largeur hauteur photo',
  ],
  capabilities: [
    'Modifier la largeur ou la hauteur entre 1 et 8 000 pixels.',
    'Calculer automatiquement l’autre dimension en gardant les proportions.',
    'Utiliser rapidement une largeur de 1 080, 800 ou 500 pixels.',
    'Comparer l’original, l’aperçu, les dimensions et le poids de la copie.',
    'Télécharger un nouveau fichier sans écraser l’image source.',
  ],
  contentSections: [
    {
      heading: 'Réponse rapide : comment redimensionner une image sans la déformer',
      paragraphs: [
        'Choisissez l’image, laissez « Garder les proportions » activé, puis modifiez une seule dimension. Si l’original mesure 1 600 × 900 pixels et que vous saisissez 800 en largeur, la hauteur devient 450. Contrôlez l’aperçu et les dimensions annoncées avant de télécharger. Le fichier d’origine reste intact sur votre appareil.',
        'Redimensionner agit sur le nombre de pixels de toute l’image. L’opération ne recadre pas une photo et ne réduit pas directement sa qualité au moyen d’un curseur. Pour transformer un portrait rectangulaire en carré sans l’écraser, il faut d’abord recadrer ou ajouter des marges, puis ajuster les dimensions.',
      ],
    },
    {
      heading: 'Largeur, hauteur et rapport d’aspect',
      paragraphs: [
        'La largeur correspond à l’axe horizontal et la hauteur à l’axe vertical. Leur rapport définit la forme : 1 920 × 1 080, 1 280 × 720 et 800 × 450 sont tous au format 16:9. Un carré présente la même valeur sur les deux axes. Le verrou conserve ce rapport lorsque l’une des valeurs change.',
        'Commencez par la contrainte explicite du service destinataire. Pour « largeur maximale 1 200 px », saisissez 1 200 et laissez la hauteur se calculer. Pour « exactement 600 × 600 px », vérifiez si l’image est déjà carrée. Dans le cas contraire, un recadrage contrôlé évite d’étirer un visage, un cercle, un logo ou du texte.',
      ],
      items: [
        'Photo horizontale : fixez souvent la largeur maximale et gardez les proportions.',
        'Portrait : contrôlez la hauteur si le portail limite surtout l’axe vertical.',
        'Visuel carré : recadrez au carré avant de demander deux valeurs identiques.',
        'Dimensions exactes : distinguez une obligation réelle d’un simple conseil d’affichage.',
      ],
    },
    {
      heading: 'Redimensionner, recadrer et compresser : trois opérations différentes',
      paragraphs: [
        'Redimensionner modifie le nombre de pixels en conservant tout le cadre. Recadrer retire une partie du bord et peut changer la composition. Compresser réduit surtout le poids en réencodant les pixels. Un formulaire peut imposer simultanément un format JPG, une largeur maximale et moins de 500 Ko : chaque exigence demande son propre contrôle.',
        'Une photo de 4 000 × 3 000 pixels devient plus adaptée au web lorsqu’elle passe à 1 200 × 900, mais son poids peut encore dépasser la limite. Redimensionnez d’abord, puis compressez la copie si nécessaire. À l’inverse, une image légère de 4 000 pixels ne respecte pas une limite de 1 200 pixels simplement parce qu’elle ne pèse que 300 Ko.',
      ],
    },
    {
      heading: 'Réduire ou agrandir : ce qui arrive à la netteté',
      paragraphs: [
        'Lors d’une réduction, le navigateur résume plusieurs pixels en un nombre plus petit. Les photos supportent souvent bien cette opération, tandis que les petites lettres, les traits fins, les codes et les captures d’écran peuvent perdre en netteté. Examinez ces zones à 100 % et à la taille réelle d’utilisation.',
        'Lors d’un agrandissement, de nouveaux pixels sont interpolés entre ceux qui existent déjà. La largeur augmente, mais aucun détail réel n’est retrouvé. Une vignette de 200 × 150 portée à 2 000 × 1 500 peut sembler floue ou pixellisée. Pour une affiche, une impression ou une pièce officielle, recherchez une source de meilleure résolution.',
      ],
    },
    {
      heading: 'Format, réencodage et métadonnées',
      paragraphs: [
        'L’image est décodée puis dessinée dans un canevas HTML aux nouvelles dimensions. L’outil tente de conserver JPEG, PNG ou WebP ; si le navigateur ne sait pas écrire le format d’entrée, il peut utiliser PNG. Une nouvelle exportation peut légèrement modifier les pixels, les couleurs perçues et le poids du fichier.',
        'Les informations qui ne font pas partie de l’image visible ne sont pas garanties : date, appareil, position GPS, orientation EXIF ou profil colorimétrique particulier peuvent disparaître. Une animation peut devenir une image fixe. Conservez l’original comme fichier maître et considérez la sortie comme une copie destinée à un usage précis.',
      ],
    },
    {
      heading: 'Téléphone, mémoire et limites pratiques',
      paragraphs: [
        'FunnyTools accepte jusqu’à 20 Mo et 40 millions de pixels en entrée, avec un maximum de 8 000 pixels par côté en sortie. Une image compressée occupe davantage de mémoire une fois décodée. Un téléphone peu puissant peut donc recharger l’onglet avant d’atteindre ces plafonds. Fermez d’autres applications ou utilisez un ordinateur pour un très grand fichier.',
        'Les formats HEIC, RAW, TIFF ou certains fichiers endommagés dépendent du navigateur et ne sont pas garantis. Si l’aperçu ne s’affiche pas, créez une copie JPG ou PNG avec une application fiable. Ne renommez pas simplement l’extension : cela ne convertit ni le contenu ni son type réel.',
      ],
    },
    {
      heading: 'Contrôler la copie dans le service final',
      paragraphs: [
        'Ouvrez le téléchargement dans un autre lecteur et vérifiez sa largeur, sa hauteur, son orientation et son format. Observez les visages, logos, cercles, textes et lignes pour repérer une déformation. Comparez ensuite le poids si le formulaire impose aussi un nombre de Ko ou de Mo.',
        'Téléversez enfin la copie dans le site, le document ou le logiciel visé. Une plateforme peut recadrer, recomprimer ou refuser certains profils. Le résultat affiché par FunnyTools prouve les dimensions produites dans le navigateur ; il ne remplace pas le contrôle d’acceptation effectué par le destinataire.',
      ],
    },
  ],
  instructions: [
    'Choisissez une image que votre navigateur peut ouvrir.',
    'Lisez les dimensions d’origine et gardez le verrou des proportions activé.',
    'Saisissez une largeur ou une hauteur, ou utilisez un raccourci de largeur.',
    'Contrôlez l’aperçu, les nouvelles dimensions, le format et le poids.',
    'Téléchargez la copie puis testez-la dans le service destinataire.',
  ],
  examples: [
    'Passer une photo de 4 032 × 3 024 à 1 200 pixels de large pour un article.',
    'Préparer une capture 1 920 × 1 080 en 800 × 450 sans l’aplatir.',
    'Créer une prévisualisation de 500 pixels de large pour un courriel.',
    'Recadrer un portrait avant de produire une photo carrée de 600 × 600.',
    'Redimensionner puis compresser lorsqu’un portail limite pixels et poids.',
  ],
  audience: [
    'Personnes devant respecter une largeur ou une hauteur maximale.',
    'Créateurs préparant des images pour un article, un catalogue ou une présentation.',
    'Élèves, étudiants et enseignants harmonisant des captures.',
    'Utilisateurs souhaitant traiter une photo localement sans installer de logiciel.',
  ],
  caseStudies: [
    { title: 'Photo de produit', description: 'Une photo de 4 000 × 3 000 est ramenée à 1 200 × 900 avec le verrou actif. Les étiquettes restent lisibles ; la copie est ensuite compressée et l’original conservé pour de futures variantes.' },
    { title: 'Portrait demandé au carré', description: 'Le fichier mesure 1 200 × 1 600, mais le formulaire demande 600 × 600. La personne recadre d’abord autour du visage puis redimensionne, au lieu de déverrouiller les proportions et d’écraser le portrait.' },
    { title: 'Petit logo à agrandir', description: 'Un logo de 180 × 80 devient flou à 1 080 pixels. Le test montre qu’un fichier vectoriel ou une source plus grande est nécessaire : ajouter des pixels ne recrée pas des contours précis.' },
  ],
  notes: [
    'Redimensionner ne recadre pas et ne supprime pas le fond.',
    'Déverrouiller les proportions peut étirer visiblement l’image.',
    'Agrandir ne récupère aucun détail absent de la source.',
    'Métadonnées, profils et animation peuvent ne pas être conservés.',
    'Les limites sont 20 Mo, 40 millions de pixels et 8 000 pixels par côté.',
  ],
  faq: [
    { q: 'Comment redimensionner une image sans la déformer ?', a: 'Gardez les proportions activées et changez une seule dimension. L’autre valeur est calculée avec le rapport d’origine.' },
    { q: 'Redimensionner réduit-il aussi le poids ?', a: 'Souvent lors d’une réduction, mais pas toujours. Le format, le contenu et le réencodage influencent le poids final.' },
    { q: 'Puis-je obtenir un carré à partir d’une photo horizontale ?', a: 'Oui, mais recadrez ou ajoutez des marges. Forcer deux dimensions égales sans cela déforme le contenu.' },
    { q: 'Agrandir une petite image améliore-t-il sa qualité ?', a: 'Non. Le navigateur interpole des pixels, sans restaurer le détail ou la netteté perdus.' },
    { q: 'Quel sera le format téléchargé ?', a: 'L’outil tente de conserver JPEG, PNG ou WebP. Il peut utiliser PNG si le navigateur ne sait pas exporter le format source.' },
    { q: 'La photo est-elle envoyée à FunnyTools ?', a: 'Non. La lecture, le redimensionnement et l’exportation ont lieu dans la mémoire du navigateur.' },
    { q: 'Quelle différence avec la compression ?', a: 'Le redimensionnement change largeur et hauteur ; la compression agit surtout sur les octets et la qualité d’encodage.' },
    { q: 'Pourquoi mon fichier HEIC ne s’ouvre-t-il pas ?', a: 'La prise en charge dépend du navigateur. Convertissez une copie avec une application fiable, puis essayez en JPG ou PNG.' },
  ],
  labels: {
    upload: 'Choisir une image',
    width: 'Largeur en pixels',
    height: 'Hauteur en pixels',
    lockAspect: 'Garder les proportions',
    presets: 'Largeur rapide',
    sourcePreview: 'Aperçu de l’original',
    outputPreview: 'Aperçu redimensionné',
    originalSize: 'Poids original',
    outputSize: 'Poids de la copie',
    dimensions: 'Nouvelles dimensions',
    waiting: 'Choisissez une image',
    download: 'Télécharger l’image',
    reset: 'Réinitialiser',
    invalidType: 'Choisissez un fichier image valide.',
    tooLarge: 'L’image est trop grande. Utilisez moins de 20 Mo et moins de 40 millions de pixels.',
    dimensionError: 'Saisissez une largeur et une hauteur entre 1 et 8 000 pixels.',
    processError: 'Impossible de redimensionner cette image. Essayez un autre fichier.',
    localNote: 'L’image est traitée dans ce navigateur et n’est pas envoyée à FunnyTools.',
  },
  privacyNote: 'Le fichier est décodé, redimensionné et réencodé dans la mémoire du navigateur. FunnyTools ne reçoit ni l’image ni ses pixels. La copie temporaire disparaît après réinitialisation ou fermeture de l’onglet.',
  disclaimer: 'Conservez l’original et contrôlez la copie dans son contexte final. FunnyTools ne garantit ni l’amélioration lors d’un agrandissement, ni la conservation des métadonnées, ni l’acceptation par une plateforme.',
  sources: [
    { label: 'MDN — CanvasRenderingContext2D.drawImage()', href: 'https://developer.mozilla.org/fr/docs/Web/API/CanvasRenderingContext2D/drawImage', note: 'Méthode du navigateur utilisée pour dessiner une image avec de nouvelles dimensions.' },
    { label: 'MDN — HTMLCanvasElement.toBlob()', href: 'https://developer.mozilla.org/fr/docs/Web/API/HTMLCanvasElement/toBlob', note: 'Méthode d’exportation de la copie vers un fichier image.' },
  ],
};

export const frenchImageResizerReview = {
  heading: 'Vérifier une image redimensionnée',
  intro: 'Deux nombres corrects ne suffisent pas : contrôlez aussi la forme, la netteté, le format et l’acceptation.',
  panels: [
    { title: 'Confirmer les pixels', text: 'Ouvrez les propriétés et vérifiez largeur et hauteur. Ne confondez pas pixels, centimètres, DPI et poids en Ko.' },
    { title: 'Repérer une déformation', text: 'Examinez visages, cercles, logos et textes. Si leur forme change, revenez aux proportions et recadrez séparément.' },
    { title: 'Tester le destinataire', text: 'Chargez la copie dans le vrai formulaire ou éditeur pour repérer un recadrage automatique ou une limite supplémentaire.' },
  ],
  checklistHeading: 'Liste de contrôle',
  checklist: [
    'Largeur et hauteur correspondent à la consigne.',
    'Personnes, textes et formes ne sont pas déformés.',
    'Les détails utiles restent lisibles.',
    'L’original demeure conservé comme source.',
  ],
};

export const frenchPngToJpg: ToolContent = {
  name: 'Convertir un PNG en JPG en ligne',
  short: 'Transformez un PNG en JPG, choisissez le fond des zones transparentes et réglez la qualité.',
  long: 'Ce convertisseur ouvre une image dans votre navigateur, place une couleur derrière les pixels transparents puis crée une copie JPEG. Vous choisissez le fond, réglez la qualité de 10 % à 100 %, comparez les aperçus et contrôlez le poids avant téléchargement. L’image n’est pas envoyée à FunnyTools. L’outil est conçu pour PNG vers JPG, mais peut lire d’autres formats reconnus par le navigateur.',
  seoTitle: 'Convertir PNG en JPG en ligne gratuitement',
  seoDescription: 'Convertissez un PNG en JPG, choisissez un fond blanc ou coloré, réglez la qualité et téléchargez sans envoyer l’image.',
  keywords: [
    'convertir PNG en JPG',
    'PNG en JPG en ligne',
    'convertisseur PNG JPEG gratuit',
    'PNG JPG fond blanc',
    'enlever transparence PNG',
    'changer image en JPG',
    'transformer PNG en JPEG',
  ],
  capabilities: [
    'Créer un fichier .jpg depuis un PNG ou une image compatible.',
    'Choisir la couleur qui remplace les zones transparentes.',
    'Régler la qualité JPEG entre 10 % et 100 %.',
    'Comparer le poids original et le poids de la copie JPG.',
    'Traiter localement jusqu’à 20 Mo et 40 millions de pixels.',
  ],
  contentSections: [
    {
      heading: 'Réponse rapide : comment convertir un PNG en JPG',
      paragraphs: [
        'Choisissez le PNG, sélectionnez la couleur qui doit remplacer la transparence, puis réglez la qualité JPEG. Le blanc convient souvent aux documents, mais l’aperçu permet d’essayer un autre fond. Comparez le poids, zoomez sur les contours et téléchargez le .jpg seulement lorsque le résultat répond au besoin.',
        'JPEG ne possède pas de canal alpha. Les zones transparentes du PNG ne peuvent donc pas rester transparentes : elles sont mélangées avec le fond choisi. Si vous avez besoin d’un logo superposé sur plusieurs couleurs, gardez le PNG ou utilisez un format compatible avec la transparence.',
      ],
    },
    {
      heading: 'Transparence, fond blanc et halos',
      paragraphs: [
        'Un PNG peut contenir des pixels opaques, semi-transparents ou invisibles. Avant l’exportation, l’outil peint le canevas avec la couleur sélectionnée, puis dessine l’image par-dessus. Une ombre semi-transparente se mélange avec cette couleur et devient définitivement opaque dans le JPG.',
        'Un contour clair autour d’un logo peut apparaître si l’image a été préparée pour un fond blanc puis placée sur une autre couleur. Examinez les cheveux, les ombres et les bords fins. Le sélecteur ne supprime pas un arrière-plan déjà opaque : il remplace uniquement la transparence existante.',
      ],
      items: [
        'Document ou formulaire : le blanc est souvent le choix le plus lisible.',
        'Visuel de marque : reprenez la couleur exacte du support si elle est connue.',
        'Ombre semi-transparente : contrôlez les halos après mélange.',
        'Photo avec mur blanc : ce mur reste dans l’image, car il n’est pas transparent.',
      ],
    },
    {
      heading: 'Choisir la qualité JPEG sans valeur magique',
      paragraphs: [
        'JPEG utilise une compression avec perte. Le pourcentage indique un compromis demandé au navigateur, pas un niveau universel de fidélité ni un poids garanti. Une photographie peut rester agréable à 80 %, tandis qu’une capture avec petit texte montre rapidement des contours flous ou des blocs.',
        'Commencez autour de 85 %, observez le visage, les cheveux, le ciel, les dégradés et les lettres à 100 %, puis descendez par petits pas. Remontez dès que les défauts gênent l’usage. Pour un diagramme, une interface ou un logo aux aplats nets, conserver PNG peut être préférable.',
      ],
    },
    {
      heading: 'Le JPG sera-t-il toujours plus léger',
      paragraphs: [
        'Non. Une photographie PNG non optimisée devient souvent beaucoup plus légère en JPEG, mais un petit PNG indexé ou déjà optimisé peut peser moins que la copie. Dimensions, nombre de couleurs, bruit visuel et qualité influencent le résultat. Comparez les octets affichés plutôt que d’appliquer une règle générale.',
        'Si le JPG reste trop lourd, réduisez légèrement la qualité ou redimensionnez l’image. Si la copie devient plus lourde et que le système accepte PNG, gardez l’original. Pour une limite précise comme 200 Ko, vérifiez séparément le format, les pixels et le poids final.',
      ],
    },
    {
      heading: 'Quand utiliser JPG et quand garder PNG',
      paragraphs: [
        'JPG est adapté aux photos opaques, aux portails qui l’imposent et aux cas où un poids réduit compte davantage qu’une reproduction exacte. PNG reste utile pour la transparence, les captures, les schémas, les icônes, le texte net et les fichiers qui seront encore modifiés.',
        'Convertir ne crée pas une meilleure image. Les dimensions restent les mêmes, mais les pixels sont réencodés et des métadonnées peuvent disparaître. Gardez le PNG maître lorsque vous devrez produire d’autres versions ou lorsque la transparence a une valeur éditoriale.',
      ],
    },
    {
      heading: 'Traitement local et limites du navigateur',
      paragraphs: [
        'Le fichier est décodé, dessiné sur un canevas rempli avec la couleur choisie, puis exporté en `image/jpeg`. Tout se déroule dans la mémoire de l’appareil. La limite de prudence est de 20 Mo et 40 millions de pixels, mais un téléphone peut manquer de mémoire avec un fichier plus petit.',
        'Les formats animés deviennent généralement une image fixe. EXIF, lieu, date, profil colorimétrique ou orientation ne sont pas garantis. Certains formats ne s’ouvrent pas dans tous les navigateurs. Pour un résultat prévisible, utilisez un vrai PNG et contrôlez la sortie avec un autre lecteur.',
      ],
    },
    {
      heading: 'Vérifier le JPG avant de l’envoyer',
      paragraphs: [
        'Ouvrez le téléchargement et contrôlez le fond, les bords, les ombres, le texte et les dégradés. Vérifiez l’extension .jpg, le poids et les dimensions. Si un élément devait rester transparent, la conversion n’est pas adaptée.',
        'Testez ensuite le fichier dans le portail ou le document final. Un service peut encore recomprimer, recadrer ou modifier les couleurs. Conservez le PNG original jusqu’à confirmation de l’envoi et produisez une nouvelle copie si une autre couleur de fond est nécessaire.',
      ],
    },
  ],
  instructions: [
    'Choisissez le PNG et attendez les deux aperçus.',
    'Sélectionnez la couleur qui remplacera la transparence.',
    'Réglez la qualité JPEG et comparez le poids.',
    'Examinez texte, contours, ombres et dégradés.',
    'Téléchargez le JPG puis testez-le dans le service final.',
  ],
  examples: [
    'Créer un JPG à fond blanc pour un formulaire qui refuse PNG.',
    'Transformer une photo enregistrée en PNG pour réduire son poids.',
    'Choisir une couleur de marque derrière un logo transparent.',
    'Tester plusieurs qualités avant de respecter une limite de fichier.',
    'Garder le PNG lorsque la transparence ou le texte net reste indispensable.',
  ],
  audience: [
    'Personnes devant remettre un fichier JPG ou JPEG.',
    'Équipes web et boutiques préparant des photographies opaques.',
    'Étudiants et professionnels choisissant un fond pour un document.',
    'Utilisateurs préférant convertir une image privée dans leur navigateur.',
  ],
  caseStudies: [
    { title: 'Photo pour un formulaire', description: 'Un portail demande un JPG de moins de 1 Mo. Le PNG de 2,6 Mo n’a pas de transparence. Une copie à 85 % passe sous la limite, le visage reste net et l’original est conservé.' },
    { title: 'Logo sur fond coloré', description: 'Un logo transparent doit rejoindre un document bleu. La couleur exacte est choisie ; l’aperçu révèle un halo blanc, ce qui conduit à corriger le fichier maître plutôt qu’à accepter une mauvaise conversion.' },
    { title: 'Capture où PNG reste meilleur', description: 'À 70 %, les petites lettres deviennent floues et le gain est faible. Le service acceptant PNG, la personne garde le fichier original au lieu de sacrifier la lisibilité.' },
  ],
  notes: [
    'JPEG ne conserve aucune transparence.',
    'Le fond choisi devient une partie permanente de l’image.',
    'Le pourcentage de qualité ne garantit ni poids ni fidélité exacts.',
    'Le JPG peut peser plus lourd qu’un PNG déjà optimisé.',
    'Dimensions, animation et métadonnées doivent être vérifiées.',
  ],
  faq: [
    { q: 'Comment convertir un PNG en JPG avec un fond blanc ?', a: 'Choisissez le PNG et laissez la couleur sur blanc. Le canevas remplit la transparence avant de créer le JPG.' },
    { q: 'Que deviennent les zones transparentes ?', a: 'Elles sont mélangées avec le fond sélectionné, car JPEG ne prend pas en charge le canal alpha.' },
    { q: 'Le JPG sera-t-il forcément plus léger ?', a: 'Non. Comparez les poids affichés ; un PNG petit ou optimisé peut rester plus léger.' },
    { q: 'Quelle qualité JPEG choisir ?', a: 'Commencez vers 85 %, inspectez les zones importantes, puis ajustez par petits pas.' },
    { q: 'La largeur et la hauteur changent-elles ?', a: 'Non. Ce convertisseur garde les dimensions. Utilisez le redimensionneur pour modifier les pixels.' },
    { q: 'Le sélecteur enlève-t-il le fond d’une photo ?', a: 'Non. Il remplace seulement les pixels transparents ; un fond déjà opaque reste visible.' },
    { q: 'L’image est-elle envoyée sur un serveur ?', a: 'Non. Le navigateur effectue la lecture, le mélange et l’exportation.' },
    { q: 'Puis-je récupérer la transparence depuis le JPG ?', a: 'Non. Gardez le PNG original : la copie JPEG ne contient plus les informations alpha.' },
  ],
  labels: {
    upload: 'Choisir une image',
    background: 'Couleur de fond',
    quality: 'Qualité JPG',
    sourcePreview: 'Aperçu de l’original',
    outputPreview: 'Aperçu JPG',
    originalSize: 'Poids original',
    outputSize: 'Poids du JPG',
    waiting: 'Choisissez une image',
    download: 'Télécharger le JPG',
    reset: 'Réinitialiser',
    invalidType: 'Choisissez un fichier image valide.',
    tooLarge: 'L’image est trop grande. Utilisez moins de 20 Mo et moins de 40 millions de pixels.',
    processError: 'Impossible de convertir cette image. Essayez un autre fichier PNG.',
    localNote: 'L’image est convertie dans ce navigateur et n’est pas envoyée à FunnyTools.',
  },
  privacyNote: 'L’image est décodée, mélangée au fond et exportée en JPEG dans la mémoire du navigateur. FunnyTools ne reçoit ni le fichier ni ses pixels. La copie temporaire disparaît après réinitialisation ou fermeture.',
  disclaimer: 'Conservez le PNG original et contrôlez le JPG dans son contexte final. La conversion supprime la transparence et ne garantit ni un poids précis, ni les métadonnées, ni l’acceptation.',
  sources: [
    { label: 'MDN — guide JPEG', href: 'https://developer.mozilla.org/fr/docs/Web/Media/Guides/Formats/Image_types#jpeg', note: 'Caractéristiques, usages et limites du format JPEG.' },
    { label: 'MDN — guide PNG', href: 'https://developer.mozilla.org/fr/docs/Web/Media/Guides/Formats/Image_types#png', note: 'Caractéristiques du PNG, notamment sa prise en charge de la transparence.' },
  ],
};

export const frenchPngToJpgReview = {
  heading: 'Vérifier un JPG créé depuis un PNG',
  intro: 'Contrôlez le fond, les contours, le poids et la compatibilité, pas seulement la présence d’un téléchargement.',
  panels: [
    { title: 'Examiner la transparence', text: 'Observez les bords, ombres et espaces vides. Ils doivent être mélangés avec la couleur choisie sans halo inattendu.' },
    { title: 'Comparer qualité et octets', text: 'Zoomez sur texte, visages et dégradés puis comparez le poids. Un petit fichier inutilisable n’est pas une réussite.' },
    { title: 'Valider le portail', text: 'Chargez le JPG dans le vrai destinataire et contrôlez extension, dimensions, poids et recadrage éventuel.' },
  ],
  checklistHeading: 'Liste de contrôle',
  checklist: [
    'La couleur remplace correctement toute transparence.',
    'Les défauts JPEG restent acceptables.',
    'Poids et dimensions respectent la consigne.',
    'Le PNG original demeure conservé.',
  ],
};

export const frenchJpgToPng: ToolContent = {
  name: 'Convertir un JPG en PNG en ligne',
  short: 'Transformez un JPG en PNG, conservez ses dimensions et téléchargez une copie locale.',
  long: 'Ce convertisseur décode une image dans votre navigateur et crée un fichier PNG aux mêmes dimensions. La nouvelle exportation n’ajoute pas une compression JPEG avec perte, mais elle ne restaure aucun détail déjà supprimé, ne rend pas le fond transparent et peut produire un fichier beaucoup plus lourd. Utilisez-la lorsqu’une application exige PNG ou avant une édition qui aura besoin d’un canal alpha. Le fichier n’est pas envoyé à FunnyTools.',
  seoTitle: 'Convertir JPG en PNG en ligne gratuitement',
  seoDescription: 'Convertissez un JPG en PNG sans envoyer le fichier. Comprenez la transparence, la qualité, le poids et les limites avant téléchargement.',
  keywords: [
    'convertir JPG en PNG',
    'JPG en PNG en ligne',
    'convertisseur JPEG PNG gratuit',
    'transformer JPG en PNG',
    'JPG PNG transparent',
    'enregistrer photo en PNG',
    'changer format image PNG',
  ],
  capabilities: [
    'Créer un fichier .png depuis JPG, JPEG ou une image compatible.',
    'Conserver la largeur et la hauteur d’origine.',
    'Comparer le poids du fichier source et celui du PNG.',
    'Éviter une nouvelle génération JPEG avec perte dans la copie.',
    'Effectuer l’opération localement jusqu’à 20 Mo et 40 millions de pixels.',
  ],
  contentSections: [
    {
      heading: 'Réponse rapide : comment convertir un JPG en PNG',
      paragraphs: [
        'Choisissez le JPG, attendez l’affichage des aperçus et observez le poids de la sortie. Téléchargez le PNG, puis ouvrez-le dans le logiciel ou le portail qui le demande. Les dimensions et l’apparence visible restent normalement les mêmes, mais le poids et les métadonnées peuvent changer.',
        'La conversion ne supprime pas le fond. Dans un JPG, un fond blanc ou coloré est déjà constitué de pixels opaques. Le PNG créé conservera ces pixels jusqu’à ce qu’un outil de retouche définisse réellement une zone transparente. Changer de format ne sépare pas automatiquement le sujet.',
      ],
    },
    {
      heading: 'Un PNG peut être transparent, mais la conversion ne crée pas la transparence',
      paragraphs: [
        'PNG sait enregistrer un canal alpha, contrairement à JPEG. Cela signifie que le format de sortie pourra accueillir de la transparence après retouche, pas que le navigateur devine quelles couleurs doivent disparaître. Un mur blanc, un ciel ou le fond d’un logo restent opaques parce qu’ils font partie de l’image décodée.',
        'Pour obtenir un logo propre, recherchez d’abord le SVG ou le PNG transparent d’origine. Une copie JPEG peut déjà contenir des halos, des blocs ou des contours mélangés au fond. Les retirer après conversion demande une sélection, un masque et une vérification des bords.',
      ],
      items: [
        'JPG sur fond blanc : le PNG garde le rectangle blanc.',
        'Photographie : tous les pixels restent opaques.',
        'PNG obtenu : un éditeur pourra lui ajouter un canal alpha.',
        'Logo comprimé : la meilleure source reste le fichier original.',
      ],
    },
    {
      heading: 'Qualité : ce que le PNG conserve et ce qu’il ne répare pas',
      paragraphs: [
        'Le PNG encode sans perte les pixels que le navigateur a décodés. Cette opération n’ajoute pas de nouveaux blocs JPEG. En revanche, les défauts déjà présents font partie de l’entrée : contours mous, bruit, aplats marqués et détail éliminé restent visibles dans la sortie.',
        'Le fichier ne gagne ni résolution ni netteté. La conversion est utile pour satisfaire une exigence de format, limiter les pertes pendant des étapes d’édition ultérieures ou préparer un canal alpha. Pour retrouver des détails, il faut une source de meilleure qualité, pas une extension différente.',
      ],
    },
    {
      heading: 'Pourquoi le PNG peut devenir beaucoup plus lourd',
      paragraphs: [
        'JPEG compresse efficacement les photographies en supprimant une partie de l’information. PNG conserve exactement les pixels de la copie décodée. Une photo complexe peut donc produire un PNG plusieurs fois plus lourd alors que les deux aperçus semblent identiques.',
        'Ce poids supplémentaire ne représente pas du détail récupéré. Si l’objectif est une photo légère pour le web ou le courriel, JPG ou WebP reste souvent plus adapté. Si le portail exige PNG, comparez la sortie à sa limite de Mo avant de supprimer ou de remplacer quoi que ce soit.',
      ],
    },
    {
      heading: 'Quand la conversion en PNG est pertinente',
      paragraphs: [
        'Convertissez lorsqu’un logiciel refuse JPG, lorsqu’une étape suivante doit ajouter de la transparence, ou lorsque vous voulez éviter d’enregistrer plusieurs fois en JPEG pendant une retouche. Une capture reçue en JPG peut aussi être placée en PNG avant l’ajout d’annotations, même si ses artefacts restent présents.',
        'Ne convertissez pas seulement parce que « PNG est de meilleure qualité » ou « PNG veut dire transparent ». Le format dépend de l’usage. Une photo finale peut rester en JPG ; un logo ou un schéma doit idéalement repartir d’une source PNG ou vectorielle authentique.',
      ],
    },
    {
      heading: 'Traitement dans le navigateur et propriétés perdues',
      paragraphs: [
        'Le navigateur lit le fichier, dessine ses pixels sur un canevas puis l’exporte en `image/png`. FunnyTools ne reçoit pas l’image. La limite est de 20 Mo et 40 millions de pixels, mais la mémoire disponible sur mobile peut imposer un fichier plus petit.',
        'La copie peut perdre date, lieu, appareil, orientation EXIF ou profil colorimétrique particulier. Une animation devient généralement fixe. Même si le sélecteur accepte d’autres images reconnues par le navigateur, cette page répond principalement au besoin JPG ou JPEG vers PNG.',
      ],
    },
    {
      heading: 'Contrôler la sortie et choisir de la garder ou non',
      paragraphs: [
        'Ouvrez le PNG ailleurs, vérifiez largeur, hauteur, orientation, couleurs et poids. Placez-le sur un fond de couleur dans un éditeur si vous voulez savoir s’il contient réellement de la transparence. Le damier affiché par certains logiciels est un indice ; un fond blanc visible reste opaque.',
        'Essayez le fichier dans l’application finale. Si le PNG dépasse la limite et qu’aucune transparence ni exigence de format ne le justifie, conserver le JPG peut être la meilleure décision. Gardez toujours l’original afin de pouvoir revenir au point de départ.',
      ],
    },
  ],
  instructions: [
    'Choisissez un fichier JPG ou JPEG.',
    'Attendez l’aperçu PNG et comparez le poids.',
    'Rappelez-vous que le fond reste opaque et que le détail n’est pas restauré.',
    'Téléchargez la copie sans remplacer l’original.',
    'Vérifiez format, dimensions, couleurs et compatibilité dans l’application finale.',
  ],
  examples: [
    'Créer un PNG parce qu’un formulaire refuse les JPG.',
    'Préparer une copie avant d’ajouter manuellement de la transparence.',
    'Éviter une nouvelle compression JPEG pendant une étape de retouche.',
    'Mesurer l’augmentation de poids avant de convertir une photo.',
    'Rechercher le logo original lorsque le JPG contient déjà un fond et des halos.',
  ],
  audience: [
    'Personnes devant fournir expressément une image PNG.',
    'Créateurs préparant un fichier pour une retouche ultérieure.',
    'Équipes scolaires ou de bureau rencontrant une incompatibilité de format.',
    'Utilisateurs souhaitant convertir localement une image privée.',
  ],
  caseStudies: [
    { title: 'Application qui exige PNG', description: 'Une plateforme refuse .jpg mais accepte jusqu’à 10 Mo. La copie conserve les dimensions et reste sous la limite. Son fond demeure opaque, comme prévu.' },
    { title: 'Logo qui ne devient pas transparent', description: 'Après conversion, le rectangle blanc est toujours visible. Il faisait partie des pixels du JPG. La personne recherche le SVG original au lieu de présenter la copie comme transparente.' },
    { title: 'Photographie inutilement lourde', description: 'Un JPG de 1,4 Mo devient un PNG de plus de 8 Mo. Le destinataire acceptant JPG et aucune retouche n’étant prévue, l’original reste le meilleur fichier.' },
  ],
  notes: [
    'Le format PNG accepte la transparence, mais cette conversion n’en crée pas.',
    'Aucun détail supprimé par JPEG n’est récupéré.',
    'Le PNG peut peser plusieurs fois plus lourd.',
    'Métadonnées, orientation et profils peuvent disparaître.',
    'Les dimensions restent identiques à celles de l’entrée.',
  ],
  faq: [
    { q: 'Comment convertir un JPG en PNG ?', a: 'Choisissez le JPG, attendez que le navigateur crée l’aperçu, contrôlez le poids puis téléchargez le PNG.' },
    { q: 'Le fond devient-il transparent ?', a: 'Non. Les pixels du JPG sont opaques. Il faut une vraie opération de détourage ou de masque.' },
    { q: 'Le PNG aura-t-il une meilleure qualité ?', a: 'Il n’ajoute pas une nouvelle perte JPEG, mais ne récupère aucun détail déjà supprimé.' },
    { q: 'Pourquoi le fichier PNG est-il plus lourd ?', a: 'PNG conserve sans perte les pixels décodés, tandis que JPEG réduit les photos avec perte.' },
    { q: 'Les dimensions restent-elles identiques ?', a: 'Oui. L’outil conserve la largeur et la hauteur naturelles de l’image.' },
    { q: 'Quand faut-il choisir PNG ?', a: 'Lorsqu’une application l’exige, avant d’ajouter de la transparence ou pour éviter des enregistrements JPEG répétés.' },
    { q: 'Le JPG est-il envoyé à FunnyTools ?', a: 'Non. La lecture et l’exportation PNG ont lieu dans la mémoire du navigateur.' },
    { q: 'Les données EXIF sont-elles conservées ?', a: 'Ce n’est pas garanti. Gardez l’original si la date, le lieu ou l’appareil ont de l’importance.' },
  ],
  labels: {
    upload: 'Choisir une image',
    sourcePreview: 'Aperçu de l’original',
    outputPreview: 'Aperçu PNG',
    originalSize: 'Poids original',
    outputSize: 'Poids du PNG',
    waiting: 'Choisissez une image',
    download: 'Télécharger le PNG',
    reset: 'Réinitialiser',
    invalidType: 'Choisissez un fichier image valide.',
    tooLarge: 'L’image est trop grande. Utilisez moins de 20 Mo et moins de 40 millions de pixels.',
    processError: 'Impossible de convertir cette image. Essayez un autre fichier JPG.',
    localNote: 'L’image est convertie dans ce navigateur et n’est pas envoyée à FunnyTools.',
    transparencyNote: 'PNG accepte la transparence, mais le JPG ne contient pas de canal alpha : cette conversion ne supprime pas le fond.',
  },
  privacyNote: 'L’image est décodée puis exportée en PNG dans la mémoire du navigateur. FunnyTools ne reçoit ni le fichier, ni ses pixels, ni son nom. La copie temporaire disparaît après réinitialisation ou fermeture.',
  disclaimer: 'Conservez le JPG original et contrôlez la copie. La conversion ne crée pas de transparence, n’améliore pas la résolution et ne garantit ni un poids réduit ni la conservation des métadonnées.',
  sources: [
    { label: 'MDN — guide PNG', href: 'https://developer.mozilla.org/fr/docs/Web/Media/Guides/Formats/Image_types#png', note: 'Usages du PNG, compression sans perte et prise en charge de la transparence.' },
    { label: 'MDN — guide JPEG', href: 'https://developer.mozilla.org/fr/docs/Web/Media/Guides/Formats/Image_types#jpeg', note: 'Usages et caractéristiques de la compression JPEG.' },
  ],
};

export const frenchJpgToPngReview = {
  heading: 'Vérifier un PNG créé depuis un JPG',
  intro: 'Distinguez le format, la transparence, la fidélité et le poids afin de ne pas attribuer à la conversion ce qu’elle ne fait pas.',
  panels: [
    { title: 'Confirmer le format', text: 'Ouvrez les propriétés : le fichier doit être PNG, garder ses dimensions et s’ouvrir sans erreur.' },
    { title: 'Tester la transparence', text: 'Placez la copie sur un fond coloré. Un rectangle blanc reste blanc jusqu’à une vraie édition du canal alpha.' },
    { title: 'Évaluer le poids', text: 'Comparez les octets et l’usage. Un PNG plus lourd peut être requis, mais il ne contient pas de détail retrouvé.' },
  ],
  checklistHeading: 'Liste de contrôle',
  checklist: [
    'La sortie est bien PNG et garde largeur et hauteur.',
    'Le fond et les artefacts sont compris comme partie de l’entrée.',
    'Le poids respecte la limite du destinataire.',
    'Le JPG original demeure conservé.',
  ],
};
