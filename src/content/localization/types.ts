export type LearningPathTranslation = {
  title?: string;
  meta?: string;
  focusAreas?: Array<{ title: string; description: string }>;
  modules?: Record<string, {
    title?: string;
    focus?: string;
    units?: Record<string, { title?: string; bodyHtml?: string }>;
  }>;
};

export type ExamBlueprintTranslation = {
  title?: string;
  effectiveDate?: string;
  domains?: Record<string, {
    title?: string;
    description?: string;
    groups?: Record<string, {
      title?: string;
      objectives?: Record<string, { text?: string }>;
    }>;
  }>;
};

export type PracticeLabTranslation = {
  title?: string;
  subtitle?: string;
  difficulty?: string;
  primaryDomain?: string;
  briefing?: string;
  mission?: string;
  stages?: Record<string, {
    title?: string;
    objective?: string;
    briefing?: string;
    evidence?: Record<string, { title?: string; facts?: string[] }>;
    decisionPrompt?: string;
    options?: Record<string, { text?: string; feedback?: string }>;
    outcome?: string[];
    hint?: string;
    takeaway?: string;
    references?: Record<string, { reason?: string }>;
  }>;
  debrief?: {
    title?: string;
    summary?: string;
    keyLessons?: string[];
  };
};

export type RemediationPackTranslation = {
  summary?: string;
  keyConcepts?: string[];
  examChecklist?: string[];
  lab?: { title?: string; steps?: string[] };
  resources?: Record<string, { title?: string }>;
};

