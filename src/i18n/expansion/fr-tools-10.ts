import type { ToolContent } from '../tools/_types';

export const frenchPieChartMaker: ToolContent = {
  name: 'Créer un diagramme circulaire en ligne',
  short: 'Transformez des catégories et des valeurs positives en secteurs avec pourcentages, puis téléchargez le résultat en PNG.',
  long: 'Saisissez une étiquette et une valeur par ligne pour représenter les parties d’un même total. L’outil calcule chaque proportion, dessine une légende et produit un PNG blanc de 900 × 560 pixels. Il accepte une seule série, utilise une palette fixe et fonctionne dans ce navigateur. Il n’importe pas de tableur et ne propose ni couleurs personnalisées, ni anneau, ni secteurs détachés.',
  seoTitle: 'Créer un diagramme circulaire avec pourcentages',
  seoDescription: 'Créez un diagramme circulaire ou camembert avec pourcentages et légende. Aperçu local, limites expliquées et PNG de 900 × 560 pixels.',
  keywords: [
    'créer diagramme circulaire en ligne',
    'faire un graphique camembert',
    'diagramme en secteurs pourcentage',
    'générateur graphique circulaire',
    'camembert statistique en ligne',
    'graphique répartition total',
    'télécharger diagramme circulaire png',
  ],
  capabilities: [
    'Ajouter ou retirer des lignes avec une catégorie et une valeur non négative.',
    'Calculer automatiquement la part de chaque valeur dans le total.',
    'Afficher secteurs, pourcentages et légende sur un canevas de 900 × 560.',
    'Ajouter un titre facultatif limité à 60 caractères.',
    'Télécharger la vue actuelle dans `pie-chart.png` sur fond blanc.',
  ],
  contentSections: [
    {
      heading: 'Réponse rapide : créer un diagramme circulaire',
      paragraphs: [
        'Remplacez les exemples par des catégories qui sont réellement les parties d’un même ensemble. Chaque ligne doit comporter un libellé et un nombre supérieur ou égal à zéro ; au moins une valeur doit être strictement positive. Le pourcentage est calculé selon `valeur ÷ somme des valeurs × 100`. Après contrôle de la légende, cliquez sur « Télécharger le PNG » pour enregistrer `pie-chart.png`.',
        'En français, on parle de diagramme circulaire, de graphique en secteurs ou, plus familièrement, de camembert. Ces expressions renvoient à la même représentation d’une composition. Vous pouvez saisir des montants, des effectifs ou des quantités : ils n’ont pas besoin de totaliser 100 à l’avance, mais doivent employer la même unité, la même période et le même périmètre.',
      ],
    },
    {
      heading: 'Définir correctement le total et les catégories',
      paragraphs: [
        'Un diagramme circulaire répond à une question précise : comment un total se répartit-il entre des catégories distinctes ? Il peut montrer un budget annuel par poste, des suffrages valides par choix ou les ventes d’un mois par canal. Il ne doit contenir qu’une série. Mélanger plusieurs années, monnaies ou populations donne malgré tout un cercle de 100 %, mais ce total n’a plus de sens analytique.',
        'Définissez le dénominateur avant de dessiner. Dans une enquête, le total peut désigner les répondants, les réponses ou les sélections ; ces bases diffèrent lorsque plusieurs choix sont autorisés. Conservez avec l’image la source, l’unité, la période, la taille du total et le traitement de « Autres » ou « Sans réponse ». Le fichier PNG ne mémorise aucune de ces informations.',
      ],
      items: [
        'Toutes les lignes partagent la même unité et la même période.',
        'Chaque catégorie représente une partie comparable du total.',
        'Les catégories sont exclusives, sauf méthode explicitement documentée.',
        'La somme peut être exprimée en euros, personnes ou unités et ne doit pas déjà valoir 100.',
      ],
    },
    {
      heading: 'Pourcentages, zéros, décimales et arrondis',
      paragraphs: [
        'La légende affiche chaque part avec une décimale. La somme visible peut donc atteindre 99,9 % ou 100,1 %, alors que les angles utilisent les valeurs complètes. Ne modifiez pas arbitrairement une catégorie pour forcer l’affichage à 100 %. Gardez les données sources et signalez l’arrondi. Une ligne vide, non numérique ou négative est ignorée par ce composant.',
        'Une valeur nulle reste dans la légende à 0,0 %, sans occuper d’angle. Si toutes les valeurs sont nulles, aucun total positif ne permet de calculer les proportions et l’outil affiche un avertissement. Les valeurs négatives ne conviennent pas à ce diagramme simple. Pour représenter gains et pertes, écarts autour de zéro ou soldes signés, préférez un graphique en barres et une table.',
      ],
    },
    {
      heading: 'Quand préférer un graphique en barres',
      paragraphs: [
        'Le camembert est lisible avec peu de catégories et des écarts suffisamment marqués. Au-delà d’environ six ou sept secteurs, la comparaison des angles devient difficile, surtout si plusieurs valeurs sont proches. Pour classer quinze postes, comparer plusieurs périodes ou mettre en évidence de petites différences, les barres offrent une échelle commune et une lecture généralement plus précise.',
        'Évitez également de comparer plusieurs cercles côte à côte : le lecteur doit mémoriser des angles situés dans des graphiques séparés. Utilisez le circulaire pour une composition simple, les barres pour un classement ou une évolution, et la table lorsque la valeur exacte est essentielle. L’image résume les données ; elle ne remplace ni le tableau ni l’explication du choix graphique.',
      ],
    },
    {
      heading: 'Légende, couleurs et accessibilité',
      paragraphs: [
        'Le canevas utilise huit couleurs fixes et les répète quand le nombre de catégories dépasse huit. Les libellés trop longs sont abrégés dans l’image, même si le champ conserve le texte complet. Deux noms proches peuvent alors devenir ambigus. Ouvrez le PNG final, raccourcissez les intitulés avec discernement et ne faites pas reposer l’identification uniquement sur la couleur.',
        'Une image PNG n’apporte pas automatiquement une table accessible ni un texte alternatif. Lors de la publication, ajoutez une phrase qui formule l’enseignement principal, les valeurs dans un tableau et un texte alternatif qui cite les secteurs importants. Un titre comme « Répartition du budget 2026, en euros » donne davantage de contexte que « Résultats » et limite les interprétations erronées.',
      ],
    },
    {
      heading: 'Confidentialité, téléchargement et contrôle final',
      paragraphs: [
        'Les étiquettes, nombres et pourcentages sont traités dans cet onglet ; FunnyTools ne reçoit pas le tableau pour dessiner le graphique. La page peut charger les services généraux décrits dans la politique de confidentialité, mais les valeurs saisies ne sont pas ajoutées aux événements de mesure. Pour des données sensibles, utilisez des catégories agrégées et retirez les noms de personnes.',
        'Le téléchargement contient seulement une image blanche de 900 × 560 pixels. Il ne conserve pas une source éditable, les formules, la date, l’unité ou les notes. Gardez le tableau original séparément puis comparez le titre, les valeurs, les pourcentages, l’ordre et le total avec le PNG. Ce contrôle révèle les lignes ignorées, un dénominateur mal défini ou une légende tronquée.',
      ],
    },
  ],
  instructions: [
    'Définissez le total et vérifiez que toutes les catégories appartiennent au même ensemble.',
    'Remplacez les exemples par des libellés courts et des valeurs non négatives de même unité.',
    'Ajoutez ou retirez des lignes et indiquez sujet, période ou unité dans le titre.',
    'Contrôlez pourcentages, zéros, libellés abrégés et somme source.',
    'Téléchargez `pie-chart.png` et conservez le tableau, la source et une description accessible.',
  ],
  examples: [
    'Présenter la répartition d’un budget entre cinq postes.',
    'Montrer des suffrages valides par option pour une question à choix unique.',
    'Résumer les canaux de vente d’un même mois.',
    'Expliquer la composition d’un portefeuille sans mélanger périodes ou monnaies.',
    'Illustrer fractions et pourcentages dans un support pédagogique.',
  ],
  audience: [
    'Élèves et étudiants préparant un diagramme en secteurs.',
    'Enseignants illustrant les parties d’un total.',
    'Équipes présentant une composition simple dans un rapport.',
    'Personnes souhaitant produire un PNG sans envoyer de tableur.',
  ],
  caseStudies: [
    { title: 'Budget associatif', description: 'Loyer, personnel, matériel, communication et réserve sont saisis en euros pour le même exercice. La table source indique si les montants sont prévus ou réalisés et accompagne l’image.' },
    { title: 'Question à réponses multiples', description: 'Chaque participant pouvait cocher plusieurs choix. Les sélections ne sont donc pas des parts exclusives de la population : l’équipe passe aux barres et précise la base de calcul.' },
    { title: 'Huit secteurs proches', description: 'La légende reste visible mais les angles sont difficiles à comparer. Le camembert résume la composition et un tableau ou des barres ordonnées donnent les valeurs exactes.' },
  ],
  notes: [
    'Une seule série et des valeurs supérieures ou égales à zéro sont acceptées.',
    'Au moins une valeur doit être positive pour obtenir des proportions.',
    'Les pourcentages visibles sont arrondis à une décimale.',
    'Palette et légende sont fixes : pas d’anneau, de secteur détaché ou de couleur personnalisée.',
    'Le PNG ne contient ni table, ni source, ni unité, ni texte alternatif.',
  ],
  faq: [
    { q: 'Les valeurs doivent-elles déjà totaliser 100 ?', a: 'Non. Utilisez des quantités absolues de même unité ; l’outil calcule chaque proportion sur leur somme.' },
    { q: 'Que devient une valeur nulle ?', a: 'Elle apparaît à 0,0 % dans la légende sans former de secteur. Si toutes les valeurs sont nulles, un avertissement s’affiche.' },
    { q: 'Combien de catégories utiliser ?', a: 'Un ensemble court est plus lisible. Au-delà d’environ sept catégories, une table ou des barres sont souvent préférables.' },
    { q: 'Peut-on changer les couleurs ou créer un anneau ?', a: 'Non. Cette version utilise une palette fixe et produit un diagramme circulaire plat avec légende.' },
    { q: 'Pourquoi le total visible ne vaut-il pas exactement 100 % ?', a: 'Chaque part est arrondie à une décimale dans la légende, tandis que les angles utilisent les valeurs complètes.' },
    { q: 'Les données sont-elles envoyées à FunnyTools ?', a: 'Non. Le tableau, les proportions et l’image sont traités dans ce navigateur.' },
  ],
  labels: {
    chartType: 'pie',
    titleLabel: 'Titre du graphique (facultatif)',
    titlePlaceholder: 'Exemple : Répartition du budget 2026',
    labelHeader: 'Catégorie',
    valueHeader: 'Valeur',
    addRow: 'Ajouter une ligne',
    remove: 'Supprimer',
    exportPng: 'Télécharger le PNG',
    canvasLabel: 'Aperçu du diagramme circulaire',
    emptyHint: 'Saisissez au moins une catégorie avec une valeur supérieure à zéro.',
    seedLabels: 'Logement,Alimentation,Transport,Loisirs',
    seedValues: '40,25,20,15',
  },
  privacyNote: 'Le tableau et le canevas restent dans cet onglet. FunnyTools ne reçoit ni les catégories ni les valeurs pour créer l’image.',
  disclaimer: 'Le graphique ne vérifie pas que les catégories forment un total cohérent et n’ajoute ni source, ni unité, ni contexte. Vérifiez le dénominateur et publiez la table avec l’image.',
};

