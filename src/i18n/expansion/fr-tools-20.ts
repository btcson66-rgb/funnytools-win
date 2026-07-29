import type { ToolContent } from '../tools/_types';

export const frenchBreakReminder: ToolContent = {
  name: 'Rappel de pause écran',
  short: 'Alternez une période de travail et une pause avec compte à rebours, signal visuel et son facultatif.',
  long: 'Ce rappel de pause écran alterne localement un intervalle de travail et une pause, chacun réglable de 1 à 240 minutes. Il recalcule le temps restant à partir d’une heure cible afin de limiter la dérive du navigateur, permet pause, reprise et remise à zéro, puis compte les rappels atteints. Il ne crée pas de notification système, ne continue pas après fermeture de l’onglet et ne prescrit aucune fréquence médicale ou professionnelle universelle.',
  seoTitle: 'Rappel de pause écran et minuteur de repos',
  seoDescription: 'Programmez un rappel de pause écran avec intervalles de travail, pauses actives, compte à rebours et signal sonore facultatif.',
  keywords: [
    'rappel pause écran',
    'rappel pour faire une pause',
    'minuteur pause travail',
    'pause active ordinateur',
    'rappel se lever bureau',
    'fatigue visuelle écran',
    'alterner travail et pause',
    'alarme pause toutes les heures',
  ],
  capabilities: [
    'Régler travail et pause de 1 à 240 minutes.',
    'Mettre en pause puis reprendre le temps restant.',
    'Alterner automatiquement vers la pause après chaque intervalle.',
    'Activer un bref signal sonore généré dans le navigateur.',
    'Compter les rappels atteints pendant la session ouverte.',
  ],
  contentSections: [
    {
      heading: 'Réponse rapide : programmer un rappel de pause écran',
      paragraphs: [
        'Choisissez la durée de travail et celle de la pause, puis activez le son seulement si votre environnement le permet. Appuyez sur « Démarrer ». À la fin de l’intervalle, la carte change d’état, affiche « Il est temps de faire une pause », incrémente le compteur et lance la durée de repos. Après la pause, le minuteur s’arrête afin que vous décidiez consciemment de reprendre.',
        'Le réglage initial 50 minutes puis 5 minutes n’est qu’un exemple pratique. Une tâche intensive, un poste aménagé, une recommandation de médecine du travail ou une contrainte collective peut demander un autre rythme. Un rappel est utile lorsqu’il déclenche une vraie interruption : quitter l’écran des yeux, changer de posture ou alterner avec une activité sans écran.',
      ],
    },
    {
      heading: 'Ce que recommandent les sources françaises sur le travail sur écran',
      paragraphs: [
        'L’INRS rappelle que le travail quotidien sur écran doit être périodiquement interrompu par des pauses ou par des changements d’activité réduisant la charge visuelle. La périodicité et la durée ne sont pas identiques pour tous les postes : elles dépendent de l’organisation, de l’intensité et des caractéristiques des tâches. La page ne transforme donc pas une valeur par défaut en norme médicale ou légale.',
        'Dans ses conseils de prévention, l’INRS invite aussi à regarder au loin, rompre la posture assise et prévoir des pauses actives régulières. Il évoque idéalement des ruptures toutes les 30 minutes dans une démarche globale. Cela ne signifie pas qu’un minuteur personnel remplace l’analyse du poste, l’aménagement, la variation des tâches ou les obligations de l’employeur.',
      ],
      link: {
        prefix: 'Les repères sont détaillés dans ',
        label: 'la prévention du travail sur écran publiée par l’INRS',
        href: 'https://www.inrs.fr/risques/travail-ecran/prevention-risques.html',
        suffix: '.',
      },
    },
    {
      heading: 'Pause active, pause visuelle ou changement d’activité',
      paragraphs: [
        'Une pause active peut consister à se lever, marcher quelques pas, s’étirer doucement ou aller chercher un document. Une pause visuelle consiste à cesser de fixer le proche écran et regarder plus loin. Un changement d’activité peut être une tâche de bureau sans écran. Le meilleur choix dépend du travail, de l’espace, de la sécurité et de votre situation.',
        'Faire défiler un réseau social sur le même écran conserve souvent la posture et la sollicitation visuelle ; le minuteur ne classe pourtant pas ce que vous faites. Préparez avant de démarrer une action simple et réaliste : poser le téléphone, regarder par la fenêtre, remplir une bouteille ou se mettre debout. En cas de douleur, vertiges, trouble visuel ou autre symptôme, arrêtez-vous et demandez un avis adapté.',
      ],
    },
    {
      heading: 'Différence avec la pause légale après six heures',
      paragraphs: [
        'Pour un salarié majeur à temps plein en France, Service-Public indique un temps de pause d’au moins 20 minutes dès que six heures consécutives ont été travaillées, sous réserve de règles plus favorables. Les micro-pauses d’écran et cette pause légale ne répondent pas nécessairement au même objet. Une série de rappels personnels ne prouve pas que l’employeur a satisfait à ses obligations.',
        'Cette page ne pointe pas les horaires, n’enregistre pas la durée de travail et ne produit aucun relevé opposable. Elle ne connaît ni convention collective, ni temps de déjeuner, ni âge du salarié, ni organisation de l’entreprise. Pour une question de droit du travail, consultez les règles applicables et les interlocuteurs compétents ; n’utilisez pas le compteur comme feuille de temps.',
      ],
      link: {
        prefix: 'Le cadre général est présenté par ',
        label: 'Service-Public dans la fiche sur la durée du travail',
        href: 'https://www.service-public.fr/particuliers/vosdroits/F1911',
        suffix: '.',
      },
    },
    {
      heading: 'Comment le compte à rebours limite la dérive',
      paragraphs: [
        'Au démarrage, le script calcule une heure cible avec Date.now(). Toutes les 250 millisecondes environ, il soustrait l’heure actuelle de cette cible et arrondit vers la seconde supérieure. Il ne retire donc pas aveuglément une seconde à chaque passage : si le navigateur retarde quelques rafraîchissements, l’affichage se recale sur l’échéance prévue.',
        'Cette méthode améliore une minuterie ordinaire mais ne garantit pas une alarme précise. Les navigateurs ralentissent les onglets en arrière-plan, le dispositif peut dormir et l’horloge système peut changer. Au retour, le prochain tick recalcule l’état tant que la page existe. Une fermeture, un rechargement, un crash ou une batterie vide efface la session.',
      ],
    },
    {
      heading: 'Son facultatif et absence de notification système',
      paragraphs: [
        'Le son est produit par Web Audio après une action de l’utilisateur. Un navigateur, un mode silencieux, une sortie audio différente ou une politique d’autoplay peut le bloquer. La transition visuelle reste disponible, mais elle suppose que la page soit observable. Testez le signal avec un intervalle court avant de compter dessus dans un environnement réel.',
        'La page ne demande pas l’autorisation de notification, n’affiche pas d’alerte hors du navigateur et ne vibre pas. Elle ne doit jamais être l’unique alarme pour un médicament, une cuisson, une surveillance, une sécurité industrielle ou une échéance critique. Pour ces usages, choisissez un dispositif système adapté et redondant.',
      ],
    },
    {
      heading: 'Pause, reprise, fin de pause et compteur',
      paragraphs: [
        '« Pause » fige au minimum une seconde restante, puis « Continuer » repart de cette valeur. À la fin du travail, le compteur augmente et la pause démarre immédiatement. À la fin de la pause, le minuteur revient à la durée de travail mais reste arrêté ; cette décision évite d’enchaîner une nouvelle période sans que vous ayez réellement repris la tâche.',
        'Le compteur indique seulement combien de transitions vers une pause ont eu lieu depuis la dernière remise à zéro. Il ne confirme ni la pause réellement prise, ni sa qualité, ni le temps effectivement travaillé. Réinitialiser efface ce compteur et restaure la durée de travail actuelle. Modifier les minutes lorsque le minuteur est arrêté provoque aussi une remise en état.',
      ],
    },
    {
      heading: 'Adapter le rythme sans transformer la pause en objectif',
      paragraphs: [
        'Un intervalle trop long peut être oublié ; un intervalle trop court peut interrompre une activité au mauvais moment. Commencez par un rythme compatible avec la tâche et ajustez après observation. Pour une réunion, une opération délicate ou une activité où se lever serait dangereux, préparez une autre forme d’alternance ou suspendez le rappel.',
        'Le nombre de rappels n’est pas un indicateur de productivité, de santé ou de performance. L’objectif n’est pas d’accumuler des pauses mais de réduire une exposition continue et de soutenir un travail soutenable. Les besoins liés au handicap, à la grossesse, à une pathologie ou à un aménagement de poste exigent une évaluation individualisée.',
      ],
    },
    {
      heading: 'Confidentialité et fonctions absentes',
      paragraphs: [
        'Les durées, la phase et le compteur restent dans cet onglet. FunnyTools ne les stocke pas et ne demande ni nom, ni activité, ni symptôme. Le titre de l’onglet affiche le temps restant pendant la marche, puis revient à son texte initial à l’arrêt. Aucun historique, compte, synchronisation ou rapport n’est créé.',
        'Le service ne suit pas le temps sur plusieurs jours, ne bloque pas les applications, ne détecte pas la posture, ne surveille pas les yeux et ne mesure pas la fatigue. Il ne remplace ni médecin, ni ergonome, ni service de prévention et de santé au travail. C’est un minuteur de comportement simple dont les limites doivent rester visibles.',
      ],
    },
  ],
  instructions: [
    'Choisissez un intervalle et une pause adaptés à la tâche.',
    'Activez le son seulement après l’avoir testé et si l’environnement l’autorise.',
    'Démarrez en laissant l’onglet ouvert.',
    'À l’avis, quittez réellement l’écran ou changez d’activité.',
    'Reprenez consciemment après la pause et ajustez le rythme si nécessaire.',
  ],
  examples: [
    'Se lever et marcher après une période de travail assis.',
    'Regarder au loin entre deux séquences de lecture à l’écran.',
    'Alterner saisie informatique et classement de documents.',
    'Tester un rythme personnel sans produire de relevé professionnel.',
  ],
  audience: [
    'Personnes travaillant ou étudiant longtemps devant un écran.',
    'Télétravailleurs souhaitant rompre la posture assise.',
    'Utilisateurs cherchant un rappel local sans compte.',
    'Équipes qui complètent une organisation de prévention existante.',
  ],
  caseStudies: [
    { title: 'Pause visuelle programmée', description: 'Une personne règle 30 minutes puis regarde au loin et se lève pendant deux minutes, conformément à l’organisation validée pour son poste.' },
    { title: 'Son bloqué par le navigateur', description: 'Après un test court sans signal audible, l’utilisateur conserve la page visible et met une alarme système pour l’avis important.' },
    { title: 'Réunion sans interruption possible', description: 'Le rappel est mis en pause avant la réunion puis repris ensuite ; le compteur n’est pas présenté comme un relevé du temps travaillé.' },
  ],
  notes: [
    'Chaque durée accepte un entier de 1 à 240 minutes.',
    'La fin du travail lance la pause ; la fin de pause attend une reprise manuelle.',
    'Le son Web Audio peut être bloqué ou inaudible.',
    'Fermer ou recharger efface la session.',
    'Le compteur n’est ni un dossier de santé ni une feuille de temps.',
  ],
  faq: [
    { q: 'À quelle fréquence faut-il faire une pause écran ?', a: 'Il n’existe pas une durée unique adaptée à tous les postes. L’INRS recommande des interruptions régulières adaptées au contenu et à l’intensité du travail.' },
    { q: 'Que faire pendant une pause active ?', a: 'Selon votre situation, quittez l’écran des yeux, levez-vous, marchez ou changez de tâche. Respectez toujours les consignes de sécurité et les aménagements individuels.' },
    { q: 'Le minuteur continue-t-il si je ferme l’onglet ?', a: 'Non. La session existe seulement dans la page ouverte et disparaît au rechargement ou à la fermeture.' },
    { q: 'Vais-je recevoir une notification du système ?', a: 'Non. Le signal est visuel dans la page et sonore seulement si vous activez l’option et que le navigateur l’autorise.' },
    { q: 'La pause légale de 20 minutes est-elle comptabilisée ?', a: 'Non. L’outil ne produit aucun suivi juridique. Vérifiez les règles du travail et votre convention séparément.' },
    { q: 'Que compte le nombre de rappels ?', a: 'Chaque fin d’intervalle de travail. Il ne prouve pas qu’une pause a été prise ni combien de temps a été travaillé.' },
    { q: 'Pourquoi le temps peut-il sauter après la veille ?', a: 'Le calcul se recale sur l’heure cible. La veille peut retarder l’affichage, puis la page corrige le temps au prochain tick.' },
    { q: 'Ce rappel traite-t-il la fatigue visuelle ou la douleur ?', a: 'Non. En cas de symptômes ou de besoin d’aménagement, consultez un professionnel qualifié.' },
  ],
  labels: {
    intervalMinutes: 'Intervalle de travail (minutes)',
    breakMinutes: 'Durée de la pause (minutes)',
    sound: 'Émettre un bref signal sonore',
    start: 'Démarrer',
    pause: 'Pause',
    continue: 'Continuer',
    reset: 'Réinitialiser',
    ready: 'Prêt à démarrer',
    focus: 'Avant la prochaine pause',
    breakTime: 'Pause en cours',
    reminders: 'rappels atteints',
    nextBreak: 'Prochain rappel',
    minutesError: 'Saisissez des minutes entières entre 1 et 240.',
    timeToMove: 'Il est temps de faire une pause',
    breakDone: 'Pause terminée : reprenez lorsque vous êtes prêt',
    minsAbbr: 'min',
    secsAbbr: 's',
  },
  privacyNote: 'Les durées, la phase et le compteur restent dans cet onglet. FunnyTools ne les enregistre pas et ne crée aucun historique.',
  disclaimer: 'Rappel de comportement uniquement : ce n’est ni une prescription médicale, ni une évaluation ergonomique, ni un relevé du travail, ni une alarme critique.',
};

