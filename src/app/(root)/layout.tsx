import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { author, siteCopy, siteName, siteUrl } from "@/lib/site";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: siteCopy.en.title,
  description: siteCopy.en.description,
  applicationName: siteName,
  authors: [author],
  creator: author.name,
  publisher: author.name,
  manifest: "/manifest.webmanifest",
};

export default function RootRedirectLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}<Analytics /><SpeedInsights /></body>
    </html>
  );
}
