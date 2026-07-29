import type { ToolContent } from '../tools/_types';

export const frenchMortgagePayment: ToolContent = {
  name: 'Calculateur de mensualité de prêt immobilier',
  short: 'Estimez une mensualité constante, le total remboursé et les intérêts à partir du capital, du taux nominal et de la durée.',
  long: 'Ce calculateur de mensualité de prêt immobilier applique une formule d’annuité constante à un capital emprunté, un taux nominal annuel fixe et une durée entière. Il affiche la mensualité de capital et d’intérêts, le total des échéances et l’intérêt arithmétique. Il ne calcule ni TAEG, ni assurance emprunteur, ni frais de dossier, garantie, acquisition, taxe, travaux ou charge de propriétaire. Le résultat n’est donc ni une offre de prêt, ni une capacité d’emprunt, ni le coût complet d’un achat en France.',
  seoTitle: 'Calculateur mensualité prêt immobilier et intérêts',
  seoDescription: 'Calculez une mensualité de prêt immobilier à taux fixe, le total remboursé et les intérêts. Formule, TAEG, assurance et limites expliqués.',
  keywords: [
    'calculateur mensualité prêt immobilier',
    'calculer mensualité crédit immobilier',
    'simulateur prêt immobilier',
    'mensualité emprunt 200000 euros',
    'calcul intérêts crédit immobilier',
    'tableau amortissement prêt',
    'taux nominal prêt immobilier',
    'différence taux nominal TAEG',
  ],
  capabilities: [
    'Estimer une échéance mensuelle constante de capital et d’intérêts.',
    'Comparer plusieurs durées avec le même capital et le même taux.',
    'Afficher le total des échéances et l’intérêt nominal cumulé.',
    'Traiter correctement un scénario à taux nul.',
    'Garder les montants saisis dans cet onglet.',
  ],
  contentSections: [
    {
      heading: 'Réponse rapide : calculer une mensualité de prêt immobilier',
      paragraphs: [
        'Saisissez le capital réellement emprunté, et non le prix du logement si vous financez une partie par apport. Indiquez ensuite le taux nominal annuel utilisé pour calculer les intérêts et une durée entière en années. Avec 200 000 € à 3 % sur 25 ans, la formule donne environ 948 € par mois, 284 527 € d’échéances et 84 527 € d’intérêts. L’affichage est arrondi à l’euro, alors que le calcul interne conserve les décimales.',
        'Ces 948 € couvrent seulement le capital et les intérêts de ce scénario fixe. Il faut encore vérifier l’assurance emprunteur, les frais de dossier et de garantie, les éventuels services imposés, ainsi que les coûts d’acquisition et de propriété. Conservez la même monnaie dans tous les champs : le calculateur formate un nombre en français mais ne connaît ni votre devise, ni votre banque, ni la date du premier prélèvement.',
      ],
    },
    {
      heading: 'Formule d’une échéance constante et taux mensuel',
      paragraphs: [
        'Pour un taux mensuel supérieur à zéro, la mensualité est P × i ÷ [1 − (1 + i)⁻ⁿ]. P représente le capital, i le taux nominal annuel divisé par 12 et n le nombre de mois. Si le taux est nul, P est simplement divisé par n. La page suppose une mensualité identique pendant toute la durée et 12 périodes égales par an.',
        'Dans un prêt amortissable à échéances constantes, la part d’intérêts est généralement plus forte au début, puis diminue à mesure que le capital restant dû baisse. La part de capital suit le mouvement inverse. Cette page ne construit pas l’échéancier mois par mois : elle ne permet donc pas de connaître précisément le capital restant dû à une date, l’effet d’un remboursement anticipé ou le montant d’une indemnité.',
      ],
    },
    {
      heading: 'Taux nominal et TAEG ne répondent pas à la même question',
      paragraphs: [
        'Le champ attend un taux nominal annuel servant à l’amortissement. Le TAEG représente un coût annuel plus large et permet de comparer les offres sur une base commune. Le ministère de l’Économie rappelle qu’il intègre, lorsque les conditions sont réunies, intérêts, frais de dossier, commissions, assurance obligatoire et autres coûts nécessaires à l’obtention du crédit. Copier directement un TAEG dans ce champ ne reconstitue pas une mensualité contractuelle.',
        'La comparaison sérieuse garde donc deux lignes distinctes : le taux nominal pour comprendre l’échéance de capital et intérêts, puis le TAEG et le coût total indiqués dans l’offre. Vérifiez aussi que le TAEG ne dépasse pas le taux d’usure applicable au moment de l’offre ; les seuils dépendent notamment de la catégorie et de la durée et évoluent. FunnyTools ne charge aucun seuil courant et ne contrôle pas la conformité d’un contrat.',
      ],
      link: {
        prefix: 'Consultez la définition officielle du ',
        label: 'TAEG publiée par le ministère de l’Économie',
        href: 'https://www.economie.gouv.fr/particuliers/emprunter-et-sassurer/credit-quoi-correspond-le-taux-annuel-effectif-global-taeg',
        suffix: '.',
      },
    },
    {
      heading: 'Assurance emprunteur, garantie et frais absents',
      paragraphs: [
        'L’assurance peut s’ajouter à la mensualité de remboursement ou suivre une autre structure selon le contrat. L’ANIL distingue notamment son TAEA, son coût total et son coût par période. La cotisation peut être constante, calculée sur le capital initial ou évoluer avec le capital restant dû. Un simple pourcentage ajouté au taux nominal ne reproduit donc pas automatiquement la prime réelle.',
        'Le calcul exclut également frais de dossier, courtage, caution ou hypothèque, évaluation du bien, intérêts intercalaires et produits associés. Il exclut les frais d’acquisition dits frais de notaire, les taxes, la copropriété, l’assurance habitation, l’entretien, l’énergie et les travaux. Certains figurent dans le TAEG, d’autres appartiennent au budget global de l’achat : dans les deux cas, ils restent à ajouter séparément.',
      ],
      link: {
        prefix: 'Pour distinguer les cotisations et garanties, lisez ',
        label: 'la fiche ANIL sur l’assurance emprunteur',
        href: 'https://www.anil.org/votre-besoin/acheter/financement/assurance-emprunteur/les-differents-types-de-garanties-dassurance-emprunteur/',
        suffix: '.',
      },
    },
    {
      heading: 'Comparer 20, 25 et 30 ans sans cacher le coût',
      paragraphs: [
        'À capital et taux identiques, allonger la durée réduit habituellement la mensualité mais augmente l’intérêt cumulé. Pour 200 000 € à 3 %, la simulation donne environ 1 109 € sur 20 ans et 66 207 € d’intérêts, 948 € sur 25 ans et 84 527 €, puis 843 € sur 30 ans et 103 555 €. Ces valeurs ne contiennent toujours aucun frais ni assurance.',
        'Une mensualité plus basse ne signifie donc pas une offre moins chère. Une durée courte n’est pas non plus automatiquement soutenable : le budget doit absorber les dépenses essentielles, les imprévus et les charges du logement. Comparez plusieurs offres avec le même capital et la même durée, puis faites un second tableau avec l’ensemble des sorties de trésorerie et une marge de sécurité.',
      ],
    },
    {
      heading: 'Taux fixe, variable, mixte et période de différé',
      paragraphs: [
        'Le modèle correspond à un taux fixe constant. Pour un taux variable, une valeur saisie ne constitue qu’un scénario instantané. Recommencez avec plusieurs taux et consultez la règle de révision, l’indice, la marge, la fréquence et les plafonds du contrat. Une projection uniforme sur 25 ans ne prédit ni l’indice futur ni la mensualité après révision.',
        'Un prêt mixte, un prêt relais, un prêt in fine, un différé de capital, un lissage de plusieurs crédits ou un PTZ exige une autre structure de calcul. Additionner les montants puis appliquer un seul taux peut donner une fausse échéance. Demandez l’échéancier de chaque ligne et vérifiez les périodes où plusieurs remboursements se chevauchent.',
      ],
    },
    {
      heading: 'Capital emprunté, apport et budget de propriétaire',
      paragraphs: [
        'Si le logement coûte 250 000 € et que 50 000 € d’apport financent le prix, le champ capital peut être 200 000 €, sous réserve que les autres frais soient payés séparément. Ne soustrayez pas un apport destiné aux seuls frais d’acquisition comme s’il réduisait nécessairement le prêt. Reprenez les montants de votre plan de financement écrit.',
        'L’ANIL recommande d’intégrer crédits complémentaires, assurances, impôts, copropriété, entretien, déménagement et changements de dépenses liés au logement. Le calculateur ne lit pas vos revenus et ne calcule aucun taux d’effort. Il ne peut ni dire ce que vous pouvez emprunter, ni anticiper l’analyse du prêteur, ni certifier que le budget restera équilibré.',
      ],
      link: {
        prefix: 'Le budget complet est détaillé dans les conseils ',
        label: '« Faites vos comptes » de l’ANIL',
        href: 'https://www.anil.org/votre-besoin/acheter/financement/faites-vos-comptes/',
        suffix: '.',
      },
    },
    {
      heading: 'Erreurs fréquentes et contrôles de saisie',
      paragraphs: [
        'Écrivez 3 pour 3 %, et non 0,03. Le capital doit être supérieur à zéro, le taux compris entre 0 % et 100 % et la durée un nombre entier de 1 à 100 ans. Une durée de 25,5 ans est refusée au lieu d’être arrondie silencieusement. Lorsqu’une entrée devient invalide, les anciens résultats sont effacés afin de ne pas les associer aux nouvelles valeurs.',
        'Évitez aussi de confondre prix, capital, taux nominal et TAEG, ou de présenter le total des échéances comme coût complet de l’opération. Le contrat peut appliquer des dates, arrondis et règles différents. Reproduisez toujours un exemple de l’échéancier bancaire avant de conclure que la formule et l’offre utilisent exactement la même convention.',
      ],
    },
    {
      heading: 'Confidentialité et portée de la simulation',
      paragraphs: [
        'Capital, taux et durée restent dans cet onglet. Aucun nom, revenu, adresse, établissement, dossier de crédit ou information sur le bien n’est nécessaire. FunnyTools ne reçoit pas ces trois valeurs. Sur un appareil partagé, l’historique peut cependant révéler la visite de la page selon les réglages du navigateur.',
        'Le résultat est pédagogique et non contractuel. Il ne constitue ni conseil financier ou juridique, ni offre, accord de principe, analyse de solvabilité ou recommandation de durée. Pour un engagement important, comparez les documents datés, demandez les explications nécessaires et sollicitez un professionnel ou un service public compétent.',
      ],
    },
  ],
  instructions: [
    'Saisissez le capital réellement financé dans une seule monnaie.',
    'Entrez le taux nominal annuel, par exemple 3 pour 3 %.',
    'Choisissez une durée entière de 1 à 100 ans.',
    'Comparez mensualité, total des échéances et intérêts.',
    'Ajoutez séparément assurance, TAEG, frais et budget du logement.',
  ],
  examples: [
    'Comparer un emprunt de 200 000 € sur 20, 25 et 30 ans.',
    'Tester une hausse de taux sans la présenter comme prévision.',
    'Séparer le prix du logement, l’apport et le capital financé.',
    'Comparer deux offres au même capital et à la même durée.',
  ],
  audience: [
    'Ménages préparant une comparaison de prêts immobiliers.',
    'Personnes souhaitant comprendre une échéance constante.',
    'Étudiants travaillant la formule d’une annuité.',
    'Utilisateurs recherchant une simulation locale sans compte.',
  ],
  caseStudies: [
    { title: 'Apport correctement séparé', description: 'Un achat à 250 000 € avec 50 000 € affectés au prix est testé avec 200 000 € de capital, tandis que les frais d’acquisition restent dans un budget distinct.' },
    { title: 'Durée moins chère en apparence', description: 'La mensualité sur 30 ans est plus basse que sur 20 ans, mais le ménage compare aussi l’intérêt cumulé et la durée de l’engagement.' },
    { title: 'Assurance hors calcul', description: 'La personne ajoute le coût par période indiqué dans la proposition d’assurance au lieu de supposer qu’il est déjà inclus dans la mensualité affichée.' },
  ],
  notes: [
    'Le taux saisi est nominal et fixe dans la simulation.',
    'La formule suppose 12 échéances constantes par an.',
    'Le résultat visible est arrondi à l’unité monétaire.',
    'TAEG, assurance, frais, taxes et coûts du logement sont exclus.',
    'Une estimation ne vaut ni offre ni capacité d’emprunt.',
  ],
  faq: [
    { q: 'Comment calculer la mensualité d’un prêt immobilier ?', a: 'Avec le capital, le taux mensuel et le nombre d’échéances. Cette page applique une formule d’annuité constante.' },
    { q: 'Faut-il saisir le taux nominal ou le TAEG ?', a: 'Saisissez le taux nominal utilisé pour les intérêts. Le TAEG sert à comparer un coût plus complet et ne se remplace pas directement dans cette formule.' },
    { q: 'L’assurance emprunteur est-elle incluse ?', a: 'Non. Son coût et sa structure dépendent du contrat et doivent être ajoutés séparément.' },
    { q: 'Pourquoi la mensualité baisse-t-elle sur 30 ans ?', a: 'Le capital est réparti sur davantage d’échéances, mais le total d’intérêts augmente généralement.' },
    { q: 'Le calcul fonctionne-t-il à 0 % ?', a: 'Oui. Le capital est alors divisé par le nombre de mensualités.' },
    { q: 'Puis-je simuler un taux variable ?', a: 'Vous pouvez tester un scénario de taux, mais l’outil ne reproduit ni révisions, ni indice, ni plafond contractuel.' },
    { q: 'Le résultat indique-t-il ma capacité d’emprunt ?', a: 'Non. Aucun revenu, charge, apport complet, risque ou critère du prêteur n’est analysé.' },
    { q: 'Le calculateur produit-il un tableau d’amortissement ?', a: 'Non. Il fournit mensualité et totaux, sans capital restant dû mois par mois.' },
  ],
  labels: {
    loanAmount: 'Capital emprunté',
    annualRate: 'Taux nominal annuel hypothétique (%)',
    termYears: 'Durée (années entières)',
    calculate: 'Calculer la mensualité',
    copy: 'Copier le résultat',
    monthlyPayment: 'Mensualité capital + intérêts',
    totalPayments: 'Total des échéances',
    totalInterest: 'Intérêts calculés',
    invalidInput: 'Saisissez un capital supérieur à 0, un taux entre 0 % et 100 % et une durée entière de 1 à 100 ans.',
    copied: 'Résultat copié',
    defaultLoanAmount: '200000',
    defaultAnnualRate: '3',
    defaultTermYears: '25',
    assumption: 'Exemple modifiable : 200 000 à 3 % sur 25 ans. Le taux n’est ni une offre actuelle ni un TAEG.',
  },
  formula: {
    expression: 'Mensualité = P × i ÷ [1 − (1 + i)⁻ⁿ]',
    explanation: 'P est le capital, i le taux nominal annuel divisé par 12 et n le nombre de mensualités. À taux nul, la mensualité vaut P ÷ n.',
  },
  privacyNote: 'Capital, taux et durée sont calculés localement dans cet onglet et ne sont pas envoyés à FunnyTools.',
  disclaimer: 'Simulation éducative d’une échéance constante hors TAEG, assurance et frais. Ce n’est ni une offre, ni une capacité d’emprunt, ni un conseil financier ou juridique.',
};

