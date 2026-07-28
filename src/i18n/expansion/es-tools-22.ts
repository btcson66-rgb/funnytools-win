import type { ToolContent } from '../tools/_types';

export const spanishPomodoroTimer: ToolContent = {
  name: 'Temporizador Pomodoro online',
  short: 'Organiza una tarea en intervalos de concentración y descansos sin instalar una aplicación.',
  long: 'Este temporizador Pomodoro online permite ajustar el intervalo de concentración, la pausa corta y la pausa larga. Cuenta los bloques terminados, alterna automáticamente entre trabajo y descanso y corrige el tiempo con una hora final real, de modo que una pestaña en segundo plano no acumule el retraso típico de los temporizadores del navegador. Los ajustes quedan en este dispositivo; el historial de sesiones no se envía ni se conserva como una cuenta.',
  seoTitle: 'Temporizador Pomodoro online | Enfoque y pausas',
  seoDescription: 'Temporizador Pomodoro online gratis y sin registro: configura concentración, pausa corta y larga, completa ciclos y mantén el tiempo aunque cambies de pestaña.',
  keywords: [
    'temporizador Pomodoro online',
    'Pomodoro timer',
    'temporizador de estudio',
    'temporizador de concentración',
    'técnica Pomodoro',
    'reloj 25 minutos',
    'intervalos de trabajo y descanso',
  ],
  capabilities: [
    'Configurar entre 1 y 180 minutos para concentración, pausa corta y pausa larga.',
    'Alternar automáticamente: después de cada bloque llega una pausa y cada cuatro bloques aparece la pausa larga.',
    'Pausar sin perder el tiempo restante y reiniciar el ciclo cuando cambie la tarea.',
    'Ver la cuenta atrás en la pestaña mientras está en marcha.',
    'Guardar únicamente las duraciones preferidas en el almacenamiento local del navegador.',
  ],
  contentSections: [
    {
      heading: 'Qué es un temporizador Pomodoro y qué problema resuelve',
      paragraphs: [
        'Un temporizador Pomodoro convierte una intención vaga —«estudiar», «escribir el informe», «ordenar el correo»— en un bloque con principio y final. El valor no está en mirar un reloj, sino en decidir una única salida concreta antes de iniciarlo: resolver cinco ejercicios, revisar dos páginas, redactar una sección o clasificar veinte registros. La cuenta atrás reduce la negociación constante sobre cuánto falta y la pausa crea un momento explícito para cambiar de postura, beber agua o preparar el siguiente paso.',
        'El ciclo popular de 25 minutos de concentración y 5 de pausa es un punto de partida, no una obligación. Una lectura técnica puede necesitar 40 minutos; una tarea administrativa breve quizá funcione mejor con 15. La pausa larga se programa después de cuatro bloques terminados para separar conjuntos de trabajo. Ajusta la duración por la naturaleza de la tarea y por las interrupciones reales, no para conseguir un número de sesiones artificialmente alto.',
      ],
      items: [
        'Define un resultado observable antes de pulsar Iniciar.',
        'Deja fuera del bloque mensajes y tareas que no pertenecen al objetivo.',
        'Anota una interrupción sin atenderla de inmediato cuando sea posible.',
        'Usa la pausa para descansar del mismo estímulo, no para abrir otra pantalla intensa.',
      ],
    },
    {
      heading: 'Cómo elegir intervalos para estudiar, escribir o trabajar',
      paragraphs: [
        'Para una tarea nueva o que produce rechazo, comienza con un bloque lo bastante corto para poder iniciarlo. Quince o veinte minutos pueden servir para reunir material y crear un primer borrador. Cuando el trabajo ya está encaminado, prueba 25 o 30 minutos. En edición, programación o análisis, un bloque de 40 a 50 minutos puede reducir el coste de volver a entrar en contexto, siempre que la pausa posterior sea real.',
        'No conviertas una llamada, una clase en directo, atención al público o una actividad de cuidados en intervalos rígidos. En esos casos el reloj puede recordar una revisión o un descanso, pero la prioridad depende de otras personas. Si interrumpes casi todos los bloques, revisa primero el entorno y el tamaño del objetivo. Alargar el temporizador rara vez corrige una tarea mal definida.',
      ],
    },
    {
      heading: 'Qué ocurre al cambiar de pestaña o bloquear la pantalla',
      paragraphs: [
        'Los navegadores pueden espaciar las ejecuciones de JavaScript cuando una pestaña está en segundo plano. Por eso esta herramienta no resta un segundo suponiendo que cada llamada llega puntual: guarda la hora exacta en la que debe terminar y vuelve a calcular la diferencia con el reloj del dispositivo. Al regresar a la pestaña, la cuenta se pone al día con el tiempo realmente transcurrido.',
        'La página debe continuar abierta. El sistema operativo puede suspender el navegador, descargar una pestaña para ahorrar memoria o detener el audio. No uses el pitido como única alarma para una cita, una medicación o una obligación crítica. Si necesitas una garantía del sistema, configura además una alarma nativa del dispositivo.',
      ],
    },
    {
      heading: 'Método práctico para un ciclo completo',
      paragraphs: [
        'Escribe la tarea y el criterio de terminado. Inicia el bloque, trabaja solo sobre ese resultado y deja una nota breve si aparece algo que deba atenderse después. Cuando llegue la pausa, guarda el estado: una frase como «seguir por la tabla 3» evita gastar el siguiente bloque en recordar. Tras la pausa, decide si continúas, divides la tarea o cambias a otra prioridad.',
        'El contador de bloques terminados es información de la sesión abierta, no una medida de valor personal ni un registro de productividad. Un bloque que detecta un error importante puede ser más útil que cuatro bloques de actividad mecánica. Para revisar una semana, registra por tu cuenta tarea, resultado y obstáculos; no basta con copiar el número de intervalos.',
      ],
    },
    {
      heading: 'Errores frecuentes al usar la técnica Pomodoro',
      paragraphs: [
        'El primer error es iniciar sin saber qué se entregará al final. El segundo es llenar la pausa con redes, correo o noticias y volver con más estímulos que antes. También es frecuente pausar el reloj cada vez que una tarea se vuelve incómoda; si no existe una urgencia, anota la dificultad y continúa hasta el final del intervalo.',
        'Otro problema es tratar 25 minutos como una norma universal. Si terminas antes, usa el tiempo para revisar o preparar el siguiente paso; si una tarea exige continuidad, registra el punto alcanzado y decide conscientemente si comienza otro bloque. No cambies las duraciones durante una sesión en marcha: pausa o reinicia para que el límite siga siendo comprensible.',
      ],
    },
    {
      heading: 'Pomodoro, descansos y bienestar digital',
      paragraphs: [
        'Una pausa del temporizador no sustituye recomendaciones ergonómicas, sueño suficiente, atención clínica ni ajustes laborales. Cambiar postura, mirar a otra distancia y moverse suavemente puede ser útil, pero la necesidad concreta depende de la persona y del trabajo. Dolor, mareo, ansiedad o fatiga persistente no se solucionan acumulando más ciclos.',
        'Si el objetivo principal es recordar pausas repetidas durante una jornada, el recordatorio de descansos puede ser más directo. El temporizador Pomodoro está pensado para relacionar cada intervalo con una tarea concreta y alternar pausas cortas y largas.',
      ],
      link: {
        prefix: 'Para avisos periódicos sin contar bloques de tarea, utiliza el ',
        label: 'recordatorio de descansos',
        href: '/es/herramientas/recordatorio-descansos/',
        suffix: '.',
      },
    },
  ],
  instructions: [
    'Escribe en una nota externa el resultado concreto que quieres terminar durante el próximo bloque.',
    'Ajusta minutos de concentración, pausa corta y pausa larga entre 1 y 180; para empezar puedes conservar 25, 5 y 15.',
    'Pulsa Iniciar. La cuenta atrás y la fase actual aparecen también en el título de la pestaña.',
    'Usa Pausar si la interrupción es inevitable. Iniciar reanuda desde el segundo restante.',
    'Al terminar concentración, la herramienta suma un bloque y abre una pausa; cada cuatro bloques utiliza la pausa larga.',
    'Pulsa Reiniciar al cambiar de tarea o cuando quieras volver al primer bloque con contador cero.',
  ],
  examples: [
    'Estudiar un epígrafe durante 25 minutos y dedicar la pausa a levantarse de la mesa.',
    'Redactar una introducción en 40 minutos y dejar una nota de continuación antes del descanso.',
    'Procesar una carpeta de facturas con bloques de 15 minutos y objetivos de veinte documentos.',
    'Preparar una presentación por fases: esquema, diapositivas, revisión y ensayo.',
    'Practicar vocabulario en sesiones breves sin mezclar lectura, ejercicios y corrección en el mismo objetivo.',
  ],
  audience: [
    'Estudiantes que necesitan comenzar una sesión con alcance claro.',
    'Personas que escriben, programan, diseñan o investigan por bloques.',
    'Trabajadores que quieren agrupar tareas administrativas repetitivas.',
    'Usuarios que prefieren un temporizador sin cuenta y con tratamiento local.',
  ],
  caseStudies: [
    {
      title: 'Preparación de un examen',
      description: 'Una estudiante divide el tema en lectura activa, preguntas y corrección. Cada intervalo tiene una salida distinta y la pausa larga separa dos asignaturas.',
    },
    {
      title: 'Informe que cuesta empezar',
      description: 'Un analista usa un primer bloque de 15 minutos solo para reunir datos y escribir encabezados. Después amplía a 35 minutos para redactar sin cambiar de contexto.',
    },
    {
      title: 'Bandeja de entrada acumulada',
      description: 'Una persona procesa mensajes por lotes de veinte minutos, anota los que exigen trabajo profundo y no permite que el correo ocupe el resto de la mañana.',
    },
  ],
  notes: [
    'La pestaña debe permanecer abierta; el sistema puede suspender el navegador o impedir el sonido.',
    'El reloj del dispositivo determina la hora final. Un cambio manual de fecha u hora puede alterar la cuenta.',
    'Solo las duraciones se guardan localmente; fase, segundos restantes y bloques terminados se reinician al recargar.',
    'El pitido es una ayuda y no una alarma garantizada.',
    'Pomodoro® es una marca registrada; FunnyTools no es el sitio oficial ni está afiliado a su titular.',
  ],
  faq: [
    {
      q: '¿Cuánto dura un Pomodoro?',
      a: 'La referencia más conocida usa 25 minutos de concentración y 5 de pausa, con una pausa más larga después de varios bloques. Aquí puedes cambiar las tres duraciones entre 1 y 180 minutos.',
    },
    {
      q: '¿Tengo que trabajar exactamente 25 minutos?',
      a: 'No. Usa un intervalo que permita entrar en la tarea sin crear fatiga innecesaria. Lo importante es definir el resultado y respetar el límite elegido.',
    },
    {
      q: '¿El temporizador sigue funcionando en segundo plano?',
      a: 'Mientras la página siga abierta, calcula el tiempo contra una hora final real y se pone al día al volver. El navegador o el sistema operativo aún pueden suspender la pestaña o bloquear el sonido.',
    },
    {
      q: '¿Cuándo aparece la pausa larga?',
      a: 'Después de cada cuarto bloque de concentración terminado. Tras cualquier pausa, la fase siguiente vuelve a ser concentración.',
    },
    {
      q: '¿Se guardan mis sesiones?',
      a: 'No. Solo se guardan en localStorage las tres duraciones elegidas. El contador y el tiempo restante pertenecen a la sesión actual.',
    },
    {
      q: '¿Puedo usarlo como alarma importante?',
      a: 'No es recomendable. Para medicación, citas u obligaciones críticas utiliza una alarma del sistema además de esta página.',
    },
    {
      q: '¿Qué hago si me interrumpen todo el tiempo?',
      a: 'Reduce el alcance del bloque, silencia avisos no esenciales y anota interrupciones. En trabajos de respuesta inmediata quizá sea mejor un recordatorio de pausas que un ciclo rígido.',
    },
    {
      q: '¿Más bloques significan más productividad?',
      a: 'No necesariamente. Evalúa resultados, calidad y recuperación. El contador sirve para observar el ritmo, no para medir tu valor ni sustituir una planificación.',
    },
  ],
  labels: {
    workMinutes: 'Minutos de concentración',
    breakMinutes: 'Minutos de pausa corta',
    longBreakMinutes: 'Minutos de pausa larga',
    start: 'Iniciar',
    pause: 'Pausar',
    reset: 'Reiniciar',
    work: 'Concentración',
    break: 'Pausa corta',
    longBreak: 'Pausa larga',
    completed: 'Bloques terminados',
    sessions: 'bloques',
    minutesError: 'Introduce minutos enteros entre 1 y 180.',
    titleSuffix: 'Temporizador Pomodoro',
  },
  sources: [
    {
      label: 'Pomodoro Technique — recursos del titular de la metodología',
      href: 'https://www.pomodorotechnique.com/',
      note: 'Referencia de origen para distinguir la metodología de esta implementación independiente.',
    },
    {
      label: 'MDN: setTimeout()',
      href: 'https://developer.mozilla.org/es/docs/Web/API/Window/setTimeout',
      note: 'Documenta que el retraso real de un temporizador puede ser mayor que el solicitado.',
    },
    {
      label: 'MDN: Page Visibility API',
      href: 'https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API',
      note: 'Explica la visibilidad de pestañas y las políticas de limitación para tareas en segundo plano.',
    },
  ],
  privacyNote: 'Las duraciones se guardan en localStorage de este navegador. Tarea, fase, segundos restantes y contador no se transmiten a FunnyTools ni se conservan como un historial.',
  disclaimer: 'Herramienta general de organización del tiempo. No ofrece diagnóstico médico, psicológico, ergonómico ni laboral y no debe usarse como única alarma para una obligación crítica.',
};

