import type { ToolContent } from '../tools/_types';

export const spanishZScore: ToolContent = {
  name: 'Calculadora de puntuación Z',
  short: 'Estandariza una puntuación con la media y la desviación estándar de su grupo y explica su distancia y posición relativa.',
  long: 'Esta calculadora obtiene la puntuación Z de un valor mediante z = (x − media) / desviación estándar. El resultado indica cuántas desviaciones estándar separan el valor de la media: el signo muestra la dirección y el valor absoluto, la distancia. El cálculo se realiza en el navegador y sirve para estudiar, comprobar operaciones y comparar valores que pertenecen a distribuciones de referencia bien definidas. No transforma una distribución en normal, no calcula un percentil y no sustituye el baremo de una prueba.',
  seoTitle: 'Calculadora de puntuación Z | Fórmula y ejemplo',
  seoDescription: 'Calcula z = (x − media) / desviación estándar. Interpreta signo, distancia a la media y límites, con ejemplo y cálculo local.',
  keywords: [
    'calculadora puntuación z',
    'calcular z score',
    'puntuación tipificada fórmula',
    'estandarizar una puntuación',
    'valor z estadística',
    'desviaciones estándar de la media',
    'calculadora estadística educativa',
    'puntuación z online',
  ],
  capabilities: [
    'Calcular z a partir de una puntuación, la media y una desviación estándar positiva.',
    'Mostrar el valor Z con hasta tres decimales para facilitar la comprobación manual.',
    'Indicar la distancia absoluta a la media en unidades de desviación estándar.',
    'Distinguir si la puntuación está por encima, por debajo o exactamente en la media.',
    'Aceptar valores negativos y decimales cuando sean válidos en la escala original.',
    'Invalidar el resultado anterior al editar cualquier entrada para evitar informar un cálculo obsoleto.',
  ],
  contentSections: [
    {
      heading: 'Respuesta rápida: cómo calcular una puntuación Z',
      paragraphs: [
        'Escribe la puntuación observada x, la media del mismo grupo y su desviación estándar. Pulsa «Calcular puntuación Z». La página resta la media a la puntuación y divide la diferencia entre la desviación estándar. Con x = 82, media = 70 y desviación estándar = 10, el cálculo es (82 − 70) / 10 = 1,2. El resultado se lee «1,2 desviaciones estándar por encima de la media». Si x fuera 58, z sería −1,2 y la distancia sería la misma, pero por debajo.',
        'La media y la desviación deben describir la misma variable, escala, población o muestra a la que pertenece x. No es válido combinar la nota de una edición de un examen con la media de otra edición, ni una estatura adulta con parámetros infantiles. La calculadora comprueba que los tres valores sean numéricos y que la desviación estándar sea mayor que cero; la pertinencia del grupo de referencia la debe comprobar quien interpreta el resultado.',
      ],
      items: [
        'z = 0: la puntuación coincide con la media.',
        'z = 1: está una desviación estándar por encima de la media.',
        'z = −2: está dos desviaciones estándar por debajo de la media.',
        'El signo indica dirección; |z| indica distancia.',
      ],
    },
    {
      heading: 'Qué significa el signo y el tamaño de Z',
      paragraphs: [
        'Una puntuación Z no conserva la unidad original. Después de dividir por la desviación estándar, centímetros, puntos o segundos se convierten en una medida adimensional. Esto permite expresar en una escala común la posición relativa de observaciones que originalmente usan unidades o dispersiones distintas. Por ejemplo, una diferencia de 10 puntos puede ser grande en un examen muy homogéneo y pequeña en otro con mucha dispersión; Z incorpora esa dispersión en el denominador.',
        'Un valor positivo no significa necesariamente «bueno» y uno negativo no significa «malo». En una escala donde un valor mayor representa más tiempo de espera, más errores o más riesgo, estar por encima de la media puede ser desfavorable. En una escala de tiempo para completar una tarea, incluso puede depender de si se mide rapidez o duración. La interpretación necesita conocer qué mide la variable, en qué dirección se puntúa y cuál era el objetivo del análisis.',
      ],
    },
    {
      heading: 'Población, muestra y elección de la desviación estándar',
      paragraphs: [
        'La fórmula aritmética tiene la misma forma tanto si los parámetros describen una población como si resumen una muestra: se resta el centro y se divide por una medida de dispersión. Sin embargo, el significado cambia. Si x pertenece a una población completa y se conocen μ y σ, se habla de parámetros poblacionales. Si media y s se estiman a partir de una muestra, Z es una estandarización respecto de esa muestra. Conviene registrar de dónde proceden los números en lugar de mezclar símbolos sin contexto.',
        'Esta página no calcula la desviación estándar ni decide si debe usarse la versión poblacional o muestral. Introduce el valor que corresponda al procedimiento documentado. Si solo tienes una lista de observaciones, calcula primero su media y desviación con una herramienta apropiada y confirma el divisor utilizado. Una desviación estándar igual a cero significa que todas las observaciones de referencia son idénticas; en ese caso la división no está definida y la calculadora bloquea el resultado.',
      ],
      items: [
        'Usa parámetros del mismo grupo y momento de medición.',
        'Conserva suficientes decimales durante el cálculo intermedio.',
        'Redondea Z al final, según la precisión del informe.',
        'Documenta si la desviación es poblacional, muestral o normativa.',
      ],
    },
    {
      heading: 'Estandarizar no convierte los datos en una distribución normal',
      paragraphs: [
        'Restar la media desplaza el centro a cero y dividir por la desviación reescala la dispersión a uno, pero la forma de la distribución se mantiene. Una distribución muy asimétrica, bimodal o con valores extremos continúa teniendo esas características después de estandarizarse. Por eso un valor Z no autoriza por sí solo a aplicar una tabla de la normal estándar ni a convertir automáticamente el resultado en una probabilidad o un percentil.',
        'Para relacionar Z con áreas bajo una curva normal hace falta una justificación adicional: un modelo normal razonable, un procedimiento normativo que lo establezca o una aproximación cuya calidad se haya evaluado. En datos empíricos también puede obtenerse una posición mediante rangos, pero esa es otra pregunta y puede producir un resultado diferente. Esta calculadora se limita a la transformación lineal; no presenta una probabilidad que aparentaría más información de la disponible.',
      ],
    },
    {
      heading: 'Valores extremos, comparación y errores frecuentes',
      paragraphs: [
        'A veces se usa |z| mayor que 3 como señal inicial para revisar un posible valor extremo. No es una regla universal para borrar observaciones. En una muestra grande, en una distribución de colas pesadas o en un fenómeno donde los extremos son reales, pueden aparecer puntuaciones alejadas sin que exista error. Antes de excluir un dato, comprueba la fuente, la unidad, la digitación, las reglas del estudio y el efecto de la decisión sobre el análisis.',
        'Otro error habitual es comparar dos Z calculadas con grupos de referencia incompatibles. La estandarización facilita la comparación matemática, pero no vuelve equivalentes constructos distintos. Un z = 1 en comprensión lectora y un z = 1 en velocidad física indican una posición relativa similar dentro de sus respectivos grupos, no la misma capacidad ni una diferencia causal. También hay que evitar confundir esta puntuación Z descriptiva con un estadístico de contraste Z usado para probar hipótesis.',
      ],
      items: [
        'No introduzcas varianza en el campo de desviación estándar.',
        'No uses una desviación negativa ni cero.',
        'No conviertas Z a percentil sin declarar el modelo o baremo.',
        'No interpretes «por encima» como favorable sin conocer la escala.',
      ],
    },
    {
      heading: 'Cómo informar Z de forma verificable',
      paragraphs: [
        'Un informe útil incluye la puntuación original, la media, la desviación, el grupo de referencia y el resultado: «En la cohorte analizada, x = 82, M = 70 y DE = 10; por tanto, z = 1,20, es decir, 1,20 desviaciones estándar por encima de la media». Si los parámetros proceden de un manual o baremo, añade edición, población y fecha. Si proceden de la propia muestra, indica su tamaño y el método usado para calcular la desviación.',
        'Evita etiquetas clínicas, educativas o laborales derivadas únicamente de Z. La puntuación resume posición relativa, no explica la causa, no mide por sí sola incertidumbre y no determina una decisión. Para datos sensibles, introduce solo números: la página no necesita nombres ni identificadores. Los campos y el resultado se procesan en esta pestaña; aun así, conserva el cálculo final en el sistema autorizado por tu institución si debe formar parte de un expediente.',
      ],
    },
  ],
  formula: {
    expression: 'z = (x − M) / DE',
    explanation: 'x es la puntuación observada, M la media del grupo de referencia y DE una desviación estándar mayor que cero del mismo grupo. El signo de z indica dirección respecto de la media y |z| expresa la distancia en desviaciones estándar.',
  },
  instructions: [
    'Confirma que puntuación, media y desviación pertenecen a la misma variable y grupo de referencia.',
    'Introduce la puntuación observada x, que puede ser negativa o decimal.',
    'Introduce la media con la precisión disponible.',
    'Introduce una desviación estándar positiva, no la varianza.',
    'Pulsa Calcular puntuación Z y revisa signo, distancia y posición.',
    'Registra parámetros, grupo, fecha y criterio de redondeo si vas a informar el resultado.',
  ],
  examples: [
    'Comprobar que 82 respecto de M = 70 y DE = 10 produce z = 1,2.',
    'Estandarizar una medida situada por debajo de la media y explicar el signo negativo.',
    'Comparar posiciones relativas dentro de dos escalas con dispersiones diferentes.',
    'Revisar un posible valor extremo antes de investigar su origen.',
    'Enseñar por qué estandarizar no equivale a normalizar la forma de una distribución.',
  ],
  audience: [
    'Estudiantes y docentes de estadística descriptiva.',
    'Investigadores que verifican una estandarización sencilla.',
    'Profesionales que ya conocen el grupo normativo aplicable.',
    'Personas que necesitan explicar una posición en unidades de desviación estándar.',
  ],
  caseStudies: [
    {
      title: 'Nota por encima de la media',
      description: 'Una nota de 82, con media 70 y DE 10, da z = 1,2. El informe conserva los tres datos y evita convertir el resultado en percentil sin justificar un modelo.',
    },
    {
      title: 'Misma diferencia, distinta dispersión',
      description: 'Estar 10 puntos por encima produce z = 2 si DE = 5, pero z = 0,5 si DE = 20. La distancia original es igual; la posición relativa no.',
    },
    {
      title: 'Distribución asimétrica',
      description: 'El equipo estandariza tiempos de espera para comparar escalas, pero no usa una tabla normal porque los datos presentan una cola derecha marcada.',
    },
  ],
  notes: [
    'La calculadora no obtiene media ni desviación a partir de una lista.',
    'La puntuación Z es adimensional y depende del grupo de referencia.',
    'Estandarizar cambia centro y escala, no la forma de la distribución.',
    'Un umbral como |z| > 3 es una señal de revisión, no una orden automática de exclusión.',
    'Z descriptiva, prueba Z y percentil son conceptos relacionados pero distintos.',
    'El redondeo visible no debe sustituir los valores originales en un análisis reproducible.',
  ],
  faq: [
    {
      q: '¿Qué significa una puntuación Z de 1,5?',
      a: 'Que el valor está 1,5 desviaciones estándar por encima de la media del grupo usado. No indica por sí solo un percentil ni que el resultado sea bueno.',
    },
    {
      q: '¿Qué significa una Z negativa?',
      a: 'Que la puntuación está por debajo de la media. El valor absoluto indica cuántas desviaciones estándar la separan del centro.',
    },
    {
      q: '¿Puedo usar una desviación estándar de cero?',
      a: 'No. La fórmula divide por la desviación; con DE = 0 la puntuación Z no está definida.',
    },
    {
      q: '¿La puntuación Z siempre sigue una distribución normal?',
      a: 'No. La transformación conserva la forma de la distribución original. Solo puede usarse una tabla normal cuando el modelo o el procedimiento lo justifican.',
    },
    {
      q: '¿Z = 2 equivale al percentil 97,5?',
      a: 'Aproximadamente solo bajo una distribución normal estándar y según la convención de cola usada. Esta página no hace esa suposición.',
    },
    {
      q: '¿Debo usar desviación poblacional o muestral?',
      a: 'Usa la que defina tu análisis o fuente normativa y decláralo. La calculadora no puede decidirlo sin conocer el diseño y el propósito.',
    },
    {
      q: '¿Puedo comparar puntuaciones Z de pruebas distintas?',
      a: 'Puedes comparar posiciones relativas con cautela si los grupos y constructos son pertinentes, pero una escala común no convierte las pruebas en medidas del mismo fenómeno.',
    },
    {
      q: '¿Los números se envían a un servidor?',
      a: 'No. La puntuación, la media, la desviación y el resultado se calculan localmente en tu navegador.',
    },
  ],
  labels: {
    score: 'Puntuación observada (x)',
    mean: 'Media del grupo (M)',
    sd: 'Desviación estándar (DE)',
    calculate: 'Calcular puntuación Z',
    result: 'Puntuación Z',
    distanceFromMean: 'Distancia a la media',
    sdUnit: 'desviaciones estándar',
    relativePosition: 'Posición relativa',
    aboveMean: 'Por encima de la media',
    belowMean: 'Por debajo de la media',
    atMean: 'Igual a la media',
    invalid: 'Introduce una puntuación y una media válidas, y una desviación estándar mayor que cero.',
  },
  sources: [
    {
      label: 'Universitat de Barcelona: estandarización de variables',
      href: 'https://diposit.ub.edu/bitstreams/6921986c-e112-4d41-9c33-289cddd374a5/download',
      note: 'Material universitario en español sobre puntuaciones tipificadas, signo, distancia y comparación sin unidades.',
    },
    {
      label: 'University of Baltimore: estadística para la toma de decisiones',
      href: 'https://home.ubalt.edu/ntsbarsh/business-stat/opre504S.htm',
      note: 'Expone en español la fórmula de Z y la interpretación respecto de la media y la desviación estándar.',
    },
    {
      label: 'INE: Manual básico de estadística',
      href: 'https://www.ine.es/ine/oposiciones/temario_2021/manual_basico_estadistica.pdf',
      note: 'Referencia institucional para media, varianza, desviación estándar y medidas descriptivas.',
    },
  ],
  privacyNote: 'La puntuación, la media, la desviación y Z permanecen en esta pestaña. No hace falta introducir nombres, expedientes ni otros identificadores.',
  disclaimer: 'Herramienta educativa de estandarización descriptiva. Comprueba el grupo de referencia, la definición de desviación estándar y el baremo aplicable antes de tomar decisiones.',
};

