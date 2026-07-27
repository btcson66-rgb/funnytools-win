import type { ToolContent } from '../tools/_types';

export const spanishCsvToJson: ToolContent = {
  name: 'Convertir CSV a JSON online',
  short: 'Transforma filas CSV con encabezados en un array JSON, detecta coma, punto y coma, tabulación o barra vertical y conserva el texto por defecto.',
  long: 'Pega una tabla CSV o delimitada, confirma el separador y convierte la primera fila en nombres de propiedades. El analizador entiende campos entre comillas, comillas dobles escapadas y saltos de línea dentro de una celda. La inferencia de números y booleanos es opcional para que códigos como `00125`, teléfonos o identificadores largos no pierdan su forma sin avisar. La conversión ocurre en esta pestaña y genera JSON formateado para revisar, copiar o descargar.',
  seoTitle: 'Convertir CSV a JSON online | Coma y punto y coma',
  seoDescription: 'Convierte CSV a JSON en el navegador. Detecta coma, punto y coma, tabulador y pipe, admite campos entre comillas y permite conservar tipos como texto.',
  keywords: [
    'convertir CSV a JSON online',
    'conversor CSV a JSON',
    'CSV a array JSON',
    'CSV punto y coma a JSON',
    'CSV UTF-8 a JSON',
    'pasar CSV a JSON',
    'convertir tabla a JSON',
  ],
  capabilities: [
    'Usar la primera fila como claves de cada objeto JSON.',
    'Detectar automáticamente coma, punto y coma, tabulación o barra vertical.',
    'Leer comas, comillas y saltos de línea contenidos dentro de campos entrecomillados.',
    'Conservar todas las celdas como texto o activar la inferencia de números y booleanos.',
    'Mostrar filas, columnas y separador detectado antes de copiar o descargar.',
  ],
  contentSections: [
    {
      heading: 'Respuesta rápida: cómo pasar un CSV a JSON',
      paragraphs: [
        'Copia la tabla con una fila de encabezados, pégala en el cuadro y deja «Detectar automáticamente» si no conoces el separador. Pulsa «Convertir a JSON». Cada fila de datos se convierte en un objeto y cada encabezado pasa a ser una clave. Por ejemplo, `nombre,ciudad` seguido de `Ana,Sevilla` produce un array con `{"nombre":"Ana","ciudad":"Sevilla"}`. La salida aparece con sangría de dos espacios para que puedas comprobarla antes de descargar.',
        'Si el archivo usa punto y coma porque la coma se reserva para decimales, selecciónalo de forma explícita cuando la detección no coincida con la fuente. También puedes elegir tabulación para TSV o barra vertical para datos con pipe. La herramienta no abre archivos XLSX ni interpreta una hoja de Excel: necesita texto delimitado ya exportado o pegado. Conserva el archivo original hasta validar recuentos y valores.',
      ],
    },
    {
      heading: 'Encabezados, filas y forma del JSON',
      paragraphs: [
        'La primera fila siempre se interpreta como encabezado. `id,nombre,activo` crea esas tres propiedades en cada objeto posterior. Un encabezado vacío, repetido o con espacios puede producir claves poco prácticas o renombradas por el analizador. Antes de convertir, usa nombres únicos, estables y descriptivos. Si el destino es una API, respeta exactamente la caja, guiones bajos y campos obligatorios que indique su contrato.',
        'El resultado es un array de objetos planos. El convertidor no deduce jerarquías a partir de puntos, corchetes o nombres como `cliente.dirección`; esa secuencia queda como una clave literal. Tampoco agrupa varias filas en pedidos, familias o categorías. Para crear objetos anidados necesitas una regla de transformación posterior que defina relaciones, cardinalidad y manejo de ausencias.',
      ],
      items: [
        'Una fila de encabezados es obligatoria en esta versión.',
        'Las filas completamente vacías se omiten.',
        'Una celda vacía se conserva como cadena vacía, no como `null`.',
        'La herramienta genera JSON válido, pero no valida el esquema de una API.',
      ],
    },
    {
      heading: 'Coma, punto y coma, tabulador y pipe',
      paragraphs: [
        'CSV se usa como nombre general para texto tabular delimitado, aunque el carácter real no siempre sea una coma. En configuraciones donde la coma es separador decimal es habitual encontrar punto y coma. Exportaciones técnicas también usan tabulaciones o `|`. Papa Parse puede comparar delimitadores frecuentes, y el selector permite fijar uno para evitar una deducción ambigua cuando la muestra tiene pocas filas o muchos signos dentro del texto.',
        'Elegir el separador incorrecto suele producir una sola columna enorme o más columnas de las esperadas. Revisa el resumen que muestra esta página: el número de columnas debe coincidir con la tabla de origen. Un punto y coma dentro de un campo no rompe la fila si el campo está correctamente entre comillas y el separador real es punto y coma. No hagas reemplazos globales de coma por punto y coma porque también cambiarías contenido legítimo.',
      ],
    },
    {
      heading: 'Campos entre comillas y saltos de línea',
      paragraphs: [
        'Un campo puede contener el delimitador cuando se encierra entre comillas dobles. En CSV separado por comas, `"Madrid, España"` sigue siendo una celda. Una comilla literal se representa duplicándola: `"Dijo ""hola"""`. Los saltos de línea también pueden formar parte de una celda entrecomillada. El analizador procesa estas reglas; dividir el texto manualmente por líneas o comas no produciría el mismo resultado.',
        'Las comillas deben estar equilibradas. Una celda abierta que nunca se cierra puede absorber filas siguientes o producir un error. La herramienta detiene la conversión ante errores informados por el parser y no entrega una salida parcial como si fuera fiable. Si recibes un error, vuelve a la aplicación que exportó el CSV, inspecciona la fila indicada y confirma el carácter de cita y el salto de línea utilizado.',
      ],
    },
    {
      heading: 'Texto frente a inferencia de tipos',
      paragraphs: [
        'Por defecto, FunnyTools conserva cada celda como cadena. Esta opción protege formas significativas como `00125`, `0007`, números de cuenta, códigos postales, referencias largas y valores `TRUE` que deben seguir siendo texto. JSON distingue cadenas, números, booleanos y `null`; CSV, en cambio, solo contiene texto delimitado y no declara un tipo por columna.',
        'Si activas «Inferir números y booleanos», Papa Parse convierte representaciones compatibles a tipos JSON. Revisa después decimales, notación exponencial, fechas, ceros iniciales y enteros largos. La inferencia no conoce la semántica de tu negocio. Un teléfono compuesto por dígitos no es una cantidad; una fecha no debe convertirse por parecer número; un identificador de más de 15 dígitos puede perder precisión si otra aplicación lo trata como Number.',
      ],
    },
    {
      heading: 'UTF-8, BOM y caracteres españoles',
      paragraphs: [
        'El cuadro recibe texto Unicode del navegador, por lo que tildes, `ñ`, signos de apertura y emoji se mantienen al copiar datos correctamente decodificados. Si el CSV ya aparece como `JosÃ©` antes de pegarlo, la corrupción ocurrió al abrir el archivo con un charset equivocado. Convertir a JSON no puede reconstruir con certeza los bytes originales. Reabre la fuente indicando UTF-8 o exporta de nuevo desde el sistema que conoce su codificación.',
        'Un BOM al comienzo de un CSV UTF-8 puede ayudar a ciertas versiones de Excel a identificar la codificación. El parser suele manejar esa marca en el primer encabezado, pero conviene comprobar que la primera clave no contiene un carácter invisible. Esta página descarga JSON como UTF-8; no añade información de Excel, hoja, formato de celda, fórmulas ni estilos porque JSON no conserva esas características.',
      ],
    },
    {
      heading: 'Validación antes de usar una API',
      paragraphs: [
        'Que el texto sea JSON válido no significa que cumpla el contrato del receptor. Cuenta las filas, revisa las propiedades del primer y último objeto y busca una muestra con comas, comillas, salto de línea, celda vacía, tilde y cero inicial. Compara el total con la hoja original. Si una API exige tipos, enums, fechas ISO o propiedades anidadas, valida después contra su esquema y prueba con datos ficticios.',
        'No envíes directamente una conversión completa a producción. Una columna omitida, encabezado renombrado o tipo inferido puede afectar muchos registros. Usa un entorno de prueba, limita el primer lote y conserva una relación entre fila de origen y respuesta del sistema. El convertidor no ejecuta importaciones, no llama endpoints y no confirma que identificadores sean únicos.',
      ],
    },
    {
      heading: 'Privacidad y límites del navegador',
      paragraphs: [
        'El análisis se ejecuta en memoria dentro de la pestaña. FunnyTools no recibe el CSV ni el JSON y no conserva un historial. Eso reduce exposición al servidor del sitio, pero el dispositivo, portapapeles, extensiones, sincronización o software corporativo siguen formando parte de tu entorno. Para información personal, credenciales o datos regulados utiliza solo equipos y procedimientos autorizados.',
        'No se cargan archivos, no hay procesamiento por streaming ni un límite contractual de tamaño. Un texto grande puede consumir memoria, congelar el teléfono o hacer lenta la vista. Prueba primero una muestra representativa y usa una herramienta de línea de comandos o pipeline controlado para millones de filas. La página no corrige automáticamente codificación, duplicados, columnas desalineadas, estructuras anidadas ni reglas de negocio.',
      ],
    },
  ],
  instructions: [
    'Exporta o copia una tabla con una primera fila de encabezados únicos.',
    'Pega una muestra sin secretos y elige detección automática o el separador documentado.',
    'Decide si debes conservar texto o inferir números y booleanos.',
    'Convierte y comprueba filas, columnas, delimitador, ceros iniciales y caracteres especiales.',
    'Copia o descarga el JSON y valídalo contra el esquema del sistema de destino.',
  ],
  examples: [
    'Preparar un pequeño catálogo tabular para una prueba de API.',
    'Convertir una exportación con punto y coma usada por una hoja en español.',
    'Pasar un TSV copiado desde una hoja de cálculo a objetos JSON.',
    'Comprobar campos con comas, comillas y saltos de línea antes de una migración.',
    'Mantener códigos postales y referencias con ceros iniciales como cadenas.',
  ],
  audience: [
    'Desarrollo y QA que preparan fixtures o payloads de prueba.',
    'Analistas que reciben exportaciones delimitadas y necesitan inspeccionarlas como JSON.',
    'Equipos de soporte que diagnostican encabezados, separadores y tipos.',
    'Estudiantes que comparan una tabla plana con un array de objetos.',
  ],
  caseStudies: [
    {
      title: 'Exportación española con punto y coma',
      description: 'Una tabla usa `precio;impuesto` porque los decimales contienen coma. El equipo fija punto y coma, confirma dos columnas y conserva los importes como texto hasta definir una conversión decimal explícita.',
    },
    {
      title: 'Código con cero inicial',
      description: 'El valor `00128` identifica una sucursal. Se deja desactivada la inferencia para que el JSON contenga `"00128"` y no el número `128`.',
    },
    {
      title: 'Descripción con salto de línea',
      description: 'Una celda entre comillas contiene dos párrafos. El parser la conserva en una propiedad; el recuento de filas permite comprobar que no se partió en dos registros.',
    },
  ],
  notes: [
    'La primera fila se usa como encabezados y las filas vacías se omiten.',
    'La detección contempla coma, punto y coma, tabulación y barra vertical.',
    'La inferencia de tipos está desactivada por defecto para conservar el texto.',
    'El resultado es un array de objetos planos; no se crean estructuras anidadas.',
    'JSON válido no equivale a cumplir el esquema o las reglas de una API.',
  ],
  faq: [
    {
      q: '¿Admite CSV separado por punto y coma?',
      a: 'Sí. Puedes dejar la detección automática o elegir punto y coma de forma explícita y comprobar el separador en el resumen.',
    },
    {
      q: '¿Conserva campos con comas y saltos de línea?',
      a: 'Sí, cuando el CSV usa correctamente comillas dobles. Las comillas literales deben duplicarse dentro del campo.',
    },
    {
      q: '¿Por qué 0012 puede convertirse en 12?',
      a: 'Solo ocurre si activas la inferencia de tipos. Déjala desactivada para códigos, teléfonos, referencias y cualquier valor cuya forma textual sea importante.',
    },
    {
      q: '¿Convierte archivos Excel XLSX?',
      a: 'No. Exporta la hoja como CSV o copia un rango tabular y verifica el separador antes de pegarlo.',
    },
    {
      q: '¿Crea objetos JSON anidados?',
      a: 'No. Cada encabezado se convierte en una clave literal de un objeto plano. El anidamiento requiere reglas de transformación posteriores.',
    },
    {
      q: '¿Los datos se suben al servidor?',
      a: 'No. La conversión ocurre en el navegador, aunque debes seguir las políticas de seguridad del dispositivo y de los datos.',
    },
  ],
  labels: {
    mode: 'csv-to-json',
    input: 'Entrada CSV o delimitada',
    output: 'Salida JSON',
    placeholder: 'id;nombre;ciudad\n001;Ana;Sevilla\n002;Luis;"Madrid, España"',
    convert: 'Convertir a JSON',
    copy: 'Copiar JSON',
    download: 'Descargar JSON',
    clear: 'Limpiar',
    delimiterLabel: 'Separador de entrada',
    delimiterAuto: 'Detectar automáticamente',
    delimiterComma: 'Coma (,)',
    delimiterSemicolon: 'Punto y coma (;)',
    delimiterTab: 'Tabulación',
    delimiterPipe: 'Barra vertical (|)',
    dynamicTypingLabel: 'Inferir números y booleanos',
    emptyInput: 'Pega datos CSV antes de convertir.',
    csvInvalid: 'El CSV contiene una estructura no válida',
    row: 'fila',
    summaryRows: 'Filas de datos',
    summaryColumns: 'Columnas',
    summaryDelimiter: 'Separador',
    fileName: 'datos-convertidos.json',
  },
  privacyNote: 'El CSV se analiza en esta pestaña y no se envía a FunnyTools. Evita pegar datos sensibles en dispositivos o navegadores no autorizados.',
  disclaimer: 'Comprueba encabezados, filas, tipos y codificación antes de importar el JSON. La herramienta no conoce el esquema ni las reglas del sistema de destino.',
};

