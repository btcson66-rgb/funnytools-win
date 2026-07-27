import type { ToolContent } from '../tools/_types';

export const spanishPdfPageReorder: ToolContent = {
  name: 'Ordenar páginas de un PDF online',
  short: 'Corrige el orden de un PDF moviendo cada página una posición hacia arriba o abajo.',
  long: 'Selecciona un PDF de hasta 40 MB, revisa la lista numerada y utiliza las flechas para cambiar la secuencia. La herramienta crea un documento nuevo con todas las páginas en el orden visible y lo descarga como reordered.pdf. El archivo se procesa en este navegador. No muestra miniaturas, no permite arrastrar, borrar o duplicar páginas y no combina varios documentos.',
  seoTitle: 'Ordenar PDF online: reordenar sus páginas',
  seoDescription: 'Reordena páginas de un PDF con controles para subir y bajar. Crea una copia local, sin registro, sin subir el documento y con revisión paso a paso.',
  keywords: [
    'ordenar PDF online',
    'reordenar páginas PDF',
    'organizar páginas PDF',
    'cambiar orden páginas PDF',
    'poner páginas PDF en orden',
    'ordenar PDF sin subirlo',
    'organizador PDF gratis',
  ],
  capabilities: [
    'Leer un PDF de hasta 40 MB y enumerar todas sus páginas.',
    'Mover una página una posición hacia arriba o hacia abajo en cada pulsación.',
    'Conservar todas las páginas y crear una secuencia nueva según la lista visible.',
    'Descargar un PDF nuevo sin sobrescribir el archivo seleccionado.',
    'Realizar la lectura y la copia dentro de la memoria del navegador.',
  ],
  contentSections: [
    {
      heading: 'Respuesta rápida: cómo poner las páginas de un PDF en orden',
      paragraphs: [
        'Para reordenar páginas, selecciona una copia del PDF. Cuando aparezca la lista, cada fila identifica la página por su posición original: «Página 1», «Página 2» y así sucesivamente. Pulsa la flecha hacia arriba o hacia abajo para desplazar una fila una posición. Repite hasta que la lista represente la secuencia final y descarga el documento reorganizado.',
        'La primera fila no puede subir y la última no puede bajar. El cambio todavía no afecta al archivo original: solo modifica una lista en memoria. Al descargar, la herramienta copia todas las páginas siguiendo esa lista y crea `reordered.pdf`. Abre el resultado y recórrelo completo; ver una lista correcta no sustituye la revisión del PDF generado.',
      ],
    },
    {
      heading: 'Qué significa el número que permanece en cada fila',
      paragraphs: [
        'El número mostrado identifica la posición que la página tenía al cargar el archivo. Si mueves «Página 5» al principio, la primera fila seguirá diciendo «Página 5»: esto permite saber de dónde procede la hoja. No es una renumeración del texto impreso, ni añade números nuevos al pie de página.',
        'Una portada puede ser la página 1 del archivo aunque el documento impreso empiece a numerar en 1 la hoja siguiente. Índices con números romanos, anexos sin folio y páginas escaneadas pueden crear más diferencias. Antes de mover nada, abre el original en un visor y anota contenido, posición del archivo y número impreso por separado.',
      ],
    },
    {
      heading: 'Reordenar no es girar, eliminar, extraer ni combinar',
      paragraphs: [
        'Reordenar cambia la secuencia y conserva el mismo número de páginas. Girar corrige la orientación; eliminar quita hojas; extraer crea un PDF con una selección; combinar reúne varios archivos. Esta herramienta no hace esas operaciones a la vez. Si hay hojas sobrantes o de lado, resuelve cada problema con la función específica y revisa una copia después de cada etapa.',
        'Tampoco hay miniaturas ni arrastrar y soltar. Cada clic mueve una fila un puesto, por lo que un documento largo o una página que deba recorrer muchas posiciones puede exigir bastantes pulsaciones. No existe selección múltiple, salto directo a una posición, deshacer global ni vista del contenido dentro del componente.',
      ],
    },
    {
      heading: 'Orden de trabajo para escaneos, anexos y expedientes',
      paragraphs: [
        'En un escaneo dúplex, identifica primero si las caras posteriores están invertidas; corrige la rotación antes de decidir el orden. Después elimina duplicados o páginas en blanco, organiza la secuencia final y comprime solo al final si el archivo supera un límite. Trabajar en ese orden reduce el número de veces que debes inspeccionar documentos intermedios.',
        'Para una solicitud con portada, formulario, justificantes y anexos, escribe una lista externa como A-portada, B-formulario, C-identidad, D-anexo. Compara esa lista con las filas originales y mueve una página cada vez. En el resultado, verifica las transiciones: la última página de una sección y la primera de la siguiente suelen revelar errores mejor que mirar solo el total.',
      ],
      items: [
        'Corregir primero las páginas giradas para poder reconocerlas.',
        'Quitar después hojas vacías o duplicadas que no deban entregarse.',
        'Reordenar con una lista externa del expediente esperado.',
        'Comprimir únicamente la versión estructural ya aprobada.',
      ],
    },
    {
      heading: 'Firmas, formularios, marcadores y funciones avanzadas',
      paragraphs: [
        'El resultado se construye copiando páginas a un PDF nuevo. La apariencia visible suele conservarse, pero marcadores, estructura de navegación, adjuntos, capas, etiquetas de accesibilidad, comentarios, formularios o enlaces complejos requieren una comprobación específica. Una firma digital puede quedar invalidada al modificar y volver a guardar el documento.',
        'No utilices una copia reorganizada como sustituto automático de un original firmado, certificado, PDF/A o preparado para imprenta. Conserva el archivo de origen, prueba campos y enlaces, revisa el panel de firmas y abre la descarga en el lector o portal de destino. Si una propiedad jurídica o archivística es obligatoria, utiliza software que pueda validarla.',
      ],
    },
    {
      heading: 'Privacidad, límite de 40 MB y memoria disponible',
      paragraphs: [
        'El PDF se lee y se vuelve a crear en este navegador; FunnyTools no recibe sus páginas para ordenar el archivo. La web sí necesita conexiones normales para cargarse y puede usar analítica o publicidad conforme a la política general, pero el contenido del PDF no se incorpora a esos eventos.',
        'El componente rechaza archivos superiores a 40 MB. Un archivo menor también puede fallar si está cifrado, dañado o si el dispositivo no tiene memoria suficiente para mantener el original, las páginas copiadas y la salida. En móvil, empieza con un documento pequeño. No cierres la pestaña durante la exportación y guarda siempre el original.',
      ],
    },
  ],
  instructions: [
    'Selecciona una copia del PDF de hasta 40 MB y espera a que aparezca la lista.',
    'Compara los números originales con el orden que necesita el documento final.',
    'Usa las flechas hacia arriba o abajo; cada clic mueve la página una posición.',
    'Descarga `reordered.pdf` cuando la lista visible tenga la secuencia correcta.',
    'Abre la copia y revisa total, orden, transiciones, firmas, campos y enlaces.',
  ],
  examples: [
    'Mover una portada escaneada al principio de un expediente.',
    'Corregir dos páginas que quedaron intercambiadas al digitalizar un contrato.',
    'Colocar los anexos después del informe principal y antes de la bibliografía.',
    'Ordenar fichas de una clase antes de distribuir el documento.',
    'Preparar la secuencia final antes de intentar reducir el tamaño del PDF.',
  ],
  audience: [
    'Personas que reciben un escaneo con páginas fuera de orden.',
    'Estudiantes que preparan informes, trabajos o anexos.',
    'Oficinas que montan expedientes a partir de una copia ya combinada.',
    'Usuarios que prefieren reorganizar documentos sin subirlos a un servidor.',
  ],
  caseStudies: [
    {
      title: 'Portada al final del escaneo',
      description: 'Un documento tiene cuatro páginas y la portada aparece como Página 4. Se pulsa tres veces la flecha hacia arriba junto a esa fila. La lista termina 4, 1, 2, 3 y la descarga se revisa desde la portada hasta el cierre.',
    },
    {
      title: 'Dos hojas consecutivas intercambiadas',
      description: 'Las páginas originales 6 y 7 están al revés. Basta mover la Página 7 una posición hacia arriba. Después se comprueban las uniones 5→7, 7→6 y 6→8, porque una corrección local afecta a tres transiciones.',
    },
    {
      title: 'Documento largo sin miniaturas',
      description: 'Antes de mover filas se abre el original en otra ventana y se crea una tabla con asunto y página. La herramienta solo ejecuta el orden decidido; la tabla evita confundir posición del archivo con numeración impresa.',
    },
  ],
  notes: [
    'Cada flecha mueve una sola posición; no hay arrastre, selección múltiple ni salto directo.',
    'La etiqueta conserva el número original de la página después de moverla.',
    'No elimina, duplica, gira, inserta ni combina páginas.',
    'El archivo debe pesar 40 MB o menos y caber en la memoria del dispositivo.',
    'Una nueva escritura puede afectar firmas y propiedades PDF avanzadas.',
  ],
  faq: [
    {
      q: '¿Puedo arrastrar miniaturas para ordenar el PDF?',
      a: 'No. Esta versión muestra filas numeradas y utiliza botones para subir o bajar una posición cada vez.',
    },
    {
      q: '¿Por qué la primera fila puede decir Página 5?',
      a: 'La etiqueta conserva la posición original. Significa que la quinta página del archivo se ha movido al primer lugar.',
    },
    {
      q: '¿La herramienta cambia los números impresos?',
      a: 'No. Cambia el orden de las páginas completas, pero no añade ni edita folios dentro de su contenido.',
    },
    {
      q: '¿Puedo borrar o duplicar una página mientras ordeno?',
      a: 'No. Todas las páginas aparecen una vez. Utiliza las herramientas de eliminar o extraer para esas tareas.',
    },
    {
      q: '¿Se conserva una firma digital?',
      a: 'No se garantiza. Reordenar y volver a guardar puede invalidar firmas; comprueba la copia en un lector adecuado.',
    },
    {
      q: '¿El PDF se sube a FunnyTools?',
      a: 'No. La lectura, la lista de orden y la creación del nuevo PDF ocurren en este navegador.',
    },
  ],
  labels: {
    localNote: 'El PDF se procesa en este navegador y no se sube a FunnyTools.',
    upload: 'Seleccionar un archivo PDF',
    page: 'Página original {page}',
    download: 'Descargar PDF reordenado',
    reset: 'Borrar todo',
    tooLarge: 'El PDF supera el límite de 40 MB.',
    failed: 'No se ha podido leer el PDF. Puede estar dañado, cifrado o requerir más memoria.',
  },
  privacyNote: 'El documento y la secuencia permanecen en la memoria de este navegador. FunnyTools no recibe ni conserva las páginas del PDF. Los datos desaparecen al borrar, recargar o cerrar la pestaña.',
  disclaimer: 'Revisa la copia completa. La herramienta no valida firmas, formularios, marcadores, accesibilidad, PDF/A, impresión ni requisitos legales, y no sustituye un organizador PDF especializado.',
};

