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
 * Komponen Setiap Panel dengan Animasi Sinkron:
 * - Fade-In & Fade-Out (Opacity 100% saat di tengah layar, 30% saat di luar fokus)
 * - Blur-In & Blur-Out (Blur 0px saat fokus normal, Blur 10px saat belum/sudah lewat)
 * - Progressive Blur-Up Placeholder saat pemuatan awal
 */
function PanelItem({
  panel,
  index,
  isFocused,
  openModal,
  setPanelRef,
}: {
  panel: PanelData;
  index: number;
  isFocused: boolean;
  openModal: () => void;
  setPanelRef: (index: number, el: HTMLDivElement | null) => void;
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      ref={(el) => setPanelRef(index, el)}
      id={panel.id}
      data-panel-index={index}
      className={`relative w-full aspect-[1440/450] overflow-hidden select-none ${
        isFocused ? "z-10" : "z-0 pointer-events-none"
      }`}
      style={{
        willChange: "filter, opacity, transform",
        filter: isFocused ? "blur(0px)" : "blur(10px)",
        opacity: isFocused ? 1 : 0.3,
        transform: isFocused
          ? "translate3d(0, 0, 0) scale(1)"
          : "translate3d(0, 0, 0) scale(0.985)",
        transition:
          "filter 700ms cubic-bezier(0.16, 1, 0.3, 1), opacity 700ms cubic-bezier(0.16, 1, 0.3, 1), transform 700ms cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {/* 1. Placeholder Blur-Up: Muncul instan saat gambar SVG utama memuat */}
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
        {/* Shimmer loading pulse halus */}
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
          disabled={!isFocused}
          onClick={(e) => {
            e.preventDefault();
            openModal();
          }}
          className={`group absolute z-20 rounded-lg focus:outline-none focus:ring-4 focus:ring-[#801e46]/40 transition-all duration-300 ${
            isFocused ? "cursor-pointer pointer-events-auto" : "pointer-events-none"
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
 * Section Homepage Craftivation dengan Animasi Scroll Dinamis:
 * - Fade-In & Fade-Out
 * - Blur-In & Blur-Out
 * - Progressive Blur-Up Placeholder
 *
 * Mengikuti posisi scroll secara akurat:
 * Panel yang berada di tengah pandangan mata pengguna akan menjadi normal (100% tajam & terang),
 * sedangkan panel di atas maupun di bawahnya akan memudar dan blur lembut (Depth of Field cinematic).
 */
export default function SectionChanger() {
  const { openModal } = useContactModal();
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activePanelIndex, setActivePanelIndex] = useState<number>(0);

  const setPanelRef = useCallback((index: number, el: HTMLDivElement | null) => {
    panelRefs.current[index] = el;
  }, []);

  useEffect(() => {
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

    // Evaluasi pertama saat mount / resize
    evaluateFocus();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (frameId !== null) cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      id="section-changer"
      aria-label="Craftivation Exhibition Contractor"
      className="relative w-full overflow-hidden bg-black flex justify-center py-0"
    >
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
            openModal={openModal}
            setPanelRef={setPanelRef}
          />
        ))}
      </div>
    </section>
  );
}
