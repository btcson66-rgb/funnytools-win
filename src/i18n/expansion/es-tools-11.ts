import type { ToolContent } from '../tools/_types';

export const spanishCaseConverter: ToolContent = {
  name: 'Convertir mayúsculas y minúsculas online',
  short: 'Cambia texto español a mayúsculas, minúsculas, tipo oración o formatos de identificador sin perder tildes ni ñ.',
  long: 'Pega texto y elige entre MAYÚSCULAS, minúsculas, inicial de cada palabra, tipo oración, camelCase, snake_case, kebab-case y CONSTANT_CASE. En esta versión española, las conversiones reconocen letras Unicode y aplican reglas de mayúsculas y minúsculas con configuración regional `es`, por lo que conservan tildes, diéresis y ñ. Los modos son transformaciones mecánicas: no corrigen nombres propios, siglas, abreviaturas ni ortografía.',
  seoTitle: 'Convertir mayúsculas y minúsculas online',
  seoDescription: 'Convierte texto español a mayúsculas, minúsculas, tipo oración, camelCase, snake_case o kebab-case. Respeta tildes y ñ y funciona localmente.',
  keywords: [
    'convertir mayúsculas a minúsculas',
    'convertir minúsculas a mayúsculas',
    'conversor mayúsculas minúsculas online',
    'cambiar texto a mayúsculas',
    'texto tipo oración',
    'convertir a camelCase',
    'convertir a snake_case',
  ],
  capabilities: [
    'Convertir todas las letras españolas a mayúsculas o minúsculas.',
    'Poner una mayúscula mecánica al inicio de cada palabra.',
    'Crear texto tipo oración después de punto, interrogación o exclamación.',
    'Generar camelCase, snake_case, kebab-case y CONSTANT_CASE.',
    'Copiar el resultado sin sustituir ni borrar el texto de entrada.',
  ],
  contentSections: [
    {
      heading: 'Respuesta rápida: cómo cambiar mayúsculas y minúsculas',
      paragraphs: [
        'Escribe o pega el texto en el primer cuadro y pulsa el formato que necesitas. El resultado aparece separado debajo para que puedas compararlo con el original antes de copiarlo. «MAYÚSCULAS» transforma `acción y pingüino` en `ACCIÓN Y PINGÜINO`; «minúsculas» hace la operación inversa. La versión española usa conversión regional y no elimina la tilde, la diéresis ni la virgulilla de la ñ.',
        'Si el texto se publicará, revisa el resultado palabra por palabra. Un cambio de caja no sabe si `Lima` es una ciudad, si `ONU` debe seguir como sigla o si una marca emplea una grafía especial. Los botones sirven para ahorrar una operación repetitiva, no para decidir qué palabras requieren mayúscula según el contexto. Conserva el original hasta validar la copia final.',
      ],
    },
    {
      heading: 'Mayúsculas españolas: tildes, ñ y dígrafos',
      paragraphs: [
        'Las mayúsculas también llevan tilde y diéresis cuando les corresponde: `ÁFRICA`, `ÚLTIMO` y `PINGÜINO` no pierden sus signos por estar en caja alta. La RAE incluye la Ñ en el alfabeto mayúsculo y explica que, al escribir un dígrafo al inicio de una palabra, solo se convierte su primer componente: `China`, `Guinea`, `Llobregat` y `Quito`. Una conversión de todo el texto a caja alta, en cambio, produce `CHINA`, `GUINEA`, `LLOBREGAT` y `QUITO`.',
        'Este conversor opera sobre los caracteres presentes. No añade tildes que falten ni corrige una palabra escrita como `camion`; solo puede producir `CAMION`. Tampoco normaliza variantes Unicode visualmente idénticas, cambia comillas o revisa signos de apertura. Si el origen contiene OCR defectuoso, caracteres invisibles o letras de otro alfabeto que se parecen a las latinas, resuelve esos problemas antes de tratar el resultado como texto corregido.',
      ],
      items: [
        'La caja alta no autoriza a quitar tildes ni diéresis.',
        'La ñ se transforma entre ñ y Ñ sin convertirse en n.',
        'Los números, espacios y signos permanecen en los modos de caja.',
        'La herramienta cambia caracteres; no aplica un corrector ortográfico.',
      ],
    },
    {
      heading: 'Qué hace «Inicial de cada palabra»',
      paragraphs: [
        'Este botón convierte todo a minúsculas y después pone en mayúscula la primera letra de cada secuencia de letras. Es una regla mecánica útil para etiquetas, nombres de campos o listas que llegan enteramente en caja alta. No equivale a la ortografía de los títulos en español. En un título normal se suele escribir con mayúscula inicial la primera palabra y los nombres propios, no cada artículo, preposición y sustantivo como en ciertos estilos ingleses.',
        'Por ejemplo, `GUÍA PARA VIAJAR POR EL NORTE` se convierte mecánicamente en `Guía Para Viajar Por El Norte`. Si se trata del título editorial, probablemente necesitarás revisar y dejar `Guía para viajar por el norte`. También debes corregir apellidos con partículas, nombres compuestos, marcas, siglas y palabras como `iPhone` o `eBay`. El botón no dispone de un diccionario capaz de reconocer esas excepciones.',
      ],
    },
    {
      heading: 'Qué hace «Tipo oración» y dónde puede fallar',
      paragraphs: [
        '«Tipo oración» pasa primero el texto a minúsculas y pone en mayúscula la primera letra disponible al comienzo y después de `.`, `?` o `!`. Los signos españoles de apertura `¿` y `¡`, las comillas y los paréntesis pueden quedar antes de esa primera letra sin impedir la conversión. El comportamiento ayuda a reparar párrafos escritos en caja alta, pero no reconstruye la ortografía original.',
        'La RAE señala que la primera palabra de un escrito y la que sigue a un punto llevan mayúscula, incluso si aparecen antes signos de apertura. Sin embargo, la puntuación real admite más matices. Una abreviatura como `Sr.` puede provocar una nueva mayúscula mecánica; un decimal como `3.14` contiene un punto que no termina una oración; tras dos puntos la mayúscula depende del uso. Revisa además nombres propios, siglas y el texto que sigue a interrogaciones o exclamaciones parciales.',
      ],
    },
    {
      heading: 'camelCase, snake_case, kebab-case y CONSTANT_CASE',
      paragraphs: [
        'Los cuatro formatos de identificador separan el texto en secuencias de letras o números, descartan la puntuación que funciona como separador y vuelven a unir las partes. `área técnica 2026` produce `áreaTécnica2026`, `área_técnica_2026`, `área-técnica-2026` o `ÁREA_TÉCNICA_2026`. camelCase deja el primer elemento en minúscula y capitaliza los siguientes; los otros usan guion bajo, guion medio o caja alta.',
        'Las tildes y la ñ se conservan deliberadamente. JavaScript y muchos sistemas modernos permiten identificadores Unicode, pero una URL, variable, nombre de archivo, API o convención interna puede exigir solo ASCII. Esta herramienta no translitera `á` a `a`, no evita palabras reservadas, no garantiza un identificador único y no conserva cada signo: `precio + IVA` y `precio / IVA` pueden terminar en el mismo resultado. Valida el formato en el sistema de destino.',
      ],
      items: [
        'camelCase: `informeAnual2026`.',
        'snake_case: `informe_anual_2026`.',
        'kebab-case: `informe-anual-2026`.',
        'CONSTANT_CASE: `INFORME_ANUAL_2026`.',
      ],
    },
    {
      heading: 'Privacidad, texto original y control de calidad',
      paragraphs: [
        'La conversión se ejecuta en la memoria de esta pestaña. FunnyTools no recibe el contenido para cambiar su caja y no guarda un historial del texto. La página puede utilizar servicios generales de analítica o publicidad conforme a su política, pero el valor pegado en el cuadro no se incorpora a esos eventos. Evita usar datos personales innecesarios y trabaja con una copia cuando el documento sea confidencial.',
        'El cuadro de salida es independiente y de solo lectura. Esto reduce el riesgo de sobrescribir el original, aunque cerrar o recargar la página puede borrar ambos cuadros. Antes de sustituir contenido en un CMS, hoja de cálculo o código, compara siglas, nombres, tildes, signos, saltos y términos de marca. Si necesitas reglas lingüísticas completas o una conversión reversible, conserva el archivo fuente y utiliza una revisión editorial.',
      ],
    },
  ],
  instructions: [
    'Pega una copia del texto y conserva el original en su documento o editor.',
    'Elige caja alta, caja baja, iniciales, tipo oración o un formato de identificador.',
    'Compara el resultado y revisa nombres propios, siglas, marcas, tildes y abreviaturas.',
    'Si generas un identificador, confirma que el sistema acepta Unicode y ese separador.',
    'Copia el resultado solo después de validarlo en el contexto donde se utilizará.',
  ],
  examples: [
    'Recuperar un párrafo que llegó enteramente en mayúsculas.',
    'Pasar una columna de etiquetas a minúsculas sin perder ñ ni tildes.',
    'Preparar `nombre_del_campo` para un esquema que admite Unicode.',
    'Comparar una versión tipo oración con un título revisado editorialmente.',
    'Crear una constante legible a partir de varias palabras y números.',
  ],
  audience: [
    'Redactores y editores que reciben texto con caja inconsistente.',
    'Estudiantes y docentes que quieren comparar formatos sin alterar el original.',
    'Equipos de contenido que limpian etiquetas, títulos o campos importados.',
    'Desarrolladores que preparan identificadores y después los validan en su plataforma.',
  ],
  caseStudies: [
    {
      title: 'Listado de nombres en caja alta',
      description: 'Una hoja contiene nombres enteramente en mayúsculas. Se prueba «Inicial de cada palabra», pero después se revisan partículas, apellidos compuestos y grafías de marca; la transformación mecánica no se toma como registro maestro.',
    },
    {
      title: 'Texto español con tildes',
      description: 'La frase `EL NIÑO OYÓ LA CANCIÓN` pasa a minúsculas como `el niño oyó la canción`. La ñ y las vocales acentuadas se mantienen, aunque la herramienta no podría recuperar una tilde que no estuviera en la entrada.',
    },
    {
      title: 'Nombre para una clave técnica',
      description: '`Área de atención 24 horas` produce `áreaDeAtención24Horas`. Antes de usarlo en una API, el equipo comprueba si la especificación permite caracteres Unicode o exige una clave ASCII acordada.',
    },
  ],
  notes: [
    'Los modos de iniciales y tipo oración son reglas mecánicas, no corrección ortográfica.',
    'Tipo oración pone en minúsculas nombres propios y siglas que después deben restaurarse.',
    'Las abreviaturas y decimales con punto pueden parecer finales de oración.',
    'Los formatos de identificador descartan signos separadores y conservan letras acentuadas.',
    'El texto CJK se mantiene sin cambios de caja y se conserva como secuencias al crear identificadores.',
  ],
  faq: [
    {
      q: '¿Las mayúsculas conservan las tildes y la ñ?',
      a: 'Sí. La versión española usa conversión Unicode con configuración regional `es`: `acción` pasa a `ACCIÓN` y `niño` a `NIÑO`.',
    },
    {
      q: '¿«Inicial de cada palabra» crea un título correcto en español?',
      a: 'No necesariamente. Capitaliza mecánicamente todas las palabras; los títulos españoles suelen requerir una revisión distinta.',
    },
    {
      q: '¿Tipo oración restaura nombres propios y siglas?',
      a: 'No. Primero baja todo el texto y solo capitaliza inicios detectados. Debes recuperar `Madrid`, `ONU` y otras grafías especiales.',
    },
    {
      q: '¿camelCase elimina las tildes?',
      a: 'No. Conserva tildes, diéresis y ñ. Comprueba si tu lenguaje, URL, API o base de datos acepta identificadores Unicode.',
    },
    {
      q: '¿Puedo deshacer una conversión?',
      a: 'Puedes pulsar otro modo sobre la entrada, pero una conversión puede perder información de caja. Conserva siempre el original.',
    },
    {
      q: '¿FunnyTools guarda el texto?',
      a: 'No. El cambio se calcula en el navegador y el sitio no almacena el contenido pegado ni un historial.',
    },
  ],
  labels: {
    locale: 'es',
    input: 'Texto original',
    output: 'Resultado convertido',
    placeholder: 'Pega texto español con tildes, ñ, signos o números…',
    uppercase: 'MAYÚSCULAS',
    lowercase: 'minúsculas',
    titleCase: 'Inicial de cada palabra',
    sentenceCase: 'Tipo oración',
    camelCase: 'camelCase',
    snakeCase: 'snake_case',
    kebabCase: 'kebab-case',
    constantCase: 'CONSTANT_CASE',
    copy: 'Copiar resultado',
    clear: 'Borrar',
    copied: 'Resultado copiado',
  },
  privacyNote: 'El texto se transforma localmente en esta pestaña. FunnyTools no lo recibe ni lo guarda para cambiar mayúsculas o minúsculas.',
  disclaimer: 'La herramienta cambia la caja mediante reglas mecánicas. Revisa nombres propios, siglas, abreviaturas, títulos y requisitos técnicos antes de usar el resultado.',
};