export const spanishPdfPageReorderReview = {
  heading: 'Cómo comprobar un PDF reordenado',
  intro: 'El total puede ser correcto y aun así existir una transición equivocada; la revisión debe seguir la secuencia real.',
  panels: [
    {
      title: 'Compara con una lista',
      text: 'Anota el contenido esperado y marca cada sección mientras recorres la descarga.',
    },
    {
      title: 'Revisa las uniones',
      text: 'Comprueba la página anterior y posterior a cada hoja movida, no solo la hoja.',
    },
    {
      title: 'Prueba las funciones',
      text: 'Abre campos, enlaces, marcadores y firmas en el lector que utilizará el destinatario.',
    },
  ],
  checklistHeading: 'Lista de comprobación',
  checklist: [
    'El número total de páginas coincide con el original.',
    'La secuencia completa coincide con la lista de entrega.',
    'No hay páginas duplicadas, omitidas o giradas por error.',
    'El original sigue guardado y la copia funciona en el destino.',
  ],
};

export const spanishPdfToImage: ToolContent = {
  name: 'Convertir PDF a JPG o PNG online',
  short: 'Renderiza hasta 20 páginas de un PDF y descarga cada una como imagen PNG o JPG.',
  long: 'Selecciona PNG o JPG y una escala de 1×, 1,5× o 2× antes de elegir un PDF de hasta 25 MB. La herramienta renderiza cada página en orden mediante PDF.js, crea una vista previa y ofrece una descarga independiente con nombres page-1, page-2 y siguientes. No crea ZIP, no extrae las imágenes originales ni convierte el texto en editable.',
  seoTitle: 'Convertir PDF a JPG o PNG por páginas',
  seoDescription: 'Convierte hasta 20 páginas PDF en imágenes JPG o PNG, con escala 1×, 1,5× o 2×, vista previa y descarga individual sin subir el archivo.',
  keywords: [
    'convertir PDF a JPG',
    'PDF a PNG online',
    'pasar PDF a imagen',
    'guardar páginas PDF como JPG',
    'convertir cada página PDF a PNG',
    'PDF a imágenes sin subir',
    'extraer página PDF como imagen',
  ],
  capabilities: [
    'Renderizar en orden hasta 20 páginas de un PDF de 25 MB o menos.',
    'Crear PNG o JPG con calidad JPEG fijada en 0,9.',
    'Elegir una escala de renderizado de 1×, 1,5× o 2×.',
    'Mostrar una vista previa y un enlace de descarga para cada página.',
    'Procesar el PDF y generar los archivos dentro del navegador.',
  ],
  contentSections: [
    {
      heading: 'Respuesta rápida: cómo pasar cada página de PDF a imagen',
      paragraphs: [
        'Para convertir PDF a PNG o JPG, antes de seleccionar el archivo elige el formato y una escala de 1×, 1,5× o 2×. Después carga un PDF de hasta 25 MB y 20 páginas. La conversión empieza automáticamente: cada página aparece como vista previa con su propio botón, y se descarga como `page-1.png`, `page-2.jpg` o el formato elegido.',
        'Si cambias formato o escala después de cargar el documento, la salida ya creada no se vuelve a renderizar automáticamente. Vuelve a seleccionar el PDF para aplicar la nueva opción. No hay un botón «convertir» ni una descarga ZIP; guarda cada página por separado y comprueba su tamaño en píxeles.',
      ],
    },
    {
      heading: 'Qué hacen las escalas 1×, 1,5× y 2×',
      paragraphs: [
        'PDF.js calcula una vista de la página y multiplica su ancho y alto por la escala. Una página de 600 × 800 píxeles a 1× pasa aproximadamente a 900 × 1.200 en 1,5× y a 1.200 × 1.600 en 2×. Como aumentan ambas dimensiones, 2× contiene cuatro veces tantos píxeles que 1× y suele requerir bastante más memoria.',
        'La escala no recupera detalle que no existe en una fotografía escaneada. Sí mejora la rasterización de texto y vectores porque se dibujan sobre un lienzo mayor. La herramienta bloquea una página si su ancho por alto supera 16 millones de píxeles renderizados, de modo que una página grande puede funcionar a 1× y fallar a 2×.',
      ],
      items: [
        '1×: salida más ligera y rápida para miniaturas o referencia.',
        '1,5×: opción predeterminada y equilibrio para lectura en pantalla.',
        '2×: más píxeles para recortar o ampliar, con mayor consumo de memoria.',
        'Límite por página: 16.000.000 de píxeles después de aplicar la escala.',
      ],
    },
    {
      heading: 'Cuándo elegir PNG y cuándo elegir JPG',
      paragraphs: [
        'PNG utiliza una codificación sin pérdida y suele ser adecuado para texto, capturas, diagramas, líneas y fondos planos. Puede pesar más cuando la página es una fotografía o un escaneo con mucho ruido. JPG utiliza compresión con pérdida y esta herramienta fija la calidad en 0,9; suele ser más práctico para páginas fotográficas, pero puede introducir artefactos alrededor de letras y trazos finos.',
        'No existe un control de calidad JPG ni una comparación de peso dentro de este componente. Convierte una página representativa en ambos formatos, amplíala al 100 % y compara legibilidad, color, bordes y tamaño del archivo. Elegir JPG no garantiza un archivo menor en todos los casos, y PNG no hace que un escaneo borroso se vuelva nítido.',
      ],
    },
    {
      heading: 'Renderizar una página no es extraer sus recursos',
      paragraphs: [
        'La herramienta dibuja la apariencia de la página completa en un lienzo y guarda ese lienzo como imagen. El resultado combina texto, vectores, fotografías y elementos visibles en una sola cuadrícula de píxeles. No recupera la fotografía original incrustada, no separa logotipos, no conserva capas y no genera un archivo por cada recurso interno.',
        'El texto deja de ser seleccionable y los enlaces, formularios, botones, vídeo, audio, marcadores y estructura de accesibilidad no funcionan en JPG o PNG. Tampoco se ejecuta OCR. Si necesitas editar palabras, conservar navegación o recuperar una imagen original sin volver a codificarla, hace falta otra herramienta y una revisión del documento.',
      ],
    },
    {
      heading: 'Límites de páginas, tamaño y procesamiento',
      paragraphs: [
        'El archivo no puede superar 25 MB y el documento no puede tener más de 20 páginas. Las páginas se procesan una tras otra, pero las vistas previas y sus archivos permanecen disponibles en memoria hasta elegir otro PDF o cerrar la pestaña. Veinte páginas grandes a 2× pueden exigir mucho más espacio que el PDF comprimido de entrada.',
        'Un PDF menor de 25 MB puede fallar por cifrado, daño, fuentes complejas, una página de más de 16 millones de píxeles o falta de memoria. En un teléfono, utiliza 1× y prueba primero una copia corta. La herramienta no permite elegir un rango; si solo necesitas dos páginas de un documento largo, extráelas primero y convierte esa copia.',
      ],
    },
    {
      heading: 'Privacidad y comprobación del resultado',
      paragraphs: [
        'PDF.js lee el archivo y Canvas genera los PNG o JPG en este navegador. FunnyTools no recibe las páginas para convertirlas. La página web realiza sus conexiones normales de carga, analítica o publicidad según la política general, pero no incluye el contenido del documento en esos eventos.',
        'Abre cada descarga, confirma que el número del nombre coincide con la página, mide ancho y alto, amplía el texto y revisa colores, diagramas, transparencias y anotaciones visibles. Si la imagen se publicará o compartirá, respeta copyright, confidencialidad y datos personales; convertir el formato no concede derecho a redistribuir el contenido.',
      ],
    },
  ],
  instructions: [
    'Elige PNG o JPG y la escala 1×, 1,5× o 2× antes de cargar el archivo.',
    'Selecciona un PDF de hasta 25 MB y no más de 20 páginas.',
    'Espera a que el estado indique que todas las páginas están preparadas.',
    'Descarga cada página con su enlace; no existe una descarga ZIP conjunta.',
    'Comprueba píxeles, legibilidad, color, número de página y uso permitido.',
  ],
  examples: [
    'Crear PNG de páginas con gráficos para insertarlos en una presentación.',
    'Guardar como JPG un folleto fotográfico que se compartirá página por página.',
    'Generar vistas previas de las primeras páginas de un documento público.',
    'Convertir una ficha PDF en imagen para un sistema que no admite documentos.',
    'Comparar 1× y 2× antes de recortar una zona con texto pequeño.',
  ],
  audience: [
    'Personas que necesitan una imagen independiente por página.',
    'Docentes que incorporan una página visual a una presentación.',
    'Creadores que preparan vistas previas de documentos propios.',
    'Usuarios que prefieren convertir archivos localmente y sin registro.',
  ],
  caseStudies: [
    {
      title: 'Diagrama para una diapositiva',
      description: 'Una página vectorial se renderiza como PNG a 2× para mantener bordes claros al ampliarla. Se comprueba el tamaño en píxeles y se recuerda que las etiquetas ya no son texto seleccionable.',
    },
    {
      title: 'Folleto con fotografías',
      description: 'Se prueba la misma página en PNG y JPG. JPG a calidad 0,9 ofrece un archivo práctico, pero se amplían títulos y códigos pequeños antes de elegirlo para evitar artefactos.',
    },
    {
      title: 'Documento de 60 páginas',
      description: 'La herramienta no acepta más de 20. Primero se extraen las páginas 4-6 en un PDF nuevo y después se convierte esa copia, reduciendo tiempo y memoria sin fingir que existe selección de rango.',
    },
  ],
  notes: [
    'El formato y la escala deben elegirse antes de seleccionar el PDF.',
    'Máximo 25 MB, 20 páginas y 16 millones de píxeles renderizados por página.',
    'JPG se guarda con calidad 0,9; no hay regulador ni ZIP.',
    'El resultado rasteriza la apariencia y pierde texto seleccionable e interactividad.',
    'La escala aumenta píxeles y memoria, pero no inventa detalle de un escaneo.',
  ],
  faq: [
    {
      q: '¿Se crea una imagen por cada página?',
      a: 'Sí. Cada página tiene vista previa y descarga independiente con un nombre como page-1.png.',
    },
    {
      q: '¿Puedo convertir solo un rango?',
      a: 'No directamente. Extrae primero las páginas necesarias en otro PDF y carga esa copia.',
    },
    {
      q: '¿Qué escala produce más resolución?',
      a: '2× produce el doble de ancho y alto que 1×, pero usa cuatro veces tantos píxeles y más memoria.',
    },
    {
      q: '¿JPG permite elegir la calidad?',
      a: 'No. Esta versión utiliza calidad 0,9. Prueba PNG si el texto o los trazos muestran artefactos.',
    },
    {
      q: '¿La imagen conserva texto y enlaces?',
      a: 'Conserva la apariencia visible como píxeles; el texto no es seleccionable y los enlaces no funcionan.',
    },
    {
      q: '¿El PDF se sube a FunnyTools?',
      a: 'No. La lectura, el renderizado y las descargas se realizan en este navegador.',
    },
  ],
  labels: {
    localNote: 'El PDF se renderiza en este navegador y no se sube a FunnyTools.',
    upload: 'Seleccionar un archivo PDF',
    format: 'Formato de las imágenes',
    scale: 'Escala de renderizado',
    processing: 'Procesando la página {page} de {total}…',
    page: 'Vista de la página {page} del PDF',
    downloadPage: 'Descargar página {page}',
    done: 'Todas las páginas están preparadas.',
    tooLarge: 'El PDF supera 25 MB o una página supera 16 millones de píxeles.',
    tooMany: 'Solo se pueden procesar hasta 20 páginas cada vez.',
    failed: 'No se ha podido convertir el PDF. Revisa el archivo, la escala y la memoria disponible.',
  },
  privacyNote: 'El documento se lee y cada página se renderiza en la memoria de este navegador. FunnyTools no recibe ni conserva el PDF ni las imágenes generadas.',
  disclaimer: 'Las imágenes son una representación rasterizada. No conservan texto seleccionable, enlaces, formularios, capas, accesibilidad, firma ni validez documental.',
};

