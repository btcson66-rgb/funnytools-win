import type { SpanishInfoPage } from './es-pages';

export const spanishPrivatePdfMergeGuide: SpanishInfoPage = {
  title: 'Unir PDF sin subir archivos: privacidad, orden y control del resultado',
  seoTitle: 'Unir PDF sin subir archivos y de forma privada',
  seoDescription: 'Combina varios PDF dentro del navegador, ordena los documentos, conserva los originales y revisa páginas, formularios, firmas y tamaño antes de enviar.',
  keywords: [
    'unir PDF sin subir archivos',
    'combinar PDF de forma privada',
    'unir PDF en el navegador',
    'fusionar PDF sin registro',
    'juntar documentos PDF seguro',
  ],
  eyebrow: 'Guía de documentos · tratamiento local · privacidad',
  intro: 'Un contrato, una nómina, un expediente o un currículum no deberían viajar a un servidor desconocido solo para cambiar el orden de sus páginas. Un navegador moderno puede leer los archivos que seleccionas, copiar sus páginas en memoria y crear una descarga nueva. Ese tratamiento local reduce transferencias, pero no sustituye la clasificación de la información, la seguridad del dispositivo ni la comprobación del PDF final.',
  directAnswer: [
    'Para unir PDF sin subirlos, abre una herramienta que declare procesamiento local, selecciona dos o más archivos, revisa su número de páginas, ordénalos y crea una copia combinada. Mantén los originales, abre la descarga, suma páginas y comprueba cada unión, orientación, formulario, enlace y firma antes de enviarla.',
    'FunnyTools utiliza JavaScript y pdf-lib dentro de la pestaña; los PDF seleccionados no se envían a FunnyTools ni a un tercero para combinarlos. El resultado es un archivo nuevo. Aun así, no introduzcas documentación sensible en un equipo compartido o comprometido y usa siempre el canal de entrega autorizado.',
  ],
  sections: [
    {
      heading: 'Qué significa realmente tratamiento local',
      paragraphs: [
        'La File API permite que una página lea los archivos que la persona selecciona expresamente. El código del navegador copia páginas, genera bytes nuevos y crea una descarga. «Local» describe dónde ocurre la operación principal, no garantiza por sí solo que toda la página sea privada ni que el dispositivo esté libre de extensiones maliciosas.',
        'Distingue el contenido del documento de las conexiones normales del sitio. La página puede cargar recursos, medición o publicidad, pero la herramienta no debe incluir el PDF en esas solicitudes. La política de privacidad y el aviso de la función deben decirlo con claridad.',
      ],
    },
    {
      heading: 'Cuándo conviene evitar cualquier herramienta web',
      paragraphs: [
        'Si el documento está clasificado por una empresa, contiene datos sanitarios, secretos profesionales, claves, información bancaria completa o está sujeto a una política que prohíbe herramientas web, utiliza el software y el equipo aprobados por la organización. Que el cálculo sea local no anula una norma interna.',
        'Evita también ordenadores públicos, navegadores con extensiones desconocidas o dispositivos sin actualizaciones. Para un expediente de terceros, minimiza páginas y datos antes de trabajar. La privacidad comienza por decidir qué contenido debe existir en la copia.',
      ],
    },
    {
      heading: 'Verificar la herramienta antes de abrir documentos sensibles',
      paragraphs: [
        'Lee el aviso de privacidad de la función y busca una descripción concreta: procesamiento en navegador, sin subida y descarga local. Una afirmación genérica como «seguro» no explica nada. Comprueba el dominio, HTTPS y que no aparezca un progreso de subida o una obligación de crear cuenta.',
        'Una prueba sin red puede aportar evidencia operativa si la aplicación y sus librerías ya se cargaron, pero no es una certificación universal. Para una revisión técnica, las herramientas de desarrollo permiten observar solicitudes de red; para una organización, la validación debe seguir su procedimiento de seguridad.',
      ],
    },
    {
      heading: 'Preparar una lista de documentos y un orden',
      paragraphs: [
        'Escribe la secuencia antes de seleccionar: portada, índice, formulario, justificantes y anexos. Renombra copias de trabajo con 01, 02 y 03 si el sistema de archivos las ordena alfabéticamente. No cambies nombres de originales conservados por motivos legales o de archivo.',
        'Anota las páginas esperadas de cada archivo. Si suman 1 + 4 + 7, el resultado debería tener 12 salvo que hayas decidido eliminar hojas. Esta cifra permite detectar un archivo equivocado o una carga incompleta.',
      ],
    },
    {
      heading: 'Comprobar cada PDF antes de combinar',
      paragraphs: [
        'Abre todos los originales y revisa que no estén corruptos, protegidos con una contraseña desconocida o incompletos. Confirma orientación, tamaño de página, legibilidad y que no haya una versión antigua con el mismo nombre.',
        'Si un archivo incluye formulario, comentarios, capas, cartera PDF, vídeo, firma digital o restricciones, asume que la combinación puede cambiar su comportamiento. Para preservar propiedades avanzadas, utiliza un editor que las soporte y valida con la aplicación destinataria.',
      ],
    },
    {
      heading: 'Ordenar archivos en FunnyTools',
      paragraphs: [
        'La herramienta muestra cada archivo y su número de páginas y permite moverlo arriba o abajo. Ordena documentos completos; no reorganiza páginas individuales dentro de un archivo. Si solo necesitas algunas páginas, extráelas antes y vuelve a cargar las copias resultantes.',
        'Selecciona al menos dos PDF, revisa la lista una última vez y pulsa unir. La aplicación crea una descarga nueva y no modifica los originales. Mantén la pestaña abierta hasta que aparezca la confirmación.',
      ],
      link: {
        prefix: 'Ordena y combina los documentos con ',
        label: 'unir PDF',
        href: '/es/herramientas/unir-pdf/',
        suffix: ' mediante procesamiento local en el navegador.',
      },
    },
    {
      heading: 'Extraer primero cuando solo hacen falta algunas páginas',
      paragraphs: [
        'No combines un expediente completo para eliminar después la mayoría. Extrae únicamente las páginas autorizadas, nombra las copias y después únelas. Esta secuencia reduce datos, tamaño y riesgo de enviar información accidental.',
        'Comprueba los rangos: «1-3, 8» debe producir cuatro páginas. Abre cada fragmento antes de añadirlo. Si una hoja tiene anverso y reverso, verifica que ambos estén incluidos.',
      ],
      link: {
        prefix: 'Prepara fragmentos mínimos con ',
        label: 'extraer páginas de PDF',
        href: '/es/herramientas/extraer-paginas-pdf/',
        suffix: ' antes de unirlos.',
      },
    },
    {
      heading: 'Orientación y tamaños de página mezclados',
      paragraphs: [
        'Unir no normaliza A4, Letter, vertical u horizontal. El PDF final puede contener tamaños distintos, lo cual no es necesariamente un error. Sin embargo, puede producir zoom cambiante, impresión irregular o anexos difíciles de leer.',
        'Corrige páginas que están realmente giradas antes o después con una copia. No conviertas todas a imagen solo para uniformarlas: perderías texto seleccionable, enlaces y calidad. Si la entrega exige A4 uniforme, remáqueta con una herramienta adecuada.',
      ],
    },
    {
      heading: 'Qué puede ocurrir con formularios y campos',
      paragraphs: [
        'Dos formularios pueden usar nombres de campo iguales. Al combinar, algunos visores relacionan campos que deberían ser independientes, mientras otros pierden acciones. Rellena, aplana o conserva formularios por separado según el flujo autorizado y prueba cada casilla.',
        'No des por hecho que una apariencia visible equivale a datos guardados. Cierra y vuelve a abrir la descarga. Si el destinatario debe editar campos, ensaya con el visor que utilizará y evita funciones que la herramienta no declara conservar.',
      ],
    },
    {
      heading: 'Firmas digitales: combinar suele invalidar la firma',
      paragraphs: [
        'Una firma digital protege una versión concreta del archivo. Reorganizar páginas o crear un PDF combinado cambia los bytes y puede hacer que la validación muestre modificación posterior. Una imagen de firma visible no es la misma garantía.',
        'Si una firma válida es requisito, conserva el PDF firmado original y consulta el procedimiento de la entidad. Puede ser necesario enviar archivos separados, utilizar una cartera o firmar el documento combinado al final. No afirmes que una firma sigue válida sin comprobarla.',
      ],
    },
    {
      heading: 'Marcadores, enlaces, adjuntos y metadatos',
      paragraphs: [
        'Copiar páginas no garantiza conservar el árbol de marcadores, archivos adjuntos, destinos internos, etiquetas de accesibilidad o acciones. Los enlaces visibles pueden funcionar y el índice lateral desaparecer. Revisa las funciones que importan, no solo la imagen de cada página.',
        'El resultado también puede conservar metadatos de documentos o eliminarlos parcialmente. Para una publicación externa, inspecciona título, autor, comentarios y propiedades. La herramienta no promete una limpieza forense de datos ocultos.',
      ],
    },
    {
      heading: 'Memoria del navegador y archivos grandes',
      paragraphs: [
        'La operación necesita mantener documentos y salida en memoria. Escaneos de alta resolución, cientos de páginas o varias pestañas abiertas pueden agotar los recursos, especialmente en móvil. Un fallo no altera los originales, pero puede impedir crear la descarga.',
        'Cierra aplicaciones innecesarias, trabaja en un ordenador o divide el lote. Comprimir imágenes antes de reconstruir puede ayudar más que reorganizar el PDF. Para expedientes grandes y críticos, utiliza software de escritorio aprobado.',
      ],
    },
    {
      heading: 'Comprimir solo si existe un límite real',
      paragraphs: [
        'Unir suele producir un tamaño próximo a la suma de entradas. No comprimas por rutina si el archivo ya cumple el límite. Cada transformación añade una oportunidad de perder nitidez o funciones, aunque el compresor de FunnyTools puede limitarse a reorganizar objetos.',
        'Compara tamaño original y salida. La herramienta de compresión no garantiza reducción y no vuelve a muestrear imágenes; si el resultado no mejora, conserva la versión unida. Para escaneos enormes, prepara imágenes más eficientes desde el origen.',
      ],
      link: {
        prefix: 'Cuando el canal imponga un máximo, prueba ',
        label: 'comprimir PDF',
        href: '/es/herramientas/comprimir-pdf/',
        suffix: ' y valida que el resultado siga siendo útil.',
      },
    },
    {
      heading: 'Control de calidad del archivo combinado',
      paragraphs: [
        'Abre la descarga desde el almacenamiento, no solo desde una vista temporal. Cuenta páginas, recorre cada transición, busca hojas en blanco, giros, cortes y duplicados. Comprueba el texto más pequeño y una muestra de enlaces.',
        'Si existen formularios, marcadores, etiquetas o firmas, verifícalos de forma específica. Prueba el archivo en el portal o visor de destino. Una unión está completa cuando la copia funciona fuera de la herramienta.',
      ],
    },
    {
      heading: 'Nombre, entrega y conservación',
      paragraphs: [
        'Utiliza un nombre descriptivo sin exponer más datos de los necesarios. Evita «final-final-2»; incluye asunto y fecha o versión según la convención. No sustituyas los originales hasta obtener confirmación de recepción.',
        'Envía por el canal autorizado y revisa permisos si utilizas un enlace. Unir archivos no cifra el contenido ni controla quién recibe la copia. Para documentos sensibles puede ser necesaria transferencia cifrada, acceso limitado o caducidad.',
      ],
    },
    {
      heading: 'Lista de comprobación antes de enviar',
      paragraphs: [
        'Confirma autorización, dispositivo, dominio, tratamiento local, documentos correctos, páginas esperadas y orden. Extrae solo lo necesario y resuelve contraseñas, orientación o formularios antes de unir.',
        'Después abre la descarga, cuenta páginas, revisa uniones y propiedades avanzadas, comprueba tamaño y nombre y utiliza el canal aprobado. Conserva originales hasta cerrar el trámite.',
      ],
    },
  ],
  faq: [
    { q: '¿Cómo unir PDF sin subirlos a Internet?', a: 'Usa una herramienta que procese en el navegador, ordena dos o más archivos, crea la descarga y revisa el resultado. FunnyTools no recibe los documentos.' },
    { q: '¿Se modifican los archivos originales?', a: 'No. La herramienta genera un PDF nuevo; los originales permanecen en el dispositivo.' },
    { q: '¿Puedo elegir páginas concretas?', a: 'Extrae primero los rangos necesarios y combina después los fragmentos, reduciendo datos y tamaño.' },
    { q: '¿Se pierde calidad al unir?', a: 'La copia de páginas no pretende recomprimir su imagen, pero debes revisar salida, enlaces y funciones avanzadas.' },
    { q: '¿Se conservan las firmas digitales?', a: 'No debe asumirse. Crear un archivo nuevo puede invalidar la firma; conserva el original y sigue el procedimiento del destinatario.' },
    { q: '¿Qué pasa con formularios y marcadores?', a: 'Pueden cambiar o perderse según estructura y visor. Comprueba cada función o usa un editor que garantice su conservación.' },
    { q: '¿Por qué falla un PDF muy grande?', a: 'El navegador puede quedarse sin memoria. Divide el lote, reduce escaneos o utiliza software de escritorio aprobado.' },
    { q: '¿Unir PDF cifra el documento?', a: 'No. La combinación no añade cifrado ni permisos; protege también el dispositivo y el canal de envío.' },
  ],
  review: {
    heading: 'Control de calidad de una unión privada',
    intro: 'Privacidad, integridad y entrega deben comprobarse por separado.',
    checks: [
      { title: 'Minimización', text: 'Solo se usan páginas necesarias en un dispositivo y una herramienta autorizados.' },
      { title: 'Integridad', text: 'Orden, cantidad, orientación y propiedades relevantes se revisaron en la descarga.' },
      { title: 'Entrega', text: 'Nombre, tamaño, permisos y canal protegen la copia final.' },
    ],
  },
  sources: [
    { label: 'MDN: File API', href: 'https://developer.mozilla.org/en-US/docs/Web/API/File_API', note: 'Acceso de una aplicación web a archivos seleccionados por la persona usuaria.' },
    { label: 'MDN: uso de archivos en aplicaciones web', href: 'https://developer.mozilla.org/en-US/docs/Web/API/File_API/Using_files_from_web_applications', note: 'Selección, lectura y tratamiento de archivos y objetos locales en el navegador.' },
    { label: 'MDN: URL.createObjectURL()', href: 'https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL_static', note: 'Creación y revocación de URL temporales para objetos File y Blob.' },
    { label: 'AEPD: Guía para centros educativos', href: 'https://www.aepd.es/guias/guia-centros-educativos.pdf', note: 'Diligencia, finalidad y protección al tratar documentación con datos personales.' },
  ],
};

