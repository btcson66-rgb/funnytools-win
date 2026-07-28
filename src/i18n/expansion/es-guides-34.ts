import type { SpanishInfoPage } from './es-pages';

export const spanishClassroomQrGuide: SpanishInfoPage = {
  title: 'Códigos QR en el aula: crear, comprobar y publicar enlaces que sí funcionan',
  seoTitle: 'Códigos QR en el aula: guía práctica y segura',
  seoDescription: 'Crea códigos QR para fichas, estaciones, familias y proyectos escolares con destino claro, privacidad, contraste, texto alternativo y pruebas reales.',
  keywords: [
    'códigos QR en el aula',
    'crear código QR educativo',
    'QR para actividades escolares',
    'generador QR para profesores',
    'cómo usar QR en clase',
  ],
  eyebrow: 'Guía docente · códigos QR · accesibilidad y privacidad',
  intro: 'Un código QR no mejora una actividad por sí solo: únicamente acorta el camino entre un soporte físico y un destino digital. Funciona cuando el alumnado sabe adónde conduce, puede abrirlo con el dispositivo disponible y dispone de una alternativa si la cámara, la red o la visión fallan. Esta guía convierte el QR en una pieza comprobable del diseño didáctico, no en una imagen misteriosa pegada a una ficha.',
  directAnswer: [
    'Para crear un QR útil en clase, prepara primero una URL final con HTTPS y permisos correctos, genera el código con contraste oscuro sobre fondo claro, deja espacio libre alrededor y descárgalo en PNG. Colócalo junto a un título y una URL corta legible; imprime una prueba y escanéala con al menos dos móviles desde la distancia real de uso.',
    'No codifiques datos personales del alumnado ni enlaces públicos a expedientes, calificaciones o imágenes sin la base y los permisos del centro. El QR oculta visualmente la dirección, pero no protege el destino: cualquier persona que vea la hoja puede fotografiarlo, compartirlo y abrirlo.',
  ],
  sections: [
    {
      heading: 'Empezar por la tarea, no por el cuadrado',
      paragraphs: [
        'Define qué debe ocurrir después del escaneo: escuchar una explicación, abrir una fuente, responder un formulario, consultar una rúbrica o entregar una evidencia. Si escribir una dirección corta es más rápido, el QR no aporta valor. Sí puede reducir errores en una URL larga, conectar estaciones físicas con recursos distintos o permitir que una familia abra información desde el móvil.',
        'Escribe una frase de éxito observable: «cada pareja abre el vídeo correcto y anota dos ideas en cuatro minutos». Esa frase determina el destino, el número de códigos, el tiempo, los auriculares y la alternativa. Un QR sin una acción definida suele trasladar la confusión del papel a la pantalla.',
      ],
    },
    {
      heading: 'Preparar un destino estable y apto para móvil',
      paragraphs: [
        'Abre primero la dirección en una ventana privada y desde un teléfono que no tenga tu sesión iniciada. Comprueba HTTPS, título, carga, tamaño del texto, botones, audio y permisos. Un enlace que funciona para el profesor dentro de su cuenta puede pedir acceso o mostrar un error al alumnado.',
        'Evita enlazar directamente a una vista de edición o a una carpeta entera cuando solo necesitas un recurso. Si el proveedor puede cambiar la URL, utiliza una página intermedia controlada por el centro. Anota quién mantendrá el destino y cuándo se revisará; el papel puede durar más que la página enlazada.',
      ],
    },
    {
      heading: 'Generar el QR con el contenido exacto',
      paragraphs: [
        'Copia la URL desde la barra después de abrir la versión final, no desde un borrador ni desde un resultado de búsqueda. Elimina parámetros de seguimiento innecesarios si el servicio permite una dirección limpia. Cuanto más largo sea el contenido, más densa será la matriz y más exigente resultará el escaneo impreso.',
        'FunnyTools genera el código dentro del navegador, ofrece niveles L, M, Q y H, tamaños de 128, 256 y 512 píxeles y descarga PNG. Para un enlace escolar normal empieza con M y 512 píxeles si va a insertarse en un documento; conserva el archivo original y reduce su tamaño visual sin deformarlo.',
      ],
      link: {
        prefix: 'Crea y descarga la imagen con el ',
        label: 'generador de códigos QR',
        href: '/es/herramientas/generador-codigo-qr/',
        suffix: ' y prueba el PNG antes de incorporarlo al material.',
      },
    },
    {
      heading: 'Contraste, zona libre y forma del código',
      paragraphs: [
        'Usa módulos oscuros sobre un fondo claro uniforme. Evita fotografías, degradados y combinaciones con poco contraste. La guía de GS1 advierte que el contraste deficiente, varios colores y la deformación de la cuadrícula pueden impedir la lectura. No estires la imagen para llenar un hueco: conserva la proporción cuadrada.',
        'Mantén una zona blanca limpia alrededor. No pegues texto, bordes, iconos ni otros códigos contra la matriz. En una composición, agrupa el título y la explicación cerca, pero fuera de esa zona. Una decoración atractiva no compensa una estructura dañada.',
      ],
    },
    {
      heading: 'Elegir nivel de corrección sin prometer milagros',
      paragraphs: [
        'La corrección de errores permite reconstruir parte de la información cuando existe daño, pero niveles más altos también producen una matriz más compleja. M es un punto de partida razonable para un QR limpio. Q o H pueden ayudar cuando el soporte se deteriorará o se ha añadido una pequeña marca, siempre con una prueba real.',
        'Un logotipo tapa módulos y consume la capacidad de corrección. GS1 recuerda que los logotipos no forman parte del diseño normalizado y se comportan como daño. La opción más fiable para un aula es dejar el QR intacto y colocar el logotipo fuera. Si lo superpones, hazlo pequeño, no cubras los patrones de posición y vuelve a probar varios dispositivos.',
      ],
    },
    {
      heading: 'Tamaño de impresión y distancia: probar el caso real',
      paragraphs: [
        'No existe un único tamaño válido para todas las aulas. Influyen la densidad del código, la cámara, la iluminación, el papel, el movimiento y la distancia. Una ficha que se escanea a veinte centímetros y un cartel al fondo de un pasillo son problemas distintos.',
        'Imprime al tamaño previsto, fija el material donde se usará y prueba desde la posición habitual. Incluye móviles de prestaciones diferentes y no evalúes solo desde la pantalla del ordenador. Si tarda, aumenta el tamaño, simplifica la URL, mejora la luz o acerca el punto de escaneo; no obligues a repetir movimientos incómodos.',
      ],
    },
    {
      heading: 'Etiquetar el destino antes de pedir un escaneo',
      paragraphs: [
        'Junto al QR escribe una instrucción concreta: «Abrir instrucciones del experimento, 3 min» o «Responder formulario de salida». Añade el dominio o una URL corta reconocible y, cuando importe, el formato, el idioma o la duración. «Escanéame» no informa del propósito ni permite decidir si se desea abrir.',
        'W3C recomienda que el propósito de los enlaces sea descriptivo y que las imágenes funcionales tengan una alternativa que explique la acción. En un PDF accesible, el QR no debería ser la única vía: añade un enlace de texto clicable con un nombre equivalente.',
      ],
    },
    {
      heading: 'Diseñar una alternativa sin cámara ni visión',
      paragraphs: [
        'Ofrece la URL corta en texto, un enlace dentro de la plataforma educativa o un dispositivo compartido ya abierto. Una persona con baja visión, dificultades motoras, cámara averiada o un móvil sin datos no debe perder la actividad. La alternativa debe llevar al mismo recurso y exigir un esfuerzo comparable.',
        'Si proyectas el QR, lee también el destino y explica el siguiente paso. Para audio o vídeo incluye auriculares, transcripción o subtítulos según corresponda. La accesibilidad se decide en el conjunto QR, recurso y tarea, no únicamente en la imagen.',
      ],
    },
    {
      heading: 'Privacidad: un QR no es un control de acceso',
      paragraphs: [
        'Cualquier persona puede decodificar, copiar y reenviar el contenido. No incluyas nombre completo, correo, contraseña, calificación, identificador interno ni información médica dentro del código. Tampoco publiques un enlace abierto a fotografías o trabajos identificables solo porque la URL no se ve a simple vista.',
        'La AEPD recuerda que centros y administraciones son responsables del tratamiento de datos del alumnado y que la difusión pública de imágenes puede requerir consentimiento. Utiliza las plataformas autorizadas, limita permisos al grupo adecuado y establece caducidad cuando el servicio la permita. Para ejemplos, usa datos ficticios.',
      ],
    },
    {
      heading: 'Formularios, familias y recopilación de respuestas',
      paragraphs: [
        'Antes de enlazar un formulario, revisa si pide iniciar sesión, qué campos son obligatorios, quién recibe las respuestas y cuánto tiempo se conservarán. Explica la finalidad al lado del QR. No recojas fecha de nacimiento, teléfono u otros datos porque «quizá sean útiles» si no son necesarios para la actividad.',
        'Para comunicaciones con familias, incluye el nombre del centro, el propósito y una alternativa de contacto. Prueba el formulario desde fuera del dominio institucional solo si realmente debe estar disponible así. Si el acceso está restringido, avisa para evitar que una pantalla de permiso parezca un fallo.',
      ],
    },
    {
      heading: 'Estaciones de aprendizaje sin colas ni confusión',
      paragraphs: [
        'Numera cada estación y repite el mismo número en la hoja, el QR y el recurso. Sitúa los códigos a una altura accesible, separados entre sí y lejos de reflejos. Indica si se necesita sonido, cuánto dura la actividad y qué evidencia debe producirse antes de rotar.',
        'Descarga los recursos autorizados o prepara una alternativa sin conexión cuando la red sea inestable. Distribuye los dispositivos y auriculares antes de empezar. Si doce personas deben escanear un único cartel a la vez, el problema es organizativo: duplica el código o escalona las entradas.',
      ],
    },
    {
      heading: 'Gymkanas y recorridos: separar juego y seguridad',
      paragraphs: [
        'En una búsqueda por pistas, cada QR debe estar en una ubicación segura, autorizada y observable. No coloques códigos cerca de tráfico, escaleras concurridas o zonas restringidas. Define qué ocurre si se pierde una pista y ofrece una tarjeta de respaldo al docente.',
        'Evita destinos que cambien según geolocalización o que pidan instalar una aplicación. Registra la secuencia completa en una tabla privada para poder reconstruirla. Una prueba piloto con dos personas revela códigos intercambiados, instrucciones ambiguas y puntos sin cobertura.',
      ],
    },
    {
      heading: 'Evitar códigos maliciosos o sustituidos',
      paragraphs: [
        'Un adhesivo puede cubrir un QR legítimo y redirigir a otra página. En carteles permanentes, imprime el dominio en texto, usa un diseño identificable del centro y revisa periódicamente que no haya superposiciones. Enseña al alumnado a mirar la vista previa de la dirección antes de abrir.',
        'No escanees códigos anónimos para averiguar qué son en un dispositivo con cuentas sensibles. En materiales compartidos por terceros, comprueba el destino y la fecha. Si el navegador muestra una alerta de seguridad o un dominio inesperado, se cancela la actividad y se informa al responsable.',
      ],
    },
    {
      heading: 'Control de versiones y mantenimiento',
      paragraphs: [
        'Nombra el archivo con propósito y fecha, por ejemplo «laboratorio-densidad-qr-2026.png», y conserva una tabla con material, destino, propietario y última prueba. No reutilices la misma imagen para un enlace distinto: quien tenga una copia antigua no sabrá que cambió.',
        'Antes de cada curso, abre los destinos, revisa permisos y retira recursos caducados. Si una URL deja de funcionar, sustituye el material físico o actualiza la página intermedia controlada; no confíes en que las personas adivinen la nueva ruta.',
      ],
    },
    {
      heading: 'Lista de comprobación antes de repartir el material',
      paragraphs: [
        'Comprueba contenido exacto, HTTPS, acceso sin sesión del profesor, experiencia móvil, contraste, zona libre, proporción cuadrada, título del destino y alternativa textual. Imprime al tamaño definitivo, prueba más de una cámara y revisa la iluminación del lugar.',
        'Después confirma privacidad, permisos, caducidad, plan sin red y responsable de mantenimiento. Un buen QR se abre con rapidez, explica adónde lleva, no revela datos y permite completar la misma tarea por otra vía.',
      ],
    },
  ],
  faq: [
    { q: '¿Cómo crear un código QR para una actividad escolar?', a: 'Prepara la URL final, comprueba permisos y móvil, genera un PNG con contraste alto, añade título y URL alternativa, imprime y prueba desde la distancia real.' },
    { q: '¿Qué nivel de corrección debo elegir?', a: 'M sirve como inicio para un código limpio. Q o H pueden tolerar más deterioro o una marca pequeña, pero producen más densidad y siempre requieren prueba.' },
    { q: '¿Puedo poner el logotipo del colegio dentro?', a: 'Es más fiable colocarlo fuera. Un logotipo dentro tapa información; si se usa, debe ser pequeño, no cubrir patrones y probarse en varios dispositivos.' },
    { q: '¿Qué tamaño debe tener el QR impreso?', a: 'Depende de densidad, cámara, luz y distancia. Imprime al tamaño real y verificalo en el lugar de uso; aumenta tamaño o simplifica la URL si tarda.' },
    { q: '¿El QR protege un enlace privado?', a: 'No. El contenido puede copiarse y compartirse. La privacidad depende de los permisos y controles del destino.' },
    { q: '¿Debo escribir la URL junto al código?', a: 'Sí, preferiblemente una dirección corta reconocible y una descripción del propósito. También sirve como alternativa cuando el escaneo falla.' },
    { q: '¿Funciona sin Internet?', a: 'La cámara puede leer el código, pero un destino web necesita conexión salvo que el recurso ya esté disponible sin red. Prepara una alternativa.' },
    { q: '¿FunnyTools guarda la URL introducida?', a: 'El generador crea la imagen localmente en el navegador; FunnyTools no recibe ni almacena el texto o la URL introducidos.' },
  ],
  review: {
    heading: 'Control de calidad del QR escolar',
    intro: 'La imagen solo está terminada cuando destino, acceso y alternativa funcionan en el contexto real.',
    checks: [
      { title: 'Destino', text: 'La URL es final, segura, móvil y tiene los permisos correctos sin depender de la sesión del autor.' },
      { title: 'Lectura', text: 'Contraste, zona libre, tamaño y prueba impresa permiten escanear desde la distancia prevista.' },
      { title: 'Inclusión', text: 'El propósito es visible, existe enlace alternativo y no se exponen datos personales.' },
    ],
  },
  sources: [
    { label: 'GS1: guía de códigos 2D', href: 'https://ref.gs1.org/guidelines/2d-in-retail/1.0.0/GS1-2DRetailPOS-Guideline-i1.0-r-2024-05-28', note: 'Contraste, zona libre, uniformidad, corrección de errores y riesgos de superponer logotipos.' },
    { label: 'W3C WAI: propósito de los enlaces', href: 'https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-link-only.html', note: 'Los enlaces deben describir su propósito y poder entenderse fuera del contexto visual.' },
    { label: 'W3C WAI: imágenes funcionales', href: 'https://www.w3.org/WAI/tutorials/images/functional/', note: 'El texto alternativo de una imagen funcional debe comunicar la acción que inicia.' },
    { label: 'AEPD: Guía para centros educativos', href: 'https://www.aepd.es/guias/guia-centros-educativos.pdf', note: 'Responsabilidad, diligencia y límites al tratamiento y difusión de datos del alumnado.' },
  ],
};

