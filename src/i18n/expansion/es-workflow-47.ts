import type { SpanishInfoPage } from './es-pages';

export const spanishDailyDecisionWorkflow: SpanishInfoPage = {
  title: 'Cómo decidir entre varias opciones sin alargar la discusión',
  seoTitle: 'Cómo decidir: ruleta, sorteo y dos opciones',
  seoDescription: 'Proceso para decisiones cotidianas de bajo riesgo: filtrar opciones, elegir con ruleta, sorteo, dado o dos alternativas y comprobar el resultado.',
  keywords: [
    'cómo tomar una decisión',
    'ruleta para decidir',
    'decidir entre dos opciones',
    'qué comer hoy',
    'sorteo de nombres online',
    'tirar dado online',
  ],
  eyebrow: 'Decisiones cotidianas · azar transparente · límites claros',
  intro: 'Cuando todas las opciones son aceptables, seguir discutiendo puede costar más que la diferencia entre ellas. Una ruleta, un sorteo, una moneda virtual o un dado ayudan a cerrar decisiones cotidianas: dónde comer, quién empieza, qué actividad hacer o en qué orden avanzar. La herramienta no decide qué es seguro, justo o posible; primero se filtra la lista y solo después se aplica una regla aleatoria que todas las personas conocen.',
  directAnswer: [
    'Para tomar una decisión cotidiana, escribe el resultado que necesitas y elimina antes las opciones imposibles, inseguras, fuera de presupuesto o inaceptables para alguien. Si quedan dos alternativas equivalentes, usa un selector 50/50; si quedan varias, utiliza una ruleta o un sorteo. Define antes si se puede repetir, cuántas veces se elige y qué ocurre si el resultado ya no está disponible.',
    'No uses el azar para decisiones médicas, legales, financieras, laborales, educativas de alto impacto ni para asignar riesgos a personas. Tampoco conviertas una votación o un criterio profesional en sorteo. En esos casos, reúne información, compara consecuencias y pide la revisión adecuada. La aleatoriedad sirve cuando la lista ya es válida y la diferencia tiene poco impacto.',
  ],
  sections: [
    {
      heading: 'Primero decidir si el azar es apropiado',
      paragraphs: [
        'El azar funciona bien cuando las alternativas tienen consecuencias pequeñas, reversibles y conocidas. Elegir una película, repartir el primer turno o variar una actividad son ejemplos razonables. La pregunta previa no es «¿qué botón uso?», sino «¿aceptaríamos de verdad cualquiera de los resultados?». Si la respuesta es no, la lista todavía no está preparada.',
        'Excluye salud, seguridad, contratos, dinero importante, calificaciones, contratación, disciplina y cualquier decisión que requiera consentimiento o responsabilidad profesional. Una herramienta aleatoria no conoce antecedentes, desigualdades ni obligaciones. Si el resultado puede perjudicar a alguien, utiliza criterios explícitos y una persona responsable.',
      ],
    },
    {
      heading: 'Definir el resultado antes de abrir la herramienta',
      paragraphs: [
        'Escribe una frase operativa: «elegir un restaurante abierto para cuatro personas», «ordenar cinco presentaciones» o «seleccionar una actividad de diez minutos». La frase fija el alcance y evita mezclar decisiones diferentes. Elegir dónde comer no resuelve quién reserva, cuánto gastar o cómo desplazarse.',
        'Indica quién participa, cuándo debe ejecutarse y qué condición invalida el resultado. Si la elección solo sirve para hoy, no reutilices una lista antigua. Si una persona no puede aceptar cierta opción, elimínala antes del sorteo; no esperes a que salga para discutir de nuevo.',
      ],
    },
    {
      heading: 'Crear una lista válida y sin duplicados accidentales',
      paragraphs: [
        'Una opción por línea es la forma más fácil de revisar. Corrige espacios, variantes de nombre y duplicados. «Pizza», «pizzería» y el nombre de un local pueden representar la misma alternativa; decide si deben compartir o multiplicar probabilidad. Un duplicado da más oportunidades de salir, aunque no sea visible en una rueda pequeña.',
        'No incluyas una opción para quedar bien si nadie la ejecutará. Comprueba horario, distancia, disponibilidad, presupuesto, alergias y accesibilidad cuando correspondan. En un sorteo de personas, usa el mínimo dato necesario: nombre corto, inicial o código acordado.',
      ],
    },
    {
      heading: 'Elegir entre dos opciones con una regla 50/50',
      paragraphs: [
        'Cuando solo quedan dos alternativas equivalentes, un selector «esto o aquello» evita construir una rueda innecesaria. Escribe ambas opciones de forma concreta y confirma que no contienen condiciones ocultas. «Salir» frente a «quedarse» es demasiado amplio si cada persona imagina un plan distinto.',
        'El resultado es una propuesta de cierre, no una orden. Si al verlo alguien siente una preferencia fuerte por la alternativa contraria, esa reacción aporta información. Pueden aceptar la preferencia, repetir con una regla acordada o volver a criterios; lo importante es no repetir hasta obtener en secreto el resultado deseado.',
      ],
      link: {
        prefix: 'Cuando las dos opciones ya son aceptables, utiliza ',
        label: 'decidir entre dos opciones',
        href: '/es/herramientas/decidir-entre-dos-opciones/',
        suffix: ' y conserva una sola tirada salvo que la regla diga otra cosa.',
      },
    },
    {
      heading: 'Usar una ruleta para tres o más alternativas',
      paragraphs: [
        'La ruleta es útil porque muestra todas las entradas y permite que el grupo vea la selección. Revisa la lista en pantalla antes de girar y explica si cada segmento tiene la misma probabilidad. Si una opción aparece dos veces, decláralo como ponderación deliberada o elimínala.',
        'Define cuántos resultados necesitas y si una opción ganadora se retira. Para ordenar actividades sin repetición, conviene extraer una, quitarla y continuar. Para elegir una sola propuesta, un giro basta. Repetir hasta que salga una favorita convierte la visualización en teatro y rompe la confianza.',
      ],
      link: {
        prefix: 'Para una lista visible de alternativas equivalentes, abre la ',
        label: 'ruleta aleatoria',
        href: '/es/herramientas/ruleta-aleatoria/',
        suffix: ' y revisa las entradas antes de girar.',
      },
    },
    {
      heading: 'Resolver qué comer hoy sin ignorar restricciones',
      paragraphs: [
        'La pregunta «¿qué comer?» suele esconder filtros: tiempo disponible, presupuesto, distancia, dieta, alergias, horario y ganas reales. Construye primero candidatos que cumplen esas condiciones. El generador puede romper el empate, pero no comprueba ingredientes, contaminación cruzada ni información actual del establecimiento.',
        'Si el resultado no está abierto o no puede atender una necesidad, aplica la regla de sustitución que acordaste: quitarlo y volver a elegir, pasar a la siguiente opción o usar una lista de reserva. No presentes una elección aleatoria como recomendación nutricional ni como garantía de seguridad alimentaria.',
      ],
      link: {
        prefix: 'Después de filtrar opciones viables, prueba ',
        label: 'qué comer hoy',
        href: '/es/herramientas/que-comer-hoy/',
        suffix: ' como desempate de bajo riesgo.',
      },
    },
    {
      heading: 'Sortear nombres, turnos o roles con una lista comprobable',
      paragraphs: [
        'Antes del sorteo confirma quién está presente, cómo se escriben los nombres y si alguien ya participó. Explica si la selección es con reemplazo, sin repetición o solo para ordenar. Una lista visible permite detectar omisiones y duplicados antes de que afecten al resultado.',
        'Minimiza datos personales y no proyectes identificadores innecesarios. En actividades sensibles, usa códigos y conserva la correspondencia fuera de la pantalla. Un sorteo no garantiza equidad acumulada: si importa repartir oportunidades a lo largo del tiempo, registra selecciones y aplica una regla de rotación.',
      ],
      link: {
        prefix: 'Para elegir una entrada de una lista revisada, usa el ',
        label: 'sorteo de nombres',
        href: '/es/herramientas/sorteo-nombres-aleatorio/',
        suffix: ' y aclara de antemano cómo se gestionan repeticiones.',
      },
    },
    {
      heading: 'Usar dados cuando la regla necesita resultados discretos',
      paragraphs: [
        'Un dado sirve para juegos, turnos, movimientos o tablas de eventos. Elige el número de caras y la cantidad de dados antes de lanzar. Escribe cómo se suman, qué ocurre con empates y si algún resultado obliga a repetir. Cambiar la regla después de ver la tirada altera el procedimiento.',
        'No confundas una animación atractiva con una prueba de imparcialidad para dinero o premios regulados. La herramienta está pensada para usos cotidianos y recreativos. Concursos, apuestas, promociones y sorteos oficiales pueden tener requisitos de auditoría, bases, edad, jurisdicción y conservación que exigen otro sistema.',
      ],
      link: {
        prefix: 'Para una mecánica recreativa ya definida, puedes ',
        label: 'tirar dados online',
        href: '/es/herramientas/tirar-dados-online/',
        suffix: ' después de explicar caras, cantidad y resultado válido.',
      },
    },
    {
      heading: 'Añadir un límite de tiempo sin forzar el consentimiento',
      paragraphs: [
        'Un temporizador puede impedir que una discusión sencilla se alargue. Reserva primero un periodo corto para presentar opciones y restricciones; inicia después la cuenta atrás para cerrar. El tiempo ayuda a enfocar, pero no convierte una propuesta incompleta en aceptable.',
        'Haz visible la duración y avisa antes del final. Detén la cuenta si aparece nueva información importante o alguien necesita una adaptación. Para citas críticas, medicación, seguridad o recordatorios del sistema, utiliza una alarma diseñada para funcionar aunque la pestaña se cierre o el dispositivo suspenda actividad.',
      ],
      link: {
        prefix: 'Para rondas de conversación o juego, configura un ',
        label: 'temporizador online',
        href: '/es/herramientas/temporizador-online/',
        suffix: ' y mantén una alternativa si el navegador queda en segundo plano.',
      },
    },
    {
      heading: 'Acordar la regla de repetición antes del resultado',
      paragraphs: [
        'Las discusiones suelen volver cuando el resultado no gusta. Evítalo con una regla escrita: una sola selección; repetir únicamente si la opción no está disponible; o mejor de tres para un juego concreto. La causa de repetición debe ser observable y aplicarse igual a cualquier alternativa.',
        'Si el grupo quiere poder rechazar, indícalo antes: por ejemplo, cada persona dispone de un veto justificado y después la opción se elimina. Un veto posterior ilimitado hace que el azar no aporte nada. Si aparecen muchos rechazos, abandona la herramienta y vuelve a identificar necesidades.',
      ],
    },
    {
      heading: 'Comprobar que el resultado sigue siendo viable',
      paragraphs: [
        'Tras la selección, verifica disponibilidad, hora, coste, dirección, responsable y siguiente acción. Para una actividad, confirma materiales y duración; para un restaurante, reserva y restricciones; para un turno, comunica el orden. La herramienta termina al elegir, pero la decisión solo termina cuando alguien puede ejecutarla.',
        'Si la verificación falla, conserva el motivo y aplica la regla acordada. No culpes al azar por una lista sin revisar. La mejora más útil para la próxima vez suele ser un filtro nuevo, no más giros.',
      ],
    },
    {
      heading: 'Registrar solo lo necesario y borrar listas sensibles',
      paragraphs: [
        'En una reunión informal basta con anotar el resultado. Si el orden debe auditarse, guarda fecha, lista válida, regla y selección sin añadir datos personales innecesarios. Una captura puede mostrar pestañas, notificaciones o nombres; revisa antes de compartirla.',
        'Las herramientas de FunnyTools se ejecutan en el navegador, pero el dispositivo, las extensiones y cualquier captura siguen bajo tu control. Cierra listas que ya no necesitas y evita copiar información sensible en una rueda o selector cuando un código cumple la misma función.',
      ],
    },
    {
      heading: 'Lista de control para una decisión cotidiana transparente',
      paragraphs: [
        'Confirma que la decisión es pequeña, reversible y apropiada para el azar. Define el resultado, elimina alternativas inválidas, corrige duplicados y elige la herramienta según el número y tipo de opciones. Explica probabilidad, repetición, retirada y veto antes de ejecutar.',
        'Después, comprueba viabilidad y asigna la siguiente acción. Si el grupo cuestiona la lista o la regla, resuelve eso antes de girar. Una decisión transparente no depende de que todas las personas prefieran el resultado, sino de que acepten el procedimiento y cualquiera de sus salidas.',
      ],
      items: [
        'Consecuencia baja y reversible.',
        'Todas las opciones son aceptables y posibles.',
        'Duplicados y restricciones revisados.',
        'Herramienta y probabilidad explicadas.',
        'Regla de repetición acordada.',
        'Resultado verificado y siguiente acción asignada.',
      ],
    },
  ],
  faq: [
    { q: '¿Cómo tomar una decisión cuando hay demasiadas opciones?', a: 'Filtra primero por restricciones reales, agrupa alternativas equivalentes y deja en la lista solo opciones aceptables. Después usa una ruleta o un sorteo para romper el empate.' },
    { q: '¿Una ruleta online es realmente aleatoria?', a: 'Puede ofrecer una selección impredecible para usos cotidianos, pero no debe asumirse como sistema auditado para apuestas, promociones reguladas o decisiones de alto impacto.' },
    { q: '¿Puedo repetir si no me gusta el resultado?', a: 'Solo si la regla de repetición se acordó antes y se aplica igual a todas las opciones. Repetir hasta obtener una favorita elimina la transparencia.' },
    { q: '¿Cómo evito que un nombre salga dos veces?', a: 'Usa un modo sin reemplazo cuando esté disponible o retira manualmente cada selección. Comprueba el estado si recargas la página o cambia la lista.' },
    { q: '¿Qué herramienta uso para dos opciones?', a: 'Un selector 50/50 es suficiente cuando ambas alternativas son equivalentes. Si una tiene más peso, usa criterios o una ponderación explícita, no un 50/50 engañoso.' },
    { q: '¿La herramienta “qué comer” considera alergias?', a: 'No. Debes filtrar restaurantes y platos según alergias, dieta, presupuesto y disponibilidad, y confirmar la información con el establecimiento.' },
    { q: '¿Puedo usar el sorteo para repartir tareas?', a: 'Sí para tareas equivalentes y de bajo riesgo si todas las personas aceptan la regla. Para cargas desiguales, experiencia o seguridad, asigna con criterios y rotación.' },
    { q: '¿Cuándo no debo usar estas herramientas?', a: 'No las uses para salud, seguridad, finanzas importantes, asuntos legales, contratación, disciplina, evaluación o cualquier decisión que requiera evidencia, consentimiento o responsabilidad profesional.' },
  ],
  review: {
    heading: 'Control de calidad de una decisión por azar',
    intro: 'La selección solo es válida cuando la lista, la regla y la ejecución se pueden explicar antes y después del resultado.',
    checks: [
      { title: 'Lista válida', text: 'Todas las opciones son posibles, aceptables, sin duplicados accidentales y adecuadas para quienes participan.' },
      { title: 'Regla previa', text: 'Probabilidad, repetición, retirada, veto y número de selecciones se acuerdan antes de ver el resultado.' },
      { title: 'Cierre real', text: 'El resultado se verifica, se asigna una siguiente acción y no se presenta como criterio experto.' },
    ],
  },
  sources: [
    { label: 'MDN: Crypto.getRandomValues()', href: 'https://developer.mozilla.org/es/docs/Web/API/Crypto/getRandomValues', note: 'Referencia del navegador para obtener valores aleatorios criptográficamente fuertes; no convierte una herramienta recreativa en sorteo regulado.' },
    { label: 'AEPD: minimización de datos', href: 'https://www.aepd.es/preguntas-frecuentes/2-rgpd/1-principios-relativos-al-tratamiento/FAQ-0204-en-que-consiste-el-principio-de-minimizacion-de-datos', note: 'Principio de usar datos adecuados, pertinentes y limitados a lo necesario.' },
    { label: 'AESAN: alergias e intolerancias alimentarias', href: 'https://www.aesan.gob.es/AECOSAN/web/para_el_consumidor/ampliacion/alergias.htm', note: 'Información oficial para consumidores; una elección aleatoria no sustituye la verificación de alérgenos.' },
    { label: 'W3C WAI: animaciones y movimiento', href: 'https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html', note: 'Criterios para pausar, detener u ocultar contenido en movimiento cuando corresponde.' },
  ],
};