export const spanishPasswordStrengthGuide: SpanishInfoPage = {
  title: 'Contraseñas seguras: longitud, unicidad, gestor y doble factor',
  seoTitle: 'Contraseñas seguras: guía actualizada',
  seoDescription: 'Crea contraseñas largas, aleatorias y únicas, utiliza un gestor, activa MFA y cambia credenciales cuando exista compromiso, no por calendario.',
  keywords: [
    'contraseñas seguras',
    'cuántos caracteres debe tener una contraseña',
    'crear contraseña fuerte',
    'gestor de contraseñas',
    'doble factor autenticación',
  ],
  eyebrow: 'Seguridad digital · NIST SP 800-63B-4 · hábitos sostenibles',
  intro: 'Una contraseña «complicada» no es necesariamente difícil de adivinar. Cambiar letras por símbolos, añadir el año y repetir la misma clave en diez servicios produce un patrón reconocible y multiplica el daño de una filtración. La defensa práctica combina longitud, aleatoriedad o frase memorable, una clave distinta por cuenta, gestor, autenticación multifactor y recuperación bien protegida.',
  directAnswer: [
    'Para una cuenta protegida solo por contraseña, utiliza al menos 15 caracteres como referencia actual de NIST y prefiere una clave aleatoria generada y guardada en un gestor o una frase larga de palabras no relacionadas. Nunca reutilices la misma contraseña. Activa MFA o una passkey cuando el servicio lo permita.',
    'No cambies claves sanas cada pocos meses por rutina. NIST SP 800-63B-4 indica que los verificadores no deben imponer cambios periódicos ni reglas de composición; sí deben exigir cambio cuando existe evidencia de compromiso. Una política de servicio puede ser distinta, pero añadir «2027» a la clave anterior no resuelve el riesgo.',
  ],
  sections: [
    {
      heading: 'Amenazas distintas necesitan defensas distintas',
      paragraphs: [
        'Un atacante puede adivinar en la pantalla de acceso, probar credenciales filtradas en otros servicios, obtener hashes de una base de datos, engañar mediante phishing, instalar un registrador de teclas o secuestrar la recuperación. La longitud ayuda contra adivinación, pero no impide entregar la clave a una web falsa.',
        'Por eso la contraseña no debe evaluarse aislada. Unicidad limita el daño entre servicios; MFA añade otra barrera; gestor reduce la necesidad de memorizar; alertas y recuperación permiten responder. No existe una cadena que compense todas las demás ausencias.',
      ],
    },
    {
      heading: 'Longitud como requisito principal',
      paragraphs: [
        'NIST SP 800-63B-4 exige a verificadores un mínimo de 15 caracteres para una contraseña usada como factor único y permite un mínimo de 8 cuando forma parte de un proceso multifactor. También recomienda aceptar al menos 64 caracteres de máximo. Son requisitos para servicios federales estadounidenses, pero ofrecen una referencia técnica actual.',
        'Para una persona, la regla útil es superar el mínimo del servicio y evitar patrones. Una contraseña aleatoria de 16 o más caracteres es un buen punto de partida para cuentas importantes. Si el servicio limita de forma absurda la longitud, activa MFA y valora el riesgo.',
      ],
    },
    {
      heading: 'Por qué los símbolos obligatorios no bastan',
      paragraphs: [
        'NIST explica que las personas responden de forma predecible a reglas como mayúscula, cifra y símbolo: primera letra en mayúscula, sustituciones conocidas y un signo al final. Los diccionarios de ataque incorporan esas variantes. Cumplir la casilla no convierte «Password1!» en una buena clave.',
        'Una cadena aleatoria puede incluir varias clases porque amplían el conjunto, pero lo importante es que no siga un patrón humano. El servicio debería comparar claves nuevas con listas de valores comunes o comprometidos y permitir espacios y caracteres diversos.',
      ],
    },
    {
      heading: 'Una contraseña única para cada cuenta',
      paragraphs: [
        'La reutilización permite credential stuffing: una combinación filtrada en un sitio se prueba automáticamente en correo, tiendas, nube y redes. Cambiar solo el nombre del servicio o un dígito mantiene una familia predecible.',
        'Prioriza correo principal, banca, identidad, gestor de contraseñas, nube, administración y redes. Si sospechas que una clave repetida se filtró, cambia todas sus variantes por claves independientes y revisa sesiones, reenvíos y métodos de recuperación.',
      ],
    },
    {
      heading: 'Contraseña aleatoria o frase de paso',
      paragraphs: [
        'Para credenciales que guardará un gestor, genera una cadena aleatoria. Para la contraseña maestra que debes recordar, una frase larga de varias palabras realmente no relacionadas puede ser más usable. No uses una cita, letra de canción, refrán o secuencia que exista en listas.',
        'No publiques ejemplos reales ni construyas la frase con nombres, fechas, lugares o mascotas. La fortaleza depende del proceso de selección, no de que el resultado parezca extraño. Si el servicio permite una passkey, puede evitar memorizar otra contraseña y resistir mejor el phishing.',
      ],
    },
    {
      heading: 'Generar dentro del navegador',
      paragraphs: [
        'FunnyTools permite elegir de 4 a 64 caracteres, mayúsculas, minúsculas, cifras, símbolos y exclusión de O, 0, l, 1 e I. Utiliza `crypto.getRandomValues()` y garantiza al menos un carácter de cada conjunto seleccionado antes de mezclar.',
        'Para una cuenta importante selecciona una longitud de 16 o más, conserva varios conjuntos si el servicio los acepta y copia el resultado directamente a tu gestor. El indicador de fuerza es orientativo: no comprueba si reutilizaste la clave ni sustituye las reglas del servicio.',
      ],
      link: {
        prefix: 'Crea una clave local y aleatoria con el ',
        label: 'generador de contraseñas seguras',
        href: '/es/herramientas/generador-contrasenas-seguras/',
        suffix: ' y guárdala en el gestor, no en un documento sin proteger.',
      },
    },
    {
      heading: 'Gestor de contraseñas y contraseña maestra',
      paragraphs: [
        'INCIBE explica que el gestor almacena credenciales protegidas y permite recordar una contraseña maestra en lugar de todas. Elige una solución mantenida, revisa sincronización, exportación, recuperación, auditorías y compatibilidad con tus dispositivos.',
        'Protege el gestor con una frase maestra única y MFA, mantén aplicaciones actualizadas y guarda el código de recuperación fuera del dispositivo principal. El autocompletado vinculado al dominio puede ayudar a detectar una web falsa, pero siempre revisa la dirección.',
      ],
    },
    {
      heading: 'MFA, 2FA y factores independientes',
      paragraphs: [
        'INCIBE define el doble factor como una segunda comprobación además de la contraseña. Puede ser una aplicación, llave física, dispositivo o biometría según el servicio. Si la clave se filtra, el atacante todavía necesita el otro factor.',
        'Prefiere passkeys o llaves de seguridad cuando estén disponibles, después aplicaciones autenticadoras; SMS sigue aportando más que no tener segundo paso, pero puede sufrir riesgos de telefonía. Guarda códigos de respaldo, revoca dispositivos antiguos y no apruebes una notificación inesperada.',
      ],
    },
    {
      heading: 'Cuándo cambiar una contraseña',
      paragraphs: [
        'Cámbiala si el servicio informa de una filtración, aparece en una alerta fiable, la introdujiste en una página falsa, alguien accedió a la cuenta, un dispositivo fue comprometido o la compartiste. Hazlo desde un equipo confiable y empieza por correo y gestor si pudieran estar afectados.',
        'NIST indica que no debe exigirse cambio periódico sin evidencia. Los cambios arbitrarios favorecen variantes previsibles y aumentan carga. Una organización puede tener requisitos propios, pero debe revisar la política a la luz del riesgo y de guías vigentes.',
      ],
    },
    {
      heading: 'Respuesta ante una filtración',
      paragraphs: [
        'Accede escribiendo el dominio conocido, cambia la contraseña por una única, cierra otras sesiones y activa MFA. Revisa correo de recuperación, reglas de reenvío, aplicaciones conectadas, compras y actividad. No pulses el enlace del mensaje de alerta si no puedes verificarlo.',
        'Busca dónde reutilizaste la clave y sustituye cada cuenta. Si el correo está comprometido, protégelo primero porque permite restablecer las demás. Conserva evidencias y utiliza los canales oficiales para fraude financiero o suplantación.',
      ],
    },
    {
      heading: 'Recuperación y códigos de respaldo',
      paragraphs: [
        'Una cuenta es tan segura como su recuperación. Mantén correo y teléfono actualizados, elimina opciones antiguas y guarda códigos de respaldo en un lugar separado y protegido. No uses preguntas basadas en información pública.',
        'NIST prohíbe a verificadores basarse en preguntas de conocimiento como el nombre de una mascota. Si un servicio aún las exige, usa respuestas aleatorias guardadas en el gestor, siempre que sus condiciones lo permitan.',
      ],
    },
    {
      heading: 'Compartir acceso sin compartir la contraseña',
      paragraphs: [
        'En equipos, crea cuentas individuales, roles y permisos. Compartir una única clave impide atribuir acciones y complica revocar a una persona. Algunos gestores ofrecen intercambio controlado; las plataformas empresariales permiten delegación.',
        'No envíes contraseñas por el mismo canal que el nombre de usuario y el enlace. Para una necesidad temporal, usa permisos con caducidad. Cambia credenciales compartidas antiguas al reorganizar un equipo.',
      ],
    },
    {
      heading: 'Equipos compartidos y miradas cercanas',
      paragraphs: [
        'No guardes credenciales en un navegador público. Cierra sesión, evita copiar al portapapeles durante más tiempo del necesario y no dejes la bóveda abierta. Una contraseña excelente escrita en una pantalla visible puede ser capturada.',
        'En casa, una copia de recuperación física bien guardada puede ser razonable según el riesgo; en una oficina abierta requiere controles diferentes. Define contra quién proteges y qué recuperación necesitas, sin confundir secreto con imposibilidad de acceso.',
      ],
    },
    {
      heading: 'Passkeys y transición desde contraseñas',
      paragraphs: [
        'Una passkey utiliza criptografía vinculada al servicio y puede autenticar con el desbloqueo del dispositivo. Reduce el riesgo de phishing porque no se entrega un secreto reutilizable a la página. La disponibilidad y sincronización dependen del proveedor.',
        'Antes de migrar, revisa dispositivos, copias, recuperación y acceso familiar o empresarial. Mantén MFA y alertas donde corresponda. No borres el único método de acceso hasta probar otro dispositivo y los pasos de recuperación.',
      ],
    },
    {
      heading: 'Lista de comprobación de cuentas importantes',
      paragraphs: [
        'Confirma contraseña única, 15 o más caracteres si actúa sola, gestor actualizado y MFA o passkey. Revisa dominio, sesiones, dispositivos, recuperación y alertas. Guarda códigos de respaldo fuera del dispositivo principal.',
        'Actúa ante evidencia de compromiso, no por un calendario ciego. Nunca reutilices una clave generada como ejemplo y recuerda que el indicador de un generador no conoce filtraciones, phishing ni configuración de la cuenta.',
      ],
    },
  ],
  faq: [
    { q: '¿Cuántos caracteres debe tener una contraseña segura?', a: 'NIST SP 800-63B-4 fija 15 como mínimo para factor único y 8 dentro de MFA. Para cuentas importantes, una aleatoria de 16 o más es práctica.' },
    { q: '¿Debe incluir mayúsculas, números y símbolos?', a: 'No existe una mezcla que garantice seguridad. NIST desaconseja reglas obligatorias; longitud, aleatoriedad, unicidad y bloqueo de claves comprometidas importan más.' },
    { q: '¿Tengo que cambiarla cada 90 días?', a: 'No sin evidencia de compromiso. Cámbiala si se filtró, fue compartida, introducida en phishing o existe acceso sospechoso.' },
    { q: '¿Puedo usar una frase de paso?', a: 'Sí, especialmente para una clave maestra: varias palabras no relacionadas y una longitud amplia. Evita citas y datos personales.' },
    { q: '¿Es seguro un gestor de contraseñas?', a: 'Es una forma práctica de mantener claves únicas. Elige uno mantenido, protege la bóveda con frase maestra, MFA y recuperación segura.' },
    { q: '¿Qué es mejor, SMS o aplicación de códigos?', a: 'Una aplicación o llave suele resistir más riesgos; SMS sigue siendo mejor que no usar segundo factor. Usa la opción más fuerte disponible.' },
    { q: '¿El generador guarda mi contraseña?', a: 'FunnyTools la genera localmente en el navegador y no la envía al sitio. Guárdala directamente en tu gestor.' },
    { q: '¿Una contraseña larga evita phishing?', a: 'No. Una página falsa puede robar cualquier contraseña que introduzcas. Revisa dominio y utiliza passkey o MFA resistente al phishing cuando sea posible.' },
  ],
  review: {
    heading: 'Control de seguridad de credenciales',
    intro: 'La fortaleza real depende de la cuenta completa, no solo de la cadena.',
    checks: [
      { title: 'Secreto', text: 'La contraseña es larga, impredecible y exclusiva del servicio.' },
      { title: 'Protección', text: 'El gestor, MFA o passkey y la recuperación están configurados.' },
      { title: 'Respuesta', text: 'Alertas, sesiones y un plan de cambio permiten actuar ante compromiso.' },
    ],
  },
  sources: [
    { label: 'NIST SP 800-63B-4: autenticadores', href: 'https://pages.nist.gov/800-63-4/sp800-63b/authenticators/', note: 'Longitud mínima, máximo permitido, ausencia de reglas de composición y cambios por compromiso.' },
    { label: 'NIST: fortaleza de las contraseñas', href: 'https://pages.nist.gov/800-63-4/sp800-63b/passwords/', note: 'Longitud, límites de complejidad, listas de bloqueo y ataques en línea y fuera de línea.' },
    { label: 'INCIBE: gestión de contraseñas seguras', href: 'https://www.incibe.es/ciudadania/tematicas/contrasenas-seguras', note: 'Gestores, contraseñas robustas, recuperación y doble factor para ciudadanía en España.' },
    { label: 'INCIBE: autenticación de dos factores', href: 'https://www.incibe.es/ciudadania/tematicas/contrasenas-seguras/autenticacion-de-dos-factores', note: 'Funcionamiento de los factores y protección adicional cuando la contraseña se compromete.' },
  ],
};

