import type { SpanishInfoPage } from './es-pages';

export const spanishPdfCategory: SpanishInfoPage = {
  title: 'Herramientas PDF online gratis y privadas',
  seoTitle: 'Herramientas PDF online gratis | FunnyTools',
  seoDescription: 'Une, divide, gira, ordena, extrae, elimina, comprime o convierte PDF en el navegador. Elige la operación correcta y verifica el archivo final.',
  keywords: [
    'herramientas PDF online',
    'editar PDF gratis',
    'unir dividir PDF',
    'organizar páginas PDF',
    'convertir PDF sin subir archivos',
  ],
  eyebrow: 'Colección PDF · tratamiento local · sin registro',
  intro: 'No hace falta instalar un editor completo para reorganizar un expediente, separar un capítulo o convertir unas páginas en imágenes. Esta colección reúne operaciones concretas que se ejecutan en el navegador. La clave está en elegir la función adecuada, trabajar siempre con una copia y comprobar el resultado, porque copiar páginas no garantiza conservar firmas, formularios, marcadores o todas las propiedades avanzadas de un PDF.',
  directAnswer: [
    'Usa Unir PDF para juntar documentos completos; Dividir o Extraer para crear archivos con rangos concretos; Eliminar para retirar páginas; Ordenar para cambiar la secuencia; Girar para corregir orientación; Imágenes a PDF para construir un documento desde fotos; PDF a imagen para exportar páginas; y Comprimir para intentar reducir estructura sin prometer una disminución.',
    'Las herramientas PDF en español de FunnyTools procesan los archivos dentro de la pestaña y generan copias nuevas. No reciben los documentos en un servidor de FunnyTools. Conserva los originales, evita equipos compartidos para información sensible y abre cada descarga antes de enviarla o sustituir una versión de trabajo.',
  ],
  sections: [
    {
      heading: 'Qué herramienta PDF elegir según la tarea',
      paragraphs: [
        'Empieza describiendo el resultado, no el botón: “un solo archivo con tres anexos”, “solo páginas 2 a 5”, “mismo documento sin las hojas en blanco” o “cada página como JPG”. Esa frase permite distinguir operaciones que parecen similares. Unir trabaja con documentos completos; extraer conserva rangos; dividir crea varios fragmentos; eliminar produce una copia sin determinadas páginas.',
        'Si necesitas más de una operación, planifica el orden. Normalmente conviene extraer o eliminar primero, corregir orientación, ordenar, unir y comprimir solo al final si existe un límite. Cada paso debe producir una copia identificable y verificarse antes de pasar al siguiente.',
      ],
    },
    {
      heading: 'Unir varios PDF en el orden correcto',
      paragraphs: [
        'Para combinar portada, formulario y anexos, anota la secuencia y el número de páginas de cada original. Ordena los archivos completos y suma las páginas esperadas. El resultado no modifica las entradas, pero puede no conservar formularios, firmas digitales, carteras, adjuntos o marcadores tal como los interpreta un editor profesional.',
        'Abre la descarga y recorre cada punto de unión. Comprueba que no se añadió una versión antigua con el mismo nombre y que la primera y última página de cada bloque son correctas. En documentación firmada, conserva el original firmado y sigue las instrucciones de la entidad.',
      ],
      link: {
        prefix: 'Combina documentos completos con ',
        label: 'Unir PDF',
        href: '/es/herramientas/unir-pdf/',
        suffix: ' y revisa el total de páginas.',
      },
    },
    {
      heading: 'Dividir un PDF en varios archivos',
      paragraphs: [
        'Dividir resulta útil cuando un dossier contiene capítulos que deben entregarse por separado. Define rangos sin solapamientos accidentales y nombres que expliquen el contenido. Si el documento tiene 30 páginas, una división 1-10, 11-20 y 21-30 debería cubrirlas todas una sola vez.',
        'No confundas número impreso y número interno del PDF. Una portada sin numerar puede hacer que la página visible “1” sea en realidad la segunda. Usa miniaturas y confirma el contenido de los límites antes de generar fragmentos.',
      ],
      link: {
        prefix: 'Crea varios bloques con ',
        label: 'Dividir PDF',
        href: '/es/herramientas/dividir-pdf/',
        suffix: ' a partir de rangos comprobados.',
      },
    },
    {
      heading: 'Extraer páginas concretas sin enviar el expediente completo',
      paragraphs: [
        'Extraer crea una copia con las páginas indicadas y ayuda a minimizar datos. Para entregar una factura y su justificante no necesitas compartir todo el archivo anual. Escribe rangos como 2-4 y páginas sueltas según admita la herramienta, y confirma la cantidad esperada.',
        'La minimización reduce tamaño y exposición, pero revisa anverso y reverso, anexos vinculados y páginas con notas relevantes. Un fragmento puede perder contexto o dejar una referencia sin documento. Conserva el original completo en su ubicación autorizada.',
      ],
      link: {
        prefix: 'Selecciona únicamente lo necesario con ',
        label: 'Extraer páginas de PDF',
        href: '/es/herramientas/extraer-paginas-pdf/',
        suffix: ' antes de compartir.',
      },
    },
    {
      heading: 'Eliminar páginas en blanco, duplicadas o no autorizadas',
      paragraphs: [
        'Eliminar es apropiado cuando ya sabes qué hojas deben desaparecer. Trabaja sobre una copia y anota números después de revisar miniaturas. Si borras varias páginas, no recalcules manualmente la numeración tras cada acción: define la selección sobre el documento original y comprueba el resultado completo.',
        'Una hoja aparentemente vacía puede contener una firma, una anotación tenue o el reverso de un documento. Amplía antes de decidir. En expedientes regulados no elimines contenido para alterar el registro; crea una versión de entrega y conserva el original íntegro.',
      ],
      link: {
        prefix: 'Genera una copia depurada con ',
        label: 'Eliminar páginas PDF',
        href: '/es/herramientas/eliminar-paginas-pdf/',
        suffix: ' sin sobrescribir el documento fuente.',
      },
    },
    {
      heading: 'Ordenar páginas sin volver a escanear',
      paragraphs: [
        'Si las hojas están completas pero mezcladas, reordena miniaturas en lugar de imprimir y escanear de nuevo. La nueva digitalización aumentaría tamaño, perdería texto seleccionable y añadiría ruido. Comprueba páginas similares mediante encabezados, fechas y continuidades de frases.',
        'Después de ordenar, revisa numeración, índice, referencias internas y doble cara. Cambiar la secuencia visual no actualiza automáticamente un índice escrito ni los enlaces que apuntan a destinos internos. Para documentos complejos puede ser necesario un editor especializado.',
      ],
      link: {
        prefix: 'Arrastra la secuencia correcta con ',
        label: 'Ordenar páginas PDF',
        href: '/es/herramientas/ordenar-paginas-pdf/',
        suffix: ' y valida las transiciones.',
      },
    },
    {
      heading: 'Girar páginas que se leen de lado',
      paragraphs: [
        'Girar cambia la orientación guardada de las páginas seleccionadas. Elige 90, 180 o 270 grados según el caso y evita girar todo el archivo cuando solo fallan dos hojas. Una pantalla puede rotar temporalmente la vista sin guardar el cambio; la herramienta crea una nueva copia con la orientación aplicada.',
        'Abre la descarga en otro visor y revisa impresión. Un escaneo puede contener la imagen torcida dentro de una página correctamente orientada; girar 90 grados no corrige una inclinación de tres grados. Para enderezar fotografías se necesita una operación de imagen previa.',
      ],
      link: {
        prefix: 'Corrige páginas laterales con ',
        label: 'Girar PDF',
        href: '/es/herramientas/rotar-pdf/',
        suffix: ' y prueba la copia fuera del navegador.',
      },
    },
    {
      heading: 'Convertir fotografías en un único PDF',
      paragraphs: [
        'Cuando el origen son fotos de tareas, recibos o documentos, la calidad se decide al capturar: luz uniforme, cámara paralela, enfoque en el texto y fondo recortado. Ordena las imágenes, elige A4, Letter o ajuste a imagen y comprueba que ninguna quede deformada o invertida.',
        'Un PDF de fotografías no se convierte automáticamente en texto buscable. La herramienta empaqueta imágenes y no promete OCR. Para archivo accesible o búsqueda, necesitarás reconocimiento y una revisión posterior. Mantén las fotos originales hasta aprobar todas las páginas.',
      ],
      link: {
        prefix: 'Construye el archivo con ',
        label: 'Convertir imágenes a PDF',
        href: '/es/herramientas/convertir-imagenes-a-pdf/',
        suffix: ' y define papel y orientación.',
      },
    },
    {
      heading: 'Exportar páginas PDF como JPG o PNG',
      paragraphs: [
        'Convertir a imagen sirve para insertar una página en una presentación, crear una miniatura o compartir una vista no editable. Elige JPG para fotografías y PNG para texto, diagramas o transparencia cuando sea compatible. Decide escala y formato según pantalla o impresión.',
        'La conversión elimina la naturaleza de texto seleccionable y puede perder enlaces, etiquetas, formularios y capas. No utilices imágenes como sustituto universal de un PDF accesible. Si solo necesitas una figura, extrae la página necesaria y conserva también el documento original.',
      ],
      link: {
        prefix: 'Exporta páginas concretas con ',
        label: 'PDF a JPG o PNG',
        href: '/es/herramientas/convertir-pdf-a-imagen/',
        suffix: ' y verifica la resolución.',
      },
    },
    {
      heading: 'Comprimir PDF sin promesas imposibles',
      paragraphs: [
        'El tamaño puede venir de fotografías, escaneos, fuentes, objetos duplicados, formularios o vídeo. El compresor de FunnyTools intenta reorganizar la estructura y no vuelve a muestrear imágenes, por lo que un archivo ya optimizado puede quedarse igual o incluso no producir una mejora útil.',
        'Compara bytes antes y después y conserva la salida solo si es menor y mantiene la función. Para un escaneo enorme, vuelve a las imágenes fuente, reduce dimensiones con criterio y reconstruye una copia. Nunca persigas un límite destruyendo cifras o firmas visibles.',
      ],
      link: {
        prefix: 'Comprueba una optimización estructural con ',
        label: 'Comprimir PDF',
        href: '/es/herramientas/comprimir-pdf/',
        suffix: ' sin borrar la versión anterior.',
      },
    },
    {
      heading: 'Privacidad: local no significa riesgo cero',
      paragraphs: [
        'El tratamiento en navegador evita enviar el PDF a FunnyTools, pero el equipo, sus extensiones, el sistema y la red siguen importando. No abras historias clínicas, secretos empresariales o expedientes personales en un dispositivo público. Si una organización prohíbe herramientas web, utiliza su software aprobado.',
        'Revisa que estás en el dominio correcto y con HTTPS. Cierra otros documentos, minimiza las páginas incluidas y borra copias de descargas compartidas cuando corresponda. La herramienta no cifra el resultado ni decide los permisos del canal de entrega.',
      ],
    },
    {
      heading: 'Contraseñas, formularios y firmas digitales',
      paragraphs: [
        'Un PDF protegido puede no abrirse o requerir una clave que la herramienta no gestiona. No intentes eludir restricciones. Los formularios con nombres de campo repetidos pueden comportarse de manera inesperada tras combinar, y los marcadores o adjuntos no están garantizados por una copia de páginas.',
        'Una firma digital valida una versión concreta. Crear otro documento, ordenar o unir cambia el archivo y puede invalidarla. Conserva siempre la versión firmada y consulta al destinatario si debe recibirse por separado o firmarse de nuevo al final del flujo.',
      ],
    },
    {
      heading: 'Archivos grandes y memoria del navegador',
      paragraphs: [
        'El navegador necesita memoria para entradas, representación y descarga. Cientos de páginas escaneadas o imágenes de cámara pueden superar los recursos de un móvil. Cierra pestañas, trabaja por bloques y usa un ordenador cuando el lote sea importante. Un fallo no debería alterar originales, pero sí interrumpe la salida.',
        'No confíes en una única pestaña como almacenamiento. Descarga cada etapa aprobada y usa nombres de versión. Para archivos críticos o muy grandes, un programa de escritorio con registro y soporte del formato puede ser más adecuado.',
      ],
    },
    {
      heading: 'Control de calidad de cualquier PDF nuevo',
      paragraphs: [
        'Abre la descarga desde el disco, cuenta páginas y revisa primera, última y todas las transiciones modificadas. Busca hojas en blanco, duplicados, recortes, giros y texto ilegible. Comprueba tamaño, nombre y, si importan, enlaces, formularios, marcadores, etiquetas y firmas.',
        'Prueba el portal o visor de destino antes del plazo. Un PDF que abre en tu navegador puede fallar en un sistema institucional por tamaño, versión o restricciones. Conserva originales y una copia final claramente identificada hasta confirmar recepción.',
      ],
    },
    {
      heading: 'Flujo recomendado para preparar una entrega',
      paragraphs: [
        'Define páginas necesarias y límite; crea copias de trabajo; extrae o elimina; corrige orientación; ordena; une; y comprime únicamente si hace falta. Valida después de cada cambio importante para saber dónde apareció un error.',
        'Nombra la salida con asunto, fecha y versión sin exponer datos innecesarios. Envía por el canal autorizado y revisa permisos si compartes enlace. Una operación técnica está terminada cuando el destinatario recibe el contenido correcto, legible y completo.',
      ],
    },
  ],
  faq: [
    { q: '¿Qué herramientas PDF ofrece FunnyTools?', a: 'Unir, dividir, extraer, eliminar, ordenar y girar páginas; crear PDF desde imágenes, exportar páginas a imagen e intentar comprimir estructura.' },
    { q: '¿Los PDF se suben a un servidor?', a: 'Las herramientas españolas procesan los archivos en el navegador y generan copias locales; FunnyTools no recibe los documentos.' },
    { q: '¿Cómo saco solo algunas páginas?', a: 'Usa Extraer para crear una copia con rangos concretos, o Dividir si necesitas varios archivos separados.' },
    { q: '¿Puedo conservar una firma digital al unir?', a: 'No debe asumirse. Crear un archivo nuevo puede invalidarla; conserva el original firmado y sigue el procedimiento del destinatario.' },
    { q: '¿Comprimir PDF siempre reduce el tamaño?', a: 'No. Depende de la estructura y del contenido; FunnyTools no remuestrea imágenes y puede no lograr una salida menor.' },
    { q: '¿Convertir PDF a imagen mantiene el texto?', a: 'Mantiene su apariencia visual, pero pierde texto seleccionable, enlaces, formularios y otras funciones de documento.' },
    { q: '¿Por qué falla un PDF grande en el móvil?', a: 'La operación puede superar la memoria disponible. Divide el lote, cierra pestañas o utiliza un ordenador y software adecuado.' },
    { q: '¿Cuál es la comprobación mínima antes de enviar?', a: 'Abrir la descarga, contar páginas, revisar cambios, legibilidad, nombre y tamaño y probar el canal de destino.' },
  ],
  review: {
    heading: 'Revisión de la colección PDF',
    intro: 'Cada herramienta resuelve una transformación concreta y debe terminar con una copia comprobada.',
    checks: [
      { title: 'Elección', text: 'La operación coincide con el resultado: unir, separar, reorganizar, convertir o reducir.' },
      { title: 'Integridad', text: 'Páginas, orden, orientación, legibilidad y funciones relevantes se verifican en la descarga.' },
      { title: 'Privacidad', text: 'Se minimizan documentos y se utiliza un dispositivo y canal autorizados.' },
    ],
  },
  sources: [
    { label: 'MDN: File API', href: 'https://developer.mozilla.org/es/docs/Web/API/File_API', note: 'Selección y acceso a archivos por aplicaciones que se ejecutan en el navegador.' },
    { label: 'PDF Association: recursos técnicos sobre PDF', href: 'https://pdfa.org/resource/', note: 'Referencias sobre el formato PDF, accesibilidad, firmas y funciones avanzadas.' },
    { label: 'AEPD: protección de datos por defecto', href: 'https://www.aepd.es/guias/guia-privacidad-desde-diseno', note: 'Minimización y decisiones de privacidad al tratar documentación personal.' },
  ],
};

