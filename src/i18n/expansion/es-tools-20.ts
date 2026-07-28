import type { ToolContent } from '../tools/_types';

export const spanishBreakReminder: ToolContent = {
  name: 'Recordatorio de descansos',
  short: 'Programa intervalos de trabajo y pausas con una cuenta atrás visual y un aviso sonoro opcional.',
  long: 'Este recordatorio de descansos alterna un intervalo de trabajo y una pausa dentro de la pestaña. Puedes elegir entre 1 y 240 minutos para cada fase, pausar la cuenta, reiniciarla y activar un sonido breve. El tiempo restante se recalcula desde una hora objetivo para reducir la deriva de los temporizadores del navegador. No envía notificaciones del sistema, no funciona después de cerrar la pestaña y no prescribe una frecuencia saludable universal.',
  seoTitle: 'Recordatorio de descansos | Temporizador de pausas',
  seoDescription: 'Configura un recordatorio de descansos para la pantalla con intervalos de trabajo, pausas, cuenta atrás visual y sonido opcional en el navegador.',
  keywords: [
    'recordatorio de descansos',
    'recordatorio para descansar de la pantalla',
    'temporizador de pausas',
    'alarma para levantarse del escritorio',
    'descanso pantalla',
    'recordatorio de estiramiento',
    'intervalos de trabajo y descanso',
    'temporizador descanso trabajo',
  ],
  capabilities: [
    'Elegir un intervalo de trabajo de 1 a 240 minutos.',
    'Definir una pausa de 1 a 240 minutos y alternar ambas fases.',
    'Pausar y continuar la cuenta sin perder el tiempo restante.',
    'Activar un pitido breve generado en el navegador.',
    'Consultar cuántos recordatorios de pausa se han alcanzado en la sesión.',
  ],
  contentSections: [
    {
      heading: 'Respuesta rápida: cómo crear un recordatorio para descansar',
      paragraphs: [
        'Escribe cuántos minutos quieres trabajar y cuánto debe durar la pausa. Marca el sonido solo si quieres un pitido y el entorno lo permite. Pulsa «Iniciar» y mantén la pestaña abierta. Al terminar el intervalo de trabajo, el panel cambia a la fase de descanso y aumenta el contador de recordatorios. Después de la pausa, la herramienta se detiene para que decidas cuándo comenzar el siguiente bloque.',
        'El valor inicial de 50 minutos de trabajo y 5 de pausa es solo una configuración editable. No representa una receta médica ni una obligación laboral. Una tarea de alta precisión, una reunión, una clase o una condición de salud pueden requerir otro ritmo. La mejor configuración es la que puedes cumplir sin ignorar las necesidades del puesto, las señales del cuerpo y las normas de tu organización.',
      ],
    },
    {
      heading: 'Qué ocurre durante el intervalo de trabajo y la pausa',
      paragraphs: [
        'La primera fase se etiqueta como «Próximo descanso». La cuenta baja hasta cero y después cambia automáticamente a «Pausa». El tiempo de pausa también se cuenta hacia atrás. Cuando termina, la sesión queda preparada para volver al trabajo, pero no inicia otro bloque por su cuenta. Esta parada evita encadenar ciclos indefinidos si abandonas el equipo o ya no necesitas el recordatorio.',
        'El botón «Pausar» congela la fase actual. Al continuar, la hora final se reconstruye desde los segundos que quedaban. «Restablecer» vuelve a la fase de trabajo, borra el contador de avisos y toma los minutos visibles en los campos. Si cambias una duración mientras no está funcionando, la pantalla se actualiza con el nuevo valor. Los campos solo admiten minutos enteros entre 1 y 240.',
      ],
    },
    {
      heading: 'Pausas de pantalla: orientación, no una cifra universal',
      paragraphs: [
        'El Instituto Nacional de Seguridad y Salud en el Trabajo de España explica que las pausas deben adaptarse a la exigencia de la tarea y que conviene alternar con actividades sin pantalla. Como orientación, menciona pausas de unos 10 o 15 minutos por cada 90 minutos de pantalla y, para trabajos que exigen mucha atención o precisión, al menos 10 minutos cada 60 minutos. También aclara que la legislación española no fija un tiempo máximo universal ante una pantalla.',
        'Esos valores no convierten al temporizador en una evaluación ergonómica. La duración adecuada puede depender de la postura, la iluminación, el tamaño de texto, la carga mental, la capacidad visual, la autonomía y las pausas que ya forman parte del trabajo. Si existe dolor, visión borrosa persistente, mareo, hormigueo u otro síntoma, un aviso web no sustituye la valoración de prevención de riesgos o de un profesional sanitario.',
      ],
      link: {
        prefix: 'Consulta la respuesta oficial en las ',
        label: 'preguntas sobre riesgos ergonómicos del INSST',
        href: 'https://www.insst.es/materias/riesgos/riesgos-ergonomicos/faq',
        suffix: '.',
      },
    },
    {
      heading: 'Por qué una pestaña en segundo plano puede avisar tarde',
      paragraphs: [
        'Los navegadores reducen la frecuencia de los temporizadores cuando una pestaña permanece oculta, el dispositivo entra en reposo o el sistema intenta ahorrar batería. Esta herramienta no descuenta un segundo de manera ciega: conserva una hora objetivo y vuelve a calcular lo que falta cuando recibe tiempo de ejecución. Eso reduce la deriva acumulada, pero no obliga al sistema a despertar la pestaña exactamente en el instante previsto.',
        'Si el ordenador estuvo suspendido y la hora objetivo ya pasó, el siguiente ciclo del navegador detectará el vencimiento y cambiará de fase. El aviso puede llegar tarde respecto del reloj real. Para una pausa crítica, una medicación, una cita, un control de seguridad o cualquier evento que deba sonar aunque el navegador esté cerrado, utiliza la alarma o las notificaciones del sistema operativo y comprueba sus permisos.',
      ],
    },
    {
      heading: 'Sonido opcional y límites de reproducción automática',
      paragraphs: [
        'El pitido se sintetiza con Web Audio y no descarga un archivo externo. Al pulsar «Iniciar», la página intenta preparar el contexto de audio dentro de esa interacción. Aun así, el navegador, el modo silencio, el volumen, los auriculares, una política corporativa o una configuración de accesibilidad pueden impedir que se oiga. La transición visual y el contador siguen funcionando si el sonido falla.',
        'No uses el pitido en una biblioteca, una llamada, un aula o un espacio compartido sin considerar a otras personas. Mantenerlo desactivado no reduce la función principal. Si necesitas comprobarlo, empieza con un intervalo corto y observa una transición completa antes de confiar en él. La herramienta no cambia el volumen del dispositivo ni puede garantizar que el canal de audio elegido sea el que esperas.',
      ],
    },
    {
      heading: 'Diferencia entre este recordatorio y un Pomodoro',
      paragraphs: [
        'Un temporizador Pomodoro suele organizar bloques con una metodología concreta, contar rondas y, en algunas variantes, introducir una pausa larga después de varios ciclos. Este recordatorio solo alterna una duración de trabajo y una duración de pausa. No impone 25 y 5 minutos, no agrupa cuatro rondas, no almacena tareas y no interpreta productividad. Puedes usar una proporción parecida, pero la página no afirma aplicar todo el método.',
        'También se diferencia de una alarma: una alarma suele apuntar a una hora concreta, mientras que aquí el objetivo es un intervalo desde el momento en que pulsas iniciar. Si quieres terminar a las 17:30, utiliza el temporizador de cuenta atrás con fecha y hora. Si quieres medir cuánto tardas sin una duración previa, utiliza el cronómetro. Elegir la herramienta correcta evita esperar funciones que este recordatorio no tiene.',
      ],
    },
    {
      heading: 'Ejemplos para estudio, oficina y trabajo creativo',
      paragraphs: [
        'Durante una sesión de lectura, una persona puede configurar 45 minutos y una pausa de 7. En la pausa deja de mirar la pantalla, cambia de postura y decide conscientemente si inicia otra ronda. En soporte o análisis de datos, el aviso puede servir como señal para levantarse, beber agua o revisar la distancia a la pantalla, siempre que la organización permita esa planificación.',
        'En diseño, programación o escritura, una interrupción demasiado frecuente puede romper el contexto. En ese caso conviene probar intervalos más largos y pausas reales, en vez de silenciar repetidamente una alarma molesta. El contador de recordatorios solo describe cuántas fases de trabajo han terminado en la pestaña actual; no mide concentración, salud, rendimiento, pasos ni cumplimiento de un plan.',
      ],
    },
    {
      heading: 'Privacidad, historial y datos que no se guardan',
      paragraphs: [
        'Las duraciones, la fase, los segundos restantes y el número de avisos existen en la memoria de esta pestaña. FunnyTools no los envía a un servidor y no pide una cuenta. Al recargar o cerrar, se pierde la sesión. La herramienta tampoco lee el calendario, otras pestañas, la actividad del teclado, la cámara, el micrófono ni aplicaciones abiertas.',
        'No se crea un historial diario, semanal o médico. Si quieres estudiar tus hábitos, anota por separado la hora, la tarea y cómo te sentías, procurando no convertir un recuento simple en un diagnóstico. En un dispositivo compartido, cerrar la pestaña elimina la pantalla actual, pero el historial general del navegador puede conservar la visita según su configuración.',
      ],
    },
    {
      heading: 'Cuándo no conviene depender de esta herramienta',
      paragraphs: [
        'No dependas de ella cuando el aviso deba sobrevivir a un reinicio, sincronizarse entre dispositivos, aparecer sobre otras aplicaciones o quedar registrado para auditoría. Tampoco sirve para controlar turnos, fichajes, descansos obligatorios, pausas compensadas o límites de jornada. Esos usos requieren reglas laborales, sistemas autorizados y registros más sólidos que una pestaña local.',
        'El recordatorio puede apoyar una rutina, pero no demuestra que una pausa haya ocurrido ni que haya sido suficiente. Si el trabajo impide descansar, el problema no se resuelve cambiando el temporizador. Revisa la organización de la tarea, la evaluación ergonómica y los canales de prevención disponibles. Para molestias persistentes o necesidades de adaptación, busca ayuda cualificada.',
      ],
    },
  ],
  instructions: [
    'Introduce minutos enteros para el intervalo de trabajo y la pausa.',
    'Activa el sonido solo si quieres un pitido y tu entorno lo permite.',
    'Pulsa «Iniciar» y deja abierta la pestaña mientras cuenta.',
    'Usa «Pausar» para congelar la fase o «Restablecer» para comenzar de nuevo.',
    'Al terminar la pausa, decide conscientemente si quieres iniciar otro bloque.',
  ],
  examples: [
    'Recordar una pausa breve durante una sesión larga de lectura.',
    'Alternar trabajo de escritorio con una tarea sin pantalla.',
    'Crear una señal para levantarse durante una jornada de análisis de datos.',
    'Probar distintas duraciones sin instalar una aplicación ni crear una cuenta.',
  ],
  audience: [
    'Personas que estudian o trabajan durante periodos prolongados frente a una pantalla.',
    'Equipos que pueden organizar pausas breves dentro de su actividad.',
    'Usuarios que quieren un temporizador local, simple y sin historial.',
    'Quienes desean experimentar con intervalos antes de elegir una rutina.',
  ],
  caseStudies: [
    {
      title: 'Lectura de alta concentración',
      description: 'Una estudiante prueba 50 minutos de lectura y 10 de pausa, pero ajusta el intervalo si la fatiga aparece antes y no interpreta el valor como consejo médico.',
    },
    {
      title: 'Pestaña suspendida',
      description: 'Un portátil entra en reposo durante la cuenta. Al volver, la página detecta que el objetivo ya pasó, pero el usuario entiende que el aviso no fue puntual y usa una alarma del sistema para futuras tareas críticas.',
    },
    {
      title: 'Oficina compartida',
      description: 'Un analista deja el sonido apagado y conserva solo el cambio visual para no interrumpir llamadas de otras personas.',
    },
  ],
  notes: [
    'La pestaña debe permanecer abierta y el navegador puede retrasar tareas en segundo plano.',
    'El sonido depende de permisos, volumen, salida de audio y políticas del dispositivo.',
    'Las duraciones iniciales son ejemplos editables, no una recomendación clínica universal.',
    'No envía notificaciones del sistema ni guarda historial.',
    'No sustituye una evaluación ergonómica, laboral o sanitaria.',
  ],
  faq: [
    {
      q: '¿Cómo poner un recordatorio para descansar de la pantalla?',
      a: 'Elige los minutos de trabajo y pausa, activa o no el sonido y pulsa «Iniciar». Mantén la pestaña abierta para ver la transición.',
    },
    {
      q: '¿Seguirá avisando si cierro el navegador?',
      a: 'No. La cuenta existe solo en la pestaña actual y se pierde al cerrarla o recargarla.',
    },
    {
      q: '¿Funciona en segundo plano?',
      a: 'Puede continuar, pero el navegador o el dispositivo pueden retrasar la ejecución. No lo uses para avisos críticos.',
    },
    {
      q: '¿Por qué no escuché el sonido?',
      a: 'El navegador, el modo silencio, el volumen o la salida de audio pueden bloquearlo. La señal visual sigue disponible.',
    },
    {
      q: '¿Aplica la regla 20-20-20?',
      a: 'No impone una regla concreta. Puedes escribir la duración que quieras, pero la herramienta no prescribe hábitos médicos.',
    },
    {
      q: '¿Es un temporizador Pomodoro?',
      a: 'No exactamente. Alterna trabajo y pausa, pero no cuenta series de cuatro ni programa pausas largas.',
    },
    {
      q: '¿Guarda cuántas pausas hice durante la semana?',
      a: 'No. El contador solo vive durante la sesión de la pestaña y no demuestra que la pausa se haya realizado.',
    },
    {
      q: '¿Sirve para tratar fatiga visual o dolor?',
      a: 'No. Es un apoyo de hábito. Para síntomas, adaptaciones o evaluación del puesto, consulta a profesionales cualificados.',
    },
  ],
  labels: {
    intervalMinutes: 'Intervalo de trabajo (minutos)',
    breakMinutes: 'Duración de la pausa (minutos)',
    sound: 'Reproducir un sonido',
    start: 'Iniciar',
    pause: 'Pausar',
    continue: 'Continuar',
    reset: 'Restablecer',
    ready: 'Listo para empezar',
    focus: 'Próximo descanso',
    breakTime: 'Pausa',
    reminders: 'recordatorios alcanzados',
    nextBreak: 'Próximo aviso',
    minutesError: 'Introduce minutos enteros entre 1 y 240.',
    timeToMove: 'Es hora de hacer una pausa',
    breakDone: 'Pausa terminada; decide si quieres volver',
    minsAbbr: 'min',
    secsAbbr: 's',
  },
  privacyNote: 'El intervalo, la fase y el contador permanecen en esta pestaña. FunnyTools no los sube ni guarda un historial.',
  disclaimer: 'Es un recordatorio de hábito, no una prescripción médica, evaluación ergonómica, registro laboral ni alarma crítica. Adapta las pausas al trabajo y busca ayuda cualificada si existe malestar.',
};

