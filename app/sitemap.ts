import type { MetadataRoute } from "next";
import { SITE_URL, SITE_LAST_MODIFIED, DEFAULT_OG_IMAGE } from "@/lib/seo";

const LAST_MODIFIED = new Date(SITE_LAST_MODIFIED);
const OG_IMAGE = `${SITE_URL}${DEFAULT_OG_IMAGE.url}`;

/**
 * Sitemap berisi 5 halaman utama (kandidat sitelink). Prioritas mencerminkan
 * hierarki navigasi; gambar ikut didaftarkan untuk Google Images.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 1.0,
      images: [OG_IMAGE, `${SITE_URL}/icon.png`],
    },
    {
      url: `${SITE_URL}/projects`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.9,
      images: [OG_IMAGE],
    },
    {
      url: `${SITE_URL}/approach`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.9,
      images: [`${SITE_URL}/assets/approach-hero.svg`, OG_IMAGE],
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.8,
      images: [`${SITE_URL}/assets/about-hero-source.svg`, OG_IMAGE],
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.8,
      images: [OG_IMAGE],
    },
  ];

  return routes;
}
