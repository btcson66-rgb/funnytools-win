import type { ToolContent } from '../tools/_types';

export const spanishImageCompressor: ToolContent = {
  name: 'Comprimir imágenes online',
  short: 'Reduce el peso y el tamaño de archivo de una imagen JPG, PNG o WebP antes de descargarla.',
  long: 'Este compresor de imágenes vuelve a codificar una foto, captura o gráfico directamente en tu navegador. Puedes mantener un formato compatible o crear un archivo JPEG o WebP, ajustar la calidad y revisar la vista previa, el peso original, el peso resultante y el porcentaje de cambio. La imagen no se envía a FunnyTools: el proceso utiliza la memoria y la capacidad de codificación de tu propio dispositivo.',
  seoTitle: 'Comprimir imágenes online gratis: JPG, PNG y WebP',
  seoDescription: 'Comprime imágenes JPG, PNG y WebP en tu navegador. Ajusta la calidad, compara el peso y descarga sin subir la foto a un servidor.',
  keywords: [
    'comprimir imágenes online',
    'reducir tamaño imagen',
    'reducir peso foto',
    'comprimir JPG',
    'comprimir PNG',
    'convertir imagen a WebP',
    'compresor de imágenes gratis',
  ],
  capabilities: [
    'Abrir una imagen compatible de hasta 20 MB y 40 millones de píxeles.',
    'Comparar la vista previa y el peso del archivo original con el resultado.',
    'Ajustar la calidad cuando la salida JPEG o WebP admite compresión con pérdida.',
    'Mantener JPG, PNG o WebP, o elegir expresamente una salida JPEG o WebP.',
    'Descargar una copia nueva sin modificar la imagen original.',
  ],
  contentSections: [
    {
      heading: 'Respuesta rápida: cómo reducir el peso de una imagen',
      paragraphs: [
        'Para reducir tamaño de archivo, selecciona una foto o un gráfico, elige el formato de salida y ajusta la calidad. La herramienta genera una vista previa y muestra el tamaño original y el resultante. Si el nuevo archivo pesa menos y la imagen conserva el detalle que necesitas, descárgalo. Si aparece un porcentaje negativo, el resultado pesa más: cambia a JPEG o WebP, baja la calidad o conserva el original.',
        'Comprimir una imagen no significa reducir sus dimensiones en píxeles. Esta herramienta conserva el ancho y el alto originales y vuelve a codificar el contenido. Sirve para reducir el peso de muchas fotos y capturas, pero no sustituye un redimensionador cuando el portal exige, por ejemplo, 1200 × 800 píxeles.',
      ],
    },
    {
      heading: 'JPEG, PNG o WebP: qué formato conviene elegir',
      paragraphs: [
        'JPEG suele ser una opción práctica para fotografías sin transparencia. WebP puede ofrecer un archivo pequeño con buena calidad visual y admite transparencia, aunque debes comprobar que el sistema de destino lo acepte. PNG resulta apropiado para logotipos, capturas con texto, gráficos de pocos colores o imágenes que necesitan transparencia nítida.',
        'El control de calidad influye principalmente en formatos con pérdida como JPEG y WebP. Al conservar una salida PNG, el navegador puede ignorar ese valor porque PNG no utiliza el mismo parámetro de calidad. Por eso una captura PNG puede quedar igual o incluso pesar más después de volver a codificarla. La lectura correcta es comparar los bytes mostrados, no asumir que la palabra «comprimir» garantiza una reducción.',
      ],
      items: [
        'Fotografía para web o correo: prueba JPEG entre 70 % y 85 % y revisa rostros, cielo y zonas con degradados.',
        'Imagen para una página moderna: prueba WebP y confirma que el gestor de contenidos o la red social admite el formato.',
        'Logotipo con fondo transparente: conserva PNG o usa WebP solo si la transparencia se mantiene correctamente.',
        'Captura con texto pequeño: amplía la vista previa y evita una calidad que vuelva borrosos los caracteres.',
      ],
    },
    {
      heading: 'Qué hace realmente el navegador al comprimir',
      paragraphs: [
        'La página lee el archivo elegido, lo dibuja en un lienzo HTML y crea una nueva imagen mediante la función de codificación del navegador. El formato y la calidad solicitados se aplican a la copia resultante. El archivo original permanece intacto y la descarga recibe un nombre terminado en «compressed».',
        'La codificación puede eliminar metadatos que no forman parte de los píxeles dibujados, como ciertos datos EXIF, orientación, ubicación, fecha o perfil específico de cámara. Esto puede ayudar a reducir peso, pero también significa que no debes usar la copia como archivo maestro ni como prueba documental. Conserva el original cuando los metadatos sean importantes.',
      ],
    },
    {
      heading: 'Calidad visual y tamaño: cómo encontrar un equilibrio',
      paragraphs: [
        'No existe un porcentaje universal que sea perfecto. Una fotografía con ruido, hojas, cabello o texturas finas necesita más información que una ilustración plana. Empieza alrededor del 80 %, observa el tamaño y luego revisa al 100 % las zonas con texto, bordes, piel y degradados. Baja en pasos pequeños hasta encontrar el menor archivo que siga siendo adecuado para el uso real.',
        'Una reducción grande no demuestra por sí sola que el resultado sea bueno. Una miniatura para un catálogo puede tolerar más compresión que una fotografía de producto donde deben distinguirse materiales. Para un documento administrativo, además de la apariencia importa que el portal acepte el formato y el límite de peso. La prueba final debe realizarse en ese destino.',
      ],
    },
    {
      heading: 'Casos frecuentes: web, mensajería, formularios y redes',
      paragraphs: [
        'Para una página web, comprimir fotografías puede reducir el tiempo de transferencia, pero el tamaño visual también importa. Si la imagen se mostrará a 800 píxeles de ancho y el original mide 5000, utiliza después una herramienta de redimensionado. Para correo o mensajería, confirma que el servicio no vuelva a comprimir la foto y que el destinatario no necesite el original.',
        'En formularios de empleo, becas o administración, lee primero los requisitos: pueden pedir JPG, un máximo de kilobytes o unas dimensiones exactas. Esta página ayuda con el formato y el peso, pero no garantiza que el archivo cumpla todos los criterios. En redes sociales, conserva una copia de alta calidad porque cada plataforma puede aplicar otra compresión al publicar.',
      ],
    },
    {
      heading: 'Límites de archivo, memoria y compatibilidad',
      paragraphs: [
        'La herramienta admite un archivo de hasta 20 MB y rechaza imágenes que superen 40 millones de píxeles para reducir el riesgo de bloquear la pestaña. Esos límites no significan que todos los móviles puedan procesar el máximo: una imagen comprimida ocupa mucha más memoria cuando se decodifica en píxeles. Si la pestaña se recarga, utiliza un ordenador o una imagen de menor resolución.',
        'El selector puede mostrar formatos que el navegador reconoce como imagen, pero el resultado depende de que el motor pueda decodificarlos. HEIC, RAW, SVG animado o formatos poco comunes pueden fallar o perder características. Para un flujo predecible, utiliza JPG, PNG o WebP. El navegador debe soportar el formato de salida; si no lo hace, puede generar PNG como alternativa.',
      ],
    },
  ],
  instructions: [
    'Elige una imagen JPG, PNG o WebP y espera a que aparezcan las dos vistas previas.',
    'Selecciona «Mantener formato», JPEG o WebP según el destino del archivo.',
    'Ajusta la calidad y compara el tamaño original con el resultado; para PNG, recuerda que el control puede no reducir el peso.',
    'Amplía visualmente las zonas importantes y comprueba transparencia, texto, bordes y color.',
    'Descarga la copia y ábrela en el programa o portal donde vaya a utilizarse.',
  ],
  examples: [
    'Reducir el peso de una fotografía antes de insertarla en una entrada de blog.',
    'Crear una copia WebP de una imagen de producto para un gestor que admita ese formato.',
    'Preparar un JPG más ligero para correo sin enviar la foto original a un servicio de compresión.',
    'Comparar varias calidades de una captura y elegir la primera en la que el texto siga siendo legible.',
    'Eliminar una copia más pesada y conservar el original cuando la recodificación no aporta ventaja.',
  ],
  audience: [
    'Personas que necesitan reducir el tamaño de una foto para correo, mensajería o un formulario.',
    'Creadores de contenido que preparan imágenes para una web, una tienda o una red social.',
    'Docentes y estudiantes que quieren aligerar capturas o materiales sin instalar una aplicación.',
    'Usuarios que prefieren procesar imágenes en su navegador sin subir el archivo a un compresor remoto.',
  ],
  caseStudies: [
    {
      title: 'Fotografía para una ficha de producto',
      description: 'Una tienda parte de un JPG de 4,8 MB. Prueba JPEG al 82 %, revisa etiquetas y textura al 100 %, y obtiene una copia más ligera. Después comprueba la imagen en la ficha publicada y conserva el archivo original para futuras ediciones.',
    },
    {
      title: 'Captura de pantalla con texto',
      description: 'Una estudiante compara PNG, WebP al 90 % y JPEG al 85 %. Aunque JPEG pesa menos, los caracteres pequeños muestran artefactos. Elige WebP porque el aula virtual lo acepta y el texto sigue legible.',
    },
    {
      title: 'Resultado que pesa más',
      description: 'Un logotipo PNG ya estaba optimizado. Al mantener PNG, la copia aumenta de tamaño y el indicador muestra ahorro negativo. En lugar de descargarla, la persona conserva el original; la herramienta ha servido para comprobar que no había una mejora real.',
    },
  ],
  notes: [
    'La herramienta conserva las dimensiones en píxeles; no sustituye un redimensionador de ancho y alto.',
    'El valor de calidad se aplica a formatos con pérdida. Una salida PNG puede ignorarlo y no reducir el peso.',
    'La nueva codificación puede descartar metadatos EXIF, perfiles, animación u otras características del archivo original.',
    'El porcentaje de ahorro puede ser negativo si el resultado pesa más; en ese caso no hay ventaja en descargarlo.',
    'El límite es 20 MB y 40 millones de píxeles, pero la memoria disponible del dispositivo puede exigir archivos menores.',
  ],
  faq: [
    {
      q: '¿Puedo comprimir una imagen sin subirla a internet?',
      a: 'Sí. El archivo se lee y se vuelve a codificar en tu navegador. FunnyTools no recibe la imagen seleccionada.',
    },
    {
      q: '¿Por qué el PNG no cambia al mover la calidad?',
      a: 'El parámetro de calidad está pensado para formatos con pérdida como JPEG y WebP. Los navegadores pueden ignorarlo al crear PNG.',
    },
    {
      q: '¿Comprimir reduce el ancho y el alto de la imagen?',
      a: 'No. Esta herramienta mantiene las dimensiones originales y cambia la codificación. Utiliza un redimensionador si necesitas menos píxeles.',
    },
    {
      q: '¿Qué ocurre si el porcentaje de ahorro es negativo?',
      a: 'Significa que la copia pesa más que el original. Prueba otro formato o calidad, o conserva el archivo original.',
    },
    {
      q: '¿Se conservan los metadatos EXIF y la ubicación?',
      a: 'No se garantiza. Al dibujar y exportar de nuevo los píxeles pueden desaparecer metadatos, perfiles y otras propiedades.',
    },
    {
      q: '¿Cuál es la mejor calidad para una foto?',
      a: 'Depende del contenido y del destino. Empieza cerca del 80 %, revisa los detalles importantes y ajusta en pasos pequeños.',
    },
  ],
  labels: {
    upload: 'Seleccionar imagen',
    quality: 'Calidad',
    format: 'Formato de salida',
    keepFormat: 'Mantener formato',
    jpeg: 'JPEG',
    webp: 'WebP',
    sourcePreview: 'Vista previa original',
    outputPreview: 'Vista previa resultante',
    originalSize: 'Tamaño original',
    compressedSize: 'Tamaño resultante',
    saved: 'Ahorro',
    waiting: 'Selecciona una imagen',
    download: 'Descargar imagen',
    reset: 'Restablecer',
    invalidType: 'Selecciona un archivo de imagen válido.',
    tooLarge: 'La imagen es demasiado grande. Utiliza un archivo de menos de 20 MB y 40 millones de píxeles.',
    processError: 'No se ha podido procesar la imagen. Prueba con otro archivo JPG, PNG o WebP.',
    localNote: 'La imagen se procesa en este navegador y no se sube a FunnyTools.',
  },
  privacyNote: 'La imagen se decodifica y vuelve a codificar en la memoria de este navegador. FunnyTools no recibe, guarda ni incorpora el archivo a la analítica. La copia temporal desaparece al restablecer o cerrar la pestaña.',
  disclaimer: 'Conserva la imagen original y comprueba la copia en su destino. FunnyTools no garantiza un peso concreto, la conservación de metadatos ni la aceptación por parte de una plataforma.',
};

