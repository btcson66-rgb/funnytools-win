import type { ToolContent } from '../tools/_types';

export const spanishImageResizer: ToolContent = {
  name: 'Redimensionar imagen online',
  short: 'Cambia el ancho y el alto de una imagen en píxeles, mantén la proporción y descarga una copia nueva.',
  long: 'Este redimensionador cambia las dimensiones reales de una foto, captura o gráfico directamente en tu navegador. Puedes escribir un ancho o un alto entre 1 y 8000 píxeles, conservar la proporción original para evitar deformaciones o desbloquearla cuando el destino exija unas medidas exactas. La vista previa muestra el resultado y la herramienta intenta conservar JPG, PNG o WebP. El archivo elegido no se sube a FunnyTools.',
  seoTitle: 'Redimensionar imagen online gratis por píxeles',
  seoDescription: 'Cambia el tamaño de una imagen por ancho y alto, conserva la proporción, previsualiza y descarga en el navegador sin subir el archivo.',
  keywords: [
    'redimensionar imagen online',
    'cambiar tamaño imagen',
    'cambiar tamaño foto',
    'ajustar imagen en píxeles',
    'reducir dimensiones imagen',
    'redimensionar foto gratis',
    'mantener proporción imagen',
  ],
  capabilities: [
    'Cambiar el ancho o el alto entre 1 y 8000 píxeles.',
    'Mantener automáticamente la proporción original mientras editas una dimensión.',
    'Usar accesos rápidos de 1080, 800 o 500 píxeles de ancho.',
    'Comparar la vista previa, las nuevas dimensiones y el peso aproximado de salida.',
    'Descargar una copia nueva sin modificar ni subir el archivo original.',
  ],
  contentSections: [
    {
      heading: 'Respuesta rápida: cómo cambiar el tamaño de una imagen',
      paragraphs: [
        'Selecciona una imagen y espera a que aparezcan sus dimensiones. Mantén activado «Conservar proporción» y escribe el ancho o el alto que necesitas; la otra medida se calcula automáticamente. Revisa la vista previa, confirma los píxeles indicados y descarga la copia. Si el portal exige exactamente dos medidas que no coinciden con la forma original, desactiva el candado solo después de valorar si la deformación es aceptable.',
        'Redimensionar modifica el número de píxeles de toda la imagen. No recorta los bordes, no elige una nueva composición y no inventa detalle real al ampliar. Si una foto horizontal debe convertirse en un cuadrado sin estirarse, primero necesitas recortar o añadir márgenes; escribir el mismo ancho y alto con la proporción desbloqueada aplastará o alargará el contenido.',
      ],
    },
    {
      heading: 'Ancho, alto y proporción: qué número debes introducir',
      paragraphs: [
        'El ancho es la medida horizontal y el alto la vertical. Su relación determina la forma de la imagen: 1600 × 900 y 800 × 450 comparten la proporción 16:9, mientras que 1080 × 1080 es cuadrada. Con el candado activo, cambiar 1600 por 800 ajusta el alto de 900 a 450 y conserva la geometría original.',
        'Empieza por la restricción más clara del destino. Si una web indica «máximo 1200 píxeles de ancho», escribe 1200 y deja que la herramienta calcule el alto. Si exige «600 × 600», comprueba primero si el original ya es cuadrado. Si no lo es, un recorte suele ser mejor que deformarlo. Los accesos 1080, 800 y 500 solo fijan el ancho; no son plantillas universales para ninguna red social.',
      ],
      items: [
        'Fotografía horizontal: decide el ancho máximo y conserva la proporción.',
        'Retrato vertical: puede ser más útil controlar el alto si el sistema limita esa medida.',
        'Imagen cuadrada: confirma que ancho y alto originales ya coinciden antes de usar una salida cuadrada.',
        'Formulario con medidas exactas: revisa si permite recortar, añadir fondo o solo redimensionar.',
      ],
    },
    {
      heading: 'Redimensionar, recortar y comprimir no son lo mismo',
      paragraphs: [
        'Redimensionar cambia la cantidad de píxeles de la imagen completa. Recortar elimina una zona del encuadre y puede cambiar su proporción. Comprimir intenta reducir los bytes mediante otra codificación o calidad, aunque conserve el ancho y el alto. Son operaciones relacionadas, pero resuelven requisitos distintos.',
        'Una foto de 4000 × 3000 puede seguir pesando demasiado después de bajarla a 1200 × 900, según el formato y el contenido. En ese caso, redimensiona primero y utiliza después el compresor de imágenes. A la inversa, comprimir una foto manteniendo 4000 × 3000 no satisface un formulario que exige un máximo de 1200 píxeles. Lee por separado los límites de dimensiones, peso y formato.',
      ],
    },
    {
      heading: 'Qué ocurre con el formato, la calidad y los metadatos',
      paragraphs: [
        'La herramienta dibuja la imagen a las nuevas dimensiones en un lienzo del navegador y crea un archivo nuevo. Para entradas JPEG, PNG y WebP intenta mantener el tipo original; si el navegador no puede escribir el formato, utiliza PNG. La calidad de JPEG y WebP se fija internamente en un valor alto, pero una nueva codificación puede alterar ligeramente los píxeles y el peso.',
        'Los metadatos ajenos a los píxeles —por ejemplo, ubicación, fecha, ciertos perfiles de color u orientación EXIF— no están garantizados en la copia. Conserva el original como archivo maestro, sobre todo en fotografía profesional, documentación o pruebas. El nombre descargado incluye las nuevas dimensiones para distinguir la copia, pero debes abrirla y comprobarla antes de sustituir cualquier archivo.',
      ],
    },
    {
      heading: 'Reducir o ampliar: efectos reales sobre la nitidez',
      paragraphs: [
        'Al reducir, varios píxeles del original deben resumirse en menos píxeles. Normalmente la imagen ocupa menos espacio y resulta adecuada para pantalla, pero el texto muy pequeño y los detalles finos pueden perder definición. Revisa la descarga al tamaño en que se mostrará y también al 100 % si contiene etiquetas, cifras o códigos.',
        'Al ampliar, el navegador interpola nuevos píxeles a partir de los existentes. El archivo tendrá más ancho y alto, pero no recuperará enfoque, textura ni información que no estaban en el original. Una miniatura de 200 × 150 convertida a 2000 × 1500 puede verse suave o pixelada. Para un cartel, impresión o identificación oficial, busca la fuente de mayor resolución en lugar de confiar en una ampliación.',
      ],
    },
    {
      heading: 'Límites del navegador y prueba final en el destino',
      paragraphs: [
        'La entrada está limitada a 20 MB y 40 millones de píxeles, y cada dimensión de salida debe estar entre 1 y 8000. Un archivo dentro de esos límites todavía puede consumir mucha memoria al decodificarse; en un móvil con pocos recursos la pestaña podría recargarse. Prueba con una imagen menor o utiliza un ordenador si el proceso no termina.',
        'La comprobación decisiva se realiza donde vas a usar la imagen. Abre la descarga, revisa sus propiedades y súbela al formulario, editor, tienda o red social. Confirma orientación, formato, peso, encuadre y legibilidad. FunnyTools puede producir las dimensiones indicadas, pero no conoce las reglas ocultas, la recompresión ni el recorte automático de cada plataforma.',
      ],
    },
  ],
  instructions: [
    'Selecciona una imagen JPG, PNG, WebP u otro formato que tu navegador pueda abrir.',
    'Comprueba el ancho y el alto originales y conserva activado el candado de proporción.',
    'Escribe una nueva dimensión o utiliza 1080, 800 o 500 píxeles como acceso rápido de ancho.',
    'Revisa la vista previa, las nuevas dimensiones, el formato esperado y el peso de salida.',
    'Descarga la copia, ábrela fuera de la página y pruébala en el sistema de destino.',
  ],
  examples: [
    'Reducir una fotografía de 4032 × 3024 a 1200 píxeles de ancho para una página web.',
    'Preparar capturas de 1920 × 1080 a 800 × 450 para un documento sin deformarlas.',
    'Crear una copia de 500 píxeles de ancho para enviar una vista previa por correo.',
    'Comprobar que una foto de perfil ya es cuadrada antes de pedir 600 × 600.',
    'Redimensionar primero y comprimir después cuando un portal limita píxeles y kilobytes.',
  ],
  audience: [
    'Personas que necesitan cumplir un máximo de ancho o alto en un formulario.',
    'Creadores de contenido que preparan imágenes para artículos, catálogos o presentaciones.',
    'Docentes y estudiantes que quieren uniformar capturas y material visual.',
    'Usuarios que prefieren trabajar localmente con fotos privadas sin instalar una aplicación.',
  ],
  caseStudies: [
    {
      title: 'Foto para una ficha de producto',
      description: 'Una tienda recibe una foto de 4000 × 3000. Introduce 1200 de ancho con la proporción bloqueada y obtiene 1200 × 900. Revisa etiquetas y textura, comprime después la copia y conserva el original para futuras ediciones.',
    },
    {
      title: 'Requisito cuadrado sin deformar',
      description: 'Un formulario pide 600 × 600, pero el retrato mide 1200 × 1600. La persona no desbloquea la proporción: primero recorta el encuadre a cuadrado y luego redimensiona. Así evita una cara visiblemente aplastada.',
    },
    {
      title: 'Ampliación que no crea detalle',
      description: 'Un logotipo de 180 × 80 se amplía a 1080 píxeles de ancho y los bordes se ven suaves. La prueba demuestra que hace falta el archivo vectorial o una fuente de mayor resolución; descargar un PNG mayor no soluciona el origen.',
    },
  ],
  notes: [
    'Redimensionar cambia píxeles; no recorta el encuadre ni elimina el fondo.',
    'Desbloquear la proporción puede estirar o comprimir visualmente la imagen.',
    'Ampliar aumenta las dimensiones, pero no recupera detalle real.',
    'La copia puede perder metadatos EXIF, perfiles, animación u otras propiedades.',
    'El límite es 20 MB, 40 millones de píxeles de entrada y 8000 píxeles por lado de salida.',
  ],
  faq: [
    {
      q: '¿Cómo redimensionar una imagen sin deformarla?',
      a: 'Mantén activada la opción «Conservar proporción» y cambia solo el ancho o el alto. La otra medida se calcula a partir de la relación original.',
    },
    {
      q: '¿Redimensionar una foto también reduce su peso?',
      a: 'Al reducir píxeles suele disminuir el peso, pero no está garantizado. Influyen el formato, el contenido y la codificación del navegador.',
    },
    {
      q: '¿Puedo poner una imagen horizontal en formato cuadrado?',
      a: 'Sí, pero si escribes ancho y alto iguales sin recortar, se deformará. Para conservar la apariencia, recorta primero o añade márgenes.',
    },
    {
      q: '¿Aumentar los píxeles mejora la calidad?',
      a: 'No. El navegador interpola píxeles nuevos, pero no puede recuperar enfoque ni detalle que no existían en el archivo.',
    },
    {
      q: '¿Qué formato tendrá la descarga?',
      a: 'La herramienta intenta mantener JPEG, PNG o WebP. Para otros tipos o formatos no exportables puede utilizar PNG.',
    },
    {
      q: '¿La imagen se sube a un servidor?',
      a: 'No. Se decodifica, redimensiona y exporta en la memoria de tu navegador. FunnyTools no recibe el archivo elegido.',
    },
  ],
  labels: {
    upload: 'Seleccionar imagen',
    width: 'Ancho en píxeles',
    height: 'Alto en píxeles',
    lockAspect: 'Conservar proporción',
    presets: 'Ancho rápido',
    sourcePreview: 'Vista previa original',
    outputPreview: 'Vista previa redimensionada',
    originalSize: 'Tamaño original',
    outputSize: 'Tamaño de salida',
    dimensions: 'Nuevas dimensiones',
    waiting: 'Selecciona una imagen',
    download: 'Descargar imagen',
    reset: 'Restablecer',
    invalidType: 'Selecciona un archivo de imagen válido.',
    tooLarge: 'La imagen es demasiado grande. Utiliza un archivo de menos de 20 MB y 40 millones de píxeles.',
    dimensionError: 'Introduce un ancho y un alto entre 1 y 8000 píxeles.',
    processError: 'No se ha podido redimensionar la imagen. Prueba con otro archivo.',
    localNote: 'La imagen se procesa en este navegador y no se sube a FunnyTools.',
  },
  privacyNote: 'El archivo se decodifica, redimensiona y vuelve a codificar en la memoria del navegador. FunnyTools no recibe la imagen ni incorpora sus píxeles o su nombre a la analítica. La copia temporal desaparece al restablecer o cerrar la pestaña.',
  disclaimer: 'Conserva el original y comprueba la descarga en su destino. FunnyTools no garantiza la conservación de metadatos, la mejora al ampliar ni la aceptación por parte de una plataforma.',
};

