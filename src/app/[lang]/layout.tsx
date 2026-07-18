import type { Metadata } from "next";
import { isLocale } from "@/lib/i18n";
import "../globals.css";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const spanish = lang === "es";
  return {
    title: spanish ? "Centro de estudio SC-200" : "SC-200 Study Hub",
    description: spanish
      ? "Una referencia de estudio abierta e interactiva para preparar el examen Microsoft SC-200."
      : "An interactive, open study reference for the Microsoft SC-200 exam.",
  };
}

export default async function LocalizedLayout({ children, params }: Readonly<{ children: React.ReactNode; params: Promise<{ lang: string }> }>) {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : "en";
  return (
    <html lang={locale} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
