export interface SpanishInfoSection {
  heading: string;
  paragraphs: string[];
  items?: string[];
  link?: {
    prefix: string;
    label: string;
    href: string;
    suffix: string;
  };
  links?: {
    label: string;
    href: string;
    description: string;
  }[];
}

export interface SpanishInfoPage {
  title: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  eyebrow: string;
  intro: string;
  directAnswer: string[];
  sections: SpanishInfoSection[];
  faq: { q: string; a: string }[];
  review: {
    heading: string;
    intro: string;
    checks: { title: string; text: string }[];
  };
  sources?: { label: string; href: string; note: string }[];
}

export const spanishPrivacy: SpanishInfoPage = {
  title: 'Política de privacidad',
  seoTitle: 'Política de privacidad y datos | FunnyTools',
  seoDescription: 'Consulta qué datos trata FunnyTools, qué permanece en el navegador, cómo funcionan Analytics, AdSense, el correo y las opciones de control.',
  keywords: [
    'política de privacidad FunnyTools',
    'herramientas online privacidad',
    'procesamiento local navegador',
    'cookies Google AdSense',
    'datos Google Analytics',
  ],
  eyebrow: 'Información clara sobre datos y control',
  intro: 'Esta política explica, en español directo, qué ocurre con los datos cuando visitas FunnyTools o utilizas una herramienta. Distingue el contenido que introduces, la información técnica de navegación, el almacenamiento local, el correo voluntario y los servicios externos.',
  directAnswer: [
    'Las herramientas publicadas actualmente en español procesan las notas, los pesos y los archivos PDF dentro de la pestaña del navegador. FunnyTools no recibe una copia de ese contenido, no crea un expediente asociado a tu identidad y no exige una cuenta para utilizar las funciones.',
    'Visitar el sitio no equivale a ser invisible en Internet. El navegador solicita la página y puede conectar con servicios de medición, seguridad o publicidad. Esas conexiones pueden incluir la URL visitada, la dirección IP, información del dispositivo, identificadores o cookies, según la configuración, la región y las decisiones de consentimiento. Esta política separa esas señales técnicas del contenido que escribes o abres en una herramienta.',
  ],
  sections: [
    {
      heading: 'Ámbito, responsable de contacto y fecha de revisión',
      paragraphs: [
        'Esta política se aplica a funnytools.win y a las páginas de FunnyTools que enlazan a ella. La versión española fue revisada el 27 de julio de 2026. Para preguntas sobre privacidad, correcciones o solicitudes relacionadas con datos enviados voluntariamente, puedes escribir a btcson66@gmail.com e indicar la dirección de la página afectada.',
        'FunnyTools es un sitio estático de herramientas gratuitas. No ofrece cuentas de usuario ni un panel con perfiles personales. Cuando una función futura necesite un servidor, una API o un proveedor distinto, la página correspondiente deberá indicarlo antes de pedir datos y esta política se actualizará si el cambio es material.',
      ],
    },
    {
      heading: 'Datos que introduces en las herramientas del navegador',
      paragraphs: [
        'En las herramientas locales, el texto, las cifras, las listas, las imágenes o los PDF se leen mediante código que se ejecuta en tu dispositivo. El resultado se calcula, transforma o descarga desde la pestaña. FunnyTools no incorpora el contenido de esos campos o archivos a Google Analytics, AdSense ni a un registro propio.',
        'El tratamiento local reduce la necesidad de transferir el contenido, pero no convierte el dispositivo en un entorno libre de riesgos. Las extensiones del navegador, el sistema operativo, una red administrada o un equipo compartido pueden tener sus propias políticas. Evita introducir contraseñas, claves privadas, datos bancarios completos, historiales médicos, expedientes personales o la única copia de un documento importante.',
      ],
      items: [
        'La calculadora de promedio utiliza las notas y pesos solo para producir el resultado visible.',
        'La herramienta para unir PDF abre los documentos en memoria y genera una descarga nueva.',
        'El compresor de imágenes vuelve a codificar los píxeles y el generador QR dibuja el texto o la URL dentro de un lienzo local.',
        'La herramienta para dividir PDF copia las páginas indicadas en archivos temporales dentro del navegador.',
        'Recargar o cerrar la pestaña elimina la lista de trabajo y los resultados temporales de estas herramientas.',
        'Los archivos originales permanecen en tu dispositivo y debes conservarlos hasta verificar la salida.',
      ],
    },
    {
      heading: 'Información técnica de navegación y analítica',
      paragraphs: [
        'El servidor, la red de distribución y los servicios de seguridad pueden tratar información necesaria para entregar la página y protegerla, como dirección IP, fecha y hora, URL solicitada, agente de usuario, país aproximado, respuesta HTTP y señales de tráfico abusivo. Cloudflare presta servicios de red y medición de rendimiento; FunnyTools también utiliza Google Analytics para conocer visitas, páginas, dispositivos y eventos de uso.',
        'Los eventos de herramienta están diseñados para medir acciones como iniciar o completar una función, no para enviar el contenido escrito, las notas concretas ni los documentos. En un directorio de herramientas, una búsqueda puede filtrarse dentro del navegador sin transmitir la frase introducida. Los datos agregados ayudan a detectar páginas rotas y decidir qué funciones necesitan mantenimiento.',
      ],
    },
    {
      heading: 'Cookies, publicidad y consentimiento',
      paragraphs: [
        'FunnyTools carga infraestructura de Google AdSense en páginas indexables mientras el sitio está en revisión o utiliza servicios publicitarios. Google y sus socios pueden emplear cookies, almacenamiento local, dirección IP, información del dispositivo y otras señales para seguridad, prevención de fraude, medición y, cuando corresponda, personalización o selección de anuncios.',
        'La disponibilidad de anuncios personalizados o no personalizados depende de la región, la configuración de Google y las decisiones de consentimiento aplicables. Cuando la ley exige consentimiento previo, deben presentarse las opciones correspondientes antes de activar las finalidades que lo necesiten. Google puede mostrar un enlace de «Configuración de privacidad y cookies» para revisar o retirar decisiones en las regiones donde su plataforma de gestión de consentimiento está habilitada.',
        'FunnyTools no entrega a Google el contenido de una nota, lista, imagen o PDF utilizado dentro de una herramienta local. La política de Google explica por separado qué información recibe el navegador al cargar Analytics, AdSense u otros servicios de sus socios.',
      ],
    },
    {
      heading: 'Almacenamiento local, tema, PWA y preferencias',
      paragraphs: [
        'El sitio puede utilizar localStorage para recordar decisiones que pertenecen al dispositivo, como el tema claro u oscuro, el número de visitas utilizado para mostrar de forma prudente la opción de instalación, el rechazo de ese aviso o preferencias específicas de algunas herramientas. Esos valores no son una cuenta y pueden borrarse desde la configuración de datos del navegador.',
        'La aplicación web instalable utiliza un service worker para guardar recursos estáticos y ofrecer una experiencia más rápida o una página sin conexión. Las solicitudes de publicidad y analítica se excluyen expresamente de esa caché. Borrar los datos del sitio o desinstalar la aplicación elimina la copia local según el comportamiento del navegador.',
      ],
    },
    {
      heading: 'Correo voluntario, boletín y entrega de archivos',
      paragraphs: [
        'Si eliges suscribirte al boletín o utilizar una función de entrega por correo, se solicita la dirección de email y el nombre de la herramienta. La solicitud se envía al servicio compartido de FunnyTools mediante roomfeng.win y se gestiona con Brevo para entregar el mensaje, anunciar herramientas o comunicar novedades según la opción elegida.',
        'Un archivo que decidas enviar a tu bandeja se utiliza para esa entrega y no se conserva como biblioteca de FunnyTools. El correo no se vende a anunciantes. Cada comunicación de boletín debe incluir una opción para cancelar la suscripción; también puedes pedir la eliminación de la dirección escribiendo al correo de contacto. No envíes por email documentos confidenciales para solicitar soporte técnico.',
      ],
    },
    {
      heading: 'Servicios externos, enlaces y transferencias',
      paragraphs: [
        'FunnyTools puede enlazar a documentación, organismos, tiendas o recursos externos. Al abrir otro dominio se aplica la política de ese proveedor. Los servicios de Google, Cloudflare, Brevo y la infraestructura de alojamiento pueden tratar datos desde distintos países conforme a sus propias condiciones y mecanismos aplicables.',
        'Los enlaces se ofrecen para comprobar fuentes o continuar una tarea, pero FunnyTools no controla la recopilación de datos de una página externa. Revisa su dirección, política y opciones antes de enviar formularios o archivos. Un enlace no significa que FunnyTools certifique todas las prácticas del tercero.',
      ],
    },
    {
      heading: 'Tus opciones, solicitudes y seguridad',
      paragraphs: [
        'Puedes bloquear o borrar cookies, eliminar datos locales, utilizar los controles de anuncios de Google, instalar el complemento de inhabilitación de Google Analytics o dejar de utilizar una función que requiera correo. Algunas medidas pueden afectar a preferencias, medición o publicidad, pero las herramientas principales no requieren iniciar sesión.',
        'Si una norma aplicable te reconoce derechos de acceso, rectificación, supresión, oposición, limitación o retirada del consentimiento, escribe a btcson66@gmail.com describiendo la solicitud y el canal utilizado. Como el sitio no asocia por defecto los datos de herramienta a una identidad, puede que no exista un registro personal que FunnyTools pueda localizar. No envíes una copia completa de tu documento de identidad salvo que sea estrictamente necesaria y se acuerde un método seguro.',
        'El sitio no está dirigido específicamente a menores de 16 años y no pretende recopilar conscientemente sus datos personales. En actividades escolares, un adulto o la institución debe decidir qué información puede utilizarse y sustituir los datos reales por ejemplos cuando sea posible.',
      ],
    },
  ],
  faq: [
    {
      q: '¿FunnyTools guarda lo que escribo en una herramienta?',
      a: 'Las herramientas locales no envían a FunnyTools el contenido introducido. Algunas preferencias pueden quedar en el almacenamiento del navegador, pero no forman una cuenta.',
    },
    {
      q: '¿Mis PDF se suben al servidor?',
      a: 'En la herramienta española para unir PDF, los archivos se leen y combinan en el navegador. FunnyTools no recibe una copia, aunque debes considerar la seguridad del dispositivo y sus extensiones.',
    },
    {
      q: '¿Por qué hay conexiones con Google?',
      a: 'El sitio utiliza Google Analytics y carga infraestructura de AdSense. El navegador puede compartir señales técnicas con Google para medición, seguridad y publicidad según la configuración y el consentimiento.',
    },
    {
      q: '¿Puedo borrar las preferencias guardadas?',
      a: 'Sí. Borra los datos de funnytools.win desde la configuración del navegador. Esto puede eliminar el tema, preferencias, caché de la PWA y avisos recordados.',
    },
    {
      q: '¿FunnyTools vende mi correo o los datos de las herramientas?',
      a: 'No. El correo voluntario se utiliza para la entrega o suscripción solicitada y no se vende a anunciantes. El contenido de herramientas locales no se entrega a FunnyTools.',
    },
    {
      q: '¿Cómo hago una consulta de privacidad?',
      a: 'Escribe a btcson66@gmail.com con la URL y una explicación breve. No incluyas contraseñas, archivos confidenciales ni más datos personales de los necesarios.',
    },
  ],
  review: {
    heading: 'Cómo comprobar esta política frente al uso real',
    intro: 'Una política útil debe corresponderse con lo que hace la página. Estas comprobaciones permiten detectar una diferencia sin confiar solo en una promesa.',
    checks: [
      {
        title: 'Distingue entrada y navegación',
        text: 'El contenido de una herramienta local permanece en la pestaña; las solicitudes de página, analítica, seguridad o publicidad sí pueden comunicar señales técnicas a terceros.',
      },
      {
        title: 'Revisa permisos y almacenamiento',
        text: 'Consulta los datos guardados para funnytools.win en el navegador y los dominios solicitados. Borra los datos del sitio si quieres restablecer preferencias y caché.',
      },
      {
        title: 'Informa de una discrepancia',
        text: 'Si una herramienta envía un contenido que la página describe como local, anota la URL, versión del navegador y pasos con datos ficticios para que pueda reproducirse.',
      },
    ],
  },
  sources: [
    {
      label: 'Cómo utiliza Google la información de sitios y aplicaciones asociados',
      href: 'https://policies.google.com/technologies/partner-sites?hl=es',
      note: 'Explica las señales que el navegador puede compartir con Google y los controles disponibles.',
    },
    {
      label: 'Cómo utiliza AdSense las cookies',
      href: 'https://support.google.com/adsense/answer/7549925?hl=es',
      note: 'Describe cookies publicitarias, medición y deber de información de los editores.',
    },
    {
      label: 'Agencia Española de Protección de Datos',
      href: 'https://www.aepd.es/politica-de-privacidad-y-aviso-legal',
      note: 'Referencia institucional sobre información de privacidad, navegación y enlaces externos.',
    },
  ],
};

