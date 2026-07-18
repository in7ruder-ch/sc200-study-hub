import { notFound } from "next/navigation";
import { StudyHub } from "@/components/study-hub";
import { isLocale, locales } from "@/lib/i18n";
import { englishExamBlueprint, englishLearningPaths } from "@/lib/study-content";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function LocalizedHome({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return <StudyHub locale={lang} learningPaths={englishLearningPaths} blueprint={englishExamBlueprint} initialRoute={{ view: "dashboard" }} />;
}
