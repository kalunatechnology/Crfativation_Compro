"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { dummyProjects, dummyServices } from "@/data/dummy";
import type { Project, Service } from "@/lib/types";

/**
 * Craftivation Hub: three scroll scenes.
 * Scene 1 dimensions and positions are taken from the supplied 1440×900 SVG.
 * All styling is Tailwind utilities; animation uses native React scroll state.
 * Services and projects still come from SQLite through the existing API.
 */
const STAGE = "/assets/hub-stage-reference.avif";
const CLOSED_STAGE = "/assets/hub-stage-video.avif";
const MODULAR_ART = "/assets/hub-modular-icon.avif";
const clamp = (n: number) => Math.max(0, Math.min(1, n));
const fade = (a: number, b: number, p: number) => {
  const t = clamp((p - a) / (b - a));
  return t * t * (3 - 2 * t);
};

function imageFor(path: string) {
  const aliases: Record<string, string> = {
    "/assets/hub-modular.svg": MODULAR_ART,
    "/assets/hub-modular.webp": MODULAR_ART,
    "/assets/hub-versatile.webp": "/assets/hub-versatile.svg",
    "/assets/hub-modular-reference.avif": MODULAR_ART,
    "/assets/hub-midcafe.webp": "/assets/portfolio-coffeebooth.webp",
  };
  return aliases[path] ?? path;
}

const fallbackServices: Service[] = dummyServices.map((item, index) => ({
  ...item, id: index + 1,
}));
const fallbackProjects: Project[] = dummyProjects.map((item, index) => ({
  ...item, id: index + 1,
}));

function ServiceArtwork({ service, size }: { service: Service; size: number }) {
  return (
    <div className="relative shrink-0 overflow-hidden" style={{ width: size, height: size }}>
      <Image
        src={imageFor(service.image)}
        alt=""
        fill
        unoptimized
        sizes={size + "px"}
        className="object-contain"
      />
    </div>
  );
}


/** Precise card proportions from the supplied SVG at 1440×900. */
function ServiceCard({ service, large = false }: { service: Service; large?: boolean }) {
  return large ? (
    <article className="relative h-[466px] w-[776px] shrink-0 overflow-hidden rounded-[44px] bg-white text-[#141414] shadow-[0_15px_40px_rgba(0,0,0,.24)]">
      <div className="absolute left-[58px] top-[96px] h-[274px] w-[259px]">
        <Image src={imageFor(service.image)} alt="" fill unoptimized sizes="259px" className="object-contain" />
      </div>
      <div className="absolute left-[398px] top-[153px] w-[310px]">
        <h4 className="text-[50px] font-normal leading-[1.08] tracking-[-.035em]">{service.name}</h4>
        <p className="mt-[40px] line-clamp-4 max-w-[282px] text-[20px] leading-[1.30]">{service.description}</p>
        <a href={service.href} className="mt-[28px] inline-block text-[16px] text-[#8B204B] hover:underline">Pelajari lebih lanjut →</a>
      </div>
    </article>
  ) : (
    <article className="relative h-[223px] w-[372px] overflow-hidden rounded-[21px] bg-white text-[#141414] shadow-[0_14px_35px_rgba(0,0,0,.25)]">
      <div className="absolute left-[28px] top-[46px] h-[131px] w-[124px]">
        <Image src={imageFor(service.image)} alt="" fill unoptimized sizes="124px" className="object-contain" />
      </div>
      <div className="absolute left-[190px] top-[70px] w-[160px]">
        <h3 className="text-[26px] font-normal leading-[1.05] tracking-[-.035em]">{service.name}</h3>
        <p className="mt-[14px] line-clamp-4 text-[11px] leading-[1.3]">{service.description}</p>
        <a href={service.href} className="mt-[13px] inline-block text-[11px] text-[#8B204B] hover:underline">Pelajari lebih lanjut →</a>
      </div>
    </article>
  );
}