export const frenchPieChartMakerReview = {
  heading: 'Comment vérifier un diagramme circulaire',
  intro: 'Un cercle peut toujours afficher 100 %, même si des unités, périodes ou populations incompatibles ont été mélangées.',
  panels: [
    { title: 'Définir le dénominateur', text: 'Écrivez ce que représente la somme et confirmez que chaque ligne est une partie comparable.' },
    { title: 'Relire secteurs et légende', text: 'Comparez valeurs, pourcentages, zéros, abréviations et ordre avec le tableau original.' },
    { title: 'Choisir la bonne forme', text: 'Avec beaucoup de catégories ou de petits écarts, ajoutez une table ou passez aux barres.' },
  ],
  checklistHeading: 'Liste de contrôle',
  checklist: [
    'Toutes les catégories partagent unité, période et population.',
    'Au moins une valeur est positive et aucune n’est négative.',
    'Les libellés abrégés restent sans ambiguïté.',
    'La source, la table et le texte alternatif accompagnent le PNG.',
  ],
};

export const frenchWordCounter: ToolContent = {
  name: 'Compteur de mots en ligne',
  short: 'Comptez mots, caractères, lignes, paragraphes, phrases et temps de lecture pendant la saisie.',
  long: 'Collez un texte français ou multilingue pour obtenir immédiatement le nombre de mots, les caractères avec et sans espaces, les lignes, les paragraphes, les phrases et une estimation de lecture. Les lettres accentuées sont reconnues grâce aux règles Unicode ; les idéogrammes CJK sont comptés un par un. Le texte est analysé dans cet onglet. Aucun fichier Word ou PDF n’est importé et aucun historique n’est enregistré.',
  seoTitle: 'Compteur de mots et caractères en ligne',
  seoDescription: 'Comptez mots, caractères avec ou sans espaces, phrases, paragraphes, lignes et temps de lecture. Calcul local et règles expliquées.',
  keywords: [
    'compteur de mots en ligne',
    'compter mots et caractères',
    'nombre de mots dans un texte',
    'compteur caractères avec espaces',
    'compter phrases paragraphes',
    'calcul temps de lecture',
    'compteur de mots gratuit',
  ],
  capabilities: [
    'Mettre les statistiques à jour pendant la saisie ou le collage.',
    'Séparer les caractères avec espaces de ceux sans espaces.',
    'Reconnaître lettres et nombres Unicode avec apostrophes ou traits d’union internes.',
    'Compter lignes, blocs de paragraphes et groupes terminés par une ponctuation de phrase.',
    'Estimer des minutes de lecture et copier un résumé chiffré.',
  ],
  contentSections: [
    {
      heading: 'Réponse rapide : compter les mots d’un texte',
      paragraphs: [
        'Collez le contenu dans la zone et lisez la valeur « Mots » : aucun bouton n’est nécessaire. Les autres indicateurs précisent le résultat avec les caractères, lignes, paragraphes, phrases et minutes estimées. Le bouton « Copier les statistiques » produit un résumé que vous pouvez joindre à une fiche éditoriale ou à un contrôle de remise sans copier le texte lui-même.',
        'Avant de comparer la valeur à une consigne, identifiez l’unité. Une limite de 500 mots, de 1 500 caractères espaces comprises ou d’une page ne décrit pas la même chose. Une université, un éditeur ou un traitement de texte peut appliquer ses propres règles aux nombres, mots composés, citations, notes, bibliographies et champs cachés. La règle officielle de destination reste prioritaire.',
      ],
    },
    {
      heading: 'Comment les mots français sont reconnus',
      paragraphs: [
        'Le composant regroupe des suites de lettres ou de nombres Unicode. `Éducation`, `français`, `cœur` et `2026` comptent chacun comme une unité. Une apostrophe ou un trait d’union placé au milieu d’une suite peut la garder unie, alors que les espaces et la plupart des signes séparent les éléments. Les idéogrammes chinois, japonais ou coréens sont comptés un par un pour mieux traiter les textes sans espaces.',
        'Ce mécanisme n’est pas une analyse linguistique. Il ne reconnaît ni les lemmes, ni toutes les conventions sur les mots composés, ni les abréviations complexes. Il ne lit que le texte collé : commentaires, notes de bas de page, en-têtes et contenu masqué d’un document sont absents. Si une plateforme fixe sa méthode, comparez le résultat dans cette plateforme avant l’envoi.',
      ],
      items: [
        'Les lettres accentuées et ligatures Unicode sont reconnues comme lettres.',
        'Une suite de chiffres peut compter comme un mot.',
        'Apostrophes et traits d’union internes peuvent conserver une unité.',
        'Espaces, retours et ponctuation séparent généralement les unités.',
      ],
    },
    {
      heading: 'Caractères, lignes, paragraphes et phrases',
      paragraphs: [
        '« Caractères avec espaces » utilise la longueur de la chaîne JavaScript et inclut signes, tabulations et retours à la ligne. « Sans espaces » retire les caractères considérés comme blancs. Certains emoji et caractères combinés occupent plusieurs unités internes ; le résultat peut donc différer du nombre de symboles perçus ou du compteur propre à une plateforme.',
        'Une ligne est créée par chaque saut de ligne collé. Un paragraphe exige une ligne vide entre deux blocs ; un retour simple augmente le nombre de lignes sans créer un nouveau paragraphe. Les phrases sont estimées à partir de groupes séparés par point, interrogation ou exclamation. Abréviations, initiales et points de suspension peuvent fausser cette approximation, qui sert à examiner la structure et non la grammaire.',
      ],
    },
    {
      heading: 'Comprendre le temps de lecture estimé',
      paragraphs: [
        'Le calcul utilise environ 200 mots non CJK par minute et 300 caractères CJK par minute, additionne les durées puis arrondit vers le haut. Dès qu’un texte existe, le minimum affiché est une minute. Cette référence aide à planifier un article ou une newsletter, mais la vitesse réelle dépend du lecteur, de la langue, de la difficulté, des tableaux et de l’objectif.',
        'N’allongez pas artificiellement un contenu pour atteindre une durée. Pour un texte technique, un script ou une présentation orale, chronométrez un échantillon lu dans les conditions réelles. Huit cents mots narratifs peuvent être parcourus plus vite que huit cents mots de procédure. La lecture silencieuse, la voix enregistrée et une intervention avec pauses ne partagent pas le même rythme.',
      ],
    },
    {
      heading: 'Devoirs, rédaction web et SEO',
      paragraphs: [
        'Pour un devoir, vérifiez quelles parties comptent : titre, citations, annexes et bibliographie peuvent être inclus ou exclus. Collez exactement le périmètre demandé et gardez le fichier original comme référence. Pour une candidature ou un formulaire, contrôlez ensuite la longueur dans le champ officiel, car sa validation peut compter autrement ou appliquer une limite de caractères.',
        'En rédaction web, le nombre de mots ne prouve ni qualité, ni profondeur, ni pertinence SEO. Utilisez le compteur pour repérer une introduction disproportionnée ou comparer des versions, puis vérifiez que chaque section répond à une question réelle, apporte un exemple utile et évite les répétitions. Une page plus longue mais vague n’est pas nécessairement plus visible ni plus utile.',
      ],
    },
    {
      heading: 'Confidentialité, copie et limites du navigateur',
      paragraphs: [
        'Le texte reste dans la mémoire de cet onglet et n’est pas transmis à FunnyTools pour produire les statistiques. Les services généraux de la page suivent la politique de confidentialité, mais le contenu du champ n’est pas ajouté aux événements de mesure. Retirez tout nom, adresse ou donnée confidentielle qui n’est pas indispensable au comptage.',
        'L’outil ne conserve ni brouillon, ni historique, ni fichier. Fermer ou recharger l’onglet peut effacer la saisie ; votre éditeur principal doit rester la copie de référence. Le bouton de copie ne prend que les chiffres. Pour un très long document, mesurez le bon périmètre puis confirmez dans le traitement de texte ou le système de remise qui fera foi.',
      ],
    },
  ],
  instructions: [
    'Collez exactement le contenu que vous souhaitez mesurer.',
    'Comparez mots, caractères, lignes, paragraphes et phrases avec la consigne cible.',
    'Contrôlez apostrophes, traits d’union, abréviations, retours et parties exclues.',
    'Traitez le temps de lecture comme une estimation et chronométrez si la durée compte.',
    'Copiez le résumé puis validez dans la plateforme officielle avant la remise.',
  ],
  examples: [
    'Vérifier un devoir soumis à une limite de mots.',
    'Comparer deux introductions sans modifier le document original.',
    'Estimer la lecture d’un article ou d’une newsletter.',
    'Contrôler lignes et paragraphes après un collage.',
    'Mesurer un brouillon multilingue avec accents, nombres et caractères CJK.',
  ],
  audience: [
    'Élèves, étudiants, enseignants, auteurs et éditeurs.',
    'Équipes de contenu qui suivent la longueur éditoriale.',
    'Personnes préparant candidature, script ou publication.',
    'Utilisateurs souhaitant mesurer du texte sans l’envoyer à un analyseur distant.',
  ],
  caseStudies: [
    { title: 'Dissertation de 1 000 mots', description: 'La consigne exclut bibliographie et page de garde. Seul le corps est collé, puis le fichier complet est vérifié dans l’espace de remise officiel.' },
    { title: 'Texte avec apostrophes et traits d’union', description: 'La phrase contient `aujourd’hui` et `socio-éducatif`. Le résultat est comparé au traitement de texte de l’éditeur, dont la convention peut différer.' },
    { title: 'Script lu à voix haute', description: 'L’estimation fournit un ordre de grandeur. La personne chronomètre ensuite une minute de lecture réelle et ajuste le script selon son débit et ses pauses.' },
  ],
  notes: [
    'Le comptage technique peut différer d’une règle académique ou éditoriale.',
    'Abréviations et points de suspension affectent l’estimation des phrases.',
    'Un paragraphe exige une ligne vide ; un retour simple ajoute seulement une ligne.',
    'Certains emoji et caractères combinés occupent plusieurs unités.',
    'Le temps de lecture est une estimation et non une durée garantie.',
  ],
  faq: [
    { q: 'Les mots accentués sont-ils reconnus ?', a: 'Oui. La règle utilise les lettres Unicode et reconnaît les mots français avec accents et ligatures courantes.' },
    { q: 'Les nombres comptent-ils comme des mots ?', a: 'Oui. Une suite numérique forme un token ; vérifiez si votre consigne applique un autre critère.' },
    { q: 'Pourquoi Word affiche-t-il un autre résultat ?', a: 'Chaque système traite différemment traits d’union, apostrophes, notes et champs. Pour une remise, la règle officielle fait foi.' },
    { q: 'Le temps de lecture est-il exact ?', a: 'Non. Il emploie une vitesse générale et un arrondi ; la complexité et le contexte changent la durée réelle.' },
    { q: 'Peut-on importer un DOCX ou un PDF ?', a: 'Non. Cette version analyse seulement ce qui est saisi ou collé dans la zone.' },
    { q: 'FunnyTools enregistre-t-il le texte ?', a: 'Non. L’analyse s’effectue dans l’onglet et aucun historique du contenu n’est conservé.' },
  ],
  labels: {
    input: 'Texte à compter',
    placeholder: 'Écrivez ou collez votre texte ici…',
    characters: 'Caractères avec espaces',
    charactersNoSpaces: 'Caractères sans espaces',
    words: 'Mots',
    lines: 'Lignes',
    paragraphs: 'Paragraphes',
    sentences: 'Phrases',
    readingTime: 'Lecture estimée',
    minutes: 'min',
    copyStats: 'Copier les statistiques',
    clear: 'Effacer',
    copied: 'Statistiques copiées',
    note: 'Règle : lettres et nombres Unicode forment des mots ; les idéogrammes CJK sont comptés un par un. Lecture estimée à environ 200 mots ou 300 caractères CJK par minute.',
  },
  privacyNote: 'Le texte est analysé dans la mémoire de cet onglet. FunnyTools ne le reçoit ni ne l’enregistre pour effectuer le comptage.',
  disclaimer: 'Les méthodes varient selon les règles et plateformes. Pour une remise officielle, confirmez le périmètre et validez le fichier dans le système cible.',
};

