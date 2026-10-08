"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { dummyProjects, dummyServices } from "@/data/dummy";
import type { Project, Service } from "@/lib/types";

// Seluruh tampilan memakai utility Tailwind + inline style untuk animasi.
// Tidak membutuhkan CSS Module, Framer Motion, atau library animasi lainnya.
const ASSETS = {
  stage: "/assets/hub-stage.svg",
};

// Handle legacy image paths already saved in SQLite.
function resolveAsset(path: string) {
  const replacements: Record<string, string> = {
    "/assets/hub-stage.webp": "/assets/hub-stage.svg",
    "/assets/hub-modular.webp": "/assets/hub-modular.svg",
    "/assets/hub-versatile.webp": "/assets/hub-versatile.svg",
    "/assets/hub-midcafe.webp": "/assets/portfolio-coffeebooth.webp",
  };
  return replacements[path] ?? path;
}

const clamp = (value: number) => Math.max(0, Math.min(1, value));
const ease = (from: number, to: number, value: number) => {
  const t = clamp((value - from) / (to - from));
  return t * t * (3 - 2 * t);
};

// Fallback sebelum/tanpa respons API (data berasal dari SQLite via /api).
const fallbackServices: Service[] = dummyServices.map((s, i) => ({ ...s, id: i + 1 }));
const fallbackProjects: Project[] = dummyProjects.map((p, i) => ({ ...p, id: i + 1 }));

function ServiceCard({
  name,
  image,
  description,
  href,
  compact = false,
}: Pick<Service, "name" | "image" | "description" | "href"> & {
  compact?: boolean;
}) {
  return (
    <article
      className={`flex items-center bg-white text-[#161616] shadow-[0_18px_60px_rgba(0,0,0,0.15)] ${
        compact
          ? "min-h-[142px] gap-4 rounded-[17px] p-4"
          : "min-h-[198px] gap-5 rounded-[22px] p-6 lg:gap-7 lg:p-8"
      }`}
    >
      <Image src={resolveAsset(image)} alt="" width={140} height={140} unoptimized className={`shrink-0 rounded-lg object-contain ${compact ? "h-[90px] w-[90px]" : "h-[118px] w-[118px] lg:h-[140px] lg:w-[140px]"}`} />
      <div className="min-w-0 flex-1">
        <h3 className={`font-normal tracking-[-0.035em] ${compact ? "text-[21px]" : "text-[27px] lg:text-[31px]"}`}>
          {name}
        </h3>
        <p className={`mt-2 leading-[1.45] text-[#393939] ${compact ? "text-[10px]" : "text-[12px] lg:text-[13px]"}`}>
          {description}
        </p>
        {!compact && (
          <a
            href={href}
            className="mt-5 inline-block text-[12px] font-medium text-[#8e204b] transition-colors hover:text-[#5e1230]"
          >
            Pelajari lebih lanjut <span aria-hidden="true">→</span>
          </a>
        )}
      </div>
    </article>
  );
}

function ProjectPreview({ project, large = false }: { project: Project; large?: boolean }) {
  return (
    <div className="relative">
      <Image src={resolveAsset(project.image)} alt={project.imageAlt} width={1000} height={540} unoptimized className={`w-full object-cover ${
          large
            ? "aspect-[1.88/1] rounded-[18px] shadow-[0_28px_70px_rgba(0,0,0,0.35)]"
            : "aspect-[1.9/1] rounded-[17px] shadow-[0_16px_45px_rgba(0,0,0,0.35)]"
        }`} />
    </div>
  );
}

