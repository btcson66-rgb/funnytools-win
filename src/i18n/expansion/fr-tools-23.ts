import type { ToolContent } from '../tools/_types';

export const frenchSketchpad: ToolContent = {
  name: 'Tableau blanc pour dessiner en ligne',
  short: 'Dessinez à main levée avec une souris, un doigt ou un stylet, corrigez les derniers traits et téléchargez le croquis en PNG.',
  long: 'Ce tableau blanc pour dessiner en ligne transforme immédiatement le navigateur en feuille de brouillon. Il convient à une explication visuelle, un schéma de cours, une idée de mise en page ou un croquis à partager. Vous choisissez la couleur et l’épaisseur, utilisez une gomme blanche, revenez sur les derniers tracés et exportez un PNG de 960 × 560 pixels. Aucun compte ni téléversement n’est nécessaire, mais le dessin n’est pas sauvegardé après fermeture de l’onglet.',
  seoTitle: 'Tableau blanc en ligne gratuit pour dessiner | PNG',
  seoDescription: 'Dessinez en ligne sur un tableau blanc avec souris, doigt ou stylet. Couleur, épaisseur, gomme, annulation et téléchargement PNG sans inscription.',
  keywords: [
    'tableau blanc en ligne',
    'dessiner en ligne gratuitement',
    'ardoise numérique en ligne',
    'faire un croquis en ligne',
    'dessin à main levée',
    'tableau blanc sans inscription',
    'télécharger dessin png',
  ],
  capabilities: [
    'Tracer à main levée avec une souris, un pavé tactile, un doigt ou un stylet compatible.',
    'Choisir librement la couleur et une épaisseur comprise entre 1 et 48 pixels.',
    'Effacer en recouvrant les traits avec la couleur blanche du fond.',
    'Annuler des tracés entiers dans la limite des trente états les plus récents.',
    'Vider le canevas après une demande de confirmation.',
    'Télécharger le dessin visible dans un fichier PNG de 960 × 560 pixels.',
  ],
  contentSections: [
    {
      heading: 'Réponse directe : comment dessiner en ligne puis garder le croquis',
      paragraphs: [
        'Choisissez une couleur, réglez l’épaisseur et faites glisser le pointeur dans la zone blanche. Un appui bref produit un point ; un déplacement continu forme un trait. Activez Gomme pour recouvrir une partie avec du blanc, puis désactivez-la avant de reprendre la couleur. Lorsque le dessin est prêt, sélectionnez Télécharger le PNG avant de recharger ou de quitter la page. Le fichier conserve une définition interne de 960 × 560 pixels, même si le canevas paraît plus étroit sur téléphone.',
        'Le bouton Annuler revient à l’état qui précédait le dernier tracé terminé. Il ne retire pas seulement quelques pixels du mouvement. Le tableau conserve au maximum trente états afin de limiter la mémoire utilisée par les copies du canevas. Quand cette limite est dépassée, les états les plus anciens sont abandonnés. Vider le tableau crée lui aussi un état : une annulation immédiate peut donc récupérer le dessin, tant que l’onglet n’a pas été rechargé.',
      ],
      items: [
        '4 à 8 px : écriture large, flèches et schémas faciles à relire.',
        '1 à 3 px : petits détails sur un écran suffisamment précis.',
        '16 px et plus : titres, repères visibles ou aplats manuels.',
        'Téléchargement obligatoire avant fermeture : aucun brouillon serveur ne subsiste.',
      ],
    },
    {
      heading: 'Tableau blanc, ardoise numérique ou logiciel de dessin : quelle différence ?',
      paragraphs: [
        'Ici, « tableau blanc » désigne un espace individuel et temporaire. Il sert à matérialiser une idée sans installer d’application : expliquer un angle pendant un partage d’écran, esquisser la disposition d’une diapositive, noter une direction sur un plan simplifié ou préparer une miniature. L’interface reste volontairement courte afin de passer du besoin au premier trait sans créer de document, de compte ni d’espace de travail.',
        'Ce n’est pas un tableau blanc collaboratif. La page ne crée ni salle, ni lien d’invitation, ni curseur partagé et deux personnes ne peuvent pas modifier le même canevas. Ce n’est pas non plus un logiciel vectoriel : il n’y a pas de calques, texte éditable, sélection d’objet, formes géométriques, import d’image ou export SVG. Pour des longueurs et formes précises, la CAO 2D est plus adaptée ; pour une suite d’étapes reliées, choisissez le créateur de diagramme de flux.',
      ],
      link: {
        prefix: 'Pour tracer des formes avec grille, mesures et export SVG, utilisez la ',
        label: 'CAO 2D en ligne',
        href: '/fr/outils/cao-2d-en-ligne/',
        suffix: '.',
      },
    },
    {
      heading: 'Souris, écran tactile et stylet : ce que font les Pointer Events',
      paragraphs: [
        'Le dessin s’appuie sur les Pointer Events du Web. Cette API représente la souris, le contact tactile et le stylet à travers un même modèle d’événements. Au début d’un trait, le canevas capture le pointeur afin de continuer à recevoir ses déplacements jusqu’au relâchement, même si le geste s’écarte légèrement. Dans la zone de dessin, le navigateur ne doit pas transformer le geste en défilement de page ; cela rend le trait plus stable sur mobile.',
        'Les coordonnées visibles sont mises à l’échelle vers les 960 × 560 pixels du canevas. Un téléphone peut donc afficher une version réduite tout en exportant la définition entière. Cela n’invente toutefois aucun détail : un doigt masque une zone plus large qu’une pointe de stylet, certains pavés tactiles lissent les mouvements et le zoom du navigateur change le confort de visée. L’outil n’exploite ni pression ni inclinaison ; l’épaisseur reste celle du curseur.',
      ],
    },
    {
      heading: 'Méthode simple pour obtenir un croquis lisible',
      paragraphs: [
        'Commencez par la question à laquelle le dessin doit répondre. Si une autre personne doit comprendre la hiérarchie d’une page, tracez d’abord les grands blocs et la direction de lecture. Si vous expliquez un mécanisme, placez les éléments, puis ajoutez les relations et enfin les détails. Une structure sommaire mais cohérente est souvent plus utile qu’un dessin chargé de petites annotations difficiles à voir.',
        'Gardez une couleur sombre pour la structure et réservez une seconde couleur à une correction, un danger ou un élément prioritaire. Multiplier les couleurs sans légende oblige le lecteur à deviner. Laissez également une marge : le PNG contient le canevas complet et ne recadre pas automatiquement la zone dessinée. Avant de télécharger, vérifiez le contraste sur blanc, les pointes de flèches et la taille réelle d’affichage du futur destinataire.',
      ],
      items: [
        'Énoncez en une phrase ce que le lecteur doit comprendre.',
        'Tracez les contours avant les annotations et les détails.',
        'Employez des flèches dont la pointe et le sens restent évidents.',
        'Ouvrez le PNG téléchargé avant d’effacer le tableau.',
      ],
    },
    {
      heading: 'Gomme blanche, annulation et limites de correction',
      paragraphs: [
        'La gomme ne supprime pas des objets : elle dessine en blanc par-dessus les pixels. Le résultat convient parce que le fond du canevas est blanc, mais il ne produit aucune transparence. Si un trait coloré croise un autre trait, gommer la partie supérieure peut aussi recouvrir la partie inférieure. Zoomez la page ou réduisez l’épaisseur pour corriger une zone serrée, puis contrôlez le résultat à l’échelle normale.',
        'L’historique photographie le canevas après chaque trait terminé. Cette approche rend l’annulation prévisible, mais chaque état consomme de la mémoire ; la limite de trente est donc volontaire. Il n’existe pas de bouton Rétablir : après avoir annulé, un nouveau trait devient la nouvelle suite du dessin. Pour comparer plusieurs variantes sans risque, téléchargez un PNG à chaque étape importante au lieu de compter sur l’historique de l’onglet.',
      ],
    },
    {
      heading: 'PNG, dimensions, impression et qualité visuelle',
      paragraphs: [
        'Le format PNG convient aux lignes, aux aplats et à l’écriture dessinée, car son encodage sans perte évite les blocs typiques d’un JPEG très compressé. Le navigateur crée le fichier à partir de `HTMLCanvasElement.toDataURL()`. MDN précise que le PNG est le format par défaut et que les images créées utilisent 96 dpi lorsque le format gère cette information. Le fichier FunnyTools garde toujours un fond blanc.',
        'Une image de 960 × 560 pixels est suffisante pour un message, une note ou une insertion à l’écran. Elle n’est pas vectorielle : agrandir fortement le PNG fait apparaître les pixels. À 96 ppp, la correspondance théorique est d’environ 25,4 × 14,8 cm ; à 300 ppp, environ 8,1 × 4,7 cm. Ces dimensions servent de repère, car le logiciel d’impression peut rééchantillonner ou ajuster l’image à la page.',
      ],
    },
    {
      heading: 'Confidentialité, fermeture de l’onglet et partage',
      paragraphs: [
        'Les traits et les états d’annulation résident dans la mémoire de cette page. FunnyTools ne reçoit pas le dessin et aucun compte n’en conserve une copie. Ce traitement local réduit les transferts, mais il supprime aussi toute récupération automatique : une actualisation, une fermeture, un manque de mémoire ou un plantage peut faire disparaître le travail. Pour un contenu difficile à refaire, téléchargez régulièrement des versions intermédiaires.',
        'Un croquis peut malgré tout révéler un nom, une adresse, une signature, une organisation de classe ou une information confidentielle au moment où vous partagez le PNG. Relisez l’image entière et pas seulement la zone principale. Ne présentez pas une signature dessinée comme une signature électronique valable. Le site ne peut ni effacer une copie déjà téléchargée ni contrôler le canal auquel vous l’envoyez.',
      ],
    },
    {
      heading: 'Quand passer à la CAO, au diagramme de flux ou à un outil collaboratif',
      paragraphs: [
        'Utilisez ce tableau pour l’exploration rapide et l’explication informelle. Passez à la CAO 2D si les longueurs, angles, accrochages ou formes géométriques doivent rester modifiables. Préférez un diagramme de flux quand les rectangles et losanges portent un sens précis. Un outil de présentation conviendra mieux si le texte doit rester éditable, et une plateforme collaborative sera nécessaire pour plusieurs curseurs, commentaires et historique partagé.',
        'Le bon critère n’est pas le nombre de boutons mais la vie future du document. Un croquis jetable peut rester rasterisé ; une procédure officielle, un plan coté ou un support révisé pendant plusieurs mois demande un format éditable, des versions et une personne responsable. Le PNG de cette page peut servir d’amorce ou d’illustration, pas de source structurée réutilisable.',
      ],
    },
  ],
  instructions: [
    'Choisissez la couleur du pinceau et réglez une épaisseur entre 1 et 48 pixels.',
    'Dessinez sur le canevas blanc avec une souris, un doigt ou un stylet ; un appui bref crée un point.',
    'Activez Gomme pour recouvrir les pixels de blanc, puis désactivez-la avant de reprendre le pinceau.',
    'Sélectionnez Annuler pour revenir avant le dernier trait terminé, dans la limite de trente états.',
    'Utilisez Vider et confirmez seulement si vous souhaitez remettre tout le canevas en blanc.',
    'Téléchargez `tableau-blanc.png`, ouvrez le fichier et contrôlez-le avant de quitter la page.',
  ],
  examples: [
    'Esquisser la place du titre, d’une image et d’un bouton sur une future diapositive.',
    'Expliquer une fraction, un angle ou une relation spatiale pendant un partage d’écran.',
    'Tracer un itinéraire très simple avec trois repères et une flèche d’arrivée.',
    'Préparer la composition d’une vignette avant de travailler dans un logiciel à calques.',
    'Noter visuellement une idée pendant une réunion sans créer de compte.',
  ],
  audience: [
    'Élèves et enseignants qui veulent illustrer rapidement une explication.',
    'Personnes qui ont besoin d’un brouillon visuel jetable.',
    'Équipes qui joignent une note dessinée à une conversation ou à un document.',
    'Utilisateurs de téléphone ou de tablette qui préfèrent dessiner au doigt ou au stylet.',
  ],
  caseStudies: [
    {
      title: 'Maquette rapide d’une diapositive',
      description: 'Une personne trace trois blocs, compare deux hiérarchies et télécharge chaque variante. Les PNG deviennent des références avant la création d’une version avec texte éditable.',
    },
    {
      title: 'Explication de géométrie à distance',
      description: 'L’enseignante partage l’écran, emploie une couleur pour la construction et une autre pour la correction, puis télécharge le tableau. Elle n’attend ni édition multiutilisateur ni sauvegarde serveur.',
    },
    {
      title: 'Croquis d’orientation',
      description: 'Une personne marque l’entrée, deux changements de direction et un repère. Elle relit l’image avant l’envoi pour retirer toute adresse privée inutile.',
    },
  ],
  notes: [
    'Aucune sauvegarde automatique n’est disponible après fermeture ou rechargement.',
    'La gomme peint en blanc et ne crée pas de transparence.',
    'L’historique conserve au maximum trente états et ne propose pas Rétablir.',
    'Le PNG mesure 960 × 560 pixels et peut se pixelliser après fort agrandissement.',
    'Il n’existe ni calque, ni import d’image, ni texte éditable, ni collaboration en temps réel.',
  ],
  faq: [
    {
      q: 'Peut-on dessiner en ligne sans inscription ?',
      a: 'Oui. Le tableau blanc s’ouvre directement. Le dessin reste toutefois dans cet onglet jusqu’au téléchargement ou à la fermeture.',
    },
    {
      q: 'Le tableau fonctionne-t-il avec un écran tactile et un stylet ?',
      a: 'Oui dans les navigateurs compatibles avec les Pointer Events. La pression et l’inclinaison ne modifient pas le trait : seule l’épaisseur choisie est appliquée.',
    },
    {
      q: 'Le dessin est-il sauvegardé automatiquement ?',
      a: 'Non. Téléchargez le PNG avant d’actualiser ou de fermer. FunnyTools ne conserve aucune copie serveur.',
    },
    {
      q: 'La gomme rend-elle le fond transparent ?',
      a: 'Non. Elle recouvre avec du blanc et le PNG final possède lui aussi un fond blanc.',
    },
    {
      q: 'Combien de fois peut-on annuler ?',
      a: 'L’historique garde au maximum trente états récents. Chaque trait terminé et chaque vidage confirmé ajoute un état.',
    },
    {
      q: 'Peut-on ajouter du texte ou des formes modifiables ?',
      a: 'Non. Tout est dessiné à main levée. Utilisez la CAO 2D pour des formes mesurées ou le créateur de diagramme de flux pour des nœuds reliés.',
    },
    {
      q: 'Quelle est la taille du fichier PNG ?',
      a: 'L’image mesure 960 × 560 pixels. L’affichage s’adapte à l’écran sans changer cette définition interne.',
    },
    {
      q: 'Peut-on partager le tableau blanc en temps réel ?',
      a: 'Non. Vous pouvez partager votre écran ou envoyer le PNG, mais la page ne crée pas de salle d’édition commune.',
    },
  ],
  labels: {
    localNote: 'Les traits sont traités dans ce navigateur. Téléchargez une copie avant de quitter la page.',
    color: 'Couleur du pinceau',
    brushSize: 'Épaisseur',
    pixels: 'px',
    eraser: 'Gomme',
    undo: 'Annuler',
    clear: 'Vider',
    exportPng: 'Télécharger le PNG',
    canvasLabel: 'Canevas blanc du tableau pour dessiner',
    confirmClear: 'Voulez-vous vraiment vider tout le tableau ?',
    downloadFilename: 'tableau-blanc.png',
  },
  sources: [
    {
      label: 'MDN : événements de pointeur',
      href: 'https://developer.mozilla.org/fr/docs/Web/API/Pointer_events',
      note: 'Décrit le modèle commun aux souris, stylets et contacts tactiles ainsi que la capture du pointeur.',
    },
    {
      label: 'W3C : Pointer Events',
      href: 'https://www.w3.org/TR/pointerevents/',
      note: 'Spécification de référence pour les événements et les périphériques de pointage.',
    },
    {
      label: 'MDN : HTMLCanvasElement.toDataURL()',
      href: 'https://developer.mozilla.org/fr/docs/Web/API/HTMLCanvasElement/toDataURL',
      note: 'Explique la représentation du canevas sous forme de Data URL et l’export PNG.',
    },
  ],
  privacyNote: 'Le dessin et les états d’annulation restent dans la mémoire de cet onglet. Le PNG est généré localement ; FunnyTools ne reçoit pas l’image.',
  disclaimer: 'Tableau de brouillon pour croquis simples. Il ne remplace ni un outil collaboratif, ni un logiciel vectoriel, ni une documentation technique versionnée.',
};

