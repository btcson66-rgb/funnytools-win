import type { ToolContent } from '../tools/_types';

export const spanishPasswordGenerator: ToolContent = {
  name: 'Generador de contraseñas seguras',
  short: 'Crea una contraseña aleatoria de 4 a 64 caracteres con las clases que elijas y una fuente criptográfica del navegador.',
  long: 'Elige longitud, mayúsculas, minúsculas, números y símbolos para generar una clave distinta en cada intento. La herramienta utiliza `crypto.getRandomValues` y muestreo por rechazo para seleccionar caracteres sin recurrir a `Math.random`. También garantiza que aparezca al menos un carácter de cada grupo marcado. El resultado no se guarda ni se envía a FunnyTools; debes copiarlo directamente a un gestor de contraseñas confiable.',
  seoTitle: 'Generador de contraseñas seguras y aleatorias online',
  seoDescription: 'Genera contraseñas seguras de hasta 64 caracteres con crypto.getRandomValues, letras, números, símbolos y opción para excluir O0l1I.',
  keywords: [
    'generador de contraseñas seguras',
    'generador de contraseña aleatoria',
    'crear contraseña fuerte',
    'contraseña con letras números y símbolos',
    'generador password online',
    'clave aleatoria 16 caracteres',
    'crypto.getRandomValues contraseña',
  ],
  capabilities: [
    'Elegir una longitud entre 4 y 64 caracteres y combinar hasta cuatro clases distintas.',
    'Asegurar al menos una mayúscula, una minúscula, un número o un símbolo de cada grupo seleccionado.',
    'Usar `crypto.getRandomValues` con muestreo por rechazo y detenerse si el navegador no ofrece una fuente segura.',
    'Excluir O, 0, l, 1 e I cuando la clave deba leerse, dictarse o teclearse manualmente.',
    'Copiar la contraseña sin crear una cuenta ni enviarla a un servidor de FunnyTools.',
  ],
  contentSections: [
    {
      heading: 'Respuesta rápida: cómo crear una contraseña segura',
      paragraphs: [
        'Para una cuenta real, selecciona una longitud amplia, conserva las cuatro clases si el servicio las acepta y pulsa «Generar contraseña». Una opción práctica para la mayoría de registros es comenzar con 16 o más caracteres. Copia el resultado a un gestor de contraseñas y úsalo en una sola cuenta. Si la web impone una longitud o un conjunto de símbolos concreto, ajusta la configuración a esa política antes de guardar la clave.',
        'El control permite bajar hasta cuatro caracteres porque también sirve para maquetas y pruebas de formularios; una salida tan corta no debe utilizarse como secreto de acceso. La longitud es una defensa central frente a intentos de adivinación, pero el resultado pierde gran parte de su utilidad si se reutiliza, se deja en un documento compartido o se introduce en un dispositivo comprometido. La seguridad de la cuenta depende también del servicio, la recuperación y la autenticación multifactor.',
      ],
    },
    {
      heading: 'Qué fuente aleatoria utiliza el generador',
      paragraphs: [
        'La selección se realiza con `crypto.getRandomValues`, la interfaz que los navegadores ofrecen para obtener valores aleatorios adecuados para usos criptográficos. FunnyTools toma un entero de 32 bits, descarta los valores que introducirían un sesgo al aplicar el módulo y vuelve a pedir otro cuando hace falta. Ese muestreo por rechazo evita favorecer algunos caracteres cuando el tamaño del alfabeto no divide exactamente el espacio de enteros.',
        'La página no cambia silenciosamente a `Math.random` si la API segura no existe. En ese caso deja la salida vacía y muestra un error. Esta decisión es importante: `Math.random` sirve para animaciones, muestras visuales o pequeños juegos, pero su secuencia no está diseñada para secretos. El código puede inspeccionarse en el navegador y el proceso ocurre en la pestaña; aun así, una extensión maliciosa, un sistema infectado o un portapapeles sincronizado quedan fuera del control de la página.',
      ],
      link: {
        prefix: 'Consulta la descripción técnica de ',
        label: 'Crypto.getRandomValues en MDN',
        href: 'https://developer.mozilla.org/es/docs/Web/API/Crypto/getRandomValues',
        suffix: ' para conocer la API utilizada por el navegador.',
      },
    },
    {
      heading: 'Longitud, variedad y reglas del sitio',
      paragraphs: [
        'Una contraseña generada a partir de un espacio amplio se vuelve más difícil de probar por fuerza bruta a medida que aumenta la longitud. Marcar varias clases también amplía el conjunto posible y ayuda a satisfacer formularios antiguos que exigen una mayúscula, un número o un símbolo. El algoritmo coloca primero un carácter de cada clase elegida, completa el resto desde el conjunto combinado y baraja todas las posiciones; por eso una categoría obligatoria no queda siempre al principio.',
        'Las reglas de composición no sustituyen a la longitud. La guía NIST SP 800-63B-4 para verificadores desaconseja imponer mezclas arbitrarias de tipos y pide admitir contraseñas largas; eso no impide que una persona utilice voluntariamente un generador con distintas clases. En la práctica, manda la política del servicio receptor. Algunos rechazan determinados símbolos, limitan la longitud o recortan espacios. Prueba el registro y el inicio de sesión antes de borrar cualquier acceso anterior.',
      ],
      link: {
        prefix: 'Para criterios actuales sobre longitud, gestores y políticas de verificación, revisa ',
        label: 'NIST SP 800-63B-4',
        href: 'https://pages.nist.gov/800-63-4/sp800-63b.html',
        suffix: '.',
      },
    },
    {
      heading: 'Qué significa el indicador de fuerza',
      paragraphs: [
        'La etiqueta «Débil», «Aceptable», «Fuerte» o «Muy fuerte» es una orientación local basada en longitud y número de clases. No calcula la entropía real, no compara la cadena con filtraciones conocidas, no conoce patrones personales y no simula el sistema de almacenamiento del proveedor. Una clave puede recibir una etiqueta alta y ser inadecuada si ya se utilizó en otra web o si alguien la vio al copiarla.',
        'Tampoco conviene interpretar la barra como tiempo garantizado de descifrado. Ese tiempo varía según el algoritmo de hash, el coste configurado, la velocidad del atacante, el número de intentos permitido y si la base de datos salió del servidor. Utiliza el indicador para detectar configuraciones obviamente cortas, no para certificar seguridad. En entornos empresariales, sigue el gestor aprobado, los controles de acceso y la política de respuesta ante incidentes.',
      ],
    },
    {
      heading: 'Una contraseña distinta para cada servicio',
      paragraphs: [
        'La reutilización convierte una filtración en una llave para varias cuentas. Si un comercio pierde tu contraseña y la misma combinación abre el correo, un atacante puede aprovecharla sin romper ningún cifrado. Genera un valor independiente para cada dominio y almacénalo junto con la dirección exacta del servicio. Un gestor de contraseñas facilita esta práctica y reduce la necesidad de inventar reglas previsibles como cambiar el año o añadir el nombre de la web.',
        'Antes de pegar una clave, comprueba el dominio y evita enlaces inesperados recibidos por mensaje. Una contraseña larga no es resistente al phishing cuando se entrega a una página falsa. Las passkeys y llaves de seguridad pueden ofrecer mejor resistencia a ese ataque cuando el servicio las admite. Activa además autenticación multifactor y guarda los códigos de recuperación en un lugar separado; el generador no configura ninguno de esos controles.',
      ],
    },
    {
      heading: 'Cuándo excluir O0l1I',
      paragraphs: [
        'La casilla de caracteres ambiguos elimina exactamente O mayúscula, cero, ele minúscula, uno e i mayúscula. Resulta útil para una clave temporal que debe leerse en una pantalla, imprimirse o dictarse por teléfono. Reduce errores humanos en tipografías donde esos signos se parecen. No elimina todos los caracteres visualmente próximos ni convierte el resultado en una frase fácil de recordar.',
        'Excluir signos reduce ligeramente el conjunto disponible, por lo que suele compensarse con más longitud. Si vas a guardar y rellenar la clave mediante un gestor, normalmente no necesitas esta opción: copiar una cadena larga evita la confusión visual. Si el servicio prohíbe ciertos símbolos, desmarca el grupo completo o genera de nuevo hasta cumplir su política; la interfaz no permite editar una lista personalizada de caracteres.',
      ],
    },
    {
      heading: 'Portapapeles, dispositivo y almacenamiento',
      paragraphs: [
        'Al pulsar «Copiar contraseña», el valor pasa al portapapeles del sistema. Otros programas, historiales del portapapeles y funciones de sincronización podrían conservarlo. Pégalo de inmediato en el destino correcto, guárdalo en el gestor y limpia el historial si tu sistema lo permite. Evita copiar secretos en equipos públicos, escritorios remotos no confiables o sesiones compartidas.',
        'FunnyTools no mantiene un historial ni ofrece recuperación. Al recargar o cerrar la pestaña se pierde la referencia de la página, aunque el navegador, el sistema operativo o una captura de pantalla pueden conservar rastros ajenos al sitio. No envíes la clave por correo o chat junto con el nombre de la cuenta. Para accesos compartidos de empresa, usa una función de intercambio controlado del gestor y retira el permiso cuando termine la necesidad.',
      ],
    },
    {
      heading: 'Límites: no es una clave criptográfica ni una auditoría',
      paragraphs: [
        'La salida está pensada para campos de contraseña. No debe emplearse directamente como clave AES, semilla de una cartera, frase de recuperación, token de firma, secreto de API ni material de producción para una infraestructura criptográfica. Esos sistemas definen tamaños, codificaciones, derivación, almacenamiento y rotación específicos. Utiliza la biblioteca o el procedimiento oficial del producto correspondiente.',
        'El generador tampoco verifica si una cadena apareció en una filtración porque no la envía a ningún servicio externo. Una contraseña recién generada tiene una probabilidad mínima de coincidir por azar, pero la página no emite una certificación. Si una organización necesita controles de compromiso, puede aplicarlos dentro de su sistema de identidad sin exponer el secreto completo y siguiendo su evaluación de riesgos.',
      ],
    },
  ],
  instructions: [
    'Consulta la política de la cuenta y fija una longitud suficiente; para uso real, evita el extremo corto del control.',
    'Marca las clases admitidas y activa la exclusión O0l1I únicamente si habrá lectura o escritura manual.',
    'Genera la contraseña y confirma que la página no muestra un error de fuente aleatoria segura.',
    'Cópiala directamente a un gestor de contraseñas y úsala en un solo servicio.',
    'Prueba el inicio de sesión, activa MFA o passkey si existe y guarda la recuperación por separado.',
  ],
  examples: [
    'Crear una clave única de 20 caracteres para una nueva cuenta de correo.',
    'Generar una contraseña de laboratorio que cumpla una validación de mayúscula, número y símbolo.',
    'Preparar un acceso Wi-Fi temporal sin O0l1I para reducir errores al teclear.',
    'Sustituir una contraseña reutilizada y registrar el nuevo valor en un gestor confiable.',
  ],
  audience: [
    'Personas que abren una cuenta y quieren evitar contraseñas repetidas o predecibles.',
    'Equipos de QA que necesitan datos de prueba ajustados a distintas reglas de formulario.',
    'Administración que entrega un acceso temporal y necesita reducir caracteres ambiguos.',
    'Usuarios de gestores de contraseñas que desean generar localmente antes de guardar.',
  ],
  caseStudies: [
    {
      title: 'Cuenta nueva sin reutilización',
      description: 'Una persona genera 20 caracteres con las cuatro clases, guarda el valor en su gestor bajo el dominio exacto y activa MFA. La clave no se copia a notas ni se reutiliza en otra cuenta.',
    },
    {
      title: 'Formulario con símbolos restringidos',
      description: 'Un portal rechaza parte de la puntuación. El usuario revisa la política, desmarca símbolos, aumenta la longitud y vuelve a generar en vez de editar una contraseña existente con un patrón previsible.',
    },
    {
      title: 'Acceso temporal leído en persona',
      description: 'Para una red de invitados se excluyen O0l1I y se crea una cadena más larga. Tras el evento se cambia el acceso, porque una contraseña fácil de transcribir también puede circular fuera del grupo.',
    },
  ],
  notes: [
    'El intervalo de 4 a 64 cubre pruebas técnicas; una contraseña corta no se vuelve segura por ser aleatoria.',
    'La barra de fuerza es una heurística de longitud y variedad, no una auditoría ni una estimación garantizada de descifrado.',
    'La herramienta no consulta filtraciones, no guarda resultados y no puede recuperar una clave perdida.',
    'Generación local no protege frente a phishing, malware, extensiones hostiles o historial del portapapeles.',
    'No utilices la salida como semilla, frase de recuperación o clave criptográfica de otro sistema.',
  ],
  faq: [
    {
      q: '¿Esta página usa Math.random para crear la contraseña?',
      a: 'No. Exige `crypto.getRandomValues` y emplea muestreo por rechazo. Si la API no está disponible, muestra un error y no genera una salida.',
    },
    {
      q: '¿Cuántos caracteres debería elegir?',
      a: 'Depende de la política del servicio. Para una contraseña aleatoria de cuenta, 16 o más es un punto de partida práctico; usa más cuando el sistema lo permita y evita reutilizarla.',
    },
    {
      q: '¿Cada clase marcada aparece en el resultado?',
      a: 'Sí. El algoritmo incorpora al menos un carácter de cada grupo seleccionado y después baraja todas las posiciones.',
    },
    {
      q: '¿La etiqueta «Muy fuerte» garantiza que la cuenta sea segura?',
      a: 'No. Solo resume longitud y variedad. No evalúa filtraciones, phishing, almacenamiento del proveedor, dispositivo, MFA ni recuperación.',
    },
    {
      q: '¿La contraseña se envía o se guarda?',
      a: 'FunnyTools no la recibe ni mantiene un historial. El portapapeles, las extensiones y el sistema operativo pueden tratarla fuera de la página.',
    },
    {
      q: '¿Por qué un servicio rechaza la contraseña?',
      a: 'Puede limitar longitud o símbolos. Revisa su mensaje y genera una nueva combinación compatible; no reduzcas la seguridad más de lo necesario.',
    },
  ],
  labels: {
    length: 'Longitud de la contraseña',
    uppercase: 'Letras mayúsculas',
    lowercase: 'Letras minúsculas',
    numbers: 'Números',
    symbols: 'Símbolos',
    excludeAmbiguous: 'Excluir caracteres ambiguos O0l1I',
    generate: 'Generar contraseña',
    copy: 'Copiar contraseña',
    result: 'Contraseña generada',
    strength: 'Orientación',
    weak: 'Débil',
    fair: 'Aceptable',
    strong: 'Fuerte',
    veryStrong: 'Muy fuerte',
    selectOneError: 'Selecciona al menos un tipo de carácter.',
    cryptoError: 'Este navegador no ofrece una fuente aleatoria segura. No se ha generado ninguna contraseña.',
    copied: 'Contraseña copiada',
  },
  privacyNote: 'La contraseña se genera con la API criptográfica del navegador y no se envía a FunnyTools. Protege el portapapeles y guárdala directamente en un gestor confiable.',
  disclaimer: 'Una contraseña aleatoria ayuda, pero no evita phishing ni compensa reutilización, malware o una recuperación débil. Utiliza una clave distinta por servicio y activa MFA o passkey cuando esté disponible.',
};

