import type { ToolContent } from '../tools/_types';

export const spanishSortLines: ToolContent = {
  name: 'Ordenar líneas de texto online',
  short: 'Ordena una lista de la A a la Z, de la Z a la A, por número o por longitud con reglas españolas.',
  long: 'Pega un elemento por línea y ordénalos alfabéticamente en ambos sentidos, por el número inicial o por longitud. La versión española utiliza comparación regional `es` y el modo numérico reconoce decimales simples con coma o punto. Antes de ordenar se recortan los extremos y se eliminan las líneas vacías. También puedes ignorar mayúsculas y retirar duplicados conservando la primera aparición.',
  seoTitle: 'Ordenar líneas y texto alfabéticamente online',
  seoDescription: 'Ordena líneas A-Z, Z-A, por número o longitud con locale español. Admite coma decimal, ignora caja y elimina duplicados opcionalmente.',
  keywords: [
    'ordenar líneas de texto',
    'ordenar texto alfabéticamente',
    'ordenar lista de la A a la Z',
    'ordenar líneas por número',
    'ordenar palabras alfabéticamente online',
    'clasificador de líneas',
    'ordenar lista y eliminar duplicados',
  ],
  capabilities: [
    'Ordenar líneas alfabéticamente de la A a la Z o en sentido inverso.',
    'Clasificar por el número que aparece al principio de cada línea.',
    'Ordenar por longitud de cadena de menor a mayor.',
    'Comparar opcionalmente sin distinguir mayúsculas y minúsculas.',
    'Eliminar coincidencias exactas antes de ordenar y mostrar el total resultante.',
  ],
  contentSections: [
    {
      heading: 'Respuesta rápida: cómo ordenar líneas',
      paragraphs: [
        'Pega una lista con un elemento por renglón, elige A–Z, Z–A, numérico o longitud y revisa el resultado. La salida se actualiza al cambiar una opción. Todas las líneas se recortan en ambos extremos y las que quedan vacías se descartan. Si marcas «Eliminar duplicados», se conserva primero la primera coincidencia y después se aplica el orden elegido.',
        'La ordenación alfabética utiliza locale español, no una comparación cruda de códigos. Eso ayuda a colocar palabras con tildes y ñ según las convenciones disponibles en el navegador. Aun así, ordenar texto no equivale a clasificarlo por significado: artículos, apellidos compuestos, abreviaturas, números incluidos en un nombre y signos iniciales forman parte de la cadena.',
      ],
    },
    {
      heading: 'A–Z y Z–A con palabras españolas',
      paragraphs: [
        'A–Z compara cada línea completa desde el comienzo; Z–A invierte ese resultado. La herramienta no separa una frase en palabras ni ignora artículos. `La casa`, `El árbol` y `Una calle` se ordenan por L, E y U. Si necesitas catalogar títulos sin tener en cuenta `el`, `la` o `los`, crea antes una clave auxiliar en una hoja de cálculo y conserva el texto visible en otra columna.',
        'Las tildes y la ñ se entregan a `localeCompare()` con configuración `es`. MDN explica que el argumento locale permite elegir las convenciones lingüísticas de comparación. El resultado exacto aún puede depender de la implementación `Intl` del navegador. Para un índice legal, bibliográfico o institucional, comprueba la norma de catalogación y no sustituyas el campo original por una lista sin clave.',
      ],
      items: [
        'Se compara la línea completa, incluidos signos y números.',
        'No se ignoran automáticamente artículos ni preposiciones.',
        'Z–A invierte la comparación alfabética; no invierte las letras de cada línea.',
        'La salida pierde las líneas vacías y los espacios exteriores.',
      ],
    },
    {
      heading: 'Orden numérico con coma o punto decimal',
      paragraphs: [
        'El modo numérico lee un número al comienzo después del recorte. Admite signo negativo y un decimal simple escrito con coma o punto: `-2,5`, `0`, `3.75` y `12 productos` se ordenan por −2,5, 0, 3,75 y 12. Cuando dos líneas tienen el mismo valor inicial, se desempatan como texto español. Una línea que no empieza por un número se coloca después de las líneas numéricas.',
        'No interpreta separadores de millares, monedas, porcentajes, fechas, fracciones ni notación científica. `1.234,50` se puede leer solo por su prefijo y no debe usarse como importe agrupado; `€ 20` no empieza por número; `1e3` no se trata como mil. Normaliza una copia a números simples sin agrupación antes de ordenar y valida extremos, negativos y empates.',
      ],
    },
    {
      heading: 'Orden por longitud y caracteres visibles',
      paragraphs: [
        '«Por longitud» coloca primero la línea con menos unidades de cadena JavaScript. Los empates se resuelven alfabéticamente. Una letra española precompuesta suele ocupar una unidad, mientras que muchos emoji y determinadas secuencias combinadas ocupan dos o más. Por eso dos etiquetas que parecen tener el mismo número de símbolos pueden quedar en grupos distintos.',
        'Este modo sirve para localizar títulos cortos o largos, preparar etiquetas de ancho limitado o inspeccionar respuestas. No mide píxeles, palabras, bytes UTF-8 ni grafemas visibles. Una fuente proporcional hace que `iiii` ocupe menos espacio en pantalla que `MMMM` aunque ambas cadenas midan cuatro unidades. Para un límite de interfaz, prueba el texto en el componente real.',
      ],
    },
    {
      heading: 'Ignorar caja y eliminar duplicados',
      paragraphs: [
        'Al ignorar mayúsculas, la clave se convierte a minúsculas con locale español. `ÁRBOL`, `Árbol` y `árbol` se comparan sin que la caja decida el orden. La tilde no se elimina y `árbol` no se transforma en `arbol`. Si además retiras duplicados, se conserva la primera grafía encontrada antes de ordenar.',
        'La deduplicación compara la línea completa ya recortada. No normaliza espacios interiores, signos, singular y plural, URL o correos. `Calle Mayor` y `Calle  Mayor` permanecen distintas. La cifra «líneas resultantes» muestra el total final, no cuántas se eliminaron ni la frecuencia de cada valor. Para una auditoría, utiliza primero la herramienta específica de líneas duplicadas o una hoja con recuentos.',
      ],
    },
    {
      heading: 'Privacidad, cambios destructivos y validación',
      paragraphs: [
        'El texto se ordena en la memoria de esta pestaña. FunnyTools no recibe la lista para clasificarla ni guarda un historial. La página puede utilizar servicios generales de analítica o publicidad según su política, pero el contenido pegado no se añade a esos eventos. Minimiza datos personales y nunca pegues credenciales o secretos.',
        'Ordenar puede destruir prioridad, cronología o correspondencia con otra columna. El widget tampoco conserva finales de línea originales, espacios exteriores o renglones vacíos. Mantén la fuente, trabaja con una columna independiente y copia a un archivo nuevo. Comprueba primer y último elemento, negativos, valores sin número, tildes, duplicados y cantidad antes de reemplazar datos.',
      ],
    },
  ],
  instructions: [
    'Guarda la lista original y pega una copia con un elemento completo por línea.',
    'Elige A–Z, Z–A, número inicial o longitud según la pregunta real.',
    'Activa ignorar caja o eliminar duplicados solo si esas diferencias no son significativas.',
    'Revisa decimales con coma, negativos, líneas no numéricas, empates y caracteres acentuados.',
    'Copia el resultado a un archivo nuevo y valida el orden en el sistema de destino.',
  ],
  examples: [
    'Ordenar una lista de nombres o etiquetas de la A a la Z.',
    'Clasificar puntuaciones que comienzan con números negativos o decimales.',
    'Encontrar primero las etiquetas más cortas para una interfaz.',
    'Crear una lista única sin que la diferencia de caja duplique valores.',
    'Detectar que una tabla con varias columnas necesita otra herramienta para conservar filas.',
  ],
  audience: [
    'Personas que organizan listas, etiquetas, palabras clave o respuestas.',
    'Equipos de contenido y SEO que revisan términos, no métricas de prioridad.',
    'Docentes y estudiantes que preparan vocabularios o datos simples.',
    'Operaciones y desarrollo que validan después la salida en su sistema.',
  ],
  caseStudies: [
    {
      title: 'Precios con coma decimal',
      description: 'Una lista usa `-1,5`, `2`, `2,25` y `sin dato`. El modo numérico coloca primero los tres valores y deja la línea no numérica al final; el equipo evita separadores de miles y comprueba el orden.',
    },
    {
      title: 'Etiquetas con ñ y tildes',
      description: 'Se ordenan términos españoles con locale `es`. La lista se coteja con el CMS porque el navegador aplica colación lingüística, pero el sistema editorial puede tener una regla de catalogación propia.',
    },
    {
      title: 'Lista de prioridades',
      description: 'Aunque A–Z produce una salida limpia, el orden original representaba urgencia. Se conserva la fuente y solo se ordena una copia para búsqueda; la lista operativa no se reemplaza.',
    },
  ],
  notes: [
    'Cada línea se recorta y las líneas vacías se eliminan siempre.',
    'El modo numérico lee un número simple al principio; no interpreta miles, moneda ni fechas.',
    'La longitud mide unidades de cadena, no palabras, bytes, grafemas ni anchura visual.',
    'Eliminar duplicados conserva la primera grafía antes de ordenar.',
    'La herramienta compara líneas completas y no mantiene columnas asociadas.',
  ],
  faq: [
    {
      q: '¿La ordenación reconoce la ñ y las tildes?',
      a: 'Usa comparación con locale español. Para un catálogo oficial, confirma la regla y el resultado en tu sistema.',
    },
    {
      q: '¿Acepta números con coma decimal?',
      a: 'Sí, si el número simple aparece al principio. También acepta punto decimal, pero no separadores de millares ni moneda.',
    },
    {
      q: '¿Dónde quedan las líneas sin número?',
      a: 'En modo numérico se colocan después de las líneas numéricas y se desempatan como texto.',
    },
    {
      q: '¿Se conservan espacios y líneas vacías?',
      a: 'No. Se recortan los extremos y se descartan las líneas que quedan vacías.',
    },
    {
      q: '¿Ordenar por longitud cuenta emoji como uno?',
      a: 'No siempre. Mide longitud de cadena JavaScript; muchos emoji y secuencias combinadas ocupan varias unidades.',
    },
    {
      q: '¿La lista se envía a FunnyTools?',
      a: 'No. La ordenación se ejecuta localmente en el navegador.',
    },
  ],
  labels: {
    locale: 'es',
    decimalSeparator: ',',
    input: 'Lista original',
    output: 'Resultado ordenado',
    placeholder: 'Un elemento por línea…\nÑandú\nÁrbol\nCasa',
    sortMode: 'Criterio de orden',
    ascending: 'Alfabético A–Z',
    descending: 'Alfabético Z–A',
    numeric: 'Número inicial',
    length: 'Longitud de línea',
    caseInsensitive: 'Ignorar mayúsculas y minúsculas',
    removeDuplicates: 'Eliminar líneas duplicadas',
    sort: 'Ordenar líneas',
    copy: 'Copiar resultado',
    reset: 'Restablecer',
    lineCount: 'Líneas resultantes',
    emptyResult: 'El resultado aparecerá aquí',
    copied: 'Resultado copiado',
  },
  privacyNote: 'La lista se ordena localmente en esta pestaña. FunnyTools no recibe ni guarda el texto para clasificarlo.',
  disclaimer: 'La ordenación elimina líneas vacías y espacios exteriores y puede destruir prioridad o correspondencia entre columnas. Conserva la fuente y valida el resultado.',
};

