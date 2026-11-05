"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useContactModal } from "@/components/ContactModal";
import { SECTION_CHANGER_PLACEHOLDERS } from "@/lib/sectionChangerPlaceholders";

interface PanelData {
  id: string;
  src: string;
  placeholder: string;
  alt: string;
  hasButton?: boolean;
}

const PANELS: PanelData[] = [
  {
    id: "panel-standar",
    src: "/assets/section-changer/panel1.svg",
    placeholder: SECTION_CHANGER_PLACEHOLDERS.panel1,
    alt: "Craftivation - Standar Tinggi Konstruksi Booth Pameran",
  },
  {
    id: "panel-inovasi",
    src: "/assets/section-changer/panel2.svg",
    placeholder: SECTION_CHANGER_PLACEHOLDERS.panel2,
    alt: "Craftivation - Inovasi Fabrikasi & Presisi Material",
  },
  {
    id: "panel-modular",
    src: "/assets/section-changer/panel3.svg",
    placeholder: SECTION_CHANGER_PLACEHOLDERS.panel3,
    alt: "Craftivation - Solusi Modular & Efisiensi Konstruksi",
  },
  {
    id: "panel-konsultasi",
    src: "/assets/section-changer/panel4.svg",
    placeholder: SECTION_CHANGER_PLACEHOLDERS.panel4,
    alt: "Craftivation - Konsultasi Desain & Booth 3D",
    hasButton: true,
  },
];

/**
 * Komponen Setiap Panel:
 * - Desktop (>= 1024px): Animasi Depth-of-Field (fokus tajam di tengah, blur halus di luar tengah)
 * - Responsif / Tablet / Mobile (< 1024px): Blur & dimming dinonaktifkan sepenuhnya;
 *   seluruh gambar tampil normal, terang (100% opacity), tajam, dan proporsional.
 */
