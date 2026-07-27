import type { ToolContent } from '../tools/_types';

export const spanishRotatePdf: ToolContent = {
  name: 'Rotar páginas de un PDF online',
  short: 'Corrige páginas de lado o boca abajo girando todo el PDF o solo los números que indiques.',
  long: 'Carga un PDF, comprueba cuántas páginas contiene y aplica un giro horario de 90, 180 o 270 grados a todas las páginas o a una selección como 2, 5-7. La rotación se guarda en una copia nueva y se suma a la orientación que ya tenía cada página. El archivo se procesa en este navegador, sin subirlo a FunnyTools. No muestra miniaturas, no endereza ángulos pequeños y no cambia el orden ni el contenido del documento.',
  seoTitle: 'Rotar PDF online: girar páginas 90°, 180° o 270°',
  seoDescription: 'Gira todas o algunas páginas de un PDF 90, 180 o 270 grados. Procesamiento local, rangos de páginas y descarga sin registro.',
  keywords: [
    'rotar PDF online',
    'girar PDF',
    'rotar páginas PDF',
    'girar una página PDF',
    'PDF de horizontal a vertical',
    'rotar PDF 90 grados',
    'corregir PDF escaneado',
  ],
  capabilities: [
    'Analizar un PDF y mostrar el número total de páginas antes de modificarlo.',
    'Girar todas las páginas o una selección escrita con números y rangos.',
    'Aplicar 90, 180 o 270 grados en sentido horario sobre la rotación existente.',
    'Mantener el mismo número y orden de páginas en la copia descargada.',
    'Procesar el documento en la memoria del navegador sin enviarlo a FunnyTools.',
  ],
  contentSections: [
    {
      heading: 'Respuesta rápida: cómo girar un PDF y guardar el cambio',
      paragraphs: [
        'Selecciona el PDF y pulsa «Analizar PDF» para confirmar el número de páginas. Elige si quieres girarlas todas o solo algunas. Para una selección, escribe valores como 2, 5-7: la página 2 y las páginas 5, 6 y 7 recibirán el giro. Escoge 90°, 180° o 270°, genera la copia y ábrela para comprobar cada página afectada.',
        'El cambio se guarda en un PDF nuevo; no es la rotación temporal que algunos visores aplican solo mientras lees. Esta versión suma el ángulo elegido a la rotación que ya declara cada página. Por ejemplo, una página que ya estaba a 90° y recibe otros 270° vuelve a 0°. Conserva el original para poder comparar o repetir la operación.',
      ],
    },
    {
      heading: 'Qué significan 90, 180 y 270 grados',
      paragraphs: [
        'Los ángulos de la herramienta avanzan en sentido horario. Noventa grados lleva la parte superior hacia la derecha; 180° pone la página boca abajo; 270° equivale visualmente a girar 90° hacia la izquierda. Si un escaneo está de lado, una de las opciones 90° o 270° será la correcta. Si está invertido, normalmente corresponde 180°.',
        'La orientación vertical u horizontal no se elige con un interruptor independiente: resulta del tamaño de la página y del ángulo acumulado. Tampoco se modifica el MediaBox ni se recorta el lienzo. Esta herramienta cambia la propiedad de rotación de la página; no reconstruye los píxeles, no corrige perspectiva y no endereza inclinaciones de 1° o 3°.',
      ],
      items: [
        '90°: un cuarto de vuelta en sentido horario.',
        '180°: media vuelta; útil para páginas boca abajo.',
        '270°: tres cuartos de vuelta en sentido horario, equivalente a 90° a la izquierda.',
        '0°: se obtiene cuando la suma de la orientación anterior y el nuevo giro completa 360°.',
      ],
    },
    {
      heading: 'Cómo escribir páginas y rangos sin equivocarse',
      paragraphs: [
        'La numeración empieza en 1 y se refiere al orden real de páginas del archivo, no necesariamente al número impreso en el pie. Puedes combinar páginas sueltas y rangos ascendentes separados por comas: `1, 3-5, 9`. Los espacios alrededor de comas o guiones se aceptan. Un rango como 7-4, el cero, una página superior al total o texto libre produce un error.',
        'Las páginas repetidas se tratan una sola vez porque la selección se convierte en un conjunto. La herramienta no acepta palabras como pares, impares, última o todas dentro del campo; para todo el documento debes elegir la opción «Todas las páginas». Como no hay miniaturas, abre el original en otra pestaña y apunta los números antes de exportar.',
      ],
    },
    {
      heading: 'Rotar no es reordenar, recortar ni convertir',
      paragraphs: [
        'Rotar conserva el número de páginas y su secuencia. Reordenar cambia qué página va primero; eliminar quita páginas; extraer crea una copia con solo las elegidas; recortar modifica el área visible. Son operaciones distintas. Si un escaneo tiene orientación incorrecta y además está en el lugar equivocado, corrige primero el giro y después utiliza el reordenador en una copia verificada.',
        'El contenido sigue siendo PDF. Una fotografía escaneada no adquiere OCR, el texto no se vuelve seleccionable y una hoja A4 no se convierte en Carta. Tampoco se reduce el peso de forma garantizada. El guardado puede reorganizar internamente el archivo y cambiar su tamaño aunque el aspecto de las páginas no cambie.',
      ],
    },
    {
      heading: 'Firmas, formularios, marcadores y documentos protegidos',
      paragraphs: [
        'Modificar y volver a guardar un PDF puede invalidar una firma digital o alterar la comprobación de integridad. Los formularios, comentarios, enlaces, marcadores, capas, adjuntos o características avanzadas no se prueban de forma exhaustiva en cada archivo. Un PDF cifrado, con contraseña o con restricciones puede no abrirse o no conservar todo lo esperado.',
        'No uses esta página como única herramienta para expedientes firmados, certificados, PDF/A, documentos legales o flujos de imprenta. Trabaja sobre una copia, abre el resultado en el lector final y verifica firmas, campos, enlaces, accesibilidad, tamaño de página y preimpresión. Si alguna propiedad es crítica, utiliza software especializado que pueda validarla.',
      ],
    },
    {
      heading: 'Privacidad, memoria y comprobación final',
      paragraphs: [
        'El navegador lee el PDF y genera la descarga localmente mediante una biblioteca incluida en la aplicación. FunnyTools no recibe el contenido para efectuar la rotación. La página web sí realiza sus conexiones normales para cargarse y puede incluir analítica o publicidad según la política general; esas conexiones no contienen las páginas del PDF.',
        'No hay un límite fijo mostrado por el componente, pero el documento debe caber varias veces en la memoria disponible durante la lectura y el guardado. Un móvil puede fallar antes que un ordenador con archivos muy grandes. Al terminar, comprueba total de páginas, orden, orientación de cada página seleccionada, texto, imágenes, campos, enlaces, firma y tamaño del archivo.',
      ],
    },
  ],
  instructions: [
    'Selecciona una copia del PDF y pulsa «Analizar PDF» para comprobar el total de páginas.',
    'Elige «Todas las páginas» o «Páginas concretas»; en este caso escribe, por ejemplo, 2, 5-7.',
    'Selecciona 90°, 180° o 270° en sentido horario según la orientación que necesitas.',
    'Pulsa «Rotar y descargar PDF» y espera a que el navegador genere la copia.',
    'Abre la descarga y revisa las páginas afectadas, el orden, firmas, campos y enlaces.',
  ],
  examples: [
    'Corregir todas las páginas de un escaneo dúplex que quedaron boca abajo.',
    'Girar solo una hoja horizontal dentro de un informe mayoritariamente vertical.',
    'Arreglar las páginas 2 y 5-7 de un PDF combinado desde varias fuentes.',
    'Orientar correctamente un formulario fotografiado antes de entregarlo.',
    'Preparar una copia legible para móvil sin alterar el orden del documento.',
  ],
  audience: [
    'Personas que reciben escaneos de lado o boca abajo.',
    'Estudiantes que deben corregir anexos antes de una entrega.',
    'Oficinas que combinan documentos con orientaciones diferentes.',
    'Usuarios que prefieren procesar el archivo localmente y sin registro.',
  ],
  caseStudies: [
    {
      title: 'Una sola página horizontal en un contrato',
      description: 'El PDF tiene ocho páginas y la cuarta aparece de lado. Se analiza el archivo, se eligen páginas concretas, se escribe 4 y se prueba 90°. La copia conserva ocho páginas y se vuelve a revisar la firma antes de compartirla.',
    },
    {
      title: 'Escaneo dúplex invertido',
      description: 'Todas las caras posteriores quedaron boca abajo. Los números se anotan desde el visor, se introducen como 2, 4, 6, 8 y se aplican 180°. Después se recorre el documento completo para confirmar que ninguna página frontal cambió.',
    },
    {
      title: 'Página que ya tenía una rotación previa',
      description: 'Una hoja declara 90° pero debe volver a su orientación inicial. Se le aplican 270°, ya que la herramienta suma el giro. La descarga se compara con el original y se conserva ambas versiones.',
    },
  ],
  notes: [
    'La rotación se suma a la orientación existente y siempre se normaliza dentro de 0–359 grados.',
    'La selección admite páginas sueltas y rangos ascendentes como 1, 3-5, 9; no muestra miniaturas.',
    'Girar no cambia orden, número de páginas, tamaño del lienzo, OCR ni perspectiva.',
    'PDF con contraseña, firma o funciones avanzadas requiere una revisión adicional.',
    'El archivo debe caber en la memoria del navegador; conserva siempre el original.',
  ],
  faq: [
    {
      q: '¿Cómo rotar una sola página de un PDF?',
      a: 'Selecciona Páginas concretas, escribe el número de esa página, elige el ángulo y descarga la copia.',
    },
    {
      q: '¿Qué opción gira el PDF hacia la izquierda?',
      a: 'Elige 270 grados en sentido horario; visualmente equivale a 90 grados hacia la izquierda.',
    },
    {
      q: '¿Puedo escribir varios rangos?',
      a: 'Sí. Usa comas y rangos ascendentes, por ejemplo 1, 3-5, 9. Los números deben existir en el PDF.',
    },
    {
      q: '¿La rotación queda guardada?',
      a: 'Sí. Se crea un PDF nuevo con la rotación aplicada; no es solo un cambio temporal del visor.',
    },
    {
      q: '¿También endereza páginas ligeramente inclinadas?',
      a: 'No. Solo aplica 90, 180 o 270 grados; no corrige perspectiva ni inclinaciones pequeñas.',
    },
    {
      q: '¿El PDF se sube a FunnyTools?',
      a: 'No. La lectura, la rotación y la descarga se realizan en la memoria de este navegador.',
    },
  ],
  labels: {
    localNote: 'El PDF se procesa en este navegador y no se sube a FunnyTools.',
    upload: 'Seleccionar un archivo PDF',
    scope: 'Páginas que se van a girar',
    allPages: 'Todas las páginas',
    customPages: 'Páginas concretas',
    angle: 'Giro horario',
    deg90: '90 grados',
    deg180: '180 grados',
    deg270: '270 grados',
    pagesLabel: 'Números de página',
    rangesPlaceholder: 'Ejemplo: 2, 5-7',
    analyze: 'Analizar PDF',
    rotate: 'Rotar y descargar PDF',
    reset: 'Borrar todo',
    processing: 'Procesando el PDF en este navegador…',
    pageCount: 'El PDF contiene {count} páginas.',
    downloaded: 'La descarga del PDF rotado ha comenzado.',
    noFile: 'Selecciona primero un archivo PDF.',
    pdfOnly: 'Selecciona un archivo con formato PDF.',
    loadError: 'No se ha podido abrir el PDF. Puede estar dañado, cifrado o ser demasiado grande.',
    emptyRange: 'Escribe al menos un número de página.',
    invalidRange: 'Revisa los números y utiliza rangos válidos como 2, 5-7.',
    rotateError: 'No se ha podido rotar el PDF. Revisa el archivo y la selección.',
  },
  privacyNote: 'El documento se lee, modifica y guarda en la memoria de este navegador. FunnyTools no recibe ni conserva las páginas del PDF. Los datos desaparecen al borrar, recargar o cerrar la pestaña.',
  disclaimer: 'Revisa la descarga antes de utilizarla. La herramienta no valida firmas, formularios, PDF/A, accesibilidad, impresión ni requisitos legales, y no sustituye un editor especializado.',
};

