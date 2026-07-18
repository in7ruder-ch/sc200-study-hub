import type { ExamBlueprintTranslation } from "../types";

export const spanishExamBlueprint: ExamBlueprintTranslation = {
  title: "Temario del examen SC-200",
  effectiveDate: "28 de julio de 2026",
  domains: {
    "bp-domain-1": {
      title: "Administrar un entorno de operaciones de seguridad",
      description: "Automatización, configuración de Sentinel, ingesta e ingeniería de detecciones",
      groups: {
        "bp-domain-1-group-1": {
          title: "Configurar la automatización para Microsoft Defender XDR y Microsoft Sentinel",
          objectives: {
            "bp-objective-1": { text: "Configurar notificaciones por correo electrónico en Microsoft Defender XDR, incluidos incidentes, acciones y análisis de amenazas." },
            "bp-objective-2": { text: "Configurar notificaciones de alertas en Microsoft Defender XDR, incluidos el ajuste, la supresión y la correlación." },
            "bp-objective-3": { text: "Configurar las características avanzadas de Microsoft Defender for Endpoint." },
            "bp-objective-4": { text: "Configurar las opciones de las reglas en Microsoft Defender for Endpoint." },
            "bp-objective-5": { text: "Configurar la recopilación de datos personalizada en Microsoft Defender for Endpoint." },
            "bp-objective-6": { text: "Configurar directivas de seguridad para Microsoft Defender for Endpoint, incluidas las reglas de reducción de la superficie expuesta a ataques." },
            "bp-objective-7": { text: "Administrar las capacidades de investigación y respuesta automatizadas en Microsoft Defender XDR." },
            "bp-objective-8": { text: "Configurar la interrupción automática de ataques en Microsoft Defender XDR." },
            "bp-objective-9": { text: "Configurar y administrar grupos de dispositivos, permisos y niveles de automatización en Microsoft Defender for Endpoint." },
            "bp-objective-10": { text: "Crear y configurar reglas de automatización en Microsoft Sentinel." },
            "bp-objective-11": { text: "Crear y configurar cuadernos de estrategias de Microsoft Sentinel." },
          },
        },
        "bp-domain-1-group-2": {
          title: "Configurar el SIEM y la plataforma de Microsoft Sentinel",
          objectives: {
            "bp-objective-12": { text: "Especificar roles de Microsoft Sentinel." },
            "bp-objective-13": { text: "Administrar la retención de datos para las tablas de XDR y Microsoft Sentinel, incluidos los niveles Analytics, Data Lake y XDR." },
            "bp-objective-14": { text: "Crear y configurar libros de Microsoft Sentinel." },
            "bp-objective-15": { text: "Optimizar la plataforma de Microsoft Sentinel, incluidas las recomendaciones de optimización del SOC." },
          },
        },
        "bp-domain-1-group-3": {
          title: "Ingerir datos en el SIEM y la plataforma de Microsoft Sentinel",
          objectives: {
            "bp-objective-16": { text: "Seleccionar conectores de datos según los requisitos del origen de datos, incluidos los registros de Windows y los eventos de seguridad." },
            "bp-objective-17": { text: "Configurar eventos de seguridad de Windows mediante AMA, incluidas las reglas de recopilación de datos." },
            "bp-objective-18": { text: "Planear y configurar eventos de seguridad de Windows mediante el reenvío de eventos de Windows." },
            "bp-objective-19": { text: "Planear y configurar los conectores Syslog mediante AMA y Common Event Format mediante AMA." },
            "bp-objective-20": { text: "Configurar la recopilación de actividades de Azure mediante Azure Policy y la configuración de diagnóstico de recursos." },
            "bp-objective-21": { text: "Ingerir indicadores de amenazas en Microsoft Sentinel." },
            "bp-objective-22": { text: "Crear tablas de registros personalizadas en el área de trabajo para almacenar los datos ingeridos." },
          },
        },
        "bp-domain-1-group-4": {
          title: "Configurar detecciones",
          objectives: {
            "bp-objective-23": { text: "Crear reglas de detección personalizadas mediante Búsqueda avanzada en Microsoft Defender XDR." },
            "bp-objective-24": { text: "Administrar reglas de detección personalizadas en Microsoft Defender XDR." },
            "bp-objective-25": { text: "Configurar y administrar reglas de análisis de Microsoft Sentinel, incluidas las programadas, NRT, de inteligencia sobre amenazas y de aprendizaje automático." },
            "bp-objective-26": { text: "Analizar la cobertura de vectores de ataque mediante la matriz MITRE ATT&CK." },
            "bp-objective-27": { text: "Configurar anomalías en Microsoft Sentinel." },
          },
        },
      },
    },
    "bp-domain-2": {
      title: "Responder a incidentes de seguridad",
      description: "Investigación entre dominios, respuesta de endpoints, Purview y actividad de Microsoft 365",
      groups: {
        "bp-domain-2-group-1": {
          title: "Responder a alertas e incidentes en Microsoft Defender XDR",
          objectives: {
            "bp-objective-28": { text: "Investigar y corregir amenazas mediante Microsoft Defender for Office 365, incluida la interrupción automática de ataques." },
            "bp-objective-29": { text: "Investigar y corregir amenazas o entidades comprometidas identificadas por Microsoft Purview." },
            "bp-objective-30": { text: "Investigar y corregir alertas e incidentes identificados por las protecciones de cargas de trabajo de Microsoft Defender for Cloud." },
            "bp-objective-31": { text: "Investigar y corregir riesgos de seguridad identificados por Microsoft Defender for Cloud Apps." },
            "bp-objective-32": { text: "Investigar y corregir identidades comprometidas identificadas por Microsoft Entra ID." },
            "bp-objective-33": { text: "Investigar y corregir alertas de seguridad de Microsoft Defender for Identity." },
            "bp-objective-34": { text: "Investigar y corregir alertas e incidentes identificados por Microsoft Sentinel." },
            "bp-objective-35": { text: "Investigar incidentes mediante IA agéntica, incluido Microsoft Security Copilot integrado." },
            "bp-objective-36": { text: "Investigar ataques complejos, incluidos los de varias fases, varios dominios y movimiento lateral." },
            "bp-objective-37": { text: "Administrar incidentes de seguridad mediante la gestión de casos." },
          },
        },
        "bp-domain-2-group-2": {
          title: "Responder a alertas e incidentes en Microsoft Defender for Endpoint",
          objectives: {
            "bp-objective-38": { text: "Investigar escalas de tiempo de dispositivos." },
            "bp-objective-39": { text: "Realizar acciones en dispositivos, incluidas la respuesta en vivo y la recopilación de paquetes de investigación." },
            "bp-objective-40": { text: "Investigar evidencias y entidades." },
            "bp-objective-41": { text: "Investigar y corregir incidentes identificados por la interrupción automática de ataques." },
          },
        },
        "bp-domain-2-group-3": {
          title: "Investigar actividades de Microsoft 365 para identificar amenazas",
          objectives: {
            "bp-objective-42": { text: "Investigar amenazas mediante Auditoría de Microsoft Purview." },
            "bp-objective-43": { text: "Investigar amenazas mediante la búsqueda de contenido en Microsoft Purview eDiscovery." },
            "bp-objective-44": { text: "Investigar amenazas mediante los registros de actividad de Microsoft Graph." },
          },
        },
      },
    },
    "bp-domain-3": {
      title: "Realizar búsqueda de amenazas",
      description: "KQL, Búsqueda avanzada, grafos, Data Lake, tablas de resumen y cuadernos",
      groups: {
        "bp-domain-3-group-1": {
          title: "Detectar amenazas mediante Microsoft Defender XDR",
          objectives: {
            "bp-objective-45": { text: "Identificar la tabla adecuada para usar en una consulta KQL." },
            "bp-objective-46": { text: "Identificar amenazas mediante el lenguaje de consulta Kusto (KQL)." },
            "bp-objective-47": { text: "Crear consultas de Búsqueda avanzada." },
            "bp-objective-48": { text: "Interpretar el análisis de amenazas en Microsoft Defender XDR." },
            "bp-objective-49": { text: "Crear grafos de búsqueda, incluido el radio de impacto." },
            "bp-objective-50": { text: "Analizar las relaciones entre entidades mediante Sentinel Graph." },
          },
        },
        "bp-domain-3-group-2": {
          title: "Detectar amenazas mediante la plataforma de Microsoft Sentinel",
          objectives: {
            "bp-objective-51": { text: "Crear y supervisar consultas de búsqueda." },
            "bp-objective-52": { text: "Crear y administrar trabajos de KQL en Data Lake." },
            "bp-objective-53": { text: "Crear y administrar tablas de reglas de resumen para realizar consultas." },
            "bp-objective-54": { text: "Buscar amenazas mediante cuadernos, incluida la conexión con Sentinel MCP Server." },
          },
        },
      },
    },
  },
};