export const spanishFileSizeUnitsGuide: SpanishInfoPage = {
  title: 'KB, MB, GB y TB: convertir tamaños, distinguir bits y estimar transferencias',
  seoTitle: 'KB, MB, GB y TB: conversión y diferencias',
  seoDescription: 'Entiende bytes, bits, KB y KiB, calcula por qué 1 TB puede mostrarse como 931 GiB y estima descargas, almacenamiento y límites de archivos.',
  keywords: [
    'KB MB GB conversión',
    'diferencia MB y MiB',
    '1 TB 931 GB',
    'bits y bytes',
    'calcular tiempo descarga archivo',
  ],
  eyebrow: 'Guía digital · unidades de información · decisiones de archivo',
  intro: 'Los tamaños parecen contradictorios porque conviven dos escalas: los prefijos decimales avanzan de mil en mil y los binarios de 1.024 en 1.024. A eso se añade que la red suele anunciar bits por segundo y los archivos se muestran en bytes. Conservar el símbolo correcto permite explicar un disco «más pequeño», estimar una descarga y decidir qué componente comprimir.',
  directAnswer: [
    'En decimal, 1 kB = 1.000 B, 1 MB = 1.000.000 B, 1 GB = 1.000.000.000 B y 1 TB = 1.000.000.000.000 B. En binario, 1 KiB = 1.024 B, 1 MiB = 1.048.576 B y 1 GiB = 1.073.741.824 B. NIST indica que kilo, mega y giga no deben usarse para potencias de 1.024.',
    'Un byte son 8 bits. Para una estimación ideal, divide Mbps entre 8 para obtener MB/s y después divide el tamaño del archivo en MB entre esa velocidad. El tiempo real será mayor por protocolos, congestión, Wi-Fi, servidor y almacenamiento.',
  ],
  sections: [
    {
      heading: 'Byte, bit y símbolos que cambian el resultado',
      paragraphs: [
        'El bit se representa con b minúscula y el byte con B mayúscula. Un byte contiene ocho bits. Por eso 100 Mb/s no son 100 MB/s: el máximo matemático antes de sobrecargas es 12,5 MB/s.',
        'En documentación técnica respeta mayúsculas. «Mb», «MB» y «MiB» no son variantes tipográficas. En una conversación informal puede haber ambigüedad; pide el número de bytes o una captura de propiedades cuando importe.',
      ],
    },
    {
      heading: 'Sistema decimal: kB, MB, GB y TB',
      paragraphs: [
        'Los prefijos SI representan potencias de diez: kilo 10³, mega 10⁶, giga 10⁹ y tera 10¹². Así, cada salto multiplica por 1.000. Es la convención utilizada en capacidad comercial de almacenamiento y muchas velocidades de red.',
        'El símbolo de kilo es k minúscula; mega, giga y tera usan M, G y T. Aunque muchas interfaces escriben KB, el principio importante es declarar la escala y mantenerla. Para comparar productos, utiliza los bytes o la misma unidad decimal.',
      ],
    },
    {
      heading: 'Sistema binario: KiB, MiB, GiB y TiB',
      paragraphs: [
        'Los prefijos binarios representan potencias de 1.024: KiB es 2¹⁰ bytes, MiB 2²⁰, GiB 2³⁰ y TiB 2⁴⁰. NIST publica estas definiciones y explica que se crearon para evitar usar los prefijos SI con otro valor.',
        'La diferencia comienza en 2,4 % entre kB y KiB y crece en unidades superiores. 1 GiB equivale a unos 1,074 GB; 1 GB equivale a unos 0,931 GiB. Es la misma cantidad de bytes descrita con dos divisores.',
      ],
    },
    {
      heading: 'Por qué un disco de 1 TB puede verse como 931',
      paragraphs: [
        'El fabricante entrega aproximadamente 1.000.000.000.000 bytes. Si una interfaz divide por 1.024 cuatro veces, obtiene unos 931,32 GiB, aunque quizá etiquete el resultado como GB por tradición. No han desaparecido 69.000 millones de bytes; cambió la unidad.',
        'Además, formateo, sistema de archivos, particiones de recuperación y reservas sí ocupan espacio. Para diagnosticar, separa la conversión de unidad del espacio utilizado. Compara capacidad total en bytes antes de atribuir la diferencia a un fallo.',
      ],
    },
    {
      heading: 'Conversiones decimales rápidas',
      paragraphs: [
        'Para subir de B a kB, MB, GB o TB divide entre 1.000 por nivel; para bajar multiplica. 2.500 MB son 2,5 GB decimales. 750.000 kB son 750 MB. Mantén suficientes cifras hasta el final y redondea según el uso.',
        'No mezcles un valor decimal con divisor binario en la misma línea. Si el sistema solo muestra «MB» sin explicar, informa de la suposición. En un límite de subida, deja margen porque el portal puede medir en bytes o aplicar codificación adicional.',
      ],
    },
    {
      heading: 'Conversiones binarias rápidas',
      paragraphs: [
        'Divide o multiplica por 1.024 entre KiB, MiB, GiB y TiB. 2.048 MiB son 2 GiB. Para convertir bytes a MiB, divide por 1.048.576. Para pasar de GiB a GB, multiplica aproximadamente por 1,073741824.',
        'Las aproximaciones sirven para planificación, pero una cuota exacta requiere bytes enteros. Una hoja de cálculo debe incluir unidad en el encabezado y la fórmula. Evita escribir «tamaño» sin escala.',
      ],
    },
    {
      heading: 'Calcular una descarga ideal',
      paragraphs: [
        'Convierte la velocidad de Mbps a MB/s dividiendo entre 8. Una conexión de 300 Mb/s tiene un máximo teórico de 37,5 MB/s. Un archivo decimal de 750 MB tardaría 20 segundos en ese escenario perfecto.',
        'En la práctica añade margen: cabeceras, cifrado, Wi-Fi, distancia, congestión, servidor y escritura reducen rendimiento. Mide durante varios segundos con un archivo suficientemente grande y distingue la velocidad contratada de la alcanzable por un dispositivo.',
      ],
    },
    {
      heading: 'Subida y descarga no siempre tienen la misma velocidad',
      paragraphs: [
        'Muchas conexiones son asimétricas. Un archivo que baja en un minuto puede tardar varios en subir. Consulta la velocidad de subida en Mb/s y aplica la misma división entre ocho. Las plataformas también procesan el archivo después de recibirlo.',
        'Para una videollamada o copia en nube, importan estabilidad y latencia además de capacidad. No prometas un tiempo exacto usando solo la cifra comercial. Expresa «mínimo ideal» y un rango realista medido.',
      ],
    },
    {
      heading: 'Tamaño del archivo y espacio ocupado',
      paragraphs: [
        'El sistema de archivos asigna bloques. Un archivo pequeño puede ocupar un bloque completo; miles de archivos diminutos muestran una diferencia entre tamaño lógico y espacio en disco. Compresión, deduplicación, instantáneas y metadatos también influyen.',
        'Para transferir suele importar el tamaño lógico; para planificar disco importa el espacio ocupado. Una carpeta puede cambiar al copiarse a otro sistema con tamaño de bloque distinto. Compara con la métrica adecuada.',
      ],
    },
    {
      heading: 'Por qué dos fotos con los mismos píxeles pesan distinto',
      paragraphs: [
        'La compresión depende del formato, calidad y complejidad visual. Textura, ruido y detalle suelen requerir más datos que superficies uniformes. Metadatos, miniaturas, profundidad de color y transparencia también añaden bytes.',
        'No juzgues calidad únicamente por MB. Una imagen grande puede contener ruido o metadatos innecesarios; una eficiente puede conservar la apariencia. Evalúa dimensiones, formato y uso final antes de comprimir.',
      ],
    },
    {
      heading: 'Reducir imágenes cuando son el componente dominante',
      paragraphs: [
        'Para web, correo o documentos, decide dimensiones necesarias y calidad visible. Redimensionar reduce píxeles; comprimir cambia representación. Conserva el original y trabaja sobre una copia. Revisa texto fino, rostros, degradados y transparencias.',
        'FunnyTools muestra tamaño de entrada y salida y procesa localmente. No persigas el menor número si aparecen artefactos. Ajusta hasta cumplir el límite con margen y abre el archivo exportado.',
      ],
      link: {
        prefix: 'Compara tamaño y calidad con ',
        label: 'comprimir imágenes',
        href: '/es/herramientas/comprimir-imagenes/',
        suffix: ' antes de insertarlas en un documento.',
      },
    },
    {
      heading: 'PDF grandes: localizar la causa',
      paragraphs: [
        'Un PDF puede crecer por escaneos, fuentes incrustadas, formularios, vídeo, capas o páginas duplicadas. Mira cantidad de páginas y origen. Diez fotos de cámara suelen dominar más que miles de palabras.',
        'El compresor de FunnyTools reorganiza objetos y puede no reducir imágenes. Si el resultado no es menor, vuelve a las fuentes y prepara escaneos o fotografías adecuadas. Nunca reemplaces la única copia sin revisar legibilidad.',
      ],
      link: {
        prefix: 'Prueba una optimización estructural con ',
        label: 'comprimir PDF',
        href: '/es/herramientas/comprimir-pdf/',
        suffix: ' y conserva la versión menor solo si sigue siendo correcta.',
      },
    },
    {
      heading: 'Límites de correo y formularios',
      paragraphs: [
        'Un límite puede aplicarse por archivo, suma de adjuntos o tamaño del mensaje después de codificar. La codificación de correo puede aumentar lo transmitido. Deja margen y consulta la regla actual del proveedor; no diseñes el archivo justo al último byte.',
        'Si no cabe, utiliza el canal autorizado: enlace con permisos y caducidad, portal institucional, división lógica o compresión. No subas documentación sensible a un servicio personal solo para evitar el máximo.',
      ],
    },
    {
      heading: 'Planificar almacenamiento y copias',
      paragraphs: [
        'Suma datos actuales, crecimiento, versiones y copias de seguridad. Una regla de copias puede multiplicar necesidades; sincronización no siempre es respaldo. Incluye espacio libre para actualizaciones y funcionamiento del sistema.',
        'Trabaja en GB o TB decimales para comparar productos y convierte a GiB o TiB si la interfaz usa binario. Anota ambas cifras en presupuestos para evitar la falsa impresión de pérdida.',
      ],
    },
    {
      heading: 'Comunicar tamaños sin ambigüedad',
      paragraphs: [
        'En una especificación escribe número, símbolo y definición: «máximo 25 MB (25.000.000 bytes) por archivo». En una velocidad: «100 Mb/s». Para binario: «512 MiB». Esta precisión elimina interpretaciones.',
        'En soporte, pide propiedades del archivo y sistema, no una frase como «pesa mucho». Recoge bytes, formato, páginas o píxeles, límite y canal. El diagnóstico comienza al comparar magnitudes equivalentes.',
      ],
    },
    {
      heading: 'Lista de comprobación de tamaño y transferencia',
      paragraphs: [
        'Identifica si el valor está en bits o bytes y si el prefijo es decimal o binario. Convierte con 1.000 o 1.024 sin mezclarlos. Para tiempo ideal divide Mbps entre ocho y añade margen por condiciones reales.',
        'Si un archivo supera el límite, localiza su componente dominante, trabaja sobre copia y verifica salida. Documenta la unidad exacta y conserva originales cuando la calidad o integridad sean importantes.',
      ],
    },
  ],
  faq: [
    { q: '¿1 MB son 1.000 o 1.024 KB?', a: 'En SI, 1 MB son 1.000 kB y 1.000.000 bytes. La unidad binaria de 1.048.576 bytes se llama MiB.' },
    { q: '¿Qué diferencia hay entre MB y MiB?', a: 'MB es 10⁶ bytes; MiB es 2²⁰ bytes. Un MiB equivale aproximadamente a 1,049 MB.' },
    { q: '¿Por qué 1 TB aparece como 931?', a: '1 TB decimal dividido por 2⁴⁰ da unos 0,909 TiB o 931 GiB. La cantidad de bytes es la misma; cambia la unidad.' },
    { q: '¿Mbps y MB/s son lo mismo?', a: 'No. Mbps son megabits por segundo y MB/s megabytes. Divide Mbps entre ocho para el máximo teórico en MB/s.' },
    { q: '¿Cuánto tarda en bajar 1 GB a 100 Mb/s?', a: 'El mínimo decimal ideal es unos 80 segundos. En la práctica tardará más por protocolos, red, servidor y dispositivo.' },
    { q: '¿Por qué un archivo ocupa más espacio que su tamaño?', a: 'El disco asigna bloques completos y añade metadatos. Muchos archivos pequeños pueden ocupar bastante más que su suma lógica.' },
    { q: '¿Un PDF grande siempre puede comprimirse?', a: 'No. Depende de su contenido. Si ya está optimizado o el compresor no remuestrea imágenes, puede no reducirse.' },
    { q: '¿Cómo indico un límite sin confusión?', a: 'Escribe unidad y bytes, por ejemplo «25 MB (25.000.000 bytes) por archivo», y aclara si cuenta la suma.' },
  ],
  review: {
    heading: 'Control de unidades y decisiones de archivo',
    intro: 'Una cifra solo es útil cuando escala, símbolo y propósito están definidos.',
    checks: [
      { title: 'Unidad', text: 'Se distingue b de B y decimal de binario.' },
      { title: 'Cálculo', text: 'Conversión y tiempo usan el divisor correcto y declaran supuestos.' },
      { title: 'Acción', text: 'La compresión responde a un límite real y la salida se verifica.' },
    ],
  },
  sources: [
    { label: 'NIST: prefijos binarios', href: 'https://www.physics.nist.gov/cuu/Units/binary.html', note: 'Definiciones exactas de KiB, MiB y GiB y diferencia frente a kB, MB y GB.' },
    { label: 'NIST: prefijos métricos SI', href: 'https://www.nist.gov/pml/owm/metric-si-prefixes', note: 'Valores decimales de kilo, mega, giga y tera.' },
    { label: 'NIST Guide to the SI, capítulo 4', href: 'https://www.nist.gov/pml/special-publication-811/nist-guide-si-chapter-4-two-classes-si-units-and-si-prefixes', note: 'Los prefijos SI no deben utilizarse para representar potencias binarias.' },
    { label: 'MDN: File API', href: 'https://developer.mozilla.org/en-US/docs/Web/API/File_API', note: 'Archivos, tamaños en bytes y tratamiento de contenido seleccionado en aplicaciones web.' },
  ],
};

