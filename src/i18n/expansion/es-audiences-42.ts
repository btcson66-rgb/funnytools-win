import type { SpanishInfoPage } from './es-pages';

const audienceSources = [
  {
    label: 'INTEF: Kit Digital para la práctica docente',
    href: 'https://formacion.intef.es/aulaenabierto/course/view.php?id=53',
    note: 'Recursos para seleccionar, organizar, crear y compartir contenidos, además de proteger datos.',
  },
  {
    label: 'INTEF: herramientas digitales y protección de datos',
    href: 'https://intef.es/Noticias/orientaciones-sobre-el-uso-de-herramientas-digitales/',
    note: 'Orientación institucional para evaluar herramientas usadas en el ámbito educativo.',
  },
  {
    label: 'W3C WAI: accesibilidad para estudiantes',
    href: 'https://www.w3.org/WAI/standards-guidelines/education/',
    note: 'Principios y recursos para integrar accesibilidad en materiales y entornos educativos.',
  },
];

export const spanishAudienceIndex: SpanishInfoPage = {
  title: 'Herramientas según tu tarea y perfil',
  seoTitle: 'Herramientas para docentes, estudiantes y trabajo | FunnyTools',
  seoDescription: 'Encuentra herramientas online en español para docentes, estudiantes, oficina, creación, diseño y desarrollo, organizadas por tareas y controles.',
  keywords: ['herramientas para docentes', 'herramientas para estudiantes', 'herramientas de oficina online', 'utilidades para creadores', 'herramientas de navegador'],
  eyebrow: 'Empieza por el trabajo que necesitas terminar',
  intro: 'Una misma herramienta puede servir a personas distintas, pero el orden, los riesgos y la comprobación cambian. Este índice organiza FunnyTools por contexto: aula, estudio, oficina, creación, diseño y desarrollo. Cada ruta parte de una necesidad y termina con una salida que debes verificar.',
  directAnswer: [
    'Si trabajas con alumnado, empieza por privacidad, accesibilidad y una prueba antes de proyectar. Si preparas una entrega, conserva originales y verifica el archivo en el portal real. Si manejas datos de oficina o desarrollo, utiliza ejemplos anonimizados y no pegues secretos. Elige el perfil que se acerque a tu tarea, aunque tu cargo tenga otro nombre.',
    'No necesitas registrarte para utilizar las herramientas principales. Muchas operaciones se realizan en el navegador, pero eso no elimina las reglas del centro, empresa o plataforma. La página de cada perfil indica qué herramienta usar, en qué orden, qué dato no introducir y qué revisar antes de compartir.',
  ],
  sections: [
    {
      heading: 'Docentes: preparar, dinamizar y comprobar una clase',
      paragraphs: [
        'La ruta docente reúne selección aleatoria, grupos, temporizadores, códigos QR, calificaciones, gráficos y documentos. El objetivo es reducir tareas mecánicas sin convertir el azar o una calculadora en una decisión pedagógica.',
        'Antes de proyectar, sustituye datos sensibles por identificadores, prueba el tamaño del texto y prepara una alternativa para quien no pueda escanear, escuchar o utilizar el mismo dispositivo.',
      ],
      links: [
        { label: 'Herramientas para docentes', href: '/es/para/docentes/', description: 'Flujos de aula, evaluación, privacidad y comprobación antes de usar.' },
        { label: 'Categoría de herramientas para clase', href: '/es/categorias/estudio/', description: 'Selección, grupos, asientos, temporización y apoyo a actividades.' },
      ],
    },
    {
      heading: 'Estudiantes: redactar, preparar archivos y entregar',
      paragraphs: [
        'La ruta de estudiantes conecta recuento de palabras, imágenes, PDF, GPA, estadística y APA 7. Empieza por la consigna y termina al abrir o cargar el archivo final, no al pulsar descargar.',
        'No sustituyas la lectura de la rúbrica por una herramienta. Formato, portada, bibliografía, tablas y límites pueden contar de manera diferente en cada asignatura o plataforma.',
      ],
      links: [
        { label: 'Herramientas para estudiantes', href: '/es/para/estudiantes/', description: 'De la consigna a un informe, PDF o entrega comprobada.' },
        { label: 'Biblioteca de guías', href: '/es/guias/', description: 'Tutoriales sobre APA 7, SPSS, PDF, imágenes y límites de palabras.' },
      ],
    },
    {
      heading: 'Oficina: documentos, fechas y controles preliminares',
      paragraphs: [
        'En oficina, las tareas pequeñas suelen bloquear procesos mayores: ordenar un PDF, reducir peso, calcular días laborables, preparar un QR o revisar un JSON. La ruta separa una estimación interna de una cifra oficial.',
        'Nóminas, contratos, impuestos y plazos legales necesitan la fuente vigente. Usa las utilidades para preparar o detectar incoherencias, y conserva el documento que autoriza la regla.',
      ],
      links: [
        { label: 'Herramientas para oficina', href: '/es/para/oficina/', description: 'Documentos, fechas, cálculos y datos con una revisión antes de enviar.' },
        { label: 'Herramientas PDF', href: '/es/categorias/pdf/', description: 'Unir, dividir, ordenar, extraer, rotar y comprimir copias.' },
        { label: 'Tiempo y fechas', href: '/es/categorias/tiempo/', description: 'Diferencias, días laborables, edad, cuenta atrás y cronómetro.' },
        { label: 'Calculadoras de dinero', href: '/es/categorias/dinero/', description: 'Estimaciones transparentes con entradas y límites visibles.' },
      ],
    },
    {
      heading: 'Creación de contenido: texto, imagen y publicación',
      paragraphs: [
        'Un flujo de contenido combina borrador, recuento, limpieza, formato, imagen y comprobación del destino. La herramienta acelera una operación; la voz, la autoría, las fuentes y los permisos siguen siendo responsabilidad de quien publica.',
        'Guarda una copia maestra antes de comprimir o convertir. Revisa enlaces, texto alternativo, contraste y aspecto en móvil antes de distribuir.',
      ],
      links: [
        { label: 'Herramientas para creadores', href: '/es/para/creadores/', description: 'Texto, imágenes, enlaces, color y controles antes de publicar.' },
        { label: 'Herramientas de texto', href: '/es/categorias/texto/', description: 'Contar, limpiar, ordenar, convertir y validar contenido.' },
        { label: 'Herramientas de imagen', href: '/es/categorias/imagen/', description: 'Recortar, redimensionar, comprimir y convertir formatos.' },
      ],
    },
    {
      heading: 'Diseño: dimensiones, formato, color y prueba real',
      paragraphs: [
        'Diseñar para web exige separar encuadre, dimensiones, peso y formato. Recorta para componer, redimensiona para cumplir píxeles y comprime al final. Para impresión, añade controles profesionales de resolución, color, sangrado y proveedor.',
        'Un QR debe probarse desde la distancia real y necesita una alternativa legible. Un contraste calculado ayuda, pero también debes revisar estados, tamaños y contexto.',
      ],
      links: [
        { label: 'Herramientas para diseñadores', href: '/es/para/disenadores/', description: 'Dimensiones, formatos, contraste, QR y prueba de entrega.' },
        { label: 'Dibujo y diagramas', href: '/es/categorias/dibujo/', description: 'Bocetos, CAD 2D y diagramas de flujo para trabajo rápido.' },
        { label: 'Generador de colores', href: '/es/herramientas/generador-colores-hex-rgb-hsl/', description: 'Conversión de color y comprobación de contraste.' },
      ],
    },
    {
      heading: 'Desarrollo: datos de prueba sin exponer secretos',
      paragraphs: [
        'JSON, CSV, Base64, URL, UUID y timestamps ayudan a depurar, pero no deben recibir tokens reales, claves privadas, credenciales ni datos confidenciales. Usa ejemplos ficticios y vuelve al código para comprobar significado y tipos.',
        'Formatear demuestra que una estructura puede leerse; no demuestra que el esquema, las unidades o las reglas de negocio sean correctos.',
      ],
      links: [
        { label: 'Herramientas para desarrolladores', href: '/es/para/desarrolladores/', description: 'JSON, codificación, timestamps y datos de prueba sin exponer secretos.' },
        { label: 'Formatear y validar JSON', href: '/es/herramientas/formatear-validar-json/', description: 'Revisa sintaxis sin ejecutar el contenido.' },
        { label: 'CSV a JSON', href: '/es/herramientas/convertir-csv-a-json/', description: 'Controla delimitador, cabecera, vacíos y tipos.' },
        { label: 'Generador UUID v4', href: '/es/herramientas/generador-uuid-v4/', description: 'Crea identificadores de prueba, no secretos.' },
      ],
    },
    {
      heading: 'Cómo elegir cuando perteneces a varios perfiles',
      paragraphs: [
        'Elige según la salida: una docente que publica un recurso puede necesitar la ruta de creación; un estudiante que analiza datos puede empezar en estadística; una persona de oficina que depura una exportación puede usar la ruta de desarrollo.',
        'Cambia de ruta cuando cambia el riesgo. Una lista de nombres de aula requiere minimización; un PDF firmado requiere preservar validez; un cálculo salarial necesita contrastar una norma; una contraseña exige un gestor seguro.',
      ],
      link: { prefix: 'Si la tarea incluye varios pasos, consulta los ', label: 'flujos de trabajo', href: '/es/flujos/', suffix: '.' },
    },
    {
      heading: 'Control común antes de compartir un resultado',
      paragraphs: [
        'Comprueba que la entrada procede de una fuente autorizada, que utilizaste una copia, que la herramienta corresponde a la tarea y que el resultado se abre en el destino. Registra supuestos cuando otra persona deba reproducirlo.',
        'Si no puedes explicar qué hizo la herramienta, no presentes la salida como definitiva. Reduce el caso, utiliza datos ficticios y pide ayuda con la URL y los pasos exactos.',
      ],
      items: [
        'Datos mínimos y sin secretos.',
        'Original conservado.',
        'Regla o requisito identificado.',
        'Prueba pequeña con resultado conocido.',
        'Salida revisada en móvil o aplicación de destino.',
        'Limitaciones comunicadas a quien recibe.',
      ],
    },
  ],
  faq: [
    { q: '¿Tengo que elegir el perfil que coincide con mi profesión?', a: 'No. Elige la ruta que coincide con la tarea y el tipo de salida que necesitas comprobar.' },
    { q: '¿Las herramientas requieren una cuenta?', a: 'Las funciones principales no requieren registro. Revisa cada página si una función futura declara un servicio externo.' },
    { q: '¿Procesamiento en el navegador significa riesgo cero?', a: 'No. Reduce transferencias del contenido, pero el dispositivo, extensiones, red y políticas del entorno siguen importando.' },
    { q: '¿Puedo usar datos reales de estudiantes o clientes?', a: 'Minimiza y anonimiza. Sigue la política aplicable y utiliza datos ficticios cuando basten para realizar o explicar la tarea.' },
    { q: '¿Qué hago si un resultado será oficial?', a: 'Compáralo con la fuente, sistema o profesional responsable. FunnyTools sirve como apoyo y control, no como registro oficial.' },
    { q: '¿Dónde encuentro tutoriales detallados?', a: 'La biblioteca de guías agrupa tutoriales por estadística, aula, documentos, imágenes y escritura.' },
    { q: '¿Puedo proponer otro perfil?', a: 'Sí. Explica tareas, entradas, salidas y pruebas en la página de apoyo, sin enviar datos privados.' },
    { q: '¿Cómo informo de un enlace o herramienta rota?', a: 'Indica URL, dispositivo, navegador, pasos y resultado observado usando un caso ficticio reproducible.' },
  ],
  review: {
    heading: 'Cómo comprobamos la utilidad de cada ruta',
    intro: 'Un perfil debe cambiar la decisión y el orden de trabajo, no limitarse a repetir una lista de herramientas.',
    checks: [
      { title: 'Necesidad concreta', text: 'Cada bloque empieza por una tarea observable y una salida que puede verificarse.' },
      { title: 'Riesgo contextual', text: 'Privacidad, accesibilidad, normativa, secretos y conservación cambian según el uso.' },
      { title: 'Enlaces reales', text: 'Solo se enlazan páginas publicadas y revisadas; las rutas futuras no aparecen como disponibles.' },
    ],
  },
  sources: audienceSources,
};