export const frenchWordCounterReview = {
  heading: 'Comment vérifier un comptage de mots',
  intro: 'Un chiffre n’est utile que s’il mesure le bon texte avec la même règle que l’école, l’éditeur ou la plateforme cible.',
  panels: [
    { title: 'Définir le périmètre', text: 'Précisez si titre, citations, notes, bibliographie, nombres et mots composés sont inclus.' },
    { title: 'Contrôler le collage', text: 'Vérifiez accents, retours, paragraphes et fragments absents avant de lire le résultat.' },
    { title: 'Valider à destination', text: 'Comparez avec le traitement de texte ou formulaire officiel lorsqu’une règle obligatoire existe.' },
  ],
  checklistHeading: 'Liste de contrôle',
  checklist: [
    'La zone contient tout et seulement le texte à mesurer.',
    'L’unité exigée est clairement identifiée.',
    'Les règles sur nombres, traits d’union et références sont documentées.',
    'La copie principale reste enregistrée hors de cet onglet.',
  ],
};

export const frenchCharacterCounter: ToolContent = {
  name: 'Compteur de caractères en ligne',
  short: 'Mesurez caractères avec ou sans espaces, octets UTF-8, mots et lignes, avec repères pour X, SMS et méta-description.',
  long: 'Collez une chaîne pour suivre sa longueur pendant la saisie. La page affiche les unités JavaScript avec et sans espaces, les octets encodés en UTF-8, les mots et les lignes. Elle compare aussi la longueur aux repères 280 pour une publication X habituelle et 160 pour un SMS ou une méta-description. Ces repères ne reproduisent pas les règles des plateformes : URL, emoji, Unicode, encodage et largeur visuelle peuvent modifier le résultat réel.',
  seoTitle: 'Compteur de caractères, espaces et octets UTF-8',
  seoDescription: 'Comptez caractères avec ou sans espaces, octets UTF-8, mots et lignes. Repères X, SMS et méta-description expliqués, calcul local.',
  keywords: [
    'compteur de caractères en ligne',
    'compter caractères avec espaces',
    'nombre de caractères sans espaces',
    'compteur octets UTF-8',
    'compteur caractères X',
    'longueur SMS caractères',
    'longueur méta-description',
  ],
  capabilities: [
    'Actualiser caractères, octets, mots et lignes pendant la saisie.',
    'Comparer la longueur avec et sans espaces blancs.',
    'Mesurer les octets produits par `TextEncoder` en UTF-8.',
    'Afficher les repères visuels 280 et 160.',
    'Copier un résumé pour une fiche SEO ou un test technique.',
  ],
  contentSections: [
    {
      heading: 'Réponse rapide : compter les caractères',
      paragraphs: [
        'Collez le texte puis lisez « Caractères avec espaces » ou « Caractères sans espaces » selon la règle à respecter. Les compteurs changent immédiatement et les repères deviennent rouges au-delà de 280 ou 160. « Octets UTF-8 » mesure autre chose : la taille de la chaîne une fois encodée. Ne confondez pas lettres visibles, unités internes, octets et règle d’une plateforme.',
        'Le navigateur utilise la longueur d’une chaîne JavaScript. Une lettre française précomposée occupe généralement une unité, mais de nombreux emoji et certaines séquences combinées en utilisent plusieurs. Le chiffre peut donc différer du nombre de symboles perçus et du calcul pondéré d’un réseau social. Servez-vous-en comme contrôle préalable puis testez la chaîne dans le champ réel.',
      ],
    },
    {
      heading: 'Avec espaces, sans espaces et symboles visibles',
      paragraphs: [
        'Un caractère n’est pas forcément une lettre. Le total inclut chiffres, ponctuation, emoji, tabulations et retours à la ligne. La variante sans espaces retire tous les caractères classés comme blancs par JavaScript, pas seulement la barre d’espace. Si une candidature exige une longueur espaces comprises, collez la version exacte qui sera envoyée sans normaliser les retours.',
        'Ce compteur ne fournit pas une colonne « lettres seulement » et ne segmente pas les graphèmes visibles. Un accent peut être enregistré comme une lettre précomposée ou comme une lettre suivie d’une marque combinée : le rendu paraît identique mais la longueur interne diffère. Pour une base, une API ou un CMS, documentez si la limite concerne unités UTF-16, points de code, graphèmes ou octets.',
      ],
      items: [
        'Avec espaces inclut espaces, tabulations et retours à la ligne.',
        'Sans espaces retire les caractères considérés comme blancs.',
        'Ponctuation, chiffres et emoji restent dans le total.',
        'Un symbole visible peut occuper plusieurs unités internes.',
      ],
    },
    {
      heading: 'Ce que mesure le nombre d’octets UTF-8',
      paragraphs: [
        '`TextEncoder` convertit la chaîne en UTF-8 puis compte les octets. Les caractères ASCII occupent souvent un octet ; les accents, alphabets non latins et emoji peuvent en demander davantage. Deux chaînes de même longueur en caractères peuvent donc avoir des tailles différentes. Cette mesure aide pour un payload, une importation ou un champ dont la limite est réellement exprimée en octets.',
        'Ne supposez pas qu’un `varchar(160)` vaut 160 octets ou qu’une API emploie UTF-8 : cela dépend du système. Le chiffre n’inclut pas les noms de champs, guillemets, échappements ou structure JSON ajoutés autour de la valeur. Testez accents, emoji, retours et cas maximal dans le service qui stockera ou transmettra les données.',
      ],
    },
    {
      heading: 'X et SMS : des limites qui dépendent du service',
      paragraphs: [
        'Le repère 280 correspond à une publication X habituelle, mais X applique ses propres règles aux URL et à certains caractères, et peut proposer des formats plus longs selon le compte ou la fonction. Cette page ne se connecte pas à X et ne connaît pas votre formule. Un résultat inférieur à 280 ne garantit donc pas que le contenu sera accepté tel quel.',
        'Un SMS en GSM-7 peut contenir jusqu’à 160 caractères sur un segment simple, tandis que certains accents, symboles ou emoji déclenchent Unicode et réduisent souvent la capacité autour de 70 unités. Les messages concaténés réservent encore des caractères techniques. Le repère 160 ne détecte ni l’alphabet, ni les segments, ni le prix : contrôlez la campagne chez votre opérateur.',
      ],
    },
    {
      heading: 'Méta-description : 160 reste un repère éditorial',
      paragraphs: [
        'Google ne fixe pas une limite absolue de 160 caractères pour la méta-description. L’extrait peut venir de cette balise ou du contenu visible selon la requête, puis être tronqué selon l’appareil et la présentation. L’indicateur aide à rédiger une synthèse compacte, sans garantir que le moteur l’utilisera ou l’affichera intégralement.',
        'Rédigez une description unique qui explique la valeur de la page plutôt que d’empiler des mots-clés. La largeur des lettres, le nom du site, une date ou d’autres éléments affectent aussi l’extrait. Après publication, vérifiez le HTML, l’indexation et les requêtes réelles dans Search Console plutôt que de traiter 160 comme une norme technique.',
      ],
    },
    {
      heading: 'Confidentialité, copie et validation finale',
      paragraphs: [
        'Le texte est mesuré dans cet onglet et n’est pas envoyé à FunnyTools pour calculer longueur ou octets. Les services généraux suivent la politique de confidentialité, mais le contenu du champ n’est pas inclus dans les événements analytiques. Supprimez les données personnelles inutiles et travaillez sur une copie lorsque la chaîne appartient à un client ou à un système.',
        'Le bouton copie seulement le résumé chiffré. Dans une fiche SEO ou une anomalie technique, ajoutez la version, l’encodage et la plateforme testée. Enfin, collez le texte dans le champ cible : seul ce service peut confirmer troncature, normalisation, comptage pondéré, segmentation SMS et taille du payload complet.',
      ],
    },
  ],
  instructions: [
    'Collez exactement la chaîne qui sera publiée, envoyée ou stockée.',
    'Choisissez l’unité pertinente : espaces compris, sans espaces, octets, mots ou lignes.',
    'Repérez emoji, accents, retours et caractères combinés qui changent le calcul.',
    'Traitez 280 et 160 comme des repères et consultez la règle du service.',
    'Copiez les statistiques puis testez la même chaîne à destination.',
  ],
  examples: [
    'Raccourcir un brouillon X avant d’ouvrir le compositeur.',
    'Comparer un SMS ASCII et une version avec emoji.',
    'Réviser une méta-description sans supposer une limite fixe.',
    'Mesurer les octets UTF-8 avant une importation.',
    'Joindre un résumé de longueur à un ticket de validation.',
  ],
  audience: [
    'Rédacteurs, équipes SEO et responsables de campagnes.',
    'Développeurs et QA contrôlant champs, API ou imports.',
    'Personnes qui travaillent avec accents, emoji et textes multilingues.',
    'Utilisateurs souhaitant mesurer une chaîne sans l’envoyer à un service distant.',
  ],
  caseStudies: [
    { title: 'Brouillon pour X', description: 'Le texte reste sous 280 dans l’outil. Il est tout de même essayé dans X, car URL, compte et pondération peuvent modifier le résultat final.' },
    { title: 'SMS contenant un emoji', description: 'Le message est inférieur à 160 unités, mais l’opérateur détecte Unicode et calcule plusieurs segments. Encodage et coût sont vérifiés avant l’envoi.' },
    { title: 'Champ limité en octets', description: 'Deux chaînes ont la même longueur visible, mais la version accentuée avec emoji occupe plus d’octets. Le payload complet est testé dans l’API.' },
  ],
  notes: [
    'La longueur de chaîne n’équivaut pas toujours aux symboles visibles.',
    'Le repère X ne reproduit ni URL, ni compte, ni fonction premium.',
    'Le repère SMS ne détecte pas GSM-7, Unicode, segments ou coût.',
    'Google ne fixe pas 160 comme limite absolue de méta-description.',
    'Les octets concernent la chaîne UTF-8 et non le fichier ou payload complet.',
  ],
  faq: [
    { q: 'Les espaces comptent-ils comme caractères ?', a: 'Oui dans le total avec espaces. La deuxième valeur retire tous les caractères blancs pour comparer les deux règles.' },
    { q: 'Pourquoi un emoji peut-il compter plusieurs unités ?', a: 'JavaScript représente de nombreux emoji avec plusieurs unités UTF-16 ; une séquence visible peut aussi combiner plusieurs points de code.' },
    { q: 'Moins de 280 garantit-il une publication sur X ?', a: 'Non. X applique ses règles aux URL, caractères, comptes et fonctions. Le repère sert seulement de précontrôle.' },
    { q: 'Un SMS accepte-t-il toujours 160 caractères ?', a: 'Non. GSM-7 permet souvent 160, mais Unicode réduit la capacité et les messages longs réservent de la place pour la concaténation.' },
    { q: 'Google limite-t-il la méta-description à 160 caractères ?', a: 'Non. L’extrait peut être tronqué ou réécrit selon la requête et l’appareil ; 160 est un repère éditorial.' },
    { q: 'Le texte est-il envoyé à FunnyTools ?', a: 'Non. Longueur et octets sont calculés dans la mémoire de cet onglet.' },
  ],
  labels: {
    input: 'Texte à mesurer',
    placeholder: 'Écrivez ou collez votre texte ici…',
    characters: 'Caractères avec espaces',
    charactersNoSpaces: 'Caractères sans espaces',
    bytes: 'Octets UTF-8',
    words: 'Mots',
    lines: 'Lignes',
    limits: 'Repères rapides',
    twitter: 'Publication X habituelle',
    sms: 'SMS de référence',
    meta: 'Méta-description de référence',
    copyStats: 'Copier les statistiques',
    clear: 'Effacer',
    copied: 'Statistiques copiées',
    note: 'Les repères 280 et 160 ne reproduisent pas les règles de X, des SMS ou de Google. Vérifiez le texte sur la plateforme cible.',
  },
  privacyNote: 'La chaîne et ses statistiques restent dans cet onglet. FunnyTools ne reçoit pas le texte pour compter caractères ou octets.',
  disclaimer: 'Chaque service compte caractères, URL, emoji, octets et segments selon ses propres règles. Utilisez ces chiffres comme précontrôle puis validez à destination.',
};

export const frenchCharacterCounterReview = {
  heading: 'Comment vérifier une longueur de texte',
  intro: 'L’erreur courante consiste à comparer des unités différentes : symboles visibles, UTF-16, octets, segments SMS ou règles de plateforme.',
  panels: [
    { title: 'Identifier l’unité', text: 'Confirmez si la contrainte porte sur caractères, octets, espaces, mots ou segments.' },
    { title: 'Tester des cas réels', text: 'Incluez accents, emoji, URL, retours et la chaîne la plus longue attendue.' },
    { title: 'Valider à destination', text: 'Essayez le même texte dans X, le fournisseur SMS, le CMS, l’API ou la base.' },
  ],
  checklistHeading: 'Liste de contrôle',
  checklist: [
    'La chaîne testée correspond à la version finale.',
    'L’unité et l’encodage de la limite sont documentés.',
    'Les repères 280 et 160 ne sont pas traités comme des garanties.',
    'La validation finale a été faite sur la plateforme concernée.',
  ],
};
