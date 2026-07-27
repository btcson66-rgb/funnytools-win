import type { ToolContent } from '../tools/_types';

export const spanishUrlEncoder: ToolContent = {
  name: 'Codificar y decodificar URL online',
  short: 'Convierte texto y valores de parámetros con percent-encoding UTF-8 mediante encodeURIComponent y decodeURIComponent.',
  long: 'Pega un valor que vaya dentro de una ruta, consulta o fragmento y conviértelo a percent-encoding con `encodeURIComponent()`. También puedes recuperar texto desde secuencias `%HH` válidas con `decodeURIComponent()`. La herramienta trabaja sobre un componente, no analiza ni monta una URL completa: codifica caracteres estructurales como `?`, `&`, `=`, `/` y `#`, deja los espacios como `%20` y no interpreta `+` como espacio.',
  seoTitle: 'Codificar y decodificar URL online | UTF-8',
  seoDescription: 'Codifica componentes URL con encodeURIComponent y decodifica percent-encoding UTF-8. Explica %20, signo +, URLs completas y errores URI.',
  keywords: [
    'codificar URL online',
    'decodificar URL online',
    'URL encoder decoder',
    'percent encoding UTF-8',
    'encodeURIComponent online',
    'decodeURIComponent online',
    'codificar parámetros URL',
  ],
  capabilities: [
    'Codificar texto Unicode como un componente URI con secuencias porcentuales UTF-8.',
    'Decodificar secuencias `%HH` válidas para recuperar texto legible.',
    'Convertir tildes, ñ, emoji, espacios y delimitadores de consulta.',
    'Copiar el resultado o limpiar ambos cuadros para empezar otra prueba.',
    'Rechazar entradas mal formadas en vez de mostrar una salida parcial.',
  ],
  contentSections: [
    {
      heading: 'Respuesta rápida: cómo codificar una URL',
      paragraphs: [
        'Si necesitas colocar `café con leche & té` como valor de un parámetro, pega solo ese valor y pulsa «Codificar componente». El resultado será `caf%C3%A9%20con%20leche%20%26%20t%C3%A9`. Después puedes construir la consulta como `?q=` más la salida. Para volver al texto, pega la cadena codificada y pulsa «Decodificar componente». El cuadro original no se sustituye, por lo que puedes comparar entrada y resultado antes de copiar.',
        'La palabra «URL» de la búsqueda puede resultar ambigua. Este widget usa `encodeURIComponent()`, que está pensado para una parte de la dirección y codifica también caracteres con función estructural. Si pegas `https://ejemplo.com/buscar?q=café`, los dos puntos, barras, signo de interrogación e igual se convertirán. Eso puede ser correcto si toda la dirección será el valor de otro parámetro, pero no si querías conservarla como URL navegable.',
      ],
    },
    {
      heading: 'Qué significa percent-encoding en UTF-8',
      paragraphs: [
        'El percent-encoding representa determinados bytes con `%` seguido de dos dígitos hexadecimales. `encodeURIComponent()` convierte primero el texto Unicode a su representación UTF-8 y después escapa los bytes necesarios. Una `ñ` ocupa dos bytes UTF-8 y aparece como `%C3%B1`; un espacio aparece como `%20`; un emoji necesita cuatro bytes y produce cuatro grupos porcentuales. La cantidad de grupos no equivale al número visible de letras.',
        'Las letras latinas sin acento, los dígitos y algunos signos permanecen legibles. En concreto, el comportamiento nativo también deja sin escapar `- _ . ! ~ * \' ( )`. Eso no significa que cada protocolo, firma o servidor acepte exactamente la misma forma. Algunos perfiles basados en RFC 3986 aplican reglas más estrictas y codifican además determinados signos. La herramienta muestra la salida real de JavaScript; no afirma cumplir automáticamente todos los perfiles de canonicalización.',
      ],
      items: [
        '`á` se codifica por sus bytes UTF-8, no por una tabla Latin-1.',
        '`%20` representa un espacio en esta salida.',
        'Los dígitos hexadecimales de la salida suelen aparecer en mayúscula.',
        'Decodificar exige grupos porcentuales completos y bytes UTF-8 válidos.',
      ],
    },
    {
      heading: 'Componente URI frente a URL completa',
      paragraphs: [
        'Una dirección puede contener esquema, autoridad, ruta, consulta y fragmento. Dentro de la consulta, `&` separa pares y `=` separa nombre y valor; `#` inicia un fragmento y `/` separa segmentos de ruta. Al codificar un valor individual conviene escapar esos delimitadores para que pasen a ser datos. Por eso `tema=a&b` no debe construirse concatenando el valor bruto `a&b`: el ampersand podría interpretarse como un segundo parámetro.',
        'No uses el resultado como verificador de seguridad. La codificación no comprueba `http` frente a `https`, dominio, puerto, ruta autorizada, redirecciones, homógrafos ni esquemas peligrosos. Tampoco evita inyección cuando el destino es HTML, JavaScript, SQL o una cabecera. Cada contexto tiene su propia codificación y validación. Primero valida qué dato está permitido; después codifica el componente en el punto donde se inserta.',
      ],
    },
    {
      heading: 'Espacio como %20 y signo más',
      paragraphs: [
        '`encodeURIComponent()` transforma el espacio en `%20`. Los formularios con tipo `application/x-www-form-urlencoded` suelen representar el espacio con `+`, pero esa es otra convención. `decodeURIComponent()` no cambia automáticamente `+` por espacio: `café+molido` seguirá siendo `café+molido`. Si analizas datos de formulario, necesitas un parser de formularios o reemplazar el signo según el formato documentado antes de decodificar.',
        'El signo más literal puede ser un dato válido, por ejemplo en una zona horaria, un teléfono o una expresión. Sustituir todos los `+` sin conocer el formato puede corromperlo. Pregunta si la fuente es un componente URI codificado con porcentajes, una cadena de consulta serializada como formulario o simplemente texto. Esta página resuelve el primer caso; no divide parámetros ni decide si un `+` significa suma, espacio o carácter literal.',
      ],
    },
    {
      heading: 'Errores al decodificar y Unicode mal formado',
      paragraphs: [
        'Una secuencia como `%E0%A4%A` está incompleta y `decodeURIComponent()` lanza `URIError`; la herramienta vacía la salida y muestra un mensaje en español. También falla si los bytes porcentuales no forman UTF-8 válido. No intenta adivinar Windows-1252, Latin-1 u otra codificación, ni conserva silenciosamente una parte correcta. Si la cadena proviene de un sistema antiguo, identifica primero el charset declarado por esa fuente.',
        'Al codificar, JavaScript también puede rechazar un sustituto Unicode aislado, una mitad interna de un carácter suplementario. Normalmente no aparece al escribir texto, pero puede surgir al cortar datos dañados o manipular unidades UTF-16. El componente ahora captura ese error y no deja una excepción de página. Reparar o sustituir ese carácter requiere una decisión sobre la fuente; el widget no altera datos defectuosos sin avisar.',
      ],
    },
    {
      heading: 'Privacidad, secretos y comprobación',
      paragraphs: [
        'La conversión se realiza en la memoria de esta pestaña. FunnyTools no recibe la cadena para codificarla ni conserva un historial. Aun así, una URL puede incluir tokens, correos, identificadores, rutas internas o consultas personales. El percent-encoding es reversible y no oculta el dato frente al servidor, historial, registro, analítica, captura o persona que reciba el enlace. Usa valores ficticios para probar.',
        'Comprueba el resultado dentro de la aplicación real. Verifica que el nombre del parámetro aparezca una sola vez, que `&` o `#` pertenecientes al valor ya no corten la estructura y que el servidor recupere el texto esperado una sola vez. La doble codificación convierte `%` en `%25`; por ejemplo, `%C3%B1` puede acabar como `%25C3%25B1`. Conserva la entrada y evita encadenar codificadores sin saber qué capa falta.',
      ],
    },
  ],
  instructions: [
    'Identifica si trabajarás con un valor individual o si toda la URL será el dato de otro campo.',
    'Pega una copia sin contraseñas, tokens ni información personal.',
    'Pulsa codificar o decodificar y revisa espacios, delimitadores, tildes, ñ y emoji.',
    'Construye o prueba la URL en el sistema de destino sin volver a codificar la salida por error.',
    'Confirma que el receptor recupera exactamente el valor original y conserva la fuente.',
  ],
  examples: [
    'Codificar una búsqueda con espacios, tildes y ampersand antes de añadirla a `?q=`.',
    'Preparar un nombre de archivo Unicode como segmento de una ruta.',
    'Leer una cadena recibida con grupos `%HH` y comprobar si contiene texto UTF-8.',
    'Detectar una consulta de formulario donde `+` y `%20` no deben tratarse igual sin contexto.',
    'Comprobar si un valor ya estaba codificado antes de aplicar otra capa.',
  ],
  audience: [
    'Personas que construyen o depuran consultas, rutas y enlaces.',
    'Equipos de soporte que necesitan leer parámetros codificados sin compartir secretos.',
    'Desarrollo, QA y analítica que validan valores Unicode en una URL.',
    'Docentes y estudiantes que estudian percent-encoding y UTF-8.',
  ],
  caseStudies: [
    {
      title: 'Búsqueda con ampersand',
      description: 'El valor `café & té` se codifica antes de añadirlo a `q`. `%26` mantiene el ampersand dentro del valor, en vez de crear por accidente otro parámetro.',
    },
    {
      title: 'URL dentro de otra URL',
      description: 'Una dirección de retorno completa se utiliza como valor de `redirect`. En ese caso sí se codifica el conjunto completo porque sus `?`, `&` y `#` deben viajar como datos.',
    },
    {
      title: 'Doble codificación',
      description: 'Un equipo recibe `%2520` y descubre que `%20` fue codificado otra vez. Revisa cada capa y evita decodificar repetidamente datos no confiables.',
    },
  ],
  notes: [
    'La herramienta usa `encodeURIComponent()` y `decodeURIComponent()`, no `encodeURI()`.',
    'Codifica componentes; no valida ni reconstruye una URL completa.',
    'El espacio sale como `%20`; el decodificador no transforma `+` en espacio.',
    'El percent-encoding es reversible y no protege secretos.',
    'Una secuencia porcentual o Unicode mal formada produce un error, no una salida parcial.',
  ],
  faq: [
    {
      q: '¿Debo pegar una URL completa?',
      a: 'Solo si toda esa URL será el valor de otro componente. Para conservar una dirección navegable, codifica únicamente cada valor que lo necesite.',
    },
    {
      q: '¿Por qué el espacio aparece como %20 y no como +?',
      a: 'Porque se usa encodeURIComponent. El signo más para espacios pertenece a la serialización de formularios y requiere tratar ese formato por separado.',
    },
    {
      q: '¿Decodifica dos veces automáticamente?',
      a: 'No. Aplica una sola operación para evitar alterar datos que contienen un porcentaje literal o una capa que aún debe conservarse.',
    },
    {
      q: '¿La codificación hace segura una URL?',
      a: 'No. Solo representa caracteres. Debes validar esquema, dominio, ruta, permisos y el contexto donde se inserta el valor.',
    },
    {
      q: '¿Qué ocurre con una secuencia % inválida?',
      a: 'Se muestra un error y la salida queda vacía. No se intenta adivinar ni devolver una cadena parcial.',
    },
    {
      q: '¿La cadena se envía a FunnyTools?',
      a: 'No. La operación ocurre localmente en el navegador, pero evita introducir secretos porque la codificación es reversible.',
    },
  ],
  labels: {
    input: 'Texto o componente URI',
    output: 'Resultado',
    placeholder: 'Ejemplo: café con leche & té',
    encode: 'Codificar componente',
    decode: 'Decodificar componente',
    copy: 'Copiar resultado',
    clear: 'Borrar',
    copied: 'Resultado copiado',
    invalidUrl: 'No se pudo decodificar: revisa los grupos %HH y que los bytes formen UTF-8 válido.',
    invalidText: 'No se pudo codificar: el texto contiene una secuencia Unicode incompleta.',
  },
  privacyNote: 'El texto se codifica y decodifica en esta pestaña. FunnyTools no recibe ni guarda el valor introducido.',
  disclaimer: 'El percent-encoding no valida una URL, no evita inyecciones en otros contextos y no cifra información. Comprueba la estructura y el valor recuperado en el destino.',
};

