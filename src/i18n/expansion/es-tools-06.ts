import type { ToolContent } from '../tools/_types';

export const spanishImageRotateFlip: ToolContent = {
  name: 'Rotar y voltear una imagen online',
  short: 'Gira una foto en pasos de 90 grados o crea un reflejo horizontal o vertical antes de descargarla.',
  long: 'Esta herramienta permite corregir la orientación de una foto, captura o escaneo directamente en el navegador. Puedes girar 90 grados a la izquierda o a la derecha, repetir la operación para obtener 180 o 270 grados y combinarla con un volteo horizontal o vertical. La vista previa muestra el resultado y la descarga intenta conservar JPG, PNG o WebP. No admite ángulos libres ni procesa varias imágenes a la vez, y el archivo no se sube a FunnyTools.',
  seoTitle: 'Rotar imagen online y voltear foto en espejo gratis',
  seoDescription: 'Gira una imagen 90°, 180° o 270° y voltéala en horizontal o vertical. Vista previa y descarga local sin subir la foto.',
  keywords: [
    'rotar imagen online',
    'girar foto online',
    'voltear imagen',
    'imagen espejo',
    'girar imagen 90 grados',
    'rotar foto a la izquierda',
    'voltear imagen horizontal',
  ],
  capabilities: [
    'Girar una imagen 90 grados a la izquierda o a la derecha en cada pulsación.',
    'Repetir el giro para obtener 180, 270 o volver a 0 grados.',
    'Voltear los píxeles en horizontal o en vertical y combinar ambas transformaciones.',
    'Ver las dimensiones de salida y restablecer la orientación sin volver a seleccionar el archivo.',
    'Procesar una imagen de hasta 20 MB y 40 millones de píxeles sin enviarla a FunnyTools.',
  ],
  contentSections: [
    {
      heading: 'Respuesta rápida: cómo girar una foto',
      paragraphs: [
        'Selecciona una imagen y espera a que aparezca la vista previa. Pulsa «Girar a la derecha» si el lado superior debe desplazarse hacia la derecha, o «Girar a la izquierda» para el sentido contrario. Dos pulsaciones equivalen a 180 grados. Si necesitas un reflejo, utiliza «Voltear horizontalmente» o «Voltear verticalmente». Comprueba la orientación y las dimensiones, descarga la copia y ábrela fuera de la página.',
        'El giro de esta versión siempre avanza en pasos de 90 grados. No hay un campo para 3°, 15° o cualquier ángulo personalizado, ni una función que enderece automáticamente el horizonte. Ese límite evita inventar esquinas o zonas de fondo: una rotación rectangular de 90° puede utilizar todos los píxeles y solo intercambia ancho y alto.',
      ],
    },
    {
      heading: 'Rotar, voltear y recortar no significan lo mismo',
      paragraphs: [
        'Rotar cambia la dirección de toda la imagen alrededor de su centro. Voltear crea un reflejo respecto a un eje: el volteo horizontal intercambia izquierda y derecha, mientras que el vertical intercambia arriba y abajo. Un texto que se lee correctamente después de rotarlo puede quedar invertido al aplicar espejo; por eso conviene revisar carteles, matrículas, logotipos y escritura antes de utilizar el resultado.',
        'Recortar elimina zonas de los bordes y cambiar tamaño modifica la cantidad de píxeles. Esta herramienta no realiza ninguna de esas tareas. Una foto horizontal de 1200 × 800 girada 90° pasa a 800 × 1200, pero conserva el encuadre completo. Si después necesitas una miniatura cuadrada o 600 × 600, utiliza el recortador y el redimensionador en ese orden.',
      ],
      items: [
        'Giro: cambia la orientación en pasos de 90 grados.',
        'Volteo horizontal: refleja izquierda y derecha como un espejo.',
        'Volteo vertical: refleja la parte superior y la inferior.',
        'Recorte: elimina píxeles fuera de una selección, función que aquí no se aplica.',
      ],
    },
    {
      heading: 'Qué ocurre con las dimensiones y la calidad',
      paragraphs: [
        'Un giro de 90° o 270° intercambia ancho y alto; uno de 180° y cualquier volteo mantienen las dimensiones. La vista «Dimensiones de salida» permite confirmar ese cambio antes de descargar. Los píxeles se dibujan en un lienzo nuevo sin ampliar la resolución, pero el archivo se vuelve a codificar: JPEG y WebP se exportan con calidad alta solicitada al navegador y PNG vuelve a escribirse como PNG.',
        'Volver a codificar significa que el peso puede aumentar o disminuir y que JPEG o WebP pueden presentar pequeñas diferencias respecto al original. No prometemos una operación binaria sin pérdida. La orientación visual puede corregirse sin redimensionar, pero para un archivo maestro, una fotografía profesional o un flujo de impresión exigente debes conservar el original y comparar la copia al 100 %.',
      ],
    },
    {
      heading: 'Formato de salida, transparencia y metadatos',
      paragraphs: [
        'Cuando la entrada es JPEG, PNG o WebP, la herramienta solicita el mismo tipo de salida; otros formatos que el navegador consiga abrir pueden descargarse como PNG. Un PNG o WebP transparente puede conservar el canal alfa al volver a dibujarse. JPEG no admite transparencia y esta página no ofrece un selector de fondo porque no está convirtiendo desde otro formato hacia JPEG.',
        'La copia no garantiza mantener EXIF, geolocalización, fecha, perfil de cámara, comentarios, miniaturas, animación ni la etiqueta de orientación original. Una imagen animada se trata como una vista estática. El navegador presenta los píxeles que ha podido decodificar y la herramienta no ofrece una función separada para editar o conservar esos metadatos.',
      ],
    },
    {
      heading: 'Cuándo sirve una imagen espejo y cuándo puede engañar',
      paragraphs: [
        'El espejo horizontal puede servir para ajustar la dirección visual de una persona, equilibrar una composición o crear una variante gráfica. Sin embargo, no es una corrección neutral cuando aparecen palabras, señales, uniformes, productos asimétricos o elementos que deben representar la realidad. Una selfie reflejada puede parecer familiar, pero no necesariamente muestra cómo la ven otras personas.',
        'En documentos, pruebas, anuncios o fotografías de producto, una inversión puede cambiar el significado. No utilices el volteo para alterar hechos, ocultar una marca o presentar un lado distinto del objeto sin avisar. Si el destino exige fidelidad documental, limita el cambio a la orientación necesaria y conserva una copia sin editar.',
      ],
    },
    {
      heading: 'Límites en móvil y comprobación final',
      paragraphs: [
        'La entrada admite como máximo 20 MB y 40 millones de píxeles. Un archivo permitido puede ocupar mucha más memoria al decodificarse, especialmente en un teléfono. La página trabaja con una sola imagen; no ofrece lote, pegado desde portapapeles, cámara directa, ángulo libre ni corrección automática de horizonte.',
        'Después de descargar, comprueba arriba y abajo, izquierda y derecha, texto legible, dimensiones, transparencia, nitidez y formato. Abre el resultado en la aplicación o formulario final, porque ese destino puede volver a leer EXIF, comprimir, generar una miniatura o aplicar otro recorte. La vista previa valida la transformación del navegador, no todas las reglas de otra plataforma.',
      ],
    },
  ],
  instructions: [
    'Selecciona una imagen que el navegador pueda abrir, de hasta 20 MB y 40 millones de píxeles.',
    'Pulsa girar a la izquierda o derecha; repite la acción si necesitas 180 o 270 grados.',
    'Aplica el volteo horizontal o vertical solo si realmente necesitas un reflejo.',
    'Revisa la vista previa, el texto y las dimensiones de salida; usa «Restablecer orientación» si es necesario.',
    'Descarga la copia y ábrela en el destino para verificar formato, transparencia y lectura correcta.',
  ],
  examples: [
    'Poner en posición vertical una foto que aparece acostada.',
    'Girar 180 grados una página escaneada al revés.',
    'Crear una variante espejo de un elemento gráfico sin recortarlo.',
    'Corregir la dirección de una captura antes de incluirla en un documento.',
    'Combinar un giro de 90 grados con un volteo y revisar que el texto no quede invertido.',
  ],
  audience: [
    'Personas que necesitan corregir rápidamente la orientación de una foto.',
    'Estudiantes y oficinas que preparan capturas o páginas escaneadas.',
    'Creadores que necesitan una variante reflejada para una composición.',
    'Usuarios que prefieren editar una imagen localmente sin instalar una aplicación.',
  ],
  caseStudies: [
    {
      title: 'Escaneo en posición lateral',
      description: 'Una página de 1600 × 1200 aparece acostada. Se gira una vez a la derecha, la salida muestra 1200 × 1600 y se comprueba que el título quede arriba y sea legible antes de descargar.',
    },
    {
      title: 'Selfie con texto en la camiseta',
      description: 'La persona prueba el espejo horizontal, pero observa que las letras quedan invertidas. Restablece la orientación y conserva la versión sin reflejar para no publicar información visualmente incorrecta.',
    },
    {
      title: 'Gráfico dirigido hacia el contenido',
      description: 'Una flecha decorativa apunta fuera de una diapositiva. Se aplica volteo horizontal, se verifica que no haya texto ni logotipos afectados y se descarga la copia para la presentación.',
    },
  ],
  notes: [
    'Los giros son de 90 grados; no se admiten ángulos personalizados ni enderezado automático.',
    'La herramienta procesa una sola imagen y no incluye edición por lotes.',
    'JPEG, PNG y WebP se vuelven a codificar; el peso y algunos píxeles pueden cambiar.',
    'La copia puede perder EXIF, ubicación, perfiles, orientación, animación y otros metadatos.',
    'Conserva el original y revisa especialmente texto, señales y elementos asimétricos después de un volteo.',
  ],
  faq: [
    {
      q: '¿Cómo rotar una imagen 90 grados online?',
      a: 'Selecciona el archivo y pulsa girar a la izquierda o a la derecha una vez. La vista previa mostrará el resultado antes de descargar.',
    },
    {
      q: '¿Puedo girar la foto 180 o 270 grados?',
      a: 'Sí. Pulsa dos veces para 180 grados o tres veces para 270; cada acción suma un paso de 90 grados.',
    },
    {
      q: '¿Qué diferencia hay entre rotar y voltear?',
      a: 'Rotar cambia la orientación en grados. Voltear refleja la imagen respecto a un eje horizontal o vertical.',
    },
    {
      q: '¿Puedo enderezar un horizonte dos o tres grados?',
      a: 'No. Esta versión solo gira en pasos de 90 grados y no incluye ángulo libre ni relleno de esquinas.',
    },
    {
      q: '¿La rotación mantiene el formato y la calidad?',
      a: 'Intenta mantener JPEG, PNG o WebP, pero vuelve a codificar la imagen. Conserva el original y compara la descarga.',
    },
    {
      q: '¿La imagen se sube a FunnyTools?',
      a: 'No. La lectura, transformación, vista previa y descarga se realizan en la memoria de tu navegador.',
    },
  ],
  labels: {
    localNote: 'La imagen se gira y se voltea en este navegador; no se sube a FunnyTools.',
    upload: 'Seleccionar imagen',
    rotateLeft: '↺ Girar a la izquierda',
    rotateRight: '↻ Girar a la derecha',
    flipH: 'Voltear horizontalmente',
    flipV: 'Voltear verticalmente',
    resetTransform: 'Restablecer orientación',
    preview: 'Vista previa de la imagen transformada',
    waiting: 'Selecciona una imagen para empezar',
    originalSize: 'Tamaño del archivo original',
    dimensions: 'Dimensiones de salida',
    download: 'Descargar imagen',
    reset: 'Borrar todo',
    invalidType: 'Selecciona un archivo de imagen válido.',
    tooLarge: 'La imagen supera el límite de 20 MB o 40 millones de píxeles.',
    processError: 'No se ha podido procesar la imagen. Prueba con otro archivo.',
  },
  privacyNote: 'La imagen se decodifica, transforma y vuelve a codificar en la memoria de este navegador. FunnyTools no recibe el archivo ni las acciones aplicadas. Los datos temporales desaparecen al borrar o cerrar la pestaña.',
  disclaimer: 'Conserva el original y comprueba la copia. Un volteo puede invertir texto o información visual, y la descarga no garantiza conservar metadatos, animación ni propiedades profesionales del archivo.',
};

