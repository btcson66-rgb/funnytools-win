import type { ToolContent } from '../tools/_types';

export const frenchPomodoroTimer: ToolContent = {
  name: 'Minuteur Pomodoro en ligne',
  short: 'Alternez une période de concentration, une pause courte et une pause longue sans installer d’application.',
  long: 'Ce minuteur Pomodoro en ligne vous permet de régler la durée de concentration, la pause courte et la pause longue entre 1 et 180 minutes. Il compte les blocs terminés, ouvre une pause longue après le quatrième bloc et recalcule le temps restant à partir d’une heure de fin réelle lorsque l’onglet passe en arrière-plan. Les trois durées restent dans le stockage local de ce navigateur ; aucune tâche, aucun compte et aucun historique de productivité ne sont envoyés à FunnyTools.',
  seoTitle: 'Minuteur Pomodoro en ligne gratuit et réglable',
  seoDescription: 'Lancez un minuteur Pomodoro gratuit sans inscription : concentration, pause courte, pause longue, cycles réglables et temps corrigé en arrière-plan.',
  keywords: [
    'minuteur Pomodoro en ligne',
    'timer Pomodoro gratuit',
    'méthode Pomodoro 25 minutes',
    'minuteur de concentration',
    'minuteur pour réviser',
    '25 minutes 5 minutes',
    'cycle travail pause',
    'chronomètre Pomodoro sans inscription',
  ],
  capabilities: [
    'Régler concentration, pause courte et pause longue de 1 à 180 minutes.',
    'Passer automatiquement du travail à la pause et utiliser la pause longue après quatre blocs.',
    'Mettre en pause puis reprendre au nombre de secondes restant.',
    'Afficher le décompte et la phase courante dans le titre de l’onglet.',
    'Conserver uniquement les trois durées sur l’appareil utilisé.',
  ],
  contentSections: [
    {
      heading: 'Réponse rapide : comment utiliser un minuteur Pomodoro',
      paragraphs: [
        'Choisissez une seule tâche et décrivez un résultat observable : lire puis résumer trois pages, corriger cinq exercices, rédiger l’introduction ou classer vingt factures. Gardez le réglage initial de 25 minutes de concentration, 5 minutes de pause courte et 15 minutes de pause longue, puis lancez le minuteur. À la fin du bloc, la page compte une session et ouvre une pause ; après le quatrième bloc terminé, elle propose la pause longue.',
        'Le nombre 25 n’est pas une obligation médicale ou juridique. Il sert de point de départ facile à comprendre. Si vous débutez une tâche difficile, 15 ou 20 minutes peuvent suffire pour franchir le seuil de démarrage. Une activité déjà maîtrisée et exigeant du contexte peut bénéficier de 35 à 50 minutes. Le bon réglage est celui qui permet d’obtenir un résultat précis sans transformer la journée en concours de compteurs.',
      ],
    },
    {
      heading: 'Méthode Pomodoro : concentration, pause et cycle de quatre blocs',
      paragraphs: [
        'La méthode popularisée par Francesco Cirillo découpe le travail en intervalles délimités par un minuteur. Dans la séquence la plus connue, un bloc de 25 minutes est suivi d’une pause courte, puis une pause plus longue sépare un groupe de quatre blocs. Cette structure rend visible le début, la fin et la récupération au lieu de laisser une tâche ouverte sans limite.',
        'Cette page est une implémentation indépendante. Pomodoro® est une marque déposée et FunnyTools n’est ni le site officiel ni un organisme de certification. Le compteur indique seulement les blocs de concentration achevés dans l’onglet actuel. Il ne mesure ni la qualité du travail, ni l’effort réel, ni la valeur d’une personne. Un seul bloc qui révèle une erreur importante peut produire plus de valeur que plusieurs intervalles mécaniques.',
      ],
      link: {
        prefix: 'Pour retrouver les ressources du créateur de la méthode, consultez le ',
        label: 'site officiel Pomodoro Technique',
        href: 'https://www.pomodorotechnique.com/',
        suffix: '.',
      },
    },
    {
      heading: 'Choisir 15, 25, 40 ou 50 minutes selon la tâche',
      paragraphs: [
        'Pour réviser un cours, un premier bloc peut servir à rappeler les connaissances sans support, un deuxième à relire et un troisième à corriger les erreurs. Pour écrire, séparez recherche, plan, rédaction et révision : changer sans cesse de mode à l’intérieur du même intervalle consomme du temps. Pour du code ou de la conception, un bloc plus long peut préserver le contexte, à condition de préparer les fichiers et le critère de fin avant de démarrer.',
        'Observez trois signaux pendant quelques jours : terminez-vous presque toujours très tôt, êtes-vous interrompu avant la moitié, ou arrivez-vous à la pause sans savoir ce qui a été produit ? Réduisez la durée pour une tâche trop vague ou anxiogène ; augmentez-la avec prudence lorsque la continuité est réellement utile. Si chaque bloc déborde, divisez plutôt le livrable. Une minuterie plus longue ne corrige pas un objectif imprécis.',
      ],
      items: [
        '15 à 20 minutes : amorcer, trier ou traiter un petit lot clairement défini.',
        '25 à 30 minutes : révision, rédaction courte ou tâche administrative ciblée.',
        '40 à 50 minutes : analyse, programmation ou création nécessitant du contexte.',
        'Pause : quitter réellement la tâche et préparer un point de reprise explicite.',
      ],
    },
    {
      heading: 'Un cycle concret pour étudier, écrire ou télétravailler',
      paragraphs: [
        'Avant de cliquer sur Démarrer, notez le résultat attendu et fermez ce qui n’est pas nécessaire. Pendant le bloc, consignez une interruption dans une liste plutôt que de la traiter immédiatement lorsque la situation le permet. À la sonnerie, écrivez une phrase de reprise, par exemple « continuer au tableau 3 » ou « vérifier la source du paragraphe 2 ». Cette trace réduit le coût de redémarrage après la pause.',
        'Pendant la pause courte, levez-vous, changez de posture, regardez ailleurs et évitez d’ouvrir une nouvelle source de sollicitations. Après quatre blocs, la pause longue peut servir à manger, marcher, aérer ou changer de lieu. Une réunion, un appel avec un client, un cours en direct, l’accueil du public ou une activité de soin ne doivent pas être interrompus pour obéir à un cycle rigide : la responsabilité envers les autres personnes reste prioritaire.',
      ],
    },
    {
      heading: 'Onglet en arrière-plan, écran verrouillé et précision du décompte',
      paragraphs: [
        'Les navigateurs ralentissent les minuteurs JavaScript dans les onglets inactifs afin d’économiser des ressources. FunnyTools ne suppose donc pas que chaque intervalle de 250 millisecondes arrive exactement à l’heure. Au démarrage, la page enregistre une heure de fin avec `Date.now()` ; chaque mise à jour recalcule la différence entre cette échéance et l’horloge de l’appareil. Au retour dans l’onglet, le décompte rejoint le temps réellement écoulé.',
        'La page doit néanmoins rester ouverte. Le système peut suspendre un navigateur mobile, décharger un onglet, couper l’audio ou empêcher un son sans interaction récente. Un changement manuel de date ou d’heure peut aussi modifier le résultat. N’utilisez pas ce bip comme seule alarme pour une prise de médicament, un rendez-vous, une cuisson dangereuse ou une obligation critique : ajoutez une alarme système conçue pour cet usage.',
      ],
      link: {
        prefix: 'MDN explique pourquoi les ',
        label: 'minuteurs peuvent être retardés dans un onglet inactif',
        href: 'https://developer.mozilla.org/fr/docs/Web/API/Window/setTimeout',
        suffix: '.',
      },
    },
    {
      heading: 'Pauses actives, travail sur écran et règle française des six heures',
      paragraphs: [
        'L’INRS recommande d’organiser le travail sur écran de façon à varier les tâches et, quand ce n’est pas possible, à prévoir des pauses régulières adaptées au contenu et à l’intensité. Sa fiche de prévention propose en pratique des pauses actives idéalement toutes les 30 minutes : se lever, bouger et quitter l’écran des yeux. Un cycle de 25 minutes peut aider à matérialiser cette rupture, mais un minuteur ne remplace ni l’aménagement du poste ni l’organisation du travail.',
        'Il ne faut pas confondre ces micro-pauses de récupération avec le temps de pause légal. Service-Public rappelle qu’un salarié majeur bénéficie d’au moins 20 minutes consécutives dès six heures de travail, sous réserve de dispositions plus favorables. FunnyTools ne suit ni le temps de travail effectif, ni la convention collective, ni les pauses réellement prises. Le compteur Pomodoro n’est donc pas une feuille de temps ni une preuve de conformité employeur.',
      ],
      link: {
        prefix: 'Consultez les conseils de l’',
        label: 'INRS sur la prévention du travail sur écran',
        href: 'https://www.inrs.fr/risques/travail-ecran/prevention-risques',
        suffix: '.',
      },
    },
    {
      heading: 'Gérer les interruptions sans pauser à chaque difficulté',
      paragraphs: [
        'Distinguez l’urgence externe, qui exige réellement une réponse, de l’impulsion interne : consulter un message, chercher un détail secondaire ou changer d’outil parce que la tâche devient inconfortable. Pour la seconde catégorie, notez l’idée et continuez. Si une interruption externe est inévitable, mettez en pause ; le bouton Démarrer reprend ensuite au nombre de secondes restant sans ajouter un bloc terminé.',
        'Lorsque les interruptions se répètent, analysez leur origine plutôt que de culpabiliser. Le créneau est peut-être mal choisi, les notifications restent actives, la tâche dépend d’une réponse ou votre activité exige une disponibilité permanente. Dans ce dernier cas, un simple rappel de changement de posture peut être plus adapté qu’une séquence de concentration rigide.',
      ],
      link: {
        prefix: 'Pour des rappels réguliers sans compteur de tâche, utilisez le ',
        label: 'rappel de pause écran',
        href: '/fr/outils/rappel-pause-ecran/',
        suffix: '.',
      },
    },
    {
      heading: 'Erreurs fréquentes : courir après les sessions et remplir les pauses',
      paragraphs: [
        'Commencer sans résultat précis est l’erreur principale : le minuteur devient alors un décor. Viennent ensuite la multiplication des objectifs dans un même bloc, le report de la pause pour « finir juste un détail », et l’ouverture des réseaux sociaux pendant les cinq minutes de récupération. Une pause saturée d’informations ne joue pas le même rôle qu’un vrai changement de stimulation.',
        'Ne modifiez pas les durées au milieu d’une phase en cours en espérant déplacer l’échéance : les champs sont enregistrés pour la configuration, mais le bloc lancé conserve son temps restant jusqu’à une pause ou une remise à zéro. Une valeur décimale, zéro ou supérieure à 180 est refusée. Réinitialiser revient à la phase de concentration, remet le compteur à zéro et utilise la durée actuellement inscrite.',
      ],
    },
    {
      heading: 'Confidentialité, stockage local et limites du minuteur',
      paragraphs: [
        'Les trois durées sont enregistrées dans `localStorage` sous une clé de ce navigateur. La tâche, la phase, les secondes restantes et le compteur ne sont ni transmis à FunnyTools ni conservés comme historique après rechargement. Effacer les données du site ou utiliser un autre profil rétablit les valeurs par défaut. Sur un appareil partagé, l’historique du navigateur peut tout de même révéler la visite de la page.',
        'Cet outil aide à organiser le temps ; il ne fournit aucun diagnostic médical, psychologique, ergonomique ou professionnel. Une fatigue persistante, une douleur, une anxiété marquée ou un problème d’attention ne se résout pas en augmentant le nombre de cycles. Adaptez l’organisation, respectez vos obligations et demandez un avis compétent lorsque la situation le justifie.',
      ],
    },
  ],
  instructions: [
    'Définissez une seule tâche et un résultat observable avant de lancer le décompte.',
    'Réglez concentration, pause courte et pause longue entre 1 et 180 minutes ; 25, 5 et 15 forment le point de départ affiché.',
    'Cliquez sur Démarrer et gardez la page ouverte ; le titre de l’onglet indique la phase et le temps restant.',
    'Utilisez Pause pour une interruption inévitable, puis Démarrer pour reprendre.',
    'Après chaque concentration achevée, une pause s’ouvre ; la quatrième déclenche la pause longue.',
    'Cliquez sur Réinitialiser pour revenir au premier bloc et remettre le compteur à zéro.',
  ],
  examples: [
    'Réviser un chapitre en séparant rappel, lecture et correction.',
    'Rédiger une introduction en 25 minutes puis noter le prochain paragraphe.',
    'Traiter vingt messages administratifs dans un bloc de 20 minutes.',
    'Programmer pendant 45 minutes sans changer de ticket.',
    'Préparer une présentation en quatre étapes avant la pause longue.',
  ],
  audience: [
    'Étudiants qui veulent délimiter une séance de révision.',
    'Personnes en télétravail souhaitant séparer concentration et récupération.',
    'Rédacteurs, développeurs, chercheurs et créateurs travaillant par livrables.',
    'Utilisateurs qui préfèrent un minuteur sans compte ni historique distant.',
  ],
  caseStudies: [
    {
      title: 'Révision avant un examen',
      description: 'Une étudiante réserve un bloc au rappel sans notes, un autre à la vérification et un troisième aux exercices. Le compteur n’est pas sa note : chaque bloc possède son propre résultat.',
    },
    {
      title: 'Rapport difficile à commencer',
      description: 'Un analyste choisit 15 minutes pour réunir les sources et écrire les titres. Une fois le plan visible, il passe à 35 minutes pour rédiger sans perdre le contexte.',
    },
    {
      title: 'Matinée de tâches administratives',
      description: 'Une indépendante regroupe les factures et courriels en lots de vingt minutes, puis réserve les demandes complexes à un créneau distinct.',
    },
  ],
  notes: [
    'La page doit rester ouverte ; le système peut suspendre l’onglet ou bloquer le son.',
    'L’horloge de l’appareil détermine l’échéance réelle.',
    'Seules les trois durées sont conservées dans le stockage local.',
    'Le compteur repart de zéro après rechargement ou réinitialisation.',
    'Pomodoro® est une marque déposée ; FunnyTools est une implémentation indépendante.',
  ],
  faq: [
    {
      q: 'Combien de temps dure un Pomodoro ?',
      a: 'Le cycle le plus connu utilise 25 minutes de concentration et 5 minutes de pause. Ici, les trois durées sont réglables de 1 à 180 minutes.',
    },
    {
      q: 'Quand la pause longue commence-t-elle ?',
      a: 'Après le quatrième bloc de concentration terminé. À la fin de chaque pause, la phase suivante redevient concentration.',
    },
    {
      q: 'Le minuteur continue-t-il dans un autre onglet ?',
      a: 'Oui tant que la page reste ouverte : le décompte est recalculé depuis une heure de fin réelle. Le navigateur ou le système peut toutefois suspendre la page ou le son.',
    },
    {
      q: 'Puis-je choisir 50 minutes de travail ?',
      a: 'Oui. Entrez un nombre entier de 1 à 180. Choisissez selon la tâche et prévoyez une pause adaptée au lieu de considérer 25 minutes comme une règle universelle.',
    },
    {
      q: 'Mes sessions sont-elles enregistrées ?',
      a: 'Non. Seules les trois durées sont gardées localement. La tâche, la phase, le temps restant et le compteur ne forment pas un historique.',
    },
    {
      q: 'Le bip est-il une alarme fiable ?',
      a: 'Non. Le système peut bloquer l’audio ou suspendre l’onglet. Utilisez une alarme système supplémentaire pour toute échéance critique.',
    },
    {
      q: 'Pomodoro remplace-t-il les pauses légales au travail ?',
      a: 'Non. Le compteur ne mesure pas le temps de travail effectif et ne vérifie ni le Code du travail ni votre accord collectif.',
    },
    {
      q: 'Plus de blocs signifie-t-il plus de productivité ?',
      a: 'Pas nécessairement. Évaluez le résultat, la qualité, les obstacles et la récupération ; le compteur décrit un rythme, pas la valeur du travail.',
    },
  ],
  labels: {
    workMinutes: 'Minutes de concentration',
    breakMinutes: 'Minutes de pause courte',
    longBreakMinutes: 'Minutes de pause longue',
    start: 'Démarrer',
    pause: 'Pause',
    reset: 'Réinitialiser',
    work: 'Concentration',
    break: 'Pause courte',
    longBreak: 'Pause longue',
    completed: 'Blocs terminés',
    sessions: 'blocs',
    minutesError: 'Saisissez des minutes entières comprises entre 1 et 180.',
    titleSuffix: 'Minuteur Pomodoro',
    defaultWorkMinutes: '25',
    defaultBreakMinutes: '5',
    defaultLongBreakMinutes: '15',
    assumption: 'Point de départ affiché : 25 minutes de concentration, 5 minutes de pause courte et 15 minutes de pause longue. Adaptez ces durées à la tâche et gardez une alarme système pour toute échéance critique.',
  },
  sources: [
    {
      label: 'Pomodoro Technique — ressources du titulaire de la méthode',
      href: 'https://www.pomodorotechnique.com/',
      note: 'Source d’origine pour distinguer la méthode de cette implémentation indépendante.',
    },
    {
      label: 'INRS — prévention des risques du travail sur écran',
      href: 'https://www.inrs.fr/risques/travail-ecran/prevention-risques',
      note: 'Conseils français sur l’alternance des tâches et les pauses actives régulières.',
    },
    {
      label: 'Service-Public — durée du travail et temps de pause',
      href: 'https://www.service-public.fr/particuliers/vosdroits/F1911',
      note: 'Référence permettant de ne pas confondre micro-pause d’organisation et pause légale.',
    },
    {
      label: 'MDN — setTimeout()',
      href: 'https://developer.mozilla.org/fr/docs/Web/API/Window/setTimeout',
      note: 'Documentation sur les retards des minuteurs, notamment dans les onglets inactifs.',
    },
    {
      label: 'MDN — Page Visibility API',
      href: 'https://developer.mozilla.org/fr/docs/Web/API/Page_Visibility_API',
      note: 'Explique la visibilité de la page et la limitation des tâches en arrière-plan.',
    },
  ],
  privacyNote: 'Les trois durées restent dans le stockage local de ce navigateur. Tâche, phase, secondes restantes et compteur ne sont ni transmis à FunnyTools ni conservés comme historique.',
  disclaimer: 'Outil général d’organisation du temps. Il ne fournit aucun diagnostic médical, psychologique, ergonomique ou professionnel et ne doit pas servir d’unique alarme pour une obligation critique.',
};

