import type { SpanishInfoPage } from './es-pages';
import type { ToolContent } from '../tools/_types';

export const spanishSpssInterpreter: ToolContent = {
  name: 'Interpretador de resultados SPSS',
  short: 'Convierte valores de una t independiente, un ANOVA de un factor o un ANOVA factorial en una guía de lectura y un borrador de resultados.',
  long: 'Selecciona el análisis y copia únicamente los estadísticos de las tablas de SPSS. El asistente indica qué fila de la prueba t corresponde según Levene, diferencia resultado significativo de magnitud importante, conserva grados de libertad decimales y prepara una frase verificable. No lee capturas, no ejecuta el modelo y no puede validar por sí solo muestreo, supuestos ni causalidad.',
  seoTitle: 'Interpretar resultados SPSS: t, Levene y ANOVA',
  seoDescription: 'Interpreta tablas SPSS de t independiente, Levene, ANOVA y ANOVA factorial. Obtén fila correcta, significación, frase APA y próximos pasos.',
  keywords: [
    'interpretar resultados SPSS',
    'cómo interpretar SPSS',
    'prueba de Levene SPSS',
    't de Student SPSS interpretación',
    'ANOVA SPSS interpretación',
    'Sig bilateral SPSS',
    'tabla muestras independientes SPSS',
    'resultado ANOVA APA 7',
  ],
  capabilities: [
    'Elegir entre t de muestras independientes, ANOVA de un factor y ANOVA factorial.',
    'Usar el valor p de Levene para señalar la fila que debe leerse en una salida clásica de SPSS.',
    'Conservar grados de libertad decimales cuando la fila de varianzas no asumidas los contiene.',
    'Formatear t, F, gl y p sin convertir una salida .000 en p = .000.',
    'Añadir diferencia de medias, medias de grupo, η² y una nota post hoc cuando existen.',
    'Separar interacción y efectos principales en un diseño factorial.',
    'Bloquear p fuera de 0–1, efectos fuera de rango, F negativos y grados de libertad no positivos.',
    'Ocultar un resultado anterior en cuanto cambias cualquier estadístico.',
  ],
  contentSections: [
    {
      heading: 'Respuesta rápida: qué tabla y qué fila leer en SPSS',
      paragraphs: [
        'Para una prueba t de muestras independientes necesitas dos bloques: «Estadísticas de grupo» para N, media y desviación estándar, y «Prueba de muestras independientes» para Levene, t, grados de libertad, significación bilateral, diferencia de medias e intervalo. Introduce en este asistente los valores de una sola variable y de una misma fila. Si Levene no es significativo con el umbral que hayas definido, la salida clásica suele llevarte a «Equal variances assumed»; si es significativo, suele señalar «Equal variances not assumed».',
        'En un ANOVA de un factor, la tabla ANOVA ofrece F, grados de libertad entre grupos y dentro de grupos y p. Un resultado ómnibus significativo no dice todavía qué grupos difieren: hay que mirar contrastes o comparaciones post hoc compatibles con el diseño y la homogeneidad. En un ANOVA factorial, empieza por la interacción. Cuando la interacción es relevante, una frase aislada sobre el efecto principal puede ocultar que el patrón cambia entre niveles del otro factor.',
      ],
      items: [
        'No mezcles t de una fila con gl o p de la otra.',
        'No confundas Sig. de Levene con Sig. bilateral de la prueba t.',
        'No uses la tabla de descriptivos como si fuera una prueba inferencial.',
        'No interpretes un ANOVA significativo sin revisar las comparaciones previstas.',
      ],
    },
    {
      heading: 'Levene no elige tu diseño ni demuestra normalidad',
      paragraphs: [
        'La prueba de Levene contrasta igualdad de varianzas, no normalidad, independencia ni calidad del muestreo. IBM documenta que la salida de t puede incluir pruebas con varianzas combinadas y separadas. El criterio mecánico p ≥ .05 frente a p < .05 es una ayuda para localizar la fila en salidas docentes, pero no reemplaza una decisión analítica previa. Con muestras pequeñas, Levene puede tener poca potencia; con muestras enormes, puede detectar diferencias de varianza poco relevantes.',
        'Mira también tamaños muestrales, desviaciones, diagramas y valores atípicos. Si las varianzas o los tamaños de grupo son diferentes, Welch suele ser una opción más defendible que cambiar de fila después de observar los datos. La calculadora t de FunnyTools usa Welch directamente y proporciona intervalo y g de Hedges; este interpretador, en cambio, reproduce el flujo de lectura de una tabla SPSS que ya existe. Documenta cuál estrategia estaba definida antes de mirar el resultado.',
      ],
      link: {
        prefix: 'Para una explicación dedicada de la salida clásica, consulta la ',
        label: 'guía de la prueba de Levene en SPSS',
        href: '/es/guias/prueba-levene-spss/',
        suffix: '.',
      },
    },
    {
      heading: 'Cómo distinguir p de tamaño, precisión e importancia',
      paragraphs: [
        'La significación estadística responde a una pregunta condicionada por un modelo y una hipótesis nula. No mide el tamaño de la diferencia, la probabilidad de que la hipótesis sea verdadera ni la importancia educativa, clínica o práctica. Por eso una salida útil conserva medias, diferencia, intervalo y efecto. El asistente puede incorporar una diferencia de medias o η² si los introduces, pero no inventa un intervalo ni un tamaño de efecto ausente.',
        'Lee el signo de t y de la diferencia según el orden de grupos definido en SPSS. Un t negativo no es un error: puede indicar que la primera media es menor. Para ANOVA, η² describe una proporción de variación en un contexto concreto y debe distinguirse de ηp². Este formulario rotula η²; si tu salida ofrece eta parcial, cambia el símbolo al redactar. Evita adjetivos como «grande» basados en una tabla universal sin considerar disciplina, medida y consecuencias.',
      ],
    },
    {
      heading: 'ANOVA de un factor: del resultado global al seguimiento',
      paragraphs: [
        'El estadístico F compara variación entre grupos con variación residual bajo el modelo. Introduce F, gl entre grupos, gl dentro de grupos y p desde la misma tabla. Si añades η², confirma que procede de ese efecto y que está entre 0 y 1. El texto post hoc es una nota libre: sirve para guardar qué procedimiento y pares revisaste, pero la herramienta no calcula ni valida sus valores.',
        'IBM señala alternativas robustas como Welch y Brown–Forsythe cuando no se asume igualdad de varianzas. La elección de Tukey, Games–Howell, contrastes planificados u otro seguimiento depende de supuestos y pregunta, no solo de que p sea menor que .05. Informa descriptivos por grupo, F, gl, p, efecto e intervalo cuando esté disponible. Si la prueba global no es significativa, no rescates comparaciones aisladas sin una justificación preespecificada.',
      ],
      items: [
        'Identifica la variable dependiente y el factor.',
        'Comprueba número de grupos y tamaños por grupo.',
        'Revisa homogeneidad y observaciones extremas.',
        'Elige seguimiento y corrección por multiplicidad de forma explícita.',
        'Conserva la tabla o sintaxis que permite reproducir el análisis.',
      ],
    },
    {
      heading: 'ANOVA factorial: interacción antes que titulares simples',
      paragraphs: [
        'Un ANOVA factorial estima al menos la interacción y los efectos principales. Introduce cada efecto como una línea distinta con su F, gl del efecto, gl del error y p. El asistente no pide sumas de cuadrados ni tipo de modelo; debes confirmar que todas las líneas vienen de la misma especificación, población analizada y tabla. Los nombres de factores se usan únicamente para que la explicación sea legible.',
        'Una interacción significativa indica que la asociación de un factor con el resultado cambia según el nivel del otro. El paso habitual es estudiar efectos simples o comparaciones dentro de niveles, con intervalos y correcciones adecuadas. Si la interacción no es significativa, los efectos principales pueden resumirse con mayor claridad, siempre que el diseño y la potencia permitan esa lectura. No borres una interacción incómoda para centrarte solo en un efecto principal favorable.',
      ],
    },
    {
      heading: 'Errores frecuentes al copiar la salida',
      paragraphs: [
        'El error más común es trasladar columnas por posición sin leer el encabezado: Levene Sig. acaba usado como p de t, o se toma el gl entero de la primera fila junto con el p de la segunda. Otro problema es escribir «p = .000». SPSS muestra tres decimales, pero ese texto significa que el valor redondea por debajo de .0005; una redacción prudente usa p < .001, no igualdad con cero.',
        'También aparecen separadores decimales incompatibles, resultados de variables distintas, filtros de casos activos y análisis repetidos con diferentes opciones. Guarda el archivo de salida, la sintaxis, la versión del programa y la fecha. Antes de pegar una frase, comprueba que N en descriptivos coincide con los gl esperados y que las medias explican el signo de la diferencia. Si no puedes reconstruir el origen de un número, vuelve a ejecutar el análisis.',
      ],
      items: [
        'Filtro, ponderación o división de archivo activados sin advertirlo.',
        'Casos perdidos tratados de forma distinta entre tablas.',
        'Una cola frente a dos colas cambiada después de ver el signo.',
        'η² confundido con ηp² o con f de Cohen.',
        '«No significativo» convertido indebidamente en «equivalente».',
      ],
    },
    {
      heading: 'De la tabla a un informe reproducible',
      paragraphs: [
        'Una frase estadística no sustituye el método. Registra software y versión, procedimiento, variable, grupos, exclusiones, tratamiento de faltantes, alfa, supuestos, estadísticos descriptivos, estimación e inferencia. La salida de este asistente es deliberadamente breve para que puedas cotejarla; después debes añadir contexto y respetar las normas de tu institución o revista.',
        'El flujo completo en español enlaza descripción y fiabilidad, elección del contraste, lectura de SPSS y redacción APA. FunnyTools no recibe tus cifras: se procesan en la pestaña. Aun así, usa nombres genéricos para variables sensibles, evita identificadores y conserva la fuente original fuera del portapapeles. La privacidad local no corrige un diseño inadecuado ni una interpretación exagerada.',
      ],
      link: {
        prefix: 'Consulta el ',
        label: 'flujo de informe estadístico para investigación',
        href: '/es/flujos/informe-estadistico-investigacion/',
        suffix: ' para revisar el proceso completo.',
      },
    },
    {
      heading: 'Qué hacer cuando el resultado no encaja',
      paragraphs: [
        'Si las medias sugieren una dirección y t muestra la contraria, revisa el orden de sustracción, la codificación de grupos y si copiaste la variable correcta. Si los gl no encajan con el tamaño de muestra, comprueba valores perdidos, Welch, ponderación y filtros. Si F es negativo, hay un error de transcripción: una razón de cuadrados medios no debe ser negativa. El formulario lo bloquea.',
        'Si un resultado cambia al retirar uno o dos casos, muestra esa sensibilidad en vez de esconderla. Si la hipótesis dependía de una cola, justifícala antes del análisis. Si deseas afirmar ausencia de una diferencia relevante, un p grande no basta; considera intervalos, potencia y métodos de equivalencia. La mejor interpretación es aquella que otra persona puede rastrear desde la frase hasta los datos y las decisiones.',
      ],
    },
  ],
  formula: {
    expression: 'lectura = diseño + tabla correcta + misma fila + estimación + incertidumbre',
    explanation: 'No existe una fórmula que convierta cualquier salida SPSS en una conclusión. La herramienta organiza valores; la validez de la interpretación depende del diseño, los supuestos, la procedencia de cada estadístico y el objetivo inferencial.',
  },
  instructions: [
    'Confirma el diseño, la variable y el análisis realmente ejecutado.',
    'Selecciona t independiente, ANOVA de un factor o ANOVA factorial.',
    'Copia valores de una sola salida y conserva sus decimales.',
    'En t, introduce por separado p de Levene y Sig. bilateral.',
    'En ANOVA, añade solo el efecto y los gl de la misma fila.',
    'Pulsa «Interpretar resultados» y coteja cada cifra con SPSS.',
    'Completa descriptivos, intervalos, efecto y seguimiento fuera de la frase breve.',
    'Guarda sintaxis, tabla y decisiones para reproducibilidad.',
  ],
  examples: [
    'Elegir la fila de una t independiente sin confundir las dos significaciones.',
    'Preparar el borrador de un ANOVA global antes de revisar Games–Howell.',
    'Separar interacción y efectos principales de un diseño 2 × 2.',
    'Detectar gl decimales y evitar redondearlos como si fueran Student.',
    'Explicar por qué un p grande no demuestra igualdad.',
  ],
  audience: [
    'Estudiantes de grado, máster y doctorado que usan SPSS.',
    'Docentes que enseñan lectura de tablas estadísticas.',
    'Investigadores que necesitan una lista de cotejo antes de redactar.',
  ],
  caseStudies: [
    { title: 'Levene p = .270', description: 'La guía señala la fila de varianzas asumidas y mantiene t(28) = 2.45, p = .021 como conjunto inseparable.' },
    { title: 'Levene p = .018', description: 'La guía cambia a la fila de varianzas no asumidas y conserva unos gl de Welch como 25.63.' },
    { title: 'Interacción p = .027', description: 'El texto prioriza efectos simples antes de convertir los efectos principales en conclusiones generales.' },
  ],
  notes: [
    'No pegues capturas ni tablas completas: introduce valores comprobados.',
    'El umbral .05 está incorporado para redactar la etiqueta, no para decidir relevancia.',
    'Levene no comprueba todos los supuestos.',
    'Un ANOVA significativo necesita seguimiento para localizar diferencias.',
    'La salida no certifica formato APA ni validez estadística.',
    'Los rótulos ingleses de las filas se conservan porque así aparecen en muchas salidas SPSS.',
  ],
  faq: [
    { q: '¿Puedo pegar una captura de SPSS?', a: 'No. El asistente usa campos estructurados para evitar OCR y confusiones de columnas. Copia cada valor desde la tabla original.' },
    { q: '¿Qué diferencia hay entre Sig. de Levene y Sig. bilateral?', a: 'La primera se refiere a igualdad de varianzas; la segunda corresponde a la prueba de diferencia de medias. No son intercambiables.' },
    { q: '¿Siempre leo la primera fila si Levene p ≥ .05?', a: 'Es la regla docente habitual para la tabla clásica, pero el plan de análisis puede preferir Welch de forma general. Documenta tu estrategia.' },
    { q: '¿Qué significa SPSS .000?', a: 'Es un valor redondeado a tres decimales. Informa p < .001, nunca p = .000.' },
    { q: '¿Un ANOVA significativo dice qué grupo es mejor?', a: 'No. Solo indica incompatibilidad global con igualdad de medias bajo el modelo; necesitas comparaciones y descriptivos.' },
    { q: '¿Debo interpretar efectos principales con interacción significativa?', a: 'Con cautela. Primero estudia efectos simples o comparaciones dentro de niveles, porque el efecto cambia según el otro factor.' },
    { q: '¿La herramienta comprueba normalidad?', a: 'No. Tampoco independencia, atípicos, linealidad, potencia ni corrección por multiplicidad.' },
    { q: '¿Se envían mis resultados a un servidor?', a: 'No. Los valores y el texto se procesan en el navegador; solo se copian al portapapeles cuando lo solicitas.' },
  ],
  labels: {
    section: 'Tipo de salida',
    independentT: 'A. Prueba t de muestras independientes',
    oneWayAnova: 'B. ANOVA de un factor',
    twoWayAnova: 'C. ANOVA factorial',
    leveneF: 'F de Levene',
    leveneP: 'p de Levene',
    t: 'Valor t',
    df: 'Grados de libertad',
    sig2: 'Sig. (bilateral)',
    meanDiff: 'Diferencia de medias',
    groupA: 'Media del grupo 1',
    groupB: 'Media del grupo 2',
    f: 'Valor F',
    dfBetween: 'gl entre grupos',
    dfWithin: 'gl dentro de grupos',
    p: 'Valor p',
    eta: 'η² (opcional)',
    postHoc: 'Resumen post hoc (opcional)',
    factorA: 'Nombre del factor A',
    factorB: 'Nombre del factor B',
    interaction: 'Interacción A × B',
    mainA: 'Efecto principal de A',
    mainB: 'Efecto principal de B',
    df1: 'gl del efecto',
    df2: 'gl del error',
    interpret: 'Interpretar resultados',
    reset: 'Borrar campos',
    copy: 'Copiar resultado',
    copied: 'Resultado copiado',
    apaSentence: 'Borrador de resultado',
    explanation: 'Interpretación y siguiente paso',
    rowGuide: 'Fila que debes localizar en SPSS',
    invalid: 'Introduce valores válidos: p entre 0 y 1, F no negativa, gl positivos y efectos dentro de su rango.',
    significant: 'estadísticamente significativo',
    notSignificant: 'no estadísticamente significativo',
    defaultFactorA: 'método de enseñanza',
    defaultFactorB: 'nivel educativo',
  },
  sources: [
    { label: 'IBM SPSS: Prueba T para muestras independientes', href: 'https://www.ibm.com/docs/es/spss-statistics/30.0.0?topic=tests-independent-samples-t-test', note: 'Documentación oficial de descriptivos, Levene, pruebas de varianzas combinadas y separadas e intervalos.' },
    { label: 'IBM SPSS: Opciones de ANOVA de un factor', href: 'https://www.ibm.com/docs/es/spss-statistics/32.0.0?topic=anova-one-way-options', note: 'Documenta homogeneidad, Welch, Brown–Forsythe, descriptivos y tratamiento de faltantes.' },
    { label: 'IBM SPSS: Análisis de un factor de la varianza', href: 'https://www.ibm.com/docs/es/spss-statistics/32.0.0?topic=edition-one-way-analysis-variance', note: 'Explica la prueba global, comparaciones y estadísticos por grupo.' },
    { label: 'APA Style: Numbers and Statistics Guide', href: 'https://apastyle.apa.org/instructional-aids/numbers-statistics-guide.pdf', note: 'Guía oficial para símbolos, decimales y resultados estadísticos.' },
  ],
  privacyNote: 'Los estadísticos y nombres de factores permanecen en esta pestaña. Usa rótulos anónimos y no copies identificadores, datos clínicos ni expedientes.',
  disclaimer: 'Asistente de lectura y redacción. No ejecuta SPSS, no valida el modelo y no sustituye a una persona cualificada para decisiones de alto impacto.',
};

