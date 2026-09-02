import type { ToolContent } from '../tools/_types';

export const frenchSortLines: ToolContent = {
  name: 'Trier des lignes de texte en ligne',
  short: 'Classez une liste de A à Z, de Z à A, par nombre initial ou par longueur avec les règles françaises.',
  long: 'Collez un élément par ligne puis choisissez un tri alphabétique croissant, décroissant, numérique ou par longueur. La comparaison de texte utilise la locale française et le mode numérique reconnaît un nombre simple au début de la ligne, avec virgule ou point décimal. Les espaces aux extrémités et les lignes vides sont supprimés avant le tri. Une option permet aussi d’ignorer la casse ou de retirer les doublons.',
  seoTitle: 'Trier des lignes par ordre alphabétique ou nombre',
  seoDescription: 'Triez des lignes de texte de A à Z, de Z à A, par nombre ou longueur, avec comparaison française et suppression facultative des doublons.',
  keywords: [
    'trier des lignes de texte',
    'trier une liste par ordre alphabétique',
    'classement de A à Z en ligne',
    'trier des lignes par nombre',
    'mettre des mots par ordre alphabétique',
    'trier une liste et supprimer les doublons',
    'outil de tri de texte',
  ],
  capabilities: [
    'Classer les lignes par ordre alphabétique français de A à Z ou de Z à A.',
    'Trier selon le nombre simple placé au début de chaque ligne.',
    'Classer les chaînes de la plus courte à la plus longue.',
    'Comparer sans tenir compte des majuscules et minuscules si nécessaire.',
    'Retirer les doublons avant le tri et afficher le nombre final de lignes.',
  ],
  contentSections: [
    {
      heading: 'Réponse rapide : comment trier des lignes',
      paragraphs: [
        'Collez une liste avec un élément complet par ligne, sélectionnez A–Z, Z–A, nombre initial ou longueur, puis contrôlez la sortie. Le résultat se recalcule lorsque l’entrée ou une option change. Avant toute comparaison, chaque ligne est nettoyée de ses espaces aux extrémités ; une ligne devenue vide est écartée. Si « Supprimer les doublons » est activé, la première graphie rencontrée est conservée, puis le tri est appliqué.',
        'Le mode alphabétique demande au navigateur une comparaison avec la locale `fr`. Il est donc plus adapté aux mots français qu’un simple classement des codes informatiques. Il ne comprend cependant ni le sens, ni les règles d’un catalogue : `Le jardin`, `Une école` et `À Paris` restent comparés depuis leur premier caractère. Gardez la liste source pour vérifier le premier élément, le dernier, les accents et le nombre total.',
      ],
    },
    {
      heading: 'Ordre alphabétique français de A à Z et de Z à A',
      paragraphs: [
        'A–Z compare la ligne entière en ordre croissant ; Z–A inverse cette comparaison, sans inverser les lettres à l’intérieur des mots. Les accents, la cédille, les signes, les chiffres inclus dans un libellé et les espaces intérieurs participent au résultat. Avec l’option d’ignorance de la casse, `École` et `école` ont une clé comparable, mais leur graphie d’origine reste visible dans la sortie.',
        'La fonction `localeCompare()` est appelée avec `fr`, et les données linguistiques disponibles peuvent varier légèrement selon le navigateur. Le tri ne retire pas automatiquement les articles `le`, `la`, `les` ou `un`, ne sépare pas un nom de famille composé et ne suit pas une norme bibliographique ou administrative. Pour un index officiel, créez une clé de classement distincte et validez la convention attendue avant de remplacer une colonne.',
      ],
      items: [
        'La comparaison porte sur toute la ligne déjà nettoyée.',
        'Les accents ne sont ni retirés ni translittérés.',
        'Z–A inverse l’ordre du classement, pas le contenu des lignes.',
        'Les articles et signes initiaux ne sont pas ignorés.',
      ],
    },
    {
      heading: 'Tri numérique avec virgule ou point décimal',
      paragraphs: [
        'Le mode numérique cherche un nombre au début de la ligne après le trim. Il accepte un signe négatif et une partie décimale simple avec virgule ou point. Ainsi, `-2,5 kg`, `0`, `3.75` et `12 articles` sont classés selon −2,5, 0, 3,75 et 12. Si deux valeurs initiales sont égales, le texte français sert de départage. Une ligne sans nombre initial est placée après les lignes reconnues comme numériques.',
        'Ce lecteur n’est pas un analyseur financier. Il ne comprend pas correctement les séparateurs de milliers, les devises placées avant le nombre, les fractions, les pourcentages, les dates ou la notation scientifique. `1 234,50`, `20 %`, `€ 8` et `1e3` demandent une normalisation adaptée au format source. Travaillez sur une copie, testez négatifs, zéro, égalités et lignes non numériques, puis comparez avec le système qui utilisera le classement.',
      ],
    },
    {
      heading: 'Tri par longueur : chaîne JavaScript et affichage réel',
      paragraphs: [
        'Le mode longueur place d’abord les lignes qui contiennent le moins d’unités de chaîne JavaScript ; une égalité est résolue par l’ordre alphabétique. Une lettre accentuée précomposée occupe généralement une unité, tandis que beaucoup d’emoji, de drapeaux ou de séquences combinées en utilisent plusieurs. Deux libellés visuellement aussi courts peuvent donc ne pas avoir la même longueur technique.',
        'Ce classement ne mesure ni les mots, ni les octets UTF-8, ni les graphèmes visibles, ni la largeur en pixels. Avec une police proportionnelle, `iiii` et `MMMM` comptent quatre unités mais n’occupent pas la même place. Le mode reste utile pour repérer rapidement les lignes extrêmes ou préparer des essais ; pour une interface, une base de données ou un SMS, contrôlez la limite réellement appliquée par le produit cible.',
      ],
    },
    {
      heading: 'Ignorer la casse et supprimer les doublons',
      paragraphs: [
        'Lorsque la casse est ignorée, une clé en minuscules françaises sert à la comparaison. `ÉTÉ`, `Été` et `été` peuvent alors être considérés comme la même valeur pour la déduplication, tout en conservant la première forme saisie. Les accents ne sont pas supprimés : `cote`, `coté` et `côte` restent des chaînes distinctes. Le retrait des doublons intervient avant le classement.',
        'Chaque ligne est comparée après suppression des espaces extérieurs, mais les doubles espaces intérieurs, la ponctuation, les variantes Unicode, les URL et les adresses électroniques ne sont pas normalisés. `Rue Victor Hugo` et `Rue  Victor Hugo` restent différentes. Le compteur indique seulement le nombre de lignes produites ; il ne donne ni fréquence, ni journal des suppressions. Pour un audit, utilisez d’abord l’outil de doublons ou une table de comptage.',
      ],
    },
    {
      heading: 'Confidentialité, ordre métier et contrôle final',
      paragraphs: [
        'La liste est traitée dans la mémoire de cet onglet. FunnyTools ne reçoit pas son contenu pour la classer et ne conserve pas d’historique du texte. Les services généraux de la page suivent la politique de confidentialité, sans ajouter la valeur du champ aux événements de mesure. Ne collez malgré tout ni mots de passe, ni jetons, ni données personnelles inutiles.',
        'Un tri peut détruire une chronologie, une priorité ou une correspondance avec une autre colonne. Il supprime également lignes vides, retraits et espaces de fin. Gardez l’original, copiez le résultat dans un nouveau fichier et vérifiez le nombre de lignes, les extrêmes, les nombres négatifs, les accents et les doublons. Pour des enregistrements à plusieurs champs, triez dans un tableur ou un outil qui conserve les lignes complètes.',
      ],
    },
  ],
  instructions: [
    'Conservez la liste source et collez une copie avec un élément par ligne.',
    'Choisissez A–Z, Z–A, nombre initial ou longueur selon le résultat attendu.',
    'Activez l’ignorance de la casse ou la suppression des doublons seulement si leur définition convient.',
    'Contrôlez les lignes sans nombre, les accents, les égalités et le total produit.',
    'Copiez la sortie dans un nouveau fichier avant de remplacer une donnée existante.',
  ],
  examples: [
    'Classer une liste de communes françaises de A à Z.',
    'Ordonner des mesures simples commençant par un nombre décimal.',
    'Repérer les titres les plus courts avant un test d’interface.',
    'Retirer des variantes de casse tout en gardant la première graphie.',
    'Vérifier pourquoi un montant formaté n’est pas reconnu comme nombre simple.',
  ],
  audience: [
    'Rédacteurs, documentalistes et équipes administratives préparant des listes.',
    'Développeurs et analystes nettoyant un petit export ligne par ligne.',
    'Étudiants classant des réponses, sources ou libellés.',
    'Personnes souhaitant trier localement sans envoyer la liste à un service.',
  ],
  caseStudies: [
    { title: 'Liste de villes avec accents', description: 'Une copie est triée avec la locale française. La personne vérifie les articles, accents et conventions du document avant de remplacer l’ordre source.' },
    { title: 'Mesures avec virgule décimale', description: 'Les lignes `-1,5`, `2` et `10,2` sont reconnues par leur préfixe numérique. Les unités restent visibles et les valeurs formatées avec milliers sont normalisées séparément.' },
    { title: 'Doublons de casse', description: '`École`, `école` et `ÉCOLE` sont réunies après activation des deux options. La première graphie est conservée, puis la liste unique est classée.' },
  ],
  notes: [
    'Toutes les lignes sont trimées et les lignes vides sont supprimées.',
    'Le tri alphabétique utilise la locale française fournie par le navigateur.',
    'Le mode numérique lit seulement un nombre simple placé au début.',
    'La longueur correspond aux unités de chaîne JavaScript, pas aux pixels.',
    'La suppression des doublons garde la première graphie avant le tri.',
  ],
  faq: [
    { q: 'Le tri respecte-t-il les accents français ?', a: 'Il utilise `localeCompare()` avec la locale `fr`. Les accents sont conservés, mais une norme de catalogue spécialisée doit être vérifiée séparément.' },
    { q: 'Pourquoi les lignes vides disparaissent-elles ?', a: 'Le widget nettoie les espaces aux extrémités puis écarte toute ligne vide avant le classement.' },
    { q: 'Le tri numérique comprend-il `1 234,50 €` ?', a: 'Non de façon fiable. Il lit un nombre décimal simple au début, sans séparateur de milliers ni devise placée avant.' },
    { q: 'Ignorer la casse retire-t-il aussi les accents ?', a: 'Non. `Été` et `été` peuvent être comparables, mais `cote` et `côte` restent distincts.' },
    { q: 'Le tri par longueur mesure-t-il les caractères visibles ?', a: 'Non. Il utilise la longueur de chaîne JavaScript ; certains emoji et caractères combinés occupent plusieurs unités.' },
    { q: 'La liste est-elle envoyée à FunnyTools ?', a: 'Non. Le nettoyage, le tri et la déduplication s’effectuent localement dans cet onglet.' },
  ],
  labels: {
    locale: 'fr',
    decimalSeparator: ',',
    input: 'Lignes à trier',
    placeholder: 'Collez un élément par ligne…',
    sortMode: 'Mode de tri',
    ascending: 'Ordre alphabétique A–Z',
    descending: 'Ordre alphabétique Z–A',
    numeric: 'Nombre initial croissant',
    length: 'Longueur croissante',
    caseInsensitive: 'Ignorer majuscules et minuscules',
    removeDuplicates: 'Supprimer les doublons',
    sort: 'Trier les lignes',
    copy: 'Copier le résultat',
    reset: 'Effacer',
    output: 'Résultat trié',
    emptyResult: 'La liste triée apparaîtra ici.',
    lineCount: 'Lignes résultantes',
    copied: 'Résultat copié',
  },
  privacyNote: 'Le trim, le tri et la suppression des doublons s’exécutent dans cet onglet. FunnyTools ne reçoit pas la liste pour la traiter.',
  disclaimer: 'Le tri retire les lignes vides et les espaces extérieurs. Conservez l’original et vérifiez les règles métier avant de remplacer un ordre existant.',
};

