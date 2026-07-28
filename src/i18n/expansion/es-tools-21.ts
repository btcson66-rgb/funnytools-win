import type { ToolContent } from '../tools/_types';

export const spanishMortgagePayment: ToolContent = {
  name: 'Calculadora de hipoteca',
  short: 'Calcula la cuota mensual de una hipoteca a tipo fijo con capital, interés y plazo.',
  long: 'Esta calculadora de hipoteca estima la cuota constante de capital e intereses mediante el sistema francés. Introduce el importe que realmente pedirías prestado, un tipo nominal anual y un plazo entero de 1 a 100 años. Obtendrás la cuota mensual, la suma de las cuotas y el interés total bajo el supuesto de que el tipo no cambia. No incluye entrada, impuestos, seguros, tasación, comisiones, productos vinculados ni gastos de comunidad, y no reproduce una oferta bancaria.',
  seoTitle: 'Calculadora de hipoteca: cuota mensual e intereses',
  seoDescription: 'Calcula la cuota mensual de una hipoteca a tipo fijo, pagos totales e intereses. Fórmula, ejemplo y límites de la simulación.',
  keywords: [
    'calculadora de hipoteca',
    'calcular cuota hipoteca',
    'simulador hipoteca',
    'cuota mensual hipoteca',
    'calculadora préstamo hipotecario',
    'intereses hipoteca',
    'amortización sistema francés',
    'TIN hipoteca',
  ],
  capabilities: [
    'Calcular una cuota mensual constante de capital e intereses.',
    'Comparar escenarios cambiando capital, TIN anual o plazo.',
    'Mostrar el total de cuotas y el interés nominal acumulado.',
    'Resolver correctamente un préstamo con interés del 0%.',
    'Mantener todos los importes dentro de la pestaña del navegador.',
  ],
  contentSections: [
    {
      heading: 'Respuesta rápida: cómo calcular la cuota de una hipoteca',
      paragraphs: [
        'Escribe el capital que vas a financiar, no necesariamente el precio completo de la vivienda. Añade el tipo de interés nominal anual y el plazo en años. La calculadora divide el tipo entre doce y aplica la fórmula de cuota constante. Por ejemplo, para 150.000 unidades monetarias al 3% durante 25 años, la cuota estimada de capital e intereses es de unas 711 al mes. La cifra no indica qué moneda utilizas: conserva la misma unidad en todas las entradas y resultados.',
        'El resultado responde a una pregunta concreta: cuánto sería una cuota mensual si el capital, el tipo y el plazo permanecieran como los has escrito. No responde cuánto cuesta comprar la vivienda, cuánto dinero necesitas al inicio, si el banco aprobará la operación ni cuánto saldrá de tu cuenta sumando seguros, impuestos y otros cargos. Para tomar una decisión, construye un presupuesto separado con todos esos conceptos y contrasta la simulación con la documentación oficial de cada oferta.',
      ],
    },
    {
      heading: 'Fórmula de cuota constante y sistema francés',
      paragraphs: [
        'Cuando el tipo mensual es mayor que cero, la cuota se calcula como capital por i por uno más i elevado al número de meses, dividido entre uno más i elevado al número de meses menos uno. En esa expresión, i es el TIN anual dividido entre doce y el número de meses es el plazo en años multiplicado por doce. Si el tipo es cero, el capital se divide directamente entre las mensualidades. El redondeo visible se hace al entero más cercano, aunque los cálculos internos conservan decimales.',
        'En el sistema francés la cuota se mantiene constante mientras no cambien el tipo ni otras condiciones. Su composición sí cambia: al principio suele incluir más interés y menos amortización de capital; después, más capital y menos interés. Esta página muestra los totales, pero no genera una tabla de amortización por mes. Tampoco contempla días reales entre recibos, periodos de carencia, cuotas finales, pagos irregulares, amortización anticipada ni un préstamo de solo intereses.',
      ],
    },
    {
      heading: 'Qué tipo de interés introducir: TIN, TAE, CAT o APR',
      paragraphs: [
        'La entrada pide un tipo nominal anual usado para calcular intereses periódicos. En España suele llamarse TIN. La TAE incorpora frecuencia de pagos y determinados gastos para facilitar comparaciones; en México, el CAT cumple una función de coste anual total; en Estados Unidos se utiliza APR. Esas medidas no son intercambiables de forma automática. Copiar una TAE, un CAT o una APR en el campo TIN puede producir una cuota que no coincide con el contrato.',
        'Busca en la oferta cuál es el tipo aplicado a la amortización y comprueba si es fijo, variable o mixto. Si el contrato usa un índice más diferencial, introduce solo un escenario temporal, por ejemplo el índice supuesto más el margen. Repite con una tasa mayor y otra menor para observar sensibilidad. La cuota de una hipoteca variable puede cambiar en cada revisión y una simulación no es una predicción del euríbor, de la inflación ni de otro índice.',
      ],
      link: {
        prefix: 'El ',
        label: 'Banco de España explica los tipos nominales y reales',
        href: 'https://www.bde.es/wbe/es/areas-actuacion/politica-monetaria/preguntas-frecuentes/papel-tipos-interes/tipos-de-interes-nominales-y-reales.html',
        suffix: ' y por qué no describen por sí solos el poder adquisitivo.',
      },
    },
    {
      heading: 'Qué incluye la cuota y qué queda fuera',
      paragraphs: [
        'Los tres resultados incluyen únicamente el capital prestado y el interés calculado con los supuestos indicados. No incluyen entrada, reserva, notaría, registro, gestoría, tasación, comisión de apertura, puntos, honorarios, impuestos de compra, seguro de hogar, seguro hipotecario, seguros de vida, cuotas de comunidad, mantenimiento, suministros ni reformas. Algunos conceptos se pagan al inicio y otros cada mes o cada año. Sumarlos a la cuota es indispensable para estimar la carga real.',
        'La estructura también cambia según el país. Una cuenta de depósito en garantía puede agrupar impuestos y seguros dentro del pago al administrador, mientras que en otros mercados se pagan por separado. Los productos vinculados pueden reducir un tipo anunciado pero añadir primas o comisiones. Compara el coste total de cada combinación, no solo la cuota más baja. Una mensualidad menor obtenida alargando el plazo puede implicar mucho más interés total y más años de exposición.',
      ],
    },
    {
      heading: 'Ejemplo comparativo: 150.000 a 20, 25 y 30 años',
      paragraphs: [
        'Con un capital de 150.000 y TIN fijo del 3%, el escenario de 20 años produce una cuota aproximada de 832 y unos intereses totales de 49.655. A 25 años, la cuota baja a unos 711, pero el interés sube a unos 63.395. A 30 años, la mensualidad ronda 632 y el interés total supera 77.666. Son resultados matemáticos aproximados, sin gastos y antes de aplicar redondeos contractuales.',
        'El ejemplo muestra el intercambio entre liquidez mensual y coste acumulado. No demuestra que el plazo corto sea siempre mejor: una cuota demasiado alta puede dejar el presupuesto sin margen para emergencias. Tampoco demuestra que el largo sea asequible: la obligación permanece más tiempo y una tasa variable puede cambiar. Prueba los tres plazos con tus ingresos netos, gastos esenciales, deudas, fondo de emergencia y costes de la vivienda, sin usar el máximo que el formulario permite como objetivo personal.',
      ],
    },
    {
      heading: 'Hipoteca fija, variable o mixta',
      paragraphs: [
        'Para una hipoteca fija, el escenario es útil si el tipo permanece igual y el contrato realmente utiliza cuotas mensuales constantes. Para una variable, calcula varias tasas plausibles: la inicial, una superior y otra que presione de verdad tu presupuesto. Para una mixta, simula por separado el tramo fijo y una posible situación después del cambio, sabiendo que el capital pendiente en esa fecha no es el capital original. Esta herramienta simple no encadena automáticamente los tramos.',
        'El Banco de España recuerda que la simulación obligatoria de una hipoteca variable presenta escenarios, no predicciones. El índice podría moverse fuera de los ejemplos. En otros países, revisa las reglas de ajuste, topes, frecuencia y margen en la información precontractual. Si una cuota solo es viable bajo la tasa promocional inicial, el cálculo debe incluir el pago posterior antes de asumir el compromiso.',
      ],
      link: {
        prefix: 'Consulta el ',
        label: 'simulador y las hipótesis de cálculo del Banco de España',
        href: 'https://clientebancario.bde.es/pcb/es/menu-horizontal/podemosayudarte/simuladores/simulador_prestamo_hipotecario_personal.html',
        suffix: '.',
      },
    },
    {
      heading: 'Cómo comparar ofertas sin mirar solo la mensualidad',
      paragraphs: [
        'Anota para cada oferta el capital, la entrada, el tipo, su naturaleza fija o ajustable, el plazo, la cuota de capital e intereses, los seguros, comisiones, coste anual comparable y efectivo inicial. Comprueba si existe penalización o compensación por amortización anticipada, qué ocurre al perder una bonificación y cuánto podría cambiar el recibo. Usa exactamente el mismo capital y plazo al comparar, porque una cuota menor con condiciones distintas no es una comparación limpia.',
        'En España revisa FIPRE, FEIN y FiAE cuando correspondan. En México compara tasa, pago, desembolso inicial y CAT en fuentes oficiales. En Estados Unidos, la Estimación del Préstamo reúne tasa, pago y costes de cierre. Los nombres y obligaciones cambian, pero el principio es común: la calculadora sirve para explorar y detectar preguntas; el documento emitido por la entidad define la oferta. Guarda una copia fechada de las condiciones comparadas.',
      ],
    },
    {
      heading: 'Errores frecuentes al usar un simulador hipotecario',
      paragraphs: [
        'Un error habitual es introducir el precio de la vivienda cuando ya se pagará una entrada, duplicando la parte financiada. Otro es escribir 0,03 para representar 3%; aquí debes escribir 3. También se confunde TIN con TAE, se ignoran los costes añadidos o se supone que una tasa variable permanecerá igual treinta años. El plazo debe ser un número entero de años entre 1 y 100; una fracción no se redondea silenciosamente.',
        'También conviene evitar una precisión falsa. El recibo real puede diferir por fechas, redondeos, comisiones, seguros, revisiones y reglas del contrato. El total visible supone que todas las cuotas se pagan puntualmente y que no hay amortizaciones anticipadas ni cambios. Si aparece un error, los resultados anteriores se borran para no presentar una cifra vieja como si correspondiera a los nuevos datos.',
      ],
    },
    {
      heading: 'Privacidad y uso responsable de los resultados',
      paragraphs: [
        'El capital, el tipo y el plazo se procesan en tu navegador. No necesitas nombre, dirección, ingresos, documento de identidad, banco ni datos de la vivienda. FunnyTools no recibe estos valores. Puedes usar cantidades redondeadas para explorar escenarios. En un dispositivo compartido, recuerda que el historial del navegador puede mostrar que visitaste la página, aunque no almacene el formulario como una solicitud de crédito.',
        'Una cuota matemática no es una recomendación, aprobación ni prueba de solvencia. No introduzcas datos personales en notas externas y no envíes una captura como sustituto de una oferta. Si existe riesgo de impago, una compra urgente, una moneda distinta a la de tus ingresos o cláusulas que no comprendes, consulta a la entidad y a un profesional independiente o servicio público de orientación aplicable a tu país.',
      ],
    },
    {
      heading: 'Lista de comprobación antes de firmar',
      paragraphs: [
        'Confirma el importe realmente financiado, la moneda, el tipo aplicado a la amortización, si puede cambiar, el plazo, la cuota inicial, la peor cuota razonablemente posible, todos los costes de cierre y los pagos periódicos ajenos al capital e interés. Revisa el presupuesto después de añadir mantenimiento y emergencias. Pregunta cómo se aplican los pagos anticipados y si reducen cuota, plazo o ambos.',
        'Compara varias ofertas escritas y vuelve a calcular cuando cambie cualquier dato. Verifica que el nombre del coste anual comparable corresponde a tu jurisdicción y no mezcles TIN, TAE, CAT y APR. Por último, comprueba que puedes sostener la obligación sin depender de una subida de ingresos incierta. La decisión final debe descansar en el contrato y en tu situación completa, no en una sola cifra de esta página.',
      ],
    },
  ],
  instructions: [
    'Introduce el capital que realmente deseas pedir prestado.',
    'Escribe el tipo nominal anual como porcentaje, por ejemplo 3 para 3%.',
    'Añade un plazo entero de 1 a 100 años.',
    'Compara la cuota, el total pagado y el interés acumulado.',
    'Suma por separado entrada, impuestos, seguros, comisiones y mantenimiento.',
  ],
  examples: [
    'Comparar 20, 25 y 30 años manteniendo capital y tipo constantes.',
    'Medir cuánto cambiaría la cuota si un tipo variable subiera dos puntos.',
    'Separar la parte financiada del precio total después de la entrada.',
    'Comprobar el efecto de una oferta con menor tipo pero más productos vinculados.',
  ],
  audience: [
    'Personas que preparan preguntas antes de comparar hipotecas.',
    'Hogares que quieren probar escenarios de cuota y plazo.',
    'Estudiantes que necesitan entender la amortización de cuota constante.',
    'Usuarios que desean una estimación privada y sin registro.',
  ],
  caseStudies: [
    {
      title: 'Entrada separada del préstamo',
      description: 'Una vivienda cuesta 200.000 y la persona aporta 50.000. Introduce 150.000 como capital, no 200.000, y presupuesta la entrada y los gastos iniciales fuera del cálculo.',
    },
    {
      title: 'Prueba de subida de tipo',
      description: 'Una pareja compara su cuota al 3%, 5% y 7%. No interpreta los escenarios como previsión, sino como una prueba de resistencia del presupuesto.',
    },
    {
      title: 'Oferta con cuota incompleta',
      description: 'El recibo anunciado solo muestra capital e intereses. La compradora añade seguro, impuestos y comunidad antes de evaluar si la vivienda cabe en su gasto mensual.',
    },
  ],
  notes: [
    'Usa la misma unidad monetaria en todas las entradas y resultados.',
    'El campo de tasa espera un porcentaje anual nominal, no una TAE, CAT o APR.',
    'La fórmula supone cuota mensual constante, tipo fijo y sistema francés.',
    'No incluye costes de compra, seguros, impuestos, comisiones ni mantenimiento.',
    'Una simulación no es una oferta, aprobación ni asesoramiento financiero.',
  ],
  faq: [
    {
      q: '¿Cómo se calcula la cuota mensual de una hipoteca?',
      a: 'Con capital, tipo mensual y número de mensualidades. Esta página utiliza la fórmula de cuota constante del sistema francés.',
    },
    {
      q: '¿Debo introducir TIN o TAE?',
      a: 'Introduce el tipo nominal anual aplicado al cálculo de intereses. No copies TAE, CAT o APR sin saber cómo se convierten.',
    },
    {
      q: '¿La cuota incluye seguros e impuestos?',
      a: 'No. Solo incluye capital e interés. Añade seguros, impuestos, comisiones, comunidad y mantenimiento por separado.',
    },
    {
      q: '¿Funciona para una hipoteca variable?',
      a: 'Solo como escenario con una tasa concreta. Repite el cálculo con varias tasas y revisa el mecanismo de ajuste del contrato.',
    },
    {
      q: '¿Qué ocurre si el tipo es 0%?',
      a: 'El capital se divide entre el total de meses, sin añadir intereses.',
    },
    {
      q: '¿Por qué baja la cuota cuando alargo el plazo?',
      a: 'El capital se reparte entre más mensualidades, pero normalmente aumenta el interés total y dura más la obligación.',
    },
    {
      q: '¿Puedo usar decimales en el plazo?',
      a: 'No. La herramienta requiere años enteros entre 1 y 100 para mantener una convención mensual clara.',
    },
    {
      q: '¿El resultado garantiza que me concederán la hipoteca?',
      a: 'No. La aprobación y las condiciones dependen de la entidad, la normativa, la solvencia, la garantía y la documentación.',
    },
  ],
  labels: {
    loanAmount: 'Capital del préstamo',
    annualRate: 'TIN anual (%)',
    termYears: 'Plazo (años enteros)',
    calculate: 'Calcular cuota',
    copy: 'Copiar resultado',
    monthlyPayment: 'Cuota mensual estimada',
    totalPayments: 'Total de cuotas',
    totalInterest: 'Interés total',
    invalidInput: 'Introduce un capital mayor que 0, un TIN entre 0% y 100% y un plazo entero de 1 a 100 años.',
    copied: 'Resultado copiado',
  },
  formula: {
    expression: 'Cuota = P × [i(1+i)^n] / [(1+i)^n - 1]',
    explanation: 'P es el capital, i el TIN anual dividido entre 12 y n el número de cuotas mensuales. Con i igual a cero, la cuota es P dividido entre n.',
  },
  privacyNote: 'El capital, el tipo y el plazo se calculan localmente en esta pestaña y no se envían a FunnyTools.',
  disclaimer: 'Estimación educativa de capital e intereses con cuota constante. No es oferta, aprobación ni asesoramiento financiero, jurídico o fiscal. Verifica TIN, TAE, CAT o APR, gastos, seguros, impuestos y cláusulas en documentos oficiales de tu país.',
};

