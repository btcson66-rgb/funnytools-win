import type { SpanishInfoPage } from './es-pages';

export const spanishPercentileRankGuide: SpanishInfoPage = {
  title: 'Rango percentil: qué significa y cómo interpretarlo',
  seoTitle: 'Rango percentil: significado, fórmula y ejemplos',
  seoDescription: 'Aprende qué significa un rango percentil, cómo tratar empates, por qué no es una nota porcentual y cuándo no conviene convertirlo desde una puntuación Z.',
  keywords: [
    'rango percentil qué significa',
    'percentil 75 interpretación',
    'fórmula rango percentil',
    'percentil y porcentaje diferencia',
    'calcular percentil con empates',
    'puntuación z a percentil',
  ],
  eyebrow: 'Guía de evaluación · posición relativa · percentiles',
  intro: 'El rango percentil sitúa una puntuación dentro de un grupo de referencia. Es útil para interpretar pruebas, notas y distribuciones, pero se presta a una confusión recurrente: percentil 80 no significa 80 puntos ni un 80 % de aciertos. Esta guía separa posición, puntuación y probabilidad, explica los empates y muestra qué información debe acompañar al resultado.',
  directAnswer: [
    'Un rango percentil de 80 indica que la puntuación ocupa una posición igual o superior a la de aproximadamente el 80 % del grupo de referencia, según la fórmula y la regla de empates utilizadas. No informa de cuántas preguntas se acertaron ni de la distancia respecto a otras puntuaciones.',
    'Para datos observados puede utilizarse PR = 100 × (B + 0,5E) / N, donde B es el número de valores inferiores, E el número de valores iguales y N el total. Es una convención de rango medio, no la única definición posible. Por eso un informe serio identifica población, fecha, tamaño y método.',
  ],
  sections: [
    {
      heading: 'Percentil, rango percentil y nota porcentual no son lo mismo',
      paragraphs: [
        'Un percentil es un punto de corte de una distribución: el percentil 75 es un valor que deja alrededor del 75 % de las observaciones por debajo. El rango percentil hace la pregunta inversa: dada una puntuación concreta, ¿qué porcentaje del grupo queda por debajo o en una posición equivalente? En conversación se usa «percentil» para ambas ideas, pero al calcular conviene distinguirlas.',
        'Una nota porcentual describe desempeño respecto al máximo posible. Acertar 36 de 40 preguntas equivale al 90 % de aciertos, aunque podría corresponder a un rango percentil 60 si la prueba resultó fácil. También podría corresponder a PR 95 en un examen muy difícil. El porcentaje depende del instrumento; el rango percentil depende además del grupo de comparación.',
      ],
    },
    {
      heading: 'Cómo leer PR 25, PR 50, PR 75 y PR 90',
      paragraphs: [
        'PR 50 representa una posición central, cercana a la mediana del grupo. PR 75 coloca el resultado por encima de aproximadamente tres cuartas partes del grupo; PR 25, por encima de aproximadamente una cuarta parte. PR 90 suele describirse como una posición dentro del 10 % superior, pero esa equivalencia puede no ser exacta cuando existen muchos empates o categorías amplias.',
        'El número no es una distancia. Pasar de PR 40 a PR 50 no implica el mismo cambio en la puntuación original que pasar de PR 80 a PR 90. Los rangos ordenan, pero sus intervalos no son necesariamente iguales. Evita promediar rangos percentiles como si fueran centímetros o puntos de una escala lineal.',
      ],
      link: {
        prefix: 'Comprueba una posición observada con la ',
        label: 'calculadora de rango percentil',
        href: '/es/herramientas/calculadora-rango-percentil/',
        suffix: ' y conserva la regla empleada.',
      },
    },
    {
      heading: 'Fórmula con empates: qué cuentan B, E y N',
      paragraphs: [
        'La regla de rango medio PR = 100 × (B + 0,5E) / N asigna a todas las personas empatadas el punto medio del bloque que ocupan. Si hay 72 valores inferiores, 4 iguales y 100 observaciones, PR = 100 × (72 + 2) / 100 = 74. El resultado representa una posición estimada dentro de esa muestra, no una nota de 74.',
        'Contar todos los empates como inferiores elevaría el resultado a 76; no contar ninguno lo reduciría a 72. La mitad del empate evita colocar arbitrariamente a una persona al principio o al final del bloque. Otros programas aplican fórmulas como (rango − 0,5) / N o métodos de interpolación distintos, de modo que dos resultados cercanos pueden ser correctos bajo convenciones diferentes.',
      ],
      items: [
        'B: número de observaciones estrictamente menores que el valor consultado.',
        'E: número de observaciones exactamente iguales, incluida la observación consultada.',
        'N: total de observaciones válidas del grupo de referencia.',
        'La igualdad debe definirse con la precisión real, no después de redondear de forma arbitraria.',
      ],
    },
    {
      heading: 'Ejemplo completo con una lista pequeña',
      paragraphs: [
        'Considera las puntuaciones 42, 51, 51, 58, 63, 67, 67, 67, 74 y 81. Para el valor 67 hay cinco puntuaciones inferiores y tres iguales, con N = 10. La regla de rango medio produce PR = 100 × (5 + 1,5) / 10 = 65. Las tres personas con 67 reciben la misma posición; no se inventa un orden entre ellas.',
        'Para 42, B = 0 y E = 1, por lo que PR = 5. Para 81, B = 9 y E = 1, así que PR = 95. Que los extremos no sean 0 y 100 es una consecuencia deliberada de esta convención. Si necesitas un corte percentil o una función de distribución empírica, usa el método definido por el análisis, no cambies la fórmula para obtener extremos más intuitivos.',
      ],
    },
    {
      heading: 'El grupo de referencia cambia por completo la interpretación',
      paragraphs: [
        'Una estudiante puede ocupar PR 85 en su aula, PR 68 en su centro y PR 54 en una muestra nacional. Las tres cifras pueden ser verdaderas porque responden a comparaciones distintas. Un resultado sin el nombre del grupo de referencia es incompleto. También importan curso, edad, convocatoria, versión del instrumento y fecha de recogida.',
        'Una norma antigua puede dejar de representar a la población actual. Una muestra de conveniencia tampoco equivale automáticamente a una norma. Antes de comparar dos rangos, confirma que proceden de la misma población, edición, ventana temporal y método de cálculo. Si no coinciden, describe cada uno dentro de su contexto en lugar de ordenar personas entre grupos no comparables.',
      ],
    },
    {
      heading: 'Rango percentil a partir de Z: cuándo es solo una estimación',
      paragraphs: [
        'Si se supone una distribución normal, una puntuación z puede convertirse en la probabilidad acumulada de la normal estándar. Por ejemplo, z = 0 corresponde aproximadamente al percentil 50 y z = 1 a cerca del 84. Esa relación pertenece al modelo normal, no a cualquier conjunto de datos.',
        'Con distribuciones sesgadas, valores discretos, techos, suelos o varias subpoblaciones, el percentil empírico puede alejarse del normal. La mejor opción, si tienes todos los datos, es calcular la posición observada y mostrar la distribución. Usa la conversión normal cuando el instrumento o el manual la justifique y etiqueta el resultado como estimado.',
      ],
      link: {
        prefix: 'Si tu informe parte de media y desviación estándar, revisa primero la ',
        label: 'guía de puntuación Z',
        href: '/es/guias/puntuacion-z-interpretacion/',
        suffix: '.',
      },
    },
    {
      heading: 'PR, puntuación Z y puntuación T responden preguntas distintas',
      paragraphs: [
        'Z y T conservan una noción de distancia relativa bajo una transformación lineal: z indica desviaciones estándar respecto a la media y T suele expresar la misma posición en una escala con media 50 y desviación 10. El rango percentil expresa orden acumulado. Por eso una diferencia de 10 puntos T mantiene el mismo significado de escala, mientras que diez puntos percentiles cambian de significado según la zona.',
        'Presentar juntos puntuación original, Z o T y rango percentil suele ser más informativo que elegir uno. La puntuación original conserva el desempeño, Z/T contextualizan distancia y PR facilita comunicar posición. Ninguno sustituye la calidad del instrumento, la incertidumbre de medida o una decisión profesional.',
      ],
      link: {
        prefix: 'Para comunicar ambas escalas, consulta también la ',
        label: 'guía de puntuación T',
        href: '/es/guias/puntuacion-t-interpretacion/',
        suffix: '.',
      },
    },
    {
      heading: 'Muestras pequeñas, categorías y muchos empates',
      paragraphs: [
        'Con N = 10, una sola observación mueve alrededor de diez puntos percentiles. Mostrar PR 73,4 daría una precisión aparente que los datos no sostienen. En grupos pequeños conviene informar también el rango, N y, si es relevante, la puntuación original. La incertidumbre aumenta aún más cuando faltan observaciones o el grupo fue seleccionado de forma sesgada.',
        'Las escalas con pocas categorías producen grandes bloques de empates. Un cuestionario de cinco niveles no puede generar cien posiciones distintas. El rango medio resume el bloque, pero no distingue a sus integrantes. En estos casos una tabla de frecuencias o la proporción por categoría puede comunicar mejor que un PR aislado.',
      ],
    },
    {
      heading: 'Cómo describir un resultado a familias, alumnado o lectores',
      paragraphs: [
        'Una frase clara sería: «La puntuación 67 ocupa aproximadamente el rango percentil 65 dentro de las diez puntuaciones válidas de este grupo, usando rango medio para los empates». La frase identifica valor, resultado, grupo, N y convención. Si se utiliza una norma externa, sustituye la descripción del grupo por el nombre y edición de la norma.',
        'Evita «obtuvo un 65 %», «superó el 65 % del contenido» o «rindió un 15 % mejor que la media». Ninguna de esas afirmaciones se deduce de PR 65. Para decisiones sensibles, acompaña el rango de intervalo de confianza o error de medida cuando el manual lo proporcione y no conviertas un corte en una etiqueta sobre la capacidad de la persona.',
      ],
    },
    {
      heading: 'Errores frecuentes que cambian el resultado',
      paragraphs: [
        'Los errores más comunes son ordenar al revés, mezclar valores faltantes con ceros, contar empates de forma inconsistente, redondear antes de comparar y dividir entre un N que incluye casos inválidos. También se confunde el percentil de una puntuación con la puntuación situada en un percentil.',
        'Otro fallo es elegir después del cálculo la fórmula que produce el número preferido. Define el método antes, usa el mismo para toda la serie y documenta software y versión. Si comparas con un informe oficial, reproduce su fórmula exacta; una diferencia de uno o dos puntos puede proceder solo de la convención.',
      ],
    },
    {
      heading: 'Lista de comprobación antes de publicar un percentil',
      paragraphs: [
        'Anota la pregunta: posición de una puntuación, corte de un percentil o conversión desde una norma. Identifica grupo, fecha, N, faltantes y empates. Ordena con la dirección correcta, conserva precisión y aplica una fórmula declarada. Verifica a mano un caso central y un extremo.',
        'En el informe incluye puntuación original, PR, método y población de referencia. Separa el cálculo empírico de cualquier estimación normal. Explica que el resultado es relativo y evita umbrales no autorizados. Si el valor influye en admisión, diagnóstico o apoyo educativo, sigue el manual oficial y solicita revisión cualificada.',
      ],
    },
  ],
  faq: [
    { q: '¿Percentil 80 significa estar entre el 20 % superior?', a: 'De forma aproximada, sí, pero los empates y la fórmula pueden impedir una equivalencia exacta. Indica el grupo y el método.' },
    { q: '¿PR 80 es una nota de 80 sobre 100?', a: 'No. La nota porcentual describe aciertos o puntos; PR 80 describe una posición relativa dentro de un grupo.' },
    { q: '¿Cuál es la fórmula del rango percentil?', a: 'Una regla habitual con empates es 100 × (B + 0,5E) / N. Existen otras convenciones; usa la definida por el informe o programa.' },
    { q: '¿Qué hago si varias personas tienen la misma nota?', a: 'Puedes asignar el rango medio del bloque de empates y documentarlo. No inventes un orden sin un criterio oficial.' },
    { q: '¿Puedo calcular un percentil con diez personas?', a: 'Sí, pero la resolución es muy gruesa. Informa N y rango, y evita presentar decimales que sugieran una precisión inexistente.' },
    { q: '¿Se puede convertir Z a percentil?', a: 'Sí bajo una distribución de referencia, normalmente la normal estándar. Si los datos no son normales, el percentil empírico puede ser distinto.' },
    { q: '¿Se pueden promediar rangos percentiles?', a: 'No suele ser apropiado porque son posiciones ordinales y sus intervalos no son iguales. Trabaja con la escala original o un modelo adecuado.' },
    { q: '¿Dos percentiles de años distintos son comparables?', a: 'Solo si comparten población normativa, instrumento, versión y método. De lo contrario, cada resultado debe interpretarse en su propio contexto.' },
  ],
  review: {
    heading: 'Control de calidad de un rango percentil',
    intro: 'La cifra solo es útil cuando puede rastrearse hasta datos, población y regla de clasificación.',
    checks: [
      { title: 'Referencia', text: 'Grupo, fecha, tamaño, instrumento y casos válidos están identificados.' },
      { title: 'Cálculo', text: 'Orden, empates, faltantes, fórmula y redondeo se aplican de forma coherente.' },
      { title: 'Comunicación', text: 'El texto distingue posición, nota porcentual, Z/T e incertidumbre.' },
    ],
  },
  sources: [
    { label: 'NIST/SEMATECH: Percentiles', href: 'https://itl.nist.gov/div898/handbook/prc/section2/prc262.htm', note: 'Definición mediante estadísticos de orden, interpolación y coexistencia de varios métodos.' },
    { label: 'NIST Dataplot: Percentage Rank', href: 'https://www.itl.nist.gov/div898/software/dataplot/refman2/auxillar/percrank.htm', note: 'Fórmula de rango porcentual y tratamiento por rango medio de los empates.' },
    { label: 'NIST: Quantile-Quantile Plot', href: 'https://www.itl.nist.gov/div898/handbook/eda/section3/eda33o.htm', note: 'Relación entre cuantiles, distribución acumulada y comparación de distribuciones.' },
    { label: 'INEE México: Cuadernillo técnico de evaluación educativa', href: 'https://www.inee.edu.mx/wp-content/uploads/2019/08/P2A358.pdf', note: 'Material técnico en español con interpretación contextual de percentiles en evaluación.' },
  ],
};

