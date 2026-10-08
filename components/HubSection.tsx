"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { dummyProjects, dummyServices } from "@/data/dummy";
import type { Project, Service } from "@/lib/types";

/**
 * Original, full-resolution artboards are extracted directly from hub.svg.
 * All vector typography, the central stage, decorative paths and shadows stay SVG.
 * Only CMS-editable cards/photos are rendered above the original artboards.
 * No CSS blur, no rasterized screenshots, no external animation library.
 */
const SVG = {
  intro: "/assets/hub-svg-intro.svg",
  stage: "/assets/hub-svg-stage.svg",
  services: "/assets/hub-svg-services.svg",
  project: "/assets/hub-svg-project.svg",
  modular: "/assets/hub-svg-modular.webp",
  versatile: "/assets/hub-svg-versatile.webp",
  coffee: "/assets/hub-svg-coffee.webp",
};

const aliases: Record<string, string> = {
  "/assets/hub-modular.svg": SVG.modular,
  "/assets/hub-modular.webp": SVG.modular,
  "/assets/hub-modular-reference.avif": SVG.modular,
  "/assets/hub-modular-icon.avif": SVG.modular,
  "/assets/hub-versatile.svg": SVG.versatile,
  "/assets/hub-versatile.webp": SVG.versatile,
  "/assets/hub-midcafe.webp": SVG.coffee,
  "/assets/portfolio-coffeebooth.webp": SVG.coffee,
};
const imageFor = (path: string) => aliases[path] ?? path;
const clamp = (value: number) => Math.max(0, Math.min(1, value));
const blend = (a: number, b: number, v: number) => {
  const x = clamp((v - a) / (b - a));
  return x * x * (3 - 2 * x);
};

const demoServices: Service[] = dummyServices.map((item, i) => ({ ...item, id: i + 1 }));
const demoProjects: Project[] = dummyProjects.map((item, i) => ({ ...item, id: i + 1 }));

function ServiceCard({ item, variant }: { item: Service; variant: "small" | "large" }) {
  const big = variant === "large";
  const iconSize = big ? 274 : 132;
  return (
    <article
      className={big
        ? "relative h-[466px] w-[776px] shrink-0 overflow-hidden rounded-[43.52px] bg-white text-[#1e1e1e] shadow-[0_10px_24px_rgba(0,0,0,0.17)]"
        : "relative h-[223px] w-[371.38px] shrink-0 overflow-hidden rounded-[20.825px] bg-white text-[#1e1e1e] shadow-[0_10px_22px_rgba(0,0,0,0.18)]"}
    >
      <div
        className="absolute"
        style={big
          ? { left: 58, top: 96, width: 259, height: 274 }
          : { left: 28, top: 46, width: 124, height: 131 }}
      >
        <Image
          src={imageFor(item.image)}
          alt=""
          fill
          unoptimized
          sizes={iconSize + "px"}
          className="object-contain"
        />
      </div>
      <div className="absolute min-w-0" style={big
        ? { left: 398, top: 153, width: 315 }
        : { left: 190, top: 72, width: 164 }}>
        <h3
          className={big
            ? "line-clamp-2 text-[50px] font-normal leading-[1.06] tracking-[-0.035em]"
            : "line-clamp-2 text-[26px] font-normal leading-[1.08] tracking-[-0.025em]"}
          style={{ fontFamily: "var(--font-arsenal)" }}
        >{item.name}</h3>
        <p className={big
          ? "mt-[32px] line-clamp-4 max-w-[295px] text-[20px] leading-[1.3]"
          : "mt-[13px] line-clamp-4 text-[11.2px] leading-[1.27]"}
          style={{ fontFamily: "var(--font-jost)" }}
        >{item.description}</p>
        {item.href && (
          <a
            href={item.href}
            className={big
              ? "mt-7 inline-block text-[15px] text-[#801e46] underline-offset-4 hover:underline focus-visible:underline"
              : "mt-2 inline-block text-[10px] text-[#801e46] underline-offset-4 hover:underline focus-visible:underline"}
          >Lihat detail <span aria-hidden="true">↗</span></a>
        )}
      </div>
    </article>
  );
}