export const spanishSpssReview = {
  heading: 'Revisión de una interpretación SPSS',
  intro: 'La frase solo es defendible si cada valor se puede rastrear hasta la misma salida y el mismo modelo.',
  panels: [
    { title: 'Fila', text: 'Levene, t, gl y p se leyeron sin cruzar filas ni variables.' },
    { title: 'Estimación', text: 'Medias, diferencia, intervalo y efecto acompañan al contraste cuando existen.' },
    { title: 'Seguimiento', text: 'Post hoc o efectos simples responden a la estructura real del análisis.' },
  ],
  checklistHeading: 'Comprobaciones antes de entregar',
  checklist: [
    'La tabla, sintaxis y versión de SPSS están guardadas.',
    'No se escribió p = .000.',
    'Los gl de Welch conservan sus decimales.',
    'η² y ηp² no se confundieron.',
    'La conclusión no convierte asociación en causalidad.',
  ],
};

export const spanishGpaCalculator: ToolContent = {
  name: 'Calculadora de GPA por créditos',
  short: 'Calcula un promedio ponderado de puntos de calidad con escala 4.0 o 4.3 y notas de A+ a F.',
  long: 'Añade una fila por asignatura, introduce créditos y selecciona la calificación literal. La calculadora multiplica créditos por puntos, suma créditos y puntos de calidad y muestra el GPA ponderado. Puedes alternar entre una tabla 4.0 —A+ y A valen 4.0— y una 4.3 —A+ vale 4.3—. Es una simulación: no convierte oficialmente notas españolas o latinoamericanas ni sustituye la normativa de la institución receptora.',
  seoTitle: 'Calculadora GPA 4.0 y 4.3 por créditos',
  seoDescription: 'Calcula GPA ponderado con créditos y notas A+ a F. Compara escalas 4.0 y 4.3, puntos de calidad, fórmula, ejemplos y límites de conversión.',
  keywords: [
    'calculadora GPA',
    'calcular GPA 4.0',
    'calculadora GPA 4.3',
    'promedio GPA por créditos',
    'convertir notas a GPA',
    'GPA universidad',
    'grade point average calculadora',
    'puntos de calidad GPA',
  ],
  capabilities: [
    'Añadir y quitar asignaturas sin registro.',
    'Usar créditos enteros o decimales positivos.',
    'Elegir notas A+, A, A−, B+, B, B−, C+, C, C−, D o F.',
    'Cambiar entre una tabla 4.0 y una tabla 4.3.',
    'Mostrar créditos totales, puntos de calidad y GPA con dos decimales.',
    'Ignorar filas vacías y avisar cuando un crédito es cero o negativo.',
    'Recalcular inmediatamente al editar una fila o cambiar la escala.',
    'Copiar un resumen que incluye la escala utilizada.',
  ],
  contentSections: [
    {
      heading: 'Respuesta rápida: cómo se calcula el GPA ponderado',
      paragraphs: [
        'Cada nota literal se convierte en puntos según la escala seleccionada. Multiplica los puntos por los créditos de la asignatura, suma esos productos y divide por el total de créditos válidos. Con tres créditos de A (4.0) y tres de B+ (3.3), hay 12.0 + 9.9 = 21.9 puntos de calidad; 21.9 / 6 = 3.65. La herramienta muestra los tres componentes para que puedas auditar el resultado.',
        'En la escala 4.3, A+ vale 4.3; en la 4.0, A+ y A valen 4.0. El resto de la tabla se mantiene visible en la nota de escala. Esta elección puede cambiar el resultado, pero ninguna de las dos tablas es universal. Una universidad puede usar 4.0 sin plus/minus, asignar D+ o excluir aprobados/no aprobados. Antes de enviar un GPA, lee la política del destinatario.',
      ],
      items: [
        'Numerador: suma de créditos × puntos.',
        'Denominador: suma de créditos incluidos.',
        'Resultado: promedio ponderado, no media simple de letras.',
        'Regla oficial: la publicada por la institución que evalúa el expediente.',
      ],
    },
    {
      heading: 'Diferencia entre escala 4.0, 4.3 y nota sobre 10',
      paragraphs: [
        'GPA no significa una única tabla internacional. En muchos contextos estadounidenses, 4.0 es el máximo ordinario; algunas instituciones reconocen A+ con 4.3 y otras usan cursos ponderados que superan 4.0. España suele registrar calificaciones universitarias sobre 10 y créditos ECTS. En otros países hispanohablantes aparecen escalas sobre 5, 10, 20, 100 o categorías literales con distintos mínimos de aprobación.',
        'No conviertas una nota 8/10 multiplicando por 0.4 y afirmes que equivale oficialmente a 3.2. Esa regla lineal ignora mínimos de aprobado, distribución, exigencia institucional y tablas de equivalencia. El Ministerio español mantiene procedimientos para equivalencia de notas medias extranjeras, y las universidades receptoras pueden pedir una evaluación propia. Esta calculadora empieza con letras ya asignadas; no decide cómo una nota local se transforma en A o B.',
      ],
    },
    {
      heading: 'Qué créditos debes incluir',
      paragraphs: [
        'Introduce los créditos que la institución usa para ponderar el promedio. Si todas las asignaturas pesan igual, puedes usar 1 en cada fila y obtendrás la media de puntos. Si una materia vale seis ECTS y otra tres, sus pesos deben reflejar 6 y 3. No mezcles horas, ECTS y créditos estadounidenses en la misma suma salvo que ya exista una conversión oficial coherente.',
        'Prácticas, tesis, transferencias, cursos repetidos, retiradas, aprobados/no aprobados y asignaturas convalidadas pueden incluirse, excluirse o reemplazarse según la norma. FunnyTools no conoce esas marcas. La mejor práctica es crear una primera simulación con todas las filas y otra siguiendo literalmente la política de admisión; documenta las diferencias y conserva el expediente original.',
      ],
      items: [
        'Usa el mismo tipo de crédito en todas las filas.',
        'No cuentes dos veces una asignatura repetida sin confirmar la regla.',
        'No asignes F a una retirada si la institución la excluye.',
        'Separa GPA del periodo y GPA acumulado cuando el formulario los distingue.',
      ],
    },
    {
      heading: 'Cómo leer créditos, puntos de calidad y GPA',
      paragraphs: [
        'Los créditos totales indican el peso incluido. Los puntos de calidad son la suma intermedia de cada crédito multiplicado por el valor de su nota. El GPA es el cociente. Ver los puntos permite detectar un error: si seis créditos con A en escala 4.0 no producen 24 puntos, hay una fila o escala equivocada.',
        'El resultado se redondea a dos decimales para mostrarlo, pero el cálculo interno usa los valores completos de la tabla. No redondees cada fila antes de sumar. Si una convocatoria exige tres decimales, recalcula con su fórmula o conserva más precisión fuera de la herramienta. Un GPA de 3.50 no revela por sí solo la dificultad de cursos, tendencia temporal, posición relativa ni requisitos previos.',
      ],
    },
    {
      heading: 'Ejemplo completo con escala 4.0 y 4.3',
      paragraphs: [
        'Supón cuatro asignaturas: Estadística, 4 créditos, A+; Metodología, 3, A; Programación, 3, B+; Seminario, 2, B. En escala 4.0 los puntos son 16.0 + 12.0 + 9.9 + 6.0 = 43.9; dividido por 12 da 3.6583, mostrado como 3.66. En escala 4.3, solo cambia A+: 17.2 + 12.0 + 9.9 + 6.0 = 45.1; 45.1 / 12 = 3.7583, mostrado como 3.76.',
        'La diferencia de 0.10 no significa que una escala sea más generosa en todos los expedientes; depende de cuántas A+ existan y de sus créditos. Al comparar personas, no uses GPA calculados con tablas distintas. Al presentar una solicitud, escribe la escala y, si te lo piden, adjunta la leyenda oficial del expediente.',
      ],
    },
    {
      heading: 'Simular una meta sin convertirla en promesa',
      paragraphs: [
        'Puedes duplicar mentalmente un escenario añadiendo cursos futuros con notas esperadas. El resultado responde «¿qué GPA producirían estas entradas?» y no «¿qué nota obtendré?». Para estimar la calificación necesaria, incluye el historial que la institución computa y prueba escenarios realistas. Una materia con muchos créditos moverá más el promedio.',
        'No confundas GPA de un semestre con acumulado. Si solo introduces el semestre actual, la salida no contiene años anteriores. Para combinar un GPA histórico sin todas las asignaturas, necesitas sus créditos acumulados y puntos de calidad: multiplica GPA anterior por créditos anteriores, suma puntos y créditos nuevos y divide. La interfaz por cursos es más transparente cuando dispones del detalle.',
      ],
    },
    {
      heading: 'Conversión oficial, admisión y becas',
      paragraphs: [
        'Las solicitudes internacionales pueden pedir el promedio tal como aparece en el expediente, una conversión realizada por la universidad, una declaración oficial de equivalencia o un informe de credenciales. Fulbright España remite a la Declaración de Equivalencia de Nota Media cuando la institución usa otra escala. El Ministerio también publica información por sistemas educativos y advierte que ciertos cuadros son informativos, no decisiones jurídicas.',
        'Por eso no titules la salida «equivalencia oficial». Utiliza «estimación con tabla 4.0/4.3», guarda la leyenda elegida y sigue las instrucciones del formulario. Si el destinatario dice «no convierta sus notas», entrega la escala original. Si exige una agencia o trámite, un cálculo privado no lo reemplaza. Esta transparencia aumenta la utilidad del resultado y evita perjudicar una solicitud.',
      ],
    },
    {
      heading: 'Errores frecuentes en una calculadora GPA',
      paragraphs: [
        'Promediar letras sin créditos, contar una retirada como F, mezclar escalas y redondear cada curso son fallos comunes. También se intenta usar A+ = 4.3 en un expediente que declara máximo 4.0. La herramienta obliga a elegir escala y muestra puntos; aun así, tú decides qué filas pertenecen al cálculo.',
        'Una fila con créditos vacíos no entra. Un valor cero o negativo tampoco y aparece una advertencia junto a la tabla de escala. El nombre del curso es opcional y no afecta al cálculo. Antes de copiar, compara créditos totales con el expediente, cambia temporalmente una nota para comprobar que el GPA responde y vuelve al valor correcto.',
      ],
      items: [
        'Escala no identificada en el resumen.',
        'Créditos de sistemas distintos sumados directamente.',
        'Curso repetido contado con la regla equivocada.',
        'Asignatura sin créditos que se cree incluida.',
        'Resultado estimado presentado como certificación.',
      ],
    },
    {
      heading: 'Privacidad y registro de la simulación',
      paragraphs: [
        'Los nombres, créditos y notas se procesan localmente y no se envían a FunnyTools. Puedes omitir nombres y usar «Curso 1». Evita pegar número de estudiante, documento, fecha de nacimiento o información disciplinaria. Al copiar, el resumen incluye escala y totales, no la lista de cursos.',
        'Para una decisión importante, conserva una hoja separada con fecha, versión de la escala, política consultada y filas incluidas. Una calculadora útil no solo produce un número: deja claro qué supuestos lo generaron. Si la institución publica otra tabla, reproduce el cálculo con esa tabla en una hoja o sistema oficial en lugar de forzarla dentro de 4.0 o 4.3.',
      ],
    },
  ],
  formula: {
    expression: 'GPA = Σ(créditosᵢ × puntosᵢ) / Σcréditosᵢ',
    explanation: 'Cada asignatura válida aporta sus créditos multiplicados por los puntos de la nota en la escala elegida. Se excluyen filas sin créditos positivos. La fórmula no convierte por sí sola una nota local en letra.',
  },
  instructions: [
    'Consulta qué escala y qué asignaturas acepta el destinatario.',
    'Selecciona 4.0 o 4.3.',
    'Añade una fila por asignatura incluida.',
    'Introduce créditos positivos del mismo sistema.',
    'Elige la nota literal que ya corresponda según la regla aplicable.',
    'Comprueba créditos y puntos de calidad antes de leer el GPA.',
    'Prueba escenarios sin confundirlos con resultados oficiales.',
    'Copia el resumen y anota la fuente de la escala.',
  ],
  examples: [
    'Calcular el GPA de un periodo con asignaturas de pesos distintos.',
    'Comparar cómo cambia A+ entre una tabla 4.0 y otra 4.3.',
    'Detectar que una media simple de letras ponderaba mal un curso de seis créditos.',
    'Simular un semestre futuro con entradas claramente hipotéticas.',
    'Preparar una estimación antes de consultar la equivalencia oficial.',
  ],
  audience: [
    'Estudiantes que solicitan movilidad, máster o beca.',
    'Personas que revisan un expediente con notas literales.',
    'Orientadores que explican promedio ponderado y escalas.',
  ],
  caseStudies: [
    { title: 'Dos cursos de 3 créditos', description: 'A y B+ producen 3.65 tanto en 4.0 como en 4.3, porque no hay A+.' },
    { title: 'A+ con cuatro créditos', description: 'El mismo expediente puede subir 1.2 puntos de calidad al pasar de 4.0 a 4.3; la escala debe acompañar al GPA.' },
    { title: 'Fila con cero créditos', description: 'La fila se excluye y aparece una advertencia, evitando que una nota sin peso altere o parezca integrar el total.' },
  ],
  notes: [
    'Las tablas 4.0 y 4.3 no son universales.',
    'La herramienta no transforma automáticamente notas sobre 10, 20, 100 o 5.',
    'Los cursos repetidos y convalidados dependen de normativa.',
    'La cifra es una estimación, no un expediente ni equivalencia oficial.',
    'El destinatario puede pedir que no conviertas las notas.',
    'Comprueba siempre créditos totales y escala.',
  ],
  faq: [
    { q: '¿Qué escala debo elegir, 4.0 o 4.3?', a: 'La que indique la institución que calculará o recibirá el GPA. La diferencia principal de esta herramienta es que A+ vale 4.3 o 4.0.' },
    { q: '¿Puedo convertir directamente una nota española sobre 10?', a: 'No de forma oficial. Necesitas la regla del destinatario o el procedimiento de equivalencia aplicable; una regla lineal puede ser incorrecta.' },
    { q: '¿Los créditos ECTS sirven como peso?', a: 'Sí para una simulación si todas las filas usan ECTS y la política los pondera así. No los mezcles con otro tipo de crédito sin conversión.' },
    { q: '¿Qué ocurre con una fila vacía?', a: 'No se incluye. Los créditos cero o negativos también se excluyen y generan una advertencia.' },
    { q: '¿Cómo se tratan cursos repetidos?', a: 'La herramienta no lo decide. Algunas instituciones sustituyen, promedian o conservan ambos intentos; aplica su regla.' },
    { q: '¿Puedo calcular GPA acumulado?', a: 'Sí si introduces todas las asignaturas incluidas. Si solo tienes GPA y créditos previos, necesitas combinar puntos de calidad fuera de la lista.' },
    { q: '¿Por qué se muestran puntos de calidad?', a: 'Permiten auditar el numerador y combinar periodos sin promediar dos GPA de forma incorrecta.' },
    { q: '¿Se guardan mis notas?', a: 'No. Se calculan en el navegador y desaparecen al cerrar o recargar la página.' },
  ],
  labels: {
    course: 'Asignatura (opcional)',
    coursePlaceholder: 'Ejemplo: Estadística',
    credits: 'Créditos',
    grade: 'Calificación',
    scale: 'Escala GPA',
    scale43: 'Escala 4.3',
    scale40: 'Escala 4.0',
    addRow: 'Añadir asignatura',
    remove: 'Quitar',
    copy: 'Copiar resumen',
    result: 'Resultado GPA',
    totalCredits: 'Créditos totales',
    qualityPoints: 'Puntos de calidad',
    gpa: 'GPA',
    noValidRows: 'Introduce al menos una asignatura con créditos positivos.',
    scaleNote: 'Escala 4.3: A+=4.3, A=4.0, A−=3.7, B+=3.3, B=3.0, B−=2.7, C+=2.3, C=2.0, C−=1.7, D=1.0 y F=0.',
    scaleNote43: 'Escala 4.3: A+=4.3, A=4.0, A−=3.7, B+=3.3, B=3.0, B−=2.7, C+=2.3, C=2.0, C−=1.7, D=1.0 y F=0.',
    scaleNote40: 'Escala 4.0: A+ y A=4.0, A−=3.7, B+=3.3, B=3.0, B−=2.7, C+=2.3, C=2.0, C−=1.7, D=1.0 y F=0.',
    ignoredInvalidRows: 'Las filas con créditos vacíos, cero o negativos no se incluyen.',
    copied: 'Resumen copiado',
  },
  sources: [
    { label: 'Ministerio de Universidades: equivalencia de notas medias', href: 'https://universidades.sede.gob.es/pagina/index/directorio/Equivalencia_notas_medias', note: 'Procedimiento oficial español para declaraciones de equivalencia de estudios universitarios extranjeros.' },
    { label: 'Fulbright España: preguntas frecuentes de estudios', href: 'https://fulbright.es/informacion/estudios-de-master-y-ph-d/realizacion-estudios-de-master-ministerio-de-universidades/preguntas-frecuentes/', note: 'Orienta sobre GPA, documentos y declaración de equivalencia para solicitudes concretas.' },
    { label: 'Ministerio de Educación: reconocimiento de títulos españoles en EE. UU.', href: 'https://www.educacionfpydeportes.gob.es/eeuu/reconocimientos-titulos/para-espanoles', note: 'Explica que universidades receptoras o agencias pueden evaluar credenciales y conversiones.' },
    { label: 'Ministerio de Educación: escalas de Canadá', href: 'https://www.educacionfpydeportes.gob.es/dam/jcr:69d11883-2a23-4767-a2ab-4cc45be7b963/canada.pdf', note: 'Ejemplo oficial de coexistencia de varias escalas y carácter informativo de las tablas.' },
  ],
  privacyNote: 'Las asignaturas, créditos y notas se calculan en la pestaña. Omite identificadores y conserva el expediente oficial en un lugar seguro.',
  disclaimer: 'Estimación aritmética con dos tablas frecuentes. No es una conversión oficial, una evaluación de credenciales ni una decisión de admisión.',
};