export const spanishPomodoroTimerReview = {
  heading: 'Revisión de un ciclo antes de empezar',
  intro: 'Un intervalo útil necesita una salida concreta, una duración realista y una pausa que permita recuperar atención.',
  panels: [
    { title: 'Resultado', text: 'Escribe qué quedará terminado o comprobado al acabar este bloque.' },
    { title: 'Duración', text: 'Elige un límite acorde con la tarea; 25 minutos es un inicio, no una obligación.' },
    { title: 'Entorno', text: 'Prepara archivos y silencia interrupciones que no sean necesarias.' },
  ],
  checklistHeading: 'Lista de comprobación',
  checklist: [
    'El bloque contiene una sola prioridad.',
    'La duración cabe en el tiempo disponible.',
    'La página permanecerá abierta.',
    'Existe una alarma del sistema si el aviso es crítico.',
    'La pausa no se llenará con otra tarea intensa.',
  ],
};

export const spanishInflationCalculator: ToolContent = {
  name: 'Calculadora de inflación y poder adquisitivo',
  short: 'Compara un importe con un escenario de inflación anual constante y entiende qué significa cada dirección del cálculo.',
  long: 'Esta calculadora de inflación estima tres preguntas distintas: cuánto podría costar en el futuro algo que cuesta una cantidad hoy, qué poder adquisitivo real conservaría una cantidad nominal futura y cuál sería hoy el equivalente aproximado de una cantidad del pasado. Introduces importe, tasa anual y años; la página no descarga el IPC ni pretende sustituir la actualización oficial del INE.',
  seoTitle: 'Calculadora de inflación y poder adquisitivo',
  seoDescription: 'Calcula coste futuro, poder adquisitivo o equivalente actual con importe, inflación anual y años. Fórmula visible, ejemplos y límites frente al IPC oficial.',
  keywords: [
    'calculadora de inflación',
    'calculadora poder adquisitivo',
    'calcular inflación acumulada',
    'coste futuro',
    'equivalente actual de dinero',
    'IPC España calculadora',
    'pérdida de poder adquisitivo',
  ],
  capabilities: [
    'Proyectar el coste futuro de un importe actual con capitalización anual.',
    'Expresar el poder adquisitivo futuro de una cantidad nominal en dinero de hoy.',
    'Actualizar hacia hoy una cantidad del pasado bajo una tasa media introducida por el usuario.',
    'Admitir un escenario de deflación superior a −100% y mostrar diferencia y fórmula.',
    'Copiar un resumen sin subir los datos a un servidor.',
  ],
  contentSections: [
    {
      heading: 'Respuesta rápida: cómo calcular inflación acumulada',
      paragraphs: [
        'Con una tasa anual constante i y un plazo n, el factor acumulado es (1 + i)^n. Si hoy un gasto es 1.000 y supones 3% durante 5 años, el factor es 1,03⁵ y el coste futuro aproximado resulta 1.159,27. La subida acumulada no es 15% exacto porque cada año se aplica sobre el nivel ya aumentado.',
        'Para medir el poder adquisitivo real de 1.000 nominales dentro de cinco años, se divide por el mismo factor: 1.000 / 1,03⁵ = 862,61 en dinero de hoy. Son preguntas inversas. Una habla de la cantidad nominal necesaria para comprar la misma cesta; la otra traduce una cantidad futura a valor real actual.',
      ],
    },
    {
      heading: 'Qué significa cada modo de la calculadora',
      paragraphs: [
        '«Coste futuro desde hoy» multiplica el importe actual por el factor. «Poder adquisitivo futuro en dinero de hoy» divide una cantidad nominal futura por el factor. «Equivalente actual de una cantidad pasada» vuelve a multiplicar: toma un valor situado años atrás y lo lleva hacia el presente con la tasa media elegida. Esta última opción no sirve para retroceder desde hoy hacia el pasado; para eso se usaría una división.',
        'La diferencia que aparece debajo siempre se calcula como resultado menos importe introducido. Puede ser positiva o negativa según el modo y la tasa. El número no incluye símbolo monetario porque la misma fórmula funciona con euros, pesos u otra unidad siempre que no mezcles monedas.',
      ],
      items: [
        'Coste futuro: cuánto importe nominal podría hacer falta más adelante.',
        'Poder adquisitivo: cuánto valdría en dinero de hoy una cantidad futura.',
        'Equivalente actual: actualización hacia hoy de una cantidad situada en el pasado.',
        'Diferencia: resultado menos cantidad de entrada, no una rentabilidad.',
      ],
    },
    {
      heading: 'Inflación, IPC y experiencia personal no son lo mismo',
      paragraphs: [
        'El Banco de España define la inflación como el crecimiento general del nivel de precios de consumo y explica que reduce lo que puede comprarse con la misma cantidad. El IPC resume la evolución de una cesta representativa; no afirma que cada alquiler, alimento, factura o servicio cambie en el mismo porcentaje. Tu cesta personal puede alejarse del promedio por vivienda, territorio, hábitos, impuestos, calidad y sustitución de productos.',
        'Esta página usa una tasa fija escrita por ti. El actualizador del INE, en cambio, aplica series oficiales para periodos admitidos y es la referencia adecuada cuando necesitas actualizar una renta o gasto con el IPC general de España. No copies una tasa interanual de un solo mes como si fuera necesariamente la media de un horizonte de diez años.',
      ],
    },
    {
      heading: 'Cómo elegir una tasa sin presentar una previsión como certeza',
      paragraphs: [
        'Para revisar un presupuesto, conviene calcular varios escenarios. Una base puede usar 0% para ver el importe sin variación; después añade una tasa moderada y otra exigente. Si cuentas con previsiones públicas, registra quién las publica, qué periodo cubren y cuándo fueron actualizadas. Un objetivo de política monetaria tampoco es una garantía de inflación exacta para cada año.',
        'En horizontes largos, una sola tasa oculta cambios de régimen. Puedes dividir el análisis: calcula el primer tramo, usa el resultado como importe inicial y aplica otra tasa al segundo. Para un contrato, una pensión, una indemnización o una obligación regulada, comprueba la norma y el índice exacto; puede exigir una serie, mes de referencia o límite diferente.',
      ],
    },
    {
      heading: 'Cómo interpretar una pérdida de poder adquisitivo',
      paragraphs: [
        'Si una cantidad nominal permanece igual y los precios suben, su valor real baja. Con 3% anual durante 10 años, 10.000 nominales equivaldrían a unos 7.440,94 en dinero de hoy bajo este modelo. Eso no significa que el banco haya restado 2.559,06 de la cuenta: describe la menor cantidad de bienes y servicios que podría comprar, suponiendo que la cesta siguiera el mismo ritmo.',
        'No confundas inflación con rendimiento de una inversión. Para saber si un ahorro gana poder adquisitivo hay que comparar, después de costes e impuestos, su crecimiento nominal con el cambio de precios relevante. Esta herramienta solo transforma importes; no modela riesgo, rentabilidad, fiscalidad ni flujos intermedios.',
      ],
    },
    {
      heading: 'Casos en los que debes usar el dato oficial',
      paragraphs: [
        'Usa la fuente oficial cuando el resultado vaya a una factura, un alquiler, una nómina, una reclamación, una declaración, un contrato o un procedimiento judicial. El índice aplicable podría ser IPC general, IPCA, una tasa territorial, un índice sectorial o una cláusula propia. FunnyTools no conoce el documento ni la jurisdicción.',
        'También debes consultar series oficiales para afirmar cuánto cambió el poder adquisitivo entre dos fechas históricas. La tasa media inventada sirve para una simulación, no para reconstruir la variación observada. Conserva fecha, serie, base, meses y método de redondeo utilizados.',
      ],
    },
  ],
  instructions: [
    'Define primero la pregunta: coste futuro, poder adquisitivo futuro en dinero de hoy o equivalente actual de una cantidad pasada.',
    'Introduce un importe no negativo y mantén la misma moneda durante toda la interpretación.',
    'Escribe una tasa anual entre −99,99% y 1.000%. Usa decimales con punto o los controles del campo.',
    'Introduce un plazo entero entre 0 y 200 años.',
    'Revisa el resultado, la diferencia y la dirección de la fórmula; no interpretes la diferencia como beneficio o pérdida bancaria.',
    'Repite con varias tasas y contrasta con INE u otra fuente oficial antes de una decisión real.',
  ],
  examples: [
    'Estimar cuánto podría costar dentro de 5 años una compra que hoy vale 10.000 con una hipótesis de 3%.',
    'Convertir un presupuesto nominal futuro a poder adquisitivo expresado en dinero de hoy.',
    'Actualizar de forma orientativa un precio de hace 8 años usando una tasa media documentada.',
    'Comparar escenarios 0%, 2%, 3% y 5% para una meta de ahorro.',
    'Explicar por qué sumar tasa por años no coincide con la capitalización acumulada.',
  ],
  audience: [
    'Personas que preparan presupuestos o metas a varios años.',
    'Estudiantes que practican inflación acumulada y valor real.',
    'Hogares que quieren separar cantidad nominal de poder adquisitivo.',
    'Usuarios que necesitan una simulación privada antes de consultar el IPC oficial.',
  ],
  caseStudies: [
    {
      title: 'Compra aplazada',
      description: 'Un hogar estima el coste futuro de una reforma, calcula tres tasas y añade un margen independiente para cambios de alcance. No presenta el resultado como presupuesto del proveedor.',
    },
    {
      title: 'Ahorro nominal',
      description: 'Una persona comprueba cuánto poder adquisitivo conservarían 20.000 dentro de diez años si el saldo no creciera. Después compara con escenarios de rendimiento neto por separado.',
    },
    {
      title: 'Actualización histórica',
      description: 'Para una conversación informal se usa una tasa media; al preparar un documento contractual se abandona la simulación y se consulta el actualizador y la metodología del INE.',
    },
  ],
  notes: [
    'La tasa es constante y definida por el usuario; no se descarga IPC ni una previsión.',
    'Los años deben ser enteros de 0 a 200 y la tasa debe ser mayor que −100%.',
    'Coste futuro y equivalente actual multiplican porque trasladan un valor hacia delante en el tiempo.',
    'Poder adquisitivo divide porque expresa una cantidad futura en dinero de hoy.',
    'El resultado no incluye cambios de cesta, calidad, impuestos, tipo de cambio, comisiones ni rendimiento.',
    'El formato no fija moneda; todos los importes deben estar en la misma unidad.',
  ],
  faq: [
    {
      q: '¿Cómo se calcula la inflación acumulada?',
      a: 'Con una tasa constante se usa el factor (1 + tasa anual)^años. Para un coste futuro se multiplica el importe; para expresarlo en poder adquisitivo de hoy se divide.',
    },
    {
      q: '¿Qué diferencia hay entre inflación e IPC?',
      a: 'La inflación describe la subida general de precios. El IPC es un indicador estadístico construido con una cesta y metodología determinadas; no replica cada gasto personal.',
    },
    {
      q: '¿La calculadora usa datos del INE?',
      a: 'No. Solo usa la tasa que escribes. Para actualizar importes con series oficiales de España, consulta el actualizador y la metodología del INE.',
    },
    {
      q: '¿Por qué el poder adquisitivo baja más de lo que esperaba?',
      a: 'Porque el efecto se acumula de forma compuesta. Además, una caída porcentual del valor real no es simplemente el negativo de la subida acumulada de precios.',
    },
    {
      q: '¿Puedo introducir una tasa negativa?',
      a: 'Sí, hasta un valor superior a −100%. Representa deflación en la simulación. Comprueba que la fuente y el periodo justifican ese supuesto.',
    },
    {
      q: '¿Qué significa equivalente actual de una cantidad pasada?',
      a: 'Toma una cantidad situada años atrás y la multiplica por el factor para llevarla hacia hoy. No reconstruye el IPC observado salvo que introduzcas una tasa equivalente correcta.',
    },
    {
      q: '¿Sirve para actualizar un alquiler o una pensión?',
      a: 'No como resultado oficial. Esos casos pueden tener índice, periodo, límites y reglas legales específicos. Revisa contrato, norma y organismo competente.',
    },
    {
      q: '¿La diferencia es una pérdida de dinero?',
      a: 'No necesariamente. Es resultado menos entrada dentro del modelo. En poder adquisitivo representa valor real aproximado, no un cargo en la cuenta.',
    },
    {
      q: '¿Qué tasa debo usar para una previsión?',
      a: 'No existe una tasa cierta. Documenta una fuente reciente y compara varios escenarios. Para horizontes largos, separa periodos si los supuestos cambian.',
    },
  ],
  labels: {
    amount: 'Importe',
    annualRate: 'Inflación anual supuesta (%)',
    years: 'Años enteros',
    mode: 'Pregunta que quieres responder',
    futureCost: 'Coste futuro desde hoy',
    futureBuyingPower: 'Poder adquisitivo futuro en dinero de hoy',
    pastEquivalent: 'Equivalente actual de una cantidad pasada',
    calculate: 'Calcular inflación',
    copy: 'Copiar resultado',
    reset: 'Restablecer',
    adjustedAmount: 'Importe ajustado',
    change: 'Diferencia frente a la entrada',
    formula: 'Dirección del cálculo',
    formulaMultiply: 'importe × (1 + tasa)^años',
    formulaDivide: 'importe ÷ (1 + tasa)^años',
    invalidInput: 'Usa un importe no negativo, una tasa entre −99,99% y 1.000% y años enteros de 0 a 200.',
    copied: 'Resultado copiado',
  },
  formula: {
    expression: 'factor = (1 + i)^n; coste futuro o equivalente actual = importe × factor; poder adquisitivo = importe ÷ factor',
    explanation: 'i es la tasa anual en forma decimal y n son años enteros. La herramienta supone una tasa constante y capitalización anual.',
  },
  sources: [
    {
      label: 'Banco de España: ¿Qué es la inflación?',
      href: 'https://www.bde.es/wbe/es/areas-actuacion/politica-monetaria/preguntas-frecuentes/politica-monetaria-y-estabilidad-precios/que-es-la-inflacion.html',
      note: 'Definición, relación con poder adquisitivo y referencia al IPCA de la zona euro.',
    },
    {
      label: 'INE: actualizador de rentas o gastos con el IPC general',
      href: 'https://ine.es/calcula/index.do?lang=es',
      note: 'Herramienta oficial para periodos y series disponibles; consulta allí la cobertura vigente.',
    },
    {
      label: 'INE: metodología del Índice de Precios de Consumo',
      href: 'https://www.ine.es/metodologia/t25/t2530138.pdf',
      note: 'Documentación para entender cesta, ponderaciones, cálculo y alcance estadístico.',
    },
  ],
  privacyNote: 'Importe, tasa, plazo y modo se calculan en esta pestaña. FunnyTools no recibe los valores ni consulta una base de datos externa.',
  disclaimer: 'Simulación educativa con una tasa constante. No es un cálculo oficial de IPC ni asesoramiento financiero, fiscal, contractual o legal. Para un uso formal, aplica la serie, norma y periodo de la autoridad competente.',
};