export const spanishImageCompressionEmailGuide: SpanishInfoPage = {
  title: 'Comprimir fotos para enviarlas por email sin dejar el texto borroso',
  seoTitle: 'Cómo comprimir fotos para enviar por email',
  seoDescription: 'Reduce fotos y capturas para correo: calcula el presupuesto total, baja primero los píxeles, elige JPG, PNG o WebP y comprueba la copia antes de enviarla.',
  keywords: [
    'comprimir fotos para email',
    'reducir tamaño imagen para correo',
    'foto demasiado grande para enviar',
    'comprimir JPG sin perder calidad',
    'enviar muchas fotos por correo',
  ],
  eyebrow: 'Guía de imagen · correo electrónico · calidad legible',
  intro: 'Cuando un correo rechaza diez fotos, bajar la calidad al azar suele producir archivos pequeños pero inútiles: caras con bloques, números ilegibles y capturas llenas de halos. El método fiable separa tres decisiones: cuánto puede ocupar el conjunto, cuántos píxeles necesita cada imagen para su uso real y qué formato conserva mejor ese contenido. Después se comprueba la descarga, no solo la vista previa.',
  directAnswer: [
    'Para comprimir fotos destinadas a un email, suma todos los adjuntos y deja margen por debajo del límite del proveedor. Redimensiona primero cada fotografía a los píxeles que realmente necesita el receptor; después exporta una copia JPG con una calidad moderada y compara peso y detalle. Para capturas con texto, diagramas o transparencia, prueba PNG o WebP y revisa las letras al 100 %.',
    'Gmail personal admite actualmente hasta 25 MB en el total de adjuntos y convierte un archivo mayor en un enlace de Drive; las cuentas de empresa o centro educativo pueden tener límites fijados por su administrador. No uses 25 MB como objetivo universal: consulta el canal de destino, trabaja con margen y elige un enlace con permisos controlados cuando el material no deba viajar como adjunto.',
  ],
  sections: [
    {
      heading: 'El límite se aplica al conjunto, no a cada fotografía',
      paragraphs: [
        'Si el correo permite 20 o 25 MB, cinco imágenes de 6 MB no caben aunque ninguna supere el máximo por sí sola. Suma las copias que vas a adjuntar, añade documentos y firma y deja un margen prudente. El mensaje puede crecer durante su codificación y el servidor receptor puede aplicar una regla más estricta que el remitente.',
        'Conviene fijar un presupuesto antes de editar. Para diez fotos y un objetivo conservador de 12 MB, reserva aproximadamente 1 MB por imagen y comprueba el total real al terminar. No es una promesa de calidad ni una regla técnica: es una forma de repartir el límite y localizar qué archivo consume demasiado.',
      ],
    },
    {
      heading: 'Redimensionar y comprimir no son la misma operación',
      paragraphs: [
        'Redimensionar reduce la anchura y altura en píxeles. Pasar de 4.000 × 3.000 a 1.600 × 1.200 elimina una gran cantidad de muestras que una pantalla normal quizá nunca mostraría. Comprimir decide cómo se representan los píxeles restantes. Por eso bajar dimensiones suele dar una reducción más limpia que conservar doce megapíxeles y forzar una calidad extrema.',
        'Hazlo en ese orden: recorta lo que sobra, corrige orientación, reduce dimensiones y finalmente ajusta formato o calidad. Si comprimes primero y vuelves a exportar después, acumulas pérdidas. Conserva siempre el original de cámara y genera una copia con un nombre reconocible para el correo.',
      ],
    },
    {
      heading: 'Elegir dimensiones según lo que hará el destinatario',
      paragraphs: [
        'Para ver una foto en pantalla, documentar una incidencia o insertar una imagen pequeña en un informe, una anchura de 1.600 o 2.000 píxeles suele ofrecer margen de lectura sin transportar toda la captura del móvil. Si el destinatario debe imprimir, ampliar un detalle técnico o conservar el original, pregunta antes de reducir.',
        'No hay una medida universal. Una fotografía familiar tolera menos resolución que una imagen destinada a impresión grande; una factura fotografiada exige que el texto mínimo siga legible. Define la tarea de salida y revisa ese caso real. La cifra de píxeles es una decisión funcional, no una puntuación de calidad.',
      ],
    },
    {
      heading: 'JPG para fotografías y escenas con muchos tonos',
      paragraphs: [
        'JPEG utiliza compresión con pérdida y suele ser eficiente para fotografías, sombras, piel, paisajes y gradientes. Una calidad media-alta puede reducir mucho el peso sin que el cambio sea evidente al tamaño de lectura. Si la bajas demasiado aparecen bloques, ruido alrededor de bordes y bandas en zonas suaves.',
        'No guardes repetidamente la misma copia JPG. Cada nueva codificación puede acumular artefactos. Vuelve al original para cada intento y compara, como mínimo, rostros, cabello, texto, matrículas o detalles que sostienen el propósito de la imagen. La miniatura del correo no basta para aprobarla.',
      ],
    },
    {
      heading: 'PNG para capturas, diagramas y texto fino',
      paragraphs: [
        'PNG usa compresión sin pérdida y conserva bordes duros, letras y áreas planas, aunque una fotografía compleja puede ocupar mucho más que su versión JPG. Para una captura de una tabla, un código, un formulario o una interfaz, PNG evita los halos típicos de una compresión con pérdida agresiva.',
        'Recorta primero las zonas vacías: una captura de pantalla completa contiene píxeles que no aportan nada. Si el PNG todavía pesa demasiado, prueba WebP sin pérdida o reduce dimensiones manteniendo el texto legible. Convertir una captura a JPG solo para lograr un número pequeño puede destruir precisamente la evidencia que querías enviar.',
      ],
    },
    {
      heading: 'WebP puede ahorrar espacio, pero confirma compatibilidad',
      paragraphs: [
        'WebP admite compresión con y sin pérdida y suele generar archivos eficientes. Los navegadores actuales lo abren ampliamente, pero un flujo corporativo, una aplicación antigua o un portal documental puede exigir JPG o PNG. El formato más pequeño no sirve si el receptor no puede previsualizarlo o archivarlo.',
        'Pregunta o incluye una alternativa cuando la compatibilidad sea importante. Para un intercambio informal entre navegadores modernos, WebP puede ser práctico; para una administración o un cliente con especificación de entrega, respeta exactamente la lista admitida. No cambies la extensión del archivo sin convertir su contenido real.',
      ],
    },
    {
      heading: 'Cómo utilizar el compresor de imágenes de FunnyTools',
      paragraphs: [
        'Selecciona una imagen y decide el ancho máximo y la calidad de salida. La operación se ejecuta en el navegador y crea una copia descargable; no sustituye el original. Compara dimensiones, formato y bytes antes y después. Si el resultado pesa más o pierde información necesaria, cambia la estrategia y no lo uses.',
        'Empieza con una reducción moderada, descarga y abre la copia desde el almacenamiento. Ajusta después en pequeños pasos. El control de calidad debe realizarse sobre el archivo que adjuntarás, no sobre el lienzo de la página. Repite desde el original para evitar una cadena de recompressiones.',
      ],
      link: {
        prefix: 'Prepara y compara cada copia con ',
        label: 'comprimir imágenes',
        href: '/es/herramientas/comprimir-imagenes/',
        suffix: ' mediante tratamiento local en el navegador.',
      },
    },
    {
      heading: 'Un ejemplo con ocho fotografías de móvil',
      paragraphs: [
        'Supón que ocho JPG ocupan entre 4 y 7 MB cada uno y el correo debe quedar claramente por debajo de 20 MB. El lote original supera 40 MB. Recorta imágenes innecesarias, reduce el lado largo a 1.600 o 2.000 píxeles para consulta en pantalla y exporta copias con calidad moderada. Después suma, no supongas.',
        'Si el total queda en 9,8 MB y los detalles importantes se leen, no sigas destruyendo calidad para alcanzar 3 MB sin motivo. Si queda en 22 MB, identifica las dos imágenes mayores y revisa contenido, dimensiones y formato. Atacar el archivo dominante es más eficiente que degradar todo por igual.',
      ],
    },
    {
      heading: 'Documentos fotografiados: priorizar legibilidad',
      paragraphs: [
        'En facturas, apuntes, certificados y pizarras, el criterio no es que la imagen “se vea bien”, sino que nombres, cifras, fechas y notas pequeñas puedan leerse. Recorta el fondo, endereza la página, corrige contraste sin borrar trazos y evita sombras. Un buen origen permite comprimir mucho mejor.',
        'Amplía al 100 % la línea más pequeña y comprueba varias zonas, especialmente esquinas y pliegues. Si hay varias páginas, convertirlas en un PDF ordenado puede ser más cómodo, pero no arregla imágenes borrosas. La captura debe ser nítida antes de empaquetarla.',
      ],
      link: {
        prefix: 'Si necesitas entregar una secuencia, consulta ',
        label: 'cómo convertir fotos a PDF desde el móvil',
        href: '/es/guias/fotos-a-pdf-desde-movil/',
        suffix: ' sin perder el orden de las páginas.',
      },
    },
    {
      heading: 'Metadatos, privacidad y ubicación',
      paragraphs: [
        'Una fotografía puede contener fecha, modelo de cámara y, en algunos casos, ubicación. Una nueva exportación puede eliminar parte de esos datos, pero no lo des por garantizado. Si la privacidad importa, revisa propiedades con una herramienta adecuada y evita mostrar direcciones, credenciales, rostros o pantallas que no pertenecen al objetivo.',
        'Comprimir no anonimiza. Los datos siguen visibles en los píxeles aunque el archivo pese menos. Antes de enviar, examina bordes, reflejos, notificaciones y fondo. Para documentación personal utiliza el canal aprobado, limita destinatarios y considera si un enlace controlado es más apropiado que una copia permanente en varios buzones.',
      ],
    },
    {
      heading: 'Por qué un ZIP casi no reduce un JPG',
      paragraphs: [
        'JPG, PNG y WebP ya aplican compresión interna. Guardarlos en ZIP puede facilitar el envío de una carpeta, pero a menudo aporta poca reducción. Además, algunos proveedores bloquean archivos comprimidos o determinados contenidos por seguridad. No cuentes con ZIP como técnica principal para imágenes.',
        'Reducir píxeles o elegir un formato mejor adaptado suele generar una diferencia real. Usa ZIP cuando el receptor lo haya aceptado y necesites conservar nombres o estructura, no para ocultar un lote excesivo. Nunca cambies el nombre o la extensión para eludir filtros del correo.',
      ],
    },
    {
      heading: 'Cuándo es mejor compartir un enlace',
      paragraphs: [
        'Si el receptor necesita originales, un reportaje completo o archivos que se actualizarán, comprimir hasta el límite puede ser una mala solución. Sube al repositorio autorizado y comparte un enlace con permisos mínimos. Verifica quién puede abrirlo, si requiere cuenta, si permite descarga y cuándo caduca.',
        'Un enlace no es automáticamente más privado. Una opción configurada como “cualquiera con el enlace” puede circular fuera del grupo. Para material sensible, usa usuarios concretos y revisa acceso después. Explica en el correo qué contiene la carpeta y hasta cuándo estará disponible.',
      ],
    },
    {
      heading: 'Errores que producen fotos pequeñas pero inútiles',
      paragraphs: [
        'El primero es fijar una calidad mínima sin reducir los píxeles. El segundo es convertir capturas de texto a JPG agresivo. El tercero es evaluar únicamente una miniatura. También es frecuente borrar el original, cambiar relación de aspecto, mezclar versiones o reenviar desde una aplicación que vuelve a comprimir.',
        'Evita automatizar todo el lote con una única cifra si contiene fotografías, capturas y documentos. Separa por tipo y necesidad. Mantén una convención como “original”, “correo” y “impresión”, y abre una muestra de cada grupo. Un proceso breve pero verificable supera a una reducción masiva sin control.',
      ],
    },
    {
      heading: 'Comprobar el lote antes de adjuntarlo',
      paragraphs: [
        'Ordena por tamaño y detecta valores anómalos. Abre cada copia, confirma orientación y dimensiones y amplía los detalles esenciales. Suma el lote completo y deja margen. Comprueba que nombres no revelen información innecesaria y que cada imagen corresponda al asunto del mensaje.',
        'Redacta el correo, adjunta las copias y revisa la cifra que muestra el proveedor. Si la plataforma sustituye el archivo por un enlace, valida sus permisos. Para un envío crítico, descarga una de las copias desde el borrador o haz una prueba a una cuenta autorizada antes de distribuir.',
      ],
    },
    {
      heading: 'Calidad, accesibilidad y contexto para quien recibe',
      paragraphs: [
        'No obligues al destinatario a deducir qué muestra “IMG_4837”. Usa nombres cortos y secuenciales y describe en el texto el orden, la fecha o la incidencia. Si una imagen transmite información esencial, añade una explicación textual; una persona puede no verla bien o puede tener bloqueada la carga de imágenes.',
        'Mantén contraste y tamaño suficiente. Una optimización que obliga a ampliar continuamente no es accesible. Para tablas, proporciona también los datos o un documento estructurado cuando sea posible. El correo debería permitir actuar incluso si una miniatura no se renderiza.',
      ],
    },
    {
      heading: 'Lista de comprobación para fotos por email',
      paragraphs: [
        'Confirma límite actual, número de archivos, finalidad, píxeles necesarios y formato. Conserva originales, recorta, redimensiona y comprime copias. Usa JPG para fotografías y conserva formatos sin pérdida para texto o diagramas cuando los artefactos impidan leer.',
        'Abre las descargas, suma bytes, revisa detalles y nombres y deja margen. Si el lote necesita calidad original o sigue siendo grande, comparte un enlace autorizado con permisos verificados. La tarea termina cuando el receptor puede abrir, entender y utilizar los archivos.',
      ],
    },
  ],
  faq: [
    { q: '¿Cómo reducir una foto para enviarla por correo?', a: 'Conserva el original, recorta, reduce primero sus dimensiones según el uso y exporta una copia JPG o WebP. Abre la descarga y comprueba detalle y peso.' },
    { q: '¿Cuál es el límite de adjuntos de Gmail?', a: 'Las cuentas personales admiten actualmente hasta 25 MB en el total; las cuentas de trabajo o estudio pueden depender del administrador. Verifica siempre la regla vigente.' },
    { q: '¿Qué tamaño en píxeles conviene para una foto por email?', a: 'Para consulta en pantalla, 1.600–2.000 píxeles en el lado largo suele ser un punto de partida, pero impresión y detalle técnico pueden exigir más.' },
    { q: '¿JPG o PNG para una captura con texto?', a: 'PNG o WebP sin pérdida suelen conservar mejor letras y bordes. JPG puede crear halos si se comprime de forma agresiva.' },
    { q: '¿Un ZIP reduce mucho las fotos?', a: 'Normalmente poco, porque JPG, PNG y WebP ya están comprimidos. ZIP sirve más para agrupar que para reducir imágenes.' },
    { q: '¿Comprimir elimina la ubicación de una fotografía?', a: 'No debe asumirse. Revisa metadatos y contenido visible con herramientas adecuadas; comprimir no es anonimizar.' },
    { q: '¿Es mejor adjuntar o enviar un enlace?', a: 'Adjunta copias pequeñas cuando simplifique el acceso; para originales o lotes grandes, utiliza un enlace autorizado con permisos y caducidad revisados.' },
    { q: '¿Cómo sé si he comprimido demasiado?', a: 'Abre el archivo final al 100 % y revisa texto, caras, líneas y gradientes. Si ya no cumple su propósito, vuelve al original y usa menos compresión o más píxeles.' },
  ],
  review: {
    heading: 'Control de calidad de imágenes para correo',
    intro: 'El objetivo no es el archivo más pequeño, sino el conjunto más ligero que conserva la información necesaria.',
    checks: [
      { title: 'Presupuesto', text: 'La suma de adjuntos queda con margen bajo el límite real del canal.' },
      { title: 'Legibilidad', text: 'La descarga conserva texto, detalle, orientación y proporción al tamaño de uso.' },
      { title: 'Entrega', text: 'Nombres, privacidad, formato y permisos permiten al receptor usar el material.' },
    ],
  },
  sources: [
    { label: 'Ayuda de Gmail: enviar archivos adjuntos', href: 'https://support.google.com/mail/answer/6584?hl=es', note: 'Límite total de adjuntos en cuentas personales y uso de Google Drive para archivos mayores.' },
    { label: 'Microsoft: reducir el tamaño de los archivos adjuntos', href: 'https://support.microsoft.com/es-es/office/reducir-el-tama%C3%B1o-de-los-archivos-adjuntos-para-enviar-archivos-grandes-con-outlook-8c698842-b462-4a4c-8d53-5c5dd04f77ef', note: 'Límites variables, uso de enlaces y diferencia entre reducir dimensiones y comprimir imágenes.' },
    { label: 'MDN: formatos de archivo de imagen', href: 'https://developer.mozilla.org/es/docs/Web/Media/Guides/Formats/Image_types', note: 'Características de JPEG, PNG y WebP y elección según fotografía, transparencia o texto.' },
    { label: 'MDN: HTMLCanvasElement.toBlob()', href: 'https://developer.mozilla.org/es/docs/Web/API/HTMLCanvasElement/toBlob', note: 'Exportación de imágenes en el navegador con formato y parámetro de calidad.' },
  ],
};

