import type { ToolContent } from '../tools/_types';

export const spanishImageCropper: ToolContent = {
  name: 'Recortar imagen online',
  short: 'Selecciona con el dedo o el ratón la parte de una foto que quieres conservar y descarga el recorte.',
  long: 'Este recortador de imágenes abre una foto, captura o gráfico directamente en tu navegador. La vista previa comienza con una selección central y puedes arrastrar sobre ella para marcar cualquier rectángulo. El indicador muestra el ancho y el alto correspondientes a la resolución original, no solo el tamaño reducido de la pantalla. Al descargar, la herramienta intenta conservar JPG, PNG o WebP. La imagen no se sube a FunnyTools.',
  seoTitle: 'Recortar imagen online gratis y sin subir la foto',
  seoDescription: 'Recorta una imagen online: arrastra para elegir el área, comprueba sus píxeles y descarga JPG, PNG o WebP sin subir la foto.',
  keywords: [
    'recortar imagen online',
    'recortar foto gratis',
    'cortar imagen online',
    'recortador de imágenes',
    'recortar una foto',
    'seleccionar parte de una imagen',
    'crop imagen online',
  ],
  capabilities: [
    'Abrir una imagen de hasta 20 MB y 40 millones de píxeles.',
    'Seleccionar libremente un área rectangular mediante ratón, lápiz o pantalla táctil.',
    'Ver el tamaño del recorte calculado sobre los píxeles de la imagen original.',
    'Mantener JPG, PNG o WebP cuando el navegador puede volver a escribir ese formato.',
    'Descargar una copia nueva sin modificar ni subir el archivo original.',
  ],
  contentSections: [
    {
      heading: 'Respuesta rápida: cómo recortar una imagen',
      paragraphs: [
        'Selecciona la imagen y espera a que aparezca una zona central marcada. Si esa zona no contiene el encuadre que necesitas, arrastra desde una esquina hasta la esquina opuesta para dibujar otro rectángulo. Comprueba el valor «Tamaño del recorte», pulsa «Recortar y descargar» y abre la copia para confirmar que no falta ningún borde, texto o elemento importante.',
        'La selección es libre: esta versión no incluye botones 1:1, 4:3, 16:9, recorte circular, zoom ni campos numéricos. Puedes aproximar una proporción observando los píxeles mostrados, pero no debes asumir que el marco queda bloqueado. Si un formulario exige exactamente 600 × 600, recorta primero una zona cuadrada y utiliza después el redimensionador para obtener las medidas finales.',
      ],
    },
    {
      heading: 'Recortar no es redimensionar ni eliminar el fondo',
      paragraphs: [
        'Recortar elimina los píxeles situados fuera del rectángulo elegido y cambia el encuadre. Redimensionar conserva toda la escena, pero cambia su ancho y alto. Si una persona aparece pequeña en el centro de una fotografía grande, el recorte puede acercar visualmente el sujeto; si la foto completa debe entrar en un límite de 800 píxeles, hace falta redimensionar.',
        'Tampoco es una herramienta de eliminación de fondo. Solo puede cortar por los cuatro lados de un rectángulo. Un objeto irregular, el cabello o el espacio entre dos personas seguirán conservando los píxeles de alrededor. Para crear transparencia alrededor del sujeto se necesita una máscara o una función específica; cambiar a PNG por sí solo no realiza esa selección.',
      ],
      items: [
        'Recortar: conserva una zona rectangular y descarta el resto.',
        'Redimensionar: cambia la cantidad de píxeles de toda la imagen.',
        'Comprimir: intenta reducir bytes sin decidir el encuadre.',
        'Eliminar fondo: identifica píxeles alrededor de un sujeto, función que esta página no incluye.',
      ],
    },
    {
      heading: 'Cómo leer el tamaño de selección en píxeles',
      paragraphs: [
        'Para que una fotografía grande quepa en la pantalla, la herramienta reduce solo su vista de trabajo hasta un máximo aproximado de 760 píxeles. Mantiene un factor de escala interno y convierte cada movimiento al tamaño de la fuente. Por eso una selección que ocupa 300 píxeles en la vista puede representar 1500 píxeles en la descarga.',
        'El indicador muestra ancho × alto, no coordenadas ni peso. Una selección 1200 × 800 tiene proporción 3:2; una 900 × 900 es cuadrada. En una selección libre puede ser difícil alcanzar una cifra exacta con el dedo. Utiliza el recorte para definir la composición y el redimensionador para cumplir el valor final si el destino exige medidas precisas.',
      ],
    },
    {
      heading: 'Composición: qué conviene mantener dentro del marco',
      paragraphs: [
        'Antes de soltar el puntero, identifica el sujeto principal, el espacio que necesita y cualquier información situada cerca de los bordes. Un retrato puede necesitar aire sobre la cabeza; una captura debe conservar el título o la columna que da contexto; una fotografía de producto no debería cortar accesorios incluidos en la venta.',
        'No existe un encuadre universal para todas las plataformas. Una portada horizontal, una miniatura y una foto de perfil utilizan formas distintas, y las interfaces pueden volver a recortar en pantallas pequeñas. Guarda margen alrededor del contenido crítico y prueba el archivo en el contenedor real. Las medidas populares cambian; no las presentamos como reglas permanentes.',
      ],
    },
    {
      heading: 'Formato, calidad y propiedades de la descarga',
      paragraphs: [
        'El recorte se dibuja en un lienzo nuevo a la resolución calculada. Para una entrada JPEG, PNG o WebP, el navegador intenta exportar el mismo tipo; otros formatos pueden terminar como PNG. JPEG y WebP se vuelven a codificar con calidad alta, por lo que puede existir una variación visual o de peso. PNG conserva transparencia dentro del rectángulo, pero no crea transparencia nueva.',
        'La nueva imagen no garantiza conservar EXIF, fecha, ubicación, orientación, perfil de cámara, animación o comentarios. El nombre descargado incluye las dimensiones del recorte para diferenciarlo, pero el original debe mantenerse como archivo maestro. Si los metadatos tienen valor legal, periodístico o profesional, no los sustituyas por esta copia sin una revisión específica.',
      ],
    },
    {
      heading: 'Límites, móvil y comprobación final',
      paragraphs: [
        'La entrada está limitada a 20 MB y 40 millones de píxeles. Un archivo permitido todavía puede utilizar mucha memoria al decodificarse. En móvil, usa un gesto de un solo dedo dentro del lienzo y comprueba que el desplazamiento de la página no haya interferido. Una pantalla grande facilita seleccionar bordes pequeños, pero no cambia la resolución de salida.',
        'Después de descargar, abre la imagen fuera de la página y revisa las cuatro esquinas, orientación, formato, dimensiones, transparencia y nitidez. Luego colócala en el perfil, documento, tienda o formulario real. El recortador demuestra qué píxeles ha conservado; no puede garantizar que una plataforma no vuelva a ampliar, comprimir o cortar el archivo.',
      ],
    },
  ],
  instructions: [
    'Selecciona una imagen JPG, PNG, WebP u otro formato que el navegador pueda abrir.',
    'Revisa la selección central inicial y el tamaño indicado sobre la resolución original.',
    'Arrastra sobre la imagen para dibujar el rectángulo exacto que quieres conservar.',
    'Comprueba ancho, alto, bordes y composición antes de pulsar «Recortar y descargar».',
    'Abre la copia y pruébala en el destino; redimensiónala después si necesitas píxeles exactos.',
  ],
  examples: [
    'Quitar espacio vacío de los bordes de una fotografía de producto.',
    'Conservar la parte relevante de una captura sin compartir información situada alrededor.',
    'Preparar un encuadre cuadrado aproximado antes de redimensionarlo a 600 × 600.',
    'Extraer un detalle de una imagen grande para una presentación o documento.',
    'Reencuadrar un retrato sin estirar la cara ni alterar la proporción del contenido conservado.',
  ],
  audience: [
    'Personas que necesitan eliminar bordes o zonas innecesarias de una foto.',
    'Tiendas y creadores que preparan miniaturas, productos, portadas y perfiles.',
    'Estudiantes y equipos de oficina que extraen una parte de capturas o documentos visuales.',
    'Usuarios que prefieren trabajar localmente con imágenes privadas sin instalar un editor.',
  ],
  caseStudies: [
    {
      title: 'Foto de perfil cuadrada',
      description: 'Un retrato horizontal incluye mucho paisaje. La persona arrastra una zona casi cuadrada alrededor del rostro, deja margen para el recorte circular de la plataforma y descarga. Después utiliza el redimensionador para obtener exactamente 600 × 600.',
    },
    {
      title: 'Captura con información privada',
      description: 'Una captura muestra el mensaje necesario y una barra lateral con nombres. Se selecciona solo el mensaje, se comprueban los cuatro bordes y se abre la descarga antes de compartir. El usuario confirma además que no queden datos sensibles dentro de la zona.',
    },
    {
      title: 'Producto sin cortar accesorios',
      description: 'Una tienda quiere eliminar una mesa vacía alrededor del producto. El primer marco corta parte del cable incluido; la lectura visual permite ampliar la selección antes de descargar y conservar todo lo descrito en la ficha.',
    },
  ],
  notes: [
    'La selección es rectangular y libre; no incluye proporciones bloqueadas, círculo, zoom ni cifras editables.',
    'El valor de selección corresponde a la resolución original aunque la vista sea más pequeña.',
    'JPEG y WebP se vuelven a codificar; el peso y algunos píxeles pueden cambiar.',
    'La copia puede perder EXIF, perfiles, orientación, animación u otros metadatos.',
    'Recortar no elimina fondos irregulares y el límite es 20 MB y 40 millones de píxeles.',
  ],
  faq: [
    {
      q: '¿Cómo recortar una imagen online?',
      a: 'Selecciona el archivo, arrastra sobre la vista previa para marcar el rectángulo que quieres conservar y descarga la copia.',
    },
    {
      q: '¿Puedo recortar una foto a 1:1 o 16:9?',
      a: 'La selección actual es libre y no bloquea proporciones. Usa la lectura de píxeles para aproximarla y redimensiona después si necesitas medidas exactas.',
    },
    {
      q: '¿Recortar reduce la calidad?',
      a: 'El área se toma a resolución original, pero JPEG y WebP se vuelven a codificar. Conserva el original y revisa la descarga al 100 %.',
    },
    {
      q: '¿Puedo quitar el fondo de una foto?',
      a: 'No. El recorte solo elimina lo que queda fuera de un rectángulo; no detecta el contorno de un sujeto ni crea una máscara.',
    },
    {
      q: '¿Qué formato tendrá el archivo?',
      a: 'Intenta conservar JPG, PNG o WebP. Para otros formatos que el navegador pueda leer, la salida puede ser PNG.',
    },
    {
      q: '¿La imagen se sube a FunnyTools?',
      a: 'No. La lectura, selección y exportación se realizan en la memoria de tu navegador.',
    },
  ],
  labels: {
    localNote: 'La imagen se recorta en este navegador y no se sube a FunnyTools.',
    upload: 'Seleccionar imagen',
    hint: 'Arrastra sobre la imagen para marcar la zona rectangular que quieres conservar.',
    canvasLabel: 'Vista de selección para recortar imagen',
    originalSize: 'Tamaño del archivo original',
    dimensions: 'Dimensiones originales',
    selection: 'Tamaño del recorte',
    cropDownload: 'Recortar y descargar',
    reset: 'Restablecer',
    invalidType: 'Selecciona un archivo de imagen válido.',
    tooLarge: 'La imagen supera el límite de 20 MB o 40 millones de píxeles.',
    processError: 'No se ha podido abrir la imagen. Prueba con otro archivo.',
    noSelection: 'Arrastra sobre la imagen para seleccionar una zona.',
  },
  privacyNote: 'La imagen se decodifica, muestra y recorta en la memoria del navegador. FunnyTools no recibe el archivo ni la zona seleccionada. Los datos temporales desaparecen al restablecer o cerrar la pestaña.',
  disclaimer: 'Conserva el original y comprueba la descarga. FunnyTools no garantiza una proporción exacta, la conservación de metadatos ni el recorte posterior que pueda aplicar otra plataforma.',
};

