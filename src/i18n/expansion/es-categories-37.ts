import type { SpanishInfoPage } from './es-pages';

export const spanishStatisticsCategory: SpanishInfoPage = {
  title: 'Herramientas de estadística educativa y análisis de datos',
  seoTitle: 'Calculadoras de estadística educativa gratis | FunnyTools',
  seoDescription: 'Calcula medias, porcentajes, desviación estándar, PR, Z, T, alfa de Cronbach y prueba t, e interpreta SPSS y APA 7 con criterios verificables.',
  keywords: [
    'calculadoras de estadística online',
    'estadística educativa',
    'calcular desviación estándar',
    'puntuación Z T rango percentil',
    'interpretar SPSS APA 7',
  ],
  eyebrow: 'Estadística educativa · resultados explicados · cálculo local',
  intro: 'Una cifra estadística solo resulta útil cuando se conoce la pregunta, la unidad de análisis, la fórmula y los datos que la produjeron. Esta colección organiza calculadoras para notas, porcentajes, dispersión, puntuaciones estandarizadas, fiabilidad, comparación de grupos y redacción de resultados. No sustituye un plan de análisis, una revisión metodológica ni las normas de evaluación de un centro: ayuda a ejecutar y comprobar pasos concretos sin ocultar los supuestos.',
  directAnswer: [
    'Para describir datos, empieza por media, mediana, rango y desviación estándar. Para situar una puntuación, usa Z, T o rango percentil solo con un grupo de referencia definido. Para combinar componentes, usa media ponderada o el simulador de oposición con pesos que sumen lo previsto. Para investigación, revisa alfa de Cronbach, prueba t de Welch, salida de SPSS y redacción APA 7 como piezas distintas del proceso.',
    'Introduce datos anonimizados y conserva la tabla original. Anota si trabajas con población o muestra, cómo se trataron valores ausentes, qué redondeo exige el documento final y qué versión del análisis se comunica. FunnyTools calcula en la pestaña, pero la corrección sustantiva depende del diseño, de la calidad de los datos y de una interpretación que no confunda asociación con causalidad.',
  ],
  sections: [
    {
      heading: 'Qué herramienta estadística elegir según la pregunta',
      paragraphs: [
        'Formula primero una pregunta operativa. “¿Cuál es el rendimiento típico?” conduce a medidas de tendencia central; “¿cuánto varían las notas?” exige dispersión; “¿dónde queda esta puntuación respecto al grupo?” requiere una norma, Z, T o percentil; “¿difieren dos grupos?” plantea una comparación inferencial. Abrir una calculadora antes de definir la pregunta favorece resultados correctos para el problema equivocado.',
        'Escribe unidad, población, periodo y variable: estudiantes de un curso, respuestas por ítem, puntuaciones de una convocatoria o porcentajes de una rúbrica. Decide también si necesitas describir la muestra o generalizar a una población. Una herramienta puede ejecutar una fórmula, pero no puede decidir si los casos son independientes, si la muestra es pertinente o si una variable ordinal admite el resumen elegido.',
      ],
    },
    {
      heading: 'Media, mediana y distribución antes de resumir',
      paragraphs: [
        'La media utiliza todos los valores y responde bien a cambios extremos; la mediana identifica el centro por orden y suele resistir mejor una cola o un dato atípico. Ninguna es automáticamente superior. En una clase bastante simétrica pueden coincidir; en tiempos de respuesta, ingresos o puntuaciones con techo pueden contar historias diferentes. Calcula ambas y observa el conjunto antes de escoger una para el informe.',
        'No mezcles escalas, cursos o versiones de una prueba sin justificarlo. Revisa mínimos, máximos, repeticiones y valores imposibles. Un cero puede significar desempeño real, ausencia o dato no registrado; tratar esos significados como el mismo número cambia la media. Conserva un diccionario de variables y documenta cualquier exclusión para que otra persona pueda reconstruir el resumen.',
      ],
      link: {
        prefix: 'Resume listas y compara centro y dispersión con la ',
        label: 'Calculadora de desviación estándar',
        href: '/es/herramientas/calculadora-desviacion-estandar/',
        suffix: ' antes de interpretar una sola cifra.',
      },
    },
    {
      heading: 'Desviación estándar de muestra o de población',
      paragraphs: [
        'La desviación estándar expresa la distancia típica respecto a la media en las mismas unidades que los datos. La versión poblacional divide por N; la muestral utiliza N − 1 para estimar la variabilidad de una población a partir de una muestra. La elección no depende de qué resultado parezca mejor, sino de si los datos abarcan la población definida o son una muestra de ella.',
        'Una desviación pequeña no implica calidad ni justicia: solo indica concentración alrededor de la media. Una grande puede reflejar heterogeneidad real, una mezcla de grupos, errores de registro o una escala amplia. Informa tamaño de muestra, media, desviación y contexto; si hay asimetría o valores extremos, añade mediana, rango intercuartílico o una visualización apropiada.',
      ],
    },
    {
      heading: 'Porcentajes, proporciones y cambio porcentual',
      paragraphs: [
        '“El 20 % de 80”, “16 representa qué porcentaje de 80” y “de 80 a 96, cuánto aumentó” son operaciones distintas. En el cambio porcentual, el denominador suele ser el valor inicial; invertirlo modifica la respuesta. Cuando el valor inicial es cero, el cambio relativo no queda definido de la forma habitual y conviene informar la diferencia absoluta.',
        'Distingue puntos porcentuales de porcentaje de cambio. Pasar del 40 % al 50 % son 10 puntos porcentuales y un aumento relativo del 25 %. En educación, una tasa de aprobados no equivale a la media de notas y puede depender del criterio de corte. Etiqueta numerador, denominador, periodo y población para evitar una cifra sin referente.',
      ],
      link: {
        prefix: 'Resuelve los tres tipos de operación con la ',
        label: 'Calculadora de porcentajes',
        href: '/es/herramientas/calculadora-porcentajes/',
        suffix: ' y escribe qué representa cada valor.',
      },
    },
    {
      heading: 'Media ponderada para notas y componentes',
      paragraphs: [
        'Una media ponderada multiplica cada valor por su peso y divide por la suma de pesos. Comprueba si los pesos se expresan como 40 y 60 o como 0,40 y 0,60, y si el sistema normaliza automáticamente. No uses una media simple cuando créditos, preguntas o bloques tienen importancias distintas; tampoco dupliques un peso que ya está incorporado en la puntuación.',
        'Antes de comunicar una nota final, documenta ausencias, recuperaciones, mínimos por bloque, bonificaciones y redondeo. Dos plataformas pueden producir cifras diferentes si una ignora elementos vacíos y otra los trata como cero. Reproduce un caso manual pequeño y conserva las reglas oficiales del curso junto al cálculo.',
      ],
      link: {
        prefix: 'Combina valores y pesos con la ',
        label: 'Calculadora de media ponderada',
        href: '/es/herramientas/calculadora-media-ponderada/',
        suffix: ' sin perder la suma de pesos.',
      },
    },
    {
      heading: 'Promedio de notas y GPA no son la misma escala',
      paragraphs: [
        'El promedio de notas puede usar puntos, porcentajes o pesos propios del centro. El GPA transforma calificaciones a una escala institucional y suele ponderar por créditos. No existe una conversión universal entre 0–10, porcentajes, letras y escalas 4,0 o 4,3. Si una universidad publica su propia tabla, esa tabla prevalece sobre cualquier estimador genérico.',
        'Registra créditos intentados, asignaturas excluidas, repetición, aprobado/no aprobado y decimales. Usa el resultado para planificación personal, no como certificado. Un expediente oficial puede aplicar reglas que una calculadora pública no conoce.',
      ],
      link: {
        prefix: 'Para listas de actividades usa la ',
        label: 'Calculadora de promedio de notas',
        href: '/es/herramientas/calculadora-promedio-notas/',
        suffix: ' y reserva GPA para una escala académica definida.',
      },
    },
    {
      heading: 'Puntuación Z: distancia respecto a una referencia',
      paragraphs: [
        'La puntuación Z se obtiene restando la media y dividiendo por la desviación estándar. Z = 1 indica una puntuación una desviación por encima de la media del grupo usado; no significa “el 1 % superior” ni garantiza una posición exacta. Si la desviación es cero, todas las puntuaciones son iguales y la estandarización no puede realizarse.',
        'La referencia debe acompañar al resultado: prueba, convocatoria, edad, curso, periodo y método de cálculo. Comparar Z de dos pruebas puede ser útil si cada una se estandarizó con una norma pertinente, pero no vuelve equivalentes los constructos ni corrige una medición deficiente.',
      ],
      link: {
        prefix: 'Calcula y documenta la referencia con la ',
        label: 'Calculadora de puntuación Z',
        href: '/es/herramientas/calculadora-puntuacion-z/',
        suffix: ' sin convertirla en percentil de forma automática.',
      },
    },
    {
      heading: 'Puntuación T y otras escalas estandarizadas',
      paragraphs: [
        'La puntuación T habitual en contextos educativos y psicológicos transforma Z a una escala con media 50 y desviación 10 mediante T = 50 + 10Z. Así evita muchos valores negativos, pero conserva el mismo orden relativo. Otros sistemas pueden usar otra media, otra desviación o incluso invertir la dirección; verifica el manual antes de aplicar una fórmula conocida.',
        'Una T alta no es siempre mejor. En una escala de síntomas puede indicar mayor dificultad; en rendimiento puede indicar mayor resultado. El nombre de la variable, la dirección y el grupo normativo son esenciales. Evita mezclar la T estandarizada con el estadístico t de una prueba de hipótesis.',
      ],
      link: {
        prefix: 'Convierte Z a la escala habitual con la ',
        label: 'Calculadora de puntuación T',
        href: '/es/herramientas/calculadora-puntuacion-t/',
        suffix: ' y especifica qué significa una puntuación alta.',
      },
    },
    {
      heading: 'Rango percentil, percentil y ranking de clase',
      paragraphs: [
        'El rango percentil expresa la proporción de casos situada por debajo de una puntuación, con una convención para empates. Un percentil es un punto de corte de la distribución. Son conceptos relacionados, no intercambiables. Con muchos empates, dos métodos de asignación pueden dar resultados distintos; declara la fórmula y conserva los conteos por debajo e iguales.',
        'El ranking de clase parte de una posición y un total, pero una estimación porcentual no revela la distribución de notas. Primero de 20 y primero de 200 ocupan la mejor posición, aunque la precisión y el contexto difieran. No uses un percentil estimado para inferir probabilidad de admisión sin datos y reglas del proceso real.',
      ],
      link: {
        prefix: 'Para empates y conteos usa la ',
        label: 'Calculadora de rango percentil',
        href: '/es/herramientas/calculadora-rango-percentil/',
        suffix: ' y separa ese resultado del ranking administrativo.',
      },
    },
    {
      heading: 'Normalizar puntuaciones sin inventar comparabilidad',
      paragraphs: [
        'Una transformación lineal cambia media y desviación objetivo, pero mantiene posiciones relativas y asimetría. Puede facilitar la lectura de escalas distintas; no convierte automáticamente dos exámenes en equivalentes. Para equiparación real pueden ser necesarios diseños comunes, ítems de anclaje o modelos especializados.',
        'Comprueba la media y desviación de origen, la dirección de la escala y el redondeo. Si la norma se calculó con una población distinta, el resultado puede parecer preciso sin ser pertinente. Guarda valores sin redondear hasta el final y explica la transformación en el informe.',
      ],
      link: {
        prefix: 'Prueba una transformación explícita con el ',
        label: 'Conversor de puntuaciones estandarizadas',
        href: '/es/herramientas/conversor-puntuaciones-estandarizadas/',
        suffix: ' y conserva la escala original.',
      },
    },
    {
      heading: 'Alfa de Cronbach: consistencia, no validez',
      paragraphs: [
        'El alfa de Cronbach resume la consistencia interna bajo supuestos concretos. Un valor alto no demuestra que la escala sea unidimensional, válida o adecuada para una decisión individual; también puede aumentar por añadir ítems muy parecidos. Un valor bajo puede reflejar pocos ítems, heterogeneidad, errores de codificación o reactivos invertidos sin recodificar.',
        'Revisa matriz de datos, valores ausentes, rango de cada ítem, dirección y tamaño de muestra. Informa número de ítems, muestra, procedimiento de tratamiento y alfa con precisión razonable. Para trabajo formal, acompaña el índice con análisis de ítems, estructura y argumentos de validez.',
      ],
      link: {
        prefix: 'Estima la consistencia desde datos por persona e ítem con la ',
        label: 'Calculadora de alfa de Cronbach',
        href: '/es/herramientas/calculadora-alfa-cronbach/',
        suffix: ' sin presentarla como prueba única de calidad.',
      },
    },
    {
      heading: 'Prueba t de Welch para dos grupos independientes',
      paragraphs: [
        'La prueba t de Welch compara medias de dos grupos independientes y no exige varianzas iguales. Necesita tamaño, media y desviación de cada grupo. No debe utilizarse para medidas repetidas de las mismas personas, parejas emparejadas o más de dos grupos. Independencia, calidad de medición y forma de la distribución siguen siendo relevantes.',
        'Un p pequeño no mide magnitud ni importancia. Informa diferencia de medias, intervalo de confianza y tamaño del efecto cuando proceda, además de t, grados de libertad y p. Si el análisis no estaba previsto, distingue resultados confirmatorios y exploratorios.',
      ],
      link: {
        prefix: 'Calcula Welch desde estadísticos resumen con la ',
        label: 'Prueba t para muestras independientes',
        href: '/es/herramientas/calculadora-t-muestras-independientes/',
        suffix: ' y no omitas la diferencia observada.',
      },
    },
    {
      heading: 'Interpretar SPSS sin copiar una tabla a ciegas',
      paragraphs: [
        'Una salida de SPSS contiene varias filas y decisiones. En una prueba t, la fila asociada a igualdad de varianzas depende de la comprobación y del método adoptado; en ANOVA, el efecto global no identifica qué grupos difieren; en un diseño factorial, un efecto principal puede requerir lectura conjunta con la interacción. Copiar el primer p visible es una fuente frecuente de errores.',
        'Introduce valores estructurados y coteja nombres de variables, grupos, signos, grados de libertad y decimales con la salida original. El asistente ofrece una lectura guiada, no examina el archivo .sav ni conoce el diseño. Si el estudio afecta decisiones importantes, una persona con formación metodológica debe revisar el modelo completo.',
      ],
      link: {
        prefix: 'Ordena valores concretos con el ',
        label: 'Asistente para interpretar SPSS',
        href: '/es/herramientas/interpretar-resultados-spss/',
        suffix: ' mientras mantienes abierta la tabla original.',
      },
    },
    {
      heading: 'Redactar resultados APA 7 con información suficiente',
      paragraphs: [
        'El formato APA organiza símbolos, estadísticos, grados de libertad y p, pero una frase bien puntuada puede seguir siendo incompleta. Añade dirección, unidades, tamaño del efecto e intervalo de confianza según el análisis y las normas de la publicación. No escribas p = .000; informa el límite apropiado que permite el software.',
        'El generador transforma campos en una oración editable. Revisa cursivas, redondeo, coherencia entre texto y tabla, y si el análisis responde a la hipótesis. Los estándares de reporte buscan transparencia para que el lector pueda evaluar qué se hizo, no una fórmula que sustituya métodos y resultados.',
      ],
      link: {
        prefix: 'Prepara un borrador comprobable con el ',
        label: 'Generador de resultados APA 7',
        href: '/es/herramientas/generador-informe-apa-7/',
        suffix: ' y edítalo dentro del contexto del estudio.',
      },
    },
    {
      heading: 'Privacidad y minimización de datos educativos',
      paragraphs: [
        'No pegues nombres, correos, identificadores, diagnósticos ni expedientes completos para calcular una media. Sustituye personas por códigos y utiliza solo las columnas necesarias. El procesamiento local reduce la transferencia a FunnyTools, pero no elimina riesgos del dispositivo, extensiones, capturas, portapapeles o una red administrada.',
        'La AEPD recuerda que los datos del alumnado deben tratarse para finalidades educativas legítimas y con deber de confidencialidad. Sigue la política del centro, usa entornos aprobados y conserva resultados en ubicaciones autorizadas. Para ejemplos o soporte, crea datos ficticios que conserven la estructura sin identificar a nadie.',
      ],
    },
    {
      heading: 'Lista de comprobación antes de publicar un resultado',
      paragraphs: [
        'Confirma pregunta, muestra, variables, unidades, exclusiones, valores ausentes, fórmula, supuestos y redondeo. Repite un caso pequeño de forma manual y compara el signo, el orden de grupos y la magnitud. Guarda la entrada, la salida y la versión de reglas utilizada.',
        'Informa límites junto a hallazgos. Separa descripción de inferencia, significación estadística de relevancia práctica y asociación de causalidad. Una respuesta fiable permite a otra persona seguir el camino desde los datos hasta la frase final y detectar dónde cambiaría la conclusión.',
      ],
    },
  ],
  faq: [
    { q: '¿Qué calculadora estadística debo usar primero?', a: 'Empieza por la pregunta y por describir los datos. Media, mediana, rango y desviación suelen preceder a puntuaciones estandarizadas o pruebas de hipótesis.' },
    { q: '¿La desviación estándar debe ser muestral o poblacional?', a: 'Usa población si los datos abarcan toda la población definida; usa la fórmula muestral cuando estimas a partir de una muestra. Declara la elección.' },
    { q: '¿Una puntuación Z de 1 equivale al percentil 84?', a: 'Solo se aproxima bajo una distribución normal y una referencia adecuada. Z y rango percentil no deben intercambiarse sin comprobar la distribución.' },
    { q: '¿Un alfa de Cronbach alto prueba que la escala es válida?', a: 'No. Resume consistencia interna bajo supuestos; no demuestra por sí solo unidimensionalidad, validez ni utilidad de la decisión.' },
    { q: '¿Cuándo sirve la prueba t de Welch?', a: 'Para comparar la media de dos grupos independientes con tamaños, medias y desviaciones. No sirve para datos emparejados ni sustituye la revisión de supuestos.' },
    { q: '¿p menor que .05 significa un efecto importante?', a: 'No. El p no expresa tamaño ni relevancia. Revisa diferencia, intervalo, tamaño del efecto, diseño y contexto.' },
    { q: '¿El generador APA 7 escribe un informe definitivo?', a: 'Produce un borrador desde los valores introducidos. Debes cotejarlo con la salida, el diseño, las normas de la revista y el sentido del resultado.' },
    { q: '¿Puedo introducir notas con nombres del alumnado?', a: 'Evítalo. Utiliza códigos y las columnas mínimas, respeta la política del centro y no pegues expedientes personales en una herramienta web.' },
  ],
  review: {
    heading: 'Revisión de un análisis estadístico',
    intro: 'El resultado es defendible cuando datos, fórmula, interpretación y comunicación se pueden recorrer en ambos sentidos.',
    checks: [
      { title: 'Pregunta y datos', text: 'La población, muestra, variable, unidad, exclusiones y tratamiento de ausentes están definidos.' },
      { title: 'Método y supuestos', text: 'La fórmula o prueba corresponde al diseño y se conservaron valores suficientes para reproducirla.' },
      { title: 'Comunicación responsable', text: 'Se informan magnitud, incertidumbre, límites y privacidad sin convertir una asociación en causalidad.' },
    ],
  },
  sources: [
    { label: 'NIST/SEMATECH: Engineering Statistics Handbook', href: 'https://www.itl.nist.gov/div898/handbook/', note: 'Referencia pública sobre estadística descriptiva, distribuciones, pruebas y control de calidad.' },
    { label: 'APA: Journal Article Reporting Standards', href: 'https://apastyle.apa.org/jars', note: 'Estándares de transparencia para reportar investigación cuantitativa, cualitativa y mixta.' },
    { label: 'APA Dictionary: confidence interval', href: 'https://dictionary.apa.org/confidence-interval', note: 'Definición y relación entre amplitud del intervalo y precisión.' },
    { label: 'AEPD: guía para centros educativos', href: 'https://www.aepd.es/es/documento/guia-centros-educativos.pdf', note: 'Finalidad, confidencialidad y cautelas en el tratamiento de datos del alumnado.' },
  ],
};