export const spanishBreakReminderReview = {
  heading: 'Cómo revisar un recordatorio de descansos',
  intro: 'Una rutina útil deja claros el alcance del aviso, los límites del navegador y la razón de la pausa.',
  panels: [
    { title: 'Duración', text: 'Elige un intervalo que puedas cumplir y revisa si la tarea exige pausas distintas.' },
    { title: 'Aviso', text: 'Comprueba el sonido y la transición visual antes de depender de ellos.' },
    { title: 'Alcance', text: 'Recuerda que cerrar, recargar o suspender el dispositivo puede interrumpir la sesión.' },
  ],
  checklistHeading: 'Lista de comprobación',
  checklist: [
    'Las duraciones están entre 1 y 240 minutos.',
    'La pestaña permanecerá abierta durante el intervalo.',
    'Un aviso importante también dispone de una alarma del sistema.',
    'El temporizador no se utiliza como diagnóstico ni registro laboral.',
  ],
};

export const spanishNetSalary: ToolContent = {
  name: 'Calculadora de sueldo neto',
  short: 'Estima el sueldo neto mensual con importe bruto, complementos, porcentajes y deducciones que tú puedes editar.',
  long: 'Esta calculadora de sueldo neto aplica un modelo transparente y no vinculado a un país: suma el sueldo bruto mensual y los complementos, resta cuatro porcentajes aplicados al bruto y descuenta otro importe fijo. Los nombres de las aportaciones son orientativos y todos los valores se pueden cambiar. No consulta tablas fiscales, situación familiar, convenios, topes, bases de cotización ni reglas de una nómina real. La salida usa la misma moneda que tus entradas y es solo una estimación aritmética.',
  seoTitle: 'Calculadora de sueldo neto | De bruto a neto',
  seoDescription: 'Calcula un sueldo neto mensual aproximado desde el salario bruto, complementos, cotizaciones, retención fiscal y otras deducciones editables.',
  keywords: [
    'calculadora sueldo neto',
    'calcular salario neto',
    'sueldo bruto a neto',
    'salario neto mensual',
    'cuánto cobraré neto',
    'calculadora nómina',
    'retenciones de sueldo',
    'cotizaciones y salario neto',
  ],
  capabilities: [
    'Sumar sueldo bruto mensual y complementos fijos.',
    'Aplicar hasta cuatro porcentajes editables sobre el importe bruto.',
    'Restar anticipos, cuotas u otras deducciones como importe fijo.',
    'Comparar ingreso bruto, deducciones estimadas y neto.',
    'Copiar el resultado junto con la fórmula y la advertencia de supuestos.',
  ],
  contentSections: [
    {
      heading: 'Respuesta rápida: cómo calcular el sueldo bruto a neto',
      paragraphs: [
        'Introduce el sueldo bruto del periodo y los complementos que quieras sumar. Sustituye los cuatro porcentajes por los que figuran en tu nómina, una simulación oficial o información de la empresa. Añade como importe fijo cualquier deducción que no quieras modelar como porcentaje. La calculadora suma los ingresos, aplica las tasas sobre el sueldo bruto y muestra el neto estimado.',
        'La operación es útil para probar un escenario, no para descubrir automáticamente tus impuestos. Si escribes 2.000 de bruto, 100 de complementos, porcentajes que suman 15 y 50 de otras deducciones, el resultado será 1.750 en la moneda que estés usando: 2.100 menos 300 menos 50. La página no sabe si esos porcentajes son correctos ni si el complemento debe cotizar.',
      ],
    },
    {
      heading: 'Sueldo bruto, devengos, deducciones y líquido',
      paragraphs: [
        'El sueldo bruto es la cantidad antes de las deducciones del trabajador, pero una nómina puede separar salario base, complementos, pagas extraordinarias, beneficios en especie y otros devengos. Esta herramienta ofrece un campo bruto y uno de complementos para mantener el cálculo legible. Si una partida tiene un tratamiento distinto, no la mezcles sin comprobar cómo afecta a la base.',
        'El sueldo neto o líquido es lo que queda después de restar cotizaciones, retenciones y otras deducciones. No es lo mismo que el coste total para la empresa, que puede incluir aportaciones patronales y conceptos fuera del recibo del trabajador. Tampoco es necesariamente el dinero disponible después de gastos personales. La salida solo describe el modelo que aparece en pantalla.',
      ],
    },
    {
      heading: 'Por qué no existe un porcentaje universal de sueldo neto',
      paragraphs: [
        'Los países de habla española tienen sistemas distintos y dentro de un mismo país pueden cambiar bases, topes, tipos de contrato, regiones, situación familiar, beneficios, exenciones y periodicidad. Incluso dos personas con el mismo bruto pueden ver retenciones diferentes. Por eso la calculadora no selecciona automáticamente España, México, Argentina, Colombia, Chile ni otro territorio.',
        'En España, la Agencia Tributaria publica un servicio y un algoritmo específico para calcular retenciones del trabajo, y la Seguridad Social explica que las cuotas se obtienen aplicando tipos a bases de cotización. Esa complejidad no cabe en sumar cuatro porcentajes. En otros países cambian tanto los nombres como las instituciones y las reglas. Usa la fuente oficial de tu jurisdicción y traslada solo los datos compatibles con esta fórmula.',
      ],
      link: {
        prefix: 'Para España, consulta el ',
        label: 'servicio oficial de retenciones de la Agencia Tributaria',
        href: 'https://sede.agenciatributaria.gob.es/Sede/Retenciones.shtml',
        suffix: '.',
      },
    },
    {
      heading: 'Qué escribir en los cuatro porcentajes editables',
      paragraphs: [
        'El primer campo puede agrupar cotizaciones sociales del trabajador. El segundo puede representar una aportación adicional, seguro o cuota periódica. El tercero está pensado para una aportación voluntaria a pensión o ahorro salarial. El cuarto es una retención fiscal estimada. Son etiquetas funcionales, no categorías legales universales, y todos se aplican sobre el sueldo bruto introducido.',
        'Si tu recibo calcula cada concepto sobre una base diferente, el modelo simplificado no reproduce la nómina. Puedes convertir el importe real de cada descuento a un porcentaje efectivo del bruto para una comparación aproximada, o dejar los porcentajes en cero y sumar los descuentos conocidos en «Otras deducciones fijas». Conserva por escrito de dónde salió cada dato y el periodo al que corresponde.',
      ],
    },
    {
      heading: 'Mensual, anual, 12 pagas y 14 pagas',
      paragraphs: [
        'Los campos se interpretan en el mismo periodo. Si introduces sueldo bruto mensual, complementos y deducciones también deben ser mensuales. Para un cálculo anual, todos deben ser anuales. La etiqueta de la página prioriza el uso mensual, pero la aritmética funciona con cualquier periodo coherente. No mezcles un bruto anual con una retención fija mensual.',
        'En un sistema de 12 o 14 pagas, dividir el bruto anual cambia el importe de cada recibo y puede cambiar cómo aparecen las pagas extraordinarias, aunque el total anual sea el mismo. Esta calculadora no distribuye pagas ni regulariza retenciones. Si comparas una oferta, primero confirma si el salario anunciado es anual, cuántas pagas incluye y si las extras están prorrateadas.',
      ],
    },
    {
      heading: 'Ejemplo reproducible con porcentajes propios',
      paragraphs: [
        'Supón un bruto mensual de 1.800, complementos de 120, cotizaciones del 6,5 %, aportación adicional del 1 %, pensión voluntaria del 0 % y retención fiscal del 9 %. Añade 30 de otras deducciones. La suma porcentual es 16,5 %, aplicada al bruto produce 297; con la deducción fija son 327. El neto estimado es 1.593 en la moneda utilizada.',
        'El ejemplo demuestra la fórmula, no valida esas tasas para una persona ni un país. Para revisar el resultado, calcula primero cada porcentaje por separado, comprueba que todos usan la misma base y vuelve a sumar. Si la nómina oficial no coincide, busca diferencias en bases, topes, redondeos, conceptos exentos, retribución en especie, atrasos, anticipos o regularizaciones.',
      ],
    },
    {
      heading: 'Cómo comparar una oferta de empleo sin engañarte',
      paragraphs: [
        'Una oferta puede expresar bruto anual, bruto mensual, salario base más variable o un paquete que incluye beneficios. Antes de comparar netos, separa lo garantizado de lo condicionado, confirma el número de pagas y pregunta qué conceptos cotizan o tributan. Usa varios escenarios de retención en vez de confiar en una sola cifra, especialmente si todavía no tienes una simulación oficial.',
        'El neto no es la única variable: horario, vacaciones, estabilidad, costes de desplazamiento, moneda, seguro, pensión, bonus y evolución salarial también importan. FunnyTools no puntúa la oferta ni recomienda aceptarla. El cálculo puede ayudarte a formular preguntas concretas para recursos humanos, una asesoría o la autoridad fiscal.',
      ],
    },
    {
      heading: 'Privacidad de los datos salariales',
      paragraphs: [
        'Los importes y porcentajes se calculan mediante JavaScript en tu dispositivo. No se envían a FunnyTools ni se guardan en una cuenta. Al recargar vuelven los valores de ejemplo. El botón de copia usa el portapapeles del sistema, que puede sincronizarse con otros dispositivos o estar disponible para aplicaciones según tu configuración.',
        'Para reducir riesgos, no pegues nombres, identificadores fiscales, números de cuenta, empresa ni texto completo de una nómina. Esta página solo necesita cantidades. Si trabajas en un equipo compartido, borra el portapapeles después de copiar y cierra la pestaña. El historial del navegador puede conservar que visitaste la URL, pero no los valores introducidos por la herramienta.',
      ],
    },
    {
      heading: 'Cuándo debes usar una calculadora oficial o asesoría',
      paragraphs: [
        'Usa un servicio oficial cuando necesites retenciones conforme al año fiscal, situación personal, residencia, discapacidad, descendientes, contrato, bases máximas, beneficios o regularizaciones. Consulta a nóminas o recursos humanos para interpretar conceptos del recibo. Si hay una discrepancia que afecta derechos o una reclamación, conserva documentos y busca asesoramiento laboral o fiscal cualificado.',
        'No presentes esta salida como una nómina, declaración, certificado ni prueba de lo que debe pagar un empleador. El cálculo puede ser matemáticamente correcto respecto de sus entradas y seguir siendo jurídicamente incorrecto para el caso real. La fecha de revisión editorial no significa que los porcentajes estén actualizados, porque los porcentajes los aporta el usuario.',
      ],
      link: {
        prefix: 'La Seguridad Social española explica el papel de las bases y los tipos en su ',
        label: 'información oficial de cotización',
        href: 'https://www.seg-social.es/wps/portal/wss/internet/Trabajadores/CotizacionRecaudacionTrabajadores/10721/10957/583?changeLanguage=es',
        suffix: '.',
      },
    },
  ],
  formula: {
    expression: 'Neto estimado = bruto + complementos − bruto × suma de porcentajes − otras deducciones',
    explanation: 'Los cuatro porcentajes se aplican al mismo sueldo bruto. La herramienta no calcula bases distintas, tramos progresivos, topes ni reglas territoriales. Todas las tasas y deducciones deben proceder de la persona usuaria.',
  },
  instructions: [
    'Introduce el sueldo bruto y los complementos del mismo periodo.',
    'Sustituye los cuatro porcentajes de ejemplo por datos oficiales, de nómina o de la empresa.',
    'Añade anticipos, cuotas u otras deducciones como importe fijo si corresponde.',
    'Revisa el desglose y comprueba manualmente la suma de porcentajes.',
    'Copia el resultado junto con sus supuestos y no lo presentes como cálculo oficial.',
  ],
  examples: [
    'Preparar una primera estimación antes de recibir la primera nómina.',
    'Comparar varios porcentajes de retención indicados por una simulación oficial.',
    'Revisar si una deducción fija explica la diferencia entre dos recibos.',
    'Documentar un escenario para formular preguntas a recursos humanos.',
  ],
  audience: [
    'Personas que conocen sus porcentajes y quieren una operación rápida.',
    'Candidatos que comparan escenarios de una oferta sin sustituir una simulación oficial.',
    'Trabajadores que preparan preguntas sobre su recibo salarial.',
    'Equipos que necesitan explicar una fórmula simplificada y reproducible.',
  ],
  caseStudies: [
    {
      title: 'Primera nómina de un empleo nuevo',
      description: 'La trabajadora usa las tasas que le facilita nóminas, conserva la misma periodicidad en todos los campos y trata el resultado como una estimación previa.',
    },
    {
      title: 'Oferta anual con pagas extra',
      description: 'Un candidato no divide el bruto hasta confirmar si hay 12 o 14 pagas y si las extras están prorrateadas; después calcula varios recibos posibles.',
    },
    {
      title: 'Diferencia por base de cotización',
      description: 'La nómina real no coincide porque una cuota no se aplica al bruto completo. El usuario reconoce el límite del modelo y consulta el desglose oficial.',
    },
  ],
  notes: [
    'Todos los importes deben usar la misma moneda y el mismo periodo.',
    'Los porcentajes se aplican al bruto completo y no modelan bases diferentes.',
    'Los valores iniciales son ejemplos editables, no tasas oficiales actuales.',
    'Un neto negativo indica que los supuestos descuentan más que los ingresos; revisa las entradas.',
    'El resultado no sustituye una nómina, un servicio fiscal oficial ni asesoramiento profesional.',
  ],
  faq: [
    {
      q: '¿Cómo calcular el sueldo neto desde el bruto?',
      a: 'Suma bruto y complementos, resta las cotizaciones y retenciones aplicables y después otras deducciones. Esta página usa porcentajes editables sobre el bruto.',
    },
    {
      q: '¿La calculadora usa el IRPF de España?',
      a: 'No. El porcentaje fiscal lo escribes tú. Para España utiliza el servicio oficial de la Agencia Tributaria cuando necesites una retención personal.',
    },
    {
      q: '¿Sirve para México, Argentina, Colombia o Chile?',
      a: 'Solo como fórmula genérica si introduces datos correctos de tu territorio. No contiene reglas automáticas de ningún país.',
    },
    {
      q: '¿Debo introducir salario mensual o anual?',
      a: 'Puedes usar cualquiera, pero todos los importes deben pertenecer al mismo periodo. La página está redactada pensando en un escenario mensual.',
    },
    {
      q: '¿Qué moneda utiliza?',
      a: 'La misma que tus entradas. No convierte divisas ni añade un símbolo porque no conoce tu país.',
    },
    {
      q: '¿Por qué mi nómina real es diferente?',
      a: 'Puede usar otras bases, topes, tramos, conceptos exentos, redondeos, pagas, atrasos o circunstancias personales que este modelo no calcula.',
    },
    {
      q: '¿Los valores iniciales son tasas oficiales?',
      a: 'No. Son ejemplos para mostrar el funcionamiento y debes sustituirlos por datos verificados.',
    },
    {
      q: '¿Se guardan mis datos salariales?',
      a: 'No se envían ni se guardan en una cuenta. Copiar el resultado sí utiliza el portapapeles de tu dispositivo.',
    },
  ],
  labels: {
    grossSalary: 'Sueldo bruto del periodo',
    allowance: 'Complementos del periodo',
    laborRate: 'Cotizaciones sociales (%)',
    healthRate: 'Seguro o aportación adicional (%)',
    pensionRate: 'Pensión voluntaria (%)',
    taxRate: 'Retención fiscal estimada (%)',
    otherDeduction: 'Otras deducciones fijas',
    calculate: 'Calcular',
    copy: 'Copiar resultado',
    reset: 'Restablecer',
    grossIncome: 'Ingresos brutos',
    totalDeductions: 'Deducciones estimadas',
    netPay: 'Sueldo neto estimado',
    assumptionNote: 'Todos los porcentajes son supuestos editables. Verifícalos con fuentes oficiales, tu nómina o la empresa.',
    formula: 'Fórmula: neto = bruto + complementos − bruto × porcentajes − otras deducciones',
    invalidInput: 'Introduce importes no negativos y porcentajes entre 0 y 100.',
    copied: 'Resultado copiado',
  },
  privacyNote: 'Los importes y porcentajes se calculan en esta pestaña. No se envían a FunnyTools; copiar usa el portapapeles del dispositivo.',
  disclaimer: 'Estimación aritmética sin reglas automáticas de país. No constituye nómina, cálculo fiscal, asesoramiento financiero, laboral o legal. Confirma bases, tasas y derechos con fuentes oficiales o profesionales cualificados.',
};

