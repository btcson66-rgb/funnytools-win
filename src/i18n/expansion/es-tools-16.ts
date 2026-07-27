import type { ToolContent } from '../tools/_types';

export const spanishRandomNumberPicker: ToolContent = {
  name: 'Generador de números aleatorios',
  short: 'Obtén enteros de un intervalo inclusivo, con o sin repetición, mediante la fuente criptográfica del navegador.',
  long: 'Define mínimo, máximo y cantidad para producir hasta 100 000 números enteros. La opción «Permitir repetidos» realiza extracciones independientes; al desactivarla, cada entero puede aparecer una sola vez. FunnyTools usa `crypto.getRandomValues`, muestreo por rechazo y, para selecciones únicas, el algoritmo de Floyd seguido de un barajado seguro. El resultado se crea en esta pestaña y no constituye un sorteo certificado ni deja un acta verificable.',
  seoTitle: 'Generador de números aleatorios online',
  seoDescription: 'Genera números aleatorios enteros con rango, cantidad, repetición y orden opcionales. Usa crypto.getRandomValues y funciona en el navegador.',
  keywords: [
    'generador de números aleatorios',
    'números al azar',
    'generador de números sin repetición',
    'sorteo de números online',
    'elegir número aleatorio',
    'random number generator español',
    'crypto.getRandomValues',
  ],
  capabilities: [
    'Incluir los dos extremos del intervalo, desde el mínimo hasta el máximo.',
    'Generar una o muchas extracciones independientes cuando se permiten repetidos.',
    'Obtener una muestra uniforme sin repetición sin construir en memoria todo el intervalo.',
    'Ordenar el conjunto después de extraerlo o conservar el orden de salida.',
    'Copiar una lista separada por comas sin enviar rango ni resultado a FunnyTools.',
  ],
  contentSections: [
    {
      heading: 'Respuesta rápida: generar números al azar',
      paragraphs: [
        'Escribe el menor entero posible, el mayor y la cantidad. Ambos extremos están incluidos: de 1 a 10 puede salir 1, 10 o cualquiera de los ocho enteros intermedios. Activa «Permitir repetidos» si cada extracción debe volver a disponer del intervalo completo. Desactívala cuando quieras números distintos, por ejemplo diez dorsales diferentes o veinte filas de una tabla.',
        'Pulsa «Generar números» y copia el resultado antes de cerrar o recargar la página. Si el orden de aparición representa puestos, turnos o suplentes, deja desmarcada la ordenación. Si únicamente necesitas contrastar los identificadores contra una hoja de cálculo, ordenar de menor a mayor facilita la revisión sin modificar el conjunto que ya se había seleccionado.',
      ],
    },
    {
      heading: 'Con repetición y sin repetición no son el mismo experimento',
      paragraphs: [
        'Con repetición, cada posición es una nueva extracción sobre todos los enteros del intervalo. Un valor puede aparecer varias veces y eso no demuestra un fallo. Al simular cien lanzamientos de un dado, por ejemplo, los números del 1 al 6 tienen que poder repetirse. La herramienta asigna cada extracción a una posición del intervalo con la misma probabilidad teórica.',
        'Sin repetición, la salida es una muestra de enteros distintos. Si pides cinco resultados de 1 a 20, ningún valor se repite dentro de esa ejecución. Esta modalidad no guarda memoria entre pulsaciones: una segunda ejecución empieza desde cero y puede incluir valores de la anterior. Para rondas acumulativas necesitas registrar los elegidos y reducir la lista de candidatos por tu cuenta.',
      ],
    },
    {
      heading: 'Fuente aleatoria y eliminación de sesgo',
      paragraphs: [
        'El generador exige `crypto.getRandomValues`, la API de Web Crypto que entrega valores adecuados para usos criptográficos. Combina dos enteros de 32 bits para trabajar dentro del espacio exacto de enteros seguros de JavaScript. Si el navegador no ofrece esa función, la salida queda vacía y aparece un error; no existe un cambio silencioso a `Math.random`.',
        'Para llevar un valor grande a un intervalo pequeño se usa muestreo por rechazo. El algoritmo descarta la franja sobrante antes de aplicar el módulo, de modo que ningún resto recibe una representación adicional. Esa técnica evita el sesgo que surgiría al aplicar `valor % tamaño` directamente cuando el tamaño del intervalo no divide exactamente el espacio de origen.',
      ],
      link: {
        prefix: 'La API utilizada y sus propiedades están descritas en ',
        label: 'Crypto.getRandomValues de MDN',
        href: 'https://developer.mozilla.org/es/docs/Web/API/Crypto/getRandomValues',
        suffix: '.',
      },
    },
    {
      heading: 'Cómo se eligen números únicos en intervalos grandes',
      paragraphs: [
        'Crear una lista con cada entero y barajarla sería innecesario si quieres diez valores dentro de un intervalo de millones. En modo sin repetición se aplica el algoritmo de Floyd: recorre únicamente tantas posiciones como resultados solicitados y usa un conjunto para resolver coincidencias. El coste de memoria depende de la cantidad extraída, no del ancho total del rango.',
        'Después se barajan los elegidos mediante Fisher–Yates y la misma fuente segura. Así, la colección es una muestra uniforme y el orden de salida no queda condicionado por el recorrido interno del algoritmo. Si marcas «Ordenar resultados», la ordenación ocurre al final. El conjunto permanece igual, aunque deja de ser posible interpretar la posición como orden de extracción.',
      ],
    },
    {
      heading: 'Límites de cantidad y enteros seguros',
      paragraphs: [
        'La página admite hasta 100 000 resultados por ejecución para evitar bloqueos y salidas difíciles de manejar. Mínimo, máximo y ancho completo del intervalo deben caber en los enteros seguros de JavaScript, desde −9 007 199 254 740 991 hasta 9 007 199 254 740 991. Un extremo puede ser seguro por separado y formar, junto al otro, un intervalo demasiado ancho; en ese caso se rechaza la operación.',
        'Estos límites conservan una correspondencia exacta entre la posición aleatoria y el entero mostrado. Para identificadores de más de 53 bits, números decimales, distribuciones normales, ponderaciones o semillas reproducibles necesitas una herramienta estadística o una biblioteca que represente esos requisitos de forma explícita. Añadir dígitos a los campos no convierte esta página en un generador de BigInt.',
      ],
    },
    {
      heading: 'Sorteos, aulas y selección de filas',
      paragraphs: [
        'Para un sorteo por números, congela primero una lista de participantes válidos y asigna un identificador único a cada entrada. Anota reglas, momento de cierre y tratamiento de suplentes. Después genera los números y vuelve a la fuente para comprobar la elegibilidad. Un número aleatorio no corrige duplicados, inscripciones tardías ni registros excluidos.',
        'En clase, los números pueden representar asientos, preguntas o equipos sin exponer nombres. En una hoja de cálculo, crea una columna estable de ID antes de seleccionar filas. Copia el resultado junto con fecha, versión de la fuente y decisiones posteriores si otras personas deben revisar el proceso. FunnyTools no crea por sí mismo ese expediente.',
      ],
    },
    {
      heading: 'Lo que la herramienta no puede demostrar',
      paragraphs: [
        'La página no publica semilla, compromiso previo, marca de tiempo firmada, historial inmutable, vídeo ni prueba que permita repetir la misma extracción. Una captura muestra una salida, pero no demuestra qué lista se usó, cuántas veces se pulsó el botón o si se descartaron resultados. Por esa razón no debe presentarse como sistema auditado, notarial o certificado.',
        'Si hay premios valiosos, dinero, obligaciones legales o posibilidad de reclamación, sigue las bases y la normativa aplicable y utiliza un procedimiento con registro independiente. La disponibilidad de una fuente criptográfica mejora la generación de enteros; no valida la gobernanza del sorteo. Imparcialidad técnica y trazabilidad organizativa son controles distintos.',
      ],
    },
    {
      heading: 'Muestreo estadístico y datos de prueba',
      paragraphs: [
        'Elegir números uniformes no garantiza una muestra representativa. Una encuesta necesita un marco de población correcto, tratamiento de ausencias, estratos, pesos y un tamaño justificado. Este generador puede ayudar a seleccionar identificadores de una lista ya preparada, pero no decide si esa lista cubre a la población ni calcula el error muestral.',
        'Para pruebas de software, los enteros rápidos sirven en demostraciones y controles manuales. No son reproducibles: un fallo que dependa de una secuencia concreta puede desaparecer en la siguiente ejecución. En pruebas automatizadas conviene usar un generador con semilla registrada y casos de borde explícitos, incluidos mínimos, máximos, cero, negativos y cantidades extremas.',
      ],
    },
  ],
  instructions: [
    'Define un intervalo inclusivo con mínimo y máximo enteros seguros.',
    'Indica una cantidad entre 1 y 100 000.',
    'Activa repetidos para extracciones independientes o desactívala para una muestra única.',
    'Conserva el orden original si representa puestos; ordena únicamente para facilitar la comprobación.',
    'Copia el resultado y documenta por separado la lista, las reglas y la validación de elegibilidad.',
  ],
  examples: [
    'Extraer 12 dorsales distintos del 1 al 350 para una revisión posterior.',
    'Generar 100 valores del 1 al 6 con repetición para una demostración de frecuencias.',
    'Elegir 25 identificadores de filas sin pegar nombres ni correos en la herramienta.',
    'Crear una lista de preguntas al azar y conservar el orden para una dinámica de aula.',
  ],
  audience: [
    'Docentes y facilitadores que eligen asientos, preguntas, equipos o turnos.',
    'Organización de actividades que ya dispone de tickets o identificadores validados.',
    'Analistas que seleccionan filas de un marco de datos preparado.',
    'Desarrollo y QA que necesitan enteros variados para una prueba exploratoria.',
  ],
  caseStudies: [
    {
      title: 'Dorsales sin repetición',
      description: 'Una carrera cierra su listado, numera solo inscripciones válidas y extrae cinco dorsales distintos. El acta conserva la lista de origen y los resultados en orden, ya que la página no almacena el proceso.',
    },
    {
      title: 'Filas de una auditoría interna',
      description: 'El equipo añade ID estables a 2 400 operaciones, genera 60 números sin repetición y contrasta las filas. La herramienta selecciona identificadores; el método de muestreo y las conclusiones se documentan aparte.',
    },
    {
      title: 'Datos para una interfaz',
      description: 'Una persona genera enteros repetidos para comprobar un gráfico. Para el test automatizado posterior escribe casos deterministas, porque la salida del navegador no tiene semilla reproducible.',
    },
  ],
  notes: [
    'Mínimo y máximo forman parte de los posibles resultados.',
    'Los repetidos son correctos cuando se realizan extracciones independientes.',
    'Ordenar cambia la presentación, no los números que ya fueron elegidos.',
    'No hay semilla, historial, sello temporal ni acta descargable.',
    'Una muestra uniforme de IDs no corrige sesgos de la lista de origen.',
  ],
  faq: [
    {
      q: '¿El mínimo y el máximo pueden salir?',
      a: 'Sí. El intervalo es inclusivo. De −5 a 5 hay once resultados posibles, incluidos −5, 0 y 5.',
    },
    {
      q: '¿Cómo genero números aleatorios sin repetición?',
      a: 'Desmarca «Permitir repetidos» e indica una cantidad que no supere el número de enteros disponibles. Cada valor aparecerá como máximo una vez en esa ejecución.',
    },
    {
      q: '¿Por qué aparecen valores repetidos?',
      a: 'Porque la opción de repetición está activa y cada extracción vuelve a usar todo el intervalo. Desactívala cuando cada número deba ser único.',
    },
    {
      q: '¿Ordenar altera la probabilidad?',
      a: 'No altera el conjunto seleccionado. Sí elimina la información del orden de salida, por lo que no debe activarse si las posiciones representan una clasificación.',
    },
    {
      q: '¿Puedo repetir exactamente el mismo sorteo?',
      a: 'No. La página no acepta ni publica una semilla. Copia la salida si necesitas conservarla, pero entiende que eso no prueba todo el procedimiento.',
    },
    {
      q: '¿Sirve para un sorteo oficial?',
      a: 'No como única evidencia. Un proceso oficial puede requerir bases, registro, supervisión, trazabilidad y herramientas autorizadas según la jurisdicción.',
    },
  ],
  labels: {
    min: 'Número mínimo',
    max: 'Número máximo',
    count: 'Cantidad',
    allowDuplicates: 'Permitir números repetidos',
    sortResults: 'Ordenar resultados de menor a mayor',
    generate: 'Generar números',
    reset: 'Restablecer',
    copy: 'Copiar resultado',
    result: 'Números generados',
    placeholder: 'Los resultados aparecerán aquí',
    copied: 'Resultado copiado',
    integerError: 'Introduce mínimo, máximo y cantidad como números enteros; la cantidad debe ser al menos 1.',
    safeRangeError: 'Los extremos y el ancho completo deben permanecer dentro de los enteros seguros de JavaScript.',
    rangeError: 'El mínimo debe ser menor o igual que el máximo.',
    duplicateError: 'Sin repetición, la cantidad no puede superar los enteros disponibles.',
    countLimit: 'La cantidad máxima por ejecución es 100000.',
    cryptoError: 'Este navegador no ofrece una fuente aleatoria segura; no se ha generado ningún resultado.',
  },
  privacyNote: 'El intervalo y los números se procesan localmente con Web Crypto. FunnyTools no recibe ni conserva la entrada o la salida.',
  disclaimer: 'La herramienta produce enteros aleatorios, pero no certifica sorteos ni crea evidencia auditable. Para decisiones reguladas o de alto valor, utiliza el procedimiento autorizado y documenta la lista de origen.',
};

