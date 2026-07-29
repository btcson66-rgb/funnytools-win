import type { ToolContent } from '../tools/_types';

export const frenchPasswordGenerator: ToolContent = {
  name: 'Générateur de mots de passe sécurisés',
  short: 'Créez localement un mot de passe aléatoire de 4 à 64 caractères avec les catégories compatibles avec votre compte.',
  long: 'Choisissez longueur, majuscules, minuscules, chiffres et symboles. Le générateur exige `crypto.getRandomValues`, applique un échantillonnage par rejet afin d’éviter le biais du modulo et garantit au moins un caractère de chaque catégorie cochée. La valeur n’est pas enregistrée par FunnyTools. Pour un vrai compte, utilisez une longueur importante, une valeur différente par service, un gestionnaire de mots de passe et un second facteur ou une passkey lorsque le fournisseur le permet.',
  seoTitle: 'Générateur de mot de passe sécurisé et aléatoire',
  seoDescription: 'Générez un mot de passe fort avec crypto.getRandomValues, 4 à 64 caractères, lettres, chiffres, symboles et option sans O0l1I.',
  keywords: [
    'générateur de mot de passe sécurisé',
    'générer mot de passe aléatoire',
    'créer mot de passe fort',
    'mot de passe 16 caractères',
    'mot de passe lettres chiffres symboles',
    'générateur mot de passe sans O0l1I',
    'crypto getRandomValues mot de passe',
  ],
  capabilities: [
    'Choisir une longueur comprise entre 4 et 64 caractères.',
    'Combiner majuscules, minuscules, chiffres et symboles selon le formulaire cible.',
    'Garantir au moins un caractère de chaque catégorie sélectionnée.',
    'Utiliser `crypto.getRandomValues` et refuser de générer si la source sûre manque.',
    'Exclure O, 0, l, 1 et I lorsque la saisie doit être faite à la main.',
  ],
  contentSections: [
    {
      heading: 'Réponse rapide : créer un mot de passe robuste',
      paragraphs: [
        'Pour un compte réel, commencez avec 16 caractères ou davantage si le service l’accepte, gardez les quatre catégories lorsqu’elles sont autorisées, puis cliquez sur « Générer un mot de passe ». Copiez immédiatement la valeur dans un gestionnaire fiable et associez-la à un seul domaine. Si le formulaire interdit certains symboles ou impose une longueur maximale, adaptez les cases avant de remplacer l’ancien accès.',
        'Le curseur descend jusqu’à quatre caractères pour tester des validateurs et des maquettes. Une sortie aussi courte ne convient pas à l’authentification. L’ANSSI rappelle qu’un mot de passe doit être suffisamment long, complexe et aléatoire, distinct pour chaque accès, et recommande d’activer la double authentification. La longueur seule ne compense toutefois ni réutilisation, ni hameçonnage, ni appareil compromis.',
      ],
    },
    {
      heading: 'Source aléatoire : crypto.getRandomValues, pas Math.random',
      paragraphs: [
        'Le widget obtient des entiers de 32 bits avec `window.crypto.getRandomValues`, l’API cryptographique du navigateur. Pour choisir un caractère, il rejette les valeurs situées au-delà du plus grand multiple exact de la taille de l’alphabet. Cette étape évite qu’un simple reste de division favorise certaines positions lorsque le nombre de caractères possibles ne divise pas exactement 2³².',
        'Si l’API sécurisée est indisponible, la page affiche une erreur et laisse la sortie vide ; elle ne bascule pas vers `Math.random`. Cette différence est essentielle pour un secret. Elle ne protège cependant pas contre une extension hostile, un logiciel espion, une capture d’écran ou un historique de presse-papiers synchronisé. Générez sur un appareil à jour et contrôlé.',
      ],
    },
    {
      heading: 'Longueur, catégories et politiques parfois contradictoires',
      paragraphs: [
        'Chaque catégorie cochée fournit un caractère obligatoire ; les positions restantes sont tirées dans l’ensemble combiné, puis toute la chaîne est mélangée. Une majuscule ou un symbole ne reste donc pas systématiquement au début ou à la fin. Plus la chaîne s’allonge, plus l’espace de recherche augmente, à condition que les choix soient réellement aléatoires et que la valeur reste secrète.',
        'Les recommandations ne s’adressent pas toujours au même public. L’ANSSI propose au grand public un repère de douze caractères minimum avec plusieurs catégories. NIST SP 800-63B-4, destiné aux services qui vérifient les mots de passe, demande surtout de permettre une grande longueur, les gestionnaires, l’autoremplissage et le collage, et déconseille d’imposer des règles de composition arbitraires. Ce générateur permet de satisfaire un formulaire existant ; il ne prétend pas définir sa bonne politique.',
      ],
    },
    {
      heading: 'Comprendre la jauge faible, correct, fort ou très fort',
      paragraphs: [
        'La jauge est une heuristique locale fondée sur la longueur et le nombre de catégories. Elle repère rapidement une configuration très courte, mais ne calcule pas une entropie certifiée, ne recherche pas la chaîne dans des fuites et ne connaît ni le stockage du fournisseur ni sa limitation des tentatives. Un résultat « très fort » peut être mauvais s’il est déjà utilisé ailleurs ou visible dans une note partagée.',
        'Un temps de cassage dépend du scénario : attaque en ligne limitée, base de hashes volée, fonction de dérivation lente ou stockage défaillant. La barre ne peut pas convertir ces hypothèses en durée fiable. Elle ne teste pas non plus le domaine, le phishing, la récupération du compte, le MFA ou les sessions déjà ouvertes. Utilisez-la comme alerte ergonomique, jamais comme certification.',
      ],
    },
    {
      heading: 'Un secret unique par service et un gestionnaire',
      paragraphs: [
        'La réutilisation transforme une fuite isolée en attaque par credential stuffing. Si la même chaîne ouvre un commerce, la messagerie et un réseau social, l’attaquant n’a pas besoin de la deviner une seconde fois. Enregistrez un mot de passe indépendant sous l’adresse exacte du service. Un gestionnaire permet de conserver des valeurs longues sans fabriquer des variantes prévisibles comme le nom du site suivi de l’année.',
        'Avant de coller, vérifiez le nom de domaine et l’origine de la page. Une chaîne aléatoire ne résiste pas au hameçonnage lorsqu’elle est donnée à un faux formulaire. Les passkeys et clés de sécurité peuvent offrir une meilleure résistance à ce type d’attaque. Lorsque seule une authentification classique existe, activez au minimum un second facteur approprié et conservez les codes de récupération séparément.',
      ],
    },
    {
      heading: 'Quand exclure O, 0, l, 1 et I',
      paragraphs: [
        'La case d’exclusion retire précisément O majuscule, zéro, l minuscule, un et I majuscule. Elle réduit les erreurs lorsqu’un accès temporaire doit être lu sur papier, dicté ou saisi dans une police ambiguë. Elle ne supprime pas tous les caractères ressemblants et ne rend pas le mot de passe mémorisable. Pour une valeur gérée par autoremplissage, l’option apporte généralement peu.',
        'Retirer cinq signes réduit légèrement l’alphabet ; compensez par quelques caractères supplémentaires. Si le service interdit une ponctuation précise, le widget ne permet pas de personnaliser l’alphabet symbole par symbole. Décochez éventuellement toute la catégorie ou utilisez le générateur intégré au gestionnaire approuvé par votre organisation, qui connaît mieux la politique du compte.',
      ],
    },
    {
      heading: 'Presse-papiers, affichage et traces sur l’appareil',
      paragraphs: [
        'Le bouton de copie place le secret dans le presse-papiers. Windows, macOS, Android, iOS, une session distante ou une extension peuvent conserver un historique. Collez dans le gestionnaire ou le formulaire correct, puis effacez l’historique lorsque votre environnement le permet. Évitez les postes publics, les visioconférences avec partage d’écran et les conversations où le nom du compte accompagne le secret.',
        'FunnyTools ne maintient aucun historique et ne peut pas récupérer une valeur après fermeture ou régénération. Cela n’efface pas automatiquement les traces créées par le système d’exploitation. N’enregistrez pas une capture « pour plus tard ». Pour un accès professionnel partagé, utilisez la fonction de partage du coffre-fort de l’entreprise et retirez l’autorisation dès qu’elle n’est plus nécessaire.',
      ],
    },
    {
      heading: 'Ce générateur ne produit pas de clé cryptographique',
      paragraphs: [
        'La sortie est conçue pour un champ de mot de passe. Ne l’utilisez pas comme seed de portefeuille, phrase de récupération, clé AES, secret JWT, clé API, token de signature ou matériel cryptographique d’infrastructure. Ces usages imposent une taille en bits, un encodage, une dérivation, une rotation et un stockage spécifiques. Suivez la bibliothèque ou la procédure officielle du système concerné.',
        'La page ne consulte pas de base de mots de passe compromis, car cela nécessiterait une autre architecture et une analyse du risque de divulgation. Une valeur nouvellement tirée a peu de chances de coïncider par hasard, sans que cela constitue une attestation. Les services doivent appliquer leurs propres blocklists, limitation de débit, hashes adaptés et surveillance des accès.',
      ],
    },
  ],
  instructions: [
    'Lisez la politique du compte et choisissez une longueur généreuse.',
    'Cochez les catégories acceptées et n’excluez O0l1I qu’en cas de saisie manuelle.',
    'Générez puis vérifiez longueur, catégories et absence de message d’erreur cryptographique.',
    'Copiez directement vers un gestionnaire et réservez la valeur à un seul service.',
    'Testez la connexion, activez MFA ou passkey et protégez la récupération.',
  ],
  examples: [
    'Créer 20 caractères uniques pour une nouvelle messagerie.',
    'Tester un formulaire qui exige majuscule, chiffre et symbole.',
    'Produire un accès Wi-Fi temporaire sans caractères ambigus.',
    'Remplacer une chaîne réutilisée puis l’enregistrer dans un coffre-fort.',
  ],
  audience: [
    'Personnes créant un compte sans vouloir réutiliser un secret.',
    'Équipes QA testant plusieurs politiques de validation.',
    'Administration préparant un accès temporaire à saisir manuellement.',
    'Utilisateurs de gestionnaires voulant générer localement.',
  ],
  caseStudies: [
    { title: 'Compte distinct avec MFA', description: 'Une personne crée 20 caractères, enregistre le domaine exact dans son gestionnaire et active un second facteur. La chaîne n’est ni mémorisée ailleurs ni réutilisée.' },
    { title: 'Symboles refusés par un ancien portail', description: 'Le formulaire annonce sa liste compatible. Les symboles sont décochés, la longueur est augmentée et une nouvelle valeur est générée au lieu d’éditer la précédente.' },
    { title: 'Accès temporaire dicté', description: 'O0l1I sont exclus et la longueur est renforcée. Le mot de passe est changé après l’événement, car sa circulation humaine reste un risque.' },
  ],
  notes: [
    'Le minimum de 4 caractères sert aux tests, pas à un compte réel.',
    'La jauge mesure seulement longueur et variété.',
    'La valeur n’est ni sauvegardée ni vérifiée dans une fuite.',
    'La génération locale ne protège pas contre phishing, malware ou presse-papiers.',
    'N’utilisez pas cette sortie comme seed ou clé cryptographique.',
  ],
  faq: [
    { q: 'Le générateur utilise-t-il Math.random ?', a: 'Non. Il exige `crypto.getRandomValues` et un échantillonnage par rejet. Sans cette API, il affiche une erreur.' },
    { q: 'Quelle longueur choisir pour un mot de passe ?', a: 'Cela dépend du service. Seize caractères aléatoires ou davantage constituent un point de départ pratique lorsque la politique les accepte.' },
    { q: 'Chaque catégorie cochée apparaît-elle ?', a: 'Oui. Au moins un caractère est pris dans chaque groupe sélectionné, puis l’ensemble est mélangé.' },
    { q: '« Très fort » garantit-il la sécurité du compte ?', a: 'Non. La jauge ignore réutilisation, fuite, phishing, appareil, stockage du fournisseur, MFA et récupération.' },
    { q: 'Le mot de passe est-il envoyé à FunnyTools ?', a: 'Non. Il est généré dans l’onglet. Le presse-papiers et le système d’exploitation peuvent néanmoins le traiter.' },
    { q: 'Pourquoi le site cible refuse-t-il la valeur ?', a: 'Il peut limiter longueur ou symboles. Suivez son message, ajustez les catégories et générez une nouvelle chaîne compatible.' },
  ],
  labels: {
    length: 'Longueur du mot de passe',
    uppercase: 'Lettres majuscules',
    lowercase: 'Lettres minuscules',
    numbers: 'Chiffres',
    symbols: 'Symboles',
    excludeAmbiguous: 'Exclure les caractères ambigus O0l1I',
    generate: 'Générer un mot de passe',
    copy: 'Copier le mot de passe',
    result: 'Mot de passe généré',
    strength: 'Indication',
    weak: 'Faible',
    fair: 'Correct',
    strong: 'Fort',
    veryStrong: 'Très fort',
    selectOneError: 'Sélectionnez au moins une catégorie de caractères.',
    cryptoError: 'Ce navigateur ne fournit pas de source aléatoire sûre. Aucun mot de passe n’a été généré.',
    copied: 'Mot de passe copié',
  },
  sources: [
    { label: 'ANSSI — 10 règles d’or de la sécurité numérique', href: 'https://cyber.gouv.fr/securisation/10-regles-or-securite-numerique/', note: 'Longueur, unicité, gestionnaire et double authentification pour le public français.' },
    { label: 'NIST SP 800-63B-4 — Passwords', href: 'https://pages.nist.gov/800-63-4/sp800-63b/passwords/', note: 'Longueur, limites des règles de composition et scénarios d’attaque.' },
    { label: 'NIST SP 800-63B-4 — Authenticator management', href: 'https://pages.nist.gov/800-63-4/sp800-63b.html', note: 'Gestionnaires, collage, blocklists et exigences imposées aux vérificateurs.' },
  ],
  privacyNote: 'La valeur est générée avec l’API cryptographique du navigateur et n’est pas envoyée à FunnyTools. Protégez ensuite le presse-papiers.',
  disclaimer: 'Un secret aléatoire n’empêche ni phishing, ni réutilisation, ni compromission de l’appareil. Utilisez une valeur par service et activez MFA ou passkey.',
};

