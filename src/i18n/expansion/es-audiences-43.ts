import type { SpanishInfoPage } from './es-pages';

const officeSources = [
  {
    label: 'AEPD: protección de datos por defecto',
    href: 'https://www.aepd.es/guias/guia-privacidad-desde-diseno',
    note: 'Criterios para limitar datos, accesos, conservación y exposición desde el diseño de una tarea.',
  },
  {
    label: 'OWASP: protección de información sensible',
    href: 'https://cheatsheetseries.owasp.org/cheatsheets/User_Privacy_Protection_Cheat_Sheet.html',
    note: 'Controles prácticos para reducir la exposición de datos personales y credenciales.',
  },
  {
    label: 'W3C WAI: documentos y contenido accesible',
    href: 'https://www.w3.org/WAI/tips/writing/',
    note: 'Recomendaciones de estructura, lenguaje, enlaces e información comprensible.',
  },
];

const visualSources = [
  {
    label: 'W3C WAI: imágenes accesibles',
    href: 'https://www.w3.org/WAI/tutorials/images/',
    note: 'Cómo decidir si una imagen necesita texto alternativo y qué información debe comunicar.',
  },
  {
    label: 'MDN: formatos de imagen para la web',
    href: 'https://developer.mozilla.org/es/docs/Web/Media/Guides/Formats/Image_types',
    note: 'Características, compatibilidad y usos habituales de PNG, JPEG, WebP y otros formatos.',
  },
  {
    label: 'W3C WAI: contraste de color',
    href: 'https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html',
    note: 'Criterios de contraste mínimo y límites de una comprobación basada solo en color.',
  },
];