export const spanishNetSalaryReview = {
  heading: 'Cómo revisar una estimación de sueldo neto',
  intro: 'El resultado solo es útil cuando conserva el periodo, la moneda, la base y la fuente de cada porcentaje.',
  panels: [
    { title: 'Periodo', text: 'No mezcles importes mensuales con cifras anuales ni 12 pagas con 14 sin ajustarlas.' },
    { title: 'Tasas', text: 'Sustituye todos los valores de ejemplo por datos oficiales o de tu nómina.' },
    { title: 'Base', text: 'Comprueba si cada descuento real se aplica al bruto completo o a otra base.' },
  ],
  checklistHeading: 'Lista de comprobación',
  checklist: [
    'Todos los importes usan la misma moneda y periodo.',
    'La suma de porcentajes coincide con los supuestos documentados.',
    'Complementos, pagas y deducciones no están duplicados.',
    'Una decisión o reclamación se confirma fuera de esta calculadora.',
  ],
};

export const spanishOvertimePay: ToolContent = {
  name: 'Calculadora de horas extra',
  short: 'Estima el pago de horas extra con una tarifa por hora, cuatro bloques de horas y multiplicadores editables.',
  long: 'Esta calculadora de horas extra multiplica una tarifa base por las horas y el multiplicador de cada bloque. Los cuatro bloques permiten separar horas ordinarias, un segundo tramo, descanso y festivo, pero sus nombres no representan una legislación universal. Debes obtener la tarifa, los límites, la clasificación y los multiplicadores de la norma, convenio, contrato o nómina aplicable. No decide qué horas son extraordinarias, si corresponde descanso compensatorio ni cuánto debe pagar legalmente una empresa.',
  seoTitle: 'Calculadora de horas extra | Pago por hora',
  seoDescription: 'Calcula horas extra con tarifa por hora, horas normales, segundo tramo, descanso, festivo y multiplicadores editables según tu norma o convenio.',
  keywords: [
    'calculadora horas extra',
    'calcular pago horas extras',
    'cuánto vale una hora extra',
    'pago de horas extraordinarias',
    'horas extra dobles y triples',
    'recargo por hora extra',
    'valor hora ordinaria',
    'horas extra festivo',
  ],
  capabilities: [
    'Introducir una tarifa base por hora en cualquier moneda.',
    'Separar hasta cuatro grupos de horas con multiplicadores independientes.',
    'Calcular el importe de cada bloque y el total estimado.',
    'Dejar en cero las categorías que no correspondan.',
    'Copiar el desglose junto con la fórmula y la advertencia de supuestos.',
  ],
  contentSections: [
    {
      heading: 'Respuesta rápida: cómo calcular el pago de horas extra',
      paragraphs: [
        'Introduce la tarifa por hora que corresponda según tu fuente. Reparte las horas entre los bloques que necesites y escribe el multiplicador aplicable a cada uno. Si una categoría no existe en tu caso, deja sus horas en cero. La herramienta calcula tarifa × horas × multiplicador para cada fila y suma los cuatro importes.',
        'Ejemplo puramente matemático: con una tarifa de 10, tres horas a 1,5 y dos horas a 2, el total es 85 en la moneda utilizada. Son 45 del primer bloque y 40 del segundo. La calculadora no afirma que 1,5 o 2 sean los recargos correctos para tu país, día, contrato o tipo de trabajador. Esa clasificación debe resolverse antes de introducir los datos.',
      ],
    },
    {
      heading: 'Tarifa ordinaria, multiplicador y recargo',
      paragraphs: [
        'Un multiplicador de 1 paga una vez la tarifa; 1,5 representa la tarifa más un recargo del 50 %; 2 representa el doble; y 3, el triple. No confundas «200 % adicional» con «200 % del total»: el primero puede equivaler a tres veces la tarifa, mientras que el segundo equivale a dos. Lee la redacción exacta de la norma o convenio.',
        'La tarifa base tampoco siempre es el sueldo mensual dividido por cualquier número de horas. La fórmula de conversión puede depender de la jornada pactada, días del periodo, conceptos salariales incluidos, pagas extraordinarias, salario integrado o reglas sectoriales. Si no conoces la tarifa reconocida, consulta la nómina, el convenio, recursos humanos o una fuente oficial antes de usar el resultado.',
      ],
    },
    {
      heading: 'Por qué las reglas cambian entre países',
      paragraphs: [
        'En España, el artículo 35 del Estatuto de los Trabajadores remite la compensación de horas extraordinarias al convenio colectivo o contrato individual y establece límites, con reglas sobre descanso compensatorio. En México, PROFEDET explica un esquema semanal con primeras horas al doble y exceso al triple. Otros países separan jornada diurna, nocturna, domingo, festivo o descanso con definiciones diferentes.',
        'La existencia de términos parecidos no permite trasladar una regla. «Hora extra», «hora extraordinaria», «recargo nocturno», «día de descanso» y «festivo» pueden acumularse, excluirse o tener bases distintas según el territorio. La herramienta ofrece multiplicadores editables precisamente para no presentar un preset local como respuesta global. Guarda el país, fecha y fuente junto al cálculo.',
      ],
      link: {
        prefix: 'Para España, revisa el ',
        label: 'artículo 35 del Estatuto de los Trabajadores en el BOE',
        href: 'https://boe.es/buscar/act.php?id=BOE-A-2015-11430&p=20241221&tn=0',
        suffix: '.',
      },
    },
    {
      heading: 'Cómo usar los cuatro bloques sin duplicar horas',
      paragraphs: [
        'El primer bloque puede representar horas extra ordinarias; el segundo, un tramo con recargo distinto; el tercero, horas en descanso; y el cuarto, festivo. Son contenedores. Cada hora debe entrar una sola vez salvo que tu norma ordene sumar recargos y hayas convertido esa combinación en un multiplicador total. Si pones la misma hora en descanso y festivo, la calculadora la pagará dos veces.',
        'Antes de escribir, crea una tabla con fecha, inicio, fin, pausa no trabajada, tipo de día y fuente de la categoría. Suma las horas de cada grupo después de resolver cruces y redondeos. La calculadora acepta decimales, por ejemplo 1,5 horas, pero no convierte 1:30 escrito como hora y minutos. Un valor decimal de 1,30 representa 1,3 horas, no una hora y treinta minutos.',
      ],
    },
    {
      heading: 'Horas y minutos: cómo convertirlos a decimal',
      paragraphs: [
        'Divide los minutos entre 60. Quince minutos son 0,25 horas, treinta son 0,5 y cuarenta y cinco son 0,75. Una hora y veinte minutos son 1 + 20/60, es decir, aproximadamente 1,3333. Evita redondear cada jornada demasiado pronto; suma minutos y convierte al final si la regla lo permite.',
        'La herramienta no impone bloques mínimos de media hora ni redondea entradas al múltiplo visible del control. El atributo de paso facilita usar medios, pero puedes escribir otros decimales válidos. La salida monetaria se redondea a una unidad sin decimales para mantener el diseño simple. Si tu nómina utiliza centavos o reglas de redondeo específicas, reproduce el cálculo con la precisión exigida antes de reclamar una diferencia.',
      ],
    },
    {
      heading: 'Ejemplo con horas dobles y triples en México',
      paragraphs: [
        'PROFEDET informa que, en el marco mexicano que describe, las primeras nueve horas extraordinarias semanales se pagan al doble y las que exceden ese grupo al triple. Para modelar un caso ya clasificado, podrías colocar hasta nueve horas en un bloque con multiplicador 2 y el exceso en otro con multiplicador 3, usando la tarifa horaria correcta.',
        'Este ejemplo no sustituye revisar la Ley Federal del Trabajo vigente, la jornada, la semana concreta, el tipo de hora ni posibles reformas. La propia PROFEDET recomienda acudir a su servicio para el cálculo correspondiente. No uses ese esquema para España, Colombia, Chile, Argentina u otro país; cambia tanto los multiplicadores como la forma de agrupar.',
      ],
      link: {
        prefix: 'Consulta la explicación de ',
        label: 'horas extraordinarias de PROFEDET México',
        href: 'https://www.profedet.gob.mx/micrositio/index.php/horas-extras-u-horas-de-trabajo-extraordinario',
        suffix: '.',
      },
    },
    {
      heading: 'Pago, descanso compensatorio y límites de jornada',
      paragraphs: [
        'No toda hora extra termina necesariamente como un pago separado. Algunas normas o convenios permiten o exigen compensación con descanso, establecen un plazo para disfrutarlo o limitan cuántas horas pueden realizarse. La calculadora solo produce dinero según los números introducidos y no descuenta descansos futuros ni comprueba máximos.',
        'Tampoco decide si una extensión de jornada fue autorizada, voluntaria, urgente, nocturna o correctamente registrada. Si el objetivo es documentar una discrepancia, conserva cuadrantes, fichajes, mensajes, recibos, contrato y convenio. La salida copiada de FunnyTools es un borrador de aritmética, no una prueba del número de horas ni de su calificación jurídica.',
      ],
    },
    {
      heading: 'Privacidad y preparación de una revisión de nómina',
      paragraphs: [
        'La tarifa, las horas y los multiplicadores se calculan en esta pestaña y no se envían a FunnyTools. No es necesario escribir nombre, empresa, número de empleado ni fechas concretas. El botón de copia utiliza el portapapeles; revisa dónde pegas el resumen y bórralo si el dispositivo es compartido.',
        'Para una revisión útil, acompaña el cálculo con una hoja propia que identifique cada turno y la fuente de su multiplicador. No pegues aquí documentos completos ni datos personales. La herramienta no almacena historial, por lo que una recarga elimina el escenario. Si necesitas trazabilidad, guarda el resumen en un lugar seguro junto con los documentos originales.',
      ],
    },
    {
      heading: 'Cuándo consultar a la autoridad o a un profesional',
      paragraphs: [
        'Busca información oficial o asesoramiento cuando no esté claro qué cuenta como hora extra, qué salario integra la tarifa, cómo se combinan recargos, si hay descanso compensatorio, qué límites existen o cuánto tiempo tienes para reclamar. Una diferencia pequeña también puede provenir de redondeos, periodo de pago o deducciones posteriores.',
        'No utilices el total para acusar automáticamente a una empresa ni para cerrar un acuerdo. Primero verifica horas y clasificación con el registro aplicable. Si hay riesgo de pérdida de derechos, plazos de reclamación o represalias, acude a la inspección, defensoría laboral, sindicato, abogado o servicio equivalente de tu país. FunnyTools no evalúa el caso ni conserva evidencia.',
      ],
    },
  ],
  formula: {
    expression: 'Pago extra estimado = Σ (tarifa por hora × horas del bloque × multiplicador)',
    explanation: 'Cada bloque se calcula por separado y luego se suma. La persona usuaria es responsable de la tarifa, clasificación, multiplicadores y ausencia de horas duplicadas. No se aplican normas automáticas de ningún país.',
  },
  instructions: [
    'Obtén la tarifa por hora y las reglas de una fuente aplicable a tu caso.',
    'Clasifica cada hora una sola vez antes de escribir los totales.',
    'Introduce las horas y el multiplicador de cada bloque; deja en cero los que no correspondan.',
    'Revisa el desglose y convierte correctamente minutos a horas decimales.',
    'Copia el resultado con la fecha, país, convenio y fuente fuera de la herramienta.',
  ],
  examples: [
    'Separar un primer tramo de horas y otro con multiplicador diferente.',
    'Estimar un festivo después de confirmar la tarifa y el recargo aplicables.',
    'Preparar preguntas para recursos humanos antes de revisar una nómina.',
    'Comparar el coste matemático de dos distribuciones de turnos sin decidir su legalidad.',
  ],
  audience: [
    'Trabajadores que ya conocen sus horas, tarifa y multiplicadores.',
    'Responsables de turnos que preparan una estimación no oficial.',
    'Personas que quieren comprobar la aritmética de un recibo salarial.',
    'Equipos que necesitan documentar claramente los supuestos de cada bloque.',
  ],
  caseStudies: [
    {
      title: 'Primer y segundo tramo',
      description: 'Un trabajador separa las horas según la fuente oficial de su país, coloca cada grupo en un bloque y conserva la referencia junto al resumen.',
    },
    {
      title: 'Turno con minutos',
      description: 'Una salida 45 minutos tarde se convierte en 0,75 horas. La persona no escribe 0,45 y comprueba la regla de redondeo de su nómina.',
    },
    {
      title: 'Descanso en vez de pago',
      description: 'El convenio prevé compensación con tiempo. La usuaria no presenta el total monetario como derecho automático y consulta cómo registrar el descanso.',
    },
  ],
  notes: [
    'La tarifa y todos los importes deben usar la misma moneda.',
    'Los multiplicadores iniciales son ejemplos editables, no derecho vigente.',
    'Una hora duplicada entre bloques se paga dos veces en el cálculo.',
    'La salida redondea el dinero a unidades enteras y puede diferir de una nómina con centavos.',
    'No determina jornada, autorización, límites, descanso compensatorio ni plazos de reclamación.',
  ],
  faq: [
    {
      q: '¿Cómo se calcula una hora extra?',
      a: 'Multiplica la tarifa horaria reconocida por las horas y por el multiplicador aplicable. Verifica primero cómo se obtiene la tarifa y qué recargo corresponde.',
    },
    {
      q: '¿Qué significa multiplicador 1,5, 2 o 3?',
      a: 'Representa una vez y media, el doble o el triple de la tarifa. Comprueba si la norma habla de porcentaje total o adicional.',
    },
    {
      q: '¿La calculadora aplica la ley de España?',
      a: 'No. Debes introducir la tarifa y multiplicadores definidos por convenio, contrato y normativa aplicable.',
    },
    {
      q: '¿Calcula automáticamente horas dobles y triples de México?',
      a: 'No las clasifica. Puedes modelarlas después de verificar la semana y la regla con PROFEDET o la Ley Federal del Trabajo vigente.',
    },
    {
      q: '¿Cómo escribo una hora y media?',
      a: 'Escribe 1,5 según la interfaz del navegador. Para otros minutos, divide los minutos entre 60.',
    },
    {
      q: '¿Puedo dejar categorías en cero?',
      a: 'Sí. Solo usa los bloques necesarios y asegúrate de no repetir horas.',
    },
    {
      q: '¿Incluye descanso compensatorio o impuestos?',
      a: 'No. Solo suma importes brutos de horas extra según los valores introducidos.',
    },
    {
      q: '¿Se guardan la tarifa y mis horas?',
      a: 'No se envían ni se guardan en una cuenta. El resumen copiado pasa al portapapeles del dispositivo.',
    },
  ],
  labels: {
    hourlyRate: 'Tarifa base por hora',
    weekdayHours: 'Horas extra, primer bloque',
    weekdayMultiplier: 'Multiplicador del primer bloque',
    extendedHours: 'Horas extra, segundo bloque',
    extendedMultiplier: 'Multiplicador del segundo bloque',
    restHours: 'Horas en día de descanso',
    restMultiplier: 'Multiplicador de descanso',
    holidayHours: 'Horas en festivo',
    holidayMultiplier: 'Multiplicador de festivo',
    calculate: 'Calcular',
    copy: 'Copiar resultado',
    reset: 'Restablecer',
    weekdayPay: 'Primer bloque',
    extendedPay: 'Segundo bloque',
    restPay: 'Día de descanso',
    holidayPay: 'Festivo',
    totalPay: 'Pago extra total estimado',
    assumptionNote: 'La tarifa, la clasificación y los multiplicadores son supuestos editables. Verifícalos con normas, convenio, contrato o nómina.',
    formula: 'Fórmula: tarifa por hora × horas × multiplicador',
    invalidInput: 'Introduce valores no negativos y multiplicadores entre 0 y 10.',
    copied: 'Resultado copiado',
  },
  privacyNote: 'La tarifa, las horas y los multiplicadores se calculan en esta pestaña. FunnyTools no los guarda; copiar utiliza el portapapeles.',
  disclaimer: 'Estimación aritmética sin reglas automáticas de país. No determina derechos, jornada, tarifa, recargos, descanso ni plazos. Confirma el caso con fuentes oficiales, convenio, empresa o asesoramiento laboral cualificado.',
};

export const spanishOvertimePayReview = {
  heading: 'Cómo revisar un cálculo de horas extra',
  intro: 'El total es reproducible cuando cada hora tiene una sola categoría, una tarifa documentada y un multiplicador verificable.',
  panels: [
    { title: 'Horas', text: 'Conserva un registro por fecha y convierte minutos a decimal sin duplicar tramos.' },
    { title: 'Tarifa', text: 'Usa la base horaria reconocida por la norma, convenio, contrato o nómina.' },
    { title: 'Regla', text: 'Documenta el país, la fecha y la fuente de cada multiplicador.' },
  ],
  checklistHeading: 'Lista de comprobación',
  checklist: [
    'Cada hora aparece una sola vez salvo una acumulación de recargos expresamente confirmada.',
    'Los minutos se han dividido entre 60.',
    'Los multiplicadores de ejemplo se han sustituido por los aplicables.',
    'Pago, descanso, límites y reclamación se confirman con una fuente competente.',
  ],
};