export const spanishTeacherOppositionScoreGuide: SpanishInfoPage = {
  title: 'Cómo calcular la nota de una oposición docente sin confundir fases',
  seoTitle: 'Calcular nota de oposición docente y baremo',
  seoDescription: 'Aprende a calcular pruebas, fase de oposición, baremo y nota global de una oposición docente, con ejemplos y controles para seguir tu convocatoria.',
  keywords: [
    'calcular nota oposición docente',
    'nota oposición maestros',
    'baremo oposiciones docentes',
    'fase oposición y concurso fórmula',
    'méritos oposición docente',
    'ponderación concurso oposición',
  ],
  eyebrow: 'Guía práctica · oposiciones docentes · baremación',
  intro: 'La nota de una oposición docente no suele salir de una sola media. Puede haber pruebas eliminatorias, partes con pesos propios, una fase de oposición, un baremo de méritos y una ponderación global. Además, el régimen aplicable y la convocatoria autonómica determinan la fórmula real. Esta guía enseña a convertir el documento oficial en una hoja de cálculo verificable sin presentar una simulación como resultado administrativo.',
  directAnswer: [
    'Primero calcula cada prueba exactamente como indica la convocatoria y comprueba todos los mínimos. Solo después obtén la nota de la fase de oposición. Si la has superado, incorpora la fase de concurso o baremo y aplica la ponderación global prevista. Una fórmula típica es nota global = oposición × peso de oposición + concurso × peso de concurso, pero los pesos y las escalas deben copiarse de la convocatoria vigente.',
    'No existe una única fórmula válida para todas las oposiciones docentes de España. El Real Decreto 276/2007 contiene reglas generales y regímenes distintos; las administraciones educativas concretan pruebas, pesos, méritos, desempates y redondeo. La convocatoria oficial de tu cuerpo, especialidad, comunidad y año manda sobre cualquier calculadora.',
  ],
  sections: [
    {
      heading: 'Las cuatro capas que debes separar',
      paragraphs: [
        'La primera capa son las partes de una prueba: por ejemplo, tema escrito, supuesto práctico, programación o unidad didáctica. La segunda es la nota completa de la fase de oposición, que puede exigir superar cada prueba. La tercera es la fase de concurso, donde se valoran méritos con topes por apartado. La cuarta es la puntuación global que combina las fases para ordenar aspirantes.',
        'Mezclar capas causa la mayoría de errores. Un 7 en una parte no siempre aporta siete puntos a la fase; diez puntos de baremo no siempre se suman directamente a la nota de oposición; y superar el mínimo no garantiza plaza. Dibuja el proceso como un árbol de decisiones antes de introducir números.',
      ],
      items: [
        'Prueba o ejercicio: nota, partes, pesos y mínimo propio.',
        'Fase de oposición: combinación de pruebas que han sido superadas.',
        'Fase de concurso: méritos admitidos después de revisión administrativa.',
        'Puntuación global: ponderación final y ordenación dentro del turno y especialidad.',
      ],
    },
    {
      heading: 'Empieza por la convocatoria, no por una fórmula de Internet',
      paragraphs: [
        'Descarga la convocatoria completa y sus anexos desde el boletín o portal oficial. Busca «sistema de selección», «calificación», «fase de oposición», «baremo», «puntuación global», «desempate» y «reclamaciones». Anota artículo, página y versión. Las correcciones de errores y modificaciones posteriores también forman parte de la norma aplicable.',
        'Confirma cuerpo, especialidad, turno, acceso y comunidad autónoma. Una convocatoria de estabilización puede seguir un régimen diferente de una de reposición; el acceso a otro cuerpo puede diferir del ingreso libre. Una academia o una hoja compartida sirve para practicar, pero no reemplaza el texto administrativo.',
      ],
    },
    {
      heading: 'Cómo convertir cada prueba en una fórmula',
      paragraphs: [
        'Si una prueba tiene dos partes A y B con pesos 40 % y 60 %, la expresión es prueba = A × 0,40 + B × 0,60. Antes de calcular, verifica si cada parte requiere una nota mínima y si la convocatoria impone un peso mínimo. Una media de aprobado no rescata una parte eliminatoria suspendida.',
        'Ejemplo hipotético: A = 7,20 y B = 8,10. La prueba sería 7,20 × 0,40 + 8,10 × 0,60 = 7,74. Si B exigiera al menos 5 y la persona tuviera 4,90, el proceso podría quedar eliminado aunque la media ponderada fuese superior a 5. La condición se comprueba antes de seguir.',
      ],
    },
    {
      heading: 'Fase de oposición: media solo de pruebas válidas',
      paragraphs: [
        'Cuando hay varias pruebas eliminatorias, calcula cada una y marca «superada/no superada». La nota de oposición suele derivarse de las pruebas superadas según la fórmula oficial; no introduzcas un cero por una prueba a la que no se llega y después hagas una media inventada. La consecuencia administrativa es exclusión, no una media más baja.',
        'Conserva todas las cifras sin redondear y muestra por separado el valor visible. Una diferencia mínima puede importar en listas ajustadas. Si el tribunal publica notas con cuatro decimales pero la norma redondea a tres en una fase posterior, replica exactamente ese orden.',
      ],
    },
    {
      heading: 'Baremo de méritos: sumar no basta',
      paragraphs: [
        'El baremo suele dividir experiencia docente, formación académica y otros méritos, cada apartado con requisitos y topes. Calcula primero cada subapartado, aplica su límite y luego el límite del bloque. Un mérito puede no ser compatible con otro, contar solo una vez o requerir documentación y fecha de perfeccionamiento.',
        'La cifra útil para simular es la puntuación que razonablemente será admitida, no todos los certificados que posees. Mantén tres columnas: solicitada, justificada y reconocida. Cuando se publique el baremo provisional, sustituye la estimación por la cifra oficial y revisa el plazo de alegaciones.',
      ],
      link: {
        prefix: 'Organiza pruebas, pesos y baremo con la ',
        label: 'calculadora de nota de oposición docente',
        href: '/es/herramientas/calculadora-nota-oposicion-docente/',
        suffix: ' sin perder el detalle de cada componente.',
      },
    },
    {
      heading: 'Ponderación global: usa escalas compatibles',
      paragraphs: [
        'La forma general es G = O × wO + C × wC, donde O y C están expresadas en la escala que exige la convocatoria y wO + wC = 1. Si ambas fases están entre 0 y 10, la operación es directa. Si el baremo tiene otro máximo, primero aplica la normalización que disponga la norma; no la inventes.',
        'Ejemplo meramente didáctico con 60 % oposición y 40 % concurso: O = 7,80 y C = 6,50 producen G = 7,80 × 0,60 + 6,50 × 0,40 = 7,28. Este ejemplo no afirma que 60/40 sea la regla de tu proceso. En otros procedimientos puede aparecer otra ponderación, incluida la relación de dos tercios y un tercio prevista en determinadas reglas generales.',
      ],
      link: {
        prefix: 'Para una segunda comprobación aritmética, usa la ',
        label: 'calculadora de media ponderada',
        href: '/es/herramientas/calculadora-media-ponderada/',
        suffix: ' con los mismos pesos.',
      },
    },
    {
      heading: 'Por qué 60/40 y dos tercios/un tercio pueden aparecer a la vez',
      paragraphs: [
        'El Reglamento de ingreso docente contiene capítulos y disposiciones transitorias con ponderaciones diferentes. Una búsqueda aislada puede mostrar un 60/40 perteneciente a un régimen concreto, mientras otra página cita dos tercios para oposición y un tercio para concurso. No elijas la cifra por actualidad aparente ni por conveniencia.',
        'Determina qué disposición invoca tu convocatoria y lee su apartado de calificación. Una convocatoria de 2026 puede remitir al Real Decreto 276/2007, pero lo decisivo es la vía y el régimen que aplica. Registra la cita exacta junto a tu hoja; así podrás corregir la fórmula si se publica una modificación.',
      ],
    },
    {
      heading: 'Ejemplo completo de una simulación trazable',
      paragraphs: [
        'Supón, solo para practicar, una convocatoria con prueba 1 formada por tema 50 % y práctico 50 %, prueba 2 formada por programación 40 % y unidad 60 %, oposición como media de ambas pruebas y global 60/40. Con tema 7,40 y práctico 6,80, P1 = 7,10. Con programación 8,20 y unidad 7,50, P2 = 7,78. O = (7,10 + 7,78) / 2 = 7,44.',
        'Si el baremo reconocido C es 6,30, G = 7,44 × 0,60 + 6,30 × 0,40 = 6,984. La hoja debe mostrar también mínimos, topes, precisión y fuente de cada peso. Si la convocatoria exige otra media, si una parte no supera el mínimo o si el baremo está en otra escala, este ejemplo deja de ser aplicable.',
      ],
    },
    {
      heading: 'Cortes, eliminatorias y acceso a la fase de concurso',
      paragraphs: [
        'No todas las reglas son operaciones. «Al menos cinco», «no inferior al 25 % de la puntuación máxima» o «solo se valorará el concurso a quienes superen la oposición» son condiciones lógicas. Implementa una celda de validación para cada una y detén el cálculo cuando no se cumple.',
        'Distingue nota mínima reglada de nota de corte competitiva. La primera permite continuar; la segunda puede surgir de plazas y resultados del resto de aspirantes. Una calculadora puede estimar tu nota, pero no puede predecir el último puesto sin datos oficiales completos ni anticipar reclamaciones.',
      ],
    },
    {
      heading: 'Desempates, listas y plazas',
      paragraphs: [
        'La puntuación global suele ordenar aspirantes, pero la convocatoria también define criterios de desempate: mayor nota de oposición, pruebas en un orden concreto, apartados del baremo u otro criterio. Dos hojas con la misma nota final pueden producir posiciones distintas si omiten esa secuencia.',
        'Comprueba turno y especialidad: las plazas se distribuyen y las listas se forman dentro de categorías definidas. No compares directamente tu puntuación con la de otro cuerpo o turno. La publicación provisional puede cambiar tras alegaciones, por lo que guarda fecha y estado de cada lista.',
      ],
    },
    {
      heading: 'Redondeo, decimales y errores de hoja de cálculo',
      paragraphs: [
        'No redondees cada producto antes de sumarlo salvo que la norma lo ordene. Conserva precisión interna y aplica el redondeo en el punto indicado. En configuración española, 7,25 usa coma decimal; al importar CSV o copiar desde una web, una hoja puede tratarlo como texto o interpretar mal el separador.',
        'Verifica que 40 % se almacene como 0,40 y no como 40. Comprueba que la suma de pesos sea 100 %, que no haya celdas vacías convertidas en cero y que los topes se apliquen con MIN en el nivel correcto. Recalcula un ejemplo sencillo a mano y bloquea las celdas de fórmula antes de reutilizar la plantilla.',
      ],
    },
    {
      heading: 'Qué guardar para una reclamación o revisión',
      paragraphs: [
        'Conserva convocatoria, anexos, correcciones, justificantes, resguardo de presentación y capturas o PDF de notas y baremos provisionales. En tu hoja, añade una columna con artículo y página para cada dato. Una cifra sin fuente es difícil de defender cuando hay que localizar un error.',
        'Si detectas una discrepancia, separa error aritmético, mérito no reconocido y desacuerdo de valoración. Revisa canal y plazo oficial antes de enviar. FunnyTools ayuda a comprobar cuentas, pero no presenta alegaciones ni sustituye asesoramiento jurídico, sindicato o administración competente.',
      ],
    },
    {
      heading: 'Lista de comprobación antes de confiar en la nota',
      paragraphs: [
        'Confirma proceso, cuerpo, especialidad, turno, régimen y versión de la convocatoria. Copia pruebas, partes, pesos, mínimos, escala y orden de redondeo. Calcula solo si cada condición se supera. Aplica topes del baremo y usa la puntuación reconocida cuando exista.',
        'Después verifica ponderación global, desempates y número de plazas. Haz una segunda cuenta independiente y conserva la trazabilidad. Etiqueta el resultado como «simulación» hasta que lo publique el órgano oficial. Si la hoja y la administración difieren, prevalece el acto oficial y corresponde revisar o reclamar por la vía prevista.',
      ],
    },
  ],
  faq: [
    { q: '¿Cómo se calcula la nota global de una oposición docente?', a: 'Combina la nota válida de oposición y el baremo reconocido con los pesos de la convocatoria. Antes deben cumplirse todos los mínimos y escalas.' },
    { q: '¿La oposición y el concurso pesan siempre 60 % y 40 %?', a: 'No. Existen regímenes distintos. Consulta la disposición y el apartado de calificación que tu convocatoria declara aplicables.' },
    { q: '¿Puedo sumar directamente la nota de oposición y los méritos?', a: 'Normalmente no. Debes aplicar la ponderación y la escala oficiales; sumar sin pesos puede duplicar o distorsionar el baremo.' },
    { q: '¿Un promedio superior a cinco compensa una parte suspendida?', a: 'Solo si la convocatoria lo permite. Cuando una parte tiene mínimo eliminatorio, no se compensa con otra nota alta.' },
    { q: '¿Debo usar el baremo que solicito o el reconocido?', a: 'Para la nota oficial usa el reconocido. Antes de publicarse, separa estimación, documentación aportada y puntos razonablemente admisibles.' },
    { q: '¿Cuándo se redondea la nota?', a: 'En el punto y número de decimales que diga la convocatoria. Como regla de cálculo, conserva precisión hasta ese momento.' },
    { q: '¿La calculadora predice si obtendré plaza?', a: 'No. La plaza depende de posiciones, turnos, especialidades, desempates, reclamaciones y número de plazas, además de tu puntuación.' },
    { q: '¿Qué documento tiene prioridad si dos webs dan fórmulas distintas?', a: 'La convocatoria oficial vigente, sus anexos y correcciones. Las calculadoras y academias son apoyos, no fuentes normativas.' },
  ],
  review: {
    heading: 'Control de calidad de una simulación de oposición',
    intro: 'Una nota defendible debe reproducir el proceso administrativo, no solo una suma final.',
    checks: [
      { title: 'Norma', text: 'Convocatoria, régimen, cuerpo, especialidad, turno y versión están identificados.' },
      { title: 'Lógica', text: 'Partes, mínimos, escalas, pesos, topes, redondeo y desempates aparecen por separado.' },
      { title: 'Trazabilidad', text: 'Cada cifra tiene fuente y el resultado se etiqueta como simulación hasta su publicación oficial.' },
    ],
  },
  sources: [
    { label: 'BOE: Real Decreto 276/2007 consolidado', href: 'https://www.boe.es/buscar/act.php?id=BOE-A-2007-4372&p=20260205&tn=0', note: 'Texto consolidado del reglamento de ingreso, fases, baremos y distintos regímenes de ponderación.' },
    { label: 'BOE: convocatoria docente de Castilla y León 2026', href: 'https://www.boe.es/buscar/doc.php?id=BOE-A-2026-1509&lang=es', note: 'Ejemplo actual de convocatoria autonómica vinculada al reglamento estatal y a su publicación territorial.' },
    { label: 'BOE: oposición de Maestros de Madrid 2026', href: 'https://www.boe.es/diario_boe/txt.php?id=BOE-A-2026-3765', note: 'Ejemplo actual de proceso por cuerpo, especialidad y administración convocante.' },
    { label: 'BOE: reglamento en PDF consolidado', href: 'https://www.boe.es/buscar/pdf/2007/BOE-A-2007-4372-consolidado.pdf', note: 'Versión descargable para localizar artículos, anexos y disposiciones aplicables.' },
  ],
};

