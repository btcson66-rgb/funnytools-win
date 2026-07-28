import type { ToolContent } from '../tools/_types';

export const spanishDateDifference: ToolContent = {
  name: 'Calcular diferencia entre fechas',
  short: 'Calcula días, semanas, meses aproximados, años-meses-días, laborables y fines de semana entre dos fechas.',
  long: 'Esta calculadora de diferencia entre fechas trata cada entrada como una fecha de calendario, sin hora ni zona horaria. Ordena automáticamente los extremos, permite incluir o excluir la fecha final y muestra seis lecturas distintas del mismo intervalo. Los días totales se obtienen con fechas normalizadas en UTC para evitar saltos por horario de verano; el desglose de años, meses y días conserva el día inicial y, si un mes no lo contiene, usa su último día. No descuenta festivos ni determina plazos legales.',
  seoTitle: 'Diferencia entre fechas | Calculadora de días',
  seoDescription: 'Calcula la diferencia entre dos fechas en días, semanas, meses, años-meses-días, laborables y fines de semana. Incluye la fecha final si lo necesitas.',
  keywords: [
    'diferencia entre fechas',
    'calculadora de días entre fechas',
    'calcular días entre dos fechas',
    'días entre fechas',
    'incluir la fecha final',
    'diferencia en años meses y días',
    'contador de días',
    'calcular semanas entre fechas',
  ],
  capabilities: [
    'Obtener el número total de fechas contadas en un intervalo.',
    'Expresar el total como semanas completas y días restantes.',
    'Consultar meses aproximados mediante una duración media de 30,4375 días.',
    'Desglosar el intervalo en años, meses y días de calendario.',
    'Separar lunes a viernes de sábados y domingos, sin descontar festivos.',
  ],
  contentSections: [
    {
      heading: 'Respuesta rápida: cómo calcular la diferencia entre dos fechas',
      paragraphs: [
        'Selecciona una fecha inicial y otra final. Deja desmarcada «Incluir la fecha final» si quieres medir el tiempo transcurrido hasta el comienzo del último día. Márcala cuando ambos extremos deban formar parte del recuento. Por ejemplo, del 1 al 1 de junio hay 0 días con el criterio exclusivo y 1 día con el criterio inclusivo. El resultado se actualiza al pulsar «Calcular» y puede copiarse como texto.',
        'La página ofrece resultados complementarios, no seis formas intercambiables de decir lo mismo. «Días totales» responde a un recuento continuo de fechas; «semanas» divide ese total entre siete; «meses aproximados» usa una media; «desglose» recorre el calendario; y las dos últimas cifras clasifican cada día como lunes-viernes o fin de semana. Elige la lectura que corresponda a tu pregunta y conserva el criterio de inclusión al comunicarla.',
      ],
    },
    {
      heading: 'Qué significa incluir la fecha final',
      paragraphs: [
        'Un intervalo exclusivo cuenta desde la fecha inicial hasta justo antes de la final. Es habitual al medir noches, tiempo transcurrido o duración entre dos marcas: del lunes al martes equivale a un día. Un intervalo inclusivo cuenta también el martes y devuelve dos fechas contadas. Ninguna convención es universal. Reservas, vacaciones, prestaciones, contratos y formularios pueden definir los extremos de manera distinta.',
        'Antes de calcular, formula la pregunta con palabras. «¿Cuántos días transcurren hasta el vencimiento?» suele apuntar a una diferencia exclusiva; «¿cuántos días abarca la campaña, contando apertura y cierre?» suele requerir inclusión. Si el resultado se comparte, añade «fecha final incluida» o «fecha final excluida». Un número sin esa nota puede parecer incorrecto aunque la aritmética sea coherente con otra convención.',
      ],
    },
    {
      heading: 'Días totales, semanas y meses aproximados',
      paragraphs: [
        'Los días totales son la base de los demás recuentos. Las semanas completas se calculan con la parte entera de total dividido entre 7 y el resto se presenta como días. Un intervalo de 60 días aparece como 8 semanas y 4 días. Esta lectura sirve para calendarios semanales, pero no cuenta semanas ISO ni agrupa de lunes a domingo: solo expresa una duración en bloques consecutivos de siete días.',
        'Los meses aproximados dividen los días entre 30,4375, que corresponde a 365,25 dividido entre 12. Es una referencia media, no una cantidad de meses de calendario. Febrero, abril y julio no duran lo mismo, por lo que 30 días pueden ser un mes exacto en una pareja de fechas y menos de un mes en otra. Para aniversarios, vencimientos mensuales o edad, utiliza el desglose de calendario y revisa la regla de fin de mes.',
      ],
    },
    {
      heading: 'Cómo se obtiene el desglose de años, meses y días',
      paragraphs: [
        'El desglose busca primero el mayor número de meses completos que puede añadirse a la fecha inicial sin superar el extremo final. Después convierte esos meses en años y meses y deja el resto como días. El cálculo siempre se ancla en la fecha inicial, en vez de sumar un mes repetidamente desde un día ya recortado. Esto evita que una primera corrección de fin de mes cambie el punto de referencia de los pasos siguientes.',
        'Cuando el mes de destino no contiene el día inicial, se utiliza su último día. Así, un mes desde el 31 de enero termina el 28 o 29 de febrero, y dos meses desde el 31 de enero pueden llegar al 31 de marzo. Es una convención explícita de esta calculadora. Un contrato, una suscripción o una norma administrativa puede utilizar una regla diferente, como trasladar el vencimiento al primer día del mes siguiente.',
      ],
    },
    {
      heading: 'Fechas de calendario, UTC y horario de verano',
      paragraphs: [
        'Un campo de fecha entrega un valor normalizado con forma AAAA-MM-DD, aunque el navegador muestre el orden habitual de tu idioma. La herramienta valida que la fecha exista y la representa a medianoche UTC para hacer aritmética de días. No está afirmando que el evento suceda en UTC; utiliza una referencia uniforme porque la entrada solo contiene año, mes y día, sin hora, ciudad ni identificador de zona.',
        'Este criterio evita que el cambio estacional de reloj convierta un par de fechas consecutivas en 23 o 25 horas y altere una división por 24. Si necesitas calcular horas reales entre dos instantes, incluidos cambios de zona, vuelos o transiciones de horario de verano, esta página no tiene datos suficientes. Debes introducir fecha, hora y zona en una herramienta diseñada para instantes, no para fechas civiles.',
      ],
      link: {
        prefix: 'MDN explica el valor normalizado del control en ',
        label: 'input de tipo date',
        href: 'https://developer.mozilla.org/es/docs/Web/HTML/Reference/Elements/input/date',
        suffix: '.',
      },
    },
    {
      heading: 'Lunes a viernes frente a fines de semana',
      paragraphs: [
        'La cifra «Laborables» de esta página cuenta de lunes a viernes y «Fines de semana» cuenta sábados y domingos. Ambas suman exactamente los días totales. La palabra laborable se usa aquí como etiqueta práctica del patrón semanal, no como una conclusión jurídica. No se consultan festivos nacionales, autonómicos, provinciales, municipales, empresariales, religiosos ni días de descanso trasladados.',
        'Una organización puede trabajar los sábados, descansar otro día o manejar turnos que cruzan medianoche. Para excluir una lista concreta de festivos, usa la calculadora de días laborables de FunnyTools y pega las fechas oficiales de tu contexto. Para nóminas, tribunales, banca, licencias o trámites, confirma además si el organismo habla de días hábiles, naturales, corridos o laborables y qué calendario territorial aplica.',
      ],
    },
    {
      heading: 'Fechas invertidas y dirección del intervalo',
      paragraphs: [
        'Si introduces primero la fecha posterior, la calculadora intercambia los extremos y devuelve la distancia absoluta. Del 10 al 3 produce el mismo total que del 3 al 10. Esta decisión facilita comparar dos fechas sin mostrar resultados negativos, pero elimina la dirección: la salida no indica si la segunda fecha estaba en el pasado o en el futuro respecto de la primera.',
        'Para planificar un vencimiento suele ser mejor colocar conscientemente la fecha de referencia al principio y la fecha objetivo al final. Si necesitas saber «hace cuántos días» o «dentro de cuántos días» y conservar el signo, anota la dirección fuera de la herramienta. El texto copiado mantiene los valores originales de ambos campos, por lo que puedes revisar el orden, pero la cifra representa siempre una magnitud no negativa.',
      ],
    },
    {
      heading: 'Ejemplos de viaje, proyectos y aniversarios',
      paragraphs: [
        'En un viaje, la diferencia exclusiva entre llegada y salida suele aproximar el número de noches, mientras que el número de días de presencia puede requerir ambos extremos. En un proyecto, un plazo del 4 al 18 puede medirse como 14 días transcurridos o 15 fechas del calendario. La herramienta no sabe qué regla eligió una aerolínea, un hotel, un cliente o una convocatoria; solo aplica el interruptor que selecciones.',
        'Para aniversarios y edades, el desglose de calendario suele ser más legible que una media de meses. Para una serie de datos, los días totales son más sencillos de comparar. Para capacidad de trabajo, separar lunes-viernes y fines de semana ayuda como primer filtro, pero todavía faltan festivos, ausencias y jornada real. Una buena práctica es guardar junto al resultado el propósito, la inclusión del último día y la fuente del calendario.',
      ],
    },
    {
      heading: 'Privacidad, copia y límites de la calculadora',
      paragraphs: [
        'Las dos fechas y los resultados se procesan en esta pestaña. FunnyTools no necesita una cuenta ni guarda el intervalo en un servidor. Al usar «Copiar resultado», el resumen pasa al portapapeles del dispositivo, que puede sincronizarse según el sistema operativo o ser accesible a otras aplicaciones. Evita combinar fechas con nombres, expedientes u otra información personal si solo necesitas la duración.',
        'No calcula horas, zonas horarias, semanas ISO, trimestres, días lectivos, festivos, turnos, intereses, penalizaciones ni fechas de vencimiento futuras a partir de una duración. Tampoco interpreta cláusulas. Es una calculadora transparente de fechas civiles. Si el número afecta derechos, dinero, salud, viaje o un plazo formal, reproduce el criterio con la fuente responsable y conserva evidencia de la regla aplicable.',
      ],
    },
  ],
  instructions: [
    'Elige la fecha inicial y la fecha final que quieras comparar.',
    'Decide si la fecha final debe contarse como parte del intervalo.',
    'Pulsa «Calcular» y elige entre días totales, semanas, meses aproximados o desglose de calendario.',
    'Comprueba si el recuento lunes-viernes necesita además descontar festivos.',
    'Copia el resumen e indica siempre si el último día estaba incluido.',
  ],
  examples: [
    'Comparar la apertura y el cierre de una campaña con ambos días incluidos.',
    'Calcular noches entre la llegada y la salida usando diferencia exclusiva.',
    'Expresar el tiempo entre aniversarios en años, meses y días.',
    'Separar días de lunes a viernes y fines de semana antes de añadir festivos.',
  ],
  audience: [
    'Personas que planifican viajes, eventos, estudios o proyectos.',
    'Equipos que necesitan documentar un intervalo con un criterio reproducible.',
    'Quienes comparan aniversarios o periodos largos de calendario.',
    'Usuarios que quieren un recuento local sin registrar fechas en una cuenta.',
  ],
  caseStudies: [
    {
      title: 'Campaña con fecha de cierre incluida',
      description: 'Una campaña funciona del 1 al 7 de septiembre durante los siete días. La responsable activa la inclusión final, copia el resultado y anota esa convención en el informe.',
    },
    {
      title: 'Reserva medida por noches',
      description: 'Una estancia entra el 4 y sale el 9. El usuario deja el final excluido y obtiene cinco días de diferencia, pero confirma con el alojamiento cómo factura las noches.',
    },
    {
      title: 'Intervalo que comienza el día 31',
      description: 'Para comparar 31 de enero y 31 de marzo, el desglose anclado devuelve dos meses completos. La persona revisa si su contrato usa la misma regla de fin de mes.',
    },
  ],
  notes: [
    'La fecha final se excluye de forma predeterminada.',
    'Los meses aproximados usan 30,4375 días; no son meses civiles exactos.',
    'El desglose recorta al último día cuando el mes de destino no contiene el día inicial.',
    'Lunes a viernes no equivale necesariamente a días hábiles oficiales.',
    'Las fechas invertidas producen una distancia absoluta, sin signo.',
  ],
  faq: [
    {
      q: '¿Cómo calcular la diferencia entre dos fechas?',
      a: 'Selecciona ambos días, decide si el final se incluye y pulsa «Calcular». La salida muestra días, semanas, meses aproximados, desglose de calendario y distribución semanal.',
    },
    {
      q: '¿Por qué del mismo día al mismo día puede dar cero?',
      a: 'Con el final excluido no ha transcurrido ningún día. Activa «Incluir la fecha final» si quieres contar esa fecha como una unidad.',
    },
    {
      q: '¿Los meses del resultado son exactos?',
      a: 'La cifra marcada como aproximada usa 30,4375 días por mes. El desglose de años, meses y días sí sigue meses de calendario con una regla explícita de fin de mes.',
    },
    {
      q: '¿Qué ocurre del 31 de enero a un mes más corto?',
      a: 'El desglose usa el último día disponible del mes de destino. Esta convención puede diferir de una norma contractual u oficial.',
    },
    {
      q: '¿El horario de verano cambia el número de días?',
      a: 'No en esta herramienta. Las entradas se tratan como fechas civiles normalizadas, no como horas locales consecutivas.',
    },
    {
      q: '¿Descuenta los festivos?',
      a: 'No. Solo separa lunes a viernes de sábado y domingo. Usa la calculadora de días laborables para añadir una lista de festivos.',
    },
    {
      q: '¿Puedo poner la fecha más reciente primero?',
      a: 'Sí. Los extremos se ordenan automáticamente y se muestra la distancia absoluta entre ellos.',
    },
    {
      q: '¿Sirve para un plazo legal?',
      a: 'No como decisión final. Debes confirmar inclusión, festivos, territorio, hora límite y reglas de traslado con la fuente oficial o profesional responsable.',
    },
  ],
  labels: {
    startDate: 'Fecha inicial',
    endDate: 'Fecha final',
    calculate: 'Calcular',
    includeEnd: 'Incluir la fecha final',
    result: 'Resultado',
    totalDays: 'Días totales',
    weeks: 'Semanas',
    weekSingular: 'semana',
    weekPlural: 'semanas',
    days: 'días',
    daySingular: 'día',
    dayPlural: 'días',
    months: 'Meses',
    monthSingular: 'mes',
    monthPlural: 'meses',
    years: 'años',
    yearSingular: 'año',
    yearPlural: 'años',
    weekdays: 'Lunes a viernes',
    weekends: 'Fines de semana',
    copyResult: 'Copiar resultado',
    copied: 'Resultado copiado',
    invalidDate: 'Selecciona fechas inicial y final válidas.',
    approximate: 'Aprox.',
    breakdown: 'Años, meses y días',
  },
  privacyNote: 'Las fechas y los resultados se calculan en esta pestaña. FunnyTools no los guarda ni los envía a un servidor. Copiar utiliza el portapapeles del dispositivo.',
  disclaimer: 'No interpreta plazos legales ni descuenta festivos. Confirma inclusión de extremos, calendario territorial, hora límite y regla de fin de mes con la fuente responsable.',
};

