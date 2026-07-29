import type { ToolContent } from '../tools/_types';

export const frenchRotatePdf: ToolContent = {
  name: 'Faire pivoter les pages d’un PDF',
  short: 'Tournez toutes les pages ou seulement une sélection de 90°, 180° ou 270°, puis téléchargez une nouvelle copie.',
  long: 'Cet outil ouvre un PDF dans votre navigateur, compte ses pages et modifie leur rotation sans envoyer le document à FunnyTools. Choisissez tout le fichier ou indiquez des pages comme 2, 5-7, puis appliquez un angle horaire de 90°, 180° ou 270°. Le résultat est enregistré dans un nouveau PDF ; l’original reste intact.',
  seoTitle: 'Faire pivoter un PDF en ligne gratuitement',
  seoDescription: 'Tournez toutes les pages ou une sélection d’un PDF de 90°, 180° ou 270° et téléchargez une copie sans envoi.',
  keywords: ['faire pivoter un PDF', 'tourner pages PDF', 'rotation PDF en ligne', 'pivoter une page PDF', 'PDF 90 degrés', 'retourner PDF 180 degrés', 'corriger orientation PDF'],
  capabilities: [
    'Analyser le PDF et afficher son nombre de pages.',
    'Appliquer la rotation à toutes les pages ou à une sélection.',
    'Saisir des numéros et plages comme 2, 5-7.',
    'Choisir 90°, 180° ou 270° dans le sens horaire.',
    'Télécharger une nouvelle copie sans remplacer le document source.',
  ],
  contentSections: [
    {
      heading: 'Réponse rapide : comment tourner les pages d’un PDF',
      paragraphs: [
        'Choisissez le PDF et cliquez sur « Analyser le PDF » pour confirmer le total. Sélectionnez « Toutes les pages » si le document entier est couché ou « Pages précises » pour ne corriger que certaines feuilles. Dans ce second cas, saisissez par exemple `2, 5-7`. Choisissez l’angle horaire, lancez la rotation puis ouvrez la copie téléchargée.',
        'Une rotation de 90° place le haut à droite, 180° retourne la page et 270° équivaut à 90° vers la gauche. L’angle s’ajoute à la rotation déjà inscrite dans chaque page. Si une page possédait déjà 90° et que vous ajoutez 90°, sa rotation finale devient 180°.',
      ],
    },
    {
      heading: 'Toutes les pages ou pages précises',
      paragraphs: [
        'Utilisez toutes les pages lorsque le scanner ou le téléphone a produit le même défaut sur l’ensemble du document. Pour un dossier composé de sources différentes, contrôlez chaque vignette dans un lecteur et notez uniquement les pages mal orientées. Une page de couverture horizontale peut être volontaire et ne doit pas forcément suivre le reste.',
        'Les plages utilisent les numéros visibles dans l’ordre du PDF, à partir de 1. Les espaces sont acceptés autour des virgules et tirets. Une valeur hors du total, une plage inversée comme 7-5 ou un texte libre provoque une erreur au lieu d’appliquer une sélection approximative.',
      ],
    },
    {
      heading: 'Rotation de page et contenu réellement redressé',
      paragraphs: [
        'Le PDF enregistre une propriété de rotation pour la page. Les lecteurs modernes l’interprètent et affichent le contenu dans le nouveau sens. Ce n’est pas seulement le bouton de rotation temporaire de votre lecteur : la copie sauvegardée porte la modification. Il faut néanmoins la tester dans l’application qui l’imprimera ou la recevra.',
        'L’outil ne redresse pas une page inclinée de quelques degrés, ne corrige pas la perspective d’une photo et ne recadre pas les bordures noires. Il ne transforme pas non plus le format portrait en paysage en recomposant les éléments. Pour une inclinaison ou une perspective, une étape de numérisation ou de retouche spécialisée reste nécessaire.',
      ],
    },
    {
      heading: 'Signatures, formulaires, annotations et PDF/A',
      paragraphs: [
        'Modifier puis enregistrer un document signé peut invalider une signature numérique ou en modifier l’état de validation. Les formulaires, liens, annotations, pièces jointes, signets, calques et structures d’accessibilité peuvent aussi nécessiter une vérification approfondie. La présence visuelle des pages ne suffit pas à prouver que toutes les fonctions sont intactes.',
        'La copie n’est pas certifiée PDF/A et l’outil ne garantit aucune conformité administrative, juridique ou d’archivage. Pour un contrat signé, une déclaration officielle ou une archive réglementée, utilisez le logiciel et la procédure acceptés par l’organisme destinataire.',
      ],
    },
    {
      heading: 'Document protégé, mémoire et confidentialité',
      paragraphs: [
        'Un PDF chiffré, protégé par mot de passe, endommagé ou utilisant des fonctions non prises en charge peut refuser de s’ouvrir. Le navigateur doit charger le document entier en mémoire. Un gros scan peut donc échouer sur téléphone même si son téléchargement initial semblait possible.',
        'Le fichier est lu, modifié et sauvegardé dans cet onglet. FunnyTools ne reçoit pas ses pages pour effectuer la rotation. Cela ne supprime pas les risques propres à un appareil partagé, une extension de navigateur ou un dossier de téléchargements public. Effacez la page et rangez la copie selon la politique de votre organisation.',
      ],
    },
    {
      heading: 'Contrôle après téléchargement',
      paragraphs: [
        'Comparez le total de pages avec l’original, puis examinez première page, dernière page et chaque numéro sélectionné. Vérifiez que les pages volontairement horizontales restent dans le bon sens. Recherchez du contenu coupé, un affichage blanc, un formulaire cassé ou une signature signalée comme modifiée.',
        'Testez l’impression, la recherche, les liens et le dépôt dans le portail réel lorsque ces fonctions comptent. Gardez l’original jusqu’à acceptation. Une page visuellement droite ne prouve pas que le document complet conserve toutes ses propriétés.',
      ],
    },
  ],
  instructions: [
    'Choisissez un PDF et analysez son nombre de pages.',
    'Sélectionnez toutes les pages ou saisissez des numéros et plages valides.',
    'Choisissez 90°, 180° ou 270° dans le sens horaire.',
    'Créez et téléchargez la nouvelle copie.',
    'Parcourez tout le PDF et testez ses fonctions importantes.',
  ],
  examples: [
    'Tourner de 180° toutes les pages numérisées tête-bêche.',
    'Corriger uniquement les pages 2, 5, 6 et 7.',
    'Faire pivoter une couverture paysage sans toucher au reste.',
    'Remettre dans le bon sens des reçus provenant de plusieurs scanners.',
    'Tester si une rotation enregistrée s’affiche aussi dans le portail final.',
  ],
  audience: [
    'Personnes corrigeant un scan ou un dossier administratif.',
    'Étudiants remettant des pages photographiées dans le bon sens.',
    'Bureaux assemblant des documents provenant de plusieurs sources.',
    'Utilisateurs préférant modifier un PDF localement.',
  ],
  caseStudies: [
    { title: 'Scan entier à l’envers', description: 'Un PDF de huit pages est analysé puis tourné de 180° sur toutes les pages. La copie conserve huit pages et est relue de la première à la dernière.' },
    { title: 'Deux feuilles couchées', description: 'Seules les pages 3 et 6 sont indiquées. Après une rotation de 90°, les autres pages restent inchangées et la couverture paysage est préservée.' },
    { title: 'Document signé', description: 'La rotation modifierait le fichier signé. La personne conserve l’original et demande au destinataire si une nouvelle copie est acceptable avant toute utilisation.' },
  ],
  notes: [
    'La rotation s’ajoute à l’angle déjà enregistré.',
    'Les pages sont numérotées à partir de 1.',
    'L’outil ne corrige ni faible inclinaison ni perspective.',
    'Une modification peut affecter signatures et fonctions interactives.',
    'Le document téléchargé doit être relu entièrement.',
  ],
  faq: [
    { q: 'Comment faire pivoter un PDF en ligne ?', a: 'Choisissez le fichier, sélectionnez les pages et l’angle, puis téléchargez la copie créée dans le navigateur.' },
    { q: 'Puis-je tourner une seule page PDF ?', a: 'Oui. Choisissez Pages précises et saisissez son numéro, par exemple 4.' },
    { q: 'Comment saisir plusieurs pages ?', a: 'Utilisez des virgules et plages comme 2, 5-7. Les numéros doivent exister dans le document.' },
    { q: '90° et 270° correspondent à quel sens ?', a: '90° tourne dans le sens horaire ; 270° équivaut à 90° vers la gauche.' },
    { q: 'La rotation est-elle enregistrée ?', a: 'Oui. Un nouveau PDF est sauvegardé avec la rotation appliquée.' },
    { q: 'L’outil redresse-t-il une page légèrement inclinée ?', a: 'Non. Il applique uniquement des angles de 90°, 180° ou 270°.' },
    { q: 'Une signature numérique restera-t-elle valide ?', a: 'Ce n’est pas garanti. Toute modification peut invalider une signature ; gardez l’original et vérifiez la procédure.' },
    { q: 'Le PDF est-il envoyé à FunnyTools ?', a: 'Non. Lecture, rotation et sauvegarde ont lieu dans ce navigateur.' },
  ],
  labels: {
    localNote: 'Le PDF est traité dans ce navigateur et n’est pas envoyé à FunnyTools.',
    upload: 'Choisir un fichier PDF',
    scope: 'Pages à faire pivoter',
    allPages: 'Toutes les pages',
    customPages: 'Pages précises',
    angle: 'Rotation horaire',
    deg90: '90 degrés',
    deg180: '180 degrés',
    deg270: '270 degrés',
    pagesLabel: 'Numéros de page',
    rangesPlaceholder: 'Exemple : 2, 5-7',
    analyze: 'Analyser le PDF',
    rotate: 'Faire pivoter et télécharger',
    reset: 'Tout effacer',
    processing: 'Traitement du PDF dans ce navigateur…',
    pageCount: 'Le PDF contient {count} pages.',
    downloaded: 'Le téléchargement du PDF pivoté a commencé.',
    noFile: 'Choisissez d’abord un fichier PDF.',
    pdfOnly: 'Choisissez un fichier au format PDF.',
    loadError: 'Impossible d’ouvrir le PDF. Il peut être endommagé, chiffré ou trop volumineux.',
    emptyRange: 'Saisissez au moins un numéro de page.',
    invalidRange: 'Vérifiez les numéros et utilisez des plages valides comme 2, 5-7.',
    rotateError: 'Impossible de faire pivoter le PDF. Vérifiez le fichier et la sélection.',
  },
  privacyNote: 'Le document est lu, modifié et sauvegardé dans la mémoire de ce navigateur. FunnyTools ne reçoit ni ne conserve ses pages. Les données disparaissent après effacement, rechargement ou fermeture.',
  disclaimer: 'Relisez la copie. L’outil ne garantit ni signatures, formulaires, PDF/A, accessibilité, impression, ni conformité légale.',
  sources: [{ label: 'pdf-lib — rotation des pages', href: 'https://pdf-lib.js.org/docs/api/classes/pdfpage#setRotation', note: 'API utilisée pour enregistrer la rotation de page.' }],
};