export const spanishPhotosToPdfGuide: SpanishInfoPage = {
  title: 'Pasar fotos a PDF desde el móvil: ordenar, corregir y comprobar antes de enviar',
  seoTitle: 'Cómo pasar fotos a PDF desde el móvil',
  seoDescription: 'Convierte fotos de apuntes o documentos en un PDF legible: captura recta, recorte, rotación, orden, A4, privacidad, peso y control final.',
  keywords: [
    'pasar fotos a PDF desde móvil',
    'convertir imágenes a PDF',
    'fotos apuntes a PDF',
    'escanear documentos con móvil',
    'JPG a PDF sin subir archivos',
  ],
  eyebrow: 'Flujo práctico · móvil · documentos legibles',
  intro: 'Un PDF hecho con fotos puede resolver una entrega urgente, reunir apuntes o archivar justificantes, pero no mejora una captura borrosa ni corrige un orden equivocado. El resultado útil nace antes de pulsar «crear»: superficie plana, luz uniforme, página completa, orientación coherente y revisión de cada imagen. Después se elige un tamaño de página apropiado, se genera el archivo y se abre la descarga como lo hará la persona destinataria.',
  directAnswer: [
    'Fotografía cada página desde arriba, con luz uniforme y sin cortar esquinas. Revisa nitidez ampliando el texto, recorta el fondo, rota lo necesario y nombra u ordena las imágenes. En el conversor elige A4 o Letter si necesitas páginas uniformes, o «ajustar a imagen» para conservar cada proporción; genera el PDF y ábrelo completo antes de enviarlo.',
    'FunnyTools procesa JPG y PNG localmente y no sube las imágenes, pero no aplica OCR ni ofrece compresión dentro de este conversor. El texto seguirá siendo una imagen y el tamaño puede ser alto. Conserva los originales hasta comprobar la entrega y utiliza una herramienta de compresión aparte solo si el límite de la plataforma lo exige.',
  ],
  sections: [
    {
      heading: 'Decidir si una foto convertida en PDF es suficiente',
      paragraphs: [
        'Este flujo es adecuado para apuntes, fichas, recibos o formularios cuando la finalidad principal es leer o imprimir. No equivale a un PDF con texto seleccionable, búsqueda, etiquetas de accesibilidad o firma digital. Si el documento exige validez administrativa, conservación de archivo, lectura por pantalla o extracción de datos, consulta el formato solicitado.',
        'Antes de empezar revisa el límite de tamaño, el nombre requerido, la orientación, el número máximo de páginas y si aceptan fotografías. Evitar una conversión incorrecta ahorra más tiempo que comprimir o rehacer un archivo después.',
      ],
    },
    {
      heading: 'Preparar mesa, luz y cámara',
      paragraphs: [
        'Coloca el papel sobre una superficie lisa que contraste con sus bordes. Usa luz difusa desde ambos lados o cerca de una ventana sin sol directo. Apaga el flash si produce reflejos, especialmente en papel satinado, carnés o fundas. Limpia la lente y estabiliza el móvil con ambas manos.',
        'Sitúa la cámara paralela a la hoja, no desde un ángulo lateral. Deja un margen pequeño alrededor de las cuatro esquinas para poder recortar sin perder contenido. Si la aplicación permite cuadrícula, utilízala para mantener líneas verticales y horizontales.',
      ],
    },
    {
      heading: 'Capturar texto pequeño sin borrosidad',
      paragraphs: [
        'Toca sobre el texto para enfocar y espera un instante antes de disparar. Amplía una línea pequeña inmediatamente: si las letras se mezclan o el trazo tiembla, repite. No confíes en que el PDF arreglará el enfoque; la conversión únicamente coloca la imagen en una página.',
        'Para una hoja grande con letra muy pequeña, acercarse puede ser mejor que utilizar zoom digital. Si necesitas dos fotos por página, deja solapamiento claro y anuncia el orden. Evita sombras de manos y móviles sobre la zona escrita.',
      ],
    },
    {
      heading: 'Proteger datos antes de fotografiar',
      paragraphs: [
        'Retira de la mesa documentos ajenos, tarjetas, direcciones y pantallas que puedan aparecer en el fondo. Comprueba cada miniatura: una esquina puede revelar nombre, teléfono o identificación aunque el documento principal sea inocuo. Para actividades escolares, utiliza el canal autorizado por el centro.',
        'Procesar localmente evita enviar el archivo al servidor de FunnyTools, pero la galería del móvil, las copias en la nube, las extensiones y el dispositivo conservan sus propias reglas. Borra copias temporales solo después de confirmar que existe un original seguro y que la política aplicable permite hacerlo.',
      ],
    },
    {
      heading: 'Recortar sin eliminar información',
      paragraphs: [
        'Elimina mesa y sombras externas, pero conserva encabezados, números de página, firmas y sellos cuando sean relevantes. Recorta todas las páginas con márgenes parecidos para que el documento no parezca saltar al leer. Si hay anotaciones cerca del borde, prioriza el contenido sobre una estética perfecta.',
        'La herramienta de recorte puede preparar una imagen antes de convertirla. Guarda una copia nueva en lugar de sustituir el original y abre el resultado a tamaño completo para comprobar las cuatro esquinas.',
      ],
      link: {
        prefix: 'Corrige bordes sobrantes con la herramienta para ',
        label: 'recortar una imagen',
        href: '/es/herramientas/recortar-imagen/',
        suffix: ' antes de reunir las páginas.',
      },
    },
    {
      heading: 'Rotar y mantener una orientación coherente',
      paragraphs: [
        'Corrige cada foto que aparezca de lado o invertida. En un documento principalmente vertical, una tabla horizontal puede conservar su orientación si así se lee mejor, pero no alternes giros por accidente. Piensa en la lectura en pantalla y también en la impresión.',
        'No gires el PDF entero para corregir una única página si las demás ya están bien. Trabajar la imagen antes permite controlar cada hoja. La herramienta de rotación y volteo exporta una copia editada localmente.',
      ],
      link: {
        prefix: 'Ajusta las páginas torcidas con ',
        label: 'rotar y voltear imagen',
        href: '/es/herramientas/rotar-voltear-imagen/',
        suffix: ' y conserva el archivo corregido.',
      },
    },
    {
      heading: 'Nombrar y ordenar antes de cargar',
      paragraphs: [
        'Usa números con ceros iniciales cuando el sistema de archivos pueda ordenar alfabéticamente: 01, 02, 03. Revisa anverso y reverso, páginas en blanco necesarias y anexos. Una foto duplicada o ausente puede pasar desapercibida entre miniaturas parecidas.',
        'En FunnyTools puedes reordenar las imágenes antes de crear el PDF. Compara la secuencia con el documento físico y no borres los originales hasta abrir el resultado. Para un cuaderno, una lista rápida de números de página reduce errores.',
      ],
    },
    {
      heading: 'Elegir A4, Letter o ajustar a imagen',
      paragraphs: [
        'A4 crea páginas uniformes habituales en España y gran parte de Europa; Letter corresponde a otros contextos. «Ajustar a imagen» hace coincidir cada página con las dimensiones proporcionales de su foto. La mejor opción depende de impresión, entrega y consistencia.',
        'Con A4 o Letter, la herramienta deja margen y encaja la foto sin deformarla. Si mezclas capturas panorámicas y páginas verticales, «ajustar a imagen» puede producir un PDF irregular. Para un trabajo escolar, suele ser preferible corregir primero las capturas y mantener una página uniforme.',
      ],
    },
    {
      heading: 'Orientación vertical u horizontal',
      paragraphs: [
        'Elige vertical para apuntes y documentos convencionales; horizontal para diapositivas, tablas anchas o planos. Esta opción define la página fija A4 o Letter, no gira automáticamente una foto mal orientada. Corrige la imagen antes de generar.',
        'Haz una prueba con una página representativa y abre el PDF. Si el texto queda demasiado pequeño por grandes márgenes laterales, cambia orientación o recorta mejor la foto. No amplíes tanto que desaparezcan bordes informativos.',
      ],
    },
    {
      heading: 'Crear el PDF en el navegador',
      paragraphs: [
        'Selecciona JPG o PNG, verifica miniaturas y orden, decide tamaño y orientación y pulsa crear. El navegador lee los archivos que eliges mediante la File API y genera una descarga. FunnyTools no necesita una cuenta ni envía esas imágenes al sitio o a un tercero para realizar la conversión.',
        'Mantén la pestaña abierta mientras se genera el archivo. Muchos originales grandes consumen memoria en el móvil; si el proceso falla, cierra otras pestañas, divide el lote en partes razonables o utiliza un ordenador. No interpretes un fallo de memoria como pérdida del original.',
      ],
      link: {
        prefix: 'Reúne las páginas con ',
        label: 'convertir imágenes a PDF',
        href: '/es/herramientas/convertir-imagenes-a-pdf/',
        suffix: ' después de preparar y ordenar las fotos.',
      },
    },
    {
      heading: 'Lo que la conversión no hace: OCR y accesibilidad',
      paragraphs: [
        'El texto fotografiado queda incrustado como imagen. No podrás seleccionarlo ni buscar una palabra, y un lector de pantalla no obtiene automáticamente su contenido. Si la persona destinataria necesita accesibilidad, utiliza OCR y revisa manualmente el reconocimiento, el orden de lectura, los títulos y el idioma.',
        'No presentes una foto de texto como equivalente permanente de un documento accesible. Para una entrega puntual puede ser aceptable si las reglas lo permiten; para materiales educativos reutilizables conviene conservar también el archivo de origen estructurado.',
      ],
    },
    {
      heading: 'Reducir peso sin destruir la legibilidad',
      paragraphs: [
        'El conversor inserta los datos JPG o PNG y no ofrece un control de calidad. Las fotos de cámara pueden ser mucho mayores de lo necesario. Si existe un límite, empieza recortando fondos y evitando capturas duplicadas; comprueba después si hace falta reducir resolución o comprimir.',
        'El compresor de PDF de FunnyTools reorganiza el archivo, pero no garantiza que quede más pequeño y no vuelve a muestrear imágenes. Muestra el tamaño original y final. Si la salida crece o no cambia, conserva la original y prepara imágenes más ligeras antes de reconstruir el PDF.',
      ],
      link: {
        prefix: 'Si la plataforma impone un límite, prueba ',
        label: 'comprimir el PDF',
        href: '/es/herramientas/comprimir-pdf/',
        suffix: ' y compara el tamaño y la lectura antes de sustituirlo.',
      },
    },
    {
      heading: 'Control final página por página',
      paragraphs: [
        'Abre la descarga, no solo la miniatura del navegador. Comprueba número de páginas, orden, orientación, esquinas, enfoque, color y que ninguna hoja esté repetida. Amplía el texto más pequeño y recorre el PDF en modo continuo para detectar saltos.',
        'Prueba el archivo en el dispositivo o plataforma de destino cuando sea posible. Una entrega no termina al generarse: confirma que se subió el archivo correcto, que se abre y que el nombre permite identificarlo sin exponer datos innecesarios.',
      ],
    },
    {
      heading: 'Nombre del archivo y versión de entrega',
      paragraphs: [
        'Utiliza un nombre corto y descriptivo siguiendo las instrucciones: «apellido-actividad-03.pdf» si el centro lo solicita. Evita «documento final definitivo 2» y caracteres que una plataforma pueda rechazar. No incluyas DNI, fecha de nacimiento ni otros datos que no sean necesarios.',
        'Si corriges una página, genera una versión nueva y vuelve a comprobar todo el archivo. Guarda el PDF entregado y, cuando proceda, el justificante de subida. Los originales deben mantenerse hasta que la recepción esté confirmada.',
      ],
    },
    {
      heading: 'Lista de comprobación para fotos a PDF',
      paragraphs: [
        'Confirma formato aceptado, páginas completas, enfoque, luz, recorte, orientación, orden y privacidad. Elige A4, Letter o ajuste a imagen según el uso, genera localmente y espera a que termine la descarga.',
        'Después abre el PDF, cuenta páginas, amplía texto, comprueba peso, nombre y plataforma. Conserva originales y recuerda que una imagen dentro de PDF no se convierte por sí sola en texto buscable o accesible.',
      ],
    },
  ],
  faq: [
    { q: '¿Cómo convertir varias fotos en un solo PDF?', a: 'Corrige y ordena las imágenes, cárgalas en el conversor, elige tamaño y orientación, crea el PDF y revisa la descarga página por página.' },
    { q: '¿Qué tamaño de página elijo?', a: 'A4 para documentos uniformes habituales en España, Letter si lo exige el destino y ajustar a imagen si quieres conservar la proporción individual.' },
    { q: '¿Las fotos se suben a FunnyTools?', a: 'No. El navegador procesa las imágenes seleccionadas y crea la descarga localmente.' },
    { q: '¿El PDF tendrá texto seleccionable?', a: 'No. Las fotos se incrustan como imágenes. Para buscar o seleccionar texto necesitas OCR y una revisión posterior.' },
    { q: '¿La herramienta comprime las fotos?', a: 'No ofrece control de compresión. Prepara imágenes más ligeras o prueba después el compresor, verificando que la salida realmente reduzca peso.' },
    { q: '¿Por qué una página sale girada?', a: 'La orientación de página no corrige automáticamente la foto. Rota la imagen antes de crear el PDF.' },
    { q: '¿Puedo hacerlo desde un móvil?', a: 'Sí, si el navegador dispone de memoria suficiente. Para lotes grandes, divide el trabajo o usa un ordenador.' },
    { q: '¿Qué debo revisar antes de enviar?', a: 'Cantidad, orden, nitidez, orientación, datos visibles, tamaño, nombre y apertura en la plataforma de destino.' },
  ],
  review: {
    heading: 'Control de calidad del PDF fotografiado',
    intro: 'El archivo debe ser completo, legible y adecuado para el canal de entrega.',
    checks: [
      { title: 'Captura', text: 'Todas las páginas están enfocadas, completas, rectas y libres de información ajena.' },
      { title: 'Documento', text: 'Orden, orientación, tamaño de página y nombre responden a las instrucciones.' },
      { title: 'Entrega', text: 'La descarga se abrió, el texto pequeño se lee y el peso cumple el límite sin perder contenido.' },
    ],
  },
  sources: [
    { label: 'MDN: File API', href: 'https://developer.mozilla.org/en-US/docs/Web/API/File_API', note: 'Cómo una aplicación web accede a los archivos que el usuario selecciona expresamente.' },
    { label: 'MDN: usar archivos desde aplicaciones web', href: 'https://developer.mozilla.org/en-US/docs/Web/API/File_API/Using_files_from_web_applications', note: 'Selección local, lectura, miniaturas y URL de objeto en el navegador.' },
    { label: 'W3C WAI: principios de accesibilidad', href: 'https://www.w3.org/WAI/fundamentals/accessibility-principles/', note: 'Alternativas textuales, estructura y acceso equivalente a contenido no textual.' },
    { label: 'AEPD: Guía para centros educativos', href: 'https://www.aepd.es/guias/guia-centros-educativos.pdf', note: 'Diligencia y protección de datos personales del alumnado y sus familias.' },
  ],
};

