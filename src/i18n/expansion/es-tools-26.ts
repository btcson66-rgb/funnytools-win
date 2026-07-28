import type { ToolContent } from '../tools/_types';

export const spanishClassRankPercentile: ToolContent = {
  name: 'Calculadora de percentil por posición en clase',
  short: 'Convierte una posición ordinal y el tamaño del grupo en un rango percentil estimado y un porcentaje superior aproximado.',
  long: 'Esta calculadora estima la posición relativa de un puesto de clase mediante PR = 100 × (N − r + 0,5) / N, donde el puesto 1 es el mejor. También muestra el porcentaje superior aproximado, cuántas personas quedan por delante y cuántas por detrás. Es una convención de punto medio para puestos únicos: no resuelve empates, no sustituye una clasificación oficial y no convierte una nota directa en percentil sin conocer el grupo.',
  seoTitle: 'Calculadora de percentil por ranking de clase',
  seoDescription: 'Convierte puesto y tamaño de clase en rango percentil, top aproximado y personas por delante o detrás. Fórmula, ejemplo y límites.',
  keywords: [
    'calculadora percentil ranking clase',
    'convertir posición a percentil',
    'percentil por puesto',
    'rango percentil de una clasificación',
    'top porcentaje clase',
    'posición relativa alumnos',
    'ranking académico percentil',
    'calculadora puesto de clase',
  ],
  capabilities: [
    'Aceptar un puesto entero desde 1 hasta el tamaño total del grupo.',
    'Calcular un rango percentil mediante el punto medio del intervalo del puesto.',
    'Mostrar el porcentaje superior aproximado como 100 × r / N.',
    'Contar personas con mejor puesto y personas situadas detrás.',
    'Invalidar el resultado al cambiar cualquier dato.',
    'Procesar los dos conteos en el navegador sin solicitar nombres ni calificaciones.',
  ],
  contentSections: [
    {
      heading: 'Respuesta rápida: pasar un puesto de clase a percentil',
      paragraphs: [
        'Introduce el puesto r, contando 1 como la posición más alta, y el número total N de personas clasificadas. Con r = 6 y N = 40, la fórmula de punto medio produce PR = 100 × (40 − 6 + 0,5) / 40 = 86,25. La página muestra 86,25, un top aproximado del 15%, cinco personas por delante y 34 por detrás. El PR se puede redactar como «posición estimada 86,25 dentro de ese grupo», no como 86,25% de aciertos.',
        'Antes de calcular, confirma que el puesto y N proceden de la misma lista definitiva. Si se excluyeron ausencias, no presentados o registros sin nota, N debe reflejar exactamente la población que generó el ranking. La calculadora exige enteros positivos y bloquea r > N, pero no puede detectar si mezclaste una posición de curso con el tamaño de una clase distinta.',
      ],
      items: [
        'Puesto 1 de 40: PR 98,75 y top aproximado 2,5%.',
        'Puesto 20 de 40: PR 51,25 y top aproximado 50%.',
        'Puesto 40 de 40: PR 1,25 y top aproximado 100%.',
        'Los extremos no son 0 ni 100 porque cada puesto ocupa el centro de su intervalo.',
      ],
    },
    {
      heading: 'Por qué se usa una corrección de 0,5',
      paragraphs: [
        'Cada persona representa una fracción 1/N del grupo. Situar el puesto en el borde superior o inferior de esa fracción puede inflar o reducir sistemáticamente la posición. La corrección de 0,5 coloca la observación en el centro del tramo porcentual que ocupa. NIST documenta esta lógica para percentage rank mediante 100 × (rango − 0,5) / N; aquí se invierte la orientación porque el puesto 1 representa el resultado más alto.',
        'No existe una única fórmula universal para todos los rankings. Un centro puede informar porcentaje acumulado, decil, cuartil, puesto/N, (puesto − 1)/(N − 1), rango medio con empates o un baremo propio. Los resultados pueden diferir, especialmente con grupos pequeños. Si debes cumplir un expediente, admisión, beca u oposición, usa el método indicado por la entidad receptora y conserva su regla de redondeo.',
      ],
    },
    {
      heading: 'Rango percentil, top porcentaje y valor percentil',
      paragraphs: [
        'El rango percentil estima qué proporción de la distribución queda por debajo de una posición. El «top 15%» mira desde el extremo superior y aquí se aproxima con 100 × r/N. Ambos describen orientación relativa, pero no son complementos exactos bajo todas las convenciones: uno usa el centro del intervalo y el otro el límite que alcanza el puesto. Por eso PR 86,25 y top 15% pueden coexistir sin sumar exactamente 100.',
        'El valor percentil responde a otra pregunta: qué calificación funciona como corte para P25, P50 o P90 en una lista ordenada. Esta herramienta no recibe calificaciones y no puede obtener ese umbral. Tampoco calcula el rango percentil basado en cantidades inferiores y empatadas; para eso existe la calculadora de rango percentil de FunnyTools, que permite introducir B, E y N.',
      ],
    },
    {
      heading: 'Empates y rankings con puestos compartidos',
      paragraphs: [
        'Con un puesto compartido, r por sí solo pierde información. Dos personas pueden figurar como terceras, y el siguiente puesto puede ser quinto o cuarto según el sistema de ranking. Para un cálculo defendible se necesita saber cuántas puntuaciones son estrictamente superiores, cuántas empatan y qué regla asignó el centro del bloque. Esta página asume un puesto único y no inventa esos datos.',
        'Si tienes la distribución, cuenta B como casos con puntuación inferior y E como casos iguales y usa PR = 100 × (B + 0,5E) / N. Si solo recibiste un ranking oficial con empates, consulta cómo se construyó. No sumes 0,5 a un puesto compartido como si cada persona ocupara un intervalo distinto; eso podría dar a quienes empatan posiciones percentiles diferentes.',
      ],
      items: [
        'Sin empates: esta estimación por puesto es comprobable.',
        'Con empates conocidos: usar conteos inferior/igual es más transparente.',
        'Con ranking oficial opaco: informar el puesto original y su fuente.',
        'Nunca romper un empate de forma arbitraria para obtener un percentil.',
      ],
    },
    {
      heading: 'Tamaño del grupo, precisión y comparaciones',
      paragraphs: [
        'En un grupo pequeño, cada puesto cubre un intervalo grande. Con N = 10, desplazarse un lugar cambia cerca de diez puntos de PR; mostrar dos decimales no elimina esa granularidad. Con N = 500, el paso es mucho menor. Informa N junto al resultado para que quien lo lea entienda la resolución real y no interprete 86,25 frente a 86,50 como una diferencia sustancial.',
        'Una posición depende de la composición del grupo. Ser sexto entre 40 en una clase no equivale automáticamente a ser sexto entre 40 en una cohorte regional, porque dificultad, selección y distribución pueden variar. Para seguir progreso, conserva también la nota directa y usa grupos comparables. Una mejora de PR puede deberse al desempeño propio, a cambios del grupo o a otra evaluación.',
      ],
    },
    {
      heading: 'Cómo informar el cálculo sin sobreinterpretar',
      paragraphs: [
        'Una redacción verificable sería: «Puesto 6 de 40 en la clasificación final del grupo; usando el punto medio PR = 100 × (N − r + 0,5)/N, PR estimado = 86,25 y top aproximado = 15%». Añade fecha, cohorte, tratamiento de empates y norma si el documento se utilizará fuera del aula. Evita escribir solo «percentil 86», porque se perderían método y referencia.',
        'El resultado no demuestra dominio, aptitud ni probabilidad de admisión. No predice plazas ni resuelve criterios de desempate. La página funciona con dos enteros y no necesita nombres, notas ni expedientes; introduce únicamente r y N. Si el cálculo es oficial, archiva la fuente de la clasificación y verifica el resultado con el sistema autorizado.',
      ],
    },
  ],
  formula: {
    expression: 'PR = 100 × (N − r + 0,5) / N',
    explanation: 'r es el puesto, con 1 como mejor posición, y N es el tamaño total. La corrección 0,5 sitúa un puesto único en el centro de su intervalo. El top aproximado se calcula como 100 × r/N.',
  },
  instructions: [
    'Confirma que el ranking ordena desde 1 como mejor posición.',
    'Introduce el puesto entero r.',
    'Introduce el tamaño total N de la misma clasificación.',
    'Pulsa Calcular percentil del ranking.',
    'Revisa PR, top aproximado y cantidades por delante y detrás.',
    'Documenta grupo, fecha, fórmula y tratamiento de empates.',
  ],
  examples: [
    'Expresar el puesto 6 de 40 como posición relativa.',
    'Explicar por qué el primer puesto de un grupo finito no da PR 100.',
    'Comparar la granularidad de rankings con N = 10 y N = 200.',
    'Detectar que un ranking empatado necesita otra fórmula.',
    'Distinguir top porcentaje de una nota porcentual.',
  ],
  audience: [
    'Estudiantes y docentes que interpretan un ranking sin empates.',
    'Orientadores que necesitan explicar una posición relativa estimada.',
    'Personas que comprueban una fórmula antes de usar una regla oficial.',
    'Usuarios que quieren separar puesto, PR, top porcentaje y valor percentil.',
  ],
  caseStudies: [
    { title: 'Sexto puesto de cuarenta', description: 'El cálculo da PR 86,25, top 15%, cinco personas por delante y 34 detrás. El informe conserva N y la fórmula.' },
    { title: 'Primer puesto de diez', description: 'PR es 95 por la convención de punto medio. El equipo no fuerza 100 y explica que cada persona representa diez puntos porcentuales.' },
    { title: 'Tercer puesto compartido', description: 'Dos estudiantes empatan. En lugar de asignarles resultados distintos, el centro usa sus conteos de puntuaciones superiores e iguales.' },
  ],
  notes: [
    'Esta página supone puestos únicos y orden descendente.',
    'No calcula empates, valores percentiles ni porcentaje de aciertos.',
    'Top porcentaje es una aproximación por límite, no el complemento exacto de PR.',
    'La resolución depende de N.',
    'Una entidad puede usar otra fórmula.',
    'No usar un ranking aislado para decisiones de alto impacto.',
  ],
  faq: [
    { q: '¿Por qué el puesto 1 no da PR 100?', a: 'Porque el punto medio sitúa cada observación en el centro de su fracción 1/N. El primero queda a medio intervalo de 100.' },
    { q: '¿Top 10% equivale exactamente a PR 90?', a: 'Son conceptos próximos, pero la corrección de punto medio y el redondeo pueden impedir una equivalencia exacta.' },
    { q: '¿Cómo introduzco un empate?', a: 'Esta página no dispone de ese dato. Usa la calculadora por conteos inferiores e iguales o la regla oficial del ranking.' },
    { q: '¿Puedo usar una posición decimal?', a: 'No. r y N son conteos enteros. Un rango promedio decimal requiere conocer cómo se trataron los empates.' },
    { q: '¿Es igual que calcular un percentil de notas?', a: 'No. Aquí se parte de un puesto. Para hallar el valor P90 hace falta la lista de notas y una regla de interpolación.' },
    { q: '¿Puedo comparar rankings de dos clases?', a: 'Solo con cautela. Tamaño, composición y evaluación pueden ser distintos aunque el PR estimado coincida.' },
    { q: '¿Sirve para una solicitud oficial?', a: 'Úsala únicamente si la entidad acepta esta fórmula. Si publica su propio método, ese método prevalece.' },
    { q: '¿Se envían datos del estudiante?', a: 'No. Solo se procesan puesto y tamaño del grupo en la pestaña.' },
  ],
  labels: {
    rank: 'Puesto en la clasificación (r)',
    total: 'Tamaño total del grupo (N)',
    calculate: 'Calcular percentil del ranking',
    result: 'Rango percentil estimado',
    top: 'Top porcentaje aproximado',
    peopleAhead: 'Personas por delante',
    peopleBehind: 'Personas por detrás',
    invalid: 'Puesto y tamaño deben ser enteros positivos, y el puesto no puede superar el tamaño del grupo.',
  },
  sources: [
    { label: 'NIST Dataplot: Percentage Rank', href: 'https://www.itl.nist.gov/div898/software/dataplot/refman2/auxillar/percrank.htm', note: 'Documenta la convención de punto medio y el rango promedio para empates.' },
    { label: 'UNAM: medidas de posición', href: 'https://cc.sisal.unam.mx/Guias/GuiaEstadisticaR.html', note: 'Explica en español percentiles y medidas que sitúan una observación dentro de una muestra.' },
    { label: 'Universitat de Barcelona: puntuaciones derivadas y percentiles', href: 'https://diposit.ub.edu/dspace/bitstream/2445/183274/1/Puntuaciones%20derivadas_estandarizadas.pdf', note: 'Describe el percentil como porcentaje de sujetos con puntuaciones inferiores y enfatiza la referencia grupal.' },
  ],
  privacyNote: 'Solo r y N se calculan en esta pestaña. No introduzcas nombres, notas ni identificadores.',
  disclaimer: 'Estimación educativa mediante una convención concreta y sin empates. Verifica la fórmula oficial antes de usarla en admisión, becas, selección o certificación.',
};