function ProjectPhoto({ project, large = false }: { project: Project; large?: boolean }) {
  return (
    <div className={large
      ? "relative h-[467px] w-[865px] overflow-hidden rounded-[29px] shadow-[0_24px_60px_rgba(0,0,0,.34)]"
      : "relative h-[218px] w-[403px] overflow-hidden rounded-[29px] shadow-[0_20px_45px_rgba(0,0,0,.34)]"
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

export default function HubSection() {
  const ref = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [scale, setScale] = useState(1);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [services, setServices] = useState<Service[]>(fallbackServices);
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const [projectIndex, setProjectIndex] = useState(0);

  // Read SQLite-backed APIs; dummy.ts is an initial/fallback value, not an overwrite.
  useEffect(() => {
    const controller = new AbortController();
    const load = async () => {
      try {
        const [serviceResponse, projectResponse] = await Promise.all([
          fetch("/api/services", { signal: controller.signal, cache: "no-store" }),
          fetch("/api/projects", { signal: controller.signal, cache: "no-store" }),
        ]);
        if (!serviceResponse.ok || !projectResponse.ok) return;
        const [serviceBody, projectBody] = await Promise.all([
          serviceResponse.json(), projectResponse.json(),
        ]);
        if (controller.signal.aborted) return;
        if (Array.isArray(serviceBody.data)) setServices(serviceBody.data);
        if (Array.isArray(projectBody.data)) setProjects(projectBody.data);
      } catch {
        // Keep the initial dummy.ts fallback if the API is unavailable.
      }
    };
    void load();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotion = () => setReduceMotion(media.matches);
    onMotion();
    media.addEventListener("change", onMotion);

    let frame = 0;
    const measure = () => {
      frame = 0;
      setScale(Math.min(window.innerWidth / 1440, window.innerHeight / 900));
      const section = ref.current;
      if (!section) return;
      const bounds = section.getBoundingClientRect();
      const scrollable = Math.max(1, bounds.height - window.innerHeight);
      const next = clamp(-bounds.top / scrollable);
      setProgress((before) => Math.abs(before - next) > 0.001 ? next : before);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(measure);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      media.removeEventListener("change", onMotion);
    };
  }, []);

  const firstService = services[0];
  const secondService = services[1];
  const selectedProject = projects.length
    ? projects[Math.min(projectIndex, projects.length - 1)]
    : undefined;

  // Overlapping fades keep the composition alive while moving between scenes.
  const intro = 1 - fade(0.15, 0.37, progress);
  const service = fade(0.24, 0.43, progress) * (1 - fade(0.59, 0.77, progress));
  const project = fade(0.65, 0.84, progress);

  const jump = (phase: number) => {
    const section = ref.current;
    if (!section) return;
    const top = window.scrollY + section.getBoundingClientRect().top;
    const travel = Math.max(0, section.offsetHeight - window.innerHeight);
    window.scrollTo({ top: top + phase * travel, behavior: reduceMotion ? "instant" : "smooth" });
  };

  const pageStyle = { transform: "translate(-50%, -50%) scale(" + scale + ")" };
  const headingFont = { fontFamily: "var(--font-arsenal)" };

  return (
    <section
      id="approach"
      ref={ref}
      aria-label="Pendekatan, layanan, dan proyek Craftivation"
      className="relative isolate scroll-mt-[70px] overflow-clip bg-[#010101] text-white"
    >
      {/* Mobile and reduced motion: readable vertical content, no sticky trapping. */}
      <div className={"mx-auto max-w-[700px] px-5 py-20 " + (reduceMotion ? "lg:block" : "lg:hidden")}>
        <h2 className="mx-auto max-w-[420px] text-center text-[clamp(28px,6vw,40px)] leading-tight tracking-[-0.035em]" style={headingFont}>
          Redefining space within commercial needs
        </h2>
        <div className="relative mx-auto mt-8 aspect-[742/864] w-full max-w-[460px]">
          <Image src={CLOSED_STAGE} alt="Panggung isometrik Craftivation" fill unoptimized sizes="(max-width: 700px) 90vw, 460px" className="object-contain" />
        </div>
        {services.length > 0 && (
          <div className="mt-10">
            <h3 className="mb-5 text-2xl" style={headingFont}>Lihat Layanan Kami</h3>
            <div className="grid gap-4">
              {services.slice(0, 2).map((item) => (
                <article key={item.id} className="flex min-w-0 items-center gap-4 rounded-[22px] bg-white p-5 text-black">
                  <div className="relative h-[100px] w-[100px] shrink-0">
                    <Image src={imageFor(item.image)} alt="" fill unoptimized sizes="100px" className="object-contain" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-[24px] leading-tight">{item.name}</h4>
                    <p className="mt-2 text-[13px] leading-relaxed text-black/75">{item.description}</p>
                    <a className="mt-3 inline-block text-xs text-[#8e204b]" href={item.href}>Pelajari lebih lanjut →</a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
        {selectedProject && (
          <div className="mt-12">
            <h3 className="mb-5 text-2xl" style={headingFont}>Lihat Proyek Kami</h3>
            <a href={selectedProject.href} className="relative block aspect-[1.85] overflow-hidden rounded-2xl">
              <Image src={imageFor(selectedProject.image)} alt={selectedProject.imageAlt || selectedProject.title} fill unoptimized sizes="(max-width: 700px) 90vw, 650px" className="object-cover" />
            </a>
            <div className="mt-4 flex justify-between text-sm text-white/75">
              <span>{selectedProject.number}</span><span>{selectedProject.client}</span>
            </div>
            <h4 className="mt-4 text-center text-[28px]" style={headingFont}>{selectedProject.title}</h4>
          </div>
        )}
      </div>

      {/* Desktop: 1440 × 900 reference coordinates, scaled uniformly per viewport. */}
      <div className={"relative h-[320svh] " + (reduceMotion ? "hidden" : "hidden lg:block")}>
        <div className="sticky top-0 h-[100svh] overflow-hidden bg-[#010101]">
          <div className="absolute left-1/2 top-1/2 h-[900px] w-[1440px] origin-center" style={pageStyle}>

            {/* Scene 1: precisely positioned 3D stage, labels and overlaid cards. */}
            <div
              className="absolute inset-0"
              style={{ opacity: intro, visibility: intro > 0.01 ? "visible" : "hidden", pointerEvents: intro > 0.12 ? "auto" : "none" }}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-[349px] top-[145px] h-[640px] w-[742px] will-change-transform"
                style={{ transform: "translateY(" + (fade(0.04, 0.38, progress) * 40) + "px) scale(" + (1 + fade(0.06, 0.38, progress) * 0.19) + ")", transformOrigin: "center center" }}
              >
                <Image src={CLOSED_STAGE} alt="" fill unoptimized sizes="742px" className="object-contain" />
                <div aria-hidden="true" className="absolute left-[50%] top-[44%] h-[168px] w-[65px] -translate-x-1/2 shadow-[0_20px_22px_rgba(0,0,0,.58)]" style={{ clipPath: "polygon(50% 0,100% 14%,100% 89%,50% 100%,0 89%,0 14%)", background: "linear-gradient(100deg,#430015 0%,#85163d 52%,#46001b 100%)" }}>
                  <div className="absolute inset-x-0 top-0 h-[21px] bg-[#8B2348]" style={{clipPath:"polygon(50% 0,100% 90%,50% 100%,0 90%)"}} />
                  <div className="absolute inset-x-0 bottom-0 h-[4px] bg-white shadow-[0_0_10px_2px_white]" />
                </div>
              </div>

              <h2
                className="absolute left-1/2 top-[157px] w-[900px] -translate-x-1/2 text-center text-[40px] font-normal leading-[1.24] tracking-[-0.028em]"
                style={headingFont}
              >
                Redefining space within commercial needs
              </h2>

              <div className="absolute left-[144px] top-[238px]">
                <button type="button" onClick={() => jump(0.48)} className="text-[20px] text-white/85 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-white">
                  Lihat Layanan Kami
                </button>
              </div>

              {firstService && (
                <div className="absolute left-[144px] top-[297px]">
                  <ServiceCard service={firstService} />
                </div>
              )}

              {selectedProject && (
                <>
                  <div className="absolute left-[1040px] top-[444px] w-[312px] text-right">
                    <button type="button" onClick={() => jump(0.88)} className="text-[20px] text-white/85 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-white">
                      Lihat Proyek Kami
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => jump(0.88)}
                    className="absolute left-[947px] top-[487px] block rounded-[29px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                    aria-label={"Lihat proyek " + selectedProject.title}
                  >
                    <ProjectPhoto project={selectedProject} />
                  </button>
                </>
              )}
            </div>

            {/* Scene 2: oversized service cards; the second card exits right edge. */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ opacity: service, visibility: service > 0.01 ? "visible" : "hidden", pointerEvents: service > 0.12 ? "auto" : "none" }}
            >
              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div
                  className="absolute left-[380px] top-[-230px] h-[1200px] w-[900px] opacity-25 blur-[9px]"
                  style={{ transform: "scale(" + (1.25 + fade(0.26, 0.5, progress) * 0.28) + ")" }}
                >
                  <Image src={STAGE} alt="" fill unoptimized sizes="900px" className="object-cover" />
                </div>
                <div className="absolute bottom-[-160px] right-[-60px] h-[370px] w-[620px] -rotate-[33deg] bg-white/20 blur-[60px]" />
              </div>
              <div className="absolute left-[310px] top-[155px] flex items-center gap-[22px]">
                <button type="button" onClick={() => jump(0.03)} aria-label="Kembali ke Hub" className="text-[38px] leading-none hover:text-white/65 focus-visible:outline-2 focus-visible:outline-white">‹</button>
                <h3 className="text-[44px] font-normal leading-none" style={headingFont}>Lihat Layanan Kami</h3>
              </div>
              <div
                className="absolute left-[316px] top-[300px] flex w-max gap-[58px] will-change-transform"
                style={{ transform: "translateX(" + ((1 - fade(0.28, 0.48, progress)) * 70) + "px)" }}
              >
                {firstService && <ServiceCard service={firstService} large />}
                {secondService && <ServiceCard service={secondService} large />}
              </div>
            </div>

            {/* Scene 3: centered project, metadata at sides, large title below. */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ opacity: project, visibility: project > 0.01 ? "visible" : "hidden", pointerEvents: project > 0.12 ? "auto" : "none" }}
            >
              <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                <div className="absolute -left-[130px] top-[90px] h-[700px] w-[320px] rotate-[37deg] bg-white/[0.25] blur-[65px]" />
                <div className="absolute -bottom-[160px] -left-[120px] h-[390px] w-[480px] rounded-full bg-[#5b0922]/70 blur-[100px]" />
              </div>
              <button type="button" onClick={() => jump(0.49)} aria-label="Kembali ke layanan" className="absolute left-[294px] top-[128px] text-[44px] leading-none hover:text-white/70 focus-visible:outline-2 focus-visible:outline-white">‹</button>
              <h3 className="absolute left-1/2 top-[116px] -translate-x-1/2 whitespace-nowrap text-[46px] font-normal" style={headingFont}>Lihat Proyek Kami</h3>
              {selectedProject && (
                <>
                  <a
                    href={selectedProject.href}
                    className="absolute left-[293px] top-[224px] block overflow-hidden rounded-[29px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                    style={{ transform: "translateY(" + ((1 - fade(0.67, 0.88, progress)) * 44) + "px) scale(" + (0.96 + fade(0.67, 0.88, progress) * 0.04) + ")" }}
                  >
                    <ProjectPhoto project={selectedProject} large />
                  </a>
                  <span className="absolute left-[174px] top-[440px] text-[29px] text-white/90">{selectedProject.number}</span>
                  <span className="absolute left-[1203px] top-[440px] text-[29px] text-white/90">{selectedProject.client}</span>
                  <h4 className="absolute left-1/2 top-[737px] w-[1060px] -translate-x-1/2 text-center text-[49px] font-normal leading-tight tracking-[-0.03em]" style={headingFont}>
                    {selectedProject.title}
                  </h4>
                  {projects.length > 1 && (
                    <div className="absolute bottom-[28px] left-1/2 flex -translate-x-1/2 gap-7">
                      <button type="button" aria-label="Proyek sebelumnya" onClick={() => setProjectIndex(i => (i - 1 + projects.length) % projects.length)} className="rounded-full border border-white/30 px-4 py-1 text-xl hover:bg-white/15">‹</button>
                      <button type="button" aria-label="Proyek berikutnya" onClick={() => setProjectIndex(i => (i + 1) % projects.length)} className="rounded-full border border-white/30 px-4 py-1 text-xl hover:bg-white/15">›</button>
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
