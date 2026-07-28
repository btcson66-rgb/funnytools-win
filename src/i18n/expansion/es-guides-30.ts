import type { SpanishInfoPage } from './es-pages';

export const spanishTwoWayAnovaGuide: SpanishInfoPage = {
  title: 'Interacción en un ANOVA de dos factores: cómo interpretarla',
  seoTitle: 'Interacción en ANOVA de dos factores',
  seoDescription: 'Aprende a interpretar una interacción en ANOVA de dos factores, distinguirla de los efectos principales, analizar efectos simples y redactarla en APA 7.',
  keywords: [
    'interacción ANOVA dos factores',
    'ANOVA factorial interpretación',
    'efectos principales y simples',
    'gráfico de interacción ANOVA',
    'interacción significativa qué hacer',
    'ANOVA 2x2 SPSS',
  ],
  eyebrow: 'Guía de estadística · ANOVA factorial · efectos simples',
  intro: 'Un ANOVA de dos factores no responde una sola pregunta, sino tres: si cambia el resultado entre los niveles del factor A, si cambia entre los del factor B y si el efecto de uno depende del otro. La tercera pregunta es la interacción. Esta guía enseña a leerla con medias de celda, gráficos, contrastes y lenguaje que no confunda significación con importancia.',
  directAnswer: [
    'Existe interacción cuando la diferencia asociada con un factor cambia según el nivel del otro. Si un método mejora diez puntos en principiantes pero casi nada en avanzados, el efecto del método depende del nivel. En la tabla se reconoce en la fila A × B; una p inferior al alfa planificado aporta evidencia contra un patrón puramente aditivo.',
    'Una interacción significativa se interpreta antes que los efectos principales porque estos promedian sobre el otro factor y pueden ocultar direcciones opuestas. Examina las medias de cada celda, representa el patrón y analiza efectos simples o comparaciones previstas con control de multiplicidad. No basta con decir que «hay interacción» ni con mirar si las líneas se cruzan.',
  ],
  sections: [
    {
      heading: 'Qué pregunta responde la interacción',
      paragraphs: [
        'Imagina dos factores: método de enseñanza —A o B— y nivel inicial —bajo o alto—. El efecto principal de método compara A con B promediando ambos niveles. El efecto principal de nivel compara bajo con alto promediando métodos. La interacción pregunta algo distinto: ¿la diferencia A−B es igual en nivel bajo y alto? Si esas dos diferencias no coinciden más de lo esperable por variación aleatoria, aparece una interacción.',
        'La definición evita un error común: dos efectos principales significativos no forman una interacción. Puede ocurrir que A supere a B por cinco puntos tanto en nivel bajo como alto; habría efecto de método, quizá efecto de nivel, pero el patrón es paralelo y aditivo. También puede existir interacción sin ningún efecto principal claro, por ejemplo cuando A ayuda a un grupo y perjudica al otro y ambos cambios se cancelan al promediar.',
      ],
    },
    {
      heading: 'Cómo localizarla en SPSS, R, jamovi o JASP',
      paragraphs: [
        'Busca una fila nombrada factorA * factorB, factorA:factorB, A × B o una expresión equivalente. Esa fila tiene su propia suma de cuadrados, grados de libertad, F, p y, según el programa, tamaño de efecto. Lee todos los valores de la misma fila y del mismo modelo. La p de Levene, la de un efecto principal o la de una comparación posterior no sustituyen la p de interacción.',
        'En un diseño 2 × 2, el efecto de interacción suele tener un grado de libertad en el numerador. Con más niveles, gl = (a−1)(b−1). El denominador depende del diseño, los casos válidos y la estructura del modelo. Medidas repetidas, diseños mixtos y correcciones pueden producir otros denominadores; no fuerces sus resultados dentro de una plantilla entre sujetos.',
      ],
      link: {
        prefix: 'Pasa F, gl, p y tipo de efecto por el ',
        label: 'interpretador de resultados SPSS',
        href: '/es/herramientas/interpretar-resultados-spss/',
        suffix: ' antes de redactar.',
      },
    },
    {
      heading: 'Medias de celda: la tabla que explica el resultado',
      paragraphs: [
        'La prueba F indica si el patrón observado es compatible con ausencia de interacción, pero no explica la dirección. Para eso necesitas una tabla con N, media y dispersión de cada combinación. En un 2 × 2 hay cuatro celdas. Compara la diferencia entre métodos dentro de cada nivel y, si responde a la pregunta, la diferencia entre niveles dentro de cada método.',
        'Ejemplo: principiantes con método A, M = 74; principiantes con B, M = 62; avanzados con A, M = 82; avanzados con B, M = 81. La diferencia A−B es 12 en principiantes y 1 en avanzados. La interacción describe esa diferencia de diferencias: 12−1 = 11 puntos. Todavía hacen falta incertidumbre y prueba; la aritmética muestra qué estimando está detrás de la fila F.',
      ],
      items: [
        'Verifica que las etiquetas y el orden de los factores sean correctos.',
        'Incluye tamaño de cada celda: un promedio basado en tres casos no pesa igual que uno basado en treinta.',
        'Muestra SD o intervalos; las medias solas ocultan la precisión.',
        'Con datos desbalanceados, confirma qué medias estimadas y sumas de cuadrados usa el modelo.',
      ],
    },
    {
      heading: 'Gráfico de interacción: útil, pero no es una prueba',
      paragraphs: [
        'Un gráfico conecta las medias de un factor para cada nivel del otro. Líneas aproximadamente paralelas sugieren ausencia de interacción; líneas que divergen, convergen o se cruzan sugieren que el efecto cambia. El gráfico permite detectar la forma: ordinal si la dirección se mantiene y cambia la magnitud, o de cruce si la dirección se invierte.',
        'No diagnostiques significación por la inclinación. La escala del eje puede exagerar una diferencia y la ausencia de intervalos oculta incertidumbre. Tampoco concluyas que líneas que no se cruzan significan «sin interacción»: divergir es suficiente. Usa el gráfico para explicar y verificar, y la prueba con su intervalo o efectos simples para cuantificar.',
      ],
    },
    {
      heading: 'Qué hacer cuando la interacción es significativa',
      paragraphs: [
        'Primero define qué descomposición responde a la hipótesis. Si el objetivo era saber qué método funciona dentro de cada nivel, compara A y B por separado en principiantes y avanzados. Si la pregunta era cómo cambia el nivel dentro de cada método, invierte el condicionamiento. Ejecutar ambas familias sin plan duplica oportunidades de falsos positivos.',
        'Después aplica una corrección apropiada a la familia de comparaciones —por ejemplo Holm o Bonferroni— o usa contrastes planificados. Informa diferencia estimada, intervalo, estadístico y p ajustada, no solo «significativo/no significativo». Dos p, una menor y otra mayor que .05, no prueban por sí solas que los efectos sean distintos: la interacción es la prueba directa de esa diferencia.',
      ],
    },
    {
      heading: 'Efectos simples, comparaciones y tendencias',
      paragraphs: [
        'Un efecto simple evalúa un factor dentro de un nivel concreto del otro. Si un factor tiene más de dos niveles, el efecto simple global puede necesitar comparaciones por pares para localizar la diferencia. Una variable ordenada también puede justificar contrastes de tendencia. Declara cuáles se planificaron antes y cuáles surgieron al inspeccionar los datos.',
        'No conviertas cada celda en una t independiente sin considerar el error del modelo, el ajuste múltiple y la pregunta. Herramientas como medias marginales estimadas conservan el marco del modelo y permiten contrastes coherentes. Con covariables, desbalance o modelos mixtos, las medias estimadas pueden diferir de los promedios crudos; informa cuál utilizas.',
      ],
    },
    {
      heading: 'Cómo tratar los efectos principales',
      paragraphs: [
        'Con una interacción relevante, un efecto principal es un promedio condicionado por la distribución de niveles. Puede mencionarse, pero no debe convertirse en la conclusión universal. «El método A obtuvo mayor puntuación en promedio» necesita inmediatamente la precisión de que la ventaja se concentró en principiantes, si ese es el patrón.',
        'Si la interacción no alcanza el umbral, puedes interpretar los efectos principales cuando el diseño, la precisión y el modelo lo permiten. No escribas que «no existe interacción»: informa el estimado o patrón, p e incertidumbre. Una muestra pequeña puede ser incapaz de distinguir una interacción útil de cero.',
      ],
    },
    {
      heading: 'Ejemplo de interpretación y formato APA 7',
      paragraphs: [
        'Supón una interacción método × nivel, F(1, 76) = 5.90, p = .018, ηp² = .07. Un inicio defendible sería: «Se observó una interacción entre método y nivel inicial, F(1, 76) = 5.90, p = .018, ηp² = .07». Luego describe las cuatro medias y los contrastes: A superó a B entre principiantes, diferencia = 12.0, IC 95% [5.1, 18.9], p ajustada = .002; entre avanzados, diferencia = 1.0, IC 95% [−5.4, 7.4], p ajustada = .91.',
        'Cierra con la interpretación sustantiva: la ventaja de A se concentró en quienes empezaban con menor nivel. Evita decir que B «funcionó igual» en avanzados solo porque p fue grande; el intervalo indica qué diferencias siguen siendo compatibles. Añade diseño, N por celda, supuestos y si los análisis simples eran planificados.',
      ],
      link: {
        prefix: 'Da formato inicial a F, p y efecto con el ',
        label: 'generador de informes APA 7',
        href: '/es/herramientas/generador-informe-apa-7/',
        suffix: ' y completa después las medias de celda.',
      },
    },
    {
      heading: 'Supuestos y decisiones que cambian la lectura',
      paragraphs: [
        'La independencia depende del diseño, no de una prueba automática. También revisa residuos, valores extremos, homogeneidad y adecuación de la escala. Con celdas muy pequeñas o desiguales, F puede ser sensible y las medias marginales dependen de la especificación. Documenta exclusiones, faltantes y codificación.',
        'En medidas repetidas o diseños mixtos existe dependencia entre observaciones y pueden intervenir esfericidad, correcciones o efectos aleatorios. Un ANOVA factorial entre sujetos no es intercambiable con esos modelos. Si hay agrupamiento por aula, centro o persona, considera un modelo multinivel o mixto. El mejor párrafo no rescata un modelo que ignora la unidad de análisis.',
      ],
      link: {
        prefix: 'Integra supuestos, tablas y redacción con el ',
        label: 'flujo de informe estadístico de investigación',
        href: '/es/flujos/informe-estadistico-investigacion/',
        suffix: '.',
      },
    },
    {
      heading: 'Errores que producen conclusiones opuestas',
      paragraphs: [
        'Los fallos más graves son promediar sobre una interacción de cruce, llamar interacción a dos efectos principales, comparar la significación de dos p en lugar de probar su diferencia, mirar únicamente el gráfico y ejecutar docenas de efectos simples sin ajuste. También es frecuente confundir η² con ηp² o informar una fila de otro modelo.',
        'Comprueba el signo de cada contraste y el orden de referencia. Si A−B es positivo, la frase debe respetarlo. Evita causalidad en estudios observacionales. No ocultes una interacción porque complica el relato ni la infles porque resulta llamativa. El objetivo es describir dónde cambia el efecto, cuánto cambia y con qué precisión.',
      ],
    },
    {
      heading: 'Lista de comprobación antes de entregar',
      paragraphs: [
        'Confirma factores, niveles, unidad de análisis y cuatro o más celdas. Localiza la fila A × B y copia F, ambos gl, p y efecto. Revisa medias, SD, N e intervalos de celda. Elige la familia de efectos simples según la pregunta y ajusta multiplicidad. Acompaña el gráfico con valores y no recortes el eje de forma engañosa.',
        'En el texto, presenta interacción, patrón y contrastes antes de generalizar principales. Diferencia resultado estadístico de relevancia práctica. Conserva sintaxis y salida para que cada cifra pueda rastrearse. Si el patrón cambia con una decisión razonable, informa la sensibilidad en lugar de elegir silenciosamente la versión más conveniente.',
      ],
    },
  ],
  faq: [
    { q: '¿Qué significa una interacción significativa?', a: 'Que el efecto estimado de un factor cambia según el nivel del otro. Para saber cómo cambia, necesitas medias de celda y efectos simples.' },
    { q: '¿Dos efectos principales significativos forman una interacción?', a: 'No. La interacción es una prueba independiente de diferencia de diferencias y puede ser significativa o no, con independencia de los principales.' },
    { q: '¿Debo ignorar los efectos principales?', a: 'No necesariamente, pero con una interacción relevante son promedios condicionados y no deben presentarse como conclusiones universales.' },
    { q: '¿Las líneas tienen que cruzarse?', a: 'No. Líneas que convergen o divergen también representan interacción. El gráfico orienta; F, intervalos y contrastes la cuantifican.' },
    { q: '¿Qué efectos simples debo analizar?', a: 'Los que respondan a la hipótesis: A dentro de cada nivel de B o B dentro de cada nivel de A. Define la familia y controla multiplicidad.' },
    { q: '¿Una p no significativa prueba que no hay interacción?', a: 'No. Indica que los datos no aportan evidencia suficiente bajo el modelo. Revisa estimado, intervalo, potencia y patrón.' },
    { q: '¿Puedo analizar un diseño 2 × 2 con cuatro t?', a: 'No como sustituto automático. Perderías la prueba directa de interacción y multiplicarías comparaciones; utiliza el modelo factorial y contrastes coherentes.' },
    { q: '¿Cómo se informa en APA 7?', a: 'Incluye factores, F(gl1, gl2), p, tamaño de efecto, medias de celda y efectos simples con intervalos y p ajustadas.' },
  ],
  review: {
    heading: 'Control de calidad de una interacción',
    intro: 'Una interpretación sólida conecta la fila A × B con medias, gráfico, contrastes y la pregunta original.',
    checks: [
      { title: 'Modelo', text: 'Factores, dependencia, celdas y supuestos corresponden al diseño real.' },
      { title: 'Patrón', text: 'Las medias y diferencias de diferencias sostienen la dirección descrita.' },
      { title: 'Seguimiento', text: 'Los efectos simples responden a la hipótesis y controlan comparaciones múltiples.' },
    ],
  },
  sources: [
    { label: 'Penn State STAT 502: Multi-Factor ANOVA', href: 'https://online.stat.psu.edu/stat502/book/export/html/785', note: 'Curso universitario sobre efectos principales, interacción, grados de libertad y gráficos factoriales.' },
    { label: 'GraphPad Prism: Two-way ANOVA', href: 'https://www.graphpad.com/guides/prism/latest/statistics/how_to_think_about_results_from_two-way_anova.htm', note: 'Documentación sobre las tres hipótesis, F, p y tamaños de efecto.' },
    { label: 'LADAL: Two-Way ANOVA', href: 'https://ladal.edu.au/tutorials/anova/anova.html#two-way-anova', note: 'Tutorial universitario con medias de celda, interacción, efectos simples y reporte.' },
    { label: 'APA Style: Journal Article Reporting Standards', href: 'https://apastyle.apa.org/jars', note: 'Estándares oficiales de transparencia y reporte de análisis cuantitativos.' },
  ],
};