export const spanishRandomNumberPickerReview = {
  heading: 'Cómo comprobar una selección de números',
  intro: 'La revisión debe abarcar el intervalo, la regla de repetición, el significado del orden y la lista externa a la que apuntan los números.',
  panels: [
    { title: 'Parámetros', text: 'Confirma extremos inclusivos, cantidad y si cada valor puede aparecer más de una vez.' },
    { title: 'Resultado', text: 'Comprueba unicidad cuando corresponda y conserva el orden si representa puestos.' },
    { title: 'Procedimiento', text: 'Guarda fuente, elegibilidad y decisiones fuera de la página si hace falta rendir cuentas.' },
  ],
  checklistHeading: 'Lista de comprobación',
  checklist: [
    'El rango coincide con identificadores reales y no incluye huecos inválidos sin tratar.',
    'La cantidad cabe en el intervalo cuando los números deben ser únicos.',
    'La ordenación está desactivada si el orden de extracción tiene significado.',
    'Los elegidos se verifican contra la lista congelada antes de anunciar un resultado.',
  ],
};

export const spanishRandomNamePicker: ToolContent = {
  name: 'Sorteo de nombres aleatorio',
  short: 'Pega una entrada por línea y elige una o varias sin reemplazo, con opción de retirar los resultados de la lista.',
  long: 'Este selector sirve para sacar nombres, equipos, tareas o cualquier conjunto de textos. Limpia líneas vacías, conserva las entradas repetidas y utiliza `crypto.getRandomValues` para barajar la lista con Fisher–Yates. Dentro de una misma extracción no repite posiciones. La casilla «Retirar después del sorteo» decide si las personas elegidas siguen disponibles en pulsaciones posteriores. La animación es visual: el resultado ya está fijado antes de mostrarse.',
  seoTitle: 'Sorteo de nombres online | Selector aleatorio',
  seoDescription: 'Pega una entrada por línea y realiza un sorteo de nombres seguro en el navegador. Elige una o varias personas y retíralas si no deben repetirse.',
  keywords: [
    'sorteo de nombres',
    'selector de nombres aleatorio',
    'elegir nombre al azar',
    'sacar nombres online',
    'sorteo de personas',
    'lista de nombres aleatoria',
    'random name picker español',
  ],
  capabilities: [
    'Interpretar cada línea no vacía como una entrada independiente.',
    'Elegir una persona o varias sin reemplazo dentro de la misma ejecución.',
    'Retirar las entradas elegidas para que no participen en rondas posteriores.',
    'Conservar duplicados intencionales como participaciones separadas.',
    'Copiar el resultado sin subir la lista a FunnyTools.',
  ],
  contentSections: [
    {
      heading: 'Respuesta rápida: hacer un sorteo de nombres',
      paragraphs: [
        'Pega una entrada por línea, por ejemplo `Ana`, `Luis`, `Marta` y `Diego`. Para una sola persona, pulsa «Elegir una». Si necesitas un grupo, indica cuántas y pulsa «Elegir varias». El número no puede superar las entradas disponibles. Las líneas vacías se ignoran y los espacios al principio o al final se eliminan.',
        'Activa «Retirar después del sorteo» cuando un nombre no deba volver a salir en las rondas siguientes. Si la desactivas, el mismo conjunto vuelve a participar cada vez que pulsas. Copia la salida antes de recargar: la página no guarda la lista, los resultados ni un historial de rondas.',
      ],
    },
    {
      heading: 'Una entrada por línea y tratamiento de duplicados',
      paragraphs: [
        'Cada línea no vacía cuenta como una participación. Dos líneas con el texto `Ana` son dos entradas diferentes y duplican su presencia en la lista. La herramienta no puede saber si se trata de dos personas con el mismo nombre, una inscripción duplicada o una ponderación deliberada. Revisa la fuente antes de sortear.',
        'Cuando existen homónimos, añade un identificador que permita distinguirlos: `Ana · grupo A`, `Ana · grupo C` o un código neutral. Para una proyección pública evita correos, teléfonos, documentos y otros datos innecesarios. Un alias o número de participante suele bastar para identificar a la persona después en una lista privada.',
      ],
    },
    {
      heading: 'Qué significa seleccionar sin reemplazo',
      paragraphs: [
        'Al elegir varias entradas, se baraja una copia de toda la lista y se toman las primeras posiciones. Por ello una posición concreta no puede aparecer dos veces dentro de ese mismo resultado. Si había dos líneas idénticas, ambas posiciones sí pueden ser elegidas y la salida mostrará el mismo texto dos veces.',
        'La retirada actúa después de la elección. Con la casilla activa, las posiciones elegidas desaparecen del cuadro y la siguiente ronda trabaja con las restantes. Con la casilla desactivada, el cuadro no cambia y cualquier nombre puede regresar en una ejecución posterior. Estas dos reglas responden a necesidades distintas y conviene anunciarlas antes de comenzar.',
      ],
    },
    {
      heading: 'Barajado seguro y animación',
      paragraphs: [
        'La lista se baraja con Fisher–Yates. En cada paso se obtiene un índice mediante `crypto.getRandomValues` y muestreo por rechazo, evitando el sesgo de un módulo directo. Si Web Crypto no está disponible, la herramienta detiene el sorteo y muestra un error en vez de sustituir la fuente por `Math.random`.',
        'La sucesión rápida de nombres es una animación para que el cambio resulte visible. Los ganadores se determinan antes de iniciarla y no dependen del instante en que la pantalla se actualice. Cerrar la pestaña, cambiar el código del navegador o manipular el dispositivo quedan fuera de la garantía de esta interfaz; la animación tampoco aporta una prueba independiente de integridad.',
      ],
      link: {
        prefix: 'La fuente de índices procede de ',
        label: 'Crypto.getRandomValues en MDN',
        href: 'https://developer.mozilla.org/es/docs/Web/API/Crypto/getRandomValues',
        suffix: '.',
      },
    },
    {
      heading: 'Preparar una lista válida antes de elegir',
      paragraphs: [
        'Define quién puede participar, cuándo se cierra la lista y cómo se resuelven bajas o duplicados. Conserva una copia de la fuente antes de limpiar datos. Si se sortean premios, decide también si una persona puede ganar varias categorías, qué ocurre si no responde y en qué orden se contacta con suplentes.',
        'Para clase o equipo, verifica ausencias, disponibilidad y conflictos de rol. El azar distribuye una elección entre las entradas presentes, pero no evalúa carga de trabajo, accesibilidad, consentimiento o cualificación. Una asignación puede necesitar ajustes humanos explicados con transparencia.',
      ],
    },
    {
      heading: 'Privacidad de nombres y listas',
      paragraphs: [
        'El procesamiento ocurre en esta pestaña y FunnyTools no recibe la lista. Aun así, el contenido aparece en pantalla y puede quedar expuesto en una grabación, captura, historial del portapapeles o dispositivo compartido. Aplica minimización: usa el menor dato que permita reconocer a la persona dentro del contexto.',
        'En un aula proyectada, números o alias pueden reducir exposición. En una organización, sigue la base jurídica, el plazo de conservación y los controles internos aplicables. No pegues información médica, evaluaciones, contraseñas, identificadores oficiales ni comentarios sensibles. «Local» describe el cálculo de la herramienta, no todas las capas del equipo.',
      ],
      link: {
        prefix: 'Para comprender el principio de minimización, consulta la ',
        label: 'guía para ciudadanos de la AEPD',
        href: 'https://www.aepd.es/guias/guia-ciudadano.pdf',
        suffix: '.',
      },
    },
    {
      heading: 'Aulas, equipos y actividades',
      paragraphs: [
        'Un docente puede elegir quién comienza, formar un pequeño grupo o asignar preguntas. Conviene explicar la regla y permitir excepciones razonables antes del sorteo. Retirar a quien ya participó distribuye intervenciones durante la sesión; dejar la casilla desactivada simula selecciones independientes y puede repetir a una persona.',
        'En reuniones, sustituye nombres por tareas para repartir temas, salas o turnos. En juegos, cada línea puede ser un reto o una localización. El selector no forma equipos equilibrados por nivel, horario o tamaño; para eso hacen falta atributos adicionales y una regla de asignación que esta página no implementa.',
      ],
    },
    {
      heading: 'Límites de un sorteo informal',
      paragraphs: [
        'No se registra la hora exacta, la lista inicial, los cambios, el número de intentos ni la persona que pulsó. Tampoco hay semilla reproducible, firma, compromiso previo o exportación de acta. Copiar el resultado es útil para trabajar, pero no convierte el proceso en auditable.',
        'En promociones comerciales, adjudicaciones, selección laboral o decisiones con consecuencias relevantes, revisa normas, posibles sesgos y obligaciones legales. Puede ser necesario un proveedor autorizado, supervisión independiente o un procedimiento documentado. La aleatoriedad de los índices no responde por la validez de la lista ni por el trato posterior.',
      ],
    },
  ],
  instructions: [
    'Prepara la lista y escribe una entrada identificable por línea.',
    'Elimina duplicados accidentales y distingue homónimos con códigos o grupos.',
    'Elige una persona o indica cuántas deben salir en la misma ejecución.',
    'Activa la retirada si los seleccionados no deben participar en rondas posteriores.',
    'Copia el resultado y conserva por separado la fuente y las reglas cuando necesites trazabilidad.',
  ],
  examples: [
    'Elegir tres portavoces de una lista de equipos sin repetir posiciones.',
    'Sacar una persona para responder y retirarla durante el resto de la clase.',
    'Sortear tareas de una retrospectiva sin introducir datos personales.',
    'Seleccionar suplentes y conservar el orden exacto de aparición.',
  ],
  audience: [
    'Docentes que organizan intervenciones, preguntas y turnos.',
    'Facilitadores de talleres, comunidades y reuniones.',
    'Organización de actividades informales con una lista ya validada.',
    'Grupos que prefieren decidir entre opciones escritas sin sesgo visible del moderador.',
  ],
  caseStudies: [
    {
      title: 'Dos alumnas con el mismo nombre',
      description: 'La profesora usa `Lucía · 08` y `Lucía · 21` en vez de duplicar un texto indistinguible. Proyecta solo esos identificadores y consulta la relación completa en su lista autorizada.',
    },
    {
      title: 'Tres suplentes en orden',
      description: 'Una actividad elige cuatro entradas en una ejecución: una titular y tres suplentes. Copia el orden sin volver a sortear y valida que todas cumplan las reglas publicadas.',
    },
    {
      title: 'Rondas sin repetir',
      description: 'Un taller activa la retirada y elige una persona por ronda. La lista visible disminuye; al terminar guarda el registro en su documento, porque recargar FunnyTools no recupera el historial.',
    },
  ],
  notes: [
    'Cada línea idéntica es otra participación y puede aumentar la probabilidad de ese texto.',
    'La selección de varias entradas no repite posiciones dentro de una ejecución.',
    'La retirada afecta a rondas futuras, no al resultado que ya se generó.',
    'La animación no decide el ganador ni certifica el sorteo.',
    'La lista y el resultado no se guardan en una cuenta de FunnyTools.',
  ],
  faq: [
    {
      q: '¿Cómo separo los nombres?',
      a: 'Escribe una entrada por línea. Las líneas vacías se ignoran y se eliminan espacios exteriores.',
    },
    {
      q: '¿Qué ocurre si un nombre aparece dos veces?',
      a: 'Cuenta como dos entradas. Si es un error, elimínalo; si son personas distintas, añade un código para reconocer cada posición.',
    },
    {
      q: '¿Puede repetirse una persona?',
      a: 'No dentro de una selección de varias posiciones. Entre pulsaciones posteriores puede volver a salir si no activas la retirada.',
    },
    {
      q: '¿La animación decide cuándo se detiene el sorteo?',
      a: 'No. El resultado se fija primero con el barajado seguro y después se muestra la animación.',
    },
    {
      q: '¿La lista se envía al servidor?',
      a: 'No se envía a FunnyTools. Protege igualmente la pantalla, el portapapeles, las extensiones y el dispositivo.',
    },
    {
      q: '¿Sirve como prueba de un sorteo oficial?',
      a: 'No. No conserva lista inicial, historial, marca de tiempo, semilla ni acta. Usa el procedimiento exigido para procesos formales.',
    },
  ],
  labels: {
    input: 'Nombres u opciones, una entrada por línea',
    placeholder: 'Ana · grupo A\nLuis · grupo B\nMarta · grupo C\nDiego · grupo D',
    pickOne: 'Elegir una',
    pickMany: 'Elegir varias',
    countLabel: 'Cantidad de seleccionados',
    removePicked: 'Retirar después del sorteo',
    reset: 'Restablecer ejemplo',
    result: 'Resultado del sorteo',
    emptyResult: 'Los nombres elegidos aparecerán aquí',
    emptyListError: 'Introduce al menos un nombre o una opción.',
    tooManyError: 'La cantidad no puede superar las entradas disponibles.',
    invalidCountError: 'Introduce una cantidad válida de al menos 1.',
    copy: 'Copiar resultado',
    copied: 'Resultado copiado',
    spinning: 'Realizando el sorteo…',
    cryptoError: 'Este navegador no ofrece una fuente aleatoria segura; no se ha realizado el sorteo.',
  },
  privacyNote: 'Los nombres se barajan dentro de este navegador y no se envían a FunnyTools. Utiliza alias o identificadores cuando una pantalla o portapapeles compartidos puedan exponer datos.',
  disclaimer: 'El selector facilita decisiones informales, pero no valida participantes ni crea una prueba auditable. Revisa reglas y obligaciones antes de usarlo en promociones o decisiones relevantes.',
};

