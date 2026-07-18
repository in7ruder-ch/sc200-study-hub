export type ExamMode = "quick" | "full";

export type ExamAttempt = {
  id: string;
  mode: ExamMode;
  completedAt: string;
  questionIds: string[];
  answers: Record<string, string>;
  score: number;
  total: number;
  domainScores: Record<string, { correct: number; total: number }>;
};

const STORAGE_KEY = "sc200-exam-attempts-v1";

function load(): ExamAttempt[] {
  if (typeof window === "undefined") return [];
  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]");
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((attempt): attempt is ExamAttempt => Boolean(
      attempt && typeof attempt.id === "string" && (attempt.mode === "quick" || attempt.mode === "full")
      && Array.isArray(attempt.questionIds) && attempt.answers && typeof attempt.answers === "object"
      && typeof attempt.score === "number" && typeof attempt.total === "number" && attempt.domainScores && typeof attempt.domainScores === "object",
    ));
  } catch {
    return [];
  }
}

export const localExamAttemptRepository = {
  load,
  save(attempt: ExamAttempt) {
    const attempts = [attempt, ...load().filter((candidate) => candidate.id !== attempt.id)].slice(0, 10);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(attempts));
  },
};
