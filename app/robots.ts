import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/**
 * Endpoint GET publik yang dipanggil client untuk merender konten halaman
 * (proyek, layanan, statistik). Harus boleh di-crawl agar Googlebot bisa
 * merender halaman secara utuh. Respons JSON-nya tetap diberi
 * `X-Robots-Tag: noindex` (lihat next.config.ts) supaya tidak masuk hasil pencarian.
 * Path spesifik (Allow) mengalahkan aturan umum `Disallow: /api/`.
 */
const RENDER_API_PATHS = ["/api/projects", "/api/services", "/api/stats"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", ...RENDER_API_PATHS],
        disallow: ["/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