export const spanishPasswordGeneratorReview = {
  heading: 'Cómo comprobar una contraseña generada',
  intro: 'La comprobación útil no consiste en admirar una barra: hay que confirmar política, unicidad, almacenamiento y recuperación.',
  panels: [
    { title: 'Fuente segura', text: 'La página debe generar mediante crypto.getRandomValues; si falta la API, tiene que detenerse con un error.' },
    { title: 'Compatibilidad real', text: 'Comprueba longitud y caracteres contra el formulario del servicio antes de sustituir el acceso anterior.' },
    { title: 'Ciclo completo', text: 'Guarda en un gestor, prueba el inicio de sesión y protege MFA y códigos de recuperación.' },
  ],
  checklistHeading: 'Lista de comprobación',
  checklist: [
    'La contraseña tiene la longitud prevista y contiene cada clase seleccionada.',
    'No se reutiliza en otra cuenta ni incluye nombres, fechas o patrones personales.',
    'El dominio donde se pega es el correcto y la conexión no procede de un enlace sospechoso.',
    'El valor queda en un gestor, no en una nota, captura o conversación compartida.',
  ],
};

export const spanishBarcodeGenerator: ToolContent = {
  name: 'Generador de código de barras',
  short: 'Crea Code 128, EAN-13, UPC-A o Code 39, valida el dígito de control y descarga PNG o SVG.',
  long: 'Introduce un identificador corto, elige la simbología y revisa la vista previa antes de descargar. Para EAN-13 puedes escribir 12 dígitos y dejar que la herramienta calcule el decimotercero; para UPC-A, 11 y el duodécimo. Si pegas un código completo, se valida su dígito de control. La imagen se dibuja localmente con JsBarcode, pero un número matemáticamente válido no equivale a un GTIN asignado por GS1 ni garantiza aceptación comercial.',
  seoTitle: 'Generador de código de barras EAN-13, UPC y Code 128',
  seoDescription: 'Genera códigos de barras Code 128, EAN-13, UPC-A y Code 39. Valida el dígito de control y descarga PNG o SVG para probar.',
  keywords: [
    'generador de código de barras',
    'crear código de barras online',
    'generador EAN-13',
    'generador UPC-A',
    'generador Code 128',
    'calcular dígito de control EAN',
    'código de barras PNG SVG',
  ],
  capabilities: [
    'Generar cuatro simbologías de una dimensión: Code 128, EAN-13, UPC-A y Code 39.',
    'Calcular o validar el dígito de control de EAN-13 y UPC-A antes de habilitar la descarga.',
    'Convertir automáticamente a mayúsculas el contenido permitido por Code 39 y rechazar caracteres incompatibles.',
    'Descargar PNG para documentos y SVG vectorial para maquetación y pruebas de impresión.',
    'Dibujar el símbolo en esta pestaña sin enviar el identificador a FunnyTools.',
  ],
  contentSections: [
    {
      heading: 'Respuesta rápida: qué formato de código de barras elegir',
      paragraphs: [
        'Usa Code 128 para referencias internas, pedidos, ubicaciones o activos cuando el sistema receptor no imponga otra simbología. Elige EAN-13 o UPC-A únicamente si el número procede del flujo comercial correspondiente y la tienda, marketplace o distribuidor lo exige. Code 39 sigue siendo habitual en ciertos equipos antiguos e industriales, pero ocupa más anchura y admite un conjunto menor de caracteres.',
        'El generador crea la representación gráfica de un valor; no inventa una identidad comercial. Un EAN-13 con 13 cifras y dígito de control correcto puede seguir perteneciendo a otra empresa, estar sin asignar o no coincidir con el producto. Antes de imprimir un envase, confirma el GTIN en los registros de la organización, la licencia de prefijo y las reglas vigentes del canal de venta.',
      ],
    },
    {
      heading: 'EAN-13 y el dígito de control',
      paragraphs: [
        'EAN-13 contiene doce dígitos de datos y un dígito de control final. La herramienta acepta los doce primeros, aplica pesos alternos de 1 y 3, suma los productos y calcula cuánto falta para llegar al siguiente múltiplo de diez. Si introduces las trece cifras, repite el cálculo y muestra cuál debería ser la última cuando no coincide. Así se detectan muchas equivocaciones de tecleo.',
        'El dígito de control verifica la estructura numérica, no el significado. No confirma fabricante, referencia, país de origen, precio, autenticidad ni alta en una base de datos. Tampoco evita duplicados dentro de un inventario. Conserva el registro maestro que relaciona GTIN y producto, y corrige la fuente cuando haya un error; cambiar solo la cifra final para que pase la fórmula puede ocultar un identificador equivocado.',
      ],
      link: {
        prefix: 'GS1 ofrece su ',
        label: 'calculadora oficial de dígito de control',
        href: 'https://www.gs1.org/services/check-digit-calculator',
        suffix: ' para contrastar un número destinado a uso comercial.',
      },
    },
    {
      heading: 'UPC-A y la venta en Norteamérica',
      paragraphs: [
        'UPC-A utiliza once dígitos de datos y uno de control. Es frecuente en Estados Unidos y Canadá, mientras que EAN-13 aparece en numerosos mercados internacionales. La página acepta once cifras y añade la última, o comprueba una cadena completa de doce. La aritmética se parece a la de EAN-13, con ponderación alterna y complemento a diez.',
        'La elección no debe basarse solo en la región del visitante. Amazon, un supermercado o un operador logístico pueden exigir un tipo, contrastar el propietario del GTIN o admitir excepciones en ciertas categorías. Consulta el procedimiento del canal antes de crear el arte. FunnyTools no solicita prefijos, no registra códigos, no consulta catálogos y no garantiza que una plataforma acepte el valor.',
      ],
    },
    {
      heading: 'Code 128 para inventario y operaciones',
      paragraphs: [
        'Code 128 es una opción compacta para letras, números y diversos signos. Encaja bien con números de pedido, referencias de almacén, expedientes, ubicaciones y etiquetas internas. El escáner suele entregar la cadena al sistema como si se hubiera escrito; el significado lo aporta la aplicación que busca ese identificador. Por eso conviene usar un ID corto y estable, no una descripción completa.',
        'Una cadena larga produce un símbolo más ancho. Reducirla a la fuerza puede estrechar demasiado los módulos y provocar fallos. Si la etiqueta tiene poco espacio, acorta el identificador o revisa la simbología con el responsable del sistema. No codifiques contraseñas, datos de pago, diagnósticos ni información personal innecesaria: cualquiera que vea o fotografíe la etiqueta puede leer su contenido.',
      ],
    },
    {
      heading: 'Code 39 y sus caracteres permitidos',
      paragraphs: [
        'Code 39 admite letras latinas mayúsculas, dígitos, espacio y los signos `. $ / + % -`. La herramienta convierte las letras a mayúsculas y rechaza tildes, ñ, minúsculas fuera de la conversión y puntuación no contemplada. Es una simbología sencilla y muy extendida en procesos industriales antiguos, aunque resulta menos densa que Code 128.',
        'Algunas instalaciones exigen un carácter de control Mod 43, dimensiones concretas o una forma específica de representar los signos de inicio y fin. Este generador utiliza la configuración general de JsBarcode y no añade automáticamente requisitos internos. Si el manual del escáner o del proveedor define un perfil, esa documentación prevalece. Haz una etiqueta de prueba antes de generar una serie.',
      ],
    },
    {
      heading: 'PNG o SVG: cuál conviene descargar',
      paragraphs: [
        'PNG es una imagen de píxeles cómoda para Word, PowerPoint, hojas de cálculo y maquetas rápidas. La descarga se genera con trazos más anchos y mayor altura que la vista previa para ganar definición. Si luego se amplía demasiado, los bordes pueden suavizarse o pixelarse. Evita capturas de pantalla porque suelen perder resolución y pueden cortar el margen.',
        'SVG describe líneas vectoriales y conserva bordes nítidos al cambiar de tamaño dentro de una maquetación. Es preferible para etiquetas, pruebas de packaging y documentos que pasarán por un flujo de preimpresión. Ser vectorial no garantiza lectura: una escala excesivamente pequeña, una proporción deformada o una exportación posterior de mala calidad puede inutilizarlo. Bloquea la relación de aspecto.',
      ],
    },
    {
      heading: 'Zona muda, contraste y tamaño final',
      paragraphs: [
        'Los espacios claros a izquierda y derecha se llaman zonas mudas o quiet zones. Permiten al lector distinguir dónde empieza y termina el símbolo. No recortes esos márgenes ni añadas un marco pegado a las barras. Utiliza barras oscuras sobre fondo blanco o muy claro, sin texturas, degradados o transparencias. La línea de números visible ayuda a la comprobación humana, pero no reemplaza el escaneo.',
        'El tamaño adecuado depende de la simbología y del estándar que aplique el receptor. Papel térmico, tinta extendida, plástico brillante, curvatura, baja resolución y reflejos cambian el resultado. Imprime con el tamaño definitivo sobre el material real y prueba desde varios ángulos con el lector que se usará en caja, almacén o recepción. Un móvil que logra leer una pantalla no certifica una tirada.',
      ],
    },
    {
      heading: 'Prueba operativa antes de imprimir en cantidad',
      paragraphs: [
        'Compara primero el texto legible bajo las barras con el dato maestro. Escanea la imagen en pantalla y confirma que el sistema recibe exactamente la misma cadena, incluidos ceros iniciales. Después crea una prueba física, colócala en la superficie prevista y repite con el dispositivo real. El pitido del lector no basta: verifica que la aplicación encuentre el producto esperado.',
        'Para una serie, toma muestras del inicio, centro y final de la impresión. Los cabezales térmicos sucios y el desgaste pueden introducir líneas blancas o barras engrosadas. En comercio regulado o cadenas con especificación técnica, utiliza el servicio de verificación solicitado por el receptor. Este generador está pensado para preparación y pruebas; no emite un informe de calidad ISO/IEC.',
      ],
    },
    {
      heading: 'Privacidad y límites del contenido codificado',
      paragraphs: [
        'JsBarcode recibe el valor dentro del navegador y dibuja el SVG o el canvas localmente. FunnyTools no necesita una petición de servidor para crear la imagen y no mantiene una biblioteca de códigos. Esto reduce la exposición durante la generación, pero la descarga queda en el dispositivo y puede entrar en copias de seguridad, correo o herramientas de diseño.',
        'Un código de barras no cifra ni oculta el dato. Cualquier persona con un lector compatible puede recuperarlo. Para etiquetas públicas, usa un identificador que remita a una base protegida y aplica permisos en esa base. Si necesitas codificar una URL o un texto más largo para teléfonos, un código QR suele ser más adecuado, aunque tampoco proporciona confidencialidad por sí mismo.',
      ],
    },
  ],
  instructions: [
    'Confirma en el sistema receptor si necesitas Code 128, EAN-13, UPC-A o Code 39.',
    'Introduce el identificador desde su fuente maestra y revisa el texto visible bajo la vista previa.',
    'Resuelve cualquier error de longitud, carácter o dígito de control sin inventar un número sustituto.',
    'Descarga PNG o SVG, conserva proporciones, contraste y zonas mudas.',
    'Imprime al tamaño final, comprueba la lectura y confirma la búsqueda correcta en el sistema real.',
  ],
  examples: [
    'Crear un Code 128 para una referencia interna de almacén.',
    'Calcular la cifra final de un borrador EAN-13 a partir de doce dígitos autorizados.',
    'Validar el dígito de control de un UPC-A antes de preparar una maqueta.',
    'Generar un activo en Code 39 para comparar compatibilidad con un lector antiguo.',
  ],
  audience: [
    'Equipos de almacén y administración que trabajan con referencias internas.',
    'Diseño de packaging que necesita una imagen de prueba en PNG o SVG.',
    'Desarrollo y QA que preparan datos de lectores y flujos de inventario.',
    'Pequeños comercios que quieren entender la diferencia entre imagen, GTIN y registro.',
  ],
  caseStudies: [
    {
      title: 'Etiqueta interna de almacén',
      description: 'El equipo usa la referencia existente `ALM-2026-041` en Code 128, descarga SVG y la coloca en una plantilla. Después comprueba que el lector abre el mismo artículo en el sistema de inventario.',
    },
    {
      title: 'Error en un EAN-13 completo',
      description: 'La vista previa se bloquea porque la cifra final no coincide. En vez de reemplazarla sin contexto, packaging consulta la ficha maestra y descubre que también se había copiado mal uno de los doce dígitos.',
    },
    {
      title: 'Prueba sobre etiqueta térmica',
      description: 'Una imagen funciona en pantalla pero falla impresa a tamaño reducido. Operaciones recupera la proporción, deja más zona muda y limpia el cabezal antes de validar nuevas muestras.',
    },
  ],
  notes: [
    'Un dígito de control correcto no demuestra asignación, propiedad ni aceptación de un GTIN.',
    'El generador no registra números GS1 ni consulta catálogos de productos.',
    'Code 39 puede requerir Mod 43 u otras reglas internas que esta interfaz no añade.',
    'No recortes zonas mudas, no deformes la imagen y no confíes solo en una lectura desde pantalla.',
    'El código revela su contenido a cualquier lector; evita datos sensibles.',
  ],
  faq: [
    {
      q: '¿Puedo crear un EAN-13 escribiendo doce dígitos?',
      a: 'Sí. La herramienta calcula el decimotercero. Debes partir de un número asignado correctamente; la operación no registra ni autoriza el GTIN.',
    },
    {
      q: '¿Qué ocurre si escribo un EAN-13 o UPC-A completo?',
      a: 'Se recalcula el dígito de control. Si no coincide, la descarga se desactiva y el mensaje indica cuál sería la cifra esperada.',
    },
    {
      q: '¿Code 128 sirve para productos de supermercado?',
      a: 'Puede servir en operaciones internas, pero el comercio minorista suele exigir EAN-13, UPC-A u otra especificación. Sigue la norma del receptor.',
    },
    {
      q: '¿PNG o SVG para imprimir?',
      a: 'SVG suele ser mejor para maquetación escalable. PNG funciona en documentos si se usa con suficiente resolución y sin ampliarlo de forma excesiva.',
    },
    {
      q: '¿Por qué el código no se lee después de imprimir?',
      a: 'Revisa tamaño, proporción, zonas mudas, contraste, resolución, tinta, material, curvatura y compatibilidad del lector.',
    },
    {
      q: '¿El identificador se sube a FunnyTools?',
      a: 'No. La imagen se genera en el navegador. El archivo descargado y la etiqueta impresa siguen siendo responsabilidad de quien los conserva o comparte.',
    },
  ],
  labels: {
    localNote: 'El código se genera localmente en este navegador; el valor no se sube a FunnyTools.',
    inputLabel: 'Texto o número',
    placeholder: 'Ejemplo: ARTICULO-2026-001',
    formatLabel: 'Formato de código de barras',
    hintCode128: 'Code 128 admite letras, números y símbolos para pedidos, inventario y etiquetas internas.',
    hintEan13: 'Introduce 12 dígitos de datos o un EAN-13 completo con su dígito de control.',
    hintUpc: 'Introduce 11 dígitos de datos o un UPC-A completo con su dígito de control.',
    hintCode39: 'Code 39 admite mayúsculas, números, espacios y . $ / + % -.',
    downloadPng: 'Descargar PNG',
    downloadSvg: 'Descargar SVG',
    reset: 'Restablecer',
    previewAlt: 'Vista previa del código de barras',
    emptyError: 'Introduce un valor para generar el código de barras.',
    eanLengthError: 'EAN-13 necesita 12 dígitos de datos o un número completo de 13.',
    upcLengthError: 'UPC-A necesita 11 dígitos de datos o un número completo de 12.',
    checksumError: 'El dígito de control no es correcto. La última cifra esperada es {digit}.',
    code39Error: 'Code 39 solo admite letras, números, espacios y . $ / + % -.',
    renderError: 'No se ha podido crear el código. Acorta el valor o prueba otro formato.',
  },
  privacyNote: 'JsBarcode dibuja el código en esta pestaña. FunnyTools no recibe el texto, el número ni la imagen; protege la descarga porque cualquiera puede escanear su contenido.',
  disclaimer: 'Verifica asignación, formato, dimensiones, zonas mudas y lectura con la organización receptora. La página no emite GTIN, no certifica impresión y no garantiza aceptación comercial.',
};

