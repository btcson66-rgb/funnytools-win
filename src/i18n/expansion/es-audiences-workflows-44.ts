import type { SpanishInfoPage } from './es-pages';

const developerSources = [
  {
    label: 'MDN: JSON',
    href: 'https://developer.mozilla.org/es/docs/Learn_web_development/Core/Scripting/JSON',
    note: 'Estructura, serialización y lectura de JSON en aplicaciones web.',
  },
  {
    label: 'OWASP: gestión de secretos',
    href: 'https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html',
    note: 'Principios para no exponer claves, tokens y credenciales en herramientas o registros.',
  },
  {
    label: 'MDN: Web Crypto API',
    href: 'https://developer.mozilla.org/es/docs/Web/API/Web_Crypto_API',
    note: 'Capacidades criptográficas del navegador y límites de uso seguro.',
  },
];

const educationWorkflowSources = [
  {
    label: 'INTEF: orientaciones sobre herramientas digitales',
    href: 'https://intef.es/Noticias/orientaciones-sobre-el-uso-de-herramientas-digitales/',
    note: 'Criterios institucionales para evaluar herramientas, proveedores y protección de datos.',
  },
  {
    label: 'W3C WAI: accesibilidad en educación',
    href: 'https://www.w3.org/WAI/standards-guidelines/education/',
    note: 'Recursos para integrar accesibilidad en materiales y actividades educativas.',
  },
  {
    label: 'NIST: medidas de localización y dispersión',
    href: 'https://www.itl.nist.gov/div898/handbook/eda/section3/eda35.htm',
    note: 'Referencia estadística para media, desviación y posición de una puntuación.',
  },
];