export const spanishImageCategory: SpanishInfoPage = {
  title: 'Herramientas de imagen online para comprimir, convertir y editar',
  seoTitle: 'Herramientas de imagen online gratis | FunnyTools',
  seoDescription: 'Comprime, redimensiona, recorta, gira y convierte JPG, PNG y WebP; crea PDF, Base64, QR y códigos de barras sin instalar aplicaciones.',
  keywords: [
    'herramientas de imagen online',
    'comprimir redimensionar imagen',
    'convertir JPG PNG WebP',
    'recortar girar foto online',
    'editar imágenes gratis navegador',
  ],
  eyebrow: 'Colección de imagen · copias locales · salida verificable',
  intro: 'Reducir una foto, cambiar su formato y recortarla son decisiones distintas. Esta colección organiza las operaciones por objetivo para evitar la cadena típica de exportaciones que termina con texto borroso, transparencia perdida o archivos incluso más grandes. Las herramientas trabajan en el navegador y crean una copia: el original debe conservarse hasta comprobar dimensiones, formato, peso, orientación y detalle.',
  directAnswer: [
    'Para aligerar una imagen, recorta primero, reduce las dimensiones que no necesitas y ajusta calidad al final. Usa JPG para fotografías, PNG para capturas con texto o transparencia y WebP cuando necesites buena compresión y el destino lo admita. No cambies solo la extensión: utiliza un conversor real.',
    'FunnyTools permite comprimir, redimensionar, recortar, girar o voltear; convertir entre PNG, JPG y WebP; pasar una imagen a Base64; crear un PDF desde varias fotos; y generar códigos QR o de barras. Todo ocurre dentro de la pestaña, pero cada salida debe abrirse y revisarse fuera de la herramienta.',
  ],
  sections: [
    {
      heading: 'Elegir por objetivo, no por formato de origen',
      paragraphs: [
        'Pregunta qué debe cambiar: peso, anchura, encuadre, orientación, transparencia, compatibilidad o contenedor. Una imagen puede necesitar varias operaciones, pero no todas. Convertir PNG a JPG reduce bien una fotografía y destruye la transparencia; comprimir sin reducir una captura enorme puede conservar millones de píxeles inútiles.',
        'Planifica una única cadena desde el original: recortar, girar, redimensionar y exportar al formato final. Volver a abrir y guardar copias con pérdida acumula artefactos. Nombra las variantes según uso, por ejemplo “web”, “correo” o “impresión”.',
      ],
    },
    {
      heading: 'Comprimir una fotografía sin perder el detalle necesario',
      paragraphs: [
        'La calidad no se decide por un porcentaje aislado. Una escena con hojas, cabello o ruido necesita más datos que un fondo liso. Reduce primero las dimensiones al tamaño de uso y prueba una calidad moderada. Compara rostros, texto, bordes y gradientes en la descarga.',
        'No persigas el archivo mínimo si ya cumple el límite. Para email o web, una copia más ligera mejora transferencia; para archivo o impresión, conserva el original. La compresión es una negociación entre peso y función, no una limpieza sin consecuencias.',
      ],
      link: {
        prefix: 'Compara entrada y salida con ',
        label: 'Comprimir imágenes',
        href: '/es/herramientas/comprimir-imagenes/',
        suffix: ' sin modificar el original.',
      },
    },
    {
      heading: 'Redimensionar para pantalla, documento o publicación',
      paragraphs: [
        'Redimensionar cambia la cuadrícula de píxeles. Define anchura y altura según el destino y conserva la proporción para evitar caras o círculos deformados. Una foto de 4.000 píxeles puede ser innecesaria en una tarjeta de 800, pero ampliar una imagen pequeña no crea detalle real.',
        'Para impresión necesitas relacionar píxeles y tamaño físico; para pantalla importa la resolución visible y la densidad del dispositivo. Usa la copia de mayor calidad disponible como origen, baja una sola vez y revisa texto fino y líneas.',
      ],
      link: {
        prefix: 'Ajusta dimensiones con ',
        label: 'Redimensionar imagen',
        href: '/es/herramientas/redimensionar-imagen/',
        suffix: ' manteniendo la proporción.',
      },
    },
    {
      heading: 'Recortar para eliminar fondo y centrar información',
      paragraphs: [
        'Recortar reduce el lienzo y puede ahorrar más que bajar calidad. Elimina escritorio, barras de interfaz y zonas vacías, pero deja contexto suficiente. En documentos fotografiados conserva bordes cuando sirven para demostrar que la página está completa.',
        'Define una relación de aspecto solo si el destino la exige. Forzar 1:1, 4:3 o 16:9 puede cortar elementos esenciales. Guarda una copia y comprueba que el encuadre funciona también en miniatura, donde algunas plataformas aplican otro recorte.',
      ],
      link: {
        prefix: 'Selecciona el encuadre con ',
        label: 'Recortar imagen',
        href: '/es/herramientas/recortar-imagen/',
        suffix: ' antes de reducir dimensiones.',
      },
    },
    {
      heading: 'Girar y voltear no significan lo mismo',
      paragraphs: [
        'Girar cambia la orientación en pasos de 90 grados; voltear crea un reflejo horizontal o vertical. Corrige una foto lateral con giro. Usa espejo solo cuando el contenido realmente lo requiere: en texto, matrículas y diagramas puede producir información incorrecta.',
        'Algunas cámaras guardan orientación como metadato y distintos programas la interpretan de manera diferente. Exportar una copia con la orientación aplicada puede mejorar compatibilidad. Abre el archivo final en otro visor para comprobarlo.',
      ],
      link: {
        prefix: 'Corrige orientación con ',
        label: 'Girar o voltear imagen',
        href: '/es/herramientas/rotar-voltear-imagen/',
        suffix: ' y verifica letras y direcciones.',
      },
    },
    {
      heading: 'JPG: la opción habitual para fotografías',
      paragraphs: [
        'JPEG usa compresión con pérdida y es eficiente para fotos y gradientes. No admite transparencia. Convertir una fotografía PNG a JPG puede reducir mucho su peso, pero las zonas transparentes deben rellenarse con un color y las letras pueden mostrar halos si la calidad es baja.',
        'Elige el fondo antes de convertir y revisa los bordes. No utilices JPG como formato intermedio para editar repetidamente. Cada nueva exportación puede degradar; vuelve al original o a una versión sin pérdida.',
      ],
      link: {
        prefix: 'Para fotos o compatibilidad amplia, usa ',
        label: 'PNG a JPG',
        href: '/es/herramientas/convertir-png-a-jpg/',
        suffix: ' con un fondo decidido.',
      },
    },
    {
      heading: 'PNG: texto nítido y transparencia',
      paragraphs: [
        'PNG conserva los píxeles sin pérdida y admite canal alfa. Suele ser adecuado para capturas, logotipos, diagramas y gráficos con bordes duros. Convertir un JPG a PNG no recupera detalle perdido y normalmente aumenta el tamaño; solo cambia el contenedor para una necesidad posterior.',
        'Si necesitas transparencia real, el origen debe tenerla o tendrás que recortar el fondo con una herramienta adecuada. FunnyTools convierte formato, no elimina automáticamente objetos ni reconstruye bordes.',
      ],
      link: {
        prefix: 'Cuando el destino exige PNG, utiliza ',
        label: 'JPG a PNG',
        href: '/es/herramientas/convertir-jpg-a-png/',
        suffix: ' sabiendo que no mejora la calidad original.',
      },
    },
    {
      heading: 'WebP: buen peso para web con compatibilidad actual',
      paragraphs: [
        'WebP admite compresión con y sin pérdida y transparencia. Los navegadores actuales lo soportan ampliamente, por lo que suele ser útil para publicar imágenes ligeras. Sin embargo, una aplicación, imprenta o portal antiguo puede pedir JPG o PNG de manera explícita.',
        'Convierte una copia, comprueba el peso y prueba el destino real. No distribuyas únicamente WebP si el receptor no lo espera. Para un sitio, conserva una alternativa cuando tu público o sistema de gestión la necesite.',
      ],
      link: {
        prefix: 'Prepara una variante web con ',
        label: 'JPG a WebP',
        href: '/es/herramientas/convertir-jpg-a-webp/',
        suffix: ' y valida su compatibilidad.',
      },
    },
    {
      heading: 'Volver de WebP a JPG para un sistema antiguo',
      paragraphs: [
        'Si una plataforma rechaza WebP, convertir a JPG puede resolver compatibilidad para fotografías. La transparencia se sustituirá por un fondo y la salida usa compresión con pérdida. Para gráficos transparentes, PNG puede ser una alternativa más fiel.',
        'No cambies “.webp” por “.jpg” en el nombre: el contenido seguiría siendo WebP. Una conversión real decodifica y vuelve a exportar. Comprueba extensión, tipo, dimensiones y fondo final.',
      ],
      link: {
        prefix: 'Crea una copia compatible con ',
        label: 'WebP a JPG',
        href: '/es/herramientas/convertir-webp-a-jpg/',
        suffix: ' sin alterar el archivo fuente.',
      },
    },
    {
      heading: 'Convertir imágenes en un PDF ordenado',
      paragraphs: [
        'Para tareas, recibos o páginas fotografiadas, ordena las imágenes y elige un tamaño de papel coherente. Recorta y gira antes de crear el PDF. A4 es habitual en España; Letter aparece en materiales de Norteamérica. Una opción ajustada a imagen puede producir páginas de tamaños distintos.',
        'El PDF resultante contiene imágenes y no incorpora OCR por defecto. Revisa página por página, legibilidad y peso. Para archivos accesibles o buscables necesitarás un flujo adicional y control humano.',
      ],
      link: {
        prefix: 'Agrupa fotos con ',
        label: 'Convertir imágenes a PDF',
        href: '/es/herramientas/convertir-imagenes-a-pdf/',
        suffix: ' después de preparar cada página.',
      },
    },
    {
      heading: 'Base64: para código y transporte, no para aligerar',
      paragraphs: [
        'Base64 representa bytes como texto y suele aumentar el tamaño aproximadamente un tercio. Es útil para incrustar recursos pequeños en ciertos formatos, depurar una API o mover datos por un canal textual; no es una compresión ni una protección.',
        'Una cadena Base64 puede contener toda la imagen y ser muy larga. No la publiques si la imagen es sensible y no la pegues en herramientas desconocidas. Para una web, evalúa caché, mantenimiento y rendimiento antes de incrustar archivos grandes.',
      ],
      link: {
        prefix: 'Codifica o recupera una copia con ',
        label: 'Imagen a Base64',
        href: '/es/herramientas/convertir-imagen-base64/',
        suffix: ' solo cuando el flujo técnico lo requiera.',
      },
    },
    {
      heading: 'Crear QR y códigos de barras como gráficos funcionales',
      paragraphs: [
        'Un QR no es decoración: debe llevar a un destino correcto, visible y mantenido. Usa HTTPS, texto alternativo cercano y una URL escrita como respaldo. Respeta contraste y margen y prueba el archivo impreso con varios dispositivos.',
        'Los códigos de barras lineales dependen del estándar y de los datos admitidos. Generar una imagen no asigna un identificador comercial ni garantiza aceptación en caja. Para productos y logística, sigue las reglas de la organización correspondiente.',
      ],
      link: {
        prefix: 'Para enlaces y actividades, crea y prueba un ',
        label: 'Código QR',
        href: '/es/herramientas/generador-codigo-qr/',
        suffix: ' antes de publicarlo.',
      },
    },
    {
      heading: 'Privacidad, metadatos y contenido visible',
      paragraphs: [
        'El procesamiento local evita subir imágenes a FunnyTools, pero no elimina automáticamente ubicación, fecha o modelo de cámara. Una exportación puede cambiar metadatos, aunque no debe usarse como garantía forense. Revisa propiedades si la privacidad es importante.',
        'Observa también lo que aparece en los píxeles: reflejos, notificaciones, caras, direcciones y documentos del fondo. Comprimir o recortar no anonimiza todo. Usa un dispositivo autorizado y comparte por un canal con permisos adecuados.',
      ],
    },
    {
      heading: 'Accesibilidad y calidad de una imagen publicada',
      paragraphs: [
        'Añade texto alternativo que explique la función o la información, no una lista automática de objetos. Si una gráfica contiene cifras esenciales, proporciona los datos en texto o tabla. No uses una imagen de texto como sustituto del contenido estructurado.',
        'Comprueba contraste, tamaño y zoom. Un archivo ligero que vuelve ilegibles etiquetas no es una optimización. En códigos funcionales ofrece también un enlace visible para quien no pueda escanear.',
      ],
    },
    {
      heading: 'Lista de comprobación de una copia final',
      paragraphs: [
        'Confirma finalidad, dimensiones, relación de aspecto, formato, transparencia, peso y compatibilidad. Abre la descarga, revisa al 100 % y observa detalles difíciles. Comprueba nombre, extensión y que la imagen no se haya volteado o recortado mal.',
        'Conserva el original, envía únicamente la variante necesaria y documenta el uso cuando existan varias. Para publicación, prueba la página y el dispositivo real. La mejor imagen no es la de mayor resolución, sino la que conserva información con un coste adecuado.',
      ],
    },
  ],
  faq: [
    { q: '¿Qué herramienta uso para reducir el peso de una foto?', a: 'Recorta, redimensiona a los píxeles necesarios y después usa el compresor sobre una copia. Comprueba detalle y peso final.' },
    { q: '¿Qué diferencia hay entre redimensionar y comprimir?', a: 'Redimensionar cambia el número de píxeles; comprimir cambia cómo se representan. Normalmente conviene reducir dimensiones primero.' },
    { q: '¿JPG, PNG o WebP?', a: 'JPG para fotografías; PNG para texto, gráficos o transparencia; WebP para una variante web eficiente cuando el destino lo admita.' },
    { q: '¿Convertir JPG a PNG mejora la calidad?', a: 'No. No recupera detalle perdido y puede aumentar el tamaño; solo cambia el formato.' },
    { q: '¿FunnyTools sube mis imágenes?', a: 'Las herramientas españolas procesan las imágenes dentro del navegador y generan descargas locales.' },
    { q: '¿Base64 comprime una imagen?', a: 'No. Es una representación textual y normalmente aumenta el tamaño aproximado un tercio.' },
    { q: '¿Un PDF creado desde fotos tiene OCR?', a: 'No por defecto. Contiene las imágenes; para texto buscable se necesita reconocimiento y revisión adicional.' },
    { q: '¿Comprimir elimina los metadatos de ubicación?', a: 'No debe asumirse. Revisa propiedades y contenido visible; la compresión no es una herramienta completa de anonimización.' },
  ],
  review: {
    heading: 'Revisión de la colección de imagen',
    intro: 'Una transformación útil conserva la función, no solo reduce una cifra.',
    checks: [
      { title: 'Formato', text: 'JPG, PNG o WebP responde al contenido, transparencia y compatibilidad del destino.' },
      { title: 'Calidad', text: 'Dimensiones, encuadre, orientación y detalle se revisaron en la descarga.' },
      { title: 'Privacidad', text: 'Metadatos, fondo visible, dispositivo y canal de entrega se evaluaron por separado.' },
    ],
  },
  sources: [
    { label: 'MDN: guía de formatos de imagen', href: 'https://developer.mozilla.org/es/docs/Web/Media/Guides/Formats/Image_types', note: 'Características y usos de JPEG, PNG, WebP y otros formatos.' },
    { label: 'MDN: HTMLCanvasElement.toBlob()', href: 'https://developer.mozilla.org/es/docs/Web/API/HTMLCanvasElement/toBlob', note: 'Exportación de una imagen desde el navegador con tipo y calidad.' },
    { label: 'W3C WAI: tutorial de imágenes', href: 'https://www.w3.org/WAI/tutorials/images/', note: 'Texto alternativo y tratamiento accesible de imágenes informativas y funcionales.' },
  ],
};

