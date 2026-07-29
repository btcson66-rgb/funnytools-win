import type { ToolContent } from '../tools/_types';

export const frenchWhatToEat: ToolContent = {
  name: 'Quoi manger ce soir ?',
  short: 'Tirez au sort une idée de repas parmi des catégories et votre propre liste de plats, restaurants ou solutions réalistes.',
  long: 'Ce générateur « quoi manger ce soir » réunit les catégories cochées et les propositions saisies, une entrée par ligne. Il choisit ensuite une position avec crypto.getRandomValues et un échantillonnage par rejet, puis affiche une courte animation. Il sert à départager des repas déjà possibles : il ne compose pas un menu nutritionnel, ne vérifie ni allergène ni ingrédient, et ne connaît pas les horaires ou les stocks des restaurants.',
  seoTitle: 'Quoi manger ce soir ? Idée repas au hasard',
  seoDescription: 'Trouvez quoi manger ce soir parmi vos plats et restaurants. Sélection aléatoire locale, gratuite, sans inscription ni géolocalisation.',
  keywords: [
    'quoi manger ce soir',
    'idée repas ce soir',
    'que manger ce soir',
    'repas au hasard',
    'générateur idée repas',
    'choisir un restaurant au hasard',
    'roulette nourriture',
    'quoi cuisiner ce soir',
  ],
  capabilities: [
    'Combiner six familles d’idées avec des plats, adresses ou solutions ajoutés manuellement.',
    'Lire chaque ligne personnalisée non vide comme une position distincte.',
    'Choisir une position avec Web Crypto et un échantillonnage par rejet.',
    'Fixer le résultat avant l’animation afin que l’affichage ne modifie pas le tirage.',
    'Copier la proposition retenue ou rétablir les catégories de départ.',
  ],
  contentSections: [
    {
      heading: 'Réponse rapide : comment savoir quoi manger ce soir',
      paragraphs: [
        'Commencez par ne garder que les catégories acceptables aujourd’hui, puis ajoutez les choix vraiment disponibles, une entrée par ligne. Vous pouvez écrire « quiche et salade à la maison », « le libanais de la rue Pasteur » ou « finir le gratin d’hier ». Appuyez sur « Choisir le repas » : une position est tirée dans l’ensemble formé par les catégories et votre liste. Pour décider uniquement entre vos propres idées, décochez toutes les catégories.',
        'Le hasard intervient à la fin, une fois les contraintes résolues. Avant le tirage, vérifiez le budget, le temps de préparation, les restes à consommer, l’ouverture du restaurant, les goûts du groupe et les restrictions alimentaires. Si la sortie n’est finalement pas réalisable, supprimez-la puis relancez entre les choix restants selon une règle annoncée d’avance. Copier le résultat partage une suggestion ; cela ne passe aucune commande et ne vaut pas accord collectif.',
      ],
    },
    {
      heading: 'Comment la liste des repas est construite',
      paragraphs: [
        'Chaque catégorie cochée ajoute ses huit idées prédéfinies. Chaque ligne non vide du champ personnel ajoute ensuite une nouvelle position ; les blancs au début et à la fin sont retirés. L’outil ne distingue pas automatiquement un plat d’un restaurant, un dîner sur place d’une livraison, ni une recette d’un reste déjà cuisiné. Donnez donc aux entrées un niveau de précision comparable pour que le résultat soit immédiatement compréhensible.',
        'Les doublons sont conservés. Si « pizza » figure dans une catégorie et dans votre liste, ce texte occupe deux positions et a deux fois plus de chances d’être choisi qu’une option présente une seule fois. Cette pondération peut être volontaire, mais elle arrive souvent par inadvertance. Pour une probabilité identique par alternative, relisez la liste et ne gardez qu’une occurrence de chaque solution. Deux intitulés différents qui désignent le même restaurant restent aussi deux positions.',
      ],
    },
    {
      heading: 'Des catégories adaptées aux idées de repas en français',
      paragraphs: [
        'Les propositions de départ couvrent cuisine maison, plats familiers en France, inspirations méditerranéennes, cuisines du monde, solutions rapides et repas végétariens. Elles servent de déclencheurs d’idées, pas de panorama de toutes les cuisines francophones. Les habitudes, produits et noms de plats diffèrent entre Lille, Marseille, Bruxelles, Genève, Montréal, Dakar ou une commune rurale ; aucun choix n’est supposé disponible partout.',
        'La liste personnelle est donc la partie la plus utile. Ajoutez ce qui se trouve réellement dans le réfrigérateur, les établissements accessibles ce soir et le temps maximal acceptable, par exemple « soupe, tartines et fruit — 15 min » ou « traiteur asiatique — retrait avant 20 h ». N’inscrivez pas une proposition que quelqu’un refuserait systématiquement. Un tirage ne rend pas une liste irréaliste meilleure ; il rend seulement explicite le départage entre ses positions.',
      ],
    },
    {
      heading: 'Une sélection aléatoire avec crypto.getRandomValues',
      paragraphs: [
        'Le sélecteur demande à crypto.getRandomValues un entier non signé fourni par Web Crypto. Avant d’appliquer le modulo par le nombre d’options, il rejette la petite zone excédentaire qui créerait un biais entre les positions. Si cette API manque, aucun repas n’est annoncé et un message demande un navigateur récent ; Math.random n’est pas utilisé discrètement comme solution de repli.',
        'La position gagnante est déterminée avant le premier changement visuel. Les intitulés qui défilent pendant environ 840 millisecondes ne constituent pas d’autres tirages et la vitesse de l’appareil n’influence pas le résultat final. Chaque position a la même probabilité lors d’une exécution, mais les doublons cumulent plusieurs positions. Il n’existe ni graine publique, ni historique signé, ni preuve empêchant une personne de relancer jusqu’à obtenir son choix préféré.',
      ],
      link: {
        prefix: 'La source aléatoire utilisée est documentée dans ',
        label: 'Crypto.getRandomValues sur MDN en français',
        href: 'https://developer.mozilla.org/fr/docs/Web/API/Crypto/getRandomValues',
        suffix: '.',
      },
    },
    {
      heading: 'Équilibre alimentaire : le tirage ne compose pas le dîner',
      paragraphs: [
        'Une idée sélectionnée n’est pas automatiquement un repas complet. L’outil ne connaît ni les portions, ni ce qui a déjà été mangé dans la journée ou la semaine, ni les ingrédients disponibles. Le site public Manger Bouger présente des repères pour composer et varier les repas ; utilisez ces informations séparément si votre objectif porte sur l’équilibre alimentaire. Le générateur peut seulement choisir entre des menus que vous avez déjà examinés.',
        'Pour une semaine entière, planifiez d’abord les courses, les produits à consommer rapidement, la diversité des repas et les soirées où le temps manque. Le hasard peut ensuite décider quel repas interchangeable préparer aujourd’hui. Il ne remplace ni la Fabrique à menus, ni une recette, ni un inventaire du réfrigérateur. Une suggestion comme « curry » ne précise pas sa composition : deux recettes portant le même nom peuvent répondre à des besoins très différents.',
      ],
      link: {
        prefix: 'Pour des repères alimentaires publics, consultez ',
        label: 'la page Manger Bouger consacrée aux repas de la journée',
        href: 'https://www.mangerbouger.fr/manger-mieux/se-faire-plaisir-en-mangeant-equilibre/manger-equilibre-ca-veut-dire-quoi-et-comment-y-arriver/comment-rythmer-sa-journee-autour-de-3-repas',
        suffix: '.',
      },
    },
    {
      heading: 'Allergies, intolérances et prescriptions alimentaires',
      paragraphs: [
        'Aucune catégorie ne garantit l’absence d’un allergène, d’une contamination croisée ou d’un ingrédient incompatible. « Végétarien », « cuisine maison » ou le nom d’un plat ne permettent pas de déduire sa recette exacte. Pour une personne allergique, excluez d’abord toute option non vérifiée et demandez des informations précises à la personne qui cuisine ou à l’établissement. L’Anses souligne l’importance d’une information accessible aux consommateurs, notamment pour les repas pris hors du domicile.',
        'N’utilisez jamais le tirage pour tester un aliment après une réaction, modifier un régime prescrit ou remplacer l’avis d’un professionnel de santé. En cas de diabète, maladie rénale, grossesse, trouble alimentaire ou autre situation médicale, la liste doit être préparée selon les consignes adaptées avant d’ouvrir l’outil. FunnyTools peut départager des repas déjà jugés compatibles ; il ne diagnostique rien et ne confirme pas qu’un produit est sans danger.',
      ],
      link: {
        prefix: 'Le rôle de l’information sur les allergènes est détaillé par ',
        label: 'l’Anses',
        href: 'https://www.anses.fr/fr/content/allergies-alimentaires-ameliorer-linformation-pour-prevenir-les-risques',
        suffix: '.',
      },
    },
    {
      heading: 'Décider à deux, en famille ou entre collègues',
      paragraphs: [
        'Pour éviter que le hasard serve à imposer une préférence, chaque personne peut proposer une ou deux options qu’elle accepterait réellement. Le groupe retire ensuite les choix incompatibles avec le budget, le délai, le déplacement ou les restrictions communes. Le tirage n’intervient qu’entre les propositions restantes. Ainsi, le mécanisme départage un accord possible au lieu de remplacer la discussion qui rend cet accord possible.',
        'Prévoyez aussi la règle de reprise : si le restaurant est complet ou si un ingrédient manque, on retire cette option et on relance une seule fois. Si une personne est nettement déçue par le résultat, sa réaction révèle peut-être une préférence qui n’avait pas été formulée. Il est raisonnable de revenir à la conversation. Un résultat aléatoire est une aide contre l’indécision de faible enjeu, pas une obligation ni un vote majoritaire.',
      ],
    },
    {
      heading: 'Confidentialité, copie et absence de géolocalisation',
      paragraphs: [
        'Les cases cochées, les lignes personnalisées et le résultat sont traités dans cette page. FunnyTools ne reçoit pas la liste pour réaliser le tirage, ne demande pas votre position et ne recherche aucun commerce autour de vous. Après rechargement, les ajouts disparaissent et les catégories initiales reviennent. Il n’existe ni compte, ni historique, ni lien public contenant vos idées de repas.',
        'Le bouton de copie place seulement le texte retenu dans le presse-papiers du dispositif. Selon vos réglages, ce presse-papiers peut être synchronisé ou accessible à d’autres applications. Évitez donc d’écrire une adresse personnelle, un nom lié à une pathologie ou une autre donnée sensible lorsqu’un intitulé neutre suffit. Le traitement local limite l’envoi au site, mais ne protège pas des personnes qui voient l’écran, des captures ou des extensions installées.',
      ],
    },
    {
      heading: 'Ce que ce générateur de repas ne fait pas',
      paragraphs: [
        'La page ne consulte ni carte, ni avis, ni prix, ni horaire, ni carte de restaurant, ni délai de livraison. Elle ne réserve pas de table, ne commande rien, ne calcule pas les calories et ne transforme pas les aliments du placard en recette. Une entrée ajoutée hier peut être fermée aujourd’hui. Vérifiez la disponibilité et le coût auprès de la source actuelle avant de vous déplacer ou de payer.',
        'Le service n’est pas conçu pour un concours, une attribution de budget ou une décision professionnelle nécessitant une trace d’audit. Son domaine est modeste : répondre à « quoi manger ce soir ? » quand plusieurs solutions comparables sont déjà acceptables. Dès que la sortie touche la santé, la sécurité, une dépense importante ou les droits d’une autre personne, remplacez le tirage par des critères vérifiables et une décision humaine.',
      ],
    },
  ],
  instructions: [
    'Écartez d’abord les repas incompatibles avec la santé, les convictions, le budget, le temps ou la disponibilité.',
    'Cochez les familles utiles et ajoutez vos solutions locales, une entrée par ligne.',
    'Supprimez les doublons si chaque alternative doit avoir exactement le même poids.',
    'Appuyez sur « Choisir le repas » puis confirmez que la sortie reste réalisable et acceptée.',
    'Copiez la proposition ou corrigez la liste avant un éventuel nouveau tirage.',
  ],
  examples: [
    'Départager trois plats réalisables avec les produits déjà présents à la maison.',
    'Choisir entre quatre restaurants ouverts et compatibles avec le budget du groupe.',
    'Décider s’il faut cuisiner, réchauffer un reste ou prendre un plat à emporter.',
    'Tirer une proposition familiale après avoir retiré les ingrédients non adaptés.',
  ],
  audience: [
    'Personnes qui ont plusieurs solutions possibles mais peu d’énergie pour trancher.',
    'Couples, familles et groupes qui valident la liste avant le tirage.',
    'Collègues qui cherchent un déjeuner informel sans organiser un long vote.',
    'Utilisateurs souhaitant une décision locale, sans compte ni géolocalisation.',
  ],
  caseStudies: [
    {
      title: 'Dîner avec les produits à terminer',
      description: 'Le foyer inscrit trois repas utilisant les légumes et restes proches de leur date limite. Le tirage décide seulement de l’ordre de consommation.',
    },
    {
      title: 'Déjeuner et allergie connue',
      description: 'Le groupe confirme d’abord trois établissements et plats adaptés auprès des professionnels concernés. Seules ces options vérifiées entrent dans la liste.',
    },
    {
      title: 'Pizza présente deux fois',
      description: 'Une personne repère « pizza » dans la catégorie rapide et dans le champ personnel. Elle retire une occurrence pour conserver le même poids par choix.',
    },
  ],
  notes: [
    'Chaque ligne non vide crée une position ; un doublon augmente le poids du même choix.',
    'Le résultat final est fixé avant l’animation.',
    'Les catégories sont générales et ne dépendent pas de votre localisation.',
    'Aucun ingrédient, allergène, prix, horaire ou stock n’est contrôlé.',
    'La liste et le résultat sont perdus au rechargement.',
  ],
  faq: [
    {
      q: 'Comment trouver quoi manger ce soir ?',
      a: 'Ne gardez que les repas faisables, ajoutez une ligne par option et lancez le tirage. Une position est choisie dans les catégories cochées et votre liste.',
    },
    {
      q: 'Puis-je utiliser uniquement mes plats ou restaurants ?',
      a: 'Oui. Décochez toutes les catégories puis écrivez au moins une proposition dans le champ personnel.',
    },
    {
      q: 'Que se passe-t-il si un repas apparaît deux fois ?',
      a: 'Il occupe deux positions et sa probabilité augmente. Retirez les répétitions pour conserver un poids identique par solution.',
    },
    {
      q: 'L’animation choisit-elle le résultat ?',
      a: 'Non. Le choix est fixé avec Web Crypto avant l’animation ; les intitulés intermédiaires sont seulement visuels.',
    },
    {
      q: 'Le générateur vérifie-t-il les allergies ?',
      a: 'Non. N’ajoutez que des repas déjà vérifiés comme adaptés et confirmez ingrédients et contamination croisée auprès d’une source compétente.',
    },
    {
      q: 'Cherche-t-il des restaurants ouverts près de moi ?',
      a: 'Non. Il ne demande pas la géolocalisation et ne consulte ni cartes, ni horaires, ni disponibilités.',
    },
    {
      q: 'Ma liste de repas est-elle enregistrée ?',
      a: 'Non. Elle reste dans cet onglet pour le tirage et disparaît au rechargement. Seul le texte copié rejoint votre presse-papiers.',
    },
    {
      q: 'Est-ce une roulette de nourriture ?',
      a: 'La sélection est aléatoire et animée, mais il n’y a pas de roue graphique. Chaque catégorie et ligne fournit des positions au tirage.',
    },
  ],
  labels: {
    categories: 'Familles d’idées',
    custom: 'Vos plats, restaurants ou solutions',
    customPlaceholder: 'Quiche et salade à la maison\nLe libanais de la rue Pasteur\nFinir le gratin d’hier',
    decide: 'Choisir le repas',
    copy: 'Copier le résultat',
    reset: 'Réinitialiser',
    result: 'Ce soir, ce sera',
    waiting: 'Cochez une catégorie ou ajoutez une proposition',
    emptyError: 'Cochez au moins une catégorie ou écrivez une proposition.',
    cryptoError: 'Ce navigateur ne fournit pas la source aléatoire requise. Essayez un navigateur récent.',
    copied: 'Résultat copié',
    categoriesJson: JSON.stringify([
      { id: 'maison', label: 'Cuisine maison', items: ['Pâtes aux légumes', 'Quiche et salade', 'Poulet rôti et légumes', 'Soupe et tartines', 'Omelette et salade', 'Gratin de légumes', 'Poisson et riz', 'Poêlée de légumes et pommes de terre'] },
      { id: 'classiques', label: 'Plats familiers', items: ['Croque-monsieur et salade', 'Galette complète', 'Hachis parmentier', 'Blanquette et riz', 'Ratatouille et œufs', 'Salade composée', 'Tarte salée', 'Lentilles et carottes'] },
      { id: 'mediterranee', label: 'Méditerranéen', items: ['Couscous de légumes', 'Shakshuka', 'Salade grecque', 'Houmous et pain pita', 'Ratatouille', 'Falafels et crudités', 'Poisson à la provençale', 'Taboulé et légumes grillés'] },
      { id: 'monde', label: 'Cuisines du monde', items: ['Curry et riz', 'Ramen', 'Tacos', 'Sushi', 'Bibimbap', 'Dahl de lentilles', 'Nouilles sautées', 'Chili sin carne'] },
      { id: 'rapide', label: 'Rapide ou à emporter', items: ['Pizza', 'Burger', 'Kebab', 'Poulet rôti', 'Sandwich', 'Poke bowl', 'Plat du traiteur', 'Crêpes salées'] },
      { id: 'vegetarien', label: 'Végétarien', items: ['Lasagnes de légumes', 'Curry de pois chiches', 'Salade de lentilles', 'Risotto aux champignons', 'Tofu sauté et riz', 'Pâtes au pesto', 'Chili sin carne', 'Galettes de légumes'] },
    ]),
  },
  privacyNote: 'Les catégories, vos lignes et le résultat sont traités dans cet onglet. FunnyTools ne conserve pas la liste et ne demande pas votre localisation.',
  disclaimer: 'Aucun ingrédient, allergène, besoin médical, prix, horaire ou stock n’est vérifié. N’incluez que des options déjà considérées comme adaptées et réalisables.',
};

