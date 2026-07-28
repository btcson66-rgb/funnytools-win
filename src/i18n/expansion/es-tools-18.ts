import type { ToolContent } from '../tools/_types';

export const spanishWhatToEat: ToolContent = {
  name: 'Qué comer hoy',
  short: 'Elige al azar entre ideas de comida y tu propia lista de platos, restaurantes o tipos de cocina.',
  long: 'Esta herramienta para decidir qué comer hoy combina las categorías seleccionadas con las opciones que escribas, una entrada por línea. Después fija una posición mediante crypto.getRandomValues y muestreo por rechazo antes de mostrar la animación. Sirve para desempatar entre alternativas que ya son viables, no para recomendar una dieta, comprobar alérgenos, localizar restaurantes abiertos ni decidir qué es seguro para una persona.',
  seoTitle: 'Qué comer hoy | Selector de comida aleatoria',
  seoDescription: 'Decide qué comer hoy con categorías y tu propia lista. Elige un plato o restaurante al azar en el navegador, sin registro.',
  keywords: [
    'qué comer hoy',
    'ruleta de comida',
    'generador de comida aleatoria',
    'qué cenar hoy',
    'selector de comida',
    'decidir qué comer',
    'ideas para comer hoy',
    'elegir restaurante al azar',
  ],
  capabilities: [
    'Combinar categorías generales con platos, restaurantes o planes escritos por ti.',
    'Interpretar cada línea no vacía como una posición independiente en el sorteo.',
    'Seleccionar una posición con Web Crypto y muestreo por rechazo.',
    'Fijar el resultado antes de iniciar la animación visual.',
    'Copiar la opción elegida al portapapeles o restablecer la lista inicial.',
  ],
  contentSections: [
    {
      heading: 'Respuesta rápida: cómo decidir qué comer hoy',
      paragraphs: [
        'Marca solo las categorías que realmente aceptarías y añade tus opciones locales en el cuadro, una entrada por línea. Puedes escribir platos, restaurantes o planes concretos, por ejemplo «lentejas en casa», «menú del día de la plaza» o «tacos del mercado». Pulsa «Decidir» y la herramienta elegirá una posición de la lista combinada. Si prefieres trabajar únicamente con tus candidatos, desmarca todas las categorías antes de empezar.',
        'La selección resuelve el último empate, no la preparación anterior. Comprueba primero presupuesto, distancia, horario, disponibilidad, tiempo de cocina y acuerdo del grupo. Si el resultado no está abierto o ya no es viable, retíralo de la lista y vuelve a decidir entre las alternativas restantes. Copiar el resultado sirve para compartir una propuesta, pero no confirma una reserva, un pedido ni la aceptación de otras personas.',
      ],
    },
    {
      heading: 'Cómo se forma la lista de candidatos',
      paragraphs: [
        'Cada categoría marcada aporta sus platos predefinidos y cada línea personalizada aporta otra posición. Los espacios al principio y al final se eliminan y las líneas vacías se ignoran. La herramienta no separa automáticamente almuerzo, comida, merienda o cena, ni distingue entre un plato y el nombre de un establecimiento. Esa flexibilidad permite crear una lista adaptada al momento, pero exige que todas las entradas se entiendan en el mismo contexto.',
        'Las opciones repetidas no se deduplican. Si «pizza» aparece en una categoría y también en tu lista, ocupa dos posiciones y tendrá más oportunidades de salir que una entrada presente una sola vez. Esto puede utilizarse como ponderación deliberada, aunque es fácil duplicar algo por accidente. Para una elección con la misma probabilidad por alternativa, revisa y conserva una sola línea por opción antes de pulsar el botón.',
      ],
    },
    {
      heading: 'Categorías pensadas para una búsqueda en español',
      paragraphs: [
        'Las categorías iniciales cubren comida casera, cocina española, latinoamericana, asiática, opciones rápidas y propuestas vegetarianas. Son puntos de partida amplios, no un catálogo gastronómico completo ni una descripción de toda la diversidad regional. Un plato común en Madrid puede no estar disponible en Quito, Monterrey, Buenos Aires o San Juan, y una misma denominación puede referirse a recetas distintas.',
        'La lista personalizada suele dar mejores decisiones porque incorpora lo que existe cerca de ti. Añade el nombre reconocible del local, el plato que el grupo pediría y, si ayuda, una condición breve como «solo si hay menú» o «a menos de 20 minutos». No incluyas una alternativa que nadie aceptaría solo para aumentar variedad. La calidad del resultado depende de que la lista represente opciones reales en este momento.',
      ],
    },
    {
      heading: 'Aleatoriedad con crypto.getRandomValues',
      paragraphs: [
        'La herramienta exige crypto.getRandomValues para obtener un entero aleatorio del navegador. Aplica muestreo por rechazo antes del módulo: descarta los valores de la franja sobrante que podrían dar una ventaja mínima a algunas posiciones. Si el navegador no ofrece esta función, el selector no utiliza Math.random como sustituto silencioso; mantiene el resultado vacío y explica que hace falta un navegador actualizado.',
        'La posición definitiva se calcula antes de la animación. Los nombres que cambian rápidamente en pantalla son solo una vista previa y no vuelven a sortear la elección final. Todas las posiciones tienen la misma probabilidad matemática en una ejecución, pero textos duplicados suman varias posiciones. El proceso no genera una semilla pública, un historial verificable ni una prueba de que nadie repitió el intento hasta obtener su comida preferida.',
      ],
      link: {
        prefix: 'Consulta la fuente de números utilizada en ',
        label: 'Crypto.getRandomValues de MDN',
        href: 'https://developer.mozilla.org/es/docs/Web/API/Crypto/getRandomValues',
        suffix: '.',
      },
    },
    {
      heading: 'Alergias, dietas y necesidades de salud',
      paragraphs: [
        'El selector no conoce ingredientes, contaminación cruzada, tamaño de las porciones, calorías, sodio, alcohol, certificaciones religiosas ni necesidades médicas. Las etiquetas generales tampoco garantizan que un plato sea vegano, vegetariano, sin gluten, halal, kosher o seguro para una alergia. Antes de crear la lista, cada persona debe excluir lo que no pueda consumir y confirmar la información con el establecimiento o una fuente responsable.',
        'No utilices un resultado aleatorio para modificar una dieta prescrita, decidir una comida ante una reacción alérgica o sustituir el consejo de un profesional sanitario. Si la elección afecta a diabetes, enfermedad renal, embarazo, trastornos de la conducta alimentaria u otra condición, aplica primero el plan indicado por el equipo de salud. La herramienta puede escoger entre comidas ya verificadas como aptas; no puede verificar que lo sean.',
      ],
    },
    {
      heading: 'Decidir en pareja, familia o grupo',
      paragraphs: [
        'Una forma práctica de evitar discusiones consiste en acordar las reglas antes del sorteo. Cada persona propone una o dos alternativas que aceptaría, se eliminan las que superen el presupuesto o no cumplan las restricciones comunes y solo entonces se realiza la elección. Así, el azar decide entre opciones consentidas en lugar de imponer a alguien una propuesta que ya había descartado.',
        'También conviene acordar qué ocurre si el lugar está lleno, no reparte en la zona o cierra antes de llegar. Una regla sencilla es retirar la opción inviable y repetir una sola vez. Si alguien reacciona con decepción al resultado, esa reacción aporta información sobre sus preferencias; el grupo puede hablarlo y elegir conscientemente. La herramienta es un mecanismo de desempate, no una obligación.',
      ],
    },
    {
      heading: 'Planificar una comida frente a resolver una decisión inmediata',
      paragraphs: [
        'Para una decisión inmediata, una lista corta de tres a ocho alternativas concretas suele ser más útil que decenas de platos. Incluye solo lo que cabe en el tiempo disponible y especifica si cocinar, recoger o pedir a domicilio son opciones reales. Para planificar la semana hacen falta además inventario, fechas de caducidad, presupuesto, variedad nutricional y aprovechamiento de sobras, funciones que esta página no calcula.',
        'Puedes preparar una lista semanal fuera de la herramienta y usar el selector únicamente cuando queden varias comidas intercambiables. Por ejemplo, si ya has verificado tres cenas que utilizan ingredientes disponibles, el azar puede ordenar cuál preparar hoy. No sustituye una aplicación de recetas, una lista de compras, un buscador de establecimientos, una plataforma de reparto ni un planificador nutricional.',
      ],
    },
    {
      heading: 'Privacidad, portapapeles y conservación',
      paragraphs: [
        'Las categorías, las líneas personalizadas y la selección se procesan en esta pestaña. FunnyTools no recibe ni guarda la lista. Al copiar el resultado, el texto pasa al portapapeles del dispositivo, que puede ser leído por otras aplicaciones o sincronizado según la configuración del sistema. Evita escribir información de salud, direcciones privadas u otros datos personales cuando basta con el nombre de una opción.',
        'La página no crea una cuenta, un enlace compartible ni un historial de elecciones. Al recargar se pierde la lista personalizada y se restablecen las categorías iniciales. Si el grupo necesita conservar propuestas, votos o gastos, anótalos en el sistema que ya utilice. El procesamiento local limita la exposición al sitio, pero no protege la pantalla de miradas, capturas ni extensiones instaladas en el navegador.',
      ],
    },
    {
      heading: 'Qué no hace este selector de comida',
      paragraphs: [
        'No consulta ubicación, mapas, valoraciones, precios, horarios, existencias, tiempos de entrega ni reservas. Tampoco genera recetas, calcula nutrientes, detecta ingredientes o pregunta por preferencias de forma automática. Una categoría puede contener una idea que no exista donde estás y un restaurante personalizado puede haber cambiado su carta. Verifica siempre la información actual antes de desplazarte o pagar.',
        'No es adecuado para sorteos con premios, decisiones laborales, adjudicaciones públicas ni procesos que necesiten auditoría. Para elegir una comida cotidiana entre alternativas equivalentes ofrece una respuesta clara y rápida. Para cualquier decisión con consecuencias de salud, seguridad, dinero importante o derechos de otras personas, utiliza criterios verificables y la intervención humana correspondiente.',
      ],
    },
  ],
  instructions: [
    'Descarta primero las comidas incompatibles con salud, dieta, presupuesto, horario o ubicación.',
    'Marca las categorías útiles y añade platos o restaurantes locales, una entrada por línea.',
    'Elimina duplicados si quieres que cada alternativa tenga el mismo peso.',
    'Pulsa «Decidir» y comprueba que el resultado sigue disponible y es aceptado por el grupo.',
    'Copia la propuesta o ajusta la lista antes de realizar una nueva elección.',
  ],
  examples: [
    'Elegir entre cuatro menús cercanos que están abiertos a la hora de comer.',
    'Desempatar una cena familiar después de excluir ingredientes no aptos.',
    'Decidir si cocinar pasta, preparar ensalada o usar una comida ya congelada.',
    'Sortear entre las propuestas aceptadas por un grupo, con una entrada por opción.',
  ],
  audience: [
    'Personas con varias alternativas viables y poca energía para decidir.',
    'Parejas, familias y grupos que acuerdan primero una lista aceptable.',
    'Equipos que quieren escoger un plan informal sin convertirlo en una votación larga.',
    'Quienes prefieren una herramienta local sin registro ni historial.',
  ],
  caseStudies: [
    {
      title: 'Almuerzo con horario limitado',
      description: 'Tres compañeros escriben únicamente los locales que sirven menú antes de las 14:30. El selector elige uno y el grupo confirma por teléfono que todavía hay mesa.',
    },
    {
      title: 'Cena con una alergia alimentaria',
      description: 'La familia verifica primero cinco platos aptos con quien prepara la comida. Solo esas opciones se incluyen en la lista; la herramienta decide entre alternativas ya comprobadas.',
    },
    {
      title: 'Una opción duplicada por accidente',
      description: 'Antes de decidir, el grupo observa que tacos figura en una categoría y en la lista personalizada. Elimina una copia para que cada propuesta ocupe una sola posición.',
    },
  ],
  notes: [
    'Cada línea no vacía añade una posición; las repeticiones aumentan el peso del mismo texto.',
    'La elección final se fija antes de la animación.',
    'Las categorías son ideas generales y no dependen de tu ubicación.',
    'No se consultan ingredientes, alérgenos, precios, horarios ni disponibilidad.',
    'La lista personalizada y el resultado no se conservan al recargar.',
  ],
  faq: [
    {
      q: '¿Cómo puedo decidir qué comer hoy?',
      a: 'Elimina primero lo que no sea viable, añade una entrada por alternativa y pulsa «Decidir». El selector elige una posición al azar de la lista combinada.',
    },
    {
      q: '¿Puedo usar solo mis restaurantes o platos?',
      a: 'Sí. Desmarca todas las categorías y escribe al menos una opción por línea en el campo personalizado.',
    },
    {
      q: '¿Qué ocurre si una comida aparece dos veces?',
      a: 'Ocupa dos posiciones y aumenta su probabilidad. Elimina repeticiones si quieres el mismo peso para cada alternativa.',
    },
    {
      q: '¿La animación cambia el resultado?',
      a: 'No. La posición final se obtiene antes de comenzar la animación; los textos intermedios son solo una vista previa.',
    },
    {
      q: '¿La herramienta comprueba alergias o dietas?',
      a: 'No. Debes incluir únicamente opciones ya verificadas como aptas. Consulta ingredientes y contaminación cruzada con una fuente responsable.',
    },
    {
      q: '¿Busca restaurantes abiertos cerca de mí?',
      a: 'No. No solicita ubicación ni consulta mapas, horarios, precios o disponibilidad. Añade tú las alternativas locales vigentes.',
    },
    {
      q: '¿Se guarda mi lista de comida?',
      a: 'No. Se procesa en esta pestaña y se pierde al recargar. Copiar mueve el resultado al portapapeles de tu dispositivo.',
    },
    {
      q: '¿Es una ruleta de comida visual?',
      a: 'Muestra una animación breve, pero no una rueda con segmentos. Su función es seleccionar una posición de categorías y líneas personalizadas.',
    },
  ],
  labels: {
    categories: 'Categorías',
    custom: 'Tus opciones',
    customPlaceholder: 'Menú del día de la plaza\nLentejas en casa\nTacos del mercado',
    decide: 'Decidir',
    copy: 'Copiar resultado',
    reset: 'Restablecer',
    result: 'Hoy toca',
    waiting: 'Marca categorías o añade opciones',
    emptyError: 'Marca al menos una categoría o escribe una opción.',
    cryptoError: 'Este navegador no ofrece una fuente aleatoria segura. Prueba con un navegador actualizado.',
    copied: 'Resultado copiado',
    categoriesJson: JSON.stringify([
      { id: 'casera', label: 'Comida casera', items: ['Guiso de legumbres', 'Pollo al horno', 'Pasta con verduras', 'Arroz salteado', 'Tortilla con ensalada', 'Sopa con pan', 'Pescado al horno', 'Verduras con patata'] },
      { id: 'espanola', label: 'Cocina española', items: ['Tortilla de patatas', 'Paella', 'Gazpacho', 'Croquetas', 'Cocido', 'Bocadillo', 'Pisto', 'Arroz a la cubana'] },
      { id: 'latinoamericana', label: 'Latinoamericana', items: ['Tacos', 'Arepas', 'Empanadas', 'Ceviche', 'Feijoada', 'Enchiladas', 'Sancocho', 'Arroz con pollo'] },
      { id: 'asiatica', label: 'Asiática', items: ['Ramen', 'Curry con arroz', 'Sushi', 'Pad thai', 'Bibimbap', 'Dumplings', 'Pho', 'Salteado de tofu'] },
      { id: 'rapida', label: 'Rápida o para pedir', items: ['Pizza', 'Hamburguesa', 'Pollo asado', 'Burrito', 'Sándwich', 'Kebab', 'Poke', 'Comida preparada'] },
      { id: 'vegetariana', label: 'Vegetariana', items: ['Ensalada de garbanzos', 'Lasaña de verduras', 'Curry de lentejas', 'Tacos de frijoles', 'Crema de verduras', 'Falafel con hummus', 'Arroz con tofu', 'Pasta al pesto'] },
    ]),
  },
  privacyNote: 'Las categorías, tus líneas y el resultado se procesan en esta pestaña. FunnyTools no conserva la lista. El portapapeles queda bajo el control de tu dispositivo.',
  disclaimer: 'No verifica ingredientes, alérgenos, necesidades médicas, precios, horarios ni disponibilidad. Incluye solo opciones ya consideradas seguras y viables.',
};