export const spanishSortLinesReview = {
  heading: 'Cómo comprobar una lista ordenada',
  intro: 'Un orden visible solo es útil si el criterio coincide con el dato y no rompe prioridad, filas relacionadas ni formatos numéricos.',
  panels: [
    { title: 'Define el criterio', text: 'Distingue orden alfabético, número inicial, longitud y orden natural; no son intercambiables.' },
    { title: 'Revisa la limpieza', text: 'La herramienta retira espacios exteriores y líneas vacías antes de comparar.' },
    { title: 'Valida extremos', text: 'Comprueba primeros, últimos, negativos, empates, valores sin número y cantidad final.' },
  ],
  checklistHeading: 'Lista de comprobación',
  checklist: [
    'El orden original no representaba prioridad o cronología que debiera conservarse.',
    'Los decimales no usan agrupación de millares ni símbolos de moneda.',
    'Las opciones de caja y duplicados reflejan la regla real.',
    'Las columnas o metadatos asociados siguen vinculados correctamente.',
  ],
};

export const spanishJsonFormatter: ToolContent = {
  name: 'Formatear, minificar y validar JSON online',
  short: 'Da formato con dos espacios, crea una línea compacta o comprueba la sintaxis JSON sin subir el contenido.',
  long: 'Pega JSON para analizarlo con `JSON.parse()` y volver a generarlo con `JSON.stringify()`. Puedes formatear con dos espacios, minificar en una línea o validar y consultar el error del navegador. La herramienta acepta JSON estándar, no JavaScript, JSON5 ni comentarios. No repara errores y no valida un JSON Schema. Formatear puede alterar claves duplicadas y números fuera de la precisión segura de JavaScript.',
  seoTitle: 'Formateador y validador JSON online',
  seoDescription: 'Formatea JSON con dos espacios, minifica en una línea y valida sintaxis en el navegador. Explica errores, límites numéricos y privacidad.',
  keywords: [
    'formatear JSON online',
    'validador JSON online',
    'minificar JSON',
    'JSON formatter español',
    'comprobar JSON válido',
    'beautify JSON',
    'compactar JSON',
  ],
  capabilities: [
    'Analizar JSON estándar con el parser nativo del navegador.',
    'Crear una versión legible con sangría de dos espacios.',
    'Minificar objetos y arrays válidos en una sola línea.',
    'Validar la sintaxis sin modificar el cuadro de entrada.',
    'Mostrar el mensaje del parser y, cuando existe posición, línea y columna en español.',
  ],
  contentSections: [
    {
      heading: 'Respuesta rápida: cómo formatear JSON y validarlo',
      paragraphs: [
        'Pega el documento y pulsa «Formatear» para obtener una versión con dos espacios por nivel. «Minificar» elimina el espacio estructural innecesario y produce una línea. «Validar» solo intenta analizar la entrada y responde que es válida o muestra un error. Los tres botones requieren sintaxis JSON estándar y dejan el original en el primer cuadro.',
        'El parser no comprueba que los campos sean correctos para una API. `{"edad":-9}` puede ser JSON sintácticamente válido aunque la aplicación prohíba esa edad. Tampoco comprueba tipos, campos obligatorios, formatos o reglas de negocio. Para eso necesitas el contrato de la API o un JSON Schema y un validador compatible.',
      ],
    },
    {
      heading: 'JSON válido no es cualquier objeto JavaScript',
      paragraphs: [
        'JSON admite objetos, arrays, cadenas entre comillas dobles, números, `true`, `false` y `null`. Las claves de objetos deben ir entre comillas dobles. Los comentarios, comas finales, comillas simples, claves sin comillas, `undefined`, funciones, `NaN` e `Infinity` no forman parte del formato. MDN señala expresamente que `JSON.parse()` lanza `SyntaxError` cuando el texto no es JSON válido.',
        'Un valor raíz también puede ser una cadena, número, booleano o `null`; no tiene que ser siempre objeto o array. El espacio estructural permitido incluye tabulación, retorno de carro, salto de línea y espacio en lugares válidos. Un salto dentro de una cadena debe escaparse como `\\n`. La herramienta no convierte JSON5, YAML, XML ni una respuesta HTTP completa con cabeceras.',
      ],
      items: [
        'Válido: `{"activo":true,"items":[1,2],"nota":null}`.',
        'Inválido: `{activo: true}` porque la clave no lleva comillas dobles.',
        'Inválido: `{"a":1,}` por la coma final.',
        'Inválido: `// comentario` porque JSON no admite comentarios.',
      ],
    },
    {
      heading: 'Qué cambia al formatear o minificar',
      paragraphs: [
        'La herramienta no inserta espacios sobre el texto original: primero crea un valor JavaScript y luego lo serializa de nuevo. Formatear usa `JSON.stringify(valor, null, 2)`; minificar usa `JSON.stringify(valor)`. La sangría o los saltos originales se pierden. El orden habitual de propiedades se conserva según las reglas del motor, pero no debes tratarlo como una firma byte a byte.',
        'Los espacios dentro de cadenas se mantienen porque son datos. Los escapes pueden representarse de otra forma equivalente y los números pueden perder ceros no significativos: `1.0` puede salir como `1`. Si necesitas verificar una firma, hash, diff textual o formato contractual exacto, trabaja con los bytes originales; una representación semánticamente equivalente puede producir otra cadena.',
      ],
    },
    {
      heading: 'Claves duplicadas y números grandes',
      paragraphs: [
        'JSON puede contener el mismo nombre de propiedad más de una vez en el texto, pero al analizarlo como objeto una clave posterior sustituye a la anterior. `{"estado":"nuevo","estado":"cerrado"}` termina con un único `estado`. Formatear o minificar borra esa evidencia. Si recibes datos de una fuente no confiable, revisa duplicados antes de usar el resultado como registro.',
        'Los números se convierten al tipo `Number` de JavaScript. Los enteros por encima de `9.007.199.254.740.991` pueden perder precisión y cambiar al volver a serializarse. Identificadores largos, números de cuenta o secuencias deben llegar como cadenas entre comillas cuando se requiera exactitud. Esta página no implementa un parser decimal arbitrario ni BigInt para JSON.',
      ],
    },
    {
      heading: 'Cómo interpretar el mensaje de error',
      paragraphs: [
        'El mensaje proviene de `JSON.parse()` y varía entre Chrome, Firefox, Safari y versiones del navegador. Cuando incluye una posición numérica, la página calcula una línea y columna aproximadas y las muestra con etiquetas españolas. Empieza cerca de ese punto y revisa la coma, comilla, dos puntos, corchete o llave anterior: el parser suele detectar el problema donde ya no puede continuar, no siempre donde comenzó.',
        'Corrige una sola cosa cada vez y vuelve a validar. Para documentos extensos, reduce el caso hasta localizar el bloque o utiliza un editor con resaltado y árbol. La herramienta no marca caracteres en el cuadro, no repara automáticamente y no ofrece JSON Schema. Que el mensaje desaparezca confirma sintaxis, no significado, autorización ni compatibilidad con el receptor.',
      ],
    },
    {
      heading: 'Privacidad y tratamiento de payloads',
      paragraphs: [
        'El análisis se ejecuta dentro de esta pestaña. FunnyTools no recibe el JSON para formatearlo y no guarda un historial. Los servicios generales de analítica o publicidad descritos en la política no incluyen el contenido del cuadro como parámetro. Sin embargo, evita pegar API keys, tokens, cookies, contraseñas, datos de clientes, expedientes o secretos empresariales.',
        'Trabaja con un ejemplo anonimizado y reemplaza valores reales por marcadores. Un payload también puede contener datos en Base64 que siguen siendo recuperables. Mantén la fuente, compara el resultado y prueba una copia en un entorno seguro. No utilices un formateador como prueba de que el contenido es inocuo o puede compartirse.',
      ],
    },
  ],
  instructions: [
    'Elimina secretos y pega una copia del JSON, no el único registro.',
    'Valida primero si necesitas confirmar sintaxis sin regenerar el texto.',
    'Formatea para lectura o minifica para una representación compacta.',
    'Revisa claves duplicadas, enteros largos, tipos, campos y escapes.',
    'Valida después contra el schema o contrato de la aplicación de destino.',
  ],
  examples: [
    'Leer una respuesta de API de una sola línea después de anonimizarla.',
    'Detectar una coma final en una configuración antes de guardarla.',
    'Minificar un ejemplo válido para un campo que exige una línea.',
    'Comprobar que una cadena raíz o `null` también son JSON válidos.',
    'Evitar formatear un identificador numérico largo hasta convertirlo en cadena.',
  ],
  audience: [
    'Desarrolladores y QA que inspeccionan respuestas, webhooks y fixtures.',
    'Operaciones que preparan configuraciones o campos de plataformas.',
    'Redactores técnicos y docentes que publican ejemplos JSON.',
    'Personas que quieren analizar localmente una muestra sin subirla a un formateador.',
  ],
  caseStudies: [
    {
      title: 'Configuración con coma final',
      description: 'El panel rechaza `{"activo":true,}`. El validador muestra un SyntaxError cerca del cierre; se retira la coma y después se comprueba el esquema de la integración.',
    },
    {
      title: 'Identificador de 18 dígitos',
      description: 'Un ID llega como número y puede superar la precisión segura. No se formatea como si fuera inocuo: se consulta el contrato y se cambia en origen a una cadena entre comillas.',
    },
    {
      title: 'Dos claves con el mismo nombre',
      description: 'Una carga incluye dos propiedades `estado`. Al parsear ganaría la última. Se corrige la fuente antes de formatear para no ocultar el problema ni escoger silenciosamente un valor.',
    },
  ],
  notes: [
    'El botón validar comprueba sintaxis JSON, no JSON Schema ni reglas de negocio.',
    'Formatear usa dos espacios; no conserva sangría ni representación byte a byte.',
    'Las claves duplicadas pueden reducirse a la última aparición al analizar.',
    'Los enteros fuera del rango seguro de JavaScript pueden perder precisión.',
    'Los mensajes y posiciones de error dependen del navegador.',
  ],
  faq: [
    {
      q: '¿Admite comentarios o comas finales?',
      a: 'No. Usa JSON estándar mediante `JSON.parse()`, no JSON5 ni JavaScript.',
    },
    {
      q: '¿Validar comprueba un JSON Schema?',
      a: 'No. Solo confirma sintaxis. Los campos, tipos y reglas requieren el schema o contrato del destino.',
    },
    {
      q: '¿Puede cambiar números grandes?',
      a: 'Sí. Los números se convierten a `Number`; enteros fuera del rango seguro pueden perder precisión al regenerarse.',
    },
    {
      q: '¿Qué pasa con claves duplicadas?',
      a: 'Al analizar un objeto, la aparición posterior puede sustituir la anterior. Corrige la fuente antes de formatear.',
    },
    {
      q: '¿La herramienta repara JSON inválido?',
      a: 'No. Muestra el error del navegador para evitar adivinar cambios en los datos.',
    },
    {
      q: '¿El JSON se sube a FunnyTools?',
      a: 'No. El análisis y la serialización ocurren localmente en esta pestaña.',
    },
  ],
  labels: {
    input: 'JSON original',
    output: 'Resultado',
    placeholder: 'Pega JSON estándar sin datos sensibles…',
    format: 'Formatear con 2 espacios',
    minify: 'Minificar',
    validate: 'Validar sintaxis',
    copy: 'Copiar resultado',
    clear: 'Borrar',
    valid: 'El JSON es sintácticamente válido.',
    invalidPrefix: 'JSON no válido',
    line: 'línea',
    column: 'columna',
    copied: 'Resultado copiado',
  },
  privacyNote: 'El JSON se analiza y se vuelve a generar localmente. FunnyTools no recibe ni guarda el contenido pegado para formatearlo.',
  disclaimer: 'No pegues credenciales ni datos sensibles. La validación solo cubre sintaxis y el parser puede modificar claves duplicadas o números fuera de la precisión segura.',
};