export const spanishBarcodeGeneratorReview = {
  heading: 'Cómo comprobar un código de barras',
  intro: 'Una vista previa correcta solo demuestra que el navegador pudo dibujar el símbolo; la revisión debe llegar hasta el dato y el soporte final.',
  panels: [
    { title: 'Identificador', text: 'Compara todas las cifras con la fuente y separa validación matemática de asignación comercial.' },
    { title: 'Imagen', text: 'Mantén proporción, barras oscuras, fondo claro y zonas mudas sin recortes.' },
    { title: 'Operación', text: 'Escanea la muestra impresa con el equipo real y confirma que abre el registro correcto.' },
  ],
  checklistHeading: 'Lista de comprobación',
  checklist: [
    'La simbología coincide con el requisito del comercio, almacén o sistema.',
    'El texto legible y el resultado del escáner reproducen el identificador original.',
    'EAN-13 o UPC-A tiene un dígito de control válido y una asignación documentada.',
    'La prueba final usa tamaño, material, impresora y lector de producción.',
  ],
};

export const spanishColorGenerator: ToolContent = {
  name: 'Generador de colores HEX, RGB y HSL',
  short: 'Obtén un color aleatorio, sus valores HEX, RGB y HSL, una paleta de cinco muestras y el contraste con negro y blanco.',
  long: 'Cada pulsación crea tres canales sRGB entre 0 y 255, muestra el mismo color como HEX, RGB y HSL y calcula su luminancia relativa para comparar texto negro y blanco. También puedes generar cinco muestras independientes como punto de partida visual. La paleta es aleatoria, no una armonía cromática; el contraste se expresa como relación WCAG y necesita interpretarse según tamaño de texto, peso y contexto.',
  seoTitle: 'Generador de colores aleatorios HEX, RGB y HSL',
  seoDescription: 'Genera colores HEX, RGB y HSL, crea una paleta aleatoria y compara el contraste WCAG con texto negro y blanco.',
  keywords: [
    'generador de colores',
    'generador de colores aleatorios',
    'color HEX aleatorio',
    'convertir RGB a HSL',
    'paleta de colores online',
    'contraste WCAG 4.5:1',
    'código de color CSS',
  ],
  capabilities: [
    'Crear un color sRGB aleatorio y mostrarlo a la vez como HEX, RGB y HSL.',
    'Copiar cualquiera de los tres formatos o pulsar una muestra de la paleta para copiar su HEX.',
    'Generar cinco colores independientes para explorar direcciones visuales.',
    'Calcular luminancia relativa y contraste frente a negro y blanco con dos decimales.',
    'Elegir automáticamente el texto negro o blanco de mayor contraste en cada muestra.',
  ],
  contentSections: [
    {
      heading: 'Respuesta rápida: cómo usar un color aleatorio',
      paragraphs: [
        'Pulsa «Generar color» para obtener una muestra y copia HEX, RGB o HSL según el programa de destino. La página presenta el contraste con negro y blanco; para texto normal, busca al menos 4.5:1, y para texto grande, 3:1. Si el diseño exige el nivel AAA, el umbral de texto normal es 7:1. Confirma el tamaño y el peso tipográfico antes de decidir.',
        'Una muestra al azar sirve para explorar, probar estados de una interfaz o desbloquear un boceto. No debería convertirse directamente en color de marca. Revisa cómo convive con el fondo, enlaces, botones, estados de foco, gráficos y mensajes de error. Después documenta un conjunto reducido de tokens con usos concretos; una buena paleta de producto necesita jerarquía y pruebas, no una colección de valores interesantes.',
      ],
    },
    {
      heading: 'Qué representan HEX, RGB y HSL',
      paragraphs: [
        'HEX escribe los canales rojo, verde y azul con dos dígitos hexadecimales cada uno. `#FF0000` equivale a rojo 255, verde 0 y azul 0. RGB expresa esas cantidades en base decimal: `rgb(255, 0, 0)`. Ambos describen el mismo color opaco dentro del espacio sRGB utilizado habitualmente por CSS y pantallas.',
        'HSL separa tono en grados, saturación y luminosidad en porcentajes. Puede resultar cómodo para crear variaciones, aunque no es perceptualmente uniforme: aumentar diez puntos de luminosidad no produce la misma diferencia visual en todos los tonos. La conversión de esta página redondea tono, saturación y luminosidad a enteros, de modo que al reconstruir RGB podría aparecer una pequeña diferencia por redondeo.',
      ],
    },
    {
      heading: 'Cómo se crea el color y qué significa aleatorio',
      paragraphs: [
        'La herramienta genera por separado tres enteros entre 0 y 255 mediante `Math.random`, los convierte a dos dígitos HEX y calcula el HSL correspondiente. Para inspiración visual no se necesita una fuente criptográfica: el resultado no protege una cuenta ni decide un sorteo con consecuencias. No utilices estos valores como token, clave, identificador secreto o prueba de imparcialidad.',
        'Las 16 777 216 combinaciones posibles de RGB no se perciben como una distribución uniforme de matices o luminosidad. El espacio contiene muchas muestras oscuras o claras que pueden parecer próximas, y una secuencia corta puede repetir familias. «Aleatorio» describe el procedimiento de canales, no una selección equilibrada de colores agradables, accesibles, imprimibles o distintos entre sí.',
      ],
    },
    {
      heading: 'Contraste con negro y blanco',
      paragraphs: [
        'El cálculo transforma cada canal sRGB a un valor lineal, obtiene la luminancia relativa con los coeficientes definidos por WCAG y aplica `(L1 + 0.05) / (L2 + 0.05)`, colocando la luminancia mayor en L1. El resultado va de 1:1, sin diferencia, a 21:1 para negro puro frente a blanco puro. Se muestran dos relaciones para comparar texto negro y blanco sobre la muestra.',
        'La indicación «mejor texto» elige el mayor de los dos valores, pero no afirma automáticamente que sea suficiente para el uso previsto. Una relación de 3.8:1 podría aprobar texto grande y fallar texto normal. El tamaño visual, el peso, el antialiasing, la imagen de fondo y los estados interactivos importan. Mide la combinación exacta que llegará a producción.',
      ],
      link: {
        prefix: 'Los umbrales y la fórmula proceden de ',
        label: 'WCAG 2.2 del W3C',
        href: 'https://www.w3.org/TR/WCAG22/',
        suffix: '; consulta el criterio aplicable al nivel de conformidad de tu proyecto.',
      },
    },
    {
      heading: 'Umbrales WCAG 4.5:1, 3:1 y 7:1',
      paragraphs: [
        'En WCAG 2.2, el criterio 1.4.3 de nivel AA exige 4.5:1 para texto normal y 3:1 para texto grande. La definición de texto grande depende del tamaño y del peso, no de que una frase parezca un título. El criterio 1.4.6 de nivel AAA eleva el texto normal a 7:1 y el grande a 4.5:1. Logotipos y texto puramente decorativo tienen un tratamiento distinto.',
        'Los componentes no textuales, como límites de controles y estados necesarios para reconocer una interfaz, pueden estar sujetos a 3:1 respecto de colores adyacentes. Esta página solo compara la muestra con negro y blanco; no inspecciona iconos, bordes, foco ni otros fondos. Si eliges otro color de texto, calcula esa pareja en una herramienta de contraste dedicada antes de aprobarla.',
      ],
    },
    {
      heading: 'Una paleta aleatoria no es una armonía',
      paragraphs: [
        'El botón de paleta crea cinco colores independientes. No busca complementarios, análogos, tríadas ni escalas de luminosidad; tampoco evita dos tonos casi iguales. Úsala para descubrir una dirección, luego conserva una o dos muestras y construye variaciones con una intención: fondo, superficie, texto, acento, éxito, advertencia y error.',
        'En una interfaz, cada función necesita estados normal, hover, activo, foco y deshabilitado. Comprueba contraste en todos ellos y evita que el único cambio sea cromático. En gráficos, añade etiquetas, patrones, iconos o diferencias de forma para que una persona con visión cromática reducida pueda interpretar categorías. El color puede reforzar significado, pero no debería ser la única señal.',
      ],
      link: {
        prefix: 'La guía del W3C sobre ',
        label: 'no utilizar el color como único medio',
        href: 'https://www.w3.org/WAI/WCAG22/Understanding/use-of-color',
        suffix: ' explica por qué hacen falta señales adicionales.',
      },
    },
    {
      heading: 'De la muestra a un sistema de diseño',
      paragraphs: [
        'Guarda el valor elegido con un nombre semántico, por ejemplo `--color-acento`, en lugar de multiplicar códigos sueltos. Crea escalas claras y oscuras de forma controlada y registra dónde puede utilizarse cada tono. Prueba el conjunto en páginas reales con texto largo, formularios, tablas, modo oscuro, zoom y preferencias de alto contraste.',
        'Incluye personas y contenidos representativos en la revisión. Una combinación que funciona con una palabra puede fallar cuando el botón crece o el texto se traduce. Los colores de éxito y error deben conservar claridad sin depender únicamente de verde y rojo. Añade mensajes, iconos y estados de foco visibles. La accesibilidad es una propiedad del componente completo.',
      ],
    },
    {
      heading: 'Pantalla, CSS e impresión',
      paragraphs: [
        'Los valores generados pertenecen al modelo sRGB habitual en la web. Dos pantallas pueden mostrarlos de forma diferente por calibración, brillo, modo nocturno, perfil de color y entorno. CSS también puede usar espacios más amplios como Display-P3, que esta herramienta no genera. Si el proyecto tiene gestión de color avanzada, convierte y documenta los valores dentro de ese flujo.',
        'HEX de pantalla no equivale directamente a una tinta CMYK o Pantone. Papel, acabado, absorción y proceso de impresión alteran el resultado. Para una pieza física, pide una prueba al proveedor y trabaja con el perfil requerido. No selecciones un color corporativo definitivo mirando solo un teléfono; conserva muestras aprobadas y especificaciones separadas para web e impresión.',
      ],
    },
    {
      heading: 'Privacidad, copia y límites',
      paragraphs: [
        'La generación y las conversiones se ejecutan en el navegador; no hay una imagen ni un archivo que enviar. Al copiar, el código pasa al portapapeles y puede ser leído por funciones del sistema. Los colores no suelen ser información sensible, pero un proyecto confidencial puede requerir igualmente seguir las normas del equipo y evitar pegar tokens internos en servicios no autorizados.',
        'FunnyTools no guarda favoritos ni crea un enlace permanente a la paleta. Copia los valores que quieras conservar y registra el contexto. El resultado no evalúa daltonismo, legibilidad sobre fotografías, preferencias de usuario, brillo físico, impresión ni consistencia de marca. Utiliza la página para explorar y comprobar negro o blanco, después completa la revisión en el producto real.',
      ],
    },
  ],
  instructions: [
    'Pulsa «Generar color» o enfoca el área y usa la barra espaciadora fuera de controles de formulario.',
    'Copia HEX, RGB o HSL y confirma que el programa de destino interpreta el mismo espacio sRGB.',
    'Compara los ratios con negro y blanco según el tamaño y nivel WCAG del texto.',
    'Genera cinco muestras si necesitas explorar, pero selecciona y organiza después una paleta intencional.',
    'Prueba el color en componentes reales, estados interactivos, distintos contenidos y pantallas.',
  ],
  examples: [
    'Buscar un acento inicial para un prototipo y comprobar texto negro y blanco.',
    'Copiar un HEX para una propiedad CSS y documentar su equivalente RGB.',
    'Generar muestras para una presentación y descartar las que no alcanzan el contraste necesario.',
    'Comparar cómo cambia un tono entre pantalla y una prueba física de impresión.',
  ],
  audience: [
    'Diseño y desarrollo que necesitan un color de prueba para CSS o componentes.',
    'Personas que preparan presentaciones, gráficos o materiales sociales.',
    'Equipos que quieren explicar HEX, RGB, HSL y contraste con un ejemplo inmediato.',
    'Estudiantes que investigan conversión de color y luminancia relativa.',
  ],
  caseStudies: [
    {
      title: 'Botón con texto legible',
      description: 'Un prototipo obtiene un azul aleatorio. El equipo compara ambos ratios, elige texto blanco porque supera el umbral del botón y vuelve a medir los estados hover y foco en el componente terminado.',
    },
    {
      title: 'Gráfico con señales redundantes',
      description: 'Una paleta de cinco colores contiene dos tonos parecidos. Se sustituyen, se añaden etiquetas directas y cada serie usa también un marcador distinto para no depender solo del color.',
    },
    {
      title: 'Diferencia entre pantalla e impresión',
      description: 'Una muestra atractiva en el monitor se apaga sobre papel mate. El diseño conserva el token sRGB para web y aprueba por separado una especificación de impresión con prueba física.',
    },
  ],
  notes: [
    'La paleta contiene colores independientes al azar; no aplica teoría de armonía ni escalas perceptuales.',
    'HSL se redondea a enteros, por lo que una conversión inversa puede variar ligeramente.',
    '4.5:1 corresponde a texto normal de nivel AA; el contexto decide qué umbral utilizar.',
    'Elegir el texto de mayor contraste entre negro y blanco no garantiza que todo el componente sea accesible.',
    'Math.random es suficiente para inspiración visual, pero no para seguridad, sorteos auditables o identificadores secretos.',
  ],
  faq: [
    {
      q: '¿HEX, RGB y HSL muestran colores distintos?',
      a: 'Representan la misma muestra sRGB. HSL se redondea a grados y porcentajes enteros, por lo que una conversión inversa puede introducir una pequeña diferencia.',
    },
    {
      q: '¿Qué contraste necesita un texto normal?',
      a: 'WCAG 2.2 pide al menos 4.5:1 para nivel AA y 7:1 para AAA. El texto grande tiene umbrales distintos y debe cumplir la definición de tamaño y peso.',
    },
    {
      q: '¿El texto recomendado siempre cumple WCAG?',
      a: 'No. «Mejor texto» solo indica si negro o blanco obtiene el ratio mayor. Compara el número con el criterio aplicable al elemento.',
    },
    {
      q: '¿Los cinco colores forman una paleta armónica?',
      a: 'No. Son muestras independientes para inspiración. Revisa relaciones, jerarquía, contraste y uso semántico antes de adoptarlas.',
    },
    {
      q: '¿Puedo usar el color en impresión?',
      a: 'Como referencia inicial, sí, pero HEX y RGB describen pantalla. Solicita conversión, perfil y prueba física para el proceso de impresión.',
    },
    {
      q: '¿Se guardan los colores?',
      a: 'No. Copia los valores elegidos y documenta su función. La página no mantiene una cuenta ni una biblioteca.',
    },
  ],
  labels: {
    generate: 'Generar color',
    palette: 'Generar paleta de 5',
    currentColor: 'Color actual',
    hex: 'HEX',
    rgb: 'RGB',
    hsl: 'HSL',
    copy: 'Copiar',
    paletteTitle: 'Paleta aleatoria',
    spaceHint: 'Consejo: pulsa Espacio dentro del área de la herramienta para crear otro color.',
    contrastLabel: 'Contraste con el fondo',
    black: 'Negro',
    white: 'Blanco',
    bestText: 'mejor texto',
    copied: 'Color copiado',
  },
  privacyNote: 'El color, las conversiones y la paleta se generan en esta pestaña. FunnyTools no recibe ni guarda los valores.',
  disclaimer: 'Comprueba la combinación exacta en el componente y el soporte finales. Una muestra aleatoria y dos ratios de contraste no sustituyen una revisión completa de accesibilidad, marca o impresión.',
};

export const spanishColorGeneratorReview = {
  heading: 'Cómo comprobar un color antes de publicarlo',
  intro: 'Un valor correcto de HEX no basta: el criterio depende del fondo, el texto, el estado y el medio donde aparecerá.',
  panels: [
    { title: 'Equivalencia', text: 'Confirma que HEX, RGB y HSL representan la misma muestra y considera el redondeo de HSL.' },
    { title: 'Contraste', text: 'Aplica 4.5:1, 3:1 o 7:1 según texto, tamaño y nivel de conformidad.' },
    { title: 'Contexto', text: 'Prueba estados, daltonismo, señales adicionales, pantallas e impresión cuando corresponda.' },
  ],
  checklistHeading: 'Lista de comprobación',
  checklist: [
    'La combinación real de primer plano y fondo supera el umbral aplicable.',
    'Foco, hover, activo, error y deshabilitado siguen siendo distinguibles.',
    'El significado también aparece mediante texto, icono, forma o patrón.',
    'El token tiene un nombre y un uso documentados dentro del sistema de diseño.',
  ],
};
