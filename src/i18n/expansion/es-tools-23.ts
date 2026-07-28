import type { ToolContent } from '../tools/_types';

export const spanishSketchpad: ToolContent = {
  name: 'Pizarra para dibujar online',
  short: 'Haz un boceto a mano alzada con ratón, pantalla táctil o lápiz, deshaz trazos y descarga el resultado en PNG.',
  long: 'Esta pizarra para dibujar online ofrece un lienzo blanco sencillo para tomar una nota visual, explicar una idea o preparar un croquis rápido. Puedes elegir color y grosor, usar una goma que pinta de blanco, deshacer hasta treinta estados recientes y guardar una copia PNG. El dibujo se crea en el navegador: no hay cuenta, colaboración, almacenamiento en la nube ni recuperación automática al cerrar la página.',
  seoTitle: 'Pizarra para dibujar online gratis | Descargar PNG',
  seoDescription: 'Dibuja online con ratón, dedo o lápiz. Cambia color y grosor, usa goma y deshacer, y descarga un PNG. Sin registro ni subida de la imagen.',
  keywords: [
    'pizarra para dibujar online',
    'dibujar online gratis',
    'lienzo para dibujar',
    'hacer un boceto online',
    'pizarra digital sencilla',
    'dibujo con ratón',
    'descargar dibujo PNG',
  ],
  capabilities: [
    'Dibujar a mano alzada con ratón, panel táctil, dedo o lápiz compatible.',
    'Escoger cualquier color y un grosor entre 1 y 48 píxeles.',
    'Borrar pintando en blanco sobre el lienzo, que siempre tiene fondo blanco.',
    'Deshacer trazos recientes dentro de un historial limitado a treinta estados.',
    'Vaciar toda la pizarra después de una confirmación.',
    'Descargar el estado visible como archivo PNG de 960 × 560 píxeles.',
  ],
  contentSections: [
    {
      heading: 'Respuesta rápida: cómo dibujar online y guardar el resultado',
      paragraphs: [
        'Elige un color, ajusta el grosor y arrastra sobre el lienzo. Un clic o toque breve crea un punto; al desplazar el puntero se forma un trazo continuo. La opción Goma no recorta ni vuelve transparente la imagen: cubre lo dibujado con blanco. Cuando termines, pulsa Descargar PNG antes de abandonar la página. El archivo conserva las dimensiones internas de 960 por 560 píxeles aunque el lienzo se vea más pequeño en un móvil.',
        'Deshacer vuelve al estado anterior a un trazo completo. No elimina solamente el último segmento del movimiento. El historial guarda como máximo treinta estados para limitar el uso de memoria; después de ese límite, los estados más antiguos dejan de estar disponibles. Borrar todo también crea un estado, de modo que puedes deshacer inmediatamente si confirmaste por error, siempre que no recargues la página.',
      ],
      items: [
        'Color oscuro y grosor de 4 a 8 px: notas y esquemas legibles.',
        'Grosor de 1 a 3 px: detalles pequeños en una pantalla grande.',
        'Grosor de 16 px o más: títulos, marcas visibles y relleno manual.',
        'Descarga antes de recargar, cerrar o seguir un enlace.',
      ],
    },
    {
      heading: 'Qué tipo de pizarra es y qué no pretende sustituir',
      paragraphs: [
        'Es un bloc de dibujo individual y temporal. Sirve cuando necesitas convertir una idea en líneas sin instalar una aplicación: una flecha sobre un esquema, la distribución inicial de una diapositiva, una firma de muestra que no tenga valor contractual, una explicación geométrica o una miniatura para recordar una composición. La interfaz evita capas, cuentas y paneles complejos para que el primer trazo sea inmediato.',
        'No es una pizarra colaborativa. No genera un enlace compartido, no sincroniza cursores, no permite que dos personas editen el mismo lienzo y no conserva versiones en un servidor. Tampoco ofrece texto editable, figuras geométricas, relleno automático, selección de objetos, capas, vectores SVG o importación de imágenes. Si necesitas líneas y formas con medidas, utiliza CAD 2D; si necesitas procesos conectados, usa el creador de diagramas de flujo.',
      ],
      link: {
        prefix: 'Para trazar líneas, rectángulos y medidas con mayor precisión, abre ',
        label: 'CAD 2D online',
        href: '/es/herramientas/cad-2d-online/',
        suffix: '.',
      },
    },
    {
      heading: 'Ratón, dedo y lápiz: cómo interpreta el navegador cada trazo',
      paragraphs: [
        'La herramienta usa Pointer Events, el modelo web que reúne ratón, tacto y lápiz bajo los mismos eventos de puntero. Al comenzar, el lienzo captura ese puntero para seguir recibiendo movimientos hasta que levantas el dedo o el lápiz. La propiedad touch-action está desactivada dentro del lienzo para que un gesto de dibujo no se convierta a mitad del trazo en desplazamiento o zoom de la página.',
        'La coordenada visible se escala a la resolución interna del lienzo. Esto permite dibujar en una versión reducida en el teléfono y exportar el tamaño completo. La precisión real depende del dispositivo: un dedo cubre más superficie que un lápiz y algunos paneles táctiles filtran movimientos breves. El grosor no responde a la presión; siempre usa el valor elegido. Para una línea lenta y limpia, amplía la página si lo necesitas y usa un grosor moderado.',
      ],
    },
    {
      heading: 'Método práctico para un boceto que se entienda',
      paragraphs: [
        'Empieza por la estructura y no por el detalle. Marca primero los límites, los bloques principales y la dirección de lectura con un color oscuro. Añade un segundo color solo para distinguir una categoría concreta, una corrección o el elemento que debe atraer la atención. Si todo tiene un color distinto, el lector tendrá que descifrar la leyenda antes de entender la idea.',
        'Deja márgenes alrededor del dibujo porque el PNG incluye todo el lienzo, no recorta automáticamente la zona usada. Escribe con trazos grandes si el archivo se verá luego como miniatura. Antes de descargar, comprueba que la goma no haya ocultado parte de una línea contigua y que el contraste funcione sobre fondo blanco. Si necesitas varias variantes, descarga cada una con un nombre propio después de mover el archivo a una carpeta; la página siempre propone el mismo nombre localizado.',
      ],
      items: [
        'Define qué debe comprender otra persona en cinco segundos.',
        'Dibuja primero contornos, después relaciones y al final detalles.',
        'Usa flechas con punta clara para evitar direcciones ambiguas.',
        'Comprueba el PNG descargado antes de borrar el lienzo.',
      ],
    },
    {
      heading: 'PNG, resolución, fondo blanco y calidad de exportación',
      paragraphs: [
        'PNG es apropiado para líneas, texto dibujado y áreas de color plano porque no introduce los bloques de compresión típicos de JPEG. El archivo se genera con HTMLCanvasElement.toDataURL en el propio navegador. El fondo se rellena de blanco desde el inicio y cada vez que se restaura un estado, por lo que el PNG no tiene transparencia. La goma coincide con ese fondo y no crea un canal alfa.',
        'La resolución de 960 × 560 es suficiente para notas visuales y documentos de pantalla, pero no equivale a un original vectorial. Si amplías mucho el PNG, las líneas pueden pixelarse. El tamaño de impresión depende de la densidad elegida en el programa de destino: a 96 ppp ronda 25,4 × 14,8 cm; a 300 ppp ronda 8,1 × 4,7 cm. Son conversiones físicas orientativas, no una propiedad incrustada que garantice cómo imprimirá cada aplicación.',
      ],
    },
    {
      heading: 'Privacidad, pérdida de datos y uso responsable',
      paragraphs: [
        'Los trazos permanecen en memoria dentro de esta pestaña y la descarga se genera localmente. FunnyTools no recibe la imagen. Esa privacidad también implica que no existe una copia de seguridad en la cuenta del sitio: recargar, cerrar la pestaña, agotar memoria o sufrir un cierre del navegador puede borrar el trabajo. Para algo que no quieras repetir, descarga versiones intermedias.',
        'No dibujes ni pegues información personal, médica, financiera o de acceso si después vas a compartir el archivo sin revisar. Una captura aparentemente inocente puede contener nombres, firmas, direcciones o datos de una clase. La pizarra no elimina metadatos de archivos porque no importa ninguno, pero el nombre y la carpeta de descarga dependen del dispositivo. Comprueba el destino antes de enviar el PNG a otra persona.',
      ],
    },
  ],
  instructions: [
    'Elige Color del pincel y mueve el control de Grosor hasta el valor deseado entre 1 y 48 píxeles.',
    'Dibuja sobre el lienzo blanco con ratón, dedo o lápiz. Un toque breve deja un punto.',
    'Activa Goma para cubrir trazos con blanco; desactívala para volver al color seleccionado.',
    'Pulsa Deshacer para recuperar el estado anterior al último trazo. Se conservan hasta treinta estados.',
    'Usa Borrar y confirma solo si quieres dejar todo el lienzo en blanco.',
    'Pulsa Descargar PNG y abre el archivo pizarra-dibujo.png para comprobarlo antes de cerrar la página.',
  ],
  examples: [
    'Esbozar la posición de título, imagen y llamada a la acción de una diapositiva.',
    'Explicar una fracción, un ángulo o una relación espacial durante una videollamada compartiendo pantalla.',
    'Dibujar una ruta sencilla con puntos de referencia y descargarla para enviarla por mensajería.',
    'Preparar una miniatura visual antes de pasar el diseño a una aplicación con capas.',
    'Anotar a mano una secuencia breve de ideas sin abrir una cuenta de pizarra colaborativa.',
  ],
  audience: [
    'Personas que necesitan un boceto desechable y rápido.',
    'Docentes y estudiantes que explican una idea mientras comparten pantalla.',
    'Equipos que quieren adjuntar una nota visual simple a un documento o conversación.',
    'Usuarios de móvil o tableta que prefieren dibujar con el dedo o un lápiz.',
  ],
  caseStudies: [
    {
      title: 'Boceto para una diapositiva',
      description: 'Una persona dibuja tres bloques grandes, prueba dos jerarquías y descarga cada alternativa. El PNG sirve como referencia para montar después la versión final con texto editable.',
    },
    {
      title: 'Explicación rápida en clase',
      description: 'Un docente comparte la pestaña, usa un color para el problema y otro para la corrección. Descarga el resultado al terminar y evita presentar la herramienta como una pizarra multiusuario.',
    },
    {
      title: 'Croquis de orientación',
      description: 'Una persona marca la entrada, dos giros y un punto de referencia. Antes de enviarlo, revisa que no aparezca una dirección privada que no sea necesaria.',
    },
  ],
  notes: [
    'No hay guardado automático ni recuperación después de cerrar o recargar.',
    'La goma pinta de blanco; no crea transparencia.',
    'Deshacer conserva un máximo de treinta estados, incluido el lienzo inicial.',
    'El PNG tiene 960 × 560 píxeles y puede pixelarse al ampliarlo mucho.',
    'La herramienta no importa imágenes, no ofrece capas y no es colaborativa.',
  ],
  faq: [
    {
      q: '¿Puedo dibujar online sin registrarme?',
      a: 'Sí. El lienzo está disponible al abrir la página y no solicita cuenta. El trabajo queda en esta pestaña hasta que lo descargues o se pierda al cerrarla.',
    },
    {
      q: '¿Funciona con pantalla táctil y lápiz?',
      a: 'Usa Pointer Events, por lo que admite ratón, dedo y lápiz en navegadores compatibles. No interpreta presión ni inclinación; el grosor es el valor fijo elegido.',
    },
    {
      q: '¿La pizarra guarda el dibujo automáticamente?',
      a: 'No. Descarga el PNG antes de recargar o cerrar. FunnyTools no conserva una copia en un servidor.',
    },
    {
      q: '¿La goma deja el fondo transparente?',
      a: 'No. La goma cubre con blanco y el lienzo se exporta con fondo blanco.',
    },
    {
      q: '¿Cuántas veces puedo deshacer?',
      a: 'El historial mantiene como máximo treinta estados recientes. Un trazo terminado y una limpieza confirmada crean estados nuevos.',
    },
    {
      q: '¿Puedo añadir texto o formas editables?',
      a: 'No. Todo se dibuja a mano alzada. Para rectángulos y medidas usa CAD 2D; para nodos y flechas usa el creador de diagramas de flujo.',
    },
    {
      q: '¿Qué tamaño tiene el PNG?',
      a: 'El archivo tiene 960 × 560 píxeles. La visualización se adapta al ancho de la pantalla sin cambiar esa resolución interna.',
    },
    {
      q: '¿Puedo compartir la pizarra en tiempo real?',
      a: 'No. Puedes compartir pantalla o enviar el PNG descargado, pero la página no crea salas ni enlaces de edición conjunta.',
    },
  ],
  labels: {
    localNote: 'Los trazos se procesan en este navegador. Descarga una copia antes de salir.',
    color: 'Color del pincel',
    brushSize: 'Grosor',
    pixels: 'px',
    eraser: 'Goma',
    undo: 'Deshacer',
    clear: 'Borrar',
    exportPng: 'Descargar PNG',
    canvasLabel: 'Lienzo blanco de la pizarra para dibujar',
    confirmClear: '¿Quieres borrar todo el lienzo?',
    downloadFilename: 'pizarra-dibujo.png',
  },
  sources: [
    {
      label: 'MDN: uso de Pointer Events',
      href: 'https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events/Using_Pointer_Events',
      note: 'Documenta el modelo de entrada común para ratón, pantalla táctil y lápiz aplicado al dibujo en canvas.',
    },
    {
      label: 'W3C: Pointer Events',
      href: 'https://www.w3.org/TR/pointerevents/',
      note: 'Especificación técnica del modelo de eventos y de touch-action.',
    },
    {
      label: 'MDN: HTMLCanvasElement.toDataURL()',
      href: 'https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL',
      note: 'Describe la conversión del contenido del lienzo a una URL de datos para la descarga PNG.',
    },
  ],
  privacyNote: 'El dibujo y los estados de deshacer viven en la memoria de esta pestaña. El PNG se genera localmente; FunnyTools no recibe ni conserva la imagen.',
  disclaimer: 'Bloc de dibujo básico para bocetos. No es una pizarra colaborativa, no ofrece almacenamiento persistente y no sustituye una aplicación de diseño vectorial o documentación técnica.',
};