export const frenchPasswordGeneratorReview = {
  heading: 'Vérifier un mot de passe généré',
  intro: 'La bonne vérification porte sur la source aléatoire, la politique réelle, l’unicité et le stockage, pas seulement sur une jauge.',
  panels: [
    { title: 'Source sûre', text: 'La page doit utiliser crypto.getRandomValues et s’arrêter si cette API manque.' },
    { title: 'Compatibilité', text: 'Contrôlez longueur et caractères dans le formulaire cible avant de supprimer l’ancien accès.' },
    { title: 'Cycle complet', text: 'Enregistrez dans un gestionnaire, testez la connexion et protégez MFA et récupération.' },
  ],
  checklistHeading: 'Points à contrôler',
  checklist: [
    'La longueur et chaque catégorie sélectionnée sont présentes.',
    'La chaîne n’est utilisée sur aucun autre compte.',
    'Le domaine de destination est exact et non issu d’un lien suspect.',
    'La valeur reste dans un gestionnaire, pas une note ou une conversation.',
  ],
};

export const frenchBarcodeGenerator: ToolContent = {
  name: 'Générateur de code-barres EAN, UPC et Code 128',
  short: 'Créez un Code 128, EAN-13, UPC-A ou Code 39, contrôlez la clé de vérification et téléchargez le résultat en PNG ou SVG.',
  long: 'Saisissez une référence, choisissez la symbologie et examinez le symbole avant téléchargement. Pour EAN-13, douze chiffres suffisent : le treizième est calculé. Pour UPC-A, fournissez onze chiffres. Un code complet est refusé si sa clé ne correspond pas. Le dessin est réalisé localement par JsBarcode. Une suite mathématiquement valide n’est toutefois ni un GTIN attribué par GS1, ni une certification d’impression, ni une garantie d’acceptation en caisse.',
  seoTitle: 'Générateur code-barres EAN-13, UPC et Code 128',
  seoDescription: 'Générez EAN-13, UPC-A, Code 128 ou Code 39, calculez la clé de contrôle et téléchargez PNG ou SVG pour vos tests.',
  keywords: [
    'générateur code barre',
    'générateur EAN 13',
    'créer code barre en ligne',
    'calcul clé de contrôle EAN 13',
    'générateur UPC A',
    'Code 128 en PNG',
    'code barre SVG',
  ],
  capabilities: [
    'Dessiner Code 128, EAN-13, UPC-A et Code 39.',
    'Calculer ou valider la clé de contrôle EAN-13 et UPC-A.',
    'Convertir Code 39 en majuscules et refuser les caractères incompatibles.',
    'Télécharger un PNG matriciel ou un SVG vectoriel.',
    'Garder la référence et le rendu dans cet onglet.',
  ],
  contentSections: [
    {
      heading: 'Réponse rapide : choisir le bon type de code-barres',
      paragraphs: [
        'Choisissez Code 128 pour une référence interne, un emplacement, une commande ou un actif lorsque votre système accepte cette symbologie. EAN-13 correspond aux usages de vente au détail courants en Europe et UPC-A à de nombreux circuits nord-américains. Code 39 reste présent dans certains environnements industriels anciens, mais utilise un alphabet plus limité et produit souvent un symbole plus large.',
        'Le widget représente graphiquement une valeur ; il ne crée pas son droit d’usage. Pour un produit commercial, partez du GTIN attribué dans le système GS1 de votre entreprise. GS1 France rappelle que le GTIN identifie une référence de manière unique et que le code-barres n’en est que la représentation lisible par machine. Une clé correcte ne prouve donc ni attribution, ni propriété, ni inscription au registre.',
      ],
    },
    {
      heading: 'EAN-13 : douze chiffres et une clé de contrôle',
      paragraphs: [
        'EAN-13 contient douze chiffres de données suivis d’une clé. Si vous saisissez douze chiffres, la page calcule le treizième. Si vous en fournissez treize, elle recalcule la clé et bloque le téléchargement en cas de différence. Le calcul pondère alternativement les chiffres par 1 et 3 depuis la droite, additionne les produits puis choisit le chiffre qui complète la dizaine.',
        'Cette opération détecte plusieurs erreurs de saisie, mais ne rend pas le numéro unique. Le préfixe entreprise GS1, la référence produit et les règles d’allocation doivent venir de la source officielle de l’organisation. Ne prenez pas une date ou une référence interne de douze chiffres pour inventer un EAN destiné à un magasin ou une marketplace.',
      ],
      items: [
        'Douze chiffres : la clé est ajoutée.',
        'Treize chiffres : la clé existante est vérifiée.',
        'Une clé correcte ne vaut pas attribution GS1.',
        'Le numéro doit rester lié à la bonne référence commerciale.',
      ],
    },
    {
      heading: 'UPC-A, Code 128 et Code 39',
      paragraphs: [
        'UPC-A suit le même principe avec onze chiffres de données et une douzième clé. Il est notamment associé au commerce nord-américain, mais la règle exacte dépend du partenaire. Code 128 accepte un ensemble plus large de lettres, chiffres et symboles et convient bien aux opérations internes. Ce mode n’est pas automatiquement GS1-128 : la syntaxe GS1 et ses Application Identifiers constituent une spécification supplémentaire que ce widget ne construit pas.',
        'Code 39 accepte ici majuscules, chiffres, espace et `. $ / + % -`. Le texte est converti en majuscules ; un accent ou un caractère hors alphabet provoque une erreur. Vérifiez la compatibilité du lecteur avant de choisir. Une référence courte aide à limiter la largeur et la densité, particulièrement sur une petite étiquette.',
      ],
    },
    {
      heading: 'GTIN, code EAN et identité commerciale',
      paragraphs: [
        'En France, les termes EAN, GENCOD et parfois « code produit » sont encore utilisés, mais le nom de l’identifiant est GTIN. GS1 France attribue à l’entreprise une capacité de codification, puis le propriétaire de la marque affecte les références selon les règles applicables. Le dessin EAN/UPC transporte ce GTIN afin que caisse, entrepôt et partenaires consultent le même enregistrement.',
        'Un générateur gratuit ne doit pas être utilisé pour contourner cette gouvernance. Une marketplace peut vérifier le lien entre GTIN, entreprise et produit dans Verified by GS1. Un numéro acheté à un revendeur non autorisé peut appartenir à une autre partie ou ne pas être reconnu. Pour une maquette, utilisez une valeur explicitement fictive et ne l’imprimez pas sur un produit vendu.',
      ],
    },
    {
      heading: 'Clé valide, symbole valide et lecture réelle',
      paragraphs: [
        'Trois contrôles différents doivent être distingués. La clé confirme une relation mathématique entre les chiffres. La bibliothèque vérifie qu’elle peut dessiner la symbologie. Enfin, la lecture réelle dépend de la taille, de l’impression, du support, du contraste, des zones de silence et du scanner. Réussir les deux premiers ne prouve pas le troisième.',
        'Imprimez une épreuve à la taille prévue, sur le matériau final, puis scannez-la avec les appareils du parcours réel. Comparez le texte affiché par le lecteur avec la source et vérifiez qu’il ouvre le bon enregistrement. Répétez après découpe, plastification, pose sur une surface courbe ou tout procédé susceptible de déformer les barres.',
      ],
    },
    {
      heading: 'Zones de silence, proportions, couleurs et support',
      paragraphs: [
        'Les marges claires à gauche et à droite, appelées Quiet Zones ou zones de silence, aident le scanner à détecter le début et la fin du symbole. Aucun texte, cadre, bord de découpe ou illustration ne doit les envahir. GS1 recommande des barres sombres sur fond clair et avertit qu’une réduction de hauteur ou une position inadaptée peut dégrader la lecture.',
        'Ne redimensionnez pas librement largeur et hauteur comme une photographie. Étirer uniquement un axe change la largeur relative des modules. Une impression floue, un toner irrégulier, un papier absorbant, un emballage brillant ou une forte courbure peuvent rendre inutilisable un fichier pourtant net à l’écran. La conformité complète nécessite les dimensions et tests de la norme applicable.',
      ],
    },
    {
      heading: 'PNG ou SVG : quel fichier télécharger',
      paragraphs: [
        'Le SVG conserve des formes vectorielles et se prête mieux à une mise en page qui doit rester nette à plusieurs tailles, à condition que le logiciel d’impression respecte le rapport d’échelle. Le PNG produit une image matricielle pratique dans un document ou une maquette. Évitez de l’agrandir fortement, car l’interpolation peut brouiller les bords.',
        'Dans les deux cas, conservez les zones blanches et le contraste. Le téléchargement n’ajoute aucune métadonnée GS1 ni validation commerciale. Avant production, verrouillez le fichier dans le gabarit, exportez un PDF d’épreuve si nécessaire et mesurez le symbole imprimé. Une capture d’écran du preview n’est pas un master d’impression.',
      ],
    },
    {
      heading: 'Données locales, confidentialité et falsification',
      paragraphs: [
        'JsBarcode dessine le symbole dans cet onglet ; FunnyTools ne reçoit pas la référence. Le PNG ou SVG téléchargé est ensuite un fichier lisible par toute personne disposant d’un scanner. N’encodez pas une clé secrète, un token, une donnée médicale ou un identifiant personnel simplement parce que les barres paraissent abstraites.',
        'Un code-barres ne chiffre rien et se copie facilement. Pour un badge, un coupon ou un suivi, le système serveur doit vérifier autorisation, expiration, usage unique et état du dossier. Le widget ne signe pas le contenu, ne détecte pas les doublons et ne protège pas contre une étiquette remplacée. Utilisez des identifiants non secrets et contrôlez toujours le processus qui les consomme.',
      ],
    },
  ],
  instructions: [
    'Identifiez la symbologie exigée par le lecteur ou le partenaire.',
    'Saisissez la référence source ; pour EAN ou UPC, utilisez un numéro attribué.',
    'Contrôlez la clé, le texte lisible et le rendu avant téléchargement.',
    'Préférez SVG pour la mise en page vectorielle ou PNG pour une maquette.',
    'Imprimez puis scannez sur le support et avec l’équipement de production.',
  ],
  examples: [
    'Créer un Code 128 pour une étagère interne.',
    'Vérifier la clé d’un GTIN-13 reçu du catalogue produit.',
    'Produire une maquette UPC-A sans la confondre avec une attribution.',
    'Comparer PNG et SVG dans un gabarit d’étiquette.',
  ],
  audience: [
    'Équipes logistiques testant des références internes.',
    'Commerçants préparant une maquette à partir de GTIN officiels.',
    'Développeurs contrôlant un lecteur ou un flux d’inventaire.',
    'Graphistes intégrant un symbole dans une étiquette.',
  ],
  caseStudies: [
    { title: 'GTIN-13 déjà attribué', description: 'Le catalogue fournit douze chiffres de données. La clé calculée est comparée à la fiche GS1, puis l’épreuve imprimée est scannée sur le terminal du magasin.' },
    { title: 'Référence d’entrepôt', description: 'Une référence alphanumérique courte est dessinée en Code 128. Le WMS est configuré pour cette symbologie et le scanner retourne exactement la chaîne attendue.' },
    { title: 'Étiquette trop proche du bord', description: 'Le fichier se lit à l’écran mais échoue après découpe. Le gabarit est corrigé afin de restaurer les zones de silence et une nouvelle épreuve est qualifiée.' },
  ],
  notes: [
    'EAN-13 accepte 12 chiffres de données ou 13 avec clé.',
    'UPC-A accepte 11 chiffres de données ou 12 avec clé.',
    'Code 128 interne n’est pas automatiquement GS1-128.',
    'Une clé valide ne prouve pas l’attribution du GTIN.',
    'La validation finale se fait sur l’impression et le lecteur réels.',
  ],
  faq: [
    { q: 'Puis-je saisir seulement douze chiffres pour EAN-13 ?', a: 'Oui. La page calcule la treizième clé, mais le numéro de départ doit venir d’une attribution correcte.' },
    { q: 'Que se passe-t-il avec un EAN complet incorrect ?', a: 'La clé est recalculée, le téléchargement est désactivé et le message indique le chiffre attendu.' },
    { q: 'Code 128 convient-il à un produit de supermarché ?', a: 'Il peut servir en interne, mais le point de vente exige généralement une symbologie EAN/UPC et un GTIN attribué. Suivez le partenaire.' },
    { q: 'PNG ou SVG pour imprimer ?', a: 'Le SVG garde des barres vectorielles nettes. Le PNG convient à une maquette si sa résolution reste suffisante et qu’il n’est pas étiré.' },
    { q: 'Pourquoi le code imprimé ne se scanne-t-il pas ?', a: 'Contrôlez taille, hauteur, zones de silence, contraste, résolution, encre, support, courbure, position et lecteur.' },
    { q: 'La référence est-elle envoyée à FunnyTools ?', a: 'Non. Le rendu reste dans le navigateur. Le fichier et l’étiquette restent lisibles par toute personne qui les obtient.' },
  ],
  labels: {
    localNote: 'Le code-barres est créé localement dans ce navigateur ; la référence n’est pas envoyée à FunnyTools.',
    inputLabel: 'Texte ou numéro',
    placeholder: 'Exemple : ARTICLE-2026-001',
    formatLabel: 'Type de code-barres',
    hintCode128: 'Code 128 accepte lettres, chiffres et symboles pour inventaire, commandes et étiquettes internes.',
    hintEan13: 'Saisissez 12 chiffres de données ou un EAN-13 complet avec sa clé.',
    hintUpc: 'Saisissez 11 chiffres de données ou un UPC-A complet avec sa clé.',
    hintCode39: 'Code 39 accepte majuscules, chiffres, espaces et . $ / + % -.',
    downloadPng: 'Télécharger le PNG',
    downloadSvg: 'Télécharger le SVG',
    reset: 'Réinitialiser',
    previewAlt: 'Aperçu du code-barres',
    emptyError: 'Saisissez une valeur à représenter.',
    eanLengthError: 'EAN-13 demande 12 chiffres de données ou 13 chiffres complets.',
    upcLengthError: 'UPC-A demande 11 chiffres de données ou 12 chiffres complets.',
    checksumError: 'La clé de contrôle est incorrecte. Le dernier chiffre attendu est {digit}.',
    code39Error: 'Code 39 accepte seulement lettres, chiffres, espaces et . $ / + % -.',
    renderError: 'Le code-barres n’a pas pu être créé. Raccourcissez la valeur ou choisissez un autre type.',
  },
  sources: [
    { label: 'GS1 France — Identifier vos produits', href: 'https://www.gs1.fr/identifier-vos-produits', note: 'Rôle du GTIN, du préfixe entreprise et de l’attribution.' },
    { label: 'GS1 France — GTIN, code-barres et EAN', href: 'https://www.gs1.fr/code-gtin-lidentifiant-produit-incontournable', note: 'Différence entre identifiant GTIN et représentation en code-barres.' },
    { label: 'GS1 — Qualité des codes-barres', href: 'https://support.gs1.org/support/solutions/articles/43000734141-what-should-i-check-to-ensure-good-quality-barcodes-', note: 'Clé, Quiet Zones, contraste, taille, hauteur, support et position.' },
  ],
  privacyNote: 'JsBarcode dessine localement. FunnyTools ne reçoit ni texte, ni numéro, ni image ; un fichier téléchargé peut toutefois être scanné par un tiers.',
  disclaimer: 'Vérifiez attribution, symbologie, dimensions, zones de silence et lecture avec le partenaire. Cette page n’émet aucun GTIN et ne certifie pas l’impression.',
};

