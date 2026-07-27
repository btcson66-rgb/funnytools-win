import type { ToolContent } from '../tools/_types';

export const spanishHome = {
  seoTitle: 'Herramientas online gratis y privadas | FunnyTools en español',
  seoDescription: 'Herramientas online gratuitas, sin registro y con tratamiento local en el navegador. Calcula tu promedio de notas o une PDF con instrucciones verificables.',
  keywords: [
    'herramientas online gratis',
    'herramientas sin registro',
    'utilidades en el navegador',
    'calculadora de promedio de notas',
    'unir PDF online gratis',
  ],
  hero: {
    eyebrow: 'Herramientas útiles, explicadas y comprobables',
    title: 'FunnyTools en español',
    intro: 'Resuelve tareas concretas desde el navegador, sin crear una cuenta y sin instalar una aplicación. Cada herramienta explica qué calcula o transforma, qué límites tiene y cómo comprobar el resultado antes de utilizarlo.',
  },
  faq: [
    {
      q: '¿FunnyTools en español es gratuito?',
      a: 'Sí. Las herramientas publicadas en esta sección pueden utilizarse sin pago, registro ni instalación.',
    },
    {
      q: '¿Los archivos y datos se envían a un servidor?',
      a: 'Las herramientas actuales de la sección española procesan la información en el navegador. La página de cada herramienta indica de forma expresa cómo trata los datos.',
    },
    {
      q: '¿El resultado es oficial?',
      a: 'No por sí solo. FunnyTools ayuda a calcular, ordenar o transformar información, pero una calificación, un documento firmado o una entrega formal debe comprobarse con la fuente y las reglas aplicables.',
    },
    {
      q: '¿Funciona en móvil?',
      a: 'Sí, aunque los archivos PDF grandes pueden necesitar más memoria de la que ofrece un teléfono. Para documentos extensos conviene utilizar un ordenador y trabajar con copias.',
    },
    {
      q: '¿Por qué hay menos herramientas que en otros idiomas?',
      a: 'Cada versión española se redacta y revisa según la intención de búsqueda y el vocabulario real en español. No publicamos una página hasta que su interfaz, ejemplos, metadatos y comprobaciones están completos.',
    },
  ],
} as const;