export const spanishGpaReview = {
  heading: 'Revisión de una estimación GPA',
  intro: 'Un resultado correcto puede ser inaplicable si se eligió una tabla o un conjunto de cursos equivocado.',
  panels: [
    { title: 'Escala', text: 'El resumen identifica 4.0 o 4.3 y coincide con la política consultada.' },
    { title: 'Pesos', text: 'Todos los créditos usan el mismo sistema y el total coincide con las filas incluidas.' },
    { title: 'Alcance', text: 'La cifra se presenta como estimación y no como equivalencia o expediente oficial.' },
  ],
  checklistHeading: 'Comprobaciones antes de usar el número',
  checklist: [
    'No se convirtió una escala local sin regla autorizada.',
    'Repetidos, retiradas y convalidados siguen la norma correcta.',
    'Créditos y puntos de calidad se revisaron.',
    'El redondeo se aplicó al final.',
    'La institución no exige otro procedimiento.',
  ],
};

export const spanishGraduateStatisticsWorkflow: SpanishInfoPage = {
  title: 'Flujo para un informe estadístico de investigación',
  seoTitle: 'Cómo hacer un informe estadístico con SPSS y APA 7',
  seoDescription: 'Flujo en español para pasar de pregunta y datos a descriptivos, supuestos, SPSS, efecto, intervalo y redacción APA 7 sin confundir tablas.',
  keywords: [
    'cómo hacer informe estadístico',
    'interpretar SPSS paso a paso',
    'resultados estadísticos APA 7',
    'flujo análisis de datos investigación',
    'informe t Student ANOVA',
    'redactar resultados tesis',
  ],
  eyebrow: 'Flujo de investigación · SPSS · APA 7',
  intro: 'Una ruta de trabajo para estudiantes e investigadores que necesitan convertir una pregunta, un archivo de datos y una salida estadística en un informe revisable. El proceso enlaza calidad de datos, descriptivos, fiabilidad, elección de prueba, supuestos, estimación, lectura de SPSS y redacción APA sin hacer pasar una frase automática por análisis completo.',
  directAnswer: [
    'Empieza antes de abrir SPSS: formula la pregunta, identifica variables, unidad de análisis, diseño y exclusiones. Después conserva una copia inmutable de los datos, documenta limpieza y produce descriptivos. Elige la prueba según diseño y objetivo, no según cuál entrega p < .05. Ejecuta el modelo, revisa supuestos y sensibilidad, extrae estimaciones e intervalos y solo entonces redacta.',
    'FunnyTools puede calcular alfa de Cronbach, Welch t, organizar tablas SPSS y generar un borrador APA 7, pero ninguna herramienta conoce por sí sola la población, la asignación, el mecanismo de faltantes o la inferencia causal. Cada salida debe poder rastrearse a datos, sintaxis y decisión. El resultado final combina número, incertidumbre, efecto, contexto y limitaciones.',
  ],
  sections: [
    {
      heading: '1. Congela la pregunta y la unidad de análisis',
      paragraphs: [
        'Escribe la pregunta en una frase que identifique población, variables y comparación o asociación. Decide si cada fila representa una persona, aula, centro, evento o medida repetida. Una prueba de grupos independientes deja de ser válida si la misma persona aparece en ambos grupos o si estudiantes están agrupados en aulas y se ignora la dependencia.',
        'Distingue confirmatorio de exploratorio. Registra hipótesis, dirección, alfa, resultado principal y análisis previstos antes de observar los resultados cuando sea posible. Si cambias la pregunta después, descríbelo como exploración. La transparencia evita que múltiples intentos se conviertan en una única historia aparentemente planificada.',
      ],
      items: [
        'Pregunta y población objetivo.',
        'Unidad de análisis e independencia.',
        'Variables, niveles y codificación.',
        'Resultado principal y secundarios.',
        'Criterios de inclusión, exclusión y detención.',
      ],
    },
    {
      heading: '2. Conserva datos originales y un diccionario',
      paragraphs: [
        'Guarda una copia de solo lectura y trabaja sobre una versión derivada. El diccionario debe indicar nombre, etiqueta, tipo, unidades, valores posibles, códigos de faltantes e ítems invertidos. No reemplaces datos originales en silencio. Cada transformación necesita una regla y, de ser posible, sintaxis reproducible.',
        'Elimina identificadores directos del archivo analítico cuando no sean necesarios. Usa un código separado y protege la clave. Las herramientas de FunnyTools procesan localmente, pero un navegador no es un repositorio de investigación. Pega datos anonimizados o ejemplos y conserva archivos completos en el entorno aprobado por tu institución.',
      ],
    },
    {
      heading: '3. Limpia sin fabricar una muestra cómoda',
      paragraphs: [
        'Comprueba duplicados, rangos imposibles, fechas, unidades, categorías y patrones de faltantes. Un valor extremo puede ser error, caso válido o señal de un proceso distinto; no lo borres solo porque cambia p. Define el criterio, muestra análisis con y sin el caso cuando sea relevante y explica la decisión.',
        'Documenta el N inicial, exclusiones y N final por análisis. La eliminación por lista, por pares o la imputación producen muestras distintas. Si varias tablas tienen N diferentes, identifica por qué. Antes del modelo, revisa distribuciones y cruces básicos: una media plausible puede esconder una categoría invertida o una columna importada como texto.',
      ],
    },
    {
      heading: '4. Calcula descriptivos antes de inferir',
      paragraphs: [
        'Para cada grupo informa N, media, desviación estándar y, cuando la distribución lo exige, mediana, rango intercuartílico y rango. Visualiza puntos o distribuciones; un gráfico de barras de medias sin datos ni intervalos oculta estructura. Comprueba si el signo de una diferencia coincide con las medias.',
        'Los descriptivos no prueban la hipótesis, pero hacen interpretable la inferencia. Un t significativo con diferencia de 0.2 unidades puede ser irrelevante; una diferencia amplia con intervalo impreciso puede requerir más datos. Conserva unidades y nombres comprensibles en todas las tablas.',
      ],
    },
    {
      heading: '5. Revisa la medición y la fiabilidad',
      paragraphs: [
        'Si una variable es una suma o media de ítems, confirma claves inversas y dimensionalidad. Calcula alfa u otro coeficiente para la muestra y versión utilizadas. Un alfa alto no demuestra validez ni un solo factor; uno bajo no se arregla eliminando preguntas hasta superar .70 sin justificación de contenido.',
        'La calculadora de alfa de Cronbach en español permite comprobar la aritmética desde una matriz anonimizada y muestra la dispersión total. Para un informe formal añade diagnóstico por ítem, intervalo y un modelo de medida cuando corresponda. Explica cómo se trataron faltantes y qué ítems entraron.',
      ],
      items: [
        'Versión e idioma de la escala.',
        'Número de ítems y sentido de codificación.',
        'Muestra y momento de medida.',
        'Coeficiente con contexto e incertidumbre.',
        'Evidencia distinta de la consistencia interna.',
      ],
    },
    {
      heading: '6. Elige la prueba por diseño y estimando',
      paragraphs: [
        'Dos grupos independientes no son lo mismo que dos medidas de las mismas personas. Para medias independientes, Welch suele proteger frente a varianzas distintas y tamaños desiguales. Para más grupos, ANOVA prueba una diferencia global y necesita seguimiento. Para diseños factoriales, la interacción cambia la prioridad de lectura. Correlación y regresión responden a otras preguntas.',
        'Define qué quieres estimar: diferencia de medias, asociación, proporción o efecto ajustado. No elijas una prueba únicamente por una secuencia de tests de supuestos. Considera independencia, forma de la distribución, atípicos, escala de medida y mecanismo de muestreo. Si el diseño es jerárquico o repetido, un modelo simple puede subestimar la incertidumbre.',
      ],
      link: {
        prefix: 'Si el diseño compara tres o más medias, revisa la ',
        label: 'guía de ANOVA en formato APA 7',
        href: '/es/guias/anova-formato-apa-7/',
        suffix: ' antes de redactar el resultado global y sus comparaciones.',
      },
    },
    {
      heading: '7. Ejecuta y guarda una salida reproducible',
      paragraphs: [
        'Guarda sintaxis, versión de SPSS, opciones, filtros, ponderaciones, tratamiento de faltantes y semilla si existe aleatoriedad. Nombra los archivos con fecha o versión. Una captura aislada no permite saber qué datos ni opciones produjeron la tabla. Exporta una salida legible, pero conserva también el proyecto o comando.',
        'En una t independiente, no mezcles Levene con la significación bilateral. En ANOVA, extrae el efecto correcto y sus gl. En un factorial, separa interacción y efectos principales. El interpretador SPSS de FunnyTools organiza estos valores y bloquea errores básicos, pero debes cotejar el resultado con la tabla.',
      ],
      link: {
        prefix: 'Comprueba la regla de filas en la ',
        label: 'guía de Levene para SPSS',
        href: '/es/guias/prueba-levene-spss/',
        suffix: '.',
      },
    },
    {
      heading: '8. Informa estimación, intervalo y efecto',
      paragraphs: [
        'No reduzcas la sección a «hubo diferencia, p =». Incluye descriptivos, diferencia o coeficiente, intervalo de confianza, estadístico, gl, p y efecto apropiado. El intervalo muestra qué magnitudes son compatibles con el modelo y los datos; el efecto necesita unidades o una definición clara.',
        'La calculadora Welch entrega diferencia, error estándar, intervalo y g de Hedges. Si usas SPSS, solicita tamaños e intervalos cuando el procedimiento lo permita. No compares etiquetas de efecto entre disciplinas sin contexto. Explica qué cambio sería material para la pregunta, aunque no coincida con el umbral estadístico.',
      ],
    },
    {
      heading: '9. Redacta APA 7 como borrador verificable',
      paragraphs: [
        'Una frase debe mantener símbolo, gl, estadístico y p del mismo análisis. Los p muy pequeños se informan como p < .001, no p = .000. Los gl de Welch pueden ser decimales. Añade nombres de variables, dirección, descriptivos y efecto; evita «demostró» cuando el diseño solo permite asociación.',
        'El generador APA 7 en español crea frases para t, ANOVA, χ², Pearson y regresión desde valores ya calculados. Úsalo para reducir errores de transcripción, no para escoger el análisis. Después revisa cursivas, tablas, figuras y requisitos de la revista o universidad.',
      ],
      link: {
        prefix: 'Para t de Student, Welch, pareada o de una muestra, sigue la ',
        label: 'guía de prueba t en APA 7',
        href: '/es/guias/prueba-t-formato-apa-7/',
        suffix: '.',
      },
    },
    {
      heading: '10. Comprueba sensibilidad y afirmaciones',
      paragraphs: [
        'Examina si la conclusión depende de una decisión razonable: exclusión de un atípico, tratamiento de faltantes, varianza asumida o transformación. No pruebes muchas variantes y muestres solo la favorable. Resume cuáles estaban planificadas y cuáles son sensibilidad.',
        'Un resultado no significativo no demuestra equivalencia; un resultado significativo no demuestra importancia ni causalidad. Para causalidad necesitas diseño y supuestos causales. Para equivalencia necesitas márgenes y pruebas adecuadas. Separa resultado numérico de interpretación sustantiva y limitaciones.',
      ],
    },
    {
      heading: '11. Entrega un paquete que otra persona pueda auditar',
      paragraphs: [
        'El paquete mínimo contiene pregunta, protocolo o plan, diccionario, datos permitidos o ruta segura, registro de limpieza, sintaxis, salida, tablas, figuras y manuscrito. Usa nombres coherentes y anota versiones. Si no puedes compartir datos, proporciona datos sintéticos, metadatos y código suficiente dentro de los límites éticos.',
        'Antes de entregar, otra persona debería poder seleccionar una cifra del texto y encontrarla en la tabla, el comando y el conjunto analítico. Esa trazabilidad es el criterio de calidad que une todas las etapas. Las herramientas aceleran tareas pequeñas; la evidencia proviene del proceso completo.',
      ],
    },
  ],
  faq: [
    { q: '¿Debo mirar primero p o las medias?', a: 'Primero verifica datos y descriptivos. Después interpreta estimación, intervalo, efecto y p en conjunto.' },
    { q: '¿Welch sustituye siempre a Student?', a: 'Welch es una opción robusta frecuente para dos grupos independientes, pero la prueba debe corresponder al diseño y objetivo.' },
    { q: '¿Levene decide automáticamente la fila?', a: 'Ayuda a leer una salida clásica, pero no sustituye un plan. También revisa varianzas, tamaños, atípicos y alternativas robustas.' },
    { q: '¿Puedo informar solo p y el estadístico?', a: 'No es una buena práctica. Añade descriptivos, estimación, intervalo y tamaño de efecto cuando corresponda.' },
    { q: '¿Qué hago si SPSS muestra .000?', a: 'Informa p < .001. No existe una probabilidad observada exactamente cero demostrada por esa pantalla.' },
    { q: '¿Un resultado no significativo prueba que no hay efecto?', a: 'No. Revisa intervalo, precisión, potencia y, si buscas equivalencia, usa un diseño y margen específicos.' },
    { q: '¿FunnyTools guarda datos de investigación?', a: 'Las herramientas citadas procesan entradas en el navegador. Aun así, usa datos anonimizados y el almacenamiento aprobado por tu institución.' },
    { q: '¿El generador APA reemplaza la revisión del informe?', a: 'No. Produce un borrador desde cifras introducidas; debes verificar análisis, símbolos, contexto, tablas y guía editorial.' },
  ],
  review: {
    heading: 'Control de trazabilidad del informe',
    intro: 'La revisión final sigue la ruta inversa: desde cada afirmación hasta la tabla, la sintaxis, los datos y la pregunta.',
    checks: [
      { title: 'Datos', text: 'N, exclusiones, faltantes y transformaciones están documentados.' },
      { title: 'Modelo', text: 'La prueba corresponde al diseño, la dependencia y el estimando.' },
      { title: 'Salida', text: 'Estadísticos, gl, p, intervalos y efectos proceden de la misma ejecución.' },
      { title: 'Texto', text: 'La afirmación respeta magnitud, incertidumbre y límites causales.' },
      { title: 'Reproducción', text: 'Sintaxis, versión y archivos permiten reconstruir el resultado.' },
      { title: 'Privacidad', text: 'Los materiales compartidos no exponen identificadores ni datos no autorizados.' },
    ],
  },
  sources: [
    { label: 'APA Style: Journal Article Reporting Standards', href: 'https://apastyle.apa.org/jars', note: 'Estándares oficiales para documentar investigación cuantitativa y distintos diseños.' },
    { label: 'APA Style: Quantitative Research Reporting Standards', href: 'https://apastyle.apa.org/jars/quant-table-1.pdf', note: 'Lista de elementos de diseño, análisis, resultados e interpretación.' },
    { label: 'IBM SPSS: Prueba T para muestras independientes', href: 'https://www.ibm.com/docs/es/spss-statistics/30.0.0?topic=tests-independent-samples-t-test', note: 'Documentación oficial de datos, supuestos, descriptivos, Levene, intervalos y efecto.' },
    { label: 'IBM SPSS: Opciones de ANOVA de un factor', href: 'https://www.ibm.com/docs/es/spss-statistics/32.0.0?topic=anova-one-way-options', note: 'Opciones de descriptivos, homogeneidad, Welch, Brown–Forsythe y faltantes.' },
    { label: 'NIST: Two-Sample t-Test for Equal Means', href: 'https://www.itl.nist.gov/div898/handbook/eda/section3/eda353.htm', note: 'Referencia independiente para estadístico, supuestos e hipótesis de dos muestras.' },
  ],
};
