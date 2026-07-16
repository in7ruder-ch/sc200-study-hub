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
