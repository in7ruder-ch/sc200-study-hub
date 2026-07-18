import type { Locale } from "@/lib/types";

function resolveSiteUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim() || process.env.VERCEL_URL?.trim();
  const candidate = configuredUrl || (vercelUrl ? `https://${vercelUrl}` : "http://localhost:3000");

  try {
    return new URL(candidate.startsWith("http://") || candidate.startsWith("https://") ? candidate : `https://${candidate}`);
  } catch {
    return new URL("http://localhost:3000");
  }
}

export const siteUrl = resolveSiteUrl();

export const siteCopy: Record<Locale, { title: string; description: string; locale: string; alternateLocale: string }> = {
  en: {
    title: "SC-200 Study Hub | Learning Paths, Labs & Exam Practice",
    description: "Prepare for Microsoft SC-200 with bilingual learning paths, guided security labs, exam blueprint coverage, progress tracking, and a 50-question simulator.",
    locale: "en_US",
    alternateLocale: "es_ES",
  },
  es: {
    title: "Centro de estudio SC-200 | Rutas, laboratorios y simulador",
    description: "Prepará Microsoft SC-200 con rutas bilingües, laboratorios de seguridad, cobertura del temario, seguimiento de progreso y un simulador de 50 preguntas.",
    locale: "es_ES",
    alternateLocale: "en_US",
  },
};

export const siteName = "SC-200 Study Hub";
export const author = {
  name: "in7ruder",
  url: "https://in7ruder.com",
};
