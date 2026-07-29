import type { SpanishInfoPage } from './es-pages';

const educationSources = [
  {
    label: 'Sistema Estatal de Indicadores de la Educación',
    href: 'https://www.educacionfpydeportes.gob.es/servicios-al-ciudadano/estadisticas/indicadores/sistema-estatal-indicadores.html',
    note: 'Fuente oficial para distinguir indicadores del sistema educativo, financiación, escolarización y resultados.',
  },
  {
    label: 'INEE: evaluación general del sistema educativo',
    href: 'https://www.educacionfpydeportes.gob.es/inee/evaluaciones-nacionales/evaluacion-general-sistema.html',
    note: 'Explica la necesidad de calidad, validez, fiabilidad y representatividad en las evaluaciones oficiales.',
  },
  {
    label: 'INTEF: orientaciones sobre herramientas digitales y protección de datos',
    href: 'https://intef.es/Noticias/orientaciones-sobre-el-uso-de-herramientas-digitales/',
    note: 'Referencia institucional para seleccionar herramientas educativas con atención a la privacidad.',
  },
];

export const spanishEducationStatisticsHub: SpanishInfoPage = {
  title: 'Centro de estadística educativa y evaluación',
  seoTitle: 'Estadística educativa: calculadoras, SPSS y APA 7 | FunnyTools',
  seoDescription: 'Centro en español para calcular puntuaciones, interpretar SPSS, redactar resultados APA 7 y comprobar datos de evaluación educativa sin registro.',
  keywords: [
    'estadística educativa',
    'calculadoras para docentes',
    'interpretar SPSS',
    'resultados APA 7',
    'puntuación T Z rango percentil',
    'evaluación educativa herramientas',
  ],
  eyebrow: 'De los datos de aula a un resultado comprobable',
  intro: 'Este centro reúne calculadoras, guías y flujos de trabajo para docentes, estudiantes, opositores e investigadores que necesitan resumir puntuaciones, comparar resultados o redactar un informe. La prioridad no es producir una cifra aislada, sino saber qué pregunta responde, qué supuestos tiene y cómo comprobarla.',
  directAnswer: [
    'Si tienes una lista de puntuaciones, empieza por describirla: tamaño de la muestra, media, mediana, rango y desviación típica. Si necesitas comparar una puntuación con su grupo, utiliza Z, T o rango percentil, pero conserva siempre la media, la desviación y la población de referencia. Si ya dispones de tablas de SPSS, identifica primero el diseño y después la fila correcta antes de redactar el resultado.',
    'FunnyTools sirve para cálculos preliminares, aprendizaje y control de coherencia. No sustituye el protocolo de un centro, las bases de una oposición, el análisis completo de un estudio ni una fuente estadística oficial. Repite los casos importantes en el programa exigido, documenta decisiones sobre datos ausentes y redondeo, y no introduzcas información identificable del alumnado cuando basten códigos o datos ficticios.',
  ],
  sections: [
    {
      heading: 'Elegir la herramienta desde la pregunta y no desde el nombre',
      paragraphs: [
        'Una media responde cuál es el centro aritmético; la desviación típica describe cuánto se separan los valores; una puntuación Z sitúa un resultado en unidades de desviación; una T transforma esa escala; el rango percentil indica el porcentaje del grupo que queda por debajo según la regla elegida. Ninguna medida reemplaza a las demás.',
        'Antes de calcular, escribe una frase de decisión: «quiero resumir esta clase», «quiero comparar una nota con el mismo baremo» o «quiero informar una diferencia entre grupos». Esa frase permite detectar entradas incompatibles. Comparar una Z calculada con la media de un curso y otra calculada con una convocatoria diferente no crea una clasificación válida.',
      ],
      links: [
        { label: 'Desviación estándar', href: '/es/herramientas/calculadora-desviacion-estandar/', description: 'Compara desviación poblacional y muestral con pasos visibles.' },
        { label: 'Calculadora de porcentajes', href: '/es/herramientas/calculadora-porcentajes/', description: 'Distingue porcentaje de una cantidad, proporción y variación porcentual.' },
        { label: 'Media ponderada', href: '/es/herramientas/calculadora-media-ponderada/', description: 'Aplica pesos explícitos y comprueba que todos usan la misma escala.' },
      ],
    },
    {
      heading: 'Puntuaciones Z, T y rango percentil sin mezclar baremos',
      paragraphs: [
        'La puntuación Z usa la media y la desviación típica del grupo de referencia. Una Z de 1 significa una desviación por encima de la media, no un 1 % ni una nota de 1. La puntuación T suele expresar la misma posición con media 50 y desviación 10, aunque una convocatoria puede definir otra transformación.',
        'El rango percentil no es una puntuación bruta y tampoco una probabilidad de aprobar. Depende de la distribución y de cómo se traten empates. Guarda el nombre del baremo, fecha, población, fórmula y redondeo. Si una convocatoria publica una tabla oficial, esa tabla prevalece sobre una conversión genérica.',
      ],
      links: [
        { label: 'Calculadora de puntuación Z', href: '/es/herramientas/calculadora-puntuacion-z/', description: 'Sitúa un valor respecto a la media y la desviación del mismo grupo.' },
        { label: 'Calculadora de puntuación T', href: '/es/herramientas/calculadora-puntuacion-t/', description: 'Transforma Z a una escala T e identifica el baremo utilizado.' },
        { label: 'Calculadora de rango percentil', href: '/es/herramientas/calculadora-rango-percentil/', description: 'Estima la posición relativa y explica el tratamiento de empates.' },
      ],
    },
    {
      heading: 'Notas, medias ponderadas y oposiciones docentes',
      paragraphs: [
        'En evaluación educativa, «promedio» puede significar media simple, media ponderada, nota final con mínimos o una combinación fijada por normativa. Introduce cada componente en su escala real y convierte los pesos a una misma unidad. Un bloque con peso 40 no equivale automáticamente a 40 puntos.',
        'Las oposiciones pueden combinar examen, méritos, entrevista o exposición con reglas distintas por administración y convocatoria. La calculadora ayuda a reproducir una fórmula publicada; no predice plazas, cortes ni revisiones. Conserva el documento oficial y contrasta el resultado antes de tomar una decisión.',
      ],
      links: [
        { label: 'Promedio de notas', href: '/es/herramientas/calculadora-promedio-notas/', description: 'Calcula media simple o ponderada y muestra el efecto de cada componente.' },
        { label: 'Nota de oposición docente', href: '/es/herramientas/calculadora-nota-oposicion-docente/', description: 'Modela pesos editables sin presentarlos como una regla oficial universal.' },
        { label: 'Percentil de posición en clase', href: '/es/herramientas/calculadora-percentil-ranking-clase/', description: 'Explica qué población y dirección de rango se están usando.' },
      ],
    },
    {
      heading: 'Interpretar SPSS antes de redactar una conclusión',
      paragraphs: [
        'Una tabla no se interpreta solo buscando un valor p menor que .05. Primero identifica variables, niveles de medida, grupos independientes o relacionados, tamaño muestral, valores ausentes y prueba solicitada. Después revisa supuestos y el estimador adecuado.',
        'En una prueba t independiente, Levene orienta la fila de varianzas, pero no demuestra por sí solo que el diseño sea correcto. En ANOVA, una interacción cambia la lectura de efectos principales. El intérprete ayuda a localizar campos; el archivo de datos, la sintaxis y las tablas completas siguen siendo la evidencia reproducible.',
      ],
      links: [
        { label: 'Intérprete de resultados SPSS', href: '/es/herramientas/interpretar-resultados-spss/', description: 'Guía la lectura de pruebas t, ANOVA, Levene y comparaciones.' },
        { label: 'Guía de Levene en SPSS', href: '/es/guias/prueba-levene-spss/', description: 'Separa homogeneidad de varianzas, elección de fila e interpretación.' },
        { label: 'Interacción en ANOVA de dos factores', href: '/es/guias/interaccion-anova-dos-factores/', description: 'Prioriza la interacción antes de resumir efectos principales.' },
      ],
    },
    {
      heading: 'Redacción APA 7 con estadístico, grados de libertad y contexto',
      paragraphs: [
        'Una oración estadística útil incluye la comparación, el estadístico, grados de libertad cuando corresponda, valor p, estimación y tamaño del efecto si el diseño lo permite. También necesita una interpretación sustantiva: quiénes participaron, qué se midió y en qué dirección aparece el resultado.',
        'El generador ordena campos y reduce errores de formato, pero no decide si la prueba era apropiada ni inventa cifras ausentes. Copia los valores directamente de la salida verificada, conserva más decimales durante el cálculo y aplica el redondeo solo al presentar.',
      ],
      links: [
        { label: 'Generador de informe APA 7', href: '/es/herramientas/generador-informe-apa-7/', description: 'Estructura resultados sin completar datos que no has proporcionado.' },
        { label: 'Prueba t en formato APA 7', href: '/es/guias/prueba-t-formato-apa-7/', description: 'Plantillas razonadas para t, p, intervalo y tamaño del efecto.' },
        { label: 'ANOVA en formato APA 7', href: '/es/guias/anova-formato-apa-7/', description: 'Conecta F, grados de libertad, p y comparaciones posteriores.' },
      ],
    },
    {
      heading: 'Privacidad y minimización de datos en el aula',
      paragraphs: [
        'Para aprender una fórmula no hace falta pegar nombres, correos, diagnósticos ni expedientes. Sustituye identificadores por códigos y utiliza ejemplos ficticios cuando compartas una captura o solicites ayuda. Aunque una herramienta procese localmente, el dispositivo, las extensiones y la política del centro también forman parte del riesgo.',
        'Comprueba la página concreta, el funcionamiento declarado y las orientaciones de tu institución antes de usar una herramienta con datos reales. El procesamiento local reduce transferencias, pero no convierte cualquier conjunto de datos en apropiado para un navegador compartido.',
      ],
      links: [
        { label: 'Cómo funcionan las herramientas', href: '/es/como-funcionan-las-herramientas/', description: 'Explica procesamiento local, pruebas y límites técnicos.' },
        { label: 'Política de privacidad', href: '/es/privacidad/', description: 'Distingue contenido de herramienta, navegación y servicios externos.' },
      ],
    },
    {
      heading: 'Flujo mínimo de comprobación antes de entregar',
      paragraphs: [
        'Registra la pregunta, origen de datos, población, exclusiones, fórmula, resultado sin redondear y resultado presentado. Ejecuta un caso pequeño cuyo resultado puedas obtener a mano. Revisa signos, unidades, separador decimal y denominador muestral o poblacional.',
        'Después abre el informe en su destino real, compara las cifras con la salida original y pide una segunda lectura si la decisión tiene consecuencias académicas. Una cadena de comprobación breve aporta más valor que varias calculadoras usadas sin criterio.',
      ],
      items: [
        'Define variable, grupo de referencia y unidad.',
        'Conserva una copia inalterada de los datos originales.',
        'Documenta exclusiones, ausentes y transformación de escalas.',
        'Repite al menos un caso conocido.',
        'Compara con la norma, convocatoria o programa exigido.',
        'Redacta la limitación junto al resultado.',
      ],
      link: { prefix: 'Para seguir una secuencia completa, abre el ', label: 'flujo de informe estadístico de investigación', href: '/es/flujos/informe-estadistico-investigacion/', suffix: '.' },
    },
    {
      heading: 'Diferenciar datos de aula e indicadores oficiales',
      paragraphs: [
        'Un resumen de una clase describe ese grupo y ese momento. No permite afirmar cómo funciona una comunidad autónoma o todo el sistema educativo. Los indicadores oficiales aplican definiciones, muestreo, controles y desagregaciones que una calculadora individual no reproduce.',
        'Cuando una pregunta trate escolarización, financiación, resultados nacionales o comparaciones territoriales, consulta el Ministerio, el INEE o el INE. Usa FunnyTools para aprender operaciones, preparar una comprobación o explicar una tabla, no para sustituir la fuente institucional.',
      ],
    },
  ],
  faq: [
    { q: '¿Qué calculadora debo usar para comparar una nota con su grupo?', a: 'Usa Z si tienes la media y desviación típica del mismo grupo. Puedes transformarla a T o interpretar su rango percentil, pero no mezcles baremos ni convocatorias.' },
    { q: '¿La puntuación T siempre tiene media 50?', a: 'Es una convención frecuente, no una ley universal. Comprueba la definición del test, convocatoria o institución antes de convertir.' },
    { q: '¿Un percentil 80 significa haber acertado el 80 %?', a: 'No. Describe una posición relativa respecto a un grupo y una regla de empates; no equivale al porcentaje de respuestas correctas.' },
    { q: '¿Puedo redactar APA 7 solo con el valor p?', a: 'No es suficiente. Incluye estadístico, grados de libertad, estimación, tamaño del efecto cuando proceda, contexto y dirección del resultado.' },
    { q: '¿Levene decide si una prueba t es válida?', a: 'Levene informa sobre homogeneidad de varianzas. El diseño, independencia, distribución, datos ausentes y pregunta de investigación requieren comprobaciones propias.' },
    { q: '¿Puedo introducir nombres reales de estudiantes?', a: 'Evítalo. Usa códigos o datos ficticios siempre que sea posible y sigue las instrucciones de privacidad del centro.' },
    { q: '¿Estas calculadoras sustituyen SPSS, R o una revisión metodológica?', a: 'No. Son útiles para aprender, estimar y controlar coherencia. Un análisis formal debe reproducirse con el método y software exigidos.' },
    { q: '¿Dónde encuentro todos los tutoriales relacionados?', a: 'La biblioteca española de guías organiza los contenidos por estadística, aula, documentos y escritura, con enlaces a cada herramienta.' },
  ],
  review: {
    heading: 'Cómo revisamos este centro',
    intro: 'La utilidad depende de que los enlaces conduzcan a páginas reales, las fórmulas declaren supuestos y las advertencias no se oculten detrás del resultado.',
    checks: [
      { title: 'Cobertura real', text: 'Solo enlazamos herramientas y guías publicadas; no presentamos funciones futuras como disponibles.' },
      { title: 'Trazabilidad', text: 'Cada cálculo importante debe poder repetirse con una fórmula, un caso conocido y una fuente de referencia.' },
      { title: 'Límite educativo', text: 'Se diferencia un resumen local de una estadística oficial, una estimación de una regla normativa y una ayuda de una decisión profesional.' },
    ],
  },
  sources: educationSources,
};

