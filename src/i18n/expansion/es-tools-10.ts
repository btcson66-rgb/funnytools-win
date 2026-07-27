import type { ToolContent } from '../tools/_types';

export const spanishPieChartMaker: ToolContent = {
  name: 'Crear gráfico circular online',
  short: 'Convierte categorías y valores positivos en un gráfico de sectores con porcentajes y descárgalo como PNG.',
  long: 'Introduce una etiqueta y un valor por fila para representar partes de un mismo total. La herramienta calcula el porcentaje de cada sector, dibuja una leyenda y genera un PNG blanco de 900 × 560 píxeles. Admite una sola serie, usa una paleta fija y funciona en este navegador. No importa hojas de cálculo ni permite editar colores, separar sectores o crear gráficos de anillo.',
  seoTitle: 'Crear gráfico circular o de sectores online',
  seoDescription: 'Crea un gráfico circular con porcentajes, etiquetas y leyenda. Vista previa local, ejemplos, límites y descarga PNG de 900 × 560 píxeles.',
  keywords: [
    'crear gráfico circular online',
    'gráfico de sectores online',
    'hacer gráfica circular',
    'generador gráfico de pastel',
    'diagrama circular con porcentajes',
    'crear gráfico de porcentajes',
    'descargar gráfico circular PNG',
  ],
  capabilities: [
    'Añadir o eliminar filas con categoría y valor no negativo.',
    'Calcular automáticamente qué porcentaje del total representa cada valor.',
    'Mostrar sectores, porcentajes y leyenda en un lienzo de 900 × 560.',
    'Añadir un título opcional de hasta 60 caracteres.',
    'Descargar la vista actual como `pie-chart.png` con fondo blanco.',
  ],
  contentSections: [
    {
      heading: 'Respuesta rápida: cómo crear un gráfico circular',
      paragraphs: [
        'Sustituye los datos de ejemplo por categorías que formen partes de un mismo total. Cada fila necesita una etiqueta y un número igual o superior a cero; para que aparezca un sector, al menos un valor debe ser mayor que cero. El porcentaje se calcula como `valor ÷ suma de todos los valores × 100`. Cuando hayas revisado la leyenda, pulsa «Descargar PNG» y se guardará `pie-chart.png`.',
        'En España es habitual decir «gráfico circular» o «gráfico de sectores»; en distintos países también se busca como gráfica de pastel, de torta o de pizza. Todos esos nombres describen la misma idea de partes sobre un total. Esta versión no obliga a que introduzcas porcentajes: puedes escribir cantidades absolutas, siempre que compartan unidad y pertenezcan al mismo conjunto.',
      ],
    },
    {
      heading: 'Qué datos sí forman un gráfico de sectores',
      paragraphs: [
        'Un gráfico circular responde a una pregunta concreta: cómo se reparte un total entre categorías excluyentes. Puede mostrar el presupuesto anual por área, los votos válidos por opción o las ventas de un mes por canal. Solo debe haber una serie. Si mezclas años, regiones o unidades en el mismo círculo, el porcentaje seguirá sumando cien, pero el gráfico dejará de representar un total coherente.',
        'Comprueba qué queda dentro y fuera del denominador. En una encuesta, por ejemplo, el total puede ser personas, respuestas o selecciones; no son equivalentes si cada participante podía marcar varias opciones. Añade en el informe la unidad, el periodo, la fuente, el tamaño del conjunto y cualquier categoría «otros» o «sin respuesta». El PNG no incorpora esa información por su cuenta.',
      ],
      items: [
        'Todas las filas deben usar la misma unidad y el mismo periodo.',
        'Las categorías deben representar partes comparables del total.',
        'Una persona no debe aparecer en dos sectores salvo que el método lo explique.',
        'La suma puede estar en euros, votos o unidades; no tiene que ser 100 antes de dibujar.',
      ],
    },
    {
      heading: 'Porcentajes, ceros, decimales y redondeo',
      paragraphs: [
        'La leyenda presenta cada proporción con una cifra decimal. Por eso los porcentajes visibles pueden sumar 99,9 % o 100,1 % aunque el cálculo interno use el total completo. No corrijas un sector a mano solo para forzar 100: conserva los valores originales y explica que la diferencia se debe al redondeo. Los números aceptan punto decimal; una fila vacía, no numérica o negativa se omite.',
        'Un valor cero permanece en la leyenda como 0,0 %, pero no ocupa ángulo. Si todas las filas valen cero, no existe un total del que obtener proporciones y la herramienta muestra un aviso en lugar de inventar sectores iguales. Los valores negativos tampoco tienen una interpretación válida en este gráfico simple. Para ganancias y pérdidas, desviaciones respecto a cero o saldos con signo, usa barras o una tabla.',
      ],
    },
    {
      heading: 'Cuándo es mejor un gráfico de barras',
      paragraphs: [
        'Los sectores funcionan mejor cuando hay pocas categorías y las diferencias son claras. Microsoft recomienda una sola serie, valores superiores a cero y no más de siete categorías, porque comparar muchos ángulos resulta difícil. Si necesitas ordenar veinte elementos, distinguir valores muy parecidos o comparar varias fechas, un gráfico de barras ofrece una escala común y suele permitir una lectura más precisa.',
        'También conviene evitar varios círculos colocados uno junto a otro: comparar ángulos entre gráficos exige más esfuerzo que comparar barras alineadas. Usa el circular para destacar una composición sencilla; usa barras para clasificar, comparar o mostrar categorías que no forman un total. Si la cifra exacta importa más que la forma, publica la tabla y deja el gráfico como resumen visual.',
      ],
    },
    {
      heading: 'Leyenda, color y accesibilidad',
      paragraphs: [
        'El lienzo usa ocho colores fijos y los repite cuando hay más categorías. Las etiquetas de más de catorce caracteres se abrevian en la imagen, aunque el campo de entrada conserve el texto completo. Dos nombres largos pueden acabar con abreviaturas parecidas. Revisa el archivo descargado y acorta las etiquetas sin perder su significado; no confíes solo en el color para identificarlas.',
        'Un PNG no incluye una tabla accesible ni un texto alternativo que explique los datos. Al publicarlo, añade cerca una frase con la conclusión principal, la tabla de valores y un texto alternativo que nombre las categorías relevantes. Evita títulos como «Resultados» sin contexto. «Distribución del presupuesto 2026, euros» permite entender qué se reparte, de qué periodo es y cuál es la unidad.',
      ],
    },
    {
      heading: 'Privacidad, descarga y conservación de la fuente',
      paragraphs: [
        'Las etiquetas, cifras y porcentajes se calculan en la pestaña. FunnyTools no recibe la tabla para dibujar el gráfico. La página puede cargar servicios generales de analítica o publicidad descritos en la política del sitio, pero los valores escritos en las filas no se añaden a esos eventos. Si trabajas con información sensible, utiliza categorías agregadas y evita nombres personales.',
        'La descarga contiene únicamente una imagen de 900 × 560 píxeles con fondo blanco; no conserva datos editables, fórmula, procedencia, fecha ni notas. Guarda la tabla original en una hoja o documento aparte. Antes de entregar el gráfico, abre el PNG y coteja título, leyenda, porcentajes, orden, unidad y total con la fuente. Esa revisión permite detectar filas omitidas o un denominador mal definido.',
      ],
    },
  ],
  instructions: [
    'Define el total que vas a repartir y confirma que todas las categorías pertenecen a ese conjunto.',
    'Sustituye las filas de ejemplo por etiquetas breves y valores no negativos con la misma unidad.',
    'Añade o elimina filas y escribe un título que indique tema, periodo o unidad.',
    'Revisa porcentajes, ceros, etiquetas abreviadas y suma original antes de exportar.',
    'Descarga `pie-chart.png` y conserva por separado la tabla, la fuente y una descripción accesible.',
  ],
  examples: [
    'Mostrar cómo se distribuye un presupuesto entre cinco áreas.',
    'Representar votos válidos por opción en una pregunta de respuesta única.',
    'Resumir la participación de canales de venta dentro de un mismo mes.',
    'Explicar la composición de una cartera sin mezclar periodos ni monedas.',
    'Crear una imagen sencilla para una clase sobre fracciones y porcentajes.',
  ],
  audience: [
    'Estudiantes que necesitan un diagrama de sectores para una tarea.',
    'Docentes que preparan ejemplos de partes de un total.',
    'Equipos que presentan una composición sencilla en informes o diapositivas.',
    'Personas que quieren crear un PNG sin subir una hoja de cálculo.',
  ],
  caseStudies: [
    {
      title: 'Presupuesto con cinco categorías',
      description: 'Una asociación introduce alquiler, personal, materiales, comunicación y reserva, todas en euros y para el mismo año. El gráfico calcula los porcentajes; el informe conserva la tabla y aclara si los importes son presupuestados o ejecutados.',
    },
    {
      title: 'Encuesta con respuesta múltiple',
      description: 'La suma de selecciones supera al número de personas porque cada participante podía elegir varias opciones. En vez de presentarlo como partes excluyentes de la población, se cambia a barras y se informa el porcentaje de participantes por opción.',
    },
    {
      title: 'Ocho sectores casi iguales',
      description: 'La leyenda es legible, pero los ángulos resultan difíciles de comparar. Se conserva una vista circular para mostrar la composición general y se añade una tabla o un gráfico de barras ordenado para la comparación precisa.',
    },
  ],
  notes: [
    'Solo admite una serie de datos y valores iguales o superiores a cero.',
    'Al menos un valor debe ser mayor que cero para calcular proporciones.',
    'Los porcentajes visibles usan una cifra decimal y pueden no sumar exactamente 100 por redondeo.',
    'La paleta y la posición de la leyenda son fijas; no hay anillo, sectores separados ni colores personalizados.',
    'El PNG no contiene la tabla, la fuente, la unidad ni texto alternativo.',
  ],
  faq: [
    {
      q: '¿Debo introducir valores que ya sumen 100?',
      a: 'No. Puedes usar cantidades absolutas de la misma unidad; la herramienta calcula cada porcentaje sobre la suma total.',
    },
    {
      q: '¿Qué pasa con un valor cero?',
      a: 'Aparece como 0,0 % en la leyenda y no ocupa sector. Si todos son cero, no se puede formar un total y se muestra un aviso.',
    },
    {
      q: '¿Cuántas categorías conviene usar?',
      a: 'Un conjunto corto es más legible. Como referencia práctica, no más de siete; para más categorías suele funcionar mejor un gráfico de barras.',
    },
    {
      q: '¿Puedo cambiar colores o crear un gráfico de anillo?',
      a: 'No. Esta versión usa una paleta fija y produce un gráfico circular plano con leyenda.',
    },
    {
      q: '¿Por qué los porcentajes no suman exactamente 100?',
      a: 'La leyenda redondea cada sector a una cifra decimal. Los cálculos usan los valores completos.',
    },
    {
      q: '¿Los datos se envían a FunnyTools?',
      a: 'No. La tabla, el cálculo de porcentajes y la imagen se procesan en este navegador.',
    },
  ],
  labels: {
    chartType: 'pie',
    titleLabel: 'Título del gráfico (opcional)',
    titlePlaceholder: 'Ejemplo: Distribución del presupuesto 2026',
    labelHeader: 'Categoría',
    valueHeader: 'Valor',
    addRow: 'Añadir fila',
    remove: 'Eliminar',
    exportPng: 'Descargar PNG',
    canvasLabel: 'Vista previa del gráfico circular',
    emptyHint: 'Introduce al menos una categoría con un valor mayor que cero.',
    seedLabels: 'Vivienda,Alimentación,Transporte,Ocio',
    seedValues: '40,25,20,15',
  },
  privacyNote: 'La tabla y el lienzo permanecen en esta pestaña. FunnyTools no recibe las categorías ni los valores para crear la imagen.',
  disclaimer: 'El gráfico no valida que las categorías formen un total coherente ni incorpora fuente, unidad o contexto. Comprueba el denominador y publica la tabla junto a la imagen.',
};