export const spanishZScoreGuide: SpanishInfoPage = {
  title: 'Puntuación Z: cómo calcularla e interpretarla sin confundir percentiles',
  seoTitle: 'Puntuación Z: cálculo e interpretación',
  seoDescription: 'Entiende qué significa una puntuación Z, cómo calcularla, cuándo usar población o muestra, cómo pasar a percentil y qué errores evitan comparaciones falsas.',
  keywords: [
    'puntuación z interpretación',
    'cómo calcular z score',
    'z positivo y negativo',
    'puntuación z a percentil',
    'tipificar datos',
    'comparar notas escalas distintas',
  ],
  eyebrow: 'Guía de estadística · tipificación · posición relativa',
  intro: 'Una puntuación Z expresa cuántas desviaciones estándar separan un valor de la media de su grupo de referencia. Convierte escalas distintas a una unidad común, pero no corrige una mala población normativa ni vuelve normal una distribución. Aquí aprenderás a calcular, leer y comunicar Z con contexto.',
  directAnswer: [
    'La fórmula es z = (x − media) / desviación estándar. Z = 0 está en la media; z = 1.5 está una desviación y media por encima; z = −2 está dos desviaciones por debajo. El signo indica dirección y el valor absoluto indica distancia relativa.',
    'Z no es un porcentaje. Solo puede transformarse en un percentil mediante una distribución de referencia o la distribución empírica. La tabla normal es razonable si el modelo normal se ajusta; en datos sesgados, discretos o con techo, el percentil observado puede diferir mucho.',
  ],
  sections: [
    {
      heading: 'Por qué Z permite comparar escalas distintas',
      paragraphs: [
        'Un 80 en matemáticas y un 80 en lengua no ocupan necesariamente la misma posición. Si matemáticas tiene media 65 y SD 10, ese 80 equivale a z = 1.5. Si lengua tiene media 75 y SD 8, equivale a z = 0.625. La puntuación bruta empata; la posición relativa no. Z elimina unidad y centra cada escala en cero con dispersión uno.',
        'La comparación solo es defendible si ambas normas representan grupos y momentos comparables. Un z calculado con la media de un aula no responde dónde está el estudiante respecto al país. Cambiar cohorte, edad, versión del examen o tratamiento de faltantes cambia media, SD y, por tanto, Z.',
      ],
      link: {
        prefix: 'Calcula el resultado y conserva los datos de referencia con la ',
        label: 'calculadora de puntuación Z',
        href: '/es/herramientas/calculadora-puntuacion-z/',
        suffix: '.',
      },
    },
    {
      heading: 'Cálculo paso a paso con un ejemplo',
      paragraphs: [
        'Supón x = 82, media = 70 y SD = 8. Primero calcula la diferencia: 82−70 = 12. Después divide por 8: z = 1.5. La frase correcta es «el valor se sitúa 1.5 desviaciones estándar por encima de la media del grupo de referencia». No significa 1.5% ni 150% más.',
        'Para x = 58 con la misma referencia, 58−70 = −12 y z = −1.5. Ambos valores están igual de lejos del centro, en direcciones opuestas. Si SD = 0, Z no está definida porque todos los valores son idénticos y no existe dispersión por la que dividir.',
      ],
    },
    {
      heading: 'Media y desviación: población, muestra y norma',
      paragraphs: [
        'Si describes una población completa, utiliza sus parámetros. Si estimas desde una muestra, media y SD son estimaciones y la Z resultante hereda incertidumbre. En evaluación educativa o clínica, el manual puede aportar normas por edad, curso o población; esas normas tienen prioridad sobre una media improvisada de quien consulta.',
        'Guarda siempre fuente, fecha, N y reglas de inclusión de la referencia. Una misma puntuación puede tener otra Z al cambiar la norma. No combines una media de un grupo con la SD de otro. Si el manual usa puntuaciones normalizadas, no asumas que aplica la transformación lineal simple.',
      ],
    },
    {
      heading: 'De Z a percentil: cuándo funciona la tabla normal',
      paragraphs: [
        'Bajo una distribución normal, z = 0 corresponde al percentil 50; z ≈ 1 al 84; z ≈ 1.645 al 95; z ≈ 1.96 al 97.5. La conversión utiliza el área acumulada de la normal estándar. Es una propiedad del modelo, no una definición universal de Z.',
        'Si la distribución está sesgada, tiene muchos empates o límites fuertes, usa rangos percentiles empíricos o las normas publicadas. Un z = 2 en una distribución de ingresos no implica automáticamente percentil 97.7. Tampoco confundas percentil 84 con «84% de respuestas correctas»: son escalas diferentes.',
      ],
      link: {
        prefix: 'Para calcular posiciones observadas y tratar empates, consulta la ',
        label: 'guía de rango percentil',
        href: '/es/guias/rango-percentil-interpretacion/',
        suffix: '.',
      },
    },
    {
      heading: 'Regla 68–95–99.7 y valores extremos',
      paragraphs: [
        'En datos aproximadamente normales, cerca del 68.27% cae entre −1 y +1 SD, 95.45% entre −2 y +2, y 99.73% entre −3 y +3. Esta regla ayuda a situar valores, pero no certifica normalidad ni define por sí sola un atípico.',
        'Una Z grande puede señalar un caso raro, un error o una observación legítima. Investiga unidad, captura y contexto antes de eliminar. En muestras pequeñas, media y SD pueden ser arrastradas por el mismo extremo, reduciendo o alterando su Z. Métodos robustos basados en mediana y MAD pueden ser mejores para detección, pero producen otra medida.',
      ],
    },
    {
      heading: 'Z individual no es el estadístico z de una prueba',
      paragraphs: [
        'La Z descriptiva de un valor usa su distancia a la media en unidades de SD. Un estadístico z de contraste puede dividir una diferencia por un error estándar y representa incertidumbre de un estimador, no dispersión individual. Comparten una estandarización, pero responden preguntas distintas.',
        'Tampoco confundas Z con puntuación T: T = 50 + 10z es una transformación lineal que evita negativos y decimales incómodos. Ambas conservan el mismo orden y distancia relativa cuando se construyen con la misma referencia.',
      ],
      link: {
        prefix: 'Para expresar la misma posición en escala 50/10, consulta la ',
        label: 'calculadora de puntuación T',
        href: '/es/herramientas/calculadora-puntuacion-t/',
        suffix: '.',
      },
    },
    {
      heading: 'Comparar cambios y resultados: límites importantes',
      paragraphs: [
        'Restar dos Z puede ser útil si ambas provienen de la misma métrica y referencia. Si cada momento se tipifica con una cohorte distinta, un cambio de Z describe posición relativa, no necesariamente aprendizaje bruto. Un estudiante puede mejorar puntos y bajar Z si todo el grupo mejora más.',
        'Z tampoco garantiza comparabilidad de constructo. Convertir una escala de ansiedad y una prueba de lectura a Z no vuelve equivalentes sus significados. La tipificación alinea unidades estadísticas; la validez depende de qué mide cada instrumento.',
      ],
    },
    {
      heading: 'Cómo informar una puntuación Z',
      paragraphs: [
        'Incluye valor bruto, referencia, media, SD y Z con precisión razonable: «Con x = 82, frente a M = 70 y SD = 8 en la cohorte 2026, z = 1.50». Si ofreces percentil, indica si procede de tabla normal o norma empírica. No presentes más decimales que los datos permiten.',
        'En informes individuales, evita etiquetas alarmistas basadas en un solo corte. Añade intervalo o error de medida cuando el instrumento lo proporcione. Una posición elevada en una escala de síntomas puede significar mayor gravedad, mientras que en rendimiento suele significar mejor resultado; la dirección pertenece al constructo.',
      ],
    },
    {
      heading: 'Errores frecuentes de interpretación',
      paragraphs: [
        'Los errores típicos son leer z = .80 como 80%, usar una SD negativa o cero, mezclar referencias, aplicar percentiles normales a cualquier forma, declarar anormal todo |z| > 2 y comparar instrumentos que miden cosas distintas. También se invierte el signo al calcular media−x en lugar de x−media.',
        'Verifica si una puntuación alta es favorable o desfavorable. En escalas clínicas, un T o Z alto puede indicar más síntomas. En tiempos de ejecución, menos puede ser mejor. La matemática describe posición; la conclusión depende de cómo se codifica el resultado.',
      ],
    },
    {
      heading: 'Lista rápida de control',
      paragraphs: [
        'Antes de calcular: confirma x, media, SD, unidad, cohorte y dirección. Durante el cálculo: resta x−media, divide por una SD positiva y conserva signo. Después: interpreta distancia, no porcentaje; revisa forma antes de convertir a percentil; documenta referencia y evita causalidad.',
        'Para comparar escalas, comprueba que el constructo y la población permitan la comparación. Para decisiones individuales, consulta el manual, error estándar de medida y normas específicas. Una cifra tipificada sin ficha técnica es portable en apariencia, pero pobre en significado.',
      ],
    },
  ],
  faq: [
    { q: '¿Qué significa z = 0?', a: 'Que el valor coincide con la media de la referencia utilizada. No significa puntuación cero ni ausencia del rasgo.' },
    { q: '¿Qué significa una Z negativa?', a: 'Que el valor está por debajo de la media; −1.2 equivale a 1.2 SD por debajo.' },
    { q: '¿Z es lo mismo que percentil?', a: 'No. Z es distancia en SD. El percentil es una posición acumulada y requiere una distribución o norma para convertirse.' },
    { q: '¿Qué Z corresponde al percentil 95?', a: 'En la normal estándar, aproximadamente 1.645. En una distribución empírica puede ser distinta.' },
    { q: '¿Puedo comparar Z de dos exámenes?', a: 'Sí si las referencias, poblaciones y constructos son comparables. La misma escala numérica no garantiza la misma interpretación.' },
    { q: '¿Qué hago si la desviación es cero?', a: 'Z no puede calcularse: no existe variación y la división sería por cero.' },
    { q: '¿Una Z mayor que 2 es un error?', a: 'No. Es relativamente poco frecuente bajo normalidad, pero puede ser válida. Verifica datos y contexto antes de decidir.' },
    { q: '¿Cómo paso de Z a T?', a: 'Usa T = 50 + 10z. Así z = 1.5 se convierte en T = 65.' },
  ],
  review: {
    heading: 'Control de una puntuación tipificada',
    intro: 'La cifra solo es interpretable si conserva la referencia que produjo su media y desviación.',
    checks: [
      { title: 'Referencia', text: 'Población, fecha, N y norma corresponden al uso previsto.' },
      { title: 'Cálculo', text: 'Se aplicó (x−media)/SD, con SD positiva y signo conservado.' },
      { title: 'Interpretación', text: 'Z se expresa como distancia, y el percentil solo se añade con una distribución válida.' },
    ],
  },
  sources: [
    { label: 'NIST: Standardize', href: 'https://www.itl.nist.gov/div898/software/dataplot/refman2/auxillar/standard.htm', note: 'Definición técnica de tipificar restando la media y dividiendo por la desviación.' },
    { label: 'NIST: Standard Normal Distribution Table', href: 'https://www.itl.nist.gov/div898/handbook/eda/section3/eda3671.htm', note: 'Tabla y ejemplos para convertir valores normalizados en probabilidades acumuladas.' },
    { label: 'NIST: What do we mean by Normal data?', href: 'https://www.itl.nist.gov/div898/handbook/pmc/section5/pmc51.htm', note: 'Parámetros normales y proporciones 68.27, 95.45 y 99.73 por ciento.' },
    { label: 'NIST: Measures of Scale', href: 'https://www.itl.nist.gov/div898/handbook/eda/section3/eda356.htm', note: 'Definición de desviación, unidades y alternativas robustas de dispersión.' },
  ],
};