export const spanishImageResizerReview = {
  heading: 'Cómo comprobar una imagen redimensionada',
  intro: 'Una medida correcta no basta: también debes verificar proporción, nitidez, formato y aceptación en el sistema final.',
  panels: [
    {
      title: 'Confirma los píxeles',
      text: 'Abre las propiedades de la descarga y comprueba que el ancho y el alto coinciden con la salida mostrada. No confundas píxeles con centímetros, DPI o peso en KB.',
    },
    {
      title: 'Busca deformación',
      text: 'Observa círculos, rostros, logotipos y texto. Si parecen estirados, vuelve a activar la proporción y recorta o añade márgenes por separado.',
    },
    {
      title: 'Prueba el destino',
      text: 'Carga la copia en el formulario o editor real y comprueba si aplica otro recorte, cambia el formato o impone un límite adicional de peso.',
    },
  ],
  checklistHeading: 'Lista de comprobación',
  checklist: [
    'Ancho y alto coinciden con el requisito real.',
    'La proporción no deforma personas, texto ni formas.',
    'Los detalles necesarios siguen legibles.',
    'El original permanece guardado como copia maestra.',
  ],
};

export const spanishPngToJpg: ToolContent = {
  name: 'Convertir PNG a JPG online',
  short: 'Pasa una imagen PNG a JPG, elige el fondo de las zonas transparentes y ajusta la calidad.',
  long: 'Este conversor abre una imagen en tu navegador, coloca un color detrás de los píxeles transparentes y crea una copia JPEG. Puedes elegir el fondo, mover la calidad entre 10 % y 100 %, comparar las vistas previas y revisar el peso antes de descargar. El proceso no sube la imagen a FunnyTools. Aunque está diseñado para pasar PNG a JPG, acepta otros formatos que el navegador pueda decodificar.',
  seoTitle: 'Convertir PNG a JPG online gratis y elegir fondo',
  seoDescription: 'Pasa PNG a JPG en el navegador, rellena la transparencia con el color elegido, ajusta calidad, compara el peso y descarga sin subir.',
  keywords: [
    'convertir PNG a JPG',
    'pasar PNG a JPG',
    'PNG a JPG online gratis',
    'convertidor PNG a JPEG',
    'PNG a JPG fondo blanco',
    'quitar transparencia PNG',
    'cambiar imagen a JPG',
  ],
  capabilities: [
    'Convertir una imagen PNG o compatible en un archivo .jpg.',
    'Elegir el color que reemplazará las zonas total o parcialmente transparentes.',
    'Ajustar la calidad JPEG entre 10 % y 100 % y regenerar la vista previa.',
    'Comparar el tamaño original y el tamaño del JPG antes de descargar.',
    'Procesar un archivo de hasta 20 MB y 40 millones de píxeles sin subirlo.',
  ],
  contentSections: [
    {
      heading: 'Respuesta rápida: cómo pasar una imagen PNG a JPG',
      paragraphs: [
        'Selecciona el PNG, elige un color de fondo —blanco es la opción inicial— y ajusta la calidad JPEG. La herramienta muestra una vista previa y el peso de la nueva copia. Revisa especialmente bordes, texto, degradados y las zonas que eran transparentes. Cuando el resultado sea adecuado, descarga el archivo terminado en .jpg y pruébalo en el sistema donde vayas a utilizarlo.',
        'JPG no admite canal alfa. Por eso la transparencia del PNG no puede conservarse: antes de exportar, la herramienta pinta el fondo elegido y coloca la imagen encima. Una zona semitransparente se mezcla con ese color. Si necesitas mantener píxeles transparentes para un logotipo, una superposición o un recorte, conserva PNG o utiliza un formato compatible como WebP.',
      ],
    },
    {
      heading: 'Qué ocurre con la transparencia y el fondo',
      paragraphs: [
        'Un PNG puede incluir píxeles opacos, semitransparentes o totalmente transparentes. JPEG solo almacena color opaco. Si conviertes sin decidir el fondo, el resultado puede mostrar un rectángulo inesperado alrededor del objeto. Esta herramienta evita la ambigüedad mediante un selector: primero rellena todo el lienzo con ese color y después dibuja el PNG.',
        'El blanco funciona bien para documentos, catálogos y muchos formularios; un color de marca puede integrarse mejor en una pieza gráfica. La vista previa debe compararse con el destino real, porque una imagen diseñada para fondo oscuro puede tener bordes claros o halos al colocarla sobre blanco. Cambiar el color no equivale a eliminar el fondo de una fotografía: solo sustituye la transparencia existente.',
      ],
      items: [
        'Logotipo transparente para un formulario: elige el fondo que exige el documento.',
        'Ilustración con sombra semitransparente: revisa el halo después de mezclarla con el color.',
        'PNG sin transparencia: el fondo elegido no debería alterar las zonas ya opacas.',
        'Imagen que todavía tiene un fondo sólido: el conversor no detecta ni recorta el sujeto.',
      ],
    },
    {
      heading: 'Calidad JPEG: cómo elegir sin promesas falsas',
      paragraphs: [
        'JPEG utiliza compresión con pérdida. El porcentaje controla el equilibrio que solicita al codificador del navegador, pero no representa una cantidad exacta de detalle ni garantiza un peso concreto. Un 85 % puede ser suficiente para una fotografía y mostrar artefactos alrededor de letras finas; otra imagen puede seguir pesando demasiado aunque visualmente se vea bien.',
        'Empieza en 85 %, que es el valor inicial, y revisa al 100 % bordes, texto, cabello, cielos y degradados. Baja en pasos pequeños si necesitas menos bytes. Sube la calidad si aparecen bloques, ruido o contornos borrosos. Para gráficos de color plano, capturas con texto o iconos, PNG puede seguir siendo una opción más fiel aunque pese más.',
      ],
    },
    {
      heading: '¿Convertir PNG a JPG siempre reduce el tamaño?',
      paragraphs: [
        'No. Las fotografías PNG suelen reducirse al pasarlas a JPEG, pero un PNG pequeño, indexado o ya optimizado puede ser más ligero que la nueva copia. También influyen las dimensiones, la complejidad visual y la calidad elegida. La herramienta muestra ambos tamaños precisamente para que la decisión se base en bytes reales y no en una regla general.',
        'Si el JPG pesa más, baja la calidad, reduce las dimensiones con el redimensionador o conserva el PNG. Si el objetivo es cumplir un límite de 200 KB, convertir el formato puede no ser suficiente. Revisa por separado formato, píxeles y peso, y no borres el original hasta que el archivo final haya sido aceptado.',
      ],
    },
    {
      heading: 'Cuándo conviene JPG y cuándo conservar PNG',
      paragraphs: [
        'JPEG suele ser práctico para fotografías opacas, portales que solo aceptan .jpg y situaciones donde un archivo menor importa más que la reproducción exacta de cada píxel. PNG es preferible cuando necesitas transparencia, texto nítido, diagramas, capturas, iconos o una copia sin pérdidas para seguir editando.',
        'Convertir por compatibilidad no mejora la imagen. La salida conserva las dimensiones originales, pero vuelve a codificar los píxeles y puede eliminar metadatos. Si el PNG procede de una fotografía y ya no necesitas transparencia, JPG puede ser razonable. Si procede de un logotipo, conserva además el PNG maestro para futuras composiciones sobre otros fondos.',
      ],
    },
    {
      heading: 'Privacidad, memoria y compatibilidad del navegador',
      paragraphs: [
        'La imagen se lee mediante funciones locales del navegador, se dibuja en un lienzo y se exporta como image/jpeg. No se envía a FunnyTools para la conversión. La página limita la entrada a 20 MB y 40 millones de píxeles, pero un móvil puede quedarse sin memoria con archivos menores porque la imagen decodificada ocupa más que el archivo comprimido.',
        'Algunos formatos que aparecen en el selector pueden no ser decodificables en todos los navegadores. Las animaciones se convertirán como una imagen fija y los metadatos, perfiles u orientación no están garantizados. Para una prueba predecible, utiliza PNG, abre el JPG descargado en otro visor y confirma que el portal de destino acepta sus dimensiones y su color.',
      ],
    },
  ],
  instructions: [
    'Selecciona el PNG y comprueba la vista previa y el tamaño original.',
    'Elige el color que debe ocupar las zonas transparentes; empieza con blanco si el destino no especifica otro.',
    'Ajusta la calidad JPEG y observa cómo cambian la vista previa y el peso.',
    'Revisa al 100 % texto, bordes, degradados y halos alrededor de la transparencia.',
    'Descarga el .jpg, ábrelo en otro visor y pruébalo en el portal o documento final.',
  ],
  examples: [
    'Pasar una fotografía guardada como PNG a JPG para un formulario que no acepta PNG.',
    'Crear un JPG con fondo blanco a partir de un logotipo transparente para un documento.',
    'Probar varias calidades hasta cumplir un límite de peso sin volver ilegible el texto.',
    'Convertir una imagen para un sistema antiguo que solo admite extensiones .jpg o .jpeg.',
    'Conservar el PNG cuando la transparencia o los bordes nítidos son más importantes que el peso.',
  ],
  audience: [
    'Personas que deben entregar una imagen en formato JPG.',
    'Tiendas y equipos de contenido que preparan fotografías opacas para web o catálogos.',
    'Estudiantes y profesionales que necesitan elegir un fondo antes de insertar una imagen.',
    'Usuarios que quieren convertir localmente una imagen privada sin enviarla a un servicio remoto.',
  ],
  caseStudies: [
    {
      title: 'Fotografía para un formulario',
      description: 'Un portal acepta JPG de menos de 1 MB. La foto PNG pesa 2,6 MB y no tiene transparencia. La persona prueba 85 %, revisa el rostro y obtiene una copia válida. Después confirma las dimensiones y conserva el PNG original.',
    },
    {
      title: 'Logotipo sobre fondo corporativo',
      description: 'Un PNG transparente debe insertarse en una pieza azul. Se elige exactamente ese color antes de convertir. La revisión detecta un halo claro del diseño original, por lo que se vuelve al archivo maestro y se corrige antes de crear el JPG.',
    },
    {
      title: 'Captura donde PNG sigue siendo mejor',
      description: 'Una captura con texto pequeño se ve borrosa al 70 % y el JPG apenas reduce el peso. Como el sistema admite PNG, la persona conserva el original en lugar de aceptar una conversión que aporta menos fidelidad.',
    },
  ],
  notes: [
    'JPEG no admite transparencia; el fondo elegido pasa a formar parte permanente de la imagen.',
    'Cambiar el formato no elimina un fondo opaco ni recorta automáticamente el sujeto.',
    'La calidad es una solicitud al codificador, no una garantía de peso o fidelidad exactos.',
    'El resultado puede pesar más que el PNG original y puede perder metadatos o animación.',
    'La herramienta conserva las dimensiones y admite hasta 20 MB y 40 millones de píxeles.',
  ],
  faq: [
    {
      q: '¿Cómo convertir PNG a JPG con fondo blanco?',
      a: 'Selecciona el PNG y deja el selector de fondo en blanco (#ffffff). La herramienta rellena la transparencia antes de crear el JPG.',
    },
    {
      q: '¿Qué pasa con las partes transparentes?',
      a: 'Se mezclan con el color de fondo elegido, porque JPEG no admite canal alfa. Después de descargar no podrás recuperar esa transparencia desde el JPG.',
    },
    {
      q: '¿PNG a JPG reduce siempre el peso?',
      a: 'No. Depende de la imagen, la calidad y la codificación. Compara los tamaños mostrados y conserva el original si la copia pesa más.',
    },
    {
      q: '¿Qué calidad debo elegir?',
      a: 'Empieza alrededor de 85 % y revisa el resultado al 100 %. Baja para reducir peso o sube si aparecen artefactos visibles.',
    },
    {
      q: '¿Se cambian el ancho y el alto?',
      a: 'No. Este conversor conserva las dimensiones originales. Utiliza el redimensionador si también necesitas cambiar los píxeles.',
    },
    {
      q: '¿La conversión se realiza sin subir la imagen?',
      a: 'Sí. El archivo se decodifica y exporta en tu navegador; FunnyTools no recibe el contenido de la imagen.',
    },
  ],
  labels: {
    upload: 'Seleccionar imagen',
    background: 'Color de fondo',
    quality: 'Calidad JPG',
    sourcePreview: 'Vista previa original',
    outputPreview: 'Vista previa JPG',
    originalSize: 'Tamaño original',
    outputSize: 'Tamaño JPG',
    waiting: 'Selecciona una imagen',
    download: 'Descargar JPG',
    reset: 'Restablecer',
    invalidType: 'Selecciona un archivo de imagen válido.',
    tooLarge: 'La imagen es demasiado grande. Utiliza un archivo de menos de 20 MB y 40 millones de píxeles.',
    processError: 'No se ha podido convertir la imagen. Prueba con otro archivo PNG.',
    localNote: 'La imagen se convierte en este navegador y no se sube a FunnyTools.',
  },
  privacyNote: 'La imagen se decodifica, mezcla con el fondo y exporta como JPEG en la memoria del navegador. FunnyTools no recibe el archivo ni su contenido. La URL temporal de la copia se elimina al restablecer o cerrar la pestaña.',
  disclaimer: 'Conserva el PNG original y comprueba el JPG en su destino. La conversión elimina la transparencia y no garantiza un peso concreto, la conservación de metadatos ni la aceptación por una plataforma.',
};