export const spanishUrlEncoderReview = {
  heading: 'Cómo comprobar un componente URL',
  intro: 'Una salida con signos de porcentaje puede ser válida y aun así estar aplicada a la parte equivocada o tener una capa de más.',
  panels: [
    { title: 'Define la pieza', text: 'Separa esquema, dominio, ruta, nombre de parámetro, valor y fragmento antes de codificar.' },
    { title: 'Revisa la convención', text: 'Distingue percent-encoding de componente y serialización de formulario con signo más.' },
    { title: 'Prueba una vuelta', text: 'Decodifica una vez y confirma que recuperas exactamente el texto esperado.' },
  ],
  checklistHeading: 'Lista de comprobación',
  checklist: [
    'La entrada no contiene tokens, contraseñas ni datos personales.',
    'Los delimitadores que son datos están codificados y los estructurales permanecen fuera del valor.',
    'No se aplicó una segunda capa de codificación por accidente.',
    'El servidor o aplicación de destino interpreta el valor como esperabas.',
  ],
};

export const spanishTimestampConverter: ToolContent = {
  name: 'Convertir timestamp Unix a fecha',
  short: 'Convierte segundos o milisegundos desde la época Unix a hora local, UTC e ISO 8601.',
  long: 'Introduce una marca de tiempo numérica, elige segundos, milisegundos o detección automática y compara cinco representaciones del mismo instante. La herramienta utiliza `Date` en el navegador: el valor interno está en milisegundos desde 1970-01-01T00:00:00Z, la hora local depende de la zona del dispositivo, UTC se muestra por separado e ISO 8601 termina en `Z`. El modo automático es una heurística de magnitud, no metadatos de la fuente.',
  seoTitle: 'Convertir timestamp Unix a fecha | Segundos y ms',
  seoDescription: 'Convierte timestamp Unix o epoch en segundos y milisegundos a fecha local, UTC e ISO 8601. Explica zona horaria y detección automática.',
  keywords: [
    'convertir timestamp Unix a fecha',
    'convertidor timestamp online',
    'epoch a fecha',
    'Unix timestamp segundos milisegundos',
    'timestamp a ISO 8601',
    'timestamp a UTC',
    'fecha desde timestamp',
  ],
  capabilities: [
    'Interpretar una marca de tiempo como segundos o milisegundos desde la época Unix.',
    'Elegir la unidad explícitamente o aplicar una heurística automática por magnitud.',
    'Mostrar la fecha en la zona local del navegador con formato español.',
    'Comparar UTC, ISO 8601, segundos Unix y milisegundos Unix.',
    'Insertar el instante actual y copiar su representación ISO.',
  ],
  contentSections: [
    {
      heading: 'Respuesta rápida: convertir timestamp a fecha',
      paragraphs: [
        'Pega un número como `0`, `1704067200` o `1704067200000`. Si conoces la unidad, selecciónala; es la opción más segura. Pulsa «Convertir» y compara hora local, UTC, ISO 8601, segundos y milisegundos. `0` representa el inicio de 1970 en UTC. Los dos valores de 2024 del ejemplo representan el mismo instante cuando el primero se interpreta como segundos y el segundo como milisegundos.',
        'La hora local no está incluida dentro del número. El timestamp identifica un instante y el navegador lo presenta usando la zona configurada en el dispositivo. Dos personas en Madrid y Ciudad de México verán horas locales diferentes, pero deberían obtener el mismo ISO con `Z` y el mismo valor Unix. Si una captura o informe necesita ser reproducible, anota la zona o utiliza UTC/ISO en vez de depender únicamente de la cadena local.',
      ],
    },
    {
      heading: 'Época Unix, segundos y milisegundos',
      paragraphs: [
        'El tiempo Unix se expresa habitualmente como segundos transcurridos desde 1970-01-01 00:00:00 UTC. JavaScript `Date`, en cambio, almacena un número de milisegundos desde esa época. Por eso el componente multiplica por 1.000 cuando eliges segundos y usa el valor directamente cuando eliges milisegundos. Las fracciones también se aceptan como número; `0.5` segundos equivale a 500 milisegundos.',
        'Los timestamps anteriores a la época pueden ser negativos. `-1` segundo representa el instante inmediatamente anterior: 1969-12-31T23:59:59.000Z. No confundas esta escala con Excel, FILETIME, NTP, GPS, días julianos, microsegundos o nanosegundos; pueden usar otra época o unidad. La herramienta no reconoce esos formatos ni los convierte por nombre. Revisa la documentación del campo, longitud, ejemplos y sistema que produjo el dato.',
      ],
      items: [
        '`0` segundos → `1970-01-01T00:00:00.000Z`.',
        '`1` segundo → `1970-01-01T00:00:01.000Z`.',
        '`1000` milisegundos → el mismo instante que `1` segundo.',
        'Un valor negativo indica un instante anterior a la época si la fuente usa esta escala.',
      ],
    },
    {
      heading: 'Cómo funciona la detección automática',
      paragraphs: [
        'El modo automático usa una regla sencilla: si el valor absoluto es menor que 100.000.000.000, lo trata como segundos; a partir de ese límite lo trata como milisegundos. Esto distingue los timestamps contemporáneos de 10 dígitos y 13 dígitos que aparecen con frecuencia. No inspecciona una API, base de datos o unidad declarada y tampoco sabe si el número es realmente una fecha.',
        'La heurística puede equivocarse con fechas muy lejanas, valores truncados o datos de otra unidad. Un timestamp de milisegundos pequeño cerca de 1970 podría tomarse como segundos; un timestamp de segundos extremadamente futuro podría tomarse como milisegundos. Para una migración, auditoría o incidente, selecciona la unidad indicada por el contrato y compara una fecha conocida. La detección automática sirve para explorar, no para establecer por sí sola el significado de un campo.',
      ],
    },
    {
      heading: 'Hora local, UTC e ISO 8601',
      paragraphs: [
        '«Hora local» utiliza la zona del navegador y un locale español. Puede incluir formato de 12 o 24 horas y abreviaturas distintas según sistema. «UTC» usa `toUTCString()` y no adopta el desplazamiento local. «ISO 8601» usa `toISOString()` y termina en `Z`, que señala UTC. Las tres cadenas describen el mismo instante; solo cambia la representación y, en el caso local, la fecha civil puede caer en el día anterior o siguiente.',
        'La herramienta no permite elegir una zona IANA como `Europe/Madrid` o `America/Bogota`; utiliza la del dispositivo. Tampoco muestra el historial de horario de verano como una regla editable. Si el resultado local parece desplazado, revisa primero zona, reloj y configuración del sistema. Para comparar servidores, logs o APIs, usa ISO o UTC. Para una cita humana, conserva además la zona y el desplazamiento que correspondían al lugar del evento.',
      ],
    },
    {
      heading: 'Precisión, límites y segundos intercalares',
      paragraphs: [
        'El widget usa el tipo `Number` y el objeto `Date`. La representación ISO incluye milisegundos, pero no microsegundos ni nanosegundos. Un valor con más precisión puede redondearse al convertirse a número o perder la parte que `Date` no almacena. MDN documenta además el intervalo finito de `Date`, aproximadamente ±100 millones de días respecto de 1970. Fuera de ese rango se obtiene una fecha inválida.',
        '`Date.now()` y el modelo de `Date` cuentan milisegundos de acuerdo con la escala de ECMAScript e ignoran segundos intercalares. Este conversor no reconstruye una cronología astronómica ni TAI. Tampoco resuelve el problema de 2038 de un sistema concreto: que el navegador pueda representar una fecha no demuestra que una base de datos de 32 bits la acepte. Valida rangos y tipos en el sistema donde guardarás el valor.',
      ],
    },
    {
      heading: 'Privacidad y validación de registros',
      paragraphs: [
        'La cifra se convierte localmente y no se envía a FunnyTools. Una marca de tiempo aislada rara vez identifica a alguien, pero combinada con usuario, IP, ubicación o evento puede ser dato sensible. Evita pegar líneas completas de logs, tokens o identificadores. Extrae una copia del campo temporal o crea un ejemplo equivalente antes de investigar en un dispositivo compartido.',
        'Para validar un registro, confirma unidad, instante conocido, zona de presentación y precisión. Comprueba al menos un valor cero, uno actual y uno negativo o de frontera si el sistema los admite. Compara el ISO con otra fuente independiente y documenta si redondeaste segundos. La salida ayuda a leer el número; no certifica que el reloj de origen estuviera sincronizado, que el evento ocurriera realmente o que el campo no haya sido modificado.',
      ],
    },
  ],
  instructions: [
    'Consulta la documentación del campo y selecciona segundos o milisegundos cuando la unidad sea conocida.',
    'Pega solo la cifra, sin texto, comas de millares, identificadores ni líneas completas de log.',
    'Convierte y compara hora local, UTC, ISO, segundos y milisegundos.',
    'Revisa la zona del dispositivo y confirma un instante conocido de la misma fuente.',
    'Copia ISO solo después de documentar unidad, zona y precisión requeridas.',
  ],
  examples: [
    'Leer la hora de creación de un objeto API expresada en segundos Unix.',
    'Comparar un valor JavaScript de 13 dígitos con un timestamp de backend de 10 dígitos.',
    'Normalizar un instante a ISO 8601 UTC para un informe técnico.',
    'Comprobar un timestamp negativo anterior a 1970.',
    'Detectar que un campo está en microsegundos y necesita otra conversión antes de usarlo.',
  ],
  audience: [
    'Desarrollo y QA que depuran APIs, eventos y bases de datos.',
    'Operaciones que leen registros sin exponer la línea completa.',
    'Analistas que necesitan distinguir zona local y UTC.',
    'Estudiantes que aprenden época Unix, milisegundos e ISO 8601.',
  ],
  caseStudies: [
    {
      title: 'Diez frente a trece dígitos',
      description: 'Una API entrega `1704067200` y un navegador `1704067200000`. Al elegir sus unidades, ambos producen 2024-01-01T00:00:00.000Z.',
    },
    {
      title: 'Incidente entre zonas horarias',
      description: 'El equipo compara ISO UTC en vez de capturas locales. Descubre que los registros describen el mismo instante aunque la fecha civil difiere entre oficinas.',
    },
    {
      title: 'Campo en microsegundos',
      description: 'Un valor de 16 dígitos da una fecha inválida o absurda. Se revisa el contrato y se divide con una herramienta adecuada; no se fuerza el modo milisegundos.',
    },
  ],
  notes: [
    'La detección automática usa magnitud; no conoce la unidad declarada por la fuente.',
    'La hora local depende de la zona configurada en el navegador.',
    'ISO 8601 y UTC describen el mismo instante sin adoptar la zona local.',
    'El objeto Date conserva milisegundos, no microsegundos ni nanosegundos.',
    'La salida no demuestra que el reloj o registro de origen sea correcto.',
  ],
  faq: [
    {
      q: '¿Cómo sé si el timestamp está en segundos o milisegundos?',
      a: 'Consulta la documentación. Diez dígitos actuales suelen ser segundos y trece milisegundos, pero esa observación no sustituye una unidad declarada.',
    },
    {
      q: '¿Por qué la hora local es distinta en otro país?',
      a: 'El número identifica un instante; la representación local usa la zona de cada dispositivo. Compara ISO o UTC para obtener una referencia común.',
    },
    {
      q: '¿Admite fechas anteriores a 1970?',
      a: 'Sí, mediante valores negativos dentro del rango de JavaScript Date. Confirma que el sistema de origen también use Unix y acepte negativos.',
    },
    {
      q: '¿Admite microsegundos o nanosegundos?',
      a: 'No directamente. Debes convertir la unidad a milisegundos o segundos con la precisión y redondeo definidos por tu sistema.',
    },
    {
      q: '¿El botón de ahora usa la hora del servidor?',
      a: 'No. Utiliza el reloj del dispositivo mediante Date.now(), por lo que depende de que ese reloj esté configurado correctamente.',
    },
    {
      q: '¿FunnyTools guarda el timestamp?',
      a: 'No. La conversión se ejecuta en esta pestaña y la herramienta no conserva un historial.',
    },
  ],
  labels: {
    locale: 'es',
    input: 'Timestamp Unix',
    unit: 'Unidad de entrada',
    auto: 'Detectar automáticamente',
    seconds: 'Segundos',
    milliseconds: 'Milisegundos',
    convert: 'Convertir timestamp',
    now: 'Usar el instante actual',
    copy: 'Copiar ISO',
    local: 'Hora local del dispositivo',
    utc: 'UTC',
    iso: 'ISO 8601',
    unixSeconds: 'Unix en segundos',
    unixMilliseconds: 'Unix en milisegundos',
    invalid: 'Introduce un timestamp numérico válido dentro del rango admitido.',
  },
  privacyNote: 'El timestamp se convierte dentro de esta pestaña. FunnyTools no recibe ni guarda el número o las fechas mostradas.',
  disclaimer: 'La detección automática es una heurística y la hora local depende del dispositivo. Verifica unidad, zona, precisión y reloj de origen antes de usar el resultado.',
};