export const spanishImageRotateFlipReview = {
  heading: 'Cómo comprobar una rotación o un reflejo',
  intro: 'La orientación correcta no se demuestra solo porque la imagen parezca recta; también hay que revisar dimensiones, texto, asimetrías y formato.',
  panels: [
    {
      title: 'Comprueba el sentido',
      text: 'Localiza un elemento que tenga arriba, abajo, izquierda y derecha claros y confirma que el giro aplicado coincide con el objetivo.',
    },
    {
      title: 'Lee todo el texto',
      text: 'Un espejo horizontal invierte letras, números y señales. Amplía la descarga y verifica que nada importante se lea al revés.',
    },
    {
      title: 'Abre la copia final',
      text: 'Confirma dimensiones, transparencia y formato fuera de la página y pruébala en la aplicación donde vaya a utilizarse.',
    },
  ],
  checklistHeading: 'Lista de comprobación',
  checklist: [
    'La parte superior, inferior, izquierda y derecha están en el lugar correcto.',
    'Texto, logotipos y elementos asimétricos no se han invertido por error.',
    'Las dimensiones se intercambian únicamente en giros de 90 o 270 grados.',
    'El original permanece guardado y la copia se abre en el destino.',
  ],
};

export const spanishImageToBase64: ToolContent = {
  name: 'Convertir imagen a Base64 online',
  short: 'Obtén una URL de datos Base64 de una imagen y cópiala como cadena o como declaración CSS.',
  long: 'Este conversor lee una imagen de hasta 5 MB con FileReader y muestra la URL de datos completa, incluido el tipo MIME y el contenido codificado en Base64. Puedes copiarla directamente o generar una declaración background-image para CSS. El proceso conserva los bytes del archivo dentro de la cadena: no comprime, no cambia el formato y no cifra la imagen. Todo se realiza en tu navegador y el archivo no se envía a FunnyTools.',
  seoTitle: 'Convertir imagen a Base64 y Data URI online gratis',
  seoDescription: 'Convierte JPG, PNG, WebP, GIF o SVG a una URL de datos Base64. Copia la cadena o el CSS sin subir la imagen.',
  keywords: [
    'convertir imagen a Base64',
    'imagen Base64 online',
    'image to Base64',
    'convertir imagen a data URI',
    'Base64 para HTML',
    'Base64 para CSS',
    'codificar imagen Base64',
  ],
  capabilities: [
    'Leer una imagen de hasta 5 MB como URL de datos en el navegador.',
    'Mostrar el tipo MIME y el contenido Base64 en una sola cadena copiable.',
    'Indicar dimensiones, tamaño original y longitud total de la URL generada.',
    'Copiar la URL de datos o una declaración CSS background-image preparada.',
    'Mantener los bytes originales sin convertir, comprimir ni subir el archivo.',
  ],
  contentSections: [
    {
      heading: 'Respuesta rápida: cómo convertir una imagen a Base64',
      paragraphs: [
        'Selecciona la imagen y espera a que aparezcan las dimensiones y la cadena. Usa «Copiar URL de datos» si necesitas el valor que comienza por `data:image/…;base64,`; usa «Copiar como CSS» si necesitas una declaración `background-image`. Pega el resultado en un entorno de prueba y confirma que la imagen se muestra antes de incorporarlo a producción.',
        'La herramienta entrega una URL de datos completa, no solo los caracteres Base64. Esa cabecera identifica el tipo del archivo y permite que un navegador interprete la cadena. Si una API solicita Base64 puro, revisa su contrato: puede ser necesario retirar todo lo anterior a la coma. No elimines esa parte cuando el destino espera una URL de datos.',
      ],
    },
    {
      heading: 'Qué es una URL de datos y qué partes contiene',
      paragraphs: [
        'El esquema `data:` permite incluir un elemento pequeño directamente donde normalmente habría una URL externa. Una imagen suele seguir la forma `data:tipo/subtipo;base64,contenido`. El tipo puede ser `image/png`, `image/jpeg`, `image/webp` u otro valor informado por el archivo; `;base64` indica cómo están representados los bytes y la coma separa la cabecera de los datos.',
        'Base64 es una codificación, no un nuevo formato de imagen. Un PNG sigue siendo PNG y un GIF animado sigue conteniendo sus bytes originales dentro de la cadena. La herramienta no dibuja la imagen en canvas: FileReader lee el archivo como URL de datos. Por eso no mejora la calidad, no elimina el fondo y no convierte entre JPG, PNG o WebP.',
      ],
    },
    {
      heading: 'Base64 no comprime ni protege la imagen',
      paragraphs: [
        'La representación Base64 utiliza caracteres de texto para expresar datos binarios y normalmente necesita aproximadamente cuatro caracteres por cada tres bytes, además de la cabecera. El valor exacto aparece como «Longitud de la URL de datos». Una imagen de 300 KB no se convierte en una imagen más ligera; la cadena suele ocupar más antes de que intervenga cualquier compresión de transferencia.',
        'Tampoco es cifrado ni anonimización. Cualquier persona o programa que reciba la cadena puede reconstruir la imagen. No pegues documentos personales, firmas, capturas privadas o secretos en código público creyendo que el texto los oculta. El hecho de que la conversión sea local protege el trayecto hacia FunnyTools, no el lugar donde decidas guardar o publicar el resultado.',
      ],
    },
    {
      heading: 'Cuándo conviene utilizar Base64 en HTML o CSS',
      paragraphs: [
        'Una URL de datos puede resultar práctica para un icono muy pequeño, una demostración autocontenida, un archivo de configuración que solo admite texto o un prototipo sin servidor de imágenes. En HTML se coloca como valor de una fuente de imagen y debe mantenerse un texto alternativo adecuado; en CSS puede utilizarse dentro de `url(...)` para un fondo decorativo.',
        'No es automáticamente una optimización. Una cadena grande aumenta el tamaño del documento o la hoja de estilo, dificulta la lectura del código, puede repetirse, bloquear la descarga del recurso contenedor y no siempre aprovecha una caché independiente. Para fotografías, fondos grandes o recursos reutilizados en muchas páginas suele ser preferible un archivo optimizado con una URL normal.',
      ],
    },
    {
      heading: 'Compatibilidad, CSP, correo y límites del destino',
      paragraphs: [
        'El navegador puede mostrar muchas URL de datos, pero el entorno de destino decide si las acepta. Una política de seguridad de contenido puede bloquear `data:` en imágenes; un editor puede truncar cadenas largas; una API puede requerir solo el bloque Base64; y algunos clientes de correo eliminan o modifican contenido embebido. Prueba siempre en el sistema real.',
        'El botón CSS añade comillas alrededor de la URL y genera una sola declaración. No crea una clase, selector, tamaño, posición ni texto alternativo. El botón de copia utiliza el portapapeles cuando está disponible; si el navegador lo bloquea, puede mostrar un cuadro para copiar manualmente. Revisa que la cadena no se haya cortado al principio o al final.',
      ],
    },
    {
      heading: 'Límite de 5 MB y comprobación del resultado',
      paragraphs: [
        'La entrada está limitada a 5 MB porque una URL de datos es más larga que el archivo y un textarea enorme puede consumir memoria o bloquear el navegador. La página acepta archivos marcados como imagen que el navegador pueda leer; un MIME incorrecto, un archivo dañado o una política del navegador pueden impedir mostrar sus dimensiones.',
        'Para verificar, comprueba que la cadena empiece por `data:image/`, contenga `;base64,` y muestre la imagen en un documento de prueba. Compara las dimensiones con el original y, si el destino permite descargar la imagen reconstruida, compara también el tipo y el archivo. No uses la longitud como medida de calidad ni como prueba de que la cadena está protegida.',
      ],
    },
  ],
  instructions: [
    'Selecciona una imagen de hasta 5 MB que el navegador pueda abrir.',
    'Comprueba el tipo, las dimensiones y la longitud de la URL de datos generada.',
    'Elige copiar la URL completa o la declaración CSS background-image.',
    'Pega el resultado en un archivo de prueba sin datos sensibles y verifica que se muestre.',
    'Evalúa el peso, la CSP y las reglas del destino antes de incluir la cadena en producción.',
  ],
  examples: [
    'Incluir un icono pequeño en un prototipo HTML autocontenido.',
    'Preparar un background-image de CSS para una demostración sin archivos externos.',
    'Enviar una imagen a una API que documenta expresamente una URL de datos.',
    'Guardar una miniatura pequeña dentro de una configuración que solo admite texto.',
    'Comprobar cómo comienza y cuánto mide la representación Base64 de una imagen.',
  ],
  audience: [
    'Desarrolladores que necesitan una URL de datos para HTML, CSS o una API.',
    'Personas que crean prototipos o documentos técnicos autocontenidos.',
    'Equipos que deben convertir un archivo binario pequeño en texto transportable.',
    'Usuarios que quieren realizar la codificación localmente sin subir la imagen.',
  ],
  caseStudies: [
    {
      title: 'Icono pequeño en CSS',
      description: 'Un equipo convierte un icono de pocos kilobytes, copia la declaración CSS y la prueba con su política de seguridad. Antes de publicarla compara el peso del CSS y confirma que el icono no se repite en muchas páginas.',
    },
    {
      title: 'API que pide Base64 puro',
      description: 'La documentación de una API no acepta la cabecera `data:image/png;base64,`. La persona conserva la salida original como referencia, retira la cabecera solo para ese campo y verifica el resultado con una imagen ficticia.',
    },
    {
      title: 'Fotografía demasiado grande para incrustar',
      description: 'Una foto de varios megabytes produce una cadena muy larga. Aunque el navegador la genera, el equipo decide redimensionar y servir un archivo WebP mediante URL normal porque se reutilizará y necesita caché independiente.',
    },
  ],
  notes: [
    'La salida es una URL de datos completa; una API puede pedir Base64 sin cabecera.',
    'Base64 codifica, pero no comprime, cifra, anonimiza ni mejora la imagen.',
    'La cadena suele ser mayor que el archivo binario y el límite de entrada es 5 MB.',
    'El destino puede bloquear data: mediante CSP, truncar la cadena o exigir otro formato.',
    'No publiques información sensible: cualquiera que tenga la cadena puede reconstruir el archivo.',
  ],
  faq: [
    {
      q: '¿Cómo convertir una imagen a Base64 online?',
      a: 'Selecciona el archivo y copia la URL de datos que aparece. La conversión se realiza localmente con FileReader.',
    },
    {
      q: '¿La salida es Base64 puro o una Data URI?',
      a: 'Es una URL de datos completa con tipo MIME, marcador base64 y contenido. Retira la cabecera solo si el destino lo exige.',
    },
    {
      q: '¿Base64 reduce el peso de la imagen?',
      a: 'No. La representación de texto suele ser mayor que el archivo binario y no sustituye la compresión de imagen.',
    },
    {
      q: '¿Puedo usar la cadena en HTML y CSS?',
      a: 'Sí, si el navegador, la política CSP y el proyecto permiten data:. Prueba el resultado y utiliza texto alternativo cuando la imagen aporte información.',
    },
    {
      q: '¿Base64 protege una imagen privada?',
      a: 'No. Es una codificación reversible, no cifrado. No publiques la cadena si no publicarías el archivo original.',
    },
    {
      q: '¿La imagen se sube a FunnyTools?',
      a: 'No. FileReader lee el archivo en este navegador y la cadena no se envía a FunnyTools.',
    },
  ],
  labels: {
    localNote: 'La imagen se codifica en este navegador y no se sube a FunnyTools.',
    upload: 'Seleccionar imagen',
    output: 'URL de datos Base64',
    copy: 'Copiar URL de datos',
    copyCss: 'Copiar como CSS',
    copied: 'Contenido copiado',
    reset: 'Borrar todo',
    waiting: 'La URL de datos aparecerá aquí después de seleccionar una imagen',
    originalSize: 'Tamaño del archivo original',
    dimensions: 'Dimensiones de la imagen',
    base64Length: 'Longitud de la URL de datos',
    invalidType: 'Selecciona un archivo de imagen válido.',
    tooLarge: 'La imagen supera el límite de 5 MB.',
    processError: 'No se ha podido leer la imagen. Prueba con otro archivo.',
  },
  privacyNote: 'FileReader crea la URL de datos en la memoria de este navegador. FunnyTools no recibe la imagen ni la cadena. El contenido permanece en la página hasta que lo borres, recargues o cierres la pestaña; el portapapeles depende de tu dispositivo.',
  disclaimer: 'Comprueba los requisitos del destino antes de utilizar la cadena. Base64 no es cifrado, puede aumentar el peso y puede quedar bloqueado por CSP, editores, API o clientes de correo.',
};

