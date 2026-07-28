import type { ToolContent } from '../tools/_types';

export const spanishSeatingChart: ToolContent = {
  name: 'Creador de planos de asientos para el aula',
  short: 'Convierte una lista de estudiantes en un plano por filas y columnas, conserva el orden o baraja con una fuente segura y descarga un CSV identificable.',
  long: 'Este creador de planos de asientos organiza una lista en una cuadrícula de hasta 20 filas por 20 columnas. Puedes rellenar por filas o por columnas, mantener el orden original o generar una distribución aleatoria, copiar el plano, exportar cada asiento a CSV e imprimir desde el navegador. El resultado es un borrador operativo: no conoce necesidades visuales, auditivas, motrices, emocionales, médicas ni de convivencia, por lo que la revisión docente sigue siendo imprescindible.',
  seoTitle: 'Crear plano de asientos del aula | CSV',
  seoDescription: 'Pega la lista, elige filas y columnas y crea un plano de asientos para clase o examen. Baraja de forma segura, copia, imprime o descarga CSV.',
  keywords: [
    'crear plano de asientos aula',
    'generador de asientos de clase',
    'distribución de alumnos en el aula',
    'plano de clase online',
    'organizador de pupitres',
    'asientos aleatorios examen',
    'plantilla de asientos aula',
    'seating chart español',
  ],
  capabilities: [
    'Distribuir hasta 400 posiciones en una cuadrícula de 1 a 20 filas y de 1 a 20 columnas.',
    'Mantener la lista original o barajarla con Web Crypto y sin recurrir a Math.random.',
    'Rellenar de izquierda a derecha por filas o de arriba abajo por columnas.',
    'Mostrar como vacías las posiciones que sobran, útiles para pasillos o reservas.',
    'Copiar una versión tabulada, imprimirla o guardarla como PDF mediante el diálogo del navegador.',
    'Exportar fila, columna, número de asiento y nombre en un CSV protegido frente a fórmulas de hoja de cálculo.',
  ],
  contentSections: [
    {
      heading: 'Respuesta rápida: cómo crear un plano de clase',
      paragraphs: [
        'Pega un nombre por línea, indica cuántas filas y columnas tiene la zona que quieres representar y comprueba que el total de celdas alcance para toda la lista. Elige «Por filas» si la lectura debe avanzar de izquierda a derecha antes de bajar; elige «Por columnas» si cada columna debe completarse de arriba abajo. Activa Barajar solo cuando una distribución aleatoria tenga sentido. Pulsa Crear plano, revisa el resultado y, después de hacer los ajustes humanos necesarios, copia, imprime o descarga el CSV.',
        'La cuadrícula representa posiciones, no distancias físicas. Cinco columnas no dicen cuánto mide cada pupitre ni si cabe un pasillo accesible. El número de asiento siempre sigue la lectura visual por filas, mientras que el nombre puede introducirse por filas o por columnas. Esa diferencia es deliberada: permite que el asiento 1 siga siendo la esquina superior izquierda incluso cuando la lista se reparte verticalmente.',
      ],
      items: [
        'Ejemplo: 28 estudiantes caben en 5 filas por 6 columnas y quedan 2 posiciones vacías.',
        'Para un examen, confirma orientación, entradas, salidas y sentido de las filas antes de imprimir.',
        'Para mesas agrupadas, modela cada mesa como una pequeña cuadrícula o usa varias copias del resultado.',
        'Añade un identificador cuando dos personas comparten el mismo nombre.',
      ],
    },
    {
      heading: 'El plano es un borrador, no una decisión automática',
      paragraphs: [
        'Una distribución aleatoria puede reducir la impresión de favoritismo, pero no convierte el azar en una decisión pedagógica correcta. La herramienta desconoce quién necesita ver mejor la pizarra, oír con claridad, disponer de un itinerario sin obstáculos, sentarse cerca de un apoyo, evitar un desencadenante o utilizar tecnología de asistencia. También ignora relaciones de cuidado, seguridad, conflictos y acuerdos del centro. Por eso la secuencia responsable es generar, revisar, ajustar y comunicar; no proyectar el primer resultado como definitivo.',
        'INTEF señala que los procesos de enseñanza deben diseñarse al servicio de un alumnado diverso y que los recursos del aula han de responder a criterios de accesibilidad. Sus materiales sobre DUA incluyen flexibilidad en los asientos y el posicionamiento físico. El generador ayuda a representar una propuesta, pero la inclusión aparece en las decisiones que tomas después: mantener pasillos, reservar posiciones, escuchar preferencias justificadas y revisar si cada estudiante puede participar.',
      ],
    },
    {
      heading: 'Cómo revisar accesibilidad, visión, audición y movilidad',
      paragraphs: [
        'Empieza por el recorrido real, no por la estética de la cuadrícula. Localiza puertas, salidas, escalones, columnas, enchufes, zonas de paso y el lugar desde el que se presentan contenidos. Comprueba que una persona que usa silla de ruedas, muletas u otra ayuda pueda llegar a su posición y girar sin depender de que el resto se levante. Una celda vacía puede representar un pasillo, pero el CSV no guarda su anchura; anota esa medida en el plano físico o en el documento de trabajo.',
        'La primera fila no es una solución universal. La distancia útil depende de la pizarra, el tamaño del texto, los reflejos, la iluminación, la lateralidad y la forma de participación. Evita registrar diagnósticos o motivos médicos en el nombre del asiento. Si una adaptación es necesaria, documenta la decisión en el sistema autorizado por el centro y deja en el plano compartido solo la información operativa mínima.',
      ],
      items: [
        '¿Se ve la pizarra sin giros sostenidos ni reflejos?',
        '¿Se oye a quien habla y se accede al sistema de apoyo disponible?',
        '¿Hay una ruta practicable hasta la puerta, el material y la mesa?',
        '¿La ubicación permite participar sin aislar a la persona?',
      ],
    },
    {
      heading: 'Asientos para examen: qué resuelve y qué no',
      paragraphs: [
        'Para un examen, barajar la lista puede crear un primer reparto sin patrón alfabético. No garantiza por sí solo integridad académica. El docente todavía debe aplicar las normas del centro, separar posiciones cuando el espacio lo permita, prever versiones de prueba, controlar pertenencias, registrar ausencias y atender adaptaciones autorizadas. Si el aula se divide en sectores, añade ese código al identificador antes de pegar la lista o separa cada sector en un archivo distinto.',
        'La herramienta bloquea nombres idénticos porque un CSV con dos entradas indistinguibles no permite saber a quién corresponde cada asiento. No intenta deducir apellidos ni fusionar personas. Usa una convención mínima como «Ana P.» y «Ana R.» o un identificador interno que el grupo comprenda. Evita números oficiales, correos, teléfonos o información que no sea necesaria para localizar el asiento.',
      ],
    },
    {
      heading: 'Barajado seguro, límites del azar y reproducibilidad',
      paragraphs: [
        'Cuando Barajar está activado, la página aplica Fisher–Yates y obtiene cada índice mediante crypto.getRandomValues. Además usa rechazo para evitar el pequeño sesgo que aparecería al reducir sin control un entero aleatorio con la operación módulo. Si el navegador no ofrece una fuente segura, la página no finge aleatoriedad: muestra un error. Puedes desactivar Barajar y conservar el orden original.',
        'Seguro no significa reproducible. No se guarda una semilla y el mismo listado puede producir otro plano al pulsar de nuevo. Si debes demostrar qué distribución se usó, exporta el CSV inmediatamente, añade fecha y grupo en tu sistema de archivos y conserva esa copia. El orden aleatorio tampoco compensa una lista incompleta: elimina ausencias o añade reservas antes de generar.',
      ],
    },
    {
      heading: 'CSV, impresión, privacidad y control de versiones',
      paragraphs: [
        'El CSV contiene cuatro columnas: fila, columna, asiento y nombre. Cada celda se encierra entre comillas. Si un nombre empieza por =, +, -, @ o sus equivalentes de ancho completo, la exportación antepone un tabulador para reducir el riesgo de que Excel, Google Sheets u otra hoja lo interprete como fórmula. Esta defensa no sustituye las políticas del programa receptor; revisa la importación antes de compartir.',
        'La página no guarda la lista ni el plano. Editar cualquier campo invalida el resultado anterior para impedir que descargues sin querer un CSV obsoleto. La impresión utiliza el diálogo del navegador, donde puedes elegir papel o «Guardar como PDF». Antes de proyectar o publicar, decide si deben aparecer nombres completos. Un código de asiento o nombre corto suele ser suficiente para una puerta de aula.',
      ],
    },
  ],
  instructions: [
    'Pega un estudiante o participante por línea y elimina líneas vacías, ausencias y duplicados sin identificar.',
    'Introduce filas y columnas entre 1 y 20; confirma que filas por columnas sea igual o mayor que la lista.',
    'Elige el sentido de relleno: por filas o por columnas.',
    'Activa Barajar si necesitas una propuesta aleatoria; desactívalo si la lista ya tiene el orden deseado.',
    'Pulsa Crear plano y revisa pasillos, accesibilidad, visión, audición, convivencia y normas del examen.',
    'Copia, imprime o descarga `plano-asientos-aula.csv` y abre el archivo para verificarlo.',
  ],
  examples: [
    'Crear un plano provisional de 5 × 6 para una clase de 28 estudiantes.',
    'Preparar asientos de examen sin seguir el orden alfabético y conservar el CSV usado.',
    'Representar posiciones de un taller, una formación o una actividad de campamento.',
    'Reservar celdas vacías para pasillos, equipo técnico o participantes que llegarán después.',
    'Comparar relleno por filas y por columnas antes de imprimir la versión definitiva.',
  ],
  audience: [
    'Docentes y tutores que preparan la distribución ordinaria del aula.',
    'Coordinadores de exámenes, talleres y formaciones presenciales.',
    'Equipos que necesitan una cuadrícula imprimible o un CSV de posiciones.',
    'Personas que quieren una propuesta aleatoria local y revisable, no una decisión automática.',
  ],
  caseStudies: [
    {
      title: 'Inicio de trimestre con revisión inclusiva',
      description: 'Una tutora crea 30 posiciones, conserva dos huecos como pasillo y revisa la propuesta con las adaptaciones autorizadas. Imprime solo nombres cortos para el aula y guarda la versión completa en el sistema interno.',
    },
    {
      title: 'Examen en dos sectores',
      description: 'El responsable añade A o B a cada identificador, baraja la lista y exporta el CSV. Comprueba que cada sector cumple las reglas de separación y conserva el archivo como evidencia operativa.',
    },
    {
      title: 'Taller con asistentes de última hora',
      description: 'La organización deja cuatro celdas vacías, imprime el plano y asigna esas posiciones al registrar nuevas llegadas. No incluye correos ni teléfonos en la lista proyectada.',
    },
  ],
  notes: [
    'La cuadrícula no representa medidas, mobiliario, puertas, obstáculos ni anchura de pasillos.',
    'El azar no conoce necesidades educativas, médicas, sensoriales, motrices ni de convivencia.',
    'Filas y columnas admiten valores enteros de 1 a 20; la capacidad máxima es 400.',
    'Los nombres idénticos se bloquean hasta que añadas un identificador.',
    'El resultado no se guarda y cambia al volver a barajar; conserva el CSV que realmente utilizaste.',
    'La impresión depende del navegador y del sistema; comprueba orientación, escala y saltos de página.',
  ],
  faq: [
    {
      q: '¿Cómo hago un plano de asientos para 30 alumnos?',
      a: 'Una cuadrícula de 5 × 6 tiene 30 posiciones exactas. También puedes usar 6 × 6 y reservar seis huecos. Confirma qué lado representa el frente antes de imprimir.',
    },
    {
      q: '¿Puedo dejar asientos vacíos?',
      a: 'Sí. Cuando hay más celdas que nombres, las restantes aparecen como vacías. Decide si representan pasillos, reservas o posiciones no usadas.',
    },
    {
      q: '¿La distribución aleatoria es realmente segura?',
      a: 'Usa Web Crypto y rechazo de sesgo para elegir los intercambios. No usa Math.random ni una fuente alternativa insegura. Aun así, el azar no decide qué asiento es adecuado para cada necesidad.',
    },
    {
      q: '¿Puedo recuperar el mismo plano más tarde?',
      a: 'No mediante una semilla. Descarga el CSV, imprime o guarda como PDF la versión que vas a utilizar.',
    },
    {
      q: '¿Por qué no acepta dos nombres iguales?',
      a: 'Porque el asiento y el CSV quedarían ambiguos. Añade un número, una inicial del apellido o un alias acordado.',
    },
    {
      q: '¿El CSV se abre en Excel y Google Sheets?',
      a: 'Es un CSV UTF-8 con BOM y celdas entre comillas. Suele abrirse correctamente, pero revisa el separador y la importación en tu programa.',
    },
    {
      q: '¿La herramienta guarda datos del alumnado?',
      a: 'No. La lista y la cuadrícula permanecen en la pestaña. FunnyTools no recibe el contenido.',
    },
    {
      q: '¿Sirve para mesas redondas o un aula irregular?',
      a: 'Solo como aproximación por celdas. Para geometría real, dibuja un plano específico y utiliza esta lista como apoyo de asignación.',
    },
  ],
  labels: {
    input: 'Lista de estudiantes',
    placeholder: 'Una persona por línea...\nAna P.\nLuis M.\nMarta R.',
    rows: 'Filas',
    columns: 'Columnas',
    shuffle: 'Barajar de forma segura',
    fillMode: 'Sentido de relleno',
    rowMode: 'Por filas',
    columnMode: 'Por columnas',
    generate: 'Crear plano',
    copy: 'Copiar plano',
    exportCsv: 'Descargar CSV',
    print: 'Imprimir',
    reset: 'Restablecer',
    seatLabel: 'Asiento',
    csvRow: 'Fila',
    csvColumn: 'Columna',
    csvName: 'Nombre',
    csvFilename: 'plano-asientos-aula.csv',
    emptySeat: 'Vacío',
    emptyResult: 'El plano de asientos aparecerá aquí',
    emptyListError: 'Introduce al menos una persona.',
    duplicateListError: 'Hay nombres idénticos. Añade un número, inicial del apellido o alias para distinguirlos.',
    invalidGrid: 'Filas y columnas deben ser números enteros entre 1 y 20.',
    tooManyStudents: 'La lista supera el número de asientos. Aumenta las filas o las columnas.',
    cryptoError: 'El navegador no ofrece una fuente de azar segura. Desactiva Barajar para conservar el orden original.',
    copied: 'Plano copiado',
  },
  sources: [
    {
      label: 'INTEF: Accesibilidad e inclusión en el aula',
      href: 'https://formacion.intef.es/aulaenabierto/mod/book/tool/print/index.php?id=5245',
      note: 'Sitúa el diseño del proceso educativo al servicio de un alumnado diverso y destaca accesibilidad y DUA.',
    },
    {
      label: 'INTEF: Diseño Universal para el Aprendizaje',
      href: 'https://formacion.intef.es/aulaenabierto/mod/book/tool/print/index.php?chapterid=12729&id=8446',
      note: 'Incluye flexibilidad en asientos, posicionamiento, iluminación y acceso a tecnologías de asistencia.',
    },
    {
      label: 'CAST: Pautas DUA 3.0 en español',
      href: 'https://udlguidelines.cast.org/more/downloads/',
      note: 'Ofrece la versión española del marco para anticipar barreras y diseñar opciones de acceso y participación.',
    },
    {
      label: 'MDN: Crypto.getRandomValues()',
      href: 'https://developer.mozilla.org/es/docs/Web/API/Crypto/getRandomValues',
      note: 'Documenta la fuente criptográficamente sólida que usa el barajado.',
    },
    {
      label: 'OWASP: CSV Injection',
      href: 'https://owasp.org/www-community/attacks/CSV_Injection',
      note: 'Explica por qué valores que comienzan por caracteres de fórmula requieren tratamiento al exportar.',
    },
  ],
  privacyNote: 'La lista, el barajado y el plano se procesan en esta pestaña. FunnyTools no recibe ni almacena nombres. La copia, el CSV y la impresión solo se crean cuando tú los solicitas.',
  disclaimer: 'Herramienta de planificación. La distribución final debe respetar accesibilidad, adaptaciones autorizadas, seguridad, convivencia, privacidad y normas del centro o del examen.',
};