export const spanishMultiplicationFluencyGuide: SpanishInfoPage = {
  title: 'Fluidez con las tablas de multiplicar: comprender, recuperar y aplicar sin convertirlo en una carrera',
  seoTitle: 'Fluidez en las tablas de multiplicar',
  seoDescription: 'Planifica práctica de tablas con significado, estrategias, recuperación espaciada, actividades breves, evaluación de precisión y progreso personal.',
  keywords: [
    'fluidez tablas de multiplicar',
    'aprender tablas de multiplicar',
    'practicar multiplicaciones primaria',
    'cálculo mental multiplicación',
    'actividades tablas multiplicar',
  ],
  eyebrow: 'Didáctica de matemáticas · Primaria · práctica con sentido',
  intro: 'Saber una tabla con fluidez significa recuperar un hecho con precisión y suficiente agilidad para liberar atención en problemas más complejos. No significa recitar deprisa sin comprender ni competir por ser el primero. La enseñanza eficaz conecta grupos iguales, suma repetida, matrices, propiedades y relaciones numéricas; después distribuye prácticas breves hasta que las estrategias dejan paso a una recuperación estable.',
  directAnswer: [
    'Construye cada familia de hechos con objetos, dibujos de filas y columnas y situaciones reales. Enseña relaciones —dobles, cinco y diez, conmutativa y distributiva—, practica pocos hechos a la vez con recuperación espaciada, mezcla después familias conocidas y registra precisión y estrategia antes de velocidad.',
    'Las actividades cronometradas pueden usarse durante uno a cinco minutos cuando el contenido ya se ha enseñado y practicado, como una medida privada de progreso, no como instrucción inicial, castigo o clasificación pública. Si la presión reduce la precisión o bloquea la participación, retira el tiempo y vuelve a representación, estrategia y práctica sin exposición.',
  ],
  sections: [
    {
      heading: 'Qué significa fluidez multiplicativa',
      paragraphs: [
        'La fluidez combina exactitud, eficiencia razonable, flexibilidad y comprensión. Una respuesta rápida que se confunde con frecuencia no es dominio; una respuesta correcta obtenida contando desde uno cada vez tampoco libera recursos. El objetivo es elegir o recuperar una relación fiable y poder explicar por qué tiene sentido.',
        'Distingue tres momentos: comprender la operación, desarrollar estrategias y automatizar hechos. Se solapan, pero no conviene saltar el primero. El currículo básico español sitúa las tablas junto a su construcción mediante número de veces, suma repetida y disposiciones rectangulares, además de estrategias de cálculo mental en situaciones contextualizadas.',
      ],
    },
    {
      heading: 'Construir significado con grupos y matrices',
      paragraphs: [
        'Presenta 4 × 6 como cuatro grupos de seis, veinticuatro objetos organizados o cuatro filas con seis elementos. Cambia el contexto y pide que el alumnado identifique qué representa cada factor. Los materiales manipulativos son un puente hacia un dibujo y, después, hacia la expresión simbólica.',
        'Las matrices hacen visibles propiedades: girar cuatro filas de seis produce seis filas de cuatro sin cambiar el total; separar una matriz permite descomponer. INTEF propone representar multiplicaciones en filas y columnas y avanzar hacia cálculo mental evitando depender siempre del conteo simple.',
      ],
    },
    {
      heading: 'No enseñar las tablas como diez listas aisladas',
      paragraphs: [
        'Organiza hechos por relaciones. Las tablas de 2, 5 y 10 ofrecen patrones visibles; la de 4 puede construirse doblando la de 2; la de 8 dobla la de 4; la de 9 puede relacionarse con diez grupos menos uno. Esto reduce memoria arbitraria y da una vía de recuperación cuando el recuerdo inmediato falla.',
        'Marca qué hechos ya se dominan y cuáles requieren estrategia. Gracias a la conmutativa, conocer 3 × 7 ayuda con 7 × 3, aunque el contexto de grupos cambie. La tabla completa deja de parecer cien respuestas independientes.',
      ],
    },
    {
      heading: 'Enseñar estrategias que se puedan explicar',
      paragraphs: [
        'Para 6 × 7, una persona puede pensar 5 × 7 + 7; para 8 × 6, 10 × 6 − 2 × 6; para 4 × 9, doble del doble. Pide que represente o verbalice la estrategia y compare caminos. La flexibilidad evita que un olvido bloquee el problema.',
        'No impongas una estrategia única a todo el grupo. Modela varias, comprueba que conservan los factores y deja elegir la más segura. Con el tiempo, la respuesta puede recuperarse directamente, pero la relación permanece disponible para verificar.',
      ],
    },
    {
      heading: 'Secuenciar hechos fáciles y difíciles',
      paragraphs: [
        'Empieza con identidades de 0 y 1, dobles, cinco y diez según la progresión del centro; añade familias relacionadas y hechos todavía desconocidos en grupos pequeños. Una sesión con veinte hechos nuevos aporta menos información que cuatro hechos objetivo repetidos en contextos variados.',
        'La guía de práctica del IES estadounidense recomienda introducir actividades cronometradas solo después de enseñar el tema, organizar primero hechos más fáciles y después más difíciles y terminar con práctica mixta. La secuencia debe adaptarse a la evaluación real del aula.',
      ],
    },
    {
      heading: 'Práctica de recuperación, no copia repetitiva',
      paragraphs: [
        'Mirar y copiar una tabla produce familiaridad, pero no demuestra que pueda recuperarse sin apoyo. Alterna una pregunta, una pausa breve, respuesta y comprobación. Las tarjetas pueden pedir producto, factor que falta, representación o problema verbal para que la asociación sea bidireccional.',
        'Espacia las apariciones a lo largo de días y vuelve a hechos que estaban consolidados. Mezclar es útil después de una fase inicial focalizada. Si cada error reaparece inmediatamente muchas veces, la actividad puede convertirse en adivinación; intercala otros hechos y recupera la estrategia.',
      ],
    },
    {
      heading: 'Diseñar una rutina diaria de diez minutos',
      paragraphs: [
        'Minutos 1 y 2: representar un hecho y conectar una propiedad. Minutos 3 a 6: recuperación de cuatro hechos objetivo con respuesta y explicación. Minutos 7 y 8: juego o problema breve. Minutos 9 y 10: salida individual con dos hechos y una estrategia.',
        'La rutina es corta para proteger el tiempo de resolución de problemas. Cambia el formato, no el objetivo, y registra una evidencia pequeña. Una sesión aislada de cuarenta minutos seguida de una semana sin práctica suele ser menos sostenible.',
      ],
    },
    {
      heading: 'Usar números aleatorios con una intención concreta',
      paragraphs: [
        'Un generador puede seleccionar factores dentro de un rango, pero la aleatoriedad no diseña la progresión. Limita el conjunto a familias ya enseñadas y decide si aparecen ceros, unos o factores superiores a diez. Para una ronda de la tabla del 6, fija un factor y varía el otro.',
        'Registra cada pregunta antes de mostrar la respuesta para poder revisar errores. Si la herramienta produce una combinación fuera del objetivo, no la conviertas en una prueba sorpresa: ajusta el rango. El azar sirve para variar el orden, no para decidir qué contenido está preparado.',
      ],
      link: {
        prefix: 'Crea factores dentro del rango previsto con el ',
        label: 'generador de números aleatorios',
        href: '/es/herramientas/generador-numeros-aleatorios/',
        suffix: ' y conserva la misma regla durante la actividad.',
      },
    },
    {
      heading: 'Actividades cronometradas: cuándo y cómo',
      paragraphs: [
        'El tiempo puede medir una recuperación ya practicada, no sustituir la enseñanza. Utiliza rondas breves de uno a cinco minutos, con pocos hechos conocidos y objetivo individual. Compara cada resultado con el propio intento anterior y separa aciertos, errores y omitidos.',
        'No proyectes una clasificación ni elimines recreo por velocidad. Ofrece práctica sin reloj y pausas a quien las necesite. Si el alumnado empieza a adivinar, se bloquea o empeora de forma sostenida, detén la ronda, revisa estrategias y reduce el conjunto.',
      ],
      link: {
        prefix: 'Para una ronda breve y privada, utiliza el ',
        label: 'cronómetro online',
        href: '/es/herramientas/cronometro-online/',
        suffix: ' después de explicar la regla y la forma de registrar.',
      },
    },
    {
      heading: 'Medir precisión antes de velocidad',
      paragraphs: [
        'Calcula aciertos entre intentos válidos y observa el tipo de error. Ocho aciertos de diez con dos respuestas impulsivas no equivalen a ocho de ocho con dos omitidas para pensar. La siguiente intervención cambia: control de respuesta, estrategia específica o más oportunidades.',
        'Un porcentaje resume, pero no explica. Conserva también familia, fecha, condición con o sin tiempo y estrategia. No compares porcentajes calculados con denominadores distintos sin indicarlo.',
      ],
      link: {
        prefix: 'Obtén la tasa de aciertos con la ',
        label: 'calculadora de porcentajes',
        href: '/es/herramientas/calculadora-porcentajes/',
        suffix: ' y acompáñala con el número total de intentos.',
      },
    },
    {
      heading: 'Analizar errores para elegir la siguiente práctica',
      paragraphs: [
        'Clasifica errores: confusión de operación, conteo incorrecto, patrón mal aplicado, inversión de cifras, hecho vecino o respuesta impulsiva. Pregunta «¿cómo lo pensaste?» antes de repetir. Dos respuestas iguales pueden necesitar apoyos diferentes.',
        'Elige un contraste pequeño: 6 × 7 frente a 6 × 8, o 7 × 8 frente a 5 × 8 + 2 × 8. Representa, resuelve y vuelve a preguntar más tarde. No hagas copiar toda la tabla por un único hecho difícil.',
      ],
    },
    {
      heading: 'Juegos con reglas matemáticas visibles',
      paragraphs: [
        'Un bingo, dominó o memoria aporta práctica si todas las personas recuperan productos y justifican emparejamientos. Evita formatos en los que solo responde quien es más rápido mientras el resto espera. Da turnos, tiempo de pensamiento y una función al observador.',
        'En equipos, la puntuación puede premiar explicación, corrección de un error y consenso, no solo velocidad. Revisa que el componente de azar no oculte el aprendizaje: al terminar, cada estudiante resuelve una evidencia individual.',
      ],
    },
    {
      heading: 'Aplicar las tablas dentro de problemas',
      paragraphs: [
        'Incluye comparación multiplicativa, grupos iguales, combinaciones, área y escala. Pide decidir si la multiplicación corresponde, representar factores y estimar el orden de magnitud. La fluidez es valiosa porque permite atender a estas decisiones, no porque la tabla sea el destino final.',
        'Varía la incógnita: total desconocido, número de grupos o cantidad en cada grupo. «Hay seis mesas con cuatro sillas» no exige la misma estructura mental que «24 sillas repartidas en seis mesas». Relacionar multiplicación y división fortalece la red de hechos.',
      ],
    },
    {
      heading: 'Adaptaciones sin bajar la meta matemática',
      paragraphs: [
        'Ofrece tabla de referencia durante la fase conceptual, materiales, cuadrícula, respuesta oral o escrita y más tiempo. Reduce el número de hechos simultáneos y aumenta la frecuencia de práctica. Retira apoyos gradualmente cuando los datos muestran estabilidad.',
        'Para dificultades persistentes, coordina con el equipo de apoyo y utiliza el plan del centro. No interpretes lentitud como falta de esfuerzo. Una adaptación puede cambiar acceso, cantidad o tiempo sin eliminar comprensión y razonamiento.',
      ],
    },
    {
      heading: 'Comunicar progreso a alumnado y familias',
      paragraphs: [
        'Informa de familias dominadas, estrategias disponibles y siguiente objetivo: «recupera 2, 5 y 10 con precisión; ahora relacionará 4 con dobles». Evita etiquetas como «malo en tablas» y comparaciones públicas. Comparte prácticas cortas que puedan integrarse en situaciones cotidianas.',
        'En casa, cinco minutos de tarjetas comentadas, agrupaciones de objetos o cálculo en recetas pueden ser suficientes. Si una respuesta falla, vuelve a una relación conocida. La sesión no debe convertirse en examen diario ni conflicto familiar.',
      ],
    },
    {
      heading: 'Lista de comprobación de una secuencia de fluidez',
      paragraphs: [
        'Confirma que cada familia se construyó con representación y contexto, que existen estrategias explícitas y que la práctica recupera pocos hechos con retroalimentación. Alterna focalización, espaciado, mezcla y aplicación en problemas.',
        'Registra exactitud, error y progreso personal. Usa reloj solo con contenido aprendido, durante poco tiempo y sin exposición. Si la velocidad compite con la comprensión, vuelve a significado y estrategia: la meta es una herramienta matemática durable.',
      ],
    },
  ],
  faq: [
    { q: '¿Qué es la fluidez en las tablas de multiplicar?', a: 'Es recuperar o derivar hechos con precisión, eficiencia razonable, flexibilidad y comprensión suficiente para aplicarlos en problemas.' },
    { q: '¿Hay que memorizar las tablas?', a: 'La recuperación estable es útil, pero debe construirse sobre significado, representaciones y estrategias, no sobre repetición aislada.' },
    { q: '¿En qué orden se enseñan?', a: 'Sigue el currículo y la evaluación del grupo; suele ser útil comenzar por 0, 1, 2, 5 y 10 y conectar después 4, 8, 9 y hechos relacionados.' },
    { q: '¿Son malos los ejercicios cronometrados?', a: 'No necesariamente. Úsalos brevemente después de enseñar y practicar, como progreso privado. No deben ser instrucción inicial, castigo ni ranking.' },
    { q: '¿Cuánto tiempo practicar cada día?', a: 'Una rutina focalizada de unos diez minutos puede ser suficiente si se repite, da retroalimentación y se integra con problemas.' },
    { q: '¿Qué hago con un hecho que siempre falla?', a: 'Pregunta la estrategia, representa el hecho, conéctalo con uno conocido, contrástalo con un vecino y recupéralo más tarde.' },
    { q: '¿Cómo mido el progreso?', a: 'Registra aciertos, intentos, tipos de error, estrategia y condición de tiempo. Compara a cada estudiante consigo mismo.' },
    { q: '¿Los juegos sustituyen la práctica?', a: 'No. Son un formato útil si todos recuperan y explican hechos; deben acompañarse de evidencia individual y aplicación.' },
  ],
  review: {
    heading: 'Control de calidad de la práctica multiplicativa',
    intro: 'La secuencia debe producir comprensión, precisión y autonomía, no solo respuestas rápidas.',
    checks: [
      { title: 'Significado', text: 'Los hechos se relacionan con grupos, matrices, propiedades y problemas.' },
      { title: 'Práctica', text: 'La recuperación es breve, espaciada, ajustada a hechos enseñados y recibe retroalimentación.' },
      { title: 'Evaluación', text: 'Se registra precisión y estrategia; el tiempo es opcional, privado y nunca sustituye el apoyo.' },
    ],
  },
  sources: [
    { label: 'BOE: currículo básico de Educación Primaria', href: 'https://www.boe.es/buscar/doc.php?id=BOE-A-2022-3296', note: 'Construcción de tablas, suma repetida, matrices, cálculo mental y operaciones flexibles en contexto.' },
    { label: 'INTEF: representación de la multiplicación', href: 'https://descargas.intef.es/recursos_educativos/geogebra/Primaria/P34296/informacin_curricular.html', note: 'Filas, columnas, significado de la multiplicación y avance desde el conteo hacia cálculo mental.' },
    { label: 'INTEF: cálculo mental', href: 'https://formacion.intef.es/aulaenabierto/mod/book/tool/print/index.php?id=3435', note: 'Comprensión numérica profunda y estrategias como base para el cálculo mental.' },
    { label: 'IES: práctica para fluidez matemática', href: 'https://ies.ed.gov/ncee/WWC/Docs/PracticeGuide/WWC2021006-Math-PG.pdf', note: 'Secuencia de hechos, práctica mixta y actividades cronometradas breves después de la instrucción.' },
  ],
};