export const frenchRotatePdfReview = {
  heading: 'Vérifier un PDF après rotation',
  intro: 'L’orientation doit être correcte sans détériorer l’ordre, la lisibilité ou les fonctions du document.',
  panels: [
    { title: 'Contrôler la sélection', text: 'Comparez chaque page tournée à la liste saisie et repérez les feuilles volontairement horizontales.' },
    { title: 'Tester les fonctions', text: 'Ouvrez liens, formulaires, recherche et signatures lorsque le document les utilise.' },
    { title: 'Essayer la destination', text: 'Imprimez ou chargez une copie de test dans le portail final.' },
  ],
  checklistHeading: 'Liste de contrôle',
  checklist: [
    'Le total et l’ordre des pages sont inchangés.',
    'Seules les pages prévues ont tourné dans le bon sens.',
    'Aucun contenu n’est coupé ou devenu blanc.',
    'L’original reste conservé.',
  ],
};

export const frenchDeletePdfPages: ToolContent = {
  name: 'Supprimer des pages d’un PDF',
  short: 'Indiquez les pages inutiles, créez une copie sans elles et conservez toujours au moins une page.',
  long: 'Cet outil analyse un PDF puis construit un nouveau document en copiant toutes les pages sauf celles que vous indiquez. Saisissez des numéros et plages comme 2, 5-7. Les pages sont comptées à partir de 1 et l’ordre des pages conservées ne change pas. Le document source n’est pas envoyé à FunnyTools et n’est jamais écrasé.',
  seoTitle: 'Supprimer des pages d’un PDF en ligne',
  seoDescription: 'Retirez une ou plusieurs pages d’un PDF avec des numéros et plages, puis téléchargez une copie locale sans envoi.',
  keywords: ['supprimer pages PDF', 'enlever une page PDF', 'retirer pages PDF en ligne', 'effacer page PDF', 'PDF sans certaines pages', 'supprimer pages 2 à 5 PDF'],
  capabilities: [
    'Compter les pages avant modification.',
    'Saisir des pages isolées ou des plages.',
    'Refuser une sélection qui supprimerait tout le document.',
    'Conserver l’ordre des pages restantes.',
    'Créer une nouvelle copie locale.',
  ],
  contentSections: [
    {
      heading: 'Réponse rapide : enlever des pages d’un PDF',
      paragraphs: [
        'Choisissez le PDF, analysez-le et notez son total. Saisissez les pages à retirer, par exemple `2, 5-7`. Cliquez sur « Supprimer et télécharger », puis ouvrez la copie. Un document de dix pages avec cette sélection doit en conserver six : 1, 3, 4, 8, 9 et 10.',
        'L’outil ne permet pas de supprimer toutes les pages, car un PDF vide n’est pas un résultat utile. Pour garder seulement quelques pages, l’extraction est souvent plus simple : on indique ce qui doit rester au lieu de calculer toutes les pages à enlever.',
      ],
    },
    {
      heading: 'Numéros, plages et contrôle du total',
      paragraphs: [
        'La numérotation commence à 1 et suit l’ordre interne du fichier, pas nécessairement un numéro imprimé dans le pied de page. Une introduction peut être affichée « i » et pourtant correspondre à la page PDF 1. Utilisez le compteur et le lecteur du PDF pour faire la correspondance.',
        'Les valeurs se séparent par des virgules ; un tiret décrit une plage croissante. Les doublons sont réunis et ne retirent pas deux fois la même page. Une plage hors limites ou inversée est rejetée. Cette validation évite de produire silencieusement une copie différente de la demande.',
      ],
    },
    {
      heading: 'Suppression de page ou masquage de données',
      paragraphs: [
        'Retirer une page complète enlève son contenu visuel de la nouvelle séquence. Cela ne constitue pas une solution certifiée de caviardage ou d’assainissement. Des métadonnées, commentaires, signets, pièces jointes, formulaires, calques ou autres objets peuvent encore contenir des informations.',
        'Pour supprimer une phrase sensible tout en gardant la page, il faut un outil de caviardage réel qui retire les objets et vérifie les données résiduelles. Poser un rectangle noir ou recadrer l’affichage ne suffit pas. Utilisez une procédure approuvée pour des données personnelles, juridiques ou médicales.',
      ],
    },
    {
      heading: 'Signatures, formulaires et liens après copie',
      paragraphs: [
        'Un PDF signé numériquement est modifié lorsque des pages disparaissent ; la signature peut devenir invalide. Les champs de formulaire, liens internes, signets et numéros de page peuvent pointer vers une destination supprimée ou perdre leur cohérence. La copie de pages n’est pas une garantie de conservation fonctionnelle.',
        'Vérifiez particulièrement les tables des matières, renvois « voir page 8 », formulaires multipages et annexes. Pour un document officiel, demandez si une version partielle est admise et s’il faut conserver une déclaration, une signature ou une pagination particulière.',
      ],
    },
    {
      heading: 'Traitement local et limites de mémoire',
      paragraphs: [
        'Le PDF source est chargé et la copie est créée dans la mémoire du navigateur. FunnyTools ne reçoit pas le document. Un fichier chiffré, endommagé ou très volumineux peut cependant échouer. Les scans occupent parfois beaucoup plus de mémoire que leur taille sur disque.',
        'Sur un appareil partagé, le risque principal devient le téléchargement local. Rangez ou supprimez la copie conformément aux règles applicables. Conservez l’original dans un emplacement sûr jusqu’à ce que la version raccourcie soit vérifiée et acceptée.',
      ],
    },
    {
      heading: 'Méthode de vérification après suppression',
      paragraphs: [
        'Calculez le total attendu avant l’opération, puis comparez-le au PDF obtenu. Parcourez chaque jonction : la page avant une suppression doit maintenant être suivie de la bonne page conservée. Vérifiez première et dernière page, table des matières et références croisées.',
        'Si le retrait concernait des données sensibles, utilisez un inspecteur PDF adapté pour rechercher commentaires, pièces jointes, métadonnées et texte résiduel. Ne partagez pas le fichier simplement parce que la page n’apparaît plus dans le lecteur.',
      ],
    },
  ],
  instructions: [
    'Choisissez le PDF et analysez son nombre de pages.',
    'Repérez les numéros internes des pages à retirer.',
    'Saisissez des valeurs comme 2, 5-7.',
    'Créez et téléchargez la copie.',
    'Contrôlez total, jonctions, fonctions et données résiduelles.',
  ],
  examples: [
    'Retirer deux pages blanches ajoutées par un scanner.',
    'Enlever une annexe non destinée au destinataire.',
    'Supprimer les pages 3 à 5 d’une copie de travail.',
    'Conserver le dossier complet sauf une feuille en double.',
    'Décider d’utiliser un outil de caviardage plutôt qu’une simple suppression.',
  ],
  audience: ['Étudiants préparant une copie plus courte.', 'Bureaux retirant doublons ou pages blanches.', 'Personnes créant un extrait à partir d’un dossier.', 'Utilisateurs traitant un PDF localement.'],
  caseStudies: [
    { title: 'Deux pages blanches', description: 'Un scan de douze pages contient des feuilles blanches en 4 et 9. La copie attendue compte dix pages et chaque jonction est contrôlée.' },
    { title: 'Annexe confidentielle', description: 'L’annexe est retirée, mais le document est aussi inspecté pour les pièces jointes et métadonnées. La suppression visuelle n’est pas présentée comme un caviardage certifié.' },
    { title: 'Document signé', description: 'La signature risque d’être invalidée. L’original signé reste intact et le destinataire confirme la forme acceptable avant utilisation.' },
  ],
  notes: [
    'La numérotation interne commence à 1.',
    'Au moins une page doit rester.',
    'Retirer une page n’est pas un caviardage certifié.',
    'Signatures, signets, formulaires et liens peuvent être affectés.',
    'La copie complète doit être relue.',
  ],
  faq: [
    { q: 'Comment supprimer une page d’un PDF ?', a: 'Choisissez le fichier, saisissez son numéro, créez la copie puis vérifiez le total et les pages voisines.' },
    { q: 'Puis-je supprimer plusieurs plages ?', a: 'Oui, par exemple 2, 5-7, 10, si toutes ces pages existent.' },
    { q: 'Puis-je supprimer toutes les pages ?', a: 'Non. La copie doit conserver au moins une page.' },
    { q: 'Les autres pages gardent-elles leur ordre ?', a: 'Oui. Les pages restantes sont copiées dans leur ordre original.' },
    { q: 'Les numéros imprimés correspondent-ils toujours ?', a: 'Non. La sélection utilise la position interne du PDF à partir de 1.' },
    { q: 'La suppression efface-t-elle toute donnée confidentielle ?', a: 'Ce n’est pas garanti. Métadonnées, commentaires ou pièces jointes peuvent subsister.' },
    { q: 'Une signature restera-t-elle valable ?', a: 'Pas nécessairement. Retirer des pages modifie le fichier et peut invalider la signature.' },
    { q: 'Le PDF est-il envoyé à FunnyTools ?', a: 'Non. La copie est construite dans ce navigateur.' },
  ],
  labels: {
    localNote: 'Le PDF est traité dans ce navigateur et n’est pas envoyé à FunnyTools.',
    upload: 'Choisir un fichier PDF',
    pagesLabel: 'Pages à supprimer',
    rangesPlaceholder: 'Exemple : 2, 5-7',
    analyze: 'Analyser le PDF',
    remove: 'Supprimer et télécharger',
    reset: 'Tout effacer',
    processing: 'Création de la copie sans les pages sélectionnées…',
    pageCount: 'Le PDF contient {count} pages.',
    downloaded: 'Le téléchargement du PDF modifié a commencé.',
    noFile: 'Choisissez d’abord un fichier PDF.',
    pdfOnly: 'Choisissez un fichier au format PDF.',
    loadError: 'Impossible d’ouvrir le PDF. Il peut être endommagé, chiffré ou trop volumineux.',
    emptyRange: 'Saisissez au moins une page à supprimer.',
    invalidRange: 'Vérifiez les numéros et utilisez des plages valides comme 2, 5-7.',
    deleteAllError: 'Impossible de supprimer toutes les pages ; au moins une doit rester.',
    deleteError: 'Impossible de créer le PDF. Vérifiez le fichier et la sélection.',
  },
  privacyNote: 'Le document est lu et la nouvelle copie est créée dans la mémoire de ce navigateur. FunnyTools ne reçoit ni ne conserve ses pages.',
  disclaimer: 'Vérifiez le PDF avant partage. Retirer des pages ne garantit ni assainissement des métadonnées, ni signatures, formulaires, liens, accessibilité ou conformité.',
  sources: [{ label: 'pdf-lib — copyPages()', href: 'https://pdf-lib.js.org/docs/api/classes/pdfdocument#copyPages', note: 'API utilisée pour copier uniquement les pages conservées.' }],
};