export const frenchBreakReminderReview = {
  heading: 'Contrôler un rappel de pause',
  intro: 'Un rappel utile tient compte du poste, des limites du navigateur et de l’action réellement prévue pendant l’interruption.',
  panels: [
    { title: 'Rythme', text: 'Choisissez des durées compatibles avec la tâche et les recommandations applicables.' },
    { title: 'Signal', text: 'Testez son et transition visuelle avant de dépendre du rappel.' },
    { title: 'Portée', text: 'Prévoyez une alarme système si l’avis doit survivre à la fermeture ou à la veille.' },
  ],
  checklistHeading: 'Liste de contrôle',
  checklist: [
    'Les durées sont des entiers compris entre 1 et 240.',
    'L’onglet restera ouvert pendant la session.',
    'La pause prévue rompt réellement l’exposition visuelle ou posturale.',
    'Le minuteur n’est pas présenté comme suivi médical ou légal.',
  ],
};

export const frenchNetSalary: ToolContent = {
  name: 'Calculateur de salaire net',
  short: 'Testez un passage brut-net avec primes, quatre taux éditables et autres retenues, sans barème automatique.',
  long: 'Ce calculateur de salaire net applique une formule transparente : salaire brut plus primes, moins quatre pourcentages calculés sur le brut, moins une retenue fixe. Tous les champs sont remis à zéro dans la version française afin d’éviter de présenter un taux étranger ou générique comme valeur française. L’outil ne connaît ni statut cadre, convention, tranche, plafond, avantage en nature, prélèvement à la source ni règle Urssaf ; le résultat est une simulation arithmétique dans l’unité monétaire et la période choisies.',
  seoTitle: 'Calculateur salaire brut en net : simulation',
  seoDescription: 'Simulez un salaire net à partir du brut, des primes, taux et retenues que vous renseignez. Formule visible, sans faux barème automatique.',
  keywords: [
    'calculateur salaire net',
    'salaire brut en net',
    'convertir brut net',
    'simulation salaire net mensuel',
    'calcul fiche de paie',
    'cotisations salariales',
    'net avant impôt',
    'prélèvement à la source salaire',
  ],
  capabilities: [
    'Additionner salaire brut et primes de la même période.',
    'Appliquer quatre taux entièrement éditables au brut.',
    'Retirer une retenue fixe supplémentaire.',
    'Comparer revenus, retenues estimées et résultat net.',
    'Copier la formule avec son avertissement de simulation.',
  ],
  contentSections: [
    {
      heading: 'Réponse rapide : simuler un salaire brut en net',
      paragraphs: [
        'Saisissez le salaire brut pour une période, puis les primes de cette même période. Recopiez uniquement des taux provenant d’une fiche de paie, d’un simulateur officiel ou d’un scénario documenté. Ajoutez les retenues fixes séparées, puis lisez revenus bruts, déductions estimées et net. Tous les champs français démarrent à zéro : la page ne prétend pas deviner votre taux.',
        'Exemple de formule, sans valeur réglementaire : 3 000 € de brut, 200 € de prime, quatre taux totalisant 20 % et 50 € de retenue donnent 2 550 €. Le calcul est 3 200 − 600 − 50. Cette exactitude arithmétique ne prouve pas que la prime entre dans la bonne base ni que 20 % correspond à votre situation.',
      ],
    },
    {
      heading: 'Salaire brut, salaire net et net après impôt',
      paragraphs: [
        'Le ministère du Travail décrit le salaire brut comme l’ensemble des sommes et avantages convenus, incluant notamment salaire de base, primes et majorations, avec des exclusions selon la nature des versements. Le salaire net perçu correspond au brut diminué des cotisations salariales. Le net après impôt retranche encore le prélèvement à la source transmis par l’administration fiscale.',
        'Cette page ne distingue pas automatiquement ces étages. Les quatre taux portent tous sur le seul champ « salaire brut », tandis que la prime est ajoutée après cette base. Si votre prime est soumise à cotisations, ce modèle simplifié ne la traite pas correctement sans adaptation manuelle. Écrivez toujours si votre résultat vise net avant ou après impôt.',
      ],
      link: {
        prefix: 'Pour la définition des éléments de rémunération, consultez ',
        label: 'la fiche du ministère du Travail sur le salaire',
        href: 'https://travail-emploi.gouv.fr/le-salaire-fixation-et-paiement',
        suffix: '.',
      },
    },
    {
      heading: 'Pourquoi il n’existe pas un pourcentage brut-net unique',
      paragraphs: [
        'Le montant dépend notamment du statut, du contrat, du niveau de rémunération, des plafonds, de la retraite complémentaire, de la mutuelle, des avantages, des exonérations et du prélèvement fiscal. Un ratio observé sur une personne ou un mois ne devient pas un taux universel. Même deux salariés ayant le même brut peuvent avoir des lignes différentes.',
        'Les champs « cotisations », « complémentaire santé », « retraite supplémentaire » et « prélèvement estimé » sont des catégories pédagogiques, pas un bulletin officiel. Vous pouvez les renommer mentalement selon votre scénario, mais les quatre pourcentages restent appliqués à la même base brute. Si les bases diffèrent, utilisez l’outil officiel ou reproduisez les lignes séparément dans un tableur.',
      ],
    },
    {
      heading: 'Utiliser le simulateur officiel Urssaf pour la France',
      paragraphs: [
        'Mon-entreprise Urssaf propose un simulateur salarié tenu à jour, capable d’affiner contrat, statut cadre, temps partiel, avantages, mutuelle et heures supplémentaires. Il indique lui-même que ses résultats restent indicatifs et ne remplacent pas les décomptes réels. Pour une estimation française actuelle, ce service est plus approprié qu’un jeu manuel de quatre taux.',
        'FunnyTools sert plutôt à comprendre une formule, vérifier un scénario fourni ou mesurer l’effet d’un taux. Comparez ensuite au simulateur Urssaf et à votre bulletin. En cas d’écart, ne forcez pas les nombres pour « faire correspondre » sans comprendre la base : identifiez la ligne, la période et l’assiette qui expliquent la différence.',
      ],
      link: {
        prefix: 'Le service de référence est ',
        label: 'le convertisseur salaire brut-net de Mon-entreprise Urssaf',
        href: 'https://mon-entreprise.urssaf.fr/simulateurs/salaire-brut-net',
        suffix: '.',
      },
    },
    {
      heading: 'Période, monnaie, primes et retenues fixes',
      paragraphs: [
        'Tous les montants doivent partager la même monnaie et la même période. Ne mélangez pas un salaire brut annuel avec une prime mensuelle, ni douze mois avec quatorze versements. La page n’ajoute aucun symbole monétaire afin de rester neutre : si vous saisissez des euros mensuels, la sortie est en euros mensuels ; si vous utilisez une autre unité, elle reste la même.',
        'Le champ de prime est ajouté intégralement au revenu mais n’augmente pas la base des pourcentages. La retenue fixe est soustraite après les taux. Cette architecture simple peut représenter certains scénarios, pas un bulletin complet. Frais professionnels, titres-restaurant, saisies, acomptes, avantages en nature et remboursements ont des traitements spécifiques que l’outil ne connaît pas.',
      ],
    },
    {
      heading: 'Lire la formule et contrôler le résultat',
      paragraphs: [
        'La formule est : net estimé = brut + primes − brut × somme des taux − autres retenues. Pour contrôler, additionnez les quatre pourcentages, convertissez la somme en nombre décimal, multipliez par le brut puis ajoutez la retenue fixe. Les sorties sont arrondies à l’unité entière pour l’affichage, même si les calculs internes utilisent les décimales saisies.',
        'Un net négatif reste mathématiquement possible si les retenues dépassent les revenus ; il signale un scénario incohérent ou exceptionnel, pas une dette automatiquement due. Les champs refusent les montants négatifs et les taux supérieurs à 100 %, mais cette validation technique ne vérifie pas la plausibilité économique ou réglementaire.',
      ],
    },
    {
      heading: 'Ce que la calculatrice ne connaît pas',
      paragraphs: [
        'Elle n’intègre pas les barèmes 2026, le plafond de Sécurité sociale, CSG/CRDS, convention collective, réduction générale, exonération d’heures supplémentaires, avantages en nature, mutuelle obligatoire, temps partiel, indemnités, congés ou prélèvement neutre. Elle ne calcule ni coût employeur ni revenu imposable.',
        'Elle ne produit pas de fiche de paie, déclaration sociale ou conseil fiscal. Pour négocier une rémunération, distinguez brut annuel, nombre de mois, variable cible, avantages et net estimé. Pour contester un paiement, conservez contrat, bulletin et relevé puis sollicitez un interlocuteur compétent plutôt qu’une simulation anonyme.',
      ],
    },
    {
      heading: 'Cas d’usage raisonnables et usages à éviter',
      paragraphs: [
        'Un usage raisonnable consiste à tester l’effet mécanique d’un point de taux, vérifier une formule transmise ou comparer deux scénarios construits avec la même base. Vous pouvez aussi mesurer pourquoi une prime non soumise à la même base change le résultat attendu, à condition de noter la simplification.',
        'Évitez d’annoncer « votre net garanti » à partir d’un pourcentage moyen, d’utiliser le résultat pour une déclaration ou de remplacer un conseil professionnel. Les règles changent et la situation personnelle compte. Toute décision de contrat, budget serré, crédit, déménagement ou recours mérite une estimation officielle récente et une marge de sécurité.',
      ],
    },
    {
      heading: 'Confidentialité et conservation des hypothèses',
      paragraphs: [
        'Les montants et taux sont calculés dans l’onglet. FunnyTools ne les enregistre pas et ne demande ni employeur, ni identité, ni numéro fiscal. Le bouton de copie place uniquement les trois résultats, la note d’hypothèse et la formule dans le presse-papiers ; selon l’appareil, celui-ci peut être synchronisé.',
        'La page n’enregistre pas les taux entre deux visites. Pour reproduire une simulation, sauvegardez séparément période, monnaie, date, source de chaque taux et version de la règle. Évitez de coller un bulletin complet ou des données personnelles : seuls les nombres utiles à l’opération sont nécessaires.',
      ],
    },
  ],
  instructions: [
    'Choisissez une monnaie et une période uniques.',
    'Saisissez le brut et les primes de cette période.',
    'Recopiez des taux provenant d’une source identifiable.',
    'Ajoutez les retenues fixes et contrôlez la formule manuellement.',
    'Comparez toute estimation française au simulateur Urssaf et au bulletin réel.',
  ],
  examples: [
    'Tester l’effet arithmétique d’une variation de taux.',
    'Vérifier un scénario fourni par un employeur ou un conseiller.',
    'Comparer deux offres avec la même méthode et la même période.',
    'Comprendre l’écart entre revenu brut, déductions et net estimé.',
  ],
  audience: [
    'Salariés qui veulent comprendre une formule brut-net.',
    'Candidats comparant des scénarios documentés.',
    'Étudiants travaillant sur un exemple de paie simplifié.',
    'Utilisateurs souhaitant un calcul local sans compte.',
  ],
  caseStudies: [
    { title: 'Scénario à 20 %', description: 'Pour 3 000 de brut, 200 de prime et 50 de retenue, quatre taux totalisant 20 % donnent 2 550 dans la monnaie choisie.' },
    { title: 'Prime soumise à une autre base', description: 'La personne constate que le modèle n’applique pas les taux à la prime et passe au simulateur Urssaf pour une estimation française.' },
    { title: 'Mensuel contre annuel', description: 'Avant de comparer deux offres, l’utilisateur convertit toutes les valeurs sur douze mois et note séparément le variable.' },
  ],
  notes: [
    'Les valeurs françaises démarrent à zéro : aucun taux n’est présumé.',
    'Tous les pourcentages s’appliquent uniquement au champ brut.',
    'Les primes sont ajoutées hors de cette base dans le modèle.',
    'L’affichage est arrondi à l’unité.',
    'Le résultat n’est ni une paie ni une estimation réglementaire automatique.',
  ],
  faq: [
    { q: 'Comment convertir un salaire brut en net ?', a: 'En France, utilisez de préférence le simulateur Urssaf avec votre situation. Ici, saisissez uniquement des taux documentés et contrôlez la formule simplifiée.' },
    { q: 'Quel pourcentage faut-il retirer du brut ?', a: 'Il n’existe pas un taux unique. Statut, rémunération, plafonds, contrat, mutuelle et fiscalité modifient le résultat.' },
    { q: 'Le résultat est-il avant ou après impôt ?', a: 'Cela dépend des taux saisis. Le champ de prélèvement estimé peut représenter l’impôt, mais la page ne récupère pas votre taux fiscal.' },
    { q: 'Les primes sont-elles soumises aux taux ?', a: 'Pas dans cette formule : elles sont ajoutées après la base brute. Si votre prime est soumise, utilisez un modèle plus précis.' },
    { q: 'Pourquoi aucun taux français n’est prérempli ?', a: 'Parce qu’une valeur générique risquerait d’être prise pour un barème officiel. Les champs doivent venir de votre source.' },
    { q: 'Le résultat peut-il être négatif ?', a: 'Oui si les retenues dépassent les revenus. Cela indique un scénario à revoir, pas automatiquement une somme légalement due.' },
    { q: 'Mes données salariales sont-elles enregistrées ?', a: 'Non pour le calcul. Elles restent dans l’onglet ; la copie utilise toutefois le presse-papiers de l’appareil.' },
    { q: 'Puis-je utiliser ce montant pour signer un contrat ?', a: 'Pas comme garantie. Confirmez avec le simulateur officiel, l’employeur et les documents contractuels.' },
  ],
  labels: {
    grossSalary: 'Salaire brut de la période',
    allowance: 'Primes ajoutées dans ce modèle',
    laborRate: 'Cotisations salariales — hypothèse (%)',
    healthRate: 'Complémentaire santé — hypothèse (%)',
    pensionRate: 'Retraite supplémentaire — hypothèse (%)',
    taxRate: 'Prélèvement fiscal — hypothèse (%)',
    otherDeduction: 'Autres retenues fixes',
    calculate: 'Calculer',
    copy: 'Copier le résultat',
    reset: 'Remettre à zéro',
    grossIncome: 'Revenus saisis',
    totalDeductions: 'Déductions estimées',
    netPay: 'Net arithmétique estimé',
    assumptionNote: 'Aucun taux français n’est fourni. Saisissez uniquement des hypothèses issues d’une source vérifiée.',
    formula: 'Formule : net = brut + primes − brut × somme des taux − autres retenues',
    invalidInput: 'Saisissez des montants positifs ou nuls et des taux compris entre 0 et 100.',
    copied: 'Résultat copié',
    defaultGross: '0',
    defaultAllowance: '0',
    defaultOther: '0',
    defaultLaborRate: '0',
    defaultHealthRate: '0',
    defaultPensionRate: '0',
    defaultTaxRate: '0',
  },
  privacyNote: 'Les montants et taux restent dans cet onglet. FunnyTools ne les enregistre pas ; la copie utilise le presse-papiers de l’appareil.',
  disclaimer: 'Simulation arithmétique sans barème français automatique. Elle ne constitue ni fiche de paie, ni conseil financier, fiscal, juridique ou social.',
};

