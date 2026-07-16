export type ProgressSnapshot = { completedUnitIds: string[] };

export interface ProgressRepository {
  load(): ProgressSnapshot;
  save(snapshot: ProgressSnapshot): void;
}

const STORAGE_KEY = "sc200-study-progress-v1";

export const localProgressRepository: ProgressRepository = {
  load() {
    if (typeof window === "undefined") return { completedUnitIds: [] };
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (!stored) return { completedUnitIds: [] };
      const parsed = JSON.parse(stored);
      const values = Array.isArray(parsed)
        ? parsed
        : Array.isArray(parsed.completedUnitIds)
          ? parsed.completedUnitIds
          : [];
      return { completedUnitIds: values.filter((value: unknown): value is string => typeof value === "string") };
    } catch {
      return { completedUnitIds: [] };
    }
  },
  save(snapshot) {
    // Keep the original HTML app's array format so both versions can read it.
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot.completedUnitIds));
  },
};