export const spanishPercentageShortcutsGuide: SpanishInfoPage = {
  title: 'Cómo calcular porcentajes rápido: descuentos, subidas y porcentajes encadenados',
  seoTitle: 'Cómo calcular porcentajes rápido y sin errores',
  seoDescription: 'Aprende trucos para calcular porcentajes, descuentos sucesivos, precio original, IVA, propinas, variación y puntos porcentuales con ejemplos verificables.',
  keywords: [
    'cómo calcular porcentajes rápido',
    'descuentos sucesivos fórmula',
    'calcular precio original descuento',
    'subida y bajada porcentaje',
    'porcentaje y puntos porcentuales',
    'trucos porcentajes mental',
  ],
  eyebrow: 'Guía práctica · cálculo mental · porcentajes',
  intro: 'Los porcentajes se vuelven fáciles cuando dejan de verse como símbolos y se convierten en multiplicadores. Un descuento del 20 % es ×0,80; una subida del 15 % es ×1,15. Con esa idea puedes encadenar rebajas, recuperar el precio original, calcular IVA o propinas y detectar titulares que confunden porcentajes con puntos porcentuales.',
  directAnswer: [
    'Para hallar p % de una cantidad, multiplica cantidad × p / 100. Para aumentar p %, multiplica por 1 + p/100; para reducir p %, por 1 − p/100. En cálculo mental, descompón: 15 % = 10 % + 5 %, y 5 % es la mitad del 10 %.',
    'Los porcentajes sucesivos se multiplican, no se suman. Un 20 % de descuento seguido de otro 10 % deja 0,80 × 0,90 = 0,72 del precio: descuento total del 28 %. Para recuperar el original desde 72 €, divide 72 / 0,72 = 100 €.',
  ],
  sections: [
    {
      heading: 'La idea que resuelve casi todos los casos: usar multiplicadores',
      paragraphs: [
        'Un porcentaje describe una razón por cada cien. El 18 % equivale a 18/100 = 0,18. Si deseas el 18 % de 250, calculas 250 × 0,18 = 45. Si el precio sube un 18 %, conservas el 100 % y añades el 18 %, por eso multiplicas por 1,18. Si baja, queda el 82 %, por eso multiplicas por 0,82.',
        'Escribir primero el multiplicador evita decidir de memoria si hay que sumar, restar, multiplicar o dividir. También permite una comprobación rápida: un descuento debe producir un número menor que el original; una subida, uno mayor. Si no ocurre, la fórmula o el separador decimal están mal.',
      ],
      link: {
        prefix: 'Para verificar cualquier caso, abre la ',
        label: 'calculadora de porcentajes',
        href: '/es/herramientas/calculadora-porcentajes/',
        suffix: ' y compara con tu cálculo mental.',
      },
    },
    {
      heading: 'Trucos mentales para 1 %, 5 %, 10 %, 15 %, 20 % y 25 %',
      paragraphs: [
        'El 10 % se obtiene desplazando la coma un lugar: 10 % de 348 es 34,8. El 1 % desplaza dos lugares: 3,48. El 5 % es la mitad del 10 %: 17,4. El 15 % suma 10 % y 5 %: 52,2. El 20 % duplica el 10 %: 69,6. El 25 % es la cuarta parte: 87.',
        'Para porcentajes menos cómodos, combina piezas. El 18 % de 250 es 20 % menos 2 %: 50 − 5 = 45. El 12,5 % es un octavo. El 75 % son tres cuartos. Escoge la descomposición con menos pasos y después estima el orden de magnitud para detectar un decimal desplazado.',
      ],
      items: [
        '10 %: divide entre 10.',
        '5 %: divide entre 20 o toma la mitad del 10 %.',
        '1 %: divide entre 100.',
        '25 %: divide entre 4; 50 %: divide entre 2.',
        '15 %: 10 % + 5 %; 30 %: tres veces 10 %.',
      ],
    },
    {
      heading: 'Descuento sencillo: precio final y ahorro',
      paragraphs: [
        'Una chaqueta de 150 € con 30 % de descuento conserva el 70 %. Precio final = 150 × 0,70 = 105 €. El ahorro es 150 × 0,30 = 45 €. Ambas cifras deben sumar el precio inicial: 105 + 45 = 150.',
        'No restes «30» al precio salvo que el anuncio diga 30 €. El símbolo % siempre necesita una base. En una cesta con productos de precios distintos, aplicar 30 % a cada artículo da el mismo total que aplicarlo al subtotal solo si todos participan y no existen topes, exclusiones o cupones fijos.',
      ],
    },
    {
      heading: 'Descuentos sucesivos: por qué 20 % + 10 % no es 30 %',
      paragraphs: [
        'Tras el primer 20 %, queda el 80 % del precio. El segundo 10 % se aplica a ese nuevo importe, por lo que queda el 90 % de 80 %: 0,80 × 0,90 = 0,72. El descuento equivalente es 1 − 0,72 = 0,28, es decir, 28 %.',
        'Con tres cambios, multiplica los tres factores. Un 15 %, después 10 % y luego 5 % deja 0,85 × 0,90 × 0,95 = 0,72675: se paga el 72,675 % y el descuento total es 27,325 %. Redondea dinero al final según las reglas de la compra, no cada factor.',
      ],
    },
    {
      heading: 'Cómo recuperar el precio original',
      paragraphs: [
        'Si el precio final F representa una fracción m del original, el original es F / m. Un producto queda en 84 € después de un 30 % de descuento: m = 0,70 y original = 84 / 0,70 = 120 €. Sumar 30 % a 84 daría 109,20 €, una respuesta incorrecta porque ese 30 % tendría otra base.',
        'La misma lógica sirve para impuestos incluidos. Si 121 € incluyen un 21 % añadido sobre la base, la base es 121 / 1,21 = 100 €, no 121 − 21 %. La parte añadida es 21 €. Comprueba multiplicando de nuevo la base por 1,21.',
      ],
    },
    {
      heading: 'Subir y bajar el mismo porcentaje no devuelve al inicio',
      paragraphs: [
        'Partiendo de 100, una subida del 20 % da 120. Una bajada posterior del 20 % se calcula sobre 120 y resta 24, dejando 96. Los multiplicadores confirman 1,20 × 0,80 = 0,96: pérdida neta del 4 %.',
        'En general, subir p y bajar p produce 1 − (p/100)². Con 10 %, queda 99 %; con 50 %, queda 75 %. Para recuperar una caída del 20 %, hace falta subir 25 %, porque 80 × 1,25 = 100. Este cálculo describe aritmética; no es una predicción ni recomendación financiera.',
      ],
    },
    {
      heading: 'Variación porcentual entre dos valores',
      paragraphs: [
        'La variación desde un valor inicial A hasta uno final B es (B − A) / A × 100. Pasar de 80 a 100 implica (20/80) × 100 = 25 %. Volver de 100 a 80 implica −20/100 × 100 = −20 %. Las dos direcciones no son simétricas porque cambia el denominador.',
        'Declara siempre el punto de partida. «A es un 25 % mayor que B» no equivale a «B es un 25 % menor que A». Si A = 100 y B = 80, A es 25 % mayor que B, pero B es 20 % menor que A. Para comparar sin dirección pueden usarse otras medidas, pero deben nombrarse.',
      ],
    },
    {
      heading: 'Porcentaje frente a puntos porcentuales',
      paragraphs: [
        'Si una tasa pasa de 2 % a 3 %, la diferencia absoluta es 1 punto porcentual. La variación relativa es (3 − 2) / 2 = 50 %. Ambas expresiones son correctas, pero responden preguntas diferentes. Decir solo «subió un 1 %» es ambiguo y suele ser incorrecto.',
        'Otro ejemplo: una proporción pasa de 40 % a 45 %. Aumenta 5 puntos porcentuales y un 12,5 % respecto al valor inicial, porque 5/40 = 0,125. En noticias, informes y encuestas, identifica si se compara la distancia entre tasas o el cambio relativo.',
      ],
    },
    {
      heading: 'IVA, recargos y propinas',
      paragraphs: [
        'Para añadir un IVA del 21 % a una base de 80 €, multiplica 80 × 1,21 = 96,80 €. Para extraer la base de un precio con IVA incluido, divide por 1,21. No restes 21 % del total: 96,80 × 0,79 = 76,472 €, que no recupera la base.',
        'Una propina del 10 % sobre 46,50 € es 4,65 €; el total, 51,15 €. Si existe servicio incluido, impuestos o reglas locales, confirma sobre qué base se calcula. En un grupo, decide si se redondea la propina total o cada parte, porque el orden puede producir céntimos distintos.',
      ],
    },
    {
      heading: 'Media ponderada y porcentajes de una nota',
      paragraphs: [
        'Si tareas pesan 30 %, examen parcial 30 % y final 40 %, con notas 82, 75 y 88, la media es 82 × 0,30 + 75 × 0,30 + 88 × 0,40 = 82,3. Los pesos deben sumar 1 o 100 %. Sumar las notas y dividir entre tres ignoraría que el final pesa más.',
        'Una categoría vacía no debe convertirse automáticamente en cero ni desaparecer sin ajustar el denominador. La política del curso decide si se excluye, se penaliza o queda pendiente. Mantén precisión durante los productos y redondea al final según la norma.',
      ],
      link: {
        prefix: 'Para varias categorías, utiliza la ',
        label: 'calculadora de media ponderada',
        href: '/es/herramientas/calculadora-media-ponderada/',
        suffix: ' y comprueba que los pesos suman 100 %.',
      },
    },
    {
      heading: 'Porcentaje de aumento necesario para alcanzar un objetivo',
      paragraphs: [
        'Para pasar de 64 a 80, la diferencia es 16 y la base es 64: 16/64 × 100 = 25 %. No es 16 %; 16 son puntos de la escala, mientras 25 % es la variación relativa. Si el objetivo es reducir de 80 a 64, la caída es 20 % porque ahora la base es 80.',
        'Si buscas qué nota necesitas en una parte restante, plantea primero la ecuación ponderada. Con 70 puntos acumulados que representan 80 % del curso y un examen final de 20 %, no basta con calcular un porcentaje del objetivo: define si 70 es contribución ya ponderada o promedio parcial. Etiquetar unidades evita mezclar puntos y porcentajes.',
      ],
    },
    {
      heading: 'Errores de calculadora, coma decimal y redondeo',
      paragraphs: [
        'En español se escribe 12,5 %, pero algunas calculadoras y archivos esperan 12.5. Si una herramienta devuelve un número cien veces mayor, revisa si introdujiste 20 como porcentaje donde esperaba 0,20, o al revés. No mezcles ambas representaciones en una misma fórmula.',
        'Con dinero, conserva al menos precisión de cálculo suficiente y redondea según el sistema de cobro. Pequeñas diferencias pueden surgir si una tienda redondea cada línea antes del total. Guarda precio base, factor, resultado sin redondear y total cobrado para localizar la diferencia.',
      ],
    },
    {
      heading: 'Método de comprobación en cuatro pasos',
      paragraphs: [
        'Primero identifica base, cambio y pregunta: parte, total final, original o variación. Segundo traduce el porcentaje a factor. Tercero calcula sin redondear antes de tiempo. Cuarto verifica dirección y reconstruye el dato: original × factor debe volver al final.',
        'Usa un caso de 100 como prueba mental. Si dos descuentos son 20 % y 10 %, imagina 100 → 80 → 72. Si el resultado de tu fórmula no coincide, detente. Esta miniatura detecta errores de suma, división y base con más rapidez que repetir las teclas de la calculadora.',
      ],
    },
  ],
  faq: [
    { q: '¿Cómo calculo un porcentaje rápido de cabeza?', a: 'Calcula 10 %, 5 % y 1 % y combínalos. Por ejemplo, 18 % = 20 % − 2 % o 10 % + 5 % + 3 %.' },
    { q: '¿Cómo se suman dos descuentos?', a: 'No se suman: multiplica lo que queda. Para 20 % y 10 %, 0,80 × 0,90 = 0,72, así que el descuento total es 28 %.' },
    { q: '¿Cómo averiguo el precio antes del descuento?', a: 'Divide el precio final entre el factor restante. Tras 30 % de descuento, divide entre 0,70.' },
    { q: '¿Por qué subir y bajar 20 % deja una pérdida?', a: 'Porque la bajada se aplica a una base mayor. 1,20 × 0,80 = 0,96: queda el 96 %.' },
    { q: '¿Cuál es la fórmula de variación porcentual?', a: '(valor final − valor inicial) / valor inicial × 100. El valor inicial es el denominador.' },
    { q: '¿Qué diferencia hay entre porcentaje y puntos porcentuales?', a: 'Los puntos porcentuales restan dos tasas; la variación porcentual divide esa diferencia entre la tasa inicial.' },
    { q: '¿Cómo quito el IVA de un precio?', a: 'Divide el total entre 1 + tipo/100. Con IVA 21 %, divide entre 1,21.' },
    { q: '¿Cuándo debo redondear?', a: 'Conserva precisión durante el cálculo y redondea al final, salvo que la norma, factura o sistema indique otro orden.' },
  ],
  review: {
    heading: 'Control de calidad de un cálculo porcentual',
    intro: 'Un resultado fiable identifica la base y puede reconstruirse con la operación inversa.',
    checks: [
      { title: 'Base', text: 'Está claro qué cantidad representa el 100 % y qué cambia después.' },
      { title: 'Factor', text: 'Cada porcentaje se convierte a decimal y los cambios sucesivos se multiplican.' },
      { title: 'Verificación', text: 'Dirección, unidades, operación inversa y redondeo producen un resultado razonable.' },
    ],
  },
  sources: [
    { label: 'INTEF: descuentos y aumentos porcentuales sucesivos', href: 'https://descargas.intef.es/recursos_educativos/geogebra/ESO/E23076/propuestas_de_uso.html', note: 'Recurso educativo oficial español para porcentajes encadenados en situaciones cotidianas.' },
    { label: 'INTEF Procomún: proporcionalidad y porcentajes', href: 'https://procomun.intef.es/ode/view/es_2024120912_9171747', note: 'Recurso abierto para trabajar porcentajes y rebajas en educación secundaria.' },
    { label: 'INE: Manual básico de estadística', href: 'https://www.ine.es/ine/oposiciones/temario_2021/manual_basico_estadistica.pdf', note: 'Manual del Instituto Nacional de Estadística sobre bases, porcentajes y tasas de variación.' },
    { label: 'INTEF: razón, fracción, decimal y porcentaje', href: 'https://descargas.intef.es/recursos_educativos/geogebra/Primaria/P54297/propuestas_de_uso.html', note: 'Material oficial para conectar fracciones, decimales y porcentajes mediante proporcionalidad.' },
  ],
};
