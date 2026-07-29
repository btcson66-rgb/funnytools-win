import type { SpanishInfoPage } from './es-pages';

const documentSources = [
  {
    label: 'W3C WAI: escribir contenido accesible',
    href: 'https://www.w3.org/WAI/tips/writing/',
    note: 'Estructura, encabezados, enlaces, instrucciones y lenguaje comprensible.',
  },
  {
    label: 'W3C WAI: imágenes accesibles',
    href: 'https://www.w3.org/WAI/tutorials/images/',
    note: 'Decisión y redacción de alternativas para imágenes informativas y decorativas.',
  },
  {
    label: 'AEPD: privacidad desde el diseño',
    href: 'https://www.aepd.es/guias/guia-privacidad-desde-diseno',
    note: 'Minimización de datos, acceso, conservación y exposición por defecto.',
  },
];

export const spanishStudentReportWorkflow: SpanishInfoPage = {
  title: 'Flujo para preparar y entregar un informe estudiantil',
  seoTitle: 'Cómo preparar un informe y entregarlo en PDF',
  seoDescription: 'Flujo para revisar consigna, palabras, fuentes, imágenes, PDF, nombre, peso y vista previa antes de entregar un informe estudiantil.',
  keywords: ['cómo preparar un informe', 'entregar trabajo en PDF', 'contador de palabras informe', 'unir PDF trabajo', 'comprimir PDF para campus'],
  eyebrow: 'De la consigna a la confirmación de entrega',
  intro: 'Este flujo organiza un informe, ensayo, presentación o trabajo de investigación desde los requisitos hasta el archivo confirmado en el campus. Conecta texto, fuentes, imágenes y PDF sin convertir una herramienta de formato en sustituto de la autoría, la rúbrica o la revisión académica.',
  directAnswer: [
    'Para preparar un informe, copia primero los requisitos: tema, secciones, palabras, formato, referencias, nombre, peso y fecha. Trabaja sobre originales, revisa contenido y cifras antes del aspecto, prepara imágenes legibles, genera el PDF y abre la copia final. La tarea termina cuando la vista previa y la confirmación del sistema coinciden con tu archivo.',
    'Deja margen en palabras y tamaño porque cada editor o plataforma puede contar y procesar de forma distinta. No entregues directamente una frase estadística, una referencia o una conversión sin verificarla. Conserva la versión enviada y los originales hasta que la recepción esté confirmada.',
  ],
  sections: [
    {
      heading: '1. Convertir la consigna en controles observables',
      paragraphs: [
        'Anota tema, objetivo, apartados, extensión, formato, fuente, interlineado, referencias, anexos, nombre de archivo, peso máximo, fecha y canal. Separa requisitos obligatorios de preferencias.',
        'Ordena la revisión: contenido y autoría; datos y fuentes; estructura; accesibilidad; formato; archivo; entrega. Una portada bonita no compensa una pregunta sin responder.',
      ],
    },
    {
      heading: '2. Estructurar el argumento y conservar las fuentes',
      paragraphs: [
        'Cada sección debe cumplir una función. Usa encabezados que permitan seguir la lógica y vincula afirmaciones verificables con su fuente. Registra autor, título, fecha, publicación y URL durante la investigación.',
        'Distingue cita, paráfrasis, dato propio y opinión. No utilices un limpiador o conversor de texto para ocultar el origen. Sigue la política de asistencia y colaboración de la asignatura.',
      ],
    },
    {
      heading: '3. Contar palabras sin recortar información necesaria',
      paragraphs: [
        'Mide título, resumen, cuerpo, notas y referencias por separado. Confirma qué incluye el límite y deja margen para diferencias en guiones, cifras, tablas o citas.',
        'Reduce repeticiones y apartados fuera de objetivo. No elimines fuente, condición o limitación solo para alcanzar la cifra.',
      ],
      links: [
        { label: 'Contador de palabras', href: '/es/herramientas/contador-palabras/', description: 'Revisa extensión y tiempo estimado de lectura.' },
        { label: 'Contador de caracteres', href: '/es/herramientas/contador-caracteres/', description: 'Comprueba resúmenes y campos con límite.' },
        { label: 'Guía de límites de palabras', href: '/es/guias/limite-palabras-ensayos-examenes/', description: 'Qué puede contar y cómo dejar margen.' },
      ],
    },
    {
      heading: '4. Preparar imágenes, gráficos y texto alternativo',
      paragraphs: [
        'Conserva el original, recorta para encuadrar, redimensiona a los píxeles necesarios y comprime al final. Revisa texto, ejes, leyendas y detalles al tamaño de uso.',
        'Añade título, fuente y descripción cuando corresponda. El texto alternativo comunica la función o información de la imagen; no necesita repetir el párrafo contiguo.',
      ],
      links: [
        { label: 'Comprimir imágenes', href: '/es/herramientas/comprimir-imagenes/', description: 'Reduce peso comparando la copia.' },
        { label: 'Redimensionar imagen', href: '/es/herramientas/redimensionar-imagen/', description: 'Ajusta dimensiones antes de insertar.' },
      ],
    },
    {
      heading: '5. Comprobar tablas, cálculos y redacción estadística',
      paragraphs: [
        'Verifica unidad, población, periodo, total y fuente. Compara cifras del texto con tablas y gráficos. Si utilizas SPSS o una calculadora, conserva la salida original.',
        'Una frase APA 7 es un borrador de formato. Revisa diseño, variables, estadístico, grados de libertad, p, intervalo, efecto y dirección antes de incorporarla.',
      ],
      links: [
        { label: 'Generador de informe APA 7', href: '/es/herramientas/generador-informe-apa-7/', description: 'Ordena cifras introducidas sin inventar campos.' },
        { label: 'Flujo de informe estadístico', href: '/es/flujos/informe-estadistico-investigacion/', description: 'Trazabilidad desde datos y salida hasta el párrafo.' },
      ],
    },
    {
      heading: '6. Crear un PDF en el orden correcto',
      paragraphs: [
        'Exporta cuerpo, portada y anexos según la consigna. Si debes unir archivos, trabaja con copias nombradas por orden. Revisa orientación y páginas vacías antes de combinar.',
        'Abre el PDF resultante en otro lector. Comprueba primera página, centro, final, tablas, enlaces, tipografía, firmas y número total.',
      ],
      links: [
        { label: 'Unir PDF', href: '/es/herramientas/unir-pdf/', description: 'Combina copias en el orden elegido.' },
        { label: 'Ordenar páginas PDF', href: '/es/herramientas/ordenar-paginas-pdf/', description: 'Revisa miniaturas y continuidad.' },
        { label: 'Fotos a PDF desde el móvil', href: '/es/guias/fotos-a-pdf-desde-movil/', description: 'Captura, orientación y legibilidad.' },
      ],
    },
    {
      heading: '7. Reducir el peso sin perder legibilidad',
      paragraphs: [
        'Comprueba primero el límite. Comprime una copia y compara gráficos, texto escaneado, notas y firmas. Si la plataforma acepta el archivo original, no reduzcas por costumbre.',
        'No encadenes varias compresiones. Vuelve a la versión previa si necesitas otro ajuste y conserva ambos archivos hasta terminar.',
      ],
      links: [
        { label: 'Comprimir PDF', href: '/es/herramientas/comprimir-pdf/', description: 'Optimiza una copia sin garantizar un tamaño exacto.' },
      ],
    },
    {
      heading: '8. Cargar, revisar y conservar la confirmación',
      paragraphs: [
        'Renombra exactamente como exige la consigna, cierra y vuelve a abrir. Carga con margen, lee la vista previa y confirma que seleccionaste la versión correcta.',
        'Guarda el archivo enviado, recibo o captura sin datos ajenos. Si el portal rechaza, lee el mensaje y vuelve a una copia anterior; no conviertas a ciegas.',
      ],
      items: [
        'Consigna y rúbrica revisadas.',
        'Autoría, citas y fuentes comprobadas.',
        'Palabras y formato con margen.',
        'Imágenes y tablas legibles.',
        'PDF abierto fuera del editor.',
        'Vista previa y confirmación conservadas.',
      ],
    },
  ],
  faq: [
    { q: '¿Qué debo revisar primero?', a: 'Pregunta, consigna, contenido, cifras y fuentes. El formato y el peso se revisan después.' },
    { q: '¿El contador coincide con el campus?', a: 'Puede variar. Confirma la regla, separa secciones y deja margen.' },
    { q: '¿Puedo entregar una frase APA generada?', a: 'Solo después de verificar análisis, cifras, variables y guía de la asignatura.' },
    { q: '¿Debo comprimir todas las imágenes?', a: 'Solo si el peso lo requiere y la copia conserva la información.' },
    { q: '¿Un PDF unido está listo para entregar?', a: 'No hasta abrirlo y comprobar orden, páginas, enlaces, tablas y legibilidad.' },
    { q: '¿Qué versión guardo?', a: 'Originales, versión previa a compresión y copia exacta enviada.' },
    { q: '¿Puedo incluir datos de compañeros?', a: 'Solo con permiso y minimización; evita datos personales innecesarios.' },
    { q: '¿Cuándo termina la tarea?', a: 'Cuando el sistema confirma la copia correcta y puedes conservar la evidencia de entrega.' },
  ],
  review: {
    heading: 'Revisión final del informe',
    intro: 'El archivo debe responder la consigna, sostener sus afirmaciones y abrirse en el sistema de entrega.',
    checks: [
      { title: 'Contenido propio', text: 'Argumento, fuentes, datos y asistencia permitida están claros.' },
      { title: 'Archivo legible', text: 'Páginas, tablas, imágenes, referencias y enlaces funcionan.' },
      { title: 'Entrega confirmada', text: 'Nombre, peso, vista previa y recibo corresponden a la copia enviada.' },
    ],
  },
  sources: documentSources,
};