export const spanishDevelopersAudience: SpanishInfoPage = {
  title: 'Herramientas para desarrolladores y datos de prueba',
  seoTitle: 'Herramientas para desarrolladores: JSON y Base64 | FunnyTools',
  seoDescription: 'Herramientas para desarrolladores: formatear JSON, Base64, URL, UUID, timestamp, CSV y Markdown sin pegar claves ni datos reales.',
  keywords: ['herramientas para desarrolladores online', 'formatear JSON online', 'decodificar Base64', 'generar UUID v4', 'convertir timestamp Unix'],
  eyebrow: 'Depurar una muestra sin convertirla en una fuga',
  intro: 'Esta ruta reúne operaciones pequeñas de desarrollo y soporte: leer JSON, codificar una URL, inspeccionar Base64, generar un UUID, convertir un timestamp, pasar entre CSV y JSON o previsualizar Markdown. Están pensadas para ejemplos y datos de prueba. Las credenciales, datos personales y archivos internos deben permanecer en el entorno aprobado por tu equipo.',
  directAnswer: [
    'Antes de utilizar estas herramientas para desarrolladores online, reduce el caso y reemplaza secretos y datos reales por valores ficticios. Conserva el texto original, ejecuta una sola transformación y compara bytes, campos, unidades o filas. Después vuelve al código, esquema o sistema de origen para comprobar el significado.',
    'Formatear no valida reglas de negocio; Base64 y URL encoding no cifran; un UUID no es una contraseña; un timestamp no incluye por sí solo la zona que el usuario espera; convertir CSV puede cambiar tipos o activar fórmulas al abrir una hoja. Cada salida necesita una prueba conocida y una revisión en el consumidor real.',
  ],
  sections: [
    {
      heading: 'Reducir el caso antes de copiar datos',
      paragraphs: [
        'Crea una muestra mínima que conserve el error: dos o tres campos, una fila problemática o una fecha representativa. Sustituye nombres, correos, tokens, claves, identificadores y valores comerciales. No basta con borrar un campo visible si otros permiten reidentificar a una persona.',
        'Guarda la entrada y el resultado esperado en un issue o archivo seguro. Anota codificación, versión, zona horaria y sistema de origen. Un ejemplo pequeño y reproducible suele resolver más rápido que pegar una respuesta completa de producción.',
      ],
    },
    {
      heading: 'Formatear JSON sin confundir sintaxis con validez',
      paragraphs: [
        'El formateador ayuda a localizar comas, llaves, cadenas y niveles. Si JSON.parse acepta el texto, la sintaxis es válida; aún debes comprobar esquema, campos obligatorios, tipos, rangos, unidades y relaciones entre valores.',
        'Vigila números fuera de la precisión segura de JavaScript, fechas representadas como texto, null frente a campo ausente y claves duplicadas producidas por sistemas defectuosos. No ejecutes contenido de una cadena ni lo pegues en la consola como código.',
      ],
      links: [
        { label: 'Formatear y validar JSON', href: '/es/herramientas/formatear-validar-json/', description: 'Organiza texto y muestra errores de análisis.' },
      ],
    },
    {
      heading: 'Usar Base64 y URL encoding para transporte, no seguridad',
      paragraphs: [
        'Base64 representa bytes como texto. Cualquiera puede decodificarlo; no oculta credenciales ni información privada. Confirma UTF-8, Base64URL, relleno y si la entrada ya contiene un prefijo data URL antes de comparar resultados.',
        'La codificación de componentes de URL protege caracteres reservados dentro de un parámetro, pero no autoriza el destino ni cifra la consulta. Revisa diferencias entre espacio, signo más, porcentaje y codificación aplicada dos veces.',
      ],
      links: [
        { label: 'Codificar y decodificar Base64', href: '/es/herramientas/codificar-decodificar-base64/', description: 'Trabaja con texto UTF-8 y Base64URL sin presentarlo como cifrado.' },
        { label: 'Codificar y decodificar URL', href: '/es/herramientas/codificar-decodificar-url/', description: 'Inspecciona componentes y caracteres reservados.' },
      ],
    },
    {
      heading: 'Generar UUID para identificadores de prueba',
      paragraphs: [
        'Un UUID v4 sirve para identificar objetos con baja probabilidad de colisión. No demuestra orden, autenticidad ni autorización, y no debe reutilizarse como secreto. Para pruebas, confirma formato, versión y variante; para persistencia, deja que el sistema responsable aplique su política.',
        'No sustituyas una clave de API, token de sesión o contraseña por un UUID visible. La seguridad depende de entropía, almacenamiento, rotación, alcance y verificación, no solo de una cadena larga.',
      ],
      links: [
        { label: 'Generador UUID v4', href: '/es/herramientas/generador-uuid-v4/', description: 'Crea identificadores con crypto.randomUUID cuando está disponible.' },
        { label: 'Generador de contraseñas', href: '/es/herramientas/generador-contrasenas-seguras/', description: 'Genera una contraseña que debe guardarse en un gestor.' },
      ],
    },
    {
      heading: 'Convertir timestamps con unidad y zona explícitas',
      paragraphs: [
        'Distingue segundos de milisegundos antes de convertir. Una cifra con tres dígitos adicionales puede desplazar el resultado miles de años. Compara con una fecha conocida y conserva el valor original.',
        'Unix timestamp representa un instante; la presentación depende de zona, horario de verano y locale. En un reporte de error incluye valor, unidad, zona esperada y formato observado. No arregles una diferencia sumando horas sin identificar dónde se aplicó la zona.',
      ],
      links: [
        { label: 'Conversor de timestamp Unix', href: '/es/herramientas/convertir-timestamp-unix/', description: 'Compara segundos, milisegundos, UTC y hora local.' },
      ],
    },
    {
      heading: 'Convertir CSV y JSON sin perder filas ni tipos',
      paragraphs: [
        'Identifica delimitador, cabecera, comillas, saltos dentro de campos, separador decimal y codificación. Prueba una muestra con acentos, comas, vacíos y ceros iniciales. Después compara conteo de filas y columnas.',
        'Al exportar CSV, trata cadenas que empiezan por =, +, - o @ como posible fórmula para hojas de cálculo. Al importar JSON, decide cómo manejar objetos anidados y arrays. Una tabla plana no puede representar sin pérdida cualquier estructura.',
      ],
      links: [
        { label: 'Convertir CSV a JSON', href: '/es/herramientas/convertir-csv-a-json/', description: 'Controla delimitador, cabeceras y tipos inferidos.' },
        { label: 'Convertir JSON a CSV', href: '/es/herramientas/convertir-json-a-csv/', description: 'Revisa columnas y protección frente a fórmulas.' },
      ],
    },
    {
      heading: 'Previsualizar Markdown como contenido no confiable',
      paragraphs: [
        'Una vista previa permite revisar encabezados, listas, enlaces y bloques de código. El contenido externo sigue siendo no confiable. Mantén el saneamiento de HTML y no permitas scripts, atributos peligrosos o URL dudosas.',
        'Comprueba también el renderizador final: GitHub, documentación, CMS o paquete pueden interpretar extensiones distintas. Una vista visual no sustituye el lint, la revisión de enlaces ni el control de accesibilidad.',
      ],
      links: [
        { label: 'Editor Markdown online', href: '/es/herramientas/editor-markdown-online/', description: 'Previsualiza contenido con HTML saneado.' },
      ],
    },
    {
      heading: 'Lista de control antes de compartir el resultado',
      paragraphs: [
        'Compara entrada y salida, prueba el caso esperado y uno límite, y abre el resultado en el consumidor real. Registra la herramienta y parámetros usados. Si el resultado cambia una base de datos o despliegue, añade revisión y copia de seguridad en el sistema correspondiente.',
        'No pegues secretos aunque una página indique procesamiento local. Extensiones, equipos administrados, capturas y registros siguen existiendo. Ante una posible exposición, rota la credencial; no te limites a borrar el historial.',
      ],
      items: [
        'Muestra mínima y anonimizada.',
        'Codificación, unidad y zona identificadas.',
        'Sintaxis separada de esquema y significado.',
        'Caso conocido y borde comprobados.',
        'Salida abierta en el consumidor real.',
        'Ninguna clave, token o dato personal expuesto.',
      ],
    },
  ],
  faq: [
    { q: '¿Puedo pegar una respuesta real de una API?', a: 'Solo si la política lo permite y has eliminado secretos y datos identificables. Es mejor construir una muestra mínima ficticia.' },
    { q: '¿JSON válido significa que la API lo aceptará?', a: 'No. Falta comprobar esquema, tipos, campos, permisos y reglas de negocio.' },
    { q: '¿Base64 protege una contraseña?', a: 'No. Es una codificación reversible, no cifrado.' },
    { q: '¿Un UUID v4 sirve como token?', a: 'No por defecto. Un token necesita una política de seguridad, alcance, almacenamiento, expiración y validación.' },
    { q: '¿Por qué cambia la hora del timestamp?', a: 'Revisa segundos o milisegundos, UTC, zona local y horario de verano antes de corregir.' },
    { q: '¿CSV conserva objetos anidados?', a: 'No de forma universal. Debes definir cómo aplanar arrays y objetos y documentar la pérdida o transformación.' },
    { q: '¿La vista previa Markdown ejecuta HTML?', a: 'La herramienta sanea el HTML, pero todo contenido externo debe seguir tratándose como no confiable.' },
    { q: '¿Qué hago si pegué un secreto por error?', a: 'Rota o revoca la credencial según el procedimiento del proveedor y revisa registros. Borrar la pestaña no invalida un secreto expuesto.' },
  ],
  review: {
    heading: 'Revisión técnica de una transformación',
    intro: 'La salida debe ser reproducible con una muestra segura y conservar el significado que el sistema necesita.',
    checks: [
      { title: 'Caso seguro', text: 'No contiene credenciales, datos personales ni información interna innecesaria.' },
      { title: 'Semántica', text: 'Tipos, unidades, zona, codificación y esquema se verifican fuera de la herramienta.' },
      { title: 'Consumidor real', text: 'El resultado se prueba en la API, aplicación o formato que finalmente lo leerá.' },
    ],
  },
  sources: developerSources,
};