export const spanishSeatingChartReview = {
  heading: 'Revisión del plano antes de utilizarlo',
  intro: 'Un plano válido no solo hace caber la lista: debe poder ejecutarse en el espacio real y permitir participar.',
  panels: [
    { title: 'Espacio', text: 'Comprueba puertas, pasillos, mobiliario, iluminación y orientación real.' },
    { title: 'Personas', text: 'Aplica adaptaciones y acuerdos sin exponer el motivo en el plano compartido.' },
    { title: 'Archivo', text: 'Abre el CSV o la impresión que realmente se va a usar y registra la versión.' },
  ],
  checklistHeading: 'Lista de comprobación',
  checklist: [
    'Toda persona tiene una posición identificable y no hay nombres ambiguos.',
    'Los recorridos y salidas permanecen practicables.',
    'Visión, audición, movilidad y participación se revisaron.',
    'El frente y el sentido de las filas están indicados fuera de la cuadrícula.',
    'La versión compartida contiene solo los datos necesarios.',
  ],
};

export const spanishClassGroupGenerator: ToolContent = {
  name: 'Creador de grupos para clase',
  short: 'Divide una lista por número de equipos o por tamaño máximo, baraja de forma segura, copia el reparto y descarga un CSV para trabajar después.',
  long: 'Este creador de grupos para clase ofrece dos decisiones distintas: indicar cuántos equipos necesitas o cuántas personas debe tener cada equipo. Puedes conservar el orden de la lista o barajarlo con Web Crypto. La herramienta equilibra cantidades, no perfiles: no sabe niveles, habilidades, apoyos, conflictos, preferencias ni roles. Úsala para obtener una primera distribución transparente y revisa después si la actividad requiere grupos heterogéneos, parejas concretas o ajustes docentes.',
  seoTitle: 'Crear grupos para clase por número o tamaño | CSV',
  seoDescription: 'Pega la lista y crea grupos de clase por número de equipos o personas por grupo. Barajado seguro, reparto equilibrado, copia y CSV sin registro.',
  keywords: [
    'crear grupos para clase',
    'formar equipos de alumnos',
    'generador de grupos de estudiantes',
    'dividir clase en grupos',
    'grupos por número de alumnos',
    'equipos de trabajo aula',
    'agrupamiento cooperativo',
    'hacer grupos equilibrados',
  ],
  capabilities: [
    'Crear un número exacto de grupos con tamaños que difieren como máximo en una persona.',
    'Crear grupos de un tamaño máximo y dejar en el último las personas restantes.',
    'Mantener el orden pegado o barajar con Web Crypto sin fallback inseguro.',
    'Bloquear nombres idénticos para que cada asignación sea identificable.',
    'Copiar todos los equipos como texto listo para una diapositiva o mensaje.',
    'Descargar un CSV con columnas de grupo y miembro, protegido frente a fórmulas.',
  ],
  contentSections: [
    {
      heading: 'Respuesta rápida: número de grupos o personas por grupo',
      paragraphs: [
        'Elige «Número de grupos» cuando la actividad impone estaciones, temas o materiales: por ejemplo, seis mesas disponibles. Con 25 personas y 6 grupos, el reparto por rondas produce tamaños 5, 4, 4, 4, 4 y 4. Elige «Personas por grupo» cuando importa el límite de interacción: con 25 personas y tamaño 4 se crean seis grupos de 4 y uno de 1. La herramienta no mueve automáticamente ese último miembro a otros equipos porque eso incumpliría el tamaño elegido.',
        'Pega una persona por línea, decide si quieres barajar y genera. Si la lista ya está ordenada por un criterio pedagógico, desactiva Barajar: el reparto por número alternará los nombres entre grupos, mientras que el reparto por tamaño tomará bloques consecutivos. Editar la lista o cualquier ajuste invalida el resultado anterior para evitar copiar o descargar un reparto obsoleto.',
      ],
      items: [
        '28 estudiantes en 7 grupos: cuatro por equipo.',
        '29 estudiantes con tamaño 4: siete grupos de cuatro y un último grupo de una persona.',
        '30 estudiantes en 8 grupos: seis grupos de cuatro y dos grupos de tres.',
        'Si no aceptas un grupo final pequeño, cambia el modo o ajusta manualmente después.',
      ],
    },
    {
      heading: 'Diferencia con el generador de grupos aleatorios',
      paragraphs: [
        'FunnyTools ya ofrece un generador de grupos aleatorios orientado a la acción rápida: eliges cuántos grupos quieres, siempre baraja y puedes exportar CSV. Esta página responde a otra necesidad: planificación de clase con dos modos y la opción de conservar el orden. Es preferible cuando el tamaño por equipo está fijado por el material, cuando has ordenado la lista deliberadamente o cuando quieres comparar «cuatro grupos» frente a «cuatro personas por grupo».',
        'No uses las dos páginas para repetir indefinidamente hasta obtener una combinación deseada sin reconocerlo. Si hay restricciones reales, escríbelas antes y revisa una única propuesta. La transparencia importa más que la apariencia de azar. Para un sorteo estrictamente temporal usa el generador aleatorio; para una estructura de aprendizaje con duración, roles y evaluación, utiliza este creador como primer paso y documenta los ajustes.',
      ],
      link: {
        prefix: 'Si solo quieres elegir un número de equipos y barajar siempre, utiliza el ',
        label: 'generador de grupos aleatorios',
        href: '/es/herramientas/generador-grupos-aleatorios/',
        suffix: '.',
      },
    },
    {
      heading: 'Grupos aleatorios, homogéneos y heterogéneos',
      paragraphs: [
        'Aleatorio describe el procedimiento, no la composición obtenida. Por casualidad pueden coincidir en un equipo las personas con más experiencia o quedar aislada una habilidad necesaria. Un agrupamiento homogéneo reúne perfiles similares según un criterio explícito; uno heterogéneo combina diversidad relevante para la tarea. Ninguno es siempre correcto. La decisión depende del objetivo, la duración, el apoyo disponible y la forma de evaluar.',
        'Los materiales de aprendizaje cooperativo de INTEF plantean diseñar agrupamientos, organizar el espacio, distribuir roles y construir normas. También muestran grupos heterogéneos y roles rotativos como portavoz, coordinación, secretaría o supervisión. Este widget no dispone de datos para hacerlo automáticamente, y es mejor que no los solicite: evitar registrar diagnósticos, calificaciones o categorías sensibles reduce el riesgo de exposición. Genera con nombres o códigos y realiza el equilibrio profesional fuera de la página.',
      ],
    },
    {
      heading: 'Tamaño del equipo, tarea y último grupo',
      paragraphs: [
        'Un equipo pequeño facilita turnos y responsabilidad visible, pero puede carecer de manos para una tarea extensa. Uno grande reúne más ideas, aunque aumenta el riesgo de inactividad y coordinación deficiente. Un material de INTEF sobre aprendizaje basado en proyectos advierte que por encima de seis o siete miembros resulta difícil mantener una comunicación efectiva. No es una ley matemática: úsalo como señal para justificar por qué el tamaño encaja con la actividad.',
        'Si el modo por tamaño deja una persona sola, no publiques ese resultado sin revisar. Puedes bajar el tamaño, elegir el número de grupos o trasladar una persona de otro equipo para crear dos grupos ligeramente distintos. Haz el cambio en una copia del CSV o en tu documento de clase y explica el criterio si afecta a la percepción de justicia.',
      ],
      items: [
        'Parejas: práctica breve, revisión mutua o tutoría recíproca.',
        'Tríos o cuatro: discusión donde todas las voces deben aparecer.',
        'Cinco o seis: proyecto con varios roles y productos parciales.',
        'Más de seis: exige una estructura clara, subroles y seguimiento.',
      ],
    },
    {
      heading: 'Roles, rotación y responsabilidad individual',
      paragraphs: [
        'Crear los equipos no crea cooperación. Define un producto común, una responsabilidad individual y una forma de comprobar que cada persona participa. Los roles deben responder a la tarea: portavoz comunica, secretario registra, coordinador ordena el tiempo y supervisor comprueba acuerdos. Rotarlos evita que una persona quede siempre asociada a la misma función.',
        'La exportación no añade roles porque el número y el nombre apropiados dependen de la actividad. Después de descargar el CSV, incorpora una columna de rol y otra de revisión. En una actividad larga, conserva fecha y versión; en una dinámica de diez minutos, una diapositiva con los equipos puede ser suficiente. No uses el reparto como etiqueta permanente de capacidad.',
      ],
    },
    {
      heading: 'Azar, CSV, privacidad y nombres sensibles',
      paragraphs: [
        'El barajado utiliza Fisher–Yates, crypto.getRandomValues y rechazo para evitar sesgo por módulo. Si la fuente segura no está disponible, no se generan grupos aleatorios. Desactivar Barajar permite seguir con el orden original. El resultado no tiene semilla reproducible: exporta la versión que vas a utilizar si necesitas auditarla.',
        'El CSV encierra todas las celdas entre comillas y antepone un tabulador cuando un valor comienza por un carácter de fórmula. Esto reduce CSV Injection, pero debes revisar el programa de destino. Los nombres permanecen en la pestaña y se descartan al cerrarla. Para proyectar, considera iniciales, alias acordados o códigos; no pegues correos, identificadores oficiales, diagnósticos ni notas de comportamiento.',
      ],
    },
  ],
  instructions: [
    'Pega una persona por línea y añade un identificador breve cuando haya nombres idénticos.',
    'Elige «Número de grupos» o «Personas por grupo» según la restricción real de la actividad.',
    'Introduce un entero entre 1 y el número de personas.',
    'Activa Barajar para una distribución aleatoria o desactívalo para conservar el orden preparado.',
    'Pulsa Crear grupos y revisa tamaño, último equipo, apoyos, relaciones, roles y accesibilidad.',
    'Copia el texto o descarga `grupos-clase.csv`; añade roles y ajustes en tu documento de trabajo.',
  ],
  examples: [
    'Dividir 24 estudiantes en 6 equipos para estaciones de laboratorio.',
    'Crear grupos de hasta 4 personas para una discusión con turnos breves.',
    'Conservar una lista ordenada por criterios docentes y repartirla por rondas entre varios equipos.',
    'Preparar equipos provisionales de un taller y exportarlos para asignar materiales.',
    'Crear una primera propuesta aleatoria y ajustar después una restricción documentada.',
  ],
  audience: [
    'Docentes que preparan aprendizaje cooperativo, proyectos, laboratorios o estaciones.',
    'Formadores, facilitadores y responsables de talleres.',
    'Equipos que necesitan comparar cantidad de grupos y tamaño por grupo.',
    'Personas que requieren un CSV revisable en vez de una lista efímera.',
  ],
  caseStudies: [
    {
      title: 'Seis estaciones de ciencias',
      description: 'Una clase de 25 personas se divide por número de grupos. El docente revisa el equipo de cinco, asigna un rol adicional y exporta el reparto junto con la estación inicial.',
    },
    {
      title: 'Debate en grupos de cuatro',
      description: 'La facilitadora elige tamaño 4 y detecta un último grupo de una persona. Cambia a siete grupos para obtener equipos de cuatro o tres y documenta la decisión.',
    },
    {
      title: 'Proyecto con composición deliberada',
      description: 'El profesor ordena una lista alternando experiencias, desactiva Barajar y reparte por número. Revisa el resultado sin guardar en la página los datos usados para esa decisión.',
    },
  ],
  notes: [
    'La herramienta equilibra cantidades, no habilidades, apoyos, relaciones ni roles.',
    'En modo por tamaño, el último grupo puede ser menor y requerir ajuste.',
    'Nombres idénticos se bloquean para evitar asignaciones ambiguas.',
    'No hay semilla ni guardado: descarga el reparto que realmente vas a usar.',
    'El resultado aleatorio no debe presentarse como garantía de equidad pedagógica.',
    'No introduzcas categorías sensibles para intentar automatizar grupos heterogéneos.',
  ],
  faq: [
    {
      q: '¿Cómo dividir una clase de 30 alumnos en grupos?',
      a: 'Cinco grupos producen 6 personas por equipo; seis grupos producen 5. Si eliges tamaño 4, obtendrás siete grupos de cuatro y uno de dos. Escoge según la tarea y revisa el último grupo.',
    },
    {
      q: '¿Cuál es la diferencia entre número de grupos y tamaño?',
      a: 'Número de grupos fija cuántos equipos habrá y equilibra sus cantidades. Tamaño fija el máximo de miembros por equipo y deja los restantes en el último.',
    },
    {
      q: '¿Los grupos son aleatorios?',
      a: 'Solo cuando Barajar está activado. En ese caso se usa Web Crypto. Si lo desactivas, se respeta el orden pegado.',
    },
    {
      q: '¿Puede crear grupos heterogéneos automáticamente?',
      a: 'No. No solicita ni interpreta niveles o categorías personales. Realiza esa revisión con criterio docente y sin exponer información sensible.',
    },
    {
      q: '¿Qué hago si queda una persona sola?',
      a: 'Cambia a número de grupos, reduce el tamaño o redistribuye una persona después de generar. No publiques un equipo unipersonal como si fuera inevitable.',
    },
    {
      q: '¿Puedo asignar roles?',
      a: 'La página no los asigna. Descarga el CSV y añade portavoz, coordinación, secretaría u otros roles adecuados a la tarea, preferiblemente rotativos.',
    },
    {
      q: '¿Por qué bloquea nombres repetidos?',
      a: 'Dos entradas idénticas no se pueden distinguir al copiar o exportar. Añade una inicial, número o alias acordado.',
    },
    {
      q: '¿Se guarda la lista del alumnado?',
      a: 'No. Todo se procesa localmente y se pierde al cerrar o recargar. Guarda solo el resultado necesario en un lugar autorizado.',
    },
  ],
  labels: {
    input: 'Lista de estudiantes o participantes',
    placeholder: 'Una persona por línea...\nAna P.\nLuis M.\nMarta R.\nDiego S.',
    mode: 'Modo de agrupamiento',
    byGroupCount: 'Número de grupos',
    byGroupSize: 'Personas por grupo',
    groupCount: 'Cantidad de grupos',
    groupSize: 'Tamaño máximo',
    shuffle: 'Barajar de forma segura',
    generate: 'Crear grupos',
    copyAll: 'Copiar todos',
    exportCsv: 'Descargar CSV',
    csvGroup: 'Grupo',
    csvMember: 'Miembro',
    csvFilename: 'grupos-clase.csv',
    reset: 'Restablecer',
    groupLabel: 'Grupo {n}',
    summary: 'Grupos creados',
    emptyResult: 'Los grupos aparecerán aquí',
    emptyError: 'Introduce al menos dos personas.',
    duplicateListError: 'Hay nombres idénticos. Añade un número, inicial o alias para distinguirlos.',
    invalidCountError: 'La cantidad de grupos debe ser un entero entre 1 y el número de personas.',
    invalidSizeError: 'El tamaño debe ser un entero entre 1 y el número de personas.',
    cryptoError: 'El navegador no ofrece una fuente de azar segura. Desactiva Barajar para conservar el orden original.',
    copied: 'Grupos copiados',
  },
  sources: [
    {
      label: 'INTEF: Aprendizaje Cooperativo',
      href: 'https://enlinea.intef.es/courses/course-v1%3AMOOCINTEF%2BCooperaMooc%2B2018_ED3/about',
      note: 'Describe diseño de agrupamientos, organización del espacio, normas, roles y tareas cooperativas.',
    },
    {
      label: 'INTEF: Aprendizaje cooperativo y agrupamiento del alumnado',
      href: 'https://procomun.intef.es/articulos/aprendizaje-cooperativo-2',
      note: 'Expone decisiones sobre composición, tamaño, duración y roles en una experiencia de aula.',
    },
    {
      label: 'INTEF: ABP, composición, roles y tamaño del grupo',
      href: 'https://formacion.intef.es/tutorizados_2013_2019/pluginfile.php/62107/mod_resource/content/6/ABP_15_03_30_B2_T1_AprendizajeCoopInvestigacionCampo.pdf',
      note: 'Relaciona heterogeneidad, roles rotativos, responsabilidad y comunicación con el tamaño del equipo.',
    },
    {
      label: 'MDN: Crypto.getRandomValues()',
      href: 'https://developer.mozilla.org/es/docs/Web/API/Crypto/getRandomValues',
      note: 'Documenta la fuente usada para el barajado local.',
    },
    {
      label: 'OWASP: CSV Injection',
      href: 'https://owasp.org/www-community/attacks/CSV_Injection',
      note: 'Fundamenta la protección aplicada a valores que podrían interpretarse como fórmulas.',
    },
  ],
  privacyNote: 'La lista, el barajado y los equipos viven en la memoria de esta pestaña. FunnyTools no recibe nombres ni resultados. El CSV se genera localmente cuando pulsas Descargar.',
  disclaimer: 'El reparto es una ayuda de planificación. Revisa objetivo, tamaño, composición, accesibilidad, apoyos, convivencia, roles y privacidad antes de comunicar los grupos.',
};

