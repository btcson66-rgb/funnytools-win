import type { ToolContent } from '../tools/_types';

export const frenchDateDifference: ToolContent = {
  name: 'Calculer la différence entre deux dates',
  short: 'Comptez les jours entre deux dates et comparez semaines, mois moyens, calendrier, jours de semaine et week-ends.',
  long: 'Ce calculateur mesure un intervalle entre deux dates civiles, sans heure ni fuseau horaire. Il peut inclure ou exclure la date de fin, remet automatiquement les bornes dans l’ordre et présente six lectures complémentaires : jours totaux, semaines et jours, mois approximatifs, années-mois-jours du calendrier, lundis à vendredis et week-ends. Il ne retire aucun jour férié et ne détermine pas un délai légal.',
  seoTitle: 'Différence entre deux dates : calcul en jours',
  seoDescription: 'Calculez la différence entre deux dates en jours, semaines, mois ou années-mois-jours. Choisissez si la date de fin doit être incluse.',
  keywords: [
    'calculer la différence entre deux dates',
    'nombre de jours entre deux dates',
    'calculateur de dates',
    'durée entre deux dates',
    'compter les jours',
    'inclure la date de fin',
    'différence années mois jours',
    'calcul de période',
  ],
  capabilities: [
    'Compter les jours avec une date de fin incluse ou exclue.',
    'Exprimer la durée en semaines complètes et jours restants.',
    'Afficher une approximation en mois fondée sur 30,4375 jours.',
    'Décomposer l’intervalle en années, mois et jours de calendrier.',
    'Séparer les lundis à vendredis des samedis et dimanches.',
  ],
  contentSections: [
    {
      heading: 'Réponse rapide : calculer la différence entre deux dates',
      paragraphs: [
        'Choisissez une date de début et une date de fin. Laissez « Inclure la date de fin » décoché pour mesurer le temps écoulé jusqu’au début de cette dernière date ; cochez-le lorsque les deux journées doivent appartenir au décompte. Appuyez sur « Calculer ». Le premier résultat donne le nombre de jours, puis la page propose des semaines, des mois moyens, un découpage calendaire et la répartition entre jours de semaine et week-ends.',
        'Une différence de dates n’a pas de convention universelle. Du 4 au 5 mars, il s’est écoulé un jour, mais une présence couvrant le 4 et le 5 occupe deux dates. Avant de partager le résultat, écrivez donc « date de fin incluse » ou « date de fin exclue ». Cette précision résout la plupart des écarts d’un jour entre une réservation, un planning, un tableur et un calcul manuel.',
      ],
    },
    {
      heading: 'Date de fin incluse ou exclue : quelle règle choisir ?',
      paragraphs: [
        'Le mode exclusif convient souvent à une durée écoulée : du lundi à mardi représente 24 heures civiles, et une arrivée le 10 avec un départ le 13 correspond généralement à trois nuits. Le mode inclusif convient à une campagne ouverte du lundi au mardi, à une liste de journées de présence ou à une période pour laquelle chaque date de début et de clôture compte. La question métier, pas le bouton, détermine la bonne règle.',
        'Un règlement peut encore appliquer une autre méthode : ne pas compter le jour de notification, commencer le lendemain, reporter une échéance ou imposer une heure limite. Cet outil ne lit aucun texte juridique. Pour un délai administratif, judiciaire, fiscal ou contractuel, identifiez d’abord la règle officielle, les jours à exclure et le territoire concerné, puis utilisez le calcul comme contrôle auxiliaire.',
      ],
    },
    {
      heading: 'Jours totaux, semaines et mois approximatifs',
      paragraphs: [
        'Les jours totaux constituent la mesure de base. Les semaines sont obtenues par division entière par sept : 60 jours donnent 8 semaines complètes et 4 jours. Il ne s’agit pas de semaines ISO, de semaines commençant le lundi ou de numéros de semaine ; ce sont simplement des blocs successifs de sept jours. Cette lecture est pratique pour exprimer une durée, mais ne remplace pas un calendrier hebdomadaire.',
        'La valeur en mois est explicitement approximative : elle divise le total par 30,4375, soit 365,25 ÷ 12. Les mois réels comptent 28, 29, 30 ou 31 jours. Pour une échéance mensuelle, un anniversaire ou une ancienneté, lisez plutôt le résultat en années, mois et jours. Ne transformez pas un mois moyen en mois contractuel sans vérifier la convention applicable.',
      ],
    },
    {
      heading: 'Comment fonctionne le calcul en années, mois et jours',
      paragraphs: [
        'Le découpage calendaire cherche le plus grand nombre de mois complets que l’on peut ajouter à la date initiale sans dépasser la date finale. Ce total devient ensuite des années complètes, des mois restants et enfin des jours. Le point d’ancrage reste toujours la date de départ ; il n’est pas progressivement déplacé par les ajustements des mois plus courts.',
        'Si le jour initial n’existe pas dans le mois d’arrivée, la calculatrice retient le dernier jour disponible. Un mois après le 31 janvier aboutit donc au 28 ou au 29 février, selon l’année. Deux mois après le 31 janvier peuvent aboutir au 31 mars. C’est une règle de calcul transparente, mais une banque, un abonnement ou une administration peut choisir une autre règle de fin de mois.',
      ],
    },
    {
      heading: 'Pourquoi les dates sont normalisées sans heure ni fuseau',
      paragraphs: [
        'Un champ HTML de type date fournit une année, un mois et un jour, mais aucune heure. Sa valeur technique suit le format AAAA-MM-JJ même lorsque le navigateur affiche 30/07/2026. FunnyTools valide cette date puis utilise une référence UTC uniforme pour compter les journées. Cela évite qu’un changement d’heure transforme un intervalle civil en 23 ou 25 heures et fausse la division par 24.',
        'Cette normalisation ne signifie pas que votre événement se déroule en UTC. Elle signifie seulement que la question contient des dates, pas des instants. Pour comparer un vol, un horaire de visioconférence ou deux événements dans des fuseaux différents, il faut fournir date, heure et zone IANA. La présente page ne possède pas ces données et ne calcule donc ni heures réelles ni décalages horaires.',
      ],
      link: {
        prefix: 'Le comportement du champ est détaillé dans ',
        label: 'la documentation française de input type="date" sur MDN',
        href: 'https://developer.mozilla.org/fr/docs/Web/HTML/Reference/Elements/input/date',
        suffix: '.',
      },
    },
    {
      heading: 'Lundis à vendredis, week-ends et jours fériés',
      paragraphs: [
        'La carte « Lundis à vendredis » compte chaque lundi, mardi, mercredi, jeudi et vendredi du même intervalle. La carte « Samedis et dimanches » compte le reste. Leur somme correspond aux jours totaux. Cette distinction est purement calendaire : un vendredi férié reste dans la première carte, et un salarié qui travaille le dimanche n’est pas modélisé.',
        'Pour déduire des jours fériés, utilisez le calculateur de jours ouvrés et chargez une liste adaptée. En France, « jour ouvrable » désigne couramment les jours pouvant être travaillés, souvent du lundi au samedi, tandis que « jour ouvré » correspond aux jours réellement travaillés dans l’organisation, souvent du lundi au vendredi. Un nombre de lundis à vendredis ne permet donc pas, à lui seul, de conclure sur un délai officiel.',
      ],
    },
    {
      heading: 'Dates inversées et absence de résultat négatif',
      paragraphs: [
        'Si la date la plus récente est saisie en premier, la page échange les bornes et affiche la distance absolue. Du 18 au 4 donne le même total que du 4 au 18. Cette tolérance évite un blocage lors d’une simple comparaison, mais elle retire la direction : le résultat ne dit pas si la seconde date est passée ou future par rapport à la première.',
        'Pour un compte à rebours, une ancienneté ou un délai, saisissez tout de même les dates dans leur ordre logique et gardez cet ordre dans la note copiée. Si le signe positif ou négatif est important, ajoutez-le séparément. La calculatrice répond « quelle distance sépare ces dates ? », pas « de combien la seconde précède-t-elle ou suit-elle la première ? ».',
      ],
    },
    {
      heading: 'Exemples de voyage, projet et anniversaire',
      paragraphs: [
        'Une arrivée le 4 et un départ le 9 donnent cinq jours en mode exclusif, une première estimation du nombre de nuits. Une opération ouverte du 1er au 7 inclus couvre sept dates. Un projet annoncé « du 4 au 18 » peut représenter quatorze jours écoulés ou quinze journées de calendrier : le document de référence doit lever l’ambiguïté avant tout calcul.',
        'Pour comparer deux anniversaires, le découpage calendaire est plus lisible que les mois moyens. Pour analyser une série statistique, les jours totaux sont plus faciles à comparer. Pour planifier une charge de travail, les lundis à vendredis donnent un premier filtre, mais il faut encore retirer congés, jours fériés, fermetures et indisponibilités propres à l’équipe.',
      ],
    },
    {
      heading: 'Confidentialité et limites du calculateur de dates',
      paragraphs: [
        'Les deux dates et les résultats sont calculés dans cet onglet. Aucun compte n’est nécessaire et FunnyTools ne conserve pas l’intervalle pour faire fonctionner l’outil. Le bouton de copie utilise le presse-papiers de l’appareil, qui peut être synchronisé ou accessible à d’autres applications. Une date peut devenir personnelle lorsqu’elle est associée à un nom ou à un dossier ; partagez uniquement ce qui est nécessaire.',
        'La page ne calcule pas les heures, les fuseaux, les semaines ISO, les jours fériés, les horaires d’ouverture, les dates scolaires, les intérêts ni les pénalités. Elle ne prédit pas non plus la date d’échéance à partir d’un nombre de jours ouvrés. Si le résultat engage de l’argent, un droit, un déplacement ou une démarche officielle, conservez la source qui définit les bornes et reproduisez le calcul dans le système responsable.',
      ],
    },
  ],
  instructions: [
    'Sélectionnez les deux dates à comparer.',
    'Décidez explicitement si la date de fin appartient au décompte.',
    'Lancez le calcul et choisissez l’unité adaptée à votre question.',
    'Vérifiez si des jours fériés, horaires ou règles de report manquent.',
    'Copiez le résultat avec la mention « fin incluse » ou « fin exclue ».',
  ],
  examples: [
    'Compter les nuits entre une arrivée et un départ.',
    'Mesurer une campagne en incluant ses deux dates limites.',
    'Exprimer une ancienneté en années, mois et jours.',
    'Séparer les jours de semaine des week-ends avant d’ajouter les fermetures.',
  ],
  audience: [
    'Personnes organisant un voyage, un événement ou un projet.',
    'Équipes qui documentent une durée avec une règle reproductible.',
    'Utilisateurs comparant des anniversaires ou périodes longues.',
    'Toute personne souhaitant un calcul local sans créer de compte.',
  ],
  caseStudies: [
    { title: 'Séjour mesuré par nuits', description: 'Du 4 au 9, le mode exclusif affiche cinq jours. La personne vérifie ensuite la règle de facturation de l’hébergement.' },
    { title: 'Campagne avec clôture comprise', description: 'Du 1er au 7, la responsable active la date de fin et documente sept journées dans son rapport.' },
    { title: 'Départ au 31 janvier', description: 'Le découpage retient la fin du mois lorsque février ne contient pas le jour 31 ; le contrat reste la source de la règle réelle.' },
  ],
  notes: [
    'La date finale est exclue par défaut.',
    'Un mois approximatif vaut 30,4375 jours dans cet outil.',
    'Le découpage calendaire ramène au dernier jour d’un mois plus court.',
    'Les lundis à vendredis ne déduisent aucun jour férié.',
    'Une saisie inversée produit une distance absolue.',
  ],
  faq: [
    { q: 'Comment calculer la différence entre deux dates ?', a: 'Choisissez les deux dates, indiquez si la fin est incluse et lancez le calcul. Les jours totaux et plusieurs lectures complémentaires sont affichés.' },
    { q: 'Pourquoi deux dates identiques donnent-elles zéro ?', a: 'Le mode par défaut mesure le temps écoulé en excluant la fin. Cochez « Inclure la date de fin » pour compter cette journée.' },
    { q: 'Les mois affichés sont-ils exacts ?', a: 'La carte « mois » utilise 30,4375 jours et reste approximative. Le découpage années-mois-jours suit le calendrier avec une règle de fin de mois.' },
    { q: 'Que se passe-t-il à partir du 31 janvier ?', a: 'Si le mois d’arrivée ne contient pas le jour 31, le calcul retient son dernier jour disponible.' },
    { q: 'Le changement d’heure modifie-t-il le total ?', a: 'Non. Les entrées sont traitées comme dates civiles sans heure, avec une référence uniforme pour compter les jours.' },
    { q: 'Les jours fériés sont-ils retirés ?', a: 'Non. La répartition distingue seulement lundi-vendredi et samedi-dimanche.' },
    { q: 'Puis-je saisir la date finale en premier ?', a: 'Oui. Les bornes sont remises dans l’ordre et la distance affichée reste positive.' },
    { q: 'Puis-je calculer un délai légal ?', a: 'Seulement comme contrôle auxiliaire après avoir identifié la règle officielle. La page ne connaît ni jours fériés, ni heure limite, ni report d’échéance.' },
  ],
  labels: {
    startDate: 'Date de début',
    endDate: 'Date de fin',
    calculate: 'Calculer',
    includeEnd: 'Inclure la date de fin',
    result: 'Résultat',
    totalDays: 'Jours totaux',
    weeks: 'Semaines',
    weekSingular: 'semaine',
    weekPlural: 'semaines',
    days: 'jours',
    daySingular: 'jour',
    dayPlural: 'jours',
    months: 'Mois',
    monthSingular: 'mois',
    monthPlural: 'mois',
    years: 'ans',
    yearSingular: 'an',
    yearPlural: 'ans',
    weekdays: 'Lundis à vendredis',
    weekends: 'Samedis et dimanches',
    copyResult: 'Copier le résultat',
    copied: 'Résultat copié',
    invalidDate: 'Sélectionnez une date de début et une date de fin valides.',
    approximate: 'Env.',
    breakdown: 'Années, mois et jours',
  },
  privacyNote: 'Les dates et les résultats sont calculés dans cet onglet. FunnyTools ne les conserve pas ; la copie utilise le presse-papiers de votre appareil.',
  disclaimer: 'Aucun jour férié ni délai légal n’est interprété. Vérifiez les bornes, le calendrier territorial, l’heure limite et les règles de report auprès de la source responsable.',
};