export const frenchMortgagePaymentReview = {
  heading: 'Contrôler une simulation de prêt immobilier',
  intro: 'Une mensualité utile doit être rapprochée du taux nominal, du TAEG, de l’assurance et du budget complet.',
  panels: [
    { title: 'Données', text: 'Vérifiez capital financé, taux nominal fixe, durée et monnaie.' },
    { title: 'Coût', text: 'Ajoutez assurance, garantie, dossier, acquisition et charges du logement.' },
    { title: 'Contrat', text: 'Comparez l’échéancier et le TAEG de chaque offre écrite.' },
  ],
  checklistHeading: 'Liste de contrôle',
  checklist: [
    'Le capital n’est pas confondu avec le prix du bien.',
    'Le taux nominal est distingué du TAEG.',
    'Assurance et frais ont été ajoutés.',
    'Plusieurs durées ont été comparées.',
    'Le résultat a été confronté à un échéancier contractuel.',
  ],
};

export const frenchCompoundInterest: ToolContent = {
  name: 'Calculateur d’intérêts composés',
  short: 'Projetez un capital initial et des versements mensuels avec un taux annuel, une durée et une fréquence de capitalisation.',
  long: 'Ce calculateur d’intérêts composés fait croître un capital initial, puis ajoute un versement à la fin de chaque mois. Le taux annuel nominal et la fréquence choisis sont convertis en taux mensuel équivalent. La page affiche capital futur, sommes versées et intérêts arithmétiques, avec une courbe annuelle. Elle n’intègre ni frais, ni fiscalité, ni inflation, ni perte, ni variation de taux. Le rendement reste une hypothèse saisie par l’utilisateur, jamais une promesse.',
  seoTitle: 'Calculateur intérêts composés avec versements',
  seoDescription: 'Calculez des intérêts composés avec capital initial, versements mensuels, taux et durée. Formule, frais, inflation et risques expliqués.',
  keywords: [
    'calculateur intérêts composés',
    'calcul intérêts composés avec versements mensuels',
    'simulateur épargne mensuelle',
    'calcul capital futur',
    'formule intérêts composés',
    'effet boule de neige épargne',
    'capitalisation mensuelle',
    'rendement composé',
  ],
  capabilities: [
    'Combiner capital initial et versements mensuels constants.',
    'Tester un taux annuel de 0 % à 100 %.',
    'Comparer capitalisations annuelle, trimestrielle, mensuelle et quotidienne.',
    'Séparer versements cumulés et intérêts arithmétiques.',
    'Visualiser un solde à chaque fin d’année.',
  ],
  contentSections: [
    {
      heading: 'Réponse rapide : calculer des intérêts composés',
      paragraphs: [
        'Saisissez le capital de départ, le versement ajouté à la fin de chaque mois, un taux annuel hypothétique, une durée entière et une fréquence de capitalisation. À 0 %, 10 000 de départ plus 200 par mois pendant 10 ans donnent exactement 34 000 versés et 34 000 de capital futur. À 4 % nominal capitalisé mensuellement, le même scénario atteint environ 44 358, dont 10 358 d’intérêts mathématiques.',
        'Ces chiffres sont nominaux et avant tous frais, impôts et prélèvements. Le scénario à 4 % ne signifie pas qu’un produit français rapportera 4 % chaque année. Pour une base prudente, commencez à 0 %, puis testez une hypothèse nette documentée et une hypothèse défavorable. Gardez la même unité monétaire pour capital, versements et résultats.',
      ],
    },
    {
      heading: 'Comment la capitalisation est appliquée chaque mois',
      paragraphs: [
        'Le taux annuel nominal r est divisé par la fréquence k, puis converti en taux mensuel équivalent : (1 + r/k)^(k/12) − 1. Chaque mois, le solde est multiplié par 1 + taux mensuel, puis le versement est ajouté. Le premier versement mensuel ne produit donc pas d’intérêt pendant le mois qui précède son arrivée.',
        'Cette convention est cohérente pour comparer les quatre options du formulaire, mais elle ne reproduit pas nécessairement la règle d’un Livret A, d’une assurance-vie, d’un fonds ou d’un compte à terme. Dates de valeur, quinzaines, frais, unités de compte et calcul contractuel peuvent différer. Utilisez les conditions du produit pour choisir une convention pertinente.',
      ],
    },
    {
      heading: 'Capital initial, versements et intérêts affichés',
      paragraphs: [
        'La somme versée est capital initial + versement mensuel × nombre de mois. Les intérêts affichés sont capital futur − somme versée. Si le taux vaut zéro, ils valent zéro. Le calcul interne conserve les décimales, puis l’écran arrondit à l’unité la plus proche ; une différence de quelques centimes avec une feuille de calcul n’indique pas nécessairement une erreur.',
        'Le graphique utilise un point à chaque fin d’année. Il montre le solde total, pas une séparation entre versements et rendement. Son axe vertical s’adapte au maximum du scénario et ne permet pas de comparer visuellement deux calculs lancés à des moments différents. Pour une décision, notez les résultats exacts plutôt que d’interpréter seulement la pente.',
      ],
    },
    {
      heading: 'Taux brut, taux net et rendement réel',
      paragraphs: [
        'Un taux brut ne dit pas ce que l’épargnant conservera. L’AMF distingue le rendement net de frais et rappelle que frais d’entrée, de versement, de gestion, de garde et de sortie peuvent réduire le capital final. La fiscalité dépend ensuite du produit et de la situation. Cette page ne dispose d’aucun champ de frais ou d’impôt : si vous saisissez un taux brut, le résultat reste brut.',
        'Le rendement réel tient encore compte de l’inflation. Un capital peut augmenter en euros tout en perdant du pouvoir d’achat. Pour une dépense future, projetez aussi le prix de l’objectif ou utilisez un taux réel cohérent. Ne soustrayez mécaniquement un taux d’inflation à un taux nominal sans vérifier la convention ; comparez au minimum montant nominal et pouvoir d’achat estimé.',
      ],
      link: {
        prefix: 'L’AMF explique les champs et limites de ',
        label: 'ses simulateurs de frais et d’épargne',
        href: 'https://www.amf-france.org/fr/espace-epargnants/lexique-simulateurs-et-outils-pratiques/nos-simulateurs',
        suffix: '.',
      },
    },
    {
      heading: 'La durée amplifie autant les hypothèses que les intérêts',
      paragraphs: [
        'La capitalisation devient plus visible avec le temps parce que les intérêts passés entrent dans le solde suivant. Elle amplifie aussi une hypothèse erronée : maintenir artificiellement 8 % pendant 40 ans produit un chiffre très précis mais peut-être sans rapport avec un rendement net réalisable. Faites varier taux, durée et régularité des versements séparément.',
        'Une projection longue devrait comporter au moins une base à 0 %, un scénario central documenté et un scénario de rendement plus faible. Si le placement peut perdre de la valeur, cette page ne suffit pas car elle refuse les taux négatifs et suppose une progression régulière. Une feuille de calcul ou un outil probabiliste est nécessaire pour représenter volatilité et séquences de rendement.',
      ],
    },
    {
      heading: 'Fréquence annuelle, trimestrielle, mensuelle ou quotidienne',
      paragraphs: [
        'À taux nominal identique et positif, une capitalisation plus fréquente augmente légèrement le taux effectif dans ce modèle. Cela ne veut pas dire qu’une offre « quotidienne » est meilleure : le taux annoncé, les frais, les dates de valeur et les conditions de disponibilité peuvent être différents. Comparez des rendements nets et des risques équivalents, pas un seul libellé.',
        'Le versement, lui, reste mensuel quelle que soit l’option. Choisir « quotidienne » ne transforme pas 200 par mois en versements quotidiens. Le calcul crée seulement un taux mensuel mathématiquement équivalent à 365 capitalisations annuelles. Les années bissextiles, jours réels et calendriers bancaires ne sont pas simulés.',
      ],
    },
    {
      heading: 'Risque, disponibilité et absence de rendement garanti',
      paragraphs: [
        'L’AMF relie l’objectif d’épargne à l’horizon, au risque et à la disponibilité des fonds. Une épargne destinée à une dépense proche ne devrait pas dépendre d’un scénario volatil sans accepter le risque de manquer la date. Un rendement élevé annoncé comme garanti et liquide doit susciter une vigilance particulière.',
        'Le formulaire ne recommande aucun produit, ne vérifie aucun intermédiaire et ne protège pas contre une fraude. Il ignore baisse de marché, défaut, blocage, pénalité de sortie et change. Avant d’investir, contrôlez l’autorisation de l’acteur, la documentation, les frais, la liquidité et le risque de perte en capital.',
      ],
      link: {
        prefix: 'Pour relier rendement, risque et inflation, consultez ',
        label: 'le dossier épargnants de l’AMF',
        href: 'https://www.amf-france.org/fr/espace-epargnants/savoir-bien-investir/cadrer-son-projet/rendement-et-risque-des-placements-en-actions-0',
        suffix: '.',
      },
    },
    {
      heading: 'Erreurs fréquentes et limites des entrées',
      paragraphs: [
        'Saisissez 4 pour 4 %, pas 0,04. Capital et versement peuvent être nuls mais pas négatifs ; le taux doit rester entre 0 % et 100 % ; la durée est un entier de 1 à 100 ans. Une durée fractionnaire ou une fréquence inconnue est refusée. Un scénario entièrement nul est valide et montre simplement un capital final nul.',
        'Ne confondez pas fréquence de versement et fréquence de capitalisation, ni taux nominal et taux effectif. N’utilisez pas le champ versement pour une somme annuelle. Si les apports sont irréguliers, si un retrait est prévu ou si le taux change, décomposez les périodes dans une feuille datée plutôt que de moyenner des flux très différents.',
      ],
    },
    {
      heading: 'Confidentialité et usage pédagogique',
      paragraphs: [
        'Capital, versement, taux, durée et fréquence restent dans cet onglet. FunnyTools ne les stocke pas et ne demande ni compte, ni établissement, ni produit détenu. Le graphique est généré localement en SVG et aucun historique de scénarios n’est conservé.',
        'La projection n’est ni un conseil d’investissement, ni une promesse, ni une estimation personnalisée après frais et fiscalité. Vérifiez les hypothèses avec des sources officielles et les documents du produit. Pour une somme importante, une retraite ou un horizon long, demandez un accompagnement qualifié adapté à votre situation.',
      ],
    },
  ],
  instructions: [
    'Saisissez capital initial et versement de fin de mois.',
    'Commencez par un taux de 0 % comme base sans rendement.',
    'Ajoutez une durée entière et la fréquence de capitalisation.',
    'Comparez capital futur, versements et intérêts.',
    'Recalculez après frais, fiscalité, inflation et risque.',
  ],
  examples: [
    'Projeter 10 000 puis 200 par mois pendant 10 ans à 0 %.',
    'Comparer le même scénario à 0 %, 2 % et 4 %.',
    'Mesurer l’effet de cinq années supplémentaires.',
    'Vérifier si des frais annuels annulent une partie du rendement.',
  ],
  audience: [
    'Épargnants étudiant un scénario de versements réguliers.',
    'Étudiants apprenant la capitalisation.',
    'Personnes comparant durée, taux et régularité.',
    'Utilisateurs souhaitant une projection locale sans compte.',
  ],
  caseStudies: [
    { title: 'Base sans rendement', description: 'Une personne commence à 0 % pour isoler ses 34 000 de versements avant de tester une hypothèse nette documentée.' },
    { title: 'Taux brut trompeur', description: 'Un rendement de 4 % est diminué des frais réels dans un calcul séparé avant d’être utilisé comme scénario.' },
    { title: 'Objectif proche', description: 'L’épargnant refuse de dépendre d’un rendement volatil pour une dépense prévue dans deux ans et privilégie la disponibilité.' },
  ],
  notes: [
    'Les versements sont ajoutés à la fin de chaque mois.',
    'Le taux est nominal, fixe et choisi par l’utilisateur.',
    'Les taux négatifs et rendements variables ne sont pas modélisés.',
    'Frais, fiscalité et inflation sont exclus.',
    'La courbe représente le solde en fin d’année.',
  ],
  faq: [
    { q: 'Comment calculer les intérêts composés avec des versements mensuels ?', a: 'Le solde produit d’abord le rendement mensuel, puis le versement est ajouté. La séquence est répétée pendant la durée choisie.' },
    { q: 'Quelle différence entre intérêt simple et composé ?', a: 'Dans le modèle composé, les intérêts déjà ajoutés participent aux calculs suivants.' },
    { q: 'Le taux de 4 % est-il garanti ?', a: 'Non. Tout taux saisi est une hypothèse et le calcul ne vérifie aucun produit.' },
    { q: 'Les frais et impôts sont-ils déduits ?', a: 'Non. Utilisez un taux net documenté ou effectuez un calcul séparé.' },
    { q: 'Le calcul tient-il compte de l’inflation ?', a: 'Non. Le capital est nominal ; projetez aussi le prix futur ou le pouvoir d’achat.' },
    { q: 'Quand le versement mensuel est-il ajouté ?', a: 'À la fin de chaque mois, après le rendement mensuel du solde existant.' },
    { q: 'Puis-je saisir un rendement négatif ?', a: 'Non. Cette version accepte 0 % à 100 % et ne modélise pas les pertes ou la volatilité.' },
    { q: 'Capitalisation quotidienne signifie-t-elle versement quotidien ?', a: 'Non. Seul le taux est converti ; le versement reste mensuel.' },
  ],
  labels: {
    principal: 'Capital initial',
    monthly: 'Versement à la fin de chaque mois',
    rate: 'Taux annuel nominal hypothétique (%)',
    years: 'Durée (années entières)',
    compounding: 'Fréquence de capitalisation',
    monthlyCompounding: 'Mensuelle',
    quarterlyCompounding: 'Trimestrielle',
    yearlyCompounding: 'Annuelle',
    dailyCompounding: 'Quotidienne (modèle 365)',
    calculate: 'Calculer la projection',
    copy: 'Copier le résultat',
    futureValue: 'Capital futur nominal',
    contributed: 'Sommes versées',
    interest: 'Intérêts arithmétiques',
    chartTitle: 'Évolution du solde en fin d’année',
    invalidInput: 'Utilisez des montants positifs ou nuls, un taux entre 0 % et 100 % et une durée entière de 1 à 100 ans.',
    copied: 'Résultat copié',
    defaultPrincipal: '10000',
    defaultMonthly: '200',
    defaultRate: '0',
    defaultYears: '10',
    assumption: 'Le taux démarre à 0 % : aucun rendement français ou futur n’est présumé.',
  },
  formula: {
    expression: 'Soldeₘ = soldeₘ₋₁ × (1 + rₘ) + versement',
    explanation: 'rₘ = (1 + r/k)^(k/12) − 1, avec r taux annuel nominal et k fréquence de capitalisation.',
  },
  privacyNote: 'Les montants, taux, durée, résultats et graphique restent dans cet onglet.',
  disclaimer: 'Projection éducative à taux constant, hors frais, impôts, inflation et pertes. Aucun rendement n’est garanti et aucun produit n’est recommandé.',
};