export const spanishA4LetterPrintingGuide: SpanishInfoPage = {
  title: 'A4 o US Letter: imprimir un PDF sin recortes ni escalas inesperadas',
  seoTitle: 'A4 vs Letter: medidas y cómo imprimir PDF',
  seoDescription: 'Compara A4 y US Letter, elige tamaño real, ajustar o reducir páginas grandes y evita recortes en fichas, plantillas y documentos PDF.',
  keywords: [
    'A4 vs Letter',
    'diferencia A4 y US Letter',
    'imprimir Letter en A4',
    'PDF recortado al imprimir',
    'tamaño real o ajustar PDF',
  ],
  eyebrow: 'Guía de impresión · A4 y Letter · PDF sin recortes',
  intro: 'A4 y US Letter se parecen, pero no son intercambiables. A4 mide 210 × 297 mm; Letter, 215,9 × 279,4 mm. Letter es 5,9 mm más ancho y 17,6 mm más corto. Por eso una ficha estadounidense puede perder los laterales al imprimirse a tamaño real en A4, mientras que un documento A4 puede perder la parte inferior sobre Letter. La solución depende de si el contenido admite escala o debe conservar medidas físicas exactas.',
  directAnswer: [
    'Para un documento normal en Letter que vas a imprimir sobre A4, selecciona papel A4 y «Reducir páginas grandes» o una opción equivalente que mantenga toda la página dentro del área imprimible. Revisa la vista previa y prueba una hoja antes del lote. Evita «Tamaño real» si hay contenido cerca de los laterales.',
    'Para reglas, patrones de costura, plantillas, cuadrículas o cualquier material que deba medir exactamente, usa «Tamaño real» o 100 %, desactiva el ajuste automático e imprime una página de calibración. Si el diseño original no cabe en el papel elegido, necesitas la versión correcta de A4 o Letter; reducirlo alteraría su función.',
  ],
  sections: [
    {
      heading: 'Medidas de A4 y US Letter',
      paragraphs: [
        'A4 mide 210 × 297 mm, aproximadamente 8,27 × 11,69 pulgadas. US Letter mide 8,5 × 11 pulgadas, es decir, 215,9 × 279,4 mm. La diferencia parece pequeña en una pantalla, pero afecta a márgenes, saltos de página, tablas y elementos pegados al borde.',
        'A4 pertenece a la serie ISO A y conserva una proporción basada en la raíz de dos al dividir el papel. Letter responde a otra tradición. En España y en la mayor parte de Europa, la impresora y las bandejas suelen configurarse para A4; muchos materiales creados en Estados Unidos y Canadá llegan en Letter.',
      ],
    },
    {
      heading: 'Cómo reconocer el tamaño del PDF antes de imprimir',
      paragraphs: [
        'Abre propiedades del documento o mira la información de página en el visor. Puede aparecer 210 × 297 mm, A4, 8,5 × 11 in o Letter. No deduzcas el tamaño por la forma visual: ambas páginas son verticales y una miniatura oculta la diferencia.',
        'En un PDF con tamaños mezclados, revisa varias páginas. Portada, anexos o escaneos pueden tener dimensiones distintas. La opción de elegir bandeja según el tamaño del PDF solo funciona si la impresora dispone del papel correspondiente y está bien configurada.',
      ],
    },
    {
      heading: 'Por qué desaparece contenido en los bordes',
      paragraphs: [
        '«Tamaño real» imprime sin cambiar la escala. Adobe indica que las páginas o selecciones que no caben se recortan. Un Letter a 100 % supera el ancho de A4; además, casi todas las impresoras domésticas tienen una zona física no imprimible aunque el papel sí sea suficientemente grande.',
        'El recorte puede aparecer solo en un lado si la página no está centrada o si el controlador añade márgenes. Mira la vista previa, localiza advertencias y confirma tamaño de papel en el visor y en las propiedades de la impresora. Dos ajustes contradictorios pueden aplicar una segunda escala.',
      ],
    },
    {
      heading: 'Diferencia entre Ajustar, Tamaño real y Reducir páginas grandes',
      paragraphs: [
        '«Ajustar» reduce las páginas grandes y también puede ampliar las pequeñas para llenar el área imprimible. «Tamaño real» conserva 100 % y recorta lo que no cabe. «Reducir páginas grandes» disminuye únicamente las páginas que exceden el papel y deja las pequeñas sin ampliar.',
        'Para apuntes, artículos o fichas donde importa que todo se vea, reducir páginas grandes suele ser una elección prudente. Para material calibrado, tamaño real es obligatorio. Ajustar puede resultar útil para una presentación, pero una ampliación inesperada puede reducir márgenes o modificar dimensiones.',
      ],
    },
    {
      heading: 'Imprimir un archivo Letter sobre papel A4',
      paragraphs: [
        'Selecciona A4 en las propiedades de impresora. En tamaño y gestión de páginas elige reducir páginas grandes, revisa que toda la miniatura quede dentro del límite y centra la página. La reducción necesaria por anchura es pequeña, pero puede afectar a una cuadrícula de medida exacta.',
        'Imprime solo la primera página y comprueba títulos, columnas, casillas y pie. Si hay demasiado espacio inferior, es consecuencia de la distinta proporción, no necesariamente un error. No compenses aumentando hasta llenar la altura porque volverían a salir los laterales.',
      ],
    },
    {
      heading: 'Imprimir un archivo A4 sobre papel Letter',
      paragraphs: [
        'El papel Letter es algo más ancho, pero bastante más corto. A tamaño real, el riesgo está arriba o abajo. Elige Letter como papel y reduce la página para que quepa en altura. La vista previa debe mostrar el pie completo y márgenes similares.',
        'Si el documento incluye formularios con líneas hasta el borde inferior, haz una prueba. Para archivos que se archivarán o enviarán, resulta mejor obtener la versión Letter original que depender de una escala distinta en cada impresora.',
      ],
    },
    {
      heading: 'Plantillas y materiales sensibles a la escala',
      paragraphs: [
        'Una regla impresa, un patrón, una etiqueta, papel cuadriculado o una pieza que debe encajar no admite reducción automática. Busca un cuadro de control que indique «debe medir 5 cm» y mídelo con una regla tras imprimir. Si no existe, añade una referencia conocida antes de distribuir.',
        'Usa 100 %, desactiva ajustar y confirma que el documento está diseñado para tu papel. Si no cabe, no cortes ni aceptes una escala aproximada: descarga la variante A4, remaqueta desde el archivo fuente o imprime en un formato mayor.',
      ],
    },
    {
      heading: 'Márgenes y área imprimible',
      paragraphs: [
        'El borde del papel no coincide con el área que la impresora puede marcar. El controlador comunica un margen mínimo que varía por modelo y modo. Un diseño con texto a dos milímetros del borde puede recortarse incluso cuando archivo y papel son ambos A4.',
        'Para materiales que usarán muchas personas, deja una zona segura generosa y evita datos esenciales en encabezados y pies extremos. La impresión sin bordes, cuando existe, puede ampliar ligeramente la imagen para cubrir el papel y también recortar una franja.',
      ],
    },
    {
      heading: 'Orientación vertical u horizontal',
      paragraphs: [
        'La orientación debe seguir al contenido. Activar rotación automática puede aprovechar mejor el papel, pero verifica que no transforme una hoja horizontal en una miniatura vertical. Para tablas anchas, elige horizontal tanto en el documento como en la impresora.',
        'Si solo una página necesita otra orientación, un PDF puede conservarla. Revisa el lote en la vista previa y no asumas que todas comparten configuración. Las bandejas y el dúplex también pueden cambiar al detectar una página distinta.',
      ],
    },
    {
      heading: 'Doble cara y borde de giro',
      paragraphs: [
        'En documentos verticales tipo libro se suele elegir girar por borde largo. En páginas horizontales tipo calendario puede convenir borde corto. La etiqueta varía por controlador; una prueba con dos páginas numeradas evita imprimir todo el reverso boca abajo.',
        'El desplazamiento entre cara y cara impide usar una impresora doméstica como sistema de registro perfecto. Para tarjetas que deben cortarse por ambos lados, aumenta tolerancias o usa un servicio de impresión con especificaciones de alineación.',
      ],
    },
    {
      heading: 'Crear un PDF desde imágenes con el papel correcto',
      paragraphs: [
        'Si partes de fotografías o escaneos, decide el destino antes de generar. FunnyTools permite A4, Letter o página ajustada a cada imagen, además de orientación vertical u horizontal. Para una entrega en España, A4 uniforme suele facilitar lectura e impresión.',
        'La imagen se encaja sin deformarse y con margen en los tamaños fijos. Recorta fondos y corrige orientación antes. «Ajustar a imagen» evita margen añadido, pero produce páginas de proporciones distintas si las capturas no son coherentes.',
      ],
      link: {
        prefix: 'Crea el documento con ',
        label: 'convertir imágenes a PDF',
        href: '/es/herramientas/convertir-imagenes-a-pdf/',
        suffix: ' y elige A4 o Letter según la entrega.',
      },
    },
    {
      heading: 'Resolución de imagen y calidad impresa',
      paragraphs: [
        'La nitidez depende de cuántos píxeles se reparten en el tamaño físico. No existe un número mágico para todo: una fotografía, un texto pequeño y un dibujo lineal toleran pérdidas diferentes. Comprueba al tamaño de impresión, no solo ampliando en pantalla.',
        'Redimensionar una imagen pequeña hacia arriba no crea detalle. Parte del archivo de mayor calidad razonable, evita múltiples guardados con pérdida y realiza una prueba de las letras y líneas más finas. Si el PDF pesa demasiado, reduce con una copia y compara antes de eliminar el original.',
      ],
    },
    {
      heading: 'Diseñar una plantilla para usuarios A4 y Letter',
      paragraphs: [
        'La mejor experiencia es ofrecer dos PDF etiquetados, uno A4 y otro US Letter. Mantén el mismo contenido y revisa cada versión de forma independiente; cambiar solo la configuración de exportación puede alterar saltos, pies y casillas.',
        'Si debe existir una única versión, concentra el contenido en una zona segura que quepa en ambos formatos y evita elementos calibrados. Incluye en la primera página el tamaño nativo y la instrucción de escala. El usuario no debería adivinar qué opción elegir.',
      ],
    },
    {
      heading: 'Solucionar una impresión demasiado pequeña',
      paragraphs: [
        'Comprueba si se aplicó «Ajustar» a una página que ya cabía, si el controlador añadió varias páginas por hoja o si el PDF tiene un lienzo enorme alrededor del contenido. Restablece una página por hoja y revisa el porcentaje mostrado.',
        'No recortes el papel para ocultar un error de escala. Si el contenido no es dimensional, una escala personalizada moderada puede mejorar lectura, pero observa todos los bordes. Si es dimensional, vuelve a 100 % y corrige el archivo fuente.',
      ],
    },
    {
      heading: 'Solucionar hojas en blanco o bandeja incorrecta',
      paragraphs: [
        'Una impresora puede pedir Letter aunque haya A4 cuando está activa la selección de bandeja por tamaño del PDF. Cambia el papel en el diálogo, desactiva esa selección o carga la bandeja correcta. Revisa que el controlador no tenga guardado un ajuste de un trabajo anterior.',
        'Las hojas en blanco pueden proceder de páginas vacías reales, separadores o un rango mal indicado. Recorre miniaturas, define páginas concretas para la prueba y confirma que no esté activada la impresión solo de páginas pares o impares.',
      ],
    },
    {
      heading: 'Prueba de una página antes de un lote',
      paragraphs: [
        'Elige una página que contenga elementos cerca de los cuatro bordes, texto pequeño y, si existe, un cuadro de calibración. Imprime, mide, comprueba orientación y lee el pie. Para doble cara, prueba dos hojas.',
        'Anota papel, escala, orientación, bandeja y borde de giro cuando el trabajo se repetirá. Esta ficha de producción evita que otro ordenador dependa de la memoria. Solo entonces imprime el lote completo.',
      ],
    },
    {
      heading: 'Lista de comprobación A4 y Letter',
      paragraphs: [
        'Identifica tamaño nativo, papel cargado, sensibilidad a escala, márgenes y orientación. Para contenido normal utiliza reducir páginas grandes; para plantillas usa 100 % y una medida de control. Revisa la vista previa completa.',
        'Imprime una muestra, comprueba bordes, escala, cara posterior y legibilidad. Si publicarás el archivo, ofrece variantes A4 y Letter, nómbralas claramente y evita que una única configuración escondida decida el resultado.',
      ],
    },
  ],
  faq: [
    { q: '¿Cuánto mide una hoja A4?', a: '210 × 297 mm, aproximadamente 8,27 × 11,69 pulgadas.' },
    { q: '¿Cuánto mide US Letter?', a: '8,5 × 11 pulgadas, equivalentes a 215,9 × 279,4 mm.' },
    { q: '¿Puedo imprimir Letter en A4?', a: 'Sí. Para documentos normales selecciona A4 y reduce páginas grandes; revisa la vista previa para evitar recortes laterales.' },
    { q: '¿Qué diferencia hay entre Ajustar y Tamaño real?', a: 'Ajustar puede reducir o ampliar para llenar el área; Tamaño real conserva 100 % y recorta lo que no cabe.' },
    { q: '¿Qué opción uso para una plantilla?', a: 'Tamaño real o 100 %, sin ajuste automático, y mide una referencia impresa. Usa la versión del papel correcto si no cabe.' },
    { q: '¿Por qué se corta un PDF A4 en papel A4?', a: 'La impresora puede tener márgenes no imprimibles, el papel configurado puede ser otro o el diseño puede llegar demasiado al borde.' },
    { q: '¿Cómo imprimo a doble cara sin que se invierta?', a: 'Normalmente borde largo para vertical y borde corto para horizontal, pero confirma con una prueba de dos páginas.' },
    { q: '¿Conviene ofrecer dos versiones de un imprimible?', a: 'Sí. Un PDF A4 y otro Letter evitan escalas y dan mejor resultado en regiones con distintos papeles.' },
  ],
  review: {
    heading: 'Control de calidad de impresión',
    intro: 'El ajuste correcto depende de si prima conservar todo el contenido o mantener la escala física.',
    checks: [
      { title: 'Formato', text: 'Se conocen el tamaño nativo del PDF y el papel realmente cargado.' },
      { title: 'Escala', text: 'El documento normal cabe completo o la plantilla mantiene 100 % con una medida verificada.' },
      { title: 'Prueba', text: 'Una hoja confirma bordes, orientación, legibilidad y giro antes del lote.' },
    ],
  },
  sources: [
    { label: 'Adobe Acrobat: ajustar tamaño para imprimir', href: 'https://helpx.adobe.com/es/acrobat/desktop/print-documents/set-up-and-print-pdfs/page-size.html', note: 'Diferencias entre Ajustar, Tamaño real, Reducir páginas grandes y escala personalizada.' },
    { label: 'Adobe: escalar o redimensionar páginas PDF', href: 'https://helpx.adobe.com/es/acrobat/kb/scale-or-resize-printed-pages.html', note: 'Procedimiento para adaptar páginas al papel y aplicar porcentajes manuales.' },
    { label: 'ISO 216: formatos de papel', href: 'https://www.iso.org/standard/36631.html', note: 'Norma internacional que define las series A y B de formatos de papel, incluida A4.' },
  ],
};
