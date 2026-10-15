import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { projectsRepo } from "@/lib/repositories/projects";

// Tanggal rilis / update konten situs
const STATIC_LAST_MODIFIED = new Date("2026-10-14");


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/projects`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/approach`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  let dynamicProjectRoutes: MetadataRoute.Sitemap = [];
  try {
    const projects = projectsRepo.list(false);
    dynamicProjectRoutes = projects
      .filter((project) => Boolean(project.slug))
      .map((project) => ({
        url: `${SITE_URL}/projects#${project.slug}`,
        lastModified: STATIC_LAST_MODIFIED,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      }));
  } catch {
    // Fallback jika database belum diakses saat proses build
  }

  return [...staticRoutes, ...dynamicProjectRoutes];
}