export const spanishStudyCategory: SpanishInfoPage = {
  title: 'Herramientas para estudiantes y profesores',
  seoTitle: 'Herramientas para profesores y estudiantes gratis | FunnyTools',
  seoDescription: 'Organiza clases, selecciona alumnos, crea grupos y planos de asientos, calcula notas y GPA con privacidad, criterios de equidad y revisión docente.',
  keywords: [
    'herramientas para profesores online',
    'herramientas para estudiantes gratis',
    'selector aleatorio alumnos',
    'generador grupos clase',
    'calculadora notas GPA',
  ],
  eyebrow: 'Aula y estudio · privacidad · decisiones revisables',
  intro: 'La tecnología de aula aporta valor cuando reduce tareas mecánicas sin sustituir el criterio docente. Esta colección reúne selección de alumnos, agrupamientos, planos de asientos, promedios y GPA. Cada herramienta resuelve un paso delimitado; la inclusión, las adaptaciones, la evaluación formativa y el registro oficial siguen correspondiendo al centro y al profesorado. Usa listas mínimas, conserva los originales y revisa cualquier resultado antes de aplicarlo.',
  directAnswer: [
    'Para participación oral, usa el selector sin repetición y ofrece formas alternativas de responder. Para trabajo cooperativo, genera grupos y revisa tamaño, apoyos, conflictos y roles. Para el aula física, crea un primer plano de asientos y ajústalo por accesibilidad, visión, audición y seguridad. Para notas, confirma escala, pesos, ausencias, recuperación y redondeo antes de aceptar el promedio o GPA.',
    'Las herramientas españolas funcionan dentro de la pestaña y no exigen cuenta. Aun así, evita nombres completos cuando bastan iniciales o códigos, no pegues información médica o disciplinaria y no trates un resultado aleatorio como demostración automática de equidad. Una decisión educativa de calidad combina procedimiento transparente, revisión humana y posibilidad de corregir.',
  ],
  sections: [
    {
      heading: 'Elegir una herramienta a partir de la necesidad didáctica',
      paragraphs: [
        'Describe el problema antes de abrir la página: distribuir turnos, formar equipos, ubicar mesas o comprobar una nota. Define qué resultado sería aceptable y qué restricciones no pueden sortearse. Si el objetivo es aprendizaje cooperativo, el producto no es simplemente una lista mezclada; necesita grupos capaces de participar, roles comprensibles y una actividad con criterios claros.',
        'Separa decisiones reversibles de decisiones oficiales. Cambiar parejas para una actividad breve es fácil de corregir; registrar una calificación o asignar una adaptación requiere más evidencia y la política del centro. Utiliza la automatización para preparar opciones, no para transferir una responsabilidad que necesita contexto profesional.',
      ],
    },
    {
      heading: 'Preparar una lista de clase con datos mínimos',
      paragraphs: [
        'Incluye solo lo necesario para identificar turnos durante la sesión. Un nombre de pila, inicial o código temporal suele bastar. Elimina números de expediente, correos, teléfonos, observaciones de conducta, diagnóstico, necesidades de apoyo y cualquier dato que no deba aparecer en una pantalla compartida.',
        'Comprueba duplicados, líneas vacías y variantes del mismo nombre antes de seleccionar o agrupar. Si dos estudiantes comparten nombre, añade una inicial neutra acordada. Conserva la lista oficial en el sistema autorizado; la lista de la herramienta debe ser una copia mínima y temporal, no un nuevo expediente paralelo.',
      ],
    },
    {
      heading: 'Seleccionar alumnos sin repetir no es obligar a responder',
      paragraphs: [
        'El selector sin repetición ayuda a distribuir oportunidades y permite completar una ronda antes de reiniciar. Explica el procedimiento al grupo y muestra cuándo se restablece. Evita volver a cargar la página tras un resultado inconveniente, porque esa práctica introduce una selección invisible y rompe la regla anunciada.',
        'La aleatoriedad no elimina barreras. Ofrece tiempo de preparación, respuesta escrita, apoyo entre pares o derecho a pasar según la actividad. Un estudiante puede requerir una adaptación que no debe revelarse públicamente. La herramienta decide una posición de lista; el docente decide cómo convertirla en una participación segura y significativa.',
      ],
      link: {
        prefix: 'Gestiona una ronda visible con el ',
        label: 'Selector aleatorio de alumnos',
        href: '/es/herramientas/selector-aleatorio-alumnos/',
        suffix: ' y conserva una alternativa de participación.',
      },
    },
    {
      heading: 'Crear grupos aleatorios y revisar su viabilidad',
      paragraphs: [
        'Elige si necesitas número de grupos o personas por grupo. Cuando la división no es exacta, algunas agrupaciones tendrán una persona más; decide de antemano cómo se reparte el resto. Genera una propuesta y cuenta miembros, duplicados y ausencias antes de proyectarla.',
        'Después revisa restricciones legítimas: accesibilidad, apoyos lingüísticos, seguridad, conflicto documentado, distribución de recursos y continuidad pedagógica. No uses etiquetas sensibles como campos visibles. Si necesitas equilibrar experiencia o roles, aplica una regla explícita y comprueba que no estigmatice a nadie.',
      ],
      link: {
        prefix: 'Obtén una primera distribución con ',
        label: 'Crear grupos para clase',
        href: '/es/herramientas/crear-grupos-clase/',
        suffix: ' y ajusta solo con criterios pedagógicos justificables.',
      },
    },
    {
      heading: 'Diferencia entre grupos aleatorios y agrupamientos equilibrados',
      paragraphs: [
        'Un reparto puramente aleatorio ofrece la misma mecánica a cada nombre, pero puede concentrar experiencia, liderazgo o necesidades. Un agrupamiento equilibrado utiliza una característica elegida; mejora un objetivo concreto y a la vez puede introducir etiquetas o revelar información. Ningún método garantiza por sí mismo cooperación.',
        'Define qué se equilibra, por qué es relevante, quién puede ver esa información y cuándo dejará de usarse. Alterna métodos a lo largo del curso y evalúa resultados reales: participación, calidad del producto, apoyo mutuo y carga de trabajo. No perpetúes grupos “altos” y “bajos” como identidades fijas.',
      ],
    },
    {
      heading: 'Asignar roles para que el azar no concentre el trabajo',
      paragraphs: [
        'Una vez formados los grupos, reparte responsabilidades como coordinación, registro, comprobación, material y presentación. Describe qué debe producir cada rol y rota en sesiones posteriores. El rol no sustituye la responsabilidad colectiva, pero hace visible una distribución que puede revisarse.',
        'Ajusta roles a la actividad, no a estereotipos sobre personalidad, género o rendimiento. Permite intercambio cuando existe una barrera real y registra cambios sin convertirlos en sanción. Cierra la actividad con una breve revisión de contribuciones y de qué regla funcionó.',
      ],
    },
    {
      heading: 'Crear un plano de asientos como borrador revisable',
      paragraphs: [
        'Introduce filas, columnas y lista, genera una distribución y compárala con el aula real. Marca espacios no disponibles, pasillos, puertas, proyección y zonas de material. Una cuadrícula digital no conoce columnas, reflejos, ruido ni la distancia a la pizarra.',
        'Revisa visión, audición, movilidad, apoyo adulto, evacuación y trabajo por parejas. No publiques un plano con datos innecesarios en un enlace abierto. Exporta una versión mínima para uso autorizado y conserva la versión editable solo donde corresponda.',
      ],
      link: {
        prefix: 'Prepara la cuadrícula inicial con el ',
        label: 'Generador de plano de asientos',
        href: '/es/herramientas/crear-plano-asientos-aula/',
        suffix: ' y recorre físicamente el aula antes de fijarla.',
      },
    },
    {
      heading: 'Usar temporizadores sin convertir el tiempo en castigo',
      paragraphs: [
        'Un temporizador puede hacer visible la duración de una explicación, una transición o un trabajo autónomo. Anuncia qué ocurre al terminar y añade margen cuando la actividad requiere guardar, revisar o desplazarse. Para tareas complejas, utiliza avisos intermedios en lugar de una cuenta atrás sorpresiva.',
        'Algunos estudiantes necesitan más tiempo o menos presión visual. Ofrece ajustes y evita proyectar tiempos asociados a una persona. El navegador puede ralentizar pestañas en segundo plano, de modo que una evaluación formal o una alarma crítica debe utilizar el sistema aprobado del centro.',
      ],
    },
    {
      heading: 'Calcular promedios sin perder la política de evaluación',
      paragraphs: [
        'Antes de introducir notas, reúne la escala, los pesos y las reglas de mínimos. Distingue actividad no entregada, exenta y cero real. Define cómo se tratan recuperación, mejor intento, retraso y bonificaciones. Una calculadora no puede deducir estas decisiones de una celda vacía.',
        'Haz un caso manual y compara. Mantén más decimales durante el cálculo y redondea una sola vez según la norma. Conserva las evidencias y el libro oficial; una descarga o captura de una herramienta pública no sustituye el registro del centro.',
      ],
      link: {
        prefix: 'Comprueba cálculos con la ',
        label: 'Calculadora de promedio de notas',
        href: '/es/herramientas/calculadora-promedio-notas/',
        suffix: ' después de fijar pesos y ausencias.',
      },
    },
    {
      heading: 'Estimar GPA con la escala correcta',
      paragraphs: [
        'El GPA combina puntos de calificación y créditos. Las escalas 4,0 y 4,3, las equivalencias de letras, las asignaturas repetidas y los cursos avanzados varían entre instituciones. Selecciona la tabla publicada por la organización que recibirá el expediente; si no existe una conversión oficial, presenta el resultado como estimación.',
        'No conviertas directamente un 8,5/10 a una letra sin norma. Comprueba créditos intentados y obtenidos, materias sin calificación y periodos incluidos. Para admisión, beca o titulación, utiliza siempre el cálculo certificado por la institución.',
      ],
      link: {
        prefix: 'Ensaya escenarios con la ',
        label: 'Calculadora GPA',
        href: '/es/herramientas/calculadora-gpa/',
        suffix: ' sin atribuirle valor oficial.',
      },
    },
    {
      heading: 'Evaluación formativa más allá de la nota',
      paragraphs: [
        'La normativa educativa española insiste en procedimientos variados, accesibles y adaptados, y en que la evaluación apoye el aprendizaje mientras ocurre. Un promedio resume resultados ya codificados; no observa estrategia, progreso, explicación, colaboración ni necesidad de apoyo. Combínalo con rúbricas, listas de cotejo, producciones, conversación y autoevaluación.',
        'Explica criterios antes de la tarea y devuelve información que permita actuar. Evita utilizar la selección aleatoria como única evidencia de participación o una prueba breve como representación total del aprendizaje. La herramienta ahorra tiempo de cálculo para dedicarlo a interpretar evidencias.',
      ],
    },
    {
      heading: 'Accesibilidad, diversidad y no discriminación',
      paragraphs: [
        'Revisa si la actividad admite lectura, escritura, oralidad, apoyos visuales y tiempos diferentes. Un plano, grupo o turno generado puede entrar en conflicto con ajustes razonables. Corrige sin revelar el motivo al resto de la clase y sin presentar el cambio como privilegio.',
        'Evita inferir capacidad a partir de una sola nota o de la frecuencia con que alguien responde. La evaluación debe ofrecer oportunidades pertinentes y procedimientos comprensibles. Si una regla perjudica repetidamente a un grupo, mide el efecto y modifica la regla, no a las personas.',
      ],
    },
    {
      heading: 'Privacidad al proyectar y compartir resultados',
      paragraphs: [
        'Antes de compartir pantalla, cierra pestañas, notificaciones y documentos con información personal. Proyecta solo el resultado necesario y evita rankings públicos. Para agrupamientos, basta mostrar nombres o códigos durante el tiempo de organización; elimina la lista de la herramienta al terminar.',
        'No envíes capturas con calificaciones por mensajería no autorizada. Sigue las instrucciones del delegado de protección de datos y del centro. El tratamiento local de FunnyTools significa que el contenido se procesa en la pestaña, pero no controla una grabación de pantalla, una extensión o el uso posterior de la descarga.',
      ],
    },
    {
      heading: 'Plan de contingencia para una clase en directo',
      paragraphs: [
        'Prepara una alternativa de baja tecnología: lista numerada, tarjetas, tabla impresa o agrupamiento predefinido. Si la red, el proyector o el navegador falla, la clase no debe detenerse. Prueba la herramienta con datos ficticios y el mismo dispositivo antes de una sesión importante.',
        'Si aparece un resultado imposible, detén la aplicación y revisa la entrada; no improvises varias regeneraciones silenciosas. Explica el cambio de procedimiento y conserva una regla coherente. La transparencia protege mejor la confianza que fingir que la primera propuesta siempre era válida.',
      ],
    },
    {
      heading: 'Lista de comprobación para cerrar la actividad',
      paragraphs: [
        'Confirma que cada estudiante aparece una vez donde corresponde, que grupos y asientos cumplen restricciones y que las notas coinciden con el registro fuente. Recoge observaciones sobre participación y ajusta el siguiente uso. Borra listas temporales, limpia la pantalla compartida y guarda solo lo autorizado.',
        'Anota herramienta, regla, modificaciones y motivo cuando el procedimiento afecta una decisión importante. Un flujo reproducible permite responder preguntas de alumnado, familias o coordinación sin depender de la memoria y evita convertir un clic en una decisión opaca.',
      ],
    },
  ],
  faq: [
    { q: '¿Qué herramientas para profesores incluye FunnyTools?', a: 'Selector de alumnos, grupos de clase, plano de asientos, promedio de notas, GPA y herramientas relacionadas de temporización y estadística.' },
    { q: '¿La selección aleatoria garantiza equidad?', a: 'No por sí sola. Distribuye una mecánica, pero el docente debe revisar accesibilidad, apoyos, oportunidades, historial del procedimiento y efectos reales.' },
    { q: '¿Puedo pegar la lista oficial del alumnado?', a: 'Usa una copia mínima con nombre, inicial o código. Elimina identificadores y datos sensibles, y sigue la política de privacidad del centro.' },
    { q: '¿Qué hago si el número de estudiantes no divide los grupos por igual?', a: 'Define antes cómo se reparte el resto, comprueba tamaños y explica la regla. Después revisa si algún ajuste pedagógico es necesario.' },
    { q: '¿El plano de asientos contempla necesidades de accesibilidad?', a: 'No automáticamente. Es un borrador; debes revisar movilidad, visión, audición, apoyos, seguridad y condiciones reales del aula.' },
    { q: '¿Una calculadora de promedio decide la nota oficial?', a: 'No. La nota oficial depende de pesos, ausencias, recuperación, mínimos, redondeo y normativa del centro.' },
    { q: '¿El GPA 4,3 sirve para cualquier universidad?', a: 'No. Las escalas y equivalencias varían. Usa la tabla de la institución y trata el resultado público como estimación.' },
    { q: '¿Qué debo hacer después de usar una herramienta en clase?', a: 'Revisar el resultado, documentar cambios importantes, borrar listas temporales y guardar únicamente la información autorizada.' },
  ],
  review: {
    heading: 'Revisión de una decisión de aula asistida por herramienta',
    intro: 'Una buena automatización deja más tiempo para enseñar y mantiene visible la responsabilidad humana.',
    checks: [
      { title: 'Finalidad y datos', text: 'La tarea está definida y la lista contiene solo los datos mínimos necesarios.' },
      { title: 'Equidad y acceso', text: 'Turnos, grupos, asientos y tiempos se revisaron con criterios pedagógicos y de accesibilidad.' },
      { title: 'Registro y cierre', text: 'El resultado se comprobó contra la fuente, se documentaron cambios y se eliminaron copias temporales.' },
    ],
  },
  sources: [
    { label: 'BOE: currículo de Educación Secundaria Obligatoria', href: 'https://www.boe.es/buscar/act.php?id=BOE-A-2022-13172', note: 'Evaluación formativa, instrumentos variados, accesibles y adaptados a las situaciones de aprendizaje.' },
    { label: 'AEPD: guía para centros educativos', href: 'https://www.aepd.es/es/documento/guia-centros-educativos.pdf', note: 'Finalidad educativa, minimización y deber de confidencialidad sobre datos del alumnado.' },
    { label: 'UNESCO: educación inclusiva', href: 'https://www.unesco.org/es/inclusion-education', note: 'Marco internacional para eliminar barreras a la participación y el aprendizaje.' },
    { label: 'W3C WAI: planificación y políticas de accesibilidad', href: 'https://www.w3.org/WAI/planning/', note: 'Recursos para integrar accesibilidad en procesos y decisiones.' },
  ],
};