export const frenchSketchpadReview = {
  heading: 'Contrôler le croquis avant de le partager',
  intro: 'Un dessin utile doit rester lisible à sa taille de destination et exister en dehors de l’onglet.',
  panels: [
    { title: 'Lecture', text: 'Affichez le PNG à la taille à laquelle le destinataire le verra.' },
    { title: 'Fichier', text: 'Téléchargez puis ouvrez l’image avant de vider le tableau.' },
    { title: 'Confidentialité', text: 'Retirez les noms, signatures ou repères privés qui ne sont pas nécessaires.' },
  ],
  checklistHeading: 'Liste de contrôle',
  checklist: [
    'Les traits clairs restent visibles sur le fond blanc.',
    'Les flèches et relations ne présentent pas de sens ambigu.',
    'Une marge suffisante entoure les éléments importants.',
    'Le fichier téléchargé s’ouvre correctement.',
    'Personne n’attend une édition collaborative ou une récupération automatique.',
  ],
};

export const frenchFlowchart: ToolContent = {
  name: 'Créer un diagramme de flux en ligne',
  short: 'Organisez un processus avec rectangles, losanges de décision et flèches, déplacez les nœuds puis téléchargez le schéma en PNG.',
  long: 'Ce créateur de diagramme de flux en ligne convient aux procédures courtes, aux algorithmes simples et aux échanges de travail. Il permet d’ajouter un rectangle de processus, un losange de décision, du texte et des flèches dirigées, puis de déplacer ou supprimer chaque élément. Le diagramme reste dans la mémoire de l’onglet et s’exporte en PNG : aucun compte, fichier éditable, historique ou collaboration en temps réel n’est fourni.',
  seoTitle: 'Diagramme de flux en ligne gratuit | PNG',
  seoDescription: 'Créez un diagramme de flux avec processus, losanges de décision et flèches. Modifiez, déplacez et exportez en PNG sans inscription.',
  keywords: [
    'créer un diagramme de flux',
    'diagramme de flux en ligne gratuit',
    'faire un logigramme en ligne',
    'organigramme de processus',
    'losange de décision',
    'schéma de processus avec flèches',
    'exporter diagramme png',
  ],
  capabilities: [
    'Ajouter des rectangles de processus et des losanges de décision.',
    'Modifier le texte du nœud sélectionné par bouton ou double-clic.',
    'Déplacer les nœuds dans les limites du canevas.',
    'Relier deux nœuds par une flèche orientée du premier vers le second.',
    'Sélectionner puis supprimer un nœud avec ses connexions, ou une flèche isolée.',
    'Télécharger un PNG propre, sans surbrillance de sélection.',
  ],
  contentSections: [
    {
      heading: 'Réponse directe : comment créer un diagramme de flux',
      paragraphs: [
        'Définissez d’abord le début et le résultat attendu. Ajoutez un rectangle pour chaque action et un losange lorsque la réponse fait changer de chemin. Sélectionnez un nœud, choisissez Modifier le texte, puis déplacez-le pour dégager les connexions. En mode Relier, cliquez sur le nœud de départ puis sur le nœud d’arrivée : la pointe de la flèche donne le sens de lecture.',
        'L’éditeur fournit seulement deux familles de formes. Pour représenter le départ et la fin, vous pouvez employer des rectangles portant « Début » et « Fin », mais ils ne deviennent pas des terminaux ovales. Si un livrable doit respecter une notation formelle avec document, entrée-sortie, couloirs, BPMN ou UML, utilisez un logiciel spécialisé et vérifiez le standard exigé. Cet outil sert à clarifier une petite logique, pas à certifier une notation.',
      ],
      items: [
        'Rectangle : action, opération ou étape à exécuter.',
        'Losange : question dont la réponse ouvre plusieurs branches.',
        'Flèche : direction entre un nœud source et un nœud cible.',
        'Texte : verbe d’action dans un processus, question dans une décision.',
      ],
    },
    {
      heading: 'Diagramme de flux, logigramme et organigramme : choisir le bon mot',
      paragraphs: [
        'En français, les internautes recherchent « diagramme de flux », « logigramme » ou parfois « organigramme de processus ». Ces mots peuvent désigner une représentation d’étapes reliées. Microsoft décrit les diagrammes de processus comme des visualisations pas à pas, généralement composées de formes reliées par des flèches. Le mot organigramme sert aussi à représenter une hiérarchie de personnes ou de services : ce n’est pas la fonction de ce canevas.',
        'Un diagramme de flux de données est encore autre chose : il distingue sources, destinations, transformations et magasins de données. Le présent éditeur n’offre pas ces symboles spécialisés. Pour éviter un malentendu, nommez le sujet dans le titre du PNG et précisez si vous décrivez une procédure, un algorithme ou une conversation de travail. La qualité vient moins du vocabulaire choisi que de la cohérence des formes et du sens des flèches.',
      ],
    },
    {
      heading: 'Rectangle de processus, losange de décision et flèche',
      paragraphs: [
        'Le rectangle contient une action concrète : « contrôler le dossier », « envoyer le message » ou « enregistrer la demande ». Le losange de décision contient une question dont les réponses conduisent à des routes distinctes : « le dossier est-il complet ? ». Une décision n’est pas une tâche décorée différemment. Si une phrase ne peut pas recevoir deux réponses utiles, elle appartient probablement à un rectangle.',
        'La forme traditionnelle d’une décision est un diamant ou losange. Microsoft indique qu’une décision possède une ou plusieurs transitions entrantes et au moins deux sorties, chacune associée à une condition distincte. L’éditeur FunnyTools ne permet pas d’écrire directement sur une flèche. Placez donc les branches de manière régulière et commencez les nœuds cibles par « Oui : » et « Non : » quand le sens ne peut pas être compris autrement.',
      ],
    },
    {
      heading: 'Transformer une explication orale en processus visible',
      paragraphs: [
        'Écrivez le processus en phrases courtes, une action par ligne. Entourez les conditions qui modifient l’étape suivante. Séparez les formulations composées : « recevoir, vérifier et archiver » masque trois états et peut cacher une erreur, une attente ou un changement de responsable. Si chaque partie a une issue différente, créez trois rectangles plutôt qu’un nœud surchargé.',
        'Dessinez d’abord le chemin principal de haut en bas ou de gauche à droite. Ajoutez ensuite les exceptions, retours et refus. Les croisements et les longues boucles rendent un petit schéma difficile à parcourir. Comme les flèches de cet éditeur sont droites, laissez de l’espace entre les branches et déplacez les nœuds avant de relier. Testez enfin chaque chemin avec un cas concret, y compris le cas qui échoue.',
      ],
      items: [
        'Délimitez un seul processus avec un début et une fin observables.',
        'Employez des verbes précis : recevoir, valider, corriger, publier.',
        'Formulez les décisions comme de vraies questions.',
        'Parcourez toutes les routes, pas seulement le cas habituel.',
      ],
    },
    {
      heading: 'Exemple AEO : traiter une demande incomplète',
      paragraphs: [
        'Un logigramme minimal peut contenir « Recevoir la demande », « Le dossier est-il complet ? », « Non : demander les pièces », « Oui : analyser », puis « Communiquer la réponse ». Une flèche va de la réception au losange. Les deux sorties vont vers les étapes Oui et Non. Si une pièce ajoutée doit être contrôlée à nouveau, une flèche de retour rejoint la décision.',
        'Soumettez trois scénarios : dossier complet et accepté, dossier complet et refusé, dossier incomplet. Si le lecteur ne sait pas où va l’un de ces cas, une étape ou une décision manque. Le PNG peut soutenir une réunion, mais une procédure officielle doit aussi préciser propriétaire, date, version, rôles, délais, contrôles et références. Ces données ne sont pas gérées par l’image.',
      ],
    },
    {
      heading: 'Sélection, déplacement, texte et suppression',
      paragraphs: [
        'En mode Sélectionner/Déplacer, cliquez sur un nœud pour le marquer puis faites-le glisser. Un clic près d’une flèche peut sélectionner la connexion. Modifier le texte ouvre une boîte du navigateur ; sur ordinateur, le double-clic sur un nœud fonctionne également. Le rendu affiche au maximum trois lignes. Une phrase longue risque donc d’être coupée : raccourcissez-la au lieu de réduire mentalement la taille attendue.',
        'Supprimer retire l’élément sélectionné. La suppression d’un nœud efface aussi toutes les flèches qui arrivent à ce nœud ou en partent. Il n’existe pas de fonction Annuler. Avant une modification risquée, exportez une copie. Vider tout demande une confirmation, mais une fois validée l’action n’est pas réversible. Le canevas accepte vingt nœuds au maximum et bloque une connexion dupliquée dans la même direction.',
      ],
    },
    {
      heading: 'Vérifier la logique avant de télécharger le PNG',
      paragraphs: [
        'Commencez au premier nœud et suivez chaque flèche. Chaque rectangle doit avoir une suite, sauf les fins déclarées. Chaque losange doit proposer au moins deux issues compréhensibles. Recherchez les nœuds isolés, les flèches inversées, les boucles sans condition de sortie et les chemins qui se terminent sans résultat. Une personne qui n’a pas participé à la création constitue un bon test de lisibilité.',
        'Le bouton Télécharger le PNG redessine le canevas sans couleur de sélection. La grille claire reste visible et le fichier mesure 1000 × 620 pixels. Il s’agit d’une image rasterisée : les nœuds ne pourront pas être réouverts et déplacés demain. Donnez un nom contextualisé au fichier dans votre dossier et gardez le processus durable dans un format éditable avec historique.',
      ],
    },
    {
      heading: 'Confidentialité et limites d’un schéma de processus',
      paragraphs: [
        'Les nœuds, textes et flèches restent en mémoire dans cette page. FunnyTools ne les téléverse pas et n’utilise pas de stockage local pour reprendre la session. Une actualisation ou une fermeture supprime le diagramme. Le PNG est créé sur l’appareil, puis placé par le navigateur dans son dossier de téléchargement. Évitez les mots de passe, données de santé, noms complets ou détails de sécurité dans une image destinée à circuler.',
        'Rendre un processus visible ne prouve ni sa conformité, ni sa légalité, ni son efficacité. Faites valider les étapes par les personnes qui les exécutent et par la règle applicable. Pour une procédure impliquant autorisations, audit, sûreté ou données personnelles, documentez aussi les responsabilités et contrôles. Le dessin est une aide de compréhension, jamais une homologation.',
      ],
      link: {
        prefix: 'Pour une esquisse sans signification imposée aux formes, ouvrez le ',
        label: 'tableau blanc pour dessiner',
        href: '/fr/outils/tableau-blanc-dessin-en-ligne/',
        suffix: '.',
      },
    },
  ],
  instructions: [
    'Modifiez les nœuds d’exemple ou videz le canevas si vous souhaitez repartir de zéro.',
    'Ajoutez un processus pour chaque action et une décision pour chaque question qui divise le chemin.',
    'En mode Sélectionner/Déplacer, organisez les nœuds et laissez de la place aux connexions.',
    'Activez Relier, cliquez d’abord sur le nœud source puis sur le nœud cible.',
    'Sélectionnez un nœud ou une flèche avant de supprimer ; aucune annulation n’est disponible.',
    'Téléchargez `diagramme-flux.png` et vérifiez le texte, les branches et le cadrage.',
  ],
  examples: [
    'Documenter la réception, le contrôle et la réponse à une demande.',
    'Représenter la logique d’un petit algorithme avant de coder.',
    'Construire les routes Oui et Non d’une liste de vérification.',
    'Expliquer une procédure de support pendant une réunion.',
    'Repérer une décision sans sortie ou une opération répétée.',
  ],
  audience: [
    'Élèves et étudiants qui apprennent séquences, conditions et algorithmes.',
    'Équipes qui ont besoin d’un schéma rapide pour discuter d’un processus.',
    'Personnes qui préparent une procédure avant de la transférer dans un format durable.',
    'Utilisateurs qui veulent exporter un PNG sans créer de compte.',
  ],
  caseStudies: [
    {
      title: 'Dépôt d’un devoir',
      description: 'Le diagramme relie réception, contrôle du format et retour si un fichier manque. Les processus cibles commencent par Oui et Non afin de compenser l’absence d’étiquette sur les flèches.',
    },
    {
      title: 'Premier diagnostic de support',
      description: 'Une équipe place alimentation, connexion et message d’erreur dans une route courte. Elle valide ensuite chaque étape avec le support et déplace la version officielle dans une documentation modifiable.',
    },
    {
      title: 'Algorithme en classe',
      description: 'Un élève représente une condition et deux résultats, teste plusieurs entrées et corrige une flèche inversée avant d’ajouter l’image à son brouillon.',
    },
  ],
  notes: [
    'Seuls les rectangles de processus et les losanges de décision sont disponibles.',
    'Il n’existe ni annulation, ni sauvegarde automatique, ni fichier source éditable.',
    'Le texte visible est limité à trois lignes par nœud.',
    'Les flèches sont droites et ne portent pas d’étiquette.',
    'La grille apparaît dans le PNG de 1000 × 620 pixels.',
    'Supprimer un nœud supprime également toutes ses connexions.',
    'Le canevas accepte vingt nœuds et refuse une flèche dupliquée dans le même sens.',
  ],
  faq: [
    {
      q: 'Comment créer un diagramme de flux en ligne ?',
      a: 'Ajoutez des processus et décisions, modifiez leur texte, déplacez les nœuds puis reliez une source à une cible avec une flèche.',
    },
    {
      q: 'Que signifie le rectangle dans un logigramme ?',
      a: 'Il représente une action ou une opération. Commencez son texte par un verbe précis et gardez la formulation courte.',
    },
    {
      q: 'Que signifie le losange de décision ?',
      a: 'Il contient une question dont les réponses conduisent à au moins deux routes distinctes.',
    },
    {
      q: 'Comment modifier le texte d’un nœud ?',
      a: 'Sélectionnez le nœud puis cliquez sur Modifier le texte. Sur ordinateur, vous pouvez aussi double-cliquer.',
    },
    {
      q: 'Peut-on écrire Oui ou Non sur une flèche ?',
      a: 'Pas directement. Commencez le texte du nœud cible par « Oui : » ou « Non : » et placez les branches de façon régulière.',
    },
    {
      q: 'Peut-on annuler une suppression ?',
      a: 'Non. Téléchargez une copie avant une modification risquée et vérifiez soigneusement la sélection.',
    },
    {
      q: 'Le diagramme est-il sauvegardé pour une prochaine session ?',
      a: 'Non. Il reste dans cet onglet. Le PNG téléchargé est une image qui ne permet pas de reprendre l’édition des nœuds.',
    },
    {
      q: 'Cet outil convient-il à BPMN, UML ou une norme ISO ?',
      a: 'Non comme éditeur conforme. Il ne fournit que deux formes et des flèches ; utilisez un logiciel spécialisé pour une notation formelle.',
    },
  ],
  labels: {
    toolbar: 'Barre d’outils du diagramme de flux',
    selectMove: 'Sélectionner / Déplacer',
    connect: 'Relier',
    editSelected: 'Modifier le texte',
    addProcess: 'Ajouter un processus',
    addDecision: 'Ajouter une décision',
    deleteSelected: 'Supprimer',
    clearAll: 'Vider le diagramme',
    exportPng: 'Télécharger le PNG',
    canvasLabel: 'Canevas du diagramme de flux',
    processText: 'Processus',
    decisionText: 'Décision ?',
    editPrompt: 'Modifiez le texte du nœud',
    connectFirst: 'Sélectionnez le nœud source',
    connectSecond: 'Sélectionnez le nœud cible',
    selectedNode: 'Nœud sélectionné',
    selectedEdge: 'Flèche sélectionnée',
    nothingSelected: 'Aucun élément sélectionné',
    confirmClear: 'Voulez-vous supprimer tous les nœuds et toutes les flèches ?',
    downloadFilename: 'diagramme-flux.png',
    maxNodes: 'Le canevas accepte au maximum 20 nœuds.',
    connectionExists: 'Ces nœuds possèdent déjà une flèche dans ce sens.',
  },
  sources: [
    {
      label: 'Microsoft : diagrammes de processus dans Visio',
      href: 'https://support.microsoft.com/fr-fr/visio/process-diagrams-in-visio',
      note: 'Présente les processus pas à pas, les formes et les flèches ainsi que différents types de diagrammes.',
    },
    {
      label: 'Microsoft : forme Décision',
      href: 'https://support.microsoft.com/fr-fr/office/forme-d%C3%A9cision-ad9d9942-d69f-4f2a-a90f-5dbd97d65507',
      note: 'Décrit le losange traditionnel et les transitions sortantes associées à une décision.',
    },
    {
      label: 'MDN : interface HTMLCanvasElement',
      href: 'https://developer.mozilla.org/fr/docs/Web/API/HTMLCanvasElement',
      note: 'Documente le canevas HTML utilisé pour dessiner et exporter le diagramme.',
    },
  ],
  privacyNote: 'Le diagramme réside dans la mémoire de l’onglet et le PNG est produit dans le navigateur. FunnyTools ne reçoit ni les textes, ni les nœuds, ni les flèches.',
  disclaimer: 'Éditeur de brouillon pour visualiser une logique courte. Il ne garantit aucune conformité ISO, BPMN, UML, juridique, technique ou de sécurité.',
};

