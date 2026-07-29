import type { ToolContent } from '../tools/_types';

export const frenchCsvToJson: ToolContent = {
  name: 'Convertir un CSV en JSON',
  short: 'Transformez un tableau délimité en tableau d’objets JSON, avec détection de la virgule, du point-virgule, de la tabulation ou de la barre verticale.',
  long: 'Collez des données dont la première ligne contient les en-têtes, puis contrôlez le séparateur et la conversion des types. Le parseur respecte les champs entre guillemets, les guillemets doublés et les retours à la ligne contenus dans une cellule. Les valeurs restent du texte par défaut afin de préserver codes postaux, références, téléphones et zéros initiaux. Tout s’exécute dans cet onglet, avant copie ou téléchargement du JSON indenté.',
  seoTitle: 'Convertir CSV en JSON en ligne, séparateur français',
  seoDescription: 'Convertissez CSV ou TSV en JSON dans le navigateur. Point-virgule Excel, champs entre guillemets, UTF-8, types et zéros initiaux expliqués.',
  keywords: [
    'convertir CSV en JSON',
    'convertisseur CSV JSON en ligne',
    'CSV point-virgule vers JSON',
    'tableau Excel en JSON',
    'TSV en JSON',
    'CSV UTF-8 JSON',
    'transformer fichier CSV en array JSON',
  ],
  capabilities: [
    'Utiliser la première ligne comme noms de propriétés JSON.',
    'Détecter virgule, point-virgule, tabulation ou barre verticale.',
    'Conserver séparateurs et retours à la ligne placés dans des champs correctement cités.',
    'Garder les cellules sous forme de chaînes ou activer nombres et booléens.',
    'Afficher le nombre de lignes, de colonnes et le séparateur retenu.',
  ],
  contentSections: [
    {
      heading: 'Réponse rapide : passer d’un CSV à un tableau JSON',
      paragraphs: [
        'Copiez une table comprenant une ligne d’en-têtes, collez-la dans le champ puis choisissez « Détection automatique » ou le séparateur connu. Après « Convertir en JSON », chaque ligne de données devient un objet et chaque en-tête devient une clé. Ainsi, `nom;ville` puis `Léa;Nantes` produit un tableau contenant un objet avec les propriétés `nom` et `ville`. La sortie est indentée pour être relue avant copie ou téléchargement.',
        'En France, un export de tableur utilise souvent le point-virgule parce que la virgule sert de séparateur décimal. Cette habitude dépend toutefois du logiciel et de ses réglages régionaux : ne la supposez pas. Vérifiez le résumé affiché par l’outil. Si la source compte cinq colonnes et que le résultat n’en annonce qu’une, le délimiteur est probablement incorrect ou les guillemets sont déséquilibrés.',
      ],
    },
    {
      heading: 'En-têtes, lignes et structure obtenue',
      paragraphs: [
        'La première ligne définit les noms de propriétés. Des en-têtes comme `id_client;nom;actif` doivent être uniques, stables et conformes au contrat du système cible. Les espaces, accents et différences de casse sont autorisés en JSON, mais peuvent être gênants pour une API ou un langage de programmation. Corrigez les noms dans la source plutôt que de deviner une convention après la conversion.',
        'La sortie est un tableau d’objets plats. Un en-tête `adresse.ville` reste une clé littérale ; il ne crée pas automatiquement un objet `adresse`. Une cellule vide devient une chaîne vide et une ligne entièrement vide est ignorée. Le convertisseur ne connaît ni relations entre tables, ni clé primaire, ni valeur obligatoire. Ces décisions relèvent du schéma métier et doivent être validées séparément.',
      ],
      items: [
        'Une ligne d’en-têtes est nécessaire.',
        'Chaque ligne suivante produit un objet JSON plat.',
        'Les lignes vides sont omises, les cellules vides restent des chaînes vides.',
        'Le JSON syntaxiquement valide ne garantit pas le respect d’un schéma.',
      ],
    },
    {
      heading: 'Virgule ou point-virgule dans un CSV français',
      paragraphs: [
        'Le mot CSV signifie historiquement « valeurs séparées par des virgules », mais les fichiers réels emploient aussi point-virgule, tabulation ou `|`. Avec une virgule décimale, `12,50`, le point-virgule évite une ambiguïté fréquente. Un fichier copié depuis Excel peut donc commencer par `produit;prix` alors qu’un export destiné à une API utilise `produit,prix`. Le sélecteur permet d’imposer le contrat documenté.',
        'Ne remplacez pas toutes les virgules par des points-virgules. Une description, une adresse ou un nombre peut contenir une virgule légitime. Le format CSV protège ce contenu avec des guillemets. La bonne vérification consiste à comparer lignes et colonnes, puis à inspecter des cellules contenant ponctuation, accents et retours à la ligne. Une détection automatique sur deux lignes très courtes reste forcément moins fiable qu’un séparateur explicitement connu.',
      ],
    },
    {
      heading: 'Guillemets, séparateurs et retours à la ligne',
      paragraphs: [
        'Un champ entouré de guillemets doubles peut contenir le séparateur. Dans un fichier à virgules, `"Paris, France"` représente une seule cellule. Un guillemet littéral est doublé : `"Elle a dit ""bonjour"""`. Un retour à la ligne peut également rester dans la cellule tant que les guillemets sont correctement ouverts et fermés. Le parseur applique ces règles ; un simple découpage avec `split(",")` ne le ferait pas.',
        'Des guillemets non fermés peuvent absorber plusieurs lignes ou déclencher une erreur. L’outil refuse alors de présenter une sortie partielle comme fiable. Repérez la ligne signalée, comparez-la avec l’application qui a exporté le fichier et contrôlez le caractère de citation. N’effacez pas les guillemets au hasard : ils protègent souvent exactement les données qui contiennent un séparateur ou un saut de ligne.',
      ],
    },
    {
      heading: 'Préserver les zéros initiaux et choisir les types',
      paragraphs: [
        'Par défaut, chaque cellule reste une chaîne. Ce choix préserve `00175`, un numéro de dossier, un code INSEE, un téléphone commençant par zéro ou un identifiant de vingt chiffres. Dans un CSV, ces formes sont du texte ; leur apparence ne suffit pas à dire qu’il s’agit de quantités calculables. Une conversion automatique en nombre peut enlever des zéros ou perdre de la précision.',
        'L’option « Déduire nombres et booléens » peut être utile pour un petit jeu de test maîtrisé. Elle transforme certaines représentations en types JSON natifs. Relisez alors décimales, notation scientifique, `true`, `false`, dates et grands entiers. La virgule décimale française n’est pas automatiquement un nombre JavaScript : `12,5` peut rester du texte. Une transformation financière ou métier doit appliquer une règle explicite par colonne.',
      ],
    },
    {
      heading: 'UTF-8, accents, BOM et données déjà corrompues',
      paragraphs: [
        'Le champ du navigateur manipule du texte Unicode. Des valeurs comme `Élodie`, `cœur`, `Noël` ou un emoji sont conservées si la source a été correctement décodée. Si vous voyez déjà `FranÃ§ais` avant de coller, le problème vient généralement d’une ouverture UTF-8 comme Windows-1252, ou inversement. La conversion vers JSON ne peut pas reconstruire avec certitude les octets d’origine.',
        'Certains exports ajoutent un BOM au début du fichier pour aider Excel à reconnaître UTF-8. Contrôlez que la première clé ne contient pas de caractère invisible. Le JSON téléchargé est créé en UTF-8, mais il ne conserve ni feuille, ni formule, ni couleur, ni format de cellule du classeur. Pour un fichier XLSX, exportez d’abord la feuille voulue en CSV et conservez le classeur comme référence.',
      ],
    },
    {
      heading: 'Contrôler le JSON avant une API ou une migration',
      paragraphs: [
        'Commencez par une petite tranche représentative : première ligne, dernière ligne, cellule vide, accent, séparateur dans un texte, guillemet, saut de ligne et identifiant avec zéro initial. Comparez le nombre d’objets avec le nombre de lignes attendu. Vérifiez également la casse de chaque clé et le type des valeurs. Un JSON valide peut encore être refusé pour propriété manquante, date mal formée ou valeur hors liste.',
        'N’envoyez pas directement des milliers d’objets en production. Testez le schéma, les règles d’unicité et les erreurs avec des données fictives ou un environnement de recette. Gardez un lien entre numéro de ligne source et réponse de l’API. FunnyTools ne contacte aucun endpoint et ne valide pas les droits d’accès, les contraintes de base de données, les enums ni les relations entre enregistrements.',
      ],
    },
    {
      heading: 'Traitement local, confidentialité et limites',
      paragraphs: [
        'Le CSV est analysé en mémoire dans cet onglet ; FunnyTools ne reçoit ni le tableau ni le JSON. Cela évite un téléversement vers le serveur du site, mais ne neutralise pas le presse-papiers, les extensions, la synchronisation du navigateur ou les règles de votre poste. Utilisez des données anonymisées pour une démonstration et respectez les procédures internes pour toute donnée personnelle ou réglementée.',
        'La page ne propose pas de traitement en flux ni de promesse de taille maximale. Un fichier très volumineux peut saturer la mémoire, surtout sur mobile. Pour plusieurs millions de lignes, utilisez un pipeline contrôlé avec journal d’erreurs et validation de schéma. Cet outil convient à l’inspection, aux fixtures et aux petits lots ; il ne remplace pas un processus ETL audité.',
      ],
    },
  ],
  instructions: [
    'Exportez ou copiez une table dont les en-têtes sont uniques.',
    'Collez une copie sans secret et choisissez le séparateur réel.',
    'Laissez les types en texte si des identifiants ou zéros initiaux doivent être préservés.',
    'Comparez lignes, colonnes, accents, guillemets et valeurs particulières.',
    'Validez le JSON contre le schéma du système cible avant import.',
  ],
  examples: [
    'Transformer un export Excel français au point-virgule en objets JSON.',
    'Préparer une fixture d’API avec des codes postaux conservés comme chaînes.',
    'Convertir un TSV copié depuis un tableur.',
    'Vérifier une description contenant virgule et retour à la ligne.',
    'Comparer le total des lignes avant une petite migration.',
  ],
  audience: [
    'Développeurs et équipes QA préparant des données de test.',
    'Analystes contrôlant un export avant transformation.',
    'Support technique diagnostiquant séparateur et encodage.',
    'Étudiants découvrant la différence entre table et objets JSON.',
  ],
  caseStudies: [
    { title: 'Export Excel avec virgule décimale', description: 'Le fichier utilise `produit;prix` et contient `12,50`. Le point-virgule est imposé, puis le prix reste du texte jusqu’à l’application d’une règle décimale documentée.' },
    { title: 'Référence commençant par zéro', description: 'La valeur `00128` identifie une agence. La déduction des types reste désactivée afin d’obtenir `"00128"` et non `128`.' },
    { title: 'Commentaire sur plusieurs lignes', description: 'Une cellule citée contient deux paragraphes. Le parseur la conserve dans une seule propriété et le comptage confirme qu’aucun faux enregistrement n’a été créé.' },
  ],
  notes: [
    'La première ligne devient les clés des objets.',
    'La détection couvre virgule, point-virgule, tabulation et barre verticale.',
    'Les types restent du texte par défaut.',
    'Les structures imbriquées ne sont pas inventées.',
    'Validez toujours le schéma et le nombre de lignes.',
  ],
  faq: [
    { q: 'Le convertisseur accepte-t-il un CSV au point-virgule ?', a: 'Oui. Choisissez le point-virgule ou laissez la détection automatique, puis vérifiez le séparateur et le nombre de colonnes dans le résumé.' },
    { q: 'Les champs contenant une virgule sont-ils préservés ?', a: 'Oui, s’ils sont correctement entourés de guillemets doubles dans un fichier dont le séparateur est la virgule.' },
    { q: 'Pourquoi `0012` devient-il parfois `12` ?', a: 'Cela peut arriver lorsque la déduction des types est activée. Laissez-la désactivée pour les codes, téléphones et identifiants.' },
    { q: 'Puis-je coller directement un fichier XLSX ?', a: 'Non. Exportez la feuille en CSV ou copiez une plage tabulaire, puis contrôlez le séparateur et l’encodage.' },
    { q: 'Les clés avec un point créent-elles un objet imbriqué ?', a: 'Non. Elles restent littérales. Une structure imbriquée nécessite une règle de transformation explicite.' },
    { q: 'Le CSV est-il envoyé à un serveur ?', a: 'Non. Le parseur travaille dans cet onglet. Les règles de sécurité de votre appareil restent toutefois applicables.' },
  ],
  labels: {
    mode: 'csv-to-json',
    input: 'Données CSV ou délimitées',
    output: 'Résultat JSON',
    placeholder: 'id;nom;ville\n001;Léa;Nantes\n002;Yanis;"Paris, France"',
    convert: 'Convertir en JSON',
    copy: 'Copier le JSON',
    download: 'Télécharger le JSON',
    clear: 'Effacer',
    delimiterLabel: 'Séparateur d’entrée',
    delimiterAuto: 'Détection automatique',
    delimiterComma: 'Virgule (,)',
    delimiterSemicolon: 'Point-virgule (;)',
    delimiterTab: 'Tabulation',
    delimiterPipe: 'Barre verticale (|)',
    dynamicTypingLabel: 'Déduire nombres et booléens',
    emptyInput: 'Collez des données CSV avant la conversion.',
    csvInvalid: 'La structure CSV contient une erreur',
    row: 'ligne',
    summaryRows: 'Lignes de données',
    summaryColumns: 'Colonnes',
    summaryDelimiter: 'Séparateur',
    fileName: 'donnees-converties.json',
  },
  privacyNote: 'Le CSV est analysé dans cet onglet et n’est pas envoyé à FunnyTools. Évitez les données sensibles sur un appareil non autorisé.',
  disclaimer: 'Contrôlez en-têtes, lignes, types, encodage et schéma avant tout import. Le convertisseur ne connaît pas les règles du système cible.',
};