export const spanishZScoreReview = {
  heading: 'Revisión antes de interpretar una puntuación Z',
  intro: 'Una división correcta no arregla parámetros incompatibles ni justifica supuestos sobre la distribución.',
  panels: [
    { title: 'Referencia', text: 'x, media y desviación proceden de la misma variable, población y periodo.' },
    { title: 'Escala', text: 'La desviación es positiva y no se ha introducido por error una varianza.' },
    { title: 'Interpretación', text: 'El signo se lee según el significado real de la variable y no como bueno o malo.' },
  ],
  checklistHeading: 'Lista de comprobación',
  checklist: [
    'El grupo de referencia es pertinente y está documentado.',
    'La fuente indica si la desviación es poblacional, muestral o normativa.',
    'El resultado se redondea solo al final.',
    'No se ha convertido Z a percentil sin un modelo justificado.',
    'El informe conserva puntuación, media, desviación y contexto.',
  ],
};

export const spanishTScore: ToolContent = {
  name: 'Calculadora de puntuación T',
  short: 'Convierte una puntuación Z a la escala T de media 50 y desviación estándar 10, con interpretación y controles de uso.',
  long: 'Esta calculadora transforma una puntuación Z mediante T = 50 + 10z. En la escala T estandarizada, 50 representa la media y cada 10 puntos representan una desviación estándar. La transformación elimina normalmente valores negativos y decimales incómodos sin alterar el orden relativo. Esta página calcula la puntuación T psicométrica a partir de Z; no calcula el estadístico t de Student, no interpreta densitometrías óseas y no sustituye las tablas normativas de una prueba.',
  seoTitle: 'Calculadora de puntuación T | Convertir Z a T',
  seoDescription: 'Convierte Z a una puntuación T con media 50 y DE 10. Fórmula T = 50 + 10z, ejemplos, interpretación y diferencias con t de Student.',
  keywords: [
    'calculadora puntuación T',
    'convertir z a t',
    'fórmula puntuación T',
    'escala T media 50',
    'puntuación tipificada T',
    'baremos psicométricos',
    'T score calculadora español',
    'transformación lineal de puntuaciones',
  ],
  capabilities: [
    'Convertir cualquier puntuación Z finita a la escala T = 50 + 10z.',
    'Mostrar T con hasta dos decimales y conservar Z como equivalencia comprobable.',
    'Indicar si el resultado está por encima, por debajo o en la media de la escala.',
    'Aceptar Z negativas y decimales sin imponer un intervalo artificial.',
    'Invalidar el resultado en cuanto cambia la entrada.',
    'Procesar la conversión localmente sin enviar puntuaciones ni identificadores.',
  ],
  contentSections: [
    {
      heading: 'Respuesta rápida: convertir una puntuación Z en T',
      paragraphs: [
        'Introduce la puntuación Z y pulsa «Convertir Z a T». La calculadora multiplica Z por 10 y suma 50. Si z = 1,2, entonces T = 50 + 10 × 1,2 = 62. El resultado está 12 puntos T por encima de 50 y conserva la misma distancia relativa: 1,2 desviaciones estándar por encima de la media. Si z = −1,2, T = 38. Si z = 0, T = 50.',
        'La entrada debe ser una puntuación Z ya calculada con el grupo correcto. Si solo tienes una puntuación directa, primero necesitas la media y la desviación estándar de referencia para obtener Z. La transformación T no descubre esos parámetros ni crea un baremo. Multiplicar una nota cruda por diez y sumar cincuenta sería incorrecto salvo que esa nota ya estuviera expresada como Z.',
      ],
      items: [
        'z = −2 → T = 30.',
        'z = −1 → T = 40.',
        'z = 0 → T = 50.',
        'z = 1 → T = 60; z = 2 → T = 70.',
      ],
    },
    {
      heading: 'Qué representa la escala T de media 50 y DE 10',
      paragraphs: [
        'La escala T es una transformación lineal de Z. Su media teórica es 50 y su desviación estándar es 10 cuando la Z de partida tiene media cero y desviación uno. Se diseñó para expresar posiciones estandarizadas con números que, en las zonas habituales de una distribución, resultan más cómodos que valores negativos o decimales. Una diferencia de 10 puntos T equivale a una desviación estándar; una diferencia de 5 equivale a media desviación.',
        'Cambiar la escala no cambia el orden: si A tiene una Z mayor que B, también tendrá una T mayor. Tampoco cambia las distancias relativas, porque todas se multiplican por la misma constante positiva. La transformación no añade precisión, fiabilidad ni validez. T = 62 no contiene más evidencia que z = 1,2; solo la expresa con otro origen y otra unidad.',
      ],
    },
    {
      heading: 'Puntuación T, estadístico t de Student y T-score óseo',
      paragraphs: [
        'La misma letra se utiliza en contextos que no deben mezclarse. La puntuación T psicométrica de esta página es una escala estandarizada con media 50 y desviación 10. El estadístico t de Student aparece en contrastes de hipótesis y depende de diferencias, errores estándar y grados de libertad; puede compararse con una distribución t. Introducir un estadístico de Student aquí solo lo reexpresaría como 50 + 10t, una operación sin la interpretación buscada.',
        'En densitometría, «T-score» compara densidad mineral ósea con una población adulta joven mediante una definición clínica específica. Aunque también puede expresarse en desviaciones estándar, sus umbrales e interpretación pertenecen a guías sanitarias y no a la escala psicométrica 50/10. Esta herramienta no evalúa osteoporosis, riesgo de fractura ni ninguna condición médica. Revisa siempre el encabezado, el manual y la disciplina de origen antes de convertir.',
      ],
      items: [
        'Escala T psicométrica: centro 50, unidad 10.',
        't de Student: estadístico inferencial con grados de libertad.',
        'T-score óseo: medida clínica con referencia propia.',
        'La coincidencia de la letra no vuelve intercambiables los resultados.',
      ],
    },
    {
      heading: 'Baremos, dirección de la escala y percentiles',
      paragraphs: [
        'En una prueba publicada, el manual puede ofrecer puntuaciones T calculadas con una muestra normativa específica, correcciones por edad o curso, suavizado, normalización u otras reglas. En ese caso, consulta la tabla oficial en lugar de reconstruir el resultado con una media y desviación improvisadas. La fórmula 50 + 10z reproduce la transformación lineal, pero no necesariamente todos los pasos usados por el editor del instrumento.',
        'Una T alta no siempre es deseable. En algunas escalas clínicas o de dificultades, un valor mayor indica más síntomas; en otras, refleja más habilidad. Tampoco existe una conversión universal de T a percentil sin conocer la distribución o el baremo. Bajo normalidad, T = 50 se asocia al centro y T = 60 a z = 1, pero la calculadora no presenta porcentajes porque la transformación por sí sola no demuestra normalidad.',
      ],
    },
    {
      heading: 'Precisión, intervalos y resultados poco habituales',
      paragraphs: [
        'La página admite cualquier Z finita. Por ello puede mostrar T menor que cero o mayor que cien cuando Z es muy extrema. La escala T 50/10 no tiene límites matemáticos intrínsecos. Si un informe restringe el intervalo, aplica techos, suelos o categorías, esa es una regla del instrumento, no de la fórmula general. No recortes el resultado sin documentar el procedimiento.',
        'Dos decimales ayudan a verificar la operación, pero la precisión final depende de la Z original y de los datos usados para obtenerla. Si Z ya fue redondeada a una décima, T no adquiere precisión real por mostrar 62,00. Conserva los valores de cálculo disponibles, redondea una sola vez al final y sigue el número de decimales indicado por la fuente o por el plan de análisis.',
      ],
    },
    {
      heading: 'Cómo redactar e interpretar el resultado',
      paragraphs: [
        'Una redacción transparente puede decir: «La puntuación estandarizada z = 1,20 se transformó a la escala T de media 50 y DE 10 mediante T = 50 + 10z, obteniéndose T = 62». Si procede de una prueba, añade nombre, versión, grupo normativo y reglas del manual. Si Z se calculó internamente, registra también la puntuación directa, la media y la desviación usadas.',
        'No conviertas la etiqueta de posición en diagnóstico ni decisión. La escala resume una relación con un grupo; no explica por qué apareció el resultado, no muestra su error de medida y no sustituye el juicio profesional. Introduce únicamente Z en la página, sin nombres ni datos sensibles. El cálculo permanece en el navegador y se borra de la interfaz al editar el campo o abandonar la pestaña.',
      ],
    },
  ],
  formula: {
    expression: 'T = 50 + 10 × z',
    explanation: 'z es una puntuación estandarizada. La constante 50 fija la media de la nueva escala y el factor 10 fija su desviación estándar. La transformación preserva orden y distancia relativa.',
  },
  instructions: [
    'Comprueba que la entrada es una puntuación Z válida, no una puntuación directa ni un estadístico t.',
    'Introduce Z con la precisión disponible.',
    'Pulsa Convertir Z a T.',
    'Comprueba el valor T, la Z equivalente y la posición respecto de 50.',
    'Revisa el manual si el instrumento aplica tablas, límites o transformaciones adicionales.',
    'Informa fórmula, escala, grupo normativo y criterio de redondeo.',
  ],
  examples: [
    'Convertir z = 1,2 en T = 62.',
    'Explicar por qué z = −0,5 corresponde a T = 45.',
    'Construir una tabla didáctica de Z entre −2 y 2.',
    'Comprobar una puntuación T publicada cuando se conoce la Z de partida.',
    'Distinguir una puntuación T psicométrica de un estadístico t de Student.',
  ],
  audience: [
    'Estudiantes y docentes de psicometría y estadística.',
    'Profesionales que verifican una conversión 50/10 definida por su manual.',
    'Investigadores que necesitan reexpresar una puntuación estandarizada.',
    'Personas que quieren documentar la equivalencia entre Z y T.',
  ],
  caseStudies: [
    {
      title: 'Conversión didáctica',
      description: 'Un curso parte de z = −1, 0 y 1 para mostrar T = 40, 50 y 60. Así se observa que el orden y la distancia se conservan.',
    },
    {
      title: 'Manual con tabla normativa',
      description: 'Una profesional encuentra una diferencia entre 50 + 10z y la tabla del instrumento. Usa la tabla porque incorpora reglas normativas específicas y documenta la versión.',
    },
    {
      title: 'Confusión con t de Student',
      description: 'Un equipo evita introducir t = 2,1 de una prueba de medias. Conserva ese estadístico con sus grados de libertad y usa esta página solo para puntuaciones Z.',
    },
  ],
  notes: [
    'La fórmula general usa media 50 y desviación estándar 10.',
    'La escala T no está limitada matemáticamente entre 0 y 100.',
    'Una T alta puede representar habilidad, dificultad o riesgo según el constructo.',
    'La transformación no calcula un percentil ni prueba normalidad.',
    'No se debe introducir un estadístico t de Student o un T-score médico.',
    'Un manual normativo prevalece cuando define una conversión diferente o adicional.',
  ],
  faq: [
    {
      q: '¿Qué significa una puntuación T de 60?',
      a: 'En la escala 50/10 equivale a z = 1, es decir, una desviación estándar por encima de la media de referencia. Su sentido favorable o desfavorable depende de la variable.',
    },
    {
      q: '¿Cómo convierto T de nuevo a Z?',
      a: 'Despeja la fórmula: z = (T − 50) / 10. Por ejemplo, T = 35 corresponde a z = −1,5.',
    },
    {
      q: '¿Puntuación T y t de Student son lo mismo?',
      a: 'No. Esta puntuación T es una escala transformada. La t de Student es un estadístico inferencial que se interpreta con grados de libertad y una distribución t.',
    },
    {
      q: '¿La puntuación T va de 0 a 100?',
      a: 'No de forma matemática. Algunos instrumentos limitan o informan solo un intervalo, pero la fórmula 50 + 10z no tiene esos topes.',
    },
    {
      q: '¿T = 50 es siempre el percentil 50?',
      a: 'Es el centro de la escala transformada. Coincidir con el percentil 50 requiere condiciones sobre la distribución o un baremo que lo establezca.',
    },
    {
      q: '¿Puedo convertir directamente una nota a T?',
      a: 'Solo si primero la conviertes a Z con la media y desviación correctas, o si el manual ofrece una tabla directa. Una nota cruda no es una Z.',
    },
    {
      q: '¿Qué hago si la tabla del manual da otro resultado?',
      a: 'Sigue el manual y comprueba versión, grupo normativo y redondeo. Puede incorporar normalización, categorías o ajustes que la fórmula lineal no reproduce.',
    },
    {
      q: '¿Se guarda la puntuación introducida?',
      a: 'No. Z y T se procesan en la pestaña y FunnyTools no necesita nombres ni identificadores.',
    },
  ],
  labels: {
    z: 'Puntuación Z',
    calculate: 'Convertir Z a T',
    result: 'Puntuación T',
    zEquivalent: 'Z equivalente',
    relativePosition: 'Posición respecto de T = 50',
    aboveMean: 'Por encima de la media',
    belowMean: 'Por debajo de la media',
    atMean: 'Igual a la media',
    invalid: 'Introduce una puntuación Z numérica válida.',
  },
  sources: [
    {
      label: 'PUCE: material psicométrico sobre puntuaciones T',
      href: 'https://repositorio.puce.edu.ec/bitstreams/e8477251-9b6c-499c-9be5-30907f5f002b/download',
      note: 'Documento académico que presenta la escala T con media 50, desviación 10 y la transformación desde Z.',
    },
    {
      label: 'Universitat de València: puntuaciones tipificadas',
      href: 'https://roderic.uv.es/bitstream/handle/10550/15429/sanfelix.pdf?sequence=1',
      note: 'Referencia universitaria sobre puntuaciones T y su escala de media 50 y desviación estándar 10.',
    },
    {
      label: 'Universitat de Barcelona: estandarización de variables',
      href: 'https://diposit.ub.edu/bitstreams/6921986c-e112-4d41-9c33-289cddd374a5/download',
      note: 'Explica la lógica de las puntuaciones estandarizadas que sirve de base para la transformación T.',
    },
  ],
  privacyNote: 'La única entrada necesaria es Z. La conversión a T se ejecuta localmente y no se envía a FunnyTools.',
  disclaimer: 'Calcula únicamente la escala T psicométrica 50/10. No interpreta el estadístico t de Student, densitometrías ni pruebas clínicas.',
};