export const spanishDateDifferenceReview = {
  heading: 'Cómo revisar una diferencia entre fechas',
  intro: 'Un resultado verificable deja claros los extremos, la inclusión y el tipo de unidad utilizada.',
  panels: [
    { title: 'Extremos', text: 'Comprueba que las dos fechas son las que define la pregunta o el documento.' },
    { title: 'Inclusión', text: 'Indica expresamente si la fecha final forma parte del recuento.' },
    { title: 'Unidad', text: 'No confundas meses medios, meses de calendario y días hábiles oficiales.' },
  ],
  checklistHeading: 'Lista de comprobación',
  checklist: [
    'La fecha inicial y la final se han introducido sin invertir el significado.',
    'La convención inclusiva o exclusiva está documentada.',
    'La regla de fin de mes coincide con el uso previsto.',
    'Los festivos o normas oficiales se verifican fuera de esta página.',
  ],
};

export const spanishAgeCalculator: ToolContent = {
  name: 'Calculadora de edad',
  short: 'Calcula la edad exacta en años, meses y días para una fecha de referencia, además de días vividos y próximo cumpleaños.',
  long: 'Esta calculadora de edad compara una fecha de nacimiento con hoy o con otra fecha elegida. Devuelve años, meses y días de calendario, días vividos, horas aproximadas, días hasta el próximo cumpleaños, día de la semana de nacimiento y una estimación lúdica de latidos. Trabaja con fechas civiles normalizadas para evitar errores de horario de verano. En cumpleaños del 29 de febrero usa el 28 de febrero en años no bisiestos como convención interna, que no sustituye las reglas legales de cada país.',
  seoTitle: 'Calculadora de edad exacta | Años, meses y días',
  seoDescription: 'Calcula tu edad exacta en años, meses y días, días vividos, próximo cumpleaños y día de nacimiento para hoy o una fecha elegida.',
  keywords: [
    'calculadora de edad',
    'calcular edad exacta',
    'edad en años meses y días',
    'cuántos años tengo',
    'días vividos',
    'próximo cumpleaños',
    'edad en una fecha',
    'cumpleaños 29 de febrero',
  ],
  capabilities: [
    'Calcular edad de calendario en años, meses y días.',
    'Usar hoy o una fecha de referencia personalizada.',
    'Contar días civiles transcurridos desde el nacimiento.',
    'Mostrar cuántos días faltan para el próximo cumpleaños.',
    'Identificar el día de la semana y generar dos estimaciones recreativas.',
  ],
  contentSections: [
    {
      heading: 'Respuesta rápida: cómo calcular la edad exacta',
      paragraphs: [
        'Selecciona la fecha de nacimiento y conserva hoy como «Calcular a fecha de» o elige otra fecha. Pulsa «Calcular». La primera tarjeta muestra la edad exacta en años, meses y días según el calendario. Las demás ofrecen días vividos, horas aproximadas, distancia al próximo cumpleaños, día de la semana del nacimiento y una cifra recreativa de latidos. Una fecha de referencia anterior al nacimiento se rechaza.',
        'Para responder «¿qué edad tenía ese día?», cambia únicamente la fecha de referencia. Para un formulario ordinario suele bastar el número de años cumplidos, que es el primer componente del desglose. No copies los meses y días como si fueran una fracción decimal del año. Un resultado de 20 años, 11 meses y 20 días significa una posición en el calendario, no 20,1120 años.',
      ],
    },
    {
      heading: 'Cómo se calculan años, meses y días',
      paragraphs: [
        'La herramienta busca el mayor número de meses completos desde el nacimiento que no supera la fecha de referencia. Ese total se divide en años completos y meses restantes; después se cuentan los días sobrantes. Todos los meses se añaden desde la fecha original, no desde una fecha intermedia ya recortada. De esta forma, la referencia del cumpleaños se conserva durante todo el cálculo.',
        'Los meses tienen 28, 29, 30 o 31 días. Cuando el día de nacimiento no existe en el mes de destino, se usa el último día de ese mes para este cálculo. Por eso una persona nacida el día 31 puede completar un mes el último día de un mes más corto. Esta es una convención computacional clara, pero un servicio, una póliza o una legislación puede definir el cumplimiento de edad de otra manera.',
      ],
    },
    {
      heading: 'Qué ocurre con un nacimiento el 29 de febrero',
      paragraphs: [
        'En los años bisiestos, el cumpleaños se sitúa el 29 de febrero. En un año no bisiesto, esta calculadora lo coloca el 28 de febrero tanto para el desglose como para la cuenta atrás. Así, del 29 de febrero de 2000 al 28 de febrero de 2001 muestra un año completo. La regla evita resultados como cero años y doce meses y se mantiene igual en toda la interfaz.',
        'Esa convención no decide la edad legal. Algunas jurisdicciones, instituciones o contratos pueden considerar el 28 de febrero, el 1 de marzo u otra regla para una persona nacida el 29. Si la fecha afecta mayoría de edad, licencia, seguro, jubilación, admisión, sorteo o plazo, consulta el texto oficial aplicable. La calculadora documenta su criterio para que puedas detectar una diferencia, no para resolverla.',
      ],
    },
    {
      heading: 'Días vividos y horas aproximadas',
      paragraphs: [
        '«Días vividos» mide la diferencia entre la fecha de nacimiento y la fecha de referencia, sin incluir el día final como un día completo adicional. Ambas entradas se representan como fechas civiles en una escala UTC uniforme. Esto evita que un cambio de horario estacional reste o sume una hora y provoque un error de un día al dividir el intervalo.',
        'Las horas se presentan como aproximación y equivalen a días vividos multiplicados por 24. La herramienta no conoce la hora exacta del parto, la zona de nacimiento, mudanzas, vuelos ni segundos intercalares. Por tanto, la cifra no es el número real de horas transcurridas desde un instante de nacimiento. Sirve como conversión recreativa de días completos, y debe leerse junto a la palabra «Aprox.».',
      ],
      link: {
        prefix: 'La diferencia entre componentes locales y UTC de JavaScript se resume en ',
        label: 'el objeto Date de MDN',
        href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Date',
        suffix: '.',
      },
    },
    {
      heading: 'Días hasta el próximo cumpleaños',
      paragraphs: [
        'La cuenta atrás busca el cumpleaños correspondiente al año de la fecha de referencia. Si ya pasó, utiliza el año siguiente. En el propio cumpleaños devuelve 0 días, porque no falta ningún día para llegar a esa fecha. Para nacimientos el 29 de febrero, aplica el 28 en un año no bisiesto. El resultado se basa en días civiles, no en horas restantes hasta una fiesta.',
        'Una celebración puede fijarse en otro fin de semana, zona horaria o momento del día. La calculadora tampoco crea una alarma, recordatorio o evento de calendario. Si necesitas avisos, copia la fecha de nacimiento en una aplicación de calendario con la privacidad adecuada y revisa cómo repite los eventos del 29 de febrero. No incluyas datos de otras personas sin una razón legítima.',
      ],
    },
    {
      heading: 'Día de la semana del nacimiento',
      paragraphs: [
        'La tarjeta «Naciste un» formatea la fecha con el idioma de la página y una zona UTC fija. Como la entrada solo contiene una fecha, esta representación evita que una conversión local muestre el día anterior o posterior. El resultado indica lunes, martes, miércoles, jueves, viernes, sábado o domingo del calendario gregoriano para la fecha introducida.',
        'No verifica que la fecha haya sido transcrita correctamente ni contempla calendarios históricos distintos del gregoriano representado por JavaScript. Para genealogía, fechas anteriores a reformas calendáricas o documentos que usen otro sistema, consulta una fuente especializada. El nombre del día es un dato derivado de la entrada; no tiene significado astrológico, médico ni predictivo.',
      ],
    },
    {
      heading: 'La estimación de latidos no es información médica',
      paragraphs: [
        'La cifra lúdica multiplica los días por 1.440 minutos y por una frecuencia fija de 70 latidos por minuto. No utiliza un sensor, una historia clínica ni información individual. La frecuencia cardiaca cambia con edad, sueño, actividad, medicación, enfermedad y muchas otras condiciones. Incluso una media personal conocida no permitiría reconstruir todos los latidos de una vida con esta fórmula simple.',
        'No uses ese número para evaluar salud, ejercicio, embarazo, arritmia, consumo energético o riesgo. Si tienes síntomas o una pregunta clínica, busca atención profesional adecuada. La etiqueta «estimación lúdica» forma parte del resultado porque su único propósito es dar escala a un periodo largo. FunnyTools no recibe datos de un reloj, pulsera, monitor ni dispositivo médico.',
      ],
    },
    {
      heading: 'Edad legal, escolar, deportiva y administrativa',
      paragraphs: [
        'La edad de calendario no responde por sí sola a una regla de elegibilidad. Una escuela puede usar una fecha de corte; una competición, el año de nacimiento; una administración, la edad en el día de solicitud; y un contrato, la edad al inicio o al final de la cobertura. También pueden existir reglas especiales para meses completos, tutela, documentos o personas nacidas el 29 de febrero.',
        'Introduce la fecha exigida solo después de leer la norma y conserva la fuente. La herramienta no calcula edad gestacional, edad corregida para prematuridad, edad coreana, edad académica, edad biológica ni categorías deportivas. Tampoco valida documentos. Si una decisión puede negar un derecho, un servicio o un pago, requiere revisión humana y el procedimiento oficial de la entidad responsable.',
      ],
    },
    {
      heading: 'Privacidad y límites de la calculadora de edad',
      paragraphs: [
        'La fecha de nacimiento y la fecha de referencia se procesan en esta pestaña. FunnyTools no crea una cuenta ni guarda la consulta. El botón de copia mueve un resumen al portapapeles del dispositivo, que puede sincronizarse con otros equipos. Una fecha de nacimiento completa es un dato personal útil para suplantación o preguntas de seguridad; evita pegarla en chats o documentos públicos sin necesidad.',
        'La sesión no se conserva al cerrar o recargar. No hay perfil, historial, recordatorio, horóscopo, signo zodiacal, archivo descargable ni consulta a registros públicos. Los resultados dependen de las fechas introducidas y de las convenciones descritas. Verifica cualquier uso legal, escolar, sanitario, laboral, financiero o asegurador con la institución correspondiente.',
      ],
    },
  ],
  instructions: [
    'Selecciona una fecha de nacimiento válida.',
    'Usa hoy o elige la fecha exacta en la que quieres conocer la edad.',
    'Pulsa «Calcular» y lee primero el desglose de años, meses y días.',
    'Distingue los días exactos de calendario de las horas y latidos aproximados.',
    'Comprueba las reglas institucionales antes de usar la cifra para elegibilidad.',
  ],
  examples: [
    'Calcular la edad en la fecha de una fotografía o un acontecimiento.',
    'Comprobar cuántos días faltan para un cumpleaños sin crear un recordatorio.',
    'Saber el día de la semana en que ocurrió un nacimiento.',
    'Revisar un caso del 29 de febrero con la convención documentada.',
  ],
  audience: [
    'Personas que quieren consultar una edad para hoy o una fecha pasada.',
    'Familias que preparan un cumpleaños o un recuerdo personal.',
    'Equipos que necesitan una primera comprobación antes de aplicar una norma.',
    'Usuarios que prefieren calcular localmente sin crear un perfil.',
  ],
  caseStudies: [
    {
      title: 'Edad en una fecha histórica',
      description: 'Una persona introduce su nacimiento y la fecha de una graduación. Usa el desglose para escribir un recuerdo, sin confundirlo con la edad actual.',
    },
    {
      title: 'Cumpleaños del 29 de febrero',
      description: 'El cálculo usa el 28 de febrero en un año no bisiesto. La familia acepta esa convención para la cuenta atrás, pero consulta la norma para un trámite.',
    },
    {
      title: 'Formulario con fecha de corte',
      description: 'La solicitante cambia la referencia por la fecha indicada en las bases, anota los años cumplidos y conserva el documento oficial para verificar elegibilidad.',
    },
  ],
  notes: [
    'La edad se calcula respecto de la fecha elegida, no necesariamente hoy.',
    'El 29 de febrero se ajusta al 28 en años no bisiestos dentro de esta página.',
    'Horas y latidos son aproximaciones derivadas de días completos.',
    'El día de la semana no aporta una interpretación astrológica o médica.',
    'La edad de calendario no sustituye una regla legal o institucional.',
  ],
  faq: [
    {
      q: '¿Cómo calcular mi edad exacta?',
      a: 'Introduce tu fecha de nacimiento y la fecha de referencia. La primera salida muestra los años, meses y días completos transcurridos según el calendario.',
    },
    {
      q: '¿Puedo saber qué edad tenía en una fecha pasada?',
      a: 'Sí. Cambia «Calcular a fecha de» por ese día, siempre que no sea anterior al nacimiento.',
    },
    {
      q: '¿Cómo trata un cumpleaños del 29 de febrero?',
      a: 'En años no bisiestos, esta calculadora usa el 28 de febrero. Una norma legal o institucional puede emplear otra convención.',
    },
    {
      q: '¿Los días vividos incluyen el día de referencia?',
      a: 'Representan días completos transcurridos entre ambas fechas. En el propio día de nacimiento el total es cero.',
    },
    {
      q: '¿Las horas vividas son exactas?',
      a: 'No. Son días completos multiplicados por 24 y no incluyen hora ni zona del nacimiento.',
    },
    {
      q: '¿Por qué el próximo cumpleaños muestra cero?',
      a: 'Porque la fecha de referencia coincide con el cumpleaños definido por la convención de esta página.',
    },
    {
      q: '¿La estimación de latidos sirve para salud?',
      a: 'No. Usa una frecuencia fija de 70 por minuto y es solo recreativa, sin medición individual.',
    },
    {
      q: '¿Puedo usar el resultado para una admisión o requisito legal?',
      a: 'Solo como comprobación auxiliar. Aplica la fecha de corte y las reglas de la institución, especialmente para nacimientos el 29 de febrero.',
    },
  ],
  labels: {
    birthday: 'Fecha de nacimiento',
    asOf: 'Calcular a fecha de',
    calculate: 'Calcular',
    useToday: 'Usar hoy',
    result: 'Edad exacta',
    years: 'años',
    yearSingular: 'año',
    months: 'meses',
    monthSingular: 'mes',
    days: 'días',
    daySingular: 'día',
    hours: 'horas',
    daysLived: 'Días vividos',
    nextBirthday: 'Hasta el próximo cumpleaños',
    bornWeekday: 'Naciste un',
    heartbeats: 'Estimación lúdica de latidos',
    copyResult: 'Copiar resultado',
    copied: 'Resultado copiado',
    birthdayError: 'Selecciona primero una fecha de nacimiento válida.',
    futureError: 'El nacimiento no puede ser posterior a la fecha de referencia.',
    approximate: 'Aprox.',
  },
  privacyNote: 'Las fechas y resultados permanecen en esta pestaña. FunnyTools no guarda la fecha de nacimiento. El portapapeles queda bajo el control de tu dispositivo.',
  disclaimer: 'Horas y latidos son estimaciones recreativas. La convención del 29 de febrero y la edad calculada no sustituyen reglas legales, escolares, médicas, deportivas o administrativas.',
};

