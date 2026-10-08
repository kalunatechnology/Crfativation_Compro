"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { dummyProjects, dummyServices } from "@/data/dummy";
import type { Project, Service } from "@/lib/types";

const clamp = (value: number) => Math.max(0, Math.min(1, value));
const ease = (start: number, end: number, value: number) => {
  const t = clamp((value - start) / (end - start));
  return t * t * (3 - 2 * t);
};

// Old SQLite records can still contain earlier image paths.
const assetAliases: Record<string, string> = {
  "/assets/hub-stage.webp": "/assets/hub-stage.svg",
  "/assets/hub-modular.webp": "/assets/hub-modular.svg",
  "/assets/hub-versatile.webp": "/assets/hub-versatile.svg",
  "/assets/hub-midcafe.webp": "/assets/portfolio-coffeebooth.webp",
};
const asset = (src: string) => assetAliases[src] ?? src;

const initialServices: Service[] = dummyServices.map((item, index) => ({
  ...item,
  id: index + 1,
}));
const initialProjects: Project[] = dummyProjects.map((item, index) => ({
  ...item,
  id: index + 1,
}));

function ServiceCard({
  service,
  large = false,
}: {
  service: Service;
  large?: boolean;
}) {
  if (!large) {
    return (
      <article className="flex h-[142px] w-[238px] items-center gap-3 rounded-[16px] bg-[#f6f6f6] px-4 py-4 text-[#141414] shadow-[0_18px_40px_rgba(0,0,0,0.27)]">
        <div className="relative h-[91px] w-[91px] shrink-0">
          <Image src={asset(service.image)} alt="" fill unoptimized sizes="91px" className="object-contain" />
        </div>
        <div className="min-w-0">
          <h3 className="text-[18px] font-normal leading-[1.1] tracking-[-0.02em]">{service.name}</h3>
          <p className="mt-2 line-clamp-4 text-[8.5px] leading-[1.3] text-[#222]">{service.description}</p>
        </div>
      </article>
    );
  }

  return (
    <article className="flex h-[296px] w-[495px] shrink-0 items-center rounded-[27px] bg-[#f9f9f9] px-[32px] text-[#111] shadow-[0_25px_55px_rgba(0,0,0,0.26)]">
      <div className="relative h-[178px] w-[178px] shrink-0">
        <Image src={asset(service.image)} alt="" fill unoptimized sizes="178px" className="object-contain" />
      </div>
      <div className="ml-8 min-w-0">
        <h3 className="text-[32px] font-normal leading-[1.05] tracking-[-0.035em]">{service.name}</h3>
        <p className="mt-7 max-w-[182px] text-[13px] leading-[1.3] text-[#222]">{service.description}</p>
      </div>
    </article>
  );
}

function ProjectPhoto({
  project,
  large = false,
}: {
  project: Project;
  large?: boolean;
}) {
  return (
    <div className={large
      ? "relative h-[297px] w-[552px] overflow-hidden rounded-[20px] shadow-[0_24px_58px_rgba(0,0,0,0.32)]"
      : "relative h-[140px] w-[258px] overflow-hidden rounded-[19px] shadow-[0_18px_40px_rgba(0,0,0,0.32)]"
    }>
      <Image
        src={asset(project.image)}
        alt={project.imageAlt || project.title}
        fill
        unoptimized
        sizes={large ? "552px" : "258px"}
        className="object-cover"
      />
    </div>
  );
}