export const spanishTeachersAudience: SpanishInfoPage = {
  title: 'Herramientas para docentes y gestión del aula',
  seoTitle: 'Herramientas para docentes: grupos, notas y aula | FunnyTools',
  seoDescription: 'Herramientas para docentes en español: grupos, selección, temporizadores, asientos, QR, gráficos y notas con privacidad y comprobación.',
  keywords: ['herramientas para docentes', 'generador de grupos para clase', 'selector aleatorio de alumnos', 'temporizador para clase', 'calculadora de notas'],
  eyebrow: 'Preparar una clase sin convertir la herramienta en la decisión',
  intro: 'Esta ruta reúne tareas habituales antes, durante y después de una sesión: seleccionar turnos, formar grupos, organizar asientos, marcar tiempos, compartir recursos, crear gráficos y revisar calificaciones. Cada herramienta ahorra una operación, mientras el criterio pedagógico, la accesibilidad y la protección de datos siguen en manos del centro y del docente.',
  directAnswer: [
    'Para una dinámica, prepara una lista mínima, elimina ausencias, prueba el modo con datos ficticios y revisa el resultado antes de proyectar. Para evaluación, define escala, pesos, mínimos y redondeo desde la norma del centro. Para materiales, crea copias de trabajo y verifica el archivo o enlace desde el dispositivo del alumnado.',
    'El azar puede repartir sin preferencia, pero no conoce necesidades de apoyo, conflictos, objetivos ni seguridad. Una media puede reproducir una fórmula, pero no interpreta recuperaciones o adaptaciones. Utiliza la primera salida como borrador comprobable y documenta los ajustes necesarios.',
  ],
  sections: [
    {
      heading: 'Selección aleatoria con participación y privacidad',
      paragraphs: [
        'Usa nombres de pila, números de lista o etiquetas neutrales cuando sea suficiente. No pegues identificadores oficiales, teléfonos, diagnósticos ni observaciones. Explica si la selección es con o sin repetición y permite una alternativa cuando intervenir en público no sea apropiado.',
        'Prueba seis nombres ficticios, reinicio y modo sin repetir. Después carga solo quienes participan hoy y borra la lista de un equipo compartido.',
      ],
      links: [
        { label: 'Selector aleatorio de alumnos', href: '/es/herramientas/selector-aleatorio-alumnos/', description: 'Turnos con control de repetición y lista visible.' },
        { label: 'Ruleta aleatoria', href: '/es/herramientas/ruleta-aleatoria/', description: 'Sorteos visuales con entradas revisables.' },
      ],
    },
    {
      heading: 'Grupos: azar inicial y revisión pedagógica',
      paragraphs: [
        'Define número o tamaño de grupos y decide cómo tratar sobrantes. Genera una primera versión, comprueba ausencias, apoyos, idioma, materiales, seguridad y dinámica. Ajusta lo mínimo necesario y explica la regla práctica.',
        'No presentes la salida aleatoria como neutral en todas sus consecuencias. Para aprendizaje cooperativo, la distribución de roles y recursos puede importar más que el sorteo.',
      ],
      links: [
        { label: 'Flujo de grupos y selección en el aula', href: '/es/flujos/actividades-aleatorias-aula/', description: 'De la lista mínima a grupos, turnos, tiempo y revisión.' },
        { label: 'Generador de grupos aleatorios', href: '/es/herramientas/generador-grupos-aleatorios/', description: 'Distribuye una lista y permite comprobar tamaños.' },
        { label: 'Crear grupos para clase', href: '/es/herramientas/crear-grupos-clase/', description: 'Alternativa orientada a grupos de aula.' },
        { label: 'Guía de agrupamientos equitativos', href: '/es/guias/agrupamientos-equitativos-aula/', description: 'Cuándo revisar y cuándo no usar el azar.' },
      ],
    },
    {
      heading: 'Plano de asientos como borrador operativo',
      paragraphs: [
        'Un plano ayuda a visualizar, no sustituye las decisiones de accesibilidad, visión, audición, movilidad, convivencia o apoyo. Empieza por restricciones reales y evita mostrar observaciones sensibles en la pantalla.',
        'Comprueba que nombres y filas caben al imprimir o proyectar. Conserva por separado cualquier información que no deba ser pública.',
      ],
      links: [
        { label: 'Crear plano de asientos', href: '/es/herramientas/crear-plano-asientos-aula/', description: 'Distribuye asientos y permite revisar la composición.' },
      ],
    },
    {
      heading: 'Temporización visible y plan alternativo',
      paragraphs: [
        'Elige una duración acorde con la tarea, avisa antes de iniciar y muestra el tiempo restante sin convertirlo en presión innecesaria. Prueba sonido, pantalla completa, suspensión y reinicio.',
        'Ten una señal alternativa si falla la red, el sonido o la proyección. Un temporizador organiza; no corrige una consigna ambigua ni una carga irreal.',
      ],
      links: [
        { label: 'Temporizador online', href: '/es/herramientas/temporizador-online/', description: 'Cuenta atrás para actividad o presentación.' },
        { label: 'Guía de temporizador para clase', href: '/es/guias/temporizador-clase/', description: 'Preparación, avisos, pausas y plan B.' },
      ],
    },
    {
      heading: 'Compartir recursos mediante QR sin excluir',
      paragraphs: [
        'Abre el enlace final en una ventana privada y confirma permisos. Genera el QR, escanéalo con otro dispositivo y coloca al lado una URL legible. No codifiques respuestas, datos personales ni accesos privados.',
        'Para impresión, prueba una copia a la distancia real. Para proyección, amplía el código y deja margen blanco suficiente.',
      ],
      links: [
        { label: 'Generador de código QR', href: '/es/herramientas/generador-codigo-qr/', description: 'Crea y descarga un código comprobable.' },
        { label: 'Guía de QR en el aula', href: '/es/guias/codigos-qr-en-el-aula/', description: 'Contraste, tamaño, alternativa y privacidad.' },
      ],
    },
    {
      heading: 'Calificaciones, medias y baremos',
      paragraphs: [
        'Distingue media simple, ponderada, porcentaje y puntuación normalizada. Introduce pesos en una unidad común, conserva valores originales y aplica mínimos, recuperaciones o redondeo según la norma.',
        'Una estimación no es el acta. Compara con el sistema del centro y comunica si el cálculo omite una regla.',
      ],
      links: [
        { label: 'Flujo para calcular nota de oposición', href: '/es/flujos/calcular-nota-oposicion-docente/', description: 'Convocatoria, escalas, pesos, méritos y contraste oficial.' },
        { label: 'Promedio de notas', href: '/es/herramientas/calculadora-promedio-notas/', description: 'Media simple o ponderada con pasos visibles.' },
        { label: 'Media ponderada', href: '/es/herramientas/calculadora-media-ponderada/', description: 'Pesos editables y control de escalas.' },
        { label: 'Centro de estadística educativa', href: '/es/estadisticas-educativas/', description: 'Z, T, percentiles, SPSS y APA 7.' },
      ],
    },
    {
      heading: 'Gráficos para comunicar sin distorsionar',
      paragraphs: [
        'Usa barras para categorías comparables, añade título, unidad y fuente, y revisa que el eje no exagera diferencias. No mezcles porcentajes y cantidades sin aclararlo.',
        'Compara los valores del gráfico con la tabla y comprueba contraste, etiquetas y lectura en pantalla pequeña.',
      ],
      links: [
        { label: 'Crear gráfico de barras', href: '/es/herramientas/crear-grafico-barras/', description: 'Exporta un gráfico a partir de categorías y valores.' },
        { label: 'Guía de gráfico escolar', href: '/es/guias/grafico-barras-trabajo-escolar/', description: 'Ejes, unidades, fuente y revisión.' },
      ],
    },
    {
      heading: 'Lista de control antes de entrar al aula',
      paragraphs: [
        'Ensaya la tarea completa desde el dispositivo y navegador reales. Comprueba zoom, teclado, contraste, sonido, descarga y acceso sin sesión. Prepara una versión sin red o en papel cuando la actividad dependa de un solo punto técnico.',
        'Después de la sesión, elimina listas temporales de equipos compartidos y registra solo lo necesario.',
      ],
      items: [
        'Datos reducidos a lo necesario.',
        'Caso ficticio probado.',
        'Salida revisada por el docente.',
        'Alternativa accesible preparada.',
        'Regla explicada al grupo.',
        'Listas temporales retiradas al terminar.',
      ],
    },
  ],
  faq: [
    { q: '¿Las herramientas guardan la lista de estudiantes?', a: 'Las herramientas locales trabajan en la pestaña. Aun así, introduce solo los datos necesarios y elimina listas de equipos compartidos.' },
    { q: '¿Puedo usar los grupos aleatorios sin revisarlos?', a: 'No es recomendable. Comprueba ausencias, apoyos, conflictos, accesibilidad, idioma y recursos.' },
    { q: '¿Una ruleta garantiza participación equitativa?', a: 'Garantiza la probabilidad configurada, no una experiencia equitativa. Decide repetición, alternativas y seguimiento pedagógico.' },
    { q: '¿El promedio calculado es la nota oficial?', a: 'No. Debe coincidir con la norma y el sistema del centro, incluidos mínimos, recuperaciones y redondeo.' },
    { q: '¿Puedo mostrar nombres completos en la pantalla?', a: 'Usa la identificación mínima apropiada y sigue la política del centro. Evita cualquier dato sensible o innecesario.' },
    { q: '¿Qué hago si un alumno no puede usar el QR?', a: 'Ofrece una URL legible, acceso directo o material equivalente. El QR nunca debe ser la única vía.' },
    { q: '¿El temporizador sigue funcionando en segundo plano?', a: 'El navegador o dispositivo puede limitarlo. Pruébalo y prepara una señal alternativa.' },
    { q: '¿Dónde encuentro más actividades?', a: 'La biblioteca de guías incluye selección, grupos, temporización, QR y gráficos con ejemplos completos.' },
  ],
  review: {
    heading: 'Revisión docente antes de utilizar una salida',
    intro: 'La prueba técnica debe acompañarse de una decisión pedagógica y de privacidad.',
    checks: [
      { title: 'Datos mínimos', text: 'La lista no contiene identificadores, diagnósticos ni observaciones que no necesite la actividad.' },
      { title: 'Resultado revisado', text: 'El docente comprueba grupos, turnos, asientos, tiempos o notas antes de mostrarlos.' },
      { title: 'Acceso alternativo', text: 'Existe una vía para quien no pueda usar el mismo dispositivo, sonido, cámara o formato.' },
    ],
  },
  sources: audienceSources,
};