export const frenchDeletePdfPagesReview = {
  heading: 'Contrôler un PDF après suppression',
  intro: 'Le bon total doit s’accompagner d’un ordre cohérent et d’une vérification des données résiduelles.',
  panels: [
    { title: 'Compter et parcourir', text: 'Comparez le total attendu et examinez chaque nouvelle jonction entre pages.' },
    { title: 'Rechercher les traces', text: 'Inspectez commentaires, pièces jointes, signets et métadonnées si des données sensibles étaient présentes.' },
    { title: 'Tester les fonctions', text: 'Vérifiez liens, formulaires, recherche et état des signatures.' },
  ],
  checklistHeading: 'Liste de contrôle',
  checklist: [
    'Les bonnes pages ont disparu et au moins une reste.',
    'L’ordre et les jonctions sont cohérents.',
    'Les données sensibles résiduelles ont été contrôlées.',
    'L’original est conservé.',
  ],
};

export const frenchExtractPdfPages: ToolContent = {
  name: 'Extraire des pages d’un PDF',
  short: 'Choisissez les pages à conserver, gardez l’ordre saisi et téléchargez un nouveau PDF.',
  long: 'Cet outil analyse un PDF puis copie uniquement les pages indiquées dans un nouveau fichier. Saisissez des valeurs comme 1, 4-6, 10. L’ordre écrit devient l’ordre du résultat et un numéro répété produit une page répétée. Le traitement a lieu dans votre navigateur, sans envoi du document à FunnyTools.',
  seoTitle: 'Extraire des pages d’un PDF en ligne',
  seoDescription: 'Sélectionnez des pages ou plages à conserver et téléchargez un nouveau PDF local, dans l’ordre saisi.',
  keywords: ['extraire pages PDF', 'sélectionner pages PDF', 'enregistrer certaines pages PDF', 'créer PDF avec quelques pages', 'extraire une page PDF', 'garder pages PDF'],
  capabilities: [
    'Analyser le document et compter ses pages.',
    'Conserver une page isolée ou plusieurs plages.',
    'Respecter l’ordre exact de la saisie.',
    'Autoriser une même page plusieurs fois.',
    'Créer une copie locale avec les pages choisies.',
  ],
  contentSections: [
    {
      heading: 'Réponse rapide : enregistrer certaines pages d’un PDF',
      paragraphs: [
        'Choisissez le PDF et analysez son total. Saisissez les pages à garder, par exemple `1, 4-6, 10`, puis cliquez sur « Extraire et télécharger ». La copie contiendra cinq pages dans cet ordre : 1, 4, 5, 6 et 10. Ouvrez-la et contrôlez première, dernière et transition entre chaque section.',
        'L’extraction convient lorsque peu de pages sont nécessaires. Si vous voulez seulement enlever deux pages d’un dossier volumineux, l’outil de suppression demande moins de calcul. Les deux opérations produisent une nouvelle copie et ne changent jamais l’original.',
      ],
    },
    {
      heading: 'Ordre saisi, plages et doublons',
      paragraphs: [
        'Contrairement à la suppression, l’ordre de saisie est conservé. `5, 2, 3` crée un document qui commence par la page 5, puis 2 et 3. Une plage croissante développe chaque numéro. Un doublon comme `1, 1, 4` copie deux fois la page 1. Cette possibilité est utile dans de rares cas, mais peut aussi être une erreur.',
        'La numérotation utilise la position interne à partir de 1. Un numéro imprimé sur la feuille peut être différent à cause d’une couverture ou de chiffres romains. Toute plage hors limites ou inversée est refusée. Analysez toujours le fichier et comparez avec le lecteur.',
      ],
    },
    {
      heading: 'Conserver le contexte nécessaire',
      paragraphs: [
        'Une page isolée peut perdre son titre, sa légende, ses conditions ou la définition d’un tableau. Avant l’extraction, repérez les pages qui donnent le contexte : couverture, en-tête, méthode, signature ou annexes citées. Un document court n’est utile que s’il reste compréhensible et honnête.',
        'Pour transmettre une preuve ou un dossier officiel, vérifiez si l’organisme accepte un extrait. Ne donnez pas l’impression qu’une page représente le document complet lorsque des réserves importantes se trouvent ailleurs. Nommez clairement la copie et conservez la source.',
      ],
    },
    {
      heading: 'Ce qui est copié et ce qui n’est pas extrait',
      paragraphs: [
        'L’outil copie des pages PDF entières. Il ne récupère pas séparément le texte, les images ou les tableaux, et n’ajoute pas d’OCR. Une page scannée reste une image non recherchable. Pour extraire du texte ou convertir une figure, utilisez un flux adapté et contrôlez les droits.',
        'Les liens, formulaires, signets, annotations et structures d’accessibilité peuvent dépendre de pages qui ne sont plus présentes. Les signatures numériques et certifications peuvent être invalidées par la création d’un nouveau fichier. La fidélité visuelle ne prouve pas la conservation fonctionnelle.',
      ],
    },
    {
      heading: 'Confidentialité, droits et limites techniques',
      paragraphs: [
        'Le document source est lu et les pages sont copiées dans la mémoire du navigateur. FunnyTools ne reçoit pas le PDF. Un fichier chiffré, endommagé ou très lourd peut échouer. Sur téléphone, la mémoire disponible limite parfois les grands scans.',
        'L’extraction ne vous accorde aucun droit de reproduction ou de diffusion. Respectez copyright, confidentialité et règles professionnelles. Une page retirée du contexte peut aussi changer le sens d’une citation ou d’un résultat. Utilisez uniquement les fichiers que vous êtes autorisé à traiter.',
      ],
    },
    {
      heading: 'Contrôler le PDF extrait',
      paragraphs: [
        'Comptez les pages du résultat et comparez la séquence à la saisie. Ouvrez la première et la dernière page, puis toutes les jonctions. Cherchez doublons involontaires, section coupée, orientation incorrecte, page blanche ou contenu illisible.',
        'Testez ensuite recherche, liens, impression, formulaire et dépôt si nécessaire. Vérifiez le poids et le nom du fichier. Gardez l’original jusqu’à acceptation et indiquez qu’il s’agit d’un extrait lorsque cette précision compte.',
      ],
    },
  ],
  instructions: [
    'Choisissez le PDF et analysez son total.',
    'Repérez les positions internes des pages à conserver.',
    'Saisissez les numéros et plages dans l’ordre voulu.',
    'Créez et téléchargez l’extrait.',
    'Contrôlez pages, contexte, fonctions, droits et destination.',
  ],
  examples: [
    'Extraire une attestation située en page 6.',
    'Créer une copie avec la couverture et les pages 10 à 12.',
    'Regrouper des annexes non consécutives dans un ordre précis.',
    'Repérer et retirer un doublon involontaire de la saisie.',
    'Conserver une page de contexte avec le tableau extrait.',
  ],
  audience: ['Étudiants partageant quelques pages de référence.', 'Bureaux préparant une annexe ciblée.', 'Personnes créant une copie partielle d’un dossier.', 'Utilisateurs qui veulent garder le PDF local.'],
  caseStudies: [
    { title: 'Attestation avec page de contexte', description: 'La page 6 contient l’attestation, mais la page 5 explique son intitulé. Les deux sont extraites et le fichier est nommé comme extrait.' },
    { title: 'Annexes dans un ordre précis', description: 'La saisie 12, 3-4 crée la séquence attendue. L’équipe compare chaque page au document source avant partage.' },
    { title: 'Doublon involontaire', description: 'La page 2 apparaît deux fois dans la saisie et donc dans le résultat. Le contrôle du total permet de corriger la sélection.' },
  ],
  notes: [
    'L’ordre écrit devient l’ordre du nouveau PDF.',
    'Un numéro répété copie la page plusieurs fois.',
    'L’outil copie les pages complètes, pas leur texte séparé.',
    'Contexte, droits, signatures et fonctions doivent être vérifiés.',
    'Les numéros internes peuvent différer de la pagination imprimée.',
  ],
  faq: [
    { q: 'Comment extraire des pages d’un PDF ?', a: 'Choisissez le fichier, saisissez les pages à conserver et téléchargez la nouvelle copie.' },
    { q: 'Puis-je choisir plusieurs plages ?', a: 'Oui, par exemple 1, 4-6, 10.' },
    { q: 'L’ordre de saisie est-il conservé ?', a: 'Oui. 5, 2, 3 produit les pages dans cet ordre.' },
    { q: 'Que se passe-t-il si je répète un numéro ?', a: 'La page est copiée plusieurs fois dans le résultat.' },
    { q: 'Les numéros imprimés correspondent-ils ?', a: 'Pas toujours. Utilisez la position interne affichée par le lecteur et le compteur.' },
    { q: 'L’outil extrait-il le texte ou les images ?', a: 'Non. Il copie des pages PDF complètes et ne réalise pas d’OCR.' },
    { q: 'Les signatures et formulaires sont-ils conservés ?', a: 'Ce n’est pas garanti. La nouvelle copie peut perdre ou invalider des fonctions.' },
    { q: 'Le PDF est-il envoyé à FunnyTools ?', a: 'Non. La lecture et la copie se font dans ce navigateur.' },
  ],
  labels: {
    localNote: 'Le PDF est traité dans ce navigateur et n’est pas envoyé à FunnyTools.',
    upload: 'Choisir un fichier PDF',
    pagesLabel: 'Pages à conserver',
    rangesPlaceholder: 'Exemple : 1, 4-6, 10',
    analyze: 'Analyser le PDF',
    extract: 'Extraire et télécharger',
    reset: 'Tout effacer',
    processing: 'Création du PDF avec les pages sélectionnées…',
    pageCount: 'Le PDF contient {count} pages.',
    downloaded: 'Le téléchargement de l’extrait PDF a commencé.',
    noFile: 'Choisissez d’abord un fichier PDF.',
    pdfOnly: 'Choisissez un fichier au format PDF.',
    loadError: 'Impossible d’ouvrir le PDF. Il peut être endommagé, chiffré ou trop volumineux.',
    emptyRange: 'Saisissez au moins une page à conserver.',
    invalidRange: 'Vérifiez les numéros et utilisez des plages valides comme 1, 4-6.',
    extractError: 'Impossible d’extraire la sélection. Vérifiez le fichier et les numéros.',
  },
  privacyNote: 'Le PDF source est lu et la sélection est copiée dans la mémoire de ce navigateur. FunnyTools ne reçoit ni ne conserve le document.',
  disclaimer: 'Vérifiez l’extrait avant partage. L’outil ne garantit ni droits d’usage, signatures, formulaires, signets, accessibilité, liens ou certifications.',
  sources: [{ label: 'pdf-lib — copyPages()', href: 'https://pdf-lib.js.org/docs/api/classes/pdfdocument#copyPages', note: 'API utilisée pour copier les pages sélectionnées.' }],
};

export const frenchExtractPdfPagesReview = {
  heading: 'Vérifier un extrait PDF',
  intro: 'Les pages doivent être correctes, ordonnées et accompagnées du contexte nécessaire.',
  panels: [
    { title: 'Première et dernière page', text: 'Confirmez que l’extrait commence et finit au bon endroit.' },
    { title: 'Ordre et doublons', text: 'Parcourez la séquence et repérez tout numéro répété involontairement.' },
    { title: 'Contexte et droits', text: 'Vérifiez que la copie reste compréhensible et peut être partagée.' },
  ],
  checklistHeading: 'Liste de contrôle',
  checklist: [
    'Le total correspond à la sélection.',
    'L’ordre et les plages sont corrects.',
    'Aucun contexte nécessaire ne manque.',
    'L’original et les droits sont préservés.',
  ],
};
