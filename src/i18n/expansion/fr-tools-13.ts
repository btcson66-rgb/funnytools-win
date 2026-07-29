import type { ToolContent } from '../tools/_types';

export const frenchUrlEncoder: ToolContent = {
  name: 'Encoder et décoder un composant d’URL',
  short: 'Convertissez du texte Unicode en séquences percent-encoded ou relisez un composant URL sans modifier une adresse complète.',
  long: 'L’outil applique `encodeURIComponent()` et `decodeURIComponent()` dans le navigateur. Il convient à une valeur de paramètre, un fragment de chemin ou un petit texte destiné à une URL, mais pas à l’encodage aveugle d’une adresse entière. Les espaces deviennent `%20`, les accents utilisent leurs octets UTF-8 et un signe `+` n’est pas transformé automatiquement en espace au décodage.',
  seoTitle: 'Encoder ou décoder une URL avec pourcentages',
  seoDescription: 'Encodez un composant URL en UTF-8 percent-encoding ou décodez `%20`, accents et symboles. Différences avec URL complète et formulaire expliquées.',
  keywords: [
    'encoder URL en ligne',
    'décoder URL',
    'encodeURIComponent français',
    'décoder pourcentage URL',
    'convertir espace en %20',
    'percent encoding UTF-8',
    'encoder paramètre URL',
  ],
  capabilities: [
    'Encoder un texte Unicode avec `encodeURIComponent()`.',
    'Décoder une suite percent-encoded avec `decodeURIComponent()`.',
    'Traiter accents, emoji, espaces et caractères réservés en UTF-8.',
    'Signaler une séquence `%` incomplète ou des octets UTF-8 invalides.',
    'Copier la sortie sans envoyer la valeur à FunnyTools.',
  ],
  contentSections: [
    {
      heading: 'Réponse rapide : encoder ou décoder une valeur URL',
      paragraphs: [
        'Collez la valeur seule dans le champ, puis cliquez sur « Encoder le composant » pour obtenir des séquences `%XX`. `été à Paris` devient par exemple `été` sous forme d’octets UTF-8 encodés et l’espace devient `%20`. Pour revenir au texte, placez la chaîne encodée dans l’entrée et utilisez « Décoder le composant ». Une séquence mal formée provoque un message d’erreur au lieu d’un résultat partiel.',
        'L’opération porte sur un composant, pas sur toute une adresse. Si vous encodez `https://exemple.fr/recherche?q=été` en une seule fois, les deux-points, barres obliques, point d’interrogation et signe égal seront eux aussi protégés, ce qui détruit la structure de navigation. Séparez le chemin, les noms et valeurs de paramètres avec l’API `URL` ou `URLSearchParams`, puis encodez seulement la donnée qui en a besoin.',
      ],
    },
    {
      heading: 'Percent-encoding, UTF-8 et caractères français',
      paragraphs: [
        'Le percent-encoding représente chaque octet concerné par `%` suivi de deux chiffres hexadécimaux. Les lettres ASCII ordinaires restent généralement lisibles ; les lettres accentuées, emoji et caractères d’autres alphabets sont d’abord convertis en UTF-8, puis chaque octet est encodé. Un seul symbole visible peut donc produire plusieurs groupes `%XX`.',
        '`encodeURIComponent()` laisse aussi quelques signes non réservés tels que `-`, `_`, `.`, `!`, `~`, `*`, apostrophe et parenthèses. Cette liste vient de la fonction JavaScript, pas d’une règle métier propre à votre API. Un système peut exiger une normalisation plus stricte, une signature exacte ou une autre représentation. Comparez toujours avec sa documentation et testez l’aller-retour.',
      ],
      items: [
        'Les accents sont représentés à partir de leurs octets UTF-8.',
        'Un espace devient `%20` avec `encodeURIComponent()`.',
        'Les séparateurs réservés d’une URL sont encodés lorsqu’ils font partie de l’entrée.',
        'Le résultat ne valide ni domaine, ni protocole, ni destination.',
      ],
    },
    {
      heading: 'Composant URL et adresse complète : ne pas confondre',
      paragraphs: [
        'Une URL complète possède une structure : schéma, hôte, port éventuel, chemin, requête et fragment. Les caractères `:`, `/`, `?`, `&`, `=` et `#` séparent ces zones. `encodeURIComponent()` les encode parce qu’il suppose que tout le texte est une valeur. C’est utile pour un terme de recherche, mais incorrect pour envelopper une URL déjà assemblée.',
        'Pour ajouter une valeur à `?q=`, utilisez idéalement `new URL()` et `searchParams.set()`. Ces API conservent la structure et gèrent la sérialisation. Pour un segment de chemin, vérifiez si la barre `/` doit être un séparateur ou un caractère littéral. Ne concaténez jamais une entrée utilisateur à une redirection sans valider la destination et la politique de sécurité.',
      ],
    },
    {
      heading: 'Espace `%20`, signe `+` et formulaires',
      paragraphs: [
        'Dans une URL percent-encoded, l’espace devient `%20`. Le format historique `application/x-www-form-urlencoded`, utilisé par de nombreux formulaires et par `URLSearchParams`, peut représenter l’espace par `+`. `decodeURIComponent()` ne suit pas cette convention : il laisse `+` tel quel. Ainsi, `Jean+Dupont` devient toujours `Jean+Dupont` avec ce widget.',
        'Si l’entrée provient d’un formulaire, remplacez le `+` par un espace seulement si le format source le garantit, puis décodez les pourcentages. Ne faites pas ce remplacement sur une valeur où le plus est réel, par exemple une expression ou un indicatif. Les deux formats se ressemblent mais ne sont pas interchangeables sans contexte.',
      ],
    },
    {
      heading: 'Double encodage et séquences invalides',
      paragraphs: [
        'Encoder une valeur déjà protégée transforme le signe `%` en `%25`. `%20` devient alors `%2520` et un seul décodage redonne `%20`, pas un espace. Ce double encodage est fréquent lorsqu’une couche applicative et une bibliothèque encodent la même valeur. Conservez chaque étape et ne répétez l’opération que si le protocole demande réellement une valeur imbriquée.',
        'Le décodeur refuse un `%` sans deux chiffres hexadécimaux, ainsi que des octets qui ne forment pas un texte UTF-8 valide. L’encodeur peut aussi refuser une chaîne JavaScript contenant une moitié de paire surrogate isolée, souvent issue d’un texte corrompu. Corrigez la source plutôt que de supprimer arbitrairement le caractère signalé.',
      ],
    },
    {
      heading: 'Sécurité, confidentialité et vérification',
      paragraphs: [
        'L’encodage URL ne nettoie pas une valeur dangereuse. Une chaîne décodée peut contenir du JavaScript, un chemin de traversée, une redirection externe ou une tentative d’injection. Le percent-encoding facilite le transport ; il ne rend pas une entrée fiable. Validez la destination, imposez les protocoles autorisés et échappez selon le contexte de sortie.',
        'La conversion s’effectue dans cet onglet et FunnyTools ne reçoit pas la valeur pour la traiter. N’y collez pourtant aucun token de réinitialisation, clé API, URL privée ou donnée personnelle. Après conversion, comparez l’aller-retour, contrôlez `%20` et `+`, puis testez dans une adresse fictive avant de l’utiliser en production.',
      ],
    },
  ],
  instructions: [
    'Identifiez la valeur précise à encoder au lieu de coller une URL complète.',
    'Encodez ou décodez une copie sans secret ni donnée personnelle.',
    'Vérifiez accents, espaces, `+`, séparateurs réservés et éventuel double encodage.',
    'Assemblez l’adresse avec `URL` ou `URLSearchParams` lorsque c’est possible.',
    'Validez destination et sécurité dans le système cible avant publication.',
  ],
  examples: [
    'Encoder `été à Lyon` comme valeur d’un paramètre de recherche.',
    'Décoder `%C3%A9cole%20publique` vers un texte UTF-8.',
    'Constater qu’un `+` reste un plus avec `decodeURIComponent()`.',
    'Repérer `%2520` comme indice d’un double encodage.',
    'Éviter d’encoder en bloc `https://exemple.fr/?q=...`.',
  ],
  audience: [
    'Développeurs et équipes QA testant paramètres et routes.',
    'Rédacteurs techniques préparant des exemples d’URL.',
    'Équipes marketing contrôlant des valeurs UTM non sensibles.',
    'Personnes souhaitant relire localement une chaîne percent-encoded.',
  ],
  caseStudies: [
    { title: 'Recherche avec accent', description: 'Le terme `café ouvert` est encodé comme valeur de `q`, puis l’URL est construite séparément. L’aller-retour confirme accents et espace.' },
    { title: 'Valeur de formulaire contenant `+`', description: 'La source est identifiée comme formulaire avant de convertir les plus en espaces. Le widget seul les conserverait, conformément à `decodeURIComponent()`.' },
    { title: 'Paramètre encodé deux fois', description: 'La présence de `%252F` montre que `%2F` a été réencodé. L’équipe corrige la couche responsable au lieu d’ajouter plusieurs décodages aveugles.' },
  ],
  notes: [
    'Le widget utilise `encodeURIComponent()` et `decodeURIComponent()`.',
    'Il encode un composant, pas une adresse complète structurée.',
    'Un espace devient `%20` et `+` reste un signe plus au décodage.',
    'Une chaîne déjà encodée peut produire `%25` lors d’un second passage.',
    'L’encodage URL n’est ni validation, ni assainissement de sécurité.',
  ],
  faq: [
    { q: 'Puis-je encoder une URL complète ?', a: 'Ce n’est pas recommandé. Les séparateurs `:`, `/`, `?`, `&` et `=` seraient encodés ; traitez séparément chaque composant.' },
    { q: 'Pourquoi un espace devient-il `%20` et non `+` ?', a: '`encodeURIComponent()` utilise `%20`. Le signe `+` pour un espace appartient au format des formulaires URL-encoded.' },
    { q: 'Le décodeur transforme-t-il `+` en espace ?', a: 'Non. Il conserve `+`. Faites une conversion préalable seulement si la source est bien un formulaire.' },
    { q: 'Que signifie `%25` dans le résultat ?', a: 'C’est le signe `%` encodé. Il peut indiquer qu’une valeur déjà percent-encoded a été encodée une seconde fois.' },
    { q: 'L’encodage rend-il une valeur sûre ?', a: 'Non. Validez toujours protocole, domaine, destination et contexte de sortie.' },
    { q: 'La valeur est-elle envoyée à FunnyTools ?', a: 'Non. L’encodage et le décodage s’exécutent localement dans cet onglet.' },
  ],
  labels: {
    input: 'Texte ou composant URL',
    output: 'Résultat',
    placeholder: 'Collez une valeur, pas une URL contenant des secrets…',
    encode: 'Encoder le composant',
    decode: 'Décoder le composant',
    copy: 'Copier le résultat',
    clear: 'Effacer',
    invalidText: 'Encodage impossible : la chaîne contient peut-être un caractère Unicode incomplet.',
    invalidUrl: 'Décodage impossible : vérifiez les séquences `%XX` et les octets UTF-8.',
    copied: 'Résultat copié',
  },
  privacyNote: 'La valeur est encodée ou décodée localement dans cet onglet. FunnyTools ne reçoit pas le contenu pour le convertir.',
  disclaimer: 'Le percent-encoding ne valide ni ne sécurise une URL. N’encodez pas une adresse complète à l’aveugle et contrôlez toujours la destination.',
};

