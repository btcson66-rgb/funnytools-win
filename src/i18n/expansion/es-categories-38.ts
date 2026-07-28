import type { SpanishInfoPage } from './es-pages';

export const spanishMoneyCategory: SpanishInfoPage = {
  title: 'Calculadoras de dinero, sueldo y ahorro',
  seoTitle: 'Calculadoras financieras gratis y prudentes | FunnyTools',
  seoDescription: 'Estima sueldo neto, horas extra, hipoteca, interés compuesto, ahorro e inflación con escenarios verificables y enlaces a fuentes oficiales.',
  keywords: ['calculadoras financieras online', 'calcular sueldo neto', 'simulador hipoteca', 'interés compuesto ahorro', 'calculadora inflación'],
  eyebrow: 'Planificación financiera · escenarios · no es asesoramiento',
  intro: 'Una calculadora financiera sirve para comparar supuestos, no para adivinar el futuro ni sustituir un contrato. Esta colección permite estimar sueldo neto, horas extra, cuota hipotecaria, crecimiento compuesto, meta de ahorro e impacto de la inflación. Cada resultado depende de los datos y simplificaciones introducidos; antes de firmar, declarar o invertir, contrasta la cifra con nómina, convenio, entidad, documentación precontractual y organismo competente.',
  directAnswer: [
    'Para ingresos, separa salario bruto, pagas, cotizaciones, retenciones y otros conceptos. Para deuda, compara capital, plazo, tipo, comisiones, productos vinculados y TAE, no solo cuota. Para ahorro, distingue aportación, rentabilidad, inflación, impuestos y riesgo. Cambia una variable cada vez y guarda al menos un escenario base, uno adverso y uno favorable.',
    'FunnyTools calcula localmente y no conecta con bancos, nóminas ni expedientes fiscales. El resultado es una estimación educativa. No introduce tipos actuales, convenios, tramos fiscales ni condiciones particulares por sí solo. Si una decisión puede comprometer vivienda, empleo, impuestos o ahorros importantes, utiliza documentación oficial y asesoramiento profesional adecuado.',
  ],
  sections: [
    {
      heading: 'Empezar por una pregunta y una fecha de referencia',
      paragraphs: [
        'Escribe qué quieres saber y para cuándo: cuota inicial de una hipoteca, dinero disponible tras una nómina, ahorro necesario dentro de tres años o poder adquisitivo de una cantidad. La fecha importa porque impuestos, convenios, tipos, inflación y reglas pueden cambiar. Una cifra sin periodo mezcla condiciones que quizá nunca coexistieron.',
        'Define moneda, frecuencia y si los importes incluyen impuestos o comisiones. Mensual y anual no se convierten siempre multiplicando por doce cuando existen pagas extra, capitalización distinta o gastos puntuales. Conserva las unidades junto a cada entrada y evita copiar un porcentaje sin saber si es nominal, efectivo, anual o mensual.',
      ],
    },
    {
      heading: 'Sueldo bruto, neto y coste empresarial son conceptos distintos',
      paragraphs: [
        'El bruto es la remuneración antes de determinadas deducciones; el neto es lo que se abona después de cotizaciones, retenciones y otros conceptos; el coste empresarial incluye partidas adicionales. Una calculadora genérica no conoce todas las circunstancias personales, territoriales, contractuales o fiscales. Usa el bruto anual y el número real de pagas como punto de partida.',
        'Compara la estimación con una nómina: devengos, bases, aportaciones, retención, anticipos y especie. Una retención no siempre coincide con el impuesto definitivo. Para una oferta laboral, pide desglose escrito y confirma si bonus, variables y dietas son garantizados, condicionados o reembolsos.',
      ],
      link: {
        prefix: 'Construye un escenario orientativo con la ',
        label: 'Calculadora de sueldo neto',
        href: '/es/herramientas/calculadora-sueldo-neto/',
        suffix: ' y compáralo con documentación real.',
      },
    },
    {
      heading: 'Horas extra: primero jornada, convenio y compensación',
      paragraphs: [
        'Para estimar una hora ordinaria necesitas salario computable y jornada aplicable. Después identifica cuántas horas superan la jornada ordinaria y si se abonan o compensan con descanso. El Estatuto de los Trabajadores remite al convenio o contrato y establece límites y reglas; un multiplicador genérico no sustituye esa lectura.',
        'Registra fecha, duración, autorización y compensación. Distingue horas extraordinarias, complementarias, nocturnas, festivas y guardias según el caso. No uses la cifra de la herramienta para alterar un registro laboral. Si existe discrepancia, conserva cuadrantes, nóminas y comunicaciones y consulta representación laboral o asesoramiento competente.',
      ],
      link: {
        prefix: 'Prueba importes con la ',
        label: 'Calculadora de horas extra',
        href: '/es/herramientas/calculadora-horas-extra/',
        suffix: ' después de verificar la regla aplicable.',
      },
    },
    {
      heading: 'Cuota hipotecaria y coste total no son lo mismo',
      paragraphs: [
        'Una cuota de sistema francés depende de capital, tipo periódico y número de pagos. Al principio suele contener más interés y menos amortización. La cuota no incluye automáticamente tasación, seguros, comisiones, impuestos, mantenimiento ni productos vinculados. Un plazo largo puede reducir el pago mensual y aumentar mucho el interés total.',
        'Compara fijo, variable y mixto con escenarios, no con una única predicción. En variable, prueba subidas y bajadas del índice y revisa frecuencia de actualización, diferencial, límites y bonificaciones. El Banco de España recuerda que una simulación de tipos es orientativa, no una previsión de la cuota real.',
      ],
      link: {
        prefix: 'Compara capital, tipo y plazo con la ',
        label: 'Calculadora de hipoteca',
        href: '/es/herramientas/calculadora-hipoteca/',
        suffix: ' y solicita después la documentación de la entidad.',
      },
    },
    {
      heading: 'TIN, TAE, comisiones y productos vinculados',
      paragraphs: [
        'El TIN refleja el precio nominal del dinero; la TAE incorpora frecuencia y determinados gastos y comisiones conforme a reglas de cálculo. Por eso la TAE facilita comparar ofertas antes de contratar, aunque tampoco resume todos los riesgos cualitativos. Dos cuotas parecidas pueden corresponder a costes totales y condiciones muy distintas.',
        'Lee FIPRE, FEIN, FiAE, contrato y ejemplo representativo cuando proceda. Anota comisión de apertura, amortización, seguros, cuentas, tarjetas y condiciones para bonificar el tipo. No introduzcas una TAE en un campo que espera TIN: produciría una cuota técnicamente calculada con un dato incompatible.',
      ],
    },
    {
      heading: 'Capacidad de pago y colchón, no solo cuota máxima',
      paragraphs: [
        'Calcula ingresos estables, gastos esenciales, otras deudas y ahorro disponible después de la cuota. Añade mantenimiento, comunidad, suministros, seguros e impuestos. Un banco puede aprobar un importe que no encaja con tus objetivos o con una caída temporal de ingresos.',
        'Construye un escenario adverso con tipo mayor, reparación, desempleo o reducción de variable. Decide qué colchón conservarías tras entrada y gastos. Si una cuota solo funciona bajo el escenario más optimista, la comparación ya ofrece información útil aunque la fórmula sea correcta.',
      ],
    },
    {
      heading: 'Interés compuesto: tasa, frecuencia y aportaciones',
      paragraphs: [
        'El interés compuesto acumula rendimiento sobre capital y resultados anteriores. Especifica tasa, periodicidad, años, aportación y momento de cada ingreso. Una tasa anual del 6 % capitalizada mensualmente no se introduce igual que un 0,5 % mensual si existen comisiones o definiciones distintas.',
        'El crecimiento mostrado suele ser nominal y antes de impuestos, gastos e inflación. Una rentabilidad constante es una hipótesis pedagógica, no una promesa. Para inversiones con volatilidad, modela varios rendimientos, pérdidas intermedias y secuencia de retornos, y revisa la documentación del producto.',
      ],
      link: {
        prefix: 'Observa el efecto de plazo y aportaciones con la ',
        label: 'Calculadora de interés compuesto',
        href: '/es/herramientas/calculadora-interes-compuesto/',
        suffix: ' sin presentar la tasa como garantizada.',
      },
    },
    {
      heading: 'Meta de ahorro: convertir un deseo en flujo mensual',
      paragraphs: [
        'Define importe objetivo, saldo inicial y fecha. Separa objetivo en euros nominales de objetivo en poder adquisitivo actual. Para un fondo de emergencia, la liquidez y disponibilidad suelen importar más que una rentabilidad estimada; para un objetivo lejano, riesgo, inflación y fiscalidad ganan peso.',
        'Prueba aportación mensual necesaria con rentabilidad cero y con escenarios prudentes. Añade costes previsibles y revisa el plan cada vez que cambien ingresos o fecha. Una meta sostenible debe permitir gastos esenciales y no depender de endeudamiento caro para cumplir una aportación rígida.',
      ],
      link: {
        prefix: 'Calcula una aportación inicial con la ',
        label: 'Calculadora de meta de ahorro',
        href: '/es/herramientas/calculadora-meta-ahorro/',
        suffix: ' y revisa el plan periódicamente.',
      },
    },
    {
      heading: 'Inflación y poder adquisitivo',
      paragraphs: [
        'La inflación mide la variación de precios de una cesta; tu experiencia puede diferir por vivienda, energía, alimentación, región y hábitos. Para comparar cantidades entre años, indica índice, periodo y sentido de la conversión. No confundas aumento nominal de salario con mejora real.',
        'Los datos históricos no predicen una tasa futura constante. En una planificación, utiliza varios escenarios y actualiza con la fuente estadística pertinente. Una cantidad futura puede parecer mayor y comprar menos; expresa resultados nominales y reales por separado.',
      ],
      link: {
        prefix: 'Explora cambios de poder adquisitivo con la ',
        label: 'Calculadora de inflación',
        href: '/es/herramientas/calculadora-inflacion/',
        suffix: ' y cita el índice utilizado.',
      },
    },
    {
      heading: 'Comparar escenarios sin manipular el resultado',
      paragraphs: [
        'Crea una tabla con variables en filas y escenarios en columnas. Cambia una variable cada vez para entender sensibilidad: tipo, plazo, sueldo, inflación o aportación. Después combina un escenario coherente; no mezcles el mejor ingreso, el menor gasto y la mayor rentabilidad como si fueran la base.',
        'Guarda fecha, fuente y fórmula. Si compartes el cálculo, incluye las entradas completas y redondea solo al final. Una conclusión honesta explica qué variable mueve más el resultado y qué información falta, en vez de mostrar solo una cifra atractiva.',
        'Comprueba también el punto de equilibrio: qué tipo, ingreso o gasto haría inviable la opción. Esa frontera suele orientar mejor una decisión que el promedio, porque revela cuánto margen existe antes de incumplir el objetivo.',
      ],
    },
    {
      heading: 'Privacidad de datos financieros',
      paragraphs: [
        'No introduzcas IBAN, número de tarjeta, credenciales, identificadores fiscales, nombre completo ni documentación bancaria. Las calculadoras necesitan importes y porcentajes, no identidad. Utiliza datos redondeados o escenarios ficticios si compartes pantalla.',
        'El cálculo local reduce transferencias a FunnyTools, pero el dispositivo, portapapeles, historial, extensiones y capturas siguen siendo riesgos. Guarda hojas de comparación en una ubicación protegida y elimina copias temporales. Nunca envíes secretos para pedir soporte.',
      ],
    },
    {
      heading: 'Cuándo dejar la calculadora y acudir a una fuente oficial',
      paragraphs: [
        'Para nómina e impuestos, consulta documentación de empleador y administraciones; para hipoteca, entidad, Banco de España y notaría; para inversión, folleto, CNMV y profesional autorizado; para deuda en dificultad, contacta pronto con entidad y servicios competentes. Una herramienta general no conoce tu contrato ni puede verificar elegibilidad.',
        'Desconfía de resultados que prometen aprobación, rentabilidad o ahorro garantizado. Comprueba fecha y jurisdicción de cualquier regla. Si dos fuentes difieren, no elijas la cifra más favorable: identifica definiciones, periodo y documento vinculante.',
      ],
    },
    {
      heading: 'Lista de comprobación antes de una decisión financiera',
      paragraphs: [
        'Verifica moneda, bruto/neto, anual/mensual, TIN/TAE, capitalización, comisiones, impuestos, inflación y fecha. Repite un caso simple y compara con una fuente oficial. Conserva escenarios adversos y margen para errores.',
        'Etiqueta el resultado como estimación y anota qué queda fuera. No firmes, declares ni inviertas basándote únicamente en una calculadora pública. La utilidad del cálculo está en hacer preguntas mejores y detectar qué dato contractual debe confirmarse.',
      ],
    },
  ],
  faq: [
    { q: '¿Estas calculadoras dan un resultado financiero oficial?', a: 'No. Son estimaciones educativas basadas en tus entradas y simplificaciones. Contrasta con contrato, entidad, nómina y organismo competente.' },
    { q: '¿Sueldo neto y retención final de impuestos son iguales?', a: 'No necesariamente. La retención es un pago a cuenta y el resultado fiscal depende de circunstancias y normativa.' },
    { q: '¿La calculadora de hipoteca incluye todos los gastos?', a: 'No automáticamente. Revisa comisiones, seguros, productos vinculados, impuestos, tasación, mantenimiento y documentación precontractual.' },
    { q: '¿Debo comparar préstamos por TIN o TAE?', a: 'Antes de contratar, la TAE facilita comparar coste al incorporar elementos definidos; también debes leer condiciones, plazo y riesgos.' },
    { q: '¿Una rentabilidad de interés compuesto está garantizada?', a: 'No. Es una tasa hipotética salvo que un producto y contrato establezcan condiciones específicas, y puede faltar inflación, impuestos, riesgo y comisiones.' },
    { q: '¿Qué tasa de inflación debo usar?', a: 'Usa un índice oficial pertinente para análisis histórico y varios escenarios para el futuro; la inflación personal puede diferir.' },
    { q: '¿Puedo introducir datos bancarios personales?', a: 'No es necesario. Usa importes sin IBAN, tarjeta, credenciales, identificadores ni documentos.' },
    { q: '¿Cuándo necesito ayuda profesional?', a: 'Cuando la decisión afecta vivienda, deuda, empleo, impuestos, inversión o ahorro importante, o cuando las reglas contractuales no están claras.' },
  ],
  review: {
    heading: 'Revisión de una estimación financiera',
    intro: 'Una cifra prudente conserva las entradas, muestra escenarios y no oculta costes ni incertidumbre.',
    checks: [
      { title: 'Definiciones', text: 'Moneda, fecha, frecuencia, bruto/neto, tipo y capitalización están identificados.' },
      { title: 'Costes y riesgo', text: 'Se incluyeron comisiones, impuestos, inflación y un escenario adverso cuando correspondía.' },
      { title: 'Verificación', text: 'El resultado se contrastó con documentación oficial o contractual antes de decidir.' },
    ],
  },
  sources: [
    { label: 'Banco de España: simuladores para clientes bancarios', href: 'https://clientebancario.bde.es/pcb/es/menu-horizontal/podemosayudarte/simuladores/', note: 'Cuota, TAE, amortización y otros simuladores oficiales de comparación.' },
    { label: 'Banco de España: TAE de un préstamo', href: 'https://clientebancario.bde.es/pcb/es/menu-horizontal/productosservici/relacionados/tiposinteres/guia-textual/latae/tae_prestamo.html', note: 'Diferencia entre coste nominal y tasa anual equivalente.' },
    { label: 'Banco de España: contratación de hipoteca', href: 'https://clientebancario.bde.es/pcb/es/menu-horizontal/productosservici/financiacion/hipotecas/guia-textual/primerospasoscon/Contratacion_de_la_hipoteca.html', note: 'Coste total, documentación precontractual, productos vinculados y verificación notarial.' },
    { label: 'BOE: Estatuto de los Trabajadores', href: 'https://boe.es/buscar/act.php?id=BOE-A-2015-11430', note: 'Jornada, horas extraordinarias, descanso y registro.' },
  ],
};