export const frenchDateDifferenceReview = {
  heading: 'Vérifier une différence entre deux dates',
  intro: 'Un résultat reproductible indique les deux bornes, la règle d’inclusion et la nature exacte de l’unité.',
  panels: [
    { title: 'Bornes', text: 'Contrôlez que les dates correspondent bien au début et à la fin définis par votre source.' },
    { title: 'Inclusion', text: 'Précisez si la date finale est comptée ou si elle marque la fin exclusive.' },
    { title: 'Unité', text: 'Ne confondez pas mois moyen, mois civil et jour ouvré officiel.' },
  ],
  checklistHeading: 'Liste de contrôle',
  checklist: [
    'Les dates ont été relues dans leur ordre logique.',
    'La convention inclusive ou exclusive est notée.',
    'La règle de fin de mois convient à l’usage prévu.',
    'Les jours fériés et règles formelles sont vérifiés ailleurs.',
  ],
};

export const frenchAgeCalculator: ToolContent = {
  name: 'Calculateur d’âge exact',
  short: 'Calculez un âge en années, mois et jours à une date choisie, avec jours vécus et prochain anniversaire.',
  long: 'Ce calculateur d’âge compare une date de naissance à aujourd’hui ou à une autre date de référence. Il affiche l’âge calendaire, les jours vécus, des heures approximatives, le nombre de jours avant le prochain anniversaire, le jour de la semaine de naissance et une estimation ludique des battements du cœur. Pour une naissance le 29 février, il retient le 28 février lors d’une année non bissextile : cette convention technique ne remplace aucune règle légale ou administrative.',
  seoTitle: 'Calculateur d’âge exact : années, mois, jours',
  seoDescription: 'Calculez votre âge exact à une date donnée : années, mois, jours vécus, prochain anniversaire et jour de naissance, sans inscription.',
  keywords: [
    'calculateur d’âge',
    'calcul âge exact',
    'âge en années mois jours',
    'âge en années révolues',
    'combien de jours vécus',
    'prochain anniversaire',
    'âge à une date donnée',
    'anniversaire 29 février',
  ],
  capabilities: [
    'Calculer l’âge calendaire en années, mois et jours.',
    'Choisir aujourd’hui ou une date de référence personnalisée.',
    'Compter les jours civils vécus et des heures approximatives.',
    'Calculer la distance jusqu’au prochain anniversaire.',
    'Afficher le jour de naissance et une estimation ludique des battements.',
  ],
  contentSections: [
    {
      heading: 'Réponse rapide : comment calculer son âge exact',
      paragraphs: [
        'Saisissez la date de naissance, puis choisissez la date à laquelle l’âge doit être évalué. Le bouton « Aujourd’hui » rétablit la date courante de l’appareil. Après « Calculer », la première carte affiche les années, mois et jours du calendrier. Les autres cartes donnent les jours vécus, des heures approximatives, la prochaine date d’anniversaire, le jour de la semaine de naissance et une estimation ludique des battements.',
        'Pour répondre à « quel âge avais-je ce jour-là ? », changez uniquement la date de référence. Pour un formulaire demandant l’âge habituel, les années complètes suffisent généralement. Les mois et jours ne constituent pas une écriture décimale : 18 ans, 11 mois et 20 jours ne signifie pas 18,1120 ans. Une date de référence antérieure à la naissance est refusée.',
      ],
    },
    {
      heading: 'Âge en années révolues et âge atteint dans l’année',
      paragraphs: [
        'L’INSEE distingue l’âge atteint dans l’année, obtenu par différence entre les millésimes, et l’âge en années révolues, c’est-à-dire l’âge au dernier anniversaire. Le calculateur suit la seconde idée : tant que l’anniversaire n’est pas passé à la date de référence, l’année supplémentaire n’est pas acquise. Deux personnes nées la même année peuvent donc avoir un âge révolu différent le même jour.',
        'Cette distinction évite l’erreur qui consiste à soustraire seulement les années. Une personne née le 10 octobre 2000 n’a pas encore 26 ans le 30 juillet 2026, même si 2026 − 2000 vaut 26. Le résultat calendaire détaille les années complètes, puis les mois et les jours depuis le dernier anniversaire mensuel compatible.',
      ],
      link: {
        prefix: 'La définition statistique de référence est publiée par ',
        label: 'l’INSEE dans sa fiche « Âge »',
        href: 'https://www.insee.fr/fr/metadonnees/definition/c1187',
        suffix: '.',
      },
    },
    {
      heading: 'Méthode de calcul des années, mois et jours',
      paragraphs: [
        'La page cherche le plus grand nombre de mois complets depuis la naissance qui ne dépasse pas la date de référence. Elle le transforme en années et mois, puis calcule les jours restants. Cette méthode garde la date de naissance comme ancrage afin qu’un ajustement de fin de mois ne se propage pas de manière imprévisible.',
        'Lorsqu’un mois ne possède pas le même numéro de jour, son dernier jour est utilisé. Une naissance le 31 peut ainsi produire des résultats qui diffèrent d’une simple soustraction champ par champ. Le résultat décrit la convention du calculateur ; un contrat, un règlement sportif ou une procédure officielle peut appliquer sa propre date de bascule.',
      ],
    },
    {
      heading: 'Cas particulier d’une naissance le 29 février',
      paragraphs: [
        'Dans une année non bissextile, cette page traite le 28 février comme date d’anniversaire technique pour calculer l’âge et le prochain anniversaire. Ainsi, une personne née le 29 février 2000 atteint 26 ans selon cette convention le 28 février 2026. Ce choix rend le comportement stable et visible, mais il n’a pas vocation à trancher une question de droit.',
        'Les règles d’âge peuvent varier selon le pays, l’acte, l’école, la fédération sportive, l’assurance ou l’administration. Si une admissibilité dépend précisément du 28 février ou du 1er mars, consultez l’organisme qui décide et conservez sa réponse. Ne présentez pas la convention de FunnyTools comme une preuve d’âge ni comme l’interprétation officielle d’un texte.',
      ],
    },
    {
      heading: 'Jours vécus et heures approximatives',
      paragraphs: [
        'Les jours vécus mesurent la différence entre les deux dates civiles, en excluant le jour de référence comme nouvelle journée complète. Les années bissextiles sont naturellement présentes dans le calendrier. Les heures sont obtenues en multipliant les jours par 24 : c’est une conversion d’unités, pas le relevé du temps exact passé depuis l’heure de naissance.',
        'Sans heure, lieu et fuseau de naissance, la page ne peut pas compter des heures réelles. Les changements d’heure, voyages et fuseaux ne sont pas modélisés. Le nombre de jours est utile pour une curiosité ou une comparaison générale ; pour un dossier médical, scientifique ou juridique, employez les données et la méthode exigées par le professionnel responsable.',
      ],
    },
    {
      heading: 'Prochain anniversaire et jour de la semaine',
      paragraphs: [
        'Le prochain anniversaire est recherché dans l’année de référence, puis dans l’année suivante s’il est déjà passé. Le jour de la semaine de naissance est affiché en français à partir de la date civile. Ces informations sont des propriétés calendaires : elles n’ajoutent aucune interprétation astrologique, médicale ou psychologique.',
        'Lorsque la date de référence est exactement l’anniversaire selon la convention du calculateur, la distance affichée est zéro. Si vous préparez une invitation ou une échéance, vérifiez aussi l’année, le fuseau local et l’heure de début. L’outil ne crée ni rappel, ni événement de calendrier, ni notification.',
      ],
    },
    {
      heading: 'Estimation des battements : une illustration, pas une mesure',
      paragraphs: [
        'La carte des battements multiplie les jours vécus par 1 440 minutes puis par 70 battements par minute. Le nombre obtenu montre seulement l’ordre de grandeur associé à une hypothèse constante. Un cœur réel ne bat pas au même rythme à chaque minute : sommeil, activité, âge, santé, médicaments et bien d’autres facteurs font varier la fréquence.',
        'Cette estimation n’utilise aucun capteur, dossier de santé ou donnée physiologique. Elle ne permet pas d’évaluer la condition cardiaque, de comparer deux personnes ou de détecter un problème. En présence d’un symptôme ou d’une question médicale, ne déduisez rien de la carte et adressez-vous à un professionnel de santé.',
      ],
    },
    {
      heading: 'Date de naissance, vie privée et minimisation',
      paragraphs: [
        'Une date de naissance peut être une donnée personnelle et sert fréquemment à vérifier une identité. Ici, elle est traitée dans l’onglet pour effectuer le calcul ; FunnyTools n’a pas besoin de la stocker ni de créer un profil. La CNIL recommande de ne collecter que les données nécessaires et cite justement l’année de naissance comme solution lorsque la date complète est inutile.',
        'Même avec un traitement local, l’écran, l’historique du presse-papiers, une capture ou une extension peuvent exposer le résultat. Évitez de copier simultanément nom complet, numéro de dossier et date de naissance si l’âge seul suffit. Sur un appareil partagé, effacez le contenu copié et fermez la page après usage.',
      ],
      link: {
        prefix: 'Le principe est expliqué dans la fiche CNIL ',
        label: '« Minimiser les données collectées »',
        href: 'https://www.cnil.fr/fr/minimiser-les-donnees-collectees',
        suffix: '.',
      },
    },
    {
      heading: 'Quand le résultat ne constitue pas une preuve',
      paragraphs: [
        'La page ne vérifie ni acte de naissance, ni identité, ni majorité, ni aptitude. Elle ne connaît pas la date de coupure d’une inscription scolaire, d’une catégorie sportive, d’un tarif, d’une retraite ou d’une assurance. Une institution peut demander l’âge à une heure précise, au début d’une saison ou au 31 décembre, et traiter le 29 février selon une règle spécifique.',
        'Utilisez donc le calculateur pour comprendre ou contrôler une opération, puis appliquez le texte et les justificatifs demandés. Les heures et battements sont des estimations récréatives. Le résultat ne remplace pas un document d’état civil, un avis médical, une décision administrative ni la validation d’un organisme.',
      ],
    },
  ],
  instructions: [
    'Saisissez la date de naissance sans l’associer à d’autres données inutiles.',
    'Choisissez aujourd’hui ou la date exacte à laquelle l’âge doit être évalué.',
    'Lancez le calcul et lisez d’abord les années, mois et jours.',
    'Traitez heures et battements comme des approximations récréatives.',
    'Vérifiez la date de coupure et la règle du 29 février auprès de l’organisme concerné.',
  ],
  examples: [
    'Calculer l’âge en années révolues à la date du jour.',
    'Retrouver l’âge exact lors d’un événement passé.',
    'Compter les jours civils depuis une naissance.',
    'Préparer un anniversaire sans créer de compte ni de rappel.',
  ],
  audience: [
    'Personnes souhaitant connaître un âge exact à une date donnée.',
    'Familles qui préparent un anniversaire ou vérifient un calendrier.',
    'Étudiants qui veulent comprendre années révolues et années civiles.',
    'Utilisateurs privilégiant un calcul local sans conservation de la date.',
  ],
  caseStudies: [
    { title: 'Âge à une date historique', description: 'La personne saisit la date d’un diplôme comme référence afin d’obtenir son âge calendaire ce jour-là.' },
    { title: 'Naissance le 29 février', description: 'Le résultat applique le 28 février en 2026, puis la famille confirme la règle différente éventuelle auprès de l’organisme concerné.' },
    { title: 'Formulaire demandant seulement les années', description: 'L’utilisateur relève les années révolues et ne partage ni jours vécus ni date complète, car ils ne sont pas nécessaires.' },
  ],
  notes: [
    'L’âge principal suit les années révolues et le calendrier.',
    'Le 29 février est ramené au 28 février les années non bissextiles.',
    'Les heures valent jours vécus × 24.',
    'Les battements valent jours × 1 440 × 70 et ne sont pas mesurés.',
    'La page ne constitue ni justificatif d’identité ni décision officielle.',
  ],
  faq: [
    { q: 'Comment calculer mon âge exact ?', a: 'Saisissez la naissance et la date de référence. L’outil affiche les années, mois et jours complets selon sa convention calendaire.' },
    { q: 'Qu’est-ce que l’âge en années révolues ?', a: 'C’est l’âge atteint au dernier anniversaire, par opposition à la simple différence entre l’année courante et l’année de naissance.' },
    { q: 'Que fait le calculateur pour le 29 février ?', a: 'Lors d’une année non bissextile, il utilise le 28 février. Une règle officielle peut toutefois choisir une autre date.' },
    { q: 'Les jours vécus incluent-ils aujourd’hui ?', a: 'Ils mesurent les journées civiles écoulées entre la naissance et la date de référence ; le jour de référence n’est pas une journée complète supplémentaire.' },
    { q: 'Les heures vécues sont-elles exactes ?', a: 'Non. Elles correspondent aux jours multipliés par 24, sans heure de naissance, fuseau ni changement d’heure.' },
    { q: 'Pourquoi utiliser 70 battements par minute ?', a: 'C’est une hypothèse ronde destinée à illustrer un ordre de grandeur, pas une mesure ni une moyenne personnelle.' },
    { q: 'Ma date de naissance est-elle enregistrée ?', a: 'Non pour le fonctionnement de l’outil. Le calcul reste dans l’onglet ; le presse-papiers dépend ensuite de votre appareil.' },
    { q: 'Puis-je prouver ma majorité avec ce résultat ?', a: 'Non. Utilisez le justificatif et la date de référence exigés par l’organisme compétent.' },
  ],
  labels: {
    birthday: 'Date de naissance',
    asOf: 'Âge à la date du',
    calculate: 'Calculer',
    useToday: 'Aujourd’hui',
    result: 'Âge exact',
    years: 'ans',
    yearSingular: 'an',
    months: 'mois',
    monthSingular: 'mois',
    days: 'jours',
    daySingular: 'jour',
    hours: 'heures',
    daysLived: 'Jours vécus',
    nextBirthday: 'Avant le prochain anniversaire',
    bornWeekday: 'Jour de naissance',
    heartbeats: 'Estimation ludique des battements',
    copyResult: 'Copier le résultat',
    copied: 'Résultat copié',
    birthdayError: 'Sélectionnez d’abord une date de naissance valide.',
    futureError: 'La naissance ne peut pas être postérieure à la date de référence.',
    approximate: 'Env.',
  },
  privacyNote: 'La date de naissance et les résultats restent dans cet onglet. FunnyTools ne les conserve pas ; le presse-papiers reste sous le contrôle de votre appareil.',
  disclaimer: 'Les heures et battements sont des estimations récréatives. L’âge et la convention du 29 février ne remplacent aucune règle légale, scolaire, sportive, médicale ou administrative.',
};

