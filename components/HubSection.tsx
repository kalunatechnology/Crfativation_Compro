"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { dummyProjects, dummyServices } from "@/data/dummy";
import type { Project, Service } from "@/lib/types";

/**
 * Original, full-resolution artboards are extracted directly from hub.svg.
 * All vector typography, the central stage, decorative paths and shadows stay SVG.
 * Only CMS-editable cards/photos are rendered above the original artboards.
 * Interaction is driven directly by user clicks (no scroll hijacking or 460svh locking),
 * allowing natural page scrolling and instant, responsive card views.
 */
const SVG = {
  intro: "/assets/hub-svg-intro.svg",
  stage: "/assets/hub-svg-stage.svg",
  services: "/assets/hub-svg-services.svg",
  project: "/assets/hub-svg-project.svg?v=2",
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
    <div
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
          style={{ fontFamily: "var(--font-sans)" }}
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
    </div>
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
      priority
      sizes="1440px"
      className="pointer-events-none select-none object-fill"
      draggable={false}
      aria-hidden="true"
    />
  );
}

type HubCardKind = "services" | "projects";
type HubScene = "intro" | "services" | "projects";
type MobileDetail = { kind: HubCardKind; index: number };

type CardFlight = {
  kind: HubCardKind;
  closing: boolean;
  moving: boolean;
  startLeft?: number;
};

const cardPositions = {
  services: {
    from: { left: 144, top: 297, width: 371.38, height: 223 },
    to: { left: 332, top: 284, width: 776, height: 466 },
  },
  projects: {
    from: { left: 947, top: 487, width: 403, height: 218 },
    to: { left: 287.5, top: 220, width: 865, height: 467 },
  },
};

