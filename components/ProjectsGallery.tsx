"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useProjects } from "@/lib/useProjects";
import type { Project } from "@/lib/types";
import ProjectDetailModal from "@/components/ProjectDetailModal";

const PAGE_SIZE = 6;

/**
 * Single SQLite project collection shared with homepage.
 * Pop up project details matching pop up project details.svg
 */
export default function ProjectsGallery() {
  const { items, status } = useProjects();
  const [limit, setLimit] = useState(PAGE_SIZE);
  const [selected, setSelected] = useState<Project | null>(null);

  // Sync with URL hash if present (e.g. /projects#exhibition-project or /projects#03)
  useEffect(() => {
    if (!items.length) return;
    const hash = window.location.hash.replace(/^#/, "");
    if (hash) {
      const match = items.find(
        (p) =>
          p.slug === hash ||
          String(p.id) === hash ||
          p.number === hash ||
          p.number === hash.padStart(2, "0")
      );
      if (match) {
        setSelected(match);
      }
    }
  }, [items]);

  const visible = items.slice(0, limit);
  const remaining = Math.max(0, items.length - limit);

  return (
    <>
      <section id="projects" className="projectsIndex" aria-labelledby="projects-index-title">
        <div className="projectsIndex__heading" data-home-reveal="rise">
          <h2 id="projects-index-title">Portofolio Kami</h2>
          <p className="projectsIndex__state" aria-live="polite">
            {status === "error" ? "Menampilkan contoh proyek sementara. Data belum tersambung." :
              status === "loading" ? "Memuat proyek terbaru…" :
                items.length ? String(items.length).padStart(2, "0") + " PROYEK" : ""}
          </p>
        </div>

        {visible.length ? (
          <div className="projectsIndex__grid">
            {visible.map((project, index) => (
              <article key={project.id} className="projectsIndex__item" data-home-reveal="card">
                <button
                  type="button"
                  className="projectsIndex__open"
                  onClick={() => setSelected(project)}
                  aria-label={"Lihat detail proyek " + project.title}
                >
                  <span className="projectsIndex__imageWrap">
                    <Image
                      src={project.image?.trim() || "/assets/portfolio-coffeebooth.webp"}
                      alt={project.imageAlt?.trim() || project.title}
                      fill
                      unoptimized
                      sizes="(max-width: 760px) 92vw, (max-width: 1280px) 45vw, 540px"
                      className="projectsIndex__image"
                    />
                    <span className="projectsIndex__imageAction" aria-hidden="true">Lihat Proyek ↗</span>
                  </span>
                  <span className="projectsIndex__meta">
                    <span className="projectsIndex__name">{project.title}</span>
                    <span className="projectsIndex__number">{project.number || String(index + 1).padStart(2, "0")}</span>
                  </span>
                </button>
              </article>
            ))}
          </div>
        ) : (
          <div className="projectsIndex__empty" role="status">
            Belum ada proyek yang dipublikasikan.
          </div>
        )}

        {remaining > 0 && (
          <div className="projectsIndex__more">
            <button type="button" onClick={() => setLimit(old => old + PAGE_SIZE)} className="projectsIndex__moreBtn">
              Lihat proyek lainnya
              <span aria-hidden="true">↓</span>
            </button>
            <span>{Math.min(limit, items.length)} dari {items.length} proyek</span>
          </div>
        )}
      </section>

      {/* Modern Pop Up Project Details matching pop up project details.svg */}
      <ProjectDetailModal
        project={selected}
        allProjects={items}
        onClose={() => setSelected(null)}
        onSelectProject={(project) => setSelected(project)}
      />
    </>
  );
}
