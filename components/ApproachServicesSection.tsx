"use client";

import { SERVICE_CARDS } from "@/data/servicesCards";
import ServiceCard from "@/components/ServiceCard";
import { useContactModal } from "@/components/ContactModal";

/**
 * Section "Layanan Kami" pada halaman /approach mengikuti artboard Our Services approch.svg:
 * Bento Grid 1-2-1-2-1 dengan bahasa Indonesia.
 */
export default function ApproachServicesSection() {
  const { openModal } = useContactModal();

  return (
    <section
      id="services"
      aria-labelledby="approach-services-title"
      className="w-full bg-white py-14 md:py-20"
    >
      <div className="mx-auto w-full max-w-[1116px] px-5 sm:px-6">
        <h2
          id="approach-services-title"
          style={{ fontFamily: "var(--font-arsenal), serif" }}
          className="mb-8 text-center text-[32px] font-normal leading-[1.15] text-[#4B002B] sm:mb-12 sm:text-[42px] md:text-[50px]"
          data-home-reveal="rise"
        >
          Layanan Kami
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-[16px]">
          {SERVICE_CARDS.map((item) => {
            const isFull = item.bentoSpan === "full";
            return (
              <div
                key={item.id}
                className={isFull ? "md:col-span-2" : ""}
                data-home-reveal="card"
              >
                <ServiceCard
                  item={item}
                  layout={isFull ? "bento-wide" : "bento-half"}
                  onClick={openModal}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