function PanelItem({
  panel,
  index,
  isFocused,
  isDesktop,
  openModal,
  setPanelRef,
}: {
  panel: PanelData;
  index: number;
  isFocused: boolean;
  isDesktop: boolean;
  openModal: () => void;
  setPanelRef: (index: number, el: HTMLDivElement | null) => void;
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      ref={(el) => setPanelRef(index, el)}
      id={panel.id}
      data-panel-index={index}
      className={`section-changer-panel relative w-full aspect-[1440/450] overflow-hidden select-none ${
        isDesktop
          ? isFocused
            ? "z-10 pointer-events-auto"
            : "z-0 pointer-events-none"
          : "z-10 opacity-100 pointer-events-auto"
      }`}
      style={
        isDesktop
          ? {
              willChange: "filter, opacity, transform",
              filter: isFocused ? "blur(0px)" : "blur(10px)",
              opacity: isFocused ? 1 : 0.3,
              transform: isFocused
                ? "translate3d(0, 0, 0) scale(1)"
                : "translate3d(0, 0, 0) scale(0.985)",
              transition:
                "filter 700ms cubic-bezier(0.16, 1, 0.3, 1), opacity 700ms cubic-bezier(0.16, 1, 0.3, 1), transform 700ms cubic-bezier(0.16, 1, 0.3, 1)",
            }
          : {
              filter: "none",
              opacity: 1,
              transform: "none",
            }
      }
    >
      {/* 1. Placeholder Blur-Up: Hanya muncul sesaat saat aset resolusi tinggi awal dimuat */}
      <div
        className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-700 ease-out z-0 ${
          isLoaded ? "opacity-0" : "opacity-100"
        }`}
        aria-hidden="true"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={panel.placeholder}
          alt=""
          className="w-full h-full object-cover filter blur-2xl scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse" />
      </div>

      {/* 2. Gambar SVG Asli Beresolusi Tinggi */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={panel.src}
        alt={panel.alt}
        width={1440}
        height={450}
        onLoad={() => setIsLoaded(true)}
        className="relative z-10 w-full h-auto block pointer-events-none"
        loading={index === 0 ? "eager" : "lazy"}
        decoding="async"
      />

      {/* 3. Tombol Interaktif Konsultasi Sekarang pada Panel 4 */}
      {panel.hasButton && (
        <button
          type="button"
          disabled={isDesktop && !isFocused}
          onClick={(e) => {
            e.preventDefault();
            openModal();
          }}
          className={`group absolute z-20 rounded-lg focus:outline-none focus:ring-4 focus:ring-[#801e46]/40 transition-all duration-300 ${
            !isDesktop || isFocused
              ? "cursor-pointer pointer-events-auto"
              : "pointer-events-none"
          }`}
          style={{
            left: "59.2%",
            top: "57.5%",
            width: "29.2%",
            height: "9.2%",
          }}
          aria-label="Konsultasi Sekarang mengenai Booth Pameran Craftivation"
          title="Konsultasi Sekarang"
        >
          <span className="absolute inset-0 rounded-md bg-[#801e46]/0 group-hover:bg-[#801e46]/10 transition-colors duration-300 border border-transparent group-hover:border-[#801e46]/25" />
          <span className="sr-only">Konsultasi Sekarang</span>
        </button>
      )}
    </div>
  );
}

/**
 * Section Homepage Craftivation:
 * - Pada perangkat mobile dan tablet (< 1024px), efek blur & redup dinonaktifkan
 *   agar semua panel langsung tampil jernih, tajam, dan lengkap tanpa harus berada di tengah.
 * - Pada perangkat desktop (>= 1024px), efek fokus scroll depth-of-field tetap aktif.
 */
export default function SectionChanger() {
  const { openModal } = useContactModal();
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activePanelIndex, setActivePanelIndex] = useState<number>(0);
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  const setPanelRef = useCallback((index: number, el: HTMLDivElement | null) => {
    panelRefs.current[index] = el;
  }, []);

  // Deteksi ukuran layar untuk membedakan mobile/tablet vs desktop
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Scroll watcher: Hanya aktif jika tampilan desktop
  useEffect(() => {
    if (!isDesktop) return;

    let frameId: number | null = null;

    const evaluateFocus = () => {
      frameId = null;
      if (typeof window === "undefined") return;

      const viewportCenter = window.innerHeight * 0.5;
      let closestIndex = 0;
      let minDistance = Infinity;

      panelRefs.current.forEach((el, idx) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const panelCenter = rect.top + rect.height / 2;
        const distance = Math.abs(panelCenter - viewportCenter);

        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = idx;
        }
      });

      setActivePanelIndex((prev) => (prev !== closestIndex ? closestIndex : prev));
    };

    const onScroll = () => {
      if (frameId === null) {
        frameId = requestAnimationFrame(evaluateFocus);
      }
    };

    evaluateFocus();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (frameId !== null) cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isDesktop]);

  return (
    <section
      id="section-changer"
      aria-label="Craftivation Exhibition Contractor"
      className="relative w-full overflow-hidden bg-black flex justify-center py-0"
    >
      {/* CSS Guard: Menjamin pada tablet & HP tidak pernah terkena blur / redup */}
      <style>{`
        @media (max-width: 1023px) {
          .section-changer-panel {
            filter: none !important;
            opacity: 1 !important;
            transform: none !important;
            pointer-events: auto !important;
          }
        }
      `}</style>

      {/* Anchor navigasi untuk kompatibilitas */}
      <span id="hub" className="sr-only" aria-hidden="true" />
      <span id="services" className="sr-only" aria-hidden="true" />

      <div className="relative w-full max-w-[1440px] flex flex-col">
        {PANELS.map((panel, idx) => (
          <PanelItem
            key={panel.id}
            panel={panel}
            index={idx}
            isFocused={activePanelIndex === idx}
            isDesktop={isDesktop}
            openModal={openModal}
            setPanelRef={setPanelRef}
          />
        ))}
      </div>
    </section>
  );
}