export const spanishClassRankPercentileReview = {
  heading: 'Revisión antes de informar el ranking',
  intro: 'La fórmula solo es adecuada cuando el sentido del puesto, el grupo y los empates están definidos.',
  panels: [
    { title: 'Orden', text: 'El puesto 1 representa el resultado más alto.' },
    { title: 'Grupo', text: 'r y N proceden de la misma clasificación y fecha.' },
    { title: 'Empates', text: 'No existen o se ha usado otro método que los represente.' },
  ],
  checklistHeading: 'Lista de comprobación',
  checklist: [
    'Puesto y tamaño son enteros.',
    'Se declara la fórmula de punto medio.',
    'N acompaña siempre al resultado.',
    'Top porcentaje no se presenta como porcentaje de aciertos.',
    'La entidad receptora acepta esta convención.',
  ],
};

export const spanishNormalizedScore: ToolContent = {
  name: 'Conversor de puntuaciones estandarizadas',
  short: 'Transforma linealmente una puntuación desde su media y desviación originales a una escala objetivo.',
  long: 'Este conversor calcula primero z = (X − M)/DE y después Y = Mₜ + z × DEₜ. Así conserva la posición en desviaciones estándar mientras cambia el origen y la unidad de la escala. Puedes crear una escala T con media 50 y DE 10 u otra escala documentada. Es una reexpresión lineal: no hace normal una distribución asimétrica, no equipara pruebas distintas y no aplica baremos, percentiles ni límites oficiales.',
  seoTitle: 'Conversor de puntuación estandarizada | Escala Z',
  seoDescription: 'Convierte una nota a otra escala con media y desviación objetivo. Calcula Z, resultado, desplazamientos y factor; explica límites.',
  keywords: [
    'conversor puntuaciones estandarizadas',
    'transformar nota a otra escala',
    'cambio de media y desviación estándar',
    'puntuaciones típicas derivadas',
    'convertir puntuación z',
    'normalizar puntuaciones fórmula',
    'transformación lineal de notas',
    'escala media 50 desviación 10',
  ],
  capabilities: [
    'Calcular Z desde puntuación, media y desviación originales.',
    'Mapear esa posición a una media y desviación objetivo positivas.',
    'Mostrar resultado, desplazamiento original, desplazamiento objetivo y factor de escala.',
    'Aceptar escalas con medias negativas o decimales.',
    'Bloquear desviaciones cero o negativas y campos vacíos.',
    'Invalidar resultados anteriores cuando cambia una entrada.',
  ],
  contentSections: [
    {
      heading: 'Respuesta rápida: transformar una puntuación a otra escala',
      paragraphs: [
        'Escribe X, la media M y la desviación estándar DE de la escala original; después fija la media Mₜ y la desviación DEₜ de la escala objetivo. Con X = 82, M = 70, DE = 10, Mₜ = 50 y DEₜ = 10, z = 1,2 y Y = 62. La persona queda 1,2 desviaciones por encima de la media en ambas escalas, aunque los números visibles cambien.',
        'Los cuatro parámetros deben pertenecer a un procedimiento coherente. La media y DE originales describen el grupo que generó X; la media y DE objetivo definen únicamente cómo se expresa esa posición. Esta herramienta no estima parámetros desde una lista ni decide una escala adecuada. Si el manual proporciona tablas normativas, usa esas tablas cuando incluyan pasos adicionales.',
      ],
      items: [
        'Escala T: Mₜ = 50 y DEₜ = 10.',
        'Escala centrada en 100: elige la DE definida por el sistema.',
        'Misma escala: si Mₜ=M y DEₜ=DE, Y=X.',
        'Ambas desviaciones deben ser mayores que cero.',
      ],
    },
    {
      heading: 'Dos pasos: estandarizar y reescalar',
      paragraphs: [
        'El primer paso elimina origen y unidad: z = (X − M)/DE. El segundo asigna un nuevo origen y unidad: Y = Mₜ + zDEₜ. Combinados forman una transformación lineal Y = Mₜ + (X − M)DEₜ/DE. El factor DEₜ/DE multiplica cada diferencia original; el término de ajuste sitúa la nueva media donde se ha definido.',
        'Cuando DEₜ es positiva, el orden se conserva: una puntuación mayor sigue siendo mayor. Las distancias se multiplican por un factor constante y las correlaciones lineales no cambian por una reexpresión válida. Sin embargo, el aspecto numérico puede sugerir una precisión falsa. Conserva parámetros originales y redondea solo el resultado final.',
      ],
    },
    {
      heading: 'Estandarización lineal no es normalización de la distribución',
      paragraphs: [
        'En español se usa «normalizar» con varios sentidos. Esta página realiza un cambio lineal de origen y escala. Una distribución sesgada, con dos modas o valores extremos conserva su forma. Restar la media y dividir por DE no redistribuye rangos ni fuerza una curva de Gauss. La Universitat de Barcelona diferencia las puntuaciones estandarizadas y las transformaciones derivadas de los procedimientos normalizados basados en una distribución.',
        'Una normalización por percentiles o una transformación de normal scores necesita la distribución completa, una regla para empates y decisiones sobre colas. No puede reconstruirse con solo X, M y DE. Por eso la página informa Z y Y, pero no añade un percentil ni una probabilidad. Si el objetivo es corregir dificultad entre ediciones de un examen, también puede requerirse equiparación, no solo reescalado.',
      ],
    },
    {
      heading: 'Qué se conserva y qué no se vuelve comparable',
      paragraphs: [
        'La transformación conserva la posición relativa respecto de los parámetros introducidos. No añade fiabilidad, validez ni equivalencia de contenido. Dos pruebas pueden producir Y = 62 y medir capacidades diferentes, tener errores de medida distintos o usar muestras normativas incompatibles. Compartir media y desviación objetivo solo hace que la notación sea común.',
        'Para comparar instrumentos, revisa constructo, población, fecha, condiciones de aplicación y evidencia de equiparación. En evaluación profesional, un manual puede usar conversiones no lineales, tablas por edad o correcciones. Introducir una media general en lugar del baremo pertinente puede producir una cifra matemáticamente correcta y sustantivamente equivocada.',
      ],
    },
    {
      heading: 'Extremos, límites y redondeo',
      paragraphs: [
        'Una transformación lineal no tiene límites inherentes. Si Z es muy alta o baja, Y puede salir fuera del intervalo habitual, incluso por debajo de cero o por encima de cien. No recortes el valor salvo que la escala oficial defina techo, suelo o categorías. Un resultado extremo debe llevar a revisar datos, grupo y unidad antes de asumir que es válido.',
        'El factor mostrado es DEₜ/DE. Si vale 2, una diferencia de un punto original se convierte en dos unidades objetivo; si vale 0,5, se comprime. Los desplazamientos ayudan a auditar la operación: X − M y Y − Mₜ deben guardar esa proporción. Usa valores sin redondear durante ambos pasos y aplica al final el criterio del informe.',
      ],
    },
    {
      heading: 'Cómo documentar una conversión reproducible',
      paragraphs: [
        'Escribe: «X = 82 se estandarizó con M = 70 y DE = 10 (z = 1,20) y se transformó a una escala con Mₜ = 50 y DEₜ = 10, obteniéndose Y = 62». Añade grupo normativo, fuente, fecha y decimales. Esa frase permite repetir el cálculo y evita que 62 se confunda con una nota porcentual.',
        'La herramienta procesa cinco números en la pestaña. No necesita nombre, expediente ni etiqueta diagnóstica. Un valor transformado no debe decidir por sí solo una selección o intervención. Cuando la conversión tenga efectos oficiales, verificala con el programa, tabla o normativa responsable y conserva el valor directo.',
      ],
    },
  ],
  formula: {
    expression: 'z = (X − M) / DE; Y = Mₜ + z × DEₜ',
    explanation: 'X, M y DE pertenecen a la escala original; Mₜ y DEₜ definen la escala objetivo. DE y DEₜ deben ser positivas. La transformación conserva Z.',
  },
  instructions: [
    'Identifica la puntuación y parámetros originales del mismo grupo.',
    'Introduce X, M y una DE positiva.',
    'Define media y DE positiva de la escala objetivo.',
    'Pulsa Convertir puntuación.',
    'Comprueba Z, Y, desplazamientos y factor de escala.',
    'Registra parámetros, fuente y redondeo.',
  ],
  examples: [
    'Convertir X=82, M=70, DE=10 a una escala 50/10 y obtener 62.',
    'Crear una escala educativa con media 100 y DE 15.',
    'Demostrar que cambiar de escala conserva el orden.',
    'Ver por qué una distribución asimétrica sigue siendo asimétrica.',
    'Auditar el factor entre unidades originales y objetivo.',
  ],
  audience: [
    'Estudiantes de estadística y psicometría.',
    'Docentes que explican cambios de origen y escala.',
    'Investigadores con parámetros y normas documentados.',
    'Profesionales que comprueban una conversión lineal.',
  ],
  caseStudies: [
    { title: 'Conversión a escala T', description: 'z = 1,2 se expresa como T = 62 con escala 50/10. El informe conserva la Z y el grupo de origen.' },
    { title: 'Escala con media 100', description: 'Una puntuación z = −0,5 pasa a 92,5 cuando Mₜ=100 y DEₜ=15, manteniéndose media desviación por debajo.' },
    { title: 'Pruebas no equivalentes', description: 'Dos resultados se reescalan, pero el equipo no los intercambia porque miden contenidos y grupos diferentes.' },
  ],
  notes: [
    'La página no calcula M ni DE desde datos.',
    'La forma de la distribución no cambia.',
    'La escala objetivo no crea equivalencia entre pruebas.',
    'No hay límites automáticos.',
    'Redondear solo al final.',
    'Las tablas normativas oficiales prevalecen.',
  ],
  faq: [
    { q: '¿Esto hace normal la distribución?', a: 'No. Es una transformación lineal; conserva asimetría, modas y orden.' },
    { q: '¿Cómo creo una puntuación T?', a: 'Usa media objetivo 50 y desviación objetivo 10.' },
    { q: '¿Puedo convertir a una escala de media 100?', a: 'Sí, si defines también la desviación objetivo apropiada y esa escala está justificada.' },
    { q: '¿Por qué necesito la media y DE originales?', a: 'Porque permiten obtener Z, la posición relativa que se conserva al reescalar.' },
    { q: '¿Puede Y superar 100?', a: 'Sí. Una transformación lineal no tiene techo salvo que una norma externa lo imponga.' },
    { q: '¿Puedo comparar dos pruebas después de convertirlas?', a: 'Solo si contenido, grupos y evidencia de equivalencia lo permiten. La misma escala numérica no basta.' },
    { q: '¿Es igual que equiparar exámenes?', a: 'No necesariamente. La equiparación puede modelar diferencias de dificultad y requerir datos de ambas formas.' },
    { q: '¿Los números se guardan?', a: 'No. Entradas y resultados permanecen en esta pestaña.' },
  ],
  labels: {
    score: 'Puntuación original (X)',
    mean: 'Media original (M)',
    sd: 'Desviación original (DE)',
    targetMean: 'Media objetivo (Mₜ)',
    targetSd: 'Desviación objetivo (DEₜ)',
    calculate: 'Convertir puntuación',
    zResult: 'Puntuación Z conservada',
    result: 'Puntuación transformada (Y)',
    originalOffset: 'Distancia original a la media',
    targetOffset: 'Distancia objetivo a la media',
    scaleFactor: 'Factor de cambio de escala',
    invalid: 'Introduce números en todos los campos y usa desviaciones original y objetivo mayores que cero.',
  },
  sources: [
    { label: 'Universitat de Barcelona: estadística, cambio de origen y escala', href: 'https://diposit.ub.edu/bitstreams/6921986c-e112-4d41-9c33-289cddd374a5/download', note: 'Explica transformaciones lineales, estandarización, Z y propiedades de media y desviación.' },
    { label: 'Universitat de Barcelona: puntuaciones Z y derivadas', href: 'https://diposit.ub.edu/items/a0798256-284a-465c-99bb-8e3412d92278', note: 'Material docente sobre pasar de puntuaciones directas a Z y a escalas derivadas como T.' },
    { label: 'INE: Manual básico de estadística', href: 'https://www.ine.es/ine/oposiciones/temario_2021/manual_basico_estadistica.pdf', note: 'Referencia institucional para media, varianza y desviación estándar.' },
  ],
  privacyNote: 'Los cinco números y los resultados se procesan localmente. No introduzcas datos personales.',
  disclaimer: 'Conversión lineal educativa. No sustituye baremos, equiparación, normalización por percentiles ni reglas oficiales.',
};