export const spanishPieChartMakerReview = {
  heading: 'Cómo comprobar un gráfico circular',
  intro: 'Un círculo siempre puede sumar cien en pantalla, incluso cuando se mezclaron unidades, periodos o categorías que no forman un mismo total.',
  panels: [
    {
      title: 'Define el denominador',
      text: 'Escribe qué representa la suma y confirma que cada fila es una parte comparable de ese total.',
    },
    {
      title: 'Revisa sectores y leyenda',
      text: 'Coteja valores, porcentajes, ceros, abreviaturas y orden con la tabla original.',
    },
    {
      title: 'Elige la forma adecuada',
      text: 'Si hay muchas categorías o diferencias pequeñas, añade una tabla o cambia a barras.',
    },
  ],
  checklistHeading: 'Lista de comprobación',
  checklist: [
    'Todas las categorías comparten unidad, periodo y universo.',
    'Al menos un valor es mayor que cero y no hay negativos.',
    'Las etiquetas abreviadas siguen siendo inequívocas.',
    'La fuente, la tabla y el texto alternativo acompañan al PNG.',
  ],
};

export const spanishWordCounter: ToolContent = {
  name: 'Contador de palabras online',
  short: 'Cuenta palabras, caracteres, líneas, párrafos, frases y tiempo estimado de lectura mientras escribes.',
  long: 'Pega un texto en español o multilingüe y consulta al instante palabras, caracteres con y sin espacios, líneas, párrafos, frases y una estimación de lectura. Las palabras con tildes y ñ se reconocen mediante reglas Unicode; los ideogramas CJK se cuentan uno a uno. El texto se analiza en esta pestaña. No se importa desde Word o PDF, no se corrige la redacción y no se guarda un historial.',
  seoTitle: 'Contador de palabras y caracteres online',
  seoDescription: 'Cuenta palabras, caracteres con y sin espacios, frases, párrafos, líneas y tiempo de lectura. Compatible con tildes, ñ y texto multilingüe.',
  keywords: [
    'contador de palabras online',
    'contar palabras y caracteres',
    'contador de palabras español',
    'cuántas palabras tiene un texto',
    'contar frases y párrafos',
    'calcular tiempo de lectura',
    'recuento de palabras gratis',
  ],
  capabilities: [
    'Actualizar el recuento mientras escribes o pegas texto.',
    'Separar caracteres con espacios y caracteres sin espacios.',
    'Contar palabras con letras Unicode, números, apóstrofos y guiones internos.',
    'Contar líneas, párrafos y grupos terminados por signos de frase.',
    'Estimar minutos de lectura y copiar un resumen de las cifras.',
  ],
  contentSections: [
    {
      heading: 'Respuesta rápida: cómo contar las palabras de un texto',
      paragraphs: [
        'Pega el contenido en el cuadro y lee el valor «Palabras». No hace falta pulsar un botón. El resto de cifras ayuda a interpretar el resultado: caracteres con y sin espacios, líneas, párrafos, frases y minutos estimados. Si necesitas dejar constancia, pulsa «Copiar estadísticas» y pega el resumen en tu ficha de entrega o control editorial.',
        'Antes de compararlo con un límite, averigua qué mide la norma. «500 palabras», «1.500 caracteres con espacios», «2.000 caracteres sin espacios» y «una página» no significan lo mismo. Este contador aplica una regla técnica visible; una universidad, editorial, plataforma o procesador de textos puede tratar abreviaturas, números, guiones, notas, bibliografía y campos ocultos de otra manera.',
      ],
    },
    {
      heading: 'Cómo reconoce palabras en español',
      paragraphs: [
        'La herramienta agrupa secuencias de letras o números Unicode. Por eso `acción`, `niñez`, `vergüenza` y `2026` cuentan como una unidad cada una. Un apóstrofo o guion situado dentro de una secuencia mantiene unido el término, mientras los espacios y la mayoría de signos separan. Los ideogramas chinos, japoneses o coreanos del rango CJK se cuentan de uno en uno para que un texto mixto no dependa de espacios.',
        'Esta regla no es un análisis lingüístico. No distingue lemas, palabras compuestas según una guía editorial, nombres con formatos poco habituales ni abreviaturas complejas. Tampoco lee comentarios, notas al pie o texto oculto de un archivo, porque solo analiza lo que pegaste. Si una convocatoria define su propio método, comprueba el recuento en el sistema de entrega antes de cerrar el documento.',
      ],
      items: [
        'Las letras con tilde, diéresis y ñ se reconocen como letras.',
        'Los números forman tokens y pueden contar como palabras.',
        'Los guiones y apóstrofos internos pueden mantener una secuencia unida.',
        'Los signos, espacios y saltos suelen separar unidades.',
      ],
    },
    {
      heading: 'Caracteres, líneas, párrafos y frases',
      paragraphs: [
        '«Caracteres con espacios» usa la longitud de la cadena de JavaScript; incluye letras, signos, tabulaciones y saltos de línea. «Sin espacios» retira los caracteres que JavaScript clasifica como espacio en blanco. Algunos emoji y secuencias combinadas pueden ocupar más de una unidad interna, así que la cifra puede diferir del contador de una red social o del número de símbolos que percibe una persona.',
        'Una línea cambia con cada salto pegado. Un párrafo requiere una línea en blanco entre bloques; un simple salto dentro del mismo bloque suma líneas, no párrafos. Las frases se aproximan buscando grupos cerrados por punto, interrogación o exclamación, incluidos `¿?` y `¡!`; las abreviaturas y puntos suspensivos pueden alterar el resultado. Usa estas métricas para revisar estructura, no como análisis gramatical definitivo.',
      ],
    },
    {
      heading: 'Qué significa el tiempo estimado de lectura',
      paragraphs: [
        'El cálculo divide los tokens no CJK entre unas 200 palabras por minuto y los caracteres CJK entre unos 300 por minuto, redondeando hacia arriba y mostrando como mínimo un minuto cuando hay texto. Es una referencia de planificación. La velocidad real cambia con edad, idioma, dificultad, formato, tablas, enlaces, fórmulas y objetivo de lectura.',
        'No rellenes un artículo para alcanzar un tiempo concreto. Para una entrada, guion o boletín, usa la estimación junto con una lectura cronometrada de una muestra real. Un texto técnico de 800 palabras puede tardar más que una narración de la misma longitud. Si el contenido se escuchará en voz alta, cronometra la locución: la velocidad oral y las pausas no coinciden con la lectura silenciosa.',
      ],
    },
    {
      heading: 'Tareas, artículos, SEO y publicaciones',
      paragraphs: [
        'En una tarea o candidatura, separa primero las partes que sí cuentan: título, cuerpo, citas, referencias y anexos pueden tener reglas distintas. En un artículo, el número de palabras no demuestra profundidad ni utilidad. Revisa si cada apartado responde a la intención del lector, elimina repeticiones y conserva ejemplos o límites que ayudan a tomar una decisión.',
        'Para SEO, una cifra no garantiza visibilidad. Google puede formar el fragmento desde el contenido o desde la metadescripción según la consulta, y no establece un límite fijo de longitud para esa etiqueta; el texto visible puede cortarse para ajustarse al dispositivo. Cuenta para detectar extremos, pero escribe un resumen único y preciso y comprueba cómo se presenta la página publicada.',
      ],
    },
    {
      heading: 'Privacidad, copia y límites del navegador',
      paragraphs: [
        'El texto permanece en el cuadro de esta pestaña y no se envía a FunnyTools para calcular las estadísticas. La página puede usar servicios generales de analítica o publicidad de acuerdo con su política, pero no incluye el contenido pegado en esos eventos. Aun así, elimina nombres, direcciones o datos confidenciales si no son necesarios para comprobar la longitud.',
        'La herramienta no guarda borradores, historial ni archivos. Al recargar o cerrar la pestaña puedes perder el texto, de modo que el editor original debe seguir siendo tu copia principal. «Copiar estadísticas» copia las cifras, no el contenido. Para documentos muy largos, compara una muestra y confirma después en el procesador o plataforma final, donde pueden existir límites y reglas propios.',
      ],
    },
  ],
  instructions: [
    'Escribe o pega en el cuadro exactamente el contenido que quieres medir.',
    'Compara palabras, caracteres, líneas, párrafos y frases con la regla de destino.',
    'Revisa tildes, guiones, abreviaturas, saltos y partes del documento que deban excluirse.',
    'Usa el tiempo de lectura como estimación y cronometra una muestra si la duración importa.',
    'Copia el resumen y confirma el resultado en la plataforma oficial antes de entregar.',
  ],
  examples: [
    'Comprobar un ensayo con límite de palabras antes de subirlo.',
    'Comparar dos versiones de una introducción sin perder el texto original.',
    'Estimar la duración de lectura de un artículo o boletín.',
    'Revisar líneas y párrafos después de pegar texto desde otro editor.',
    'Medir un borrador multilingüe que contiene tildes, ñ, números y caracteres CJK.',
  ],
  audience: [
    'Estudiantes, docentes, autores, editores y traductores.',
    'Equipos de contenido que registran longitud en una ficha editorial.',
    'Personas que preparan solicitudes, guiones, boletines o publicaciones.',
    'Usuarios que quieren medir texto sin subirlo a un servicio de análisis.',
  ],
  caseStudies: [
    {
      title: 'Ensayo de 1.000 palabras',
      description: 'La guía excluye bibliografía y portada. La persona pega solo el cuerpo, comprueba el recuento y después valida el archivo completo en el campus virtual, porque el sistema de entrega es la referencia final.',
    },
    {
      title: 'Texto con tildes y guiones',
      description: 'La frase «La acción técnico-científica continúa» reconoce las letras acentuadas y mantiene el término con guion como una secuencia. Se compara con el procesador usado por la editorial por si su norma separa compuestos.',
    },
    {
      title: 'Guion de lectura',
      description: 'El contador estima minutos a partir de una velocidad general. La locutora lee un fragmento durante sesenta segundos, mide su ritmo real y ajusta el guion sin confundir lectura silenciosa con duración de voz.',
    },
  ],
  notes: [
    'El recuento es técnico y puede diferir de una norma académica, editorial o de plataforma.',
    'Las abreviaturas, puntos suspensivos y signos pueden afectar la cifra aproximada de frases.',
    'Un párrafo requiere una línea en blanco; un salto simple solo suma una línea.',
    'Algunos emoji y caracteres combinados ocupan más de una unidad de cadena.',
    'El tiempo de lectura es una estimación, no una promesa de duración.',
  ],
  faq: [
    {
      q: '¿Cuenta bien las palabras con tilde y la letra ñ?',
      a: 'Sí. La regla usa letras Unicode, por lo que reconoce palabras españolas con tildes, diéresis y ñ.',
    },
    {
      q: '¿Los números cuentan como palabras?',
      a: 'Sí. Una secuencia numérica se cuenta como un token; confirma si la norma de destino aplica otro criterio.',
    },
    {
      q: '¿Por qué mi procesador de textos muestra otra cifra?',
      a: 'Cada sistema puede tratar guiones, apóstrofos, abreviaturas, notas y campos de forma distinta. Para una entrega, manda la regla oficial.',
    },
    {
      q: '¿El tiempo de lectura es exacto?',
      a: 'No. Se estima con una velocidad general y se redondea; idioma, complejidad y formato cambian la duración real.',
    },
    {
      q: '¿Puede leer un archivo DOCX o PDF?',
      a: 'No. Esta versión solo analiza el texto que escribes o pegas en el cuadro.',
    },
    {
      q: '¿FunnyTools guarda mi texto?',
      a: 'No. El análisis ocurre en la pestaña y el sitio no guarda un historial del contenido pegado.',
    },
  ],
  labels: {
    input: 'Texto que quieres contar',
    placeholder: 'Escribe o pega aquí el texto…',
    characters: 'Caracteres con espacios',
    charactersNoSpaces: 'Caracteres sin espacios',
    words: 'Palabras',
    lines: 'Líneas',
    paragraphs: 'Párrafos',
    sentences: 'Frases',
    readingTime: 'Lectura estimada',
    minutes: 'min',
    copyStats: 'Copiar estadísticas',
    clear: 'Borrar',
    copied: 'Estadísticas copiadas',
    note: 'Regla: letras y números Unicode forman palabras; los ideogramas CJK se cuentan uno a uno. La lectura usa unas 200 palabras o 300 caracteres CJK por minuto.',
  },
  privacyNote: 'El texto se analiza en la memoria de esta pestaña. FunnyTools no lo recibe ni lo guarda para obtener el recuento.',
  disclaimer: 'Los recuentos varían según la norma y la plataforma. Para una entrega oficial, confirma qué partes cuentan y valida el archivo en el sistema de destino.',
};