export const frenchPomodoroTimerReview = {
  heading: 'Vérifier le prochain bloc avant de démarrer',
  intro: 'Un intervalle utile relie une tâche précise, une durée réaliste et une vraie récupération.',
  panels: [
    { title: 'Résultat', text: 'Écrivez ce qui sera terminé, vérifié ou décidé à la fin du bloc.' },
    { title: 'Durée', text: 'Choisissez une limite adaptée ; 25 minutes est un point de départ, pas une obligation.' },
    { title: 'Environnement', text: 'Préparez les fichiers et réduisez les interruptions non nécessaires.' },
  ],
  checklistHeading: 'Liste de vérification',
  checklist: [
    'Le bloc contient une seule priorité.',
    'La durée tient dans le créneau disponible.',
    'La page restera ouverte.',
    'Une alarme système couvre toute échéance critique.',
    'La pause ne sera pas remplacée par une autre tâche intense.',
  ],
};

export const frenchInflationCalculator: ToolContent = {
  name: 'Calculateur d’inflation et de pouvoir d’achat',
  short: 'Projetez un coût futur ou ramenez une somme future en euros constants avec un taux annuel choisi.',
  long: 'Ce calculateur d’inflation répond à trois questions distinctes : combien pourrait coûter demain une dépense d’aujourd’hui, quel pouvoir d’achat conserverait une somme nominale future, et quel serait aujourd’hui l’équivalent théorique d’une somme passée. Il applique un taux annuel constant choisi par l’utilisateur ; il ne télécharge pas l’IPC de l’Insee et ne reconstitue pas l’inflation française observée entre deux dates. Pour une conversion historique, une indexation de contrat ou une démarche officielle, utilisez la série et la méthode prévues par l’organisme compétent.',
  seoTitle: 'Calculateur inflation et pouvoir d’achat en ligne',
  seoDescription: 'Calculez inflation cumulée, coût futur et pouvoir d’achat avec montant, taux et durée. Formule, IPC Insee, exemples et limites expliqués.',
  keywords: [
    'calculateur inflation',
    'calcul inflation cumulée',
    'calculateur pouvoir d’achat',
    'valeur future argent',
    'euros constants calcul',
    'perte pouvoir achat inflation',
    'IPC France calcul',
    'équivalent somme ancienne aujourd’hui',
  ],
  capabilities: [
    'Projeter le coût futur d’un montant avec capitalisation annuelle.',
    'Exprimer une somme future en pouvoir d’achat d’aujourd’hui.',
    'Actualiser théoriquement vers aujourd’hui une somme placée dans le passé.',
    'Tester plusieurs scénarios de taux constant, y compris une déflation supérieure à −100%.',
    'Afficher la formule appliquée et copier un résumé sans envoyer les valeurs.',
  ],
  contentSections: [
    {
      heading: 'Réponse rapide : calculer l’inflation cumulée',
      paragraphs: [
        'Avec un taux annuel constant i et n années, le facteur cumulé est (1 + i)ⁿ. Un achat de 1 000 € soumis à 2 % pendant 10 ans devient 1 000 × 1,02¹⁰, soit environ 1 218,99 €. L’augmentation cumulée est donc de 218,99 €, soit 21,9 %, et non 20 % exactement : chaque année s’applique au niveau déjà augmenté.',
        'La question inverse divise par le même facteur. Une somme nominale de 1 000 € reçue dans dix ans avec 2 % d’inflation annuelle aurait un pouvoir d’achat équivalent à environ 820,35 € d’aujourd’hui. Ces deux résultats ne se contredisent pas : le premier cherche la somme future nécessaire pour acheter la même chose, le second mesure ce qu’une somme future donnée permettrait d’acheter en valeur actuelle.',
      ],
    },
    {
      heading: 'Trois modes : coût futur, pouvoir d’achat et équivalent actuel',
      paragraphs: [
        '« Coût futur depuis aujourd’hui » multiplie le montant actuel par le facteur d’inflation. « Pouvoir d’achat futur en monnaie d’aujourd’hui » divise une somme nominale future par ce facteur. « Équivalent actuel d’une somme passée » multiplie une valeur située dans le passé pour la faire avancer vers le présent. Ce troisième mode ne sert pas à chercher le prix passé d’une valeur d’aujourd’hui : cette direction demanderait une division.',
        'La différence affichée est toujours résultat moins montant saisi. Dans le mode pouvoir d’achat, elle devient généralement négative lorsque le taux est positif ; ce n’est pas un prélèvement bancaire, mais l’écart entre la valeur réelle estimée et la somme nominale. Le calcul ne connaît pas la devise. Vous pouvez utiliser des euros ou une autre unité, à condition de ne pas mélanger deux monnaies dans la même comparaison.',
      ],
      items: [
        'Coût futur : montant nominal qui pourrait être nécessaire plus tard.',
        'Pouvoir d’achat : valeur actuelle d’une somme nominale future.',
        'Équivalent actuel : valeur théorique aujourd’hui d’une somme placée dans le passé.',
        'Différence : résultat moins entrée, et non rendement ou débit réel.',
      ],
    },
    {
      heading: 'Inflation et IPC : ce que mesure réellement l’Insee',
      paragraphs: [
        'L’Insee définit l’inflation comme une perte du pouvoir d’achat de la monnaie se traduisant par une hausse générale et durable des prix. L’indice des prix à la consommation, ou IPC, estime entre deux périodes la variation moyenne des prix des produits consommés par les ménages, à qualité constante. Depuis l’IPC de janvier 2026, la base publiée est 2025 = 100 ; ce changement de base ne signifie pas que les prix repartent à zéro.',
        'L’IPC n’est pas un indice du coût de la vie et il ne dit pas que chaque produit augmente du même pourcentage. L’Insee suit un panier représentatif, actualise ses pondérations et publie des indices détaillés. Votre loyer, votre alimentation, votre énergie ou vos transports peuvent évoluer autrement que la moyenne nationale. Une projection uniforme avec FunnyTools est donc un scénario mathématique, pas une reproduction du panier officiel.',
      ],
      link: {
        prefix: 'La définition et le champ sont détaillés dans la fiche ',
        label: '« Indice des prix à la consommation » de l’Insee',
        href: 'https://www.insee.fr/fr/metadonnees/definition/c1557',
        suffix: '.',
      },
    },
    {
      heading: 'Choisir un taux sans transformer un scénario en prévision',
      paragraphs: [
        'Commencez par 0 % pour voir la référence sans variation, puis calculez un scénario central et un scénario plus exigeant. Notez la source, la date de publication, le territoire, l’indicateur et l’horizon du taux. Un glissement annuel observé sur un mois n’est pas nécessairement la moyenne des dix prochaines années ; un objectif de politique monétaire n’est pas non plus une garantie pour chaque année ou chaque dépense.',
        'Sur un horizon long, un taux unique masque les changements de régime. Vous pouvez découper l’analyse : appliquer un premier taux sur une période, reprendre le résultat comme nouveau montant, puis utiliser une autre hypothèse. Conservez les étapes dans votre dossier pour que la projection soit explicable. FunnyTools ne charge aucune prévision et ne suggère pas de taux « correct ».',
      ],
    },
    {
      heading: 'Taux annuel et inflation cumulée ne s’additionnent pas',
      paragraphs: [
        'Additionner 2 % dix fois donne 20 %, mais la capitalisation annuelle donne environ 21,9 %. Avec un taux variable, le facteur exact est le produit des facteurs annuels : (1 + i₁) × (1 + i₂) × …, pas la simple moyenne multipliée par le nombre d’années. Le champ de cette page ne gère qu’un taux constant ; une moyenne arithmétique peut donc différer du taux composé équivalent.',
        'Pour comparer deux années historiques en France, le convertisseur franc-euro de l’Insee utilise l’inflation observée et les changements de monnaie. Il précise que son résultat est indicatif et ne sert pas de référence officielle dans un cadre juridique. Ce service est plus adapté qu’un taux inventé pour demander à combien correspondrait aujourd’hui une somme de 1995 ou de 2005.',
      ],
      link: {
        prefix: 'Pour une comparaison historique, utilisez le ',
        label: 'convertisseur de pouvoir d’achat de l’Insee',
        href: 'https://www.insee.fr/fr/information/2417794',
        suffix: '.',
      },
    },
    {
      heading: 'Déflation, taux négatif et limite de −99,99 %',
      paragraphs: [
        'Un taux négatif représente une baisse générale supposée du niveau de prix dans ce modèle. À −2 % pendant cinq ans, le facteur est 0,98⁵ : le coût futur d’un panier identique diminue dans le scénario, tandis qu’une somme nominale future gagne du pouvoir d’achat réel. Cela ne prédit pas que chaque prix baisse ni que les revenus, taux d’intérêt ou comportements restent inchangés.',
        'La page accepte un taux supérieur à −100 % afin que le facteur annuel reste positif. −100 % annulerait entièrement le niveau de prix et rendrait la division impossible ; une valeur inférieure changerait le signe selon le nombre d’années et n’aurait pas de sens dans ce modèle. La borne haute de 1 000 % sert à contenir les entrées, mais une valeur admise n’est pas pour autant réaliste ou pertinente.',
      ],
    },
    {
      heading: 'Pouvoir d’achat national et budget personnel ne sont pas identiques',
      paragraphs: [
        'Dans les comptes nationaux, le pouvoir d’achat correspond au volume de biens et services qu’un revenu permet d’acheter. Son évolution dépend à la fois des revenus et des prix. Le résultat de cette page ne contient aucun revenu : il mesure seulement l’effet mécanique d’un taux sur un montant. Il ne permet donc pas d’affirmer que le pouvoir d’achat d’un ménage augmente ou baisse sur la seule base d’un panier.',
        'Les pondérations personnelles peuvent s’écarter de la moyenne. L’Insee propose un simulateur d’indice personnalisé depuis 2000 en modifiant les poids des grands groupes de produits. Pour préparer un budget, complétez la projection globale par des scénarios séparés pour logement, énergie, alimentation, transport et autres postes importants. N’additionnez pas ensuite ces scénarios sans respecter leur poids dans le budget.',
      ],
      link: {
        prefix: 'Pour comprendre les différences de panier, consultez le ',
        label: 'simulateur d’indice des prix de l’Insee',
        href: 'https://www.insee.fr/fr/simulateur/2418131/aide/sip_aide.htm',
        suffix: '.',
      },
    },
    {
      heading: 'Loyer, pension, SMIC et contrat : utiliser le bon indice',
      paragraphs: [
        'Une indexation juridique ne consiste pas toujours à prendre l’IPC général. L’Insee rappelle que l’IPC hors tabac intervient dans certains contrats, pensions et rentes, tandis que l’indice utilisé pour le SMIC vise une population particulière hors tabac. Les loyers d’habitation utilisent notamment l’indice de référence des loyers selon les règles applicables. La date de référence, le trimestre, le plafond et la clause contractuelle peuvent changer le résultat.',
        'N’utilisez donc pas ce calculateur comme montant officiel pour augmenter un loyer, une pension, un salaire, une dette ou une prestation. Identifiez d’abord le texte, le contrat, l’indice exact et les périodes de comparaison ; utilisez ensuite l’outil ou la formule de l’autorité compétente. En cas d’enjeu important, demandez une vérification juridique, comptable ou administrative.',
      ],
    },
    {
      heading: 'Contrôles de saisie, confidentialité et portée du résultat',
      paragraphs: [
        'Le montant doit être positif ou nul, le taux compris entre −99,99 % et 1 000 %, et la durée un nombre entier de 0 à 200 ans. Zéro année laisse le montant inchangé. Saisissez 2 pour 2 %, et non 0,02. Une valeur invalide efface le résultat précédent pour éviter de l’associer à de nouvelles entrées. Les grands taux et longs horizons peuvent produire des nombres mathématiquement valides mais inutilisables pour une décision réelle.',
        'Montant, taux, durée et mode restent dans cet onglet. FunnyTools n’interroge aucune base de prix et ne reçoit pas les valeurs. Le calcul est éducatif, à taux constant et capitalisation annuelle. Il ne constitue ni mesure officielle de l’IPC, ni prévision, ni conseil financier, fiscal, contractuel ou juridique.',
      ],
    },
  ],
  instructions: [
    'Saisissez un montant dans une seule monnaie.',
    'Entrez un taux annuel constant, par exemple 2 pour 2 %.',
    'Choisissez une durée entière de 0 à 200 ans.',
    'Sélectionnez coût futur, pouvoir d’achat futur ou équivalent actuel d’une somme passée.',
    'Lisez la direction de la formule et comparez au moins deux scénarios.',
    'Pour un usage historique ou officiel, remplacez l’hypothèse par la série et la méthode compétentes.',
  ],
  examples: [
    'Projeter le prix de 1 000 € avec 2 % pendant 10 ans : environ 1 218,99 €.',
    'Ramener 1 000 € reçus dans dix ans à environ 820,35 € d’aujourd’hui.',
    'Comparer des budgets à 0 %, 2 % et 4 % sans présenter un scénario comme certitude.',
    'Tester l’effet d’une déflation de −2 % sur cinq ans.',
    'Distinguer une estimation pédagogique d’une indexation officielle de contrat.',
  ],
  audience: [
    'Ménages préparant un budget à moyen ou long terme.',
    'Étudiants apprenant inflation, capitalisation et euros constants.',
    'Professionnels construisant des scénarios clairement documentés.',
    'Lecteurs souhaitant distinguer IPC national et expérience personnelle.',
  ],
  caseStudies: [
    {
      title: 'Budget d’un achat futur',
      description: 'Un foyer calcule la valeur de 8 000 € dans cinq ans avec plusieurs taux et conserve les hypothèses au lieu d’annoncer un prix certain.',
    },
    {
      title: 'Épargne en valeur réelle',
      description: 'Une épargnante compare le montant nominal prévu à son pouvoir d’achat estimé, puis traite séparément rendement, frais, fiscalité et risque.',
    },
    {
      title: 'Somme ancienne à comparer',
      description: 'Un chercheur utilise d’abord FunnyTools pour comprendre la direction du calcul, puis cite le convertisseur et la série Insee pour la valeur historique.',
    },
  ],
  notes: [
    'Le taux est une hypothèse constante saisie par l’utilisateur.',
    'La page ne télécharge ni l’IPC ni une prévision de l’Insee.',
    'IPC, coût de la vie et panier personnel ne sont pas interchangeables.',
    'Une indexation officielle peut imposer un autre indice et une autre période.',
    'La différence affichée n’est ni rendement ni débit bancaire.',
  ],
  faq: [
    {
      q: 'Comment calculer l’inflation cumulée ?',
      a: 'Avec un taux constant i pendant n années, utilisez (1 + i)ⁿ − 1. À 2 % pendant 10 ans, la hausse cumulée est d’environ 21,9 %.',
    },
    {
      q: 'Pourquoi diviser pour calculer le pouvoir d’achat ?',
      a: 'Parce qu’une somme future doit être ramenée en valeur d’aujourd’hui. On divise le montant nominal par le facteur d’inflation.',
    },
    {
      q: 'Le calculateur utilise-t-il le dernier IPC Insee ?',
      a: 'Non. Il applique uniquement le taux saisi. Pour l’inflation observée, consultez les séries et convertisseurs de l’Insee.',
    },
    {
      q: 'Quelle différence entre IPC et coût de la vie ?',
      a: 'L’IPC mesure la variation moyenne des prix d’un panier de consommation à qualité constante. L’Insee précise qu’il ne s’agit pas d’un indice du coût de la vie.',
    },
    {
      q: 'Puis-je utiliser un taux négatif ?',
      a: 'Oui, entre −99,99 % et 1 000 %. Un taux négatif représente un scénario de déflation, sans prédire l’évolution réelle de chaque prix.',
    },
    {
      q: 'Le résultat sert-il à réviser un loyer ou une pension ?',
      a: 'Non comme montant officiel. Vérifiez l’indice, la période, la clause et les règles spécifiques auprès de l’autorité compétente.',
    },
    {
      q: 'Le taux annuel doit-il être additionné sur plusieurs années ?',
      a: 'Non. Une hypothèse constante se compose : à 2 % sur 10 ans, le facteur est 1,02¹⁰ et non 1 + 20 % exactement.',
    },
    {
      q: 'La différence affichée est-elle une perte réelle ?',
      a: 'Pas nécessairement. Elle vaut résultat moins entrée dans le scénario ; elle ne représente ni transaction bancaire ni évolution complète du revenu.',
    },
  ],
  labels: {
    amount: 'Montant',
    annualRate: 'Inflation annuelle supposée (%)',
    years: 'Nombre d’années entières',
    mode: 'Question à calculer',
    futureCost: 'Coût futur depuis aujourd’hui',
    futureBuyingPower: 'Pouvoir d’achat futur en monnaie d’aujourd’hui',
    pastEquivalent: 'Équivalent actuel d’une somme passée',
    calculate: 'Calculer l’inflation',
    copy: 'Copier le résultat',
    reset: 'Réinitialiser',
    adjustedAmount: 'Montant ajusté',
    change: 'Différence avec le montant saisi',
    formula: 'Direction du calcul',
    formulaMultiply: 'montant × (1 + taux)^années',
    formulaDivide: 'montant ÷ (1 + taux)^années',
    invalidInput: 'Utilisez un montant non négatif, un taux de −99,99 % à 1 000 % et un nombre entier d’années de 0 à 200.',
    copied: 'Résultat copié',
    defaultAmount: '1000',
    defaultAnnualRate: '2',
    defaultYears: '10',
    assumption: 'Exemple affiché : taux annuel constant de 2 % pendant 10 ans. Ce taux n’est ni l’IPC courant ni une prévision ; remplacez-le par votre scénario documenté.',
  },
  formula: {
    expression: 'facteur = (1 + i)^n ; coût futur ou équivalent actuel = montant × facteur ; pouvoir d’achat = montant ÷ facteur',
    explanation: 'i est le taux annuel en décimal et n un nombre entier d’années. Le modèle suppose un taux constant et une composition annuelle.',
  },
  sources: [
    {
      label: 'Insee — définition de l’inflation',
      href: 'https://www.insee.fr/fr/metadonnees/definition/c1473',
      note: 'Définition de la perte de pouvoir d’achat de la monnaie et relation avec l’IPC.',
    },
    {
      label: 'Insee — définition de l’indice des prix à la consommation',
      href: 'https://www.insee.fr/fr/metadonnees/definition/c1557',
      note: 'Champ, qualité constante, base 2025 et distinction avec le coût de la vie.',
    },
    {
      label: 'Insee — convertisseur franc-euro et pouvoir d’achat',
      href: 'https://www.insee.fr/fr/information/2417794',
      note: 'Conversion historique fondée sur l’inflation observée, avec méthode et limites.',
    },
    {
      label: 'Insee — simulateur d’indice des prix personnalisé',
      href: 'https://www.insee.fr/fr/simulateur/2418131/aide/sip_aide.htm',
      note: 'Explique comment comparer le panier moyen et des pondérations personnelles.',
    },
    {
      label: 'Banque de France — mesure du pouvoir d’achat',
      href: 'https://www.banque-france.fr/fr/publications-et-statistiques/publications/la-mesure-du-pouvoir-dachat',
      note: 'Repères sur la mesure française du pouvoir d’achat des ménages.',
    },
  ],
  privacyNote: 'Montant, taux, durée et mode sont calculés dans cette page. FunnyTools ne reçoit pas ces valeurs et ne consulte aucune base de prix externe.',
  disclaimer: 'Simulation éducative à taux constant. Ce résultat n’est ni un calcul officiel d’IPC, ni une prévision, ni un conseil financier, fiscal, contractuel ou juridique.',
};