export const spanishTimeCategory: SpanishInfoPage = {
  title: 'Herramientas de tiempo, fechas y productividad',
  seoTitle: 'Calculadoras de tiempo y fechas gratis | FunnyTools',
  seoDescription: 'Usa temporizador, cronómetro, Pomodoro, fechas, edad, días laborables, descansos y Unix timestamp con límites y comprobaciones claras.',
  keywords: ['herramientas de tiempo online', 'calculadora diferencia fechas', 'días laborables calculadora', 'temporizador Pomodoro', 'convertir timestamp Unix'],
  eyebrow: 'Tiempo y fechas · planificación · comprobación local',
  intro: 'Contar segundos y contar días parecen tareas simples hasta que intervienen inclusividad, zonas horarias, horario de verano, festivos, meses desiguales o pestañas en segundo plano. Esta colección separa temporizadores en vivo de cálculos calendáricos. Sirve para concentrarse, medir intervalos y preparar fechas, pero una alarma crítica, un plazo legal o un registro oficial necesita además el sistema y la fuente apropiados.',
  directAnswer: [
    'Usa cuenta atrás para una duración objetivo, cronómetro para medir un intervalo, Pomodoro para ciclos de trabajo y pausa, diferencia de fechas para días calendario, días laborables para excluir fines de semana y festivos introducidos, edad para una fecha de referencia y timestamp para convertir instantes entre Unix, UTC, ISO y hora local.',
    'Mantén la pestaña visible durante temporizadores importantes: los navegadores pueden retrasar tareas en segundo plano o cuando el dispositivo ahorra energía. Para fechas, escribe zona, criterio inclusivo y calendario. Repite los resultados críticos con la fuente contractual, administrativa o del sistema que los utilizará.',
  ],
  sections: [
    {
      heading: 'Elegir entre temporizador, cronómetro y cálculo de fecha',
      paragraphs: [
        'Una cuenta atrás responde cuánto falta; un cronómetro mide cuánto transcurre; un Pomodoro estructura sesiones; una calculadora de fecha opera sobre días civiles; un timestamp representa un instante. Elegir la categoría correcta evita convertir 24 horas en “un día” cuando el calendario o el cambio horario dice otra cosa.',
        'Define precisión necesaria. Para cocina o clase pueden bastar segundos; para facturación importa la regla de redondeo; para plazos administrativos manda la norma; para sistemas distribuidos conviene UTC y un identificador de zona. No atribuyas precisión jurídica o científica a una interfaz general.',
      ],
    },
    {
      heading: 'Cuenta atrás para tareas y transiciones',
      paragraphs: [
        'Configura una duración realista y explica qué ocurre al llegar a cero. Añade tiempo de preparación y cierre en reuniones o aula. Un temporizador visible ayuda a coordinar, pero puede aumentar presión; ofrece avisos intermedios o adaptación cuando sea necesario.',
        'No cierres la pestaña ni dependas de ella para medicación, seguridad o una salida urgente. El sistema operativo puede suspender el navegador. Para recordatorios críticos, usa una alarma del dispositivo o solución diseñada para ese propósito.',
      ],
      link: {
        prefix: 'Inicia una duración concreta con el ',
        label: 'Temporizador online',
        href: '/es/herramientas/temporizador-online/',
        suffix: ' manteniendo un respaldo para avisos críticos.',
      },
    },
    {
      heading: 'Cronómetro y vueltas',
      paragraphs: [
        'El cronómetro mide tiempo transcurrido y puede registrar vueltas. Define inicio y final antes de medir y evita detenerlo selectivamente. Para comparar sesiones, mantén condiciones y precisión similares. Una pantalla con centésimas no garantiza exactitud de laboratorio.',
        'En deporte, salud, trabajo o investigación, utiliza dispositivos calibrados y protocolos adecuados cuando el dato tenga consecuencias. El navegador es útil para práctica informal y observación personal, no para certificar marcas, tiempos laborales o medidas clínicas.',
      ],
      link: {
        prefix: 'Mide intervalos informales con el ',
        label: 'Cronómetro online',
        href: '/es/herramientas/cronometro-online/',
        suffix: ' y registra el criterio de inicio y final.',
      },
    },
    {
      heading: 'Pomodoro como estructura adaptable',
      paragraphs: [
        'El esquema habitual alterna concentración, pausa breve y descanso largo, pero 25 minutos no es una ley. Ajusta el bloque al tipo de tarea, energía y accesibilidad. Antes de iniciar, define una acción concreta y reduce interrupciones; durante la pausa, cambia de postura o descansa la vista.',
        'No uses ciclos para prolongar trabajo sin límite. Tras varias sesiones, revisa progreso y detente. Una pausa perdida no se “recupera” trabajando más. Para tareas creativas o reuniones, quizá funcione mejor un bloque largo con un punto de revisión.',
      ],
      link: {
        prefix: 'Configura ciclos con el ',
        label: 'Temporizador Pomodoro',
        href: '/es/herramientas/temporizador-pomodoro/',
        suffix: ' y modifica duraciones según la tarea.',
      },
    },
    {
      heading: 'Por qué un temporizador del navegador puede retrasarse',
      paragraphs: [
        'MDN explica que `setTimeout()` programa una ejecución futura, no bloquea el resto ni garantiza el instante exacto. Una pestaña inactiva, el hilo ocupado, la batería o el sistema pueden retrasar la llamada. Las implementaciones aplican límites diferentes y pueden suspender procesos.',
        'Una herramienta puede recalcular con el reloj actual para reducir deriva visible, pero no controla la suspensión completa. Mantén la pestaña activa, evita el modo ahorro y comprueba el reloj externo cuando la exactitud importe. No interpretes un sonido tardío como prueba de que la duración transcurrió mal.',
      ],
    },
    {
      heading: 'Diferencia entre fechas: días completos o calendario',
      paragraphs: [
        'Entre dos fechas puedes contar noches, días transcurridos, días calendario inclusivos o unidades de 24 horas. Del 1 al 2 hay un día transcurrido, pero dos fechas incluidas. Escribe la regla antes de aceptar el resultado, especialmente en reservas, antigüedad y plazos.',
        'Meses y años no tienen longitud fija. “Un mes después” suele ser una operación de calendario, no sumar treinta días. Revisa finales de mes y años bisiestos. Para contratos o trámites, utiliza la definición legal o administrativa aplicable.',
      ],
      link: {
        prefix: 'Compara fechas con la ',
        label: 'Calculadora de diferencia entre fechas',
        href: '/es/herramientas/calcular-diferencia-entre-fechas/',
        suffix: ' y declara si los extremos se incluyen.',
      },
    },
    {
      heading: 'Calcular edad en una fecha de corte',
      paragraphs: [
        'La edad cambia en el aniversario según el calendario civil. Introduce nacimiento y fecha de referencia; no uses solo el año. Para una convocatoria escolar, deportiva o administrativa, la regla puede hablar de edad cumplida en un día concreto o de año de nacimiento.',
        'Los nacimientos del 29 de febrero pueden recibir tratamiento específico en algunas reglas. La calculadora ofrece diferencia calendárica general y no interpreta una convocatoria. Comprueba siempre bases y documento de identidad autorizado.',
      ],
      link: {
        prefix: 'Obtén una diferencia calendárica con la ',
        label: 'Calculadora de edad',
        href: '/es/herramientas/calculadora-de-edad/',
        suffix: ' y aplica después la norma de corte.',
      },
    },
    {
      heading: 'Días laborables y festivos',
      paragraphs: [
        'Una calculadora puede excluir sábados, domingos y una lista manual de festivos. No conoce automáticamente todas las fiestas nacionales, autonómicas, locales, de empresa o del mercado correspondiente. Introduce el calendario correcto y define si inicio y fin cuentan.',
        'Día laborable, hábil administrativo y día de apertura bancaria no siempre coinciden. Para un plazo formal, consulta sede, calendario publicado y norma. Guarda la lista de festivos junto al resultado para que pueda repetirse.',
      ],
      link: {
        prefix: 'Prepara una estimación con la ',
        label: 'Calculadora de días laborables',
        href: '/es/herramientas/calculadora-dias-laborables/',
        suffix: ' añadiendo los festivos pertinentes.',
      },
    },
    {
      heading: 'Zonas horarias, UTC y horario de verano',
      paragraphs: [
        'Una zona como Europe/Madrid contiene reglas históricas y futuras; “UTC+1” es solo un desplazamiento fijo. El horario de verano crea horas inexistentes o repetidas. Para una reunión, guarda fecha, hora y zona; para sistemas, conserva el instante UTC y la zona de presentación.',
        'La base IANA se actualiza cuando gobiernos cambian reglas. Un dispositivo desactualizado puede convertir de forma distinta. No uses abreviaturas ambiguas como CST sin región. Comprueba eventos internacionales cerca de cambios estacionales.',
      ],
    },
    {
      heading: 'Unix timestamp, ISO 8601 y hora local',
      paragraphs: [
        'Unix cuenta segundos o milisegundos desde 1970-01-01T00:00:00Z según el sistema. Confundir segundos y milisegundos desplaza la fecha de forma drástica. ISO 8601 puede incluir Z u offset; una cadena sin zona puede interpretarse como local.',
        'Al convertir, verifica unidad, zona de salida y fecha legible. Para depuración, conserva el valor original. Un timestamp no expresa por sí solo la zona humana ni el calendario de negocio.',
      ],
      link: {
        prefix: 'Convierte formatos con el ',
        label: 'Conversor de timestamp Unix',
        href: '/es/herramientas/convertir-timestamp-unix/',
        suffix: ' comprobando segundos, milisegundos y zona.',
      },
    },
    {
      heading: 'Recordatorios de descanso y salud',
      paragraphs: [
        'Un recordatorio puede sugerir levantarse, parpadear o cambiar de postura, pero no diagnostica ni prescribe. Ajusta frecuencia a actividad y recomendaciones profesionales existentes. Si una pausa genera dolor o mareo, detén la actividad y busca orientación adecuada.',
        'El navegador puede silenciar audio o suspenderse. Coloca el aviso como apoyo, no como única medida de salud laboral. Combínalo con organización de tareas, ergonomía y políticas del lugar de trabajo.',
      ],
      link: {
        prefix: 'Programa avisos suaves con el ',
        label: 'Recordatorio de descansos',
        href: '/es/herramientas/recordatorio-descansos/',
        suffix: ' sin sustituir recomendaciones médicas.',
      },
    },
    {
      heading: 'Planificar reuniones y entregas entre países',
      paragraphs: [
        'Para una reunión internacional no compartas solo “a las 10”. Escribe fecha completa, hora, zona IANA —por ejemplo, Europe/Madrid— y, si ayuda, el instante UTC. Un enlace de calendario puede hacer la conversión, pero cada participante debe confirmar que su dispositivo tiene zona y reglas actualizadas. Cerca de un cambio de horario de verano, vuelve a revisar la convocatoria.',
        'Para una entrega, separa la hora de trabajo interna de la fecha límite contractual. Indica qué zona define el vencimiento y si se acepta hasta el inicio o el final del día. Si intervienen varias oficinas, registra la decisión en el sistema compartido y no la dejes solo en un mensaje relativo como “mañana por la tarde”.',
      ],
    },
    {
      heading: 'Fechas recurrentes, fin de mes y días no disponibles',
      paragraphs: [
        '“El mismo día de cada mes” necesita una regla cuando el mes no contiene el 29, 30 o 31. Decide si la fecha pasa al último día, salta ese mes o se mueve al siguiente día válido. Para una recurrencia laboral, añade qué sucede en fin de semana o festivo: anticipar, aplazar o mantener la fecha civil.',
        'Prueba una serie completa, no solo la primera aparición. Incluye febrero, año bisiesto, diciembre-enero y los cambios estacionales de zona. En pagos, nóminas, citas o trámites, la regla oficial prevalece sobre la que parezca más intuitiva; guarda la fuente junto a la configuración.',
      ],
    },
    {
      heading: 'Redondeo y conservación de registros de tiempo',
      paragraphs: [
        'Si conviertes segundos en minutos facturables, documenta cuándo y cómo redondeas: por evento, por bloque o sobre el total. Redondear cada intervalo puede producir un resultado distinto a sumar primero. Presenta el valor medido y el valor redondeado por separado para que la diferencia sea visible.',
        'No alteres registros laborales, médicos, deportivos o de acceso para hacerlos coincidir con una estimación. Conserva el dato original, la zona y la fuente del reloj. Las herramientas de esta página ayudan a comprobar y planificar; el sistema autorizado sigue siendo el registro válido.',
      ],
    },
    {
      heading: 'Privacidad en calendarios y registros',
      paragraphs: [
        'Para calcular intervalos no necesitas nombres, motivos médicos, direcciones ni detalles de citas. Introduce fechas mínimas o ejemplos. Evita proyectar calendarios personales y borra resultados en equipos compartidos.',
        'El cálculo local no crea una cuenta en FunnyTools, pero capturas, portapapeles y extensiones pueden exponer datos. Para horarios laborales, médicos o escolares usa el sistema autorizado y conserva solo la información necesaria.',
      ],
    },
    {
      heading: 'Lista de comprobación de tiempo y fechas',
      paragraphs: [
        'Define unidad, zona, inclusión de extremos, festivos y precisión. Para temporizadores, mantén la pestaña activa y un respaldo. Para fechas, prueba fin de mes, bisiesto y cambio horario cuando corresponda.',
        'Contrasta plazos críticos con la fuente oficial. Guarda entradas y versión del calendario. Una respuesta de tiempo es fiable cuando otra persona puede reproducirla con la misma regla.',
      ],
    },
  ],
  faq: [
    { q: '¿Qué diferencia hay entre temporizador y cronómetro?', a: 'El temporizador cuenta hacia cero desde una duración; el cronómetro mide el intervalo desde el inicio.' },
    { q: '¿Un temporizador funciona con la pestaña cerrada?', a: 'No debes asumirlo. El navegador o sistema puede suspenderlo; usa una alarma del dispositivo para avisos críticos.' },
    { q: '¿Pomodoro tiene que durar 25 minutos?', a: 'No. Es una estructura adaptable; elige bloques y pausas que encajen con la tarea y tus necesidades.' },
    { q: '¿La diferencia de fechas incluye inicio y final?', a: 'Depende de la regla. La herramienta debe mostrar su criterio; para un plazo formal confirma si los extremos cuentan.' },
    { q: '¿La calculadora de edad decide elegibilidad?', a: 'No. Calcula edad calendárica; la convocatoria puede usar una fecha de corte o regla especial.' },
    { q: '¿Los días laborables incluyen todos los festivos?', a: 'Solo los que la herramienta conoce o introduces. Añade fiestas nacionales, autonómicas, locales o específicas.' },
    { q: '¿Un timestamp está en hora local?', a: 'Unix representa un instante respecto a UTC. La hora local aparece al aplicar una zona y sus reglas.' },
    { q: '¿Puedo usar estas herramientas para un plazo legal?', a: 'Solo como comprobación auxiliar. Consulta la norma, sede y calendario oficial aplicables.' },
  ],
  review: {
    heading: 'Revisión de una medición temporal',
    intro: 'Tiempo técnico y tiempo civil coinciden solo cuando unidad, zona y regla están definidas.',
    checks: [
      { title: 'Regla', text: 'Unidad, zona, fecha de referencia e inclusión de extremos están escritas.' },
      { title: 'Entorno', text: 'Se consideraron suspensión del navegador, festivos y cambios de horario.' },
      { title: 'Fuente', text: 'Plazos críticos se contrastaron con calendario, contrato o sistema oficial.' },
    ],
  },
  sources: [
    { label: 'MDN: setTimeout()', href: 'https://developer.mozilla.org/es/docs/Web/API/Window/setTimeout', note: 'Ejecución asíncrona, retrasos y limitación de temporizadores en pestañas inactivas.' },
    { label: 'IANA Time Zone Database', href: 'https://www.iana.org/time-zones', note: 'Datos y reglas actualizadas de zonas horarias y horario de verano.' },
    { label: 'BOE: Estatuto de los Trabajadores', href: 'https://boe.es/buscar/act.php?id=BOE-A-2015-11430', note: 'Jornada, descanso, fiestas, permisos y vacaciones en España.' },
    { label: 'ISO: Date and time format', href: 'https://www.iso.org/iso-8601-date-and-time-format.html', note: 'Referencia del formato internacional de fechas y horas.' },
  ],
};