export const spanishAgeCalculatorReview = {
  heading: 'Cómo revisar un cálculo de edad',
  intro: 'La edad solo es útil cuando la fecha de referencia y la convención aplicable son correctas.',
  panels: [
    { title: 'Referencia', text: 'Usa el día exacto exigido por la pregunta, el formulario o la norma.' },
    { title: 'Calendario', text: 'Revisa el ajuste de fin de mes y el caso especial del 29 de febrero.' },
    { title: 'Finalidad', text: 'Separa una edad informativa de una decisión legal, escolar o médica.' },
  ],
  checklistHeading: 'Lista de comprobación',
  checklist: [
    'La fecha de nacimiento se transcribió correctamente.',
    'La fecha de referencia coincide con el momento que se quiere evaluar.',
    'Las cifras aproximadas no se presentan como mediciones reales.',
    'La institución confirma su propia fecha de corte y reglas especiales.',
  ],
};

export const spanishBusinessDays: ToolContent = {
  name: 'Calculadora de días laborables',
  short: 'Cuenta días laborables o hábiles entre dos fechas, con control de fines de semana y festivos personalizados.',
  long: 'Esta calculadora de días laborables recorre un intervalo de fechas civiles y permite incluir la fecha final, excluir sábados y domingos y pegar festivos en formato AAAA-MM-DD. Valida cada línea, elimina duplicados y avisa si encuentra fechas imposibles o mal escritas. El preset incluido corresponde únicamente al calendario 2026 de organismos administrativos del Gobierno de Taiwán; para España, México, Argentina, Colombia u otro territorio debes cargar la fuente oficial adecuada. No determina plazos legales, bancarios, laborales o judiciales.',
  seoTitle: 'Calculadora de días laborables y hábiles',
  seoDescription: 'Calcula días laborables entre dos fechas, excluye fines de semana y resta festivos personalizados. Controla si la fecha final se incluye.',
  keywords: [
    'calculadora de días laborables',
    'calculadora de días hábiles',
    'días laborables entre fechas',
    'calcular días hábiles',
    'contar días sin fines de semana',
    'días laborables con festivos',
    'contador de días hábiles',
    'calendario laboral',
  ],
  capabilities: [
    'Contar fechas de un intervalo con el último día incluido o excluido.',
    'Excluir sábados y domingos o tratarlos como días candidatos.',
    'Restar festivos personalizados, una fecha válida por línea.',
    'Ignorar duplicados y evitar descontar dos veces un festivo de fin de semana.',
    'Copiar un resumen de días totales, fines de semana, festivos y resultado.',
  ],
  contentSections: [
    {
      heading: 'Respuesta rápida: cómo calcular días laborables',
      paragraphs: [
        'Elige el primer y el último día. Mantén «Incluir la fecha final» cuando ambos extremos formen parte del periodo. Deja «Excluir fines de semana» activo para un patrón de lunes a viernes. Pega los festivos oficiales de tu contexto, uno por línea con formato AAAA-MM-DD, y pulsa «Calcular». La tarjeta principal devuelve los días que no quedaron excluidos por ninguna de esas reglas.',
        'El resultado depende por completo de la configuración. Del lunes 5 al domingo 11 de enero de 2026, con ambos extremos incluidos y sábados y domingos excluidos, hay cinco días laborables. Si el miércoles 7 se añade como festivo, quedan cuatro. Si el día final se excluye, el domingo desaparece del rango pero el resultado laborable sigue siendo cinco. Documenta las opciones para que otra persona pueda reproducir la cifra.',
      ],
    },
    {
      heading: 'Días laborables, hábiles, naturales y corridos',
      paragraphs: [
        'En español, «día laborable» y «día hábil» no siempre son sinónimos jurídicos. El uso cambia entre países, administraciones, convenios y sectores. «Días naturales» o «días corridos» suelen incluir todos los días del calendario, mientras que una regla de días hábiles puede excluir fines de semana, festivos o días inhábiles declarados. Esta página no asigna un significado legal a las etiquetas.',
        'Antes de introducir fechas, localiza la definición que acompaña al plazo. Averigua si se cuenta el día inicial, el final, ambos o ninguno; qué sucede si el vencimiento cae en un día inhábil; a qué hora termina; y qué territorio u organismo publica el calendario. La calculadora ejecuta tu modelo de lunes, fin de semana y festivos. No puede descubrir la norma correcta a partir del nombre del trámite.',
      ],
    },
    {
      heading: 'Cómo funciona la inclusión del último día',
      paragraphs: [
        'Con la casilla activa, el intervalo recorre desde el inicio hasta el final, ambos incluidos. Desactivada, se detiene antes del día final. En un intervalo de una sola fecha, la primera opción cuenta ese día si pasa los filtros; la segunda produce cero días. Esta diferencia es esencial en periodos de servicio, tiempos de respuesta y plazos expresados como días después de una notificación.',
        'La herramienta ordena automáticamente fechas invertidas y devuelve el mismo intervalo absoluto. Esa comodidad no interpreta cuál era el hecho inicial ni el vencimiento. En un plazo formal, conserva el orden conceptual y anota por qué el primer día se cuenta o no. Las reglas de cómputo pueden excluir el día de notificación, comenzar al día siguiente o trasladar el vencimiento, comportamientos que aquí solo pueden simularse ajustando los extremos.',
      ],
    },
    {
      heading: 'Fines de semana y horarios no convencionales',
      paragraphs: [
        'Al excluir fines de semana, sábado y domingo se restan. Si desmarcas la opción, esos días vuelven a ser candidatos laborables, salvo que también aparezcan como festivos. Esto permite una aproximación para organizaciones que trabajan todos los días, pero no configura viernes-sábado, turnos rotativos, jornadas de seis días, descansos variables o calendarios por persona.',
        'La salida «Días de fin de semana» sigue informando cuántos sábados y domingos hay, incluso cuando decides incluirlos. Así puedes auditar por qué el total laborable cambió. Para turnos, horas, medias jornadas, guardias o aperturas parciales necesitas una planificación con franjas horarias. Esta calculadora cuenta fechas completas y no conoce cuántas horas se trabajaron dentro de cada una.',
      ],
    },
    {
      heading: 'Cómo introducir festivos y entender los avisos',
      paragraphs: [
        'Escribe una fecha por línea con cuatro dígitos de año, dos de mes y dos de día. Se aceptan líneas como 2026-01-01 y se rechazan texto adicional, barras o fechas inexistentes como 2026-02-31. Las líneas vacías no cuentan como error. Si hay entradas inválidas, la página mantiene el cálculo con las fechas válidas y muestra cuántas líneas ignoró para que puedas corregirlas.',
        'Las repeticiones se deduplican y un festivo fuera del intervalo no cambia el resultado. Cuando «Excluir fines de semana» está activo, un festivo que cae en sábado o domingo no se descuenta otra vez: sigue apareciendo dentro de los días de fin de semana, pero no aumenta «Festivos descontados». Esto evita una doble resta. Si incluyes fines de semana, el mismo festivo sí se resta porque ahora habría sido un día candidato.',
      ],
    },
    {
      heading: 'El preset de Taiwán 2026 y por qué no es global',
      paragraphs: [
        'La lista rápida contiene fechas laborables de descanso del calendario 2026 para organismos administrativos del Gobierno de Taiwán, incluida la compensación indicada por la fuente. Se ofrece porque el sitio dispone de ese conjunto revisado, no porque sea aplicable a una audiencia española. El propio organismo advierte que su calendario tiene un ámbito institucional concreto. Puedes cargarlo, editarlo y ver cada fecha; no se activa automáticamente.',
        'No hay presets para España, comunidades autónomas, municipios, México, Argentina, Colombia, Chile, Perú ni otros países. Tampoco se actualiza una lista oficial en segundo plano. Obtén el calendario del organismo, empresa o convenio que rige tu caso y pega únicamente las fechas relevantes. Un festivo nacional puede no ser suficiente cuando existen días regionales, locales, bancarios, escolares o de cierre interno.',
      ],
      link: {
        prefix: 'La fuente del único preset es el ',
        label: 'calendario oficial 2026 de la DGPA de Taiwán',
        href: 'https://www.dgpa.gov.tw/information?fr=cg57241C0601M03&pid=12573&uid=30',
        suffix: '.',
      },
    },
    {
      heading: 'Ejemplos para proyectos, pagos y equipos internacionales',
      paragraphs: [
        'Para un proyecto interno, carga los días de cierre de la empresa además de los festivos locales y conserva la inclusión del vencimiento acordada. Para comparar equipos, realiza un cálculo separado por región: mezclar todos los festivos en una sola lista responde cuántos días comunes quedan, no cuántos días trabaja cada oficina. Etiqueta cada resultado con la fuente y fecha de actualización del calendario.',
        'En pagos o revisiones contractuales, una estimación de días laborables puede ayudar a planificar, pero no obliga a un banco, cliente o proveedor. Los sistemas pueden tener horas de corte, zonas horarias, procesamiento nocturno y días hábiles financieros distintos. Para una expectativa operativa, añade margen. Para exigir un derecho o calcular mora, usa la definición contractual y asesoramiento competente cuando corresponda.',
      ],
    },
    {
      heading: 'Cuándo no basta con esta calculadora',
      paragraphs: [
        'No añade un número de días laborables para encontrar automáticamente una fecha futura, no calcula horas hábiles, no modela media jornada y no traslada un vencimiento al día siguiente. Tampoco consulta cierres extraordinarios, emergencias, elecciones, huelgas, vacaciones colectivas o cambios posteriores a la publicación de un calendario. Todo festivo debe estar visible en el cuadro.',
        'Un plazo judicial, administrativo, migratorio, fiscal, sanitario, laboral, bancario o de seguros puede tener consecuencias importantes. Verifica el texto vigente, la autoridad competente, el territorio, la hora límite y el mecanismo oficial de presentación. Si existe un portal que muestra el vencimiento, guarda el comprobante. FunnyTools ayuda a revisar una hipótesis de calendario; no emite una determinación oficial.',
      ],
    },
    {
      heading: 'Privacidad, copia y conservación del calendario',
      paragraphs: [
        'Las fechas y la lista de festivos se procesan en esta pestaña. FunnyTools no recibe el calendario personalizado. El botón de copia prepara un resumen con el rango y los cuatro recuentos, pero no incluye toda la lista de festivos. Si necesitas auditoría, guarda también la fuente y las líneas utilizadas en un documento controlado.',
        'Al recargar o cerrar se pierde la configuración. No hay cuenta, historial, sincronización, recordatorio ni actualización automática. El portapapeles puede estar disponible para otras aplicaciones del dispositivo. No pegues nombres de empleados, expedientes o motivos de ausencia: el campo necesita únicamente fechas. El tratamiento local reduce la exposición al sitio, pero no protege la pantalla ni un equipo compartido.',
      ],
    },
  ],
  instructions: [
    'Selecciona el inicio y el final y decide si el último día debe contarse.',
    'Conserva o desactiva la exclusión de sábado y domingo según tu calendario real.',
    'Pega los festivos oficiales en formato AAAA-MM-DD, una fecha por línea.',
    'Corrige cualquier aviso de fecha inválida y revisa los cuatro recuentos.',
    'Copia el resultado junto con la fuente y la regla utilizada para el plazo.',
  ],
  examples: [
    'Estimar días disponibles antes de una entrega interna.',
    'Comparar calendarios de dos oficinas mediante cálculos separados.',
    'Descontar cierres de empresa además de sábados y domingos.',
    'Revisar una hipótesis de plazo antes de confirmarla con la autoridad.',
  ],
  audience: [
    'Responsables de proyectos y operaciones que preparan calendarios.',
    'Profesionales independientes que estiman ventanas de revisión o entrega.',
    'Equipos internacionales que comparan festivos visibles por región.',
    'Personas que quieren comprobar un recuento sin subir su calendario.',
  ],
  caseStudies: [
    {
      title: 'Entrega con un festivo intermedio',
      description: 'Un rango de lunes a domingo contiene cinco días de lunes a viernes. Al añadir el miércoles festivo quedan cuatro, y el resumen documenta que ambos extremos estaban incluidos.',
    },
    {
      title: 'Festivo repetido y una fecha imposible',
      description: 'La lista contiene el mismo festivo dos veces y 31 de febrero. El duplicado cuenta una sola vez y el aviso señala la línea inexistente sin ocultar el cálculo válido.',
    },
    {
      title: 'Dos oficinas con calendarios distintos',
      description: 'La coordinadora calcula por separado los días de Madrid y Ciudad de México. No mezcla festivos porque necesita la capacidad de cada equipo, no los días comunes.',
    },
  ],
  notes: [
    'La fecha final se incluye de forma predeterminada.',
    'Los fines de semana significan sábado y domingo.',
    'Las fechas inválidas se ignoran con un aviso visible.',
    'Los duplicados y los festivos de fin de semana no se descuentan dos veces.',
    'El único preset es Taiwán 2026 y tiene un ámbito institucional limitado.',
  ],
  faq: [
    {
      q: '¿Cómo calcular días laborables entre dos fechas?',
      a: 'Elige el rango, define si el final se incluye, excluye fines de semana y pega los festivos oficiales. El resultado resta las fechas que cumplen esos filtros.',
    },
    {
      q: '¿Días laborables y días hábiles significan lo mismo?',
      a: 'No siempre. La definición depende del país, organismo, contrato o trámite. Usa la regla escrita en la fuente responsable.',
    },
    {
      q: '¿Cómo escribo los festivos?',
      a: 'Usa una fecha AAAA-MM-DD por línea. La herramienta valida también que el día exista y muestra un aviso por líneas inválidas.',
    },
    {
      q: '¿Qué pasa si repito un festivo?',
      a: 'Se deduplica y solo puede descontarse una vez.',
    },
    {
      q: '¿Un festivo en domingo se resta dos veces?',
      a: 'No cuando los fines de semana están excluidos. Si incluyes sábados y domingos, el festivo sí se resta como fecha independiente.',
    },
    {
      q: '¿Puedo introducir la fecha final primero?',
      a: 'Sí. La página ordena el intervalo, aunque para un plazo formal conviene mantener claro qué hecho inicia el cómputo.',
    },
    {
      q: '¿Incluye festivos de España o América Latina?',
      a: 'No. Debes obtener y pegar la lista oficial de tu país, región, municipio, empresa u organismo.',
    },
    {
      q: '¿Sirve para un plazo judicial o bancario?',
      a: 'Solo como estimación auxiliar. Confirma reglas, cierres, territorio, hora límite y posibles traslados con la autoridad o entidad responsable.',
    },
  ],
  labels: {
    startDate: 'Fecha inicial',
    endDate: 'Fecha final',
    includeEndDate: 'Incluir la fecha final',
    skipWeekends: 'Excluir sábados y domingos',
    holidays: 'Festivos personalizados',
    holidayPreset: 'Cargar calendario de referencia',
    presetNone: 'Selecciona una opción…',
    presetTw2026: 'Taiwán 2026, organismos administrativos',
    holidayPlaceholder: '2026-01-01\n2026-12-25',
    calculate: 'Calcular',
    copyResult: 'Copiar resultado',
    reset: 'Restablecer',
    totalCalendarDays: 'Días del intervalo',
    weekendDays: 'Días de fin de semana',
    holidayDays: 'Festivos descontados',
    businessDays: 'Días laborables',
    countedRange: 'Intervalo contado',
    invalidDate: 'Introduce fechas inicial y final válidas.',
    holidayWarning: 'Se ignoraron {count} líneas con fechas no válidas o inexistentes.',
    days: 'días',
    daySingular: 'día',
    copied: 'Resultado copiado',
  },
  privacyNote: 'El intervalo y la lista de festivos se calculan en esta pestaña y no se envían a FunnyTools. Guarda por separado la fuente si necesitas reproducir el resultado.',
  disclaimer: 'No es un calendario oficial ni una determinación de plazo. Verifica definición, festivos, territorio, hora límite y regla de traslado con la organización o autoridad competente.',
};

export const spanishBusinessDaysReview = {
  heading: 'Cómo revisar un recuento de días laborables',
  intro: 'El número final solo es reproducible si conserva la norma, el territorio y la lista de exclusiones.',
  panels: [
    { title: 'Definición', text: 'Confirma qué entiende la fuente por laborable, hábil, natural o corrido.' },
    { title: 'Calendario', text: 'Usa festivos oficiales del territorio y periodo exactos.' },
    { title: 'Extremos', text: 'Documenta si el día inicial y el final forman parte del cómputo.' },
  ],
  checklistHeading: 'Lista de comprobación',
  checklist: [
    'El patrón de fin de semana coincide con la organización.',
    'No quedan avisos de fechas inválidas sin revisar.',
    'El preset de Taiwán no se aplica a otro territorio.',
    'Los plazos formales se confirman con la fuente competente.',
  ],
};