export const spanishImageToBase64Review = {
  heading: 'Cómo validar una imagen Base64',
  intro: 'Una cadena larga no demuestra por sí sola que el destino pueda interpretarla ni que sea una opción eficiente.',
  panels: [
    {
      title: 'Identifica la variante',
      text: 'Confirma si el sistema espera una URL completa que empieza por data: o solamente los caracteres posteriores a la coma.',
    },
    {
      title: 'Reconstruye una prueba',
      text: 'Pega la salida en un documento controlado y comprueba dimensiones, transparencia, animación y tipo visual.',
    },
    {
      title: 'Mide el coste real',
      text: 'Compara el tamaño del documento final, la caché y la política CSP con la alternativa de servir un archivo mediante URL.',
    },
  ],
  checklistHeading: 'Lista de comprobación',
  checklist: [
    'La cabecera MIME coincide con el archivo seleccionado.',
    'La cadena no está truncada y el destino muestra la imagen.',
    'No contiene material que deba permanecer privado.',
    'El aumento de tamaño y la política CSP son aceptables.',
  ],
};

export const spanishImagesToPdf: ToolContent = {
  name: 'Convertir imágenes a PDF online',
  short: 'Ordena varias imágenes JPG o PNG y crea un solo PDF con páginas A4, Carta o ajustadas a cada imagen.',
  long: 'Este conversor reúne imágenes JPG, JPEG y PNG en un PDF directamente en el navegador. Puedes mover cada archivo hacia arriba o abajo, elegir A4, Carta o página ajustada a la imagen y seleccionar orientación vertical u horizontal. Cada imagen ocupa una página y se escala proporcionalmente para caber sin deformarse. No aplica OCR, no añade texto y no ofrece control de compresión. Las imágenes y el PDF generado no se suben a FunnyTools.',
  seoTitle: 'Convertir JPG y PNG a PDF online gratis y ordenar',
  seoDescription: 'Convierte varias imágenes JPG o PNG en un PDF, cambia el orden y elige A4, Carta o tamaño ajustado. Sin subir archivos.',
  keywords: [
    'convertir imágenes a PDF',
    'JPG a PDF online',
    'PNG a PDF',
    'unir imágenes en PDF',
    'fotos a PDF gratis',
    'crear PDF con imágenes',
    'pasar fotos a PDF',
  ],
  capabilities: [
    'Seleccionar varias imágenes JPG, JPEG o PNG en una sola operación.',
    'Cambiar el orden mediante botones de subir y bajar antes de crear las páginas.',
    'Elegir A4, Carta o una página con las dimensiones numéricas de cada imagen.',
    'Usar orientación vertical u horizontal y mantener la proporción sin estirar la imagen.',
    'Crear y descargar un PDF local con una imagen por página, sin registro ni subida.',
  ],
  contentSections: [
    {
      heading: 'Respuesta rápida: cómo pasar fotos a PDF',
      paragraphs: [
        'Selecciona todas las imágenes, revisa la lista y utiliza «Subir» o «Bajar» hasta que el orden coincida con el documento final. Elige A4 o Carta si el PDF se imprimirá o se entregará en un formato de página estándar; elige «Ajustar a la imagen» si quieres eliminar el margen fijo y conservar la forma de cada archivo. Define la orientación, pulsa «Crear y descargar PDF» y abre la descarga para revisar todas las páginas.',
        'Cada imagen se convierte en una página. La herramienta no coloca varias fotos en una misma hoja, no permite arrastrar para ordenar, no acepta PDF como entrada y no genera un PDF separado por archivo. Si necesitas combinar este resultado con otro PDF, crea primero la copia y utiliza después la herramienta para unir PDF.',
      ],
    },
    {
      heading: 'Qué formatos admite y por qué WebP no entra directamente',
      paragraphs: [
        'La entrada está limitada a JPG, JPEG y PNG porque la biblioteca incorpora esos dos tipos de imagen directamente en el documento. Un archivo WebP, GIF, SVG, HEIC, TIFF o AVIF no está admitido aunque el navegador pueda mostrarlo. Convierte primero una copia a JPG o PNG y vuelve a seleccionarla.',
        'Cambiar únicamente la extensión no convierte los bytes. Un WebP renombrado como `.jpg` puede aparecer en la lista por el nombre, pero fallará al intentar incrustarlo. Utiliza un conversor real y abre la copia antes de crear el PDF. Para transparencia, recuerda que PNG puede conservarla como recurso, aunque el visor y el fondo de la página determinan cómo se percibe.',
      ],
    },
    {
      heading: 'A4, Carta o ajustar a la imagen: cómo elegir',
      paragraphs: [
        'A4 utiliza aproximadamente 595,28 × 841,89 puntos PDF y Carta 612 × 792. En ambas opciones la herramienta deja 36 puntos de margen por lado, centra la imagen y la escala proporcionalmente hasta caber. La orientación horizontal intercambia los lados cuando corresponde. No recorta ni estira la imagen, por lo que puede aparecer espacio blanco.',
        '«Ajustar a la imagen» crea cada página con el ancho y alto numéricos del recurso y sin margen. Esos valores se interpretan como puntos PDF, no como una promesa de tamaño físico basada en DPI. Una imagen de muchos píxeles puede producir una página físicamente grande en las propiedades del PDF. Para impresión reglada, A4 o Carta suele ser más predecible y debe verificarse al 100 %, sin «Ajustar a página» del visor si necesitas medir.',
      ],
    },
    {
      heading: 'Orden de páginas, orientación y lectura',
      paragraphs: [
        'El primer archivo de la lista se convierte en la primera página y también aporta la base del nombre descargado. Los botones «Subir» y «Bajar» cambian una posición cada vez. Si los nombres son parecidos, abre los originales o renómbralos antes de seleccionarlos para evitar mezclar anverso y reverso, capítulos o meses.',
        'La orientación se aplica a las páginas, no gira los píxeles de la fotografía. Una imagen que ya está acostada seguirá acostada dentro de una página horizontal o vertical. Corrige primero los píxeles con la herramienta para rotar imágenes y después crea el PDF. La proporción se conserva, así que una imagen vertical en una hoja horizontal puede mostrar más espacio a los lados.',
      ],
    },
    {
      heading: 'Tamaño, calidad, OCR y funciones que no incluye',
      paragraphs: [
        'La herramienta incorpora los bytes JPG o PNG y no muestra un control de compresión. El tamaño final depende del número de imágenes, su resolución, formato y peso. Una colección de fotografías grandes puede producir un PDF grande o agotar la memoria del teléfono. Comprime o redimensiona copias antes si el portal impone un límite.',
        'El texto fotografiado sigue siendo una imagen: no hay OCR, capa de texto seleccionable, corrección de perspectiva, búsqueda, firma, contraseña, número de página, pie, título ni metadatos editoriales. Tampoco valida requisitos administrativos. Si el destino exige PDF/A, firma digital, OCR o una resolución concreta, utiliza un flujo especializado y conserva las imágenes originales.',
      ],
    },
    {
      heading: 'Privacidad, memoria y comprobación antes de enviar',
      paragraphs: [
        'Las imágenes se leen y el PDF se construye en este navegador mediante una biblioteca cargada por la propia página. Los archivos no se envían a FunnyTools para producir el resultado. La página web sí necesita conexiones normales para cargarse y puede incluir analítica o publicidad según la política general; eso es distinto del contenido de las imágenes.',
        'Abre la descarga y comprueba el número total de páginas, primera y última, orden, orientación, márgenes, legibilidad, tamaño del archivo y nombre. Amplía texto pequeño y prueba la impresión o carga en el portal final. Guarda los originales: un PDF creado correctamente no demuestra que una institución acepte fotos, que el texto sea legible o que una copia tenga valor oficial.',
      ],
    },
  ],
  instructions: [
    'Selecciona una o varias imágenes JPG, JPEG o PNG; convierte antes cualquier otro formato.',
    'Revisa los nombres y usa «Subir» o «Bajar» para establecer el orden exacto de las páginas.',
    'Elige A4, Carta o ajustar a la imagen, y define orientación vertical u horizontal.',
    'Pulsa «Crear y descargar PDF» y espera a que termine el procesamiento en el navegador.',
    'Abre el PDF y verifica páginas, orden, orientación, márgenes, legibilidad y límite del destino.',
  ],
  examples: [
    'Reunir fotografías de recibos en un solo PDF para revisar gastos.',
    'Ordenar páginas escaneadas de una tarea o solicitud antes de entregarla.',
    'Convertir imágenes PNG de un diseño en un documento visual paginado.',
    'Crear un PDF con anverso y reverso, verificando cuidadosamente el orden.',
    'Preparar fotos de notas para compartirlas como un único archivo, sin afirmar que tienen OCR.',
  ],
  audience: [
    'Estudiantes que deben entregar varias páginas fotografiadas como un PDF.',
    'Oficinas que agrupan recibos, anexos o escaneos visuales.',
    'Creadores que presentan una secuencia de imágenes en un documento.',
    'Personas que prefieren crear el PDF localmente sin subir fotos privadas.',
  ],
  caseStudies: [
    {
      title: 'Solicitud con tres páginas fotografiadas',
      description: 'La persona selecciona portada, formulario y anexo, mueve el anexo al final y elige A4 vertical. Abre el PDF, verifica tres páginas y amplía cada campo antes de cargarlo al portal.',
    },
    {
      title: 'Recibos horizontales y verticales',
      description: 'Los recibos tienen formas distintas. Se usa A4 vertical para mantener un formato común; aparecen espacios blancos, pero ninguna imagen se estira. Después se comprueba que las cifras sean legibles.',
    },
    {
      title: 'WebP antes de crear el PDF',
      description: 'Una captura está en WebP y no es una entrada admitida. Se convierte a JPG, se abre la copia para revisar el fondo y solo entonces se añade a la lista junto con las demás imágenes.',
    },
  ],
  notes: [
    'Solo se admiten JPG, JPEG y PNG; renombrar otra extensión no convierte el archivo.',
    'La orientación cambia la página, no gira una fotografía que ya esté acostada.',
    'A4 y Carta usan margen fijo; ajustar a imagen usa los píxeles como puntos PDF y no garantiza DPI de impresión.',
    'No hay OCR, compresión configurable, contraseña, firma, varias fotos por hoja ni PDF como entrada.',
    'El consumo de memoria crece con el número y la resolución de las imágenes; conserva los originales.',
  ],
  faq: [
    {
      q: '¿Cómo convertir varias imágenes a un solo PDF?',
      a: 'Selecciona los JPG o PNG, ordénalos, elige tamaño y orientación y pulsa crear. Cada imagen ocupará una página.',
    },
    {
      q: '¿Puedo cambiar el orden de las fotos?',
      a: 'Sí. Los botones Subir y Bajar mueven cada archivo una posición antes de generar el PDF.',
    },
    {
      q: '¿Admite WebP, HEIC, GIF o SVG?',
      a: 'No directamente. Esta herramienta solo incrusta JPG/JPEG y PNG; convierte una copia real antes de seleccionarla.',
    },
    {
      q: '¿Qué diferencia hay entre A4, Carta y ajustar a la imagen?',
      a: 'A4 y Carta crean hojas estándar con margen; ajustar usa las dimensiones numéricas de cada imagen como página sin margen.',
    },
    {
      q: '¿El PDF tendrá texto seleccionable u OCR?',
      a: 'No. Las palabras continúan dentro de imágenes. Esta herramienta no reconoce texto ni crea una capa buscable.',
    },
    {
      q: '¿Las fotos se suben a FunnyTools?',
      a: 'No. Los archivos se leen e incorporan al PDF en la memoria de este navegador.',
    },
  ],
  labels: {
    localNote: 'Las imágenes y el PDF se procesan en este navegador; no se suben a FunnyTools.',
    upload: 'Seleccionar imágenes JPG o PNG',
    selectedImages: 'Imágenes seleccionadas y orden de páginas',
    noFiles: 'Todavía no has seleccionado imágenes',
    pageSize: 'Tamaño de página',
    a4: 'A4',
    letter: 'Carta',
    fit: 'Ajustar a la imagen',
    orientation: 'Orientación de la página',
    portrait: 'Vertical',
    landscape: 'Horizontal',
    moveUp: 'Subir',
    moveDown: 'Bajar',
    create: 'Crear y descargar PDF',
    reset: 'Borrar todo',
    processing: 'Creando el PDF en este navegador…',
    downloaded: 'La descarga del PDF ha comenzado',
    noImages: 'Selecciona al menos una imagen JPG o PNG.',
    invalidType: 'Selecciona únicamente archivos JPG, JPEG o PNG.',
    imageError: 'No se ha podido leer una de las imágenes.',
    createError: 'No se ha podido crear el PDF. Revisa los formatos o utiliza imágenes más pequeñas.',
  },
  privacyNote: 'Las imágenes se leen y el PDF se construye en la memoria de este navegador. FunnyTools no recibe los archivos ni conserva el documento generado. La lista desaparece al borrar, recargar o cerrar la pestaña.',
  disclaimer: 'Comprueba el PDF antes de enviarlo. La herramienta no añade OCR, firma, validez oficial, compresión garantizada ni conformidad con los requisitos de una institución.',
};

export const spanishImagesToPdfReview = {
  heading: 'Cómo revisar un PDF creado con imágenes',
  intro: 'La descarga debe comprobarse como documento completo, no solo como una lista de archivos aceptados.',
  panels: [
    {
      title: 'Recorre todas las páginas',
      text: 'Confirma cantidad, orden, primera y última página y que no se haya intercambiado anverso, reverso o capítulo.',
    },
    {
      title: 'Amplía el contenido',
      text: 'Revisa texto pequeño, bordes, contraste y orientación. Una foto incluida no se convierte automáticamente en texto legible.',
    },
    {
      title: 'Prueba el destino',
      text: 'Comprueba tamaño del archivo, impresión y carga en el portal real, además de cualquier requisito de OCR, firma o formato.',
    },
  ],
  checklistHeading: 'Lista de comprobación',
  checklist: [
    'El número y el orden de páginas coinciden con la entrega prevista.',
    'Cada imagen aparece orientada, proporcionada y legible.',
    'El tamaño de página y los márgenes son adecuados para pantalla o impresión.',
    'El archivo cumple el límite del destino y los originales permanecen guardados.',
  ],
};