export const spanishCsvToJsonReview = {
  heading: 'Cómo comprobar la conversión de CSV a JSON',
  intro: 'Una salida válida todavía puede esconder un separador incorrecto, una clave cambiada o un tipo que no corresponde al negocio.',
  panels: [
    { title: 'Cuenta la tabla', text: 'Compara filas y columnas con la fuente y revisa el delimitador detectado.' },
    { title: 'Protege el texto', text: 'Mantén desactivada la inferencia para códigos, teléfonos, referencias y ceros iniciales.' },
    { title: 'Valida el destino', text: 'Confirma nombres de propiedades, tipos, campos obligatorios y estructura contra el contrato real.' },
  ],
  checklistHeading: 'Lista de comprobación',
  checklist: [
    'Los encabezados son únicos, completos y tienen la caja esperada.',
    'Una celda con delimitador, comillas o salto de línea se conserva.',
    'Tildes, ñ, emoji y ceros iniciales llegan sin cambios.',
    'El total de objetos coincide con las filas que deben importarse.',
  ],
};

export const spanishJsonToCsv: ToolContent = {
  name: 'Convertir JSON a CSV online',
  short: 'Convierte un array de objetos planos en CSV con todas las columnas, separador configurable, protección opcional contra fórmulas y descarga UTF-8 con BOM.',
  long: 'Pega un array JSON cuyos elementos sean objetos planos. FunnyTools reúne las claves de todas las filas para no perder una columna que aparezca después del primer objeto, escapa comas, comillas y saltos de línea y genera CSV con coma o punto y coma. La protección para hojas de cálculo ante valores que parecen fórmulas y el BOM UTF-8 de la descarga vienen activados, pero puedes desactivarlos si el sistema receptor exige los datos exactos.',
  seoTitle: 'Convertir JSON a CSV online | Excel y UTF-8',
  seoDescription: 'Pasa un array JSON a CSV con coma o punto y coma, columnas completas, escape de fórmulas y descarga UTF-8 con BOM para Excel.',
  keywords: [
    'convertir JSON a CSV online',
    'conversor JSON a CSV',
    'pasar JSON a Excel CSV',
    'array JSON a CSV',
    'JSON a CSV punto y coma',
    'CSV UTF-8 con BOM',
    'exportar JSON a CSV',
  ],
  capabilities: [
    'Aceptar un array de objetos JSON planos y rechazar estructuras incompatibles.',
    'Reunir la unión de claves de todas las filas para construir el encabezado.',
    'Elegir coma, punto y coma, tabulación o barra vertical como delimitador.',
    'Escapar delimitadores, comillas y saltos de línea según el formato CSV.',
    'Proteger valores con apariencia de fórmula y añadir BOM UTF-8 al archivo descargado.',
  ],
  contentSections: [
    {
      heading: 'Respuesta rápida: cómo convertir JSON a CSV',
      paragraphs: [
        'Pega un array como `[{"id":"001","nombre":"Ana"},{"id":"002","nombre":"Luis"}]`, elige el separador y pulsa «Convertir a CSV». La primera línea contendrá los encabezados `id,nombre`; las siguientes representarán cada objeto. Si una propiedad aparece solo en objetos posteriores, esta versión la incluye igualmente en el conjunto de columnas y deja vacía la celda de las filas que no la tengan.',
        'El JSON debe ser válido y su raíz debe ser un array no vacío de objetos planos. Un objeto único, un array de números o una propiedad que contenga otro objeto o array se rechazan. Esa decisión evita presentar `[object Object]` como si fuera una conversión correcta. Primero aplana o normaliza estructuras anidadas con una regla que defina los nombres de columna.',
      ],
    },
    {
      heading: 'Objetos planos, columnas y valores ausentes',
      paragraphs: [
        'CSV representa una tabla rectangular: todas las filas comparten el mismo conjunto de columnas. JSON permite que cada objeto tenga claves diferentes. FunnyTools construye la unión de claves en orden de primera aparición. Si la primera fila tiene `id,nombre` y la segunda añade `país`, el encabezado será `id,nombre,país`; la primera fila tendrá una celda vacía en `país`.',
        'Una propiedad ausente y una propiedad con `null` pueden terminar visualmente como celdas vacías, por lo que el CSV no conserva toda la semántica de JSON. También se pierde la distinción nativa entre número, booleano y cadena: `12`, `true` y `"0012"` se convierten en texto tabular. Documenta qué significa vacío y define tipos al importar el archivo en el destino.',
      ],
      items: [
        'La raíz debe ser un array de objetos, no un objeto único.',
        'Las claves de todas las filas forman el encabezado.',
        'Objetos y arrays anidados se rechazan en vez de serializarse de forma ambigua.',
        'CSV no conserva tipos JSON ni un esquema formal.',
      ],
    },
    {
      heading: 'Coma o punto y coma para Excel y otros destinos',
      paragraphs: [
        'La coma es el delimitador interoperable más habitual. En configuraciones regionales donde la coma representa decimales, Excel puede esperar punto y coma al abrir un CSV directamente. Esta página permite escoger ambos, además de tabulación o barra vertical. El mejor separador no depende del idioma de la interfaz sino del contrato del sistema que leerá el archivo.',
        'Los valores que contienen el delimitador se escriben entre comillas dobles. Una comilla dentro del texto se duplica y un salto de línea permanece dentro de un campo entrecomillado. No necesitas eliminar signos de puntuación del contenido. Abre una descarga de prueba y confirma que la aplicación muestra el mismo número de columnas; si todo aparece en una sola, importa indicando el delimitador o genera otra variante.',
      ],
    },
    {
      heading: 'Protección frente a fórmulas CSV',
      paragraphs: [
        'Excel, LibreOffice y otras hojas pueden interpretar una celda que empieza por `=`, `+`, `-`, `@`, tabulación o retorno de carro como fórmula. Si el JSON contiene texto no confiable, abrir el CSV puede ejecutar una expresión o producir enlaces y cálculos inesperados. Con «Proteger celdas que parecen fórmulas» activado, Papa Parse antepone una comilla simple a esos valores.',
        'La protección modifica la representación de la celda: `=1+1` pasa a texto con prefijo. Es apropiada para revisión humana en una hoja, pero puede ser incorrecta si el archivo alimenta un sistema que necesita la cadena exacta o si los negativos son cantidades legítimas. Evalúa la procedencia y el receptor. Desactivar la opción no declara el archivo seguro; traslada la responsabilidad al flujo de importación.',
      ],
    },
    {
      heading: 'UTF-8, BOM y caracteres regionales',
      paragraphs: [
        'La salida se genera como texto Unicode. Al descargar, la opción BOM añade los bytes de identificación UTF-8 que ayudan a algunas versiones de Excel a reconocer tildes, `ñ` y otros alfabetos al abrir el archivo con doble clic. El BOM no cambia las celdas visibles en el cuadro y no es cifrado, firma ni validación.',
        'Algunos parsers técnicos no esperan BOM y pueden tratarlo como parte del primer encabezado. Para una API, base de datos o herramienta de línea de comandos, consulta la especificación y desactiva «Añadir BOM UTF-8» si exige UTF-8 sin marca. Si Excel sigue usando columnas incorrectas, el problema suele ser el delimitador, no la codificación; configura ambos de forma separada.',
      ],
    },
    {
      heading: 'Fechas, números largos y ceros iniciales',
      paragraphs: [
        'CSV no lleva metadatos de tipo. Una hoja puede convertir `00123` en `123`, un UUID en notación inesperada, una fecha ambigua según la región o un identificador largo en notación científica. El texto exportado puede ser correcto y aun así verse alterado al abrirlo. Importa columnas sensibles como texto y verifica una muestra antes de guardar desde la hoja.',
        'No agregues un apóstrofo a todo por rutina si el archivo será consumido por software, porque ese carácter puede convertirse en dato real. Define una estrategia por columna en el sistema de destino. Esta herramienta no aplica formatos de Excel, no crea XLSX y no controla cómo otra aplicación interpreta el CSV después de descargarlo.',
      ],
    },
    {
      heading: 'Saltos de línea, comillas y prueba de ida y vuelta',
      paragraphs: [
        'Un comentario con coma, comillas y varias líneas debe quedar como una sola celda entrecomillada. Comprueba al menos un caso complejo. La vista de texto puede mostrar varias líneas físicas dentro de una fila lógica; por eso contar solo saltos de línea no siempre equivale a contar registros. Usa un parser CSV o la importación de la hoja para validar.',
        'Una prueba de ida y vuelta consiste en convertir un pequeño JSON a CSV y volver a analizarlo. Sirve para comprobar encabezados y texto, pero no recuperará automáticamente tipos, `null`, objetos anidados ni diferencias entre propiedad ausente y celda vacía. No prometas una reversibilidad perfecta entre formatos con capacidades distintas.',
      ],
    },
    {
      heading: 'Privacidad, tamaño y control de calidad',
      paragraphs: [
        'La conversión y la descarga ocurren en el navegador; FunnyTools no recibe el JSON ni conserva el CSV. El portapapeles y el archivo quedan bajo el control del dispositivo. Evita datos reales si el equipo, las extensiones, la carpeta de descargas o la sincronización no están autorizados para esa información.',
        'La página está pensada para muestras y conjuntos manejables. Un array muy grande puede agotar memoria o bloquear un móvil. Para exportaciones masivas usa un proceso reproducible con logs, validación de esquema y manejo de errores por fila. Aquí no hay paginación, streaming, reglas de negocio, deduplicación ni confirmación de una importación posterior.',
      ],
    },
  ],
  instructions: [
    'Prepara un array JSON no vacío con objetos planos y conserva una copia de la fuente.',
    'Pega el JSON y elige el separador exigido por Excel o el sistema receptor.',
    'Decide si necesitas protección contra fórmulas y BOM UTF-8 en la descarga.',
    'Convierte y revisa filas, columnas, claves tardías, comillas y saltos de línea.',
    'Descarga una muestra, impórtala indicando tipos y confirma el resultado antes del lote completo.',
  ],
  examples: [
    'Abrir en Excel una respuesta de API formada por objetos planos.',
    'Exportar datos con punto y coma para una configuración regional concreta.',
    'Conservar una columna que aparece solo a partir del segundo objeto.',
    'Neutralizar texto de usuario que empieza por un signo de fórmula antes de revisarlo.',
    'Descargar nombres con tildes y ñ como CSV UTF-8 con BOM.',
  ],
  audience: [
    'Desarrollo y datos que necesitan inspeccionar una respuesta JSON en forma tabular.',
    'Analistas que preparan una muestra para Excel, LibreOffice o Google Sheets.',
    'Equipos de soporte que diagnostican delimitadores, codificación y columnas.',
    'Estudiantes que comparan objetos JSON con filas CSV.',
  ],
  caseStudies: [
    {
      title: 'Clave que aparece tarde',
      description: 'El tercer objeto añade `provincia`. El convertidor reúne todas las claves y conserva esa columna; las dos primeras filas quedan vacías en lugar de perder el dato.',
    },
    {
      title: 'Comentario que parece fórmula',
      description: 'Un campo aportado por un usuario comienza por `=HYPERLINK`. Para revisión en una hoja se mantiene activado el escape de fórmulas y la celda se trata como texto.',
    },
    {
      title: 'Excel con caracteres españoles',
      description: 'El equipo selecciona punto y coma y mantiene el BOM. Abre una muestra con `Málaga` y `Peña`, confirma codificación y columnas antes de compartir el lote.',
    },
  ],
  notes: [
    'Solo se aceptan arrays no vacíos de objetos planos.',
    'Las columnas se obtienen de todas las filas, no únicamente de la primera.',
    'La protección de fórmulas y el BOM están activados por defecto en la página española.',
    'CSV pierde tipos, anidamiento y parte de la diferencia entre ausente, vacío y null.',
    'La descarga es CSV UTF-8, no un libro XLSX con formato de columnas.',
  ],
  faq: [
    {
      q: '¿Por qué exige un array de objetos?',
      a: 'Porque cada objeto corresponde a una fila y sus claves a columnas. Un objeto único o datos anidados necesitan una regla de normalización antes de formar una tabla.',
    },
    {
      q: '¿Incluye claves que no aparecen en el primer objeto?',
      a: 'Sí. La herramienta reúne las claves de todos los objetos y deja vacías las celdas donde una propiedad no existe.',
    },
    {
      q: '¿Puedo crear CSV con punto y coma?',
      a: 'Sí. Elige punto y coma en el selector y confirma que la aplicación receptora espera ese delimitador.',
    },
    {
      q: '¿Qué hace la protección de fórmulas?',
      a: 'Añade una comilla simple delante de valores que una hoja podría interpretar como fórmula. Modifica la representación, por lo que debes decidir según el destino.',
    },
    {
      q: '¿Para qué sirve el BOM UTF-8?',
      a: 'Ayuda a ciertas versiones de Excel a reconocer UTF-8 al abrir el archivo. Algunos parsers técnicos no lo quieren y pueden requerir que desactives la opción.',
    },
    {
      q: '¿Convierte objetos anidados?',
      a: 'No. Los rechaza para evitar una salida ambigua. Aplana la estructura con nombres y reglas definidos por tu proyecto.',
    },
  ],
  labels: {
    mode: 'json-to-csv',
    input: 'Entrada JSON',
    output: 'Salida CSV',
    placeholder: '[\n  {"id":"001","nombre":"Ana","ciudad":"Sevilla"},\n  {"id":"002","nombre":"Luis","ciudad":"Madrid"}\n]',
    convert: 'Convertir a CSV',
    copy: 'Copiar CSV',
    download: 'Descargar CSV',
    clear: 'Limpiar',
    delimiterLabel: 'Separador de salida',
    delimiterAuto: 'Coma (predeterminado)',
    delimiterComma: 'Coma (,)',
    delimiterSemicolon: 'Punto y coma (;)',
    delimiterTab: 'Tabulación',
    delimiterPipe: 'Barra vertical (|)',
    escapeFormulaeLabel: 'Proteger celdas que parecen fórmulas',
    bomLabel: 'Añadir BOM UTF-8 al descargar',
    emptyInput: 'Pega un array JSON antes de convertir.',
    invalidJson: 'La entrada no es JSON válido.',
    arrayRequired: 'La raíz debe ser un array no vacío de objetos JSON.',
    flatObjectsOnly: 'true',
    nestedNotSupported: 'Los objetos y arrays anidados no se convierten. Aplana los datos antes de crear el CSV.',
    emptyArray: 'El array debe contener al menos un objeto con una propiedad.',
    summaryRows: 'Filas de datos',
    summaryColumns: 'Columnas',
    summaryDelimiter: 'Separador',
    fileName: 'datos-convertidos.csv',
  },
  privacyNote: 'El JSON se convierte y el archivo se crea dentro de este navegador. FunnyTools no recibe ni guarda los datos.',
  disclaimer: 'CSV no conserva tipos ni anidamiento. Revisa fórmulas, BOM, delimitador y formato de columnas en la aplicación de destino antes de usar datos reales.',
};