export const spanishOfficeDocumentWorkflow: SpanishInfoPage = {
  title: 'Flujo para preparar documentos de oficina',
  seoTitle: 'Cómo organizar PDF, imágenes y fechas de oficina',
  seoDescription: 'Flujo para preparar PDF, capturas, fechas, QR y datos de oficina con copias, privacidad, revisión y entrega comprobable.',
  keywords: ['organizar documentos oficina', 'unir PDF oficina', 'comprimir archivo para enviar', 'calcular días laborables', 'crear QR formulario'],
  eyebrow: 'Original, copia, transformación y entrega',
  intro: 'Este flujo reúne tareas administrativas que suelen llegar juntas: ordenar anexos, unir o dividir PDF, reducir imágenes, calcular fechas, crear un QR y revisar una exportación. El objetivo es obtener una copia verificable sin sobrescribir el original ni convertir una estimación en dato oficial.',
  directAnswer: [
    'Para organizar documentos de oficina, define el entregable, conserva originales y crea una carpeta de copias con nombres numerados. Realiza una transformación cada vez, abre el resultado y comprueba páginas, firmas, tablas, permisos y destinatario. Si el material es confidencial, utiliza el canal aprobado por tu organización.',
    'Las fechas necesitan calendario y supuestos; los QR necesitan una URL probada y alternativa escrita; JSON y CSV necesitan comprobar filas y tipos. Detén el flujo cuando exista firma digital, cifrado, efecto legal, dato sensible o una regla oficial que la herramienta no conozca.',
  ],
  sections: [
    {
      heading: '1. Definir entregable y responsable',
      paragraphs: [
        'Aclara quién recibirá el documento, para qué proceso, en qué formato y cuándo. Anota páginas, anexos, firmas, límite de tamaño y canal.',
        'Decide quién aprueba contenido y quién solo prepara el archivo. Una edición técnica no autoriza cambios en cifras o cláusulas.',
      ],
    },
    {
      heading: '2. Crear una copia y un orden estable',
      paragraphs: [
        'Mantén originales de solo lectura. Copia y nombra 01-portada, 02-cuerpo, 03-anexo u otra secuencia clara. Evita versiones llamadas final-final.',
        'Comprueba que cada archivo se abre antes de combinar. Registra si un PDF tiene firma, formulario, contraseña o restricción.',
      ],
    },
    {
      heading: '3. Unir, dividir, rotar u ordenar PDF',
      paragraphs: [
        'Elige la operación mínima. Une cuando el destino requiere un archivo; divide cuando los permisos o trámites son distintos; rota páginas concretas sin cambiar las demás.',
        'Abre el resultado y revisa inicio, centro y final. Compara conteo, numeración, orientación, formularios, enlaces y firmas con la fuente.',
      ],
      links: [
        { label: 'Unir PDF', href: '/es/herramientas/unir-pdf/', description: 'Combina copias en orden.' },
        { label: 'Dividir PDF', href: '/es/herramientas/dividir-pdf/', description: 'Separa intervalos o páginas.' },
        { label: 'Ordenar páginas PDF', href: '/es/herramientas/ordenar-paginas-pdf/', description: 'Reordena mediante miniaturas y números.' },
      ],
    },
    {
      heading: '4. Preparar capturas e imágenes',
      paragraphs: [
        'Recorta notificaciones, pestañas y datos que no deben aparecer. Redimensiona según el destino y comprime una copia. Amplía texto, tablas y códigos.',
        'No utilices una captura como sustituto de un registro oficial cuando el sistema permite exportar. Conserva fecha y contexto si la imagen documenta un estado.',
      ],
      links: [
        { label: 'Recortar imagen', href: '/es/herramientas/recortar-imagen/', description: 'Elimina zonas innecesarias.' },
        { label: 'Comprimir imágenes', href: '/es/herramientas/comprimir-imagenes/', description: 'Reduce peso y exige comparación.' },
      ],
    },
    {
      heading: '5. Calcular fechas con el calendario correcto',
      paragraphs: [
        'Distingue días naturales y laborables, inclusión de extremos, festivos regionales y cierres internos. Registra la fuente del plazo.',
        'Prueba un intervalo corto manualmente. Si existe efecto contractual o legal, confirma la fecha en el sistema o con la persona responsable.',
      ],
      links: [
        { label: 'Días laborables', href: '/es/herramientas/calculadora-dias-laborables/', description: 'Excluye fines de semana y fechas indicadas.' },
        { label: 'Diferencia entre fechas', href: '/es/herramientas/calcular-diferencia-entre-fechas/', description: 'Compara criterios de inclusión.' },
      ],
    },
    {
      heading: '6. Crear un QR con acceso alternativo',
      paragraphs: [
        'Abre la URL final sin tu sesión, confirma permisos y genera el código. Escanéalo desde otro dispositivo y prueba la distancia prevista.',
        'Añade una URL legible. No codifiques tokens, respuestas o accesos privados y retira piezas antiguas si cambia el destino.',
      ],
      links: [
        { label: 'Generador de código QR', href: '/es/herramientas/generador-codigo-qr/', description: 'Crea un QR que debe probarse.' },
      ],
    },
    {
      heading: '7. Revisar JSON o CSV sin datos reales',
      paragraphs: [
        'Construye una muestra anonimizada. Formatea JSON para ver estructura o convierte CSV para revisar cabeceras; no pegues claves ni información personal.',
        'Compara filas, columnas, vacíos, acentos, fechas, decimales y ceros iniciales. Prueba una muestra en el sistema de destino.',
      ],
      links: [
        { label: 'Formatear JSON', href: '/es/herramientas/formatear-validar-json/', description: 'Comprueba sintaxis y lectura.' },
        { label: 'CSV a JSON', href: '/es/herramientas/convertir-csv-a-json/', description: 'Revisa delimitador, cabecera y tipos.' },
      ],
    },
    {
      heading: '8. Entregar y cerrar el expediente de trabajo',
      paragraphs: [
        'Comprueba destinatario, permisos, nombre, versión, tamaño y contenido. Abre el adjunto o enlace desde el mensaje preparado antes de enviar.',
        'Conserva la copia exacta entregada según la política. Elimina temporales y muestras sensibles cuando dejen de ser necesarios.',
      ],
      items: [
        'Originales intactos.',
        'Copias numeradas y trazables.',
        'Datos mínimos y canal autorizado.',
        'Páginas y archivos abiertos.',
        'Fecha y QR contrastados.',
        'Destinatario y versión confirmados.',
      ],
    },
  ],
  faq: [
    { q: '¿Puedo trabajar con documentos confidenciales?', a: 'Solo conforme a la política y herramientas aprobadas por tu organización.' },
    { q: '¿Unir PDF conserva firmas?', a: 'Modificar el archivo puede afectar firmas digitales. Conserva el original y usa el procedimiento autorizado.' },
    { q: '¿Comprimir PDF siempre reduce mucho?', a: 'No. Depende de su estructura; revisa tamaño y legibilidad.' },
    { q: '¿La calculadora incluye todos los festivos?', a: 'No. Debes indicar exclusiones y confirmar el calendario.' },
    { q: '¿Un QR puede contener una contraseña?', a: 'No es seguro. El contenido puede leerse al escanear.' },
    { q: '¿JSON válido significa datos correctos?', a: 'No. Falta validar esquema, tipos, unidades y reglas.' },
    { q: '¿Qué archivo envío?', a: 'La copia revisada cuyo nombre, contenido, peso y permisos coinciden con el requisito.' },
    { q: '¿Cuándo debo detenerme?', a: 'Ante firma, cifrado, efecto legal, dato sensible o una regla que no puedas comprobar.' },
  ],
  review: {
    heading: 'Revisión de entrega administrativa',
    intro: 'La salida debe conservar trazabilidad, confidencialidad y utilidad para el destinatario.',
    checks: [
      { title: 'Origen', text: 'Los originales y la regla del proceso se conservan.' },
      { title: 'Transformación', text: 'Cada cambio técnico se puede explicar y comparar.' },
      { title: 'Destino', text: 'La copia correcta llega por el canal y con los permisos previstos.' },
    ],
  },
  sources: documentSources,
};