export const spanishSketchpadReview = {
  heading: 'Revisión antes de descargar el dibujo',
  intro: 'Un boceto útil debe entenderse, conservar el contraste y tener una copia fuera de la pestaña.',
  panels: [
    { title: 'Lectura', text: 'Comprueba el dibujo al tamaño en el que otra persona lo verá.' },
    { title: 'Archivo', text: 'Descarga y abre el PNG antes de borrar o cerrar.' },
    { title: 'Privacidad', text: 'Retira nombres, firmas o datos que no deban compartirse.' },
  ],
  checklistHeading: 'Lista de comprobación',
  checklist: [
    'El fondo blanco no oculta trazos claros.',
    'Las flechas y relaciones no son ambiguas.',
    'El margen exterior es suficiente.',
    'El archivo descargado se abre correctamente.',
    'No se espera edición colaborativa ni recuperación automática.',
  ],
};

export const spanishFlowchart: ToolContent = {
  name: 'Creador de diagramas de flujo online',
  short: 'Organiza pasos y decisiones con rectángulos, rombos y flechas, mueve los nodos y descarga el diagrama en PNG.',
  long: 'Este creador de diagramas de flujo online está pensado para esquemas breves. Incluye nodos de proceso, nodos de decisión, conexiones con flecha, edición de texto, arrastre, selección y borrado. El diagrama nace con un proceso y una decisión de ejemplo para que puedas empezar. Todo queda en la pestaña y la exportación es una imagen PNG; no hay cuenta, colaboración, archivos editables ni guardado automático.',
  seoTitle: 'Creador de diagramas de flujo online gratis | PNG',
  seoDescription: 'Crea un diagrama de flujo sencillo con procesos, decisiones y flechas. Edita, mueve y borra nodos, y descarga PNG sin registro ni subida.',
  keywords: [
    'creador de diagramas de flujo online',
    'hacer diagrama de flujo gratis',
    'flujograma online',
    'diagrama de procesos',
    'rombo de decisión',
    'rectángulo de proceso',
    'exportar diagrama PNG',
  ],
  capabilities: [
    'Añadir rectángulos de proceso y rombos de decisión.',
    'Editar el texto del nodo seleccionado con un botón o con doble clic.',
    'Mover nodos dentro de los límites del lienzo.',
    'Conectar dos nodos con una flecha direccional.',
    'Seleccionar y eliminar un nodo con todas sus conexiones o una flecha individual.',
    'Descargar una imagen PNG limpia sin marcas de selección.',
  ],
  contentSections: [
    {
      heading: 'Respuesta rápida: cómo hacer un diagrama de flujo',
      paragraphs: [
        'Define el punto de partida y el resultado final antes de dibujar. Añade un rectángulo por cada acción concreta y un rombo cuando la respuesta cambie la ruta. Selecciona un nodo y pulsa Editar texto, arrástralo para dejar espacio y entra en modo Conectar: pulsa primero el origen y después el destino. La punta de la flecha indica hacia dónde avanza el proceso.',
        'Este editor incluye solo dos tipos de nodo. Puedes representar inicio y final mediante rectángulos con texto explícito, por ejemplo “Inicio” y “Fin”, pero la forma seguirá siendo rectangular. Si el documento debe cumplir una notación formal con terminales ovalados, entradas, documentos, carriles, BPMN o UML, utiliza una herramienta especializada y valida el estándar aplicable. Aquí el objetivo es aclarar una secuencia pequeña, no certificar una notación.',
      ],
      items: [
        'Rectángulo: acción, tarea o paso que debe ejecutarse.',
        'Rombo: pregunta o decisión que abre rutas diferentes.',
        'Flecha: orden y dirección entre dos nodos.',
        'Texto corto: verbo de acción en procesos y pregunta en decisiones.',
      ],
    },
    {
      heading: 'Símbolos de diagrama de flujo que ofrece esta herramienta',
      paragraphs: [
        'IBM describe el rectángulo como un proceso específico y el rombo como un punto de decisión. Las flechas muestran dirección y conexión. Esa convención coincide con el comportamiento del editor: el botón Añadir proceso crea un rectángulo, Añadir decisión crea un rombo y Conectar traza una flecha desde el primer nodo elegido hacia el segundo.',
        'No confundas una decisión con una tarea. “Revisar solicitud” es una acción y cabe en un rectángulo; “¿La solicitud está completa?” es una pregunta y cabe en un rombo. El rombo debería tener al menos dos salidas con significado explícito. El editor no permite escribir texto sobre la flecha, por lo que conviene incluir “Sí:” y “No:” al comienzo de los textos de los nodos de destino cuando la ruta no sea evidente.',
      ],
    },
    {
      heading: 'Cómo pasar de una explicación verbal a un flujograma claro',
      paragraphs: [
        'Escribe primero la secuencia en frases, una por línea. Rodea las condiciones que puedan cambiar el siguiente paso. Después elimina detalles que no afecten al flujo y separa las acciones compuestas. “Recibir, comprobar y archivar la solicitud” oculta tres estados; si cualquiera puede fallar o cambiar de responsable, conviene dibujar tres procesos.',
        'Empieza con una ruta principal de arriba abajo o de izquierda a derecha. Añade las excepciones después. Las flechas cruzadas y los retornos largos hacen que un diagrama pequeño sea difícil de seguir. Mueve los nodos hasta que el lector pueda recorrer la ruta sin adivinar. Como este editor usa conexiones rectas, reserva espacio entre ramas y evita colocar un nodo encima de una flecha.',
      ],
      items: [
        'Elige un único proceso y define dónde empieza y termina.',
        'Usa verbos concretos: validar, enviar, registrar, corregir.',
        'Formula decisiones que puedan contestarse con rutas distinguibles.',
        'Prueba cada ruta con un caso real o ficticio.',
      ],
    },
    {
      heading: 'Ejemplo: aprobación de una solicitud',
      paragraphs: [
        'Un esquema mínimo puede tener “Recibir solicitud”, “¿Está completa?”, “Pedir datos”, “Evaluar” y “Comunicar decisión”. La flecha de “Recibir solicitud” llega a la decisión. Una rama conduce a “Pedir datos” y otra a “Evaluar”. Si pedir datos devuelve el expediente a la comprobación, añade una flecha de retorno. Para evitar ambigüedad, escribe “No: pedir datos” y “Sí: evaluar” en esos procesos.',
        'Recorre el dibujo con tres casos: solicitud completa y aprobada, solicitud completa y rechazada, solicitud incompleta. Si el diagrama no explica qué ocurre en alguno, falta un nodo o una decisión. El PNG puede adjuntarse a una reunión o borrador, pero el proceso oficial debería conservar además versión, propietario, fecha, definiciones y controles que esta imagen no contiene.',
      ],
    },
    {
      heading: 'Selección, edición, borrado y exportación PNG',
      paragraphs: [
        'En Seleccionar/Mover, un clic sobre un nodo lo marca y permite arrastrarlo. Un clic cerca de una flecha selecciona la conexión. El botón Eliminar quita el elemento seleccionado; al quitar un nodo también se eliminan las flechas que parten de él o llegan a él. La herramienta no ofrece Deshacer. Antes de borrar una parte compleja, descarga una copia o cancela la acción si todavía no la has ejecutado.',
        'Selecciona un nodo y pulsa Editar texto para abrir un cuadro del navegador; en ordenador también puedes hacer doble clic. Se muestran hasta tres líneas dentro del nodo y un texto demasiado largo puede quedar recortado. Usa frases breves. Al descargar, el editor vuelve a renderizar el diagrama sin el color de selección y crea diagrama-flujo.png. La rejilla clara forma parte de la imagen exportada. El archivo es rasterizado, así que no podrás volver a mover sus nodos en otra sesión.',
      ],
    },
    {
      heading: 'Límites, privacidad y cuándo usar otra herramienta',
      paragraphs: [
        'Los nodos y flechas existen solo en memoria. No se suben a FunnyTools ni se guardan en localStorage. Cerrar, recargar o sufrir un cierre del navegador elimina el estado. Tampoco hay importación, exportación JSON, SVG, PDF, historial, comentarios, permisos o edición simultánea. Para un proceso que deba mantenerse durante meses, usa un formato editable con control de versiones.',
        'Un diagrama puede hacer visible una secuencia, pero no demuestra que el proceso sea correcto, legal, seguro o eficiente. Valida el contenido con las personas que ejecutan cada paso y con la norma aplicable. No incluyas contraseñas, datos personales o detalles de seguridad en una imagen que vaya a circular. Para un simple trazo libre sin semántica de proceso, la pizarra de dibujo es más directa.',
      ],
      link: {
        prefix: 'Si solo necesitas dibujar a mano alzada, utiliza la ',
        label: 'pizarra para dibujar online',
        href: '/es/herramientas/pizarra-dibujo-online/',
        suffix: '.',
      },
    },
  ],
  instructions: [
    'Selecciona un nodo inicial y pulsa Editar texto, o usa doble clic en ordenador; bórralos si prefieres empezar de cero.',
    'Pulsa Añadir proceso para cada acción y Añadir decisión para cada pregunta que abra ramas.',
    'En modo Seleccionar/Mover, arrastra los nodos para ordenar la ruta y dejar hueco entre conexiones.',
    'Pulsa Conectar, selecciona el nodo de origen y después el nodo de destino. Repite para cada flecha.',
    'Selecciona un nodo o una flecha y usa Eliminar si sobra. Recuerda que no existe Deshacer.',
    'Pulsa Descargar PNG y abre diagrama-flujo.png para verificar texto, dirección y encuadre.',
  ],
  examples: [
    'Documentar la recepción, revisión y respuesta de una solicitud.',
    'Representar la lógica de un ejercicio de programación antes de escribir código.',
    'Preparar las rutas de “sí” y “no” de una lista de comprobación.',
    'Explicar un procedimiento de soporte en una reunión.',
    'Detectar un paso repetido o una decisión sin salida en un proceso breve.',
  ],
  audience: [
    'Estudiantes que practican secuencias y decisiones.',
    'Equipos que necesitan un flujograma rápido para conversar.',
    'Personas que documentan un procedimiento pequeño antes de pasarlo a una herramienta formal.',
    'Usuarios que quieren un PNG sin crear una cuenta.',
  ],
  caseStudies: [
    {
      title: 'Entrega de una tarea',
      description: 'El diagrama muestra recepción, comprobación de formato y devolución si falta un archivo. La decisión usa una pregunta y los procesos de destino empiezan con Sí y No para suplir la falta de etiquetas en las flechas.',
    },
    {
      title: 'Diagnóstico inicial de soporte',
      description: 'Un equipo dibuja una ruta corta para comprobar alimentación, conexión y mensaje de error. Después valida cada paso con quien atiende las incidencias y mueve el procedimiento final a documentación editable.',
    },
    {
      title: 'Algoritmo de aula',
      description: 'Un estudiante representa una condición y dos resultados, recorre ejemplos de entrada y corrige una flecha invertida antes de descargar el PNG para su borrador.',
    },
  ],
  notes: [
    'Solo hay rectángulos de proceso y rombos de decisión.',
    'No existe Deshacer, guardado automático ni archivo editable.',
    'El texto visible se limita a tres líneas dentro del nodo.',
    'Las flechas son rectas y no admiten etiquetas.',
    'La rejilla se incluye en el PNG de 1000 × 620 píxeles.',
    'Borrar un nodo elimina también sus conexiones.',
    'El lienzo admite hasta veinte nodos y evita flechas duplicadas en la misma dirección.',
  ],
  faq: [
    {
      q: '¿Cómo creo un diagrama de flujo online?',
      a: 'Añade procesos y decisiones, edita el texto con doble clic, mueve los nodos y usa Conectar seleccionando primero el origen y luego el destino.',
    },
    {
      q: '¿Qué significa el rectángulo?',
      a: 'Representa una acción o paso del proceso. Conviene escribir un verbo concreto y mantener el texto corto.',
    },
    {
      q: '¿Qué significa el rombo?',
      a: 'Representa una decisión. Escribe una pregunta cuya respuesta lleve a dos o más rutas distinguibles.',
    },
    {
      q: '¿Cómo edito el texto de un nodo?',
      a: 'Selecciona el nodo y pulsa Editar texto. En ordenador también puedes hacer doble clic. Cambia el texto y confirma; un texto largo puede recortarse después de tres líneas.',
    },
    {
      q: '¿Puedo etiquetar una flecha con Sí o No?',
      a: 'No directamente. Incluye “Sí:” o “No:” en el texto del nodo de destino y coloca las ramas de forma consistente.',
    },
    {
      q: '¿Puedo deshacer un borrado?',
      a: 'No. La herramienta no tiene Deshacer. Descarga una copia antes de cambios arriesgados y confirma el elemento seleccionado.',
    },
    {
      q: '¿El diagrama se guarda para seguir mañana?',
      a: 'No. El estado vive en esta pestaña. La descarga PNG es una imagen y no permite reabrir los nodos para editarlos.',
    },
    {
      q: '¿Sirve para BPMN, UML o documentación formal?',
      a: 'No como editor conforme. Solo ofrece dos formas y flechas. Usa una herramienta especializada si necesitas símbolos, reglas o archivos editables de una notación.',
    },
  ],
  labels: {
    toolbar: 'Barra del creador de diagramas',
    selectMove: 'Seleccionar/Mover',
    connect: 'Conectar',
    editSelected: 'Editar texto',
    addProcess: 'Añadir proceso',
    addDecision: 'Añadir decisión',
    deleteSelected: 'Eliminar',
    clearAll: 'Borrar todo',
    exportPng: 'Descargar PNG',
    canvasLabel: 'Lienzo del diagrama de flujo',
    processText: 'Proceso',
    decisionText: '¿Decisión?',
    editPrompt: 'Edita el texto del nodo',
    connectFirst: 'Selecciona el nodo de origen',
    connectSecond: 'Selecciona el nodo de destino',
    selectedNode: 'Nodo seleccionado',
    selectedEdge: 'Flecha seleccionada',
    nothingSelected: 'No hay ningún elemento seleccionado',
    confirmClear: '¿Quieres borrar todos los nodos y flechas?',
    downloadFilename: 'diagrama-flujo.png',
    maxNodes: 'El lienzo admite un máximo de 20 nodos.',
    connectionExists: 'Esos nodos ya tienen una flecha en esa dirección.',
  },
  sources: [
    {
      label: 'IBM: qué es un diagrama de flujo',
      href: 'https://www.ibm.com/mx-es/think/topics/flowchart',
      note: 'Referencia en español sobre procesos paso a paso, líneas de flujo y símbolos habituales.',
    },
    {
      label: 'IBM: qué es el mapeo de procesos',
      href: 'https://www.ibm.com/es-es/think/topics/process-mapping',
      note: 'Explica el uso común de rectángulos, rombos y flechas y la validación del mapa con participantes.',
    },
    {
      label: 'MDN: HTML canvas',
      href: 'https://developer.mozilla.org/es/docs/Web/HTML/Reference/Elements/canvas',
      note: 'Documentación técnica del elemento usado para representar y exportar el diagrama.',
    },
  ],
  privacyNote: 'El diagrama se mantiene en la memoria de la pestaña y el PNG se genera en el navegador. FunnyTools no recibe los nodos, textos ni flechas.',
  disclaimer: 'Editor básico para conversar y esbozar procesos. No garantiza conformidad con ISO, ANSI, BPMN, UML ni con procedimientos legales, técnicos o de seguridad.',
};

