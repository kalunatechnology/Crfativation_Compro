"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { dummyProjects, dummyServices } from "@/data/dummy";
import type { Project, Service } from "@/lib/types";

/**
 * Each of the three artboards in hub.svg has a 1440 × 972 coordinate system.
 * Assets originate from hub.svg rather than approximated 3D placeholders.
 * Only image/text content comes from the existing SQLite-backed APIs.
 */
const SOURCE = {
  stage: "/assets/hub-source-stage.webp",
  modular: "/assets/hub-source-modular.webp",
  versatile: "/assets/hub-source-versatile.webp",
  project: "/assets/hub-source-project.webp",
  glow: "/assets/hub-source-glow.webp",
};

const aliases: Record<string, string> = {
  "/assets/hub-stage.webp": SOURCE.stage,
  "/assets/hub-modular.webp": SOURCE.modular,
  "/assets/hub-modular.svg": SOURCE.modular,
  "/assets/hub-modular-icon.avif": SOURCE.modular,
  "/assets/hub-modular-reference.avif": SOURCE.modular,
  "/assets/hub-versatile.webp": SOURCE.versatile,
  "/assets/hub-versatile.svg": SOURCE.versatile,
  "/assets/hub-midcafe.webp": SOURCE.project,
  "/assets/portfolio-coffeebooth.webp": SOURCE.project,
};
const imageFor = (src: string) => aliases[src] ?? src;
const clamp = (value: number) => Math.max(0, Math.min(1, value));
const smooth = (start: number, end: number, p: number) => {
  const t = clamp((p - start) / (end - start));
  return t * t * (3 - 2 * t);
};

const initialServices: Service[] = dummyServices.map((service, index) => ({
  ...service,
  id: index + 1,
}));
const initialProjects: Project[] = dummyProjects.map((project, index) => ({
  ...project,
  id: index + 1,
}));

const arsenal = { fontFamily: "var(--font-arsenal), Georgia, serif" };

function ServiceArt({ service }: { service: Service }) {
  return (
    <Image
      src={imageFor(service.image)}
      alt=""
      fill
      unoptimized
      sizes="(max-width: 1024px) 100px, 259px"
      className="object-contain"
    />
  );
}

function ServiceCard({ service, large = false }: { service: Service; large?: boolean }) {
  return large ? (
    <article className="relative h-[466px] w-[776px] shrink-0 overflow-hidden rounded-[43.5px] bg-white text-[#161616] shadow-[0_22px_55px_rgba(0,0,0,0.30)]">
      <div className="absolute left-[58px] top-[96px] h-[274px] w-[259px]">
        <ServiceArt service={service} />
      </div>
      <div className="absolute left-[398px] top-[155px] w-[310px]">
        <h3 className="text-[49px] font-normal leading-none tracking-[-0.035em]">{service.name}</h3>
        <p className="mt-[39px] line-clamp-4 max-w-[288px] text-[20px] leading-[1.32]">{service.description}</p>
        <a href={service.href} className="mt-[25px] inline-block text-[16px] text-[#8b204b] hover:underline focus-visible:underline">
          Pelajari lebih lanjut <span aria-hidden="true">→</span>
        </a>
      </div>
    </article>
  ) : (
    <article className="relative h-[223px] w-[371px] overflow-hidden rounded-[20.8px] bg-white text-[#161616] shadow-[0_18px_48px_rgba(0,0,0,0.33)]">
      <div className="absolute left-[27px] top-[46px] h-[131px] w-[124px]">
        <ServiceArt service={service} />
      </div>
      <div className="absolute left-[189px] top-[71px] w-[162px]">
        <h3 className="text-[26px] font-normal leading-none tracking-[-0.03em]">{service.name}</h3>
        <p className="mt-[15px] line-clamp-4 text-[11px] leading-[1.28]">{service.description}</p>
        <a href={service.href} className="mt-[11px] inline-block text-[11px] text-[#8b204b] hover:underline">
          Pelajari lebih lanjut <span aria-hidden="true">→</span>
        </a>
      </div>
    </article>
  );
}

function ProjectPhoto({ project, large = false }: { project: Project; large?: boolean }) {
  return (
    <div className={large
      ? "relative h-[467px] w-[865px] overflow-hidden rounded-[29.3px] shadow-[0_25px_65px_rgba(0,0,0,0.33)]"
      : "relative h-[218px] w-[403px] overflow-hidden rounded-[29.3px] shadow-[0_20px_47px_rgba(0,0,0,0.38)]"
    }>
      <Image
        src={imageFor(project.image)}
        alt={project.imageAlt || project.title}
        fill
        unoptimized
        sizes={large ? "865px" : "403px"}
        className="object-cover"
      />
    </div>
  );
}