export const spanishImageCompressorReview = {
  heading: 'Cómo comprobar que una imagen comprimida sigue siendo útil',
  intro: 'La verificación debe combinar bytes, apariencia y compatibilidad. Un archivo más pequeño solo es mejor si conserva la información que importa y abre correctamente en el destino.',
  panels: [
    {
      title: 'Compara el peso real',
      text: 'Anota el tamaño original y el resultante. Si el ahorro es cero o negativo, cambia de formato o calidad. No descargues una copia más pesada solo porque la página la llama comprimida.',
    },
    {
      title: 'Revisa detalles al 100 %',
      text: 'Observa texto pequeño, rostros, bordes, degradados y transparencia. La miniatura puede ocultar artefactos. Conserva el original si los detalles tienen valor probatorio o comercial.',
    },
    {
      title: 'Prueba el archivo en el destino',
      text: 'Abre la descarga en otro visor y cárgala en el formulario, web o red social real. Comprueba formato, dimensiones, orientación, peso y apariencia después de cualquier compresión adicional.',
    },
  ],
  checklistHeading: 'Lista de comprobación',
  checklist: [
    'El archivo resultante pesa menos o existe una razón concreta para cambiar de formato.',
    'Texto, bordes, color y transparencia se ven correctamente al tamaño de uso.',
    'Las dimensiones y el formato cumplen los requisitos del destino.',
    'El original se conserva como copia maestra.',
  ],
};

