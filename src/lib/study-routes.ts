import type { Locale } from "@/lib/types";

export type StudyRoute =
  | { view: "dashboard" }
  | { view: "learning"; pathId?: string; moduleId?: string }
  | { view: "blueprint" }
  | { view: "practice"; experience: "labs"; labId?: string }
  | { view: "practice"; experience: "exam" };

export function studyRoutePath(locale: Locale, route: StudyRoute) {
  const root = `/${locale}`;
  if (route.view === "dashboard") return root;
  if (route.view === "blueprint") return `${root}/exam-blueprint`;
  if (route.view === "learning") {
    if (!route.pathId) return `${root}/learning-paths`;
    if (!route.moduleId) return `${root}/learning-paths/${route.pathId}`;
    return `${root}/learning-paths/${route.pathId}/${route.moduleId}`;
  }
  if (route.experience === "exam") return `${root}/exam-simulator`;
  return route.labId ? `${root}/practice-labs/${route.labId}` : `${root}/practice-labs`;
}

export function studyRouteFromSegments(segments: string[]): StudyRoute | null {
  if (segments.length === 0) return { view: "dashboard" };
  const [section, itemId, detailId] = segments;

  if (section === "learning-paths" && segments.length <= 3) {
    return { view: "learning", pathId: itemId, moduleId: detailId };
  }
  if (section === "exam-blueprint" && segments.length === 1) return { view: "blueprint" };
  if (section === "practice-labs" && segments.length <= 2) return { view: "practice", experience: "labs", labId: itemId };
  if (section === "exam-simulator" && segments.length === 1) return { view: "practice", experience: "exam" };
  return null;
}

export function studyRouteFromPathname(pathname: string): StudyRoute | null {
  const segments = pathname.split("/").filter(Boolean);
  if (segments[0] !== "en" && segments[0] !== "es") return null;
  return studyRouteFromSegments(segments.slice(1));
}
