export type PracticeLabProgress = {
  started: boolean;
  answers: Record<string, string>;
};

type PracticeProgressSnapshot = {
  labs: Record<string, PracticeLabProgress>;
};

const STORAGE_KEY = "sc200-practice-progress-v1";

function emptyProgress(): PracticeProgressSnapshot {
  return { labs: {} };
}

function loadSnapshot(): PracticeProgressSnapshot {
  if (typeof window === "undefined") return emptyProgress();
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return emptyProgress();
    const parsed = JSON.parse(stored) as { labs?: unknown };
    if (!parsed || typeof parsed !== "object" || !parsed.labs || typeof parsed.labs !== "object") return emptyProgress();
    const labs: Record<string, PracticeLabProgress> = {};
    for (const [labId, value] of Object.entries(parsed.labs)) {
      if (!value || typeof value !== "object") continue;
      const candidate = value as { started?: unknown; answers?: unknown };
      const answers: Record<string, string> = {};
      if (candidate.answers && typeof candidate.answers === "object") {
        for (const [stageId, optionId] of Object.entries(candidate.answers)) {
          if (typeof optionId === "string") answers[stageId] = optionId;
        }
      }
      labs[labId] = { started: candidate.started === true, answers };
    }
    return { labs };
  } catch {
    return emptyProgress();
  }
}

export const localPracticeProgressRepository = {
  loadLab(labId: string): PracticeLabProgress {
    return loadSnapshot().labs[labId] ?? { started: false, answers: {} };
  },
  saveLab(labId: string, progress: PracticeLabProgress) {
    const snapshot = loadSnapshot();
    snapshot.labs[labId] = progress;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  },
  clearLab(labId: string) {
    const snapshot = loadSnapshot();
    delete snapshot.labs[labId];
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  },
};
