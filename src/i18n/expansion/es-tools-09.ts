import type { ToolContent } from '../tools/_types';

export const spanishStandardDeviation: ToolContent = {
  name: 'Calculadora de desviación estándar online',
  short: 'Calcula media, mediana, varianza y desviación estándar de población y muestra.',
  long: 'Pega una serie de números separados por comas, espacios o saltos de línea y obtén al instante recuento, suma, media, mediana, moda, mínimo, máximo, rango, varianza y desviación estándar. La herramienta muestra por separado los resultados de población y de muestra, redondea la presentación a cuatro decimales y trabaja en este navegador. Utiliza punto para los decimales; una coma se interpreta como separador.',
  seoTitle: 'Calculadora de desviación estándar y varianza',
  seoDescription: 'Calcula desviación estándar o típica, varianza, media y mediana para población y muestra. Resultado local, fórmulas, ejemplos y comprobación.',
  keywords: [
    'calculadora desviación estándar',
    'calculadora desviación típica',
    'calcular varianza online',
    'desviación estándar población y muestra',
    'varianza muestral',
    'media mediana moda calculadora',
    'calculadora estadística descriptiva',
  ],
  capabilities: [
    'Leer números separados por coma, espacio o salto de línea.',
    'Calcular recuento, suma, media, mediana, moda, mínimo, máximo y rango.',
    'Mostrar varianza y desviación estándar de población, con divisor n.',
    'Mostrar varianza y desviación estándar de muestra, con divisor n−1.',
    'Copiar un resumen textual de los resultados calculados.',
  ],
  contentSections: [
    {
      heading: 'Respuesta rápida: cómo calcular la desviación estándar',
      paragraphs: [
        'Introduce todos los valores de la serie en el cuadro, separados por comas, espacios o líneas. Los resultados cambian mientras escribes. Si los datos representan a todo el grupo que quieres describir, consulta «desviación estándar de población». Si son una muestra utilizada para estimar una población mayor, consulta «desviación estándar de muestra». La herramienta también entrega las dos varianzas, la media y otras medidas que ayudan a revisar el cálculo.',
        'No pegues decimales con coma española: `12,5` se separa como 12 y 5. Escribe `12.5`. El componente ignora tokens que JavaScript no reconoce como números, por lo que debes comprobar que el recuento coincide con el número de observaciones previsto. El valor visible se limita a cuatro decimales; para una decisión científica, conserva los datos originales y aplica la precisión exigida por tu método.',
      ],
    },
    {
      heading: 'Desviación estándar, desviación típica y varianza',
      paragraphs: [
        '«Desviación estándar» y «desviación típica» nombran la misma idea: una medida de cuánto se alejan los valores de su media. Primero se calcula la diferencia de cada dato respecto a la media, se eleva al cuadrado y se suman esas diferencias. La varianza es ese total dividido por n o por n−1 según el caso. La desviación estándar es la raíz cuadrada de la varianza y vuelve a expresarse en la unidad original.',
        'Una desviación pequeña indica que los valores están relativamente cerca de la media; una grande indica mayor dispersión. No significa por sí sola que los datos sean buenos, malos, normales o fiables. Dos series pueden compartir media y desviación y tener formas muy diferentes. Antes de interpretar, revisa valores atípicos, tamaño del conjunto, método de muestreo y si la media es una referencia razonable.',
      ],
      items: [
        'Varianza de población: suma de cuadrados dividida por n.',
        'Desviación estándar de población: raíz de la varianza de población.',
        'Varianza de muestra: suma de cuadrados dividida por n−1.',
        'Desviación estándar de muestra: raíz de la varianza muestral.',
      ],
    },
    {
      heading: 'Cuándo usar población y cuándo usar muestra',
      paragraphs: [
        'Usa población cuando la lista contiene todos los casos que forman exactamente el universo de interés: por ejemplo, las notas de los 24 alumnos de esa clase si solo quieres describir esa clase. Usa muestra cuando esos 24 alumnos sirven para inferir características de un conjunto mayor. El ajuste n−1 compensa parte del sesgo que aparece al estimar la variabilidad poblacional desde una muestra.',
        'La elección depende del propósito, no de que la lista sea grande o pequeña. Un censo nacional puede ser una población para una pregunta y una muestra para otra. Si un profesor, informe o protocolo indica DESVEST.M, STDEV.S o «desviación muestral», utiliza la salida de muestra. Si indica DESVEST.P, STDEV.P o «población completa», utiliza población. Documenta siempre cuál elegiste.',
      ],
    },
    {
      heading: 'Cómo se calculan media, mediana, moda y rango',
      paragraphs: [
        'La media es la suma dividida por el recuento. La mediana es el valor central después de ordenar; si hay un número par de observaciones, es la media de los dos valores centrales. El rango resta el mínimo al máximo. La moda se obtiene contando repeticiones: cuando ningún valor se repite, aparece «Sin moda»; si varios empatan con la frecuencia mayor, se muestran separados por comas.',
        'Estas medidas no son intercambiables. Una cifra extrema puede elevar mucho la media y el rango, mientras la mediana cambia menos. La moda solo describe repeticiones exactas, de modo que datos continuos con muchos decimales pueden no tener una moda útil. Comprueba las medidas juntas antes de resumir una serie en una sola frase y evita presentar demasiados decimales como si fueran precisión real.',
      ],
    },
    {
      heading: 'Entrada válida, decimales y valores ignorados',
      paragraphs: [
        'El separador admite coma, espacio, tabulación o salto de línea. Los signos negativos y el punto decimal son válidos. Cadenas como `10 kg`, símbolos de porcentaje, fechas, guiones tipográficos o celdas con texto no se convierten y se descartan. Como el descarte no muestra una lista de errores, el recuento es la primera comprobación obligatoria después de pegar datos.',
        'Limpia antes encabezados, unidades, notas al pie y separadores de miles. `1.250` se leerá como uno con veinticinco centésimas, no como mil doscientos cincuenta. Para representar 1.250 en la convención española, escribe `1250`. Si los datos provienen de una hoja de cálculo, copia solo la columna numérica y prueba cinco valores conocidos antes de procesar la serie completa.',
      ],
    },
    {
      heading: 'Privacidad, rendimiento y uso responsable',
      paragraphs: [
        'Los números se procesan en esta pestaña; FunnyTools no los recibe para realizar la estadística. La página sí puede cargar recursos generales de analítica o publicidad según la política del sitio, pero el texto del cuadro no se incorpora a esos eventos. Para datos sensibles, utiliza identificadores anónimos, un equipo fiable y una copia que no contenga nombres ni comentarios.',
        'No hay un límite duro de observaciones, aunque una serie muy grande consume memoria y tiempo del dispositivo. Esta calculadora es adecuada para comprobaciones descriptivas, deberes y conjuntos manejables; no sustituye un paquete estadístico con control de datos perdidos, ponderaciones, intervalos de confianza, análisis por grupos o trazabilidad. Repite el cálculo en la herramienta exigida por tu curso o proyecto cuando el resultado vaya a publicarse.',
      ],
    },
  ],
  instructions: [
    'Pega los valores separados por comas, espacios o saltos de línea; usa punto para decimales.',
    'Comprueba que «Recuento» coincide con el número de observaciones esperado.',
    'Decide si la lista es la población completa o una muestra de un conjunto mayor.',
    'Lee la varianza y la desviación correspondientes y conserva la unidad original.',
    'Copia el resumen y documenta datos, elección población/muestra y criterio de redondeo.',
  ],
  examples: [
    'Describir la dispersión de todas las notas de una clase concreta.',
    'Estimar la desviación muestral de una selección de mediciones de laboratorio.',
    'Comparar dos series con media parecida pero diferente variabilidad.',
    'Revisar media, mediana y rango antes de calcular una puntuación z.',
    'Comprobar manualmente una salida de DESVEST.M o DESVEST.P.',
  ],
  audience: [
    'Estudiantes que necesitan estadística descriptiva con fórmulas transparentes.',
    'Docentes que preparan ejemplos de población y muestra.',
    'Personas que revisan pequeñas series de mediciones o resultados.',
    'Usuarios que quieren calcular sin subir una hoja de datos.',
  ],
  caseStudies: [
    {
      title: 'Toda una clase como población',
      description: 'Las notas 6, 7, 7, 8 y 10 describen exactamente a los cinco integrantes del grupo analizado. Se usa la salida de población, se comprueba recuento 5 y se informa la media junto con la desviación, sin afirmar que representa a otros cursos.',
    },
    {
      title: 'Cinco mediciones como muestra',
      description: 'Un laboratorio toma cinco lecturas de un proceso que seguirá produciendo observaciones. Como las lecturas son una muestra, registra la desviación con divisor n−1. Además conserva instrumento, unidad y condiciones, porque el número aislado no explica el experimento.',
    },
    {
      title: 'Un decimal escrito con coma',
      description: 'La entrada `12,5 13,0` generaría cuatro valores: 12, 5, 13 y 0. Se corrige a `12.5 13.0` y el recuento baja a dos. Esta comprobación evita interpretar una serie que el separador convirtió de manera distinta a la intención.',
    },
  ],
  notes: [
    'Usa punto decimal; la coma funciona como separador de observaciones.',
    'Los tokens no numéricos se ignoran, por lo que debes validar el recuento.',
    'Con una sola observación, la varianza y desviación de muestra aparecen como `--`.',
    'La presentación redondea a un máximo de cuatro decimales.',
    'La desviación no demuestra normalidad, causalidad, calidad ni representatividad.',
  ],
  faq: [
    {
      q: '¿Desviación estándar y desviación típica son lo mismo?',
      a: 'Sí. Ambos términos describen la raíz cuadrada de la varianza; la preferencia de vocabulario cambia según el país, el curso o el programa.',
    },
    {
      q: '¿Debo elegir población o muestra?',
      a: 'Población si tienes todos los casos del universo que quieres describir; muestra si los datos representan solo una parte utilizada para estimar un conjunto mayor.',
    },
    {
      q: '¿Por qué la muestra usa n−1?',
      a: 'El divisor n−1 aplica la corrección de Bessel para estimar la varianza poblacional desde una muestra y reducir el sesgo del estimador.',
    },
    {
      q: '¿Puedo escribir 12,5 como decimal?',
      a: 'No en este componente. La coma separa valores, así que escribe 12.5 y comprueba el recuento.',
    },
    {
      q: '¿Qué ocurre con letras o unidades?',
      a: 'Los tokens que no son números válidos se ignoran. Elimina unidades y verifica que el recuento coincida con tu lista.',
    },
    {
      q: '¿Los datos se envían a FunnyTools?',
      a: 'No. El análisis y el resumen se calculan en la memoria de este navegador.',
    },
  ],
  labels: {
    inputLabel: 'Introduce los números',
    hint: 'Sepáralos con comas, espacios o saltos de línea; usa punto decimal',
    placeholder: 'Ejemplo: 12, 15, 20, 22, 30',
    count: 'Recuento',
    sum: 'Suma',
    mean: 'Media',
    median: 'Mediana',
    mode: 'Moda',
    min: 'Mínimo',
    max: 'Máximo',
    range: 'Rango',
    variancePopulation: 'Varianza de población',
    stdevPopulation: 'Desviación de población',
    varianceSample: 'Varianza de muestra',
    stdevSample: 'Desviación de muestra',
    copy: 'Copiar resumen',
    copied: 'Resumen copiado',
    empty: 'Introduce al menos un número válido.',
    modeNone: 'Sin moda',
  },
  privacyNote: 'La serie y sus resultados permanecen en esta pestaña. FunnyTools no recibe los valores para calcular la estadística.',
  disclaimer: 'La calculadora ofrece estadística descriptiva, no valida el muestreo, la distribución, los datos ausentes ni el método exigido por una institución. Verifica la elección entre población y muestra.',
};

