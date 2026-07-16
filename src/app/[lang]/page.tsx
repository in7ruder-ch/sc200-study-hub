import { notFound } from "next/navigation";
import learningPathOne from "@/content/learning-path-1.json";
import learningPathTwo from "@/content/learning-path-2.json";
import learningPathThree from "@/content/learning-path-3.json";
import learningPathFour from "@/content/learning-path-4.json";
import learningPathFive from "@/content/learning-path-5.json";
import learningPathSix from "@/content/learning-path-6.json";
import learningPathSeven from "@/content/learning-path-7.json";
import learningPathEight from "@/content/learning-path-8.json";
import learningPathNine from "@/content/learning-path-9.json";
import examBlueprint from "@/content/exam-blueprint.json";
import { StudyHub } from "@/components/study-hub";
import { isLocale, locales } from "@/lib/i18n";
import type { ExamBlueprint, LearningPath } from "@/lib/types";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function LocalizedHome({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const learningPaths = [
    learningPathOne,
    learningPathTwo,
    learningPathThree,
    learningPathFour,
    learningPathFive,
    learningPathSix,
    learningPathSeven,
    learningPathEight,
    learningPathNine,
  ] as LearningPath[];
  return <StudyHub locale={lang} learningPaths={learningPaths} blueprint={examBlueprint as ExamBlueprint} />;
}
