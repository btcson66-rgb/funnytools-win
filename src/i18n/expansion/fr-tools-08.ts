import type { ToolContent } from '../tools/_types';

export const frenchPdfPageReorder: ToolContent = {
  name: 'Réorganiser les pages d’un PDF',
  short: 'Remettez les pages d’un PDF dans le bon ordre avec des boutons pour les monter ou les descendre.',
  long: 'Sélectionnez un PDF de 40 Mo maximum, contrôlez la liste numérotée puis déplacez chaque page d’une position vers le haut ou le bas. L’outil crée une nouvelle copie qui conserve toutes les pages dans l’ordre affiché. Il fonctionne dans le navigateur, sans miniature ni glisser-déposer, et ne supprime, ne duplique ni ne fusionne les pages.',
  seoTitle: 'Réorganiser les pages d’un PDF en ligne',
  seoDescription: 'Changez l’ordre des pages d’un PDF dans le navigateur, sans envoi ni inscription, puis contrôlez la nouvelle copie avant de l’utiliser.',
  keywords: [
    'réorganiser les pages d’un PDF',
    'changer ordre pages PDF',
    'remettre PDF dans le bon ordre',
    'classer pages PDF',
    'déplacer une page PDF',
    'organiser PDF sans téléverser',
    'trier pages PDF en ligne',
  ],
  capabilities: [
    'Lire un PDF de 40 Mo maximum et numéroter ses pages d’origine.',
    'Monter ou descendre une page d’une position à chaque clic.',
    'Conserver toutes les pages et créer une nouvelle séquence.',
    'Télécharger une copie sans remplacer le fichier sélectionné.',
    'Effectuer la lecture et la copie dans la mémoire du navigateur.',
  ],
  contentSections: [
    {
      heading: 'Réponse rapide : comment remettre les pages d’un PDF dans l’ordre',
      paragraphs: [
        'Choisissez une copie du PDF. La liste affiche « Page d’origine 1 », « Page d’origine 2 » et ainsi de suite. Utilisez les flèches pour monter ou descendre une ligne d’une position, puis répétez jusqu’à obtenir la séquence voulue. Cliquez enfin sur le bouton de téléchargement pour créer un nouveau PDF.',
        'La première ligne ne peut pas monter et la dernière ne peut pas descendre. Les déplacements modifient uniquement la liste en mémoire tant que vous n’avez pas exporté. Après le téléchargement, ouvrez le fichier et parcourez-le entièrement : un ordre correct à l’écran ne garantit pas à lui seul que toutes les propriétés du PDF ont été conservées.',
      ],
    },
    {
      heading: 'Comprendre le numéro d’origine affiché',
      paragraphs: [
        'Le numéro reste attaché à la page qu’il identifiait au chargement. Si la page d’origine 6 devient la première ligne, elle continue de porter le numéro 6. Cette convention permet de suivre les déplacements et d’éviter qu’une renumérotation automatique masque la provenance d’une feuille.',
        'Ce numéro ne correspond pas toujours au folio imprimé. Une couverture peut être la première page du fichier alors que le texte commence à « 1 » sur la suivante. Un sommaire en chiffres romains, un scan sans numéro ou une annexe peuvent accentuer l’écart. Notez séparément la position dans le fichier, le numéro imprimé et le contenu attendu.',
      ],
    },
    {
      heading: 'Réorganiser n’est pas supprimer, extraire, pivoter ou fusionner',
      paragraphs: [
        'Réorganiser change la séquence tout en conservant le même nombre de pages. Supprimer retire une feuille, extraire produit une sélection, pivoter corrige l’orientation et fusionner réunit plusieurs documents. Cet outil ne combine pas ces opérations. Employez la fonction correspondant au verbe exact de votre tâche.',
        'Il n’y a ni miniature, ni glisser-déposer, ni déplacement direct vers une position saisie. Chaque clic déplace une seule ligne. Un document très long peut donc demander de nombreuses actions. Il n’existe pas non plus de sélection multiple, de duplication, d’insertion ou d’annulation globale.',
      ],
    },
    {
      heading: 'Méthode pour un scan, un dossier ou des annexes',
      paragraphs: [
        'Pour un scan recto verso, corrigez d’abord les pages tournées afin de pouvoir les reconnaître. Retirez ensuite les feuilles vides ou les doublons, puis déterminez l’ordre final. Si une limite de poids s’applique, tentez la compression seulement après validation de la structure : compresser trop tôt oblige à recommencer les contrôles.',
        'Pour un dossier composé d’une couverture, d’un formulaire, de justificatifs et d’annexes, écrivez une liste externe. Déplacez une page à la fois et cochez les sections terminées. Contrôlez surtout les jonctions : la page qui précède et celle qui suit chaque déplacement révèlent souvent une erreur que le simple total ne montre pas.',
      ],
      items: [
        'Redresser les pages avant de décider leur position.',
        'Retirer les feuilles inutiles sur une copie distincte.',
        'Comparer la liste à un plan de dossier écrit.',
        'Compresser uniquement la version déjà approuvée.',
      ],
    },
    {
      heading: 'Signatures, formulaires, signets et accessibilité',
      paragraphs: [
        'La sortie est construite en copiant les pages dans un nouveau fichier. L’apparence visible peut rester correcte alors que des signets, champs, liens, commentaires, pièces jointes, calques, balises d’accessibilité ou fonctions interactives demandent une vérification séparée. Une signature numérique peut devenir invalide après modification et réenregistrement.',
        'Ne présentez pas la copie comme équivalente à un original signé, certifié, PDF/A ou préparé pour l’imprimerie. Conservez la source, inspectez le panneau des signatures, testez les champs et ouvrez le résultat dans le lecteur ou le portail du destinataire. Une exigence juridique ou d’archivage doit être validée avec un logiciel adapté.',
      ],
    },
    {
      heading: 'Confidentialité, limite de 40 Mo et mémoire',
      paragraphs: [
        'Le document est lu et recréé dans cet onglet ; FunnyTools ne reçoit pas ses pages pour les réorganiser. Le site effectue néanmoins ses connexions ordinaires de chargement, de mesure d’audience ou de publicité conformément à la politique générale. Le contenu du PDF n’est pas ajouté à ces événements pour réaliser l’opération.',
        'Un fichier supérieur à 40 Mo est refusé. Un document plus petit peut encore échouer s’il est chiffré, endommagé ou trop lourd pour la mémoire disponible. Le navigateur doit garder l’original, l’ordre et la sortie. Sur mobile, commencez par une copie courte et non sensible, puis conservez toujours l’original.',
      ],
    },
  ],
  instructions: [
    'Choisissez une copie du PDF de 40 Mo maximum.',
    'Comparez les numéros d’origine avec le plan du document final.',
    'Montez ou descendez chaque ligne, une position par clic.',
    'Téléchargez la copie lorsque la séquence affichée est correcte.',
    'Vérifiez le total, chaque jonction, les champs, liens et signatures.',
  ],
  examples: [
    'Ramener au début une couverture numérisée en dernière position.',
    'Inverser deux feuilles consécutives dans un contrat de travail.',
    'Placer les annexes après le rapport et avant la bibliographie.',
    'Classer des fiches avant de distribuer le dossier à une classe.',
    'Valider la séquence avant de tenter de réduire le poids du fichier.',
  ],
  audience: [
    'Personnes recevant un scan dont les pages sont mélangées.',
    'Étudiants préparant un mémoire, un dossier ou des annexes.',
    'Bureaux assemblant un dossier à partir d’un PDF déjà fusionné.',
    'Utilisateurs souhaitant traiter un document sans le téléverser.',
  ],
  caseStudies: [
    {
      title: 'Couverture placée à la fin',
      description: 'Dans un document de quatre pages, la couverture est la page d’origine 4. Trois clics vers le haut donnent la séquence 4, 1, 2, 3. La copie est ensuite vérifiée de la couverture à la dernière page.',
    },
    {
      title: 'Deux feuilles interverties',
      description: 'Les pages d’origine 6 et 7 sont dans le mauvais ordre. Monter la page 7 d’une position suffit, mais il faut contrôler les transitions 5→7, 7→6 et 6→8.',
    },
    {
      title: 'Document long sans miniatures',
      description: 'Le PDF est ouvert dans un second lecteur et un tableau associe chaque position à son sujet. L’outil exécute ensuite l’ordre décidé sans confondre position du fichier et folio imprimé.',
    },
  ],
  notes: [
    'Chaque bouton déplace une seule position ; il n’y a pas de glisser-déposer.',
    'L’étiquette conserve le numéro d’origine après le déplacement.',
    'L’outil ne supprime, ne duplique, ne tourne et ne fusionne aucune page.',
    'Le PDF doit peser 40 Mo ou moins et tenir dans la mémoire disponible.',
    'Un nouvel enregistrement peut affecter les signatures et propriétés avancées.',
  ],
  faq: [
    { q: 'Peut-on déplacer des miniatures par glisser-déposer ?', a: 'Non. Cette version affiche une liste numérotée et des boutons qui montent ou descendent une page d’une position.' },
    { q: 'Pourquoi la première ligne indique-t-elle Page d’origine 6 ?', a: 'L’étiquette conserve la position initiale : la sixième page du fichier a simplement été déplacée au début.' },
    { q: 'Les numéros imprimés dans les pages sont-ils modifiés ?', a: 'Non. L’outil déplace les pages complètes sans ajouter ni corriger les folios visibles.' },
    { q: 'Peut-on supprimer ou dupliquer une page pendant le tri ?', a: 'Non. Chaque page reste présente une fois. Utilisez les outils de suppression ou d’extraction pour une autre opération.' },
    { q: 'Une signature numérique reste-t-elle valide ?', a: 'Ce n’est pas garanti. Réorganiser puis enregistrer peut invalider une signature ; vérifiez la copie avec un lecteur adapté.' },
    { q: 'Le PDF est-il envoyé à FunnyTools ?', a: 'Non. La lecture, l’ordre et la création de la copie ont lieu dans ce navigateur.' },
  ],
  labels: {
    localNote: 'Le PDF est traité dans ce navigateur et n’est pas envoyé à FunnyTools.',
    upload: 'Choisir un fichier PDF',
    page: 'Page d’origine {page}',
    download: 'Télécharger le PDF réorganisé',
    reset: 'Tout effacer',
    tooLarge: 'Le PDF dépasse la limite de 40 Mo.',
    failed: 'Impossible de lire le PDF. Il peut être endommagé, chiffré ou demander plus de mémoire.',
  },
  privacyNote: 'Le document et la séquence restent dans la mémoire de ce navigateur. FunnyTools ne reçoit ni ne conserve les pages du PDF.',
  disclaimer: 'Contrôlez la copie complète. L’outil ne valide pas signatures, formulaires, signets, accessibilité, PDF/A, impression ou exigences juridiques.',
};