export const spanishMortgagePaymentReview = {
  heading: 'Cómo revisar una simulación hipotecaria',
  intro: 'Una comparación útil separa la cuota matemática del coste completo de comprar y mantener la vivienda.',
  panels: [
    { title: 'Entrada correcta', text: 'Usa el capital financiado y el tipo nominal aplicable, no el precio completo ni una tasa de coste distinta.' },
    { title: 'Escenarios', text: 'Compara plazos y, si el tipo puede variar, repite con tasas superiores.' },
    { title: 'Coste completo', text: 'Añade entrada, cierre, seguros, impuestos, comunidad y mantenimiento.' },
  ],
  checklistHeading: 'Lista de comprobación',
  checklist: [
    'Capital financiado y moneda confirmados.',
    'TIN diferenciado de TAE, CAT o APR.',
    'Tipo fijo, variable o mixto identificado.',
    'Gastos iniciales y periódicos añadidos al presupuesto.',
    'Oferta escrita contrastada con la simulación.',
  ],
};

export const spanishCompoundInterest: ToolContent = {
  name: 'Calculadora de interés compuesto',
  short: 'Proyecta un capital inicial y aportaciones mensuales con una tasa anual y capitalización elegida.',
  long: 'Esta calculadora de interés compuesto crea un escenario nominal con capital inicial, aportación al final de cada mes, tasa anual fija, plazo entero y frecuencia de capitalización. Muestra valor futuro, dinero aportado e interés calculado, además de una gráfica anual. No descuenta inflación, impuestos, comisiones, pérdidas, cambios de tasa ni retrasos en las aportaciones. Una tasa escrita por el usuario es una hipótesis matemática, no una rentabilidad prometida.',
  seoTitle: 'Interés compuesto: calculadora con aportes mensuales',
  seoDescription: 'Calcula interés compuesto, capital final y aportes mensuales. Compara tasas, plazos y capitalización con fórmula y ejemplos claros.',
  keywords: [
    'calculadora interés compuesto',
    'interés compuesto con aportaciones mensuales',
    'calculadora ahorro compuesto',
    'calcular capital final',
    'fórmula interés compuesto',
    'simulador inversión mensual',
    'capitalización mensual',
    'rendimiento compuesto',
  ],
  capabilities: [
    'Combinar capital inicial y aportaciones mensuales constantes.',
    'Elegir capitalización diaria, mensual, trimestral o anual.',
    'Separar aportaciones totales del interés matemático acumulado.',
    'Mostrar una trayectoria anual para comparar horizontes.',
    'Calcular un escenario de tasa cero sin atribuir rendimientos.',
  ],
  contentSections: [
    {
      heading: 'Respuesta rápida: cómo calcular interés compuesto con aportes',
      paragraphs: [
        'Introduce el capital disponible hoy, la cantidad que aportarías al final de cada mes, una tasa anual, el número entero de años y la frecuencia con que se capitaliza esa tasa. La página convierte la tasa nominal en una tasa mensual equivalente según la frecuencia elegida. Cada mes aplica el rendimiento al saldo existente y después suma la aportación. Al final muestra cuánto habría, cuánto pusiste tú y qué diferencia se atribuye al interés del escenario.',
        'Por ejemplo, 10.000 iniciales, 500 al mes, 5% anual con capitalización mensual durante 10 años producen un valor futuro aproximado de 94.111. Las aportaciones suman 70.000 y el interés estimado ronda 24.111. El ejemplo supone que la tasa no cambia, no existen comisiones ni impuestos, y cada aportación llega puntualmente al final del mes. No describe el resultado garantizado de una cuenta o inversión concreta.',
      ],
    },
    {
      heading: 'Qué es el interés compuesto y por qué cambia con el tiempo',
      paragraphs: [
        'En el interés simple, el rendimiento se calcula solo sobre un capital base. En el compuesto, los intereses que permanecen en el saldo pueden generar nuevos intereses en periodos posteriores. Por eso dos escenarios con la misma tasa anual pueden separarse mucho si uno dura más tiempo. El crecimiento no es lineal: el efecto de cada periodo se aplica sobre un saldo que puede incluir capital, aportaciones e intereses anteriores.',
        'Ese mecanismo también funciona en sentido adverso con costes o deudas, pero esta página está diseñada como proyección de saldo no negativo. No admite pérdidas ni tasas negativas. Para inversiones, una trayectoria real puede subir y bajar; aplicar una tasa fija cada mes suaviza toda esa variación. Usa el resultado como referencia para comparar supuestos, no como representación del camino que seguirá un mercado.',
      ],
      link: {
        prefix: 'La ',
        label: 'CONDUSEF explica el interés compuesto con un ejemplo en español',
        href: 'https://revista.condusef.gob.mx/inversion/2026/06/mas-interes-menos-estres/',
        suffix: '.',
      },
    },
    {
      heading: 'Cómo trata las aportaciones mensuales',
      paragraphs: [
        'La convención de esta calculadora es aportación vencida: primero crece el saldo del mes y después entra la cantidad mensual. Si aportas al inicio de cada mes, el resultado real bajo la misma tasa sería algo mayor porque cada depósito tendría un periodo adicional. Si tus ingresos llegan semanal, quincenal o irregularmente, puedes convertirlos a un promedio mensual para explorar, pero perderás el detalle de las fechas.',
        'El total aportado se calcula como capital inicial más aportación mensual por doce por los años. La diferencia entre valor futuro y aportado se etiqueta como interés, aunque en un producto real podría incluir ganancias o pérdidas de mercado y ya venir reducida por costes. Si cambias la aportación con el tiempo, ejecuta escenarios por etapas o usa una herramienta con flujos fechados; aquí se mantiene constante durante todo el plazo.',
      ],
    },
    {
      heading: 'Capitalización mensual, trimestral, anual o diaria',
      paragraphs: [
        'La frecuencia indica cuántas veces al año se incorpora el rendimiento al capital bajo una tasa nominal. La calculadora convierte esa tasa a un equivalente mensual mediante uno más tasa dividido entre frecuencia, elevado a frecuencia entre doce, menos uno. Con el mismo nominal, una frecuencia mayor suele elevar ligeramente la tasa efectiva. Esa comparación solo es válida si la forma de cotización corresponde a la fórmula.',
        'Una entidad puede anunciar TAE, tasa efectiva, rendimiento anual equivalente u otra medida que ya incorpora capitalización. No debes tratarla automáticamente como tasa nominal. Confirma la definición y periodicidad en el contrato. La opción diaria usa 365 periodos iguales y no modela años bisiestos, días exactos de depósito ni calendarios bancarios. La precisión visible se redondea, pero la proyección conserva decimales internamente.',
      ],
    },
    {
      heading: 'Tasa nominal, tasa efectiva y rentabilidad real',
      paragraphs: [
        'La tasa introducida es una hipótesis nominal anual. La rentabilidad efectiva depende de la frecuencia, mientras que la rentabilidad real descuenta inflación. Si una inversión gana 5% nominal y los precios aumentan 3%, el poder adquisitivo no crece 5%. Además, comisiones, impuestos y diferimientos fiscales pueden cambiar el saldo neto. Esta calculadora no conoce tu país, producto ni situación tributaria.',
        'Para comparar productos, busca una medida oficial homogénea y resta todos los costes relevantes. No elijas una tasa alta solo para obtener un objetivo agradable en la pantalla. La CNMV recuerda que toda inversión incorpora riesgo y que rentabilidad, riesgo y gastos deben entenderse juntos. Un rendimiento esperado no equivale a un interés garantizado, y un depósito protegido no tiene la misma naturaleza que un fondo o activo volátil.',
      ],
      link: {
        prefix: 'Consulta la orientación de la ',
        label: 'CNMV sobre rentabilidad, riesgo y gastos',
        href: 'https://www.cnmv.es/portal/inversor/decisiones-informarse?lang=es',
        suffix: '.',
      },
    },
    {
      heading: 'Ejemplo de sensibilidad: tasa, plazo y aportación',
      paragraphs: [
        'Con 10.000 iniciales y 500 mensuales durante 10 años, cambiar de 3% a 5% o 7% altera mucho el valor final. Pero alargar el horizonte o aumentar la aportación también puede tener un efecto grande y no exige suponer un rendimiento más arriesgado. Ejecuta una tabla propia con escenario prudente, central y exigente; conserva iguales las demás entradas para saber qué variable explica la diferencia.',
        'Después prueba una interrupción: reduce a cero las aportaciones durante varios meses o acorta el plazo. La herramienta no modela esa pausa directamente, pero puedes dividir el plan en tramos. Esta práctica evita creer que el gráfico ascendente es inevitable. Si el objetivo depende de una tasa elevada durante décadas, identifica cuánto podrías compensar con más ahorro, menor meta, plazo distinto o costes menores.',
      ],
    },
    {
      heading: 'Inflación, impuestos y comisiones que no aparecen',
      paragraphs: [
        'El resultado está en unidades monetarias futuras nominales. No dice qué podrás comprar con ellas. Para un objetivo de largo plazo, estima por separado la inflación y expresa la meta en dinero del año objetivo. Tampoco se restan comisiones de administración, custodia, compra, venta, asesoramiento o cambio de moneda. Una comisión pequeña repetida cada año también se compone y puede reducir de forma relevante el saldo.',
        'Los impuestos pueden aplicarse cada periodo, al retirar o con reglas especiales según el vehículo y la jurisdicción. No uses un porcentaje fiscal de otro país. Si necesitas un saldo neto, modela costes y fiscalidad con documentación actual. La herramienta oficial Finanzas para Todos advierte que su propio simulador de objetivos es didáctico y explicita supuestos de liquidación mensual; esa transparencia es igual de necesaria aquí.',
      ],
      link: {
        prefix: 'Compara los supuestos con la herramienta ',
        label: 'Mis objetivos de Finanzas para Todos',
        href: 'https://www.finanzasparatodos.es/herramientas/mis-objetivos',
        suffix: '.',
      },
    },
    {
      heading: 'Errores frecuentes en una proyección compuesta',
      paragraphs: [
        'Es fácil escribir 0,05 cuando el formulario espera 5 para representar 5%. También se mezclan tasas efectivas y nominales, se supone que los aportes ocurren al inicio y se olvida que aquí entran al final. Otro error es llamar interés a todo aumento de una inversión, aunque una parte pueda ser cambio de precio no garantizado. Anota siempre la fuente, fecha y definición de la tasa.',
        'Los años deben ser enteros entre 1 y 100 y la tasa entre 0% y 100%. Esos límites evitan bucles enormes y resultados sin utilidad práctica, pero no convierten el máximo en razonable. Un dato inválido borra cifras y gráfica anteriores. Así no queda a la vista un valor generado con entradas distintas. La copia solo se habilita con un resultado válido.',
      ],
    },
    {
      heading: 'Cómo leer la gráfica sin confundirla con una previsión',
      paragraphs: [
        'La línea representa el saldo al final de cada año bajo un crecimiento suave y fijo. Las barras ayudan a comparar magnitudes, pero no muestran aportaciones frente a rentabilidad, volatilidad, caídas, recuperación ni incertidumbre. El primer punto es el final del año uno, no el saldo inicial. El número superior es la escala máxima del escenario, redondeada en el idioma del documento.',
        'Una gráfica real de inversión rara vez tiene esta forma. Para evaluar riesgo necesitas escenarios adversos, dispersión de resultados, horizonte, liquidez y posibles pérdidas. La CNMV señala que un mayor rendimiento suele venir acompañado de mayor riesgo. No extrapoles la curva más allá del plazo ni la presentes como promesa. Úsala para entender la relación matemática entre tiempo, aportes y una tasa constante.',
      ],
    },
    {
      heading: 'Privacidad y decisiones de inversión',
      paragraphs: [
        'Los valores se calculan localmente. La página no pide identidad, cuenta bancaria, cartera, ingresos ni nombre del producto. Puedes usar cifras aproximadas. FunnyTools no guarda una estrategia ni registra cambios de escenario. Si compartes el resultado, acompáñalo con los supuestos de tasa, frecuencia, aportación y plazo; una cifra aislada no puede auditarse.',
        'No compres un producto porque coincida con el porcentaje que escribiste. Verifica autorización de la entidad, liquidez, riesgo de pérdida, protección aplicable, moneda, comisiones, fiscalidad y documentación. Desconfía de rendimientos altos presentados como seguros. Si una decisión afecta ahorros esenciales o jubilación, busca asesoramiento regulado e independiente adecuado a tu país.',
      ],
    },
  ],
  instructions: [
    'Introduce el capital inicial y la aportación que harías al final de cada mes.',
    'Escribe una tasa anual como porcentaje y confirma si es nominal o efectiva.',
    'Elige un plazo entero de 1 a 100 años y la frecuencia de capitalización.',
    'Compara valor futuro, aportado e interés del escenario.',
    'Repite con tasas prudentes y descuenta aparte inflación, costes e impuestos.',
  ],
  examples: [
    'Comparar 3%, 5% y 7% sin cambiar capital, aportes ni plazo.',
    'Medir el efecto de comenzar con 10.000 frente a comenzar desde cero.',
    'Probar una aportación de 300, 500 y 700 al final de cada mes.',
    'Estimar un escenario de tasa 0 para aislar el efecto del ahorro.',
  ],
  audience: [
    'Personas que preparan un plan de ahorro de largo plazo.',
    'Estudiantes que quieren entender capitalización y valor futuro.',
    'Usuarios que comparan supuestos antes de revisar productos reales.',
    'Quienes prefieren calcular sin subir datos financieros.',
  ],
  caseStudies: [
    {
      title: 'Aportes al final del mes',
      description: 'Una persona cobra el último día hábil y programa el ahorro después. La convención del cálculo coincide con ese flujo, pero revisa meses en los que no podrá aportar.',
    },
    {
      title: 'Tasa optimista frente a prudente',
      description: 'Un objetivo solo se alcanza al 9%. La usuaria repite al 3% y 5%, y decide aumentar el aporte en vez de tratar el 9% como garantía.',
    },
    {
      title: 'Meta nominal e inflación',
      description: 'El saldo futuro parece suficiente, pero el ahorrador recalcula cuánto costaría su objetivo con inflación y ajusta la cantidad objetivo.',
    },
  ],
  notes: [
    'Las aportaciones se suman al final de cada mes.',
    'La tasa anual es fija y definida por el usuario; no está garantizada.',
    'La frecuencia seleccionada supone una tasa nominal compatible con esa capitalización.',
    'No se descuentan inflación, impuestos, comisiones ni pérdidas.',
    'La gráfica es una trayectoria matemática suave, no una previsión de mercado.',
  ],
  faq: [
    {
      q: '¿Qué es el interés compuesto?',
      a: 'Es el crecimiento en el que los rendimientos retenidos pasan a formar parte del saldo que puede generar rendimientos posteriores.',
    },
    {
      q: '¿Cuándo se suman las aportaciones mensuales?',
      a: 'Al final de cada mes, después de aplicar el crecimiento mensual al saldo existente.',
    },
    {
      q: '¿La tasa anual está garantizada?',
      a: 'No. Es una hipótesis que introduces. Un producto real puede variar, tener costes o registrar pérdidas.',
    },
    {
      q: '¿Debo introducir 5 o 0,05 para un 5%?',
      a: 'Introduce 5. El formulario convierte el porcentaje internamente.',
    },
    {
      q: '¿Qué capitalización debo elegir?',
      a: 'La que describa la forma en que se cotiza y capitaliza la tasa del producto. Confírmalo en su documentación.',
    },
    {
      q: '¿Incluye inflación e impuestos?',
      a: 'No. El saldo es nominal y antes de impuestos, comisiones y otros costes.',
    },
    {
      q: '¿Puede calcular una rentabilidad negativa?',
      a: 'No. Esta versión admite tasas de 0% a 100%; para pérdidas necesitas una herramienta de flujos y escenarios diferente.',
    },
    {
      q: '¿Por qué el resultado real puede ser distinto?',
      a: 'Porque tasas, fechas, aportes, precios, impuestos y costes pueden cambiar, y una inversión no crece de forma constante.',
    },
  ],
  labels: {
    principal: 'Capital inicial',
    monthly: 'Aportación mensual al final del mes',
    rate: 'Tasa nominal anual (%)',
    years: 'Años enteros',
    compounding: 'Capitalización',
    monthlyCompounding: 'Mensual',
    quarterlyCompounding: 'Trimestral',
    yearlyCompounding: 'Anual',
    dailyCompounding: 'Diaria (365)',
    calculate: 'Calcular interés compuesto',
    copy: 'Copiar resultado',
    futureValue: 'Valor futuro estimado',
    contributed: 'Total aportado',
    interest: 'Interés del escenario',
    chartTitle: 'Saldo estimado al final de cada año',
    invalidInput: 'Usa importes no negativos, tasa entre 0% y 100% y años enteros de 1 a 100.',
    copied: 'Resultado copiado',
  },
  formula: {
    expression: 'r_m = (1 + r_a / m)^(m / 12) - 1; saldo nuevo = saldo × (1 + r_m) + aporte',
    explanation: 'r_a es la tasa nominal anual, m la frecuencia de capitalización y el aporte se añade al final de cada mes.',
  },
  privacyNote: 'Capital, aportación, tasa, plazo y frecuencia se procesan en tu navegador y no se envían a FunnyTools.',
  disclaimer: 'Proyección matemática educativa con tasa y aportes constantes. No es promesa de rentabilidad ni asesoramiento de inversión, fiscal o financiero. Verifica riesgos, costes, inflación, impuestos y autorización del producto.',
};

