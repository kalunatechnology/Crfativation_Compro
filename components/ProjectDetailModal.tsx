"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Project } from "@/lib/types";

interface ProjectDetailModalProps {
  project: Project | null;
  allProjects?: Project[];
  onClose: () => void;
  onSelectProject?: (project: Project) => void;
}

const FALLBACK_IMAGE = "/assets/portfolio-coffeebooth.webp";
const ARSENAL = { fontFamily: "var(--font-arsenal), serif" } as const;

/** Hero + gambar tambahan project, tanpa duplikat / kosong. */
function getGallery(project: Project): string[] {
  const list = [project.image, ...(project.images ?? [])]
    .map((src) => (src ?? "").trim())
    .filter(Boolean);
  const unique = Array.from(new Set(list));
  return unique.length ? unique : [FALLBACK_IMAGE];
}

/* ---------- Hero slider (gambar atas, bisa lebih dari satu) ---------- */
function HeroSlider({ project }: { project: Project }) {
  const images = getGallery(project);
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const count = images.length;

  const go = (next: number) => setIndex(((next % count) + count) % count);

  useEffect(() => {
    if (count < 2) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + count) % count);
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % count);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [count]);

  // Jika hanya satu gambar: tampilkan statis, tidak ada slider/panah/dot, dan tidak bisa di-scroll
  if (count <= 1) {
    return (
      <div
        className="relative w-full overflow-hidden rounded-t-[31px] bg-neutral-100 select-none"
        style={{ aspectRatio: "989 / 530" }}
      >
        <Image
          src={images[0]}
          alt={project.imageAlt?.trim() || project.title}
          fill
          priority
          unoptimized
          draggable={false}
          sizes="(max-width: 1000px) 96vw, 989px"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className="relative w-full overflow-hidden rounded-t-[31px] bg-neutral-100 select-none"
      style={{ aspectRatio: "989 / 530" }}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchStartX.current;
        touchStartX.current = null;
        if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
      }}
      aria-roledescription="carousel"
      aria-label={`Galeri foto ${project.title}`}
    >
      <div
        className="flex h-full w-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ transform: `translate3d(-${index * 100}%,0,0)` }}
      >
        {images.map((src, i) => (
          <div
            key={src + i}
            className="relative h-full w-full shrink-0"
            aria-hidden={i !== index}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} dari ${count}`}
          >
            <Image
              src={src}
              alt={i === 0 ? project.imageAlt?.trim() || project.title : `${project.title} – foto ${i + 1}`}
              fill
              priority={i === 0}
              unoptimized
              draggable={false}
              sizes="(max-width: 1000px) 96vw, 989px"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {count > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Foto sebelumnya"
            className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/85 text-[#181818] shadow-[0_4px_14px_rgba(0,0,0,0.25)] backdrop-blur transition hover:bg-[#4B002B] hover:text-white sm:left-5 sm:h-11 sm:w-11"
          >
            <svg width="9" height="15" viewBox="0 0 9 15" fill="none" aria-hidden="true">
              <path d="M7.5 1.5 1.5 7.5l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Foto berikutnya"
            className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/85 text-[#181818] shadow-[0_4px_14px_rgba(0,0,0,0.25)] backdrop-blur transition hover:bg-[#4B002B] hover:text-white sm:right-5 sm:h-11 sm:w-11"
          >
            <svg width="9" height="15" viewBox="0 0 9 15" fill="none" aria-hidden="true">
              <path d="m1.5 1.5 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/30 px-3 py-1.5 backdrop-blur sm:bottom-4">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => go(i)}
                aria-label={`Lihat foto ${i + 1}`}
                aria-current={i === index}
                className={
                  "h-2 cursor-pointer rounded-full transition-all duration-300 " +
                  (i === index ? "w-6 bg-white" : "w-2 bg-white/55 hover:bg-white/80")
                }
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* ---------- Similar Projects (carousel, kartu tengah fokus) ---------- */
function SimilarCarousel({
  projects,
  onSelect,
}: {
  projects: Project[];
  onSelect?: (project: Project) => void;
}) {
  return (
    <div className="-mx-5 sm:-mx-10 md:-mx-[7%] [container-type:inline-size]">
      <div
        className="flex snap-x snap-mandatory gap-[4.7cqw] overflow-x-auto pb-4 [padding-inline:23.3cqw] [scroll-padding-inline:23.3cqw] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
      {projects.map((similar) => (
        <article
          key={similar.id}
          className="group w-[53cqw] shrink-0 snap-center cursor-pointer text-left"
          onClick={() => onSelect?.(similar)}
        >
          <div
            className="relative w-full overflow-hidden rounded-[14px] bg-neutral-100 shadow-[0_6px_16px_rgba(0,0,0,0.12)] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_12px_26px_rgba(0,0,0,0.2)] sm:rounded-[18px]"
            style={{ aspectRatio: "527 / 285" }}
          >
            <Image
              src={similar.image?.trim() || FALLBACK_IMAGE}
              alt={similar.imageAlt?.trim() || similar.title}
              fill
              unoptimized
              sizes="(max-width: 640px) 55vw, 527px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="mt-2 flex items-baseline justify-between gap-[1.5cqw]">
            <span
              style={{ ...ARSENAL, fontSize: "clamp(14px, 3.7cqw, 38px)" }}
              className="truncate leading-tight text-[#4a4a4a] transition-colors group-hover:text-[#4B002B]"
            >
              {similar.title}
            </span>
            <span
              style={{ ...ARSENAL, fontSize: "clamp(11px, 2.3cqw, 24px)" }}
              className="shrink-0 text-[#6b6b6b]"
            >
              {similar.number || String(similar.id).padStart(2, "0")}
            </span>
          </div>
        </article>
      ))}
    </div>
    </div>
  );
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
      if (event.key === "Escape") onClose();
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
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/75 p-3 backdrop-blur-[6px] animate-[fadeIn_200ms_ease-out_both] sm:p-5 md:p-8"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Outer shell (posisi tombol close) – lebar mengikuti artboard Figma 989px */}
      <div
        className="relative my-auto w-full max-w-[989px] animate-[scaleUp_240ms_cubic-bezier(0.16,1,0.3,1)_both]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup detail proyek"
          className="absolute -right-3 -top-3 z-50 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-black/10 bg-white text-[#181818] shadow-[0_4px_16px_rgba(0,0,0,0.28)] transition-all duration-200 hover:scale-105 hover:bg-[#4B002B] hover:text-white focus-visible:outline-2 focus-visible:outline-[#4B002B] active:scale-95 sm:-right-4 sm:-top-4 sm:h-10 sm:w-10"
        >
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </button>

        {/* Card frame: rx 32, stroke #3F3F45 */}
        <div
          ref={scrollContainerRef}
          className="relative max-h-[90vh] w-full overflow-y-auto rounded-[32px] border border-[#3F3F45] bg-white text-[#181818] scroll-smooth"
          style={{ scrollbarWidth: "thin", scrollbarColor: "#4B002B rgba(0,0,0,0.06)" }}
        >
          {/* Hero slider – key agar index reset saat ganti project */}
          <HeroSlider key={project.id} project={project} />

          <div className="px-5 pb-12 pt-8 text-center sm:px-10 sm:pb-16 sm:pt-12 md:px-[6.5%]">
            <span className="block text-[12px] uppercase tracking-[0.02em] text-[#4B002B] sm:text-[16px]">
              PROJECT {project.number || "01"}
            </span>

            <h2
              style={ARSENAL}
              className="mt-1 text-[30px] font-normal leading-tight text-black sm:mt-2 sm:text-[42px] md:text-[48px]"
            >
              {project.title}
            </h2>

            <div
              style={ARSENAL}
              className="mt-2 flex items-center justify-center gap-3 text-[14px] text-[#4B002B] sm:gap-4 sm:text-[18px] md:text-[20px]"
            >
              <span>{project.year || "2026"}</span>
              <span className="inline-block h-[1.3em] w-px bg-[#4B002B]" aria-hidden="true" />
              <span>{project.client || "Craftivation"}</span>
              <span className="inline-block h-[1.3em] w-px bg-[#4B002B]" aria-hidden="true" />
              <span>{project.size || "30m²"}</span>
            </div>

            {project.description && (
              <p className="mx-auto mt-8 max-w-[880px] text-[14px] font-normal leading-[1.9] text-[#404040] sm:mt-12 sm:text-[17px] md:text-[19px] md:leading-[2.1]">
                {project.description}
              </p>
            )}

            <div className="mt-8 sm:mt-12">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ ...ARSENAL, color: "#FFFFFF" }}
                className="inline-flex h-[41px] cursor-pointer items-center justify-center bg-[#4B002B] px-6 text-[14px] font-normal !text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#620038] hover:!text-white hover:shadow-[0_4px_16px_rgba(75,0,43,0.3)] active:translate-y-0 active:scale-[0.98] sm:min-w-[235px] sm:text-[16px]"
              >
                Diskusikan Project Serupa
              </a>
            </div>

            {similarProjects.length > 0 && (
              <section className="mt-14 sm:mt-24" aria-labelledby="similar-projects-title">
                <h3
                  id="similar-projects-title"
                  style={ARSENAL}
                  className="mb-6 text-[30px] font-normal text-[#4B002B] sm:mb-10 sm:text-[44px] md:text-[54px]"
                >
                  Similar Projects
                </h3>
                <SimilarCarousel
                  key={project.id}
                  projects={similarProjects}
                  onSelect={onSelectProject}
                />
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