export const frenchInflationCalculatorReview = {
  heading: 'Vérifier une estimation d’inflation',
  intro: 'Un résultat interprétable exige la bonne direction temporelle, une hypothèse datée et un usage clairement limité.',
  panels: [
    { title: 'Direction', text: 'Distinguez le coût futur d’une somme et le pouvoir d’achat actuel d’un montant futur.' },
    { title: 'Hypothèse', text: 'Notez source, date, territoire et horizon du taux au lieu de le présenter comme certitude.' },
    { title: 'Usage', text: 'Pour un contrat ou une démarche, appliquez l’indice et la méthode officiels.' },
  ],
  checklistHeading: 'Liste de vérification',
  checklist: [
    'Tous les montants utilisent la même monnaie.',
    'Le taux correspond au territoire et à l’horizon étudiés.',
    'Multiplier ou diviser répond bien à la question posée.',
    'Au moins deux scénarios ont été comparés.',
    'Une source officielle remplacera la simulation si nécessaire.',
  ],
};

export const frenchCad2d: ToolContent = {
  name: 'CAO 2D en ligne pour croquis technique',
  short: 'Tracez lignes, rectangles, cercles et polylignes avec grille, mode orthogonal et export PNG ou SVG.',
  long: 'Cet outil de CAO 2D en ligne crée un croquis technique directement dans le navigateur. Il propose ligne, rectangle, cercle, polyligne, saisie de longueurs et d’angles, accrochage à la grille et aux extrémités, jonction de sommets, déplacement, poignées, annulation et export PNG ou SVG. Les coordonnées sont des unités abstraites : la page ne connaît ni millimètres, ni mètres, ni échelle d’impression, ni calques, cotations, tolérances, DWG ou DXF. La géométrie reste en mémoire dans l’onglet et n’est pas envoyée à FunnyTools.',
  seoTitle: 'CAO 2D en ligne gratuite pour croquis et plan',
  seoDescription: 'Dessinez un croquis CAO 2D en ligne : lignes, rectangles, cercles, polylignes, grille, ortho, accrochage, annuler et export PNG ou SVG.',
  keywords: [
    'CAO 2D en ligne',
    'logiciel CAO 2D gratuit',
    'dessin technique en ligne',
    'faire un plan 2D en ligne',
    'outil dessin industriel 2D',
    'croquis technique gratuit',
    'dessin vectoriel SVG',
    'plan 2D sans installation',
  ],
  capabilities: [
    'Tracer ligne, rectangle, cercle et polyligne sur une grille 2D.',
    'Saisir longueur, angle, largeur, hauteur ou rayon pendant le dessin.',
    'Activer grille, accrochage aux extrémités et contrainte orthogonale.',
    'Sélectionner, déplacer, modifier un sommet, joindre ou détacher des extrémités.',
    'Annuler, rétablir, supprimer puis exporter en PNG ou SVG.',
  ],
  contentSections: [
    {
      heading: 'Réponse rapide : dessiner un plan 2D en ligne',
      paragraphs: [
        'Choisissez Ligne, Rectangle, Cercle ou Polyligne, puis cliquez dans le canevas. Pour une ligne, placez le premier point, saisissez éventuellement une longueur et un angle, puis validez avec Entrée. Pour un rectangle, indiquez largeur et hauteur ; pour un cercle, le rayon. La grille est espacée de 20 unités et l’accrochage attire le curseur vers les positions régulières ou vers une extrémité existante.',
        'Utilisez Sélectionner pour déplacer une forme ou tirer ses poignées bleues. « Unir les extrémités » place deux sommets au même point et conserve leur relation lors d’une modification. Exportez ensuite en PNG pour une image prête à insérer ou en SVG pour garder des formes vectorielles. Avant tout usage réel, écrivez ce que représente une unité et contrôlez les dimensions dans un logiciel adapté.',
      ],
    },
    {
      heading: 'CAO, DAO et croquis : ce que cet outil sait réellement faire',
      paragraphs: [
        'La CAO désigne la conception assistée par ordinateur ; la DAO met davantage l’accent sur le dessin. Dans la pratique, les deux termes se recouvrent souvent dans les recherches de plans 2D. FunnyTools fournit un tableau de croquis géométrique : il aide à poser un contour, une implantation, un schéma ou une idée avant de passer à un environnement de production.',
        'Ce n’est pas un logiciel de bâtiment, de mécanique, d’électricité ou d’architecture. Il n’exécute aucun calcul de structure, de surface réglementaire, de passage, de charge, de matériau ou de conformité. Il ne contient pas de bibliothèque de symboles, de cartouche, de calques, de hachures, de cotations associatives ni de gestion de versions. Un dessin propre à l’écran ne devient pas automatiquement un plan d’exécution.',
      ],
    },
    {
      heading: 'Unités, grille et échelle : décider avant de tracer',
      paragraphs: [
        'Les coordonnées affichées sont des unités abstraites. Vous pouvez décider que 20 unités, soit un pas principal de grille, représentent 10 cm, 50 cm ou 1 m, mais la page ne l’enregistre pas. Écrivez cette convention hors du dessin et conservez-la du début à la fin. Si vous changez d’équivalence au milieu, deux segments portant le même nombre ne représentent plus la même distance réelle.',
        'L’export SVG conserve les coordonnées du canevas dans son `viewBox`, pas une échelle physique garantie à l’impression. L’export PNG est une image en pixels. Pour imprimer au 1:20, 1:50 ou 1:100, il faut ouvrir le fichier dans un logiciel qui gère unités, format de feuille, marges et échelle, puis vérifier une cote témoin. Ne mesurez pas une capture d’écran avec une règle en supposant qu’elle est à l’échelle.',
      ],
      items: [
        'Définissez la finalité du croquis et son unité avant le premier trait.',
        'Gardez la même convention sur tout le dessin.',
        'Ajoutez les dimensions critiques dans un document séparé.',
        'Vérifiez une cote témoin après importation ou impression.',
      ],
    },
    {
      heading: 'Ligne, rectangle, cercle et polyligne : choisir la bonne forme',
      paragraphs: [
        'Une ligne contient deux extrémités et convient à un axe, un bord isolé ou une liaison. Un rectangle est défini par deux coins opposés ; largeur et hauteur suivent les axes du canevas. Un cercle utilise un centre et un rayon. Une polyligne enchaîne plusieurs segments et reste ouverte tant que vous ne rejoignez pas manuellement son dernier point au premier. Double-cliquez, appuyez sur Entrée ou utilisez « Terminer la polyligne » pour la valider.',
        'Le format SVG exporté utilise les éléments `line`, `rect`, `circle` et `polyline`. Selon MDN, une polyline décrit une liste de points X,Y et ne relie pas automatiquement le dernier au premier. Si vous avez besoin d’un contour fermé, placez donc le dernier sommet sur l’extrémité initiale avec l’accrochage, puis vérifiez visuellement la jonction.',
      ],
      link: {
        prefix: 'La structure vectorielle est décrite dans la référence ',
        label: 'MDN sur les points des polylignes SVG',
        href: 'https://developer.mozilla.org/fr/docs/Web/SVG/Reference/Attribute/points',
        suffix: '.',
      },
    },
    {
      heading: 'Saisie dynamique : longueur, angle, largeur, hauteur et rayon',
      paragraphs: [
        'Après le premier point d’une ligne ou d’une polyligne, le panneau dynamique accepte une longueur. La touche Tab mène au champ d’angle, puis Entrée valide le segment. Un angle de 0° va vers la droite, 90° vers le bas dans le repère du canevas, 180° vers la gauche et −90° vers le haut. Cette orientation de l’axe Y suit l’affichage informatique et peut différer d’un repère mathématique classique.',
        'Pour un rectangle, la saisie utilise largeur puis hauteur ; pour un cercle, elle utilise le rayon. Les valeurs doivent être positives. La saisie donne une géométrie plus reproductible qu’un clic à l’œil, mais elle n’ajoute pas de cote ni de contrainte paramétrique : modifier ensuite une poignée ne conserve pas automatiquement la valeur initiale. Recontrôlez la longueur affichée après toute édition.',
      ],
    },
    {
      heading: 'Grille, mode orthogonal et accrochage aux extrémités',
      paragraphs: [
        'L’accrochage à la grille arrondit le curseur au pas de 20 unités. Le mode orthogonal contraint les lignes et segments de polyligne à l’horizontale ou à la verticale lorsque vous travaillez au pointeur. L’accrochage aux extrémités détecte un sommet proche et l’utilise comme point de départ ou d’arrivée. Ces aides visuelles réduisent les décalages, mais plusieurs aides actives peuvent entrer en concurrence près d’une géométrie dense.',
        'Dans les logiciels professionnels, l’accrochage aux objets vise des emplacements précis comme extrémité, milieu, centre ou intersection. FunnyTools n’implémente que les extrémités des lignes et polylignes ; il ne détecte ni milieu, ni centre de cercle, ni intersection calculée. Si le curseur choisit un point inattendu, zoomez, désactivez temporairement la grille ou l’orthogonal, puis vérifiez les coordonnées.',
      ],
      link: {
        prefix: 'Autodesk décrit le rôle général de l’',
        label: 'accrochage aux objets 2D',
        href: 'https://help.autodesk.com/cloudhelp/2025/FRA/AutoCAD-LT/files/GUID-258AA5A6-39B2-4CFC-B4ED-C5F0DA3D2EE8.htm',
        suffix: '.',
      },
    },
    {
      heading: 'Joindre, déplacer et détacher des sommets',
      paragraphs: [
        'Le mode « Unir les extrémités » demande un premier sommet puis un second. Le second est déplacé sur le premier et une relation interne relie les deux références. Lorsque vous tirez ensuite une poignée jointe, les sommets associés suivent le même point. Un petit marqueur indique la jonction. Cette fonction aide à maintenir un contour continu sans fusionner les formes en un objet unique.',
        'Pour casser la relation, maintenez Alt en tirant la poignée. Déplacer une forme entière conserve ses relations internes, tandis qu’une jonction avec une autre forme peut influencer les sommets liés. Utilisez Annuler immédiatement si le résultat n’est pas celui attendu. L’historique appartient à la session de l’onglet ; recharger la page le supprime avec le dessin.',
      ],
    },
    {
      heading: 'Export PNG ou SVG : quel format choisir',
      paragraphs: [
        'PNG capture le canevas comme image matricielle. Il convient à une note, une présentation ou un aperçu dont la taille finale est connue. Agrandir fortement un PNG révèle les pixels. Le navigateur produit l’image avec `canvas.toDataURL("image/png")` ; MDN indique que cette méthode crée une URL de données représentant le canevas.',
        'SVG enregistre les formes comme vecteurs et calcule un `viewBox` autour de la géométrie avec une marge. Il reste net à l’agrandissement et peut être ouvert dans de nombreux éditeurs. L’export ne contient toutefois ni historique, ni grille, ni jonctions, ni état de sélection. FunnyTools n’exporte pas DWG ou DXF et ne réimporte pas un SVG comme projet éditable. Ouvrez systématiquement le fichier téléchargé avant de fermer la page.',
      ],
      link: {
        prefix: 'La génération d’image depuis un canevas est documentée par ',
        label: 'MDN dans le tutoriel Canvas',
        href: 'https://developer.mozilla.org/fr/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas',
        suffix: '.',
      },
    },
    {
      heading: 'Usages adaptés et cas qui exigent un logiciel professionnel',
      paragraphs: [
        'L’outil convient à un croquis d’implantation, un schéma de principe, un contour de meuble, une disposition de stand, une circulation simple ou une idée à joindre à une discussion. Il peut aussi servir à apprendre coordonnées, angles, polylignes et différence entre image matricielle et vectorielle.',
        'Pour un permis, une fabrication, une découpe, une installation électrique, un calcul de structure, une pièce mécanique tolérancée ou un plan contractuel, utilisez un logiciel et un processus qui gèrent unités, normes, calques, cotations, formats d’échange, révisions et validation par une personne qualifiée. Relevez les mesures sur place avec des instruments adaptés et ne déduisez jamais une cote de sécurité d’un croquis non calibré.',
      ],
    },
    {
      heading: 'Mobile, confidentialité et sauvegarde de la session',
      paragraphs: [
        'Les événements de pointeur permettent d’utiliser souris, stylet ou écran tactile. Sur mobile, la barre d’outils se réorganise et le canevas reste utilisable, mais une saisie précise est plus confortable sur grand écran avec clavier et souris. Pincez ou faites défiler la page en dehors du canevas ; dans le canevas, la molette zoome et un glissement en mode Sélectionner sur une zone vide déplace la vue.',
        'La géométrie reste dans la mémoire de l’onglet. Aucun compte, nom de projet ou fichier n’est envoyé à FunnyTools. Il n’existe pas de sauvegarde automatique : un rechargement, une fermeture, un plantage ou une suspension peut faire perdre le travail. Exportez tôt, ouvrez le fichier, puis conservez plusieurs versions si le croquis compte.',
      ],
    },
  ],
  instructions: [
    'Écrivez ce que représente une unité et la finalité du croquis.',
    'Choisissez Ligne, Rectangle, Cercle ou Polyligne puis placez le premier point.',
    'Utilisez la saisie dynamique pour longueur, angle, largeur, hauteur ou rayon.',
    'Activez ou désactivez grille, extrémités et mode orthogonal selon le point recherché.',
    'Sélectionnez une forme pour la déplacer ou modifier ses poignées ; Alt détache une extrémité jointe.',
    'Vérifiez les jonctions et exportez en PNG ou SVG avant de fermer la page.',
  ],
  examples: [
    'Esquisser une pièce en décidant que 20 unités représentent 50 cm.',
    'Tracer un meuble rectangulaire puis contrôler largeur et hauteur.',
    'Créer un chemin ouvert avec une polyligne et des angles saisis.',
    'Joindre deux segments et déplacer leur sommet commun.',
    'Exporter en SVG pour agrandir le schéma sans pixellisation.',
  ],
  audience: [
    'Étudiants découvrant les principes du dessin 2D.',
    'Particuliers préparant un croquis de discussion non contractuel.',
    'Créateurs souhaitant produire rapidement un schéma vectoriel simple.',
    'Professionnels ayant besoin d’une esquisse avant leur logiciel de CAO habituel.',
  ],
  caseStudies: [
    {
      title: 'Croquis d’aménagement',
      description: 'Une personne dessine le contour d’une pièce et deux meubles pour discuter d’une implantation, puis vérifie toutes les mesures dans son logiciel de plan.',
    },
    {
      title: 'Schéma de fabrication préliminaire',
      description: 'Un artisan pose les lignes principales et exporte un SVG, mais ajoute ensuite unités, tolérances, matériaux et cotations dans son environnement professionnel.',
    },
    {
      title: 'Apprentissage des coordonnées',
      description: 'Un élève compare clic libre, grille, mode orthogonal et saisie d’angle afin de comprendre ce que chaque aide change dans la géométrie.',
    },
  ],
  notes: [
    'Les coordonnées sont des unités abstraites, pas des millimètres ou des mètres.',
    'La grille, les jonctions et l’historique ne sont pas inclus dans le SVG.',
    'La page n’exporte ni DWG ni DXF.',
    'Le dessin n’est pas sauvegardé après rechargement.',
    'Un croquis ne remplace ni mesure, norme, tolérance, calcul technique ni validation qualifiée.',
  ],
  faq: [
    {
      q: 'Est-ce un logiciel de CAO 2D gratuit ?',
      a: 'C’est un outil gratuit de croquis 2D dans le navigateur. Il ne possède pas les fonctions de production, normes, calques, cotations et formats d’un logiciel professionnel.',
    },
    {
      q: 'Quelle unité utilise la grille ?',
      a: 'Une unité abstraite. Le pas de grille vaut 20 unités ; vous devez définir et conserver vous-même l’équivalence avec une mesure réelle.',
    },
    {
      q: 'Comment tracer une ligne d’une longueur précise ?',
      a: 'Placez le premier point, saisissez la longueur, utilisez Tab pour l’angle si nécessaire, puis Entrée. Vérifiez la valeur après toute modification ultérieure.',
    },
    {
      q: 'Que fait le mode orthogonal ?',
      a: 'Il contraint les lignes et segments de polyligne à l’horizontale ou à la verticale lors du dessin au pointeur.',
    },
    {
      q: 'Comment joindre deux extrémités ?',
      a: 'Activez « Unir les extrémités », choisissez le premier sommet puis le second. Alt pendant le déplacement d’une poignée permet ensuite de détacher la relation.',
    },
    {
      q: 'Quelle différence entre PNG et SVG ?',
      a: 'PNG est une image en pixels ; SVG conserve les formes vectorielles et supporte mieux l’agrandissement. Aucun des deux ne sauvegarde l’historique du projet.',
    },
    {
      q: 'Puis-je exporter en DWG ou DXF ?',
      a: 'Non. FunnyTools exporte seulement PNG et SVG. Utilisez un logiciel CAO compatible pour un échange DWG ou DXF.',
    },
    {
      q: 'Le dessin est-il sauvegardé automatiquement ?',
      a: 'Non. Il reste en mémoire dans l’onglet et disparaît au rechargement. Exportez et ouvrez le fichier avant de quitter.',
    },
  ],
  labels: {
    toolbar: 'Barre de dessin',
    select: 'Sélectionner',
    line: 'Ligne',
    rectangle: 'Rectangle',
    circle: 'Cercle',
    polyline: 'Polyligne',
    connect: 'Unir les extrémités',
    snapToGrid: 'Accrochage à la grille',
    endpointSnap: 'Accrochage aux extrémités',
    ortho: 'Mode orthogonal',
    undo: 'Annuler',
    redo: 'Rétablir',
    deleteSelected: 'Supprimer la sélection',
    clearAll: 'Effacer le dessin',
    finishPolyline: 'Terminer la polyligne',
    exportPng: 'Exporter en PNG',
    exportSvg: 'Exporter en SVG',
    canvasLabel: 'Canevas de dessin CAO 2D',
    help: 'Conseil : l’accrochage détecte les extrémités des lignes et polylignes. Sélectionnez une forme pour déplacer ses poignées bleues ; maintenez Alt en tirant pour détacher un sommet joint.',
    currentTool: 'Outil',
    coordinates: 'Coordonnées',
    length: 'Longueur',
    pixels: 'px',
    gridUnits: 'unités',
    noLength: 'Aucun segment pour le moment',
    selected: 'Sélection',
    noSelection: 'Aucune forme sélectionnée',
    confirmClear: 'Voulez-vous supprimer toutes les formes du dessin ?',
    emptyCanvas: 'Le canevas est vide',
    connectMode: 'Unir les extrémités',
    connectPickFirst: 'Sélectionnez la première extrémité',
    connectPickSecond: 'Sélectionnez la seconde extrémité',
    connectJoined: 'Extrémités jointes',
    connectCancelled: 'Jonction annulée',
    endpointSnapped: 'Extrémité détectée',
    gripHint: 'Faites glisser la poignée pour déplacer le sommet',
    detachHint: 'Maintenez Alt pour détacher cette extrémité',
    joinedPoint: 'Extrémité jointe',
    dynLength: 'Longueur',
    dynAngle: 'Angle',
    dynWidth: 'Largeur',
    dynHeight: 'Hauteur',
    dynRadius: 'Rayon',
    dynLengthUnit: 'unités',
    dynAngleUnit: '°',
    dynHint: 'Saisissez la longueur puis Entrée, ou longueur → Tab → angle → Entrée',
    dynRectangleHint: 'Saisissez la largeur et la hauteur puis Entrée',
    dynCircleHint: 'Saisissez le rayon puis Entrée',
    exportPngFilename: 'croquis-cao-2d.png',
    exportSvgFilename: 'croquis-cao-2d.svg',
  },
  sources: [
    {
      label: 'Autodesk — accrochage aux objets 2D',
      href: 'https://help.autodesk.com/cloudhelp/2025/FRA/AutoCAD-LT/files/GUID-258AA5A6-39B2-4CFC-B4ED-C5F0DA3D2EE8.htm',
      note: 'Référence de vocabulaire pour les emplacements précis comme extrémité et centre.',
    },
    {
      label: 'Autodesk — dessin en mode orthogonal',
      href: 'https://help.autodesk.com/cloudhelp/2020/FRA/AutoCAD-MEP/files/GUID-A16A98A0-69BD-46F6-97EA-9BDA755A9643.htm',
      note: 'Explique le principe de contrainte horizontale et verticale dans un plan 2D.',
    },
    {
      label: 'W3C — SVG 2, formes de base',
      href: 'https://www.w3.org/TR/SVG2/shapes.html',
      note: 'Spécification des formes line, rect, circle et polyline utilisées à l’export.',
    },
    {
      label: 'MDN — attribut points des polylignes SVG',
      href: 'https://developer.mozilla.org/fr/docs/Web/SVG/Reference/Attribute/points',
      note: 'Décrit la liste de coordonnées X,Y d’une polyligne et son caractère ouvert.',
    },
    {
      label: 'MDN — sauvegarde d’images Canvas',
      href: 'https://developer.mozilla.org/fr/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas',
      note: 'Documente la génération PNG avec toDataURL et toBlob.',
    },
  ],
  privacyNote: 'La géométrie reste dans la mémoire de cet onglet. PNG et SVG sont générés dans le navigateur ; FunnyTools ne reçoit et ne stocke pas le dessin.',
  disclaimer: 'Outil de croquis conceptuel. Il ne remplace ni mesure, échelle, cotation, tolérance, norme, calcul technique, fichier CAO de production ni validation par une personne qualifiée.',
};

export const frenchCad2dReview = {
  heading: 'Vérifier un croquis avant l’export',
  intro: 'Un dessin utile indique sa finalité, son unité et les contrôles qu’il ne peut pas effectuer.',
  panels: [
    { title: 'Unité', text: 'Écrivez ce que représente une unité ; la grille ne connaît ni millimètre ni mètre.' },
    { title: 'Géométrie', text: 'Contrôlez les extrémités jointes, longueurs critiques et contours.' },
    { title: 'Format', text: 'Choisissez PNG pour une image et SVG pour un vecteur ; passez en CAO professionnelle pour la production.' },
  ],
  checklistHeading: 'Liste de vérification',
  checklist: [
    'La finalité du croquis est écrite.',
    'La même équivalence d’unité est utilisée partout.',
    'Les jonctions importantes ont été contrôlées.',
    'Le format d’export correspond à l’usage.',
    'Le fichier téléchargé a été ouvert et vérifié.',
  ],
};
