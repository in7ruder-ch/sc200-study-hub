export type Locale = "en" | "es";

export type LearningUnit = { id: string; number: string; title: string; bodyHtml: string };

export type StudyModule = {
  id: string;
  number: number;
  title: string;
  focus: string;
  units: LearningUnit[];
};

export type LearningPath = {
  id: string;
  number: number;
  title: string;
  officialUrl: string;
  meta: string;
  focusAreas: Array<{ title: string; description: string }>;
  modules: StudyModule[];
};

export type CoverageStatus = "covered" | "partial" | "gap";

export type BlueprintReference = { pathId: string; moduleId: string };

export type BlueprintReturnTarget = { groupId: string; objectiveId: string };

export type BlueprintObjective = {
  id: string;
  text: string;
  status: CoverageStatus;
  references: BlueprintReference[];
};

export type BlueprintGroup = {
  id: string;
  title: string;
  objectives: BlueprintObjective[];
};

export type BlueprintDomain = {
  id: string;
  number: string;
  title: string;
  description: string;
  weight: string;
  groups: BlueprintGroup[];
};

export type ExamBlueprint = {
  title: string;
  effectiveDate: string;
  officialUrl: string;
  domains: BlueprintDomain[];
};

export type ExamQuestionOption = { id: string; text: string };

export type ExamQuestion = {
  id: string;
  domainId: "bp-domain-1" | "bp-domain-2" | "bp-domain-3";
  domainTitle: string;
  prompt: string;
  options: ExamQuestionOption[];
  correctOptionId: string;
  explanation: string;
  references: PracticeStudyReference[];
};

export type PracticeDecisionRating = "recommended" | "acceptable" | "risky";

export type PracticeEvidence = {
  id: string;
  title: string;
  category: "incident" | "email" | "identity" | "cloud" | "device" | "hunting";
  facts: string[];
};

export type PracticeDecisionOption = {
  id: string;
  text: string;
  rating: PracticeDecisionRating;
  feedback: string;
};

export type PracticeStudyReference = BlueprintReference & {
  reason: string;
};

export type PracticeLabStage = {
  id: string;
  number: number;
  title: string;
  objective: string;
  briefing: string;
  evidence: PracticeEvidence[];
  decision: {
    prompt: string;
    options: PracticeDecisionOption[];
  };
  outcome: string[];
  hint: string;
  takeaway: string;
  references: PracticeStudyReference[];
};

export type PracticeLabScenario = {
  id: string;
  title: string;
  subtitle: string;
  difficulty: string;
  estimatedMinutes: number;
  primaryDomain: string;
  products: string[];
  briefing: string;
  mission: string;
  stages: PracticeLabStage[];
  debrief: {
    title: string;
    summary: string;
    keyLessons: string[];
  };
};