export const spanishQrCodeGenerator: ToolContent = {
  name: 'Generador de código QR gratis',
  short: 'Crea un código QR estático para una URL o un texto, ajusta su tamaño y descárgalo en PNG.',
  long: 'Este generador convierte el contenido que escribes en un código QR estático dentro del navegador. Puedes elegir 128, 256 o 512 píxeles, ajustar el nivel de corrección de errores, añadir un logotipo central opcional, copiar la imagen cuando el navegador lo permita y descargarla como PNG. El contenido queda codificado en la propia imagen: no existe una cuenta, un enlace intermedio ni un panel para cambiar el destino después.',
  seoTitle: 'Generador de código QR gratis para URL o texto',
  seoDescription: 'Crea un código QR estático para una URL o texto, elige tamaño y corrección, añade logo y descarga PNG. Generación local y sin registro.',
  keywords: [
    'generador de código QR gratis',
    'crear código QR',
    'código QR para URL',
    'hacer QR de un enlace',
    'descargar QR PNG',
    'generador QR con logo',
    'código QR estático',
  ],
  capabilities: [
    'Convertir una URL completa o un texto breve en un código QR estático.',
    'Elegir niveles de corrección L, M, Q o H y tamaños de 128, 256 o 512 píxeles.',
    'Añadir un logotipo central opcional y retirarlo antes de descargar.',
    'Descargar el resultado como PNG o copiarlo al portapapeles si el navegador lo admite.',
    'Generar la imagen sin enviar el contenido introducido a FunnyTools.',
  ],
  contentSections: [
    {
      heading: 'Respuesta rápida: cómo crear un código QR',
      paragraphs: [
        'Escribe o pega la URL completa, incluido «https://», o introduce el texto que quieres codificar. Elige un tamaño y un nivel de corrección; la vista previa se actualiza automáticamente. Descarga el PNG y, antes de imprimirlo o compartirlo, escanéalo con al menos dos teléfonos o aplicaciones y confirma que abre exactamente el contenido esperado.',
        'El resultado es un QR estático. La dirección o el texto quedan dentro del patrón y no pueden editarse después. Si cambia el enlace, debes crear un código nuevo y sustituir todas las copias. Este comportamiento evita depender de un servicio de redirección, pero exige revisar bien el destino antes de distribuirlo.',
      ],
    },
    {
      heading: 'Qué contenido se puede convertir en QR',
      paragraphs: [
        'La herramienta codifica la cadena que escribas: una dirección web, una frase, un identificador o texto con un formato reconocido por la aplicación lectora. Para un enlace, utiliza la URL final y comprueba que funciona sin iniciar sesión si el público debe acceder libremente. Un texto demasiado largo crea un patrón más denso y puede ser más difícil de escanear en tamaños pequeños.',
        'Algunas aplicaciones interpretan formatos especiales para correo, teléfono, contacto o Wi‑Fi, pero esta página no ofrece campos guiados ni valida esa sintaxis. Si escribes manualmente un formato de Wi‑Fi o vCard, prueba el resultado en los sistemas operativos que utilizará tu audiencia. No introduzcas una contraseña sensible solo porque el proceso sea local: cualquier persona que vea el QR puede intentar leer su contenido.',
      ],
    },
    {
      heading: 'QR estático frente a QR dinámico',
      paragraphs: [
        'Un código estático contiene el destino directamente. No caduca por depender de FunnyTools, no requiere una cuenta y puede seguir funcionando mientras el contenido codificado siga siendo válido. La contrapartida es que no puedes cambiar la URL ni obtener estadísticas de escaneo desde esta herramienta.',
        'Un QR dinámico suele apuntar primero a una redirección gestionada por un proveedor. Eso permite cambiar el destino y medir accesos, pero introduce una dependencia: la cuenta, el dominio, el plan o el servicio deben seguir activos. FunnyTools no crea códigos dinámicos ni promete analítica. Elige el tipo según si necesitas permanencia directa o gestión posterior.',
      ],
    },
    {
      heading: 'Corrección de errores L, M, Q y H',
      paragraphs: [
        'La corrección de errores añade redundancia para que un lector pueda reconstruir parte del código cuando hay suciedad, baja calidad o una pequeña zona tapada. Los niveles más altos ofrecen más tolerancia, pero también producen un patrón más denso para el mismo contenido. M es un punto de partida razonable para un QR limpio y sin logotipo; Q o H son opciones prudentes al colocar una imagen central.',
        'Un nivel alto no vuelve indestructible el código. Un logotipo demasiado grande puede ocultar módulos críticos, y el recorte de la zona blanca exterior puede impedir la detección. La imagen central de esta herramienta ocupa aproximadamente una quinta parte del ancho y añade un fondo blanco, pero aun así debes escanear cada versión descargada.',
      ],
    },
    {
      heading: 'Tamaño, impresión, contraste y zona libre',
      paragraphs: [
        'Los 128 píxeles sirven para usos digitales pequeños; 256 es una opción general; 512 ofrece más margen para documentos o diseños que después reducirás. Un PNG no es vectorial: si lo amplías demasiado en un programa de diseño puede verse borroso. Para un cartel grande, genera 512, evita interpolaciones y realiza una prueba impresa al tamaño final.',
        'Mantén contraste oscuro sobre fondo claro y no recortes el margen blanco que rodea el patrón. Evita colocarlo sobre una fotografía, doblarlo en una esquina, cubrirlo con brillo o imprimirlo tan pequeño que la cámara no distinga los módulos. La distancia de lectura, la calidad de impresión, la iluminación y la cámara influyen tanto como el archivo.',
      ],
    },
    {
      heading: 'Cómo comprobar el destino y evitar errores',
      paragraphs: [
        'Antes de generar el QR, abre la URL escrita en una pestaña privada. Comprueba protocolo, dominio, ruta, parámetros y permisos. Después escanea el PNG descargado, no solo la vista previa. Verifica el resultado con Android y iPhone cuando el código vaya dirigido a un público amplio.',
        'Para menús, formularios, eventos o materiales impresos, añade también una dirección legible o una instrucción alternativa. Un QR puede fallar por cámara, accesibilidad, conexión o deterioro. Si enlaza a una página que recopila datos, informa al usuario antes del escaneo y utiliza un dominio reconocible para reducir el riesgo de confusión o suplantación.',
      ],
    },
  ],
  instructions: [
    'Escribe una URL completa o el texto que quieras codificar y revisa cada carácter.',
    'Elige un nivel de corrección y un tamaño; utiliza Q o H como punto de partida si añades un logotipo.',
    'Añade una imagen central solo si es necesaria y conserva el margen blanco exterior.',
    'Descarga el PNG y escanéalo desde otro dispositivo para confirmar el contenido exacto.',
    'Prueba la copia impresa o publicada en su tamaño, material, iluminación y distancia reales.',
  ],
  examples: [
    'Crear un QR estático para la página pública de un evento.',
    'Añadir a un folleto un enlace directo a un formulario sin registro intermedio de FunnyTools.',
    'Codificar un texto breve o un identificador que una aplicación pueda leer.',
    'Preparar un QR con logotipo para una mesa y comprobarlo antes de imprimir todo el lote.',
    'Generar un código nuevo cuando cambia la URL, en lugar de asumir que el anterior puede editarse.',
  ],
  audience: [
    'Organizadores que necesitan enlazar un evento, formulario, programa o ubicación pública.',
    'Comercios y asociaciones que preparan menús, carteles o material informativo.',
    'Docentes y estudiantes que comparten recursos entre papel y pantalla.',
    'Personas que quieren un QR estático sin cuenta, suscripción ni redirección administrada por FunnyTools.',
  ],
  caseStudies: [
    {
      title: 'Formulario de inscripción',
      description: 'Una asociación pega la URL final del formulario, la abre en modo privado y genera un QR de 512 píxeles. Lo prueba con Android e iPhone, imprime una hoja de muestra y añade una dirección corta legible como alternativa.',
    },
    {
      title: 'Carta con logotipo central',
      description: 'Un restaurante usa corrección H y un logotipo cuadrado. Escanea el PNG y una impresión bajo la iluminación real del local. Al detectar fallos en un teléfono antiguo, retira el logo en lugar de confiar solo en el nivel de corrección.',
    },
    {
      title: 'Enlace que ha cambiado',
      description: 'La página del evento recibe una nueva URL. Como el QR es estático, el equipo genera otro código, actualiza el cartel digital y marca para retirar las impresiones antiguas. No existe un panel oculto que pueda modificar el patrón anterior.',
    },
  ],
  notes: [
    'El código es estático: el contenido no se puede editar después y FunnyTools no ofrece estadísticas de escaneo.',
    'Añadir un logotipo puede reducir la legibilidad incluso con corrección Q o H; la prueba real es obligatoria.',
    'El archivo descargado es PNG, no SVG ni PDF vectorial.',
    'Una URL válida puede exigir sesión, haber caducado o ser inaccesible para el público; pruébala en modo privado.',
    'Cualquier persona que escanee el QR puede leer el contenido, por lo que no debes codificar secretos.',
  ],
  faq: [
    {
      q: '¿El código QR es gratis y caduca?',
      a: 'La generación y la descarga son gratuitas. El patrón estático no depende de una cuenta de FunnyTools, pero el enlace codificado puede dejar de funcionar si su propietario lo cambia o elimina.',
    },
    {
      q: '¿Puedo cambiar el enlace después de imprimir el QR?',
      a: 'No. Es un QR estático. Si cambia el enlace, debes crear y distribuir una imagen nueva.',
    },
    {
      q: '¿Qué nivel de corrección debo elegir?',
      a: 'M suele servir para un código limpio sin logo. Prueba Q o H si añades una imagen central, pero verifica siempre la descarga en varios lectores.',
    },
    {
      q: '¿Puedo añadir un logotipo sin que falle?',
      a: 'Puedes añadirlo, pero ninguna configuración garantiza la lectura. Mantén el logo pequeño, usa buen contraste y realiza pruebas digitales e impresas.',
    },
    {
      q: '¿La herramienta guarda la URL o el texto?',
      a: 'No. La imagen se genera en el navegador y el contenido no se envía a FunnyTools.',
    },
    {
      q: '¿Por qué debo comprobar el PNG descargado?',
      a: 'El tamaño, el logo, la impresión y el programa de diseño pueden cambiar la legibilidad. Escanear el archivo final detecta errores que la vista previa no demuestra.',
    },
  ],
  labels: {
    inputLabel: 'URL o texto',
    placeholder: 'https://ejemplo.com',
    correction: 'Corrección de errores',
    size: 'Tamaño',
    download: 'Descargar PNG',
    copyImage: 'Copiar imagen',
    logo: 'Logotipo central (opcional)',
    logoHint: 'Si añades un logotipo, prueba Q o H y escanea el PNG descargado antes de utilizarlo.',
    removeLogo: 'Quitar logotipo',
    logoError: 'No se ha podido leer la imagen. Prueba con PNG, JPG, WebP o SVG.',
    copyUnsupported: 'Este navegador no permite copiar la imagen. Utiliza «Descargar PNG».',
    emptyError: 'Escribe el contenido que quieres convertir en código QR.',
    renderError: 'No se ha podido crear el código QR. Acorta el contenido o cambia la configuración.',
    copied: 'Imagen copiada',
    canvasAlt: 'Vista previa del código QR',
  },
  privacyNote: 'La URL, el texto y el logotipo opcional se procesan en la memoria de este navegador. FunnyTools no los recibe, guarda ni utiliza para crear una cuenta o una redirección.',
  disclaimer: 'Escanea y valida el PNG final antes de publicarlo o imprimirlo. FunnyTools no garantiza la lectura en todos los dispositivos ni la disponibilidad, seguridad o permanencia del destino codificado.',
};