export const spanishTScoreGuide: SpanishInfoPage = {
  title: 'Puntuación T: qué significa 50, cómo convertirla y leerla',
  seoTitle: 'Puntuación T: cálculo e interpretación',
  seoDescription: 'Aprende qué es una puntuación T, cómo convertir Z con T=50+10Z, qué significan 40, 50, 60 y 70, y por qué el manual y la dirección de la escala importan.',
  keywords: [
    'puntuación T interpretación',
    'T score media 50 desviación 10',
    'convertir Z a T',
    'puntuación T 60 qué significa',
    'puntaje T psicometría',
    'escala tipificada 50 10',
  ],
  eyebrow: 'Guía de psicometría · escala 50/10 · puntuaciones normativas',
  intro: 'La puntuación T es una puntuación tipificada con media 50 y desviación estándar 10. Reexpresa una Z sin negativos habituales: T = 50 + 10z. Es común en evaluación psicológica, educativa y clínica, pero el significado de «alto» depende del instrumento, la norma y la dirección del rasgo.',
  directAnswer: [
    'T = 50 representa la media del grupo normativo; 60 está una SD por encima, 40 una por debajo, 70 dos por encima y 30 dos por debajo. La distancia de diez puntos equivale a una desviación estándar cuando la escala usa la transformación T clásica.',
    'Una T no es porcentaje, percentil, prueba t de Student ni diagnóstico. Para interpretarla necesitas saber qué mide la escala, con qué población se normó y si valores altos son favorables o problemáticos. Utiliza los puntos de corte del manual, no una tabla genérica.',
  ],
  sections: [
    {
      heading: 'Por qué existe la escala T',
      paragraphs: [
        'La puntuación Z tiene media 0 y SD 1, por lo que la mitad de los valores suele ser negativa y aparecen decimales. La transformación T multiplica por 10 y suma 50. Mantiene orden y distancias relativas, pero ofrece números más cómodos. Z = −1 pasa a T = 40; z = 0 a 50; z = 1.5 a 65.',
        'La T clásica es lineal. No añade información ni mejora la calidad de las normas: solo cambia la unidad. Si la media o SD de referencia son inadecuadas, T reproduce ese problema con otra apariencia. Algunas pruebas denominan «T» a puntuaciones normalizadas o calibradas de otra forma; revisa el manual antes de aplicar la fórmula.',
      ],
      link: {
        prefix: 'Convierte un valor bruto o una Z con la ',
        label: 'calculadora de puntuación T',
        href: '/es/herramientas/calculadora-puntuacion-t/',
        suffix: ' y anota la referencia utilizada.',
      },
    },
    {
      heading: 'Cómo calcular T desde una puntuación bruta',
      paragraphs: [
        'Primero calcula z = (x−M)/SD usando la media y desviación de la norma adecuada. Después aplica T = 50 + 10z. Ejemplo: x = 82, M = 70, SD = 8. Z = 12/8 = 1.5 y T = 50 + 15 = 65. La persona se sitúa 1.5 SD por encima de la media normativa.',
        'Para x = 62 con la misma referencia, z = −1 y T = 40. No restes 50 a la puntuación bruta ni dividas la T por 10 sin centrarla. Para recuperar Z usa z = (T−50)/10. Si la prueba entrega T directamente, no la vuelvas a tipificar.',
      ],
    },
    {
      heading: 'Tabla mental: 30, 40, 50, 60 y 70',
      paragraphs: [
        'La equivalencia básica es T 30 = z −2; T 40 = z −1; T 50 = z 0; T 60 = z +1; T 70 = z +2. Bajo normalidad, T 60 está cerca del percentil 84 y T 70 del 97.7. Son aproximaciones modeladas, no porcentajes de respuestas correctas.',
        'Los intervalos 40–60 o 30–70 no deben rotularse automáticamente como «normal» y «anormal». Una norma describe frecuencia, mientras que un punto de corte clínico o educativo necesita evidencia de uso. Un resultado frecuente puede requerir atención y uno infrecuente puede ser deseable según la variable.',
      ],
    },
    {
      heading: 'Puntuación alta: mejor, peor o simplemente más',
      paragraphs: [
        'En rendimiento, una T alta suele indicar mayor puntuación. En escalas de ansiedad, dolor o síntomas puede indicar mayor gravedad. Algunas escalas invierten subdominios o usan normas donde una T alta significa más del rasgo, sin juzgarlo. Lee nombre, dirección y versión exactos.',
        'Evita expresiones como «T 65 es buena» fuera de contexto. Escribe: «T = 65, equivalente a 1.5 SD por encima de la media normativa en esta escala; valores altos representan mayor frecuencia de X». Si existe umbral validado, cita el manual y la población para la que fue creado.',
      ],
    },
    {
      heading: 'T no es percentil ni porcentaje',
      paragraphs: [
        'T 60 no equivale a 60%, ni al percentil 60. Si la distribución normativa es normal, T 60 —z 1— se aproxima al percentil 84. T 50 corresponde al percentil 50 solo bajo una norma simétrica apropiada. Las tablas del instrumento pueden usar una distribución empírica y ofrecer equivalencias diferentes.',
        'Los percentiles no tienen intervalos iguales: pasar del 50 al 60 no representa la misma cantidad del rasgo que pasar del 90 al 100. Las T lineales sí conservan distancias en unidades de SD, siempre que la escala subyacente permita esa interpretación. Para comunicar frecuencia a público general, presenta ambos solo si la conversión está respaldada.',
      ],
      link: {
        prefix: 'Revisa primero la posición estándar con la ',
        label: 'calculadora de puntuación Z',
        href: '/es/herramientas/calculadora-puntuacion-z/',
        suffix: '.',
      },
    },
    {
      heading: 'Normas por edad, curso, país y versión',
      paragraphs: [
        'Las puntuaciones T dependen del grupo normativo. Una T basada en adultos no debe aplicarse a adolescentes; una norma nacional puede no representar otra región; una versión revisada puede usar nuevos baremos. Utiliza edad, idioma, modo de administración y fecha que correspondan al manual.',
        'Comparar dos T calculadas con normas diferentes responde a posición respecto a cada grupo, no necesariamente a cambio absoluto. En seguimiento clínico o educativo, distingue mejora en la puntuación bruta de cambio normativo. Conserva el mismo instrumento y norma cuando el objetivo sea medir evolución.',
      ],
    },
    {
      heading: 'Error de medida e intervalos alrededor de T',
      paragraphs: [
        'Una T observada no es el rasgo exacto. Si el manual proporciona error estándar de medida, un intervalo ayuda a reflejar precisión. Con SEM = 3, una T 60 puede comunicarse aproximadamente como un rango alrededor del valor, usando el nivel de confianza y procedimiento que indique la prueba.',
        'Los cortes rígidos son especialmente frágiles cerca del umbral. T 64 y 65 no son categorías naturales separadas si el error es varios puntos. Integra entrevista, otras medidas y contexto. En decisiones de alto impacto, la puntuación nunca debe ser el único criterio.',
      ],
    },
    {
      heading: 'Puntuación T no es prueba t de Student',
      paragraphs: [
        'La mayúscula T suele nombrar la escala psicométrica 50/10. La t minúscula de Student es un estadístico de contraste con grados de libertad y una distribución t. Una persona puede tener T = 60 en un test; un estudio puede informar t(58) = 2.40. No son conversiones entre sí.',
        'Tampoco confundas T con puntuación típica de media 100 y SD 15, usada en otros instrumentos. Ambas son transformaciones de Z, pero sus unidades difieren. Lee siempre la métrica declarada en el informe.',
      ],
    },
    {
      heading: 'Ejemplo completo de reporte',
      paragraphs: [
        'Una escala normativa ofrece T = 68 para síntomas, donde valores altos indican mayor intensidad. Z equivalente = 1.8. Un reporte prudente diría: «La puntuación se situó 1.8 SD por encima de la media de la norma de adultos de la versión X (T = 68). Según el manual, este rango requiere interpretación clínica conjunta; no constituye por sí solo un diagnóstico».',
        'Para rendimiento, el mismo T = 68 tendría otra dirección sustantiva. Añade puntuación bruta, edición, fecha y norma. Si informas percentil, utiliza la tabla oficial. No derives una etiqueta solo de la regla 50/10 si el instrumento publica transformaciones no lineales.',
      ],
    },
    {
      heading: 'Errores frecuentes y cómo evitarlos',
      paragraphs: [
        'Los errores más habituales son leer T como porcentaje, asumir que alto siempre es bueno, usar la norma equivocada, recalcular una T ya transformada, confundirla con t de Student y aplicar cortes universales. Otro fallo es comparar cambios cuando cada medición usó una norma distinta.',
        'Antes de comunicar, confirma manual, versión, dominio, dirección y población. Comprueba la fórmula inversa: una T 65 debe corresponder a z 1.5. Si la cifra no encaja, puede existir otra escala o una transformación normativa especial.',
      ],
    },
    {
      heading: 'Lista de comprobación para una lectura responsable',
      paragraphs: [
        'Anota valor bruto, media y SD normativas o T publicada. Identifica si la transformación es lineal. Traduce cada diez puntos como una SD, no como diez percentiles. Comprueba si alto implica más rendimiento, más síntomas u otro rasgo. Añade error e intervalo si están disponibles.',
        'Usa cortes y percentiles del manual. Evita diagnóstico, selección o exclusión desde una cifra aislada. Para cambios temporales, conserva prueba y norma y revisa cambio fiable o error de medida. La puntuación T simplifica la unidad; no simplifica las decisiones que dependen de ella.',
      ],
    },
  ],
  faq: [
    { q: '¿Qué significa T = 50?', a: 'Es la media de la población normativa en la escala T clásica. No significa 50% de aciertos.' },
    { q: '¿Qué significa T = 60?', a: 'Está una desviación estándar por encima de la media: z = 1. Bajo normalidad se aproxima al percentil 84.' },
    { q: '¿T = 70 es siempre preocupante?', a: 'No. Depende de qué mide la escala, su dirección, norma y puntos de corte validados.' },
    { q: '¿Cómo convierto Z a T?', a: 'T = 50 + 10z. Por ejemplo, z = −0.8 produce T = 42.' },
    { q: '¿Cómo convierto T a Z?', a: 'z = (T−50)/10. T = 65 equivale a z = 1.5.' },
    { q: '¿Puntuación T y prueba t son iguales?', a: 'No. T es una escala tipificada; t de Student es un estadístico de contraste con grados de libertad.' },
    { q: '¿Puedo comparar T de dos pruebas?', a: 'Solo si constructos y normas permiten esa comparación. Compartir media 50 y SD 10 no vuelve equivalentes las pruebas.' },
    { q: '¿Necesito informar un intervalo?', a: 'Es recomendable cuando el manual ofrece error estándar de medida, sobre todo cerca de puntos de corte o en decisiones individuales.' },
  ],
  review: {
    heading: 'Control antes de comunicar una T',
    intro: 'La escala 50/10 es sencilla; la dirección, la norma y la precisión determinan su significado real.',
    checks: [
      { title: 'Métrica', text: 'La prueba usa una T clásica o se documenta su transformación específica.' },
      { title: 'Norma', text: 'Edad, población, idioma, versión y fecha corresponden a la persona evaluada.' },
      { title: 'Conclusión', text: 'La interpretación respeta dirección, error y límites; no convierte T en porcentaje o diagnóstico.' },
    ],
  },
  sources: [
    { label: 'NIH FITBIR: PROMIS T-score', href: 'https://fitbir.nih.gov/dictionary/publicData/dataElementAction%21view.action?dataElementName=PROMISTScore&publicArea=true&style.key=fitbir-style', note: 'Definición federal de T como puntuación con media 50 y SD 10.' },
    { label: 'NIH Toolbox: Scoring and Interpretation Manual', href: 'https://repository.niddk.nih.gov/media/studies/look-ahead/Forms/Look_AHEAD_Cognitive_Function/NIH%20Toolbox%20Scoring%20and%20Interpretation%20Manual%209-27-12.pdf', note: 'Manual sobre puntuaciones normativas, escalas 50/10 y 100/15.' },
    { label: 'NIST: Standardize', href: 'https://www.itl.nist.gov/div898/software/dataplot/refman2/auxillar/standard.htm', note: 'Base matemática de la transformación Z usada antes de T.' },
    { label: 'PMC: Z Scores, Standard Scores, and Composite Test Scores', href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8826187/', note: 'Artículo metodológico sobre Z, T, puntuaciones estándar y normas de referencia.' },
  ],
};