export const spanishCompoundInterestReview = {
  heading: 'Cómo revisar una proyección de interés compuesto',
  intro: 'El valor final solo es interpretable cuando la tasa, la fecha de los aportes y los costes están bien definidos.',
  panels: [
    { title: 'Tasa', text: 'Identifica si es nominal o efectiva y no la presentes como garantizada.' },
    { title: 'Flujos', text: 'Confirma que los aportes constantes al final de cada mes representan tu plan.' },
    { title: 'Valor real', text: 'Resta por separado inflación, impuestos, comisiones y posibles pérdidas.' },
  ],
  checklistHeading: 'Lista de comprobación',
  checklist: [
    'Porcentaje y frecuencia corresponden a la misma definición.',
    'Aportaciones mensuales son sostenibles durante el plazo.',
    'Se compararon escenarios prudente, central y adverso.',
    'Inflación, riesgo, liquidez, impuestos y comisiones fueron revisados.',
    'El resultado no se comunica como garantía.',
  ],
};

export const spanishSavingsGoal: ToolContent = {
  name: 'Calculadora de meta de ahorro',
  short: 'Calcula cuánto tardarías en alcanzar una meta o cuánto tendrías que ahorrar cada mes.',
  long: 'Esta calculadora de meta de ahorro funciona en dos sentidos. Puede estimar los meses necesarios con un saldo actual, un aporte mensual y una tasa anual fija, o despejar la aportación mensual para llegar a una cantidad en un número entero de meses. Los depósitos se suponen al final del mes y la tasa se convierte a un equivalente mensual. El resultado no incorpora inflación, impuestos, comisiones, ingresos variables, retiradas ni pérdidas.',
  seoTitle: 'Meta de ahorro: calcula tiempo o aporte mensual',
  seoDescription: 'Calcula cuánto ahorrar al mes para una meta o cuánto tardarás. Incluye interés, ejemplos, fórmula, inflación y límites.',
  keywords: [
    'calculadora meta de ahorro',
    'cuánto ahorrar al mes',
    'calculadora plan de ahorro',
    'tiempo para alcanzar ahorro',
    'ahorro mensual objetivo',
    'calculadora objetivo financiero',
    'plan para ahorrar dinero',
    'aportación mensual necesaria',
  ],
  capabilities: [
    'Estimar el tiempo necesario para alcanzar una cantidad objetivo.',
    'Calcular la aportación mensual para un plazo de 1 a 1.200 meses.',
    'Incluir un saldo actual y una tasa anual definida por el usuario.',
    'Detectar cuando la meta ya está alcanzada o el escenario no avanza.',
    'Mantener cifras y resultados dentro del navegador.',
  ],
  contentSections: [
    {
      heading: 'Respuesta rápida: cuánto ahorrar al mes para una meta',
      paragraphs: [
        'Selecciona «Cuánto al mes», escribe la cantidad objetivo, el ahorro que ya tienes, el número de meses restantes y una tasa anual. El resultado es la aportación que, bajo esos supuestos, se añadiría al final de cada mes. Si no quieres depender de intereses, escribe 0%. Esta opción es útil para una entrada, un fondo de emergencia, estudios, viaje o compra planificada, siempre que la meta y la fecha estén expresadas en la misma moneda.',
        'Si prefieres saber cuánto tardarías, selecciona «Cuánto tardaré», conserva objetivo, ahorro actual y tasa, y añade tu aportación mensual. La página simula hasta 1.200 meses. Cuando no hay aporte ni crecimiento y el saldo está por debajo de la meta, informa que el escenario no puede alcanzarla. No interpreta esa respuesta como fracaso: indica qué supuesto debe cambiar.',
      ],
    },
    {
      heading: 'Dos modos de cálculo y una misma convención',
      paragraphs: [
        'El modo tiempo avanza mes a mes: aplica el rendimiento mensual al saldo y luego suma el ahorro. Se detiene en el primer mes en que el saldo iguala o supera el objetivo. El modo aportación despeja la anualidad vencida necesaria para un plazo fijo. En ambos casos los depósitos llegan al final del mes. Si ahorras al principio, el resultado sería ligeramente distinto.',
        'La tasa mensual se deriva de una tasa anual efectiva mediante uno más tasa anual elevado a un doceavo, menos uno. Esta convención difiere de la calculadora de interés compuesto, que permite indicar una frecuencia nominal. La etiqueta y la explicación son deliberadas: no mezcles resultados sin revisar cómo se define la tasa. Con tasa cero, el modo aportación divide la diferencia pendiente entre los meses.',
      ],
    },
    {
      heading: 'Cómo definir una meta concreta y verificable',
      paragraphs: [
        'Una meta útil contiene cantidad, moneda, fecha y propósito. «Ahorrar más» no permite calcular; «reunir 6.000 euros en 18 meses para matrícula y materiales» sí. Separa objetivos con distinta prioridad o fecha. No combines el fondo de emergencia con un viaje si usar uno para el otro pondría en riesgo gastos esenciales. Revisa precios reales antes de fijar la cifra.',
        'Incluye un margen para costes no evidentes y actualiza la meta cuando cambie el precio. Si el objetivo está en otra moneda, decide si ahorrarás directamente en ella y reconoce el riesgo de cambio. La herramienta no convierte divisas. Para una meta de largo plazo, expresa también una versión ajustada por inflación; 20.000 dentro de diez años no comprarán necesariamente lo mismo que hoy.',
      ],
    },
    {
      heading: 'Ejemplo sin intereses: 6.000 en 18 meses',
      paragraphs: [
        'Si quieres 6.000, ya tienes 1.500, faltan 18 meses y escribes 0%, la diferencia es 4.500. La aportación mensual necesaria es 250. Ese número supone 18 depósitos completos y ninguna retirada. Si solo puedes aportar 200, cambia al modo tiempo: tardarías 23 meses porque la simulación redondea hacia el primer mes que alcanza o supera la meta.',
        'El redondeo de dinero se hace hacia arriba en la pantalla para no sugerir una aportación insuficiente por centavos omitidos. El saldo interno conserva decimales. En la vida real puedes crear una transferencia automática algo superior y revisar cada tres meses. Si un mes no aportas, vuelve a calcular con el saldo real y el tiempo restante; no escondas el retraso elevando una tasa hipotética.',
      ],
    },
    {
      heading: 'Ejemplo con crecimiento y por qué no es una promesa',
      paragraphs: [
        'Para una meta de 20.000, saldo actual de 5.000, plazo de 36 meses y tasa anual de 3%, la aportación calculada será menor que dividir 15.000 entre 36 porque el saldo y los depósitos generan rendimiento. La diferencia no es dinero seguro. Una cuenta puede cambiar su tasa y una inversión puede perder valor. Usa 0% como base y un escenario conservador adicional.',
        'La CONDUSEF aclara en su simulador de ahorro que mantiene fija la tasa inicial durante reinversiones y que las tasas pueden cambiar con el mercado. Esa advertencia evita confundir un ejercicio numérico con una opinión o garantía. Para productos reales, verifica institución, protección de depósitos, plazo, liquidez, penalizaciones y rendimiento neto antes de incorporar la tasa al plan.',
      ],
      link: {
        prefix: 'Consulta los supuestos del ',
        label: 'simulador de ahorro e inversión de CONDUSEF',
        href: 'https://simulador.condusef.gob.mx/condusefahorro/datos_ppa.php',
        suffix: '.',
      },
    },
    {
      heading: 'Fondo de emergencia, entrada, viaje o compra',
      paragraphs: [
        'Para un fondo de emergencia, el objetivo debe relacionarse con gastos esenciales y la liquidez suele importar más que maximizar rendimiento. Para una entrada de vivienda, separa entrada, gastos de compra y reserva posterior; no termines con saldo cero el día de la firma. Para un viaje, añade transporte local, seguros, cambio de moneda e imprevistos. Para una compra, compara también si posponer reduce la necesidad de crédito.',
        'La misma fórmula no hace iguales los objetivos. El horizonte determina cuánto riesgo y falta de liquidez puedes tolerar. El dinero que necesitarás pronto no debería depender de una rentabilidad volátil sin reconocer la posibilidad de pérdida. La calculadora no recomienda productos ni asignación de activos. Sirve para convertir una intención en un flujo mensual que después debes contrastar con el presupuesto.',
      ],
    },
    {
      heading: 'Cómo encajar la aportación en un presupuesto real',
      paragraphs: [
        'Comienza con ingresos netos verificables y gastos esenciales, deudas mínimas y reservas. La cifra mensual calculada debe competir con obligaciones reales. Si no cabe, puedes bajar la meta, ampliar el plazo, aumentar ingresos, reducir gastos o dividir el objetivo. No uses una tasa más alta como sustituto de un ajuste que depende de ti. Prioriza atrasos, deuda costosa y necesidades básicas cuando corresponda.',
        'Automatizar después del cobro puede mejorar la constancia, pero deja margen para facturas variables. Una aportación demasiado agresiva que obliga a retirar cada mes no es sostenible. Registra saldo y aportes reales, no solo la intención. La herramienta no almacena historial, por lo que conviene revisar el plan periódicamente y recalcular tras cambios de empleo, precio, plazo o emergencia.',
      ],
    },
    {
      heading: 'Inflación, impuestos, costes y poder adquisitivo',
      paragraphs: [
        'La cantidad objetivo es nominal. Si una formación cuesta 10.000 hoy y su precio aumenta, una meta de 10.000 dentro de cinco años puede quedarse corta. Proyecta el coste futuro por separado o actualiza la cifra cada año. La tasa introducida tampoco se reduce por inflación. Un saldo puede crecer y aun así perder poder adquisitivo si los precios crecen más rápido.',
        'No se descuentan impuestos sobre rendimientos, comisiones, penalizaciones, seguros ni costes de cambio. Tampoco se modelan bonificaciones, aportes empresariales o subsidios. Consulta reglas actuales de tu país y producto. Finanzas para Todos presenta su herramienta como ejemplo didáctico y declara que no incluye inflación y otras variables; aplica la misma prudencia a esta estimación.',
      ],
      link: {
        prefix: 'Revisa el enfoque didáctico de ',
        label: 'Mis objetivos en Finanzas para Todos',
        href: 'https://www.finanzasparatodos.es/herramientas/mis-objetivos',
        suffix: '.',
      },
    },
    {
      heading: 'Qué hacer si el objetivo parece imposible',
      paragraphs: [
        'En modo tiempo, una aportación cero y una tasa cero no permiten aumentar el saldo. Una tasa positiva puede alcanzar matemáticamente la meta, pero quizá después del límite de 100 años; en ese caso la página también lo considera no alcanzable dentro del rango. En modo mensual, un plazo entre 1 y 1.200 meses siempre permite calcular una cantidad no negativa si los demás datos son válidos.',
        'Usa el mensaje como diagnóstico del escenario. Calcula la diferencia entre aportación necesaria y disponible. Después prueba una fecha más lejana, una meta mínima y otra deseada, o una aportación adicional realista. Si el objetivo corresponde a una obligación urgente, busca orientación antes de asumir deuda costosa. La calculadora no evalúa elegibilidad para ayudas, crédito ni prestaciones.',
      ],
    },
    {
      heading: 'Errores frecuentes y límites de entrada',
      paragraphs: [
        'Escribe 3 para 3%, no 0,03. La cantidad objetivo debe ser mayor que cero; saldo y aporte no pueden ser negativos; la tasa está limitada a 0%–100%; y el plazo debe ser un entero de 1 a 1.200 meses. Si ya alcanzaste el objetivo, se informa directamente. Los datos inválidos borran el resultado anterior para evitar que una cifra vieja parezca corresponder al nuevo formulario.',
        'No confundas «meses necesarios» con una fecha garantizada. La estimación supone depósitos consecutivos, tasa constante y ausencia de retiradas. Tampoco confundas el importe redondeado con una orden de transferencia exacta si tu moneda utiliza decimales. Añade margen y revisa el saldo real. Para metas con flujos irregulares, crea varios escenarios o utiliza una hoja de cálculo con fechas.',
      ],
    },
    {
      heading: 'Privacidad y mantenimiento del plan',
      paragraphs: [
        'Objetivo, saldo, aporte, plazo y tasa se procesan en esta pestaña. No se solicita cuenta, nombre del banco, ingresos ni motivo del ahorro. FunnyTools no conserva el plan. Puedes cerrar la página para borrar el estado visible; el historial general del navegador puede conservar la visita según su configuración.',
        'Guarda tu plan en un lugar seguro sin exponer números sensibles. Registra fecha de revisión, saldo real, meta actualizada y próxima acción. Un plan útil cambia cuando cambia la vida. No trates una desviación como motivo para ocultar datos: vuelve a calcular. Para decisiones relevantes, verifica información oficial y busca asesoramiento cualificado adecuado a tu jurisdicción.',
      ],
    },
  ],
  instructions: [
    'Elige si quieres calcular tiempo o aportación mensual.',
    'Introduce una meta mayor que cero y el ahorro disponible hoy.',
    'Añade aporte mensual o plazo entero según el modo.',
    'Usa 0% si prefieres una base sin rendimiento.',
    'Recalcula con inflación, costes y cambios reales del saldo.',
  ],
  examples: [
    'Calcular el aporte para reunir 6.000 en 18 meses con tasa 0.',
    'Estimar cuántos meses requiere una entrada con un ahorro mensual fijo.',
    'Comparar un objetivo mínimo y otro deseado.',
    'Probar una tasa conservadora frente a un escenario sin intereses.',
  ],
  audience: [
    'Personas que convierten una compra futura en un plan mensual.',
    'Hogares que preparan un fondo de emergencia o una entrada.',
    'Estudiantes que quieren comprender metas, plazos y aportaciones.',
    'Usuarios que prefieren no registrar datos financieros en un servidor.',
  ],
  caseStudies: [
    {
      title: 'Meta con fecha fija',
      description: 'Una estudiante resta los meses hasta la matrícula, usa tasa 0 y programa una transferencia ligeramente superior al mínimo calculado.',
    },
    {
      title: 'Fondo de emergencia líquido',
      description: 'Una familia prioriza disponibilidad y usa una tasa conservadora, sin depender de una inversión volátil para alcanzar una necesidad cercana.',
    },
    {
      title: 'Objetivo que cambió de precio',
      description: 'El coste de la compra sube. La persona actualiza la cantidad objetivo y no conserva el aporte antiguo como si todavía fuera suficiente.',
    },
  ],
  notes: [
    'Las aportaciones se suponen al final de cada mes.',
    'La tasa anual es efectiva, fija y definida por el usuario.',
    'El modo tiempo simula como máximo 1.200 meses.',
    'No incluye inflación, impuestos, comisiones, retiradas ni pérdidas.',
    'La meta y todos los importes deben usar la misma moneda.',
  ],
  faq: [
    {
      q: '¿Cuánto debo ahorrar al mes para una meta?',
      a: 'Selecciona «Cuánto al mes», introduce meta, saldo actual, meses y tasa. La página despeja una aportación al final de cada mes.',
    },
    {
      q: '¿Cómo calculo cuánto tardaré?',
      a: 'Selecciona «Cuánto tardaré» e introduce objetivo, saldo, aportación mensual y tasa anual.',
    },
    {
      q: '¿Puedo usar una tasa de 0%?',
      a: 'Sí. Es una base útil cuando no quieres depender de rendimientos.',
    },
    {
      q: '¿Qué ocurre si ya tengo la cantidad objetivo?',
      a: 'La herramienta indica que la meta ya está alcanzada y no exige nuevos depósitos.',
    },
    {
      q: '¿Incluye inflación?',
      a: 'No. Actualiza la meta o calcula el coste futuro por separado.',
    },
    {
      q: '¿Por qué redondea hacia arriba el ahorro mensual?',
      a: 'Para no mostrar un importe entero que quede por debajo de la aportación matemática por decimales omitidos.',
    },
    {
      q: '¿Admite aportaciones semanales?',
      a: 'No directamente. Convierte a un promedio mensual o usa una herramienta con flujos fechados.',
    },
    {
      q: '¿Es un consejo sobre dónde invertir?',
      a: 'No. Solo calcula un escenario. Verifica riesgo, liquidez, costes, impuestos y protección del producto.',
    },
  ],
  labels: {
    modeTime: '¿Cuánto tardaré?',
    modeMonthly: '¿Cuánto debo ahorrar al mes?',
    target: 'Cantidad objetivo',
    current: 'Ahorro disponible hoy',
    monthlyDeposit: 'Aportación al final de cada mes',
    annualRate: 'Tasa anual efectiva (%)',
    targetMonths: 'Plazo (meses enteros)',
    calculate: 'Calcular meta',
    copy: 'Copiar resultado',
    resultTitle: 'Resultado',
    timeResult: 'Tiempo estimado',
    monthlyResult: 'Aportación mensual necesaria',
    years: 'años',
    yearSingular: 'año',
    months: 'meses',
    monthSingular: 'mes',
    reached: 'La meta ya está alcanzada',
    impossible: 'La meta no se alcanza dentro de 1.200 meses con estos supuestos. Aumenta la aportación o revisa objetivo, plazo y tasa.',
    invalidInput: 'Usa una meta mayor que 0, importes no negativos, tasa entre 0% y 100% y plazo entero de 1 a 1.200 meses.',
    copied: 'Resultado copiado',
  },
  formula: {
    expression: 'Saldo del mes = saldo anterior × (1 + r_m) + aporte; r_m = (1 + r_a)^(1/12) - 1',
    explanation: 'El aporte se añade al final de cada mes. En el modo de plazo fijo, la fórmula se despeja para obtener el aporte mensual.',
  },
  privacyNote: 'Meta, saldo, aportación, plazo y tasa se calculan en tu navegador y no se envían a FunnyTools.',
  disclaimer: 'Estimación educativa con tasa y aportes constantes. No es asesoramiento financiero ni promesa de rentabilidad. Ajusta inflación, costes, impuestos, liquidez y riesgo con información oficial.',
};

export const spanishSavingsGoalReview = {
  heading: 'Cómo revisar una meta de ahorro',
  intro: 'Un objetivo sólido combina cantidad, fecha, aportación sostenible y supuestos prudentes.',
  panels: [
    { title: 'Meta', text: 'Define propósito, moneda, cantidad y fecha, con margen para cambios de precio.' },
    { title: 'Aporte', text: 'Comprueba que cabe en el presupuesto y que puede mantenerse cada mes.' },
    { title: 'Supuestos', text: 'Prueba tasa 0, inflación, costes y meses sin aportación.' },
  ],
  checklistHeading: 'Lista de comprobación',
  checklist: [
    'Meta y plazo están definidos en la misma moneda.',
    'El saldo actual no mezcla fondos reservados para otras prioridades.',
    'La aportación mensual es sostenible.',
    'Inflación, costes, impuestos y liquidez fueron considerados.',
    'El plan se revisará con saldos reales.',
  ],
};