export const spanishWordCounterReview = {
  heading: 'Cómo comprobar un recuento de palabras',
  intro: 'Una cifra solo es útil si mide el texto correcto con la misma regla que utiliza la escuela, editorial o plataforma de destino.',
  panels: [
    {
      title: 'Define qué cuenta',
      text: 'Aclara si se incluyen título, citas, notas, bibliografía, números y texto entre guiones.',
    },
    {
      title: 'Revisa el pegado',
      text: 'Comprueba tildes, saltos, párrafos y fragmentos ausentes antes de leer la cifra.',
    },
    {
      title: 'Valida en destino',
      text: 'Compara el resultado con el procesador o formulario oficial cuando exista una regla obligatoria.',
    },
  ],
  checklistHeading: 'Lista de comprobación',
  checklist: [
    'El cuadro contiene todo y solo el texto que debe medirse.',
    'La unidad requerida es palabras, caracteres con espacios o sin espacios.',
    'Las reglas para guiones, números y referencias están documentadas.',
    'La copia principal sigue guardada fuera de esta pestaña.',
  ],
};

export const spanishCharacterCounter: ToolContent = {
  name: 'Contador de caracteres online',
  short: 'Mide caracteres con y sin espacios, bytes UTF-8, palabras y líneas, con referencias para X, SMS y metadescripciones.',
  long: 'Pega un texto para consultar su longitud mientras escribes. La página muestra unidades de cadena con y sin espacios, bytes codificados en UTF-8, palabras y líneas. También compara la cifra con referencias de 280 para un post habitual de X y 160 para SMS o metadescripción. Esas referencias no reproducen las reglas exactas de cada plataforma: URL, emoji, Unicode, codificación y anchura visual pueden cambiar el límite real.',
  seoTitle: 'Contador de caracteres, espacios y bytes UTF-8',
  seoDescription: 'Cuenta caracteres con y sin espacios, bytes UTF-8, palabras y líneas. Revisa X, SMS y metadescripciones con límites explicados y cálculo local.',
  keywords: [
    'contador de caracteres online',
    'contar caracteres con espacios',
    'contador de letras y caracteres',
    'caracteres sin espacios',
    'contador bytes UTF-8',
    'contador caracteres X',
    'longitud meta descripción',
  ],
  capabilities: [
    'Actualizar caracteres, bytes, palabras y líneas mientras escribes.',
    'Comparar longitud con y sin espacios en blanco.',
    'Medir los bytes producidos por `TextEncoder` en UTF-8.',
    'Mostrar referencias visuales de 280 y 160 unidades.',
    'Copiar un resumen textual para una revisión o incidencia.',
  ],
  contentSections: [
    {
      heading: 'Respuesta rápida: cómo contar caracteres',
      paragraphs: [
        'Pega el texto y consulta «Caracteres con espacios» o «Caracteres sin espacios», según la regla que debas cumplir. El contador cambia al instante y marca en rojo las referencias cuando se superan 280 o 160. «Bytes UTF-8» responde a otra pregunta: cuánto ocupa la cadena después de codificarla en UTF-8. No confundas letras visibles, unidades internas, bytes y límite de una plataforma.',
        'El navegador usa la longitud de una cadena JavaScript. Una letra española precompuesta suele ocupar una unidad, pero muchos emoji y algunas secuencias combinadas ocupan dos o más. Por eso el resultado puede no coincidir con lo que una persona percibe como un solo símbolo ni con el cálculo ponderado de una red social. Usa la cifra como comprobación previa y prueba el texto en el destino real.',
      ],
    },
    {
      heading: 'Caracteres con espacios, sin espacios y letras',
      paragraphs: [
        'Un carácter no es necesariamente una letra. El total incluye cifras, signos, emoji, tabulaciones y saltos de línea. La versión «sin espacios» elimina espacios en blanco reconocidos por JavaScript, no solo la barra espaciadora. Si una convocatoria pide «caracteres con espacios», pega exactamente el texto que se entregará; quitar saltos o normalizar espacios antes puede cambiar el resultado.',
        'Este contador no ofrece una columna exclusiva de letras ni segmenta grafemas visibles. Un acento puede estar guardado como una letra precompuesta o como letra más marca combinada; ambos se ven igual, pero su longitud interna puede diferir. Para bases de datos, validadores o redes sociales, confirma si el sistema cuenta puntos de código, unidades UTF-16, grafemas, bytes o una regla propia.',
      ],
      items: [
        'Con espacios incluye espacios, tabulaciones y saltos de línea.',
        'Sin espacios retira los caracteres clasificados como espacio en blanco.',
        'Los signos y números siguen formando parte del total.',
        'Un emoji visible puede ocupar varias unidades internas.',
      ],
    },
    {
      heading: 'Qué mide la cifra de bytes UTF-8',
      paragraphs: [
        '`TextEncoder` convierte la cadena a UTF-8 y la longitud del resultado indica bytes. Los caracteres ASCII suelen ocupar un byte; letras acentuadas, alfabetos no latinos y emoji pueden requerir más. Dos textos con el mismo número de caracteres pueden tener tamaños distintos. Esta métrica resulta útil al revisar payloads, campos, archivos, importaciones o límites técnicos expresados en bytes.',
        'No asumas que `varchar(160)` significa 160 bytes ni que un límite de API usa UTF-8: depende de base de datos, juego de caracteres y capa de validación. La cifra tampoco incluye comillas, escapes, nombres de campos o estructura JSON que una API pueda añadir. Crea una prueba con texto español, saltos, emoji y el caso más largo, y valida el resultado en el sistema que almacenará o enviará los datos.',
      ],
    },
    {
      heading: 'X, SMS y límites que no son universales',
      paragraphs: [
        'X mantiene 280 caracteres como límite habitual, pero ofrece publicaciones más largas en planes o funciones específicas. La plataforma también aplica reglas propias a URL y ciertos caracteres. La referencia 280 de esta página solo compara la longitud local; no inicia sesión, no consulta tu plan ni garantiza que el post pueda publicarse.',
        'Un SMS clásico puede admitir 160 caracteres con GSM-7, pero al incluir caracteres fuera de ese conjunto, como determinados signos, emoji o escritura no latina, puede cambiar a UCS-2 y bajar a unas 70 unidades por segmento. Los mensajes concatenados reservan espacio adicional. El indicador 160 no detecta la codificación ni calcula segmentos o coste; confirma el resultado en el proveedor antes de una campaña.',
      ],
    },
    {
      heading: 'Metadescripciones: 160 es una referencia, no una norma',
      paragraphs: [
        'Google indica que una metadescripción no tiene límite fijo de longitud. El fragmento de búsqueda se genera principalmente desde el contenido y puede usar la etiqueta cuando describe mejor la página; después se corta según el dispositivo y la consulta. Por eso el indicador 160 sirve para editar una frase compacta, no para prometer que aparecerá completa ni que Google la usará.',
        'Escribe una descripción única que resuma el contenido y ayude a decidir si el resultado responde a la búsqueda. No llenes el espacio con variantes de palabras clave. La anchura de letras, la fecha, el nombre del sitio y otros elementos también afectan la presentación. Tras publicar, revisa el HTML, la indexación y consultas reales en Search Console en vez de perseguir una cifra exacta.',
      ],
    },
    {
      heading: 'Privacidad, copia y comprobación final',
      paragraphs: [
        'El texto se analiza en esta pestaña y no se envía a FunnyTools para calcular longitud o bytes. Los servicios generales de analítica o publicidad descritos en la política del sitio no reciben el contenido del cuadro como parámetro de esos eventos. Elimina datos personales innecesarios y trabaja sobre una copia si la cadena pertenece a un sistema o cliente.',
        'El botón de copia genera un resumen con cifras, no copia el texto completo. Puedes pegarlo en una incidencia de software, ficha SEO o lista de revisión, pero añade también la versión, codificación y plataforma evaluadas. Antes de publicar o importar, pega la cadena en el campo real: solo el destino puede confirmar truncamiento, normalización, recuento ponderado, segmentos y almacenamiento.',
      ],
    },
  ],
  instructions: [
    'Pega exactamente la cadena que se publicará, enviará o almacenará.',
    'Elige la medida pertinente: con espacios, sin espacios, bytes UTF-8, palabras o líneas.',
    'Comprueba si hay emoji, signos, tildes, saltos o caracteres combinados que cambien el cálculo.',
    'Trata 280 y 160 como referencias y revisa la regla oficial del servicio.',
    'Copia las estadísticas y prueba el texto en el campo o plataforma de destino.',
  ],
  examples: [
    'Recortar un post habitual de X antes de abrir el compositor.',
    'Comparar un SMS simple con otro que contiene emoji o signos Unicode.',
    'Revisar una metadescripción sin asumir un límite fijo de Google.',
    'Medir bytes UTF-8 de un valor antes de una importación.',
    'Adjuntar un resumen de longitud a una incidencia de validación.',
  ],
  audience: [
    'Redactores, equipos SEO, community managers y responsables de campañas.',
    'Desarrolladores y QA que revisan campos, API o importaciones.',
    'Personas que trabajan con textos españoles, emoji y contenido multilingüe.',
    'Usuarios que necesitan medir una cadena sin enviarla a un analizador remoto.',
  ],
  caseStudies: [
    {
      title: 'Post habitual de X',
      description: 'El borrador queda por debajo de 280 en el contador. Antes de publicar se prueba en X, porque una URL, el tipo de cuenta y la forma en que la plataforma pondera caracteres pueden cambiar el resultado final.',
    },
    {
      title: 'SMS con comillas curvas',
      description: 'Un mensaje corto contiene comillas tipográficas y emoji. Aunque el indicador está por debajo de 160, el proveedor detecta Unicode y calcula más de un segmento. Se revisa allí la codificación y el coste antes del envío.',
    },
    {
      title: 'Campo que limita bytes',
      description: 'Dos cadenas tienen la misma longitud visible, pero la versión con tildes y emoji ocupa más bytes UTF-8. El equipo prueba el payload completo y documenta si la API limita bytes, caracteres o tamaño total del JSON.',
    },
  ],
  notes: [
    'La longitud de cadena no equivale siempre a símbolos visibles ni al recuento de una plataforma.',
    'La referencia de X no contempla URL, cuenta, funciones premium ni ponderación propia.',
    'La referencia SMS no detecta GSM-7, UCS-2, segmentos concatenados ni coste.',
    'Google no fija 160 como límite de metadescripción y puede reescribir o cortar el fragmento.',
    'Los bytes corresponden a UTF-8 de la cadena, no al tamaño total de un archivo o payload.',
  ],
  faq: [
    {
      q: '¿Los espacios cuentan como caracteres?',
      a: 'Sí en el total con espacios. La segunda cifra elimina espacios en blanco para que puedas comparar ambas reglas.',
    },
    {
      q: '¿Por qué un emoji puede sumar más de uno?',
      a: 'JavaScript representa muchos emoji con varias unidades UTF-16. Una secuencia visual también puede combinar varios puntos de código.',
    },
    {
      q: '¿280 garantiza que el texto cabe en X?',
      a: 'No. Es una referencia para posts habituales; X puede aplicar reglas propias y ofrecer límites distintos según la función o cuenta.',
    },
    {
      q: '¿Un SMS siempre admite 160 caracteres?',
      a: 'No. GSM-7 suele permitir 160 en un segmento; Unicode puede reducir la capacidad y los mensajes largos reservan espacio para concatenación.',
    },
    {
      q: '¿Google limita la metadescripción a 160 caracteres?',
      a: 'No establece un límite fijo. El fragmento puede cortarse según dispositivo y consulta, y puede generarse desde el contenido de la página.',
    },
    {
      q: '¿El texto se envía a FunnyTools?',
      a: 'No. La longitud y los bytes se calculan en la memoria de esta pestaña.',
    },
  ],
  labels: {
    input: 'Texto que quieres medir',
    placeholder: 'Escribe o pega aquí el texto…',
    characters: 'Caracteres con espacios',
    charactersNoSpaces: 'Caracteres sin espacios',
    bytes: 'Bytes UTF-8',
    words: 'Palabras',
    lines: 'Líneas',
    limits: 'Referencias rápidas',
    twitter: 'Post habitual de X',
    sms: 'SMS de referencia',
    meta: 'Metadescripción de referencia',
    copyStats: 'Copiar estadísticas',
    clear: 'Borrar',
    copied: 'Estadísticas copiadas',
    note: 'Las referencias 280 y 160 no reproducen las reglas de X, SMS o Google. Comprueba el texto en la plataforma de destino.',
  },
  privacyNote: 'La cadena y sus estadísticas permanecen en esta pestaña. FunnyTools no recibe el texto para contar caracteres o bytes.',
  disclaimer: 'Los servicios cuentan caracteres, URL, emoji, bytes y segmentos con reglas propias. Usa estas cifras como preflight y valida siempre en el destino.',
};

export const spanishCharacterCounterReview = {
  heading: 'Cómo comprobar una longitud de texto',
  intro: 'El error habitual no es contar mal, sino comparar unidades distintas: caracteres visibles, UTF-16, bytes, segmentos SMS o reglas de plataforma.',
  panels: [
    {
      title: 'Identifica la unidad',
      text: 'Confirma si el requisito habla de caracteres, bytes, espacios, palabras o segmentos.',
    },
    {
      title: 'Prueba casos reales',
      text: 'Incluye tildes, ñ, emoji, URL, saltos y la cadena más larga que pueda llegar al sistema.',
    },
    {
      title: 'Valida en destino',
      text: 'Comprueba el mismo texto en X, el proveedor SMS, el CMS, la API o la base de datos.',
    },
  ],
  checklistHeading: 'Lista de comprobación',
  checklist: [
    'La cadena probada coincide con la versión final.',
    'La unidad y codificación del límite están documentadas.',
    'Los indicadores 280 y 160 se tratan como referencias, no garantías.',
    'La validación final se realizó en la plataforma correspondiente.',
  ],
};