function MobileHub({ services, projects }: { services: Service[]; projects: Project[] }) {
  return (
    <div className="mx-auto max-w-[670px] px-5 pb-20 pt-24">
      <h2 className="mx-auto max-w-[390px] text-center text-[clamp(26px,6vw,40px)] leading-[1.15] tracking-[-0.03em]" style={arsenal}>
        Redefining space within commercial needs
      </h2>
      <div className="relative mx-auto mt-6 aspect-[2226/1920] w-full max-w-[550px]">
        <Image src={SOURCE.stage} alt="Konsep panggung tiga dimensi Craftivation" fill unoptimized sizes="(max-width: 670px) 90vw, 550px" className="object-contain" />
      </div>
      {services.length > 0 && (
        <div className="mt-12">
          <h3 className="mb-5 text-[28px]" style={arsenal}>Lihat Layanan Kami</h3>
          <div className="grid gap-4">
            {services.map((item) => (
              <article key={item.id} className="flex items-center gap-4 rounded-[22px] bg-white p-5 text-[#171717]">
                <div className="relative h-[95px] w-[95px] shrink-0"><ServiceArt service={item} /></div>
                <div className="min-w-0">
                  <h4 className="text-[23px] leading-none">{item.name}</h4>
                  <p className="mt-2 text-[12px] leading-[1.35]">{item.description}</p>
                  <a href={item.href} className="mt-2 inline-block text-xs text-[#8b204b]">Pelajari lebih lanjut →</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
      {projects.length > 0 && (
        <div className="mt-14">
          <h3 className="mb-5 text-[28px]" style={arsenal}>Lihat Proyek Kami</h3>
          {projects.slice(0, 3).map((item) => (
            <a href={item.href} key={item.id} className="mb-9 block">
              <div className="relative aspect-[865/467] overflow-hidden rounded-[20px]">
                <Image src={imageFor(item.image)} alt={item.imageAlt || item.title} fill unoptimized sizes="(max-width: 670px) 90vw, 600px" className="object-cover" />
              </div>
              <div className="mt-3 flex justify-between text-[13px] text-white/70"><span>{item.number}</span><span>{item.client}</span></div>
              <h4 className="mt-3 text-center text-[25px] leading-tight" style={arsenal}>{item.title}</h4>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default function HubSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [scale, setScale] = useState(1);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [services, setServices] = useState<Service[]>(initialServices);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [projectIndex, setProjectIndex] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      const [s, p] = await Promise.allSettled([
        fetch("/api/services", { cache: "no-store", signal: controller.signal }).then((r) => {
          if (!r.ok) throw new Error("services unavailable");
          return r.json();
        }),
        fetch("/api/projects", { cache: "no-store", signal: controller.signal }).then((r) => {
          if (!r.ok) throw new Error("projects unavailable");
          return r.json();
        }),
      ]);
      if (controller.signal.aborted) return;
      if (s.status === "fulfilled" && Array.isArray(s.value?.data)) setServices(s.value.data);
      if (p.status === "fulfilled" && Array.isArray(p.value?.data)) setProjects(p.value.data);
    }
    void load();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReducedMotion(media.matches);
    updateMotion();
    media.addEventListener("change", updateMotion);

    let frame = 0;
    const measure = () => {
      frame = 0;
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const travel = Math.max(1, rect.height - window.innerHeight);
      const next = clamp(-rect.top / travel);
      setProgress((last) => Math.abs(last - next) > 0.001 ? next : last);
      setScale(Math.min(window.innerWidth / 1440, window.innerHeight / 972));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      media.removeEventListener("change", updateMotion);
    };
  }, []);

  const activeProject = projects.length
    ? projects[Math.min(projectIndex, projects.length - 1)]
    : undefined;
  const firstService = services[0];
  const secondService = services[1];

  // Three linked compositions, not three unrelated slide transitions.
  const approachIn = 1 - smooth(0.15, 0.40, progress);
  const servicesIn = smooth(0.25, 0.46, progress) * (1 - smooth(0.57, 0.79, progress));
  const projectIn = smooth(0.65, 0.86, progress);
  const zoom = smooth(0.10, 0.50, progress);
  const stageExit = smooth(0.61, 0.86, progress);

  const go = (phase: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const top = window.scrollY + section.getBoundingClientRect().top;
    const travel = Math.max(0, section.offsetHeight - window.innerHeight);
    window.scrollTo({ top: top + travel * phase, behavior: reducedMotion ? "instant" : "smooth" });
  };

  const canvasStyle = { transform: `translate(-50%, -50%) scale(${scale})` };

  return (
    <section id="approach" ref={sectionRef} aria-label="Pendekatan Craftivation" className="relative isolate scroll-mt-[70px] overflow-clip bg-[#010101] text-white">
      <div className={reducedMotion ? "lg:block" : "lg:hidden"}>
        <MobileHub services={services} projects={projects} />
      </div>

      <div className={reducedMotion ? "hidden" : "relative hidden h-[320svh] lg:block"}>
        <div className="sticky top-0 h-[100svh] min-h-[600px] overflow-hidden bg-[#010101]">
          <div className="absolute left-1/2 top-1/2 h-[972px] w-[1440px] origin-center" style={canvasStyle}>

            {/* Shared stage moves and zooms continuously across the first transition. */}
            <div aria-hidden="true" className="pointer-events-none absolute left-[349px] top-[170px] z-0 h-[732px] w-[742px] will-change-transform" style={{
              opacity: 1 - stageExit,
              transform: `translate3d(${zoom * -170}px, ${zoom * 250}px, 0) scale(${1 + zoom * 1.25})`,
              transformOrigin: "center center",
            }}>
              <Image src={SOURCE.stage} alt="" fill unoptimized sizes="742px" className="object-contain" />
              {/* The central burgundy column is reproduced as the vector geometry from hub.svg. */}
              <svg viewBox="650 438 140 213" aria-hidden="true" className="absolute left-[41%] top-[33%] h-[32%] w-[18%] overflow-visible">
                <defs>
                  <linearGradient id="hub-pillar-right" x1="718" y1="473" x2="760" y2="603" gradientUnits="userSpaceOnUse"><stop stopColor="#7E1435"/><stop offset="1" stopColor="#3B0016"/></linearGradient>
                  <linearGradient id="hub-pillar-left" x1="678" y1="472" x2="720" y2="628" gradientUnits="userSpaceOnUse"><stop stopColor="#630724"/><stop offset="1" stopColor="#2B0011"/></linearGradient>
                </defs>
                <path d="M719.792 498.895L760.09 472.756V603.453L719.792 629.592V498.895Z" fill="url(#hub-pillar-right)"/>
                <path d="M679.494 603.452L719.792 629.592V498.895L679.494 472.755V603.452Z" fill="url(#hub-pillar-left)"/>
                <path d="M718.756 450.51C719.393 450.125 720.191 450.125 720.827 450.51L758.352 473.223C759.638 474.001 759.638 475.867 758.352 476.645L720.827 499.357C720.191 499.743 719.393 499.743 718.756 499.357L681.231 476.645C679.946 475.867 679.946 474.001 681.231 473.223L718.756 450.51Z" fill="#A52C4E"/>
                <path d="M718.758 572.492C719.394 572.108 720.19 572.108 720.826 572.492L769.237 601.741C770.525 602.519 770.525 604.386 769.237 605.164L720.826 634.413C720.19 634.797 719.394 634.797 718.758 634.413L670.347 605.164C669.059 604.386 669.059 602.519 670.347 601.741L718.758 572.492Z" fill="white" opacity=".93"/>
              </svg>
            </div>

            {/* Scene 1: placement measured from the first 972px of hub.svg. */}
            <div className="absolute inset-0 z-10" aria-hidden={approachIn < 0.03} style={{ opacity: approachIn, visibility: approachIn < 0.02 ? "hidden" : "visible", pointerEvents: approachIn > 0.12 ? "auto" : "none" }}>
              <h2 className="absolute left-1/2 top-[155px] w-[840px] -translate-x-1/2 text-center text-[40px] font-normal leading-tight tracking-[-0.025em]" style={arsenal}>
                Redefining space within commercial needs
              </h2>
              <button type="button" className="absolute left-[144px] top-[237px] text-[20px] text-white/85 hover:text-white" onClick={() => go(0.46)}>
                Lihat Layanan Kami
              </button>
              {firstService && (
                <div className="absolute left-[144px] top-[297px]" style={{ transform: `translate3d(${-zoom * 165}px, ${zoom * -25}px, 0) scale(${1 + zoom * 0.5})`, transformOrigin: "center" }}>
                  <ServiceCard service={firstService} />
                </div>
              )}
              {activeProject && (
                <>
                  <button type="button" onClick={() => go(0.86)} className="absolute left-[1040px] top-[447px] w-[310px] text-right text-[20px] text-white/85 hover:text-white">
                    Lihat Proyek Kami
                  </button>
                  <button type="button" onClick={() => go(0.86)} aria-label={`Lihat proyek ${activeProject.title}`} className="absolute left-[947px] top-[487px] rounded-[29px] focus-visible:outline-2 focus-visible:outline-white" style={{ transform: `translate3d(${zoom * -60}px, ${zoom * -12}px, 0) scale(${1 + zoom * 0.18})` }}>
                    <ProjectPhoto project={activeProject} />
                  </button>
                </>
              )}
            </div>

            {/* Scene 2: actual service-card geometry from rows 972–1944 of hub.svg. */}
            <div className="absolute inset-0 z-20 overflow-hidden" aria-hidden={servicesIn < 0.03} style={{ opacity: servicesIn, visibility: servicesIn < 0.02 ? "hidden" : "visible", pointerEvents: servicesIn > 0.12 ? "auto" : "none" }}>
              <div aria-hidden="true" className="pointer-events-none absolute bottom-[-160px] right-[-120px] h-[370px] w-[590px] -rotate-[30deg] bg-white/20 blur-[65px]" />
              <div className="absolute left-[176px] top-[54px] flex items-center gap-[20px]">
                <button type="button" onClick={() => go(0.02)} aria-label="Kembali ke tampilan utama" className="text-[43px] leading-none text-white/90 hover:text-white">‹</button>
                <h3 className="text-[44px] leading-tight" style={arsenal}>Lihat Layanan Kami</h3>
              </div>
              <div className="absolute left-[135px] top-[140px] flex w-max gap-[58px] will-change-transform" style={{ transform: `translateX(${(1 - smooth(0.30, 0.49, progress)) * 260}px) scale(${0.91 + smooth(0.30, 0.49, progress) * 0.09})`, transformOrigin: "left center" }}>
                {firstService && <ServiceCard service={firstService} large />}
                {secondService && <ServiceCard service={secondService} large />}
              </div>
            </div>

            {/* Scene 3: SVG's project card, side metadata and soft brown glow. */}
            <div className="absolute inset-0 z-30 overflow-hidden" aria-hidden={projectIn < 0.03} style={{ opacity: projectIn, visibility: projectIn < 0.02 ? "hidden" : "visible", pointerEvents: projectIn > 0.12 ? "auto" : "none" }}>
              <div aria-hidden="true" className="pointer-events-none absolute left-[390px] top-[385px] h-[361px] w-[668px] opacity-65 blur-[29px]">
                <Image src={SOURCE.glow} alt="" fill unoptimized sizes="668px" className="object-cover" />
              </div>
              <div aria-hidden="true" className="pointer-events-none absolute bottom-[-130px] left-[-120px] h-[470px] w-[260px] rotate-[38deg] bg-white/20 blur-[50px]" />
              <button type="button" onClick={() => go(0.47)} aria-label="Kembali ke layanan" className="absolute left-[293px] top-[48px] text-[43px] leading-none text-white/90 hover:text-white">‹</button>
              <h3 className="absolute left-1/2 top-[22px] -translate-x-1/2 whitespace-nowrap text-[47px]" style={arsenal}>Lihat Proyek Kami</h3>
              {activeProject && (
                <>
                  <a href={activeProject.href} className="absolute left-[293px] top-[100px] rounded-[29px] focus-visible:outline-2 focus-visible:outline-white" style={{ transform: `translate3d(0, ${(1 - smooth(0.70, 0.89, progress)) * 54}px,0) scale(${0.94 + 0.06 * smooth(0.70, 0.89, progress)})` }}>
                    <ProjectPhoto project={activeProject} large />
                  </a>
                  <span className="absolute left-[175px] top-[315px] text-[28px]">{activeProject.number}</span>
                  <span className="absolute right-[170px] top-[315px] text-[28px]">{activeProject.client}</span>
                  <h4 className="absolute left-1/2 top-[609px] w-[1110px] -translate-x-1/2 text-center text-[49px] leading-tight tracking-[-0.02em]" style={arsenal}>{activeProject.title}</h4>
                  {projects.length > 1 && (
                    <div className="absolute bottom-[62px] left-1/2 flex -translate-x-1/2 gap-7">
                      <button type="button" onClick={() => setProjectIndex((i) => (i - 1 + projects.length) % projects.length)} aria-label="Proyek sebelumnya" className="rounded-full border border-white/40 px-4 py-1 text-2xl hover:bg-white/15">‹</button>
                      <button type="button" onClick={() => setProjectIndex((i) => (i + 1) % projects.length)} aria-label="Proyek berikutnya" className="rounded-full border border-white/40 px-4 py-1 text-2xl hover:bg-white/15">›</button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}