export const spanishTextCategory: SpanishInfoPage = {
  title: 'Herramientas de texto online para contar, limpiar y convertir',
  seoTitle: 'Herramientas de texto online gratis | FunnyTools',
  seoDescription: 'Cuenta palabras y caracteres, cambia mayúsculas, elimina duplicados o líneas vacías, ordena listas y trabaja con JSON, CSV, Markdown, Base64 y URL.',
  keywords: [
    'herramientas de texto online',
    'contador palabras caracteres',
    'eliminar líneas duplicadas',
    'ordenar limpiar texto',
    'formatear JSON convertir CSV',
  ],
  eyebrow: 'Colección de texto · limpieza reproducible · datos locales',
  intro: 'Una lista copiada desde una hoja de cálculo, un ensayo con límite y un bloque JSON roto parecen tareas diferentes, pero comparten el mismo riesgo: modificar el original sin saber qué cambió. Esta colección reúne contadores, limpiadores y conversores que funcionan en el navegador. El método seguro es conservar la entrada, aplicar una transformación cada vez y comparar cantidad, orden, codificación y significado antes de reutilizar la salida.',
  directAnswer: [
    'Usa el contador de palabras para ensayos y lectura; el de caracteres para formularios; el conversor de mayúsculas para normalizar capitalización; los eliminadores para líneas vacías o repetidas; Ordenar líneas para listas; el formateador para validar JSON; CSV a JSON o JSON a CSV para estructuras tabulares; Markdown para previsualizar; y Base64 o URL Encoder solo cuando un flujo técnico lo requiera.',
    'Las herramientas procesan el texto dentro de la pestaña y no exigen registro. No pegues contraseñas, claves privadas, datos personales completos o la única copia de un documento. Antes de copiar el resultado, revisa delimitadores, caracteres con tilde, comillas, ceros iniciales, saltos y orden.',
  ],
  sections: [
    {
      heading: 'Elegir entre medir, limpiar, ordenar y convertir',
      paragraphs: [
        'Medir no altera: cuenta palabras, caracteres, frases o líneas. Limpiar elimina elementos según una regla. Ordenar cambia la secuencia. Convertir representa los mismos datos en otra sintaxis. Definir la clase evita usar una herramienta destructiva cuando solo querías inspeccionar.',
        'Escribe un criterio comprobable: “quitar líneas exactamente repetidas conservando la primera”, “ordenar alfabéticamente sin perder encabezado” o “convertir una tabla con coma y comillas”. Guarda una copia de entrada y registra la cantidad antes y después.',
      ],
    },
    {
      heading: 'Contar palabras para ensayos y documentos',
      paragraphs: [
        'El contador permite seguir palabras, caracteres, frases, párrafos, líneas y tiempo estimado de lectura. Úsalo durante el borrador, no solo al final. Los guiones, apóstrofos, URLs y símbolos pueden tratarse de forma distinta en otra plataforma.',
        'Para un examen o solicitud, la cifra del formulario oficial manda. Deja margen y pega el texto con antelación. No recortes citas obligatorias ni contenido esencial solo para alcanzar un número exacto.',
      ],
      link: {
        prefix: 'Mide el borrador con el ',
        label: 'Contador de palabras',
        href: '/es/herramientas/contador-palabras/',
        suffix: ' y contrasta con el sistema final.',
      },
    },
    {
      heading: 'Contar caracteres con y sin espacios',
      paragraphs: [
        'Perfiles, anuncios y respuestas breves suelen limitar caracteres. Comprueba si el máximo incluye espacios y saltos. Un emoji o carácter combinado puede no equivaler a una unidad visual en todos los sistemas, por lo que dos contadores pueden diferir.',
        'El contador de FunnyTools ayuda a preparar, pero la caja de destino decide. Revisa que pegar no haya convertido comillas, guiones o saltos y que el final no se haya truncado.',
      ],
      link: {
        prefix: 'Compara longitudes con el ',
        label: 'Contador de caracteres',
        href: '/es/herramientas/contador-caracteres/',
        suffix: ' antes de enviar.',
      },
    },
    {
      heading: 'Cambiar mayúsculas y minúsculas con criterio',
      paragraphs: [
        'Convertir todo a mayúsculas, minúsculas o tipo título acelera una limpieza mecánica, pero no entiende nombres propios, siglas, marcas o reglas editoriales completas. “iPhone”, “ONU” y apellidos compuestos necesitan revisión humana.',
        'Aplica el cambio a una copia y relee. Para datos, una normalización puede ayudar a comparar, aunque no siempre deben alterarse los valores que se entregarán. Distingue clave técnica, etiqueta visible y contenido original.',
      ],
      link: {
        prefix: 'Prueba variantes con ',
        label: 'Convertir mayúsculas y minúsculas',
        href: '/es/herramientas/convertir-mayusculas-minusculas/',
        suffix: ' y revisa nombres y siglas.',
      },
    },
    {
      heading: 'Eliminar líneas vacías sin unir párrafos por accidente',
      paragraphs: [
        'En una lista técnica, las líneas vacías pueden ser ruido. En prosa o Markdown, separan párrafos y bloques. Decide si quieres retirar todas o solo repeticiones excesivas. Copia la salida en un entorno de prueba antes de reemplazar el documento.',
        'Compara número de líneas y una muestra del principio, centro y final. Una línea con espacios puede parecer vacía y una con carácter invisible no serlo. El resultado depende de la definición aplicada por la herramienta.',
      ],
      link: {
        prefix: 'Limpia listas con ',
        label: 'Eliminar líneas vacías',
        href: '/es/herramientas/eliminar-lineas-vacias/',
        suffix: ' sin perder la estructura que necesitas.',
      },
    },
    {
      heading: 'Eliminar duplicados y decidir qué significa igual',
      paragraphs: [
        '“Madrid”, “madrid” y “Madrid ” pueden considerarse iguales o distintos según mayúsculas y espacios. Una lista de emails quizá deba normalizar, mientras códigos sensibles distinguen cada carácter. Establece la regla antes de borrar.',
        'Conserva la primera aparición cuando el orden tiene significado y revisa cuántas líneas desaparecieron. No uses deduplicación como sustituto de resolver registros de personas: dos nombres iguales no prueban que sea la misma identidad.',
      ],
      link: {
        prefix: 'Depura una copia con ',
        label: 'Eliminar líneas duplicadas',
        href: '/es/herramientas/eliminar-lineas-duplicadas/',
        suffix: ' y verifica la diferencia de cantidades.',
      },
    },
    {
      heading: 'Ordenar líneas alfabética o numéricamente',
      paragraphs: [
        'Ordenar puede facilitar búsqueda y comparación, pero destruye una secuencia original. Separa encabezados, decide ascendente o descendente y comprueba si “2, 10, 100” se interpreta como número o texto. Las tildes y configuración regional también influyen.',
        'Para listas vinculadas por columnas, no ordenes una sola columna copiada: romperías la relación entre nombre y valor. Mantén la fila completa o usa una herramienta tabular. Guarda el orden original si representa prioridad, fecha o proceso.',
      ],
      link: {
        prefix: 'Reorganiza listas simples con ',
        label: 'Ordenar líneas',
        href: '/es/herramientas/ordenar-lineas-texto/',
        suffix: ' después de aislar encabezados.',
      },
    },
    {
      heading: 'Validar y formatear JSON',
      paragraphs: [
        'JSON válido requiere comillas dobles en claves y cadenas, comas bien colocadas y sin comentarios estándar. Formatear añade sangría para lectura; minificar elimina espacios; validar detecta errores de sintaxis. Ninguna operación garantiza que las claves o valores sean correctos para una API.',
        'No pegues tokens ni secretos. Tras formatear, compara tipos: “10” es texto y 10 es número; null no es una cadena vacía. Para una integración, valida además contra el esquema o documentación del receptor.',
      ],
      link: {
        prefix: 'Revisa sintaxis con ',
        label: 'Formatear y validar JSON',
        href: '/es/herramientas/formatear-validar-json/',
        suffix: ' antes de usar los datos.',
      },
    },
    {
      heading: 'Convertir CSV a JSON sin desplazar columnas',
      paragraphs: [
        'CSV no significa únicamente separar por comas. Puede usar punto y coma, comillas, saltos dentro de una celda y distintas codificaciones. Identifica encabezados y delimitador. Una coma decimal en datos españoles requiere especial atención si la coma también separa campos.',
        'Revisa filas irregulares, columnas vacías y valores que deben conservar ceros iniciales, como códigos postales. La conversión produce una estructura; no decide automáticamente tipos ni corrige datos ambiguos.',
      ],
      link: {
        prefix: 'Transforma tablas con ',
        label: 'CSV a JSON',
        href: '/es/herramientas/convertir-csv-a-json/',
        suffix: ' después de comprobar delimitador y encabezados.',
      },
    },
    {
      heading: 'Convertir JSON a CSV cuando los datos son tabulares',
      paragraphs: [
        'CSV representa bien una lista plana de objetos con las mismas columnas. Objetos anidados y arrays necesitan aplanado o una decisión de diseño. No existe una forma única de colocar una dirección completa o varias etiquetas dentro de una celda.',
        'Abre la salida en el programa de destino y revisa tildes, separadores, saltos y fórmulas. Valores que empiezan por =, +, - o @ pueden interpretarse como fórmulas en hojas de cálculo; un flujo seguro debe neutralizarlos cuando proceden de usuarios no confiables.',
      ],
      link: {
        prefix: 'Exporta estructuras planas con ',
        label: 'JSON a CSV',
        href: '/es/herramientas/convertir-json-a-csv/',
        suffix: ' y prueba la hoja resultante.',
      },
    },
    {
      heading: 'Previsualizar Markdown sin ejecutar HTML peligroso',
      paragraphs: [
        'Markdown permite títulos, listas, enlaces y código con texto legible. La previsualización ayuda a detectar jerarquía y enlaces rotos. FunnyTools sanea el HTML generado, pero no conviertas la vista previa en autorización para copiar código desconocido a un sistema con otras reglas.',
        'Comprueba sintaxis admitida por GitHub, un gestor de contenidos o una documentación concreta; existen variantes. Mantén el archivo fuente y revisa enlaces, texto alternativo y niveles de encabezado antes de publicar.',
      ],
      link: {
        prefix: 'Escribe y revisa con el ',
        label: 'Editor Markdown',
        href: '/es/herramientas/editor-markdown-online/',
        suffix: ' usando datos no sensibles.',
      },
    },
    {
      heading: 'Base64 codifica, pero no cifra',
      paragraphs: [
        'Base64 convierte bytes o texto a un alfabeto transportable. Cualquiera puede decodificarlo; no protege contraseñas ni información privada. Además, aumenta el tamaño. Úsalo cuando una API, una URL de datos o un formato técnico lo exija.',
        'Al decodificar, confirma codificación de caracteres y tipo de contenido. No ejecutes el resultado de una fuente desconocida. Un bloque Base64 puede representar texto, imagen o binario y su apariencia no demuestra seguridad.',
      ],
      link: {
        prefix: 'Para flujos técnicos, usa ',
        label: 'Base64 codificar y decodificar',
        href: '/es/herramientas/codificar-decodificar-base64/',
        suffix: ' sin confundirlo con cifrado.',
      },
    },
    {
      heading: 'Codificar componentes de una URL',
      paragraphs: [
        'Espacios, tildes, &, = y # tienen funciones especiales en una URL. Codifica únicamente el componente necesario, como un valor de consulta, no toda la dirección de forma indiscriminada. Codificar dos veces convierte % en %25 y puede romper el destino.',
        'Decodificar facilita inspección, pero no valida que una URL sea segura. Comprueba dominio, protocolo y parámetros antes de abrir. No incluyas secretos en una URL: pueden quedar en historial, registros y cabeceras.',
      ],
      link: {
        prefix: 'Prepara parámetros con ',
        label: 'Codificar o decodificar URL',
        href: '/es/herramientas/codificar-decodificar-url/',
        suffix: ' y revisa el resultado completo.',
      },
    },
    {
      heading: 'Privacidad al trabajar con texto y datos',
      paragraphs: [
        'El tratamiento local reduce transferencias a FunnyTools, pero el portapapeles, las extensiones y el dispositivo siguen importando. Sustituye datos reales por muestras cuando depuras. Nunca pegues claves API, contraseñas, historiales médicos o listados personales completos.',
        'Borra el campo y el portapapeles cuando trabajes en un equipo compartido. Si una organización establece un entorno aprobado, respétalo. La ausencia de cuenta no convierte cualquier dato en adecuado para una página web.',
      ],
    },
    {
      heading: 'Control de calidad de una transformación de texto',
      paragraphs: [
        'Guarda entrada y salida. Compara cantidad de líneas, encabezados, primer y último registro, caracteres especiales y orden. Para conversión tabular, prueba varias filas con comas, comillas, vacíos y tildes. Para limpieza, registra cuántos elementos se retiraron.',
        'Copia el resultado solo después de validarlo en el sistema receptor. Una cadena correcta en pantalla puede cambiar al pegar por codificación o formato. Si el proceso se repetirá, documenta reglas y ejemplos para que otra persona pueda reproducirlo.',
      ],
    },
    {
      heading: 'Lista de comprobación de herramientas de texto',
      paragraphs: [
        'Define unidad o transformación, conserva original y elimina datos sensibles. Aplica un paso cada vez. Revisa reglas de igualdad, mayúsculas, delimitadores, tipos y codificación antes de aceptar.',
        'Contrasta contadores con el sistema final, valida JSON más allá de la sintaxis y prueba CSV en su destino. No confundas Base64 con seguridad ni una vista previa con publicación. La salida debe preservar significado, no solo parecer ordenada.',
      ],
    },
  ],
  faq: [
    { q: '¿Qué herramientas de texto incluye FunnyTools?', a: 'Contadores, cambio de mayúsculas, eliminación de líneas vacías o duplicadas, ordenación, JSON, CSV, Markdown, Base64 y codificación URL.' },
    { q: '¿El texto se envía a FunnyTools?', a: 'Las herramientas españolas procesan la entrada dentro del navegador y no requieren una cuenta.' },
    { q: '¿Por qué dos contadores dan cifras distintas?', a: 'Pueden tratar guiones, apóstrofos, símbolos, espacios o Unicode de manera diferente. En una entrega, manda el contador oficial.' },
    { q: '¿Eliminar duplicados distingue mayúsculas?', a: 'Depende de la regla de la herramienta. Revisa si espacios y capitalización deben considerarse iguales antes de borrar.' },
    { q: '¿JSON válido significa datos correctos?', a: 'No. Solo confirma sintaxis; todavía debes verificar esquema, tipos, claves y significado.' },
    { q: '¿Todo JSON puede convertirse bien a CSV?', a: 'No. CSV representa datos planos; objetos anidados y listas necesitan una decisión de aplanado.' },
    { q: '¿Base64 protege información?', a: 'No. Codifica y cualquiera puede revertirlo; no es cifrado y suele aumentar el tamaño.' },
    { q: '¿Qué debo revisar antes de copiar la salida?', a: 'Cantidad, orden, encabezados, caracteres especiales, delimitadores, tipos y una prueba en el sistema receptor.' },
  ],
  review: {
    heading: 'Revisión de la colección de texto',
    intro: 'Una limpieza correcta se puede explicar, medir y revertir a partir del original.',
    checks: [
      { title: 'Regla', text: 'Está definido qué se cuenta, elimina, ordena o convierte y cómo se tratan casos ambiguos.' },
      { title: 'Integridad', text: 'Cantidad, orden, caracteres, encabezados y tipos se compararon entre entrada y salida.' },
      { title: 'Seguridad', text: 'No se pegaron secretos ni datos personales innecesarios y el destino fue probado.' },
    ],
  },
  sources: [
    { label: 'MDN: JSON', href: 'https://developer.mozilla.org/es/docs/Learn_web_development/Core/Scripting/JSON', note: 'Estructura, tipos y análisis de datos JSON.' },
    { label: 'RFC 4180: formato CSV', href: 'https://www.rfc-editor.org/rfc/rfc4180', note: 'Convenciones de campos, comillas, comas y saltos en archivos CSV.' },
    { label: 'RFC 4648: Base64', href: 'https://www.rfc-editor.org/rfc/rfc4648', note: 'Definición de codificaciones Base16, Base32 y Base64.' },
    { label: 'MDN: encodeURIComponent()', href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent', note: 'Codificación de componentes de URI y caracteres reservados.' },
  ],
};
