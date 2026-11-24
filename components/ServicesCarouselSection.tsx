"use client";

import { useCallback, useRef, useState } from "react";
import { SERVICE_CARDS } from "@/data/servicesCards";
import ServiceCard from "@/components/ServiceCard";
import { useContactModal } from "@/components/ContactModal";

/**
 * Section "Layanan Kami" di Homepage:
 * - Menampilkan 3 kartu layanan sekaligus pada layar desktop normal
 * - Bisa di-scroll ke samping (tombol panah, drag mouse, maupun geser sentuh)
 */
export default function ServicesCarouselSection() {
  const { openModal } = useContactModal();
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const dragState = useRef<{ isDown: boolean; startX: number; scrollLeft: number; moved: boolean }>({
    isDown: false,
    startX: 0,
    scrollLeft: 0,
    moved: false,
  });

  const syncScrollButtons = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  }, []);

  const scrollServices = (direction: "left" | "right") => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-service-slide]");
    const step = card ? card.offsetWidth + 18 : el.clientWidth * 0.65;
    el.scrollBy({
      left: direction === "right" ? step : -step,
      behavior: "smooth",
    });
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    if (!el) return;
    dragState.current = {
      isDown: true,
      startX: e.pageX - el.offsetLeft,
      scrollLeft: el.scrollLeft,
      moved: false,
    };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    if (!el || !dragState.current.isDown) return;
    const x = e.pageX - el.offsetLeft;
    const walk = x - dragState.current.startX;
    if (Math.abs(walk) > 6) {
      dragState.current.moved = true;
    }
    el.scrollLeft = dragState.current.scrollLeft - walk;
  };

  const stopDragging = () => {
    dragState.current.isDown = false;
  };

  return (
    <section
      id="layanan-kami"
      aria-labelledby="home-services-title"
      className="relative w-full bg-white py-12 md:py-16"
    >
      <div className="mx-auto w-full max-w-[1440px] px-[clamp(20px,4vw,64px)]">
        {/* Header: Judul & Tombol Geser */}
        <div className="mb-7 flex items-center justify-between gap-4 md:mb-9" data-home-reveal="rise">
          <h2
            id="home-services-title"
            style={{ fontFamily: "var(--font-arsenal), serif" }}
            className="text-[30px] font-normal leading-[1.15] text-[#4B002B] sm:text-[38px] md:text-[44px]"
          >
            Layanan Kami
          </h2>

          <div className="flex items-center gap-2.5" aria-label="Navigasi layanan">
            <button
              type="button"
              onClick={() => scrollServices("left")}
              disabled={!canScrollLeft}
              aria-label="Layanan sebelumnya"
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[#4B002B]/25 bg-white text-[#4B002B] transition hover:bg-[#4B002B] hover:text-white disabled:cursor-not-allowed disabled:opacity-35"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => scrollServices("right")}
              disabled={!canScrollRight}
              aria-label="Layanan selanjutnya"
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[#4B002B]/25 bg-white text-[#4B002B] transition hover:bg-[#4B002B] hover:text-white disabled:cursor-not-allowed disabled:opacity-35"
            >
              →
            </button>
          </div>
        </div>

        {/* Horizontal Carousel: 3 kartu tampil penuh di desktop */}
        <div
          ref={trackRef}
          onScroll={syncScrollButtons}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={stopDragging}
          onMouseLeave={stopDragging}
          role="region"
          aria-label="Daftar layanan Craftivation"
          tabIndex={0}
          className="flex cursor-grab snap-x snap-mandatory gap-[18px] overflow-x-auto pb-4 active:cursor-grabbing [scrollbar-width:thin] [scrollbar-color:#4B002B_rgba(0,0,0,0.08)]"
        >
          {SERVICE_CARDS.map((item) => (
            <div
              key={item.id}
              data-service-slide
              className="w-[86%] shrink-0 snap-start sm:w-[calc((100%-18px)/2)] lg:w-[calc((100%-36px)/3)]"
            >
              <ServiceCard
                item={item}
                layout="compact"
                onClick={() => {
                  if (!dragState.current.moved) openModal();
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
