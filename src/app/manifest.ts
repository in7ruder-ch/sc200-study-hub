import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SC-200 Study Hub",
    short_name: "SC-200 Hub",
    description: "Bilingual Microsoft SC-200 learning paths, guided labs, exam blueprint, and practice simulator.",
    start_url: "/en",
    display: "standalone",
    background_color: "#f4f1ea",
    theme_color: "#17324d",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