export const spanishRotatePdfReview = {
  heading: 'Cómo comprobar un PDF rotado',
  intro: 'La orientación visible es solo una parte de la revisión: el documento completo debe seguir siendo utilizable.',
  panels: [
    {
      title: 'Recorre todas las páginas',
      text: 'Confirma que solo cambiaron las páginas previstas y que ninguna hoja quedó de lado o boca abajo.',
    },
    {
      title: 'Comprueba funciones',
      text: 'Prueba texto, enlaces, campos, comentarios y firmas en el lector que utilizará el destinatario.',
    },
    {
      title: 'Conserva el original',
      text: 'No reemplaces el único ejemplar; una nueva escritura puede afectar propiedades avanzadas.',
    },
  ],
  checklistHeading: 'Lista de comprobación',
  checklist: [
    'El total y el orden de páginas no han cambiado.',
    'Cada página seleccionada tiene la orientación esperada.',
    'Texto, imágenes, enlaces y campos siguen funcionando.',
    'El original permanece guardado y la copia abre en el destino.',
  ],
};

export const spanishDeletePdfPages: ToolContent = {
  name: 'Eliminar páginas de un PDF online',
  short: 'Quita páginas en blanco, duplicadas o innecesarias indicando sus números y descarga una copia nueva.',
  long: 'Esta herramienta elimina del resultado las páginas que escribas, por ejemplo 2, 5-7, y conserva las demás en su orden original. Primero puedes analizar el PDF para conocer el total. No altera el archivo seleccionado y no permite borrar todas las páginas, porque el resultado debe seguir siendo un PDF con al menos una hoja. El trabajo se realiza en el navegador, sin subir el documento a FunnyTools.',
  seoTitle: 'Eliminar páginas PDF online: borrar hojas',
  seoDescription: 'Borra páginas concretas o rangos de un PDF, como 2, 5-7. Crea una copia local con las páginas restantes, gratis y sin registro.',
  keywords: [
    'eliminar páginas PDF',
    'borrar páginas de un PDF',
    'quitar páginas PDF',
    'eliminar hoja en blanco PDF',
    'borrar una página PDF',
    'eliminar páginas PDF online gratis',
    'quitar páginas de un documento PDF',
  ],
  capabilities: [
    'Leer el número total de páginas antes de decidir qué hojas quitar.',
    'Aceptar páginas sueltas y rangos ascendentes separados por comas.',
    'Crear un PDF nuevo con todas las páginas no seleccionadas en su orden original.',
    'Impedir un resultado vacío cuando se intentan eliminar todas las páginas.',
    'Procesar el archivo en el navegador sin enviarlo a FunnyTools.',
  ],
  contentSections: [
    {
      heading: 'Respuesta rápida: cómo borrar páginas de un PDF',
      paragraphs: [
        'Selecciona el PDF, pulsa «Analizar PDF» y abre el original en un visor para identificar la numeración correcta. Escribe solo las páginas que deseas quitar: `2, 5-7` elimina la 2 y las páginas 5, 6 y 7. Pulsa «Eliminar y descargar PDF» y revisa la copia. El original elegido no se sobrescribe.',
        'La operación funciona por exclusión: todo lo que no aparezca en el campo se conserva. Si un documento tiene cien páginas y solo necesitas compartir tres, normalmente es más seguro usar «Extraer páginas» e indicar las tres que quieres mantener. Si solo sobran dos hojas, eliminar esas dos suele ser más claro.',
      ],
    },
    {
      heading: 'Página del visor frente a número impreso',
      paragraphs: [
        'El número que debes escribir es la posición de la página dentro del archivo, empezando por 1. Una portada sin numeración puede ser la página 1 del PDF aunque la siguiente hoja muestre “1” impreso. Los índices, anexos o numeraciones romanas también pueden desplazar la correspondencia. La herramienta no lee los números impresos ni detecta automáticamente páginas en blanco.',
        'Antes de borrar, cuenta desde el panel de páginas del lector o compara el contenido de las hojas anterior y posterior. Después de la eliminación, las posiciones del resultado cambian: si quitas la página 2, la antigua página 3 pasa a ser la segunda. Por eso conviene registrar la selección utilizando el original y hacer una sola operación.',
      ],
    },
    {
      heading: 'Sintaxis válida y protección contra un PDF vacío',
      paragraphs: [
        'Escribe enteros positivos separados por comas y rangos en orden ascendente: `1, 4, 8-10`. Se permiten espacios alrededor de los separadores. Un número repetido se elimina una sola vez. No se admiten expresiones como última, pares, todas, 9-3, 0 o una página que supere el total.',
        'Si la selección cubre todas las páginas, la herramienta detiene el proceso. Un PDF sin páginas no es una entrega útil y no se genera. Para descartar por completo un archivo no necesitas editarlo aquí: conserva o elimina la copia mediante el sistema operativo según tus propias reglas de archivo y seguridad.',
      ],
    },
    {
      heading: 'Eliminar, extraer, dividir y ocultar son acciones diferentes',
      paragraphs: [
        'Eliminar produce un documento nuevo sin las páginas señaladas. Extraer conserva solo una selección en otra copia. Dividir genera varias partes según rangos. Ocultar una página en un visor, tapar contenido con un rectángulo o recortar márgenes no elimina necesariamente los datos del archivo. Esta página copia únicamente las hojas que deben permanecer.',
        'No es una herramienta de redacción segura. Si una página contiene datos sensibles, comprueba que realmente ha desaparecido y que no queda información en marcadores, adjuntos, comentarios, formularios o metadatos. Para anonimización, cumplimiento normativo o supresión irreversible se necesita un flujo especializado y una validación independiente.',
      ],
    },
    {
      heading: 'Qué puede pasar con firmas y funciones avanzadas',
      paragraphs: [
        'La copia se construye en un PDF nuevo a partir de las páginas conservadas. Ese proceso puede afectar firmas digitales, estructura de formularios, marcadores, enlaces entre páginas, índices, etiquetas de accesibilidad, comentarios, adjuntos o scripts. Aunque el aspecto visual parezca correcto, no se garantiza preservar todas las funciones de un documento complejo.',
        'Los PDF cifrados, con contraseña, dañados o con restricciones pueden fallar al cargarse. Para contratos firmados, expedientes oficiales, PDF/A, documentos accesibles o archivos de imprenta, guarda el original y usa una aplicación que pueda validar esas propiedades. Nunca presentes una copia editada como original firmado.',
      ],
    },
    {
      heading: 'Privacidad, archivos grandes y revisión de la copia',
      paragraphs: [
        'El PDF se lee y la copia se crea en la memoria de tu navegador. FunnyTools no recibe las páginas para completar la tarea. La propia página necesita conexiones normales para cargar sus recursos y puede incluir analítica o publicidad conforme a la política general; el contenido del documento no forma parte de esos eventos.',
        'No se muestra un límite fijo de tamaño, pero archivos largos o con escaneos de alta resolución pueden agotar memoria, sobre todo en móvil. Tras descargar, confirma el número esperado de páginas, el salto entre las hojas que rodeaban cada eliminación, el orden, la legibilidad y cualquier función interactiva. Guarda el original hasta que el destinatario acepte la copia.',
      ],
    },
  ],
  instructions: [
    'Selecciona una copia del PDF y pulsa «Analizar PDF» para ver el total de páginas.',
    'Abre el original en un visor y confirma las posiciones de las hojas que sobran.',
    'Escribe páginas o rangos ascendentes, por ejemplo 2, 5-7.',
    'Pulsa «Eliminar y descargar PDF»; la herramienta conservará todas las demás páginas.',
    'Abre la copia y verifica cantidad, uniones, orden, enlaces, campos y firma.',
  ],
  examples: [
    'Quitar una página en blanco añadida por un escáner.',
    'Eliminar anexos duplicados antes de cargar una solicitud.',
    'Retirar una portada interna de una versión destinada a clientes.',
    'Borrar páginas de prueba de un documento de trabajo.',
    'Preparar una copia más corta de un manual sin afirmar que el original cambió.',
  ],
  audience: [
    'Oficinas que limpian escaneos, formularios y anexos.',
    'Estudiantes que deben retirar borradores o páginas vacías.',
    'Personas que preparan una versión compartible de un documento.',
    'Usuarios que quieren evitar subir un PDF a un servidor de conversión.',
  ],
  caseStudies: [
    {
      title: 'Página en blanco entre dos capítulos',
      description: 'El visor muestra que la hoja vacía es la página 12, aunque el pie de la siguiente dice 11. Se elimina 12, se descarga la copia y se comprueba que el final del capítulo anterior conecta con el inicio del siguiente.',
    },
    {
      title: 'Anexos duplicados',
      description: 'Un PDF de 24 páginas contiene una segunda copia en 19-24. Se analiza, se elimina ese rango y se verifica que quedan 18 páginas, que el índice todavía tiene sentido y que los enlaces importantes abren.',
    },
    {
      title: 'Selección que borraría todo',
      description: 'El documento tiene tres páginas y se introduce 1-3. La herramienta bloquea el resultado vacío. Se revisa la intención y se decide conservar una página mediante el extractor en lugar de forzar un PDF inválido.',
    },
  ],
  notes: [
    'Los números corresponden al orden del archivo, no necesariamente a la numeración impresa.',
    'No hay detección automática de páginas en blanco ni vista de miniaturas.',
    'No se permite eliminar todas las páginas.',
    'Eliminar páginas no equivale a redactar datos confidenciales de forma certificada.',
    'Firmas, formularios, marcadores, enlaces y PDF protegidos requieren revisión adicional.',
  ],
  faq: [
    {
      q: '¿Cómo eliminar una página en blanco de un PDF?',
      a: 'Identifica su posición en el visor, escribe ese número y genera la copia. La herramienta no detecta hojas vacías automáticamente.',
    },
    {
      q: '¿Puedo borrar varias páginas a la vez?',
      a: 'Sí. Combina números y rangos como 2, 5-7, 11. Todas esas páginas se excluirán del resultado.',
    },
    {
      q: '¿Puedo recuperar una página después?',
      a: 'La copia descargada no incluye la página, pero el PDF original no se modifica. Consérvalo para recuperar o repetir la selección.',
    },
    {
      q: '¿Por qué no puedo eliminar todas las páginas?',
      a: 'La herramienta exige que el resultado conserve al menos una página y bloquea un documento vacío.',
    },
    {
      q: '¿Se eliminan también los datos confidenciales de metadatos o comentarios?',
      a: 'No se garantiza. Esta herramienta quita páginas; no es una solución certificada de redacción o saneamiento.',
    },
    {
      q: '¿El documento se sube a FunnyTools?',
      a: 'No. El PDF se lee y la copia se construye dentro de este navegador.',
    },
  ],
  labels: {
    localNote: 'El PDF se procesa en este navegador y no se sube a FunnyTools.',
    upload: 'Seleccionar un archivo PDF',
    pagesLabel: 'Páginas que se van a eliminar',
    rangesPlaceholder: 'Ejemplo: 2, 5-7',
    analyze: 'Analizar PDF',
    remove: 'Eliminar y descargar PDF',
    reset: 'Borrar todo',
    processing: 'Creando la copia sin las páginas seleccionadas…',
    pageCount: 'El PDF contiene {count} páginas.',
    downloaded: 'La descarga del PDF editado ha comenzado.',
    noFile: 'Selecciona primero un archivo PDF.',
    pdfOnly: 'Selecciona un archivo con formato PDF.',
    loadError: 'No se ha podido abrir el PDF. Puede estar dañado, cifrado o ser demasiado grande.',
    emptyRange: 'Escribe al menos una página que quieras eliminar.',
    invalidRange: 'Revisa los números y utiliza rangos válidos como 2, 5-7.',
    deleteAllError: 'No se pueden eliminar todas las páginas; el resultado debe conservar al menos una.',
    deleteError: 'No se ha podido crear el PDF. Revisa el archivo y la selección.',
  },
  privacyNote: 'El documento se lee y la nueva copia se genera en la memoria de este navegador. FunnyTools no recibe ni conserva sus páginas. Los datos locales desaparecen al borrar, recargar o cerrar la pestaña.',
  disclaimer: 'Verifica el PDF antes de compartirlo. Quitar páginas no garantiza saneamiento de metadatos, conservación de firmas, formularios, enlaces, accesibilidad ni cumplimiento legal.',
};

