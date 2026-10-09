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

const demoServices: Service[] = dummyServices.map((item, i) => ({ ...item, id: i + 1 }));
const demoProjects: Project[] = dummyProjects.map((item, i) => ({ ...item, id: i + 1 }));

function ServiceCard({ item, variant, showLink = true }: { item: Service; variant: "small" | "large"; showLink?: boolean }) {
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
        {showLink && item.href && (
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


type HubScene = "intro" | "services" | "projects";
type HubCardKind = "services" | "projects";
type CardFlight = { kind: HubCardKind; index: number; closing: boolean; moving: boolean };
type MobileDetail = { kind: HubCardKind; index: number };

const cardPositions = {
  services: { from: { left: 144, top: 297, width: 371.38, height: 223 }, to: { left: 332, top: 284, width: 776, height: 466 } },
  projects: { from: { left: 947, top: 487, width: 403, height: 218 }, to: { left: 287.5, top: 220, width: 865, height: 467 } },
};

export default function HubSection() {
  const [scale, setScale] = useState(1);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [services, setServices] = useState<Service[]>(demoServices);
  const [projects, setProjects] = useState<Project[]>(demoProjects);
  const [scene, setScene] = useState<HubScene>("intro");
  const [flight, setFlight] = useState<CardFlight | null>(null);
  const [mobileDetail, setMobileDetail] = useState<MobileDetail | null>(null);
  const [projectIndex, setProjectIndex] = useState(0);
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const serviceScrollRef = useRef<HTMLDivElement>(null);
  const projectScrollRef = useRef<HTMLDivElement>(null);
  const flightRaf = useRef<number | null>(null);

  // Keep data fully controlled by SQLite, with dummy.ts as a network-failure fallback.
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
        if (Array.isArray(servicesData.data)) setServices(servicesData.data);
        if (Array.isArray(projectsData.data)) setProjects(projectsData.data);
      } catch {
        // API unavailable: retain the seeded fallback cards.
      }
    }
    void load();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(motionQuery.matches);
    update();
    motionQuery.addEventListener("change", update);
    const measure = () => setScale(Math.min(document.documentElement.clientWidth / 1440, window.innerHeight / 972));
    measure();
    window.addEventListener("resize", measure);
    return () => {
      motionQuery.removeEventListener("change", update);
      window.removeEventListener("resize", measure);
    };
  }, []);

  useEffect(() => () => {
    if (flightRaf.current !== null) cancelAnimationFrame(flightRaf.current);
  }, []);

  const currentService = services[Math.min(activeServiceIndex, services.length - 1)];
  const chosen = projects[Math.min(projectIndex, projects.length - 1)];
  const flyingItem = flight
    ? flight.kind === "services" ? services[flight.index] : projects[flight.index]
    : null;
  const openMobileItem = mobileDetail
    ? mobileDetail.kind === "services" ? services[mobileDetail.index] : projects[mobileDetail.index]
    : null;

  function scrollToCard(kind: HubCardKind, index: number) {
    const items = kind === "services" ? services : projects;
    const viewport = kind === "services" ? serviceScrollRef.current : projectScrollRef.current;
    if (!viewport || !items.length) return;
    const normalized = Math.max(0, Math.min(index, items.length - 1));
    const selector = kind === "services" ? "service" : "project";
    const item = viewport.querySelector<HTMLElement>(`[data-${selector}-index="${normalized}"]`);
    if (!item) return;
    viewport.scrollTo({
      left: item.offsetLeft + item.offsetWidth / 2 - viewport.clientWidth / 2,
      behavior: reducedMotion ? "instant" : "smooth",
    });
    if (kind === "services") setActiveServiceIndex(normalized);
    else setProjectIndex(normalized);
  }

  function syncCardOnScroll(kind: HubCardKind) {
    const viewport = kind === "services" ? serviceScrollRef.current : projectScrollRef.current;
    if (!viewport) return;
    const selector = kind === "services" ? "service" : "project";
    const midpoint = viewport.scrollLeft + viewport.clientWidth / 2;
    let nearest = 0;
    let distance = Number.POSITIVE_INFINITY;
    viewport.querySelectorAll<HTMLElement>(`[data-${selector}-index]`).forEach((card, index) => {
      const d = Math.abs(card.offsetLeft + card.offsetWidth / 2 - midpoint);
      if (d < distance) { nearest = index; distance = d; }
    });
    if (kind === "services") setActiveServiceIndex(previous => previous === nearest ? previous : nearest);
    else setProjectIndex(previous => previous === nearest ? previous : nearest);
  }

  useEffect(() => {
    setActiveServiceIndex(0);
    if (serviceScrollRef.current) serviceScrollRef.current.scrollLeft = 0;
  }, [services]);

  useEffect(() => {
    setProjectIndex(0);
    if (projectScrollRef.current) projectScrollRef.current.scrollLeft = 0;
  }, [projects]);

  // Wheel steps navigate only a visible rail. Native trackpads, dragging,
  // touch swipes, and vertical page scrolling at either end still work.
  useEffect(() => {
    if (reducedMotion || scene === "intro" || flight) return;
    const kind: HubCardKind = scene;
    const viewport = kind === "services" ? serviceScrollRef.current : projectScrollRef.current;
    const count = kind === "services" ? services.length : projects.length;
    if (!viewport || count < 2) return;
    let lastStep = 0;
    const wheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY) || Math.abs(event.deltaY) < 2) return;
      const selector = kind === "services" ? "service" : "project";
      const cards = viewport.querySelectorAll<HTMLElement>(`[data-${selector}-index]`);
      const center = viewport.scrollLeft + viewport.clientWidth / 2;
      let current = 0;
      let nearest = Number.POSITIVE_INFINITY;
      cards.forEach((card, i) => {
        const distance = Math.abs(card.offsetLeft + card.offsetWidth / 2 - center);
        if (distance < nearest) { nearest = distance; current = i; }
      });
      const next = current + (event.deltaY > 0 ? 1 : -1);
      if (next < 0 || next >= cards.length) return;
      event.preventDefault();
      const now = performance.now();
      if (now - lastStep < 560) return;
      lastStep = now;
      const card = cards[next];
      viewport.scrollTo({
        left: card.offsetLeft + card.offsetWidth / 2 - viewport.clientWidth / 2,
        behavior: "smooth",
      });
      if (kind === "services") setActiveServiceIndex(next);
      else setProjectIndex(next);
    };
    viewport.addEventListener("wheel", wheel, { passive: false });
    return () => viewport.removeEventListener("wheel", wheel);
  }, [scene, flight, reducedMotion, services.length, projects.length]);

  // Use one real moving card rather than cross-fading duplicated whole-scene
  // artboards. The card keeps its content while travelling in either direction.
  function navigate(kind: HubCardKind, closing = false) {
    if (flight) return;
    const items = kind === "services" ? services : projects;
    if (!items.length) return;
    if (closing && scene !== kind) return;
    if (!closing && scene !== "intro") return;
    if (reducedMotion) {
      setScene(closing ? "intro" : kind);
      return;
    }
    const index = Math.min(kind === "services" ? activeServiceIndex : projectIndex, items.length - 1);
    setFlight({ kind, index, closing, moving: false });
    flightRaf.current = requestAnimationFrame(() => {
      flightRaf.current = requestAnimationFrame(() => {
        setFlight(current => current ? { ...current, moving: true } : null);
        flightRaf.current = null;
      });
    });
  }

  function finishFlight() {
    if (!flight) return;
    setScene(flight.closing ? "intro" : flight.kind);
    setFlight(null);
  }

  useEffect(() => {
    if (scene === "intro" && !mobileDetail) return;
    const keydown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (mobileDetail) { setMobileDetail(null); return; }
      if (!flight && scene !== "intro") navigate(scene, true);
    };
    window.addEventListener("keydown", keydown);
    return () => window.removeEventListener("keydown", keydown);
    // navigate accesses the latest scene and selection; changes rebind the handler.
  });

  const flightTransform = flight ? (() => {
    const { from, to } = cardPositions[flight.kind];
    const atStart = flight.closing ? flight.moving : !flight.moving;
    return atStart
      ? `translate3d(${from.left - to.left}px, ${from.top - to.top}px, 0) scale(${from.width / to.width}, ${from.height / to.height})`
      : "translate3d(0,0,0) scale(1)";
  })() : "";

  return (
    <section id="approach" aria-label="Pendekatan, layanan, dan proyek Craftivation" className="relative isolate scroll-mt-[70px] overflow-clip bg-[#010101] text-white">
      {/* Mobile and reduced-motion layout: document-order cards without fixed-position overlaps. */}
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
            <div className="hub-clean-rail flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-3" role="region" aria-label="Geser daftar layanan Craftivation" tabIndex={0} style={{ paddingInline: "max(0px, calc((100% - min(84vw, 480px)) / 2))", scrollPaddingInline: "max(0px, calc((100% - min(84vw, 480px)) / 2))" }}>
              {services.map((s, index) => (
                <button type="button" key={s.id} onClick={() => setMobileDetail({ kind: "services", index })} className="flex min-h-[168px] w-[min(84vw,480px)] shrink-0 snap-center items-center gap-4 rounded-3xl bg-white p-5 text-left text-[#1e1e1e] transition-transform duration-300 hover:scale-[1.015] focus-visible:outline-2 focus-visible:outline-white">
                  <span className="relative h-24 w-24 shrink-0"><Image src={imageFor(s.image)} alt="" fill unoptimized sizes="96px" className="object-contain" /></span>
                  <span className="min-w-0">
                    <span className="block text-[24px]">{s.name}</span>
                    <span className="mt-2 block text-[13px] leading-relaxed">{s.description}</span>
                    <span className="mt-3 block text-[13px] text-[#801e46]">Lihat detail ↗</span>
                  </span>
                </button>
              ))}
            </div>
            <p className="mt-1 text-center text-xs text-white/55">Geser ke samping untuk melihat {services.length} layanan</p>
          </div>
        )}
        {projects.length > 0 && (
          <div className="mt-12">
            <h3 className="mb-5 text-2xl">Lihat Proyek Kami</h3>
            <div className="hub-clean-rail flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain pb-3" role="region" aria-label="Geser daftar proyek Craftivation" tabIndex={0} style={{ paddingInline: "max(0px, calc((100% - min(88vw, 565px)) / 2))", scrollPaddingInline: "max(0px, calc((100% - min(88vw, 565px)) / 2))" }}>
              {projects.map((project, index) => (
                <button type="button" key={project.id} onClick={() => setMobileDetail({ kind: "projects", index })} className="w-[min(88vw,565px)] shrink-0 snap-center text-left focus-visible:outline-2 focus-visible:outline-white">
                  <span className="relative block aspect-[865/467] overflow-hidden rounded-3xl">
                    <Image src={imageFor(project.image)} alt={project.imageAlt || project.title} fill unoptimized sizes="(max-width: 680px) 90vw, 565px" className="object-cover transition-transform duration-500 hover:scale-[1.035]" />
                  </span>
                  <span className="mt-4 flex justify-between text-sm text-white/70"><span>{project.number}</span><span>{project.client}</span></span>
                  <span className="mt-3 block text-center text-[28px]">{project.title}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {mobileDetail && openMobileItem && (
        <div role="dialog" aria-modal="true" aria-label={mobileDetail.kind === "services" ? "Detail layanan" : "Detail proyek"} className={"fixed inset-0 z-[110] grid place-items-center overflow-y-auto bg-black/90 px-4 py-12 motion-safe:animate-[hub-appear_350ms_ease-out_both] " + (reducedMotion ? "lg:grid" : "lg:hidden")}>
          <div className="relative w-full max-w-[560px] rounded-[28px] bg-white p-6 text-[#1e1e1e] shadow-2xl motion-safe:animate-[hub-rise_500ms_ease-out_both]">
            <button type="button" autoFocus onClick={() => setMobileDetail(null)} aria-label="Tutup detail" className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-[#1e1e1e] text-xl text-white">×</button>
            {mobileDetail.kind === "services" ? (
              <>
                <div className="relative mx-auto h-[200px] w-full"><Image src={imageFor((openMobileItem as Service).image)} alt="" fill unoptimized sizes="500px" className="object-contain" /></div>
                <h3 className="mt-5 text-3xl">{(openMobileItem as Service).name}</h3>
                <p className="mt-3 text-base leading-relaxed">{(openMobileItem as Service).description}</p>
              </>
            ) : (
              <>
                <div className="relative mt-7 aspect-[865/467] overflow-hidden rounded-2xl"><Image src={imageFor((openMobileItem as Project).image)} alt={(openMobileItem as Project).imageAlt || (openMobileItem as Project).title} fill unoptimized sizes="500px" className="object-cover" /></div>
                <p className="mt-5 text-sm text-[#777]">{(openMobileItem as Project).client}</p>
                <h3 className="mt-2 text-3xl">{(openMobileItem as Project).title}</h3>
                <p className="mt-3 text-base leading-relaxed">{(openMobileItem as Project).description}</p>
              </>
            )}
            {openMobileItem.href && <a href={openMobileItem.href} onClick={() => setMobileDetail(null)} className="mt-6 inline-flex items-center rounded-full bg-[#4b002b] px-5 py-3 text-sm font-medium text-white">Lihat detail ↗</a>}
          </div>
        </div>
      )}

      {/* Desktop artboard: only one scene is mounted visibly at a time. */}
      <div className={"relative h-[100svh] " + (reducedMotion ? "hidden" : "hidden lg:block")}>
        <div className="relative h-full w-full overflow-hidden bg-[#010101]">
          <div className="absolute left-1/2 top-1/2 h-[972px] w-[1440px] origin-center" style={{ transform: `translate(-50%, -50%) scale(${scale})` }}>
            <div className={scene === "intro" ? "absolute inset-0" : "hidden"} aria-hidden={scene !== "intro"}>
              <SourceArtboard src={SVG.intro} />
              <Image src="/assets/hub-pillar-mark.svg" alt="" width={52} height={40} unoptimized aria-hidden="true" className="pointer-events-none absolute left-[720px] top-[448px] -translate-x-1/2" />
              {currentService && (
                <button type="button" onClick={() => navigate("services")} disabled={Boolean(flight)} aria-label={`Perbesar layanan ${currentService.name}`} className={`absolute left-[144px] top-[297px] rounded-[21px] text-left outline-none transition-transform duration-500 ease-out hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-white ${flight?.kind === "services" ? "opacity-0" : ""}`}>
                  <ServiceCard item={currentService} variant="small" showLink={false} />
                </button>
              )}
              {chosen && (
                <button type="button" onClick={() => navigate("projects")} disabled={Boolean(flight)} aria-label={`Perbesar proyek ${chosen.title}`} className={`absolute left-[947px] top-[487px] block rounded-[29px] outline-none transition-transform duration-500 ease-out hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-white ${flight?.kind === "projects" ? "opacity-0" : ""}`}>
                  <ProjectImage item={chosen} />
                </button>
              )}
              <button type="button" onClick={() => navigate("services")} disabled={Boolean(flight) || !services.length} aria-label="Lihat layanan kami" className="absolute left-[136px] top-[217px] h-[55px] w-[250px] focus-visible:outline-2 focus-visible:outline-white" />
              <button type="button" onClick={() => navigate("projects")} disabled={Boolean(flight) || !projects.length} aria-label="Lihat proyek kami" className="absolute left-[1170px] top-[426px] h-[60px] w-[245px] focus-visible:outline-2 focus-visible:outline-white" />
            </div>

            <div className={scene === "services" ? "absolute inset-0" : "hidden"} aria-hidden={scene !== "services"}>
              <SourceArtboard src={SVG.services} />
              <button type="button" onClick={() => navigate("services", true)} aria-label="Kembali ke Hub" className="absolute left-[122px] top-[52px] grid h-[46px] w-[46px] place-items-center rounded-full text-[24px] text-white/75 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-white">‹</button>
              <div className="absolute left-[250px] top-[284px] w-[940px]">
                <div ref={serviceScrollRef} onScroll={() => syncCardOnScroll("services")} onKeyDown={(event) => { if (event.key === "ArrowRight") { event.preventDefault(); scrollToCard("services", activeServiceIndex + 1); } if (event.key === "ArrowLeft") { event.preventDefault(); scrollToCard("services", activeServiceIndex - 1); } }} className="hub-clean-rail w-full overflow-x-auto overflow-y-hidden" role="region" aria-label="Slider layanan Craftivation, gunakan panah atau geser untuk berpindah" tabIndex={0} style={{ scrollSnapType: "x mandatory", overscrollBehaviorX: "contain", touchAction: "pan-x" }}>
                  <div className="relative flex w-max items-stretch gap-[34px] px-[82px]">
                    {services.map((service, index) => (
                      <div key={service.id} data-service-index={index} className={"shrink-0 snap-center " + (flight?.closing && flight.kind === "services" && flight.index === index ? "opacity-0" : "")} role="group" aria-label={`${service.name}, layanan ${index + 1} dari ${services.length}`}>
                        <ServiceCard item={service} variant="large" />
                      </div>
                    ))}
                  </div>
                </div>
                {services.length === 0 && <p className="pt-20 text-center text-2xl text-white/70">Layanan akan segera hadir.</p>}
              </div>
              {services.length > 1 && (
                <nav aria-label="Navigasi slider layanan" className="absolute left-[326px] top-[215px] flex items-center gap-[14px] motion-safe:animate-[hub-appear_650ms_ease-out_both]">
                  <button type="button" onClick={() => scrollToCard("services", activeServiceIndex - 1)} disabled={activeServiceIndex === 0} aria-label="Layanan sebelumnya" className="grid h-12 w-12 place-items-center rounded-full text-[30px] leading-none text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white disabled:cursor-default disabled:opacity-35">‹</button>
                  <button type="button" onClick={() => scrollToCard("services", activeServiceIndex + 1)} disabled={activeServiceIndex === services.length - 1} aria-label="Layanan berikutnya" className="grid h-12 w-12 place-items-center rounded-full text-[30px] leading-none text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white disabled:cursor-default disabled:opacity-35">›</button>
                  <span className="ml-[12px] min-w-[74px] text-[16px] tabular-nums tracking-[.1em] text-white/65">{String(activeServiceIndex + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}</span>
                </nav>
              )}
            </div>

            <div className={scene === "projects" ? "absolute inset-0" : "hidden"} aria-hidden={scene !== "projects"}>
              <SourceArtboard src={SVG.project} />
              <button type="button" onClick={() => navigate("projects", true)} aria-label="Kembali ke Hub" className="absolute left-[266px] top-[60px] grid h-[46px] w-[46px] place-items-center rounded-full text-[24px] text-white/75 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-white">‹</button>
              {projects.length > 1 && (
                <nav aria-label="Navigasi slider proyek" className="absolute left-[284px] top-[155px] flex items-center gap-[14px] motion-safe:animate-[hub-appear_650ms_ease-out_both]">
                  <button type="button" onClick={() => scrollToCard("projects", projectIndex - 1)} disabled={projectIndex === 0} aria-label="Proyek sebelumnya" className="grid h-12 w-12 place-items-center rounded-full text-[30px] leading-none text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white disabled:cursor-default disabled:opacity-35">‹</button>
                  <button type="button" onClick={() => scrollToCard("projects", projectIndex + 1)} disabled={projectIndex === projects.length - 1} aria-label="Proyek berikutnya" className="grid h-12 w-12 place-items-center rounded-full text-[30px] leading-none text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white disabled:cursor-default disabled:opacity-35">›</button>
                  <span className="ml-[12px] min-w-[74px] text-[16px] tabular-nums tracking-[.1em] text-white/65">{String(projectIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span>
                </nav>
              )}
              {projects.length > 0 ? (
                <>
                  <div className="absolute left-[237.5px] top-[220px] w-[965px]">
                    <div ref={projectScrollRef} onScroll={() => syncCardOnScroll("projects")} onKeyDown={(event) => { if (event.key === "ArrowRight") { event.preventDefault(); scrollToCard("projects", projectIndex + 1); } if (event.key === "ArrowLeft") { event.preventDefault(); scrollToCard("projects", projectIndex - 1); } }} className="hub-clean-rail w-full overflow-x-auto overflow-y-hidden" role="region" aria-label="Geser untuk melihat daftar proyek Craftivation" tabIndex={0} style={{ scrollSnapType: "x mandatory", overscrollBehaviorX: "contain", touchAction: "pan-x" }}>
                      <div className="relative flex w-max items-stretch gap-[34px] px-[50px]">
                        {projects.map((project, index) => (
                          <div key={project.id} data-project-index={index} className={"shrink-0 snap-center " + (flight?.closing && flight.kind === "projects" && flight.index === index ? "opacity-0" : "")} role="group" aria-label={`${project.title}, proyek ${index + 1} dari ${projects.length}`}>
                            <a href={project.href} tabIndex={index === projectIndex ? 0 : -1} className="block rounded-[29.326px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                              <ProjectImage item={project} large />
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  {chosen && (
                    <div className="motion-safe:animate-[hub-appear_700ms_ease-out_both]">
                      <span className="absolute left-[174px] top-[440px] text-[25px] font-normal tabular-nums">{chosen.number || String(projectIndex + 1).padStart(2, "0")}</span>
                      <span className="absolute left-[1202px] top-[440px] max-w-[215px] truncate text-[25px] font-normal">{chosen.client}</span>
                      <h3 className="absolute left-1/2 top-[729px] w-[1100px] -translate-x-1/2 text-center text-[48px] leading-[1.12] tracking-[-.026em]" style={{ fontFamily: "var(--font-arsenal)" }}>{chosen.title}</h3>
                    </div>
                  )}
                </>
              ) : (
                <p className="absolute left-1/2 top-1/2 -translate-x-1/2 text-2xl text-white/70">Proyek akan segera hadir.</p>
              )}
            </div>

            {flight && flyingItem && (
              <div
                role="presentation"
                aria-hidden="true"
                onTransitionEnd={(event) => { if (event.target === event.currentTarget) finishFlight(); }}
                className="pointer-events-none absolute z-30 origin-top-left transform-gpu transition-transform duration-[780ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{ left: cardPositions[flight.kind].to.left, top: cardPositions[flight.kind].to.top, width: cardPositions[flight.kind].to.width, height: cardPositions[flight.kind].to.height, transform: flightTransform, willChange: "transform" }}
              >
                {flight.kind === "services"
                  ? <ServiceCard item={flyingItem as Service} variant="large" showLink={false} />
                  : <ProjectImage item={flyingItem as Project} large />}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