export const spanishQrCodeGeneratorReview = {
  heading: 'Cómo validar un código QR antes de distribuirlo',
  intro: 'Un patrón visible no demuestra que el destino sea correcto ni que pueda leerse en condiciones reales. La revisión debe cubrir contenido, lectores y soporte final.',
  panels: [
    {
      title: 'Comprueba el contenido exacto',
      text: 'Abre primero la URL y luego escanea el PNG. Revisa dominio, ruta, parámetros y permisos. Un carácter incorrecto puede conducir a otra página aunque el QR se lea perfectamente.',
    },
    {
      title: 'Usa lectores distintos',
      text: 'Prueba con al menos dos dispositivos o aplicaciones, especialmente si hay logo. Verifica que el lector reconozca el patrón con rapidez y muestre el destino esperado.',
    },
    {
      title: 'Ensaya el soporte real',
      text: 'Imprime o publica una muestra al tamaño final. Comprueba contraste, margen, reflejos, distancia y conexión. Añade una alternativa escrita para quien no pueda escanear.',
    },
  ],
  checklistHeading: 'Lista de comprobación',
  checklist: [
    'La URL final se abre sin permisos inesperados y pertenece al dominio correcto.',
    'El PNG descargado se escanea con más de un dispositivo.',
    'El logotipo no oculta el patrón y el margen blanco permanece visible.',
    'La impresión o publicación de prueba funciona en el contexto real.',
  ],
};

