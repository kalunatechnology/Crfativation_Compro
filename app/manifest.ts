import type { MetadataRoute } from "next";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} Exhibition Contractor`,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    lang: "id",
    scope: "/",
    background_color: "#FAF8F7",
    theme_color: "#FAF8F7",
    icons: [
      { src: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { src: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { src: "/favicon-192x192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/favicon-512x512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/favicon-192x192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "/favicon-512x512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