export const frenchUrlEncoderReview = {
  heading: 'Comment vérifier un composant URL',
  intro: 'Une chaîne encodée doit encore être replacée dans la bonne zone d’URL et contrôlée selon le format du système destinataire.',
  panels: [
    { title: 'Isolez la valeur', text: 'Séparez schéma, domaine, chemin, paramètres et fragment avant l’encodage.' },
    { title: 'Testez le retour', text: 'Décodez une copie et comparez accents, espaces, signes plus et séparateurs.' },
    { title: 'Validez la destination', text: 'L’encodage ne bloque ni redirection dangereuse ni injection dans un autre contexte.' },
  ],
  checklistHeading: 'Liste de contrôle',
  checklist: [
    'L’entrée est un composant et non une URL complète.',
    'La convention `%20` ou `+` correspond au format source.',
    'La valeur n’a pas été encodée deux fois.',
    'Le domaine, le protocole et la destination sont autorisés.',
  ],
};

export const frenchTimestampConverter: ToolContent = {
  name: 'Convertir un timestamp Unix en date',
  short: 'Transformez secondes ou millisecondes Unix en date locale, UTC et ISO 8601, avec détection automatique contrôlable.',
  long: 'Saisissez un timestamp Unix et choisissez secondes, millisecondes ou détection automatique. La page affiche la date selon le fuseau de votre appareil, la version UTC, ISO 8601, ainsi que les deux valeurs Unix. En mode automatique, une valeur absolue inférieure à 100 milliards est interprétée en secondes ; cette règle pratique devient ambiguë pour des dates très éloignées.',
  seoTitle: 'Convertir timestamp Unix en date UTC et locale',
  seoDescription: 'Convertissez un timestamp en secondes ou millisecondes vers date locale, UTC et ISO 8601. Fuseau, seuil automatique et limites expliqués.',
  keywords: [
    'convertir timestamp Unix',
    'timestamp en date',
    'convertisseur epoch secondes',
    'timestamp millisecondes',
    'Unix time vers ISO 8601',
    'date UTC timestamp',
    'heure epoch en français',
  ],
  capabilities: [
    'Interpréter explicitement un nombre en secondes ou millisecondes Unix.',
    'Détecter automatiquement l’unité avec un seuil documenté.',
    'Afficher date locale, UTC, ISO 8601, secondes et millisecondes.',
    'Insérer l’instant actuel en millisecondes.',
    'Copier la représentation ISO lorsque la conversion est valide.',
  ],
  contentSections: [
    {
      heading: 'Réponse rapide : convertir un timestamp Unix',
      paragraphs: [
        'Collez le nombre, sélectionnez son unité puis cliquez sur « Convertir ». Pour `0` en secondes, l’ISO obtenu est `1970-01-01T00:00:00.000Z`. La date locale peut afficher une autre heure selon le fuseau configuré sur l’appareil, tandis que UTC et ISO décrivent le même instant avec le méridien zéro. Le bouton « Maintenant » remplit un timestamp en millisecondes et actualise tous les formats.',
        'Si vous connaissez l’unité, choisissez-la explicitement. Dix chiffres représentent souvent des secondes contemporaines et treize chiffres des millisecondes, mais la longueur n’est pas une preuve universelle. Une valeur négative décrit un instant antérieur à l’époque Unix. Gardez la source et vérifiez l’unité dans l’API, le journal ou la base qui a produit le nombre.',
      ],
    },
    {
      heading: 'Secondes, millisecondes et seuil automatique',
      paragraphs: [
        'JavaScript construit ses dates à partir de millisecondes. En mode secondes, le widget multiplie donc la valeur par 1 000 ; en mode millisecondes, il l’utilise directement. Le mode automatique considère comme secondes toute valeur dont l’absolu est inférieur à `100000000000`, et comme millisecondes toute valeur égale ou supérieure à ce seuil.',
        'Cette heuristique couvre les timestamps modernes les plus courants, mais elle n’identifie pas le format. Un ancien timestamp en millisecondes avec peu de chiffres ou une date très lointaine en secondes peut être mal classé. Comparez l’année produite avec le contexte, puis forcez l’unité si elle est invraisemblable. Le widget ne reconnaît ni microsecondes ni nanosecondes.',
      ],
      items: [
        'Mode secondes : valeur × 1 000 avant création de la date.',
        'Mode millisecondes : valeur utilisée directement.',
        'Mode auto : seuil absolu de 100 milliards.',
        'Microsecondes et nanosecondes doivent être converties en amont.',
      ],
    },
    {
      heading: 'Date locale, UTC et ISO 8601',
      paragraphs: [
        'La date locale utilise `toLocaleString("fr")` et le fuseau de l’appareil. Deux personnes peuvent donc voir des heures différentes pour le même timestamp. La ligne UTC utilise une chaîne GMT lisible ; l’ISO suit la forme normalisée avec suffixe `Z`, par exemple `2026-07-30T12:00:00.000Z`.',
        'Le fuseau n’est pas contenu dans un timestamp Unix : celui-ci représente un instant écoulé depuis l’époque. Les règles de changement d’heure proviennent du navigateur et du système. Pour un rendez-vous civil futur, conservez aussi le nom de zone IANA, tel que `Europe/Paris`, car une simple heure locale ou un décalage fixe ne décrit pas toutes les transitions.',
      ],
    },
    {
      heading: 'Fractions, arrondi et précision numérique',
      paragraphs: [
        'L’entrée passe par le type `Number`, qui accepte notamment un signe, une décimale et parfois la notation scientifique. Une fraction de seconde peut donc produire des millisecondes. La sortie en secondes applique `Math.floor(ms / 1000)` : pour un instant négatif non entier, cela arrondit vers l’entier inférieur et non vers zéro.',
        'Les très grands nombres perdent de la précision dans JavaScript avant même que la date soit construite. La plage valide de `Date` est limitée et une valeur hors plage déclenche une erreur. Pour des horodatages haute précision, des nanosecondes ou un usage probant, utilisez un type entier adapté et la bibliothèque imposée par le système source.',
      ],
    },
    {
      heading: 'Époque Unix, secondes intercalaires et sens métier',
      paragraphs: [
        'L’époque Unix commence le 1er janvier 1970 à 00:00:00 UTC. Les timestamps négatifs représentent des instants antérieurs. La représentation courante ne modélise pas les secondes intercalaires comme une seconde numérotée supplémentaire ; ne l’utilisez pas pour reconstruire seul une chronologie astronomique ou métrologique.',
        'Une conversion correcte ne prouve pas que la valeur désigne la création, la modification, l’expiration ou l’envoi. Les journaux peuvent aussi utiliser l’heure serveur, le client ou une durée plutôt qu’un instant. Lisez le nom du champ, l’unité et la documentation avant d’interpréter le résultat dans un incident ou une décision.',
      ],
    },
    {
      heading: 'Confidentialité et méthode de vérification',
      paragraphs: [
        'Le nombre est converti dans cet onglet. FunnyTools ne reçoit pas le timestamp pour produire la date. Le bouton de copie prend uniquement la chaîne ISO visible. Évitez néanmoins de coller un journal contenant identifiants, token ou autres données adjacentes : isolez le nombre utile.',
        'Vérifiez d’abord l’unité, puis comparez ISO et UTC, contrôlez le fuseau local et confrontez l’année à l’événement attendu. Pour une expiration, testez aussi une valeur connue fournie par l’API. Un convertisseur aide à lire l’instant ; il ne certifie ni la provenance, ni l’exactitude de l’horloge source.',
      ],
    },
  ],
  instructions: [
    'Isolez le nombre et confirmez si la source parle de secondes ou millisecondes.',
    'Choisissez l’unité explicite, ou utilisez auto puis contrôlez l’année.',
    'Comparez date locale, UTC et ISO pour repérer un problème de fuseau.',
    'Vérifiez fractions, valeurs négatives et définition du champ métier.',
    'Copiez l’ISO et testez-le dans le système cible sans remplacer la source.',
  ],
  examples: [
    'Convertir `0` seconde vers l’époque Unix en UTC.',
    'Lire un timestamp contemporain de 13 chiffres comme millisecondes.',
    'Comparer la même valeur en heure française locale et en UTC.',
    'Forcer l’unité lorsqu’une année automatique paraît impossible.',
    'Examiner une valeur négative antérieure à 1970.',
  ],
  audience: [
    'Développeurs et équipes QA vérifiant API, logs et bases.',
    'Support technique analysant une date d’expiration ou d’événement.',
    'Analystes comparant des systèmes qui n’utilisent pas la même unité.',
    'Personnes souhaitant une conversion locale sans compte.',
  ],
  caseStudies: [
    { title: 'Dix ou treize chiffres', description: 'L’équipe consulte la documentation au lieu de se fier uniquement à la longueur. Elle force secondes ou millisecondes et compare l’année à un événement connu.' },
    { title: 'Décalage de deux heures', description: 'UTC et ISO coïncident, mais l’affichage local applique le fuseau et l’heure d’été de l’appareil. Le timestamp représente bien le même instant.' },
    { title: 'Champ `expires_at`', description: 'La date est correctement convertie, puis comparée à l’horloge serveur et à la définition de l’API. Le résultat n’est pas présenté comme une preuve d’autorisation.' },
  ],
  notes: [
    'Le mode automatique utilise un seuil absolu de 100 milliards.',
    'La date locale dépend du fuseau et des réglages de l’appareil.',
    'La sortie secondes applique un arrondi vers l’entier inférieur.',
    'Les microsecondes, nanosecondes et dates hors plage ne sont pas prises en charge.',
    'La conversion ne détermine pas la signification métier du champ.',
  ],
  faq: [
    { q: 'Comment savoir si le timestamp est en secondes ?', a: 'Consultez la source. Dix chiffres sont fréquents pour des secondes modernes, mais seule la documentation confirme l’unité.' },
    { q: 'Que fait le mode automatique ?', a: 'Il traite une valeur absolue inférieure à 100 milliards comme secondes, sinon comme millisecondes.' },
    { q: 'Pourquoi l’heure locale diffère-t-elle de UTC ?', a: 'La date locale applique le fuseau de l’appareil ; UTC et ISO utilisent le méridien zéro.' },
    { q: 'Les microsecondes sont-elles acceptées ?', a: 'Non directement. Convertissez-les en millisecondes ou utilisez un outil prenant en charge cette précision.' },
    { q: 'Puis-je convertir une date en timestamp ?', a: 'Ce widget part d’un nombre Unix. Il n’analyse pas un texte de date saisi librement.' },
    { q: 'Le timestamp est-il envoyé à FunnyTools ?', a: 'Non. Toutes les conversions s’effectuent localement dans cet onglet.' },
  ],
  labels: {
    locale: 'fr-FR',
    input: 'Timestamp Unix',
    unit: 'Unité de l’entrée',
    auto: 'Détection automatique',
    seconds: 'Secondes',
    milliseconds: 'Millisecondes',
    convert: 'Convertir',
    now: 'Utiliser maintenant',
    copy: 'Copier l’ISO',
    local: 'Date locale',
    utc: 'Date UTC',
    iso: 'ISO 8601',
    unixSeconds: 'Unix en secondes',
    unixMilliseconds: 'Unix en millisecondes',
    invalid: 'Timestamp invalide ou date hors de la plage prise en charge.',
  },
  privacyNote: 'Le timestamp est converti localement dans cet onglet. FunnyTools ne reçoit pas le nombre pour calculer les dates.',
  disclaimer: 'Confirmez l’unité, le fuseau et le sens du champ auprès du système source. Une date lisible ne prouve pas la provenance de l’horodatage.',
};

