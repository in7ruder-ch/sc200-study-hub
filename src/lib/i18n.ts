import type { Locale } from "./types";

export const locales: Locale[] = ["en", "es"];

export const copy = {
  en: {
    product: "SC-200 Study Hub", description: "Interactive study reference",
    learningPaths: "Learning paths", blueprint: "Exam blueprint", practice: "Practice lab",
    comingSoon: "Next migration step", studyWorkspace: "Study workspace",
    heroTitle: "Prepare for SC-200 with a reference that remembers your progress.",
    heroBody: "All nine learning paths now run in the new architecture. Select one to reveal its brief and modules.",
    migrated: "All 9 paths migrated", choosePath: "Choose a learning path",
    noPathTitle: "Nothing selected yet",
    noPathBody: "Select a learning path above. The hub keeps the page quiet until you decide what to study.",
    studyFocus: "Study focus", modules: "modules", units: "units", complete: "complete", module: "Module",
    selectModule: "Select one or more modules",
    selectModuleBody: "Each click adds or removes a module from your workspace. Units remain closed until you open them.",
    markComplete: "Mark unit complete",
    contentLanguage: "The migrated study notes remain in English while Spanish content is prepared.",
    officialObjectives: "Official exam objectives", blueprintIntro: "Skills measured by Microsoft, organized into three weighted domains and nine functional groups.",
    openOfficialBlueprint: "Open official blueprint", effective: "Effective", objectives: "objectives", weightedDomains: "weighted domains", openStudyNotes: "Open study notes",
    blueprintGuide: "Open a functional group to explore its objectives. Related learning-path notes are linked directly, and supplemental study packs appear inside the objectives that need additional material.",
    studyPack: "Study notes & practice", studyPackContents: "Brief · concepts · checklist · exercise",
    studyBrief: "Study brief", keyConcepts: "Key concepts", examChecklist: "Exam checklist", handsOnExercise: "Hands-on exercise", officialResources: "Official Microsoft resources", relatedStudyNotes: "Related learning-path notes",
    backToTop: "Back to top", backToExamObjective: "Back to exam objective", endOfPath: "End of learning path", language: "Language", theme: "Theme",
    system: "System", light: "Light", dark: "Dark",
  },
  es: {
    product: "SC-200 Study Hub", description: "Referencia de estudio interactiva",
    learningPaths: "Learning paths", blueprint: "Exam blueprint", practice: "Laboratorio práctico",
    comingSoon: "Próximo paso de migración", studyWorkspace: "Espacio de estudio",
    heroTitle: "Prepará SC-200 con una referencia que recuerda tu progreso.",
    heroBody: "Los nueve learning paths ya funcionan sobre la nueva arquitectura. Seleccioná uno para ver su resumen y sus módulos.",
    migrated: "Los 9 paths están migrados", choosePath: "Elegí un learning path",
    noPathTitle: "Todavía no seleccionaste ninguno",
    noPathBody: "Seleccioná un learning path arriba. El hub no muestra contenido hasta que decidas qué estudiar.",
    studyFocus: "Enfoque de estudio", modules: "módulos", units: "unidades", complete: "completado", module: "Módulo",
    selectModule: "Seleccioná uno o más módulos",
    selectModuleBody: "Cada click agrega o quita un módulo del espacio de estudio. Las unidades permanecen cerradas hasta que las abras.",
    markComplete: "Marcar unidad como completada",
    contentLanguage: "Las notas migradas permanecen en inglés mientras se prepara el contenido en español.",
    officialObjectives: "Objetivos oficiales del examen", blueprintIntro: "Habilidades evaluadas por Microsoft, organizadas en tres dominios ponderados y nueve grupos funcionales.",
    openOfficialBlueprint: "Abrir blueprint oficial", effective: "Vigente desde", objectives: "objetivos", weightedDomains: "dominios ponderados", openStudyNotes: "Abrir notas de estudio",
    blueprintGuide: "Abrí un grupo funcional para explorar sus objetivos. Las notas de los learning paths están vinculadas directamente y los packs complementarios aparecen dentro de los objetivos que necesitan material adicional.",
    studyPack: "Notas y práctica", studyPackContents: "Resumen · conceptos · checklist · ejercicio",
    studyBrief: "Resumen de estudio", keyConcepts: "Conceptos clave", examChecklist: "Checklist de examen", handsOnExercise: "Ejercicio práctico", officialResources: "Recursos oficiales de Microsoft", relatedStudyNotes: "Notas relacionadas de los learning paths",
    backToTop: "Volver arriba", backToExamObjective: "Volver al objetivo del examen", endOfPath: "Fin del learning path", language: "Idioma", theme: "Tema",
    system: "Sistema", light: "Claro", dark: "Oscuro",
  },
} as const;

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