export default function HubSection() {
  const [scale, setScale] = useState(1);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [services, setServices] = useState<Service[]>(demoServices);
  const [projects, setProjects] = useState<Project[]>(demoProjects);
  const [activeScene, setActiveScene] = useState<HubScene>("intro");
  const [flight, setFlight] = useState<CardFlight | null>(null);
  const [chromeVisible, setChromeVisible] = useState(false);
  const [mobileDetail, setMobileDetail] = useState<MobileDetail | null>(null);
  const [projectIndex, setProjectIndex] = useState(0);
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const serviceScrollRef = useRef<HTMLDivElement>(null);
  const projectScrollRef = useRef<HTMLDivElement>(null);
  const flightRafRef = useRef<number | null>(null);
  const flightTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const chromeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function finishFlight(toKind?: HubCardKind) {
    if (flightTimerRef.current) {
      clearTimeout(flightTimerRef.current);
      flightTimerRef.current = null;
    }
    setFlight(null);

    // Setelah kartu membesar, baru 100ms elemen lainnya (navigasi, pagination, slide berikutnya) muncul halus
    if (toKind) {
      if (chromeTimerRef.current) clearTimeout(chromeTimerRef.current);
      chromeTimerRef.current = setTimeout(() => {
        setChromeVisible(true);
      }, 100);
    }
  }

  function navigate(kind: HubCardKind, closing = false) {
    if (flight) return;

    if (closing) {
      // Hilangkan kontrol slide ekstra terlebih dahulu agar animasi kembali sangat slim & rapi
      setChromeVisible(false);
      if (chromeTimerRef.current) clearTimeout(chromeTimerRef.current);

      let startLeft: number | undefined;
      if (kind === "services") {
        const scrollLeft = serviceScrollRef.current?.scrollLeft ?? 0;
        startLeft = 332 + activeServiceIndex * 810 - scrollLeft;
      } else {
        const scrollLeft = projectScrollRef.current?.scrollLeft ?? 0;
        startLeft = 287.5 + projectIndex * 899 - scrollLeft;
      }

      if (reducedMotion) {
        setActiveScene("intro");
        return;
      }

      setTimeout(() => {
        setActiveScene("intro");
        setFlight({ kind, closing: true, moving: false, startLeft });

        if (flightRafRef.current) cancelAnimationFrame(flightRafRef.current);
        flightRafRef.current = requestAnimationFrame(() => {
          flightRafRef.current = requestAnimationFrame(() => {
            setFlight(prev => prev ? { ...prev, moving: true } : null);
          });
        });
        flightTimerRef.current = setTimeout(() => finishFlight(), 700);
      }, 60);
      return;
    }

    // Opening:
    setChromeVisible(false);
    if (chromeTimerRef.current) clearTimeout(chromeTimerRef.current);

    if (kind === "services") {
      setActiveServiceIndex(0);
      if (serviceScrollRef.current) serviceScrollRef.current.scrollLeft = 0;
    } else {
      setProjectIndex(0);
      if (projectScrollRef.current) projectScrollRef.current.scrollLeft = 0;
    }

    if (reducedMotion) {
      setActiveScene(kind);
      setChromeVisible(true);
      return;
    }

    setActiveScene(kind);
    setFlight({ kind, closing: false, moving: false });

    if (flightRafRef.current) cancelAnimationFrame(flightRafRef.current);
    flightRafRef.current = requestAnimationFrame(() => {
      flightRafRef.current = requestAnimationFrame(() => {
        setFlight(prev => prev ? { ...prev, moving: true } : null);
      });
    });
    flightTimerRef.current = setTimeout(() => finishFlight(kind), 650);
  }

  useEffect(() => {
    return () => {
      if (flightRafRef.current) cancelAnimationFrame(flightRafRef.current);
      if (flightTimerRef.current) clearTimeout(flightTimerRef.current);
      if (chromeTimerRef.current) clearTimeout(chromeTimerRef.current);
    };
  }, []);

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

  // Viewport scale measurement for pixel-perfect 1440x972 desktop artboard fitting
  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReducedMotion(motionQuery.matches);
    updateMotion();
    motionQuery.addEventListener("change", updateMotion);

    const measure = () => {
      setScale(Math.min(document.documentElement.clientWidth / 1440, window.innerHeight / 972));
    };
    measure();
    window.addEventListener("resize", measure);

    return () => {
      motionQuery.removeEventListener("change", updateMotion);
      window.removeEventListener("resize", measure);
    };
  }, []);

  const currentService = services[Math.min(activeServiceIndex, services.length - 1)];
  const chosen = projects[Math.min(projectIndex, projects.length - 1)];
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

  // Support Escape key to quickly return to intro hub view
  useEffect(() => {
    const keydown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (mobileDetail) setMobileDetail(null);
      else if (flight) finishFlight();
      else if (activeScene !== "intro") navigate(activeScene as HubCardKind, true);
    };
    window.addEventListener("keydown", keydown);
    return () => window.removeEventListener("keydown", keydown);
  }, [mobileDetail, activeScene, flight]);

  const flightGeometry = flight ? cardPositions[flight.kind] : null;
  let flightTransform = "none";
  let flightLeft = flightGeometry?.to.left ?? 0;
  let flightTop = flightGeometry?.to.top ?? 0;
  let flightWidth = flightGeometry?.to.width ?? 0;
  let flightHeight = flightGeometry?.to.height ?? 0;

  if (flight && flightGeometry) {
    const { from, to } = flightGeometry;
    const scaleX = from.width / to.width;
    const scaleY = from.height / to.height;
    const dx = from.left - to.left;
    const dy = from.top - to.top;

    if (!flight.closing) {
      flightTransform = flight.moving
        ? "translate3d(0px, 0px, 0px) scale(1, 1)"
        : `translate3d(${dx}px, ${dy}px, 0px) scale(${scaleX}, ${scaleY})`;
    } else {
      const initialDx = flight.startLeft !== undefined ? flight.startLeft - to.left : 0;
      flightTransform = flight.moving
        ? `translate3d(${dx}px, ${dy}px, 0px) scale(${scaleX}, ${scaleY})`
        : `translate3d(${initialDx}px, 0px, 0px) scale(1, 1)`;
    }
  }

  return (
    <section id="approach" aria-label="Pendekatan, layanan, dan proyek Craftivation" className="relative isolate scroll-mt-[70px] overflow-clip bg-[#010101] text-white">
      {/* Mobile layout: document-order cards without fixed-position overlaps. */}
      <div className="mx-auto max-w-[680px] px-5 pb-20 pt-24 lg:hidden">
        <h2 data-home-reveal="rise" className="mx-auto max-w-[480px] text-center text-[clamp(22px,4.8vw,32px)] leading-[1.18] tracking-tight" style={{ fontFamily: "var(--font-arsenal)" }}>
          Mendefinisikan ruang untuk kebutuhan komersial Anda
        </h2>
        <div data-home-reveal="scale" className="relative mx-auto mt-7 aspect-[1440/972] w-full overflow-hidden">
          <Image src={SVG.stage} alt="Panggung 3D Craftivation" fill unoptimized sizes="(max-width: 680px) 90vw, 680px" className="object-contain" />
          <Image src="/assets/hub-pillar-mark.svg" alt="" width={52} height={40} unoptimized aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[46.1%] h-auto w-[3.61%] -translate-x-1/2" />
        </div>
        {services.length > 0 && (
          <div className="mt-8" data-home-reveal="rise">
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
          <div className="mt-12" data-home-reveal="rise">
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
        <div role="dialog" aria-modal="true" aria-label={mobileDetail.kind === "services" ? "Detail layanan" : "Detail proyek"} className="fixed inset-0 z-[110] grid place-items-center overflow-y-auto bg-black/90 px-4 py-12 motion-safe:animate-[hub-appear_350ms_ease-out_both] lg:hidden">
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
                <p className="mt-5 text-sm text-[#777]">{((openMobileItem as Project).client)}</p>
                <h3 className="mt-2 text-3xl">{(openMobileItem as Project).title}</h3>
                <p className="mt-3 text-base leading-relaxed">{(openMobileItem as Project).description}</p>
              </>
            )}
            {openMobileItem.href && <a href={openMobileItem.href} onClick={() => setMobileDetail(null)} className="mt-6 inline-flex items-center rounded-full bg-[#4b002b] px-5 py-3 text-sm font-medium text-white">Lihat detail ↗</a>}
          </div>
        </div>
      )}

      {/* Desktop layout: standard viewport height without scroll hijacking or pin. Appears directly on natural scroll, clicks switch views with fluid card zoom. */}
      <div className="relative hidden h-[100svh] min-h-[720px] w-full overflow-hidden bg-[#010101] lg:block">
        <div className="absolute left-1/2 top-1/2 h-[972px] w-[1440px] origin-center" style={{ transform: `translate(-50%, -50%) scale(${scale})` }}>
          
          {/* SCENE 1: INTRO (Main Hub Stage) */}
          <div
            className={`absolute inset-0 transition-opacity duration-700 ease-out ${activeScene === "intro" ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
            aria-label="Tampilan utama Hub Craftivation"
            aria-hidden={activeScene !== "intro"}
          >
            <SourceArtboard src={SVG.intro} />
            <Image src="/assets/hub-pillar-mark.svg" alt="" width={52} height={40} unoptimized aria-hidden="true" className="pointer-events-none absolute left-[720px] top-[448px] -translate-x-1/2" />
            
            {/* Service Card Button */}
            {currentService && (
              <button
                type="button"
                onClick={() => navigate("services")}
                aria-label={`Lihat layanan ${currentService.name}`}
                className="group absolute left-[144px] top-[297px] cursor-pointer rounded-[21px] text-left outline-none transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_20px_35px_rgba(0,0,0,0.5)] focus-visible:ring-2 focus-visible:ring-white"
                style={{ opacity: flight && flight.kind === "services" ? 0 : 1 }}
              >
                <ServiceCard item={currentService} variant="small" showLink={false} />
                <span className="pointer-events-none absolute inset-0 rounded-[21px] border border-white/0 transition-colors group-hover:border-white/20" />
              </button>
            )}

            {/* Project Card Button */}
            {chosen && (
              <button
                type="button"
                onClick={() => navigate("projects")}
                aria-label={`Lihat proyek ${chosen.title}`}
                className="group absolute left-[947px] top-[487px] block cursor-pointer rounded-[29px] outline-none transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_20px_35px_rgba(0,0,0,0.5)] focus-visible:ring-2 focus-visible:ring-white"
                style={{ opacity: flight && flight.kind === "projects" ? 0 : 1 }}
              >
                <ProjectImage item={chosen} />
                <span className="pointer-events-none absolute inset-0 rounded-[29px] border border-white/0 transition-colors group-hover:border-white/20" />
              </button>
            )}

            {/* Clickable Title Hotspots */}
            <button
              type="button"
              onClick={() => navigate("services")}
              disabled={!services.length}
              aria-label="Buka daftar layanan kami"
              title="Klik untuk melihat layanan kami"
              className="absolute left-[136px] top-[217px] h-[55px] w-[250px] cursor-pointer rounded-lg focus-visible:outline-2 focus-visible:outline-white"
            />
            <button
              type="button"
              onClick={() => navigate("projects")}
              disabled={!projects.length}
              aria-label="Buka daftar proyek kami"
              title="Klik untuk melihat proyek kami"
              className="absolute left-[1170px] top-[426px] h-[60px] w-[245px] cursor-pointer rounded-lg focus-visible:outline-2 focus-visible:outline-white"
            />
          </div>

          {/* SCENE 2: SERVICES VIEW */}
          <div
            className={`absolute inset-0 transition-opacity duration-600 ease-out ${activeScene === "services" ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
            aria-label="Daftar Layanan Craftivation"
            aria-hidden={activeScene !== "services"}
          >
            <SourceArtboard src={SVG.services} />
            
            {/* Back to Hub Button (Clean circular button, no text collision) */}
            <button
              type="button"
              onClick={() => navigate("services", true)}
              aria-label="Kembali ke Hub"
              className={`absolute left-[122px] top-[52px] z-30 grid h-[46px] w-[46px] place-items-center rounded-full text-[24px] text-white/75 transition-all duration-300 hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-white cursor-pointer ${
                chromeVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
              }`}
            >
              ‹
            </button>

            <div className="absolute left-[250px] top-[284px] w-[940px]">
              <div
                ref={serviceScrollRef}
                onScroll={() => syncCardOnScroll("services")}
                onKeyDown={(event) => {
                  if (event.key === "ArrowRight") { event.preventDefault(); scrollToCard("services", activeServiceIndex + 1); }
                  if (event.key === "ArrowLeft") { event.preventDefault(); scrollToCard("services", activeServiceIndex - 1); }
                }}
                className="hub-clean-rail w-full overflow-x-auto overflow-y-hidden"
                role="region"
                aria-label="Slider layanan Craftivation, gunakan tombol panah atau tombol navigasi untuk berpindah"
                tabIndex={0}
                style={{ scrollSnapType: "x mandatory", overscrollBehaviorX: "contain", touchAction: "pan-x" }}
              >
                <div className="relative flex w-max items-stretch gap-[34px] px-[82px]">
                  {services.map((service, index) => {
                    const isMainCard = index === activeServiceIndex;
                    if (isMainCard) {
                      // Kartu utama: selama flight disembunyikan agar digantikan flying card.
                      // Saat flight selesai, langsung aktif di posisinya TANPA translate shift atau delay (100% smooth, anti-kedip).
                      return (
                        <div
                          key={service.id}
                          data-service-index={index}
                          className="shrink-0 snap-center"
                          style={{
                            opacity: flight && flight.kind === "services" ? 0 : 1,
                            transition: "none",
                          }}
                          role="group"
                          aria-label={`${service.name}, layanan ${index + 1} dari ${services.length}`}
                        >
                          <ServiceCard item={service} variant="large" />
                        </div>
                      );
                    }

                    // Kartu kedua dan seterusnya: muncul 100ms setelah kartu utama selesai membesar
                    return (
                      <div
                        key={service.id}
                        data-service-index={index}
                        className={`shrink-0 snap-center transition-all duration-400 ease-out ${
                          chromeVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8 pointer-events-none"
                        }`}
                        role="group"
                        aria-label={`${service.name}, layanan ${index + 1} dari ${services.length}`}
                      >
                        <ServiceCard item={service} variant="large" />
                      </div>
                    );
                  })}
                </div>
              </div>
              {services.length === 0 && <p className="pt-20 text-center text-2xl text-white/70">Layanan akan segera hadir.</p>}
            </div>

            {/* Slider Pagination Controls (Muncul 100ms setelah kartu membesar) */}
            {services.length > 1 && (
              <nav
                aria-label="Navigasi slider layanan"
                className={`absolute left-[326px] top-[215px] flex items-center gap-[14px] transition-all duration-300 ${
                  chromeVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
                }`}
              >
                <button
                  type="button"
                  onClick={() => scrollToCard("services", activeServiceIndex - 1)}
                  disabled={activeServiceIndex === 0}
                  aria-label="Layanan sebelumnya"
                  className="grid h-12 w-12 place-items-center rounded-full text-[30px] leading-none text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white disabled:cursor-default disabled:opacity-35 cursor-pointer"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={() => scrollToCard("services", activeServiceIndex + 1)}
                  disabled={activeServiceIndex === services.length - 1}
                  aria-label="Layanan berikutnya"
                  className="grid h-12 w-12 place-items-center rounded-full text-[30px] leading-none text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white disabled:cursor-default disabled:opacity-35 cursor-pointer"
                >
                  ›
                </button>
                <span className="ml-[12px] min-w-[74px] text-[16px] tabular-nums tracking-[.1em] text-white/65">
                  {String(activeServiceIndex + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
                </span>
              </nav>
            )}
          </div>

          {/* SCENE 3: PROJECTS VIEW */}
          <div
            className={`absolute inset-0 transition-opacity duration-600 ease-out ${activeScene === "projects" ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
            aria-label="Daftar Proyek Craftivation"
            aria-hidden={activeScene !== "projects"}
          >
            <SourceArtboard src={SVG.project} />
            
            {/* Back to Hub Button (Clean circular button, no text collision) */}
            <button
              type="button"
              onClick={() => navigate("projects", true)}
              aria-label="Kembali ke Hub"
              className={`absolute left-[284px] top-[70px] z-30 grid h-[46px] w-[46px] place-items-center rounded-full text-[24px] text-white/75 transition-all duration-300 hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-white cursor-pointer ${
                chromeVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
              }`}
            >
              ‹
            </button>

            {/* Slider Pagination Controls (Muncul 100ms setelah kartu membesar) */}
            {projects.length > 1 && (
              <nav
                aria-label="Navigasi slider proyek"
                className={`absolute left-[284px] top-[155px] flex items-center gap-[14px] transition-all duration-300 ${
                  chromeVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
                }`}
              >
                <button
                  type="button"
                  onClick={() => scrollToCard("projects", projectIndex - 1)}
                  disabled={projectIndex === 0}
                  aria-label="Proyek sebelumnya"
                  className="grid h-12 w-12 place-items-center rounded-full text-[30px] leading-none text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white disabled:cursor-default disabled:opacity-35 cursor-pointer"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={() => scrollToCard("projects", projectIndex + 1)}
                  disabled={projectIndex === projects.length - 1}
                  aria-label="Proyek berikutnya"
                  className="grid h-12 w-12 place-items-center rounded-full text-[30px] leading-none text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white disabled:cursor-default disabled:opacity-35 cursor-pointer"
                >
                  ›
                </button>
                <span className="ml-[12px] min-w-[74px] text-[16px] tabular-nums tracking-[.1em] text-white/65">
                  {String(projectIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                </span>
              </nav>
            )}

            {projects.length > 0 ? (
              <>
                <div className="absolute left-[237.5px] top-[220px] w-[965px]">
                  <div
                    ref={projectScrollRef}
                    onScroll={() => syncCardOnScroll("projects")}
                    onKeyDown={(event) => {
                      if (event.key === "ArrowRight") { event.preventDefault(); scrollToCard("projects", projectIndex + 1); }
                      if (event.key === "ArrowLeft") { event.preventDefault(); scrollToCard("projects", projectIndex - 1); }
                    }}
                    className="hub-clean-rail w-full overflow-x-auto overflow-y-hidden"
                    role="region"
                    aria-label="Geser untuk melihat daftar proyek Craftivation"
                    tabIndex={0}
                    style={{ scrollSnapType: "x mandatory", overscrollBehaviorX: "contain", touchAction: "pan-x" }}
                  >
                    <div className="relative flex w-max items-stretch gap-[34px] px-[50px]">
                      {projects.map((project, index) => {
                        const isMainCard = index === projectIndex;
                        if (isMainCard) {
                          // Kartu proyek utama: langsung aktif tanpa translate shift atau delay transisi
                          return (
                            <div
                              key={project.id}
                              data-project-index={index}
                              className="shrink-0 snap-center"
                              style={{
                                opacity: flight && flight.kind === "projects" ? 0 : 1,
                                transition: "none",
                              }}
                              role="group"
                              aria-label={`${project.title}, proyek ${index + 1} dari ${projects.length}`}
                            >
                              <a href={project.href} tabIndex={0} className="block rounded-[29.326px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                                <ProjectImage item={project} large />
                              </a>
                            </div>
                          );
                        }

                        // Kartu kedua dan seterusnya: muncul 100ms setelah kartu utama selesai membesar
                        return (
                          <div
                            key={project.id}
                            data-project-index={index}
                            className={`shrink-0 snap-center transition-all duration-400 ease-out ${
                              chromeVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8 pointer-events-none"
                            }`}
                            role="group"
                            aria-label={`${project.title}, proyek ${index + 1} dari ${projects.length}`}
                          >
                            <a href={project.href} tabIndex={-1} className="block rounded-[29.326px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                              <ProjectImage item={project} large />
                            </a>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                {chosen && (
                  <div
                    className={`absolute left-[287.5px] top-[705px] w-[865px] flex items-center justify-between transition-all duration-400 ${
                      chromeVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
                    }`}
                  >
                    <span className="min-w-[60px] text-[22px] font-normal tabular-nums text-white/55">
                      {chosen.number || String(projectIndex + 1).padStart(2, "0")}
                    </span>
                    <h3
                      className="max-w-[620px] truncate text-center text-[38px] font-normal leading-tight tracking-[-0.025em] text-white"
                      style={{ fontFamily: "var(--font-arsenal)" }}
                    >
                      {chosen.title}
                    </h3>
                    <span className="min-w-[60px] max-w-[220px] truncate text-right text-[22px] font-normal text-white/75">
                      {chosen.client}
                    </span>
                  </div>
                )}
              </>
            ) : (
              <p className="absolute left-1/2 top-1/2 -translate-x-1/2 text-2xl text-white/70">Proyek akan segera hadir.</p>
            )}
          </div>

          {/* FLIGHT ZOOM OVERLAY: Smooth physical zoom between intro stage and slider view */}
          {flight && (
            <div
              className="pointer-events-none absolute z-50 will-change-transform"
              style={{
                left: `${flightLeft}px`,
                top: `${flightTop}px`,
                width: `${flightWidth}px`,
                height: `${flightHeight}px`,
                transformOrigin: "top left",
                transform: flightTransform,
                transition: flight.moving
                  ? "transform 650ms cubic-bezier(0.2, 0.9, 0.25, 1)"
                  : "none",
              }}
              onTransitionEnd={(event) => {
                if (event.target !== event.currentTarget) return;
                finishFlight(flight.closing ? undefined : flight.kind);
              }}
            >
              {flight.kind === "services" && currentService && (
                <ServiceCard item={currentService} variant="large" showLink={true} />
              )}
              {flight.kind === "projects" && chosen && (
                <ProjectImage item={chosen} large />
              )}
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