export const spanishOfficeAudience: SpanishInfoPage = {
  title: 'Herramientas de oficina para PDF, fechas y datos',
  seoTitle: 'Herramientas de oficina: PDF, fechas y datos | FunnyTools',
  seoDescription: 'Herramientas de oficina online para PDF, imágenes, días laborables, QR, sueldo y JSON, con un flujo de revisión antes de enviar.',
  keywords: ['herramientas de oficina online', 'unir PDF oficina', 'calcular días laborables', 'comprimir documentos', 'formatear JSON online'],
  eyebrow: 'Resolver la tarea pequeña sin perder el control del documento',
  intro: 'Esta ruta reúne operaciones que suelen interrumpir una jornada: ordenar un PDF, reducir el peso de una imagen, calcular una fecha, preparar un código QR, estimar una nómina o revisar una exportación JSON. Las herramientas agilizan el borrador; la fuente oficial, la seguridad de la empresa y la comprobación final siguen siendo obligatorias.',
  directAnswer: [
    'Estas herramientas de oficina online sirven para preparar y comprobar una salida, no para sustituir el sistema autorizado de la empresa. Conserva el original, crea una copia con nombre claro y realiza una sola operación cada vez. Abre el resultado antes de enviarlo y comprueba páginas, firmas, tablas, enlaces y tamaño. Si contiene información confidencial, aplica primero la política de tu organización y utiliza datos anonimizados cuando solo necesites probar el proceso.',
    'Para fechas, sueldo u horas extra, anota país, convenio, calendario, porcentajes y redondeo. Una calculadora permite detectar errores o preparar una conversación, pero no convierte la estimación en una nómina, plazo legal o registro oficial. Para JSON y CSV, comprobar la sintaxis no demuestra que los campos, unidades o valores sean correctos.',
  ],
  sections: [
    {
      heading: 'Elegir la herramienta según la salida que debes entregar',
      paragraphs: [
        'Empieza por definir la salida: un único PDF, páginas separadas, una imagen más ligera, una fecha estimada, un QR para un formulario o un archivo de datos legible. Esta decisión evita encadenar conversiones que degradan el material y hace más fácil explicar qué cambió.',
        'Pon una copia en una carpeta de trabajo y añade al nombre una versión o fecha. No sobrescribas contratos, comprobantes, facturas, formularios firmados ni archivos recibidos de otra persona. Si varias personas participan, acuerda cuál es la copia maestra antes de modificar nada.',
      ],
      links: [
        { label: 'Todas las herramientas online', href: '/es/herramientas/', description: 'Busca por tarea, formato o resultado esperado.' },
        { label: 'Cómo funcionan las herramientas', href: '/es/como-funcionan-las-herramientas/', description: 'Procesamiento en el navegador, límites y pruebas.' },
      ],
    },
    {
      heading: 'Preparar un PDF que otra persona pueda abrir y revisar',
      paragraphs: [
        'Ordena los archivos por número, comprueba orientación y decide si portada, anexos o justificantes deben permanecer juntos. Une o divide copias y abre el resultado en un lector distinto. Revisa la primera página, varias páginas centrales y el final; no confíes únicamente en el mensaje de descarga.',
        'La compresión se hace al final. Compara tamaño y legibilidad, en especial sellos, firmas, códigos, tablas y texto escaneado. Si el resultado pierde información, vuelve a la versión anterior. Un PDF más pequeño no es mejor si impide leer o verificar el contenido.',
      ],
      links: [
        { label: 'Unir PDF', href: '/es/herramientas/unir-pdf/', description: 'Combina copias en el orden que indiques.' },
        { label: 'Dividir PDF', href: '/es/herramientas/dividir-pdf/', description: 'Separa intervalos o páginas para otra entrega.' },
        { label: 'Comprimir PDF', href: '/es/herramientas/comprimir-pdf/', description: 'Reduce estructura cuando es posible y exige revisión visual.' },
      ],
    },
    {
      heading: 'Reducir imágenes y capturas sin perder información',
      paragraphs: [
        'Una captura de pantalla con texto necesita un control distinto de una fotografía. Conserva el original, ajusta primero las dimensiones necesarias y comprime después. Amplía la copia para comprobar cifras, nombres de campos, líneas de gráficos y cualquier detalle que pueda cambiar una decisión.',
        'Para correos o formularios, confirma el límite real antes de reducir. En ocasiones basta con convertir el formato o recortar zonas vacías. No incluyas en la captura pestañas, notificaciones, direcciones, identificadores ni datos de otras personas que no formen parte de la consulta.',
      ],
      links: [
        { label: 'Comprimir imágenes', href: '/es/herramientas/comprimir-imagenes/', description: 'Compara peso y aspecto de la copia.' },
        { label: 'Redimensionar imagen', href: '/es/herramientas/redimensionar-imagen/', description: 'Ajusta píxeles manteniendo la proporción.' },
        { label: 'Recortar imagen', href: '/es/herramientas/recortar-imagen/', description: 'Elimina zonas que no deben aparecer.' },
      ],
    },
    {
      heading: 'Calcular fechas y días laborables con supuestos visibles',
      paragraphs: [
        'Anota fecha inicial, fecha final, si ambas cuentan, días no laborables y calendario aplicable. Los festivos cambian según país, región, empresa y año. Una estimación de días hábiles no debe presentarse como vencimiento contractual sin revisar la norma o comunicación que lo fija.',
        'Prueba un intervalo corto que puedas contar manualmente. Después realiza el cálculo principal y guarda los supuestos junto al resultado. Si la fecha afecta a una presentación, pago, recurso o derecho, contrástala con la persona o sistema responsable y deja margen operativo.',
      ],
      links: [
        { label: 'Calculadora de días laborables', href: '/es/herramientas/calculadora-dias-laborables/', description: 'Excluye fines de semana y fechas indicadas.' },
        { label: 'Diferencia entre fechas', href: '/es/herramientas/calcular-diferencia-entre-fechas/', description: 'Compara días naturales y criterios de inclusión.' },
      ],
    },
    {
      heading: 'Crear un código QR para avisos, formularios o eventos',
      paragraphs: [
        'Abre primero la URL final en una ventana privada y confirma permisos. Genera el código QR, escanéalo con otro dispositivo y coloca al lado una dirección legible o una instrucción alternativa. No codifiques contraseñas, respuestas, tokens ni enlaces que concedan acceso privado.',
        'Prueba el tamaño y la distancia reales de impresión o proyección. Deja margen blanco y evita fondos con poco contraste. Si el destino cambia, genera una nueva versión y retira las copias antiguas para no enviar a las personas a una página equivocada.',
      ],
      links: [
        { label: 'Generador de código QR', href: '/es/herramientas/generador-codigo-qr/', description: 'Crea una imagen a partir de texto o URL revisados.' },
      ],
    },
    {
      heading: 'Estimar sueldo y horas extra sin confundirlo con la nómina',
      paragraphs: [
        'Introduce importes y porcentajes desde una fuente vigente y separa bruto, descuentos y neto. Para horas extra, confirma base, multiplicador, periodo y reglas de redondeo. El resultado sirve para una comprobación preliminar, no para interpretar por sí solo legislación, convenio o contrato.',
        'Guarda una captura de las entradas y compara con la nómina o cálculo de recursos humanos. Si hay diferencia, revisa primero unidades, periodo, topes, conceptos no incluidos y si el porcentaje se aplicó sobre la base correcta. No envíes por soporte documentos con números fiscales, bancarios o de seguridad social.',
      ],
      links: [
        { label: 'Calculadora de sueldo neto', href: '/es/herramientas/calculadora-sueldo-neto/', description: 'Estimación con porcentajes editables y desglose.' },
        { label: 'Calculadora de horas extra', href: '/es/herramientas/calculadora-horas-extra/', description: 'Compara base, horas y multiplicador declarados.' },
      ],
    },
    {
      heading: 'Revisar JSON y CSV con datos ficticios o anonimizados',
      paragraphs: [
        'Elimina nombres, correos, identificadores, claves, tokens y valores comerciales antes de pegar un ejemplo. Formatear JSON ayuda a localizar llaves, comas y niveles; convertir CSV ayuda a inspeccionar cabeceras y filas. Ninguna operación confirma el significado del dato ni ejecuta las reglas de otro sistema.',
        'Después de convertir, compara el número de filas, nombres de campos, vacíos, acentos, decimales y fechas. Abre una muestra en el programa de destino. Vigila fórmulas de hoja de cálculo y cambios automáticos de tipo, especialmente códigos que empiezan por cero.',
      ],
      links: [
        { label: 'Formatear y validar JSON', href: '/es/herramientas/formatear-validar-json/', description: 'Hace visible la estructura y los errores de sintaxis.' },
        { label: 'CSV a JSON', href: '/es/herramientas/convertir-csv-a-json/', description: 'Revisa delimitador, cabecera, vacíos y tipos.' },
        { label: 'JSON a CSV', href: '/es/herramientas/convertir-json-a-csv/', description: 'Aplana registros y permite comprobar columnas.' },
      ],
    },
    {
      heading: 'Lista de control antes de enviar o registrar el resultado',
      paragraphs: [
        'Comprueba destinatario, versión, nombre, formato, tamaño, páginas y permisos. Abre el archivo o enlace desde fuera de tu sesión habitual. Si el proceso debe repetirse, conserva la fuente, las entradas, la fecha y una explicación breve de las decisiones.',
        'Cuando una salida tenga efecto contractual, laboral, fiscal o legal, detén el flujo de herramientas en la fase de borrador y vuelve a la fuente autorizada. La rapidez de una utilidad no reduce la responsabilidad de revisar.',
      ],
      items: [
        'Original intacto y copia de trabajo identificada.',
        'Datos confidenciales retirados o tratados con el canal aprobado.',
        'Supuestos de fecha o cálculo anotados.',
        'Archivo abierto después de la transformación.',
        'Enlace o QR probado sin depender de una sesión personal.',
        'Resultado oficial contrastado con su fuente responsable.',
      ],
    },
  ],
  faq: [
    { q: '¿Puedo usar estas herramientas con documentos confidenciales?', a: 'Sigue primero la política de tu organización. Aunque muchas operaciones se realizan en el navegador, un dispositivo, extensión o entorno no autorizado puede seguir siendo inadecuado.' },
    { q: '¿Un PDF unido conserva siempre firmas digitales?', a: 'No. Modificar o volver a generar un PDF puede afectar firmas y validaciones. Conserva el original firmado y utiliza el procedimiento aprobado.' },
    { q: '¿La calculadora conoce todos los festivos?', a: 'No. Debes indicar las fechas excluidas y confirmar el calendario de tu región, empresa o contrato.' },
    { q: '¿El sueldo neto calculado coincide con la nómina?', a: 'Es una estimación. La nómina puede incluir bases, topes, conceptos y reglas que una calculadora genérica no conoce.' },
    { q: '¿Formatear JSON valida los datos del sistema?', a: 'Solo ayuda con sintaxis y lectura. Debes comprobar esquema, tipos, unidades, permisos y reglas de negocio en el sistema de origen.' },
    { q: '¿Cómo compruebo que un QR funciona?', a: 'Escanéalo con otro dispositivo, revisa la URL completa y prueba el acceso sin tu sesión. Añade una alternativa escrita.' },
    { q: '¿Qué versión del archivo debo conservar?', a: 'Conserva el original, la copia anterior a una compresión y la versión exacta enviada o registrada.' },
    { q: '¿Dónde informo de un resultado extraño?', a: 'Usa un ejemplo ficticio y comunica la URL, navegador, pasos, entradas no sensibles y resultado esperado desde la página de apoyo.' },
  ],
  review: {
    heading: 'Revisión de una salida de oficina',
    intro: 'Una operación rápida aporta valor cuando otra persona puede abrir, entender y contrastar el resultado.',
    checks: [
      { title: 'Trazabilidad', text: 'El original, las entradas, los supuestos y la versión enviada se pueden identificar.' },
      { title: 'Confidencialidad', text: 'La tarea utiliza el mínimo de datos y respeta los canales aprobados por la organización.' },
      { title: 'Comprobación externa', text: 'Archivos, fechas, importes y enlaces se contrastan en el destino o fuente responsable.' },
    ],
  },
  sources: officeSources,
};

