import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { isLocale } from "@/lib/i18n";
import { author, siteCopy, siteName, siteUrl } from "@/lib/site";
import type { Locale } from "@/lib/types";
import "../globals.css";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = lang === "es" ? "es" : "en";
  const localized = siteCopy[locale];
  const path = `/${locale}`;
  const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim();

  return {
    metadataBase: siteUrl,
    title: localized.title,
    description: localized.description,
    applicationName: siteName,
    authors: [author],
    creator: author.name,
    publisher: author.name,
    category: "education",
    keywords: ["SC-200", "Microsoft Security Operations Analyst", "Microsoft Sentinel", "Microsoft Defender XDR", "KQL", "cybersecurity", "exam preparation"],
    alternates: {
      canonical: path,
      languages: {
        en: "/en",
        es: "/es",
        "x-default": "/en",
      },
    },
    openGraph: {
      type: "website",
      url: path,
      title: localized.title,
      description: localized.description,
      siteName,
      locale: localized.locale,
      alternateLocale: [localized.alternateLocale],
    },
    twitter: {
      card: "summary_large_image",
      title: localized.title,
      description: localized.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    manifest: "/manifest.webmanifest",
    verification: googleVerification ? { google: googleVerification } : undefined,
  };
}

export default async function LocalizedLayout({ children, params }: Readonly<{ children: React.ReactNode; params: Promise<{ lang: string }> }>) {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : "en";
  const localized = siteCopy[locale];
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: siteName,
    url: new URL(`/${locale}`, siteUrl).toString(),
    description: localized.description,
    inLanguage: locale,
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    isAccessibleForFree: true,
    author: {
      "@type": "Person",
      name: author.name,
      url: author.url,
    },
    about: {
      "@type": "Thing",
      name: "Microsoft Certified: Security Operations Analyst Associate (SC-200)",
    },
  };

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