export const spanishFlowchartReview = {
  heading: 'Revisión del flujo antes de compartirlo',
  intro: 'Un diagrama claro necesita dirección visible, decisiones contestables y todas las rutas cerradas.',
  panels: [
    { title: 'Secuencia', text: 'Recorre las flechas desde el inicio hasta cada final posible.' },
    { title: 'Decisiones', text: 'Comprueba que cada rombo sea una pregunta y tenga salidas distinguibles.' },
    { title: 'Vigencia', text: 'Guarda el PNG como borrador y conserva el proceso oficial en un formato editable.' },
  ],
  checklistHeading: 'Lista de comprobación',
  checklist: [
    'Cada rectángulo contiene una acción concreta.',
    'Ninguna flecha apunta en sentido accidental.',
    'No hay rutas sin salida ni nodos desconectados.',
    'El texto es legible y no queda recortado.',
    'Las personas que ejecutan el proceso pueden validarlo.',
  ],
};

export const spanishRandomStudentPicker: ToolContent = {
  name: 'Selector aleatorio de alumnos',
  short: 'Pega una lista, sortea un alumno con aleatoriedad segura y evita repeticiones hasta completar la ronda.',
  long: 'Este selector aleatorio de alumnos ayuda a elegir un nombre para una pregunta, una demostración o un turno. Acepta una entrada por línea, puede rellenar números del 1 al 200 y mantiene un historial de la ronda. La selección real usa crypto.getRandomValues con rechazo de valores para que cada posición válida tenga la misma probabilidad. Los nombres no se envían a FunnyTools y el CSV se protege frente a inicios de fórmula habituales.',
  seoTitle: 'Selector aleatorio de alumnos | Sin repetir nombres',
  seoDescription: 'Sortea un alumno desde una lista con aleatoriedad segura, modo sin repetir, historial y CSV. Gratis, sin registro y con datos en el navegador.',
  keywords: [
    'selector aleatorio de alumnos',
    'sorteo de nombres para clase',
    'elegir alumno al azar',
    'selector de estudiantes sin repetir',
    'lista aleatoria de alumnos',
    'pasar lista aleatoriamente',
    'random student picker español',
  ],
  capabilities: [
    'Aceptar una entrada por línea y bloquear nombres idénticos que serían ambiguos.',
    'Generar una lista de números consecutivos del 1 al 200.',
    'Elegir una posición con crypto.getRandomValues y rechazo de sesgo de módulo.',
    'Excluir nombres ya seleccionados hasta terminar la ronda.',
    'Copiar el resultado más reciente y ver el orden de selección.',
    'Descargar el historial como CSV UTF-8 con mitigación de fórmulas comunes.',
  ],
  contentSections: [
    {
      heading: 'Respuesta rápida: cómo sortear un alumno sin repetir',
      paragraphs: [
        'Escribe o pega un nombre por línea. Si trabajas por número de lista, introduce el total y pulsa Rellenar números. Mantén activada la opción No repetir para que cada entrada salga una vez antes de empezar otra ronda. Al pulsar Elegir alumno, la herramienta fija el resultado con una fuente aleatoria del navegador, muestra una animación breve y añade el nombre al historial.',
        'Cuando el contador llega a cero, la ronda está completa. La siguiente selección limpia internamente el conjunto de escogidos y comienza otra ronda; aparece un aviso para que sepas que ya no pertenece a la anterior. Reiniciar borra el historial y la memoria de nombres seleccionados, pero conserva la lista escrita. Modificar cualquier línea también reinicia la ronda para que el contador y el historial no mezclen dos listas distintas.',
      ],
      items: [
        'Una línea equivale a una participación en la ronda.',
        'Los espacios exteriores y las líneas vacías se eliminan.',
        'Dos entradas exactamente iguales se bloquean hasta que las distingas.',
        'El modo sin repetir está activado al abrir la página.',
      ],
    },
    {
      heading: 'Cómo se obtiene el nombre aleatorio',
      paragraphs: [
        'La selección usa Crypto.getRandomValues, que MDN describe como un método para obtener valores aleatorios criptográficamente fuertes. Se genera un entero de 32 bits y se convierte en un índice de la lista disponible. No se usa Math.random para decidir quién sale. Esta elección técnica no permite predecir o repetir una semilla desde la interfaz y es más adecuada que una fuente no criptográfica para un sorteo local.',
        'Tomar un entero y aplicar directamente el resto de la división puede favorecer ligeramente algunas posiciones cuando el rango de enteros no es múltiplo del tamaño de la lista. Para evitarlo, el código descarta los valores situados en la franja sobrante y vuelve a pedir otro. Este rechazo hace que todos los índices admitidos tengan el mismo número de valores de origen. Si el navegador no ofrece Web Crypto, el sorteo se detiene y muestra un error; no recurre en silencio a una fuente más débil.',
      ],
    },
    {
      heading: 'Qué significa “justo” en una actividad de clase',
      paragraphs: [
        'En una ronda sin repetir, cada entrada disponible tiene la misma probabilidad en el siguiente sorteo. Eso asegura una rotación mecánica, pero no resuelve por sí solo la justicia pedagógica. Un alumno puede necesitar más tiempo, una adaptación, la opción de pasar o una forma de participación no oral. Tampoco convierte cada respuesta en evidencia comparable para calificar.',
        'Explica antes de usarlo qué se sortea, si se puede declinar y cuándo se reinicia la ronda. Evita presentar la animación como una ruleta que juzga a la persona. Para preguntas sensibles o evaluaciones, usa criterios conocidos y alternativas razonables. El selector puede distribuir turnos; la responsabilidad sobre el contexto, el clima del aula y las adaptaciones sigue siendo del docente.',
      ],
      items: [
        'Define el propósito: pregunta, demostración, portavoz o turno.',
        'Aclara si la persona puede pasar sin penalización.',
        'No uses el historial como calificación automática.',
        'Revisa adaptaciones y ausencias antes de iniciar la ronda.',
      ],
    },
    {
      heading: 'Nombres duplicados, números de lista y cambios durante la ronda',
      paragraphs: [
        'Dos alumnos pueden compartir nombre. Si ambas líneas dicen exactamente “Daniel”, un resultado no permitiría saber a quién corresponde y el modo sin repetir no podría explicar la ronda de forma fiable. Por eso la herramienta bloquea duplicados idénticos. Añade un dato mínimo que diferencie, como “Daniel 07” y “Daniel 19”, una inicial acordada o el número de asiento. No incluyas apellidos completos si no hacen falta.',
        'El ayudante numérico crea entradas de 1 hasta el límite indicado. Es útil cuando el grupo ya conoce su número, pero debes retirar ausencias o números que no correspondan a una persona activa. Si editas la lista después de varios resultados, se borran historial y progreso. Esa decisión evita conservar una apariencia de ronda completa cuando cambió el conjunto de participantes.',
      ],
    },
    {
      heading: 'Historial, copia y exportación CSV segura',
      paragraphs: [
        'El historial muestra el orden en que aparecieron los resultados desde el último reinicio o cambio de lista. Copiar resultado solo lleva el nombre más reciente al portapapeles. Exportar crea registro-pase-lista.csv con dos columnas: orden y nombre. Incluye una marca BOM de UTF-8 para mejorar la lectura de tildes y caracteres españoles en programas de hoja de cálculo.',
        'Una celda que comienza por =, +, - o @ puede interpretarse como fórmula al abrir un CSV. OWASP denomina a este riesgo CSV Injection o Formula Injection. La exportación encierra todas las celdas entre comillas, duplica comillas interiores y antepone una tabulación a los inicios de fórmula comunes, incluidos sus equivalentes de ancho completo. No existe una mitigación universal para todos los programas y reimportaciones; revisa los archivos si la lista proviene de una fuente no confiable.',
      ],
    },
    {
      heading: 'Privacidad de la lista y límites del registro',
      paragraphs: [
        'La lista, los seleccionados y el historial viven en la memoria de la pestaña. No se transmiten a FunnyTools, no se guardan en una cuenta y desaparecen al recargar. El archivo CSV se crea localmente y queda en la carpeta de descargas que gestione el navegador. Esta página tampoco activa cámara, micrófono ni acceso a un sistema escolar.',
        'Usa el dato mínimo. Para una actividad momentánea, números o nombres de pila pueden bastar. No pegues correos, diagnósticos, calificaciones, identificadores oficiales ni observaciones privadas. Si descargas el historial, pasa a ser tu responsabilidad protegerlo, definir cuánto tiempo conservarlo y eliminarlo cuando ya no sea necesario. El sitio no puede borrar una copia guardada en tu dispositivo.',
      ],
    },
  ],
  instructions: [
    'Pega una entrada por línea o genera números del 1 al total de alumnos.',
    'Distingue nombres idénticos con número de lista, inicial o apodo acordado; los duplicados exactos se bloquean.',
    'Retira ausencias y decide si quieres mantener No repetir hasta completar la ronda.',
    'Pulsa Elegir alumno. La selección real se fija antes de la animación y usa Web Crypto.',
    'Consulta el contador y el historial; copia el último resultado si solo necesitas ese nombre.',
    'Descarga registro-pase-lista.csv si necesitas conservar el orden y protege el archivo como dato de clase.',
  ],
  examples: [
    'Repartir turnos de respuesta dentro de una ronda sin repetir.',
    'Elegir una persona para mostrar un procedimiento no evaluativo.',
    'Seleccionar portavoz de un grupo después de acordar que cualquiera puede pasar.',
    'Sortear números de asiento sin escribir una lista completa.',
    'Registrar el orden de exposiciones breves y exportarlo a CSV.',
  ],
  audience: [
    'Docentes que quieren una rotación visible y rápida.',
    'Monitores de talleres, clubes o campamentos.',
    'Grupos que eligen un turno entre participantes presentes.',
    'Personas que prefieren un selector local sin cuenta ni subida de listas.',
  ],
  caseStudies: [
    {
      title: 'Ronda de preguntas con opción de pasar',
      description: 'La docente explica el propósito, retira las ausencias y activa no repetir. Cada alumno puede pasar sin penalización; el selector distribuye turnos, pero la calidad de la respuesta no se convierte automáticamente en nota.',
    },
    {
      title: 'Dos alumnos con el mismo nombre',
      description: 'La lista contiene dos entradas idénticas y el sorteo se bloquea. Se reemplazan por “Álex 4” y “Álex 18”, datos suficientes para el grupo sin añadir apellidos completos.',
    },
    {
      title: 'Orden de presentaciones',
      description: 'Una clase sortea todas las entradas, revisa el historial y exporta el CSV. El archivo se guarda solo durante la planificación y se elimina cuando el orden ya está publicado.',
    },
  ],
  notes: [
    'El selector distribuye turnos; no demuestra equidad pedagógica ni debe ser la única base de una calificación.',
    'Los duplicados exactos se bloquean para evitar resultados ambiguos.',
    'Editar la lista reinicia el historial y la ronda.',
    'Al acabar todos, la selección siguiente comienza una ronda nueva.',
    'La animación no cambia el resultado ya elegido.',
    'La mitigación CSV reduce fórmulas comunes, pero ningún formato CSV es seguro para todos los lectores y usos posteriores.',
  ],
  faq: [
    {
      q: '¿Cómo funciona el selector aleatorio de alumnos?',
      a: 'Convierte cada línea en una entrada, forma el grupo disponible y elige un índice con crypto.getRandomValues. En modo sin repetir excluye las entradas ya escogidas durante la ronda.',
    },
    {
      q: '¿Puede salir el mismo alumno dos veces?',
      a: 'Con No repetir activado, no sale otra vez hasta completar la ronda. Después, la siguiente selección empieza una ronda nueva. Si desactivas la opción, cada sorteo usa la lista completa.',
    },
    {
      q: '¿Qué ocurre si hay dos nombres iguales?',
      a: 'El sorteo se bloquea. Añade un número de lista, inicial o apodo acordado para que el resultado identifique una entrada sin ambigüedad.',
    },
    {
      q: '¿Se usa Math.random para elegir?',
      a: 'No. La selección real usa crypto.getRandomValues y rechazo de la franja que produciría sesgo de módulo. La animación tampoco decide el resultado.',
    },
    {
      q: '¿La lista se guarda o se envía?',
      a: 'No. Permanece en la memoria de esta pestaña. El sitio no la recibe y se pierde al recargar o cerrar.',
    },
    {
      q: '¿Puedo sortear solo números?',
      a: 'Sí. Escribe una cantidad entera entre 1 y 200 y pulsa Rellenar números. Quita después los números ausentes o no asignados.',
    },
    {
      q: '¿Qué contiene el CSV?',
      a: 'Contiene orden y nombre para el historial actual, en UTF-8. Las celdas se protegen frente a inicios de fórmula habituales, pero debes revisar listas no confiables.',
    },
    {
      q: '¿Es justo usarlo para calificar participación?',
      a: 'La probabilidad puede ser uniforme, pero la evaluación necesita criterios, contexto y adaptaciones. No uses el sorteo ni el historial como única medida de participación o rendimiento.',
    },
  ],
  labels: {
    input: 'Lista de alumnos',
    placeholder: 'Una persona por línea…',
    helperCount: 'Rellenar números del 1 al',
    fillNumbers: 'Rellenar números',
    pick: 'Elegir alumno',
    dontRepeat: 'No repetir hasta completar la ronda',
    remaining: 'Quedan',
    reset: 'Reiniciar ronda',
    copy: 'Copiar resultado',
    exportCsv: 'Descargar historial CSV',
    historyTitle: 'Orden de selección de la ronda',
    csvOrder: 'Orden',
    csvName: 'Nombre',
    result: 'Alumno seleccionado',
    emptyResult: 'Todavía no hay resultado',
    emptyListError: 'Introduce al menos una persona.',
    invalidHelperError: 'Introduce un número entero entre 1 y 200.',
    exhausted: 'La ronda anterior terminó. Esta selección inicia una nueva.',
    spinning: 'Sorteando…',
    copied: 'Resultado copiado',
    duplicateListError: 'Hay entradas idénticas. Añade número, inicial o apodo para distinguirlas.',
    secureRandomError: 'Este navegador no ofrece la fuente aleatoria segura necesaria. Actualízalo o usa otro navegador.',
    csvFilename: 'registro-pase-lista.csv',
  },
  sources: [
    {
      label: 'MDN: Crypto.getRandomValues()',
      href: 'https://developer.mozilla.org/es/docs/Web/API/Crypto/getRandomValues',
      note: 'Documenta la fuente de valores aleatorios criptográficamente fuertes usada por la selección.',
    },
    {
      label: 'Web Cryptography Level 2',
      href: 'https://www.w3.org/TR/webcrypto-2/#Crypto-method-getRandomValues',
      note: 'Especificación del método getRandomValues y de los arrays de enteros admitidos.',
    },
    {
      label: 'OWASP: CSV Injection',
      href: 'https://owasp.org/www-community/attacks/CSV_Injection',
      note: 'Explica por qué algunas celdas se interpretan como fórmulas y los límites de las mitigaciones CSV.',
    },
  ],
  privacyNote: 'Lista, ronda e historial se procesan solo en esta pestaña. El CSV se crea localmente y FunnyTools no recibe los nombres.',
  disclaimer: 'Ayuda mecánica para repartir turnos. No sustituye el criterio docente, las adaptaciones, el consentimiento para participar ni una política de evaluación transparente.',
};

export const spanishRandomStudentPickerReview = {
  heading: 'Revisión antes de iniciar la ronda',
  intro: 'La selección será más clara si la lista representa a quienes participan y las reglas se explican de antemano.',
  panels: [
    { title: 'Lista', text: 'Retira ausencias y distingue nombres idénticos con el dato mínimo.' },
    { title: 'Regla', text: 'Explica no repetición, nueva ronda y opción de pasar.' },
    { title: 'Registro', text: 'Descarga el CSV solo si existe un motivo y protege el archivo.' },
  ],
  checklistHeading: 'Lista de comprobación',
  checklist: [
    'Cada línea identifica una participación real.',
    'No hay entradas idénticas ni datos excesivos.',
    'El grupo conoce la finalidad del sorteo.',
    'Se han considerado adaptaciones y ausencias.',
    'El historial no se utilizará como calificación automática.',
  ],
};