export default function HubSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [services, setServices] = useState<Service[]>(initialServices);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [projectIndex, setProjectIndex] = useState(0);

  // SQLite remains the main data source. dummy.ts is used only when loading fails.
  useEffect(() => {
    const controller = new AbortController();
    const getData = async () => {
      try {
        const [serviceResponse, projectResponse] = await Promise.all([
          fetch("/api/services", { signal: controller.signal, cache: "no-store" }),
          fetch("/api/projects", { signal: controller.signal, cache: "no-store" }),
        ]);
        if (!serviceResponse.ok || !projectResponse.ok) return;
        const [servicePayload, projectPayload] = await Promise.all([
          serviceResponse.json(),
          projectResponse.json(),
        ]);
        if (controller.signal.aborted) return;
        if (Array.isArray(servicePayload.data)) setServices(servicePayload.data);
        if (Array.isArray(projectPayload.data)) setProjects(projectPayload.data);
      } catch {
        // Preserve the dummy.ts fallback if the API is unavailable.
      }
    };
    void getData();
    return () => controller.abort();
  }, []);

  // One passive scroll listener with requestAnimationFrame throttling.
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotionChange = () => setReducedMotion(query.matches);
    onMotionChange();
    query.addEventListener("change", onMotionChange);

    let request = 0;
    const measure = () => {
      request = 0;
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const travel = Math.max(1, rect.height - window.innerHeight);
      const next = clamp(-rect.top / travel);
      setProgress((previous) => Math.abs(previous - next) > 0.001 ? next : previous);
    };
    const schedule = () => {
      if (!request) request = window.requestAnimationFrame(measure);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (request) window.cancelAnimationFrame(request);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      query.removeEventListener("change", onMotionChange);
    };
  }, []);

  const firstService = services[0];
  const secondaryService = services[1];
  const project = projects.length > 0
    ? projects[Math.min(projectIndex, projects.length - 1)]
    : undefined;

  // Timeline: 0-28% introduction, 28-72% services, 72-100% projects.
  const introOpacity = 1 - ease(0.12, 0.28, progress);
  const serviceOpacity =
    ease(0.28, 0.44, progress) * (1 - ease(0.60, 0.74, progress));
  const projectOpacity = ease(0.72, 0.86, progress);

  const scrollToPhase = (phase: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const scrollTop = window.scrollY + section.getBoundingClientRect().top;
    const distance = Math.max(0, section.offsetHeight - window.innerHeight);
    window.scrollTo({
      top: scrollTop + phase * distance,
      behavior: reducedMotion ? "instant" : "smooth",
    });
  };

  return (
    <section
      id="approach"
      ref={sectionRef}
      aria-label="Pendekatan dan layanan Craftivation"
      className="relative isolate scroll-mt-[70px] overflow-clip bg-black text-white"
    >
      {/* Accessible, readable layout on mobile and for reduced-motion users. */}
      <div className={
        "mx-auto max-w-[680px] px-5 py-20 " +
        (reducedMotion ? "md:block" : "md:hidden")
      }>
        <h2 className="mx-auto max-w-[360px] text-center text-[30px] font-normal leading-[1.15] tracking-[-0.035em]">
          Redefining space within commercial needs
        </h2>
        <div className="relative mx-auto mt-8 aspect-[1.3] max-w-[470px]">
          <Image src="/assets/hub-stage.svg" alt="Panggung isometrik Craftivation" fill unoptimized className="object-contain" sizes="(max-width: 768px) 90vw, 470px" />
          <div aria-hidden="true" className="absolute left-1/2 top-[47%] h-[37px] w-[16px] -translate-x-1/2 bg-gradient-to-r from-[#390015] via-[#7a123a] to-[#46001f] shadow-[0_0_12px_rgba(255,255,255,0.25)]">
            <span className="absolute inset-x-0 bottom-0 h-[3px] bg-white shadow-[0_0_8px_white]" />
          </div>
        </div>

        {services.length > 0 && (
          <div className="mt-8">
            <h3 className="mb-5 text-[22px] font-normal">Lihat Layanan Kami</h3>
            <div className="grid gap-4">
              {services.slice(0, 2).map((service) => (
                <article key={service.id} className="flex min-w-0 items-center gap-4 rounded-[22px] bg-[#fafafa] p-5 text-black">
                  <div className="relative h-[95px] w-[95px] shrink-0">
                    <Image src={asset(service.image)} alt="" fill unoptimized sizes="95px" className="object-contain" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-[23px] leading-none">{service.name}</h4>
                    <p className="mt-3 text-[12px] leading-[1.35] text-black/80">{service.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {project && (
          <div className="mt-12">
            <h3 className="mb-5 text-[22px] font-normal">Lihat Proyek Kami</h3>
            <div className="relative aspect-[1.85] overflow-hidden rounded-[20px]">
              <Image src={asset(project.image)} alt={project.imageAlt || project.title} fill unoptimized sizes="(max-width: 768px) 90vw, 630px" className="object-cover" />
            </div>
            <div className="mt-4 flex justify-between text-sm text-white/75">
              <span>{project.number}</span><span>{project.client}</span>
            </div>
            <h4 className="mt-4 text-center text-[28px] tracking-[-0.035em]">{project.title}</h4>
          </div>
        )}
      </div>

      {/* Three full-screen scenes controlled by native page scrolling. */}
      <div className={"relative h-[300svh] " + (reducedMotion ? "hidden" : "hidden md:block")}>
        <div className="sticky top-0 h-[100svh] min-h-[560px] overflow-hidden bg-black">
          {/* Very faint black architectural panels behind scene 1. */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="absolute inset-y-0 left-[27%] w-[14%] bg-white/[0.009]" />
            <div className="absolute inset-y-0 left-[42%] w-[13%] bg-white/[0.013]" />
            <div className="absolute inset-y-0 right-[24%] w-[12%] bg-white/[0.01]" />
          </div>

          {/* Soft diagonal light accents from scene references. */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ opacity: serviceOpacity }}>
            <div className="absolute bottom-[-17%] right-[-6%] h-[210px] w-[500px] -rotate-[30deg] bg-white/25 blur-[44px]" />
          </div>
          <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ opacity: projectOpacity }}>
            <div className="absolute left-[-9%] top-[10%] h-[500px] w-[240px] rotate-[36deg] bg-white/25 blur-[35px]" />
            <div className="absolute bottom-[-10%] left-[-7%] h-[230px] w-[330px] bg-[#54001f]/70 blur-[100px]" />
          </div>

          {/* SCENE 1: Hub, isometric centerpiece, small service and project cards. */}
          <div className="absolute inset-0 z-10" style={{
            opacity: introOpacity,
            visibility: introOpacity < 0.02 ? "hidden" : "visible",
            transform: "translateY(" + ((1 - introOpacity) * 18) + "px)",
          }}>
            <h2 className="absolute left-1/2 top-[16%] w-[90%] max-w-[680px] -translate-x-1/2 text-center text-[clamp(22px,2.15vw,30px)] font-normal leading-[1.18] tracking-[-0.03em]">
              Redefining space within commercial needs
            </h2>

            <div className="pointer-events-none absolute left-1/2 top-[55%] h-[73%] max-h-[490px] w-[57%] max-w-[590px] -translate-x-1/2 -translate-y-1/2">
              <Image src="/assets/hub-stage.svg" alt="" fill unoptimized sizes="590px" className="object-contain" />
              {/* Burgundy illuminated podium included in the original reference. */}
              <div aria-hidden="true" className="absolute left-1/2 top-[45%] h-[12%] w-[6.5%] min-w-[20px] -translate-x-1/2 bg-gradient-to-r from-[#430018] via-[#8a2148] to-[#40001b] shadow-[10px_18px_24px_rgba(0,0,0,0.52)]" style={{ clipPath: "polygon(0 9%, 52% 0, 100% 9%, 100% 92%, 50% 100%, 0 92%)" }}>
                <span className="absolute inset-x-0 top-0 h-[3px] bg-white/70 blur-[1px]" />
                <span className="absolute inset-x-0 bottom-0 h-[4px] bg-white shadow-[0_0_12px_2px_rgba(255,255,255,0.9)]" />
              </div>
            </div>

            {firstService && (
              <div className="absolute left-[11.8%] top-[28.5%] z-20 max-[1100px]:left-[5%]">
                <button type="button" onClick={() => scrollToPhase(0.48)} className="mb-5 block text-left text-[13px] text-white/90 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                  Lihat Layanan Kami
                </button>
                <ServiceCard service={firstService} />
              </div>
            )}

            {project && (
              <div className="absolute right-[7.2%] top-[51.5%] z-20 max-[1100px]:right-[4%]">
                <button type="button" onClick={() => scrollToPhase(0.90)} className="mb-3 block w-full text-right text-[13px] text-white/90 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                  Lihat Proyek Kami
                </button>
                <button type="button" onClick={() => scrollToPhase(0.90)} aria-label={"Lihat proyek " + project.title} className="block rounded-[19px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                  <ProjectPhoto project={project} />
                </button>
              </div>
            )}
          </div>

          {/* SCENE 2: Oversized horizontal service cards, second intentionally clipped. */}
          <div className="absolute inset-0 z-20 overflow-hidden" style={{
            opacity: serviceOpacity,
            visibility: serviceOpacity < 0.02 ? "hidden" : "visible",
            transform: "translateY(" + ((1 - serviceOpacity) * 18) + "px)",
          }}>
            <div className="absolute left-[20.5%] top-[16.5%] flex items-center gap-4 max-[1100px]:left-[13%]">
              <button type="button" onClick={() => scrollToPhase(0)} aria-label="Kembali ke Hub" className="text-[26px] leading-none hover:text-white/65 focus-visible:outline-2 focus-visible:outline-white">
                &lt;
              </button>
              <h3 className="text-[clamp(22px,2.1vw,30px)] font-normal leading-none tracking-[-0.03em]">Lihat Layanan Kami</h3>
            </div>
            <div className="absolute left-[22.5%] top-[33%] flex w-max gap-9 max-[1100px]:left-[15%]">
              {firstService && <ServiceCard service={firstService} large />}
              {secondaryService && <ServiceCard service={secondaryService} large />}
            </div>
          </div>

          {/* SCENE 3: project preview with flanking metadata. */}
          <div className="absolute inset-0 z-30" style={{
            opacity: projectOpacity,
            visibility: projectOpacity < 0.02 ? "hidden" : "visible",
            transform: "translateY(" + ((1 - projectOpacity) * 18) + "px)",
          }}>
            <button type="button" onClick={() => scrollToPhase(0.48)} aria-label="Kembali ke layanan" className="absolute left-[20.5%] top-[15.5%] text-[27px] leading-none hover:text-white/65 focus-visible:outline-2 focus-visible:outline-white">
              &lt;
            </button>
            <h3 className="absolute left-1/2 top-[14.7%] w-max -translate-x-1/2 text-[clamp(22px,2.1vw,30px)] font-normal tracking-[-0.03em]">
              Lihat Proyek Kami
            </h3>
            {project && (
              <>
                <div className="absolute left-1/2 top-[50.5%] -translate-x-1/2 -translate-y-1/2">
                  <a href={project.href} className="block rounded-[20px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                    <ProjectPhoto project={project} large />
                  </a>
                </div>
                <span className="absolute left-[12.2%] top-[51.5%] text-[16px] text-white/90">
                  {project.number}
                </span>
                <span className="absolute right-[12.2%] top-[51.5%] text-[16px] text-white/90">
                  {project.client}
                </span>
                <h4 className="absolute bottom-[12.5%] left-1/2 w-[90%] -translate-x-1/2 text-center text-[clamp(24px,2.4vw,34px)] font-normal tracking-[-0.04em]">
                  {project.title}
                </h4>
                {projects.length > 1 && (
                  <div className="absolute bottom-[5%] left-1/2 flex -translate-x-1/2 items-center gap-5">
                    <button type="button" aria-label="Proyek sebelumnya" onClick={() => setProjectIndex(i => (i - 1 + projects.length) % projects.length)} className="rounded-full border border-white/25 px-4 py-1 text-xl hover:bg-white/10">‹</button>
                    <button type="button" aria-label="Proyek berikutnya" onClick={() => setProjectIndex(i => (i + 1) % projects.length)} className="rounded-full border border-white/25 px-4 py-1 text-xl hover:bg-white/10">›</button>
                  </div>
                )}
              </>
            )}
          </div>

          <div aria-hidden="true" className="pointer-events-none absolute bottom-7 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2">
            {[0, 1, 2].map((step) => (
              <span key={step} className={
                "h-[4px] rounded-full transition-all duration-300 " +
                ((progress < 0.28 ? 0 : progress < 0.72 ? 1 : 2) === step
                  ? "w-8 bg-white" : "w-2 bg-white/30")
              } />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