export const spanishDrawCategory: SpanishInfoPage = {
  title: 'Herramientas de dibujo, CAD y diagramas',
  seoTitle: 'Dibujo, CAD 2D y diagramas online gratis | FunnyTools',
  seoDescription: 'Crea bocetos, geometría CAD 2D y diagramas de flujo en el navegador, con criterios de escala, exportación, accesibilidad y revisión.',
  keywords: ['dibujo online gratis', 'CAD 2D online', 'crear diagrama de flujo', 'pizarra dibujo navegador', 'herramientas diseño rápido'],
  eyebrow: 'Bocetos y diagramas · exportación local · revisión visual',
  intro: 'Un boceto comunica una idea, un diagrama explica relaciones y un plano técnico exige unidades, tolerancias y validación. Esta colección distingue esos niveles para que una herramienta rápida no se confunda con software profesional. Puedes dibujar, organizar un flujo o construir geometría 2D en la pestaña; conserva versiones, exporta con intención y revisa accesibilidad antes de compartir.',
  directAnswer: [
    'Usa pizarra para anotación libre, flechas y explicación visual; diagrama de flujo para pasos, decisiones y conexiones; CAD 2D para líneas, rectángulos, círculos y medidas geométricas básicas. Si el resultado afecta construcción, fabricación, seguridad, instalaciones o una entrega regulada, vuelve a crearlo y comprobarlo con software, normas y profesionales adecuados.',
    'Define antes propósito, público, tamaño de salida, unidades y nivel de precisión. Trabaja por versiones y prueba la exportación. Añade texto equivalente a la información visual, no dependas solo del color y conserva el archivo fuente o los datos necesarios para editar.',
  ],
  sections: [
    {
      heading: 'Elegir entre pizarra, diagrama y CAD 2D',
      paragraphs: [
        'La pizarra prioriza velocidad y gesto; el diagrama prioriza estructura semántica; CAD prioriza geometría y medidas. Una flecha dibujada a mano puede bastar en una tutoría, pero un proceso con varias decisiones necesita nodos consistentes. Una pieza con dimensión requiere unidades y restricciones que un dibujo libre no ofrece.',
        'Escribe el propósito en una frase y el criterio de terminado. Decide si el archivo se verá en móvil, se imprimirá, se editará o se incorporará a otro documento. Elegir por herramienta favorita, en vez de por salida, genera trabajo de reconstrucción.',
      ],
    },
    {
      heading: 'Preparar lienzo, tamaño y fondo',
      paragraphs: [
        'Elige orientación y proporción cercanas al destino. Una imagen panorámica encaja en presentación; A4 vertical sirve para una hoja; un cuadrado puede funcionar en redes. Deja margen para etiquetas y evita colocar información esencial al borde.',
        'Decide fondo transparente o sólido. La transparencia puede mostrarse negra en ciertos destinos; el blanco puede perder líneas claras. Haz una exportación temprana y ábrela fuera de la herramienta para comprobar resolución, color y recorte.',
      ],
    },
    {
      heading: 'Dibujo libre para explicar, no para medir',
      paragraphs: [
        'La pizarra permite trazo, color, grosor, formas y borrado. Úsala para esquemas, anotaciones y demostraciones. Trabaja de lo general a lo particular: marco, relaciones, etiquetas y énfasis. Evita llenar el lienzo antes de decidir jerarquía.',
        'Un trazo visual no tiene precisión métrica aunque parezca recto. No midas distancias reales desde píxeles sin escala y calibración. Para información importante, escribe valores y supuestos en vez de confiar en la proporción aparente.',
      ],
      link: {
        prefix: 'Crea una explicación rápida con la ',
        label: 'Pizarra de dibujo online',
        href: '/es/herramientas/pizarra-dibujo-online/',
        suffix: ' y exporta una copia de revisión.',
      },
    },
    {
      heading: 'Diagramas de flujo con símbolos coherentes',
      paragraphs: [
        'Utiliza inicio/fin, proceso, decisión y flechas con significado estable. Redacta nodos con verbos y una sola acción. Etiqueta las salidas de una decisión y evita cruces innecesarios. Un flujo debe poder leerse sin que el autor lo explique oralmente.',
        'Empieza con el camino principal y añade excepciones después. Comprueba que cada nodo sea alcanzable, que toda decisión tenga salidas y que los ciclos tengan una condición de salida. Si el proceso cambia con frecuencia, conserva una fecha y persona responsable.',
      ],
      link: {
        prefix: 'Organiza pasos con el ',
        label: 'Creador de diagramas de flujo',
        href: '/es/herramientas/crear-diagrama-flujo/',
        suffix: ' y recorre cada ruta con un ejemplo.',
      },
    },
    {
      heading: 'CAD 2D básico y límites de precisión',
      paragraphs: [
        'El CAD 2D del navegador permite geometría simple y cotas orientativas. Define unidad antes de dibujar y mantén una escala lógica. Introduce medidas numéricas cuando sea posible; no estimes por apariencia ni por tamaño de pantalla.',
        'No incluye toda la gestión de capas, restricciones, tolerancias, bloques, impresión a escala, interoperabilidad ni verificación de software profesional. Un plano de obra, fabricación, electricidad o seguridad requiere normas, revisión y formatos específicos.',
      ],
      link: {
        prefix: 'Explora geometría con ',
        label: 'CAD 2D online',
        href: '/es/herramientas/cad-2d-online/',
        suffix: ' sin usarlo como plano certificado.',
      },
    },
    {
      heading: 'Unidades, escala y tolerancia',
      paragraphs: [
        'No mezcles milímetros, centímetros, metros, pulgadas y píxeles. Escribe la unidad junto a dimensiones y define qué representa la escala. Una captura redimensionada pierde relación física; una cota escrita conserva el valor, aunque todavía necesita verificación.',
        'La tolerancia indica variación admisible y depende de función y proceso. Una herramienta simple no la decide. Para fabricación o instalación, utiliza normas y capacidad real del proceso, y revisa con la persona responsable.',
      ],
    },
    {
      heading: 'Capas conceptuales y orden visual',
      paragraphs: [
        'Aunque la herramienta no ofrezca capas profesionales, organiza mentalmente fondo, estructura, anotación y énfasis. Termina una categoría antes de sobrecargar otra. Usa alineación y espacios repetidos para que relaciones similares parezcan similares.',
        'Crea versiones antes de cambios grandes. Un archivo “final2” no explica qué cambió; usa fecha o número y una nota breve. Conserva una copia limpia antes de marcar comentarios.',
      ],
    },
    {
      heading: 'Color, contraste y significado',
      paragraphs: [
        'Asigna una función al color: estado, categoría o énfasis. Limita la paleta y comprueba contraste. Rojo y verde juntos pueden ser difíciles de distinguir; añade texto, forma, patrón o icono. No uses un tono decorativo como única señal de error.',
        'Prueba en escala de grises, pantalla pequeña y proyector. Un color que funciona en tu monitor puede perderse al imprimir. Mantén etiquetas cerca del elemento y evita leyendas que obliguen a memorizar muchas correspondencias.',
      ],
    },
    {
      heading: 'Texto, tipografía y etiquetas',
      paragraphs: [
        'Usa frases breves, tamaño legible y jerarquía consistente. Evita párrafos dentro de cajas pequeñas. Alinea etiquetas y deja espacio para traducciones si el material tendrá varios idiomas.',
        'No conviertas texto esencial en imagen cuando puede permanecer como texto en el documento final. Si la exportación es una imagen, proporciona el contenido en una descripción o documento adjunto. Revisa tildes, saltos y recorte.',
      ],
    },
    {
      heading: 'Accesibilidad de diagramas e imágenes complejas',
      paragraphs: [
        'W3C WAI indica que gráficos y diagramas necesitan una alternativa textual que comunique la información. Escribe propósito, estructura, relaciones y conclusión, no una lista de colores. Para un flujo, enumera pasos y ramas en orden.',
        'Añade alt breve cuando la imagen tenga función sencilla y una descripción extensa cuando la información sea compleja. Asegura navegación y contenido equivalente fuera del lienzo cuando el destino lo permita. Una imagen accesible beneficia también a móvil, baja conexión y buscadores.',
      ],
    },
    {
      heading: 'Exportar PNG y comprobar la salida',
      paragraphs: [
        'Antes de exportar, revisa borde, fondo, resolución y relación de aspecto. Abre el PNG en otro visor y amplía al tamaño de uso. Comprueba líneas finas, texto, transparencia y que no falten objetos fuera del lienzo.',
        'Una imagen rasterizada pierde edición estructural. Conserva el estado editable o datos fuente. Para impresión, confirma resolución física y prueba una página; para web, equilibra nitidez y peso.',
      ],
    },
    {
      heading: 'Revisión colaborativa y control de cambios',
      paragraphs: [
        'Para pedir comentarios, publica una versión numerada y formula preguntas concretas: “¿falta alguna salida de esta decisión?” funciona mejor que “¿qué os parece?”. Reúne las observaciones en un canal y asigna cada cambio a una persona. Si varias copias circulan por correo, una corrección válida puede terminar aplicada sobre una versión antigua.',
        'Conserva una nota breve con fecha, autor, motivo y elementos modificados. Distingue comentario, aprobación y verificación técnica: una persona puede aceptar la presentación visual sin validar medidas o proceso. Antes de cerrar, compara la exportación con la versión aprobada y marca claramente cuál es vigente.',
      ],
    },
    {
      heading: 'Diagrama de proceso frente a gráfico estadístico',
      paragraphs: [
        'Un diagrama de flujo representa secuencia, decisiones y relaciones; no demuestra por sí mismo cuántos casos siguen cada rama. Un gráfico de barras, líneas o dispersión representa datos cuantitativos, pero no sustituye la lógica operativa. Si necesitas ambas cosas, mantenlas separadas y conecta cada cifra con su fuente.',
        'No conviertas el ancho de una flecha, el tamaño de una caja o la superficie de un círculo en cantidad salvo que exista una escala y leyenda explícitas. Para porcentajes, incluye denominador, periodo y método. Para procesos, prueba rutas reales y excepciones. La forma visual nunca debe insinuar evidencia que los datos no contienen.',
      ],
    },
    {
      heading: 'Vectores, resolución e impresión',
      paragraphs: [
        'SVG describe formas vectoriales que pueden escalar sin la pixelación de un PNG, pero el archivo final todavía debe probarse en el programa y navegador de destino. Fuentes, filtros, máscaras y elementos externos pueden renderizarse de forma distinta. Cuando entregues SVG, incluye una vista de referencia y convierte texto a curvas solo si la edición y accesibilidad ya no son necesarias.',
        'Para impresión rasterizada, define tamaño físico antes de elegir resolución; muchos píxeles no corrigen un original borroso. Haz una prueba al cien por cien, revisa líneas finas, márgenes y contraste, y confirma si la imprenta necesita sangrado o perfil de color. Un PDF o PNG exportado no garantiza automáticamente escala física exacta.',
      ],
    },
    {
      heading: 'Prueba de comprensión con una persona ajena al dibujo',
      paragraphs: [
        'Entrega el gráfico sin explicación oral y pide que describan propósito, recorrido y conclusión. Observa dónde dudan, qué etiqueta interpretan de otra manera y si detectan el siguiente paso. Esta prueba revela supuestos que el autor ya no ve por familiaridad.',
        'Corrige primero estructura y lenguaje; el acabado visual viene después. Repite con una pantalla pequeña o una copia impresa según el destino. Si la persona necesita tu explicación para usar el dibujo, todavía falta información en la propia entrega.',
      ],
    },
    {
      heading: 'Privacidad y propiedad intelectual',
      paragraphs: [
        'No dibujes planos de seguridad, datos personales, credenciales o información interna en un equipo compartido. El procesamiento local reduce envío a FunnyTools, pero capturas, descargas y portapapeles permanecen en el dispositivo.',
        'Utiliza iconos, imágenes y marcas con permiso. Un diagrama propio puede incorporar material protegido. Registra fuentes y licencias, y no elimines atribución exigida. Para clientes, acuerda quién conserva archivos editables.',
      ],
    },
    {
      heading: 'Cuándo pasar a software profesional',
      paragraphs: [
        'Migra cuando necesites unidades certificadas, impresión a escala, capas complejas, colaboración, control de cambios, vectores interoperables, tolerancias, bibliotecas técnicas o cumplimiento normativo. La herramienta rápida puede servir para el brief y la discusión inicial.',
        'No esperes al final si el destino ya exige DWG, DXF, SVG accesible, PDF técnico u otro formato. Prueba el flujo de entrega con una muestra. Reconstruir un dibujo terminado suele costar más que empezar en el entorno correcto.',
      ],
    },
    {
      heading: 'Lista de comprobación antes de compartir',
      paragraphs: [
        'Confirma propósito, público, unidad, escala, etiquetas, contraste, descripción textual, versión y formato. Recorre el diagrama con un caso y coteja medidas críticas con una fuente independiente.',
        'Abre la exportación en móvil y escritorio, y prueba impresión si procede. Conserva editable y original. Marca claramente “boceto” o “no apto para construcción” cuando alguien pudiera atribuirle precisión que no tiene.',
      ],
    },
  ],
  faq: [
    { q: '¿Qué diferencia hay entre pizarra, diagrama y CAD?', a: 'Pizarra prioriza trazo libre; diagrama organiza relaciones; CAD trabaja geometría y medidas. Cada salida tiene distinto nivel de precisión.' },
    { q: '¿El CAD 2D sirve para planos de obra?', a: 'No como documento definitivo. Un plano de construcción requiere software, normas, escalas y revisión profesional.' },
    { q: '¿Puedo medir una distancia por los píxeles?', a: 'No sin escala y calibración. Escribe unidades y cotas; la apariencia en pantalla cambia con zoom y exportación.' },
    { q: '¿Cómo hago accesible un diagrama?', a: 'Añade texto equivalente que explique propósito, pasos, ramas, relaciones y conclusión; no dependas solo del color.' },
    { q: '¿Qué debo revisar al exportar PNG?', a: 'Bordes, fondo, resolución, texto, líneas, transparencia y tamaño final en otro visor.' },
    { q: '¿Una imagen PNG conserva objetos editables?', a: 'No. Es rasterizada; conserva el estado o archivo fuente para editar.' },
    { q: '¿Los dibujos se suben a FunnyTools?', a: 'Las herramientas españolas trabajan en el navegador, pero las descargas y capturas quedan en tu dispositivo.' },
    { q: '¿Cuándo debo cambiar a software profesional?', a: 'Cuando necesitas formatos técnicos, colaboración, tolerancias, impresión a escala, normativa o una entrega certificada.' },
  ],
  review: {
    heading: 'Revisión de un dibujo o diagrama',
    intro: 'La salida debe comunicar su propósito y su nivel real de precisión sin depender del autor.',
    checks: [
      { title: 'Estructura', text: 'Herramienta, lienzo, unidad y jerarquía corresponden al destino.' },
      { title: 'Accesibilidad', text: 'Texto, contraste y descripción equivalente permiten entender la información.' },
      { title: 'Entrega', text: 'La exportación se abrió fuera de la herramienta y se conservó una versión editable.' },
    ],
  },
  sources: [
    { label: 'W3C WAI: tutorial de imágenes', href: 'https://www.w3.org/WAI/tutorials/images/', note: 'Alternativas para imágenes informativas, funcionales, decorativas y complejas.' },
    { label: 'W3C WAI: principios de accesibilidad', href: 'https://www.w3.org/WAI/fundamentals/accessibility-principles/', note: 'Texto equivalente, contraste, color y contenido perceptible.' },
    { label: 'W3C: SVG 2', href: 'https://www.w3.org/TR/SVG2/', note: 'Especificación de gráficos vectoriales escalables.' },
    { label: 'ISO: technical drawings', href: 'https://www.iso.org/ics/01.100/x/', note: 'Catálogo de normas internacionales relacionadas con dibujo técnico.' },
  ],
};
