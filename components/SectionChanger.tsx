"use client";

import { useContactModal } from "@/components/ContactModal";

/**
 * Section Homepage Craftivation
 * Mengikuti desain persis dari "section changer home page.svg" (viewBox 0 0 1440 1800).
 * Menampilkan 4 alur desain secara kontinu dan sempurna sesuai SVG asli.
 */
export default function SectionChanger() {
  const { openModal } = useContactModal();

  return (
    <section
      id="section-changer"
      aria-label="Craftivation Exhibition Contractor"
      className="relative w-full overflow-hidden bg-black flex justify-center"
    >
      {/* Anchor untuk kompatibilitas link lama */}
      <span id="hub" className="sr-only" aria-hidden="true" />
      <span id="services" className="sr-only" aria-hidden="true" />

      <div className="relative w-full max-w-[1440px]">
        {/* Render desain SVG asli secara penuh dan proporsional */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/section-changer-home-page.svg"
          alt="Craftivation - Redefining Space within Commercial Needs"
          width={1440}
          height={1800}
          className="w-full h-auto block select-none pointer-events-none"
          loading="eager"
          decoding="async"
        />

        {/* Area klik interaktif untuk tombol 'Konsultasi Sekarang' di bagian bawah (panel 4) */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            openModal();
          }}
          className="group absolute cursor-pointer rounded-lg focus:outline-none focus:ring-4 focus:ring-[#801e46]/40 transition-all duration-300"
          style={{
            left: "60.2%",
            top: "89.6%",
            width: "27.5%",
            height: "2.1%",
          }}
          aria-label="Konsultasi Sekarang mengenai Booth Pameran Craftivation"
          title="Konsultasi Sekarang"
        >
          {/* Efek hover halus pada tombol SVG */}
          <span className="absolute inset-0 rounded-md bg-[#801e46]/0 group-hover:bg-[#801e46]/10 transition-colors duration-300 border border-transparent group-hover:border-[#801e46]/25" />
          <span className="sr-only">Konsultasi Sekarang</span>
        </button>
      </div>
    </section>
  );
}
