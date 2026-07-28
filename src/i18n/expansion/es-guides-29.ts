import type { SpanishInfoPage } from './es-pages';

export const spanishLeveneGuide: SpanishInfoPage = {
  title: 'Prueba de Levene en SPSS: qué fila leer y qué significa',
  seoTitle: 'Levene en SPSS: interpretación y fila correcta',
  seoDescription: 'Aprende a interpretar Levene en SPSS, cuándo leer varianzas iguales o no asumidas, cómo conservar los gl de Welch y qué no demuestra la prueba.',
  keywords: [
    'prueba de Levene SPSS',
    'interpretar Levene SPSS',
    'varianzas iguales asumidas',
    'equal variances not assumed',
    'homogeneidad de varianzas SPSS',
    'qué fila leer t Student SPSS',
    'Levene significativo qué hacer',
    'Welch SPSS grados libertad',
  ],
  eyebrow: 'Guía de SPSS · Levene · t de muestras independientes',
  intro: 'Esta guía resuelve una duda muy concreta de la salida clásica de SPSS: para una prueba t de muestras independientes, ¿debo copiar la fila «Equal variances assumed» o «Equal variances not assumed»? La respuesta empieza en el p de Levene, pero no termina allí. También hay que comprobar el diseño, leer todos los estadísticos de la misma fila y separar igualdad de varianzas de igualdad de medias.',
  directAnswer: [
    'En la regla docente habitual, si el p de Levene es igual o mayor que el nivel alfa —normalmente .05— se lee la fila «Equal variances assumed». Si p es menor que .05, se lee «Equal variances not assumed», que aplica una corrección de Welch y puede mostrar grados de libertad decimales. Copia t, gl, p, diferencia e intervalo de una sola fila; nunca combines el t de la primera con el p de la segunda.',
    'Levene no contrasta si las medias son iguales, no prueba normalidad y no decide por sí solo qué modelo debías usar. Un resultado significativo solo indica que los datos son poco compatibles con igualdad de varianzas bajo las condiciones de la prueba. Tamaños de grupo, dispersión, valores atípicos, independencia y un plan analítico previo siguen siendo necesarios.',
  ],
  sections: [
    {
      heading: 'Dónde aparece Levene en la salida de SPSS',
      paragraphs: [
        'Al ejecutar una t de muestras independientes, SPSS suele presentar primero «Group Statistics» o «Estadísticas de grupo», con N, media, desviación estándar y error estándar. Después aparece «Independent Samples Test» o «Prueba de muestras independientes». En este segundo bloque están las columnas de Levene y, a continuación, dos filas paralelas para la prueba t. La proximidad visual hace fácil confundir las dos significaciones.',
        'La columna «Sig.» situada junto a F de Levene pertenece al contraste de varianzas. Más a la derecha, la significación de la prueba t puede aparecer como «Sig. (2-tailed)», «Two-Sided p» u otro rótulo según versión y opciones. La primera no responde si hay diferencia de medias. Úsala para reconocer la fila de la tabla clásica; interpreta la diferencia con el p, el intervalo y los descriptivos de la fila seleccionada.',
      ],
      items: [
        'Localiza primero el nombre exacto de la variable dependiente.',
        'Comprueba que los códigos de grupo coinciden con las etiquetas esperadas.',
        'Distingue la Sig. de Levene de la significación bilateral de t.',
        'Conserva el orden de los grupos para interpretar el signo de la diferencia.',
      ],
    },
    {
      heading: 'La regla de decisión p ≥ .05 y p < .05, con sus límites',
      paragraphs: [
        'Si el análisis fijó alfa = .05 y Levene ofrece p = .270, el resultado no cruza ese umbral. La lectura convencional continúa en «Equal variances assumed». Esto no significa que las varianzas hayan quedado demostradas como idénticas: significa que Levene no aportó evidencia suficiente contra la igualdad al nivel definido. Evita escribir «se acepta que son iguales» como una certeza.',
        'Si Levene ofrece p = .018, el resultado cruza .05 y la tabla clásica conduce a «Equal variances not assumed». Esa fila ajusta el error estándar y los grados de libertad mediante un procedimiento tipo Welch–Satterthwaite. Un gl como 25.63 es normal y debe conservarse con una precisión razonable. No lo redondees a 26 para que parezca la fila superior.',
      ],
      link: {
        prefix: 'Introduce ambos p y la misma fila de estadísticos en el ',
        label: 'interpretador de resultados SPSS',
        href: '/es/herramientas/interpretar-resultados-spss/',
        suffix: ' para verificar la selección antes de redactar.',
      },
    },
    {
      heading: 'Qué contrasta realmente la prueba de Levene',
      paragraphs: [
        'La hipótesis nula de Levene plantea igualdad de varianzas entre grupos. La idea general consiste en transformar cada observación en una distancia respecto al centro de su grupo y comparar esas distancias. Existen variantes basadas en la media, la mediana o medias recortadas. La variante centrada en mediana suele ser más resistente a falta de normalidad, pero no todas las tablas ni procedimientos usan la misma.',
        'Una p pequeña indica que las diferencias observadas de dispersión serían difíciles de reconciliar con varianzas iguales dentro del modelo de la prueba. No cuantifica cuán grave es la heterogeneidad ni señala cuál caso la provoca. Examina desviaciones estándar, gráficos, cocientes de varianza y tamaños de muestra. Una diferencia detectada con miles de casos puede ser pequeña; una diferencia importante con grupos diminutos puede pasar inadvertida.',
      ],
    },
    {
      heading: 'Por qué Welch suele ser preferible a decidir después de mirar Levene',
      paragraphs: [
        'La secuencia «primero Levene, después Student o Welch» se enseña porque coincide con las dos filas de SPSS, pero convierte una decisión analítica en una prueba previa. Welch controla bien el error tipo I cuando las varianzas o los tamaños son distintos y suele perder poco cuando las varianzas son semejantes. Por eso muchas estrategias modernas especifican Welch desde el principio para dos medias independientes.',
        'Si tu protocolo, curso o revista exige la lectura clásica, sigue esa regla y declárala. Si puedes planificar el análisis, considera usar Welch de forma general y no como castigo por un Levene significativo. No elijas la versión que entregue la p más conveniente. La justificación debe depender del diseño, la robustez y la pregunta, no del resultado que favorece la hipótesis.',
      ],
      link: {
        prefix: 'Para calcular directamente la comparación robusta, abre la ',
        label: 'calculadora t de Welch con intervalo y g de Hedges',
        href: '/es/herramientas/calculadora-t-muestras-independientes/',
        suffix: '.',
      },
    },
    {
      heading: 'Ejemplo completo: de p de Levene a la frase de resultados',
      paragraphs: [
        'Supón dos grupos independientes. SPSS muestra Levene F = 5.12, p = .028. Como .028 < .05, se selecciona «Equal variances not assumed». En esa misma fila aparecen t = 2.37, gl = 24.81 y p bilateral = .026. La conclusión estadística procede de .026, no de .028. Un borrador mínimo sería: «La diferencia entre grupos fue estadísticamente significativa, t(24.81) = 2.37, p = .026».',
        'El borrador todavía está incompleto. Añade qué variable se comparó, medias y desviaciones de cada grupo, diferencia estimada, intervalo y efecto. Si la primera media fue 78.4 y la segunda 73.1, la dirección debe coincidir con el signo usado por SPSS. Si el intervalo de la diferencia está totalmente por encima de cero, debe ser coherente con una t positiva y una p bilateral menor que .05.',
      ],
    },
    {
      heading: 'Casos límite: p = .050, muestras pequeñas y valores atípicos',
      paragraphs: [
        'Una p mostrada como .050 está redondeada; el valor interno puede estar ligeramente por encima o por debajo. Define antes si el criterio es p < .05 y, si la decisión depende del último decimal, consulta más precisión o informa la incertidumbre. No cambies a p ≤ .05 después de ver la salida. La misma disciplina aplica al alfa: .01 o un ajuste por multiplicidad cambian el umbral.',
        'Con muestras pequeñas, Levene puede tener poca potencia y la inspección gráfica se vuelve especialmente importante. Un único valor extremo puede inflar una desviación y alterar el contraste. No borres el caso automáticamente: verifica si es error, documenta el criterio y muestra sensibilidad. Con grupos muy desiguales, la combinación más problemática es mayor varianza en el grupo pequeño; Welch y un análisis de robustez son más informativos que una etiqueta binaria.',
      ],
    },
    {
      heading: 'Levene en ANOVA: el mismo supuesto, otra decisión posterior',
      paragraphs: [
        'En un ANOVA de un factor, la prueba de homogeneidad también evalúa si las varianzas pueden tratarse como iguales. Una p pequeña no convierte automáticamente el análisis en inválido, pero obliga a revisar tamaños, distribución, atípicos y alternativas. IBM ofrece estadísticos robustos como Welch y Brown–Forsythe en las opciones de ANOVA de un factor.',
        'La prueba global robusta tampoco localiza qué grupos difieren. Si el resultado ómnibus es significativo y las varianzas son heterogéneas, comparaciones como Games–Howell suelen ser más apropiadas que Tukey bajo igualdad de varianzas. La elección depende del diseño y las opciones disponibles. Informa qué prueba global y qué seguimiento utilizaste; no escribas solo «Levene fue significativo, por tanto hay diferencias».',
      ],
      link: {
        prefix: 'Consulta también la ',
        label: 'guía de ANOVA en formato APA 7',
        href: '/es/guias/anova-formato-apa-7/',
        suffix: ' para enlazar supuestos, F, efecto y comparaciones.',
      },
    },
    {
      heading: 'Lo que Levene no comprueba',
      paragraphs: [
        'Levene no comprueba independencia: si hay medidas repetidas, parejas, estudiantes dentro de aulas o varias filas por persona, una t independiente puede ser incorrecta aunque las varianzas parezcan semejantes. Tampoco demuestra normalidad. Para grupos independientes, la forma de la distribución y el impacto de atípicos deben evaluarse con datos y gráficos, no con un único semáforo.',
        'Tampoco valida la selección de participantes, la aleatorización, la ausencia de sesgo, el mecanismo de faltantes ni una interpretación causal. Un contraste bien calculado sobre un diseño sesgado sigue siendo una respuesta sesgada. Antes de informar, conecta la tabla con la pregunta, el protocolo, la unidad de análisis y las decisiones de limpieza.',
      ],
    },
    {
      heading: 'Errores de lectura que cambian el resultado',
      paragraphs: [
        'El error más frecuente es copiar t de «varianzas iguales asumidas» y gl o p de «no asumidas». Otro consiste en confundir p de Levene con p de la comparación. También se pierde información cuando los gl decimales se convierten en enteros, se escribe p = .000 o se informa una sola media sin indicar el orden de la resta.',
        'Comprueba filtros, casos perdidos, ponderación y «Split File». Si N en descriptivos no encaja con los gl, puede existir una exclusión o configuración activa. Guarda sintaxis y salida, no solo una captura recortada. Una frase auditable permite señalar cada número en la tabla original y reconstruir qué datos produjeron esa tabla.',
      ],
      items: [
        'Usar automáticamente la primera fila.',
        'Interpretar Levene como diferencia de medias.',
        'Redondear los gl de Welch a un entero.',
        'Cambiar de prueba después de comparar cuál p es menor.',
        'Omitir descriptivos, intervalo y efecto.',
      ],
    },
    {
      heading: 'Lista final para un informe defendible',
      paragraphs: [
        'Antes de entregar, confirma que los grupos son independientes, el orden está documentado y el análisis coincide con el plan. Registra F y p de Levene solo cuando son relevantes para explicar la decisión. Copia t, gl, p, diferencia e intervalo de la fila elegida. Añade medias, desviaciones y un efecto adecuado. Mantén separados resultado, importancia práctica y limitaciones.',
        'Si tu objetivo es afirmar equivalencia o ausencia de una diferencia material, una p grande no basta. Necesitas un margen de equivalencia, intervalos y un diseño con precisión suficiente. La transparencia sobre varianzas es una pieza del informe, no una licencia para convertir «no significativo» en «igual».',
      ],
      link: {
        prefix: 'Sigue la tarea completa con el ',
        label: 'flujo de informe estadístico de investigación',
        href: '/es/flujos/informe-estadistico-investigacion/',
        suffix: '.',
      },
    },
  ],
  faq: [
    { q: 'Si Levene no es significativo, ¿las varianzas son iguales?', a: 'No queda demostrada una igualdad exacta. Solo no se rechazó la hipótesis de igualdad al nivel elegido. Revisa dispersión, tamaños, gráficos y precisión.' },
    { q: 'Si Levene es significativo, ¿debo leer siempre la segunda fila?', a: 'En la tabla clásica y con la regla docente habitual, sí: «Equal variances not assumed». Un plan moderno también puede especificar Welch desde el principio.' },
    { q: '¿Por qué los grados de libertad tienen decimales?', a: 'La corrección de Welch–Satterthwaite ajusta los gl según varianzas y tamaños de grupo. Los decimales son esperables y deben conservarse.' },
    { q: '¿Levene significativo quiere decir que las medias difieren?', a: 'No. Levene contrasta varianzas. La diferencia de medias se evalúa con la prueba t de la fila seleccionada.' },
    { q: '¿Una prueba t pareada usa Levene?', a: 'No como la t de grupos independientes. En datos pareados se analiza la distribución de las diferencias y la dependencia forma parte del diseño.' },
    { q: '¿Qué hago si SPSS muestra Sig. = .000?', a: 'No escribas p = .000. Informa p < .001, salvo que dispongas de un valor más preciso calculado de forma válida.' },
    { q: '¿Levene sirve para más de dos grupos?', a: 'Sí, aparece en procedimientos como ANOVA para evaluar homogeneidad entre varios grupos, pero el seguimiento robusto requiere decisiones adicionales.' },
    { q: '¿Puedo decidir entre Student y Welch según cuál sea significativo?', a: 'No. Elegir por el resultado favorece sesgo. Define una regla previa o utiliza una estrategia robusta justificada.' },
  ],
  review: {
    heading: 'Control de lectura de una tabla con Levene',
    intro: 'La revisión separa el supuesto de varianzas, la comparación de medias y la trazabilidad de cada cifra.',
    checks: [
      { title: 'Diseño', text: 'Los grupos son realmente independientes y la unidad de análisis está identificada.' },
      { title: 'Fila', text: 'Levene orienta la selección y t, gl, p e intervalo proceden de una misma fila.' },
      { title: 'Informe', text: 'Descriptivos, efecto, incertidumbre y límites acompañan a la etiqueta de significación.' },
    ],
  },
  sources: [
    { label: 'IBM SPSS: Prueba T para muestras independientes', href: 'https://www.ibm.com/docs/es/spss-statistics/30.0.0?topic=tests-independent-samples-t-test', note: 'Documentación oficial sobre descriptivos, Levene, pruebas de varianzas combinadas y separadas e intervalos.' },
    { label: 'IBM SPSS: Subcomando HOMOGENEITY de T-TEST', href: 'https://www.ibm.com/docs/es/spss-statistics/31.0.0?topic=test-homogeneity-subcommand-t-command', note: 'Referencia oficial del contraste de homogeneidad en el procedimiento T-TEST.' },
    { label: 'IBM SPSS: Opciones de ANOVA de un factor', href: 'https://www.ibm.com/docs/es/spss-statistics/32.0.0?topic=anova-one-way-options', note: 'Incluye homogeneidad, Welch, Brown–Forsythe, descriptivos y tratamiento de faltantes.' },
    { label: 'NIST: Levene Test for Equality of Variances', href: 'https://www.itl.nist.gov/div898/handbook/eda/section3/eda35a.htm', note: 'Referencia independiente sobre hipótesis, variantes y uso de la prueba de Levene.' },
  ],
};