export const spanishGuideIndex: SpanishInfoPage = {
  title: 'Guías prácticas de FunnyTools en español',
  seoTitle: 'Guías de herramientas, estadística y aula | FunnyTools',
  seoDescription: 'Biblioteca de guías en español para estadística, APA 7, SPSS, tareas de aula, PDF, imágenes y escritura, con ejemplos y comprobaciones.',
  keywords: ['guías de herramientas online', 'tutoriales estadística educativa', 'guías APA 7 SPSS', 'herramientas para docentes', 'PDF sin subir archivos'],
  eyebrow: 'Aprender el método antes de pulsar el botón',
  intro: 'Esta biblioteca organiza las guías españolas por problema real. Cada recurso explica cuándo usar una herramienta, qué datos preparar, qué error evitar y cómo revisar el resultado. Puedes empezar por una pregunta concreta o recorrer una ruta completa de estadística, aula, documentos o escritura.',
  directAnswer: [
    'Elige primero el bloque que coincide con tu tarea. Para resultados académicos, comienza por estadística y APA 7. Para organizar una clase, usa selección, agrupamiento, temporización y gráficos. Para entregar documentos, revisa PDF, imágenes, tamaño de papel y privacidad. Para un ensayo, calcula límites y conserva un margen de seguridad.',
    'Las guías no son páginas de relleno ni copias del botón de la herramienta. Incluyen contexto, ejemplos reproducibles, límites, errores frecuentes, preguntas frecuentes y enlaces a fuentes. Si una regla depende de una convocatoria, revista, centro o plataforma, comprueba siempre el documento vigente antes de entregar.',
  ],
  sections: [
    {
      heading: 'Estadística descriptiva y puntuaciones normalizadas',
      paragraphs: [
        'Este bloque ayuda a pasar de una cifra bruta a una interpretación defendible. Empieza por identificar la población de referencia y conserva media, desviación, tamaño del grupo y fecha. Una transformación facilita comparar, pero no arregla un baremo equivocado.',
        'Lee primero la guía que responde a tu pregunta: posición respecto a la media, escala T, rango percentil, ponderación de una oposición o cálculo rápido de porcentajes.',
      ],
      links: [
        { label: 'Interpretar una puntuación Z', href: '/es/guias/puntuacion-z-interpretacion/', description: 'Signo, distancia a la media, valores extremos y grupo de referencia.' },
        { label: 'Interpretar una puntuación T', href: '/es/guias/puntuacion-t-interpretacion/', description: 'Transformación desde Z, escala habitual y límites del baremo.' },
        { label: 'Interpretar el rango percentil', href: '/es/guias/rango-percentil-interpretacion/', description: 'Posición relativa, empates y diferencia frente al porcentaje correcto.' },
        { label: 'Calcular la nota de oposición docente', href: '/es/guias/calcular-nota-oposicion-docente/', description: 'Pesos, escalas y comprobación contra las bases oficiales.' },
        { label: 'Calcular porcentajes con rapidez', href: '/es/guias/calcular-porcentajes-rapido/', description: 'Base, variación, descuento y errores de porcentajes sucesivos.' },
      ],
    },
    {
      heading: 'SPSS, pruebas t y redacción APA 7',
      paragraphs: [
        'Aquí la tarea no termina al localizar un valor p. Las guías ordenan diseño, supuestos, estadístico, grados de libertad, dirección, tamaño del efecto y redacción. Sirven para leer una salida con más criterio y detectar información ausente.',
        'No copies una plantilla sin adaptar variables y población. Si la interacción es relevante, no resumas los efectos principales como si funcionaran igual en todos los niveles.',
      ],
      links: [
        { label: 'Prueba de Levene en SPSS', href: '/es/guias/prueba-levene-spss/', description: 'Qué comprueba, cómo elegir la fila y qué no permite concluir.' },
        { label: 'Prueba t en formato APA 7', href: '/es/guias/prueba-t-formato-apa-7/', description: 'Estructura de resultado con estadístico, p, intervalo y efecto.' },
        { label: 'ANOVA en formato APA 7', href: '/es/guias/anova-formato-apa-7/', description: 'F, grados de libertad, p, comparaciones y narrativa.' },
        { label: 'Interacción en ANOVA de dos factores', href: '/es/guias/interaccion-anova-dos-factores/', description: 'Lectura de interacción y efectos simples sin conclusiones contradictorias.' },
      ],
    },
    {
      heading: 'Selección, grupos y ritmo de clase',
      paragraphs: [
        'La aleatoriedad puede repartir turnos, pero la equidad exige decisiones pedagógicas. Estas guías separan un sorteo transparente de una agrupación que debe considerar apoyos, conflictos, accesibilidad y objetivos de aprendizaje.',
        'Antes de proyectar nombres, minimiza datos personales. Conserva una lista maestra fuera de la pantalla pública y revisa ausencias, duplicados y pronunciación.',
      ],
      links: [
        { label: 'Crear grupos aleatorios en clase', href: '/es/guias/grupos-aleatorios-clase/', description: 'Tamaño de grupos, sobrantes, repetición y verificación.' },
        { label: 'Selector aleatorio de alumnos', href: '/es/guias/selector-aleatorio-alumnos/', description: 'Participación, modo sin repetir y alternativas de privacidad.' },
        { label: 'Temporizador para el aula', href: '/es/guias/temporizador-clase/', description: 'Bloques visibles, avisos, pausas y plan alternativo.' },
        { label: 'Agrupamientos equitativos', href: '/es/guias/agrupamientos-equitativos-aula/', description: 'Cuándo el azar no basta y qué criterios revisar después.' },
        { label: 'Ruleta y sorteos para clase', href: '/es/guias/ruleta-sorteos-clase/', description: 'Probabilidad, entradas duplicadas y comunicación del resultado.' },
      ],
    },
    {
      heading: 'Gráficos y comunicación de resultados escolares',
      paragraphs: [
        'Un gráfico de barras necesita categorías comparables, escala legible, título, unidad y fuente. Una imagen vistosa puede engañar si el eje se corta, se mezclan porcentajes y cantidades o faltan valores.',
        'La guía propone una revisión antes de pegar el gráfico en una presentación: suma, orden, etiquetas, contraste y correspondencia con la tabla original.',
      ],
      links: [
        { label: 'Gráfico de barras para un trabajo escolar', href: '/es/guias/grafico-barras-trabajo-escolar/', description: 'De la tabla al gráfico con ejes, unidades, fuente y control de lectura.' },
      ],
    },
    {
      heading: 'Códigos QR y materiales accesibles',
      paragraphs: [
        'Un QR es un acceso, no una explicación. Añade siempre una URL legible o una instrucción alternativa, prueba el contraste y escanea desde la distancia real. No codifiques datos personales ni credenciales.',
        'Si el recurso se usará impreso, comprueba el destino después de imprimir: tamaño, margen, iluminación y vigencia del enlace.',
      ],
      links: [
        { label: 'Códigos QR en el aula', href: '/es/guias/codigos-qr-en-el-aula/', description: 'Tamaño, contraste, URL alternativa, privacidad y prueba física.' },
      ],
    },
    {
      heading: 'PDF, fotos y preparación de entregas',
      paragraphs: [
        'Este bloque sigue el orden real de una entrega: capturar, ordenar, elegir papel, combinar, abrir el resultado y comprobar peso. Trabajar en el navegador reduce la transferencia de archivos, pero debes conservar originales y revisar firmas, formularios y legibilidad.',
        'No comprimas ni conviertas la única copia. Crea una carpeta de trabajo, usa nombres claros y abre el PDF final en otro lector antes de subirlo.',
      ],
      links: [
        { label: 'Fotos a PDF desde el móvil', href: '/es/guias/fotos-a-pdf-desde-movil/', description: 'Captura, orientación, orden, recorte y control de legibilidad.' },
        { label: 'A4 o US Letter para imprimir', href: '/es/guias/a4-o-letter-para-imprimir/', description: 'Tamaño de papel, márgenes, escalado y requisitos del destino.' },
        { label: 'Unir PDF sin subir archivos', href: '/es/guias/unir-pdf-sin-subir-archivos/', description: 'Privacidad local, orden, memoria, firmas y revisión del archivo final.' },
        { label: 'Comprimir fotos para email', href: '/es/guias/comprimir-fotos-para-email/', description: 'Dimensiones, peso, calidad y comprobación del mensaje recibido.' },
      ],
    },
    {
      heading: 'Límites de palabras y escritura académica',
      paragraphs: [
        'Un contador ayuda a controlar extensión, pero cada institución puede excluir portada, citas, notas, tablas o bibliografía. Identifica primero qué entra en el límite y deja margen para diferencias entre editores.',
        'No recortes palabras eliminando contexto esencial o referencias. Usa el recuento para planificar secciones y revisar, no para sustituir la calidad del argumento.',
      ],
      links: [
        { label: 'Límite de palabras en ensayos y exámenes', href: '/es/guias/limite-palabras-ensayos-examenes/', description: 'Qué puede contar, margen de seguridad y diferencias entre plataformas.' },
      ],
    },
    {
      heading: 'Cómo usar una guía como lista de control',
      paragraphs: [
        'Lee primero la respuesta directa y los límites. Ejecuta un ejemplo pequeño, anota los supuestos y compara la salida con una fuente o cálculo independiente. Después repite con tus datos y conserva los originales.',
        'Si detectas un paso ambiguo, no compenses el problema probando botones al azar. Vuelve a la definición, identifica la regla del destino y utiliza la página de soporte para enviar un caso ficticio reproducible.',
      ],
      items: [
        'Pregunta y resultado esperado escritos antes de empezar.',
        'Fuente oficial o regla del destino identificada.',
        'Datos minimizados y originales conservados.',
        'Caso conocido repetido con éxito.',
        'Salida abierta, leída y comprobada.',
        'Limitación incluida en la entrega cuando sea relevante.',
      ],
      link: { prefix: 'Para navegar por función, abre ', label: 'todas las herramientas en español', href: '/es/herramientas/', suffix: '.' },
    },
  ],
  faq: [
    { q: '¿Estas guías son traducciones del inglés?', a: 'No. Se redactan para consultas en español, con vocabulario, ejemplos, advertencias y fuentes adecuados a la tarea descrita.' },
    { q: '¿Qué guía debo leer antes de una prueba t?', a: 'Empieza por Levene si necesitas elegir la fila, continúa con la guía de prueba t APA 7 y conserva la salida completa para comprobar grados de libertad, p e intervalo.' },
    { q: '¿Puedo usar una plantilla APA sin modificar?', a: 'No. Sustituye variables, población, estadísticos y dirección reales; elimina cualquier campo que no corresponda y revisa las exigencias de tu institución.' },
    { q: '¿Los grupos aleatorios son siempre equitativos?', a: 'No. El azar distribuye sin preferencia, pero no conoce apoyos, conflictos, accesibilidad ni objetivos pedagógicos. Revisa el resultado antes de publicarlo.' },
    { q: '¿Un PDF local nunca sale del dispositivo?', a: 'La herramienta descrita como local procesa el archivo en la pestaña, pero el entorno del dispositivo y las extensiones también importan. Verifica la página concreta.' },
    { q: '¿A4 y Letter son intercambiables?', a: 'No tienen las mismas dimensiones. Comprueba el formato exigido y revisa saltos, márgenes y escalado después de convertir o imprimir.' },
    { q: '¿El contador de palabras coincide con cualquier plataforma?', a: 'Puede haber diferencias en guiones, cifras, notas o referencias. Deja margen y confirma la regla del sistema de entrega.' },
    { q: '¿Cómo comunico un error en una guía?', a: 'Usa la página de apoyo, indica URL, frase concreta, fuente y fecha. Envía un ejemplo ficticio y evita datos privados.' },
  ],
  review: {
    heading: 'Controles editoriales de la biblioteca',
    intro: 'Una biblioteca gana valor cuando cada enlace resuelve una intención distinta y la explicación permite comprobar el resultado.',
    checks: [
      { title: 'Sin páginas vacías', text: 'Cada guía publicada incluye método, ejemplos, errores, límites, FAQ y una herramienta o recurso aplicable.' },
      { title: 'Rutas comprobables', text: 'Los enlaces se validan en build, sitemap, canonical, hreflang, móvil y URL pública.' },
      { title: 'Advertencias visibles', text: 'Las reglas oficiales, privacidad y límites técnicos se presentan antes de una decisión irreversible.' },
    ],
  },
  sources: educationSources,
};