export const spanishDeletePdfPagesReview = {
  heading: 'Cómo revisar un PDF después de eliminar páginas',
  intro: 'El total correcto no basta: también hay que comprobar las uniones y las propiedades del documento.',
  panels: [
    {
      title: 'Cuenta y recorre',
      text: 'Resta las páginas eliminadas al total original y revisa cada punto donde se unieron hojas antes separadas.',
    },
    {
      title: 'Busca datos residuales',
      text: 'Si había información sensible, revisa también comentarios, adjuntos, marcadores y metadatos con una herramienta adecuada.',
    },
    {
      title: 'Prueba el destino',
      text: 'Abre la copia en el lector o portal final y confirma campos, enlaces, firmas, peso y aceptación.',
    },
  ],
  checklistHeading: 'Lista de comprobación',
  checklist: [
    'Solo faltan las páginas previstas.',
    'Las hojas restantes conservan su orden y continuidad.',
    'No se confunde eliminación de páginas con redacción segura.',
    'El original y la copia están claramente diferenciados.',
  ],
};

export const spanishExtractPdfPages: ToolContent = {
  name: 'Extraer páginas de un PDF online',
  short: 'Crea un PDF nuevo con solo las páginas y rangos que indiques, respetando el orden de entrada.',
  long: 'Selecciona un PDF, analiza su total y escribe las páginas que quieres conservar, por ejemplo 1, 4-6. La herramienta copia esas páginas en el mismo orden en que aparecen los números y permite repetir una página si la escribes más de una vez. El archivo original no cambia y el procesamiento ocurre en este navegador. No genera un PDF separado por cada página, no muestra miniaturas y no extrae texto, imágenes ni archivos adjuntos.',
  seoTitle: 'Extraer páginas PDF online: crear otro PDF',
  seoDescription: 'Conserva páginas o rangos de un PDF, como 1, 4-6, y descarga un documento nuevo en el orden indicado. Local, gratis y sin registro.',
  keywords: [
    'extraer páginas PDF',
    'sacar páginas de un PDF',
    'guardar páginas PDF',
    'separar páginas de un PDF',
    'extraer una página PDF',
    'crear PDF con páginas seleccionadas',
    'recortar páginas de un PDF',
  ],
  capabilities: [
    'Analizar el archivo y mostrar cuántas páginas contiene.',
    'Conservar páginas sueltas y rangos ascendentes como 1, 4-6.',
    'Construir la copia según el orden exacto en que se escriben los bloques.',
    'Permitir repetir una página cuando el número aparece varias veces.',
    'Procesar y descargar el resultado localmente sin enviar el PDF a FunnyTools.',
  ],
  contentSections: [
    {
      heading: 'Respuesta rápida: cómo sacar páginas concretas de un PDF',
      paragraphs: [
        'Selecciona el PDF, pulsa «Analizar PDF» y consulta el original para identificar las páginas que necesitas. Escribe números y rangos como `1, 4-6, 10`. El resultado contendrá primero la página 1, después 4, 5 y 6, y por último 10. Pulsa «Extraer y descargar PDF» y abre la copia para confirmar contenido y orden.',
        'Extraer es una operación de selección positiva: solo se copia lo que escribes. Es la opción más segura cuando necesitas pocas páginas de un documento largo. Si quieres conservar casi todo y quitar solo una o dos hojas, la herramienta de eliminar páginas reduce el riesgo de olvidar un rango.',
      ],
    },
    {
      heading: 'El orden de entrada sí cambia el resultado',
      paragraphs: [
        'A diferencia del eliminador, el extractor mantiene el orden de la lista, no obliga a ordenar de menor a mayor entre bloques. `5, 1-2` crea una copia con las páginas 5, 1 y 2. Dentro de cada rango, el inicio debe ser menor o igual que el final; `6-4` no es válido. Esta posibilidad sirve para preparar una secuencia concreta, pero también puede causar una entrega desordenada si escribes sin revisar.',
        'Los duplicados no se eliminan: `3, 3` copia dos veces la página 3. Puede ser útil para una portada repetida, pero normalmente indica un error de escritura. La herramienta no ofrece arrastrar miniaturas ni una vista previa; anota el orden previsto y comprueba la primera y última página del resultado.',
      ],
      items: [
        '`1, 4-6`: produce 1, 4, 5, 6.',
        '`5, 1-2`: produce 5, 1, 2.',
        '`3, 3`: produce dos copias de la página 3.',
        '`6-4`: es inválido porque el rango debe avanzar.',
      ],
    },
    {
      heading: 'Extraer no siempre significa dividir',
      paragraphs: [
        'Esta página crea un único PDF con toda la selección. No descarga un archivo por página y no corta automáticamente el documento en partes. La herramienta Dividir PDF sirve para generar varios archivos a partir de rangos. Eliminar páginas conserva todo salvo una selección; reordenar trabaja con todas las páginas; extraer se concentra en el subconjunto que quieres reutilizar.',
        'Tampoco extrae texto, fotografías, tablas, comentarios o adjuntos como archivos independientes. Copia páginas PDF completas. Si necesitas una imagen por página, utiliza PDF a imagen; si buscas texto editable, necesitas OCR o un conversor capaz de reconocer la estructura.',
      ],
    },
    {
      heading: 'Casos de uso y numeración engañosa',
      paragraphs: [
        'Puede servir para compartir un capítulo, un anexo, unas páginas de lectura o la sección requerida por un portal. Sin embargo, la posición del archivo puede no coincidir con el número impreso. Una portada, índice y página legal pueden hacer que la página “10” del libro sea la 14 del PDF. La herramienta solo entiende posiciones desde 1.',
        'No supongas que seleccionar menos páginas elimina todos los datos ajenos a ellas. El nuevo documento puede conservar propiedades de las páginas copiadas, y la biblioteca no promete trasladar perfectamente marcadores, estructura de accesibilidad, campos, comentarios, enlaces entre páginas ni otras funciones de nivel documental. Revisa el archivo completo.',
      ],
    },
    {
      heading: 'Derechos, privacidad y documentos sensibles',
      paragraphs: [
        'Poder extraer páginas técnicamente no concede derecho a redistribuirlas. Respeta copyright, acuerdos de confidencialidad, datos personales y condiciones del documento. Cuando compartas solo una parte, añade el contexto necesario para no hacer parecer que el extracto es el documento completo o que conserva certificación oficial.',
        'El PDF se procesa en la memoria del navegador y no se envía a FunnyTools para producir la copia. Aun así, trabaja sobre un dispositivo de confianza, cierra la pestaña al terminar y conserva el original en un lugar seguro. No utilices un extracto como sustituto de un original firmado sin que el destinatario lo acepte.',
      ],
    },
    {
      heading: 'Archivos protegidos, memoria y comprobación final',
      paragraphs: [
        'Un PDF cifrado, protegido con contraseña, dañado o con características no compatibles puede fallar. No hay un límite fijo visible, pero copiar páginas requiere cargar el documento de origen y construir otro en memoria. Los escaneos largos pueden superar la capacidad de un teléfono aunque el selector permita elegir el archivo.',
        'Abre la descarga y verifica el total, el orden exacto, la primera y última página, cortes de párrafos, orientación, resolución, enlaces, formularios, firma y tamaño. Comprueba también el nombre: la copia termina en `-extracted.pdf`. Conserva el original y prueba la carga real antes de borrar cualquier material de trabajo.',
      ],
    },
  ],
  instructions: [
    'Selecciona una copia del PDF y pulsa «Analizar PDF» para conocer el total.',
    'Confirma en un visor las posiciones de las páginas que quieres conservar.',
    'Escribe números y rangos en el orden de salida deseado, por ejemplo 1, 4-6, 10.',
    'Pulsa «Extraer y descargar PDF» y espera a que se cree una única copia.',
    'Abre el resultado y revisa total, orden, primera y última página y funciones avanzadas.',
  ],
  examples: [
    'Guardar un capítulo concreto de un manual en un PDF más corto.',
    'Preparar las páginas requeridas por un formulario de carga.',
    'Compartir solo un anexo de un informe manteniendo el original intacto.',
    'Crear una lectura con páginas no consecutivas en un orden específico.',
    'Extraer portada y sección principal para una revisión interna.',
  ],
  audience: [
    'Estudiantes y docentes que preparan lecturas o anexos.',
    'Oficinas que deben cargar solo ciertas páginas de un expediente.',
    'Investigadores que separan secciones de documentos de trabajo.',
    'Personas que prefieren procesar PDF privados localmente.',
  ],
  caseStudies: [
    {
      title: 'Capítulo con portada propia',
      description: 'Se necesita la portada general, seguida de las páginas 18-24. Se escribe 1, 18-24 y se genera una copia de ocho páginas. La primera, el inicio y el final del capítulo se comprueban antes de compartir.',
    },
    {
      title: 'Orden deliberadamente distinto',
      description: 'Una revisión interna debe comenzar con la página de conclusiones 12 y después incluir 3-5. Se escribe 12, 3-5. La herramienta respeta ese orden y la persona añade contexto fuera del PDF para evitar confusión.',
    },
    {
      title: 'Número impreso que no coincide',
      description: 'El pie indica página 7, pero portada e índice hacen que ocupe la posición 9 del archivo. Se confirma en el visor y se introduce 9. La copia se abre para verificar el encabezado antes de enviarla.',
    },
  ],
  notes: [
    'Se crea un único PDF, no un archivo independiente por página.',
    'El orden de los bloques escritos determina el orden de salida.',
    'Los duplicados se conservan; una página repetida se copiará varias veces.',
    'La numeración se refiere a posiciones del archivo, no a números impresos.',
    'No extrae texto, imágenes ni adjuntos y no garantiza preservar funciones avanzadas.',
  ],
  faq: [
    {
      q: '¿Cómo guardar solo algunas páginas de un PDF?',
      a: 'Escribe las posiciones que quieres conservar, como 1, 4-6, y descarga el nuevo PDF.',
    },
    {
      q: '¿Puedo cambiar el orden al extraer?',
      a: 'Sí. Los bloques se copian en el orden escrito; 5, 1-2 produce 5, 1 y 2.',
    },
    {
      q: '¿Qué ocurre si repito una página?',
      a: 'La página se copia otra vez. Por ejemplo, 3, 3 genera dos páginas iguales en el resultado.',
    },
    {
      q: '¿Obtendré un PDF por cada página?',
      a: 'No. Esta herramienta reúne toda la selección en un único PDF. Para varias partes utiliza Dividir PDF.',
    },
    {
      q: '¿Extrae texto o imágenes por separado?',
      a: 'No. Copia páginas PDF completas; no realiza OCR ni exporta elementos internos.',
    },
    {
      q: '¿El archivo se envía a FunnyTools?',
      a: 'No. La lectura y la creación de la copia ocurren en este navegador.',
    },
  ],
  labels: {
    localNote: 'El PDF se procesa en este navegador y no se sube a FunnyTools.',
    upload: 'Seleccionar un archivo PDF',
    pagesLabel: 'Páginas que se van a conservar',
    rangesPlaceholder: 'Ejemplo: 1, 4-6, 10',
    analyze: 'Analizar PDF',
    extract: 'Extraer y descargar PDF',
    reset: 'Borrar todo',
    processing: 'Creando el PDF con las páginas seleccionadas…',
    pageCount: 'El PDF contiene {count} páginas.',
    downloaded: 'La descarga del PDF extraído ha comenzado.',
    noFile: 'Selecciona primero un archivo PDF.',
    pdfOnly: 'Selecciona un archivo con formato PDF.',
    loadError: 'No se ha podido abrir el PDF. Puede estar dañado, cifrado o ser demasiado grande.',
    emptyRange: 'Escribe al menos una página que quieras conservar.',
    invalidRange: 'Revisa los números y utiliza rangos válidos como 1, 4-6.',
    extractError: 'No se ha podido extraer la selección. Revisa el archivo y los números.',
  },
  privacyNote: 'El PDF de origen se lee y la selección se copia en la memoria de este navegador. FunnyTools no recibe ni conserva el documento. Los datos locales desaparecen al borrar, recargar o cerrar la pestaña.',
  disclaimer: 'Comprueba el extracto antes de compartirlo. La herramienta no concede derechos de uso ni garantiza preservar firmas, formularios, marcadores, accesibilidad, enlaces o certificaciones.',
};

export const spanishExtractPdfPagesReview = {
  heading: 'Cómo comprobar un extracto PDF',
  intro: 'Una selección útil debe tener las páginas correctas, en el orden correcto y con contexto suficiente.',
  panels: [
    {
      title: 'Primera y última página',
      text: 'Comprueba que el extracto comienza y termina donde esperabas y que no corta una sección necesaria.',
    },
    {
      title: 'Orden y duplicados',
      text: 'Recorre la secuencia; la herramienta respeta el orden escrito y conserva números repetidos.',
    },
    {
      title: 'Contexto y derechos',
      text: 'Aclara que es un extracto, respeta permisos y verifica que no falte información que cambie el sentido.',
    },
  ],
  checklistHeading: 'Lista de comprobación',
  checklist: [
    'El total coincide con la suma de páginas y rangos indicados.',
    'El orden de salida coincide con el orden previsto.',
    'No hay duplicados accidentales ni cortes de contenido.',
    'La copia abre en el destino y el original permanece guardado.',
  ],
};