export const frenchSortLinesReview = {
  heading: 'Comment vérifier une liste après le tri',
  intro: 'Un résultat ordonné doit encore être contrôlé selon la locale, la forme des nombres et l’ordre métier que la source représentait.',
  panels: [
    { title: 'Comparez les extrêmes', text: 'Contrôlez les premières et dernières lignes, les accents, signes et variantes de casse.' },
    { title: 'Testez les nombres', text: 'Incluez négatifs, décimales, égalités et une ligne sans préfixe numérique.' },
    { title: 'Gardez la source', text: 'L’outil retire espaces extérieurs et lignes vides ; copiez la sortie dans un autre fichier.' },
  ],
  checklistHeading: 'Liste de contrôle',
  checklist: [
    'Le mode choisi correspond à la question réelle.',
    'Les articles et signes initiaux ont été pris en compte.',
    'Le compteur final correspond au nombre attendu.',
    'La chronologie ou la priorité d’origine n’a pas été détruite.',
  ],
};

export const frenchJsonFormatter: ToolContent = {
  name: 'Formater et valider du JSON en ligne',
  short: 'Indentez, minifiez ou vérifiez la syntaxe d’un JSON localement, avec un message d’erreur exploitable.',
  long: 'Collez du JSON standard puis choisissez un format lisible avec deux espaces, une version minifiée ou une simple validation syntaxique. L’outil utilise `JSON.parse()` et `JSON.stringify()` dans le navigateur : il n’accepte ni commentaires, ni virgule finale, ni JSON5. Le parsing peut masquer des clés en double et modifier les entiers au-delà de la précision sûre de JavaScript ; gardez donc toujours la source.',
  seoTitle: 'Formater, minifier et valider du JSON en ligne',
  seoDescription: 'Formatez du JSON avec 2 espaces, minifiez-le ou validez sa syntaxe localement. Comprenez erreurs, clés en double et grands nombres.',
  keywords: [
    'formater JSON en ligne',
    'valider JSON',
    'JSON formatter français',
    'minifier JSON',
    'vérifier syntaxe JSON',
    'rendre JSON lisible',
    'trouver erreur JSON',
  ],
  capabilities: [
    'Analyser du JSON standard avec le moteur JavaScript du navigateur.',
    'Produire une sortie lisible indentée avec deux espaces.',
    'Minifier un document valide sur une seule représentation compacte.',
    'Confirmer la syntaxe sans exécuter le contenu JSON.',
    'Afficher le message du parseur et, si disponible, une ligne et une colonne.',
  ],
  contentSections: [
    {
      heading: 'Réponse rapide : formater ou valider un JSON',
      paragraphs: [
        'Collez une copie anonymisée du JSON. Cliquez sur « Formater avec 2 espaces » pour lire l’arborescence, sur « Minifier » pour obtenir une représentation compacte ou sur « Valider la syntaxe » pour savoir seulement si le texte est analysable. Les trois actions passent par le parseur JSON du navigateur. Un document invalide n’est pas réparé automatiquement : le message d’erreur est affiché pour éviter une correction inventée.',
        'Un affichage propre ne prouve ni la conformité à une API, ni la présence des bons champs. Il prouve uniquement que `JSON.parse()` a accepté la chaîne à cet instant. Conservez le payload original, comparez types et valeurs, puis utilisez le JSON Schema, la documentation ou un environnement de test du système destinataire pour valider le contrat complet.',
      ],
    },
    {
      heading: 'JSON standard : guillemets, virgules et valeurs racines',
      paragraphs: [
        'Le JSON standard exige des guillemets doubles autour des noms de propriétés et des chaînes. Il n’autorise ni commentaires, ni virgule après le dernier élément, ni `undefined`, ni fonction, ni guillemets simples. `{"actif":true}` est valide ; `{actif:true}`, `{\'actif\':true}` et `{"actif":true,}` ne le sont pas. Cette page ne traite pas JSON5, YAML ou un objet littéral JavaScript.',
        'La racine ne doit pas obligatoirement être un objet : un tableau, une chaîne, un nombre, `true`, `false` ou `null` sont aussi des valeurs JSON valides. L’outil ne refuse donc pas `"bonjour"` ou `42`. Si votre API impose un objet avec certaines propriétés, cette obligation vient du contrat externe et non de la grammaire JSON.',
      ],
      items: [
        'Les noms de propriétés et chaînes utilisent des guillemets doubles.',
        'Les commentaires et virgules finales sont refusés.',
        'Un tableau ou une valeur primitive peut être une racine valide.',
        'Valide syntaxiquement ne signifie pas conforme au schéma.',
      ],
    },
    {
      heading: 'Formatage à deux espaces et minification',
      paragraphs: [
        'Le formatage analyse d’abord la valeur puis la sérialise avec deux espaces par niveau. La minification sérialise la même structure sans espace décoratif. Ces opérations ne conservent ni l’indentation d’origine, ni les retours, ni les espaces autour des séparateurs. L’ordre courant des propriétés est celui produit par le moteur JavaScript, mais il ne faut pas utiliser cet ordre comme garantie métier ou signature byte à byte.',
        'La sortie est une nouvelle sérialisation, pas un simple changement visuel. Des échappements peuvent apparaître différemment tout en représentant le même texte, et `-0` peut notamment être régénéré comme `0`. Si les octets exacts servent à une signature, un hash, un cache ou un test de snapshot, ne remplacez pas la source par la sortie sans connaître la canonisation exigée.',
      ],
    },
    {
      heading: 'Clés en double et perte silencieuse',
      paragraphs: [
        'Deux propriétés portant exactement le même nom peuvent être acceptées par le parseur, mais la dernière occurrence remplace généralement la précédente dans l’objet obtenu. Après formatage, le doublon peut donc avoir disparu. Par exemple, une source avec deux clés `statut` ne doit pas être considérée comme assainie parce que la sortie n’en montre plus qu’une.',
        'Le widget ne possède pas d’analyse préalable capable de signaler tous les doublons avant `JSON.parse()`. Pour une configuration, un webhook ou un document probant, détectez-les dans la source avec un outil spécialisé ou corrigez le générateur. Comparez aussi le nombre de propriétés et demandez au producteur de garantir des noms uniques.',
      ],
    },
    {
      heading: 'Grands nombres, précision et types',
      paragraphs: [
        'JavaScript représente les nombres JSON avec le type `Number`. Les entiers au-delà de `9 007 199 254 740 991` peuvent perdre de la précision pendant le parsing, puis être réécrits avec une autre valeur. Les identifiants de 18 chiffres, numéros de transaction ou compteurs exacts doivent souvent être transmis comme chaînes entre guillemets, selon le contrat de l’API.',
        'Le formateur ne sait pas qu’une propriété nommée `id` doit être une chaîne, qu’une date suit ISO 8601 ou qu’une valeur doit être positive. Il ne convertit pas non plus un nombre en chaîne de sa propre initiative. Vérifiez les types dans la documentation, testez les bornes et évitez de reformater une donnée exacte avant d’avoir confirmé sa représentation attendue.',
      ],
    },
    {
      heading: 'Erreurs, confidentialité et données non fiables',
      paragraphs: [
        'Le message d’erreur vient du moteur JavaScript. Lorsque celui-ci fournit une position numérique, l’outil calcule une ligne et une colonne à titre indicatif. Le texte et la précision du message peuvent varier entre Chrome, Firefox ou Safari ; certaines erreurs n’incluent aucune position. Corrigez une copie, relancez la validation et vérifiez le caractère autour de la zone signalée.',
        'L’analyse et la sérialisation ont lieu dans cet onglet. FunnyTools ne reçoit ni ne stocke le JSON pour le formater. N’y collez cependant jamais token, cookie, mot de passe, clé privée, dossier client ou payload de production non anonymisé. Le JSON peut contenir une chaîne Base64 ou une URL dangereuse : le parseur ne l’exécute pas, mais vous devez traiter la sortie comme une donnée non fiable.',
      ],
    },
  ],
  instructions: [
    'Retirez secrets et données personnelles, puis conservez la source originale.',
    'Validez d’abord si vous souhaitez seulement confirmer la syntaxe.',
    'Formatez pour lire ou minifiez pour obtenir une représentation compacte.',
    'Contrôlez clés en double, grands entiers, types, champs et échappements.',
    'Testez ensuite le résultat contre le schéma ou le système destinataire.',
  ],
  examples: [
    'Lire une réponse d’API anonymisée reçue sur une seule ligne.',
    'Repérer une virgule finale dans une configuration de test.',
    'Minifier un exemple valide pour un champ qui exige une ligne.',
    'Vérifier que `null` ou un tableau racine est syntaxiquement valide.',
    'Détecter le risque d’un identifiant de 18 chiffres non placé entre guillemets.',
  ],
  audience: [
    'Développeurs et équipes QA inspectant réponses, webhooks et fixtures.',
    'Équipes techniques préparant des exemples ou configurations anonymisés.',
    'Rédacteurs et enseignants expliquant la structure JSON.',
    'Personnes souhaitant analyser localement une petite charge utile.',
  ],
  caseStudies: [
    { title: 'Virgule finale refusée', description: 'La chaîne `{"actif":true,}` déclenche une erreur près de l’accolade. La source est corrigée, puis les champs sont contrôlés avec le schéma de l’intégration.' },
    { title: 'Identifiant de 18 chiffres', description: 'La valeur dépasse la précision sûre de JavaScript. L’équipe consulte le contrat et corrige le producteur pour l’envoyer comme chaîne, au lieu de faire confiance à une sortie reformattée.' },
    { title: 'Deux propriétés identiques', description: 'Deux clés `statut` seraient réduites à la dernière lors du parsing. Le générateur est corrigé avant formatage afin de ne pas masquer la première valeur.' },
  ],
  notes: [
    'La validation porte sur la syntaxe JSON, pas sur JSON Schema ni les règles métier.',
    'Le formatage utilise deux espaces et régénère toute la représentation.',
    'Les clés en double peuvent être réduites à leur dernière occurrence.',
    'Les entiers hors de la précision sûre de JavaScript peuvent changer.',
    'Le message et la position d’erreur dépendent du navigateur.',
  ],
  faq: [
    { q: 'Les commentaires et virgules finales sont-ils acceptés ?', a: 'Non. L’outil utilise le JSON standard via `JSON.parse()`, pas JSON5 ni un objet JavaScript.' },
    { q: 'Valider vérifie-t-il un JSON Schema ?', a: 'Non. Cela confirme uniquement la syntaxe. Champs, types et règles doivent être testés avec le schéma du destinataire.' },
    { q: 'Le formatage peut-il modifier un grand nombre ?', a: 'Oui. Un entier hors de la précision sûre peut changer pendant le parsing et la sérialisation JavaScript.' },
    { q: 'Que deviennent les clés en double ?', a: 'La dernière occurrence peut remplacer la précédente. Corrigez la source avant de formater un document important.' },
    { q: 'L’outil répare-t-il automatiquement le JSON ?', a: 'Non. Il affiche l’erreur du navigateur pour que vous décidiez de la correction sans transformation arbitraire.' },
    { q: 'Le JSON est-il envoyé à FunnyTools ?', a: 'Non. L’analyse, le formatage et la minification s’exécutent localement dans cet onglet.' },
  ],
  labels: {
    input: 'JSON source',
    output: 'Résultat',
    placeholder: 'Collez du JSON standard sans donnée sensible…',
    format: 'Formater avec 2 espaces',
    minify: 'Minifier',
    validate: 'Valider la syntaxe',
    copy: 'Copier le résultat',
    clear: 'Effacer',
    valid: 'Le JSON est syntaxiquement valide.',
    invalidPrefix: 'JSON non valide',
    line: 'ligne',
    column: 'colonne',
    copied: 'Résultat copié',
  },
  privacyNote: 'Le JSON est analysé et sérialisé localement dans cet onglet. FunnyTools ne reçoit pas le contenu pour le traiter.',
  disclaimer: 'Ne collez aucun secret. La validation couvre seulement la syntaxe et le parseur peut masquer des clés en double ou modifier de très grands entiers.',
};