export const spanishSplitPdf: ToolContent = {
  name: 'Dividir PDF y separar páginas',
  short: 'Separa cada página en un PDF o crea archivos por rangos como 1-3, 5 y 8-10.',
  long: 'Esta herramienta permite dividir un PDF en archivos individuales o extraer grupos de páginas sin subir el documento. Selecciona una copia, lee el total de páginas y elige «un PDF por página» o escribe rangos separados por comas. Cada grupo produce una descarga nueva y conserva el orden original de las páginas elegidas. El original no se modifica.',
  seoTitle: 'Dividir PDF online gratis y separar páginas',
  seoDescription: 'Divide un PDF por páginas o rangos como 1-3, 5, 8-10. Extrae páginas en el navegador, sin subir el documento y sin registro.',
  keywords: [
    'dividir PDF online',
    'separar páginas PDF',
    'extraer páginas de PDF',
    'cortar PDF por páginas',
    'dividir PDF gratis',
    'separar PDF por rangos',
    'un PDF por página',
  ],
  capabilities: [
    'Leer la cantidad total de páginas de un PDF compatible.',
    'Crear un archivo PDF independiente por cada página.',
    'Separar páginas en grupos mediante rangos como 1-3, 5, 8-10.',
    'Generar varias descargas sin modificar ni sobrescribir el documento original.',
    'Procesar el archivo en el navegador sin enviarlo a FunnyTools.',
  ],
  contentSections: [
    {
      heading: 'Respuesta rápida: cómo dividir un PDF',
      paragraphs: [
        'Selecciona un PDF y pulsa «Leer número de páginas» para confirmar el total. Si necesitas cada hoja por separado, elige «Un PDF por página». Si quieres capítulos o partes concretas, selecciona «Rangos personalizados» y escribe grupos como 1-3, 5, 8-10. Cada elemento separado por una coma genera un PDF distinto.',
        'Los números empiezan en 1 y se refieren al orden físico del archivo, no necesariamente al número impreso en el pie de página. Después de separar, descarga cada resultado, ábrelo y comprueba su primera página, última página y total antes de enviarlo.',
      ],
    },
    {
      heading: 'Cómo escribir rangos de páginas correctamente',
      paragraphs: [
        'Un número aislado extrae una página. Un guion crea un intervalo inclusivo. Por ejemplo, «2-4, 7, 10-12» produce tres archivos: páginas 2 a 4, página 7 y páginas 10 a 12. Los espacios alrededor de comas o guiones son aceptables, pero no utilices letras, puntos suspensivos, páginas fuera del total ni un intervalo invertido como 9-3.',
        'Cada grupo conserva el orden ascendente del documento fuente. Esta herramienta no reordena páginas dentro de un grupo ni combina intervalos separados en una sola salida. Si necesitas un único PDF formado por varias partes, descarga los resultados y utiliza después la herramienta para unir PDF en el orden deseado.',
      ],
      items: [
        '«1» crea un PDF que contiene solo la primera página.',
        '«1-3» crea un PDF con las páginas 1, 2 y 3.',
        '«1-3, 5, 8-10» crea tres PDF, uno por cada grupo.',
        '«0», «8-3» o una página mayor que el total se consideran rangos no válidos.',
      ],
    },
    {
      heading: 'Separar cada página o extraer capítulos',
      paragraphs: [
        'El modo de una página por archivo es útil cuando una plataforma exige cargas individuales, cuando cada formulario debe recibir un nombre distinto o cuando vas a clasificar escaneos. Sin embargo, un documento de 200 páginas generará 200 enlaces de descarga y utilizará más memoria. No elijas este modo solo para reducir el peso total.',
        'Los rangos son mejores para capítulos, anexos, facturas de varias páginas, expedientes o secciones de un informe. Decide primero qué representa cada archivo y anota el intervalo. Menos salidas facilitan la revisión y reducen la posibilidad de olvidar una página durante la descarga.',
      ],
    },
    {
      heading: 'Numeración física frente a números impresos',
      paragraphs: [
        'Un PDF puede mostrar una portada sin número, usar números romanos en el índice y empezar el capítulo 1 varias hojas después. La herramienta cuenta posiciones físicas desde la primera hoja como página 1. Si el visor indica que el texto «página 10» está en la posición 14, debes utilizar 14 en el rango.',
        'Antes de extraer un contrato o expediente, abre el original en un lector, compara la miniatura o el indicador del visor y apunta las posiciones exactas. Comprueba también páginas en blanco, anexos y reversos escaneados: pueden ser parte necesaria del documento aunque parezcan prescindibles.',
      ],
    },
    {
      heading: 'Contratos, formularios, firmas y documentos oficiales',
      paragraphs: [
        'Copiar páginas a un PDF nuevo puede no conservar de forma idéntica firmas digitales, formularios interactivos, marcadores, adjuntos, capas, enlaces, carteras PDF o permisos. La apariencia visible puede mantenerse mientras una validación criptográfica deja de ser válida. No uses el resultado como sustituto automático de un original firmado.',
        'Para trámites, confirma si la institución acepta páginas extraídas y si exige un PDF completo, firmado, con tamaño máximo o con una estructura concreta. Conserva el original, utiliza una copia de trabajo y carga primero un archivo de prueba cuando el portal lo permita. FunnyTools separa páginas; no certifica autenticidad ni cumplimiento jurídico.',
      ],
    },
    {
      heading: 'Archivos grandes, cifrados y memoria del navegador',
      paragraphs: [
        'El proceso se realiza en la memoria del dispositivo. Un PDF con muchas fotografías escaneadas puede consumir más recursos que un documento de texto del mismo tamaño. Como referencia prudente, trabaja con archivos de alrededor de 40 MB o menos y menos de 300 páginas, y usa pocos rangos en móviles. No es un límite de subida, porque el archivo no se envía; es una recomendación de estabilidad.',
        'Los PDF protegidos con contraseña, cifrados, dañados o con restricciones pueden no abrirse. La herramienta no rompe contraseñas ni elude permisos. Si eres propietario y tienes autorización, guarda una copia sin protección desde la aplicación original. Si la pestaña se cierra o recarga, los enlaces temporales desaparecen y tendrás que repetir el proceso.',
      ],
    },
  ],
  instructions: [
    'Selecciona una copia del PDF y pulsa «Leer número de páginas» para confirmar el total.',
    'Elige «Un PDF por página» o «Rangos personalizados» según la cantidad de salidas que necesitas.',
    'Para rangos, escribe grupos válidos como 1-3, 5, 8-10 y compáralos con el orden físico del documento.',
    'Pulsa «Dividir PDF» y descarga cada archivo generado antes de cerrar o restablecer la pestaña.',
    'Abre los resultados, comprueba páginas, nombres, firmas y requisitos del sistema de destino.',
  ],
  examples: [
    'Extraer las páginas 1-3 de un informe como resumen independiente.',
    'Separar un escaneo por meses o por expedientes de varias páginas.',
    'Crear un PDF individual por cada hoja que debe cargarse en un formulario distinto.',
    'Dividir un manual en capítulos sin enviar el archivo completo a un servidor.',
    'Extraer una sección y unirla después con otros documentos en un orden nuevo.',
  ],
  audience: [
    'Personal administrativo que separa informes, solicitudes, facturas o expedientes.',
    'Docentes y estudiantes que distribuyen capítulos o unidades de un material extenso.',
    'Profesionales que necesitan compartir solo una sección no sensible de un PDF.',
    'Personas que prefieren extraer páginas localmente sin subir el documento a un servicio remoto.',
  ],
  caseStudies: [
    {
      title: 'Resumen y anexos de un informe',
      description: 'Un equipo confirma que el PDF tiene 42 páginas y crea «1-4, 35-42». Obtiene dos archivos, abre sus extremos y verifica que el primer grupo contiene el resumen y el segundo todos los anexos. Los rangos separados no se mezclan en una única descarga.',
    },
    {
      title: 'Archivo escaneado por meses',
      description: 'Una administración identifica enero en las páginas físicas 1-7, febrero en 8-15 y marzo en 16-23. Introduce «1-7, 8-15, 16-23», descarga tres PDF y los renombra. Conserva el escaneo original para comprobar cualquier hoja dudosa.',
    },
    {
      title: 'Contrato con firma digital',
      description: 'Una persona necesita la página de firmas, pero el lector indica que el documento está firmado digitalmente. Extrae una copia solo para consulta y no la presenta como original válido. El expediente formal conserva el PDF completo y se verifica con el sistema correspondiente.',
    },
  ],
  notes: [
    'Los números se refieren al orden físico desde la primera página del PDF, no a la numeración impresa.',
    'Cada grupo separado por una coma crea un archivo; la herramienta no une grupos diferentes en una salida.',
    'Firmas digitales, formularios, marcadores, adjuntos y otras funciones avanzadas pueden no conservarse.',
    'PDF cifrados, protegidos, restringidos o dañados pueden fallar y no se intentan desbloquear.',
    'Para estabilidad, utiliza alrededor de 40 MB o menos y menos de 300 páginas, especialmente en móvil.',
  ],
  faq: [
    {
      q: '¿El PDF se sube a un servidor para dividirlo?',
      a: 'No. El archivo se lee y se procesa dentro del navegador. FunnyTools no recibe el documento.',
    },
    {
      q: '¿Cómo puedo extraer páginas 1 a 3 y la página 8?',
      a: 'Selecciona rangos personalizados y escribe «1-3, 8». Se crearán dos PDF: uno con 1-3 y otro con la página 8.',
    },
    {
      q: '¿Puedo crear un solo PDF con rangos no consecutivos?',
      a: 'No directamente. Cada grupo separado por coma genera un archivo. Puedes descargarlos y unirlos después con la herramienta Unir PDF.',
    },
    {
      q: '¿Se modifica el PDF original?',
      a: 'No. Se crean nuevas descargas temporales y el archivo original permanece intacto en tu dispositivo.',
    },
    {
      q: '¿Se conserva una firma digital?',
      a: 'No se garantiza. Extraer páginas crea un documento nuevo y puede invalidar o eliminar firmas y otras funciones avanzadas.',
    },
    {
      q: '¿Por qué no abre un PDF con contraseña?',
      a: 'La herramienta no desbloquea archivos cifrados o restringidos. Si tienes autorización, guarda una copia sin protección desde la aplicación de origen.',
    },
  ],
  labels: {
    localNote: 'El PDF se procesa en este navegador y no se sube a FunnyTools.',
    upload: 'Seleccionar PDF',
    analyze: 'Leer número de páginas',
    modeLabel: 'Modo de división',
    modeEvery: 'Un PDF por página',
    modeRanges: 'Rangos personalizados',
    rangesLabel: 'Rangos de páginas',
    rangesPlaceholder: 'Ejemplo: 1-3, 5, 8-10',
    pageCount: 'Número total de páginas: {count}',
    split: 'Dividir PDF',
    reset: 'Restablecer',
    processing: 'Procesando…',
    outputTitle: 'Archivos para descargar',
    noOutput: 'Todavía no se ha generado ningún archivo',
    download: 'Descargar',
    noFile: 'Selecciona primero un archivo PDF.',
    pdfOnly: 'Selecciona un archivo en formato PDF.',
    loadError: 'No se ha podido leer el PDF. Comprueba que no esté dañado, cifrado o protegido.',
    emptyRange: 'Escribe al menos un rango de páginas.',
    invalidRange: 'El rango no es válido. Utiliza un formato como 1-3, 5, 8-10.',
    splitError: 'No se ha podido dividir el PDF. Prueba con un archivo más pequeño y sin cifrado.',
  },
  privacyNote: 'El PDF se mantiene en la memoria de este navegador. FunnyTools no recibe el documento ni sus páginas. Los enlaces generados son temporales y desaparecen al restablecer, recargar o cerrar la pestaña.',
  disclaimer: 'Comprueba cada salida y conserva el original. FunnyTools no garantiza la conservación de firmas, formularios, marcadores, adjuntos, permisos ni requisitos administrativos.',
};

