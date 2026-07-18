import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

const languages = {
  en: new URL("/en", siteUrl).toString(),
  es: new URL("/es", siteUrl).toString(),
};

export default function sitemap(): MetadataRoute.Sitemap {
  return (["en", "es"] as const).map((locale) => ({
    url: languages[locale],
    changeFrequency: "monthly",
    priority: 1,
    alternates: {
      languages: {
        en: languages.en,
        es: languages.es,
        "x-default": languages.en,
      },
    },
  }));
}
