import type { ToolContent } from '../tools/_types';

export const spanishRandomGroupGenerator: ToolContent = {
  name: 'Generador de grupos aleatorios',
  short: 'Pega una persona por línea, elige cuántos grupos necesitas y reparte la lista al azar con tamaños lo más parecidos posible.',
  long: 'Este generador de grupos aleatorios baraja la lista con `crypto.getRandomValues` y Fisher–Yates, y después distribuye las entradas por turnos entre los grupos. Así, la diferencia de tamaño nunca supera una persona. No analiza niveles, roles, género, disponibilidad ni relaciones: crea un reparto aleatorio equilibrado únicamente por cantidad. Puedes copiar el resultado o exportarlo como CSV protegido frente a fórmulas, sin enviar la lista a FunnyTools.',
  seoTitle: 'Generador de grupos aleatorios y equipos online',
  seoDescription: 'Crea grupos aleatorios con tamaños similares. Pega una persona por línea, elige el número de equipos, copia o exporta CSV en tu navegador.',
  keywords: [
    'generador de grupos aleatorios',
    'crear equipos al azar',
    'hacer grupos aleatorios',
    'repartir alumnos en grupos',
    'generador de equipos online',
    'dividir una lista en grupos',
    'grupos al azar para clase',
    'random group generator español',
  ],
  capabilities: [
    'Interpretar cada línea no vacía como una entrada independiente.',
    'Barajar con Web Crypto y Fisher–Yates antes de distribuir la lista.',
    'Crear entre 1 y tantos grupos como personas haya, sin grupos vacíos.',
    'Mantener una diferencia máxima de una persona entre el grupo mayor y el menor.',
    'Copiar el reparto como texto o descargar un CSV con columnas de grupo y miembro.',
  ],
  contentSections: [
    {
      heading: 'Respuesta rápida: cómo crear grupos aleatorios',
      paragraphs: [
        'Escribe o pega la lista en el cuadro, con una persona por línea. Indica el número de grupos, no el número de integrantes por grupo, y pulsa «Generar grupos». Por ejemplo, con 23 nombres y 5 grupos, el resultado tendrá tres grupos de 5 personas y dos de 4. El orden de esas capacidades depende del reparto posterior al barajado; ningún grupo se elige de antemano para recibir a una persona concreta.',
        'Revisa el resultado antes de anunciarlo. «Copiar todo» produce un bloque legible para un chat o una diapositiva. «Exportar CSV» descarga una fila por integrante, con las columnas `Grupo` y `Miembro`, para abrir el reparto en una hoja de cálculo. La página no conserva la lista ni el resultado al recargar, de modo que conviene guardar la versión aceptada en el sistema que utilices para la actividad.',
      ],
    },
    {
      heading: 'Qué significa equilibrar el tamaño de los equipos',
      paragraphs: [
        'La herramienta usa «equilibrado» en un sentido limitado y comprobable: las cantidades difieren como máximo en una persona. Primero baraja toda la lista y después asigna la primera entrada al grupo 1, la siguiente al grupo 2 y así sucesivamente; cuando llega al último grupo, vuelve al primero. Este reparto circular explica por qué 17 participantes en 4 grupos producen tamaños 5, 4, 4 y 4.',
        'Un número parecido de integrantes no implica que los equipos estén equilibrados en experiencia, idioma, función, edad, género, disponibilidad o necesidades de apoyo. El navegador no conoce esos datos y no debería inferirlos a partir de los nombres. Si el objetivo pedagógico u operativo exige combinar perfiles, usa la salida como borrador y aplica después reglas explícitas que puedas explicar a las personas afectadas.',
      ],
    },
    {
      heading: 'Una entrada por línea, duplicados y homónimos',
      paragraphs: [
        'Cada línea con texto cuenta como una plaza. Los espacios al principio y al final se eliminan, y las líneas totalmente vacías se ignoran. Dos líneas idénticas siguen siendo dos entradas: podrían representar a dos personas con el mismo nombre, una duplicación accidental o una ponderación deliberada. La herramienta no puede distinguir estos casos, así que la limpieza de la lista debe ocurrir antes de generar los grupos.',
        'Cuando haya homónimos, añade un identificador breve y útil, como `Lucía · 2B` o `Álex · mesa 7`. Evita pegar correos, teléfonos, números de documento o información de salud si un alias, dorsal o código de asistencia basta. Si proyectas el resultado, recuerda que el procesamiento local impide que FunnyTools reciba la lista, pero no evita que quienes miran la pantalla puedan leerla o fotografiarla.',
      ],
    },
    {
      heading: 'Barajado Fisher–Yates con Web Crypto',
      paragraphs: [
        'Antes de repartir, el generador aplica Fisher–Yates: recorre la copia de la lista desde el final e intercambia cada posición con otra elegida dentro del tramo aún disponible. Para obtener los índices exige `crypto.getRandomValues`. No utiliza `Math.random` como alternativa silenciosa. Si la función segura no existe, la página deja el resultado vacío y muestra un mensaje, porque presentar una agrupación de origen distinto como si fuera equivalente sería engañoso.',
        'Cada índice se obtiene mediante muestreo por rechazo. Se descartan los enteros que quedarían en la franja sobrante antes de calcular el módulo, de forma que todas las posiciones válidas tengan el mismo número de representaciones posibles. La aleatoriedad reduce la intervención deliberada del organizador, pero no crea un acta, una semilla pública ni una prueba independiente de que no se descartaron intentos anteriores.',
      ],
      link: {
        prefix: 'La fuente de aleatoriedad utilizada se documenta en ',
        label: 'Crypto.getRandomValues de MDN',
        href: 'https://developer.mozilla.org/es/docs/Web/API/Crypto/getRandomValues',
        suffix: '.',
      },
    },
    {
      heading: 'Preparar una lista para clase, taller o evento',
      paragraphs: [
        'Congela primero la lista real de asistentes. Elimina ausencias, confirma incorporaciones tardías y decide cómo tratar a quien deba trabajar en pareja o necesite una adaptación. Si la actividad usa roles como portavoz, relatoría, material o seguridad, asignarlos después del reparto suele ser más claro que ocultar esos criterios dentro de una supuesta selección aleatoria.',
        'En clase, comprueba también si el número de grupos coincide con las mesas, el material y el tiempo disponible. En un taller, puede importar que cada equipo tenga acceso a un dispositivo o que ciertas personas no queden aisladas por el idioma. La herramienta resuelve la mecánica de barajar y repartir; la responsabilidad de que la configuración sea viable, inclusiva y segura sigue en manos de quien organiza.',
      ],
    },
    {
      heading: 'Cómo leer y ajustar el resultado sin falsear el proceso',
      paragraphs: [
        'Antes de modificar nada, guarda o copia el reparto original. Después identifica el motivo concreto de cada cambio: ausencia, accesibilidad, conflicto de interés, requisito técnico o consentimiento. Intercambiar dos personas puede conservar los tamaños y resolver una restricción, pero el resultado final ya no es puramente aleatorio. Decirlo con naturalidad es más transparente que presentar el ajuste como parte del sorteo.',
        'Si el criterio principal es que determinadas personas no coincidan, que cada equipo tenga un rol específico o que se mantengan parejas, esta versión no ofrece restricciones automáticas. Tampoco dispone de arrastrar y soltar, bloqueo de integrantes, historial, semilla ni modo «personas por grupo». Puedes calcular el número de grupos antes de empezar o completar la organización en una hoja de cálculo después de exportar.',
      ],
    },
    {
      heading: 'Exportar CSV de forma segura y comprensible',
      paragraphs: [
        'El archivo incluye una marca UTF-8 para conservar tildes y caracteres como `ñ` al abrirlo en aplicaciones de escritorio. Cada fila contiene el nombre del grupo y una persona. Los valores con comas, comillas o saltos de línea se escriben entre comillas dobles, y las comillas internas se duplican. Esta estructura es adecuada para Excel, Google Sheets, LibreOffice y sistemas que admitan CSV separado por comas.',
        'Una celda cuyo texto empieza por `=`, `+`, `-` o `@`, incluso tras espacios, podría interpretarse como fórmula en algunas hojas de cálculo. Por eso el exportador antepone un apóstrofo a esas entradas. Es una defensa al abrir el archivo, no una limpieza universal: la representación exportada cambia y debes revisarla si el texto inicial era intencional. No importes el CSV a un sistema crítico sin validar encabezados, codificación y contenido.',
      ],
    },
    {
      heading: 'Privacidad, conservación y trazabilidad',
      paragraphs: [
        'El texto se divide, baraja y muestra dentro de esta pestaña. FunnyTools no recibe los nombres ni almacena los grupos. La copia pasa por el portapapeles del dispositivo y la descarga queda en la carpeta configurada por el navegador; ambos lugares pueden sincronizarse o ser accesibles a otras aplicaciones según tu entorno. Borra los archivos temporales si contienen información interna.',
        'No existe historial de generaciones, sello temporal, cuenta de usuario, URL compartible ni recuperación después de cerrar. Para una actividad que pueda generar reclamaciones, conserva fuera de la página la lista aprobada, la regla de reparto, el resultado inicial, los ajustes justificados y la versión final. El uso de una fuente aleatoria segura mejora la selección de posiciones, pero no demuestra por sí solo que el procedimiento completo fuera íntegro.',
      ],
    },
    {
      heading: 'Cuándo conviene usar otro método',
      paragraphs: [
        'No uses azar cuando una decisión deba basarse en competencias, riesgos, responsabilidades legales o necesidades de cuidado. Tampoco es apropiado dejar al azar una adaptación, una medida disciplinaria o la exposición de alguien a una situación no consentida. En esos casos hacen falta criterios profesionales, participación de las personas afectadas y una revisión documentada.',
        'Para torneos con cabezas de serie, turnos con disponibilidad, equipos con cuotas, proyectos con habilidades complementarias o restricciones múltiples, emplea un sistema de asignación que modele esas reglas. Para un reparto temporal de alternativas equivalentes, como mesas de debate, estaciones de práctica o grupos de lectura, este generador ofrece un punto de partida rápido siempre que se revise el contexto antes de publicarlo.',
      ],
    },
  ],
  instructions: [
    'Prepara la lista definitiva y pega una entrada por línea.',
    'Añade códigos breves para distinguir homónimos y elimina duplicados accidentales.',
    'Introduce un número de grupos entre 1 y la cantidad de entradas válidas.',
    'Genera el reparto y comprueba tamaños, asistencia y restricciones externas.',
    'Copia el texto o exporta CSV; documenta cualquier ajuste posterior.',
  ],
  examples: [
    'Repartir 28 estudiantes en 7 mesas de laboratorio con cuatro personas cada una.',
    'Crear 5 equipos de debate a partir de una lista de 23 asistentes.',
    'Formar grupos de lectura temporales y publicar solo códigos de estudiante.',
    'Exportar el reparto a una hoja para añadir mesa, material y persona responsable.',
  ],
  audience: [
    'Docentes y personal de apoyo que preparan grupos de discusión, lectura o laboratorio.',
    'Facilitadores de talleres, formaciones, campamentos y dinámicas de participación.',
    'Organizadores de eventos con alternativas equivalentes y listas ya validadas.',
    'Equipos que necesitan un reparto inicial antes de aplicar restricciones humanas.',
  ],
  caseStudies: [
    {
      title: 'Laboratorio con material limitado',
      description: 'La profesora reparte 24 códigos de estudiante en 6 grupos. Luego comprueba que cada mesa tenga una persona formada en el uso del equipo y registra dos intercambios como ajustes posteriores.',
    },
    {
      title: 'Taller con una ausencia tardía',
      description: 'El facilitador genera cinco equipos, guarda el CSV y descubre una baja. Retira esa entrada, vuelve a generar y comparte únicamente la segunda versión, indicando la hora de cierre de la lista.',
    },
    {
      title: 'Dos participantes con el mismo nombre',
      description: 'La organización añade el número de inscripción a cada homónimo antes de pegar la lista. Así puede comprobar que ambas posiciones aparecen una sola vez sin exponer datos de contacto.',
    },
  ],
  notes: [
    'El campo solicita número de grupos, no integrantes por grupo.',
    'Los tamaños difieren como máximo en una persona; otros tipos de equilibrio no se calculan.',
    'Las líneas idénticas cuentan como entradas separadas.',
    'El CSV antepone un apóstrofo a valores que podrían abrirse como fórmulas.',
    'No hay restricciones, semilla, historial ni almacenamiento de resultados.',
  ],
  faq: [
    {
      q: '¿Cómo se crean grupos aleatorios con tamaños parecidos?',
      a: 'La lista se baraja con Fisher–Yates y después se reparte por turnos. Por eso el grupo mayor solo puede tener una persona más que el menor.',
    },
    {
      q: '¿Puedo indicar cuántas personas debe tener cada grupo?',
      a: 'No directamente. El campo indica cuántos grupos quieres. Calcula esa cantidad según el tamaño aproximado deseado y revisa el reparto final.',
    },
    {
      q: '¿El generador equilibra niveles o habilidades?',
      a: 'No. Solo equilibra la cantidad de entradas. Habilidades, roles, disponibilidad, accesibilidad y relaciones requieren criterios y revisión externos.',
    },
    {
      q: '¿Qué ocurre si un nombre aparece dos veces?',
      a: 'Cada línea es una entrada independiente, por lo que ambas pueden quedar en grupos distintos. Elimina duplicados accidentales o añade identificadores para homónimos.',
    },
    {
      q: '¿Por qué el CSV añade un apóstrofo a ciertos nombres?',
      a: 'Las entradas que empiezan por =, +, - o @ se protegen para reducir el riesgo de que una hoja las ejecute como fórmulas. Revisa la representación al importar.',
    },
    {
      q: '¿Puedo reproducir exactamente el mismo reparto?',
      a: 'No. La herramienta no acepta una semilla ni guarda historial. Conserva el texto o el CSV si necesitas reutilizar la agrupación aceptada.',
    },
  ],
  labels: {
    input: 'Lista, una entrada por línea',
    placeholder: 'Ana · 1A\nLuis · 1A\nMarta · 1B\nDiego · 1B\nNora · 1C\nHugo · 1C',
    groupCount: 'Número de grupos',
    generate: 'Generar grupos',
    reset: 'Restablecer',
    groupLabel: 'Grupo {n}',
    copyAll: 'Copiar todo',
    exportCsv: 'Exportar CSV',
    csvGroup: 'Grupo',
    csvMember: 'Miembro',
    copied: 'Grupos copiados',
    emptyError: 'Introduce al menos dos entradas.',
    invalidError: 'El número de grupos debe ser un entero entre 1 y la cantidad de entradas.',
    emptyResult: 'Los grupos aparecerán aquí',
    cryptoError: 'Este navegador no ofrece una fuente aleatoria segura; no se ha generado ningún grupo.',
    csvFileName: 'grupos-aleatorios.csv',
  },
  privacyNote: 'La lista y el reparto se procesan en esta pestaña. FunnyTools no recibe ni conserva los nombres. El portapapeles y el archivo descargado quedan bajo el control de tu dispositivo.',
  disclaimer: 'La herramienta equilibra cantidades, no perfiles ni necesidades. Revisa asistencia, consentimiento, accesibilidad, seguridad y restricciones antes de publicar los grupos.',
};