export const frenchPdfPageReorderReview = {
  heading: 'Comment contrôler un PDF réorganisé',
  intro: 'Le bon nombre de pages n’exclut pas une mauvaise transition : suivez la séquence réelle de bout en bout.',
  panels: [
    { title: 'Comparer au plan', text: 'Cochez chaque section attendue pendant la lecture de la copie.' },
    { title: 'Contrôler les jonctions', text: 'Regardez la page avant et après chaque feuille déplacée.' },
    { title: 'Tester les fonctions', text: 'Ouvrez champs, liens, signets et signatures dans le lecteur final.' },
  ],
  checklistHeading: 'Liste de contrôle',
  checklist: [
    'Le nombre total de pages correspond à l’original.',
    'La séquence complète correspond au dossier attendu.',
    'Aucune page n’est omise, répétée ou tournée par erreur.',
    'L’original est conservé et la copie fonctionne chez le destinataire.',
  ],
};

export const frenchPdfToImage: ToolContent = {
  name: 'Convertir un PDF en JPG ou PNG',
  short: 'Transformez jusqu’à 20 pages de PDF en images PNG ou JPG à télécharger séparément.',
  long: 'Choisissez PNG ou JPG et une échelle de 1×, 1,5× ou 2× avant de sélectionner un PDF de 25 Mo maximum. PDF.js dessine chaque page, affiche son aperçu et propose un téléchargement individuel. L’outil ne crée pas de ZIP, n’extrait pas les images d’origine et ne rend pas le texte modifiable.',
  seoTitle: 'Convertir un PDF en JPG ou PNG en ligne',
  seoDescription: 'Convertissez jusqu’à 20 pages PDF en images JPG ou PNG, avec une échelle de 1× à 2× et sans envoyer le document.',
  keywords: [
    'convertir un PDF en JPG',
    'PDF en PNG en ligne',
    'transformer PDF en image',
    'enregistrer page PDF en JPG',
    'convertir chaque page PDF en PNG',
    'PDF en images sans téléversement',
    'page PDF vers image',
  ],
  capabilities: [
    'Rastériser dans l’ordre jusqu’à 20 pages d’un PDF de 25 Mo maximum.',
    'Créer des fichiers PNG ou JPG avec une qualité JPEG fixée à 0,9.',
    'Choisir une échelle de rendu de 1×, 1,5× ou 2×.',
    'Afficher un aperçu et un téléchargement pour chaque page.',
    'Lire le PDF et produire les images dans le navigateur.',
  ],
  contentSections: [
    {
      heading: 'Réponse rapide : convertir les pages d’un PDF en images',
      paragraphs: [
        'Choisissez d’abord le format PNG ou JPG, puis l’échelle 1×, 1,5× ou 2×. Sélectionnez ensuite un PDF de 25 Mo maximum et de 20 pages au plus. La conversion démarre automatiquement et chaque page obtient un aperçu avec son propre bouton de téléchargement, nommé `page-1.png`, `page-2.jpg` et ainsi de suite.',
        'Un changement de format ou d’échelle après chargement ne relance pas automatiquement le rendu déjà terminé. Sélectionnez de nouveau le PDF pour appliquer le nouveau réglage. Il n’existe ni bouton de conversion global après coup, ni archive ZIP : chaque image doit être téléchargée et contrôlée séparément.',
      ],
    },
    {
      heading: 'Échelles 1×, 1,5× et 2× : résolution et mémoire',
      paragraphs: [
        'PDF.js calcule la vue d’une page puis multiplie sa largeur et sa hauteur. Une page rendue à 600 × 800 pixels en 1× atteint environ 900 × 1 200 en 1,5× et 1 200 × 1 600 en 2×. Doubler les deux dimensions produit quatre fois plus de pixels et sollicite davantage la mémoire.',
        'Une échelle supérieure améliore le dessin du texte et des éléments vectoriels sur une grille plus grande, mais n’invente aucun détail absent d’un scan flou. L’outil bloque une page lorsque largeur × hauteur dépasse 16 millions de pixels après mise à l’échelle. Une grande page peut donc passer en 1× et échouer en 2×.',
      ],
      items: [
        '1× pour une sortie rapide, légère ou destinée à une vignette.',
        '1,5× comme compromis courant pour la lecture à l’écran.',
        '2× pour agrandir ou recadrer, avec plus de mémoire consommée.',
        '16 000 000 de pixels maximum par page après mise à l’échelle.',
      ],
    },
    {
      heading: 'PNG ou JPG : quel format choisir',
      paragraphs: [
        'PNG utilise une compression sans perte et convient souvent aux textes, captures, graphiques, lignes et aplats. Une page photographique ou un scan bruité peut toutefois produire un fichier volumineux. JPG utilise une compression avec perte ; la qualité est fixée à 0,9 dans cet outil. Il est souvent pratique pour les photos, mais peut créer des artefacts autour des lettres.',
        'Aucun curseur de qualité JPG ni comparateur de poids n’est intégré. Convertissez une page représentative dans les deux formats, observez-la à 100 % et comparez lisibilité, couleurs, contours et taille. JPG n’est pas toujours plus petit, et PNG ne rend pas net un document déjà flou.',
      ],
    },
    {
      heading: 'Rastériser une page n’est pas extraire ses images',
      paragraphs: [
        'L’outil dessine l’apparence complète de la page sur un canevas. Texte, vecteurs, photographies et annotations visibles deviennent une seule grille de pixels. Il ne récupère pas l’image source incorporée, ne sépare pas un logo, ne conserve pas les calques et ne crée pas un fichier pour chaque ressource interne.',
        'Le texte n’est plus sélectionnable. Les liens, formulaires, boutons, médias, signets et balises d’accessibilité disparaissent du fonctionnement de l’image. Aucun OCR n’est exécuté. Pour modifier des mots, conserver l’interactivité ou extraire une photo originale sans réencodage, il faut une autre méthode.',
      ],
    },
    {
      heading: 'Limites de 20 pages, 25 Mo et 16 millions de pixels',
      paragraphs: [
        'Le PDF ne doit pas dépasser 25 Mo ni 20 pages. Les pages sont traitées l’une après l’autre, mais les aperçus et fichiers restent en mémoire jusqu’au prochain document ou à la fermeture de l’onglet. Vingt grandes pages en 2× peuvent occuper beaucoup plus de mémoire que le PDF compressé de départ.',
        'Un fichier sous la limite peut échouer à cause du chiffrement, d’un dommage, de polices complexes, d’une page trop grande ou d’un manque de mémoire. Sur téléphone, commencez par 1×. L’outil ne choisit pas une plage : si vous n’avez besoin que des pages 4 à 6, extrayez-les d’abord dans un petit PDF.',
      ],
    },
    {
      heading: 'Confidentialité, droits et contrôle des images',
      paragraphs: [
        'PDF.js lit le document et Canvas génère les images dans ce navigateur. FunnyTools ne reçoit pas les pages pour les convertir. Les connexions ordinaires du site restent régies par la politique générale, mais le contenu du document n’est pas joint aux événements de mesure pour produire la sortie.',
        'Ouvrez chaque fichier, vérifiez le numéro, les dimensions, le texte fin, les couleurs, les transparences et les annotations visibles. Si l’image doit être publiée, respectez la confidentialité, le droit d’auteur et les données personnelles. Changer de format ne donne pas le droit de redistribuer le contenu.',
      ],
    },
  ],
  instructions: [
    'Choisissez PNG ou JPG et l’échelle avant de charger le PDF.',
    'Sélectionnez un document de 25 Mo maximum et 20 pages au plus.',
    'Attendez que toutes les pages soient indiquées comme prêtes.',
    'Téléchargez chaque image séparément ; aucune archive ZIP n’est créée.',
    'Contrôlez pixels, lisibilité, couleur, numéro et droits d’utilisation.',
  ],
  examples: [
    'Créer un PNG d’un graphique pour une présentation.',
    'Exporter un dépliant photographique page par page en JPG.',
    'Préparer des aperçus d’un document public dont on détient les droits.',
    'Convertir une fiche PDF pour un système qui n’accepte que des images.',
    'Comparer 1× et 2× avant de recadrer une zone de petit texte.',
  ],
  audience: [
    'Personnes ayant besoin d’une image indépendante par page.',
    'Enseignants insérant une page visuelle dans un diaporama.',
    'Créateurs préparant des aperçus de leurs propres documents.',
    'Utilisateurs préférant une conversion locale sans inscription.',
  ],
  caseStudies: [
    {
      title: 'Schéma pour une diapositive',
      description: 'Une page vectorielle est rendue en PNG à 2× afin de préserver des contours nets lors d’un agrandissement raisonnable. Les dimensions sont contrôlées et les légendes ne sont plus considérées comme du texte sélectionnable.',
    },
    {
      title: 'Brochure riche en photographies',
      description: 'La même page est testée en PNG et en JPG. Le JPG à 0,9 est plus pratique, mais les titres et petits codes sont agrandis avant validation pour repérer les artefacts.',
    },
    {
      title: 'Document de 60 pages',
      description: 'La limite est 20 pages. Les pages 4 à 6 sont d’abord extraites dans un nouveau PDF, puis cette copie est convertie afin de réduire le temps et la mémoire nécessaires.',
    },
  ],
  notes: [
    'Le format et l’échelle doivent être choisis avant le PDF.',
    'Maximum 25 Mo, 20 pages et 16 millions de pixels par page.',
    'Le JPG utilise une qualité 0,9 ; il n’y a ni curseur ni ZIP.',
    'La sortie perd le texte sélectionnable et les fonctions interactives.',
    'Une échelle supérieure augmente les pixels sans recréer un détail absent.',
  ],
  faq: [
    { q: 'Une image est-elle créée pour chaque page ?', a: 'Oui. Chaque page possède un aperçu et un téléchargement séparé, par exemple page-1.png.' },
    { q: 'Peut-on convertir seulement une plage de pages ?', a: 'Pas directement. Extrayez d’abord les pages utiles dans un autre PDF, puis chargez cette copie.' },
    { q: 'Quelle échelle donne le plus de résolution ?', a: '2× double largeur et hauteur par rapport à 1×, mais utilise quatre fois plus de pixels et davantage de mémoire.' },
    { q: 'Peut-on régler la qualité JPG ?', a: 'Non. Elle est fixée à 0,9. Essayez PNG si les lettres ou traits montrent des artefacts.' },
    { q: 'L’image conserve-t-elle le texte et les liens ?', a: 'Elle conserve l’apparence en pixels ; le texte n’est plus sélectionnable et les liens ne fonctionnent pas.' },
    { q: 'Le PDF est-il envoyé à FunnyTools ?', a: 'Non. Lecture, rendu et téléchargement s’effectuent dans ce navigateur.' },
  ],
  labels: {
    localNote: 'Le PDF est rendu dans ce navigateur et n’est pas envoyé à FunnyTools.',
    upload: 'Choisir un fichier PDF',
    format: 'Format des images',
    scale: 'Échelle de rendu',
    processing: 'Traitement de la page {page} sur {total}…',
    page: 'Aperçu de la page PDF {page}',
    downloadPage: 'Télécharger la page {page}',
    done: 'Toutes les pages sont prêtes.',
    tooLarge: 'Le PDF dépasse 25 Mo ou une page dépasse 16 millions de pixels.',
    tooMany: 'Vous pouvez traiter au maximum 20 pages à la fois.',
    failed: 'Impossible de convertir le PDF. Vérifiez le fichier, l’échelle et la mémoire disponible.',
  },
  privacyNote: 'Le document est lu et chaque page est dessinée dans la mémoire de ce navigateur. FunnyTools ne reçoit ni ne conserve le PDF ou les images.',
  disclaimer: 'Les images sont des représentations rastérisées : elles ne conservent ni texte sélectionnable, ni liens, formulaires, accessibilité, signature ou valeur documentaire.',
};