export const spanishNormalizedScoreReview = {
  heading: 'Revisión antes de convertir una escala',
  intro: 'La transformación es reproducible solo si parámetros y objetivo están documentados.',
  panels: [
    { title: 'Origen', text: 'X, M y DE pertenecen a la misma población y variable.' },
    { title: 'Objetivo', text: 'Mₜ y DEₜ definen una escala real, no valores elegidos para mejorar resultados.' },
    { title: 'Alcance', text: 'No se presenta el reescalado como normalización o equivalencia.' },
  ],
  checklistHeading: 'Lista de comprobación',
  checklist: [
    'Ambas desviaciones son positivas.',
    'Z coincide con el cálculo manual.',
    'El factor es DEₜ/DE.',
    'Se conservan los parámetros originales.',
    'La fuente normativa prevalece si ofrece tabla propia.',
  ],
};

export const spanishTeacherSelectionScore: ToolContent = {
  name: 'Calculadora de nota para oposición o selección docente',
  short: 'Simula una media ponderada de prueba escrita, prueba didáctica y entrevista u otro tercer componente.',
  long: 'Esta calculadora permite ensayar una nota compuesta con tres apartados editables: prueba escrita, prueba didáctica y entrevista u otro componente. Cada puntuación y peso puede modificarse; la herramienta muestra suma de pesos, resultado normalizado y desglose. No reproduce una convocatoria concreta: en España y otros países hispanohablantes cambian fases, escalas, mínimos, méritos, desempates y ponderaciones. Copia siempre la regla oficial vigente antes de simular.',
  seoTitle: 'Calculadora nota oposición docente | Ponderaciones',
  seoDescription: 'Simula nota de oposición o selección docente con prueba escrita, didáctica y tercer componente. Pesos editables, desglose y límites.',
  keywords: [
    'calculadora nota oposición docente',
    'calcular nota oposiciones educación',
    'ponderación pruebas docentes',
    'simulador concurso oposición',
    'nota prueba didáctica',
    'calcular selección docente',
    'media ponderada oposición',
    'nota final maestro oposición',
  ],
  capabilities: [
    'Introducir tres puntuaciones y pesos no negativos.',
    'Usar prueba escrita, prueba didáctica y entrevista u otro componente editable.',
    'Calcular una media ponderada dividiendo por la suma real de pesos.',
    'Avisar cuando los pesos no suman 100.',
    'Normalizar automáticamente los pesos o aplicar un ejemplo 40/30/30.',
    'Copiar resultado y desglose sin enviar datos al servidor.',
  ],
  contentSections: [
    {
      heading: 'Respuesta rápida: simular una nota docente ponderada',
      paragraphs: [
        'Escribe cada puntuación en una escala común y copia los pesos de la convocatoria. Con escrita 80 al 40%, didáctica 85 al 40% y tercer componente 82 al 20%, el resultado es (80×40 + 85×40 + 82×20)/100 = 82,4. El desglose permite comprobar cada producto. Si los pesos no suman 100, aparece una advertencia, aunque la página divide por la suma real para conservar sus proporciones.',
        'Los nombres son una plantilla, no una descripción universal. Si tu proceso tiene tema, caso práctico y programación didáctica, asigna esos tres apartados según el orden que documentes. Si solo tiene dos fases, pon peso cero al tercero. Si combina oposición y méritos, comprueba que ambas puntuaciones estén en escalas compatibles y que la convocatoria permita ponderarlas de esta forma.',
      ],
      items: [
        'Botón 40/30/30: ejemplo, no recomendación oficial.',
        'Normalizar: convierte pesos existentes para que sumen 100 sin cambiar proporciones.',
        'Peso cero: excluye ese componente.',
        'Todos los apartados activos deben estar expresados en una escala comparable.',
      ],
    },
    {
      heading: 'Por qué hay que leer la convocatoria vigente',
      paragraphs: [
        'El Real Decreto 276/2007 regula elementos comunes del ingreso docente en España, pero las administraciones y convocatorias concretan pruebas y pesos. La convocatoria estatal publicada para 2026, por ejemplo, contiene procedimientos y ponderaciones que dependen del sistema de acceso. Castilla-La Mancha publica además criterios por especialidad y prueba. Un porcentaje visto en una convocatoria anterior o en otra comunidad puede no servir.',
        'En otros países hispanohablantes, «concurso docente» puede combinar examen, antecedentes, experiencia, entrevista o clase demostrativa con escalas distintas. Esta página no elige jurisdicción. Antes de calcular, anota organismo, año, cuerpo, especialidad, turno, artículos de calificación y fecha de consulta. Si existe un simulador oficial, úsalo como verificación principal.',
      ],
    },
    {
      heading: 'Fases eliminatorias, mínimos y méritos',
      paragraphs: [
        'Una media alta no compensa necesariamente una prueba suspensa. El reglamento español puede exigir al menos cinco puntos para avanzar o aplicar los méritos solo a quienes superan oposición. Otras convocatorias exigen mínimos en cada parte. Esta calculadora realiza una media y no evalúa esas puertas. Comprueba cada mínimo antes de interpretar el total.',
        'Los méritos pueden estar limitados por un máximo, agruparse por experiencia, formación y otros apartados o sumarse después con otra ponderación. No introduzcas «85» para representar ocho puntos y medio sobre diez junto a una prueba sobre cien. Convierte primero todo a la escala que exige la fórmula oficial o calcula cada fase por separado.',
      ],
    },
    {
      heading: 'Pesos que no suman 100 y normalización',
      paragraphs: [
        'La fórmula general Σ(puntuación×peso)/Σpesos produce una media válida con 4/4/2 o 40/40/20. Sin embargo, un documento oficial puede definir directamente 0,4A + 0,4B + 0,2C, exigir pesos que sumen uno o sumar puntos sin dividir. La advertencia de 100 sirve para revisar la transcripción, no para afirmar que otro total sea siempre incorrecto.',
        '«Normalizar pesos» mantiene proporciones: 40/40/10 pasa a 44,4444/44,4444/11,1111. Eso puede ser útil para un escenario, pero no rellena un diez por ciento ausente ni refleja una regla oficial. Si falta un componente, decide según la convocatoria; no normalices solo para obtener una cifra más favorable.',
      ],
    },
    {
      heading: 'Escenarios de preparación sin predicción de plaza',
      paragraphs: [
        'Puedes fijar dos resultados y variar el tercero para estudiar sensibilidad. Con pesos 40/40/20, subir cinco puntos la didáctica eleva dos puntos la media; subir cinco en el tercer componente eleva uno. Esto ayuda a entender la aritmética, pero no mide la probabilidad real de obtener esas notas ni indica cómo distribuir el tiempo de estudio.',
        'La selección depende además de plazas, notas de otras personas, baremo, turnos, anulaciones, reclamaciones y desempates. No conviertas un escenario en predicción de corte. Guarda varias combinaciones con nombres neutros —conservador, objetivo, máximo— y compáralas con los mínimos oficiales, no con rumores de convocatorias anteriores.',
      ],
    },
    {
      heading: 'Comprobación, copia y privacidad',
      paragraphs: [
        'Recalcula manualmente un ejemplo, verifica suma de pesos y conserva el desglose que ofrece la herramienta. Redondea en el momento indicado por la convocatoria: redondear cada parte antes de ponderar puede cambiar centésimas. El botón Copiar guarda texto en el portapapeles; revisa lo copiado y añade organismo, convocatoria y supuesto.',
        'No introduzcas nombres, DNI, tribunal ni expediente. Solo hacen falta seis números. Los cálculos se realizan en el navegador y editar cualquier campo invalida el resultado anterior. La nota mostrada es una simulación matemática, no una calificación emitida por la administración ni una prueba de selección.',
      ],
    },
  ],
  formula: {
    expression: 'Nota simulada = Σ(puntuaciónᵢ × pesoᵢ) / Σpesos',
    explanation: 'Las puntuaciones activas deben compartir escala y sus pesos ser no negativos, con al menos uno positivo. Mínimos, méritos, topes, sumas y redondeos oficiales se aplican por separado.',
  },
  instructions: [
    'Abre la convocatoria vigente y localiza apartados, escalas, pesos y mínimos.',
    'Introduce las tres puntuaciones o usa peso cero para un apartado inexistente.',
    'Copia cada peso sin asumir que el ejemplo es oficial.',
    'Revisa la suma; corrige o normaliza solo si el procedimiento lo permite.',
    'Pulsa Simular nota ponderada y comprueba el desglose.',
    'Aplica después mínimos, méritos, topes, redondeo y desempate oficiales.',
  ],
  examples: [
    'Simular 80/85/82 con pesos 40/40/20 y obtener 82,4.',
    'Comparar el efecto de mejorar cinco puntos la prueba didáctica.',
    'Representar un proceso de dos apartados poniendo peso cero al tercero.',
    'Detectar que puntuaciones sobre 10 y sobre 100 deben homogeneizarse.',
    'Comprobar un escenario frente a una convocatoria 2026.',
  ],
  audience: [
    'Aspirantes a oposición o selección docente.',
    'Preparadores que explican ponderaciones con ejemplos.',
    'Personas que verifican una suma ponderada oficial.',
    'Candidatos de países hispanohablantes con procesos de tres componentes.',
  ],
  caseStudies: [
    { title: 'Escenario 40/40/20', description: 'Con 80, 85 y 82 se obtiene 82,4. La aspirante comprueba además los mínimos individuales de su convocatoria.' },
    { title: 'Proceso de dos pruebas', description: 'Se usan pesos 50/50/0. El tercer componente queda excluido y el informe explica que no hubo entrevista.' },
    { title: 'Méritos en otra escala', description: 'El candidato no mezcla 8 puntos sobre 10 con pruebas sobre 100; calcula cada fase y aplica después la fórmula oficial.' },
  ],
  notes: [
    'El ejemplo 40/30/30 no es una regla oficial.',
    'Los pesos y fases varían por convocatoria.',
    'La media no comprueba mínimos eliminatorios.',
    'No predice corte, plaza ni desempate.',
    'Normalizar pesos no corrige una transcripción incompleta.',
    'Debe verificarse con la convocatoria vigente.',
  ],
  faq: [
    { q: '¿Qué pesos debo usar?', a: 'Los que publique la convocatoria de tu organismo, año, cuerpo, especialidad y turno. Los valores de la página son solo un ejemplo.' },
    { q: '¿Qué pongo si no hay entrevista?', a: 'Usa el tercer peso en cero o reasigna los campos a los tres apartados reales, dejando por escrito la correspondencia.' },
    { q: '¿La herramienta comprueba una nota mínima?', a: 'No. Debes verificar y superar cada mínimo eliminatorio por separado.' },
    { q: '¿Puedo añadir méritos?', a: 'Solo si los conviertes y ponderas exactamente como ordena la convocatoria. A menudo conviene calcular oposición y concurso en fases separadas.' },
    { q: '¿Qué hace normalizar pesos?', a: 'Reescala los pesos actuales para que sumen 100 sin cambiar su proporción. No decide si esa operación es legal u oficial.' },
    { q: '¿Por qué aparece aviso si no suman 100?', a: 'Para que compruebes una posible omisión. La media aún divide por el total, pero la regla oficial puede exigir otra cosa.' },
    { q: '¿Puede predecir si obtendré plaza?', a: 'No. Faltan plazas, competencia, cortes, méritos, reclamaciones y desempates.' },
    { q: '¿Se guardan mis resultados?', a: 'No. Puntuaciones, pesos y resultado se procesan en esta pestaña.' },
  ],
  labels: {
    written: 'Prueba escrita',
    writtenWeight: 'Peso de la prueba escrita',
    teaching: 'Prueba o exposición didáctica',
    teachingWeight: 'Peso de la prueba didáctica',
    interview: 'Entrevista u otro componente',
    interviewWeight: 'Peso del tercer componente',
    calculate: 'Simular nota ponderada',
    result: 'Nota simulada',
    weightTotal: 'Suma de pesos',
    breakdown: 'Desglose del cálculo',
    preset403030: 'Aplicar ejemplo 40/30/30',
    autoNormalize: 'Normalizar pesos a 100',
    copyResult: 'Copiar resultado',
    copied: 'Resultado copiado',
    weightWarning: 'Los pesos no suman 100. Comprueba la convocatoria o normalízalos solo si corresponde.',
    invalid: 'Completa puntuaciones y pesos con números válidos; usa pesos no negativos y al menos uno mayor que cero.',
  },
  sources: [
    { label: 'BOE: Reglamento de ingreso en cuerpos docentes', href: 'https://www.boe.es/buscar/act.php?id=BOE-A-2007-4372&p=20260205&tn=0', note: 'Texto consolidado sobre pruebas, calificación, concurso, mínimos y ponderación en el sistema español.' },
    { label: 'BOE: convocatoria docente 2026 del Ministerio', href: 'https://www.boe.es/diario_boe/txt.php?id=BOE-A-2025-27152', note: 'Ejemplo vigente que muestra que el procedimiento y las ponderaciones dependen del sistema de acceso.' },
    { label: 'Castilla-La Mancha: oposición de maestros 2026', href: 'https://educacion.castillalamancha.es/profesorado/oposiciones/oposicion-maestros-2026', note: 'Portal oficial con convocatoria y criterios publicados por especialidad y prueba.' },
  ],
  privacyNote: 'Las seis entradas y el resultado se procesan localmente. No escribas nombres, DNI ni datos del tribunal.',
  disclaimer: 'Simulador genérico, no oficial. La convocatoria vigente y los resultados de la administración prevalecen.',
};

export const spanishTeacherSelectionScoreReview = {
  heading: 'Revisión antes de usar la nota simulada',
  intro: 'Una media correcta puede ser inaplicable si faltan mínimos, méritos o una escala común.',
  panels: [
    { title: 'Convocatoria', text: 'Organismo, año, cuerpo, especialidad y turno coinciden.' },
    { title: 'Escalas', text: 'Todos los componentes activos están en una base comparable.' },
    { title: 'Reglas', text: 'Mínimos, topes, méritos, redondeo y desempate se revisan aparte.' },
  ],
  checklistHeading: 'Lista de comprobación',
  checklist: [
    'Los pesos se copiaron de la fuente oficial.',
    'El ejemplo no se confundió con una regla.',
    'Cada prueba eliminatoria supera su mínimo.',
    'No se normalizaron pesos para ocultar un componente ausente.',
    'El resultado se etiqueta como simulación.',
  ],
};
