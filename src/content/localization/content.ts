import { practiceLabs as englishPracticeLabs } from "@/content/practice-labs";
import { examQuestions as englishExamQuestions } from "@/content/exam-questions";
import { remediationPacks as englishRemediationPacks, type RemediationPack } from "@/content/remediation-packs";
import { spanishExamBlueprint, spanishExamQuestions, spanishLearningPaths, spanishPracticeLabs, spanishRemediationPacks } from "./es";
import type { ExamBlueprint, ExamQuestion, LearningPath, Locale, PracticeLabScenario } from "@/lib/types";

function referenceKey(pathId: string, moduleId: string) {
  return `${pathId}/${moduleId}`;
}

export function localizeLearningPaths(paths: LearningPath[], locale: Locale): LearningPath[] {
  if (locale === "en") return paths;
  return paths.map((path) => {
    const translation = spanishLearningPaths[path.id];
    if (!translation) return path;
    return {
      ...path,
      title: translation.title ?? path.title,
      meta: translation.meta ?? path.meta,
      focusAreas: translation.focusAreas ?? path.focusAreas,
      modules: path.modules.map((module) => {
        const moduleTranslation = translation.modules?.[module.id];
        if (!moduleTranslation) return module;
        return {
          ...module,
          title: moduleTranslation.title ?? module.title,
          focus: moduleTranslation.focus ?? module.focus,
          units: module.units.map((unit) => {
            const unitTranslation = moduleTranslation.units?.[unit.id];
            return unitTranslation ? { ...unit, title: unitTranslation.title ?? unit.title, bodyHtml: unitTranslation.bodyHtml ?? unit.bodyHtml } : unit;
          }),
        };
      }),
    };
  });
}

export function localizeExamBlueprint(blueprint: ExamBlueprint, locale: Locale): ExamBlueprint {
  if (locale === "en") return blueprint;
  return {
    ...blueprint,
    title: spanishExamBlueprint.title ?? blueprint.title,
    effectiveDate: spanishExamBlueprint.effectiveDate ?? blueprint.effectiveDate,
    domains: blueprint.domains.map((domain) => {
      const domainTranslation = spanishExamBlueprint.domains?.[domain.id];
      if (!domainTranslation) return domain;
      return {
        ...domain,
        title: domainTranslation.title ?? domain.title,
        description: domainTranslation.description ?? domain.description,
        groups: domain.groups.map((group) => {
          const groupTranslation = domainTranslation.groups?.[group.id];
          if (!groupTranslation) return group;
          return {
            ...group,
            title: groupTranslation.title ?? group.title,
            objectives: group.objectives.map((objective) => {
              const objectiveTranslation = groupTranslation.objectives?.[objective.id];
              return objectiveTranslation ? { ...objective, text: objectiveTranslation.text ?? objective.text } : objective;
            }),
          };
        }),
      };
    }),
  };
}

export function getExamQuestions(locale: Locale): ExamQuestion[] {
  if (locale === "en") return englishExamQuestions;
  return englishExamQuestions.map((question) => {
    const translation = spanishExamQuestions[question.id];
    if (!translation) return question;
    return {
      ...question,
      domainTitle: translation.domainTitle ?? question.domainTitle,
      prompt: translation.prompt ?? question.prompt,
      options: question.options.map((option) => ({ ...option, text: translation.options?.[option.id]?.text ?? option.text })),
      explanation: translation.explanation ?? question.explanation,
      references: question.references.map((reference) => ({
        ...reference,
        reason: translation.references?.[`${reference.pathId}/${reference.moduleId}`]?.reason ?? reference.reason,
      })),
    };
  });
}

export function getPracticeLabs(locale: Locale): PracticeLabScenario[] {
  if (locale === "en") return englishPracticeLabs;
  return englishPracticeLabs.map((lab) => {
    const translation = spanishPracticeLabs[lab.id];
    if (!translation) return lab;
    return {
      ...lab,
      title: translation.title ?? lab.title,
      subtitle: translation.subtitle ?? lab.subtitle,
      difficulty: translation.difficulty ?? lab.difficulty,
      primaryDomain: translation.primaryDomain ?? lab.primaryDomain,
      briefing: translation.briefing ?? lab.briefing,
      mission: translation.mission ?? lab.mission,
      stages: lab.stages.map((stage) => {
        const stageTranslation = translation.stages?.[stage.id];
        if (!stageTranslation) return stage;
        return {
          ...stage,
          title: stageTranslation.title ?? stage.title,
          objective: stageTranslation.objective ?? stage.objective,
          briefing: stageTranslation.briefing ?? stage.briefing,
          evidence: stage.evidence.map((evidence) => {
            const evidenceTranslation = stageTranslation.evidence?.[evidence.id];
            return evidenceTranslation ? { ...evidence, title: evidenceTranslation.title ?? evidence.title, facts: evidenceTranslation.facts ?? evidence.facts } : evidence;
          }),
          decision: {
            ...stage.decision,
            prompt: stageTranslation.decisionPrompt ?? stage.decision.prompt,
            options: stage.decision.options.map((option) => {
              const optionTranslation = stageTranslation.options?.[option.id];
              return optionTranslation ? { ...option, text: optionTranslation.text ?? option.text, feedback: optionTranslation.feedback ?? option.feedback } : option;
            }),
          },
          outcome: stageTranslation.outcome ?? stage.outcome,
          hint: stageTranslation.hint ?? stage.hint,
          takeaway: stageTranslation.takeaway ?? stage.takeaway,
          references: stage.references.map((reference) => {
            const referenceTranslation = stageTranslation.references?.[referenceKey(reference.pathId, reference.moduleId)];
            return referenceTranslation ? { ...reference, reason: referenceTranslation.reason ?? reference.reason } : reference;
          }),
        };
      }),
      debrief: {
        title: translation.debrief?.title ?? lab.debrief.title,
        summary: translation.debrief?.summary ?? lab.debrief.summary,
        keyLessons: translation.debrief?.keyLessons ?? lab.debrief.keyLessons,
      },
    };
  });
}

export function getRemediationPacks(locale: Locale): RemediationPack[] {
  if (locale === "en") return englishRemediationPacks;
  return englishRemediationPacks.map((pack) => {
    const translation = spanishRemediationPacks[pack.objectiveId];
    if (!translation) return pack;
    return {
      ...pack,
      summary: translation.summary ?? pack.summary,
      keyConcepts: translation.keyConcepts ?? pack.keyConcepts,
      examChecklist: translation.examChecklist ?? pack.examChecklist,
      lab: { title: translation.lab?.title ?? pack.lab.title, steps: translation.lab?.steps ?? pack.lab.steps },
      resources: pack.resources.map((resource) => ({ ...resource, title: translation.resources?.[resource.url]?.title ?? resource.title })),
    };
  });
}