export const spanishGradeAverage: ToolContent = {
  name: 'Calculadora de promedio de notas',
  short: 'Calcula la media aritmética y la media ponderada de tus calificaciones, con cualquier escala y pesos opcionales.',
  long: 'Esta calculadora de promedio de notas sirve para asignaturas, evaluaciones, trabajos, créditos o categorías que no siempre valen lo mismo. Puedes introducir calificaciones en escala 0–10, 0–5, 0–7, 0–20 o 0–100; la herramienta no convierte escalas, sino que calcula la media de los valores que tú aportas. Si añades pesos, también obtiene el promedio ponderado y muestra cuántos datos válidos ha utilizado.',
  seoTitle: 'Promedio de notas: calculadora simple y ponderada',
  seoDescription: 'Calcula tu promedio de notas o nota media con pesos opcionales. Admite cualquier escala, explica la fórmula y funciona gratis sin registro.',
  keywords: [
    'calculadora de promedio de notas',
    'calcular nota media',
    'media ponderada de notas',
    'promedio ponderado',
    'calculadora de calificaciones',
    'sacar promedio de notas',
  ],
  capabilities: [
    'Calcular una media simple cuando todas las notas tienen la misma importancia.',
    'Calcular una media ponderada mediante porcentajes, créditos o pesos relativos.',
    'Utilizar escalas distintas sin imponer un sistema educativo o un país concreto.',
    'Copiar el resumen del cálculo o exportar las filas válidas a un archivo CSV.',
  ],
  contentSections: [
    {
      heading: 'Respuesta rápida: cómo sacar el promedio de notas',
      paragraphs: [
        'Para sacar un promedio simple, suma todas las notas y divide el total entre el número de calificaciones. Si tienes 7,5; 8; 6,5 y 9, la suma es 31 y el promedio es 31 ÷ 4 = 7,75. En España suele hablarse de «nota media»; en gran parte de América Latina se utiliza «promedio de notas» o «promedio de calificaciones». El cálculo matemático es el mismo.',
        'Cuando una prueba, un trabajo o una asignatura vale más que otra, necesitas una media ponderada. Multiplica cada nota por su peso, suma esos productos y divide entre la suma de los pesos. La calculadora realiza ambos cálculos a la vez para que puedas comparar el resultado simple con el ponderado.',
      ],
    },
    {
      heading: 'Nota media, promedio y escala: qué cambia según el país',
      paragraphs: [
        'El español comparte una lengua, pero no un único sistema de calificación. En unos centros la nota máxima es 10; en otros puede ser 5, 7, 20, 100 o una escala propia. Por eso esta página no presupone una nota mínima para aprobar ni transforma automáticamente un 8 en una letra. Solo trabaja con números dentro de la escala que estés utilizando.',
        'Para obtener un resultado coherente, todas las filas deben pertenecer a la misma escala. No mezcles una nota sobre 10 con otra sobre 100 sin convertirlas primero mediante la regla oficial de tu centro. Tampoco confundas «peso» con «puntuación máxima»: un peso indica cuánto influye una nota en el promedio; la escala indica el rango en el que se expresa la calificación.',
      ],
      items: [
        'Escala 0–10: introduce 7,5; 8; 9, por ejemplo, sin convertirlas a porcentajes.',
        'Escala 0–100: introduce 75; 80; 90 y mantén todas las filas en esa escala.',
        'Créditos ECTS u otros créditos: utiliza el número de créditos como peso cuando la institución calcule la media de esa manera.',
        'Porcentajes de evaluación: puedes escribir 20, 30 y 50; no es necesario añadir el símbolo %.',
      ],
    },
    {
      heading: 'Cómo calcular una media ponderada sin equivocarte',
      paragraphs: [
        'Supongamos que los trabajos valen 30 %, el examen parcial 30 % y el examen final 40 %. Con notas de 9, 7 y 8,5, el cálculo es (9×30 + 7×30 + 8,5×40) ÷ 100 = 8,2. También podrías usar pesos 3, 3 y 4: como representan la misma proporción, el resultado vuelve a ser 8,2.',
        'El error más frecuente consiste en sumar los productos y dividir entre el número de notas. En una media ponderada el divisor correcto es la suma de los pesos. Otro error común es introducir peso solo en algunas filas: la media simple seguirá usando todas las notas válidas, pero la media ponderada solo puede utilizar filas que tengan una nota y un peso positivo.',
      ],
    },
    {
      heading: 'Decimales, redondeo y calificaciones pendientes',
      paragraphs: [
        'La calculadora conserva los valores introducidos y muestra dos decimales. Eso permite revisar el cálculo, pero no sustituye la política de redondeo del centro educativo. Una institución puede truncar, redondear a una décima, aplicar mínimos por bloque o exigir aprobar un examen concreto antes de calcular la nota final.',
        'Si todavía falta una evaluación, no escribas cero salvo que la norma diga que la ausencia cuenta como cero. Puedes dejar la fila vacía para calcular el promedio de los resultados disponibles. El número obtenido será una estimación parcial, no una predicción de la calificación final.',
      ],
    },
    {
      heading: 'Qué resultado responde esta calculadora y qué no',
      paragraphs: [
        'La herramienta responde «¿cuál es la media de estas notas?» y «¿cuál es el promedio si cada nota tiene este peso?». No calcula automáticamente qué nota necesitas en el próximo examen, no convierte expedientes entre países y no conoce las reglas de Selectividad, EBAU, PAES, ENEM, admisión universitaria o becas de una institución concreta.',
        'Cuando el resultado vaya a utilizarse en una solicitud, acta, expediente o decisión académica, compara la fórmula con la guía oficial. Guarda las notas originales, los pesos y la fecha de consulta para que otra persona pueda reproducir el cálculo.',
      ],
    },
  ],
  instructions: [
    'Introduce una calificación por fila y mantén todas las notas en la misma escala.',
    'Añade un peso si algunas evaluaciones, asignaturas o créditos deben influir más.',
    'Revisa la cantidad de elementos válidos y compara la media simple con la ponderada.',
    'Copia el resumen o exporta el CSV si necesitas documentar los datos utilizados.',
    'Contrasta el resultado con la fórmula y la política oficial antes de considerarlo definitivo.',
  ],
  examples: [
    'Calcular la nota media de varios exámenes que tienen la misma importancia.',
    'Obtener el promedio ponderado de trabajos, parcial y examen final.',
    'Usar créditos como pesos para resumir asignaturas, cuando la normativa lo permita.',
    'Comparar dos distribuciones de pesos sin modificar las calificaciones originales.',
    'Documentar un cálculo preliminar para revisarlo con el profesor o la secretaría académica.',
  ],
  audience: [
    'Estudiantes que quieren comprobar una estimación antes de consultar la nota oficial.',
    'Docentes y tutores que necesitan explicar de forma transparente cómo influye cada componente.',
    'Familias que desean entender la diferencia entre media simple y ponderada.',
    'Personal académico que necesita un cálculo reproducible, sin sustituir el sistema institucional.',
  ],
  caseStudies: [
    {
      title: 'Cuatro pruebas con el mismo valor',
      description: 'Una estudiante introduce 7,5; 8; 6,5 y 9 sin pesos. La suma es 31, hay cuatro elementos válidos y la media simple es 7,75. Antes de usarla, comprueba que las cuatro pruebas pertenecen a la misma escala y al mismo periodo.',
    },
    {
      title: 'Evaluación por porcentajes',
      description: 'Un curso asigna 30 % a trabajos, 30 % al parcial y 40 % al final. Con 9, 7 y 8,5, la media ponderada es 8,2. El promedio simple sería aproximadamente 8,17, una diferencia pequeña pero real que muestra por qué deben respetarse los pesos.',
    },
    {
      title: 'Asignaturas con créditos distintos',
      description: 'Una persona utiliza los créditos como pesos porque su normativa institucional así lo establece. Mantiene todas las calificaciones en una misma escala, exporta el CSV y compara después la fórmula con el documento oficial de su universidad.',
    },
  ],
  notes: [
    'No mezcles calificaciones expresadas en escalas diferentes sin una conversión oficial previa.',
    'Las filas vacías no cuentan; una nota igual a cero sí cuenta porque puede ser una calificación válida.',
    'La media ponderada utiliza únicamente filas con nota válida y peso positivo.',
    'El redondeo mostrado no reemplaza la regla de redondeo, recuperación o mínimo obligatorio de tu centro.',
    'No utilices esta página para convertir expedientes entre países ni para calcular admisiones con fórmulas específicas.',
  ],
  formula: {
    expression: 'Media simple = Σxᵢ / n · Media ponderada = Σ(xᵢ × wᵢ) / Σwᵢ',
    explanation: 'xᵢ representa cada nota válida, n es el número de notas y wᵢ es el peso positivo asignado. Los pesos pueden ser porcentajes, créditos o proporciones, siempre que todos sigan el mismo criterio.',
  },
  educationApplication: 'La calculadora puede apoyar una revisión formativa o una estimación personal. Las ausencias, recuperaciones, mínimos por bloque, bonificaciones y reglas de redondeo deben aplicarse según la normativa correspondiente.',
  reportTip: 'Para dejar constancia, anota la escala, el periodo, la lista de notas, los pesos y la regla utilizada. Ejemplo: «Media ponderada de 8,20 sobre 10, calculada con pesos 30/30/40; estimación pendiente de confirmación oficial».',
  faq: [
    {
      q: '¿Es lo mismo promedio de notas que nota media?',
      a: 'En este contexto sí. «Nota media» es muy habitual en España y «promedio de notas» o «promedio de calificaciones» se usa ampliamente en América Latina.',
    },
    {
      q: '¿Puedo usar notas sobre 5, 7, 10, 20 o 100?',
      a: 'Sí. La calculadora acepta cualquier escala numérica, siempre que no mezcles escalas distintas en el mismo cálculo.',
    },
    {
      q: '¿Los pesos deben sumar 100?',
      a: 'No. Pueden sumar 100, 10 o cualquier otro total. También puedes usar proporciones como 1, 1 y 2; el cálculo divide por la suma real de los pesos.',
    },
    {
      q: '¿Qué ocurre si dejo una fila vacía?',
      a: 'La fila vacía se ignora. En cambio, una nota de cero se incluye porque puede ser una calificación válida.',
    },
    {
      q: '¿Puedo calcular qué nota necesito en el próximo examen?',
      a: 'Esta versión calcula la media de datos existentes. No resuelve automáticamente la nota necesaria para alcanzar un objetivo futuro.',
    },
    {
      q: '¿Sirve para una nota oficial o una admisión universitaria?',
      a: 'Sirve para comprobar operaciones, pero debes aplicar y confirmar la fórmula oficial de la institución, convocatoria o país.',
    },
    {
      q: '¿Mis notas se guardan?',
      a: 'No se envían a FunnyTools. Se procesan en la pestaña actual; si cierras o recargas la página, debes introducirlas de nuevo.',
    },
  ],
  labels: {
    score: 'Nota o calificación',
    weight: 'Peso (opcional)',
    addRow: 'Añadir fila',
    remove: 'Eliminar',
    copy: 'Copiar resultado',
    exportCsv: 'Exportar CSV',
    result: 'Resultado',
    totalItems: 'Datos válidos',
    sum: 'Suma',
    average: 'Media simple',
    weightedAverage: 'Media ponderada',
    noWeights: 'Aún no hay pesos válidos',
    noValidRows: 'Introduce al menos una nota válida.',
    copied: 'Resultado copiado',
  },
  privacyNote: 'Las notas y los pesos se calculan dentro de esta pestaña. FunnyTools no recibe, guarda ni asocia estos datos con una cuenta.',
  disclaimer: 'El resultado es una ayuda de cálculo y no sustituye el expediente, la plataforma educativa ni la normativa oficial.',
};

