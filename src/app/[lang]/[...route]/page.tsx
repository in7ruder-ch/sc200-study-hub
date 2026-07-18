import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StudyHub } from "@/components/study-hub";
import { getPracticeLabs, localizeLearningPaths } from "@/content/localization/content";
import { practiceLabs as englishPracticeLabs } from "@/content/practice-labs";
import { isLocale, locales } from "@/lib/i18n";
import { siteCopy, siteName, siteUrl } from "@/lib/site";
import { englishExamBlueprint, englishLearningPaths } from "@/lib/study-content";
import { studyRouteFromSegments, studyRoutePath, type StudyRoute } from "@/lib/study-routes";
import type { Locale } from "@/lib/types";

type RouteParams = { lang: string; route: string[] };

function routeSegments() {
  return [
    ["learning-paths"],
    ...englishLearningPaths.flatMap((path) => [
      ["learning-paths", path.id],
      ...path.modules.map((module) => ["learning-paths", path.id, module.id]),
    ]),
    ["exam-blueprint"],
    ["practice-labs"],
    ...englishPracticeLabs.map((lab) => ["practice-labs", lab.id]),
    ["exam-simulator"],
  ];
}

export function generateStaticParams() {
  return locales.flatMap((lang) => routeSegments().map((route) => ({ lang, route })));
}

export const dynamicParams = false;

function validRoute(route: StudyRoute) {
  if (route.view === "learning" && route.pathId) {
    const path = englishLearningPaths.find((candidate) => candidate.id === route.pathId);
    if (!path) return false;
    return !route.moduleId || path.modules.some((module) => module.id === route.moduleId);
  }
  if (route.view === "practice" && route.experience === "labs" && route.labId) {
    return englishPracticeLabs.some((lab) => lab.id === route.labId);
  }
  return route.view !== "dashboard";
}

function localizedMetadata(locale: Locale, route: StudyRoute) {
  const spanish = locale === "es";
  const paths = localizeLearningPaths(englishLearningPaths, locale);
  const labs = getPracticeLabs(locale);

  if (route.view === "learning") {
    const path = paths.find((candidate) => candidate.id === route.pathId);
    const studyModule = path?.modules.find((candidate) => candidate.id === route.moduleId);
    if (studyModule && path) {
      return {
        title: `${studyModule.title} | SC-200 Study Hub`,
        description: studyModule.focus || (spanish ? `Estudiá ${studyModule.title} dentro de ${path.title} para preparar Microsoft SC-200.` : `Study ${studyModule.title} within ${path.title} while preparing for Microsoft SC-200.`),
      };
    }
    if (path) {
      return {
        title: `${path.title} | SC-200 Study Hub`,
        description: spanish ? `Explorá ${path.modules.length} módulos de ${path.title}, seguí tu progreso y conectá cada tema con el examen SC-200.` : `Explore ${path.modules.length} modules from ${path.title}, track progress, and connect each topic to the SC-200 exam.`,
      };
    }
    return {
      title: spanish ? "Rutas de aprendizaje SC-200 | Study Hub" : "SC-200 Learning Paths | Study Hub",
      description: spanish ? "Estudiá las nueve rutas de aprendizaje SC-200 con 54 módulos, 404 unidades y seguimiento local del progreso." : "Study all nine SC-200 learning paths with 54 modules, 404 units, and local progress tracking.",
    };
  }

  if (route.view === "blueprint") {
    return {
      title: spanish ? "Temario del examen SC-200 | Study Hub" : "SC-200 Exam Blueprint | Study Hub",
      description: spanish ? "Explorá los dominios ponderados, grupos funcionales y objetivos oficiales del examen SC-200 con referencias de estudio directas." : "Explore SC-200 weighted domains, functional groups, and official exam objectives with direct study references.",
    };
  }

  if (route.view === "practice" && route.experience === "exam") {
    return {
      title: spanish ? "Simulador de examen SC-200 | 50 preguntas" : "SC-200 Exam Simulator | 50 Questions",
      description: spanish ? "Practicá con un simulador bilingüe de 50 preguntas originales, resultados por dominio, explicaciones y referencias de estudio." : "Practice with a bilingual 50-question SC-200 simulator featuring domain scores, explanations, and study references.",
    };
  }

  if (route.view === "practice" && route.experience === "labs") {
    const lab = labs.find((candidate) => candidate.id === route.labId);
    if (lab) return { title: `${lab.title} | SC-200 Practice Lab`, description: lab.subtitle };
    return {
      title: spanish ? "Laboratorios prácticos SC-200 | Study Hub" : "SC-200 Practice Labs | Study Hub",
      description: spanish ? "Desarrollá criterio de investigación con escenarios guiados de Defender XDR, Sentinel, Endpoint y seguridad cloud." : "Build investigation judgment through guided Defender XDR, Sentinel, Endpoint, and cloud security scenarios.",
    };
  }

  return siteCopy[locale];
}

export async function generateMetadata({ params }: { params: Promise<RouteParams> }): Promise<Metadata> {
  const { lang, route: segments } = await params;
  if (!isLocale(lang)) return {};
  const route = studyRouteFromSegments(segments);
  if (!route || !validRoute(route)) return {};
  const localized = localizedMetadata(lang, route);
  const canonical = studyRoutePath(lang, route);
  const englishPath = studyRoutePath("en", route);
  const spanishPath = studyRoutePath("es", route);

  return {
    metadataBase: siteUrl,
    title: localized.title,
    description: localized.description,
    alternates: {
      canonical,
      languages: { en: englishPath, es: spanishPath, "x-default": englishPath },
    },
    openGraph: {
      type: "website",
      url: canonical,
      title: localized.title,
      description: localized.description,
      siteName,
      locale: siteCopy[lang].locale,
      alternateLocale: [siteCopy[lang].alternateLocale],
    },
    twitter: {
      card: "summary_large_image",
      title: localized.title,
      description: localized.description,
    },
  };
}

export default async function StudyRoutePage({ params }: { params: Promise<RouteParams> }) {
  const { lang, route: segments } = await params;
  if (!isLocale(lang)) notFound();
  const route = studyRouteFromSegments(segments);
  if (!route || !validRoute(route)) notFound();

  return <StudyHub locale={lang} learningPaths={englishLearningPaths} blueprint={englishExamBlueprint} initialRoute={route} />;
}