export const spanishCreatorsAudience: SpanishInfoPage = {
  title: 'Herramientas para creadores de contenido',
  seoTitle: 'Herramientas para creadores: texto e imágenes | FunnyTools',
  seoDescription: 'Herramientas para creadores de contenido: contar caracteres, comprimir imágenes, preparar QR, colores y sorteos con controles antes de publicar.',
  keywords: ['herramientas para creadores de contenido', 'contador de caracteres redes sociales', 'comprimir imagen para redes', 'crear código QR', 'ruleta para ideas'],
  eyebrow: 'Preparar una publicación sin entregar la voz a la herramienta',
  intro: 'Esta ruta organiza tareas previas a publicar en redes, vídeo, boletines, blogs o campañas: ajustar longitud, limpiar texto, preparar imágenes, verificar enlaces, crear un QR y ordenar ideas. La herramienta resuelve una operación; la autoría, los derechos, el contexto y la relación con la audiencia permanecen en manos de quien publica.',
  directAnswer: [
    'Crea primero el mensaje en una copia maestra. Después comprueba palabras o caracteres, adapta el texto a cada canal, prepara una imagen con dimensiones y peso adecuados y revisa la vista previa en móvil. Si añades un enlace o QR, pruébalo sin tu sesión. Publica solo cuando autoría, permisos, fuentes y llamada a la acción sean claros.',
    'No existe una cifra universal de caracteres, píxeles o compresión que garantice alcance. Las plataformas cambian y recortan de forma distinta. FunnyTools ayuda a medir y transformar, pero debes verificar el requisito vigente y el resultado real. Una ruleta puede ordenar ideas aceptables; no debe decidir afirmaciones, presupuesto, seguridad ni asuntos sensibles.',
  ],
  sections: [
    {
      heading: 'Convertir una idea en una pieza con objetivo y destinatario',
      paragraphs: [
        'Escribe en una frase qué debe entender o hacer la persona: aprender un paso, abrir una guía, responder una pregunta o registrarse en un evento. Define canal, público y prueba que respaldará la afirmación. Sin esa base, reducir caracteres solo produce una versión más corta de un mensaje confuso.',
        'Conserva un borrador maestro con enlaces y fuentes. Crea copias para cada plataforma y registra la fecha de publicación. Así puedes adaptar tono, formato y llamada a la acción sin perder el texto aprobado ni atribuir a una herramienta una decisión editorial.',
      ],
      links: [
        { label: 'Herramientas de texto', href: '/es/categorias/texto/', description: 'Contar, limpiar, ordenar y convertir borradores.' },
        { label: 'Biblioteca de guías', href: '/es/guias/', description: 'Tutoriales con pasos, límites y comprobaciones.' },
      ],
    },
    {
      heading: 'Contar palabras y caracteres según el campo real',
      paragraphs: [
        'Mide por separado título, descripción, texto alternativo, resumen, perfil y llamada a la acción. Algunas plataformas cuentan enlaces, emojis, saltos o caracteres combinados de manera diferente. Deja margen y pega la versión final en el campo de destino antes de aprobarla.',
        'Acortar no significa eliminar la fuente, la condición o la advertencia que evita una lectura engañosa. Quita repeticiones y palabras que no cambian el sentido. Si una afirmación necesita contexto, enlaza una página donde pueda comprobarse.',
      ],
      links: [
        { label: 'Contador de caracteres', href: '/es/herramientas/contador-caracteres/', description: 'Compara caracteres visibles, palabras y bytes UTF-8.' },
        { label: 'Contador de palabras', href: '/es/herramientas/contador-palabras/', description: 'Revisa extensión y tiempo estimado de lectura.' },
        { label: 'Convertir mayúsculas y minúsculas', href: '/es/herramientas/convertir-mayusculas-minusculas/', description: 'Normaliza una copia sin reescribir el mensaje.' },
      ],
    },
    {
      heading: 'Preparar imágenes para el canal sin degradar la copia maestra',
      paragraphs: [
        'Guarda el archivo original y crea una variante por formato. Recorta para encuadrar, redimensiona a los píxeles necesarios y comprime al final. Revisa caras, producto, texto incrustado, degradados y logotipo al tamaño en que aparecerán en un teléfono.',
        'Una imagen ligera mejora la entrega, pero una compresión excesiva puede volver ilegible un precio, una fecha o un gráfico. Si el canal vuelve a comprimir, deja calidad suficiente. No publiques capturas que revelen mensajes, nombres de archivos, pestañas o datos personales.',
      ],
      links: [
        { label: 'Comprimir imágenes', href: '/es/herramientas/comprimir-imagenes/', description: 'Genera una copia y permite comparar el peso.' },
        { label: 'Redimensionar imagen', href: '/es/herramientas/redimensionar-imagen/', description: 'Ajusta dimensiones y proporción.' },
        { label: 'Convertir PNG a JPG', href: '/es/herramientas/convertir-png-a-jpg/', description: 'Valora transparencia, fondo y calidad antes de cambiar.' },
      ],
    },
    {
      heading: 'Texto alternativo, contraste y lectura en móvil',
      paragraphs: [
        'Describe la información que aporta la imagen dentro del contexto, no todos sus detalles. Si es decorativa, evita repetir el texto contiguo. Para gráficos, comunica la conclusión y ofrece los datos o una explicación equivalente cuando sea necesario.',
        'Comprueba contraste, tamaño, orden de lectura y subtítulos. El color no debe ser la única señal. Prueba la pieza con zoom y en una pantalla pequeña; una imagen que se ve bien en el editor puede quedar recortada o ilegible en el canal.',
      ],
      links: [
        { label: 'Generador de colores', href: '/es/herramientas/generador-colores-hex-rgb-hsl/', description: 'Explora códigos y contrasta combinaciones como apoyo.' },
      ],
    },
    {
      heading: 'Crear enlaces y códigos QR que lleguen al destino correcto',
      paragraphs: [
        'Revisa la URL, parámetros de campaña, permisos y versión móvil antes de generar el QR. Abre el destino en una ventana privada y desde otro dispositivo. Coloca una URL o instrucción alternativa para quien no pueda escanear.',
        'No incrustes tokens, respuestas, descuentos privados ni accesos personales. Si la campaña cambia de destino, actualiza las piezas o utiliza una dirección gestionada que puedas mantener. Un QR impreso no puede corregirse después.',
      ],
      links: [
        { label: 'Generador de código QR', href: '/es/herramientas/generador-codigo-qr/', description: 'Crea una imagen que debes escanear y comprobar.' },
        { label: 'Codificar URL', href: '/es/herramientas/codificar-decodificar-url/', description: 'Inspecciona componentes sin confundir codificación con seguridad.' },
      ],
    },
    {
      heading: 'Usar color y azar para ideas de bajo riesgo',
      paragraphs: [
        'Un generador de color puede aportar opciones, pero la paleta final necesita contraste, coherencia, contexto cultural y reglas de marca. Guarda los códigos aprobados y comprueba estados de interacción, no solo una muestra aislada.',
        'Una ruleta puede ordenar temas que ya son válidos, asignar turnos o elegir entre variantes de prueba equivalentes. Define la lista y la regla antes de girar. No la utilices para decidir afirmaciones médicas, legales, financieras, seguridad, presupuesto ni tratamiento de personas.',
      ],
      links: [
        { label: 'Ruleta aleatoria', href: '/es/herramientas/ruleta-aleatoria/', description: 'Ordena opciones revisadas con la misma probabilidad.' },
        { label: 'Generador de colores', href: '/es/herramientas/generador-colores-hex-rgb-hsl/', description: 'Obtén HEX, RGB, HSL y una comprobación de contraste.' },
      ],
    },
    {
      heading: 'Controlar autoría, permisos y afirmaciones',
      paragraphs: [
        'Registra quién creó el texto, la imagen, la música y los datos; conserva licencias, consentimientos y enlaces a la fuente. No asumas que encontrar un recurso en Internet permite reutilizarlo. Si aparece una persona, producto o resultado, confirma el permiso y la exactitud del contexto.',
        'Separa hechos, opiniones, testimonios y estimaciones. Una herramienta de formato no verifica una promesa. Cuando una cifra cambie con el tiempo, añade fuente y fecha. Si el contenido puede afectar una decisión importante, exige una revisión adecuada antes de publicar.',
      ],
    },
    {
      heading: 'Lista de control antes de pulsar publicar',
      paragraphs: [
        'Lee el texto como lo verá la audiencia, abre cada enlace y revisa la imagen en el dispositivo objetivo. Confirma que título, miniatura y primera línea coinciden con el contenido. Programa o publica desde la cuenta correcta y conserva la versión aprobada.',
        'Después de publicar, abre la pieza sin privilegios, revisa recortes, subtítulos y destino. Corrige errores materiales y registra el cambio; no escondas una modificación que altere el significado.',
      ],
      items: [
        'Objetivo y audiencia definidos.',
        'Fuentes, derechos y permisos comprobados.',
        'Texto dentro del límite con margen.',
        'Imagen legible, accesible y sin datos expuestos.',
        'Enlace o QR probado fuera de la sesión.',
        'Vista móvil y publicación final revisadas.',
      ],
    },
  ],
  faq: [
    { q: '¿Qué límite de caracteres debo usar?', a: 'El del campo y plataforma donde publicarás. Los límites cambian; deja margen y comprueba la versión final directamente en el canal.' },
    { q: '¿Comprimir una imagen mejora el alcance?', a: 'Puede facilitar la carga, pero no garantiza alcance. La calidad del contenido, la audiencia y el funcionamiento de la plataforma siguen siendo determinantes.' },
    { q: '¿JPG, PNG o WebP para redes sociales?', a: 'Depende de transparencia, tipo de imagen y formatos aceptados. Comprueba la vista previa y conserva el original.' },
    { q: '¿Puedo usar un QR como único acceso?', a: 'No es recomendable. Añade una URL o vía equivalente y prueba el código con otro dispositivo.' },
    { q: '¿La ruleta sirve para elegir el próximo tema?', a: 'Sí, si todas las opciones ya son apropiadas y el riesgo es bajo. No debe sustituir datos o juicio en decisiones importantes.' },
    { q: '¿El generador de colores crea una identidad de marca?', a: 'Aporta códigos e ideas. Una identidad necesita sistema, contraste, reglas de uso, pruebas y dirección de diseño.' },
    { q: '¿Cómo protejo una captura de pantalla?', a: 'Recorta pestañas y notificaciones, oculta datos innecesarios y vuelve a revisar la imagen exportada antes de publicarla.' },
    { q: '¿FunnyTools verifica derechos de autor?', a: 'No. Las herramientas transforman archivos o texto; quien publica debe verificar autoría, licencia, atribución y consentimiento.' },
  ],
  review: {
    heading: 'Revisión editorial antes de publicar',
    intro: 'Una pieza está preparada cuando el mensaje, los recursos y el destino se sostienen fuera del editor.',
    checks: [
      { title: 'Mensaje comprobable', text: 'Las afirmaciones importantes conservan fuente, contexto y fecha cuando corresponde.' },
      { title: 'Recurso utilizable', text: 'Texto, imagen, contraste, subtítulos y alternativa funcionan en el canal real.' },
      { title: 'Destino probado', text: 'Enlaces y QR abren la página correcta sin depender de la cuenta del creador.' },
    ],
  },
  sources: visualSources,
};