export const spanishClassGroupGeneratorReview = {
  heading: 'Revisión pedagógica antes de publicar los grupos',
  intro: 'Un reparto con cantidades similares todavía puede necesitar cambios para que la tarea sea viable y participativa.',
  panels: [
    { title: 'Tamaño', text: 'Comprueba que cada equipo pueda realizar la tarea y que el último no quede aislado.' },
    { title: 'Composición', text: 'Revisa apoyos y restricciones sin convertir el reparto en una etiqueta permanente.' },
    { title: 'Organización', text: 'Define roles, tiempo, producto y responsabilidad individual.' },
  ],
  checklistHeading: 'Lista de comprobación',
  checklist: [
    'La lista corresponde a la asistencia real y no contiene duplicados ambiguos.',
    'El modo elegido responde a una restricción concreta.',
    'Ningún grupo queda inviable por tamaño o composición.',
    'Los roles y la forma de participación están definidos.',
    'La versión compartida contiene solo la información necesaria.',
  ],
};

export const spanishPercentileRank: ToolContent = {
  name: 'Calculadora de rango percentil',
  short: 'Calcula la posición porcentual de una puntuación a partir de cuántos casos quedan por debajo, cuántos empatan y el tamaño total del grupo.',
  long: 'Esta calculadora estima un rango percentil con la convención de rango medio para empates: PR = 100 × (B + 0,5 × E) / N. B es el número de casos con puntuación inferior, E el número que obtiene exactamente la misma puntuación y N el grupo de referencia completo. También muestra qué porcentaje queda por debajo, empatado y por encima. No convierte una puntuación usando baremos oficiales ni calcula el valor de un percentil a partir de una serie; responde a una pregunta distinta: qué posición relativa ocupa un resultado dentro de un grupo conocido.',
  seoTitle: 'Calculadora de rango percentil con empates | PR',
  seoDescription: 'Calcula PR = 100 × (B + 0,5E) / N. Introduce casos por debajo, empates y total; revisa porcentajes bajo, igual y sobre la puntuación.',
  keywords: [
    'calculadora rango percentil',
    'calcular percentil de una puntuación',
    'percentile rank español',
    'fórmula rango percentil',
    'percentil con empates',
    'posición relativa puntuación',
    'PR estadística educativa',
    'porcentaje por debajo puntuación',
  ],
  capabilities: [
    'Calcular el rango percentil con la convención de rango medio para empates.',
    'Mostrar por separado el porcentaje inferior, empatado y superior.',
    'Aceptar conteos enteros y validar que B + E no supere N.',
    'Tratar a cada persona empatada en el punto medio del bloque que comparte puntuación.',
    'Resolver ejemplos educativos o comprobar un cálculo manual sin subir datos.',
    'Explicar por qué rango percentil, valor percentil, porcentaje correcto y nota no son equivalentes.',
  ],
  contentSections: [
    {
      heading: 'Respuesta rápida: qué números debes introducir',
      paragraphs: [
        'Cuenta cuántas observaciones tienen una puntuación estrictamente menor y escribe ese número en B. Cuenta cuántas tienen exactamente la puntuación analizada, incluida la persona o caso de interés, y escribe E. En N coloca el número total de observaciones del mismo grupo de referencia. La calculadora asigna al bloque de empates su posición media y expresa el resultado entre 0 y 100.',
        'Ejemplo: en un grupo de 40, hay 24 puntuaciones inferiores y 2 iguales. El cálculo es 100 × (24 + 0,5 × 2) / 40 = 62,5. Esto sitúa el bloque empatado en torno al rango percentil 62,5. Por separado, 60% queda por debajo, 5% empata y 35% queda por encima. Decir «PR 62,5» no significa que la nota sea 62,5% ni que se hayan acertado 62,5% de las preguntas.',
      ],
      items: [
        'B cuenta solo valores menores, no incluye empates.',
        'E debe ser al menos 1 porque la puntuación analizada pertenece al grupo.',
        'N debe incluir todos los casos del grupo de referencia usado.',
        'B + E no puede superar N.',
      ],
    },
    {
      heading: 'Rango percentil y valor percentil no son lo mismo',
      paragraphs: [
        'El rango percentil parte de una puntuación y pregunta qué posición porcentual ocupa. El valor percentil hace el recorrido inverso: parte de un porcentaje, por ejemplo P90, y busca el valor que deja aproximadamente 90% de los datos por debajo. El INE usa esta segunda idea cuando define el percentil 90 del salario como el valor bajo el que queda 90% de trabajadores. Esta página calcula la primera idea y necesita conteos B, E y N.',
        'También conviene separar percentil de porcentaje de aciertos. Obtener 18 de 20 equivale a 90% correcto, pero su rango percentil depende de cómo rindió el grupo de referencia. Si casi todo el grupo obtuvo 19 o 20, 18 puede ocupar una posición baja; si la mayoría obtuvo menos, puede ocupar una posición alta. El PR siempre es relativo al grupo.',
      ],
    },
    {
      heading: 'Por qué los empates reciben medio rango',
      paragraphs: [
        'Si varias personas obtienen la misma puntuación, no hay información para ordenarlas dentro del bloque. Colocar a todas al inicio perjudica su posición; colocarlas al final la infla. La convención de rango medio asigna a cada empate el centro del tramo que ocupa. Por eso la fórmula suma la mitad de E a los casos estrictamente inferiores.',
        'NIST documenta el percentage rank como 100 × (rango − 0,5) / N y señala que los empates reciben un rango promedio. Expresado mediante conteos, el rango promedio del bloque conduce a 100 × (B + 0,5E) / N. Otros informes pueden usar una definición distinta: porcentaje menor, porcentaje menor o igual, (r − 1)/(N − 1), tablas normativas o interpolación. Si debes replicar un software, examen o manual, usa exactamente su convención.',
      ],
    },
    {
      heading: 'Grupo de referencia, baremos y comparaciones válidas',
      paragraphs: [
        'Un PR solo tiene sentido acompañado por el grupo de referencia y la fecha. «PR 70» puede referirse a una clase de 20, a una cohorte nacional por edad o a una muestra de validación de un test. No son intercambiables. Los materiales educativos alojados por la Xunta describen el percentil como una medida de posición respecto a la muestra de referencia con la que se validó el instrumento. Cambiar la muestra puede cambiar la interpretación aunque la puntuación directa sea idéntica.',
        'Esta calculadora no contiene baremos. Si un manual profesional ofrece una tabla por edad, curso, sexo u otra variable autorizada, no reconstruyas el percentil contando solo tu clase. Consulta la edición y la población apropiadas. En contextos de diagnóstico, selección o decisiones de alto impacto, el cálculo debe formar parte de un proceso profesional y no de una herramienta web aislada.',
      ],
    },
    {
      heading: 'Muestras pequeñas, extremos y precisión aparente',
      paragraphs: [
        'Con grupos pequeños, los saltos posibles son grandes. Si N = 10 y no hay empates, cada posición cambia cerca de diez puntos de PR. Mostrar dos decimales facilita comprobar la aritmética, pero no crea una precisión que la muestra no tiene. Informa el tamaño del grupo junto al resultado y evita comparar diferencias diminutas entre grupos de tamaños distintos.',
        'Con la convención de rango medio, una puntuación única mínima en N = 20 obtiene PR 2,5 y una máxima única obtiene PR 97,5. Esto es coherente con situar cada observación en el centro de su tramo; no es un error por no llegar a 0 o 100. Si un informe necesita extremos 0 y 100, probablemente usa otra fórmula. Declara el método antes de comparar.',
      ],
    },
    {
      heading: 'Cómo informar el resultado sin sobreinterpretarlo',
      paragraphs: [
        'Una redacción verificable incluye puntuación, grupo, tamaño, método y fecha: «En el grupo de 40 estudiantes de la evaluación de mayo, 24 puntuaciones quedaron por debajo y 2 empataron; con rango medio para empates, PR = 62,5». Después puedes añadir que 60% quedó por debajo, 5% empató y 35% quedó por encima.',
        'El PR no mide cuánto aprendió una persona, no identifica una causa y no establece por sí solo una categoría clínica o educativa. Tampoco es una probabilidad de éxito futuro. Para seguimiento, conserva la puntuación directa y usa un grupo de referencia comparable. Si la evaluación cambia de dificultad o población, una variación de PR puede reflejar el contexto y no solo el desempeño.',
      ],
    },
  ],
  formula: {
    expression: 'PR = 100 × (B + 0,5 × E) / N',
    explanation: 'B es el número de puntuaciones estrictamente inferiores, E es el número de puntuaciones iguales —incluido el caso analizado— y N es el tamaño total del grupo. La mitad de E sitúa el bloque empatado en su rango medio. El resultado no es un valor percentil ni un porcentaje de aciertos.',
  },
  instructions: [
    'Define una puntuación y un único grupo de referencia comparable.',
    'Cuenta los casos con resultado estrictamente inferior y escribe B.',
    'Cuenta todos los casos con resultado exactamente igual, incluido el analizado, y escribe E.',
    'Escribe el tamaño total N; comprueba que B + E no supere N.',
    'Pulsa Calcular rango percentil y revisa PR, porcentaje inferior, empatado y superior.',
    'Registra la fórmula, N, grupo y fecha junto al resultado si vas a informarlo.',
  ],
  examples: [
    'Comprobar la posición de una calificación dentro de una clase concreta.',
    'Explicar cómo cambian los rangos cuando varias personas empatan.',
    'Verificar un cálculo manual de PR basado en frecuencias.',
    'Comparar dos métodos de rango percentil antes de replicar un informe.',
    'Mostrar por qué porcentaje correcto y posición relativa responden a preguntas diferentes.',
  ],
  audience: [
    'Docentes y estudiantes que aprenden medidas de posición.',
    'Investigadores que necesitan comprobar un rango medio sencillo.',
    'Personas que revisan un informe y conocen los conteos del grupo.',
    'Usuarios que quieren distinguir rango percentil de valor percentil.',
  ],
  caseStudies: [
    {
      title: 'Dos empates en una clase de 40',
      description: 'Con B = 24, E = 2 y N = 40, PR = 62,5. El informe añade 60% por debajo, 5% empatado y 35% por encima para que la convención sea visible.',
    },
    {
      title: 'Misma nota, grupo distinto',
      description: 'Una puntuación de 80 puede ocupar PR 75 en una clase y PR 55 en otra. La diferencia no cambia la nota directa; cambia la distribución de referencia.',
    },
    {
      title: 'Puntuación máxima en muestra pequeña',
      description: 'Una máxima única con N = 10 obtiene PR 95 bajo rango medio. El equipo no fuerza 100 y documenta que otro sistema puede usar una convención diferente.',
    },
  ],
  notes: [
    'Esta página calcula rango percentil desde conteos; no calcula el valor de P10, P50 o P90 a partir de una serie.',
    'El método es rango medio para empates y puede no coincidir con otro software o baremo.',
    'E incluye todos los casos iguales y debe ser al menos 1.',
    'Dos decimales no eliminan la incertidumbre de una muestra pequeña.',
    'El resultado depende totalmente del grupo de referencia.',
    'No uses un PR aislado para diagnóstico, admisión, sanción o decisión profesional.',
  ],
  faq: [
    {
      q: '¿Qué significa un rango percentil de 70?',
      a: 'Con el método declarado, la puntuación ocupa aproximadamente la posición 70 dentro de ese grupo. No significa 70% de aciertos ni que la puntuación sea 70.',
    },
    {
      q: '¿Qué pongo en “Puntuaciones iguales”?',
      a: 'Cuenta a todas las personas con exactamente la misma puntuación, incluida la persona o caso cuyo PR calculas.',
    },
    {
      q: '¿Por qué se multiplica E por 0,5?',
      a: 'Para asignar al bloque empatado la posición media entre el inicio y el final del empate, sin favorecer ni perjudicar a quienes comparten puntuación.',
    },
    {
      q: '¿Rango percentil y percentil son lo mismo?',
      a: 'En conversación se confunden, pero técnicamente no. El rango parte de una puntuación y devuelve posición; un valor percentil parte de un porcentaje y devuelve un valor de la distribución.',
    },
    {
      q: '¿Por qué el mínimo no da 0 y el máximo no da 100?',
      a: 'El rango medio coloca cada observación en el centro de su intervalo porcentual. Una observación única mínima ocupa 0,5/N y una máxima 1 − 0,5/N.',
    },
    {
      q: '¿Puedo usar decimales en B, E o N?',
      a: 'No. Son conteos de casos y deben ser enteros. La puntuación original puede ser decimal, pero esta calculadora no la solicita.',
    },
    {
      q: '¿Sirve para un test con baremos?',
      a: 'Solo si el manual define esta misma fórmula y tienes los conteos del grupo correcto. Si ofrece tablas normativas, utiliza esas tablas y la edición aplicable.',
    },
    {
      q: '¿Los datos se envían al servidor?',
      a: 'No. Los tres conteos y el resultado se procesan localmente en tu navegador.',
    },
  ],
  labels: {
    below: 'Puntuaciones por debajo (B)',
    equal: 'Puntuaciones iguales (E)',
    total: 'Tamaño total del grupo (N)',
    calculate: 'Calcular rango percentil',
    result: 'Rango percentil (PR)',
    belowPercent: 'Porcentaje por debajo',
    tiedPercent: 'Porcentaje empatado',
    abovePercent: 'Porcentaje por encima',
    invalid: 'Usa conteos enteros válidos: B ≥ 0, E ≥ 1, N ≥ 1 y B + E no puede superar N.',
  },
  sources: [
    {
      label: 'NIST Dataplot: Percentage Rank',
      href: 'https://www.itl.nist.gov/div898/software/dataplot/refman2/auxillar/percrank.htm',
      note: 'Documenta PR = 100 × (rango − 0,5) / N y el uso de rango promedio para empates.',
    },
    {
      label: 'NIST/SEMATECH: Percentiles',
      href: 'https://itl.nist.gov/div898/handbook/prc/section2/prc262.htm',
      note: 'Distingue percentiles, rangos y métodos de interpolación y advierte que existen varias convenciones.',
    },
    {
      label: 'INE: definición de percentiles salariales',
      href: 'https://ine.es/ss/Satellite?L=1&c=INESeccion_C&cid=1259931351611&p=%5C&pagename=ProductosYServicios%2FPYSLayout',
      note: 'Ejemplifica el valor percentil como umbral que deja un porcentaje de observaciones por debajo.',
    },
    {
      label: 'UNAM: medidas de posición y percentiles',
      href: 'https://cc.sisal.unam.mx/Guias/GuiaEstadisticaR.html',
      note: 'Explica que las medidas de posición dividen datos ordenados y que los percentiles trabajan en centésimas.',
    },
    {
      label: 'Ministerio de Educación / Xunta: interpretación respecto a una muestra de referencia',
      href: 'https://centros.edu.xunta.gal/cafi/aulavirtual/pluginfile.php/53359/mod_folder/content/0/Procesos%20e%20instrumentos%20de.pdf?forcedownload=1',
      note: 'Describe la posición percentil en relación con la muestra de referencia usada para validar un instrumento.',
    },
  ],
  privacyNote: 'B, E, N y el resultado se calculan en la pestaña. FunnyTools no recibe puntuaciones, nombres ni información del grupo.',
  disclaimer: 'Herramienta educativa para una convención concreta de rango percentil. Comprueba el manual, baremo, software o protocolo aplicable antes de informar resultados o tomar decisiones.',
};

export const spanishPercentileRankReview = {
  heading: 'Revisión estadística antes de informar el PR',
  intro: 'La aritmética puede estar bien y la comparación seguir siendo inválida si el grupo o el método no corresponden.',
  panels: [
    { title: 'Conteos', text: 'B excluye empates, E los incluye a todos y B + E no supera N.' },
    { title: 'Referencia', text: 'El grupo, la fecha y la población son pertinentes para la interpretación.' },
    { title: 'Método', text: 'El informe declara rango medio para empates y no lo confunde con valor percentil.' },
  ],
  checklistHeading: 'Lista de comprobación',
  checklist: [
    'La puntuación analizada pertenece al grupo N.',
    'Los conteos proceden de la misma evaluación y población.',
    'La fórmula coincide con la fuente que se intenta replicar.',
    'El resultado se acompaña de N y contexto.',
    'No se presenta como porcentaje de aciertos, diagnóstico ni probabilidad futura.',
  ],
};