export const spanishTScoreReview = {
  heading: 'Revisión antes de usar una puntuación T',
  intro: 'Confirma el tipo de T y la norma aplicable antes de convertir o redactar conclusiones.',
  panels: [
    { title: 'Entrada', text: 'El número es una puntuación Z obtenida con la referencia correcta.' },
    { title: 'Escala', text: 'El procedimiento realmente usa T = 50 + 10z y no una tabla distinta.' },
    { title: 'Contexto', text: 'No se confunde con t de Student, T-score óseo ni una nota de 0 a 100.' },
  ],
  checklistHeading: 'Lista de comprobación',
  checklist: [
    'La Z de partida conserva su grupo de referencia.',
    'El manual permite la transformación lineal 50/10.',
    'El resultado no se presenta automáticamente como percentil.',
    'La dirección favorable o desfavorable se interpreta según el constructo.',
    'El informe documenta fórmula, redondeo y versión del instrumento.',
  ],
};

export const spanishWeightedAverage: ToolContent = {
  name: 'Calculadora de media ponderada',
  short: 'Calcula una media ponderada con notas, créditos, porcentajes o importancias y muestra el peso total y la suma ponderada.',
  long: 'Esta calculadora obtiene la media ponderada como suma de cada valor por su peso dividida entre la suma de pesos. Puedes añadir o quitar filas y usar porcentajes, créditos, horas o proporciones siempre que todos los pesos compartan la misma unidad y sean positivos. Las filas parcialmente rellenadas se bloquean para evitar que una entrada desaparezca del cálculo sin aviso. El resultado se procesa en el navegador y no decide reglas de aprobado, redondeos oficiales ni fórmulas especiales de admisión.',
  seoTitle: 'Calculadora de media ponderada | Notas y créditos',
  seoDescription: 'Calcula la media ponderada con valores y pesos. Sirve para notas, porcentajes o créditos; valida filas, suma de pesos y fórmula paso a paso.',
  keywords: [
    'calculadora media ponderada',
    'calcular nota ponderada',
    'promedio ponderado notas',
    'media ponderada créditos',
    'porcentajes de evaluación',
    'fórmula promedio ponderado',
    'calcular calificación final',
    'weighted average español',
  ],
  capabilities: [
    'Combinar dos o más valores con pesos positivos.',
    'Aceptar pesos expresados como porcentajes, créditos, horas o razones coherentes.',
    'Normalizar automáticamente mediante la división entre la suma de pesos.',
    'Mostrar peso total, suma ponderada y resultado para facilitar la auditoría.',
    'Añadir filas vacías y quitar componentes que ya no correspondan.',
    'Bloquear filas incompletas, pesos cero o negativos y resultados obsoletos.',
  ],
  contentSections: [
    {
      heading: 'Respuesta rápida: cómo calcular una media ponderada',
      paragraphs: [
        'Escribe un valor y su peso en cada fila. Añade las filas necesarias, elimina las que no correspondan y pulsa «Calcular media ponderada». La página multiplica cada valor por su peso, suma esos productos y divide entre la suma de pesos. Con 80 al 30% y 90 al 70%, la suma ponderada es 80 × 30 + 90 × 70 = 8.700, el peso total es 100 y la media es 8.700 / 100 = 87.',
        'Los pesos no necesitan sumar 100 porque el denominador los normaliza. Si escribes 3 y 7 en lugar de 30 y 70, el resultado también es 87: ambos pares representan la misma proporción. Lo importante es que todos los pesos usen una unidad coherente. No mezcles 30% con 7 créditos sin convertirlos a una base común y sin explicar qué representa cada componente.',
      ],
      items: [
        'Valores: 80 y 90; pesos: 30 y 70 → media 87.',
        'Valores: 80 y 90; pesos: 0,3 y 0,7 → media 87.',
        'Valores: 80 y 90; pesos: 3 y 7 → media 87.',
        'Cambiar todos los pesos por el mismo factor no cambia la media.',
      ],
    },
    {
      heading: 'Fórmula y diferencia frente a la media simple',
      paragraphs: [
        'La media simple asigna la misma influencia a cada valor. La ponderada permite que algunos componentes cuenten más. Matemáticamente, MP = Σ(wᵢxᵢ) / Σwᵢ. El numerador suma productos; el denominador corrige la escala de los pesos. Omitir el denominador solo funciona en el caso particular de pesos decimales que ya suman exactamente uno. Con porcentajes que suman 100, habría que dividir entre 100.',
        'La media ponderada siempre queda entre el menor y el mayor valor cuando todos los pesos son positivos. Si obtienes un resultado fuera de ese intervalo, revisa la fórmula, la unidad o el signo de los pesos. Esta herramienta no acepta pesos negativos ni cero: un componente sin influencia debe eliminarse, y un peso negativo suele pertenecer a otro modelo, como penalizaciones aditivas, no a una media ponderada ordinaria.',
      ],
    },
    {
      heading: 'Porcentajes, créditos y unidades compatibles',
      paragraphs: [
        'En una asignatura, los pesos pueden ser porcentajes: prácticas 30%, examen 50% y proyecto 20%. En un expediente, pueden ser créditos: una materia de 6 créditos influye el doble que otra de 3 si la normativa define la media de ese modo. En una media de precios o tiempos, los pesos podrían ser cantidades, unidades producidas u horas. La operación es la misma, pero la interpretación cambia con la unidad.',
        'Usa una sola convención dentro del cálculo. Si una fila contiene 25 para representar 25% y otra 0,75 para representar 75%, el programa las tratará como 25 y 0,75, no como porcentajes equivalentes, y el resultado estará dominado por la primera. Convierte primero a 25 y 75 o a 0,25 y 0,75. La página muestra la suma de pesos para que puedas detectar este tipo de incoherencia.',
      ],
      items: [
        'Porcentajes coherentes: 25, 35 y 40.',
        'Proporciones coherentes: 0,25, 0,35 y 0,40.',
        'Créditos coherentes: 3, 6 y 9.',
        'No mezclar porcentajes, decimales y créditos en un mismo cálculo.',
      ],
    },
    {
      heading: 'Notas pendientes, ceros y reglas de evaluación',
      paragraphs: [
        'Una celda vacía no es lo mismo que una nota cero. Cero puede ser una calificación real que debe incluirse; vacío suele significar pendiente, no aplicable o dato desconocido. Para evitar una exclusión invisible, la calculadora exige completar valor y peso en toda fila activa. Una fila totalmente vacía se ignora, pero una fila con solo uno de los dos campos genera un error. Así puedes decidir conscientemente si eliminarla, completarla o calcular un escenario provisional.',
        'Las instituciones pueden exigir reglas adicionales: mínimos por componente, recuperación, convocatoria extraordinaria, redondeo a cierto decimal, compensación, exclusión de la nota más baja o tratamiento específico de no presentados. Una media aritméticamente correcta no confirma que se cumpla esa normativa. Consulta la guía docente o reglamento, calcula cada condición por separado y no uses esta página para prometer una calificación oficial.',
      ],
    },
    {
      heading: 'Diferencia entre media ponderada y fórmulas aditivas',
      paragraphs: [
        'No toda fórmula con porcentajes es una media ponderada. Algunas admisiones suman una nota base y puntos adicionales por materias; algunas rúbricas aplican penalizaciones después de la media; ciertos índices multiplican factores o usan topes. Si la norma dice «0,6 × A + 0,4 × B», puede introducirse como pesos 0,6 y 0,4 porque suman uno. Si dice «A + 0,2 × B» y A ya es una base completa, dividir por 1,2 cambiaría la fórmula y esta calculadora no sería la herramienta adecuada.',
        'Antes de introducir datos, reescribe la regla exactamente y comprueba si pide dividir entre la suma de coeficientes. La media ponderada responde a «¿cuál es el centro de estos valores dando esta importancia relativa?». Una puntuación compuesta puede responder a otra pregunta. En procesos de acceso, becas, nóminas o contratos, usa el simulador oficial o la normativa vigente cuando exista.',
      ],
    },
    {
      heading: 'Redondeo, comprobación y privacidad',
      paragraphs: [
        'Mantén todos los decimales disponibles durante los productos y la división, y redondea el resultado una sola vez al final. Redondear cada componente puede acumular diferencias. La calculadora muestra hasta tres decimales, pero el valor visible no crea más precisión que los datos de entrada. Para verificar, comprueba que el peso total coincide con tu diseño y que la media cae entre el mínimo y el máximo de los valores incluidos.',
        'Un informe reproducible enumera valores, pesos, unidad de ponderación, fórmula y regla de redondeo. Por ejemplo: «La media se ponderó por créditos ECTS mediante Σ(créditos × nota)/Σcréditos y se redondeó a dos decimales al final». No introduzcas nombres ni expedientes: la herramienta solo necesita números. Las filas y el resultado permanecen en la pestaña y se invalidan en cuanto editas o eliminas una entrada.',
      ],
    },
  ],
  formula: {
    expression: 'Media ponderada = Σ(wᵢ × xᵢ) / Σwᵢ',
    explanation: 'xᵢ es cada valor y wᵢ su peso positivo. Los pesos pueden usar cualquier unidad coherente y no necesitan sumar 100, porque la suma total aparece en el denominador.',
  },
  instructions: [
    'Identifica los valores que realmente pertenecen a la fórmula y la unidad común de los pesos.',
    'Escribe un valor y un peso positivo en cada fila activa.',
    'Pulsa Añadir fila para incorporar otro componente o Quitar para eliminarlo.',
    'Comprueba que ninguna fila esté parcialmente rellena.',
    'Pulsa Calcular media ponderada y revisa peso total, suma ponderada y media.',
    'Aplica después las reglas oficiales de mínimos, topes y redondeo que correspondan.',
  ],
  examples: [
    'Calcular una nota final con prácticas 30% y examen 70%.',
    'Obtener una media de expediente ponderada por créditos.',
    'Combinar puntuaciones de una rúbrica con importancias distintas.',
    'Calcular un precio medio ponderado por unidades compradas.',
    'Comparar un escenario provisional sin una actividad pendiente frente al escenario con nota cero.',
  ],
  audience: [
    'Estudiantes y docentes que revisan componentes de evaluación.',
    'Personas que calculan medias ponderadas por créditos u horas.',
    'Equipos que quieren auditar una suma de productos y pesos.',
    'Usuarios que necesitan diferenciar una media de una fórmula aditiva.',
  ],
  caseStudies: [
    {
      title: 'Evaluación 30/70',
      description: 'Una práctica vale 30% y obtiene 80; el examen vale 70% y obtiene 90. La suma es 8.700, el peso total 100 y la media final 87.',
    },
    {
      title: 'Expediente por créditos',
      description: 'Tres materias se ponderan con 3, 6 y 9 créditos. La estudiante conserva esos créditos como unidad y no los mezcla con porcentajes de evaluación interna.',
    },
    {
      title: 'Actividad pendiente',
      description: 'El docente no escribe cero en una actividad sin calificar. Calcula un escenario provisional eliminando la fila y otro escenario explícito con cero, etiquetando cada supuesto.',
    },
  ],
  notes: [
    'Los pesos deben ser positivos y compartir una unidad coherente.',
    'Una fila totalmente vacía se ignora; una fila a medias provoca un error.',
    'Los pesos no necesitan sumar 100 ni 1.',
    'Una nota cero es un dato; una celda vacía indica ausencia de dato.',
    'La media no aplica automáticamente mínimos, penalizaciones, topes ni recuperación.',
    'El resultado debe quedar entre el menor y el mayor valor con pesos positivos.',
  ],
  faq: [
    {
      q: '¿Los pesos tienen que sumar 100?',
      a: 'No. La fórmula divide por la suma de pesos. 30/70, 3/7 y 0,3/0,7 producen la misma proporción si se usan de forma coherente.',
    },
    {
      q: '¿Puedo usar créditos como pesos?',
      a: 'Sí, cuando la normativa define que la media se pondera por créditos. Introduce los créditos de todas las materias incluidas y no los mezcles con porcentajes.',
    },
    {
      q: '¿Qué diferencia hay entre media simple y ponderada?',
      a: 'La simple da el mismo peso a cada valor. La ponderada permite influencias distintas y divide la suma de productos entre el peso total.',
    },
    {
      q: '¿Cómo trato una nota pendiente?',
      a: 'No la conviertas automáticamente en cero. Decide si calculas un escenario provisional sin esa fila o un escenario hipotético con cero y deja claro el supuesto.',
    },
    {
      q: '¿Por qué una fila incompleta muestra error?',
      a: 'Para que un valor o peso no desaparezca silenciosamente del cálculo. Completa ambos campos o elimina la fila.',
    },
    {
      q: '¿Puedo introducir pesos negativos?',
      a: 'No en una media ponderada ordinaria. Las penalizaciones o ajustes negativos suelen pertenecer a una fórmula aditiva diferente.',
    },
    {
      q: '¿La calculadora aplica el redondeo oficial de mi centro?',
      a: 'No. Muestra hasta tres decimales. Consulta la normativa y redondea al final según la regla oficial.',
    },
    {
      q: '¿Se guardan mis notas?',
      a: 'No. Valores, pesos y resultado se procesan localmente en el navegador y no requieren datos personales.',
    },
  ],
  labels: {
    value: 'Valor o nota',
    weight: 'Peso',
    add: 'Añadir fila',
    remove: 'Quitar',
    calculate: 'Calcular media ponderada',
    weightTotal: 'Suma de pesos',
    weightedSum: 'Suma ponderada',
    result: 'Media ponderada',
    invalid: 'Completa valor y peso en cada fila activa. Usa números válidos y pesos mayores que cero.',
  },
  sources: [
    {
      label: 'Universidad del País Vasco: ponderación de calificaciones',
      href: 'https://www.ehu.eus/es/web/ecampus/aplicaciones-practicas-del-libro-de-calificaciones/introduccion',
      note: 'Explica el uso de pesos relativos en el cálculo de calificaciones y su efecto en el resultado.',
    },
    {
      label: 'Universidad Autónoma de Madrid: media ponderada por créditos',
      href: 'https://www.uam.es/FyL/documento/1446801297299/12_Mem_MUHistoriaContemp.pdf?blobheader=application/pdf',
      note: 'Ejemplo institucional del uso de créditos para ponderar una media académica.',
    },
    {
      label: 'INE: Manual básico de estadística',
      href: 'https://www.ine.es/ine/oposiciones/temario_2021/manual_basico_estadistica.pdf',
      note: 'Referencia institucional para medias y medidas descriptivas.',
    },
  ],
  privacyNote: 'Valores, pesos y resultado se calculan en el navegador. Evita añadir nombres o identificadores: no son necesarios para la operación.',
  disclaimer: 'Resultado orientativo. Comprueba la guía docente, normativa, baremo o fórmula oficial antes de usarlo como calificación, admisión o decisión administrativa.',
};

export const spanishWeightedAverageReview = {
  heading: 'Revisión antes de aceptar la media ponderada',
  intro: 'La operación solo representa tu regla si los valores, pesos y unidades se han definido de forma coherente.',
  panels: [
    { title: 'Componentes', text: 'Cada fila pertenece a la fórmula y distingue claramente cero de dato pendiente.' },
    { title: 'Pesos', text: 'Todos son positivos y usan porcentajes, proporciones, créditos u otra unidad común.' },
    { title: 'Normativa', text: 'Mínimos, topes, penalizaciones y redondeo se verifican por separado.' },
  ],
  checklistHeading: 'Lista de comprobación',
  checklist: [
    'No hay filas parcialmente rellenadas.',
    'La suma de pesos es coherente con el diseño previsto.',
    'El resultado cae entre el valor mínimo y el máximo.',
    'La regla realmente es Σwx/Σw y no una suma aditiva.',
    'El redondeo se aplica una sola vez al final.',
  ],
};