export const spanishPngToJpgReview = {
  heading: 'Cómo comprobar un JPG creado desde PNG',
  intro: 'La revisión debe confirmar el fondo, la legibilidad, el peso y la compatibilidad, no solo que existe una descarga.',
  panels: [
    {
      title: 'Revisa la transparencia',
      text: 'Observa bordes, sombras y huecos del original. Todo debe haberse mezclado con el color elegido sin rectángulos ni halos inesperados.',
    },
    {
      title: 'Compara calidad y bytes',
      text: 'Amplía texto, rostros y degradados; después compara el tamaño. Una copia más pequeña no compensa si destruye información necesaria.',
    },
    {
      title: 'Valida el portal',
      text: 'Abre el JPG descargado y cárgalo en el destino real. Confirma extensión, MIME, dimensiones, peso y cualquier recorte adicional.',
    },
  ],
  checklistHeading: 'Lista de comprobación',
  checklist: [
    'El fondo elegido sustituye correctamente toda la transparencia.',
    'No hay artefactos inaceptables en texto, bordes o degradados.',
    'El peso y las dimensiones cumplen el requisito.',
    'El PNG original permanece guardado.',
  ],
};

export const spanishJpgToPng: ToolContent = {
  name: 'Convertir JPG a PNG online',
  short: 'Pasa una imagen JPG a PNG sin añadir otra pérdida y descarga una copia local.',
  long: 'Este conversor decodifica una imagen en tu navegador y crea un archivo PNG con las mismas dimensiones. La nueva exportación es sin pérdida, pero no deshace la compresión que ya tenía el JPG, no recupera detalle borrado y no convierte automáticamente el fondo en transparente. Sirve para obtener un formato PNG antes de ciertas ediciones o para un sistema que lo exige. El archivo no se sube a FunnyTools.',
  seoTitle: 'Convertir JPG a PNG online gratis y sin subir',
  seoDescription: 'Pasa JPG a PNG en el navegador, conserva dimensiones y descarga sin subir. Explica transparencia, calidad, peso y límites reales.',
  keywords: [
    'convertir JPG a PNG',
    'pasar JPG a PNG',
    'JPG a PNG online gratis',
    'convertidor JPEG a PNG',
    'cambiar imagen JPG a PNG',
    'JPG a PNG transparente',
    'guardar foto como PNG',
  ],
  capabilities: [
    'Convertir JPG, JPEG u otra imagen compatible en un archivo .png.',
    'Mantener el ancho y el alto originales durante la conversión.',
    'Comparar el peso original y el peso de la salida PNG.',
    'Evitar una nueva codificación JPEG con pérdida en la copia resultante.',
    'Procesar localmente hasta 20 MB y 40 millones de píxeles sin registro.',
  ],
  contentSections: [
    {
      heading: 'Respuesta rápida: cómo pasar una imagen JPG a PNG',
      paragraphs: [
        'Selecciona el archivo JPG, espera a que aparezcan las vistas previas y comprueba el peso resultante. Descarga el PNG y ábrelo en el editor o sistema que lo necesita. El ancho, el alto y la apariencia visible deberían mantenerse, aunque la nueva codificación puede cambiar el peso y eliminar metadatos.',
        'Convertir no significa quitar el fondo. Un JPG no contiene canal alfa: sus píxeles de fondo ya son colores opacos. El PNG creado seguirá viéndose opaco hasta que una herramienta de selección o eliminación de fondo identifique qué píxeles deben volverse transparentes. Tampoco se recuperan los detalles que JPEG descartó anteriormente.',
      ],
    },
    {
      heading: '¿El PNG tendrá fondo transparente?',
      paragraphs: [
        'El formato PNG admite transparencia, pero la conversión por sí sola no sabe qué parte de una fotografía representa el fondo. Si el JPG muestra un cuadrado blanco, ese blanco forma parte de la imagen igual que cualquier otro color. La salida PNG conserva ese cuadrado. Para hacerlo transparente necesitas editar el canal alfa, recortar una máscara o utilizar una herramienta específica de eliminación de fondo.',
        'Esta distinción evita uno de los errores más frecuentes de la consulta «JPG a PNG transparente». Cambiar la extensión o recodificar no separa al sujeto. Si el archivo original del logotipo ya existía como PNG transparente o SVG, recuperarlo suele dar un resultado más limpio que intentar eliminar el fondo de una copia JPEG con bordes comprimidos.',
      ],
      items: [
        'JPG con fondo blanco: el PNG seguirá teniendo píxeles blancos.',
        'JPG de una fotografía: toda la imagen seguirá opaca.',
        'PNG resultante: podrá recibir transparencia en una edición posterior.',
        'Logotipo con halo JPEG: conviene buscar el original antes de recortar el fondo.',
      ],
    },
    {
      heading: 'Calidad: qué se conserva y qué no se recupera',
      paragraphs: [
        'PNG utiliza compresión sin pérdida para la nueva copia. Eso significa que guardar ese PNG no añade artefactos JPEG adicionales en esta operación. Sin embargo, el navegador parte de los píxeles ya decodificados del JPG: bloques, ruido, bordes borrosos y detalle descartado forman parte de esa entrada y permanecen en la salida.',
        'El archivo PNG no mejora la resolución ni el enfoque. Su utilidad aparece cuando una aplicación exige PNG, cuando quieres evitar nuevas generaciones JPEG durante ediciones intermedias o cuando vas a añadir transparencia manualmente. Si necesitas mayor calidad, busca el original de cámara, una exportación previa o un recurso vectorial.',
      ],
    },
    {
      heading: 'Por qué el PNG suele pesar más que el JPG',
      paragraphs: [
        'JPEG está diseñado para comprimir fotografías con pérdida; PNG conserva cada píxel de la copia sin esa pérdida. Una foto compleja puede producir un PNG varias veces mayor que el JPG, aunque visualmente parezcan iguales. El tamaño mostrado permite comprobar el coste antes de descargar.',
        'Un archivo mayor no implica que haya aparecido más detalle. Solo refleja otro método de codificación. Si el objetivo principal es publicar una fotografía ligera en una web o enviarla por correo, mantener JPG o usar WebP suele ser más práctico. Si un formulario pide PNG, confirma también su límite de MB porque la conversión puede superarlo.',
      ],
    },
    {
      heading: 'Cuándo sí tiene sentido convertir a PNG',
      paragraphs: [
        'Conviene cuando el software de destino solo acepta PNG, cuando vas a realizar selecciones o composiciones que necesitan canal alfa, o cuando quieres guardar una etapa de edición sin volver a comprimir como JPEG. También puede resultar apropiado para una captura o gráfico que llegó en JPG pero seguirá editándose, aunque los artefactos existentes no desaparezcan.',
        'No conviene hacerlo solo por creer que «PNG siempre tiene más calidad» o que «PNG significa transparente». El formato debe responder al uso. Para fotografías finales, JPG suele ser más ligero; para logotipos, diagramas y texto nítido, la mejor fuente suele ser un PNG o SVG original, no una conversión tardía desde JPG.',
      ],
    },
    {
      heading: 'Proceso local, límites y propiedades que pueden perderse',
      paragraphs: [
        'La página lee el archivo, lo dibuja en un lienzo con sus dimensiones naturales y lo exporta como image/png. Este trabajo se realiza en la memoria del navegador; FunnyTools no recibe la imagen. El límite es 20 MB y 40 millones de píxeles, aunque dispositivos con poca memoria pueden necesitar archivos menores.',
        'La copia puede omitir EXIF, ubicación, fecha, perfiles específicos, orientación o animación. El selector acepta imágenes que el navegador reconoce, pero esta herramienta está pensada principalmente para JPG/JPEG. Abre la descarga fuera de la página, comprueba orientación y color, y conserva el original cuando esas propiedades tengan valor.',
      ],
    },
  ],
  instructions: [
    'Selecciona una imagen JPG o JPEG y espera a que aparezca la vista previa original.',
    'Compara visualmente la salida y observa el tamaño estimado del archivo PNG.',
    'Recuerda que el fondo seguirá siendo opaco y que la conversión no restaura detalle perdido.',
    'Descarga la copia .png sin borrar ni sobrescribir el JPG original.',
    'Abre el PNG en el programa o portal final y confirma dimensiones, color, peso y compatibilidad.',
  ],
  examples: [
    'Crear un PNG porque un editor o formulario no admite archivos JPG.',
    'Preparar una copia antes de añadir manualmente un canal transparente en un editor.',
    'Evitar nuevas guardadas JPEG con pérdida durante una etapa intermedia de edición.',
    'Comprobar cuánto aumenta el peso antes de convertir una fotografía completa.',
    'Descartar la conversión y buscar el logotipo original cuando el JPG tiene fondo y artefactos.',
  ],
  audience: [
    'Personas que deben entregar una imagen expresamente en formato PNG.',
    'Diseñadores y creadores que preparan una copia para edición posterior.',
    'Docentes, estudiantes y equipos de oficina que necesitan compatibilidad entre aplicaciones.',
    'Usuarios que quieren realizar la conversión localmente sin subir una imagen privada.',
  ],
  caseStudies: [
    {
      title: 'Sistema que exige PNG',
      description: 'Una plataforma rechaza .jpg pero acepta PNG de hasta 10 MB. La persona convierte, comprueba que las dimensiones se mantienen y que el nuevo peso entra en el límite. El fondo sigue opaco, como se esperaba.',
    },
    {
      title: 'Logotipo que no se vuelve transparente',
      description: 'Un logotipo JPG tiene un rectángulo blanco. Después de convertir, el rectángulo permanece porque era parte de los píxeles. La persona busca el SVG original en lugar de intentar presentar la conversión como un PNG transparente.',
    },
    {
      title: 'Fotografía demasiado pesada',
      description: 'Una foto JPG de 1,4 MB genera un PNG de más de 8 MB. Como el destino admite JPG y no requiere edición, se conserva el original: cambiar de formato habría aumentado la transferencia sin añadir información.',
    },
  ],
  notes: [
    'PNG admite transparencia, pero convertir un JPG no crea áreas transparentes.',
    'La operación no recupera detalle, resolución ni calidad que JPEG ya había descartado.',
    'El PNG puede pesar mucho más que el JPG original.',
    'La copia puede perder metadatos EXIF, perfiles, orientación o animación.',
    'Las dimensiones se conservan y el límite de entrada es 20 MB y 40 millones de píxeles.',
  ],
  faq: [
    {
      q: '¿Cómo convertir JPG a PNG?',
      a: 'Selecciona el JPG, espera a que el navegador genere la vista previa PNG, revisa el peso y descarga la nueva copia.',
    },
    {
      q: '¿Convertir JPG a PNG deja el fondo transparente?',
      a: 'No. El fondo del JPG ya está formado por píxeles opacos. Necesitas una herramienta de edición o eliminación de fondo para crear transparencia.',
    },
    {
      q: '¿El PNG tendrá mejor calidad?',
      a: 'No recuperará detalle perdido. La nueva copia se guarda sin pérdida adicional, pero conserva los artefactos y la resolución del JPG.',
    },
    {
      q: '¿Por qué el PNG pesa más?',
      a: 'PNG conserva sin pérdida los píxeles decodificados, mientras que JPEG comprime fotografías con pérdida. El aumento no significa que se haya creado más detalle.',
    },
    {
      q: '¿Se mantienen las dimensiones?',
      a: 'Sí. La herramienta utiliza el ancho y el alto naturales de la imagen. No redimensiona ni recorta durante la conversión.',
    },
    {
      q: '¿Se sube el JPG a FunnyTools?',
      a: 'No. La lectura, el dibujo y la exportación PNG se realizan en la memoria de tu navegador.',
    },
  ],
  labels: {
    upload: 'Seleccionar imagen',
    sourcePreview: 'Vista previa original',
    outputPreview: 'Vista previa PNG',
    originalSize: 'Tamaño original',
    outputSize: 'Tamaño PNG',
    waiting: 'Selecciona una imagen',
    download: 'Descargar PNG',
    reset: 'Restablecer',
    invalidType: 'Selecciona un archivo de imagen válido.',
    tooLarge: 'La imagen es demasiado grande. Utiliza un archivo de menos de 20 MB y 40 millones de píxeles.',
    processError: 'No se ha podido convertir la imagen. Prueba con otro archivo JPG.',
    localNote: 'La imagen se convierte en este navegador y no se sube a FunnyTools.',
    transparencyNote: 'PNG admite transparencia, pero un JPG no contiene datos alfa: esta conversión no elimina el fondo.',
  },
  privacyNote: 'La imagen se decodifica y exporta como PNG en la memoria del navegador. FunnyTools no recibe el archivo, sus píxeles ni su nombre. La URL temporal de salida se elimina al restablecer o cerrar la pestaña.',
  disclaimer: 'Conserva el JPG original y comprueba el PNG en su destino. La conversión no crea transparencia, no mejora la resolución y no garantiza la conservación de metadatos ni un peso menor.',
};

export const spanishJpgToPngReview = {
  heading: 'Cómo comprobar un PNG creado desde JPG',
  intro: 'La prueba correcta distingue formato, transparencia, fidelidad y peso para evitar atribuir a la conversión mejoras que no realiza.',
  panels: [
    {
      title: 'Confirma el formato',
      text: 'Abre las propiedades o un editor y comprueba que la descarga es image/png, mantiene las dimensiones y se abre sin errores.',
    },
    {
      title: 'No supongas transparencia',
      text: 'Coloca el PNG sobre un fondo de otro color. Si el JPG tenía fondo blanco, seguirá viéndose blanco hasta editar realmente el canal alfa.',
    },
    {
      title: 'Valora el aumento de peso',
      text: 'Compara bytes y uso final. Un PNG mayor puede ser necesario por compatibilidad o edición, pero no contiene detalle recuperado.',
    },
  ],
  checklistHeading: 'Lista de comprobación',
  checklist: [
    'La salida es PNG y conserva ancho y alto.',
    'El fondo y los artefactos se entienden como parte de la entrada.',
    'El peso sigue dentro del límite del destino.',
    'El JPG original permanece guardado.',
  ],
};