export const frenchPdfToImageReview = {
  heading: 'Comment contrôler les images créées depuis un PDF',
  intro: 'Un aperçu visible ne prouve pas que la résolution, la lisibilité ou le format conviennent à l’usage final.',
  panels: [
    { title: 'Mesurer les pixels', text: 'Confirmez largeur et hauteur après application de l’échelle.' },
    { title: 'Agrandir le contenu', text: 'Examinez petit texte, traits, codes et photos à 100 %.' },
    { title: 'Vérifier l’usage', text: 'Contrôlez numéro, ordre, droits et exigences du système destinataire.' },
  ],
  checklistHeading: 'Liste de contrôle',
  checklist: [
    'Chaque page attendue possède un fichier au bon numéro.',
    'Le format réel correspond bien à PNG ou JPG.',
    'Textes, graphiques et couleurs restent lisibles à la taille d’usage.',
    'Aucun besoin ne dépend des liens ou du texte sélectionnable perdus.',
  ],
};

export const frenchPdfCompressor: ToolContent = {
  name: 'Compresser un PDF dans le navigateur',
  short: 'Tentez de réduire le poids d’un PDF en optimisant sa structure, sans diminuer la résolution des images.',
  long: 'Sélectionnez un PDF de 40 Mo maximum et lancez une réécriture structurelle avec des flux d’objets. L’outil affiche le poids initial, celui de la sortie et la variation, même si la copie devient plus grande. Il n’offre aucun niveau de compression, ne rééchantillonne pas les images et ne garantit pas une réduction.',
  seoTitle: 'Compresser un PDF en ligne sans envoi',
  seoDescription: 'Tentez une optimisation structurelle locale d’un PDF et comparez le poids avant/après, sans promesse de réduction ni baisse de résolution.',
  keywords: [
    'compresser un PDF',
    'réduire taille PDF',
    'diminuer poids PDF',
    'optimiser PDF sans téléverser',
    'rendre PDF moins lourd',
    'compression PDF dans le navigateur',
    'réduire Mo PDF',
  ],
  capabilities: [
    'Ouvrir un PDF de 40 Mo maximum et le réenregistrer avec des flux d’objets.',
    'Afficher le poids initial et le poids exact de la sortie.',
    'Calculer une variation en pourcentage avec son signe.',
    'Permettre l’inspection de la copie même lorsqu’elle n’est pas plus petite.',
    'Traiter le document localement sans l’envoyer à FunnyTools.',
  ],
  contentSections: [
    {
      heading: 'Réponse rapide : quelle compression est appliquée',
      paragraphs: [
        'Choisissez un PDF de 40 Mo maximum, puis cliquez sur « Tenter de compresser le PDF ». Le navigateur ouvre le document et le réenregistre en utilisant des flux d’objets. Il affiche ensuite la taille initiale, la taille de sortie et la variation. Téléchargez la copie seulement si vous souhaitez la contrôler.',
        'Il s’agit d’une optimisation structurelle, pas d’un réglage visuel faible, moyen ou fort. L’outil ne diminue pas la résolution des photos, ne change pas leur qualité JPEG et ne vise pas automatiquement un nombre de Mo. Un PDF déjà optimisé peut rester presque identique ou devenir plus lourd.',
      ],
    },
    {
      heading: 'Pourquoi le gain varie selon le document',
      paragraphs: [
        'Un PDF contient des objets décrivant pages, polices, images, tracés, métadonnées et relations internes. Regrouper certains objets dans des flux réduit parfois la surcharge d’un fichier créé sans cette optimisation. Le résultat dépend donc du logiciel d’origine et de la part du poids occupée par la structure.',
        'Dans un scan, les images pleine page représentent souvent l’essentiel du fichier. Comme elles ne sont pas rééchantillonnées ici, le gain peut être faible. Un PDF de texte exporté par un logiciel récent peut aussi être déjà compact. Aucune promesse du type « moins 70 % » n’est honnête avant mesure réelle.',
      ],
    },
    {
      heading: 'Lire la variation en pourcentage',
      paragraphs: [
        'La formule est `(sortie − original) ÷ original × 100`. Une variation de −12 % indique une copie 12 % plus légère. Une variation de +3 % indique une sortie 3 % plus lourde. Le signe est essentiel : l’outil ne masque pas un résultat défavorable et ne remplace jamais le fichier source.',
        'Comparez également la limite exacte du destinataire. Passer de 10,2 à 10,0 Mo ne suffit pas si un portail exige strictement moins de 10 Mo ou utilise une autre convention de calcul. Consultez les propriétés du fichier puis faites un essai de dépôt avant de supprimer une version.',
      ],
    },
    {
      heading: 'Que faire si le PDF reste trop lourd',
      paragraphs: [
        'Commencez par supprimer les pages inutiles, extraire uniquement ce qui doit être envoyé et organiser la séquence finale. Si le poids provient de scans, choisissez une résolution minimale encore lisible puis utilisez un logiciel qui rééchantillonne réellement les images. Cette page n’effectue pas ce travail.',
        'Réexporter depuis Word, un logiciel de présentation ou le fichier de mise en page offre souvent davantage de contrôle. Diviser le PDF aide seulement si plusieurs fichiers sont acceptés. Convertir les pages en JPG puis reconstruire un PDF peut réduire le poids, mais détruit texte sélectionnable, liens et accessibilité : ce compromis doit être explicite.',
      ],
      items: [
        'Retirer les feuilles vides, répétées ou hors du dossier.',
        'Extraire seulement les pages demandées par le destinataire.',
        'Réexporter depuis la source avec images et polices adaptées.',
        'Rééchantillonner un scan après avoir défini une lisibilité minimale.',
      ],
    },
    {
      heading: 'Signatures, formulaires, chiffrement et métadonnées',
      paragraphs: [
        'Réenregistrer peut invalider une signature numérique ou altérer certaines propriétés. Formulaires, signets, pièces jointes, calques, commentaires, balises d’accessibilité, PDF/A et préparation d’impression ne sont pas validés exhaustivement. Un fichier chiffré, protégé ou endommagé peut refuser de s’ouvrir.',
        'Le chargement évite une mise à jour automatique des métadonnées, mais l’outil n’est pas conçu pour supprimer les informations personnelles. Il ne garantit pas le retrait d’un auteur, d’un historique, d’une pièce jointe cachée ou d’une donnée sensible. Un assainissement documentaire exige une procédure spécialisée.',
      ],
    },
    {
      heading: 'Confidentialité, mémoire et contrôle final',
      paragraphs: [
        'La lecture et le réenregistrement ont lieu dans ce navigateur ; FunnyTools ne reçoit pas le PDF pour l’optimiser. Les connexions ordinaires du site restent possibles selon la politique générale, mais les pages du document ne sont pas intégrées aux événements de mesure pour effectuer la compression.',
        'Même sous 40 Mo, le processus demande de la mémoire supplémentaire pour l’original et la sortie. Un téléphone peut échouer plus tôt. Après téléchargement, comparez le poids, le nombre de pages, les images, le texte, les liens, les champs, les signets et les signatures. Si la copie est plus grande ou perd une fonction, conservez l’original.',
      ],
    },
  ],
  instructions: [
    'Choisissez une copie du PDF de 40 Mo maximum.',
    'Lancez la tentative et attendez l’affichage des deux tailles.',
    'Lisez le signe : négatif pour une réduction, positif pour une augmentation.',
    'Téléchargez le résultat uniquement pour inspecter la nouvelle version.',
    'Contrôlez contenu et fonctions, puis testez la limite réelle du destinataire.',
  ],
  examples: [
    'Tester un PDF ancien dont la structure contient une forte surcharge.',
    'Comparer une demande de 10,2 Mo avant un dépôt sur un portail.',
    'Constater qu’un scan photographique change peu sans rééchantillonnage.',
    'Optimiser une copie locale avant de la joindre à un courriel.',
    'Conserver l’original lorsque le fichier de sortie devient plus grand.',
  ],
  audience: [
    'Personnes voulant essayer une réduction locale avant un partage.',
    'Étudiants et bureaux confrontés à une limite de dépôt.',
    'Utilisateurs préférant une comparaison mesurée à une promesse fixe.',
    'Personnes ne souhaitant pas envoyer leur document à un compresseur distant.',
  ],
  caseStudies: [
    {
      title: 'Structure peu compacte',
      description: 'Une copie issue d’un ancien logiciel contient une surcharge. La variation devient négative après réécriture ; la version plus légère est néanmoins relue page par page.',
    },
    {
      title: 'Scan qui change très peu',
      description: 'Des photos de pages occupent presque tout le poids. La structure représente une faible part, donc la sortie ne baisse pas assez. L’original est conservé et un rééchantillonnage contrôlé est envisagé.',
    },
    {
      title: 'Sortie plus lourde',
      description: 'Un PDF récent était déjà optimisé. La variation positive est affichée et la page recommande de garder le fichier initial. Le bon résultat consiste ici à révéler la mesure, pas à simuler un gain.',
    },
  ],
  notes: [
    'Seule la structure est réécrite ; les images ne sont pas rééchantillonnées.',
    'Il n’existe ni niveau fort/faible ni objectif automatique en Mo.',
    'Un pourcentage négatif réduit la taille ; un positif l’augmente.',
    'La limite d’entrée est 40 Mo, mais la mémoire peut imposer moins.',
    'Aucune suppression de métadonnées ni validation de signature n’est garantie.',
  ],
  faq: [
    { q: 'De combien le PDF sera-t-il réduit ?', a: 'Il n’existe pas de valeur fixe. L’outil mesure la différence réelle après traitement de la structure.' },
    { q: 'La qualité des images est-elle diminuée ?', a: 'Non. Les images ne sont pas rééchantillonnées, ce qui explique qu’un scan puisse très peu diminuer.' },
    { q: 'Que signifie un pourcentage positif ?', a: 'La sortie est plus lourde que l’original. Conservez le fichier initial sauf raison particulière d’utiliser la copie.' },
    { q: 'Peut-on choisir une compression forte ou faible ?', a: 'Non. Cette version applique une réécriture structurelle fixe.' },
    { q: 'L’outil supprime-t-il les métadonnées ?', a: 'Non. Ce n’est pas un outil d’assainissement et il ne garantit pas de retirer les informations cachées.' },
    { q: 'Le PDF est-il envoyé à FunnyTools ?', a: 'Non. Lecture, optimisation et préparation du téléchargement ont lieu dans ce navigateur.' },
  ],
  labels: {
    limitNote: 'Optimisation structurelle locale : les images ne sont pas réduites et un gain n’est pas garanti.',
    upload: 'Choisir un fichier PDF',
    original: 'Taille initiale',
    output: 'Taille de sortie',
    change: 'Variation',
    compress: 'Tenter de compresser le PDF',
    download: 'Télécharger le résultat',
    noFile: 'Choisissez d’abord un fichier PDF.',
    tooLarge: 'Le PDF dépasse la limite de 40 Mo.',
    smaller: 'La sortie est plus légère. Téléchargez-la puis vérifiez le document.',
    notSmaller: 'La sortie n’est pas plus légère ; conservez de préférence l’original.',
    failed: 'Impossible de traiter le PDF. Il peut être endommagé, chiffré ou demander plus de mémoire.',
  },
  privacyNote: 'Le document est ouvert puis réenregistré dans la mémoire de ce navigateur. FunnyTools ne reçoit ni ne conserve son contenu.',
  disclaimer: 'Cette fonction optimise uniquement la structure. Elle ne promet aucune réduction, ne rééchantillonne pas les images et ne valide ni signatures, PDF/A, accessibilité ou exigences du portail.',
};

export const frenchPdfCompressorReview = {
  heading: 'Comment contrôler une copie PDF optimisée',
  intro: 'Le poids n’est qu’un critère : une copie plus petite est inutile si elle perd du contenu, une fonction ou l’acceptation du destinataire.',
  panels: [
    { title: 'Comparer les octets', text: 'Lisez le signe du pourcentage et vérifiez la taille dans les propriétés.' },
    { title: 'Parcourir le document', text: 'Contrôlez le total, le texte, les images et les jonctions.' },
    { title: 'Tester le destinataire', text: 'Essayez champs, signatures, liens et dépôt sur le portail final.' },
  ],
  checklistHeading: 'Liste de contrôle',
  checklist: [
    'La sortie est réellement plus légère ou sa conservation a une raison claire.',
    'Le nombre de pages et l’apparence correspondent à l’original.',
    'Champs, liens, signets et signatures ont l’état attendu.',
    'Le fichier s’ouvre et respecte la limite du système destinataire.',
  ],
};