export const spanishCreatorSocialWorkflow: SpanishInfoPage = {
  title: 'Flujo para preparar contenido de redes sociales',
  seoTitle: 'Cómo preparar publicaciones para redes sociales',
  seoDescription: 'Flujo para revisar texto, caracteres, imagen, color, enlace, QR, derechos y vista móvil antes de publicar contenido en redes.',
  keywords: ['preparar contenido redes sociales', 'contador caracteres publicación', 'comprimir imagen redes', 'crear QR campaña', 'revisar publicación móvil'],
  eyebrow: 'Mensaje, recurso, destino y comprobación',
  intro: 'Este flujo ayuda a preparar una publicación, descripción de vídeo, boletín o pieza de campaña. Une texto, recuento, imagen, enlace, QR y revisión móvil, pero mantiene fuera de la automatización las decisiones sobre voz, derechos, fuentes, promesas y relación con la audiencia.',
  directAnswer: [
    'Para preparar contenido de redes sociales, define una acción, redacta una copia maestra y adapta una versión por canal. Comprueba caracteres en el campo real, exporta una imagen desde el original, prueba enlaces y QR fuera de tu sesión y revisa la vista móvil. Publica solo cuando fuentes, permisos y llamada a la acción sean claros.',
    'Los límites y recortes cambian entre plataformas. Deja margen y no borres contexto importante para encajar. Una ruleta puede ordenar ideas ya válidas; una herramienta de color puede proponer códigos; ninguna decide estrategia, exactitud o accesibilidad por ti.',
  ],
  sections: [
    {
      heading: '1. Definir objetivo, audiencia y evidencia',
      paragraphs: [
        'Escribe qué debe entender o hacer la persona. Identifica canal, público, fecha y fuente que respalda cualquier cifra o promesa.',
        'Distingue contenido informativo, opinión, testimonio y promoción. Añade la divulgación necesaria antes de recortar.',
      ],
    },
    {
      heading: '2. Crear una copia maestra y versiones por canal',
      paragraphs: [
        'Conserva el texto aprobado con fuentes y enlaces. Duplica para cada plataforma en lugar de sobrescribir.',
        'Adapta primera línea, longitud y llamada a la acción sin cambiar el significado. Registra fecha y responsable.',
      ],
    },
    {
      heading: '3. Medir caracteres en el campo real',
      paragraphs: [
        'Cuenta título, descripción, perfil, texto alternativo y CTA por separado. Enlaces, emojis y saltos pueden contarse de manera distinta.',
        'Deja margen y pega en el destino antes de aprobar. Reduce repetición, no fuentes o condiciones necesarias.',
      ],
      links: [
        { label: 'Contador de caracteres', href: '/es/herramientas/contador-caracteres/', description: 'Compara caracteres, palabras y bytes.' },
        { label: 'Contador de palabras', href: '/es/herramientas/contador-palabras/', description: 'Revisa extensión y lectura.' },
      ],
    },
    {
      heading: '4. Preparar una imagen desde el original',
      paragraphs: [
        'Crea variantes por relación de aspecto. Recorta, redimensiona y comprime en ese orden. Revisa texto, caras, producto y logotipo en móvil.',
        'No expongas pestañas, mensajes o datos en capturas. Conserva el original y evita recomprimir una copia con pérdida.',
      ],
      links: [
        { label: 'Redimensionar imagen', href: '/es/herramientas/redimensionar-imagen/', description: 'Ajusta píxeles y proporción.' },
        { label: 'Comprimir imágenes', href: '/es/herramientas/comprimir-imagenes/', description: 'Reduce peso de la variante final.' },
      ],
    },
    {
      heading: '5. Revisar accesibilidad y color',
      paragraphs: [
        'Escribe texto alternativo según la función. Añade subtítulos y no comuniques estado solo por color.',
        'Comprueba contraste, tamaño, zoom y recorte. Un valor de contraste ayuda, pero no cubre toda la experiencia.',
      ],
      links: [
        { label: 'Generador de colores', href: '/es/herramientas/generador-colores-hex-rgb-hsl/', description: 'Compara códigos y contraste preliminar.' },
      ],
    },
    {
      heading: '6. Probar enlace, parámetros y QR',
      paragraphs: [
        'Abre la URL final en una ventana privada, revisa parámetros y permisos. Genera el QR y escanéalo en otro dispositivo.',
        'Añade una alternativa legible. No incluyas tokens ni accesos privados y comprueba que el destino funciona en móvil.',
      ],
      links: [
        { label: 'Generador de código QR', href: '/es/herramientas/generador-codigo-qr/', description: 'Crea una imagen que exige prueba.' },
      ],
    },
    {
      heading: '7. Comprobar derechos y afirmaciones',
      paragraphs: [
        'Registra autoría, licencia, atribución y consentimiento de texto, imagen, audio, vídeo y datos. Encontrar un recurso no concede permiso.',
        'Añade fuente y fecha a cifras cambiantes. Una transformación técnica no verifica una promesa ni su contexto.',
      ],
    },
    {
      heading: '8. Publicar y revisar sin privilegios',
      paragraphs: [
        'Confirma cuenta, fecha, miniatura, primera línea y CTA. Abre la publicación desde móvil y sin la sesión del creador.',
        'Revisa recorte, subtítulos, enlace y QR. Corrige errores materiales y registra cambios que alteren el significado.',
      ],
      items: [
        'Objetivo y audiencia definidos.',
        'Versión y caracteres comprobados.',
        'Imagen legible y accesible.',
        'Derechos y fuentes registrados.',
        'Enlace y QR probados.',
        'Publicación final revisada en móvil.',
      ],
    },
  ],
  faq: [
    { q: '¿Existe un límite universal de caracteres?', a: 'No. Comprueba el campo y plataforma actuales y deja margen.' },
    { q: '¿Comprimir mejora el alcance?', a: 'Puede facilitar carga, pero no garantiza distribución o interacción.' },
    { q: '¿Puedo usar la misma imagen en todos los canales?', a: 'Crea variantes para relaciones de aspecto y zonas seguras distintas.' },
    { q: '¿Qué debe decir el texto alternativo?', a: 'La información o función que la imagen aporta en ese contexto.' },
    { q: '¿Un QR basta como CTA?', a: 'No. Añade URL o vía equivalente y pruébalo.' },
    { q: '¿La ruleta puede decidir temas?', a: 'Solo entre opciones apropiadas y de bajo riesgo.' },
    { q: '¿FunnyTools verifica licencias?', a: 'No. Quien publica debe verificar derechos y consentimiento.' },
    { q: '¿Qué reviso después de publicar?', a: 'Recorte, texto, subtítulos, enlace, QR, móvil y significado final.' },
  ],
  review: {
    heading: 'Revisión de una publicación',
    intro: 'La pieza está lista cuando mensaje, recurso y destino funcionan fuera del editor.',
    checks: [
      { title: 'Exactitud', text: 'Fuentes, derechos, contexto y fecha sostienen el mensaje.' },
      { title: 'Acceso', text: 'Texto, imagen, contraste, subtítulos y alternativa son utilizables.' },
      { title: 'Destino', text: 'La publicación, enlace y QR funcionan sin la sesión del creador.' },
    ],
  },
  sources: documentSources,
};