export const spanishTTestApaGuide: SpanishInfoPage = {
  title: 'Cómo informar una prueba t en APA 7',
  seoTitle: 'Prueba t en APA 7: formato, ejemplos, p y efecto',
  seoDescription: 'Guía para escribir t de Student, Welch, pareada y de una muestra en APA 7 con medias, SD, t, gl, p, intervalo y d o g sin copiar p = .000.',
  keywords: [
    'prueba t APA 7',
    't Student formato APA',
    'cómo reportar t test',
    't de Welch APA 7',
    't muestras independientes APA',
    't muestras relacionadas APA',
    'Cohen d APA',
    'p valor APA 7 ejemplo',
  ],
  eyebrow: 'Guía de redacción · prueba t · APA 7',
  intro: 'Una frase APA no es una plantilla para esconder decisiones. Debe permitir reconocer el diseño, la dirección de la diferencia, la magnitud, la incertidumbre y el contraste. Esta guía separa los cuatro casos más comunes —una muestra, grupos independientes, Welch y datos pareados— y muestra cómo pasar de la tabla a un resultado que otra persona pueda verificar.',
  directAnswer: [
    'Una redacción completa suele incluir el tipo de prueba, las medias y desviaciones relevantes, el estadístico t con sus grados de libertad entre paréntesis, el p exacto —o p < .001—, un intervalo de confianza y un tamaño de efecto. Ejemplo abreviado: «El grupo A obtuvo una media mayor que el grupo B, t(57.42) = 2.45, p = .017, g = 0.61». Añade M, SD, diferencia e IC 95% antes de considerar la frase terminada.',
    'No escribas p = .000 porque un programa muestre .000; ese valor está redondeado y debe expresarse como p < .001. Conserva gl decimales en Welch. No uses la plantilla independiente para medidas repetidas. Y no conviertas significación en importancia: el efecto y el intervalo son necesarios para juzgar cuánto y con qué precisión.',
  ],
  sections: [
    {
      heading: 'Los elementos mínimos de una prueba t bien informada',
      paragraphs: [
        'Nombra el diseño: t de una muestra, de muestras independientes, de Welch o de muestras relacionadas. Identifica la variable y el sentido de la comparación. Proporciona descriptivos compatibles con el diseño: media y SD por grupo para independientes; media y SD por momento, junto con la diferencia, para pareadas; media observada y valor de referencia para una muestra.',
        'El núcleo estadístico se escribe como t(gl) = valor, p = valor. Añade diferencia estimada, IC 95% y efecto con su definición. Especifica si la prueba fue bilateral o unilateral cuando no sea obvio y justifica cualquier hipótesis unilateral antes de mirar los datos. Si hubo ajustes, ponderaciones, filtros o exclusiones, deben quedar en método o en una nota.',
      ],
      items: [
        'Tipo de prueba y diseño.',
        'N, medias y desviaciones estándar.',
        'Diferencia y dirección.',
        't, gl y p de la misma ejecución.',
        'IC 95% y tamaño de efecto.',
        'Contexto, unidades y limitaciones.',
      ],
    },
    {
      heading: 'Formato de símbolos, decimales y valor p',
      paragraphs: [
        'APA utiliza símbolos estadísticos como t, p, M y SD en cursiva en el manuscrito. Los grados de libertad aparecen dentro de paréntesis: t(28) = 2.45. Deja espacios alrededor de = y <. En valores que no pueden superar 1, como p y muchas correlaciones, suele omitirse el cero inicial: p = .021. En valores que pueden superar 1, como t, M, SD o d, conserva el cero cuando corresponda.',
        'Usa una precisión suficiente y coherente. Los p se suelen informar con dos o tres decimales, salvo valores menores que .001. No redondees .0496 a .05 y después la llames no significativa si la regla usa el valor completo. Evita más dígitos de los que justifican los datos. Los gl enteros de Student pueden presentarse sin decimal; los gl aproximados de Welch deben conservar decimales razonables.',
      ],
      link: {
        prefix: 'Genera un borrador consistente con el ',
        label: 'generador de informes APA 7',
        href: '/es/herramientas/generador-informe-apa-7/',
        suffix: ' y coteja cada valor con la salida original.',
      },
    },
    {
      heading: 'Muestras independientes: informa grupos y orden',
      paragraphs: [
        'Una t de muestras independientes compara dos grupos formados por unidades distintas. Antes de redactar, confirma qué grupo se restó de cuál. Una diferencia positiva solo significa que la primera media es mayor bajo ese orden. Sin etiquetas, «diferencia = 5.30» es ambiguo. Presenta M y SD de ambos grupos, N cuando ayude y las unidades del resultado.',
        'Ejemplo: «El grupo con tutoría obtuvo puntuaciones más altas (M = 78.40, SD = 8.10) que el grupo de comparación (M = 73.10, SD = 8.95), diferencia media = 5.30, IC 95% [0.96, 9.64], t(57.42) = 2.45, p = .017, g = 0.61». Los números deben proceder del mismo modelo; el ejemplo ilustra estructura, no una conclusión reutilizable.',
      ],
    },
    {
      heading: 'Welch: conserva la corrección y los grados de libertad',
      paragraphs: [
        'La t de Welch no asume igualdad de varianzas y ajusta error estándar y gl. En una salida SPSS clásica suele corresponder a «Equal variances not assumed». En otros programas aparece explícitamente como Welch. La forma de la frase es similar a la t independiente, pero los gl pueden ser 25.63 o 57.42. No los sustituyas por N1 + N2 − 2.',
        'Indica Welch cuando esa elección ayuda a entender el análisis, especialmente si el plan lo adoptó por robustez. No necesitas escribir una defensa extensa dentro de la frase, pero sí documentar en método la estrategia de varianzas. El intervalo y g de Hedges son compañeros útiles cuando los tamaños son pequeños o desiguales.',
      ],
      link: {
        prefix: 'Si partes de SPSS, revisa antes la ',
        label: 'guía de Levene y selección de fila',
        href: '/es/guias/prueba-levene-spss/',
        suffix: '.',
      },
    },
    {
      heading: 'Muestras relacionadas: la unidad es la diferencia',
      paragraphs: [
        'Una t pareada compara dos medidas ligadas: antes y después en las mismas personas o pares emparejados. El análisis opera sobre una puntuación de diferencia por par. Por eso no debe describirse como si fueran dos grupos independientes. Informa medias de cada momento, diferencia media, dispersión o intervalo de la diferencia y número de pares completos.',
        'Ejemplo: «Las puntuaciones aumentaron del pretest (M = 62.30, SD = 9.40) al postest (M = 67.10, SD = 8.70), diferencia media = 4.80, IC 95% [1.65, 7.95], t(23) = 3.15, p = .004, dz = 0.64». La notación del efecto debe indicar qué denominador se usó. Un d para diferencias, un d basado en SD agrupada y un d corregido no son intercambiables.',
      ],
    },
    {
      heading: 'Una muestra: declara el valor de referencia',
      paragraphs: [
        'La t de una muestra contrasta una media con un valor fijado. Nombra ese valor y explica por qué es relevante; no basta con decir «la media fue significativa». Ejemplo: «La puntuación media (M = 74.20, SD = 10.10) fue mayor que el valor de referencia de 70, diferencia = 4.20, IC 95% [0.45, 7.95], t(29) = 2.29, p = .029».',
        'El valor de referencia debe existir antes del análisis y tener interpretación real: un punto normativo, meta, valor teórico o umbral aprobado. Elegirlo después de observar la media invalida la historia confirmatoria. Una diferencia significativa respecto de cero puede ser trivial si cero no es un punto plausible o si la unidad hace inevitable esa diferencia.',
      ],
    },
    {
      heading: 'Efecto: d de Cohen, g de Hedges y su definición',
      paragraphs: [
        'Un efecto estandarizado divide una diferencia por una medida de variabilidad. La etiqueta «d de Cohen» abarca variantes con denominadores distintos según diseño. Para grupos independientes suele usarse una desviación agrupada; g de Hedges aplica una corrección de sesgo útil en muestras pequeñas. En datos pareados pueden emplearse dz, dav u otras definiciones. Escribe cuál utilizaste.',
        'No conviertas 0.2, 0.5 y 0.8 en categorías universales sin contexto. La relevancia depende de la medida, la población, costos y decisiones. Cuando la unidad original es interpretable, la diferencia e intervalo en esa unidad pueden ser más útiles que un efecto estandarizado. Informa ambos cuando sea posible.',
      ],
    },
    {
      heading: 'Intervalo de confianza y precisión',
      paragraphs: [
        'El IC de la diferencia muestra un conjunto de magnitudes compatibles con datos y modelo. Si un IC bilateral del 95% excluye cero, suele ser coherente con p < .05 para el mismo contraste bilateral. Si p y el intervalo contradicen esa relación, revisa si mezclaste filas, niveles de confianza, colas o análisis.',
        'No describas el IC como una probabilidad del 95% de contener el parámetro bajo la interpretación frecuentista estándar. Puedes decir que cuantifica precisión y que, en repeticiones del procedimiento, el método cubre el parámetro en la proporción nominal. Para lectores aplicados, traduce los extremos a consecuencias: desde una diferencia casi nula hasta una mejora material.',
      ],
    },
    {
      heading: 'Significativo no significa importante, y no significativo no significa igual',
      paragraphs: [
        'Una p pequeña evalúa incompatibilidad con una hipótesis nula dentro del modelo. No expresa la probabilidad de que la hipótesis sea falsa ni el tamaño del efecto. Con muestras grandes, diferencias pequeñas pueden producir p pequeñas. Con muestras pequeñas, una diferencia relevante puede quedar rodeada por un intervalo ancho y no alcanzar el umbral.',
        'Si la pregunta es si dos condiciones son suficientemente parecidas, diseña una prueba de equivalencia con márgenes definidos. Una t convencional no significativa solo indica que la evidencia no superó el umbral contra diferencia cero. Evita «no hubo efecto» cuando el intervalo todavía incluye efectos importantes en ambas direcciones.',
      ],
    },
    {
      heading: 'Errores frecuentes al pasar de SPSS a APA',
      paragraphs: [
        'No copies «Sig. = .000». No uses p de Levene como p de t. No mezcles gl de la fila de varianzas asumidas con el p de la fila de Welch. No omitas cuál grupo o momento obtuvo la media mayor. No presentes un efecto sin explicar su variante. Y no añadas causalidad cuando los grupos no fueron asignados de forma que la sostenga.',
        'Revisa que el signo de t, la diferencia y las medias sea coherente. Comprueba N y gl frente a faltantes. Guarda la salida y la sintaxis. Al copiar una frase automática, modifica nombres de variables, dirección y contexto, pero no alteres cifras para que la lectura resulte más favorable.',
      ],
      link: {
        prefix: 'Integra descriptivos, supuestos y redacción con el ',
        label: 'flujo de informe estadístico',
        href: '/es/flujos/informe-estadistico-investigacion/',
        suffix: '.',
      },
    },
    {
      heading: 'Plantilla de revisión, no texto para pegar a ciegas',
      paragraphs: [
        'Usa esta secuencia: «[Variable] fue [mayor/menor] en [grupo o momento A] (M = ..., SD = ...) que en [B] (M = ..., SD = ...), diferencia = ..., IC 95% [..., ...], t(gl) = ..., p = ..., [efecto] = ...». Para una muestra, sustituye el segundo grupo por el valor de referencia. Para pares, deja claro que las observaciones están relacionadas.',
        'Después pregunta: ¿cada cifra viene de la misma ejecución?, ¿la dirección coincide?, ¿el efecto está definido?, ¿el intervalo tiene unidades?, ¿la frase responde la pregunta sin exceder el diseño? Una plantilla reduce omisiones, pero la calidad proviene de la trazabilidad y del juicio.',
      ],
    },
  ],
  faq: [
    { q: '¿Debo escribir t de Student o solo prueba t?', a: 'Nombra la variante cuando sea informativa. Si utilizaste Welch, indícalo. La descripción del diseño —independiente, pareado o una muestra— es esencial.' },
    { q: '¿Se escribe p = .000 en APA 7?', a: 'No. Una pantalla con .000 refleja redondeo. Escribe p < .001, salvo que tengas un valor más preciso válido.' },
    { q: '¿Puedo redondear los gl de Welch?', a: 'Puedes limitar decimales de forma razonable, pero no convertirlos en el gl entero de Student. Mantén consistencia con el estadístico y p.' },
    { q: '¿Siempre debo informar d de Cohen?', a: 'Informa un efecto apropiado cuando la disciplina o pregunta lo requiera, y define su variante. La diferencia e intervalo en unidades originales también son importantes.' },
    { q: '¿Dónde pongo las medias y SD?', a: 'Pueden ir en la misma frase o inmediatamente antes. El lector debe reconocer dirección, dispersión y grupos sin buscar otra tabla.' },
    { q: '¿Una p mayor que .05 demuestra que no hay diferencia?', a: 'No. Revisa intervalo y precisión. Para afirmar equivalencia necesitas márgenes y un análisis diseñado para ello.' },
    { q: '¿Una prueba unilateral usa el mismo formato?', a: 'La estructura es parecida, pero debes declarar y justificar la dirección definida antes del análisis. No cambies de bilateral a unilateral después de ver el signo.' },
    { q: '¿El generador APA valida mi elección de prueba?', a: 'No. Formatea cifras introducidas. El diseño, los supuestos, los datos y la inferencia siguen bajo responsabilidad del análisis.' },
  ],
  review: {
    heading: 'Control de una frase t antes de entregarla',
    intro: 'Una frase es válida solo cuando diseño, descriptivos, inferencia y efecto cuentan la misma historia numérica.',
    checks: [
      { title: 'Diseño', text: 'Independiente, Welch, pareada o una muestra está identificado y corresponde a las observaciones.' },
      { title: 'Cifras', text: 'M, SD, diferencia, IC, t, gl y p proceden de la misma ejecución y mantienen dirección.' },
      { title: 'Alcance', text: 'El efecto está definido y la conclusión no confunde significación, importancia, equivalencia o causalidad.' },
    ],
  },
  sources: [
    { label: 'APA Style: Numbers and Statistics Guide', href: 'https://apastyle.apa.org/instructional-aids/numbers-statistics-guide.pdf', note: 'Guía oficial sobre símbolos, decimales, p, intervalos y presentación de resultados.' },
    { label: 'APA Style: Journal Article Reporting Standards', href: 'https://apastyle.apa.org/jars', note: 'Marco oficial para informar métodos y resultados con transparencia.' },
    { label: 'APA: Quantitative Research Reporting Standards', href: 'https://apastyle.apa.org/jars/quant-table-1.pdf', note: 'Lista oficial de elementos para diseño, análisis, estimación e interpretación cuantitativa.' },
    { label: 'NIST: Two-Sample t-Test for Equal Means', href: 'https://www.itl.nist.gov/div898/handbook/eda/section3/eda353.htm', note: 'Referencia independiente sobre hipótesis, estadístico y supuestos de una comparación de dos medias.' },
  ],
};

