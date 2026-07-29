import type { SpanishInfoPage } from './es-pages';

export const spanishAbout: SpanishInfoPage = {
  title: 'Sobre FunnyTools: quiénes somos y cómo trabajamos',
  seoTitle: 'Sobre FunnyTools: equipo, método y principios',
  seoDescription: 'Conoce quién mantiene FunnyTools, para quién se crean sus herramientas, cómo se prueban y revisan, cómo se financia el sitio y qué límites asumimos.',
  keywords: [
    'sobre FunnyTools',
    'quién está detrás de FunnyTools',
    'herramientas online fiables',
    'cómo revisa FunnyTools sus calculadoras',
    'equipo editorial FunnyTools',
  ],
  eyebrow: 'Identidad del sitio · método de trabajo · transparencia',
  intro: 'FunnyTools es un proyecto independiente de herramientas gratuitas para resolver tareas concretas en el navegador. Esta página explica quién mantiene el sitio, por qué existe, cómo se decide qué publicar, qué pruebas se realizan y dónde terminan nuestras competencias. La confianza no depende de una frase promocional: debe poder contrastarse con el funcionamiento visible, las fuentes, las políticas y un canal real de corrección.',
  directAnswer: [
    'FunnyTools está mantenido por un pequeño equipo editorial y técnico bajo el nombre del propio proyecto. No pertenece a Google, a una administración, a un banco, a una universidad ni a un proveedor de software. El contacto operativo es btcson66@gmail.com y el repositorio público permite informar de errores reproducibles. No inventamos una identidad corporativa, una oficina española ni acreditaciones que el proyecto no posee.',
    'El sitio reúne 79 herramientas publicadas para documentos, imágenes, texto, azar, tiempo, dinero, dibujo, aula y estadística. La prioridad es que una persona pueda entender la entrada, obtener una salida y comprobar sus límites sin registrarse. Las versiones en español se redactan para búsquedas, normas, vocabulario y situaciones de uso en español; no se publican como una traducción automática de otra página.',
  ],
  sections: [
    {
      heading: 'Qué es FunnyTools y qué problema intenta resolver',
      paragraphs: [
        'Muchas tareas digitales duran pocos minutos: unir un PDF, limpiar una lista, convertir una imagen, calcular un intervalo o preparar un sorteo de clase. Instalar una aplicación, crear una cuenta y entregar datos personales puede costar más que la tarea. FunnyTools agrupa funciones pequeñas en páginas estables, utilizables desde móvil y ordenador, con instrucciones que explican el resultado y no solo el botón.',
        'El propósito principal es reducir pasos sin ocultar decisiones. Una calculadora debe indicar qué fórmula o regla utiliza; una herramienta de archivo debe advertir qué puede perderse; un selector aleatorio debe distinguir una actividad informal de un sorteo regulado. La rapidez solo aporta valor cuando la persona sabe qué obtuvo y cómo revisarlo.',
      ],
    },
    {
      heading: 'Quién mantiene el sitio',
      paragraphs: [
        'El proyecto se publica y mantiene bajo la identidad editorial FunnyTools. El trabajo combina desarrollo del sitio, pruebas de herramientas, revisión de textos, seguimiento de páginas rotas y actualización de documentación. El correo btcson66@gmail.com recibe errores, correcciones y propuestas relacionadas con el sitio. Los cambios técnicos quedan vinculados a versiones visibles en el pie de página.',
        'FunnyTools no se presenta como despacho profesional, entidad financiera, centro educativo, laboratorio, organismo público ni certificador. Cuando un tema requiere una autoridad externa, la página debe dirigir al contrato, la administración, la norma, la documentación del producto o el profesional correspondiente. Una fuente enlazada apoya una comprobación concreta; no convierte al sitio en representante de esa fuente.',
      ],
    },
    {
      heading: 'Para quién se diseñan las herramientas',
      paragraphs: [
        'El público previsto incluye estudiantes que preparan trabajos, docentes que organizan actividades, personas que ordenan documentos, equipos que redactan o limpian datos y usuarios que necesitan una estimación cotidiana. Cada grupo puede llegar con vocabulario distinto. Por eso una página útil explica tanto el nombre técnico como la tarea común que una persona intenta completar.',
        'No diseñamos procesos para vigilancia, apuestas, fraude, decisiones médicas, certificación laboral ni evaluación automática de personas. Algunas funciones —azar, calificaciones, estadísticas o dinero— pueden aparecer en esos ámbitos, pero la herramienta publicada ofrece una operación limitada. La persona o institución responsable debe decidir si el método es apropiado y permitido.',
      ],
    },
    {
      heading: 'Qué incluye actualmente el catálogo',
      paragraphs: [
        'El catálogo publicado contiene herramientas de PDF, imagen, texto, datos, códigos, azar, tiempo, finanzas, dibujo, aula y estadística. Las categorías no son simples etiquetas: agrupan procedimientos relacionados y ayudan a comparar qué herramienta corresponde a la entrada y salida disponibles. Una persona puede pasar de una guía a la función concreta y volver a una comprobación temática.',
        'El número de herramientas no es un objetivo aislado. Antes de ampliar el catálogo se revisa si la función resuelve una necesidad distinta, puede ejecutarse con seguridad en el navegador y permite explicar sus límites. Una nueva URL sin una utilidad comprobable, ejemplos y mantenimiento solo haría más difícil encontrar lo que ya funciona.',
      ],
      link: {
        prefix: 'Explora el catálogo vigente en ',
        label: 'todas las herramientas en español',
        href: '/es/herramientas/',
        suffix: ' y utiliza las categorías para comparar tareas relacionadas.',
      },
    },
    {
      heading: 'Procesamiento local y acceso sin cuenta',
      paragraphs: [
        'La mayoría de las funciones ejecuta fórmulas, lectura de archivos y transformaciones dentro de la pestaña. El texto, la lista, la imagen o el PDF seleccionado no necesita convertirse en una carga a un servidor de FunnyTools para producir la salida. No existe una cuenta de usuario que reúna el historial de cálculos o documentos.',
        '“Local” no significa que visitar una web no genere ninguna conexión. El navegador descarga la página y puede contactar con infraestructura de alojamiento, seguridad, analítica o publicidad. La política de privacidad separa esas señales técnicas del contenido procesado por la herramienta. El dispositivo, las extensiones y una red administrada también tienen sus propios riesgos.',
      ],
      link: {
        prefix: 'La explicación técnica completa está en ',
        label: 'cómo funcionan nuestras herramientas',
        href: '/es/como-funcionan-las-herramientas/',
        suffix: ', con ejemplos de cálculos, imágenes, PDF y almacenamiento local.',
      },
    },
    {
      heading: 'Cómo se construye y prueba una herramienta',
      paragraphs: [
        'El trabajo comienza con una tarea y casos verificables, no con una palabra clave. Se identifican entradas, unidades, estados vacíos, resultado esperado, errores y límites del navegador. Para fórmulas se prueban ejemplos pequeños calculables a mano y extremos que revelen división por cero, escala incorrecta o redondeo prematuro. Para archivos se conservan originales y se abre la descarga en un visor independiente.',
        'Antes de publicar se construye el sitio estático y se recorren las páginas indexables. Las comprobaciones incluyen título, descripción, canonical, encabezado principal, datos estructurados, enlaces de idioma, ausencia de noindex accidental, seguridad de contenido y anchura móvil. Las herramientas con interacción reciben además casos de entrada, salida, reinicio y error. Una prueba reduce riesgo; nunca demuestra que no exista ningún fallo.',
      ],
    },
    {
      heading: 'Revisión editorial y contenido escrito para personas',
      paragraphs: [
        'Las páginas explican propósito, método, supuestos, límites, privacidad, ejemplos y pasos de verificación. Las fuentes se eligen por la afirmación que permiten comprobar: una norma para una obligación, una especificación para un formato o una entidad competente para un procedimiento. No se copian artículos externos para llenar espacio ni se presenta una cita como sustituto del análisis aplicado a la herramienta.',
        'Google recomienda contenido útil, fiable y centrado en las personas, con una finalidad clara, información sobre quién publica y valor original. Ese criterio coincide con el objetivo editorial: una persona debe poder terminar la tarea o saber por qué necesita otra fuente. No existe un número mágico de palabras; la profundidad se justifica por decisiones reales, excepciones y comprobaciones.',
      ],
    },
    {
      heading: 'Cómo se escribe la versión española',
      paragraphs: [
        'El español del sitio se redacta desde la intención local. Se eligen términos usados por personas de España y otros mercados hispanohablantes, y cuando una regla depende del país se declara la jurisdicción en vez de fingir universalidad. “Día hábil”, “nota”, “salario neto” o “TAE” requieren contexto; una traducción literal no basta para responder a la consulta.',
        'Cada página española tiene su propio título, descripción, respuesta directa, preguntas frecuentes, ejemplos y fuentes. Las rutas se conectan mediante hreflang con el contenido equivalente cuando existe, pero no se obliga a que dos idiomas tengan frases o extensión idénticas. El criterio de publicación es equivalencia de utilidad, no correspondencia palabra por palabra.',
      ],
    },
    {
      heading: 'Criterio reforzado para dinero, educación y estadística',
      paragraphs: [
        'Los resultados que pueden afectar estabilidad financiera, derechos, expedientes o investigación reciben límites más visibles. Una cuota hipotecaria no representa una oferta; un sueldo neto no sustituye una nómina; una puntuación estandarizada no decide una admisión; una prueba estadística no valida por sí sola un estudio. Se muestran variables y comprobaciones para evitar que una cifra limpia parezca más oficial de lo que es.',
        'Las páginas deben enlazar fuentes primarias o institucionales cuando la decisión lo necesite y explicar qué dato falta. Si una norma, contrato, convocatoria o software especializado define el resultado, esa fuente prevalece. FunnyTools puede ayudar a reproducir un cálculo y detectar preguntas, pero no verifica identidad, elegibilidad, cumplimiento ni calidad completa de los datos.',
      ],
    },
    {
      heading: 'Accesibilidad, móvil y lenguaje claro',
      paragraphs: [
        'El sitio procura una estructura navegable con encabezados, etiquetas, foco de teclado, contraste y diseño adaptable. Las pruebas móviles incluyen anchuras pequeñas y desbordamiento horizontal. Los diagramas y resultados visuales deben acompañarse de texto o valores que no dependan exclusivamente del color. Las mejoras se realizan de forma continua y un problema puede aparecer en una combinación no probada de navegador y tecnología de apoyo.',
        'El lenguaje claro no consiste en eliminar precisión. Se define el término técnico, se muestra el paso y luego se indica la excepción. Si una persona encuentra un control sin etiqueta, un orden de foco confuso, texto que se superpone o una salida que el lector de pantalla no anuncia, puede enviar la URL, el navegador y la tecnología utilizada para que el caso sea reproducible.',
      ],
    },
    {
      heading: 'Publicidad, financiación e independencia del resultado',
      paragraphs: [
        'El acceso actual a las herramientas es gratuito. FunnyTools carga infraestructura de Google AdSense mientras el sitio se revisa o utiliza publicidad, y la analítica ayuda a identificar uso y errores. Los espacios publicitarios, cuando existan, deben quedar separados de botones, entradas y resultados. Una marca no paga para modificar el resultado de una fórmula o aparecer como respuesta de una herramienta.',
        'La publicidad puede financiar alojamiento, desarrollo y mantenimiento, pero no garantiza ingresos ni aprobación por una red. La política de privacidad explica cookies, señales técnicas y controles. No vendemos como recomendación personalizada una salida calculada por el usuario. Los enlaces a fuentes externas se eligen por utilidad de verificación, no como aval comercial.',
      ],
      link: {
        prefix: 'Consulta los proveedores y opciones en la ',
        label: 'política de privacidad en español',
        href: '/es/privacidad/',
        suffix: '.',
      },
    },
    {
      heading: 'Actualizaciones, versiones y correcciones',
      paragraphs: [
        'El pie de página muestra la versión publicada. Una modificación pasa por construcción y comprobaciones antes de llegar al sitio. Se revisan enlaces, fórmulas, compatibilidad y contenido cuando se detecta un error o cambia una referencia. La fecha editorial indica una revisión real del lote publicado; no se cambia solo para que una página parezca reciente.',
        'Un error confirmado se prioriza por impacto: pérdida o exposición de datos, cálculo materialmente incorrecto, herramienta inutilizable, barrera de acceso o texto engañoso reciben más urgencia que una preferencia estética. No prometemos que toda sugerencia se implemente ni que cada mensaje reciba respuesta, pero un informe con pasos y ejemplo permite decidir con evidencia.',
      ],
    },
    {
      heading: 'Qué FunnyTools no promete',
      paragraphs: [
        'No prometemos exactitud absoluta, disponibilidad permanente, compatibilidad con todos los archivos, conservación de metadatos, validez jurídica, aprobación institucional ni rendimiento futuro. Tampoco recuperamos datos cerrados en una pestaña, almacenamos copias de cada archivo o conocemos las reglas privadas de una empresa, banco, escuela o plataforma.',
        'Una herramienta gratuita puede reducir trabajo repetitivo sin asumir la responsabilidad de la decisión final. Conserva originales, verifica salidas importantes, revisa la fuente vigente y utiliza un sistema profesional cuando el contexto lo exija. Estas limitaciones aparecen también en el aviso legal y en las páginas específicas; no deben quedar escondidas detrás de una declaración general.',
      ],
      link: {
        prefix: 'Lee los límites por tipo de resultado en el ',
        label: 'aviso legal y descargo de responsabilidad',
        href: '/es/aviso-legal/',
        suffix: '.',
      },
    },
    {
      heading: 'Cómo evaluar si puedes confiar en una página',
      paragraphs: [
        'Comprueba si la página identifica la tarea, los datos necesarios, la fórmula o procedimiento, los casos que quedan fuera, la privacidad y una forma de repetir el resultado. Revisa que el enlace oficial apoye la afirmación concreta y que la salida no se presente como certificación. Una página responsable también explica cuándo dejar la herramienta.',
        'Haz una prueba pequeña con un resultado conocido, cambia una variable y observa si la salida responde de forma coherente. En archivos, abre la descarga fuera del sitio. En una decisión formal, compara con el documento vinculante. Si algo no coincide, guarda la URL, entradas ficticias, versión visible y navegador; esa evidencia es más útil que asumir que la interfaz o la fuente externa tiene razón.',
      ],
    },
    {
      heading: 'Participar con errores, fuentes y propuestas',
      paragraphs: [
        'Puedes informar de un error técnico, una frase imprecisa, un enlace obsoleto, una barrera de accesibilidad o una herramienta que resolvería una tarea repetida. Incluye solo los datos mínimos y sustituye información real por un ejemplo. Las incidencias públicas de GitHub sirven para errores no sensibles; el correo es apropiado para privacidad, seguridad o contexto que no debe quedar publicado.',
        'No envíes contraseñas, documentos de identidad, expedientes, historiales médicos, extractos bancarios ni archivos de terceros. FunnyTools no necesita esos datos para reproducir una función. La página de contacto proporciona plantillas y explica qué puede atender el equipo y qué debe dirigirse a una autoridad o profesional.',
      ],
      link: {
        prefix: 'Elige el canal y prepara un informe en la ',
        label: 'página de contacto',
        href: '/es/contacto/',
        suffix: '.',
      },
    },
  ],
  faq: [
    { q: '¿Quién es el propietario de FunnyTools?', a: 'El sitio se mantiene de forma independiente bajo la identidad editorial FunnyTools. El canal operativo publicado es btcson66@gmail.com; no se presenta como administración, banco, escuela ni despacho profesional.' },
    { q: '¿Cuántas herramientas hay publicadas?', a: 'El catálogo actual contiene 79 herramientas. El número puede cambiar con versiones posteriores y se comprueba en la página de todas las herramientas.' },
    { q: '¿El contenido en español es una traducción automática?', a: 'No. Las páginas españolas se redactan según vocabulario, intención de búsqueda, fuentes y situaciones de uso en español, con límites locales cuando corresponden.' },
    { q: '¿Cómo se comprueba una calculadora?', a: 'Se prueban casos calculables a mano, unidades, extremos, estados vacíos y redondeo; el usuario todavía debe comparar resultados formales con la fuente aplicable.' },
    { q: '¿FunnyTools guarda mis archivos?', a: 'Las herramientas locales procesan el contenido en la pestaña y no crean una biblioteca en FunnyTools. Conserva originales y revisa la política de privacidad y cada herramienta.' },
    { q: '¿La publicidad cambia los resultados?', a: 'No debe hacerlo. Los anuncios se separan de controles y resultados; una marca no paga para modificar una fórmula o aparecer como respuesta de la herramienta.' },
    { q: '¿Puedo solicitar una herramienta nueva?', a: 'Sí. Explica problema, entrada, salida y situación de uso. La propuesta se evalúa por utilidad, viabilidad local, seguridad y capacidad de mantenimiento.' },
    { q: '¿Dónde informo de un error?', a: 'Utiliza GitHub Issues para errores públicos sin datos sensibles o escribe a btcson66@gmail.com. Incluye URL, pasos, ejemplo ficticio, resultado esperado, dispositivo y navegador.' },
  ],
  review: {
    heading: 'Comprobación pública de nuestras afirmaciones',
    intro: 'La descripción del proyecto debe coincidir con la versión que cualquier visitante puede abrir y probar.',
    checks: [
      { title: 'Identidad y contacto', text: 'La página identifica a FunnyTools como proyecto independiente, publica un correo y no inventa afiliaciones ni credenciales.' },
      { title: 'Método visible', text: 'Las páginas muestran entradas, límites, fuentes, preguntas frecuentes y pruebas reproducibles en lugar de prometer exactitud.' },
      { title: 'Corrección verificable', text: 'La versión, la URL y un ejemplo ficticio permiten informar de una diferencia sin compartir datos personales.' },
    ],
  },
  sources: [
    {
      label: 'Google Search Central: contenido útil, fiable y centrado en las personas',
      href: 'https://developers.google.com/search/docs/fundamentals/creating-helpful-content?hl=es',
      note: 'Criterios sobre propósito, originalidad, autoría, fuentes, experiencia y confianza.',
    },
    {
      label: 'W3C WAI: principios de accesibilidad',
      href: 'https://www.w3.org/WAI/fundamentals/accessibility-principles/',
      note: 'Referencia para contenido perceptible, operable, comprensible y robusto.',
    },
    {
      label: 'AEPD: protección de datos por defecto',
      href: 'https://www.aepd.es/derechos-y-deberes/cumple-tus-deberes/medidas-de-cumplimiento/proteccion-de-datos-por-defecto',
      note: 'Explica minimización, menor extensión, conservación y accesibilidad de datos.',
    },
  ],
};