export const spanishRandomGroupGeneratorReview = {
  heading: 'Cómo revisar unos grupos aleatorios',
  intro: 'Una revisión útil separa el reparto matemático de las condiciones humanas que la herramienta no conoce.',
  panels: [
    { title: 'Lista', text: 'Confirma asistencia, duplicados, homónimos y datos estrictamente necesarios.' },
    { title: 'Tamaños', text: 'La diferencia debe ser de cero o una persona entre cualquier par de grupos.' },
    { title: 'Contexto', text: 'Aplica después restricciones de seguridad, accesibilidad, roles y consentimiento.' },
  ],
  checklistHeading: 'Lista de comprobación',
  checklist: [
    'Cada persona válida aparece exactamente una vez en el resultado.',
    'El número de grupos cabe en el espacio, el tiempo y los materiales disponibles.',
    'Los ajustes posteriores tienen una razón concreta y comunicable.',
    'La versión final se guarda fuera de la página cuando debe conservarse.',
  ],
};

export const spanishDiceRoller: ToolContent = {
  name: 'Tirar dados online',
  short: 'Lanza de 1 a 20 dados virtuales d4, d6, d8, d10, d12 o d20 y consulta cada resultado y la suma total.',
  long: 'Este lanzador de dados online genera cada cara con `crypto.getRandomValues` y muestreo por rechazo. Elige el tipo de dado, indica una cantidad de 1 a 20 y pulsa para obtener resultados independientes dentro de su intervalo. La tirada queda fijada antes de la animación; después se muestran todas las caras y la suma aritmética. No aplica modificadores, ventaja, reglas de juego ni historial, y no es un sistema certificado para apuestas o sorteos.',
  seoTitle: 'Tirar dados online | Dado virtual d6 y d20',
  seoDescription: 'Tira dados online d4, d6, d8, d10, d12 o d20. Lanza hasta 20 dados virtuales, ve cada cara y calcula el total en el navegador.',
  keywords: [
    'tirar dados online',
    'dado virtual',
    'd20 online',
    'lanzador de dados',
    'tirar d6 online',
    'dados para rol online',
    'simulador de dados',
    'generador de dados aleatorios',
  ],
  capabilities: [
    'Lanzar dados d4, d6, d8, d10, d12 y d20.',
    'Generar entre 1 y 20 resultados independientes en una sola tirada.',
    'Mostrar cada cara individual y la suma aritmética de todas ellas.',
    'Fijar la tirada con Web Crypto antes de reproducir la animación.',
    'Copiar una notación legible con tipo, cantidad, caras y total.',
  ],
  contentSections: [
    {
      heading: 'Respuesta rápida: tirar dados online',
      paragraphs: [
        'Selecciona el dado en el menú, por ejemplo d6 o d20, y escribe cuántos quieres lanzar, entre 1 y 20. Pulsa «Tirar dados». Tras una animación breve verás una ficha por dado y el total. Si eliges tres d6, la copia se identifica como `d6 x 3`, enumera las tres caras y añade su suma. La herramienta no añade bonificadores ni interpreta si la tirada supera una dificultad.',
        'Usa d6 para muchos juegos de mesa y actividades escolares; d20 es habitual en pruebas de rol; d4, d8, d10 y d12 aparecen en sistemas y tablas diferentes. Comprueba siempre las reglas de tu partida. El nombre del dado solo indica cuántas caras equiprobables modela esta página, no qué significa un éxito, un daño, un turno o una puntuación.',
      ],
    },
    {
      heading: 'Qué representan d4, d6, d8, d10, d12 y d20',
      paragraphs: [
        'La notación `dN` significa un dado con N caras numeradas del 1 al N. Por tanto, un d4 produce enteros del 1 al 4 y un d20, del 1 al 20. `3d6` suele leerse como tres dados de seis caras; en la salida de FunnyTools aparece como `d6 x 3`. Cada posición se genera por separado y puede repetir el mismo número que otra.',
        'Esta versión no incluye d100, dados percentiles, d2, dados Fudge/Fate, símbolos personalizados ni caras con texto. Tampoco analiza expresiones como `2d8+4`, `4d6kh3` o «tira con ventaja». Para esas reglas debes lanzar las cantidades disponibles y aplicar el procedimiento externamente, o utilizar una herramienta que muestre de forma explícita la notación completa y sus transformaciones.',
      ],
    },
    {
      heading: 'Cómo se obtiene una cara sin sesgo de módulo',
      paragraphs: [
        'Cada cara procede de un entero de 32 bits generado por `crypto.getRandomValues`. Antes de convertirlo en una posición de 0 a N−1, se calcula el mayor múltiplo de N que cabe en el espacio posible. Los valores que quedan por encima se descartan y se pide otro. Este muestreo por rechazo evita que algunas caras reciban una representación adicional cuando 2³² no es divisible exactamente por el número de caras.',
        'Si Web Crypto no está disponible, la tirada se detiene, se borran fichas anteriores y aparece un error. La página no cambia a `Math.random` sin avisar. El resultado final se calcula antes de que empiecen los cambios visuales de la animación; esos números provisionales solo muestran movimiento y no influyen en las caras que quedarán visibles.',
      ],
      link: {
        prefix: 'La API que entrega los enteros aleatorios se explica en ',
        label: 'Crypto.getRandomValues de MDN',
        href: 'https://developer.mozilla.org/es/docs/Web/API/Crypto/getRandomValues',
        suffix: '.',
      },
    },
    {
      heading: 'Probabilidad de una cara y de una suma',
      paragraphs: [
        'En un dado dN, una cara concreta tiene probabilidad teórica `1/N` en cada lanzamiento: 1/6 en un d6 y 1/20 en un d20. Las tiradas son independientes, así que el resultado anterior no hace que una cara esté «pendiente». Obtener tres seises seguidos no obliga a que el siguiente valor sea bajo; las rachas forman parte de una secuencia aleatoria.',
        'Cuando sumas varios dados, los totales no suelen ser uniformes. Con 2d6, el total 7 puede formarse de seis maneras ordenadas, mientras que 2 solo puede formarse con 1+1. Por eso 7 es mucho más probable que 2 aunque cada dado individual sea uniforme. La herramienta calcula la suma observada, pero no muestra distribución, probabilidad acumulada, media esperada ni intervalo de confianza.',
      ],
    },
    {
      heading: 'Usar un d20 online en juegos de rol',
      paragraphs: [
        'Para una prueba típica, selecciona d20 y cantidad 1. Copia la cara y aplica después el modificador definido por el sistema. Si hay ventaja o desventaja, puedes lanzar dos d20 y conservar manualmente el mayor o el menor según la regla; FunnyTools muestra ambos y su suma, pero esa suma no representa la resolución de ventaja. Conviene escribir en el chat qué criterio se usó.',
        'Para daño u otros efectos con varios dados, selecciona el tipo y la cantidad exactos. Añade bonificadores fijos fuera de la herramienta y registra el cálculo completo, por ejemplo «3d8: 4, 7, 2; suma 13; +5 = 18». La página no conserva un diario de campaña, no vincula resultados a personajes y no evita que una persona repita tiradas.',
      ],
    },
    {
      heading: 'Dados virtuales para clase y demostraciones',
      paragraphs: [
        'En una clase de probabilidad, una tirada rápida sirve para plantear frecuencias, independencia y distribución de sumas. Guarda cada lote en una hoja de cálculo si quieres acumular observaciones; el navegador solo mantiene visible la última tirada. Con pocas pruebas es normal que las frecuencias estén lejos del porcentaje teórico, así que no uses una muestra pequeña para declarar que una cara está favorecida.',
        'También puede asignar preguntas, movimientos o turnos cuando cada número corresponde a una opción aceptable. Prepara primero la tabla y verifica que no contenga huecos. Si hay cinco actividades y usas d6, el 6 necesita una regla previa, como repetir, descansar o usar una sexta opción. El dado elige un número; no corrige una correspondencia mal diseñada.',
      ],
    },
    {
      heading: 'Animación, copia y límites del registro',
      paragraphs: [
        'Durante medio segundo aparecen caras que cambian para señalar que la acción está en curso. La selección final ya se ha realizado y no depende de la velocidad del dispositivo, la tasa de fotogramas ni el instante de la última actualización. Al terminar, «Copiar resultado» prepara un texto con el tipo de dado, los valores individuales y el total para pegarlo en un chat, una ficha o una nota.',
        'La copia no contiene fecha, URL verificable, firma, semilla, contador de intentos ni identidad de quien lanzó. Una captura o un mensaje conserva lo que se mostró, pero no demuestra que fuera la primera tirada. Cuando un juego remoto necesita confianza compartida, utiliza el bot o registro acordado por el grupo. FunnyTools no actúa como servidor de partida ni árbitro resistente a manipulaciones.',
      ],
    },
    {
      heading: 'Usos que esta herramienta no cubre',
      paragraphs: [
        'No está diseñada para apuestas, casinos, premios monetarios, loterías, sorteos regulados o decisiones que exijan auditoría. Web Crypto proporciona una fuente técnicamente más adecuada que un generador casual, pero la página no ofrece controles de acceso, compromiso previo, registro inmutable, certificación del dispositivo ni supervisión independiente.',
        'Tampoco debe decidir cuestiones médicas, legales, financieras, laborales o de seguridad. En un juego, todas las caras forman parte de una regla consentida y reversible; fuera de ese contexto, el azar puede ocultar responsabilidades que necesitan información y juicio. Usa los dados para entretenimiento, enseñanza o desempates cotidianos de bajo riesgo.',
      ],
    },
    {
      heading: 'Comprobar una tirada antes de usarla',
      paragraphs: [
        'Confirma que el selector coincide con la notación pedida y que la cantidad está entre 1 y 20. Cuenta las fichas visibles, comprueba que cada cara se encuentre entre 1 y N y verifica la suma si el resultado importa para la partida. Si debes aplicar un modificador, ventaja o una regla de repetición, anótala por separado para que las demás personas puedan seguir el cálculo.',
        'No vuelvas a lanzar solo porque el resultado parezca improbable: una cara extrema o una serie repetida sigue siendo posible. Repite únicamente cuando la regla lo indique o cuando exista un fallo observable, como una conexión interrumpida antes de mostrar el resultado. Acordar esas condiciones antes de tirar evita discusiones que ninguna animación puede resolver.',
      ],
    },
  ],
  instructions: [
    'Elige el tipo de dado entre d4, d6, d8, d10, d12 y d20.',
    'Indica una cantidad entera de 1 a 20.',
    'Pulsa «Tirar dados» y espera a que termine la animación.',
    'Comprueba las caras individuales y la suma mostrada.',
    'Copia la tirada y aplica fuera de la página cualquier modificador o regla especial.',
  ],
  examples: [
    'Tirar un d20 para una prueba de habilidad y sumar después el modificador del personaje.',
    'Lanzar 6d6, registrar cada cara y utilizar la suma en un juego de mesa.',
    'Recoger veinte tiradas de d4 en una hoja para comparar frecuencias en clase.',
    'Asignar seis preguntas válidas a las caras de un d6 para una actividad breve.',
  ],
  audience: [
    'Jugadores y responsables de partidas de rol o juegos de mesa.',
    'Docentes que explican probabilidad, frecuencia, independencia y sumas.',
    'Grupos remotos que necesitan sustituir temporalmente dados físicos.',
    'Facilitadores que usan números para actividades cotidianas de bajo riesgo.',
  ],
  caseStudies: [
    {
      title: 'Prueba d20 con modificador',
      description: 'La jugadora obtiene 14, copia la tirada en el chat y añade su bonificador +3. El mensaje final separa la cara generada del total 17 calculado por la regla.',
    },
    {
      title: 'Distribución de 2d6',
      description: 'La clase registra cincuenta pares, no solo los totales. Después cuenta cuántas combinaciones producen cada suma y compara por qué el centro aparece con más frecuencia que los extremos.',
    },
    {
      title: 'Ventaja aplicada manualmente',
      description: 'El grupo lanza dos d20 y conserva el mayor según su reglamento. Ignora la suma automática, porque FunnyTools no interpreta la mecánica de ventaja.',
    },
  ],
  notes: [
    'Cada dado produce un entero independiente entre 1 y su número de caras.',
    'Las repeticiones y las rachas son posibles y no indican por sí solas un fallo.',
    'El total es una suma simple, sin modificadores ni reglas especiales.',
    'La tirada se fija antes de la animación y no se guarda en un historial.',
    'No es un sistema de apuestas, sorteo certificado ni servidor auditable.',
  ],
  faq: [
    {
      q: '¿Qué dados puedo tirar online?',
      a: 'La herramienta incluye d4, d6, d8, d10, d12 y d20, con una cantidad de 1 a 20 dados del mismo tipo por tirada.',
    },
    {
      q: '¿Un d20 online da a cada cara un 5 %?',
      a: 'Sí, el modelo asigna una de veinte posiciones uniformes a cada dado. En una muestra corta las frecuencias observadas pueden alejarse bastante del 5 %.',
    },
    {
      q: '¿La animación decide la última cara?',
      a: 'No. Todas las caras finales se generan antes de la animación. Los cambios intermedios son únicamente una señal visual.',
    },
    {
      q: '¿Puedo escribir una fórmula como 2d8+4?',
      a: 'No. Selecciona dos d8 y suma el modificador fuera de la página. Esta versión no interpreta notación ni reglas de juego.',
    },
    {
      q: '¿Por qué el total 7 sale más que el 2 con dos d6?',
      a: 'Porque 7 tiene seis combinaciones ordenadas y 2 solo una. Las caras individuales son uniformes, pero las sumas de varios dados no lo son.',
    },
    {
      q: '¿Sirve para apuestas o una tirada que deba auditarse?',
      a: 'No. No hay historial inmutable, semilla pública, identidad, certificación ni prueba de intentos. Usa el procedimiento regulado o acordado para ese contexto.',
    },
  ],
  labels: {
    diceType: 'Tipo de dado',
    count: 'Cantidad de dados',
    roll: 'Tirar dados',
    copy: 'Copiar resultado',
    result: 'Resultado de la tirada',
    total: 'Total',
    dice: 'Dados',
    placeholder: 'Pulsa para tirar los dados',
    rolling: 'Tirando dados…',
    countError: 'La cantidad debe ser un entero entre 1 y 20.',
    copied: 'Resultado copiado',
    cryptoError: 'Este navegador no ofrece una fuente aleatoria segura; no se ha generado ninguna tirada.',
  },
  privacyNote: 'La selección y la suma se realizan en esta pestaña. FunnyTools no recibe ni conserva las tiradas. El resultado copiado queda bajo el control del portapapeles de tu dispositivo.',
  disclaimer: 'Este dado virtual es para juegos, enseñanza y decisiones cotidianas de bajo riesgo. No sustituye sistemas regulados, auditables o acordados para apuestas y premios.',
};