export default function HubSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [services, setServices] = useState<Service[]>(fallbackServices);
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const [projectIdx, setProjectIdx] = useState(0);

  // Ambil data terbaru dari SQLite lewat API; fallback ke dummy bila gagal.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [s, p] = await Promise.all([
          fetch("/api/services").then((r) => r.json()),
          fetch("/api/projects").then((r) => r.json()),
        ]);
        if (cancelled) return;
        if (Array.isArray(s?.data) && s.data.length) setServices(s.data);
        if (Array.isArray(p?.data) && p.data.length) setProjects(p.data);
      } catch {
        /* tetap pakai fallback */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const project = projects[Math.min(projectIdx, projects.length - 1)];
  const stepProject = (dir: number) =>
    setProjectIdx((i) => (i + dir + projects.length) % projects.length);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotionChange = () => setReduceMotion(motionQuery.matches);
    onMotionChange();
    motionQuery.addEventListener?.("change", onMotionChange);

    let raf = 0;
    const measure = () => {
      raf = 0;
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const travel = Math.max(1, rect.height - window.innerHeight);
      const next = clamp(-rect.top / travel);
      setProgress((previous) => (Math.abs(previous - next) > 0.001 ? next : previous));
    };
    const schedule = () => {
      if (!raf) raf = window.requestAnimationFrame(measure);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      motionQuery.removeEventListener?.("change", onMotionChange);
    };
  }, []);

  // Perjalanan animasi: 0% Hub utama → ~40% Layanan → ~80% Proyek.
  const p = reduceMotion ? 0 : progress;
  const serviceIn = ease(0.17, 0.34, p);
  const projectIn = ease(0.60, 0.79, p);
  const introOpacity = 1 - ease(0.08, 0.25, p);
  const serviceOpacity = serviceIn * (1 - ease(0.51, 0.66, p));
  const projectOpacity = projectIn;
  const stageScale = 1 + serviceIn * 0.72 + projectIn * 0.28;
  const stageX = serviceIn * 165 - projectIn * 415;
  const stageY = serviceIn * 180 + projectIn * 30;

  const scrollToPhase = (phase: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const sectionTop = window.scrollY + section.getBoundingClientRect().top;
    const scrollable = section.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: sectionTop + scrollable * phase,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <section
      id="approach"
      aria-label="Redefining space within commercial needs"
      className="relative isolate scroll-mt-[70px] overflow-clip bg-[#030303] text-white"
    >
      {/* MOBILE: susunan statis yang aman untuk layar kecil */}
      <div className={`mx-auto max-w-[600px] px-5 pb-20 pt-20 ${reduceMotion ? "md:block" : "md:hidden"}`}>
        <h2 className="mx-auto max-w-[370px] text-center text-[29px] font-normal leading-[1.16] tracking-[-0.035em]">
          Redefining space within commercial needs
        </h2>
        <div className="relative mx-auto mt-7 aspect-[1.16] w-full max-w-[480px]">
          <Image src={ASSETS.stage} alt="Craftivation 3D isometric exhibition concept" width={1000} height={700} unoptimized className="h-full w-full object-contain" />
        </div>

        <div className="mt-5 flex items-center justify-between gap-4">
          <h3 className="text-[20px] font-normal">Lihat Layanan Kami</h3>
          <span aria-hidden="true" className="text-[25px] text-white/50">↘</span>
        </div>
        <div className="mt-5 grid gap-3">
          {services.slice(0, 2).map((item) => (
            <ServiceCard key={item.id} {...item} compact />
          ))}
        </div>

        <div className="mt-14 flex items-center justify-between gap-4">
          <h3 className="text-[20px] font-normal">Lihat Proyek Kami</h3>
          <a href="#projects" aria-label="Lihat semua proyek" className="text-[25px] text-white/60">↗</a>
        </div>
        {projects.slice(0, 3).map((item) => (
          <div key={item.id} className="mt-5">
            <ProjectPreview project={item} large />
            <div className="mt-4 flex items-center justify-between text-[13px] text-white/65">
              <span>{item.number}</span>
              <span>{item.client}</span>
            </div>
            <p className="mt-3 text-center text-[24px] tracking-[-0.035em]">{item.title}</p>
          </div>
        ))}
      </div>

      {/* DESKTOP: sticky storytelling on scroll. */}
      <div ref={sectionRef} className={`relative hidden h-[320svh] ${reduceMotion ? "md:hidden" : "md:block"}`}>
        <div className="sticky top-0 h-[100svh] min-h-[640px] w-full overflow-hidden bg-[#030303]">
          {/* Sumbu 3D panggung: membesar & bergerak mengikuti scroll */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-[52%] w-[min(1000px,82vw)] aspect-[1.16] will-change-transform"
            style={{
              transform: `translate(-50%, -50%) translate3d(${stageX}px, ${stageY}px, 0) scale(${stageScale})`,
            }}
          >
            <Image src={ASSETS.stage} alt="" width={1000} height={700} unoptimized className="h-full w-full object-contain" />
            {/* Menara maroon di tengah podium seperti referensi Figma */}
            <div
              className="absolute left-1/2 top-[51%] h-[100px] w-[30px] -translate-x-1/2 bg-gradient-to-r from-[#350714] via-[#7f173b] to-[#410d25] shadow-[8px_16px_18px_rgba(0,0,0,0.5)] lg:h-[130px] lg:w-[38px]"
              style={{ clipPath: "polygon(0 9%, 52% 0, 100% 9%, 100% 93%, 52% 100%, 0 93%)" }}
            >
              <div className="absolute inset-x-0 top-[7%] h-[5px] bg-white/65 blur-[2px]" />
              <div className="absolute inset-x-0 bottom-0 h-[4px] bg-white shadow-[0_0_12px_rgba(255,255,255,0.95)]" />
            </div>
          </div>

          {/* FASE 1: intro Hub + dua kartu yang mengapit panggung */}
          <div
            className="pointer-events-none absolute inset-0 z-10"
            style={{ opacity: introOpacity, visibility: introOpacity < 0.02 ? "hidden" : "visible" }}
          >
            <h2
              className="absolute left-1/2 top-[14%] w-[min(780px,90vw)] -translate-x-1/2 text-center text-[clamp(27px,2.35vw,38px)] font-normal leading-tight tracking-[-0.04em]"
            >
              Redefining space within commercial needs
            </h2>

            <div className="pointer-events-auto absolute left-[5%] top-[34%] w-[clamp(225px,23vw,315px)] xl:left-[9%]">
              <button type="button" onClick={() => scrollToPhase(0.41)} className="mb-3 text-left text-[12px] tracking-[-0.01em] hover:text-white/75">
                Lihat Layanan Kami <span aria-hidden="true">↗</span>
              </button>
              {services[0] && <ServiceCard {...services[0]} compact />}
            </div>

            <div className="pointer-events-auto absolute right-[5%] top-[45%] w-[clamp(228px,23vw,320px)] xl:right-[9%]">
              <button type="button" onClick={() => scrollToPhase(0.88)} className="mb-3 block w-full text-right text-[12px] hover:text-white/75">
                Lihat Proyek Kami <span aria-hidden="true">↗</span>
              </button>
              <button type="button" onClick={() => scrollToPhase(0.88)} className="block w-full text-left">
                <ProjectPreview project={project} />
              </button>
            </div>
          </div>

          {/* FASE 2: kamera maju ke layanan Modular + Versatile */}
          <div
            className="pointer-events-none absolute inset-0 z-20"
            style={{ opacity: serviceOpacity, visibility: serviceOpacity < 0.02 ? "hidden" : "visible" }}
          >
            <div className="absolute left-[8%] top-[17%] flex items-center gap-4 text-[clamp(20px,2.3vw,34px)] font-normal tracking-[-0.025em]">
              <button
                type="button"
                aria-label="Kembali ke tampilan Hub"
                onClick={() => scrollToPhase(0)}
                className="pointer-events-auto text-white/70 hover:text-white"
              >
                ‹
              </button>
              <span>Lihat Layanan Kami</span>
            </div>
            <div
              className="absolute left-1/2 top-[50%] grid w-[min(1050px,90vw)] -translate-x-1/2 -translate-y-1/2 grid-cols-2 gap-5 lg:gap-7"
              style={{ transform: `translate(-50%, calc(-50% + ${(1 - serviceIn) * 38}px))` }}
            >
              {services.slice(0, 2).map((item) => (
                <div key={item.id} className="pointer-events-auto min-w-0">
                  <ServiceCard {...item} />
                </div>
              ))}
            </div>
          </div>

          {/* FASE 3: kamera berpindah ke proyek Mid-Century Coffeebooth */}
          <div
            className="pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-center px-6"
            style={{ opacity: projectOpacity, visibility: projectOpacity < 0.02 ? "hidden" : "visible" }}
          >
            <div className="relative w-[min(750px,65vw)]">
              <div className="mb-7 flex items-center justify-center gap-7 text-[clamp(23px,2.35vw,36px)] tracking-[-0.035em]">
                <button
                  type="button"
                  aria-label="Kembali ke daftar layanan"
                  onClick={() => scrollToPhase(0.41)}
                  className="pointer-events-auto absolute -left-10 text-white/70 hover:text-white"
                >
                  ‹
                </button>
                <span>Lihat Proyek Kami</span>
              </div>
              <div
                style={{ transform: `translateY(${(1 - projectIn) * 50}px) scale(${0.94 + projectIn * 0.06})` }}
              >
                <a href={project.href} className="pointer-events-auto block" aria-label={`Lihat proyek ${project.title}`}>
                  <ProjectPreview project={project} large />
                </a>
                <div className="pointer-events-none absolute left-[-70px] top-[49%] text-[14px] text-white/80">{project.number}</div>
                <div className="pointer-events-none absolute right-[-94px] top-[49%] text-[14px] text-white/80">{project.client}</div>
                {projects.length > 1 && (
                  <>
                    <button
                      type="button"
                      aria-label="Proyek sebelumnya"
                      onClick={() => stepProject(-1)}
                      className="pointer-events-auto absolute left-3 top-[44%] h-10 w-10 rounded-full bg-black/40 text-2xl backdrop-blur-md hover:bg-black/60"
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      aria-label="Proyek berikutnya"
                      onClick={() => stepProject(1)}
                      className="pointer-events-auto absolute right-3 top-[44%] h-10 w-10 rounded-full bg-black/40 text-2xl backdrop-blur-md hover:bg-black/60"
                    >
                      ›
                    </button>
                  </>
                )}
                <div className="relative mx-auto mt-4 w-fit max-w-full rounded-xl bg-black/20 px-5 py-3 text-center text-[clamp(24px,2.5vw,37px)] tracking-[-0.04em] backdrop-blur-md">
                  {project.title}
                </div>
              </div>
            </div>
          </div>

          {/* Indikator perpindahan adegan */}
          <div className="pointer-events-none absolute bottom-9 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2">
            {[0, 1, 2].map((i) => {
              const selected = p < 0.27 ? 0 : p < 0.69 ? 1 : 2;
              return (
                <span
                  key={i}
                  className={`h-[5px] rounded-full transition-all duration-300 ${selected === i ? "w-8 bg-white" : "w-2 bg-white/35"}`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