export const spanishTeacherExamWorkflow: SpanishInfoPage = {
  title: 'Flujo para calcular una nota de oposición docente',
  seoTitle: 'Cómo calcular nota de oposición docente paso a paso',
  seoDescription: 'Flujo para calcular examen, méritos, ponderaciones, nota total, T, Z y percentil sin confundir una estimación con el resultado oficial.',
  keywords: ['calcular nota oposición docente', 'nota ponderada oposición', 'baremo méritos docentes', 'puntuación T oposición', 'percentil examen docente'],
  eyebrow: 'Convocatoria, puntuaciones, pesos y comprobación oficial',
  intro: 'Este flujo ayuda a organizar examen, prueba práctica, programación, entrevista, méritos u otros componentes de una oposición o selección docente. La fórmula cambia entre convocatorias y territorios; por eso el primer paso es copiar la regla vigente y el último es comparar con la publicación oficial.',
  directAnswer: [
    'Para calcular una nota de oposición docente, separa cada componente, anota su escala y copia los pesos de la convocatoria. Convierte todas las entradas a unidades compatibles, aplica mínimos eliminatorios antes de combinar cuando la norma lo indique y redondea solo al final. Conserva una tabla con valor original, transformación, peso y resultado.',
    'T, Z y percentil solo pueden calcularse si dispones de una media, desviación o distribución del mismo grupo de referencia. No inventes esos datos ni uses cifras de otra convocatoria. FunnyTools produce una estimación explicable; la lista, acta, baremo y regla oficial prevalecen.',
  ],
  sections: [
    {
      heading: '1. Identificar la convocatoria y la versión de la regla',
      paragraphs: [
        'Guarda título, organismo, territorio, especialidad, turno, fecha y enlace. Descarga bases, correcciones y anexos. Una fórmula vista en un foro puede corresponder a otro año o cuerpo.',
        'Marca qué documento resuelve contradicciones y si existe una modificación posterior. Anota decimales, empates, mínimos, exclusiones y orden de fases antes de introducir puntuaciones.',
      ],
    },
    {
      heading: '2. Separar puntuaciones y escalas',
      paragraphs: [
        'Crea una fila para examen, práctica, programación, defensa, entrevista, méritos y cualquier subparte. Registra máximo, mínimo y valor obtenido. No sumes directamente una prueba sobre 100 con otra sobre 10.',
        'Si la nota publicada ya incorpora un peso, no lo apliques otra vez. Conserva el valor oficial y una columna separada para tu cálculo.',
      ],
    },
    {
      heading: '3. Comprobar mínimos y reglas eliminatorias',
      paragraphs: [
        'Algunas fases exigen superar cada parte antes de promediar; otras permiten compensación. Aplica la condición en el punto exacto de la fórmula. Una suma alta no rescata una parte eliminatoria si la convocatoria no lo permite.',
        'Distingue no presentado, excluido, cero y dato pendiente. No sustituyas un dato ausente por cero salvo que la regla lo diga.',
      ],
    },
    {
      heading: '4. Aplicar ponderaciones en una unidad común',
      paragraphs: [
        'Convierte porcentajes a decimales o mantén todo en porcentaje y comprueba que suman 100%. Multiplica cada componente por su peso y suma los aportes. Muestra el cálculo antes del redondeo.',
        'Prueba un ejemplo sencillo en el que todas las notas sean iguales; la media ponderada debería conservar ese valor si las escalas ya son compatibles.',
      ],
      links: [
        { label: 'Calculadora de nota de oposición docente', href: '/es/herramientas/calculadora-nota-oposicion-docente/', description: 'Introduce componentes, pesos y comprueba el total.' },
        { label: 'Calculadora de media ponderada', href: '/es/herramientas/calculadora-media-ponderada/', description: 'Revisa el aporte de cada valor y peso.' },
      ],
    },
    {
      heading: '5. Incorporar méritos o baremo sin duplicar conceptos',
      paragraphs: [
        'Clasifica experiencia, formación, títulos y otros méritos según el anexo. Aplica topes por sección y globales. No cuentes el mismo documento en dos apartados si las bases lo impiden.',
        'Separa puntos reclamados, provisionales y definitivos. Guarda justificante y motivo de cualquier exclusión para revisar dentro del plazo.',
      ],
    },
    {
      heading: '6. Calcular Z, T o percentil solo con referencia válida',
      paragraphs: [
        'Z necesita puntuación, media y desviación estándar del mismo grupo. T suele transformar Z con media 50 y desviación 10, salvo definición distinta. El percentil describe posición relativa y no equivale siempre a rango exacto.',
        'Una desviación cero impide estandarizar. Un percentil estimado desde una distribución teórica no sustituye la lista real ni las reglas de empate.',
      ],
      links: [
        { label: 'Calculadora de puntuación Z', href: '/es/herramientas/calculadora-puntuacion-z/', description: 'Sitúa una puntuación respecto a media y desviación.' },
        { label: 'Calculadora de puntuación T', href: '/es/herramientas/calculadora-puntuacion-t/', description: 'Transforma Z cuando la escala T aplicable es 50/10.' },
        { label: 'Calculadora de rango percentil', href: '/es/herramientas/calculadora-rango-percentil/', description: 'Estima posición con una regla declarada.' },
      ],
    },
    {
      heading: '7. Comparar escenarios sin presentar predicciones como hechos',
      paragraphs: [
        'Puedes variar una parte pendiente o un baremo provisional para entender sensibilidad. Etiqueta cada escenario y conserva la entrada. No lo presentes como corte previsto sin datos oficiales y método.',
        'El número de plazas, ausencias, empates y decisiones administrativas puede cambiar el resultado. Usa escenarios para planificar, no para afirmar admisión.',
      ],
    },
    {
      heading: '8. Contrastar la publicación y preparar una revisión',
      paragraphs: [
        'Cuando aparezca la lista, compara componente por componente antes de mirar el total. Revisa identificación, puntuación, peso, mérito, tope y redondeo. Guarda la versión y fecha de consulta.',
        'Si existe diferencia, prepara una tabla breve con dato oficial, regla, cálculo esperado y documento justificativo. Sigue el canal y plazo indicados; la calculadora no presenta reclamaciones.',
      ],
      items: [
        'Convocatoria y correcciones guardadas.',
        'Escalas y mínimos identificados.',
        'Pesos suman 100% o la unidad oficial.',
        'Méritos respetan topes y no se duplican.',
        'Referencia de T, Z o PR pertenece al mismo grupo.',
        'Resultado comparado con la lista oficial.',
      ],
    },
  ],
  faq: [
    { q: '¿Cómo calculo la nota ponderada?', a: 'Convierte componentes a escalas compatibles, multiplica cada valor por su peso y suma. Aplica mínimos en el orden oficial.' },
    { q: '¿Debo redondear cada parte?', a: 'Solo si la convocatoria lo exige. En general conserva precisión y redondea al punto indicado, normalmente al final.' },
    { q: '¿Puedo usar la media del año anterior para Z?', a: 'Solo como escenario claramente etiquetado. No representa la referencia oficial de la convocatoria actual.' },
    { q: '¿T y percentil son lo mismo?', a: 'No. T es una transformación estandarizada; el percentil describe posición relativa bajo una regla o distribución.' },
    { q: '¿El percentil indica mi puesto exacto?', a: 'No necesariamente. Empates, lista completa y método de cálculo afectan el rango exacto.' },
    { q: '¿La calculadora predice si obtendré plaza?', a: 'No. Organiza una estimación; plazas, cortes, empates y actos oficiales determinan el resultado.' },
    { q: '¿Qué dato prevalece si hay una diferencia?', a: 'La publicación y el procedimiento oficial, sujeto a los canales de revisión previstos.' },
    { q: '¿Qué debo guardar para revisar?', a: 'Bases, correcciones, puntuaciones, justificantes, tabla de cálculo, fecha y versión de la lista.' },
  ],
  review: {
    heading: 'Revisión de la estimación de oposición',
    intro: 'El resultado debe poder reconstruirse desde la convocatoria y cada puntuación original.',
    checks: [
      { title: 'Regla vigente', text: 'La fórmula procede de la convocatoria y sus correcciones.' },
      { title: 'Cálculo trazable', text: 'Escalas, mínimos, pesos, topes y redondeo aparecen separados.' },
      { title: 'Estado correcto', text: 'Estimación, provisional y definitivo no se mezclan.' },
    ],
  },
  sources: educationWorkflowSources,
};