export const spanishRandomNamePickerReview = {
  heading: 'Cómo revisar un sorteo de nombres',
  intro: 'La calidad del resultado comienza con una lista válida y una regla clara sobre duplicados, retirada y orden.',
  panels: [
    { title: 'Lista', text: 'Una línea equivale a una entrada; distingue homónimos y elimina duplicados accidentales.' },
    { title: 'Regla', text: 'Decide antes cuántas personas salen y si continuarán en rondas posteriores.' },
    { title: 'Privacidad', text: 'Muestra alias o códigos y conserva datos completos únicamente en el sistema autorizado.' },
  ],
  checklistHeading: 'Lista de comprobación',
  checklist: [
    'La fuente estaba cerrada y contenía únicamente entradas elegibles.',
    'Los textos repetidos son intencionales o están diferenciados.',
    'La retirada coincide con la regla anunciada para rondas posteriores.',
    'El resultado se copió con su orden antes de cambiar la lista.',
  ],
};

export const spanishRandomWheel: ToolContent = {
  name: 'Ruleta aleatoria',
  short: 'Crea una ruleta con una opción por línea, gira con selección segura y muestra el resultado tras una animación.',
  long: 'La ruleta divide el círculo en segmentos iguales para todas las líneas no vacías. Antes de animar, elige un índice mediante `crypto.getRandomValues` y muestreo por rechazo; el giro visual termina en ese segmento. Las líneas duplicadas ocupan varias porciones y aumentan deliberadamente el peso del mismo texto. No hay eliminación automática, historial, ponderaciones personalizadas ni prueba verificable del giro.',
  seoTitle: 'Ruleta aleatoria online de nombres',
  seoDescription: 'Pega nombres u opciones y gira una ruleta aleatoria en el navegador. Cada línea tiene la misma probabilidad; los duplicados cuentan varias veces.',
  keywords: [
    'ruleta aleatoria',
    'ruleta de nombres',
    'ruleta online',
    'girar ruleta',
    'ruleta de opciones',
    'ruleta para sorteo',
    'selector aleatorio visual',
  ],
  capabilities: [
    'Crear un segmento igual por cada línea no vacía.',
    'Elegir el segmento ganador con Web Crypto antes de iniciar la animación.',
    'Representar duplicados como peso adicional de forma explícita.',
    'Copiar el texto completo del resultado aunque la etiqueta visible se abrevie.',
    'Restablecer un ejemplo sin crear una cuenta ni enviar las opciones a FunnyTools.',
  ],
  contentSections: [
    {
      heading: 'Respuesta rápida: crear y girar una ruleta',
      paragraphs: [
        'Sustituye el ejemplo por tus opciones, una en cada línea. El círculo se actualiza y asigna el mismo ángulo a cada entrada. Pulsa «Girar la ruleta» y espera a que termine la animación. El texto ganador aparece debajo y puede copiarse al portapapeles.',
        'Con una sola opción no existe una elección: la página la muestra como resultado y avisa de esa condición. Para una decisión real incluye al menos dos alternativas distintas. Si quieres retirar el resultado, elimina manualmente su línea antes del siguiente giro o utiliza el sorteo de nombres, que dispone de una casilla de retirada.',
      ],
    },
    {
      heading: 'Misma probabilidad por línea',
      paragraphs: [
        'Cada línea no vacía genera un segmento del mismo tamaño. Con cuatro líneas, cada posición tiene una probabilidad teórica de 1/4. Los colores sirven para distinguir zonas, pero no crean pesos. Los espacios exteriores se eliminan y las líneas vacías no entran en el cálculo.',
        'Una ruleta no recuerda resultados anteriores. Que una opción haya ganado no reduce su probabilidad en el giro siguiente. Las rachas y repeticiones son compatibles con extracciones independientes. Si necesitas turnos sin repetición, edita la lista después de cada resultado o utiliza una herramienta diseñada para seleccionar sin reemplazo.',
      ],
    },
    {
      heading: 'Las líneas duplicadas cambian el peso',
      paragraphs: [
        'Dos líneas idénticas crean dos segmentos. Si `Azul` aparece dos veces y `Rojo` una, el texto Azul ocupa dos de tres posiciones y su probabilidad es 2/3. Esto puede usarse como ponderación por unidades enteras, pero debe ser intencional y visible para quienes aceptan la regla.',
        'Para probabilidades como 35 % o pesos decimales, repetir líneas resulta difícil de revisar y puede producir errores. Esta interfaz no ofrece campos de peso ni calcula porcentajes personalizados. Prepara una lista sin duplicados cuando todas las alternativas deban tener la misma oportunidad y revisa el número de líneas antes de girar.',
      ],
    },
    {
      heading: 'El resultado se decide antes de la animación',
      paragraphs: [
        'Al pulsar, la página obtiene un índice con `crypto.getRandomValues`. El muestreo por rechazo elimina el sesgo que podría favorecer ciertos índices cuando la cantidad de segmentos no divide exactamente el espacio de enteros. Si la API segura falta, no se selecciona ningún resultado y el círculo no comienza el giro.',
        'Después se calcula un ángulo que lleva el centro del segmento elegido hasta el indicador y se anima durante unos segundos. La velocidad aparente, la desaceleración y el momento de repintado no escogen al ganador. Esta separación evita depender de la tasa de fotogramas, aunque la animación sigue siendo una presentación y no una evidencia criptográfica para terceros.',
      ],
      link: {
        prefix: 'La selección usa la interfaz ',
        label: 'Crypto.getRandomValues documentada por MDN',
        href: 'https://developer.mozilla.org/es/docs/Web/API/Crypto/getRandomValues',
        suffix: '.',
      },
    },
    {
      heading: 'Etiquetas largas y muchas opciones',
      paragraphs: [
        'El lienzo mide 420 × 420 píxeles internos y se adapta al ancho disponible. Para mantener las etiquetas dentro del círculo, el texto visible se limita a 18 caracteres y añade puntos suspensivos cuando hace falta. La entrada completa conserva su valor y aparece sin recorte en el resultado.',
        'A medida que crece el número de líneas, cada segmento se estrecha y las etiquetas se superponen o dejan de ser útiles. La probabilidad sigue vinculada a las posiciones, pero la lectura empeora. Para listas largas, asigna códigos breves o utiliza el selector de nombres con salida textual. No interpretes la legibilidad del dibujo como validación de que todas las entradas sean distintas.',
      ],
    },
    {
      heading: 'Ruleta de nombres para clase o reuniones',
      paragraphs: [
        'En clase puede contener temas, ejercicios o números de grupo. Explica si la opción ganadora se elimina o vuelve a participar y ofrece alternativas cuando una elección tenga efectos personales. En una reunión puede decidir el primer tema, un orden informal o una actividad breve; no debería sustituir criterios de responsabilidad o competencia.',
        'Para proyectar nombres, usa alias o identificadores y evita datos personales adicionales. La ruleta se procesa en la pestaña, pero otras personas pueden ver la pantalla o grabarla. Si el objetivo es seleccionar varias personas, el sorteo de nombres muestra una lista textual más fácil de copiar y permite retirar las elegidas.',
      ],
    },
    {
      heading: 'Qué conviene registrar en un sorteo',
      paragraphs: [
        'Antes de girar, fija la lista, elimina duplicados accidentales y comunica cómo se tratarán ausencias, ganadores anteriores y suplentes. Si el proceso necesita revisión, conserva la fuente, las reglas y el resultado en un sistema externo. FunnyTools no proporciona historial de giros, hora firmada, exportación de acta ni registro de cambios.',
        'Una captura del segmento final tampoco demuestra que no hubo intentos descartados. Para promociones comerciales o premios relevantes pueden exigirse bases, supervisión y mecanismos específicos. La interfaz es apropiada para decisiones cotidianas y actividades visuales; no se presenta como ruleta oficial, certificada o invulnerable a la manipulación del dispositivo.',
      ],
    },
    {
      heading: 'Privacidad, accesibilidad y límites visuales',
      paragraphs: [
        'Las opciones no se envían a FunnyTools. El resultado copiado pasa al portapapeles y el contenido permanece visible hasta que lo sustituyas o cierres la pestaña. Usa datos ficticios o códigos cuando trabajes en un equipo compartido. La herramienta no guarda configuraciones ni recupera una ruleta tras recargar.',
        'El color y el movimiento no deben ser la única forma de comunicar el resultado; por eso se muestra también como texto en una región de estado. Personas sensibles al movimiento pueden preferir el selector de nombres, aunque esta versión no incluye un control para reducir la duración. La página no ofrece audio, lectura automática de todas las opciones ni personalización de contraste.',
      ],
    },
  ],
  instructions: [
    'Escribe una opción por línea y elimina duplicados que no representen un peso deliberado.',
    'Comprueba que todas las alternativas visibles cumplen la regla anunciada.',
    'Pulsa «Girar la ruleta» y espera al resultado textual bajo el círculo.',
    'Copia el ganador; si no debe repetirse, borra su línea antes del siguiente giro.',
    'Para procesos que necesiten prueba, registra lista, reglas y resultado en un sistema autorizado.',
  ],
  examples: [
    'Elegir entre cuatro temas para comenzar una sesión de repaso.',
    'Girar una ruleta de restaurantes con una entrada por establecimiento.',
    'Seleccionar un reto breve en una actividad de equipo.',
    'Usar códigos de participantes en una dinámica proyectada, sin mostrar datos completos.',
  ],
  audience: [
    'Docentes y facilitadores que necesitan una elección visual y fácil de seguir.',
    'Equipos que deciden entre temas o actividades de bajo riesgo.',
    'Familias y grupos que comparan opciones cotidianas.',
    'Creadores de dinámicas que quieren mostrar el resultado además de copiarlo.',
  ],
  caseStudies: [
    {
      title: 'Opciones con el mismo peso',
      description: 'Un grupo introduce seis restaurantes una sola vez cada uno. Revisa las líneas, gira y acepta el resultado; una repetición accidental habría dado más probabilidad a ese establecimiento.',
    },
    {
      title: 'Ronda de preguntas',
      description: 'La profesora utiliza códigos de temas breves para que el lienzo sea legible. Tras cada giro elimina el tema resuelto, ya que la ruleta no retira opciones automáticamente.',
    },
    {
      title: 'Lista demasiado larga',
      description: 'Una actividad con ochenta participantes produce segmentos ilegibles. El equipo cambia al selector de nombres y conserva la ruleta únicamente para ocho categorías.',
    },
  ],
  notes: [
    'Cada línea tiene la misma probabilidad; repetir texto añade segmentos y aumenta su peso.',
    'El ganador queda fijado antes de comenzar el movimiento.',
    'Las etiquetas largas se abrevian en el círculo, pero el resultado conserva el texto completo.',
    'La opción ganadora no se elimina automáticamente.',
    'No hay historial, semilla, pesos decimales ni acta verificable.',
  ],
  faq: [
    {
      q: '¿Cada opción tiene la misma probabilidad?',
      a: 'Sí, cada línea no vacía ocupa un segmento igual. Si un texto aparece varias veces, suma varios segmentos y aumenta su probabilidad.',
    },
    {
      q: '¿La animación decide el ganador?',
      a: 'No. Primero se elige un índice con Web Crypto y después la animación lleva ese segmento al indicador.',
    },
    {
      q: '¿Por qué la etiqueta aparece cortada?',
      a: 'El círculo abrevia textos de más de 18 caracteres para reducir solapamientos. El resultado inferior conserva la opción completa.',
    },
    {
      q: '¿Se elimina la opción ganadora?',
      a: 'No. Debes borrar su línea antes del giro siguiente o usar el selector de nombres con retirada automática.',
    },
    {
      q: '¿Puedo asignar pesos porcentuales?',
      a: 'No hay campos de peso. Repetir líneas crea pesos enteros, pero para porcentajes precisos conviene una herramienta que los muestre y valide.',
    },
    {
      q: '¿Esta ruleta sirve para un sorteo oficial?',
      a: 'No como procedimiento completo. No registra intentos, lista inicial, hora, semilla ni evidencia independiente.',
    },
  ],
  labels: {
    input: 'Opciones, una por línea',
    placeholder: 'Tema A\nTema B\nTema C\nTema D',
    spin: 'Girar la ruleta',
    copy: 'Copiar resultado',
    clear: 'Restablecer ejemplo',
    result: 'Opción elegida',
    waiting: 'Ruleta preparada',
    emptyError: 'Introduce al menos una opción.',
    copied: 'Resultado copiado',
    oneOption: 'Solo hay una opción; será el resultado.',
    cryptoError: 'Este navegador no ofrece una fuente aleatoria segura; la ruleta no ha elegido un resultado.',
  },
  privacyNote: 'Las opciones y el resultado permanecen en este navegador y no se envían a FunnyTools. Protege la pantalla y el portapapeles si contienen identificadores personales.',
  disclaimer: 'La ruleta es una ayuda visual para decisiones cotidianas. No registra ni certifica el proceso y no sustituye controles legales, de elegibilidad o auditoría.',
};

export const spanishRandomWheelReview = {
  heading: 'Cómo comprobar una ruleta aleatoria',
  intro: 'Antes de girar, revisa el número de líneas, los duplicados, la regla para rondas posteriores y el nivel de evidencia necesario.',
  panels: [
    { title: 'Segmentos', text: 'Cada línea crea una posición igual; los duplicados aumentan el peso de ese texto.' },
    { title: 'Resultado', text: 'La selección ocurre antes de la animación y se confirma mediante texto bajo el círculo.' },
    { title: 'Siguiente giro', text: 'El ganador permanece en la lista hasta que lo elimines manualmente.' },
  ],
  checklistHeading: 'Lista de comprobación',
  checklist: [
    'Cada alternativa aparece el número de veces previsto.',
    'Las etiquetas abreviadas pueden identificarse sin ambigüedad.',
    'Se ha acordado si el ganador seguirá participando.',
    'El procedimiento formal se registra fuera de la ruleta cuando corresponde.',
  ],
};
