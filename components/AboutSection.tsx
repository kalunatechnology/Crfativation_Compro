"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * "Tentang Kami" — responsive reconstruction of the supplied 1440x900
 * tentangkami.svg. Desktop image placement matches its source artboard.
 * Artwork is extracted from the uploaded SVG, never replaced with stock art.
 */
export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [canAnimate, setCanAnimate] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !("IntersectionObserver" in window)) return;

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionPreference.matches) return;

    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.82 && rect.bottom > 0) {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(section);
    setCanAnimate(true);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`tentangKamiSection${canAnimate ? " tentangKamiSection--animated" : ""}`}
      id="about"
      aria-labelledby="about-title"
      data-revealed={revealed ? "true" : "false"}
    >
      <div className="tentangKamiScene">
        <div className="tentangKamiPhoto tentangKamiPhoto--top">
          <Image
            src="/assets/about-workshop-top.avif"
            alt="Tim kontraktor bekerja pada proses pembuatan struktur pameran."
            fill
            unoptimized
            sizes="(max-width: 900px) 90vw, (max-width: 1440px) 30vw, 429px"
            className="tentangKamiPhoto__image"
          />
        </div>

        <div className="tentangKamiContent">
          <h2 id="about-title" className="tentangKamiTitle">
            Craftivation adalah kontraktor pameran profesional.
          </h2>
          <p className="tentangKamiSubtitle">
            Kami menangani setiap proyek dengan presisi dan perhatian terhadap detail, guna
            memastikan setiap klien mendapatkan pengalaman yang lancar dan berkelas.
          </p>
        </div>

        <div className="tentangKamiPhoto tentangKamiPhoto--bottomLeft">
          <Image
            src="/assets/about-workshop-detail.avif"
            alt="Proses fabrikasi logam dengan pengelasan dan pengerjaan detail di workshop."
            fill
            unoptimized
            sizes="(max-width: 900px) 80vw, (max-width: 1440px) 22vw, 311px"
            className="tentangKamiPhoto__image"
          />
        </div>

        <div className="tentangKamiPhoto tentangKamiPhoto--bottomRight">
          <Image
            src="/assets/about-exhibition-result.avif"
            alt="Ruang pameran yang telah selesai dengan instalasi arsitektur dan pengunjung."
            fill
            unoptimized
            sizes="(max-width: 900px) 80vw, (max-width: 1440px) 22vw, 311px"
            className="tentangKamiPhoto__image"
          />
        </div>
      </div>
    </section>
  );
}