export const spanishPdfToImageReview = {
  heading: 'Cómo comprobar imágenes creadas desde un PDF',
  intro: 'Una vista previa visible no demuestra que el archivo tenga la resolución, legibilidad o formato adecuados para su destino.',
  panels: [
    {
      title: 'Mide los píxeles',
      text: 'Confirma ancho y alto; la escala debe aumentar ambas dimensiones como esperabas.',
    },
    {
      title: 'Amplía el contenido',
      text: 'Revisa texto pequeño, líneas, códigos y fotografías al 100 % antes de elegir PNG o JPG.',
    },
    {
      title: 'Comprueba el uso',
      text: 'Verifica número de página, orden, derechos y requisitos del sistema donde publicarás la imagen.',
    },
  ],
  checklistHeading: 'Lista de comprobación',
  checklist: [
    'Cada página esperada tiene una descarga con el número correcto.',
    'El formato real coincide con PNG o JPG.',
    'Texto, diagramas y colores son legibles al tamaño de uso.',
    'No dependes de enlaces, campos o texto seleccionable que la imagen pierde.',
  ],
};

export const spanishPdfCompressor: ToolContent = {
  name: 'Comprimir PDF online en el navegador',
  short: 'Reescribe la estructura de un PDF para intentar reducir su peso sin remuestrear imágenes.',
  long: 'Selecciona un PDF de hasta 40 MB y ejecuta una optimización estructural con flujos de objetos. La herramienta muestra tamaño original, tamaño de salida y variación porcentual, incluso cuando el resultado aumenta. No ofrece niveles de compresión, no baja resolución ni garantiza un archivo menor. Solo descarga la copia después de que puedas comparar.',
  seoTitle: 'Comprimir PDF online: optimización local',
  seoDescription: 'Intenta reducir el tamaño de un PDF reescribiendo su estructura en el navegador. Compara antes y después; no remuestrea imágenes ni promete una reducción.',
  keywords: [
    'comprimir PDF online',
    'reducir tamaño PDF',
    'disminuir peso PDF',
    'optimizar PDF sin subir',
    'hacer PDF más pequeño',
    'comprimir PDF en el navegador',
    'reducir MB de PDF',
  ],
  capabilities: [
    'Aceptar un PDF de hasta 40 MB y volver a guardarlo con flujos de objetos.',
    'Mostrar el tamaño original y el tamaño exacto de la salida.',
    'Calcular el cambio porcentual con signo positivo o negativo.',
    'Permitir descargar el resultado aunque no sea menor para poder revisarlo.',
    'Procesar el documento localmente sin enviarlo a FunnyTools.',
  ],
  contentSections: [
    {
      heading: 'Respuesta rápida: qué compresión aplica esta herramienta',
      paragraphs: [
        'Selecciona un PDF de hasta 40 MB y pulsa «Intentar comprimir PDF». El navegador abre el documento y lo vuelve a guardar utilizando flujos de objetos. Después muestra el tamaño original, el de salida y la variación. Descarga la copia solo si el resultado te conviene y abre el archivo para comprobarlo.',
        'Esta es una optimización estructural, no una compresión visual con niveles alto, medio o bajo. No reduce la resolución de fotografías, no cambia la calidad JPG y no promete alcanzar un límite concreto. Un PDF ya optimizado puede quedar igual o incluso crecer; en ese caso el mensaje recomienda conservar el original.',
      ],
    },
    {
      heading: 'Por qué algunos PDF bajan de tamaño y otros no',
      paragraphs: [
        'Un PDF contiene objetos que describen páginas, fuentes, imágenes, vectores, metadatos y relaciones internas. Reagrupar ciertos objetos en flujos puede reducir sobrecarga en archivos que fueron guardados sin esa optimización. El efecto depende de cómo se creó el documento y de qué parte de su peso procede de la estructura.',
        'En un escaneo, casi todo el tamaño suele estar en las imágenes. Como esta herramienta no las remuestrea ni vuelve a comprimir, la mejora puede ser mínima. Un documento de texto generado por software moderno también puede estar ya bien optimizado. No hay una proporción universal ni es correcto afirmar «reduce 70 %» antes de analizar la salida real.',
      ],
    },
    {
      heading: 'Cómo leer el porcentaje y tomar una decisión',
      paragraphs: [
        'La variación se calcula como `(salida − original) ÷ original × 100`. Un valor de −12 % significa que la copia pesa un 12 % menos. Un valor de +3 % significa que pesa un 3 % más. El signo es esencial: la herramienta no oculta un resultado desfavorable ni cambia el original.',
        'Compara también el límite del destino en bytes o MB. Pasar de 10,2 a 10,0 MB no ayuda si un portal exige menos de 10 MB y utiliza otra definición de megabyte. Descarga, mira las propiedades del archivo y prueba una carga antes de eliminar cualquier versión. Si no alcanza el límite, necesitas otra estrategia.',
      ],
    },
    {
      heading: 'Qué hacer cuando el PDF sigue siendo demasiado grande',
      paragraphs: [
        'Primero elimina páginas innecesarias, extrae solo lo que debe enviarse y ordena el documento final. Si el peso proviene de escaneos, decide una resolución legible y utiliza una herramienta especializada que pueda remuestrear imágenes; esta página no lo hace. Para un documento creado desde Word, presentaciones o diseño, exportar otra vez desde la fuente con ajustes adecuados suele ofrecer más control.',
        'Dividir el PDF puede cumplir un flujo que acepte varios archivos, pero no sirve si el portal exige un único documento. Convertir páginas en JPG y reconstruir un PDF puede reducir peso a costa de texto seleccionable, enlaces, accesibilidad y calidad, por lo que no debe presentarse como solución inocua. Conserva siempre una copia de mayor fidelidad.',
      ],
      items: [
        'Quitar hojas vacías, duplicadas o fuera del expediente.',
        'Extraer solo las páginas que realmente solicita el destinatario.',
        'Reexportar desde el archivo fuente con imágenes y fuentes optimizadas.',
        'Remuestrear escaneos únicamente después de definir una legibilidad mínima.',
      ],
    },
    {
      heading: 'Firmas, formularios, cifrado y metadatos',
      paragraphs: [
        'Volver a guardar puede invalidar una firma digital o afectar propiedades avanzadas. Los formularios, marcadores, adjuntos, capas, comentarios, etiquetas de accesibilidad, PDF/A y preparación de imprenta no se validan de forma exhaustiva. Un archivo cifrado, protegido o dañado puede no abrirse.',
        'La opción evita actualizar automáticamente los metadatos durante la carga, pero no es una herramienta para borrar información personal. No prometas que elimina autor, historial, adjuntos ocultos o datos sensibles. Para saneamiento, archivo legal o entrega firmada se necesita un flujo especializado y una validación posterior.',
      ],
    },
    {
      heading: 'Privacidad, memoria y comprobación final',
      paragraphs: [
        'La lectura y el nuevo guardado se realizan en este navegador; FunnyTools no recibe el PDF para optimizarlo. La web mantiene sus conexiones normales de carga, analítica o publicidad conforme a la política general, pero no envía las páginas del documento dentro de esos eventos.',
        'Aunque el límite de entrada es 40 MB, el proceso necesita memoria adicional para abrir y reconstruir el archivo. En un móvil puede fallar antes. Tras descargar, compara bytes, total de páginas, texto, imágenes, enlaces, campos, marcadores, firma y apertura en el destino. Si la copia pesa más o pierde una función, conserva el original.',
      ],
    },
  ],
  instructions: [
    'Selecciona una copia del PDF de hasta 40 MB.',
    'Pulsa «Intentar comprimir PDF» y espera a que aparezcan los tres tamaños.',
    'Lee el signo de la variación: negativo reduce; positivo aumenta.',
    'Descarga `compressed.pdf` solo si quieres inspeccionar la nueva versión.',
    'Comprueba contenido y funciones y prueba el límite real del destino.',
  ],
  examples: [
    'Probar un PDF exportado por una aplicación antigua y con sobrecarga estructural.',
    'Comparar una solicitud de 10,2 MB antes de intentar cargarla en un portal.',
    'Confirmar que un escaneo fotográfico no se reduce sin remuestreo.',
    'Optimizar una copia local antes de adjuntarla a un correo.',
    'Decidir conservar el original cuando la salida aumenta de tamaño.',
  ],
  audience: [
    'Personas que necesitan probar una reducción local antes de compartir.',
    'Estudiantes y oficinas con un portal que impone un límite de archivo.',
    'Usuarios que quieren una comparación honesta en lugar de una promesa fija.',
    'Personas que no desean subir el documento a un servicio de compresión.',
  ],
  caseStudies: [
    {
      title: 'PDF guardado sin flujos de objetos',
      description: 'Una copia de prueba se creó con una estructura poco compacta. Al volver a guardarla, el porcentaje es negativo. Se descarga y se compara página por página antes de utilizar la versión menor.',
    },
    {
      title: 'Escaneo que casi no cambia',
      description: 'El documento contiene fotografías de página completa. La estructura representa una fracción pequeña, así que la salida no baja de forma útil. Se conserva el original y se evalúa remuestreo con un mínimo de legibilidad.',
    },
    {
      title: 'Resultado mayor que el original',
      description: 'Un PDF moderno ya estaba optimizado. La variación muestra signo positivo y el estado recomienda mantener el archivo inicial. El funcionamiento correcto aquí consiste en revelar el resultado, no en forzar una falsa reducción.',
    },
  ],
  notes: [
    'Solo reescribe estructura con flujos de objetos; no remuestrea imágenes.',
    'No hay niveles alto, medio o bajo ni objetivo automático de MB.',
    'Un porcentaje negativo reduce el tamaño; uno positivo lo aumenta.',
    'El límite de entrada es 40 MB y la memoria disponible puede imponer uno menor.',
    'No elimina metadatos ni garantiza firmas, PDF/A o funciones avanzadas.',
  ],
  faq: [
    {
      q: '¿Cuánto reduce el tamaño del PDF?',
      a: 'No hay una cifra fija. Depende de la estructura; la herramienta muestra la diferencia real después de procesar.',
    },
    {
      q: '¿Baja la calidad de las imágenes?',
      a: 'No las remuestrea ni ofrece calidad visual. Por eso un PDF de escaneos puede no reducirse.',
    },
    {
      q: '¿Qué significa un porcentaje positivo?',
      a: 'Que la salida pesa más que el original. Conserva el archivo inicial salvo que tengas otro motivo para usar la copia.',
    },
    {
      q: '¿Puedo elegir compresión alta o baja?',
      a: 'No. Esta versión solo aplica una reescritura estructural con un ajuste fijo.',
    },
    {
      q: '¿Sirve para eliminar metadatos?',
      a: 'No. No es una herramienta de saneamiento y no garantiza retirar información oculta o personal.',
    },
    {
      q: '¿El PDF se sube a FunnyTools?',
      a: 'No. La lectura, la optimización y la preparación de la descarga ocurren en este navegador.',
    },
  ],
  labels: {
    limitNote: 'Optimización estructural local: no reduce imágenes ni garantiza un archivo menor.',
    upload: 'Seleccionar un archivo PDF',
    original: 'Tamaño original',
    output: 'Tamaño de salida',
    change: 'Variación',
    compress: 'Intentar comprimir PDF',
    download: 'Descargar resultado',
    noFile: 'Selecciona primero un archivo PDF.',
    tooLarge: 'El PDF supera el límite de 40 MB.',
    smaller: 'La salida es menor. Descárgala y comprueba el documento.',
    notSmaller: 'La salida no es menor; se recomienda conservar el original.',
    failed: 'No se ha podido procesar el PDF. Puede estar dañado, cifrado o requerir más memoria.',
  },
  privacyNote: 'El documento se abre y se vuelve a guardar en la memoria de este navegador. FunnyTools no recibe ni conserva el PDF ni su contenido.',
  disclaimer: 'Esta herramienta solo intenta optimizar la estructura. No promete una reducción, no remuestrea imágenes y no valida firmas, PDF/A, accesibilidad ni requisitos del portal de destino.',
};

export const spanishPdfCompressorReview = {
  heading: 'Cómo comprobar una copia PDF optimizada',
  intro: 'El tamaño es solo una métrica: una copia menor no sirve si pierde contenido, funciones o aceptación en el destino.',
  panels: [
    {
      title: 'Compara bytes',
      text: 'Lee el signo del porcentaje y verifica el tamaño real en las propiedades del archivo.',
    },
    {
      title: 'Recorre el documento',
      text: 'Comprueba total, texto, imágenes y cada transición en la copia descargada.',
    },
    {
      title: 'Prueba el destino',
      text: 'Abre formularios, firmas y enlaces y realiza una carga de prueba si existe un límite.',
    },
  ],
  checklistHeading: 'Lista de comprobación',
  checklist: [
    'La salida es realmente menor o existe una razón clara para conservarla.',
    'El total de páginas y la apariencia coinciden con el original.',
    'Campos, enlaces, marcadores y firma tienen el estado esperado.',
    'El archivo abre y cumple el límite del sistema de destino.',
  ],
};