export const spanishSplitPdfReview = {
  heading: 'Cómo verificar un PDF dividido antes de compartirlo',
  intro: 'La revisión debe demostrar que no faltan páginas y que el nuevo archivo sigue siendo apto para su finalidad. El total y la apariencia no bastan cuando existen firmas o formularios.',
  panels: [
    {
      title: 'Confirma posiciones y rangos',
      text: 'Compara la primera y última página de cada grupo con el original. Recuerda que la posición física puede diferir del número impreso y revisa páginas en blanco o reversos.',
    },
    {
      title: 'Abre todas las descargas',
      text: 'Comprueba nombre, cantidad de páginas, orientación y legibilidad. Si generaste muchos archivos, registra cuáles descargaste antes de cerrar la pestaña.',
    },
    {
      title: 'Valida funciones especiales',
      text: 'Revisa expresamente firmas, formularios, enlaces, marcadores y requisitos del portal. Para documentos oficiales, conserva y presenta el original cuando la norma lo exija.',
    },
  ],
  checklistHeading: 'Lista de comprobación',
  checklist: [
    'Los rangos corresponden a las posiciones físicas correctas del PDF.',
    'Cada descarga contiene la primera, última y cantidad de páginas esperadas.',
    'No se ha supuesto que una firma digital o un formulario siga siendo válido.',
    'El archivo se abre y se acepta en el visor o sistema de destino.',
  ],
};