export const spanishWhatToEatReview = {
  heading: 'Cómo revisar una elección de comida',
  intro: 'Una selección útil empieza por una lista realista y termina con una comprobación sencilla antes de pedir o cocinar.',
  panels: [
    { title: 'Seguridad', text: 'Excluye primero alergias, ingredientes no aptos y restricciones médicas o culturales.' },
    { title: 'Viabilidad', text: 'Confirma presupuesto, horario, distancia, existencias y acuerdo del grupo.' },
    { title: 'Probabilidad', text: 'Revisa repeticiones: cada copia del mismo texto ocupa otra posición.' },
  ],
  checklistHeading: 'Lista de comprobación',
  checklist: [
    'Todas las alternativas podrían aceptarse si fueran elegidas.',
    'Las opciones personalizadas tienen una entrada por línea.',
    'Los duplicados son deliberados o se han eliminado.',
    'El resultado se verifica antes de pagar, desplazarse o cocinar.',
  ],
};

export const spanishCountdownTimer: ToolContent = {
  name: 'Temporizador online',
  short: 'Inicia una cuenta atrás por duración o hasta una fecha y hora futuras, con pausa, restablecimiento y aviso visual.',
  long: 'Este temporizador online ofrece dos modos. «Duración» descuenta horas, minutos y segundos; «Fecha y hora» calcula el tiempo restante hasta un momento futuro interpretado en la zona local del navegador. El contador deriva cada actualización de una hora final absoluta para recuperar el tiempo transcurrido si la pestaña se ralentiza. Muestra el tiempo en el título mientras está activo y, al llegar a cero, intenta emitir un pitido y activa un aviso visual. No es una alarma del sistema ni conserva el estado al cerrar.',
  seoTitle: 'Temporizador online | Cuenta atrás gratis',
  seoDescription: 'Configura una cuenta atrás por duración o fecha y hora. Inicia, pausa y restablece un temporizador online con aviso visual y sonido opcional.',
  keywords: [
    'temporizador online',
    'cuenta atrás',
    'cuenta regresiva',
    'temporizador gratis',
    'contador de tiempo online',
    'temporizador con alarma',
    'cuenta atrás fecha y hora',
    'reloj temporizador',
  ],
  capabilities: [
    'Contar una duración de hasta 99 horas, 59 minutos y 59 segundos.',
    'Calcular días, horas, minutos y segundos hasta una fecha local futura.',
    'Pausar una duración o detener temporalmente la visualización de una fecha objetivo.',
    'Mostrar el tiempo restante en el título de la pestaña mientras corre.',
    'Activar un destello y solicitar un pitido breve al alcanzar cero.',
  ],
  contentSections: [
    {
      heading: 'Respuesta rápida: cómo usar el temporizador online',
      paragraphs: [
        'Para medir un intervalo, deja activo «Duración», introduce horas, minutos y segundos y pulsa «Iniciar». Los minutos y segundos aceptan valores de 0 a 59; las horas, de 0 a 99. Para contar hasta un momento del calendario, elige «Fecha y hora» y selecciona un valor futuro. Mientras corre, el tiempo restante aparece también en el título de la pestaña para poder consultarlo al cambiar de ventana.',
        '«Pausar» y «Restablecer» no significan lo mismo. En modo duración, pausar congela los segundos restantes y reanudar continúa desde ese punto. Restablecer vuelve al valor escrito en los campos. En modo fecha y hora, el objetivo del calendario no se mueve: pausar detiene la actualización visible, pero el momento elegido sigue acercándose y el contador se pone al día cuando reanudas.',
      ],
    },
    {
      heading: 'Duración frente a fecha y hora',
      paragraphs: [
        'Usa una duración para acciones que empiezan ahora y deben ocupar un intervalo, como diez minutos de lectura, treinta segundos de descanso o una hora de práctica. El máximo configurable en los tres campos es 99:59:59. La pantalla omite unidades iniciales innecesarias: muestra mm:ss para intervalos cortos y añade horas cuando corresponde.',
        'Usa fecha y hora para un hito fijo, por ejemplo el comienzo de una reunión o el cierre de una inscripción. Si faltan más de 24 horas, la pantalla muestra d:hh:mm:ss. El campo datetime-local no incluye una zona horaria explícita; el navegador interpreta el valor como fecha y hora local del dispositivo. Para coordinar personas en países distintos, comunica además la zona y verifica la conversión por separado.',
      ],
      link: {
        prefix: 'El comportamiento sin zona horaria del campo se describe en ',
        label: 'input datetime-local de MDN',
        href: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/datetime-local',
        suffix: '.',
      },
    },
    {
      heading: 'Cómo calcula el tiempo restante',
      paragraphs: [
        'Al iniciar una duración, la página guarda una hora final basada en Date.now(). En cada actualización resta la hora actual de ese final y redondea hacia arriba al segundo visible. No se limita a restar uno cada vez que se ejecuta el intervalo, una técnica que acumularía retraso cuando el navegador tarda en llamar al código. En fecha y hora, vuelve a comparar el objetivo seleccionado con el reloj actual.',
        'Este enfoque permite que la pantalla se ponga al día después de una ralentización breve. No convierte el navegador en un instrumento de tiempo certificado. El reloj del sistema puede cambiar, especialmente en modo fecha, y un dispositivo dormido o una pestaña descartada puede no ejecutar el aviso en el instante exacto. Para una medición de intervalos activos con reloj monotónico, el cronómetro es más apropiado.',
      ],
    },
    {
      heading: 'Qué ocurre en segundo plano o con el dispositivo dormido',
      paragraphs: [
        'Los navegadores reducen la frecuencia de temporizadores en pestañas que no están visibles para ahorrar energía. Si la página sigue viva, la siguiente ejecución recalcula el tiempo desde la hora final y la pantalla recupera el valor correcto. Sin embargo, el destello y el sonido solo pueden producirse cuando el código vuelve a ejecutarse. Pueden llegar tarde si la pestaña está suspendida, el equipo duerme o el navegador libera la página.',
        'Cerrar la pestaña, recargarla, cerrar el navegador o reiniciar el dispositivo elimina la sesión. No hay trabajador en segundo plano, notificación del sistema, sincronización, cuenta ni recuperación. Mantén la página abierta y el dispositivo despierto si el aviso importa. Para despertarte, tomar medicación, supervisar seguridad o recordar una cita crítica, configura además una alarma o recordatorio del sistema operativo.',
      ],
    },
    {
      heading: 'Aviso sonoro y políticas del navegador',
      paragraphs: [
        'Al pulsar «Iniciar», la herramienta intenta crear o reactivar un contexto de audio durante esa interacción. Cuando el contador llega a cero, solicita un tono corto y muestra siempre el estado «¡Tiempo terminado!» con un destello. El sonido es complementario: el volumen puede estar a cero, la salida puede haber cambiado y el navegador puede bloquear o suspender el audio.',
        'No interpretes la ausencia de pitido como que el contador no terminó. Mantén visible la pantalla si necesitas una señal inmediata y prueba antes el comportamiento en el dispositivo concreto. La página no reproduce una grabación, no permite elegir melodía o volumen, no vibra y no solicita permisos de notificación. Las reglas de reproducción automática varían entre navegadores y configuraciones.',
      ],
      link: {
        prefix: 'Las posibles restricciones se explican en la ',
        label: 'guía de reproducción automática de MDN',
        href: 'https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Autoplay',
        suffix: '.',
      },
    },
    {
      heading: 'Pausa, reanudación y restablecimiento',
      paragraphs: [
        'En duración, la pausa guarda los segundos que quedan y deja de actualizar la pantalla. El tiempo que pases pausado no se descuenta. Al iniciar de nuevo se calcula otra hora final desde el valor conservado. Restablecer detiene el contador y vuelve a leer los campos, por lo que puedes cambiar la duración antes de una sesión nueva.',
        'En fecha y hora, la pausa no aplaza la cita. Solo detiene la interfaz. Al reanudar, la página vuelve a calcular la diferencia con el mismo objetivo; si el momento ya pasó, finaliza. Restablecer también vuelve a calcular cuánto falta. Esta diferencia evita que una pausa accidental cambie una reunión real, pero puede sorprender a quien espera el comportamiento de una duración.',
      ],
    },
    {
      heading: 'Usos cotidianos y límites de seguridad',
      paragraphs: [
        'El temporizador puede apoyar una sesión de estudio, una exposición breve, un descanso, una rutina de ejercicio moderado o una fase de cocina que permanezca bajo supervisión. Para cocinar, conserva además las señales del alimento y las instrucciones de seguridad; un navegador no sabe si el horno está encendido, si el producto alcanzó la temperatura adecuada o si alguien sigue presente.',
        'No dependas de esta página como única barrera para medicación, cuidados, maquinaria, fuego, laboratorio, transporte, exámenes oficiales o cualquier situación donde unos segundos de retraso puedan causar daño o invalidar un resultado. Es una ayuda visual de uso general. Los procesos críticos necesitan equipos diseñados para el riesgo, alarmas redundantes y supervisión humana.',
      ],
    },
    {
      heading: 'Privacidad y datos almacenados',
      paragraphs: [
        'La duración y la fecha elegidas se procesan en el navegador. FunnyTools no recibe ni conserva esos valores. El título de la pestaña muestra el tiempo restante mientras el contador está activo y vuelve al título original al pausar, restablecer o terminar. Otras personas que vean la pantalla o el selector de pestañas pueden observar el contador.',
        'No hay historial, nombre de evento, calendario, enlace compartible ni sincronización entre dispositivos. La fecha no se envía a un servidor para compararla con una hora externa; depende del reloj local. Si necesitas evidencia de una apertura o cierre oficial, utiliza la marca temporal y las reglas de la plataforma responsable, no una captura de esta cuenta atrás.',
      ],
    },
    {
      heading: 'Funciones que esta versión no incluye',
      paragraphs: [
        'Esta versión ejecuta un temporizador cada vez. No ofrece varios contadores simultáneos, repeticiones, intervalos encadenados, vueltas, presets, pantalla completa, teclado, voz, vibración, selección de sonido ni guardado automático. Tampoco convierte una cuenta atrás en una página pública para un evento. El objetivo es mantener claros los dos modos básicos y sus consecuencias.',
        'Si necesitas medir tiempo transcurrido sin conocer el final, usa el cronómetro. Para ciclos de trabajo y descanso repetidos, utiliza un temporizador Pomodoro. Para una alarma que sobreviva al cierre del navegador, emplea el reloj del dispositivo. Elegir la herramienta adecuada es más fiable que atribuir a esta página capacidades que no tiene.',
      ],
    },
  ],
  instructions: [
    'Elige «Duración» para un intervalo o «Fecha y hora» para un momento fijo.',
    'Introduce un valor válido y pulsa «Iniciar» mientras el dispositivo está activo.',
    'Comprueba que el título de la pestaña refleja el tiempo restante.',
    'Usa «Pausar» sabiendo que una fecha objetivo real no se aplaza.',
    'Configura una alarma externa cuando el aviso sea crítico o deba sobrevivir al cierre.',
  ],
  examples: [
    'Contar diez minutos de lectura o una pausa breve.',
    'Ver cuánto falta para una reunión indicada en la hora local del dispositivo.',
    'Temporizar una exposición de clase mientras se mantiene visible la pantalla.',
    'Controlar una fase de cocina no crítica bajo supervisión continua.',
  ],
  audience: [
    'Estudiantes, docentes y ponentes que necesitan una cuenta atrás visible.',
    'Personas que organizan bloques cortos de trabajo, práctica o descanso.',
    'Equipos que quieren consultar cuánto falta para un momento local.',
    'Usuarios que necesitan un temporizador básico sin registro.',
  ],
  caseStudies: [
    {
      title: 'Presentación de cinco minutos',
      description: 'La ponente configura 05:00 y mantiene la pestaña visible. Pausa antes de empezar; al reanudar, la duración continúa desde el valor conservado.',
    },
    {
      title: 'Reunión con participantes en dos países',
      description: 'El organizador comunica la hora junto con la zona horaria. Cada persona convierte primero el horario y después introduce su fecha local en el temporizador.',
    },
    {
      title: 'Portátil que entra en reposo',
      description: 'El usuario descubre que el aviso puede retrasarse mientras el equipo duerme. Para la siguiente sesión activa una alarma del sistema como respaldo.',
    },
  ],
  notes: [
    'Duración admite hasta 99:59:59; fecha y hora puede mostrar días.',
    'Una pausa congela la duración, pero no aplaza una fecha objetivo.',
    'El título de la pestaña solo cambia mientras el contador está activo.',
    'El pitido depende del volumen, la salida y las políticas del navegador.',
    'Cerrar o recargar elimina el temporizador.',
  ],
  faq: [
    {
      q: '¿Cómo inicio una cuenta atrás online?',
      a: 'Elige duración o fecha y hora, introduce un valor futuro o mayor que cero y pulsa «Iniciar». La pantalla y el título mostrarán el tiempo restante.',
    },
    {
      q: '¿El temporizador sigue funcionando con la pestaña cerrada?',
      a: 'No. Cerrar, recargar o descartar la página elimina la sesión. Usa una alarma del sistema cuando necesites persistencia.',
    },
    {
      q: '¿Por qué no sonó el aviso?',
      a: 'El navegador, el volumen o la salida de audio pueden bloquear el pitido. El destello y el mensaje visual son el indicador principal.',
    },
    {
      q: '¿La pausa detiene también una fecha objetivo?',
      a: 'Detiene la actualización visible, pero no cambia el momento del calendario. Al reanudar, el contador se ajusta a lo que realmente falta.',
    },
    {
      q: '¿Qué zona horaria utiliza?',
      a: 'El campo de fecha y hora se interpreta en la zona local configurada en el dispositivo y no guarda un identificador de zona.',
    },
    {
      q: '¿Se corrige si una pestaña en segundo plano se retrasa?',
      a: 'La pantalla recalcula desde la hora final cuando vuelve a ejecutarse. El sonido puede retrasarse si el navegador o el dispositivo suspendieron la página.',
    },
    {
      q: '¿Puedo ejecutar varios temporizadores a la vez?',
      a: 'No en esta versión. Solo hay un contador activo y no existen presets, repeticiones ni intervalos encadenados.',
    },
    {
      q: '¿Sirve como alarma para medicación o seguridad?',
      a: 'No debe ser la única alarma. Para usos críticos configura un sistema diseñado para persistir y añade supervisión o avisos redundantes.',
    },
  ],
  labels: {
    durationMode: 'Duración',
    targetMode: 'Fecha y hora',
    hours: 'HH',
    minutes: 'MM',
    seconds: 'SS',
    targetDate: 'Fecha y hora objetivo',
    start: 'Iniciar',
    pause: 'Pausar',
    reset: 'Restablecer',
    timeUp: '¡Tiempo terminado!',
    daysAbbr: 'd',
    hoursAbbr: 'h',
    minsAbbr: 'min',
    secsAbbr: 's',
    durationError: 'Introduce una duración mayor que cero.',
    targetError: 'Selecciona una fecha y hora futuras.',
    ready: 'Listo',
    tabTitle: '{time} · Temporizador online',
  },
  privacyNote: 'La duración y la fecha se procesan en esta pestaña y no se conservan al cerrar. El tiempo restante se muestra temporalmente en el título.',
  disclaimer: 'El aviso puede retrasarse si la pestaña o el dispositivo se suspenden. No lo uses como única alarma para salud, seguridad, exámenes o procesos críticos.',
};

