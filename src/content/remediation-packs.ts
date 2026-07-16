export type RemediationPack = {
  objectiveId: string;
  summary: string;
  keyConcepts: string[];
  examChecklist: string[];
  lab: { title: string; steps: string[] };
  resources: Array<{ title: string; url: string }>;
};

export const remediationPacks: RemediationPack[] = [
  {
    objectiveId: "bp-objective-1",
    summary: "Microsoft Defender XDR can send separate email notifications for new incidents, completed or failed response actions, and new or updated threat analytics reports. Each notification type has its own rule, scope, recipients, and test workflow under Settings > Microsoft Defender XDR > Email notifications.",
    keyConcepts: [
      "Incident rules can filter by alert severity, detection source, and device group. Defender sends one email for each new incident that matches the rule rather than one email for every alert in the incident.",
      "Response-action rules can filter manual or automated actions by action type, device group, and completion status. Custom detections that contain response actions are not supported by these notifications.",
      "Threat analytics rules can notify recipients about all new or updated reports or only reports that match selected threat types and tags.",
      "Recipients receive tenant-specific links, so access still depends on portal permissions and role scope. Creating notification rules requires permission to manage security settings.",
    ],
    examChecklist: [
      "Choose the correct notification category for an incident, response action, or threat intelligence report.",
      "Configure a rule name, scope or filters, recipient addresses, and notification frequency where available.",
      "Recognize the effect of severity, detection-source, device-group, action-status, threat-type, and tag filters.",
      "Send a test notification and verify both delivery and the recipient's authorization to open the linked portal record.",
    ],
    lab: {
      title: "Build and validate three Defender XDR notification rules",
      steps: [
        "Open Settings > Microsoft Defender XDR > Email notifications and review the Incidents, Actions, and Threat analytics tabs.",
        "Create a narrowly scoped incident rule for high-severity incidents from selected detection sources and add a test recipient.",
        "Draft equivalent rules for failed response actions and selected threat analytics report types or tags.",
        "Use the test function, confirm delivery, and document which events do and do not trigger each rule.",
      ],
    },
    resources: [
      { title: "Get email notifications on incidents", url: "https://learn.microsoft.com/en-us/defender-xdr/m365d-notifications-incidents" },
      { title: "Get email notifications for response actions", url: "https://learn.microsoft.com/en-us/defender-xdr/m365d-response-actions-notifications" },
      { title: "Get email notifications for threat analytics", url: "https://learn.microsoft.com/en-us/defender-xdr/m365d-threat-analytics-notifications" },
    ],
  },
  {
    objectiveId: "bp-objective-2",
    summary: "Alert behavior in Microsoft Defender XDR is controlled through alert policies, alert tuning, custom detection settings, and correlation settings. The goal is to reduce known benign noise without hiding meaningful evidence or preventing related alerts from becoming a coherent incident.",
    keyConcepts: [
      "An alert policy defines the triggering activity and conditions, thresholds or unusual behavior, severity, category, aggregation, and optional recipient notifications.",
      "Alert tuning rules suppress known benign scenarios for supported built-in alerts. Suppression should use precise evidence and be reviewed because broad conditions can conceal true positives.",
      "Tuning a built-in alert does not disable automated investigation and response or its email notifications; malicious or suspicious investigation results can reactivate the alert.",
      "Microsoft Sentinel analytics rules can be included in or excluded from the Defender XDR correlation engine. Excluded rules bypass XDR correlation and use their own incident-grouping behavior.",
      "Custom detection rules can be enabled, disabled, edited, run, and explicitly included in or excluded from incident correlation.",
    ],
    examChecklist: [
      "Distinguish alert generation, email notification, suppression or tuning, and incident correlation.",
      "Create narrowly scoped tuning conditions from a reviewed false-positive alert and predict which future alerts will be hidden.",
      "Explain how automated investigation can override suppression when it finds suspicious or malicious evidence.",
      "Choose whether a Sentinel analytics rule or custom detection should participate in XDR correlation and understand the effect of exclusion.",
    ],
    lab: {
      title: "Tune a benign alert and verify incident correlation",
      steps: [
        "Choose a recurring benign alert and record the stable attributes that distinguish it from malicious activity.",
        "Create or draft an alert tuning rule with the narrowest practical conditions, then document its owner and review date.",
        "Inspect the relevant custom detection or Sentinel analytics rule and verify whether it is included in XDR correlation.",
        "Generate or replay matching and nonmatching test activity, then verify alert visibility, notification behavior, and incident grouping.",
      ],
    },
    resources: [
      { title: "Alert policies in Microsoft Defender XDR", url: "https://learn.microsoft.com/en-us/defender-xdr/alert-policies" },
      { title: "Alert tuning for built-in alert policies", url: "https://learn.microsoft.com/en-us/defender-office-365/alert-policies-defender-portal" },
      { title: "Include or exclude Sentinel rules from XDR correlation", url: "https://learn.microsoft.com/en-us/defender-xdr/exclude-analytics-rules-correlation" },
      { title: "Manage custom detection rules", url: "https://learn.microsoft.com/en-us/defender-xdr/custom-detection-manage" },
    ],
  },
  {
    objectiveId: "bp-objective-4",
    summary: "Microsoft Defender for Endpoint security settings can be managed from the Defender portal with endpoint security policies. A policy combines a platform and template, configuration settings, and device assignments; effective configuration also depends on policy precedence, enrollment state, licensing, permissions, and device connectivity.",
    keyConcepts: [
      "In Endpoints > Configuration management > Endpoint security policies, an administrator selects a platform and template, configures settings, assigns device groups, and reviews the policy before creation.",
      "Managing policies requires access to all devices and the Core security settings (manage) permission. Role and device-group scope affect what an administrator can view or change.",
      "Existing policies can be edited by section, including Basics, Settings, and Assignments. Changes must be validated on targeted devices rather than assumed from portal state alone.",
      "Conflicting settings can come from multiple management authorities or policies. Troubleshooting requires identifying the winning source and supported precedence behavior.",
    ],
    examChecklist: [
      "Identify the prerequisites and permissions for Defender security settings management.",
      "Create an endpoint security policy with the correct platform, template, configuration, and assignment scope.",
      "Edit policy settings or assignments and verify deployment and effective state on representative devices.",
      "Troubleshoot a conflict by checking policy sources, precedence, device onboarding or enrollment, and connectivity.",
    ],
    lab: {
      title: "Configure and troubleshoot an endpoint security policy",
      steps: [
        "Create a small test device group and confirm that the required Defender for Endpoint permissions and licenses are available.",
        "Create an endpoint security policy from an appropriate platform and template, change one auditable setting, and assign it only to the test group.",
        "Review policy deployment status and confirm the effective value on a test device using supported management or Defender diagnostics.",
        "Introduce or inspect a conflicting policy, identify the effective source, and document the safe resolution.",
      ],
    },
    resources: [
      { title: "Manage endpoint security policies in Microsoft Defender", url: "https://learn.microsoft.com/en-us/defender-endpoint/manage-security-policies" },
      { title: "Troubleshoot Microsoft Defender for Endpoint settings", url: "https://learn.microsoft.com/en-us/defender-endpoint/troubleshoot-settings" },
      { title: "Configure and manage Defender for Endpoint automation", url: "https://learn.microsoft.com/en-us/training/modules/configure-manage-automation-microsoft-defender-for-endpoint/" },
    ],
  },
  {
    objectiveId: "bp-objective-5",
    summary: "Custom data collection in Microsoft Defender for Endpoint uses rule-based filters to collect selected process, image-load, file, network, or script events and send them to a connected Microsoft Sentinel workspace. It supplements the default endpoint telemetry and is intended for focused use cases rather than indiscriminate collection.",
    keyConcepts: [
      "Rules can filter data by attributes such as folder path, process name, or network connection and write events to the corresponding DeviceCustom*Events table.",
      "Supported destinations include DeviceCustomProcessEvents, DeviceCustomImageLoadEvents, DeviceCustomFileEvents, DeviceCustomNetworkEvents, and DeviceCustomScriptEvents.",
      "The feature requires Microsoft Defender for Endpoint Plan 2 and a connected Sentinel workspace; current preview constraints include one connected workspace per tenant.",
      "Assignments use dynamic device tags rather than manual or static tags. A dynamic tag must have evaluated at least once before it can be selected.",
      "A rule can take approximately 20 minutes to one hour to reach endpoints. Collection volume, table cost, supported operating systems, and preview limitations must be considered before broad deployment.",
    ],
    examChecklist: [
      "Match an event type to the correct DeviceCustom*Events destination table.",
      "Verify licensing, Sentinel workspace connection, supported endpoints, and dynamic-tag readiness before creating a rule.",
      "Build narrow collection filters and assignment scope that capture the required evidence without unnecessary volume.",
      "Allow for propagation delay, query the destination table, and distinguish custom events from standard Defender telemetry.",
    ],
    lab: {
      title: "Collect a focused endpoint event set in Sentinel",
      steps: [
        "Define a test scenario, such as process execution from a controlled folder, and choose the matching custom event table.",
        "Verify the Sentinel connection and create or confirm a dynamic device tag for a small endpoint scope.",
        "Create a narrowly filtered custom data collection rule, assign the dynamic tag, and wait for policy propagation.",
        "Generate the test event, query the destination DeviceCustom*Events table, and record latency, volume, and any filter adjustments.",
      ],
    },
    resources: [
      { title: "Custom data collection in Defender for Endpoint", url: "https://learn.microsoft.com/en-us/defender-endpoint/custom-data-collection" },
      { title: "Create custom data collection rules", url: "https://learn.microsoft.com/en-us/defender-endpoint/create-custom-data-collection-rules" },
    ],
  },
  {
    objectiveId: "bp-objective-13",
    summary: "Retention in the unified security operations platform separates fast, interactive Analytics-tier access from long-term Data Lake storage and the Defender XDR advanced-hunting window. Table plans, analytics retention, and total retention must be configured according to investigation speed, detection dependencies, compliance, and cost.",
    keyConcepts: [
      "The Analytics tier supports real-time analytics rules, hunting, workbooks, and interactive queries. Sentinel and XDR tables commonly begin with 30 days of analytics retention, while eligible Sentinel solution tables receive up to 90 days at no retention charge.",
      "Analytics retention can be extended up to two years. Total retention preserves older data in the data lake and can be extended up to 12 years.",
      "Data Lake-only data is designed for lower-cost historical storage and asynchronous analysis with KQL jobs, notebooks, or summary rules; it is not available to real-time analytics and advanced hunting.",
      "Defender XDR advanced hunting has a default 30-day window. Eligible XDR tables can extend Analytics-tier access to 90 days and use longer total retention for the data lake.",
      "Reducing total retention has a 30-day waiting period before affected data is deleted, while Analytics-tier retention changes take effect immediately. Moving a table out of Analytics can break detections and hunting that depend on it.",
    ],
    examChecklist: [
      "Differentiate Analytics retention, total retention, Data Lake-only storage, and the Defender XDR advanced-hunting window.",
      "Choose a tier and retention period based on real-time detection, interactive investigation, historical analysis, compliance, and cost requirements.",
      "Predict the impact of changing a table from Analytics to Data Lake on rules, hunting, custom detections, and workbooks.",
      "Configure table-level retention and account for immediate versus delayed effects when increasing or reducing retention.",
    ],
    lab: {
      title: "Design and validate a tiered retention policy",
      steps: [
        "Select three representative tables: one required for real-time detection, one for frequent investigation, and one for compliance-only history.",
        "Document each table's Analytics retention, total retention, table plan, query use, detection dependencies, and estimated data volume.",
        "Propose tier and retention changes, then verify that no dependent analytics rule, custom detection, workbook, or hunting query loses required access.",
        "Apply the plan in a test workspace if available and confirm both recent interactive queries and the intended historical-access method.",
      ],
    },
    resources: [
      { title: "Microsoft Sentinel data tiers and retention overview", url: "https://learn.microsoft.com/en-us/azure/sentinel/manage-data-overview" },
      { title: "Manage table tiers and retention", url: "https://learn.microsoft.com/en-us/azure/sentinel/manage-table-tiers-retention" },
      { title: "Advanced hunting overview", url: "https://learn.microsoft.com/en-us/defender-xdr/advanced-hunting-overview" },
    ],
  },
  {
    objectiveId: "bp-objective-15",
    summary: "SOC optimization turns workspace telemetry into recommendations that improve threat coverage, data value, and operational efficiency. Recommendations compare ingested data and enabled detections with the controls needed for relevant threats and business risks.",
    keyConcepts: [
      "Data value recommendations identify billable tables that are unused or underused and suggest enabling detections, changing the table plan, stopping ingestion, or adjusting retention.",
      "Coverage recommendations identify missing detections or data sources. Threat-based recommendations can propose analytics rule templates, connectors, or complete Sentinel solutions.",
      "Coverage recommendations can also include AI-assisted MITRE ATT&CK tagging and risk-based recommendations; preview availability can vary.",
      "A recommendation is evidence for a decision, not an automatic instruction. Validate detection value, compliance requirements, retention needs, and cost before applying it.",
    ],
    examChecklist: [
      "Distinguish data value optimization from coverage optimization.",
      "Recognize the response to each condition: data without detections, detections without data, or neither data nor detections.",
      "Know that SOC optimization evaluates recent ingestion and enabled analytics to surface actionable recommendations.",
      "Review a recommendation, validate its impact, implement the change, and verify that the coverage or cost issue is resolved.",
    ],
    lab: {
      title: "Review and disposition a SOC optimization recommendation",
      steps: [
        "In the Defender portal, open Microsoft Sentinel and locate SOC optimization.",
        "Choose one data value or threat-coverage recommendation and record its evidence, affected tables or detections, and proposed action.",
        "Classify the recommendation as implement, defer, or dismiss and document the security, cost, and compliance rationale.",
        "If a test workspace is available, apply the recommendation and confirm the resulting connector, rule, table plan, or retention state.",
      ],
    },
    resources: [
      { title: "SOC optimization recommendations reference", url: "https://learn.microsoft.com/en-us/azure/sentinel/soc-optimization/soc-optimization-reference" },
      { title: "Access SOC optimization", url: "https://learn.microsoft.com/en-us/azure/sentinel/soc-optimization/soc-optimization-access" },
    ],
  },
  {
    objectiveId: "bp-objective-22",
    summary: "A custom Log Analytics table stores data that does not fit a built-in schema. Its schema, destination, and transformation are defined through a data collection rule (DCR), and the ingestion method—such as the Logs Ingestion API or a supported connector—must send records that conform to that contract.",
    keyConcepts: [
      "Custom table names use the _CL suffix and every table requires a TimeGenerated column. Add only fields that support a clear detection, investigation, reporting, or retention requirement.",
      "A DCR defines the input stream, transformation, destination workspace, and destination table. A portal workflow can infer an initial schema and transformation from sample data.",
      "If the table schema changes, the associated DCR must also be updated; Azure Monitor does not synchronize that change automatically.",
      "The Logs Ingestion API authenticates an application and sends data through a DCR endpoint to supported or custom tables. Transformations can parse, filter, enrich, and normalize records before storage.",
      "Creating and managing tables typically requires Log Analytics Contributor or equivalent Microsoft.OperationalInsights/workspaces permissions. Validate schema, access, ingestion health, volume, and cost before production rollout.",
    ],
    examChecklist: [
      "Design a custom schema with _CL naming, TimeGenerated, correct data types, and only useful security fields.",
      "Explain the relationship among the source payload, data collection endpoint, DCR stream declaration, transformation, workspace, and destination table.",
      "Choose an ingestion method and configure the required identity and permissions.",
      "Test sample records, query the table, troubleshoot DCR or schema mismatches, and update both the table and DCR when the schema evolves.",
    ],
    lab: {
      title: "Create and populate a custom security log table",
      steps: [
        "Prepare a small JSON sample containing an event timestamp, source, action, result, and investigation identifier with consistent data types.",
        "Create a custom table in the workspace, review the inferred schema, and confirm its _CL name and TimeGenerated mapping.",
        "Review or create the DCR and transformation, then send sample records through the selected connector or Logs Ingestion API.",
        "Query the table, validate parsed values and timestamps, inspect ingestion failures, and document the change process for adding a new column.",
      ],
    },
    resources: [
      { title: "Create a custom table in Azure Monitor Logs", url: "https://learn.microsoft.com/en-us/azure/azure-monitor/logs/create-custom-table" },
      { title: "Logs Ingestion API overview", url: "https://learn.microsoft.com/en-us/azure/azure-monitor/logs/logs-ingestion-api-overview" },
      { title: "Transform or customize ingested data in Sentinel", url: "https://learn.microsoft.com/en-us/azure/sentinel/data-transformation" },
      { title: "Manage tables in a Log Analytics workspace", url: "https://learn.microsoft.com/en-us/azure/azure-monitor/logs/manage-logs-tables" },
    ],
  },
  {
    objectiveId: "bp-objective-35",
    summary: "Agentic AI and embedded Microsoft Security Copilot accelerate incident investigation in the Defender portal by summarizing correlated evidence, recommending next steps, and automating selected triage workflows. Analysts remain accountable for validating AI conclusions against the underlying alerts, entities, timelines, and organizational response procedures.",
    keyConcepts: [
      "Embedded Copilot can summarize an incident's attack timeline, affected assets, indicators, and related threats, then provide guided responses grouped into triage, containment, investigation, and remediation.",
      "Copilot can also summarize identities and devices, analyze suspicious scripts and files, generate advanced hunting queries from natural language, and create an incident report from the recorded investigation activity.",
      "Agentic capabilities such as Security Alert Triage apply autonomous reasoning to supported alerts and return verdicts with an evidence trail. An agent operates within its configured identity, permissions, triggers, and scope; it does not replace analyst judgment.",
      "Access requires provisioned Security Copilot capacity and appropriate Defender permissions. Apply least privilege to both users and agents and treat preview capabilities as subject to change.",
      "AI output can be incomplete or incorrect. Verify important claims against source records, investigate conflicting evidence, and require human approval before consequential containment or remediation actions.",
    ],
    examChecklist: [
      "Distinguish embedded Copilot assistance from autonomous agentic workflows and identify when each supports an investigation.",
      "Use incident summaries, guided responses, entity or artifact analysis, and generated queries as investigation accelerators rather than final determinations.",
      "Validate AI-generated timelines, verdicts, indicators, and recommendations against alerts, evidence, entity pages, and advanced hunting results.",
      "Account for provisioning, RBAC, data scope, preview status, and human oversight before enabling or acting on AI capabilities.",
    ],
    lab: {
      title: "Validate an AI-assisted incident investigation",
      steps: [
        "Open a multi-alert incident in the Defender portal and record your own initial assessment of its timeline, affected assets, and likely attack path.",
        "Review the embedded Copilot summary and guided responses, then trace every material claim to an alert, entity, event, or other source record.",
        "Use one supported analysis capability or generated hunting query to investigate an identity, device, file, or script and document any unsupported or conflicting conclusion.",
        "Choose which recommended actions to accept, modify, or reject, explain the human-approval boundary, and produce a short evidence-backed incident handoff.",
      ],
    },
    resources: [
      { title: "Microsoft Security Copilot in Microsoft Defender", url: "https://learn.microsoft.com/en-us/defender-xdr/security-copilot-in-microsoft-365-defender" },
      { title: "Microsoft Copilot in Defender application card", url: "https://learn.microsoft.com/en-us/defender-xdr/application-card-copilot-defender" },
      { title: "Security Alert Triage Agent in Microsoft Defender", url: "https://learn.microsoft.com/en-us/defender-xdr/security-alert-triage-agent" },
    ],
  },
  {
    objectiveId: "bp-objective-36",
    summary: "A complex attack spans multiple stages, security domains, or entities and often produces alerts that appear unrelated in isolation. Defender XDR correlates these signals into an incident, while the attack story, entity pivots, advanced hunting, and blast radius analysis help analysts reconstruct chronology, identify lateral movement, and determine current and potential impact.",
    keyConcepts: [
      "Start with the incident priority, correlated alerts, affected assets, and attack story. Establish the entry point, sequence of techniques, compromised entities, persistence, lateral movement, and observed response actions.",
      "Pivot across users, devices, mailboxes, applications, IP addresses, files, URLs, and cloud resources. Use entity pages and Go hunt to test relationships, find activity outside the original incident, and link relevant results back to the investigation.",
      "The incident graph visualizes observed evidence over time. Blast radius analysis adds possible propagation paths from a selected node to critical targets so analysts can prioritize containment by business impact.",
      "Graph paths are investigative leads, not proof of attacker activity. Results depend on permissions, data freshness, modeled attack vectors, and bounded path length, so corroborate paths with event evidence and hunting queries.",
      "Contain the attack without losing the evidence needed to determine root cause. Sequence actions across domains, verify their results, and reassess scope when new alerts or entities appear.",
    ],
    examChecklist: [
      "Reconstruct a multi-stage attack by correlating alert times, tactics, entities, and security domains into one evidence-backed narrative.",
      "Use the incident graph, entity pages, timelines, Go hunt, and advanced hunting to investigate lateral movement and activity beyond the original alerts.",
      "Differentiate observed attack-story relationships from possible blast-radius paths and explain the limitations of graph-based analysis.",
      "Prioritize containment and remediation by compromise confidence, attack stage, critical-asset exposure, and the risk of continued propagation.",
    ],
    lab: {
      title: "Reconstruct and contain a multi-domain attack",
      steps: [
        "Choose a simulated incident with alerts from at least two domains and build a timeline containing the entry point, affected entities, tactics, and observed response actions.",
        "Traverse the incident graph and entity pages, then use Go hunt or advanced hunting to test one suspected lateral-movement relationship and add relevant evidence to the incident.",
        "Review blast radius from a compromised node, separate observed compromise from possible paths, and identify the highest-impact reachable asset or choke point.",
        "Write a sequenced containment and remediation plan, verify the expected result of each action, and list the evidence required before closing the incident.",
      ],
    },
    resources: [
      { title: "Investigate incidents in the Microsoft Defender portal", url: "https://learn.microsoft.com/en-us/defender-xdr/investigate-incidents" },
      { title: "Investigate and respond using Microsoft Defender XDR", url: "https://learn.microsoft.com/en-us/defender-xdr/pilot-deploy-investigate-respond" },
      { title: "Link advanced hunting results to an incident", url: "https://learn.microsoft.com/en-us/defender-xdr/advanced-hunting-link-to-incident" },
    ],
  },
  {
    objectiveId: "bp-objective-37",
    summary: "Native case management in the Microsoft Defender portal tracks security work that can span multiple incidents, hunting findings, indicators, and teams. A case provides its own priority, workflow status, owner, due date, tasks, comments, attachments, linked objects, and audit history while preserving each linked incident as a separate investigation record.",
    keyConcepts: [
      "A Defender incident correlates alerts and evidence for an attack; a case coordinates broader SecOps work. Use a case when work spans incidents, requires escalation or collaboration, tracks a hunt or threat actor, or needs a durable operational workflow.",
      "Case management requires a Microsoft Sentinel workspace connected to the Defender portal. Cases are managed in the Defender portal and are not visible in the Azure portal.",
      "The case queue supports filtering, sorting, and search. Case details include priority, customizable status, assignee, description, due date, linked incidents, tasks with individual owners and deadlines, comments, attachments, and an activity log with audit events.",
      "Linking an incident to a case adds coordination context without merging or replacing the incident. Multiple incidents can be linked when an investigation, campaign, or escalation crosses their boundaries.",
      "Access can be granted through Defender XDR unified RBAC or Sentinel roles: Reader supports viewing, Responder supports creating and managing cases, and Contributor supports status customization under the documented permission mapping.",
    ],
    examChecklist: [
      "Choose correctly between managing an incident and creating a case for cross-incident or cross-team security work.",
      "Create and maintain case priority, status, assignment, due date, tasks, comments, attachments, linked objects, and audit history.",
      "Link or unlink incidents while preserving the distinct purpose and lifecycle of the case and each incident.",
      "Recognize the connected-workspace requirement and map view, manage, and customize capabilities to the appropriate RBAC permissions or Sentinel roles.",
    ],
    lab: {
      title: "Coordinate a cross-incident SecOps case",
      steps: [
        "In a Defender portal connected to a Sentinel workspace, create a case for a simulated campaign that involves two related incidents and define its priority, owner, status, description, and due date.",
        "Link both incidents, add one investigation task and one containment task with separate owners and deadlines, and record the relationship between the incidents in a comment.",
        "Attach or reference a non-sensitive evidence artifact, update a task and the case status, and review the activity log to confirm the changes are auditable.",
        "Close the case with a concise outcome and explain why the linked incidents retained their own evidence, classifications, and lifecycles.",
      ],
    },
    resources: [
      { title: "Manage security operations cases in the Defender portal", url: "https://learn.microsoft.com/en-us/unified-secops/cases-overview" },
      { title: "Manage incidents in Microsoft Defender", url: "https://learn.microsoft.com/en-us/defender-xdr/manage-incidents" },
      { title: "Streamline incident response using tasks", url: "https://learn.microsoft.com/en-us/defender-xdr/split-incidents-into-tasks" },
    ],
  },
  {
    objectiveId: "bp-objective-44",
    summary: "Microsoft Graph activity logs record HTTP requests made to Microsoft Graph for resources in the tenant. In Sentinel, the MicrosoftGraphActivityLogs table can expose unusual application, service-principal, and user access patterns that conventional sign-in logs do not fully explain.",
    keyConcepts: [
      "The Microsoft Entra ID connector can ingest Microsoft Graph activity logs into Microsoft Sentinel.",
      "Useful investigation fields include AppId, ServicePrincipalId, UserId, RequestUri, RequestMethod, ResponseStatusCode, IPAddress, UserAgent, and RequestId.",
      "Investigations should establish who or what called Graph, which endpoint was accessed, whether the request succeeded, where it originated, and whether the volume or timing is anomalous.",
      "Correlate Graph requests with sign-in, audit, identity-risk, and Defender XDR evidence; a Graph request alone does not prove malicious activity.",
    ],
    examChecklist: [
      "Know the purpose of MicrosoftGraphActivityLogs and how the data reaches Sentinel.",
      "Pivot between an AppId, service principal, user, IP address, request URI, and response code.",
      "Identify suspicious patterns such as enumeration, repeated authorization failures, unusual endpoints, or a new caller accessing sensitive resources.",
      "Use RequestId and time windows to correlate activity with other Entra and Microsoft 365 telemetry.",
    ],
    lab: {
      title: "Investigate an unusual Microsoft Graph caller",
      steps: [
        "Confirm that Microsoft Graph activity logs are enabled through the Microsoft Entra ID data connector.",
        "Summarize requests by AppId, ServicePrincipalId, UserId, RequestUri, and ResponseStatusCode for a defined time window.",
        "Select an unusual caller and build a timeline of endpoints, source IP addresses, user agents, failures, and successful requests.",
        "Correlate the caller with Entra sign-in and audit data, then document whether the activity is expected, suspicious, or malicious.",
      ],
    },
    resources: [
      { title: "Send Microsoft Entra ID data to Sentinel", url: "https://learn.microsoft.com/en-us/azure/sentinel/connect-azure-active-directory" },
      { title: "MicrosoftGraphActivityLogs table reference", url: "https://learn.microsoft.com/en-us/azure/azure-monitor/reference/tables/microsoftgraphactivitylogs" },
      { title: "MicrosoftGraphActivityLogs query examples", url: "https://learn.microsoft.com/en-us/azure/azure-monitor/reference/queries/microsoftgraphactivitylogs" },
    ],
  },
  {
    objectiveId: "bp-objective-49",
    summary: "The hunting graph in Microsoft Defender advanced hunting renders security entities and their relationships as an interactive graph. Analysts create a graph by choosing a predefined threat scenario, supplying its required entities, applying node or edge filters, and then exploring possible paths, choke points, exposure, and connections to critical assets.",
    keyConcepts: [
      "Open a new hunting graph from Investigation & response > Hunting > Advanced hunting. Access requires the appropriate Microsoft Entra role, onboarding to the Microsoft Sentinel data lake, and at least read-only access in Microsoft Security Exposure Management.",
      "Predefined scenarios use prebuilt advanced hunting queries for questions such as attack paths to a critical asset, an entity relationship map, paths between two entities, access to sensitive resources, or choke points to data stores. Supply the scenario's required source or target entities before rendering it.",
      "Nodes represent entities such as users, devices, IP addresses, applications, or cloud resources. Directed edges describe relationships such as membership, permissions, authentication, network routes, ownership, or execution; selecting an element reveals its properties and context.",
      "Refine a scenario with source-node, target-node, edge-type, edge-direction, risk, vulnerability, exposure, or shortest-path filters. After rendering, inspect nodes and edges, expand connected assets, focus on relevant entities, and use layers to control the visualization.",
      "Use hunting graphs proactively to explore possible routes and choke points. Incident blast radius starts from an incident entity to estimate current and potential reach toward critical targets; it complements the observed attack story but does not prove that every displayed path was used.",
      "Graph results depend on available workload data, critical-asset classification, data freshness, modeled relationships, permissions, and path limits. Corroborate important relationships with entity records, alerts, timelines, and advanced hunting event data before containment or remediation.",
    ],
    examChecklist: [
      "Create a new hunting graph, choose the scenario that matches the hypothesis, provide required entity inputs, apply relevant filters, and render the graph.",
      "Interpret node types, edge direction and relationship, grouped entities, shortest paths, critical-asset markers, vulnerabilities, and possible choke points.",
      "Differentiate proactive hunting graphs, incident attack stories, incident blast radius, and custom Sentinel Graph analysis with GQL.",
      "Validate graph-derived paths against underlying security evidence and account for prerequisites, RBAC scope, incomplete data, modeled-vector, freshness, and path-length limitations.",
    ],
    lab: {
      title: "Create and validate a hunting graph to a critical asset",
      steps: [
        "Define a hypothesis involving a potentially compromised identity or device and a critical target, then record the required permissions, source entity, target entity, and evidence that would confirm the path.",
        "In Advanced hunting, create a hunting graph and run either Paths between two entities or Attack paths to critical asset with the appropriate inputs.",
        "Filter to the shortest relevant paths and required edge direction or relationship types, then inspect each node and edge to identify exposure, vulnerabilities, and a possible choke point.",
        "Use entity pages or an advanced hunting query to corroborate the important relationships, separate possible reach from observed attacker activity, and document one justified containment or hardening action.",
      ],
    },
    resources: [
      { title: "Hunt for threats using the hunting graph", url: "https://learn.microsoft.com/en-us/defender-xdr/advanced-hunting-graph" },
      { title: "Understand graph icons and visualizations", url: "https://learn.microsoft.com/en-us/defender-xdr/understand-graph-icons" },
      { title: "Investigate incidents and blast radius", url: "https://learn.microsoft.com/en-us/defender-xdr/investigate-incidents" },
      { title: "Work with advanced hunting query results", url: "https://learn.microsoft.com/en-us/defender-xdr/advanced-hunting-query-results" },
    ],
  },
  {
    objectiveId: "bp-objective-50",
    summary: "Microsoft Sentinel graph models security data as nodes and directed relationships instead of isolated rows. Analysts use graph experiences and Graph Query Language (GQL) to trace access paths, lateral movement, blast radius, and connections to critical assets.",
    keyConcepts: [
      "Nodes represent entities such as identities, devices, files, and cloud resources; edges represent relationships such as access, membership, ownership, or activity.",
      "Predefined graphs support scenarios such as identity attack paths, hunting, exposure, and blast-radius analysis.",
      "Custom graphs can model Sentinel data lake and non-Microsoft data for organization-specific investigations.",
      "Graph visualization supports schema inspection, node details, connected-asset traversal, filtering, table validation, and export.",
    ],
    examChecklist: [
      "Explain why graph analysis reveals relationships that are difficult to find in tabular queries.",
      "Identify nodes, edges, direction, properties, paths, and blast radius in an investigation.",
      "Use the schema before writing GQL and validate visual results in the table view.",
      "Distinguish proactive attack-path analysis from post-compromise blast-radius investigation.",
    ],
    lab: {
      title: "Trace an identity path to a critical asset",
      steps: [
        "Open Microsoft Sentinel > Graphs and choose an available predefined or custom graph.",
        "Inspect the schema to identify the relevant identity, resource, and relationship types.",
        "Start with a predefined query or a one-hop GQL pattern, then filter to a selected identity or critical asset.",
        "Traverse connected assets, validate the path in table view, and record the shortest risky path and a remediation action.",
      ],
    },
    resources: [
      { title: "Microsoft Sentinel graph overview", url: "https://learn.microsoft.com/en-us/azure/sentinel/datalake/sentinel-graph-overview" },
      { title: "Identity attack graph", url: "https://learn.microsoft.com/en-us/azure/sentinel/datalake/identity-attack-graph" },
      { title: "Visualize graphs in Microsoft Sentinel", url: "https://learn.microsoft.com/en-us/azure/sentinel/datalake/graph-visualization" },
    ],
  },
  {
    objectiveId: "bp-objective-52",
    summary: "KQL jobs are one-time or scheduled asynchronous queries that run against Microsoft Sentinel data lake data and federated tables. They support long-running investigations, cross-table joins and unions, historical analysis, enrichment, and selective promotion of results to another tier.",
    keyConcepts: [
      "The workspace must be onboarded to the Sentinel data lake before KQL jobs can run.",
      "A job defines a query, source workspaces, destination workspace and table, and either a one-time or recurring schedule.",
      "Results can be written to a new table or appended to a schema-compatible existing table in the analytics or data lake tier.",
      "Account for data lake ingestion latency, query timeout, destination cost, schema compatibility, and unsupported fields or operators.",
    ],
    examChecklist: [
      "Choose a KQL job for historical, multi-table, join/union, scheduled, or enrichment workloads.",
      "Know the prerequisites: data lake onboarding, required roles, and managed-identity access when creating analytics custom tables.",
      "Configure the destination, query scope, schedule, and delay or overlapping lookback needed for late-arriving data.",
      "Differentiate KQL jobs from summary rules and search jobs by source tier, query capability, scheduling, and result destination.",
    ],
    lab: {
      title: "Design a scheduled historical enrichment job",
      steps: [
        "Choose a historical investigation that needs a join or union across two Sentinel tables.",
        "Write and test a query that projects only required columns and preserves the original event time in a separate field.",
        "Create a scheduled KQL job with a destination table and a delay that accounts for data readiness.",
        "Review job status and output, verify the destination schema, and document how promoted results support hunting or analytics.",
      ],
    },
    resources: [
      { title: "Create KQL jobs in the Sentinel data lake", url: "https://learn.microsoft.com/en-us/azure/sentinel/datalake/kql-jobs" },
      { title: "Compare KQL jobs, summary rules, and search jobs", url: "https://learn.microsoft.com/en-us/azure/sentinel/datalake/kql-jobs-summary-rules-search-jobs" },
    ],
  },
  {
    objectiveId: "bp-objective-53",
    summary: "Summary rules run scheduled KQL aggregations in the background and store compact results in custom Analytics-tier tables. They improve performance and control cost when analysts repeatedly query high-volume or lower-cost source data.",
    keyConcepts: [
      "A summary rule consists of a KQL aggregation, destination custom table, bin size or execution frequency, delay, and start time.",
      "Results use an existing or new custom table, normally with the _CL suffix, and can feed hunting, workbooks, reports, or analytics rules.",
      "Test the query and expected schema before creating the rule; reduce bin size, returned rows, or high-volume fields if limits are approached.",
      "Monitor rule health and run history. Enable SummaryLogs diagnostics to investigate historical executions and failures.",
    ],
    examChecklist: [
      "Choose summary rules for frequent aggregation of high-volume data and fast repeated analysis.",
      "Configure the query, destination table, frequency, delay, and start time.",
      "Explain how summarized Analytics-tier data can reduce repeated scans of verbose Basic, Auxiliary, or Data Lake data.",
      "Manage a rule by viewing results and run history, then enabling, disabling, editing, or deleting it.",
    ],
    lab: {
      title: "Create and validate a summary rule",
      steps: [
        "Select a verbose source table and define an hourly security metric that analysts repeatedly need.",
        "Test a KQL summarize query in Logs and verify its output schema and time binning.",
        "Create a summary rule that writes to a new custom table and configure frequency and ingestion delay.",
        "Query the destination table, inspect run history or SummaryLogs, and describe one hunting or analytics use for the summarized data.",
      ],
    },
    resources: [
      { title: "Aggregate Sentinel data with summary rules", url: "https://learn.microsoft.com/en-us/azure/sentinel/summary-rules" },
      { title: "Compare KQL jobs, summary rules, and search jobs", url: "https://learn.microsoft.com/en-us/azure/sentinel/datalake/kql-jobs-summary-rules-search-jobs" },
    ],
  },
  {
    objectiveId: "bp-objective-54",
    summary: "Microsoft Sentinel supports both code-first and natural-language hunting workflows. Jupyter notebooks provide a reproducible environment for multi-step data acquisition, enrichment, visualization, statistics, and machine learning, while the hosted Sentinel MCP server exposes scenario-focused security tools to compatible AI clients through Microsoft Entra-authenticated connections.",
    keyConcepts: [
      "Choose a notebook when the hunt requires custom Python, repeatable transformations, external enrichment, complex visualization, statistical analysis, machine learning, or a durable record that combines code, results, and analyst reasoning.",
      "MSTICPy adds security-focused query providers, predefined queries, entity enrichment, threat intelligence and geolocation lookups, timelines, process trees, and other analysis tools. Protect provider secrets in Azure Key Vault, review imported code, and stop Azure Machine Learning compute when it is not in use.",
      "The Sentinel MCP server is a fully hosted interface that uses Microsoft Entra identity and does not require the analyst to deploy MCP infrastructure. A compatible MCP host and client connect to scenario-focused collections for data exploration, triage, threat hunting, or agent creation.",
      "MCP tools operate within the signed-in identity's permissions and data scope. Select the intended Sentinel workspace, use least privilege, keep the client compatible with current MCP authorization, and never assume that natural-language access bypasses table, product, or RBAC requirements.",
      "Treat notebook output and model-generated MCP responses as evidence candidates. Validate tables, time ranges, query logic, entities, citations, and data freshness; preserve the final queries and findings in the investigation record before taking consequential action.",
      "MCP capabilities, limits, client support, and preview status can change. Use English prompts for the currently documented language support, test workflows in a controlled environment, and consult current availability and billing guidance before production adoption.",
    ],
    examChecklist: [
      "Select notebooks for programmable, multi-step, reproducible analysis and MCP tools for governed natural-language access from a compatible client.",
      "Configure a notebook environment, authenticate to Sentinel, query data with Kqlmagic or MSTICPy, enrich and visualize results, protect secrets, and manage compute cost.",
      "Explain the MCP host-client-server relationship, choose an appropriate Sentinel tool collection, authenticate with Microsoft Entra, and specify the correct workspace and investigation scope.",
      "Validate notebook and MCP results against source data, account for permissions, freshness, service limits, and preview behavior, and retain reproducible evidence for analyst review.",
    ],
    lab: {
      title: "Run and validate a hybrid notebook and MCP hunt",
      steps: [
        "Define a time-bounded identity or endpoint hunting hypothesis and record the target workspace, required tables, entities, permissions, and expected evidence before querying data.",
        "In a Sentinel notebook, retrieve the relevant events with Kqlmagic or MSTICPy, normalize them in a data frame, enrich one entity, and create a timeline or other visualization that tests the hypothesis.",
        "From a compatible client connected to the appropriate Sentinel MCP collection, submit a specific English prompt for the same scope and record which tools, workspace, tables, and time range produced the response.",
        "Compare both result sets, investigate discrepancies against the underlying records, save the final query and notebook narrative, remove secrets or sensitive output, and document an evidence-backed conclusion.",
      ],
    },
    resources: [
      { title: "Jupyter notebooks with Sentinel hunting capabilities", url: "https://learn.microsoft.com/en-us/azure/sentinel/notebooks" },
      { title: "Get started with Jupyter notebooks and MSTICPy", url: "https://learn.microsoft.com/en-us/azure/sentinel/notebook-get-started" },
      { title: "Microsoft Sentinel support for MCP", url: "https://learn.microsoft.com/en-us/azure/sentinel/datalake/sentinel-mcp-overview" },
      { title: "Get started with Microsoft Sentinel MCP server", url: "https://learn.microsoft.com/en-us/azure/sentinel/datalake/sentinel-mcp-get-started" },
      { title: "Sentinel MCP tool collections", url: "https://learn.microsoft.com/en-us/azure/sentinel/datalake/sentinel-mcp-tools-overview" },
      { title: "Sentinel MCP best practices and troubleshooting", url: "https://learn.microsoft.com/en-us/azure/sentinel/datalake/troubleshoot-sentinel-mcp" },
    ],
  },
];