export const spanishJsonToCsvReview = {
  heading: 'Cómo comprobar la conversión de JSON a CSV',
  intro: 'El archivo debe conservar columnas y texto, y además ser compatible con la aplicación que lo abrirá.',
  panels: [
    { title: 'Revisa columnas', text: 'Comprueba claves que aparecen tarde, orden del encabezado y celdas vacías.' },
    { title: 'Controla la hoja', text: 'Decide delimitador, BOM, tipos de columna y protección frente a fórmulas.' },
    { title: 'Prueba una muestra', text: 'Importa unas filas con tildes, comillas, saltos y ceros iniciales antes del lote.' },
  ],
  checklistHeading: 'Lista de comprobación',
  checklist: [
    'Cada elemento del array es un objeto plano.',
    'El encabezado incluye todas las propiedades necesarias.',
    'La hoja muestra el número esperado de filas y columnas.',
    'Los valores sensibles no se reinterpretan como fórmulas, fechas o notación científica.',
  ],
};

export const spanishMarkdownPreviewer: ToolContent = {
  name: 'Editor Markdown online con vista previa',
  short: 'Escribe Markdown y revisa al instante encabezados, listas, enlaces, tablas, tareas y código en una vista HTML saneada.',
  long: 'Edita Markdown en el panel izquierdo y observa el resultado en el derecho. El navegador convierte el texto con Marked y limpia el HTML con DOMPurify antes de insertarlo en la página. Puedes copiar el fragmento saneado o descargar un documento HTML completo con UTF-8 y estilos básicos. La vista sirve para README, documentación y borradores, pero no reproduce todas las extensiones de GitHub, un CMS, Mermaid, LaTeX ni el resaltado de sintaxis.',
  seoTitle: 'Editor Markdown online | Vista previa y HTML seguro',
  seoDescription: 'Editor Markdown online con vista previa en vivo. Revisa README, tablas, tareas y código; copia HTML saneado o descarga un documento UTF-8.',
  keywords: [
    'editor Markdown online',
    'vista previa Markdown',
    'previsualizar Markdown online',
    'Markdown a HTML',
    'editor README online',
    'visor Markdown',
    'copiar HTML de Markdown',
  ],
  capabilities: [
    'Actualizar una vista previa HTML mientras escribes Markdown.',
    'Renderizar encabezados, énfasis, listas, citas, enlaces, imágenes, tablas y bloques de código.',
    'Limpiar elementos y atributos peligrosos antes de mostrar el HTML.',
    'Impedir que un clic en un enlace de la vista previa abandone la herramienta.',
    'Copiar el fragmento HTML saneado o descargar un documento HTML completo en UTF-8.',
  ],
  contentSections: [
    {
      heading: 'Respuesta rápida: previsualizar Markdown',
      paragraphs: [
        'Escribe o pega Markdown en el panel de edición. La vista de la derecha se actualiza sin pulsar un botón. Prueba `# Título`, `**negrita**`, una lista con `-`, un enlace `[texto](https://ejemplo.com)` o un bloque encerrado por tres acentos graves. Cuando la estructura sea correcta, copia el HTML limpio o descarga un archivo que incluye `doctype`, UTF-8, viewport y estilos básicos.',
        'El texto inicial está en español y puede sustituirse por completo. La página no abre archivos `.md`, no guarda versiones y no sincroniza con GitHub. Conserva el original en tu editor o repositorio. Recargar la página elimina el borrador porque no se guarda en una cuenta, base de datos ni almacenamiento persistente.',
      ],
    },
    {
      heading: 'Sintaxis compatible y diferencias entre dialectos',
      paragraphs: [
        'Marked interpreta Markdown común y, con su configuración predeterminada, varias convenciones de GitHub Flavored Markdown como tablas, listas de tareas y tachado. CommonMark define bloques como encabezados, párrafos, citas, listas y código, además de elementos en línea como énfasis, enlaces e imágenes. Una línea en blanco y la sangría pueden cambiar la estructura; revisa tanto el resultado como los símbolos escritos.',
        'Markdown no es un único formato idéntico en todas las plataformas. GitHub, GitLab, Obsidian, Discord, Notion y distintos CMS añaden o restringen funciones. Esta página no procesa Mermaid, matemáticas LaTeX, notas al pie de cada plataforma, wikilinks, embeds de Obsidian, shortcodes ni componentes MDX. Una vista correcta aquí no garantiza una salida idéntica en el destino.',
      ],
      items: [
        'Encabezados ATX de `#` a `######` y encabezados subrayados.',
        'Negrita, cursiva, tachado, código en línea, citas y separadores.',
        'Listas ordenadas, listas con viñetas y casillas de tarea.',
        'Enlaces, imágenes, tablas y bloques de código sin resaltado automático.',
      ],
    },
    {
      heading: 'Markdown a HTML y saneamiento',
      paragraphs: [
        'Marked convierte el Markdown a una cadena HTML, pero su documentación advierte que no sanea esa salida. Por eso FunnyTools pasa el resultado por DOMPurify antes de insertarlo. El saneamiento elimina elementos, atributos o URL que puedan crear ejecución de script en el contexto del navegador. Un ejemplo con `<script>` o un atributo `onerror` no debe ejecutarse en la vista.',
        'Saneado no significa que el texto sea verdadero, accesible, legal o apropiado para publicar. Un enlace HTTPS puede apuntar a una página engañosa; una imagen remota puede revelar una solicitud al servidor que la aloja; el contenido puede incluir datos personales. Revisa destinos, permisos, texto alternativo y derechos de uso. No pegues secretos con la expectativa de que DOMPurify los ocultará.',
      ],
    },
    {
      heading: 'HTML sin procesar dentro de Markdown',
      paragraphs: [
        'Algunos dialectos permiten etiquetas HTML crudas dentro del Markdown. Marked puede interpretarlas y DOMPurify conserva únicamente la parte que considera segura según su configuración. Como consecuencia, una etiqueta o atributo personalizado puede desaparecer. Esto es intencional en una vista pública y puede diferir de un CMS que permita componentes propios.',
        'No uses esta página para comprobar plantillas con JavaScript, formularios, iframes, estilos complejos o componentes web. Tampoco evalúa React, Astro, Vue, MDX ni código incluido en bloques. Un bloque con `javascript` se muestra como texto dentro de `code`; no se ejecuta ni obtiene resaltado por lenguaje.',
      ],
    },
    {
      heading: 'README, documentación y jerarquía',
      paragraphs: [
        'Para un README, comienza con un solo título principal, explica el propósito en un párrafo breve y organiza instalación, uso, configuración, pruebas y licencia con encabezados descendentes. Evita saltar niveles solo para conseguir un tamaño visual. Los enlaces relativos, badges e imágenes dependen de la ruta final del repositorio y pueden no resolverse igual en esta página.',
        'La vista ayuda a detectar listas rotas, código fuera de su bloque, tablas sin separador y párrafos unidos. También conviene leer el texto sin formato: Markdown debe seguir siendo comprensible como fuente. Un documento accesible usa texto de enlace descriptivo, texto alternativo útil y tablas solo para datos tabulares, no para maquetar columnas.',
      ],
    },
    {
      heading: 'Tablas, listas de tareas y código',
      paragraphs: [
        'Una tabla necesita una fila de encabezados y otra con guiones, por ejemplo `| Campo | Valor |` seguida de `| --- | --- |`. Las barras dentro de una celda requieren escape según el contexto. Las listas de tareas usan `- [ ]` y `- [x]`; la vista muestra casillas, pero no guarda cambios interactivos como estado de proyecto.',
        'Los bloques de código se delimitan con tres acentos graves y pueden llevar una etiqueta como `js` o `bash`. Esta implementación conserva la clase informativa generada por el parser, pero no carga una biblioteca de resaltado. El HTML descargado incluye estilos para `pre` y `code`, no coloreado semántico. Comprueba que las vallas estén cerradas para no convertir el resto del documento en código.',
      ],
    },
    {
      heading: 'Enlaces e imágenes en la vista previa',
      paragraphs: [
        'Los enlaces se renderizan, pero esta herramienta evita la navegación al hacer clic dentro del panel para que una prueba no te saque de la página. Copia la URL y verifícala por separado antes de publicar. Las rutas relativas como `./docs/guia.md` no conocen la ubicación futura del archivo y pueden apuntar a una dirección distinta aquí.',
        'Las imágenes remotas pueden generar solicitudes desde el navegador al dominio indicado. No uses URL privadas, tokens firmados o recursos que no deban consultarse. Añade texto alternativo con `![descripción](url)` y confirma tamaño y licencia en el destino. El saneamiento no descarga, optimiza ni incorpora la imagen al HTML.',
      ],
    },
    {
      heading: 'Copiar fragmento y descargar documento HTML',
      paragraphs: [
        '«Copiar HTML» envía al portapapeles solo el fragmento saneado de la vista, apropiado para inspeccionar o pegar en un editor que acepte HTML. No incluye estilos de FunnyTools ni una página completa. Al pegar en un CMS, su propio saneador puede eliminar más etiquetas o cambiar clases.',
        '«Descargar HTML» crea un documento autónomo con declaración HTML5, codificación UTF-8, viewport y CSS básico para texto, código, tablas, citas e imágenes. Los recursos enlazados siguen siendo externos y las rutas relativas siguen necesitando un contexto. Revisa el archivo fuera de línea y no lo confundas con una publicación en el sitio final.',
      ],
    },
    {
      heading: 'Privacidad, rendimiento y límites',
      paragraphs: [
        'El Markdown se procesa en esta pestaña y no se envía a FunnyTools ni se guarda como borrador. El contenido copiado o descargado sí pasa al portapapeles o sistema de archivos del dispositivo. Sigue las reglas de tu organización y utiliza datos ficticios si no controlas extensiones, sincronización o historial.',
        'Documentos muy grandes pueden hacer lenta la actualización en cada pulsación. Divide manuales extensos o usa el generador de documentación del proyecto para enlaces, índices y pruebas completas. La herramienta no revisa ortografía, enlaces rotos, accesibilidad automática, frontmatter YAML, metadatos SEO, estilos del CMS ni validez de un repositorio.',
      ],
    },
  ],
  instructions: [
    'Conserva el archivo original y pega una copia del Markdown en el editor.',
    'Revisa jerarquía de encabezados, listas, tablas, citas, enlaces, imágenes y código.',
    'Prueba contenido HTML no confiable y confirma que no se ejecutan scripts ni atributos peligrosos.',
    'Copia el fragmento saneado o descarga el documento HTML completo según el destino.',
    'Haz una vista previa final en GitHub, CMS o plataforma real porque cada dialecto puede variar.',
  ],
  examples: [
    'Revisar un README antes de hacer commit en un repositorio.',
    'Comprobar una tabla y una lista de tareas para documentación técnica.',
    'Convertir un borrador Markdown a un fragmento HTML saneado.',
    'Detectar una valla de código sin cerrar o una lista con sangría incorrecta.',
    'Preparar una página HTML simple para lectura local, sin publicar el contenido.',
  ],
  audience: [
    'Desarrollo y documentación que preparan README y guías técnicas.',
    'Estudiantes que aprenden la relación entre sintaxis Markdown y HTML.',
    'Edición y contenidos que redactan para CMS compatibles con Markdown.',
    'Equipos de soporte que revisan tablas, listas, enlaces y bloques de código.',
  ],
  caseStudies: [
    {
      title: 'README antes del commit',
      description: 'Una persona pega instalación, uso y ejemplos. La vista revela que una valla sin cerrar convirtió la licencia en código; corrige la fuente y valida después en GitHub.',
    },
    {
      title: 'HTML peligroso en un borrador',
      description: 'Un fragmento contiene un atributo de evento. Marked genera HTML y DOMPurify elimina la parte peligrosa antes de mostrarla; el equipo conserva además su saneamiento del lado servidor.',
    },
    {
      title: 'Tabla para un CMS',
      description: 'La tabla se ve bien en FunnyTools, pero el CMS no admite la misma extensión. Se prueba en el destino y se sustituye por una lista accesible en lugar de asumir equivalencia.',
    },
  ],
  notes: [
    'La salida de Marked se sanea con DOMPurify antes de insertarse o exportarse.',
    'No se admiten Mermaid, LaTeX, MDX, wikilinks ni extensiones específicas de cada plataforma.',
    'Los bloques de código no ejecutan ni resaltan automáticamente el lenguaje.',
    'Los clics en enlaces de la vista se bloquean; verifica cada destino por separado.',
    'El borrador no se guarda y desaparece al recargar la página.',
  ],
  faq: [
    {
      q: '¿La vista previa es igual a GitHub?',
      a: 'No necesariamente. Comparte muchas convenciones, incluidas tablas y tareas, pero GitHub y otras plataformas aplican extensiones, estilos y saneamiento propios.',
    },
    {
      q: '¿Se permite HTML dentro del Markdown?',
      a: 'Marked puede interpretarlo, pero DOMPurify elimina elementos y atributos peligrosos. Un componente personalizado también puede desaparecer.',
    },
    {
      q: '¿Ejecuta JavaScript de un bloque de código?',
      a: 'No. Los bloques se muestran como texto. Tampoco se incluye resaltado de sintaxis por lenguaje.',
    },
    {
      q: '¿Admite Mermaid o fórmulas LaTeX?',
      a: 'No. Esas extensiones requieren renderizadores adicionales y no forman parte de esta herramienta.',
    },
    {
      q: '¿Qué contiene el HTML descargado?',
      a: 'Un documento HTML5 completo en UTF-8 con el fragmento saneado y estilos básicos. Los enlaces e imágenes siguen dependiendo de sus URL.',
    },
    {
      q: '¿Se guarda mi borrador?',
      a: 'No. Se procesa en memoria y desaparece al recargar. Guarda la fuente en tu editor, repositorio o sistema autorizado.',
    },
  ],
  labels: {
    input: 'Markdown',
    preview: 'Vista previa HTML',
    copyHtml: 'Copiar HTML saneado',
    download: 'Descargar HTML',
    starter: '## Vista previa de Markdown\n\nEscribe **Markdown** aquí.\n\n- Elemento uno\n- Elemento dos\n\n```js\nconsole.log("hola");\n```',
    renderError: 'No se pudo renderizar este contenido Markdown.',
    loadError: 'No se pudieron cargar las bibliotecas de vista previa.',
    documentTitle: 'Vista previa de Markdown',
    documentLanguage: 'es',
    fileName: 'vista-previa-markdown.html',
  },
  privacyNote: 'El Markdown se convierte y sanea en este navegador. FunnyTools no guarda el borrador ni el HTML generado.',
  disclaimer: 'Cada plataforma usa un dialecto y saneamiento propios. Verifica la fuente en el repositorio o CMS final antes de publicar.',
};

export const spanishMarkdownPreviewerReview = {
  heading: 'Cómo comprobar una vista previa Markdown',
  intro: 'El aspecto es una parte de la revisión; también importan el dialecto del destino, la seguridad, los enlaces y la accesibilidad.',
  panels: [
    { title: 'Revisa estructura', text: 'Confirma encabezados, sangría, tablas, tareas y vallas de código cerradas.' },
    { title: 'Comprueba seguridad', text: 'El saneamiento del navegador no sustituye el control del CMS o servidor que publicará.' },
    { title: 'Prueba en destino', text: 'GitHub, un CMS y otras aplicaciones pueden renderizar extensiones y estilos diferentes.' },
  ],
  checklistHeading: 'Lista de comprobación',
  checklist: [
    'Hay una jerarquía comprensible de encabezados y listas.',
    'Los enlaces, rutas relativas, imágenes y texto alternativo están verificados.',
    'No se depende de Mermaid, LaTeX, MDX u otra extensión no compatible.',
    'El HTML copiado o descargado se revisa en el entorno donde se publicará.',
  ],
};