export const spanishImageCropperReview = {
  heading: 'Cómo comprobar que el recorte conserva lo necesario',
  intro: 'La validación debe mirar el encuadre completo, los píxeles de salida, el formato y el uso final.',
  panels: [
    {
      title: 'Revisa las cuatro esquinas',
      text: 'Abre la descarga y confirma que no faltan cabellos, texto, accesorios, sombras o contexto cerca de ningún borde.',
    },
    {
      title: 'Confirma las dimensiones',
      text: 'Compara el nombre y las propiedades del archivo con el valor mostrado. Si necesitas una cifra exacta, redimensiona la copia después.',
    },
    {
      title: 'Prueba el contenedor real',
      text: 'Coloca la imagen en el perfil, documento o tarjeta final y comprueba si el sistema aplica otro recorte o una máscara circular.',
    },
  ],
  checklistHeading: 'Lista de comprobación',
  checklist: [
    'El sujeto y el contexto necesario permanecen dentro de los cuatro bordes.',
    'No se comparte información sensible que estaba alrededor.',
    'Formato, dimensiones, transparencia y nitidez son adecuados.',
    'El archivo original permanece guardado.',
  ],
};

export const spanishJpgToWebp: ToolContent = {
  name: 'Convertir JPG a WebP online',
  short: 'Pasa una imagen JPG a WebP, ajusta la calidad y compara el peso antes de descargar.',
  long: 'Este conversor abre un JPG o JPEG directamente en tu navegador y crea una copia WebP con las mismas dimensiones. El control de calidad va de 40 % a 100 % y la vista previa se regenera al moverlo. Puedes comparar el tamaño original y el resultante antes de descargar. La conversión no sube el archivo a FunnyTools, no redimensiona y no garantiza que todos los WebP sean menores.',
  seoTitle: 'Convertir JPG a WebP online gratis y comparar peso',
  seoDescription: 'Convierte JPG a WebP en el navegador, ajusta la calidad, compara el tamaño y descarga sin subir la imagen ni cambiar sus píxeles.',
  keywords: [
    'convertir JPG a WebP',
    'JPG a WebP online',
    'pasar JPEG a WebP',
    'convertidor WebP gratis',
    'reducir imagen WebP',
    'optimizar imágenes para web',
    'crear imagen WebP',
  ],
  capabilities: [
    'Abrir JPG o JPEG mediante un selector específico para esos formatos.',
    'Crear una copia image/webp con el mismo ancho y alto.',
    'Ajustar la calidad solicitada al codificador entre 40 % y 100 %.',
    'Comparar el peso del archivo de entrada y el WebP resultante.',
    'Descargar localmente sin registro y sin modificar el JPG original.',
  ],
  contentSections: [
    {
      heading: 'Respuesta rápida: cómo convertir JPG a WebP',
      paragraphs: [
        'Selecciona el JPG, espera a que aparezcan las dos vistas previas y empieza con 85 %, que es el valor inicial. Compara el peso, amplía los detalles importantes y mueve la calidad en pasos pequeños. Descarga el WebP solo cuando el ahorro y la apariencia sean adecuados. Después pruébalo en el sitio, CMS o aplicación que vaya a servirlo.',
        'La herramienta conserva el ancho y el alto. Cambiar de formato no reduce automáticamente una foto de 4000 × 3000 a las dimensiones de pantalla. Para una web, primero determina el tamaño real de presentación y utiliza el redimensionador; después convierte o comprime. Ese orden suele evitar enviar millones de píxeles que el navegador terminará mostrando muy pequeños.',
      ],
    },
    {
      heading: 'Qué es WebP y por qué se usa en páginas web',
      paragraphs: [
        'WebP es un formato de imagen que admite compresión con pérdida y sin pérdida, transparencia y animación. Esta herramienta utiliza la exportación WebP del lienzo con un parámetro de calidad, por lo que está orientada a una copia con pérdida para fotografías y gráficos compatibles. No expone un selector de modo sin pérdida ni conserva animación.',
        'Los navegadores modernos reconocen WebP ampliamente, pero el sistema de destino sigue importando. Un sitio puede mostrarlo bien mientras una aplicación antigua, un editor de documentos o un formulario lo rechaza. Para contenido web, comprueba la matriz real de navegadores y el pipeline del CMS; para entregar a otra persona, pregunta si necesita JPG además del WebP.',
      ],
    },
    {
      heading: 'Calidad WebP: cómo elegir un valor útil',
      paragraphs: [
        'El porcentaje es una instrucción al codificador del navegador, no una medida universal de fidelidad. Un 80 % en WebP no equivale exactamente a 80 % JPEG, y dos navegadores podrían producir bytes distintos. Empieza en 85 %, revisa texto, rostros, hojas, cabello, degradados y zonas de contraste, y baja hasta encontrar el menor resultado aceptable.',
        'La miniatura puede ocultar artefactos. Abre la descarga al 100 % y también al tamaño real de uso. Una imagen de producto puede necesitar textura legible; una fotografía decorativa de fondo puede tolerar más compresión. Conserva el JPG maestro porque volver a convertir entre formatos con pérdida puede acumular errores.',
      ],
    },
    {
      heading: '¿WebP siempre pesa menos que JPG?',
      paragraphs: [
        'No. WebP suele comprimir fotografías eficientemente, pero un JPEG ya muy optimizado puede resultar menor, especialmente si eliges calidad WebP alta. El contenido, ruido, resolución, codificador y metadatos influyen. La comparación mostrada en la página es la evidencia para ese archivo concreto.',
        'Si el WebP pesa más, no existe obligación de utilizarlo. Prueba una calidad menor, redimensiona la imagen o conserva el JPG. Un cambio de extensión no mejora Core Web Vitals por sí solo: también importan dimensiones correctas, `srcset`, carga diferida, caché, prioridad de la imagen principal y bytes realmente transferidos.',
      ],
    },
    {
      heading: 'Dimensiones, transparencia y metadatos',
      paragraphs: [
        'La salida conserva las dimensiones naturales del JPG. Como JPEG no contiene transparencia, el WebP creado será normalmente opaco; aunque WebP admite alfa, esta conversión no inventa un canal transparente. Tampoco aumenta la resolución ni recupera detalle perdido por compresiones anteriores.',
        'El proceso vuelve a dibujar los píxeles y no garantiza conservar EXIF, ubicación, fecha, orientación, perfil de cámara o comentarios. Esto puede reducir algunos bytes, pero impide usar la copia como archivo maestro. Para fotografía profesional o prueba documental, guarda el JPG original y gestiona los metadatos mediante un flujo específico.',
      ],
    },
    {
      heading: 'Límites, privacidad y validación de publicación',
      paragraphs: [
        'La entrada está limitada a 20 MB y 40 millones de píxeles para reducir bloqueos. Un móvil puede quedarse sin memoria con menos porque la imagen decodificada ocupa más que el JPG. El selector está limitado a JPEG; si un archivo tiene extensión incorrecta o está dañado, `createImageBitmap` puede rechazarlo.',
        'La conversión ocurre en la memoria del navegador y FunnyTools no recibe la imagen. Después de descargar, confirma que el archivo comienza como WebP, abre correctamente y se sirve con `Content-Type: image/webp`. Comprueba la página publicada en móvil y escritorio y conserva un fallback cuando el entorno de destino lo necesite.',
      ],
    },
  ],
  instructions: [
    'Selecciona un archivo JPG o JPEG de hasta 20 MB y 40 millones de píxeles.',
    'Espera a que aparezcan la vista previa original, la salida WebP y ambos tamaños.',
    'Mueve la calidad desde 85 % y revisa detalles al 100 % después de cada cambio.',
    'Compara bytes y conserva el JPG si el WebP pesa más o pierde detalle necesario.',
    'Descarga el .webp y pruébalo en el CMS, página o aplicación final.',
  ],
  examples: [
    'Preparar una fotografía de producto para una tienda que sirve WebP.',
    'Comparar 75 %, 85 % y 92 % antes de fijar una calidad para miniaturas.',
    'Convertir una portada ya redimensionada a 1200 píxeles de ancho.',
    'Comprobar que un JPG optimizado no mejora y conservar el archivo original.',
    'Crear una copia WebP para web sin enviar la fotografía a un conversor remoto.',
  ],
  audience: [
    'Propietarios de sitios, blogs y tiendas que preparan imágenes para la web.',
    'Desarrolladores que comparan bytes y compatibilidad antes de integrar recursos.',
    'Diseñadores y creadores que necesitan una copia WebP de fotografías.',
    'Usuarios que prefieren convertir localmente imágenes privadas.',
  ],
  caseStudies: [
    {
      title: 'Portada de blog ya redimensionada',
      description: 'Una autora reduce primero la portada a 1200 × 675. Prueba WebP al 82 %, revisa texto y degradado y obtiene una copia menor. Publica con dimensiones explícitas y conserva el JPG para ediciones futuras.',
    },
    {
      title: 'JPG que no mejora',
      description: 'Una miniatura JPEG ya optimizada pesa 34 KB. El WebP al 95 % resulta mayor. En lugar de asumir que el formato nuevo siempre gana, la persona conserva el JPG o prueba una calidad menor solo si la apariencia sigue siendo válida.',
    },
    {
      title: 'Compatibilidad antes de migrar',
      description: 'Un equipo convierte una imagen representativa y la prueba en CMS, navegador, correo y editor interno. El editor no admite WebP, por lo que mantiene JPG para documentos y utiliza WebP únicamente en la página web.',
    },
  ],
  notes: [
    'La conversión conserva las dimensiones; no sustituye redimensionar ni usar imágenes responsivas.',
    'El control genera WebP con pérdida y no ofrece modo sin pérdida o animado.',
    'WebP puede pesar más que un JPG ya optimizado.',
    'La salida normalmente pierde EXIF y otras propiedades que no forman parte del lienzo.',
    'El límite es 20 MB y 40 millones de píxeles; conserva siempre el JPG original.',
  ],
  faq: [
    {
      q: '¿Cómo convertir JPG a WebP?',
      a: 'Selecciona el JPEG, ajusta la calidad, compara el peso y descarga el archivo .webp generado en el navegador.',
    },
    {
      q: '¿WebP pesa siempre menos que JPG?',
      a: 'No. Depende de la imagen, el codificador y la calidad. Usa los tamaños mostrados y conserva el JPG si la copia no aporta ventaja.',
    },
    {
      q: '¿Cambian el ancho y el alto?',
      a: 'No. La herramienta mantiene las dimensiones naturales. Redimensiona por separado si la imagen tiene más píxeles de los necesarios.',
    },
    {
      q: '¿El WebP conserva transparencia?',
      a: 'WebP admite transparencia, pero un JPG no contiene alfa. Esta conversión produce una imagen normalmente opaca y no elimina fondos.',
    },
    {
      q: '¿Se mantienen los metadatos EXIF?',
      a: 'No se garantiza. Al dibujar y exportar de nuevo pueden perderse ubicación, fecha, orientación, perfiles y otros metadatos.',
    },
    {
      q: '¿La imagen se sube a internet?',
      a: 'La página se carga por internet, pero el archivo elegido se convierte localmente y no se envía a FunnyTools.',
    },
  ],
  labels: {
    outputMime: 'image/webp',
    extension: 'webp',
    accept: 'image/jpeg,.jpg,.jpeg',
    localNote: 'La imagen se convierte en este navegador y no se sube a FunnyTools.',
    upload: 'Seleccionar JPG',
    quality: 'Calidad WebP',
    background: 'Fondo de transparencia',
    source: 'Vista previa JPG',
    output: 'Vista previa WebP',
    originalSize: 'Tamaño JPG',
    outputSize: 'Tamaño WebP',
    download: 'Descargar WebP',
    reset: 'Restablecer',
    tooLarge: 'La imagen supera el límite de 20 MB o 40 millones de píxeles.',
    failed: 'No se ha podido convertir este JPG. Comprueba que el archivo sea válido.',
  },
  privacyNote: 'El JPG se decodifica y exporta como WebP en la memoria de este navegador. FunnyTools no recibe el archivo ni su contenido. Las URLs temporales se eliminan al restablecer o cerrar la pestaña.',
  disclaimer: 'Conserva el JPG original y valida el WebP en su destino. FunnyTools no garantiza un ahorro concreto, compatibilidad universal ni conservación de metadatos.',
};