export const frenchJsonFormatterReview = {
  heading: 'Comment contrôler un JSON après formatage',
  intro: 'Une sortie lisible ne garantit ni la précision des nombres, ni l’absence de clés en double, ni la conformité au contrat d’une API.',
  panels: [
    { title: 'Protégez les secrets', text: 'Remplacez tokens, cookies, mots de passe et données personnelles par des valeurs fictives.' },
    { title: 'Recherchez les pertes', text: 'Contrôlez grands entiers, propriétés répétées, types et changements de représentation.' },
    { title: 'Validez le contrat', text: 'Utilisez le JSON Schema ou la documentation du récepteur pour les champs et règles.' },
  ],
  checklistHeading: 'Liste de contrôle',
  checklist: [
    'L’entrée ne contient aucune donnée sensible inutile.',
    'Les identifiants longs sont des chaînes lorsque le contrat l’exige.',
    'La source ne contient pas de clés en double masquées par le parseur.',
    'La sortie a été testée dans le système ou avec le schéma cible.',
  ],
};

export const frenchBase64: ToolContent = {
  name: 'Encoder et décoder du Base64 UTF-8',
  short: 'Convertissez du texte français, des emoji ou un petit JSON entre UTF-8 et Base64 standard dans le navigateur.',
  long: 'Saisissez du texte pour encoder ses octets UTF-8 en Base64 standard, ou collez une chaîne Base64 afin de récupérer un texte UTF-8 valide. Le décodeur retire les espaces, tabulations et retours présents dans la chaîne, mais ne prend pas directement en charge Base64URL, les préfixes Data URI ou les fichiers binaires. Base64 n’est ni un chiffrement, ni un hash, ni une compression.',
  seoTitle: 'Encoder ou décoder du Base64 UTF-8 en ligne',
  seoDescription: 'Encodez du texte accentué et des emoji en Base64, ou décodez du Base64 standard vers UTF-8. Traitement local et limites Base64URL expliquées.',
  keywords: [
    'encoder Base64 en ligne',
    'décoder Base64 en texte',
    'convertir texte en Base64',
    'Base64 UTF-8',
    'décodeur Base64 français',
    'Base64 encoder decoder',
    'lire une chaîne Base64',
  ],
  capabilities: [
    'Encoder une chaîne Unicode en octets UTF-8 puis en Base64 standard.',
    'Décoder une chaîne Base64 et exiger un texte UTF-8 valide.',
    'Conserver accents français, caractères CJK et emoji lors d’un aller-retour valide.',
    'Ignorer les espaces et retours ajoutés à l’intérieur du Base64.',
    'Copier la sortie sans envoyer l’entrée au serveur de FunnyTools.',
  ],
  contentSections: [
    {
      heading: 'Réponse rapide : texte vers Base64 et retour vers UTF-8',
      paragraphs: [
        'Pour encoder, collez un texte lisible puis cliquez sur « Encoder en Base64 ». Le navigateur transforme d’abord la chaîne en octets UTF-8, puis représente ces octets avec l’alphabet Base64 standard. Pour décoder, placez une chaîne Base64 dans l’entrée et cliquez sur « Décoder en UTF-8 ». Si la syntaxe est refusée ou si les octets ne forment pas un texte UTF-8 valide, aucun faux texte de remplacement n’est affiché.',
        'L’entrée sert à une direction à la fois. Après un encodage, recopiez la sortie dans le premier champ si vous voulez vérifier l’aller-retour. Base64 représente des octets ; il ne décrit ni leur type, ni leur origine. Cette page choisit explicitement UTF-8 pour le texte afin que `é`, `œ`, les caractères asiatiques et les emoji aient une conversion déterminée.',
      ],
    },
    {
      heading: 'UTF-8, accents et emoji',
      paragraphs: [
        'Base64 ne transforme pas directement les lettres. `TextEncoder` produit leurs octets UTF-8 : un caractère ASCII utilise généralement un octet, une lettre accentuée en utilise souvent deux et un emoji davantage. Deux textes ayant le même nombre de signes visibles peuvent donc créer des chaînes Base64 de longueurs différentes. Le padding dépend du nombre total d’octets, pas du nombre de mots.',
        'Au retour, `TextDecoder("utf-8", { fatal: true })` rejette une suite qui n’est pas du UTF-8 valide. Cela évite d’insérer silencieusement un caractère de remplacement. Si la source a utilisé ISO-8859-1, Windows-1252, UTF-16 ou une donnée binaire, il faut connaître ce format et choisir un outil adapté ; ce décodeur ne tente pas de deviner.',
      ],
      items: [
        'Entrée d’encodage : chaîne Unicode saisie dans le navigateur.',
        'Étape intermédiaire : octets UTF-8.',
        'Sortie : alphabet Base64 standard avec éventuel padding `=`.',
        'Décodage : les octets obtenus doivent former du UTF-8 valide.',
      ],
    },
    {
      heading: 'Base64 standard, alphabet et padding',
      paragraphs: [
        'La sortie utilise les caractères `A–Z`, `a–z`, `0–9`, `+` et `/`, avec zéro, un ou deux signes `=` à la fin selon la taille. Le décodeur retire les espaces, tabulations et retours avant d’appeler `atob()`, ce qui permet de coller une chaîne coupée sur plusieurs lignes. Les espaces retirés ne font pas partie des données décodées.',
        'La page ne corrige pas volontairement les caractères illégaux et n’ajoute pas elle-même un padding manquant. Certains navigateurs peuvent tolérer une forme particulière, mais une API peut imposer des règles plus strictes. Vérifiez l’alphabet et la présence de `=` dans la spécification du système source ; ne modifiez pas une chaîne participant à une signature ou un protocole sans comprendre ce format.',
      ],
    },
    {
      heading: 'Base64URL, Data URI et JWT : formats différents',
      paragraphs: [
        'Base64URL remplace généralement `+` par `-`, `/` par `_` et omet souvent le padding. On le rencontre dans les URL et les segments de JWT. Cet outil ne normalise pas `-` ou `_` vers le Base64 standard. Décoder le contenu d’un JWT ne vérifierait de toute façon ni sa signature, ni sa date d’expiration, ni sa provenance.',
        'Une Data URI commence par un en-tête tel que `data:text/plain;base64,`. Collez uniquement la partie située après la virgule : l’en-tête complet n’est pas une chaîne Base64 brute. Pour une image, FunnyTools possède un outil image vers Base64 avec type MIME et aperçu. La page présente ne sélectionne aucun fichier, ne reconstruit aucun binaire et ne détermine pas de type de média.',
      ],
    },
    {
      heading: 'Base64 n’est pas un chiffrement ni une compression',
      paragraphs: [
        'Toute personne qui obtient la chaîne peut la décoder sans clé. Base64 ne protège donc ni mot de passe, ni token, ni cookie, ni donnée personnelle. Il n’apporte pas non plus de preuve d’intégrité ou d’identité. La confidentialité exige un chiffrement approprié et une gestion de clés ; l’intégrité peut nécessiter un hash authentifié ou une signature selon le cas.',
        'La représentation augmente habituellement la taille : trois octets deviennent quatre caractères, auxquels peut s’ajouter le padding. Base64 sert surtout à transporter des octets dans un canal textuel ; il ne compresse pas. Avant de l’utiliser dans JSON, CSS, un en-tête ou une base, vérifiez les limites de taille et demandez si le canal accepte déjà l’UTF-8 directement.',
      ],
    },
    {
      heading: 'Confidentialité et contenu inconnu',
      paragraphs: [
        'L’encodage et le décodage s’exécutent dans cet onglet. FunnyTools ne reçoit pas le texte ou la chaîne Base64 pour produire le résultat et ne conserve pas d’historique de l’entrée. Les services généraux de la page suivent la politique de confidentialité, sans ajouter le contenu du champ aux événements. N’y placez toutefois jamais de secret ou de donnée personnelle inutile.',
        'Une chaîne inconnue peut révéler une URL, une commande, un script ou du texte trompeur. La décoder dans le champ ne l’exécute pas, mais copier la sortie dans une console ou un navigateur peut être dangereux. Traitez-la comme une donnée non fiable. Pour des fichiers ou octets arbitraires, utilisez un environnement isolé capable de vérifier signature, taille et type MIME.',
      ],
    },
  ],
  instructions: [
    'Identifiez si l’entrée est du texte ou du Base64 standard.',
    'Retirez un éventuel préfixe Data URI et ne collez pas Base64URL directement.',
    'Encodez ou décodez, puis vérifiez accents, emoji et retours à la ligne.',
    'Confirmez UTF-8, alphabet et padding dans la documentation de la source.',
    'N’exécutez jamais une sortie inconnue et n’utilisez pas Base64 comme protection.',
  ],
  examples: [
    'Encoder `élève, cœur et forêt` en Base64 UTF-8.',
    'Récupérer un petit exemple JSON reçu en Base64 standard.',
    'Vérifier qu’un aller-retour conserve exactement accents et emoji.',
    'Reconnaître les caractères `-` et `_` d’un segment Base64URL.',
    'Expliquer pourquoi une chaîne Base64 est plus longue et reste réversible.',
  ],
  audience: [
    'Développeurs et équipes QA contrôlant des exemples d’API.',
    'Rédacteurs techniques et enseignants expliquant UTF-8 et Base64.',
    'Personnes convertissant un texte français sans perdre les accents.',
    'Utilisateurs souhaitant un traitement local et connaissant le format source.',
  ],
  caseStudies: [
    { title: 'Phrase avec accents et emoji', description: 'La phrase est encodée via UTF-8 puis décodée. Le retour est comparé caractère par caractère avec la source conservée.' },
    { title: 'Segment de JWT', description: 'La présence de `-` et `_` signale Base64URL. La personne n’utilise pas le décodeur standard et ne confond pas lecture du payload avec validation de signature.' },
    { title: 'Octets non UTF-8', description: 'La chaîne Base64 est syntaxiquement recevable, mais le décodeur UTF-8 fatal la refuse. Le format d’origine est recherché au lieu d’accepter des caractères corrompus.' },
  ],
  notes: [
    'L’outil convertit du texte UTF-8, pas des fichiers binaires.',
    'Les espaces dans la chaîne Base64 sont retirés avant décodage.',
    'Base64URL avec `-` ou `_` n’est pas normalisé.',
    'Un préfixe `data:...;base64,` doit être retiré.',
    'Base64 est réversible, augmente souvent la taille et ne chiffre rien.',
  ],
  faq: [
    { q: 'Les accents et emoji sont-ils conservés ?', a: 'Oui si l’aller et le retour utilisent UTF-8. Le texte est d’abord transformé en octets UTF-8.' },
    { q: 'Puis-je coller un JWT ou du Base64URL ?', a: 'Non directement. Base64URL utilise `-` et `_`, et un JWT exige en plus une validation de structure et de signature.' },
    { q: 'Une Data URI complète est-elle acceptée ?', a: 'Non. Retirez tout le préfixe jusqu’à la virgule et collez seulement les données Base64.' },
    { q: 'Pourquoi une chaîne Base64 recevable peut-elle échouer ?', a: 'Les octets obtenus peuvent être binaires ou utiliser une autre table de caractères que UTF-8.' },
    { q: 'Base64 peut-il cacher un mot de passe ?', a: 'Non. La conversion est réversible sans clé et ne fournit ni confidentialité ni intégrité.' },
    { q: 'Le contenu est-il envoyé à FunnyTools ?', a: 'Non. L’encodage et le décodage s’effectuent localement dans cet onglet.' },
  ],
  labels: {
    input: 'Texte ou Base64',
    output: 'Résultat',
    placeholder: 'Collez du texte UTF-8 ou du Base64 standard…',
    encode: 'Encoder en Base64',
    decode: 'Décoder en UTF-8',
    copy: 'Copier le résultat',
    clear: 'Effacer',
    invalidBase64: 'Décodage impossible : vérifiez le Base64 standard et assurez-vous que les octets forment un texte UTF-8 valide.',
    copied: 'Résultat copié',
  },
  privacyNote: 'La conversion s’exécute localement dans cet onglet. FunnyTools ne reçoit ni ne conserve le texte ou le Base64 pour le traiter.',
  disclaimer: 'Base64 n’est pas un chiffrement. Ne collez aucun secret, n’exécutez pas de sortie inconnue et vérifiez UTF-8, alphabet et padding avec la source.',
};

export const frenchBase64Review = {
  heading: 'Comment vérifier une conversion Base64',
  intro: 'Une chaîne décodable confirme seulement une représentation d’octets ; il faut encore vérifier variante, jeu de caractères, origine et sécurité.',
  panels: [
    { title: 'Identifiez le format', text: 'Distinguez Base64 standard, Base64URL, Data URI et segment de JWT.' },
    { title: 'Confirmez UTF-8', text: 'L’aller-retour doit conserver exactement accents, emoji, espaces et retours.' },
    { title: 'Traitez comme donnée', text: 'N’exécutez ni commande ni URL inconnue et ne confondez pas encodage et chiffrement.' },
  ],
  checklistHeading: 'Liste de contrôle',
  checklist: [
    'L’entrée ne contient ni préfixe Data URI ni caractères Base64URL.',
    'Le système source déclare UTF-8 ou son encodage est connu.',
    'Le retour correspond exactement au texte original.',
    'La chaîne n’est pas utilisée pour dissimuler un secret.',
  ],
};