export const spanishClassroomRandomWorkflow: SpanishInfoPage = {
  title: 'Flujo para grupos y selección aleatoria en el aula',
  seoTitle: 'Grupos aleatorios y selección de alumnos en clase',
  seoDescription: 'Flujo para preparar una lista, crear grupos, seleccionar alumnos, asignar turnos y usar un temporizador con privacidad y revisión docente.',
  keywords: ['grupos aleatorios clase', 'selector aleatorio de alumnos', 'ruleta para clase', 'temporizador para aula', 'hacer grupos equitativos'],
  eyebrow: 'Azar transparente, revisión pedagógica y plan alternativo',
  intro: 'Este flujo conecta lista, grupos, selección, turnos y tiempo para una actividad de aula. El azar puede repartir sin preferencia, pero no conoce ausencias, necesidades de apoyo, relaciones, objetivos ni seguridad. El docente prepara las reglas, revisa la salida y ofrece una alternativa accesible.',
  directAnswer: [
    'Para crear grupos aleatorios en clase, utiliza solo la lista de quienes participan, elimina duplicados, decide número o tamaño y explica cómo se tratarán sobrantes. Genera una primera versión y revisa apoyos, idioma, materiales, convivencia y accesibilidad antes de mostrarla.',
    'Para seleccionar alumnos o turnos, define si habrá repetición, qué opciones son válidas y cómo puede participar quien no deba responder en público. Añade un temporizador probado y una señal alternativa. Al terminar, elimina listas temporales del equipo compartido.',
  ],
  sections: [
    {
      heading: '1. Definir el objetivo de la actividad',
      paragraphs: [
        'Aclara si necesitas grupos de discusión, parejas, orden de exposición, reparto de temas, preguntas de repaso o roles. El resultado deseado determina si conviene azar puro, equilibrio o asignación docente.',
        'Explica duración, producto y criterios antes del sorteo. El azar no corrige una consigna ambigua ni una tarea imposible en el tiempo disponible.',
      ],
    },
    {
      heading: '2. Preparar una lista mínima y actual',
      paragraphs: [
        'Incluye solo a quienes participan hoy. Usa nombres de pila, números o etiquetas cuando basten. No pegues identificadores oficiales, diagnósticos, teléfonos ni observaciones.',
        'Normaliza espacios, revisa duplicados y decide cómo distinguir nombres iguales sin exponer más datos. Prueba primero con seis entradas ficticias.',
      ],
    },
    {
      heading: '3. Elegir número de grupos o tamaño',
      paragraphs: [
        'Define si priorizas cantidad de grupos o personas por grupo. Calcula sobrantes y acuerda cómo se repartirán. Comprueba que cada grupo pueda usar materiales, espacio y dispositivos.',
        'Genera la primera distribución, pero no la proyectes de inmediato. Revisa ausencias, apoyos, idioma, seguridad y conflictos. Ajusta lo necesario y explica la razón práctica.',
      ],
      links: [
        { label: 'Generador de grupos para clase', href: '/es/herramientas/crear-grupos-clase/', description: 'Distribuye una lista por cantidad o tamaño.' },
        { label: 'Generador de grupos aleatorios', href: '/es/herramientas/generador-grupos-aleatorios/', description: 'Alternativa para listas y actividades generales.' },
        { label: 'Guía de agrupamientos equitativos', href: '/es/guias/agrupamientos-equitativos-aula/', description: 'Decide cuándo revisar o evitar el azar.' },
      ],
    },
    {
      heading: '4. Seleccionar turnos con una regla visible',
      paragraphs: [
        'Decide si una persona puede repetirse, cuándo se reinicia la lista y qué ocurre si no puede participar. Muestra la regla antes de seleccionar y permite una vía equivalente que no exponga una necesidad personal.',
        'Una probabilidad igual no garantiza una experiencia equitativa. Registra participación a lo largo de varias sesiones si el objetivo es repartir oportunidades, no solo en un sorteo.',
      ],
      links: [
        { label: 'Selector aleatorio de alumnos', href: '/es/herramientas/selector-aleatorio-alumnos/', description: 'Selecciona con control de repetición.' },
        { label: 'Sorteo de nombres', href: '/es/herramientas/sorteo-nombres-aleatorio/', description: 'Ordena personas o turnos desde una lista revisada.' },
      ],
    },
    {
      heading: '5. Usar una ruleta para temas o roles válidos',
      paragraphs: [
        'Incluye solo opciones apropiadas y realizables. Define si se retira una opción después de salir. Para roles, comprueba que no asignes tareas inaccesibles o siempre el mismo trabajo a la misma persona.',
        'La animación hace visible el resultado, no lo vuelve más justo que la lista y regla configuradas. Conserva una alternativa sin proyección si la pantalla o movimiento supone una barrera.',
      ],
      links: [
        { label: 'Ruleta aleatoria', href: '/es/herramientas/ruleta-aleatoria/', description: 'Sortea opciones con probabilidad uniforme.' },
        { label: 'Guía de ruleta y sorteos', href: '/es/guias/ruleta-sorteos-clase/', description: 'Prepara opciones, repetición y registro.' },
      ],
    },
    {
      heading: '6. Temporizar sin convertir el reloj en castigo',
      paragraphs: [
        'Elige una duración realista, avisa antes de comenzar y ofrece señales intermedias. Prueba sonido, pantalla completa, suspensión y reinicio en el dispositivo del aula.',
        'Prepara una señal verbal, visual o física si falla la tecnología. Ajusta el tiempo cuando la actividad o accesibilidad lo requiera; el temporizador organiza, no decide una adaptación.',
      ],
      links: [
        { label: 'Temporizador online', href: '/es/herramientas/temporizador-online/', description: 'Cuenta atrás visible para una actividad.' },
        { label: 'Guía de temporizador para clase', href: '/es/guias/temporizador-clase/', description: 'Avisos, pausas, prueba y plan B.' },
      ],
    },
    {
      heading: '7. Compartir el resultado sin exponer datos',
      paragraphs: [
        'Proyecta solo la información necesaria. No muestres observaciones, apoyos ni razones de un ajuste. Si copias grupos a una plataforma, revisa permisos y destinatarios.',
        'Para una actividad puntual, no necesitas conservar la lista en el navegador. Borra el contenido y cierra la pestaña al terminar, en especial en un equipo compartido.',
      ],
    },
    {
      heading: '8. Revisar la actividad y ajustar la próxima vez',
      paragraphs: [
        'Observa si los tamaños funcionaron, si hubo participación, si el tiempo bastó y si la regla se entendió. No atribuyas todos los problemas al grupo aleatorio; revisa consigna, roles, recursos y apoyo.',
        'Conserva solo un registro pedagógico necesario, no la lista temporal completa. Cambia el método cuando el azar no sirva al objetivo.',
      ],
      items: [
        'Objetivo y producto explicados.',
        'Lista mínima, actual y sin duplicados.',
        'Regla de grupos, sobrantes y repetición definida.',
        'Salida revisada antes de proyectar.',
        'Alternativa accesible y plan sin tecnología.',
        'Lista temporal retirada al finalizar.',
      ],
    },
  ],
  faq: [
    { q: '¿Los grupos aleatorios son siempre equitativos?', a: 'No. Reparten según la regla, pero el docente debe revisar apoyos, recursos, convivencia y objetivo.' },
    { q: '¿Qué hago con un número que no divide exactamente?', a: 'Decide antes si algunos grupos tendrán una persona más y comprueba que el reparto sea viable.' },
    { q: '¿Puedo usar nombres completos?', a: 'Usa la identificación mínima apropiada y sigue la política del centro. Un número o nombre de pila puede ser suficiente.' },
    { q: '¿Debo permitir repetición en la selección?', a: 'Depende del objetivo. Para repartir oportunidades suele convenir sin repetición hasta completar una ronda.' },
    { q: '¿Una ruleta es adecuada para calificar?', a: 'No para decidir una nota. Puede seleccionar una actividad o turno dentro de reglas pedagógicas claras.' },
    { q: '¿El temporizador funciona si cambio de pestaña?', a: 'El navegador puede limitar sonido o segundo plano. Pruébalo y prepara una señal alternativa.' },
    { q: '¿Qué hago si el resultado crea un problema conocido?', a: 'Revísalo y ajusta antes de mostrar. El azar es un punto de partida, no una orden.' },
    { q: '¿Debo guardar las listas?', a: 'Solo si existe una necesidad y política para ello. En actividades puntuales, elimina las listas temporales del equipo.' },
  ],
  review: {
    heading: 'Revisión docente del flujo aleatorio',
    intro: 'La transparencia del sorteo debe acompañarse de privacidad, accesibilidad y criterio pedagógico.',
    checks: [
      { title: 'Lista adecuada', text: 'Solo incluye participantes y la identificación mínima necesaria.' },
      { title: 'Regla explicada', text: 'Grupo, sobrante, repetición, tiempo y alternativa se conocen antes de ejecutar.' },
      { title: 'Salida supervisada', text: 'El docente revisa y ajusta antes de proyectar o registrar.' },
    ],
  },
  sources: educationWorkflowSources,
};