export const spanishGradeReview = {
  heading: 'Cómo comprobar tu promedio antes de utilizarlo',
  intro: 'Una cifra con dos decimales puede parecer definitiva aunque la escala, los pesos o la norma sean incorrectos. Esta revisión separa el cálculo matemático de la decisión académica.',
  panels: [
    {
      title: 'Repite un caso pequeño a mano',
      text: 'Introduce 6, 8 y 10 sin pesos. La suma debe ser 24 y la media 8. Después añade pesos 1, 1 y 2: el resultado ponderado debe ser 8,5. Si no coincide, revisa decimales, filas vacías y signos.',
    },
    {
      title: 'Comprueba escala y pesos',
      text: 'Confirma que todas las notas están sobre la misma escala y que cada peso representa la misma clase de dato: porcentaje, crédito o proporción. No mezcles 40 % con 0,3 ni una nota sobre 10 con otra sobre 100.',
    },
    {
      title: 'Contrasta la norma real',
      text: 'Antes de entregar o reclamar una calificación, revisa si existen mínimos obligatorios, recuperación, redondeo, ausencias o categorías excluidas. Guarda la lista de notas y la fuente de los pesos para reproducir el cálculo.',
    },
  ],
  checklistHeading: 'Lista de comprobación',
  checklist: [
    'Todas las notas pertenecen a la misma escala y periodo.',
    'Los pesos positivos corresponden a la regla oficial o al escenario que quieres simular.',
    'Una prueba manual sencilla produce el mismo resultado.',
    'La cifra final se presenta como estimación cuando aún falta confirmación institucional.',
  ],
};

