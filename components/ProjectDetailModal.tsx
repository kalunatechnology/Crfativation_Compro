"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { Project } from "@/lib/types";

interface ProjectDetailModalProps {
  project: Project | null;
  allProjects?: Project[];
  onClose: () => void;
  onSelectProject?: (project: Project) => void;
}

export default function ProjectDetailModal({
  project,
  allProjects = [],
  onClose,
  onSelectProject,
}: ProjectDetailModalProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Close on Escape, disable body scroll when open
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [project, onClose]);

  // When project changes, scroll modal container back to top
  useEffect(() => {
    if (project && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [project]);

  if (!project) return null;

  // Other projects for "Similar Projects" section
  const similarProjects = allProjects.filter((p) => p.id !== project.id);

  const whatsappMessage = encodeURIComponent(
    `Halo Craftivation, saya ingin berdiskusi tentang proyek serupa "${project.title}". Mohon informasi estimasi & ketersediaan jadwal konsultasi.`
  );
  const whatsappUrl = `https://wa.me/6282322308719?text=${whatsappMessage}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Detail Proyek ${project.title}`}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5 md:p-8 bg-black/75 backdrop-blur-[6px] animate-[fadeIn_200ms_ease-out_both]"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Outer Shell for positioning floating Close Button */}
      <div
        className="relative w-full max-w-[880px] my-auto animate-[scaleUp_240ms_cubic-bezier(0.16,1,0.3,1)_both]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating Close Button at Top-Right */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup detail proyek"
          className="absolute -top-3.5 -right-3.5 sm:-top-4 sm:-right-4 z-50 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white text-[#181818] shadow-[0_4px_16px_rgba(0,0,0,0.28)] border border-black/10 transition-all duration-200 hover:bg-[#4B002B] hover:text-white hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-[#4B002B] cursor-pointer"
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L13 13M1 13L13 1"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* Modal Card Frame matching pop up project details.svg (rx: 32px, stroke: #3F3F45) */}
        <div
          ref={scrollContainerRef}
          className="relative w-full max-h-[88vh] overflow-y-auto rounded-[28px] sm:rounded-[32px] bg-white border border-[#3F3F45]/30 shadow-[0_25px_80px_rgba(0,0,0,0.45)] scroll-smooth text-[#181818]"
          style={{ scrollbarWidth: "thin", scrollbarColor: "#4B002B rgba(0,0,0,0.06)" }}
        >
          {/* Top Hero Picture (Full Width, Rounded Top, Aspect 16/10) */}
          <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] max-h-[460px] overflow-hidden rounded-t-[28px] sm:rounded-t-[32px] bg-neutral-100">
            <Image
              src={project.image?.trim() || "/assets/portfolio-coffeebooth.webp"}
              alt={project.imageAlt?.trim() || project.title}
              fill
              priority
              unoptimized
              sizes="(max-width: 900px) 95vw, 880px"
              className="w-full h-full object-cover select-none"
            />
          </div>

          {/* Project Details Content Area (Centered Layout) */}
          <div className="px-5 sm:px-10 md:px-14 pt-7 sm:pt-9 pb-10 sm:pb-14 text-center">
            {/* Eyebrow: CRAFTIVATION PROJECT 01 */}
            <span className="inline-block text-[11px] sm:text-[13px] font-semibold tracking-[0.18em] uppercase text-[#4B002B]">
              PROJECT {project.number || "01"}
            </span>

            {/* Project Title (Arsenal font, serif) */}
            <h2 className="mt-2 sm:mt-3 font-serif text-2xl sm:text-3xl md:text-[38px] leading-tight font-normal text-neutral-900">
              {project.title}
            </h2>

            {/* Metadata Badges: Year | Client | Size */}
            <div className="mt-3 flex items-center justify-center gap-3 text-xs sm:text-sm font-medium text-[#4B002B]">
              <span>{project.year || "2026"}</span>
              <span className="inline-block h-3.5 w-[1px] bg-[#4B002B]/40" aria-hidden="true" />
              <span>{project.client || "Craftivation"}</span>
              <span className="inline-block h-3.5 w-[1px] bg-[#4B002B]/40" aria-hidden="true" />
              <span>{project.size || "30m²"}</span>
            </div>

            {/* Project Description Paragraph */}
            {project.description && (
              <p className="mt-5 sm:mt-6 text-sm sm:text-base leading-relaxed text-[#404040] max-w-[700px] mx-auto font-sans font-normal">
                {project.description}
              </p>
            )}

            {/* CTA Button: Diskusikan Project Serupa */}
            <div className="mt-7 sm:mt-8">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-7 sm:px-8 py-3 rounded-[8px] bg-[#4B002B] text-white text-sm sm:text-base font-medium tracking-wide transition-all duration-200 hover:bg-[#620038] hover:shadow-[0_4px_16px_rgba(75,0,43,0.3)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] cursor-pointer"
              >
                Diskusikan Project Serupa
              </a>
            </div>

            {/* Similar Projects Section */}
            {similarProjects.length > 0 && (
              <div className="mt-12 sm:mt-16 pt-8 border-t border-black/5">
                <h3 className="font-serif text-2xl sm:text-[28px] font-normal text-[#4B002B] mb-6 sm:mb-8">
                  Similar Projects
                </h3>

                {/* Horizontal Grid / Carousel */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 text-left">
                  {similarProjects.slice(0, 3).map((similar) => (
                    <article
                      key={similar.id}
                      onClick={() => onSelectProject && onSelectProject(similar)}
                      className="group cursor-pointer flex flex-col"
                    >
                      {/* Card Thumbnail */}
                      <div className="relative w-full aspect-[16/10] overflow-hidden rounded-[18px] bg-neutral-100 shadow-[0_4px_14px_rgba(0,0,0,0.1)] border border-black/5 transition-all duration-300 group-hover:shadow-[0_8px_24px_rgba(0,0,0,0.18)] group-hover:-translate-y-1">
                        <Image
                          src={similar.image?.trim() || "/assets/portfolio-coffeebooth.webp"}
                          alt={similar.imageAlt?.trim() || similar.title}
                          fill
                          unoptimized
                          sizes="(max-width: 640px) 90vw, 260px"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200" />
                      </div>

                      {/* Card Meta Row */}
                      <div className="mt-2.5 px-1 flex items-center justify-between text-xs sm:text-sm font-sans">
                        <span className="font-medium text-neutral-800 truncate pr-2 group-hover:text-[#4B002B] transition-colors">
                          {similar.title}
                        </span>
                        <span className="font-semibold text-neutral-400 group-hover:text-[#4B002B] transition-colors shrink-0">
                          {similar.number || String(similar.id).padStart(2, "0")}
                        </span>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