export const spanishTimestampConverterReview = {
  heading: 'Cómo comprobar una conversión temporal',
  intro: 'El mismo número puede producir una fecha muy distinta si la unidad o la época están mal identificadas.',
  panels: [
    { title: 'Confirma la unidad', text: 'Prefiere el contrato del campo a una inferencia basada solo en el número de dígitos.' },
    { title: 'Separa instante y zona', text: 'Compara ISO o UTC y usa la hora local solo como representación del dispositivo.' },
    { title: 'Revisa la precisión', text: 'Documenta si la fuente usa segundos, milisegundos u otra unidad y cómo se redondeó.' },
  ],
  checklistHeading: 'Lista de comprobación',
  checklist: [
    'La fuente utiliza la época Unix y no otra escala temporal.',
    'La unidad fue seleccionada explícitamente cuando estaba documentada.',
    'La zona del dispositivo es correcta y el ISO coincide con un caso conocido.',
    'El sistema de destino acepta el rango y la precisión del resultado.',
  ],
};

export const spanishUuidGenerator: ToolContent = {
  name: 'Generador de UUID v4 online',
  short: 'Genera entre 1 y 100 UUID versión 4 con crypto.randomUUID, en minúsculas, mayúsculas o sin guiones.',
  long: 'Elige una cantidad entera y crea UUID v4 aleatorios dentro del contexto HTTPS del navegador. La salida canónica tiene 36 caracteres, cinco grupos hexadecimales y guiones en patrón 8-4-4-4-12. Puedes cambiar solo la presentación a mayúsculas o quitar guiones y descargar un TXT. Un UUID es un identificador con probabilidad de colisión extremadamente baja, no una contraseña, token de acceso, firma ni prueba de unicidad absoluta.',
  seoTitle: 'Generador UUID v4 online | Crear GUID en lote',
  seoDescription: 'Genera 1 a 100 UUID v4 o GUID con crypto.randomUUID. Copia o descarga valores, elige formato y conoce versión, variante y límites.',
  keywords: [
    'generador UUID v4 online',
    'generar UUID online',
    'generador GUID',
    'crear UUID aleatorio',
    'UUID v4 en lote',
    'crypto.randomUUID',
    'generar identificadores únicos',
  ],
  capabilities: [
    'Generar de 1 a 100 UUID v4 en una sola operación.',
    'Usar el generador criptográficamente seguro expuesto por el navegador.',
    'Mostrar el formato canónico en minúsculas o mayúsculas.',
    'Quitar guiones cuando el sistema de destino exija 32 dígitos hexadecimales.',
    'Copiar la lista o descargarla como archivo de texto con un UUID por línea.',
  ],
  contentSections: [
    {
      heading: 'Respuesta rápida: generar UUID v4',
      paragraphs: [
        'Indica cuántos identificadores necesitas, entre 1 y 100, elige minúsculas, mayúsculas o sin guiones y pulsa «Generar UUID v4». El campo se normaliza a un entero dentro del rango. Cada clic crea una lista nueva. Copia todos los valores o descarga `uuids.txt`, que termina con un salto de línea. Comprueba después el formato y la restricción de la columna, API o fixture donde se usarán.',
        'La forma habitual se parece a `36b8f84d-df4e-4d49-b662-bcde71a8764f`. El primer carácter del tercer grupo es `4`, que identifica la versión. El comienzo del cuarto grupo refleja la variante definida para UUID. Cambiar letras a mayúsculas no cambia los 128 bits; quitar guiones tampoco genera otro valor, pero deja de ser la representación textual canónica y algunos validadores pueden rechazarla.',
      ],
    },
    {
      heading: 'Qué es un UUID v4 y qué no contiene',
      paragraphs: [
        'UUID significa identificador único universal. La versión 4 rellena los campos disponibles con bits aleatorios o seudoaleatorios y fija los bits de versión y variante según la especificación actual RFC 9562. No incorpora fecha, dirección MAC, nombre, usuario, secuencia de base de datos ni ubicación. Por eso dos valores no se pueden ordenar cronológicamente ni decodificar para conocer quién los creó.',
        'La palabra «único» describe un diseño probabilístico y un espacio enorme, no una consulta global que garantice que nadie generó el mismo valor. RFC 9562 exige pensar en la calidad de la fuente aleatoria y en las colisiones. Para una base de datos, conserva una restricción `UNIQUE` y decide qué hacer si una inserción colisiona. El generador no consulta tu tabla ni reserva identificadores frente a otros sistemas.',
      ],
      items: [
        'Versión: 4, indicada en el campo correspondiente.',
        'Origen: `crypto.randomUUID()` del navegador en contexto seguro.',
        'Formato canónico: 32 dígitos hexadecimales más cuatro guiones.',
        'Contenido: aleatorio; no codifica hora, dispositivo ni identidad.',
      ],
    },
    {
      heading: 'Aleatoriedad del navegador y HTTPS',
      paragraphs: [
        'MDN documenta que `crypto.randomUUID()` genera UUID v4 mediante un generador de números aleatorios criptográficamente seguro y solo está disponible en contextos seguros en los navegadores compatibles. FunnyTools se sirve por HTTPS y llama directamente a esa API; no usa `Math.random()`, una lista del servidor ni un contador de página. Los valores se crean en el dispositivo y el sitio no recibe la lista.',
        'Que la fuente sea criptográficamente segura no convierte el UUID en secreto. El valor suele viajar como identificador visible en rutas, cabeceras, bases de datos o logs. Si alguien conoce un UUID usado como única autorización, puede intentar acceder al recurso. Para sesiones, restablecimiento de contraseña, claves de API y enlaces confidenciales se necesita un diseño de autenticación, expiración, permisos, revocación y registro adecuado.',
      ],
    },
    {
      heading: 'Minúsculas, mayúsculas y formato sin guiones',
      paragraphs: [
        'Los dígitos hexadecimales `a` a `f` no cambian de valor al mostrarse en mayúsculas. Muchos parsers aceptan ambas formas y las comparaciones de UUID suelen ser insensibles a la caja, pero una comparación textual, expresión regular, firma o sistema legado puede exigir una forma concreta. Elige la presentación que documente el receptor y no cambies el formato después de calcular hashes o firmas sobre la cadena.',
        'La opción «Sin guiones» elimina los cuatro separadores y deja 32 caracteres. No transforma el UUID en otro tipo ni aumenta la entropía; solo cambia la representación. PostgreSQL, bibliotecas UUID y APIs estrictas pueden preferir o normalizar la forma con guiones. Excel también puede interpretar o modificar ciertos textos al importar. Prueba un valor ficticio, define la columna como texto cuando corresponda y confirma que al leerlo se recuperan los mismos dígitos.',
      ],
    },
    {
      heading: 'Colisiones, índices y elección de versión',
      paragraphs: [
        'La probabilidad de colisión de UUID v4 bien generados es muy baja para volúmenes habituales, pero no es cero. Tampoco todos los problemas de identidad requieren UUID. Una clave incremental puede ser más pequeña y ordenable; UUID v7 puede aportar orden temporal; UUID v5 crea valores deterministas desde un nombre y espacio de nombres. Este widget solo produce v4 y no debe presentarse como generador de v1, v5 o v7.',
        'Valores aleatorios insertados como clave primaria pueden dispersar escrituras en determinados índices y ocupar más espacio que un entero. Eso depende del motor, tipo nativo, carga y patrón de acceso. Antes de migrar, mide tamaño, inserción, orden y serialización. No quites guiones solo por rendimiento sin comprobar cómo almacena realmente el motor: un tipo UUID binario o nativo puede no guardar la cadena literal.',
      ],
    },
    {
      heading: 'Privacidad, lotes y verificación',
      paragraphs: [
        'Los UUID se generan y permanecen en esta pestaña hasta que copies, descargues, regeneres o cierres. FunnyTools no mantiene un registro para comprobarlos más tarde. El archivo TXT se crea mediante un objeto Blob local. Evita generar identificadores finales en un equipo no confiable o pegarlos en servicios externos; una extensión, portapapeles sincronizado o carpeta compartida pertenece al entorno del dispositivo.',
        'Para verificar un lote canónico, cuenta 36 caracteres por línea, cuatro guiones, un `4` en la posición de versión y un carácter de variante válido en el cuarto grupo. Comprueba que el total solicitado coincide, que no hay líneas repetidas dentro del lote y que el sistema de destino aplica su restricción. Una expresión regular confirma forma, no aleatoriedad, procedencia, autorización ni ausencia universal de colisiones.',
      ],
    },
  ],
  instructions: [
    'Indica una cantidad entera entre 1 y 100; el campo se ajustará al rango permitido.',
    'Elige formato canónico en minúsculas, mayúsculas o una copia sin guiones.',
    'Genera la lista y verifica cantidad, versión, variante y formato.',
    'Copia o descarga el TXT y pruébalo primero en datos no productivos.',
    'Mantén restricciones de unicidad y permisos en el sistema que consuma los identificadores.',
  ],
  examples: [
    'Crear claves para fixtures y pruebas automatizadas.',
    'Preparar identificadores de ejemplo para una API o documentación.',
    'Generar referencias cliente antes de sincronizar datos con un servidor.',
    'Probar si una columna acepta la forma canónica o requiere texto sin guiones.',
    'Comparar el formato de un UUID v4 con un valor recibido de otra fuente.',
  ],
  audience: [
    'Desarrollo, QA y datos que preparan fixtures o identificadores de ejemplo.',
    'Equipos que prueban validadores, importaciones y tipos UUID nativos.',
    'Docentes y estudiantes que revisan versión, variante y representación.',
    'Personas que necesitan un lote pequeño sin instalar una aplicación.',
  ],
  caseStudies: [
    {
      title: 'Fixtures de integración',
      description: 'QA genera 20 UUID v4 para datos ficticios, conserva la forma canónica y verifica que la API rechaza duplicados mediante una restricción real.',
    },
    {
      title: 'Columna sin guiones',
      description: 'Un sistema legado exige 32 hexadecimales. El equipo usa la opción sin guiones, pero documenta que sigue siendo la representación del mismo UUID v4.',
    },
    {
      title: 'Token confundido con identificador',
      description: 'Un prototipo usaba el UUID visible como única autorización. Se corrige el diseño para exigir sesión y permisos; el UUID queda solo como referencia.',
    },
  ],
  notes: [
    'Solo se generan UUID versión 4; no v1, v5, v6 o v7.',
    'La forma sin guiones puede no ser aceptada por validadores estrictos.',
    'Un UUID no es una contraseña, token de acceso, firma ni prueba de autorización.',
    'La probabilidad de colisión es muy baja, pero una base de datos aún debe imponer unicidad.',
    'La herramienta no registra, reserva ni sincroniza los identificadores generados.',
  ],
  faq: [
    {
      q: '¿Los valores son realmente UUID v4?',
      a: 'Sí, se crean con crypto.randomUUID del navegador, que produce UUID versión 4 en un contexto HTTPS compatible.',
    },
    {
      q: '¿UUID y GUID son lo mismo?',
      a: 'GUID es un término usado especialmente en ecosistemas Microsoft. En muchos usos se refiere a la misma estructura de 128 bits, pero confirma formato y parser del sistema.',
    },
    {
      q: '¿Puedo usar un UUID como contraseña o token?',
      a: 'No como sustituto automático. Es un identificador; autenticación y secretos requieren controles diseñados para ese riesgo.',
    },
    {
      q: '¿Quitar guiones crea un UUID distinto?',
      a: 'No cambia los dígitos ni los bits representados, pero sí la cadena y puede dejar de cumplir el formato textual esperado por un validador.',
    },
    {
      q: '¿Puede haber dos UUID iguales?',
      a: 'La probabilidad con v4 bien generado es extremadamente baja, no cero. Mantén restricciones de unicidad y tratamiento de conflictos.',
    },
    {
      q: '¿Los UUID se envían al servidor?',
      a: 'No. Se generan localmente en el navegador y solo salen del dispositivo si tú los copias, descargas o compartes.',
    },
  ],
  labels: {
    count: 'Cantidad de UUID',
    format: 'Formato de salida',
    lower: 'Canónico en minúsculas',
    upper: 'Canónico en mayúsculas',
    noHyphen: 'Sin guiones',
    generate: 'Generar UUID v4',
    copy: 'Copiar todos',
    download: 'Descargar TXT',
    output: 'UUID generados',
    unsupported: 'Este navegador no permite generar UUID v4 con crypto.randomUUID en el contexto actual.',
  },
  privacyNote: 'Los UUID se generan con crypto.randomUUID en este navegador. FunnyTools no recibe, reserva ni guarda la lista.',
  disclaimer: 'Un UUID v4 es un identificador probabilístico, no una credencial ni una garantía absoluta. Valida el formato e impón unicidad y permisos en el sistema de destino.',
};

export const spanishUuidGeneratorReview = {
  heading: 'Cómo comprobar un lote de UUID',
  intro: 'La apariencia correcta confirma parte del formato, pero la unicidad y la autorización pertenecen al sistema que almacenará los valores.',
  panels: [
    { title: 'Revisa versión', text: 'En formato canónico, el tercer grupo comienza por 4 y la variante ocupa bits del cuarto grupo.' },
    { title: 'Conserva el significado', text: 'Caja y guiones cambian la cadena visible, no convierten v4 en otra versión.' },
    { title: 'Valida en destino', text: 'Prueba el tipo, la restricción única, el parser y los permisos con datos ficticios.' },
  ],
  checklistHeading: 'Lista de comprobación',
  checklist: [
    'La cantidad generada coincide con la solicitada y no supera 100.',
    'El receptor acepta la caja y la presencia o ausencia de guiones.',
    'Existe una restricción o estrategia ante una colisión.',
    'El UUID no se utiliza como única prueba de identidad o autorización.',
  ],
};
