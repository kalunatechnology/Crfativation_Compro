import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/**
 * Endpoint publik & aset yang harus bebas diakses crawler:
 * - Ikon situs (Googlebot-Favicon & SERP icons)
 * - File manifest PWA
 * - Asset gambar & font
 * - Endpoint rendering JSON (tetap berstatus noindex di header HTTP)
 */
const RENDER_API_PATHS = ["/api/projects", "/api/services", "/api/stats"];
const STATIC_ALLOW_PATHS = [
  "/",
  "/favicon.ico",
  "/icon.png",
  "/icon.svg",
  "/apple-icon.png",
  "/apple-touch-icon.png",
  "/manifest.webmanifest",
  "/assets/",
  ...RENDER_API_PATHS,
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: STATIC_ALLOW_PATHS,
        disallow: ["/api/"],
      },
      // Izinkan crawler khusus ikon, gambar, dan search engine utama tanpa hambatan
      {
        userAgent: [
          "Googlebot",
          "Googlebot-Image",
          "Googlebot-Favicon",
          "Bingbot",
          "Applebot",
          "YandexBot",
          "DuckDuckBot",
        ],
        allow: "/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