export const frenchFlowchartReview = {
  heading: 'Relire le flux avant de le partager',
  intro: 'Un diagramme compréhensible possède une direction stable, des décisions auxquelles on peut répondre et aucune route oubliée.',
  panels: [
    { title: 'Séquence', text: 'Suivez les flèches depuis le début jusqu’à chaque fin possible.' },
    { title: 'Décisions', text: 'Vérifiez que chaque losange est une question et ouvre des sorties distinctes.' },
    { title: 'Durée de vie', text: 'Gardez le PNG comme illustration et la procédure officielle dans un format éditable.' },
  ],
  checklistHeading: 'Liste de contrôle',
  checklist: [
    'Chaque rectangle contient une action unique et concrète.',
    'Aucune flèche ne pointe accidentellement dans le mauvais sens.',
    'Il n’existe ni nœud isolé, ni route sans fin compréhensible.',
    'Le texte reste lisible et ne dépasse pas les trois lignes.',
    'Les personnes qui exécutent le processus peuvent le valider.',
  ],
};

export const frenchRandomStudentPicker: ToolContent = {
  name: 'Tirage au sort d’un élève sans répétition',
  short: 'Collez une liste, tirez un élève au hasard avec Web Crypto et évitez les répétitions jusqu’à la fin du tour.',
  long: 'Ce sélecteur aléatoire aide à attribuer un tour de parole, une démonstration ou un ordre de passage. Une ligne correspond à une entrée ; vous pouvez aussi créer les numéros 1 à 200. Le tirage réel utilise `crypto.getRandomValues()` avec rejet du biais de modulo, puis le mode sans répétition écarte les entrées déjà sorties. Liste et historique restent dans l’onglet. Le CSV est généré localement avec une protection contre les débuts de formule courants.',
  seoTitle: 'Tirage au sort élève en ligne | Sans répétition',
  seoDescription: 'Tirez un élève au hasard depuis une liste : mode sans répétition, historique et CSV, sans inscription. Noms traités dans le navigateur.',
  keywords: [
    'tirage au sort élève',
    'choisir un élève au hasard',
    'sélecteur aléatoire élèves',
    'tirage de noms pour la classe',
    'élève au hasard sans répétition',
    'ordre de passage aléatoire',
    'roue des élèves sans inscription',
  ],
  capabilities: [
    'Lire une entrée par ligne et bloquer les doublons exactement identiques.',
    'Créer automatiquement une liste de numéros consécutifs de 1 à 200.',
    'Choisir un indice avec `crypto.getRandomValues()` et rejet du biais de modulo.',
    'Exclure les personnes déjà sorties jusqu’à la fin du tour.',
    'Copier le dernier résultat et afficher l’ordre complet des tirages.',
    'Exporter un CSV UTF-8 dont les débuts de formule usuels sont neutralisés.',
  ],
  contentSections: [
    {
      heading: 'Réponse directe : comment tirer un élève au sort sans répétition',
      paragraphs: [
        'Collez un prénom, un pseudonyme convenu ou un numéro par ligne. Si la classe utilise déjà des numéros, indiquez l’effectif puis sélectionnez Remplir les numéros. Laissez « Sans répétition jusqu’à la fin du tour » activé : chaque entrée disponible pourra sortir une fois. Quand vous cliquez sur Tirer un élève, le résultat est fixé avec la source aléatoire du navigateur avant l’animation, puis ajouté à l’historique.',
        'Le compteur indique le nombre d’entrées encore disponibles. Quand il atteint zéro, le tour est terminé. Le tirage suivant démarre automatiquement un nouveau tour et affiche un message explicite. Réinitialiser efface l’historique et la mémoire des sorties tout en conservant la liste. Modifier une seule ligne réinitialise aussi le tour, afin de ne pas mélanger un ancien historique avec un nouveau groupe.',
      ],
      items: [
        'Une ligne non vide correspond à une participation.',
        'Les espaces avant et après le texte sont retirés.',
        'Deux lignes strictement identiques doivent être distinguées.',
        'Le mode sans répétition est actif par défaut.',
      ],
    },
    {
      heading: 'Comment `crypto.getRandomValues()` choisit une position',
      paragraphs: [
        'MDN présente `Crypto.getRandomValues()` comme une méthode qui remplit un tableau d’entiers avec des valeurs aléatoires suffisamment fortes pour un usage cryptographique. Le sélecteur demande un entier non signé de 32 bits puis le convertit en indice dans la liste actuellement disponible. Il n’utilise pas `Math.random()` pour désigner l’élève et l’animation visuelle ne modifie pas le résultat.',
        'Appliquer directement le reste d’une division peut favoriser légèrement certains indices lorsque le nombre de valeurs possibles n’est pas un multiple de la taille de la liste. Le code calcule donc la plus grande limite divisible par cette taille, rejette les valeurs situées au-dessus et recommence. Chaque indice accepté possède alors le même nombre de valeurs d’origine. Si Web Crypto manque, l’outil affiche une erreur au lieu de basculer silencieusement vers une source plus faible.',
      ],
    },
    {
      heading: 'Sans répétition : quelle probabilité pour chaque élève ?',
      paragraphs: [
        'Au premier tirage d’un groupe de 30 entrées distinctes, chacune possède une probabilité de 1/30. Après une sortie, le groupe disponible contient 29 entrées et chacune a 1/29 de chance au tirage suivant. Sur un tour complet sans modification, toutes les entrées apparaissent exactement une fois, mais leur ordre reste aléatoire. Désactiver l’option remet la liste entière en jeu à chaque clic : une même personne peut alors sortir deux fois de suite.',
        'Cette égalité mécanique ne signifie pas automatiquement équité pédagogique. Les possibilités de réponse, les besoins particuliers, l’anxiété orale, les absences et le droit de passer ne se résument pas à une probabilité. Le sélecteur répartit des tours parmi les lignes fournies ; l’enseignant conserve la responsabilité du contexte, des adaptations, de l’explication des règles et de la façon dont la participation est prise en compte.',
      ],
    },
    {
      heading: 'Utiliser le tirage sans transformer la participation en piège',
      paragraphs: [
        'Annoncez le but avant le premier clic : question d’entraînement, porte-parole, démonstration, lecture ou ordre de présentation. Dites si l’élève peut demander un temps de réflexion, solliciter un binôme ou passer sans sanction. Retirez les absences et adaptez la liste si certaines personnes ne participent pas à cette activité. Un dispositif visible est mieux accepté lorsque le groupe connaît le début, la fin et le redémarrage du tour.',
        'N’employez pas l’historique comme note automatique. Être choisi ne mesure ni la qualité, ni l’effort, ni les compétences. Pour une évaluation, il faut des critères annoncés et des observations comparables. Le hasard peut varier les sollicitations ou répartir un ordre, mais il ne remplace pas le jugement professionnel. Évitez aussi une mise en scène humiliante : l’animation est un retour d’interface, pas une roulette qui désigne une faute.',
      ],
      items: [
        'Définissez la tâche et le temps de préparation.',
        'Précisez la possibilité de passer ou la solution alternative.',
        'Retirez les absences avant de lancer le tour.',
        'Séparez l’ordre aléatoire de toute décision de notation.',
      ],
    },
    {
      heading: 'Homonymes, numéros de liste et donnée minimale',
      paragraphs: [
        'Deux élèves peuvent porter le même prénom. Si deux lignes contiennent exactement « Camille », le résultat devient ambigu et le suivi sans répétition ne peut pas indiquer de quelle entrée il s’agit. Le bouton de tirage se bloque donc jusqu’à ce que les lignes soient distinguées. Employez le minimum connu du groupe : « Camille 07 » et « Camille 18 », une initiale utile ou un pseudonyme convenu. Le nom de famille complet n’est pas nécessaire dans la plupart des activités instantanées.',
        'Le générateur de nombres remplit 1, 2, 3 jusqu’à l’effectif choisi, avec une limite de 200. Cette option évite de saisir des identités lorsque chaque élève connaît déjà son numéro. Elle n’interroge toutefois aucun logiciel de vie scolaire : supprimez les numéros absents ou non attribués. Toute modification réinitialise l’historique, car la probabilité et le nombre restant n’ont plus le même sens après un changement de participants.',
      ],
    },
    {
      heading: 'Données personnelles d’élèves et principe de minimisation',
      paragraphs: [
        'Un prénom, un nom ou un identifiant qui permet de reconnaître un élève est une donnée personnelle. La CNIL rappelle que les élèves ont droit au respect de leur vie privée et que les outils numériques utilisés en classe doivent être choisis avec vigilance. Pour ce besoin ponctuel, appliquez la minimisation : saisissez seulement ce qui permet au groupe d’identifier le tour, sans adresse, courriel, note, diagnostic, commentaire éducatif ou identifiant officiel.',
        'La liste reste dans la mémoire de l’onglet et FunnyTools ne la reçoit pas. Cette architecture limite un transfert, mais ne dispense pas l’établissement de ses règles et ne protège pas une projection visible, une capture d’écran ou un CSV téléchargé. Utilisez de préférence un appareil pédagogique approprié, informez les personnes du fonctionnement et fermez ou réinitialisez la page après l’activité. Si un pseudonyme suffit, il vaut mieux qu’une identité plus détaillée.',
      ],
    },
    {
      heading: 'Historique, copie et export CSV',
      paragraphs: [
        'L’historique affiche l’ordre depuis la dernière réinitialisation ou modification de liste. Copier le résultat place seulement la dernière entrée dans le presse-papiers. Télécharger l’historique crée `ordre-tirage-eleves.csv` avec deux colonnes : ordre et entrée. Une marque BOM UTF-8 aide certains tableurs à reconnaître correctement les accents et les caractères français.',
        'Un contenu commençant par `=`, `+`, `-` ou `@` peut être interprété comme formule à l’ouverture d’un CSV. La fonction place chaque cellule entre guillemets, double les guillemets intérieurs et ajoute une tabulation devant les débuts de formule usuels, y compris leurs variantes pleine largeur. OWASP souligne qu’aucune neutralisation n’est universelle pour tous les tableurs et toutes les transformations. N’importez pas aveuglément un CSV issu d’une liste non fiable.',
      ],
    },
    {
      heading: 'Conserver ou supprimer le registre de tirage',
      paragraphs: [
        'Si le but est uniquement de varier les prises de parole pendant une séance, il n’est souvent pas nécessaire de télécharger le CSV. Le compteur et l’historique de l’onglet suffisent jusqu’à la fin du tour. Créer un fichier transforme une information éphémère en copie durable sur l’appareil. Demandez-vous à quoi elle sert, qui y accède et quand elle sera supprimée.',
        'Le site ne peut pas effacer un fichier déjà enregistré. Rangez-le dans un espace autorisé, ne le diffusez pas dans un groupe public et supprimez-le quand son objectif est atteint. Un ordre de passage destiné à être partagé peut être converti en liste de numéros plutôt qu’en identités. Pour toute exigence institutionnelle, appliquez la politique de l’établissement et demandez conseil au responsable ou au délégué à la protection des données.',
      ],
    },
  ],
  instructions: [
    'Collez une entrée par ligne ou remplissez automatiquement les numéros de 1 à l’effectif.',
    'Distinguez les homonymes avec un numéro, une initiale ou un pseudonyme convenu ; les doublons exacts sont bloqués.',
    'Retirez les absences et décidez si le mode sans répétition doit durer pendant tout le tour.',
    'Cliquez sur Tirer un élève : Web Crypto fixe le résultat avant l’animation.',
    'Surveillez le compteur et l’historique ; copiez le dernier résultat si vous n’avez besoin que de lui.',
    'Téléchargez le CSV seulement si un registre est utile, puis protégez et supprimez le fichier selon vos règles.',
  ],
  examples: [
    'Distribuer les tours de réponse pendant une ronde sans répétition.',
    'Choisir une personne pour montrer une procédure non évaluative.',
    'Désigner un porte-parole après avoir prévu la possibilité de passer.',
    'Tirer des numéros de place sans saisir de noms.',
    'Établir un ordre aléatoire de présentations puis exporter la liste.',
  ],
  audience: [
    'Enseignants qui souhaitent varier les tours de participation.',
    'Animateurs d’ateliers, clubs et activités éducatives.',
    'Groupes qui déterminent un ordre parmi les personnes présentes.',
    'Utilisateurs qui veulent un tirage local sans compte ni téléversement de liste.',
  ],
  caseStudies: [
    {
      title: 'Tour de questions avec droit de passer',
      description: 'L’enseignante annonce la règle, retire les absences et active la non-répétition. Chaque élève peut passer sans sanction ; le hasard répartit les tours mais ne crée aucune note.',
    },
    {
      title: 'Deux élèves portant le même prénom',
      description: 'Deux lignes « Alex » bloquent le tirage. La classe emploie « Alex 4 » et « Alex 18 », assez précis pour le tour sans ajouter de noms complets.',
    },
    {
      title: 'Ordre de présentations',
      description: 'Le groupe termine un tour complet, relit l’historique puis exporte le CSV. Le fichier n’est gardé que jusqu’à la publication de l’ordre.',
    },
  ],
  notes: [
    'Le sélecteur distribue des tours ; il ne prouve pas l’équité pédagogique et ne doit pas devenir une note automatique.',
    'Les doublons strictement identiques sont bloqués afin d’éviter un résultat ambigu.',
    'Modifier la liste réinitialise le tour et l’historique.',
    'Après la dernière entrée, le clic suivant commence un nouveau tour.',
    'L’animation ne choisit pas le résultat : il est déjà fixé par Web Crypto.',
    'La neutralisation CSV couvre des formules courantes sans garantir tous les lecteurs possibles.',
  ],
  faq: [
    {
      q: 'Comment fonctionne le tirage au sort d’un élève ?',
      a: 'Chaque ligne devient une entrée. Le navigateur choisit un indice avec `crypto.getRandomValues()` ; en mode sans répétition, les entrées déjà sorties sont temporairement exclues.',
    },
    {
      q: 'Le même élève peut-il sortir deux fois ?',
      a: 'Pas pendant un même tour lorsque la non-répétition est activée. Après le dernier nom, le tirage suivant ouvre un nouveau tour.',
    },
    {
      q: 'Que faire si deux élèves portent le même prénom ?',
      a: 'Ajoutez un numéro, une initiale ou un pseudonyme convenu. Les doublons exacts sont bloqués pour que le résultat reste identifiable.',
    },
    {
      q: 'Le sélecteur utilise-t-il Math.random() ?',
      a: 'Non. Le résultat réel utilise `crypto.getRandomValues()` et rejette la plage qui provoquerait un biais de modulo.',
    },
    {
      q: 'La liste d’élèves est-elle envoyée ou sauvegardée ?',
      a: 'Non. Elle reste dans la mémoire de cet onglet et disparaît après rechargement ou fermeture.',
    },
    {
      q: 'Peut-on tirer uniquement des numéros ?',
      a: 'Oui. Saisissez un entier de 1 à 200 puis cliquez sur Remplir les numéros. Retirez ensuite les absences ou numéros inutilisés.',
    },
    {
      q: 'Que contient le CSV téléchargé ?',
      a: 'Il contient l’ordre et l’entrée pour le tour courant, en UTF-8, avec une neutralisation des débuts de formule les plus courants.',
    },
    {
      q: 'Est-il juste d’utiliser le tirage pour noter la participation ?',
      a: 'Une probabilité uniforme ne suffit pas à une évaluation. Les critères, besoins, adaptations et possibilités de participation doivent être pris en compte séparément.',
    },
  ],
  labels: {
    input: 'Liste des élèves ou participants',
    placeholder: 'Une personne ou un numéro par ligne…',
    helperCount: 'Remplir les numéros de 1 à',
    fillNumbers: 'Remplir les numéros',
    pick: 'Tirer un élève',
    dontRepeat: 'Sans répétition jusqu’à la fin du tour',
    remaining: 'Entrées restantes',
    reset: 'Réinitialiser le tour',
    copy: 'Copier le résultat',
    exportCsv: 'Télécharger l’historique CSV',
    historyTitle: 'Ordre des tirages du tour',
    csvOrder: 'Ordre',
    csvName: 'Entrée',
    result: 'Élève sélectionné',
    emptyResult: 'Aucun résultat pour le moment',
    emptyListError: 'Ajoutez au moins une personne ou un numéro.',
    invalidHelperError: 'Saisissez un nombre entier compris entre 1 et 200.',
    exhausted: 'Le tour précédent est terminé. Ce tirage commence un nouveau tour.',
    spinning: 'Tirage en cours…',
    copied: 'Résultat copié',
    duplicateListError: 'Des entrées sont identiques. Ajoutez un numéro, une initiale ou un pseudonyme pour les distinguer.',
    secureRandomError: 'Ce navigateur ne fournit pas la source aléatoire sécurisée nécessaire. Mettez-le à jour ou utilisez un autre navigateur.',
    csvFilename: 'ordre-tirage-eleves.csv',
  },
  sources: [
    {
      label: 'MDN : Crypto.getRandomValues()',
      href: 'https://developer.mozilla.org/fr/docs/Web/API/Crypto/getRandomValues',
      note: 'Documente la source de valeurs aléatoires fortes utilisée pour choisir l’indice.',
    },
    {
      label: 'CNIL : protéger la vie privée des élèves',
      href: 'https://www.cnil.fr/fr/education/livret-enseignants-protegez-la-vie-privee-de-vos-eleves',
      note: 'Rappelle l’importance de la protection des données personnelles dans les usages éducatifs.',
    },
    {
      label: 'OWASP : CSV Injection',
      href: 'https://owasp.org/www-community/attacks/CSV_Injection',
      note: 'Explique l’interprétation de certaines cellules comme formules et les limites des mesures de neutralisation.',
    },
  ],
  privacyNote: 'La liste, le tour et l’historique sont traités dans cet onglet. Le CSV est généré localement ; FunnyTools ne reçoit pas les noms.',
  disclaimer: 'Aide mécanique pour distribuer des tours. Elle ne remplace ni le jugement pédagogique, ni les adaptations, ni une politique transparente de participation et d’évaluation.',
};

export const frenchRandomStudentPickerReview = {
  heading: 'Préparer la liste avant le premier tirage',
  intro: 'Le tirage est plus compréhensible lorsque la liste représente les personnes présentes et que les règles sont annoncées.',
  panels: [
    { title: 'Liste', text: 'Retirez les absences et distinguez les homonymes avec le minimum de données.' },
    { title: 'Règle', text: 'Expliquez la non-répétition, le nouveau tour et la possibilité de passer.' },
    { title: 'Registre', text: 'Téléchargez le CSV uniquement si un besoin précis justifie sa conservation.' },
  ],
  checklistHeading: 'Liste de contrôle',
  checklist: [
    'Chaque ligne correspond à une personne ou à un numéro réellement présent.',
    'Aucun doublon exact ni donnée excessive ne figure dans la liste.',
    'Le groupe connaît le but du tirage.',
    'Les absences, adaptations et possibilités de passer ont été prévues.',
    'L’historique ne servira pas de note automatique.',
  ],
};