export const spanishDiceRollerReview = {
  heading: 'Cómo comprobar una tirada de dados',
  intro: 'Separa la cara generada de las reglas que tu juego aplica después.',
  panels: [
    { title: 'Notación', text: 'Confirma tipo y cantidad; `3d6` son tres resultados de 1 a 6.' },
    { title: 'Salida', text: 'Cuenta las fichas y verifica que el total sea la suma de todas las caras.' },
    { title: 'Reglas', text: 'Aplica fuera de la página modificadores, ventaja, repeticiones o umbrales.' },
  ],
  checklistHeading: 'Lista de comprobación',
  checklist: [
    'El dado seleccionado coincide con el solicitado por la actividad.',
    'La cantidad es correcta y cada cara está dentro del intervalo.',
    'El total automático no se confunde con el resultado final de una regla especial.',
    'La tirada se registra externamente si el grupo necesita conservarla.',
  ],
};

export const spanishThisOrThat: ToolContent = {
  name: 'Decidir entre dos opciones',
  short: 'Escribe una opción A y una opción B para hacer un desempate aleatorio 50/50 en decisiones cotidianas de bajo riesgo.',
  long: 'Este selector aleatorio entre dos opciones asigna la misma probabilidad a la posición A y a la posición B. El resultado se obtiene con `crypto.getRandomValues` y queda fijado antes de la animación. Sirve como una moneda virtual con etiquetas para elegir entre dos alternativas ya aceptables, no para analizar ventajas, riesgos o consecuencias. No guarda historial, no recomienda la mejor opción y no debe utilizarse para decisiones médicas, legales, financieras, laborales o de seguridad.',
  seoTitle: 'Decidir entre dos opciones | Selector 50/50',
  seoDescription: 'Escribe dos alternativas y obtén una elección aleatoria 50/50. Selector A o B en el navegador para desempates cotidianos de bajo riesgo.',
  keywords: [
    'decidir entre dos opciones',
    'selector aleatorio entre dos opciones',
    'elegir entre A o B',
    'decisión 50 50',
    'opción A u opción B',
    'cara o cruz con opciones',
    'decidir al azar',
    'this or that español',
  ],
  capabilities: [
    'Aceptar dos textos no vacíos como opción A y opción B.',
    'Asignar una probabilidad de 1/2 a cada posición.',
    'Fijar el resultado con Web Crypto antes de mostrar la animación.',
    'Permitir una nueva elección con las mismas alternativas.',
    'Copiar el texto elegido sin enviar las opciones a FunnyTools.',
  ],
  contentSections: [
    {
      heading: 'Respuesta rápida: decidir entre dos opciones',
      paragraphs: [
        'Escribe una alternativa en «Opción A» y otra en «Opción B». Pulsa «Decidir» y espera a que termine la alternancia visual. La salida será exactamente uno de los dos textos. Puedes copiarlo o pulsar otra vez para realizar una elección nueva e independiente. Ambos campos deben contener algo; los espacios exteriores se eliminan antes de empezar.',
        'Utilízalo cuando A y B ya sean aceptables y solo falte romper un empate: dos películas que el grupo quiere ver, quién empieza una ronda, qué tarea equivalente se hace primero o cuál de dos rutas recreativas conocidas se toma. La página no compara criterios. Si una opción es más cara, peligrosa, irreversible o contraria a alguien, resuelve ese problema antes de recurrir al azar.',
      ],
    },
    {
      heading: 'Por qué se parece a cara o cruz',
      paragraphs: [
        'A y B son dos posiciones equiprobables, igual que las dos caras de una moneda ideal. En cada pulsación, la posición A tiene probabilidad teórica 1/2 y la B también 1/2. Escribir más palabras en una opción no cambia su peso. Si introduces exactamente el mismo texto en ambos campos, el algoritmo sigue eligiendo una posición, pero el resultado visible será indistinguible.',
        'Cada decisión empieza desde cero. Que A haya salido cuatro veces seguidas no aumenta la probabilidad de B en la siguiente; ambas vuelven a tener un 50 %. Las rachas son compatibles con una secuencia aleatoria. La herramienta no intenta alternar resultados ni corregir el historial para que una muestra pequeña parezca equilibrada, y tampoco conserva ese historial al recargar.',
      ],
    },
    {
      heading: 'Selección con Web Crypto antes de la animación',
      paragraphs: [
        'Al pulsar el botón, la página pide un índice de 0 o 1 a `crypto.getRandomValues`. El muestreo por rechazo garantiza que las posiciones tengan el mismo número de valores de origen. Si esa API no está disponible, no elige nada, conserva el mensaje de espera y explica el problema; no recurre en silencio a `Math.random`.',
        'Solo después de obtener el índice comienza una alternancia de aproximadamente un segundo. La opción final ya está fijada, de manera que la velocidad del dispositivo, una pausa de la pestaña o el instante del último repintado no deciden el resultado. La animación ayuda a percibir el cambio, pero no constituye una prueba verificable ni oculta la posibilidad de que alguien pulse varias veces.',
      ],
      link: {
        prefix: 'La selección utiliza ',
        label: 'Crypto.getRandomValues según la documentación de MDN',
        href: 'https://developer.mozilla.org/es/docs/Web/API/Crypto/getRandomValues',
        suffix: '.',
      },
    },
    {
      heading: 'Separar alternativas válidas antes de lanzar la moneda',
      paragraphs: [
        'El azar no convierte una mala alternativa en una opción aceptable. Antes de escribir A y B, comprueba que ambas respeten el presupuesto, el tiempo, las normas, el consentimiento y la seguridad. Si el grupo está eligiendo una película, por ejemplo, elimina primero las que alguien no puede o no quiere ver. El selector solo debe desempatar entre las candidatas que sobreviven a esa revisión.',
        'También conviene acordar qué ocurrirá después: aceptar el primer resultado, permitir una sola repetición bajo una condición definida o usarlo únicamente como sugerencia. Cambiar las reglas cuando aparece una opción que no gusta convierte el proceso en otra cosa. Para una decisión informal no hace falta burocracia, pero una frase previa como «las dos nos sirven y aceptamos la primera» evita malentendidos.',
      ],
    },
    {
      heading: 'La reacción al resultado puede revelar una preferencia',
      paragraphs: [
        'A veces la utilidad no está en obedecer el resultado, sino en notar la reacción inmediata. Si aparece A y sientes alivio, quizá ya preferías A; si aparece B y buscas enseguida una excusa para repetir, quizá la comparación no estaba realmente empatada. Esa reacción puede iniciar una conversación más honesta sobre prioridades.',
        'No es una prueba psicológica ni un método científico. El estado de ánimo, la forma de redactar las opciones y la presión de otras personas influyen en la reacción. Usa esa señal como una pregunta, «¿qué me incomoda de este resultado?», y no como diagnóstico ni mandato. Si la preferencia tiene consecuencias importantes, vuelve a los datos y criterios pertinentes.',
      ],
    },
    {
      heading: 'Ejemplos adecuados para una elección 50/50',
      paragraphs: [
        'En casa puede decidir qué película aceptada ver primero, quién elige la música o cuál de dos tareas equivalentes se realiza antes. En clase puede escoger el orden entre dos actividades ya planificadas. En una reunión, puede desempatar entre dos formatos que cumplen el objetivo. En todos estos casos, el coste de una elección imperfecta es pequeño y se puede corregir.',
        'Para repartir una tarea entre personas, confirma antes que ambas acepten participar y que la carga sea comparable. Una elección aleatoria no crea consentimiento ni hace justa una obligación desigual. Si se repite con frecuencia, registra turnos o usa rotación: una serie de decisiones 50/50 puede producir diferencias temporales aunque cada ejecución individual sea uniforme.',
      ],
    },
    {
      heading: 'Decisiones que no deben delegarse al azar',
      paragraphs: [
        'No uses este selector para elegir un tratamiento, interpretar un síntoma, firmar un contrato, invertir dinero, aceptar una deuda, contratar o despedir, determinar una sanción o asumir un riesgo físico. Esas decisiones requieren información, competencia, responsabilidades claras y, en ocasiones, asesoramiento profesional. Reducirlas a A o B puede ocultar alternativas y consecuencias importantes.',
        'Tampoco debe utilizarse para sortear derechos, ignorar una objeción o presionar a alguien con la frase «lo decidió la herramienta». El resultado no tiene autoridad. En decisiones compartidas, cualquier persona afectada puede retirar su consentimiento. Para sorteos con premios o procedimientos oficiales hacen falta reglas, trazabilidad y mecanismos acordes con la normativa aplicable.',
      ],
    },
    {
      heading: 'Qué funciones no incluye esta versión',
      paragraphs: [
        'No hay ponderaciones, opción «sí/no» especial, mejor de tres, series automáticas, lista de más de dos alternativas, eliminación, semillas ni recomendaciones. Tampoco se guardan las opciones, el historial, la hora o el número de pulsaciones. «Volver a decidir» simplemente ejecuta otra selección 50/50 con los textos actuales.',
        'Si necesitas comparar precio, tiempo, impacto y preferencias, utiliza una matriz de decisión. Si tienes tres o más alternativas, emplea una ruleta o un selector de nombres después de validar la lista. Si necesitas reparto justo a lo largo del tiempo, usa un turno rotativo o un registro. Elegir la herramienta adecuada evita atribuir al azar capacidades que no posee.',
      ],
    },
    {
      heading: 'Privacidad y forma de compartir el resultado',
      paragraphs: [
        'Las dos opciones y el resultado permanecen en la pestaña; FunnyTools no los recibe ni los almacena. Al copiar, el texto pasa al portapapeles del dispositivo, donde puede ser visible para otras aplicaciones o servicios de sincronización. Evita escribir datos personales, diagnósticos, secretos comerciales o información de terceros si basta una etiqueta neutra.',
        'Compartir solo la opción elegida no explica el contexto ni demuestra que fuera la primera ejecución. Si un equipo necesita dejar constancia, anota las dos alternativas aceptadas, la regla acordada y el resultado en su propio documento. Esta página ofrece una acción breve y transparente para bajo riesgo, no un registro auditable ni una garantía contra manipulación local.',
      ],
    },
  ],
  instructions: [
    'Comprueba primero que ambas alternativas sean válidas, seguras y aceptadas.',
    'Escribe un texto claro en Opción A y otro en Opción B.',
    'Acuerda si se aceptará la primera elección antes de pulsar.',
    'Pulsa «Decidir» y espera a que termine la animación.',
    'Copia el resultado o usa tu reacción para volver a evaluar los criterios.',
  ],
  examples: [
    'Elegir cuál de dos películas ya aceptadas verá el grupo esta noche.',
    'Decidir si una reunión empieza por el tema A o por el tema B.',
    'Desempatar entre dos restaurantes que cumplen presupuesto y preferencias.',
    'Escoger quién inicia una ronda cuando ambas personas están de acuerdo.',
  ],
  audience: [
    'Personas que quieren resolver pequeños empates cotidianos.',
    'Familias y grupos que ya han filtrado dos alternativas aceptables.',
    'Docentes y facilitadores que deciden el orden de actividades equivalentes.',
    'Equipos que necesitan una moneda virtual con etiquetas claras.',
  ],
  caseStudies: [
    {
      title: 'Dos películas aceptadas',
      description: 'El grupo elimina primero las películas con objeciones, escribe las dos finalistas y acuerda aceptar la primera salida. El selector resuelve únicamente el empate restante.',
    },
    {
      title: 'Una preferencia no reconocida',
      description: 'Aparece la opción B y la persona siente decepción inmediata. En lugar de culpar al azar, reconoce que prefería A y revisa su decisión con ese dato.',
    },
    {
      title: 'Reparto que necesita turnos',
      description: 'Dos compañeros usan 50/50 para una tarea semanal y observan una racha. Cambian a una rotación registrada, más adecuada para igualdad acumulada.',
    },
  ],
  notes: [
    'A y B son posiciones equiprobables; la longitud del texto no cambia el peso.',
    'Cada pulsación es independiente y puede formar rachas.',
    'El resultado se decide antes de la animación.',
    'La herramienta no evalúa riesgos, preferencias, costes ni consentimiento.',
    'No hay historial, semilla, ponderación, mejor de varios ni recomendación.',
  ],
  faq: [
    {
      q: '¿Cómo decidir entre dos opciones al azar?',
      a: 'Valida primero ambas alternativas, escríbelas como A y B y pulsa «Decidir». Cada posición tiene una probabilidad teórica del 50 %.',
    },
    {
      q: '¿La opción A tiene ventaja por aparecer primero?',
      a: 'No. El algoritmo elige un índice uniforme entre dos posiciones. El orden visual no modifica la probabilidad.',
    },
    {
      q: '¿La animación determina el resultado?',
      a: 'No. La opción se fija con Web Crypto antes de iniciar la alternancia. El movimiento es únicamente visual.',
    },
    {
      q: '¿Por qué vuelve a salir la misma opción?',
      a: 'Cada pulsación es independiente. Una racha de A o de B es posible y no obliga al siguiente resultado a compensarla.',
    },
    {
      q: '¿Puedo usarlo para una decisión importante?',
      a: 'No como sustituto del análisis. Decisiones médicas, legales, financieras, laborales o de seguridad necesitan criterios, información y responsabilidad.',
    },
    {
      q: '¿Guarda las opciones o un historial?',
      a: 'No. Los textos y resultados permanecen en la pestaña y desaparecen al recargar. Copia lo necesario en tu propio registro.',
    },
  ],
  labels: {
    optionA: 'Opción A',
    optionB: 'Opción B',
    placeholderA: 'Ver la película',
    placeholderB: 'Jugar una partida',
    decide: 'Decidir',
    copy: 'Copiar resultado',
    reset: 'Restablecer',
    result: 'Opción elegida',
    waiting: 'Escribe dos opciones para empezar',
    error: 'Completa las dos opciones.',
    copied: 'Resultado copiado',
    cryptoError: 'Este navegador no ofrece una fuente aleatoria segura; no se ha elegido ninguna opción.',
  },
  privacyNote: 'Las opciones y la elección se procesan en esta pestaña. FunnyTools no las recibe ni las conserva. Evita datos sensibles y controla el portapapeles al compartir.',
  disclaimer: 'Utiliza el selector solo para alternativas de bajo riesgo ya consideradas aceptables. El azar no evalúa consecuencias ni sustituye el consentimiento, la evidencia o el juicio profesional.',
};

export const spanishThisOrThatReview = {
  heading: 'Cómo revisar una decisión A o B',
  intro: 'La comprobación importante ocurre antes de elegir: las dos alternativas deben ser realmente aceptables.',
  panels: [
    { title: 'Elegibilidad', text: 'Descarta opciones inseguras, inviables o no consentidas antes del 50/50.' },
    { title: 'Probabilidad', text: 'A y B son posiciones independientes con una probabilidad teórica de 1/2.' },
    { title: 'Consecuencia', text: 'Acepta, reconsidera o registra el resultado según la regla acordada.' },
  ],
  checklistHeading: 'Lista de comprobación',
  checklist: [
    'Ambas opciones cumplen presupuesto, tiempo, normas y consentimiento.',
    'La elección es reversible o de consecuencias pequeñas.',
    'Las personas afectadas conocen la regla antes de pulsar.',
    'Una reacción emocional se trata como información, no como diagnóstico.',
  ],
};