export const frenchCompoundInterestReview = {
  heading: 'Contrôler une projection composée',
  intro: 'Une valeur future n’est utile que si taux, flux, frais, inflation et risque sont explicités.',
  panels: [
    { title: 'Convention', text: 'Confirmez taux nominal, fréquence et versement de fin de mois.' },
    { title: 'Scénarios', text: 'Comparez 0 %, une hypothèse nette documentée et un cas défavorable.' },
    { title: 'Réalité', text: 'Déduisez frais et fiscalité, puis examinez inflation, liquidité et pertes.' },
  ],
  checklistHeading: 'Liste de contrôle',
  checklist: [
    'Tous les montants utilisent la même monnaie.',
    'Le taux n’est pas présenté comme garanti.',
    'Les versements sont supposés constants et en fin de mois.',
    'Frais, fiscalité et inflation ont été traités séparément.',
    'Le risque de perte est évalué hors de ce modèle.',
  ],
};

export const frenchSavingsGoal: ToolContent = {
  name: 'Calculateur d’objectif d’épargne',
  short: 'Calculez le temps nécessaire ou le versement mensuel pour atteindre une somme cible avec une hypothèse de rendement.',
  long: 'Ce calculateur d’objectif d’épargne propose deux questions : combien de mois faut-il avec un versement constant, ou combien verser chaque mois pour une échéance donnée. Le solde produit un taux mensuel équivalent, puis le versement arrive en fin de mois. La version française démarre à 0 % afin de ne présumer aucun rendement. Inflation, frais, fiscalité, retraits, pertes et irrégularité des versements restent hors calcul ; le résultat est un plan arithmétique, pas une recommandation de placement.',
  seoTitle: 'Calculateur objectif épargne et versement mensuel',
  seoDescription: 'Calculez combien épargner par mois ou le temps nécessaire pour atteindre un objectif. Taux 0 %, inflation, frais et limites expliqués.',
  keywords: [
    'calculateur objectif épargne',
    'combien épargner par mois',
    'calcul effort épargne mensuel',
    'temps pour atteindre objectif épargne',
    'simulateur projet épargne',
    'plan épargne mensuel',
    'calcul capital cible',
    'objectif épargne sans intérêt',
  ],
  capabilities: [
    'Calculer le premier mois où une cible est atteinte.',
    'Déterminer un versement mensuel pour une durée fixe.',
    'Utiliser un taux annuel effectif de 0 % comme base.',
    'Détecter une cible déjà atteinte ou un scénario immobile.',
    'Conserver cible, solde et résultat dans le navigateur.',
  ],
  contentSections: [
    {
      heading: 'Réponse rapide : combien épargner par mois',
      paragraphs: [
        'Choisissez « Combien verser par mois ? », saisissez la cible, le montant déjà disponible, le nombre de mois et un taux annuel effectif hypothétique. Avec une cible de 20 000, un solde de 5 000, 36 mois et 0 %, il faut mathématiquement 416,67 par mois ; l’écran arrondit vers le haut et affiche 417 pour ne pas sous-estimer le versement entier.',
        'Pour connaître la durée, choisissez « Dans combien de temps ? » et indiquez le versement mensuel. Avec la même cible, 5 000 déjà disponibles, 300 par mois et 0 %, le premier dépassement arrive au 50e mois, soit 4 ans et 2 mois. Les valeurs utilisent une unité monétaire neutre : conservez la même devise et ajoutez un petit coussin aux objectifs réels.',
      ],
    },
    {
      heading: 'Deux modes, une convention de versement en fin de mois',
      paragraphs: [
        'Le mode durée avance mois par mois : solde précédent × (1 + taux mensuel), puis versement. Il s’arrête au premier mois où le solde atteint ou dépasse la cible, avec un maximum de 1 200 mois. Le mode versement fixe la durée et résout la même annuité pour obtenir l’effort mensuel nécessaire.',
        'Les apports sont supposés constants et versés à la fin de chaque mois. Un virement en début de mois pourrait produire un résultat légèrement différent. Les dates réelles, mois incomplets, week-ends et délais bancaires ne sont pas modélisés. Pour une échéance exacte, comptez les versements réellement possibles avant la date de paiement.',
      ],
    },
    {
      heading: 'Taux annuel effectif et base prudente à 0 %',
      paragraphs: [
        'Le taux mensuel vaut (1 + taux annuel)^(1/12) − 1. Il s’agit ici d’un taux annuel effectif hypothétique, contrairement au taux nominal et à la fréquence séparée du calculateur d’intérêts composés. La version française commence à 0 % : le résultat dépend alors uniquement du solde et de l’effort d’épargne.',
        'Si vous testez 3 %, documentez s’il est brut ou net et si le produit peut réellement maintenir ce rendement. Pour une cible de 20 000, 5 000 de départ et 36 mois, 3 % réduit le versement mathématique à environ 386,63, affiché 387. Cette différence n’est pas garantie : frais, fiscalité, changement de taux ou perte peuvent l’annuler.',
      ],
    },
    {
      heading: 'Définir une cible avec montant, date, devise et usage',
      paragraphs: [
        '« Mettre de l’argent de côté » ne suffit pas pour calculer. Une cible exploitable précise par exemple « 8 000 € disponibles le 1er septembre 2028 pour formation et matériel ». Séparez les projets de dates ou priorités différentes et ne comptez pas une même somme à la fois comme apport immobilier, voyage et épargne de précaution.',
        'Vérifiez le prix complet : frais, marge d’imprévu et éventuel change. Une cible en euros ne doit pas être additionnée à un solde dans une autre monnaie sans scénario de conversion. Si le prix évolue, mettez à jour le montant au lieu d’augmenter artificiellement le rendement attendu pour conserver l’ancien versement.',
      ],
    },
    {
      heading: 'Inflation et pouvoir d’achat de la cible',
      paragraphs: [
        'Le formulaire calcule un montant nominal. L’AMF rappelle que 100 € dans plusieurs années n’ont pas le même pouvoir d’achat qu’aujourd’hui et que l’inflation est particulièrement importante sur un horizon long. Une cible actuelle de 20 000 peut donc être insuffisante au moment du projet.',
        'FunnyTools ne possède pas de champ d’inflation. Projetez le prix futur séparément, créez une cible minimale et une cible avec marge, puis révisez-les régulièrement. Un rendement supérieur à zéro ne règle pas automatiquement le problème : ce qui importe est le rendement net après frais, impôts et inflation, avec le risque associé.',
      ],
      link: {
        prefix: 'L’AMF détaille ces limites dans ',
        label: 'la présentation de ses simulateurs d’épargne',
        href: 'https://www.amf-france.org/fr/espace-epargnants/lexique-simulateurs-et-outils-pratiques/nos-simulateurs',
        suffix: '.',
      },
    },
    {
      heading: 'Frais, fiscalité, risque et liquidité',
      paragraphs: [
        'Aucun frais d’entrée, de versement, de gestion ou de sortie n’est retiré. Aucun impôt ou prélèvement social n’est calculé. Le taux ne change jamais et le modèle n’accepte pas de rendement négatif. Un placement réel peut donc produire moins, immobiliser les fonds ou perdre du capital alors que la courbe arithmétique progresse régulièrement.',
        'La disponibilité doit correspondre à l’objectif. L’AMF distingue notamment épargne de précaution immédiatement accessible et capital destiné à un projet. Pour une dépense certaine et proche, ne dépendez pas d’un actif volatil sans plan de repli. FunnyTools ne choisit aucun livret, compte, assurance-vie, PER, fonds ou titre.',
      ],
      link: {
        prefix: 'Pour relier projet et disponibilité, consultez ',
        label: 'la fiche AMF sur la définition d’un objectif d’épargne',
        href: 'https://www.amf-france.org/fr/espace-epargnants/savoir-bien-investir/cadrer-son-projet/definir-son-objectif',
        suffix: '.',
      },
    },
    {
      heading: 'Que faire si la cible paraît impossible',
      paragraphs: [
        'Avec versement nul et taux nul, un solde inférieur à la cible ne progresse pas ; le message indique alors que le scénario ne l’atteint pas. Une croissance très lente peut aussi dépasser la limite de 1 200 mois. Ce n’est pas une prédiction sur votre avenir, mais le diagnostic des hypothèses saisies.',
        'Calculez l’écart entre versement disponible et versement requis. Les leviers arithmétiques sont une cible plus basse, une date plus éloignée, un solde initial plus élevé ou un versement supérieur. Une hausse de taux espéré ne dépend pas de vous et ajoute souvent du risque ; ne l’utilisez pas pour masquer un budget impossible.',
      ],
    },
    {
      heading: 'Cible atteinte, versement nul et redémarrage du plan',
      paragraphs: [
        'Si le solde actuel égale ou dépasse la cible, la page indique immédiatement que l’objectif est atteint. En mode versement, une croissance théorique du solde peut aussi rendre l’apport requis égal à zéro. Cela ne signifie pas que le résultat futur est assuré : vérifiez disponibilité, frais et risque pendant toute la période.',
        'Après un mois sans versement, un retrait ou un changement de prix, remplacez le solde par la valeur réelle et réduisez le nombre de mois restants. L’outil ne conserve aucun historique. Un plan maintenu avec des données obsolètes peut sembler précis tout en étant déjà insuffisant.',
      ],
    },
    {
      heading: 'Erreurs de saisie, arrondis et limites',
      paragraphs: [
        'La cible doit être supérieure à zéro ; solde et versement ne peuvent pas être négatifs ; le taux va de 0 % à 100 % ; la durée est un entier de 1 à 1 200 mois. Écrivez 3 pour 3 %, pas 0,03. Une valeur invalide efface le résultat précédent et affiche un message en français.',
        'Le versement requis est arrondi vers l’unité supérieure. Le mode durée, lui, affiche le premier mois complet qui atteint la cible. Pour une monnaie à décimales, calculez avec une marge plutôt que de considérer l’entier comme une instruction bancaire exacte. Les versements hebdomadaires ou irréguliers nécessitent une conversion prudente ou un calendrier détaillé.',
      ],
    },
    {
      heading: 'Confidentialité et limites du conseil',
      paragraphs: [
        'Cible, solde, versement, durée et taux restent dans cet onglet. Aucun nom, revenu, banque ou motif n’est demandé, et FunnyTools ne stocke pas le plan. Fermer ou recharger la page réinitialise les valeurs visibles ; l’historique général peut conserver la visite selon le navigateur.',
        'La simulation est pédagogique et non contractuelle. Elle ne recommande aucun support, ne vérifie pas la protection des dépôts, ne garantit pas un rendement et ne remplace pas un budget ou un conseil adapté. Pour un objectif essentiel ou une somme importante, vérifiez les sources officielles et les conditions du produit.',
      ],
    },
  ],
  instructions: [
    'Choisissez durée nécessaire ou versement mensuel.',
    'Saisissez cible, solde réel et durée ou versement.',
    'Commencez à 0 % pour ne dépendre d’aucun rendement.',
    'Ajoutez une marge pour prix, frais et mois manqués.',
    'Mettez régulièrement le plan à jour avec le solde réel.',
  ],
  examples: [
    'Atteindre 20 000 avec 5 000 puis 300 par mois à 0 %.',
    'Calculer le versement pour réunir 20 000 dans 36 mois.',
    'Comparer une base à 0 % et une hypothèse nette documentée.',
    'Recalculer après un retrait ou un changement de prix.',
  ],
  audience: [
    'Personnes transformant un projet en effort mensuel.',
    'Ménages préparant apport ou épargne de précaution.',
    'Étudiants apprenant cible, durée et annuité.',
    'Utilisateurs voulant un calcul local sans compte.',
  ],
  caseStudies: [
    { title: 'Projet à date fixe', description: 'Une étudiante utilise 0 %, compte les 18 versements réellement possibles et ajoute une marge au coût de la formation.' },
    { title: 'Épargne de précaution', description: 'Un ménage garde la disponibilité comme critère principal et ne dépend pas d’un rendement volatil pour ses imprévus.' },
    { title: 'Cible révisée', description: 'Le prix du projet augmente ; la personne remplace l’ancien objectif et recalcule avec le solde réel plutôt que de conserver un plan dépassé.' },
  ],
  notes: [
    'Le versement est ajouté à la fin de chaque mois.',
    'Le taux annuel est effectif, constant et choisi par l’utilisateur.',
    'La durée maximale simulée est de 1 200 mois.',
    'Frais, impôts, inflation, retraits et pertes sont exclus.',
    'Tous les montants doivent utiliser la même monnaie.',
  ],
  faq: [
    { q: 'Combien faut-il épargner par mois pour un objectif ?', a: 'Choisissez le mode versement, puis indiquez cible, solde, mois et taux. Le résultat est arrondi vers l’unité supérieure.' },
    { q: 'Comment calculer le temps nécessaire ?', a: 'Choisissez le mode durée et saisissez votre versement mensuel. La page recherche le premier mois où la cible est atteinte.' },
    { q: 'Puis-je utiliser un taux de 0 % ?', a: 'Oui. C’est la base par défaut et elle évite de dépendre d’un rendement futur.' },
    { q: 'L’inflation est-elle incluse ?', a: 'Non. Mettez à jour la cible ou projetez séparément le prix futur.' },
    { q: 'Pourquoi le versement est-il arrondi vers le haut ?', a: 'Pour éviter qu’un entier arrondi vers le bas reste légèrement insuffisant.' },
    { q: 'Que se passe-t-il si la cible est déjà atteinte ?', a: 'La page le signale immédiatement et ne calcule pas de versement supplémentaire.' },
    { q: 'Les retraits et mois sans versement sont-ils gérés ?', a: 'Non. Remplacez ensuite le solde et la durée par les valeurs réelles.' },
    { q: 'Le résultat conseille-t-il un placement ?', a: 'Non. Risque, liquidité, frais, fiscalité et protection doivent être vérifiés séparément.' },
  ],
  labels: {
    modeTime: 'Dans combien de temps ?',
    modeMonthly: 'Combien verser par mois ?',
    target: 'Montant cible',
    current: 'Épargne disponible aujourd’hui',
    monthlyDeposit: 'Versement à la fin de chaque mois',
    annualRate: 'Taux annuel effectif hypothétique (%)',
    targetMonths: 'Durée (mois entiers)',
    calculate: 'Calculer l’objectif',
    copy: 'Copier le résultat',
    resultTitle: 'Résultat',
    timeResult: 'Temps estimé',
    monthlyResult: 'Versement mensuel nécessaire',
    years: 'ans',
    yearSingular: 'an',
    months: 'mois',
    monthSingular: 'mois',
    reached: 'L’objectif est déjà atteint',
    impossible: 'La cible n’est pas atteinte dans les 1 200 mois avec ces hypothèses. Modifiez versement, cible ou taux.',
    invalidInput: 'Utilisez une cible supérieure à 0, des montants non négatifs, un taux de 0 % à 100 % et une durée entière de 1 à 1 200 mois.',
    copied: 'Résultat copié',
    defaultTarget: '20000',
    defaultCurrent: '5000',
    defaultMonthlyDeposit: '300',
    defaultTargetMonths: '36',
    defaultAnnualRate: '0',
    assumption: 'Le taux démarre à 0 % : le plan de base ne dépend d’aucun rendement futur.',
  },
  formula: {
    expression: 'Soldeₘ = soldeₘ₋₁ × (1 + rₘ) + versement',
    explanation: 'rₘ = (1 + r annuel effectif)^(1/12) − 1. Le mode durée simule les mois ; l’autre mode résout le versement.',
  },
  privacyNote: 'Cible, solde, versement, durée et taux restent dans ce navigateur et ne sont pas envoyés à FunnyTools.',
  disclaimer: 'Plan arithmétique à taux et versements constants, hors inflation, frais, impôts et pertes. Ce n’est ni un conseil ni une promesse de rendement.',
};

export const frenchSavingsGoalReview = {
  heading: 'Contrôler un objectif d’épargne',
  intro: 'Un plan crédible relie une cible datée, un effort soutenable et des hypothèses prudentes.',
  panels: [
    { title: 'Cible', text: 'Précisez montant, monnaie, date, usage et marge.' },
    { title: 'Effort', text: 'Vérifiez que le versement tient dans le budget chaque mois.' },
    { title: 'Hypothèses', text: 'Commencez à 0 %, puis traitez inflation, frais, fiscalité et risque.' },
  ],
  checklistHeading: 'Liste de contrôle',
  checklist: [
    'La cible et la date correspondent au prix réellement attendu.',
    'Le solde n’est pas compté dans plusieurs projets.',
    'Le versement est soutenable et placé au bon moment.',
    'Le rendement n’est pas présenté comme garanti.',
    'Le plan sera recalculé avec les soldes réels.',
  ],
};