export const frenchWhatToEatReview = {
  heading: 'Contrôler une idée de repas avant de la retenir',
  intro: 'Un tirage utile commence par une liste réaliste et se termine par une vérification avant de cuisiner, réserver ou payer.',
  panels: [
    { title: 'Compatibilité', text: 'Écartez d’abord allergènes, ingrédients interdits et prescriptions qui rendent un repas inadapté.' },
    { title: 'Réalité', text: 'Contrôlez les produits, le budget, l’horaire, le déplacement et l’accord du groupe.' },
    { title: 'Poids', text: 'Repérez les doublons : chaque occurrence du même texte ajoute une chance.' },
  ],
  checklistHeading: 'Liste de contrôle',
  checklist: [
    'Chaque proposition pourrait réellement être choisie ce soir.',
    'Les idées personnelles occupent une ligne chacune.',
    'Les répétitions sont volontaires ou ont été supprimées.',
    'La sortie sera vérifiée avant une commande, un trajet ou la préparation.',
  ],
};

export const frenchCountdownTimer: ToolContent = {
  name: 'Minuteur en ligne',
  short: 'Lancez un compte à rebours par durée ou jusqu’à une date et une heure futures, avec pause, remise à zéro et signal visuel.',
  long: 'Ce minuteur en ligne propose deux modes. « Durée » décompte jusqu’à 99 heures, 59 minutes et 59 secondes ; « Date et heure » calcule ce qui reste jusqu’à un instant futur interprété dans l’heure locale de l’appareil. Chaque mise à jour repart d’une échéance absolue afin de corriger un intervalle d’affichage retardé. À zéro, la page affiche un signal visuel et tente un bip. Ce n’est pas une alarme système et rien ne survit à la fermeture.',
  seoTitle: 'Minuteur en ligne gratuit | Compte à rebours',
  seoDescription: 'Réglez un minuteur en ligne par durée ou date future. Démarrez, mettez en pause et suivez le compte à rebours dans l’onglet.',
  keywords: [
    'minuteur en ligne',
    'compte à rebours',
    'minuterie en ligne',
    'timer en ligne',
    'minuteur gratuit',
    'compte à rebours avec alarme',
    'minuteur 5 minutes',
    'compte à rebours date et heure',
  ],
  capabilities: [
    'Décompter une durée de 1 seconde à 99 heures, 59 minutes et 59 secondes.',
    'Afficher jours, heures, minutes et secondes jusqu’à une date locale future.',
    'Mettre une durée en pause ou suspendre l’affichage d’une échéance fixe.',
    'Reporter le temps restant dans le titre de l’onglet pendant l’exécution.',
    'Afficher un flash et demander un bref signal sonore lorsque le compteur atteint zéro.',
  ],
  contentSections: [
    {
      heading: 'Réponse rapide : lancer un minuteur en ligne',
      paragraphs: [
        'Pour un intervalle qui commence maintenant, gardez le mode « Durée », saisissez heures, minutes et secondes puis appuyez sur « Démarrer ». Les minutes et secondes vont de 0 à 59 ; les heures de 0 à 99. Pour viser un moment précis du calendrier, ouvrez « Date et heure » et choisissez une valeur future. Pendant le décompte, le titre de l’onglet reprend le temps restant.',
        '« Pause » et « Remettre à zéro » ont des effets différents. En mode durée, la pause conserve le nombre de secondes restant et une reprise continue depuis ce point ; la remise à zéro relit les champs. En mode date et heure, le rendez-vous choisi ne bouge jamais : la pause arrête seulement l’affichage. À la reprise, le compteur se recale sur l’heure réelle et peut arriver immédiatement à zéro si l’échéance est passée.',
      ],
    },
    {
      heading: 'Durée, compte à rebours et échéance fixe',
      paragraphs: [
        'Choisissez une durée pour un exercice de trois minutes, une lecture de dix minutes, une pause de trente secondes ou une présentation d’une heure. La valeur maximale est 99:59:59. L’affichage s’adapte : mm:ss pour les petites durées, h:mm:ss lorsque des heures sont nécessaires. Ce mode mesure un intervalle relatif et permet de ne pas compter la période passée en pause.',
        'Choisissez « Date et heure » pour voir ce qui reste avant une réunion, une ouverture ou une échéance personnelle. Au-delà de 24 heures, l’écran ajoute les jours sous la forme j:hh:mm:ss. Le champ datetime-local n’enregistre aucun fuseau : le navigateur interprète les chiffres selon la zone locale du dispositif. Pour un événement suivi depuis plusieurs pays, annoncez le fuseau séparément et faites confirmer la conversion.',
      ],
      link: {
        prefix: 'Le format sans fuseau du champ est expliqué dans ',
        label: 'la référence datetime-local de MDN en français',
        href: 'https://developer.mozilla.org/fr/docs/Web/HTML/Reference/Elements/input/datetime-local',
        suffix: '.',
      },
    },
    {
      heading: 'Pourquoi le compteur ne retire pas simplement une seconde',
      paragraphs: [
        'Quand une durée démarre, le script calcule une heure de fin avec Date.now(). À chaque passage, il soustrait l’heure présente de cette échéance puis arrondit vers le haut pour l’affichage. Il ne suppose donc pas que setInterval a été appelé exactement quatre fois par seconde. Si un passage arrive tard, le suivant retrouve le nombre de secondes correspondant au temps civil écoulé plutôt que d’accumuler le retard.',
        'En mode date, la différence est recalculée directement depuis le moment choisi. Cette méthode rend l’écran plus cohérent après une courte saturation, mais elle ne certifie pas l’heure. Un changement manuel du système, une synchronisation du dispositif ou une suspension profonde peut influer sur la valeur et surtout sur le moment où le signal est exécuté. Pour mesurer du temps actif sans échéance, le chronomètre monotone répond à une autre tâche.',
      ],
    },
    {
      heading: 'Onglet en arrière-plan, écran verrouillé et mise en veille',
      paragraphs: [
        'Les navigateurs retardent les minuteries JavaScript dans les onglets en arrière-plan afin de réduire l’activité et la consommation d’énergie. Si la page reste chargée, elle recalcule le temps restant quand le code reprend. Le compte affiché peut donc se remettre à jour correctement, alors que le bip ou le flash arrive tard : ces signaux n’existent que lorsque la page a l’occasion de s’exécuter.',
        'Fermer ou recharger l’onglet, quitter le navigateur, redémarrer l’appareil ou laisser le navigateur supprimer la page efface entièrement le minuteur. Aucun service worker, notification système, compte utilisateur ou stockage local ne le restaure. Gardez l’écran actif lorsque le signal compte. Pour un réveil, un médicament, une cuisson sans surveillance ou une obligation importante, programmez en plus l’alarme native du téléphone ou un dispositif adapté.',
      ],
      link: {
        prefix: 'MDN décrit ces politiques dans ',
        label: 'l’API Page Visibility',
        href: 'https://developer.mozilla.org/fr/docs/Web/API/Page_Visibility_API',
        suffix: '.',
      },
    },
    {
      heading: 'Signal sonore : pourquoi le bip reste facultatif',
      paragraphs: [
        'Au clic sur « Démarrer », la page tente d’ouvrir ou de reprendre un contexte audio, car les navigateurs autorisent plus volontiers le son après une interaction. À zéro, elle demande un ton bref de 880 Hz et affiche dans tous les cas « Temps écoulé ! » avec un flash. La composante visuelle est la confirmation principale ; le son complète l’interface mais ne peut pas être garanti.',
        'Le volume peut être coupé, une sortie Bluetooth peut s’être déconnectée, le système peut être en mode silencieux ou l’audio Web peut rester suspendu. La page ne propose ni test sonore, ni choix de mélodie, ni réglage de volume, ni vibration. Faites un essai de quelques secondes sur le même appareil si vous souhaitez entendre le signal, et prévoyez un moyen indépendant dès qu’un retard aurait des conséquences.',
      ],
    },
    {
      heading: 'Mettre en pause, reprendre et remettre à zéro',
      paragraphs: [
        'Dans une durée, la pause mémorise ce qui reste puis arrête les mises à jour. Le temps passé en pause n’est pas consommé. La reprise fabrique une nouvelle échéance à partir de cette valeur. La remise à zéro arrête aussi le compteur, mais elle repart des nombres actuellement écrits dans les champs ; vous pouvez donc modifier 05:00 en 03:30 et obtenir immédiatement le nouvel état prêt.',
        'Dans une échéance fixe, pause signifie uniquement « ne plus actualiser l’écran ». Le moment du calendrier reste inchangé. Reprendre ou remettre à zéro recalcule la différence depuis maintenant, ce qui peut faire sauter plusieurs minutes ou terminer le compte. Cette distinction est volontaire : suspendre une interface ne doit pas déplacer silencieusement une réunion. Si vous voulez reporter l’échéance, modifiez explicitement la date.',
      ],
    },
    {
      heading: 'Usages pratiques et limites de sécurité',
      paragraphs: [
        'Le minuteur convient à une activité de classe projetée, un temps de parole, un bloc de rangement, une séance d’étude, un repos ou une phase de recette surveillée. Dans une cuisine, il ne mesure ni température, ni cuisson, ni présence humaine et ne sait pas si le four fonctionne encore. Conservez les consignes du produit et les contrôles visuels ou matériels requis.',
        'Ne l’utilisez pas comme seule barrière pour un traitement médical, une personne dépendante, une machine, une flamme, une épreuve officielle, un laboratoire ou un transport. Un simple onglet peut être fermé et son signal peut être différé. Les usages critiques demandent une alarme persistante, un matériel prévu pour le risque et, lorsque nécessaire, une supervision humaine ou une redondance.',
      ],
    },
    {
      heading: 'Confidentialité et données conservées',
      paragraphs: [
        'La durée, la date et l’heure sont traitées dans cette page. FunnyTools ne les reçoit pas pour exécuter le décompte. Le titre de l’onglet affiche temporairement la valeur pendant la marche, puis le titre d’origine revient à la pause, à la remise à zéro ou à la fin. Une personne voyant l’écran, le sélecteur d’onglets ou une capture peut toutefois lire cette indication.',
        'Il n’y a ni nom d’événement, ni historique, ni calendrier, ni partage, ni synchronisation. L’horloge locale n’est pas comparée à un serveur de temps. Une capture du compteur ne prouve donc pas qu’un dépôt ou un événement officiel était encore ouvert. Lorsque l’échéance appartient à une plateforme, seules sa date, son fuseau et sa marque de réception font autorité.',
      ],
    },
    {
      heading: 'Fonctions absentes et choix du bon outil',
      paragraphs: [
        'Cette version gère un seul minuteur. Elle n’a pas de préréglage 5, 10 ou 25 minutes, de répétition, d’intervalles, de minuteurs simultanés, de plein écran, de raccourci clavier, de vibration ou de notification système. L’absence de ces fonctions doit être connue avant de commencer une activité : le but est de garder clairement séparés une durée relative et un moment fixe.',
        'Pour mesurer un temps qui s’écoule sans fin définie, utilisez le chronomètre. Pour alterner automatiquement travail et pause, choisissez un minuteur Pomodoro. Pour un signal devant survivre à la fermeture, utilisez l’application Horloge du dispositif. Le mot « timer » est souvent employé dans une recherche, mais une interface de navigateur n’acquiert pas pour autant les garanties d’un réveil système.',
      ],
    },
  ],
  instructions: [
    'Choisissez « Durée » pour un intervalle ou « Date et heure » pour une échéance du calendrier.',
    'Saisissez une valeur valide et démarrez pendant que l’appareil reste actif.',
    'Vérifiez que le temps restant apparaît aussi dans le titre de l’onglet.',
    'Utilisez la pause en sachant qu’elle ne reporte jamais une date cible.',
    'Ajoutez une alarme système si le signal doit persister ou si un retard aurait des conséquences.',
  ],
  examples: [
    'Afficher trois minutes de préparation avant une prise de parole.',
    'Compter dix minutes de lecture ou une courte pause.',
    'Voir ce qui reste avant une réunion dans l’heure locale du dispositif.',
    'Suivre une phase de cuisson non critique sous surveillance continue.',
  ],
  audience: [
    'Élèves, enseignants et intervenants qui veulent un compte à rebours visible.',
    'Personnes organisant un bloc court de travail, de pratique ou de repos.',
    'Équipes souhaitant consulter le temps avant une échéance locale.',
    'Utilisateurs recherchant un minuteur simple sans compte ni installation.',
  ],
  caseStudies: [
    {
      title: 'Exposé limité à cinq minutes',
      description: 'La personne règle 05:00 et garde l’écran visible. Une pause avant le vrai départ conserve la durée au lieu de laisser le compteur s’écouler.',
    },
    {
      title: 'Réunion Paris–Montréal',
      description: 'L’organisateur annonce l’heure et le fuseau. Chaque participant convertit l’échéance puis saisit la date locale de son propre appareil.',
    },
    {
      title: 'Ordinateur mis en veille',
      description: 'Le signal arrive après le réveil du portable. Pour la prochaine échéance importante, l’utilisateur ajoute une alarme sur son téléphone.',
    },
  ],
  notes: [
    'La durée va jusqu’à 99:59:59 ; une échéance peut afficher des jours.',
    'La pause conserve une durée mais ne décale pas une date cible.',
    'Le titre de l’onglet change uniquement pendant l’exécution.',
    'Le bip dépend du volume, de la sortie et des politiques du navigateur.',
    'Fermer ou recharger supprime le minuteur.',
  ],
  faq: [
    {
      q: 'Comment lancer un minuteur en ligne ?',
      a: 'Choisissez durée ou date et heure, saisissez une valeur supérieure à zéro ou future, puis appuyez sur « Démarrer ».',
    },
    {
      q: 'Le compte à rebours continue-t-il si je ferme l’onglet ?',
      a: 'Non. Une fermeture, un rechargement ou la suppression de la page efface la session. Utilisez une alarme système pour la persistance.',
    },
    {
      q: 'Pourquoi le minuteur n’a-t-il pas sonné ?',
      a: 'Le volume, la sortie audio, le navigateur ou la veille peuvent empêcher ou retarder le bip. Le message et le flash sont les signaux principaux.',
    },
    {
      q: 'Une pause reporte-t-elle une date cible ?',
      a: 'Non. Elle arrête seulement l’affichage ; à la reprise, le compteur recalcule le temps jusqu’au même instant.',
    },
    {
      q: 'Quel fuseau horaire est utilisé ?',
      a: 'Le champ de date est interprété selon l’heure locale configurée sur le dispositif et ne contient pas de nom de fuseau.',
    },
    {
      q: 'Le compteur corrige-t-il un onglet ralenti ?',
      a: 'L’affichage repart de l’échéance absolue à la prochaine exécution. Le signal peut néanmoins arriver tard si la page était suspendue.',
    },
    {
      q: 'Puis-je lancer plusieurs minuteurs simultanément ?',
      a: 'Non. Cette version ne gère qu’un compteur et ne fournit ni répétition ni séquence d’intervalles.',
    },
    {
      q: 'Ce minuteur convient-il pour un médicament ou une sécurité critique ?',
      a: 'Pas comme seul avertissement. Employez une alarme persistante et le dispositif ou la supervision adaptés au risque.',
    },
  ],
  labels: {
    durationMode: 'Durée',
    targetMode: 'Date et heure',
    hours: 'Heures',
    minutes: 'Minutes',
    seconds: 'Secondes',
    targetDate: 'Date et heure cibles',
    start: 'Démarrer',
    pause: 'Pause',
    reset: 'Remettre à zéro',
    timeUp: 'Temps écoulé !',
    daysAbbr: 'j',
    hoursAbbr: 'h',
    minsAbbr: 'min',
    secsAbbr: 's',
    durationError: 'Saisissez une durée supérieure à zéro.',
    targetError: 'Choisissez une date et une heure futures.',
    ready: 'Prêt',
    tabTitle: '{time} · Minuteur en ligne',
  },
  privacyNote: 'La durée et la date restent dans cet onglet et ne sont pas conservées après fermeture. Le titre affiche temporairement le temps restant.',
  disclaimer: 'Le signal peut être retardé si l’onglet ou le dispositif est suspendu. Ne l’utilisez pas comme seule alarme pour la santé, la sécurité ou une échéance critique.',
};

