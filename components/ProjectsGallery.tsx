"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useProjects } from "@/lib/useProjects";
import type { Project } from "@/lib/types";

const PAGE_SIZE = 6;

/**
 * Single SQLite project collection shared with homepage.
 * The six pieces in the SVG are layout examples, never hard-coded CMS entries.
 * Live isActive/sortOrder/image/number/title determine what is actually shown.
 */
export default function ProjectsGallery() {
  const { items, status } = useProjects();
  const [limit, setLimit] = useState(PAGE_SIZE);
  const [selected, setSelected] = useState<Project | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const node = dialog.current;
    if (!node) return;
    if (selected && !node.open) node.showModal();
    if (!selected && node.open) node.close();
  }, [selected]);

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
                      src={project.image?.trim() || "/assets/project-hero.svg"}
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

      <dialog
        ref={dialog}
        className="projectsDetail"
        aria-label={selected ? "Detail proyek " + selected.title : "Detail proyek"}
        onClose={() => setSelected(null)}
        onClick={event => { if (event.target === event.currentTarget) setSelected(null); }}
      >
        {selected && (
          <div className="projectsDetail__panel">
            <button className="projectsDetail__close" type="button" aria-label="Tutup detail proyek" onClick={() => setSelected(null)}>×</button>
            <div className="projectsDetail__picture">
              <Image
                src={selected.image?.trim() || "/assets/project-hero.svg"}
                alt={selected.imageAlt?.trim() || selected.title}
                fill
                unoptimized
                sizes="(max-width: 760px) 94vw, 730px"
                className="projectsDetail__image"
              />
            </div>
            <div className="projectsDetail__content">
              <span className="projectsDetail__eyebrow">CRAFTIVATION PROJECT {selected.number || ""}</span>
              <h3>{selected.title}</h3>
              {selected.client && <p className="projectsDetail__client">Klien: {selected.client}</p>}
              {selected.description && <p className="projectsDetail__description">{selected.description}</p>}
              <a
                className="projectsDetail__consult"
                href={"https://wa.me/6282322308719?text=" + encodeURIComponent("Halo Craftivation, saya ingin berdiskusi tentang proyek serupa " + selected.title)}
                target="_blank"
                rel="noopener noreferrer"
              >Diskusikan Proyek Serupa ↗</a>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