export const frenchTimestampConverterReview = {
  heading: 'Comment vérifier une date issue d’un timestamp',
  intro: 'La conversion n’est fiable que si l’unité, le fuseau et la signification du champ ont été confirmés.',
  panels: [
    { title: 'Forcez l’unité', text: 'Préférez secondes ou millisecondes explicites lorsque la documentation est disponible.' },
    { title: 'Comparez les zones', text: 'UTC et ISO décrivent l’instant ; l’affichage local dépend de l’appareil.' },
    { title: 'Contrôlez le contexte', text: 'Vérifiez année, événement attendu, horloge source et définition du champ.' },
  ],
  checklistHeading: 'Liste de contrôle',
  checklist: [
    'L’unité vient de la source et non d’une simple supposition.',
    'L’année et l’instant correspondent à un exemple connu.',
    'Le fuseau local est identifié.',
    'La valeur n’est pas confondue avec une durée ou un identifiant.',
  ],
};

export const frenchUuidGenerator: ToolContent = {
  name: 'Générateur d’UUID v4 aléatoires',
  short: 'Créez de 1 à 100 UUID version 4 dans le navigateur, en minuscules, majuscules ou sans tirets.',
  long: 'Le générateur appelle `crypto.randomUUID()` pour chaque identifiant. Vous pouvez produire de 1 à 100 valeurs, garder la forme canonique en minuscules, passer les lettres hexadécimales en majuscules ou retirer les tirets. La version et les bits de variante restent ceux d’un UUID v4, mais la forme sans tirets n’est plus la représentation canonique. Un UUID est un identifiant, pas un secret.',
  seoTitle: 'Générateur UUID v4 aléatoire en ligne',
  seoDescription: 'Générez 1 à 100 UUID v4 avec crypto.randomUUID, en minuscules, majuscules ou sans tirets. Copie et fichier texte locaux.',
  keywords: [
    'générateur UUID v4',
    'générer UUID aléatoire',
    'UUID en ligne',
    'créer plusieurs UUID',
    'GUID aléatoire',
    'UUID sans tirets',
    'crypto randomUUID',
  ],
  capabilities: [
    'Générer de 1 à 100 UUID v4 à partir de l’API cryptographique du navigateur.',
    'Afficher la forme canonique minuscule ou une variante en majuscules.',
    'Retirer les quatre tirets pour obtenir 32 caractères hexadécimaux.',
    'Copier une liste avec un identifiant par ligne.',
    'Télécharger la sortie dans un fichier texte `uuids.txt`.',
  ],
  contentSections: [
    {
      heading: 'Réponse rapide : générer des UUID v4',
      paragraphs: [
        'Choisissez le nombre de valeurs et leur présentation, puis cliquez sur « Générer les UUID ». Le champ est ramené entre 1 et 100 et une valeur décimale est tronquée. Chaque ligne provient d’un nouvel appel à `crypto.randomUUID()`. Utilisez « Copier la liste » ou téléchargez `uuids.txt` lorsque la sortie a été vérifiée.',
        'La forme canonique ressemble à `xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx` avec des chiffres hexadécimaux. Le `4` indique la version 4 et les bits de `y` indiquent la variante normalisée. Passer en majuscules ou retirer les tirets ne crée pas un nouvel UUID : seule la représentation textuelle change.',
      ],
    },
    {
      heading: 'UUID v4, hasard cryptographique et navigateur',
      paragraphs: [
        '`crypto.randomUUID()` s’appuie sur le générateur cryptographiquement sûr exposé par la Web Crypto API. Le composant n’utilise ni `Math.random()`, ni horloge, ni adresse réseau pour construire les identifiants. Le navigateur fixe également les bits requis pour la version et la variante.',
        'L’API demande un navigateur moderne et un contexte sécurisé. Si elle n’est pas disponible, la page affiche une erreur au lieu de fabriquer un identifiant plus faible. FunnyTools ne reçoit pas les UUID pour les créer. Pour un environnement ancien ou une plateforme réglementée, utilisez la bibliothèque approuvée par le projet et conservez sa version.',
      ],
      items: [
        'Version : UUID v4 aléatoire.',
        'Source : `crypto.randomUUID()` du navigateur.',
        'Quantité : minimum 1, maximum 100 par génération.',
        'Sortie : une valeur par ligne, sans stockage côté FunnyTools.',
      ],
    },
    {
      heading: 'Format canonique, majuscules et retrait des tirets',
      paragraphs: [
        'Un UUID canonique contient 36 caractères : 32 chiffres hexadécimaux et quatre tirets aux positions définies. Le format minuscule est courant dans les URL et bases, mais la casse n’altère pas la valeur hexadécimale lorsque le système compare sans sensibilité. La variante majuscule sert seulement aux intégrations qui imposent cette présentation.',
        'Le format sans tirets contient 32 caractères. Il peut être accepté par certaines bases ou API, mais ce n’est plus la chaîne canonique. Le widget ne place pas d’accolades, ne produit pas de préfixe `urn:uuid:` et ne valide pas les contraintes du champ cible. Vérifiez longueur, casse et séparateurs attendus avant import.',
      ],
    },
    {
      heading: 'Unicité probable et gestion des collisions',
      paragraphs: [
        'L’espace aléatoire d’un UUID v4 est immense, ce qui rend une collision extrêmement improbable pour un usage normal. « Très improbable » ne signifie toutefois pas « mathématiquement impossible ». Un système robuste impose encore une contrainte d’unicité dans la base et sait réessayer une insertion si une collision est détectée.',
        'Le navigateur ne vérifie pas si une valeur existe déjà dans votre application, car il n’a accès ni à la base ni aux UUID précédents. Pour une migration, contrôlez les doublons dans le jeu complet après génération. Ne remplacez pas une clé métier stable par des UUID sans planifier références, index, taille et stratégie de réplication.',
      ],
    },
    {
      heading: 'UUID n’est ni mot de passe ni jeton secret',
      paragraphs: [
        'Un UUID v4 peut être difficile à deviner, mais il reste conçu comme identifiant. Il ne fournit ni signature, ni expiration, ni autorisation. Ne l’utilisez pas seul comme mot de passe, clé API, jeton de session ou preuve d’accès. Une URL contenant un UUID peut être copiée, enregistrée dans un journal ou transmise par le référent.',
        'Pour une capacité secrète, utilisez un jeton dimensionné selon le modèle de menace, stocké et comparé conformément aux règles de sécurité du produit. Pour authentifier une requête, appliquez le mécanisme prévu par l’API. Le fait que la génération utilise une source cryptographique ne transforme pas l’identifiant en contrôle d’accès.',
      ],
    },
    {
      heading: 'Confidentialité, copie et validation',
      paragraphs: [
        'La liste est générée dans cet onglet. Le téléchargement crée localement un petit Blob texte avec un saut de ligne final, puis libère son URL temporaire. FunnyTools ne conserve pas les valeurs. Le presse-papiers reste soumis aux permissions du navigateur et peut être lu par d’autres applications de l’appareil.',
        'Après génération, comptez les lignes, vérifiez la version en quatrième groupe, le format et l’absence de doublon dans votre lot. Testez une valeur dans une copie de l’intégration avant un import massif. Pour une base, gardez la contrainte UNIQUE et choisissez le type UUID natif lorsqu’il existe au lieu d’un texte arbitraire.',
      ],
    },
  ],
  instructions: [
    'Choisissez une quantité entière entre 1 et 100.',
    'Sélectionnez minuscules, majuscules ou sans tirets selon le contrat cible.',
    'Générez puis vérifiez nombre de lignes, version et format.',
    'Copiez ou téléchargez la liste et testez une valeur dans l’intégration.',
    'Conservez une contrainte d’unicité et n’utilisez pas l’UUID comme secret.',
  ],
  examples: [
    'Créer cinq UUID canoniques pour des données de test.',
    'Produire une liste majuscule exigée par une ancienne intégration.',
    'Retirer les tirets pour un champ de 32 caractères documenté.',
    'Télécharger cent identifiants fictifs dans `uuids.txt`.',
    'Refuser d’utiliser un UUID comme jeton d’authentification.',
  ],
  audience: [
    'Développeurs préparant fixtures, enregistrements et tests.',
    'Équipes QA ayant besoin d’identifiants non séquentiels.',
    'Administrateurs important une petite liste dans un système documenté.',
    'Enseignants illustrant structure et usage d’un UUID v4.',
  ],
  caseStudies: [
    { title: 'Jeu de données de test', description: 'Dix UUID minuscules sont générés, vérifiés et utilisés dans un environnement isolé. La base conserve une contrainte d’unicité.' },
    { title: 'Champ sans tirets', description: 'La documentation exige 32 hexadécimaux. Le format sans tirets est choisi, mais la valeur canonique est conservée dans le rapport de migration.' },
    { title: 'Lien privé mal conçu', description: 'Un UUID était utilisé comme seule protection. L’équipe ajoute authentification et autorisation, car un identifiant aléatoire n’est pas un secret durable.' },
  ],
  notes: [
    'La quantité est tronquée puis limitée de 1 à 100.',
    'La génération utilise `crypto.randomUUID()` dans un contexte compatible.',
    'Majuscules et retrait des tirets changent seulement la représentation.',
    'Une collision reste théoriquement possible ; la base doit imposer l’unicité.',
    'Un UUID ne remplace ni mot de passe, ni token, ni autorisation.',
  ],
  faq: [
    { q: 'Quelle version d’UUID est générée ?', a: 'Uniquement la version 4, aléatoire, via `crypto.randomUUID()`.' },
    { q: 'Puis-je générer plus de 100 UUID ?', a: 'Pas en une opération. Le champ est limité à 100 pour garder un usage contrôlable dans le navigateur.' },
    { q: 'Retirer les tirets change-t-il la valeur ?', a: 'Les 32 chiffres hexadécimaux restent identiques, mais la chaîne n’est plus au format canonique.' },
    { q: 'Deux UUID peuvent-ils être identiques ?', a: 'La probabilité est extrêmement faible, pas nulle. Utilisez toujours une contrainte UNIQUE et gérez un éventuel conflit.' },
    { q: 'Un UUID v4 est-il un secret sécurisé ?', a: 'Non. C’est un identifiant ; il ne porte ni autorisation, ni expiration, ni signature.' },
    { q: 'Les UUID sont-ils envoyés à FunnyTools ?', a: 'Non. La génération, la copie et le fichier texte sont produits localement dans cet onglet.' },
  ],
  labels: {
    count: 'Nombre d’UUID',
    format: 'Présentation',
    lower: 'Canonique en minuscules',
    upper: 'Canonique en majuscules',
    noHyphen: 'Sans tirets',
    generate: 'Générer les UUID',
    copy: 'Copier la liste',
    download: 'Télécharger uuids.txt',
    output: 'UUID générés',
    unsupported: 'La génération UUID sécurisée n’est pas disponible dans ce navigateur.',
  },
  privacyNote: 'Les UUID sont générés localement avec la Web Crypto API. FunnyTools ne reçoit ni ne conserve la liste.',
  disclaimer: 'Un UUID v4 est un identifiant, pas un secret. Conservez une contrainte d’unicité et utilisez l’authentification prévue par votre système.',
};

export const frenchUuidGeneratorReview = {
  heading: 'Comment vérifier une liste d’UUID v4',
  intro: 'Une génération réussie doit encore être validée selon le format du champ, les contraintes de la base et le modèle de sécurité.',
  panels: [
    { title: 'Contrôlez la structure', text: 'Vérifiez quantité, 36 ou 32 caractères, version 4 et représentation attendue.' },
    { title: 'Imposez l’unicité', text: 'La base doit refuser un doublon et permettre une nouvelle génération en cas de conflit.' },
    { title: 'Séparez identité et accès', text: 'N’utilisez jamais l’UUID seul comme mot de passe ou autorisation.' },
  ],
  checklistHeading: 'Liste de contrôle',
  checklist: [
    'Le lot contient exactement le nombre demandé.',
    'Le format correspond au type ou au contrat cible.',
    'Une contrainte UNIQUE existe dans le stockage.',
    'L’accès aux ressources ne dépend pas seulement de l’UUID.',
  ],
};