export const frenchCountdownTimerReview = {
  heading: 'Vérifier un compte à rebours avant de s’y fier',
  intro: 'Confirmez le mode, l’heure locale et le comportement du dispositif avant de dépendre du signal.',
  panels: [
    { title: 'Mode', text: 'Une durée mesure un intervalle ; une date vise un instant fixe du calendrier.' },
    { title: 'Appareil', text: 'Gardez l’onglet ouvert et empêchez la mise en veille si le signal doit arriver à temps.' },
    { title: 'Secours', text: 'Considérez le bip comme facultatif et ajoutez une alarme persistante pour un enjeu réel.' },
  ],
  checklistHeading: 'Liste de contrôle',
  checklist: [
    'La valeur est une durée valide ou un instant futur.',
    'Le fuseau local correspond à l’interprétation attendue.',
    'Le titre de l’onglet affiche le temps pendant la marche.',
    'Un autre avertissement existe si la fermeture ou la veille aurait des conséquences.',
  ],
};

export const frenchStopwatch: ToolContent = {
  name: 'Chronomètre en ligne',
  short: 'Mesurez le temps écoulé, arrêtez et reprenez la session, enregistrez des tours avec temps partiel et total, puis copiez la liste.',
  long: 'Ce chronomètre en ligne calcule le temps actif avec performance.now(), l’horloge monotone du navigateur. Il affiche heures, minutes, secondes et centièmes, exclut les pauses puis enregistre chaque tour avec son temps partiel et son cumul. requestAnimationFrame rafraîchit l’écran, mais le calcul ne compte pas les images. La session reste dans l’onglet et n’offre aucune précision certifiée pour une compétition, un acte médical, une facturation ou un laboratoire.',
  seoTitle: 'Chronomètre en ligne avec tours et centièmes',
  seoDescription: 'Démarrez un chronomètre en ligne, arrêtez, reprenez et notez des tours. Comparez temps partiel et total puis copiez les résultats.',
  keywords: [
    'chronomètre en ligne',
    'chronomètre avec tours',
    'chrono en ligne',
    'chronomètre gratuit',
    'temps au tour',
    'temps intermédiaire',
    'chronomètre centième',
    'mesurer temps écoulé',
  ],
  capabilities: [
    'Démarrer, arrêter et reprendre une même mesure de temps actif.',
    'Afficher heures, minutes, secondes et deux chiffres de centièmes.',
    'Créer des tours avec temps partiel depuis la marque précédente et total cumulé.',
    'Présenter la marque la plus récente en tête de la liste.',
    'Copier les tours dans l’ordre chronologique vers le presse-papiers.',
  ],
  contentSections: [
    {
      heading: 'Réponse rapide : utiliser le chronomètre en ligne',
      paragraphs: [
        'Appuyez sur « Démarrer » au début de l’activité. Le bouton devient « Arrêter » ; un nouvel appui gèle la valeur sans compter la pause suivante. Appuyez encore pour reprendre depuis le total accumulé. « Tour » inscrit une marque sans interrompre le chrono : la ligne contient le temps partiel depuis le tour précédent et le temps total depuis le premier démarrage.',
        '« Réinitialiser » efface le compteur et tous les tours. « Copier les tours » prépare une ligne par marque, de la première à la dernière, alors que l’écran place la plus récente en haut. Copiez avant de fermer ou recharger : aucune session n’est enregistrée. Si vous connaissez au contraire la durée à respecter et voulez atteindre zéro, ouvrez le minuteur en ligne.',
      ],
    },
    {
      heading: 'Temps au tour, temps partiel et temps total',
      paragraphs: [
        'Le temps partiel, parfois appelé split ou temps au tour, correspond à l’intervalle depuis la dernière marque. Le total est le temps actif cumulé depuis le départ. Si le premier tour arrive à 00:40 puis le second à 01:15, le deuxième partiel vaut environ 00:35 et son total 01:15. Une seule ligne répond donc à deux questions différentes ; conservez les libellés lorsque vous partagez les valeurs.',
        'Pour le premier tour, partiel et total sont identiques puisqu’aucune marque antérieure n’existe. Ensuite, le script soustrait le total du tour précédent. Arrêter puis reprendre n’enregistre pas automatiquement un tour et ne clôt pas le partiel en cours. Si vous voulez terminer une phase précisément avant une pause, appuyez d’abord sur « Tour », puis sur « Arrêter ».',
      ],
    },
    {
      heading: 'Ce que mesure performance.now()',
      paragraphs: [
        'performance.now() fournit une marque de temps monotone liée au contexte de la page. Elle avance à un rythme régulier sans suivre les corrections manuelles de l’horloge civile ou la synchronisation NTP. Au démarrage, le chronomètre mémorise cette marque ; à l’arrêt, il ajoute la différence au temps accumulé. Une reprise commence une nouvelle différence sans inclure la période où le chrono était arrêté.',
        'L’écran tronque les millisecondes pour montrer des centièmes, mais deux décimales visibles ne prouvent pas une exactitude de 0,01 seconde. MDN précise aussi que les navigateurs peuvent réduire la précision pour des raisons de sécurité. Le dispositif, la charge, l’événement tactile et le temps de réaction de la personne ajoutent d’autres incertitudes. Le format est pratique pour l’observation ; il ne constitue pas un certificat métrologique.',
      ],
      link: {
        prefix: 'Le fonctionnement et la précision réduite sont documentés dans ',
        label: 'performance.now() sur MDN en français',
        href: 'https://developer.mozilla.org/fr/docs/Web/API/Performance/now',
        suffix: '.',
      },
    },
    {
      heading: 'Affichage, requestAnimationFrame et arrière-plan',
      paragraphs: [
        'La valeur visuelle est rafraîchie avec requestAnimationFrame, généralement synchronisé avec l’affichage. Le temps n’est pas calculé en comptant les images : chaque rendu relit l’écart depuis performance.now(). Si l’onglet reste vivant mais que le navigateur suspend le dessin en arrière-plan, la valeur se recale au retour au lieu de perdre toutes les secondes non affichées.',
        'Une fermeture, un rechargement, une suppression d’onglet ou un redémarrage efface cependant la mesure. Les navigateurs et systèmes peuvent aussi traiter différemment une veille profonde. Pour une observation où toute interruption invalide l’essai, laissez la page visible, empêchez la veille et utilisez un instrument autonome avec stockage. Un rétablissement correct à l’écran ne crée pas une preuve de continuité.',
      ],
      link: {
        prefix: 'La suspension fréquente de requestAnimationFrame en arrière-plan est décrite dans ',
        label: 'l’API Page Visibility de MDN',
        href: 'https://developer.mozilla.org/fr/docs/Web/API/Page_Visibility_API',
        suffix: '.',
      },
    },
    {
      heading: 'Arrêter sans compter la pause',
      paragraphs: [
        'Au clic sur « Arrêter », le chronomètre ajoute la dernière période active au cumul puis cesse d’avancer. Le repos qui suit n’entre ni dans le total ni dans le prochain partiel. La reprise garde le cumul et ouvre une nouvelle période active. Ce comportement convient à l’estimation d’un travail effectif ou à un circuit dont les récupérations doivent être exclues.',
        'Pour mesurer toute la durée réelle, pauses comprises, ne stoppez pas le chrono. Enregistrez plutôt un tour au début et à la fin de chaque phase ou notez les repos séparément. La page ne tient pas deux horloges, ne calcule pas temps net et temps brut en parallèle et ne crée pas d’intervalles automatiques. La règle de mesure doit être définie avant la session, pas déduite après.',
      ],
    },
    {
      heading: 'Lire, copier et conserver les tours',
      paragraphs: [
        'La liste à l’écran ajoute chaque nouveau tour en première position pour rendre le dernier partiel visible immédiatement. Le numéro permet néanmoins de retrouver l’ordre. Lors de la copie, les lignes suivent l’ordre chronologique : Tour 1, Tour 2, puis les suivants. Chacune indique « Partiel » et « Total » afin qu’un collage dans une note ou un message reste compréhensible.',
        'Il n’existe ni fichier CSV, ni moyenne, ni meilleure ou moins bonne marque, ni graphique, ni commentaire attaché à un tour. Le presse-papiers dépend de la permission du navigateur ; en cas d’échec, un dialogue manuel peut présenter le texte. Ajoutez vous-même la date, l’activité, l’unité et les conditions si les résultats doivent être comparés plus tard. FunnyTools n’en conserve aucune copie.',
      ],
    },
    {
      heading: 'Étude, sport loisir, travail et temps de parole',
      paragraphs: [
        'Le chrono peut mesurer les parties d’un exposé, les étapes d’un rangement, un exercice scolaire, une répétition musicale ou les tours d’une activité sportive non officielle. Les marques permettent d’identifier quelle phase a pris plus de temps lors de la même session. Placez l’appareil de façon à ne pas détourner l’attention ni exiger une manipulation dangereuse pendant un mouvement.',
        'Dans un cadre professionnel, quelques observations peuvent améliorer une estimation de processus. Elles ne suffisent pas à définir un tarif, retrancher du temps de travail ou évaluer une personne. Les interruptions nécessaires, la période mesurée et le statut des pauses doivent être convenus. Un chronomètre manuel observe un intervalle ; il ne connaît ni le contexte ni la qualité du travail effectué.',
      ],
    },
    {
      heading: 'Quand un matériel ou une procédure certifiés sont nécessaires',
      paragraphs: [
        'Une compétition officielle, une mesure médicale, une expérience scientifique, un contrôle industriel ou une preuve juridique peut exiger étalonnage, redondance, traçabilité, identification de l’opérateur et incertitude documentée. Cette page n’offre ni certificat, ni synchronisation externe, ni scellé, ni stockage inviolable. Le fait d’afficher des centièmes ne répond à aucune de ces exigences.',
        'Employez le matériel et la procédure reconnus par l’organisateur ou l’autorité responsable. Le temps de réaction au bouton et la latence d’entrée appartiennent à la chaîne de mesure autant que l’horloge interne. FunnyTools ne peut pas valider cette chaîne. Pour une activité informelle, annoncez au moins qu’il s’agit d’un chronométrage manuel dans un navigateur et évitez de présenter la sortie comme une marque homologuée.',
      ],
    },
    {
      heading: 'Confidentialité et fonctions non disponibles',
      paragraphs: [
        'Le temps et les tours sont calculés dans cette page. FunnyTools ne reçoit pas la session pour faire fonctionner le chrono. La copie envoie le texte vers le presse-papiers du dispositif, qui peut être synchronisé selon vos réglages. Aucun nom n’est saisi dans l’outil ; si vous associez ensuite les valeurs à une personne, cette identification se fait dans votre propre document.',
        'La version actuelle n’a ni compte, ni sauvegarde, ni lien partagé, ni raccourci clavier, ni plein écran, ni son, ni compte à rebours, ni chronomètres multiples, ni classement automatique. Elle se limite au démarrage, à l’arrêt, à la reprise, aux tours, aux partiels, aux totaux et à la copie. Ces limites évitent de faire croire qu’une fonction absente a produit ou protégé des données.',
      ],
    },
  ],
  instructions: [
    'Appuyez sur « Démarrer » au moment correspondant au début de l’observation.',
    'Utilisez « Tour » pour enregistrer un partiel sans interrompre le total.',
    'Arrêtez pour exclure une pause, puis reprenez depuis le cumul.',
    'Distinguez partiel et total lorsque vous lisez ou partagez une ligne.',
    'Copiez les tours avant toute réinitialisation, fermeture ou actualisation.',
  ],
  examples: [
    'Mesurer introduction, développement et conclusion d’un exposé.',
    'Relever des tours lors d’une activité sportive récréative.',
    'Estimer la durée active de chaque étape d’une tâche répétitive.',
    'Chronométrer plusieurs prises de parole et copier les marques dans une note.',
  ],
  audience: [
    'Élèves et intervenants qui répètent une activité en plusieurs parties.',
    'Enseignants et animateurs ayant besoin de marques rapides pendant une séance.',
    'Personnes observant un exercice sportif non officiel.',
    'Équipes effectuant une estimation informelle de temps actif.',
  ],
  caseStudies: [
    {
      title: 'Répétition d’un oral',
      description: 'L’élève marque un tour après l’introduction, chaque partie et la conclusion. Les partiels guident la redistribution du contenu ; le total vérifie la durée globale.',
    },
    {
      title: 'Circuit avec repos exclus',
      description: 'La personne arrête le chrono pendant chaque récupération puis reprend. Elle sait que le total représente le temps actif et non la durée complète de la séance.',
    },
    {
      title: 'Marques à conserver',
      description: 'Avant la réinitialisation, l’animateur copie les six tours puis ajoute la date et le nom de l’exercice dans son document.',
    },
  ],
  notes: [
    'Le format hh:mm:ss.cc affiche des centièmes sans les certifier.',
    'Une pause est exclue du total et du partiel en cours.',
    'La liste visuelle place le tour le plus récent en premier.',
    'La copie restitue les tours dans l’ordre chronologique.',
    'Il n’y a ni persistance, ni CSV, ni statistiques, ni homologation.',
  ],
  faq: [
    {
      q: 'Comment fonctionne ce chronomètre en ligne ?',
      a: 'Il calcule le temps actif avec performance.now(). Arrêter exclut la pause et reprendre continue depuis le cumul.',
    },
    {
      q: 'Quelle différence entre temps partiel et temps total ?',
      a: 'Le partiel va du tour précédent au tour actuel ; le total va du premier démarrage au tour, sans les pauses.',
    },
    {
      q: 'Les centièmes affichés sont-ils exacts ?',
      a: 'Ils décrivent le format, pas une exactitude garantie de 0,01 seconde. Le navigateur, l’appareil et la réaction humaine ajoutent de l’incertitude.',
    },
    {
      q: 'Le chronomètre continue-t-il en arrière-plan ?',
      a: 'Si la page reste active, la valeur est recalculée au retour. Une fermeture, un rechargement ou la suppression de l’onglet efface la session.',
    },
    {
      q: 'Que devient un tour après une pause ?',
      a: 'La pause n’est pas ajoutée. Le prochain tour poursuit le partiel actif commencé avant l’arrêt.',
    },
    {
      q: 'Dans quel ordre les tours sont-ils copiés ?',
      a: 'Du tour 1 au dernier. À l’écran, l’ordre visuel est inversé afin de montrer la marque la plus récente en haut.',
    },
    {
      q: 'Puis-je télécharger un CSV ou voir le meilleur tour ?',
      a: 'Non. Cette version copie du texte et ne calcule ni moyenne, ni meilleur tour, ni graphique.',
    },
    {
      q: 'Puis-je l’utiliser pour une compétition officielle ?',
      a: 'Pas comme instrument homologué. Suivez l’équipement et la procédure acceptés par l’organisation responsable.',
    },
  ],
  labels: {
    start: 'Démarrer',
    stop: 'Arrêter',
    lap: 'Tour',
    reset: 'Réinitialiser',
    copyLaps: 'Copier les tours',
    laps: 'Tours enregistrés',
    noLaps: 'Aucun tour pour le moment',
    lapNumber: 'Tour',
    split: 'Partiel',
    total: 'Total',
    copied: 'Tours copiés',
  },
  privacyNote: 'Le temps et les tours sont calculés dans cet onglet. FunnyTools ne conserve pas la session ; la copie utilise le presse-papiers du dispositif.',
  disclaimer: 'Les centièmes sont un format d’affichage, pas une certification. N’utilisez pas ce chrono comme mesure officielle en compétition, santé, laboratoire, facturation ou preuve juridique.',
};

export const frenchStopwatchReview = {
  heading: 'Interpréter correctement une session de chronomètre',
  intro: 'La lecture utile distingue temps actif, partiels, cumul et incertitudes d’un chronométrage manuel dans le navigateur.',
  panels: [
    { title: 'Partiel', text: 'Il mesure le segment depuis le tour précédent et exclut toute période passée à l’arrêt.' },
    { title: 'Total', text: 'Il cumule le temps actif depuis le premier démarrage jusqu’à chaque marque.' },
    { title: 'Précision', text: 'Deux chiffres après la seconde ne constituent pas une certification au centième.' },
  ],
  checklistHeading: 'Liste de contrôle',
  checklist: [
    'Le démarrage et chaque tour correspondent bien aux événements observés.',
    'Les pauses ont été exclues volontairement.',
    'Partiel et total restent étiquetés dans la copie.',
    'Les résultats sont enregistrés ailleurs s’ils doivent être conservés.',
  ],
};