export const spanishJpgToWebpReview = {
  heading: 'Cómo comprobar que el WebP mejora el flujo',
  intro: 'Una conversión útil debe demostrar ahorro, fidelidad y compatibilidad en el uso real.',
  panels: [
    {
      title: 'Compara bytes',
      text: 'Anota el tamaño de entrada y salida. Si el WebP pesa más, prueba otra calidad o conserva el JPG.',
    },
    {
      title: 'Revisa detalles',
      text: 'Amplía texto, bordes, piel y degradados. La vista previa pequeña puede ocultar artefactos con pérdida.',
    },
    {
      title: 'Prueba la publicación',
      text: 'Sirve el archivo como image/webp y verifica CMS, móvil, escritorio y cualquier aplicación que deba abrirlo.',
    },
  ],
  checklistHeading: 'Lista de comprobación',
  checklist: [
    'El WebP pesa menos o existe otra razón documentada para usarlo.',
    'Los detalles necesarios siguen siendo legibles.',
    'El destino acepta y sirve correctamente image/webp.',
    'El JPG original permanece guardado.',
  ],
};

export const spanishWebpToJpg: ToolContent = {
  name: 'Convertir WebP a JPG online',
  short: 'Pasa una imagen WebP a JPG, elige el fondo de la transparencia y ajusta la calidad.',
  long: 'Este conversor abre un archivo WebP en tu navegador, coloca un color detrás de la imagen y crea una copia JPEG con las mismas dimensiones. Puedes elegir el fondo para los píxeles transparentes, ajustar la calidad entre 40 % y 100 %, comparar pesos y descargar el .jpg. El archivo no se sube a FunnyTools. La herramienta crea una imagen fija y no conserva transparencia ni animación.',
  seoTitle: 'Convertir WebP a JPG online gratis con fondo',
  seoDescription: 'Convierte WebP a JPG en el navegador, elige fondo para la transparencia, ajusta calidad, compara peso y descarga sin subir.',
  keywords: [
    'convertir WebP a JPG',
    'WebP a JPG online',
    'pasar WebP a JPEG',
    'convertidor WebP gratis',
    'abrir WebP como JPG',
    'WebP a JPG fondo blanco',
    'cambiar imagen WebP a JPG',
  ],
  capabilities: [
    'Abrir un archivo WebP de hasta 20 MB y 40 millones de píxeles.',
    'Crear una copia JPEG con el mismo ancho y alto.',
    'Elegir el color que sustituye píxeles transparentes o semitransparentes.',
    'Ajustar la calidad JPEG entre 40 % y 100 % y comparar ambos pesos.',
    'Descargar el JPG localmente sin registro ni modificación del WebP original.',
  ],
  contentSections: [
    {
      heading: 'Respuesta rápida: cómo convertir WebP a JPG',
      paragraphs: [
        'Selecciona el archivo .webp, elige el color que debe quedar detrás —blanco es el valor inicial— y comienza con 85 % de calidad. Compara las vistas previas y los tamaños, revisa bordes y degradados y descarga el JPG. Ábrelo después en la aplicación, formulario o documento que no aceptaba WebP.',
        'JPEG no admite transparencia. Antes de dibujar el WebP, la herramienta rellena todo el lienzo con el color seleccionado. Los píxeles transparentes quedan sustituidos y los semitransparentes se mezclan con ese fondo. Esta operación es permanente en la copia: para conservar alfa, mantén el WebP o conviértelo a PNG mediante una herramienta adecuada.',
      ],
    },
    {
      heading: 'Transparencia, fondo y halos en los bordes',
      paragraphs: [
        'Un WebP puede contener canal alfa incluso cuando la parte transparente no resulta evidente sobre el fondo de la página. Si eliges blanco para una imagen diseñada sobre negro, los bordes semitransparentes pueden formar un halo claro. Selecciona un color parecido al lugar donde se utilizará el JPG y observa contornos, sombras y cabello al 100 %.',
        'El selector solo establece un color uniforme. No elimina un fondo ya opaco, no detecta al sujeto y no crea un degradado. Si el WebP incluye un rectángulo blanco como píxeles reales, elegir otro color no lo reemplazará. Si necesitas composición avanzada, exporta con transparencia a PNG o usa un editor de capas.',
      ],
      items: [
        'Transparencia total: muestra exactamente el color elegido.',
        'Semitransparencia: mezcla el color del píxel con el fondo.',
        'Fondo opaco: permanece igual, porque ya forma parte de la imagen.',
        'Animación: esta herramienta genera una sola imagen fija.',
      ],
    },
    {
      heading: 'Calidad JPEG y pérdida acumulada',
      paragraphs: [
        'La calidad controla la codificación JPEG solicitada al navegador. Un valor alto suele conservar más detalle y producir más bytes; uno bajo puede introducir bloques, ruido o bordes borrosos. No existe un porcentaje perfecto para todo. Empieza en 85 %, observa texto, rostros, líneas y degradados y ajusta según el destino.',
        'El WebP de entrada puede haber sido comprimido con pérdida. Convertirlo a JPEG añade otra codificación con pérdida y no recupera información. Evita ciclos WebP → JPG → WebP para editar repetidamente. Conserva la mejor fuente disponible y crea formatos de entrega al final del flujo.',
      ],
    },
    {
      heading: 'Compatibilidad: cuándo tiene sentido usar JPG',
      paragraphs: [
        'JPG sigue siendo útil cuando un formulario, editor de documentos, impresora, sistema antiguo o persona receptora no acepta WebP. También es una opción común para fotografías opacas. El objetivo de la conversión es compatibilidad, no una mejora automática de calidad.',
        'Si el destino admite WebP, convertir puede aumentar el peso o degradar la imagen. Si necesita transparencia o líneas muy nítidas, PNG puede ser más apropiado. Lee la especificación del sistema: algunas páginas aceptan MIME `image/jpeg`, pero rechazan archivos renombrados. Cambiar `.webp` por `.jpg` sin recodificar no modifica el formato real.',
      ],
    },
    {
      heading: 'Peso, dimensiones y metadatos',
      paragraphs: [
        'La herramienta mantiene el ancho y el alto del WebP. El JPG puede ser menor o mayor según el contenido y la calidad; no hay garantía. Si también debes cumplir un máximo de píxeles o KB, compara el peso y utiliza el redimensionador antes o después según tu flujo, conservando siempre una fuente original.',
        'La copia se crea desde los píxeles decodificados y no garantiza conservar ICC, EXIF, ubicación, fecha, orientación, comentarios o animación. El nombre mantiene la base y cambia la extensión a .jpg. Abre las propiedades de la descarga y no asumas que el cambio de extensión conserva toda la información del contenedor WebP.',
      ],
    },
    {
      heading: 'Privacidad, límites y prueba final',
      paragraphs: [
        'El archivo se procesa en la memoria del navegador y FunnyTools no recibe la imagen. La entrada está limitada a 20 MB y 40 millones de píxeles; móviles con menos memoria pueden necesitar archivos más pequeños. El selector acepta WebP, y un archivo dañado o con extensión falsa puede fallar.',
        'Comprueba la firma JPEG, dimensiones, orientación, fondo, color, peso y nitidez. Después carga la copia en el sistema que motivó la conversión. Solo esa prueba confirma compatibilidad. Si contiene información sensible, utiliza un equipo confiable y conserva la fuente fuera del directorio de descargas compartido.',
      ],
    },
  ],
  instructions: [
    'Selecciona el archivo WebP y espera a que aparezcan las vistas previas.',
    'Elige el color que debe sustituir las zonas transparentes; utiliza el fondo real del destino.',
    'Ajusta la calidad desde 85 % y compara el tamaño de entrada con el JPG.',
    'Amplía bordes, texto, degradados y sombras para detectar halos o artefactos.',
    'Descarga el .jpg, ábrelo y pruébalo en la aplicación o formulario final.',
  ],
  examples: [
    'Convertir una fotografía WebP para un formulario que solo acepta JPG.',
    'Crear una copia con fondo blanco para insertar en un documento.',
    'Elegir un fondo de marca para una ilustración WebP transparente.',
    'Abrir una imagen descargada de una web en software antiguo.',
    'Conservar el WebP cuando el JPG resulta mayor o pierde transparencia necesaria.',
  ],
  audience: [
    'Personas que encuentran un formulario o programa incompatible con WebP.',
    'Equipos de oficina que insertan fotografías en documentos y presentaciones.',
    'Diseñadores que deben decidir cómo aplanar la transparencia sobre un fondo.',
    'Usuarios que quieren convertir localmente una imagen sin enviarla a un servidor.',
  ],
  caseStudies: [
    {
      title: 'Formulario que solo admite JPEG',
      description: 'Una candidatura exige .jpg. La imagen WebP es opaca, se convierte al 88 %, se comprueban dimensiones y peso y el portal la acepta. El WebP original permanece guardado.',
    },
    {
      title: 'Logotipo transparente para una diapositiva',
      description: 'El WebP tiene bordes semitransparentes. Se elige el mismo azul de la diapositiva como fondo y se revisa el contorno. Para otra presentación con fondo distinto se vuelve al original y se crea otra copia, en vez de editar el JPG.',
    },
    {
      title: 'Animación que no debe convertirse',
      description: 'Un WebP animado muestra movimiento en un visor, pero el conversor genera una imagen fija. Como la animación es necesaria, la persona no utiliza el JPG y busca un formato de vídeo o animación aceptado por el destino.',
    },
  ],
  notes: [
    'JPEG no admite transparencia; el fondo elegido pasa a formar parte permanente del archivo.',
    'La herramienta genera una imagen fija y no conserva animación WebP.',
    'La conversión puede añadir pérdida a una fuente WebP ya comprimida.',
    'Las dimensiones se conservan, pero peso y metadatos no están garantizados.',
    'El límite es 20 MB y 40 millones de píxeles; renombrar la extensión no sustituye convertir.',
  ],
  faq: [
    {
      q: '¿Cómo convertir WebP a JPG?',
      a: 'Selecciona el WebP, elige el fondo y la calidad, compara la vista previa y descarga la copia JPEG.',
    },
    {
      q: '¿Qué ocurre con la transparencia?',
      a: 'Se mezcla con el color elegido porque JPEG no tiene canal alfa. El cambio es permanente en la copia.',
    },
    {
      q: '¿Puedo cambiar solo la extensión a .jpg?',
      a: 'No. Renombrar no cambia los bytes ni el MIME. Debes recodificar, como hace esta herramienta.',
    },
    {
      q: '¿Se mantiene la animación WebP?',
      a: 'No. El lienzo exporta una sola imagen fija. No uses esta conversión si el movimiento forma parte del contenido.',
    },
    {
      q: '¿El JPG pesará menos?',
      a: 'No está garantizado. Depende del WebP, la fotografía y la calidad elegida. Compara los tamaños mostrados.',
    },
    {
      q: '¿El archivo se sube a FunnyTools?',
      a: 'No. Se decodifica, aplana y exporta localmente en la memoria del navegador.',
    },
  ],
  labels: {
    outputMime: 'image/jpeg',
    extension: 'jpg',
    accept: 'image/webp,.webp',
    localNote: 'La imagen se convierte en este navegador y no se sube a FunnyTools.',
    upload: 'Seleccionar WebP',
    quality: 'Calidad JPG',
    background: 'Fondo de transparencia',
    source: 'Vista previa WebP',
    output: 'Vista previa JPG',
    originalSize: 'Tamaño WebP',
    outputSize: 'Tamaño JPG',
    download: 'Descargar JPG',
    reset: 'Restablecer',
    tooLarge: 'La imagen supera el límite de 20 MB o 40 millones de píxeles.',
    failed: 'No se ha podido convertir este WebP. Comprueba que el archivo sea válido.',
  },
  privacyNote: 'El WebP se decodifica, mezcla con el fondo y exporta como JPEG dentro de este navegador. FunnyTools no recibe el archivo. Las URLs temporales se eliminan al restablecer o cerrar la pestaña.',
  disclaimer: 'Conserva el WebP original y revisa el JPG. La conversión elimina transparencia y animación, puede añadir pérdida y no garantiza menor peso ni conservación de metadatos.',
};

export const spanishWebpToJpgReview = {
  heading: 'Cómo comprobar un JPG creado desde WebP',
  intro: 'La validación debe confirmar el fondo, la imagen fija, la calidad, el peso y la compatibilidad real.',
  panels: [
    {
      title: 'Inspecciona el fondo',
      text: 'Mira huecos, bordes, sombras y cabello. Toda transparencia debe haberse mezclado con el color elegido sin halos inesperados.',
    },
    {
      title: 'Confirma que el contenido es fijo',
      text: 'Si la fuente era animada, el JPG contiene una sola imagen. Verifica que perder movimiento sea aceptable.',
    },
    {
      title: 'Prueba el sistema',
      text: 'Carga la descarga en la aplicación o portal que rechazaba WebP y confirma MIME, dimensiones, peso y apariencia.',
    },
  ],
  checklistHeading: 'Lista de comprobación',
  checklist: [
    'La transparencia utiliza el fondo correcto.',
    'La pérdida de animación, si existía, es aceptable.',
    'Texto, bordes y degradados conservan detalle suficiente.',
    'El WebP original permanece guardado.',
  ],
};