export const spanishAboutTools: SpanishInfoPage = {
  title: 'Cómo funcionan nuestras herramientas',
  seoTitle: 'Cómo funcionan las herramientas | FunnyTools',
  seoDescription: 'Descubre cómo procesa FunnyTools textos, cálculos, imágenes y PDF en el navegador, cómo revisamos resultados y qué límites debes comprobar.',
  keywords: [
    'cómo funcionan herramientas online',
    'herramientas en el navegador',
    'procesamiento local de archivos',
    'herramientas online sin subir archivos',
    'cómo verifica FunnyTools resultados',
  ],
  eyebrow: 'Método, límites y revisión editorial',
  intro: 'Una herramienta online no debería ser una caja negra. Aquí explicamos qué ocurre entre la entrada y el resultado, cuándo el trabajo permanece en el dispositivo, cómo comprobamos una fórmula o un archivo y qué debes verificar antes de utilizar la salida.',
  directAnswer: [
    'La mayoría de las herramientas de FunnyTools son páginas estáticas con código que se ejecuta en el navegador. Los botones, fórmulas, lectores de archivos y descargas funcionan dentro de la pestaña. Una herramienta local no necesita enviar a FunnyTools el texto, las cifras o el documento para producir el resultado.',
    'Eso no significa que cada respuesta sea oficial ni que todos los navegadores tengan la misma capacidad. Un cálculo depende de los datos y la regla elegida; un PDF depende de memoria, formato, cifrado y funciones internas; una imagen depende de resolución, compresión y compatibilidad. Por eso cada página debe explicar una prueba reproducible, los límites conocidos y el momento en que conviene consultar una fuente oficial.',
  ],
  sections: [
    {
      heading: 'Qué significa que una herramienta funcione en el navegador',
      paragraphs: [
        'Al abrir una página, el navegador descarga HTML, estilos, JavaScript y, cuando hace falta, bibliotecas de procesamiento. A partir de ahí, una función local puede leer los campos o archivos seleccionados, realizar la operación en memoria y mostrar o descargar la salida. La entrada no se convierte automáticamente en una solicitud a un servidor.',
        'La página sigue necesitando Internet para cargarse la primera vez y puede solicitar recursos de analítica, seguridad o publicidad. «Procesamiento local» describe el recorrido del contenido de la herramienta, no la ausencia absoluta de conexiones de red. La política de privacidad separa ambas cosas y detalla los proveedores activos.',
      ],
    },
    {
      heading: 'Cálculos: fórmula, datos de entrada y redondeo',
      paragraphs: [
        'Una calculadora produce una operación, no conoce por sí sola la norma de cada país, escuela, empresa o contrato. FunnyTools muestra la fórmula o el criterio cuando el resultado puede confundirse con una cifra oficial. También incluye ejemplos pequeños que pueden repetirse a mano para detectar un error de signo, escala, peso o unidad.',
        'El redondeo visible facilita la lectura, pero no sustituye la regla del sistema de destino. Una media académica puede exigir créditos, mínimos o recuperaciones; un cálculo financiero puede depender de impuestos, comisiones o tasas vigentes. Antes de utilizar una cifra formal, conserva los datos originales y compara el método con la documentación correspondiente.',
      ],
    },
    {
      heading: 'Archivos e imágenes: memoria, copias y metadatos',
      paragraphs: [
        'Las herramientas locales para PDF e imágenes utilizan la memoria disponible en el dispositivo. Un archivo de texto de muchas páginas puede ser ligero, mientras que un escaneo corto con imágenes grandes puede agotar la memoria. Si el navegador se ralentiza, reduce el lote, cierra otras pestañas y trabaja desde un ordenador.',
        'Una transformación puede crear un archivo técnicamente nuevo. Firmas digitales, formularios, capas, adjuntos, perfiles de color, animaciones o metadatos no siempre sobreviven. Conserva los originales, abre la descarga en otro lector y comprueba páginas, orientación, legibilidad, tamaño y requisitos del portal antes de sustituir una copia de trabajo.',
      ],
    },
    {
      heading: 'Datos locales, preferencias y funcionamiento sin conexión',
      paragraphs: [
        'Algunas herramientas guardan preferencias pequeñas mediante localStorage, como duración de temporizadores o tema visual. La PWA puede almacenar recursos estáticos para acelerar visitas posteriores. Esos datos viven en el navegador y pueden eliminarse desde la configuración del sitio.',
        'Las peticiones de analítica y publicidad no deben quedar atrapadas en la caché de la aplicación. El service worker de FunnyTools las excluye y utiliza una estrategia de red para las páginas. Una versión sin conexión puede servir para tareas básicas, pero cualquier resultado importante debe repetirse cuando el navegador y los recursos estén actualizados.',
      ],
    },
    {
      heading: 'Cómo diseñamos una página útil para búsquedas y respuestas',
      paragraphs: [
        'El contenido comienza con la pregunta que la persona intenta resolver. Después se ofrece una respuesta breve, la herramienta, el procedimiento, casos reales, límites, preguntas frecuentes y una forma de comprobar la salida. Esta estructura ayuda tanto a quien necesita una operación rápida como a quien debe justificar el resultado.',
        'Las versiones en otros idiomas no se publican mediante una sustitución automática de palabras. Se investiga cómo se formula la consulta, qué términos cambian entre regiones y qué supuestos no pueden trasladarse. Una página española puede mencionar «nota media» y «promedio de calificaciones» sin afirmar que España y América Latina comparten la misma escala o normativa.',
      ],
    },
    {
      heading: 'Pruebas antes de publicar o actualizar una herramienta',
      paragraphs: [
        'Cada publicación debe superar la construcción estática, enlaces, títulos, descripciones, canonical, hreflang, sitemap, datos estructurados, seguridad, PWA, analítica y el control de contenido mínimo. Para herramientas interactivas se prueban entradas conocidas, errores, descarga, reinicio y funcionamiento en móvil.',
        'Un test automático demuestra que una condición programada se cumple; no demuestra por sí solo que la explicación sea natural o que una fórmula represente todas las reglas. Por eso se combina con revisión editorial, comparación manual de casos y comprobación del resultado en el navegador.',
      ],
      items: [
        'Un solo H1 y secciones descriptivas que respondan preguntas distintas.',
        'Ejemplos con resultado conocido y casos que deben producir un aviso.',
        'Ningún enlace de idioma hacia una versión incompleta.',
        'Diseño usable a 375 píxeles sin desplazamiento horizontal.',
        'Revisión final en la URL pública después del despliegue.',
      ],
    },
    {
      heading: 'Analítica sin enviar el contenido de la herramienta',
      paragraphs: [
        'FunnyTools mide páginas y acciones para saber si una función se abre, termina o falla. Los eventos se limitan a nombres de herramienta, acción, idioma y datos operativos permitidos. No deben contener contraseñas, textos pegados, nombres de estudiantes, notas individuales, imágenes ni contenido de PDF.',
        'Un buscador interno puede filtrar tarjetas dentro del navegador sin transmitir la frase escrita. Cuando hace falta medir el uso de la búsqueda, es preferible registrar que se utilizó y cuántos resultados quedaron, no la consulta potencialmente sensible. Cualquier cambio de telemetría debe pasar el control de nombres prohibidos.',
      ],
    },
    {
      heading: 'Cómo informar de un error o proponer una herramienta',
      paragraphs: [
        'Para un error, envía la URL, pasos exactos, navegador, dispositivo, resultado esperado y resultado observado. Utiliza un ejemplo ficticio y pequeño. Si el problema depende de una norma, añade la fuente oficial y la fecha. No envíes documentos privados ni datos de otra persona.',
        'Para proponer una herramienta, describe el problema, los datos de entrada, la salida y una prueba que permita verificarla. Las solicitudes se priorizan por utilidad, posibilidad de procesamiento local y capacidad de explicar límites. No se publica una función solo porque exista una palabra clave con volumen.',
      ],
    },
  ],
  faq: [
    {
      q: '¿Todas las herramientas funcionan sin servidor?',
      a: 'La mayoría funciona localmente. Si una futura función necesita servidor o API, su página debe indicarlo antes de pedir datos.',
    },
    {
      q: '¿Procesamiento local significa que la página no se conecta a Internet?',
      a: 'No. La página puede cargar recursos, analítica, seguridad o publicidad. Significa que el contenido de la herramienta se procesa en el dispositivo cuando la página lo declara.',
    },
    {
      q: '¿Cómo sé si un cálculo es correcto?',
      a: 'Repite un ejemplo pequeño a mano, revisa unidades y supuestos, y compara la fórmula con la fuente oficial si la cifra afecta a una decisión formal.',
    },
    {
      q: '¿Por qué un PDF puede perder una firma o un formulario?',
      a: 'Combinar o transformar crea un documento nuevo. Algunas funciones internas no se copian igual y una firma digital puede dejar de validar.',
    },
    {
      q: '¿Los textos de otros idiomas son traducciones automáticas?',
      a: 'No deberían serlo. Cada versión pública se redacta según la intención de búsqueda, vocabulario y límites propios del idioma y mercado.',
    },
    {
      q: '¿Dónde puedo comunicar un fallo?',
      a: 'Escribe a btcson66@gmail.com con la URL y un caso ficticio reproducible. No adjuntes datos confidenciales.',
    },
  ],
  review: {
    heading: 'Tres preguntas antes de confiar en una herramienta',
    intro: 'No necesitas inspeccionar el código para hacer una comprobación básica. Un buen resultado debe poder explicarse y repetirse.',
    checks: [
      {
        title: '¿Puedo predecir una prueba?',
        text: 'Utiliza números o archivos pequeños cuyo resultado ya conozcas. Si no coincide, detén el trabajo antes de utilizar datos reales.',
      },
      {
        title: '¿Entiendo qué no cubre?',
        text: 'Busca límites de escala, memoria, formato, normativa, redondeo o fecha. La ausencia de un aviso no convierte el resultado en oficial.',
      },
      {
        title: '¿He comprobado la salida?',
        text: 'Copia, abre, imprime o carga el resultado en el destino previsto y conserva las fuentes hasta confirmar que el proceso terminó bien.',
      },
    ],
  },
};