export const spanishMergePdf: ToolContent = {
  name: 'Unir PDF online gratis',
  short: 'Combina varios PDF en el orden que elijas, sin subir los archivos a un servidor.',
  long: 'Esta herramienta permite unir PDF directamente en el navegador. Selecciona dos o más documentos, revisa el número de páginas, cambia el orden y descarga un archivo nuevo. Es útil para expedientes, anexos, facturas, apuntes y documentos escaneados. Los PDF se leen y se combinan en tu dispositivo mediante JavaScript; FunnyTools no recibe una copia.',
  seoTitle: 'Unir PDF online gratis y en privado',
  seoDescription: 'Une varios PDF gratis en tu navegador, cambia el orden y descarga un solo archivo. Sin registro, sin instalación y sin subir documentos.',
  keywords: [
    'unir PDF online gratis',
    'combinar PDF',
    'juntar PDF sin subir archivos',
    'fusionar PDF gratis',
    'unir varios PDF en uno',
    'combinar documentos PDF',
  ],
  capabilities: [
    'Seleccionar varios documentos PDF en una sola operación.',
    'Leer el número de páginas y ordenar los archivos antes de combinarlos.',
    'Crear un PDF nuevo sin modificar los documentos originales.',
    'Trabajar localmente para evitar la subida de contratos, justificantes o apuntes.',
  ],
  contentSections: [
    {
      heading: 'Respuesta rápida: cómo unir varios PDF en uno',
      paragraphs: [
        'Selecciona al menos dos archivos PDF, pulsa «Leer páginas», coloca los documentos en el orden correcto y elige «Unir PDF». El navegador generará una copia combinada y comenzará la descarga. El primer archivo de la lista aparecerá primero en el resultado, seguido por los demás de arriba abajo.',
        'No necesitas instalar un programa ni enviar los documentos a FunnyTools. El procesamiento se realiza dentro de la pestaña actual. Aun así, debes abrir el archivo descargado y comprobar la secuencia, el número total de páginas y cualquier firma o formulario importante.',
      ],
    },
    {
      heading: 'Cuándo conviene combinar documentos PDF',
      paragraphs: [
        'Un único PDF reduce el riesgo de olvidar un anexo o enviar archivos en un orden confuso. Es especialmente útil cuando una plataforma solo admite un documento, cuando el destinatario necesita una lectura continua o cuando quieres conservar una copia de entrega separada de los originales.',
      ],
      items: [
        'Reunir formulario, documento de identidad, justificantes y anexos para una solicitud.',
        'Combinar propuesta, contrato, condiciones y página de firmas.',
        'Ordenar capítulos escaneados que el escáner guardó como archivos separados.',
        'Crear un cuaderno con apuntes, ejercicios y lecturas para una clase.',
        'Agrupar facturas y recibos por mes sin alterar los comprobantes originales.',
      ],
    },
    {
      heading: 'Privacidad: qué significa procesar el PDF en el navegador',
      paragraphs: [
        'El archivo se abre en la memoria del navegador para copiar sus páginas a un documento nuevo. No existe una subida a una cuenta de FunnyTools ni un almacenamiento posterior en nuestros servidores. Al recargar o cerrar la pestaña, la lista desaparece.',
        'El tratamiento local reduce la exposición, pero no elimina todos los riesgos. Utiliza un dispositivo de confianza, evita extensiones desconocidas, mantén el navegador actualizado y no trabajes con la única copia de un documento. Para material especialmente sensible, considera también las políticas del equipo, la organización y el sistema operativo.',
      ],
    },
    {
      heading: 'Orden correcto y control de páginas',
      paragraphs: [
        'Antes de combinar, piensa en el recorrido del lector. En una solicitud suele funcionar: formulario principal, identificación, certificados y anexos. En un informe: portada, índice, capítulos y apéndices. En una factura: solicitud, comprobante, recibo y autorización.',
        'La lectura de páginas ayuda a detectar un archivo inesperadamente corto o largo. Después de descargar, compara la suma de las páginas originales con el total del PDF nuevo. Revisa especialmente el punto donde termina un archivo y comienza el siguiente, porque allí son más fáciles de detectar duplicados, páginas en blanco u omisiones.',
      ],
    },
    {
      heading: 'Tamaño, memoria y documentos que pueden perder funciones',
      paragraphs: [
        'No hay un límite de subida porque no se envían archivos, pero sí existe un límite práctico de memoria. Como referencia prudente, intenta mantener cada lote por debajo de unos 40 MB y 300 páginas. No es una garantía: un escaneo con imágenes grandes puede consumir más memoria que un PDF de texto con muchas páginas.',
        'Los PDF protegidos por contraseña, dañados o restringidos pueden no abrirse. La herramienta no descifra contraseñas. Además, formularios interactivos, marcadores, archivos adjuntos, capas y firmas digitales pueden no conservar todas sus funciones al crear un PDF nuevo. Un documento firmado debe revisarse con especial cuidado, porque combinarlo puede invalidar o modificar la validez técnica de la firma.',
      ],
    },
    {
      heading: 'Qué hacer si el navegador se ralentiza o falla',
      paragraphs: [
        'Restablece la lista y divide el trabajo en lotes pequeños. Puedes combinar primero cada capítulo o cada grupo mensual y, después de comprobar esos resultados, unir las copias intermedias. Cierra otras pestañas pesadas y utiliza un ordenador si el teléfono no dispone de suficiente memoria.',
        'Si un documento concreto provoca el error, intenta abrirlo en un lector PDF de confianza y guardar una copia nueva, siempre que tengas permiso. No utilices servicios de reparación desconocidos con documentos confidenciales. Conserva los originales hasta que el resultado final haya sido abierto, revisado y aceptado por el sistema de destino.',
      ],
    },
  ],
  instructions: [
    'Crea una copia de trabajo y conserva intactos todos los PDF originales.',
    'Selecciona dos o más archivos y pulsa «Leer páginas».',
    'Usa «Subir» y «Bajar» hasta que la lista coincida con el orden de lectura deseado.',
    'Pulsa «Unir PDF» y espera a que comience la descarga del archivo nuevo.',
    'Abre la descarga, cuenta las páginas y revisa las transiciones, firmas y formularios.',
  ],
  examples: [
    'Preparar un expediente con solicitud, identificación, certificados y anexos.',
    'Entregar una propuesta comercial junto con contrato y página de firmas.',
    'Crear un dossier de clase con teoría, ejercicios y soluciones.',
    'Agrupar facturas y justificantes manteniendo los archivos fuente por separado.',
    'Reconstruir en orden un documento que fue escaneado en varias tandas.',
  ],
  audience: [
    'Personas que deben cargar una única copia ordenada en un formulario o portal.',
    'Equipos administrativos que preparan anexos, contratos y expedientes.',
    'Estudiantes y docentes que distribuyen materiales en un solo documento.',
    'Usuarios que prefieren no subir documentos privados a un servicio externo.',
  ],
  caseStudies: [
    {
      title: 'Expediente para una solicitud',
      description: 'Una persona conserva los originales y crea una copia de entrega con formulario, identificación y justificantes. Comprueba la suma de páginas, abre el archivo desde el mismo dispositivo que usará para enviarlo y confirma el límite de tamaño del portal.',
    },
    {
      title: 'Contrato con anexos',
      description: 'Un equipo ordena propuesta, contrato, condiciones y anexos. Antes de enviarlo, revisa si alguna firma digital ha cambiado y utiliza el PDF combinado solo cuando la política jurídica y el destinatario lo permiten.',
    },
    {
      title: 'Material de una asignatura',
      description: 'Un docente combina portada, guía, ejercicios y soluciones. Mantiene una versión sin soluciones para el alumnado, revisa las transiciones entre documentos y abre el resultado en móvil para comprobar que la lectura sea cómoda.',
    },
  ],
  notes: [
    'Trabaja siempre con copias; la herramienta crea un archivo nuevo y no necesita modificar los originales.',
    'Unos 40 MB o 300 páginas por lote es una recomendación prudente, no un límite garantizado.',
    'Los PDF cifrados, dañados o con restricciones pueden fallar y no se intentará descifrar su contraseña.',
    'Las firmas digitales, formularios, marcadores, capas y adjuntos pueden perder funciones al crear un documento nuevo.',
    'Una descarga correcta no demuestra que el expediente cumpla los requisitos del portal o del destinatario.',
  ],
  faq: [
    {
      q: '¿Los PDF se suben a Internet?',
      a: 'FunnyTools no recibe los archivos. Se procesan en el navegador. La conexión sigue siendo necesaria para cargar la página y sus recursos, pero el contenido de los PDF no se envía a nuestro servidor.',
    },
    {
      q: '¿Cómo cambio el orden de los documentos?',
      a: 'Después de leer las páginas, usa los botones para subir o bajar cada archivo. El resultado seguirá exactamente el orden visible de arriba abajo.',
    },
    {
      q: '¿Puedo unir PDF con contraseña?',
      a: 'No. La herramienta no descifra ni elimina contraseñas. Si tienes autorización, crea antes una copia sin protección mediante el programa de origen.',
    },
    {
      q: '¿Se conservan las firmas digitales?',
      a: 'No debe darse por hecho. Crear un PDF nuevo puede alterar la validez técnica de una firma. Compruébala con el software y el procedimiento exigidos por el destinatario.',
    },
    {
      q: '¿Cuántos PDF puedo unir?',
      a: 'Depende de la memoria del dispositivo y del contenido de los documentos. Para mayor estabilidad, trabaja con lotes moderados y divide los archivos grandes.',
    },
    {
      q: '¿Funciona en Android, iPhone o tableta?',
      a: 'Sí en navegadores modernos, aunque la memoria disponible suele ser menor que en un ordenador. Los lotes pequeños ofrecen mejores resultados.',
    },
    {
      q: '¿El PDF combinado reemplaza los originales?',
      a: 'No. Se descarga un archivo nuevo y los documentos seleccionados permanecen intactos en tu dispositivo.',
    },
  ],
  labels: {
    localNote: 'Los archivos se procesan en este navegador y no se suben a FunnyTools.',
    upload: 'Seleccionar archivos PDF',
    selectedFiles: 'Archivos seleccionados',
    noFiles: 'Todavía no has seleccionado ningún PDF',
    pages: 'páginas',
    loadingPages: 'Número de páginas pendiente',
    moveUp: 'Subir',
    moveDown: 'Bajar',
    analyze: 'Leer páginas',
    merge: 'Unir PDF',
    reset: 'Restablecer',
    processing: 'Procesando…',
    ready: '{count} archivos PDF listos',
    downloaded: 'La descarga del PDF combinado ha comenzado',
    noFile: 'Selecciona al menos dos archivos PDF.',
    pdfOnly: 'Selecciona únicamente archivos PDF.',
    loadError: 'No se ha podido leer uno de los PDF. Comprueba que no esté dañado o protegido.',
    mergeError: 'No se ha podido unir el lote. Prueba con archivos más pequeños o sin cifrado.',
  },
  privacyNote: 'Los documentos permanecen en la pestaña y se combinan con código ejecutado en tu dispositivo. No se guardan en FunnyTools ni en una cuenta de usuario.',
  disclaimer: 'Comprueba que el archivo combinado cumple el orden, tamaño, firma y formato exigidos por el destinatario. La herramienta no valida requisitos jurídicos ni administrativos.',
};