export const spanishInflationCalculatorReview = {
  heading: 'Cómo revisar una estimación de inflación',
  intro: 'La calidad del resultado depende de formular la dirección temporal correcta y documentar la tasa.',
  panels: [
    { title: 'Dirección', text: 'Distingue entre llevar un coste hacia el futuro y traer poder adquisitivo a dinero de hoy.' },
    { title: 'Supuesto', text: 'Registra fuente, fecha y periodo de la tasa; no la presentes como certeza.' },
    { title: 'Uso', text: 'Para contratos y trámites, sustituye la simulación por el índice y método oficiales.' },
  ],
  checklistHeading: 'Lista de comprobación',
  checklist: [
    'Todos los importes usan la misma moneda.',
    'La tasa corresponde al periodo y territorio relevantes.',
    'La dirección de multiplicar o dividir responde a la pregunta.',
    'Se compararon al menos dos escenarios.',
    'El resultado oficial se verificará cuando sea necesario.',
  ],
};

export const spanishCad2d: ToolContent = {
  name: 'CAD 2D online para dibujar planos sencillos',
  short: 'Traza líneas, rectángulos, círculos y polilíneas con rejilla, referencias a puntos y exportación local.',
  long: 'Este CAD 2D online ofrece un tablero ligero para croquis geométricos, esquemas de planta y diagramas técnicos sencillos. Puedes dibujar con el puntero o introducir longitud, ángulo, ancho, alto y radio; mover formas, editar vértices, unir extremos, deshacer cambios y exportar PNG o SVG. No sustituye un programa CAD profesional: las unidades son de rejilla, no incluye escala física, capas, cotas normalizadas ni archivos DWG/DXF.',
  seoTitle: 'CAD 2D online gratis | Dibujar planos y exportar SVG',
  seoDescription: 'CAD 2D online gratis y sin registro para líneas, rectángulos, círculos y polilíneas. Rejilla, modo ortogonal, unión de puntos y exportación PNG/SVG.',
  keywords: [
    'CAD 2D online',
    'dibujar planos 2D online',
    'programa CAD online gratis',
    'hacer croquis online',
    'dibujo técnico 2D',
    'editor SVG geométrico',
    'plano sencillo online',
  ],
  capabilities: [
    'Dibujar línea, rectángulo, círculo y polilínea sobre una rejilla.',
    'Introducir medidas geométricas en unidades de rejilla y ángulos en grados.',
    'Activar ajuste a rejilla, referencia a extremos y modo ortogonal.',
    'Seleccionar, mover, editar vértices, unir puntos y separar una unión con Alt al arrastrar.',
    'Deshacer, rehacer, eliminar y exportar el dibujo como PNG o SVG.',
    'Desplazar la vista con la barra espaciadora y acercar o alejar con la rueda.',
  ],
  contentSections: [
    {
      heading: 'Qué puedes dibujar con este CAD 2D online',
      paragraphs: [
        'El tablero sirve para convertir una idea espacial en geometría básica: distribución preliminar de una habitación, recorrido de una instalación, esquema de mobiliario, pieza conceptual o diagrama que necesita líneas conectadas. Los rectángulos ayudan a bloquear áreas; los círculos representan radios o zonas; las polilíneas encadenan segmentos con distintos ángulos.',
        'El objetivo es obtener un croquis claro con rapidez. No contiene biblioteca de puertas, muros, mobiliario, símbolos eléctricos ni restricciones paramétricas. Tampoco calcula superficies, perímetros o interferencias. Si el dibujo se usará para construir, fabricar, presupuestar o solicitar una licencia, debe rehacerse o verificarse en una herramienta profesional con escala, unidades y tolerancias controladas.',
      ],
    },
    {
      heading: 'Unidades de rejilla, píxeles y escala física',
      paragraphs: [
        'Cada cuadrícula visible equivale a una unidad interna y, con la vista inicial, a 20 píxeles del lienzo. La barra de estado muestra ambas referencias para un segmento. Esas unidades no son metros, centímetros ni milímetros. Puedes decidir que una cuadrícula representa 10 cm o 1 m, pero esa equivalencia existe solo en tu criterio y debe anotarse fuera del dibujo.',
        'Al ampliar la vista, la geometría interna no cambia; solo cambia su tamaño en pantalla. Un PNG captura el aspecto visible del lienzo y depende de su resolución. El SVG conserva formas vectoriales y un viewBox ajustado al contenido, por lo que suele ser mejor para editar o escalar después sin perder nitidez.',
      ],
      items: [
        'Define la equivalencia de una unidad antes de dibujar.',
        'No mezcles dos escalas dentro del mismo croquis.',
        'Anota escala, versión y finalidad junto al archivo exportado.',
        'Comprueba una medida conocida después de abrir el SVG en otra aplicación.',
      ],
    },
    {
      heading: 'Cómo usar rejilla, ortogonal y referencias a extremos',
      paragraphs: [
        '«Ajustar a rejilla» redondea el punto a la cuadrícula más cercana. «Referencia a extremos» detecta vértices de líneas y polilíneas cercanos para que coincidan. «Ortogonal» limita la dirección dominante a horizontal o vertical. Son ayudas distintas: la rejilla ordena posiciones, la referencia busca puntos existentes y el modo ortogonal controla dirección.',
        'Una coincidencia visual no siempre implica una unión editable. La herramienta marca extremos conectados y permite el modo «Unir extremos» para relacionarlos. Después, mover uno de esos puntos desplaza los vértices vinculados. Si quieres romper la relación, selecciona la forma y arrastra el control del extremo manteniendo Alt.',
      ],
    },
    {
      heading: 'Entrada dinámica de longitud, ángulo, ancho, alto y radio',
      paragraphs: [
        'Tras fijar el primer punto de una línea o polilínea, el panel permite escribir longitud en unidades de rejilla y ángulo en grados. Cero grados avanza hacia la derecha; el sistema de pantalla hace que los signos verticales se interpreten según la vista. Para un rectángulo se introducen ancho y alto; para un círculo, radio. Los valores deben ser positivos.',
        'Puedes escribir la primera medida, pulsar Tab para pasar a la segunda y Enter para confirmar. Escape cancela el trazado. En una polilínea, cada segmento puede recibir sus propias medidas; Enter con campos vacíos termina la cadena cuando ya existen al menos dos puntos. Compara siempre la previsualización y la barra de estado antes de exportar.',
      ],
    },
    {
      heading: 'Diferencia entre PNG y SVG al exportar',
      paragraphs: [
        'PNG es una imagen rasterizada: captura píxeles y resulta cómoda para mensajes, presentaciones o una referencia visual. No conserva objetos editables ni medidas internas. SVG es un documento vectorial basado en elementos como line, rect, circle y polyline; puede abrirse en navegadores y editores compatibles y escalarse con más calidad.',
        'La exportación SVG incluye las formas y encuadra su extensión con un margen, pero no exporta la rejilla, la selección, las uniones internas ni una escala física. La exportación PNG incluye la vista del lienzo tal como está renderizada, incluida la rejilla. Revisa el archivo descargado antes de cerrar o limpiar el tablero.',
      ],
    },
    {
      heading: 'Flujo recomendado para un croquis verificable',
      paragraphs: [
        'Empieza por escribir finalidad y escala asumida. Dibuja primero el contorno principal con rejilla y ortogonal; añade después subdivisiones, radios y conexiones. Usa deshacer en lugar de intentar corregir varias formas a la vez. Antes de exportar, selecciona segmentos críticos y compara la longitud mostrada con tus notas.',
        'Guarda una versión PNG para referencia rápida y una SVG para edición posterior. Nombra los archivos con proyecto, escala asumida y fecha. Este tablero no guarda automáticamente un proyecto editable: si recargas o cierras la pestaña, no debes esperar recuperar la escena. Exportar no sustituye una copia del diseño en un formato CAD con metadatos.',
      ],
    },
    {
      heading: 'Cuándo necesitas un programa CAD profesional',
      paragraphs: [
        'Usa software especializado si necesitas DWG o DXF, capas, bloques, cotas asociativas, unidades físicas, impresión a escala, restricciones, coordenadas topográficas, tolerancias, colaboración, historial o cumplimiento de una norma de dibujo. También cuando una medida equivocada pueda causar daño, coste de fabricación o incumplimiento.',
        'Para arquitectura, estructura, instalaciones, seguridad, accesibilidad o fabricación, una persona cualificada debe comprobar dimensiones y requisitos. Este CAD 2D online es una ayuda de boceto y comunicación temprana, no un plano ejecutivo ni un documento certificado.',
      ],
    },
  ],
  instructions: [
    'Define por escrito qué representa una unidad de rejilla y para qué se utilizará el croquis.',
    'Elige Línea, Rectángulo, Círculo o Polilínea y marca el primer punto sobre el lienzo.',
    'Mueve el puntero o escribe medidas en la entrada dinámica; usa Tab y Enter para confirmar.',
    'Activa rejilla, referencia a extremos u ortogonal según la precisión visual que necesites.',
    'Cambia a Seleccionar/Mover para desplazar formas o editar controles de líneas y polilíneas.',
    'Usa Unir extremos cuando dos vértices deban moverse juntos; Alt al arrastrar separa una unión.',
    'Comprueba longitudes y escala asumida; luego exporta PNG para imagen o SVG para vector.',
    'Abre el archivo descargado y verifica su contenido antes de limpiar o cerrar la página.',
  ],
  examples: [
    'Bosquejar la distribución inicial de una habitación con una cuadrícula equivalente a 20 cm.',
    'Crear un recorrido de tubería conceptual mediante una polilínea ortogonal.',
    'Dibujar una pieza geométrica simple para explicar forma y proporciones, no para fabricar.',
    'Preparar un esquema vectorial que después se rotulará en un editor SVG.',
    'Comparar dos distribuciones rápidas exportando una imagen de cada versión.',
  ],
  audience: [
    'Personas que necesitan comunicar una idea espacial antes de pasar a CAD profesional.',
    'Estudiantes que practican formas, coordenadas, ángulos y vectores sencillos.',
    'Docentes que preparan un esquema geométrico en el navegador.',
    'Usuarios que quieren un boceto SVG local sin crear una cuenta.',
  ],
  caseStudies: [
    {
      title: 'Distribución preliminar',
      description: 'Una persona asigna 20 cm a cada unidad, dibuja el contorno y el mobiliario como rectángulos y exporta una imagen para debatir opciones. No la usa como plano de obra.',
    },
    {
      title: 'Esquema conectado',
      description: 'Un estudiante crea una polilínea, une un extremo con otra línea y comprueba cómo se mueve el punto compartido. Exporta SVG para analizar sus elementos.',
    },
    {
      title: 'Entrega a un profesional',
      description: 'Un cliente marca una idea y anota medidas reales aparte. El profesional vuelve a medir el espacio y reconstruye el diseño con unidades, capas y normativa.',
    },
  ],
  notes: [
    'La escena vive en memoria y no se recupera al recargar; exporta antes de cerrar.',
    'Una unidad de rejilla no equivale automáticamente a una unidad física.',
    'El PNG captura el lienzo; el SVG exporta formas, no rejilla, controles ni relaciones de unión.',
    'No hay importación ni exportación DWG/DXF, capas, cotas, texto o impresión a escala.',
    'El ajuste a extremos es una ayuda geométrica; comprueba cada unión crítica.',
    'No utilices el croquis como plano de obra, fabricación, seguridad o cumplimiento normativo.',
  ],
  faq: [
    {
      q: '¿Este CAD 2D online es gratis y sin registro?',
      a: 'Sí. El tablero puede usarse en el navegador sin cuenta. El dibujo permanece en la memoria de la pestaña y las exportaciones se crean localmente.',
    },
    {
      q: '¿Puedo dibujar un plano de casa?',
      a: 'Puedes hacer un croquis conceptual. No incluye escala física, muros paramétricos, cotas, símbolos ni comprobación normativa, por lo que no es un plano de obra.',
    },
    {
      q: '¿Qué unidad usan las medidas?',
      a: 'Unidades de rejilla. La vista inicial usa 20 píxeles por unidad, pero no existe equivalencia automática con metros o milímetros.',
    },
    {
      q: '¿Cómo dibujo una línea con longitud y ángulo exactos?',
      a: 'Marca el primer punto, escribe la longitud en unidades de rejilla, pulsa Tab, introduce el ángulo y confirma con Enter. Verifica la previsualización.',
    },
    {
      q: '¿Qué hace Unir extremos?',
      a: 'Relaciona dos vértices de líneas o polilíneas para que compartan movimiento. Alt al arrastrar un control permite separar ese extremo.',
    },
    {
      q: '¿Cuál es la diferencia entre ajustar a rejilla y referencia a extremos?',
      a: 'La rejilla redondea coordenadas a la cuadrícula; la referencia a extremos busca vértices cercanos de formas existentes.',
    },
    {
      q: '¿Puedo guardar y volver a editar el proyecto?',
      a: 'No como proyecto nativo. SVG conserva las formas vectoriales, pero al reabrirlo fuera de la página no recupera historial, uniones ni estado del tablero.',
    },
    {
      q: '¿Exporta DWG o DXF?',
      a: 'No. Solo PNG y SVG. Para intercambiar planos CAD utiliza software que controle unidades, capas y versión del formato.',
    },
    {
      q: '¿El SVG mantiene la calidad al ampliar?',
      a: 'Sí, sus formas son vectoriales. Aun así, revisa trazo, viewBox y medidas en el programa de destino.',
    },
    {
      q: '¿Funciona en móvil?',
      a: 'El puntero táctil permite dibujar, pero un lienzo grande y la entrada precisa resultan más cómodos con pantalla amplia, ratón y teclado.',
    },
  ],
  labels: {
    toolbar: 'Barra de dibujo',
    select: 'Seleccionar',
    line: 'Línea',
    rectangle: 'Rectángulo',
    circle: 'Círculo',
    polyline: 'Polilínea',
    connect: 'Unir extremos',
    snapToGrid: 'Ajustar a rejilla',
    endpointSnap: 'Referencia a extremos',
    ortho: 'Ortogonal',
    undo: 'Deshacer',
    redo: 'Rehacer',
    deleteSelected: 'Eliminar selección',
    clearAll: 'Limpiar dibujo',
    finishPolyline: 'Terminar polilínea',
    exportPng: 'Exportar PNG',
    exportSvg: 'Exportar SVG',
    canvasLabel: 'Lienzo de dibujo CAD 2D',
    help: 'Consejo: la referencia atrae vértices de líneas y polilíneas. Selecciona una forma para mover sus controles azules; Alt al arrastrar separa un extremo unido.',
    currentTool: 'Herramienta',
    coordinates: 'Coordenadas',
    length: 'Longitud',
    pixels: 'px',
    gridUnits: 'unidades',
    noLength: 'Todavía no hay segmento',
    selected: 'Selección',
    noSelection: 'Ninguna forma seleccionada',
    confirmClear: '¿Quieres eliminar todas las formas del dibujo?',
    emptyCanvas: 'El lienzo está vacío',
    connectMode: 'Unir extremos',
    connectPickFirst: 'Selecciona el primer extremo',
    connectPickSecond: 'Selecciona el segundo extremo',
    connectJoined: 'Extremos unidos',
    connectCancelled: 'Unión cancelada',
    endpointSnapped: 'Referencia de extremo encontrada',
    gripHint: 'Arrastra el control para mover el vértice',
    detachHint: 'Alt al arrastrar separa este extremo',
    joinedPoint: 'Extremo unido',
    dynLength: 'Longitud',
    dynAngle: 'Ángulo',
    dynWidth: 'Ancho',
    dynHeight: 'Alto',
    dynRadius: 'Radio',
    dynLengthUnit: 'unidades',
    dynAngleUnit: '°',
    dynHint: 'Escribe longitud y Enter, o longitud → Tab → ángulo → Enter',
    dynRectangleHint: 'Escribe ancho y alto y pulsa Enter',
    dynCircleHint: 'Escribe el radio y pulsa Enter',
    exportPngFilename: 'croquis-cad-2d.png',
    exportSvgFilename: 'croquis-cad-2d.svg',
  },
  sources: [
    {
      label: 'W3C: SVG 2 — formas básicas',
      href: 'https://www.w3.org/TR/SVG2/shapes.html',
      note: 'Especificación de line, rect, circle, polyline y otras formas usadas en documentos SVG.',
    },
    {
      label: 'MDN: elemento canvas',
      href: 'https://developer.mozilla.org/es/docs/Web/HTML/Reference/Elements/canvas',
      note: 'Referencia del lienzo HTML utilizado para el tablero interactivo y la exportación rasterizada.',
    },
    {
      label: 'MDN: Pointer Events',
      href: 'https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events/Using_Pointer_Events',
      note: 'Modelo de eventos para puntero, ratón y entrada táctil en una superficie de dibujo.',
    },
  ],
  privacyNote: 'La geometría se mantiene en la memoria de esta pestaña. PNG y SVG se generan en tu navegador; FunnyTools no recibe ni almacena el dibujo.',
  disclaimer: 'Herramienta de croquis conceptual. No sustituye medición, escala, tolerancias, normativa, cálculo técnico ni revisión de una persona cualificada.',
};

export const spanishCad2dReview = {
  heading: 'Revisión antes de exportar un croquis',
  intro: 'Un dibujo útil deja clara su finalidad, la escala asumida y los límites que no puede comprobar.',
  panels: [
    { title: 'Escala', text: 'Anota qué representa una unidad; la cuadrícula no conoce metros ni milímetros.' },
    { title: 'Geometría', text: 'Revisa extremos unidos, longitudes críticas y contorno antes de descargar.' },
    { title: 'Destino', text: 'Elige PNG para imagen y SVG para vector; usa CAD profesional si hace falta escala real.' },
  ],
  checklistHeading: 'Lista de comprobación',
  checklist: [
    'La finalidad del croquis está escrita.',
    'La equivalencia de rejilla se mantiene en todo el dibujo.',
    'Las uniones importantes fueron comprobadas.',
    'El formato de exportación corresponde al uso.',
    'El archivo descargado se abrió y revisó.',
  ],
};
