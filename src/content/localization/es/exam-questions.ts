import type { ExamQuestionTranslation } from "../types";

export const spanishExamQuestions: Record<string, ExamQuestionTranslation> = {
  "exam-q-01": {
    domainTitle: "Administrar un entorno de operaciones de seguridad",
    prompt: "Un incidente de Sentinel debe asignarse a la cola de Nivel 2 cuando su gravedad cambie a Alta. No es necesario llamar a ningún sistema externo. ¿Qué deberías configurar primero?",
    options: {
      a: { text: "Una regla de análisis programada" }, b: { text: "Una regla de automatización que cambie el propietario" },
      c: { text: "Un cuaderno de estrategias ejecutado manualmente" }, d: { text: "Una detección personalizada de Microsoft Defender XDR" },
    },
    explanation: "Las reglas de automatización reaccionan ante la creación o actualización de incidentes y pueden modificar propietario, estado, gravedad o etiquetas sin invocar un cuaderno de estrategias. Este último corresponde cuando se necesita un flujo de Logic Apps o una acción externa.",
    references: { "path-7/p7-module-2": { reason: "Revisá desencadenadores, condiciones, orden y acciones de las reglas de automatización." } },
  },
  "exam-q-02": {
    domainTitle: "Administrar un entorno de operaciones de seguridad",
    prompt: "Necesitás recopilar únicamente los eventos de seguridad de Windows 4624 y 4625 de un grupo definido de servidores mediante Azure Monitor Agent. ¿Qué configuración proporciona el filtrado y el ámbito necesarios?",
    options: {
      a: { text: "Una regla de recopilación de datos asociada con los equipos de destino" }, b: { text: "Una lista de reproducción de Sentinel con ambos identificadores" },
      c: { text: "Un libro filtrado por EventID" }, d: { text: "Una regla de automatización de incidentes" },
    },
    explanation: "El conector Eventos de seguridad de Windows mediante AMA usa reglas de recopilación de datos para definir el filtrado y las asociaciones de equipos. Las listas de reproducción y los libros no controlan la ingesta.",
    references: { "path-6/p6-module-4": { reason: "Revisá Eventos de seguridad de Windows mediante AMA y las reglas de recopilación de datos." } },
  },
  "exam-q-03": {
    domainTitle: "Administrar un entorno de operaciones de seguridad",
    prompt: "Una detección debe evaluar eventos casi inmediatamente y la consulta KQL puede ejecutarse dentro de las limitaciones de las reglas casi en tiempo real. ¿Qué tipo de regla de análisis de Sentinel es el más adecuado?",
    options: { a: { text: "Programada" }, b: { text: "NRT" }, c: { text: "Fusion" }, d: { text: "Seguridad de Microsoft" } },
    explanation: "Las reglas NRT se ejecutan una vez por minuto y están diseñadas para detecciones de baja latencia. Las reglas programadas ofrecen más flexibilidad, pero introducen un intervalo de evaluación mayor.",
    references: { "path-7/p7-module-1": { reason: "Compará las reglas programadas, NRT y los demás tipos de reglas de análisis de Sentinel." } },
  },
  "exam-q-04": {
    domainTitle: "Administrar un entorno de operaciones de seguridad",
    prompt: "Una tabla de gran volumen se necesita para investigaciones históricas, pero ninguna regla en tiempo real ni consulta interactiva depende de ella. ¿Qué cambio reduce el costo de forma más directa y conserva el acceso a largo plazo?",
    options: {
      a: { text: "Mantener la tabla en Analytics y crear un libro" }, b: { text: "Mover los datos aptos al nivel Data Lake y usar análisis asincrónico" },
      c: { text: "Exportar cada incidente a una lista de reproducción" }, d: { text: "Deshabilitar la retención total" },
    },
    explanation: "Data Lake está diseñado para retención histórica de menor costo y análisis asincrónico. Antes de mover una tabla, verificá que ninguna detección, libro o investigación interactiva dependa del acceso del nivel Analytics.",
    references: { "path-5/p5-module-2": { reason: "Revisá la arquitectura del área de trabajo y las consideraciones de retención." } },
  },
  "exam-q-05": {
    domainTitle: "Responder a incidentes de seguridad",
    prompt: "Un dispositivo se comunica activamente con un host de comando y control confirmado. Debés detener la mayor parte de la comunicación y conservar la conectividad del servicio Defender para continuar la investigación. ¿Qué deberías hacer?",
    options: {
      a: { text: "Aislar el dispositivo en Microsoft Defender for Endpoint" }, b: { text: "Eliminar el dispositivo del inventario" },
      c: { text: "Suprimir el incidente" }, d: { text: "Crear un indicador de amenazas sin ninguna acción" },
    },
    explanation: "El aislamiento restringe la comunicación de red y mantiene los canales necesarios para la supervisión y respuesta de Defender for Endpoint. Después pueden continuar la recopilación de evidencia y otras acciones de forma controlada.",
    references: { "path-2/p2-module-5": { reason: "Revisá aislamiento de dispositivos, respuesta en vivo y recopilación de paquetes de investigación." } },
  },
  "exam-q-06": {
    domainTitle: "Responder a incidentes de seguridad",
    prompt: "Una identidad tiene una credencial filtrada confirmada y una sesión sospechosa activa. ¿Qué secuencia aborda mejor el acceso inmediato y el riesgo de la credencial?",
    options: {
      a: { text: "Descartar el riesgo y esperar el próximo inicio de sesión" }, b: { text: "Revocar sesiones, restablecer la credencial e investigar la actividad relacionada" },
      c: { text: "Agregar el usuario únicamente a una lista de reproducción" }, d: { text: "Cerrar el incidente como informativo" },
    },
    explanation: "Revocar sesiones interrumpe el acceso actual y un restablecimiento seguro corrige el secreto comprometido. Todavía se deben investigar inicios de sesión, dispositivos, aplicaciones y alertas para determinar alcance y persistencia.",
    references: { "path-1/module-4": { reason: "Revisá la investigación y corrección de usuarios e inicios de sesión de riesgo." } },
  },
  "exam-q-07": {
    domainTitle: "Responder a incidentes de seguridad",
    prompt: "Un investigador necesita determinar quién cambió una directiva de retención y cuándo ocurrió. ¿Qué capacidad de Microsoft Purview debería consultar primero?",
    options: { a: { text: "Auditoría" }, b: { text: "Búsqueda de contenido" }, c: { text: "Modo de simulación de Prevención de pérdida de datos" }, d: { text: "Cumplimiento de comunicaciones" } },
    explanation: "Auditoría de Microsoft Purview registra actividades de usuarios y administradores y permite establecer quién realizó un cambio de configuración y cuándo. Búsqueda de contenido localiza contenido, no actividad administrativa.",
    references: { "path-9/p9-module-3": { reason: "Revisá la búsqueda de auditoría, los registros de actividad, el ámbito y los flujos de investigación." } },
  },
  "exam-q-08": {
    domainTitle: "Responder a incidentes de seguridad",
    prompt: "Varios incidentes de Defender XDR parecen pertenecer a la misma campaña y requieren trabajo de dos equipos durante una semana. ¿Qué debería coordinar el flujo general y preservar cada registro de incidente?",
    options: { a: { text: "Un caso de operaciones de seguridad" }, b: { text: "Una única alerta combinada" }, c: { text: "Una regla de recopilación de datos" }, d: { text: "Un libro archivado" } },
    explanation: "Un caso de operaciones de seguridad coordina trabajo entre incidentes, hallazgos, indicadores, tareas, propietarios y equipos, mientras cada incidente vinculado conserva su evidencia, clasificación y ciclo de vida.",
    references: { "path-1/module-2": { reason: "Revisá la investigación y respuesta coordinadas en Microsoft Defender XDR." } },
  },
  "exam-q-09": {
    domainTitle: "Realizar búsqueda de amenazas",
    prompt: "Necesitás un recuento por hora de inicios de sesión fallidos por usuario desde SigninLogs. ¿Qué patrón KQL produce la agregación requerida?",
    options: {
      a: { text: "project UserPrincipalName, ResultType" }, b: { text: "summarize Failures=count() by UserPrincipalName, bin(TimeGenerated, 1h)" },
      c: { text: "distinct TimeGenerated" }, d: { text: "sort by UserPrincipalName asc" },
    },
    explanation: "summarize realiza la agregación, count() calcula los eventos y bin(TimeGenerated, 1h) los agrupa en intervalos de una hora para cada usuario.",
    references: { "path-4/p4-module-2": { reason: "Revisá summarize, las funciones de agregación y los intervalos temporales en KQL." } },
  },
  "exam-q-10": {
    domainTitle: "Realizar búsqueda de amenazas",
    prompt: "Una búsqueda debe devolver dispositivos que contactaron una IP sospechosa pero no tienen una alerta coincidente en la ventana elegida. ¿Qué tipo de join es más útil para excluir dispositivos con coincidencias en las alertas?",
    options: { a: { text: "inner" }, b: { text: "leftanti" }, c: { text: "fullouter" }, d: { text: "rightsemi" } },
    explanation: "Un join leftanti devuelve filas del lado izquierdo sin coincidencia en el derecho. Colocá la evidencia de red a la izquierda y las entidades de alerta coincidentes a la derecha.",
    references: { "path-4/p4-module-3": { reason: "Revisá KQL con varias tablas y los tipos de join." } },
  },
  "exam-q-11": {
    domainTitle: "Realizar búsqueda de amenazas",
    prompt: "Una consulta de búsqueda identificó repetidamente comportamiento malicioso confirmado y ahora debe generar incidentes automáticamente. ¿Cuál es el próximo paso más apropiado?",
    options: {
      a: { text: "Convertir la lógica validada en una regla de análisis o detección personalizada" }, b: { text: "Continuar ejecutando la consulta manualmente para siempre" },
      c: { text: "Mover los resultados a una lista estática y deshabilitar la recopilación" }, d: { text: "Exportar la consulta a un libro sin una detección" },
    },
    explanation: "La búsqueda parte de hipótesis y no crea alertas por sí sola. Cuando la lógica está validada y ajustada, se operacionaliza mediante una regla con programación, mapeo de entidades, gravedad y comportamiento de incidentes.",
    references: { "path-8/p8-module-2": { reason: "Revisá el ciclo de búsqueda de amenazas y cómo operacionalizar hallazgos validados." } },
  },
  "exam-q-12": {
    domainTitle: "Realizar búsqueda de amenazas",
    prompt: "Una búsqueda requiere transformaciones Python repetibles, enriquecimiento externo, visualización de árbol de procesos y un registro duradero que combine código y razonamiento. ¿Qué herramienta es la más adecuada?",
    options: { a: { text: "Un cuaderno Jupyter con MSTICPy" }, b: { text: "Una plantilla de título de incidente" }, c: { text: "Una alerta de estado del conector" }, d: { text: "Una descripción estática de regla de análisis" } },
    explanation: "Los cuadernos Jupyter proporcionan un entorno reproducible para adquisición, transformación, enriquecimiento, visualización, estadística y narrativa. MSTICPy agrega proveedores y herramientas centrados en seguridad.",
    references: { "path-8/p8-module-4": { reason: "Revisá la búsqueda mediante cuadernos y las capacidades de MSTICPy." } },
  },
  "exam-q-13": {
    domainTitle: "Administrar un entorno de operaciones de seguridad", prompt: "Un grupo de dispositivos de MDE debe recibir otro nivel de automatización y ser visible únicamente para un equipo regional. ¿Qué debería definir la pertenencia y el acceso?",
    options: { a: { text: "Reglas del grupo de dispositivos y asignaciones RBAC" }, b: { text: "Un libro de Sentinel" }, c: { text: "Una regla de notificación por correo" }, d: { text: "Un indicador de amenazas" } },
    explanation: "Los grupos usan reglas de pertenencia y precedencia ordenada, mientras RBAC limita el acceso del analista. Luego el grupo puede recibir su propio nivel de automatización.", references: { "path-2/p2-module-7": { reason: "Revisá grupos de dispositivos, RBAC, precedencia y niveles de automatización." } },
  },
  "exam-q-14": {
    domainTitle: "Administrar un entorno de operaciones de seguridad", prompt: "Un analista debe investigar y actualizar incidentes de Sentinel, pero no modificar la configuración del área de trabajo. ¿Qué rol integrado es el mejor punto de partida?",
    options: { a: { text: "Microsoft Sentinel Reader" }, b: { text: "Microsoft Sentinel Responder" }, c: { text: "Microsoft Sentinel Contributor" }, d: { text: "Owner" } },
    explanation: "Sentinel Responder permite administrar incidentes más allá de Reader sin otorgar los permisos generales de configuración de Contributor u Owner.", references: { "path-5/p5-module-2": { reason: "Revisá roles de Sentinel y acceso de mínimo privilegio." } },
  },
  "exam-q-15": {
    domainTitle: "Administrar un entorno de operaciones de seguridad", prompt: "Un responsable del SOC quiere un panel interactivo que combine visualizaciones KQL, parámetros y vínculos a recursos de investigación. ¿Qué debería crear?",
    options: { a: { text: "Un libro" }, b: { text: "Un conector de datos" }, c: { text: "Un grupo de dispositivos" }, d: { text: "Una regla de automatización" } },
    explanation: "Los libros de Microsoft Sentinel ofrecen informes interactivos con consultas, visualizaciones, parámetros y vínculos. Visualizan datos, pero no los ingieren ni detectan.", references: { "path-7/p7-module-7": { reason: "Revisá consultas, visualización, supervisión y uso de libros." } },
  },
  "exam-q-16": {
    domainTitle: "Administrar un entorno de operaciones de seguridad", prompt: "Un dispositivo de red emite mensajes CEF compatibles con RFC. ¿Qué método de ingesta de Sentinel es el más directo?",
    options: { a: { text: "Conector CEF mediante AMA a través de un reenviador Linux" }, b: { text: "Eventos de seguridad de Windows mediante AMA" }, c: { text: "Registros de actividad de Microsoft Graph" }, d: { text: "Conector de Defender for Cloud Apps" } },
    explanation: "Los dispositivos CEF suelen enviar mensajes a un reenviador Linux, donde AMA los recopila y normaliza en CommonSecurityLog.", references: { "path-6/p6-module-5": { reason: "Revisá ingesta CEF, reenviadores, AMA y CommonSecurityLog." } },
  },
  "exam-q-17": {
    domainTitle: "Administrar un entorno de operaciones de seguridad", prompt: "Los hosts Windows locales no pueden conectarse individualmente a Azure, pero sus eventos seleccionados deben llegar a Sentinel. ¿Qué diseño deberías usar?",
    options: { a: { text: "Windows Event Forwarding hacia un recopilador con AMA" }, b: { text: "Una búsqueda de Auditoría de Purview" }, c: { text: "Una cola de incidentes de Defender XDR" }, d: { text: "Una lista de reproducción" } },
    explanation: "WEF concentra eventos en un Windows Event Collector. AMA en ese recopilador puede enviarlos al área configurada.", references: { "path-6/p6-module-4": { reason: "Revisá arquitecturas de Windows Event Forwarding y recopilación con AMA." } },
  },
  "exam-q-18": {
    domainTitle: "Administrar un entorno de operaciones de seguridad", prompt: "Debés recopilar en Sentinel operaciones de creación, actualización y eliminación a nivel de suscripción de Azure. ¿Qué origen deberías conectar?",
    options: { a: { text: "Azure Activity" }, b: { text: "DeviceProcessEvents" }, c: { text: "EmailEvents" }, d: { text: "CommonSecurityLog" } },
    explanation: "Azure Activity registra operaciones del plano de control a nivel de suscripción. El conector puede implementarse consistentemente con Azure Policy y configuración de diagnóstico.", references: { "path-6/p6-module-2": { reason: "Revisá cómo conectar servicios y actividad de Azure con Sentinel." } },
  },
  "exam-q-19": {
    domainTitle: "Administrar un entorno de operaciones de seguridad", prompt: "Una plataforma de inteligencia proporciona direcciones IP maliciosas vigentes que deben estar disponibles para reglas y búsquedas. ¿Qué deberías ingerir?",
    options: { a: { text: "Indicadores de amenazas" }, b: { text: "Parámetros de libros" }, c: { text: "Comentarios de incidentes" }, d: { text: "Inventario de dispositivos" } },
    explanation: "Los indicadores enriquecen detecciones y búsquedas con observables y contexto como confianza, validez y tipo de amenaza.", references: { "path-6/p6-module-7": { reason: "Revisá conectores de inteligencia e ingesta de indicadores." } },
  },
  "exam-q-20": {
    domainTitle: "Administrar un entorno de operaciones de seguridad", prompt: "Estás diseñando una tabla personalizada de Log Analytics para un feed propietario. ¿Qué requisito es obligatorio?",
    options: { a: { text: "El nombre usa _CL y el esquema incluye TimeGenerated" }, b: { text: "Todos los campos se almacenan como dynamic" }, c: { text: "La tabla usa el esquema SecurityEvent" }, d: { text: "El feed evita una DCR" } },
    explanation: "Las tablas personalizadas usan el sufijo _CL y requieren TimeGenerated. Una DCR define flujo, transformación, destino y contrato de esquema.", references: { "path-6/p6-module-1": { reason: "Revisá selección de conectores y diseño de ingesta personalizada." } },
  },
  "exam-q-21": {
    domainTitle: "Administrar un entorno de operaciones de seguridad", prompt: "Una consulta de Búsqueda avanzada identifica PowerShell malicioso y debe ejecutarse cada hora con acciones sobre dispositivos. ¿Qué deberías crear?",
    options: { a: { text: "Una regla de detección personalizada" }, b: { text: "Un libro" }, c: { text: "Un filtro de inventario" }, d: { text: "Una directiva de retención" } },
    explanation: "Una detección personalizada operacionaliza una consulta validada según una programación y puede generar alertas y acciones compatibles.", references: { "path-2/p2-module-8": { reason: "Revisá detecciones personalizadas, programación, contexto y acciones." } },
  },
  "exam-q-22": {
    domainTitle: "Administrar un entorno de operaciones de seguridad", prompt: "Una alerta integrada se activa repetidamente por un escáner benigno documentado. ¿Cómo reducirías el ruido con el menor riesgo de ocultar ataques?",
    options: { a: { text: "Crear una regla de ajuste precisa para atributos estables del escáner" }, b: { text: "Deshabilitar globalmente la directiva" }, c: { text: "Cerrar automáticamente todos los incidentes" }, d: { text: "Excluir toda la subred de la telemetría" } },
    explanation: "El ajuste preciso suprime la condición benigna y conserva la cobertura restante. La supresión amplia puede ocultar positivos verdaderos.", references: { "path-2/p2-module-8": { reason: "Revisá ajuste de alertas, ámbito de supresión y administración de detecciones." } },
  },
  "exam-q-23": {
    domainTitle: "Administrar un entorno de operaciones de seguridad", prompt: "Querés evaluar el impacto empresarial de una regla de reducción de superficie de ataque antes de aplicarla. ¿Qué modo deberías usar primero?",
    options: { a: { text: "Auditoría" }, b: { text: "Bloqueo sin piloto" }, c: { text: "Deshabilitada" }, d: { text: "Aislamiento de dispositivo" } },
    explanation: "El modo Auditoría registra qué afectaría la regla sin bloquear, lo que permite validar el impacto y diseñar exclusiones antes de exigirla.", references: { "path-2/p2-module-3": { reason: "Revisá modos de ASR, implementación, exclusiones y validación." } },
  },
  "exam-q-24": {
    domainTitle: "Administrar un entorno de operaciones de seguridad", prompt: "Una investigación automatizada encuentra un archivo malicioso, pero el nivel de automatización del grupo requiere aprobación. ¿Qué debería esperar el analista?",
    options: { a: { text: "La acción de corrección espera aprobación en el Centro de acciones" }, b: { text: "El dispositivo se elimina automáticamente" }, c: { text: "La investigación se convierte en libro" }, d: { text: "Toda la evidencia se suprime" } },
    explanation: "Los niveles determinan si la corrección es automática o requiere aprobación. Las acciones pendientes se aprueban o rechazan en el Centro de acciones.", references: { "path-2/p2-module-7": { reason: "Revisá investigación automatizada, aprobación y Centro de acciones." } },
  },
  "exam-q-25": {
    domainTitle: "Administrar un entorno de operaciones de seguridad", prompt: "Defender XDR contiene automáticamente una identidad y un dispositivo comprometidos durante un ataque activo. ¿Qué capacidad realizó esta respuesta coordinada?",
    options: { a: { text: "Interrupción automática de ataques" }, b: { text: "Actualización de un libro" }, c: { text: "Actualización de una lista" }, d: { text: "Retención de datos" } },
    explanation: "La interrupción automática correlaciona señales de alta confianza y toma acciones coordinadas de contención para detener el avance.", references: { "path-1/module-2": { reason: "Revisá correlación, respuesta automatizada e interrupción de ataques." } },
  },
  "exam-q-26": {
    domainTitle: "Administrar un entorno de operaciones de seguridad", prompt: "Un cuaderno de estrategias de Sentinel debe deshabilitar un usuario sin depender del analista que lo ejecutó. ¿Qué diseño de autenticación es preferible?",
    options: { a: { text: "Una identidad administrada con permisos mínimos necesarios" }, b: { text: "La contraseña personal del analista en el flujo" }, c: { text: "Acceso anónimo" }, d: { text: "Un parámetro de libro" } },
    explanation: "Una identidad administrada evita credenciales personales incorporadas y recibe únicamente los permisos necesarios para el flujo de Logic Apps.", references: { "path-7/p7-module-3": { reason: "Revisá desencadenadores, conectores, identidades y permisos de cuadernos de estrategias." } },
  },
  "exam-q-27": {
    domainTitle: "Administrar un entorno de operaciones de seguridad", prompt: "Optimización del SOC informa datos facturables sin detecciones ni uso investigativo. ¿Qué deberías hacer antes de detener la ingesta?",
    options: { a: { text: "Validar requisitos de seguridad, cumplimiento, retención y dependencias" }, b: { text: "Eliminar la tabla inmediatamente" }, c: { text: "Cerrar todos los incidentes" }, d: { text: "Deshabilitar Sentinel" } },
    explanation: "Las recomendaciones respaldan una decisión, no son instrucciones automáticas. Validá valor, requisitos, dependencias y costo.", references: { "path-5/p5-module-2": { reason: "Revisá planificación del área, valor de datos y dependencias operativas." } },
  },
  "exam-q-28": {
    domainTitle: "Administrar un entorno de operaciones de seguridad", prompt: "Sentinel identifica comportamiento que se desvía de una línea base aprendida sin un umbral estático. ¿Qué concepto se está usando?",
    options: { a: { text: "Detección de anomalías" }, b: { text: "Exportación de lista" }, c: { text: "Asignación manual" }, d: { text: "Retención de tabla" } },
    explanation: "Las detecciones de anomalías usan modelos o líneas base para revelar desviaciones que las condiciones fijas pueden omitir.", references: { "path-7/p7-module-5": { reason: "Revisá análisis de comportamiento, líneas base y anomalías." } },
  },
  "exam-q-29": {
    domainTitle: "Administrar un entorno de operaciones de seguridad", prompt: "Mapeás detecciones habilitadas a MITRE ATT&CK y encontrás una técnica relevante sin cobertura. ¿Qué indica la brecha?",
    options: { a: { text: "Un área candidata para nueva telemetría o lógica de detección" }, b: { text: "Prueba de que la técnica no puede ocurrir" }, c: { text: "Motivo para deshabilitar detecciones adyacentes" }, d: { text: "Una directiva de retención fallida" } },
    explanation: "El mapeo evalúa cobertura. Una brecha relevante impulsa la validación de orígenes, análisis y riesgo aceptable.", references: { "path-7/p7-module-1": { reason: "Revisá ingeniería de detecciones y cobertura MITRE ATT&CK." } },
  },
  "exam-q-30": {
    domainTitle: "Responder a incidentes de seguridad", prompt: "Un mensaje malicioso llegó a varios buzones. Después de confirmar la campaña, ¿qué acción elimina más directamente los mensajes entregados?",
    options: { a: { text: "Eliminación temporal o permanente mediante la corrección de Explorer" }, b: { text: "Aislar todos los endpoints" }, c: { text: "Cambiar la retención de Sentinel" }, d: { text: "Crear un libro" } },
    explanation: "La corrección de Defender for Office 365 puede mover o eliminar mensajes identificados después de investigar. El ámbito y los permisos deben verificarse.", references: { "path-1/module-3": { reason: "Revisá la corrección de amenazas entre cargas de trabajo de Microsoft Defender." } },
  },
  "exam-q-31": {
    domainTitle: "Responder a incidentes de seguridad", prompt: "Defender for Cloud informa ejecución sospechosa en una VM de Azure. ¿Qué deberías revisar primero para establecer contexto y alcance?",
    options: { a: { text: "Evidencia de la alerta, recurso, recomendaciones y ruta de ataque relacionada" }, b: { text: "Sólo el nombre de la suscripción" }, c: { text: "Un buzón aleatorio" }, d: { text: "El informe de puntuación SC-200" } },
    explanation: "La investigación de alertas de nube combina evidencia, contexto del recurso, cobertura, recomendaciones y relaciones que pueden exponer otros recursos.", references: { "path-3/p3-module-6": { reason: "Revisá investigación y corrección de alertas de Defender for Cloud." } },
  },
  "exam-q-32": {
    domainTitle: "Responder a incidentes de seguridad", prompt: "Un usuario concedió permisos de alto impacto a una aplicación OAuth sospechosa. ¿Qué respuesta aborda mejor la persistencia?",
    options: { a: { text: "Revocar concesiones, deshabilitar o quitar la app, revocar sesiones e investigar" }, b: { text: "Cambiar el nombre de la app" }, c: { text: "Agregarla a un libro" }, d: { text: "Descartar la alerta" } },
    explanation: "La persistencia por consentimiento exige eliminar autorización y acceso, contener identidades e investigar a qué accedió la aplicación.", references: { "path-1/module-6": { reason: "Revisá aplicaciones de riesgo, actividad OAuth y corrección." } },
  },
  "exam-q-33": {
    domainTitle: "Responder a incidentes de seguridad", prompt: "Defender for Identity genera una alerta de posible pass-the-ticket. ¿Qué evidencia es más útil para validar movimiento lateral?",
    options: { a: { text: "Cronología de identidad, dispositivo de origen, recursos de destino y autenticaciones" }, b: { text: "Colores del libro" }, c: { text: "Sólo el costo de Data Lake" }, d: { text: "La firma de correo" } },
    explanation: "Las alertas de identidad deben correlacionarse con dispositivos, cuentas, autenticación y acceso posterior para validar movimiento y alcance.", references: { "path-1/module-5": { reason: "Revisá alertas, cronologías de entidades y corrección en Defender for Identity." } },
  },
  "exam-q-34": {
    domainTitle: "Responder a incidentes de seguridad", prompt: "Durante una investigación de Sentinel encontrás un resultado de consulta que debe preservarse y asociarse al incidente. ¿Qué deberías crear?",
    options: { a: { text: "Un marcador vinculado al incidente" }, b: { text: "Un conector nuevo" }, c: { text: "Una excepción de retención" }, d: { text: "Un grupo de dispositivos" } },
    explanation: "Los marcadores preservan resultados, notas, entidades y contexto de investigación y pueden agregarse a incidentes.", references: { "path-7/p7-module-4": { reason: "Revisá investigación, evidencia, entidades y marcadores en Sentinel." } },
  },
  "exam-q-35": {
    domainTitle: "Responder a incidentes de seguridad", prompt: "Security Copilot resume un incidente y recomienda aislar tres dispositivos. ¿Qué debe hacer el analista antes de aprobar?",
    options: { a: { text: "Validar la recomendación contra alertas, entidades, cronologías y contexto empresarial" }, b: { text: "Asumir que toda salida es autoritativa" }, c: { text: "Eliminar evidencia de origen" }, d: { text: "Deshabilitar auditoría" } },
    explanation: "La IA acelera la investigación, pero puede equivocarse. Las acciones de impacto requieren validación de evidencia y juicio humano.", references: { "path-1/module-2": { reason: "Revisá investigación respaldada por evidencia y respuesta coordinada." } },
  },
  "exam-q-36": {
    domainTitle: "Responder a incidentes de seguridad", prompt: "Un grafo de radio de impacto muestra una ruta posible desde una identidad comprometida a un servidor crítico. ¿Cómo debería tratarse?",
    options: { a: { text: "Como pista investigativa que requiere corroboración" }, b: { text: "Como prueba de que se usó cada arista" }, c: { text: "Como motivo para borrar el incidente" }, d: { text: "Como reemplazo de evidencia" } },
    explanation: "Las rutas modelan alcance potencial. Confirmá relaciones con entidades, alertas, cronologías y búsquedas antes de concluir actividad.", references: { "path-1/module-2": { reason: "Revisá alcance de incidentes complejos, pivotes y avance del ataque." } },
  },
  "exam-q-37": {
    domainTitle: "Responder a incidentes de seguridad", prompt: "Necesitás determinar qué proceso creó un archivo sospechoso y qué conexiones siguieron en un endpoint. ¿Dónde deberías pivotar primero?",
    options: { a: { text: "La cronología del dispositivo" }, b: { text: "La página de roles de Sentinel" }, c: { text: "Una etiqueta de retención" }, d: { text: "La galería de libros" } },
    explanation: "La cronología correlaciona eventos del endpoint y permite pivotar entre procesos, archivos, red, usuarios y alertas.", references: { "path-2/p2-module-4": { reason: "Revisá investigación de cronologías y pivotes de eventos." } },
  },
  "exam-q-38": {
    domainTitle: "Responder a incidentes de seguridad", prompt: "Un analista necesita una consola interactiva en un dispositivo Windows aislado para recopilar la salida de un script. ¿Qué capacidad debería usar?",
    options: { a: { text: "Respuesta en vivo" }, b: { text: "Explorer de correo" }, c: { text: "Un libro de Sentinel" }, d: { text: "Búsqueda de contenido de Purview" } },
    explanation: "Respuesta en vivo ofrece una consola remota controlada para comandos aprobados de investigación y corrección.", references: { "path-2/p2-module-5": { reason: "Revisá requisitos, comandos y acciones de Respuesta en vivo." } },
  },
  "exam-q-39": {
    domainTitle: "Responder a incidentes de seguridad", prompt: "Un archivo sospechoso aparece en varios dispositivos. ¿Qué experiencia de Defender ayuda a revisar prevalencia, comportamiento y alertas asociadas?",
    options: { a: { text: "La página de entidad del archivo" }, b: { text: "El conector Azure Activity" }, c: { text: "Una asociación DCR" }, d: { text: "Una directiva de retención" } },
    explanation: "La página de archivo centraliza prevalencia, dispositivos, alertas, certificados, comportamiento y acciones disponibles.", references: { "path-2/p2-module-6": { reason: "Revisá investigación de evidencia y entidades." } },
  },
  "exam-q-40": {
    domainTitle: "Responder a incidentes de seguridad", prompt: "La interrupción automática contuvo una cuenta. ¿Qué debe ocurrir antes de cerrar el incidente?",
    options: { a: { text: "Verificar contención, investigar causa y alcance, corregir y documentar" }, b: { text: "Asumir que contención equivale a erradicación" }, c: { text: "Eliminar evidencia" }, d: { text: "Deshabilitar futuras interrupciones" } },
    explanation: "La contención automatizada detiene el avance, pero no reemplaza investigación, erradicación, recuperación, clasificación y documentación.", references: { "path-1/module-3": { reason: "Revisá corrección, validación de recuperación y cierre." } },
  },
  "exam-q-41": {
    domainTitle: "Responder a incidentes de seguridad", prompt: "Una alerta DLP de Purview informa datos sensibles copiados a un destino de nube no administrado. ¿Cuál es el mejor primer enfoque?",
    options: { a: { text: "Revisar alerta, directiva, usuario, actividad, contexto del contenido y eventos relacionados" }, b: { text: "Eliminar la directiva" }, c: { text: "Aislar todos los dispositivos" }, d: { text: "Ignorar la coincidencia" } },
    explanation: "La investigación DLP comienza con alerta y directiva, y valida usuario, destino, sensibilidad, secuencia y contexto de riesgo.", references: { "path-9/p9-module-1": { reason: "Revisá investigación, contexto y respuesta de alertas DLP." } },
  },
  "exam-q-42": {
    domainTitle: "Responder a incidentes de seguridad", prompt: "Una alerta de riesgo interno contiene varios indicadores sobre un usuario. ¿Qué debería determinar si se justifica escalar?",
    options: { a: { text: "Actividad correlacionada, secuencia, contexto, ámbito y evidencia gobernada" }, b: { text: "Un indicador aislado" }, c: { text: "Sólo el cargo del usuario" }, d: { text: "La cantidad de libros" } },
    explanation: "Las decisiones de riesgo interno requieren evidencia contextual y correlacionada con tratamiento gobernado, no conclusiones desde una sola actividad.", references: { "path-9/p9-module-2": { reason: "Revisá alertas de riesgo interno, actividad, gobernanza y escalación." } },
  },
  "exam-q-43": {
    domainTitle: "Responder a incidentes de seguridad", prompt: "Investigadores legales necesitan mensajes y documentos que coincidan con palabras clave, custodios y fechas. ¿Qué capacidad es la adecuada?",
    options: { a: { text: "Búsqueda de contenido de Microsoft Purview eDiscovery" }, b: { text: "Aislamiento de MDE" }, c: { text: "Una regla NRT" }, d: { text: "Una regla ASR" } },
    explanation: "Búsqueda de contenido admite búsquedas acotadas y revisables en Microsoft 365 mediante ubicaciones, custodios, palabras clave y condiciones.", references: { "path-9/p9-module-4": { reason: "Revisá casos, ámbito, estadísticas, vista previa y exportación de eDiscovery." } },
  },
  "exam-q-44": {
    domainTitle: "Responder a incidentes de seguridad", prompt: "Sospechás que una entidad de servicio enumera recursos de Microsoft Graph. ¿Qué tabla proporciona URI, método, estado, AppId y contexto del autor?",
    options: { a: { text: "MicrosoftGraphActivityLogs" }, b: { text: "DeviceFileEvents" }, c: { text: "CommonSecurityLog" }, d: { text: "EmailAttachmentInfo" } },
    explanation: "MicrosoftGraphActivityLogs registra solicitudes HTTP de Graph y permite correlacionar aplicación, entidad de servicio, usuario, IP, URI, estado y RequestId.", references: { "path-5/p5-module-3": { reason: "Revisá consultas de registros y correlación de actividad en Sentinel." } },
  },
  "exam-q-45": {
    domainTitle: "Realizar búsqueda de amenazas", prompt: "Necesitás eventos de creación de procesos, líneas de comandos, procesos primarios, hashes y cuentas iniciadoras desde Defender XDR. ¿Qué tabla consultarías primero?",
    options: { a: { text: "DeviceProcessEvents" }, b: { text: "EmailEvents" }, c: { text: "IdentityDirectoryEvents" }, d: { text: "CloudAppEvents" } },
    explanation: "DeviceProcessEvents contiene creación de procesos de endpoint y su contexto de ejecución, por lo que es la tabla principal para buscar cadenas de procesos.", references: { "path-4/p4-module-1": { reason: "Revisá selección de tablas, filtrado y proyección en KQL." } },
  },
  "exam-q-46": {
    domainTitle: "Realizar búsqueda de amenazas", prompt: "Una consulta de búsqueda examina una tabla grande y se ejecuta lentamente. ¿Qué cambio suele reducir antes los datos examinados?",
    options: { a: { text: "Aplicar un filtro selectivo de TimeGenerated cerca del inicio" }, b: { text: "Ordenar todas las filas antes de filtrar" }, c: { text: "Agregar columnas sin uso" }, d: { text: "Convertir todos los valores a string" } },
    explanation: "Los filtros tempranos de tiempo y selectividad reducen el conjunto procesado por operadores posteriores y mejoran el rendimiento.", references: { "path-4/p4-module-4": { reason: "Revisá filtrado eficiente y construcción de consultas KQL." } },
  },
  "exam-q-47": {
    domainTitle: "Realizar búsqueda de amenazas", prompt: "Un grafo de búsqueda muestra una posible ruta más corta desde un usuario a un recurso crítico. ¿Qué deberías hacer después?",
    options: { a: { text: "Inspeccionar nodos y aristas y corroborar relaciones con eventos" }, b: { text: "Declarar compromiso sólo por la visualización" }, c: { text: "Eliminar las entidades" }, d: { text: "Deshabilitar recopilación" } },
    explanation: "Las rutas muestran relaciones y alcance potencial. Se necesita evidencia de entidades, alertas, cronologías y Búsqueda avanzada para validar actividad real.", references: { "path-8/p8-module-2": { reason: "Revisá búsqueda basada en hipótesis, pivotes y validación de evidencia." } },
  },
  "exam-q-48": {
    domainTitle: "Realizar búsqueda de amenazas", prompt: "Necesitás recorrer relaciones personalizadas de nodos y aristas en Microsoft Sentinel Graph. ¿Qué lenguaje está diseñado para ese modelo?",
    options: { a: { text: "Graph Query Language (GQL)" }, b: { text: "XPath" }, c: { text: "DAX" }, d: { text: "PowerShell remoting" } },
    explanation: "Sentinel Graph usa nodos, aristas dirigidas, propiedades y rutas explorables con GQL después de inspeccionar el esquema.", references: { "path-8/p8-module-2": { reason: "Revisá búsqueda basada en relaciones y conceptos de investigación con grafos." } },
  },
  "exam-q-49": {
    domainTitle: "Realizar búsqueda de amenazas", prompt: "Un join histórico de larga ejecución debe ejecutarse cada noche sobre Data Lake y escribir resultados enriquecidos en una tabla. ¿Qué deberías usar?",
    options: { a: { text: "Un trabajo KQL programado" }, b: { text: "Una regla NRT" }, c: { text: "Aislamiento de dispositivo" }, d: { text: "Una notificación por correo" } },
    explanation: "Los trabajos KQL ejecutan consultas asincrónicas únicas o programadas sobre Data Lake y datos federados y escriben resultados en tablas compatibles.", references: { "path-8/p8-module-3": { reason: "Revisá cargas de búsqueda histórica y patrones de consulta asincrónica." } },
  },
  "exam-q-50": {
    domainTitle: "Realizar búsqueda de amenazas", prompt: "Un cliente de IA usa herramientas MCP de Sentinel para responder una pregunta de búsqueda. ¿Qué principio de validación sigue siendo obligatorio?",
    options: { a: { text: "Verificar área, tablas, período, permisos, salida y evidencia de origen" }, b: { text: "Tratar la salida natural como prueba" }, c: { text: "Asumir que MCP evita RBAC" }, d: { text: "Descartar las consultas generadas" } },
    explanation: "Las herramientas MCP operan dentro de identidad y ámbito, y la salida puede ser incompleta. Conservá y validá consultas, fuentes, entidades, períodos y hallazgos.", references: { "path-8/p8-module-4": { reason: "Revisá flujos gobernados de búsqueda con cuadernos e IA." } },
  },
};