export const frenchCsvToJsonReview = {
  heading: 'Vérifier une conversion CSV vers JSON',
  intro: 'Une sortie syntaxiquement correcte peut encore masquer un mauvais séparateur, une clé inattendue ou un type contraire au métier.',
  panels: [
    { title: 'Compter la table', text: 'Comparez lignes et colonnes avec la source et confirmez le séparateur affiché.' },
    { title: 'Préserver les codes', text: 'Gardez les types en texte pour les références, téléphones et zéros initiaux.' },
    { title: 'Tester le contrat', text: 'Validez propriétés, types et champs obligatoires contre le vrai schéma.' },
  ],
  checklistHeading: 'Points à contrôler',
  checklist: [
    'Les en-têtes sont uniques et respectent la casse attendue.',
    'Une cellule avec séparateur, guillemet ou retour à la ligne reste intacte.',
    'Accents, emoji et zéros initiaux sont préservés.',
    'Le nombre d’objets correspond aux lignes à importer.',
  ],
};

export const frenchJsonToCsv: ToolContent = {
  name: 'Convertir un tableau JSON en CSV',
  short: 'Transformez un tableau d’objets plats en CSV, choisissez le séparateur et préparez un fichier UTF-8 lisible dans Excel ou un autre système.',
  long: 'Collez un tableau JSON valide. L’outil réunit les clés de tous les objets, échappe séparateurs, guillemets et retours à la ligne, puis produit un tableau délimité. La protection des cellules ressemblant à des formules et le BOM UTF-8 sont activés pour réduire deux erreurs courantes lors d’une ouverture directe dans un tableur. Les objets imbriqués sont refusés afin de ne pas créer une représentation ambiguë.',
  seoTitle: 'Convertir JSON en CSV pour Excel et UTF-8',
  seoDescription: 'Passez un tableau JSON en CSV avec virgule ou point-virgule, toutes les colonnes, protection des formules et téléchargement UTF-8 avec BOM.',
  keywords: [
    'convertir JSON en CSV',
    'convertisseur JSON CSV en ligne',
    'JSON vers Excel CSV',
    'tableau objets JSON en CSV',
    'CSV point-virgule UTF-8',
    'exporter JSON en fichier CSV',
    'JSON CSV protection formule',
  ],
  capabilities: [
    'Accepter un tableau non vide d’objets JSON plats.',
    'Réunir toutes les clés, y compris celles absentes du premier objet.',
    'Générer un CSV à virgule, point-virgule, tabulation ou barre verticale.',
    'Échapper automatiquement séparateurs, guillemets et retours à la ligne.',
    'Protéger les cellules ressemblant à des formules et ajouter un BOM au téléchargement.',
  ],
  contentSections: [
    {
      heading: 'Réponse rapide : transformer un tableau JSON en CSV',
      paragraphs: [
        'Collez un tableau comme `[{"id":"001","nom":"Léa"},{"id":"002","nom":"Yanis"}]`, choisissez le séparateur puis cliquez sur « Convertir en CSV ». La première ligne devient l’en-tête `id,nom` ou `id;nom`, et chaque objet produit une ligne. Le résumé indique le nombre de lignes et de colonnes. Relisez la sortie avant de la télécharger et importez d’abord quelques lignes dans l’application cible.',
        'La racine doit être un tableau d’objets plats. Un objet unique, un tableau de nombres ou un objet contenant une adresse imbriquée est refusé. Cette contrainte évite d’écrire `[object Object]` ou une sérialisation arbitraire dans une cellule. Pour des données hiérarchiques, définissez d’abord une règle d’aplatissement, par exemple `adresse_ville`, et documentez la reconstruction éventuelle.',
      ],
    },
    {
      heading: 'Colonnes issues de toutes les clés JSON',
      paragraphs: [
        'Tous les objets JSON ne sont pas obligés d’avoir les mêmes propriétés. Un CSV, lui, doit former une table rectangulaire. FunnyTools construit donc l’union des clés selon leur première apparition. Si la première ligne possède `id` et `nom`, puis que la troisième ajoute `pays`, la colonne `pays` est tout de même créée. Les lignes où elle manque reçoivent une cellule vide.',
        'Cette cellule vide ne permet plus de distinguer une propriété absente, `null` et parfois une chaîne vide. De même, le CSV ne conserve pas un type natif pour nombre, booléen ou texte. Le sens doit être rétabli lors de l’import. Avant conversion, choisissez une liste de colonnes attendues, la signification du vide et les formats de date ou de décimale acceptés.',
      ],
      items: [
        'La racine JSON doit être un tableau.',
        'Chaque élément doit être un objet plat.',
        'Les clés de tous les objets participent à l’en-tête.',
        'Le format CSV ne conserve pas le schéma JSON.',
      ],
    },
    {
      heading: 'Choisir virgule, point-virgule, tabulation ou barre verticale',
      paragraphs: [
        'La virgule est fréquente dans les échanges techniques, mais Excel configuré en français ouvre souvent plus naturellement un CSV au point-virgule, notamment lorsque les nombres utilisent la virgule décimale. La tabulation convient à un TSV et la barre verticale à certains exports techniques. Le bon choix est celui attendu par l’importateur, pas simplement celui qui paraît lisible dans le navigateur.',
        'Si une valeur contient le séparateur, Papa Parse l’entoure de guillemets doubles. Un guillemet interne est doublé et un retour à la ligne reste dans la cellule citée. Il n’est donc pas nécessaire de supprimer la ponctuation. Testez une valeur comme `Lyon, France`, une citation et un commentaire multiligne, puis ouvrez le fichier via la commande d’import du tableur plutôt que par un double clic si vous devez imposer séparateur et types.',
      ],
    },
    {
      heading: 'UTF-8, BOM et ouverture dans Excel',
      paragraphs: [
        'Le téléchargement utilise UTF-8 afin de conserver accents, ligatures et caractères non latins. Un BOM UTF-8 est ajouté par défaut. Cette marque invisible aide certaines versions d’Excel à reconnaître l’encodage lors de l’ouverture directe. Elle ne change pas les cellules visibles, mais certains outils en ligne de commande ou protocoles stricts n’en veulent pas. Désactivez-la lorsque le contrat exige un UTF-8 sans BOM.',
        'Le BOM ne choisit ni séparateur, ni format de date, ni type de colonne. Excel peut encore interpréter `03-04` comme une date, `1E10` comme une notation scientifique ou un identifiant long comme un nombre arrondi. Utilisez l’assistant d’import et forcez les colonnes sensibles en texte. Comparez une réouverture avec le JSON d’origine, en particulier pour les zéros initiaux et les nombres dépassant quinze chiffres.',
      ],
    },
    {
      heading: 'Limiter le risque de formule dans un tableur',
      paragraphs: [
        'Une cellule commençant par `=`, `+`, `-`, `@`, une tabulation ou un retour chariot peut être interprétée comme une formule par certains tableurs. Si ces valeurs viennent d’un formulaire ou d’un tiers, leur ouverture peut déclencher un calcul, un lien ou une fonction inattendue. L’option de protection demande au sérialiseur de préfixer ces valeurs afin qu’elles soient lues comme du texte.',
        'Cette protection modifie la représentation du contenu et n’est donc pas universellement souhaitable. Une API ou un importeur peut vouloir la valeur exacte sans apostrophe de sécurité. Décidez selon le lecteur final, documentez la transformation et conservez les données sources. Ne considérez pas un CSV comme sûr simplement parce qu’il ne contient pas de macro : la manière dont le tableur interprète les cellules compte également.',
      ],
    },
    {
      heading: 'Objets imbriqués, tableaux et aplatissement',
      paragraphs: [
        'Un objet `{"client":{"ville":"Lille"}}` ou une propriété contenant plusieurs produits n’a pas de conversion tabulaire unique. On pourrait créer `client.ville`, sérialiser le sous-objet en JSON, répéter une ligne par produit ou utiliser une seconde table. Chacune de ces options exprime une règle métier différente. Le widget refuse donc objets et tableaux imbriqués au lieu de choisir silencieusement.',
        'Aplatissez les données en amont avec un mapping testé. Évitez les collisions entre une vraie clé `client.ville` et une clé créée par aplatissement. Pour une relation un-à-plusieurs, préférez souvent deux fichiers reliés par un identifiant stable. Vérifiez que l’opération inverse est définie si le CSV doit ensuite reconstruire le JSON original.',
      ],
    },
    {
      heading: 'Dates, décimales, booléens et identifiants',
      paragraphs: [
        'Dans le CSV produit, toutes les cellules sont du texte délimité. Le tableur peut néanmoins réinterpréter `2026-07-30`, `12.50`, `true` ou `00123`. En contexte français, l’affichage d’une décimale peut attendre `12,50`, mais remplacer un point par une virgule relève d’une règle de données, pas du séparateur CSV. FunnyTools ne localise pas automatiquement les valeurs.',
        'Définissez pour chaque colonne un format d’échange : date ISO, décimale avec point, booléen `true/false`, identifiant textuel. Si le destinataire exige une virgule décimale, appliquez une transformation explicite avant l’export et testez-la. Pour les montants, évitez les arrondis implicites et conservez la précision attendue. Pour les identifiants, importez toujours comme texte.',
      ],
    },
    {
      heading: 'Confidentialité, validation et limites du fichier',
      paragraphs: [
        'Le JSON est parsé et le fichier est créé localement dans cet onglet. FunnyTools ne reçoit pas le contenu. Le téléchargement passe toutefois par le système de fichiers et le presse-papiers peut conserver une copie. N’utilisez pas de données de production sur un appareil ou navigateur non approuvé. Préférez un échantillon anonymisé pour tester la forme.',
        'Le convertisseur n’effectue ni validation métier, ni déduplication, ni import réel. Un très grand tableau peut consommer beaucoup de mémoire. Pour un export critique, utilisez une tâche automatisée avec schéma, tests, journal et contrôle d’intégrité. Ici, comparez au minimum nombre de lignes, liste de colonnes, premières et dernières valeurs, caractères accentués, cellules protégées et résultat dans l’application cible.',
      ],
    },
  ],
  instructions: [
    'Validez le JSON et conservez une copie de la source.',
    'Vérifiez que chaque élément est un objet plat.',
    'Choisissez le séparateur, le BOM et la protection des formules selon le lecteur final.',
    'Contrôlez colonnes tardives, cellules vides, accents et identifiants.',
    'Importez une petite tranche en imposant les types avant le lot complet.',
  ],
  examples: [
    'Ouvrir un petit catalogue JSON dans Excel avec un CSV au point-virgule.',
    'Exporter des fixtures de test vers un format tabulaire lisible.',
    'Préserver les identifiants `001`, `002` comme texte.',
    'Bloquer une valeur de formulaire qui ressemble à une formule.',
    'Repérer un objet imbriqué qui exige une règle d’aplatissement.',
  ],
  audience: [
    'Développeurs exportant une réponse JSON pour contrôle.',
    'Analystes souhaitant inspecter des objets dans un tableur.',
    'Équipes QA préparant des jeux de données reproductibles.',
    'Support technique vérifiant encodage, colonnes et valeurs.',
  ],
  caseStudies: [
    { title: 'Colonne présente seulement à la fin', description: 'La propriété `pays` apparaît dans le dernier objet. L’union des clés l’ajoute à l’en-tête et les lignes précédentes restent vides dans cette colonne.' },
    { title: 'Ouverture dans Excel français', description: 'Le point-virgule et le BOM sont conservés. L’assistant d’import force les références en texte avant de charger le fichier complet.' },
    { title: 'Valeur ressemblant à une formule', description: 'Un commentaire commence par `=HYPERLINK`. La protection est laissée active pour la revue dans un tableur, puis le choix est documenté pour l’import final.' },
  ],
  notes: [
    'Toutes les clés rencontrées deviennent des colonnes.',
    'Objets et tableaux imbriqués sont refusés.',
    'Le BOM UTF-8 est optionnel et activé au téléchargement.',
    'La protection des formules dépend du lecteur final.',
    'Le CSV ne conserve ni types JSON ni schéma.',
  ],
  faq: [
    { q: 'Le convertisseur accepte-t-il un objet JSON unique ?', a: 'Non. Entourez les objets destinés à devenir des lignes dans un tableau JSON et vérifiez que chaque élément est plat.' },
    { q: 'Une propriété absente du premier objet est-elle perdue ?', a: 'Non. L’outil réunit les clés de tous les objets pour construire l’en-tête complet.' },
    { q: 'Quel séparateur choisir pour Excel en français ?', a: 'Le point-virgule est fréquent, mais cela dépend des paramètres. Utilisez l’assistant d’import et confirmez le séparateur attendu.' },
    { q: 'À quoi sert la protection des formules ?', a: 'Elle préfixe les valeurs qu’un tableur pourrait interpréter comme formule. Elle modifie le texte, donc décidez selon le système cible.' },
    { q: 'Pourquoi ajouter un BOM UTF-8 ?', a: 'Il aide certaines versions d’Excel à reconnaître les accents en UTF-8. Un parseur technique strict peut au contraire demander de le retirer.' },
    { q: 'Les objets imbriqués sont-ils convertis ?', a: 'Non. Ils sont refusés, car plusieurs stratégies d’aplatissement sont possibles et doivent être définies par votre projet.' },
  ],
  labels: {
    mode: 'json-to-csv',
    input: 'Tableau JSON',
    output: 'Résultat CSV',
    placeholder: '[\n  {"id":"001","nom":"Léa","ville":"Nantes"},\n  {"id":"002","nom":"Yanis","ville":"Lille"}\n]',
    convert: 'Convertir en CSV',
    copy: 'Copier le CSV',
    download: 'Télécharger le CSV',
    clear: 'Effacer',
    delimiterLabel: 'Séparateur de sortie',
    delimiterAuto: 'Virgule par défaut',
    delimiterComma: 'Virgule (,)',
    delimiterSemicolon: 'Point-virgule (;)',
    delimiterTab: 'Tabulation',
    delimiterPipe: 'Barre verticale (|)',
    escapeFormulaeLabel: 'Protéger les cellules ressemblant à des formules',
    bomLabel: 'Ajouter un BOM UTF-8 au téléchargement',
    emptyInput: 'Collez un tableau JSON avant la conversion.',
    invalidJson: 'Le texte n’est pas un JSON valide.',
    arrayRequired: 'La racine doit être un tableau non vide d’objets JSON.',
    flatObjectsOnly: 'true',
    nestedNotSupported: 'Les objets et tableaux imbriqués ne sont pas convertis. Aplatissez les données avant de créer le CSV.',
    emptyArray: 'Le tableau doit contenir au moins un objet avec une propriété.',
    summaryRows: 'Lignes de données',
    summaryColumns: 'Colonnes',
    summaryDelimiter: 'Séparateur',
    fileName: 'donnees-converties.csv',
  },
  privacyNote: 'Le JSON est converti et le fichier créé dans ce navigateur. FunnyTools ne reçoit ni ne conserve les données.',
  disclaimer: 'Le CSV ne garde ni types ni imbrication. Vérifiez formule, BOM, séparateur et format des colonnes dans l’application cible.',
};