export const spanishStandardDeviationReview = {
  heading: 'Cómo comprobar una desviación estándar',
  intro: 'Un valor bien calculado puede responder a la pregunta equivocada si se eligió mal población, muestra, separador o conjunto de datos.',
  panels: [
    {
      title: 'Cuenta las observaciones',
      text: 'Compara el recuento visible con la lista original y corrige decimales, unidades o texto ignorado.',
    },
    {
      title: 'Revisa la variante',
      text: 'Anota si usaste población (n) o muestra (n−1) y por qué corresponde al objetivo.',
    },
    {
      title: 'Mira la distribución',
      text: 'Compara media, mediana, mínimo, máximo y valores atípicos antes de interpretar la dispersión.',
    },
  ],
  checklistHeading: 'Lista de comprobación',
  checklist: [
    'El recuento coincide con todas las observaciones válidas.',
    'Los decimales usan punto y no hay separadores de miles ambiguos.',
    'La salida elegida corresponde a población o muestra.',
    'La unidad, el redondeo y el contexto aparecen junto al resultado.',
  ],
};

export const spanishPercentageCalculator: ToolContent = {
  name: 'Calculadora de porcentajes online',
  short: 'Calcula un porcentaje de una cantidad, qué porcentaje representa una parte y la variación entre dos valores.',
  long: 'Resuelve tres preguntas distintas: cuánto es X % de Y, qué porcentaje representa X de Y y cuánto aumenta o disminuye un valor desde A hasta B. Los resultados se actualizan mientras escribes, admiten decimales y se calculan en este navegador. El cambio porcentual usa el valor inicial como base y no está definido cuando esa base es cero.',
  seoTitle: 'Calculadora de porcentajes: cantidad y cambio',
  seoDescription: 'Calcula X % de una cantidad, qué porcentaje representa una parte y el aumento o disminución porcentual. Fórmulas, ejemplos y cálculo local.',
  keywords: [
    'calculadora de porcentajes',
    'calcular porcentaje de una cantidad',
    'qué porcentaje es un número de otro',
    'variación porcentual',
    'aumento porcentual',
    'disminución porcentual',
    'sacar porcentaje online',
  ],
  capabilities: [
    'Calcular X % de una cantidad Y mediante Y × X ÷ 100.',
    'Calcular qué porcentaje representa una parte X de un total Y.',
    'Calcular la variación porcentual desde un valor inicial A hasta uno nuevo B.',
    'Distinguir aumento, disminución o ausencia de cambio.',
    'Actualizar cada resultado inmediatamente al modificar sus dos entradas.',
  ],
  contentSections: [
    {
      heading: 'Respuesta rápida: tres formas de calcular un porcentaje',
      paragraphs: [
        'Usa el primer bloque para «¿cuánto es X % de Y?»: 25 % de 200 da 50. Usa el segundo para «¿qué porcentaje representa X de Y?»: 30 de 120 da 25 %. Usa el tercero para «¿en qué porcentaje cambió A hasta B?»: de 80 a 100 da un aumento del 25 %. Cada bloque tiene una fórmula y una base diferentes; elige la pregunta antes de introducir cifras.',
        'El resultado aparece sin botón. Puedes escribir enteros, decimales y valores superiores a 100. Si el total del segundo bloque es cero o el valor inicial del tercero es cero, la división no está definida y la herramienta lo indica. No interpreta impuestos, monedas, reglas de redondeo, puntos porcentuales ni descuentos encadenados: solo ejecuta la operación matemática visible.',
      ],
    },
    {
      heading: 'Cómo calcular X por ciento de una cantidad',
      paragraphs: [
        'Convierte el porcentaje en fracción dividiendo X entre 100 y multiplica por Y. Por ejemplo, 18 % de 250 es `0,18 × 250 = 45`. Este cálculo sirve para obtener una parte: importe de descuento, comisión, peso de una actividad, propina o cantidad asignada. El resultado no es automáticamente el precio final; para un descuento debes restar 45 a 250.',
        'Un porcentaje puede superar 100. El 125 % de 80 es 100, porque 1,25 veces 80 da 100. También puede ser negativo, aunque su significado depende del contexto y puede resultar confuso. Si trabajas con dinero, decide cuántos decimales permite la moneda y redondea al final, no en cada paso intermedio, salvo que una norma indique otra cosa.',
      ],
    },
    {
      heading: 'Cómo saber qué porcentaje representa una parte',
      paragraphs: [
        'Divide la parte X entre el total Y y multiplica por 100. Si 36 respuestas de un total de 144 eligen una opción, `36 ÷ 144 × 100 = 25 %`. La parte y el total deben referirse a la misma unidad, periodo y población. Comparar 36 personas con 144 respuestas que incluyen varias selecciones por persona produciría un porcentaje matemático, pero no respondería bien a la pregunta.',
        'El total no puede ser cero. Una parte mayor que el total produce más de 100 %, lo cual puede ser correcto en índices, objetivos o comparaciones, pero no en una partición donde las categorías deberían formar el conjunto completo. Si varias categorías deben sumar 100 %, comprueba solapamientos, casos sin respuesta y diferencias por redondeo.',
      ],
    },
    {
      heading: 'Variación porcentual, diferencia y puntos porcentuales',
      paragraphs: [
        'La variación desde A hasta B se calcula como `(B − A) ÷ A × 100`. La base es A, el valor original. Pasar de 80 a 100 aumenta 25 %; volver de 100 a 80 disminuye 20 %. Los porcentajes no son simétricos porque cambia el denominador. La herramienta muestra la magnitud positiva acompañada de «aumento» o «disminución».',
        'No confundas variación porcentual con puntos porcentuales. Si una tasa pasa de 20 % a 25 %, la diferencia es 5 puntos porcentuales, pero la variación relativa es `(25 − 20) ÷ 20 × 100 = 25 %`. Este componente calcula la variación relativa cuando introduces 20 y 25; no etiqueta automáticamente el caso como tasas ni calcula puntos porcentuales.',
      ],
    },
    {
      heading: 'Descuentos, impuestos, márgenes y cambios sucesivos',
      paragraphs: [
        'Para un descuento del 15 % sobre 60, el primer bloque devuelve 9; el precio tras el descuento es 51. Para añadir un impuesto del 21 % a 51, calcula 10,71 y suma: 61,71. Aplicar −15 % y después +15 % no devuelve al precio original, porque el segundo porcentaje usa una base más pequeña. Los cambios sucesivos deben multiplicarse como factores, no sumarse sin más.',
        'Margen y recargo tampoco son sinónimos. Un recargo del 25 % sobre un coste de 80 produce precio 100. El margen sobre ese precio es 20 %, porque la base es 100. La calculadora puede realizar ambos cocientes, pero debes definir qué número es parte y cuál es total. Para nóminas, impuestos o normativa comercial, consulta la fuente oficial y la fecha aplicable.',
      ],
      items: [
        'Importe de descuento: porcentaje de precio original.',
        'Precio final: precio original menos el descuento.',
        'Recargo: aumento respecto al coste que sirve de base.',
        'Margen: beneficio dividido por precio de venta, no por coste.',
      ],
    },
    {
      heading: 'Privacidad, precisión y comprobación',
      paragraphs: [
        'Las seis cifras introducidas permanecen en esta página y las operaciones se ejecutan en el navegador. FunnyTools no recibe esos valores para generar el resultado. Aun así, evita introducir datos personales innecesarios y utiliza una muestra ficticia si la operación forma parte de un expediente, una negociación o información financiera privada.',
        'La pantalla presenta hasta cuatro decimales significativos después del cálculo interno. El formato no conoce la precisión de tus datos ni el método legal de redondeo. Comprueba la fórmula con una estimación mental: 10 % es dividir entre diez, 1 % entre cien y 50 % la mitad. Si el resultado contradice esa referencia, revisa base, orden y unidad antes de usarlo.',
      ],
    },
  ],
  instructions: [
    'Elige el bloque que coincide con tu pregunta: cantidad, proporción o cambio.',
    'Introduce los dos valores con la misma unidad cuando la fórmula compare parte y total.',
    'Lee el resultado instantáneo y comprueba cuál fue la base o denominador.',
    'Calcula aparte el precio final, los puntos porcentuales o los cambios sucesivos si los necesitas.',
    'Aplica la regla de redondeo y la fuente oficial correspondiente a tu contexto.',
  ],
  examples: [
    'Calcular el importe de un descuento antes de restarlo al precio.',
    'Saber qué porcentaje de respuestas eligió una opción.',
    'Medir el crecimiento de visitas respecto al periodo anterior.',
    'Comparar una nota obtenida con la puntuación máxima.',
    'Separar una diferencia en puntos porcentuales de una variación relativa.',
  ],
  audience: [
    'Personas que calculan compras, descuentos o cantidades cotidianas.',
    'Estudiantes que practican proporciones y cambios porcentuales.',
    'Equipos que comparan métricas entre periodos.',
    'Docentes que necesitan ejemplos reproducibles sin registro.',
  ],
  caseStudies: [
    {
      title: 'Descuento de una compra',
      description: 'Un artículo cuesta 240 y anuncia 15 % de descuento. El primer bloque devuelve 36, que es el ahorro, no el precio final. Se resta `240 − 36` y se obtiene 204 antes de aplicar cualquier impuesto o coste adicional.',
    },
    {
      title: 'Participación en una encuesta',
      description: 'De 320 respuestas, 88 eligen una opción. El segundo bloque calcula `88 ÷ 320 × 100 = 27,5 %`. Se documenta que la base son respuestas válidas y se comprueba si una persona podía marcar más de una opción.',
    },
    {
      title: 'Tasa que pasa de 40 % a 50 %',
      description: 'La diferencia visual es 10 puntos porcentuales. El tercer bloque, al usar 40 como base, informa un aumento del 25 %. Ambos datos pueden ser correctos, pero responden a preguntas diferentes y deben etiquetarse.',
    },
  ],
  notes: [
    'El cambio porcentual siempre usa el valor original A como denominador.',
    'Con base cero, la proporción o variación porcentual no está definida.',
    'La herramienta muestra magnitud más «aumento» o «disminución», no un signo negativo.',
    'Un descuento calculado es el ahorro; para el precio final debes restarlo.',
    'No aplica automáticamente impuestos, redondeos legales ni cambios encadenados.',
  ],
  faq: [
    {
      q: '¿Cómo calcular el 20 % de una cantidad?',
      a: 'Introduce 20 en porcentaje y la cantidad en Y. La fórmula es Y × 20 ÷ 100.',
    },
    {
      q: '¿Cómo saber qué porcentaje es un número de otro?',
      a: 'Usa «Parte como porcentaje del total»: divide la parte entre el total y multiplica por 100.',
    },
    {
      q: '¿Por qué subir y bajar el mismo porcentaje no compensa?',
      a: 'Porque cada cambio utiliza una base distinta. Bajar 20 % de 100 da 80; subir 20 % de 80 solo da 96.',
    },
    {
      q: '¿Qué diferencia hay entre porcentaje y puntos porcentuales?',
      a: 'Pasar de 20 % a 25 % son 5 puntos porcentuales, pero un aumento relativo del 25 % respecto a 20.',
    },
    {
      q: '¿Se puede calcular un cambio desde cero?',
      a: 'No como porcentaje convencional, porque la fórmula dividiría entre cero. Informa la diferencia absoluta o utiliza otra referencia.',
    },
    {
      q: '¿Los números se envían a FunnyTools?',
      a: 'No. Cada operación se actualiza localmente en esta pestaña.',
    },
  ],
  labels: {
    p1Title: 'Porcentaje de una cantidad',
    p1Desc: '¿Cuánto es X % de Y?',
    p1Percent: 'Porcentaje (X %)',
    p1Value: 'Cantidad (Y)',
    p2Title: 'Parte como porcentaje del total',
    p2Desc: '¿Qué porcentaje representa X de Y?',
    p2Part: 'Parte (X)',
    p2Whole: 'Total (Y)',
    p3Title: 'Variación porcentual',
    p3Desc: '¿Cuánto cambia desde A hasta B?',
    p3From: 'Valor inicial (A)',
    p3To: 'Valor nuevo (B)',
    result: 'Resultado',
    increase: 'de aumento',
    decrease: 'de disminución',
    noChange: 'sin cambio',
    invalid: 'Introduce números válidos',
    divideZero: 'El total o valor inicial no puede ser 0',
  },
  privacyNote: 'Los valores y resultados se procesan en esta pestaña. FunnyTools no recibe las cifras para calcular el porcentaje.',
  disclaimer: 'La calculadora no determina qué base, impuesto, margen, periodo ni regla de redondeo corresponde. Verifica la definición y la normativa antes de usar el resultado.',
};