export const frenchBarcodeGeneratorReview = {
  heading: 'Vérifier un code-barres avant utilisation',
  intro: 'Le navigateur prouve seulement qu’il peut dessiner un symbole ; le contrôle doit couvrir l’identifiant, l’impression et le lecteur final.',
  panels: [
    { title: 'Identifiant', text: 'Comparez tous les caractères et séparez validité mathématique et attribution commerciale.' },
    { title: 'Symbole', text: 'Conservez proportions, fond clair, barres sombres et zones de silence.' },
    { title: 'Opération', text: 'Scannez l’épreuve imprimée avec le matériel réel et ouvrez le bon dossier.' },
  ],
  checklistHeading: 'Points à contrôler',
  checklist: [
    'La symbologie correspond au commerce, entrepôt ou système.',
    'Le texte et le lecteur reproduisent exactement la référence.',
    'EAN ou UPC possède une clé valide et une attribution documentée.',
    'Le test final utilise support, taille, imprimante et scanner de production.',
  ],
};

export const frenchColorGenerator: ToolContent = {
  name: 'Générateur de couleurs HEX, RGB et HSL',
  short: 'Obtenez une couleur sRGB aléatoire, ses écritures HEX, RGB et HSL, cinq nouvelles propositions et le contraste avec noir et blanc.',
  long: 'Chaque génération choisit trois canaux de 0 à 255, montre le même échantillon dans trois notations CSS et calcule sa luminance relative pour comparer du texte noir et blanc. Une palette de cinq couleurs indépendantes aide à explorer, sans constituer une harmonie. Les ratios suivent la formule WCAG, mais leur conformité dépend encore du type de texte, de sa taille, de son poids et du composant réel.',
  seoTitle: 'Générateur couleur HEX, RGB, HSL et contraste',
  seoDescription: 'Générez une couleur HEX, RGB et HSL, créez cinq échantillons et comparez le contraste WCAG avec texte noir ou blanc.',
  keywords: [
    'générateur de couleur',
    'couleur aléatoire HEX',
    'générateur palette couleurs',
    'convertir RGB en HSL',
    'contraste WCAG 4.5 1',
    'code couleur CSS',
    'texte noir ou blanc contraste',
  ],
  capabilities: [
    'Créer un échantillon sRGB et afficher HEX, RGB et HSL.',
    'Calculer le contraste avec noir et blanc à deux décimales.',
    'Copier chaque notation ou le HEX d’une vignette.',
    'Générer cinq couleurs indépendantes pour l’exploration.',
    'Choisir sur chaque vignette le texte noir ou blanc offrant le ratio supérieur.',
  ],
  contentSections: [
    {
      heading: 'Réponse rapide : générer et vérifier une couleur',
      paragraphs: [
        'Cliquez sur « Générer une couleur », puis copiez HEX, RGB ou HSL selon votre outil. Lisez les deux ratios de contraste. Pour le texte courant au niveau AA, WCAG 2.2 fixe 4,5:1 ; le grand texte peut utiliser 3:1. Le niveau AAA demande 7:1 pour le texte courant. Vérifiez la définition de la taille avant d’appliquer le seuil.',
        'Une couleur tirée au hasard peut débloquer une maquette, tester un état ou fournir un exemple pédagogique. Elle ne devient pas automatiquement un bon token de marque. Placez-la dans le vrai bouton, lien, graphique ou message, avec ses états focus, hover, actif et désactivé. Une décision de design dépend d’un système entier, pas d’un carré isolé.',
      ],
    },
    {
      heading: 'HEX, RGB et HSL décrivent le même échantillon',
      paragraphs: [
        'HEX encode rouge, vert et bleu avec deux chiffres hexadécimaux. `#FF0000` représente 255 de rouge, 0 de vert et 0 de bleu, soit `rgb(255, 0, 0)`. Ces deux notations décrivent directement le même point opaque de l’espace sRGB couramment utilisé par CSS et les écrans.',
        'HSL réorganise la description en teinte, saturation et luminosité. Cette notation facilite certaines variations, mais elle n’est pas perceptuellement uniforme : dix points de luminosité ne produisent pas partout le même changement ressenti. Le widget arrondit les valeurs HSL à l’entier ; une conversion inverse peut donc différer d’un canal à cause de l’arrondi.',
      ],
    },
    {
      heading: 'Comment le tirage aléatoire est réalisé',
      paragraphs: [
        'Trois nombres entiers entre 0 et 255 sont générés avec `Math.random`, puis convertis en HEX et HSL. Cette source suffit à une inspiration visuelle, car le résultat ne protège aucun secret et ne décide pas un tirage à enjeu. Ne réutilisez jamais ces valeurs comme token d’accès, identifiant imprévisible ou preuve d’impartialité.',
        'L’espace RGB contient 16 777 216 combinaisons, mais les perceptions humaines ne s’y répartissent pas uniformément. Cinq tirages peuvent être tous sombres, très proches ou visuellement discordants. « Aléatoire » décrit le processus des canaux, pas une sélection équilibrée de couleurs agréables, distinctes, imprimables ou accessibles.',
      ],
    },
    {
      heading: 'Luminance relative et formule du ratio',
      paragraphs: [
        'Chaque canal sRGB est normalisé puis linéarisé. La luminance relative combine les valeurs avec les coefficients 0,2126 pour le rouge, 0,7152 pour le vert et 0,0722 pour le bleu. Le ratio est ensuite `(L1 + 0,05) / (L2 + 0,05)`, avec la luminance la plus claire en L1. Il va de 1:1 à 21:1.',
        'La page calcule deux résultats : échantillon contre noir et contre blanc. « Meilleur texte » indique seulement lequel des deux est supérieur. Un meilleur ratio de 3,8:1 ne suffit pas au texte normal AA, même s’il est meilleur que l’autre. Mesurez la combinaison exacte, notamment lorsque le fond est translucide, dégradé ou posé sur une image.',
      ],
    },
    {
      heading: 'Seuils WCAG 4,5:1, 3:1 et 7:1',
      paragraphs: [
        'Le critère WCAG 2.2 1.4.3 exige au niveau AA un contraste de 4,5:1 pour le texte normal et 3:1 pour le grand texte. Les logos et éléments purement décoratifs relèvent d’exceptions. Le critère 1.4.6 élève le niveau AAA à 7:1 pour le texte normal et 4,5:1 pour le grand texte.',
        'La taille dite « grande » dépend aussi du poids typographique. Les limites de contrôles et indicateurs nécessaires à l’interface peuvent relever d’exigences non textuelles distinctes. Ce widget compare uniquement noir et blanc sur un fond uni ; il ne certifie ni icône, ni bordure, ni focus, ni état désactivé, ni texte sur photographie.',
      ],
    },
    {
      heading: 'Cinq couleurs ne forment pas une palette harmonique',
      paragraphs: [
        'Le bouton palette produit cinq tirages indépendants. Il ne recherche ni complémentaires, ni analogues, ni triade, ni échelle de luminosité. Deux vignettes peuvent se ressembler ou entrer en conflit. Utilisez-les pour repérer une direction, puis construisez délibérément les rôles de fond, surface, texte, accent, succès, avertissement et erreur.',
        'Chaque rôle interactif demande des états et des ratios. Pour un graphique, associez le ton à une étiquette, un motif, une forme ou une position afin que le sens ne dépende pas uniquement de la perception rouge-vert. Le critère WCAG « utilisation de la couleur » vise précisément cette redondance. Une palette utile encode une hiérarchie et des règles.',
      ],
    },
    {
      heading: 'Passer d’un échantillon à des tokens de design',
      paragraphs: [
        'Enregistrez une couleur choisie avec un nom sémantique comme `--couleur-accent` plutôt qu’un nom visuel tel que `bleu-3`. Documentez où elle peut apparaître et les paires de texte autorisées. Construisez les variantes par une méthode reproductible, puis testez pages longues, formulaires, tableaux, mode sombre, zoom et préférences de contraste.',
        'Des contenus traduits peuvent allonger les boutons, changer la surface colorée et révéler un problème absent dans la maquette courte. Les états de succès et d’erreur doivent rester compréhensibles sans se réduire au vert et au rouge. Ajoutez texte, icône et focus visible. La conformité appartient au composant final, pas au code HEX isolé.',
      ],
    },
    {
      heading: 'sRGB à l’écran, CMJN et impression',
      paragraphs: [
        'Les valeurs générées appartiennent à sRGB. Deux écrans peuvent les afficher différemment à cause du profil, de la luminosité, du mode nuit et de la lumière ambiante. Des espaces CSS plus larges comme Display-P3 contiennent des couleurs que cet outil ne produit pas. Un projet avancé doit conserver son pipeline colorimétrique.',
        'HEX ou RGB ne se convertit pas directement en une encre CMJN ou Pantone garantie. Papier, vernis, absorption et procédé modifient le rendu. Pour une identité imprimée, demandez le profil et une épreuve physique au prestataire. Conservez séparément les spécifications web et print plutôt que d’approuver une marque sur un seul téléphone.',
      ],
    },
    {
      heading: 'Traitement local, copie et limites',
      paragraphs: [
        'Les couleurs, conversions et ratios sont produits dans l’onglet ; FunnyTools ne reçoit pas les valeurs. Copier les place dans le presse-papiers. Une couleur est rarement sensible, mais un projet confidentiel peut imposer de ne pas partager ses tokens. La page ne sauvegarde aucun favori ni URL permanente.',
        'Le widget ne simule pas les déficiences de vision, ne teste pas une photographie, ne connaît pas la taille réelle du texte et n’évalue pas l’impression. Il fournit un point de départ et deux ratios exacts contre noir et blanc. Conservez les valeurs choisies, puis réalisez l’audit dans le produit, avec les états, contenus et appareils représentatifs.',
      ],
    },
  ],
  instructions: [
    'Générez une couleur ou utilisez Espace lorsque la zone, hors contrôle, a le focus.',
    'Copiez HEX, RGB ou HSL et confirmez que la cible utilise sRGB.',
    'Comparez noir et blanc au seuil correspondant au texte réel.',
    'Explorez cinq tirages, puis organisez une palette intentionnelle.',
    'Testez composants, états, daltonisme, écrans et impression concernés.',
  ],
  examples: [
    'Trouver un accent de prototype puis mesurer le texte du bouton.',
    'Copier un HEX vers CSS tout en documentant RGB et HSL.',
    'Écarter les tirages qui échouent pour du texte normal.',
    'Comparer l’écran à une épreuve sur papier.',
  ],
  audience: [
    'Designers et développeurs préparant des composants web.',
    'Personnes créant présentations, graphiques ou contenus sociaux.',
    'Équipes expliquant les formats de couleur et le contraste.',
    'Étudiants travaillant sur sRGB et luminance.',
  ],
  caseStudies: [
    { title: 'Bouton avec texte lisible', description: 'Un bleu aléatoire dépasse 4,5:1 avec du blanc. L’équipe mesure ensuite hover, focus et état désactivé dans le vrai composant.' },
    { title: 'Graphique redondant', description: 'Deux vignettes se ressemblent. Elles sont remplacées et chaque série reçoit aussi une étiquette et un marqueur distinct.' },
    { title: 'Écart entre écran et papier', description: 'La couleur paraît vive sur écran mais terne sur papier mat. Le token sRGB reste dédié au web et une spécification print est approuvée sur épreuve.' },
  ],
  notes: [
    'Les cinq couleurs sont indépendantes, sans harmonie calculée.',
    'HSL est arrondi et peut varier lors d’une conversion inverse.',
    '4,5:1 vise le texte normal AA ; le contexte fixe le seuil.',
    'Le meilleur de noir ou blanc n’est pas toujours conforme.',
    'Math.random convient à l’inspiration, pas à un secret ou un tirage auditable.',
  ],
  faq: [
    { q: 'HEX, RGB et HSL montrent-ils des couleurs différentes ?', a: 'Non. Ils décrivent le même échantillon sRGB. L’arrondi HSL peut produire une petite différence lors d’une conversion inverse.' },
    { q: 'Quel contraste faut-il pour un texte normal ?', a: 'WCAG 2.2 demande 4,5:1 au niveau AA et 7:1 au niveau AAA. Le grand texte possède des seuils distincts.' },
    { q: 'Le texte recommandé respecte-t-il toujours WCAG ?', a: 'Non. Il désigne seulement le meilleur ratio entre noir et blanc. Comparez le nombre au critère applicable.' },
    { q: 'Les cinq couleurs sont-elles harmonieuses ?', a: 'Non. Ce sont cinq tirages d’inspiration. Construisez ensuite les rôles, variations et contrastes de manière intentionnelle.' },
    { q: 'Puis-je utiliser le HEX pour l’impression ?', a: 'Comme référence initiale seulement. Demandez conversion, profil et épreuve physique pour le procédé d’impression.' },
    { q: 'Les couleurs sont-elles sauvegardées ?', a: 'Non. Copiez celles que vous retenez et documentez leur rôle dans votre système de design.' },
  ],
  labels: {
    generate: 'Générer une couleur',
    palette: 'Générer 5 couleurs',
    currentColor: 'Couleur actuelle',
    hex: 'HEX',
    rgb: 'RGB',
    hsl: 'HSL',
    copy: 'Copier',
    paletteTitle: 'Échantillons aléatoires',
    spaceHint: 'Astuce : appuyez sur Espace dans la zone de l’outil, hors d’un contrôle, pour changer de couleur.',
    contrastLabel: 'Contraste sur cette couleur',
    black: 'Noir',
    white: 'Blanc',
    bestText: 'meilleur texte',
    copied: 'Couleur copiée',
  },
  sources: [
    { label: 'W3C — WCAG 2.2', href: 'https://www.w3.org/TR/WCAG22/', note: 'Critères 1.4.3 et 1.4.6, ratios AA et AAA.' },
    { label: 'W3C — technique G18', href: 'https://www.w3.org/WAI/WCAG22/Techniques/general/G18', note: 'Formule de luminance relative et mesure du ratio.' },
    { label: 'W3C — ne pas utiliser la couleur seule', href: 'https://www.w3.org/WAI/WCAG22/Understanding/use-of-color', note: 'Signaux redondants pour transmettre l’information.' },
  ],
  privacyNote: 'La génération, les conversions et les ratios restent dans cet onglet. FunnyTools ne reçoit ni ne sauvegarde les couleurs.',
  disclaimer: 'Testez la paire exacte dans le composant et le support finaux. Une couleur aléatoire et deux ratios ne remplacent pas l’audit complet.',
};

export const frenchColorGeneratorReview = {
  heading: 'Vérifier une couleur avant publication',
  intro: 'Un HEX valide ne suffit pas : la décision dépend du fond, du texte, des états, du niveau WCAG et du support.',
  panels: [
    { title: 'Équivalence', text: 'Confirmez que HEX, RGB et HSL décrivent la même couleur et tenez compte de l’arrondi.' },
    { title: 'Contraste', text: 'Appliquez 4,5:1, 3:1 ou 7:1 selon taille, poids et niveau visé.' },
    { title: 'Contexte', text: 'Testez focus, états, vision des couleurs, écrans et impression.' },
  ],
  checklistHeading: 'Points à contrôler',
  checklist: [
    'La vraie paire premier plan et fond dépasse le seuil applicable.',
    'Focus, hover, actif, erreur et désactivé restent distinguables.',
    'Le sens est également exprimé par texte, icône, forme ou motif.',
    'Le token possède un nom sémantique et un usage documenté.',
  ],
};