export const frenchJsonToCsvReview = {
  heading: 'Vérifier une conversion JSON vers CSV',
  intro: 'Le fichier doit conserver les colonnes et le texte, puis être importé avec les bons réglages dans l’application cible.',
  panels: [
    { title: 'Contrôler les colonnes', text: 'Vérifiez les clés tardives, l’ordre de l’en-tête et le sens des cellules vides.' },
    { title: 'Préparer le tableur', text: 'Décidez séparateur, BOM, types de colonnes et protection contre les formules.' },
    { title: 'Tester un échantillon', text: 'Importez accents, guillemets, retours à la ligne et zéros initiaux avant le lot.' },
  ],
  checklistHeading: 'Points à contrôler',
  checklist: [
    'Chaque élément du tableau est un objet plat.',
    'L’en-tête contient toutes les propriétés utiles.',
    'Le nombre de lignes et de colonnes correspond à la source.',
    'Les identifiants et textes ne sont pas réinterprétés par le tableur.',
  ],
};

export const frenchMarkdownPreviewer: ToolContent = {
  name: 'Éditeur Markdown avec aperçu HTML',
  short: 'Rédigez du Markdown, observez le rendu en direct, copiez le HTML assaini ou téléchargez une page HTML simple.',
  long: 'L’aperçu utilise Marked pour interpréter titres, listes, tableaux, liens et blocs de code, puis DOMPurify pour assainir le HTML avant insertion dans la page. Il aide à relire un README ou un brouillon, mais ne reproduit pas exactement GitHub, Obsidian ou chaque CMS. Le document reste dans cet onglet, n’est pas enregistré et doit être validé dans sa plateforme finale.',
  seoTitle: 'Éditeur Markdown en ligne avec aperçu HTML',
  seoDescription: 'Prévisualisez Markdown, tableaux, tâches et code. HTML assaini par DOMPurify, copie ou téléchargement, limites GitHub et CMS expliquées.',
  keywords: [
    'éditeur Markdown en ligne',
    'aperçu Markdown HTML',
    'prévisualiser README',
    'convertir Markdown en HTML',
    'Markdown tableau liste tâches',
    'Markdown français en ligne',
    'HTML assaini DOMPurify',
  ],
  capabilities: [
    'Afficher le rendu Markdown pendant la saisie.',
    'Interpréter titres, emphase, listes, citations, tableaux, tâches, liens et code.',
    'Assainir la sortie de Marked avec DOMPurify avant affichage.',
    'Copier le fragment HTML propre ou télécharger un document HTML5.',
    'Traiter le brouillon localement sans compte ni sauvegarde serveur.',
  ],
  contentSections: [
    {
      heading: 'Réponse rapide : prévisualiser du Markdown',
      paragraphs: [
        'Remplacez le texte d’exemple dans l’éditeur de gauche. L’aperçu de droite se met à jour immédiatement. Essayez `# Titre`, `**gras**`, une liste commençant par `-`, un lien ou un bloc entre trois accents graves. Quand la structure est satisfaisante, copiez le fragment HTML assaini ou téléchargez un document HTML complet avec encodage UTF-8, viewport et quelques styles de lecture.',
        'La page n’ouvre pas directement un fichier `.md`, ne crée pas de compte et ne garde aucune version. Une actualisation efface le brouillon. Travaillez donc sur une copie et conservez le texte maître dans votre éditeur, dépôt ou CMS. L’aperçu sert à diagnostiquer la structure ; la validation finale doit avoir lieu là où le document sera réellement publié.',
      ],
    },
    {
      heading: 'Titres, listes, tableaux et blocs de code pris en charge',
      paragraphs: [
        'Marked interprète le Markdown courant et plusieurs conventions souvent associées à GitHub Flavored Markdown : titres `#`, gras, italique, barré, citations, séparateurs, listes ordonnées, listes à puces, cases à cocher, tableaux, liens, images, code en ligne et blocs clôturés. Une ligne vide ou une indentation différente peut changer le bloc obtenu ; comparez le texte source et le rendu.',
        'Une table demande une ligne d’en-têtes puis une ligne de séparation avec des tirets. Une liste imbriquée doit garder une indentation cohérente. Un bloc de code commence et se termine avec la même clôture. L’étiquette `js` ou `bash` peut devenir une classe informative, mais cet outil ne charge pas de coloration syntaxique. Le code est affiché comme texte et n’est pas exécuté.',
      ],
      items: [
        'Titres de niveau 1 à 6 et paragraphes.',
        'Listes, tâches, citations et séparateurs.',
        'Liens, images et tableaux simples.',
        'Code en ligne et blocs sans exécution.',
      ],
    },
    {
      heading: 'Différences entre GitHub, Obsidian, Discord et les CMS',
      paragraphs: [
        'Markdown désigne une famille de dialectes, pas un rendu universel. GitHub applique son propre assainissement et résout les chemins relatifs selon le dépôt. Obsidian ajoute wikiliens, embeds et syntaxe interne. Discord ne rend pas les tableaux comme une documentation. Un CMS peut autoriser moins de HTML ou ajouter ses propres extensions. Un bon aperçu ici ne prouve donc pas une apparence identique ailleurs.',
        'Les fonctions Mermaid, mathématiques LaTeX, notes de bas de page propres à une plateforme, frontmatter YAML, wikiliens, shortcodes, composants MDX et blocs Astro ne sont pas interprétées par ce widget. Elles peuvent rester en texte ou disparaître selon leur forme. Si le document en dépend, utilisez le moteur exact du projet et ses tests de construction.',
      ],
    },
    {
      heading: 'De Markdown à HTML avec Marked et DOMPurify',
      paragraphs: [
        'Marked transforme le Markdown en chaîne HTML. Sa documentation ne présente pas cette sortie comme assainie. FunnyTools la passe donc immédiatement à DOMPurify avant de l’insérer dans le DOM. Les éléments, attributs et URL jugés dangereux sont retirés. Un `<script>` ou un gestionnaire `onerror` ne doit pas s’exécuter dans l’aperçu.',
        'L’assainissement ne prouve ni vérité, ni qualité éditoriale, ni conformité juridique. Un lien HTTPS peut mener vers une page trompeuse, une image externe peut provoquer une requête vers son hébergeur et un texte peut exposer une donnée personnelle. Vérifiez les destinations, droits, textes alternatifs et informations sensibles. Le serveur ou CMS final doit conserver sa propre politique de sécurité.',
      ],
    },
    {
      heading: 'HTML brut, composants et contenu non fiable',
      paragraphs: [
        'Certains dialectes acceptent du HTML brut dans le Markdown. Marked peut le convertir, puis DOMPurify ne conserve que la partie autorisée. Une balise personnalisée, un attribut `style`, un iframe ou un formulaire peut donc être retiré. C’est une mesure de sécurité du rendu et non un outil de test pour une application web interactive.',
        'N’utilisez pas cet aperçu pour valider React, Vue, Astro, MDX, Web Components ou JavaScript intégré. Un exemple JavaScript placé dans un bloc de code reste inerte ; du JavaScript inséré comme HTML dangereux est éliminé. Pour du contenu fourni par des utilisateurs, gardez aussi un assainissement au moment de la publication et appliquez une politique de liens adaptée.',
      ],
    },
    {
      heading: 'Préparer un README clair et accessible',
      paragraphs: [
        'Un README efficace commence par un titre principal unique, explique le but en quelques phrases puis organise installation, utilisation, configuration, tests et licence avec des niveaux cohérents. Ne sautez pas de `##` à `####` pour obtenir seulement une taille visuelle. Les personnes utilisant un lecteur d’écran ou parcourant la table des matières dépendent de cette hiérarchie.',
        'Employez un texte de lien descriptif plutôt que « cliquez ici », ajoutez un texte alternatif utile aux images et réservez les tableaux aux données réellement tabulaires. Le Markdown brut doit rester lisible. L’aperçu aide à repérer une liste cassée ou une clôture de code oubliée, mais il ne lance pas d’audit d’accessibilité, de correction orthographique ou de vérification des liens.',
      ],
    },
    {
      heading: 'Liens, images et chemins relatifs',
      paragraphs: [
        'Les liens apparaissent dans le rendu, mais leurs clics sont bloqués dans le panneau pour éviter une navigation accidentelle pendant la relecture. Vérifiez chaque URL séparément. Un chemin relatif comme `./docs/guide.md` n’a pas ici le contexte du futur dépôt et peut sembler incorrect alors qu’il fonctionnera sur GitHub, ou l’inverse. Contrôlez-le dans l’arborescence réelle.',
        'Une image distante peut déclencher une requête depuis le navigateur vers le domaine indiqué. N’utilisez pas de lien privé, de token signé ou de ressource confidentielle. Le widget ne télécharge pas l’image dans le document, ne l’optimise pas et ne vérifie pas sa licence. Dans le HTML téléchargé, les ressources externes et chemins relatifs restent dépendants de leur emplacement.',
      ],
    },
    {
      heading: 'Copier le fragment ou télécharger une page HTML',
      paragraphs: [
        '« Copier le HTML assaini » place seulement le fragment de l’aperçu dans le presse-papiers. Il ne contient ni les styles de FunnyTools ni une page complète. Un CMS peut encore supprimer d’autres balises ou classes lors du collage. Inspectez la sortie et n’utilisez jamais la copie comme moyen de contourner le filtre du système cible.',
        '« Télécharger le HTML » crée une page autonome avec doctype HTML5, langue française, UTF-8, viewport et styles de base pour le texte, les tableaux, les citations et le code. Aucun script du Markdown n’est ajouté. Les images et liens restent externes. Ouvrez le fichier localement, puis contrôlez-le à nouveau avant hébergement public.',
      ],
    },
    {
      heading: 'Confidentialité, sauvegarde et performances',
      paragraphs: [
        'Le Markdown est interprété dans cet onglet et FunnyTools ne sauvegarde ni le brouillon ni le HTML. Le presse-papiers et le fichier téléchargé relèvent ensuite du système d’exploitation. Ne collez pas de secret, token ou documentation confidentielle dans un navigateur non autorisé. Une politique interne peut interdire les extensions ou la synchronisation pour ce type de contenu.',
        'Le rendu est recalculé pendant la saisie. Un très long manuel ou une page contenant de nombreuses images peut ralentir un téléphone. Divisez les documents volumineux et utilisez le générateur officiel du projet pour la production. Cette page ne teste pas frontmatter, métadonnées SEO, liens morts, orthographe, compilation MDX, ancres automatiques ni cohérence entre plusieurs fichiers.',
      ],
    },
  ],
  instructions: [
    'Conservez le fichier original et collez une copie du Markdown.',
    'Relisez titres, listes, tableaux, tâches, liens, images et clôtures de code.',
    'Vérifiez que tout HTML non fiable reste inerte après assainissement.',
    'Copiez le fragment ou téléchargez la page selon votre besoin.',
    'Testez finalement le document dans GitHub, Obsidian ou le CMS cible.',
  ],
  examples: [
    'Relire un README français avant le commit.',
    'Vérifier une table et une liste de tâches de documentation.',
    'Convertir un petit brouillon Markdown en fragment HTML assaini.',
    'Repérer un bloc de code dont la clôture manque.',
    'Préparer une page HTML simple pour lecture locale.',
  ],
  audience: [
    'Développeurs et rédacteurs de documentation.',
    'Étudiants apprenant la relation entre Markdown et HTML.',
    'Équipes éditoriales écrivant pour un CMS compatible.',
    'Support technique vérifiant tableaux, listes et blocs de code.',
  ],
  caseStudies: [
    { title: 'README avant publication', description: 'Une clôture manquante transforme toute la section licence en code. L’aperçu révèle le problème, puis la version corrigée est testée directement sur GitHub.' },
    { title: 'HTML dangereux dans un brouillon', description: 'Un attribut d’événement apparaît dans le texte. Marked produit du HTML, DOMPurify retire la partie dangereuse et le CMS conserve également son propre assainissement.' },
    { title: 'Table destinée à un CMS', description: 'Le tableau fonctionne ici, mais le CMS applique un dialecte différent. Le contenu est remplacé par une liste accessible après essai dans la plateforme finale.' },
  ],
  notes: [
    'La sortie de Marked est assainie avec DOMPurify.',
    'Mermaid, LaTeX, MDX et wikiliens ne sont pas pris en charge.',
    'Les blocs de code ne sont ni exécutés ni colorés automatiquement.',
    'Les clics de liens sont bloqués dans l’aperçu.',
    'Le brouillon disparaît lorsque la page est rechargée.',
  ],
  faq: [
    { q: 'L’aperçu est-il identique à GitHub ?', a: 'Pas nécessairement. Les conventions se ressemblent, mais GitHub applique ses extensions, ses styles, ses chemins et son assainissement.' },
    { q: 'Puis-je écrire du HTML dans le Markdown ?', a: 'Marked peut l’interpréter, puis DOMPurify retire les éléments et attributs dangereux. Une balise personnalisée peut aussi disparaître.' },
    { q: 'Un bloc JavaScript est-il exécuté ?', a: 'Non. Le code clôturé est affiché comme texte. Aucune coloration syntaxique par langage n’est chargée.' },
    { q: 'Mermaid et les formules LaTeX fonctionnent-ils ?', a: 'Non. Ces extensions ont besoin de moteurs supplémentaires et ne font pas partie de cet aperçu.' },
    { q: 'Que contient le fichier HTML téléchargé ?', a: 'Une page HTML5 complète en UTF-8 avec le fragment assaini et des styles simples. Les ressources liées restent externes.' },
    { q: 'Mon brouillon est-il sauvegardé ?', a: 'Non. Il reste en mémoire dans l’onglet et disparaît au rechargement. Conservez la source dans votre outil habituel.' },
  ],
  labels: {
    input: 'Markdown',
    preview: 'Aperçu HTML',
    copyHtml: 'Copier le HTML assaini',
    download: 'Télécharger le HTML',
    starter: '## Aperçu Markdown\n\nÉcrivez du **Markdown** ici.\n\n- Premier élément\n- Deuxième élément\n\n```js\nconsole.log("bonjour");\n```',
    renderError: 'Ce contenu Markdown n’a pas pu être rendu.',
    loadError: 'Les bibliothèques d’aperçu n’ont pas pu être chargées.',
    documentTitle: 'Aperçu Markdown',
    documentLanguage: 'fr',
    fileName: 'apercu-markdown.html',
  },
  privacyNote: 'Le Markdown est converti et assaini dans ce navigateur. FunnyTools ne sauvegarde ni le brouillon ni le HTML produit.',
  disclaimer: 'Chaque plateforme possède son dialecte et son propre assainissement. Vérifiez le document dans le dépôt ou CMS final avant publication.',
};

export const frenchMarkdownPreviewerReview = {
  heading: 'Vérifier un aperçu Markdown',
  intro: 'L’apparence ne suffit pas : le dialecte cible, la sécurité, les liens et l’accessibilité doivent également être contrôlés.',
  panels: [
    { title: 'Relire la structure', text: 'Confirmez titres, indentation, tableaux, tâches et clôtures des blocs de code.' },
    { title: 'Contrôler la sécurité', text: 'L’assainissement du navigateur ne remplace pas celui du CMS ou du serveur.' },
    { title: 'Essayer sur la cible', text: 'GitHub, Obsidian et les CMS peuvent rendre différemment les mêmes signes.' },
  ],
  checklistHeading: 'Points à contrôler',
  checklist: [
    'La hiérarchie des titres et listes reste compréhensible.',
    'Liens, chemins relatifs, images et textes alternatifs sont vérifiés.',
    'Le document ne dépend pas d’une extension absente.',
    'Le HTML copié ou téléchargé est relu dans son environnement final.',
  ],
};