export const spanishCaseConverterReview = {
  heading: 'Cómo revisar una conversión de mayúsculas',
  intro: 'La conversión es correcta solo si conserva los caracteres y la caja final responde al contexto lingüístico o técnico.',
  panels: [
    {
      title: 'Protege el original',
      text: 'Trabaja sobre una copia: pasar todo a minúsculas puede borrar información que un segundo botón no puede reconstruir.',
    },
    {
      title: 'Revisa excepciones',
      text: 'Comprueba nombres, siglas, marcas, abreviaturas, títulos, tildes y signos de apertura.',
    },
    {
      title: 'Valida el destino',
      text: 'Para identificadores, confirma Unicode, separadores, palabras reservadas y longitud en la plataforma real.',
    },
  ],
  checklistHeading: 'Lista de comprobación',
  checklist: [
    'Las tildes, la diéresis y la ñ siguen presentes.',
    'Los nombres propios y las siglas tienen la grafía esperada.',
    'El modo mecánico elegido coincide con el uso final.',
    'El identificador cumple la convención del sistema de destino.',
  ],
};

export const spanishRemoveEmptyLines: ToolContent = {
  name: 'Eliminar líneas vacías online',
  short: 'Quita todas las líneas en blanco o reduce varios saltos vacíos a uno, con opción para recortar cada línea.',
  long: 'Pega texto para eliminar líneas vacías o agrupar varias líneas en blanco consecutivas en una sola. Una línea se considera vacía cuando no contiene nada o solo contiene espacios en blanco, como espacios o tabulaciones. La opción de recorte también quita espacios al principio y al final de cada línea. El resultado se genera como texto plano con saltos LF y permanece en el navegador.',
  seoTitle: 'Eliminar líneas vacías y saltos en blanco online',
  seoDescription: 'Elimina líneas vacías de un texto o reduce varios saltos en blanco a uno. Detecta espacios y tabulaciones, muestra estadísticas y procesa localmente.',
  keywords: [
    'eliminar líneas vacías',
    'quitar líneas en blanco online',
    'eliminar saltos de línea vacíos',
    'borrar espacios entre líneas',
    'limpiar líneas vacías texto',
    'reducir líneas en blanco',
    'quitar renglones vacíos',
  ],
  capabilities: [
    'Eliminar todas las líneas que no contienen texto visible.',
    'Reducir varias líneas vacías consecutivas a una sola.',
    'Detectar como vacías las líneas formadas solo por espacios o tabulaciones.',
    'Recortar opcionalmente los espacios de ambos extremos de cada línea.',
    'Comparar líneas originales, resultantes y eliminadas antes de copiar.',
  ],
  contentSections: [
    {
      heading: 'Respuesta rápida: cómo quitar líneas vacías',
      paragraphs: [
        'Pega el bloque, elige «Eliminar todas las líneas vacías» y revisa el resultado. Si quieres conservar la separación entre párrafos, selecciona «Reducir grupos a una línea vacía»: una secuencia de dos, tres o más líneas en blanco se convierte en una sola. El contador indica cuántas líneas había, cuántas quedan y cuántas se retiraron. La salida se actualiza también al editar una opción.',
        'Una línea con espacios o tabulaciones, pero sin otro carácter, cuenta como vacía. Esto permite limpiar huecos que parecen iguales a simple vista aunque contengan caracteres de espaciado. Una línea con un guion, un punto, un espacio de ancho cero u otro símbolo no está vacía y permanece. Para evitar sorpresas, activa la visualización de caracteres invisibles en tu editor cuando el origen sea código o datos.',
      ],
    },
    {
      heading: 'Eliminar todo o conservar la separación de párrafos',
      paragraphs: [
        '«Eliminar todas» une las líneas no vacías sin dejar separadores en blanco. Es apropiado para una lista de elementos, identificadores, direcciones o valores donde cada registro ocupa una línea y los huecos no aportan significado. En prosa, ese modo puede borrar la frontera visual entre párrafos: las líneas de texto siguen separadas, pero ya no queda una línea vacía entre bloques.',
        '«Reducir grupos» mantiene como máximo una línea vacía consecutiva. Sirve para corregir documentos con espaciado irregular sin convertir todo en una lista compacta. El primer o último grupo vacío también puede quedar reducido a una línea, no eliminado por completo. Si el sistema de destino no admite líneas iniciales o finales, revisa esos extremos y recórtalos en un editor antes de entregar.',
      ],
      items: [
        'Lista o columna: normalmente conviene eliminar todas las líneas vacías.',
        'Artículo o correo: suele ser más seguro reducir cada grupo a una.',
        'Código o configuración: revisa la sintaxis y ejecuta una prueba.',
        'Datos tabulares: confirma que una línea vacía no representa un registro.',
      ],
    },
    {
      heading: 'Qué significa recortar cada línea',
      paragraphs: [
        'La casilla «Quitar espacios al inicio y al final» aplica una operación equivalente a `trim()` a cada línea antes de construir el resultado. MDN explica que `trim()` retira espacio en blanco de ambos extremos, incluidos espacios, tabulaciones y terminadores de línea reconocidos. Dentro de una línea, los espacios entre palabras no se tocan. La opción puede transformar `  código  ` en `código`.',
        'No actives el recorte por rutina en contenido donde la sangría sea significativa. Python, YAML, Markdown con bloques indentados, arte ASCII, tablas alineadas y ciertos archivos de configuración pueden cambiar de significado o formato al perder los espacios iniciales. Incluso una lista pegada desde una hoja puede usar espacios finales para representar datos. Procesa primero una muestra y compara con el origen.',
      ],
    },
    {
      heading: 'Saltos CRLF, CR y LF en el resultado',
      paragraphs: [
        'La entrada reconoce los saltos habituales de Windows (`CRLF`), sistemas antiguos (`CR`) y Unix o web (`LF`). Después de procesar, la herramienta une todas las líneas con `LF`. Eso significa que el texto visible será equivalente en muchos editores, pero la codificación exacta de los finales de línea puede no coincidir con el archivo original.',
        'Si un repositorio, compilador o aplicación exige `CRLF`, utiliza después la configuración de finales de línea de tu editor. La página no abre archivos, no conserva metadatos, BOM, codificación, permisos ni la última línea terminada. Solo procesa la cadena pegada. Para cambios en código, revisa el diff y ejecuta el formateador o las pruebas del proyecto antes de guardar.',
      ],
    },
    {
      heading: 'Copias desde PDF, hojas de cálculo y formularios',
      paragraphs: [
        'Al copiar desde un PDF, una línea visual puede ser un salto impuesto por la maquetación, mientras que un hueco entre párrafos puede no llegar como línea vacía. Eliminar huecos no reconstruye párrafos ni une palabras partidas al final de línea. En documentos escaneados, el OCR también puede introducir símbolos invisibles o renglones que contienen un carácter y por eso no se detectan como vacíos.',
        'En una hoja de cálculo, pegar una columna suele producir una línea por celda, pero las celdas vacías pueden ser datos importantes que mantienen la posición de las filas. Si las borras, los elementos posteriores se desplazan y dejan de corresponder con otras columnas. Procesa solo columnas independientes o conserva una clave de registro. En formularios y listas de correo, valida la cantidad antes y después.',
      ],
    },
    {
      heading: 'Privacidad, límites y comprobación del resultado',
      paragraphs: [
        'El texto se analiza y transforma en esta pestaña; FunnyTools no recibe el bloque para eliminar líneas. Los servicios generales de analítica o publicidad descritos en la política del sitio no incluyen el contenido del cuadro como parámetro de esos eventos. Aun así, evita pegar secretos, contraseñas, datos médicos o información personal si no es imprescindible para la tarea.',
        'La herramienta no guarda historial, no ofrece deshacer por pasos, no interpreta archivos ni busca mediante expresiones regulares. Mantén el documento original abierto y copia la salida a un archivo nuevo. Cuenta registros, revisa el principio y el final, compara párrafos y, si es código o datos, ejecuta una validación propia del formato. Un número de líneas menor no demuestra por sí solo que la limpieza sea correcta.',
      ],
    },
  ],
  instructions: [
    'Copia el texto desde la fuente y guarda esa versión sin modificar.',
    'Elige eliminar todas las líneas vacías o reducir cada grupo a una.',
    'Activa el recorte solo si los espacios iniciales y finales no tienen significado.',
    'Compara estadísticas, párrafos, registros y finales de línea con el original.',
    'Copia el resultado a un archivo nuevo y valídalo en el programa de destino.',
  ],
  examples: [
    'Compactar una lista de palabras que contiene filas vacías intercaladas.',
    'Reducir el espaciado irregular de un borrador sin unir todos los párrafos.',
    'Limpiar una columna independiente copiada desde una hoja de cálculo.',
    'Preparar texto plano para importar después de confirmar el número de registros.',
    'Examinar un fragmento de código sin activar el recorte de sangría.',
  ],
  audience: [
    'Personas que limpian listas, notas, inventarios o datos pegados.',
    'Redactores que quieren normalizar huecos entre párrafos.',
    'Equipos de soporte y operaciones que preparan bloques de texto para importar.',
    'Desarrolladores que revisan la salida y controlan después los finales de línea.',
  ],
  caseStudies: [
    {
      title: 'Lista con huecos y tabulaciones',
      description: 'Una lista de códigos contiene líneas visualmente vacías; algunas guardan tabulaciones. El modo eliminar todas las reconoce como vacías, conserva el orden de los códigos y permite cotejar el total con la fuente.',
    },
    {
      title: 'Artículo con demasiados saltos',
      description: 'El borrador tiene grupos de cuatro líneas vacías entre párrafos. Se usa reducir a una para mantener la estructura. No se activa el recorte porque algunas líneas forman un ejemplo preformateado.',
    },
    {
      title: 'Columna con celdas vacías significativas',
      description: 'Una exportación usa filas vacías para posiciones sin respuesta. Eliminar esas líneas rompería la correspondencia con el identificador de otra columna, así que se conserva el archivo y se limpia solo una lista derivada.',
    },
  ],
  notes: [
    'Una línea formada solo por espacios o tabulaciones se considera vacía.',
    'Reducir grupos puede conservar una línea vacía al inicio o al final.',
    'Recortar cada línea elimina sangría y espacios finales, pero no espacios internos.',
    'La salida normaliza los finales de línea a LF.',
    'No se abren archivos ni se conservan formato, metadatos o codificación original.',
  ],
  faq: [
    {
      q: '¿Una línea que solo contiene espacios se elimina?',
      a: 'Sí. La detección aplica recorte para decidir si hay contenido, aunque la casilla de recorte esté desactivada.',
    },
    {
      q: '¿Puedo dejar una línea vacía entre párrafos?',
      a: 'Sí. Elige «Reducir grupos a una línea vacía» y revisa también los extremos del texto.',
    },
    {
      q: '¿La opción de recorte elimina espacios entre palabras?',
      a: 'No. Quita espacio en blanco al principio y al final de cada línea; el contenido interior se mantiene.',
    },
    {
      q: '¿Se conserva CRLF de Windows?',
      a: 'No de forma exacta. La entrada reconoce CRLF, CR y LF, pero la salida se une con saltos LF.',
    },
    {
      q: '¿Es seguro usarlo con código?',
      a: 'Solo después de revisar el diff y probarlo. No recortes líneas si la sangría puede tener significado.',
    },
    {
      q: '¿El texto se envía al servidor?',
      a: 'No. La limpieza ocurre localmente en el navegador y FunnyTools no guarda el bloque procesado.',
    },
  ],
  labels: {
    input: 'Texto original',
    placeholder: 'Pega una lista o un texto con líneas vacías…',
    mode: 'Tratamiento de líneas vacías',
    removeAll: 'Eliminar todas las líneas vacías',
    collapseMultiple: 'Reducir cada grupo a una línea vacía',
    trimLineEnds: 'Quitar espacios al inicio y al final de cada línea',
    process: 'Limpiar líneas',
    copy: 'Copiar resultado',
    reset: 'Restablecer',
    output: 'Texto limpio',
    emptyResult: 'El resultado aparecerá aquí',
    originalLines: 'Líneas originales',
    resultLines: 'Líneas resultantes',
    removedLines: 'Líneas eliminadas',
    copied: 'Resultado copiado',
  },
  privacyNote: 'La limpieza se ejecuta en la memoria de esta pestaña. FunnyTools no recibe ni guarda el texto para quitar líneas vacías.',
  disclaimer: 'Eliminar o recortar líneas puede cambiar párrafos, posiciones de datos, sangría y finales de línea. Conserva el original y valida la salida en su formato de destino.',
};