export const spanishPercentageCalculatorReview = {
  heading: 'Cómo comprobar un porcentaje',
  intro: 'La mayoría de errores no está en la multiplicación, sino en elegir la base, confundir importe con resultado final o mezclar porcentaje y puntos porcentuales.',
  panels: [
    {
      title: 'Formula la pregunta',
      text: 'Escribe si buscas una cantidad, una proporción del total o un cambio respecto al valor inicial.',
    },
    {
      title: 'Identifica la base',
      text: 'Marca el número que actúa como total o valor original; si es cero, la división no está definida.',
    },
    {
      title: 'Estima mentalmente',
      text: 'Compara con 1 %, 10 %, 50 % o 100 % para detectar un orden de magnitud imposible.',
    },
  ],
  checklistHeading: 'Lista de comprobación',
  checklist: [
    'La fórmula seleccionada responde a la pregunta escrita.',
    'Parte, total y periodos utilizan unidades comparables.',
    'El resultado se distingue de precio final o puntos porcentuales.',
    'El redondeo y la fuente normativa se aplican fuera del cálculo cuando corresponde.',
  ],
};

export const spanishBarChartMaker: ToolContent = {
  name: 'Crear gráfico de barras online',
  short: 'Introduce etiquetas y valores no negativos, genera un gráfico de columnas y descárgalo como PNG.',
  long: 'Añade filas con una categoría y un valor, escribe un título opcional y observa un gráfico vertical de barras en un lienzo de 900 × 560 píxeles. La escala se ajusta al mayor valor, la vista muestra cifras y etiquetas abreviadas y la descarga se guarda como bar-chart.png con fondo blanco. No admite negativos, varias series, colores personalizados, CSV ni edición del eje.',
  seoTitle: 'Crear gráfico de barras online y descargar PNG',
  seoDescription: 'Crea un gráfico de barras o columnas con etiquetas y valores, vista previa local y descarga PNG. Límites, ejemplos y revisión de escala.',
  keywords: [
    'crear gráfico de barras online',
    'hacer gráfica de barras',
    'generador gráfico de columnas',
    'gráfico de barras gratis',
    'crear gráfica con datos',
    'descargar gráfico PNG',
    'diagrama de barras online',
  ],
  capabilities: [
    'Añadir o eliminar filas de categoría y valor no negativo.',
    'Actualizar automáticamente un gráfico vertical en un lienzo 900 × 560.',
    'Añadir un título opcional de hasta 60 caracteres.',
    'Mostrar el valor sobre cada barra y una escala dividida en cuatro intervalos.',
    'Descargar la vista actual como `bar-chart.png` con fondo blanco.',
  ],
  contentSections: [
    {
      heading: 'Respuesta rápida: cómo hacer un gráfico de barras',
      paragraphs: [
        'Escribe un título opcional y sustituye las filas de ejemplo por una categoría y su valor. Añade tantas filas como necesites; la vista se redibuja al escribir. Solo se incluyen filas con etiqueta, número válido y valor igual o superior a cero. Cuando la comparación sea legible, pulsa «Descargar PNG» para guardar `bar-chart.png` en 900 × 560 píxeles.',
        'La herramienta dibuja columnas verticales aunque muchas búsquedas usen «gráfico de barras» o «gráfica de barras» como término general. No ordena las categorías, no importa hojas de cálculo y no conserva los datos dentro del PNG. Guarda también la tabla original y anota unidad, periodo y fuente para que otra persona pueda interpretar y reproducir la imagen.',
      ],
    },
    {
      heading: 'Cuándo conviene un gráfico de barras o columnas',
      paragraphs: [
        'Las barras son útiles para comparar magnitudes entre categorías discretas: respuestas de una encuesta, ventas por producto, alumnos por grupo o incidencias por tipo. La posición sobre una escala común facilita detectar qué categoría es mayor y cuánto difiere de otra. El orden puede seguir tiempo, magnitud o una secuencia lógica, pero debe elegirse deliberadamente.',
        'Para una serie temporal larga suele funcionar mejor una línea; para mostrar partes de un total, una barra apilada o una tabla puede ser más clara; para relacionar dos variables numéricas, utiliza dispersión. Este componente solo crea una serie de columnas simples. No afirmes tendencia, porcentaje del total o causalidad si la tabla no permite esa lectura.',
      ],
    },
    {
      heading: 'Cómo preparar etiquetas y valores',
      paragraphs: [
        'Cada fila necesita una etiqueta no vacía y un número finito no negativo. Los valores aceptan decimales con punto. Una fila vacía, con texto en el campo numérico o con valor negativo se ignora. Cero sí es válido y debe mantenerse si representa una observación real, porque quitar categorías con cero puede cambiar la historia que cuenta el gráfico.',
        'Las etiquetas largas se recortan en el lienzo después de nueve caracteres y muestran puntos suspensivos. El campo original conserva el texto, pero la imagen no incluye una leyenda expandida. Utiliza nombres breves y únicos, abreviaturas explicadas en el título o una tabla adjunta. Si dos categorías terminan con la misma abreviatura, el PNG puede resultar ambiguo.',
      ],
      items: [
        'Una fila equivale a una categoría y un valor.',
        'Los valores negativos no se dibujan.',
        'Las etiquetas largas se abrevian en la imagen.',
        'El título admite hasta 60 caracteres.',
      ],
    },
    {
      heading: 'Escala, cero y comparación visual',
      paragraphs: [
        'La escala parte de cero y toma como máximo el mayor valor válido, con cuatro divisiones intermedias. Esto evita cortar el eje y exagerar diferencias pequeñas. Si todos los valores son cero, el máximo técnico se mantiene en 1 para poder dibujar el marco; las barras quedan sin altura. El número se imprime sobre cada columna con hasta dos decimales.',
        'Una categoría extremadamente grande puede hacer que las demás parezcan casi planas. No existe escala logarítmica, eje roto, zoom ni segundo eje. En ese caso, separa grupos con justificación, utiliza una tabla o elige una visualización adecuada. Nunca retires un valor atípico solo para obtener una imagen más vistosa: explica cualquier exclusión junto a la fuente.',
      ],
    },
    {
      heading: 'Colores, cantidad de filas y accesibilidad',
      paragraphs: [
        'El componente recorre una paleta fija de ocho colores y luego la repite. No puedes elegir colores, destacar una barra ni aplicar una serie semántica. Con muchas categorías, las columnas se estrechan y las etiquetas se solapan conceptualmente aunque el archivo siga generándose. Para una lectura rápida, limita el conjunto a las categorías que respondan a una pregunta concreta.',
        'El color no debe ser el único portador de significado. La imagen incluye etiquetas y cifras, pero un PNG no ofrece por sí solo una tabla accesible ni texto alternativo contextual. Cuando publiques el gráfico, añade un título cercano, una descripción de la conclusión, la tabla de datos y un texto alternativo que explique comparación, unidad, periodo y fuente.',
      ],
    },
    {
      heading: 'Privacidad, descarga y trazabilidad',
      paragraphs: [
        'Las etiquetas, los valores y el dibujo permanecen en este navegador. FunnyTools no recibe la tabla para construir el gráfico. La página puede realizar conexiones generales de analítica o publicidad conforme a la política del sitio, pero el contenido de las filas no forma parte de esos eventos. No introduzcas nombres personales si basta con categorías anónimas.',
        'La descarga es un PNG de fondo blanco; no contiene la tabla editable, metadatos de fuente, vínculos ni descripción accesible. Antes de insertarlo en un informe, abre el archivo, comprueba el título, cada etiqueta, cifra, orden, unidad y fecha. Conserva la tabla original en un formato reutilizable para poder corregir o actualizar el gráfico más adelante.',
      ],
    },
  ],
  instructions: [
    'Sustituye las filas de ejemplo por etiquetas breves y valores no negativos.',
    'Añade o elimina filas y decide un orden lógico para la comparación.',
    'Escribe un título de hasta 60 caracteres que incluya tema, unidad o periodo.',
    'Revisa escala desde cero, cifras, etiquetas abreviadas y categorías omitidas.',
    'Descarga `bar-chart.png` y guarda también la tabla y la fuente por separado.',
  ],
  examples: [
    'Comparar ventas mensuales de cuatro productos en la misma unidad.',
    'Mostrar votos válidos por opción de una encuesta.',
    'Representar alumnos por grupo o nivel educativo.',
    'Comparar incidencias por categoría durante un periodo definido.',
    'Crear una imagen sencilla para una diapositiva o ficha didáctica.',
  ],
  audience: [
    'Estudiantes que necesitan una gráfica sencilla para un informe.',
    'Docentes que preparan material visual con datos pequeños.',
    'Equipos que comparan conteos entre categorías.',
    'Personas que quieren exportar un PNG sin subir la tabla.',
  ],
  caseStudies: [
    {
      title: 'Encuesta con cuatro respuestas',
      description: 'Se introducen cuatro opciones y sus votos válidos, se ordenan de mayor a menor y el título incluye el tamaño de la muestra. El informe adjunta la tabla y aclara si había respuestas múltiples o casos sin contestar.',
    },
    {
      title: 'Etiqueta demasiado larga',
      description: '«Atención al cliente» se recorta en el lienzo. Se sustituye por «Atención» y la descripción del informe conserva el nombre completo. Así la imagen sigue legible sin perder la definición original.',
    },
    {
      title: 'Una categoría domina la escala',
      description: 'Los valores 8, 11, 9 y 420 hacen casi invisibles las tres primeras barras. En lugar de borrar 420, se presenta la tabla y se explica el valor atípico o se elige una visualización que permita comparar honestamente.',
    },
  ],
  notes: [
    'El resultado es un gráfico vertical de una sola serie, no barras horizontales ni apiladas.',
    'Solo se dibujan valores finitos iguales o superiores a cero.',
    'Las etiquetas de más de diez caracteres se abrevian en el PNG.',
    'La paleta es fija, se repite después de ocho barras y no puede editarse.',
    'El PNG no incorpora tabla, fuente, unidad, texto alternativo ni datos editables.',
  ],
  faq: [
    {
      q: '¿Puedo introducir valores negativos?',
      a: 'No. Las filas negativas se ignoran; utiliza otra herramienta para datos que crucen el cero.',
    },
    {
      q: '¿Cuántas barras puedo añadir?',
      a: 'No hay un límite fijo, pero cada categoría reduce el ancho disponible. Un conjunto corto suele ser más legible.',
    },
    {
      q: '¿Puedo cambiar los colores o el eje?',
      a: 'No. Esta versión usa una paleta, escala y eje automáticos.',
    },
    {
      q: '¿Por qué se corta una etiqueta?',
      a: 'El lienzo abrevia etiquetas largas para que quepan. Usa un nombre breve y conserva la definición completa junto al gráfico.',
    },
    {
      q: '¿Qué tamaño tiene el PNG?',
      a: 'El archivo se genera con un lienzo de 900 × 560 píxeles y fondo blanco.',
    },
    {
      q: '¿Los datos se suben a FunnyTools?',
      a: 'No. Las filas, el dibujo y la preparación del PNG se procesan en este navegador.',
    },
  ],
  labels: {
    chartType: 'bar',
    titleLabel: 'Título del gráfico (opcional)',
    titlePlaceholder: 'Ejemplo: Ventas por producto, 2026',
    labelHeader: 'Categoría',
    valueHeader: 'Valor',
    addRow: 'Añadir fila',
    remove: 'Eliminar',
    exportPng: 'Descargar PNG',
    canvasLabel: 'Vista previa del gráfico de barras',
    emptyHint: 'Introduce al menos una fila válida con categoría y valor no negativo.',
    seedLabels: 'Enero,Febrero,Marzo,Abril',
    seedValues: '120,150,90,180',
  },
  privacyNote: 'La tabla y el lienzo permanecen en esta pestaña. FunnyTools no recibe las categorías ni los valores para crear la imagen.',
  disclaimer: 'El gráfico no valida la fuente, unidad, muestra, orden ni interpretación. No admite negativos, series múltiples, importación CSV, colores personalizados ni datos editables dentro del PNG.',
};

export const spanishBarChartMakerReview = {
  heading: 'Cómo comprobar un gráfico de barras',
  intro: 'Una imagen puede ser técnicamente correcta y aun así inducir a error por categorías omitidas, etiquetas recortadas, unidad ausente o una escala poco útil.',
  panels: [
    {
      title: 'Compara con la tabla',
      text: 'Revisa cada categoría, valor y cero; confirma que ninguna fila válida desapareció.',
    },
    {
      title: 'Lee el eje y el orden',
      text: 'Comprueba que la escala parte de cero y que el orden responde a tiempo, magnitud o lógica declarada.',
    },
    {
      title: 'Añade contexto',
      text: 'Publica unidad, periodo, fuente, tabla y texto alternativo junto al PNG.',
    },
  ],
  checklistHeading: 'Lista de comprobación',
  checklist: [
    'Todas las categorías válidas aparecen una vez y con el valor correcto.',
    'El título, la unidad y el periodo permiten entender la comparación.',
    'Las etiquetas abreviadas siguen siendo inequívocas.',
    'La tabla original y la fuente se conservan fuera del PNG.',
  ],
};