export const spanishMergeReview = {
  heading: 'Cómo verificar un PDF combinado antes de entregarlo',
  intro: 'El hecho de que un PDF se descargue y abra no demuestra que esté completo, conserve una firma o cumpla el límite del portal. Utiliza un control reproducible.',
  panels: [
    {
      title: 'Prueba primero con dos documentos pequeños',
      text: 'Combina dos PDF no confidenciales cuya cantidad de páginas conozcas. Confirma que el orden y el total coinciden. Esta prueba separa un problema del navegador de un problema específico del documento real.',
    },
    {
      title: 'Revisa cada transición',
      text: 'Anota el final de cada archivo original y comprueba esas páginas en la copia combinada. Busca duplicados, páginas en blanco, orientación inesperada y diferencias entre la suma original y el total descargado.',
    },
    {
      title: 'Valida en el destino',
      text: 'Abre el PDF en otro lector y, si es posible, en el dispositivo o portal donde se entregará. Comprueba tamaño, nombre, firmas, formularios y legibilidad. Conserva los originales hasta recibir la aceptación.',
    },
  ],
  checklistHeading: 'Lista de comprobación',
  checklist: [
    'La lista visible coincide con el orden de lectura requerido.',
    'La suma de páginas originales coincide con el total descargado.',
    'Firmas, formularios y enlaces importantes se han revisado expresamente.',
    'El archivo se ha abierto o cargado correctamente en el sistema de destino.',
  ],
};