function ProjectImage({ item, large = false }: { item: Project; large?: boolean }) {
  return (
    <div className={large
      ? "relative h-[467px] w-[865px] overflow-hidden rounded-[29.326px] shadow-[0_9px_18px_rgba(0,0,0,0.18)]"
      : "relative h-[218px] w-[403px] overflow-hidden rounded-[29.326px] shadow-[0_9px_18px_rgba(0,0,0,0.18)]"}
    >
      <Image
        src={imageFor(item.image)}
        alt={item.imageAlt || item.title}
        fill
        unoptimized
        sizes={large ? "865px" : "403px"}
        className="object-cover object-center"
      />
    </div>
  );
}

/** The unmodified Figma vector scene scaled without cropping. */
function SourceArtboard({ src }: { src: string }) {
  return (
    <Image
      src={src}
      alt=""
      fill
      unoptimized
      priority={false}
      sizes="1440px"
      className="pointer-events-none select-none object-fill"
      draggable={false}
      aria-hidden="true"
    />
  );
}

export default function HubSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [scale, setScale] = useState(1);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [services, setServices] = useState<Service[]>(demoServices);
  const [projects, setProjects] = useState<Project[]>(demoProjects);
  const [projectIndex, setProjectIndex] = useState(0);
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const serviceScrollRef = useRef<HTMLDivElement>(null);
  const projectWheelAtRef = useRef(0);
  const projectTouchStartRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      try {
        const [s, p] = await Promise.all([
          fetch("/api/services", { signal: controller.signal, cache: "no-store" }),
          fetch("/api/projects", { signal: controller.signal, cache: "no-store" }),
        ]);
        if (!s.ok || !p.ok) return;
        const [servicesData, projectsData] = await Promise.all([s.json(), p.json()]);
        if (controller.signal.aborted) return;
        // Empty SQLite tables must remain empty: dummy.ts is only fallback on errors.
        if (Array.isArray(servicesData.data)) setServices(servicesData.data);
        if (Array.isArray(projectsData.data)) setProjects(projectsData.data);
      } catch {
        // Offline/API failure: retain the initial seed-based fallback.
      }
    }
    void load();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReducedMotion(motionQuery.matches);
    updateMotion();
    motionQuery.addEventListener("change", updateMotion);
    let raf = 0;
    const measure = () => {
      raf = 0;
      setScale(Math.min(window.innerWidth / 1440, window.innerHeight / 972));
      const element = sectionRef.current;
      if (!element) return;
      const rect = element.getBoundingClientRect();
      const travel = Math.max(1, rect.height - window.innerHeight);
      const next = clamp(-rect.top / travel);
      setProgress(before => Math.abs(before - next) > 0.0007 ? next : before);
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      motionQuery.removeEventListener("change", updateMotion);
    };
  }, []);

  const first = services[0];
  const chosen = projects.length > 0 ? projects[Math.min(projectIndex, projects.length - 1)] : null;
  const introOpacity = 1 - blend(0.14, 0.35, progress);
  const serviceOpacity = blend(0.25, 0.43, progress) * (1 - blend(0.57, 0.75, progress));
  const projectOpacity = blend(0.66, 0.85, progress);
  const servicesArrive = blend(0.25, 0.43, progress);
  const projectArrive = blend(0.66, 0.85, progress);

  // Slider position follows the complete, sorted SQLite service list.
  // Center the selected card within the viewport instead of aligning it left.
  function scrollToService(index: number) {
    const viewport = serviceScrollRef.current;
    if (!viewport || services.length === 0) return;
    const normalized = (index + services.length) % services.length;
    const card = viewport.querySelector<HTMLElement>(`[data-service-index="${normalized}"]`);
    if (!card) return;
    const left = card.offsetLeft + card.offsetWidth / 2 - viewport.clientWidth / 2;
    viewport.scrollTo({ left, behavior: reducedMotion ? "instant" : "smooth" });
    setActiveServiceIndex(normalized);
  }

  function handleServiceScroll() {
    const viewport = serviceScrollRef.current;
    if (!viewport) return;
    const midpoint = viewport.scrollLeft + viewport.clientWidth / 2;
    const cards = viewport.querySelectorAll<HTMLElement>("[data-service-index]");
    let nearest = 0;
    let distance = Number.POSITIVE_INFINITY;
    cards.forEach((card, index) => {
      const current = Math.abs(card.offsetLeft + card.offsetWidth / 2 - midpoint);
      if (current < distance) {
        nearest = index;
        distance = current;
      }
    });
    setActiveServiceIndex(previous => previous === nearest ? previous : nearest);
  }

  useEffect(() => {
    // A new API result may contain any number of cards, including zero.
    setActiveServiceIndex(0);
    if (serviceScrollRef.current) serviceScrollRef.current.scrollLeft = 0;
  }, [services]);

  useEffect(() => {
    // With the pointer over the service rail, a normal mouse wheel advances
    // horizontally; at either end, normal page/scene scrolling resumes.
    const viewport = serviceScrollRef.current;
    if (!viewport || reducedMotion || services.length < 2) return;
    let lastStepAt = 0;
    const wheel = (event: WheelEvent) => {
      // Horizontal trackpad gestures use the browser's native rail scrolling.
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY) || Math.abs(event.deltaY) < 2) return;
      const cards = viewport.querySelectorAll<HTMLElement>("[data-service-index]");
      if (!cards.length) return;
      const midpoint = viewport.scrollLeft + viewport.clientWidth / 2;
      let nearest = 0;
      let shortest = Number.POSITIVE_INFINITY;
      cards.forEach((card, i) => {
        const distance = Math.abs(card.offsetLeft + card.offsetWidth / 2 - midpoint);
        if (distance < shortest) { nearest = i; shortest = distance; }
      });
      const next = nearest + (event.deltaY > 0 ? 1 : -1);
      // At the ends, give control back to the vertically scrolling Hub scene.
      if (next < 0 || next >= cards.length) return;
      event.preventDefault();
      const now = performance.now();
      if (now - lastStepAt < 550) return;
      lastStepAt = now;
      const destination = cards[next];
      viewport.scrollTo({
        left: destination.offsetLeft + destination.offsetWidth / 2 - viewport.clientWidth / 2,
        behavior: "smooth",
      });
      setActiveServiceIndex(next);
    };
    viewport.addEventListener("wheel", wheel, { passive: false });
    return () => viewport.removeEventListener("wheel", wheel);
  }, [reducedMotion, services.length]);

  function toScene(phase: number) {
    const element = sectionRef.current;
    if (!element) return;
    const start = window.scrollY + element.getBoundingClientRect().top;
    const travel = Math.max(0, element.offsetHeight - window.innerHeight);
    window.scrollTo({ top: start + travel * phase, behavior: reducedMotion ? "instant" : "smooth" });
  }

  return (
    <section
      id="approach"
      ref={sectionRef}
      aria-label="Pendekatan, layanan, dan proyek Craftivation"
      className="relative isolate scroll-mt-[70px] overflow-clip bg-[#010101] text-white"
    >
      {/* Small screens and reduced-motion users see the actual cards in document order. */}
      <div className={"mx-auto max-w-[680px] px-5 pb-20 pt-24 " + (reducedMotion ? "lg:block" : "lg:hidden")}>
        <h2 className="mx-auto max-w-[440px] text-center text-[clamp(27px,6.2vw,42px)] leading-[1.15] tracking-tight" style={{ fontFamily: "var(--font-arsenal)" }}>
          Redefining space within commercial needs
        </h2>
        <div className="relative mx-auto mt-7 aspect-[1440/972] w-full overflow-hidden">
          <Image src={SVG.stage} alt="Panggung 3D Craftivation" fill unoptimized sizes="(max-width: 680px) 90vw, 680px" className="object-contain" />
          <Image src="/assets/hub-pillar-mark.svg" alt="" width={52} height={40} unoptimized aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[46.1%] h-auto w-[3.61%] -translate-x-1/2" />
        </div>
        {services.length > 0 && (
          <div className="mt-8">
            <h3 className="mb-5 text-2xl">Lihat Layanan Kami</h3>
            <div
              className="flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-5"
              role="region"
              aria-label="Geser daftar layanan Craftivation"
              tabIndex={0}
              style={{ scrollbarWidth: "thin", scrollbarColor: "#a99a9f transparent", paddingInline: "max(0px, calc((100% - min(84vw, 480px)) / 2))", scrollPaddingInline: "max(0px, calc((100% - min(84vw, 480px)) / 2))" }}
            >
              {services.map(s => (
                <article key={s.id} className="flex min-h-[168px] w-[min(84vw,480px)] shrink-0 snap-center items-center gap-4 rounded-3xl bg-white p-5 text-[#1e1e1e]">
                  <div className="relative h-24 w-24 shrink-0"><Image src={imageFor(s.image)} alt="" fill unoptimized sizes="96px" className="object-contain" /></div>
                  <div className="min-w-0">
                    <h4 className="text-[24px]">{s.name}</h4>
                    <p className="mt-2 text-[13px] leading-relaxed">{s.description}</p>
                    {s.href && <a className="mt-3 inline-block text-[13px] text-[#801e46] underline-offset-4 hover:underline" href={s.href}>Lihat detail ↗</a>}
                  </div>
                </article>
              ))}
            </div>
            <p className="mt-1 text-center text-xs text-white/55">Geser ke samping untuk melihat {services.length} layanan</p>
          </div>
        )}
        {projects.length > 0 && (
          <div className="mt-12">
            <h3 className="mb-5 text-2xl">Lihat Proyek Kami</h3>
            <div
              className="flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain pb-5"
              role="region"
              aria-label="Geser daftar proyek Craftivation"
              tabIndex={0}
              style={{ scrollbarWidth: "thin", scrollbarColor: "#a99a9f transparent", paddingInline: "max(0px, calc((100% - min(88vw, 565px)) / 2))", scrollPaddingInline: "max(0px, calc((100% - min(88vw, 565px)) / 2))" }}
            >
              {projects.map(project => (
                <article key={project.id} className="w-[min(88vw,565px)] shrink-0 snap-center">
                  <a href={project.href} className="relative block aspect-[865/467] overflow-hidden rounded-3xl">
                    <Image src={imageFor(project.image)} alt={project.imageAlt || project.title} fill unoptimized sizes="(max-width: 680px) 90vw, 565px" className="object-cover" />
                  </a>
                  <div className="mt-4 flex justify-between text-sm text-white/70"><span>{project.number}</span><span>{project.client}</span></div>
                  <h4 className="mt-3 text-center text-[28px]">{project.title}</h4>
                </article>
              ))}
            </div>
            {projects.length > 1 && <p className="mt-1 text-center text-xs text-white/55">Geser untuk melihat {projects.length} proyek</p>}
          </div>
        )}
      </div>

      {/* Desktop: original 1440×972 artboard; do not resample its embedded images. */}
      <div className={"relative h-[320svh] " + (reducedMotion ? "hidden" : "hidden lg:block")}>
        <div className="sticky top-0 h-[100svh] overflow-hidden bg-[#010101]">
          <div
            className="absolute left-1/2 top-1/2 h-[972px] w-[1440px] origin-center"
            style={{ transform: `translate(-50%, -50%) scale(${scale})` }}
          >
            {/* SCENE 1: original SVG stage, title, side labels, and dynamic two cards. */}
            <div
              className="absolute inset-0"
              style={{ opacity: introOpacity, visibility: introOpacity > .012 ? "visible" : "hidden", pointerEvents: introOpacity > .2 ? "auto" : "none" }}
            >
              <div className="absolute inset-0" style={{ transform: `translateY(${blend(.06,.35,progress) * 10}px) scale(${1 + blend(.06,.35,progress) * .045})` }}>
                <SourceArtboard src={SVG.intro} />
                {/* The exact 52×40 vector mark from the supplied Figma SVG,
                    positioned above the central burgundy pillar. */}
                <Image src="/assets/hub-pillar-mark.svg" alt="" width={52} height={40} unoptimized aria-hidden="true" className="pointer-events-none absolute left-[720px] top-[448px] -translate-x-1/2" />
              </div>
              {first && <div className="absolute left-[144px] top-[297px]"><ServiceCard item={first} variant="small" /></div>}
              {chosen && (
                <button
                  type="button"
                  onClick={() => toScene(.88)}
                  aria-label={`Lihat proyek ${chosen.title}`}
                  className="absolute left-[947px] top-[487px] block rounded-[29px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                ><ProjectImage item={chosen} /></button>
              )}
              <button type="button" onClick={() => toScene(.47)} aria-label="Lihat layanan kami" className="absolute left-[136px] top-[217px] h-[55px] w-[250px] focus-visible:outline-2 focus-visible:outline-white" />
              <button type="button" onClick={() => toScene(.88)} aria-label="Lihat proyek kami" className="absolute left-[1170px] top-[426px] h-[60px] w-[245px] focus-visible:outline-2 focus-visible:outline-white" />
            </div>

            {/* SCENE 2: exact SVG back arrow/header, SVG-based imagery, original card coordinates. */}
            <div
              className="absolute inset-0"
              style={{ opacity: serviceOpacity, visibility: serviceOpacity > .012 ? "visible" : "hidden", pointerEvents: serviceOpacity > .2 ? "auto" : "none" }}
            >
              <SourceArtboard src={SVG.services} />
              <button type="button" onClick={() => toScene(.02)} aria-label="Kembali ke Hub" className="absolute left-[113px] top-[402px] h-[70px] w-[65px] focus-visible:outline-2 focus-visible:outline-white" />
              <div
                className="absolute left-[250px] top-[140px] w-[940px]"
                style={{ transform: `translateY(${(1 - servicesArrive) * 16}px) scale(${.965 + servicesArrive * .035})`, transformOrigin: "center center" }}
              >
                <div
                  ref={serviceScrollRef}
                  onScroll={handleServiceScroll}
                  onKeyDown={(event) => {
                    if (event.key === "ArrowRight") { event.preventDefault(); scrollToService(activeServiceIndex + 1); }
                    if (event.key === "ArrowLeft") { event.preventDefault(); scrollToService(activeServiceIndex - 1); }
                  }}
                  className="w-full overflow-x-auto overflow-y-hidden pb-[18px]"
                  role="region"
                  aria-label="Slider layanan Craftivation, gunakan panah atau geser untuk berpindah"
                  tabIndex={0}
                  style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,.55) transparent", scrollSnapType: "x mandatory", overscrollBehaviorX: "contain", touchAction: "pan-x" }}
                >
                  <div className="relative flex w-max items-stretch gap-[34px] px-[82px]">
                    {services.map((service, index) => (
                      <div
                        key={service.id}
                        data-service-index={index}
                        className="shrink-0 snap-center"
                        style={{ scrollSnapAlign: "center" }}
                        role="group"
                        aria-label={`${service.name}, layanan ${index + 1} dari ${services.length}`}
                      >
                        <ServiceCard item={service} variant="large" />
                      </div>
                    ))}
                  </div>
                </div>
                {services.length === 0 && <p className="pt-20 text-center text-2xl text-white/70">Layanan akan segera hadir.</p>}
              </div>
              {services.length > 1 && (
                <nav aria-label="Navigasi slider layanan" className="absolute bottom-[184px] left-1/2 flex -translate-x-1/2 items-center gap-7">
                  <button type="button" onClick={() => scrollToService(activeServiceIndex - 1)} aria-label="Layanan sebelumnya" className="grid h-12 w-12 place-items-center rounded-full border border-white/40 text-[30px] leading-none transition-colors hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-white">‹</button>
                  <span className="min-w-[100px] text-center text-[16px] tabular-nums tracking-[.13em] text-white/80">{String(activeServiceIndex + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}</span>
                  <button type="button" onClick={() => scrollToService(activeServiceIndex + 1)} aria-label="Layanan berikutnya" className="grid h-12 w-12 place-items-center rounded-full border border-white/40 text-[30px] leading-none transition-colors hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-white">›</button>
                </nav>
              )}
            </div>

            {/* SCENE 3: original SVG shadow/header and editable project/photo content. */}
            <div
              className="absolute inset-0"
              style={{ opacity: projectOpacity, visibility: projectOpacity > .012 ? "visible" : "hidden", pointerEvents: projectOpacity > .2 ? "auto" : "none" }}
              onWheel={(event) => {
                // Trackpad swipe changes projects; vertical wheel keeps the page scrolling.
                if (projects.length < 2 || Math.abs(event.deltaX) < 12 || Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
                const now = performance.now();
                if (now - projectWheelAtRef.current < 550) return;
                projectWheelAtRef.current = now;
                const step = event.deltaX > 0 ? 1 : -1;
                setProjectIndex(i => (i + step + projects.length) % projects.length);
              }}
              onTouchStart={(event) => {
                const touch = event.changedTouches[0];
                if (touch) projectTouchStartRef.current = { x: touch.clientX, y: touch.clientY };
              }}
              onTouchEnd={(event) => {
                const touch = event.changedTouches[0];
                const start = projectTouchStartRef.current;
                projectTouchStartRef.current = null;
                if (!touch || !start || projects.length < 2) return;
                const dx = touch.clientX - start.x;
                const dy = touch.clientY - start.y;
                if (Math.abs(dx) < 65 || Math.abs(dx) < Math.abs(dy) * 1.25) return;
                setProjectIndex(i => (i + (dx < 0 ? 1 : -1) + projects.length) % projects.length);
              }}
            >
              <SourceArtboard src={SVG.project} />
              <button type="button" onClick={() => toScene(.48)} aria-label="Kembali ke layanan" className="absolute left-[274px] top-[0px] h-[60px] w-[65px] focus-visible:outline-2 focus-visible:outline-white" />
              {chosen && (
                <>
                  <a
                    href={chosen.href}
                    className="absolute left-[292.56px] top-[99.37px] block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                    style={{ transform: `translateY(${(1 - projectArrive) * 35}px) scale(${.97 + projectArrive * .03})`, transformOrigin: "center center" }}
                  ><ProjectImage item={chosen} large /></a>
                  <span className="absolute left-[174px] top-[319px] text-[25px] font-normal">{chosen.number}</span>
                  <span className="absolute left-[1202px] top-[319px] max-w-[215px] truncate text-[25px] font-normal">{chosen.client}</span>
                  <h3 className="absolute left-1/2 top-[606px] w-[1100px] -translate-x-1/2 text-center text-[48px] leading-[1.12] tracking-[-.026em]" style={{ fontFamily: "var(--font-arsenal)" }}>{chosen.title}</h3>
                  {projects.length > 1 && (
                    <nav aria-label="Navigasi slider proyek" className="absolute bottom-[80px] left-1/2 flex -translate-x-1/2 items-center gap-7">
                      <button type="button" onClick={() => setProjectIndex(i => (i - 1 + projects.length) % projects.length)} aria-label="Proyek sebelumnya" className="grid h-12 w-12 place-items-center rounded-full border border-white/40 text-[30px] leading-none hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-white">‹</button>
                      <span className="min-w-[100px] text-center text-[16px] tabular-nums tracking-[.13em] text-white/80">{String(Math.min(projectIndex, projects.length - 1) + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span>
                      <button type="button" onClick={() => setProjectIndex(i => (i + 1) % projects.length)} aria-label="Proyek berikutnya" className="grid h-12 w-12 place-items-center rounded-full border border-white/40 text-[30px] leading-none hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-white">›</button>
                    </nav>
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