export const spanishWorkflowIndex: SpanishInfoPage = {
  title: 'Flujos de trabajo para estadística, aula y documentos',
  seoTitle: 'Flujos de trabajo con herramientas online | FunnyTools',
  seoDescription: 'Flujos de trabajo en español para combinar calculadoras, guías y herramientas de navegador con controles de datos, privacidad y entrega.',
  keywords: ['flujos de trabajo herramientas online', 'proceso informe estadístico', 'flujo de trabajo docente', 'comprobar documentos PDF', 'herramientas sin registro'],
  eyebrow: 'Una secuencia completa vale más que un botón aislado',
  intro: 'Los flujos de trabajo conectan varias decisiones: preparar la entrada, ejecutar la herramienta adecuada, revisar la salida y llevarla al destino. Este índice ofrece una ruta completa ya publicada y mapas prácticos para tareas frecuentes mientras se amplía la colección.',
  directAnswer: [
    'Un buen flujo define el resultado final antes de abrir una herramienta. Después ordena entradas, controles y entregables. En estadística, parte de la pregunta y termina con una tabla o párrafo reproducible. En el aula, protege datos, prueba la dinámica y prepara una alternativa. En documentos, conserva originales, transforma copias y abre el archivo final.',
    'FunnyTools no automatiza decisiones profesionales ni oculta pasos críticos. Cada herramienta puede ahorrar una operación, pero tú debes comprobar la regla, el contexto y la entrega. Las rutas siguientes enlazan únicamente páginas disponibles; no prometen funciones futuras ni presentan un ejemplo como norma universal.',
  ],
  sections: [
    {
      heading: 'Flujo publicado: del resultado estadístico al informe',
      paragraphs: [
        'La ruta completa empieza identificando diseño, variables, grupos y salida de SPSS. Después selecciona la fila adecuada, extrae estadístico, grados de libertad, p, intervalo y tamaño del efecto, y termina con una redacción APA 7 revisada contra la tabla original.',
        'Es apropiada para trabajos académicos y controles preliminares. No sustituye el archivo de sintaxis, el libro de códigos, el tratamiento de datos ausentes ni la revisión de una persona con responsabilidad metodológica.',
      ],
      links: [
        { label: 'Informe estadístico de investigación', href: '/es/flujos/informe-estadistico-investigacion/', description: 'Secuencia reproducible desde la salida de análisis hasta la frase y tabla final.' },
        { label: 'Intérprete de resultados SPSS', href: '/es/herramientas/interpretar-resultados-spss/', description: 'Ayuda a localizar campos sin decidir el diseño por ti.' },
        { label: 'Generador de informe APA 7', href: '/es/herramientas/generador-informe-apa-7/', description: 'Ordena resultados proporcionados sin inventar datos ausentes.' },
      ],
    },
    {
      heading: 'Mapa de trabajo para puntuaciones y baremos',
      paragraphs: [
        'Reúne puntuación bruta, media, desviación, tamaño y población de referencia. Comprueba que pertenecen a la misma convocatoria o grupo. Calcula Z, transforma a T si la definición lo pide y usa percentiles solo con una regla compatible.',
        'Entrega una tabla con datos de referencia, resultado sin redondear, resultado presentado y fuente del baremo. Si existe una tabla oficial, registra cualquier diferencia y utiliza el valor oficial.',
      ],
      links: [
        { label: 'Flujo para calcular nota de oposición docente', href: '/es/flujos/calcular-nota-oposicion-docente/', description: 'Convocatoria, pruebas, méritos, pesos, T, Z, PR y comparación oficial.' },
        { label: 'Centro de estadística educativa', href: '/es/estadisticas-educativas/', description: 'Explica cómo elegir la medida y conservar la trazabilidad.' },
        { label: 'Guía de puntuación Z', href: '/es/guias/puntuacion-z-interpretacion/', description: 'Primera etapa para situar una puntuación respecto a su grupo.' },
        { label: 'Guía de rango percentil', href: '/es/guias/rango-percentil-interpretacion/', description: 'Control de interpretación, empates y grupo de referencia.' },
      ],
    },
    {
      heading: 'Mapa de trabajo para preparar una sesión de aula',
      paragraphs: [
        'Limpia la lista, elimina duplicados, reemplaza nombres completos por identificadores cuando proceda y decide si necesitas azar, equilibrio o rotación. Prueba la proyección, el sonido y el temporizador antes de que llegue el grupo.',
        'Durante la actividad, explica la regla y permite una alternativa accesible. Después no conserves listas personales en un equipo compartido. Registra solo la información pedagógica que realmente necesitas.',
      ],
      links: [
        { label: 'Flujo de grupos y selección aleatoria en el aula', href: '/es/flujos/actividades-aleatorias-aula/', description: 'Lista mínima, grupos, turnos, ruleta, tiempo y revisión docente.' },
        { label: 'Selector aleatorio de alumnos', href: '/es/herramientas/selector-aleatorio-alumnos/', description: 'Turnos con modo sin repetir y control de entradas.' },
        { label: 'Generador de grupos aleatorios', href: '/es/herramientas/generador-grupos-aleatorios/', description: 'Distribuye listas y permite revisar tamaños y sobrantes.' },
        { label: 'Temporizador Pomodoro', href: '/es/herramientas/temporizador-pomodoro/', description: 'Estructura bloques de trabajo cuando el contexto lo permite.' },
      ],
    },
    {
      heading: 'Mapa de trabajo para una entrega PDF',
      paragraphs: [
        'Crea una carpeta con originales y otra con copias de trabajo. Nombra los archivos en el orden previsto. Corrige orientación y páginas, combina las copias, abre el resultado y comprueba inicio, centro, final, formularios, enlaces y legibilidad.',
        'Comprueba el límite de tamaño y el formato del portal al final, porque cualquier edición posterior puede cambiar el peso. No elimines originales hasta recibir confirmación de la entrega.',
      ],
      links: [
        { label: 'Flujo para entregar un informe estudiantil', href: '/es/flujos/entrega-informe-estudiantil/', description: 'Consigna, palabras, fuentes, imágenes, PDF y confirmación del campus.' },
        { label: 'Flujo de documentos de oficina', href: '/es/flujos/documentos-oficina/', description: 'Originales, PDF, imágenes, fechas, QR, datos y entrega administrativa.' },
        { label: 'Unir PDF', href: '/es/herramientas/unir-pdf/', description: 'Combina copias en el navegador y conserva el orden elegido.' },
        { label: 'Ordenar páginas PDF', href: '/es/herramientas/ordenar-paginas-pdf/', description: 'Revisa miniaturas, números originales y continuidad.' },
        { label: 'Comprimir PDF', href: '/es/herramientas/comprimir-pdf/', description: 'Prueba una optimización estructural sin prometer un tamaño exacto.' },
      ],
    },
    {
      heading: 'Mapa de trabajo para imágenes destinadas a web o correo',
      paragraphs: [
        'Distingue dimensiones, formato, calidad y peso. Recorta para cambiar encuadre, redimensiona para cumplir píxeles y comprime al final. Una sola acción rara vez resuelve los cuatro requisitos.',
        'Abre la copia en el tamaño de visualización real, comprueba texto, caras, degradados y transparencia, y conserva una versión editable. Para correo, envía una prueba y verifica el archivo recibido.',
      ],
      links: [
        { label: 'Flujo para contenido de redes sociales', href: '/es/flujos/contenido-redes-sociales/', description: 'Texto, imagen, accesibilidad, derechos, enlace, QR y revisión móvil.' },
        { label: 'Recortar imagen', href: '/es/herramientas/recortar-imagen/', description: 'Define el encuadre sin confundirlo con redimensionar.' },
        { label: 'Redimensionar imagen', href: '/es/herramientas/redimensionar-imagen/', description: 'Ajusta píxeles manteniendo proporción cuando corresponde.' },
        { label: 'Comprimir imágenes', href: '/es/herramientas/comprimir-imagenes/', description: 'Reduce peso tras fijar dimensiones y formato.' },
      ],
    },
    {
      heading: 'Mapa de trabajo para datos de texto y CSV',
      paragraphs: [
        'Guarda una copia original, identifica codificación, delimitador, cabecera, separador decimal y filas irregulares. Prueba con pocas filas antes de convertir todo el archivo. Si una celda empieza con =, +, - o @, considera el riesgo de fórmula al abrirla en una hoja de cálculo.',
        'Después de convertir, compara conteo de filas, nombres de columnas, valores vacíos, caracteres acentuados y una muestra del principio y final. No utilices una conversión correcta como prueba de que el significado de los datos sea correcto.',
      ],
      links: [
        { label: 'CSV a JSON', href: '/es/herramientas/convertir-csv-a-json/', description: 'Controla delimitador, cabeceras, tipos y filas problemáticas.' },
        { label: 'JSON a CSV', href: '/es/herramientas/convertir-json-a-csv/', description: 'Aplana una tabla compatible y advierte sobre fórmulas.' },
        { label: 'Formatear y validar JSON', href: '/es/herramientas/formatear-validar-json/', description: 'Localiza errores sintácticos sin convertir JSON en código ejecutable.' },
      ],
    },
    {
      heading: 'Control común: entrada, proceso, salida y destino',
      paragraphs: [
        'Divide cualquier tarea en cuatro controles. Entrada: fuente, copia y datos mínimos. Proceso: herramienta, fórmula, versión y pasos. Salida: formato, contenido, límites y caso conocido. Destino: requisitos, carga, lectura y confirmación.',
        'Esta estructura evita el error más común de las herramientas rápidas: obtener algo que parece correcto y descubrir demasiado tarde que no cumple el sistema de entrega.',
      ],
      items: [
        'Entrada: origen, permiso, escala, codificación y copia intacta.',
        'Proceso: regla elegida, parámetros, versión y prueba conocida.',
        'Salida: cifras, páginas, dimensiones, texto y limitaciones.',
        'Destino: formato, peso, accesibilidad, privacidad y confirmación.',
      ],
    },
    {
      heading: 'Cuándo detener el flujo y pedir una revisión',
      paragraphs: [
        'Detén la tarea si falta la regla oficial, los datos mezclan poblaciones, el archivo está cifrado o firmado, el navegador agota memoria, el resultado cambia entre intentos o la entrega afecta a derechos, salud, finanzas o una evaluación formal.',
        'Pedir revisión no es un fallo del flujo. Es un control previsto. Conserva capturas con datos ficticios, mensajes de error, versión del navegador y pasos exactos; así una segunda persona puede reproducir el problema sin recibir información confidencial.',
      ],
      link: { prefix: 'Para comunicar un caso reproducible, utiliza ', label: 'la página de apoyo', href: '/es/apoyar-funnytools/', suffix: '.' },
    },
  ],
  faq: [
    { q: '¿Qué diferencia hay entre una herramienta y un flujo de trabajo?', a: 'La herramienta ejecuta una operación. El flujo incluye preparación, decisión, comprobación y entrega, y puede combinar varias herramientas.' },
    { q: '¿Todos los mapas de esta página son flujos publicados completos?', a: 'No. El informe estadístico tiene una página completa; los demás son mapas operativos con enlaces reales que se ampliarán sin prometer rutas inexistentes.' },
    { q: '¿Por qué debo conservar el original?', a: 'Una transformación puede perder metadatos, páginas, firmas, formato o precisión. El original permite repetir y comparar.' },
    { q: '¿Puedo usar datos reales del alumnado?', a: 'Minimiza y seudonimiza. Sigue la política del centro y evita nombres o diagnósticos cuando un código o ejemplo ficticio sea suficiente.' },
    { q: '¿Cómo compruebo un cálculo?', a: 'Usa un caso pequeño conocido, revisa fórmula y unidades, conserva valores sin redondear y compara con la fuente o software exigido.' },
    { q: '¿Comprimir es lo mismo que redimensionar?', a: 'No. Redimensionar cambia píxeles; comprimir cambia la codificación o calidad. Puede ser necesario aplicar ambas en orden.' },
    { q: '¿Qué hago si el portal rechaza el archivo?', a: 'Lee el mensaje exacto, comprueba formato, tamaño, nombre, páginas y restricciones. No repitas conversiones a ciegas sobre la única copia.' },
    { q: '¿FunnyTools guarda el estado de todos los pasos?', a: 'No. Muchas herramientas trabajan en la pestaña y no crean una cuenta ni historial. Documenta tú los parámetros y conserva las salidas necesarias.' },
  ],
  review: {
    heading: 'Cómo comprobamos que un flujo aporta valor',
    intro: 'La secuencia debe terminar en un entregable verificable, no en una colección de enlaces.',
    checks: [
      { title: 'Punto de partida claro', text: 'Cada mapa indica qué información reunir y qué decisión tomar antes de usar la primera herramienta.' },
      { title: 'Controles intermedios', text: 'Se incluyen casos conocidos, copias, privacidad, límites técnicos y comparación con reglas externas.' },
      { title: 'Cierre observable', text: 'El flujo acaba al abrir, leer, cargar o confirmar la salida en su destino, no al descargarla.' },
    ],
  },
  sources: educationSources,
};