export const spanishAnovaApaGuide: SpanishInfoPage = {
  title: 'Cómo informar un ANOVA en APA 7',
  seoTitle: 'ANOVA en APA 7: F, gl, p, eta y post hoc',
  seoDescription: 'Aprende a reportar ANOVA de un factor y factorial en APA 7 con F(gl1, gl2), p, η² o ηp², descriptivos, intervalos y comparaciones post hoc.',
  keywords: [
    'ANOVA APA 7',
    'cómo reportar ANOVA',
    'F grados libertad APA',
    'eta cuadrado APA',
    'eta parcial cuadrado',
    'ANOVA un factor ejemplo APA',
    'ANOVA dos factores interacción',
    'post hoc APA 7',
  ],
  eyebrow: 'Guía de redacción · ANOVA · APA 7',
  intro: 'Un ANOVA no se resume con «p < .05». El informe debe nombrar el efecto probado, presentar F con dos grados de libertad, mostrar descriptivos y efecto, y explicar el seguimiento que localiza las diferencias. En diseños factoriales, la interacción puede cambiar por completo la lectura de los efectos principales. Esta guía organiza la redacción sin convertir una tabla automática en interpretación automática.',
  directAnswer: [
    'El núcleo de un resultado se escribe como F(gl del efecto, gl del error) = valor, p = valor, seguido de un tamaño de efecto definido. Ejemplo global: «Se observó un efecto del método de enseñanza, F(2, 57) = 4.62, p = .014, η² = .14». Esa frase indica que el resultado ómnibus es incompatible con igualdad de todas las medias, pero no dice qué grupos difieren; añade descriptivos y comparaciones planificadas o post hoc.',
    'En un ANOVA factorial informa por separado la interacción y cada efecto principal, usando los gl y efectos de sus filas. Si la interacción es significativa, estudia efectos simples antes de generalizar los efectos principales. Distingue η² de ηp² y no cambies el símbolo. Si se violan supuestos, documenta la alternativa robusta, corrección o modelo utilizado.',
  ],
  sections: [
    {
      heading: 'Qué debe aparecer en un informe ANOVA',
      paragraphs: [
        'Identifica variable dependiente, factores y niveles, diseño entre sujetos, intra-sujetos o mixto, y unidad de análisis. Presenta N, media y SD por grupo o celda. Para cada efecto relevante informa F, gl del efecto, gl del error, p, efecto e intervalo cuando esté disponible. En un factor con tres o más niveles, añade el seguimiento que explica dónde están las diferencias.',
        'El método debe incluir criterios de exclusión, faltantes, alfa, contraste, opciones de sumas de cuadrados, correcciones y programa. El resultado debe distinguir análisis planificados de exploratorios. Si una tabla contiene muchas filas, no copies todas sin propósito: vincula cada efecto con una pregunta y evita seleccionar solo los favorables.',
      ],
      items: [
        'Diseño, factores, niveles y variable dependiente.',
        'N, M y SD por grupo o celda.',
        'F(gl1, gl2), p y efecto de la misma fila.',
        'Intervalos o estimaciones cuando estén disponibles.',
        'Contrastes o post hoc con ajuste.',
        'Supuestos, correcciones y límites.',
      ],
    },
    {
      heading: 'Cómo leer F y los dos grados de libertad',
      paragraphs: [
        'F es una razón de variación explicada a variación residual según el modelo. En F(2, 57) = 4.62, el primer gl corresponde al efecto o numerador y el segundo al error o denominador. Ambos deben proceder de la misma fila y del mismo modelo. F no puede ser negativo; un valor negativo indica error de transcripción.',
        'No escribas F(59) ni intercambies los gl. En un ANOVA de un factor con tres grupos, gl del efecto suele ser 2, pero faltantes y diseño determinan el gl del error. En modelos con correcciones, pruebas robustas o medidas repetidas, los gl pueden cambiar o ser decimales. Conserva la salida que documenta la corrección.',
      ],
      link: {
        prefix: 'Coteja F, gl y p con el ',
        label: 'interpretador de resultados SPSS',
        href: '/es/herramientas/interpretar-resultados-spss/',
        suffix: ' antes de construir el párrafo.',
      },
    },
    {
      heading: 'Ejemplo de ANOVA de un factor',
      paragraphs: [
        'Supón tres métodos de enseñanza con un resultado continuo. La tabla ofrece F(2, 57) = 4.62, p = .014 y η² = .14. Un párrafo inicial podría decir: «Las puntuaciones variaron entre métodos, F(2, 57) = 4.62, p = .014, η² = .14». A continuación presenta M y SD de los tres grupos y los resultados de comparaciones que respondan qué pares difieren.',
        'No escribas «los tres grupos fueron diferentes» a partir del ómnibus. Un F significativo indica que no todas las medias son compatibles con igualdad, pero puede existir una sola diferencia. Si el post hoc de Games–Howell muestra diferencia entre A y C, no inventes una entre A y B. Informa diferencia, intervalo, p ajustado y efecto del contraste cuando corresponda.',
      ],
    },
    {
      heading: 'Post hoc y contrastes: localiza sin inflar falsos positivos',
      paragraphs: [
        'Las comparaciones múltiples aumentan la probabilidad de encontrar una diferencia por azar. Tukey, Holm, Bonferroni, Games–Howell y otros procedimientos controlan errores de formas distintas y descansan en supuestos diferentes. La elección debe corresponder a homogeneidad, tamaños, tipo de comparación y plan, no al método que entregue más asteriscos.',
        'Los contrastes planificados responden hipótesis definidas antes y pueden ser más eficientes que comparar todos los pares. Declara la familia de comparaciones y el ajuste. Informa p ajustados, intervalos y dirección. Si el ómnibus no es significativo, la interpretación de comparaciones aisladas exige una justificación preespecificada; no las uses para rescatar una narrativa.',
      ],
    },
    {
      heading: 'Homogeneidad: Levene, Welch y Brown–Forsythe',
      paragraphs: [
        'La igualdad de varianzas es un supuesto habitual del ANOVA clásico entre grupos. Revisa Levene junto con desviaciones, tamaños y gráficos. Una p pequeña no significa que las medias difieran; señala heterogeneidad. Con varianzas o tamaños desiguales, Welch o Brown–Forsythe pueden ofrecer una prueba global más robusta, y Games–Howell puede ser un seguimiento apropiado.',
        'Informa qué procedimiento utilizaste. No presentes los gl de Welch como si fueran el ANOVA clásico. Tampoco transformes o elimines casos solo para que Levene supere .05. Si una decisión razonable cambia la conclusión, muestra el análisis de sensibilidad y explica cuál se definió como principal.',
      ],
      link: {
        prefix: 'Para entender el supuesto y evitar confundir sus p, lee la ',
        label: 'guía de la prueba de Levene en SPSS',
        href: '/es/guias/prueba-levene-spss/',
        suffix: '.',
      },
    },
    {
      heading: 'η², ηp² y omega cuadrado no son la misma cifra',
      paragraphs: [
        'Eta cuadrado, η², expresa una proporción de variación asociada con un efecto según una definición concreta. Eta parcial cuadrado, ηp², divide por la suma del efecto y su error, excluyendo otras fuentes del denominador. En diseños simples pueden parecer cercanas; en factoriales o repetidos pueden diferir mucho. Copia el símbolo que corresponde a la columna.',
        'Omega cuadrado, ω², intenta corregir sesgo de η² en la muestra. Ninguna etiqueta de «pequeño», «mediano» o «grande» es universal. Interpreta en relación con el resultado, la disciplina, medición y consecuencias. Cuando sea posible, añade intervalos del efecto y diferencias en unidades originales; una proporción aislada no dice qué grupos ni qué dirección producen el patrón.',
      ],
    },
    {
      heading: 'ANOVA de dos factores: interacción primero',
      paragraphs: [
        'Un diseño A × B produce al menos efecto principal de A, efecto principal de B e interacción A × B. Informa cada uno como una prueba distinta. Ejemplo: «La interacción entre método y nivel educativo fue significativa, F(1, 56) = 5.12, p = .027, ηp² = .08». Después describe cómo cambia el efecto de método entre niveles, usando medias de celda, intervalos y efectos simples.',
        'Cuando la interacción es relevante, una frase como «el método A fue mejor» puede ser falsa si solo mejora en un nivel y empeora en otro. Los efectos principales promedian sobre el otro factor y pueden ocultar ese patrón. Si la interacción no es significativa, no concluyas que las líneas son idénticas; considera precisión y potencia antes de simplificar.',
      ],
    },
    {
      heading: 'Efectos simples y comparaciones dentro de niveles',
      paragraphs: [
        'Los efectos simples evalúan un factor en un nivel concreto del otro. Tras una interacción, decide qué comparaciones responden la pregunta: comparar métodos dentro de cada curso, o cursos dentro de cada método. Ajusta la multiplicidad de la familia definida y evita explorar todas las combinaciones sin declararlo.',
        'Presenta las medias de las celdas que sostienen la interpretación. Un gráfico de interacción con puntos e intervalos ayuda, pero no reemplaza las cifras. Describe patrón, diferencia, intervalo, estadístico o contraste y p ajustado. Separa una comparación prevista de una explicación post hoc sugerida por la forma de los datos.',
      ],
    },
    {
      heading: 'Medidas repetidas y diseños mixtos necesitan más información',
      paragraphs: [
        'En medidas repetidas, la misma persona contribuye varios resultados. La esfericidad, las correcciones de Greenhouse–Geisser o Huynh–Feldt y la estructura de dependencia importan. Si se aplica una corrección, informa los gl corregidos y, cuando corresponde, epsilon. No reutilices una plantilla de ANOVA entre sujetos sin mencionar la dependencia.',
        'Los diseños mixtos combinan factores entre e intra-sujetos y pueden incluir interacciones de tiempo por grupo. Faltantes, número de momentos y estructura de covarianza complican la interpretación. En estudios longitudinales, un modelo mixto puede responder mejor que un ANOVA completo-casos. La herramienta breve de FunnyTools no valida estos diseños; utiliza la salida y guía específica del modelo.',
      ],
    },
    {
      heading: 'Formato de p, decimales y ejemplos APA',
      paragraphs: [
        'Escribe F(2, 57) = 4.62, p = .014, η² = .14 con espacios alrededor de signos. En un manuscrito, F y p suelen ir en cursiva; los gl no. No escribas p = .000: usa p < .001. Mantén una precisión coherente entre efectos y evita mostrar seis decimales cuando las mediciones no los justifican.',
        'El generador de FunnyTools produce borradores para ANOVA de un factor y factorial desde cifras introducidas. Revisa que los nombres de factores sean sustantivos, que cada p pertenezca al efecto correcto y que η² no se rotule como ηp². Añade descriptivos y seguimiento: la frase automática no conoce la tabla completa.',
      ],
      link: {
        prefix: 'Prepara la estructura con el ',
        label: 'generador de informes APA 7 en español',
        href: '/es/herramientas/generador-informe-apa-7/',
        suffix: ' y completa el contexto manualmente.',
      },
    },
    {
      heading: 'Errores frecuentes que una frase bonita no corrige',
      paragraphs: [
        'No informes solo la fila «Between Groups» sin descriptivos. No confundas p de Levene con p de F. No asumas que todas las medias difieren. No omitas la interacción para destacar un efecto principal conveniente. No elijas post hoc después de comparar cuál produce más resultados. No cambies η² por ηp² porque el segundo número parezca mayor.',
        'Comprueba filtros, ponderación, tipo de sumas de cuadrados, casos faltantes y codificación. Si el N de las tablas cambia, explica por qué. La misma frase puede parecer correcta y corresponder a otra variable o modelo. Guarda sintaxis, salida y versión. La trazabilidad debe permitir seguir cualquier F desde el texto hasta su fila y conjunto analítico.',
      ],
      items: [
        'Interpretar el ómnibus como diferencia entre todos los pares.',
        'Omitir p ajustado y método post hoc.',
        'Ignorar una interacción significativa.',
        'Mezclar η² y ηp².',
        'Usar el ANOVA clásico pese a heterogeneidad grave sin sensibilidad.',
        'Convertir asociación en causalidad.',
      ],
    },
    {
      heading: 'Lista final antes de entregar el ANOVA',
      paragraphs: [
        'Revisa pregunta, diseño y unidad de análisis. Comprueba N, medias, SD y celdas. Para cada efecto, verifica F, gl1, gl2, p y efecto. Añade intervalos y comparaciones con ajuste. Documenta homogeneidad, robustez y correcciones. Prioriza interacción cuando corresponda. Distingue análisis planificado de exploratorio.',
        'Finalmente, limita la conclusión al diseño. Un experimento aleatorizado puede sostener afirmaciones distintas de un estudio observacional. Una p pequeña no corrige confusión ni selección. Una p grande no prueba equivalencia. El párrafo más útil conecta patrón, magnitud, incertidumbre y decisión sin ocultar las alternativas compatibles con los datos.',
      ],
      link: {
        prefix: 'Usa el ',
        label: 'flujo completo de informe estadístico',
        href: '/es/flujos/informe-estadistico-investigacion/',
        suffix: ' para comprobar la trazabilidad desde datos hasta texto.',
      },
    },
  ],
  faq: [
    { q: '¿Qué significa F(2, 57)?', a: '2 es el gl del efecto o numerador y 57 el gl del error o denominador. Ambos deben proceder de la misma fila y modelo.' },
    { q: '¿Un ANOVA significativo indica que todos los grupos difieren?', a: 'No. Solo indica que no todas las medias son compatibles con igualdad. Necesitas contrastes o post hoc para localizar diferencias.' },
    { q: '¿Debo informar η² o ηp²?', a: 'Usa el efecto que corresponda al diseño y a la salida, y escribe el símbolo exacto. No son intercambiables.' },
    { q: '¿Qué post hoc uso si Levene es significativo?', a: 'Games–Howell es una opción frecuente con varianzas o tamaños desiguales, pero la elección depende del diseño, la familia de comparaciones y el plan.' },
    { q: '¿Puedo escribir p = .000 desde SPSS?', a: 'No. Informa p < .001. La pantalla está mostrando un valor redondeado, no una probabilidad exactamente cero.' },
    { q: '¿Qué interpreto primero en un ANOVA factorial?', a: 'La interacción. Si es significativa, analiza efectos simples antes de generalizar los efectos principales.' },
    { q: '¿Una interacción no significativa prueba que los factores actúan igual?', a: 'No. Revisa intervalo, potencia y patrón. Falta de significación no demuestra igualdad exacta.' },
    { q: '¿El mismo formato sirve para medidas repetidas?', a: 'Necesita información adicional sobre dependencia, esfericidad y correcciones. No pegues una plantilla entre sujetos sin adaptar el modelo.' },
  ],
  review: {
    heading: 'Control de un párrafo ANOVA',
    intro: 'La revisión sigue cada efecto desde la pregunta hasta descriptivos, fila de F, efecto y comparación posterior.',
    checks: [
      { title: 'Modelo', text: 'Diseño, factores, dependencia, supuestos y correcciones corresponden a los datos.' },
      { title: 'Efectos', text: 'F, gl, p y η² o ηp² proceden de la misma fila; interacción y principales no se mezclan.' },
      { title: 'Seguimiento', text: 'Descriptivos, intervalos y comparaciones ajustadas localizan el patrón sin exagerar causalidad.' },
    ],
  },
  sources: [
    { label: 'APA Style: Numbers and Statistics Guide', href: 'https://apastyle.apa.org/instructional-aids/numbers-statistics-guide.pdf', note: 'Guía oficial sobre símbolos, decimales, p, intervalos y presentación estadística.' },
    { label: 'APA Style: Journal Article Reporting Standards', href: 'https://apastyle.apa.org/jars', note: 'Estándares oficiales para describir diseño, análisis, resultados y transparencia.' },
    { label: 'APA: Quantitative Research Reporting Standards', href: 'https://apastyle.apa.org/jars/quant-table-1.pdf', note: 'Lista oficial de elementos para investigación cuantitativa, efectos, precisión y sensibilidad.' },
    { label: 'IBM SPSS: Análisis de un factor de la varianza', href: 'https://www.ibm.com/docs/es/spss-statistics/32.0.0?topic=edition-one-way-analysis-variance', note: 'Documentación oficial de ANOVA global, descriptivos, contrastes y comparaciones.' },
    { label: 'IBM SPSS: Opciones de ANOVA de un factor', href: 'https://www.ibm.com/docs/es/spss-statistics/32.0.0?topic=anova-one-way-options', note: 'Incluye homogeneidad, Welch, Brown–Forsythe, faltantes y opciones descriptivas.' },
  ],
};