export const spanishJsonFormatterReview = {
  heading: 'Cómo comprobar un JSON después de formatearlo',
  intro: 'La salida legible no garantiza que el payload conserve precisión, carezca de claves duplicadas o cumpla el contrato de una API.',
  panels: [
    { title: 'Protege secretos', text: 'Anonimiza tokens, cookies, contraseñas y datos personales antes de pegar una muestra.' },
    { title: 'Revisa pérdidas', text: 'Comprueba enteros largos, claves duplicadas, escapes y cambios de representación.' },
    { title: 'Valida el contrato', text: 'Usa el JSON Schema o documentación del receptor para tipos, campos y reglas.' },
  ],
  checklistHeading: 'Lista de comprobación',
  checklist: [
    'La entrada no contiene secretos ni datos personales innecesarios.',
    'Los identificadores largos están representados como cadenas cuando corresponde.',
    'No hay claves duplicadas que el parser pueda ocultar.',
    'El resultado se probó contra el schema o sistema de destino.',
  ],
};

export const spanishBase64: ToolContent = {
  name: 'Codificar y decodificar Base64 UTF-8',
  short: 'Convierte texto español, emoji o JSON entre UTF-8 y Base64 estándar dentro del navegador.',
  long: 'Escribe texto para codificar sus bytes UTF-8 como Base64 estándar o pega Base64 para recuperar texto UTF-8 válido. El decodificador ignora espacios, tabulaciones y saltos dentro de la cadena, pero no admite directamente Base64URL, prefijos Data URI ni archivos binarios. Si los bytes no forman UTF-8 válido, muestra un error. Base64 no cifra, no comprime y no protege secretos.',
  seoTitle: 'Codificador y decodificador Base64 UTF-8',
  seoDescription: 'Codifica texto, tildes, ñ y emoji a Base64 o decodifica Base64 estándar a UTF-8. Proceso local, ejemplos y límites de Base64URL y archivos.',
  keywords: [
    'codificar Base64 online',
    'decodificar Base64 a texto',
    'Base64 UTF-8',
    'convertir texto a Base64',
    'Base64 decoder español',
    'Base64 encoder online',
    'decodificar cadena Base64',
  ],
  capabilities: [
    'Codificar texto Unicode como bytes UTF-8 y después Base64 estándar.',
    'Decodificar Base64 estándar y exigir que los bytes formen UTF-8 válido.',
    'Procesar tildes, ñ, caracteres CJK y emoji.',
    'Ignorar espacios en blanco introducidos dentro de la cadena Base64.',
    'Copiar el resultado sin enviar el texto al servidor de FunnyTools.',
  ],
  contentSections: [
    {
      heading: 'Respuesta rápida: texto a Base64 y Base64 a texto',
      paragraphs: [
        'Para codificar, pega texto legible y pulsa «Codificar a Base64». `acción` se convierte primero en bytes UTF-8 y luego en caracteres del alfabeto Base64. Para decodificar, pega una cadena Base64 estándar y pulsa «Decodificar a UTF-8». Si la sintaxis no es válida o los bytes resultantes no son texto UTF-8 correcto, el cuadro muestra un error en vez de reemplazar silenciosamente caracteres.',
        'Los dos sentidos no utilizan la misma entrada al mismo tiempo: después de codificar, copia la salida al cuadro de entrada si quieres probar el retorno. Base64 representa bytes con texto ASCII; no detecta por sí solo qué significan esos bytes. Esta herramienta impone UTF-8 en el sentido de texto para que tildes, ñ y emoji tengan un resultado definido.',
      ],
    },
    {
      heading: 'Por qué UTF-8 importa para el español',
      paragraphs: [
        'Base64 no codifica letras directamente. `TextEncoder` transforma la cadena a UTF-8 y cada carácter puede ocupar uno o varios bytes. Letras ASCII como `a` suelen usar un byte; `ñ` o vocales acentuadas usan más, y un emoji suele requerir aún más. Dos textos con igual longitud visual pueden producir cadenas Base64 de distinta longitud.',
        'Al decodificar se usa `TextDecoder("utf-8", { fatal: true })`. El modo fatal rechaza secuencias de bytes que no son UTF-8 válido. Eso evita mostrar caracteres de sustitución como si el texto se hubiera recuperado correctamente. Si el origen utilizó Latin-1, UTF-16 u otra codificación, necesitas conocerla y usar un decodificador apropiado; esta página no intenta adivinar.',
      ],
      items: [
        'Entrada de codificación: una cadena Unicode del navegador.',
        'Representación intermedia: bytes UTF-8.',
        'Salida: Base64 estándar con `A–Z`, `a–z`, `0–9`, `+`, `/` y posible `=`.',
        'Decodificación: bytes Base64 que deben formar UTF-8 válido.',
      ],
    },
    {
      heading: 'Base64 estándar, padding y espacios',
      paragraphs: [
        'La salida utiliza el alfabeto Base64 estándar de `btoa()` y puede terminar en uno o dos signos `=` de relleno. MDN describe `atob()` como la operación que convierte una cadena codificada en Base64 en bytes. Antes de decodificar, esta herramienta elimina espacios, tabulaciones y saltos; eso permite pegar una cadena dividida en varias líneas.',
        'No añade un padding ausente de forma explícita ni corrige caracteres ilegales. La tolerancia a ciertas variantes puede depender del navegador. Para intercambio con una API, compara la especificación: algunas exigen padding, otras lo omiten. No insertes ni retires `=` a ciegas cuando la cadena forma parte de una firma o protocolo.',
      ],
    },
    {
      heading: 'Base64URL y Data URI no son esta entrada',
      paragraphs: [
        'Base64URL sustituye normalmente `+` por `-`, `/` por `_` y a menudo omite `=`. Es común en JWT y URL. El decodificador de esta página no normaliza esa variante; una cadena con `-` o `_` puede fallar. Tampoco analiza un JWT en sus tres partes ni valida su firma. Convierte la variante según la especificación o usa una herramienta especializada.',
        'Una Data URI incluye un encabezado como `data:text/plain;base64,` antes de los datos. Aquí debes pegar solo la parte posterior a la coma. El prefijo completo no es Base64 y causa error. Para imágenes ya existe una herramienta específica de imagen a Base64; este widget es texto UTF-8 y no ofrece selector de archivo, MIME type, vista previa ni descarga binaria.',
      ],
    },
    {
      heading: 'Base64 no es cifrado, hash ni compresión',
      paragraphs: [
        'Cualquiera que reciba la cadena puede decodificarla sin clave. Base64 no oculta contraseñas, tokens, cookies, datos personales ni comandos. Tampoco demuestra integridad o autoría. Para confidencialidad se necesita cifrado adecuado y gestión de claves; para integridad, un hash o MAC según el sistema. Cambiar el aspecto del texto no lo protege.',
        'La codificación suele aumentar el tamaño porque cada grupo de tres bytes se representa con cuatro caracteres, más posible relleno. No es una técnica de compresión. Puede ser útil cuando un canal necesita texto ASCII para transportar bytes, pero una API moderna quizá acepte UTF-8 directamente. Evalúa también límites de payload y encabezados.',
      ],
    },
    {
      heading: 'Privacidad y contenido desconocido',
      paragraphs: [
        'La conversión se realiza en esta pestaña. FunnyTools no recibe el texto o Base64 para producir el resultado y no guarda historial. Los servicios generales de analítica o publicidad descritos en la política del sitio no incluyen el contenido de los cuadros como parámetro. No obstante, no pegues credenciales ni datos sensibles solo porque el proceso sea local.',
        'Una cadena Base64 desconocida puede contener texto engañoso, una URL o un comando. Decodificarla como texto no ejecuta el resultado, pero copiarlo a una consola, navegador o script sí podría ser peligroso. Léelo como dato, no lo ejecutes, y utiliza un entorno aislado cuando proceda. Para archivos binarios, emplea herramientas capaces de comprobar MIME, tamaño y firma.',
      ],
    },
  ],
  instructions: [
    'Decide si la entrada es texto UTF-8 o una cadena Base64 estándar.',
    'Elimina cualquier prefijo Data URI y no uses directamente Base64URL.',
    'Pulsa codificar o decodificar y revisa tildes, ñ, emoji y saltos.',
    'Compara con el sistema de origen para confirmar UTF-8, padding y alfabeto.',
    'No ejecutes contenido desconocido ni uses Base64 para proteger secretos.',
  ],
  examples: [
    'Codificar `acción, niño y pingüino` como texto UTF-8.',
    'Recuperar un pequeño ejemplo JSON que llegó en Base64 estándar.',
    'Comprobar que una cadena corresponde a texto UTF-8 y no a bytes binarios.',
    'Detectar que una cadena de JWT usa Base64URL y necesita otra herramienta.',
    'Explicar por qué Base64 aumenta el tamaño y no sustituye al cifrado.',
  ],
  audience: [
    'Desarrolladores y QA que revisan ejemplos de APIs o configuraciones.',
    'Redactores técnicos y docentes que explican UTF-8 y Base64.',
    'Personas que necesitan convertir texto español sin romper caracteres Unicode.',
    'Usuarios que quieren un proceso local y conocen la codificación del origen.',
  ],
  caseStudies: [
    {
      title: 'Texto con ñ y emoji',
      description: 'La frase se convierte mediante UTF-8 antes de Base64 y vuelve sin perder caracteres. Se conserva la cadena original para comparar ambos sentidos.',
    },
    {
      title: 'Segmento de un JWT',
      description: 'El segmento incluye `-` y `_`, propios de Base64URL. No se fuerza en el decodificador estándar ni se confunde decodificar el payload con validar la firma.',
    },
    {
      title: 'Datos que no son UTF-8',
      description: 'La sintaxis Base64 es válida, pero los bytes fallan en el decodificador UTF-8 fatal. Se consulta la codificación original en vez de aceptar caracteres de sustitución.',
    },
  ],
  notes: [
    'Codifica y decodifica texto UTF-8, no archivos binarios.',
    'Los espacios dentro del Base64 se eliminan antes de decodificar.',
    'Base64URL con `-` o `_` no se normaliza automáticamente.',
    'Un prefijo `data:...;base64,` debe retirarse antes de pegar.',
    'Base64 es reversible y suele aumentar el tamaño; no cifra ni comprime.',
  ],
  faq: [
    {
      q: '¿Admite tildes, ñ y emoji?',
      a: 'Sí. Convierte primero el texto a bytes UTF-8 y después a Base64.',
    },
    {
      q: '¿Puedo pegar Base64URL o un JWT?',
      a: 'No directamente. Base64URL usa otro alfabeto y un JWT además requiere validar estructura y firma.',
    },
    {
      q: '¿Puedo pegar una Data URI completa?',
      a: 'No. Retira el prefijo hasta la coma y pega solo los datos Base64.',
    },
    {
      q: '¿Por qué una cadena Base64 válida puede dar error?',
      a: 'Los bytes pueden no formar texto UTF-8 válido. El origen quizá sea binario u otra codificación.',
    },
    {
      q: '¿Base64 protege una contraseña?',
      a: 'No. Es reversible sin clave y no ofrece confidencialidad ni integridad.',
    },
    {
      q: '¿El contenido se envía a FunnyTools?',
      a: 'No. La codificación y decodificación se ejecutan localmente en esta pestaña.',
    },
  ],
  labels: {
    input: 'Texto o Base64',
    output: 'Resultado',
    placeholder: 'Pega texto UTF-8 o Base64 estándar…',
    encode: 'Codificar a Base64',
    decode: 'Decodificar a UTF-8',
    copy: 'Copiar resultado',
    clear: 'Borrar',
    invalidBase64: 'No se pudo decodificar: comprueba que sea Base64 estándar y que los bytes formen texto UTF-8 válido.',
    copied: 'Resultado copiado',
  },
  privacyNote: 'La conversión se ejecuta localmente en esta pestaña. FunnyTools no recibe ni guarda el texto o Base64 para procesarlo.',
  disclaimer: 'Base64 no es cifrado. No pegues secretos ni ejecutes contenido desconocido; confirma UTF-8, alfabeto, padding y formato con el sistema de origen.',
};

export const spanishBase64Review = {
  heading: 'Cómo comprobar una conversión Base64',
  intro: 'Una cadena decodificable solo confirma una representación de bytes; todavía debes verificar codificación, variante, origen y seguridad.',
  panels: [
    { title: 'Identifica la variante', text: 'Distingue Base64 estándar, Base64URL, Data URI y segmentos de JWT.' },
    { title: 'Confirma UTF-8', text: 'El resultado debe volver exactamente, con tildes, ñ, emoji y saltos intactos.' },
    { title: 'Trata como dato', text: 'No ejecutes comandos o URL desconocidos y no confundas codificación con cifrado.' },
  ],
  checklistHeading: 'Lista de comprobación',
  checklist: [
    'La entrada no incluye un prefijo Data URI ni caracteres Base64URL.',
    'El sistema de origen declara UTF-8 o se conoce su codificación.',
    'El retorno coincide exactamente con el texto original.',
    'La cadena no se usa para ocultar credenciales ni demostrar integridad.',
  ],
};