export const spanishWordCountLimitsGuide: SpanishInfoPage = {
  title: 'Cómo contar palabras en un examen, ensayo o solicitud sin fallar el límite',
  seoTitle: 'Cómo contar palabras en ensayos y exámenes',
  seoDescription: 'Distingue palabras y caracteres, revisa IELTS y Common App, controla el límite mientras redactas y usa siempre el contador oficial como referencia final.',
  keywords: [
    'cómo contar palabras de un texto',
    'límite de palabras ensayo',
    'cuántas palabras IELTS',
    'Common App 650 palabras',
    'contador de palabras y caracteres',
  ],
  eyebrow: 'Guía de escritura · exámenes · formularios de solicitud',
  intro: 'Un texto puede tener 648 palabras en tu editor y mostrar otra cifra al pegarlo en una plataforma. Los guiones, apóstrofos, cifras, símbolos, notas y campos separados no se tratan igual en todos los sistemas. La estrategia segura no consiste en adivinar una regla universal, sino en identificar qué mide la convocatoria, trabajar con margen y aceptar el contador del formulario o examen como referencia final.',
  directAnswer: [
    'Para cumplir un límite, copia primero la instrucción exacta: mínimo, máximo o intervalo; palabras, caracteres con espacios o caracteres sin espacios; y partes incluidas. Configura un objetivo con margen, controla el texto mientras escribes y pégalo con antelación en el sistema oficial. Si su contador difiere del tuyo, manda el valor que muestra la plataforma.',
    'IELTS Academic exige actualmente al menos 150 palabras en Writing Task 1 y 250 en Task 2. Common App indica para su ensayo personal un intervalo aceptado de 250 a 650 palabras y recuerda que 650 es el máximo, no una meta. Son reglas de productos concretos y pueden cambiar: confirma siempre la convocatoria del año y la institución receptora.',
  ],
  sections: [
    {
      heading: 'Primero identifica qué tipo de límite tienes',
      paragraphs: [
        '“Máximo 500 palabras” significa que 501 puede bloquear el envío o incumplir la instrucción. “Al menos 250” convierte 249 en insuficiente. “Entre 800 y 1.000” fija ambos bordes. Un límite recomendado permite flexibilidad, mientras uno obligatorio debe tratarse como requisito de entrega.',
        'Anota también el alcance: cuerpo, título, citas, pies, bibliografía, tablas o anexos. Una revista puede excluir referencias y una solicitud contar todo lo pegado en una única caja. Si la guía no lo explica, consulta al organismo; no extrapoles la regla de otra plataforma.',
      ],
    },
    {
      heading: 'Palabras, caracteres y bytes son medidas diferentes',
      paragraphs: [
        'Una palabra suele ser una secuencia separada por espacios, pero el algoritmo decide qué hace con guiones y apóstrofos. Los caracteres cuentan letras, espacios, signos y saltos según la opción. Los bytes miden almacenamiento y pueden ser más que los caracteres cuando se usan tildes, emoji o alfabetos multibyte.',
        'Una red social o formulario breve puede imponer caracteres; un ensayo académico, palabras. No conviertas uno en otro usando una media fija porque la longitud de las palabras cambia por idioma y estilo. Mide exactamente la unidad pedida y conserva visible la otra como control auxiliar.',
      ],
    },
    {
      heading: 'Por qué dos contadores no siempre coinciden',
      paragraphs: [
        '“Teórico-práctico”, “del”, “I’m”, una URL, 2026/27 o un emoji pueden dividirse de forma distinta. Algunos sistemas cuentan texto en notas al pie o cuadros; otros solo el campo activo. Espacios no separables, saltos de línea y marcas ocultas al copiar desde PDF también alteran resultados.',
        'Una diferencia de una o dos palabras no demuestra que una herramienta esté mal: puede usar otra regla. Limpia el formato, pega como texto cuando esté permitido y localiza expresiones conflictivas. Para la entrega, el algoritmo del sistema receptor tiene autoridad operativa.',
      ],
    },
    {
      heading: 'Contar mientras escribes en lugar de recortar al final',
      paragraphs: [
        'Distribuye el presupuesto antes del borrador. En un texto de 600 palabras, podrías reservar 70 para apertura, 430 para dos o tres ideas y 100 para conclusión y revisión. No son porcentajes obligatorios; sirven para impedir que el primer apartado consuma toda la respuesta.',
        'Revisa después de cada bloque. Si una sección supera su presupuesto, decide qué idea se repite o no responde al enunciado. Recortar 200 palabras al final suele romper transiciones y pruebas; ajustar 30 durante el proceso conserva mejor la estructura.',
      ],
    },
    {
      heading: 'Usar el contador de FunnyTools como control de borrador',
      paragraphs: [
        'Pega el texto y observa palabras, caracteres, frases, párrafos, líneas y tiempo estimado de lectura. La operación se realiza en el navegador. Utiliza el resultado para planificar y detectar cambios entre versiones, pero no lo presentes como la regla oficial de una universidad, examen o plataforma.',
        'Compara siempre el último borrador con el campo de destino. Si el texto contiene guiones, apóstrofos, URLs, listas o símbolos, deja un margen mayor. Guarda una copia externa antes de pegar: un formulario puede cerrar sesión, eliminar formato o cortar contenido.',
      ],
      link: {
        prefix: 'Controla el borrador con el ',
        label: 'contador de palabras',
        href: '/es/herramientas/contador-palabras/',
        suffix: ' y contrasta después con el sistema de entrega.',
      },
    },
    {
      heading: 'IELTS Academic Writing: mínimos y gestión del tiempo',
      paragraphs: [
        'La información oficial de IELTS establece un mínimo de 150 palabras para Task 1 y 250 para Task 2. También indica que Task 2 aporta el doble a la nota de Writing y propone aproximadamente 20 y 40 minutos. Escribir por debajo del mínimo perjudica el cumplimiento de la tarea.',
        'Superar el mínimo no significa que cuanto más largo, mejor. IELTS advierte que una respuesta muy extensa puede quitar tiempo para revisar y añadir contenido no pertinente. Practica con una zona objetivo que te permita desarrollar, corregir y completar ambas tareas sin contar palabra por palabra durante los últimos minutos.',
      ],
    },
    {
      heading: 'Common App: 650 es un límite, no una obligación',
      paragraphs: [
        'La interfaz y documentación de Common App indican que el ensayo personal no acepta menos de 250 ni más de 650 palabras y recuerdan que no es necesario llenar el máximo. La institución puede no exigir el ensayo o incluir preguntas complementarias con límites propios.',
        'No reutilices automáticamente el mismo texto en todos los campos. Comprueba si una universidad pide ensayo principal, suplemento o respuesta breve y mide cada caja por separado. Antes del envío revisa la vista previa completa, porque pegar desde un editor puede cambiar párrafos o caracteres especiales.',
      ],
    },
    {
      heading: 'No conservar cifras antiguas de TOEFL u otros exámenes',
      paragraphs: [
        'Los exámenes cambian tareas, tiempos y plataformas. Una cifra publicada en una academia o un vídeo puede corresponder a una edición anterior. Consulta la web y materiales oficiales para tu fecha y no confundas una extensión sugerida en una rúbrica con un mínimo técnico del campo.',
        'La misma prudencia vale para oposiciones, becas y admisiones: identifica convocatoria, año, modalidad y versión del examen. En tu hoja de planificación registra la URL y fecha de consulta. Si la instrucción aparece dentro de la prueba, esa indicación prevalece sobre un resumen externo.',
      ],
    },
    {
      heading: 'Palabras con guion, contracciones y números',
      paragraphs: [
        'No existe una convención digital universal. “Toma de decisiones” suele separarse por espacios; una forma con guion puede contar como una o más unidades según el sistema. Las contracciones inglesas suelen permanecer juntas en muchos editores, pero una plataforma puede tokenizarlas de otra manera. Las cifras y URLs también varían.',
        'No fuerces redacciones extrañas para manipular el contador. Usa ortografía y estilo correctos, mide en el sistema final y deja margen. Si la institución publica una regla explícita, síguela; si no, el número visible al pegar es la evidencia más útil.',
      ],
    },
    {
      heading: 'Títulos, citas, notas y bibliografía',
      paragraphs: [
        'En una caja de texto simple, cualquier título o cita pegada puede entrar en el recuento. En un trabajo académico, la guía puede separar resumen, cuerpo y referencias. No elimines atribuciones para ahorrar palabras: ajusta el argumento y cumple las normas de citación.',
        'Diferencia límite editorial y exigencia académica. Si se indica “2.000 palabras, bibliografía excluida”, documenta qué se ha excluido. Si no se especifica, pide aclaración antes de la fecha límite. Una nota al pie no deja de existir porque el contador del cuerpo no la vea.',
      ],
    },
    {
      heading: 'Cómo recortar un texto sin vaciarlo',
      paragraphs: [
        'Empieza por repeticiones: una idea en introducción, desarrollo y conclusión no necesita tres explicaciones completas. Sustituye rodeos por verbos directos, elimina transiciones que no conectan y conserva pruebas que sostienen la respuesta. Quitar ejemplos centrales para salvar adjetivos suele empeorar el texto.',
        'Recorta por capas. Primero contenido fuera del enunciado; después duplicaciones; luego frases y palabras. Vuelve a leer la lógica tras cada ronda. Si estás muy por encima, quizá el problema sea la estructura y convenga elegir menos ideas, no comprimir cada frase hasta volverla opaca.',
      ],
    },
    {
      heading: 'Cómo ampliar cuando no llegas al mínimo',
      paragraphs: [
        'No rellenes con definiciones obvias. Comprueba si respondiste todas las partes, si cada afirmación tiene razón o ejemplo y si consideraste una consecuencia o límite. Un párrafo puede crecer con explicación pertinente, no con sinónimos repetidos.',
        'Formula preguntas de revisión: ¿qué significa esta afirmación?, ¿por qué importa?, ¿qué evidencia la respalda?, ¿qué objeción necesita respuesta? Añade solo lo que fortalece la tarea. Cuando alcances el mínimo, prioriza coherencia y corrección antes que volumen.',
      ],
    },
    {
      heading: 'Caracteres con y sin espacios en formularios breves',
      paragraphs: [
        'Algunas becas, perfiles y portales miden caracteres. Un límite “con espacios” consume una unidad por cada separación y signo; “sin espacios” aplica otra regla. Los saltos de línea pueden contar y los emoji pueden ocupar unidades distintas según la implementación.',
        'Usa un contador de caracteres durante el borrador y el indicador del campo al final. Evita pegar formato rico si no es necesario. Si el sistema corta automáticamente, no confíes en que conservó la última frase completa: vuelve al inicio, revisa el final y guarda una copia del texto aceptado.',
      ],
      link: {
        prefix: 'Para campos breves, compara ambos criterios con el ',
        label: 'contador de caracteres',
        href: '/es/herramientas/contador-caracteres/',
        suffix: ' antes de pegar la versión final.',
      },
    },
    {
      heading: 'Copiar desde Word, Google Docs o PDF',
      paragraphs: [
        'El texto puede arrastrar viñetas, tabulaciones, espacios no separables y saltos especiales. Primero guarda una versión maestra, luego pega en el formulario y observa párrafos, comillas, guiones y contador. La vista previa es parte de la revisión, no un trámite decorativo.',
        'Copiar desde un PDF es especialmente propenso a introducir cortes de línea y guiones de final de renglón. Si el sistema permite archivo en lugar de caja, sigue su formato. Si exige texto, limpia manualmente y compara inicio, mitad y final con el original.',
      ],
    },
    {
      heading: 'Crear un registro de requisitos para varias solicitudes',
      paragraphs: [
        'Una candidatura puede incluir ensayo común, motivación, respuesta corta y descripción de actividad. Crea una tabla con institución, campo, límite, unidad, regla de inclusión, fecha y enlace oficial. Así evitas pegar una versión de 650 palabras en una caja de 500 o confundir convocatorias.',
        'Asigna nombres de archivo con institución, tema y versión. No sobrescribas el único borrador al recortar. Después de cada entrega guarda la versión enviada y el justificante permitido; una futura edición debe partir de la copia correcta, no de una mezcla recordada.',
      ],
    },
    {
      heading: 'Revisión final antes de pulsar enviar',
      paragraphs: [
        'Confirma que el texto responde al enunciado actual, se encuentra dentro del intervalo visible y no quedó truncado. Revisa párrafos, signos, caracteres especiales, nombres propios y datos. Usa la vista previa y, si existe, descarga el PDF de solicitud para comprobar la representación final.',
        'No realices una gran reescritura en la caja sin copiarla de vuelta a tu documento maestro. Si el contador cambia, identifica la causa y mantén margen. Completa la entrega con tiempo para resolver una sesión caducada o una regla que solo aparece al validar.',
      ],
    },
    {
      heading: 'Lista de comprobación de palabras y caracteres',
      paragraphs: [
        'Registra mínimo, máximo, unidad, partes incluidas, versión y fuente oficial. Divide el presupuesto, escribe con margen y mide tras cada sección. Revisa expresiones que distintos algoritmos pueden contar de otra manera.',
        'Pega pronto en el sistema, compara el valor, comprueba formato y guarda una copia. El contador externo ayuda a redactar; el indicador oficial decide la entrega. Si hay contradicción entre una guía y la plataforma, documenta y consulta al organismo antes de asumir.',
      ],
    },
  ],
  faq: [
    { q: '¿Cómo se cuentan las palabras de un texto?', a: 'Normalmente por grupos separados por espacios, pero guiones, apóstrofos, cifras y URLs pueden variar. Usa el contador de la plataforma como referencia final.' },
    { q: '¿Cuántas palabras pide IELTS Writing?', a: 'IELTS Academic indica al menos 150 palabras para Task 1 y 250 para Task 2. Confirma siempre el formato vigente para tu fecha.' },
    { q: '¿Cuántas palabras admite el ensayo de Common App?', a: 'La interfaz actual indica entre 250 y 650 palabras para el ensayo personal; 650 es el límite, no una meta obligatoria.' },
    { q: '¿Los títulos cuentan como palabras?', a: 'Depende del sistema. En una caja de texto pueden contar; una guía académica puede excluirlos. Lee la instrucción específica.' },
    { q: '¿Una palabra con guion cuenta como una o dos?', a: 'No hay una regla digital universal. Escribe correctamente, deja margen y comprueba el valor del campo de entrega.' },
    { q: '¿Qué hago si Word y el formulario muestran cifras distintas?', a: 'Revisa guiones, apóstrofos, notas y espacios ocultos; para enviar, ajusta al contador del formulario.' },
    { q: '¿Es mejor llegar exactamente al máximo?', a: 'No. Desarrolla la respuesta con claridad y deja margen frente a diferencias de recuento. El máximo no es un objetivo de calidad.' },
    { q: '¿Cómo reduzco palabras sin perder contenido?', a: 'Elimina primero lo que no responde, después repeticiones y rodeos. Conserva argumentos, evidencia, atribuciones y transiciones necesarias.' },
  ],
  review: {
    heading: 'Control de calidad de un texto con límite',
    intro: 'Cumplir la cifra importa, pero la respuesta también debe conservar propósito, claridad y formato.',
    checks: [
      { title: 'Regla', text: 'Mínimo, máximo, unidad, alcance, versión y fuente oficial están identificados.' },
      { title: 'Contenido', text: 'El texto responde al enunciado y mantiene pruebas y coherencia tras el ajuste.' },
      { title: 'Entrega', text: 'El contador y la vista previa del sistema confirman una versión completa y legible.' },
    ],
  },
  sources: [
    { label: 'IELTS: formato de Academic Writing', href: 'https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-writing', note: 'Mínimos de 150 y 250 palabras, tiempos orientativos y peso relativo de las dos tareas.' },
    { label: 'IELTS: recursos de preparación de Writing', href: 'https://ielts.org/take-a-test/preparation-resources/writing-test-resources', note: 'Criterios de respuesta, extensión y uso de texto continuo para las tareas oficiales.' },
    { label: 'Common App: interfaz de First-year application', href: 'https://www.commonapp.org/files/Common-App-UI-updates.pdf', note: 'Intervalo de 250 a 650 palabras y recordatorio de que el máximo no es una meta.' },
    { label: 'Unicode: segmentación de límites de texto', href: 'https://www.unicode.org/reports/tr29/', note: 'Reglas técnicas de segmentación y motivos por los que palabras y caracteres no siempre coinciden entre sistemas.' },
  ],
};
