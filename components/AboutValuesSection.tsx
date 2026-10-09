"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";

/**
 * Source: aboutus.svg, third artboard. The gallery is a native horizontal
 * scroll rail; arrows supplement touch, mouse, trackpad and keyboard input.
 * Photography is re-used from the supplied source SVG.
 */
const values = [
  {
    title: "Material tepat guna dan berkualitas tinggi",
    image: "/assets/about-material-source.svg",
    alt: "Detail panel dan material lengkung pada konstruksi booth Craftivation",
  },
  {
    title: "Profesional, cekatan dan bertanggungjawab",
    image: "/assets/about-workshop-top.avif",
    alt: "Tenaga profesional Craftivation mengerjakan instalasi di workshop",
  },
  {
    title: "Instalasi dan pengiriman tepat waktu",
    image: "/assets/about-workshop-detail.avif",
    alt: "Pekerjaan fabrikasi dan instalasi presisi oleh tim Craftivation",
  },
] as const;

export default function AboutValuesSection() {
  const railRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const goTo = useCallback((index: number) => {
    const rail = railRef.current;
    if (!rail) return;
    const next = Math.min(values.length - 1, Math.max(0, index));
    const cards = rail.querySelectorAll<HTMLElement>("[data-about-value]");
    const first = cards[0];
    const target = cards[next];
    if (!target || !first) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    rail.scrollTo({
      left: target.offsetLeft - first.offsetLeft,
      behavior: reduce ? "instant" : "smooth",
    });
    setActiveIndex(next);
  }, []);

  const syncActive = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    const leftEdge = rail.scrollLeft;
    let nearest = 0;
    let distance = Infinity;
    const cards = rail.querySelectorAll<HTMLElement>("[data-about-value]");
    cards.forEach((card, index) => {
      const start = card.offsetLeft - (cards[0]?.offsetLeft || 0);
      const currentDistance = Math.abs(leftEdge - start);
      if (currentDistance < distance) {
        distance = currentDistance;
        nearest = index;
      }
    });
    setActiveIndex(previous => previous === nearest ? previous : nearest);
  }, []);

  return (
    <section className="aboutValues" aria-labelledby="about-values-title">
      <div className="aboutValues__layout">
        <div className="aboutValues__intro" data-home-reveal="rise">
          <h2 id="about-values-title">Kami mengerti kebutuhan dari brand Anda.</h2>
          <div className="aboutValues__controlRow" aria-label="Navigasi nilai Craftivation">
            <button type="button" onClick={() => goTo(activeIndex - 1)} disabled={activeIndex === 0} aria-label="Kartu sebelumnya" className="aboutValues__arrow">←</button>
            <button type="button" onClick={() => goTo(activeIndex + 1)} disabled={activeIndex >= values.length - 1} aria-label="Kartu berikutnya" className="aboutValues__arrow">→</button>
            <span className="aboutValues__counter" aria-live="polite">{String(activeIndex + 1).padStart(2, "0")} / {String(values.length).padStart(2, "0")}</span>
          </div>
        </div>

        <div className="aboutValues__viewport">
          <div
            ref={railRef}
            className="aboutValues__rail"
            role="region"
            aria-roledescription="carousel"
            aria-label="Keunggulan Craftivation. Geser horizontal untuk melihat kartu lainnya."
            tabIndex={0}
            onScroll={syncActive}
            onKeyDown={event => {
              if (event.key === "ArrowRight") {
                event.preventDefault();
                goTo(activeIndex + 1);
              } else if (event.key === "ArrowLeft") {
                event.preventDefault();
                goTo(activeIndex - 1);
              }
            }}
          >
            {values.map((item, index) => (
              <article key={item.title} data-about-value={index} className="aboutValues__card" aria-label={item.title}>
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  unoptimized
                  sizes="(max-width: 720px) 83vw, 385px"
                  className="aboutValues__image"
                />
                <div className="aboutValues__cardShade" aria-hidden="true" />
                <h3>{item.title}</h3>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