export const spanishRandomCategory: SpanishInfoPage = {
  title: 'Herramientas aleatorias y sorteos online',
  seoTitle: 'Herramientas aleatorias y sorteos gratis | FunnyTools',
  seoDescription: 'Genera números, nombres, grupos, ruletas, dados, UUID, contraseñas y decisiones aleatorias en el navegador con reglas claras, privacidad y verificación.',
  keywords: [
    'herramientas aleatorias online',
    'sorteo de nombres gratis',
    'generador de números aleatorios',
    'ruleta aleatoria grupos',
    'generador UUID contraseñas',
  ],
  eyebrow: 'Azar en el navegador · reglas visibles · sin registro',
  intro: 'Una herramienta aleatoria elige sin conocer qué opción preferimos, pero la imparcialidad del proceso depende también de la lista, las probabilidades, las exclusiones y la forma de registrar el resultado. Esta colección reúne números, nombres, grupos, ruletas, dados, decisiones cotidianas, colores, UUID y contraseñas. Sirve para actividades informales, aula y prototipos; no convierte un sorteo en procedimiento notarial, concurso regulado o prueba criptográfica certificada.',
  directAnswer: [
    'Para un entero usa el generador de números con rango inclusivo; para una lista usa sorteo de nombres; para equipos usa grupos; para una presentación visual usa ruleta; para juegos usa dados; para identificadores usa UUID v4; para credenciales usa el generador de contraseñas. Define participantes, duplicados, número de ganadores, repetición y desempate antes de pulsar.',
    'Las funciones españolas de azar se ejecutan dentro del navegador y las operaciones sensibles usan Web Crypto cuando corresponde. Eso mejora la fuente frente a una elección manual, pero no aporta auditoría externa ni certificación. Si hay premios, derechos o consecuencias importantes, publica reglas, conserva evidencia y utiliza el procedimiento exigido por la organización o la ley.',
  ],
  sections: [
    {
      heading: 'Elegir entre número, nombre, grupo, ruleta o dado',
      paragraphs: [
        'El tipo de entrada determina la herramienta. Un rango continuo funciona con números; una lista irregular necesita nombres; un conjunto que debe repartirse necesita grupos; una actividad visual puede usar ruleta; un juego con probabilidades conocidas usa dados. Convertir nombres a números puede ser válido si la correspondencia queda fijada y visible antes del sorteo.',
        'Escribe el resultado esperado: uno o varios ganadores, con o sin reposición, grupos de tamaño parecido o una decisión 50/50. Define también qué pasa con una entrada inválida, un duplicado, una ausencia y un empate. La aleatoriedad empieza después de preparar correctamente el universo de opciones.',
      ],
    },
    {
      heading: 'Qué significa aleatorio en un navegador',
      paragraphs: [
        'Un navegador obtiene bits mediante generadores del sistema y los expone a través de Web Crypto. MDN describe `crypto.getRandomValues()` como una fuente criptográficamente fuerte implementada por el agente de usuario. El resultado sigue dependiendo de la plataforma, del algoritmo y de la entropía disponible; una página no observa directamente una ruleta física ni un fenómeno cuántico.',
        'FunnyTools utiliza Web Crypto en sus herramientas de azar cuando la función lo requiere y evita usar una elección humana disfrazada de aleatoria. Aun así, un resultado aislado no demuestra que el proceso completo fuera imparcial: también deben revisarse entradas, probabilidades, repetición, registro y autoridad para realizar el sorteo.',
      ],
    },
    {
      heading: 'Generar números dentro de un rango inclusivo',
      paragraphs: [
        'Comprueba si mínimo y máximo están incluidos. Para elegir un número del 1 al 100 deben existir cien resultados posibles, no noventa y nueve. Si solicitas varios números únicos, la cantidad no puede superar el tamaño del rango. Ordenar la salida después no cambia la selección, pero puede ocultar el orden de extracción; decide cuál necesitas.',
        'No confundas aleatoriedad con distribución diseñada. Un número uniforme da igual probabilidad a cada entero, mientras una simulación normal, un muestreo estratificado o una ponderación necesitan otro método. Para auditorías o investigación, documenta algoritmo, semilla cuando exista, versión y criterios de inclusión.',
      ],
      link: {
        prefix: 'Configura límites y cantidad con el ',
        label: 'Generador de números aleatorios',
        href: '/es/herramientas/generador-numeros-aleatorios/',
        suffix: ' y conserva la definición del rango.',
      },
    },
    {
      heading: 'Sortear nombres sin duplicados invisibles',
      paragraphs: [
        'Limpia espacios, líneas vacías y variantes del mismo participante. Decide si dos participaciones del mismo nombre son un error o boletos adicionales permitidos. Si los pesos no son iguales, una lista repetida puede implementarlos, pero la regla debe comunicarse y revisarse antes de sortear.',
        'Elige con o sin reposición. Sin reposición evita que un nombre gane dos veces durante la ronda; con reposición mantiene la misma probabilidad en cada extracción. No elimines manualmente una opción después de ver el resultado salvo que la regla de invalidez ya estuviera publicada.',
      ],
      link: {
        prefix: 'Carga una lista revisada en el ',
        label: 'Sorteo de nombres aleatorio',
        href: '/es/herramientas/sorteo-nombres-aleatorio/',
        suffix: ' y fija la reposición antes de empezar.',
      },
    },
    {
      heading: 'Crear grupos aleatorios con restos y restricciones',
      paragraphs: [
        'Indica número de equipos o tamaño objetivo. Cuando la división deja resto, reparte una persona adicional en algunos grupos y verifica que nadie falte o aparezca dos veces. Guarda la lista de entrada y cuenta el total de integrantes en la salida.',
        'El azar puro no conoce conflictos, accesibilidad, experiencia ni funciones. Para aula o trabajo, úsalo como propuesta inicial y aplica ajustes justificables de forma transparente. Evita publicar información sensible usada para equilibrar; si un criterio no puede explicarse, no debe ocultarse dentro del proceso.',
      ],
      link: {
        prefix: 'Produce una primera distribución con el ',
        label: 'Generador de grupos aleatorios',
        href: '/es/herramientas/generador-grupos-aleatorios/',
        suffix: ' y verifica integrantes y tamaños.',
      },
    },
    {
      heading: 'Usar una ruleta cuando importa la presentación',
      paragraphs: [
        'La ruleta hace visible la lista y crea una pausa útil en juegos o clase. No garantiza por sí misma probabilidades iguales si hay segmentos duplicados, pesos o entradas ocultas. Recorre todas las opciones en pantalla y explica si la ganadora se retira para la siguiente vuelta.',
        'Evita colores que sean la única forma de distinguir opciones y muestra texto legible. Para una decisión sensible, registra la lista antes de girar y el resultado después; una animación atractiva no sustituye un acta ni un mecanismo auditable.',
      ],
      link: {
        prefix: 'Presenta opciones en la ',
        label: 'Ruleta aleatoria',
        href: '/es/herramientas/ruleta-aleatoria/',
        suffix: ' manteniendo visibles las reglas.',
      },
    },
    {
      heading: 'Tirar dados digitales y calcular probabilidades',
      paragraphs: [
        'Un d6 uniforme ofrece seis caras equiprobables; varios dados producen sumas no uniformes. Con dos d6, siete tiene más combinaciones que dos o doce. Distingue resultado de cada dado, suma y modificadores, y no interpretes una racha corta como evidencia de sesgo.',
        'Para juegos, acuerda tipo, cantidad, repetición y tratamiento de dados que quedan fuera de la mesa física. En un navegador no existe ese último caso, pero sí puede haber una recarga o un segundo clic. Decide si se conserva el primer resultado y registra la ronda cuando importe.',
      ],
      link: {
        prefix: 'Selecciona caras y cantidad en ',
        label: 'Tirar dados online',
        href: '/es/herramientas/tirar-dados-online/',
        suffix: ' y muestra los lanzamientos individuales.',
      },
    },
    {
      heading: 'Tomar una decisión entre dos opciones',
      paragraphs: [
        'Una elección 50/50 ayuda cuando ambas alternativas ya son aceptables y el coste de equivocarse es bajo. No sirve para decidir atención médica, seguridad, contratos, inversión, consentimiento o una medida disciplinaria. El azar resuelve indecisión, no evalúa consecuencias.',
        'Redacta las dos opciones con el mismo nivel de detalle y confirma que no exista una tercera alternativa obligatoria. Si sientes la necesidad de repetir hasta obtener una opción concreta, el resultado ya reveló una preferencia; úsala como información y no como sorteo.',
      ],
      link: {
        prefix: 'Para decisiones reversibles prueba ',
        label: 'Decidir entre dos opciones',
        href: '/es/herramientas/decidir-entre-dos-opciones/',
        suffix: ' una sola vez y revisa cómo reaccionas.',
      },
    },
    {
      heading: 'Elegir qué comer con restricciones reales',
      paragraphs: [
        'Construye una lista de opciones disponibles, abiertas, dentro del presupuesto y compatibles con alergias o preferencias. Eliminar primero las alternativas inviables evita que la herramienta proponga algo que nunca se aceptará. Una categoría genérica no conoce ingredientes, contaminación cruzada ni información clínica.',
        'Usa el azar para romper un empate entre opciones seguras. Para alergias graves, verifica directamente con el establecimiento y no delegues la decisión a una ruleta. Guarda favoritos si la herramienta lo permite sin incluir datos sensibles.',
      ],
      link: {
        prefix: 'Sortea entre alternativas viables con ',
        label: 'Qué comer hoy',
        href: '/es/herramientas/que-comer-hoy/',
        suffix: ' después de aplicar restricciones.',
      },
    },
    {
      heading: 'Generar colores y comprobar contraste',
      paragraphs: [
        'Un color aleatorio ofrece inspiración, no una paleta terminada. Convierte HEX, RGB y HSL para entender el mismo color en distintas notaciones. Al construir una combinación, controla luminosidad, saturación, jerarquía y reproducción en pantallas diferentes.',
        'No dependas solo del color para comunicar estados. Comprueba contraste de texto y componentes con criterios de accesibilidad y añade etiquetas, iconos o patrones. Para una marca, guarda códigos aprobados; no regenere colores entre piezas que deben ser coherentes.',
      ],
      link: {
        prefix: 'Explora valores con el ',
        label: 'Generador de colores HEX, RGB y HSL',
        href: '/es/herramientas/generador-colores-hex-rgb-hsl/',
        suffix: ' y valida contraste antes de publicar.',
      },
    },
    {
      heading: 'UUID v4 para identificadores, no para significado',
      paragraphs: [
        'Un UUID v4 es un identificador de 128 bits con campos de versión y variante. Su espacio reduce enormemente la probabilidad de colisión para usos normales, pero el valor no contiene fecha, usuario ni categoría. No lo uses cuando una secuencia humana, una clave primaria controlada o trazabilidad temporal requiera otra estrategia.',
        'Genera por lotes, conserva el formato canónico y valida duplicados en el sistema receptor. Un UUID puede aparecer en una URL o base de datos sin ser secreto: conocerlo no debería conceder acceso. La autorización debe depender de controles reales, no de que el identificador parezca difícil de adivinar.',
      ],
      link: {
        prefix: 'Crea identificadores con el ',
        label: 'Generador UUID v4',
        href: '/es/herramientas/generador-uuid-v4/',
        suffix: ' y separa identidad de autorización.',
      },
    },
    {
      heading: 'Contraseñas aleatorias y almacenamiento seguro',
      paragraphs: [
        'La longitud aporta más espacio de búsqueda; una contraseña única evita que una filtración abra varias cuentas. Elige una longitud compatible, varios tipos de caracteres cuando el servicio los exija y exclusión de símbolos ambiguos solo si facilita una transcripción necesaria. No reutilices el resultado ni lo envíes por un canal inseguro.',
        'FunnyTools genera dentro del navegador, pero la contraseña visible puede quedar expuesta por portapapeles, capturas, extensiones o personas cercanas. Guárdala directamente en un gestor de contraseñas y activa autenticación multifactor. Para claves criptográficas, certificados o secretos de infraestructura, utiliza herramientas y procedimientos especializados.',
      ],
      link: {
        prefix: 'Crea una credencial única con el ',
        label: 'Generador de contraseñas seguras',
        href: '/es/herramientas/generador-contrasenas-seguras/',
        suffix: ' y llévala a un gestor de inmediato.',
      },
    },
    {
      heading: 'Privacidad de listas, sorteos y resultados',
      paragraphs: [
        'Utiliza el mínimo dato que permita reconocer a cada participante. En un aula, un nombre o código basta; en un evento público, considera un número de boleto. No muestres correos, teléfonos, direcciones, fecha de nacimiento ni observaciones internas en una ruleta proyectada.',
        'Aunque la lista se procese localmente, una pantalla compartida o captura puede difundirla. Borra entradas al terminar, limpia el portapapeles y guarda el acta en el sistema autorizado. Si publicas ganadores, informa previamente qué nombre o seudónimo será visible.',
      ],
    },
    {
      heading: 'Sorteos con premios, promociones o consecuencias formales',
      paragraphs: [
        'Define organizador, participantes elegibles, fechas, número de premios, probabilidades o ponderaciones, exclusiones, mecanismo, suplentes, contacto y tratamiento de datos. Comprueba la normativa de la jurisdicción y las condiciones de la plataforma. FunnyTools no valida bases legales ni certifica resultados.',
        'Para un proceso auditable, fija la lista mediante una huella o publicación previa, registra hora y versión, usa testigos o un proveedor exigido y conserva la evidencia. No cambies el universo después de conocer el resultado. Una herramienta gratuita puede apoyar una demostración informal, no reemplazar un sorteo notarial o regulado.',
      ],
    },
    {
      heading: 'Cómo comprobar que no faltó ni sobró una opción',
      paragraphs: [
        'Cuenta entradas antes y después de limpiar. Ordena una copia para localizar duplicados, pero conserva el orden original si forma parte del procedimiento. En grupos, suma integrantes; en selección sin reposición, confirma que el conjunto de elegidos y pendientes coincide con la lista inicial.',
        'Realiza una prueba con nombres ficticios y casos límite: una sola opción, rango mínimo igual al máximo, caracteres con tilde, líneas repetidas y cantidades imposibles. Un mensaje claro de validación aporta más confianza que aceptar silenciosamente una entrada ambigua.',
      ],
    },
    {
      heading: 'Lista de comprobación de un proceso aleatorio',
      paragraphs: [
        'Publica finalidad, universo, igualdad o pesos, reposición, número de resultados, desempate e invalidez. Congela la entrada, ejecuta una vez y registra la salida. Revisa que el operador no pueda regenerar selectivamente sin dejar rastro.',
        'Distingue uso informal, educativo, de seguridad y regulado. Para contraseñas, protege la salida; para grupos, revisa equidad y accesibilidad; para premios, cumple bases y auditoría. La mejor herramienta es la que hace visible qué puede garantizar y qué queda fuera de su alcance.',
      ],
    },
  ],
  faq: [
    { q: '¿Las herramientas aleatorias de FunnyTools usan Web Crypto?', a: 'Las funciones españolas de azar utilizan Web Crypto cuando corresponde para obtener valores desde el generador seguro del navegador.' },
    { q: '¿Un sorteo en el navegador es oficialmente certificado?', a: 'No. Genera un resultado local, pero no aporta notario, auditoría externa, verificación legal ni cumplimiento de bases promocionales.' },
    { q: '¿El rango del generador incluye mínimo y máximo?', a: 'Sí en la herramienta descrita; revisa que la cantidad solicitada no supere las posibilidades cuando exiges valores únicos.' },
    { q: '¿Cómo evito que un nombre salga dos veces?', a: 'Limpia duplicados y usa selección sin reposición. Decide la regla antes de ver el primer resultado.' },
    { q: '¿Un grupo aleatorio siempre es justo?', a: 'No. Puede ser imparcial en la mecánica y aun incumplir accesibilidad, apoyos o objetivos pedagógicos. Debe revisarse.' },
    { q: '¿Puedo usar UUID como contraseña o permiso de acceso?', a: 'No. Un UUID identifica; no debe sustituir autenticación, autorización ni una contraseña diseñada para ese fin.' },
    { q: '¿Dónde debo guardar una contraseña generada?', a: 'En un gestor de contraseñas. Evita capturas, mensajes y reutilización, y activa autenticación multifactor.' },
    { q: '¿Qué necesito para un sorteo con premio?', a: 'Bases, elegibilidad, fechas, mecanismo, privacidad, suplentes, evidencia y cumplimiento de la normativa aplicable; puede requerir un proveedor o fedatario.' },
  ],
  review: {
    heading: 'Revisión de un resultado aleatorio',
    intro: 'La fuente aleatoria es solo una parte: el proceso completo incluye lista, reglas, ejecución y evidencia.',
    checks: [
      { title: 'Universo y probabilidades', text: 'Opciones, duplicados, pesos, reposición y desempate estaban definidos antes de ejecutar.' },
      { title: 'Ejecución', text: 'El resultado se generó una vez con la herramienta adecuada y no se regeneró selectivamente.' },
      { title: 'Uso responsable', text: 'Se protegieron datos y secretos, y los procesos formales siguieron sus requisitos de auditoría y legalidad.' },
    ],
  },
  sources: [
    { label: 'MDN: Crypto.getRandomValues()', href: 'https://developer.mozilla.org/es/docs/Web/API/Crypto/getRandomValues', note: 'Método del navegador para obtener valores aleatorios criptográficamente fuertes.' },
    { label: 'MDN: Crypto.randomUUID()', href: 'https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID', note: 'Generación de identificadores UUID v4 mediante Web Crypto.' },
    { label: 'NIST: Random Bit Generation', href: 'https://csrc.nist.gov/Projects/random-bit-generation', note: 'Estándares y proyectos sobre generadores deterministas, fuentes de entropía y construcción de RBG.' },
    { label: 'NIST: Random Number Glossary', href: 'https://csrc.nist.gov/glossary/term/random_number', note: 'Definición de selección uniforme e impredecible dentro de un conjunto.' },
  ],
};