export const frenchAgeCalculatorReview = {
  heading: 'Vérifier un calcul d’âge',
  intro: 'Un âge n’est pertinent que pour une date de référence et une convention clairement définies.',
  panels: [
    { title: 'Référence', text: 'Utilisez le jour exact demandé par la question, le formulaire ou le règlement.' },
    { title: 'Calendrier', text: 'Contrôlez les fins de mois et le traitement d’une naissance le 29 février.' },
    { title: 'Finalité', text: 'Distinguez une information personnelle d’une preuve ou décision officielle.' },
  ],
  checklistHeading: 'Liste de contrôle',
  checklist: [
    'La date de naissance a été relue.',
    'La date de référence correspond au moment réellement étudié.',
    'Les approximations ne sont pas présentées comme des mesures.',
    'La règle propre à l’organisme est vérifiée lorsque l’enjeu est formel.',
  ],
};

export const frenchBusinessDays: ToolContent = {
  name: 'Calculateur de jours ouvrés',
  short: 'Comptez les jours ouvrés entre deux dates en configurant week-ends, jours fériés 2026 et dates personnalisées.',
  long: 'Ce calculateur de jours ouvrés parcourt un intervalle de dates civiles. Il peut inclure la date finale, exclure samedi et dimanche et retirer des jours fériés saisis au format AAAA-MM-JJ. Un préréglage France métropolitaine 2026 reprend les 11 fêtes légales nationales ; les particularités d’Alsace-Moselle, les jours locaux, les conventions collectives et les horaires réels doivent être ajoutés ou vérifiés. La page ne détermine aucun délai légal, bancaire, fiscal ou judiciaire.',
  seoTitle: 'Calculateur de jours ouvrés entre deux dates',
  seoDescription: 'Calculez le nombre de jours ouvrés entre deux dates avec week-ends, jours fériés France 2026 et liste personnalisée.',
  keywords: [
    'calculateur de jours ouvrés',
    'nombre de jours ouvrés entre deux dates',
    'calcul jours ouvrés',
    'jours ouvrables',
    'jours calendaires',
    'jours fériés France 2026',
    'compter jours hors week-end',
    'délai en jours ouvrés',
  ],
  capabilities: [
    'Inclure ou exclure la date finale du décompte.',
    'Retirer samedi et dimanche ou les conserver comme dates candidates.',
    'Charger les 11 fêtes légales nationales françaises de 2026.',
    'Ajouter une date personnalisée valide par ligne et dédupliquer la liste.',
    'Auditer les jours calendaires, week-ends, fériés retirés et jours restants.',
  ],
  contentSections: [
    {
      heading: 'Réponse rapide : compter les jours ouvrés entre deux dates',
      paragraphs: [
        'Choisissez le début et la fin. Gardez « Inclure la date de fin » si les deux bornes appartiennent à la période. Pour une semaine habituelle du lundi au vendredi, laissez « Exclure samedi et dimanche » activé. Chargez « France métropolitaine 2026 » ou collez votre propre calendrier, une date par ligne au format AAAA-MM-JJ, puis appuyez sur « Calculer ».',
        'La première carte affiche les dates qui restent après vos exclusions. Les cartes suivantes indiquent le nombre total de jours calendaires du périmètre, les samedis et dimanches présents et les jours fériés effectivement retirés. Ces chiffres rendent le résultat vérifiable. Ils décrivent votre configuration, pas automatiquement le calendrier de votre employeur, de votre banque ou d’une administration.',
      ],
    },
    {
      heading: 'Jours calendaires, jours ouvrables et jours ouvrés',
      paragraphs: [
        'Les jours calendaires sont tous les jours du calendrier, du lundi au dimanche, jours fériés compris. Les jours ouvrables correspondent habituellement aux jours pouvant être légalement travaillés : souvent du lundi au samedi, hors repos hebdomadaire et fêtes légales non travaillées. Les jours ouvrés sont les jours réellement travaillés dans une entreprise ou une administration : souvent du lundi au vendredi, mais pas toujours.',
        'Le réglage par défaut de cette page modélise donc un calendrier courant de jours ouvrés, et non les jours ouvrables universels. Service-Public rappelle par exemple que certains congés payés sont décomptés en jours ouvrables du lundi au samedi. Avant tout calcul formel, reprenez le terme exact utilisé par la règle et identifiez le calendrier de l’organisation.',
      ],
      link: {
        prefix: 'Un exemple officiel de cette distinction figure dans ',
        label: 'l’explication de Service-Public sur le décompte en jours ouvrables',
        href: 'https://www.service-public.fr/particuliers/actualites/A17755',
        suffix: '.',
      },
    },
    {
      heading: 'Inclure la date finale et définir le premier jour',
      paragraphs: [
        'Case cochée, la boucle examine les deux bornes. Case décochée, elle s’arrête juste avant la date finale. Pour une seule date, le mode inclusif compte cette date si elle passe les filtres ; le mode exclusif donne zéro. Cette différence d’une journée est essentielle pour une période de présence, une fenêtre de livraison ou un délai démarrant après une notification.',
        'La page remet les dates inversées dans l’ordre, mais ne décide pas quel événement déclenche le délai. Une règle peut exclure le jour de réception, commencer le lendemain, reporter le terme au premier jour utile ou fixer une heure de clôture. Simulez uniquement la règle que vous avez vérifiée et notez les deux bornes avec la convention retenue.',
      ],
    },
    {
      heading: 'Préréglage France métropolitaine 2026',
      paragraphs: [
        'Le préréglage contient les 11 fêtes légales nationales visées par l’article L3133-1 du Code du travail : 1er janvier, lundi de Pâques, 1er mai, 8 mai, Ascension, lundi de Pentecôte, 14 juillet, Assomption, Toussaint, 11 novembre et Noël. Pour 2026, les fêtes mobiles tombent les 6 avril, 14 mai et 25 mai. La liste n’est jamais activée sans action de votre part.',
        'Ce calendrier n’est pas complet pour chaque situation. L’Alsace-Moselle connaît des particularités, et des jours régionaux, locaux, conventionnels, bancaires, scolaires ou internes peuvent s’ajouter. Le lundi de Pentecôte peut aussi interagir avec les modalités de la journée de solidarité. Chargez le préréglage, relisez les lignes visibles et adaptez-les à la source de votre organisme.',
      ],
      link: {
        prefix: 'La liste nationale provient de ',
        label: 'l’article L3133-1 du Code du travail sur Légifrance',
        href: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000033020901',
        suffix: '.',
      },
    },
    {
      heading: 'Ajouter des jours fériés ou fermetures personnalisés',
      paragraphs: [
        'Saisissez une date par ligne sous la forme 2026-12-25. Les lignes vides sont ignorées. Une date impossible comme 2026-02-31, un texte libre ou un autre séparateur déclenche un avertissement ; les lignes valides restent utilisées pour que vous puissiez localiser puis corriger l’erreur. Les doublons sont automatiquement réduits à une seule date.',
        'Une date située hors de l’intervalle n’influence pas le résultat. Si samedi et dimanche sont déjà exclus, un jour férié tombant le week-end n’est pas soustrait une seconde fois. Si vous choisissez de conserver les week-ends, ce même férié est retiré car il redevenait une date candidate. Ce comportement évite les doubles déductions et reste visible dans les cartes d’audit.',
      ],
    },
    {
      heading: 'Week-ends, travail du samedi et organisations atypiques',
      paragraphs: [
        'L’option de week-end vise toujours samedi et dimanche. La désactiver réintègre ces deux jours, sauf s’ils figurent dans la liste fériée. Elle peut approcher une activité ouverte sept jours sur sept, mais elle ne permet pas de désigner vendredi-samedi comme repos, de gérer une alternance, des demi-journées ou un planning individuel.',
        'Une boulangerie, un hôpital, un commerce, un service international ou une équipe postée peut avoir des jours réellement ouvrés très différents. Dans ce cas, le nombre fourni n’est qu’un filtre simplifié. Pour connaître une capacité de travail, construisez un planning avec horaires, absences et rotations ; pour un droit salarié, utilisez le contrat, la convention collective et les informations de l’employeur.',
      ],
    },
    {
      heading: 'Exemple vérifiable avec les jours fériés de mai 2026',
      paragraphs: [
        'Du vendredi 1er mai au vendredi 8 mai 2026, bornes incluses, le calendrier contient huit jours. Il y a deux jours de week-end, samedi 2 et dimanche 3. Les six dates du lundi au vendredi comprennent deux fêtes légales, le 1er et le 8 mai. Avec les week-ends exclus et le préréglage France 2026 chargé, le résultat attendu est donc quatre jours ouvrés.',
        'Cet exemple permet de vérifier les quatre cartes : 8 jours calendaires, 2 jours de week-end, 2 jours fériés retirés et 4 jours ouvrés. Si vous obtenez un autre nombre, contrôlez l’inclusion de la fin, l’option de week-end et le contenu de la zone des jours fériés. Une valeur reproductible doit toujours pouvoir être expliquée par cette décomposition.',
      ],
    },
    {
      heading: 'Pourquoi ce calcul ne fixe pas un délai officiel',
      paragraphs: [
        'Un délai judiciaire, fiscal, administratif, bancaire, assurantiel ou contractuel peut définir le premier jour, les jours exclus, l’heure limite, le fuseau, les reports et le mode de dépôt. Certaines procédures parlent de jours francs, ouvrables ou calendaires plutôt que de jours ouvrés. La page n’identifie ni la nature du dossier ni la règle en vigueur.',
        'Consultez le texte actuel, le portail de l’autorité ou un professionnel compétent. Si un système officiel calcule une date limite, conservez son accusé ou sa confirmation. FunnyTools aide à contrôler une hypothèse de calendrier ; il ne délivre pas d’échéance opposable, n’interprète pas un contrat et ne garantit pas qu’un jour férié soit chômé dans votre organisation.',
      ],
    },
    {
      heading: 'Confidentialité, copie et conservation de la source',
      paragraphs: [
        'L’intervalle et les lignes personnalisées sont traités dans l’onglet. FunnyTools ne reçoit pas votre calendrier pour compter les jours. Le bouton de copie reprend le périmètre et les quatre totaux, mais pas la liste complète utilisée. Pour une vérification ultérieure, conservez aussi la source, son année, son territoire et la liste des dates.',
        'Le rechargement réinitialise la configuration. Il n’existe ni compte, ni historique, ni actualisation automatique des jours fériés. N’inscrivez pas de noms de salariés, de motifs d’absence ou de numéros de dossier : le champ attend seulement des dates. Le presse-papiers peut être synchronisé par l’appareil ; relisez le contenu avant de le coller dans un document partagé.',
      ],
    },
  ],
  instructions: [
    'Définissez les deux bornes et indiquez si la date finale est comptée.',
    'Choisissez si samedi et dimanche doivent être exclus.',
    'Chargez France 2026 ou collez les dates officielles de votre contexte.',
    'Corrigez tout avertissement et vérifiez les quatre totaux.',
    'Conservez avec le résultat la définition, le territoire et la source du calendrier.',
  ],
  examples: [
    'Estimer les jours disponibles avant une livraison interne.',
    'Retirer les fêtes légales nationales françaises d’un planning 2026.',
    'Ajouter des fermetures d’entreprise à un calendrier du lundi au vendredi.',
    'Contrôler une hypothèse de délai avant validation officielle.',
  ],
  audience: [
    'Chefs de projet et équipes opérationnelles préparant un planning.',
    'Indépendants qui estiment une fenêtre de réalisation.',
    'Organisations comparant plusieurs calendriers territoriaux séparément.',
    'Personnes souhaitant un décompte local et explicable.',
  ],
  caseStudies: [
    { title: 'Intervalle du 1er au 8 mai 2026', description: 'Avec les deux bornes, week-ends exclus et préréglage français, quatre jours ouvrés restent sur huit jours calendaires.' },
    { title: 'Férié répété et date impossible', description: 'Le doublon est déduit une seule fois et la ligne du 31 février produit un avertissement sans masquer les autres dates valides.' },
    { title: 'Deux établissements différents', description: 'L’équipe calcule séparément chaque calendrier au lieu de fusionner des fermetures qui ne s’appliquent pas aux mêmes personnes.' },
  ],
  notes: [
    'La date finale est incluse par défaut.',
    'Le week-end signifie samedi et dimanche.',
    'France 2026 contient 11 fêtes légales nationales, pas toutes les particularités locales.',
    'Un férié déjà exclu comme week-end n’est pas soustrait deux fois.',
    'Le résultat n’est pas une détermination de délai officiel.',
  ],
  faq: [
    { q: 'Comment calculer les jours ouvrés entre deux dates ?', a: 'Définissez le périmètre, excluez samedi et dimanche, puis chargez ou collez les jours fériés applicables. La carte principale affiche les dates restantes.' },
    { q: 'Quelle différence entre jours ouvrés et jours ouvrables ?', a: 'Les jours ouvrés sont ceux réellement travaillés dans l’organisation ; les jours ouvrables sont généralement ceux pouvant être travaillés, souvent du lundi au samedi.' },
    { q: 'Que sont les jours calendaires ?', a: 'Ce sont tous les jours du calendrier, y compris samedis, dimanches et jours fériés.' },
    { q: 'Le calendrier France 2026 est-il complet ?', a: 'Il contient les 11 fêtes légales nationales en métropole. Ajoutez les particularités locales, conventionnelles ou internes applicables.' },
    { q: 'Comment saisir un jour férié ?', a: 'Utilisez une date AAAA-MM-JJ par ligne. Les dates impossibles sont signalées et les doublons sont regroupés.' },
    { q: 'Un jour férié le dimanche est-il retiré deux fois ?', a: 'Non lorsque les week-ends sont exclus. Il est retiré comme férié seulement si samedi et dimanche restent comptés.' },
    { q: 'Puis-je compter les jours ouvrables du lundi au samedi ?', a: 'Désactivez l’exclusion du week-end puis ajoutez les dimanches comme dates personnalisées uniquement si cela reproduit vraiment votre règle ; l’outil n’a pas de sélecteur de jours hebdomadaires.' },
    { q: 'Ce résultat vaut-il pour un délai légal ?', a: 'Non à lui seul. Confirmez le terme exact, les bornes, le territoire, les reports et l’heure limite auprès de la source compétente.' },
  ],
  labels: {
    startDate: 'Date de début',
    endDate: 'Date de fin',
    includeEndDate: 'Inclure la date de fin',
    skipWeekends: 'Exclure samedi et dimanche',
    holidays: 'Jours fériés ou fermetures personnalisés',
    holidayPreset: 'Charger un calendrier de référence',
    presetNone: 'Sélectionnez un calendrier…',
    presetFr2026: 'France métropolitaine 2026 — fêtes légales nationales',
    presetTw2026: 'Taïwan 2026 — administrations publiques',
    holidayPlaceholder: '2026-01-01\n2026-12-25',
    calculate: 'Calculer',
    copyResult: 'Copier le résultat',
    reset: 'Réinitialiser',
    totalCalendarDays: 'Jours calendaires',
    weekendDays: 'Samedis et dimanches',
    holidayDays: 'Jours fériés retirés',
    businessDays: 'Jours ouvrés',
    countedRange: 'Intervalle compté',
    invalidDate: 'Saisissez une date de début et une date de fin valides.',
    holidayWarningSingular: '{count} ligne contenant une date invalide ou impossible a été ignorée.',
    holidayWarning: '{count} lignes contenant des dates invalides ou impossibles ont été ignorées.',
    days: 'jours',
    daySingular: 'jour',
    copied: 'Résultat copié',
  },
  privacyNote: 'L’intervalle et la liste de jours fériés restent dans cet onglet. FunnyTools ne les reçoit pas ; conservez séparément la source si le résultat doit être reproduit.',
  disclaimer: 'Ce calcul n’est ni un calendrier officiel ni une échéance opposable. Vérifiez définition, territoire, jours fériés, heure limite et règle de report auprès de l’organisation compétente.',
};

export const frenchBusinessDaysReview = {
  heading: 'Vérifier un calcul de jours ouvrés',
  intro: 'Le total n’est reproductible que si la définition, les bornes et le calendrier d’exclusion sont conservés.',
  panels: [
    { title: 'Définition', text: 'Identifiez si la source parle de jours calendaires, ouvrables, ouvrés ou francs.' },
    { title: 'Calendrier', text: 'Utilisez l’année, le territoire et les fermetures propres à l’organisation.' },
    { title: 'Bornes', text: 'Documentez le premier jour, la date finale et leur inclusion.' },
  ],
  checklistHeading: 'Liste de contrôle',
  checklist: [
    'Le week-end samedi-dimanche correspond au cas étudié.',
    'Les avertissements de dates invalides ont été corrigés.',
    'Les particularités locales ou conventionnelles ont été ajoutées.',
    'Tout délai officiel est confirmé auprès de la source compétente.',
  ],
};