export const spanishStudentsAudience: SpanishInfoPage = {
  title: 'Herramientas para estudiantes y entregas académicas',
  seoTitle: 'Herramientas para estudiantes: informes y PDF | FunnyTools',
  seoDescription: 'Herramientas para estudiantes en español: palabras, PDF, imágenes, GPA, estadística y APA 7 con un flujo de entrega comprobable.',
  keywords: ['herramientas para estudiantes', 'contador de palabras ensayo', 'unir PDF trabajo', 'generador APA 7 resultados', 'calculadora GPA'],
  eyebrow: 'De la consigna al archivo entregado',
  intro: 'Esta ruta ayuda a preparar informes, ejercicios y presentaciones sin perder de vista la consigna. Reúne recuento de palabras, limpieza de texto, imágenes, PDF, GPA, estadística y redacción APA 7. La tarea termina cuando el archivo correcto se abre o queda confirmado en el sistema de entrega.',
  directAnswer: [
    'Empieza copiando requisitos: extensión, formato, nombre, tamaño, secciones, referencias y fecha. Trabaja sobre originales, utiliza las herramientas para una operación concreta y revisa el resultado después de cada conversión. Deja margen respecto al límite de palabras o peso porque las plataformas pueden contar o procesar de forma distinta.',
    'Las calculadoras y plantillas sirven para aprendizaje y control. No sustituyen la rúbrica, una cita correcta, el análisis requerido ni el registro oficial. No subas información privada de compañeros y no presentes una redacción generada como evidencia que no hayas verificado.',
  ],
  sections: [
    {
      heading: 'Convertir la consigna en una lista de requisitos',
      paragraphs: [
        'Anota extensión, partes obligatorias, formato, nombre, tamaño máximo, bibliografía, fecha y canal de entrega. Distingue lo que exige la asignatura de una preferencia personal.',
        'Ordena los controles por riesgo: contenido y autoría primero; luego cifras y referencias; al final formato, peso y carga.',
      ],
      link: { prefix: 'Para una vista completa de tutoriales, abre ', label: 'las guías en español', href: '/es/guias/', suffix: '.' },
    },
    {
      heading: 'Palabras y caracteres sin recortar el argumento',
      paragraphs: [
        'Pega una copia del texto y revisa palabras, caracteres y tiempo de lectura. Confirma si portada, tablas, notas, citas y bibliografía entran en el límite. Deja margen para diferencias entre editores.',
        'Reduce repeticiones y secciones fuera de objetivo; no elimines contexto, fuentes o matices importantes solo para alcanzar una cifra.',
      ],
      links: [
        { label: 'Contador de palabras', href: '/es/herramientas/contador-palabras/', description: 'Recuento, caracteres y tiempo estimado de lectura.' },
        { label: 'Contador de caracteres', href: '/es/herramientas/contador-caracteres/', description: 'Límites de formularios, resúmenes y campos.' },
        { label: 'Guía de límites de palabras', href: '/es/guias/limite-palabras-ensayos-examenes/', description: 'Qué puede contar y cómo dejar margen.' },
      ],
    },
    {
      heading: 'Imágenes legibles con un original intacto',
      paragraphs: [
        'Guarda la imagen original. Recorta para cambiar encuadre, redimensiona para cumplir píxeles y comprime para reducir peso. Comprueba texto, gráficos y detalles al tamaño final.',
        'No uses una compresión agresiva en diagramas o capturas con letra pequeña. Incluye texto alternativo o una descripción cuando el formato lo permita.',
      ],
      links: [
        { label: 'Comprimir imágenes', href: '/es/herramientas/comprimir-imagenes/', description: 'Reduce peso y permite comparar la copia.' },
        { label: 'Redimensionar imagen', href: '/es/herramientas/redimensionar-imagen/', description: 'Ajusta dimensiones manteniendo proporción.' },
      ],
    },
    {
      heading: 'Preparar y revisar un PDF de entrega',
      paragraphs: [
        'Trabaja con copias, nómbralas en orden y combina portada, cuerpo, anexos y justificantes según la consigna. Abre el resultado en otro lector y revisa principio, centro y final.',
        'Comprueba orientación, páginas vacías, enlaces, fuentes, tablas, firmas y formularios. Comprime al final y conserva el PDF anterior por si se pierde legibilidad.',
      ],
      links: [
        { label: 'Unir PDF', href: '/es/herramientas/unir-pdf/', description: 'Combina copias en el orden elegido.' },
        { label: 'Dividir PDF', href: '/es/herramientas/dividir-pdf/', description: 'Extrae intervalos sin modificar el original.' },
        { label: 'Comprimir PDF', href: '/es/herramientas/comprimir-pdf/', description: 'Optimización local sin prometer un tamaño exacto.' },
        { label: 'Fotos a PDF desde el móvil', href: '/es/guias/fotos-a-pdf-desde-movil/', description: 'Captura, orientación, orden y legibilidad.' },
      ],
    },
    {
      heading: 'GPA y notas como estimación documentada',
      paragraphs: [
        'Introduce asignaturas, créditos y escalas que pertenezcan al mismo sistema. Revisa cómo se tratan repetidas, aprobadas/no aprobadas y decimales. Un resultado genérico no reemplaza el expediente.',
        'Guarda los datos y la fórmula utilizada para poder explicar una diferencia con el portal oficial.',
      ],
      links: [
        { label: 'Calculadora GPA', href: '/es/herramientas/calculadora-gpa/', description: 'Estimación con cursos, créditos y escala declarada.' },
        { label: 'Promedio de notas', href: '/es/herramientas/calculadora-promedio-notas/', description: 'Media simple o ponderada para planificación.' },
      ],
    },
    {
      heading: 'Resultados estadísticos y APA 7 sin inventar campos',
      paragraphs: [
        'Identifica diseño, variables y salida completa antes de redactar. Copia estadístico, grados de libertad, p, intervalo y efecto desde la fuente verificada. No rellenes un campo que no esté disponible.',
        'La frase debe explicar comparación, dirección y contexto. Contrástala con la guía de la asignatura y conserva la tabla de origen.',
      ],
      links: [
        { label: 'Generador de informe APA 7', href: '/es/herramientas/generador-informe-apa-7/', description: 'Ordena cifras proporcionadas sin completar las ausentes.' },
        { label: 'Intérprete de SPSS', href: '/es/herramientas/interpretar-resultados-spss/', description: 'Ayuda a localizar filas y campos frecuentes.' },
        { label: 'Flujo de informe estadístico', href: '/es/flujos/informe-estadistico-investigacion/', description: 'Secuencia desde la salida hasta el informe comprobado.' },
      ],
    },
    {
      heading: 'Autoría, privacidad y uso responsable',
      paragraphs: [
        'Utiliza las herramientas para transformar o comprobar tu propio trabajo. Cita fuentes, respeta licencias y sigue las reglas de colaboración o asistencia permitida. No pegues datos personales de otra persona.',
        'Un procesamiento local reduce la transferencia del contenido, pero no resuelve plagio, permisos, autoría ni seguridad del dispositivo.',
      ],
      links: [
        { label: 'Cómo funcionan las herramientas', href: '/es/como-funcionan-las-herramientas/', description: 'Procesamiento local, pruebas y límites.' },
        { label: 'Condiciones de uso', href: '/es/condiciones-de-uso/', description: 'Responsabilidades y uso permitido.' },
      ],
    },
    {
      heading: 'Prueba final en el sistema de entrega',
      paragraphs: [
        'Renombra el archivo según la consigna, comprueba formato y tamaño, cierra y vuelve a abrir. Si el portal ofrece vista previa, léela. Guarda captura o confirmación sin incluir datos ajenos.',
        'Entrega con margen suficiente para resolver red, sesión o formato. No borres la copia enviada ni los originales hasta que la recepción esté confirmada.',
      ],
      items: [
        'Nombre y extensión correctos.',
        'Todas las páginas presentes.',
        'Texto, gráficos y referencias legibles.',
        'Peso dentro del límite.',
        'Vista previa coincidente.',
        'Confirmación conservada.',
      ],
    },
  ],
  faq: [
    { q: '¿Las herramientas PDF suben mi trabajo?', a: 'Las páginas españolas de PDF declaran procesamiento local en el navegador. Conserva originales y revisa el entorno del dispositivo.' },
    { q: '¿Puedo entregar directamente una frase APA 7 generada?', a: 'No sin revisarla. Verifica diseño, variables, cifras, redondeo y requisitos de la asignatura.' },
    { q: '¿El contador coincide con Word o el campus virtual?', a: 'Puede variar por guiones, cifras, notas o referencias. Deja margen y confirma la regla del sistema final.' },
    { q: '¿Comprimir una imagen siempre mejora la entrega?', a: 'Reduce peso, pero puede perder legibilidad. Compara la copia al tamaño de uso y conserva el original.' },
    { q: '¿La calculadora GPA produce un registro oficial?', a: 'No. Sirve para estimar; el expediente y la normativa institucional son la referencia.' },
    { q: '¿Puedo pegar un trabajo de un compañero para comprobarlo?', a: 'Hazlo solo con permiso y sin datos personales innecesarios. Es preferible que cada persona utilice su propia copia.' },
    { q: '¿Qué PDF debo conservar?', a: 'Conserva originales, versión previa a compresión y copia exacta enviada hasta recibir confirmación.' },
    { q: '¿Qué hago si el portal rechaza el archivo?', a: 'Lee el error, revisa nombre, extensión, peso y páginas. Vuelve a una copia anterior en lugar de encadenar conversiones a ciegas.' },
  ],
  review: {
    heading: 'Revisión antes de entregar',
    intro: 'Una operación correcta solo aporta valor si el archivo final cumple la consigna y puede abrirse.',
    checks: [
      { title: 'Contenido propio y citado', text: 'La herramienta no sustituye autoría, fuentes, análisis ni reglas académicas.' },
      { title: 'Cifras trazables', text: 'Notas y resultados estadísticos se pueden comparar con su fuente y fórmula.' },
      { title: 'Archivo real comprobado', text: 'La copia enviada se abre, se lee y coincide con la vista previa del destino.' },
    ],
  },
  sources: audienceSources,
};