export const spanishContact: SpanishInfoPage = {
  title: 'Contacto, errores y propuestas para FunnyTools',
  seoTitle: 'Contacto FunnyTools: soporte, errores y mejoras',
  seoDescription: 'Contacta con FunnyTools, informa de un error reproducible, propone una herramienta o comunica problemas de contenido, privacidad, seguridad o accesibilidad.',
  keywords: [
    'contacto FunnyTools',
    'reportar error FunnyTools',
    'soporte herramientas online',
    'proponer herramienta online',
    'problema accesibilidad FunnyTools',
  ],
  eyebrow: 'Correo · GitHub Issues · informes reproducibles',
  intro: 'Esta página ayuda a elegir el canal correcto y a enviar la información mínima que permite comprobar un problema. FunnyTools no tiene chat, teléfono ni atención en tiempo real. Los errores y correcciones se atienden como mantenimiento de un sitio gratuito; una solicitud clara puede convertirse en una prueba, mientras que un archivo confidencial solo añade riesgo.',
  directAnswer: [
    'Para contacto privado, escribe a btcson66@gmail.com. Para un fallo técnico o una propuesta que pueda discutirse públicamente y no contenga datos personales, abre una incidencia en GitHub: https://github.com/btcson66-rgb/funnytools-win/issues. Incluye URL, tarea, pasos, entrada ficticia, resultado esperado, resultado observado, dispositivo y navegador.',
    'No publiques ni envíes contraseñas, claves, documentos de identidad, archivos financieros, expedientes escolares, datos médicos, documentos de clientes o contenido que no tengas permiso para compartir. No existe un equipo de asesoramiento individual: FunnyTools puede revisar el sitio, pero no certifica cálculos, recupera archivos, interpreta un caso legal o negocia con terceros.',
  ],
  sections: [
    {
      heading: 'Canales disponibles y cuándo usar cada uno',
      paragraphs: [
        'El correo btcson66@gmail.com es el canal para privacidad, seguridad, accesibilidad con contexto personal, contenido que todavía no debe publicarse y consultas generales sobre el sitio. Escribe un asunto específico y una sola petición principal. Si informas de varias páginas, separa cada URL y resultado para que puedan verificarse de forma independiente.',
        'GitHub Issues es público y resulta útil para errores reproducibles, enlaces rotos, mejoras y propuestas sin información sensible. Cualquier texto, captura o archivo añadido puede quedar visible, indexarse o conservarse en el historial del proveedor. Sustituye nombres y documentos por datos ficticios antes de publicar.',
      ],
      link: {
        prefix: 'Abre una incidencia no sensible en ',
        label: 'GitHub Issues de FunnyTools',
        href: 'https://github.com/btcson66-rgb/funnytools-win/issues',
        suffix: ' y comprueba antes si ya existe un informe similar.',
      },
    },
    {
      heading: 'Tiempo de revisión y expectativas de respuesta',
      paragraphs: [
        'Los mensajes sobre mantenimiento y corrección suelen revisarse dentro de tres días laborables, pero no es un plazo contractual ni garantiza una respuesta individual. Reproducir un error, consultar una fuente o preparar una versión puede requerir más tiempo. Una incidencia visible puede cerrarse si está duplicada, queda fuera del alcance o no contiene pasos suficientes.',
        'No envíes el mismo mensaje repetidamente para elevar prioridad. El impacto determina el orden: exposición de datos, seguridad, cálculo materialmente incorrecto, pérdida de salida, inaccesibilidad y páginas rotas se revisan antes que cambios cosméticos. Si aparece nueva evidencia, añádela al hilo original sin incluir información privada.',
      ],
    },
    {
      heading: 'Plantilla para informar de un error técnico',
      paragraphs: [
        'Empieza con la URL exacta y una frase que describa la tarea. Enumera los pasos desde una página recién cargada. Añade una entrada pequeña que pueda compartirse, el resultado esperado y el observado. Indica si ocurre siempre o solo algunas veces, y si desaparece al recargar. Una captura puede ayudar, pero escribe también el mensaje de error para que sea buscable.',
        'Incluye sistema operativo, navegador y versión aproximada, tamaño de pantalla si el problema es visual y cualquier extensión o tecnología de apoyo relevante. Para archivos, describe formato, tamaño, páginas, cifrado y origen sin adjuntar el original confidencial. Crea un archivo mínimo de prueba o confirma que el problema también ocurre con contenido ficticio.',
      ],
      items: [
        'URL y nombre de la herramienta.',
        'Objetivo de la tarea y pasos numerados.',
        'Entrada ficticia mínima.',
        'Resultado esperado y resultado real.',
        'Mensaje de error copiado como texto.',
        'Dispositivo, sistema, navegador y versión.',
        'Frecuencia y última hora aproximada del fallo.',
      ],
    },
    {
      heading: 'Errores de cálculo y diferencias con otra fuente',
      paragraphs: [
        'No basta con decir que dos cifras son distintas. Envía todas las entradas, unidades, fecha, regla de redondeo y fuente de comparación. Comprueba si una herramienta espera porcentaje o decimal, tasa anual o mensual, muestra o población, días inclusivos o transcurridos. Muchas diferencias revelan definiciones distintas y no una operación aritmética defectuosa.',
        'Si la cifra externa procede de una nómina, contrato, banco, escuela o administración, no adjuntes el documento completo. Copia la regla pública o crea un ejemplo equivalente sin identidad. FunnyTools puede revisar la fórmula publicada, pero no confirmar datos personales, determinar derechos o declarar cuál institución debe aceptar un resultado.',
      ],
    },
    {
      heading: 'Problemas con PDF, imágenes y descargas',
      paragraphs: [
        'Conserva el original y prueba con una copia. Indica tipo de archivo, tamaño, número de páginas, orientación, si tiene contraseña, formulario o firma, y el lector utilizado para abrir la salida. Señala si el problema ocurre al seleccionar, procesar, descargar o reabrir. No adjuntes un documento real si contiene información personal o de terceros.',
        'Un archivo mínimo ayuda a separar el contenido del formato. Puedes crear una imagen de color plano, un PDF de dos páginas con texto ficticio o un CSV de tres filas. Si solo falla un documento específico, describe qué característica lo diferencia. FunnyTools no puede recuperar un archivo original perdido ni reconstruir datos que el navegador ya cerró.',
      ],
    },
    {
      heading: 'Cómo proponer una herramienta nueva',
      paragraphs: [
        'Describe el problema antes que la interfaz: quién realiza la tarea, qué datos tiene, qué salida necesita y cómo la comprueba hoy. Incluye uno o dos ejemplos y explica si debe funcionar sin servidor. Una propuesta como “comparar dos fechas y excluir una lista manual de festivos” permite evaluar mucho mejor que “hacer una app de productividad”.',
        'Se consideran utilidad distinta, privacidad, complejidad, peso de dependencias, accesibilidad, mantenimiento, riesgo de uso y disponibilidad de una fuente fiable. No se promete fecha ni implementación. Una función que requiera almacenar cuentas, datos altamente sensibles, infringir condiciones de terceros o emitir una decisión profesional puede quedar fuera del alcance.',
      ],
    },
    {
      heading: 'Cómo solicitar una corrección de contenido',
      paragraphs: [
        'Incluye URL, encabezado y frase exacta. Explica qué resulta incorrecto, ambiguo, desactualizado o difícil de entender. Si depende de una norma, especificación o organismo, enlaza la fuente primaria y señala la sección relevante. No pegues un artículo completo ni pidas copiar el texto de otra web.',
        'Una corrección se contrasta con el comportamiento de la herramienta y el contexto de la página. Una preferencia de estilo puede no cambiarse; un error verificable, una omisión que altera el resultado o una fuente que ya no respalda la afirmación sí requiere revisión. Para español, indica país o sector cuando el término varía por región.',
      ],
    },
    {
      heading: 'Informar de una barrera de accesibilidad',
      paragraphs: [
        'Indica qué intentabas hacer, la URL y el punto donde la tarea se volvió difícil o imposible. Especifica si se trata de teclado, foco, lector de pantalla, ampliación, contraste, tamaño del objetivo, movimiento, etiqueta o mensaje de error. Incluye navegador, sistema y tecnología de apoyo si te resulta cómodo compartirlos.',
        'W3C recomienda describir la barrera, el software utilizado y la página afectada. No necesitas demostrar una norma para que el informe sea útil. Explica el resultado práctico —por ejemplo, “el foco no llega al botón de descarga”— y una alternativa que sí funciona en otro sitio si la conoces. No envíes contraseñas ni información que no quieras revelar.',
      ],
    },
    {
      heading: 'Privacidad y solicitudes relacionadas con datos',
      paragraphs: [
        'Escribe por correo e identifica el canal utilizado: boletín, entrega de archivo, preferencia local, analítica o publicidad. Describe la solicitud sin enviar más datos de los necesarios. Como las herramientas locales no crean una cuenta ni asocian normalmente entradas a una identidad, puede no existir un registro de cálculos o archivos que FunnyTools pueda localizar.',
        'Para una dirección de correo voluntaria, utiliza la misma dirección cuando sea razonable o explica cómo se envió. No adjuntes una copia completa del documento de identidad salvo que resulte estrictamente necesaria y se acuerde un método seguro. La política de privacidad describe proveedores, controles y derechos aplicables.',
      ],
      link: {
        prefix: 'Antes de enviar una solicitud, consulta la ',
        label: 'política de privacidad',
        href: '/es/privacidad/',
        suffix: ' para identificar el tipo de dato y el proveedor.',
      },
    },
    {
      heading: 'Reportar una posible vulnerabilidad de seguridad',
      paragraphs: [
        'No publiques una vulnerabilidad explotable, token, clave o dato de otra persona en GitHub. Escribe al correo con el asunto “Seguridad FunnyTools”, la URL, impacto potencial y pasos mínimos realizados sobre datos y cuentas propios. No accedas a información ajena, no mantengas persistencia, no interrumpas el servicio y no realices pruebas que no estén autorizadas por la ley.',
        'FunnyTools no anuncia un programa de recompensas ni autoriza pruebas intrusivas. Un informe responsable permite verificar el problema antes de hacerlo público. INCIBE-CERT y OWASP describen principios de divulgación coordinada: minimizar daño, respetar privacidad, proporcionar detalle reproducible y utilizar un canal claro. Si existe peligro inmediato o delito, contacta con la autoridad competente.',
      ],
    },
    {
      heading: 'Fraude, suplantación y mensajes sospechosos',
      paragraphs: [
        'FunnyTools no solicita contraseñas, códigos de verificación, acceso remoto, pagos para desbloquear resultados ni claves bancarias por correo. Si un mensaje afirma representar al sitio y pide esa información, no respondas, no abras archivos y verifica por el canal publicado en esta página. Una dirección o logotipo visible no demuestra por sí solo el remitente real.',
        'Para informar de suplantación, conserva encabezados del mensaje, URL y captura sin reenviar secretos. No publiques datos personales de quien aparece en el fraude. Contacta también con tu proveedor de correo, banco o autoridad cuando exista riesgo sobre una cuenta o pago. FunnyTools solo puede revisar el uso de su nombre y los elementos bajo su control.',
      ],
    },
    {
      heading: 'Derechos de autor, marcas y contenido de terceros',
      paragraphs: [
        'Si consideras que una página reproduce material sin autorización, identifica la URL de FunnyTools, la obra o marca afectada, la ubicación exacta y una forma de comprobar que puedes presentar la solicitud. No adjuntes documentos personales innecesarios. El equipo puede revisar contenido propio y recursos publicados en el repositorio, pero no decidir una disputa compleja por correo.',
        'Una herramienta que convierte o procesa un archivo no almacena automáticamente ese archivo ni concede licencia sobre el material. Las preguntas sobre el derecho a usar una imagen, fuente, documento o marca corresponden al titular, la licencia y la ley aplicable. FunnyTools no proporciona opiniones jurídicas individuales.',
      ],
    },
    {
      heading: 'Consultas que no son soporte del sitio',
      paragraphs: [
        'El canal no ofrece asesoramiento legal, médico, fiscal, financiero, académico ni estadístico para casos personales. Tampoco certifica una nota, interpreta una resolución, decide una hipoteca, valida un estudio, organiza un sorteo oficial o representa al usuario frente a empleador, escuela, banco, administración o proveedor.',
        'Para una obligación o derecho, contacta con la fuente competente. Puedes informar si la herramienta explica mal una fórmula o enlaza una norma obsoleta; no podemos determinar cómo se aplica esa norma a tu expediente. Esta separación protege a quien consulta de recibir una respuesta sin el contexto ni la cualificación necesarios.',
      ],
    },
    {
      heading: 'Cómo se utiliza un informe recibido',
      paragraphs: [
        'La información se usa para reproducir, clasificar y corregir el sitio. Un caso puede convertirse en prueba automatizada, aclaración editorial, aviso de limitación o propuesta futura. Antes de publicar una captura o ejemplo recibido se debe eliminar información identificable y obtener permiso cuando corresponda; por eso es mejor que el remitente envíe desde el principio un caso ficticio.',
        'Cerrar una incidencia significa que se tomó una decisión, no necesariamente que se aceptó toda la propuesta. La versión del pie permite comprobar si un cambio llegó a producción. Si el resultado sigue siendo diferente, añade nuevos pasos y versión en el mismo hilo. La evidencia posterior puede justificar reabrir el análisis.',
      ],
    },
    {
      heading: 'Lista de comprobación antes de enviar',
      paragraphs: [
        'Confirma que elegiste correo para información privada y GitHub para un informe público. Elimina identidad, secretos y documentos reales. Añade URL, versión visible, pasos, ejemplo mínimo y entorno. Expresa un resultado esperado que pueda comprobarse. Revisa si ya existe la incidencia y conserva una copia de tu mensaje.',
        'Si la cuestión afecta seguridad, derechos, dinero o salud, no esperes una respuesta de mantenimiento para actuar: utiliza el canal oficial o profesional correspondiente. FunnyTools agradece informes concretos, pero no es un servicio de emergencia ni un sustituto de atención competente.',
      ],
    },
  ],
  faq: [
    { q: '¿Cuál es el correo de FunnyTools?', a: 'El correo operativo publicado es btcson66@gmail.com. Indica URL y motivo, y no envíes datos sensibles.' },
    { q: '¿Puedo informar de un error en GitHub?', a: 'Sí, si el contenido puede ser público. GitHub Issues sirve para errores, mejoras y propuestas sin datos personales ni vulnerabilidades explotables.' },
    { q: '¿Cuánto tarda una respuesta?', a: 'Los mensajes suelen revisarse en unos tres días laborables, pero no existe un plazo contractual ni se garantiza respuesta individual o corrección inmediata.' },
    { q: '¿Qué datos necesita un informe técnico?', a: 'URL, pasos, entrada ficticia mínima, resultado esperado y real, dispositivo, sistema y navegador. Añade el mensaje de error como texto.' },
    { q: '¿Puedo adjuntar el PDF que falla?', a: 'Solo si no contiene información personal o confidencial y tienes permiso. Es preferible crear un PDF mínimo con contenido ficticio.' },
    { q: '¿Dónde comunico una vulnerabilidad?', a: 'Por correo con el asunto “Seguridad FunnyTools”. No la publiques, no accedas a datos ajenos y no realices pruebas intrusivas o no autorizadas.' },
    { q: '¿FunnyTools ofrece asesoramiento personal?', a: 'No. El contacto revisa el sitio; no ofrece consultas legales, médicas, fiscales, financieras, académicas o estadísticas individuales.' },
    { q: '¿Puedo pedir una nueva herramienta?', a: 'Sí. Describe usuario, problema, entradas, salida, ejemplo, comprobación y necesidad de procesamiento local. No se garantiza implementación ni fecha.' },
  ],
  review: {
    heading: 'Qué hace que un informe sea utilizable',
    intro: 'Un buen informe protege a la persona que lo envía y permite reproducir el problema sin adivinar.',
    checks: [
      { title: 'Canal correcto', text: 'Correo para privacidad, seguridad o contexto privado; GitHub para errores y propuestas que pueden ser públicos.' },
      { title: 'Caso mínimo', text: 'URL, pasos, entrada ficticia, resultado esperado y real permiten confirmar la diferencia.' },
      { title: 'Datos mínimos', text: 'No contiene contraseñas, documentos, expedientes, cuentas ni información de terceros.' },
    ],
  },
  sources: [
    {
      label: 'GitHub Docs: crear una incidencia',
      href: 'https://docs.github.com/es/issues/tracking-your-work-with-issues/using-issues/creating-an-issue',
      note: 'Explica el canal público para registrar errores, mejoras y solicitudes.',
    },
    {
      label: 'AEPD: principios del tratamiento',
      href: 'https://www.aepd.es/derechos-y-deberes/cumple-tus-deberes/principios',
      note: 'Referencia sobre finalidad, transparencia y minimización de datos.',
    },
    {
      label: 'W3C WAI: comunicar barreras de accesibilidad',
      href: 'https://www.w3.org/WAI/teach-advocate/contact-inaccessible-websites/',
      note: 'Recomienda aportar URL, problema, sistema, navegador y tecnología de apoyo.',
    },
    {
      label: 'INCIBE-CERT: política de reporte de vulnerabilidades',
      href: 'https://www.incibe.es/incibe-cert/sobre-incibe-cert/politica-reporte-vulnerabilidades',
      note: 'Referencia institucional española para divulgación coordinada y reporte responsable.',
    },
    {
      label: 'OWASP: Vulnerability Disclosure Cheat Sheet',
      href: 'https://cheatsheetseries.owasp.org/cheatsheets/Vulnerability_Disclosure_Cheat_Sheet.html',
      note: 'Principios de autorización, privacidad, detalle reproducible y comunicación responsable.',
    },
  ],
};