export const spanishRemoveEmptyLinesReview = {
  heading: 'Cómo comprobar una limpieza de líneas vacías',
  intro: 'Antes de copiar, confirma que los huecos eran ruido y no parte de la estructura del documento o de los datos.',
  panels: [
    {
      title: 'Elige el modo',
      text: 'Elimina todo para listas compactas o reduce grupos cuando quieras conservar párrafos.',
    },
    {
      title: 'Protege la sangría',
      text: 'No recortes cada línea si espacios iniciales o finales pueden cambiar código, tablas o formato.',
    },
    {
      title: 'Valida cantidades',
      text: 'Compara registros, líneas, primer y último elemento y finales de línea en el destino.',
    },
  ],
  checklistHeading: 'Lista de comprobación',
  checklist: [
    'El archivo original sigue disponible.',
    'Las líneas vacías no representaban registros o separadores necesarios.',
    'La sangría y los espacios significativos se conservaron.',
    'La aplicación final acepta saltos LF o los normalizará correctamente.',
  ],
};

export const spanishRemoveDuplicateLines: ToolContent = {
  name: 'Eliminar líneas duplicadas online',
  short: 'Quita líneas repetidas, conserva la primera aparición y permite ignorar mayúsculas, recortar u ordenar en español.',
  long: 'Pega una lista con un elemento por línea para conservar solo la primera aparición de cada valor. De forma predeterminada se recortan los extremos, se distingue entre mayúsculas y minúsculas y se mantiene el orden original. Puedes comparar sin distinguir caja y ordenar el resultado con configuración regional española. Las líneas vacías se omiten siempre. No se analizan columnas CSV, correos equivalentes ni duplicados aproximados.',
  seoTitle: 'Eliminar líneas duplicadas de texto online',
  seoDescription: 'Elimina líneas repetidas, conserva la primera, ignora mayúsculas opcionalmente y ordena con reglas españolas. Estadísticas y proceso local.',
  keywords: [
    'eliminar líneas duplicadas',
    'quitar líneas repetidas online',
    'eliminar duplicados de texto',
    'lista sin duplicados',
    'borrar renglones repetidos',
    'deduplicar lista online',
    'ordenar líneas únicas',
  ],
  capabilities: [
    'Conservar la primera aparición de cada línea y retirar copias posteriores.',
    'Distinguir o ignorar mayúsculas y minúsculas en la comparación.',
    'Recortar opcionalmente espacios en los extremos antes de comparar.',
    'Mantener el orden original o clasificar las líneas con locale español.',
    'Mostrar cuántas líneas únicas quedan y cuántos duplicados se eliminaron.',
  ],
  contentSections: [
    {
      heading: 'Respuesta rápida: cómo eliminar líneas repetidas',
      paragraphs: [
        'Pega una lista con un elemento por línea y pulsa «Eliminar duplicados». La herramienta recorre el texto de arriba abajo, guarda la primera aparición de cada valor y descarta las siguientes coincidencias. Por defecto quita espacios al principio y al final, distingue mayúsculas de minúsculas y conserva el orden. Las líneas vacías no aparecen en la salida.',
        'Comprueba las dos estadísticas antes de copiar. «Líneas únicas» cuenta el resultado, mientras que «Duplicados eliminados» compara solo las líneas no vacías con ese total. Los renglones en blanco omitidos no se suman como duplicados. Si necesitas un registro de cada eliminación, posición o frecuencia, esta página no lo genera: conserva el original y usa una hoja de cálculo o script con auditoría.',
      ],
    },
    {
      heading: 'Qué significa conservar la primera aparición',
      paragraphs: [
        'Si `Madrid` aparece en las posiciones 2, 8 y 20, el resultado conserva la versión de la posición 2. Sin ordenar, las líneas únicas mantienen el orden en que se vieron por primera vez. Esto es útil para listas de prioridades, rutas, etiquetas o respuestas donde el orden original contiene información. La herramienta no combina datos de las copias ni elige la línea más completa o más reciente.',
        'El recorte está activado inicialmente. Por eso `  Madrid`, `Madrid` y `Madrid  ` se comparan como el mismo valor y la salida adopta el texto recortado de la primera aparición. Si desactivas la opción, los espacios pasan a formar parte de la comparación y esas tres líneas pueden considerarse distintas. Aun así, una línea formada solo por espacios se ignora siempre.',
      ],
      items: [
        'La primera coincidencia gana; no se conserva la última.',
        'El orden solo cambia cuando activas «Ordenar el resultado».',
        'No se cuentan ni se muestran líneas completamente vacías.',
        'El resultado no incluye una columna con frecuencia o posición.',
      ],
    },
    {
      heading: 'Ignorar mayúsculas sin ignorar tildes',
      paragraphs: [
        'Al activar «Ignorar mayúsculas y minúsculas», la clave de comparación se convierte a minúsculas con locale `es`. Así, `ÁRBOL`, `Árbol` y `árbol` se consideran la misma línea y se conserva la primera grafía. En cambio, `árbol` y `arbol` siguen siendo distintos porque la tilde no se elimina. Lo mismo ocurre con `año` y `ano`: no deben fusionarse.',
        'La opción no aplica normalización lingüística. No reconoce singular y plural, abreviaturas, espacios internos repetidos, guiones equivalentes, correos con reglas de proveedor ni formas Unicode visualmente parecidas. `Calle Mayor` y `Calle  Mayor` siguen siendo diferentes porque hay dos espacios internos. Para duplicados aproximados necesitas criterios de negocio explícitos y una revisión de posibles falsos positivos.',
      ],
    },
    {
      heading: 'Orden alfabético español y números',
      paragraphs: [
        'Si activas la ordenación, las líneas se clasifican con comparación regional española. Esto ofrece un orden más apropiado para palabras con acentos y ñ que una comparación cruda de códigos. Cuando también ignoras caja, la sensibilidad base evita que mayúsculas y minúsculas dominen la clasificación. El texto conservado sigue siendo la primera grafía encontrada.',
        'La clasificación es de texto completo, no numérica ni por columnas. Una lista `2`, `10`, `100` puede no quedar en el orden matemático que esperas, y `Producto 10` puede aparecer antes de `Producto 2`. Tampoco hay orden descendente. Si el orden original refleja prioridad o dependencia, deja la casilla desactivada; si necesitas números naturales, fechas o una columna específica, usa una hoja de cálculo.',
      ],
    },
    {
      heading: 'CSV, correos, URL y datos estructurados',
      paragraphs: [
        'Esta herramienta trata cada línea como una cadena completa. No interpreta comas, punto y coma, tabulaciones, comillas CSV ni encabezados. Dos filas con el mismo correo pero distintas fechas no son duplicadas porque la línea completa difiere. Si deduplicas por una columna, importa el archivo en una herramienta tabular, conserva una clave y decide qué registro debe ganar.',
        'Tampoco normaliza correos ni URL. Cambiar caja, retirar parámetros, eliminar una barra final o considerar alias de correo equivalentes puede ser correcto en un sistema y destructivo en otro. No uses la casilla de caja como sustituto de reglas de identidad. Para listas de contacto, verifica consentimiento, rebotes y campos asociados; para URL, normaliza según el servidor y conserva la relación con sus metadatos.',
      ],
    },
    {
      heading: 'Privacidad, límites y validación final',
      paragraphs: [
        'El conjunto se procesa dentro de esta pestaña. FunnyTools no recibe la lista para detectar coincidencias y no guarda un historial. Los servicios generales de analítica o publicidad descritos en la política del sitio no incorporan el contenido pegado a sus eventos. No obstante, minimiza datos personales y no pegues secretos o credenciales; una lista de correos o clientes requiere especial cuidado.',
        'El navegador puede manejar listas habituales, pero el rendimiento y la memoria dependen del dispositivo. La página no abre archivos, no ofrece coincidencia difusa, informe de cambios, deshacer por pasos ni exportación CSV. Mantén la fuente, prueba primero una muestra y coteja el total esperado. En datos operativos, revisa manualmente ejemplos con acentos, espacios, caja y campos asociados antes de reemplazar el archivo.',
      ],
    },
  ],
  instructions: [
    'Guarda la lista original y pega una copia con un elemento completo por línea.',
    'Decide si los espacios exteriores y la diferencia de caja forman parte de la identidad.',
    'Mantén el orden original salvo que necesites explícitamente una lista alfabética.',
    'Revisa líneas únicas, duplicados retirados y varios casos con tildes o espacios.',
    'Copia a un archivo nuevo y valida claves, cantidades y relaciones en el sistema final.',
  ],
  examples: [
    'Conservar una sola aparición de cada etiqueta o palabra clave.',
    'Limpiar una lista de rutas exactas sin reordenar su prioridad.',
    'Comparar nombres sin distinguir caja, pero manteniendo tildes y ñ.',
    'Crear una lista alfabética española a partir de respuestas repetidas.',
    'Detectar que una exportación CSV necesita deduplicación por columna en otra herramienta.',
  ],
  audience: [
    'Equipos que limpian listas de etiquetas, nombres, rutas o identificadores.',
    'Analistas que preparan una columna antes de una revisión en hoja de cálculo.',
    'Redactores y SEO que organizan términos sin fusionar variantes aproximadas.',
    'Desarrolladores y operaciones que validan después la salida en su sistema.',
  ],
  caseStudies: [
    {
      title: 'Etiquetas con caja distinta',
      description: 'La lista contiene `Educación`, `EDUCACIÓN` y `educación`. Al ignorar caja se conserva la primera grafía, pero `educacion` sin tilde sigue aparte para que la diferencia no se borre silenciosamente.',
    },
    {
      title: 'Rutas donde el orden importa',
      description: 'Un proceso prueba rutas en orden de prioridad. Se eliminan repeticiones exactas sin activar la ordenación, de modo que la primera aparición y la secuencia operativa se mantienen.',
    },
    {
      title: 'Exportación con varias columnas',
      description: 'Dos filas tienen el mismo correo y diferentes fechas. Como la herramienta compara la línea completa, no las fusiona. El archivo se lleva a una hoja y se define cuál fecha y registro deben conservarse.',
    },
  ],
  notes: [
    'Las líneas vacías se omiten y no cuentan como duplicados eliminados.',
    'El recorte está activado por defecto y afecta tanto la comparación como la salida.',
    'Ignorar caja conserva la primera grafía y no elimina tildes ni ñ.',
    'La ordenación usa reglas españolas, pero compara texto completo y no valores numéricos.',
    'No hay deduplicación aproximada, por columna, de correos o de URL.',
  ],
  faq: [
    {
      q: '¿Se conserva la primera o la última línea repetida?',
      a: 'La primera. Las coincidencias posteriores se eliminan y, sin ordenar, se mantiene el orden de primeras apariciones.',
    },
    {
      q: '¿Qué ocurre con los espacios al inicio y al final?',
      a: 'La opción de recorte está activada por defecto: los elimina antes de comparar y conserva la versión recortada.',
    },
    {
      q: '¿Ignorar mayúsculas también ignora tildes?',
      a: 'No. `ÁRBOL` y `árbol` coinciden, pero `árbol` y `arbol` siguen siendo líneas distintas.',
    },
    {
      q: '¿Las líneas vacías cuentan como duplicados?',
      a: 'No. Se omiten siempre y la estadística de eliminados solo compara líneas con contenido.',
    },
    {
      q: '¿Puede eliminar duplicados según una columna CSV?',
      a: 'No. Cada línea se compara completa. Para CSV, usa una herramienta tabular que conserve encabezados y campos asociados.',
    },
    {
      q: '¿La lista se sube a FunnyTools?',
      a: 'No. La comparación y la ordenación se ejecutan localmente en el navegador.',
    },
  ],
  labels: {
    locale: 'es',
    input: 'Lista original',
    placeholder: 'Pega un elemento por línea…',
    caseInsensitive: 'Ignorar mayúsculas y minúsculas',
    trimLines: 'Quitar espacios al inicio y al final',
    sortOutput: 'Ordenar el resultado en español',
    remove: 'Eliminar duplicados',
    copy: 'Copiar resultado',
    reset: 'Restablecer',
    output: 'Líneas únicas',
    emptyResult: 'El resultado aparecerá aquí',
    uniqueLines: 'Líneas únicas',
    removedLines: 'Duplicados eliminados',
    copied: 'Resultado copiado',
  },
  privacyNote: 'La lista se compara localmente en esta pestaña. FunnyTools no la recibe ni la guarda para quitar duplicados.',
  disclaimer: 'La comparación se hace sobre cada línea completa. Conserva la fuente y no uses este resultado como deduplicación por columnas, identidad de personas o coincidencia aproximada.',
};

export const spanishRemoveDuplicateLinesReview = {
  heading: 'Cómo comprobar una lista sin duplicados',
  intro: 'La clave es definir qué significa «igual» antes de borrar: espacios, caja, tildes, orden y columnas pueden cambiar el resultado.',
  panels: [
    {
      title: 'Define igualdad',
      text: 'Decide si recortar extremos o ignorar caja es válido; la tilde y los espacios internos siguen distinguiendo líneas.',
    },
    {
      title: 'Conserva el orden',
      text: 'Deja la ordenación desactivada si la primera posición representa prioridad, cronología o dependencia.',
    },
    {
      title: 'Valida el modelo',
      text: 'Si hay CSV, correos, URL o campos relacionados, usa reglas específicas y conserva la relación entre columnas.',
    },
  ],
  checklistHeading: 'Lista de comprobación',
  checklist: [
    'La primera aparición es el registro que debe conservarse.',
    'La configuración de espacios y caja coincide con la regla de negocio.',
    'Las variantes con y sin tilde se revisaron por separado.',
    'El total y los casos eliminados se validaron contra la fuente.',
  ],
};