export const spanishCountdownTimerReview = {
  heading: 'Cómo comprobar una cuenta atrás',
  intro: 'Antes de depender del aviso, confirma el modo, la hora local y las condiciones del dispositivo.',
  panels: [
    { title: 'Modo', text: 'Duración mide un intervalo; fecha y hora apunta a un momento fijo del calendario.' },
    { title: 'Dispositivo', text: 'Mantén la pestaña abierta y evita que el equipo entre en reposo.' },
    { title: 'Aviso', text: 'Considera el sonido opcional y usa otra alarma cuando el resultado sea crítico.' },
  ],
  checklistHeading: 'Lista de comprobación',
  checklist: [
    'Los campos contienen una duración válida o un objetivo futuro.',
    'La zona horaria local coincide con la interpretación esperada.',
    'El tiempo aparece en el título mientras el contador corre.',
    'Existe un aviso de respaldo si cerrar o suspender la página tendría consecuencias.',
  ],
};

export const spanishStopwatch: ToolContent = {
  name: 'Cronómetro online',
  short: 'Mide tiempo transcurrido, pausa y reanuda, registra vueltas con tiempo parcial y total, y copia la lista.',
  long: 'Este cronómetro online utiliza performance.now(), un reloj monotónico de alta resolución del navegador, para calcular el tiempo activo. Muestra horas, minutos, segundos y centésimas, permite detener y continuar sin contar la pausa, y registra cada vuelta con su tiempo parcial y acumulado. La actualización visual usa requestAnimationFrame, pero el tiempo se recalcula desde el reloj al volver a la pestaña. No guarda sesiones ni ofrece precisión certificada para competición, salud, facturación o laboratorio.',
  seoTitle: 'Cronómetro online con vueltas y centésimas',
  seoDescription: 'Usa un cronómetro online con inicio, parada, reanudación y vueltas. Consulta tiempo parcial y total y copia los resultados.',
  keywords: [
    'cronómetro online',
    'cronómetro con vueltas',
    'cronómetro gratis',
    'tiempo parcial',
    'tiempo total',
    'cronómetro con centésimas',
    'medir tiempo online',
    'stopwatch online español',
  ],
  capabilities: [
    'Iniciar, detener y reanudar una misma medición de tiempo activo.',
    'Mostrar horas, minutos, segundos y dos dígitos de centésimas.',
    'Registrar vueltas con tiempo parcial desde la vuelta anterior y total acumulado.',
    'Mantener la lista visual con la vuelta más reciente arriba.',
    'Copiar las vueltas en orden cronológico al portapapeles.',
  ],
  contentSections: [
    {
      heading: 'Respuesta rápida: cómo usar el cronómetro online',
      paragraphs: [
        'Pulsa «Iniciar» para comenzar. El mismo botón pasa a «Detener» mientras el cronómetro está activo. «Vuelta» guarda una marca sin interrumpir la medición: registra el tramo desde la vuelta anterior y el total desde el primer inicio. Al detener, el tiempo queda congelado; pulsa de nuevo para reanudar sin incluir el periodo de pausa.',
        '«Restablecer» borra el tiempo y todas las vueltas. «Copiar vueltas» prepara un texto con una línea por marca, en orden de la primera a la última, aunque la lista visible enseña la más reciente arriba. Guarda el texto antes de recargar o cerrar porque no hay historial. Si solo necesitas una cuenta atrás hasta cero, utiliza el temporizador en lugar del cronómetro.',
      ],
    },
    {
      heading: 'Tiempo parcial y tiempo total',
      paragraphs: [
        'El tiempo parcial, también llamado split o tramo, mide lo transcurrido desde la marca anterior. El tiempo total es lo acumulado desde el inicio, excluyendo las pausas. Si la primera vuelta se registra en 00:45 y la segunda en 01:20, la segunda línea mostrará un parcial aproximado de 00:35 y un total de 01:20. Ambos valores responden preguntas distintas y conviene etiquetarlos al compartir.',
        'La primera vuelta tiene el mismo valor parcial y total porque todavía no existe una marca anterior. Después, cada parcial se calcula restando el total de la vuelta previa. Detener y reanudar no crea una vuelta automática ni reinicia el tramo; la siguiente vuelta suma el tiempo activo anterior y posterior a la pausa. Pulsa «Vuelta» antes de detener si necesitas cerrar un tramo en ese punto.',
      ],
    },
    {
      heading: 'Qué mide performance.now',
      paragraphs: [
        'performance.now() devuelve una marca temporal monotónica asociada al contexto de la página. A diferencia del reloj civil, no retrocede ni salta porque el usuario cambie manualmente la hora o porque se ajuste la hora del sistema. El cronómetro guarda la marca de inicio y suma la diferencia a los milisegundos acumulados antes de cada pausa.',
        'La interfaz muestra centésimas al truncar los milisegundos, pero esa cantidad de dígitos no garantiza una exactitud real de 0,01 segundos. La resolución disponible, la carga del dispositivo, el navegador, la pantalla táctil y el tiempo de reacción humano afectan el registro. La herramienta es adecuada para observación cotidiana y práctica, no para certificar una marca.',
      ],
      link: {
        prefix: 'La propiedad monotónica del reloj está documentada en ',
        label: 'Performance.now de MDN',
        href: 'https://developer.mozilla.org/es/docs/Web/API/Performance/now',
        suffix: '.',
      },
    },
    {
      heading: 'Actualización visual y pestañas en segundo plano',
      paragraphs: [
        'La pantalla se actualiza con requestAnimationFrame, que sincroniza el dibujo con el navegador y suele reducir su actividad cuando la pestaña no es visible. La medición no depende de contar fotogramas. Al volver, el valor visible se recalcula con performance.now() y recupera el tiempo activo transcurrido mientras la página seguía ejecutándose.',
        'Una pestaña descartada, una recarga, el cierre del navegador o un reinicio sí eliminan la sesión. El comportamiento del reloj durante la suspensión profunda puede variar según dispositivo y navegador. Para una actividad donde una interrupción invalida la medición, mantén la página visible, evita el reposo y utiliza un instrumento dedicado con registro persistente.',
      ],
    },
    {
      heading: 'Pausar sin contar el descanso',
      paragraphs: [
        'Al detener, el cronómetro calcula el tiempo activo hasta ese instante y lo guarda. Durante la pausa la pantalla permanece fija. Al reanudar crea una nueva marca de inicio y continúa sumando desde el acumulado. Este comportamiento sirve para medir trabajo efectivo, repeticiones o fases que excluyen descansos.',
        'Si necesitas medir el tiempo total de pared, incluidos los descansos, no pauses; registra una vuelta antes y después de cada intervalo. También puedes anotar el descanso en otra herramienta. El cronómetro no ofrece dos relojes simultáneos, tiempo neto frente a bruto, intervalos automáticos ni categorías para las vueltas.',
      ],
    },
    {
      heading: 'Leer, copiar y conservar las vueltas',
      paragraphs: [
        'La lista visual coloca la marca más reciente al principio para que el último parcial sea fácil de encontrar. Cada línea indica el número de vuelta, el parcial y el total. El texto copiado conserva el orden cronológico, de la vuelta 1 a la última, lo que facilita pegarlo en una nota, un chat o una hoja de cálculo como texto.',
        'No hay descarga CSV, exportación a Excel, cálculo de vuelta rápida o lenta, promedio, gráfico, comentarios ni edición. El portapapeles depende de los permisos del navegador; si la copia directa falla, la página puede mostrar un cuadro manual. Revisa separadores y etiquetas antes de convertir el texto en datos estructurados.',
      ],
    },
    {
      heading: 'Usos adecuados en estudio, deporte y trabajo',
      paragraphs: [
        'Puede utilizarse para practicar una exposición, estimar cuánto tarda una tarea, observar tramos de un ejercicio no competitivo o cronometrar actividades de aula. Las vueltas ayudan a comparar fases dentro de la misma sesión. En deporte recreativo, coloca el dispositivo donde no obligue a apartar la atención de una actividad o manipular la pantalla en movimiento.',
        'En trabajo, una medición breve puede mejorar estimaciones, pero no sustituye un registro laboral acordado. No utilices un cronómetro de navegador como única base para facturar, descontar salarios o evaluar rendimiento. El contexto, las interrupciones necesarias y la definición de tiempo computable deben establecerse antes de convertir unas marcas informales en una decisión.',
      ],
    },
    {
      heading: 'Cuándo hace falta un instrumento certificado',
      paragraphs: [
        'Una carrera oficial, una prueba médica, un experimento, una inspección, un proceso industrial o una evidencia legal pueden exigir precisión, calibración, redundancia, identificación del operador y trazabilidad. Esta página no ofrece certificado de calibración, sincronización externa, sello temporal, control de acceso ni registro contra modificaciones.',
        'Para esos usos emplea dispositivos y procedimientos aceptados por la organización responsable. La presencia de centésimas en la pantalla describe el formato, no la incertidumbre de medida. Incluso con un reloj interno estable, el momento de pulsar depende de la reacción humana y de la latencia de entrada. FunnyTools no puede validar la cadena completa de medición.',
      ],
    },
    {
      heading: 'Privacidad y funciones no incluidas',
      paragraphs: [
        'El tiempo y las vueltas se calculan en esta pestaña. FunnyTools no recibe ni almacena la sesión. Copiar traslada el texto al portapapeles del dispositivo, que puede sincronizarse o ser accesible a otras aplicaciones. No escribes nombres ni notas dentro del cronómetro, por lo que cualquier identificación debe añadirse fuera de la página.',
        'No hay cuenta, historial, enlace compartible, guardado al cerrar, atajos de teclado, pantalla completa, sonido, cuenta atrás, múltiples cronómetros, clasificación de vueltas ni exportación de archivo. Estas ausencias son importantes al elegir la herramienta. La página ofrece un cronómetro sencillo con pausa, reanudación, parciales, totales y copia de texto.',
      ],
    },
  ],
  instructions: [
    'Pulsa «Iniciar» al comienzo del intervalo que quieras medir.',
    'Usa «Vuelta» para guardar un parcial sin detener el total.',
    'Pulsa «Detener» para excluir una pausa y vuelve a iniciar para continuar.',
    'Comprueba la diferencia entre parcial y total antes de compartir resultados.',
    'Copia las vueltas antes de restablecer, recargar o cerrar la página.',
  ],
  examples: [
    'Medir cada parte de una presentación y el tiempo total de ensayo.',
    'Registrar vueltas recreativas con parciales y acumulado.',
    'Estimar cuánto tarda cada fase de una tarea repetitiva.',
    'Cronometrar una actividad de clase y copiar las marcas a una nota.',
  ],
  audience: [
    'Estudiantes y ponentes que practican actividades con varias fases.',
    'Docentes y facilitadores que necesitan marcas rápidas durante una sesión.',
    'Personas que observan ejercicio recreativo no oficial.',
    'Equipos que realizan estimaciones informales de tiempo activo.',
  ],
  caseStudies: [
    {
      title: 'Ensayo de una presentación',
      description: 'La estudiante registra una vuelta al terminar introducción, desarrollo y cierre. Usa los parciales para redistribuir contenido y el total para comprobar el límite.',
    },
    {
      title: 'Circuito con descansos excluidos',
      description: 'El usuario detiene durante el descanso y reanuda para la siguiente fase. Sabe que el total representa tiempo activo, no duración completa de la sesión.',
    },
    {
      title: 'Datos que deben conservarse',
      description: 'Antes de restablecer, la facilitadora copia las seis vueltas y añade fecha y actividad en su documento. La página no conserva una copia propia.',
    },
  ],
  notes: [
    'El formato es hh:mm:ss.cc, donde cc representa centésimas mostradas.',
    'Pausar excluye el descanso del tiempo total y del parcial en curso.',
    'La lista visual va de la vuelta más reciente a la más antigua.',
    'La copia coloca las vueltas en orden cronológico.',
    'No hay persistencia, CSV, promedios, atajos ni precisión certificada.',
  ],
  faq: [
    {
      q: '¿Cómo funciona este cronómetro online?',
      a: 'Calcula el tiempo activo con performance.now. Iniciar comienza, detener pausa sin contar el descanso y reanudar continúa desde el acumulado.',
    },
    {
      q: '¿Qué diferencia hay entre tiempo parcial y total?',
      a: 'El parcial mide desde la vuelta anterior; el total mide desde el primer inicio, excluyendo todos los periodos pausados.',
    },
    {
      q: '¿Las centésimas son exactas?',
      a: 'Son el formato mostrado, no una garantía de exactitud de 0,01 segundos. Dispositivo, navegador y reacción humana introducen incertidumbre.',
    },
    {
      q: '¿Sigue midiendo en segundo plano?',
      a: 'Si la página continúa viva, al volver recalcula el tiempo con el reloj monotónico. Cerrar, recargar o descartar la pestaña elimina la sesión.',
    },
    {
      q: '¿Qué pasa con la vuelta después de una pausa?',
      a: 'El descanso no se suma. La siguiente vuelta continúa el parcial activo que estaba abierto antes de detener.',
    },
    {
      q: '¿En qué orden se copian las vueltas?',
      a: 'Se copian desde la vuelta 1 hasta la última. En pantalla, la más reciente aparece arriba.',
    },
    {
      q: '¿Puedo descargar un CSV o ver promedios?',
      a: 'No. Esta versión copia texto y no calcula promedio, mejor vuelta, peor vuelta, gráfico ni archivo descargable.',
    },
    {
      q: '¿Sirve para una competición oficial?',
      a: 'No como instrumento certificado. Una competición o medición regulada necesita el equipo y el procedimiento aprobados por su organización.',
    },
  ],
  labels: {
    start: 'Iniciar',
    stop: 'Detener',
    lap: 'Vuelta',
    reset: 'Restablecer',
    copyLaps: 'Copiar vueltas',
    laps: 'Vueltas',
    noLaps: 'Todavía no hay vueltas',
    lapNumber: 'Vuelta',
    split: 'Parcial',
    total: 'Total',
    copied: 'Vueltas copiadas',
  },
  privacyNote: 'El tiempo y las vueltas se calculan en esta pestaña. FunnyTools no guarda la sesión. Copiar traslada el texto al portapapeles del dispositivo.',
  disclaimer: 'Las centésimas son un formato visual, no una certificación de precisión. No lo uses para competición oficial, salud, laboratorio, facturación o evidencia legal.',
};

export const spanishStopwatchReview = {
  heading: 'Cómo interpretar una sesión de cronómetro',
  intro: 'La lectura correcta distingue el tiempo activo, los parciales y las limitaciones de una medición manual en navegador.',
  panels: [
    { title: 'Parcial', text: 'Mide el tramo desde la vuelta anterior y excluye cualquier periodo pausado.' },
    { title: 'Total', text: 'Acumula el tiempo activo desde el primer inicio hasta cada vuelta.' },
    { title: 'Precisión', text: 'Dos decimales visibles no equivalen a una medición certificada a centésimas.' },
  ],
  checklistHeading: 'Lista de comprobación',
  checklist: [
    'El inicio y cada vuelta corresponden al evento que se quería observar.',
    'Las pausas se excluyeron de forma deliberada.',
    'Parcial y total están etiquetados al copiar los resultados.',
    'Los datos se guardan fuera de la página si deben conservarse.',
  ],
};