export const frenchNetSalaryReview = {
  heading: 'Vérifier une simulation de salaire net',
  intro: 'Le résultat n’est interprétable que si période, monnaie, bases et sources de taux sont conservées.',
  panels: [
    { title: 'Période', text: 'Ne mélangez pas montant mensuel, annuel, douze mois et quatorze versements.' },
    { title: 'Base', text: 'Contrôlez si chaque taux réel porte sur le brut entier, une tranche ou une autre assiette.' },
    { title: 'Source', text: 'Comparez le scénario au simulateur Urssaf et au bulletin applicable.' },
  ],
  checklistHeading: 'Liste de contrôle',
  checklist: [
    'Tous les montants utilisent la même monnaie et la même période.',
    'Chaque taux provient d’une source datée et identifiable.',
    'Le traitement des primes correspond au scénario.',
    'Aucune décision importante ne repose sur cette seule estimation.',
  ],
};

export const frenchOvertimePay: ToolContent = {
  name: 'Calculateur d’heures supplémentaires',
  short: 'Estimez quatre blocs d’heures avec un taux horaire et des coefficients entièrement vérifiables.',
  long: 'Ce calculateur d’heures supplémentaires multiplie un taux horaire par les heures et le coefficient de quatre blocs. La version française initialise les deux premiers coefficients à 1,25 et 1,50 comme exemple du régime légal supplétif à temps plein en l’absence de dispositions conventionnelles, mais toutes les heures démarrent à zéro et chaque coefficient reste éditable. Dimanche, jour férié, temps partiel, repos compensateur, contingent, forfait et convention peuvent obéir à d’autres règles.',
  seoTitle: 'Calculateur heures supplémentaires et majoration',
  seoDescription: 'Calculez une estimation d’heures supplémentaires avec taux horaire, heures et coefficients éditables. Limites françaises clairement expliquées.',
  keywords: [
    'calculateur heures supplémentaires',
    'calcul heures supplémentaires 25 50',
    'majoration heures supplémentaires',
    'taux horaire heure supplémentaire',
    '36e à 43e heure',
    'heures supplémentaires dimanche',
    'repos compensateur',
    'heures complémentaires temps partiel',
  ],
  capabilities: [
    'Saisir un taux horaire dans la monnaie voulue.',
    'Séparer quatre blocs d’heures avec coefficients indépendants.',
    'Calculer chaque montant et la somme arithmétique.',
    'Laisser à zéro les catégories non applicables.',
    'Copier le résultat avec la formule et l’avertissement.',
  ],
  contentSections: [
    {
      heading: 'Réponse rapide : calculer des heures supplémentaires',
      paragraphs: [
        'Saisissez le taux horaire brut reconnu par votre source. Répartissez les heures entre les blocs réellement applicables et vérifiez chaque coefficient. La formule de chaque ligne est taux × heures × coefficient. Pour 20 € de l’heure, 8 heures à 1,25 et 2 heures à 1,50, le montant brut arithmétique est 260 € : 200 € plus 60 €.',
        'Cet exemple correspond au régime supplétif français souvent recherché, pas à tous les salariés. Un accord collectif peut fixer les taux, le repos peut remplacer tout ou partie de la rémunération, et le temps partiel relève d’heures complémentaires. Ne classez pas les heures à partir du nom des champs : partez de la semaine, du contrat, de la convention et du bulletin.',
      ],
    },
    {
      heading: 'Règle française de 25 % puis 50 %',
      paragraphs: [
        'Service-Public indique qu’en l’absence de dispositions conventionnelles, les huit premières heures au-delà de la durée légale hebdomadaire, de la 36e à la 43e, sont majorées de 25 %, puis les suivantes de 50 %. Un coefficient de 1,25 inclut le salaire de base et la majoration de 25 % ; 1,50 inclut le salaire et 50 % supplémentaires.',
        'La majoration porte sur le salaire brut. Les heures sont décomptées par semaine civile. Cette présentation suppose notamment un salarié à temps plein relevant de ce cadre. Elle ne dit pas automatiquement quelle ligne de rémunération constitue le bon taux horaire ni si une convention plus favorable ou un accord différent s’applique.',
      ],
      link: {
        prefix: 'La règle et ses exceptions sont présentées par ',
        label: 'Service-Public dans la fiche sur les heures supplémentaires',
        href: 'https://www.service-public.fr/particuliers/vosdroits/F2391',
        suffix: '.',
      },
    },
    {
      heading: 'Coefficient, pourcentage de majoration et erreur fréquente',
      paragraphs: [
        'Une majoration de 25 % correspond à un paiement total de 125 %, donc à un coefficient 1,25. Une majoration de 50 % correspond à 150 %, coefficient 1,50. Entrer 0,25 ne calcule que le supplément, tandis qu’entrer 1,25 calcule l’heure complète majorée. La page affiche le montant complet de chaque bloc.',
        'De même, « payé à 200 % » correspond généralement à un coefficient 2, alors que « majoré de 200 % » peut signifier trois fois le taux de base. La rédaction exacte du texte compte. Conservez avec le résultat le coefficient utilisé et la phrase de la source afin qu’une autre personne puisse contrôler l’interprétation.',
      ],
    },
    {
      heading: 'Taux horaire brut et assiette de calcul',
      paragraphs: [
        'Le taux à utiliser n’est pas forcément le salaire mensuel divisé par un nombre choisi au hasard. La rémunération de base, certaines primes et la durée mensuelle de référence peuvent intervenir. Une convention, un bulletin ou le service paie doit fournir la base reconnue. L’outil accepte un nombre mais ne vérifie pas sa construction.',
        'Utilisez la même monnaie pour tous les blocs et conservez les décimales nécessaires. Les sorties sont arrondies à l’unité pour l’affichage ; un bulletin réel arrondit souvent ligne par ligne selon ses règles. Pour rapprocher un résultat, comparez taux, heures décimales, coefficients, assiettes et arrondis au lieu de regarder uniquement le total.',
      ],
    },
    {
      heading: 'Temps partiel : heures complémentaires, pas supplémentaires',
      paragraphs: [
        'Service-Public précise qu’un salarié à temps partiel qui dépasse la durée prévue au contrat accomplit des heures complémentaires. Les limites et taux de majoration diffèrent : en l’absence de règle conventionnelle, la fiche présente notamment 10 % dans une première limite puis 25 % au-delà. Le présent intitulé d’heures supplémentaires ne classe donc pas correctement ce cas.',
        'Vous pouvez techniquement entrer d’autres coefficients, mais cela ne valide ni le nombre d’heures autorisé ni le droit de refus. Pour un temps partiel, partez de la section officielle correspondante, du contrat et de la convention. N’utilisez pas les valeurs 1,25 et 1,50 par simple analogie.',
      ],
    },
    {
      heading: 'Dimanche, jour férié et cumul des majorations',
      paragraphs: [
        'La loi française n’impose pas une majoration uniforme pour chaque travail du dimanche ; les règles varient selon secteur, zone, autorisation et dispositions conventionnelles. Un jour férié n’est pas non plus automatiquement payé au double dans toutes les situations. Les deux champs dédiés démarrent donc avec un coefficient neutre 1,00 dans la version française.',
        'Si une même heure relève à la fois d’heures supplémentaires, du dimanche ou d’un férié, les majorations peuvent se cumuler ou non selon la source. La calculatrice additionne des blocs ; elle ne sait pas superposer deux règles sur la même heure. Ne dupliquez une heure dans plusieurs lignes que si le texte applicable confirme le cumul et que la formule a été comprise.',
      ],
      link: {
        prefix: 'Les variations du dimanche sont illustrées dans ',
        label: 'la fiche Service-Public sur le travail dominical',
        href: 'https://www.service-public.fr/particuliers/vosdroits/F13887',
        suffix: '.',
      },
    },
    {
      heading: 'Repos compensateur et contingent annuel',
      paragraphs: [
        'La rémunération majorée peut être remplacée en tout ou partie par un repos compensateur équivalent selon les règles applicables. Certaines heures au-delà du contingent annuel ouvrent aussi une contrepartie obligatoire en repos. Une heure associée à un coefficient 1,50 peut par exemple correspondre à une heure trente de repos dans le cas décrit par Service-Public.',
        'Cet outil calcule uniquement un montant. Il ne convertit pas le résultat en repos, ne suit pas le contingent et ne décide pas quand le repos peut être pris. Une valeur monétaire de zéro ne signifie pas nécessairement absence de droit si une compensation en temps est prévue. Vérifiez séparément paiement, repos et limites.',
      ],
    },
    {
      heading: 'Tenir un relevé vérifiable sans double compter',
      paragraphs: [
        'Avant le calcul, consignez date, heure de début, heure de fin, pause non travaillée et contexte de chaque séquence. Convertissez les minutes en fraction d’heure en divisant par 60 : 30 minutes valent 0,5 heure et 45 minutes 0,75. Regroupez ensuite par semaine et par catégorie applicable.',
        'Chaque heure ne doit apparaître qu’une fois, sauf cumul expressément confirmé. Conservez planning, messages, validation, relevé et bulletins. Le résumé copié par FunnyTools ne contient pas les dates ni la preuve du travail ; il n’est qu’une opération sur des nombres déjà classés.',
      ],
    },
    {
      heading: 'Confidentialité, limites et recours',
      paragraphs: [
        'Le taux, les heures et coefficients restent dans l’onglet. Aucun nom d’employeur ou de salarié n’est nécessaire. Le bouton de copie place le détail dans le presse-papiers, qui peut être synchronisé. La remise à zéro restaure les coefficients d’exemple mais n’efface pas un document où vous avez déjà collé le résultat.',
        'La page ne calcule ni cotisations, ni exonération fiscale, ni net, ni durée légale, ni contingent, ni prescription. Elle ne remplace pas le bulletin, la convention collective, le Code du travail numérique, l’employeur, un représentant du personnel ou un conseil juridique. Pour un non-paiement ou un désaccord, utilisez les documents réels et les voies compétentes.',
      ],
    },
  ],
  instructions: [
    'Identifiez d’abord la semaine, le statut et la convention applicables.',
    'Obtenez le taux horaire brut reconnu.',
    'Classez chaque heure une seule fois et convertissez les minutes en décimales.',
    'Saisissez les coefficients vérifiés puis contrôlez chaque produit.',
    'Conservez le relevé source et confirmez paiement ou repos sur le bulletin.',
  ],
  examples: [
    'Calculer huit heures à 1,25 et deux heures à 1,50.',
    'Tester un coefficient conventionnel différent du régime supplétif.',
    'Séparer un bloc dominical seulement après vérification de sa règle.',
    'Comparer le montant calculé aux lignes du bulletin de paie.',
  ],
  audience: [
    'Salariés à temps plein vérifiant une opération documentée.',
    'Gestionnaires qui testent une formule avant contrôle de paie.',
    'Étudiants découvrant pourcentage de majoration et coefficient.',
    'Utilisateurs souhaitant un calcul local sans compte.',
  ],
  caseStudies: [
    { title: 'Huit heures puis deux heures', description: 'À 20 € brut, 8 h × 1,25 donnent 200 € et 2 h × 1,50 donnent 60 €, soit 260 € avant autres traitements.' },
    { title: 'Salarié à temps partiel', description: 'La personne ne reprend pas les coefficients préremplis : elle consulte les heures complémentaires de son contrat et de sa convention.' },
    { title: 'Dimanche sans double automatique', description: 'Le champ reste à 1,00 tant qu’aucune disposition applicable n’établit une majoration ou son cumul.' },
  ],
  notes: [
    '1,25 signifie taux complet plus 25 %, pas supplément seul.',
    'Les deux premiers coefficients sont des exemples supplétifs français à vérifier.',
    'Dimanche et jour férié commencent à 1,00 faute de règle universelle.',
    'Les sorties sont des montants bruts arrondis à l’unité.',
    'Repos, contingent, cotisations et net ne sont pas calculés.',
  ],
  faq: [
    { q: 'Comment calculer une heure supplémentaire majorée de 25 % ?', a: 'Multipliez le taux horaire brut par les heures puis par 1,25. Confirmez auparavant que cette majoration s’applique.' },
    { q: 'Quand passe-t-on de 25 % à 50 % ?', a: 'Dans le régime supplétif à temps plein, les huit premières heures hebdomadaires sont à 25 %, puis les suivantes à 50 %, sous réserve des dispositions conventionnelles.' },
    { q: 'Dois-je saisir 0,25 ou 1,25 ?', a: 'Saisissez 1,25 pour calculer l’heure complète majorée. 0,25 ne représente que le supplément.' },
    { q: 'Puis-je calculer des heures à temps partiel ?', a: 'Les heures au-delà du contrat sont généralement complémentaires et suivent d’autres limites et taux. Vérifiez cette règle avant toute saisie.' },
    { q: 'Le dimanche est-il toujours payé double ?', a: 'Non. Le secteur, la zone et la convention peuvent modifier ou supprimer une majoration. Le champ français commence à 1,00.' },
    { q: 'Les heures peuvent-elles être remplacées par du repos ?', a: 'Oui dans certains cadres. La calculatrice ne convertit pas le montant en repos et ne suit pas le contingent.' },
    { q: 'Le total est-il brut ou net ?', a: 'C’est un montant brut arithmétique fondé sur le taux saisi. Cotisations et impôt ne sont pas déduits.' },
    { q: 'Le calcul constitue-t-il une preuve de paiement dû ?', a: 'Non. Conservez relevés, contrat, convention et bulletin puis adressez-vous à l’interlocuteur compétent.' },
  ],
  labels: {
    hourlyRate: 'Taux horaire brut',
    weekdayHours: 'Heures de la 36e à la 43e — à vérifier',
    weekdayMultiplier: 'Coefficient du premier bloc',
    extendedHours: 'Heures à partir de la 44e — à vérifier',
    extendedMultiplier: 'Coefficient du second bloc',
    restHours: 'Autres heures ou dimanche',
    restMultiplier: 'Coefficient de cet autre bloc',
    holidayHours: 'Heures un jour férié',
    holidayMultiplier: 'Coefficient du jour férié',
    calculate: 'Calculer',
    copy: 'Copier le résultat',
    reset: 'Réinitialiser',
    weekdayPay: 'Premier bloc',
    extendedPay: 'Second bloc',
    restPay: 'Autres heures',
    holidayPay: 'Jour férié',
    totalPay: 'Total brut arithmétique',
    assumptionNote: 'Les coefficients sont des hypothèses éditables. Vérifiez statut, convention, taux, semaine, paiement et repos.',
    formula: 'Formule de chaque bloc : taux horaire × heures × coefficient',
    invalidInput: 'Saisissez des valeurs positives ou nulles et des coefficients compris entre 0 et 10.',
    copied: 'Résultat copié',
    defaultHourly: '0',
    defaultWeekdayHours: '0',
    defaultWeekdayMultiplier: '1.25',
    defaultExtendedHours: '0',
    defaultExtendedMultiplier: '1.50',
    defaultRestHours: '0',
    defaultRestMultiplier: '1',
    defaultHolidayHours: '0',
    defaultHolidayMultiplier: '1',
  },
  privacyNote: 'Le taux, les heures et les coefficients restent dans cet onglet. FunnyTools ne les conserve pas ; la copie utilise le presse-papiers.',
  disclaimer: 'Estimation arithmétique sans décision juridique. Vérifiez les heures, le taux, la convention, les majorations, le repos et le bulletin auprès de sources compétentes.',
};

export const frenchOvertimePayReview = {
  heading: 'Vérifier un calcul d’heures supplémentaires',
  intro: 'Chaque heure doit reposer sur un relevé, un taux horaire reconnu et une règle de majoration identifiable.',
  panels: [
    { title: 'Relevé', text: 'Conservez dates, horaires, pauses et semaine civile sans double compter.' },
    { title: 'Taux', text: 'Utilisez l’assiette horaire brute reconnue par le bulletin ou la convention.' },
    { title: 'Règle', text: 'Documentez coefficient, paiement ou repos et éventuel cumul.' },
  ],
  checklistHeading: 'Liste de contrôle',
  checklist: [
    'Le statut temps plein ou temps partiel a été identifié.',
    'Les minutes ont été divisées par 60.',
    'Chaque coefficient correspond à une source applicable.',
    'Le total est contrôlé avec le bulletin et les droits au repos.',
  ],
};