export const spanishDisclaimer: SpanishInfoPage = {
  title: 'Aviso legal y descargo de responsabilidad',
  seoTitle: 'Aviso legal y límites de uso | FunnyTools',
  seoDescription: 'Consulta la titularidad, el contacto, el ámbito del servicio y los límites de calculadoras, estadísticas, archivos, azar, salud, fuentes y enlaces de FunnyTools.',
  keywords: [
    'aviso legal FunnyTools',
    'descargo de responsabilidad calculadoras online',
    'resultados solo orientativos',
    'límites herramientas online',
    'responsabilidad FunnyTools',
  ],
  eyebrow: 'Titularidad · alcance · límites por tipo de herramienta',
  intro: 'Este aviso reúne la información de identificación disponible y explica qué puede —y qué no puede— significar un resultado de FunnyTools. No intenta convertir una limitación general en permiso para publicar cualquier cosa: cada herramienta sigue obligada a describir su método, sus riesgos y la comprobación adecuada. Ninguna cláusula pretende eliminar derechos que una ley aplicable reconozca de forma irrenunciable.',
  directAnswer: [
    'FunnyTools es un proyecto independiente accesible en funnytools.win y mantenido bajo esa identidad editorial. El contacto es btcson66@gmail.com. El sitio ofrece gratuitamente herramientas y contenido general, sin cuenta y principalmente con procesamiento en el navegador. No está afiliado a administraciones, bancos, centros educativos, empleadores, organismos de evaluación, servicios sanitarios ni fuentes externas enlazadas.',
    'Los resultados son auxiliares. Una fórmula puede ser correcta y no incluir una excepción contractual; un archivo puede descargarse y perder metadatos; una estadística puede calcularse y ser metodológicamente inapropiada; un temporizador puede retrasarse; un sorteo informal puede no cumplir una regulación. Conserva entradas y originales, revisa la explicación de la página y contrasta decisiones importantes con la fuente competente.',
  ],
  sections: [
    {
      heading: 'Identificación del sitio y canal de contacto',
      paragraphs: [
        'El servicio se publica con el nombre FunnyTools en https://funnytools.win/. La identidad operativa mostrada al visitante es FunnyTools y el correo de contacto es btcson66@gmail.com. El proyecto no declara establecimiento permanente, inscripción mercantil ni oficina en España. La disponibilidad de una versión española no debe interpretarse como una afirmación distinta.',
        'La Ley española 34/2002 describe información general que determinados prestadores sujetos a su ámbito deben mantener accesible. Se enlaza como referencia de transparencia para visitantes en España, sin afirmar que una página pueda resolver por sí sola la jurisdicción aplicable. Si necesitas plantear una cuestión formal, indica país, URL y relación con el servicio para que pueda evaluarse el canal adecuado.',
      ],
    },
    {
      heading: 'Naturaleza y alcance del servicio',
      paragraphs: [
        'FunnyTools proporciona páginas estáticas, código ejecutado en el navegador, explicaciones, ejemplos y enlaces de comprobación. El acceso normal es gratuito y no requiere registro. El servicio se orienta a tareas cotidianas, aprendizaje y estimaciones preliminares. No existe una relación profesional individual ni una revisión humana de cada entrada o salida.',
        'La página específica forma parte del alcance: identifica unidades, supuestos, funciones y límites que no caben en este aviso general. Si existe una diferencia entre una cifra de la interfaz y una norma, contrato, convocatoria, expediente o sistema oficial, detén la decisión y verifica definiciones. Informar del caso permite revisar el sitio, pero no suspende plazos externos.',
      ],
    },
    {
      heading: 'No constituye asesoramiento profesional',
      paragraphs: [
        'El contenido no es asesoramiento jurídico, médico, fiscal, contable, financiero, de inversión, laboral, académico, estadístico profesional, arquitectónico ni de ingeniería. FunnyTools no conoce la identidad completa, el territorio, el contrato, la historia clínica, la política institucional ni la calidad de todos los datos necesarios para emitir una recomendación individual.',
        'Una explicación educativa puede ayudar a formular preguntas y repetir una operación. No debe utilizarse para retrasar atención médica, presentar una declaración, firmar una financiación, decidir una inversión, construir una instalación, impugnar una nota o ejercer un derecho sin consultar la documentación y el profesional o autoridad apropiados.',
      ],
    },
    {
      heading: 'Exactitud, redondeo y datos introducidos',
      paragraphs: [
        'El resultado depende de las entradas. Un signo, separador decimal, unidad, porcentaje, periodo, zona horaria o casilla puede cambiar la salida. La interfaz valida ciertos límites, pero no puede saber si el dato copiado es verdadero o corresponde a la definición exigida. Revisa la entrada mostrada y conserva una copia de la operación cuando importe.',
        'El redondeo visible puede diferir de un sistema que redondea cada paso, usa más decimales o aplica reglas reglamentarias. Las bibliotecas y navegadores también pueden representar números con límites de precisión. No fuerces una coincidencia modificando datos originales; identifica primero fórmula, unidad, orden de operaciones y criterio de redondeo.',
      ],
    },
    {
      heading: 'Dinero, salario, préstamos e inflación',
      paragraphs: [
        'Las herramientas financieras calculan escenarios a partir de cifras introducidas y fórmulas generales. No incorporan automáticamente retenciones personales, convenios, seguros, comisiones, productos vinculados, impuestos, límites, cambios de tipo, solvencia, riesgo de mercado o condiciones de una oferta. Una cuota estimada no es aprobación ni documento precontractual.',
        'El Banco de España presenta sus propios simuladores como apoyo y explica conceptos como TAE y coste. Incluso una herramienta institucional exige leer la documentación del producto. Para salario y horas, consulta nómina, contrato, convenio y autoridad; para impuestos, la administración o asesor habilitado; para inversión y deuda, documentación regulada y ayuda profesional.',
      ],
      link: {
        prefix: 'Consulta el método y las fuentes de la categoría de ',
        label: 'calculadoras de dinero',
        href: '/es/categorias/dinero/',
        suffix: ' antes de utilizar una estimación.',
      },
    },
    {
      heading: 'Educación, calificaciones y oposiciones',
      paragraphs: [
        'Una media, GPA, rango percentil o conversión de puntuación no sustituye la regla de la institución. Créditos, recuperaciones, mínimos, convocatorias, cupos y escalas pueden cambiar el resultado. La herramienta no accede al expediente ni certifica admisión, promoción, beca, oposición o posición oficial.',
        'Para trabajo docente, utiliza datos ficticios o autorizados y evita decisiones automáticas sobre alumnos. Un selector o agrupador puede apoyar una actividad, pero el docente conserva responsabilidad sobre accesibilidad, protección de datos, seguridad y criterios pedagógicos. Las bases de la convocatoria o el sistema oficial prevalecen sobre un ejemplo general.',
      ],
    },
    {
      heading: 'Estadística, investigación y resultados APA',
      paragraphs: [
        'Una prueba estadística depende de diseño, muestreo, independencia, distribución, medición, valores atípicos, datos ausentes y multiplicidad. Obtener p, intervalo, efecto o alfa no demuestra causalidad, calidad del instrumento ni validez del estudio. Los generadores de texto producen un borrador según entradas; no leen el contexto completo ni verifican que el análisis elegido sea adecuado.',
        'Conserva datos, sintaxis, versión del software y decisiones previas. Revisa los resultados con manuales, responsable metodológico, director o revisor. No introduzcas datos personales identificables. Para investigación regulada, sigue el comité, protocolo y plan de análisis aplicables.',
      ],
      link: {
        prefix: 'La categoría de ',
        label: 'estadística educativa',
        href: '/es/categorias/estadistica/',
        suffix: ' explica supuestos, selección de método y revisión del informe.',
      },
    },
    {
      heading: 'Salud, descansos y bienestar',
      paragraphs: [
        'Un recordatorio de pausa, cálculo de edad o contenido relacionado con hábitos no diagnostica, previene ni trata una enfermedad. El navegador puede retrasar un aviso y la frecuencia apropiada depende de actividad, condición y recomendaciones existentes. No utilices una pestaña como único recordatorio para medicación, emergencia o seguridad.',
        'Si existe dolor, síntomas, riesgo o una decisión clínica, contacta con un profesional o servicio competente. No envíes historias médicas al soporte. FunnyTools puede revisar si un botón o contador funciona según lo descrito, pero no interpretar una situación de salud.',
      ],
    },
    {
      heading: 'Tiempo, fechas y plazos',
      paragraphs: [
        'Los días calendario, laborables, hábiles administrativos y bancarios no son equivalentes. Festivos locales, inclusión de extremos, fin de mes, horario de verano y zona pueden alterar un resultado. La base del navegador puede estar desactualizada y un temporizador en segundo plano puede sufrir retrasos o suspensión.',
        'Para un plazo legal, contractual, de viaje, entrega o convocatoria, consulta la norma y el calendario oficiales y deja margen. Guarda fecha completa y zona; no uses “mañana” o un desplazamiento fijo para una reunión internacional. FunnyTools sirve como comprobación auxiliar, no como sello de presentación a tiempo.',
      ],
      link: {
        prefix: 'Revisa estas diferencias en ',
        label: 'herramientas de tiempo y fechas',
        href: '/es/categorias/tiempo/',
        suffix: '.',
      },
    },
    {
      heading: 'Azar, sorteos y decisiones',
      paragraphs: [
        'Los generadores aleatorios del navegador sirven para juegos, demostraciones y selecciones informales. Una apariencia aleatoria no prueba auditoría, imparcialidad normativa, ausencia de manipulación ni cumplimiento de bases. No se ofrecen como sistema certificado para loterías, apuestas, promociones reguladas, selección laboral o decisiones que afecten derechos.',
        'Antes de una actividad, fija lista, duplicados, exclusiones, número de ganadores y repetición. Para un sorteo formal utiliza bases, supervisión, registro y tecnología adecuada. Una ruleta no debe utilizarse para decisiones médicas, financieras, legales o de seguridad.',
    ],
    },
    {
      heading: 'PDF, imágenes, texto y conversiones',
      paragraphs: [
        'El procesamiento local reduce la transferencia del archivo a FunnyTools, pero no garantiza compatibilidad completa. Firmas, formularios, capas, transparencia, animación, perfiles de color, fuentes, adjuntos, metadatos o cifrado pueden cambiar o perderse. La memoria disponible limita tamaño y número de archivos.',
        'Conserva el original, descarga con otro nombre y abre la salida en un programa independiente. Comprueba páginas, legibilidad, orden, tamaño, color y requisitos del destino. No proceses material que no tienes derecho a utilizar ni concluyas que una conversión elimina datos sensibles sin inspeccionar el resultado.',
      ],
    },
    {
      heading: 'Dibujo, CAD y diagramas',
      paragraphs: [
        'La pizarra y el CAD 2D básico sirven para bocetos y geometría orientativa. No sustituyen un plano técnico con capas, restricciones, tolerancias, materiales, firma, normativa e impresión a escala. Una cota visible puede haber sido introducida de forma incorrecta y una captura cambia de tamaño sin conservar una escala física.',
        'No utilices la salida como plano de construcción, fabricación, instalación eléctrica, evacuación o seguridad. Cuando el destino exija SVG, DXF, DWG, PDF técnico u otro formato, prueba el flujo desde el principio con software y profesionales adecuados. Marca un boceto como tal para evitar que otra persona le atribuya precisión certificada.',
      ],
      link: {
        prefix: 'Consulta la diferencia entre boceto y entrega técnica en ',
        label: 'dibujo, CAD y diagramas',
        href: '/es/categorias/dibujo/',
        suffix: '.',
      },
    },
    {
      heading: 'Privacidad, confidencialidad y seguridad del dispositivo',
      paragraphs: [
        'Que una herramienta procese localmente no convierte un equipo compartido en confidencial. Extensiones, malware, capturas, portapapeles, copias de seguridad y políticas de una red pueden acceder a información. FunnyTools no solicita contraseñas, claves privadas, números completos de cuenta, documentos de identidad ni expedientes para calcular o prestar soporte.',
        'Utiliza datos mínimos, ficticios o anonimizados y borra descargas temporales cuando corresponda. La política de privacidad explica conexiones de navegación, analítica, publicidad, almacenamiento local y correo voluntario. Si una página se comporta de forma distinta a lo declarado, informa con un ejemplo sin datos reales.',
      ],
      link: {
        prefix: 'Lee la ',
        label: 'política de privacidad',
        href: '/es/privacidad/',
        suffix: ' antes de introducir información que pueda identificar a una persona.',
      },
    },
    {
      heading: 'Propiedad intelectual y permisos sobre el material',
      paragraphs: [
        'La capacidad técnica de abrir, convertir, comprimir, dibujar o descargar no concede derechos sobre el contenido. El usuario debe comprobar copyright, marca, licencia, privacidad, imagen, secreto y condiciones del proveedor. Un archivo disponible en Internet no es automáticamente reutilizable y eliminar metadatos o una marca visible no elimina derechos.',
        'El nombre, diseño, código y textos de FunnyTools tienen sus derechos y licencias aplicables. El uso normal de una herramienta no autoriza copiar el sitio completo, suplantarlo o redistribuir contenido como propio. Los resultados basados en entradas del usuario siguen sujetos a los derechos de esas entradas y a las reglas del destino.',
      ],
    },
    {
      heading: 'Fuentes externas, enlaces y servicios de terceros',
      paragraphs: [
        'Los enlaces a organismos, documentación y estándares ayudan a verificar una afirmación. FunnyTools no controla su disponibilidad, actualización, accesibilidad, seguridad ni política. Un enlace no es patrocinio ni aprobación de todas las opiniones del destino. Comprueba dominio, fecha y sección antes de enviar información.',
        'Google, Cloudflare, GitHub, Brevo y otros proveedores pueden aplicar sus propias condiciones y políticas cuando se utilizan sus funciones o dominios. Los anuncios no son recomendaciones del equipo. Si una página externa cambia, informa del enlace roto; no asumas que FunnyTools conserva una copia oficial.',
      ],
    },
    {
      heading: 'Disponibilidad, cambios y pérdida de datos',
      paragraphs: [
        'El sitio puede interrumpirse por red, alojamiento, mantenimiento, navegador, dispositivo o proveedor. Las herramientas pueden cambiar para corregir un error, mejorar compatibilidad, retirar una dependencia o cumplir un requisito. No se garantiza que una URL, interfaz o comportamiento permanezca idéntico indefinidamente.',
        'No utilices la pestaña como única copia. Conserva entradas, documentos originales y descargas verificadas. LocalStorage y caché pueden borrarse por el usuario, el navegador, la PWA o políticas del dispositivo. FunnyTools no ofrece recuperación de sesiones, historial de cuenta ni copia de seguridad de contenido local.',
      ],
    },
    {
      heading: 'Responsabilidad del usuario y límites legales',
      paragraphs: [
        'La persona usuaria decide si una herramienta es adecuada, introduce datos, revisa la salida y cumple la ley, contrato, licencia y política aplicables. Debe evitar usos que dañen a terceros, vulneren derechos, interfieran con el servicio o atribuyan al resultado una certificación inexistente.',
        'El servicio se ofrece con las limitaciones descritas y sin prometer ausencia total de errores. Cualquier exclusión o límite se aplica solo en la medida permitida por la ley correspondiente. Este aviso no reduce garantías, responsabilidades ni derechos que sean irrenunciables. La jurisdicción y efecto concreto dependen de los hechos y no se resuelven mediante una declaración genérica.',
      ],
    },
    {
      heading: 'Cómo resolver una duda antes de confiar en un resultado',
      paragraphs: [
        'Lee la página completa, identifica fórmula y entradas, repite un caso conocido y busca la sección de límites. En archivos, abre la salida. En fechas, escribe zona y criterio. En dinero o estadísticas, compara con una fuente competente. Si falta información para decidir, no rellenes el vacío con la cifra más favorable.',
        'Para un posible error del sitio, envía URL, versión, pasos y datos ficticios. Para derechos, salud, pagos, impuestos, empleo, estudios o seguridad, contacta además con el organismo o profesional adecuado. Una corrección técnica futura no recupera un plazo o decisión ya ejecutados.',
      ],
      link: {
        prefix: 'Prepara un informe seguro desde la ',
        label: 'página de contacto',
        href: '/es/contacto/',
        suffix: '.',
      },
    },
  ],
  faq: [
    { q: '¿Los resultados de FunnyTools son oficiales?', a: 'No. Son operaciones y apoyos generales. Una institución, contrato, norma, profesional o sistema oficial puede usar datos y reglas adicionales.' },
    { q: '¿FunnyTools ofrece asesoramiento financiero o legal?', a: 'No. Las explicaciones son educativas y no sustituyen análisis profesional de un caso, contrato, obligación o derecho.' },
    { q: '¿Una calculadora puede estar matemáticamente bien y dar una cifra distinta?', a: 'Sí. Definiciones, impuestos, comisiones, calendario, redondeo y condiciones no incluidas pueden producir otra cifra oficial.' },
    { q: '¿Un PDF procesado conserva firmas y metadatos?', a: 'No se garantiza. Conserva el original y revisa firma, formularios, capas, adjuntos, metadatos y legibilidad en otro lector.' },
    { q: '¿Puedo usar la ruleta para un sorteo oficial?', a: 'No como sistema certificado. Un sorteo regulado necesita bases, registro, supervisión y tecnología adecuadas a la norma aplicable.' },
    { q: '¿El CAD 2D sirve como plano de construcción?', a: 'No. Es una herramienta básica para bocetos; una entrega técnica requiere software, unidades, tolerancias, normas y revisión profesional.' },
    { q: '¿FunnyTools responde por una fuente externa enlazada?', a: 'No controla su contenido o disponibilidad. El enlace apoya una comprobación concreta; revisa dominio, fecha y política del proveedor.' },
    { q: '¿Este aviso elimina mis derechos como consumidor?', a: 'No. Ninguna limitación pretende excluir derechos o responsabilidades que una ley aplicable considere irrenunciables.' },
  ],
  review: {
    heading: 'Revisión previa a un uso importante',
    intro: 'La advertencia útil no es “bajo tu responsabilidad”, sino una lista concreta de lo que debe comprobarse.',
    checks: [
      { title: 'Entrada y método', text: 'Unidades, fecha, zona, fórmula, supuestos y redondeo coinciden con la fuente de destino.' },
      { title: 'Salida y original', text: 'La cifra se comparó o el archivo se abrió fuera de la herramienta; el original permanece intacto.' },
      { title: 'Autoridad correcta', text: 'Una decisión formal se verificó con contrato, organismo, institución o profesional competente.' },
    ],
  },
  sources: [
    {
      label: 'BOE: Ley 34/2002 de servicios de la sociedad de la información',
      href: 'https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758',
      note: 'Referencia española sobre información general y servicios de la sociedad de la información.',
    },
    {
      label: 'Banco de España: simuladores para clientes bancarios',
      href: 'https://clientebancario.bde.es/pcb/es/menu-horizontal/podemosayudarte/simuladores/',
      note: 'Ejemplos institucionales de cálculo orientativo y comprobación financiera.',
    },
    {
      label: 'MDN: setTimeout()',
      href: 'https://developer.mozilla.org/es/docs/Web/API/Window/setTimeout',
      note: 'Explica por qué un temporizador del navegador no garantiza ejecución exacta.',
    },
    {
      label: 'W3C WAI: tutorial de imágenes',
      href: 'https://www.w3.org/WAI/tutorials/images/',
      note: 'Referencia para alternativas textuales y comunicación de imágenes y diagramas.',
    },
  ],
};
