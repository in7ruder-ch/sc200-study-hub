import type { MetadataRoute } from "next";
import { practiceLabs } from "@/content/practice-labs";
import { siteUrl } from "@/lib/site";
import { englishLearningPaths } from "@/lib/study-content";
import { studyRoutePath, type StudyRoute } from "@/lib/study-routes";

const routes: Array<{ route: StudyRoute; priority: number }> = [
  { route: { view: "dashboard" }, priority: 1 },
  { route: { view: "learning" }, priority: 0.9 },
  ...englishLearningPaths.flatMap((path) => [
    { route: { view: "learning", pathId: path.id } as StudyRoute, priority: 0.8 },
    ...path.modules.map((module) => ({ route: { view: "learning", pathId: path.id, moduleId: module.id } as StudyRoute, priority: 0.7 })),
  ]),
  { route: { view: "blueprint" }, priority: 0.9 },
  { route: { view: "practice", experience: "labs" }, priority: 0.9 },
  ...practiceLabs.map((lab) => ({ route: { view: "practice", experience: "labs", labId: lab.id } as StudyRoute, priority: 0.8 })),
  { route: { view: "practice", experience: "exam" }, priority: 0.9 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.flatMap(({ route, priority }) => {
    const englishUrl = new URL(studyRoutePath("en", route), siteUrl).toString();
    const spanishUrl = new URL(studyRoutePath("es", route), siteUrl).toString();
    return (["en", "es"] as const).map((locale) => ({
      url: locale === "en" ? englishUrl : spanishUrl,
      changeFrequency: "monthly" as const,
      priority,
      alternates: {
        languages: {
          en: englishUrl,
          es: spanishUrl,
          "x-default": englishUrl,
        },
      },
    }));
  });
}
