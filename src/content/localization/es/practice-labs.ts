import type { PracticeLabTranslation } from "../types";

export const spanishPracticeLabs: Record<string, PracticeLabTranslation> = {
  "practice-lab-1": {
    title: "Investigar un ataque de phishing de consentimiento y un endpoint comprometido",
    subtitle: "Correlacioná evidencia de identidad, aplicaciones en la nube, correo electrónico y endpoints para construir una respuesta a incidentes sólida.",
    difficulty: "Intermedio",
    primaryDomain: "Responder a incidentes de seguridad",
    briefing: "Un analista de finanzas informa que recibió una solicitud de consentimiento inesperada después de abrir un correo con una factura de un proveedor. Microsoft Defender XDR correlaciona alertas relacionadas con el usuario, una aplicación OAuth, actividad en el buzón y una ejecución sospechosa de PowerShell en el dispositivo del analista.",
    mission: "Determiná el alcance del ataque, contené los recursos afectados, preservá la evidencia útil y cerrá el incidente con la clasificación correcta.",
    stages: {
      "stage-1": {
        title: "Realizar el triage del incidente",
        objective: "Establecer responsable, prioridad y la primera ruta de investigación sin perder el contexto correlacionado del ataque.",
        briefing: "Un nuevo incidente de gravedad alta aparece en el portal de Defender. Sos el primer analista asignado para revisarlo.",
        evidence: {
          "incident-snapshot": {
            title: "Resumen de la cola de incidentes",
            facts: [
              "Gravedad: Alta; estado: Nuevo; propietario: Sin asignar.",
              "Cuatro alertas correlacionadas de Defender for Office 365, Microsoft Entra ID, Defender for Cloud Apps y Defender for Endpoint.",
              "Usuario afectado: alex.wilber@contoso.com; dispositivo afectado: FIN-LT-042.",
              "Aplicación OAuth relacionada: Contoso Document Viewer.",
            ],
          },
        },
        decisionPrompt: "¿Cuál es la mejor acción inicial?",
        options: {
          "assign-review-story": {
            text: "Asignar el incidente, cambiar su estado a Activo, validar la gravedad y revisar la historia completa del ataque y las entidades afectadas.",
            feedback: "Esto preserva el contexto correlacionado, establece responsabilidad y permite identificar la evidencia que requiere contención inmediata.",
          },
          "isolate-first": {
            text: "Aislar FIN-LT-042 inmediatamente y revisar después la evidencia de identidad, aplicación y correo electrónico.",
            feedback: "El aislamiento urgente puede justificarse cuando existe una probable ejecución activa, pero sólo aborda el dispositivo y no debe reemplazar un triage rápido entre dominios.",
          },
          "separate-alerts": {
            text: "Investigar cada alerta por separado sin utilizar la correlación del incidente.",
            feedback: "Esto fragmenta la historia del ataque y aumenta la posibilidad de pasar por alto relaciones entre el usuario, la aplicación, el buzón y el dispositivo.",
          },
          "close-user-report": {
            text: "Cerrar el incidente porque el correo original fue reportado por el usuario.",
            feedback: "El reporte del usuario es una señal inicial, no una prueba de que la actividad relacionada sea inofensiva.",
          },
        },
        outcome: [
          "El incidente queda asignado a tu usuario y pasa al estado Activo.",
          "La historia del ataque muestra en una única secuencia la entrega del correo, el consentimiento OAuth, la actividad en la nube y la ejecución en el endpoint.",
        ],
        hint: "Empezá por el incidente como historia correlacionada del ataque. Establecé un responsable e identificá las entidades y alertas que podrían requerir acciones inmediatas.",
        takeaway: "El triage inicial debe establecer responsable, prioridad, alcance y la evidencia que requiere contención inmediata.",
        references: {
          "path-1/module-2": { reason: "Revisá la asignación y gravedad de incidentes, las historias de ataque, los recursos afectados, la clasificación y el ciclo de investigación de Defender XDR." },
        },
      },
      "stage-2": {
        title: "Analizar la evidencia",
        objective: "Distinguir eventos sospechosos aislados de una conclusión respaldada de compromiso en múltiples dominios.",
        briefing: "El gráfico del incidente conecta el mensaje reportado, el usuario, la aplicación OAuth, el buzón y FIN-LT-042. Revisá cada fuente de evidencia antes de decidir qué recursos están comprometidos.",
        evidence: {
          "email-evidence": {
            title: "Evidencia del correo electrónico",
            facts: [
              "Nombre para mostrar: Fabrikam Accounts; dominio del remitente: fabrikam-payments.co.",
              "Asunto: Updated Q3 supplier statement.",
              "El usuario hizo clic en una URL insertada a las 08:47 UTC.",
              "El dominio del remitente fue registrado recientemente y no coincide con el dominio conocido del proveedor.",
            ],
          },
          "oauth-evidence": {
            title: "Evidencia del consentimiento OAuth",
            facts: [
              "Aplicación: Contoso Document Viewer; editor: No verificado.",
              "Permisos delegados: Mail.ReadWrite, Files.Read.All y offline_access.",
              "El consentimiento fue otorgado a las 08:49 UTC, dos minutos después del clic en la URL.",
              "La aplicación es poco frecuente en el tenant y no tiene un propietario de negocio aprobado.",
            ],
          },
          "cloud-evidence": {
            title: "Actividad en la nube",
            facts: [
              "La aplicación accedió al buzón del usuario y leyó varios mensajes.",
              "Descargó archivos desde un sitio de SharePoint.",
              "La actividad continuó después de que finalizara la sesión original del navegador.",
              "Las solicitudes se originaron desde una dirección IP que no se había asociado previamente con el usuario.",
            ],
          },
          "device-evidence": {
            title: "Escala de tiempo del dispositivo",
            facts: [
              "msedge.exe inició PowerShell poco después del clic en la URL de phishing.",
              "PowerShell descargó sync-update.ps1 y creó una tarea programada llamada Document Sync Update.",
              "El script se comunicó con la misma IP externa desconocida observada en la actividad en la nube.",
              "Defender detectó el script como sospechoso, pero no confirmó que todas las acciones fueran corregidas.",
            ],
          },
        },
        decisionPrompt: "¿Qué conclusión está mejor respaldada por la evidencia?",
        options: {
          "multi-domain-compromise": {
            text: "El usuario otorgó acceso a una aplicación OAuth riesgosa y el dispositivo ejecutó una carga relacionada; el usuario, la aplicación, el buzón y el dispositivo deben considerarse potencialmente comprometidos.",
            feedback: "La secuencia temporal, la infraestructura compartida, los permisos, el acceso a la nube y la ejecución en el dispositivo respaldan una hipótesis de compromiso conectado entre varios dominios.",
          },
          "endpoint-confirmed-app-pending": {
            text: "El compromiso del endpoint está confirmado, pero se debe continuar validando el comportamiento de la aplicación OAuth antes de declararla malintencionada.",
            feedback: "Es una postura prudente y defendible, pero la aplicación no verificada, los permisos de alto impacto, su uso poco frecuente y la actividad posterior al consentimiento ya respaldan firmemente la evaluación de una aplicación malintencionada.",
          },
          "device-only": {
            text: "El incidente afecta únicamente a FIN-LT-042 porque PowerShell es la única evidencia ejecutable.",
            feedback: "Esto ignora el acceso confirmado de la aplicación al buzón y a los datos de SharePoint después de otorgarse el consentimiento.",
          },
          "consent-equals-trust": {
            text: "La aplicación OAuth es confiable porque el usuario otorgó el consentimiento de forma interactiva.",
            feedback: "El consentimiento del usuario no demuestra que el editor sea confiable, que exista aprobación de negocio ni que el comportamiento sea seguro.",
          },
        },
        outcome: [
          "La hipótesis del incidente se eleva a una probable campaña de phishing de consentimiento con ejecución relacionada en el endpoint.",
          "El usuario, la aplicación OAuth, el buzón, el dispositivo, la URL de phishing, el script, la tarea programada y la IP externa se convierten en pivotes de investigación.",
        ],
        hint: "Correlacioná la secuencia temporal, la infraestructura compartida, los permisos solicitados, la actividad posterior al consentimiento y la línea de procesos del endpoint. No trates el consentimiento del usuario como una señal de confianza.",
        takeaway: "Una conclusión respaldada debe explicar toda la evidencia relevante entre dominios, no solamente la alerta más visible.",
        references: {
          "path-1/module-2": { reason: "Revisá cómo Defender XDR correlaciona alertas, evidencia y entidades en un incidente unificado." },
          "path-1/module-6": { reason: "Revisá el comportamiento de aplicaciones OAuth, la actividad riesgosa en la nube y la investigación con Defender for Cloud Apps." },
          "path-2/p2-module-4": { reason: "Revisá las escalas de tiempo de los dispositivos y la evidencia del endpoint utilizada para validar un compromiso." },
        },
      },
      "stage-3": {
        title: "Determinar el alcance",
        objective: "Utilizar indicadores y entidades compartidos para encontrar usuarios, dispositivos, aplicaciones, mensajes y actividad en la nube relacionados.",
        briefing: "El incidente original confirma actividad sospechosa para un usuario y un dispositivo, pero todavía no determina si la campaña alcanzó otros recursos.",
        evidence: {
          "known-pivots": {
            title: "Pivotes de investigación conocidos",
            facts: [
              "Identificador de la aplicación OAuth y marca de tiempo del consentimiento.",
              "URL de phishing, dominio del remitente y asunto del mensaje.",
              "Hash de sync-update.ps1, línea de comandos de PowerShell y nombre de la tarea programada.",
              "IP externa compartida por la aplicación en la nube y el script del endpoint.",
            ],
          },
        },
        decisionPrompt: "¿Cuál es el plan de investigación más sólido para continuar?",
        options: {
          "tenant-wide-pivots": {
            text: "Realizar una búsqueda en todo el tenant utilizando el identificador de la aplicación, la actividad de consentimiento, la URL, el dominio del remitente, el hash del archivo, el nombre del script, la tarea programada y la IP externa.",
            feedback: "Esto pone a prueba la hipótesis de la campaña entre datos de identidad, correo, nube y endpoints, y puede revelar recursos afectados fuera del incidente original.",
          },
          "endpoint-pivots-only": {
            text: "Buscar el comando de PowerShell y el hash del archivo en todos los endpoints, pero posponer el análisis de la aplicación en la nube.",
            feedback: "Esto puede encontrar ejecuciones adicionales en dispositivos, pero deja sin determinar el alcance del acceso persistente de OAuth y de otros usuarios que hayan otorgado consentimiento.",
          },
          "mailbox-only": {
            text: "Revisar únicamente el buzón de Alex Wilber porque ese usuario generó el incidente.",
            feedback: "El alcance de una campaña no puede establecerse sólo a partir del buzón afectado originalmente.",
          },
          "reset-and-stop": {
            text: "Restablecer la contraseña de Alex Wilber y detener la investigación.",
            feedback: "El restablecimiento de la contraseña no determina el alcance de la campaña ni elimina necesariamente los consentimientos de aplicaciones y las rutas de acceso activas.",
          },
        },
        outcome: [
          "Tres usuarios otorgaron consentimiento a la misma aplicación y dos hicieron clic en la URL de phishing.",
          "La carga de PowerShell se ejecutó en un solo dispositivo.",
          "La aplicación accedió a dos buzones y descargó archivos de un sitio de SharePoint.",
          "Ningún otro dispositivo muestra la tarea programada ni el hash del script durante el intervalo seleccionado.",
        ],
        hint: "Utilizá cada indicador estable en la telemetría relevante. Determiná por separado el alcance de las rutas de nube y endpoint, y luego correlacioná los resultados.",
        takeaway: "El incidente original puede representar sólo una parte de una campaña; el alcance se establece mediante pivotes deliberados entre dominios.",
        references: {
          "path-8/p8-module-2": { reason: "Revisá la búsqueda basada en hipótesis, los pivotes de entidades, los marcadores y la investigación de actividad relacionada." },
          "path-4/p4-module-3": { reason: "Revisá las técnicas de KQL con varias tablas para correlacionar indicadores entre distintas fuentes de telemetría." },
        },
      },
      "stage-4": {
        title: "Contener y corregir",
        objective: "Elegir acciones coordinadas que detengan el acceso desde la nube y el endpoint, y que preserven la evidencia útil.",
        briefing: "La campaña afectó a tres usuarios, dos buzones, un sitio de SharePoint y un endpoint. La aplicación OAuth todavía tiene acceso delegado y FIN-LT-042 continúa conectado.",
        evidence: {
          "response-readiness": {
            title: "Capacidad de respuesta disponible",
            facts: [
              "El equipo de seguridad puede deshabilitar la aplicación empresarial y revocar sus permisos.",
              "Los administradores de identidad pueden revocar las sesiones de los usuarios y restablecer sus credenciales.",
              "Defender for Endpoint puede acceder a FIN-LT-042 y permite aislarlo y recopilar un paquete de investigación.",
              "Defender for Office 365 puede localizar y purgar el mensaje de phishing de los buzones afectados.",
            ],
          },
        },
        decisionPrompt: "¿Qué plan de respuesta aborda mejor el alcance confirmado?",
        options: {
          "coordinated-response": {
            text: "Deshabilitar la aplicación OAuth, revocar sus permisos y las sesiones afectadas, restablecer las credenciales comprometidas, aislar el dispositivo y recopilar evidencia, purgar el mensaje, bloquear los indicadores y verificar cada acción.",
            feedback: "Esto cierra las rutas de acceso de nube, identidad, correo y endpoint, preserva la evidencia y exige verificar las acciones de respuesta.",
          },
          "urgent-containment-first": {
            text: "Aislar inmediatamente el dispositivo y revocar las sesiones de los usuarios, y luego completar la corrección de la aplicación, el correo y las credenciales.",
            feedback: "Es una secuencia urgente defendible si las acciones restantes se asignan y completan sin demora; no se debe olvidar el consentimiento de la aplicación.",
          },
          "passwords-only": {
            text: "Restablecer las contraseñas de los usuarios afectados sin revocar la aplicación ni las sesiones activas.",
            feedback: "Restablecer únicamente las contraseñas no elimina de forma confiable todos los tokens existentes ni los permisos de la aplicación malintencionada.",
          },
          "wipe-first": {
            text: "Borrar FIN-LT-042 inmediatamente antes de recopilar evidencia de la investigación.",
            feedback: "Una corrección destructiva puede eliminar evidencia necesaria para determinar la persistencia, el comportamiento de la carga y la causa raíz.",
          },
          "email-only": {
            text: "Eliminar el correo de phishing y cerrar el incidente.",
            feedback: "Eliminar el mensaje inicial no quita el consentimiento OAuth, las sesiones activas, los datos a los que se accedió ni la persistencia en el endpoint.",
          },
        },
        outcome: [
          "La aplicación OAuth queda deshabilitada y se revocan sus permisos delegados.",
          "Se revocan las sesiones y se restablecen las credenciales de los tres usuarios afectados.",
          "FIN-LT-042 queda aislado pero mantiene la conectividad con Defender, y se recopila un paquete de investigación antes de la corrección.",
          "Los mensajes de phishing se purgan y los indicadores confirmados se bloquean.",
        ],
        hint: "Asigná una acción de respuesta a cada ruta de acceso confirmada. Preservá la evidencia antes de una corrección destructiva y verificá las acciones en el Centro de actividades o registro de auditoría correspondiente.",
        takeaway: "La contención efectiva es coordinada: aislar el dispositivo no detiene por sí solo el acceso a la nube y restablecer una contraseña no elimina el consentimiento de una aplicación.",
        references: {
          "path-2/p2-module-5": { reason: "Revisá el aislamiento de dispositivos, los paquetes de investigación, las acciones de corrección y su verificación." },
          "path-1/module-6": { reason: "Revisá la contención de aplicaciones en la nube, la revocación de permisos, los controles de sesión y la corrección de OAuth." },
          "path-1/module-3": { reason: "Revisá las acciones de investigación y corrección de correos de phishing y contenido malintencionado." },
        },
      },
      "stage-5": {
        title: "Validar y cerrar",
        objective: "Confirmar los resultados de la respuesta y resolver el incidente con una clasificación defendible y un registro completo de la investigación.",
        briefing: "Las acciones de respuesta planificadas finalizaron. Antes de cerrar el incidente, verificá sus resultados y determiná la clasificación correcta.",
        evidence: {
          "validation-status": {
            title: "Estado de la validación",
            facts: [
              "La aplicación OAuth está deshabilitada y ya no tiene permisos delegados.",
              "La revocación de sesiones y el restablecimiento de contraseñas finalizaron para los tres usuarios afectados.",
              "La tarea programada y la carga fueron eliminadas de FIN-LT-042 después de recopilar la evidencia.",
              "Los mensajes de phishing fueron purgados y no apareció nueva actividad relacionada durante el período de validación.",
            ],
          },
        },
        decisionPrompt: "¿Cómo se debe resolver el incidente?",
        options: {
          "true-positive-close": {
            text: "Clasificarlo como verdadero positivo con actividad malintencionada, documentar la cadena de ataque, las entidades afectadas, la evidencia, las acciones de respuesta y los requisitos de monitoreo, y luego cerrarlo.",
            feedback: "Esta clasificación coincide con el consentimiento malintencionado confirmado, el acceso no autorizado a la nube y la ejecución en el endpoint, y preserva un registro de investigación útil.",
          },
          "monitor-active": {
            text: "Mantener el incidente Activo durante un período adicional de monitoreo, con un propietario y un motivo documentado.",
            feedback: "La observación adicional puede estar justificada por la política de la organización, siempre que el responsable, los criterios de salida y el motivo para demorar el cierre sean explícitos.",
          },
          "false-positive-consent": {
            text: "Clasificarlo como falso positivo porque los usuarios otorgaron el consentimiento por cuenta propia.",
            feedback: "El consentimiento se obtuvo mediante phishing y fue seguido por acceso no autorizado y ejecución en el endpoint; la interacción del usuario no convierte la actividad en benigna.",
          },
          "close-no-record": {
            text: "Cerrar el incidente sin clasificación ni comentarios de investigación porque la corrección fue exitosa.",
            feedback: "La falta de clasificación y documentación debilita las métricas, la transferencia de información, las lecciones aprendidas y el ajuste futuro de las detecciones.",
          },
        },
        outcome: [
          "El incidente queda registrado como verdadero positivo con actividad malintencionada.",
          "El registro final incluye la escala de tiempo, la causa raíz, los usuarios y recursos afectados, los indicadores, los pasos de preservación de evidencia, las acciones de respuesta y los resultados de la validación.",
        ],
        hint: "Basá el cierre en los resultados verificados de la respuesta y en la naturaleza de la actividad respaldada por la evidencia, no solamente en que haya desaparecido la condición que generó la alerta.",
        takeaway: "La clasificación y documentación precisas completan el ciclo de respuesta y mejoran las investigaciones, las métricas y el ajuste de detecciones futuras.",
        references: {
          "path-1/module-2": { reason: "Revisá la validación de incidentes, la clasificación como verdadero positivo, la resolución y la documentación de la investigación." },
          "path-7/p7-module-4": { reason: "Revisá el responsable, el estado, la evidencia, el seguimiento de la respuesta y el cierre de incidentes en Microsoft Sentinel." },
        },
      },
    },
    debrief: {
      title: "Campaña contenida en cuatro dominios de seguridad",
      summary: "El mensaje de phishing inició dos rutas de compromiso relacionadas: consentimiento OAuth malintencionado y ejecución de código en el endpoint. Aislar el dispositivo no habría detenido el acceso a la nube y restablecer la contraseña no habría eliminado el consentimiento de la aplicación. La respuesta efectiva requirió acciones coordinadas sobre identidad, aplicación, correo y endpoint, seguidas de su verificación.",
      keyLessons: [
        "Usá el incidente correlacionado para reconstruir el ataque antes de fragmentar el trabajo por producto.",
        "Tratá el consentimiento como un evento que debe investigarse, no como prueba de que una aplicación OAuth es confiable.",
        "Determiná el alcance de las campañas mediante pivotes compartidos de entidades e indicadores en todas las fuentes de telemetría relevantes.",
        "Asigná la contención a cada ruta de acceso activa y preservá la evidencia antes de una corrección destructiva.",
        "Cerrá el incidente sólo después de verificar las acciones y registrar una clasificación respaldada por evidencia.",
      ],
    },
  },
  "practice-lab-2": {
    title: "Investigar el abuso de credenciales y la persistencia en Azure con Microsoft Sentinel",
    subtitle: "Correlacioná inicios de sesión, registros de auditoría y actividad de Azure para validar un compromiso privilegiado en la nube y coordinar la respuesta.",
    difficulty: "Intermedio",
    primaryDomain: "Administrar un entorno de operaciones de seguridad",
    briefing: "Microsoft Sentinel crea un incidente de gravedad alta después de que un inicio de sesión exitoso desde una red desconocida sea seguido por la asignación de un rol privilegiado y una nueva credencial de aplicación. Las operaciones afectan una suscripción de producción y ocurren fuera del patrón de trabajo habitual del administrador.",
    mission: "Validá si la actividad es malintencionada, reconstruí la secuencia del ataque en la nube, determiná las identidades y los recursos afectados, contené todas las rutas de acceso y mejorá la detección después del cierre.",
    stages: {
      "sentinel-stage-1": {
        title: "Realizar el triage del incidente de Sentinel",
        objective: "Establecer un responsable y validar el contexto de la detección antes de determinar si hubo un compromiso.",
        briefing: "El incidente fue generado por una regla de análisis programada llamada Privileged change after anomalous sign-in y contiene entidades de cuenta, dirección IP, aplicación en la nube y recurso de Azure.",
        evidence: {
          "sentinel-incident-summary": {
            title: "Resumen del incidente y de la regla de análisis",
            facts: [
              "Gravedad: Alta; estado: Nuevo; tácticas: Acceso inicial y Persistencia.",
              "La regla se ejecuta cada 10 minutos, usa una ventana de consulta de 30 minutos y agrupa las alertas coincidentes por cuenta.",
              "Las entidades asignadas incluyen jordan.lee@contoso.com, la IP 198.51.100.77, la aplicación Azure Portal y la suscripción PROD-01.",
              "El incidente contiene tres alertas creadas dentro de un período de 14 minutos.",
            ],
          },
        },
        decisionPrompt: "¿Cuál es la mejor primera acción?",
        options: {
            "sentinel-triage-correlated": {
              text: "Asigná el incidente, cambialo a Activo, revisá la lógica de la regla de análisis y las asignaciones de entidades y, luego, inspeccioná la escala de tiempo completa de las alertas y las entidades relacionadas.",
              feedback: "Esto preserva el contexto correlacionado, establece la responsabilidad y permite verificar qué demuestra realmente la detección antes de iniciar las acciones de respuesta.",
            },
            "sentinel-triage-disable": {
              text: "Deshabilitá de inmediato la cuenta de Jordan Lee, sin comprobar primero si las operaciones provienen de un cambio aprobado o de una identidad de automatización.",
              feedback: "La contención rápida puede estar justificada cuando el riesgo es inminente, pero actuar antes de una validación básica puede interrumpir una administración legítima y ocultar la ruta de acceso original.",
            },
            "sentinel-triage-vpn": {
              text: "Cerrá el incidente porque las ubicaciones desconocidas suelen deberse a puertas de enlace de VPN corporativas.",
              feedback: "Una anomalía de ubicación por sí sola puede ser benigna, pero los cambios privilegiados correlacionados y la credencial de aplicación requieren investigación.",
            },
            "sentinel-triage-alerts": {
              text: "Abrí cada alerta en una pestaña separada del navegador e investigalas sin usar las entidades ni la escala de tiempo del incidente.",
              feedback: "Fragmentar la investigación dificulta identificar la secuencia que conecta la autenticación, el privilegio y la persistencia.",
            },
        },
        outcome: [
          "El incidente queda asignado, pasa a estado Activo y se confirma que contiene tres alertas relacionadas de forma lógica.",
          "La consulta de la regla y las asignaciones de entidades conectan correctamente la cuenta, la IP de origen, la aplicación y la suscripción de Azure.",
        ],
        hint: "Primero determiná por qué la regla de análisis agrupó estas alertas y qué entidades se pueden usar como pivotes de investigación.",
        takeaway: "El triage de incidentes en Sentinel comienza por la asignación de un responsable, la validación de la detección, la revisión de entidades y la preservación de la escala de tiempo correlacionada.",
        references: {
          "path-7/p7-module-4": { reason: "Revisá la evidencia, las entidades, la asignación, el estado, la investigación y el cierre de incidentes en Sentinel." },
          "path-7/p7-module-1": { reason: "Revisá las reglas de análisis programadas, la programación de consultas, la agrupación de alertas y las asignaciones de entidades." },
        },
      },
      "sentinel-stage-2": {
        title: "Reconstruir la actividad en la nube",
        objective: "Correlacionar los registros de autenticación, auditoría del directorio y plano de control de Azure en una secuencia respaldada por evidencia.",
        briefing: "El incidente muestra operaciones sospechosas, pero debés validar su orden, autor, destino y contexto de autenticación en varias tablas.",
        evidence: {
          "sentinel-signin-evidence": {
            title: "Hallazgos de SigninLogs",
            facts: [
              "Jordan Lee inició sesión correctamente desde 198.51.100.77 mediante Azure Portal a las 02:13 UTC.",
              "La ubicación y el sistema autónomo son nuevos para el usuario; los detalles del dispositivo están vacíos y el cliente es un navegador.",
              "Acceso condicional informa un resultado exitoso porque la MFA ya estaba satisfecha por un claim del token.",
              "Se produjo un inicio de sesión fallido para el mismo usuario y la misma IP seis minutos antes.",
            ],
          },
          "sentinel-audit-evidence": {
            title: "Hallazgos de AuditLogs",
            facts: [
              "A las 02:19 UTC, Jordan agregó una credencial de contraseña a la aplicación Finance Data Exporter.",
              "El propietario de la aplicación confirma que no había ninguna rotación de credenciales programada.",
              "La nueva credencial vence dentro de dos años y la IP que inició la operación coincide con la del inicio de sesión.",
            ],
          },
          "sentinel-azure-evidence": {
            title: "Hallazgos de AzureActivity",
            facts: [
              "A las 02:27 UTC, Jordan asignó el rol Contributor a Finance Data Exporter en PROD-01.",
              "A las 02:31 UTC, la entidad de servicio enumeró las claves de la cuenta de almacenamiento prod-finance-data.",
              "Ambas operaciones se completaron correctamente y ningún ticket de cambio aprobado hace referencia a la aplicación.",
            ],
          },
        },
        decisionPrompt: "¿Qué conclusión está mejor respaldada por los registros correlacionados?",
        options: {
            "sentinel-sequence-compromise": {
              text: "Una sesión de usuario probablemente comprometida creó persistencia mediante una aplicación, otorgó privilegios en Azure y permitió que la entidad de servicio accediera a una cuenta de almacenamiento de producción.",
              feedback: "Esta conclusión explica el usuario, la IP, la aplicación, el recurso, los tiempos y los cambios no autorizados compartidos entre las tres fuentes de telemetría.",
            },
            "sentinel-sequence-validate-user": {
              text: "Los cambios son sospechosos, pero confirmá la actividad de Jordan y las operaciones posteriores de la entidad de servicio antes de declarar malintencionada toda la secuencia.",
              feedback: "Una validación adicional es razonable, aunque la evidencia actual entre tablas ya respalda la contención urgente de las rutas de acceso activas.",
            },
            "sentinel-sequence-mfa-safe": {
              text: "El inicio de sesión es confiable porque Acceso condicional se completó correctamente y el claim del token incluía la MFA.",
              feedback: "Un control exitoso no demuestra que la sesión sea legítima; los tokens robados o reproducidos pueden conservar claims de MFA satisfechos previamente.",
            },
            "sentinel-sequence-separate": {
              text: "Tratá la asignación del rol y la credencial de aplicación como eventos no relacionados porque aparecen en tablas de registro distintas.",
              feedback: "La identidad, la IP, la aplicación y el recurso compartidos, junto con una escala de tiempo muy acotada, respaldan firmemente la correlación entre las tablas.",
            },
        },
        outcome: [
          "La escala de tiempo de la investigación conecta el inicio de sesión anómalo con una nueva credencial de aplicación y una asignación de rol privilegiado en Azure.",
          "La entidad de servicio usó su nuevo acceso para recuperar las claves de una cuenta de almacenamiento de producción cuatro minutos después.",
        ],
        hint: "Relacioná conceptualmente la evidencia por cuenta, dirección IP, aplicación, recurso y una ventana de tiempo acotada, en lugar de evaluar cada tabla por separado.",
        takeaway: "La correlación entre varias tablas convierte eventos sospechosos aislados en una secuencia de ataque defendible, sin perder de vista la incertidumbre de cada señal.",
        references: {
          "path-4/p4-module-3": { reason: "Revisá joins, unions, correlación con límites temporales y análisis de varias tablas con KQL." },
          "path-5/p5-module-3": { reason: "Revisá cómo consultar registros de Sentinel, validar campos y analizar resultados en el área de trabajo." },
        },
      },
      "sentinel-stage-3": {
        title: "Determinar el radio de impacto",
        objective: "Usar entidades, contexto de comportamiento y pivotes de búsqueda de amenazas para encontrar identidades, aplicaciones, direcciones IP y recursos relacionados.",
        briefing: "Ya se confirmaron un usuario, una aplicación y una suscripción, pero la infraestructura de origen y el mecanismo de persistencia podrían haberse usado en otras partes del tenant.",
        evidence: {
          "sentinel-entity-context": {
            title: "Comportamiento de entidades y pivotes de investigación",
            facts: [
              "La página de UEBA de Jordan muestra la primera actividad desde este ASN y el primer cambio de credenciales realizado por el usuario.",
              "La IP de origen intentó iniciar sesión en otras cuatro cuentas privilegiadas durante las 24 horas anteriores; todos los intentos fallaron.",
              "Finance Data Exporter accedió a una cuenta de almacenamiento y consultó dos recursos de Key Vault después de la asignación del rol.",
              "Una segunda aplicación recibió una credencial desde la misma IP siete días antes, pero la operación fue realizada por otro administrador.",
            ],
          },
        },
        decisionPrompt: "¿Cuál es el mejor plan para determinar el alcance?",
        options: {
            "sentinel-scope-entities": {
              text: "Realizá una búsqueda de amenazas durante la ventana del incidente y en el historial anterior usando la IP, el usuario, los identificadores de la aplicación y la entidad de servicio, los cambios de credenciales, las asignaciones de roles, los recursos de destino y las cuentas privilegiadas relacionadas; guardá los hallazgos relevantes como marcadores.",
              feedback: "Esto pone a prueba la hipótesis de compromiso en identidades y recursos, usa identificadores de entidad estables y preserva los hallazgos que respaldan las decisiones de alcance.",
            },
            "sentinel-scope-ip": {
              text: "Bloqueá la IP de origen y buscá únicamente otros inicios de sesión desde esa dirección.",
              feedback: "La IP es un pivote útil y bloquearla puede reducir el riesgo inmediato, pero el atacante puede cambiar de infraestructura mientras el acceso persistente de la aplicación continúa activo.",
            },
            "sentinel-scope-incident-only": {
              text: "Limitá el alcance a las entidades ya presentes en el incidente porque la correlación de Sentinel es exhaustiva.",
              feedback: "Un incidente refleja la lógica de la regla y su ventana de agrupación; es posible que no incluya actividad relacionada que quede fuera de esas condiciones.",
            },
            "sentinel-scope-all-logs": {
              text: "Ejecutá una búsqueda sin restricciones en todas las tablas y conservá como evidencia cada evento coincidente.",
              feedback: "Las búsquedas sin límites generan ruido y costos si no cuentan con una hipótesis, pivotes estables, tablas pertinentes ni una ventana de tiempo defendible.",
            },
        },
        outcome: [
          "No se encuentran otros inicios de sesión privilegiados exitosos desde la IP de origen.",
          "El cambio de credenciales de la segunda aplicación se valida como una rotación aprobada desde un servidor de salto administrado y se excluye del incidente.",
          "Finance Data Exporter accedió a la cuenta de almacenamiento de producción y consultó dos instancias de Key Vault, pero no recuperó secretos de ellas.",
          "El alcance confirmado se mantiene en una sesión de usuario comprometida, una credencial persistente de aplicación, una asignación de rol y una cuenta de almacenamiento a la que se accedió.",
        ],
        hint: "Usá las entidades del incidente como pivotes iniciales y, luego, comprobá en qué otros lugares aparecen esos identificadores y comportamientos dentro y fuera de la ventana original de la regla.",
        takeaway: "Los incidentes de Sentinel definen un conjunto inicial de evidencia, no un radio de impacto garantizado; la búsqueda de amenazas basada en entidades es necesaria para confirmar el alcance.",
        references: {
          "path-7/p7-module-5": { reason: "Revisá UEBA, las páginas de entidad, el contexto de comportamiento y la investigación basada en anomalías." },
          "path-8/p8-module-2": { reason: "Revisá las consultas de búsqueda de amenazas, los marcadores, el livestream y los pivotes basados en evidencia en Sentinel." },
        },
      },
      "sentinel-stage-4": {
        title: "Contener las identidades y el acceso a la nube",
        objective: "Coordinar acciones manuales y automatizadas contra todas las rutas de acceso confirmadas, manteniendo el control del analista.",
        briefing: "La sesión del usuario comprometido y la credencial de la entidad de servicio siguen siendo válidas. Un cuaderno de estrategias de Sentinel puede revocar las sesiones del usuario, deshabilitar la aplicación y notificar al equipo de operaciones en la nube, pero los cambios destructivos en los recursos requieren aprobación.",
        evidence: {
          "sentinel-response-readiness": {
            title: "Controles de respuesta y estado del cuaderno de estrategias",
            facts: [
              "El cuaderno de estrategias Contain compromised cloud identity está habilitado para ejecutarse a petición y usa una identidad administrada con permisos aprobados.",
              "El cuaderno de estrategias revoca las sesiones del usuario, deshabilita la entidad de servicio, agrega un comentario al incidente y envía una solicitud de aprobación para eliminar la credencial.",
              "La asignación no autorizada del rol Contributor y la credencial de aplicación siguen presentes.",
              "El equipo de almacenamiento de producción está disponible para rotar las claves expuestas de la cuenta después de capturar la evidencia.",
            ],
          },
        },
        decisionPrompt: "¿Qué plan de respuesta se ajusta mejor al alcance confirmado?",
        options: {
            "sentinel-response-coordinated": {
              text: "Ejecutá a petición el cuaderno de estrategias validado, bloqueá a Jordan y revocá sus sesiones, deshabilitá la entidad de servicio, eliminá con aprobación la credencial y la asignación de rol no autorizadas, rotá las claves de almacenamiento expuestas, preservá los resultados de las consultas y verificá cada acción.",
              feedback: "Esto contiene al usuario, la aplicación, el privilegio de Azure y la credencial expuesta del recurso, al mismo tiempo que preserva la evidencia, los límites de aprobación y la verificación.",
            },
            "sentinel-response-immediate-playbook": {
              text: "Ejecutá de inmediato el cuaderno de estrategias de contención de identidad y completá la corrección del rol de Azure y las claves de almacenamiento después de detener las rutas de acceso urgentes.",
              feedback: "Priorizar el acceso activo de las identidades es defendible, siempre que se definan con claridad la responsabilidad y el seguimiento para el privilegio y las claves expuestas restantes.",
            },
            "sentinel-response-password": {
              text: "Restablecé la contraseña de Jordan y cerrá el incidente porque el usuario original ya no puede autenticarse con la contraseña anterior.",
              feedback: "Un restablecimiento de contraseña por sí solo puede no revocar las sesiones activas y no elimina la credencial de aplicación, la asignación de rol ni las claves de almacenamiento expuestas.",
            },
            "sentinel-response-auto-delete": {
              text: "Creá una regla de automatización que elimine automáticamente todas las credenciales de aplicación cada vez que esta regla de análisis genere un incidente.",
              feedback: "La corrección destructiva automática sin validación ni aprobación puede interrumpir rotaciones legítimas de credenciales y excede la acción respaldada por la evidencia.",
            },
        },
        outcome: [
          "La cuenta de Jordan queda bloqueada y se revocan sus sesiones activas.",
          "Finance Data Exporter queda deshabilitada; se eliminan la credencial malintencionada y la asignación no autorizada del rol Contributor.",
          "El propietario del recurso rota las claves de la cuenta de almacenamiento de producción y actualiza las dependencias posteriores.",
          "El cuaderno de estrategias registra las acciones en el incidente y el analista verifica cada resultado en su sistema de origen.",
        ],
        hint: "Asigná una acción verificada a cada ruta de acceso: sesión de usuario, entidad de servicio, rol de Azure y credencial expuesta del recurso.",
        takeaway: "La automatización de Sentinel acelera la respuesta, pero los permisos, las aprobaciones, la validación del alcance y la verificación posterior a cada acción siguen siendo responsabilidad del analista.",
        references: {
          "path-7/p7-module-2": { reason: "Revisá las reglas de automatización, los desencadenadores, las condiciones, las tareas de incidentes y los límites de gobernanza." },
          "path-7/p7-module-3": { reason: "Revisá los cuadernos de estrategias de Sentinel, Logic Apps, los permisos, la ejecución a petición y los flujos de respuesta." },
        },
      },
      "sentinel-stage-5": {
        title: "Cerrar y mejorar la detección",
        objective: "Verificar la contención, clasificar el incidente con precisión y ajustar la regla sin ocultar ataques futuros.",
        briefing: "Todas las acciones de respuesta se completaron correctamente. Revisá el registro de la investigación y decidí cómo cerrar el incidente y mejorar la regla de análisis para futuras secuencias de abuso de credenciales.",
        evidence: {
          "sentinel-closure-evidence": {
            title: "Validación y revisión de la detección",
            facts: [
              "No se producen nuevos inicios de sesión ni operaciones para el usuario bloqueado o la entidad de servicio deshabilitada durante la ventana de monitoreo.",
              "La credencial de aplicación y la asignación de rol ya no están presentes, y las claves de almacenamiento anteriores dejaron de autenticar.",
              "La regla de análisis detectó correctamente el ataque, pero agrupó solamente por cuenta, lo que podría separar en otro incidente la actividad relacionada de la entidad de servicio.",
              "Una rotación aprobada desde un servidor de salto produjo una coincidencia parcial durante las pruebas retrospectivas.",
            ],
          },
        },
        decisionPrompt: "¿Cuál es la mejor decisión de cierre y ajuste?",
        options: {
            "sentinel-close-tune": {
              text: "Cerralo como verdadero positivo con actividad malintencionada, documentá la escala de tiempo, el alcance y la respuesta, mejorá las asignaciones de entidades y la agrupación de la aplicación y agregá una exclusión limitada para el servidor de salto aprobado, probada con datos históricos del ataque.",
              feedback: "Esto conserva un registro preciso del incidente y mejora la correlación, a la vez que limita la exclusión a infraestructura benigna verificada y comprueba que no se pierda capacidad de detección.",
            },
            "sentinel-close-monitor": {
              text: "Mantené el incidente Activo durante un período adicional de monitoreo y asignale un responsable documentado antes de aplicar el ajuste propuesto.",
              feedback: "Un monitoreo adicional puede estar justificado por la política de la organización, aunque la validación actual respalda el cierre una vez que se registre quién es responsable del ajuste.",
            },
            "sentinel-close-disable-rule": {
              text: "Deshabilitá la regla de análisis porque una rotación aprobada de credenciales coincidió parcialmente con su lógica.",
              feedback: "Deshabilitar la regla elimina la cobertura de un patrón de ataque confirmado en lugar de abordar la condición benigna específica.",
            },
            "sentinel-close-benign": {
              text: "Cerralo como positivo benigno porque las operaciones privilegiadas usaron credenciales válidas y API nativas de Azure.",
              feedback: "El uso de credenciales válidas y herramientas nativas es frecuente en ataques de identidad; la secuencia no autorizada y la persistencia confirmada respaldan la clasificación como actividad malintencionada.",
            },
        },
        outcome: [
          "El incidente se cierra como verdadero positivo con actividad malintencionada y conserva un registro completo de la investigación y la respuesta.",
          "La regla de análisis asigna entidades tanto de usuario como de aplicación en la nube y agrupa las alertas relacionadas mediante criterios de cuenta, aplicación y tiempo acotado.",
          "Antes de implementar una exclusión limitada para el servidor de salto administrado, esta se documenta, se somete a revisión por pares y se prueba con eventos históricos del ataque.",
        ],
        hint: "Ajustá la fuente precisa de la actividad benigna conocida mientras preservás la secuencia de comportamiento y la cobertura de entidades que permitieron detectar el ataque real.",
        takeaway: "Una buena ingeniería de detección convierte la evidencia de la investigación en correlaciones más seguras, exclusiones más limitadas e incidentes futuros más accionables.",
        references: {
          "path-7/p7-module-1": { reason: "Revisá la administración de reglas de análisis, la programación, la agrupación, las asignaciones, las plantillas y el ajuste." },
          "path-7/p7-module-4": { reason: "Revisá la clasificación de incidentes, los comentarios, la asignación, el cierre y los registros de investigación." },
        },
      },
    },
    debrief: {
      title: "Persistencia en la nube eliminada y cobertura de Sentinel mejorada",
      summary: "El atacante usó una sesión de usuario comprometida para crear una credencial de aplicación, otorgar privilegios en Azure y acceder a un recurso de producción. La investigación tuvo éxito al correlacionar varias tablas, expandirse desde las entidades del incidente hacia una búsqueda de amenazas basada en hipótesis, contener cada ruta de acceso de identidad y nube y convertir los hallazgos en un ajuste más seguro de la regla de análisis.",
      keyLessons: [
        "Validá la lógica de la regla de análisis y las asignaciones de entidades antes de tratar una alerta como una investigación completa.",
        "Correlacioná la actividad de identidad, auditoría y Azure mediante identificadores compartidos y ventanas de tiempo acotadas.",
        "Usá el comportamiento de las entidades y la búsqueda de amenazas para establecer el alcance más allá de la agrupación original del incidente.",
        "Combiná la automatización con permisos, aprobaciones, preservación de evidencia y verificación de acciones.",
        "Ajustá condiciones benignas específicas sin suprimir la secuencia de comportamiento malintencionado que la regla debe detectar.",
      ],
    },
  },
  "practice-lab-3": {
    title: "Investigar y contener un intento de ransomware con Defender for Endpoint",
    subtitle: "Usá evidencia de endpoints para reconstruir la ejecución, encontrar movimiento lateral, contener los dispositivos afectados y recuperarlos sin destruir su valor forense.",
    difficulty: "Intermedio",
    primaryDomain: "Responder a incidentes de seguridad",
    briefing: "Defender XDR correlaciona actividad sospechosa de procesos secundarios de Office, volcado de credenciales, creación remota de servicios y eliminación de instantáneas en una estación de trabajo de Finanzas y dos servidores. Los archivos todavía no están cifrados, pero la secuencia observada coincide con la preparación de un ataque de ransomware.",
    mission: "Reconstruí el ataque, determiná qué dispositivos e identidades están afectados, interrumpí el movimiento lateral antes del cifrado, preservá evidencia útil y validá una ruta de recuperación segura.",
    stages: {
      "endpoint-stage-1": {
        title: "Realizar el triage del incidente de ransomware",
        objective: "Priorizar el incidente y preservar su contexto correlacionado de endpoints antes de tomar medidas disruptivas.",
        briefing: "Un incidente de gravedad alta de Defender XDR llamado Multi-stage incident involving ransomware activity contiene alertas de FIN-WS-114, FILE-SRV-02 y APP-SRV-07.",
        evidence: {
          "endpoint-incident-summary": {
            title: "Cola de incidentes e historia del ataque",
            facts: [
              "El incidente está Nuevo, sin asignar y asociado a las tácticas Ejecución, Acceso a credenciales, Movimiento lateral e Impacto.",
              "La primera alerta ocurrió en FIN-WS-114 a las 09:42 UTC; las alertas de los servidores aparecieron 18 minutos después.",
              "Las entidades afectadas incluyen tres dispositivos, el usuario mia.hammond, un hash de archivo, una IP externa y el nombre de un servicio remoto.",
              "Todavía no se activó ninguna alerta de modificación masiva ni cifrado de archivos.",
            ],
          },
        },
        decisionPrompt: "¿Cuál es la mejor acción inicial?",
        options: {
          "endpoint-triage-story": {
            text: "Asigná el incidente, cambialo a Activo, validá la gravedad, revisá la historia completa del ataque y las entidades afectadas e identificá qué rutas de acceso requieren contención inmediata.",
            feedback: "Esto establece un responsable y usa la secuencia correlacionada para priorizar la contención antes de que el atacante llegue a la fase de cifrado.",
          },
          "endpoint-triage-isolate-one": {
            text: "Aislá inmediatamente FIN-WS-114 y continuá revisando las alertas de los servidores después de confirmar la contención de la estación de trabajo.",
            feedback: "Aislar el probable dispositivo inicial puede estar justificado, pero las alertas de los servidores muestran que el atacante podría tener otras rutas de acceso activas.",
          },
          "endpoint-triage-wait": {
            text: "Esperá una alerta de cifrado de archivos antes de escalar porque el ransomware todavía no fue confirmado.",
            feedback: "El volcado de credenciales, el movimiento lateral y la eliminación de instantáneas son precursores de alta confianza; esperar al cifrado le da tiempo al atacante para causar impacto.",
          },
          "endpoint-triage-alerts": {
            text: "Investigá cada alerta por separado y cerrá cualquiera que no haya modificado directamente un archivo.",
            feedback: "La historia del ataque depende de la relación entre ejecución, robo de credenciales, acceso remoto y preparación del impacto, no solamente de la actividad sobre archivos.",
          },
        },
        outcome: [
          "El incidente queda asignado, pasa a estado Activo y conserva la gravedad Alta.",
          "FIN-WS-114 se identifica como el primer dispositivo conocido, mientras que ambos servidores se consideran potencialmente comprometidos hasta revisar sus escalas de tiempo.",
        ],
        hint: "La respuesta ante ransomware debe comenzar antes del cifrado cuando las tácticas correlacionadas ya muestran ejecución, acceso a credenciales, movimiento lateral y preparación del impacto.",
        takeaway: "Un incidente correlacionado proporciona la secuencia y el contexto de entidades necesarios para contener el ransomware antes de que comience el impacto visible sobre el negocio.",
        references: {
          "path-1/module-2": { reason: "Revisá la asignación de incidentes, las historias de ataque, los recursos afectados, la gravedad y el ciclo de respuesta en Defender XDR." },
          "path-2/p2-module-4": { reason: "Revisá el inventario y las páginas de dispositivos, las escalas de tiempo, las alertas, los usuarios conectados y los pivotes de investigación." },
        },
      },
      "endpoint-stage-2": {
        title: "Reconstruir la ejecución en los endpoints",
        objective: "Usar evidencia de procesos, archivos, red y escalas de tiempo de los dispositivos para determinar qué se ejecutó y cómo se movió el atacante.",
        briefing: "El grafo del incidente indica que FIN-WS-114 es el punto de entrada. Revisá la escala de tiempo del dispositivo y las entidades de evidencia antes de decidir si la actividad de los servidores forma parte del mismo ataque.",
        evidence: {
          "endpoint-process-tree": {
            title: "Árbol de procesos de FIN-WS-114",
            facts: [
              "WINWORD.EXE abrió Invoice_Q4.docm e inició powershell.exe con un comando codificado.",
              "PowerShell descargó update.dat desde hxxps://cdn-finance-support.example y lo ejecutó mediante rundll32.exe.",
              "La carga accedió a la memoria de LSASS y creó C:\\ProgramData\\cache.bin.",
              "El usuario que había iniciado sesión era mia.hammond; el dispositivo no tenía actividad administrativa aprobada en ese momento.",
            ],
          },
          "endpoint-server-timeline": {
            title: "Hallazgos en la escala de tiempo de los servidores",
            facts: [
              "FIN-WS-114 se autenticó en FILE-SRV-02 y APP-SRV-07 con la cuenta de Mia.",
              "Un servicio remoto llamado WindowsUpdateCheck ejecutó el mismo hash de cache.bin en ambos servidores.",
              "FILE-SRV-02 ejecutó vssadmin.exe delete shadows /all /quiet.",
              "APP-SRV-07 recibió la carga, pero el bloqueo por comportamiento impidió su ejecución.",
            ],
          },
          "endpoint-network-evidence": {
            title: "Evidencia de red y archivos",
            facts: [
              "FIN-WS-114 y FILE-SRV-02 se conectaron a 203.0.113.84 mediante TCP 443.",
              "El SHA-256 de cache.bin es desconocido en la organización y tiene un veredicto malintencionado en la nube.",
              "El dominio de descarga fue registrado hace nueve días y aparece solamente en los tres dispositivos del incidente.",
            ],
          },
        },
        decisionPrompt: "¿Qué conclusión está mejor respaldada por la evidencia de los endpoints?",
        options: {
          "endpoint-analysis-ransomware": {
            text: "Un documento malintencionado ejecutó una carga en FIN-WS-114, robó o usó indebidamente las credenciales de Mia, se movió lateralmente mediante un servicio remoto y comenzó a preparar el impacto del ransomware en FILE-SRV-02.",
            feedback: "Esta conclusión explica la ascendencia de procesos, el hash compartido, la autenticación del usuario, el servicio remoto, la actividad de comando y control y la eliminación de instantáneas.",
          },
          "endpoint-analysis-workstation": {
            text: "FIN-WS-114 está comprometido, pero verificá el servicio remoto y el hash compartido antes de clasificar ambos servidores como parte del mismo ataque.",
            feedback: "Una verificación adicional es defendible, aunque el hash, la cuenta, el servicio, la IP y la secuencia compartidos ya establecen una relación sólida.",
          },
          "endpoint-analysis-admin": {
            text: "Las operaciones en los servidores probablemente sean legítimas porque los servicios remotos y vssadmin son herramientas nativas de administración de Windows.",
            feedback: "Los atacantes abusan con frecuencia de herramientas nativas; la legitimidad depende del actor, la ascendencia, el momento, el destino, la autorización y la evidencia circundante.",
          },
          "endpoint-analysis-blocked": {
            text: "APP-SRV-07 puede excluirse del incidente porque el bloqueo por comportamiento impidió que se ejecutara la carga.",
            feedback: "La prevención redujo el impacto, pero el dispositivo igualmente recibió la carga y la actividad del servicio remoto, por lo que deben validarse su exposición y persistencia.",
          },
        },
        outcome: [
          "La ruta de ejecución inicial se rastrea desde el documento malintencionado hasta PowerShell, rundll32, el acceso a credenciales y la creación remota del servicio.",
          "FILE-SRV-02 ejecutó la carga y eliminó las instantáneas; APP-SRV-07 recibió la carga, pero bloqueó su ejecución.",
        ],
        hint: "Concentrate en las relaciones entre procesos primarios y secundarios, los hashes compartidos, la autenticación del usuario, la creación remota de servicios, los destinos de red y los tiempos de los comandos.",
        takeaway: "La investigación de endpoints debe explicar la cadena de ejecución completa y distinguir la actividad intentada, bloqueada y exitosa en cada dispositivo.",
        references: {
          "path-2/p2-module-4": { reason: "Revisá las escalas de tiempo de dispositivos, los vínculos con incidentes, las alertas, los usuarios conectados y el bloqueo por comportamiento." },
          "path-2/p2-module-6": { reason: "Revisá las investigaciones de entidades de archivo, usuario, dirección IP y dominio en Defender for Endpoint." },
        },
      },
      "endpoint-stage-3": {
        title: "Determinar el alcance del ransomware",
        objective: "Buscar indicadores y comportamientos compartidos entre dispositivos e identidades sin asumir que el incidente contiene todos los recursos afectados.",
        briefing: "El incidente contiene tres dispositivos, pero la carga, el servicio remoto, la identidad comprometida y la infraestructura de comando y control podrían aparecer en otros lugares.",
        evidence: {
          "endpoint-hunting-pivots": {
            title: "Pivotes conocidos para la búsqueda de amenazas",
            facts: [
              "Pivotes de procesos: PowerShell codificado, rundll32 cargando cache.bin, eliminación de instantáneas mediante vssadmin y creación de servicios con sc.exe.",
              "Pivotes de entidades: la cuenta de Mia, el SHA-256 de cache.bin, WindowsUpdateCheck, el dominio de descarga y 203.0.113.84.",
              "Los datos relevantes incluyen DeviceProcessEvents, DeviceFileEvents, DeviceNetworkEvents, DeviceLogonEvents y DeviceEvents.",
              "La probable ventana del ataque comienza 30 minutos antes de la ejecución del documento y permanece abierta durante la validación de la contención.",
            ],
          },
        },
        decisionPrompt: "¿Cuál es el mejor enfoque para determinar el alcance?",
        options: {
          "endpoint-scope-behavior": {
            text: "Buscá en las tablas de endpoints mediante el hash, el dominio, la IP, el nombre del servicio, los comandos, la ascendencia de procesos, los inicios de sesión de Mia y una ventana de tiempo acotada; preservá como evidencia los dispositivos y eventos coincidentes.",
            feedback: "Esto combina indicadores de alta confianza con pivotes basados en comportamiento y puede encontrar actividad relacionada aunque cambie un observable.",
          },
          "endpoint-scope-hash": {
            text: "Buscá el hash del archivo malintencionado en todos los dispositivos y aislá cualquier coincidencia positiva antes de ampliar la búsqueda por comportamiento.",
            feedback: "El hash es un pivote sólido y accionable, pero una variante o una ejecución sin archivos podría evadir una búsqueda basada solamente en el hash.",
          },
          "endpoint-scope-incident": {
            text: "Limitá la contención a los tres dispositivos del incidente porque Defender XDR incluye automáticamente todos los endpoints relacionados.",
            feedback: "La correlación de incidentes está limitada por las detecciones, los tiempos y la lógica de agrupación; puede haber actividad relacionada fuera del incidente.",
          },
          "endpoint-scope-account": {
            text: "Buscá solamente los inicios de sesión interactivos de Mia porque el atacante no puede moverse lateralmente sin volver a usar esa misma cuenta.",
            feedback: "Los atacantes pueden usar inicios de sesión de red, tokens, cuentas de servicio, cuentas locales o ejecución remota sin otro inicio de sesión interactivo.",
          },
        },
        outcome: [
          "El hash y el servicio compartidos aparecen solamente en los tres dispositivos conocidos.",
          "La cuenta de Mia realizó un inicio de sesión de red en BACKUP-SRV-01, pero no fue seguido por ninguna carga, servicio, proceso sospechoso ni actividad de comando y control.",
          "Una cuarta estación de trabajo contactó el dominio malintencionado, pero SmartScreen bloqueó la descarga antes de que se creara o ejecutara el archivo.",
          "El alcance confirmado del compromiso incluye FIN-WS-114 y FILE-SRV-02; APP-SRV-07 permanece expuesto y requiere validación, mientras que la estación de trabajo protegida se documenta por separado.",
        ],
        hint: "Usá tanto observables como comportamientos. Un solo hash encuentra copias exactas; los comandos, la ascendencia, los servicios, las identidades y los patrones de red ponen a prueba la hipótesis más amplia del ataque.",
        takeaway: "El alcance del ransomware separa los dispositivos comprometidos, expuestos y protegidos correlacionando qué llegó, se ejecutó, persistió o fue bloqueado en cada recurso.",
        references: {
          "path-2/p2-module-6": { reason: "Revisá los pivotes de investigación de archivos, usuarios, direcciones IP y dominios en la evidencia de endpoints." },
          "path-4/p4-module-3": { reason: "Revisá la correlación KQL entre varias tablas para telemetría de procesos, archivos, red e inicios de sesión." },
        },
      },
      "endpoint-stage-4": {
        title: "Contener y preservar la evidencia",
        objective: "Detener el acceso activo desde endpoints e identidades mientras se recopila la evidencia necesaria para decidir la corrección y la recuperación.",
        briefing: "Se confirmó el compromiso de FIN-WS-114 y FILE-SRV-02. APP-SRV-07 bloqueó la ejecución, pero recibió la carga y el servicio remoto. Los responsables del negocio aprueban la contención de emergencia.",
        evidence: {
          "endpoint-response-controls": {
            title: "Acciones de respuesta disponibles",
            facts: [
              "Los tres dispositivos están incorporados y en estado correcto en Defender for Endpoint.",
              "El aislamiento conserva la comunicación con el servicio Defender; están permitidos Live Response y la recopilación del paquete de investigación.",
              "El archivo malintencionado puede ponerse en cuarentena y un indicador de archivo para toda la organización puede bloquear su ejecución.",
              "La cuenta y las sesiones de Mia continúan activas; FILE-SRV-02 aloja un recurso compartido crítico con un plan de recuperación aprobado.",
            ],
          },
        },
        decisionPrompt: "¿Qué plan de respuesta se ajusta mejor a la evidencia y al riesgo para el negocio?",
        options: {
          "endpoint-response-coordinated": {
            text: "Aislá los dispositivos comprometidos y expuestos, revocá las sesiones de Mia y deshabilitá su cuenta, recopilá paquetes de investigación, usá Live Response para una validación dirigida, poné la carga en cuarentena, bloqueá los indicadores confirmados, detené el servicio malintencionado y coordiná la recuperación del servidor después de capturar la evidencia.",
            feedback: "Esto interrumpe el acceso mediante dispositivos, identidad, carga, servicio y red mientras conserva la evidencia y la conectividad con Defender para realizar validaciones.",
          },
          "endpoint-response-priority": {
            text: "Aislá de inmediato FIN-WS-114 y FILE-SRV-02, revocá el acceso de Mia y luego validá APP-SRV-07 antes de decidir si su exposición requiere mantener el aislamiento.",
            feedback: "Priorizar el compromiso confirmado es defendible si APP-SRV-07 continúa bajo monitoreo activo y su exposición al servicio remoto se resuelve rápidamente.",
          },
          "endpoint-response-wipe": {
            text: "Borrá inmediatamente los tres dispositivos para garantizar la eliminación antes de recopilar paquetes o revisar la persistencia.",
            feedback: "El borrado inmediato destruye evidencia volátil y forense, puede complicar el análisis de la causa raíz y no aborda la identidad comprometida ni otras rutas de acceso.",
          },
          "endpoint-response-file": {
            text: "Poné cache.bin en cuarentena y cerrá el incidente porque la carga de ransomware conocida ya no puede ejecutarse.",
            feedback: "Eliminar un archivo no revoca credenciales robadas, elimina servicios o persistencia alternativa, detiene el acceso remoto ni valida la integridad del servidor.",
          },
        },
        outcome: [
          "FIN-WS-114, FILE-SRV-02 y APP-SRV-07 quedan aislados, pero conservan la conectividad con Defender.",
          "La cuenta de Mia queda deshabilitada y sus sesiones activas son revocadas; los paquetes de investigación se recopilan antes de cualquier corrección destructiva.",
          "El archivo malintencionado queda en cuarentena, se bloquean su hash y sus indicadores de red y se elimina WindowsUpdateCheck.",
          "Live Response confirma que no hay otras ejecuciones automáticas ni tareas programadas asociadas al ataque en APP-SRV-07.",
        ],
        hint: "Asigná la contención a las rutas de dispositivo, identidad, carga, persistencia y red, y preservá la evidencia antes de reconstruir o borrar los sistemas.",
        takeaway: "La contención efectiva de endpoints combina aislamiento, respuesta sobre identidades, recopilación de evidencia, corrección dirigida, bloqueo de indicadores y verificación.",
        references: {
          "path-2/p2-module-5": { reason: "Revisá el aislamiento de dispositivos, los exámenes antivirus, los paquetes de investigación, Live Response y la gobernanza de acciones sobre dispositivos." },
          "path-2/p2-module-8": { reason: "Revisá los indicadores de archivo y red, los controles de alertas y la configuración de detecciones." },
          "path-2/p2-module-7": { reason: "Revisá la investigación automatizada, la configuración de corrección y el bloqueo de dispositivos en riesgo." },
        },
      },
      "endpoint-stage-5": {
        title: "Validar la recuperación y cerrar",
        objective: "Confirmar la erradicación, restaurar los servicios empresariales de manera segura, clasificar el incidente y reducir el riesgo de recurrencia.",
        briefing: "La contención terminó. FIN-WS-114 será reconstruido, FILE-SRV-02 se recuperará desde una copia de seguridad protegida y APP-SRV-07 requiere una validación final antes de salir del aislamiento.",
        evidence: {
          "endpoint-recovery-status": {
            title: "Estado de recuperación y validación",
            facts: [
              "Ningún dispositivo afectado contacta la IP de comando y control después de la contención.",
              "Los exámenes de Defender Antivirus y las comprobaciones de Live Response no encuentran cargas, servicios ni persistencia restantes en APP-SRV-07.",
              "Los datos de FILE-SRV-02 se restauran en un host de reemplazo limpio desde la última copia de seguridad protegida anterior a la eliminación de instantáneas.",
              "El documento malintencionado ingresó mediante un flujo heredado de macros de Office; una recomendación aplicable de reducción de la superficie expuesta a ataques continúa sin implementar.",
            ],
          },
        },
        decisionPrompt: "¿Cuál es la mejor decisión de cierre y recuperación?",
        options: {
          "endpoint-close-validated": {
            text: "Liberá APP-SRV-07 solamente después de validarlo, reconstruí la estación de trabajo comprometida, recuperá el servidor de archivos desde la copia limpia, cerrá como verdadero positivo con actividad malintencionada, documentá toda la respuesta y creá una corrección con seguimiento para la macro y la brecha de reducción de la superficie expuesta a ataques.",
            feedback: "Esto vincula la restauración con un estado verificado de los dispositivos, preserva una clasificación precisa y aborda la debilidad de control que permitió la ejecución inicial.",
          },
          "endpoint-close-monitor": {
            text: "Mantené APP-SRV-07 aislado durante un período adicional de monitoreo mientras restaurás los sistemas comprometidos confirmados y asignás un responsable para la corrección del control de seguridad.",
            feedback: "Un tiempo adicional de validación puede estar justificado para un servidor crítico, siempre que el responsable, los criterios de liberación y el impacto empresarial sean explícitos.",
          },
          "endpoint-close-release-all": {
            text: "Liberá todos los dispositivos del aislamiento una vez bloqueado el hash malintencionado porque la carga ya no puede volver a ejecutarse.",
            feedback: "El bloqueo de un hash no demuestra que se hayan eliminado cargas alternativas, persistencia, credenciales comprometidas ni daños en el estado del sistema.",
          },
          "endpoint-close-false": {
            text: "Cerrá como falso positivo porque el bloqueo por comportamiento impidió que se completara el cifrado.",
            feedback: "La prevención redujo el impacto, pero no convierte en benigna la ejecución confirmada, el abuso de credenciales, el movimiento lateral ni la eliminación de instantáneas.",
          },
        },
        outcome: [
          "APP-SRV-07 supera la validación y sale del aislamiento bajo monitoreo reforzado.",
          "FIN-WS-114 se reconstruye y FILE-SRV-02 se restaura en un host de reemplazo limpio antes de reanudar el acceso de producción.",
          "El incidente se cierra como verdadero positivo con actividad malintencionada y registra la escala de tiempo, el alcance, la evidencia, las acciones, la validación y las decisiones de recuperación.",
          "Se asigna una recomendación de seguridad para restringir los procesos secundarios de Office y retirar el flujo heredado de macros.",
        ],
        hint: "La recuperación termina solamente cuando se verifica la erradicación, se restauran los datos empresariales desde un punto confiable, se documenta el incidente y la brecha de control que lo permitió tiene un responsable.",
        takeaway: "El cierre de un ransomware combina validación técnica, recuperación confiable, clasificación respaldada por evidencia y una reducción medible de la ruta de ataque original.",
        references: {
          "path-2/p2-module-5": { reason: "Revisá las acciones sobre dispositivos y las técnicas de validación usadas antes de liberar recursos aislados." },
          "path-2/p2-module-9": { reason: "Revisá las recomendaciones de seguridad, la exposición a vulnerabilidades, la asignación de correcciones y la reducción de riesgos." },
          "path-1/module-2": { reason: "Revisá la clasificación como verdadero positivo, la documentación del incidente, el seguimiento de la respuesta y el cierre." },
        },
      },
    },
    debrief: {
      title: "Cifrado impedido y recuperación completada desde un estado confiable",
      summary: "El atacante usó un documento malintencionado para ejecutar código, acceder a credenciales, moverse lateralmente y preparar un servidor de archivos para el impacto de un ransomware. La respuesta impidió el cifrado al correlacionar temprano el comportamiento de los endpoints, distinguir dispositivos comprometidos de expuestos, contener el acceso tanto de endpoints como de identidades, preservar la evidencia antes de la corrección y validar la recuperación desde fuentes confiables.",
      keyLessons: [
        "Tratá los comportamientos precursores de ransomware como una oportunidad de contener antes del cifrado, no como un motivo para esperar el impacto.",
        "Usá la ascendencia de procesos, las escalas de tiempo de dispositivos, las entidades compartidas y la actividad de red para reconstruir el movimiento lateral.",
        "Determiná el alcance mediante indicadores exactos y búsquedas basadas en comportamiento en toda la telemetría de endpoints.",
        "Preservá la evidencia antes de borrar o reconstruir y asigná acciones de respuesta a cada ruta de acceso activa.",
        "Validá la erradicación y una recuperación confiable antes de liberar recursos; luego corregí la brecha de control que permitió la ejecución.",
      ],
    },
  },
  "practice-lab-4": {
    title: "Investigar una carga de trabajo en la nube comprometida con Defender for Cloud",
    subtitle: "Correlacioná alertas de cargas de trabajo y hallazgos de postura para contener una VM comprometida y eliminar la ruta de ataque que la expuso.",
    difficulty: "Intermedio",
    primaryDomain: "Mitigar amenazas mediante Microsoft Defender for Cloud",
    briefing: "Defender for Cloud genera alertas por autenticación sospechosa, un proceso de criptominería y acceso inusual a Key Vault relacionados con una VM de Azure expuesta a Internet. La carga de trabajo pertenece a una aplicación de análisis de producción y usa una identidad administrada con acceso a varios recursos en la nube.",
    mission: "Validá el compromiso, reconstruí la actividad de la carga de trabajo y del plano de control, determiná los recursos afectados, contené al atacante preservando la evidencia y corregí las debilidades de postura que crearon la ruta de ataque.",
    stages: {
      "cloud-stage-1": {
        title: "Realizar el triage de las alertas de seguridad en la nube",
        objective: "Priorizar el grupo de alertas y validar el contexto de la carga de trabajo, la cobertura y las rutas de ataque expuestas.",
        briefing: "Tres alertas de gravedad alta hacen referencia a la VM az-prod-analytics-03 de la suscripción PROD-DATA. Defender for Servers está habilitado y las alertas también están conectadas a un incidente de Microsoft Sentinel.",
        evidence: {
          "cloud-alert-summary": {
            title: "Resumen de alertas de Defender for Cloud",
            facts: [
              "Alertas: inicio de sesión SSH exitoso mediante fuerza bruta, comportamiento de criptominería detectado y operación anómala de Key Vault realizada por una identidad administrada.",
              "La primera sesión SSH exitosa ocurrió a las 03:18 UTC desde 203.0.113.206; la actividad de minería comenzó siete minutos después.",
              "El contexto del recurso muestra una IP pública y una regla de NSG que permite TCP 22 desde Internet.",
              "La VM está etiquetada como producción, no tiene una ventana de mantenimiento aprobada y continúa en línea.",
            ],
          },
          "cloud-coverage-summary": {
            title: "Contexto de protección y postura",
            facts: [
              "Defender for Servers Plan 2 y el examen sin agente están habilitados para la suscripción.",
              "La VM tiene una identidad administrada asignada por el sistema y pertenece al grupo de recursos analytics-prod.",
              "Una recomendación de gravedad alta para cerrar los puertos de administración lleva 19 días en estado incorrecto.",
              "La recomendación no tiene exención, responsable ni fecha límite de corrección.",
            ],
          },
        },
        decisionPrompt: "¿Cuál es la mejor acción inicial?",
        options: {
          "cloud-triage-correlate": {
            text: "Asigná y activá el incidente, revisá las escalas de tiempo de las alertas de Defender for Cloud y los recursos afectados, validá la ruta de ataque del puerto de administración abierto e identificá el acceso a la carga de trabajo y a la identidad que requiere contención urgente.",
            feedback: "Esto conecta las alertas de amenazas con el contexto de la carga de trabajo y la debilidad de postura que permitió el acceso, y establece un responsable antes de responder.",
          },
          "cloud-triage-stop-vm": {
            text: "Detené inmediatamente la VM para interrumpir la minería e investigá la actividad de identidad y Key Vault después de desconectar la carga de trabajo.",
            feedback: "Detener la VM puede reducir el impacto activo, pero la evidencia, el acceso de la identidad administrada, los controles de red y la recuperación empresarial todavía requieren coordinación.",
          },
          "cloud-triage-suppress": {
            text: "Suprimí la alerta de criptominería porque las cargas de trabajo de análisis de producción suelen consumir una cantidad considerable de CPU.",
            feedback: "El consumo de recursos por sí solo puede ser benigno, pero el compromiso por SSH y el acceso anómalo a Key Vault correlacionados no respaldan la supresión.",
          },
          "cloud-triage-recommendation": {
            text: "Corregí la recomendación de SSH abierto y cerrá las alertas sin revisar la actividad que ya ocurrió.",
            feedback: "Cerrar la exposición no elimina al atacante, la persistencia, los secretos robados ni los procesos malintencionados ya presentes en la carga de trabajo.",
          },
        },
        outcome: [
          "Las alertas se confirman como una secuencia conectada que incluye acceso externo, ejecución en la carga de trabajo y actividad de una identidad administrada.",
          "La regla de SSH abierta se identifica como una ruta de ataque activa y no como un problema aislado de higiene.",
        ],
        hint: "Usá ambas caras de Defender for Cloud: las alertas de protección de cargas de trabajo explican qué ocurrió, mientras que las recomendaciones de postura explican cómo quedó expuesto el recurso.",
        takeaway: "El triage de incidentes en la nube combina evidencia de alertas, contexto del recurso, cobertura de protección y las debilidades de postura que forman una ruta de ataque práctica.",
        references: {
          "path-3/p3-module-6": { reason: "Revisá las alertas de Defender for Cloud, los recursos afectados, la corrección, la automatización de respuestas, la supresión y el contexto de inteligencia sobre amenazas." },
          "path-3/p3-module-4": { reason: "Revisá las recomendaciones, la Puntuación de seguridad, la gobernanza, el cumplimiento y la priorización de la postura de nube." },
        },
      },
      "cloud-stage-2": {
        title: "Reconstruir la actividad de la carga de trabajo y la identidad",
        objective: "Determinar qué se ejecutó en la VM y si la identidad de la carga de trabajo se usó para acceder a otros recursos en la nube.",
        briefing: "El grupo de alertas confirma actividad sospechosa, pero la contención depende de comprender la sesión del atacante, los procesos, la persistencia, el tráfico saliente y las operaciones de la identidad administrada.",
        evidence: {
          "cloud-vm-evidence": {
            title: "Evidencia de procesos y red de la VM",
            facts: [
              "La sesión SSH se autenticó como legacyops mediante una contraseña desde 203.0.113.206.",
              "La sesión descargó /tmp/azmon desde mining-update.example y lo ejecutó como un servicio systemd llamado az-health-agent.",
              "El binario abrió una conexión persistente a 198.51.100.92:4444 y consumió más del 90 por ciento de la CPU.",
              "El atacante consultó Azure Instance Metadata Service para obtener un token de identidad administrada.",
            ],
          },
          "cloud-identity-evidence": {
            title: "Evidencia de la identidad administrada y Key Vault",
            facts: [
              "La identidad de la VM solicitó un token para Azure Key Vault seis minutos después de la ejecución de la carga.",
              "Enumeró los secretos de kv-prod-analytics y recuperó db-export-password.",
              "La identidad tiene el rol Key Vault Secrets User en dos almacenes, pero solamente kv-prod-analytics muestra acceso durante la ventana del incidente.",
              "El propietario de la aplicación confirma que la VM normalmente lee otro secreto mediante la aplicación, nunca desde una secuencia de shell interactiva.",
            ],
          },
          "cloud-control-plane-evidence": {
            title: "Evidencia del plano de control de Azure",
            facts: [
              "Durante el incidente no se realizaron cambios de NSG, asignaciones de roles, discos, instantáneas ni extensiones.",
              "La cuenta local legacyops fue agregada a sudoers dos semanas antes mediante un script de implementación aprobado, pero la autenticación por contraseña debería haberse deshabilitado después.",
              "La contraseña expuesta aparece en un documento vencido de traspaso de operaciones.",
            ],
          },
        },
        decisionPrompt: "¿Qué conclusión está mejor respaldada por la evidencia?",
        options: {
          "cloud-analysis-compromise": {
            text: "Un atacante se autenticó mediante credenciales SSH expuestas, estableció persistencia de minería, obtuvo el token de identidad administrada de la VM y usó sus permisos excesivos de Key Vault para recuperar un secreto de producción.",
            feedback: "Esta conclusión explica la secuencia de autenticación, proceso, persistencia, red saliente, servicio de metadatos, identidad y Key Vault.",
          },
          "cloud-analysis-mining-only": {
            text: "La VM está comprometida para criptominería, pero validá el token de identidad administrada y la operación de Key Vault antes de considerar expuesto el secreto de producción.",
            feedback: "Una validación adicional es razonable, aunque la solicitud del token y la recuperación exitosa del secreto ya justifican considerarlo comprometido.",
          },
          "cloud-analysis-normal-identity": {
            text: "La actividad de Key Vault es benigna porque la identidad administrada ya tenía permiso para leer secretos.",
            feedback: "La autorización no establece legitimidad; la operación ocurrió dentro de una sesión controlada por el atacante y se desvió del comportamiento normal de la carga de trabajo.",
          },
          "cloud-analysis-no-control-plane": {
            text: "El incidente afecta solamente la capacidad de CPU porque no se modificó ninguna configuración del plano de control de Azure.",
            feedback: "El compromiso de la carga de trabajo, la persistencia, el robo de tokens de identidad y el acceso a secretos en el plano de datos pueden ocurrir sin modificar la configuración de Resource Manager.",
          },
        },
        outcome: [
          "La ruta de ataque se reconstruye desde el SSH expuesto hasta la ejecución en la carga de trabajo, la persistencia, la obtención del token de metadatos y la recuperación del secreto de Key Vault.",
          "La credencial de la base de datos de producción se considera comprometida aunque no se haya producido ningún cambio en el plano de control.",
        ],
        hint: "Separá las operaciones del plano de control de la actividad de la carga de trabajo y del plano de datos; la ausencia de cambios en Resource Manager no hace que la VM o el secreto sean seguros.",
        takeaway: "Las investigaciones de cargas de trabajo en la nube deben correlacionar actividad del host, configuración de recursos, tokens de identidad y acceso posterior al plano de datos.",
        references: {
          "path-3/p3-module-5": { reason: "Revisá las señales de protección de Defender for Servers, Key Vault, Resource Manager, DNS, Storage y otras cargas de trabajo." },
          "path-3/p3-module-6": { reason: "Revisá la evidencia de alertas y los flujos de respuesta para recursos de Azure comprometidos." },
        },
      },
      "cloud-stage-3": {
        title: "Determinar el radio de impacto en la nube",
        objective: "Usar el inventario de recursos, los pivotes de alertas, las identidades y las relaciones de configuración para distinguir recursos comprometidos de otros expuestos de forma similar.",
        briefing: "La suscripción contiene otras VM de análisis creadas con la misma plantilla. La IP de origen, el binario, la cuenta local, los permisos de identidad administrada y la exposición pública de administración son pivotes de investigación.",
        evidence: {
          "cloud-scope-pivots": {
            title: "Inventario de recursos y pivotes de alcance",
            facts: [
              "El inventario de recursos muestra seis VM con la etiqueta analytics-prod; tres tienen direcciones IP públicas.",
              "Dos VM comparten la cuenta legacyops y una regla de SSH abierta a Internet; solamente az-prod-analytics-03 muestra el binario, el servicio, la IP o la alerta de minería malintencionados.",
              "La IP de origen intentó conectarse por SSH a la segunda VM expuesta, pero no logró autenticarse.",
              "La identidad administrada es exclusiva de az-prod-analytics-03; ningún otro principal inesperado accedió al secreto recuperado de la base de datos.",
            ],
          },
          "cloud-secret-scope": {
            title: "Revisión del uso posterior del secreto",
            facts: [
              "Los registros de autenticación de la base de datos no muestran usos exitosos de db-export-password desde un origen nuevo después de su recuperación.",
              "El secreto otorga acceso de lectura a una base de datos de exportación, pero no acceso administrativo ni de escritura.",
              "Durante la ventana del ataque no se recuperó ningún otro secreto de los dos almacenes permitidos.",
            ],
          },
        },
        decisionPrompt: "¿Cuál es el mejor plan para determinar el alcance?",
        options: {
          "cloud-scope-relations": {
            text: "Usá como pivotes el inventario de recursos, las alertas, la IP de origen y el binario, la configuración de la cuenta local, la exposición pública de SSH, los permisos de la identidad administrada, las operaciones de Key Vault y el uso posterior de la credencial recuperada.",
            feedback: "Esto determina el alcance del compromiso y de la ruta de ataque entre recursos, configuración, identidad, secretos y sistemas posteriores sin equiparar exposición con compromiso exitoso.",
          },
          "cloud-scope-exposed": {
            text: "Considerá comprometidas ambas VM que comparten la cuenta y la regla pública de SSH y aislaslas mientras continúa la validación detallada.",
            feedback: "La contención preventiva puede estar justificada ante una exposición de alto riesgo, pero los registros de la investigación deben distinguir el compromiso confirmado de la exposición y del acceso fallido.",
          },
          "cloud-scope-alert-only": {
            text: "Limitá el alcance a az-prod-analytics-03 porque Defender for Cloud no generó alertas para ningún otro recurso.",
            feedback: "Las alertas reflejan las detecciones observadas; el inventario, la configuración, la identidad y los datos posteriores pueden revelar riesgo o actividad relacionada sin una alerta.",
          },
          "cloud-scope-public-all": {
            text: "Declará comprometida toda VM con una IP pública y comenzá a reconstruirlas inmediatamente.",
            feedback: "Una IP pública representa contexto de exposición, no prueba de acceso exitoso ni ejecución malintencionada; reconstruir sin discriminar causa impacto innecesario y destruye evidencia.",
          },
        },
        outcome: [
          "az-prod-analytics-03 es la única carga de trabajo con compromiso confirmado.",
          "az-prod-analytics-02 se clasifica como críticamente expuesta después de un intento de ataque fallido y requiere protección inmediata y eliminación de credenciales.",
          "Las demás VM de análisis no tienen indicadores coincidentes y no exponen SSH a Internet.",
          "No se observa abuso de la credencial recuperada de la base de datos, pero sigue considerándose comprometida y debe rotarse.",
        ],
        hint: "Determiná el alcance tanto de la actividad malintencionada como de la configuración que la permitió, pero registrá por separado qué fue comprometido, intentado, expuesto y no afectado.",
        takeaway: "El radio de impacto en la nube se establece mediante las relaciones entre recursos y el acceso de identidades, no simplemente contando alertas o endpoints públicos.",
        references: {
          "path-3/p3-module-2": { reason: "Revisá el inventario de recursos de Defender for Cloud, el filtrado, el estado de cobertura y el contexto de aprovisionamiento." },
          "path-3/p3-module-4": { reason: "Revisá las recomendaciones, los recursos afectados, la priorización de rutas de ataque y la gobernanza de postura." },
        },
      },
      "cloud-stage-4": {
        title: "Contener la carga de trabajo y las rutas de acceso",
        objective: "Detener el acceso de proceso, red, identidad y secretos preservando la evidencia y manteniendo una ruta de recuperación controlada.",
        briefing: "La VM comprometida continúa minando y su identidad administrada todavía puede acceder a Key Vault. La segunda VM sigue expuesta por SSH, pero no muestra un compromiso exitoso.",
        evidence: {
          "cloud-response-readiness": {
            title: "Preparación para la respuesta y dependencias",
            facts: [
              "El equipo de producción puede desviar el tráfico de análisis a una instancia correcta del conjunto de escalado.",
              "Los controles de red pueden poner en cuarentena la VM comprometida y conservar el acceso desde una subred forense aprobada.",
              "Se puede capturar una instantánea del disco antes de reconstruir; la identidad administrada puede deshabilitarse y sus asignaciones de roles pueden eliminarse.",
              "El propietario de la base de datos puede rotar db-export-password y confirmar las actualizaciones de la aplicación dentro de la ventana de respuesta.",
            ],
          },
        },
        decisionPrompt: "¿Qué plan de respuesta aborda mejor el alcance confirmado y la ruta de ataque?",
        options: {
          "cloud-response-coordinated": {
            text: "Desviá el tráfico, poné en cuarentena la VM comprometida, capturá el disco y los registros relevantes, deshabilitá la identidad administrada y eliminá los roles excesivos, rotá el secreto de la base de datos, cerrá el SSH público en ambas VM expuestas, eliminá la cuenta heredada y reconstruí la carga comprometida desde una imagen confiable.",
            feedback: "Esto contiene las rutas de proceso, red, identidad, credenciales y configuración mientras preserva la evidencia y permite una recuperación controlada.",
          },
          "cloud-response-quarantine-first": {
            text: "Poné inmediatamente en cuarentena az-prod-analytics-03 y deshabilitá su identidad; luego coordiná la captura de evidencia, la rotación del secreto, la corrección de la exposición y una reconstrucción confiable.",
            feedback: "Priorizar el acceso activo es defendible mientras continúen la minería y el abuso de identidad, siempre que la evidencia y la corrección restante tengan responsables explícitos.",
          },
          "cloud-response-delete": {
            text: "Eliminá inmediatamente la VM y sus discos y volvé a implementar la misma plantilla para restaurar producción rápidamente.",
            feedback: "La eliminación destruye evidencia, conserva sin cambios la plantilla y las credenciales expuestas y puede recrear la misma ruta de ataque.",
          },
          "cloud-response-nsg-only": {
            text: "Cerrá la regla de SSH desde Internet y liberá la VM porque el atacante ya no puede establecer una nueva sesión entrante.",
            feedback: "El atacante ya cuenta con persistencia, un canal saliente, una ruta al token de identidad administrada y un secreto recuperado; proteger solamente la red es insuficiente.",
          },
        },
        outcome: [
          "El tráfico se desvía y la VM comprometida queda en cuarentena, conservando el acceso forense.",
          "La evidencia del disco y de las alertas se preserva antes de reconstruir la VM desde una imagen corregida y protegida.",
          "La identidad administrada queda deshabilitada, se eliminan los roles excesivos y db-export-password se rota y vuelve a implementarse.",
          "Se eliminan el SSH público y la cuenta legacyops de ambas VM expuestas; la administración se traslada a una ruta privada aprobada.",
        ],
        hint: "Asigná la respuesta al proceso de la carga, la persistencia, la exposición entrante, el canal saliente, la identidad administrada, el secreto recuperado y la plantilla de implementación vulnerable.",
        takeaway: "La contención en la nube debe abordar la carga de trabajo en ejecución y las identidades, los secretos, las rutas de red y la configuración de infraestructura que sostienen el acceso.",
        references: {
          "path-3/p3-module-6": { reason: "Revisá las acciones de respuesta, la automatización, las protecciones de supresión, los informes de amenazas y la corrección de alertas para recursos de Azure." },
          "path-3/p3-module-5": { reason: "Revisá las protecciones de cargas de trabajo para Servers, Key Vault, Resource Manager, DNS y servicios en la nube relacionados." },
        },
      },
      "cloud-stage-5": {
        title: "Validar la recuperación y mejorar la postura",
        objective: "Verificar la erradicación, cerrar con precisión y convertir los hallazgos del incidente en mejoras de postura gobernadas.",
        briefing: "La carga de trabajo fue reconstruida y restaurada detrás de controles de administración privados. Validá la recuperación y decidí cómo las recomendaciones, la Puntuación de seguridad y la gobernanza deben reflejar las lecciones del incidente.",
        evidence: {
          "cloud-validation-status": {
            title: "Validación de recuperación y postura",
            facts: [
              "La VM de reemplazo usa una imagen protegida, administración privada, acceso basado en claves, revisiones actuales y no tiene la cuenta legacyops.",
              "Durante el monitoreo no aparecen procesos de minería, servicios de persistencia, tráfico saliente malintencionado ni actividad de identidad anómala.",
              "La credencial rotada de la base de datos funciona solamente desde identidades de aplicación aprobadas.",
              "La recomendación sobre puertos de administración tiene un estado correcto para ambas VM afectadas, pero cuatro VM de desarrollo en otra suscripción continúan en estado incorrecto.",
            ],
          },
          "cloud-governance-status": {
            title: "Contexto de gobernanza y Puntuación de seguridad",
            facts: [
              "La recomendación original permaneció sin resolver porque no tenía un responsable ni una fecha límite.",
              "Una regla de gobernanza puede asignar las recomendaciones de exposición a Internet de gravedad alta al equipo de Plataforma en la nube con un plazo de corrección de siete días.",
              "No existe una justificación empresarial que respalde una exención para puertos de administración sin restricciones.",
            ],
          },
        },
        decisionPrompt: "¿Cuál es la mejor decisión de cierre y postura?",
        options: {
          "cloud-close-governed": {
            text: "Cerrá como verdadero positivo con actividad malintencionada, documentá la ruta de ataque desde la carga de trabajo hasta la identidad y la respuesta, asigná una corrección gobernada para todas las exposiciones restantes de administración pública, definí responsables y fechas límite y monitoreá la recomendación y la tendencia de la Puntuación de seguridad.",
            feedback: "Esto registra con precisión el incidente confirmado y convierte la brecha de postura que lo permitió en una corrección medible y con responsables en todo el entorno.",
          },
          "cloud-close-production": {
            text: "Cerrá el incidente después de validar la recuperación de producción y creá una iniciativa de postura separada y con seguimiento para las exposiciones de desarrollo restantes.",
            feedback: "Separar el cierre del incidente del trabajo de postura más amplio es razonable si el riesgo restante tiene responsables, alcance, prioridad y plazos definidos.",
          },
          "cloud-close-exempt-dev": {
            text: "Eximí todas las VM de desarrollo de la recomendación sobre puertos de administración porque no son cargas de trabajo de producción.",
            feedback: "El nivel del entorno no elimina el riesgo de la ruta de ataque; las exenciones requieren una justificación empresarial específica, controles compensatorios, alcance y vencimiento.",
          },
          "cloud-close-benign": {
            text: "Cerrá como positivo benigno porque la criptominería consumió capacidad de proceso, pero no modificó la aplicación ni la base de datos.",
            feedback: "La ejecución no autorizada, la persistencia, el abuso de tokens de identidad y la recuperación de secretos son actividades malintencionadas aunque no se observe un impacto destructivo sobre los datos.",
          },
        },
        outcome: [
          "El incidente se cierra como verdadero positivo con actividad malintencionada y documenta la ruta de ataque, el alcance, la evidencia, la respuesta y la validación completos.",
          "Las recomendaciones de gravedad alta sobre administración pública reciben responsables, plazos de siete días y escalamiento mediante una regla de gobernanza.",
          "Las exposiciones de desarrollo restantes ingresan en una corrección con seguimiento y sin exenciones amplias; el progreso de la postura se monitorea mediante recomendaciones y la Puntuación de seguridad.",
        ],
        hint: "Un incidente cerrado debe dejar un registro preciso y un mecanismo gobernado que impida que la misma debilidad de postura continúe indefinidamente en otras partes.",
        takeaway: "Defender for Cloud conecta la respuesta ante amenazas con la administración de postura al convertir la ruta de ataque en una corrección priorizada, asignada y medible.",
        references: {
          "path-3/p3-module-4": { reason: "Revisá la Puntuación de seguridad, las recomendaciones, la gobernanza, las exenciones, el cumplimiento y el monitoreo de postura." },
          "path-3/p3-module-6": { reason: "Revisá la clasificación de alertas, la corrección, la respuesta, la automatización, la supresión y el cierre." },
        },
      },
    },
    debrief: {
      title: "Carga de trabajo comprometida reconstruida y ruta de ataque en la nube eliminada",
      summary: "El atacante usó credenciales SSH expuestas para comprometer una VM de producción, establecer persistencia de minería, obtener un token de identidad administrada y recuperar un secreto de Key Vault. La respuesta tuvo éxito al correlacionar evidencia de la carga de trabajo, la identidad, el plano de datos y la postura; distinguir compromiso de exposición; contener todas las rutas de acceso; preservar la evidencia y gobernar la misma recomendación de seguridad en todo el entorno.",
      keyLessons: [
        "Usá juntas las alertas de protección de cargas de trabajo y las recomendaciones de postura para comprender tanto la actividad como la exposición.",
        "Investigá la evidencia del host, el plano de control, la identidad y el plano de datos aunque no se haya modificado ninguna configuración de Azure.",
        "Distinguí compromiso confirmado, intentos fallidos, exposición crítica y recursos no afectados al determinar el alcance en la nube.",
        "Contené las rutas de proceso, red, identidad, secretos y plantillas de infraestructura antes de una recuperación confiable.",
        "Convertí los hallazgos del incidente en recomendaciones con responsables, plazos y mejoras de postura medibles, en lugar de exenciones amplias.",
      ],
    },
  },
};