export const spanishDesignersAudience: SpanishInfoPage = {
  title: 'Herramientas para diseñadores y contenido visual',
  seoTitle: 'Herramientas para diseñadores: imagen y color | FunnyTools',
  seoDescription: 'Herramientas para diseñadores: recortar, redimensionar, comprimir y convertir imágenes, comprobar color, QR y bocetos antes de entregar.',
  keywords: ['herramientas para diseñadores online', 'comprimir imágenes diseño', 'convertir PNG JPG WebP', 'comprobar contraste color', 'crear QR diseño'],
  eyebrow: 'Ajustes rápidos con una copia y una prueba de destino',
  intro: 'Esta ruta agrupa tareas visuales ligeras que aparecen entre el diseño y la entrega: recortar, cambiar dimensiones, reducir peso, rotar, convertir formatos, revisar color, preparar un QR o dibujar un boceto. Sirve para copias web y controles rápidos; no reemplaza el flujo profesional de impresión, gestión de color, edición por capas ni archivos maestros.',
  directAnswer: [
    'Para preparar una imagen web, conserva el original, recorta el encuadre, redimensiona a los píxeles de destino y comprime al final. Elige PNG, JPG o WebP según transparencia, contenido y compatibilidad. Revisa la copia al tamaño real y en la plataforma que la mostrará; no apruebes solo la previsualización de la herramienta.',
    'Para color y QR, comprueba contraste, estados y uso real. Un cociente de contraste no sustituye una revisión completa de accesibilidad, y un QR no sustituye una alternativa escrita. Para impresión, logotipos finales, archivos con capas, perfiles ICC, sangrado o medidas técnicas, utiliza software y controles profesionales.',
  ],
  sections: [
    {
      heading: 'Separar archivo maestro, copia de trabajo y exportación',
      paragraphs: [
        'Mantén el archivo maestro intacto, con su resolución, capas o datos originales. Crea una copia para cada destino y nómbrala con canal, dimensiones y versión. Así puedes volver atrás si una conversión elimina transparencia, metadatos o detalle.',
        'Antes de empezar, anota tamaño en píxeles, relación de aspecto, formato aceptado, peso máximo, fondo y zona segura. Estas condiciones deciden la operación; aplicar compresión sin conocerlas solo reduce opciones para corregir después.',
      ],
      links: [
        { label: 'Herramientas de imagen', href: '/es/categorias/imagen/', description: 'Accede a edición, conversión y optimización ligera.' },
        { label: 'Herramientas de dibujo', href: '/es/categorias/dibujo/', description: 'Boceto, CAD 2D y diagramas para trabajo preliminar.' },
      ],
    },
    {
      heading: 'Recortar para composición y redimensionar para entrega',
      paragraphs: [
        'Recortar cambia el encuadre y elimina información. Revisa punto focal, texto, manos, productos y espacio para titulares. Si el mismo recurso se usará en formatos horizontal, cuadrado y vertical, crea copias independientes desde el original.',
        'Redimensionar cambia la cantidad de píxeles. Mantén la proporción salvo que el destino exija otra cosa y evita agrandar una imagen pequeña esperando recuperar detalle. Comprueba bordes, líneas finas y texto después del ajuste.',
      ],
      links: [
        { label: 'Recortar imagen', href: '/es/herramientas/recortar-imagen/', description: 'Selecciona una zona y exporta una copia.' },
        { label: 'Redimensionar imagen', href: '/es/herramientas/redimensionar-imagen/', description: 'Cambia dimensiones con control de proporción.' },
        { label: 'Rotar y voltear imagen', href: '/es/herramientas/rotar-voltear-imagen/', description: 'Corrige orientación o crea una variante reflejada.' },
      ],
    },
    {
      heading: 'Comprimir después de fijar dimensiones y formato',
      paragraphs: [
        'Comprime la copia final, no el maestro. Compara peso, textura, degradados, bordes y texto al tamaño de uso. Las capturas, ilustraciones planas y fotografías responden de manera distinta; una misma calidad numérica no produce el mismo resultado.',
        'Evita guardar repetidamente una versión con pérdida. Si necesitas otro tamaño, vuelve al original o a una copia sin pérdida. Revisa también la compresión que aplica la plataforma, porque la imagen puede degradarse una segunda vez.',
      ],
      links: [
        { label: 'Comprimir imágenes', href: '/es/herramientas/comprimir-imagenes/', description: 'Genera una copia y muestra el cambio de peso.' },
      ],
    },
    {
      heading: 'Elegir PNG, JPG o WebP por necesidad',
      paragraphs: [
        'PNG resulta útil cuando necesitas transparencia o bordes nítidos; JPG suele encajar en fotografías y fondos opacos; WebP puede reducir peso en la web y admite varias capacidades. La elección depende también del sistema que recibirá el archivo.',
        'Una conversión no crea transparencia que el original no contiene ni mejora una imagen borrosa. Comprueba fondo, perfil visual, compatibilidad y nombre de extensión. Abre la copia en el navegador o aplicación de destino antes de eliminar otras versiones.',
      ],
      links: [
        { label: 'PNG a JPG', href: '/es/herramientas/convertir-png-a-jpg/', description: 'Define un fondo cuando la transparencia no puede conservarse.' },
        { label: 'JPG a PNG', href: '/es/herramientas/convertir-jpg-a-png/', description: 'Cambia el contenedor sin recuperar calidad perdida.' },
        { label: 'JPG a WebP', href: '/es/herramientas/convertir-jpg-a-webp/', description: 'Prepara una variante para uso web y compárala.' },
        { label: 'WebP a JPG', href: '/es/herramientas/convertir-webp-a-jpg/', description: 'Crea una copia compatible y revisa el fondo.' },
      ],
    },
    {
      heading: 'Comprobar color y contraste en todos los estados',
      paragraphs: [
        'Guarda los colores aprobados con su función: texto, fondo, borde, enlace, foco, error o éxito. Comprueba contraste en tamaño normal y grande, pero revisa también grosor, brillo de pantalla, estados desactivados y modo oscuro.',
        'No comuniques estado únicamente mediante rojo o verde. Añade texto, icono o patrón. Los códigos HEX, RGB y HSL representan valores; no garantizan por sí solos reproducción uniforme, identidad de marca ni exactitud de impresión.',
      ],
      links: [
        { label: 'Generador y conversor de colores', href: '/es/herramientas/generador-colores-hex-rgb-hsl/', description: 'Compara valores y contraste como control preliminar.' },
      ],
    },
    {
      heading: 'Integrar un QR sin romper composición ni acceso',
      paragraphs: [
        'Verifica primero la URL y genera el QR sobre un fondo limpio. Mantén margen alrededor, tamaño suficiente y contraste claro. No deformes el código para llenar una caja ni lo coloques sobre una fotografía con ruido.',
        'Imprime o muestra una prueba a la distancia prevista y escanea con más de un dispositivo. Añade una URL legible o llamada a la acción equivalente. Si el enlace puede caducar, indica fecha o utiliza un destino que la organización pueda mantener.',
      ],
      links: [
        { label: 'Generador de código QR', href: '/es/herramientas/generador-codigo-qr/', description: 'Exporta un código que requiere una prueba física o en pantalla.' },
      ],
    },
    {
      heading: 'Usar bocetos y diagramas como material preliminar',
      paragraphs: [
        'La pizarra sirve para explorar composición o explicar una idea rápida. Un diagrama de flujo ayuda a acordar pasos y decisiones. Exporta una copia para revisión, pero no confundas el PNG o SVG preliminar con un archivo de producción editable y documentado.',
        'Añade título, fecha, versión y responsable cuando otras personas deban comentar. Para medidas técnicas, tolerancias, archivos de impresión o sistemas de diseño, pasa el resultado al software profesional y aplica el control correspondiente.',
      ],
      links: [
        { label: 'Pizarra de dibujo online', href: '/es/herramientas/pizarra-dibujo-online/', description: 'Boceto rápido exportable como imagen.' },
        { label: 'Crear diagrama de flujo', href: '/es/herramientas/crear-diagrama-flujo/', description: 'Organiza pasos y decisiones de una revisión.' },
        { label: 'CAD 2D online', href: '/es/herramientas/cad-2d-online/', description: 'Dibujo ligero por unidades de rejilla, no plano certificado.' },
      ],
    },
    {
      heading: 'Lista de control de entrega visual',
      paragraphs: [
        'Abre la exportación fuera del editor y revisa dimensiones, orientación, transparencia, fondo, color, texto y peso. Comprueba la vista móvil o impresa que realmente recibirá el público. Entrega solo las variantes solicitadas y conserva el maestro.',
        'Si la pieza incluye datos, derechos de terceros o personas reconocibles, confirma fuente, licencia y consentimiento. Un buen archivo técnico no corrige un uso no autorizado o una afirmación engañosa.',
      ],
      items: [
        'Maestro intacto y variantes nombradas.',
        'Relación de aspecto y píxeles correctos.',
        'Formato y transparencia comprobados.',
        'Peso reducido sin perder información.',
        'Contraste, texto alternativo y estados revisados.',
        'QR, enlace y salida final probados en destino.',
      ],
    },
  ],
  faq: [
    { q: '¿Qué hago primero: recortar, redimensionar o comprimir?', a: 'Recorta el encuadre, redimensiona a los píxeles necesarios y comprime la copia final. Conserva siempre el original.' },
    { q: '¿WebP siempre pesa menos que JPG?', a: 'No en todos los archivos ni ajustes. Exporta ambas variantes, compara calidad y comprueba que el destino acepta WebP.' },
    { q: '¿Convertir JPG a PNG mejora la calidad?', a: 'No. Cambia el formato, pero no recupera detalle ni elimina artefactos que ya existen.' },
    { q: '¿Puedo preparar un archivo de imprenta con estas herramientas?', a: 'No como único flujo. La impresión exige resolución, color, sangrado, tipografía y especificaciones del proveedor.' },
    { q: '¿Un contraste de 4,5:1 garantiza accesibilidad?', a: 'Es un criterio importante para parte del texto, no una garantía completa. Revisa tamaño, estados, color como única señal y experiencia real.' },
    { q: '¿Puedo colocar un QR sobre una fotografía?', a: 'Puede fallar por ruido o poco contraste. Usa una zona limpia con margen y prueba la pieza al tamaño y distancia reales.' },
    { q: '¿La pizarra sirve como archivo maestro?', a: 'Está pensada para bocetos rápidos. Usa un formato y software profesional para edición, versionado y entrega de producción.' },
    { q: '¿Cómo informo de una conversión incorrecta?', a: 'Con un archivo ficticio o no sensible, indica formato, dimensiones, navegador, pasos y resultado observado en la página de apoyo.' },
  ],
  review: {
    heading: 'Revisión de una exportación visual',
    intro: 'El archivo se considera listo cuando mantiene su función y pasa la prueba del canal de destino.',
    checks: [
      { title: 'Fuente conservada', text: 'El maestro no se sobrescribe y cada variante puede relacionarse con su destino.' },
      { title: 'Calidad funcional', text: 'Texto, contraste, transparencia, color y detalles se comprueban al tamaño real.' },
      { title: 'Entrega reproducible', text: 'Formato, dimensiones, peso, nombre, enlace y versión coinciden con el requisito.' },
    ],
  },
  sources: visualSources,
};
